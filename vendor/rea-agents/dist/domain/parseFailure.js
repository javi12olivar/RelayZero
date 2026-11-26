/** JSON-safe public facts for the named limit a parser exhausted. */
export const reportedParseLimit = ({ name, maximum, required }) => ({
    boundary: name,
    maximum,
    ...(required === undefined
        ? {}
        : { required: typeof required === "bigint" ? String(required) : required }),
});
/** The one throwable carrier for a {@link ParseFailure}. */
export class ParseFailureError extends Error {
    failure;
    _tag = "ParseFailureError";
    constructor(failure, options) {
        super(failure.detail, options);
        this.failure = failure;
        this.name = "ParseFailureError";
    }
    get kind() {
        return this.failure.kind;
    }
}
const failureWith = (failure, cause) => new ParseFailureError(failure, cause === undefined ? undefined : { cause });
/** The bytes violate the format's structure. */
export const malformedInput = (format, detail, { cause, ...at } = {}) => failureWith({ kind: "malformed", format, detail, ...at }, cause);
/** A declared structure starts in the bytes but ends past them. */
export const truncatedInput = (format, detail, { cause, ...at } = {}) => failureWith({ kind: "truncated", format, detail, ...at }, cause);
/** The bytes use a form outside this decoder's coverage. */
export const unsupportedInput = (format, detail, { cause, undecodedContent = false, ...at } = {}) => failureWith({ kind: "unsupported", format, detail, ...at, undecodedContent }, cause);
/** A named decode budget stopped the parse before the input was shown invalid. */
export const decodeLimit = (format, detail, limit, { cause, ...at } = {}) => failureWith({ kind: "limit", format, detail, ...at, limit }, cause);
const HOST_CAPACITY_MESSAGES = new Set([
    "Invalid string length",
    "Array buffer allocation failed",
    "Invalid array length",
]);
const HOST_CAPACITY_CODES = new Set([
    "ERR_STRING_TOO_LONG",
    "ERR_BUFFER_TOO_LARGE",
]);
/** Classify a host `RangeError`; the one place that interprets one. */
export const hostRangeErrorKind = (cause) => {
    if (!(cause instanceof Error))
        return undefined;
    const code = "code" in cause ? String(cause.code) : undefined;
    // Node raises an over-long string as a plain Error with this code.
    if (code !== undefined && HOST_CAPACITY_CODES.has(code))
        return "host-capacity";
    if (!(cause instanceof RangeError))
        return undefined;
    if (cause.message === "Maximum call stack size exceeded")
        return "stack-overflow";
    if (HOST_CAPACITY_MESSAGES.has(cause.message) ||
        cause.message.startsWith("Invalid typed array length"))
        return "host-capacity";
    return undefined;
};
/** A stack overflow or host capacity failure: never evidence about the input. */
export const isHostLimitFailure = (cause) => {
    const kind = hostRangeErrorKind(cause);
    return kind === "stack-overflow" || kind === "host-capacity";
};
/**
 * The format failure a parse step established, or `undefined` when the cause
 * says nothing about the input. Host errors do not identify the operation
 * that failed: buffer reads, writes and allocations can share error codes.
 * Readers must report their own bounds failures at the read boundary.
 */
export const parseFailureFromCause = (cause) => {
    if (cause instanceof ParseFailureError)
        return cause;
    return undefined;
};
