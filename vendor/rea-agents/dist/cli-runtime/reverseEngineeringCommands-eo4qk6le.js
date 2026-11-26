import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, OwnerCancellation, analysisSettingLimit, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisSettingDefinitions, init_errorMessage, init_isRecord, init_jsonValue, init_localPath, isAborted, isRecord, jsonValueSchema, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, currentAnalysisOperationSnapshot, init_HostPlatform, init_analysisOperationSnapshot } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_executableSearch, windowsPathCandidates } from "./executableSearch-B91ds2Qv.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { CLI_COMMANDS, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliLogging, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, ArtifactResourceScope, OwnedFileHandle, RegularFileCancelled, RegularFileCleanupFailure, bindArtifactFileCleanup, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactResourceScope, init_OwnedFileHandle, init_OwnedRegularFile, init_resources, regularFileCancellation, withOwnedFileHandle } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError, withInheritedCleanupOwnership } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { RuntimeControlUnavailableError, WindowsNativeAuthorityUnavailableError, init_WindowsNativeLoader, init_runtimeControlUnavailableError } from "./WindowsNativeLoader-CCqowxwW.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { init_runtimeAnalysisSettings, readRuntimeSetting } from "./runtimeAnalysisSettings-CJ3kVGDD.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { init_nativeDeadlines, nativeDeadlineRecovery } from "./urlComponents-DJm-wtqY.js";
import { DEBUGGER_COMMAND_DEADLINE_SETTING, DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING, debuggerConstructionLimits, debuggerControlReplyOutput, init_debuggerSessionLimits, parseDebuggerCommandDeadline, parseDebuggerCommandOutput } from "./debuggerSessionLimits-C0Btgiac.js";
import { WindowsNativeSpawnControlError, describeLaunchFailure, execFileOutputFailure, init_ExecFileOutput, init_WindowsOwnedProcess, init_launchFailure, launcherFailureOf, windowsNativeSpawnControlError } from "./ExecFileOutput-YDVPmL3I.js";
import { createEvidence, init_evidence, init_evidenceValidation, recognizeEvidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { analysisEvidenceDeliveryOptions, cliEvidenceDeliveryInputError, contractNamed, deliverCliAnalysisEvidence, init_analysisEvidenceDelivery, init_contractCliDescription, init_contractCommand, publishCliAnalysisEvidence, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_AnalysisViewService, requireAnalysisViewRetention, summarizeRetainedAnalysis } from "./AnalysisViewService-D_M3W3PD.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { DARWIN_PROCESS_OWNERSHIP_REMEDIATION, DarwinProcessOwnershipInspectionError, LinuxOwnedProcessPrerequisiteError, ProcessAdmissionError, ProcessOwnershipIdentityBatchFailure, ProcessOwnershipInspectionCancelled, init_DarwinProcessRunTokenReader, init_LinuxProcessStat, init_ProcessAdmissionError, init_ProcessInspectionCancellation, init_ProcessOwnershipObservation, parseLinuxProcessStat, processOwnershipAdmissionRecovery, systemProcessOwnershipHost } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { AnalysisCleanupRelease, init_analysisCleanupRelease } from "./analysisCleanupRelease-ME3hxZPc.js";
import { init_utf8HeadExcerpt, utf8HeadExcerpt } from "./utf8HeadExcerpt-BO0eOwRw.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { AbortedWait, init_AbortablePromise, waitForAbortable } from "./AbortablePromise-CvIbazUz.js";
import { Deadline, init_deadline } from "./deadline-BKIJLa7g.js";
import { OwnedCommandFailure, init_OwnedCommand, preparationHostCapacityFailure, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_OwnedCommandCleanup, processInspectionCancellationError, processInspectionFailure, retainProcessInspectionCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { DEFAULT_REVERSE_COMMAND_OUTPUT_BYTES, DEFAULT_REVERSE_COMMAND_TIMEOUT_MS, GDB_SESSION_TOOLS, OBJDUMP_ARTIFACT_OPERATIONS, REVERSE_ENGINEERING_TOOL_CONTRACTS, RIZIN_DEBUG_SESSION_TOOLS, init_debuggerSessionErrors, init_reverseEngineering as init_reverseEngineering$1, init_reverseEngineeringToolContracts, objdumpInputSchema, reverseCommandOutputLimit, rizinInputSchema, stoppedDebuggerSessionError, unknownDebuggerSessionError } from "./debuggerSessionErrors-DVbME-2z.js";
import { classifyLaunchFailure, init_classifyProviderOutcome } from "./classifyProviderOutcome-BMRoGrMs.js";
import { hashStableFile, init_StableFileHash, stableFileHashCause } from "./StableFileHash-BELT4STG.js";
import { constants, createReadStream, statSync } from "node:fs";
import { win32 } from "node:path";
import { z } from "zod";
import { isUtf8 } from "node:buffer";
import { createHash, randomUUID } from "node:crypto";
import { open, readFile, readlink, realpath, stat } from "node:fs/promises";
import { isatty } from "node:tty";

//#region dist/objdump/ObjdumpProviderIdentity.js
var OBJDUMP_PROVIDER_IDENTITY, OBJDUMP_COMMAND_REPAIR;
function init_ObjdumpProviderIdentity() {
	return (init_ObjdumpProviderIdentity = __esmMin((() => {
		OBJDUMP_PROVIDER_IDENTITY = {
			id: "objdump.command",
			name: "objdump command",
			version: null
		};
		OBJDUMP_COMMAND_REPAIR = {
			provider: "objdump",
			setting: "REA_OBJDUMP_COMMAND",
			remediationAction: "Set REA_OBJDUMP_COMMAND to an installed executable GNU objdump command, or make that command available on PATH. Check execute permission on the command and search permission on its parent directories before retrying."
		};
	})))();
}

//#endregion
//#region dist/rizin/RizinProviderIdentity.js
var RIZIN_PROVIDER_IDENTITY, RIZIN_COMMAND_REPAIR;
function init_RizinProviderIdentity() {
	return (init_RizinProviderIdentity = __esmMin((() => {
		RIZIN_PROVIDER_IDENTITY = {
			id: "rizin",
			name: "Rizin",
			version: null
		};
		RIZIN_COMMAND_REPAIR = {
			provider: "rizin",
			setting: "REA_RIZIN_COMMAND",
			remediationAction: "Set REA_RIZIN_COMMAND to an installed executable Rizin command, or make that command available on PATH. Check execute permission on the command and search permission on its parent directories before retrying."
		};
	})))();
}

//#endregion
//#region dist/application/reverse/ReverseEngineeringService.js
var reverseCommandOutputLimitation, MAX_CONCURRENT_REVERSE_ENGINEERING_OPERATIONS, MAX_ACTIVE_CAPTURE_BYTES, resolveRizinCommandRequest, reverseCommandUnavailable, ReverseEngineeringService, OwnedOutputFailure, runOwnedCommandOutput, ownedCleanupOptions, runtimeControlPreparationError, reverseCommandTimeoutGuidance, digestFile, PHYSICAL_FAILURE_CODES, preflightCancelled, commandCancelled, callerCancellationCause, commandFailureCode, statWithDeadline;
function init_ReverseEngineeringService() {
	return (init_ReverseEngineeringService = __esmMin((() => {
		init_targetIdentity();
		init_capturedProviderOutput();
		init_HostPlatform();
		init_nativeDeadlines();
		init_budget();
		init_resources();
		init_ProcessInspectionCancellation();
		init_OwnedCommandCleanup();
		init_AnalysisViewService();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_analysisCleanupRelease();
		init_providerAdapterError();
		init_evidence();
		init_inputIssueProjection();
		init_jsonValue();
		init_result();
		init_reverseEngineering$1();
		init_ExecFileOutput();
		init_launchFailure();
		init_classifyProviderOutcome();
		init_OwnedCommand();
		init_DarwinProcessRunTokenReader();
		init_ProcessOwnershipObservation();
		init_ProcessAdmissionError();
		init_runtimeControlUnavailableError();
		init_WindowsNativeLoader();
		init_WindowsOwnedProcess();
		init_callerPath();
		init_AnalysisInput();
		init_analysisErrorCancellation();
		init_errorMessage();
		reverseCommandOutputLimitation = (bytes, source) => `REA stopped collecting output at max_output_bytes=${String(bytes)} bytes (source ${source}) and requested termination of the provider process; captured stdout and stderr are a prefix and command completion is unknown. Narrow or page the provider command, or raise the output_limit control for the next call; no restart is required. Confirm command effects and cleanup before deciding whether it is safe to repeat. Client receive limits are separate.`;
		MAX_CONCURRENT_REVERSE_ENGINEERING_OPERATIONS = 8;
		MAX_ACTIVE_CAPTURE_BYTES = MAX_CONCURRENT_REVERSE_ENGINEERING_OPERATIONS * DEFAULT_REVERSE_COMMAND_OUTPUT_BYTES;
		resolveRizinCommandRequest = (input) => {
			const parsed = rizinInputSchema.safeParse(input);
			return parsed.success ? ok(parsed.data) : err(analysisInputErrorFromIssues("execute_rizin_command", parsed.error.issues, input, { cause: parsed.error }));
		};
		reverseCommandUnavailable = (operation, unavailable) => {
			const { command, reason, repair } = unavailable;
			const { provider, remediationAction } = repair;
			return new AnalysisCapabilityUnavailableError(unavailable.identity.id, operation, reason.kind === "not_found" ? "Configured command was not found on PATH" : `Configured command could not be searched on PATH (invalid PATHEXT entry ${JSON.stringify(reason.extension)})`, {
				userMessage: reason.kind === "not_found" ? `Could not find the selected ${provider} command ${JSON.stringify(command)} on PATH; REA did not search the current directory.` : `Could not search PATH for the selected ${provider} command ${JSON.stringify(command)}: PATHEXT entry ${JSON.stringify(reason.extension)} is not a filename extension.`,
				remediationAction: reason.kind === "not_found" ? remediationAction : `Remove ${JSON.stringify(reason.extension)} from PATHEXT, or ${remediationAction.charAt(0).toLowerCase()}${remediationAction.slice(1)}`,
				diagnostics: {
					boundary: "provider-lookup",
					command,
					lookup_failure: reason.kind,
					...reason.kind === "invalid_pathext" ? { pathext_entry: reason.extension } : {}
				}
			});
		};
		ReverseEngineeringService = class {
			#environment;
			#commands;
			#run;
			#digest;
			#stat;
			#inspectionResources = new ArtifactResourceScope();
			#pendingCleanup = new Map();
			#activeOperations = new Map();
			/** Output capture admitted across active operations. */
			#reservedOutput = new Budget(MAX_ACTIVE_CAPTURE_BYTES);
			#closing = false;
			#closePromise;
			#dispatched = 0;
			#outcomes = new Map();
			constructor(options) {
				this.#environment = { ...options.environment ?? process.env };
				this.#commands = options.commands;
				this.#run = runOwnedCommandOutput(options.runOwned ?? runOwnedCommand, (owner, cleanup) => this.#pendingCleanup.set(owner, {
					observation: cleanup,
					release: this.#pendingCleanup.get(owner)?.release ?? new AnalysisCleanupRelease()
				}));
				this.#digest = options.digest ?? digestFile;
				this.#stat = options.stat ?? stat;
			}
			/** Ask retained process owners to settle cleanup before admitting more work. */
			async retryCleanup(operation = "reverse_engineering_cleanup") {
				let failure;
				try {
					await this.#inspectionResources.retryCleanup();
				} catch (cause) {
					failure = new AnalysisOutputError(operation, "Process inspection cleanup remains incomplete.", {
						cause,
						cleanup: {
							reason: "Process inspection cleanup remains incomplete.",
							resources: this.#inspectionResources.cleanupResources
						}
					});
					bindArtifactFileCleanup(cause, failure);
				}
				for (const [owner, retained] of this.#pendingCleanup) {
					let stopped;
					try {
						stopped = await owner.stop();
					} catch (cause) {
						stopped = {
							status: "incomplete",
							reason: errorMessage(cause)
						};
					}
					if (stopped.status === "incomplete") {
						const observation = {
							reason: stopped.reason,
							resources: retained.observation.resources
						};
						let retryFailure = retained.retryFailure;
						if (retryFailure === undefined) {
							retryFailure = retained.release.bind(new AnalysisOutputError(operation, "A previous provider process still requires cleanup.", { cleanup: observation }));
						}
						this.#pendingCleanup.set(owner, {
							observation,
							release: retained.release,
							retryFailure
						});
						if (failure === undefined) failure = retryFailure;
					} else {
						retained.release.confirm();
						this.#pendingCleanup.delete(owner);
					}
				}
				return failure === undefined ? ok(null) : err(failure);
			}
			/** Retry cleanup for provider process groups retained after an incomplete stop. */
			#outcome(operation) {
				const existing = this.#outcomes.get(operation);
				if (existing !== undefined) return existing;
				const created = {
					failure: undefined,
					succeeded: 0
				};
				this.#outcomes.set(operation, created);
				return created;
			}
			/**
			* Record that this dispatch could not run the configured command, unless a
			* later dispatch has already succeeded or failed.
			*/
			#recordUnavailable(operation, dispatch, failure, repair) {
				const outcome = this.#outcome(operation);
				if ((outcome.failure === undefined || dispatch > outcome.failure.dispatch) && dispatch > outcome.succeeded) outcome.failure = {
					dispatch,
					reason: failure.userMessage ?? failure.message,
					remediation: failure.remediationAction ?? repair.remediationAction
				};
			}
			/** Current launch failures observed for caller-configured standalone tools. */
			observedLaunchFailures() {
				const result = {};
				for (const [operation, outcome] of this.#outcomes) {
					if (outcome.failure !== undefined && outcome.failure.dispatch > outcome.succeeded) {
						result[operation] = {
							reason: outcome.failure.reason,
							remediation: outcome.failure.remediation
						};
					}
				}
				return result;
			}
			/** Forget runtime launch outcomes observed for standalone tools. */
			clearObservedFailures() {
				this.#outcomes.clear();
			}
			close() {
				this.#closing = true;
				this.#closePromise ??= this.#closeActiveOperationsAndCleanup().catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #closeActiveOperationsAndCleanup() {
				const active = [...this.#activeOperations.entries()];
				for (const [controller] of active) controller.abort(OwnerCancellation.ownerClosed);
				await Promise.allSettled(active.map(([, operation]) => operation));
				const cleanup = await this.retryCleanup();
				if (!cleanup.ok) throw cleanup.error;
			}
			async inspectWithObjdump(rawInput, options = {}, retention = {
				evidenceById: undefined,
				recordEvidence: undefined
			}) {
				const parsed = parseAnalysisInput("inspect_with_objdump", rawInput, objdumpInputSchema);
				if (!parsed.ok) return parsed;
				const { detail, command_timeout_ms: commandTimeoutMs, max_output_bytes: maxOutputBytes, ...input } = parsed.value;
				if (detail === "summary") {
					const ready = requireAnalysisViewRetention("inspect_with_objdump", retention);
					if (!ready.ok) return ready;
				}
				const selection = this.#commands.objdump(input);
				let parameters;
				if (input.operation === "disassemble") {
					const { symbol, ...base } = input;
					parameters = symbol === undefined ? base : {
						...base,
						symbol
					};
				} else parameters = input;
				if (commandTimeoutMs !== undefined) parameters = {
					...parameters,
					command_timeout_ms: commandTimeoutMs
				};
				if (maxOutputBytes !== undefined) parameters = {
					...parameters,
					max_output_bytes: maxOutputBytes
				};
				const observed = await this.#observe({
					operation: "inspect_with_objdump",
					selection,
					path: input.operation === "architectures" ? undefined : input.path,
					parameters,
					signal: options.signal,
					timeoutMs: commandTimeoutMs ?? 12e4,
					outputBudgetBytes: maxOutputBytes ?? 16777216
				});
				return observed.ok && detail === "summary" ? summarizeRetainedAnalysis(observed.value, retention) : observed;
			}
			executeRizinCommand(rawInput, options = {}) {
				const parsed = resolveRizinCommandRequest(rawInput);
				return parsed.ok ? this.executeRizinCommandValidated(parsed.value, options) : Promise.resolve(parsed);
			}
			/** Execute owner-validated input after the adapter has admitted its target. */
			executeRizinCommandValidated(request, options = {}) {
				const { command_timeout_ms: commandTimeoutMs, max_output_bytes: maxOutputBytes, ...input } = request;
				return this.#observe({
					operation: "execute_rizin_command",
					selection: this.#commands.rizin(input),
					path: input.path,
					parameters: request,
					signal: options.signal,
					timeoutMs: commandTimeoutMs ?? 12e4,
					outputBudgetBytes: maxOutputBytes ?? 16777216
				});
			}
			#observe({ selection, ...request }) {
				const { operation, signal, outputBudgetBytes } = request;
				if (signal?.aborted) return Promise.resolve(err(cancelledBy(operation, signal)));
				if (this.#closing) return Promise.resolve(err(new AnalysisOutputError(operation, "Reverse-engineering service is closed.")));
				if (!selection.ok) {
					const refusal = reverseCommandUnavailable(operation, selection.error);
					this.#recordUnavailable(operation, ++this.#dispatched, refusal, selection.error.repair);
					return Promise.resolve(err(refusal));
				}
				if (this.#activeOperations.size >= MAX_CONCURRENT_REVERSE_ENGINEERING_OPERATIONS || !this.#reservedOutput.tryCharge(outputBudgetBytes)) return Promise.resolve(err(new AnalysisResourceConstraintError(operation, "transport", `Reverse-engineering capture capacity reached (${String(MAX_CONCURRENT_REVERSE_ENGINEERING_OPERATIONS)} operations or ${String(MAX_ACTIVE_CAPTURE_BYTES)} reserved output bytes).`, {
					max_concurrent_operations: MAX_CONCURRENT_REVERSE_ENGINEERING_OPERATIONS,
					active_operations: this.#activeOperations.size,
					max_active_capture_bytes: MAX_ACTIVE_CAPTURE_BYTES,
					reserved_output_bytes: this.#reservedOutput.used,
					requested_output_bytes: outputBudgetBytes
				}, {
					retryable: true,
					remediationAction: `Wait for active objdump or rizin work to finish, then retry, or lower max_output_bytes to fit the ${String(MAX_ACTIVE_CAPTURE_BYTES)}-byte aggregate capture admission. This live capacity has no runtime override; command_timeout_ms does not raise it. No restart is required.`
				})));
				const controller = new AbortController();
				const relayAbort = () => controller.abort(signal?.reason);
				if (signal instanceof AbortSignal) {
					if (signal.aborted) relayAbort();
					else signal.addEventListener("abort", relayAbort, { once: true });
				}
				const operationSignal = signal === undefined || signal instanceof AbortSignal ? controller.signal : signal;
				const running = this.#observeProvider({
					...request,
					profile: selection.value,
					signal: operationSignal
				});
				const tracked = running.then((result) => !result.ok && operationSignal?.aborted ? err(analysisErrorWithCancellation(result.error, cancelledBy(operation, operationSignal))) : result).finally(() => {
					signal?.removeEventListener("abort", relayAbort);
					this.#activeOperations.delete(controller);
					this.#reservedOutput.refund(outputBudgetBytes);
				});
				this.#activeOperations.set(controller, tracked);
				return tracked;
			}
			async #observeProvider(request) {
				const { operation, profile, path, parameters, signal, timeoutMs, outputBudgetBytes } = request;
				const { executable: command, arguments: args } = profile;
				const { provider, setting } = profile.repair;
				if (signal?.aborted) return err(cancelledBy(operation, signal));
				const cleanup = await this.retryCleanup(operation);
				if (!cleanup.ok) return cleanup;
				const absolutePath = path === undefined ? undefined : absoluteCallerPath(path);
				let digest;
				try {
					if (absolutePath !== undefined) digest = await this.#digest(absolutePath, signal, this.#stat, timeoutMs);
				} catch (cause) {
					const code = commandFailureCode(cause);
					if (preflightCancelled(signal, cause, code)) return err(cancelledBy(operation, carriedReason(callerCancellationCause(signal, cause))));
					if (code === "EACCES" || code === "EPERM") {
						const deniedPath = absolutePath === undefined ? command : absolutePath;
						return err(new AnalysisAccessDeniedError(operation, deniedPath, code, { cause }));
					}
					if (code === "ETIMEDOUT") return err(new AnalysisTimeoutError(operation, timeoutMs, {
						cause,
						...reverseCommandTimeoutGuidance(provider, timeoutMs)
					}));
					if (code !== "ENOENT" && code !== "ENOTDIR" && code !== "EINVAL" && code !== "ELOOP" && code !== "ENAMETOOLONG") {
						if (cause instanceof AnalysisError) return err(cause);
						return err(new ProviderAdapterError(profile.identity.id, operation, {
							cause,
							diagnostics: {
								phase: "target_preflight",
								...code === undefined ? {} : { system_code: code }
							}
						}));
					}
					const targetReason = code === "EINVAL" ? "The selected target is not a regular file." : code === "ELOOP" ? "The selected target path contains a symbolic-link loop." : code === "ENAMETOOLONG" ? "The selected target path is too long." : "The selected target was not found.";
					return err(new AnalysisInputError(operation, {
						cause,
						userMessage: `${targetReason} Selected path: ${absolutePath}. Check the path and choose a readable regular file before retrying.`
					}, [{
						path: ["path"],
						reason: "invalid_value",
						message: `${targetReason}${code === undefined ? "" : ` (host error ${code})`}`
					}]));
				}
				let stdout = "";
				let stderr = "";
				let stdoutBytes = 0;
				let stderrBytes = 0;
				let exitCode = 0;
				let signalName = null;
				let outputTruncated = false;
				let stdoutInvalidUtf8 = false;
				let stderrInvalidUtf8 = false;
				let cleanupIncomplete = false;
				let cleanupOnlyFailure = false;
				let completionStatus = "complete";
				let outputLimitReached = false;
				let failure;
				let cleanupOwner;
				let earlyFailure;
				const dispatch = ++this.#dispatched;
				try {
					const output = await this.#run(command, args, {
						env: {
							...this.#environment,
							...profile.environmentOverrides
						},
						signal,
						timeout: timeoutMs,
						maxBuffer: outputBudgetBytes
					});
					stdout = output.stdout;
					stderr = output.stderr;
					stdoutBytes = output.stdoutBytes ?? Buffer.byteLength(stdout);
					stderrBytes = output.stderrBytes ?? Buffer.byteLength(stderr);
					stdoutInvalidUtf8 = output.stdoutInvalidUtf8 === true;
					stderrInvalidUtf8 = output.stderrInvalidUtf8 === true;
					outputTruncated = output.outputTruncated === true;
				} catch (cause) {
					const ownedCause = cause instanceof OwnedOutputFailure ? cause.cause : cause;
					const inspection = processInspectionFailure(ownedCause);
					if (inspection !== undefined && !(inspection instanceof DarwinProcessOwnershipInspectionError)) {
						const cancellation = processInspectionCancellationError(ownedCause, operation);
						earlyFailure = ownedCause instanceof OwnedCommandFailure && ownedCause.reason === "timeout" ? new AnalysisTimeoutError(operation, timeoutMs, {
							cause: ownedCause,
							...reverseCommandTimeoutGuidance(provider, timeoutMs)
						}) : inspection instanceof ProcessOwnershipInspectionCancelled || inspection instanceof ProcessOwnershipIdentityBatchFailure && inspection.origin === "cancelled" ? cancellation : new ProviderAdapterError("process-ownership", operation, {
							cause: inspection,
							diagnostics: { stage: "ownership_preparation" }
						});
					}
					cleanupOwner = cause instanceof OwnedOutputFailure ? cause.cleanupOwner : undefined;
					if (cause instanceof OwnedOutputFailure && cause.capabilityError !== undefined) earlyFailure = new AnalysisCapabilityUnavailableError(cause.capabilityError.providerId, cause.capabilityError.operation, cause.capabilityError.reason, {
						cause: cause.capabilityError,
						...cause.capabilityError.diagnostics === undefined ? {} : { diagnostics: cause.capabilityError.diagnostics },
						...cause.capabilityError.capturedOutput === undefined ? {} : { capturedOutput: cause.capabilityError.capturedOutput },
						...cause.capabilityError.partialObservation === undefined ? {} : { partialObservation: cause.capabilityError.partialObservation },
						...cause.capabilityError.userMessage === undefined ? {} : { userMessage: cause.capabilityError.userMessage },
						retryable: cause.capabilityError.retryable,
						...ownedCleanupOptions(cause)
					});
					const capture = execFileOutputFailure(cause);
					const code = capture?.code ?? commandFailureCode(cause) ?? (cause instanceof LinuxOwnedProcessPrerequisiteError ? execFileOutputFailure(cause.cause)?.code ?? commandFailureCode(cause.cause) : undefined);
					if (code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") outputLimitReached = true;
					const launch = preparationHostCapacityFailure(ownedCause) ?? launcherFailureOf(cause instanceof LinuxOwnedProcessPrerequisiteError ? cause.cause : cause);
					if (earlyFailure === undefined && (launch?.kind === "host-exhausted" || launch?.kind === "argument-list")) earlyFailure = classifyLaunchFailure(launch, {
						providerId: profile.identity.id,
						operation,
						command,
						selection: setting,
						argumentBytes: args.reduce((bytes, argument, index) => bytes + Buffer.byteLength(argument) + (index === 0 ? 0 : 1), 0),
						details: {
							cause,
							...ownedCleanupOptions(cause)
						}
					});
					if (earlyFailure === undefined && cause instanceof LinuxOwnedProcessPrerequisiteError) {
						earlyFailure = cause;
					}
					const admissionFailure = cause instanceof ProcessAdmissionError ? cause : cause instanceof OwnedOutputFailure && cause.cause instanceof ProcessAdmissionError ? cause.cause : undefined;
					if (earlyFailure === undefined && admissionFailure !== undefined) {
						const rawSystemCode = admissionFailure.detail?.system_code ?? (typeof admissionFailure.cause === "object" && admissionFailure.cause !== null ? execFileOutputFailure(admissionFailure.cause)?.code ?? commandFailureCode(admissionFailure.cause) : undefined);
						const admissionSystemCode = typeof rawSystemCode === "string" ? rawSystemCode : undefined;
						const recovery = processOwnershipAdmissionRecovery(admissionFailure.code, systemProcessOwnershipHost.platform ?? HOST_PLATFORM.platform, admissionSystemCode);
						earlyFailure = new AnalysisCapabilityUnavailableError("process-ownership", "prepare_owned_process", `Process ownership admission failed (${admissionFailure.code}${admissionSystemCode === undefined ? "" : `, ${admissionSystemCode}`}) before starting ${provider}: ${admissionFailure.message}`, {
							cause,
							userMessage: `Process ownership admission failed (${admissionFailure.code}${admissionSystemCode === undefined ? "" : `, ${admissionSystemCode}`}) before starting ${provider}.`,
							remediationAction: `${recovery} ${setting} does not need to change.`,
							diagnostics: {
								boundary: "process-ownership",
								admission_code: admissionFailure.code,
								...admissionSystemCode === undefined ? {} : { system_code: admissionSystemCode }
							},
							...ownedCleanupOptions(cause)
						});
					}
					const darwinFailure = inspection instanceof DarwinProcessOwnershipInspectionError ? inspection : undefined;
					if (earlyFailure === undefined && darwinFailure !== undefined) {
						if (code === "ETIMEDOUT") {
							earlyFailure = new AnalysisTimeoutError(operation, timeoutMs, {
								cause,
								...reverseCommandTimeoutGuidance(provider, timeoutMs)
							});
						} else if (darwinFailure.cancellation !== undefined) {
							earlyFailure = cancelledBy(operation, carriedReason(darwinFailure.cancellation?.reason));
						} else {
							earlyFailure = new AnalysisCapabilityUnavailableError("process-ownership", "prepare_owned_process", `Darwin process ownership inspection could not be prepared: ${darwinFailure.message}`, {
								cause,
								userMessage: darwinFailure.message,
								remediationAction: `${DARWIN_PROCESS_OWNERSHIP_REMEDIATION} ${setting} does not need to change.`,
								diagnostics: {
									boundary: "process-ownership",
									stage: "ownership_preparation",
									...darwinFailure.compilerOutcome === undefined ? {} : { compiler_outcome: jsonValueSchema.parse(darwinFailure.compilerOutcome) }
								},
								...darwinFailure.capturedOutput === undefined ? {} : { capturedOutput: darwinFailure.capturedOutput }
							});
						}
					}
					if (inspection !== undefined && earlyFailure !== undefined) earlyFailure = retainProcessInspectionCleanup(inspection, earlyFailure, this.#inspectionResources, operation);
					const controlFailure = runtimeControlPreparationError(cause);
					if (earlyFailure === undefined && controlFailure !== undefined && code !== "ETIMEDOUT" && !commandCancelled(signal, cause, code)) {
						const remediation = controlFailure.remediationAction === undefined ? `${setting} does not need to change.` : `${controlFailure.remediationAction} ${setting} does not need to change.`;
						earlyFailure = new AnalysisCapabilityUnavailableError("process-ownership", "prepare_owned_process", controlFailure.message, {
							cause,
							retryable: controlFailure.retryable,
							userMessage: controlFailure.message,
							remediationAction: remediation,
							diagnostics: {
								boundary: "process-ownership",
								control_code: controlFailure.code,
								...controlFailure instanceof WindowsNativeAuthorityUnavailableError ? { failure_stage: controlFailure.failureStage } : {},
								...controlFailure instanceof WindowsNativeSpawnControlError && controlFailure.constraint !== undefined ? { constraint: controlFailure.constraint } : {}
							},
							...ownedCleanupOptions(cause)
						});
					}
					if (earlyFailure === undefined && (capture === undefined || cause instanceof OwnedOutputFailure && cause.launchFailure || code === "ENOENT" || code === "EACCES" || code === "EPERM" || code === "ERR_PROVIDER_LAUNCH")) {
						if (commandCancelled(signal, cause, code)) earlyFailure = cancelledBy(operation, carriedReason(callerCancellationCause(signal, cause)), { ...ownedCleanupOptions(cause) });
						else if (code === "ETIMEDOUT") earlyFailure = new AnalysisTimeoutError(operation, timeoutMs, {
							cause,
							...ownedCleanupOptions(cause),
							...reverseCommandTimeoutGuidance(provider, timeoutMs)
						});
						else {
							const { provider, remediationAction } = profile.repair;
							const unavailable = (description, details) => new AnalysisCapabilityUnavailableError(profile.identity.id, operation, `Unable to run configured command (${description})`, {
								...details,
								userMessage: `Could not launch the selected ${provider} executable ${JSON.stringify(command)} (${description}).`,
								remediationAction
							});
							const details = {
								cause,
								...ownedCleanupOptions(cause)
							};
							earlyFailure = launch === undefined ? unavailable(String(code ?? "unknown error"), {
								...details,
								diagnostics: {
									boundary: "provider-launch",
									command,
									system_code: code ?? null
								}
							}) : classifyLaunchFailure(launch, {
								providerId: profile.identity.id,
								operation,
								command,
								selection: setting,
								details,
								unavailable: (failure, launchDetails) => unavailable(describeLaunchFailure(failure), launchDetails)
							});
						}
					}
					if (earlyFailure === undefined && capture !== undefined) {
						stdout = capture.stdout;
						stderr = capture.stderr;
						stdoutBytes = capture.stdoutBytes ?? Buffer.byteLength(stdout);
						stderrBytes = capture.stderrBytes ?? Buffer.byteLength(stderr);
						exitCode = capture.code;
						signalName = capture.signal;
						outputTruncated = capture.outputTruncated;
						if (capture.collectionFailure) {
							exitCode = null;
							completionStatus = "unknown";
						}
						const capturedOutput = {
							stdout,
							stderr,
							truncated: outputTruncated,
							stdout_bytes: stdoutBytes,
							stderr_bytes: stderrBytes,
							exit_code: !capture.collectionFailure && typeof capture.code === "number" ? capture.code : null,
							signal: capture.signal
						};
						if (commandCancelled(signal, cause, code)) failure = cancelledBy(operation, carriedReason(callerCancellationCause(signal, cause)), {
							capturedOutput,
							...ownedCleanupOptions(cause)
						});
						else if (code === "ETIMEDOUT") failure = new AnalysisTimeoutError(operation, timeoutMs, {
							cause,
							capturedOutput,
							...ownedCleanupOptions(cause),
							...reverseCommandTimeoutGuidance(provider, timeoutMs)
						});
						if (cause instanceof OwnedOutputFailure && cause.cleanup !== undefined) {
							cleanupIncomplete = true;
							if (failure === undefined) {
								cleanupOnlyFailure = !capture.collectionFailure && !capture.outputTruncated && !capture.killed && capture.signal === null && typeof capture.code === "number" && !signal?.aborted;
								failure = new AnalysisOutputError(operation, "Provider process cleanup remains incomplete.", {
									cause,
									capturedOutput,
									cleanup: cause.cleanup,
									cleanupOnly: cleanupOnlyFailure
								});
							}
						}
						if (failure === undefined && cause instanceof OwnedOutputFailure && cause.collectionFailure) failure = new AnalysisOutputError(operation, "Provider output collection failed.", {
							cause,
							capturedOutput
						});
						if (capture.killed || capture.signal !== null || typeof capture.code !== "number") {
							exitCode = null;
							completionStatus = "unknown";
						}
						if (cause instanceof OwnedOutputFailure) {
							stdoutInvalidUtf8 = cause.stdoutInvalidUtf8;
							stderrInvalidUtf8 = cause.stderrInvalidUtf8;
						}
					}
				}
				if (earlyFailure !== undefined) {
					if (earlyFailure instanceof AnalysisCapabilityUnavailableError && earlyFailure.diagnostics?.boundary === "provider-launch" && earlyFailure.providerId === profile.identity.id) {
						this.#recordUnavailable(operation, dispatch, earlyFailure, profile.repair);
					}
					return err(this.#registerCleanupFailure(earlyFailure, cleanupOwner));
				}
				if (failure !== undefined && cleanupOwner !== undefined) failure = this.#registerCleanupFailure(failure, cleanupOwner);
				let digestAfter = null;
				if (absolutePath === undefined) {
					digestAfter = null;
				} else if (cleanupIncomplete) {
					if (!cleanupOnlyFailure) completionStatus = "unknown";
				} else {
					try {
						digestAfter = await this.#digest(absolutePath, signal, this.#stat, timeoutMs);
					} catch {}
				}
				if (signal?.aborted && failure === undefined) {
					failure = cancelledBy(operation, signal, { capturedOutput: {
						stdout,
						stderr,
						truncated: outputTruncated,
						stdout_bytes: stdoutBytes,
						stderr_bytes: stderrBytes,
						exit_code: typeof exitCode === "number" ? exitCode : null,
						signal: signalName
					} });
					exitCode = null;
					completionStatus = "unknown";
				}
				const artifactChanged = absolutePath === undefined ? null : digestAfter === null || digest === undefined ? null : digestAfter !== digest;
				const outputBudgetSource = parameters.max_output_bytes === undefined ? "default" : "request";
				const rejection = completionStatus === "complete" && (failure === undefined || failure instanceof AnalysisOutputError && failure.cleanupOnly) ? profile.rejection?.(stderr) : undefined;
				if (rejection !== undefined) completionStatus = "rejected";
				const result = {
					stdout,
					stderr,
					exit_code: exitCode,
					signal: signalName,
					output_budget_bytes: outputBudgetBytes,
					output_budget_source: outputBudgetSource,
					output_truncated: outputTruncated,
					...outputLimitReached ? { output_limit: reverseCommandOutputLimit(outputBudgetBytes) } : {},
					completion_status: completionStatus,
					artifact_sha256_after: absolutePath === undefined ? null : digestAfter,
					artifact_changed: absolutePath === undefined ? null : artifactChanged,
					...rejection === undefined ? {} : { refusal: rejection.refusal }
				};
				const limitations = [
					...absolutePath === undefined ? [] : ["The executable implementation, version and supported formats are unknown because no reliable identity probe was performed."],
					...profile.limitations ?? [],
					"A non-zero process exit is preserved as an observed command result.",
					...rejection === undefined ? [] : [rejection.limitation],
					...stdoutInvalidUtf8 || stderrInvalidUtf8 ? [`Captured ${[...stdoutInvalidUtf8 ? ["stdout"] : [], ...stderrInvalidUtf8 ? ["stderr"] : []].join(" and ")} bytes contain invalid or incomplete UTF-8; replacement characters in the text capture do not preserve the original bytes.`] : [],
					...outputLimitReached ? [reverseCommandOutputLimitation(outputBudgetBytes, outputBudgetSource)] : outputTruncated ? ["Captured provider output is partial because bytes were omitted; process completion is reported separately."] : [],
					...signalName === null || outputLimitReached ? [] : [`The provider process terminated by signal ${signalName}; captured output may be partial and command completion is unknown.`],
					...failure === undefined || failure instanceof AnalysisOutputError && failure.cleanupOnly ? [] : [`Command completion is unknown because the operation failed with ${failure._tag}: ${failure.message}`],
					...absolutePath === undefined ? [] : ["When both are available, pre-run and post-run digests detect artifact changes across the provider call but cannot prove the exact bytes consumed during the call."],
					...artifactChanged === true ? ["The provider command may have changed the artifact while analysis was running; pre-run and post-run digests are both reported."] : [],
					...absolutePath !== undefined && digestAfter === null ? [cleanupIncomplete ? "The post-run artifact digest was not captured because owned provider cleanup was incomplete at observation time; artifact changes during the command remain unquantified." : signal?.aborted ? "The post-run artifact digest is unknown because cancellation interrupted the digest." : "The post-run artifact digest is unknown because the artifact could not be read after the provider call."] : []
				];
				const evidence = createEvidence(absolutePath === undefined || digest === undefined ? unknownTarget("not-observed") : {
					path: absolutePath,
					sha256: digest,
					format: "unknown"
				}, profile.identity, {
					predicateType: "rea.reverse-engineering.command-observation",
					operation,
					parameters: {
						...absolutePath === undefined ? {
							operation: "architectures",
							...typeof parameters.max_output_bytes === "number" ? { max_output_bytes: parameters.max_output_bytes } : {},
							...typeof parameters.command_timeout_ms === "number" ? { command_timeout_ms: parameters.command_timeout_ms } : {}
						} : parameters,
						provider_executable: command,
						command_arguments: [...args]
					},
					rawResult: result,
					result,
					limitations,
					...absolutePath === undefined ? {} : { locations: [{
						kind: "artifact-path",
						path: absolutePath
					}] }
				});
				if (failure?._tag !== "AnalysisCancelledError" && failure?._tag !== "AnalysisTimeoutError") {
					const outcome = this.#outcome(operation);
					outcome.succeeded = Math.max(outcome.succeeded, dispatch);
				}
				return failure === undefined ? ok(evidence) : err(failure.retainPartialObservation(evidence));
			}
			#registerCleanupFailure(failure, cleanupOwner) {
				if (cleanupOwner !== undefined && failure.cleanupIncomplete) this.#pendingCleanup.get(cleanupOwner)?.release.bind(failure);
				return failure;
			}
		};
		OwnedOutputFailure = class extends Error {
			stdout;
			stderr;
			code;
			signal;
			outputTruncated;
			stdoutInvalidUtf8;
			stderrInvalidUtf8;
			stdoutBytes;
			stderrBytes;
			capabilityError;
			collectionFailure;
			cleanup;
			cleanupOwner;
			launchFailure;
			constructor(options) {
				super("Owned provider command did not produce a complete result.", { cause: options.cause });
				this.stdout = options.stdout;
				this.stderr = options.stderr;
				this.code = options.code;
				this.signal = options.signal;
				this.outputTruncated = options.outputTruncated;
				this.stdoutInvalidUtf8 = options.stdoutInvalidUtf8;
				this.stderrInvalidUtf8 = options.stderrInvalidUtf8;
				this.stdoutBytes = options.stdoutBytes;
				this.stderrBytes = options.stderrBytes;
				this.capabilityError = options.capabilityError;
				this.collectionFailure = options.collectionFailure ?? false;
				this.cleanup = options.cleanup;
				this.cleanupOwner = options.cleanupOwner;
				this.launchFailure = options.launchFailure ?? false;
			}
		};
		runOwnedCommandOutput = (runOwned, onCleanupOwner) => async (command, args, options) => {
			const spawnEnv = { ...options.env };
			try {
				const snapshot = await runOwned({
					command,
					arguments: [...args],
					runId: randomUUID(),
					expectedCommand: null,
					env: spawnEnv,
					hostEnvironment: {},
					sweepTokenOwnedProcesses: true
				}, {
					timeoutMs: options.timeout,
					diagnosticBytes: options.maxBuffer,
					acceptNonZeroExit: true
				}, { signal: options.signal });
				const captured = capturedProviderOutput(snapshot);
				const output = {
					stdout: captured.stdout,
					stderr: captured.stderr,
					outputTruncated: captured.truncated,
					stdoutInvalidUtf8: snapshot.stdout.invalidUtf8 === true,
					stderrInvalidUtf8: snapshot.stderr.invalidUtf8 === true,
					stdoutBytes: snapshot.stdout.bytes,
					stderrBytes: snapshot.stderr.bytes
				};
				if (snapshot.signal !== null && snapshot.signal !== undefined) throw new OwnedOutputFailure({
					...output,
					code: captured.exit_code ?? null,
					signal: snapshot.signal
				});
				if (snapshot.exitCode !== 0) throw new OwnedOutputFailure({
					...output,
					code: captured.exit_code ?? null,
					signal: null
				});
				return output;
			} catch (cause) {
				if (!(cause instanceof OwnedCommandFailure)) throw cause;
				if (cause.cleanupOwner !== undefined && cause.cleanupFailure !== null) onCleanupOwner(cause.cleanupOwner, {
					reason: cause.cleanupFailure,
					resources: cause.resources
				});
				const snapshot = cause.snapshot;
				const launchErrorCode = cause.cause instanceof Error ? Reflect.get(cause.cause, "code") : undefined;
				const code = cause.reason === "cancelled" ? "ABORT_ERR" : cause.reason === "timeout" ? "ETIMEDOUT" : cause.reason === "output-limit" ? "ERR_CHILD_PROCESS_STDIO_MAXBUFFER" : snapshot === null ? typeof launchErrorCode === "string" ? launchErrorCode : "ERR_PROVIDER_LAUNCH" : snapshot.exitCode ?? null;
				throw new OwnedOutputFailure({
					stdout: snapshot?.stdout.text ?? "",
					stderr: snapshot?.stderr.text ?? "",
					code,
					launchFailure: cause.reason === "process" && snapshot === null,
					signal: snapshot?.signal ?? null,
					outputTruncated: snapshot?.diagnosticTruncated === true,
					stdoutInvalidUtf8: snapshot?.stdout.invalidUtf8 === true,
					stderrInvalidUtf8: snapshot?.stderr.invalidUtf8 === true,
					stdoutBytes: snapshot?.stdout.bytes ?? 0,
					stderrBytes: snapshot?.stderr.bytes ?? 0,
					...cause.cause instanceof AnalysisCapabilityUnavailableError ? { capabilityError: cause.cause } : {},
					...cause.collectionFailure ? { collectionFailure: true } : {},
					...cause.cleanupFailure === null ? {} : { cleanup: {
						reason: cause.cleanupFailure,
						resources: cause.resources
					} },
					...cause.cleanupOwner === undefined ? {} : { cleanupOwner: cause.cleanupOwner },
					cause
				});
			}
		};
		ownedCleanupOptions = (cause) => cause instanceof OwnedOutputFailure && cause.cleanup !== undefined ? { cleanup: cause.cleanup } : {};
		runtimeControlPreparationError = (cause) => {
			if (cause instanceof RuntimeControlUnavailableError) return cause;
			if (cause instanceof OwnedOutputFailure) return runtimeControlPreparationError(cause.cause);
			if (cause instanceof OwnedCommandFailure && cause.reason === "process") return runtimeControlPreparationError(cause.cause);
			return windowsNativeSpawnControlError(cause);
		};
		reverseCommandTimeoutGuidance = (provider, timeoutMs) => nativeDeadlineRecovery({
			timeoutMs,
			parameter: "command_timeout_ms",
			defaultMs: DEFAULT_REVERSE_COMMAND_TIMEOUT_MS,
			phase: `${provider} command deadline`,
			unchanged: `No restart is required. The combined output allowance is separately selected by max_output_bytes (default ${String(DEFAULT_REVERSE_COMMAND_OUTPUT_BYTES)} bytes).`,
			detail: " It covers target preflight and the one-shot command (deadlineExpired); it is not a Ghidra or Hopper startup deadline or a debugger session deadline."
		});
		digestFile = async (path, signal, stat$1 = stat, timeoutMs = DEFAULT_REVERSE_COMMAND_TIMEOUT_MS, open = createReadStream) => {
			const startedAt = performance.now();
			const info = await statWithDeadline(path, signal, stat$1, timeoutMs);
			if (!info.isFile()) throw Object.assign(new Error("Artifact digest requires a regular file"), { code: "EINVAL" });
			const remainingMs = Math.max(0, Math.ceil(timeoutMs - (performance.now() - startedAt)));
			if (remainingMs === 0) throw Object.assign(new Error("Artifact digest timed out"), { code: "ETIMEDOUT" });
			return new Promise((resolveDigest, rejectDigest) => {
				const hash = createHash("sha256");
				const stream = open(path);
				const timer = setTimeout(() => stream.destroy(Object.assign(new Error("Artifact digest timed out"), { code: "ETIMEDOUT" })), remainingMs);
				const abort = () => {
					stream.destroy(cancelledBy("artifact_digest", carriedReason(signal?.reason)));
				};
				const cleanup = () => {
					clearTimeout(timer);
					signal?.removeEventListener("abort", abort);
				};
				if (signal?.aborted) {
					cleanup();
					stream.destroy();
					rejectDigest(cancelledBy("artifact_digest", signal));
					return;
				}
				signal?.addEventListener("abort", abort, { once: true });
				stream.on("data", (chunk) => hash.update(chunk));
				stream.once("error", (cause) => {
					cleanup();
					rejectDigest(cause);
				});
				stream.once("end", () => {
					cleanup();
					resolveDigest(hash.digest("hex"));
				});
			});
		};
		PHYSICAL_FAILURE_CODES = new Set([
			"EACCES",
			"EPERM",
			"ETIMEDOUT",
			"ENOENT",
			"ENOTDIR",
			"EINVAL",
			"ELOOP",
			"ENAMETOOLONG",
			"E2BIG",
			"EBUSY",
			"ERR_PROVIDER_LAUNCH"
		]);
		preflightCancelled = (signal, cause, code) => {
			if (cause instanceof AnalysisCancelledError) return true;
			if (signal?.aborted !== true) return false;
			if (cause === signal.reason) return true;
			return typeof code !== "string" || !PHYSICAL_FAILURE_CODES.has(code);
		};
		commandCancelled = (signal, cause, code) => {
			if (cause instanceof OwnedOutputFailure && cause.cause instanceof OwnedCommandFailure) return cause.cause.reason === "cancelled";
			return preflightCancelled(signal, cause, code);
		};
		callerCancellationCause = (signal, cause) => signal?.aborted === true ? signal.reason : cause;
		commandFailureCode = (cause) => {
			if (typeof cause !== "object" || cause === null) return undefined;
			const code = Reflect.get(cause, "code");
			return typeof code === "string" || typeof code === "number" ? code : undefined;
		};
		statWithDeadline = (path, signal, stat, timeoutMs) => {
			if (signal?.aborted) return Promise.reject(cancelledBy("artifact_digest", signal));
			return new Promise((resolveStat, rejectStat) => {
				let settled = false;
				const finish = (outcome) => {
					if (settled) return;
					settled = true;
					clearTimeout(timer);
					signal?.removeEventListener("abort", abort);
					if (outcome.ok) resolveStat(outcome.value);
					else rejectStat(outcome.error);
				};
				const abort = () => finish(err(cancelledBy("artifact_digest", carriedReason(signal?.reason))));
				const timer = setTimeout(() => finish(err(Object.assign(new Error("Artifact stat timed out"), { code: "ETIMEDOUT" }))), timeoutMs);
				signal?.addEventListener("abort", abort, { once: true });
				if (signal?.aborted) {
					abort();
					return;
				}
				try {
					void stat(path).then((info) => finish(ok(info)), (cause) => finish(err(cause)));
				} catch (cause) {
					finish(err(cause));
				}
			});
		};
	})))();
}

