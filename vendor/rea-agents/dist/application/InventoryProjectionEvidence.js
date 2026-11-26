import { unknownTarget } from "../domain/targetIdentity.js";
import { resolveEvidenceRequest, } from "./EvidenceInputResolver.js";
import { createEvidence, evidenceSubjectInput, } from "../domain/evidence.js";
import { applicationInventoryProjectionInputSchema, readApplicationInventoryProjection, } from "../domain/mobileApplicationGraphProjection.js";
import { ok } from "../domain/result.js";
/** Resolve source inventory once, then wrap its family projection in Evidence. */
export const projectInventoryEvidence = (options) => {
    const request = resolveEvidenceRequest(options.operation, options.rawInput, applicationInventoryProjectionInputSchema, options.lookup, options.execution);
    if (!request.ok)
        return request;
    const source = readApplicationInventoryProjection(request.value.input, options.operation);
    if (!source.ok)
        return source;
    const projected = options.project(source.value);
    if (!projected.ok)
        return projected;
    const result = projected.value;
    const first = source.value.evidence[0];
    return ok({
        evidence: createEvidence(first === undefined
            ? unknownTarget("derived-from-linked-evidence")
            : evidenceSubjectInput(first.subject), options.provider, {
            predicateType: options.predicateType,
            operation: options.operation,
            parameters: { inventory_evidence_ids: [...result.source_evidence_ids] },
            result,
            rawResult: null,
            confidence: "inferred",
            authority: "analyst-inference",
            environment: null,
            limitations: result.limitations,
            evidenceLinks: result.source_evidence_ids,
        }),
        sources: source.value.evidence,
    });
};
