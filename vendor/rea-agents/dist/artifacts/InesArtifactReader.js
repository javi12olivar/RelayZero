import { ParseFailureError } from "../domain/parseFailure.js";
import { artifactOperationCause, ArtifactReaderFailure, copyArtifactEntry, assertProducedEntry, streamChunkToBuffer, abortIfNeeded, ArtifactResourceScope, } from "../resources/index.js";
import { readFileHandlePrefix } from "../filesystem/readFileHandlePrefix.js";
import { Transform, pipeline } from "node:stream";
import { parseInesLayout, } from "../domain/inesContainer.js";
import { RegularFileChangedError, RegularFileOperationCancelled, assertStableRegularFileIdentity, } from "../filesystem/RegularFile.js";
import { readFileHandleChunks } from "../filesystem/readFileHandleChunks.js";
const CLASSIC_INES_LIMITATION = "Classic iNES file regions are observed; mapper execution, CPU bank mappings, CHR-RAM contents, 6502 analysis and emulator behavior are not observed. Trailing bytes are retained without interpretation. NES 2.0 and UNIF are unsupported.";
const NES_2_LIMITATION = "NES 2.0 file regions are observed; header mapper, nametable layout flags, RAM/NVRAM, timing, console and expansion-device values are declarations. Effective nametable wiring, mapper execution, CPU bank mappings, CHR-RAM contents, miscellaneous ROM boundaries, 6502 analysis and emulator behavior are not observed. Trailing bytes are retained without interpretation. UNIF is unsupported.";
/** Keep the classic inventory's existing semantic limitation and Evidence identity. */
export const inesInventoryLimitation = (header) => header.format === "ines" ? CLASSIC_INES_LIMITATION : NES_2_LIMITATION;
const regionReadFailure = (cause) => cause instanceof ArtifactReaderFailure
    ? cause
    : new ArtifactReaderFailure("io", "Could not read iNES region", { cause });
