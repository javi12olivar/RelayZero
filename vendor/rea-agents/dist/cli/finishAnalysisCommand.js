import { finalizedResult, runOwned, } from "../providers/runOwned.js";
import { projectAnalysisError, projectAnalysisErrorWithoutCapturedOutput, } from "../domain/analysisErrorProjection.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { err, ok } from "../domain/result.js";
import { dispatchQueuedInterrupts } from "../process/queuedInterrupts.js";
import { isRecord } from "../kernel/isRecord.js";
/** Finish a one-shot CLI operation while retaining primary results through close. */
export const finishAnalysisCommand = async (run, service, providerId, canonicalOperation, signal, fallbackResource, options = {}) => {
    // The command releases its provider resources and runtime before the caller
    // reads this result, so guidance needing a continuing session is omitted.
    const projectFailure = (error) => projectAnalysisError(options.redactFailure?.(error) ?? error, "invocation");
    // Some one-shot commands promise the original failure snapshot even when
    // close retries and mutates the producer's live cleanup status.
    let initialFailure;
    let initialDiagnosticFailure;
    let closeFailed = false;
    const finalized = await runOwned(run, {
        providerId,
        operation: canonicalOperation,
        signal,
        ...(fallbackResource === undefined ? {} : { fallbackResource }),
        partial: (value) => value,
        close: async () => {
            try {
                await service.close();
            }
            catch (cause) {
                closeFailed = true;
                throw cause;
            }
            finally {
                await dispatchQueuedInterrupts();
            }
        },
        inspectPrimary: (primary) => {
            if (primary.ok || options.failureProjection !== "initial")
                return;
            initialFailure = projectFailure(primary.error);
            initialDiagnosticFailure =
                primary.error.capturedOutput === undefined
                    ? initialFailure
                    : projectAnalysisErrorWithoutCapturedOutput(options.redactFailure?.(primary.error) ?? primary.error, "invocation");
        },
        recoverCompleted: (primary, observed) => {
            if (initialFailure !== undefined)
                return undefined;
            if (observed.cleanupResolvedByClose &&
                observed.cleanup.kind === "released") {
                const recovered = options.recoverResolvedCleanup?.(primary);
                if (recovered !== undefined)
                    return { value: recovered };
            }
            if (primary instanceof ProviderCleanupError &&
                !primary.cleanupIncomplete &&
                primary.cleanupPrimary === undefined &&
                primary.completedObservation !== undefined) {
                const completed = options.recoverCompletedObservation?.(primary.completedObservation);
                if (completed !== undefined)
                    return {
                        value: completed,
                        cancellationDiagnostics: {
                            cleanup_history: projectFailure(primary),
                        },
                    };
            }
            return undefined;
        },
    });
    const result = finalizedResult(finalized);
    if (result.ok)
        return ok(result.value);
    const failure = projectFailure(result.error);
    if (initialFailure === undefined)
        return err(failure);
    if (!closeFailed) {
        // Close may mutate cleanup state, including resolving the cleanup of a
        // cancelled primary; preserve the snapshot and add later failures.
        const secondary = failure.details?.secondary_failures;
        return err(secondary === undefined
            ? initialFailure
            : {
                ...initialFailure,
                details: {
                    ...initialFailure.details,
                    secondary_failures: secondary,
                },
            });
    }
    const diagnostics = failure.details?.diagnostics;
    return err({
        ...failure,
        details: {
            ...failure.details,
            diagnostics: {
                ...(isRecord(diagnostics) ? diagnostics : {}),
                primary_error: initialDiagnosticFailure ?? initialFailure,
            },
        },
    });
};
