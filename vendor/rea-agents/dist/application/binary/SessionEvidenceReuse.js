import { evidenceSubjectDisplay, } from "../../domain/evidence.js";
import { basename } from "node:path";
import { equalJsonText } from "../../domain/jsonSerialization.js";
import { createAnalysisExecutionEvidence } from "../../domain/analysisObservation.js";
import { ok } from "../../domain/result.js";
import { admitCompletedAnalysis } from "../investigation/admitCompletedAnalysis.js";
// Proof belongs to the exact object issued by the session. A wrapper that
// copies or transforms the observation cannot carry it forward.
const issued = new WeakMap();
export const bindSessionEvidenceExecution = (execution, evidence, callerInputPath) => {
    if ((execution.sourceEvidence !== undefined &&
        execution.sourceEvidence.length > 0) ||
        evidence.caller_input_path !== callerInputPath)
        return execution;
    // Semantic IDs intentionally omit display paths and names. A duplicate in
    // the ledger can therefore refer to the same bytes at a different path.
    const selected = execution.subject;
    const display = evidenceSubjectDisplay(evidence);
    if (selected == null
        ? display !== undefined
        : display === undefined ||
            display.local_path !== selected.path ||
            display.name !== (basename(selected.path) || "artifact"))
        return execution;
    const subject = execution.subject === undefined || execution.subject === null
        ? execution.subject
        : Object.freeze({ ...execution.subject });
    const result = Object.freeze({
        ...execution,
        result: evidence.normalized_result,
        rawResult: evidence.raw_result,
        provider: evidence.provider,
        ...(evidence.analysis_profile === null
            ? {}
            : { analysisProfile: evidence.analysis_profile }),
        limitations: evidence.limitations,
        locations: evidence.locations,
        ...(evidence.relationship_coverage === null
            ? {}
            : { relationshipCoverage: evidence.relationship_coverage }),
        ...(subject === undefined ? {} : { subject }),
    });
    issued.set(result, evidence);
    return result;
};
const sessionEvidenceForExecution = (execution, operation, parameters, lookup) => {
    const evidence = issued.get(execution);
    if (evidence === undefined ||
        evidence.operation !== operation ||
        lookup(evidence.evidence_id) !== evidence ||
        !equalJsonText(evidence.parameters, parameters))
        return undefined;
    return evidence;
};
/**
 * The Evidence of one completed provider operation, built once for every
 * adapter: the record the session issued for this exact execution and
 * parameters when it holds one, else a new record admitted against the
 * completed analysis.
 */
export const completedOperationEvidence = (operation, parameters, execution, options) => {
    const reusable = options.evidenceById === undefined
        ? undefined
        : sessionEvidenceForExecution(execution, operation, parameters, options.evidenceById);
    if (reusable !== undefined)
        return ok(reusable);
    const observation = {
        ...execution,
        subject: execution.subject === undefined ? options.target : execution.subject,
    };
    const admitted = admitCompletedAnalysis(operation, parameters, observation, {
        callerTarget: options.target,
        admit: options.admitRecovery,
    });
    if (!admitted.ok)
        return admitted;
    return ok(createAnalysisExecutionEvidence(operation, parameters, observation, "observed", { callerTarget: options.target }));
};
