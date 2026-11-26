import { decodeLimit, ParseFailureError } from "../domain/parseFailure.js";
/** The ParseFailure format of V8 code cache containers. */
export const V8_CODE_CACHE_FORMAT = "v8-code-cache";
const V8_CODE_CACHE_BUDGET_BOUNDARIES = new Set([
    "max_strings",
    "min_string_bytes",
]);
/** A caller-selected budget was exceeded while scanning the payload. */
export const v8CodeCacheBudgetFailure = (boundary, limit, message) => decodeLimit(V8_CODE_CACHE_FORMAT, message, {
    name: boundary,
    maximum: limit,
});
export const v8CodeCacheBudgetLimitOf = (cause) => cause instanceof ParseFailureError &&
    cause.failure.kind === "limit" &&
    cause.failure.format === V8_CODE_CACHE_FORMAT &&
    V8_CODE_CACHE_BUDGET_BOUNDARIES.has(cause.failure.limit.name)
    ? {
        boundary: cause.failure.limit.name,
        limit: cause.failure.limit.maximum,
        message: cause.failure.detail,
    }
    : undefined;
