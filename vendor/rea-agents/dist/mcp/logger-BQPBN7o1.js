import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { Ft as analysisSettingLimit, Lt as init_analysisSettingDefinitions, _t as currentAnalysisSettingOverride, vt as init_analysisOperationSnapshot } from "./analysisErrorProjection-B0_t_nHz.js";
import { i as init_configurationErrors, n as ConfigurationError } from "./configurationErrors-DgUy2JKH.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { $t as init_analysisResourceLimits, Dt as DEFAULT_REGEX_MATCHING_DEADLINE_MS, Ht as MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB, Jt as MAX_NODE_TIMER_DELAY_MS, Mt as MAXIMUM_BRIDGE_MAX_REPLY_BYTES, Nt as MAXIMUM_BRIDGE_MAX_REQUEST_BYTES, Xt as MINIMUM_BRIDGE_MAX_REQUEST_BYTES, Yt as MINIMUM_BRIDGE_MAX_REPLY_BYTES, dt as DEFAULT_BRIDGE_MAX_REQUEST_BYTES, ut as DEFAULT_BRIDGE_MAX_REPLY_BYTES } from "./jsonValue-BIEmjG1z.js";
import { n as positiveDecimalIntegerSchema, t as init_positiveDecimalInteger } from "./positiveDecimalInteger-B6WcctiT.js";
import { n as readRuntimeSetting, t as init_runtimeAnalysisSettings } from "./runtimeAnalysisSettings-BhPVC9xk.js";
import { _ as init_analysisErrorCore, l as AnalysisResourceConstraintError } from "./analysisErrorCore-CrdY4k0A.js";
import { basename, isAbsolute } from "node:path";
import { z } from "zod";
import pino from "pino";

