import { ProcessAdmissionError } from "../ProcessAdmissionError.js";
import { HOST_PLATFORM } from "../../platform/HostPlatform.js";
import { parseProcessCapture } from "../../domain/process/processCaptureParsing.js";
import { err, ok } from "../../domain/result.js";
import { AnalysisCapabilityUnavailableError } from "../../domain/analysisErrorCore.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { createProcessTerminalFinalizer, retainTerminalObservationFailure, } from "./ProcessTerminalObservation.js";
import { analysisErrorWithCleanupDependencies } from "../../domain/analysisErrorCleanup.js";
import { captureInspectionFailures, describeProcessCaptureExecutionFailure, ProcessCaptureError, ProcessCaptureInspectionFailure, retainCaptureInspectionCancellations, normalizeCaptureFailure, processCaptureCancelled, } from "./ProcessCaptureError.js";
import { startProcessSampler } from "./ProcessSampling.js";
import { AbortedWait, waitForAbortable } from "../AbortablePromise.js";
import { snapshotRoots, ProcessCaptureSnapshotFailure, } from "./FilesystemSnapshot.js";
import { TerminalRenderer } from "./TerminalRenderer.js";
import { createProcessSensitiveOutput } from "./ProcessSensitiveOutput.js";
import { createBoundedProcessTextNormalizer, createProcessIdentifierLookup, } from "./ProcessNormalization.js";
import { selectCapturedProcessGroupIds } from "../ProcessOwnershipProcessTree.js";
import { awaitTerminalExit, buildCaptureResult, cleanupReportFailure, captureTerminalFrames, createProcessCaptureObservationBuffer, createRunManifest, observeLaunchedExecutable, observeSelectedExecutable, observeSettlement, prepareProcessCapture, resolveProcessResult, processCaptureCleanupFacts, settleProcessCaptureJournal, describeUnverifiedCause, ProcessCaptureResourceScope, captureExitObservation, } from "./ProcessCaptureLifecycle.js";
import { assertNotCancelled, resolveProcessScenarioRuntimePaths, } from "./ProcessScenarioRuntimeValidation.js";
import { createProcessCaptureJournal, scheduleScenarioInteractions, } from "./ProcessCaptureJournal.js";
import { makeProcessCaptureEnvironment } from "./ProcessCaptureEnvironment.js";
import { classifyFilesystemEffects } from "./ProcessFilesystemEffects.js";
import { processCaptureOwnershipUnavailableReason } from "./ProcessCaptureCapability.js";
import { createProcessCaptureProgressTracker, } from "./ProcessCaptureProgress.js";
import { ProcessOwnershipEvidenceOwner } from "../ProcessOwnershipEvidence.js";
import { observeProcessStartIdentity, signalProcessWithStartIdentity, } from "../ProcessOwnershipObservation.js";
import { monotonicProcessCaptureClock } from "./ProcessCaptureClock.js";
/**
 * Read the captured root's start identity once at launch, bound to its run
 * token. Finalization signals and the capture's root process fact both use
 * this one observation; nothing re-reads it later.
 */
export const retainRootIdentity = (pid, runId, observe = (rootPid) => observeProcessStartIdentity(rootPid, undefined, runId)) => observe(pid).then((observation) => observation === undefined
    ? { state: "gone" }
    : observation.state === "readable"
        ? { state: "identity", identity: observation.identity }
        : {
            state: "unverified",
            reason: observation.reason.trim() === ""
                ? "start identity is unavailable without a diagnostic"
                : observation.reason,
        }, (cause) => {
    const [inspectionFailure] = captureInspectionFailures(normalizeCaptureFailure(cause));
    return {
        state: "unverified",
        reason: describeUnverifiedCause(cause, "start identity inspection failed without a message"),
        ...(inspectionFailure === undefined ? {} : { inspectionFailure }),
    };
});
/**
 * Signal the captured root only while its retained launch identity still
 * matches. A delivery whose identity check fails through the inspection owner
 * is recorded as unverified, and the signaller keeps that failure until
 * `settled` hands it to the run, so its descriptors stay owned for cleanup.
 */
