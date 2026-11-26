import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, cancelledBy, carriedReason, init_analysisErrorBase, init_analysisErrorCore } from "./jsonSerialization-DAF9DVXC.js";
import { ArtifactFileCleanupFailure, ArtifactReaderFailure, artifactFileCancellationCause, artifactFileCompletion, artifactFilePrimaryFacts, bindArtifactFileCleanup, completedStableArtifactObservation, init_ArtifactFileOperation, init_ArtifactReader, init_StableArtifactFailure, init_StableArtifactObservation, init_resources, projectSelectedArtifactFileFailure, readerIntegrityFailure, stableArtifactInputFailure } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { OwnedCommandFailure, init_OwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { classifyLaunchFailure, classifyProviderOutcome, init_classifyProviderOutcome } from "./classifyProviderOutcome-BMRoGrMs.js";
import { init_ProviderOutcome, providerOutcomeOf } from "./ProviderOutcome-iJMiaLYK.js";

//#region dist/providers/classifyProviderFailure.js
var cleanupFailedRead, readCancellation, readPrimary, cleanupFailed, commandFailure, fileFailure, classifyProviderFailure;
function init_classifyProviderFailure() {
	return (init_classifyProviderFailure = __esmMin((() => {
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_analysisErrorCore();
		init_providerCleanupError();
		init_classifyProviderOutcome();
		init_OwnedCommand();
		init_ProviderOutcome();
		cleanupFailedRead = (cause) => cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined;
		readCancellation = (reason, read, dialect, details = {}) => {
			const reported = {
				...details,
				...read.partialObservation === undefined ? {} : { partialObservation: read.partialObservation },
				...dialect.observedOutput === undefined ? {} : { capturedOutput: dialect.observedOutput },
				...dialect.diagnostics === undefined ? {} : { diagnostics: {
					...details.diagnostics,
					...dialect.diagnostics
				} }
			};
			return dialect.interruption?.(reported) ?? cancelledBy(dialect.operation, carriedReason(reason), reported);
		};
		readPrimary = (read, dialect) => {
			if (read instanceof ArtifactFileCleanupFailure) {
				const outcome = read.fileCleanupFailure.outcome;
				if (outcome.kind === "failed") return classifyProviderFailure(outcome.cause, dialect);
				const cancellation = artifactFileCompletion(read)?.cancellation;
				if (cancellation !== undefined) return readCancellation(cancellation.reason, read, dialect);
			}
			return read.reason === "cancelled" ? readCancellation(artifactFileCancellationCause(read), read, dialect) : undefined;
		};
		cleanupFailed = (cause) => cause instanceof OwnedCommandFailure && cause.cleanupFailure !== null;
		commandFailure = (cause, outcome, dialect, command) => {
			const context = {
				providerId: dialect.providerId,
				...command(outcome)
			};
			if (!cleanupFailed(cause)) return classifyProviderOutcome(outcome, context);
			if (dialect.commandCleanup === undefined) return analysisErrorWithCleanupFailure(classifyProviderOutcome(outcome, context), new ProviderCleanupError(dialect.providerId, cause.resources, { reason: cause.cleanupFailure }, {
				operation: dialect.operation,
				cause
			}), dialect.operation);
			const primary = classifyProviderOutcome({
				...outcome,
				output: undefined
			}, context);
			return dialect.commandCleanup(cause, primary, outcome);
		};
		fileFailure = (cause, dialect, details) => {
			const { operation, file } = dialect;
			const { cause: physical, origin } = artifactFilePrimaryFacts(cause);
			if (origin === "owned-or-classified" && physical instanceof ArtifactReaderFailure) {
				if (physical.reason === "cancelled") {
					const { cause: _reader, ...cancellationDetails } = details;
					return readCancellation(artifactFileCancellationCause(physical), physical, dialect, cancellationDetails);
				}
				if (file === undefined) return undefined;
				if (physical.reason === "integrity") return readerIntegrityFailure(operation, file.path, physical, {
					...details,
					cause
				});
				if (physical.reason === "limit" && physical.boundary === "file-size") return file.fileSize?.(physical, {
					...details,
					cause
				});
				if (physical.reason === "path" || physical.reason === "format") return stableArtifactInputFailure(physical, operation, file.field, details);
				return undefined;
			}
			return file === undefined ? undefined : projectSelectedArtifactFileFailure(physical, operation, file.path, file.description, file.field, details);
		};
		classifyProviderFailure = (cause, dialect) => {
			if (cause instanceof AnalysisError) return dialect.attribute?.(cause) ?? cause;
			const outcome = providerOutcomeOf(cause);
			if (outcome !== undefined && dialect.command !== undefined) return commandFailure(cause, outcome, dialect, dialect.command);
			if (outcome?.kind === "launch-failed") return classifyLaunchFailure(outcome.failure, {
				providerId: dialect.providerId,
				operation: dialect.operation,
				details: { cause }
			});
			const { file } = dialect;
			const observation = file?.retainCompletedIdentity === true ? completedStableArtifactObservation(cause, file.path) : undefined;
			if (dialect.readCleanup !== undefined && cleanupFailedRead(cause)) {
				if (observation !== undefined) cause.retainPartialObservation(observation);
				return dialect.readCleanup(cause, readPrimary(cause, dialect));
			}
			const details = cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined ? { cleanup: cause.cleanup } : {};
			const failure = dialect.recognise?.(cause, details) ?? fileFailure(cause, dialect, details) ?? dialect.unclassified(cause, details);
			if (observation !== undefined) failure.retainPartialObservation(observation);
			bindArtifactFileCleanup(cause, failure);
			return failure;
		};
	})))();
}

//#endregion
export { classifyProviderFailure, init_classifyProviderFailure };