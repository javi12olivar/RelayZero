import { probeBunStandaloneGraph, } from "./bun/BunModuleGraphLayout.js";
import { locateDenoStandalone, } from "./deno/DenoStandaloneLocation.js";
import { resolveArtifactReaderLimits, } from "../domain/artifactReaderLimits.js";
import { regularFileState, sameRegularFileState, } from "../filesystem/RegularFile.js";
import { findDotnetBundleHeader } from "./dotnet/DotnetBundle.js";
import { ArtifactReaderFailure, abortIfNeeded } from "../resources/index.js";
import { locateGodotPck } from "./GodotPckLocation.js";
import { locateNodeSea, } from "./nodeSea/NodeSeaLocation.js";
import { observePyInstallerCookie, } from "./pyinstaller/CArchiveLayout.js";
import { pyInstallerReaderFailure } from "./pyinstaller/PyInstallerFailure.js";
/** Share format observations only across admissions of the same unchanged regular file. */
export class ArtifactEmbeddedFormatProbes {
    source;
    signal;
    limits;
    #facts;
    constructor(path, source, signal, previous, limits = resolveArtifactReaderLimits()) {
        this.source = source;
        this.signal = signal;
        this.limits = limits;
        abortIfNeeded(signal);
        if (previous !== undefined &&
            !sameRegularFileState(previous.sourceState, source.initial))
            throw new ArtifactReaderFailure("integrity", `Root artifact changed before inventory: ${path}`, { integrityCheck: "container-identity" });
        const reusable = previous !== undefined &&
            JSON.stringify(previous.readerLimits) === JSON.stringify(limits);
        if (previous !== undefined && !reusable) {
            const { bunStandalone: _bun, nodeSea: _sea, nodeSeaRecognitionFailure: _seaLimit, ...facts } = previous;
            this.#facts = { ...facts, readerLimits: limits };
        }
        else
            this.#facts = previous ?? {
                sourceState: regularFileState(source.initial),
                readerLimits: limits,
            };
    }
    async godotPck(prefix) {
        abortIfNeeded(this.signal);
        if (this.#facts.godotPck !== undefined)
            return this.#facts.godotPck ?? undefined;
        const location = await locateGodotPck(this.source.handle, this.source.initial.size, this.signal, prefix);
        this.#facts = { ...this.#facts, godotPck: location ?? null };
        return location;
    }
    async nodeSea() {
        abortIfNeeded(this.signal);
        if (this.#facts.nodeSea !== undefined)
            return this.#facts.nodeSea ?? undefined;
        if (this.#facts.nodeSeaRecognitionFailure !== undefined)
            return undefined;
        try {
            const location = await locateNodeSea(this.source.handle, this.source.initial.size, this.signal, this.limits.node_sea);
            this.#facts = { ...this.#facts, nodeSea: location ?? null };
            return location;
        }
        catch (cause) {
            if (cause instanceof ArtifactReaderFailure &&
                (cause.readerLimit?.parameter ===
                    "artifact_limits.node_sea.recognition_header_count" ||
                    cause.readerLimit?.parameter ===
                        "artifact_limits.node_sea.recognition_load_command_bytes")) {
                this.#facts = { ...this.#facts, nodeSeaRecognitionFailure: cause };
                return undefined;
            }
            throw cause;
        }
    }
    async pyInstaller() {
        abortIfNeeded(this.signal);
        if (this.#facts.pyInstaller !== undefined)
            return this.#facts.pyInstaller.state === "located"
                ? this.#facts.pyInstaller.cookie
                : undefined;
        const found = await observePyInstallerCookie(this.source.handle, this.source.initial.size, this.signal);
        abortIfNeeded(this.signal);
        if (!found.ok)
            throw pyInstallerReaderFailure(found.error);
        this.#facts = { ...this.#facts, pyInstaller: found.value };
        return found.value.state === "located" ? found.value.cookie : undefined;
    }
    async dotnetBundle() {
        abortIfNeeded(this.signal);
        if (this.#facts.dotnetBundleHeaderOffset !== undefined)
            return this.#facts.dotnetBundleHeaderOffset ?? undefined;
        // An apphost inside a recognized CArchive cannot claim its outer carrier.
        const packaged = await this.pyInstaller();
        const header = await findDotnetBundleHeader(this.source.handle, this.source.initial.size, this.signal, packaged?.archiveStart ?? this.source.initial.size);
        abortIfNeeded(this.signal);
        this.#facts = { ...this.#facts, dotnetBundleHeaderOffset: header ?? null };
        return header;
    }
    async bunStandalone() {
        abortIfNeeded(this.signal);
        if (this.#facts.bunStandalone !== undefined)
            return this.#facts.bunStandalone;
        const observed = await probeBunStandaloneGraph(this.source.handle, this.source.initial.size, this.signal, this.limits.bun);
        abortIfNeeded(this.signal);
        this.#facts = { ...this.#facts, bunStandalone: observed };
        return observed;
    }
    async denoStandalone() {
        abortIfNeeded(this.signal);
        if (this.#facts.denoStandalone !== undefined)
            return this.#facts.denoStandalone;
        const packaged = await this.pyInstaller();
        const observed = await locateDenoStandalone(this.source.handle, this.source.initial.size, this.signal, packaged === undefined
            ? undefined
            : {
                start: packaged.archiveStart,
                end: packaged.archiveStart + packaged.packageLength,
            });
        abortIfNeeded(this.signal);
        this.#facts = { ...this.#facts, denoStandalone: observed };
        return observed;
    }
    completedFacts() {
        return this.#facts;
    }
}
