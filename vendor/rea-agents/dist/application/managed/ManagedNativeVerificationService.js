import { unknownTarget } from "../../domain/targetIdentity.js";
import { resolveEvidenceRequest, } from "../EvidenceInputResolver.js";
import { createEvidence } from "../../domain/evidence.js";
import { ok } from "../../domain/result.js";
import { managedNativeVerificationHasUnknowns, verifyManagedNativeVerificationSource, } from "../../domain/managed/managedNativeVerification.js";
import { readManagedNativeVerificationSource, } from "../../domain/managed/managedNativeVerificationSource.js";
import { managedNativeVerificationRequestSchema, } from "../../domain/managed/managedNativeVerificationSchemas.js";
import { MANAGED_WORKFLOW_PROVIDER } from "../../domain/investigationProviders.js";
import { workflowUnknownInput } from "../investigation/WorkflowUnknown.js";
const OPERATION = "verify_managed_native_boundaries";
/**
 * Verify session-held boundaries and keep declarations that remain
 * unresolved or contradicted as the verification's residual unknown.
 */
export const verifyManagedNativeBoundariesExecution = (rawInput, lookup, options) => {
    const verified = executeManagedNativeBoundaries(rawInput, lookup, options);
    if (!verified.ok)
        return verified;
    const { evidence, sourceEvidence: sources, hasUnknowns } = verified.value;
    if (!hasUnknowns)
        return ok({ evidence, sources, unknown: undefined });
    const unknown = workflowUnknownInput(evidence.evidence_id, {
        question: "Which managed/native boundaries remain unresolved or contradicted by the supplied native Evidence?",
        severity: "medium",
        domain: "managed-native-verification",
        required_authority: "shipped-artifact",
        required_confidence: "observed",
        required_environment: null,
        recommended_probes: [
            {
                operation: "inspect_managed_native_boundaries",
                rationale: "Review the inspection Evidence coverage and limit diagnostics; this operation has no page override, so unresolved declarations must remain unknown.",
            },
            {
                operation: "analyze_function",
                rationale: "Analyze the provider-resolved native function candidate for the declared export.",
            },
        ],
        relationships: [],
    });
    return unknown.ok
        ? ok({ evidence, sources, unknown: unknown.value })
        : unknown;
};
/** Resolve untrusted source Evidence, then execute over the trusted parsed source. */
export const executeManagedNativeBoundaries = (rawInput, lookup, options = {}) => {
    const request = resolveEvidenceRequest(OPERATION, rawInput, managedNativeVerificationRequestSchema, lookup, options);
    if (!request.ok)
        return request;
    const source = readManagedNativeVerificationSource(request.value.input);
    if (!source.ok)
        return source;
    const result = verifyManagedNativeVerificationSource(source.value);
    const evidence = createManagedNativeVerificationEvidence(source.value, result);
    return ok({
        evidence,
        summary: result.summary,
        hasUnknowns: managedNativeVerificationHasUnknowns(result),
        sourceEvidence: [
            source.value.managedEvidence,
            ...source.value.nativeObservations.map(({ evidence: observation }) => observation),
        ],
    });
};
const createManagedNativeVerificationEvidence = (source, result) => createEvidence(unknownTarget("derived-from-linked-evidence"), MANAGED_WORKFLOW_PROVIDER, {
    predicateType: "rea.managed-native-verification",
    operation: OPERATION,
    parameters: {
        managed_boundaries_evidence_id: source.managedEvidence.evidence_id,
        native_evidence_ids: source.nativeObservations.map(({ evidence }) => evidence.evidence_id),
    },
    result,
    rawResult: null,
    confidence: "inferred",
    authority: "analyst-inference",
    environment: null,
    limitations: result.limitations,
    evidenceLinks: result.evidence_links,
});