export const retainRootSignaller = (pid, retained, signalProcess = signalProcessWithStartIdentity) => {
    const deliveries = new Set();
    const inspectionFailures = [];
    const deliver = async (signal) => {
        const identity = await retained;
        if (identity.state === "unverified")
            return { delivery: "unverified", reason: identity.reason };
        if (identity.state === "gone")
            return { delivery: "gone" };
        try {
            const delivery = await signalProcess(pid, identity.identity, signal);
            return delivery === "unverified"
                ? {
                    delivery,
                    reason: "start identity could not be verified or the signal call failed",
                }
                : { delivery };
        }
        catch (cause) {
            inspectionFailures.push(...captureInspectionFailures(normalizeCaptureFailure(cause)));
            return {
                delivery: "unverified",
                reason: describeUnverifiedCause(cause, "signal delivery failed without a message"),
            };
        }
    };
    return {
        signal: (signal) => {
            const delivery = deliver(signal);
            deliveries.add(delivery);
            void delivery.finally(() => deliveries.delete(delivery));
            return delivery;
        },
        settled: async () => {
            while (deliveries.size > 0)
                await Promise.allSettled(deliveries);
            return inspectionFailures.splice(0);
        },
    };
};
/**
 * The capture's root process fact: the PID with its retained launch
 * identity, withheld when the caller selected PID normalization, or unknown
 * with the reason. A PID without its start identity is not an identity.
 */
export const capturedRootProcess = (pid, identity, pidsNormalized) => pidsNormalized
    ? { state: "withheld-by-caller" }
    : identity.state === "identity"
        ? { state: "observed", pid, start_time: identity.identity }
        : {
            state: "unknown",
            reason: identity.state === "gone"
                ? "the root process exited before its start identity was read"
                : identity.reason,
        };
