import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisResourceConstraintError, DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, DEFAULT_PWNTOOLS_MAX_INPUT_BYTES, MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, MAX_NODE_TIMER_DELAY_MS, analysisSettingLimit, deadlineParameterLimit, fixedAllowanceOptions, init_analysisErrorCore, init_analysisResourceLimits, init_analysisSettingDefinitions, init_fixedAllowanceRemediation, timerDurationMsSchema } from "./jsonSerialization-DAF9DVXC.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { z } from "zod";

//#region dist/domain/javascript/javascriptSemanticWorkAllowance.js
var JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT, JAVASCRIPT_MEMBER_MUTATION_WORK_LIMIT, javaScriptRefusedPhaseSchema, DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE, javaScriptMemberMutationAllowanceSchema, javaScriptMemberMutationAllowanceField, javaScriptMemberMutationAllowanceFromField, recovery, javaScriptMemberMutationRefusal, isJavaScriptMemberMutationRefusal, reportsJavaScriptMemberMutationRefusal, JavaScriptSemanticWorkMeter;
function init_javascriptSemanticWorkAllowance() {
	return (init_javascriptSemanticWorkAllowance = __esmMin((() => {
		init_budget();
		init_analysisErrorCore();
		init_analysisResourceLimits();
		init_analysisSettingDefinitions();
		JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT = "REA_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES";
		JAVASCRIPT_MEMBER_MUTATION_WORK_LIMIT = "javascript_member_mutation_alias_state_limit";
		javaScriptRefusedPhaseSchema = z.literal("member-mutations");
		DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE = {
			aliasStates: DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES,
			source: "default"
		};
		javaScriptMemberMutationAllowanceSchema = z.strictObject({
			alias_states: z.int().min(1).max(MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES),
			source: z.enum([
				"default",
				"setting",
				"runtime",
				"request"
			])
		});
		javaScriptMemberMutationAllowanceField = (allowance) => ({
			alias_states: allowance.aliasStates,
			source: allowance.source
		});
		javaScriptMemberMutationAllowanceFromField = (field) => ({
			aliasStates: field.alias_states,
			source: field.source
		});
		recovery = (allowance) => {
			const current = `The effective javascript.member_mutation_alias_states value is ${String(allowance.aliasStates)} alias states (source ${allowance.source}; default ${String(DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES)}, maximum ${String(MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES)}).`;
			const change = allowance.aliasStates >= 8388608 ? "It is already at the maximum; do not increase it further. Select another complete source within the allowance." : `Raise it with update_analysis_settings on MCP, or ${JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT} for CLI or future REA processes, then retry. Each scheduled state retains about 1–2 KiB of worker heap until its query finishes, so raise max_heap_mb with it (about 2 MiB per 1,024 states).`;
			return `${current} ${change} max_heap_mb, analysis_timeout_ms and semantic_precision alone do not admit the same source. Repeating the unchanged request fails the same way.`;
		};
		javaScriptMemberMutationRefusal = (operation, allowance, limits = {}, capturedOutput) => {
			const remediationAction = recovery(allowance);
			return new AnalysisResourceConstraintError(operation, "cpu", `JavaScript member-mutation analysis scheduled more than ${String(allowance.aliasStates)} alias states for one source`, {
				...limits,
				[JAVASCRIPT_MEMBER_MUTATION_WORK_LIMIT]: allowance.aliasStates
			}, {
				retryable: false,
				remediationAction,
				limit: analysisSettingLimit("javascript.member_mutation_alias_states", allowance.aliasStates, allowance.source),
				...capturedOutput === undefined ? {} : { capturedOutput }
			});
		};
		isJavaScriptMemberMutationRefusal = (cause) => cause instanceof AnalysisResourceConstraintError && reportsJavaScriptMemberMutationRefusal(cause.reportedLimits);
		reportsJavaScriptMemberMutationRefusal = (limits) => typeof limits?.[JAVASCRIPT_MEMBER_MUTATION_WORK_LIMIT] === "number";
		JavaScriptSemanticWorkMeter = class {
			allowance;
			#aliasStates;
			constructor(allowance = DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE) {
				this.allowance = allowance;
				this.#aliasStates = new Budget(allowance.aliasStates);
			}
			charge(units = 1) {
				this.#aliasStates.charge(units, () => javaScriptMemberMutationRefusal("analyze_javascript_semantics", this.allowance));
			}
		};
	})))();
}

