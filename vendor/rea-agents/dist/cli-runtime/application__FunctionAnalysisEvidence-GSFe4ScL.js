import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_functionDossier, parseFunctionDossier } from "./functionDossier-Cff5XWxr.js";
import { init_nativeProcedureInput, nativeProcedureInputSchema } from "./nativeProcedureInput-BT0vD6Og.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { init_recordEvidenceSources, recordEvidenceSources, withEvidenceSources } from "./recordEvidenceSources-BFkP6hRB.js";
import { EvidenceLedger, init_EvidenceLedger } from "./BundleResourceOperations-yIwg2B-u.js";

//#region dist/application/FunctionAnalysisEvidence.js
var executeFunctionAnalysisEvidence;
function init_FunctionAnalysisEvidence() {
	return (init_FunctionAnalysisEvidence = __esmMin((() => {
		init_AnalysisInput();
		init_nativeProcedureInput();
		init_analysisObservation();
		init_functionDossier();
		init_ProviderOperationExecution();
		init_EvidenceLedger();
		init_recordEvidenceSources();
		executeFunctionAnalysisEvidence = async (analysis, parameters, target, options) => {
			const input = parseAnalysisInput("analyze_function", parameters, nativeProcedureInputSchema, options?.signal);
			if (!input.ok) return input;
			const arguments_ = input.value;
			const execution = await analysis.execute("analyze_function", arguments_, options);
			if (!execution.ok) return execution;
			const sourceLedger = new EvidenceLedger();
			const recorded = recordEvidenceSources((source) => sourceLedger.record(source), execution.value.sourceEvidence ?? []);
			const sources = sourceLedger.recordsForAnalysis();
			if (!recorded.ok) return withEvidenceSources(recorded, sources);
			const observation = {
				...execution.value,
				sourceEvidence: sources,
				...execution.value.subject === undefined && target !== undefined ? { subject: target } : {}
			};
			const dossier = parseFunctionDossier(execution.value.result);
			const evidence = createAnalysisExecutionEvidence("analyze_function", arguments_, dossier.ok ? {
				...observation,
				result: dossier.value
			} : observation, "observed", { callerTarget: target });
			if (!dossier.ok) {
				dossier.error.retainPartialObservation(evidence);
				return withEvidenceSources(dossier, sources);
			}
			return withEvidenceSources(completeProviderEvidence(evidence, options?.signal), sources);
		};
	})))();
}

//#endregion
init_FunctionAnalysisEvidence();
export { executeFunctionAnalysisEvidence };