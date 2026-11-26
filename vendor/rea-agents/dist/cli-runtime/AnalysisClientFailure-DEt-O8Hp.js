import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, cancelledBy, init_analysisErrorBase, init_analysisErrorCore, reattributedResourceConstraint } from "./jsonSerialization-DAF9DVXC.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactReaderFailure, bindArtifactFileCleanup, init_ArtifactFileOperation, init_ArtifactReader, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";

//#region dist/providers/AnalysisClientFailure.js
var analysisClientFailureContext, analysisClientFailureForOperation;
function init_AnalysisClientFailure() {
	return (init_AnalysisClientFailure = __esmMin((() => {
		init_analysisErrorCancellation();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_providerCleanupError();
		init_resources();
		analysisClientFailureContext = (cause, providerId, operation) => {
			const providerRequest = cause.providerRequest()?.facts;
			const attribute = (recorded) => providerRequest === undefined ? recorded : {
				provider_request: providerRequest,
				...recorded === undefined ? {} : { provider_diagnostics: recorded }
			};
			const diagnostics = attribute(cause.diagnostics);
			const invocationDiagnostics = cause.invocationDiagnostics === undefined ? undefined : attribute(cause.invocationDiagnostics);
			return {
				cause,
				...cause.limit === undefined ? {} : { limit: cause.limit },
				...cause.related === undefined ? {} : { related: cause.related },
				...cause.continuingCallerGuidance === undefined ? {} : { continuingCallerGuidance: cause.continuingCallerGuidance },
				...cause.cleanupPrimary === undefined ? {} : { cleanupPrimary: analysisClientFailureForOperation(cause.cleanupPrimary, providerId, operation) },
				...cause.partialObservation === undefined ? {} : { partialObservation: cause.partialObservation },
				...cause.capturedOutput === undefined ? {} : { capturedOutput: cause.capturedOutput },
				...diagnostics === undefined ? {} : { diagnostics },
				...invocationDiagnostics === undefined ? {} : { invocationDiagnostics },
				...cause.cleanupIncomplete ? { cleanup: {
					reason: cause.cleanup?.reason ?? cause.message,
					resources: cause.cleanupResources
				} } : {}
			};
		};
		analysisClientFailureForOperation = (cause, providerId, operation, callerDiagnostics) => {
			if (!(cause instanceof AnalysisError)) {
				const failure = new ProviderAdapterError(providerId, operation, {
					cause,
					...callerDiagnostics === undefined ? {} : { diagnostics: callerDiagnostics },
					...cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined ? { cleanup: cause.cleanup } : {}
				});
				bindArtifactFileCleanup(cause, failure);
				return failure;
			}
			const providerRequest = cause.providerRequest();
			if (providerRequest === undefined && !(cause instanceof AnalysisCancelledError) && !(cause instanceof ProviderAdapterError) && !(cause instanceof AnalysisCapabilityUnavailableError) && !(cause instanceof AnalysisAccessDeniedError) && !(cause instanceof AnalysisArtifactChangedError) && !(cause instanceof AnalysisTimeoutError) && !(cause instanceof AnalysisOutputError) && !(cause instanceof AnalysisResourceConstraintError)) return cause;
			const sourceContext = analysisClientFailureContext(cause, providerId, operation);
			const context = {
				...sourceContext,
				...callerDiagnostics === undefined ? {} : { diagnostics: {
					...sourceContext.diagnostics,
					...callerDiagnostics
				} }
			};
			let result;
			if (providerRequest !== undefined) result = providerRequest.reattribute(operation, context);
			else if (cause instanceof ProviderCleanupError) {
				const { diagnostics, ...outcomeContext } = context;
				result = new ProviderCleanupError(cause.providerId, cause.cleanupResources, diagnostics ?? {}, {
					...outcomeContext,
					operation,
					...cause.completedObservation === undefined ? {} : { completedObservation: cause.completedObservation },
					...cause.remediationAction === undefined ? {} : { remediationAction: cause.remediationAction }
				});
			} else if (cause instanceof AnalysisTimeoutError) result = new AnalysisTimeoutError(operation, cause.timeoutMs, {
				...context,
				...cause.userMessage === undefined ? {} : { userMessage: cause.userMessage },
				...cause.remediationAction === undefined ? {} : { remediationAction: cause.remediationAction },
				...cause.limit === undefined ? {} : { limit: cause.limit }
			});
			else if (cause instanceof AnalysisOutputError) result = new AnalysisOutputError(operation, cause.reason, {
				...context,
				cleanupOnly: cause.cleanupOnly,
				...cause.userMessage === undefined ? {} : { userMessage: cause.userMessage },
				...cause.remediationAction === undefined ? {} : { remediationAction: cause.remediationAction }
			});
			else if (cause instanceof AnalysisCancelledError) {
				const { cause: _wrapped, ...cancellationContext } = context;
				result = cancelledBy(operation, cause, cancellationContext);
			} else if (cause instanceof AnalysisCapabilityUnavailableError) result = new AnalysisCapabilityUnavailableError(cause.providerId, operation, cause.reason, {
				...context,
				...cause.userMessage === undefined ? {} : { userMessage: cause.userMessage },
				...cause.remediationAction === undefined ? {} : { remediationAction: cause.remediationAction },
				...cause.fallbackRemediationAction === undefined ? {} : { fallbackRemediationAction: cause.fallbackRemediationAction },
				...cause.siblingOperations === undefined ? {} : { siblingOperations: cause.siblingOperations },
				...cause.siblingReasons === undefined ? {} : { siblingReasons: cause.siblingReasons },
				retryable: cause.retryable
			});
			else if (cause instanceof AnalysisAccessDeniedError) result = new AnalysisAccessDeniedError(operation, cause.path, cause.systemCode, context);
			else if (cause instanceof AnalysisArtifactChangedError) result = new AnalysisArtifactChangedError(operation, cause.path, cause.reason, {
				...context,
				integrityCheck: cause.integrityCheck
			});
			else if (cause instanceof AnalysisResourceConstraintError) result = reattributedResourceConstraint(operation, cause, context);
			else if (cause instanceof ProviderAdapterError) result = new ProviderAdapterError(providerId, operation, {
				...context,
				...cause.userMessage === undefined ? {} : { userMessage: cause.userMessage },
				...cause.remediationAction === undefined ? {} : { remediationAction: cause.remediationAction }
			});
			else return cause;
			for (const secondary of cause.secondaryFailures) {
				if (secondary instanceof AnalysisCancelledError) result = analysisErrorWithCancellation(result, secondary);
				else result.retainSecondaryFailure(secondary);
			}
			return cause.cleanupIncomplete ? result.bindCleanupDependencies([cause]) : result.bindCleanupReleaseClaim({ get cleanupReleased() {
				return !cause.cleanupIncomplete;
			} });
		};
	})))();
}

//#endregion
export { analysisClientFailureContext, analysisClientFailureForOperation, init_AnalysisClientFailure };