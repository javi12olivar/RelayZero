import { ghidraAsciiLiteralCandidate } from "./GhidraLiteralSearch.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { fileSnapshotPartialObservationSchema, } from "../domain/fileSnapshotObservation.js";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { AnalysisCancelledError, OwnerCancellation, } from "../domain/analysisErrorCore.js";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { AnalysisCleanupRelease } from "../domain/analysisCleanupRelease.js";
import { providerRetryAction, } from "../domain/providerOperationHealth.js";
import { readRuntimeSetting } from "../config/runtimeAnalysisSettings.js";
import { err, ok } from "../domain/result.js";
import { silentLogger } from "../logger.js";
import { readLinuxCgroupMemoryState, } from "../process/LinuxCgroupMemory.js";
import { PendingOperations } from "../process/PendingOperations.js";
import { JsonLineBridgeReader, } from "../process/JsonLineBridgeReader.js";
import { AbortedWait, waitForAbortable } from "../process/AbortablePromise.js";
import { SharedStartupAttempt } from "../process/SharedStartupAttempt.js";
import { PrivateRuntimeRoot } from "../process/PrivateRuntimeRoot.js";
import { ProviderStartupDeadline } from "../process/ProviderDeadline.js";
import { ProviderRunLineage } from "../process/ProviderRunLineage.js";
import { ProviderProcessSupervisor, } from "../process/ProviderProcess.js";
import { DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS } from "../domain/analysisResourceLimits.js";
import { DEFAULT_BRIDGE_MAX_REQUEST } from "../config/bridgeMaxRequestBytes.js";
import { bridgeReplyOversizeError, DEFAULT_BRIDGE_MAX_REPLY, } from "../config/bridgeMaxReplyBytes.js";
import { createGhidraDiagnostics, ghidraDiagnosticStream, ghidraFailureOutput, GHIDRA_PROCESS_DIAGNOSTIC_BYTES, } from "./GhidraDiagnostics.js";
import { GhidraLaunchError } from "./GhidraLauncher.js";
import { GhidraRequestQueue } from "./GhidraRequestQueue.js";
import { bindGhidraSessionFailure, GHIDRA_STARTUP_DEADLINE_ELAPSED, GhidraSessionError, } from "./GhidraSessionError.js";
import { isGhidraShutdownAcknowledgement, parseGhidraSessionInfo, } from "./GhidraSessionValues.js";
import { createGhidraTargetSnapshot } from "./GhidraTargetSnapshot.js";
import { attestGhidraDosSnapshot } from "./GhidraDosSnapshot.js";
import { nativeLoadImagePartialObservationSchema, } from "../domain/native/nativeLoadImage.js";
import { ArtifactResourceScope, ArtifactReaderFailure, artifactFileCancellationCause, artifactFilePrimaryFacts, bindArtifactFileCleanup, withArtifactRegularFile, readArtifactFileChunks, } from "../resources/index.js";
import { readBoundedFileBytes } from "../process/BoundedFileBytes.js";
import { assertRegularFileActive, RegularFileChangedError, sameRegularFileState, } from "../filesystem/RegularFile.js";
import { redactExplicitText } from "../domain/explicitSensitiveValues.js";
import { connectGhidraSocket } from "./GhidraSocketConnection.js";
import { createGhidraEndpoint, } from "./GhidraTransport.js";
import { GhidraWire } from "./GhidraClientWire.js";
import { ghidraRemoteError, ghidraReplyEnvelope, GhidraRemoteError, } from "./protocol.js";
import { completeGhidraStartupHandshake } from "./GhidraClientStartup.js";
import { ghidraSessionRoot } from "./GhidraSessionRoot.js";
import { GhidraCheckpoint, } from "./GhidraCheckpoint.js";
import { errorMessage } from "../kernel/errorMessage.js";
const SHUTDOWN_TIMEOUT_MS = 10_000;
/**
 * Bound for draining launcher output into failure evidence. A failed startup
 * gets it as its finalize budget, separate from the startup budget it may
 * have exhausted.
 */
