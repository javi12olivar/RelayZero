import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { evaluateParsedReconstructionClosure, init_reconstructionCoverage, init_reconstructionCoverageInput, readReconstructionCoverageData, reconstructionCoverageRequestSchema } from "./applicationToolContracts-BF58W5cg.js";

//#region dist/application/ReconstructionCoverageService.js
var OPERATION, evaluateReconstructionCoverage;
function init_ReconstructionCoverageService() {
	return (init_ReconstructionCoverageService = __esmMin((() => {
		init_AnalysisInput();
		init_reconstructionCoverageInput();
		init_reconstructionCoverage();
		OPERATION = "evaluate_reconstruction_coverage";
		evaluateReconstructionCoverage = (rawInput, nowEpochMs = Date.now()) => {
			const parsed = parseAnalysisInput(OPERATION, rawInput, reconstructionCoverageRequestSchema);
			if (!parsed.ok) return parsed;
			const coverage = readReconstructionCoverageData(parsed.value.coverage, ["coverage"]);
			if (!coverage.ok) return coverage;
			return evaluateParsedReconstructionClosure(coverage.value, parsed.value.boundary_id, nowEpochMs);
		};
	})))();
}

//#endregion
init_ReconstructionCoverageService();
export { evaluateReconstructionCoverage };