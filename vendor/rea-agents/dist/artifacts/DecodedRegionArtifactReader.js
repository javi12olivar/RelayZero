import { ArtifactPreparation } from "./ArtifactPreparation.js";
import { Readable } from "node:stream";
import { setImmediate } from "node:timers/promises";
import { ArtifactReaderFailure, copyArtifactEntry, assertProducedEntry, ArtifactResourceScope, assertArtifactReadActive, ArtifactFileSource, } from "../resources/index.js";
import { readFileHandleChunks } from "../filesystem/readFileHandleChunks.js";
const addressText = (address) => `0x${address.toString(16).padStart(8, "0")}`;
/** The shared region file name: inclusive start and end as eight hex digits. */
export const regionFileName = (start, end) => `${addressText(start)}-${addressText(end)}.bin`;
/**
 * Decode a whole firmware file once, retain its region bytes for the reader's
 * lifetime, and serve each region as an inventory entry.
 */
export class DecodedRegionArtifactReader {
    format;
    #scope = new ArtifactResourceScope();
    #regions = new Map();
    #streams = new Set();
    #source;
    #decoding;
    #preparation = new ArtifactPreparation();
    /** Whole-file facts only; the region map is the sole owner of region bytes. */
    #described;
    #closing = false;
    constructor(path, format, decoding, admitted) {
        this.format = format;
        this.#decoding = decoding;
        this.#source = new ArtifactFileSource(path, decoding.label, admitted);
    }
    formatMetadata() {
        const metadata = this.#described?.metadata;
        return metadata === undefined ? undefined : { ...metadata };
    }
    containerIntegrity() {
        const integrity = this.#described?.containerIntegrity;
        return integrity === undefined ? undefined : { ...integrity };
    }
    async prepareContainer(expectedSha256, signal) {
        await this.#scope.run(async () => {
            this.#assertOpen(signal);
            await this.#source.bindSha256(expectedSha256, signal);
        });
    }
    async *entries(signal, options) {
        await this.#scope.run(async () => {
            this.#assertOpen(signal);
            await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
            await this.#source.read(signal);
        });
        this.#assertOpen(signal);
        const coverage = this.#described?.coverage;
        if (coverage !== undefined)
            options?.onCoverage?.({
                ...coverage,
                limitations: [...coverage.limitations],
            });
        let index = 0;
        for (const { entry } of this.#regions.values()) {
            if (index % 256 === 0)
                await setImmediate();
            index += 1;
            this.#assertOpen(signal);
            yield copyArtifactEntry(entry);
        }
        this.#assertOpen(signal);
    }
    async open(entry, signal) {
        return this.#scope.run(async () => {
            this.#assertOpen(signal);
            const region = this.#regions.get(entry.adapterKey);
            assertProducedEntry(entry, region?.entry, `${this.#decoding.label} entry does not match its owning inventory`);
            // Decoded bytes are retained, so only the carrier identity is rechecked.
            await this.#source.read(signal);
            this.#assertOpen(signal);
            const output = Readable.from(this.#regionChunks(region.bytes, signal), {
                objectMode: false,
            });
            const onAbort = () => {
                output.destroy(new ArtifactReaderFailure("cancelled", `${this.#decoding.label} region read cancelled`, { cause: signal?.reason }));
            };
            signal?.addEventListener("abort", onAbort, { once: true });
            output.once("close", () => signal?.removeEventListener("abort", onAbort));
            output.on("error", () => undefined);
            this.#streams.add(output);
            output.once("close", () => this.#streams.delete(output));
            // Draining the scope must wait for the readable side, including an
            // abandoned consumer and an in-flight asynchronous chunk producer.
            void this.#scope
                .run(() => new Promise((resolve) => {
                output.once("close", () => resolve());
            }))
                .catch((cause) => output.destroy(cause instanceof Error
                ? cause
                : new ArtifactReaderFailure("unavailable", `${this.#decoding.label} stream ownership failed`, { cause })));
            return output;
        });
    }
    async *#regionChunks(bytes, signal) {
        // Keep cached bytes isolated from consumers without copying a whole
        // region for every open. Match descriptor reads' 64 KiB chunk size.
        for (let offset = 0; offset < bytes.length; offset += 64 * 1024) {
            await setImmediate();
            this.#assertOpen(signal);
            yield Buffer.from(bytes.subarray(offset, offset + 64 * 1024));
        }
    }
    async close() {
        this.#closing = true;
        for (const stream of this.#streams)
            stream.destroy(new ArtifactReaderFailure("unavailable", `${this.#decoding.label} reader closed`));
        await this.#scope.close();
        await this.#source.close();
        this.#regions.clear();
    }
    provenance() {
        return [];
    }
    #assertOpen(signal) {
        assertArtifactReadActive(signal);
        if (this.#closing)
            throw new ArtifactReaderFailure("unavailable", `${this.#decoding.label} reader is closed`);
    }
    async #prepare(signal) {
        const described = this.#decoding.describe(await this.#decode(signal));
        const regions = new Map();
        let index = 0;
        for (const region of described.regions) {
            if (index % 256 === 0)
                await setImmediate();
            this.#assertOpen(signal);
            const entry = {
                path: region.path,
                kind: "file",
                declaredSize: region.bytes.length,
                compressedSize: null,
                executable: false,
                encrypted: false,
                byteOffset: region.byteOffset,
                declaredIntegrity: null,
                unpacked: false,
                limitations: [],
                adapterKey: `${this.#decoding.keyPrefix}:${String(index)}`,
                formatMetadata: region.formatMetadata,
            };
            regions.set(entry.adapterKey, { entry, bytes: region.bytes });
            index += 1;
        }
        const { regions: _regions, ...facts } = described;
        await this.#source.read(signal);
        this.#assertOpen(signal);
        this.#regions = regions;
        this.#described = facts;
    }
    async #decode(signal) {
        const { handle, initial } = await this.#source.read(signal);
        const decoder = this.#decoding.createDecoder(initial.size);
        if (!decoder.ok)
            throw this.#failure(decoder.error);
        // Reading only the admitted extent keeps decoded bytes within the arena.
        if (initial.size > 0)
            for await (const chunk of readFileHandleChunks(handle, {
                end: initial.size - 1,
                signal,
                cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", `${this.#decoding.label} read cancelled`, { cause: reason }),
            })) {
                this.#assertOpen(signal);
                const written = decoder.value.write(chunk);
                if (!written.ok)
                    throw this.#failure(written.error);
            }
        const image = decoder.value.finish();
        if (!image.ok)
            throw this.#failure(image.error);
        return image.value;
    }
    #failure(failure) {
        return failure.kind === "format"
            ? new ArtifactReaderFailure("format", `${this.#decoding.label} is malformed: ${failure.message}`)
            : new ArtifactReaderFailure("limit", `${this.#decoding.label} exceeds a fixed limit: ${failure.message}`, failure.boundary === undefined ? {} : { boundary: failure.boundary });
    }
}
