import { z } from "zod";
import { errorMessage } from "../kernel/errorMessage.js";
/** The first schema issue's facts, when the cause is a schema failure. */
export const firstValidationIssue = (cause) => {
    if (!(cause instanceof z.ZodError))
        return undefined;
    const [first, ...rest] = cause.issues;
    if (first === undefined)
        return undefined;
    const constraint = first.code === "custom" ? first.params?.["constraint"] : undefined;
    return {
        path: first.path.map((key) => typeof key === "number" ? key : String(key)),
        constraint: typeof constraint === "string" ? constraint : undefined,
        remainingIssueCount: rest.length,
    };
};
/** Locate the first schema issue, or keep a thrown constraint message. */
export const describeValidationFailure = (cause) => {
    if (!(cause instanceof z.ZodError))
        return errorMessage(cause);
    const [first, ...rest] = cause.issues;
    const location = first === undefined || first.path.length === 0
        ? "the document root"
        : first.path.map(String).join(".");
    return `at ${location}: ${first?.message ?? "invalid value"}${rest.length === 0 ? "" : ` (${String(rest.length)} more issues)`}`;
};
