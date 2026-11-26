import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisTimeoutError, cancelledBy, carriedReason, errorMessage, explicitValueSpans, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_explicitSensitiveValues, init_sha256Hex, isAborted, resolvedAnalysisError, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, init_AnalysisCleanupLease, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError, providerCleanupErrorFromFailures } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_jsonStringByteLength, jsonStringByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_explicitSensitiveFailure, redactExplicitFailure } from "./explicitSensitiveFailure-C747xsnc.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { FRIDA_CAPTURE_MAX_JSON_DEPTH, fridaCapturePolicySchema, fridaSessionStatusInputSchema, init_fridaCapturePolicy, init_fridaSessionStatus, resolveFridaCapturePolicy } from "./analysisViewResult-vDCF9Pxo.js";
import { init_AnalysisViewService, requireAnalysisViewRetention, summarizeRetainedAnalysis } from "./AnalysisViewService-D_M3W3PD.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { FRIDA_TOOL_CONTRACTS, init_fridaRemoteAddress, init_fridaToolContracts, isValidFridaRemoteAddress } from "./fridaToolContracts-COjdPrAV.js";
import { constants } from "node:fs";
import { z } from "zod";
import { isUtf8 } from "node:buffer";
import { randomUUID } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import { setTimeout } from "node:timers/promises";

//#region dist/domain/fridaCaptureLimits.js
var MAX_MESSAGE_METADATA_BYTES, FRIDA_OWNED_CAPTURE_LIMITS, OWNED_CAPTURE_LIMITS, namedLimit, limitationFor, collectOwnedCaps, fridaCaptureLimitations;
function init_fridaCaptureLimits() {
	return (init_fridaCaptureLimits = __esmMin((() => {
		init_fridaCapturePolicy();
		MAX_MESSAGE_METADATA_BYTES = 128 * 1024;
		FRIDA_OWNED_CAPTURE_LIMITS = [
			"session_bytes",
			"message_type",
			"message_text",
			"payload_bytes",
			"json_nodes",
			"json_depth",
			"binary_bytes",
			"unrepresentable"
		];
		OWNED_CAPTURE_LIMITS = new Set(FRIDA_OWNED_CAPTURE_LIMITS);
		namedLimit = (value) => typeof value === "string" && OWNED_CAPTURE_LIMITS.has(value) ? value : undefined;
		limitationFor = (limit, policy) => {
			const recover = (field, value, unit) => value === undefined ? `Frida capture reached capture_limits.${field}; its selected value is unknown because the observation did not report a valid capture policy. Select capture_limits.${field} before starting a new explicitly chosen session or instrument_with_frida experiment. Already discarded observations cannot be recovered. Session bytes and MCP/client delivery budgets remain independent.` : `Frida capture reached capture_limits.${field} (${String(value)} ${unit}). Select a larger capture_limits.${field} before starting a new explicitly chosen session or instrument_with_frida experiment; no REA restart is required. Already discarded observations cannot be recovered. Session bytes and MCP/client delivery budgets remain independent.`;
			switch (limit) {
				case "session_bytes":
				case "payload_bytes":
				case "binary_bytes": return recover("session_bytes", policy?.session_bytes, "bytes including JSON/base64 expansion and metadata");
				case "message_type": return recover("message_type_bytes", policy?.message_type_bytes, "bytes");
				case "message_text": return recover("message_text_bytes", policy?.message_text_bytes, "bytes");
				case "json_nodes": return recover("json_nodes", policy?.json_nodes, "nodes");
				case "json_depth": return policy === undefined || policy.json_depth < FRIDA_CAPTURE_MAX_JSON_DEPTH ? recover("json_depth", policy?.json_depth, "levels") + ` The maximum is ${String(FRIDA_CAPTURE_MAX_JSON_DEPTH)} levels, reserving the surrounding Evidence envelope.` : `Frida capture reached capture_limits.json_depth (${String(policy.json_depth)} levels), the shared JSON representation allowance after reserving the Evidence envelope. No higher depth is supported. Select a script that sends shallower payloads for a new explicitly chosen experiment. Already discarded observations cannot be recovered.`;
				case "unrepresentable": return "A Frida value could not be represented as JSON. Increasing capture budgets cannot recover cyclic, non-finite or unsupported values. Already discarded observations cannot be recovered.";
			}
		};
		collectOwnedCaps = (value, caps) => {
			if (typeof value !== "object" || value === null) return;
			if (Array.isArray(value)) {
				for (const item of value) collectOwnedCaps(item, caps);
				return;
			}
			const record = value;
			if (record.messages_truncated === true) caps.add("session_bytes");
			if (record.type_truncated === true) caps.add("message_type");
			if (record.description_truncated === true || record.stack_truncated === true || record.file_name_truncated === true) caps.add("message_text");
			if (record.payload_truncated === true) caps.add(namedLimit(record.payload_capture_limit) ?? "payload_bytes");
			if (record.data_truncated === true) caps.add(namedLimit(record.data_capture_limit) ?? "binary_bytes");
			for (const [key, child] of Object.entries(record)) {
				if (key === "payload") continue;
				collectOwnedCaps(child, caps);
			}
		};
		fridaCaptureLimitations = (result) => {
			const caps = new Set();
			const selected = typeof result === "object" && result !== null && "capture_limits" in result ? fridaCapturePolicySchema.safeParse(result.capture_limits) : undefined;
			const policy = selected?.success === true ? selected.data : undefined;
			collectOwnedCaps(result, caps);
			return FRIDA_OWNED_CAPTURE_LIMITS.flatMap((limit) => caps.has(limit) ? [limitationFor(limit, policy)] : []);
		};
	})))();
}

//#endregion
//#region dist/domain/fridaInputErrors.js
var unknownFridaSession, unknownFridaScript;
function init_fridaInputErrors() {
	return (init_fridaInputErrors = __esmMin((() => {
		init_analysisErrorCore();
		unknownFridaSession = (operation, sessionId) => new AnalysisInputError(operation, undefined, [{
			path: ["session_id"],
			reason: "invalid_value",
			message: `No open Frida session ${sessionId}; start one with start_frida_session.`
		}]);
		unknownFridaScript = (operation, scriptId) => new AnalysisInputError(operation, undefined, [{
			path: ["script_id"],
			reason: "invalid_value",
			message: `No loaded Frida script ${scriptId} in this session.`
		}]);
	})))();
}

//#endregion
//#region dist/ports/frida/FridaInstrumentationPort.js
var FridaScriptLoadCancelledError;
function init_FridaInstrumentationPort() {
	return (init_FridaInstrumentationPort = __esmMin((() => {
		init_analysisErrorCore();
		FridaScriptLoadCancelledError = class extends AnalysisCancelledError {
			script;
			scriptHandleAcquired;
			constructor(script, options) {
				super("load_frida_script", options);
				this.script = script;
				this.scriptHandleAcquired = options?.scriptHandleAcquired ?? true;
			}
		};
	})))();
}

