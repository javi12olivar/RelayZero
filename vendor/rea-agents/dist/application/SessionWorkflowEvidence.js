import { retainAnalysisResultSources } from "./investigation/recordEvidenceSources.js";
import { composedLimitationBudget, createWorkflowEvidence, executeComposedWorkflow, recordWorkflowUnknowns, retainComposedWorkflowSources, retainPartialWorkflowEvidence, workflowSnapshotRecord, } from "./WorkflowEvidence.js";
import { err, ok } from "../domain/result.js";
/** The parameters Evidence names: the caller's input without absent fields. */
const jsonParameters = (input) => Object.fromEntries(Object.entries(input).filter((entry) => entry[1] !== undefined));
/**
 * Run one composed workflow on the admitted analysis and complete its
 * Evidence in the session: retain the sources it read (or its partial
 * Evidence when it stops), record the completed Evidence, its replayable
 * workflow snapshot and its residual unknowns. Every provider read reports
 * progress to the caller. The outcome carries the session's record of the
 * Evidence.
 */
export const executeSessionWorkflowEvidence = async (call, admitted, session, { signal, progress }) => {
    const { name } = call;
    const parameters = jsonParameters(call.input);
    const analysis = {
        resourceScope: admitted.resourceScope,
        execute: (operation, operationParameters, options) => admitted.execute(operation, operationParameters, {
            ...options,
            progress,
        }),
    };
    const recordEvidence = session === undefined
        ? undefined
        : (evidence) => session.recordEvidence(evidence);
    const evidenceInput = {
        target: session?.activeTarget(),
        operation: name,
        parameters,
        upstreamProfile: session === undefined
            ? undefined
            : (session.analysisProfile() ?? session.analysisProfile(name)),
    };
    const { EnhancedTools } = await import("./EnhancedTools.js");
    const executed = await executeComposedWorkflow(analysis, (observed) => new EnhancedTools(observed).executeValidated(call, signal), composedLimitationBudget(name));
    retainPartialWorkflowEvidence(executed, evidenceInput);
    const result = retainComposedWorkflowSources(recordEvidence, executed, evidenceInput, session === undefined ? undefined : (id) => session.evidenceForAnalysis(id), session === undefined
        ? undefined
        : (input, operation, additional) => session.admitRecoveryObservation(input, operation, additional));
    if (!result.ok)
        return result;
    const evidence = createWorkflowEvidence({
        ...evidenceInput,
        result: result.value.result,
        upstreamLimitations: result.value.limitations,
        ...(result.value.evidenceLinks === undefined
            ? {}
            : { upstreamEvidenceLinks: result.value.evidenceLinks }),
    });
    if (session === undefined)
        return ok({ evidence });
    const recorded = session.recordEvidence(evidence);
    if (!recorded.ok)
        return recorded;
    if (name !== "trace_native_ui_action" && session.allowsSnapshotReplay(name)) {
        const workflowRecord = workflowSnapshotRecord(evidence, name, evidenceInput.upstreamProfile, result.value.cachePolicy);
        if (workflowRecord !== undefined) {
            const snapshot = session.recordWorkflowSnapshot(workflowRecord);
            if (!snapshot.ok)
                return err(snapshot.error);
        }
    }
    const unknowns = recordWorkflowUnknowns({
        name,
        result: result.value.result,
        evidenceId: evidence.evidence_id,
        recordUnknown: (unknown) => session.recordUnknown(unknown),
        evidenceRetained: true,
    });
    return unknowns.ok ? ok({ evidence, recorded }) : unknowns;
};
/**
 * Analyze one function on the admitted analysis and retain the Evidence it
 * cites in the session.
 */
export const executeSessionFunctionAnalysis = async (input, analysis, session, request) => {
    const { executeFunctionAnalysisEvidence } = await import("./FunctionAnalysisEvidence.js");
    const analyzed = retainAnalysisResultSources("analyze_function", session === undefined
        ? undefined
        : (evidence) => session.recordEvidence(evidence), await executeFunctionAnalysisEvidence(analysis, jsonParameters(input), session?.activeTarget(), request));
    return analyzed.ok ? ok({ evidence: analyzed.value }) : analyzed;
};
