import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { setImmediate } from "node:timers/promises";

//#region dist/process/queuedInterrupts.js
var dispatchQueuedInterrupts;
function init_queuedInterrupts() {
	return (init_queuedInterrupts = __esmMin((() => {
		dispatchQueuedInterrupts = async () => {
			await setImmediate();
			await setImmediate();
		};
	})))();
}

//#endregion
export { dispatchQueuedInterrupts, init_queuedInterrupts };