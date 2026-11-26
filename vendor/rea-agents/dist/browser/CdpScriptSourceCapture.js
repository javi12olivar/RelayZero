import { cancelledBy } from "../domain/analysisErrorCore.js";
import { sourceExcluded, sourceResult } from "./CdpCaptureValues.js";
import { CDP_SCRIPT_SOURCE_BYTES_OMISSION_REASON, cdpScriptSourceDeadlineOmissionReason, } from "./CdpScriptSourceBudget.js";
/** One owner for passive page/Electron source admission and artifact creation. */
export const capturePassiveCdpScriptSource = async (input) => {
    const omitForBudget = () => {
        input.completeness.exclude("script_sources", "resource_budget_exhausted");
        return sourceExcluded(input.sourceBudget.timedOut
            ? cdpScriptSourceDeadlineOmissionReason(input.sourceBudget.commandTimeoutMs)
            : CDP_SCRIPT_SOURCE_BYTES_OMISSION_REASON);
    };
    const throwIfCancelled = () => {
        if (input.signal?.aborted === true)
            throw cancelledBy(input.operation, input.signal);
    };
    throwIfCancelled();
    if (input.sourceBudget.timedOut)
        return omitForBudget();
    try {
        const { scriptSource: text } = await input.connection.send("Debugger.getScriptSource", { scriptId: input.scriptId }, input.sessionId, input.sourceBudget.signal);
        throwIfCancelled();
        if (input.sourceBudget.timedOut || !input.sourceBudget.admit(text))
            return omitForBudget();
        return sourceResult(text);
    }
    catch (cause) {
        throwIfCancelled();
        if (input.sourceBudget.timedOut)
            return omitForBudget();
        throw cause;
    }
};
