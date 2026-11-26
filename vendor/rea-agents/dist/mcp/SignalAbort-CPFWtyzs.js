import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { r as init_providerAdapterError, t as ProviderAdapterError } from "./providerAdapterError-CdFzW4Ag.js";

//#region dist/domain/providerCleanupError.js
var ProviderCleanupError;
function init_providerCleanupError() {
	return (init_providerCleanupError = __esmMin((() => {
		init_providerAdapterError();
		ProviderCleanupError = class extends ProviderAdapterError {
			userMessage = "Provider cleanup could not be fully confirmed. Review the reported local resources before opening another target.";
			/** Producer-attested completed output; ordinary partial observations cannot recover success. */
			completedObservation;
			constructor(providerId, resources, diagnostics, options) {
				const { operation = "close_binary", completedObservation, ...errorOptions } = options ?? {};
				super(providerId, operation, {
					...errorOptions,
					diagnostics
				});
				this.completedObservation = completedObservation;
				this.markCleanupIncomplete(true);
				this.setCleanupResources(resources);
			}
		};
	})))();
}

//#endregion
//#region dist/process/SignalAbort.js
var isAbortWithReason, isAbortOf;
function init_SignalAbort() {
	return (init_SignalAbort = __esmMin((() => {
		isAbortWithReason = (cause, reason) => Object.is(cause, reason) || cause instanceof Error && cause.name === "AbortError" && "code" in cause && cause.code === "ABORT_ERR" && Object.is(cause.cause, reason);
		isAbortOf = (cause, signal) => signal?.aborted === true && isAbortWithReason(cause, signal.reason);
	})))();
}

//#endregion
export { init_providerCleanupError as a, ProviderCleanupError as i, isAbortOf as n, isAbortWithReason as r, init_SignalAbort as t };