import { joinCoverageStatus } from "../coverage.js";
import { managedInspectionCoverage, } from "./managedArtifact.js";
import { managedTokenScopesMatch } from "./managedInspectionEvidence.js";
/** Total sites counted but not projected. */
export const omittedRelationSites = (omissions) => omissions === null
    ? 0
    : [
        ...Object.values(omissions.callSites),
        ...Object.values(omissions.fieldAccessSites),
    ].reduce((total, count) => total + count, 0);
/**
 * Coverage the supplied sources allow: an unavailable source examined nothing,
 * so the graph cannot tell what it omits, even beside a known gap.
 */
const inputCoverage = (omissions) => joinCoverageStatus([
    "complete",
    ...omissions.inputStates.map(managedInspectionCoverage),
]);
/** Omissions whose size is unknown, unlike counted relation sites. */
const omitsUncounted = (omissions) => inputCoverage(omissions) !== "complete" ||
    omissions.unscopedTokenRelationships ||
    omissions.selectedTypes !== null ||
    omissions.methodRows !== undefined;
const omitsAny = (omissions) => omitsUncounted(omissions) || omittedRelationSites(omissions.relations) > 0;
const completeCoverage = () => ({
    status: "complete",
    truncated: false,
    omitted_count: 0,
    limits: [],
});
/** Preserve the source parser's coverage state on projected observations. */
export const managedSourceCoverage = (state) => state === "complete"
    ? completeCoverage()
    : {
        status: state,
        truncated: false,
        omitted_count: null,
        limits: [],
    };
/** Determine whether any supplied managed inspection was partial. */
export const assessManagedGraphOmissions = (sources, relations) => ({
    relations,
    unscopedTokenRelationships: sources.members !== null &&
        sources.boundaries !== null &&
        (sources.boundaries.pinvoke_imports.some(({ member_token }) => member_token !== null) ||
            sources.boundaries.native_implementations.length > 0) &&
        !managedTokenScopesMatch(sources.members.identity_scope.requires_mvid, sources.boundaries.identity_scope.requires_mvid),
    inputStates: [sources.members, sources.boundaries, sources.artifact].flatMap((source) => (source === null ? [] : [source.coverage.state])),
    selectedTypes: sources.members?.selection?.type_names ?? null,
    methodRows: sources.members === null ||
        (sources.members.method_rows !== null &&
            sources.members.method_rows.offset === 0 &&
            sources.members.method_rows.count === sources.members.method_rows.total)
        ? undefined
        : sources.members.method_rows,
});
/** Derive graph coverage solely from the coverage of supplied source evidence. */
export const managedGraphEvidenceCoverage = (omissions) => inputCoverage(omissions) === "unknown"
    ? { status: "unknown", truncated: false, omitted_count: null, limits: [] }
    : omitsAny(omissions)
        ? {
            status: "partial",
            truncated: false,
            omitted_count: omitsUncounted(omissions)
                ? null
                : omittedRelationSites(omissions.relations),
            limits: [],
        }
        : completeCoverage();
/** Report whether all supplied source evidence was complete. */
export const managedGraphResultCoverage = (omissions) => ({
    status: inputCoverage(omissions) === "unknown"
        ? "unknown"
        : omitsAny(omissions)
            ? "partial"
            : "complete-within-inputs",
});
