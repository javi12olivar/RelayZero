import { snapshotEnvironment } from "../../process/snapshotEnvironment.js";
import { HOST_PLATFORM, } from "../../platform/HostPlatform.js";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ArtifactResourceScope, AnalysisCleanupLease, ArtifactReaderFailure, artifactFileCancellationCause, SafeOutputTree, SafeOutputTreeCreationFailure, } from "../../resources/index.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { analysisErrorWithCancellation } from "../../domain/analysisErrorCancellation.js";
import { AnalysisCapabilityUnavailableError, AnalysisOutputError, cancelledBy, carriedReason, } from "../../domain/analysisErrorCore.js";
import { javascriptRecoveryResultSchema, } from "../../domain/javascript/javascriptRecovery.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
import { err, ok } from "../../domain/result.js";
import { checkRecoveryCancellation, checkRecoveryDeadline, recoveryInputFailure, snapshotRecoveryInputs, } from "./RecoveryFiles.js";
import { resolveWakaruCommand, WakaruCleanupFailure, } from "./WakaruCommand.js";
import { prepareWakaruExecution } from "./WakaruExecution.js";
import { RECOVERY_LIMITS } from "./WakaruRelease.js";
import { WakaruReportReadFailure } from "./WakaruReport.js";
import { errorMessage } from "../../kernel/errorMessage.js";
const OPERATION = "recover_javascript_sources";
/** Serialized recovery adapter retaining failed process, workspace and publication cleanup. */
export class WakaruProvider {
    environment;
    launcher;
    host;
    #resources = new ArtifactResourceScope();
    #tail = Promise.resolve();
    #closing = false;
    #closePromise;
    #pendingCleanup;
    constructor(environment = process.env, launcher, 
    /** The host Wakaru runs on; selects the supported-host gate and environment rules. */
    host = HOST_PLATFORM) {
        this.environment = environment;
        this.launcher = launcher;
        this.host = host;
    }
    /** Recover selected scripts using validated reports and verified output bytes. */
    recover(input, options) {
        if (this.#closing)
            return Promise.resolve(err(this.#closedError()));
        const operation = this.#tail.then(() => this.#closing ? err(this.#closedError()) : this.#recover(input, options));
        this.#tail = operation.then(() => undefined, () => undefined);
        return operation;
    }
    #closedError() {
        return new AnalysisCapabilityUnavailableError("wakaru", OPERATION, "Provider is closing");
    }
    async #recover(input, options) {
        const pending = await this.#retire();
        if (pending !== undefined)
            return err(pending);
        // Capture configuration after queue/cleanup admission; later requests may select updates.
        const environment = snapshotEnvironment(this.environment, this.host.platform);
        let root;
        let tree;
        let failed;
        let execution;
        const deadline = performance.now() + RECOVERY_LIMITS.timeoutMs;
        try {
            checkRecoveryCancellation(options?.signal);
            const engine = await resolveWakaruCommand(environment, this.host, this.#resources, options?.signal);
            root = await mkdtemp(join(tmpdir(), "rea-wakaru-"));
            const inputs = join(root, "inputs");
            const staging = join(root, "modules");
            await mkdir(inputs, { mode: 0o700 });
            await mkdir(staging, { mode: 0o700 });
            const sources = await snapshotRecoveryInputs([input.path, ...(input.additional_paths ?? [])], inputs, options?.signal, this.#resources);
            try {
                tree = await SafeOutputTree.create(input.output_directory);
            }
            catch (cause) {
                if (cause instanceof SafeOutputTreeCreationFailure)
                    tree = cause.tree;
                throw recoveryInputFailure("output_directory", `Cannot create new recovery directory ${input.output_directory}: ${errorMessage(cause)}`, cause);
            }
            execution = await prepareWakaruExecution({
                root,
                tree,
                resources: this.#resources,
                input,
                sources,
                engine,
                environment,
                launcher: this.launcher,
                options,
                deadline,
            });
            checkRecoveryDeadline(deadline, options?.signal);
            await rm(root, { recursive: true, force: true });
            root = undefined;
            checkRecoveryDeadline(deadline, options?.signal);
            await tree.commit(options?.signal);
        }
        catch (cause) {
            failed = { cause };
        }
        if (failed !== undefined) {
            const reportFailure = failed.cause instanceof WakaruReportReadFailure
                ? failed.cause
                : undefined;
            const primary = reportFailure?.failure ?? failed.cause;
            let failure = primary instanceof ArtifactReaderFailure &&
                primary.reason === "cancelled" &&
                primary.cleanup === undefined
                ? cancelledBy(OPERATION, carriedReason(artifactFileCancellationCause(primary)), {
                    ...(primary.partialObservation === undefined
                        ? {}
                        : { partialObservation: primary.partialObservation }),
                    ...(reportFailure === undefined
                        ? {}
                        : { capturedOutput: reportFailure.capturedOutput }),
                })
                : primary;
            const residuals = [];
            const cleanupFailures = [];
            const cleanupOwner = failure instanceof WakaruCleanupFailure
                ? failure.cleanupOwner
                : undefined;
            let failedTree;
            try {
                await tree?.rollback();
            }
            catch (cause) {
                if (tree !== undefined) {
                    failedTree = tree;
                    residuals.push(tree.outputRoot);
                    cleanupFailures.push({
                        resource: tree.outputRoot,
                        reason: errorMessage(cause),
                    });
                }
            }
            if (cleanupOwner !== undefined)
                residuals.push(cleanupOwner.launch.ownership?.runId ?? "wakaru-worker");
            const filesPending = this.#resources.hasPending;
            if (filesPending)
                residuals.push(...this.#resources.cleanupResources);
            if (root !== undefined && cleanupOwner === undefined && !filesPending) {
                const failedRoot = root;
                try {
                    await rm(failedRoot, { recursive: true, force: true });
                    root = undefined;
                }
                catch (cause) {
                    residuals.push(failedRoot);
                    cleanupFailures.push({
                        resource: failedRoot,
                        reason: errorMessage(cause),
                    });
                }
            }
            if (cleanupOwner !== undefined ||
                failedTree !== undefined ||
                root !== undefined ||
                filesPending) {
                const resources = {
                    root,
                    process: cleanupOwner,
                    tree: failedTree,
                };
                const files = this.#resources;
                const lease = new AnalysisCleanupLease(() => this.#releasePending(resources), {
                    get cleanupResources() {
                        return [
                            ...files.cleanupResources,
                            ...(resources.process === undefined
                                ? []
                                : [
                                    resources.process.launch.ownership?.runId ??
                                        "wakaru-worker",
                                ]),
                            ...(resources.tree === undefined
                                ? []
                                : [resources.tree.outputRoot]),
                            ...(resources.root === undefined ? [] : [resources.root]),
                        ];
                    },
                });
                this.#pendingCleanup = { resources, lease };
                if (root !== undefined)
                    residuals.push(root);
                root = undefined;
            }
            // Cleanup can settle after the caller cancels. Preserve the established
            // physical outcome and record the exact later cancellation on its primary.
            const signal = options?.signal;
            if (signal?.aborted === true) {
                const analysisFailure = failure instanceof AnalysisError
                    ? failure
                    : new ProviderAdapterError("wakaru", OPERATION, {
                        cause: failure,
                        diagnostics: { reason: errorMessage(failure) },
                        ...(failure instanceof ArtifactReaderFailure &&
                            failure.partialObservation !== undefined
                            ? { partialObservation: failure.partialObservation }
                            : {}),
                        ...(reportFailure === undefined
                            ? {}
                            : { capturedOutput: reportFailure.capturedOutput }),
                    });
                failure = analysisErrorWithCancellation(analysisFailure, cancelledBy(OPERATION, signal));
            }
            if (residuals.length > 0) {
                const error = new ProviderCleanupError("wakaru", residuals, {
                    ...(failure instanceof WakaruCleanupFailure
                        ? failure.diagnostics
                        : {}),
                    previous_error: failure instanceof WakaruCleanupFailure
                        ? (failure.diagnostics?.previous_error ?? null)
                        : errorMessage(failure),
                    cleanup_failures: cleanupFailures,
                }, {
                    operation: OPERATION,
                    cause: failure,
                    ...(failure instanceof AnalysisError
                        ? {
                            cleanupPrimary: failure,
                            capturedOutput: failure.capturedOutput,
                        }
                        : {}),
                    ...(reportFailure === undefined
                        ? {}
                        : { capturedOutput: reportFailure.capturedOutput }),
                    ...(tree?.published && execution !== undefined
                        ? {
                            partialObservation: {
                                kind: "javascript-recovery",
                                result: javascriptRecoveryResultSchema.parse(execution.result),
                            },
                        }
                        : (failure instanceof AnalysisError ||
                            failure instanceof ArtifactReaderFailure) &&
                            failure.partialObservation !== undefined
                            ? { partialObservation: failure.partialObservation }
                            : {}),
                });
                const lease = this.#pendingCleanup?.lease;
                if (lease !== undefined) {
                    if (failure instanceof WakaruCleanupFailure)
                        lease.bindCleanupError(failure);
                    lease.bindCleanupError(error);
                    error.bindCleanupResourceOwner(lease);
                }
                return err(error);
            }
            if (tree?.published === true && execution !== undefined)
                return ok(execution);
            return err(failure instanceof AnalysisError
                ? failure
                : new ProviderAdapterError("wakaru", OPERATION, {
                    cause: failure,
                    diagnostics: { reason: errorMessage(failure) },
                    ...(reportFailure === undefined
                        ? {}
                        : { capturedOutput: reportFailure.capturedOutput }),
                }));
        }
        return execution === undefined
            ? err(new AnalysisOutputError(OPERATION, "Recovery returned no execution"))
            : ok(execution);
    }
    async close() {
        this.#closing = true;
        this.#closePromise ??= this.#tail
            .then(async () => {
            const failure = await this.#retire();
            if (failure !== undefined)
                throw failure;
        })
            .catch((cause) => {
            this.#closePromise = undefined;
            throw cause;
        });
        return this.#closePromise;
    }
    async #retire() {
        const pending = this.#pendingCleanup;
        if (pending === undefined)
            return undefined;
        try {
            await pending.lease.release();
            this.#pendingCleanup = undefined;
            return undefined;
        }
        catch (cause) {
            const error = new ProviderCleanupError("wakaru", pending.lease.cleanupResources ?? [], { reason: errorMessage(cause) }, { operation: OPERATION, cause }).bindCleanupResourceOwner(pending.lease);
            pending.lease.bindCleanupError(error);
            return error;
        }
    }
    async #releasePending(pending) {
        if (pending.process !== undefined) {
            const stopped = await pending.process.stop();
            if (stopped.status === "incomplete")
                throw new Error(stopped.reason);
            pending.process = undefined;
        }
        await this.#resources.retryCleanup();
        if (pending.tree !== undefined) {
            await pending.tree.rollback();
            pending.tree = undefined;
        }
        if (pending.root !== undefined) {
            await rm(pending.root, { recursive: true, force: true });
            pending.root = undefined;
        }
    }
}