//#endregion
//#region dist/domain/producerResourceLimits.js
var producerResourceLimitsSchema, BOUNDED_PRODUCER_LIMITS, resolveProducerLimits, producerLimitControl, boundedProducerLimitsSchema, boundedProducerLimitsResultSchema;
function init_producerResourceLimits() {
	return (init_producerResourceLimits = __esmMin((() => {
		init_analysisResourceLimits();
		producerResourceLimitsSchema = z.strictObject({
			input_bytes: z.int().positive().optional(),
			output_bytes: z.int().positive().optional(),
			diagnostic_bytes: z.int().positive().optional(),
			command_timeout_ms: timerDurationMsSchema.optional(),
			address_space_bytes: z.int().positive().optional(),
			file_bytes: z.int().positive().optional(),
			cpu_seconds: z.int().positive().optional()
		});
		BOUNDED_PRODUCER_LIMITS = {
			input_bytes: 32 * 1024 * 1024,
			output_bytes: 4 * 1024 * 1024,
			command_timeout_ms: 3e4,
			address_space_bytes: 1024 * 1024 * 1024,
			file_bytes: 64 * 1024 * 1024,
			cpu_seconds: 30
		};
		resolveProducerLimits = (defaults, selected) => Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, selected?.[key] ?? value]));
		producerLimitControl = (field, effectiveValue, defaultValue) => ({
			control_kind: "parameter",
			parameter: `producer_limits.${field}`,
			effective_value: effectiveValue,
			unit: field === "cpu_seconds" ? "seconds" : "bytes",
			minimum: 1,
			maximum: Number.MAX_SAFE_INTEGER,
			default_value: defaultValue,
			applies_at: "next_call"
		});
		boundedProducerLimitsSchema = producerResourceLimitsSchema.omit({ diagnostic_bytes: true }).optional().describe("Per-call producer limits in bytes, CPU seconds and wall-clock milliseconds. Omitted fields preserve defaults (32 MiB input, 4 MiB combined output, 30000 ms command, 1 GiB address space, 64 MiB per file, 30 CPU seconds); changes apply on the next call without restart. Tighter inherited OS limits remain enforced. These controls do not raise parser, protocol or transport limits.");
		boundedProducerLimitsResultSchema = producerResourceLimitsSchema.omit({ diagnostic_bytes: true }).required().extend({
			address_space_bytes: z.int().nonnegative(),
			file_bytes: z.int().nonnegative(),
			cpu_seconds: z.int().nonnegative()
		});
	})))();
}