//#endregion
//#region dist/application/frida/FridaInstrumentationService.js
var unreadableScriptFile, rejectBeforeStart, FridaInstrumentationService, fridaEvidence, cancelledFridaSession, fridaParameters, sourceOutput, scriptOutput, sessionStatusOutput, cancelledScriptEvidence;
function init_FridaInstrumentationService() {
	return (init_FridaInstrumentationService = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_analysisErrorCancellation();
		init_analysisErrorCore();
		init_result();
		init_fridaSessionStatus();
		init_AnalysisInput();
		init_AnalysisViewService();
		init_fridaCaptureLimits();
		init_fridaInputErrors();
		init_FridaInstrumentationPort();
		unreadableScriptFile = async (source) => {
			if (source.sourceKind !== "file") return undefined;
			let reason;
			let cause;
			try {
				if (!(await stat(source.path)).isFile()) reason = "it is not a regular file";
				else {
					await access(source.path, constants.R_OK);
					return undefined;
				}
			} catch (failure) {
				cause = failure;
				const code = failure instanceof Error && "code" in failure ? failure.code : undefined;
				if (code === "EACCES" || code === "EPERM") return new AnalysisAccessDeniedError("instrument_with_frida", source.path, code, { cause });
				reason = code === "ENOENT" ? "no file exists there" : String(code ?? failure);
			}
			return new AnalysisInputError("instrument_with_frida", cause === undefined ? undefined : { cause }, [{
				path: ["path"],
				reason: "invalid_value",
				message: `Cannot read Frida script file ${source.path}: ${reason}.`
			}]);
		};
		rejectBeforeStart = async (source, signal) => {
			if (isAborted(signal)) return cancelledBy("instrument_with_frida", signal);
			const unreadable = await unreadableScriptFile(source);
			return isAborted(signal) ? cancelledBy("instrument_with_frida", signal) : unreadable;
		};
		FridaInstrumentationService = class {
			#provider;
			constructor(provider) {
				this.#provider = provider;
			}
			async listDevices(remote) {
				const result = await this.#provider.listDevices(remote);
				return result.ok ? ok({
					devices: result.value.devices.map(({ deviceId, name, type }) => ({
						device_id: deviceId,
						name,
						type
					})),
					cleanup_error: result.value.cleanupError
				}) : result;
			}
			async listProcesses(selector) {
				const result = await this.#provider.listProcesses(selector);
				return result.ok ? ok({
					device_id: result.value.deviceId,
					processes: [...result.value.processes],
					cleanup_error: result.value.cleanupError
				}) : result;
			}
			async startSession(input, signal) {
				return this.#startSession(input, signal, "start_frida_session");
			}
			async #startSession(input, signal, operation) {
				if (signal?.aborted) return err(cancelledBy(operation, signal));
				const started = await this.#provider.startSession(input);
				if (!started.ok && signal?.aborted) return err(analysisErrorWithCancellation(started.error, cancelledBy(operation, signal)));
				if (!started.ok || !signal?.aborted) return started;
				return this.#cancelSession(operation, started.value, input, signal.reason);
			}
			async #cancelSession(operation, session, input, cause, load) {
				const loaded = load?.script;
				const status = this.#provider.status(session.sessionId);
				const observation = status ?? {
					...session,
					targetResumeObserved: false,
					scripts: [],
					messages: loaded?.messages ?? [],
					messagesTruncated: loaded?.messagesTruncated ?? false
				};
				const closed = await this.#provider.closeSession(session.sessionId);
				const statusAfterCleanup = this.#provider.status(session.sessionId);
				return err(cancelledFridaSession({
					operation,
					input,
					cause,
					diagnostics: load?.diagnostics,
					observation,
					closed,
					statusAfterCleanup,
					script: loaded
				}));
			}
			async loadScript(sessionId, source, signal) {
				if (signal?.aborted) return err(cancelledBy("load_frida_script", signal));
				const loaded = await this.#provider.loadScript(sessionId, source, signal);
				if (!loaded.ok && loaded.error instanceof FridaScriptLoadCancelledError) return err(cancelledScriptEvidence(sessionId, loaded.error));
				return loaded.ok ? ok(fridaEvidence("load_frida_script", scriptOutput(loaded.value), { session_id: sessionId }, loaded.value)) : loaded;
			}
			resumeSession(sessionId, signal) {
				return this.#provider.resumeSession(sessionId, signal);
			}
			unloadScript(sessionId, scriptId, signal) {
				return this.#provider.unloadScript(sessionId, scriptId, signal);
			}
			status(sessionId) {
				return this.#provider.status(sessionId);
			}
			inspectStatus(rawInput, retention = {
				recordEvidence: undefined,
				evidenceById: undefined
			}) {
				const input = parseAnalysisInput("frida_session_status", rawInput, fridaSessionStatusInputSchema);
				if (!input.ok) return input;
				if (input.value.detail === "summary") {
					const ready = requireAnalysisViewRetention("frida_session_status", retention);
					if (!ready.ok) return ready;
				}
				const status = this.#provider.status(input.value.session_id);
				if (status === undefined) return err(unknownFridaSession("frida_session_status", input.value.session_id));
				const evidence = fridaEvidence("frida_session_status", sessionStatusOutput(status), { session_id: input.value.session_id });
				return input.value.detail === "summary" ? summarizeRetainedAnalysis(evidence, retention) : ok(evidence);
			}
			async instrument(input, signal) {
				const rejected = await rejectBeforeStart(input.source, signal);
				if (rejected !== undefined) return err(rejected);
				const started = await this.#startSession(input, signal, "instrument_with_frida");
				if (!started.ok) return started;
				if (signal?.aborted) return this.#cancelSession("instrument_with_frida", started.value, input, signal.reason);
				const loaded = await this.#provider.loadScript(started.value.sessionId, input.source, signal);
				if (!loaded.ok && loaded.error instanceof AnalysisCancelledError) return this.#cancelSession("instrument_with_frida", started.value, input, loaded.error.cause, loaded.error instanceof FridaScriptLoadCancelledError ? loaded.error : undefined);
				if (!loaded.ok) return this.#closeFailedInstrumentation(started.value.sessionId, loaded.error, signal);
				if (signal?.aborted) return this.#cancelSession("instrument_with_frida", started.value, input, signal.reason, { script: loaded.value });
				if (started.value.mode === "spawn") {
					const resumed = await this.#provider.resumeSession(started.value.sessionId, signal);
					if (!resumed.ok && !(signal?.aborted && resumed.error instanceof AnalysisCancelledError)) return this.#closeFailedInstrumentation(started.value.sessionId, resumed.error, signal);
					if (signal?.aborted) return this.#cancelSession("instrument_with_frida", started.value, input, signal.reason, { script: loaded.value });
				}
				try {
					await setTimeout(input.durationMs, undefined, { signal });
				} catch (cause) {
					return this.#cancelSession("instrument_with_frida", started.value, input, signal?.aborted ? signal.reason : cause, { script: loaded.value });
				}
				if (signal?.aborted) return this.#cancelSession("instrument_with_frida", started.value, input, signal.reason, { script: loaded.value });
				const status = this.#provider.status(started.value.sessionId);
				const observation = status ?? {
					...started.value,
					targetResumeObserved: false,
					scripts: [],
					messages: loaded.value.messages,
					messagesTruncated: loaded.value.messagesTruncated
				};
				const closed = await this.#provider.closeSession(started.value.sessionId);
				const cleanupError = closed.ok ? null : closed.error.message;
				if (signal?.aborted) return err(cancelledFridaSession({
					operation: "instrument_with_frida",
					input,
					cause: signal.reason,
					observation,
					closed,
					statusAfterCleanup: this.#provider.status(started.value.sessionId),
					script: loaded.value
				}));
				const evidence = fridaEvidence("instrument_with_frida", {
					...sessionStatusOutput(observation),
					...sourceOutput(loaded.value),
					cleanup_error: cleanupError
				}, fridaParameters(started.value.sessionId, input, started.value.deviceId), loaded.value);
				return ok({
					evidence,
					cleanupError
				});
			}
			/** Release the failed experiment while retaining its physical and caller outcomes. */
			async #closeFailedInstrumentation(sessionId, primary, signal) {
				const closed = await this.#provider.closeSession(sessionId);
				const failure = closed.ok ? resolvedAnalysisError(primary) : analysisErrorWithCleanupDependencies(primary, closed.error, "instrument_with_frida");
				return err(signal?.aborted ? analysisErrorWithCancellation(failure, cancelledBy("instrument_with_frida", signal)) : failure);
			}
			closeSession(sessionId) {
				return this.#provider.closeSession(sessionId);
			}
			closeAll() {
				return this.#provider.closeAll();
			}
		};
		fridaEvidence = (operation, result, parameters, script) => createEvidence(unknownTarget("not-observed"), {
			id: "frida",
			name: "Frida",
			version: null
		}, {
			predicateType: "rea.frida.instrumentation-observation",
			operation,
			parameters,
			result,
			...script?.sourceRepresentation === undefined ? {} : { rawResult: { source_representation: {
				encoding: script.sourceRepresentation.encoding,
				decoding: script.sourceRepresentation.decoding,
				loaded_source_sha256: script.sourceRepresentation.loadedSourceSha256
			} } },
			confidence: "observed",
			authority: "external-service",
			environment: null,
			limitations: [
				"The target operating system and architecture were not reported by this observation.",
				...fridaCaptureLimitations(result),
				...script?.sourceRepresentation === undefined ? [] : ["Invalid UTF-8 in the selected script file was decoded with replacement characters. source_sha256 identifies the original file bytes; raw_result.source_representation.loaded_source_sha256 identifies the UTF-8 encoding of the string passed to Frida."]
			]
		});
		cancelledFridaSession = ({ operation, input, cause, diagnostics, observation, closed, statusAfterCleanup, script }) => {
			const cleanupError = closed.ok ? null : closed.error.message;
			const failure = cancelledBy(operation, carriedReason(cause), {
				diagnostics,
				partialObservation: fridaEvidence(operation, {
					...sessionStatusOutput(observation),
					...script === undefined ? {} : sourceOutput(script),
					cleanup_error: cleanupError,
					target_state_before_cleanup: observation.state,
					target_resume_observed: observation.targetResumeObserved || closed.ok && closed.value.targetResumeObserved || statusAfterCleanup?.targetResumeObserved === true,
					instrumentation_cleanup: closed.ok ? "released" : "incomplete_or_unknown",
					target_liveness_after_cleanup: "unknown"
				}, fridaParameters(observation.sessionId, input, observation.deviceId), script),
				...closed.ok ? {} : { cleanup: {
					reason: closed.error.message,
					resources: [observation.sessionId]
				} }
			});
			return closed.ok ? failure : failure.bindCleanupDependencies([closed.error]);
		};
		fridaParameters = (sessionId, input, deviceId) => ({
			session_id: sessionId,
			device_id: deviceId,
			...input.remote === undefined ? {} : { remote: {
				address: input.remote.address,
				...input.remote.origin === undefined ? {} : { origin: input.remote.origin },
				...input.remote.keepaliveInterval === undefined ? {} : { keepalive_interval: input.remote.keepaliveInterval }
			} },
			mode: input.mode,
			...input.captureLimits === undefined ? {} : { capture_limits: input.captureLimits },
			...input.mode === "attach" ? { pid: input.pid } : {
				program: input.program,
				...input.argv === undefined ? {} : { argv: input.argv }
			}
		});
		sourceOutput = (script) => ({
			source_kind: script.sourceKind,
			source_path: script.sourcePath,
			source_sha256: script.sourceSha256
		});
		scriptOutput = (script) => ({
			...script.captureLimits === undefined ? {} : { capture_limits: script.captureLimits },
			script_id: script.scriptId,
			...sourceOutput(script),
			messages: script.messages,
			messages_truncated: script.messagesTruncated
		});
		sessionStatusOutput = (status) => ({
			...status.captureLimits === undefined ? {} : { capture_limits: status.captureLimits },
			session_id: status.sessionId,
			device_id: status.deviceId,
			state: status.state,
			target: status.target,
			pid: status.pid,
			mode: status.mode,
			scripts: status.scripts.map((script) => ({
				script_id: script.scriptId,
				name: script.name
			})),
			messages: status.messages,
			messages_truncated: status.messagesTruncated
		});
		cancelledScriptEvidence = (sessionId, error) => cancelledBy(error.operation, carriedReason(error.cause), {
			diagnostics: error.diagnostics,
			cleanup: error.cleanup,
			partialObservation: fridaEvidence(error.operation, {
				...scriptOutput(error.script),
				cleanup_error: error.cleanup?.reason ?? null,
				script_cleanup: !error.scriptHandleAcquired ? "no_handle" : error.cleanupIncomplete ? "incomplete_or_unknown" : "released"
			}, { session_id: sessionId }, error.script)
		}).bindCleanupDependencies([error]);
	})))();
}

