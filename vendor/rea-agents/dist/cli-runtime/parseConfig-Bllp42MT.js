import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS, DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS, DEFAULT_HOPPER_STARTUP_TIMEOUT_MS, MAX_NODE_TIMER_DELAY_MS, analysisSettingLimit, init_analysisResourceLimits, init_analysisSettingDefinitions, init_configurationErrors, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { DEFAULT_BRIDGE_MAX_REPLY, DEFAULT_REGEX_MATCHING_DEADLINE, DEFAULT_REGEX_WORKER_HEAP_REQUEST, init_analysisSettings, init_bridgeMaxReplyBytes, init_regexMatchingDeadline, init_regexWorkerHeapRequest, inspectAnalysisSettingSeeds, launchAnalysisSetting } from "./analysisSettings-MZ1xRfTM.js";
import { init_providerStartupTimeout, providerStartupTimeoutSchema } from "./providerStartupTimeout-DNZGsNYA.js";
import { DEFAULT_BRIDGE_MAX_REQUEST, init_bridgeMaxRequestBytes } from "./bridgeMaxRequestBytes-Y_e4yDJ8.js";
import { init_environment, parseEnvironment } from "./environment-BysPqLj9.js";
import { init_relationshipCoverage, unknownRelationshipCoverageSchema } from "./relationshipCoverage-2rn3-vch.js";
import { z } from "zod";

//#region dist/domain/native/hopperCallerReconciliation.js
var HOPPER_CALLER_PAGE_ALLOWANCE_BYTES, HOPPER_CALLER_SCAN_RETENTION_BYTES, hopperCallerScanStopSchema, hopperCallerScanFactsSchema, hopperCallerReconciliationPartialSchema, stopDetail, formatHopperCallerScanReason;
function init_hopperCallerReconciliation() {
	return (init_hopperCallerReconciliation = __esmMin((() => {
		init_jsonValue();
		init_relationshipCoverage();
		HOPPER_CALLER_PAGE_ALLOWANCE_BYTES = 512 * 1024;
		HOPPER_CALLER_SCAN_RETENTION_BYTES = 4 * 1024 * 1024;
		hopperCallerScanStopSchema = z.discriminatedUnion("code", [
			z.strictObject({ code: z.literal("complete") }),
			z.strictObject({
				code: z.literal("work_budget"),
				budget_ms: z.int().positive()
			}),
			z.strictObject({ code: z.literal("inventory_changed") }),
			z.strictObject({
				code: z.literal("page_allowance"),
				allowance_bytes: z.literal(HOPPER_CALLER_PAGE_ALLOWANCE_BYTES)
			}),
			z.strictObject({
				code: z.literal("retention_budget"),
				allowance_bytes: z.literal(HOPPER_CALLER_SCAN_RETENTION_BYTES)
			}),
			z.strictObject({ code: z.literal("cancelled") }),
			z.strictObject({ code: z.literal("page_failure") }),
			z.strictObject({ code: z.literal("invalid_page") }),
			z.strictObject({ code: z.literal("invalid_progress") })
		]);
		hopperCallerScanFactsSchema = z.strictObject({
			examined_procedures: z.int().nonnegative(),
			procedure_total: z.int().nonnegative().nullable(),
			retained_bytes: z.int().nonnegative(),
			stop: hopperCallerScanStopSchema,
			instructions_complete: z.boolean(),
			native_callers_complete: z.boolean().nullable()
		});
		hopperCallerReconciliationPartialSchema = z.strictObject({
			kind: z.literal("hopper-caller-reconciliation"),
			native_result: jsonValueSchema,
			scan: hopperCallerScanFactsSchema.nullable(),
			forward_destinations: jsonValueSchema.nullable(),
			unread_page: jsonValueSchema.optional(),
			coverage: unknownRelationshipCoverageSchema
		});
		stopDetail = (stop) => {
			switch (stop.code) {
				case "complete": return "";
				case "work_budget": return `the ${String(stop.budget_ms)} ms reconciliation work budget was reached`;
				case "inventory_changed": return "the procedure inventory changed during reconciliation";
				case "page_allowance": return `a single procedure exceeded the ${String(HOPPER_CALLER_PAGE_ALLOWANCE_BYTES)} byte page allowance`;
				case "retention_budget": return `the ${String(stop.allowance_bytes)} byte reconciliation retention budget was reached`;
				case "cancelled": return "cancellation was observed after completed scan observations";
				case "page_failure": return "a later scan page failed";
				case "invalid_page": return "a scan page reply did not match the scan schema";
				case "invalid_progress": return "a scan page reported inconsistent progress";
			}
		};
		formatHopperCallerScanReason = (facts) => {
			const total = facts.procedure_total === null ? "unknown" : String(facts.procedure_total);
			const detail = stopDetail(facts.stop);
			let reason = `Hopper caller reconciliation examined ${String(facts.examined_procedures)} of ${total} procedures and retained ${String(facts.retained_bytes)} encoded bytes${detail === "" ? "" : `; ${detail}`}. Forward and reverse API coverage and consistency during the live scan remain unknown.`;
			if (!facts.instructions_complete) reason += ` Target instruction enumeration reached the ${String(HOPPER_CALLER_PAGE_ALLOWANCE_BYTES)} byte allowance; incoming call-site coverage is incomplete.`;
			if (facts.native_callers_complete === false) reason += ` Native caller enumeration reached the ${String(HOPPER_CALLER_PAGE_ALLOWANCE_BYTES)} byte allowance.`;
			return reason;
		};
	})))();
}

