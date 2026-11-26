import { analysisSettingDefinition } from "./analysisSettingDefinitions.js";
import { fixedAllowanceRemediation, } from "./fixedAllowanceRemediation.js";
const fieldName = (field) => field.map(String).join(".");
const UNCHANGED = "Repeating the unchanged request is not expected to succeed.";
const adjustableBudgetRemediation = (operation, budget, callerLifetime) => {
    const { unit, minimum, maximum, effective_value: value, required_value: required, } = budget;
    const control = budget.parameter ?? budget.setting;
    const range = `${String(minimum)}..${String(maximum)} ${unit}`;
    const effective = value === null
        ? `The effective ${control} value is unknown`
        : `${operation} reached its ${control} budget of ${String(value)} ${unit}${budget.source === undefined ? "" : ` (source ${budget.source})`}`;
    if (value !== null && value >= maximum)
        return `${effective}. ${control} is already at its maximum (${range}); narrow the request or select a smaller input. ${UNCHANGED}`;
    if (required !== undefined && required > maximum)
        return `${effective}. The request requires ${String(required)} ${unit}, above the ${control} maximum (${range}); narrow the request or select a smaller input. ${UNCHANGED}`;
    const environment = analysisSettingDefinition(budget.setting).environment;
    const change = budget.parameter !== undefined &&
        (budget.update_mode === "parameter" ||
            (callerLifetime === "invocation" && environment === undefined))
        ? `Pass a larger ${budget.parameter} on the next ${operation} call`
        : callerLifetime === "invocation"
            ? `Set ${environment ?? budget.setting} for the next invocation`
            : budget.update_mode === "runtime"
                ? `Raise ${budget.setting} with update_analysis_settings`
                : `Set ${environment ?? budget.setting} in the environment that starts REA, then restart REA`;
    const atLeast = required === undefined ? "" : `at least ${String(required)} ${unit}; `;
    return `${effective}. ${change} (${atLeast}range ${range}), then retry.`;
};
/**
 * The one recovery for a typed refusal. Total over every variant: adding a
 * variant fails compilation here until it has its own recovery.
 */
export const analysisRefusalRemediation = (refusal, callerLifetime = "continuing") => {
    switch (refusal.kind) {
        case "fixed_ceiling": {
            const { ceiling } = refusal;
            const base = fixedAllowanceRemediation(ceiling.name, ceiling.kind);
            const value = ceiling.limit === undefined || ceiling.unit === undefined
                ? ""
                : ` The allowance is ${String(ceiling.limit)} ${ceiling.unit}; this release has no runtime override.`;
            return ceiling.narrowing === undefined
                ? `${base}${value}`
                : `${base}${value} ${ceiling.narrowing}`;
        }
        case "adjustable_budget":
            return adjustableBudgetRemediation(refusal.operation, refusal.budget, callerLifetime);
        case "ambiguous_selector": {
            const { field, candidates } = refusal.selector;
            return `Set ${fieldName(field)} to exactly one of the ${String(candidates.length)} candidates in details.refusal.candidates, then retry ${refusal.operation}. ${UNCHANGED}`;
        }
    }
};
/** Outcome sentence for a refusal whose producer authored none. */
export const analysisRefusalMessage = (refusal) => refusal.kind === "ambiguous_selector"
    ? `${fieldName(refusal.selector.field)} matches ${String(refusal.selector.candidates.length)} candidates; ${refusal.operation} needs exactly one.`
    : undefined;
/** Machine-readable refusal facts projected under `details.refusal`. */
export const analysisRefusalDetails = (refusal) => {
    switch (refusal.kind) {
        case "fixed_ceiling": {
            const { ceiling } = refusal;
            return {
                kind: refusal.kind,
                operation: refusal.operation,
                allowance: ceiling.name,
                allowance_kind: ceiling.kind,
                ...(ceiling.limit === undefined ? {} : { limit: ceiling.limit }),
                ...(ceiling.unit === undefined ? {} : { unit: ceiling.unit }),
                ...(ceiling.narrowing === undefined
                    ? {}
                    : { narrowing: ceiling.narrowing }),
            };
        }
        case "adjustable_budget": {
            const { budget } = refusal;
            return {
                kind: refusal.kind,
                operation: refusal.operation,
                control: budget.parameter ?? budget.setting,
                setting: budget.setting,
                effective_value: budget.effective_value,
                unit: budget.unit,
                range: { minimum: budget.minimum, maximum: budget.maximum },
                ...(budget.required_value === undefined
                    ? {}
                    : { required_value: budget.required_value }),
            };
        }
        case "ambiguous_selector":
            return {
                kind: refusal.kind,
                operation: refusal.operation,
                field: [...refusal.selector.field],
                candidates: [...refusal.selector.candidates],
            };
    }
};