//#endregion
//#region dist/frida/FridaInstrumentationManager.js
var DEVICE_LOOKUP_TIMEOUT_MS, FRIDA_DEVICE_LOOKUP_TIMEOUT_MESSAGE, isFridaDeviceLookupTimeout, FridaInstrumentationManager, boundedRedactedString, clipped, boundedJsonValue, remoteOptions, sessionState, sessionObservation, sanitizeError, providerError, cancelledOperation, markMessageTruncated, MessageFifo;
function init_FridaInstrumentationManager() {
	return (init_FridaInstrumentationManager = __esmMin((() => {
		init_FridaInstrumentationPort();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_fridaRemoteAddress();
		init_explicitSensitiveFailure();
		init_explicitSensitiveValues();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_resources();
		init_jsonStringByteLength();
		init_result();
		init_fridaInputErrors();
		init_fridaCaptureLimits();
		init_fridaCapturePolicy();
		init_inputIssueProjection();
		init_errorMessage();
		init_sha256Hex();
		DEVICE_LOOKUP_TIMEOUT_MS = 1e3;
		FRIDA_DEVICE_LOOKUP_TIMEOUT_MESSAGE = "Device not found";
		isFridaDeviceLookupTimeout = (cause) => cause instanceof Error && cause.message === FRIDA_DEVICE_LOOKUP_TIMEOUT_MESSAGE;
		FridaInstrumentationManager = class {
			#sessions = new Map();
			#pendingStartups = new Set();
			#cleanupLeases = new WeakMap();
			#sessionQueues = new Map();
			#sessionClosures = new Map();
			#remoteDevices = new Map();
			#remoteQueues = new Map();
			#deviceManagerLoader;
			#deviceManager;
			#deviceManagerLoading;
			#availabilityFailure;
			#operations = new Set();
			#closing = false;
			#closeAllPromise;
			constructor(options = {}) {
				this.#deviceManager = options.deviceManager;
				this.#deviceManagerLoader = options.deviceManagerLoader ?? (async () => (await import("frida")).getDeviceManager());
			}
			availabilityFailure() {
				return this.#availabilityFailure;
			}
			listDevices(remote) {
				return this.#withOperation("list_frida_devices", () => this.#listDevices(remote));
			}
			async #listDevices(remote) {
				let manager;
				let remoteHeld = false;
				try {
					manager = await this.#getDeviceManager();
					if (remote !== undefined) {
						await this.#retainRemote(manager, remote);
						remoteHeld = true;
					}
					const devices = await manager.enumerateDevices();
					let cleanupError = null;
					if (manager !== undefined && remoteHeld && remote !== undefined) {
						try {
							await this.#releaseRemote(manager, remote.address);
							remoteHeld = false;
						} catch (cause) {
							cleanupError = sanitizeError(cause, remote);
						}
					}
					return ok({
						devices: devices.map((device) => ({
							deviceId: device.id,
							name: device.name,
							type: device.type
						})),
						cleanupError
					});
				} catch (cause) {
					let cleanupError;
					if (manager !== undefined && remoteHeld && remote !== undefined) {
						try {
							await this.#releaseRemote(manager, remote.address);
						} catch (cleanupCause) {
							cleanupError = sanitizeError(cleanupCause, remote);
						}
					}
					const failure = providerError("list_frida_devices", cause, remote, cleanupError, remote === undefined ? undefined : { remote });
					const reference = remote === undefined ? undefined : this.#remoteDevices.get(remote.address);
					if (reference !== undefined && failure.cleanupIncomplete) this.#retainCleanupFailure(reference, failure);
					return err(failure);
				}
			}
			listProcesses(selector) {
				return this.#withOperation("list_frida_processes", () => this.#listProcesses(selector));
			}
			async #listProcesses(selector) {
				let manager;
				let remoteHeld = false;
				try {
					manager = await this.#getDeviceManager();
					const device = await this.#selectDevice(manager, selector);
					remoteHeld = selector.remote !== undefined;
					const processes = await device.enumerateProcesses();
					let cleanupError = null;
					if (remoteHeld && selector.remote !== undefined) {
						try {
							await this.#releaseRemote(manager, selector.remote.address);
							remoteHeld = false;
						} catch (cause) {
							cleanupError = sanitizeError(cause, selector.remote);
						}
					}
					return ok({
						deviceId: device.id,
						processes: processes.map((process) => ({
							pid: process.pid,
							name: process.name,
							identifier: null
						})),
						cleanupError
					});
				} catch (cause) {
					let cleanupError;
					if (manager !== undefined && remoteHeld && selector.remote !== undefined) {
						try {
							await this.#releaseRemote(manager, selector.remote.address);
						} catch (cleanupCause) {
							cleanupError = sanitizeError(cleanupCause, selector.remote);
						}
					}
					const failure = providerError("list_frida_processes", cause, selector.remote, cleanupError, selector);
					const reference = selector.remote === undefined ? undefined : this.#remoteDevices.get(selector.remote.address);
					if (reference !== undefined && failure.cleanupIncomplete) this.#retainCleanupFailure(reference, failure);
					return err(failure);
				}
			}
			startSession(input) {
				return this.#withOperation("start_frida_session", () => this.#startSession(input));
			}
			async #startSession(input) {
				const policy = resolveFridaCapturePolicy(input.captureLimits ?? {});
				if (!policy.success) return err(analysisInputErrorFromIssues("start_frida_session", policy.error.issues.map((issue) => ({
					...issue,
					path: ["capture_limits", ...issue.path]
				})), { capture_limits: input.captureLimits }));
				let manager;
				let device;
				let remoteHeld = false;
				let spawnedPid;
				let session;
				try {
					manager = await this.#getDeviceManager();
					device = await this.#selectDevice(manager, input);
					remoteHeld = input.remote !== undefined;
					let pid;
					let target;
					if (input.mode === "attach") {
						pid = input.pid;
						target = `pid ${pid}`;
						try {
							const process = await device.getProcessByPid(pid);
							target = `${process.name} (pid ${pid})`;
						} catch {}
					} else {
						pid = await device.spawn(input.program, input.argv === undefined ? undefined : { argv: [input.program, ...input.argv] });
						spawnedPid = pid;
						target = input.program;
					}
					session = await device.attach(pid);
					const id = randomUUID();
					const managed = {
						id,
						captureLimits: policy.data,
						device,
						deviceManager: manager,
						remote: input.remote,
						remoteReferenceHeld: remoteHeld,
						remoteRemovalPending: false,
						session,
						target,
						pid,
						mode: input.mode,
						scripts: new Map(),
						messages: new MessageFifo(),
						scriptCaptures: new Map(),
						cleanupStarted: false,
						detached: false,
						targetResumeObserved: false,
						resumeAfterDetachPending: false,
						capturedBytes: 0,
						messagesTruncated: false
					};
					session.detached.connect(() => {
						managed.detached = true;
					});
					if (session.isDetached()) managed.detached = true;
					this.#sessions.set(id, managed);
					return ok(sessionObservation(managed));
				} catch (cause) {
					let cleanupFailures = [];
					let pendingCleanup;
					if (manager !== undefined && device !== undefined && (spawnedPid !== undefined || session !== undefined || remoteHeld)) {
						const pending = {
							id: randomUUID(),
							device,
							deviceManager: manager,
							remote: input.remote,
							remoteReferenceHeld: remoteHeld,
							remoteRemovalPending: false,
							spawnedPid,
							session
						};
						this.#pendingStartups.add(pending);
						pendingCleanup = pending;
						cleanupFailures = await this.#cleanupStartup(pending);
					}
					const failure = providerError("start_frida_session", cause, input.remote, cleanupFailures.join("; ") || undefined, input);
					if (pendingCleanup !== undefined && failure.cleanupIncomplete) this.#retainCleanupFailure(pendingCleanup, failure);
					return err(failure);
				}
			}
			loadScript(sessionId, source, signal) {
				return this.#withOperation("load_frida_script", () => this.#withSessionLock(sessionId, () => this.#loadScript(sessionId, source, signal)), signal);
			}
			async #loadScript(sessionId, source, signal) {
				if (signal?.aborted) return err(cancelledOperation("load_frida_script", signal));
				const admitted = this.#admitSessionWork(sessionId, "load_frida_script");
				if (!admitted.ok) return admitted;
				const managed = admitted.value;
				let scriptSource;
				let sourceSha256;
				let sourceRepresentation;
				try {
					const selectedSource = source.sourceKind === "inline" ? source.source : await readFile(source.path);
					sourceSha256 = sha256Hex(selectedSource);
					scriptSource = typeof selectedSource === "string" ? selectedSource : selectedSource.toString("utf8");
					if (typeof selectedSource !== "string" && !isUtf8(selectedSource)) sourceRepresentation = {
						encoding: "utf8",
						decoding: "replacement",
						loadedSourceSha256: sha256Hex(scriptSource)
					};
				} catch (cause) {
					const sourcePath = source.sourceKind === "file" ? source.path : undefined;
					return err(cause instanceof Error && "code" in cause && (cause.code === "EACCES" || cause.code === "EPERM") ? new AnalysisAccessDeniedError("load_frida_script", sourcePath ?? "<inline>", cause.code, { cause }) : new AnalysisInputError("load_frida_script", { cause }, [{
						path: ["path"],
						reason: "invalid_value",
						message: `Cannot read Frida script file ${sourcePath ?? "<inline>"}.`
					}]));
				}
				if (signal?.aborted) return err(cancelledOperation("load_frida_script", signal));
				const scriptId = randomUUID();
				const capture = {
					messages: new MessageFifo(),
					truncated: false
				};
				managed.scriptCaptures.set(scriptId, capture);
				const onMessage = (message, data) => {
					this.#recordMessage(managed, scriptId, message, data);
				};
				let entry;
				let nativeFailure;
				try {
					const nativeScript = await managed.session.createScript(scriptSource, { name: `rea-${scriptId}` });
					entry = {
						id: scriptId,
						name: `rea-${scriptId}`,
						script: nativeScript,
						onMessage,
						state: "active"
					};
					managed.scripts.set(scriptId, entry);
					nativeScript.message.connect(onMessage);
					if (!signal?.aborted) await nativeScript.load();
				} catch (cause) {
					nativeFailure = { cause };
				}
				const cancellation = signal?.aborted ? { reason: signal.reason } : undefined;
				let cleanupReason;
				if (nativeFailure !== undefined || cancellation !== undefined) {
					if (entry === undefined) managed.scriptCaptures.delete(scriptId);
					else cleanupReason = await this.#releaseScript(managed, entry);
				}
				if (nativeFailure !== undefined && cancellation === undefined) {
					const failure = providerError("load_frida_script", nativeFailure.cause, managed.remote, cleanupReason);
					if (entry !== undefined && failure.cleanupIncomplete) this.#retainCleanupFailure(entry, failure);
					return err(failure);
				}
				const observation = {
					scriptId,
					captureLimits: managed.captureLimits,
					sourceKind: source.sourceKind,
					sourcePath: source.sourceKind === "file" ? source.path : null,
					sourceSha256,
					...sourceRepresentation === undefined ? {} : { sourceRepresentation },
					messages: capture.messages.toArray(),
					messagesTruncated: capture.truncated
				};
				if (cancellation !== undefined) {
					const failure = new FridaScriptLoadCancelledError(observation, {
						cause: cancellation.reason,
						scriptHandleAcquired: entry !== undefined,
						...nativeFailure === undefined ? {} : { diagnostics: { native_failure: sanitizeError(nativeFailure.cause, managed.remote) } },
						...cleanupReason === undefined ? {} : { cleanup: {
							reason: cleanupReason,
							resources: [sessionId, scriptId]
						} }
					});
					if (entry !== undefined && failure.cleanupIncomplete) this.#retainCleanupFailure(entry, failure);
					return err(failure);
				}
				return ok(observation);
			}
			resumeSession(sessionId, signal) {
				return this.#withOperation("resume_frida_session", () => this.#withSessionLock(sessionId, () => signal?.aborted ? Promise.resolve(err(cancelledOperation("resume_frida_session", signal))) : this.#resumeSession(sessionId)), signal);
			}
			async #resumeSession(sessionId) {
				const admitted = this.#admitSessionWork(sessionId, "resume_frida_session");
				if (!admitted.ok) return admitted;
				const managed = admitted.value;
				if (managed.mode !== "spawn" || managed.targetResumeObserved) return err(new AnalysisInputError("resume_frida_session", { userMessage: "Only a paused process spawned by this session can be resumed." }, [{
					path: ["session_id"],
					reason: "invalid_value",
					message: "Select a paused process spawned by this session."
				}]));
				const pendingScripts = [...managed.scripts.values()].filter((entry) => entry.state === "cleanup-pending" && !entry.script.isDestroyed);
				if (pendingScripts.length > 0) {
					const reason = "Frida script cleanup is incomplete; unload the retained scripts or close the session before resuming.";
					return err(new AnalysisCapabilityUnavailableError("frida", "resume_frida_session", reason, { cleanup: {
						reason,
						resources: pendingScripts.map((entry) => entry.id)
					} }));
				}
				try {
					await managed.device.resume(managed.pid);
					managed.targetResumeObserved = true;
					managed.resumeAfterDetachPending = false;
					return ok(null);
				} catch (cause) {
					return err(providerError("resume_frida_session", cause, managed.remote));
				}
			}
			#admitSessionWork(sessionId, operation) {
				const managed = this.#sessions.get(sessionId);
				if (managed === undefined) return err(unknownFridaSession(operation, sessionId));
				if (managed.cleanupStarted) {
					const message = `Frida session ${sessionId} is retained for cleanup.`;
					return err(new AnalysisCapabilityUnavailableError("frida", operation, message, {
						userMessage: message,
						remediationAction: `Retry close_frida_session with session_id ${sessionId} to finish cleanup.`
					}));
				}
				if (managed.detached) return err(unknownFridaSession(operation, sessionId));
				return ok(managed);
			}
			unloadScript(sessionId, scriptId, signal) {
				return this.#withOperation("unload_frida_script", () => this.#withSessionLock(sessionId, () => signal?.aborted ? Promise.resolve(err(cancelledOperation("unload_frida_script", signal))) : this.#unloadScript(sessionId, scriptId)), signal);
			}
			async #unloadScript(sessionId, scriptId) {
				const managed = this.#sessions.get(sessionId);
				const entry = managed?.scripts.get(scriptId);
				if (managed === undefined) return err(unknownFridaSession("unload_frida_script", sessionId));
				if (entry === undefined) return err(unknownFridaScript("unload_frida_script", scriptId));
				const cleanupReason = await this.#releaseScript(managed, entry);
				if (cleanupReason === undefined) return ok(null);
				return err(this.#retainCleanupFailure(entry, providerError("unload_frida_script", new Error(cleanupReason), managed.remote, cleanupReason)));
			}
			async #releaseScript(managed, entry, parentSessionReleased = false) {
				if (parentSessionReleased || entry.script.isDestroyed) entry.state = "released";
				if (entry.state !== "released") {
					entry.state = "cleanup-pending";
					try {
						await entry.script.unload();
						entry.state = "released";
					} catch (cause) {
						if (entry.script.isDestroyed) entry.state = "released";
						else return sanitizeError(cause, managed.remote);
					}
				}
				try {
					entry.script.message.disconnect(entry.onMessage);
				} catch (cause) {
					return sanitizeError(cause, managed.remote);
				}
				managed.scripts.delete(entry.id);
				managed.scriptCaptures.delete(entry.id);
				await this.#resolveCleanupFailures(entry);
				return undefined;
			}
			status(sessionId) {
				const managed = this.#sessions.get(sessionId);
				if (managed === undefined) return undefined;
				return {
					...sessionObservation(managed),
					targetResumeObserved: managed.targetResumeObserved,
					scripts: [...managed.scripts.values()].map(({ id, name }) => ({
						scriptId: id,
						name
					})),
					messages: managed.messages.toArray().map(({ observation }) => observation),
					messagesTruncated: managed.messagesTruncated
				};
			}
			closeSession(sessionId) {
				const pending = this.#sessionClosures.get(sessionId);
				if (pending !== undefined) return pending;
				const closing = this.#withSessionLock(sessionId, () => this.#closeSession(sessionId));
				this.#sessionClosures.set(sessionId, closing);
				const clear = () => {
					if (this.#sessionClosures.get(sessionId) === closing) this.#sessionClosures.delete(sessionId);
				};
				void closing.then(clear, clear);
				return closing;
			}
			async #closeSession(sessionId) {
				const managed = this.#sessions.get(sessionId);
				if (managed === undefined) return err(unknownFridaSession("close_frida_session", sessionId));
				managed.cleanupStarted = true;
				const scriptFailures = new Map();
				const cleanupFailures = [];
				managed.detached ||= managed.session.isDetached();
				let parentSessionReleased = managed.detached;
				const shouldResumePausedSpawn = managed.mode === "spawn" && (!parentSessionReleased && !managed.targetResumeObserved || managed.resumeAfterDetachPending);
				let targetResumeObserved = managed.targetResumeObserved;
				for (const entry of [...managed.scripts.values()]) {
					const failure = await this.#releaseScript(managed, entry, parentSessionReleased);
					if (failure !== undefined) scriptFailures.set(entry.id, failure);
				}
				try {
					if (!managed.session.isDetached()) await managed.session.detach();
					managed.detached = true;
					parentSessionReleased = true;
				} catch (cause) {
					cleanupFailures.push(`Unable to detach Frida session: ${sanitizeError(cause, managed.remote)}`);
					managed.detached ||= managed.session.isDetached();
					parentSessionReleased = managed.detached;
				}
				if (parentSessionReleased) {
					for (const entry of [...managed.scripts.values()]) {
						const failure = await this.#releaseScript(managed, entry, true);
						if (failure === undefined) scriptFailures.delete(entry.id);
						else scriptFailures.set(entry.id, failure);
					}
				}
				if (shouldResumePausedSpawn && managed.scripts.size === 0) {
					try {
						await managed.device.resume(managed.pid);
						managed.targetResumeObserved = true;
						managed.resumeAfterDetachPending = false;
						targetResumeObserved = true;
					} catch (cause) {
						managed.resumeAfterDetachPending = true;
						cleanupFailures.push(`Unable to resume spawned target: ${sanitizeError(cause, managed.remote)}`);
					}
				}
				const failures = [...scriptFailures.values(), ...cleanupFailures];
				if (managed.remote !== undefined && (managed.remoteReferenceHeld || managed.remoteRemovalPending) && parentSessionReleased && managed.scripts.size === 0 && !managed.resumeAfterDetachPending) {
					const failure = await this.#releaseManagedRemote(managed);
					if (failure !== undefined) failures.push(failure);
				}
				if (failures.length > 0) return err(this.#retainCleanupFailure(managed, new AnalysisCapabilityUnavailableError("frida", "close_frida_session", failures[0] ?? "Frida session cleanup failed", { cleanup: {
					reason: failures.join("; "),
					resources: [sessionId]
				} })));
				this.#sessions.delete(sessionId);
				await this.#resolveCleanupFailures(managed);
				return ok({ targetResumeObserved });
			}
			closeAll() {
				this.#closing = true;
				this.#closeAllPromise ??= this.#closeAll().catch((cause) => {
					this.#closeAllPromise = undefined;
					throw cause;
				});
				return this.#closeAllPromise;
			}
			async #closeAll() {
				await Promise.allSettled(this.#operations);
				const startupFailures = await Promise.all([...this.#pendingStartups].map(async (pending) => {
					const reasons = await this.#cleanupStartup(pending);
					return reasons.length === 0 ? [] : [this.#retainCleanupFailure(pending, new ProviderCleanupError("frida", [pending.id], { reason: reasons.join("; ") }, { operation: "frida_cleanup" }))];
				}));
				const results = await Promise.all([...this.#sessions.keys()].map((sessionId) => this.closeSession(sessionId)));
				const failures = [...startupFailures.flat(), ...results.flatMap((result) => result.ok ? [] : [result.error])];
				const manager = this.#deviceManager;
				if (manager !== undefined) {
					for (const [address, reference] of this.#remoteDevices) {
						if (reference.references !== 0) continue;
						try {
							await this.#releaseRemote(manager, address);
						} catch (cause) {
							failures.push(this.#retainCleanupFailure(reference, new ProviderCleanupError("frida", [address], { reason: "Unable to close remote Frida connection during shutdown" }, {
								cause,
								operation: "frida_cleanup"
							})));
						}
					}
				}
				if (failures.length > 0) throw providerCleanupErrorFromFailures("frida", failures, "Frida session cleanup was incomplete", {
					operation: "frida_cleanup",
					message: "Frida session cleanup was incomplete"
				});
			}
			#cleanupStartup(pending) {
				return this.#withSessionLock(pending.id, async () => {
					if (!this.#pendingStartups.has(pending)) return [];
					if (pending.session !== undefined) {
						try {
							if (!pending.session.isDetached()) await pending.session.detach();
							pending.session = undefined;
						} catch (cause) {
							return [`Unable to detach Frida session: ${sanitizeError(cause, pending.remote)}`];
						}
					}
					if (pending.spawnedPid !== undefined) {
						try {
							await pending.device.resume(pending.spawnedPid);
							pending.spawnedPid = undefined;
						} catch (cause) {
							return [`Unable to resume spawned target: ${sanitizeError(cause, pending.remote)}`];
						}
					}
					const remoteFailure = await this.#releaseManagedRemote(pending);
					if (remoteFailure !== undefined) return [remoteFailure];
					this.#pendingStartups.delete(pending);
					await this.#resolveCleanupFailures(pending);
					return [];
				});
			}
			#retainCleanupFailure(owner, failure) {
				const lease = this.#cleanupLease(owner);
				failure.bindCleanupResourceOwner(lease);
				lease.bindCleanupError(failure);
				return failure;
			}
			#cleanupLease(owner) {
				let lease = this.#cleanupLeases.get(owner);
				if (lease === undefined) {
					lease = new AnalysisCleanupLease(async () => {}, [owner.id]);
					this.#cleanupLeases.set(owner, lease);
				}
				return lease;
			}
			async #resolveCleanupFailures(owner) {
				await this.#cleanupLease(owner).release();
			}
			async #releaseManagedRemote(managed) {
				if (managed.remote === undefined || !managed.remoteReferenceHeld && !managed.remoteRemovalPending) return undefined;
				const releaseReference = managed.remoteReferenceHeld;
				managed.remoteReferenceHeld = false;
				try {
					await this.#releaseRemote(managed.deviceManager, managed.remote.address, releaseReference);
					managed.remoteRemovalPending = false;
					return undefined;
				} catch (cause) {
					managed.remoteRemovalPending = true;
					return `Unable to close remote Frida connection: ${sanitizeError(cause, managed.remote)}`;
				}
			}
			#withOperation(name, operation, signal) {
				if (this.#closing) return Promise.resolve(err(new AnalysisCapabilityUnavailableError("frida", name, "Frida instrumentation is shutting down.")));
				let start = () => {};
				const pending = new Promise((resolve, reject) => {
					start = () => {
						try {
							resolve(signal?.aborted ? err(cancelledOperation(name, signal)) : operation());
						} catch (cause) {
							reject(cause);
						}
					};
				});
				this.#operations.add(pending);
				const release = () => {
					this.#operations.delete(pending);
				};
				void pending.then(release, release);
				start();
				return pending;
			}
			async #withSessionLock(sessionId, operation) {
				const previous = this.#sessionQueues.get(sessionId) ?? Promise.resolve();
				let release;
				const current = new Promise((resolve) => {
					release = resolve;
				});
				const tail = previous.then(() => current);
				this.#sessionQueues.set(sessionId, tail);
				await previous;
				try {
					return await operation();
				} finally {
					release?.();
					if (this.#sessionQueues.get(sessionId) === tail) this.#sessionQueues.delete(sessionId);
				}
			}
			#recordMessage(managed, scriptId, message, data) {
				const limits = managed.captureLimits;
				const payload = message.payload;
				const secrets = [managed.remote?.token, managed.remote?.certificate].filter((value) => value !== undefined && value.length > 0);
				let payloadResult;
				if (payload !== undefined) {
					try {
						payloadResult = boundedJsonValue(payload, Math.max(0, limits.session_bytes - MAX_MESSAGE_METADATA_BYTES), secrets, limits);
					} catch {
						payloadResult = {
							value: { payload_unavailable: true },
							truncated: true,
							bytes: Buffer.byteLength("{\"payload_unavailable\":true}"),
							limit: "unrepresentable"
						};
					}
				}
				let binaryResult = {};
				if (data !== null) {
					const payloadBytes = payloadResult?.bytes ?? 0;
					const remainingMessageBytes = Math.max(0, limits.session_bytes - MAX_MESSAGE_METADATA_BYTES - payloadBytes - 4096);
					const messageBinaryLimit = Math.floor(remainingMessageBytes * 3 / 4);
					if (secrets.some((secret) => data.includes(secret, 0, "utf8"))) {
						binaryResult = { data_redacted: true };
					} else if (data.byteLength > messageBinaryLimit) {
						binaryResult = {
							data_truncated: true,
							data_bytes: data.byteLength,
							data_capture_limit: "session_bytes"
						};
						markMessageTruncated(managed, scriptId);
					} else {
						binaryResult = { data_base64: data.toString("base64") };
					}
				}
				const type = boundedRedactedString(message.type, limits.message_type_bytes, secrets);
				const description = message.description === undefined ? undefined : boundedRedactedString(message.description, limits.message_text_bytes, secrets);
				const stack = message.stack === undefined ? undefined : boundedRedactedString(message.stack, limits.message_text_bytes, secrets);
				const fileName = message.fileName === undefined ? undefined : boundedRedactedString(message.fileName, limits.message_text_bytes, secrets);
				const observation = {
					script_id: scriptId,
					type: type.value,
					...type.truncated ? { type_truncated: true } : {},
					...payloadResult === undefined ? {} : {
						payload: payloadResult.value,
						...payloadResult.truncated ? {
							payload_truncated: true,
							...payloadResult.limit === undefined ? {} : { payload_capture_limit: payloadResult.limit }
						} : {}
					},
					...description === undefined ? {} : {
						description: description.value,
						...description.truncated ? { description_truncated: true } : {}
					},
					...stack === undefined ? {} : {
						stack: stack.value,
						...stack.truncated ? { stack_truncated: true } : {}
					},
					...fileName === undefined ? {} : {
						file_name: fileName.value,
						...fileName.truncated ? { file_name_truncated: true } : {}
					},
					...typeof message.lineNumber === "number" && Number.isSafeInteger(message.lineNumber) && message.lineNumber >= 0 ? { line_number: message.lineNumber } : {},
					...typeof message.columnNumber === "number" && Number.isSafeInteger(message.columnNumber) && message.columnNumber >= 0 ? { column_number: message.columnNumber } : {},
					...binaryResult
				};
				const charge = Buffer.byteLength(JSON.stringify(observation));
				if (charge > limits.session_bytes) {
					markMessageTruncated(managed, scriptId);
					return;
				}
				while (managed.messages.size > 0 && managed.capturedBytes + charge > limits.session_bytes) {
					const removed = managed.messages.shift();
					if (removed !== undefined) {
						managed.capturedBytes -= removed.charge;
						const scriptMessages = managed.scriptCaptures.get(removed.scriptId)?.messages;
						if (scriptMessages?.peek() === removed.observation) scriptMessages.shift();
						markMessageTruncated(managed, removed.scriptId);
					}
				}
				managed.messages.push({
					observation,
					scriptId,
					charge
				});
				managed.scriptCaptures.get(scriptId)?.messages.push(observation);
				managed.capturedBytes += charge;
			}
			async #getDeviceManager() {
				if (this.#deviceManager !== undefined) return this.#deviceManager;
				if (this.#deviceManagerLoading !== undefined) return this.#deviceManagerLoading;
				const loading = Promise.resolve().then(this.#deviceManagerLoader);
				this.#deviceManagerLoading = loading;
				try {
					this.#deviceManager = await loading;
					if (this.#availabilityFailure?.providerId === "frida") this.#availabilityFailure = undefined;
					return this.#deviceManager;
				} catch (cause) {
					this.#availabilityFailure = {
						providerId: "frida",
						reason: boundedRedactedString(errorMessage(cause), 4096, []).value
					};
					throw cause;
				} finally {
					if (this.#deviceManagerLoading === loading) this.#deviceManagerLoading = undefined;
				}
			}
			async #selectDevice(manager, selector) {
				if (selector.remote !== undefined) return this.#retainRemote(manager, selector.remote);
				try {
					return await manager.getDeviceById(selector.deviceId ?? "local", DEVICE_LOOKUP_TIMEOUT_MS);
				} catch (cause) {
					if (cause instanceof AnalysisCancelledError || cause instanceof AnalysisTimeoutError) throw cause;
					if (!isFridaDeviceLookupTimeout(cause)) throw cause;
					throw new AnalysisTimeoutError("frida_device_lookup", DEVICE_LOOKUP_TIMEOUT_MS, {
						cause,
						userMessage: `Frida device lookup reached its ${String(DEVICE_LOOKUP_TIMEOUT_MS)} ms deadline (deadlineExpired). This release has no runtime override.`,
						remediationAction: `The ${String(DEVICE_LOOKUP_TIMEOUT_MS)} ms Frida device lookup has no runtime override. Confirm the selected device is attached, then retry. Another REA timeout does not raise this lookup.`
					});
				}
			}
			async #retainRemote(manager, remote) {
				return this.#withRemoteLock(remote.address, async () => {
					const optionsDigest = sha256Hex(JSON.stringify(remoteOptions(remote)));
					let reference = this.#remoteDevices.get(remote.address);
					if (reference !== undefined) {
						if (reference.optionsDigest !== optionsDigest) throw new AnalysisInputError("frida_remote_connection", undefined, [{
							path: ["remote"],
							reason: "invalid_value",
							message: "This endpoint is already retained with different connection options. Reuse the existing options or close its sessions before changing them."
						}]);
						reference.references += 1;
					} else {
						const device = manager.addRemoteDevice(remote.address, remoteOptions(remote));
						reference = {
							id: remote.address,
							references: 1,
							optionsDigest,
							device
						};
						this.#remoteDevices.set(remote.address, reference);
					}
					try {
						return await reference.device;
					} catch (cause) {
						reference.references -= 1;
						if (reference.references === 0) this.#remoteDevices.delete(remote.address);
						throw cause;
					}
				});
			}
			async #releaseRemote(manager, address, releaseReference = true) {
				return this.#withRemoteLock(address, async () => {
					const reference = this.#remoteDevices.get(address);
					if (reference === undefined) return;
					if (releaseReference) reference.references = Math.max(0, reference.references - 1);
					if (reference.references > 0) return;
					try {
						await reference.device;
					} catch {
						this.#remoteDevices.delete(address);
						return;
					}
					await manager.removeRemoteDevice(address);
					await this.#resolveCleanupFailures(reference);
					if (this.#remoteDevices.get(address) === reference) this.#remoteDevices.delete(address);
				});
			}
			async #withRemoteLock(address, operation) {
				const previous = this.#remoteQueues.get(address) ?? Promise.resolve();
				let release;
				const current = new Promise((resolve) => {
					release = resolve;
				});
				const tail = previous.then(() => current);
				this.#remoteQueues.set(address, tail);
				await previous;
				try {
					return await operation();
				} finally {
					release?.();
					if (this.#remoteQueues.get(address) === tail) this.#remoteQueues.delete(address);
				}
			}
		};
		boundedRedactedString = (input, maximumBytes, secrets) => {
			const replacement = "[redacted]";
			const replacementBytes = jsonStringByteLength(replacement) - 2;
			const chunks = [];
			let outputBytes = 0;
			let cursor = 0;
			const keep = (end) => {
				const start = cursor;
				while (cursor < end) {
					const codePoint = input.codePointAt(cursor);
					if (codePoint === undefined) break;
					const character = String.fromCodePoint(codePoint);
					const characterBytes = jsonStringByteLength(character) - 2;
					if (cursor + character.length > end || outputBytes + characterBytes > maximumBytes) break;
					outputBytes += characterBytes;
					cursor += character.length;
				}
				chunks.push(input.slice(start, cursor));
				return cursor === end;
			};
			for (const span of explicitValueSpans(input, secrets)) {
				if (!keep(span.start)) return {
					value: chunks.join(""),
					truncated: true
				};
				if (outputBytes + replacementBytes > maximumBytes) return {
					value: chunks.join(""),
					truncated: true
				};
				chunks.push(replacement);
				outputBytes += replacementBytes;
				cursor = span.end;
			}
			const complete = keep(input.length);
			return {
				value: chunks.join(""),
				truncated: !complete
			};
		};
		clipped = (limit) => ({
			value: null,
			truncated: true,
			limit
		});
		boundedJsonValue = (input, maximumBytes, secrets, limits) => {
			const seen = new WeakSet();
			let remainingNodes = limits.json_nodes;
			const visit = (value, budget, depth) => {
				remainingNodes -= 1;
				if (remainingNodes < 0) return clipped("json_nodes");
				if (depth > limits.json_depth) return clipped("json_depth");
				if (budget < 8) return clipped("payload_bytes");
				if (value === null) return {
					value: null,
					truncated: false
				};
				if (typeof value === "boolean" || typeof value === "number") {
					if (typeof value === "number" && !Number.isFinite(value)) return clipped("unrepresentable");
					return {
						value,
						truncated: false
					};
				}
				if (typeof value === "string") {
					const bounded = boundedRedactedString(value, Math.max(0, budget - 2), secrets);
					return bounded.truncated ? {
						value: bounded.value,
						truncated: true,
						limit: "payload_bytes"
					} : {
						value: bounded.value,
						truncated: false
					};
				}
				if (typeof value !== "object") return clipped("unrepresentable");
				if (seen.has(value)) return clipped("unrepresentable");
				seen.add(value);
				try {
					if (Array.isArray(value)) {
						const output = [];
						let usedBytes = 2;
						let limit;
						for (let index = 0; index < value.length; index += 1) {
							const separatorBytes = output.length === 0 ? 0 : 1;
							const remaining = budget - usedBytes - separatorBytes - 1;
							if (remaining < 8) {
								limit ??= "payload_bytes";
								break;
							}
							const item = visit(value[index] ?? null, remaining, depth + 1);
							const itemBytes = Buffer.byteLength(JSON.stringify(item.value));
							if (itemBytes > remaining) {
								limit ??= "payload_bytes";
								break;
							}
							output.push(item.value);
							usedBytes += separatorBytes + itemBytes;
							if (item.truncated) {
								limit ??= item.limit;
								break;
							}
						}
						if (output.length < value.length) limit ??= "payload_bytes";
						return limit === undefined ? {
							value: output,
							truncated: false
						} : {
							value: output,
							truncated: true,
							limit
						};
					}
					const output = {};
					let usedBytes = 2;
					let entries = 0;
					let limit;
					for (const rawKey in value) {
						if (!Object.hasOwn(value, rawKey)) continue;
						const separatorBytes = entries === 0 ? 0 : 1;
						const keyLimit = Math.max(0, budget - usedBytes - separatorBytes - 10);
						const boundedKey = boundedRedactedString(rawKey, keyLimit, secrets);
						if (boundedKey.truncated) {
							limit ??= "payload_bytes";
							break;
						}
						const key = boundedKey.value;
						if (Object.hasOwn(output, key)) {
							limit ??= "unrepresentable";
							break;
						}
						const keyBytes = jsonStringByteLength(key) + 1;
						const remaining = budget - usedBytes - separatorBytes - keyBytes - 1;
						if (remaining < 8) {
							limit ??= "payload_bytes";
							break;
						}
						const entry = visit(Reflect.get(value, rawKey), remaining, depth + 1);
						const entryBytes = Buffer.byteLength(JSON.stringify(entry.value));
						if (entryBytes > remaining) {
							limit ??= "payload_bytes";
							break;
						}
						Object.defineProperty(output, key, {
							value: entry.value,
							configurable: true,
							enumerable: true,
							writable: true
						});
						entries += 1;
						usedBytes += separatorBytes + keyBytes + entryBytes;
						if (entry.truncated) {
							limit ??= entry.limit;
							break;
						}
					}
					return limit === undefined ? {
						value: output,
						truncated: false
					} : {
						value: output,
						truncated: true,
						limit
					};
				} finally {
					seen.delete(value);
				}
			};
			const result = visit(input, maximumBytes, 0);
			const bytes = Buffer.byteLength(JSON.stringify(result.value));
			return bytes > maximumBytes ? {
				value: null,
				truncated: true,
				bytes: Buffer.byteLength("null"),
				limit: result.limit ?? "payload_bytes"
			} : {
				...result,
				bytes
			};
		};
		remoteOptions = (remote) => ({
			...remote.token === undefined ? {} : { token: remote.token },
			...remote.certificate === undefined ? {} : { certificate: remote.certificate },
			...remote.origin === undefined ? {} : { origin: remote.origin },
			...remote.keepaliveInterval === undefined ? {} : { keepaliveInterval: remote.keepaliveInterval }
		});
		sessionState = (managed) => managed.detached ? "detached" : managed.mode === "spawn" && !managed.targetResumeObserved ? "paused" : "running";
		sessionObservation = (managed) => ({
			sessionId: managed.id,
			captureLimits: managed.captureLimits,
			deviceId: managed.device.id,
			target: managed.target,
			pid: managed.pid,
			mode: managed.mode,
			state: sessionState(managed)
		});
		sanitizeError = (cause, remote) => boundedRedactedString(errorMessage(cause), 4096, [remote?.token, remote?.certificate].filter((secret) => secret !== undefined && secret.length > 0)).value;
		providerError = (operation, cause, remote, cleanupReason, selector) => {
			const secrets = [remote?.token, remote?.certificate].filter((secret) => secret !== undefined && secret.length > 0);
			const selection = selector?.remote === undefined ? selector?.deviceId : isValidFridaRemoteAddress(selector.remote.address) ? selector.remote.address : undefined;
			const selectionKey = selector?.remote === undefined ? "device_id" : "remote_address";
			const diagnostics = {
				...cause instanceof AnalysisError ? redactExplicitFailure(cause, secrets).diagnostics : {},
				...selection === undefined ? {} : { [selectionKey]: boundedRedactedString(selection, 4096, secrets).value }
			};
			if (cause instanceof AnalysisInputError) return new AnalysisInputError(operation, {
				cause,
				diagnostics
			}, cause.issues);
			if (cause instanceof AnalysisTimeoutError) return new AnalysisTimeoutError(operation, cause.timeoutMs, {
				cause,
				diagnostics,
				...cause.userMessage === undefined ? {} : { userMessage: cause.userMessage },
				...cause.remediationAction === undefined ? {} : { remediationAction: cause.remediationAction },
				...cleanupReason === undefined ? {} : { cleanup: {
					reason: cleanupReason,
					resources: ["Frida provider operation"]
				} }
			});
			if (cause instanceof AnalysisCancelledError) return cancelledBy(operation, carriedReason(cause.cause), {
				diagnostics,
				...cleanupReason === undefined ? {} : { cleanup: {
					reason: cleanupReason,
					resources: ["Frida provider operation"]
				} }
			});
			const reason = sanitizeError(cause, remote);
			return new AnalysisCapabilityUnavailableError("frida", operation, reason, {
				cause: remote === undefined ? cause : new Error(reason),
				diagnostics,
				...selector?.remote === undefined || cleanupReason !== undefined || reason !== "Unable to connect to remote frida-server" ? {} : { remediationAction: "Confirm the selected Frida server is reachable and its connection options are correct, then retry." },
				...cleanupReason === undefined ? {} : { cleanup: {
					reason: cleanupReason,
					resources: ["Frida provider operation"]
				} }
			});
		};
		cancelledOperation = (operation, signal) => cancelledBy(operation, signal);
		markMessageTruncated = (managed, scriptId) => {
			managed.messagesTruncated = true;
			const capture = managed.scriptCaptures.get(scriptId);
			if (capture !== undefined) capture.truncated = true;
		};
		MessageFifo = class {
			#items = [];
			#head = 0;
			get size() {
				return this.#items.length - this.#head;
			}
			push(item) {
				this.#items.push(item);
			}
			peek() {
				return this.#items[this.#head];
			}
			shift() {
				if (this.#head >= this.#items.length) return undefined;
				const item = this.#items[this.#head];
				this.#items[this.#head] = undefined;
				this.#head += 1;
				if (this.#head * 2 >= this.#items.length) {
					this.#items = this.#items.slice(this.#head);
					this.#head = 0;
				}
				return item;
			}
			toArray() {
				return this.#items.slice(this.#head);
			}
		};
	})))();
}

