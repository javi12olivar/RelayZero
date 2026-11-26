import { DEFAULT_NODE_SEA_READER_LIMITS, } from "../domain/artifactReaderLimits.js";
import { setImmediate } from "node:timers/promises";
import { artifactExpansionBudgetBytes } from "../domain/artifactExpansionBudget.js";
import { ArtifactPathRegistry, normalizeArtifactPath, ArtifactReaderFailure, artifactReaderLimitFailure, } from "../resources/index.js";
import { decodeNodeSeaBlob, } from "./nodeSea/NodeSeaBlob.js";
import { locateNodeSea, readNodeSeaBlob, scanNodeSeaFuse, } from "./nodeSea/NodeSeaLocation.js";
import { PositionalArtifactReader, } from "./PositionalArtifactReader.js";
const SNAPSHOT_PATH = "__node_sea__/snapshot";
const CODE_CACHE_PATH = "__node_sea__/code-cache";
const ASSET_FALLBACK_PREFIX = "__node_sea__/assets/";
/** Read a Node.js SEA blob out of a Mach-O, ELF, or PE carrier without running it. */
export class NodeSeaArtifactReader extends PositionalArtifactReader {
    limits;
    expandedBytes;
    format = "node-sea";
    #header;
    #admission;
    constructor(path, admitted, limits = DEFAULT_NODE_SEA_READER_LIMITS, expandedBytes) {
        const admission = admitted !== undefined && "kind" in admitted ? admitted : undefined;
        super(path, "Node SEA", admitted !== undefined && "kind" in admitted ? admitted.source : admitted);
        this.limits = limits;
        this.expandedBytes = expandedBytes;
        this.#admission = admission;
    }
    formatMetadata() {
        if (this.#header === undefined)
            return undefined;
        return { ...this.#header, exec_argv: [...this.#header.exec_argv] };
    }
    /** Also drop the admitted decode, which only a completed preparation releases. */
    async close() {
        await super.close();
        this.#admission = undefined;
    }
    /** Reuse only the decode admitted under this accepted policy. */
    async #readBlob(source, signal) {
        const admittedLimits = this.#admission?.limits;
        if (this.#admission !== undefined &&
            admittedLimits !== undefined &&
            Object.entries(this.limits).every(([field, value]) => Reflect.get(admittedLimits, field) === value))
            return this.#admission;
        const location = await locateNodeSea(source.handle, source.initial.size, signal, this.limits);
        if (location === undefined)
            throw formatFailure("blob was not found");
        const decoded = await decodeNodeSeaBlob(await readNodeSeaBlob(source, location, signal, this.limits), signal, this.limits);
        return { location, decoded };
    }
    async prepareEntries(signal) {
        const { handle, initial } = await this.verifyCarrier(signal);
        const { location, decoded } = await this.#readBlob({ handle, initial }, signal);
        const fuse = await scanNodeSeaFuse(handle, initial.size, signal);
        const entries = [];
        let declaredBytes = 0n;
        const expansionBudget = BigInt(this.expandedBytes ?? artifactExpansionBudgetBytes(location.blobLength));
        let index = 0;
        for (const member of seaMembers(decoded)) {
            if (index % 256 === 0)
                await setImmediate();
            this.assertOpen(signal);
            declaredBytes += BigInt(member.range.length);
            if (declaredBytes > expansionBudget)
                throw artifactReaderLimitFailure("artifact_limits.expanded_bytes", Number(expansionBudget), "bytes", declaredBytes, "memory");
            const start = location.blobOffset + member.range.offset;
            if (start > initial.size || member.range.length > initial.size - start)
                throw formatFailure(`member exceeds the carrier: ${member.path}`);
            const entry = {
                path: member.path,
                kind: "file",
                declaredSize: member.range.length,
                compressedSize: null,
                executable: false,
                encrypted: false,
                byteOffset: start,
                declaredIntegrity: null,
                unpacked: false,
                limitations: [],
                adapterKey: `node-sea:${String(index)}`,
                formatMetadata: {
                    kind: "node-sea-entry",
                    role: member.role,
                    source_path: member.sourcePath,
                    index,
                },
                sourcePath: member.sourcePath,
            };
            entries.push(entry);
            index += 1;
        }
        this.#header = {
            kind: "node-sea",
            magic: decoded.magic,
            flags: decoded.flags,
            disable_experimental_sea_warning: decoded.disableExperimentalSeaWarning,
            use_snapshot: decoded.useSnapshot,
            use_code_cache: decoded.useCodeCache,
            include_assets: decoded.includeAssets,
            include_exec_argv: decoded.includeExecArgv,
            exec_argv_extension: decoded.execArgvExtension,
            exec_argv: [...decoded.execArgv],
            ...(decoded.mainCodeFormat === undefined
                ? {}
                : { main_code_format: decoded.mainCodeFormat }),
            code_path: decoded.codePath,
            carrier: location.carrier,
            blob_offset: location.blobOffset,
            blob_length: location.blobLength,
            fuse_state: fuse.fuseState,
            fuse_sentinel: fuse.fuseSentinel,
            fuse_contradiction: fuse.fuseContradiction,
        };
        await this.verifyCarrier(signal);
        this.#admission = undefined;
        return {
            entries,
            coverage: {
                status: "complete",
                limitations: fuse.fuseContradiction === null ? [] : [fuse.fuseContradiction],
            },
        };
    }
}
function* seaMembers(decoded) {
    const registry = new ArtifactPathRegistry();
    const claimed = new Set();
    const reserve = (path) => {
        if (claimed.has(path))
            throw new ArtifactReaderFailure("path", `Node SEA entry path collides: ${path}`);
        registry.add(path, "file");
        claimed.add(path);
        return path;
    };
    const mappedPath = (raw, fallback) => {
        try {
            const normalized = normalizeArtifactPath(raw);
            if (normalized !== "__node_sea__" &&
                !normalized.startsWith("__node_sea__/"))
                return reserve(normalized);
        }
        catch (cause) {
            if (!(cause instanceof ArtifactReaderFailure) || cause.reason !== "path")
                throw cause;
        }
        return reserve(fallback);
    };
    if (decoded.mainScript !== null)
        yield {
            path: mappedPath(decoded.codePath, decoded.mainCodeFormat === "module"
                ? "__node_sea__/main.mjs"
                : "__node_sea__/main.cjs"),
            sourcePath: decoded.codePath,
            role: "main-script",
            range: decoded.mainScript,
        };
    if (decoded.snapshot !== null)
        yield {
            path: reserve(SNAPSHOT_PATH),
            sourcePath: SNAPSHOT_PATH,
            role: "snapshot",
            range: decoded.snapshot,
        };
    if (decoded.codeCache !== null)
        yield {
            path: reserve(CODE_CACHE_PATH),
            sourcePath: CODE_CACHE_PATH,
            role: "code-cache",
            range: decoded.codeCache,
        };
    for (const [ordinal, asset] of decoded.assets.entries())
        yield {
            path: mappedPath(asset.name, `${ASSET_FALLBACK_PREFIX}${String(ordinal)}`),
            sourcePath: asset.name,
            role: "asset",
            range: asset.range,
        };
}
const formatFailure = (detail) => new ArtifactReaderFailure("format", `Node SEA blob is malformed: ${detail}`);
