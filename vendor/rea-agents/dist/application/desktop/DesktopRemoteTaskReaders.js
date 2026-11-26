import { randomUUID } from "node:crypto";
import { AnalysisCancelledError, cancelledBy, } from "../../domain/analysisErrorCore.js";
import { PYTHON_READER_CLEANUP, READER_RUNNER_SLACK_S, readerAnswerView, readerCommand, readerTimeout, } from "../../domain/desktop/appTaskReaders.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
import { AnalysisCleanupRelease } from "../../domain/analysisCleanupRelease.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { AGENTENV_PROVIDER } from "../../desktop/AgentEnvProviderIdentity.js";
import { AbortedWait, waitForAbortable, } from "../../process/AbortablePromise.js";
import { errorMessage } from "../../kernel/errorMessage.js";
/** Owns remote reader folders and joins interrupted commands before removing them. */
export class DesktopRemoteTaskReaders {
    exec;
    #pending = new Set();
    /** Failures reported for the current pending readers, kept to retain late reader facts. */
    #failures = new Set();
    /** Confirmed once the readers pending when it was taken are all removed. */
    #release = new AnalysisCleanupRelease();
    constructor(exec) {
        this.exec = exec;
    }
    get cleanupResources() {
        return [...this.#pending].flatMap(({ lease }) => [
            lease.path,
            `${lease.path}.owner`,
        ]);
    }
    async read(readers, signal) {
        const views = new Map();
        const absent = [];
        const prior = await this.release();
        if (!prior.verified)
            throw this.#failure(prior.reason, this.#facts(views, absent), undefined, signal.aborted ? this.#cancelled(signal, views, absent) : undefined);
        for (const reader of readers) {
            if (signal.aborted)
                throw this.#cancelled(signal, views, absent);
            const token = randomUUID();
            const lease = { path: `/tmp/rea-reader-${token}`, token };
            const pending = {
                lease,
                readerId: reader.id,
                views,
                absent,
                argv: readerCommand(reader, undefined, undefined, lease),
                timeout: readerTimeout(reader) + READER_RUNNER_SLACK_S,
                requestId: `rea-reader-${token}`,
                settled: false,
            };
            this.#pending.add(pending);
            let result;
            try {
                pending.command = this.exec(pending.argv, pending.timeout, undefined, pending.requestId);
                const observed = await waitForAbortable(pending.command, signal);
                if (observed instanceof AbortedWait)
                    throw observed.carried;
                result = observed;
                if (result.timed_out) {
                    pending.uncertain = new Error("The remote runner timed out; its reader may still be running.");
                    delete pending.command;
                    throw pending.uncertain;
                }
                pending.settled = true;
            }
            catch (cause) {
                if (!signal.aborted) {
                    pending.uncertain = cause;
                    delete pending.command;
                }
                throw this.#failure("The reader command has not been confirmed finished.", this.#facts(views, absent), cause, signal.aborted ? this.#cancelled(signal, views, absent) : undefined);
            }
            let failure;
            try {
                if (result.exit_code !== 0 || result.timed_out)
                    throw new Error(`REA's reader runner for ${reader.id} ${result.timed_out ? "timed out" : `exited ${String(result.exit_code)}`}: ${result.stderr.slice(-1024) || result.stdout.slice(-1024)}`);
                const view = readerAnswerView(result.stdout);
                if (view === undefined)
                    absent.push(reader.id);
                else
                    views.set(reader.id, view);
            }
            catch (cause) {
                failure = cause;
            }
            const cleanup = await this.release();
            if (!cleanup.verified)
                throw this.#failure(cleanup.reason, this.#facts(views, absent), failure, signal.aborted ? this.#cancelled(signal, views, absent) : undefined);
            if (signal.aborted)
                throw this.#cancelled(signal, views, absent);
            if (failure !== undefined)
                throw new ProviderAdapterError(AGENTENV_PROVIDER, "check_build_task", {
                    cause: failure,
                    userMessage: `The task reader could not complete: ${errorMessage(failure)}`,
                    diagnostics: this.#facts(views, absent),
                });
        }
        return views;
    }
    /** Join a possibly interrupted command, then remove only the folder it owns. */
    async release() {
        const errors = [];
        for (const pending of this.#pending) {
            try {
                if (!pending.settled) {
                    if (pending.command === undefined)
                        throw (pending.uncertain ??
                            new Error("the reader command's outcome is unknown"));
                    try {
                        const result = await pending.command;
                        if (result.timed_out)
                            throw new Error("The remote runner timed out; its reader may still be running.");
                        if (result.exit_code === 0 && !result.timed_out) {
                            try {
                                const view = readerAnswerView(result.stdout);
                                if (view === undefined)
                                    pending.absent.push(pending.readerId);
                                else
                                    pending.views.set(pending.readerId, view);
                                for (const reference of this.#failures)
                                    reference
                                        .deref()
                                        ?.retainDiagnostics(this.#facts(pending.views, pending.absent));
                            }
                            catch (cause) {
                                for (const reference of this.#failures)
                                    reference.deref()?.retainDiagnostics({
                                        late_reader_failure: errorMessage(cause),
                                    });
                            }
                        }
                        else {
                            for (const reference of this.#failures)
                                reference.deref()?.retainDiagnostics({
                                    late_reader_failure: result.timed_out
                                        ? "The reader timed out."
                                        : `The reader exited ${String(result.exit_code)}: ${result.stderr.slice(-1024)}`,
                                });
                        }
                    }
                    catch (cause) {
                        pending.uncertain = cause;
                        delete pending.command;
                        throw cause;
                    }
                    pending.settled = true;
                    delete pending.command;
                }
                if (pending.cleanupUncertain !== undefined)
                    throw new Error(pending.cleanupUncertain);
                pending.cleanupRequestId ??= `rea-reader-cleanup-${randomUUID()}`;
                const result = await this.exec([
                    "python3",
                    "-I",
                    "-c",
                    PYTHON_READER_CLEANUP,
                    JSON.stringify(pending.lease),
                ], READER_RUNNER_SLACK_S, undefined, pending.cleanupRequestId);
                if (result.timed_out) {
                    pending.cleanupUncertain =
                        "The remote cleanup timed out and may still be running.";
                    throw new Error(pending.cleanupUncertain);
                }
                if (result.exit_code !== 0) {
                    delete pending.cleanupRequestId;
                    throw new Error(result.stderr.slice(-1024) ||
                        "the cleanup command did not complete");
                }
                this.#pending.delete(pending);
            }
            catch (cause) {
                errors.push(errorMessage(cause));
            }
        }
        if (errors.length > 0)
            return {
                verified: false,
                reason: errors.join("; "),
                resources: this.cleanupResources,
            };
        this.#release.confirm();
        this.#release = new AnalysisCleanupRelease();
        this.#failures.clear();
        return { verified: true, teardown: "agentenv" };
    }
    #facts(views, absent) {
        return {
            completed_reader_views: Object.fromEntries([...views].map(([id, view]) => [
                id,
                {
                    format: view.format,
                    view: view.view,
                    ...(view.error === undefined ? {} : { error: view.error }),
                    ...(view.compression === undefined
                        ? {}
                        : { compression: view.compression }),
                },
            ])),
            completed_reader_absent: [...absent],
        };
    }
    #cancelled(signal, views, absent) {
        return cancelledBy("check_build_task", signal).retainDiagnostics(this.#facts(views, absent));
    }
    #failure(reason, facts, cause, primary) {
        const failure = new ProviderCleanupError(AGENTENV_PROVIDER, this.cleanupResources, {
            reason,
            reader_requests: [...this.#pending].map(({ requestId, lease }) => ({
                request_id: requestId,
                folder: lease.path,
            })),
            ...facts,
        }, {
            operation: "check_build_task",
            cause,
            ...(primary === undefined ? {} : { cleanupPrimary: primary }),
            remediationAction: "Retry the check or close the build computer to retry cleanup. If the command outcome is unknown, inspect the reported computer and confirm the reader has stopped before removing its folder.",
        });
        this.#release.bind(failure.bindCleanupResourceOwner(this));
        this.#failures.add(new WeakRef(failure));
        return failure;
    }
}