//#endregion
//#region dist/composition/frida.js
var createFridaInstrumentationProvider;
function init_frida() {
	return (init_frida = __esmMin((() => {
		init_FridaInstrumentationManager();
		createFridaInstrumentationProvider = (options = {}) => new FridaInstrumentationManager(options);
	})))();
}

//#endregion
//#region dist/application/frida/fridaContractRequests.js
var fridaRemoteConnection, fridaDeviceSelection, fridaSessionStart, fridaScriptSource, instrumentWithFrida, startFridaSession, loadFridaScript;
function init_fridaContractRequests() {
	return (init_fridaContractRequests = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		fridaRemoteConnection = (input) => input === undefined ? undefined : {
			address: input.address,
			...input.token === undefined ? {} : { token: input.token },
			...input.certificate === undefined ? {} : { certificate: input.certificate },
			...input.origin === undefined ? {} : { origin: input.origin },
			...input.keepalive_interval === undefined ? {} : { keepaliveInterval: input.keepalive_interval }
		};
		fridaDeviceSelection = (input) => {
			const remote = fridaRemoteConnection(input.remote);
			return {
				...input.device_id === undefined ? {} : { deviceId: input.device_id },
				...remote === undefined ? {} : { remote }
			};
		};
		fridaSessionStart = (input) => {
			const selected = {
				...input.capture_limits === undefined ? {} : { captureLimits: input.capture_limits },
				...fridaDeviceSelection(input)
			};
			if (input.mode === "attach") return input.pid === undefined ? undefined : {
				...selected,
				mode: "attach",
				pid: input.pid
			};
			return input.program === undefined ? undefined : {
				...selected,
				mode: "spawn",
				program: input.program,
				...input.argv === undefined ? {} : { argv: input.argv }
			};
		};
		fridaScriptSource = (input) => input.source_kind === "inline" ? input.source === undefined ? undefined : {
			sourceKind: "inline",
			source: input.source
		} : input.path === undefined ? undefined : {
			sourceKind: "file",
			path: input.path
		};
		instrumentWithFrida = (service, input, signal) => {
			const session = fridaSessionStart(input);
			const source = fridaScriptSource(input);
			return session === undefined || source === undefined ? Promise.resolve(err(new AnalysisInputError("instrument_with_frida"))) : service.instrument({
				...session,
				source,
				durationMs: input.duration_ms
			}, signal);
		};
		startFridaSession = async (service, input, signal) => {
			const request = fridaSessionStart(input);
			if (request === undefined) return err(new AnalysisInputError("start_frida_session"));
			const started = await service.startSession(request, signal);
			if (!started.ok) return started;
			const session = started.value;
			return ok({
				session_id: session.sessionId,
				...session.captureLimits === undefined ? {} : { capture_limits: session.captureLimits },
				device_id: session.deviceId,
				target: session.target,
				pid: session.pid,
				mode: session.mode,
				state: session.state
			});
		};
		loadFridaScript = (service, input, signal) => {
			const source = fridaScriptSource(input);
			return source === undefined ? Promise.resolve(err(new AnalysisInputError("load_frida_script"))) : service.loadScript(input.session_id, source, signal);
		};
	})))();
}