/** Read positional regions from a descriptor retained by the artifact resource scope. */
export class InesArtifactReader {
    path;
    source;
    ownedSource;
    format = "ines";
    #entries = new Map();
    #scope = new ArtifactResourceScope();
    #lifecycle = new AbortController();
    #closedFailure = new ArtifactReaderFailure("unavailable", "iNES reader is closed");
    #layout;
    #closed = false;
    constructor(path, source, ownedSource) {
        this.path = path;
        this.source = source;
        this.ownedSource = ownedSource;
    }
    async *entries(signal, options) {
        const layout = await this.#scope.run(async () => {
            await this.#verifySource(signal);
            const prefix = await readFileHandlePrefix(this.source.handle, 16, () => abortIfNeeded(signal));
            abortIfNeeded(signal);
            // Concurrent source changes take precedence over malformed header diagnostics.
            await this.#verifySource(signal);
            const parsed = parseInesLayout(prefix, this.source.initial.size);
            if (!parsed.ok)
                throw new ArtifactReaderFailure("format", parsed.error.detail, {
                    cause: new ParseFailureError(parsed.error),
                });
            this.#layout = parsed.value;
            this.#entries.clear();
            return parsed.value;
        });
        for (const region of layout.regions) {
            this.#assertOpen(signal);
            const entry = {
                path: region.path,
                kind: "file",
                declaredSize: region.length,
                compressedSize: null,
                executable: false,
                encrypted: false,
                byteOffset: region.offset,
                declaredIntegrity: null,
                unpacked: false,
                limitations: [],
                adapterKey: region.path,
            };
            this.#entries.set(entry.adapterKey, copyArtifactEntry(entry));
            yield entry;
        }
        this.#assertOpen(signal);
        // The regions tile the file: header, trainer, units and any trailing bytes.
        options?.onCoverage?.({ status: "complete", limitations: [] });
    }
    async open(entry, signal) {
        return this.#scope.run(() => this.#openRegion(entry, signal));
    }
    async #openRegion(entry, signal) {
        this.#assertOpen(signal);
        const produced = this.#entries.get(entry.adapterKey);
        assertProducedEntry(entry, produced, "iNES region does not match this reader's inventory");
        await this.#verifySource(signal);
        this.#assertOpen(signal);
        const offset = produced.byteOffset;
        const size = produced.declaredSize;
        if (offset === null || size === null || size <= 0)
            throw new ArtifactReaderFailure("integrity", "Invalid iNES region range", { integrityCheck: "layout-consistency" });
        const active = AbortSignal.any([
            this.#lifecycle.signal,
            ...(signal === undefined ? [] : [signal]),
        ]);
        const failure = () => this.#lifecycle.signal.aborted && active.reason === this.#closedFailure
            ? this.#closedFailure
            : new ArtifactReaderFailure("cancelled", "iNES region read cancelled", {
                cause: active.reason,
            });
        const source = readFileHandleChunks(this.source.handle, {
            start: offset,
            end: offset + size - 1,
            signal: active,
            cancellationFailure: failure,
        });
        // Transform destruction can precede an asynchronous final callback. Keep
        // that descriptor validation admitted independently of stream retirement.
        const verify = () => this.#scope.run(() => this.#verifySource(active, failure));
        const assertActive = () => this.#assertOpen(active, failure);
        let bytes = 0;
        const output = new Transform({
            destroy(cause, callback) {
                callback(cause === null ? null : regionReadFailure(cause));
            },
            transform(raw, _encoding, callback) {
                try {
                    assertActive();
                    const chunk = streamChunkToBuffer(raw);
                    bytes += chunk.length;
                    callback(null, chunk);
                }
                catch (cause) {
                    callback(regionReadFailure(cause));
                }
            },
            final(callback) {
                void (async () => {
                    if (bytes !== size)
                        throw new ArtifactReaderFailure("integrity", "Truncated iNES region", { integrityCheck: "read-coverage" });
                    await verify();
                })().then(() => callback(), (cause) => callback(regionReadFailure(cause)));
            },
        });
        output.on("error", () => undefined);
        let producerComplete = false;
        const onAbort = () => {
            if (producerComplete && !output.destroyed)
                output.destroy(failure());
        };
        const retired = new Promise((resolve) => {
            output.once("close", () => {
                active.removeEventListener("abort", onAbort);
                resolve();
            });
        });
        active.addEventListener("abort", onAbort, { once: true });
        void this.#scope
            .run(async () => {
            await Promise.all([
                new Promise((resolve) => {
                    pipeline(source, output, () => {
                        producerComplete = true;
                        if (active.aborted)
                            onAbort();
                        resolve();
                    });
                }),
                retired,
            ]);
        })
            .catch((cause) => output.destroy(regionReadFailure(cause)));
        return output;
    }
    /** Validate the completed region scan without rereading its payload. */
    async verifyReconstruction(expectedSha256, observed, signal) {
        return this.#scope.run(() => this.#verifyReconstruction(expectedSha256, observed, signal));
    }
    async #verifyReconstruction(expectedSha256, observed, signal) {
        this.#assertOpen(signal);
        const layout = this.#layout;
        if (layout === undefined || this.#entries.size !== layout.regions.length)
            throw new ArtifactReaderFailure("integrity", "Incomplete iNES inventory", {
                integrityCheck: "reconstruction",
            });
        await this.#verifySource(signal);
        if (observed.region_order.length !== layout.regions.length ||
            layout.regions.some((region, index) => observed.region_order[index] !== region.path) ||
            observed.bytes !== this.source.initial.size ||
            observed.sha256 !== expectedSha256)
            throw new ArtifactReaderFailure("integrity", "iNES reconstruction differs from the source", { integrityCheck: "reconstruction" });
        return {
            header: layout.header,
            reconstruction: {
                ...observed,
                verified: true,
            },
        };
    }
    provenance() {
        return [];
    }
    async close() {
        // Inventory borrows its admitting scope's descriptor. Extraction owns its
        // separately opened descriptor and retains this reader if close fails.
        this.#closed = true;
        this.#lifecycle.abort(this.#closedFailure);
        await this.#scope.close();
        await this.ownedSource?.close();
    }
    async #verifySource(signal, interruption) {
        this.#assertOpen(signal, interruption);
        try {
            await assertStableRegularFileIdentity(this.source.handle, this.path, this.source.initial, { symlinks: "reject", ...(signal === undefined ? {} : { signal }) });
        }
        catch (cause) {
            if (interruption !== undefined &&
                cause instanceof RegularFileOperationCancelled)
                throw interruption();
            if (cause instanceof RegularFileChangedError)
                throw new ArtifactReaderFailure("integrity", "iNES source changed during reading", { cause: cause.cause ?? cause, integrityCheck: "container-identity" });
            throw artifactOperationCause(cause);
        }
        // State validation is asynchronous even after the final byte was consumed.
        this.#assertOpen(signal, interruption);
    }
    #assertOpen(signal, interruption) {
        if (signal?.aborted === true && interruption !== undefined)
            throw interruption();
        abortIfNeeded(signal);
        if (this.#closed)
            throw this.#closedFailure;
    }
}
