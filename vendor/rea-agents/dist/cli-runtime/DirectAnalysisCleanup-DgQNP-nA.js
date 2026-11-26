import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisErrorBase, init_isRecord, init_jsonValue, isRecord, jsonValueSchema, sourcePublicationRecoveryOf } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, analysisErrorUserMessage, childFailureDiagnostics, composedCallerGuidance, init_analysisErrorPresentation, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisErrorWithCleanupFailure, analysisErrorWithCloseRejection, init_analysisErrorCleanup, withInheritedCleanupOwnership } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_evidence, init_evidenceValidation, recognizeEvidence, withEvidenceCallerInputPath } from "./nativeValueFlow-13oOEkkJ.js";

//#region dist/application/DirectAnalysisCleanup.js
var projectInvocationFailure, projectDirectAnalysisFailure, withSessionCleanup, directAnalysisCleanupFailure, managedAnalysisCleanupFailure;
function init_DirectAnalysisCleanup() {
	return (init_DirectAnalysisCleanup = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorProjection();
		init_analysisErrorPresentation();
		init_jsonValue();
		init_providerAdapterError();
		init_result();
		init_analysisErrorCleanup();
		init_evidence();
		init_evidenceValidation();
		projectInvocationFailure = (error) => projectAnalysisError(error, "invocation");
		projectDirectAnalysisFailure = (error, callerInputPath) => {
			const projection = projectInvocationFailure(error);
			const partial = projection.details?.partial_observation;
			const wrapped = isRecord(partial) && partial.kind === "unretained-evidence";
			const observation = recognizeEvidence(wrapped ? partial.evidence : partial);
			const rebound = !observation.ok || observation.value === undefined ? undefined : withEvidenceCallerInputPath(observation.value, callerInputPath);
			const completed = sourcePublicationRecoveryOf(error)?.completed;
			const completedWithPath = completed?.kind === "unretained-evidence" || completed?.kind === "inline-evidence" ? {
				...completed,
				evidence: withEvidenceCallerInputPath(completed.evidence, callerInputPath)
			} : completed?.kind === "unretained-observation" ? {
				...completed,
				observation: {
					...completed.observation,
					caller_input_path: callerInputPath
				}
			} : undefined;
			if (rebound === undefined && completedWithPath === undefined) return projection;
			return {
				...projection,
				details: {
					...projection.details,
					...rebound === undefined ? {} : { partial_observation: wrapped ? {
						...partial,
						evidence: rebound
					} : rebound },
					...completedWithPath === undefined ? {} : { completed_observation: completedWithPath }
				}
			};
		};
		withSessionCleanup = async (session, operation, onCleanupFailure) => {
			let value;
			try {
				value = await operation();
			} catch (cause) {
				const closed = await session.close();
				if (!closed.ok) throw new AggregateError([cause, closed.error], "Analysis and provider cleanup both failed", { cause });
				throw cause;
			}
			const closed = await session.close();
			return closed.ok ? value : onCleanupFailure(value, closed.error);
		};
		directAnalysisCleanupFailure = (result, error, callerInputPath) => {
			const project = (failure) => callerInputPath === undefined ? projectInvocationFailure(failure) : projectDirectAnalysisFailure(failure, callerInputPath);
			const cleanup = project(error);
			if (!result.ok) {
				const primary = project(result.error);
				const combined = analysisErrorWithCleanupFailure(result.error, error);
				return {
					error: "Analysis failed",
					...primary,
					code: "cleanup_incomplete",
					retryable: false,
					remediation: cleanup.remediation,
					details: {
						...primary.details,
						resources: [...combined.cleanupResources],
						cleanup: "incomplete",
						execution_failure: primary.details?.execution_failure ?? primary.code,
						cleanup_error: cleanup
					}
				};
			}
			return {
				error: "Analysis failed",
				...cleanup,
				code: "cleanup_incomplete",
				retryable: false,
				details: {
					...cleanup.details,
					cleanup: "incomplete",
					partial_observation: result.value
				}
			};
		};
		managedAnalysisCleanupFailure = (result, error) => {
			if (!result.ok) return err(analysisErrorWithCloseRejection(result.error, error));
			const failure = new ProviderAdapterError(error instanceof ProviderAdapterError ? error.providerId : "rea", "close_binary", {
				cause: error,
				...composedCallerGuidance({ remediation: error }),
				cleanup: {
					reason: analysisErrorUserMessage(error, "invocation"),
					resources: error.cleanupResources
				},
				...childFailureDiagnostics({ cleanup_error: { error } }, { partial_observation: jsonValueSchema.parse(result.value) })
			});
			return err(withInheritedCleanupOwnership(failure, error));
		};
	})))();
}

//#endregion
export { directAnalysisCleanupFailure, init_DirectAnalysisCleanup, managedAnalysisCleanupFailure, projectDirectAnalysisFailure, projectInvocationFailure, withSessionCleanup };