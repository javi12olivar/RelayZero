import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { i as init_configurationErrors, n as ConfigurationError } from "./configurationErrors-DgUy2JKH.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { $t as init_analysisResourceLimits, xt as DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, zt as MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES } from "./jsonValue-BIEmjG1z.js";
import { n as positiveDecimalIntegerSchema, t as init_positiveDecimalInteger } from "./positiveDecimalInteger-B6WcctiT.js";
import { i as init_javascriptSemanticWorkAllowance, n as JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT } from "./javascriptSemanticWorkAllowance-DlKvoXR4.js";

//#region dist/config/javascriptMemberMutationAllowance.js
var constraint, javaScriptMemberMutationAliasStatesSchema, resolveJavaScriptMemberMutationAllowance;
function init_javascriptMemberMutationAllowance() {
	return (init_javascriptMemberMutationAllowance = __esmMin((() => {
		init_analysisResourceLimits();
		init_configurationErrors();
		init_javascriptSemanticWorkAllowance();
		init_result();
		init_positiveDecimalInteger();
		constraint = `${JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT} must be a decimal integer from 1 to ${String(MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES)} alias states; the default is ${String(DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES)}.`;
		javaScriptMemberMutationAliasStatesSchema = positiveDecimalIntegerSchema(1, MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, constraint);
		resolveJavaScriptMemberMutationAllowance = (environment, overrides) => {
			const override = overrides?.["javascript.member_mutation_alias_states"];
			if (override !== undefined) return ok({
				aliasStates: override,
				source: "runtime"
			});
			const value = environment?.[JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT];
			if (value === undefined) return ok({
				aliasStates: DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES,
				source: "default"
			});
			const parsed = javaScriptMemberMutationAliasStatesSchema.safeParse(value);
			return parsed.success ? ok({
				aliasStates: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(constraint, {
				remediationAction: `On a running MCP session, call update_analysis_settings with ${JSON.stringify({ changes: [{
					setting: "javascript.member_mutation_alias_states",
					action: "set",
					value: DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES
				}] })}, then retry. For CLI or future REA processes, correct ${JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT} in the launch environment.`,
				settings: [{
					setting: JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES_ENVIRONMENT,
					constraint
				}]
			}));
		};
	})))();
}

//#endregion
export { javaScriptMemberMutationAliasStatesSchema as n, resolveJavaScriptMemberMutationAllowance as r, init_javascriptMemberMutationAllowance as t };