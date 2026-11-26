import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisResourceConstraintError, AnalysisTimeoutError, cancelledBy, carriedReason, init_analysisErrorCore } from "./jsonSerialization-DAF9DVXC.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { describeLaunchFailure, init_launchFailure } from "./ExecFileOutput-YDVPmL3I.js";
import { init_RuntimeExhaustion, runtimeExhaustionReport } from "./ProviderProcess-OkgijDXB.js";

//#region dist/domain/unclassifiedProviderFailure.js
var UnclassifiedProviderFailure;
function init_unclassifiedProviderFailure() {
	return (init_unclassifiedProviderFailure = __esmMin((() => {
		init_providerAdapterError();
		UnclassifiedProviderFailure = class extends ProviderAdapterError {
			examined;
			constructor(providerId, operation, examined, options = {}) {
				super(providerId, operation, {
					...options,
					diagnostics: {
						...options.diagnostics,
						...examined
					}
				});
				this.examined = examined;
			}
		};
	})))();
}

//#endregion
//#region dist/process/classifyProviderOutcome.js
var RUNTIME_NAMES, AREA_NAMES, EXHAUSTED_RESOURCE_NAMES, classifyLaunchFailure, examinedOutcome, classifyProviderOutcome;
function init_classifyProviderOutcome() {
	return (init_classifyProviderOutcome = __esmMin((() => {
		init_analysisErrorCore();
		init_unclassifiedProviderFailure();
		init_launchFailure();
		init_RuntimeExhaustion();
		RUNTIME_NAMES = {
			jvm: "The provider's Java virtual machine",
			v8: "The provider's JavaScript runtime"
		};
		AREA_NAMES = {
			heap: "heap",
			"gc-overhead": "garbage-collection overhead limit",
			metaspace: "metaspace",
			"array-size": "array size beyond the VM limit",
			"native-thread": "unable to create a native thread"
		};
		EXHAUSTED_RESOURCE_NAMES = {
			processes: "process",
			memory: "memory",
			"file-descriptors": "file-descriptor"
		};
		classifyLaunchFailure = (failure, context) => {
			const { operation } = context;
			const command = failure.executable ?? context.command;
			const subject = command ?? "the provider command";
			const launchFacts = {
				system_code: failure.code ?? null,
				...failure.syscall === undefined ? {} : { syscall: failure.syscall },
				...command === undefined ? {} : { command }
			};
			const details = {
				...context.details,
				diagnostics: {
					...context.details?.diagnostics,
					...launchFacts,
					boundary: failure.kind === "host-exhausted" ? "host-capacity" : "provider-launch"
				}
			};
			const unchanged = `${context.selection ?? "the selected command"} does not need to change`;
			switch (failure.kind) {
				case "host-exhausted": {
					const name = EXHAUSTED_RESOURCE_NAMES[failure.resource];
					return new AnalysisResourceConstraintError(operation, "capacity", `The host ran out of ${name} capacity (${failure.code}) to start ${subject}.`, {
						spawn_error: failure.code,
						exhausted_resource: failure.resource,
						...command === undefined ? {} : { command }
					}, {
						...details,
						retryable: true,
						remediationAction: `The host ran out of ${name} capacity (${failure.code}). Close unused processes or files, or raise the process or open-file limit of the REA process, then retry; ${unchanged}.`
					});
				}
				case "argument-list": return new AnalysisResourceConstraintError(operation, "transport", `The host rejected ${subject} because its argument list and environment exceed the process launch limit (${failure.code}).`, {
					spawn_error: failure.code,
					...context.argumentBytes === undefined ? {} : { argument_bytes: context.argumentBytes }
				}, {
					...details,
					diagnostics: {
						...details.diagnostics,
						oversized_launch_input: context.fixedArguments === true ? "environment" : "request_and_environment"
					},
					retryable: false,
					remediationAction: context.fixedArguments === true ? `This command's arguments do not depend on the request, so the environment REA passes to it is too large. Remove large or unneeded variables from the environment REA runs with, then retry; ${unchanged}. Retrying in the same environment fails the same way.` : `Select less input for one call, or pass large values through a file, then retry; ${unchanged}. An unchanged request fails the same way.`
				});
				case "missing":
				case "not_executable":
				case "failed": {
					if (context.unavailable !== undefined) return context.unavailable(failure, details);
					const reason = failure.kind === "missing" ? `${subject} was not found (${describeLaunchFailure(failure)}).` : failure.kind === "not_executable" ? `${subject} exists but could not be executed (${describeLaunchFailure(failure)}).` : `${subject} could not be launched (${describeLaunchFailure(failure)}).`;
					return new AnalysisCapabilityUnavailableError(context.providerId, operation, reason, {
						...details,
						userMessage: reason
					});
				}
			}
		};
		examinedOutcome = (outcome) => {
			const snapshot = outcome.output?.snapshot;
			return {
				failure_kind: outcome.kind,
				reason: outcome.message,
				exit_code: outcome.kind === "exited" ? outcome.exitCode : snapshot?.exitCode ?? null,
				signal: outcome.kind === "exited" ? outcome.signal : snapshot?.signal ?? null,
				...outcome.kind === "exited" ? { stop_requested: outcome.stopRequested } : {},
				...outcome.output === undefined ? {} : { output_truncated: outcome.output.truncated }
			};
		};
		classifyProviderOutcome = (outcome, context) => {
			const { operation } = context;
			const details = {
				...context.details,
				cause: outcome.cause,
				...outcome.output === undefined ? {} : { capturedOutput: context.capturedOutput(outcome.output.snapshot) }
			};
			switch (outcome.kind) {
				case "cancelled": {
					const { cause: _observed, ...cancellationDetails } = details;
					return cancelledBy(operation, carriedReason(outcome.reason), cancellationDetails);
				}
				case "timeout": return new AnalysisTimeoutError(operation, context.timeout.ms, {
					...details,
					...context.timeout.userMessage === undefined ? {} : { userMessage: context.timeout.userMessage },
					...context.timeout.remediationAction === undefined ? {} : { remediationAction: context.timeout.remediationAction },
					...context.timeout.limit === undefined ? {} : { limit: context.timeout.limit }
				});
				case "output-limit": return new AnalysisResourceConstraintError(operation, "memory", context.outputLimit.reason ?? outcome.message, context.outputLimit.limits, {
					...details,
					...context.outputLimit.recovery,
					...context.outputLimit.limit === undefined ? {} : { limit: context.outputLimit.limit }
				});
				case "memory-limit": return new AnalysisResourceConstraintError(operation, "memory", "The owned process tree reached its enforced committed-memory limit.", { process_memory_limit_bytes: context.memoryLimitBytes ?? null }, details);
				case "resource-signal": {
					const reported = context.resourceSignal?.(outcome.signal);
					return new AnalysisResourceConstraintError(operation, outcome.signal === "SIGXFSZ" ? "file-size" : "cpu", `Producer terminated with ${outcome.signal}; the signal's exact cause is not independently established.${reported?.detail === undefined ? "" : ` ${reported.detail}`}`, reported?.limits ?? null, {
						...details,
						...reported?.recovery,
						...reported?.limit === undefined ? {} : { limit: reported.limit }
					});
				}
				case "runtime-exhausted": {
					const reported = context.runtimeExhaustion?.(outcome.exhaustion);
					const { area, runtime } = outcome.exhaustion;
					return new AnalysisResourceConstraintError(operation, area === "native-thread" ? "capacity" : "memory", `${RUNTIME_NAMES[runtime]} reported running out of memory${area === undefined ? "" : ` (${AREA_NAMES[area]})`} before the process ended. This is reported evidence and does not prove the exact allocation failure.`, reported?.limits ?? null, {
						...details,
						diagnostics: {
							...details.diagnostics,
							runtime_exhaustion_report: runtimeExhaustionReport(outcome.exhaustion)
						},
						...reported?.recovery ?? (area === "native-thread" ? {
							retryable: true,
							remediationAction: "Reduce concurrent analysis processes or review the host's available thread and process capacity, then retry."
						} : {})
					});
				}
				case "launch-failed": return classifyLaunchFailure(outcome.failure, {
					providerId: context.providerId,
					operation,
					details,
					...context.launchUnavailable === undefined ? {} : { unavailable: context.launchUnavailable }
				});
				case "exited":
				case "protocol": return context.dialect(outcome, details, (options) => new UnclassifiedProviderFailure(context.providerId, operation, examinedOutcome(outcome), {
					...details,
					...options,
					diagnostics: {
						...details.diagnostics,
						...options?.diagnostics
					}
				}));
			}
		};
	})))();
}

//#endregion
export { UnclassifiedProviderFailure, classifyLaunchFailure, classifyProviderOutcome, init_classifyProviderOutcome, init_unclassifiedProviderFailure };