//#endregion
//#region dist/objdump/ObjdumpCommand.js
var objdumpCommand, objdumpCommandLimitations;
function init_ObjdumpCommand() {
	return (init_ObjdumpCommand = __esmMin((() => {
		init_callerPath();
		objdumpCommand = (input) => {
			if (input.operation === "architectures") return ["-i"];
			const argumentsByOperation = {
				file_headers: ["-f"],
				section_headers: ["-h"],
				symbols: ["-t"],
				relocations: ["-r"],
				dwarf: ["-W", input.follow_debug_links ? "-WK" : "-WN"],
				disassemble: input.operation === "disassemble" && input.symbol !== undefined ? [`--disassemble=${input.symbol}`] : ["-d"],
				disassemble_all: ["-D"]
			};
			return [...argumentsByOperation[input.operation], absoluteCallerPath(input.path)];
		};
		objdumpCommandLimitations = (input) => [
			...input.operation === "architectures" ? ["The objdump implementation and version are unknown. The captured output is the selected command's response and does not establish support for an artifact."] : [],
			...input.operation === "disassemble" && input.symbol !== undefined ? ["Disassembly is scoped to the caller-selected symbol using the provider's matching and symbol-boundary semantics; an empty match does not establish artifact-wide absence."] : [],
			...input.operation === "dwarf" && input.follow_debug_links === true ? ["DWARF output may include local debug-link files whose identities are not bound to Evidence."] : []
		];
	})))();
}

