import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/process/AbortablePromise.js
var AbortedWait, waitForAbortable;
function init_AbortablePromise() {
	return (init_AbortablePromise = __esmMin((() => {
		AbortedWait = class {
			carried;
			constructor(carried) {
				this.carried = carried;
			}
		};
		waitForAbortable = async (pending, signal) => {
			if (signal === undefined) return pending;
			let onAbort;
			const cancelled = new Promise((resolve) => {
				if (signal.aborted) {
					resolve(new AbortedWait(signal.reason));
					return;
				}
				onAbort = () => resolve(new AbortedWait(signal.reason));
				signal.addEventListener("abort", onAbort, { once: true });
			});
			try {
				return await Promise.race([cancelled, pending]);
			} finally {
				if (onAbort !== undefined) signal.removeEventListener("abort", onAbort);
			}
		};
	})))();
}

//#endregion
export { AbortedWait, init_AbortablePromise, waitForAbortable };