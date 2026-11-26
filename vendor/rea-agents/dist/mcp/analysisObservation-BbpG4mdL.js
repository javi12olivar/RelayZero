import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { _ as init_evidence, n as createEvidence, o as evidenceEnvelopeForAdmission } from "./evidence-z4eWkAQk.js";
import { a as init_targetIdentity, l as unknownTarget } from "./targetIdentity-ZgCbCvWA.js";

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
export { createAnalysisExecutionEvidence as n, init_analysisObservation as r, analysisExecutionEnvelopeForAdmission as t };