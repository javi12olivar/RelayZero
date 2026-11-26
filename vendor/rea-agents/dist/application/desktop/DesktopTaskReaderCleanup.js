import { cancelledBy, carriedReason } from "../../domain/analysisErrorCore.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
import { AnalysisCleanupRelease } from "../../domain/analysisCleanupRelease.js";
import { OwnedCommandFailure } from "../../process/OwnedCommand.js";
import { RetainedCommandCleanup } from "../../process/RetainedCommandCleanup.js";
import { processWorkerCleanup, } from "../../process/OwnedWorkerRuntime.js";
import { DESKTOP_PROVIDER } from "./DesktopCaptureRefusals.js";
import { errorMessage } from "../../kernel/errorMessage.js";
const OPERATION = "export_desktop_application";
const primaryFailure = (cause) => {
    if (cause instanceof AnalysisError)
        return cause;
    if (cause === undefined)
        return undefined;
    return cause instanceof OwnedCommandFailure && cause.reason === "cancelled"
        ? cancelledBy(OPERATION, carriedReason(cause.cancellation?.reason))
        : new ProviderAdapterError(DESKTOP_PROVIDER.id, OPERATION, {
            cause,
            userMessage: `The task reader could not complete: ${errorMessage(cause)}`,
        });
};
const readerDiagnostics = ({ views, absent }) => ({
    ...(views.size === 0
        ? {}
        : {
            completed_reader_views: Object.fromEntries([...views].map(([id, view]) => [
                id,
                {
                    format: view.format,
                    view: view.view,
                    ...(view.compression === undefined
                        ? {}
                        : { compression: view.compression }),
                    ...(view.error === undefined ? {} : { error: view.error }),
                },
            ])),
        }),
    ...(absent.length === 0 ? {} : { completed_reader_absent: [...absent] }),
});
/** Preserve completed readers when a later reader fails or is cancelled. */
export const readerFailure = (cause, facts) => (primaryFailure(cause) ??
    new ProviderAdapterError(DESKTOP_PROVIDER.id, OPERATION, { cause })).retainDiagnostics(readerDiagnostics(facts));
/** Own an unconfirmed reader process and its working folder across requests. */
class ReaderCleanup {
    owner;
    failure;
    #retry;
    #released = new AnalysisCleanupRelease();
    constructor(owner, failure) {
        this.owner = owner;
        this.failure = failure;
        this.#released.bind(failure.bindCleanupResourceOwner(owner));
    }
    retryRetainedCleanup() {
        if (this.#retry !== undefined)
            return this.#retry;
        const attempt = this.#release();
        this.#retry = attempt;
        void attempt
            .finally(() => {
            this.#retry = undefined;
        })
            .catch(() => { });
        return attempt;
    }
    async #release() {
        try {
            await this.owner.close();
            processWorkerCleanup.delete(this);
            this.#released.confirm();
        }
        catch (cause) {
            this.failure.retainDiagnostics({
                retry_failure: errorMessage(cause),
            });
            throw this.failure;
        }
    }
}
/** Retain the physical owner before projecting an interrupted reader result. */
export const retainReaderCleanup = (folder, cause, facts, folderFailure) => {
    const owner = new RetainedCommandCleanup(folder, cause);
    if (!owner.hasPendingCommandResources && folderFailure === undefined)
        return undefined;
    const original = primaryFailure(cause);
    const resources = owner.cleanupResources;
    const problem = folderFailure?.cause ??
        (cause instanceof OwnedCommandFailure ? cause.cleanupFailure : undefined) ??
        cause;
    const failure = new ProviderCleanupError(DESKTOP_PROVIDER.id, resources, {
        reason: errorMessage(problem),
        ...readerDiagnostics(facts),
    }, {
        operation: OPERATION,
        cause,
        ...(original === undefined ? {} : { cleanupPrimary: original }),
        remediationAction: "Retry cleanup in this REA process before starting another reader; if it exits first, inspect the reported local resources.",
    });
    processWorkerCleanup.add(new ReaderCleanup(owner, failure));
    return failure;
};
