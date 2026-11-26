import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { Ft as analysisSettingLimit, Lt as init_analysisSettingDefinitions } from "./analysisErrorProjection-B0_t_nHz.js";
import { $t as init_analysisResourceLimits, xt as DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, zt as MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES } from "./jsonValue-BIEmjG1z.js";
import { _ as init_analysisErrorCore, l as AnalysisResourceConstraintError } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_budget, t as Budget } from "./budget-CGAFFXhi.js";
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
export { javaScriptMemberMutationAllowanceField as a, javaScriptRefusedPhaseSchema as c, init_javascriptSemanticWorkAllowance as i, reportsJavaScriptMemberMutationRefusal as l, JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT as n, javaScriptMemberMutationAllowanceSchema as o, JavaScriptSemanticWorkMeter as r, javaScriptMemberMutationRefusal as s, DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE as t };