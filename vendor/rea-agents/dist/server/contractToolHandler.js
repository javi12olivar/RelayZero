import { mcpProgressReporter } from "./mcpProgress.js";
import { projectRetainedAnalysis, requireAnalysisViewRetention, summarizeRetainedAnalysis, } from "../application/analysisView/AnalysisViewService.js";
import { isRecord } from "../kernel/isRecord.js";
import { err, ok } from "../domain/result.js";
import { analysisInputErrorFromIssues } from "../domain/inputIssueProjection.js";
import { logToolExecution } from "./toolLogging.js";
import { runAdmittedToolOperation } from "./admittedToolOperation.js";
import { withAdmittedAnalysis as sessionAdmission } from "./analysisAdmission.js";
import { deliverInvestigationWorkflow } from "./deliverInvestigationWorkflow.js";
import { runDerivedOperation } from "./runDerivedOperation.js";
import { createOperationProgress } from "./operationProgress.js";
import { deliverApplicationExecution, } from "./deliverApplicationExecution.js";
/** Record and deliver one Evidence result using the tool's exact contract. */
export const deliverEvidenceResult = (server, result, contract, recordEvidence, viewSource) => {
    if (!result.ok)
        return server.delivery.toPartialErrorToolResult(result.error, contract.returnsTargetContent, recordEvidence);
    const recorded = recordEvidence?.(result.value);
    return server.delivery.toEvidenceToolResult(result.value, contract, recorded, viewSource);
};
/** Validate delivery selection before inspection and retain its complete source for summaries. */
export const createRetainedSummaryToolHandler = (server, contract, operation, logger, retention, withAdmittedAnalysis) => {
    return createEvidenceToolHandler(server, async (rawInput, options) => {
        const parsed = contract.inputSchema.safeParse(rawInput);
        if (!parsed.success)
            return err(analysisInputErrorFromIssues(contract.name, parsed.error.issues, rawInput, { cause: parsed.error }));
        const { detail, view, ...input } = parsed.data;
        if (detail === "summary") {
            const ready = requireAnalysisViewRetention(contract.name, retention);
            if (!ready.ok)
                return ready;
        }
        const inspected = await (operation.admission === "sdk"
            ? operation.summary(input, options)
            : operation.summary(isRecord(rawInput)
                ? Object.fromEntries(Object.entries(rawInput).filter(([field]) => field !== "detail" && field !== "view"))
                : rawInput, options));
        return detail === "summary" && inspected.ok
            ? projectRetainedAnalysis(inspected.value, retention, view ?? { kind: "summary" })
            : inspected;
    }, logger, retention.recordEvidence, withAdmittedAnalysis)(contract);
};
/**
 * Bind a named Evidence-producing operation to shared logging and delivery.
 * The operation receives the request signal and its MCP progress reporter.
 */
export const createEvidenceToolHandler = (server, operation, logger, recordEvidence, withAdmittedAnalysis, viewSource) => (contract) => (input, context) => runAdmittedToolOperation(server, withAdmittedAnalysis, contract.name, context.mcpReq.signal, async () => {
    const result = await logToolExecution(logger, contract.name, () => operation(input, {
        signal: context.mcpReq.signal,
        progress: mcpProgressReporter(context),
    }));
    return deliverEvidenceResult(server, result, contract, recordEvidence, viewSource?.(input));
});
/**
 * A value that commits a record, with the receipt an overflowing response
 * names so the caller still learns what was committed.
 */
export class CommittedValue {
    value;
    receipt;
    constructor(value, receipt) {
        this.value = value;
        this.receipt = receipt;
    }
}
/** A value delivered complete when it fits, or as its first fitting alternative. */
export class ReducibleValue {
    value;
    alternatives;
    constructor(value, alternatives) {
        this.value = value;
        this.alternatives = alternatives;
    }
}
/**
 * A value followed by content blocks an upstream tool returned (a build
 * computer's screenshot, say), delivered unchanged after REA's JSON.
 */
export class ForwardedValue {
    value;
    content;
    constructor(value, content) {
        this.value = value;
        this.content = content;
    }
}
/**
 * A failure delivered with facts its operation observed alongside the error
 * (an open's selection at failure, say), added to the error's details.
 */
export class DetailedFailure {
    error;
    details;
    constructor(error, details) {
        this.error = error;
        this.details = details;
    }
}
/**
 * Bind a named workflow returning a plain JSON value to shared logging and
 * delivery. A success records no Evidence; a failure's partial Evidence (a
 * cancelled session's cleanup record, say) is delivered through the session
 * writer like any other. It runs under analysis admission only when one is
 * supplied, and then receives the analysis that admission grants.
 */