//#endregion
//#region dist/config/hopperCallerScanBudget.js
var HOPPER_CALLER_SCAN_BUDGET_SETTING, defaultHopperCallerScanBudget, hopperCallerScanBudgetFromEnvironment, hopperCallerScanBudgetForMilliseconds, fixedAllowanceRecovery, hopperCallerScanLimit, hopperCallerScanRecovery;
function init_hopperCallerScanBudget() {
	return (init_hopperCallerScanBudget = __esmMin((() => {
		init_analysisSettingDefinitions();
		init_analysisResourceLimits();
		init_hopperCallerReconciliation();
		HOPPER_CALLER_SCAN_BUDGET_SETTING = "REA_HOPPER_CALLER_SCAN_BUDGET_MS";
		defaultHopperCallerScanBudget = () => ({
			setting: HOPPER_CALLER_SCAN_BUDGET_SETTING,
			milliseconds: DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS,
			source: "default",
			defaultMilliseconds: DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS,
			floorMilliseconds: 1,
			maximumMilliseconds: MAX_NODE_TIMER_DELAY_MS
		});
		hopperCallerScanBudgetFromEnvironment = (configured, milliseconds) => ({
			...defaultHopperCallerScanBudget(),
			milliseconds,
			source: configured === undefined ? "default" : "setting"
		});
		hopperCallerScanBudgetForMilliseconds = (milliseconds) => hopperCallerScanBudgetFromEnvironment(milliseconds === 2e3 ? undefined : String(milliseconds), milliseconds);
		fixedAllowanceRecovery = `This release has no runtime override for the ${String(HOPPER_CALLER_PAGE_ALLOWANCE_BYTES)} byte instruction, native-caller, and page allowances or the ${String(HOPPER_CALLER_SCAN_RETENTION_BYTES)} byte retention budget. hopper.caller_scan_budget_ms does not raise them.`;
		hopperCallerScanLimit = (budget) => analysisSettingLimit("hopper.caller_scan_budget_ms", budget.milliseconds, budget.source);
		hopperCallerScanRecovery = (facts, budget) => {
			const fixedLimit = facts.stop.code === "page_allowance" || facts.stop.code === "retention_budget" || !facts.instructions_complete || facts.native_callers_complete === false;
			if (facts.stop.code === "work_budget") {
				const limit = hopperCallerScanLimit(budget);
				return `hopper.caller_scan_budget_ms is ${String(limit.effective_value)} ms (source ${limit.source ?? "unknown"}; default ${String(budget.defaultMilliseconds)} ms, floor ${String(limit.minimum)} ms, maximum ${String(limit.maximum)} ms). It can be changed at runtime with update_analysis_settings. The launch seed is ${budget.setting}. ${fixedAllowanceRecovery}`;
			}
			return fixedLimit ? fixedAllowanceRecovery : "";
		};
	})))();
}

