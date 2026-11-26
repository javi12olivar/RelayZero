import { workflowUnknownInput } from "../investigation/WorkflowUnknown.js";
import { createProcessCaptureEvidence, createProcessScenarioPlanEvidence, } from "./ProcessEvidence.js";
import { prepareProcessScenarioPlan } from "./ProcessScenarioPreparation.js";
import { ok } from "../../domain/result.js";
import { UnknownRegistryError } from "../../domain/unknownRegistryError.js";
import { captureProcessScenario } from "../../process/capture/ProcessHarness.js";
/** Track each behavior the capture could not fully observe as a session unknown. */
const recordProcessResidualUnknowns = (session, evidence, residuals) => {
    for (const residual of residuals) {
        const input = workflowUnknownInput(evidence.evidence_id, {
            question: `Was ${residual.scope} behavior fully observed during capture?`,
            severity: "medium",
            domain: `process-${residual.scope}`,
            required_authority: "controlled-replay",
            required_confidence: "observed",
            required_environment: evidence.environment,
            recommended_probes: [
                {
                    operation: "capture_process_scenario",
                    rationale: "Repeat with a scenario that observes the missing behavior.",
                },
            ],
            relationships: [],
        });
        if (!input.ok)
            return input;
        const unknown = session.recordUnknown(input.value);
        if (!unknown.ok &&
            !(unknown.error instanceof UnknownRegistryError &&
                unknown.error.reason === "already-exists"))
            return unknown;
    }
    return ok(null);
};
/**
 * Plan (`dry_run`) or capture one process scenario and record its Evidence in
 * the session; a capture also records each residual unknown against it.
 */
export const captureSessionProcessScenario = async ({ session, environment, platform, resources }, scenario, { signal, progress }) => {
    if (scenario.dry_run) {
        const prepared = await prepareProcessScenarioPlan(scenario, environment, platform, signal);
        if (!prepared.ok)
            return prepared;
        const evidence = createProcessScenarioPlanEvidence(prepared.value, platform);
        const recorded = session.recordEvidence(evidence);
        return recorded.ok ? ok({ evidence, recorded }) : recorded;
    }
    const captured = await captureProcessScenario(scenario, signal, platform, environment, undefined, undefined, progress, resources);
    if (!captured.ok)
        return captured;
    const evidence = createProcessCaptureEvidence(scenario, captured.value);
    const recorded = session.recordEvidence(evidence);
    if (!recorded.ok)
        return recorded;
    const unknowns = recordProcessResidualUnknowns(session, evidence, captured.value.residual_unknowns);
    return unknowns.ok ? ok({ evidence, recorded }) : unknowns;
};