//#endregion
//#region dist/rizin/RizinCommand.js
var rizinCommand, rizinCommandLimitations, RIZIN_SHELL_REFUSALS, rizinCommandRejection;
function init_RizinCommand() {
	return (init_RizinCommand = __esmMin((() => {
		init_callerPath();
		rizinCommand = (input) => [
			"-N",
			"-q",
			"-e",
			"scr.color=0",
			...input.asm_arch === undefined ? [] : ["-a", input.asm_arch],
			...input.asm_bits === undefined ? [] : ["-b", String(input.asm_bits)],
			...input.asm_cpu === undefined ? [] : ["-e", `asm.cpu=${input.asm_cpu}`],
			...input.base_address === undefined ? [] : [
				"-n",
				"-m",
				input.base_address
			],
			"-c",
			input.command,
			absoluteCallerPath(input.path)
		];
		rizinCommandLimitations = (input) => [
			"Rizin commands and retained plugins may read files or access network resources outside the selected artifact; those external inputs are not bound to Evidence.",
			"completion_status covers process completion and Rizin shell refusals only. A statement that ran can still fail while Rizin returns exit_code 0, so inspect stderr before treating an empty response as absence.",
			...input.asm_arch === undefined && input.asm_bits === undefined && input.asm_cpu === undefined ? [] : ["REA does not confirm that Rizin applied the selected asm_* values. Rizin uses another arch or bits value when it cannot apply one, at most reporting it on stderr, and e asm.cpu echoes any value, so compare it with e asm.cpu=?."],
			...input.base_address === undefined ? [] : ["With base_address, REA passed -n and -m so that Rizin maps file offset 0 at that address as a raw image; REA does not confirm the map, which oml shows. -n skips Rizin's format loaders, so expect no sections, symbols or entry point, and arch, bits and byte order stay at Rizin's defaults unless the call selects them."]
		];
		RIZIN_SHELL_REFUSALS = [
			{
				line: /^ERROR: Command '(.*)' does not exist\.$/u,
				reason: "unknown_command",
				command: 1,
				refused: (command) => `the unknown command ${JSON.stringify(command)}`
			},
			{
				line: /^ERROR: Wrong number of arguments passed to `(.*)`, see its help with `.*\?`$/u,
				reason: "wrong_argument_count",
				command: 1,
				refused: (command) => `a wrong argument count for ${JSON.stringify(command)}`
			},
			{
				line: /^ERROR: core: Error while executing command: /u,
				reason: "invalid_statement",
				refused: () => "an invalid statement"
			},
			{
				line: /^ERROR: core: Error while parsing command: /u,
				reason: "parse_failure",
				refused: () => "input that failed to parse"
			}
		];
		rizinCommandRejection = (stderr) => {
			for (const text of stderr.split(/\r?\n/u)) for (const { line, reason, command, refused } of RIZIN_SHELL_REFUSALS) {
				const match = line.exec(text);
				if (match === null) continue;
				const named = command === undefined ? null : match[command] ?? null;
				return {
					refusal: {
						reason,
						command: named,
						line: text
					},
					limitation: `Rizin refused ${refused(named)} (ERROR line on stderr, recorded in refusal). It skips a refused statement and every later one, so stdout holds at most the output of earlier statements; empty stdout is not an empty result. Correct the statement, using <command>? for Rizin's help, and run it again.`
				};
			}
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/composition/resolveWindowsProviderExecutable.js
var isRegularFile, resolveWindowsProviderExecutable;
function init_resolveWindowsProviderExecutable() {
	return (init_resolveWindowsProviderExecutable = __esmMin((() => {
		init_result();
		init_executableSearch();
		isRegularFile = (path) => {
			try {
				return statSync(path).isFile();
			} catch {
				return false;
			}
		};
		resolveWindowsProviderExecutable = (executable, environment, lookup = {}) => {
			const cwd = lookup.cwd ?? process.cwd();
			if (win32.isAbsolute(executable) || executable.includes("/") || executable.includes("\\") || win32.parse(executable).root !== "") return ok(win32.resolve(cwd, executable));
			const candidates = windowsPathCandidates(executable, environment, { cwd });
			if (!candidates.ok) return candidates;
			for (const { path } of candidates.value) if ((lookup.isFile ?? isRegularFile)(path)) return ok(path);
			return err({ kind: "not_found" });
		};
	})))();
}

//#endregion
//#region dist/composition/reverseEngineering.js
var createReverseEngineeringCommandPort, selectCommand, createReverseEngineeringService;
function init_reverseEngineering() {
	return (init_reverseEngineering = __esmMin((() => {
		init_HostPlatform();
		init_result();
		init_ReverseEngineeringService();
		init_ObjdumpCommand();
		init_ObjdumpProviderIdentity();
		init_RizinCommand();
		init_RizinProviderIdentity();
		init_resolveWindowsProviderExecutable();
		createReverseEngineeringCommandPort = (environment, platform = HOST_PLATFORM.platform) => ({
			objdump: (input) => selectCommand(environment.REA_OBJDUMP_COMMAND ?? "objdump", environment, platform, {
				arguments: objdumpCommand(input),
				limitations: objdumpCommandLimitations(input),
				identity: OBJDUMP_PROVIDER_IDENTITY,
				repair: OBJDUMP_COMMAND_REPAIR,
				environmentOverrides: { DEBUGINFOD_URLS: "" }
			}),
			rizin: (input) => selectCommand(environment.REA_RIZIN_COMMAND ?? "rizin", environment, platform, {
				arguments: rizinCommand(input),
				limitations: rizinCommandLimitations(input),
				rejection: rizinCommandRejection,
				identity: RIZIN_PROVIDER_IDENTITY,
				repair: RIZIN_COMMAND_REPAIR
			})
		});
		selectCommand = (command, environment, platform, profile) => {
			if (platform !== "win32") return ok({
				...profile,
				executable: command
			});
			const resolved = resolveWindowsProviderExecutable(command, environment);
			if (resolved.ok) return ok({
				...profile,
				executable: resolved.value
			});
			return err({
				identity: profile.identity,
				repair: profile.repair,
				command,
				reason: resolved.error.kind === "not_found" ? { kind: "not_found" } : {
					kind: "invalid_pathext",
					extension: resolved.error.extension
				}
			});
		};
		createReverseEngineeringService = (environment = process.env, options = {}) => {
			const environmentSnapshot = { ...environment };
			return new ReverseEngineeringService({
				...options,
				environment: environmentSnapshot,
				commands: createReverseEngineeringCommandPort(environmentSnapshot)
			});
		};
	})))();
}

//#endregion
//#region dist/process/DebuggerLaunchFile.js
var retryDebuggerStartupFileCleanup, observeDebuggerLaunchFile;
function init_DebuggerLaunchFile() {
	return (init_DebuggerLaunchFile = __esmMin((() => {
		init_analysisErrorCleanup();
		init_analysisErrorCore();
		init_providerCleanupError();
		init_result();
		init_jsonValue();
		init_targetIdentity();
		init_OwnedRegularFile();
		init_StableFileHash();
		init_errorMessage();
		init_resources();
		retryDebuggerStartupFileCleanup = async ({ provider, operation, resources }) => {
			try {
				await resources.retryCleanup();
				return ok(null);
			} catch (cause) {
				const failure = new ProviderCleanupError(provider, resources.cleanupResources, {}, {
					operation,
					cause
				});
				bindArtifactFileCleanup(cause, failure);
				return err(failure);
			}
		};
		observeDebuggerLaunchFile = async (path, { provider, operation, resources, signal }) => {
			let lease;
			try {
				const { sha256 } = await hashStableFile(path, {
					...signal === undefined ? {} : { signal },
					retainFailedClose: (owner) => {
						lease = new AnalysisCleanupLease(() => owner.close(), [path]);
						resources.retain({
							kind: "lease",
							resource: path,
							lease
						});
					}
				});
				return ok({ identity: {
					kind: "file",
					sha256,
					format: "file",
					architecture: null,
					selection: null
				} });
			} catch (cause) {
				const outcome = cause instanceof RegularFileCancelled || cause instanceof RegularFileCleanupFailure ? cause.outcome : undefined;
				const completed = outcome?.kind === "completed" ? { completed_hash: jsonValueSchema.parse(outcome.value) } : undefined;
				const cancellation = regularFileCancellation(cause);
				const cancelled = cancellation === undefined ? undefined : cancelledBy(operation, carriedReason(cancellation.reason), { diagnostics: completed });
				const describe = (failure) => errorMessage(stableFileHashCause(failure));
				if (!(cause instanceof RegularFileCleanupFailure)) {
					if (cancelled !== undefined) return err(cancelled);
					return ok({
						identity: unknownTarget("not-observed"),
						unobservedReason: describe(cause)
					});
				}
				const cleanup = new ProviderCleanupError(provider, [path], {
					...completed,
					...cause.outcome.kind === "failed" && cancelled === undefined ? { launch_file_hash_failure: describe(cause.outcome.cause) } : {}
				}, {
					operation,
					cause: cause.cleanupCause
				});
				const failure = cancelled === undefined ? cleanup : analysisErrorWithCleanupFailure(cancelled, cleanup, operation);
				lease?.bindCleanupError(cleanup);
				if (failure !== cleanup) lease?.bindCleanupError(failure);
				return err(failure);
			}
		};
	})))();
}

//#endregion
//#region dist/gdb/GdbMiRecord.js
var STREAM_KINDS, MAX_GDB_MI_NESTED_VALUE_FRAMES, SIMPLE_ESCAPES, HEX_DIGITS, OCTAL_DIGITS, HEADER, gdbMiResultHeader, MiParser, parseGdbMiResultRecord, parseGdbMiStreamRecord, parseGdbMiDoneRecord, gdbMiConstText, gdbMiResultsNamed;
function init_GdbMiRecord() {
	return (init_GdbMiRecord = __esmMin((() => {
		init_result();
		STREAM_KINDS = {
			"~": "console",
			"@": "target",
			"&": "log"
		};
		MAX_GDB_MI_NESTED_VALUE_FRAMES = 256;
		SIMPLE_ESCAPES = {
			a: 7,
			b: 8,
			e: 27,
			f: 12,
			n: 10,
			r: 13,
			t: 9,
			v: 11,
			"\\": 92,
			"\"": 34,
			"'": 39,
			"?": 63
		};
		HEX_DIGITS = /[0-9a-f]+/iy;
		OCTAL_DIGITS = /[0-7]{1,3}/y;
		HEADER = /^(\d*)\^(done|running|connected|error|exit)(?=,|$)/u;
		gdbMiResultHeader = (line) => {
			const match = HEADER.exec(line);
			if (match?.[1] === undefined || match[1] === "") return undefined;
			return {
				token: Number(match[1]),
				resultClass: match[2]
			};
		};
		MiParser = class {
			#cursor = 0;
			#line;
			constructor(line) {
				this.#line = line;
			}
			get cursor() {
				return this.#cursor;
			}
			fail(reason) {
				return {
					kind: "malformed-mi-record",
					reason,
					offset: this.#cursor
				};
			}
			record() {
				const header = HEADER.exec(this.#line);
				if (header === null) return err(this.fail("line is not an MI result record"));
				const token = header[1] === "" ? undefined : header[1];
				const resultClass = header[2];
				this.#cursor = header[0].length;
				const results = [];
				while (this.#cursor < this.#line.length) {
					if (this.#line[this.#cursor] !== ",") return err(this.fail("expected ',' between results"));
					this.#cursor += 1;
					const result = this.#result(0);
					if (!result.ok) return result;
					results.push(result.value);
				}
				return ok({
					token,
					resultClass,
					results
				});
			}
			stream() {
				const kind = STREAM_KINDS[this.#line[0] ?? ""];
				if (kind === undefined || this.#line[1] !== "\"") return err(this.fail("line is not an MI stream record"));
				this.#cursor = 1;
				const text = this.#cString();
				if (!text.ok) return text;
				if (this.#cursor !== this.#line.length) return err(this.fail("text after the stream record's C-string"));
				return ok({
					kind,
					value: text.value
				});
			}
			#isNameCharacter(character) {
				return character !== undefined && !/[=,{}[\]"\s]/u.test(character) && character.charCodeAt(0) >= 32;
			}
			#name() {
				const start = this.#cursor;
				while (this.#isNameCharacter(this.#line[this.#cursor])) this.#cursor += 1;
				if (this.#cursor === start || this.#line[this.#cursor] !== "=") {
					this.#cursor = start;
					return undefined;
				}
				const name = this.#line.slice(start, this.#cursor);
				this.#cursor += 1;
				return name;
			}
			#result(depth) {
				const name = this.#name();
				if (name === undefined) return err(this.fail("expected variable="));
				const value = this.#value(depth);
				return value.ok ? ok({
					name,
					value: value.value
				}) : value;
			}
			#value(depth) {
				const character = this.#line[this.#cursor];
				if (character === "\"") return this.#cString();
				if (character !== "{" && character !== "[") return err(this.fail("expected a C-string, tuple or list"));
				if (depth >= MAX_GDB_MI_NESTED_VALUE_FRAMES) return err(this.fail("MI value nesting exceeds the parser bound"));
				this.#cursor += 1;
				const close = character === "{" ? "}" : "]";
				if (this.#line[this.#cursor] === close) {
					this.#cursor += 1;
					return ok(character === "{" ? {
						kind: "tuple",
						results: []
					} : {
						kind: "list",
						values: []
					});
				}
				if (character === "{") {
					const results = this.#sequence(close, () => this.#result(depth + 1));
					return results.ok ? ok({
						kind: "tuple",
						results: results.value
					}) : results;
				}
				const start = this.#cursor;
				const listOfResults = this.#name() !== undefined;
				this.#cursor = start;
				if (listOfResults) {
					const results = this.#sequence(close, () => this.#result(depth + 1));
					return results.ok ? ok({
						kind: "result-list",
						results: results.value
					}) : results;
				}
				const values = this.#sequence(close, () => this.#value(depth + 1));
				return values.ok ? ok({
					kind: "list",
					values: values.value
				}) : values;
			}
			#sequence(close, item) {
				const items = [];
				while (true) {
					const next = item();
					if (!next.ok) return next;
					items.push(next.value);
					const separator = this.#line[this.#cursor];
					this.#cursor += 1;
					if (separator === close) return ok(items);
					if (separator !== ",") {
						this.#cursor -= 1;
						return err(this.fail(`expected ',' or '${close}'`));
					}
				}
			}
			/**
			* Decode one C-string; escapes produce bytes, other characters UTF-8. Runs
			* of unescaped characters are validated in place and encoded once.
			*/
			#cString() {
				const line = this.#line;
				const chunks = [];
				let escaped = [];
				let index = this.#cursor + 1;
				let runStart = index;
				const flushEscaped = () => {
					if (escaped.length === 0) return;
					chunks.push(Uint8Array.from(escaped));
					escaped = [];
				};
				const flushRun = () => {
					if (index === runStart) return;
					flushEscaped();
					chunks.push(Buffer.from(line.slice(runStart, index), "utf8"));
				};
				const failAt = (at, reason) => {
					this.#cursor = at;
					return err(this.fail(reason));
				};
				while (index < line.length) {
					const code = line.charCodeAt(index);
					if (code === 34) {
						flushRun();
						flushEscaped();
						this.#cursor = index + 1;
						const joined = Buffer.concat(chunks);
						return ok({
							kind: "const",
							bytes: new Uint8Array(joined.buffer, joined.byteOffset, joined.byteLength)
						});
					}
					if (code !== 92) {
						if (code < 32) return failAt(index, "unescaped control character in C-string");
						if (code >= 55296 && code <= 56319) {
							const low = line.charCodeAt(index + 1);
							if (!(low >= 56320 && low <= 57343)) return failAt(index, "lone surrogate in C-string");
							index += 2;
							continue;
						}
						if (code >= 56320 && code <= 57343) return failAt(index, "lone surrogate in C-string");
						index += 1;
						continue;
					}
					flushRun();
					const escape = line[index + 1];
					const simple = escape === undefined ? undefined : SIMPLE_ESCAPES[escape];
					if (simple !== undefined) {
						escaped.push(simple);
						index += 2;
					} else if (escape === "x") {
						HEX_DIGITS.lastIndex = index + 2;
						const hex = HEX_DIGITS.exec(line)?.[0];
						if (hex === undefined) return failAt(index, "\\x escape without hex digits");
						escaped.push(Number.parseInt(hex.slice(-2), 16));
						index += 2 + hex.length;
					} else if (escape !== undefined && escape >= "0" && escape <= "7") {
						OCTAL_DIGITS.lastIndex = index + 1;
						const octal = OCTAL_DIGITS.exec(line)[0];
						escaped.push(Number.parseInt(octal, 8) & 255);
						index += 1 + octal.length;
					} else return failAt(index, "invalid C-string escape");
					runStart = index;
				}
				return failAt(index, "unterminated C-string");
			}
		};
		parseGdbMiResultRecord = (line) => new MiParser(line).record();
		parseGdbMiStreamRecord = (line) => new MiParser(line).stream();
		parseGdbMiDoneRecord = (line) => {
			const parsed = parseGdbMiResultRecord(line);
			if (!parsed.ok) return parsed;
			if (parsed.value.token === undefined) return err({
				kind: "malformed-mi-record",
				reason: "result record has no token",
				offset: 0
			});
			if (parsed.value.resultClass !== "done") return err({
				kind: "malformed-mi-record",
				reason: `result class is ${parsed.value.resultClass}, not done`,
				offset: 0
			});
			return parsed;
		};
		gdbMiConstText = (value) => value.kind === "const" && isUtf8(value.bytes) ? Buffer.from(value.bytes).toString("utf8") : undefined;
		gdbMiResultsNamed = (results, name) => results.flatMap((result) => result.name === name ? [result.value] : []);
	})))();
}

//#endregion
//#region dist/gdb/GdbProviderIdentity.js
var GDB_PROVIDER_IDENTITY, GDB_OBSERVATION_AUTHORITY, gdbReportedVersion;
function init_GdbProviderIdentity() {
	return (init_GdbProviderIdentity = __esmMin((() => {
		init_GdbMiRecord();
		GDB_PROVIDER_IDENTITY = {
			id: "gnu.gdb",
			name: "GNU GDB",
			version: null
		};
		GDB_OBSERVATION_AUTHORITY = "controlled-replay";
		gdbReportedVersion = (records) => {
			const banner = records.map(parseGdbMiStreamRecord).find((record) => record.ok && record.value.kind === "console");
			const text = banner?.ok ? gdbMiConstText(banner.value.value) : undefined;
			const line = text?.split("\n", 1)[0]?.trim() ?? "";
			if (!line.startsWith("GNU gdb ")) return null;
			const version = line.slice(line.lastIndexOf(" ") + 1);
			return /^\d/u.test(version) ? version : null;
		};
	})))();
}

//#endregion
//#region dist/process/PersistentDebuggerHost.js
var persistentDebuggerHostSupported;
function init_PersistentDebuggerHost() {
	return (init_PersistentDebuggerHost = __esmMin((() => {
		persistentDebuggerHostSupported = (platform) => platform === "linux";
	})))();
}

//#endregion
//#region dist/gdb/GdbCommandRecords.js
var snapshotGdbCommandRecords;
function init_GdbCommandRecords() {
	return (init_GdbCommandRecords = __esmMin((() => {
		snapshotGdbCommandRecords = (records) => {
			const snapshot = [...records];
			return {
				records: snapshot,
				console: snapshot.filter((line) => line.startsWith("~")).join("\n"),
				target: snapshot.filter((line) => line.startsWith("@")).join("\n"),
				log: snapshot.filter((line) => line.startsWith("&")).join("\n")
			};
		};
	})))();
}

//#endregion
//#region dist/process/ownedDebuggerCleanupError.js
var OwnedDebuggerCleanupError, OwnedDebuggerStopFailure, visitCleanupFailure, retainedDebuggerProcessIds, debuggerCleanupCodes, retainedDebuggerDiagnostics, retainedDebuggerRemediation;
function init_ownedDebuggerCleanupError() {
	return (init_ownedDebuggerCleanupError = __esmMin((() => {
		OwnedDebuggerCleanupError = class extends AggregateError {
			/** Process IDs when cleanup gave up. Observations, not lasting proof of identity. */
			retainedProcessIds;
			constructor(failures, message, retainedProcessIds) {
				super(failures, message);
				this.retainedProcessIds = retainedProcessIds;
			}
		};
		OwnedDebuggerStopFailure = class extends Error {
			code;
			constructor(stop) {
				super(stop.reason);
				this.name = "OwnedDebuggerStopFailure";
				this.code = stop.code;
			}
		};
		visitCleanupFailure = (cause, onError) => {
			const visited = new WeakSet();
			const visit = (node) => {
				if (typeof node !== "object" || node === null || visited.has(node)) return;
				visited.add(node);
				if (node instanceof Error) onError(node);
				if (node instanceof AggregateError) for (const error of node.errors) visit(error);
				if (node instanceof Error) visit(node.cause);
			};
			visit(cause);
		};
		retainedDebuggerProcessIds = (cause) => {
			const found = new Set();
			visitCleanupFailure(cause, (error) => {
				if (error instanceof OwnedDebuggerCleanupError) for (const pid of error.retainedProcessIds) found.add(pid);
			});
			return [...found];
		};
		debuggerCleanupCodes = (cause) => {
			const found = new Set();
			visitCleanupFailure(cause, (error) => {
				if (error instanceof OwnedDebuggerStopFailure) found.add(error.code);
			});
			return [...found];
		};
		retainedDebuggerDiagnostics = (cause) => {
			const pids = retainedDebuggerProcessIds(cause);
			const codes = debuggerCleanupCodes(cause);
			return {
				...pids.length === 0 ? {} : { retained_debugger_pids: [...pids] },
				...codes.length === 0 ? {} : { debugger_cleanup_codes: [...codes] }
			};
		};
		retainedDebuggerRemediation = (pids) => `REA exits without confirming that the debugger stopped, and no later REA command can retry this cleanup. Check process ${pids.join(", ")} and its target, and stop them if they are still running.`;
	})))();
}

//#endregion
//#region dist/process/ownedDebuggerSession.js
var OwnedDebuggerDetachFailure, RUNTIME_DEBUGGER_SETTINGS, runtimeDebuggerSetting, debuggerAnalysisLimit, debuggerAdmissionDiagnostics, debuggerAdmissionRecovery, fixedDeadlineGuidance, configurableDeadlineGuidance, debuggerResourceConstraintError, incompleteStopFacts, retainedDebuggerCleanupFailure, DETACH_TIMEOUT_MS, MAX_LATE_DEBUGGER_OUTPUT_BYTES, readLinuxProcessStartTime, verifyOwnedInferiorsEnded, detachAttempts, detachOutcomes, isVerifiedDetachResult, waitForInferiorDetach, finishExitedDebuggerSession, stopOwnedDebuggerProcess, closeOwnedDebuggerSessions;
function init_ownedDebuggerSession() {
	return (init_ownedDebuggerSession = __esmMin((() => {
		init_HostPlatform();
		init_debuggerSessionLimits();
		init_analysisSettingDefinitions();
		init_analysisErrorCore();
		init_LinuxProcessStat();
		init_ownedDebuggerCleanupError();
		init_errorMessage();
		OwnedDebuggerDetachFailure = class extends Error {
			code;
			constructor(code, message) {
				super(message);
				this.code = code;
				this.name = "OwnedDebuggerDetachFailure";
			}
		};
		RUNTIME_DEBUGGER_SETTINGS = {
			[DEBUGGER_COMMAND_DEADLINE_SETTING]: "debugger.command_deadline_ms",
			[DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING]: "debugger.max_command_output_bytes"
		};
		runtimeDebuggerSetting = (admission) => RUNTIME_DEBUGGER_SETTINGS[admission.setting];
		debuggerAnalysisLimit = (admission) => {
			const setting = runtimeDebuggerSetting(admission);
			return setting === undefined ? undefined : analysisSettingLimit(setting, admission.value, admission.source);
		};
		debuggerAdmissionDiagnostics = (admission) => {
			const analysisSetting = runtimeDebuggerSetting(admission);
			const update_mode = analysisSetting === undefined ? "restart" : "runtime";
			return {
				setting: admission.setting,
				effective_value: admission.value,
				source: admission.source,
				default_value: admission.defaultValue,
				minimum: admission.minimum,
				maximum: admission.maximum,
				unit: admission.unit,
				update_mode,
				pending_restart: false,
				...analysisSetting === undefined ? {} : { analysis_setting: analysisSetting }
			};
		};
		debuggerAdmissionRecovery = (admission) => {
			const facts = debuggerAdmissionDiagnostics(admission);
			const identity = facts.analysis_setting === undefined ? admission.setting : `${facts.analysis_setting} (launch seed ${admission.setting})`;
			const change = facts.update_mode === "runtime" ? `It can be changed at runtime with update_analysis_settings.` : `Set ${admission.setting} in the environment that starts REA to a positive decimal integer from ${String(admission.minimum)} to ${String(admission.maximum)}, then restart REA.`;
			return `The effective ${identity} value is ${String(admission.value)} ${admission.unit} (source ${admission.source}; default ${String(admission.defaultValue)} ${admission.unit}, floor ${String(admission.minimum)} ${admission.unit}, maximum ${String(admission.maximum)} ${admission.unit}). ${change}`;
		};
		fixedDeadlineGuidance = (what, timeoutMs) => ({
			userMessage: `${what} reached its ${String(timeoutMs)} ms deadline (deadlineExpired). This release has no runtime override.`,
			remediationAction: `This ${String(timeoutMs)} ms deadline has no runtime override. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`
		});
		configurableDeadlineGuidance = (what, admission) => {
			const recovery = debuggerAdmissionRecovery(admission);
			const limit = debuggerAnalysisLimit(admission);
			return {
				userMessage: `${what} reached its ${String(admission.value)} ms deadline (deadlineExpired). ${recovery}`,
				remediationAction: recovery,
				diagnostics: debuggerAdmissionDiagnostics(admission),
				...limit === undefined ? {} : { limit }
			};
		};
		debuggerResourceConstraintError = (operation, resource, summary, remediation, admission, reported) => {
			const facts = debuggerAdmissionDiagnostics(admission);
			const recovery = debuggerAdmissionRecovery(admission);
			const limit = debuggerAnalysisLimit(admission);
			return new AnalysisResourceConstraintError(operation, resource, `${summary} ${recovery}`, {
				...facts,
				...reported
			}, {
				remediationAction: `${remediation} ${recovery}`,
				diagnostics: facts,
				...limit === undefined ? {} : { limit }
			});
		};
		incompleteStopFacts = ({ code, reason }, resources) => ({
			cleanup: {
				reason,
				resources: [...resources]
			},
			diagnostics: { debugger_cleanup: code }
		});
		retainedDebuggerCleanupFailure = (debugger_, operation, { code, reason }, resources, callerOptions = {}) => {
			const { cleanup, diagnostics } = incompleteStopFacts({
				code,
				reason
			}, resources);
			const options = {
				...callerOptions,
				diagnostics: {
					...callerOptions.diagnostics,
					...diagnostics
				}
			};
			const primary = options.cause;
			if (primary instanceof AnalysisCancelledError) {
				const { cause: _, ...cancelledOptions } = options;
				return cancelledBy(operation, primary, {
					...cancelledOptions,
					capturedOutput: options.capturedOutput ?? primary.capturedOutput,
					partialObservation: options.partialObservation ?? primary.partialObservation,
					cleanup
				});
			}
			return new AnalysisCapabilityUnavailableError(debugger_.provider, operation, `The owned ${debugger_.displayName} process could not be confirmed stopped: ${reason}`, {
				...options,
				cleanup
			});
		};
		DETACH_TIMEOUT_MS = 1e3;
		MAX_LATE_DEBUGGER_OUTPUT_BYTES = 64 * 1024;
		readLinuxProcessStartTime = async (pid) => {
			if (HOST_PLATFORM.platform !== "linux") throw new Error("Inferior process identity verification requires Linux /proc.");
			let stat;
			try {
				stat = await readFile(`/proc/${pid}/stat`, "utf8");
			} catch (cause) {
				if (typeof cause === "object" && cause !== null && "code" in cause && cause.code === "ENOENT") return null;
				throw cause;
			}
			const parsed = parseLinuxProcessStat(stat);
			if (parsed === undefined || parsed.pid !== Number(pid)) throw new Error(`Inferior PID ${pid} has an unreadable process identity.`);
			return parsed.startTime;
		};
		verifyOwnedInferiorsEnded = async (identities, readStartTime = readLinuxProcessStartTime) => {
			let foundIdentity = false;
			for (const identity of identities) {
				foundIdentity = true;
				const observed = await readStartTime(identity.pid);
				if (observed === identity.startTime) return false;
			}
			return foundIdentity;
		};
		detachAttempts = new WeakMap();
		detachOutcomes = new WeakMap();
		isVerifiedDetachResult = (result) => typeof result === "object" && result !== null && ("status" in result && result.status === "no-inferior" || "status" in result && result.status === "detached" && "outputSink" in result && result.outputSink === "durable");
		waitForInferiorDetach = async (session, detach) => {
			let attempt = detachAttempts.get(session);
			if (attempt === undefined) {
				const pending = Promise.resolve().then(() => detach.call(session));
				const tracked = pending.then((result) => {
					detachAttempts.delete(session);
					detachOutcomes.set(session, isVerifiedDetachResult(result) ? "confirmed" : "unconfirmed");
					return result;
				}, (cause) => {
					detachAttempts.delete(session);
					detachOutcomes.set(session, "unconfirmed");
					throw cause;
				});
				attempt = tracked;
				detachAttempts.set(session, tracked);
			}
			let timer;
			try {
				return await Promise.race([attempt, new Promise((resolve) => {
					timer = setTimeout(() => resolve(undefined), DETACH_TIMEOUT_MS);
				})]);
			} finally {
				clearTimeout(timer);
			}
		};
		finishExitedDebuggerSession = async (session, debuggerName, platform, status) => {
			try {
				session.supervisor.limitAdditionalOutputBytes(MAX_LATE_DEBUGGER_OUTPUT_BYTES);
				if (!await session.supervisor.waitForOutputClose(1e3)) {
					return {
						status: "incomplete",
						code: "output-unsettled",
						reason: platform === "win32" ? `Owned ${debuggerName} process leader exited, but its Windows Job Object still has active descendants or has not reported settlement.` : `Owned ${debuggerName} process leader exited, but inherited output streams are still open or have not reported settlement.`
					};
				}
			} catch (cause) {
				return {
					status: "incomplete",
					code: "output-unsettled",
					reason: platform === "win32" ? `Owned ${debuggerName} Windows Job Object settlement could not be verified: ${errorMessage(cause)}` : `Owned ${debuggerName} inherited output stream settlement could not be verified: ${errorMessage(cause)}`
				};
			}
			if (platform !== "win32") session.supervisor.unrefOutputStreams();
			session.supervisor.dispose();
			return { status };
		};
		stopOwnedDebuggerProcess = async (session, debuggerName, options = {}) => {
			const platform = options.platform ?? HOST_PLATFORM.platform;
			if (session.exited) {
				if (detachAttempts.has(session)) return {
					status: "incomplete",
					code: "detach-pending",
					reason: `Owned ${debuggerName} inferior detach is still pending after the process exited.`
				};
				const detachOutcome = detachOutcomes.get(session);
				if (detachOutcome === "unconfirmed" || detachOutcome === undefined && session.inferiorStateUnknown?.() === true) {
					try {
						if (await session.verifyInferiorsEndedAfterExit?.() !== true) return {
							status: "incomplete",
							code: "inferior-disposition-unverified",
							reason: `Owned ${debuggerName} inferior disposition was not verified before the debugger exited, and no owner proof confirms the identified inferior processes have ended.`
						};
						detachOutcomes.set(session, "inferior-ended");
					} catch (cause) {
						return {
							status: "incomplete",
							code: "inferior-identity-unverified",
							reason: `Owned ${debuggerName} inferior process identity could not be verified after debugger exit: ${errorMessage(cause)}`
						};
					}
				}
				return finishExitedDebuggerSession(session, debuggerName, platform, "already_exited");
			}
			if (platform === "win32") return {
				status: "incomplete",
				code: "windows-stop-unsafe",
				reason: `Owned ${debuggerName} process cannot be stopped safely on Windows because job termination can also terminate its inferior processes.`
			};
			if (detachOutcomes.get(session) !== "confirmed") {
				try {
					if (session.detachInferior === undefined) {
						detachOutcomes.set(session, "unconfirmed");
						return {
							status: "incomplete",
							code: "detach-unsupported",
							reason: `Owned ${debuggerName} inferior detach cannot be verified because the provider has no detach capability.`
						};
					}
					const detached = await waitForInferiorDetach(session, session.detachInferior);
					if (detached === undefined) return {
						status: "incomplete",
						code: "detach-timeout",
						reason: `Owned ${debuggerName} inferior detach was not verified within ${String(DETACH_TIMEOUT_MS)} ms. This release has no runtime override.`
					};
					if (!isVerifiedDetachResult(detached)) {
						detachOutcomes.set(session, "unconfirmed");
						return {
							status: "incomplete",
							code: "detach-unconfirmed",
							reason: `Owned ${debuggerName} provider did not confirm no inferior or detachment with a durable output sink.`
						};
					}
					detachOutcomes.set(session, "confirmed");
				} catch (cause) {
					return {
						status: "incomplete",
						code: cause instanceof OwnedDebuggerDetachFailure ? cause.code : "detach-failed",
						reason: `Owned ${debuggerName} inferior detach could not be verified: ${errorMessage(cause)}`
					};
				}
			}
			session.launched.process.kill("SIGTERM");
			if (!await session.supervisor.waitForExit(300)) {
				session.launched.process.kill("SIGKILL");
				const exitedAfterKill = await session.supervisor.waitForExit(1e3);
				if (exitedAfterKill) return finishExitedDebuggerSession(session, debuggerName, platform, "stopped");
				return {
					status: "incomplete",
					code: "process-did-not-exit",
					reason: `Owned ${debuggerName} process did not exit after direct termination.`
				};
			}
			return finishExitedDebuggerSession(session, debuggerName, platform, "stopped");
		};
		closeOwnedDebuggerSessions = async (sessions, stop, debuggerName) => {
			const entries = [...sessions.entries()];
			for (const [, session] of entries) session.supervisor.ref();
			const results = await Promise.allSettled(entries.map(async ([, session]) => stop(session)));
			const failures = [];
			const retained = [];
			for (const [index, settled] of results.entries()) {
				const [key, session] = entries[index];
				if (settled.status === "rejected") {
					failures.push(settled.reason instanceof Error ? settled.reason : new Error(String(settled.reason)));
					retained.push(session);
				} else if (settled.value.status === "incomplete") {
					failures.push(new OwnedDebuggerStopFailure(settled.value));
					retained.push(session);
				} else if (sessions.get(key) === session) sessions.delete(key);
			}
			if (failures.length === 0) return;
			for (const session of retained) session.supervisor.unref();
			throw new OwnedDebuggerCleanupError(failures, `One or more owned ${debuggerName} processes did not stop cleanly`, retained.flatMap(({ launched }) => launched.process.pid ?? []));
		};
	})))();
}

//#endregion
//#region dist/process/OwnedDebuggerSessionRegistry.js
var OwnedDebuggerSessionRegistry, cancelledWithCallerReason;
function init_OwnedDebuggerSessionRegistry() {
	return (init_OwnedDebuggerSessionRegistry = __esmMin((() => {
		init_analysisErrorCleanup();
		init_result();
		init_analysisCleanupRelease();
		init_analysisErrorCore();
		init_ownedDebuggerSession();
		init_errorMessage();
		OwnedDebuggerSessionRegistry = class {
			#options;
			#sessions = new Map();
			/**
			* Each session's unconfirmed stop: the release its retained failures read,
			* and the latest of them.
			*/
			#cleanupFailures = new WeakMap();
			#stopAttempts = new WeakMap();
			#reservations = 0;
			/** In-flight starts; closing aborts each as owner-closed and awaits it. */
			#starts = new Map();
			/** Set once closing begins; later starts are refused as owner-closed. */
			#closed = false;
			constructor(options) {
				this.#options = options;
			}
			get(id) {
				return this.#sessions.get(id);
			}
			has(id) {
				return this.#sessions.has(id);
			}
			values() {
				return this.#sessions.values();
			}
			/** Publish a started session under its ID. */
			add(session) {
				this.#sessions.set(session.id, session);
			}
			/** Forget a session whose owned cleanup completed; a replacement is kept. */
			remove(session) {
				if (this.#sessions.get(session.id) === session) this.#sessions.delete(session.id);
			}
			/** Published sessions plus starts holding a reservation. */
			occupied() {
				return this.#sessions.size + this.#reservations;
			}
			/** Reserve one capacity slot for a start; the release is idempotent. */
			reserve() {
				this.#reservations += 1;
				let held = true;
				return () => {
					if (!held) return;
					held = false;
					this.#reservations -= 1;
				};
			}
			/**
			* Run one session start that closing aborts as owner-closed. A start made
			* after closing began is refused the same way, and a caller that already
			* aborted gets its own reason. The caller's abort is relayed; when it came
			* first, a cancellation reports the caller's reason. Register before
			* awaiting, so a close cannot miss it.
			*/
			start(operation, callerSignal, run) {
				if (callerSignal?.aborted) return Promise.resolve(err(cancelledWithCallerReason(operation, callerSignal)));
				if (this.#closed) return Promise.resolve(err(cancelledBy(operation, OwnerCancellation.ownerClosed)));
				const controller = new AbortController();
				let callerAbortWon = false;
				const relayAbort = () => {
					if (controller.signal.aborted) return;
					callerAbortWon = true;
					controller.abort(callerSignal?.reason);
				};
				callerSignal?.addEventListener("abort", relayAbort, { once: true });
				if (callerSignal?.aborted) relayAbort();
				const started = Promise.resolve().then(() => run(controller.signal)).finally(() => {
					callerSignal?.removeEventListener("abort", relayAbort);
					this.#starts.delete(controller);
				});
				this.#starts.set(controller, started);
				return started.then((result) => !result.ok && result.error instanceof AnalysisCancelledError && callerAbortWon && callerSignal !== undefined ? err(cancelledWithCallerReason(operation, callerSignal, result.error)) : result);
			}
			/**
			* Refuse new starts, abort every in-flight start as owner-closed and wait
			* for each to settle.
			*/
			async closeStarts() {
				this.#closed = true;
				const active = [...this.#starts.entries()];
				for (const [controller] of active) controller.abort(OwnerCancellation.ownerClosed);
				await Promise.allSettled(active.map(([, start]) => start));
			}
			/** Whether a stop of this session is in flight. */
			stopping(session) {
				return this.#stopAttempts.has(session);
			}
			/**
			* Stop the owned debugger process, sharing one attempt between concurrent
			* callers. A confirmed stop resolves every retained cleanup failure.
			*/
			stop(session) {
				this.#options.sealSession(session);
				const active = this.#stopAttempts.get(session);
				if (active !== undefined) return active;
				const attempt = Promise.resolve().then(() => this.#options.stopProcess(session)).catch((cause) => ({
					status: "incomplete",
					code: "stop-failed",
					reason: `${this.#options.stopFailurePrefix}: ${errorMessage(cause)}`
				})).then((stopped) => {
					if (stopped.status !== "incomplete") {
						this.#cleanupFailures.get(session)?.release.confirm();
						this.#cleanupFailures.delete(session);
					}
					return stopped;
				}).finally(() => {
					if (this.#stopAttempts.get(session) === attempt) this.#stopAttempts.delete(session);
				});
				this.#stopAttempts.set(session, attempt);
				return attempt;
			}
			/** Keep a failure whose cleanup is incomplete until a stop is confirmed. */
			retain(session, failure) {
				const retained = this.#cleanupFailures.get(session) ?? {
					release: new AnalysisCleanupRelease(),
					latest: failure
				};
				retained.latest = failure;
				this.#cleanupFailures.set(session, retained);
				return retained.release.bind(failure);
			}
			/** Retain the failure of an operation that could not confirm the stop. */
			retainCleanupFailure(session, operation, stopped, options = {}) {
				return this.retain(session, retainedDebuggerCleanupFailure({
					provider: this.#options.provider,
					displayName: this.#options.displayName
				}, operation, stopped, [session.id], options));
			}
			/**
			* Stop each session that retains a cleanup failure. A session that stops
			* is forgotten unless `keepAddressable` holds: the caller still holds a
			* published session's ID, so status keeps reporting why it stopped until
			* it is closed.
			*/
			async retryCleanupFailures(keepAddressable) {
				for (const session of this.#sessions.values()) {
					const retained = this.#cleanupFailures.get(session);
					if (retained === undefined) continue;
					const stopped = await this.stop(session);
					if (stopped.status === "incomplete") return err(retained.latest);
					if (!keepAddressable(session)) this.remove(session);
				}
				return ok(null);
			}
			/**
			* Stop every session; sessions whose stop is incomplete stay registered for
			* retry. Callers close starts first.
			*/
			closeAll() {
				return closeOwnedDebuggerSessions(this.#sessions, (session) => this.stop(session), this.#options.displayName);
			}
		};
		cancelledWithCallerReason = (operation, signal, previous) => {
			const cancellation = cancelledBy(operation, signal, {
				cleanupPrimary: previous,
				...previous?.diagnostics === undefined ? {} : { diagnostics: previous.diagnostics },
				...previous?.capturedOutput === undefined ? {} : { capturedOutput: previous.capturedOutput },
				...previous?.cleanup === undefined ? {} : { cleanup: previous.cleanup },
				...previous?.partialObservation === undefined ? {} : { partialObservation: previous.partialObservation }
			});
			return previous === undefined ? cancellation : withInheritedCleanupOwnership(cancellation, previous);
		};
	})))();
}

//#endregion
//#region dist/gdb/GdbSessionManager.js
var STARTUP_TIMEOUT_MS$1, copiedTimeoutGuidance, gdbLaunchUnavailable, MAX_COMMAND_OUTPUT_RECORDS, MAX_MI_LINE_BYTES, MAX_RECENT_MI_LINE_BYTES, MAX_DIAGNOSTIC_BYTES$1, RECENT_RECORD_TRUNCATION_MARKER, gdbRetainedOutputLimitations, gdbOutputCapture, GdbCommandTimeoutError, truncateUtf8RecordPrefix, containsResultNamed, gdbThreadGroupPids, verifyGdbInferiorOutputSink, GdbCommandProcessExitError, GdbProtocolFailureError, gdbSessionSubject, createGdbSessionEvidence, gdbCloseUnavailable, GdbSessionManager, miQuote, miStringField, GDB_BUILTIN_ALIASES, gdbCommandWord, gdbOneShotCommandMayInvalidateDetachProof, commandMayChangeInferiorOutput, waitForGdbCommandTurn;
function init_GdbSessionManager() {
	return (init_GdbSessionManager = __esmMin((() => {
		init_targetIdentity();
		init_capturedProviderOutput();
		init_DebuggerLaunchFile();
		init_callerPath();
		init_resources();
		init_analysisErrorCleanup();
		init_GdbMiRecord();
		init_GdbProviderIdentity();
		init_PersistentDebuggerHost();
		init_HostPlatform();
		init_AbortablePromise();
		init_launchFailure();
		init_classifyProviderOutcome();
		init_GdbCommandRecords();
		init_analysisErrorCore();
		init_debuggerSessionErrors();
		init_analysisErrorBase();
		init_evidence();
		init_analysisOperationSnapshot();
		init_result();
		init_runtimeAnalysisSettings();
		init_ProviderProcess();
		init_debuggerSessionLimits();
		init_ownedDebuggerSession();
		init_OwnedDebuggerSessionRegistry();
		init_utf8HeadExcerpt();
		init_errorMessage();
		STARTUP_TIMEOUT_MS$1 = 1e4;
		copiedTimeoutGuidance = (cause) => ({
			...cause.userMessage === undefined ? {} : { userMessage: cause.userMessage },
			...cause.remediationAction === undefined ? {} : { remediationAction: cause.remediationAction },
			...cause.diagnostics === undefined ? {} : { diagnostics: cause.diagnostics },
			...cause.limit === undefined ? {} : { limit: cause.limit }
		});
		gdbLaunchUnavailable = (command, failure, details) => {
			const reason = `Could not launch the selected GDB executable ${JSON.stringify(command)} (${describeLaunchFailure(failure)}).`;
			return new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", reason, {
				...details,
				userMessage: reason,
				remediationAction: "Set REA_GDB_COMMAND to an installed executable GDB command, or make that command available on PATH. Check execute permission on the command and search permission on its parent directories before retrying."
			});
		};
		MAX_COMMAND_OUTPUT_RECORDS = 16384;
		MAX_MI_LINE_BYTES = 16 * 1024 * 1024;
		MAX_RECENT_MI_LINE_BYTES = 64 * 1024;
		MAX_DIAGNOSTIC_BYTES$1 = 64 * 1024;
		RECENT_RECORD_TRUNCATION_MARKER = "[recent record truncated]";
		gdbRetainedOutputLimitations = (result, output) => (result.output_limits ?? []).map((limit) => {
			switch (limit.kind) {
				case "command_bytes": return `Retained MI records reached the ${String(limit.maximum)} byte command-output cap. ${debuggerAdmissionRecovery(output)} Retained output is partial.`;
				case "command_records": return `Retained MI records reached the ${String(limit.maximum)} record cap. This release has no runtime override for that count; REA_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES does not raise it. Narrow the command's output on the next call. Retained output is partial.`;
				case "mi_line_bytes": return `GDB emitted a stream record exceeding the ${String(limit.maximum)} byte MI line limit; that record was dropped. This release has no runtime override for that protocol limit; REA_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES does not raise it. Select a command that emits smaller records on the next call. Retained output is partial.`;
			}
		});
		gdbOutputCapture = (pending) => ({
			output_truncated: pending.outputLimits.size > 0,
			...pending.outputLimits.size === 0 ? {} : { output_limits: [...pending.outputLimits].map((kind) => ({
				kind,
				maximum: kind === "command_bytes" ? pending.outputBudgetBytes : kind === "command_records" ? MAX_COMMAND_OUTPUT_RECORDS : MAX_MI_LINE_BYTES
			})) }
		});
		GdbCommandTimeoutError = class extends AnalysisTimeoutError {
			partial;
			evidence;
			constructor(partial, evidence, deadline) {
				super("gdb_console", deadline.value, { ...configurableDeadlineGuidance("The GDB MI command", deadline) });
				this.partial = partial;
				this.evidence = evidence;
			}
		};
		truncateUtf8RecordPrefix = (line) => {
			const budget = MAX_RECENT_MI_LINE_BYTES - Buffer.byteLength(RECENT_RECORD_TRUNCATION_MARKER, "utf8");
			return `${utf8HeadExcerpt(line, budget).text}${RECENT_RECORD_TRUNCATION_MARKER}`;
		};
		containsResultNamed = (value, name) => {
			switch (value.kind) {
				case "const": return false;
				case "list": return value.values.some((item) => containsResultNamed(item, name));
				case "tuple":
				case "result-list": return value.results.some((result) => result.name === name || containsResultNamed(result.value, name));
			}
		};
		gdbThreadGroupPids = (mi) => {
			const parsed = parseGdbMiResultRecord(mi);
			if (!parsed.ok || parsed.value.resultClass !== "done") return undefined;
			const groupsValues = gdbMiResultsNamed(parsed.value.results, "groups");
			const groups = groupsValues[0];
			if (groupsValues.length !== 1 || groups?.kind !== "list") return undefined;
			const pids = [];
			for (const group of groups.values) {
				if (group.kind !== "tuple") return undefined;
				const ids = gdbMiResultsNamed(group.results, "id");
				if (ids.length !== 1 || ids[0]?.kind !== "const") return undefined;
				if (containsResultNamed(group, "groups")) return undefined;
				const pidValues = gdbMiResultsNamed(group.results, "pid");
				if (pidValues.length === 0) continue;
				const pid = pidValues.length === 1 && pidValues[0] !== undefined ? gdbMiConstText(pidValues[0]) : undefined;
				if (pid === undefined || !/^[1-9]\d*$/u.test(pid)) return undefined;
				pids.push(pid);
			}
			return pids;
		};
		verifyGdbInferiorOutputSink = async (pid, selectedTty, rememberIdentity) => {
			if (HOST_PLATFORM.platform !== "linux") throw new Error("GDB cannot confirm live inferior output descriptors outside Linux /proc.");
			const before = await readLinuxProcessStartTime(pid);
			if (before === null) throw new Error("GDB could not establish the live inferior identity.");
			const ttyPath = await realpath(selectedTty);
			const tty = await stat(ttyPath);
			if ((tty.mode & constants.S_IFMT) !== constants.S_IFCHR) throw new Error("The selected GDB output sink is not a character device.");
			for (const descriptor of ["1", "2"]) {
				const descriptorPath = `/proc/${pid}/fd/${descriptor}`;
				const destination = await readlink(descriptorPath);
				const observed = await stat(descriptorPath);
				if (observed.dev !== tty.dev || observed.ino !== tty.ino || (observed.mode & constants.S_IFMT) !== constants.S_IFCHR || await realpath(destination) !== ttyPath) throw new Error(`GDB inferior descriptor ${descriptor} no longer points to the selected TTY.`);
			}
			const after = await readLinuxProcessStartTime(pid);
			if (after !== before) throw new Error("The GDB inferior identity changed during descriptor readback.");
			rememberIdentity({
				pid,
				startTime: before
			});
		};
		GdbCommandProcessExitError = class extends Error {
			partial;
			constructor(partial) {
				super(`GDB exited before returning the active MI command result (exit code ${String(partial.process_exit_code)}, signal ${String(partial.process_exit_signal)}).`);
				this.partial = partial;
			}
		};
		GdbProtocolFailureError = class extends Error {
			partial;
			constructor(message, partial) {
				super(message);
				this.partial = partial;
			}
		};
		gdbSessionSubject = (session) => ({
			kind: "session",
			session_kind: "gdb",
			id: session.id,
			target: session.launchFile.identity
		});
		createGdbSessionEvidence = (session, observation) => {
			const { provenance, unobservedReason } = session.launchFile;
			const withAuthority = {
				...observation,
				authority: observation.authority ?? "controlled-replay"
			};
			return createEvidence(gdbSessionSubject(session), session.provider, provenance === undefined ? withAuthority : {
				...withAuthority,
				parameters: {
					...observation.parameters,
					launch_provenance: { ...provenance }
				},
				limitations: [
					"The session target is the initial file selected and hashed before loading; later debugger commands do not rebind it or establish the current inferior's identity.",
					...unobservedReason === undefined ? [] : [`The launch file could not be hashed at session start, so the session target is unknown: ${unobservedReason}`],
					...observation.limitations ?? []
				]
			});
		};
		gdbCloseUnavailable = () => unknownDebuggerSessionError(GDB_SESSION_TOOLS, "close_gdb_session");
		GdbSessionManager = class {
			#startupResources = new ArtifactResourceScope();
			#sessions;
			#command;
			#environment;
			#launchCommandDeadline;
			#startupTimeoutMs;
			#platform;
			#spawnProcess;
			#verifyInferiorOutputSink;
			#readInferiorProcessStartTime;
			#maxSessions;
			#maxPendingCommands;
			#launchCommandOutput;
			get #commandDeadline() {
				const override = currentAnalysisOperationSnapshot()?.overrides["debugger.command_deadline_ms"];
				if (override !== undefined) return {
					...this.#launchCommandDeadline,
					value: override,
					source: "runtime"
				};
				const parsed = parseDebuggerCommandDeadline(this.#environment);
				if (!parsed.ok) throw parsed.error;
				return parsed.value;
			}
			get #commandOutput() {
				const override = currentAnalysisOperationSnapshot()?.overrides["debugger.max_command_output_bytes"];
				if (override !== undefined) return {
					...this.#launchCommandOutput,
					value: override,
					source: "runtime"
				};
				const parsed = parseDebuggerCommandOutput(this.#environment);
				if (!parsed.ok) throw parsed.error;
				return parsed.value;
			}
			#closing = false;
			#closePromise;
			constructor(options = {}) {
				this.#environment = { ...options.environment ?? process.env };
				this.#command = this.#environment.REA_GDB_COMMAND ?? "gdb";
				const limits = debuggerConstructionLimits(this.#environment);
				this.#launchCommandDeadline = limits.commandDeadline;
				this.#startupTimeoutMs = options.startupTimeoutMs ?? STARTUP_TIMEOUT_MS$1;
				this.#platform = options.platform ?? HOST_PLATFORM.platform;
				const stopProcess = options.stopProcess ?? stopOwnedDebuggerProcess;
				this.#sessions = new OwnedDebuggerSessionRegistry({
					provider: "gdb",
					displayName: "GDB",
					sealSession: (session) => {
						session.cleanupStarted = true;
					},
					stopProcess: (session) => stopProcess(session, "GDB"),
					stopFailurePrefix: "Owned GDB shutdown failed"
				});
				this.#spawnProcess = options.spawnProcess ?? spawnOwnedProviderProcess;
				this.#verifyInferiorOutputSink = options.verifyInferiorOutputSink ?? verifyGdbInferiorOutputSink;
				this.#readInferiorProcessStartTime = options.readInferiorProcessStartTime;
				this.#maxSessions = limits.maxSessions;
				this.#maxPendingCommands = limits.maxPendingCommands;
				this.#launchCommandOutput = limits.maxCommandOutputBytes;
			}
			async start(signal, options = {}) {
				if (options.executable !== undefined && (options.executable.length === 0 || options.executable.includes("\0"))) return err(new AnalysisInputError("start_gdb_session", undefined, [{
					path: ["executable"],
					reason: "invalid_value",
					message: "The executable path must be non-empty and must not contain NUL."
				}]));
				if (options.inferiorTty !== undefined && (options.inferiorTty.length === 0 || options.inferiorTty.includes("\0"))) return err(new AnalysisInputError("start_gdb_session", undefined, [{
					path: ["inferior_tty"],
					reason: "invalid_value",
					message: "The inferior TTY path must be non-empty and must not contain NUL."
				}]));
				return this.#sessions.start("start_gdb_session", signal, (started) => this.#startWithReservation(started, options));
			}
			async #startWithReservation(signal, options = {}) {
				if (signal?.aborted) return err(cancelledBy("start_gdb_session", signal));
				if (!persistentDebuggerHostSupported(this.#platform)) return err(new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", this.#platform === "win32" ? "Persistent Windows GDB sessions are unavailable because owned Job Object cleanup can terminate debugger inferiors." : "Persistent GDB sessions are available only on Linux because REA verifies live inferior output descriptors through /proc."));
				const files = await this.#retryStartupFileCleanup();
				if (!files.ok) return files;
				const occupied = this.#sessions.occupied();
				if (occupied >= this.#maxSessions.value) return err(debuggerResourceConstraintError("start_gdb_session", "memory", `GDB session capacity reached (${String(this.#maxSessions.value)} sessions).`, "Close a GDB session before starting another; a stopped session that gdb_session_status reports closed still holds its slot until close_gdb_session releases it.", this.#maxSessions, {
					max_sessions: this.#maxSessions.value,
					active_or_reserved_sessions: occupied
				}));
				const releaseReservation = this.#sessions.reserve();
				try {
					return await this.#startReserved(releaseReservation, signal, options);
				} finally {
					releaseReservation();
				}
			}
			async #startReserved(releaseReservation, signal, options = {}) {
				let launchFile = { identity: unknownTarget("not-observed") };
				if (options.executable !== undefined) {
					const resolved = absoluteCallerPath(options.executable);
					const observed = await observeDebuggerLaunchFile(resolved, {
						provider: "gdb",
						operation: "start_gdb_session",
						resources: this.#startupResources,
						signal
					});
					if (!observed.ok) return observed;
					launchFile = {
						...observed.value,
						provenance: {
							caller_selected_path: options.executable,
							resolved_path: resolved
						}
					};
				}
				if (signal.aborted) return err(cancelledBy("start_gdb_session", signal));
				const id = randomUUID();
				const mi3 = await this.#startProtocol(id, "mi3", releaseReservation, signal, options, launchFile);
				if (mi3.ok) return mi3;
				if (signal.aborted || this.#sessions.has(id) || !mi3.error.retryDialect) return err(mi3.error.error);
				const mi2 = await this.#startProtocol(id, "mi2", releaseReservation, signal, options, launchFile);
				return mi2.ok ? mi2 : err(mi2.error.error);
			}
			async #startProtocol(id, miVersion, releaseReservation, signal, options, launchFile) {
				const { inferiorTty } = options;
				let loadAttempted = false;
				const failed = (error, retryDialect = !loadAttempted) => err({
					error,
					retryDialect
				});
				let launched;
				try {
					const spawnOptions = {
						command: this.#command,
						arguments: [
							"--nx",
							"--quiet",
							`--interpreter=${miVersion}`
						],
						runId: randomUUID(),
						stdin: "pipe",
						hostEnvironment: this.#environment,
						signal
					};
					launched = await this.#spawnProcess(spawnOptions);
				} catch (cause) {
					if (signal?.aborted && cause === signal.reason || cause instanceof AnalysisCancelledError) return failed(cancelledBy("start_gdb_session", carriedReason(cause)));
					const launch = launcherFailureOf(cause);
					if (launch !== undefined) {
						const command = this.#command;
						const failure = classifyLaunchFailure(launch, {
							providerId: "gdb",
							operation: "start_gdb_session",
							command,
							fixedArguments: true,
							selection: "REA_GDB_COMMAND",
							details: { cause },
							unavailable: (unavailable, details) => gdbLaunchUnavailable(command, unavailable, details)
						});
						return failed(failure, false);
					}
					return failed(new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", cause instanceof Error ? cause.message : "Unable to start GDB", { cause }));
				}
				const supervisor = new ProviderProcessSupervisor({
					process: launched.process,
					ownsProcessLifetime: false
				}, {
					captureStdout: false,
					maxDiagnosticBytes: MAX_DIAGNOSTIC_BYTES$1
				});
				let settleStdout;
				const stdoutSettled = new Promise((resolve) => {
					settleStdout = resolve;
				});
				const session = {
					id,
					launchFile,
					miVersion,
					provider: GDB_PROVIDER_IDENTITY,
					launched,
					supervisor,
					detachInferior: () => this.#detachInferior(session),
					inferiorStateUnknown: () => !session.noInferiorVerified,
					verifyInferiorsEndedAfterExit: async () => {
						const ended = await verifyOwnedInferiorsEnded(session.knownInferiorIdentities.values(), this.#readInferiorProcessStartTime);
						if (ended) session.knownInferiorIdentities.clear();
						return ended;
					},
					knownInferiorIdentities: new Map(),
					inferiorTty,
					stdoutSettled,
					settleStdout,
					inferiorTtyVerified: false,
					noInferiorVerified: true,
					cleanupStarted: false,
					closeRequested: false,
					pending: new Map(),
					lines: [],
					bufferChunks: [],
					bufferTail: undefined,
					bufferTailBytes: 0,
					bufferBytes: 0,
					discardingOversizedStreamRecord: false,
					invalidUtf8Observed: false,
					promptTail: "",
					ready: false,
					exited: false,
					exitCode: null,
					exitSignal: null,
					nextToken: 1,
					startupResolve: undefined,
					startupReject: undefined,
					commandTail: Promise.resolve(),
					pendingCommandCount: 0,
					protocolError: undefined,
					recentRecordsTruncated: false
				};
				launched.process.stdout?.on("data", (chunk) => this.#receive(session, typeof chunk === "string" ? Buffer.from(chunk, "utf8") : chunk));
				if (launched.process.stdout === null) settleStdout();
				else launched.process.stdout.once("end", settleStdout);
				launched.process.stdin?.on("error", (cause) => this.#failProtocol(session, "input-stream-failure", `GDB stdin stream failed: ${cause.message}`));
				launched.process.stdin?.once("close", () => this.#failProtocol(session, "input-stream-failure", "GDB stdin stream closed unexpectedly."));
				launched.process.once("exit", (code, signalCode) => {
					session.exited = true;
					session.exitCode = code;
					session.exitSignal = signalCode;
					void this.#waitForStdoutSettlement(session).then(() => session.startupReject?.(new Error(`GDB exited during startup (exit code ${String(code)}, signal ${String(signalCode)}).`)));
					void this.#settleExitedCommands(session, code, signalCode);
				});
				let startupTimer;
				let startupAbortListener;
				try {
					await new Promise((resolve, reject) => {
						session.startupResolve = resolve;
						session.startupReject = reject;
						startupAbortListener = () => reject(cancelledBy("start_gdb_session", signal));
						signal?.addEventListener("abort", startupAbortListener, { once: true });
						if (signal?.aborted) startupAbortListener();
						startupTimer = setTimeout(() => reject(new AnalysisTimeoutError("start_gdb_session", this.#startupTimeoutMs, {
							cause: new Error("GDB did not emit the MI prompt before the startup deadline"),
							...fixedDeadlineGuidance("GDB startup", this.#startupTimeoutMs)
						})), this.#startupTimeoutMs);
						startupTimer.unref();
					});
					if (signal?.aborted) throw cancelledBy("start_gdb_session", signal);
					const reported = await this.#request(session, "-gdb-version", signal, "start_gdb_session");
					if (reported.completion_status === "complete" && !reported.output_truncated && reported.output_invalid_utf8 !== true && parseGdbMiDoneRecord(reported.mi).ok) session.provider = {
						...GDB_PROVIDER_IDENTITY,
						version: gdbReportedVersion(reported.records)
					};
					const autoLoad = await this.#request(session, "-gdb-set auto-load off", signal, "start_gdb_session");
					if (!parseGdbMiDoneRecord(autoLoad.mi).ok) {
						throw new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", `GDB rejected the required automatic-loading disable command (${autoLoad.mi}); the session was not started.`);
					}
					if (inferiorTty !== undefined) {
						const configured = await this.#request(session, `-inferior-tty-set ${miQuote(inferiorTty)}`, signal, "start_gdb_session");
						if (configured.completion_status !== "complete" || configured.output_truncated || !parseGdbMiDoneRecord(configured.mi).ok) throw new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", "GDB did not confirm the inferior TTY configuration.");
						const observed = await this.#request(session, "-inferior-tty-show", signal, "start_gdb_session");
						const reportedTty = observed.completion_status === "complete" && !observed.output_truncated ? miStringField(observed.mi, "inferior_tty_terminal") : undefined;
						if (!parseGdbMiDoneRecord(observed.mi).ok || reportedTty !== inferiorTty) throw new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", "GDB did not report the exact caller-selected inferior TTY after configuration.");
						session.inferiorTtyVerified = true;
					}
					if (launchFile.provenance !== undefined) {
						loadAttempted = true;
						const loaded = await this.#request(session, `-file-exec-and-symbols ${miQuote(launchFile.provenance.resolved_path)}`, signal, "start_gdb_session");
						if (loaded.completion_status !== "complete" || loaded.output_truncated || !parseGdbMiDoneRecord(loaded.mi).ok) throw new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", `GDB did not confirm loading the selected executable (${loaded.mi}). Check the selected file and GDB's load diagnostic before retrying start_gdb_session.`);
					}
					if (signal?.aborted) throw cancelledBy("start_gdb_session", signal);
					await new Promise((resolve) => setImmediate(resolve));
					if (signal?.aborted) throw cancelledBy("start_gdb_session", signal);
					if (session.exited || session.protocolError !== undefined) throw new Error(session.protocolError?.reason ?? "GDB exited during startup readiness.");
					session.ready = true;
					session.noInferiorVerified = false;
					this.#sessions.add(session);
					releaseReservation();
					return ok({
						session_id: id,
						mi_version: miVersion
					});
				} catch (cause) {
					const startupExited = cause instanceof GdbCommandProcessExitError || session.exited;
					const processExit = cause instanceof GdbCommandProcessExitError ? cause.partial : startupExited ? {
						command: "GDB startup",
						mi: "",
						...snapshotGdbCommandRecords(session.lines),
						process_exit_observed: true,
						process_exit_code: session.exitCode,
						process_exit_signal: session.exitSignal,
						output_truncated: session.recentRecordsTruncated,
						completion_status: "unknown"
					} : undefined;
					const startupEvidenceResult = processExit ?? (session.lines.length > 0 ? {
						command: "GDB startup",
						mi: "",
						...snapshotGdbCommandRecords(session.lines),
						output_truncated: session.recentRecordsTruncated,
						completion_status: "unknown"
					} : undefined);
					const startupEvidencePayload = startupEvidenceResult === undefined ? undefined : {
						...startupEvidenceResult,
						...session.invalidUtf8Observed ? { output_invalid_utf8: true } : {}
					};
					const startupEvidence = startupEvidencePayload === undefined ? undefined : createGdbSessionEvidence(session, {
						predicateType: "rea.debugger.startup-observation",
						operation: "start_gdb_session",
						parameters: {
							mi_version: miVersion,
							command: startupEvidencePayload.command
						},
						result: {
							...startupEvidencePayload,
							records: [...startupEvidencePayload.records]
						},
						rawResult: {
							...startupEvidencePayload,
							records: [...startupEvidencePayload.records]
						},
						limitations: [
							"No usable debugger session became ready during GDB startup.",
							"GDB startup failed before a usable session could be established; captured startup records are incomplete.",
							...session.invalidUtf8Observed ? ["GDB startup output contained invalid UTF-8 bytes; decoded records contain replacement characters."] : []
						]
					});
					const capturedOutput = capturedProviderOutput(session.supervisor.snapshot());
					const stopped = await this.#stopDebuggerOnly(session);
					if (stopped.status === "incomplete") {
						this.#sessions.add(session);
						releaseReservation();
						const cleanupFailure = this.#sessions.retainCleanupFailure(session, "start_gdb_session", stopped, { cause });
						const retainCleanup = (failure) => failure.bindCleanupDependencies([cleanupFailure], { cleanupResources: [session.id] });
						const { cleanup, diagnostics } = incompleteStopFacts(stopped, [session.id]);
						const detailsWithoutCause = {
							capturedOutput,
							cleanup,
							diagnostics,
							...startupEvidence === undefined ? {} : { partialObservation: startupEvidence }
						};
						const details = {
							cause,
							...detailsWithoutCause
						};
						if (cause instanceof AnalysisTimeoutError) return failed(retainCleanup(new AnalysisTimeoutError(cause.operation, cause.timeoutMs, {
							...details,
							...copiedTimeoutGuidance(cause)
						})));
						if (cause instanceof AnalysisCancelledError) return failed(retainCleanup(cancelledBy(cause.operation, carriedReason(cause), detailsWithoutCause)));
						const startupFailureMessage = errorMessage(cause);
						return failed(retainCleanup(new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", `GDB startup failed (${startupFailureMessage}) and its owned process could not be confirmed stopped: ${stopped.reason}`, session.protocolError === undefined ? details : {
							...details,
							diagnostics: {
								...diagnostics,
								session_stop: session.protocolError.code
							}
						})));
					}
					const errorDetailsWithoutCause = {
						capturedOutput,
						...startupEvidence === undefined ? {} : { partialObservation: startupEvidence }
					};
					const errorDetails = {
						cause,
						...errorDetailsWithoutCause
					};
					const error = cause instanceof AnalysisCancelledError ? cancelledBy("start_gdb_session", carriedReason(cause), errorDetailsWithoutCause) : cause instanceof AnalysisTimeoutError ? new AnalysisTimeoutError(cause instanceof GdbCommandTimeoutError ? "start_gdb_session" : cause.operation, cause.timeoutMs, {
						...errorDetails,
						...copiedTimeoutGuidance(cause)
					}) : cause instanceof AnalysisCapabilityUnavailableError ? new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", cause.message, errorDetails) : session.protocolError !== undefined ? new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", session.protocolError.reason, {
						...errorDetails,
						diagnostics: { session_stop: session.protocolError.code }
					}) : new AnalysisCapabilityUnavailableError("gdb", "start_gdb_session", `GDB startup failed (${errorMessage(cause)}).`, errorDetails);
					return failed(error);
				} finally {
					clearTimeout(startupTimer);
					signal?.removeEventListener("abort", startupAbortListener);
				}
			}
			async execute(sessionId, command, signal) {
				const session = this.#sessions.get(sessionId);
				if (session === undefined) return err(unknownDebuggerSessionError(GDB_SESSION_TOOLS, "gdb_console"));
				const stopped = this.#stopReason(session);
				if (stopped !== undefined) return err(stoppedDebuggerSessionError(GDB_SESSION_TOOLS, "gdb_console", stopped));
				if (signal?.aborted) return err(cancelledWithCallerReason("gdb_console", signal));
				try {
					const completed = await this.#serialize(session, async () => {
						const stoppedWhileQueued = this.#stopReason(session);
						if (stoppedWhileQueued !== undefined) return err(stoppedDebuggerSessionError(GDB_SESSION_TOOLS, "gdb_console", stoppedWhileQueued));
						session.noInferiorVerified = false;
						session.knownInferiorIdentities.clear();
						if (commandMayChangeInferiorOutput(command)) session.inferiorTtyVerified = false;
						const accepted = readRuntimeSetting(() => ({
							deadline: this.#commandDeadline,
							output: this.#commandOutput
						}));
						if (!accepted.ok) return accepted;
						const { deadline: acceptedDeadline, output: acceptedOutput } = accepted.value;
						try {
							const result = await this.#request(session, `-interpreter-exec console ${miQuote(command)}`, signal, "gdb_console", command, accepted.value);
							const evidence = createGdbSessionEvidence(session, {
								predicateType: "rea.debugger.console-observation",
								operation: "gdb_console",
								parameters: {
									session_id: sessionId,
									command
								},
								result: {
									command,
									mi: result.mi,
									records: [...result.records],
									console: result.console,
									target: result.target,
									log: result.log,
									output_truncated: result.output_truncated,
									...result.output_limits === undefined ? {} : { output_limits: result.output_limits },
									...result.output_invalid_utf8 ? { output_invalid_utf8: true } : {},
									completion_status: result.completion_status
								},
								rawResult: {
									command,
									mi: result.mi,
									records: [...result.records],
									console: result.console,
									target: result.target,
									log: result.log,
									output_truncated: result.output_truncated,
									...result.output_limits === undefined ? {} : { output_limits: result.output_limits },
									...result.output_invalid_utf8 ? { output_invalid_utf8: true } : {},
									completion_status: result.completion_status
								},
								limitations: [
									"The active GDB inferior identity is not established by the debugger session identifier.",
									...result.mi.length === 0 ? ["A separately tokenized read-only query confirmed return to GDB's command loop. The original result record could not be framed independently from raw stdout; its bytes remain in records and its result class is unknown."] : [],
									"MI records are returned as decoded text; their semantics depend on GDB version and target.",
									...gdbRetainedOutputLimitations(result, acceptedOutput),
									...result.output_invalid_utf8 ? ["MI stream bytes were not valid UTF-8; returned text contains replacement characters."] : [],
									"The unrestricted GDB console can access local shell, filesystem, network, and target controls."
								]
							});
							return ok({
								result,
								evidence
							});
						} catch (cause) {
							if (cause instanceof AnalysisCancelledError) return err(cause);
							if (cause instanceof AnalysisCapabilityUnavailableError) return err(cause);
							if (cause instanceof GdbCommandTimeoutError) {
								const result = cause.partial;
								return ok({
									result,
									evidence: cause.evidence
								});
							}
							if (session.protocolError !== undefined) return err(await this.#stopAfterProtocolFailure(session, cause));
							if (cause instanceof GdbCommandProcessExitError) {
								const processExit = cause;
								const result = {
									...processExit.partial,
									command
								};
								const evidence = createGdbSessionEvidence(session, {
									predicateType: "rea.debugger.console-observation",
									operation: "gdb_console",
									parameters: {
										session_id: sessionId,
										command
									},
									result: {
										...result,
										records: [...result.records]
									},
									rawResult: {
										...result,
										records: [...result.records]
									},
									limitations: [
										"The active GDB inferior identity is not established by the debugger session identifier.",
										"GDB exited before returning a correlated MI result record; only records retained for the active command are returned raw.",
										...gdbRetainedOutputLimitations(result, acceptedOutput)
									]
								});
								const stopped = await this.#stopDebuggerOnly(session);
								if (stopped.status === "incomplete") return err(this.#sessions.retainCleanupFailure(session, "gdb_console", stopped, {
									cause,
									partialObservation: evidence,
									...result.output_limits?.some((limit) => limit.kind === "command_bytes") ? { diagnostics: debuggerAdmissionDiagnostics(acceptedOutput) } : {}
								}));
								return ok({
									result,
									evidence
								});
							}
							return err(new AnalysisTimeoutError("gdb_console", acceptedDeadline.value, {
								cause,
								...configurableDeadlineGuidance("The GDB MI command", acceptedDeadline)
							}));
						}
					}, signal, "gdb_console");
					if (!completed.ok && completed.error.cleanupIncomplete) this.#sessions.retain(session, completed.error);
					return completed;
				} catch (cause) {
					const error = cause instanceof AnalysisError ? cause : cancelledBy("gdb_console", carriedReason(cause));
					if (error.cleanupIncomplete) this.#sessions.retain(session, error);
					return err(error);
				}
			}
			status(sessionId) {
				const session = this.#sessions.get(sessionId);
				if (session === undefined) return undefined;
				const diagnostics = session.supervisor.snapshot();
				const stopped = this.#stopReason(session);
				return {
					session_id: session.id,
					mi_version: session.miVersion,
					state: stopped === undefined ? "ready" : "closed",
					recent_mi_records: [...session.lines],
					recent_mi_records_truncated: session.recentRecordsTruncated,
					mi_invalid_utf8: session.invalidUtf8Observed,
					stderr: diagnostics.stderr.text,
					stderr_observed_bytes: diagnostics.stderr.observedBytes,
					stderr_truncated: diagnostics.stderr.observedBytes > diagnostics.stderr.bytes,
					stderr_invalid_utf8: diagnostics.stderr.invalidUtf8 === true,
					diagnostics_truncated: diagnostics.diagnosticTruncated === true,
					inferior_tty: session.inferiorTty ?? null,
					inferior_tty_verified: session.inferiorTtyVerified,
					...stopped === undefined ? {} : {
						closed_reason: stopped.reason,
						closed_reason_code: stopped.code
					}
				};
			}
			/** Why a retained session accepts no commands, or undefined while it is ready. */
			#stopReason(session) {
				if (session.protocolError !== undefined) return session.protocolError;
				if (this.#closing) return {
					code: "server-shutdown",
					reason: "REA is shutting down and closing every GDB session."
				};
				if (session.closeRequested) return {
					code: "close-requested",
					reason: "close_gdb_session started releasing this session, and its owned cleanup has not completed."
				};
				if (session.exited) return {
					code: "process-exited",
					reason: `The GDB process exited (exit code ${String(session.exitCode)}, signal ${String(session.exitSignal)}); a command such as quit, or a crash, can end it.`
				};
				if (session.cleanupStarted || !session.ready) return {
					code: "stopped",
					reason: "REA stopped this GDB session."
				};
				return undefined;
			}
			async close(sessionId) {
				if (this.#closing) return err(cancelledBy("close_gdb_session", OwnerCancellation.ownerClosed));
				const session = this.#sessions.get(sessionId);
				if (session === undefined) return err(gdbCloseUnavailable());
				if (session.exited) return this.#finishSessionCleanup(session);
				try {
					return await this.#serialize(session, async () => {
						if (this.#sessions.get(sessionId) !== session) return err(gdbCloseUnavailable());
						if (session.exited || session.cleanupStarted) return this.#finishSessionCleanup(session);
						let targetState = "unknown";
						try {
							const groups = await this.#request(session, "-list-thread-groups --recurse 1");
							if (groups.completion_status !== "complete" || groups.output_truncated || !parseGdbMiDoneRecord(groups.mi).ok) throw new Error("GDB could not confirm its complete, untruncated inferior list before shutdown.");
							const pids = gdbThreadGroupPids(groups.mi);
							if (pids === undefined) throw new Error("GDB returned an unknown inferior list before shutdown.");
							const groupCount = pids.length;
							if (groupCount > 1 || groupCount > 0 && !session.inferiorTtyVerified) return err(new AnalysisCapabilityUnavailableError(GDB_PROVIDER_IDENTITY.id, "close_gdb_session", groupCount > 1 ? "Multiple live GDB inferiors require an explicit disposition because automatic detach supports only one inferior." : "Live GDB inferiors require an explicit disposition because no durable inferior TTY is verified.", {
								retryable: true,
								diagnostics: {
									inferior_disposition_required: groupCount > 1 ? "multiple-inferiors" : "no-durable-output-sink",
									live_inferiors: groupCount
								},
								userMessage: "Close requires an explicit inferior disposition.",
								remediationAction: "Use gdb_console with this session_id to explicitly detach or terminate each remaining inferior, then retry close_gdb_session."
							}));
							session.cleanupStarted = true;
							session.closeRequested = true;
							if (groupCount === 0) {
								session.noInferiorVerified = true;
								targetState = "none_observed";
								await this.#request(session, "-gdb-exit");
							} else {
								session.noInferiorVerified = false;
								const disposition = await this.#detachInferior(session);
								targetState = disposition.status === "no-inferior" ? "none_observed" : "unknown";
							}
						} catch {}
						const stopped = await this.#stopDebuggerOnly(session);
						if (stopped.status === "incomplete") return err(this.#sessions.retainCleanupFailure(session, "close_gdb_session", stopped));
						this.#sessions.remove(session);
						return ok({ target_state: targetState });
					}, undefined, "close_gdb_session");
				} catch (cause) {
					if (cause instanceof AnalysisError) return err(cause);
					throw cause;
				}
			}
			async #finishSessionCleanup(session) {
				session.closeRequested = true;
				const stopped = await this.#stopDebuggerOnly(session);
				if (stopped.status === "incomplete") return err(this.#sessions.retainCleanupFailure(session, "close_gdb_session", stopped));
				this.#sessions.remove(session);
				return ok({ target_state: "unknown" });
			}
			async retryCleanupFailures() {
				const files = await this.#retryStartupFileCleanup();
				const sessions = await this.#sessions.retryCleanupFailures((session) => session.ready && !session.closeRequested);
				if (!files.ok && !sessions.ok) return err(analysisErrorWithCleanupFailure(files.error, sessions.error, "start_gdb_session"));
				return !files.ok ? files : sessions;
			}
			#retryStartupFileCleanup() {
				return retryDebuggerStartupFileCleanup({
					provider: "gdb",
					operation: "start_gdb_session",
					resources: this.#startupResources
				});
			}
			async closeAll() {
				this.#closing = true;
				this.#closePromise ??= this.#drainStartsAndCloseSessions().catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #drainStartsAndCloseSessions() {
				await this.#sessions.closeStarts();
				await Promise.all([...this.#sessions.values()].map((session) => session.commandTail));
				const outcomes = await Promise.allSettled([this.#sessions.closeAll(), this.#startupResources.close()]);
				const failures = outcomes.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
				if (failures.length === 1) throw failures[0];
				if (failures.length > 1) throw new AggregateError(failures, "GDB cleanup remains incomplete");
			}
			async #serialize(session, operation, signal, operationName = "gdb_console") {
				if (session.pendingCommandCount >= this.#maxPendingCommands.value) throw debuggerResourceConstraintError(operationName, "transport", `GDB command queue capacity reached (${String(this.#maxPendingCommands.value)} pending commands).`, "Wait for a GDB command on this session to finish, then retry.", this.#maxPendingCommands, {
					max_pending_commands: this.#maxPendingCommands.value,
					active_or_queued_commands: session.pendingCommandCount
				});
				session.pendingCommandCount += 1;
				const previous = session.commandTail;
				let release;
				let acquired = false;
				session.commandTail = new Promise((resolve) => {
					release = resolve;
				});
				try {
					await waitForGdbCommandTurn(previous, signal);
					acquired = true;
					return await operation();
				} finally {
					if (acquired) {
						session.pendingCommandCount -= 1;
						release?.();
					} else {
						void previous.then(() => {
							session.pendingCommandCount -= 1;
							release?.();
						});
					}
				}
			}
			#receive(session, data) {
				if (session.startupResolve !== undefined) {
					const prompt = session.promptTail + data.toString("utf8");
					if (prompt.includes("(gdb)")) {
						const resolve = session.startupResolve;
						session.startupResolve = undefined;
						resolve();
					}
					session.promptTail = prompt.slice(-4);
				}
				const lines = [];
				let offset = 0;
				let framingFailure;
				while (offset < data.byteLength) {
					if (session.discardingOversizedStreamRecord) {
						const newline = data.indexOf(10, offset);
						if (newline < 0) break;
						session.discardingOversizedStreamRecord = false;
						offset = newline + 1;
						continue;
					}
					const newline = data.indexOf(10, offset);
					const piece = data.subarray(offset, newline < 0 ? data.byteLength : newline);
					session.bufferBytes += piece.byteLength;
					const lineBytes = session.bufferBytes - (newline >= 0 && piece.at(-1) === 13 ? 1 : 0);
					if (lineBytes > MAX_MI_LINE_BYTES) {
						const firstByte = session.bufferChunks[0]?.at(0) ?? session.bufferTail?.at(0) ?? piece.at(0);
						if (firstByte === 126 || firstByte === 64 || firstByte === 38) {
							session.bufferChunks.length = 0;
							session.bufferTail = undefined;
							session.bufferTailBytes = 0;
							session.bufferBytes = 0;
							for (const pending of session.pending.values()) pending.outputLimits.add("mi_line_bytes");
							session.recentRecordsTruncated = true;
							if (newline < 0) {
								session.discardingOversizedStreamRecord = true;
								break;
							}
							offset = newline + 1;
							continue;
						}
						framingFailure = `GDB emitted an MI line exceeding the ${String(MAX_MI_LINE_BYTES)} byte (16 MiB) protocol limit. This release has no runtime override.`;
						break;
					}
					this.#appendLineBytes(session, piece);
					if (newline < 0) break;
					const record = Buffer.concat([...session.bufferChunks, ...session.bufferTail === undefined ? [] : [session.bufferTail.subarray(0, session.bufferTailBytes)]], session.bufferBytes);
					const withoutCarriageReturn = record.at(-1) === 13 ? record.subarray(0, -1) : record;
					const invalidUtf8 = !isUtf8(withoutCarriageReturn);
					const line = withoutCarriageReturn.toString("utf8");
					session.bufferChunks.length = 0;
					session.bufferTail = undefined;
					session.bufferTailBytes = 0;
					session.bufferBytes = 0;
					if (invalidUtf8) session.invalidUtf8Observed = true;
					if (line.length > 0) lines.push({
						value: line,
						invalidUtf8
					});
					offset = newline + 1;
				}
				for (const { value: line } of lines) {
					if (Buffer.byteLength(line, "utf8") > MAX_RECENT_MI_LINE_BYTES) {
						session.lines.push(truncateUtf8RecordPrefix(line));
						session.recentRecordsTruncated = true;
					} else session.lines.push(line);
				}
				if (session.lines.length > 256) {
					session.lines.splice(0, session.lines.length - 256);
					session.recentRecordsTruncated = true;
				}
				for (const { value: line, invalidUtf8 } of lines) {
					for (const pending of session.pending.values()) {
						const lineBytes = Buffer.byteLength(line, "utf8") + 1;
						if (pending.outputBytes + lineBytes <= pending.outputBudgetBytes && pending.lines.length < MAX_COMMAND_OUTPUT_RECORDS) {
							pending.lines.push(line);
							pending.outputBytes += lineBytes;
							pending.outputInvalidUtf8 ||= invalidUtf8;
						} else {
							if (pending.outputBytes + lineBytes > pending.outputBudgetBytes) pending.outputLimits.add("command_bytes");
							if (pending.lines.length >= MAX_COMMAND_OUTPUT_RECORDS) pending.outputLimits.add("command_records");
						}
					}
					if (line === "(gdb)" || line === "(gdb) ") {
						for (const pending of session.pending.values()) {
							if (session.ready && pending.command.startsWith("-interpreter-exec console ") && pending.terminalRecord === undefined && pending.completionToken === undefined) {
								pending.completionToken = session.nextToken++;
								this.#writeMiRequest(session, pending.completionToken, "-gdb-show mi-async");
							}
						}
					}
					const header = gdbMiResultHeader(line);
					if (header === undefined) continue;
					if (invalidUtf8) {
						this.#failProtocol(session, "output-correlation-failure", "GDB emitted an MI result record containing invalid UTF-8.");
						return;
					}
					const { token } = header;
					const pending = session.pending.get(token) ?? [...session.pending.values()].find((command) => command.completionToken === token);
					if (pending === undefined) continue;
					if (token === pending.completionToken) {
						if (header.resultClass !== "done") {
							this.#failProtocol(session, "output-correlation-failure", "GDB command completion query failed.");
							continue;
						}
					} else {
						pending.terminalRecord = line;
						if (header.resultClass === "running" && pending.completionToken === undefined) {
							pending.completionToken = session.nextToken++;
							this.#writeMiRequest(session, pending.completionToken, "-gdb-show mi-async");
						}
						if (pending.completionToken !== undefined) continue;
					}
					clearTimeout(pending.timer);
					session.pending.delete(pending.token);
					pending.cleanup();
					pending.resolve({
						command: "",
						mi: pending.terminalRecord ?? (token === pending.completionToken ? "" : line),
						...snapshotGdbCommandRecords(pending.lines),
						...gdbOutputCapture(pending),
						...pending.outputInvalidUtf8 ? { output_invalid_utf8: true } : {},
						completion_status: "complete"
					});
				}
				if (framingFailure !== undefined) this.#failProtocol(session, "output-correlation-failure", framingFailure);
			}
			#appendLineBytes(session, piece) {
				const slabBytes = 64 * 1024;
				let offset = 0;
				while (offset < piece.length) {
					session.bufferTail ??= Buffer.allocUnsafe(slabBytes);
					const remaining = slabBytes - session.bufferTailBytes;
					const copied = Math.min(remaining, piece.length - offset);
					piece.copy(session.bufferTail, session.bufferTailBytes, offset, offset + copied);
					session.bufferTailBytes += copied;
					offset += copied;
					if (session.bufferTailBytes === slabBytes) {
						session.bufferChunks.push(session.bufferTail);
						session.bufferTail = undefined;
						session.bufferTailBytes = 0;
					}
				}
			}
			#failProtocol(session, code, message) {
				if (session.exited || session.protocolError !== undefined) return;
				session.protocolError = {
					code,
					reason: message
				};
				for (const pending of session.pending.values()) {
					clearTimeout(pending.timer);
					pending.cleanup();
					pending.reject(new GdbProtocolFailureError(message, {
						command: pending.evidenceCommand,
						mi: "",
						...snapshotGdbCommandRecords(pending.lines),
						...gdbOutputCapture(pending),
						...pending.outputInvalidUtf8 ? { output_invalid_utf8: true } : {},
						completion_status: "unknown"
					}));
				}
				session.pending.clear();
				session.startupReject?.(new Error(message));
			}
			async #stopAfterProtocolFailure(session, cause) {
				const stopped = await this.#stopDebuggerOnly(session);
				const partial = cause instanceof GdbProtocolFailureError ? cause.partial : undefined;
				const partialObservation = partial === undefined ? undefined : createGdbSessionEvidence(session, {
					predicateType: "rea.debugger.console-observation",
					operation: "gdb_console",
					parameters: {
						session_id: session.id,
						command: partial.command
					},
					result: {
						...partial,
						records: [...partial.records]
					},
					rawResult: {
						...partial,
						records: [...partial.records]
					},
					limitations: [
						"The active GDB inferior identity is not established by the debugger session identifier.",
						"The GDB MI protocol failed; retained records are partial and command completion is unknown.",
						"The unrestricted GDB console can access local shell, filesystem, network, and target controls."
					]
				});
				const stop = session.protocolError;
				return new AnalysisCapabilityUnavailableError("gdb", "gdb_console", stopped.status === "incomplete" ? `${stop.reason} The owned process could not be confirmed stopped: ${stopped.reason}` : stop.reason, {
					cause,
					...stopped.status === "incomplete" ? incompleteStopFacts(stopped, [session.id]) : {},
					diagnostics: {
						session_stop: stop.code,
						...stopped.status === "incomplete" ? incompleteStopFacts(stopped, [session.id]).diagnostics : {}
					},
					...partialObservation === undefined ? {} : { partialObservation }
				});
			}
			#stopDebuggerOnly(session) {
				return this.#sessions.stop(session);
			}
			async #detachInferior(session) {
				if (session.noInferiorVerified) return { status: "no-inferior" };
				if (session.exited) throw new OwnedDebuggerDetachFailure("inferior-state-unknown", "GDB exited before inferior state could be verified.");
				session.knownInferiorIdentities.clear();
				if (session.protocolError !== undefined || session.pending.size > 0) throw new OwnedDebuggerDetachFailure("inferior-state-unknown", "GDB MI state is not synchronized; inferior state is unknown.");
				const groups = await this.#request(session, "-list-thread-groups --recurse 1");
				if (groups.completion_status !== "complete" || groups.output_truncated || !parseGdbMiDoneRecord(groups.mi).ok) throw new OwnedDebuggerDetachFailure("inferior-state-unknown", "GDB could not confirm its inferior state.");
				const inferiorPids = gdbThreadGroupPids(groups.mi);
				if (inferiorPids?.length === 0) {
					session.knownInferiorIdentities.clear();
					session.noInferiorVerified = true;
					return { status: "no-inferior" };
				}
				session.noInferiorVerified = false;
				if (inferiorPids?.length !== 1) throw inferiorPids === undefined ? new OwnedDebuggerDetachFailure("inferior-state-unknown", "GDB returned an unknown recursive inferior list.") : new OwnedDebuggerDetachFailure("multiple-inferiors", "GDB reports multiple inferiors; automatic detach cannot be confirmed safely.");
				if (!session.inferiorTtyVerified) throw new OwnedDebuggerDetachFailure("no-durable-output-sink", "GDB cannot detach the live inferior because no durable output sink was verified at session startup.");
				const observedTty = await this.#request(session, "-inferior-tty-show");
				if (observedTty.completion_status !== "complete" || observedTty.output_truncated || !parseGdbMiDoneRecord(observedTty.mi).ok || miStringField(observedTty.mi, "inferior_tty_terminal") !== session.inferiorTty) throw new OwnedDebuggerDetachFailure("inferior-tty-changed", "GDB no longer reports the caller-selected inferior TTY; detachment cannot be confirmed safely.");
				await this.#verifyInferiorOutputSink(inferiorPids[0], session.inferiorTty, (identity) => session.knownInferiorIdentities.set(`${identity.pid}:${identity.startTime}`, identity));
				const detached = await this.#request(session, "-target-detach");
				if (detached.completion_status !== "complete" || detached.output_truncated || !parseGdbMiDoneRecord(detached.mi).ok) throw new OwnedDebuggerDetachFailure("detach-failed", "GDB did not confirm inferior detachment.");
				session.knownInferiorIdentities.clear();
				session.noInferiorVerified = true;
				return {
					status: "detached",
					outputSink: "durable"
				};
			}
			async #settleExitedCommands(session, code, signalCode) {
				await this.#waitForStdoutSettlement(session);
				for (const pending of session.pending.values()) {
					clearTimeout(pending.timer);
					pending.reject(new GdbCommandProcessExitError({
						command: pending.evidenceCommand,
						mi: "",
						...snapshotGdbCommandRecords(pending.lines),
						process_exit_observed: true,
						process_exit_code: code,
						process_exit_signal: signalCode,
						...gdbOutputCapture(pending),
						...pending.outputInvalidUtf8 ? { output_invalid_utf8: true } : {},
						completion_status: "unknown"
					}));
				}
				session.pending.clear();
			}
			async #waitForStdoutSettlement(session) {
				let timer;
				try {
					await Promise.race([session.stdoutSettled, new Promise((resolve) => {
						timer = setTimeout(resolve, 1e3);
						timer.unref?.();
					})]);
				} finally {
					clearTimeout(timer);
				}
			}
			#request(session, command, signal, operation = "gdb_console", evidenceCommand = command, accepted) {
				const stdin = session.launched.process.stdin;
				if (session.exited) return Promise.reject(new Error(`GDB MI process has exited (exit code ${String(session.exitCode)}, signal ${String(session.exitSignal)}).`));
				if (stdin === null || stdin === undefined || stdin.destroyed || !stdin.writable) {
					const message = "GDB MI input stream is closed";
					this.#failProtocol(session, "input-stream-failure", message);
					return Promise.reject(new Error(message));
				}
				const token = session.nextToken++;
				const acceptedDeadline = accepted?.deadline ?? this.#commandDeadline;
				const acceptedOutput = command.startsWith("-interpreter-exec console ") ? accepted?.output ?? this.#commandOutput : debuggerControlReplyOutput;
				return new Promise((resolve, reject) => {
					let abortListener;
					const cleanup = () => {
						signal?.removeEventListener("abort", abortListener);
					};
					let pending;
					const timer = setTimeout(() => {
						session.pending.delete(token);
						const stop = {
							code: "command-deadline",
							reason: "A GDB MI command timed out; untagged stream output can no longer be safely correlated with later commands."
						};
						session.protocolError = stop;
						pending.cleanup();
						const partial = {
							command: pending.evidenceCommand,
							mi: "",
							...snapshotGdbCommandRecords(pending.lines),
							...gdbOutputCapture(pending),
							...pending.outputInvalidUtf8 ? { output_invalid_utf8: true } : {},
							completion_status: "unknown"
						};
						const timeout = new AnalysisTimeoutError(operation, acceptedDeadline.value, {
							cause: new Error(`GDB MI command timed out: ${command}`),
							...configurableDeadlineGuidance("The GDB MI command", acceptedDeadline)
						});
						const evidence = createGdbSessionEvidence(session, {
							predicateType: operation === "start_gdb_session" ? "rea.debugger.startup-observation" : "rea.debugger.console-observation",
							operation,
							parameters: {
								session_id: session.id,
								command: pending.evidenceCommand
							},
							result: {
								...partial,
								records: [...partial.records]
							},
							rawResult: {
								...partial,
								records: [...partial.records]
							},
							limitations: [
								"The active GDB inferior identity is not established by the debugger session identifier.",
								`The GDB command exceeded its ${String(acceptedDeadline.value)} ms deadline (deadlineExpired). ${debuggerAdmissionRecovery(acceptedDeadline)} Retained MI and stream records are partial and command completion is unknown.`,
								...gdbRetainedOutputLimitations(partial, acceptedOutput),
								"Cleanup of the owned GDB process was requested because output correlation could no longer be guaranteed.",
								"The unrestricted GDB console can access local shell, filesystem, network, and target controls."
							]
						});
						void this.#stopDebuggerOnly(session).then((stopped) => {
							if (stopped.status === "incomplete" && operation === "start_gdb_session") {
								pending.reject(new AnalysisTimeoutError(operation, acceptedDeadline.value, {
									cause: timeout,
									...incompleteStopFacts(stopped, [session.id]),
									partialObservation: evidence,
									...copiedTimeoutGuidance(timeout)
								}));
								return;
							}
							pending.reject(stopped.status === "incomplete" ? new AnalysisCapabilityUnavailableError("gdb", "gdb_console", `GDB command output could not be correlated and its owned process could not be confirmed stopped: ${stopped.reason}`, {
								cause: timeout,
								...incompleteStopFacts(stopped, [session.id]),
								diagnostics: {
									session_stop: stop.code,
									...incompleteStopFacts(stopped, [session.id]).diagnostics
								},
								partialObservation: evidence
							}) : new GdbCommandTimeoutError(partial, evidence, acceptedDeadline));
						});
					}, acceptedDeadline.value);
					if (session.cleanupStarted) timer.unref();
					pending = {
						token,
						command,
						evidenceCommand,
						lines: [],
						resolve: (result) => {
							cleanup();
							resolve(result);
						},
						reject: (error) => {
							cleanup();
							reject(error);
						},
						cleanup,
						timer,
						outputBytes: 0,
						outputBudgetBytes: acceptedOutput.value,
						outputLimits: new Set(),
						outputInvalidUtf8: false,
						terminalRecord: undefined,
						completionToken: undefined
					};
					session.pending.set(token, pending);
					abortListener = () => {
						clearTimeout(pending.timer);
						const partial = {
							command: pending.evidenceCommand,
							mi: "",
							...snapshotGdbCommandRecords(pending.lines),
							...gdbOutputCapture(pending),
							...pending.outputInvalidUtf8 ? { output_invalid_utf8: true } : {},
							completion_status: "unknown"
						};
						const evidence = createGdbSessionEvidence(session, {
							predicateType: operation === "start_gdb_session" ? "rea.debugger.startup-observation" : "rea.debugger.console-observation",
							operation,
							parameters: {
								session_id: session.id,
								command: pending.evidenceCommand
							},
							result: {
								...partial,
								records: [...partial.records]
							},
							rawResult: {
								...partial,
								records: [...partial.records]
							},
							limitations: [
								"The active GDB inferior identity is not established by the debugger session identifier.",
								"The GDB command was cancelled; retained MI records are partial and command completion is unknown.",
								...gdbRetainedOutputLimitations(partial, acceptedOutput),
								"Shutdown of the owned GDB process was requested because output correlation could no longer be guaranteed.",
								"The unrestricted GDB console can access local shell, filesystem, network, and target controls."
							]
						});
						session.pending.delete(token);
						session.protocolError = {
							code: "command-cancelled",
							reason: "A GDB MI command was cancelled; owned-session shutdown was requested because output correlation can no longer be guaranteed."
						};
						void this.#stopDebuggerOnly(session).then((stopped) => {
							if (stopped.status !== "incomplete") {
								pending.reject(cancelledBy(operation, carriedReason(signal?.reason), { partialObservation: evidence }));
								return;
							}
							const cancellation = cancelledBy(operation, carriedReason(signal?.reason), { partialObservation: evidence });
							const cleanupFailure = this.#sessions.retainCleanupFailure(session, operation, stopped, { cause: cancellation });
							pending.reject(cancelledBy(operation, carriedReason(signal?.reason), {
								...incompleteStopFacts(stopped, [session.id]),
								partialObservation: evidence
							}).bindCleanupDependencies([cleanupFailure], { cleanupResources: [session.id] }));
						});
					};
					signal?.addEventListener("abort", abortListener, { once: true });
					if (signal?.aborted) {
						abortListener();
						return;
					}
					this.#writeMiRequest(session, token, command);
				}).then((result) => ({
					...result,
					command
				}));
			}
			#writeMiRequest(session, token, command) {
				try {
					session.launched.process.stdin?.write(`${token}${command}\n`, "utf8", (cause) => {
						if (cause) this.#failProtocol(session, "input-stream-failure", `GDB stdin write failed: ${cause.message}`);
					});
				} catch (cause) {
					this.#failProtocol(session, "input-stream-failure", `GDB stdin write failed: ${cause instanceof Error ? cause.message : "unknown error"}`);
				}
			}
		};
		miQuote = (value) => `"${value.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"").replaceAll("\r", "\\r").replaceAll("\n", "\\n").replaceAll("	", "\\t")}"`;
		miStringField = (record, field) => {
			const parsed = parseGdbMiDoneRecord(record);
			if (!parsed.ok) return undefined;
			const [only, ...rest] = parsed.value.results;
			return only?.name === field && rest.length === 0 ? gdbMiConstText(only.value) : undefined;
		};
		GDB_BUILTIN_ALIASES = new Map([
			["d", "delete"],
			["p", "print"],
			["s", "step"],
			["t", "thread"]
		]);
		gdbCommandWord = (command) => {
			const word = /^\s*([^\s;]+)/u.exec(command)?.[1]?.toLowerCase();
			return word === undefined ? undefined : GDB_BUILTIN_ALIASES.get(word) ?? word;
		};
		gdbOneShotCommandMayInvalidateDetachProof = (command) => {
			if (commandMayChangeInferiorOutput(command)) return true;
			const firstToken = gdbCommandWord(command);
			if (firstToken !== undefined && ([
				"source",
				"define",
				"alias"
			].some((name) => name.startsWith(firstToken)) || firstToken === "py" || "python".startsWith(firstToken))) return true;
			return /[<>]{1,2}|&>|[\r\n;]/u.test(command);
		};
		commandMayChangeInferiorOutput = (command) => {
			if (/^[ \t]*(?:show|help)[ \t]+inferior-tty[ \t]*$/iu.test(command) || /^[ \t]*-inferior-tty-show[ \t]*$/iu.test(command)) return false;
			const setting = /^\s*(?:set|with)\s+(\S+)/iu.exec(command)?.[1];
			const maySetInferiorTty = setting !== undefined && "inferior-tty".startsWith(setting.toLowerCase());
			const firstToken = gdbCommandWord(command);
			const mayBeTtyCommand = firstToken !== undefined && "tty".startsWith(firstToken);
			const mayDefineAlias = firstToken !== undefined && "alias".startsWith(firstToken);
			const mayRunWithOutputRedirection = firstToken !== undefined && [
				"run",
				"start",
				"starti"
			].some((name) => name.startsWith(firstToken)) && /[<>]{1,2}|&>/u.test(command.slice(firstToken.length));
			return maySetInferiorTty || mayBeTtyCommand || mayDefineAlias || /\binferior-tty\b/iu.test(command) || /^\s*(?:wit(?:h)?(?:\s|$)|tty(?:\s|$)|source\b|py\w*|define\b)/iu.test(command) || mayRunWithOutputRedirection;
		};
		waitForGdbCommandTurn = (previous, signal) => {
			if (signal === undefined) return previous;
			return waitForAbortable(previous, signal).then((outcome) => {
				if (outcome instanceof AbortedWait) throw cancelledBy("gdb_console", outcome);
			});
		};
	})))();
}

