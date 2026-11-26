import { requireAnalysisViewRetention, summarizeRetainedAnalysis, } from "../application/analysisView/AnalysisViewService.js";
import { ok } from "../domain/result.js";
import { deliverEvidenceResult } from "./contractToolHandler.js";
import { runOwnedCleanupWithExternalMutationAdmission, runWithExternalMutationAdmission, } from "./externalMutationAdmission.js";
import { logToolExecution } from "./toolLogging.js";
/**
 * Run a command under the session's external-mutation admission, which
 * retires the bound analysis around it, and deliver its result. Without a
 * session the command runs after any pending cleanup retry. A failure
 * delivers its partial Evidence through the session writer.
 */
export const createExternalMutationToolHandler = (server, session, mutation, logger, retention) => (contract) => async (input, context) => {
    const { name } = contract;
    const { signal } = context.mcpReq;
    const failed = (error) => server.delivery.toPartialErrorToolResult(error, contract.returnsTargetContent, retention.recordEvidence);
    if (mutation.kind === "owned-cleanup") {
        const closed = await runOwnedCleanupWithExternalMutationAdmission(session, name, signal, mutation.resource(input), () => logToolExecution(logger, name, () => mutation.run(input)));
        return closed.ok
            ? server.delivery.toCallToolResult(closed, contract)
            : failed(closed.error);
    }
    if (mutation.kind === "value") {
        const changed = await runWithExternalMutationAdmission(session, name, signal, () => logToolExecution(logger, name, () => mutation.run(input, signal)), undefined, mutation.retryCleanup, (value) => value.retained ?? {});
        return changed.ok
            ? server.delivery.toCallToolResult(ok(changed.value.value), contract)
            : failed(changed.error);
    }
    const summary = mutation.detail === "delivery" && deliveryDetail(input) === "summary";
    if (summary) {
        const ready = requireAnalysisViewRetention(name, retention);
        if (!ready.ok)
            return server.delivery.toCallToolResult(ready, contract);
    }
    const prepared = mutation.prepare === undefined
        ? ok((commandSignal) => mutation.run(input, commandSignal))
        : await mutation.prepare(input);
    if (!prepared.ok)
        return failed(prepared.error);
    const command = prepared.value;
    const observed = await runWithExternalMutationAdmission(session, name, signal, () => logToolExecution(logger, name, () => command(signal)), (evidence) => evidence, mutation.retryCleanup);
    return deliverEvidenceResult(server, summary && observed.ok
        ? summarizeRetainedAnalysis(observed.value, retention)
        : observed, contract, retention.recordEvidence);
};
const deliveryDetail = (input) => typeof input === "object" && input !== null && "detail" in input
    ? input.detail
    : undefined;
