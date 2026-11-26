import { uniqueSorted } from "../canonicalOrdering.js";
import { compareUnicodeCodePoints } from "../unicodeCodePointOrder.js";
import { canonicalJson } from "../comparisonSemantics.js";
import { digestCanonicalValue } from "../canonicalDigest.js";
import { joinCoverageStatus } from "../coverage.js";
import { known, knownOrNull, unknownBecause } from "../known.js";
import { applicationCoverageKnowledge } from "./javascriptApplicationEvidenceSchemas.js";
import { javaScriptExportShapeComparisonResultSchema, } from "./javascriptExportShapeComparisonSchemas.js";
import { retainJavaScriptExportShapes, selectJavaScriptExport, } from "./javascriptExportShapeSelection.js";
import { buildJavaScriptExportShapeChanges, buildJavaScriptExportShapeInventories, hasPartialJavaScriptExportPropertyCoverage, pairJavaScriptExportShapeVariants, } from "./javascriptExportShapeVariants.js";
/** Compare exact selected export return shapes without executing JavaScript. */
export const compareJavaScriptExportShapes = (input) => {
    const left = selectJavaScriptExport(input.left);
    const right = selectJavaScriptExport(input.right);
    const leftRetained = retainJavaScriptExportShapes(left);
    const rightRetained = retainJavaScriptExportShapes(right);
    const pairing = pairJavaScriptExportShapeVariants(leftRetained.shapes, rightRetained.shapes);
    const evidenceLinks = evidencePair(input.left.evidenceId, input.right.evidenceId);
    const allChanges = sortChanges(buildJavaScriptExportShapeChanges({
        leftSelection: left,
        rightSelection: right,
        pairing,
        leftShapes: leftRetained.shapes,
        rightShapes: rightRetained.shapes,
        evidenceLinks,
    }));
    const changes = allChanges;
    const omittedChanges = 0;
    const propertyInventories = buildJavaScriptExportShapeInventories({
        pairing,
        leftShapes: leftRetained.shapes,
        rightShapes: rightRetained.shapes,
    });
    const coverage = comparisonCoverage({
        input,
        left,
        right,
        leftRetained,
        rightRetained,
        pairing,
        allChanges,
        omittedChanges,
    });
    const limitations = comparisonLimitations(left, right, coverage.status);
    const semantic = {
        left: left.selection,
        right: right.selection,
        property_inventories: propertyInventories,
        summary: summarize(allChanges),
        changes,
        coverage,
        evidence_links: evidenceLinks,
        limitations,
    };
    return javaScriptExportShapeComparisonResultSchema.parse({
        ...semantic,
        comparison_id: `jesc_${digestCanonicalValue(semantic, "JavaScript export shape comparison")}`,
    });
};
const sortChanges = (changes) => changes
    .map((change, index) => ({
    change,
    index,
    sortKey: canonicalJson({
        discriminant: change.discriminant,
        path: change.path,
        status: change.status,
        left_source_range: change.left_source_range,
        right_source_range: change.right_source_range,
        change_id: change.change_id,
    }, "JavaScript export shape comparison"),
}))
    .sort((left, right) => compareUnicodeCodePoints(left.sortKey, right.sortKey) ||
    left.index - right.index)
    .map(({ change }) => change);
/**
 * The side's source return-shape coverage. A side without a projection did
 * not recover return shapes, so its source omissions are unknown, not zero.
 */
const sourceCoverage = (selection) => selection.projection === null
    ? unknownBecause(`the export selection is ${selection.selection.status}`)
    : known(selection.projection.return_shape_coverage);
