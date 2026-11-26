import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { $t as init_analysisResourceLimits, Jt as MAX_NODE_TIMER_DELAY_MS } from "./jsonValue-BIEmjG1z.js";

//#region dist/domain/deadline.js
var validBudget, Deadline;
function init_deadline() {
	return (init_deadline = __esmMin((() => {
		init_analysisResourceLimits();
		validBudget = (name, milliseconds) => {
			if (!Number.isFinite(milliseconds) || milliseconds < 0 || milliseconds > 2147483647) throw new RangeError(`${name} must be a finite millisecond count from 0 to ${String(MAX_NODE_TIMER_DELAY_MS)}`);
			return milliseconds;
		};
		Deadline = class Deadline {
			workMs;
			finalizeMs;
			#endsAt;
			#finalize;
			constructor(workMs, finalizeMs) {
				this.workMs = workMs;
				this.finalizeMs = finalizeMs;
				this.#endsAt = performance.now() + workMs;
			}
			/** A deadline whose work budget starts now. Omitting `finalizeMs` grants none. */
			static after(workMs, options = {}) {
				return new Deadline(validBudget("Deadline work budget", workMs), validBudget("Deadline finalize budget", options.finalizeMs ?? 0));
			}
			/** Whole milliseconds of work budget left; zero once it has elapsed. */
			remainingMs() {
				return Math.max(0, Math.ceil(this.#endsAt - performance.now()));
			}
			/** Whether the work budget has elapsed. */
			expired() {
				return performance.now() >= this.#endsAt;
			}
			/**
			* Start the finalize budget, whether or not work expired. The first call
			* starts it; later calls return the same deadline, so cleanup stages share
			* one window instead of each restarting it. The result grants no further
			* budget.
			*/
			beginFinalize() {
				this.#finalize ??= new Deadline(this.finalizeMs, 0);
				return this.#finalize;
			}
		};
	})))();
}

//#endregion
export { init_deadline as n, Deadline as t };