//#endregion
//#region dist/rizin/RizinDebuggerProviderIdentity.js
var RIZIN_DEBUGGER_PROVIDER_IDENTITY;
function init_RizinDebuggerProviderIdentity() {
	return (init_RizinDebuggerProviderIdentity = __esmMin((() => {
		RIZIN_DEBUGGER_PROVIDER_IDENTITY = {
			id: "rizin.debugger",
			name: "Rizin debugger",
			version: null
		};
	})))();
}

//#endregion
//#region dist/rizin/RizinDebugSessionManager.js
var CLEANUP_COMMAND_TIMEOUT_MS, STARTUP_TIMEOUT_MS, MAX_FRAME_BYTES, MAX_QUEUED_FRAME_BYTES, MAX_QUEUED_FRAMES, MIN_QUEUED_FRAME_CHARGE_BYTES, MAX_COMMAND_FRAMES, MAX_RECENT_FRAME_BYTES, MAX_DIAGNOSTIC_BYTES, RIZIN_SESSION_TARGET_LIMITATION, RIZIN_LAUNCH_PROVENANCE_LIMITATION, createRizinCommandEvidence, rizinCommandTimeoutLimitation, createRizinCommandTimeoutEvidence, RizinProcessExitError, RizinFrameTimeoutError, RizinDebugSessionManager, parseRizinPtraceRows, assertRizinProcessStartTimeStable, hasUnclaimedRizinFrames, bufferedRizinFrame, rizinCaptureStoppedSentence, waitForCommandFrames, waitForFrame, waitForTurn, rizinCancellationReason;
function init_RizinDebugSessionManager() {
	return (init_RizinDebugSessionManager = __esmMin((() => {
		init_DebuggerLaunchFile();
		init_runtimeAnalysisSettings();
		init_RizinDebuggerProviderIdentity();
		init_PersistentDebuggerHost();
		init_deadline();
		init_resources();
		init_OwnedFileHandle();
		init_OwnedRegularFile();
		init_providerCleanupError();
		init_analysisErrorCore();
		init_debuggerSessionErrors();
		init_analysisErrorCleanup();
		init_evidence();
		init_analysisOperationSnapshot();
		init_result();
		init_ProviderProcess();
		init_debuggerSessionLimits();
		init_ownedDebuggerSession();
		init_OwnedDebuggerSessionRegistry();
		init_callerPath();
		init_AbortablePromise();
		init_utf8HeadExcerpt();
		init_HostPlatform();
		init_errorMessage();
		CLEANUP_COMMAND_TIMEOUT_MS = 1e3;
		STARTUP_TIMEOUT_MS = 3e4;
		MAX_FRAME_BYTES = 16 * 1024 * 1024;
		MAX_QUEUED_FRAME_BYTES = 4 * 1024 * 1024;
		MAX_QUEUED_FRAMES = 4096;
		MIN_QUEUED_FRAME_CHARGE_BYTES = 64;
		MAX_COMMAND_FRAMES = 4096;
		MAX_RECENT_FRAME_BYTES = 16 * 1024;
		MAX_DIAGNOSTIC_BYTES = 64 * 1024;
		RIZIN_SESSION_TARGET_LIMITATION = "The session target is the launch file hashed at session start; later debugger commands do not rebind it.";
		RIZIN_LAUNCH_PROVENANCE_LIMITATION = "Launch provenance records the original and resolved startup paths; it does not establish the current target after unrestricted debugger commands.";
		createRizinCommandEvidence = ({ sessionId, command, result, inferiorTty, launchProvenance, launchTarget, limitations }) => createEvidence({
			kind: "session",
			session_kind: "rizin",
			id: sessionId,
			target: launchTarget.identity
		}, RIZIN_DEBUGGER_PROVIDER_IDENTITY, {
			predicateType: "rea.debugger.command-observation",
			operation: "rizin_debug_command",
			parameters: {
				session_id: sessionId,
				command,
				inferior_tty: inferiorTty,
				launch_provenance: { ...launchProvenance }
			},
			result: { ...result },
			rawResult: { ...result },
			authority: "controlled-replay",
			limitations: [
				RIZIN_SESSION_TARGET_LIMITATION,
				...launchTarget.unobservedReason === undefined ? [] : [`The launch file could not be hashed at session start, so the session target is unknown: ${launchTarget.unobservedReason}`],
				...limitations,
				...result.completion_status === "unknown" ? ["Interrupted output may include an incomplete completion-marker prefix; it is retained because it cannot be distinguished from command diagnostics."] : [],
				...result.output_invalid_utf8 ? ["Collected command frames contained invalid UTF-8 bytes; decoded text may contain replacement characters."] : [],
				RIZIN_LAUNCH_PROVENANCE_LIMITATION
			]
		});
		rizinCommandTimeoutLimitation = (deadline) => `The command timed out before its completion marker at ${String(deadline.value)} ms (deadlineExpired). ${debuggerAdmissionRecovery(deadline)} Retained output is partial and completion is unknown.`;
		createRizinCommandTimeoutEvidence = ({ sessionId, command, result, inferiorTty, cleanupFailure, launchProvenance, launchTarget, deadline }) => createRizinCommandEvidence({
			sessionId,
			command,
			result,
			inferiorTty,
			launchProvenance,
			launchTarget,
			limitations: [
				rizinCommandTimeoutLimitation(deadline),
				...result.output_invalid_utf8 ? ["Collected command frame bytes did not form valid UTF-8; displayed output contains replacement characters."] : [],
				...cleanupFailure === undefined ? ["The owned debugger session was stopped because output correlation could no longer be guaranteed."] : [`The owned debugger session remains retained because cleanup could not be verified: ${cleanupFailure}`],
				"The command is unrestricted and may access local files, the shell, network, or mutate the target."
			]
		});
		RizinProcessExitError = class extends Error {
			constructor(message = "Rizin exited before completing the active command") {
				super(message);
			}
		};
		RizinFrameTimeoutError = class extends Error {
			constructor() {
				super("Timed out waiting for the next Rizin NUL frame");
			}
		};
		RizinDebugSessionManager = class {
			#sessions;
			#startupResources = new ArtifactResourceScope();
			#environment;
			#closingAll = false;
			#command;
			#launchCommandDeadline;
			#startupTimeoutMs;
			#maxSessions;
			#maxPendingCommands;
			#launchCommandOutput;
			#platform;
			#spawnProcess;
			constructor(environment = process.env, options = {}) {
				this.#environment = { ...environment };
				this.#command = environment.REA_RIZIN_COMMAND ?? "rizin";
				const limits = debuggerConstructionLimits(this.#environment);
				this.#launchCommandDeadline = limits.commandDeadline;
				this.#startupTimeoutMs = options.startupTimeoutMs ?? STARTUP_TIMEOUT_MS;
				this.#maxSessions = limits.maxSessions;
				this.#maxPendingCommands = limits.maxPendingCommands;
				this.#launchCommandOutput = limits.maxCommandOutputBytes;
				this.#platform = options.platform ?? HOST_PLATFORM.platform;
				const stopProcess = options.stopProcess ?? stopOwnedDebuggerProcess;
				const platform = this.#platform;
				this.#sessions = new OwnedDebuggerSessionRegistry({
					provider: "rizin",
					displayName: "Rizin",
					sealSession: (session) => {
						session.closing = true;
					},
					stopProcess: (session) => stopProcess(session, "Rizin debugger", { platform }),
					stopFailurePrefix: "Owned Rizin debugger shutdown failed"
				});
				this.#spawnProcess = options.spawnProcess ?? spawnOwnedProviderProcess;
			}
			get #commandDeadline() {
				const override = currentAnalysisOperationSnapshot()?.overrides["debugger.command_deadline_ms"];
				if (override !== undefined) return {
					...this.#launchCommandDeadline,
					value: override,
					source: "runtime"
				};
				const parsed = parseDebuggerCommandDeadline(this.#environment);
				if (!parsed.ok) throw parsed.error;
				return parsed.value;
			}
			get #frameTimeoutMs() {
				return this.#commandDeadline.value;
			}
			get #commandOutput() {
				const override = currentAnalysisOperationSnapshot()?.overrides["debugger.max_command_output_bytes"];
				if (override !== undefined) return {
					...this.#launchCommandOutput,
					value: override,
					source: "runtime"
				};
				const parsed = parseDebuggerCommandOutput(this.#environment);
				if (!parsed.ok) throw parsed.error;
				return parsed.value;
			}
			async start(input, signal) {
				return this.#sessions.start("start_rizin_debug_session", signal, (started) => this.#startWithReservation(input, started));
			}
			async #startWithReservation(input, signal) {
				if (signal.aborted) return err(cancelledBy("start_rizin_debug_session", signal));
				const occupied = this.#sessions.occupied();
				if (occupied >= this.#maxSessions.value) return err(debuggerResourceConstraintError("start_rizin_debug_session", "memory", `Rizin session capacity reached (${String(this.#maxSessions.value)} sessions).`, "Close a Rizin debug session before starting another; a stopped session that rizin_debug_session_status reports closed still holds its slot until close_rizin_debug_session releases it.", this.#maxSessions, {
					max_sessions: this.#maxSessions.value,
					active_or_reserved_sessions: occupied
				}));
				const releaseReservation = this.#sessions.reserve();
				try {
					return await this.#start(input, signal, releaseReservation);
				} finally {
					releaseReservation();
				}
			}
			async #start(input, signal, releaseReservation) {
				if (!persistentDebuggerHostSupported(this.#platform)) return err(new AnalysisCapabilityUnavailableError("rizin", "start_rizin_debug_session", "Persistent Rizin debugger sessions require Linux /proc descriptor readback to verify inferior detachment and output routing."));
				if (input.inferior_tty === undefined || input.inferior_tty.length === 0) return err(new AnalysisInputError("start_rizin_debug_session"));
				let ttyPath;
				let ttyDevice;
				let ttyInode;
				let ttyLease;
				const files = await retryDebuggerStartupFileCleanup({
					provider: "rizin",
					operation: "start_rizin_debug_session",
					resources: this.#startupResources
				});
				if (!files.ok) return files;
				try {
					ttyPath = await realpath(input.inferior_tty);
					const ttyHandle = await open(ttyPath, constants.O_RDWR | constants.O_NOCTTY | constants.O_NONBLOCK);
					const tty = await withOwnedFileHandle(ttyPath, new OwnedFileHandle(ttyHandle), {
						...signal === undefined ? {} : { signal },
						retainFailedClose: (owner) => {
							ttyLease = new AnalysisCleanupLease(() => owner.close(), [ttyPath]);
							this.#startupResources.retain({
								kind: "lease",
								resource: ttyPath,
								lease: ttyLease
							});
						}
					}, async (handle) => {
						const ttyStat = await handle.stat();
						if (!isatty(handle.fd) || (ttyStat.mode & constants.S_IFMT) !== constants.S_IFCHR) throw new Error("The selected inferior_tty is not a character TTY.");
						return {
							device: ttyStat.dev,
							inode: ttyStat.ino
						};
					});
					ttyDevice = tty.device;
					ttyInode = tty.inode;
				} catch (cause) {
					const primaryCause = cause instanceof RegularFileCleanupFailure && cause.outcome.kind === "failed" ? cause.outcome.cause : cause;
					const cancellation = regularFileCancellation(cause);
					const primary = cancellation === undefined ? new AnalysisInputError("start_rizin_debug_session", {
						cause: primaryCause,
						diagnostics: { inferior_tty: input.inferior_tty }
					}, [{
						path: ["inferior_tty"],
						reason: "invalid_value",
						message: `Cannot use selected terminal ${input.inferior_tty}: ${errorMessage(primaryCause)}`
					}]) : cancelledBy("start_rizin_debug_session", carriedReason(cancellation.reason));
					if (!(cause instanceof RegularFileCleanupFailure)) return err(primary);
					const cleanup = new ProviderCleanupError("rizin", [ttyPath], {}, {
						operation: "start_rizin_debug_session",
						cause: cause.cleanupCause
					});
					const error = cause.outcome.kind === "failed" || cancellation !== undefined ? analysisErrorWithCleanupFailure(primary, cleanup, "start_rizin_debug_session") : cleanup;
					ttyLease?.bindCleanupError(cleanup);
					if (error !== cleanup) ttyLease?.bindCleanupError(error);
					return err(error);
				}
				if (signal?.aborted) return err(cancelledBy("start_rizin_debug_session", signal));
				const id = randomUUID();
				const resolvedPath = absoluteCallerPath(input.path);
				const launchProvenance = {
					caller_selected_path: input.path,
					resolved_path: resolvedPath
				};
				const launchTarget = await observeDebuggerLaunchFile(resolvedPath, {
					provider: "rizin",
					operation: "start_rizin_debug_session",
					resources: this.#startupResources,
					signal
				});
				if (!launchTarget.ok) return launchTarget;
				if (signal?.aborted) return err(cancelledBy("start_rizin_debug_session", signal));
				const arguments_ = [
					"-N",
					"-0",
					"-d",
					"-R",
					`stdin=${ttyPath}`,
					"-R",
					`stdout=${ttyPath}`,
					"-R",
					`stderr=${ttyPath}`,
					"-e",
					"dbg.exitkills=false",
					...input.backend === undefined ? [] : ["-D", input.backend],
					resolvedPath
				];
				let launched;
				try {
					launched = await this.#spawnProcess({
						command: this.#command,
						arguments: arguments_,
						hostEnvironment: this.#environment,
						runId: id,
						stdin: "pipe",
						...signal === undefined ? {} : { signal }
					});
				} catch (cause) {
					if (signal?.aborted) return err(cancelledBy("start_rizin_debug_session", rizinCancellationReason(signal, cause)));
					return err(new AnalysisCapabilityUnavailableError("rizin", "start_rizin_debug_session", cause instanceof Error ? cause.message : "Unable to start Rizin debugger"));
				}
				const session = {
					id,
					launched,
					launchProvenance,
					launchTarget: launchTarget.value,
					backend: input.backend ?? null,
					inferiorTty: ttyPath,
					inferiorTtyDevice: ttyDevice,
					inferiorTtyInode: ttyInode,
					knownInferiorIdentities: new Map(),
					inferiorInventoryComplete: false,
					inferiorStateUnknown: () => !session.inferiorInventoryComplete,
					verifyInferiorsEndedAfterExit: async () => {
						if (!session.inferiorInventoryComplete) return false;
						const ended = await verifyOwnedInferiorsEnded(session.knownInferiorIdentities.values());
						if (ended) session.knownInferiorIdentities.clear();
						return ended;
					},
					detachInferior: () => session.cleanupCommandTurnHeld ? this.#detachInferiorUnlocked(session) : this.#detachInferior(session),
					cleanupCommandTurnHeld: false,
					pendingCommandCount: 0,
					invalidUtf8Observed: false,
					closing: false,
					supervisor: new ProviderProcessSupervisor({
						process: launched.process,
						ownsProcessLifetime: false
					}, {
						captureStdout: false,
						maxDiagnosticBytes: MAX_DIAGNOSTIC_BYTES
					}),
					frames: [],
					frameWaiters: [],
					history: [],
					queuedFrameBytes: 0,
					historyTruncated: false,
					frameChunks: [],
					bufferedFrameBytes: 0,
					ready: false,
					published: false,
					closeRequested: false,
					exited: false,
					commandTail: Promise.resolve(),
					protocolError: undefined,
					stopReason: undefined,
					cleanupSynchronization: undefined,
					commandCaptureActive: false,
					commandOutputDropped: false,
					discardingOversizedFrame: false
				};
				this.#sessions.add(session);
				releaseReservation();
				launched.process.stdout?.on("data", (chunk) => this.#receive(session, Buffer.from(chunk)));
				launched.process.stdin?.on("error", (cause) => this.#failProtocol(session, "input-stream-failure", `Rizin stdin stream failed: ${cause.message}`));
				launched.process.stdin?.once("close", () => {
					if (!session.exited && session.protocolError === undefined) this.#failProtocol(session, "input-stream-failure", "Rizin stdin stream closed unexpectedly.");
				});
				launched.process.once("exit", () => {
					session.exited = true;
					session.cleanupSynchronization?.reject(new RizinProcessExitError());
					for (const waiter of session.frameWaiters) waiter.reject(new RizinProcessExitError());
					session.frameWaiters.length = 0;
				});
				try {
					await waitForFrame(session, this.#startupTimeoutMs, signal);
					await new Promise((resolve) => setImmediate(resolve));
					if (signal?.aborted) throw cancelledBy("start_rizin_debug_session", signal);
					if (session.exited) throw new RizinProcessExitError("Rizin exited during startup.");
					if (session.protocolError !== undefined) throw new Error(session.protocolError.reason);
					session.ready = true;
					session.published = true;
					return ok({
						session_id: id,
						backend: input.backend ?? null
					});
				} catch (caught) {
					const protocolFailure = session.protocolError;
					const cancellation = signal?.aborted || caught instanceof AnalysisCancelledError ? cancelledBy("start_rizin_debug_session", rizinCancellationReason(signal, caught)) : undefined;
					const stopped = await this.#stopDebuggerOnly(session);
					const capturedOutput = this.#startupCapturedOutput(session);
					if (stopped.status !== "incomplete") this.#sessions.remove(session);
					let primary;
					if (cancellation !== undefined) primary = cancelledBy("start_rizin_debug_session", cancellation, { capturedOutput });
					else if (protocolFailure !== undefined) primary = new AnalysisCapabilityUnavailableError("rizin", "start_rizin_debug_session", protocolFailure.reason, {
						cause: caught,
						capturedOutput,
						diagnostics: { session_stop: protocolFailure.code }
					});
					else if (caught instanceof RizinProcessExitError) primary = new AnalysisCapabilityUnavailableError("rizin", "start_rizin_debug_session", caught.message, {
						cause: caught,
						capturedOutput
					});
					else primary = new AnalysisTimeoutError("start_rizin_debug_session", this.#startupTimeoutMs, {
						cause: caught,
						capturedOutput,
						...fixedDeadlineGuidance("Rizin debug session startup", this.#startupTimeoutMs)
					});
					return err(this.#finalizeFailure(session, "start_rizin_debug_session", primary, stopped, signal));
				}
			}
			async execute(sessionId, command, signal) {
				const session = this.#sessions.get(sessionId);
				if (session === undefined) return err(unknownDebuggerSessionError(RIZIN_DEBUG_SESSION_TOOLS, "rizin_debug_command"));
				const stopped = this.#stopReason(session);
				if (stopped !== undefined) return err(stoppedDebuggerSessionError(RIZIN_DEBUG_SESSION_TOOLS, "rizin_debug_command", stopped));
				if (signal?.aborted) return err(cancelledBy("rizin_debug_command", signal));
				if (session.pendingCommandCount >= this.#maxPendingCommands.value) return err(debuggerResourceConstraintError("rizin_debug_command", "transport", `Rizin command queue capacity reached (${String(this.#maxPendingCommands.value)} pending commands).`, "Wait for a Rizin debug command on this session to finish, then retry.", this.#maxPendingCommands, {
					max_pending_commands: this.#maxPendingCommands.value,
					active_or_queued_commands: session.pendingCommandCount
				}));
				const accepted = readRuntimeSetting(() => ({
					deadline: this.#commandDeadline,
					output: this.#commandOutput
				}));
				if (!accepted.ok) return accepted;
				const { deadline: acceptedDeadline, output: acceptedOutput } = accepted.value;
				session.pendingCommandCount += 1;
				let release;
				let acquired = false;
				let commandSent = false;
				let commandCapture;
				let interruption;
				const commandResult = (capture, completion) => ({
					command,
					output: capture.output,
					output_scope: "command_and_interleaved_session_output",
					output_truncated: capture.outputTruncated,
					completion_status: completion,
					backend: session.backend,
					...capture.outputInvalidUtf8 ? { output_invalid_utf8: true } : {}
				});
				const previous = session.commandTail;
				session.commandTail = new Promise((resolve) => {
					release = resolve;
				});
				try {
					await waitForTurn(previous, signal);
					acquired = true;
					if (signal?.aborted) return err(cancelledBy("rizin_debug_command", signal));
					const stoppedWhileQueued = this.#stopReason(session);
					if (stoppedWhileQueued !== undefined) return err(stoppedDebuggerSessionError(RIZIN_DEBUG_SESSION_TOOLS, "rizin_debug_command", stoppedWhileQueued));
					if (hasUnclaimedRizinFrames(session)) {
						const message = "Unsolicited Rizin frames arrived before a command; command output can no longer be safely correlated.";
						this.#failProtocol(session, "output-correlation-failure", message);
						return err(await this.#stopAfterProtocolFailure(session, {
							code: "output-correlation-failure",
							reason: message
						}, undefined, {
							signal,
							commandTurnHeld: true
						}));
					}
					const marker = `__REA_COMMAND_COMPLETE_${randomUUID().replaceAll("-", "")}__`;
					session.inferiorInventoryComplete = false;
					session.knownInferiorIdentities.clear();
					commandSent = true;
					session.commandCaptureActive = true;
					session.commandOutputDropped = false;
					const stdin = session.launched.process.stdin;
					if (stdin === null || stdin === undefined || stdin.destroyed || !stdin.writable) {
						this.#failProtocol(session, "input-stream-failure", "Rizin stdin stream is closed.");
					} else {
						try {
							stdin.write(`${command}\n!echo ${marker}\n`, "utf8", (cause) => {
								if (cause) this.#failProtocol(session, "input-stream-failure", `Rizin stdin write failed: ${cause.message}`);
							});
						} catch (cause) {
							this.#failProtocol(session, "input-stream-failure", `Rizin stdin write failed: ${cause instanceof Error ? cause.message : "unknown error"}`);
						}
					}
					const received = await waitForCommandFrames(session, marker, acceptedDeadline.value, acceptedOutput, signal);
					commandCapture = received.ok ? received.value : received.error.capture;
					if (!received.ok) {
						interruption = received.error;
						throw interruption.cause;
					}
					const captured = received.value;
					if (signal?.aborted) throw cancelledBy("rizin_debug_command", signal);
					let stopped = { status: "stopped" };
					let cleanupFailure;
					if (captured.outputTruncated) {
						stopped = await this.#stopDebuggerOnly(session, true);
						if (stopped.status === "incomplete") cleanupFailure = stopped.reason;
					}
					const result = commandResult(captured, captured.outputTruncated ? "unknown" : "complete");
					const evidence = createRizinCommandEvidence({
						sessionId,
						command,
						result,
						inferiorTty: session.inferiorTty,
						launchProvenance: session.launchProvenance,
						launchTarget: session.launchTarget,
						limitations: [
							"Rizin commands and debugger effects depend on the loaded IO plugin and target.",
							"Output contains all NUL frames through an explicit command-completion marker; backend output interleaved before that marker cannot be distinguished from command output.",
							...captured.outputTruncated ? [rizinCaptureStoppedSentence(captured.outputLimit, acceptedOutput, cleanupFailure)] : [],
							"The command is unrestricted and may access local files, the shell, network, or mutate the target."
						]
					});
					return this.#finalizeCommandObservation(session, {
						result,
						evidence
					}, stopped, signal);
				} catch (cause) {
					const partialResult = commandCapture === undefined ? undefined : commandResult(commandCapture, "unknown");
					const capturedOutput = commandCapture === undefined ? undefined : {
						stdout: commandCapture.output,
						stderr: "",
						truncated: commandCapture.outputTruncated
					};
					const partialEvidence = (limitations) => partialResult === undefined ? undefined : createRizinCommandEvidence({
						sessionId,
						command,
						result: partialResult,
						inferiorTty: session.inferiorTty,
						launchProvenance: session.launchProvenance,
						launchTarget: session.launchTarget,
						limitations
					});
					if (signal?.aborted || cause instanceof AnalysisCancelledError) {
						if (!commandSent) return err(cancelledBy("rizin_debug_command", rizinCancellationReason(signal, cause)));
						const evidence = partialEvidence([
							"The Rizin command was cancelled; collected frame output is partial and command completion is unknown.",
							"The owned debugger session was stopped because command output can no longer be correlated safely.",
							"The command is unrestricted and may access local files, the shell, network, or mutate the target."
						]);
						session.protocolError = {
							code: "command-cancelled",
							reason: "A Rizin command was cancelled; the owned session was stopped because command output can no longer be correlated safely."
						};
						const primary = cancelledBy("rizin_debug_command", rizinCancellationReason(signal, cause), {
							...capturedOutput === undefined ? {} : { capturedOutput },
							...evidence === undefined ? {} : { partialObservation: evidence }
						});
						const stopped = await this.#stopDebuggerOnly(session, true);
						return err(this.#finalizeFailure(session, "rizin_debug_command", primary, stopped, signal));
					}
					if (session.protocolError !== undefined) {
						const evidence = partialEvidence([
							session.protocolError.reason,
							"The Rizin protocol failed; retained command output is partial and completion is unknown.",
							"The command is unrestricted and may access local files, the shell, network, or mutate the target."
						]);
						return err(await this.#stopAfterProtocolFailure(session, session.protocolError, cause, {
							commandTurnHeld: true,
							signal,
							...evidence === undefined ? {} : { partialObservation: evidence }
						}));
					}
					if (interruption?.kind === "timeout") {
						session.protocolError = {
							code: "command-deadline",
							reason: `Rizin command timed out before its completion marker at ${String(acceptedDeadline.value)} ms (deadlineExpired). ${debuggerAdmissionRecovery(acceptedDeadline)} Output correlation is no longer safe.`
						};
						const stopped = await this.#stopDebuggerOnly(session, true);
						const result = {
							...commandResult(interruption.capture, "unknown"),
							output_truncated: true
						};
						const evidence = createRizinCommandTimeoutEvidence({
							sessionId,
							command,
							result,
							inferiorTty: session.inferiorTty,
							deadline: acceptedDeadline,
							cleanupFailure: stopped.status === "incomplete" ? stopped.reason : undefined,
							launchProvenance: session.launchProvenance,
							launchTarget: session.launchTarget
						});
						return this.#finalizeCommandObservation(session, {
							result,
							evidence
						}, stopped, signal);
					}
					if (interruption?.kind === "exited") {
						const result = commandResult(interruption.capture, "unknown");
						const evidence = createRizinCommandEvidence({
							sessionId,
							command,
							result,
							inferiorTty: session.inferiorTty,
							launchProvenance: session.launchProvenance,
							launchTarget: session.launchTarget,
							limitations: ["Rizin exited before the command-completion marker; retained frame output is partial and command completion is unknown.", "The command is unrestricted and may access local files, the shell, network, or mutate the target."]
						});
						const stopped = await this.#stopDebuggerOnly(session, true);
						return this.#finalizeCommandObservation(session, {
							result,
							evidence
						}, stopped, signal);
					}
					session.protocolError = {
						code: "output-correlation-failure",
						reason: "Rizin did not return the current command-completion marker; the session was stopped to prevent late output from being attributed to a later command."
					};
					const evidence = partialEvidence([session.protocolError.reason, "The command is unrestricted and may access local files, the shell, network, or mutate the target."]);
					const errorOptions = {
						cause,
						...evidence === undefined ? {} : { partialObservation: evidence }
					};
					const stopped = await this.#stopDebuggerOnly(session, true);
					const primary = new AnalysisTimeoutError("rizin_debug_command", this.#frameTimeoutMs, {
						...errorOptions,
						...configurableDeadlineGuidance("The Rizin debug command", acceptedDeadline)
					});
					return err(this.#finalizeFailure(session, "rizin_debug_command", primary, stopped, signal));
				} finally {
					if (acquired) {
						session.commandCaptureActive = false;
						session.pendingCommandCount -= 1;
						release?.();
					} else void previous.then(() => {
						session.pendingCommandCount -= 1;
						release?.();
					});
				}
			}
			status(sessionId) {
				const session = this.#sessions.get(sessionId);
				if (session === undefined) return undefined;
				const stopped = this.#stopReason(session);
				return {
					session_id: session.id,
					state: stopped === undefined ? "ready" : "closed",
					inferior_tty: session.inferiorTty,
					recent_output: [...session.history],
					recent_output_truncated: session.historyTruncated,
					diagnostics_truncated: session.supervisor.snapshot().diagnosticTruncated === true,
					output_invalid_utf8: session.invalidUtf8Observed,
					...stopped === undefined ? {} : {
						closed_reason: stopped.reason,
						closed_reason_code: stopped.code
					}
				};
			}
			/** Why a retained session accepts no commands, or undefined while it is ready. */
			#stopReason(session) {
				const diagnosed = session.stopReason ?? session.protocolError;
				if (diagnosed !== undefined) return diagnosed;
				if (this.#closingAll) return {
					code: "server-shutdown",
					reason: "REA is shutting down and closing every Rizin debug session."
				};
				if (session.closeRequested) return {
					code: "close-requested",
					reason: "close_rizin_debug_session started releasing this session, and its owned cleanup has not completed."
				};
				if (session.exited) {
					const { exitCode, signalCode } = session.launched.process;
					return {
						code: "process-exited",
						reason: `The Rizin process exited (exit code ${String(exitCode)}, signal ${String(signalCode)}); a command such as q, or a crash, can end it.`
					};
				}
				if (session.closing || !session.ready) return {
					code: "stopped",
					reason: "REA stopped this Rizin debug session."
				};
				return undefined;
			}
			async close(sessionId) {
				if (this.#closingAll) return err(new AnalysisInputError("close_rizin_debug_session"));
				const session = this.#sessions.get(sessionId);
				if (session === undefined) return err(unknownDebuggerSessionError(RIZIN_DEBUG_SESSION_TOOLS, "close_rizin_debug_session"));
				session.closeRequested = true;
				session.closing = true;
				const stopped = await this.#stopDebuggerOnly(session);
				if (stopped.status === "incomplete") return err(this.#sessions.retainCleanupFailure(session, "close_rizin_debug_session", stopped));
				this.#sessions.remove(session);
				return ok({ target_state: "unknown" });
			}
			async retryCleanupFailures() {
				const files = await retryDebuggerStartupFileCleanup({
					provider: "rizin",
					operation: "start_rizin_debug_session",
					resources: this.#startupResources
				});
				if (!files.ok) return files;
				return this.#sessions.retryCleanupFailures((session) => session.published && !session.closeRequested);
			}
			async closeAll() {
				this.#closingAll = true;
				await this.#sessions.closeStarts();
				const outcomes = await Promise.allSettled([this.#sessions.closeAll(), this.#startupResources.close()]);
				const failures = outcomes.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
				if (failures.length === 1) throw failures[0];
				if (failures.length > 1) throw new AggregateError(failures, "Rizin cleanup remains incomplete");
			}
			#receive(session, chunk) {
				let offset = 0;
				while (offset < chunk.length) {
					const boundary = chunk.indexOf(0, offset);
					const end = boundary < 0 ? chunk.length : boundary;
					const nextOffset = boundary + 1;
					if (boundary >= 0 && nextOffset <= offset) {
						this.#failProtocol(session, "output-correlation-failure", "Rizin frame parser failed to advance past a NUL delimiter.");
						return;
					}
					const piece = chunk.subarray(offset, end);
					if (session.discardingOversizedFrame) {
						if (boundary < 0) return;
						session.discardingOversizedFrame = false;
						offset = nextOffset;
						continue;
					}
					if (session.bufferedFrameBytes + piece.length > MAX_FRAME_BYTES) {
						const message = `Rizin emitted a NUL frame exceeding the ${String(MAX_FRAME_BYTES)} byte (16 MiB) protocol limit. This release has no runtime override.`;
						if (!session.commandCaptureActive && session.cleanupSynchronization === undefined) {
							this.#failProtocol(session, "output-correlation-failure", message);
							return;
						}
						session.protocolError = {
							code: "output-correlation-failure",
							reason: message
						};
						session.historyTruncated = true;
						const remainingBytes = MAX_FRAME_BYTES - session.bufferedFrameBytes;
						if (remainingBytes > 0) {
							session.frameChunks.push(Buffer.from(piece.subarray(0, remainingBytes)));
							session.bufferedFrameBytes += remainingBytes;
						}
						if (boundary < 0) {
							session.discardingOversizedFrame = true;
							this.#deliverBufferedFrame(session, true);
							return;
						}
						this.#deliverBufferedFrame(session, true);
						offset = nextOffset;
						continue;
					}
					if (piece.length > 0) {
						session.frameChunks.push(Buffer.from(piece));
						session.bufferedFrameBytes += piece.length;
					}
					if (boundary < 0) return;
					this.#deliverBufferedFrame(session, false);
					offset = nextOffset;
				}
			}
			#deliverBufferedFrame(session, truncated) {
				const captured = bufferedRizinFrame(session, truncated);
				session.frameChunks = [];
				session.bufferedFrameBytes = 0;
				this.#deliverFrame(session, captured.frame, captured.bytes);
			}
			#startupCapturedOutput(session) {
				const output = session.supervisor.snapshot();
				const partialFrame = bufferedRizinFrame(session, false).frame.text;
				const protocolOutput = [...session.history, partialFrame].filter((frame) => frame.length > 0).join("\n");
				const stdout = utf8HeadExcerpt(protocolOutput, MAX_DIAGNOSTIC_BYTES).text;
				return {
					stdout,
					stderr: output.stderr.text,
					truncated: session.historyTruncated || protocolOutput.length > stdout.length || output.diagnosticTruncated === true || output.stdout.observedBytes > output.stdout.bytes || output.stderr.observedBytes > output.stderr.bytes
				};
			}
			#deliverFrame(session, frame, frameBytes) {
				const synchronization = session.cleanupSynchronization;
				if (synchronization !== undefined) {
					if (!frame.truncated && !frame.invalidUtf8 && frame.text.trim() === synchronization.marker) synchronization.resolve();
					return;
				}
				const history = utf8HeadExcerpt(frame.text, MAX_RECENT_FRAME_BYTES);
				const historyPrefix = history.text;
				const historyTruncated = history.truncated || frame.truncated;
				if (historyTruncated) session.historyTruncated = true;
				session.history.push(historyTruncated ? `${historyPrefix}[recent frame truncated]` : historyPrefix);
				if (session.history.length > 64) {
					session.history.splice(0, session.history.length - 64);
					session.historyTruncated = true;
				}
				const waiter = session.frameWaiters.shift();
				if (waiter !== undefined) {
					waiter.resolve(frame);
					return;
				}
				const queueChargeBytes = Math.max(frameBytes, MIN_QUEUED_FRAME_CHARGE_BYTES);
				if (session.frames.length >= MAX_QUEUED_FRAMES || session.queuedFrameBytes + queueChargeBytes > MAX_QUEUED_FRAME_BYTES) {
					session.commandOutputDropped ||= session.commandCaptureActive;
					this.#failProtocol(session, "output-correlation-failure", `Rizin produced unsolicited frames exceeding the bounded queue limit of ${String(MAX_QUEUED_FRAMES)} frames or ${String(MAX_QUEUED_FRAME_BYTES)} bytes. This release has no runtime override.`);
					return;
				}
				session.frames.push({
					frame,
					queueChargeBytes
				});
				session.queuedFrameBytes += queueChargeBytes;
			}
			#failProtocol(session, code, message) {
				session.protocolError = {
					code,
					reason: message
				};
				session.cleanupSynchronization?.reject(new Error(message));
				if (!session.commandCaptureActive) {
					session.frameChunks = [];
					session.bufferedFrameBytes = 0;
				}
				for (const waiter of session.frameWaiters) waiter.reject(new Error(message));
				session.frameWaiters.length = 0;
			}
			#stopDebuggerOnly(session, commandTurnHeld = false) {
				if (!this.#sessions.stopping(session)) session.cleanupCommandTurnHeld = commandTurnHeld;
				return this.#sessions.stop(session);
			}
			async #detachInferior(session) {
				if (session.exited) throw new Error("Rizin exited before inferior detach could be verified.");
				const previous = session.commandTail;
				let release;
				session.commandTail = new Promise((resolve) => release = resolve);
				await previous;
				try {
					return await this.#detachInferiorUnlocked(session);
				} finally {
					release();
				}
			}
			async #detachInferiorUnlocked(session) {
				if (session.exited) throw new Error("Rizin exited before inferior detach could be verified.");
				if (session.protocolError !== undefined) await this.#synchronizeCleanup(session);
				session.inferiorInventoryComplete = false;
				session.knownInferiorIdentities.clear();
				const inferior = parseRizinPtraceRows(await this.#runInternalCommand(session, "olj"));
				if (inferior.length === 0) {
					session.knownInferiorIdentities.clear();
					session.inferiorInventoryComplete = true;
					return { status: "no-inferior" };
				}
				session.knownInferiorIdentities.clear();
				for (const [, pid] of inferior) {
					if (session.knownInferiorIdentities.has(pid)) continue;
					const startTime = await readLinuxProcessStartTime(pid);
					if (startTime === null) throw new Error(`Inferior PID ${pid} ended before its identity could be established.`);
					session.knownInferiorIdentities.set(pid, {
						pid,
						startTime
					});
				}
				session.inferiorInventoryComplete = true;
				if (inferior.length !== 1) throw new Error("Rizin reported multiple or ambiguous ptrace inferiors.");
				const [fd, pid] = inferior[0];
				const identity = session.knownInferiorIdentities.get(pid);
				assertRizinProcessStartTimeStable(identity.startTime, await readLinuxProcessStartTime(pid));
				await this.#verifyDebuggerExitPolicy(session);
				await this.#verifyInferiorOutputDescriptors(session, pid);
				await this.#verifyInferiorStdinIsolated(session, pid);
				await this.#runInternalCommand(session, `o- ${fd}`);
				const after = parseRizinPtraceRows(await this.#runInternalCommand(session, "olj"));
				if (after.some(([activeFd, activePid]) => activeFd === fd || activePid === pid) || after.length !== 0) throw new Error("Rizin did not confirm that the selected inferior FD was detached.");
				await this.#verifyDebuggerExitPolicy(session);
				try {
					assertRizinProcessStartTimeStable(identity.startTime, await readLinuxProcessStartTime(pid));
					await this.#verifyInferiorOutputDescriptors(session, pid);
				} catch (cause) {
					if (!await verifyOwnedInferiorsEnded([identity])) throw cause;
					session.knownInferiorIdentities.clear();
					return { status: "no-inferior" };
				}
				return {
					status: "detached",
					outputSink: "durable"
				};
			}
			async #verifyDebuggerExitPolicy(session) {
				const exitKills = (await this.#runInternalCommand(session, "e dbg.exitkills")).trim();
				if (exitKills !== "false") throw new Error("Rizin dbg.exitkills readback did not confirm false.");
			}
			async #verifyInferiorOutputDescriptors(session, pid) {
				for (const descriptor of ["1", "2"]) {
					const descriptorPath = `/proc/${pid}/fd/${descriptor}`;
					const destination = await readlink(descriptorPath);
					const destinationStat = await stat(descriptorPath);
					if (destinationStat.dev !== session.inferiorTtyDevice || destinationStat.ino !== session.inferiorTtyInode || (destinationStat.mode & constants.S_IFMT) !== constants.S_IFCHR || await realpath(destination) !== session.inferiorTty) throw new Error(`Inferior descriptor ${descriptor} is not routed to the selected TTY.`);
				}
			}
			/**
			* Detach resumes the inferior, which would then read the commands that must
			* confirm the detach. Only sharing the command stream is refused: a target may
			* close or replace its own stdin, and neither can consume those commands.
			*/
			async #verifyInferiorStdinIsolated(session, pid) {
				let inferiorStdin;
				try {
					inferiorStdin = await stat(`/proc/${pid}/fd/0`);
				} catch (cause) {
					if (cause.code === "ENOENT") return;
					throw cause;
				}
				const commandStream = await stat(`/proc/${String(session.launched.process.pid)}/fd/0`);
				if (inferiorStdin.dev === commandStream.dev && inferiorStdin.ino === commandStream.ino) throw new Error("Inferior stdin is the Rizin command stream rather than the selected TTY; detaching would let the target consume debugger commands.");
			}
			async #synchronizeCleanup(session) {
				const stdin = session.launched.process.stdin;
				if (stdin === null || stdin === undefined || stdin.destroyed || !stdin.writable) throw new Error("Rizin stdin is unavailable during cleanup synchronization.");
				session.ready = false;
				session.frames.length = 0;
				session.queuedFrameBytes = 0;
				const marker = `__REA_CLEANUP_SYNC_${randomUUID().replaceAll("-", "")}__`;
				await new Promise((resolve, reject) => {
					let settled = false;
					const finish = (cause) => {
						if (settled) return;
						settled = true;
						clearTimeout(timer);
						session.cleanupSynchronization = undefined;
						if (cause === undefined) {
							session.stopReason ??= session.protocolError;
							session.protocolError = undefined;
							session.commandOutputDropped = false;
							resolve();
						} else reject(cause);
					};
					const timer = setTimeout(() => finish(new Error("Rizin cleanup synchronization marker was not observed.")), CLEANUP_COMMAND_TIMEOUT_MS);
					session.cleanupSynchronization = {
						marker,
						resolve: () => finish(),
						reject: (cause) => finish(cause)
					};
					try {
						stdin.write(`!echo ${marker}\n`, "utf8", (cause) => {
							if (cause) session.cleanupSynchronization?.reject(cause);
						});
					} catch (cause) {
						finish(cause instanceof Error ? cause : new Error("Rizin cleanup synchronization write failed.", { cause }));
					}
				});
			}
			async #runInternalCommand(session, command) {
				if (hasUnclaimedRizinFrames(session)) throw new Error("Unsolicited Rizin output prevents correlated cleanup readback.");
				const marker = `__REA_CLEANUP_COMPLETE_${randomUUID().replaceAll("-", "")}__`;
				const stdin = session.launched.process.stdin;
				if (stdin === null || stdin === undefined || stdin.destroyed || !stdin.writable) throw new Error("Rizin stdin is unavailable during cleanup.");
				stdin.write(`${command}\n!echo ${marker}\n`);
				const captured = await waitForCommandFrames(session, marker, CLEANUP_COMMAND_TIMEOUT_MS, debuggerControlReplyOutput);
				if (!captured.ok) throw captured.error.cause;
				if (captured.value.outputTruncated) throw new Error("Rizin cleanup readback was truncated.");
				return captured.value.output;
			}
			#finalizeCommandObservation(session, observation, stopped, signal) {
				if (signal?.aborted) {
					const primary = cancelledBy("rizin_debug_command", rizinCancellationReason(signal, undefined), {
						capturedOutput: {
							stdout: observation.result.output,
							stderr: "",
							truncated: observation.result.output_truncated
						},
						partialObservation: observation.evidence
					});
					return err(this.#finalizeFailure(session, "rizin_debug_command", primary, stopped, signal));
				}
				if (stopped.status !== "incomplete") return ok(observation);
				const stop = this.#stopReason(session);
				return err(this.#sessions.retainCleanupFailure(session, "rizin_debug_command", stopped, {
					partialObservation: observation.evidence,
					...stop === undefined ? {} : { diagnostics: { session_stop: stop.code } }
				}));
			}
			#finalizeFailure(session, operation, primary, stopped, signal) {
				if (signal?.aborted && !(primary instanceof AnalysisCancelledError)) primary.retainSecondaryFailure(cancelledBy(operation, signal), { finalization_cancelled: true });
				if (stopped.status !== "incomplete") return primary;
				if (primary instanceof AnalysisCancelledError) return this.#sessions.retainCleanupFailure(session, operation, stopped, { cause: primary });
				const cleanup = this.#sessions.retainCleanupFailure(session, operation, stopped);
				const composed = analysisErrorWithCleanupDependencies(primary, cleanup, operation).retainDiagnostics(incompleteStopFacts(stopped, [session.id]).diagnostics);
				return this.#sessions.retain(session, composed);
			}
			async #stopAfterProtocolFailure(session, protocolFailure, cause, options = {}) {
				const stopped = await this.#stopDebuggerOnly(session, options.commandTurnHeld);
				const errorOptions = {
					cause,
					...options.partialObservation === undefined ? {} : { partialObservation: options.partialObservation }
				};
				const primary = new AnalysisCapabilityUnavailableError("rizin", "rizin_debug_command", protocolFailure.reason, {
					...errorOptions,
					diagnostics: { session_stop: protocolFailure.code }
				});
				return this.#finalizeFailure(session, "rizin_debug_command", primary, stopped, options.signal);
			}
		};
		parseRizinPtraceRows = (output) => {
			let parsed;
			try {
				parsed = JSON.parse(output);
			} catch (cause) {
				throw new Error("Rizin returned malformed JSON for `olj`.", { cause });
			}
			if (!Array.isArray(parsed)) throw new Error("Rizin `olj` response is not an array.");
			const rows = [];
			for (const row of parsed) {
				if (typeof row !== "object" || row === null || typeof row.fd !== "number" || !Number.isSafeInteger(row.fd) || row.fd < 0 || typeof row.raised !== "boolean" || typeof row.uri !== "string") throw new Error("Rizin `olj` response contains a malformed descriptor row.");
				const uri = row.uri;
				const match = /^ptrace:\/\/(\d+)$/u.exec(uri);
				if (match !== null) {
					if (row.raised !== true) throw new Error("Rizin `olj` ptrace descriptor is not active.");
					rows.push([String(row.fd), match[1]]);
				} else if (uri.startsWith("ptrace://")) throw new Error("Rizin `olj` returned a malformed ptrace URI.");
			}
			return rows;
		};
		assertRizinProcessStartTimeStable = (before, after) => {
			if (after !== before) throw new Error("The inferior PID disappeared or was reused during detach verification.");
		};
		hasUnclaimedRizinFrames = (session) => session.frames.length > 0 || session.bufferedFrameBytes > 0 || session.discardingOversizedFrame;
		bufferedRizinFrame = (session, truncated) => {
			const bytes = Buffer.concat(session.frameChunks, session.bufferedFrameBytes);
			const invalidUtf8 = !isUtf8(bytes);
			session.invalidUtf8Observed ||= invalidUtf8;
			return {
				bytes: bytes.length,
				frame: {
					text: bytes.toString("utf8"),
					truncated,
					invalidUtf8
				}
			};
		};
		rizinCaptureStoppedSentence = (limit, output, cleanupFailure) => {
			const cap = limit === "command_frames" ? `the ${String(MAX_COMMAND_FRAMES)} frame command limit` : limit === "frame_bytes" ? `the ${String(MAX_FRAME_BYTES)} byte frame limit` : limit === "queued_frames" ? `the queued frame limit of ${String(MAX_QUEUED_FRAMES)} frames or ${String(MAX_QUEUED_FRAME_BYTES)} bytes` : limit === "command_output_bytes" ? `the ${String(output.value)} byte output limit` : "a capture limit";
			const cleanup = cleanupFailure === undefined ? " The owned debugger session was stopped." : ` The owned debugger session remains retained because cleanup could not be verified: ${cleanupFailure}`;
			const recovery = limit === "command_output_bytes" ? ` ${debuggerAdmissionRecovery(output)}` : " This release has no runtime override.";
			return `The Rizin command exceeded ${cap}.${recovery} Retained output is partial and command completion is unknown.${cleanup}`;
		};
		waitForCommandFrames = async (session, marker, timeoutMs, commandOutput, signal) => {
			const maxCommandOutputBytes = commandOutput.value;
			const deadline = Deadline.after(timeoutMs);
			const output = [];
			let outputBytes = 0;
			let outputInvalidUtf8 = false;
			let outputTruncated = false;
			let outputLimit;
			let frameCount = 0;
			const noteLimit = (limit) => {
				outputTruncated = true;
				outputLimit ??= limit;
			};
			const snapshot = () => {
				const dropped = session.commandOutputDropped;
				const limit = outputLimit ?? (dropped ? "queued_frames" : undefined);
				return {
					output: output.join("\n"),
					outputTruncated: outputTruncated || dropped,
					outputInvalidUtf8,
					...limit === undefined ? {} : { outputLimit: limit }
				};
			};
			const append = (frame) => {
				outputInvalidUtf8 ||= frame.invalidUtf8;
				if (frame.truncated) noteLimit("frame_bytes");
				const markerIndex = frame.text.indexOf(marker);
				const text = markerIndex < 0 ? frame.text : frame.text.slice(0, markerIndex);
				if (markerIndex >= 0 && text.length === 0) return true;
				const separatorBytes = output.length > 0 ? 1 : 0;
				const remaining = maxCommandOutputBytes - outputBytes - separatorBytes;
				const bytes = Buffer.byteLength(text, "utf8");
				if (bytes > remaining) {
					noteLimit("command_output_bytes");
					const retained = utf8HeadExcerpt(text, remaining).text;
					if (retained.length > 0) output.push(retained);
					outputBytes = maxCommandOutputBytes;
				} else {
					output.push(text);
					outputBytes += separatorBytes + bytes;
				}
				return markerIndex >= 0;
			};
			const interrupted = () => {
				let markerSeen = false;
				for (;;) {
					const queued = session.frames.shift();
					if (queued === undefined) break;
					session.queuedFrameBytes -= queued.queueChargeBytes;
					frameCount += 1;
					if (frameCount > MAX_COMMAND_FRAMES) {
						noteLimit("command_frames");
						break;
					}
					markerSeen = append(queued.frame);
					if (markerSeen || outputTruncated) break;
				}
				if (!markerSeen && !outputTruncated && session.bufferedFrameBytes > 0) append(bufferedRizinFrame(session, session.discardingOversizedFrame).frame);
				else if (session.bufferedFrameBytes > 0 && !markerSeen) outputTruncated = true;
				session.frameChunks = [];
				session.bufferedFrameBytes = 0;
				return snapshot();
			};
			for (;;) {
				if (session.protocolError !== undefined) {
					const capture = interrupted();
					if (session.commandOutputDropped) return ok(capture);
					return err({
						kind: "failed",
						cause: new Error(session.protocolError.reason),
						capture
					});
				}
				const remaining = deadline.remainingMs();
				if (remaining <= 0) return err({
					kind: "timeout",
					cause: new RizinFrameTimeoutError(),
					capture: interrupted()
				});
				let received;
				try {
					received = await waitForFrame(session, remaining, signal);
				} catch (cause) {
					let drained = true;
					if (cause instanceof RizinProcessExitError) {
						drained = await session.supervisor.waitForOutputClose(CLEANUP_COMMAND_TIMEOUT_MS);
					}
					const captured = interrupted();
					return err({
						kind: cause instanceof AnalysisCancelledError ? "cancelled" : cause instanceof RizinProcessExitError ? "exited" : cause instanceof RizinFrameTimeoutError ? "timeout" : "failed",
						cause,
						capture: {
							...captured,
							outputTruncated: captured.outputTruncated || !drained
						}
					});
				}
				frameCount += 1;
				if (frameCount > MAX_COMMAND_FRAMES) {
					session.protocolError = {
						code: "output-correlation-failure",
						reason: `Rizin emitted more than ${String(MAX_COMMAND_FRAMES)} frames for one command. This release has no runtime override. The session was stopped because output correlation is ambiguous.`
					};
					noteLimit("command_frames");
					return ok(snapshot());
				}
				const markerSeen = append(received);
				if (outputTruncated) {
					if (outputLimit === "command_output_bytes") session.protocolError ??= {
						code: "output-correlation-failure",
						reason: commandOutput === debuggerControlReplyOutput ? `Rizin control readback exceeded the ${String(maxCommandOutputBytes)} byte control-reply budget. That budget is separate from REA_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES and has no runtime override.` : `Rizin command output exceeded the ${String(maxCommandOutputBytes)} byte command limit. ${debuggerAdmissionRecovery(commandOutput)}`
					};
					else if (outputLimit === "frame_bytes") session.protocolError ??= {
						code: "output-correlation-failure",
						reason: `Rizin emitted a NUL frame exceeding the ${String(MAX_FRAME_BYTES)} byte (16 MiB) protocol limit. This release has no runtime override.`
					};
					return ok(snapshot());
				}
				if (markerSeen) return ok(snapshot());
			}
		};
		waitForFrame = (session, timeoutMs, signal) => {
			if (signal?.aborted) return Promise.reject(cancelledBy("rizin_debug_command", signal));
			const queued = session.frames.shift();
			if (queued !== undefined) {
				session.queuedFrameBytes -= queued.queueChargeBytes;
				return Promise.resolve(queued.frame);
			}
			if (session.exited) return Promise.reject(new RizinProcessExitError());
			return new Promise((resolve, reject) => {
				const cleanup = () => {
					clearTimeout(timer);
					signal?.removeEventListener("abort", onAbort);
					const index = session.frameWaiters.indexOf(waiter);
					if (index >= 0) session.frameWaiters.splice(index, 1);
				};
				const onAbort = () => {
					cleanup();
					reject(cancelledBy("rizin_debug_command", carriedReason(signal?.reason)));
				};
				const timer = setTimeout(() => {
					cleanup();
					reject(new RizinFrameTimeoutError());
				}, timeoutMs);
				const waiter = {
					resolve: (frame) => {
						cleanup();
						resolve(frame);
					},
					reject: (cause) => {
						cleanup();
						reject(cause);
					}
				};
				session.frameWaiters.push(waiter);
				signal?.addEventListener("abort", onAbort, { once: true });
				if (signal?.aborted) onAbort();
			});
		};
		waitForTurn = (previous, signal) => {
			if (signal === undefined) return previous;
			return waitForAbortable(previous, signal).then((outcome) => {
				if (outcome instanceof AbortedWait) throw cancelledBy("rizin_debug_command", outcome);
			});
		};
		rizinCancellationReason = (signal, cause) => isAborted(signal) ? signal : cause instanceof AnalysisCancelledError ? cause : carriedReason(cause);
	})))();
}

