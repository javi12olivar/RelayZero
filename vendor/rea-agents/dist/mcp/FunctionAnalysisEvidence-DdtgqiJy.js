import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_AnalysisInput, r as parseAnalysisInput } from "./AnalysisInput-CaFqc89z.js";
import { $a as init_ProviderOperationExecution, Qa as completeProviderEvidence } from "./createServer-Brv7NMx6.js";
import { a as parseFunctionDossier, i as init_functionDossier } from "./functionDossier-CPGojIMs.js";
import { n as nativeProcedureInputSchema, t as init_nativeProcedureInput } from "./nativeProcedureInput-CkXvXGT-.js";
import { n as createAnalysisExecutionEvidence, r as init_analysisObservation } from "./analysisObservation-BbpG4mdL.js";
import { c as EvidenceLedger, i as withEvidenceSources, l as init_EvidenceLedger, n as recordEvidenceSources, t as init_recordEvidenceSources } from "./recordEvidenceSources-DStvpokn.js";

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