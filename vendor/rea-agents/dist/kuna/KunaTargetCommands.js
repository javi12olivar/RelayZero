import { ArtifactFileCleanupFailure, artifactFilePrimaryFacts, bindArtifactFileCleanup, ArtifactResourceScope, AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, } from "../resources/index.js";
import { analysisErrorWithCancellation } from "../domain/analysisErrorCancellation.js";
import { retainProcessInspectionCleanup, processInspectionCancellationError, } from "../providers/OwnedCommandCleanup.js";
import { basename, join } from "node:path";
import { realpath } from "node:fs/promises";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { AnalysisArtifactChangedError, cancelledBy, carriedReason, OwnerCancellation, } from "../domain/analysisErrorCore.js";
import { ProviderAdapterError } from "../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { analysisErrorWithCleanupDependencies, providerCleanupErrorFromFailures, } from "../domain/analysisErrorCleanup.js";
import { err, ok } from "../domain/result.js";
import { PrivateRuntimeRoot } from "../process/PrivateRuntimeRoot.js";
import { prepareProcessOwnershipInspection } from "../process/ProcessOwnershipObservation.js";
import { copyAndHash, runKunaCommand, } from "./KunaCommand.js";
import { KUNA_PROVIDER_ID } from "./KunaRelease.js";
import { classifyProviderFailure, } from "../providers/classifyProviderFailure.js";
import { errorMessage } from "../kernel/errorMessage.js";
/** Own the digest-checked target copy and every command that can still use it. */
const workspaceCopyFailure = (cause) => new ProviderAdapterError(KUNA_PROVIDER_ID, "kuna:workspace", { cause });
/**
 * How a failed workspace copy is reported. The shared classifier keeps typed
 * failures and the copy's cancellation; a copy whose descriptor cleanup failed
 * reports that cleanup with the copy's own failure as its primary.
 */
