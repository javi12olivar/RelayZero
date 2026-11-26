import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { OwnerCancellation, init_analysisErrorCore } from "./jsonSerialization-DAF9DVXC.js";

//#region dist/process/WorkerFrameSignal.js
var WorkerFrameSignal;
function init_WorkerFrameSignal() {
	return (init_WorkerFrameSignal = __esmMin((() => {
		init_analysisErrorCore();
		WorkerFrameSignal = class {
			#waiters = new Set();
			wake(outcome) {
				for (const wake of this.#waiters) wake(outcome);
				this.clear();
			}
			clear() {
				this.#waiters.clear();
			}
			async waitForOutputClose(supervisor, signal) {
				let wakeFrame;
				const frameAvailable = new Promise((resolve) => {
					wakeFrame = resolve;
					this.#waiters.add(wakeFrame);
				});
				const outputCloseController = new AbortController();
				const interruptOutputClose = () => outputCloseController.abort(signal.reason);
				if (signal.aborted) interruptOutputClose();
				else signal.addEventListener("abort", interruptOutputClose, { once: true });
				try {
					const outputClose = supervisor.waitForOutputClose(undefined, outputCloseController.signal).then((closed) => closed ? "closed" : "interrupted");
					return await Promise.race([frameAvailable, outputClose]);
				} finally {
					outputCloseController.abort(OwnerCancellation.noLongerNeeded);
					signal.removeEventListener("abort", interruptOutputClose);
					this.#waiters.delete(wakeFrame);
				}
			}
		};
	})))();
}

//#endregion
export { WorkerFrameSignal, init_WorkerFrameSignal };