export const createValueToolHandler = (server, operation, logger, withAdmittedAnalysis, recordEvidence) => (contract) => async (input, context) => runAdmittedToolOperation(server, withAdmittedAnalysis, contract.name, context.mcpReq.signal, async (analysis) => {
    const result = await logToolExecution(logger, contract.name, () => operation(input, {
        signal: context.mcpReq.signal,
        progress: mcpProgressReporter(context),
        context,
        ...(analysis === undefined ? {} : { analysis }),
    }));
    if (!result.ok)
        return result.error instanceof DetailedFailure
            ? server.delivery.toDetailedErrorToolResult(result.error.error, result.error.details, contract.returnsTargetContent)
            : server.delivery.toPartialErrorToolResult(result.error, contract.returnsTargetContent, recordEvidence);
    const { value } = result;
    return value instanceof CommittedValue
        ? server.delivery.toCallToolResult(ok(value.value), contract, value.receipt)
        : value instanceof ReducibleValue
            ? server.delivery.toCallToolResult(ok(value.value), contract, {}, value.alternatives)
            : value instanceof ForwardedValue
                ? server.delivery.toForwardedToolResult(ok(value.value), contract, value.content)
                : server.delivery.toCallToolResult(ok(value), contract);
});
/**
 * Derive Evidence from Evidence the session holds and the inputs the binding
 * acquires. The session owner admits the call, resolves its session-held
 * inputs, retains the sources the derivation read and records the derived
 * Evidence with its unknowns, so provenance is the same whichever tool
 * derives it. An acquisition failure is delivered as is.
 */
export const createDerivedToolHandler = (server, session, acquire, logger) => (contract) => {
    const admission = sessionAdmission({ kind: "session", session });
    const evidenceForAnalysis = session.evidenceForAnalysis.bind(session);
    return async (input, context) => runAdmittedToolOperation(server, admission, contract.name, context.mcpReq.signal, async () => {
        const outcome = await logToolExecution(logger, contract.name, async () => {
            const acquired = await acquire(input, {
                evidenceForAnalysis,
                signal: context.mcpReq.signal,
            });
            if (!acquired.ok)
                return { ...acquired, stage: "acquire" };
            const derive = acquired.value;
            const derived = await runDerivedOperation(context, contract.name, () => {
                const result = derive();
                if (!result.ok)
                    throw result.error;
                return result.value;
            }, (value) => value);
            return { ...derived, stage: "derive" };
        });
        return outcome.stage === "acquire"
            ? server.delivery.toCallToolResult(outcome, contract)
            : deliverInvestigationWorkflow(server, session, contract, outcome);
    });
};
/**
 * Run an application workflow under analysis admission and deliver its
 * completed Evidence with its sources and residual unknown. A request for a
 * view (or summary) is refused before the workflow runs when the complete
 * Evidence cannot be retained; a failure delivers its partial Evidence.
 */
export const createApplicationToolHandler = (server, { workflow, view }, logger, records, withAdmittedAnalysis) => (contract) => async (input, context) => runAdmittedToolOperation(server, withAdmittedAnalysis, contract.name, context.mcpReq.signal, async () => {
    const selected = view?.(input);
    if (selected !== undefined) {
        const retention = requireAnalysisViewRetention(contract.name, {
            recordEvidence: records.recordEvidence,
            evidenceById: records.evidenceById,
        });
        if (!retention.ok)
            return server.delivery.toCallToolResult(retention, contract);
    }
    const result = await logToolExecution(logger, contract.name, () => workflow(input, {
        signal: context.mcpReq.signal,
        progress: mcpProgressReporter(context),
    }));
    if (!result.ok)
        return server.delivery.toPartialErrorToolResult(result.error, contract.returnsTargetContent, records.recordEvidence);
    return deliverApplicationExecution(server.delivery, records, contract, result.value, selected, context.mcpReq.signal);
});
/**
 * Run a provider-backed workflow on the analysis that admission grants for
 * the call, reporting its start and terminal disposition, and deliver its
 * Evidence. When the binding declares that `detail` selects delivery, it
 * never reaches the workflow: a summary is refused before analysis when nothing
 * retains the complete Evidence, and the complete Evidence is retained
 * behind the summary it delivers.
 */
export const createAnalysisToolHandler = (server, analyze, logger, retention, withAdmittedAnalysis, options) => (contract) => async (rawInput, context) => {
    const { detail, input } = options.detail === "delivery"
        ? deliveryDetail(rawInput)
        : { detail: undefined, input: rawInput };
    if (detail === "summary") {
        const ready = requireAnalysisViewRetention(contract.name, retention);
        if (!ready.ok)
            return server.delivery.toCallToolResult(ready, contract);
    }
    const { signal } = context.mcpReq;
    const admitted = await withAdmittedAnalysis(contract.name, signal, async (analysis) => {
        const progress = createOperationProgress(mcpProgressReporter(context), contract.name, options.completionProgress);
        await progress.start();
        const analyzed = await logToolExecution(logger, contract.name, () => analyze(input, analysis, { signal, progress }));
        const response = !analyzed.ok || detail === "summary"
            ? deliverEvidenceResult(server, analyzed.ok
                ? summarizeRetainedAnalysis(analyzed.value.evidence, retention)
                : analyzed, contract, retention.recordEvidence)
            : analyzed.value.recorded === undefined
                ? deliverEvidenceResult(server, ok(analyzed.value.evidence), contract, retention.recordEvidence)
                : server.delivery.toEvidenceToolResult(analyzed.value.evidence, contract, analyzed.value.recorded);
        return progress.complete(response);
    });
    return admitted.ok
        ? admitted.value
        : server.delivery.toErrorToolResult(admitted.error, contract.returnsTargetContent);
};
/** Split the delivery detail an SDK-admitted request selects from its workflow input. */
const deliveryDetail = (rawInput) => {
    if (typeof rawInput !== "object" ||
        rawInput === null ||
        !("detail" in rawInput))
        return { detail: undefined, input: rawInput };
    const { detail, ...input } = rawInput;
    return { detail, input };
};
