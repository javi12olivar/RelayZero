import { decodeStrictUtf8 } from "../../domain/strictUtf8.js";
import { isAbortOf } from "../../process/SignalAbort.js";
import { z } from "zod";
import { ArtifactReaderFailure, stableArtifactInputRecovery, artifactFileCancellationCause, artifactFilePrimaryFacts, bindArtifactFileCleanup, completedStableArtifact, readStableArtifact, } from "../../resources/index.js";
import { AnalysisError, primaryAnalysisError, } from "../../domain/analysisErrorBase.js";
import { AnalysisAccessDeniedError, AnalysisInputError, cancelledBy, carriedReason, } from "../../domain/analysisErrorCore.js";
import { ArtifactOperationError } from "../../domain/artifactOperationError.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
import { analysisErrorWithCleanupDependencies } from "../../domain/analysisErrorCleanup.js";
import { safeParseJson } from "../../domain/safeJson.js";
import { malformedInput, ParseFailureError, } from "../../domain/parseFailure.js";
import { errorMessage } from "../../kernel/errorMessage.js";
/** The ParseFailure format of a captured web artifact document. */
const WEB_ARTIFACT_FORMAT = "captured-web-artifact";
/** Decode exact UTF-8 content, preserving a BOM for digest verification. */
export const decodeWebArtifact = (bytes) => {
    try {
        return decodeStrictUtf8(bytes, "preserve");
    }
    catch (cause) {
        throw malformedInput(WEB_ARTIFACT_FORMAT, "Selected artifact is not valid UTF-8.", { cause });
    }
};
/** Own the independently completed physical reads throughout web acquisition. */
export class WebArtifactAcquisition {
    files = [];
    record(role, file, admission = "read") {
        const previous = this.files.findIndex((entry) => entry.role === role);
        const receipt = { role, file, admission };
        if (previous < 0)
            this.files.push(receipt);
        else
            this.files[previous] = receipt;
    }
    async read(role, path, maximumBytes, signal, scope) {
        try {
            const data = await readStableArtifact(path, maximumBytes, signal, undefined, scope);
            this.record(role, {
                path,
                sha256: data.sha256,
                bytes: data.bytes.length,
            });
            return data;
        }
        catch (cause) {
            const completed = completedStableArtifact(cause);
            if (completed !== undefined)
                this.record(role, {
                    path,
                    sha256: completed.sha256,
                    bytes: completed.bytes.length,
                });
            throw cause;
        }
    }
    async readJson(role, path, maximumBytes, signal, scope) {
        const data = await this.read(role, path, maximumBytes, signal, scope);
        const value = safeParseJson(decodeWebArtifact(data.bytes));
        if (!value.ok)
            throw malformedInput(WEB_ARTIFACT_FORMAT, value.error);
        return { ...data, value: value.value };
    }
    retain(error) {
        if (this.files.length > 0) {
            const observation = {
                kind: "web-artifact-acquisition",
                analysis: "not-performed",
                files: this.files.map((entry) => ({
                    ...entry,
                    file: { ...entry.file },
                })),
            };
            error.partialObservation = observation;
            primaryAnalysisError(error).partialObservation = observation;
        }
        return error;
    }
}
/** Preserve artifact format, integrity, OS I/O, and cancellation reasons. */
export const webArtifactReadError = (cause, context, signal) => {
    const primary = webArtifactPrimaryError(artifactFilePrimaryFacts(cause), context, signal);
    if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
        const cleanup = new ProviderCleanupError("captured-web-artifacts", cause.cleanup.resources, { reason: cause.cleanup.reason }, { cause, operation: context.operation });
        bindArtifactFileCleanup(cause, cleanup);
        return analysisErrorWithCleanupDependencies(primary, cleanup, context.operation);
    }
    return primary;
};
const webArtifactPrimaryError = ({ cause, origin }, context, signal) => {
    if (origin === "owned-or-classified" && cause instanceof AnalysisError)
        return cause;
    if (origin === "owned-or-classified" &&
        cause instanceof ArtifactReaderFailure &&
        cause.reason === "cancelled")
        return cancelledBy(context.operation, carriedReason(artifactFileCancellationCause(cause)));
    if (origin === "owned-or-classified" && isAbortOf(cause, signal))
        return cancelledBy(context.operation, signal);
    const selection = context.callerSelected
        ? selectedFileError({ cause, origin }, context)
        : undefined;
    if (selection !== undefined)
        return selection;
    if (origin === "owned-or-classified" &&
        cause instanceof ArtifactReaderFailure)
        return new ArtifactOperationError(context.operation, cause.reason, cause.details, cause.reason === "limit" && context.limitRecovery !== undefined
            ? `${cause.message} ${context.limitRecovery}`
            : cause.message, {
            cause,
            ...(cause.reason === "limit" && context.limitRecovery !== undefined
                ? { remediationAction: context.limitRecovery }
                : {}),
            ...(cause.integrityCheck === undefined
                ? {}
                : { integrityCheck: cause.integrityCheck }),
        });
    if (cause instanceof Error &&
        "code" in cause &&
        typeof cause.code === "string" &&
        "syscall" in cause &&
        typeof cause.syscall === "string")
        return new ArtifactOperationError(context.operation, "io", undefined, `${context.targetPath}: ${cause.code}: ${cause.message}`, { cause });
    // A malformed producer document, distinct from host I/O failures.
    const malformed = cause instanceof ParseFailureError && cause.kind === "malformed"
        ? cause
        : undefined;
    if (!context.callerSelected && malformed !== undefined)
        return new ArtifactOperationError(context.operation, "format", undefined, `${context.targetPath}: ${malformed.message}`, { cause });
    const invalid = malformed ?? (cause instanceof z.ZodError ? cause : undefined);
    if (invalid !== undefined)
        return new AnalysisInputError(context.operation, { cause }, [
            {
                path: context.field,
                reason: "invalid_format",
                message: `${context.targetPath}: ${invalid.message}`,
            },
        ]);
    return new ProviderAdapterError("captured-web-artifacts", context.operation, {
        cause,
        diagnostics: {
            target_path: context.targetPath,
            field: context.field.join("."),
            error_message: errorMessage(cause),
        },
    });
};
/**
 * Report a missing, non-regular or unreadable caller-selected file as the
 * caller's selection or a host permission denial, not an artifact fault.
 */
const selectedFileError = ({ cause, origin }, context) => {
    const selected = (message) => new AnalysisInputError(context.operation, {
        cause,
        ...(cause instanceof ArtifactReaderFailure
            ? stableArtifactInputRecovery(cause)
            : {}),
    }, [{ path: context.field, reason: "invalid_value", message }]);
    if (origin === "owned-or-classified" &&
        cause instanceof ArtifactReaderFailure)
        return cause.reason === "path" ? selected(cause.message) : undefined;
    const code = cause instanceof Error && "code" in cause ? String(cause.code) : "";
    if (code === "EACCES" || code === "EPERM")
        return new AnalysisAccessDeniedError(context.operation, context.targetPath, code, { cause });
    if (code === "ENOENT" || code === "ENOTDIR")
        return selected(`Selected file could not be read (${code}): ${context.targetPath}`);
    return undefined;
};
