import { semanticResourceLimitFacts } from "./javascriptSemanticResourceLimits.js";
import { JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS, } from "./javascriptSemanticPrecision.js";
/** Source-local effect candidates broadened at a projection merge, without dropping targets. */
export const RETURNED_REFERENCE_WIDENING_LIMITATION = "Local returned-reference projections were conservatively widened; effects include additional source-local candidates.";
/** Classify whole-file semantic coverage from parsing, value bounds and widened projections. */
export const semanticCoverage = (parserPartial, resourceLimits = [], widenedReturnedReferences = [], precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
    const details = {
        ...(widenedReturnedReferences.length > 0
            ? { widenedReturnedReferences }
            : {}),
        ...(precision === JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS
            ? {}
            : { precision }),
    };
    if (resourceLimits.length > 0)
        return {
            status: "partial",
            omittedCount: null,
            resourceLimits,
            ...details,
        };
    return {
        status: parserPartial || widenedReturnedReferences.length > 0
            ? "partial"
            : "complete",
        omittedCount: 0,
        ...details,
    };
};
/** Read typed resource-limit classifications from any coverage state. */
export const semanticCoverageResourceLimits = (coverage) => coverage.resourceLimits ?? [];
/** Effective evaluator facts, rather than reconstructed default-only bounds. */
export const semanticResourceLimitCoverage = (resourceLimits, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => resourceLimits.map((resourceLimit) => {
    const { value, unit } = semanticResourceLimitFacts(resourceLimit, precision);
    return {
        name: `javascript_semantic_${resourceLimit.replaceAll("-", "_")}`,
        value,
        unit,
    };
});
/** Classify one callable's direct-return coverage. */
export const semanticReturnCoverage = (retainedCount, parserPartial) => ({
    status: parserPartial ? "partial" : "complete",
    retainedCount,
    omittedCount: 0,
});
