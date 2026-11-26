import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { createEvidence, evidenceSubjectInput, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_EvidenceInputResolver, resolveEvidenceRequest } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { applicationInventoryProjectionInputSchema, init_mobileApplicationGraphProjection, readApplicationInventoryProjection } from "./bridgeCandidateProjection-C2xt4OHc.js";

//#region dist/application/InventoryProjectionEvidence.js
var projectInventoryEvidence;
function init_InventoryProjectionEvidence() {
	return (init_InventoryProjectionEvidence = __esmMin((() => {
		init_targetIdentity();
		init_EvidenceInputResolver();
		init_evidence();
		init_mobileApplicationGraphProjection();
		init_result();
		projectInventoryEvidence = (options) => {
			const request = resolveEvidenceRequest(options.operation, options.rawInput, applicationInventoryProjectionInputSchema, options.lookup, options.execution);
			if (!request.ok) return request;
			const source = readApplicationInventoryProjection(request.value.input, options.operation);
			if (!source.ok) return source;
			const projected = options.project(source.value);
			if (!projected.ok) return projected;
			const result = projected.value;
			const first = source.value.evidence[0];
			return ok({
				evidence: createEvidence(first === undefined ? unknownTarget("derived-from-linked-evidence") : evidenceSubjectInput(first.subject), options.provider, {
					predicateType: options.predicateType,
					operation: options.operation,
					parameters: { inventory_evidence_ids: [...result.source_evidence_ids] },
					result,
					rawResult: null,
					confidence: "inferred",
					authority: "analyst-inference",
					environment: null,
					limitations: result.limitations,
					evidenceLinks: result.source_evidence_ids
				}),
				sources: source.value.evidence
			});
		};
	})))();
}

//#endregion
export { init_InventoryProjectionEvidence, projectInventoryEvidence };