import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { Ft as analysisSettingLimit, Lt as init_analysisSettingDefinitions } from "./analysisErrorProjection-B0_t_nHz.js";
import { $t as init_analysisResourceLimits, Jt as MAX_NODE_TIMER_DELAY_MS, o as jsonValueSchema, r as init_jsonValue, vt as DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS } from "./jsonValue-BIEmjG1z.js";
import { ht as init_relationshipCoverage, yt as unknownRelationshipCoverageSchema } from "./evidence-z4eWkAQk.js";
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
export { HOPPER_CALLER_PAGE_ALLOWANCE_BYTES as a, hopperCallerReconciliationPartialSchema as c, init_hopperCallerScanBudget as i, init_hopperCallerReconciliation as l, hopperCallerScanBudgetFromEnvironment as n, HOPPER_CALLER_SCAN_RETENTION_BYTES as o, hopperCallerScanRecovery as r, formatHopperCallerScanReason as s, hopperCallerScanBudgetForMilliseconds as t };