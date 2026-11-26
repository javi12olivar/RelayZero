import { unknownTarget } from "./targetIdentity.js";
import { createEvidence, evidenceEnvelopeForAdmission, } from "./evidence.js";
/** Build the single borrowed observation used for admission and commitment. */
const analysisExecutionEvidenceInput = (operation, input, execution, confidence) => ({
    operation,
    parameters: input,
    result: execution.result,
    rawResult: execution.rawResult,
    limitations: execution.limitations,
    ...(execution.analysisProfile === undefined
        ? {}
        : { analysisProfile: execution.analysisProfile }),
    ...(execution.relationshipCoverage === undefined
        ? {}
        : { relationshipCoverage: execution.relationshipCoverage }),
    ...(execution.authority === undefined
        ? {}
        : { authority: execution.authority }),
    locations: execution.locations,
    confidence,
});
/** Borrow the Evidence envelope with links left empty for incremental admission accounting. */
export const analysisExecutionEnvelopeForAdmission = (operation, input, execution, callerTarget) => evidenceEnvelopeForAdmission(execution.subject ?? unknownTarget("not-observed"), execution.provider, analysisExecutionEvidenceInput(operation, input, execution, "observed"), callerTarget);
/** Commit identical facts on success and when retaining a completed observation after cancellation. */
export const createAnalysisExecutionEvidence = (operation, input, execution, confidence, options) => createEvidence(execution.subject ?? unknownTarget("not-observed"), execution.provider, {
    ...analysisExecutionEvidenceInput(operation, input, execution, confidence),
    evidenceLinks: execution.sourceEvidence?.map(({ evidence_id }) => evidence_id) ?? [],
}, options);
