import { JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS, } from "./javascriptSemanticPrecision.js";
import { compareUnicodeCodePoints } from "../unicodeCodePointOrder.js";
import { semanticPrimitiveKey } from "./javascriptSemanticProvenance.js";
import { exceedsSemanticPrimitiveStringByteBudget, semanticResourceLimitUnknown, } from "./javascriptSemanticResourceLimits.js";
/** Normalize one bounded collection of possible primitive values. */
export const semanticPrimitiveSet = (values, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
    let uniqueValues;
    for (const value of values) {
        if (typeof value === "number" && !Number.isFinite(value))
            return {
                status: "unknown",
                reason: "Nonfinite numbers are outside the JSON primitive lattice.",
            };
        if (typeof value === "number" && Object.is(value, -0))
            return {
                status: "unknown",
                reason: "Negative zero cannot be preserved by JSON primitive evidence.",
            };
        // The common literal path needs validation, but no deduplication, sorting
        // or canonical-key allocation. Check strings before retaining the value.
        if (values.length === 1)
            return typeof value === "string" &&
                exceedsSemanticPrimitiveStringByteBudget([value], precision)
                ? semanticResourceLimitUnknown("primitive-bytes", precision)
                : { status: "literal", value };
        uniqueValues ??= new Set();
        uniqueValues.add(value);
        if (uniqueValues.size > precision.primitive_candidates)
            return semanticResourceLimitUnknown("primitive-candidates", precision);
    }
    if (uniqueValues === undefined)
        return { status: "union", values: [] };
    if (exceedsSemanticPrimitiveStringByteBudget([...uniqueValues].flatMap((value) => typeof value === "string" ? [value] : []), precision))
        return semanticResourceLimitUnknown("primitive-bytes", precision);
    const unique = [...uniqueValues]
        .map((value) => ({ key: semanticPrimitiveKey(value), value }))
        .sort((left, right) => compareUnicodeCodePoints(left.key, right.key))
        .map(({ value }) => value);
    const only = unique[0];
    return unique.length === 1 && only !== undefined
        ? { status: "literal", value: only }
        : { status: "union", values: unique };
};
/** Read the primitive candidates retained in one lattice value. */
export const semanticPrimitiveCandidates = (value) => value.status === "literal"
    ? [value.value]
    : value.status === "union"
        ? value.values
        : null;