const OUTPUT_DRAIN_MS = 1_000;
const SESSION_ROOT = ghidraSessionRoot();
/** Owns an authenticated private Ghidra session with transport-bound mutation authority. */
export class GhidraClient {
    #options;
    #logger;
    #pending = new PendingOperations();
    #socket;
    #detachSocket;
    #launch;
    #process;
    #runtimeRoot;
    #socketRoot;
    #endpointPath;
    #snapshotPath;
    #memoryCgroupBaseline;
    #fileResources = new ArtifactResourceScope();
    #checkpoint;
    #checkpointStaging;
    #checkpointRestore;
    /** Reported by every cleanup failure until a close releases everything. */
    #cleanupRelease = new AnalysisCleanupRelease();
    #targetAdmission;
    #token;
    // Retain authentication identities for diagnostics from late request settlement.
    #authenticationTokens = new Set();
    #runId;
    #lineage = new ProviderRunLineage();
    #nextId = 1;
    #closing = false;
    #processSnapshot;
    #startupOutputCheckpoint;
    #activeOutputCheckpoint;
    #outputDrainPromise;
    #outputDrainIncomplete = false;
    #lastDiagnostics = {};
    #startupAttempt;
    #closePromise;
    #failure = bindGhidraSessionFailure((scope) => this.#diagnostics(scope), (value, incomplete) => this.#redactAuthentication(value, incomplete));
    #wire;
    #requestQueue;
    #replies = new JsonLineBridgeReader({
        envelope: ghidraReplyEnvelope,
        maxReplyBytes: () => this.#wire.replyLimit().maximumBytes,
        deliver: (response) => {
            if (!this.#pending.has(response.id))
                return false;
            this.#pending.settle(response.id, response.ok
                ? ok(response.result)
                : err(this.#remoteFailure(ghidraRemoteError(response.error))));
            return true;
        },
        wasSent: (id) => id < this.#nextId,
        rejectInFlight: (cause) => {
            if (this.#pending.size === 0)
                return false;
            this.#failAll(this.#remoteFailure(cause));
            return true;
        },
        fail: (failure) => this.#abortReplyStream(failure),
    });
    #onSocketData = (chunk) => {
        this.#replies.push(chunk);
    };
    #onSocketEnd = () => {
        this.#replies.finish();
    };
    #onSocketError = () => {
        this.#failAll(this.#failure("process", "Ghidra bridge socket failed"));
    };
    #onSocketClose = () => {
        if (!this.#closing)
            this.#failAll(this.#failure("process", "Ghidra bridge socket closed"));
    };
    constructor(options) {
        this.#checkpoint =
            options.checkpoint === undefined
                ? undefined
                : new GhidraCheckpoint(options.checkpoint, this.#fileResources);
        this.#options = {
            ...options,
            startupTimeoutMs: options.startupTimeoutMs ?? DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS,
            platform: options.platform ?? HOST_PLATFORM.platform,
            transport: options.transport ?? "unix-socket",
        };
        this.#logger = options.logger ?? silentLogger;
        this.#wire = new GhidraWire({
            getSocket: () => this.#socket,
            getToken: () => this.#token,
            nextId: () => this.#nextId++,
            pending: this.#pending,
            logger: this.#logger,
            failure: this.#failure,
            bridgeMaxRequestBytes: options.bridgeMaxRequestBytes ?? DEFAULT_BRIDGE_MAX_REQUEST,
            bridgeMaxReplyBytes: options.bridgeMaxReplyBytes ?? DEFAULT_BRIDGE_MAX_REPLY,
        });
        this.#requestQueue = new GhidraRequestQueue(async (method, parameters, requestOptions) => {
            const owner = this.#process;
            const checkpoint = owner?.checkpointOutput();
            const token = this.#token;
            this.#activeOutputCheckpoint = checkpoint;
            try {
                const result = await this.#wire.request(method, parameters, requestOptions);
                if (!result.ok &&
                    (result.error.kind === "process" ||
                        result.error.kind === "protocol")) {
                    const drained = await this.#drainOutputBounded(requestOptions.signal);
                    return err(await this.#withMemoryCgroupEvidence(this.#refreshProcessFailure(result.error, owner, checkpoint, token, !drained)));
                }
                return result;
            }
            finally {
                if (this.#activeOutputCheckpoint === checkpoint)
                    this.#activeOutputCheckpoint = undefined;
            }
        }, this.#failure, () => this.#stopAfterActiveCancellation());
    }
    /** Launch Ghidra once and require its exact post-analysis handshake. */
    start(signal, progress) {
        if (progress !== undefined)
            return this.#reportStartupWait(this.start(signal), signal, progress);
        if (signal?.aborted === true)
            return Promise.resolve(err(this.#startupWaitCancellation(signal)));
        if (this.#closePromise !== undefined)
            return waitForAbortable(this.#closePromise, signal).then((closed) => closed instanceof AbortedWait
                ? err(this.#startupWaitCancellation(signal))
                : this.start(signal), (cause) => err(new GhidraSessionError("process", "Ghidra cleanup remains incomplete", this.#diagnostics(), { cause, cleanupFailure: this.#cleanupError(cause) })));
        const current = this.#startupAttempt;
        if (current !== undefined) {
            if (current.signal.aborted)
                return this.#retryAfterAbortedStartup(current, signal);
            return this.#waitForStartup(current, signal);
        }
        const attempt = new SharedStartupAttempt((signal) => this.#start(signal));
        const { promise } = attempt;
        this.#startupAttempt = attempt;
        void promise.then((result) => {
            if (!result.ok &&
                this.#startupAttempt === attempt &&
                result.error.cleanupFailure === undefined)
                this.#startupAttempt = undefined;
        }, (cause) => {
            this.#logger.debug({ error: errorMessage(cause) }, "Ghidra startup promise rejected during bookkeeping");
            if (this.#startupAttempt === attempt)
                this.#startupAttempt = undefined;
        });
        return this.#waitForStartup(attempt, signal);
    }
    /** Preserve cleanup failures for the last caller leaving shared startup. */
    async #waitForStartup(attempt, signal) {
        const waited = await attempt.wait(signal);
        if (waited.status === "completed")
            return waited.value;
        if (waited.status === "stopped" && !waited.value.ok)
            return waited.value;
        return err(this.#startupWaitCancellation(signal));
    }
    /** Wait for abandoned startup cleanup before retrying under the new caller. */
    async #retryAfterAbortedStartup(attempt, signal) {
        const signalAborted = () => signal?.aborted === true;
        if (signalAborted())
            return err(this.#startupWaitCancellation(signal));
        const waited = await waitForAbortable(attempt.promise, signal);
        if (waited instanceof AbortedWait || (waited.ok && signalAborted()))
            return err(this.#startupWaitCancellation(signal));
        if (waited.ok || waited.error.cleanupFailure !== undefined)
            return waited;
        return this.start(signal);
    }
    async #reportStartupWait(started, signal, progress) {
        const startedAt = performance.now();
        let active = true;
        let reporting = false;
        const timer = setInterval(() => {
            if (!active || reporting || signal?.aborted)
                return;
            reporting = true;
            void Promise.resolve()
                .then(() => {
                if (!active || signal?.aborted)
                    return;
                return progress.report({
                    phase: "ghidra_startup",
                    completed: 0,
                    total: null,
                    message: `Waiting for Ghidra startup (${String(Math.floor((performance.now() - startedAt) / 1000))}s elapsed); import, auto-analysis and bridge readiness may still be pending`,
                });
            })
                // Notification failure does not release the owned startup process.
                .catch(() => { })
                .finally(() => {
                reporting = false;
            });
        }, 10_000);
        try {
            return await started;
        }
        finally {
            active = false;
            clearInterval(timer);
        }
    }
    /** Revalidate live bridge, provider, run, and profile metadata. */
    async ping(options = {}) {
        const started = await this.start(options.signal);
        if (!started.ok)
            return started;
        const result = await this.#enqueue("ping", {}, options);
        if (!result.ok)
            return result;
        return this.#parseSessionInfo(result.value);
    }
    /** Execute one admitted operation through the serial per-Program queue.
     * Insensitive literal searches return conservative native candidates; the
     * inventory adapter owns shared matching and retains these raw source rows.
     */
    async callTool(operation, parameters, options = {}) {
        const started = await this.start(options.signal, options.progress);
        if (!started.ok)
            return started;
        return this.#callTool(operation, parameters, options);
    }
    /** Dispatch against the connected bridge without invoking startup or retry. */
    callToolIfReady(operation, parameters, options = {}) {
        if (!this.isReady())
            return Promise.resolve(undefined);
        return this.#callTool(operation, parameters, options);
    }
    /** Queue one request with the ceilings admitted in the caller's context. */
    #enqueue(method, parameters, options) {
        const limits = this.#wire.admitLimits();
        if (!limits.ok)
            return Promise.resolve(limits);
        return this.#requestQueue.run(method, parameters, {
            ...options,
            limits: limits.value,
        });
    }
    async #callTool(operation, parameters, options) {
        const pattern = (operation === "search_procedures" || operation === "search_strings") &&
            parameters.mode === "literal" &&
            parameters.case_sensitive === false &&
            typeof parameters.pattern === "string"
            ? parameters.pattern
            : undefined;
        return this.#enqueue(operation, pattern !== undefined
            ? {
                ...parameters,
                literal_ascii_candidate: ghidraAsciiLiteralCandidate(pattern),
            }
            : parameters, {
            ...(options.signal === undefined ? {} : { signal: options.signal }),
            ...(options.decompileTimeoutSeconds === undefined
                ? {}
                : { decompileTimeoutSeconds: options.decompileTimeoutSeconds }),
            ...(options.valueFlowLimits === undefined
                ? {}
                : { valueFlowLimits: options.valueFlowLimits }),
            ...(options.decompileMaxPayloadMiB === undefined
                ? {}
                : { decompileMaxPayloadMiB: options.decompileMaxPayloadMiB }),
        });
    }
    /** Read the private immutable source for format parsers that require captured bytes. */
    readTargetSnapshot(maximumBytes, signal) {
        return this.#withTargetSnapshot(async (handle, initial, path) => {
            if (maximumBytes !== undefined &&
                (!Number.isSafeInteger(maximumBytes) || maximumBytes < 0))
                throw new RangeError("Snapshot byte limit must be a safe integer");
            if (maximumBytes !== undefined && initial.size > maximumBytes)
                return {
                    kind: "over-capacity",
                    sourceBytesAtLeast: initial.size,
                    maximumBytes,
                };
            const bytes = await readBoundedFileBytes(handle, maximumBytes ?? initial.size, {
                signal,
                expectedSize: initial.size,
                cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", "Snapshot read cancelled", { cause: reason }),
            });
            if (bytes === undefined || bytes.length !== initial.size)
                throw new RegularFileChangedError(path);
            return { kind: "captured", bytes };
        }, (value, path) => fileSnapshotPartialObservationSchema.parse({
            kind: "file-snapshot-read",
            path,
            admitted_sha256: this.#options.targetSha256,
            capture: value.kind === "captured"
                ? { status: "captured", bytes: value.bytes.length }
                : {
                    status: "over-capacity",
                    source_bytes_at_least: value.sourceBytesAtLeast,
                    maximum_bytes: value.maximumBytes,
                },
        }), signal);
    }
    /** Measure the complete snapshot identity without retaining its bytes in memory. */
    hashTargetSnapshot(signal) {
        return this.#withTargetSnapshot(async (handle, initial, path) => {
            const hash = createHash("sha256");
            let bytes = 0;
            for await (const chunk of readArtifactFileChunks(handle, {
                end: initial.size,
                signal,
            })) {
                bytes += chunk.length;
                if (bytes > initial.size)
                    throw new RegularFileChangedError(path);
                hash.update(chunk);
            }
            if (bytes !== initial.size)
                throw new RegularFileChangedError(path);
            return { sha256: hash.digest("hex"), bytes };
        }, (value, path) => fileSnapshotPartialObservationSchema.parse({
            kind: "file-snapshot-hash",
            path,
            ...value,
        }), signal);
    }
    /**
     * Hash the immutable snapshot and each byte range in one streamed pass, so a
     * DOL section is verified without retaining the whole file in memory.
     */
    hashTargetSnapshotRanges(ranges, signal) {
        return this.#withTargetSnapshot(async (handle, initial, path) => {
            for (const range of ranges)
                if (!Number.isSafeInteger(range.start) ||
                    !Number.isSafeInteger(range.end) ||
                    range.start < 0 ||
                    range.end < range.start ||
                    range.end > initial.size)
                    throw new RangeError("Snapshot range must lie within the target");
            const hash = createHash("sha256");
            const rangeHashes = ranges.map(() => createHash("sha256"));
            let position = 0;
            for await (const chunk of readArtifactFileChunks(handle, {
                end: initial.size,
                signal,
            })) {
                const chunkEnd = position + chunk.length;
                if (chunkEnd > initial.size)
                    throw new RegularFileChangedError(path);
                hash.update(chunk);
                ranges.forEach((range, index) => {
                    const start = Math.max(range.start, position);
                    const end = Math.min(range.end, chunkEnd);
                    if (start < end)
                        rangeHashes[index]?.update(chunk.subarray(start - position, end - position));
                });
                position = chunkEnd;
            }
            if (position !== initial.size)
                throw new RegularFileChangedError(path);
            return {
                sha256: hash.digest("hex"),
                bytes: position,
                rangeSha256: rangeHashes.map((rangeHash) => rangeHash.digest("hex")),
            };
        }, (value, path) => fileSnapshotPartialObservationSchema.parse({
            kind: "file-snapshot-hash",
            path,
            sha256: value.sha256,
            bytes: value.bytes,
        }), signal);
    }
    /** Compare MZ source identity without retaining unbounded appended overlays. */
    attestDosTargetSnapshot(observations, signal) {
        return this.#withTargetSnapshot(async (handle, initial, path) => {
            const result = await attestGhidraDosSnapshot(handle, initial.size, path, this.#options.targetSha256, observations, signal);
            if (!result.ok)
                throw this.#failure("protocol", result.error);
            return result.value;
        }, (result) => nativeLoadImagePartialObservationSchema.parse({
            kind: "native-load-image",
            stage: "completed",
            result,
        }), signal);
    }
    async #withTargetSnapshot(read, observe, signal) {
        let completedObservation;
        try {
            return await this.#fileResources.run(async () => {
                const path = this.#snapshotPath;
                if (path === undefined ||
                    this.#closing ||
                    this.#closePromise !== undefined)
                    return err(this.#failure("protocol", "Ghidra target snapshot is unavailable before startup or after close"));
                return ok(await withArtifactRegularFile(path, this.#fileResources, signal, async ({ handle, initial }) => {
                    assertRegularFileActive(signal);
                    if (!Number.isSafeInteger(initial.size) || initial.size < 0)
                        throw new RangeError("Snapshot size must be a safe integer");
                    const value = await read(handle, initial, path);
                    assertRegularFileActive(signal);
                    const after = await handle.stat();
                    assertRegularFileActive(signal);
                    if (!sameRegularFileState(initial, after))
                        throw new RegularFileChangedError(path);
                    completedObservation = observe(value, path);
                    return value;
                }));
            });
        }
        catch (cause) {
            const cancellation = cause instanceof ArtifactReaderFailure && cause.reason === "cancelled"
                ? { reason: artifactFileCancellationCause(cause) }
                : undefined;
            const { cause: primary, origin } = artifactFilePrimaryFacts(cause);
            let failure = origin === "owned-or-classified" &&
                primary instanceof GhidraSessionError
                ? primary
                : this.#failure(cancellation === undefined ? "protocol" : "cancelled", "Ghidra target snapshot read or finalization did not complete", cause, cancellation === undefined ? {} : { cancellation });
            if (completedObservation !== undefined)
                failure = failure.withPartialObservation(completedObservation);
            if (cause instanceof ArtifactReaderFailure &&
                cause.cleanup !== undefined) {
                const cleanup = new ProviderCleanupError("ghidra", cause.cleanup.resources, { reason: this.#redactAuthentication(cause.cleanup.reason) }, {
                    operation: "read_target_snapshot",
                    cause,
                    partialObservation: completedObservation,
                });
                bindArtifactFileCleanup(cause, cleanup);
                failure = failure.withCleanupFailure(cleanup);
            }
            return err(failure);
        }
    }
    /** This waiter owns its cancellation reason, independently of shared startup. */
    #startupWaitCancellation(signal) {
        return this.#failure("cancelled", "Ghidra startup wait was cancelled", signal?.reason, signal === undefined ? {} : { cancellation: { reason: signal.reason } });
    }
    /** Stop the owned process group and remove all project/runtime artifacts. */
    async close() {
        try {
            await this.#requestClose(false);
            return ok(null);
        }
        catch (cause) {
            return err(this.#cleanupError(cause));
        }
    }
    /** Verified source after startup: null for initial checkpointed analysis; undefined if disabled or unconfirmed. */
    checkpointRestore() {
        if (this.#checkpoint === undefined || !this.#startupSucceeded())
            return undefined;
        return this.#checkpointRestore ?? null;
    }
    /** Read completion from the current attempt; no independent readiness flag. */
    #startupSucceeded() {
        const startup = this.#startupAttempt?.settlement;
        return startup?.status === "completed" && startup.value.ok;
    }
    /** True only after the authenticated startup handshake has completed. */
    isReady() {
        return (this.#startupSucceeded() &&
            this.#socket !== undefined &&
            !this.#socket.destroyed &&
            !this.#closing &&
            this.#closePromise === undefined);
    }
    #cleanupError(cause) {
        if (cause instanceof AnalysisError && cause.cleanupIncomplete)
            return this.#retainCleanupFailure(cause);
        const failure = new ProviderCleanupError("ghidra", [
            ...(this.#process === undefined ? [] : ["ghidra-process"]),
            ...(cause instanceof ArtifactReaderFailure
                ? (cause.cleanup?.resources ?? [])
                : []),
            ...this.#fileResources.cleanupResources,
            ...(this.#checkpoint?.cleanupResources ?? []),
            ...[this.#runtimeRoot, this.#socketRoot].flatMap((root) => root === undefined ? [] : [root.path]),
        ], {
            reason: errorMessage(cause),
            diagnostics: this.#diagnostics(),
        }, { cause });
        return this.#retainCleanupFailure(failure);
    }
    async #startupFailure(primary, deadline) {
        const finalization = deadline?.finalize();
        await this.#drainOutputBounded(finalization?.signal, finalization?.deadline.remainingMs());
        const refreshed = this.#failure(primary.kind, primary.message, primary.cause, {
            ...(primary.cancellation === undefined
                ? {}
                : { cancellation: primary.cancellation }),
            ...(primary.timeoutMs === undefined
                ? {}
                : { timeoutMs: primary.timeoutMs }),
            ...(primary.remoteCode === undefined
                ? {}
                : { remoteCode: primary.remoteCode }),
        });
        primary = await this.#withMemoryCgroupEvidence(primary.withDiagnostics(refreshed.diagnostics, refreshed.message));
        try {
            await this.#cleanup();
            return err(primary);
        }
        catch (cause) {
            return err(primary.withCleanupFailure(this.#cleanupError(cause)));
        }
    }
    #requestClose(forceStop) {
        const starting = this.#startupAttempt;
        starting?.close();
        this.#closePromise ??= Promise.resolve().then(() => this.#close(starting, forceStop));
        return this.#closePromise;
    }
    #stopAfterActiveCancellation() {
        return this.#requestClose(true).then(() => ok(null), (cause) => {
            this.#logger.error({ error: errorMessage(cause) }, "Ghidra cleanup after active request cancellation failed");
            return err(this.#cleanupError(cause));
        });
    }
    #retainCleanupFailure(failure) {
        const client = this;
        failure.bindCleanupResourceOwner({
            get cleanupResources() {
                return [
                    ...(client.#process === undefined ? [] : ["ghidra-process"]),
                    ...client.#fileResources.cleanupResources,
                    ...(client.#checkpoint?.cleanupResources ?? []),
                    ...[client.#runtimeRoot, client.#socketRoot].flatMap((root) => root === undefined ? [] : [root.path]),
                ];
            },
        });
        return this.#cleanupRelease.bind(failure);
    }
    /** Observed failures that prevent a retained session from being reused. */
    operationHealthSnapshot() {
        const exit = this.#process?.observedExit();
        const state = exit !== undefined
            ? "exited"
            : this.#socket?.destroyed === true
                ? "unreachable"
                : !this.#startupSucceeded() &&
                    (this.#startupAttempt === undefined ||
                        this.#startupAttempt.settled) &&
                    this.#hasOwnedResources()
                    ? "unknown"
                    : undefined;
        if (state === undefined)
            return undefined;
        return {
            state,
            stage: null,
            retryAction: providerRetryAction(state),
            exitCode: exit?.code ?? null,
            requests: [],
        };
    }
    /** Latest bounded local diagnostics, with bearer material redacted. */
    diagnostics() {
        return structuredClone(this.#diagnostics());
    }
    /** Latest token-verified launcher lineage for the active run. */
    runtimeLineage() {
        return this.#lineage.snapshot();
    }
    async #start(signal) {
        if (signal.aborted)
            return err(this.#startupWaitCancellation(signal));
        if (this.#hasOwnedResources())
            return err(this.#failure("protocol", "Ghidra client is already started"));
        this.#lastDiagnostics = {};
        this.#processSnapshot = undefined;
        this.#startupOutputCheckpoint = undefined;
        this.#activeOutputCheckpoint = undefined;
        this.#outputDrainPromise = undefined;
        this.#outputDrainIncomplete = false;
        const startupTimeout = readRuntimeSetting(() => this.#options.readStartupTimeoutMs?.() ??
            this.#options.startupTimeoutMs);
        if (!startupTimeout.ok)
            return err(this.#failure("admission", startupTimeout.error.message, startupTimeout.error));
        const deadline = new ProviderStartupDeadline(startupTimeout.value, signal, {
            finalizeMs: OUTPUT_DRAIN_MS,
        });
        try {
            const result = await this.#startWithin(deadline);
            return result.ok && deadline.signal.aborted
                ? await this.#startupInterrupted(deadline)
                : result;
        }
        catch (cause) {
            if (cause instanceof GhidraSessionError)
                return err(cause);
            throw cause;
        }
        finally {
            deadline.dispose();
        }
    }
    /** Every retained cleanup capability blocks replacement by a new startup. */
    #hasOwnedResources() {
        return (this.#process !== undefined ||
            this.#launch !== undefined ||
            this.#socket !== undefined ||
            this.#runtimeRoot !== undefined ||
            this.#socketRoot !== undefined ||
            this.#fileResources.hasPending ||
            this.#checkpoint?.hasResources === true);
    }
    async #startWithin(deadline) {
        // Admit the bridge ceilings before acquiring anything: an invalid launch
        // seed is a configuration refusal, not a failure after Ghidra started.
        // The admitted ceilings are kept for this session's cleanup requests.
        const limits = this.#wire.admitSessionLimits();
        if (!limits.ok)
            return limits;
        let packedProgram;
        try {
            packedProgram = await this.#checkpoint?.acquire(this.#options.runId ?? randomUUID(), deadline.signal);
            this.#checkpointRestore = packedProgram;
        }
        catch (cause) {
            return this.#startupFailure(deadline.signal.aborted
                ? this.#interruptionFailure(deadline, cause)
                : this.#failure("checkpoint", cause instanceof Error
                    ? cause.message
                    : "Ghidra checkpoint admission failed", cause), deadline);
        }
        try {
            this.#runtimeRoot = await PrivateRuntimeRoot.create({
                parent: SESSION_ROOT,
                prefix: "rea-ghidra-",
                platform: this.#options.platform,
            });
        }
        catch (cause) {
            return this.#startupFailure(this.#failure("start", "Ghidra runtime root creation failed", cause), deadline);
        }
        if (deadline.signal.aborted)
            return this.#startupInterrupted(deadline);
        let endpoint;
        try {
            const allocated = await createGhidraEndpoint(this.#runtimeRoot.path, this.#options.transport, this.#options.platform);
            endpoint = allocated.endpoint;
            this.#socketRoot = allocated.socketRoot;
            this.#endpointPath = endpoint.path;
        }
        catch (cause) {
            const failure = this.#failure("start", "Ghidra private endpoint allocation failed", cause);
            return this.#startupFailure(failure, deadline);
        }
        try {
            const snapshot = await createGhidraTargetSnapshot(this.#options.targetPath, this.#runtimeRoot.path, this.#options.targetSha256, {
                signal: deadline.signal,
                platform: this.#options.platform,
                resourceScope: this.#fileResources,
            });
            this.#snapshotPath = snapshot.path;
            this.#targetAdmission = snapshot.admission;
        }
        catch (cause) {
            const failure = cause instanceof ArtifactReaderFailure && cause.reason === "cancelled"
                ? this.#interruptionFailure(deadline, artifactFileCancellationCause(cause))
                : this.#failure("start", "Ghidra target snapshot failed admission", cause);
            // Snapshot finalization has settled and no launcher exists yet. Preserve
            // its producer outcome rather than reclassifying from a later deadline.
            return this.#startupFailure(failure);
        }
        if (deadline.signal.aborted)
            return this.#startupInterrupted(deadline);
        this.#token = randomBytes(32).toString("hex");
        this.#authenticationTokens.add(this.#token);
        this.#lineage.reset();
        this.#runId = this.#options.runId ?? randomUUID();
        this.#memoryCgroupBaseline = await this.#readMemoryCgroup();
        const launched = await this.#options.launcher
            .launch({
            runtimeRoot: this.#runtimeRoot.path,
            transport: endpoint.transport,
            endpointPath: endpoint.path,
            token: this.#token,
            runId: this.#runId,
            targetPath: this.#snapshotPath,
            targetSha256: this.#options.targetSha256,
            providerVersion: this.#options.providerVersion,
            profileDigest: this.#options.profileDigest,
            ...(packedProgram === undefined ? {} : { packedProgram }),
        }, { signal: deadline.signal, resourceScope: this.#fileResources })
            .catch((cause) => err(this.#failure("start", "Ghidra launcher failed", cause)));
        if (!launched.ok) {
            const partialLaunch = launched.error instanceof GhidraLaunchError
                ? launched.error.partialLaunch
                : undefined;
            if (partialLaunch !== undefined) {
                this.#launch = partialLaunch;
                this.#process = new ProviderProcessSupervisor(partialLaunch, {
                    maxDiagnosticBytes: GHIDRA_PROCESS_DIAGNOSTIC_BYTES,
                    runtime: "jvm",
                    onDiagnostic: (event) => this.#onProcessDiagnostic(event),
                });
                this.#startupOutputCheckpoint = this.#process.checkpointOutput();
            }
            const producerFailure = launched.error instanceof AnalysisCancelledError
                ? launched.error
                : launched.error instanceof GhidraLaunchError
                    ? launched.error.primaryFailure
                    : undefined;
            const failure = producerFailure instanceof AnalysisCancelledError
                ? this.#interruptionFailure(deadline, launched.error, {
                    reason: producerFailure.cause,
                })
                : launched.error instanceof GhidraSessionError
                    ? launched.error
                    : this.#failure("start", launched.error.message, launched.error);
            return this.#startupFailure(failure, deadline);
        }
        this.#launch = launched.value;
        this.#process = new ProviderProcessSupervisor(launched.value, {
            maxDiagnosticBytes: GHIDRA_PROCESS_DIAGNOSTIC_BYTES,
            runtime: "jvm",
            onDiagnostic: (event) => this.#onProcessDiagnostic(event),
        });
        this.#startupOutputCheckpoint = this.#process.checkpointOutput();
        const completed = await this.#connectAndHandshake(endpoint, deadline);
        if (!completed.ok)
            return this.#startupFailure(completed.error, deadline);
        try {
            await this.#lineage.observe(this.#launch);
        }
        catch (cause) {
            return this.#startupFailure(this.#failure("start", "Ghidra process lineage observation failed", cause), deadline);
        }
        if (deadline.signal.aborted)
            return this.#startupInterrupted(deadline);
        if (this.#checkpoint !== undefined && packedProgram === undefined) {
            try {
                await this.#saveCheckpoint(true, deadline.signal);
            }
            catch (cause) {
                return this.#startupFailure(deadline.signal.aborted
                    ? this.#interruptionFailure(deadline, cause)
                    : this.#failure("checkpoint", "Initial Ghidra checkpoint could not be saved; check REA_GHIDRA_CHECKPOINT_DIR and reopen the target", cause), deadline);
            }
        }
        this.#startupOutputCheckpoint = undefined;
        this.#requestQueue.reopen();
        return completed;
    }
    /** Save once at startup and after changes, retaining a failed publication for retry. */
    async #saveCheckpoint(force, signal) {
        const owner = this.#checkpoint;
        const runtime = this.#runtimeRoot;
        if (owner === undefined || runtime === undefined)
            return;
        await this.#finishCheckpointStaging(signal);
        const path = join(runtime.path, `checkpoint-${randomUUID()}.gzf`);
        // Checkpoints run at startup and during close, so they use the session's
        // admitted ceilings rather than the current settings.
        const limits = this.#wire.sessionLimits();
        const saved = await this.#wire.request("checkpoint_program", { path, force }, {
            ...(signal === undefined ? {} : { signal }),
            ...(limits === undefined ? {} : { limits }),
        });
        if (!saved.ok) {
            if (saved.error.kind === "remote")
                return this.#discardCheckpoint(path, saved.error, signal);
            throw saved.error;
        }
        const parsed = z
            .discriminatedUnion("saved", [
            z.object({ saved: z.literal(false) }).strict(),
            z.object({ saved: z.literal(true), path: z.literal(path) }).strict(),
        ])
            .safeParse(saved.value);
        if (!parsed.success)
            return this.#discardCheckpoint(path, this.#failure("protocol", "Ghidra checkpoint acknowledgement is invalid", parsed.error), signal);
        if (!parsed.data.saved)
            return;
        this.#checkpointStaging = { path, disposition: "publish" };
        await this.#finishCheckpointStaging(signal);
    }
    /** An acknowledged failed export is owned but is not a valid checkpoint. */
    async #discardCheckpoint(path, failure, signal) {
        this.#checkpointStaging = { path, disposition: "discard" };
        try {
            await this.#finishCheckpointStaging(signal);
        }
        catch (cause) {
            const cleanup = this.#retainCleanupFailure(new ProviderCleanupError("ghidra", [path], {
                reason: "A failed Ghidra checkpoint export left a partial file; close the target to retry its cleanup before another save.",
                diagnostics: this.#diagnostics(),
            }, { cause }));
            throw failure.withCleanupFailure(cleanup);
        }
        throw failure;
    }
    async #finishCheckpointStaging(signal) {
        const staged = this.#checkpointStaging;
        if (staged === undefined)
            return;
        if (staged.disposition === "publish") {
            if (this.#checkpoint === undefined)
                throw this.#failure("protocol", "Checkpoint publication owner is missing");
            await this.#checkpoint.publish(staged.path, signal);
        }
        await rm(staged.path, { force: true });
        this.#checkpointStaging = undefined;
    }
    async #connectAndHandshake(endpoint, deadline) {
        // Retry only a dropped loopback transport, never identity or protocol failures.
        for (let attempt = 0;; attempt += 1) {
            const connected = await this.#connect(endpoint, deadline);
            if (!connected.ok)
                return connected;
            const completed = await completeGhidraStartupHandshake({
                deadline,
                request: (method, params, requestOptions) => this.#wire.request(method, params, requestOptions),
                parseSessionInfo: (value) => this.#parseSessionInfo(value),
                failure: this.#failure,
                startupTimeoutMs: deadline.timeoutMs,
            });
            if (completed.ok ||
                completed.error.kind !== "process" ||
                endpoint.transport !== "authenticated-loopback-tcp" ||
                attempt >= 2 ||
                deadline.signal.aborted ||
                this.#closing ||
                this.#process?.observedExit() !== undefined)
                return completed;
            this.#detachSocket?.();
            this.#detachSocket = undefined;
            this.#socket?.destroy();
            this.#socket = undefined;
            this.#replies.reset();
        }
    }
    async #connect(endpoint, deadline) {
        const connected = await connectGhidraSocket({
            endpoint,
            deadline,
            resourceScope: this.#fileResources,
            failure: this.#failure,
            isClosed: () => this.#closing,
            processExited: () => this.#process?.observedExit() !== undefined,
            startupTimeoutMs: deadline.timeoutMs,
            handlers: {
                data: this.#onSocketData,
                end: this.#onSocketEnd,
                error: this.#onSocketError,
                close: this.#onSocketClose,
            },
        });
        if (!connected.ok)
            return connected;
        this.#socket = connected.value.socket;
        this.#detachSocket = connected.value.detach;
        return ok(undefined);
    }
    #parseSessionInfo(value) {
        const runId = this.#runId;
        if (runId === undefined)
            return err(this.#failure("protocol", "Ghidra run identity is missing"));
        const parsed = parseGhidraSessionInfo(value, {
            runId,
            expectedReadOnly: this.#options.existingProject === true ||
                this.#options.transport === "authenticated-loopback-tcp",
            expectedExistingProject: this.#options.existingProject === true,
            providerVersion: this.#options.providerVersion,
            profileDigest: this.#options.profileDigest,
            targetSha256: this.#options.targetSha256,
            ...(this.#targetAdmission === undefined
                ? {}
                : { targetAdmission: this.#targetAdmission }),
            ...(this.#options.expectedLanguageId === undefined
                ? {}
                : { expectedLanguageId: this.#options.expectedLanguageId }),
            ...(this.#options.expectedCompilerSpecId === undefined
                ? {}
                : { expectedCompilerSpecId: this.#options.expectedCompilerSpecId }),
            ...(this.#options.expectedImageBase === undefined
                ? {}
                : { expectedImageBase: this.#options.expectedImageBase }),
        });
        if (parsed.ok)
            return parsed;
        return err(this.#failure("protocol", "Ghidra bridge handshake is invalid", parsed.error));
    }
    async #close(starting, forceStop) {
        try {
            // best-effort cleanup: a rejected startup must not mask close/cleanup.
            await starting?.promise.catch(() => undefined);
            await this.#cleanup(forceStop);
        }
        finally {
            if (this.#startupAttempt === starting &&
                (forceStop || this.#socket === undefined || this.#socket.destroyed))
                this.#startupAttempt = undefined;
            this.#closePromise = undefined;
        }
    }
    async #cleanup(forceStop = false) {
        this.#closing = true;
        let forcedStopFailure;
        try {
            this.#requestQueue.failQueued(this.#failure("process", "Ghidra session closed"));
            if (!forceStop &&
                this.#startupSucceeded() &&
                this.#checkpoint !== undefined &&
                this.#socket !== undefined &&
                !this.#socket.destroyed) {
                try {
                    await this.#saveCheckpoint(false);
                }
                catch (cause) {
                    this.#requestQueue.reopen();
                    throw cause;
                }
            }
            const socket = this.#socket;
            if (!forceStop && socket !== undefined && !socket.destroyed) {
                const limits = this.#wire.sessionLimits();
                const shutdown = await this.#wire
                    .request("shutdown", {}, {
                    timeoutMs: SHUTDOWN_TIMEOUT_MS,
                    ...(limits === undefined ? {} : { limits }),
                })
                    .catch((cause) => err(this.#failure("process", "Ghidra shutdown request failed", cause)));
                if (!shutdown.ok || !isGhidraShutdownAcknowledgement(shutdown.value))
                    this.#logger.warn({
                        status: shutdown.ok ? "invalid-acknowledgement" : "failed",
                        ...(shutdown.ok
                            ? {}
                            : {
                                kind: shutdown.error.kind,
                                message: shutdown.error.message,
                                diagnostics: shutdown.error.diagnostics,
                            }),
                    }, "Ghidra bridge shutdown was not confirmed");
            }
            this.#failAll(this.#failure("process", "Ghidra session closed"));
            this.#detachSocket?.();
            this.#detachSocket = undefined;
            socket?.destroy();
            this.#socket = undefined;
            if (this.#process !== undefined) {
                await this.#process.waitForExit(500);
                this.#processSnapshot = this.#process.snapshot();
                const stopped = await this.#process.stop();
                this.#processSnapshot = this.#process.snapshot();
                if (stopped.status === "incomplete") {
                    this.#options.onDiagnostic?.({
                        type: "cleanup-incomplete",
                        reason: stopped.reason,
                    });
                    this.#logger.warn({ reason: stopped.reason }, "Ghidra process cleanup failed closed");
                    // Keep the supervisor and private files available for a later close.
                    // A still-live JVM can recreate files if its runtime is removed here.
                    throw this.#failure("process", `Ghidra process cleanup was incomplete: ${stopped.reason}`);
                }
            }
            this.#lastDiagnostics = this.#diagnostics();
            this.#process = undefined;
            this.#launch = undefined;
            await this.#checkpoint?.close();
            await this.#fileResources.retryCleanup();
            try {
                await this.#removeRuntimeRoots();
            }
            catch (cause) {
                if (forceStop)
                    forcedStopFailure = { cause };
                else
                    throw cause;
            }
            this.#snapshotPath = undefined;
            this.#checkpointStaging = undefined;
            this.#checkpointRestore = undefined;
            this.#endpointPath = undefined;
            this.#token = undefined;
            this.#runId = undefined;
            this.#replies.reset();
            if (forcedStopFailure !== undefined)
                throw forcedStopFailure.cause;
            this.#cleanupRelease.confirm();
            this.#cleanupRelease = new AnalysisCleanupRelease();
        }
        finally {
            this.#closing = false;
        }
    }
    /**
     * Remove the runtime and socket roots, keeping each one that could not be
     * removed so a later close retries it rather than reporting success.
     */
    async #removeRuntimeRoots() {
        const roots = [
            {
                root: this.#runtimeRoot,
                release: () => (this.#runtimeRoot = undefined),
            },
            { root: this.#socketRoot, release: () => (this.#socketRoot = undefined) },
        ];
        const leftovers = [];
        let firstCause;
        for (const { root, release } of roots) {
            if (root === undefined)
                continue;
            try {
                await root.close();
                release();
            }
            catch (cause) {
                firstCause ??= cause;
                leftovers.push({
                    path: root.path,
                    reason: errorMessage(cause),
                });
            }
        }
        if (leftovers.length > 0) {
            const failure = new ProviderCleanupError("ghidra", leftovers.map(({ path }) => path), {
                reason: "Ghidra's private runtime directory could not be removed; it is retained for a later close.",
                leftover_paths: leftovers.map(({ path }) => path),
                failures: leftovers.map(({ path, reason }) => `${path}: ${reason}`),
            }, { cause: firstCause });
            this.#retainCleanupFailure(failure);
            throw failure;
        }
    }
    #redactAuthentication(value, incomplete = false) {
        return redactExplicitText(value, [...this.#authenticationTokens], {
            cutOff: incomplete,
        });
    }
    #onProcessDiagnostic(event) {
        if (event.type === "output") {
            this.#options.onDiagnostic?.({
                type: "launcher-output",
                stream: event.stream,
                bytes: event.bytes,
                totalBytes: event.totalBytes,
            });
            return;
        }
        if (event.type === "error") {
            this.#logger.warn({ message: event.message }, "Ghidra process emitted an error");
            return;
        }
        this.#processSnapshot = event.snapshot;
        if (event.type === "output-close")
            return;
        this.#options.onDiagnostic?.({
            type: "launcher-exit",
            code: event.code,
            signal: event.signal,
        });
        if (!this.#closing)
            this.#failAll(this.#failure("process", "Ghidra process exited"));
    }
    #remoteFailure(failure) {
        return this.#failure("remote", failure.message, failure, {
            remoteCode: failure.code,
        });
    }
    #abortReplyStream(failure) {
        switch (failure.kind) {
            case "reply_oversize": {
                const oversize = bridgeReplyOversizeError("Ghidra", this.#wire.replyLimit(), failure.observedBytes);
                this.#abortProtocol(oversize.message, oversize);
                return;
            }
            case "utf8":
                this.#abortProtocol("Ghidra bridge response is not valid UTF-8", failure.cause);
                return;
            case "envelope":
                this.#abortProtocol(failure.cause.message, failure.cause);
                return;
            case "unknown_id":
                this.#abortProtocol("Ghidra returned an unknown response id");
                return;
            case "connection_rejected":
                this.#abortProtocol(`Ghidra rejected the connection: ${failure.cause.message}`, failure.cause);
        }
    }
    #abortProtocol(message, cause) {
        const failure = this.#failure("protocol", message, cause);
        this.#requestQueue.failQueued(failure);
        this.#failAll(failure);
        this.#socket?.destroy();
    }
    #failAll(error) {
        this.#pending.failAll(() => err(error));
    }
    async #startupInterrupted(deadline) {
        const failure = this.#interruptionFailure(deadline);
        return this.#startupFailure(failure, deadline);
    }
    #interruptionFailure(deadline, cause, cancellation) {
        // A producer that cancelled while startup's deadline still ran reports
        // its own cancellation; once the deadline aborted, the deadline reports.
        if (cancellation !== undefined && !deadline.signal.aborted)
            return this.#failure("cancelled", "Ghidra startup was cancelled", cause, {
                cancellation,
            });
        if (deadline.signal.reason === OwnerCancellation.startupOwnerClosed)
            return this.#failure("process", "Ghidra session closed during startup", cause);
        return deadline.interruption === "cancelled"
            ? this.#failure("cancelled", "Ghidra startup was cancelled", cause, {
                cancellation: { reason: deadline.signal.reason },
            })
            : this.#failure("timeout", GHIDRA_STARTUP_DEADLINE_ELAPSED, cause, {
                timeoutMs: deadline.timeoutMs,
            });
    }
    #diagnostics(requestedScope = "session") {
        // Startup errors still need launcher evidence. A request projection must
        // have both a completed handshake and its own active output checkpoint.
        const scope = requestedScope === "request" &&
            this.#startupSucceeded() &&
            this.#activeOutputCheckpoint !== undefined
            ? "request"
            : "session";
        const currentSnapshot = this.#process?.snapshot() ?? this.#processSnapshot;
        const snapshot = this.#outputDrainIncomplete && currentSnapshot !== undefined
            ? {
                ...currentSnapshot,
                diagnosticTruncated: true,
                outputIncomplete: true,
            }
            : currentSnapshot;
        const checkpoint = scope === "request"
            ? this.#activeOutputCheckpoint
            : (this.#activeOutputCheckpoint ?? this.#startupOutputCheckpoint);
        const scoped = checkpoint === undefined
            ? undefined
            : this.#process?.snapshotOutputSince(checkpoint);
        const failureOutput = scoped === undefined
            ? undefined
            : ghidraFailureOutput(scoped, this.#token, this.#outputDrainIncomplete);
        return {
            ...createGhidraDiagnostics({
                scope,
                targetPath: this.#options.targetPath,
                targetSha256: this.#options.targetSha256,
                ...(this.#targetAdmission === undefined
                    ? {}
                    : { targetAdmission: this.#targetAdmission }),
                transport: this.#options.transport,
                providerVersion: this.#options.providerVersion,
                profileDigest: this.#options.profileDigest,
                ...(this.#runId === undefined ? {} : { runId: this.#runId }),
                ...(this.#runtimeRoot === undefined
                    ? {}
                    : { runtimeRoot: this.#runtimeRoot.path }),
                ...(this.#socketRoot === undefined
                    ? {}
                    : { socketRoot: this.#socketRoot.path }),
                ...(this.#endpointPath === undefined
                    ? {}
                    : { endpointPath: this.#endpointPath }),
                ...(this.#launch === undefined ? {} : { launch: this.#launch }),
                ...(snapshot === undefined ? {} : { snapshot }),
                ...(this.#token === undefined ? {} : { token: this.#token }),
                previous: this.#lastDiagnostics,
                ...(failureOutput === undefined
                    ? {}
                    : { failure_output: failureOutput }),
            }),
            ...(this.#checkpoint === undefined
                ? {}
                : { checkpoint: this.#checkpoint.observation }),
        };
    }
    #refreshProcessFailure(failure, owner, checkpoint, token, drainIncomplete) {
        if (owner === undefined || checkpoint === undefined)
            return failure;
        const snapshot = owner.snapshot();
        const scoped = owner.snapshotOutputSince(checkpoint);
        const incomplete = drainIncomplete || !scoped.complete;
        return failure.withDiagnostics({
            ...failure.diagnostics,
            exit_code: snapshot.exitCode ?? null,
            exit_signal: snapshot.signal ?? null,
            stop_requested: snapshot.stopRequested === true,
            diagnostic_truncated: snapshot.diagnosticTruncated === true || incomplete,
            output_incomplete: snapshot.outputIncomplete === true || drainIncomplete,
            stdout: ghidraDiagnosticStream(snapshot.stdout, token),
            stderr: ghidraDiagnosticStream(snapshot.stderr, token),
            failure_output: ghidraFailureOutput(scoped, token, drainIncomplete),
        });
    }
    /**
     * Optional diagnostic sampling, outside the scope's admission gate: a
     * pending owner must not mask the provider failure being explained. The
     * scope still tracks the read, so session cleanup joins it and reports a
     * failed close it retains.
     */
    #readMemoryCgroup() {
        return this.#fileResources.track(() => (this.#options.readMemoryCgroup ?? readLinuxCgroupMemoryState)({
            retainFailedClose: (path, handle) => this.#fileResources.retain({
                kind: "file-handle",
                resource: path,
                handle,
            }),
        }));
    }
    /**
     * Compare REA's memory cgroup with its pre-launch observation once Ghidra is
     * known to have died by SIGKILL, so a kernel OOM kill becomes evidence.
     */
    async #withMemoryCgroupEvidence(failure) {
        const before = this.#memoryCgroupBaseline;
        if (before === undefined ||
            failure.diagnostics.exit_signal !== "SIGKILL" ||
            failure.diagnostics.stop_requested !== false)
            return failure;
        const after = await this.#readMemoryCgroup();
        if (after === undefined || after.path !== before.path)
            return failure;
        return failure.withDiagnostics({
            ...failure.diagnostics,
            memory_cgroup: {
                path: after.path,
                oom_kill_before: before.oomKills,
                oom_kill_after: after.oomKills,
                memory_max: after.memoryMax,
            },
        });
    }
    #drainOutputBounded(signal, budgetMs = OUTPUT_DRAIN_MS) {
        if (this.#outputDrainPromise !== undefined)
            return this.#outputDrainPromise;
        const process = this.#process;
        if (process === undefined)
            return Promise.resolve(true);
        const pending = process
            .waitForOutputClose(budgetMs, signal)
            .then((closed) => {
            if (this.#process !== process)
                return;
            if (!closed)
                this.#outputDrainIncomplete = true;
            const snapshot = process.snapshot();
            this.#processSnapshot = this.#outputDrainIncomplete
                ? { ...snapshot, diagnosticTruncated: true, outputIncomplete: true }
                : snapshot;
            return closed;
        });
        this.#outputDrainPromise = pending.then((closed) => closed ?? false);
        return this.#outputDrainPromise;
    }
}
