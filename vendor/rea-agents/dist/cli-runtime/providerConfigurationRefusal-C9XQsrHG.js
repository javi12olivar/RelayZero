import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, init_analysisErrorCore } from "./jsonSerialization-DAF9DVXC.js";

//#region dist/domain/providerConfigurationRefusal.js
var providerConfigurationRefusal;
function init_providerConfigurationRefusal() {
	return (init_providerConfigurationRefusal = __esmMin((() => {
		init_analysisErrorCore();
		providerConfigurationRefusal = (providerId, operation, failure) => {
			const reason = `${failure.message}. ${failure.remediation}`;
			return new AnalysisCapabilityUnavailableError(providerId, operation, reason, {
				cause: failure,
				userMessage: reason,
				diagnostics: failure.diagnostics
			});
		};
	})))();
}

//#endregion
export { init_providerConfigurationRefusal, providerConfigurationRefusal };