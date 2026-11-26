import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, MAX_NODE_TIMER_DELAY_MS, init_analysisResourceLimits, init_configurationErrors } from "./jsonSerialization-DAF9DVXC.js";
import { TOOL_FAMILY_IDS, init_toolFamilyIds, isToolFamilyId } from "./toolFamilyIds-CqxikYDX.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_positiveDecimalInteger, positiveDecimalIntegerSchema } from "./positiveDecimalInteger-BhPy7XMJ.js";
import { ADVERTISED_INPUT_SCHEMA_MAX_BYTES, init_advertisedDialect } from "./advertisedDialect-nPNOAZyy.js";
import { z } from "zod";

//#region dist/contracts/mcpSchemaPresentation.js
var COMPACT_INPUT_SCHEMA_BUDGET_BYTES, COMPACT_INPUT_SCHEMA_PRESENTATION, COMPACT_OUTPUT_SCHEMA_BUDGET_BYTES, MCP_OUTPUT_SCHEMA_PROFILES, resolveMcpOutputSchemaProfile, COMPACT_OUTPUT_SCHEMA_PRESENTATION, advertisedToolPresentation;
function init_mcpSchemaPresentation() {
	return (init_mcpSchemaPresentation = __esmMin((() => {
		init_advertisedDialect();
		COMPACT_INPUT_SCHEMA_BUDGET_BYTES = ADVERTISED_INPUT_SCHEMA_MAX_BYTES;
		COMPACT_INPUT_SCHEMA_PRESENTATION = Object.freeze({ budgetBytes: COMPACT_INPUT_SCHEMA_BUDGET_BYTES });
		COMPACT_OUTPUT_SCHEMA_BUDGET_BYTES = 4 * 1024;
		MCP_OUTPUT_SCHEMA_PROFILES = ["off", "compact"];
		resolveMcpOutputSchemaProfile = (profile) => profile ?? "off";
		COMPACT_OUTPUT_SCHEMA_PRESENTATION = Object.freeze({ budgetBytes: COMPACT_OUTPUT_SCHEMA_BUDGET_BYTES });
		advertisedToolPresentation = (outputSchemaProfile, input = COMPACT_INPUT_SCHEMA_PRESENTATION) => ({
			input: { budgetBytes: input.budgetBytes },
			output: outputSchemaProfile === "compact" ? COMPACT_OUTPUT_SCHEMA_PRESENTATION : undefined
		});
	})))();
}

//#endregion
//#region dist/config/mcpOutputSchemaProfile.js
var profileConstraint, mcpOutputSchemaProfileSchema, parseMcpOutputSchemaProfile;
function init_mcpOutputSchemaProfile() {
	return (init_mcpOutputSchemaProfile = __esmMin((() => {
		init_mcpSchemaPresentation();
		init_configurationErrors();
		init_result();
		profileConstraint = "REA_MCP_OUTPUT_SCHEMA_PROFILE must be \"off\" (default) or \"compact\". The off profile omits output schemas; compact advertises every output schema within a 4,096-byte budget. The \"full\" output profile was removed: remove the setting or select \"compact\". Both keep canonical server-side validation and complete structured content.";
		mcpOutputSchemaProfileSchema = z.enum(MCP_OUTPUT_SCHEMA_PROFILES, { error: profileConstraint });
		parseMcpOutputSchemaProfile = (value) => {
			if (value === undefined) return ok(undefined);
			const parsed = mcpOutputSchemaProfileSchema.safeParse(value);
			return parsed.success ? ok(parsed.data) : err(new ConfigurationError(profileConstraint, { settings: [{
				setting: "REA_MCP_OUTPUT_SCHEMA_PROFILE",
				constraint: profileConstraint
			}] }));
		};
	})))();
}

