import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { createEvidence, evidenceEnvelopeForAdmission, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";

//#region dist/domain/analysisObservation.js
var analysisExecutionEvidenceInput, analysisExecutionEnvelopeForAdmission, createAnalysisExecutionEvidence;
function init_analysisObservation() {
	return (init_analysisObservation = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		analysisExecutionEvidenceInput = (operation, input, execution, confidence) => ({
			operation,
			parameters: input,
			result: execution.result,
			rawResult: execution.rawResult,
			limitations: execution.limitations,
			...execution.analysisProfile === undefined ? {} : { analysisProfile: execution.analysisProfile },
			...execution.relationshipCoverage === undefined ? {} : { relationshipCoverage: execution.relationshipCoverage },
			...execution.authority === undefined ? {} : { authority: execution.authority },
			locations: execution.locations,
			confidence
		});
		analysisExecutionEnvelopeForAdmission = (operation, input, execution, callerTarget) => evidenceEnvelopeForAdmission(execution.subject ?? unknownTarget("not-observed"), execution.provider, analysisExecutionEvidenceInput(operation, input, execution, "observed"), callerTarget);
		createAnalysisExecutionEvidence = (operation, input, execution, confidence, options) => createEvidence(execution.subject ?? unknownTarget("not-observed"), execution.provider, {
			...analysisExecutionEvidenceInput(operation, input, execution, confidence),
			evidenceLinks: execution.sourceEvidence?.map(({ evidence_id }) => evidence_id) ?? []
		}, options);
	})))();
}

//#endregion
export { analysisExecutionEnvelopeForAdmission, createAnalysisExecutionEvidence, init_analysisObservation };