import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ProcessAdmissionError, init_ProcessAdmissionError } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";

//#region dist/process/PendingOperations.js
var PendingOperations;
function init_PendingOperations() {
	return (init_PendingOperations = __esmMin((() => {
		init_ProcessAdmissionError();
		PendingOperations = class {
			#pending = new Map();
			/** Number of currently correlated operations. */
			get size() {
				return this.#pending.size;
			}
			/** Return whether an operation key is awaiting a protocol reply. */
			has(key) {
				return this.#pending.has(key);
			}
			/** Register one unique operation key and await its reply or cancellation. */
			wait(key, options) {
				if (this.#pending.has(key)) throw new ProcessAdmissionError("duplicate_key");
				if (options.signal?.aborted === true) return Promise.resolve(options.cancelledValue());
				return new Promise((resolve) => {
					const onAbort = options.signal === undefined ? undefined : () => this.#finish(key, options.cancelledValue());
					const timer = options.timeoutMs === undefined ? undefined : setTimeout(() => this.#finish(key, options.timeoutValue()), options.timeoutMs);
					this.#pending.set(key, {
						resolve,
						timer,
						signal: options.signal,
						onAbort
					});
					if (onAbort !== undefined) options.signal?.addEventListener("abort", onAbort, { once: true });
				});
			}
			/** Settle one correlated reply; returns false for late or unknown keys. */
			settle(key, value) {
				return this.#finish(key, value);
			}
			/** Fail every active operation while releasing all timers and listeners. */
			failAll(valueFor) {
				for (const key of this.#pending.keys()) this.#finish(key, valueFor(key));
			}
			#finish(key, value) {
				const pending = this.#pending.get(key);
				if (pending === undefined) return false;
				this.#pending.delete(key);
				if (pending.timer !== undefined) clearTimeout(pending.timer);
				if (pending.signal !== undefined && pending.onAbort !== undefined) pending.signal.removeEventListener("abort", pending.onAbort);
				pending.resolve(value);
				return true;
			}
		};
	})))();
}

//#endregion
export { PendingOperations, init_PendingOperations };