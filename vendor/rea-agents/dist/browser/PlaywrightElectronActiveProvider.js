import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { retainProcessInspectionCleanup, processInspectionCancellationError, } from "../providers/OwnedCommandCleanup.js";
import { runWithExecutionLimits } from "./PlaywrightElectronExecution.js";
import { ArtifactReaderFailure, bindArtifactFileCleanup, ArtifactResourceScope, } from "../resources/index.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { ElectronCaptureCleanup } from "./ElectronCaptureCleanup.js";
import { analysisErrorWithCleanupDependencies } from "../domain/analysisErrorCleanup.js";
import { analysisErrorWithCancellation } from "../domain/analysisErrorCancellation.js";
import { electronFuseFailure } from "../electron/ElectronFuseFailures.js";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { AnalysisError, primaryAnalysisError, } from "../domain/analysisErrorBase.js";
import { AnalysisCancelledError, cancelledBy, } from "../domain/analysisErrorCore.js";
import { BrowserObservationError } from "../domain/browserObservationError.js";
import { ProviderAdapterError } from "../domain/providerAdapterError.js";
import { err, ok } from "../domain/result.js";
import { ProcessOwnershipEvidenceOwner } from "../process/ProcessOwnershipEvidence.js";
import { observeOwnedProcessLineage, prepareProcessOwnershipInspection, systemProcessOwnershipHost, } from "../process/ProcessOwnershipObservation.js";
import { runElectronActions, readApplicationState, readFinalApplicationState, watchSingleInstanceLockRefusal, } from "./PlaywrightElectronActiveActions.js";
import { projectElectronActiveCapture } from "./PlaywrightElectronActiveProjection.js";
import { readElectronFuseImage } from "../electron/ElectronFuseReader.js";
import { assertNodeCliInspectArgumentsSupported } from "./PlaywrightElectronActiveFuses.js";
const OPERATION = "capture_electron_scenario";
const STARTUP_TIMEOUT_MS = 60_000;
import { PLAYWRIGHT_ELECTRON_ACTIVE_PROVIDER_IDENTITY } from "./providerIdentities.js";
import { errorMessage } from "../kernel/errorMessage.js";
import { sha256Hex } from "../kernel/sha256Hex.js";
const hookPath = fileURLToPath(new URL("../../scripts/electron-active-hook.cjs", import.meta.url));
/** Launch an owned Electron application through the official Playwright API. */
export class PlaywrightElectronActiveProvider {
    environment;
    launch;
    readFuseImage;
    platform;
    #resources = new ArtifactResourceScope();
    #shutdown = new AbortController();
    /** Stop admitting work, cancel and join captures, then retry exact retained resource owners. */
    async close() {
        this.#shutdown.abort(new Error("Electron active provider is closing"));
        try {
            await this.#resources.close();
        }
        catch (cause) {
            throw providerError(cause);
        }
    }
    constructor(environment, 
    // Load Playwright only when a capture launches; MCP startup stays off its module graph.
    launch = async (options) => (await import("playwright-core"))._electron.launch(options), readFuseImage = readElectronFuseImage, 
    // The host the application launches and is cleaned up on.
    platform = HOST_PLATFORM.platform) {
        this.environment = environment;
        this.launch = launch;
        this.readFuseImage = readFuseImage;
        this.platform = platform;
    }
    identity() {
        return PLAYWRIGHT_ELECTRON_ACTIVE_PROVIDER_IDENTITY;
    }
    async capture(input, options = {}) {
        const signal = AbortSignal.any([
            this.#shutdown.signal,
            ...(options.signal === undefined ? [] : [options.signal]),
        ]);
        try {
            return await this.#resources.run(() => this.#capture(input, { ...options, signal }));
        }
        catch (cause) {
            return err(providerError(cause));
        }
    }
    async #capture(input, options) {
        let application;
        let ownership;
        let lineage;
        let capture;
        let paths;
        // The latest completed snapshot, retained when a later stage fails.
        let retained;
        let actions = [];
        let outcome;
        const runId = randomUUID();
        try {
            if (options.signal?.aborted === true)
                throw new BrowserObservationError(OPERATION, "cancelled", {
                    cause: options.signal.reason,
                });
            await inspectOwnership(() => prepareProcessOwnershipInspection(options.signal), this.#resources);
            const startupDeadline = performance.now() + STARTUP_TIMEOUT_MS;
            paths = {
                executable: input.executable_path,
                application: input.application_path,
                root: input.application_root,
            };
            const preflight = assertNodeCliInspectArgumentsSupported(input.executable_path, {
                resources: this.#resources,
                ...(options.signal === undefined ? {} : { signal: options.signal }),
                readFuseImage: this.readFuseImage,
            }).catch((cause) => {
                throw electronFuseFailure(cause, input.executable_path, OPERATION);
            });
            try {
                await runWithExecutionLimits(preflight, options.signal, startupDeadline);
            }
            catch (interruption) {
                // A startup interruption cannot abandon an admitted descriptor's final
                // close. Its physical/cleanup failure takes precedence over the race.
                await preflight;
                throw interruption;
            }
            const captureBaseline = await inspectOwnership(() => systemProcessOwnershipHost.captureBaseline?.(options.signal), this.#resources);
            if (options.signal?.aborted)
                throw new BrowserObservationError(OPERATION, "cancelled", {
                    cause: options.signal.reason,
                });
            const applicationArgs = [
                "-r",
                hookPath,
                paths.application,
                ...input.args,
            ];
            const launchOptions = {
                executablePath: paths.executable,
                cwd: paths.root,
                env: {
                    ...safeElectronEnvironment(this.environment, runId, this.platform),
                    REA_ELECTRON_CAPTURE_ARGV: JSON.stringify({
                        length: applicationArgs.length,
                        sha256: sha256Hex(JSON.stringify(applicationArgs)),
                    }),
                },
                args: applicationArgs,
                timeout: Math.max(1, startupDeadline - performance.now()),
            };
            application = await containLaunchRejections(() => {
                if (options.signal?.aborted === true)
                    throw new BrowserObservationError(OPERATION, "cancelled", {
                        cause: options.signal.reason,
                    });
                return this.launch(launchOptions);
            });
            const leaderPid = application.process().pid;
            if (typeof leaderPid !== "number" ||
                !Number.isSafeInteger(leaderPid) ||
                leaderPid <= 0)
                throw new BrowserObservationError(OPERATION, "process_ownership_unavailable");
            ownership = {
                runId,
                leaderPid,
                processGroupId: leaderPid,
                expectedParentPid: process.pid,
                expectedCommand: paths.executable,
                sweepTokenOwnedProcesses: true,
                evidenceOwner: new ProcessOwnershipEvidenceOwner(),
                ...(captureBaseline === undefined ? {} : { captureBaseline }),
            };
            lineage = await observeOwnedProcessLineage(ownership);
            const initialState = await runWithExecutionLimits(readApplicationState(application), options.signal, startupDeadline);
            retained = { stage: "initial", state: initialState };
            refuseHandedOffInstance(initialState.hookSnapshot);
            // A lock refused while actions run stops the path that would open their
            // windows, so the refusal also ends pending actions; the final snapshot
            // then reports it.
            const handedOff = watchSingleInstanceLockRefusal(application);
            const actionOutcome = await runElectronActions(application, input, {
                ...options,
                signal: options.signal === undefined
                    ? handedOff
                    : AbortSignal.any([options.signal, handedOff]),
            }, this.#resources);
            actions = actionOutcome.actions;
            if (actionOutcome.cleanupError !== undefined)
                throw actionOutcome.cleanupError;
            const state = await readFinalApplicationState(application, options.signal);
            const finalCapture = projectElectronActiveCapture(paths, actions, state);
            retained = { stage: "final", state };
            refuseHandedOffInstance(state.hookSnapshot);
            capture = finalCapture;
            outcome = ok(capture);
        }
        catch (cause) {
            if (paths !== undefined && retained !== undefined) {
                const retainedCapture = projectElectronActiveCapture(paths, actions, retained.state);
                const reason = errorMessage(cause);
                capture = {
                    ...retainedCapture,
                    limitations: [
                        ...retainedCapture.limitations,
                        retained.stage === "initial"
                            ? `Capture stopped after the initial pre-action snapshot: ${reason}. Final Windows, metrics, IPC, and timeline state is unknown; the retained snapshot may omit action effects.`
                            : `Capture failed after its final snapshot: ${reason}. The retained final snapshot includes action effects.`,
                    ],
                };
            }
            const error = providerError(cause);
            if (capture !== undefined)
                error.retainPartialObservation({
                    kind: "electron-active-observation",
                    capture,
                });
            outcome = err(error);
        }
        if (application !== undefined) {
            const owner = new ElectronCaptureCleanup(application, ownership, lineage, this.platform);
            const released = await owner.release(this.#resources);
            const cleanup = owner.processResult;
            outcome = captureOutcomeWithCancellation(outcome, options.signal);
            if (released.processes.kind === "failed" ||
                released.transport.kind === "failed") {
                const processFailure = released.processes.kind === "failed";
                const failures = [released.processes, released.transport].flatMap((attempt) => (attempt.kind === "failed" ? [attempt.cause] : []));
                const cause = failures.length === 1
                    ? failures[0]
                    : new AggregateError(failures, "Electron process and transport cleanup failed");
                const reason = failures
                    .map((failure) => errorMessage(failure))
                    .join("; ");
                const failure = new BrowserObservationError(OPERATION, "cleanup_failed", {
                    cause,
                    detail: `${processFailure ? "Electron process cleanup could not be verified" : "Electron transport teardown failed after process cleanup"}: ${reason}. Collected observations are retained when available.`,
                    cleanup: { reason, resources: owner.pendingResources },
                    ...(capture === undefined
                        ? {}
                        : {
                            partialObservation: {
                                kind: "electron-active-observation",
                                capture: processFailure
                                    ? {
                                        ...capture,
                                        application: {
                                            ...capture.application,
                                            cleanup: "unverified",
                                        },
                                    }
                                    : capture,
                            },
                        }),
                });
                owner.bind(failure);
                if (outcome.ok)
                    return err(failure);
                const composed = analysisErrorWithCleanupDependencies(outcome.error, failure, OPERATION);
                if (failure.partialObservation !== undefined)
                    composed.partialObservation = failure.partialObservation;
                return err(composed);
            }
            if (outcome.ok && cleanup?.cleaned && cleanup.unverified !== undefined)
                outcome = ok({
                    ...outcome.value,
                    limitations: [
                        ...outcome.value.limitations,
                        ...cleanup.unverified.map(({ pid, diagnostic }) => `Ownership of unrelated process ${String(pid)} could not be verified; it was left untouched: ${diagnostic}`),
                    ],
                });
        }
        // Cleanup failures returned above keep precedence; a completed capture
        // observed under late cancellation is retained as partial Evidence.
        return captureOutcomeWithCancellation(outcome, options.signal);
    }
}
/**
 * A launch that was refused the app's single-instance lock was handed to the
 * instance holding it; the launched process is not the target, so stop.
 */
const refuseHandedOffInstance = (snapshot) => {
    if (snapshot.single_instance_lock_refused === true)
        throw new BrowserObservationError(OPERATION, "application_already_running", {
            detail: "The application is already running: the launched instance did not obtain the app's single-instance lock, so Electron handed this launch and its arguments to the running instance. REA stopped the launched instance at that call and failed the capture; it did not observe or drive the running instance.",
            remediationAction: "Close the running application, or wait for another capture of the same application to finish, then retry.",
        });
};
/** Normalize only explicit facts emitted by the inspection owner. */
const inspectOwnership = async (inspect, resources) => {
    try {
        return await inspect();
    }
    catch (cause) {
        const cancellation = processInspectionCancellationError(cause, OPERATION);
        const primary = cancellation === undefined ? providerError(cause) : cancellation;
        throw retainProcessInspectionCleanup(cause, primary, resources, OPERATION);
    }
};
/** Keep existing failures and their cleanup owners when cancellation arrives later. */
const captureOutcomeWithCancellation = (outcome, signal) => {
    if (signal?.aborted !== true)
        return outcome;
    if (outcome.ok)
        return err(cancelledCapture(outcome.value, signal.reason));
    const primary = primaryAnalysisError(outcome.error);
    if ((primary instanceof AnalysisCancelledError ||
        primary.userCategory === "cancelled") &&
        Object.is(primary.cause, signal.reason))
        return outcome;
    return err(analysisErrorWithCancellation(outcome.error, cancelledBy(OPERATION, signal)));
};
const cancelledCapture = (capture, reason) => new BrowserObservationError(OPERATION, "cancelled", {
    cause: reason,
    partialObservation: { kind: "electron-active-observation", capture },
});
export const safeElectronEnvironment = (environment, runId, platform) => Object.fromEntries([
    ...[
        "HOME",
        "LANG",
        "PATH",
        "TMP",
        "TMPDIR",
        "USER",
        "DISPLAY",
        "XAUTHORITY",
        "WAYLAND_DISPLAY",
        ...(platform === "win32"
            ? [
                "SYSTEMROOT",
                "TEMP",
                "APPDATA",
                "LOCALAPPDATA",
                "USERPROFILE",
                "COMSPEC",
                "PATHEXT",
                "PROGRAMDATA",
                "ALLUSERSPROFILE",
                "USERNAME",
                "SYSTEMDRIVE",
                "HOMEDRIVE",
                "HOMEPATH",
            ]
            : []),
    ]
        .map((name) => [name, environment[name]])
        .filter((entry) => entry[1] !== undefined),
    ["REA_PROCESS_RUN_ID", runId],
]);
const PLAYWRIGHT_INTERNAL_FRAME = /playwright-core[\\/]lib[\\/]/;
const activeLaunches = new Set();
const heldLaunchRejections = new Map();
const holdLaunchRejection = (reason, promise) => {
    if (!(reason instanceof Error) ||
        !PLAYWRIGHT_INTERNAL_FRAME.test(reason.stack ?? ""))
        throw reason;
    if (!heldLaunchRejections.has(promise))
        heldLaunchRejections.set(promise, {
            reason,
            candidates: new Set(activeLaunches),
            hadExternalListener: process
                .listeners("unhandledRejection")
                .some((listener) => listener !== holdLaunchRejection),
        });
};
const forwardLaunchRejection = (reason, hadExternalListener) => {
    // Listeners present at the original event already observed it. When the
    // holding listener was the only listener, restore Node's fatal behavior.
    if (!hadExternalListener)
        process.nextTick(() => {
            throw reason;
        });
};
/** Playwright leaves rejected launch promises unhandled; absorb only those that repeat this launch's failure. */
const containLaunchRejections = async (launch) => {
    const scope = {};
    if (activeLaunches.size === 0)
        process.on("unhandledRejection", holdLaunchRejection);
    activeLaunches.add(scope);
    try {
        return await launch();
    }
    catch (cause) {
        scope.failure = cause;
        throw cause;
    }
    finally {
        await new Promise((resolve) => setImmediate(resolve));
        activeLaunches.delete(scope);
        if (activeLaunches.size === 0)
            process.off("unhandledRejection", holdLaunchRejection);
        for (const [promise, { reason, candidates, hadExternalListener },] of heldLaunchRejections) {
            if (!candidates.delete(scope))
                continue;
            if (scope.failure instanceof Error &&
                reason.message !== "" &&
                scope.failure.message.includes(reason.message))
                heldLaunchRejections.delete(promise);
            else if (candidates.size === 0) {
                heldLaunchRejections.delete(promise);
                forwardLaunchRejection(reason, hadExternalListener);
            }
        }
    }
};
const providerError = (cause) => {
    if (cause instanceof AnalysisError)
        return cause;
    if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
        const failure = new ProviderCleanupError(PLAYWRIGHT_ELECTRON_ACTIVE_PROVIDER_IDENTITY.id, cause.cleanup.resources, { reason: cause.cleanup.reason }, { operation: OPERATION, cause });
        bindArtifactFileCleanup(cause, failure);
        return failure;
    }
    return new ProviderAdapterError(PLAYWRIGHT_ELECTRON_ACTIVE_PROVIDER_IDENTITY.id, OPERATION, {
        cause,
        diagnostics: {
            message: errorMessage(cause),
        },
    });
};
