import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, errorMessage, init_analysisErrorCore, init_errorMessage, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { AnalysisCleanupLease, RegularFileCleanupFailure, init_AnalysisCleanupLease, init_OwnedRegularFile, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { DarwinProcessOwnershipInspectionError, ProcessOwnershipIdentityBatchFailure, ProcessOwnershipInspectionCancelled, init_DarwinProcessRunTokenReader, init_ProcessInspectionCancellation, init_ProcessInspectionCleanup, processInspectionCancellations, processInspectionCleanupFailures } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { OwnedCommandFailure, init_OwnedCommand } from "./OwnedCommand-9zrM5O3T.js";

//#region dist/providers/OwnedCommandCleanup.js
var retainOwnedCommandCleanup, ProcessInspectionAnalysisCancelledError, processInspectionFailure, processInspectionCancellationError, retainArtifactCommandCleanup, retainProcessInspectionCleanup, bindProcessInspectionCancellations;
function init_OwnedCommandCleanup() {
	return (init_OwnedCommandCleanup = __esmMin((() => {
		init_OwnedRegularFile();
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_ProcessInspectionCancellation();
		init_ProcessInspectionCleanup();
		init_resources();
		init_analysisErrorCleanup();
		init_jsonValue();
		init_providerCleanupError();
		init_DarwinProcessRunTokenReader();
		init_OwnedCommand();
		init_errorMessage();
		retainOwnedCommandCleanup = (cause, resourceOwner, providerId, operation, completed) => {
			const commandFailure = cause instanceof OwnedCommandFailure ? cause : undefined;
			const cleanups = [];
			for (const preparation of processInspectionCleanupFailures(processInspectionFailure(cause))) {
				const darwin = preparation instanceof DarwinProcessOwnershipInspectionError;
				const owner = darwin ? preparation.cleanupOwner : preparation.owner;
				const cleanup = darwin ? preparation.cleanupFailure ?? new ProviderCleanupError(providerId, ["process ownership inspection"], { reason: preparation.message }, {
					cause: preparation,
					operation
				}) : new ProviderCleanupError(providerId, [preparation.path], { reason: errorMessage(preparation.cleanupCause) }, {
					cause: preparation,
					operation
				});
				cleanups.push(cleanup);
				if (owner === undefined) continue;
				const lease = new AnalysisCleanupLease(() => owner.close(), cleanup);
				lease.bindCleanupError(cleanup);
				resourceOwner.retain({
					close: () => lease.release(),
					get cleanupResources() {
						return lease.released ? [] : cleanup.cleanupResources;
					}
				}, cleanup.cleanupResources[0] ?? "process ownership inspection");
			}
			if (commandFailure !== undefined && (commandFailure.cleanupOwner !== undefined || commandFailure.cleanupFailure !== null)) {
				const supervisor = commandFailure.cleanupOwner;
				const failureForStop = (reason, result) => new ProviderCleanupError(providerId, commandFailure.resources, {
					reason,
					...result === undefined ? {} : { process_cleanup: jsonValueSchema.parse(result) }
				}, {
					cause,
					operation,
					...completed === undefined ? {} : { capturedOutput: completed.capturedOutput }
				});
				const cleanup = failureForStop(commandFailure.cleanupFailure ?? "Provider prerequisite cleanup remains incomplete", commandFailure.cleanupResult);
				cleanups.push(cleanup);
				if (supervisor === undefined) return cleanups;
				const lease = new AnalysisCleanupLease(async () => {
					const stopped = await supervisor.stop();
					if (stopped.status === "incomplete") {
						const failure = failureForStop(stopped.reason, stopped.cleanupResult);
						failure.bindCleanupResourceOwner(lease);
						lease.bindCleanupError(failure);
						throw failure;
					}
				}, commandFailure.resources);
				cleanup.bindCleanupResourceOwner(lease);
				lease.bindCleanupError(cleanup);
				resourceOwner.retain({
					close: () => lease.release(),
					get cleanupResources() {
						return lease.released ? [] : lease.cleanupResources ?? [];
					}
				}, commandFailure.resources[0] ?? "Provider prerequisite process");
			}
			return cleanups;
		};
		ProcessInspectionAnalysisCancelledError = class extends AnalysisCancelledError {
			inspectionFailure;
			constructor(operation, inspectionFailure, reason) {
				super(operation, {
					cause: reason,
					...inspectionFailure instanceof DarwinProcessOwnershipInspectionError && inspectionFailure.capturedOutput !== undefined ? { capturedOutput: inspectionFailure.capturedOutput } : {},
					...inspectionFailure instanceof ProcessOwnershipIdentityBatchFailure ? { diagnostics: {
						retained_observation_count: inspectionFailure.observations.size,
						rejected_request_count: inspectionFailure.failures.length
					} } : {}
				});
				this.inspectionFailure = inspectionFailure;
			}
		};
		processInspectionFailure = (cause) => {
			const failure = cause instanceof OwnedCommandFailure ? cause.preparationFailure : cause;
			return failure instanceof ProcessOwnershipInspectionCancelled || failure instanceof ProcessOwnershipIdentityBatchFailure || failure instanceof DarwinProcessOwnershipInspectionError || failure instanceof RegularFileCleanupFailure ? failure : undefined;
		};
		processInspectionCancellationError = (cause, operation) => {
			if (cause instanceof OwnedCommandFailure && cause.reason === "timeout") return undefined;
			const failure = processInspectionFailure(cause);
			if (failure instanceof DarwinProcessOwnershipInspectionError) return failure.cancellation === undefined ? undefined : new ProcessInspectionAnalysisCancelledError(operation, failure, failure.cancellation.reason);
			if (failure instanceof ProcessOwnershipInspectionCancelled || failure instanceof ProcessOwnershipIdentityBatchFailure && failure.origin === "cancelled") return new ProcessInspectionAnalysisCancelledError(operation, failure, failure.reason);
			return undefined;
		};
		retainArtifactCommandCleanup = (cause, resources, operation, completed) => retainOwnedCommandCleanup(cause, {
			retain: (owner, resource) => resources.retain({
				kind: "lease",
				resource,
				lease: AnalysisCleanupLease.forCloseOwner(owner, resource)
			}),
			run: (work) => work()
		}, "process-ownership", operation, completed);
		retainProcessInspectionCleanup = (cause, primary, resources, operation) => {
			const failures = retainArtifactCommandCleanup(cause, resources, operation);
			for (const failure of failures) primary = analysisErrorWithCleanupDependencies(primary, failure, operation);
			return bindProcessInspectionCancellations(cause, primary, operation);
		};
		bindProcessInspectionCancellations = (cause, primary, operation) => {
			const preparation = processInspectionFailure(cause);
			if (preparation instanceof DarwinProcessOwnershipInspectionError && preparation.capturedOutput !== undefined) primary.retainCapturedOutput(preparation.capturedOutput);
			if (preparation === undefined) return primary;
			for (const cancellation of processInspectionCancellations(preparation)) primary = analysisErrorWithCancellation(primary, new ProcessInspectionAnalysisCancelledError(operation, preparation, cancellation.reason));
			return primary;
		};
	})))();
}

//#endregion
export { bindProcessInspectionCancellations, init_OwnedCommandCleanup, processInspectionCancellationError, processInspectionFailure, retainArtifactCommandCleanup, retainOwnedCommandCleanup, retainProcessInspectionCleanup };