//#endregion
//#region dist/config/parseConfig.js
var nativeAnalysisEnvironment, inspectNativeAnalysisConfiguration, parseConfig;
function init_parseConfig() {
	return (init_parseConfig = __esmMin((() => {
		init_configurationErrors();
		init_result();
		init_analysisSettings();
		init_environment();
		init_providerStartupTimeout();
		init_analysisResourceLimits();
		init_bridgeMaxRequestBytes();
		init_bridgeMaxReplyBytes();
		init_hopperCallerScanBudget();
		init_regexMatchingDeadline();
		init_regexWorkerHeapRequest();
		nativeAnalysisEnvironment = (environment) => {
			const { REA_JEB_MCP_TIMEOUT_MS: _jebTimeout, REA_JEB_MCP_URL: _jebUrl, ...appEnvironment } = environment;
			return appEnvironment;
		};
		inspectNativeAnalysisConfiguration = (environment) => {
			const parsed = parseEnvironment(nativeAnalysisEnvironment(environment));
			const issues = [...parsed.ok ? [] : parsed.error.settings, ...inspectAnalysisSettingSeeds(nativeAnalysisEnvironment(environment))];
			const configuredTimeout = environment.REA_HOPPER_STARTUP_TIMEOUT_MS;
			if (configuredTimeout === undefined) return { issues };
			const admitted = launchAnalysisSetting("hopper.startup_timeout_ms", environment);
			if (parsed.ok && admitted.ok && admitted.value.value !== null) return {
				issues,
				configuredHopperStartupTimeout: ok(admitted.value.value)
			};
			const timeout = providerStartupTimeoutSchema.safeParse(configuredTimeout);
			return {
				issues,
				configuredHopperStartupTimeout: timeout.success ? ok(timeout.data) : err(new ConfigurationError("Invalid REA environment configuration", {
					cause: timeout.error,
					settings: timeout.error.issues.map(({ message }) => ({
						setting: "REA_HOPPER_STARTUP_TIMEOUT_MS",
						constraint: message
					}))
				}))
			};
		};
		parseConfig = (environment) => {
			const parsed = parseEnvironment(nativeAnalysisEnvironment(environment));
			if (!parsed.ok) return parsed;
			const env = parsed.value;
			const invalidRuntimeSeeds = {};
			const admitted = (id) => {
				const result = launchAnalysisSetting(id, environment);
				if (result.ok) return result.value.value;
				invalidRuntimeSeeds[id] = result.error;
				return undefined;
			};
			const ghidraStartup = admitted("ghidra.startup_timeout_ms");
			const hopperStartup = admitted("hopper.startup_timeout_ms");
			const decompileTimeout = admitted("ghidra.decompile_timeout_seconds");
			const decompilePayload = admitted("ghidra.decompile_max_payload_mib");
			const valueFlowOperations = admitted("ghidra.value_flow_max_operations");
			const valueFlowInputs = admitted("ghidra.value_flow_max_inputs_per_operation");
			const valueFlowEdges = admitted("ghidra.value_flow_max_edges");
			const callerScan = admitted("hopper.caller_scan_budget_ms");
			const bridgeBytes = admitted("bridge.max_request_bytes");
			const bridgeReplyBytes = admitted("bridge.max_reply_bytes");
			const regexDeadline = admitted("regex.matching_deadline_ms");
			const regexHeap = admitted("regex.worker_heap_request_mib");
			return ok({
				...env.REA_MCP_TOOL_FAMILIES === undefined ? {} : { mcpToolFamilies: env.REA_MCP_TOOL_FAMILIES },
				...env.REA_MCP_MAX_RESPONSE_BYTES === undefined ? {} : { mcpMaxResponseBytes: env.REA_MCP_MAX_RESPONSE_BYTES },
				...env.REA_MCP_MAX_INPUT_ELEMENTS === undefined ? {} : { mcpMaxInputElements: env.REA_MCP_MAX_INPUT_ELEMENTS },
				...env.REA_MCP_OUTPUT_SCHEMA_PROFILE === undefined ? {} : { mcpOutputSchemaProfile: env.REA_MCP_OUTPUT_SCHEMA_PROFILE },
				...env.REA_MCP_TOOL_CATALOG_PROFILE === undefined ? {} : { mcpToolCatalogProfile: env.REA_MCP_TOOL_CATALOG_PROFILE },
				analysisProvider: env.REA_ANALYSIS_PROVIDER,
				...env.REA_IDA_MCP_CONFIG === undefined ? {} : { idaMcpConfigPath: env.REA_IDA_MCP_CONFIG },
				...env.REA_GHIDRA_PROJECT_PATH === undefined ? {} : { ghidraExistingProject: {
					path: env.REA_GHIDRA_PROJECT_PATH,
					...env.REA_GHIDRA_PROGRAM_NAME === undefined ? {} : { programName: env.REA_GHIDRA_PROGRAM_NAME }
				} },
				ghidraInstallDir: env.GHIDRA_INSTALL_DIR,
				...env.REA_GHIDRA_CHECKPOINT_DIR === undefined ? {} : { ghidraCheckpointDirectory: env.REA_GHIDRA_CHECKPOINT_DIR },
				ghidraJavaHome: env.JAVA_HOME,
				ghidraStartupTimeoutMs: ghidraStartup ?? 33e4,
				...decompilePayload === undefined || decompilePayload === null ? {} : { ghidraDecompileMaxPayloadMiB: decompilePayload },
				...valueFlowOperations === undefined || valueFlowOperations === null ? {} : { ghidraValueFlowMaxOperations: valueFlowOperations },
				...valueFlowInputs === undefined || valueFlowInputs === null ? {} : { ghidraValueFlowMaxInputsPerOperation: valueFlowInputs },
				...valueFlowEdges === undefined || valueFlowEdges === null ? {} : { ghidraValueFlowMaxEdges: valueFlowEdges },
				...decompileTimeout === undefined || decompileTimeout === null ? {} : { ghidraDecompileTimeoutSeconds: decompileTimeout },
				...env.REA_GHIDRA_LANGUAGE_ID === undefined ? {} : { ghidraLanguageOverride: {
					languageId: env.REA_GHIDRA_LANGUAGE_ID,
					...env.REA_GHIDRA_COMPILER_SPEC_ID === undefined ? {} : { compilerSpecId: env.REA_GHIDRA_COMPILER_SPEC_ID }
				} },
				...env.REA_GHIDRA_SEED_FILE === undefined ? {} : { ghidraSeedFile: env.REA_GHIDRA_SEED_FILE },
				...env.REA_GHIDRA_DISABLED_ANALYZERS === undefined ? {} : { ghidraDisabledAnalyzers: env.REA_GHIDRA_DISABLED_ANALYZERS },
				...env.REA_GHIDRA_NATIVEAOT_JAR === undefined ? {} : { ghidraNativeAotJar: env.REA_GHIDRA_NATIVEAOT_JAR },
				ilspyCmdPath: env.REA_ILSPY_CMD_PATH,
				hopperLauncherPath: env.HOPPER_LAUNCHER_PATH,
				hopperStartupTimeoutMs: hopperStartup ?? 12e4,
				hopperStartupTimeoutSource: environment.REA_HOPPER_STARTUP_TIMEOUT_MS === undefined || hopperStartup === undefined ? "default" : "setting",
				hopperCallerScanBudget: hopperCallerScanBudgetFromEnvironment(callerScan === undefined || environment.REA_HOPPER_CALLER_SCAN_BUDGET_MS === undefined ? undefined : environment.REA_HOPPER_CALLER_SCAN_BUDGET_MS, callerScan ?? 2e3),
				hopperTargetPath: env.HOPPER_TARGET_PATH,
				hopperTargetKind: env.HOPPER_TARGET_KIND,
				hopperLoaderArgs: env.loaderArgs,
				logLevel: env.REA_LOG_LEVEL,
				referenceSourcePolicy: { secretPatterns: env.referenceSecretPatterns },
				bridgeMaxRequestBytes: bridgeBytes === undefined || bridgeBytes === null || environment.REA_BRIDGE_MAX_REQUEST_BYTES === undefined ? DEFAULT_BRIDGE_MAX_REQUEST : {
					maximumBytes: bridgeBytes,
					source: "setting"
				},
				bridgeMaxReplyBytes: bridgeReplyBytes === undefined || bridgeReplyBytes === null || environment.REA_BRIDGE_MAX_REPLY_BYTES === undefined ? DEFAULT_BRIDGE_MAX_REPLY : {
					maximumBytes: bridgeReplyBytes,
					source: "setting"
				},
				regexMatchingDeadline: regexDeadline === undefined || regexDeadline === null || environment.REA_REGEX_MATCHING_DEADLINE_MS === undefined ? DEFAULT_REGEX_MATCHING_DEADLINE : {
					deadlineMs: regexDeadline,
					source: "setting"
				},
				regexWorkerHeapRequest: regexHeap === undefined || regexHeap === null || environment.REA_REGEX_WORKER_HEAP_REQUEST_MIB === undefined ? DEFAULT_REGEX_WORKER_HEAP_REQUEST : {
					heapMiB: regexHeap,
					source: "setting"
				},
				invalidRuntimeSeeds
			});
		};
	})))();
}

//#endregion
export { HOPPER_CALLER_PAGE_ALLOWANCE_BYTES, HOPPER_CALLER_SCAN_RETENTION_BYTES, formatHopperCallerScanReason, hopperCallerReconciliationPartialSchema, hopperCallerScanBudgetForMilliseconds, hopperCallerScanRecovery, init_hopperCallerReconciliation, init_hopperCallerScanBudget, init_parseConfig, inspectNativeAnalysisConfiguration, parseConfig };