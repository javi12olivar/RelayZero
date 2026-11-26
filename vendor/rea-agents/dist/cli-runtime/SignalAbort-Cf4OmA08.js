import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/process/SignalAbort.js
var isAbortWithReason, isAbortOf;
function init_SignalAbort() {
	return (init_SignalAbort = __esmMin((() => {
		isAbortWithReason = (cause, reason) => Object.is(cause, reason) || cause instanceof Error && cause.name === "AbortError" && "code" in cause && cause.code === "ABORT_ERR" && Object.is(cause.cause, reason);
		isAbortOf = (cause, signal) => signal?.aborted === true && isAbortWithReason(cause, signal.reason);
	})))();
}

//#endregion
export { init_SignalAbort, isAbortOf, isAbortWithReason };