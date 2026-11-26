import { boundedList } from "../boundedList.js";
import { z } from "zod";
import { err } from "../result.js";
import { AnalysisOutputError } from "../analysisErrorCore.js";
/** Issues kept per refusal; the count still reports every issue. */
const MAX_CONTRACT_ISSUES = 16;
const jsonKind = (value) => value === null
    ? "null"
    : Array.isArray(value)
        ? "array"
        : value === undefined
            ? "missing"
            : typeof value;
const valueAt = (value, path) => {
    let current = value;
    for (const key of path) {
        if (typeof current !== "object" || current === null)
            return undefined;
        if (typeof key === "symbol")
            return undefined;
        current = current[key];
    }
    return current;
};
/**
 * Replace each failed union with the issues of every option it tried, located
 * at their full path, so a nested field failure stays named.
 */
const locatedIssues = (issues, prefix = [], branches = []) => issues.flatMap((issue) => {
    const path = [...prefix, ...issue.path];
    return issue.code === "invalid_union" && issue.errors.length > 0
        ? issue.errors.flatMap((option, index) => locatedIssues(option, path, [...branches, index]))
        : [{ issue, path, branches }];
});
/**
 * Name the fields a provider reply failed its contract on. Each issue carries
 * only its field path, Zod issue code, the expected kind and the observed JSON
 * kind, never reported text, so the diagnostic is safe to return to callers.
 * Issues inside a failed union carry the option index at each union level.
 */
export const outputContractDiagnostics = (cause, value) => {
    const located = boundedList(locatedIssues(cause.issues), MAX_CONTRACT_ISSUES);
    return {
        contract_issue_count: located.items.length + located.omitted,
        contract_issues: located.items.map(({ issue, path, branches }) => ({
            path: path.map((key) => (typeof key === "number" ? key : String(key))),
            code: issue.code,
            ...(branches.length === 0 ? {} : { union_branches: [...branches] }),
            ...(issue.code === "invalid_type"
                ? {
                    expected: issue.expected,
                    ...(value === undefined
                        ? {}
                        : { received: jsonKind(valueAt(value, path)) }),
                }
                : {}),
        })),
    };
};
export const invalidNativeOutput = (operation, expected, cause) => err(new AnalysisOutputError(operation, `Provider returned an invalid ${expected}`, { cause, diagnostics: outputContractDiagnostics(cause) }));
