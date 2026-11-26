import { searchProceduresFact, searchStringsFact, } from "../domain/native/nativeOperationFacts.js";
import { executeFact } from "./AnalysisOperationFacts.js";
import { AnalysisCapabilityUnavailableError, AnalysisOutputError, cancelledBy, } from "../domain/analysisErrorCore.js";
import { parseContainingProcedureResolution, } from "../domain/native/nativeObservation.js";
import { err, ok } from "../domain/result.js";
/** Trace matching strings and procedures through provider xrefs. */
export const traceLiteralFeature = async (analysis, input, signal) => {
    const observe = (name, arguments_, operationSignal) => analysis.execute(name, arguments_, operationSignal === undefined ? {} : { signal: operationSignal });
    const call = async (name, arguments_, operationSignal) => {
        const observed = await observe(name, arguments_, operationSignal);
        return observed.ok ? ok(observed.value.result) : observed;
    };
    const searched = await literalMatches(analysis, input, signal);
    if (!searched.ok)
        return searched;
    const traced = await traceReferences(call, observe, {
        matches: searched.value.matches,
        ...(signal === undefined ? {} : { signal }),
    });
    if (!traced.ok)
        return traced;
    return ok({
        query: input.query,
        search_mode: "literal",
        matches: searched.value.matches,
        references: traced.value.references,
        truncated: traced.value.truncated,
        residual_unknowns: traced.value.residual,
    });
};
const literalMatches = async (analysis, input, signal) => {
    const parameters = {
        pattern: input.query,
        mode: "literal",
        case_sensitive: input.case_sensitive,
    };
    const options = signal === undefined ? {} : { signal };
    const strings = await executeFact(analysis, searchStringsFact, parameters, options);
    if (!strings.ok)
        return strings;
    const procedures = await executeFact(analysis, searchProceduresFact, parameters, options);
    if (!procedures.ok)
        return procedures;
    return ok({
        matches: [
            ...strings.value.fact.map((item) => ({
                ...item,
                type: "string",
            })),
            ...procedures.value.fact.map((item) => ({
                ...item,
                type: "procedure",
            })),
        ],
    });
};
const traceReferences = async (call, observe, request) => {
    const references = [];
    const residual = [];
    let truncated = false;
    // References identify targets by address, independently of search alternatives.
    const tracedTargets = new Set();
    // A source address is resolved once however many matches reference it.
    const containing = new Map();
    const imageCoverageGaps = new Set();
    for (const match of request.matches) {
        if (tracedTargets.has(match.address))
            continue;
        tracedTargets.add(match.address);
        const observed = await observe("xrefs", { address: match.address }, request.signal);
        if (!observed.ok)
            return observed;
        // Only an explicit producer report of truncation is a coverage gap; a
        // provider that reports nothing keeps its previous, unqualified result.
        if (observed.value.referencesTruncated === true) {
            truncated = true;
            residual.push(`References to ${match.address} were truncated by the provider; additional references may exist.`);
        }
        for (const gap of observed.value.referenceCoverageGaps ?? []) {
            if (gap.scope === "observation") {
                residual.push(`References to ${match.address}: ${gap.description}`);
            }
            else {
                const key = JSON.stringify([observed.value.provider.id, gap.code]);
                if (!imageCoverageGaps.has(key)) {
                    imageCoverageGaps.add(key);
                    residual.push(gap.description);
                }
            }
        }
        const sources = observed.value.result;
        if (!Array.isArray(sources))
            return err(new AnalysisOutputError("xrefs", "provider returned a non-array result"));
        const classifications = new Map();
        for (const fact of observed.value.referenceClassifications ?? []) {
            if (fact.targetAddress !== match.address)
                continue;
            const values = classifications.get(fact.sourceAddress) ?? [];
            values.push({
                kind: fact.kind,
                provenance: fact.provenance,
                width: fact.width,
            });
            classifications.set(fact.sourceAddress, values);
        }
        for (const source of sources) {
            if (typeof source !== "string")
                return err(new AnalysisOutputError("xrefs", "provider returned a non-address value"));
            let containingProcedure = containing.get(source);
            if (containingProcedure === undefined) {
                const resolved = await call("resolve_containing_procedure", { address: source }, request.signal);
                if (!resolved.ok) {
                    if (!(resolved.error instanceof AnalysisCapabilityUnavailableError) ||
                        resolved.error.operation !== "resolve_containing_procedure" ||
                        resolved.error.cleanupIncomplete ||
                        resolved.error.retryable)
                        return resolved;
                    if (request.signal?.aborted === true)
                        return err(cancelledBy("trace_feature", request.signal));
                    containingProcedure = {
                        query_address: source,
                        status: "unavailable",
                        provider_id: resolved.error.providerId,
                        reason: resolved.error.reason,
                    };
                    residual.push(`Containing procedure for ${source} is unavailable: ${resolved.error.reason}`);
                }
                else {
                    const parsed = parseContainingProcedureResolution(resolved.value);
                    if (!parsed.ok)
                        return parsed;
                    containingProcedure = parsed.value;
                }
                containing.set(source, containingProcedure);
            }
            references.push({
                target_address: match.address,
                source_address: source,
                containing_procedure: containingProcedure,
                ...(classifications.has(source)
                    ? { source_classifications: classifications.get(source) }
                    : {}),
            });
        }
    }
    return ok({ references, residual, truncated });
};
