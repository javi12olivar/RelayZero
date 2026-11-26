import { evidenceFileTarget } from "../evidence.js";
import { analysisInputErrorFromIssues } from "../inputIssueProjection.js";
import { err, ok } from "../result.js";
import { ownedJsonValueSchema } from "../jsonValue.js";
import { EvidenceIntegrityError } from "../evidenceErrors.js";
/** Bind a projected artifact to the parent subject when one is recorded. */
export const validateAnalysisViewSubject = (subject, artifactSha256) => {
    const file = evidenceFileTarget({ subject });
    return file === undefined || file.sha256 === artifactSha256
        ? ok(undefined)
        : err(new EvidenceIntegrityError(`Parent subject SHA-256 ${file.sha256} differs from analysis artifact SHA-256 ${artifactSha256 ?? "unknown"}.`));
};
import { canBorrowParsedJsonSnapshot, freezeOwnedJsonTreeSnapshot, isImmutableJsonSnapshot, } from "../immutableJson.js";
/** One owning schema reuses validated immutable facts for their retained lifetime. */
export const createAnalysisViewResultReader = (parser) => {
    const checked = new WeakMap();
    return (parent) => {
        const source = parent.normalizedResult;
        const reusable = parent.sealedResult === true &&
            typeof source === "object" &&
            source !== null &&
            isImmutableJsonSnapshot(source);
        const known = reusable ? checked.get(source) : undefined;
        if (known !== undefined)
            return ok(known);
        const parsed = parseAnalysisViewResult(parser, parent);
        if (!parsed.ok || !reusable)
            return parsed;
        if (canBorrowParsedJsonSnapshot(source, parsed.value)) {
            checked.set(source, source);
            return ok(source);
        }
        const normalized = ownedJsonValueSchema.safeParse(parsed.value);
        if (!normalized.success)
            return parsed;
        freezeOwnedJsonTreeSnapshot(normalized.data);
        checked.set(source, parsed.value);
        return parsed;
    };
};
/** Parse a parent's result with its owning parser; issues point into the view source. */
export const parseAnalysisViewResult = (parser, parent) => {
    const parsed = parser.safeParse(parent.normalizedResult);
    if (parsed.success)
        return ok(parsed.data);
    return err(analysisViewResultInputError(parent.normalizedResult, parsed.error));
};
/** Locate schema failures inside the retained result, including throwing parsers. */
export const analysisViewResultInputError = (input, cause) => analysisInputErrorFromIssues("inspect_analysis_view", cause.issues.map((issue) => ({
    ...issue,
    path: ["source", "normalized_result", ...issue.path],
})), { source: { normalized_result: input } }, { cause });
/** Path named by a parent result, or the Evidence id when the result has none. */
export const parentArtifactPath = (parent) => {
    if (typeof parent.normalizedResult === "object" &&
        parent.normalizedResult !== null &&
        "artifact" in parent.normalizedResult &&
        typeof parent.normalizedResult.artifact === "object" &&
        parent.normalizedResult.artifact !== null &&
        "path" in parent.normalizedResult.artifact &&
        typeof parent.normalizedResult.artifact.path === "string")
        return parent.normalizedResult.artifact.path;
    if (typeof parent.normalizedResult === "object" &&
        parent.normalizedResult !== null &&
        "input_path" in parent.normalizedResult &&
        typeof parent.normalizedResult.input_path === "string")
        return parent.normalizedResult.input_path;
    return parent.evidenceId;
};