//#endregion
//#region dist/domain/native/nativeDeadlines.js
var DEFAULT_NATIVE_COMMAND_TIMEOUT_MS, DEFAULT_NATIVE_UI_DEADLINE_MS, DEFAULT_PWNTOOLS_TIMEOUT_MS, NATIVE_UI_WAIT_STEP_MAX_MS, deadlineField, nativeCommandTimeoutField, nativeUiDeadlineField, pwntoolsTimeoutField, readNativeDeadline, nativeDeadlineRecovery, fixedNativeAllowance;
function init_nativeDeadlines() {
	return (init_nativeDeadlines = __esmMin((() => {
		init_analysisResourceLimits();
		init_fixedAllowanceRemediation();
		DEFAULT_NATIVE_COMMAND_TIMEOUT_MS = 6e4;
		DEFAULT_NATIVE_UI_DEADLINE_MS = 18e4;
		DEFAULT_PWNTOOLS_TIMEOUT_MS = 3e4;
		NATIVE_UI_WAIT_STEP_MAX_MS = 18e4;
		deadlineField = (description) => timerDurationMsSchema.optional().describe(description);
		nativeCommandTimeoutField = deadlineField(`Wall-clock budget in milliseconds for each macOS native command in this call (lipo, codesign, plutil, swift-demangle, and the other allowlisted Xcode tools). Omitted means 60000. Integer from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}. Applies on the next call. Does not raise the fixed 67108864-byte output allowance or the 65536-byte failure-diagnostic excerpt. Named native_command_timeout_ms rather than command_timeout_ms because command_timeout_ms is the separate one-shot objdump and rizin deadline (default 120000).`);
		nativeUiDeadlineField = deadlineField(`Deadline in milliseconds for this UI observation or scenario, including helper preparation and captures. Omitted means 180000. Integer from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}. Applies on the next call. Does not raise the fixed 67108864-byte scenario output allowance or the 180000 ms cap on one wait step. A partial observation may already be retained when this deadline expires.`);
		pwntoolsTimeoutField = deadlineField(`Deadline in milliseconds for each owned pwntools command in this call. Omitted means 30000, range 1..${String(MAX_NODE_TIMER_DELAY_MS)}; applies on the next call. Independent CPU, output, diagnostic, file and address-space allowances are selected in producer_limits. input_bytes overrides REA_PWNTOOLS_MAX_INPUT_BYTES; otherwise that launch default applies.`);
		readNativeDeadline = (value, defaultMs) => {
			if (value === undefined) return {
				ok: true,
				timeoutMs: defaultMs
			};
			const parsed = timerDurationMsSchema.safeParse(value);
			if (parsed.success) return {
				ok: true,
				timeoutMs: parsed.data
			};
			const invalidType = parsed.error.issues.some((issue) => issue.code === "invalid_type");
			return {
				ok: false,
				reason: invalidType ? "invalid_type" : "out_of_range",
				message: `Expected an integer from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)} milliseconds; received ${JSON.stringify(value)}. Omitted means ${String(defaultMs)}.`
			};
		};
		nativeDeadlineRecovery = (input) => {
			const atMaximum = input.timeoutMs >= MAX_NODE_TIMER_DELAY_MS;
			const adjustment = atMaximum ? `${input.parameter} is already at the maximum ${String(MAX_NODE_TIMER_DELAY_MS)} ms; do not increase it.` : `Increase ${input.parameter} above ${String(input.timeoutMs)} (integer milliseconds from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}; omitted means ${String(input.defaultMs)}). A change applies on the next call.`;
			return {
				userMessage: `This request reached REA's ${input.phase} of ${String(input.timeoutMs)} ms (${input.parameter}). This is a server/provider deadline, not the MCP client deadline.${input.detail ?? ""}`,
				remediationAction: `${adjustment} ${input.unchanged} Allow execution, cleanup, and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`,
				limit: deadlineParameterLimit(input.parameter, input.timeoutMs, input.defaultMs)
			};
		};
		fixedNativeAllowance = (allowance, kind, limit, unit) => fixedAllowanceOptions(allowance, kind, {
			limit,
			unit
		});
	})))();
}

