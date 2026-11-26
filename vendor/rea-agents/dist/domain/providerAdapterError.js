import { AnalysisError, } from "./analysisErrorBase.js";
/** A provider adapter failed outside its more precise typed variants. */
export class ProviderAdapterError extends AnalysisError {
    providerId;
    operation;
    _tag = "ProviderAdapterError";
    userMessage;
    remediationAction;
    constructor(providerId, operation, options = {}) {
        super(`Provider ${providerId} adapter failed during ${operation}`, options);
        this.providerId = providerId;
        this.operation = operation;
        this.userMessage = options.userMessage;
        this.remediationAction = options.remediationAction;
    }
    get providerWide() {
        return true;
    }
}
/** A request reached an analysis client after its session closed that client. */
export const closedAnalysisClientError = (providerId, operation) => new ProviderAdapterError(providerId, operation, {
    userMessage: `The ${providerId} analysis client for this session was closed before ${operation} ran.`,
    remediationAction: "Open the target again with open_binary, or rerun the CLI command, then send the request to the new session.",
    diagnostics: { reason: "client_closed" },
});
