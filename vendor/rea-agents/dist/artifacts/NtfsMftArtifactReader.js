import { ArtifactPreparation } from "./ArtifactPreparation.js";
import { ntfsMftMetadataSchema, } from "../domain/artifactFormatMetadata.js";
import { createMftDecoder, } from "../domain/windows/ntfsMft.js";
import { ArtifactReaderFailure, ArtifactResourceScope, assertArtifactReadActive, ArtifactFileSource, } from "../resources/index.js";
import { readFileHandleChunks } from "../filesystem/readFileHandleChunks.js";
/**
 * An MFT stream is its own content: the FILE records describe the source
 * volume, not members inside the stream, so header facts are attached to
 * the root occurrence.
 */
export class NtfsMftArtifactReader {
    format = "ntfs-mft";
    #scope = new ArtifactResourceScope();
    #source;
    #preparation = new ArtifactPreparation();
    #metadata;
    #limitations = [];
    #closing = false;
    constructor(path, admitted) {
        this.#source = new ArtifactFileSource(path, "$MFT stream", admitted);
    }
    formatMetadata() {
        return this.#metadata === undefined
            ? undefined
            : structuredClone(this.#metadata);
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
            this.#assertOpen(signal);
            await this.#source.read(signal);
        });
        // An MFT declares no members, so the root occurrence is the whole
        // inventory; the coverage callback reports what its parse did not establish.
        options?.onCoverage?.(coverageOf(this.#limitations));
        this.#assertOpen(signal);
    }
    async open(entry, _signal) {
        return this.#scope.run(async () => {
            throw new ArtifactReaderFailure("unavailable", `$MFT stream declares no member to open for ${entry.path}`);
        });
    }
    async close() {
        this.#closing = true;
        await this.#scope.close();
        await this.#source.close();
        this.#metadata = undefined;
    }
    provenance() {
        return [];
    }
    #assertOpen(signal) {
        assertArtifactReadActive(signal);
        if (this.#closing)
            throw new ArtifactReaderFailure("unavailable", "$MFT stream reader is closed");
    }
    async #prepare(signal) {
        const image = await this.#decode(signal);
        await this.#source.read(signal);
        this.#metadata = ntfsMftMetadataSchema.parse(image.metadata);
        this.#limitations = image.limitations;
    }
    async #decode(signal) {
        const { handle, initial } = await this.#source.read(signal);
        const decoder = createMftDecoder(initial.size);
        if (!decoder.ok)
            throw this.#failure(decoder.error);
        if (initial.size > 0)
            for await (const chunk of readFileHandleChunks(handle, {
                end: initial.size - 1,
                signal,
                cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", "$MFT stream read cancelled", {
                    cause: reason,
                }),
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
            ? new ArtifactReaderFailure("format", `$MFT stream is malformed: ${failure.message}`)
            : new ArtifactReaderFailure("limit", `$MFT stream exceeds a fixed limit: ${failure.message}`, failure.boundary === undefined ? {} : { boundary: failure.boundary });
    }
}
const coverageOf = (limitations) => limitations.length === 0
    ? { status: "complete", limitations: [] }
    : { status: "unknown", limitations };
