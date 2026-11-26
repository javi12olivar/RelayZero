import { HopperProcessError } from "./HopperErrors.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { err, ok } from "../domain/result.js";
import { observeProcessStartIdentityExit } from "../process/ProcessOwnershipObservation.js";
import { createOwnedHopperShutdownDiagnostic, providerCleanupFailure, } from "./HopperDiagnostics.js";
import { parseHopperShutdownReply } from "./HopperReplyContracts.js";
import { errorMessage } from "../kernel/errorMessage.js";
import { retainArtifactCommandCleanup } from "../providers/OwnedCommandCleanup.js";
/** Close Hopper phases and retain every resource whose cleanup is unverified. */
export const cleanupHopperSession = async (input) => {
    const state = {
        issues: [],
        resources: new Set(),
        cleanupResult: undefined,
        processStopped: input.resources.processSupervisor === undefined,
        shutdownRequest: undefined,
        applicationExit: undefined,
    };
    await confirmExternalApplicationExit(input.resources, input.socket, input.releaseTransport);
    await report(input.progress, 0, input.retainDocument &&
        input.resources.launch?.preparedImagePath === undefined
        ? "detaching REA from the Hopper document"
        : "requesting Hopper document shutdown");
    await requestShutdown(input, state);
    await report(input.progress, 0.35, "releasing Hopper bridge transport");
    if (input.resources.shutdownConfirmed ||
        input.resources.launch?.providerLifetime !== "external-application")
        input.releaseTransport(input.socket);
    await stopProcess(input, state);
    // A late authenticated application may exit while shutdown is in flight.
    state.applicationExit = await confirmExternalApplicationExit(input.resources, input.socket, input.releaseTransport);
    recordUnconfirmedDocument(input, state);
    await report(input.progress, 0.75, "removing Hopper private runtime files");
    if (input.resources.runtimeRoot !== undefined &&
        (!state.processStopped ||
            (!input.resources.shutdownConfirmed &&
                (input.resources.launch?.preparedImagePath !== undefined ||
                    input.resources.launch?.providerLifetime === "external-application")))) {
        const resource = input.resources.runtimeRoot.path;
        state.resources.add(resource);
        state.issues.push({
            resource,
            reason: "Private runtime retained because process or native document closure was not confirmed",
        });
    }
    else {
        await closeRuntimeRoot(input, state);
    }
    if (state.processStopped && input.resources.shutdownConfirmed) {
        const launch = input.resources.launch;
        try {
            await launch?.releaseLease?.();
            input.resources.launch = undefined;
        }
        catch (cause) {
            state.resources.add("hopper-lease");
            state.issues.push({
                resource: "hopper-lease",
                reason: errorMessage(cause),
            });
        }
    }
    await releaseInspections(input, state);
    return cleanupOutcome(input, state);
};
/** Retry descriptors whose identity read could not close them. */
const releaseInspections = async (input, state) => {
    try {
        await input.resources.inspections.retryCleanup();
    }
    catch (cause) {
        const resources = input.resources.inspections.cleanupResources;
        for (const resource of resources.length === 0
            ? ["hopper-process-inspection"]
            : resources) {
            state.resources.add(resource);
            state.issues.push({ resource, reason: errorMessage(cause) });
        }
    }
};
export const confirmExternalApplicationExit = async (resources, socket, releaseTransport, observeExit = observeProcessStartIdentityExit) => {
    const application = resources.externalApplication;
    if (resources.shutdownConfirmed ||
        resources.launch?.providerLifetime !== "external-application" ||
        application?.identity.state !== "readable")
        return undefined;
    let observed;
    try {
        observed = await observeExit(application.pid, application.identity.identity);
    }
    catch (cause) {
        // Exit stays unverified; descriptors the read left open stay owned.
        if (retainArtifactCommandCleanup(cause, resources.inspections, "close_binary")
            .length === 0)
            throw cause;
        return "unverified";
    }
    if (observed === "exited") {
        resources.shutdownConfirmed = true;
        releaseTransport(socket);
    }
    return observed;
};
const requestShutdown = async (input, state) => {
    if (input.resources.shutdownConfirmed ||
        input.socket === undefined ||
        input.socket.destroyed ||
        input.activeRequest !== null) {
        state.shutdownRequest = {
            status: "not_sent",
            reason: input.resources.shutdownConfirmed
                ? "shutdown_already_confirmed"
                : input.socket === undefined
                    ? "no_bridge_transport"
                    : input.socket.destroyed
                        ? "bridge_transport_closed"
                        : "bridge_operation_active",
        };
        if (input.activeRequest !== null)
            input.logger.warn({
                method: input.activeRequest.operation,
                callerState: input.activeRequest.callerState,
            }, "Hopper shutdown skipped because a bridge operation remained active");
        return;
    }
    const method = (input.retainDocument &&
        input.resources.launch?.preparedImagePath === undefined) ||
        input.resources.launch?.shutdownMode === "process-cleanup"
        ? "shutdown"
        : "shutdown_document";
    const shutdown = await input
        .request(method)
        .catch((cause) => err(shutdownRequestFailure(method, cause)));
    const outcome = shutdown.ok
        ? parseHopperShutdownReply(method, shutdown.value)
        : undefined;
    let fallback;
    if (outcome?.ok === true &&
        outcome.value === "cleanup_required" &&
        input.resources.launch?.shutdownMode === "process-cleanup") {
        state.cleanupResult = await input.resources.launch
            .cleanup()
            .catch(providerCleanupFailure);
        if (!state.cleanupResult.cleaned) {
            fallback = await fallbackDocumentShutdown(input);
            input.resources.shutdownConfirmed =
                fallback.ok &&
                    isConfirmed(parseHopperShutdownReply("shutdown_document", fallback.value));
        }
    }
    else if (outcome !== undefined) {
        input.resources.shutdownConfirmed = isConfirmed(outcome);
    }
    state.shutdownRequest = {
        method,
        status: !shutdown.ok
            ? "failed"
            : input.resources.shutdownConfirmed
                ? "confirmed"
                : "unconfirmed",
        ...(shutdown.ok ? {} : shutdownErrorDetails(shutdown.error)),
        ...(fallback === undefined
            ? {}
            : {
                fallback: {
                    method: "shutdown_document",
                    status: !fallback.ok
                        ? "failed"
                        : input.resources.shutdownConfirmed
                            ? "confirmed"
                            : "unconfirmed",
                    ...(fallback.ok ? {} : shutdownErrorDetails(fallback.error)),
                },
            }),
    };
    if (!shutdown.ok ||
        (!input.resources.shutdownConfirmed && state.cleanupResult === undefined))
        input.logger.warn({
            status: shutdown.ok ? "invalid-acknowledgement" : "failed",
            ...(shutdown.ok ? {} : shutdownFailureDetails(shutdown.error)),
            ...replyContractDetails(outcome),
        }, "Hopper document shutdown was not confirmed");
};
const fallbackDocumentShutdown = async (input) => {
    const fallback = await input
        .request("shutdown_document")
        .catch((cause) => err(shutdownRequestFailure("shutdown_document", cause)));
    const outcome = fallback.ok
        ? parseHopperShutdownReply("shutdown_document", fallback.value)
        : undefined;
    if (outcome === undefined || !isConfirmed(outcome))
        input.logger.warn({
            status: fallback.ok ? "invalid-acknowledgement" : "failed",
            ...(fallback.ok ? {} : shutdownFailureDetails(fallback.error)),
            ...replyContractDetails(outcome),
        }, "Hopper document shutdown fallback was not confirmed");
    return fallback;
};
const isConfirmed = (outcome) => outcome.ok && outcome.value === "confirmed";
/** Name the fields of a reply outside the shutdown contract. */
const replyContractDetails = (outcome) => outcome === undefined || outcome.ok
    ? {}
    : { reply_contract: outcome.error.diagnostics ?? null };
