import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AsyncLocalStorage } from "node:async_hooks";

//#region dist/cli/cliResultControls.js
var invocation, withCliResultControls, recordCliResultControls, recordCliDeliveredEvidence, cliDeliveredEvidence, cliResultControls;
function init_cliResultControls() {
	return (init_cliResultControls = __esmMin((() => {
		invocation = new AsyncLocalStorage();
		withCliResultControls = (run) => invocation.run({}, run);
		recordCliResultControls = (collect) => {
			const context = invocation.getStore();
			if (context !== undefined) context.collect = collect;
		};
		recordCliDeliveredEvidence = (evidence) => {
			const context = invocation.getStore();
			if (context !== undefined) context.delivered = evidence;
		};
		cliDeliveredEvidence = () => invocation.getStore()?.delivered;
		cliResultControls = () => {
			const controls = invocation.getStore()?.collect?.();
			return controls === undefined || Object.keys(controls).length === 0 ? undefined : controls;
		};
	})))();
}

//#endregion
export { cliDeliveredEvidence, cliResultControls, init_cliResultControls, recordCliDeliveredEvidence, recordCliResultControls, withCliResultControls };