const KUNA_WORKSPACE_COPY_DIALECT = {
    providerId: KUNA_PROVIDER_ID,
    operation: "kuna:workspace",
    readCleanup: (read, primary) => {
        // A completed copy's cleanup is the only failure; an unfinished plain
        // read keeps its own failure as the primary.
        const reported = primary ??
            (read instanceof ArtifactFileCleanupFailure
                ? undefined
                : workspaceCopyFailure(artifactFilePrimaryFacts(read).cause));
        const error = new ProviderCleanupError(KUNA_PROVIDER_ID, read.cleanup.resources, { reason: read.cleanup.reason }, {
            operation: "kuna:workspace",
            cause: read,
            ...(reported === undefined ? {} : { cleanupPrimary: reported }),
        });
        bindArtifactFileCleanup(read, error);
        return error;
    },
    unclassified: (cause) => workspaceCopyFailure(artifactFilePrimaryFacts(cause).cause),
};
export class KunaTargetCommands {
    target;
    lifetime;
    #resources = new ArtifactResourceScope();
    #retained = [];
    #roots = [];
    #workspace;
    #closeAttempt;
    #closing = false;
    constructor(target, lifetime) {
        this.target = target;
        this.lifetime = lifetime;
    }
    run(request) {
        if (this.#closing || request.signal.aborted) {
            request.releaseRun?.();
            return Promise.resolve(err(cancelledBy(request.operation, request.signal.aborted
                ? request.signal
                : OwnerCancellation.ownerClosed)));
        }
        return this.#run(request);
    }
    /** Establish the immutable input before waiting for a foreground run slot. */
    prepare() {
        if (this.#closing || this.lifetime.signal.aborted)
            return Promise.resolve(err(cancelledBy("kuna:workspace", this.lifetime.signal.aborted
                ? this.lifetime.signal
                : OwnerCancellation.ownerClosed)));
        return this.#admit("kuna:workspace", () => this.#ensureWorkspace().then((workspace) => workspace.ok ? ok(null) : workspace));
    }
    /**
     * The verified input's size and kept leading bytes, establishing the input
     * first. They come from the stream that was hashed, so they are exactly
     * the bytes Kuna analyzes, and reading them opens no file.
     */
    inputHead(operation) {
        if (this.#closing || this.lifetime.signal.aborted)
            return Promise.resolve(err(cancelledBy(operation, this.lifetime.signal.aborted
                ? this.lifetime.signal
                : OwnerCancellation.ownerClosed)));
        return this.#admit(operation, async () => {
            const workspace = await this.#ensureWorkspace();
            if (!workspace.ok)
                return workspace;
            const { bytes, prefix } = workspace.value;
            return ok({ bytes, prefix });
        });
    }
    async #run(request) {
        const { releaseRun, ...options } = request;
        let retained = false;
        try {
            return await this.#admit(request.operation, async () => {
                const workspace = await this.#ensureWorkspace();
                if (!workspace.ok)
                    return workspace;
                let failedHashClose;
                const outcome = await runKunaCommand({
                    ...options,
                    arguments: request.arguments(workspace.value.input),
                    workspace: workspace.value.root.path,
                    timeoutMs: request.deadline.ms,
                    launcher: this.lifetime.launcher,
                    retainFailedFileClose: (owner, resource) => {
                        const lease = new AnalysisCleanupLease(() => owner.close(), [resource]);
                        this.#resources.retain({ kind: "lease", resource, lease });
                        failedHashClose = { owner, lease };
                    },
                });
                if (outcome.kind === "retained") {
                    const process = new AnalysisCleanupLease(async () => {
                        const stopped = await outcome.owner?.stop();
                        if (stopped === undefined)
                            throw new Error("Kuna process ownership remains unresolved");
                        if (stopped.status === "incomplete")
                            throw new Error(stopped.reason, { cause: stopped });
                        releaseRun?.();
                    }, outcome.processResources);
                    new AnalysisCleanupLeaseGroup(outcome.error, [
                        process,
                        workspace.value.cleanup,
                    ]);
                    this.#retained.push({ error: outcome.error, process });
                    retained = true;
                    return err(outcome.error);
                }
                const fileFailure = outcome.kind === "failed" ? outcome.fileCleanupFailure : undefined;
                if (outcome.kind === "ok")
                    return ok({ ...outcome.snapshot, input: workspace.value.input });
                if (fileFailure !== undefined &&
                    fileFailure.owner === failedHashClose?.owner)
                    failedHashClose.lease.bindCleanupError(outcome.error);
                return err(outcome.error);
            });
        }
        finally {
            if (!retained)
                releaseRun?.();
        }
    }
    /** Called after the session signal aborts; failures keep their retry owners. */
    close() {
        this.#closing = true;
        this.#closeAttempt ??= this.#closeCommands().finally(() => {
            this.#closeAttempt = undefined;
        });
        return this.#closeAttempt;
    }
    async #closeCommands() {
        const failures = [];
        try {
            await this.#resources.close();
        }
        catch (cause) {
            const observation = ArtifactReaderFailure.cleanupObservation(cause, "Kuna command file descriptor");
            const failure = new ProviderCleanupError(KUNA_PROVIDER_ID, observation.resources, { reason: observation.reason }, { cause });
            bindArtifactFileCleanup(cause, failure);
            failures.push(failure);
        }
        for (const retained of [...this.#retained]) {
            try {
                await retained.process.release();
                this.#retained.splice(this.#retained.indexOf(retained), 1);
            }
            catch {
                // The exact process lease remains available for the next retry.
            }
        }
        failures.push(...this.#retained.map(({ error }) => error));
        const workspace = await this.#workspace;
        if (this.#retained.length === 0) {
            if (workspace?.ok === true) {
                this.#roots.push(workspace.value);
                this.#workspace = undefined;
            }
            for (const owned of [...this.#roots])
                try {
                    await owned.cleanup.release();
                    this.#roots.splice(this.#roots.indexOf(owned), 1);
                }
                catch (cause) {
                    const failure = new ProviderCleanupError(KUNA_PROVIDER_ID, [owned.root.path], { reason: errorMessage(cause) }, { cause });
                    owned.cleanup.bindCleanupError(failure);
                    failures.push(failure);
                }
        }
        return failures.length === 0
            ? ok(null)
            : err(providerCleanupErrorFromFailures(KUNA_PROVIDER_ID, failures, failures
                .map((failure) => String(failure.diagnostics?.["reason"] ?? failure.message))
                .join("; "), {
                operation: "close_binary",
                message: "Kuna command cleanup remains incomplete",
            }));
    }
    async #admit(operation, work) {
        try {
            return await this.#resources.run(work);
        }
        catch (cause) {
            if (cause instanceof ArtifactReaderFailure &&
                cause.cleanup !== undefined) {
                const failure = new ProviderCleanupError(KUNA_PROVIDER_ID, cause.cleanup.resources, { reason: cause.cleanup.reason }, { cause, operation });
                bindArtifactFileCleanup(cause, failure);
                return err(failure);
            }
            if (this.#closing && cause instanceof ArtifactReaderFailure)
                return err(cancelledBy(operation, carriedReason(cause)));
            throw cause;
        }
    }
    async #ensureWorkspace() {
        const pending = (this.#workspace ??= this.#createWorkspace());
        const result = await pending;
        if (this.#workspace === pending &&
            !result.ok &&
            !result.error.cleanupIncomplete)
            this.#workspace = undefined;
        return result;
    }
    async #createWorkspace() {
        let owned;
        try {
            const root = await PrivateRuntimeRoot.create({ prefix: "rea-kuna-" });
            const copyResources = new ArtifactResourceScope();
            owned = {
                root,
                cleanup: new AnalysisCleanupLease(async () => {
                    await copyResources.close();
                    await root.close();
                }, [root.path]),
            };
            const input = join(root.path, basename(this.target.path));
            let copied;
            try {
                copied = await copyAndHash(this.target.path, input, {
                    signal: this.lifetime.signal,
                    resources: copyResources,
                    ...(this.lifetime.inputPrefix === undefined
                        ? {}
                        : { keep: this.lifetime.inputPrefix }),
                });
            }
            catch (cause) {
                return await this.#workspaceFailure(classifyProviderFailure(cause, KUNA_WORKSPACE_COPY_DIALECT), owned);
            }
            if (copied.sha256 !== this.target.sha256)
                return await this.#workspaceFailure(new AnalysisArtifactChangedError("kuna:workspace", this.target.path, "the target no longer matches the digest selected for analysis"), owned);
            try {
                await prepareProcessOwnershipInspection(this.lifetime.signal);
            }
            catch (cause) {
                const primary = processInspectionCancellationError(cause, "kuna:workspace") ??
                    new ProviderAdapterError(KUNA_PROVIDER_ID, "kuna:workspace", {
                        cause,
                    });
                throw retainProcessInspectionCleanup(cause, primary, this.#resources, "kuna:workspace");
            }
            return ok({
                ...owned,
                input: await realpath(input),
                bytes: copied.bytes,
                prefix: copied.prefix,
            });
        }
        catch (cause) {
            return this.#workspaceFailure(cause instanceof AnalysisError
                ? cause
                : new ProviderAdapterError(KUNA_PROVIDER_ID, "kuna:workspace", {
                    cause,
                    userMessage: `Kuna workspace failed: ${errorMessage(cause)}`,
                }), owned);
        }
    }
    /** Rollback and the original outcome share the exact root cleanup lease. */
    async #workspaceFailure(primary, owned) {
        let failure = primary;
        if (owned !== undefined) {
            try {
                await owned.cleanup.release();
            }
            catch (cause) {
                this.#roots.push(owned);
                const cleanup = new ProviderCleanupError(KUNA_PROVIDER_ID, [owned.root.path], { reason: errorMessage(cause) }, { cause, operation: "kuna:workspace" });
                owned.cleanup.bindCleanupError(cleanup);
                failure = analysisErrorWithCleanupDependencies(primary, cleanup, "kuna:workspace");
            }
        }
        return err(this.lifetime.signal.aborted
            ? analysisErrorWithCancellation(failure, cancelledBy("kuna:workspace", this.lifetime.signal))
            : failure);
    }
}
