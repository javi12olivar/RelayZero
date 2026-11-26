import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ANALYSIS_SETTINGS, AnalysisResourceConstraintError, ConfigurationError, DEFAULT_BRIDGE_MAX_REPLY_BYTES, DEFAULT_REGEX_MATCHING_DEADLINE_MS, MAXIMUM_BRIDGE_MAX_REPLY_BYTES, MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB, MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS, MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB, MAX_NODE_TIMER_DELAY_MS, MINIMUM_BRIDGE_MAX_REPLY_BYTES, analysisSettingDefinition, analysisSettingLimit, init_analysisErrorCore, init_analysisResourceLimits, init_analysisSettingDefinitions, init_configurationErrors } from "./jsonSerialization-DAF9DVXC.js";
import { asarMaxHeaderBytesSchema, asarMaxListingBytesSchema, currentAnalysisSettingOverride, init_analysisOperationSnapshot, init_asarHeaderAdmission, init_asarListingAdmission, init_windowsChangeTimeSettle, init_zstandardFrameAllowance, windowsChangeTimeDriftMsSchema, windowsChangeTimeSettleMaxPollsSchema, windowsChangeTimeSettlePollMsSchema, zstandardMaxFramesSchema } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ghidraDecompileTimeoutSchema, init_providerStartupTimeout, providerStartupTimeoutSchema } from "./providerStartupTimeout-DNZGsNYA.js";
import { init_positiveDecimalInteger, positiveDecimalIntegerSchema } from "./positiveDecimalInteger-BhPy7XMJ.js";
import { captureDecoderOldGenerationMiBSchema, init_captureDecoderHeap, init_runtimeAnalysisSettings, readRuntimeSetting } from "./runtimeAnalysisSettings-CJ3kVGDD.js";
import { capturePacketJsonExpansionBytesSchema, init_capturePacketJsonExpansion } from "./capturePacketJsonExpansion-gtEDmQip.js";
import { init_nativeMatchingAllowance, parseNativeMatchingAllowance } from "./nativeMatchingAllowance-BFZWHqdM.js";
import { init_javascriptMemberMutationAllowance, javaScriptMemberMutationAliasStatesSchema } from "./javascriptMemberMutationAllowance-Buy1-9LU.js";
import { bridgeMaxRequestBytesSchema, init_bridgeMaxRequestBytes } from "./bridgeMaxRequestBytes-Y_e4yDJ8.js";
import { debuggerCommandDeadlineMsSchema, debuggerMaxCommandOutputBytesSchema, init_debuggerSessionLimits } from "./debuggerSessionLimits-C0Btgiac.js";
import { init_pwntoolsInputLimit, pwntoolsInputBytesSchema } from "./pwntoolsInputLimit-M8xu91tH.js";
import { z } from "zod";

//#region dist/config/ghidraValueFlowLimits.js
var ghidraValueFlowCountSchema, ghidraDecompilePayloadMiBSchema;
function init_ghidraValueFlowLimits() {
	return (init_ghidraValueFlowLimits = __esmMin((() => {
		init_analysisResourceLimits();
		ghidraValueFlowCountSchema = z.string().regex(/^[1-9]\d*$/u, "Expected a positive decimal integer").transform(Number).pipe(z.number().int().min(1).max(MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS));
		ghidraDecompilePayloadMiBSchema = z.string().regex(/^[1-9]\d*$/u, "Expected a positive decimal MiB value").transform(Number).pipe(z.number().int().min(1).max(MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB));
	})))();
}