//#endregion
//#region dist/config/mcpToolCatalogProfile.js
var mcpToolCatalogProfileSchema, parseMcpToolCatalogProfile;
function init_mcpToolCatalogProfile() {
	return (init_mcpToolCatalogProfile = __esmMin((() => {
		init_configurationErrors();
		init_result();
		mcpToolCatalogProfileSchema = z.enum(["full", "hot-cold"]);
		parseMcpToolCatalogProfile = (value) => {
			if (value === undefined) return ok(undefined);
			const parsed = mcpToolCatalogProfileSchema.safeParse(value);
			const constraint = "REA_MCP_TOOL_CATALOG_PROFILE must be \"full\" (default) or \"hot-cold\". Hot/cold requires a client that refreshes tools after notifications/tools/list_changed.";
			return parsed.success ? ok(parsed.data) : err(new ConfigurationError(constraint, { settings: [{
				setting: "REA_MCP_TOOL_CATALOG_PROFILE",
				constraint
			}] }));
		};
	})))();
}

//#endregion
//#region dist/config/mcpStartupBudgets.js
var MCP_PHASE_BUDGET_FLOOR_MS, PHASES, phaseConstraint, phaseBudgetSchema, mcpInitializeBudgetMsSchema, mcpToolsListBudgetMsSchema, mcpFirstCatalogBudgetMsSchema, mcpDoctorDeadlineMsSchema, defaultBudget, parsePhaseBudget, parseMcpStartupBudgets, resolveMcpStartupBudgets, mcpPhaseBudgetRecovery;
function init_mcpStartupBudgets() {
	return (init_mcpStartupBudgets = __esmMin((() => {
		init_analysisResourceLimits();
		init_positiveDecimalInteger();
		init_configurationErrors();
		init_result();
		MCP_PHASE_BUDGET_FLOOR_MS = 1;
		PHASES = [
			{
				key: "initialize",
				setting: "REA_MCP_INITIALIZE_BUDGET_MS",
				phase: "MCP initialize phase budget",
				defaultMilliseconds: 15e3
			},
			{
				key: "toolsList",
				setting: "REA_MCP_TOOLS_LIST_BUDGET_MS",
				phase: "MCP tools/list phase budget",
				defaultMilliseconds: 5e3
			},
			{
				key: "firstCatalog",
				setting: "REA_MCP_FIRST_CATALOG_BUDGET_MS",
				phase: "MCP first-catalog phase budget",
				defaultMilliseconds: 2e4
			},
			{
				key: "doctor",
				setting: "REA_MCP_DOCTOR_DEADLINE_MS",
				phase: "MCP doctor startup deadline",
				defaultMilliseconds: 3e4
			}
		];
		phaseConstraint = (phase) => `${phase.setting} must be a positive decimal integer from ${String(1)} to ${String(MAX_NODE_TIMER_DELAY_MS)} ms; the default is ${String(phase.defaultMilliseconds)} ms. Node schedules a delay above that maximum as 1 ms, so a larger value is refused.`;
		phaseBudgetSchema = (phase) => positiveDecimalIntegerSchema(1, MAX_NODE_TIMER_DELAY_MS, phaseConstraint(phase));
		mcpInitializeBudgetMsSchema = phaseBudgetSchema(PHASES[0]);
		mcpToolsListBudgetMsSchema = phaseBudgetSchema(PHASES[1]);
		mcpFirstCatalogBudgetMsSchema = phaseBudgetSchema(PHASES[2]);
		mcpDoctorDeadlineMsSchema = phaseBudgetSchema(PHASES[3]);
		defaultBudget = (phase) => ({
			setting: phase.setting,
			phase: phase.phase,
			milliseconds: phase.defaultMilliseconds,
			source: "default",
			defaultMilliseconds: phase.defaultMilliseconds,
			floorMilliseconds: 1,
			maximumMilliseconds: MAX_NODE_TIMER_DELAY_MS
		});
		parsePhaseBudget = (phase, value) => {
			if (value === undefined) return ok(defaultBudget(phase));
			const parsed = phaseBudgetSchema(phase).safeParse(value);
			return parsed.success ? ok({
				setting: phase.setting,
				phase: phase.phase,
				milliseconds: parsed.data,
				source: "setting",
				defaultMilliseconds: phase.defaultMilliseconds,
				floorMilliseconds: 1,
				maximumMilliseconds: MAX_NODE_TIMER_DELAY_MS
			}) : err(new ConfigurationError(phaseConstraint(phase), { settings: [{
				setting: phase.setting,
				constraint: phaseConstraint(phase)
			}] }));
		};
		parseMcpStartupBudgets = (environment) => {
			const issues = [];
			const budgets = new Map();
			for (const phase of PHASES) {
				const parsed = parsePhaseBudget(phase, environment[phase.setting]);
				if (!parsed.ok) issues.push(...parsed.error.settings);
				else budgets.set(phase.key, parsed.value);
			}
			if (issues.length > 0) return err(new ConfigurationError(issues.map(({ constraint }) => constraint).join(" "), { settings: issues }));
			const initialize = budgets.get("initialize");
			const toolsList = budgets.get("toolsList");
			const firstCatalog = budgets.get("firstCatalog");
			const doctor = budgets.get("doctor");
			if (initialize === undefined || toolsList === undefined || firstCatalog === undefined || doctor === undefined) throw new Error("MCP startup budget resolution dropped a phase");
			return ok({
				initialize,
				toolsList,
				firstCatalog,
				doctor
			});
		};
		resolveMcpStartupBudgets = (environment) => {
			const parsed = parseMcpStartupBudgets(environment);
			if (!parsed.ok) throw parsed.error;
			return parsed.value;
		};
		mcpPhaseBudgetRecovery = (budget) => [`The effective ${budget.setting} value for the ${budget.phase} is ${String(budget.milliseconds)} ms (source ${budget.source}; default ${String(budget.defaultMilliseconds)} ms, floor ${String(budget.floorMilliseconds)} ms, maximum ${String(budget.maximumMilliseconds)} ms).`, `Set ${budget.setting} in the environment that starts REA to a positive decimal integer from ${String(budget.floorMilliseconds)} to ${String(budget.maximumMilliseconds)}, then restart REA.`].join(" ");
	})))();
}