//#endregion
//#region dist/cli/fridaCommands.js
var fridaCommands_exports = /* @__PURE__ */ __exportAll({ registerFridaCommands: () => registerFridaCommands });
var exactlyOneScriptSource, localUnlessSelected, registerFridaCommands;
function init_fridaCommands() {
	return (init_fridaCommands = __esmMin((() => {
		init_projectCliAnalysisResult();
		init_FridaInstrumentationService();
		init_frida();
		init_analysisErrorProjection();
		init_analysisErrorCore();
		init_result();
		init_inputIssueProjection();
		init_fridaContractRequests();
		init_contractCliDescription();
		init_contractCommand();
		init_fridaToolContracts();
		init_finishAnalysisCommand();
		exactlyOneScriptSource = "Provide exactly one of --script or --script-file.";
		localUnlessSelected = (input) => input.device_id === undefined && input.remote === undefined ? {
			...input,
			device_id: "local"
		} : input;
		registerFridaCommands = (cli, logger, provider = createFridaInstrumentationProvider()) => {
			const service = new FridaInstrumentationService(provider);
			const cleanup = { close: () => provider.closeAll() };
			const instrumentContract = contractNamed(FRIDA_TOOL_CONTRACTS, "instrument_with_frida");
			const remoteMembers = {
				address: {
					name: "remoteAddress",
					description: "Remote Frida host address, optionally with a port"
				},
				token: { description: "Remote authentication token" },
				certificate: { description: "Remote TLS certificate" },
				origin: { description: "Remote connection origin" },
				keepalive_interval: { name: "keepaliveInterval" }
			};
			const discover = (contract, run, selected = (input) => input) => (input, { signal }) => finishAnalysisCommand(async () => {
				const candidate = selected(input);
				const admitted = contract.inputSchema.safeParse(candidate);
				return admitted.success ? run(admitted.data) : err(analysisInputErrorFromIssues(contract.name, admitted.error.issues, candidate));
			}, cleanup, "frida", contract.name, signal).then(projectCliAnalysisResult);
			const listDevices = contractNamed(FRIDA_TOOL_CONTRACTS, "list_frida_devices");
			const listProcesses = contractNamed(FRIDA_TOOL_CONTRACTS, "list_frida_processes");
			registerContractCommand(cli, logger, listDevices, {
				description: "List local Frida devices and an optional remote endpoint",
				flatten: { remote: remoteMembers }
			}, discover(listDevices, (input) => service.listDevices(fridaRemoteConnection(input.remote))));
			registerContractCommand(cli, logger, listProcesses, {
				description: "List processes visible through a Frida device",
				fields: { device_id: { description: "Frida device identifier" } },
				flatten: { remote: remoteMembers }
			}, discover(listProcesses, (input) => service.listProcesses(fridaDeviceSelection(input)), localUnlessSelected));
			registerContractCommand(cli, logger, instrumentContract, {
				description: `Run one Frida script against a selected process and detach. ${exactlyOneScriptSource}`,
				positionals: ["mode"],
				cliOptions: { target: z.string().min(1).describe("Process ID for attach or program path for spawn") },
				cliPositionals: ["target"],
				handlerFields: [
					"pid",
					"program",
					"source_kind"
				],
				callerPaths: ["path"],
				fields: {
					mode: { description: "Attach to a PID or spawn a program" },
					device_id: { description: "Frida device identifier" },
					source: {
						name: "script",
						description: `Inline JavaScript to load. ${exactlyOneScriptSource}`
					},
					path: {
						name: "scriptFile",
						description: `Path to JavaScript source file. ${exactlyOneScriptSource}`
					},
					argv: {
						name: "argument",
						description: "Arguments passed to a spawned target"
					},
					duration_ms: { description: "Instrumentation duration in milliseconds" }
				},
				flatten: {
					remote: remoteMembers,
					capture_limits: {
						session_bytes: {
							name: "captureSessionBytes",
							description: "Session retention bytes including encoded payloads; select before starting the experiment"
						},
						message_text_bytes: {
							name: "captureMessageTextBytes",
							description: "Retained bytes per Frida error text field"
						},
						message_type_bytes: {
							name: "captureMessageTypeBytes",
							description: "Retained bytes per Frida message type"
						},
						json_nodes: {
							name: "captureJsonNodes",
							description: "Retained JSON nodes per Frida payload"
						},
						json_depth: {
							name: "captureJsonDepth",
							description: "Retained JSON nesting depth per Frida payload"
						}
					}
				}
			}, (input, { signal, cliOptions: { target } }) => {
				const refused = (path, message) => Promise.resolve(projectAnalysisError(new AnalysisInputError(instrumentContract.name, undefined, [{
					path: [path],
					reason: "invalid_value",
					message
				}])));
				if (input.mode === "attach" && input.argv !== undefined) return refused("argv", "--argument is only valid in spawn mode; remove it when attaching to a process.");
				if (input.source === undefined === (input.path === undefined)) return refused("source", exactlyOneScriptSource);
				if (input.device_id !== undefined && input.remote !== undefined) return refused("device_id", "Choose either --device-id or --remote-address, not both");
				const pid = /^[0-9]+$/u.test(target) && Number.isSafeInteger(Number(target)) && Number(target) > 0 ? Number(target) : undefined;
				if (input.mode === "attach" && pid === undefined) return refused("target", "attach mode needs a positive integer process ID.");
				const candidate = localUnlessSelected({
					...input,
					...input.mode === "attach" ? { pid } : { program: target },
					source_kind: input.path === undefined ? "inline" : "file"
				});
				const admitted = instrumentContract.inputSchema.safeParse(candidate);
				if (!admitted.success) return Promise.resolve(projectAnalysisError(analysisInputErrorFromIssues(instrumentContract.name, admitted.error.issues, candidate)));
				return finishAnalysisCommand(async () => {
					const result = await instrumentWithFrida(service, admitted.data, signal);
					if (!result.ok) return result;
					if (result.value.cleanupError !== null) process.exitCode = 1;
					return ok(result.value.evidence);
				}, cleanup, "frida", instrumentContract.name, signal).then(projectCliAnalysisResult);
			});
		};
	})))();
}

//#endregion
export { fridaCommands_exports, init_fridaCommands };