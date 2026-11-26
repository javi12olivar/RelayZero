import { cancelledBy } from "../domain/analysisErrorCore.js";
import { err, ok } from "../domain/result.js";
import { currentMcpToolRequest } from "./McpToolRequest.js";
/** Run against the source's explicit owner, admitting session-scoped work. */
export const withAdmittedAnalysis = (source) => source.kind === "session"
    ? (operationName, signal, operation) => currentMcpToolRequest()?.admit(source.session, operationName, signal, operation) ??
        source.session.withAdmittedAnalysis(operationName, signal, operation)
    : async (operationName, signal, operation) => signal?.aborted === true
        ? err(cancelledBy(operationName, signal))
        : ok(await operation(source.analysis));