//#region dist/config/regexMatchingDeadline.js
var REGEX_MATCHING_DEADLINE_SETTING, DEFAULT_REGEX_MATCHING_DEADLINE, regexMatchingDeadlineConstraint, regexMatchingDeadlineMsSchema, parseRegexMatchingDeadline, resolveRegexMatchingDeadline, regexMatchingDeadlineFacts, regexMatchingDeadlineRecovery, regexMatchingDeadlineContinuingRecovery;
function init_regexMatchingDeadline() {
	return (init_regexMatchingDeadline = __esmMin((() => {
		init_analysisResourceLimits();
		init_positiveDecimalInteger();
		init_configurationErrors();
		init_analysisOperationSnapshot();
		init_result();
		REGEX_MATCHING_DEADLINE_SETTING = "REA_REGEX_MATCHING_DEADLINE_MS";
		DEFAULT_REGEX_MATCHING_DEADLINE = {
			deadlineMs: DEFAULT_REGEX_MATCHING_DEADLINE_MS,
			source: "default"
		};
		regexMatchingDeadlineConstraint = `${REGEX_MATCHING_DEADLINE_SETTING} must be a positive decimal integer from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)} ms; the default is ${String(DEFAULT_REGEX_MATCHING_DEADLINE_MS)} ms. Node schedules a delay above that maximum as 1 ms, so a larger value is refused.`;
		regexMatchingDeadlineMsSchema = positiveDecimalIntegerSchema(1, MAX_NODE_TIMER_DELAY_MS, regexMatchingDeadlineConstraint);
		parseRegexMatchingDeadline = (value) => {
			if (value === undefined) return ok(DEFAULT_REGEX_MATCHING_DEADLINE);
			const parsed = regexMatchingDeadlineMsSchema.safeParse(value);
			return parsed.success ? ok({
				deadlineMs: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(regexMatchingDeadlineConstraint, { settings: [{
				setting: REGEX_MATCHING_DEADLINE_SETTING,
				constraint: regexMatchingDeadlineConstraint
			}] }));
		};
		resolveRegexMatchingDeadline = (environment) => {
			const override = currentAnalysisSettingOverride("regex.matching_deadline_ms");
			if (override !== undefined) return {
				deadlineMs: override,
				source: "runtime"
			};
			const parsed = parseRegexMatchingDeadline(environment[REGEX_MATCHING_DEADLINE_SETTING]);
			if (!parsed.ok) throw parsed.error;
			return parsed.value;
		};
		regexMatchingDeadlineFacts = (deadline) => `The effective ${REGEX_MATCHING_DEADLINE_SETTING} value is ${String(deadline.deadlineMs)} ms (source ${deadline.source}; default ${String(DEFAULT_REGEX_MATCHING_DEADLINE_MS)} ms, floor 1 ms, maximum ${String(MAX_NODE_TIMER_DELAY_MS)} ms).`;
		regexMatchingDeadlineRecovery = (deadline) => [
			regexMatchingDeadlineFacts(deadline),
			`Set ${REGEX_MATCHING_DEADLINE_SETTING} in the environment that starts the next REA invocation. It must be a positive decimal integer from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}.`,
			"The worker old-generation heap does not raise this deadline."
		].join(" ");
		regexMatchingDeadlineContinuingRecovery = (deadline) => [
			regexMatchingDeadlineFacts(deadline),
			`Call update_analysis_settings with setting regex.matching_deadline_ms. It applies to the next match in this session. The launch seed remains ${REGEX_MATCHING_DEADLINE_SETTING}.`,
			"The worker old-generation heap does not raise this deadline."
		].join(" ");
	})))();
}

//#endregion
//#region dist/config/regexWorkerHeapRequest.js
var REGEX_WORKER_HEAP_REQUEST_SETTING, DEFAULT_REGEX_WORKER_HEAP_REQUEST, regexWorkerHeapRequestConstraint, regexWorkerHeapRequestMiBSchema, parseRegexWorkerHeapRequest, resolveRegexWorkerHeapRequest, regexWorkerHeapFacts, regexWorkerHeapRequestRecovery, regexWorkerHeapRequestContinuingRecovery;
function init_regexWorkerHeapRequest() {
	return (init_regexWorkerHeapRequest = __esmMin((() => {
		init_analysisResourceLimits();
		init_positiveDecimalInteger();
		init_configurationErrors();
		init_analysisOperationSnapshot();
		init_result();
		REGEX_WORKER_HEAP_REQUEST_SETTING = "REA_REGEX_WORKER_HEAP_REQUEST_MIB";
		DEFAULT_REGEX_WORKER_HEAP_REQUEST = {
			heapMiB: 128,
			source: "default"
		};
		regexWorkerHeapRequestConstraint = `${REGEX_WORKER_HEAP_REQUEST_SETTING} must be a decimal integer from ${String(7)} to ${String(MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB)} MiB; the default is ${String(128)} MiB. A request below ${String(7)} MiB aborts the worker during startup, and a larger value is refused.`;
		regexWorkerHeapRequestMiBSchema = positiveDecimalIntegerSchema(7, MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB, regexWorkerHeapRequestConstraint);
		parseRegexWorkerHeapRequest = (value) => {
			if (value === undefined) return ok(DEFAULT_REGEX_WORKER_HEAP_REQUEST);
			const parsed = regexWorkerHeapRequestMiBSchema.safeParse(value);
			return parsed.success ? ok({
				heapMiB: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(regexWorkerHeapRequestConstraint, { settings: [{
				setting: REGEX_WORKER_HEAP_REQUEST_SETTING,
				constraint: regexWorkerHeapRequestConstraint
			}] }));
		};
		resolveRegexWorkerHeapRequest = (environment) => {
			const override = currentAnalysisSettingOverride("regex.worker_heap_request_mib");
			if (override !== undefined) return {
				heapMiB: override,
				source: "runtime"
			};
			const parsed = parseRegexWorkerHeapRequest(environment[REGEX_WORKER_HEAP_REQUEST_SETTING]);
			if (!parsed.ok) throw parsed.error;
			return parsed.value;
		};
		regexWorkerHeapFacts = (request) => `The effective ${REGEX_WORKER_HEAP_REQUEST_SETTING} value is ${String(request.heapMiB)} MiB (source ${request.source}; default ${String(128)} MiB, floor ${String(7)} MiB, maximum ${String(MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB)} MiB).`;
		regexWorkerHeapRequestRecovery = (request) => [
			regexWorkerHeapFacts(request),
			`Set ${REGEX_WORKER_HEAP_REQUEST_SETTING} in the environment that starts the next REA invocation. It must be a decimal integer from ${String(7)} to ${String(MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB)}.`,
			"A positive Node --max-old-space-size, including NODE_OPTIONS, overrides this request and sets the effective heap. That flag is not limited by this setting's floor or maximum. Raising host memory alone does not raise the request."
		].join(" ");
		regexWorkerHeapRequestContinuingRecovery = (request) => [
			regexWorkerHeapFacts(request),
			`Call update_analysis_settings with setting regex.worker_heap_request_mib. It changes the request for the next worker in this session. The launch seed remains ${REGEX_WORKER_HEAP_REQUEST_SETTING}.`,
			"A positive Node --max-old-space-size, including NODE_OPTIONS, overrides this request and sets the effective heap. That flag is not limited by this setting's floor or maximum. Raising host memory alone does not raise the request."
		].join(" ");
	})))();
}

//#endregion
//#region dist/config/bridgeMaxRequestBytes.js
var BRIDGE_MAX_REQUEST_BYTES_SETTING, DEFAULT_BRIDGE_MAX_REQUEST, bridgeMaxRequestBytesConstraint, bridgeMaxRequestBytesSchema, parseBridgeMaxRequestBytes, admitBridgeRequestLimit, bridgeRequestLimit, bridgeMaxRequestBytesRecovery, limitFacts, bridgeRequestOversizeError, bridgeRequestLimitMismatchError, bridgeResponseOversizeError;
function init_bridgeMaxRequestBytes() {
	return (init_bridgeMaxRequestBytes = __esmMin((() => {
		init_positiveDecimalInteger();
		init_analysisSettingDefinitions();
		init_analysisErrorCore();
		init_configurationErrors();
		init_result();
		init_runtimeAnalysisSettings();
		init_analysisResourceLimits();
		BRIDGE_MAX_REQUEST_BYTES_SETTING = "REA_BRIDGE_MAX_REQUEST_BYTES";
		DEFAULT_BRIDGE_MAX_REQUEST = {
			maximumBytes: DEFAULT_BRIDGE_MAX_REQUEST_BYTES,
			source: "default"
		};
		bridgeMaxRequestBytesConstraint = `${BRIDGE_MAX_REQUEST_BYTES_SETTING} must be a positive decimal integer from ${String(MINIMUM_BRIDGE_MAX_REQUEST_BYTES)} to ${String(MAXIMUM_BRIDGE_MAX_REQUEST_BYTES)} bytes; the default is ${String(DEFAULT_BRIDGE_MAX_REQUEST_BYTES)} bytes (16 MiB). A value below ${String(MINIMUM_BRIDGE_MAX_REQUEST_BYTES)} bytes cannot carry the largest admitted symbol-name command, and a larger value is refused so the encoded payload plus its framing LF stays one string under Node's single-string ceiling.`;
		bridgeMaxRequestBytesSchema = positiveDecimalIntegerSchema(MINIMUM_BRIDGE_MAX_REQUEST_BYTES, MAXIMUM_BRIDGE_MAX_REQUEST_BYTES, bridgeMaxRequestBytesConstraint);
		parseBridgeMaxRequestBytes = (value) => {
			if (value === undefined) return ok(DEFAULT_BRIDGE_MAX_REQUEST);
			const parsed = bridgeMaxRequestBytesSchema.safeParse(value);
			return parsed.success ? ok({
				maximumBytes: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(bridgeMaxRequestBytesConstraint, { settings: [{
				setting: BRIDGE_MAX_REQUEST_BYTES_SETTING,
				constraint: bridgeMaxRequestBytesConstraint
			}] }));
		};
		admitBridgeRequestLimit = (limit) => readRuntimeSetting(() => ({
			maximumBytes: limit.maximumBytes,
			source: limit.source
		}));
		bridgeRequestLimit = (limit) => analysisSettingLimit("bridge.max_request_bytes", limit.maximumBytes, limit.source);
		bridgeMaxRequestBytesRecovery = (limit, peer = "Hopper") => [`The effective bridge.max_request_bytes value is ${String(limit.maximumBytes)} bytes (source ${limit.source}; default ${String(DEFAULT_BRIDGE_MAX_REQUEST_BYTES)}, floor ${String(MINIMUM_BRIDGE_MAX_REQUEST_BYTES)}, maximum ${String(MAXIMUM_BRIDGE_MAX_REQUEST_BYTES)}). It can be changed at runtime with update_analysis_settings. The launch seed is ${BRIDGE_MAX_REQUEST_BYTES_SETTING}.`, peer === "Ghidra" ? `The Ghidra bridge enforces no request ceiling of its own, so only the REA client applies bridge.max_request_bytes to Ghidra requests.` : "The Hopper or Cutter bridge keeps the ceiling it started with until that bridge starts again."].join(" ");
		limitFacts = (limit) => ({ max_request_bytes: limit.maximumBytes });
		bridgeRequestOversizeError = (operation, limit, payloadBytes, peer) => {
			const recovery = bridgeMaxRequestBytesRecovery(limit, peer);
			const refusal = peer === "Cutter" ? `Cutter request exceeds its authenticated frame limit of ${String(limit.maximumBytes)} bytes; no command was sent.` : `${peer} request exceeds its ${String(limit.maximumBytes)}-byte payload limit; no request was sent.`;
			return new AnalysisResourceConstraintError(operation, "transport", `${refusal} ${recovery}`, {
				...limitFacts(limit),
				payload_bytes: payloadBytes
			}, {
				remediationAction: recovery,
				retryable: false,
				limit: bridgeRequestLimit(limit),
				requestSent: false
			});
		};
		bridgeRequestLimitMismatchError = (operation, limit, bridgeBytes, peer, sent = peer === "Cutter" ? "No command was sent." : "No request was sent.") => {
			const recovery = bridgeMaxRequestBytesRecovery(limit, peer);
			return new AnalysisResourceConstraintError(operation, "transport", `The ${peer} bridge ceiling is ${String(bridgeBytes)} bytes and the REA client ceiling is ${String(limit.maximumBytes)} bytes. ${sent} An out-of-band ${peer} process defaults to ${String(DEFAULT_BRIDGE_MAX_REQUEST_BYTES)} bytes when ${BRIDGE_MAX_REQUEST_BYTES_SETTING} is unset. ${recovery}`, {
				bridge_max_request_bytes: bridgeBytes,
				client_max_request_bytes: limit.maximumBytes
			}, {
				remediationAction: recovery,
				retryable: false,
				limit: bridgeRequestLimit(limit),
				requestSent: false
			});
		};
		bridgeResponseOversizeError = (limit) => {
			const recovery = bridgeMaxRequestBytesRecovery(limit, "Cutter");
			return new AnalysisResourceConstraintError("cutter_command", "transport", `Cutter bridge response exceeded its framed transport limit of ${String(limit.maximumBytes)} bytes. ${recovery}`, limitFacts(limit), {
				remediationAction: recovery,
				retryable: false,
				limit: bridgeRequestLimit(limit),
				requestSent: true
			});
		};
	})))();
}

//#endregion
//#region dist/config/bridgeMaxReplyBytes.js
var BRIDGE_MAX_REPLY_BYTES_SETTING, DEFAULT_BRIDGE_MAX_REPLY, admitBridgeReplyLimit, bridgeMaxReplyBytesConstraint, bridgeMaxReplyBytesSchema, bridgeMaxReplyBytesRecovery, bridgeReplyOversizeError;
function init_bridgeMaxReplyBytes() {
	return (init_bridgeMaxReplyBytes = __esmMin((() => {
		init_positiveDecimalInteger();
		init_analysisSettingDefinitions();
		init_analysisErrorCore();
		init_runtimeAnalysisSettings();
		init_analysisResourceLimits();
		BRIDGE_MAX_REPLY_BYTES_SETTING = "REA_BRIDGE_MAX_REPLY_BYTES";
		DEFAULT_BRIDGE_MAX_REPLY = {
			maximumBytes: DEFAULT_BRIDGE_MAX_REPLY_BYTES,
			source: "default"
		};
		admitBridgeReplyLimit = (limit) => readRuntimeSetting(() => ({
			maximumBytes: limit.maximumBytes,
			source: limit.source
		}));
		bridgeMaxReplyBytesConstraint = `${BRIDGE_MAX_REPLY_BYTES_SETTING} must be a positive decimal integer from ${String(MINIMUM_BRIDGE_MAX_REPLY_BYTES)} to ${String(MAXIMUM_BRIDGE_MAX_REPLY_BYTES)} bytes; the default is ${String(DEFAULT_BRIDGE_MAX_REPLY_BYTES)} bytes (256 MiB). A value below ${String(MINIMUM_BRIDGE_MAX_REPLY_BYTES)} bytes cannot carry a bridge handshake or a full inventory page, and a larger value cannot be decoded as one string.`;
		bridgeMaxReplyBytesSchema = positiveDecimalIntegerSchema(MINIMUM_BRIDGE_MAX_REPLY_BYTES, MAXIMUM_BRIDGE_MAX_REPLY_BYTES, bridgeMaxReplyBytesConstraint);
		bridgeMaxReplyBytesRecovery = (limit) => `The effective bridge.max_reply_bytes value is ${String(limit.maximumBytes)} bytes (source ${limit.source}; default ${String(DEFAULT_BRIDGE_MAX_REPLY_BYTES)}, floor ${String(MINIMUM_BRIDGE_MAX_REPLY_BYTES)}, maximum ${String(MAXIMUM_BRIDGE_MAX_REPLY_BYTES)}). Request a smaller page or narrower selection, or raise it with update_analysis_settings; the launch seed is ${BRIDGE_MAX_REPLY_BYTES_SETTING}. REA closed that bridge connection instead of retaining the reply, so the provider session must start again before its next request.`;
		bridgeReplyOversizeError = (peer, limit, observedBytes) => {
			const recovery = bridgeMaxReplyBytesRecovery(limit);
			return new AnalysisResourceConstraintError(`${peer.toLowerCase()}_bridge_reply`, "transport", `${peer} bridge reply exceeded the ${String(limit.maximumBytes)}-byte reply limit: one reply line reached ${String(observedBytes)} bytes, and REA stopped reading it. ${recovery}`, {
				max_reply_bytes: limit.maximumBytes,
				observed_bytes: observedBytes
			}, {
				remediationAction: recovery,
				retryable: false,
				limit: analysisSettingLimit("bridge.max_reply_bytes", limit.maximumBytes, limit.source)
			});
		};
	})))();
}

//#endregion
//#region dist/config/ghidraExistingProject.js
var GHIDRA_PACKED_PROGRAM_RECOVERY, ghidraProjectPathSchema, ghidraProgramNameSchema;
function init_ghidraExistingProject() {
	return (init_ghidraExistingProject = __esmMin((() => {
		GHIDRA_PACKED_PROGRAM_RECOVERY = "A .gzf is a packed program, not a .gpr project. Import it into a new project with Ghidra analyzeHeadless <project-directory> <project-name> -import <file.gzf> -noanalysis; select its .gpr and, if needed, set REA_GHIDRA_PROGRAM_NAME to the imported program name.";
		ghidraProjectPathSchema = z.string().min(1).refine(isAbsolute, "Ghidra project path must be absolute").superRefine((path, context) => {
			if (path.endsWith(".gpr") && basename(path).length > 4) return;
			context.addIssue({
				code: "custom",
				message: path.toLowerCase().endsWith(".gzf") ? GHIDRA_PACKED_PROGRAM_RECOVERY : "Select an expanded .gpr project marker; restore .grez archives first"
			});
		});
		ghidraProgramNameSchema = z.string().min(1).refine((name) => name.trim().length > 0 && !name.startsWith("-") && !/[\\/\0*?]/u.test(name), "Select one exact program name in the project root, without paths, flags or wildcards");
	})))();
}

//#endregion
//#region dist/config/ghidraDisabledAnalyzers.js
var MAX_GHIDRA_DISABLED_ANALYZER_NAMES, MAX_GHIDRA_DISABLED_ANALYZER_NAME_LENGTH, ghidraAnalyzerNamePattern, ghidraDisabledAnalyzersSchema;
function init_ghidraDisabledAnalyzers() {
	return (init_ghidraDisabledAnalyzers = __esmMin((() => {
		MAX_GHIDRA_DISABLED_ANALYZER_NAMES = 32;
		MAX_GHIDRA_DISABLED_ANALYZER_NAME_LENGTH = 120;
		ghidraAnalyzerNamePattern = /^[A-Za-z0-9][A-Za-z0-9 ._-]*$/u;
		ghidraDisabledAnalyzersSchema = z.string().transform((value) => value.split(",").map((name) => name.trim()).filter((name) => name.length > 0)).refine((names) => names.length <= 32, `must list at most ${32} analyzer names`).refine((names) => names.every((name) => name.length <= 120), `must keep every analyzer name at most ${120} characters`).refine((names) => names.every((name) => ghidraAnalyzerNamePattern.test(name)), "must be Ghidra analyzer names starting with a letter or digit and containing only letters, digits, spaces, periods, underscores, and hyphens").transform((names) => names.length === 0 ? undefined : names);
	})))();
}

//#endregion
//#region dist/logger.js
var createLogger, silentLogger;
function init_logger() {
	return (init_logger = __esmMin((() => {
		createLogger = (mode, level) => pino({
			level,
			base: {
				application: "rea",
				mode
			}
		}, pino.destination({
			dest: 2,
			sync: false
		}));
		silentLogger = pino({ level: "silent" });
	})))();
}

//#endregion
export { DEFAULT_REGEX_MATCHING_DEADLINE as A, DEFAULT_REGEX_WORKER_HEAP_REQUEST as C, regexWorkerHeapRequestMiBSchema as D, regexWorkerHeapRequestContinuingRecovery as E, regexMatchingDeadlineRecovery as F, resolveRegexMatchingDeadline as I, init_regexMatchingDeadline as M, regexMatchingDeadlineContinuingRecovery as N, regexWorkerHeapRequestRecovery as O, regexMatchingDeadlineMsSchema as P, parseBridgeMaxRequestBytes as S, init_regexWorkerHeapRequest as T, bridgeMaxRequestBytesSchema as _, init_ghidraDisabledAnalyzers as a, bridgeResponseOversizeError as b, init_ghidraExistingProject as c, bridgeMaxReplyBytesSchema as d, bridgeReplyOversizeError as f, admitBridgeRequestLimit as g, DEFAULT_BRIDGE_MAX_REQUEST as h, ghidraDisabledAnalyzersSchema as i, REGEX_MATCHING_DEADLINE_SETTING as j, resolveRegexWorkerHeapRequest as k, DEFAULT_BRIDGE_MAX_REPLY as l, BRIDGE_MAX_REQUEST_BYTES_SETTING as m, init_logger as n, ghidraProgramNameSchema as o, init_bridgeMaxReplyBytes as p, silentLogger as r, ghidraProjectPathSchema as s, createLogger as t, admitBridgeReplyLimit as u, bridgeRequestLimitMismatchError as v, REGEX_WORKER_HEAP_REQUEST_SETTING as w, init_bridgeMaxRequestBytes as x, bridgeRequestOversizeError as y };