//#endregion
//#region dist/domain/native/pwntoolsResourceLimits.js
var PWNTOOLS_LIMITS, pwntoolsProducerLimitsSchema, resolvePwntoolsLimits, pwntoolsProducerLimitsField;
function init_pwntoolsResourceLimits() {
	return (init_pwntoolsResourceLimits = __esmMin((() => {
		init_analysisResourceLimits();
		init_producerResourceLimits();
		init_nativeDeadlines();
		PWNTOOLS_LIMITS = {
			input_bytes: DEFAULT_PWNTOOLS_MAX_INPUT_BYTES,
			output_bytes: 64 * 1024 * 1024,
			diagnostic_bytes: 1024 * 1024,
			command_timeout_ms: DEFAULT_PWNTOOLS_TIMEOUT_MS,
			address_space_bytes: 3 * 1024 * 1024 * 1024,
			cpu_seconds: 30
		};
		pwntoolsProducerLimitsSchema = producerResourceLimitsSchema.omit({ command_timeout_ms: true });
		resolvePwntoolsLimits = (selected, inputBytes = PWNTOOLS_LIMITS.input_bytes) => resolveProducerLimits({
			...PWNTOOLS_LIMITS,
			input_bytes: inputBytes,
			file_bytes: selected?.output_bytes ?? PWNTOOLS_LIMITS.output_bytes
		}, selected);
		pwntoolsProducerLimitsField = pwntoolsProducerLimitsSchema.optional().describe(`Per-call owned Python input, output, diagnostic, address-space and file bytes, and CPU seconds. Defaults: input ${PWNTOOLS_LIMITS.input_bytes}, output ${PWNTOOLS_LIMITS.output_bytes}, diagnostics ${PWNTOOLS_LIMITS.diagnostic_bytes}, address space ${PWNTOOLS_LIMITS.address_space_bytes} bytes, CPU ${PWNTOOLS_LIMITS.cpu_seconds} seconds. File allowance follows selected output_bytes unless file_bytes is explicit. input_bytes overrides REA_PWNTOOLS_MAX_INPUT_BYTES. Positive safe integers; applies on the next call without restart. Tighter inherited OS limits are retained. pwntools_timeout_ms remains the independent wall deadline.`);
	})))();
}

//#endregion
//#region dist/domain/providerSelection.js
var analysisProviderIdSchema, analysisProviderSelectorSchema, PROVIDER_REJECTION_CODES;
function init_providerSelection() {
	return (init_providerSelection = __esmMin((() => {
		analysisProviderIdSchema = z.string().min(1).regex(/^[a-z][a-z0-9\x2d]*$/u).refine((value) => value !== "auto", { message: "auto is reserved for provider selection" });
		analysisProviderSelectorSchema = z.union([z.literal("auto"), analysisProviderIdSchema]);
		PROVIDER_REJECTION_CODES = [
			"not_configured",
			"executable_missing",
			"runtime_missing",
			"runtime_unavailable",
			"unsupported_host",
			"unsupported_version",
			"target_kind_unsupported",
			"target_format_unsupported",
			"architecture_unsupported",
			"target_role_unsupported",
			"managed_target_unsupported",
			"open_options_invalid",
			"version_unresolved"
		];
	})))();
}

//#endregion
//#region dist/domain/urlComponents.js
var urlDeclaresQueryOrFragment;
function init_urlComponents() {
	return (init_urlComponents = __esmMin((() => {
		urlDeclaresQueryOrFragment = (url) => url.href.includes("?") || url.href.includes("#");
	})))();
}

//#endregion
export { BOUNDED_PRODUCER_LIMITS, DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE, DEFAULT_NATIVE_COMMAND_TIMEOUT_MS, DEFAULT_NATIVE_UI_DEADLINE_MS, JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT, JavaScriptSemanticWorkMeter, NATIVE_UI_WAIT_STEP_MAX_MS, PROVIDER_REJECTION_CODES, PWNTOOLS_LIMITS, analysisProviderIdSchema, analysisProviderSelectorSchema, boundedProducerLimitsResultSchema, boundedProducerLimitsSchema, fixedNativeAllowance, init_javascriptSemanticWorkAllowance, init_nativeDeadlines, init_producerResourceLimits, init_providerSelection, init_pwntoolsResourceLimits, init_urlComponents, isJavaScriptMemberMutationRefusal, javaScriptMemberMutationAllowanceField, javaScriptMemberMutationAllowanceSchema, javaScriptMemberMutationRefusal, javaScriptRefusedPhaseSchema, nativeCommandTimeoutField, nativeDeadlineRecovery, nativeUiDeadlineField, producerLimitControl, producerResourceLimitsSchema, pwntoolsProducerLimitsField, pwntoolsProducerLimitsSchema, pwntoolsTimeoutField, readNativeDeadline, reportsJavaScriptMemberMutationRefusal, resolveProducerLimits, resolvePwntoolsLimits, urlDeclaresQueryOrFragment };