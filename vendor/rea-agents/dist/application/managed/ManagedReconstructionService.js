import { createEvidence } from "../../domain/evidence.js";
import { executeManagedReconstructionImport, managedReconstructionImportRequestSchema, resolveManagedReconstructionImport, } from "../../domain/managed/managedReconstruction.js";
import { ok } from "../../domain/result.js";
import { MANAGED_WORKFLOW_PROVIDER } from "../../domain/investigationProviders.js";
import { resolveEvidenceRequest, } from "../EvidenceInputResolver.js";
const OPERATION = "import_managed_reconstruction";
/** Validate the request envelope and authenticate its managed Evidence source once. */
const resolveManagedReconstructionEvidenceInput = (rawInput, lookup, options = {}) => {
    const parsed = resolveEvidenceRequest(OPERATION, rawInput, managedReconstructionImportRequestSchema, lookup, options);
    if (!parsed.ok)
        return parsed;
    return resolveManagedReconstructionImport(parsed.value.input);
};
/**
 * Validate the raw request envelope, then authenticate and import its source;
 * the authenticated static Evidence is the import's source.
 */
export const importManagedReconstructionExecution = (rawInput, lookup, options = {}) => {
    const resolved = resolveManagedReconstructionEvidenceInput(rawInput, lookup, options);
    if (!resolved.ok)
        return resolved;
    const result = executeManagedReconstructionImport(resolved.value);
    return ok({
        evidence: createManagedReconstructionEvidence(resolved.value.request, result),
        sources: [resolved.value.staticEvidence],
        unknown: undefined,
    });
};
/** Validate the raw request envelope, then authenticate and import its source. */
export const importManagedReconstructionEvidence = (rawInput, lookup, options = {}) => {
    const imported = importManagedReconstructionExecution(rawInput, lookup, options);
    return imported.ok ? ok(imported.value.evidence) : imported;
};
const createManagedReconstructionEvidence = (input, result) => createEvidence({
    path: result.static_observation.artifact_path,
    sha256: result.static_observation.artifact_sha256,
    format: "pe",
}, MANAGED_WORKFLOW_PROVIDER, {
    predicateType: "rea.managed-reconstruction-import",
    operation: OPERATION,
    parameters: {
        static_members_evidence_id: result.static_observation.evidence_id,
        decompiler: result.decompiler,
        method_locks: input.methods.map(({ token, signature_sha256, normalized_il_sha256 }) => ({
            token,
            signature_sha256,
            normalized_il_sha256,
        })),
        notes: input.notes,
    },
    result,
    rawResult: null,
    confidence: "inferred",
    authority: "analyst-inference",
    environment: null,
    limitations: result.limitations,
    locations: [
        {
            kind: "artifact-path",
            path: result.static_observation.artifact_path,
        },
    ],
    evidenceLinks: result.evidence_links,
});
