import { WEB_SOURCE_MAP_LIMITS, sourceMapLimitSelection, sourceMapLimitRecovery, } from "../../domain/sourceMapLimits.js";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { AnalysisCleanupRelease } from "../../domain/analysisCleanupRelease.js";
import { analysisErrorWithCleanupFailure } from "../../domain/analysisErrorCleanup.js";
import { analysisErrorWithCancellation } from "../../domain/analysisErrorCancellation.js";
import { AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, cancelledBy, carriedReason, } from "../../domain/analysisErrorCore.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
import { err, ok } from "../../domain/result.js";
import { DEFAULT_WEB_SOURCE_MAP_DECODE_TIMEOUT_MS, webSourceMapDecodeTimeoutRecovery, } from "../../domain/webSourceLocation.js";
import { parseSourceMapReply } from "./SourceMapReply.js";
import { PrivateRuntimeRoot } from "../../process/PrivateRuntimeRoot.js";
import { DarwinProcessOwnershipInspectionError } from "../../process/DarwinProcessRunTokenReader.js";
import { isProcessOwnershipInspectionCancellation } from "../../process/ProcessInspectionCancellation.js";
import { RuntimeControlUnavailableError, runtimeControlCapabilityError, } from "../../domain/runtimeControlUnavailableError.js";
import { ProviderStartupDeadline } from "../../process/ProviderDeadline.js";
import { javaScriptWorkerMemoryLimitBytes } from "../../process/JavaScriptWorkerMemoryLimit.js";
import { cleanupOwnedProcessGroup } from "../../process/ProcessOwnership.js";
import { ProviderProcessSupervisor, spawnOwnedProviderProcess, } from "../../process/ProviderProcess.js";
import { prepareProcessOwnershipInspection } from "../../process/ProcessOwnershipObservation.js";
import { capturedProviderOutput } from "../../process/capturedProviderOutput.js";
import { classifyProviderFailure, } from "../../providers/classifyProviderFailure.js";
import { errorMessage } from "../../kernel/errorMessage.js";
const OPERATION = "trace_web_source_location";
const PROVIDER = "source-map-decoder";
export class SourceMapCleanupFailure extends ProviderCleanupError {
    constructor(resources, diagnostics) {
        super(PROVIDER, resources, diagnostics, { operation: OPERATION });
    }
}
/** Interpret a trusted codec reply, then release its process and private root. */
export const runSourceMapCommand = async (request, path, options, dependencies, retainedCleanup, decodeTimeoutMs = DEFAULT_WEB_SOURCE_MAP_DECODE_TIMEOUT_MS, limits = WEB_SOURCE_MAP_LIMITS) => {
    try {
        await (dependencies.prepareOwnership ?? prepareProcessOwnershipInspection)(options?.signal);
    }
    catch (cause) {
        const signal = options?.signal;
        const preparation = cause instanceof DarwinProcessOwnershipInspectionError
            ? cause
            : undefined;
        const cancellation = isProcessOwnershipInspectionCancellation(cause)
            ? cause
            : preparation?.cancellation;
        const failure = cancellation !== undefined
            ? cancelledBy(OPERATION, carriedReason(cancellation.reason))
            : cause instanceof AnalysisError
                ? cause
                : new ProviderAdapterError(PROVIDER, OPERATION, {
                    cause,
                    ...(preparation?.capturedOutput === undefined
                        ? {}
                        : { capturedOutput: preparation.capturedOutput }),
                    diagnostics: {
                        map_path: path,
                        error_message: errorMessage(cause),
                        phase: "process_ownership_preparation",
                    },
                });
        const primary = signal?.aborted
            ? analysisErrorWithCancellation(failure, cancelledBy(OPERATION, signal))
            : failure;
        if (preparation?.cleanupFailure === undefined)
            return err(primary);
        const owner = new PreparationCleanup(preparation, path);
        retainedCleanup.owner = owner;
        return err(analysisErrorWithCleanupFailure(primary, preparation.cleanupFailure, OPERATION).bindCleanupDependencies([preparation.cleanupFailure], owner));
    }
    const deadline = new ProviderStartupDeadline(decodeTimeoutMs, options?.signal);
    const command = new OwnedCodec(path, dependencies, deadline, decodeTimeoutMs, limits);
    let result;
    try {
        const started = await command.start(request);
        result = started.ok
            ? parseSourceMapReply(await command.collect(), path, javaScriptWorkerMemoryLimitBytes(limits.codecHeapMiB), limits.codecHeapMiB)
            : started;
    }
    catch (cause) {
        result = err(command.failure(cause));
    }
    finally {
        command.dispose();
        deadline.dispose();
    }
    const cleanup = await command.close();
    const observation = result.ok ? result.value : undefined;
    const completed = options?.signal?.aborted
        ? err(analysisErrorWithCancellation(result.ok ? undefined : result.error, cancelledBy(OPERATION, options.signal, {
            partialObservation: observation,
        })))
        : result;
    if (cleanup === undefined)
        return completed;
    if (observation !== undefined)
        cleanup.retainPartialObservation(observation);
    retainedCleanup.owner = command;
    return completed.ok
        ? err(cleanup)
        : err(analysisErrorWithCleanupFailure(completed.error, cleanup, OPERATION).bindCleanupDependencies([cleanup], command));
};
/** Keep the exact Darwin helper owner available after failed preparation cleanup. */
class PreparationCleanup {
    preparation;
    path;
    constructor(preparation, path) {
        this.preparation = preparation;
        this.path = path;
    }
    get cleanupResources() {
        return this.preparation.cleanupFailure?.cleanupResources ?? [];
    }
    async close() {
        const cleanup = this.preparation.cleanupFailure;
        if (cleanup === undefined || !cleanup.cleanupIncomplete)
            return undefined;
        try {
            if (this.preparation.cleanupOwner !== undefined)
                await this.preparation.cleanupOwner.close();
        }
        catch (cause) {
            return new SourceMapCleanupFailure(cleanup.cleanupResources, {
                map_path: this.path,
                cleanup_failures: [errorMessage(cause)],
            }).bindCleanupDependencies([cleanup], this);
        }
        return cleanup.cleanupIncomplete
            ? new SourceMapCleanupFailure(cleanup.cleanupResources, {
                map_path: this.path,
                cleanup_failures: [
                    "Ownership preparation cleanup remains incomplete",
                ],
            }).bindCleanupDependencies([cleanup], this)
            : undefined;
    }
}
class OwnedCodec {
    path;
    dependencies;
    deadline;
    decodeTimeoutMs;
    limits;
    #runId = `rea-source-map-${randomUUID()}`;
    #runtime;
    #supervisor;
    /** Reported by every close failure until a later close releases the codec. */
    #cleanupRelease;
    #outcome;
    #drainStop;
    #onInterruption;
    constructor(path, dependencies, deadline, decodeTimeoutMs, limits) {
        this.path = path;
        this.dependencies = dependencies;
        this.deadline = deadline;
        this.decodeTimeoutMs = decodeTimeoutMs;
        this.limits = limits;
        this.#onInterruption = () => this.#observeInterruption();
        if (deadline.signal.aborted)
            this.#observeInterruption();
        else
            deadline.signal.addEventListener("abort", this.#onInterruption, {
                once: true,
            });
    }
    /** Stop recording event order after an outcome has been selected. */
    dispose() {
        this.deadline.signal.removeEventListener("abort", this.#onInterruption);
    }
    async start(request) {
        this.check();
        this.#runtime = await (this.dependencies.createRuntime ??
            (() => PrivateRuntimeRoot.create({ prefix: "rea-source-map-" })))();
        this.check();
        const requestPath = join(this.#runtime.path, "request.json");
        await writeFile(requestPath, request, {
            flag: "wx",
            mode: 0o600,
            signal: this.deadline.signal,
        });
        this.check();
        const environment = {
            ...(this.dependencies.environment ?? process.env),
            UV_THREADPOOL_SIZE: "1",
        };
        delete environment.NODE_OPTIONS;
        const launchOptions = {
            command: process.execPath,
            arguments: [
                `--max-old-space-size=${String(this.limits.codecHeapMiB)}`,
                "--max-semi-space-size=8",
                "--v8-pool-size=1",
                "--single-threaded",
                "--stack_size=2048",
                fileURLToPath(new URL("./SourceMapCodecProcess.js", import.meta.url)),
                requestPath,
                JSON.stringify(sourceMapLimitSelection(this.limits)),
            ],
            runId: this.#runId,
            cwd: this.#runtime.path,
            hostEnvironment: environment,
            ...(javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB) === null
                ? {}
                : {
                    memoryLimitBytes: javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB),
                }),
            signal: this.deadline.signal,
        };
        let spawned;
        try {
            spawned = await (this.dependencies.launcher ?? spawnOwnedProviderProcess)(launchOptions);
        }
        catch (cause) {
            this.#observeInterruption();
            if (this.#outcome?.kind === "timeout")
                return err(this.failure(cause));
            // Only the process owner can say the rejection was caused by cancellation.
            return err(isProcessOwnershipInspectionCancellation(cause)
                ? cancelledBy(OPERATION, carriedReason(cause.reason))
                : classifyProviderFailure(cause, this.#failureDialect()));
        }
        this.#supervisor = new ProviderProcessSupervisor({
            ...spawned,
            ownsProcessLifetime: true,
            cleanup: spawned.cleanup ??
                (() => cleanupOwnedProcessGroup(spawned.ownership)),
        }, {
            maxDiagnosticBytes: this.limits.outputBytes + 1024 * 1024,
            onDiagnostic: (event) => {
                if (event.type === "exit" &&
                    (event.code !== 0 || event.signal !== null))
                    this.#recordPhysicalFailure({
                        kind: "exit",
                        exit: { code: event.code, signal: event.signal },
                    });
                if (event.type === "error") {
                    this.#recordPhysicalFailure({
                        kind: "process-error",
                        message: event.message,
                        cause: event.cause ?? new Error(event.message),
                    });
                }
                if (event.type === "output" &&
                    (event.truncated === true ||
                        event.totalBytes >
                            (event.stream === "stdout"
                                ? this.limits.outputBytes
                                : 1024 * 1024))) {
                    this.#recordPhysicalFailure({
                        kind: "output-limit",
                        stream: event.stream,
                    });
                }
            },
        });
        return ok(undefined);
    }
    async collect() {
        const supervisor = this.#supervisor;
        if (supervisor === undefined)
            throw new Error("Codec process was not acquired");
        while (!(await supervisor.waitForOutputClose(50))) {
            const outcome = this.#outcome;
            if (outcome?.kind !== "physical" ||
                outcome.observation.kind !== "exit" ||
                this.deadline.signal.aborted ||
                this.#drainStop !== undefined)
                this.check();
        }
        this.check();
        const snapshot = supervisor.snapshot();
        // No partial codec result exists; a reached limit fails the whole trace.
        if (snapshot.memoryLimitReached === true)
            throw this.#memoryLimitFailure(snapshot);
        return snapshot.stdout.text;
    }
    check() {
        this.#observeInterruption();
        const outcome = this.#outcome;
        if (outcome?.kind === "physical")
            throw this.#physicalFailure(outcome.observation);
        if (outcome?.kind === "cancelled")
            throw cancelledBy(OPERATION, carriedReason(outcome.callerReason));
        if (outcome?.kind === "timeout")
            throw new AnalysisTimeoutError(OPERATION, this.decodeTimeoutMs, webSourceMapDecodeTimeoutRecovery(this.decodeTimeoutMs));
    }
    failure(cause) {
        this.#observeInterruption();
        const outcome = this.#outcome;
        if (outcome?.kind === "physical")
            return this.#physicalFailure(outcome.observation);
        if (outcome?.kind === "cancelled")
            return cancelledBy(OPERATION, carriedReason(outcome.callerReason));
        if (outcome?.kind === "timeout")
            return new AnalysisTimeoutError(OPERATION, this.decodeTimeoutMs, webSourceMapDecodeTimeoutRecovery(this.decodeTimeoutMs));
        return classifyProviderFailure(cause, this.#failureDialect());
    }
    #failureDialect() {
        return {
            providerId: PROVIDER,
            operation: OPERATION,
            recognise: (cause) => cause instanceof RuntimeControlUnavailableError
                ? runtimeControlCapabilityError(PROVIDER, OPERATION, cause)
                : undefined,
            unclassified: (cause, details) => new ProviderAdapterError(PROVIDER, OPERATION, {
                ...details,
                cause,
                diagnostics: {
                    map_path: this.path,
                    error_message: errorMessage(cause),
                },
            }),
        };
    }
    #observeInterruption() {
        if (this.#outcome !== undefined)
            return;
        if (!this.deadline.signal.aborted)
            return;
        const interruption = this.deadline.interruption;
        if (interruption === undefined)
            return;
        this.#outcome =
            interruption === "cancelled"
                ? { kind: "cancelled", callerReason: this.deadline.signal.reason }
                : { kind: "timeout" };
    }
    #recordPhysicalFailure(observation) {
        this.#observeInterruption();
        if (this.#outcome === undefined)
            this.#outcome = { kind: "physical", observation };
        else if (observation.kind !== "exit" && this.#drainStop === undefined)
            this.#drainStop = observation;
    }
    #physicalFailure(observation) {
        const snapshot = this.#supervisor?.snapshot();
        if (observation.kind === "exit") {
            if (snapshot?.memoryLimitReached === true)
                return this.#memoryLimitFailure(snapshot);
            return this.#exitFailure(observation.exit, snapshot);
        }
        if (observation.kind === "process-error")
            return this.#processErrorFailure(observation, snapshot);
        return this.#outputLimitFailure(snapshot, observation.stream);
    }
    #exitFailure(exit, snapshot) {
        const outputComplete = this.#supervisor?.observedOutputClose() ?? false;
        const capturedOutput = this.#capturedOutput(snapshot, exit, outputComplete);
        return new ProviderAdapterError(PROVIDER, OPERATION, {
            diagnostics: {
                map_path: this.path,
                exit_code: exit.code,
                signal: exit.signal,
                output_complete: outputComplete,
                stderr: snapshot?.stderr.text ?? "",
                ...(this.#drainStop?.kind === "output-limit"
                    ? { output_limit_reached: true }
                    : {}),
                ...(this.#drainStop?.kind === "process-error"
                    ? { drain_error_message: this.#drainStop.message }
                    : {}),
            },
            ...(capturedOutput === undefined ? {} : { capturedOutput }),
        });
    }
    #processErrorFailure(observation, snapshot) {
        const outputComplete = this.#supervisor?.observedOutputClose() ?? false;
        const capturedOutput = this.#capturedOutput(snapshot, undefined, outputComplete);
        return new ProviderAdapterError(PROVIDER, OPERATION, {
            cause: observation.cause,
            diagnostics: {
                map_path: this.path,
                error_message: observation.message,
                output_complete: outputComplete,
            },
            ...(capturedOutput === undefined ? {} : { capturedOutput }),
        });
    }
    #outputLimitFailure(snapshot, stream) {
        const outputComplete = this.#supervisor?.observedOutputClose() ?? false;
        const capturedOutput = this.#capturedOutput(snapshot, undefined, outputComplete);
        return new AnalysisOutputError(OPERATION, stream === "stdout"
            ? "Codec output exceeds its complete-evidence budget."
            : "Codec diagnostic output exceeds its 1048576-byte allowance.", {
            remediationAction: stream === "stdout"
                ? sourceMapLimitRecovery("output_bytes", this.limits.outputBytes)
                : "The codec stderr diagnostic allowance is fixed at 1048576 bytes; no source_map_limits field raises it. Inspect retained diagnostics before another call.",
            capturedOutput: {
                stdout: capturedOutput?.stdout ?? "",
                stderr: capturedOutput?.stderr ?? "",
                stdout_bytes: capturedOutput?.stdout_bytes ?? 0,
                stderr_bytes: capturedOutput?.stderr_bytes ?? 0,
                truncated: true,
            },
        });
    }
    #capturedOutput(snapshot, exit, outputComplete) {
        if (snapshot === undefined)
            return undefined;
        const captured = capturedProviderOutput(exit === undefined
            ? snapshot
            : { ...snapshot, exitCode: exit.code, signal: exit.signal });
        return {
            ...captured,
            truncated: captured.truncated || !outputComplete,
        };
    }
    #memoryLimitFailure(snapshot) {
        return new AnalysisResourceConstraintError(OPERATION, "memory", `Source-map codec reached its ${javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB) === null ? "" : `${String(javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB))}-byte `}process memory limit for ${this.path}; no partial evidence was returned. ${sourceMapLimitRecovery("codec_heap_mib", this.limits.codecHeapMiB)}`, {
            codec_process_memory_limit_bytes: javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB),
        }, {
            capturedOutput: {
                stdout: "",
                stderr: snapshot.stderr.text,
                truncated: snapshot.diagnosticTruncated === true ||
                    !(this.#supervisor?.observedOutputClose() ?? false),
            },
            remediationAction: sourceMapLimitRecovery("codec_heap_mib", this.limits.codecHeapMiB),
        });
    }
    /** Current ownership, independent of historical cleanup diagnostics. */
    get cleanupResources() {
        return [
            ...(this.#supervisor === undefined ? [] : [this.#runId]),
            ...(this.#runtime === undefined ? [] : [this.#runtime.path]),
        ];
    }
    async close() {
        const failures = [];
        let processReleased = this.#supervisor === undefined;
        if (this.#supervisor !== undefined) {
            const stopped = await this.#supervisor.stop();
            if (stopped.status === "incomplete")
                failures.push(stopped.reason);
            else {
                processReleased = true;
                this.#supervisor = undefined;
            }
        }
        if (processReleased && this.#runtime !== undefined) {
            try {
                await this.#runtime.close();
                this.#runtime = undefined;
            }
            catch (cause) {
                failures.push(errorMessage(cause));
            }
        }
        if (failures.length === 0) {
            this.#cleanupRelease?.confirm();
            this.#cleanupRelease = undefined;
            return undefined;
        }
        const failure = new SourceMapCleanupFailure(this.cleanupResources, {
            map_path: this.path,
            cleanup_failures: failures,
            codec_pid: this.#supervisor?.launch.process.pid ?? null,
        }).bindCleanupResourceOwner(this);
        return (this.#cleanupRelease ??= new AnalysisCleanupRelease()).bind(failure);
    }
}
