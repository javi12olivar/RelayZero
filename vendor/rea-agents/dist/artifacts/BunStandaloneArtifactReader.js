import { ArtifactPreparation } from "./ArtifactPreparation.js";
import { DEFAULT_BUN_READER_LIMITS, } from "../domain/artifactReaderLimits.js";
import { setImmediate } from "node:timers/promises";
import { Readable } from "node:stream";
import { artifactExpansionBudgetBytes } from "../domain/artifactExpansionBudget.js";
import { jsonValueByteLength } from "../domain/jsonValueByteLength.js";
import { readFileHandleChunks } from "../filesystem/readFileHandleChunks.js";
import { assertArtifactReadActive, ArtifactReaderFailure, copyArtifactEntry, assertProducedEntry, ArtifactResourceScope, normalizeArtifactPath, ArtifactPathRegistry, ArtifactFileSource, artifactReaderLimitFailure, } from "../resources/index.js";
import { ArtifactStreamLifecycle, checkedArtifactMemberStream, ownArtifactStream, } from "./OwnedArtifactStream.js";
import { bunFormatFailure, bunMetadataBytesLimit, probeBunStandaloneGraph, loadBunStandaloneGraph, } from "./bun/BunModuleGraphLayout.js";
import { decodeBunModuleGraph, } from "./bun/BunModuleGraphMembers.js";
const REGIONS = ["contents", "sourcemap", "bytecode", "module-info"];
/** One descriptor and bounded reads of an embedded Bun standalone module graph. */
export class BunStandaloneArtifactReader {
    limits;
    expandedBytes;
    format = "bun-standalone";
    #scope = new ArtifactResourceScope();
    #entries = new Map();
    #lifecycle = new ArtifactStreamLifecycle("Bun standalone");
    #source;
    #admission;
    #preparation = new ArtifactPreparation();
    #header;
    constructor(path, admitted, limits = DEFAULT_BUN_READER_LIMITS, expandedBytes) {
        this.limits = limits;
        this.expandedBytes = expandedBytes;
        if (admitted !== undefined && "kind" in admitted) {
            this.#admission = admitted;
            this.#source = new ArtifactFileSource(path, "Bun standalone", admitted.source);
        }
        else
            this.#source = new ArtifactFileSource(path, "Bun standalone", admitted);
    }
    formatMetadata() {
        return this.#header === undefined ? undefined : { ...this.#header };
    }
    async prepareContainer(expectedSha256, signal) {
        await this.#scope.run(async () => {
            this.#assertOpen(signal);
            await this.#source.bindSelectedPathSha256(expectedSha256, signal);
        });
    }
    async *entries(signal, options) {
        await this.#scope.run(async () => {
            this.#assertOpen(signal);
            await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
            await this.#source.readSelectedPath(signal);
        });
        this.#assertOpen(signal);
        let index = 0;
        for (const entry of this.#entries.values()) {
            if (index++ % 256 === 0)
                await setImmediate();
            this.#assertOpen(signal);
            yield copyArtifactEntry(entry);
        }
        this.#assertOpen(signal);
        // Every present module region is listed; absent regions are not members.
        options?.onCoverage?.({ status: "complete", limitations: [] });
    }
    async open(entry, signal) {
        return this.#scope.run(async () => {
            this.#assertOpen(signal);
            const stored = this.#entries.get(entry.adapterKey);
            assertProducedEntry(entry, stored, "Bun standalone entry does not match its owning inventory");
            const { handle } = await this.#source.readSelectedPath(signal);
            this.#assertOpen(signal);
            if (stored.byteOffset === null || stored.declaredSize === null)
                throw bunFormatFailure("member has no physical byte range");
            const lifecycle = this.#lifecycle.member(signal);
            const { signal: streamSignal, cancellationFailure } = lifecycle;
            const source = stored.declaredSize === 0
                ? Readable.from([])
                : readFileHandleChunks(handle, {
                    start: stored.byteOffset,
                    end: stored.byteOffset + stored.declaredSize - 1,
                    signal: streamSignal,
                    cancellationFailure,
                });
            const output = checkedArtifactMemberStream(stored, "Bun standalone", bunFormatFailure, () => lifecycle.verify((signal) => this.#source.readSelectedPath(signal)));
            ownArtifactStream(source, output, {
                scope: this.#scope,
                signal: streamSignal,
                cancellationFailure,
                label: "Bun standalone",
            });
            return output;
        });
    }
    async close() {
        this.#lifecycle.close();
        await this.#scope.close();
        await this.#source.close();
        this.#entries.clear();
        this.#header = undefined;
        this.#admission = undefined;
        this.#preparation.clear();
    }
    provenance() {
        return [];
    }
    #assertOpen(signal) {
        assertArtifactReadActive(signal);
        if (this.#lifecycle.closed)
            throw new ArtifactReaderFailure("unavailable", "Bun standalone reader is closed");
    }
    async #prepare(signal) {
        const source = await this.#source.readSelectedPath(signal);
        const probe = this.#admission?.probe ??
            (await probeBunStandaloneGraph(source.handle, source.initial.size, signal, this.limits));
        if (probe.status === "absent")
            throw bunFormatFailure("no Bun section or trailer");
        if (probe.failure !== undefined)
            throw probe.failure;
        if (probe.claim === undefined)
            throw bunFormatFailure("graph claim was not admitted");
        const located = await loadBunStandaloneGraph(source.handle, probe.claim, signal, this.limits);
        if (located.status === "absent")
            throw bunFormatFailure("no Bun section or trailer");
        if (located.failure !== undefined)
            throw located.failure;
        if (located.graph === undefined)
            throw bunFormatFailure("graph data was not admitted");
        const decoded = await decodeBunModuleGraph(located.graph, this.limits);
        const entryModule = decoded.modules[decoded.entryPointId];
        const entryDestination = entryModule === undefined
            ? null
            : logicalModulePath(entryModule, this.limits.path_parts);
        const header = {
            kind: "bun-standalone",
            layout_revision: decoded.revision,
            carrier: located.graph.carrier,
            payload_offset: located.graph.payloadOffset,
            payload_length: located.graph.payloadLength,
            module_count: decoded.modules.length,
            entry_point_id: decoded.entryPointId,
            entry_point_source_name: entryModule?.nameText.text ?? null,
            entry_point_logical_path: entryDestination?.path ?? null,
            compile_exec_argv: decoded.compileExecArgv.text,
            compile_exec_argv_hex: decoded.compileExecArgv.hex,
            flags: decoded.flags,
        };
        let retainedBytes = jsonValueByteLength(header, this.limits.representation_bytes);
        if (retainedBytes > this.limits.representation_bytes)
            throw bunMetadataBytesLimit(retainedBytes, this.limits);
        const entries = new Map();
        let declaredPlaintext = 0n;
        const expansionBudget = BigInt(this.expandedBytes ??
            artifactExpansionBudgetBytes(located.graph.payloadLength));
        const paths = new ArtifactPathRegistry({
            maxParts: this.limits.path_parts,
            maxNodes: this.limits.path_nodes,
            limitFailure: (field, maximum, required) => artifactReaderLimitFailure(`artifact_limits.bun.${field}`, maximum, "count", required),
        });
        for (const module of decoded.modules) {
            assertArtifactReadActive(signal);
            const destination = module.index === decoded.entryPointId && entryDestination !== null
                ? entryDestination
                : logicalModulePath(module, this.limits.path_parts);
            for (const region of REGIONS) {
                const range = regionRange(module, region);
                if (range === null)
                    continue;
                declaredPlaintext += BigInt(range.length);
                if (declaredPlaintext > expansionBudget)
                    throw artifactReaderLimitFailure("artifact_limits.expanded_bytes", Number(expansionBudget), "bytes", declaredPlaintext);
                const entry = moduleEntry(located.graph, module, region, range, destination);
                paths.reservePath(entry.path);
                retainedBytes += jsonValueByteLength(entryMetadataJson(entry), Math.max(0, this.limits.representation_bytes - retainedBytes));
                if (retainedBytes > this.limits.representation_bytes)
                    throw bunMetadataBytesLimit(retainedBytes, this.limits);
                entries.set(entry.adapterKey, entry);
            }
        }
        await this.#source.readSelectedPath(signal);
        this.#assertOpen(signal);
        this.#entries = entries;
        this.#header = header;
        this.#admission = undefined;
    }
}
const regionRange = (module, region) => {
    if (region === "contents")
        return module.contents;
    if (region === "sourcemap")
        return module.sourcemap;
    if (region === "bytecode")
        return module.bytecode;
    return module.moduleInfo;
};
const moduleEntry = (graph, module, region, range, located) => {
    const suffix = region === "contents"
        ? ""
        : region === "sourcemap"
            ? ".bunmap"
            : region === "bytecode"
                ? ".bytecode"
                : ".module-info";
    const metadata = {
        kind: "bun-standalone-entry",
        index: module.index,
        region,
        source_name: module.nameText.text,
        source_name_hex: module.nameText.hex,
        encoding: module.encoding,
        encoding_name: module.encodingName,
        loader: module.loader,
        loader_name: module.loaderName,
        module_format: module.moduleFormat,
        module_format_name: module.moduleFormatName,
        side: module.side,
        side_name: module.sideName,
        entry_point: module.index === graph.entryPointId,
        sourcemap_bytes: module.sourcemap?.length ?? 0,
        bytecode_bytes: module.bytecode?.length ?? 0,
        module_info_bytes: module.moduleInfo?.length ?? 0,
        bytecode_origin: module.bytecodeOrigin?.text ?? null,
        bytecode_origin_hex: module.bytecodeOrigin?.hex ?? null,
    };
    return {
        path: `${located.path}${suffix}`,
        ...(located.sourcePath === undefined
            ? {}
            : { sourcePath: located.sourcePath }),
        kind: "file",
        declaredSize: range.length,
        compressedSize: null,
        executable: false,
        encrypted: false,
        byteOffset: graph.payloadOffset + range.offset,
        declaredIntegrity: null,
        unpacked: false,
        limitations: [...(located.limitations ?? [])],
        adapterKey: `bun:${String(module.index)}:${region}`,
        formatMetadata: metadata,
    };
};
/**
 * Bun virtual names keep a leading slash (`/$bunfs/...`). Strip one slash
 * when the remainder is a safe relative path, and keep the raw spelling on
 * `sourcePath`. Unsafe, drive, and invalid UTF-8 names fall back to
 * `bun-modules/<index>` so inventory can still retain the module.
 */
const logicalModulePath = (module, maximumParts) => {
    const fallback = maximumParts === 1
        ? `bun-module-${String(module.index)}`
        : `bun-modules/${String(module.index)}`;
    const text = module.nameText.text;
    if (text === null || text.length === 0)
        return { path: fallback };
    const candidate = text.startsWith("/") ? text.slice(1) : text;
    // Preserve virtual source facts without admitting an unbounded logical path tree.
    let parts = 1;
    for (let index = 0; index < candidate.length; index++)
        if (candidate.charCodeAt(index) === 47 && ++parts > maximumParts)
            return {
                path: fallback,
                sourcePath: text,
                limitations: [
                    `The virtual name exceeds artifact_limits.bun.path_parts (${String(maximumParts)} parts); an indexed path is used and the original name is retained.`,
                ],
            };
    try {
        return {
            path: normalizeArtifactPath(candidate),
            sourcePath: text,
        };
    }
    catch (cause) {
        if (!(cause instanceof ArtifactReaderFailure) || cause.reason !== "path")
            throw cause;
        return { path: fallback, sourcePath: text };
    }
};
const entryMetadataJson = (entry) => entry.formatMetadata === undefined ? null : { ...entry.formatMetadata };
