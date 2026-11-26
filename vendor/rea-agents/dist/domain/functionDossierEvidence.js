import { ANALYSIS_EVIDENCE_PREDICATE, evidenceFileTarget, } from "./evidence.js";
import { sameTargetIdentity, } from "./targetIdentity.js";
import { AnalysisInputError } from "./analysisErrorCore.js";
import { readEvidence, readEvidencePayload, } from "./evidenceValidation.js";
import { err, ok } from "./result.js";
import { compareUnicodeCodePoints } from "./unicodeCodePointOrder.js";
import { functionDossierSchema, } from "./native/functionDossier.js";
import { assessFunctionCallCoverage } from "./functionCallCoverage.js";
import { functionCoordinateContextsEqual } from "./native/functionCoordinateContext.js";
export const functionSnapshotCoordinateContext = (left, right) => {
    if (left.target.sha256 !== right.target.sha256)
        return "cross-artifact";
    // The same bytes share coordinates only when opened as the same target:
    // format, architecture and selection (a raw entry point or flash offset).
    return left.target.architecture !== null &&
        sameTargetIdentity(left.target, right.target) &&
        functionCoordinateContextsEqual(left.evidence.analysis_profile, right.evidence.analysis_profile)
        ? "common"
        : "unknown";
};
/** Parse one complete analyze_function Evidence record for comparison workflows. */
export const parseFunctionEvidence = (input, selection) => {
    const [first] = selection.path;
    const side = selection.path.length === 1 && (first === "left" || first === "right")
        ? { side: first }
        : {};
    const parsed = readEvidence(input, side);
    if (!parsed.ok)
        return parsed;
    const evidence = parsed.value;
    const invalidSelection = (message, facts) => err(new AnalysisInputError(selection.operation, { userMessage: message }, [
        {
            path: selection.path,
            reason: "invalid_value",
            message,
            ...facts,
        },
    ]));
    if (evidence.operation !== "analyze_function" ||
        evidence.predicate_type !== ANALYSIS_EVIDENCE_PREDICATE) {
        const location = selection.path.map(String).join(".");
        const subject = location === ""
            ? "supplied Evidence"
            : selection.path.length === 1
                ? `${location} Evidence`
                : `Evidence at ${location}`;
        return invalidSelection(`Function analysis requires analyze_function Evidence with the rea.analysis predicate; the ${subject} has operation ${evidence.operation} and predicate ${evidence.predicate_type}.`, {
            expected: {
                operation: "analyze_function",
                predicate_type: ANALYSIS_EVIDENCE_PREDICATE,
            },
            observed: {
                operation: evidence.operation,
                predicate_type: evidence.predicate_type,
            },
        });
    }
    const target = evidenceFileTarget(evidence);
    if (target === undefined)
        return invalidSelection("Function analysis requires artifact-bound Evidence");
    const dossier = readEvidencePayload(functionDossierSchema, evidence.normalized_result, { ...side, within: ["normalized_result"] });
    if (!dossier.ok)
        return dossier;
    const callCoverage = assessFunctionCallCoverage(evidence.relationship_coverage, dossier.value);
    return ok({
        evidence,
        target,
        dossier: dossier.value,
        limitations: [
            ...new Set([...evidence.limitations, ...dossier.value.limitations]),
        ].sort((left, right) => compareUnicodeCodePoints(left, right)),
        callCoverageBlockers: callCoverage.blockers,
        unresolvedCallCaveats: callCoverage.unresolvedCallCaveats,
        callCoverageDiagnostics: callCoverage.diagnostics,
        callDiscoveryLimitations: callCoverage.discoveryLimitations,
        callDiscoveryStatus: callCoverage.discoveryStatus,
    });
};
