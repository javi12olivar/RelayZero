import { ArtifactPreparation } from "./ArtifactPreparation.js";
import { Readable, Transform } from "node:stream";
import { setImmediate } from "node:timers/promises";
import { ArtifactReaderFailure, copyArtifactEntry, assertProducedEntry, ArtifactResourceScope, assertArtifactReadActive, ArtifactFileSource, } from "../resources/index.js";
import { ArtifactStreamLifecycle, ownArtifactStream, } from "./OwnedArtifactStream.js";
import { readFileHandleChunks } from "../filesystem/readFileHandleChunks.js";
import { invariantViolation } from "../domain/internalInvariant.js";
/**
 * Serve entries that are byte ranges of one carrier file. Preparation runs
 * once; every traversal, open and completed entry stream rechecks the
 * carrier's identity, and close retires open streams before the carrier.
 * Encrypted entries are listed but never opened.
 */
export class PositionalArtifactReader {
    #scope = new ArtifactResourceScope();
    #lifecycle;
    #label;
    #source;
    #preparation = new ArtifactPreparation();
    #prepared;
    constructor(path, label, admitted) {
        this.#label = label;
        this.#lifecycle = new ArtifactStreamLifecycle(label);
        this.#source = new ArtifactFileSource(path, label, admitted);
    }
    /** Metadata from the same validated preparation that established entries and coverage. */
    get preparedFormatMetadata() {
        return this.#prepared?.formatMetadata;
    }
    async prepareContainer(expectedSha256, signal) {
        await this.#scope.run(async () => {
            this.assertOpen(signal);
            await this.#source.bindSha256(expectedSha256, signal);
        });
    }
    async *entries(signal, options) {
        await this.#scope.run(async () => {
            this.assertOpen(signal);
            // The first preparation validates before publishing; cached traversals
            // still need their own freshness admission.
            if (this.#prepared !== undefined)
                await this.#source.read(signal);
            await this.#preparation.run(signal, () => this.#prepare(signal), () => this.assertOpen(signal));
        });
        this.assertOpen(signal);
        const prepared = this.#prepared;
        if (prepared === undefined)
            throw invariantViolation("Positional artifact preparation did not complete");
        options?.onCoverage?.({
            ...prepared.coverage,
            limitations: [...prepared.coverage.limitations],
        });
        let index = 0;
        for (const entry of prepared.entries.values()) {
            // Yield between batches so a large inventory does not hold the loop.
            if (index++ % 256 === 0)
                await setImmediate();
            this.assertOpen(signal);
            yield copyArtifactEntry(entry);
        }
        this.assertOpen(signal);
    }
    async open(entry, signal) {
        return this.#scope.run(async () => {
            this.assertOpen(signal);
            const stored = this.#prepared?.entries.get(entry.adapterKey);
            assertProducedEntry(entry, stored, `${this.#label} entry does not match its owning inventory`);
            if (stored.encrypted)
                throw new ArtifactReaderFailure("unavailable", `Encrypted ${this.#label} member is unsupported: ${stored.path}`);
            const { handle } = await this.#source.read(signal);
            this.assertOpen(signal);
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
            const output = this.#entryStream(stored, lifecycle);
            ownArtifactStream(source, output, {
                scope: this.#scope,
                signal: streamSignal,
                cancellationFailure,
                label: this.#label,
            });
            return output;
        });
    }
    async close() {
        this.#lifecycle.close();
        await this.#scope.close();
        await this.#source.close();
        this.#prepared = undefined;
        this.#preparation.clear();
    }
    provenance() {
        return [];
    }
    /** Recheck the carrier's identity and borrow its descriptor. */
    verifyCarrier(signal) {
        return this.#source.read(signal);
    }
    /** Refuse work once the caller cancels or close begins. */
    assertOpen(signal) {
        assertArtifactReadActive(signal);
        if (this.#lifecycle.closed)
            throw new ArtifactReaderFailure("unavailable", `${this.#label} reader is closed`);
    }
    async #prepare(signal) {
        const prepared = await this.prepareEntries(signal);
        const entries = new Map(prepared.entries.map((entry) => [entry.adapterKey, entry]));
        await this.#source.read(signal);
        this.assertOpen(signal);
        this.#prepared = {
            entries,
            coverage: prepared.coverage,
            formatMetadata: prepared.formatMetadata,
        };
    }
    #entryStream(entry, lifecycle) {
        const label = this.#label;
        let bytes = 0;
        const check = async () => {
            if (bytes !== entry.declaredSize)
                throw new ArtifactReaderFailure("integrity", `${label} entry ended early: ${entry.path}`, { integrityCheck: "declared-size" });
            await lifecycle.verify((signal) => this.#source.read(signal));
        };
        return new Transform({
            transform(chunk, _encoding, callback) {
                bytes += chunk.length;
                callback(null, chunk);
            },
            flush(callback) {
                void check().then(() => callback(), (cause) => callback(cause instanceof Error
                    ? cause
                    : new Error(`${label} read failed`, { cause })));
            },
        });
    }
}