const shutdownRequestFailure = (operation, cause) => {
    return new HopperProcessError(null, { operation, cause });
};
/** Name the shutdown failure in retained-cleanup details without its cause text. */
const shutdownErrorDetails = (error) => ({
    error_tag: error._tag,
    ...(error instanceof HopperProcessError
        ? { provider_state: error.providerState }
        : {}),
});
const shutdownFailureDetails = (error) => ({
    errorTag: error._tag,
    ...(error instanceof HopperProcessError && error.operation !== undefined
        ? { operation: error.operation }
        : {}),
    ...(error instanceof HopperProcessError && error.requestId !== undefined
        ? { requestId: error.requestId }
        : {}),
    ...(error.cause === undefined
        ? {}
        : { failure_cause: describeFailureCause(error.cause) }),
});
const describeFailureCause = (cause) => {
    if (cause instanceof Error) {
        const code = "code" in cause ? cause.code : undefined;
        return {
            name: cause.name,
            message: cause.message,
            ...(typeof code === "string" ||
                (typeof code === "number" && Number.isFinite(code))
                ? { code }
                : {}),
        };
    }
    if (typeof cause === "string")
        return { type: "string", message: cause };
    if (cause === null ||
        typeof cause === "boolean" ||
        (typeof cause === "number" && Number.isFinite(cause)))
        return { type: cause === null ? "null" : typeof cause, value: cause };
    return { type: typeof cause };
};
const stopProcess = async (input, state) => {
    const supervisor = input.resources.processSupervisor;
    if (supervisor === undefined)
        return;
    const stopped = await supervisor.stop(state.cleanupResult === undefined
        ? {}
        : { cleanupResult: state.cleanupResult });
    const diagnostic = createOwnedHopperShutdownDiagnostic(supervisor.launch, stopped, state.cleanupResult);
    try {
        input.onDiagnostic?.(diagnostic);
    }
    catch (cause) {
        // Diagnostic consumers cannot change the already-observed cleanup result.
        void cause;
    }
    input.logger.info(diagnostic, "Owned Hopper launcher shutdown completed");
    if (stopped.status !== "incomplete") {
        if (input.resources.launch?.providerLifetime === "launcher-process" &&
            stopped.status !== "not-owned")
            input.resources.shutdownConfirmed = true;
        state.processStopped = true;
        input.resources.processSupervisor = undefined;
        return;
    }
    const processGroupId = supervisor.launch.ownership?.processGroupId;
    const resource = processGroupId === undefined
        ? "hopper-process"
        : `process-group:${String(processGroupId)}`;
    state.resources.add(resource);
    state.issues.push({ resource, reason: stopped.reason });
    input.logger.warn({ reason: stopped.reason }, "Owned launcher cleanup failed closed");
};
const recordUnconfirmedDocument = (input, state) => {
    if (input.socket === undefined &&
        state.processStopped &&
        input.resources.launch?.providerLifetime === "launcher-process") {
        // Startup never connected a document; the verified provider lifetime ended.
        input.resources.shutdownConfirmed = true;
    }
    if ((input.socket === undefined && input.resources.launch === undefined) ||
        input.resources.shutdownConfirmed)
        return;
    state.resources.add("hopper-document");
    state.issues.push({
        resource: "hopper-document",
        reason: input.activeRequest === null
            ? "authenticated shutdown acknowledgement was not observed"
            : `bridge operation ${input.activeRequest.operation} remained active after caller ${input.activeRequest.callerState}`,
    });
};
const closeRuntimeRoot = async (input, state) => {
    const runtimeRoot = input.resources.runtimeRoot;
    try {
        await runtimeRoot?.close();
        input.resources.runtimeRoot = undefined;
    }
    catch (cause) {
        const resource = runtimeRoot?.path ?? "hopper-runtime-root";
        state.resources.add(resource);
        state.issues.push({
            resource,
            reason: cause instanceof Error
                ? cause.message
                : "private runtime root cleanup failed",
        });
    }
};
const cleanupOutcome = (input, state) => {
    if (state.issues.length === 0)
        return ok(null);
    return err(new ProviderCleanupError("hopper", [...state.resources], {
        issues: cleanupIssueDetails(state.issues),
        ...(input.resources.runtimeRoot === undefined
            ? {}
            : { runtime_root: input.resources.runtimeRoot.path }),
        ...(input.activeRequest === null
            ? {}
            : { active_request: activityDetails(input.activeRequest) }),
        ...(state.resources.has("hopper-document")
            ? {
                authenticated_application: input.resources.externalApplication === undefined
                    ? "not_observed"
                    : input.resources.externalApplication.identity.state,
                ...(state.shutdownRequest === undefined
                    ? {}
                    : { shutdown_request: state.shutdownRequest }),
                ...(state.applicationExit === undefined
                    ? {}
                    : { application_exit: state.applicationExit }),
            }
            : {}),
    }, state.resources.has("hopper-document")
        ? {
            remediationAction: "Export the Evidence bundle before close_binary clears session records. Let Hopper finish initial analysis or complete its pending dialog, then retry close_binary on this connection so REA can authenticate and close the retained document. If no matching bridge becomes available, manually close the reported document in Hopper, then restart the MCP connection. A helper exit or open:false does not establish that retained cleanup is complete.",
        }
        : undefined));
};
const cleanupIssueDetails = (issues) => issues.map((issue) => ({
    resource: issue.resource,
    reason: issue.reason,
}));
const activityDetails = (activity) => ({
    request_id: activity.requestId,
    operation: activity.operation,
    elapsed_ms: activity.elapsedMs,
    caller_state: activity.callerState,
    queued_requests: activity.queuedRequests,
});
const report = async (progress, completed, message) => {
    // best-effort cleanup: progress reporting must not fail session cleanup.
    try {
        await progress?.report({
            phase: "hopper_cleanup",
            completed,
            total: 1,
            message,
        });
    }
    catch {
        // Observer failures cannot prevent release of the session's owned resources.
    }
};
