import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, init_analysisErrorCore, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { DARWIN_PROCESS_OWNERSHIP_REMEDIATION, DarwinProcessOwnershipInspectionError, LINUX_PROCESS_OWNERSHIP_REMEDIATION, LinuxOwnedProcessPrerequisiteError, init_DarwinProcessRunTokenReader, init_ProcessOwnershipObservation } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { OwnedCommandFailure, init_OwnedCommand, preparationHostCapacityFailure } from "./OwnedCommand-9zrM5O3T.js";

//#region dist/providers/ownedProcessAvailability.js
var prerequisiteRefusal, darwinPrerequisiteRefusal, PREREQUISITE_DIAGNOSTIC_KEYS, ownedProcessPrerequisiteAvailability;
function init_ownedProcessAvailability() {
	return (init_ownedProcessAvailability = __esmMin((() => {
		init_analysisErrorCore();
		init_providerAdapterError();
		init_jsonValue();
		init_DarwinProcessRunTokenReader();
		init_OwnedCommand();
		init_ProcessOwnershipObservation();
		prerequisiteRefusal = (cause) => {
			if (!(cause instanceof AnalysisCapabilityUnavailableError) || cause.cleanupIncomplete) return undefined;
			for (let current = cause; current instanceof AnalysisCapabilityUnavailableError; current = current.cause) if (current instanceof LinuxOwnedProcessPrerequisiteError) return current;
			return undefined;
		};
		darwinPrerequisiteRefusal = (cause) => {
			let current = cause;
			while (current instanceof ProviderAdapterError) {
				if (current.cleanupIncomplete || current.diagnostics?.stage !== "ownership_preparation") return undefined;
				current = current.cause;
			}
			if (current instanceof OwnedCommandFailure) {
				if (current.reason !== "process" || current.cleanupOwner !== undefined || current.cleanupFailure !== null || current.cleanupResult !== undefined || current.cancellation !== undefined) return undefined;
				current = current.preparationFailure;
			}
			return current instanceof DarwinProcessOwnershipInspectionError && preparationHostCapacityFailure(current) === undefined && current.cleanupFailure === undefined && current.cleanupOwner === undefined && current.cancellation === undefined ? current : undefined;
		};
		PREREQUISITE_DIAGNOSTIC_KEYS = [
			"admission_code",
			"system_code",
			"ps_command",
			"ps_source"
		];
		ownedProcessPrerequisiteAvailability = (cause) => {
			const refusal = prerequisiteRefusal(cause);
			if (refusal !== undefined) {
				const remediation = refusal.remediationAction ?? LINUX_PROCESS_OWNERSHIP_REMEDIATION;
				return {
					status: "unavailable",
					code: "runtime_unavailable",
					reason: `${refusal.reason}. ${remediation}`,
					remediation,
					diagnostics: {
						stage: "ownership_preparation",
						prerequisite_provider_id: refusal.providerId,
						prerequisite_operation: refusal.operation,
						...Object.fromEntries(PREREQUISITE_DIAGNOSTIC_KEYS.flatMap((key) => {
							const value = refusal.diagnostics?.[key];
							return value === undefined ? [] : [[key, value]];
						}))
					}
				};
			}
			const darwin = darwinPrerequisiteRefusal(cause);
			if (darwin === undefined) return undefined;
			return {
				status: "unavailable",
				code: "runtime_unavailable",
				reason: `${darwin.message}. ${DARWIN_PROCESS_OWNERSHIP_REMEDIATION}`,
				remediation: DARWIN_PROCESS_OWNERSHIP_REMEDIATION,
				diagnostics: {
					stage: "ownership_preparation",
					...darwin.compilerOutcome === undefined ? {} : { compiler_outcome: jsonValueSchema.parse(darwin.compilerOutcome) }
				}
			};
		};
	})))();
}

//#endregion
export { init_ownedProcessAvailability, ownedProcessPrerequisiteAvailability };