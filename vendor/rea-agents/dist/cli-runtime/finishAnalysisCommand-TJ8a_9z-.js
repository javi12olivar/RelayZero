import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_isRecord, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisError, projectAnalysisErrorWithoutCapturedOutput } from "./analysisErrorProjection-bycI20-L.js";
import { ProviderCleanupError, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { dispatchQueuedInterrupts, init_queuedInterrupts } from "./queuedInterrupts-gxezF6I5.js";
import { finalizedResult, init_runOwned, runOwned } from "./runOwned-BkKv5e_3.js";

//#region dist/cli/finishAnalysisCommand.js
var finishAnalysisCommand;
function init_finishAnalysisCommand() {
	return (init_finishAnalysisCommand = __esmMin((() => {
		init_runOwned();
		init_analysisErrorProjection();
		init_providerCleanupError();
		init_result();
		init_queuedInterrupts();
		finishAnalysisCommand = async (run, service, providerId, canonicalOperation, signal, fallbackResource, options = {}) => {
			const projectFailure = (error) => projectAnalysisError(options.redactFailure?.(error) ?? error, "invocation");
			let initialFailure;
			let initialDiagnosticFailure;
			let closeFailed = false;
			const finalized = await runOwned(run, {
				providerId,
				operation: canonicalOperation,
				signal,
				...fallbackResource === undefined ? {} : { fallbackResource },
				partial: (value) => value,
				close: async () => {
					try {
						await service.close();
					} catch (cause) {
						closeFailed = true;
						throw cause;
					} finally {
						await dispatchQueuedInterrupts();
					}
				},
				inspectPrimary: (primary) => {
					if (primary.ok || options.failureProjection !== "initial") return;
					initialFailure = projectFailure(primary.error);
					initialDiagnosticFailure = primary.error.capturedOutput === undefined ? initialFailure : projectAnalysisErrorWithoutCapturedOutput(options.redactFailure?.(primary.error) ?? primary.error, "invocation");
				},
				recoverCompleted: (primary, observed) => {
					if (initialFailure !== undefined) return undefined;
					if (observed.cleanupResolvedByClose && observed.cleanup.kind === "released") {
						const recovered = options.recoverResolvedCleanup?.(primary);
						if (recovered !== undefined) return { value: recovered };
					}
					if (primary instanceof ProviderCleanupError && !primary.cleanupIncomplete && primary.cleanupPrimary === undefined && primary.completedObservation !== undefined) {
						const completed = options.recoverCompletedObservation?.(primary.completedObservation);
						if (completed !== undefined) return {
							value: completed,
							cancellationDiagnostics: { cleanup_history: projectFailure(primary) }
						};
					}
					return undefined;
				}
			});
			const result = finalizedResult(finalized);
			if (result.ok) return ok(result.value);
			const failure = projectFailure(result.error);
			if (initialFailure === undefined) return err(failure);
			if (!closeFailed) {
				const secondary = failure.details?.secondary_failures;
				return err(secondary === undefined ? initialFailure : {
					...initialFailure,
					details: {
						...initialFailure.details,
						secondary_failures: secondary
					}
				});
			}
			const diagnostics = failure.details?.diagnostics;
			return err({
				...failure,
				details: {
					...failure.details,
					diagnostics: {
						...isRecord(diagnostics) ? diagnostics : {},
						primary_error: initialDiagnosticFailure ?? initialFailure
					}
				}
			});
		};
	})))();
}

//#endregion
export { finishAnalysisCommand, init_finishAnalysisCommand };