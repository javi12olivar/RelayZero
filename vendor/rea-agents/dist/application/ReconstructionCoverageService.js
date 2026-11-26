import { parseAnalysisInput } from "./AnalysisInput.js";
import { reconstructionCoverageRequestSchema } from "../domain/reconstructionCoverageInput.js";
import { evaluateParsedReconstructionClosure, readReconstructionCoverageData, } from "../domain/reconstructionCoverage.js";
const OPERATION = "evaluate_reconstruction_coverage";
/** Evaluate inline reconstruction coverage against a named boundary. */
export const evaluateReconstructionCoverage = (rawInput, nowEpochMs = Date.now()) => {
    const parsed = parseAnalysisInput(OPERATION, rawInput, reconstructionCoverageRequestSchema);
    if (!parsed.ok)
        return parsed;
    const coverage = readReconstructionCoverageData(parsed.value.coverage, [
        "coverage",
    ]);
    if (!coverage.ok)
        return coverage;
    return evaluateParsedReconstructionClosure(coverage.value, parsed.value.boundary_id, nowEpochMs);
};
