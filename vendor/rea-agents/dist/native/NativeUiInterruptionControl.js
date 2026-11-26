import { AnalysisCancelledError, AnalysisTimeoutError, cancelledBy, carriedReason, } from "../domain/analysisErrorCore.js";
import { DEFAULT_NATIVE_UI_DEADLINE_MS, nativeDeadlineRecovery, } from "../domain/native/nativeDeadlines.js";
/** Tracks whether the caller or the owned operation deadline stopped UI work. */
export class NativeUiInterruptionControl {
    signal;
    #controller = new AbortController();
    #interruption;
    #caller;
    #deadline;
    #deadlineMs;
    #onCallerAbort = () => {
        this.#interrupt("caller", this.#caller?.reason);
    };
    #onDeadlineAbort = () => {
        this.#interrupt("deadline", this.#deadline.reason);
    };
    /** Selected `native_ui_deadline_ms`, including the omitted default. */
    get deadlineMs() {
        return this.#deadlineMs;
    }
    constructor(caller, deadline, deadlineMs = DEFAULT_NATIVE_UI_DEADLINE_MS) {
        this.#caller = caller;
        this.#deadline = deadline;
        this.#deadlineMs = deadlineMs;
        this.signal = this.#controller.signal;
        // Match AbortSignal.any's iterable priority when both are already aborted.
        if (caller?.aborted)
            this.#interrupt("caller", caller.reason);
        else if (deadline.aborted)
            this.#interrupt("deadline", deadline.reason);
        else {
            caller?.addEventListener("abort", this.#onCallerAbort, { once: true });
            deadline.addEventListener("abort", this.#onDeadlineAbort, {
                once: true,
            });
        }
    }
    /**
     * A helper subprocess reached the selected deadline before the abort signal
     * settled. Caller cancellation already recorded on this control stays primary.
     */
    deadlineFailure(operation, partialObservation) {
        return this.#errorFor(this.#interrupt("deadline", this.#deadline.reason), operation, partialObservation);
    }
    error(operation, partialObservation) {
        const interruption = this.#interruption;
        return interruption === undefined
            ? undefined
            : this.#errorFor(interruption, operation, partialObservation);
    }
    #errorFor(interruption, operation, partialObservation) {
        return interruption.kind === "deadline"
            ? new AnalysisTimeoutError(operation, this.#deadlineMs, {
                cause: interruption.reason,
                partialObservation,
                ...nativeDeadlineRecovery({
                    timeoutMs: this.#deadlineMs,
                    parameter: "native_ui_deadline_ms",
                    defaultMs: DEFAULT_NATIVE_UI_DEADLINE_MS,
                    phase: "native UI observation deadline",
                    detail: " A partial observation may already be retained.",
                    unchanged: "The 67108864-byte scenario output allowance and the 180000 ms cap on one wait step have no runtime override.",
                }),
            })
            : cancelledBy(operation, carriedReason(interruption.reason), {
                partialObservation,
            });
    }
    dispose() {
        this.#caller?.removeEventListener("abort", this.#onCallerAbort);
        this.#deadline.removeEventListener("abort", this.#onDeadlineAbort);
    }
    /** Record the first interruption; a later one leaves it primary. */
    #interrupt(kind, reason) {
        if (this.#interruption !== undefined)
            return this.#interruption;
        const interruption = { kind, reason };
        this.#interruption = interruption;
        this.#controller.abort(reason);
        return interruption;
    }
}