//#endregion
//#region dist/config/mcpToolFamilies.js
var toolFamiliesConstraint, toolFamilyIdSchema, mcpToolFamiliesSchema, parseMcpToolFamilies;
function init_mcpToolFamilies() {
	return (init_mcpToolFamilies = __esmMin((() => {
		init_toolFamilyIds();
		init_configurationErrors();
		init_result();
		toolFamiliesConstraint = `REA_MCP_TOOL_FAMILIES must be a non-empty comma-separated subset of the tool family ids: ${TOOL_FAMILY_IDS.join(", ")}.`;
		toolFamilyIdSchema = z.enum(TOOL_FAMILY_IDS);
		mcpToolFamiliesSchema = z.string().transform((value) => [...new Set(value.split(",").map((family) => family.trim()).filter((family) => family !== ""))]).refine((families) => families.length > 0 && families.every(isToolFamilyId), toolFamiliesConstraint).transform((families) => families.map((family) => toolFamilyIdSchema.parse(family)));
		parseMcpToolFamilies = (value) => {
			if (value === undefined) return ok(undefined);
			const parsed = mcpToolFamiliesSchema.safeParse(value);
			return parsed.success ? ok(parsed.data) : err(new ConfigurationError(toolFamiliesConstraint, { settings: [{
				setting: "REA_MCP_TOOL_FAMILIES",
				constraint: toolFamiliesConstraint
			}] }));
		};
	})))();
}

//#endregion
export { COMPACT_INPUT_SCHEMA_PRESENTATION, advertisedToolPresentation, init_mcpOutputSchemaProfile, init_mcpSchemaPresentation, init_mcpStartupBudgets, init_mcpToolCatalogProfile, init_mcpToolFamilies, mcpDoctorDeadlineMsSchema, mcpFirstCatalogBudgetMsSchema, mcpInitializeBudgetMsSchema, mcpOutputSchemaProfileSchema, mcpPhaseBudgetRecovery, mcpToolCatalogProfileSchema, mcpToolFamiliesSchema, mcpToolsListBudgetMsSchema, parseMcpOutputSchemaProfile, parseMcpStartupBudgets, parseMcpToolCatalogProfile, parseMcpToolFamilies, resolveMcpOutputSchemaProfile, toolFamiliesConstraint };