//#endregion
//#region dist/composition/debuggerSessions.js
var createGdbSessionManager, createRizinDebugSessionManager;
function init_debuggerSessions() {
	return (init_debuggerSessions = __esmMin((() => {
		init_GdbSessionManager();
		init_RizinDebugSessionManager();
		createGdbSessionManager = (environment = process.env, options = {}) => new GdbSessionManager({
			...options,
			environment
		});
		createRizinDebugSessionManager = (environment = process.env, options = {}) => new RizinDebugSessionManager(environment, options);
	})))();
}

//#endregion
//#region dist/cli/reverseEngineeringCommands.js
var reverseEngineeringCommands_exports = /* @__PURE__ */ __exportAll({ registerReverseEngineeringCommands: () => registerReverseEngineeringCommands });
var executeWithCleanup, cleanupOnlyCompleteEvidence, closeDebuggerCommandSession, registerReverseEngineeringCommands;
function init_reverseEngineeringCommands() {
	return (init_reverseEngineeringCommands = __esmMin((() => {
		init_localPath();
		init_ObjdumpProviderIdentity();
		init_RizinProviderIdentity();
		init_reverseEngineering();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_evidenceValidation();
		init_result();
		init_analysisErrorProjection();
		init_reverseEngineering$1();
		init_cliLogging();
		init_commandRegistry();
		init_commandCancellation();
		init_cliCommandNames();
		init_reverseEngineeringToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_GdbSessionManager();
		init_debuggerSessions();
		init_providerCleanupError();
		init_ownedDebuggerCleanupError();
		init_analysisEvidenceDelivery();
		init_finishAnalysisCommand();
		init_projectCliAnalysisResult();
		init_errorMessage();
		executeWithCleanup = async (service, signal, execute, operation) => finishAnalysisCommand(execute, service, operation === "inspect_with_objdump" ? OBJDUMP_PROVIDER_IDENTITY.id : RIZIN_PROVIDER_IDENTITY.id, operation, signal, undefined, { recoverResolvedCleanup: cleanupOnlyCompleteEvidence });
		cleanupOnlyCompleteEvidence = (error) => {
			if (!(error instanceof AnalysisOutputError) || !error.cleanupOnly || error.partialObservation === undefined) return undefined;
			const parsed = recognizeEvidence(error.partialObservation);
			if (!parsed.ok || parsed.value === undefined) return undefined;
			const normalized = parsed.value.normalized_result;
			return isRecord(normalized) && normalized.completion_status !== "unknown" ? parsed.value : undefined;
		};
		closeDebuggerCommandSession = async (manager, sessionId, providerId, operation, log) => {
			if (sessionId !== undefined) {
				try {
					const closed = await manager.close(sessionId);
					if (!closed.ok) log(projectAnalysisError(closed.error));
				} catch (cause) {
					log(cause instanceof Error ? cause.message : "Unknown cleanup failure");
				}
			}
			try {
				await manager.closeAll();
			} catch (cause) {
				const retainedPids = retainedDebuggerProcessIds(cause);
				throw new ProviderCleanupError(providerId, sessionId === undefined ? [] : [sessionId], {
					reason: cause instanceof AggregateError ? cause.errors.map((error) => errorMessage(error)).join("; ") : errorMessage(cause),
					...retainedDebuggerDiagnostics(cause)
				}, {
					cause,
					operation,
					...retainedPids.length === 0 ? {} : { remediationAction: retainedDebuggerRemediation(retainedPids) }
				});
			}
		};
		registerReverseEngineeringCommands = (cli, logger, environment, createGdbManager = createGdbSessionManager, createService = createReverseEngineeringService) => {
			const service = createService(environment);
			const objdump = contractNamed(REVERSE_ENGINEERING_TOOL_CONTRACTS, "inspect_with_objdump");
			const inspectWithObjdump = async (input, { signal, delivery }) => {
				if (delivery === undefined) throw new Error("inspect_with_objdump delivers Evidence");
				const result = await executeWithCleanup(service, signal, () => service.inspectWithObjdump(input, { signal }), "inspect_with_objdump");
				return result.ok ? publishCliAnalysisEvidence(result, {
					operation: "inspect_with_objdump",
					signal,
					detail: delivery.detail,
					evidenceOutput: delivery.evidenceOutput
				}) : result.error;
			};
			registerContractCommand(cli, logger, objdump, {
				description: "Inspect a local artifact using GNU-style objdump arguments and retain the selected command output as Evidence",
				inputBranches: {
					field: "operation",
					values: OBJDUMP_ARTIFACT_OPERATIONS
				},
				positionals: ["path", "operation"],
				evidenceDelivery: true,
				fields: {
					path: { description: "Path to the local artifact to inspect." },
					operation: { description: "GNU-style objdump operation to run." },
					symbol: { description: "Native symbol to select with the disassemble operation; the selected executable controls matching and boundaries." },
					follow_debug_links: { description: "Follow local DWARF debug links. External debug-file identity is not bound to Evidence." }
				}
			}, inspectWithObjdump);
			registerContractCommand(cli, logger, objdump, {
				command: CLI_COMMANDS.listObjdumpArchitectures,
				description: "Capture the selected objdump command response to -i",
				inputBranches: {
					field: "operation",
					values: ["architectures"]
				},
				evidenceDelivery: true
			}, inspectWithObjdump);
			registerContractCommand(cli, logger, contractNamed(REVERSE_ENGINEERING_TOOL_CONTRACTS, "execute_rizin_command"), {
				description: "Execute one Rizin command against a local artifact",
				positionals: ["path", "command"],
				fields: {
					path: { description: "Path to the local artifact to analyze." },
					command: { description: "One caller-selected Rizin command." }
				}
			}, async (input, { signal }) => projectCliAnalysisResult(await executeWithCleanup(service, signal, () => service.executeRizinCommand(input, { signal }), "execute_rizin_command")));
			registerCliCommand(cli, CLI_COMMANDS.debugWithGdb, {
				description: "Run one unrestricted GDB console command in an ephemeral MI session; provide an inferior TTY so a live target can be safely detached",
				args: z.object({ command: z.string().min(1).describe("One unrestricted GDB console command.") }),
				options: z.object({
					executable: z.string().min(1).optional().describe("Initial local file to hash and load without running it; command Evidence retains this initial selection."),
					inferiorTty: z.string().min(1).describe("Caller-selected durable TTY for output from a live GDB inferior."),
					...analysisEvidenceDeliveryOptions
				}),
				run: ({ args, options }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.debugWithGdb, async () => {
					const delivery = {
						providerId: "gdb",
						operation: "gdb_console",
						signal,
						detail: options.detail,
						evidenceOutput: options.evidence_output
					};
					const inputError = cliEvidenceDeliveryInputError(delivery);
					if (inputError !== undefined) return projectAnalysisError(inputError);
					if (gdbOneShotCommandMayInvalidateDetachProof(args.command)) return projectAnalysisError(new AnalysisInputError("gdb_console", undefined, [{
						path: ["command"],
						reason: "invalid_value",
						message: "This command can invalidate the verified inferior output route; use the persistent GDB session workflow."
					}]));
					const manager = createGdbManager(environment);
					let sessionId;
					return deliverCliAnalysisEvidence({
						...delivery,
						run: async () => {
							const started = await manager.start(signal, {
								inferiorTty: options.inferiorTty,
								...options.executable === undefined ? {} : { executable: options.executable }
							});
							if (!started.ok) return started;
							sessionId = started.value.session_id;
							const executed = await manager.execute(sessionId, args.command, signal);
							return executed.ok ? ok(executed.value.evidence) : executed;
						},
						service: { close: () => closeDebuggerCommandSession(manager, sessionId, "gdb", "gdb_console", (cleanup) => logger.error({
							command: CLI_COMMANDS.debugWithGdb,
							cleanup
						}, "GDB cleanup failed after collecting command output")) }
					});
				}))
			}, { operations: [{
				name: "gdb_console",
				flags: {}
			}] });
			registerCliCommand(cli, CLI_COMMANDS.debugWithRizin, {
				description: "Run one unrestricted Rizin debugger command in an ephemeral session",
				args: z.object({
					path: localPathStringSchema.describe("Path to the local artifact to debug."),
					command: z.string().min(1).describe("One unrestricted Rizin debugger command.").refine((value) => !/[\r\n]/u.test(value))
				}),
				options: z.object({
					inferiorTty: z.string().min(1).describe("Caller-selected Linux TTY for inferior stdin, stdout and stderr."),
					backend: z.string().min(1).optional().describe("Optional Rizin IO debugger backend name.")
				}),
				run: ({ args, options }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.debugWithRizin, async () => {
					const manager = createRizinDebugSessionManager(environment);
					let sessionId;
					return finishAnalysisCommand(async () => {
						const started = await manager.start({
							...args,
							inferior_tty: options.inferiorTty,
							...options.backend === undefined ? {} : { backend: options.backend }
						}, signal);
						if (!started.ok) return started;
						sessionId = started.value.session_id;
						const executed = await manager.execute(sessionId, args.command, signal);
						return executed.ok ? ok(executed.value.evidence) : executed;
					}, { close: () => closeDebuggerCommandSession(manager, sessionId, "rizin", "rizin_debug_command", (cleanup) => logger.error({
						command: CLI_COMMANDS.debugWithRizin,
						cleanup
					}, "Rizin cleanup failed after collecting command output")) }, "rizin", "rizin_debug_command", signal).then(projectCliAnalysisResult);
				}))
			}, { operations: [{
				name: "rizin_debug_command",
				flags: {}
			}] });
		};
	})))();
}

//#endregion
export { init_reverseEngineeringCommands, reverseEngineeringCommands_exports };