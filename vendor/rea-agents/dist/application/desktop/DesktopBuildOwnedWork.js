import { ArtifactResourceScope } from "../../resources/index.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { cancelledBy, OwnerCancellation, } from "../../domain/analysisErrorCore.js";
import { err } from "../../domain/result.js";
/** Long work the build tools own, such as a computer's start or a measure's solves, which closing stops and awaits. */
export class DesktopBuildOwnedWork {
    resources = new ArtifactResourceScope();
    #pending = new Set();
    #retained = new Set();
    #closed = false;
    /** Run work that closing stops, refused once closing has begun. */
    async run(operation, signal, work) {
        if (this.#closed)
            return err(cancelledBy(operation, OwnerCancellation.ownerClosed));
        const stop = new AbortController();
        const settled = work(AbortSignal.any([signal, stop.signal]));
        const pending = { settled, stop };
        this.#pending.add(pending);
        try {
            return await settled;
        }
        finally {
            this.#pending.delete(pending);
        }
    }
    /** Keep a helper whose cleanup could not be confirmed, for closing to retry. */
    retain(owner) {
        this.#retained.add(owner);
    }
    /** Refuse new work, stop what runs and wait for it, then retry kept cleanups; an error for each still failing. */
    async close() {
        this.#closed = true;
        const pending = [...this.#pending];
        for (const work of pending)
            work.stop.abort(OwnerCancellation.ownerClosed);
        await Promise.allSettled(pending.map((work) => work.settled));
        const failures = [];
        try {
            await this.resources.retryCleanup();
        }
        catch (cause) {
            failures.push(cause instanceof Error ? cause : new Error(String(cause)));
        }
        for (const owner of this.#retained) {
            const stopped = await owner.stop();
            if (stopped.status === "incomplete") {
                failures.push(new Error(stopped.reason));
                continue;
            }
            owner.dispose();
            this.#retained.delete(owner);
        }
        return failures;
    }
}
