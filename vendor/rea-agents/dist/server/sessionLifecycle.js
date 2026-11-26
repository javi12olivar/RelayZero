import { retainSavedAnalysisSnapshot, } from "../domain/savedAnalysisSnapshot.js";
import { err, ok } from "../domain/result.js";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { analysisErrorWithCleanupDependencies } from "../domain/analysisErrorCleanup.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { errorMessage } from "../kernel/errorMessage.js";
import { ArtifactReaderFailure, bindArtifactFileCleanup, } from "../resources/index.js";
/** Expected lifecycle failures keep the same typed result when a child rejects. */
const closeResult = async (close) => {
    try {
        return await close();
    }
    catch (cause) {
        if (cause instanceof AnalysisError)
            return err(cause);
        throw cause;
    }
};
/** close_binary retries the session and process-capture cleanup it retains. */
export const CLOSE_RETRY = { operation: "close_binary" };
/** The process-capture scope keeps failed leases for the next close_binary. */
const retainedProcessCleanup = (error) => error.cleanupIncomplete ? error.bindCleanupRetry(CLOSE_RETRY) : error;
/**
 * Close the session together with the process-capture resources it owns.
 * Both settle; a failed resource cleanup is kept for the next close_binary,
 * and a saved snapshot stays reported when only the resources failed.
 */
export const closeWithProcessResources = ({ logger, closeProcessResources, }) => async (closeSession, savedSnapshot) => {
    const [sessionClose, resourceClose] = await Promise.allSettled([
        closeResult(closeSession),
        closeResult(closeProcessResources),
    ]);
    if (sessionClose.status === "rejected") {
        if (resourceClose.status === "rejected")
            logger.warn({
                error: errorMessage(resourceClose.reason),
            }, "Process capture cleanup threw while closing the session");
        else if (!resourceClose.value.ok)
            logger.warn({ error: resourceClose.value.error.message }, "Process capture cleanup failed while closing the session");
        throw sessionClose.reason;
    }
    if (resourceClose.status === "rejected")
        throw resourceClose.reason;
    const closed = sessionClose.value;
    const resources = resourceClose.value;
    if (!closed.ok) {
        if (resources.ok)
            return closed;
        const combined = analysisErrorWithCleanupDependencies(closed.error, resources.error);
        // The session offers a retry only after retiring its target; a failed
        // save keeps that target open and needs its own recovery first.
        return err(closed.error.cleanupRetry === undefined
            ? combined
            : combined.bindCleanupRetry(CLOSE_RETRY));
    }
    if (resources.ok)
        return closed;
    const retained = retainedProcessCleanup(resources.error);
    return err(savedSnapshot === undefined
        ? retained
        : retainSavedAnalysisSnapshot(retained, savedSnapshot(closed.value)));
};
/**
 * Retry the adapter-owned cleanup a reset joins under the session's drain.
 * Retry keeps the shared artifact scope open for the next investigation.
 */
export const resetCleanupRetry = ({ artifactResources, closeProcessResources, }, operation) => async () => {
    const [process, artifacts] = await Promise.all([
        closeProcessResources(),
        artifactResources.retryCleanup().then(() => ok(null), (cause) => {
            const observation = ArtifactReaderFailure.cleanupObservation(cause, "MCP artifact resources");
            const error = new ProviderCleanupError("rea", observation.resources, { reason: observation.reason }, { cause, operation });
            bindArtifactFileCleanup(cause, error);
            return err(error);
        }),
    ]);
    if (!process.ok && !artifacts.ok)
        return err(analysisErrorWithCleanupDependencies(process.error, artifacts.error, operation));
    return process.ok ? artifacts : process;
};
