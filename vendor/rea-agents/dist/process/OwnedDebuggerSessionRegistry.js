import { withInheritedCleanupOwnership } from "../domain/analysisErrorCleanup.js";
import { err, ok } from "../domain/result.js";
import { AnalysisCleanupRelease } from "../domain/analysisCleanupRelease.js";
import { AnalysisCancelledError, OwnerCancellation, cancelledBy, } from "../domain/analysisErrorCore.js";
import { closeOwnedDebuggerSessions, retainedDebuggerCleanupFailure, } from "./ownedDebuggerSession.js";
import { errorMessage } from "../kernel/errorMessage.js";
/**
 * Owns the persistent sessions of one debugger: the published session map,
 * in-flight starts and their reservations against its capacity, one in-flight
 * stop per session,
 * cleanup failures retained until a stop is confirmed, cleanup retry, and
 * closing every session. Each debugger keeps its protocol, detach and
 * stop-reason policy.
 */
export class OwnedDebuggerSessionRegistry {
    #options;
    #sessions = new Map();
    /**
     * Each session's unconfirmed stop: the release its retained failures read,
     * and the latest of them.
     */
    #cleanupFailures = new WeakMap();
    #stopAttempts = new WeakMap();
    #reservations = 0;
    /** In-flight starts; closing aborts each as owner-closed and awaits it. */
    #starts = new Map();
    /** Set once closing begins; later starts are refused as owner-closed. */
    #closed = false;
    constructor(options) {
        this.#options = options;
    }
    get(id) {
        return this.#sessions.get(id);
    }
    has(id) {
        return this.#sessions.has(id);
    }
    values() {
        return this.#sessions.values();
    }
    /** Publish a started session under its ID. */
    add(session) {
        this.#sessions.set(session.id, session);
    }
    /** Forget a session whose owned cleanup completed; a replacement is kept. */
    remove(session) {
        if (this.#sessions.get(session.id) === session)
            this.#sessions.delete(session.id);
    }
    /** Published sessions plus starts holding a reservation. */
    occupied() {
        return this.#sessions.size + this.#reservations;
    }
    /** Reserve one capacity slot for a start; the release is idempotent. */
    reserve() {
        this.#reservations += 1;
        let held = true;
        return () => {
            if (!held)
                return;
            held = false;
            this.#reservations -= 1;
        };
    }
    /**
     * Run one session start that closing aborts as owner-closed. A start made
     * after closing began is refused the same way, and a caller that already
     * aborted gets its own reason. The caller's abort is relayed; when it came
     * first, a cancellation reports the caller's reason. Register before
     * awaiting, so a close cannot miss it.
     */
    start(operation, callerSignal, run) {
        if (callerSignal?.aborted)
            return Promise.resolve(err(cancelledWithCallerReason(operation, callerSignal)));
        if (this.#closed)
            return Promise.resolve(err(cancelledBy(operation, OwnerCancellation.ownerClosed)));
        const controller = new AbortController();
        let callerAbortWon = false;
        const relayAbort = () => {
            if (controller.signal.aborted)
                return;
            callerAbortWon = true;
            controller.abort(callerSignal?.reason);
        };
        callerSignal?.addEventListener("abort", relayAbort, { once: true });
        // An abort dispatched while the listener was being added never reaches it.
        if (callerSignal?.aborted)
            relayAbort();
        const started = Promise.resolve()
            .then(() => run(controller.signal))
            .finally(() => {
            callerSignal?.removeEventListener("abort", relayAbort);
            this.#starts.delete(controller);
        });
        this.#starts.set(controller, started);
        return started.then((result) => !result.ok &&
            result.error instanceof AnalysisCancelledError &&
            callerAbortWon &&
            callerSignal !== undefined
            ? err(cancelledWithCallerReason(operation, callerSignal, result.error))
            : result);
    }
    /**
     * Refuse new starts, abort every in-flight start as owner-closed and wait
     * for each to settle.
     */
    async closeStarts() {
        this.#closed = true;
        const active = [...this.#starts.entries()];
        for (const [controller] of active)
            controller.abort(OwnerCancellation.ownerClosed);
        await Promise.allSettled(active.map(([, start]) => start));
    }
    /** Whether a stop of this session is in flight. */
    stopping(session) {
        return this.#stopAttempts.has(session);
    }
    /**
     * Stop the owned debugger process, sharing one attempt between concurrent
     * callers. A confirmed stop resolves every retained cleanup failure.
     */
    stop(session) {
        this.#options.sealSession(session);
        const active = this.#stopAttempts.get(session);
        if (active !== undefined)
            return active;
        const attempt = Promise.resolve()
            .then(() => this.#options.stopProcess(session))
            .catch((cause) => ({
            status: "incomplete",
            code: "stop-failed",
            reason: `${this.#options.stopFailurePrefix}: ${errorMessage(cause)}`,
        }))
            .then((stopped) => {
            if (stopped.status !== "incomplete") {
                this.#cleanupFailures.get(session)?.release.confirm();
                this.#cleanupFailures.delete(session);
            }
            return stopped;
        })
            .finally(() => {
            if (this.#stopAttempts.get(session) === attempt)
                this.#stopAttempts.delete(session);
        });
        this.#stopAttempts.set(session, attempt);
        return attempt;
    }
    /** Keep a failure whose cleanup is incomplete until a stop is confirmed. */
    retain(session, failure) {
        const retained = this.#cleanupFailures.get(session) ?? {
            release: new AnalysisCleanupRelease(),
            latest: failure,
        };
        retained.latest = failure;
        this.#cleanupFailures.set(session, retained);
        return retained.release.bind(failure);
    }
    /** Retain the failure of an operation that could not confirm the stop. */
    retainCleanupFailure(session, operation, stopped, options = {}) {
        return this.retain(session, retainedDebuggerCleanupFailure({
            provider: this.#options.provider,
            displayName: this.#options.displayName,
        }, operation, stopped, [session.id], options));
    }
    /**
     * Stop each session that retains a cleanup failure. A session that stops
     * is forgotten unless `keepAddressable` holds: the caller still holds a
     * published session's ID, so status keeps reporting why it stopped until
     * it is closed.
     */
    async retryCleanupFailures(keepAddressable) {
        for (const session of this.#sessions.values()) {
            const retained = this.#cleanupFailures.get(session);
            if (retained === undefined)
                continue;
            const stopped = await this.stop(session);
            if (stopped.status === "incomplete")
                return err(retained.latest);
            if (!keepAddressable(session))
                this.remove(session);
        }
        return ok(null);
    }
    /**
     * Stop every session; sessions whose stop is incomplete stay registered for
     * retry. Callers close starts first.
     */
    closeAll() {
        return closeOwnedDebuggerSessions(this.#sessions, (session) => this.stop(session), this.#options.displayName);
    }
}
/**
 * A cancellation with the caller's own reason, keeping what the provider's
 * cancellation retained: its facts, its output and its cleanup.
 */
export const cancelledWithCallerReason = (operation, signal, previous) => {
    const cancellation = cancelledBy(operation, signal, {
        cleanupPrimary: previous,
        ...(previous?.diagnostics === undefined
            ? {}
            : { diagnostics: previous.diagnostics }),
        ...(previous?.capturedOutput === undefined
            ? {}
            : { capturedOutput: previous.capturedOutput }),
        ...(previous?.cleanup === undefined ? {} : { cleanup: previous.cleanup }),
        ...(previous?.partialObservation === undefined
            ? {}
            : { partialObservation: previous.partialObservation }),
    });
    return previous === undefined
        ? cancellation
        : withInheritedCleanupOwnership(cancellation, previous);
};
