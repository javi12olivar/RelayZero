import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";

//#region dist/domain/providerAdapterError.js
var ProviderAdapterError, closedAnalysisClientError;
function init_providerAdapterError() {
	return (init_providerAdapterError = __esmMin((() => {
		init_analysisErrorBase();
		ProviderAdapterError = class extends AnalysisError {
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
		};
		closedAnalysisClientError = (providerId, operation) => new ProviderAdapterError(providerId, operation, {
			userMessage: `The ${providerId} analysis client for this session was closed before ${operation} ran.`,
			remediationAction: "Open the target again with open_binary, or rerun the CLI command, then send the request to the new session.",
			diagnostics: { reason: "client_closed" }
		});
	})))();
}

//#endregion
export { closedAnalysisClientError as n, init_providerAdapterError as r, ProviderAdapterError as t };