const cleanupFailedStartup = async (options) => {
    const sampledProcessGroupIds = options.terminal !== undefined &&
        options.observations?.process_samples.state === "available"
        ? selectCapturedProcessGroupIds(options.terminal.pid, options.observations.process_samples.value).filter((groupId) => groupId !== options.terminal?.pid)
        : undefined;
    const cleanupOptions = {
        timers: options.timers,
        terminal: options.terminal,
        renderer: options.terminalObservation ?? options.renderer,
        runId: options.runId,
        captureBaseline: options.captureBaseline,
        ownershipEvidence: options.ownershipEvidence,
        inspectionFailures: [...options.inspectionFailures],
        ...(sampledProcessGroupIds === undefined ? {} : { sampledProcessGroupIds }),
        temporaryRoot: options.temporaryRoot,
        ...(options.cleanupHost === undefined ? {} : { host: options.cleanupHost }),
    };
    const cleanupOutcome = await options.resourceScope.release(cleanupOptions);
    let cause = options.cause;
    if (options.terminalObservation !== undefined) {
        const terminal = await options.terminalObservation.complete();
        if (!terminal.ok)
            cause = retainTerminalObservationFailure(cause, terminal.error);
    }
    const cleanupFailure = cleanupReportFailure(cleanupOutcome.report);
    if (cleanupFailure !== undefined) {
        resolveProcessResult(undefined, cause, cleanupOutcome, options.observations, {
            scenario: options.scenario,
            ...(options.terminal === undefined
                ? {}
                : { rootPid: options.terminal.pid }),
        });
    }
    throw cause;
};
const createTerminalRenderer = (scenario, normalizeText, recordEvent) => new TerminalRenderer({
    columns: scenario.terminal.columns,
    rows: scenario.terminal.rows,
    scrollback: scenario.terminal.scrollback,
    maxBytes: scenario.limits.output_bytes,
    normalize: normalizeText,
    recordEvent,
});
const startCaptureRuntime = async (options) => {
    const { scenario } = options;
    const { ownershipEvidence } = options;
    let renderer;
    let terminal;
    let terminalObservation;
    let stopSampler;
    let rootIdentity;
    try {
        const privacy = createProcessSensitiveOutput(scenario);
        if (!privacy.ok)
            throw privacy.error;
        const sensitiveOutput = privacy.value;
        const { spawn } = await import("@lydell/node-pty");
        const selectedExecutable = await observeSelectedExecutable(scenario.executable, options.signal, undefined, options.resourceScope);
        const startedAt = new Date();
        const started = monotonicProcessCaptureClock();
        let lastOutput = started;
        const identifiers = createProcessIdentifierLookup(options.samples, () => terminal?.pid ?? -1);
        const normalizeText = createBoundedProcessTextNormalizer(scenario, options.temporaryRoot, identifiers);
        renderer = createTerminalRenderer(scenario, sensitiveOutput === undefined
            ? normalizeText
            : (value, maxBytes) => {
                const normalized = normalizeText(value, maxBytes);
                if (normalized.state === "over_budget")
                    return normalized;
                const safe = sensitiveOutput.project([normalized.value]);
                if (!safe.ok)
                    throw safe.error;
                const text = safe.value[0] ?? "";
                return {
                    ...normalized,
                    value: text,
                    utf8Bytes: Buffer.byteLength(text),
                };
            }, options.recordEvent);
        // Completed executable facts do not authorize launch after cancellation
        // during the sampler's final metadata read or descriptor cleanup.
        assertNotCancelled(options.signal);
        terminal = spawn(scenario.executable, [...scenario.arguments], {
            cwd: scenario.working_directory,
            env: makeProcessCaptureEnvironment(options),
            cols: scenario.terminal.columns,
            rows: scenario.terminal.rows,
            name: "xterm-256color",
        });
        options.onSpawn(terminal.pid);
        options.observationBuffer.target_pid = {
            state: "available",
            value: scenario.normalization.pids ? 1 : terminal.pid,
        };
        const executableIdentity = observeLaunchedExecutable(scenario.executable, selectedExecutable);
        const terminalRetention = captureTerminalFrames({
            ...options,
            terminal,
            started,
            onOutput: () => (lastOutput = monotonicProcessCaptureClock()),
            renderer,
            normalizeText,
            identifiers,
            ...(sensitiveOutput === undefined
                ? {}
                : {
                    sensitiveOutput,
                    onSensitiveOutputFailure: () => {
                        options.observationBuffer.frames = {
                            state: "unavailable",
                            reason: "Sensitive terminal projection failed; terminal text was withheld.",
                        };
                    },
                }),
        });
        terminalObservation = createProcessTerminalFinalizer(renderer, terminalRetention, options.observationBuffer);
        scheduleScenarioInteractions({
            ...options,
            getTerminal: () => terminal,
            renderer,
            started,
        });
        rootIdentity = retainRootIdentity(terminal.pid, options.runId, options.finalizationHost?.observe);
        stopSampler = startProcessSampler({
            rootPid: terminal.pid,
            runId: options.runId,
            platform: options.hostPlatform,
            started,
            limit: scenario.limits.processes,
            samples: options.samples,
            recordEvent: options.recordEvent,
            resourceScope: options.resourceScope,
        });
        return {
            renderer,
            terminal,
            ownershipEvidence,
            started,
            startedAt,
            executableIdentity,
            lastOutput: () => lastOutput,
            terminalObservation,
            stopSampler,
            rootIdentity,
            rootSignaller: retainRootSignaller(terminal.pid, rootIdentity, options.finalizationHost?.signal),
        };
    }
    catch (cause) {
        for (const timer of options.timers)
            timer.cancel();
        let failure = retainRunInspectionFailures(cause, options.resourceScope, options.inspectionFailures);
        try {
            await stopSampler?.();
        }
        catch (samplingCause) {
            failure = retainSecondaryInspectionFailure(failure, samplingCause, options.resourceScope, options.inspectionFailures);
        }
        failure = retainRootIdentityFailure(failure, await rootIdentity, options.resourceScope, options.inspectionFailures);
        return cleanupFailedStartup({
            cause: failure,
            timers: options.timers,
            terminal,
            renderer,
            terminalObservation,
            runId: options.runId,
            captureBaseline: options.ownershipBaseline,
            ownershipEvidence,
            scenario,
            ...(options.cleanupHost === undefined
                ? {}
                : { cleanupHost: options.cleanupHost }),
            observations: options.observationBuffer,
            temporaryRoot: options.temporaryRoot,
            resourceScope: options.resourceScope,
            inspectionFailures: options.inspectionFailures,
        });
    }
};
/** Adopt only this run's parsed leaf vector, including settled sampling peers. */
const retainRunInspectionFailures = (cause, resources, inspections) => {
    const failure = normalizeCaptureFailure(cause);
    for (const inspection of captureInspectionFailures(failure)) {
        resources.retainInspectionFailure(inspection);
        inspections.add(inspection);
    }
    return failure;
};
/**
 * A failed launch identity read through the inspection owner fails the
 * capture like a sampler read: its descriptors stay owned for cleanup.
 */
