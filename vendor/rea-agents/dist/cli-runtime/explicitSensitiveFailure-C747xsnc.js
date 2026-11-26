import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, EvidenceFileError, cancelledBy, init_analysisErrorCore, init_evidenceErrors, init_explicitSensitiveValues, redactExplicitText, resourceConstraintRecovery } from "./jsonSerialization-DAF9DVXC.js";
import { BrowserObservationError, ProviderAdapterError, init_browserObservationError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { fileSnapshotPartialObservationSchema, init_fileSnapshotObservation } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_jsonPointer, unescapeJsonPointerToken } from "./jsonPointer-aolC6MvJ.js";

//#region dist/domain/explicitSensitiveFailure.js
var excludeSnapshotIdentity, redactSensitivePointer, redactExplicitFailure, redactSensitiveFailure, redactFailure, mirrorCleanup;
function init_explicitSensitiveFailure() {
	return (init_explicitSensitiveFailure = __esmMin((() => {
		init_jsonPointer();
		init_browserObservationError();
		init_evidenceErrors();
		init_analysisErrorCore();
		init_explicitSensitiveValues();
		init_providerAdapterError();
		init_providerCleanupError();
		init_fileSnapshotObservation();
		excludeSnapshotIdentity = (value, text) => {
			if (value === null || typeof value !== "object" || !("kind" in value) || value.kind !== "file-snapshot-hash" && value.kind !== "file-snapshot-read") return undefined;
			const parsed = fileSnapshotPartialObservationSchema.safeParse(value);
			if (!parsed.success) return undefined;
			const snapshot = parsed.data;
			const exclude = (identity) => identity !== null && text(identity) !== identity ? null : identity;
			const path = exclude(snapshot.path);
			if (snapshot.kind === "file-snapshot-hash") {
				const sha256 = exclude(snapshot.sha256);
				return {
					...snapshot,
					path,
					sha256
				};
			}
			const admitted_sha256 = exclude(snapshot.admitted_sha256);
			return {
				...snapshot,
				path,
				admitted_sha256
			};
		};
		redactSensitivePointer = (pointer, text) => {
			let parent = "";
			for (const segment of pointer.split("/").slice(1)) {
				const decoded = unescapeJsonPointerToken(segment);
				const child = `${parent}/${segment}`;
				if (text(decoded) !== decoded || text(child) !== child) return parent;
				parent = child;
			}
			return parent;
		};
		redactExplicitFailure = (error, values) => {
			if (values.length === 0) return error;
			return redactSensitiveFailure(error, (value) => redactExplicitText(value, values));
		};
		redactSensitiveFailure = (error, text) => {
			const snapshot = excludeSnapshotIdentity(error.partialObservation, text);
			if (snapshot !== undefined) error.partialObservation = snapshot;
			const redacted = redactFailure(error, text);
			if (redacted !== error && error.partialObservation !== undefined) redacted.retainPartialObservation(error.partialObservation);
			if (redacted !== error) for (const secondary of error.secondaryFailures) redacted.retainSecondaryFailure(redactSensitiveFailure(secondary, text));
			return redacted === error ? error : mirrorCleanup(error, redacted, text);
		};
		redactFailure = (error, text) => {
			const path = (parts, ordinaryNames) => {
				const retained = [];
				for (const part of parts) {
					if (typeof part !== "string") {
						retained.push(part);
					} else if (!ordinaryNames && part.startsWith("/")) {
						const pointer = redactSensitivePointer(part, text);
						retained.push(pointer);
						if (pointer !== part) break;
					} else {
						if (text(part) !== part) break;
						retained.push(part);
					}
				}
				return retained;
			};
			const diagnostics = (value) => Object.fromEntries(Object.entries(value).filter(([key]) => text(key) === key).map(([key, item]) => [key, visit(item)]));
			const visit = (value) => {
				const snapshot = excludeSnapshotIdentity(value, text);
				if (snapshot !== undefined) return snapshot;
				if (typeof value === "string") return text(value);
				if (Array.isArray(value)) return value.map(visit);
				if (typeof value === "object" && value !== null) return diagnostics(value);
				return value;
			};
			const issueProjection = (issue) => ({
				...issue,
				path: path(issue.path, issue.reason === "unknown_argument"),
				...issue.message === undefined ? {} : { message: text(issue.message) },
				...issue.expected === undefined ? {} : { expected: visit(issue.expected) },
				...issue.observed === undefined ? {} : { observed: visit(issue.observed) }
			});
			const guidance = error.continuingCallerGuidance;
			const context = {
				cause: error,
				...error.limit === undefined ? {} : { limit: error.limit },
				...error.related === undefined ? {} : { related: error.related },
				...guidance === undefined ? {} : { continuingCallerGuidance: {
					...guidance.userMessage === undefined ? {} : { userMessage: text(guidance.userMessage) },
					...guidance.remediationAction === undefined ? {} : { remediationAction: text(guidance.remediationAction) }
				} },
				...error.cleanupPrimary === undefined ? {} : { cleanupPrimary: redactSensitiveFailure(error.cleanupPrimary, text) },
				...error.diagnostics === undefined ? {} : { diagnostics: diagnostics(error.diagnostics) },
				...error.invocationDiagnostics === undefined ? {} : { invocationDiagnostics: diagnostics(error.invocationDiagnostics) },
				...error.capturedOutput === undefined ? {} : { capturedOutput: {
					...error.capturedOutput,
					stdout: text(error.capturedOutput.stdout),
					stderr: text(error.capturedOutput.stderr)
				} },
				...error.cleanup === undefined ? {} : { cleanup: {
					reason: text(error.cleanup.reason),
					resources: error.cleanup.resources.map(text)
				} }
			};
			if (error instanceof BrowserObservationError) return new BrowserObservationError(error.operation, error.reason, {
				...context,
				...error.detail === undefined ? {} : { detail: text(error.detail) },
				...error.remediationAction === undefined ? {} : { remediationAction: text(error.remediationAction) }
			});
			if (error instanceof EvidenceFileError) {
				const identity = (value) => value !== undefined && text(value) !== value ? undefined : value;
				const retainedPath = identity(error.path);
				const publishedPath = identity(error.published?.path);
				return new EvidenceFileError(error.operation, error.reason, {
					...context,
					...error.systemCode === undefined || text(error.systemCode) !== error.systemCode ? {} : { systemCode: error.systemCode },
					...retainedPath === undefined ? {} : { path: retainedPath },
					...error.detectedKind === undefined ? {} : { detectedKind: error.detectedKind },
					...error.userMessage === undefined ? {} : { userMessage: text(error.userMessage) },
					...error.published === undefined ? {} : { published: {
						bytes: error.published.bytes,
						...publishedPath === undefined ? {} : { path: publishedPath }
					} },
					...error.contentIssues === undefined ? {} : { contentIssues: error.contentIssues.map(issueProjection) }
				});
			}
			if (error instanceof AnalysisCancelledError) {
				const { cause: _redacted, ...cancellationContext } = context;
				return cancelledBy(error.operation, error, {
					...cancellationContext,
					...error.userMessage === undefined ? {} : { userMessage: text(error.userMessage) }
				});
			}
			if (error instanceof AnalysisTimeoutError) return new AnalysisTimeoutError(error.operation, error.timeoutMs, {
				...context,
				...error.userMessage === undefined ? {} : { userMessage: text(error.userMessage) },
				...error.remediationAction === undefined ? {} : { remediationAction: text(error.remediationAction) },
				...error.limit === undefined ? {} : { limit: error.limit },
				...error.related === undefined ? {} : { related: error.related }
			});
			if (error instanceof AnalysisAccessDeniedError) return new AnalysisAccessDeniedError(error.operation, text(error.path), error.systemCode, context);
			if (error instanceof AnalysisArtifactChangedError) return new AnalysisArtifactChangedError(error.operation, text(error.path), text(error.reason), {
				...context,
				integrityCheck: error.integrityCheck
			});
			if (error instanceof AnalysisInputError) return new AnalysisInputError(error.operation, {
				...context,
				...error.userMessage === undefined ? {} : { userMessage: text(error.userMessage) },
				...error.remediationAction === undefined ? {} : { remediationAction: text(error.remediationAction) },
				conformsToInputContract: error.conformsToInputContract
			}, error.issues.map(issueProjection));
			if (error instanceof AnalysisOutputError) return new AnalysisOutputError(error.operation, text(error.reason), {
				...context,
				...error.userMessage === undefined ? {} : { userMessage: text(error.userMessage) },
				...error.remediationAction === undefined ? {} : { remediationAction: text(error.remediationAction) },
				cleanupOnly: error.cleanupOnly
			});
			if (error instanceof AnalysisCapabilityUnavailableError) return new AnalysisCapabilityUnavailableError(error.providerId, error.operation, text(error.reason), {
				...context,
				...error.userMessage === undefined ? {} : { userMessage: text(error.userMessage) },
				...error.remediationAction === undefined ? {} : { remediationAction: text(error.remediationAction) },
				...error.fallbackRemediationAction === undefined ? {} : { fallbackRemediationAction: text(error.fallbackRemediationAction) },
				...error.siblingOperations === undefined ? {} : { siblingOperations: error.siblingOperations },
				...error.siblingReasons === undefined ? {} : { siblingReasons: Object.fromEntries(Object.entries(error.siblingReasons).map(([op, msg]) => [op, text(msg)])) },
				...error.retryable ? { retryable: true } : {}
			});
			if (error instanceof AnalysisResourceConstraintError) return new AnalysisResourceConstraintError(error.operation, error.resource, text(error.reason), error.reportedLimits === null ? null : diagnostics(error.reportedLimits), {
				...context,
				...resourceConstraintRecovery(error, text),
				...error.limit === undefined ? {} : { limit: error.limit },
				...error.related === undefined ? {} : { related: error.related },
				...error.requestSent === undefined ? {} : { requestSent: error.requestSent }
			});
			if (error instanceof ProviderCleanupError) return new ProviderCleanupError(error.providerId, error.cleanupResources.map(text), diagnostics(error.diagnostics ?? {}), {
				...context,
				operation: error.operation
			});
			if (error instanceof ProviderAdapterError) return new ProviderAdapterError(error.providerId, error.operation, {
				...context,
				...error.userMessage === undefined ? {} : { userMessage: text(error.userMessage) },
				...error.remediationAction === undefined ? {} : { remediationAction: text(error.remediationAction) }
			});
			return error;
		};
		mirrorCleanup = (source, redacted, redact) => redacted.bindCleanupDependencies([source], { get cleanupResources() {
			return source.cleanupResources.map(redact);
		} });
	})))();
}

//#endregion
export { init_explicitSensitiveFailure, redactExplicitFailure, redactSensitiveFailure };