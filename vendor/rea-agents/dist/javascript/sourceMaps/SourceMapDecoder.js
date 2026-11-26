import { selectedSourceMapLimits, localSourceMapLimitsSchema, sourceMapLimitRecovery, } from "../../domain/sourceMapLimits.js";
import { analysisErrorWithCancellation } from "../../domain/analysisErrorCancellation.js";
import { AnalysisCapabilityUnavailableError, AnalysisInputError, cancelledBy, } from "../../domain/analysisErrorCore.js";
import { ArtifactOperationError } from "../../domain/artifactOperationError.js";
import { err } from "../../domain/result.js";
import { DEFAULT_WEB_SOURCE_MAP_DECODE_TIMEOUT_MS, } from "../../domain/webSourceLocation.js";
import { sourceMapCodecInputSchema } from "./SourceMapCodecProtocol.js";
import { runSourceMapCommand, } from "./SourceMapCommand.js";
import { jsonParts } from "../../domain/jsonSerialization.js";
const OPERATION = "trace_web_source_location";
/** Integrate the pinned upstream codec through an independently bounded owned process. */
export class SourceMapDecoder {
    dependencies;
    #tail = Promise.resolve();
    #closing = false;
    #closePromise;
    #pendingCleanup;
    constructor(dependencies = {}) {
        this.dependencies = dependencies;
    }
    /** Return complete point evidence after process and private-root cleanup. */
    trace(input, options) {
        if (this.#closing)
            return Promise.resolve(err(new AnalysisCapabilityUnavailableError("source-map-decoder", OPERATION, "Provider is closing")));
        const operation = this.#tail.then(() => this.#closing
            ? err(new AnalysisCapabilityUnavailableError("source-map-decoder", OPERATION, "Provider is closing"))
            : this.#trace(input, options));
        this.#tail = operation.then(() => undefined, () => undefined);
        return operation;
    }
    async #trace(input, options) {
        const cleanupFailure = await this.#retryCleanup();
        if (cleanupFailure !== undefined)
            return err(options?.signal?.aborted
                ? analysisErrorWithCancellation(cleanupFailure, cancelledBy(OPERATION, options.signal))
                : cleanupFailure);
        if (options?.signal?.aborted)
            return err(cancelledBy(OPERATION, options.signal));
        const request = sourceMapCodecInputSchema.safeParse({
            text: input.text,
            url: input.url,
            position: input.position,
        });
        if (!request.success)
            return err(new AnalysisInputError(OPERATION, { cause: request.error }));
        const selected = localSourceMapLimitsSchema.safeParse(input.limits ?? {});
        if (!selected.success)
            return err(new AnalysisInputError(OPERATION, { cause: selected.error }));
        const limits = selectedSourceMapLimits(selected.data);
        const capacityFailure = (field, value) => {
            const recovery = sourceMapLimitRecovery(field, value);
            return new ArtifactOperationError(OPERATION, "limit", undefined, `${input.path}: Source-map admission exhausted. ${recovery}`, { remediationAction: recovery });
        };
        if (Buffer.byteLength(input.text) > limits.mapBytes)
            return err(capacityFailure("map_bytes", limits.mapBytes));
        const encoded = [];
        let encodedBytes = 0;
        for (const part of jsonParts(request.data)) {
            const bytes = Buffer.byteLength(part);
            if (bytes > limits.outputBytes - encodedBytes)
                return err(capacityFailure("output_bytes", limits.outputBytes));
            encoded.push(part);
            encodedBytes += bytes;
        }
        if (options?.signal?.aborted)
            return err(cancelledBy(OPERATION, options.signal));
        const serialized = encoded.join("");
        const retainedCleanup = {};
        const response = await runSourceMapCommand(serialized, input.path, options, this.dependencies, retainedCleanup, input.decodeTimeoutMs ?? DEFAULT_WEB_SOURCE_MAP_DECODE_TIMEOUT_MS, limits);
        if (retainedCleanup.owner !== undefined)
            this.#pendingCleanup = retainedCleanup.owner;
        return response;
    }
    async close() {
        this.#closing = true;
        this.#closePromise ??= this.#tail
            .then(async () => {
            const failure = await this.#retryCleanup();
            if (failure !== undefined)
                throw failure;
        })
            .catch((cause) => {
            this.#closePromise = undefined;
            throw cause;
        });
        return this.#closePromise;
    }
    async #retryCleanup() {
        const pending = this.#pendingCleanup;
        if (pending === undefined)
            return undefined;
        const failure = await pending.close();
        if (failure !== undefined)
            return failure;
        this.#pendingCleanup = undefined;
        return undefined;
    }
}
