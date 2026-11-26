import { Budget } from "../../domain/budget.js";
import { decodeLimit, } from "../../domain/parseFailure.js";
/** Limit name of the shared Interface Builder representation byte budget. */
const AGGREGATE_DECODE_LIMIT = "aggregate-decode-bytes";
/**
 * An archive would exceed the shared decoding budget of `maximumBytes`. The
 * archive is omitted, not shown to be malformed.
 */
export const interfaceBuilderDecodeBudgetExceeded = (format, detail, maximumBytes) => decodeLimit(format, detail, {
    name: AGGREGATE_DECODE_LIMIT,
    maximum: maximumBytes,
});
/** Shared byte budget for decoder records and projected archive data. */
export class InterfaceBuilderDecodeBudget {
    #bytes;
    constructor(maxBytes) {
        this.#bytes = new Budget(maxBytes);
    }
    /** Representation bytes still available for the current inspection. */
    get remainingBytes() {
        return this.#bytes.remaining;
    }
    /** Representation bytes reserved so far. */
    get usedBytes() {
        return this.#bytes.used;
    }
    /** Reserve representation bytes before allocation, or report exhaustion. */
    reserve(bytes, message) {
        this.#bytes.charge(bytes, () => interfaceBuilderDecodeBudgetExceeded("interface-builder", message, this.#bytes.maximum));
    }
    /** Return a reservation whose representation was rejected and not retained. */
    release(bytes) {
        this.#bytes.refund(bytes);
    }
    /** Reserve an upper bound for one JSON-serialized string occurrence. */
    reserveJsonStringOccurrence(value) {
        // JSON escaping uses at most six ASCII bytes per UTF-16 code unit, plus
        // quotes. Count occurrences even when the source string is shared.
        this.reserve(value.length * 6 + 2, "projected JSON strings exceed the aggregate Interface Builder decode budget");
    }
    /** Reserve the exact JSON string length for a base64 value from Buffer. */
    reserveBase64JsonStringOccurrence(value) {
        // Buffer's base64 alphabet contains no JSON-escaped characters.
        this.reserve(value.length + 2, "projected NIB base64 values exceed the aggregate Interface Builder decode budget");
    }
    /** Reserve an upper bound for one JSON object property name occurrence. */
    reserveJsonPropertyNameOccurrence(value) {
        this.reserve(value.length * 6 + 3, "projected JSON property names exceed the aggregate Interface Builder decode budget");
    }
    /** Reserve bytes for an optional projection without throwing on exhaustion. */
    tryReserve(bytes) {
        return this.#bytes.tryCharge(bytes);
    }
}
