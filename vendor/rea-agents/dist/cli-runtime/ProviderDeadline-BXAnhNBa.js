import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { Deadline, init_deadline } from "./deadline-BKIJLa7g.js";

//#region dist/process/ProviderDeadline.js
var waitForAbortableDelay, ProviderStartupDeadline;
function init_ProviderDeadline() {
	return (init_ProviderDeadline = __esmMin((() => {
		init_deadline();
		waitForAbortableDelay = (milliseconds, signal) => {
			if (signal?.aborted === true) return Promise.resolve("aborted");
			return new Promise((resolve) => {
				const settle = (result) => {
					clearTimeout(timer);
					signal?.removeEventListener("abort", onAbort);
					resolve(result);
				};
				const onAbort = () => settle("aborted");
				const timer = setTimeout(() => settle("elapsed"), Math.max(0, milliseconds));
				signal?.addEventListener("abort", onAbort, { once: true });
			});
		};
		ProviderStartupDeadline = class {
			timeoutMs;
			#controller = new AbortController();
			#budget;
			#externalSignal;
			#onExternalAbort;
			#timer;
			#interruption;
			constructor(timeoutMs, signal, options = {}) {
				this.timeoutMs = timeoutMs;
				if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new RangeError("Provider startup timeout must be positive");
				this.#budget = Deadline.after(timeoutMs, options);
				this.#externalSignal = signal;
				this.#onExternalAbort = () => {
					if (this.#controller.signal.aborted) return;
					if (this.#budget.expired()) {
						this.#interruption = "timeout";
						this.#abort(new DOMException("Provider startup deadline elapsed", "TimeoutError"));
						return;
					}
					this.#interruption = "cancelled";
					this.#abort(signal?.reason);
				};
				if (signal?.aborted === true) {
					this.#onExternalAbort();
					return;
				}
				signal?.addEventListener("abort", this.#onExternalAbort, { once: true });
				this.#armDeadlineTimer(timeoutMs);
			}
			/** Composite signal aborted by either the caller or the absolute deadline. */
			get signal() {
				return this.#controller.signal;
			}
			/** First control path that interrupted startup, if any. */
			get interruption() {
				return this.#interruption ?? (this.#budget.expired() ? "timeout" : undefined);
			}
			/** Milliseconds still available to the next startup phase. */
			remainingMs() {
				if (this.#interruption === "timeout") return 0;
				return this.#budget.remainingMs();
			}
			/**
			* Wait for at most one polling interval under the shared deadline signal.
			*
			* Treat the polling target and the startup deadline as separate absolute times.
			* Clamp each timer to the remaining budget and recheck both targets on wake.
			*/
			wait(milliseconds) {
				const targetAt = performance.now() + milliseconds;
				const poll = () => {
					const budget = this.remainingMs();
					const residual = Math.max(0, targetAt - performance.now());
					return waitForAbortableDelay(Math.min(residual, budget), this.signal).then((result) => {
						if (result === "aborted") return "aborted";
						if (this.#budget.expired()) return "aborted";
						if (performance.now() >= targetAt) return "elapsed";
						return poll();
					});
				};
				return poll();
			}
			/**
			* Begin finalizing a failed or interrupted startup. The finalize budget
			* starts now and only the caller's signal interrupts it, so work that
			* exhausted the startup budget can still drain evidence and release what it
			* owns.
			*/
			finalize() {
				return {
					deadline: this.#budget.beginFinalize(),
					signal: this.#externalSignal
				};
			}
			/** Release the deadline timer and external abort listener. */
			dispose() {
				this.#clearTimer();
				this.#externalSignal?.removeEventListener("abort", this.#onExternalAbort);
			}
			#abort(reason) {
				this.#clearTimer();
				this.#externalSignal?.removeEventListener("abort", this.#onExternalAbort);
				this.#controller.abort(reason);
			}
			#clearTimer() {
				if (this.#timer !== undefined) clearTimeout(this.#timer);
				this.#timer = undefined;
			}
			/**
			* Arm (or re-arm) the timer that expires the absolute monotonic deadline.
			*
			* Re-check the clock before classifying expiry, and retain the residual
			* budget when the timer arrives early.
			*/
			#armDeadlineTimer(milliseconds) {
				this.#timer = setTimeout(() => {
					this.#timer = undefined;
					if (this.#controller.signal.aborted) return;
					if (this.#budget.expired()) {
						this.#interruption = "timeout";
						this.#abort(new DOMException("Provider startup deadline elapsed", "TimeoutError"));
						return;
					}
					this.#armDeadlineTimer(this.remainingMs());
				}, milliseconds);
			}
		};
	})))();
}

//#endregion
export { ProviderStartupDeadline, init_ProviderDeadline, waitForAbortableDelay };