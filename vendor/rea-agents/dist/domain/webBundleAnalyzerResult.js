import { buildJavaScriptRouteInventorySteps } from "./javascript/javascriptRouteInventory.js";
import { completeSemanticSteps } from "./javascript/javascriptSemanticTraversal.js";
import { RETURNED_REFERENCE_WIDENING_LIMITATION } from "./javascript/javascriptSemanticCoverage.js";
import { browserOriginSchema } from "./browserObservation.js";
import { webBundleAnalysisSchema, } from "./webBundleAnalysis.js";
import { createWebBundleAnalysisAccumulator, isIncludedScript, } from "./webBundleAnalyzerState.js";
import { webBundleScriptAnalysisSchema, } from "./webBundleScriptAnalysis.js";
import { appendAll } from "./appendAll.js";
export const buildCapturedWebBundleAnalysis = (inspection, sourceMaps, rawResults) => {
    const results = rawResults.map((result) => webBundleScriptAnalysisSchema.parse(result));
    const byKey = new Map();
    for (const result of results) {
        if (byKey.has(result.script_key))
            throw new TypeError(`Duplicate script analysis result: ${result.script_key}`);
        byKey.set(result.script_key, result);
    }
    const sourceScripts = inspection.scripts.items.filter(isIncludedScript);
    const expectedKeys = new Set(sourceScripts.map(({ script_key }) => script_key));
    for (const key of byKey.keys())
        if (!expectedKeys.has(key))
            throw new TypeError(`Unexpected script analysis result: ${key}`);
    const orderedResults = sourceScripts.map((script) => byKey.get(script.script_key) ?? {
        status: "unavailable",
        script_key: script.script_key,
        reason: "worker_failure",
        detail: "No analysis result was returned for this captured script.",
    });
    const unavailableAnalyses = orderedResults.filter((result) => result.status === "unavailable");
    const accumulator = mergeScriptResults(orderedResults);
    const semanticUnknowns = orderedResults.flatMap((result) => result.status !== "analyzed" || result.semantic_limits === undefined
        ? []
        : result.semantic_limits.map(({ reason, limit }) => ({
            dimension: "javascript_analysis",
            reason,
            limit,
            remediation: `Increase ${limit.parameter} on the next analysis call.`,
            affected_script_keys: [result.script_key],
        })));
    const attemptedScripts = orderedResults.filter((result) => !(result.status === "unavailable" && result.reason === "not_started")).length;
    const unavailable = inspection.scripts.items
        .filter((script) => !script.source.included)
        .map(({ script_key }) => script_key);
    const unavailableSourceReasons = [
        ...new Set(inspection.scripts.items.flatMap((script) => script.source.included ? [] : [script.source.reason])),
    ].sort();
    const omittedScripts = captureBudgetOmission(inspection, "scripts");
    const omittedSourceScripts = captureBudgetOmission(inspection, "script_sources");
    const omittedSourceMaps = sourceMaps.status === "not_requested" || sourceMaps.excluded !== undefined
        ? undefined
        : captureBudgetOmission(inspection, "source_maps");
    const sourceMapIncomplete = sourceMaps.status === "partial" || sourceMaps.status === "unavailable";
    const partial = semanticUnknowns.length > 0 ||
        accumulator.failedScripts.length > 0 ||
        accumulator.recoveredScripts.length > 0 ||
        accumulator.widenedScripts.length > 0 ||
        unavailable.length > 0 ||
        unavailableAnalyses.length > 0 ||
        sourceMapIncomplete ||
        omittedScripts !== undefined ||
        omittedSourceScripts !== undefined ||
        omittedSourceMaps !== undefined;
    return webBundleAnalysisSchema.parse({
        route_inventory: completeSemanticSteps(buildJavaScriptRouteInventorySteps(inspection.scripts.items.map((script) => {
            const result = byKey.get(script.script_key);
            const analyzed = result?.status === "analyzed" ? result : undefined;
            return {
                key: script.script_key,
                path: null,
                url: script.url,
                container_sha256: null,
                sha256: script.source.included
                    ? script.source.artifact.sha256
                    : null,
                status: analyzed === undefined || analyzed.parse_status === "failed"
                    ? "unavailable"
                    : analyzed.parse_status === "recovered"
                        ? "partial"
                        : "complete",
                reason: !script.source.included
                    ? script.source.reason
                    : result?.status === "unavailable"
                        ? result.reason
                        : analyzed === undefined
                            ? "No route syntax result was returned"
                            : analyzed.parse_status === "failed"
                                ? "Script parsing failed"
                                : analyzed.parse_status === "recovered"
                                    ? "Script parsing recovered from errors"
                                    : null,
                facts: analyzed?.route_facts ?? null,
            };
        }), undefined, [
            ...(omittedScripts === undefined
                ? []
                : [
                    {
                        unit: "script-records",
                        count: omittedScripts,
                        reason: captureBudgetReason("script records", omittedScripts),
                    },
                ]),
            ...(omittedSourceScripts === undefined
                ? []
                : [
                    {
                        unit: "script-sources",
                        count: omittedSourceScripts,
                        reason: captureBudgetReason("script source artifacts", omittedSourceScripts),
                    },
                ]),
        ])),
        capture: buildCaptureObservation(inspection, sourceScripts, attemptedScripts),
        observations: {
            chunks: {
                nodes: sourceScripts.map(chunkNode),
                edges: accumulator.edges,
            },
            routes: accumulator.routes,
            endpoints: accumulator.endpoints,
            webmcp_declarations: accumulator.webMcp,
            source_maps: sourceMaps,
        },
        inferences: accumulator.inferences,
        unknowns: buildUnknowns({
            semanticUnknowns,
            unavailable,
            unavailableSourceReasons,
            failedScripts: accumulator.failedScripts,
            recoveredScripts: accumulator.recoveredScripts,
            widenedScripts: accumulator.widenedScripts,
            unresolvedEndpoints: accumulator.unresolvedEndpoints,
            unavailableAnalyses,
            sourceMaps,
            omittedScripts,
            omittedSourceScripts,
            omittedSourceMaps,
        }),
        completeness: buildCompleteness({
            partial,
            parsedScripts: accumulator.parsedScripts,
            parseFailures: accumulator.failedScripts.length,
            visitedNodes: accumulator.visitedNodes,
        }),
        limitations: bundleLimitations(),
    });
};
const mergeScriptResults = (results) => {
    const accumulator = createWebBundleAnalysisAccumulator();
    for (const result of results) {
        if (result.status === "unavailable") {
            // A refused script still parsed; its text inferences remain.
            if (result.partial === undefined)
                continue;
            accumulator.parsedScripts += 1;
            if (result.partial.parse_status === "recovered")
                accumulator.recoveredScripts.push(result.script_key);
            appendAll(accumulator.inferences, result.partial.inferences);
            continue;
        }
        accumulator.visitedNodes += result.visited_ast_nodes;
        if (result.parse_status === "failed") {
            accumulator.failedScripts.push(result.script_key);
            continue;
        }
        accumulator.parsedScripts += 1;
        if (result.parse_status === "recovered")
            accumulator.recoveredScripts.push(result.script_key);
        if (result.widened_return_references)
            accumulator.widenedScripts.push(result.script_key);
        appendAll(accumulator.edges, result.observations.edges);
        appendAll(accumulator.routes, result.observations.routes);
        appendAll(accumulator.endpoints, result.observations.endpoints);
        appendAll(accumulator.unresolvedEndpoints, result.observations.unresolved_endpoints);
        appendAll(accumulator.webMcp, result.observations.webmcp_declarations);
        appendAll(accumulator.inferences, result.inferences);
    }
    return accumulator;
};
const buildCaptureObservation = (inspection, sourceScripts, attemptedScripts) => {
    const targetOrigin = browserOriginSchema.safeParse(inspection.target.origin);
    return {
        target_url: inspection.target.url,
        target_origin: targetOrigin.success ? targetOrigin.data : null,
        scripts_observed: inspection.scripts.total,
        // This preserves the historical meaning: source scripts submitted for
        // analysis, including worker/deadline failures; explicitly unstarted suffixes
        // are excluded. Successfully parsed scripts are counted separately below.
        scripts_analyzed: attemptedScripts,
        source_artifacts: sourceScripts.map(sourceArtifact),
    };
};
const sourceArtifact = (script) => {
    if (!script.source.included)
        throw new TypeError("Filtered source changed");
    const { text: _text, ...artifact } = script.source.artifact;
    return { ...artifact, text_available: true };
};
const chunkNode = (script) => {
    if (!script.source.included)
        throw new TypeError("Filtered source changed");
    return {
        script_key: script.script_key,
        url: script.url,
        artifact_sha256: script.source.artifact.sha256,
        bytes: script.source.artifact.bytes,
    };
};
const buildUnknowns = (input) => [
    ...input.semanticUnknowns,
    ...(input.omittedScripts === undefined
        ? []
        : [
            {
                dimension: "script_inventory",
                reason: captureBudgetReason("script records", input.omittedScripts),
                affected_script_keys: [],
            },
        ]),
    ...(input.omittedSourceScripts === undefined
        ? []
        : [
            {
                dimension: "script_source",
                reason: captureBudgetReason("script source artifacts", input.omittedSourceScripts),
                affected_script_keys: [],
            },
        ]),
    ...(input.unavailable.length === 0
        ? []
        : [
            {
                dimension: "script_source",
                reason: input.unavailableSourceReasons.length === 0
                    ? "Source artifact was not captured"
                    : `Source artifacts were not captured: ${input.unavailableSourceReasons.join("; ")}`,
                affected_script_keys: input.unavailable,
            },
        ]),
    ...(input.failedScripts.length === 0
        ? []
        : [
            {
                dimension: "javascript_ast",
                reason: "One or more source artifacts could not be parsed",
                affected_script_keys: [...input.failedScripts],
            },
        ]),
    ...(input.unavailableAnalyses.length === 0
        ? []
        : groupUnavailableAnalyses(input.unavailableAnalyses).map(({ reason, detail, limit, remediation, refusedPhase, affectedScriptKeys, }) => ({
            dimension: "javascript_analysis",
            reason: analysisUnavailableReason(reason, detail),
            affected_script_keys: affectedScriptKeys,
            ...(limit === undefined ? {} : { limit }),
            ...(remediation === undefined ? {} : { remediation }),
            ...(refusedPhase === undefined
                ? {}
                : { refused_phase: refusedPhase }),
        }))),
    ...(input.unresolvedEndpoints.length === 0
        ? []
        : [
            {
                dimension: "endpoints",
                reason: "A browser request's endpoint could not be resolved from its URL argument.",
                affected_script_keys: [
                    ...new Set(input.unresolvedEndpoints.map(({ location }) => location.script_key)),
                ],
                call_sites: [...input.unresolvedEndpoints],
            },
        ]),
    ...(input.widenedScripts.length === 0
        ? []
        : [
            {
                dimension: "javascript_ast",
                reason: RETURNED_REFERENCE_WIDENING_LIMITATION,
                affected_script_keys: [...input.widenedScripts],
            },
        ]),
    ...(input.recoveredScripts.length === 0
        ? []
        : [
            {
                dimension: "javascript_ast",
                reason: "The parser recovered from errors in one or more source artifacts; findings may be incomplete",
                affected_script_keys: [...input.recoveredScripts],
            },
        ]),
    ...(input.omittedSourceMaps === undefined
        ? []
        : [
            {
                dimension: "source_maps",
                reason: captureBudgetReason("source-map declarations", input.omittedSourceMaps),
                affected_script_keys: [],
            },
        ]),
    ...(input.sourceMaps.status === "not_requested" ||
        input.sourceMaps.status === "included"
        ? []
        : [
            {
                dimension: "source_maps",
                reason: input.sourceMaps.limitation ??
                    "One or more requested source maps were unavailable or incomplete",
                affected_script_keys: input.sourceMaps.items
                    .filter(({ status }) => status !== "included")
                    .map(({ script_key }) => script_key)
                    .sort(),
            },
        ]),
];
const captureBudgetOmission = (inspection, section) => {
    const exclusions = inspection.completeness.excluded.filter((exclusion) => exclusion.section === section &&
        exclusion.reason === "resource_budget_exhausted" &&
        exclusion.count !== 0);
    if (exclusions.length === 0)
        return undefined;
    if (exclusions.some(({ count }) => count === null))
        return null;
    return exclusions.reduce((sum, { count }) => sum + (count ?? 0), 0);
};
const groupUnavailableAnalyses = (unavailable) => {
    // Scripts share an unknown only when their structured recovery agrees too.
    const groups = new Map();
    for (const entry of unavailable) {
        const key = JSON.stringify([
            entry.reason,
            entry.detail ?? null,
            entry.limit ?? null,
            entry.remediation ?? null,
            entry.partial?.refused_phase ?? null,
        ]);
        const group = groups.get(key);
        if (group === undefined)
            groups.set(key, { entry, affectedScriptKeys: [entry.script_key] });
        else
            group.affectedScriptKeys.push(entry.script_key);
    }
    return [...groups.values()].map(({ entry, affectedScriptKeys }) => ({
        reason: entry.reason,
        detail: entry.detail,
        limit: entry.limit,
        remediation: entry.remediation,
        refusedPhase: entry.partial?.refused_phase,
        affectedScriptKeys,
    }));
};
const analysisUnavailableReason = (reason, detail) => `Analysis was unavailable for captured scripts (${reason}); findings from those scripts are unknown.${detail === undefined ? "" : ` Worker detail: ${JSON.stringify(detail)}`}`;
const captureBudgetReason = (label, count) => count === null
    ? `Capture omitted an unknown number of ${label} because its resource budget was exhausted.`
    : `Capture omitted ${String(count)} ${label} because its resource budget was exhausted.`;
const buildCompleteness = (input) => ({
    status: input.partial ? "partial" : "complete",
    parsed_scripts: input.parsedScripts,
    parse_failures: input.parseFailures,
    visited_ast_nodes: input.visitedNodes,
});
const bundleLimitations = () => [
    "Static bundle findings are observations or bounded inferences; REA does not execute captured JavaScript.",
    "Bare string arguments of unbound HTTP-method-named calls are low-confidence endpoint candidates; form, translation, storage and other APIs can use the same syntax. URL-shaped findings still do not prove network execution.",
    'Endpoint candidates are deduplicated by script, value and detector; basis retains only the first matching source coordinate. They are not a complete call-site inventory or a runtime occurrence count. completeness.status="complete" describes examination of captured source, not a call-site census.',
    "String-built routes and endpoints, encrypted configuration, and server-side behavior may remain unknown.",
    "Page-declared WebMCP metadata is untrusted and is never registered or invoked as an REA tool.",
];