const comparisonCoverage = (context) => {
    const leftSource = sourceCoverage(context.left);
    const rightSource = sourceCoverage(context.right);
    const omittedCandidates = context.left.selection.omitted_candidates +
        context.right.selection.omitted_candidates;
    const truncated = comparisonTruncated(context, omittedCandidates);
    const partial = comparisonPartial(context);
    // A source graph that cannot tell its coverage makes the comparison
    // unknown, even beside a known gap.
    const graphs = joinCoverageStatus([
        applicationCoverageKnowledge(context.input.left.graph.coverage.status),
        applicationCoverageKnowledge(context.input.right.graph.coverage.status),
    ]);
    return {
        status: graphs === "unknown"
            ? "unknown"
            : truncated
                ? "truncated"
                : partial
                    ? "partial"
                    : "complete-within-inputs",
        left_graph_status: context.input.left.graph.coverage.status,
        right_graph_status: context.input.right.graph.coverage.status,
        paired_variants: context.pairing.pairs.length,
        unpaired_left_variants: context.pairing.unpairedLeft.length,
        unpaired_right_variants: context.pairing.unpairedRight.length,
        omitted_left_variants: context.leftRetained.omitted,
        omitted_right_variants: context.rightRetained.omitted,
        // omitted_return_sites is itself null when the projection could not
        // count them.
        left_source_omitted_variants: knownOrNull(leftSource, ({ omitted_return_sites }) => omitted_return_sites),
        right_source_omitted_variants: knownOrNull(rightSource, ({ omitted_return_sites }) => omitted_return_sites),
        left_omitted_fields: knownOrNull(leftSource, ({ omitted_fields }) => omitted_fields),
        right_omitted_fields: knownOrNull(rightSource, ({ omitted_fields }) => omitted_fields),
        left_omitted_property_coverage: knownOrNull(leftSource, ({ omitted_property_coverage }) => omitted_property_coverage),
        right_omitted_property_coverage: knownOrNull(rightSource, ({ omitted_property_coverage }) => omitted_property_coverage),
        omitted_candidates: omittedCandidates,
        omitted_changes: context.omittedChanges,
    };
};
const comparisonTruncated = (context, omittedCandidates) => context.leftRetained.omitted > 0 ||
    context.rightRetained.omitted > 0 ||
    omittedCandidates > 0 ||
    context.omittedChanges > 0 ||
    sourceProjectionTruncated(context.left) ||
    sourceProjectionTruncated(context.right);
const sourceProjectionTruncated = (selection) => {
    const source = sourceCoverage(selection);
    if (!source.known)
        return false;
    const coverage = source.value;
    return (coverage.status === "truncated" ||
        coverage.omitted_fields > 0 ||
        coverage.omitted_property_coverage > 0 ||
        coverage.projection_complete === false);
};
const comparisonPartial = (context) => selectionPartial(context.left) ||
    selectionPartial(context.right) ||
    context.input.left.graph.coverage.status !== "complete" ||
    context.input.right.graph.coverage.status !== "complete" ||
    hasPartialJavaScriptExportPropertyCoverage(context.leftRetained.shapes) ||
    hasPartialJavaScriptExportPropertyCoverage(context.rightRetained.shapes) ||
    context.pairing.unpairedLeft.length > 0 ||
    context.pairing.unpairedRight.length > 0 ||
    context.allChanges.some(({ status }) => status === "unknown");
const selectionPartial = (selection) => {
    const source = sourceCoverage(selection);
    return (selection.selection.status !== "selected" ||
        !selection.observationComplete ||
        !source.known ||
        source.value.status !== "complete" ||
        !source.value.projection_complete);
};
/** Name each side whose source omission counts are null, and why. */
const unknownSourceLimitations = (left, right) => [
    ["left", sourceCoverage(left)],
    ["right", sourceCoverage(right)],
].flatMap(([side, source]) => source.known
    ? []
    : [
        `The ${side} export has no return-shape projection because ${source.reason}, so its source omission counts are null (unknown), not zero.`,
    ]);
const comparisonLimitations = (left, right, status) => uniqueSorted([
    "Return shapes are inferred from inert syntax and do not prove runtime behavior.",
    "Return variants are paired only by unique exact literal discriminants, never by source order.",
    "Dynamic values, incomplete object coverage, and ambiguous variants remain unknown.",
    "This static comparison cannot establish runtime semantics; run behavioral probes directly against the relevant application versions when that evidence is required.",
    ...left.limitations,
    ...right.limitations,
    ...unknownSourceLimitations(left, right),
    ...(status === "truncated"
        ? [
            "Comparison output or source return-shape recovery reached an explicit limit.",
        ]
        : []),
    ...(status === "partial"
        ? [
            "At least one selector, graph, return shape, or property boundary is incomplete.",
        ]
        : []),
    ...(status === "unknown"
        ? [
            "At least one source graph's coverage is unknown or unavailable, so the comparison's coverage is unknown.",
        ]
        : []),
]);
const summarize = (changes) => ({
    added: countStatus(changes, "added"),
    removed: countStatus(changes, "removed"),
    changed: countStatus(changes, "changed"),
    unknown: countStatus(changes, "unknown"),
});
const countStatus = (changes, status) => changes.filter((change) => change.status === status).length;
const evidencePair = (left, right) => [
    left,
    right,
];