//#endregion
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
//#region dist/config/analysisSettings.js
var environmentSchemas, launchAnalysisSetting, inspectAnalysisSettingSeeds;
function init_analysisSettings() {
	return (init_analysisSettings = __esmMin((() => {
		init_result();
		init_analysisSettingDefinitions();
		init_configurationErrors();
		init_asarHeaderAdmission();
		init_asarListingAdmission();
		init_ghidraValueFlowLimits();
		init_providerStartupTimeout();
		init_regexMatchingDeadline();
		init_regexWorkerHeapRequest();
		init_captureDecoderHeap();
		init_capturePacketJsonExpansion();
		init_nativeMatchingAllowance();
		init_javascriptMemberMutationAllowance();
		init_bridgeMaxRequestBytes();
		init_bridgeMaxReplyBytes();
		init_debuggerSessionLimits();
		init_windowsChangeTimeSettle();
		init_pwntoolsInputLimit();
		init_zstandardFrameAllowance();
		environmentSchemas = {
			REA_ASAR_MAX_HEADER_BYTES: asarMaxHeaderBytesSchema,
			REA_ASAR_MAX_LISTING_BYTES: asarMaxListingBytesSchema,
			REA_GHIDRA_VALUE_FLOW_MAX_OPERATIONS: ghidraValueFlowCountSchema,
			REA_GHIDRA_VALUE_FLOW_MAX_INPUTS_PER_OPERATION: ghidraValueFlowCountSchema,
			REA_GHIDRA_VALUE_FLOW_MAX_EDGES: ghidraValueFlowCountSchema,
			REA_GHIDRA_DECOMPILE_MAX_PAYLOAD_MIB: ghidraDecompilePayloadMiBSchema,
			REA_GHIDRA_STARTUP_TIMEOUT_MS: providerStartupTimeoutSchema,
			REA_HOPPER_STARTUP_TIMEOUT_MS: providerStartupTimeoutSchema,
			REA_GHIDRA_DECOMPILE_TIMEOUT_SECONDS: ghidraDecompileTimeoutSchema,
			REA_JADX_OPERATION_TIMEOUT_MS: providerStartupTimeoutSchema,
			REA_REGEX_MATCHING_DEADLINE_MS: regexMatchingDeadlineMsSchema,
			REA_REGEX_WORKER_HEAP_REQUEST_MIB: regexWorkerHeapRequestMiBSchema,
			REA_CAPTURE_DECODER_OLD_GENERATION_MIB: captureDecoderOldGenerationMiBSchema,
			REA_CAPTURE_PACKET_JSON_EXPANSION_BYTES: capturePacketJsonExpansionBytesSchema,
			REA_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES: javaScriptMemberMutationAliasStatesSchema,
			REA_BRIDGE_MAX_REQUEST_BYTES: bridgeMaxRequestBytesSchema,
			REA_BRIDGE_MAX_REPLY_BYTES: bridgeMaxReplyBytesSchema,
			REA_DEBUGGER_COMMAND_DEADLINE_MS: debuggerCommandDeadlineMsSchema,
			REA_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES: debuggerMaxCommandOutputBytesSchema,
			REA_HOPPER_CALLER_SCAN_BUDGET_MS: providerStartupTimeoutSchema,
			REA_JEB_MCP_TIMEOUT_MS: providerStartupTimeoutSchema,
			REA_KUNA_PROJECT_TIMEOUT_MS: providerStartupTimeoutSchema,
			REA_KUNA_TIMEOUT_MS: providerStartupTimeoutSchema,
			REA_PWNTOOLS_MAX_INPUT_BYTES: pwntoolsInputBytesSchema,
			REA_WINDOWS_CHANGE_TIME_DRIFT_MS: windowsChangeTimeDriftMsSchema,
			REA_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS: windowsChangeTimeSettlePollMsSchema,
			REA_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS: windowsChangeTimeSettleMaxPollsSchema,
			REA_ZSTD_MAX_FRAMES: zstandardMaxFramesSchema
		};
		launchAnalysisSetting = (id, environment) => {
			if (id === "native.matching_representation_bytes") {
				const parsed = parseNativeMatchingAllowance(environment);
				return parsed.ok ? ok({
					value: parsed.value.maximumBytes,
					source: parsed.value.source
				}) : parsed;
			}
			const definition = analysisSettingDefinition(id);
			const raw = definition.environment === undefined ? undefined : environment[definition.environment];
			if (raw === undefined) return ok({
				value: definition.defaultValue,
				source: "default"
			});
			const parsed = environmentSchemas[definition.environment]?.safeParse(raw);
			if (parsed?.success !== true) return err(new ConfigurationError(`Invalid ${definition.environment}`, { settings: [{
				setting: definition.environment,
				constraint: `Expected an integer from ${definition.minimum} to ${definition.maximum} ${definition.unit}`
			}] }));
			return ok({
				value: parsed.data,
				source: "setting"
			});
		};
		inspectAnalysisSettingSeeds = (environment, unresolvedSettings = new Set()) => Object.keys(ANALYSIS_SETTINGS).flatMap((key) => {
			const id = key;
			const definition = analysisSettingDefinition(id);
			if (definition.environment === undefined || unresolvedSettings.has(definition.environment)) return [];
			const parsed = launchAnalysisSetting(id, environment);
			return parsed.ok ? [] : parsed.error.settings;
		});
	})))();
}

//#endregion
export { DEFAULT_BRIDGE_MAX_REPLY, DEFAULT_REGEX_MATCHING_DEADLINE, DEFAULT_REGEX_WORKER_HEAP_REQUEST, REGEX_MATCHING_DEADLINE_SETTING, REGEX_WORKER_HEAP_REQUEST_SETTING, admitBridgeReplyLimit, bridgeReplyOversizeError, init_analysisSettings, init_bridgeMaxReplyBytes, init_regexMatchingDeadline, init_regexWorkerHeapRequest, inspectAnalysisSettingSeeds, launchAnalysisSetting, regexMatchingDeadlineContinuingRecovery, regexMatchingDeadlineRecovery, regexWorkerHeapRequestContinuingRecovery, regexWorkerHeapRequestRecovery, resolveRegexMatchingDeadline, resolveRegexWorkerHeapRequest };