const retainRootIdentityFailure = (primary, identity, resources, inspections) => identity?.state === "unverified" && identity.inspectionFailure !== undefined
    ? retainSecondaryInspectionFailure(primary, identity.inspectionFailure, resources, inspections)
    : primary;
/**
 * A sampler's, identity read's or signal delivery's final rejection cannot
 * skip cleanup or replace an earlier physical failure.
 */
const retainSecondaryInspectionFailure = (primary, cause, resources, inspections) => {
    const failure = retainRunInspectionFailures(cause, resources, inspections);
    if (failure instanceof AnalysisError)
        for (const inspection of captureInspectionFailures(failure))
            retainCaptureInspectionCancellations(failure, inspection);
    if (primary === undefined || primary === failure)
        return failure;
    const error = primary instanceof AnalysisError
        ? primary
        : new ProcessCaptureError("process capture failed", { cause: primary });
    const secondary = failure instanceof AnalysisError
        ? failure
        : new ProcessCaptureError("process sampling failed", { cause: failure });
    for (const inspection of captureInspectionFailures(failure))
        retainCaptureInspectionCancellations(error, inspection);
    if (error.secondaryFailures.includes(secondary))
        return error;
    if (secondary.cleanupIncomplete)
        return analysisErrorWithCleanupDependencies(error, secondary, "capture_process").retainSecondaryFailure(secondary);
    return error.retainSecondaryFailure(secondary);
};
const finishProcessRun = async (options) => {
    options.progress.closeLive();
    for (const timer of options.timers)
        timer.cancel();
    let { capture, executionFailure } = options;
    try {
        await options.stopSampler();
    }
    catch (cause) {
        executionFailure = retainSecondaryInspectionFailure(executionFailure, cause, options.resourceScope, options.inspectionFailures);
    }
    // Join the launch identity read on every exit; it never rejects and, like
    // other cleanup reads, runs without the caller's signal so it can finish.
    executionFailure = retainRootIdentityFailure(executionFailure, await options.runtime?.rootIdentity, options.resourceScope, options.inspectionFailures);
    // Join finalization deliveries the same way: an identity check that failed
    // through the inspection owner fails the capture and keeps its descriptors.
    for (const inspection of (await options.runtime?.rootSignaller.settled()) ??
        [])
        executionFailure = retainSecondaryInspectionFailure(executionFailure, inspection, options.resourceScope, options.inspectionFailures);
    const sampledProcessGroupIds = options.runtime === undefined
        ? undefined
        : selectCapturedProcessGroupIds(options.runtime.terminal.pid, options.samples).filter((groupId) => groupId !== options.runtime?.terminal.pid);
    const cleanupOptions = {
        timers: options.timers,
        terminal: options.runtime?.terminal,
        renderer: options.runtime?.terminalObservation,
        runId: options.runId,
        captureBaseline: options.captureBaseline,
        ownershipEvidence: options.ownershipEvidence,
        inspectionFailures: [...options.inspectionFailures],
        ...(sampledProcessGroupIds === undefined ? {} : { sampledProcessGroupIds }),
        temporaryRoot: options.temporaryRoot,
        ...(options.cleanupHost === undefined ? {} : { host: options.cleanupHost }),
    };
    const cleanupOutcome = await options.resourceScope.release(cleanupOptions);
    if (options.runtime !== undefined && capture === undefined) {
        const terminal = await options.runtime.terminalObservation.complete();
        if (!terminal.ok)
            executionFailure = retainTerminalObservationFailure(executionFailure, terminal.error);
    }
    const cleanup = cleanupOutcome.report;
    if (executionFailure === undefined && options.signal?.aborted)
        executionFailure = processCaptureCancelled(options.signal.reason);
    const observedExit = options.observations?.exit.state === "available"
        ? options.observations.exit.value.reason
        : options.capture?.exit.reason;
    await options.progress.report({
        phase: "cleanup",
        counts: options.progressCounts(),
        terminal: true,
        disposition: captureProgressDisposition(observedExit, executionFailure),
        cleanup,
    });
    const cleanupFailure = cleanupReportFailure(cleanup);
    let verifiedCapture;
    if (capture !== undefined && cleanupFailure === undefined) {
        const completedCapture = {
            ...capture,
            ...processCaptureCleanupFacts(capture, {
                ownedProcessesSignaled: cleanupOutcome.ownedProcessesSignaled,
            }),
            cleanup: {
                owned_process_group: "verified",
                temporary_root: "removed",
            },
        };
        try {
            verifiedCapture = parseProcessCapture(completedCapture);
        }
        catch (cause) {
            executionFailure = new ProcessCaptureError(`process capture validation failed${cause instanceof Error ? `: ${cause.message}` : ""}`, { cause });
        }
    }
    const rootPid = options.runtime?.terminal.pid ?? options.rootPid;
    const partialContext = rootPid === undefined
        ? { scenario: options.scenario }
        : { scenario: options.scenario, rootPid };
    // Cancellation remains authoritative until finalization has settled, even
    // when the workload exited normally before cleanup began.
    if (executionFailure === undefined && options.signal?.aborted)
        executionFailure = processCaptureCancelled(options.signal.reason);
    return resolveProcessResult(cleanupFailure === undefined ? verifiedCapture : capture, executionFailure, cleanupOutcome, options.observations, partialContext);
};
const completeCapture = async (options) => {
    const unavailableReason = (stage, cause) => `${stage} failed: ${cause instanceof Error ? cause.message : "unknown failure"}`;
    const { runtime, scenario } = options;
    const { reason } = options.exit;
    if (reason === "cancelled")
        throw processCaptureCancelled(options.signal?.reason);
    let settlement;
    try {
        settlement = await observeSettlement({
            runId: options.runId,
            processGroupIds: selectCapturedProcessGroupIds(runtime.terminal.pid, options.samples),
            ownershipEvidence: runtime.ownershipEvidence,
            settleMs: scenario.settle_ms,
            recordEvent: options.recordEvent,
            platform: options.hostPlatform,
            signal: options.signal,
            onLiveProgress: options.onLiveProgress,
        });
    }
    catch (cause) {
        options.observationBuffer.settlement = {
            state: "unavailable",
            reason: unavailableReason("Process settlement observation", cause),
        };
        throw cause;
    }
    options.observationBuffer.settlement = {
        state: "available",
        value: settlement,
    };
    for (const timer of options.timers)
        timer.cancel();
    const sampling = await runtime.stopSampler();
    const samplingPartial = sampling.partial;
    await settleProcessCaptureJournal(options.eventJournal);
    assertNotCancelled(options.signal);
    let after;
    try {
        after = await options.captureSnapshot(scenario, options.signal, options.before, {
            cleanup: options.resourceScope,
            observerPaths: [options.temporaryRoot],
        });
    }
    catch (cause) {
        if (cause instanceof ProcessCaptureSnapshotFailure)
            for (const lease of cause.cleanupLeases)
                options.resourceScope.retain(lease);
        options.observationBuffer.filesystem_snapshots = {
            ...options.observationBuffer.filesystem_snapshots,
            after: cause instanceof ProcessCaptureSnapshotFailure &&
                cause.snapshot !== undefined
                ? { state: "available", value: cause.snapshot }
                : {
                    state: "unavailable",
                    reason: unavailableReason("Final filesystem snapshot", cause),
                },
        };
        throw cause instanceof ProcessCaptureSnapshotFailure
            ? cause.failureForCaller()
            : cause;
    }
    options.observationBuffer.filesystem_snapshots = {
        ...options.observationBuffer.filesystem_snapshots,
        after: {
            state: "available",
            value: after,
        },
    };
    options.recordEvent("filesystem_checkpoints", 1);
    const terminal = await runtime.terminalObservation.complete();
    if (!terminal.ok)
        throw terminal.error;
    const { renderedFrames, retention } = terminal.value;
    const checkpoints = [
        {
            name: "before",
            at_ms: 0,
            files: options.before.files,
            effects: [],
            truncated: options.before.truncated,
        },
        {
            name: "after_settlement",
            at_ms: Math.max(0, monotonicProcessCaptureClock() - runtime.started),
            files: after.files,
            effects: classifyFilesystemEffects(options.before, after),
            truncated: after.truncated,
        },
    ];
    // The launch identity read keeps running unsignalled for finalization
    // signals; only this wait observes cancellation. finishProcessRun joins it.
    const rootIdentity = await waitForAbortable(runtime.rootIdentity, options.signal);
    if (rootIdentity instanceof AbortedWait)
        throw processCaptureCancelled(rootIdentity.carried);
    let manifest;
    try {
        manifest = await createRunManifest(scenario, runtime.startedAt, new Date(), runtime.executableIdentity, capturedRootProcess(runtime.terminal.pid, rootIdentity, scenario.normalization.pids), {
            platform: options.hostPlatform,
            architecture: HOST_PLATFORM.architecture,
        });
    }
    catch (cause) {
        options.observationBuffer.manifest = {
            state: "unavailable",
            reason: unavailableReason("Capture manifest creation", cause),
        };
        throw cause;
    }
    options.observationBuffer.manifest = { state: "available", value: manifest };
    return buildCaptureResult({
        frames: options.frames,
        exit: { ...options.exit, reason },
        samples: options.samples,
        before: options.before,
        after,
        truncationDetails: {
            ...retention,
            rendered_terminal: runtime.renderer.retention(),
            filesystem_before: options.before.coverage,
            filesystem_after: after.coverage,
            process: sampling.coverage,
        },
        scenario,
        rootPid: runtime.terminal.pid,
        samplingPartial,
        renderedFrames,
        interactions: options.interactions,
        checkpoints,
        settlement,
        manifest,
        eventJournal: options.eventJournal,
    });
};
const captureProgressDisposition = (exitReason, executionFailure) => {
    if (exitReason === "exited" ||
        exitReason === "timeout" ||
        exitReason === "idle_timeout" ||
        exitReason === "cancelled")
        return exitReason;
    if (executionFailure instanceof ProcessCaptureError &&
        executionFailure.reason === "cancelled")
        return "cancelled";
    return "failed";
};
/** Execute one caller-selected scenario and return bounded observations. */
const runProcessScenario = async (resourceScope, scenario, signal, hostEnvironment, hostPlatform, captureSnapshot, cleanupHost, progress, finalizationHost) => {
    const progressTracker = createProcessCaptureProgressTracker(progress);
    const frames = [];
    const samples = [];
    const interactions = [];
    const progressCounts = () => ({
        frames: frames.length,
        samples: samples.length,
        interactions: interactions.length,
    });
    const reportRunning = () => {
        void progressTracker.report({ phase: "running", counts: progressCounts() });
    };
    const reportSettling = () => {
        void progressTracker.report({
            phase: "settling",
            counts: progressCounts(),
        });
    };
    let prepared;
    try {
        await progressTracker.report({
            phase: "prepare",
            counts: progressCounts(),
        });
        prepared = await prepareProcessCapture(scenario, signal, captureSnapshot, undefined, resourceScope);
    }
    catch (cause) {
        progressTracker.closeLive();
        await progressTracker.report({
            phase: "cleanup",
            counts: progressCounts(),
            terminal: true,
            disposition: captureProgressDisposition(undefined, cause),
            ...(cause instanceof ProcessCaptureError &&
                cause.cleanupReport !== undefined
                ? { cleanup: cause.cleanupReport }
                : {}),
        });
        throw cause;
    }
    const { temporaryRoot, runId, ownershipBaseline, before } = prepared;
    const ownershipEvidence = new ProcessOwnershipEvidenceOwner();
    const inspectionFailures = new Set();
    const journal = createProcessCaptureJournal();
    const { entries: eventJournal, recordEvent } = journal;
    recordEvent("filesystem_checkpoints", 0);
    const observations = createProcessCaptureObservationBuffer({
        frames,
        interactions,
        samples,
        eventJournal,
        before,
        finalizationEnabled: scenario.finalization_ms > 0,
    });
    let runtime;
    let actualRootPid;
    const timers = new Set();
    let capture;
    let executionFailure;
    let stopSampler = async () => ({ partial: false });
    const dispatchedEventIndexes = new Set();
    try {
        runtime = await startCaptureRuntime({
            scenario,
            hostEnvironment,
            hostPlatform,
            temporaryRoot,
            runId,
            ownershipBaseline,
            ownershipEvidence,
            ...(cleanupHost === undefined ? {} : { cleanupHost }),
            resourceScope,
            inspectionFailures,
            observationBuffer: observations,
            onSpawn: (pid) => {
                actualRootPid = pid;
            },
            frames,
            samples,
            interactions,
            timers,
            dispatchedEventIndexes,
            recordEvent,
            ...(signal === undefined ? {} : { signal }),
            ...(finalizationHost === undefined ? {} : { finalizationHost }),
        });
        stopSampler = runtime.stopSampler;
        const exit = await awaitTerminalExit({
            terminal: runtime.terminal,
            scenario,
            started: runtime.started,
            lastOutput: runtime.lastOutput,
            signal,
            signalTarget: runtime.rootSignaller.signal,
            recordFinalization: (finalization) => {
                observations.finalization = { state: "available", value: finalization };
            },
            timers,
            interactions,
            dispatchedEventIndexes,
            recordEvent,
            ...(progress === undefined ? {} : { onLiveProgress: reportRunning }),
        });
        if (exit.unobserved === true) {
            observations.finalization = {
                state: "available",
                value: exit.finalization,
            };
            observations.exit = {
                state: "unavailable",
                reason: `The captured process exit was not observed because the finalization SIGKILL could not be delivered (initiating reason: ${exit.reason}).`,
            };
            if (exit.reason === "cancelled")
                throw processCaptureCancelled(signal?.reason);
            throw new ProcessAdmissionError("finalization_unobserved");
        }
        if (exit.finalization !== undefined)
            observations.finalization = {
                state: "available",
                value: exit.finalization,
            };
        observations.exit = {
            state: "available",
            value: captureExitObservation(exit),
        };
        capture = await completeCapture({
            timers,
            scenario,
            hostPlatform,
            runtime,
            runId,
            temporaryRoot,
            before,
            frames,
            samples,
            interactions,
            exit,
            eventJournal,
            observationBuffer: observations,
            recordEvent,
            captureSnapshot,
            resourceScope,
            ...(signal === undefined ? {} : { signal }),
            ...(progress === undefined ? {} : { onLiveProgress: reportSettling }),
        });
    }
    catch (cause) {
        executionFailure = retainRunInspectionFailures(cause, resourceScope, inspectionFailures);
    }
    return finishProcessRun({
        runtime,
        timers,
        runId,
        captureBaseline: ownershipBaseline,
        ownershipEvidence,
        ...(cleanupHost === undefined ? {} : { cleanupHost }),
        temporaryRoot,
        scenario,
        samples,
        stopSampler,
        capture,
        executionFailure,
        observations,
        ...(actualRootPid === undefined ? {} : { rootPid: actualRootPid }),
        progress: progressTracker,
        progressCounts,
        resourceScope,
        inspectionFailures,
        ...(signal === undefined ? {} : { signal }),
    });
};
/** Execute one scenario through a typed expected-failure channel. */
export const captureProcessScenario = async (scenario, signal, platform, environment = process.env, captureSnapshot, cleanupHost, progress, resourceScope, finalizationHost) => {
    const ownershipReason = processCaptureOwnershipUnavailableReason(platform);
    if (ownershipReason !== undefined)
        return err(new AnalysisCapabilityUnavailableError("rea-process", "capture_process_scenario", ownershipReason, { userMessage: ownershipReason }));
    const runResourceScope = resourceScope ?? new ProcessCaptureResourceScope();
    const execute = async () => {
        try {
            assertNotCancelled(signal);
            const resolvedScenario = await resolveProcessScenarioRuntimePaths(scenario, environment, platform);
            const capture = await runProcessScenario(runResourceScope, resolvedScenario, signal, environment, platform, captureSnapshot ?? snapshotRoots, cleanupHost, progress, finalizationHost);
            return ok(capture);
        }
        catch (cause) {
            const failure = normalizeCaptureFailure(cause);
            runResourceScope.retainInspectionFailure(failure);
            const executionFailureReason = describeProcessCaptureExecutionFailure(cause);
            return err(failure instanceof AnalysisError
                ? failure
                : new ProcessCaptureError("process capture failed", {
                    cause,
                    ...(executionFailureReason === undefined
                        ? {}
                        : { executionFailure: executionFailureReason }),
                }));
        }
    };
    if (resourceScope !== undefined) {
        try {
            return await resourceScope.run(execute);
        }
        catch (cause) {
            const failure = normalizeCaptureFailure(cause);
            runResourceScope.retainInspectionFailure(failure);
            const executionFailure = describeProcessCaptureExecutionFailure(cause);
            return err(failure instanceof AnalysisError
                ? failure
                : new ProcessCaptureError("process capture lifecycle failed", {
                    cause,
                    reason: "cleanup_incomplete",
                    cleanup: {
                        reason: "process capture lifecycle failed",
                        resources: ["process_capture_lifecycle"],
                    },
                    ...(executionFailure === undefined ? {} : { executionFailure }),
                }));
        }
    }
    const capture = await runResourceScope.run(execute);
    try {
        await runResourceScope.close();
    }
    catch (cause) {
        if (!(cause instanceof AnalysisError))
            throw cause;
        return err(capture.ok
            ? cause
            : capture.error instanceof ProcessCaptureError
                ? capture.error.withFinalization({ cleanupFailure: cause })
                : analysisErrorWithCleanupDependencies(capture.error, cause, "capture_process_scenario"));
    }
    return capture;
};
