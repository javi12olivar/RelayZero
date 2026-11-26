import { bindSessionEvidenceExecution } from "./SessionEvidenceReuse.js";
import { admitCompletedAnalysis } from "../investigation/admitCompletedAnalysis.js";
import { randomUUID } from "node:crypto";
import { writeEvidenceBundle, evidenceBundleExportReceipt, } from "../EvidenceBundleFiles.js";
import { retainSavedAnalysisSnapshot, } from "../../domain/savedAnalysisSnapshot.js";
import { AnalysisCleanupRelease } from "../../domain/analysisCleanupRelease.js";
import { analysisProfilesEqual, } from "../../domain/analysisProfile.js";
import { AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisOutputError, isAborted, cancelledBy, OwnerCancellation, } from "../../domain/analysisErrorCore.js";
import { AnalysisError, primaryAnalysisError, } from "../../domain/analysisErrorBase.js";
import { projectAnalysisError } from "../../domain/analysisErrorProjection.js";
import { err, ok } from "../../domain/result.js";
import { createAnalysisExecutionEvidence } from "../../domain/analysisObservation.js";
import { binaryTargetSummary } from "./BinaryTargetSummary.js";
import { SessionProviderRouter, } from "./SessionProviderRouter.js";
import { routeAllowsSnapshotReplay, routeProviderIdentity, } from "./SessionProviderPolicy.js";
import { InvestigationRecords } from "../investigation/InvestigationRecords.js";
import { recordEvidenceSources } from "../investigation/recordEvidenceSources.js";
import { recoverProviderSourceFailure } from "../investigation/sourcePublicationRecovery.js";
import { BinarySessionRecords } from "./BinarySessionRecords.js";
import { binarySessionStatus, currentRouteCapability, } from "./BinarySessionStatus.js";
import { SessionRuntimeAvailability } from "./SessionRuntimeAvailability.js";
import { isSourceEvidenceRetainable } from "./AnalysisSnapshotCache.js";
import { resolveSessionOpen, resolveSessionTarget, validateResolvedSessionTarget, } from "./BinarySessionOpen.js";
import { bindExecutionTarget, commitExecutionProfile, prepareSessionExecution, } from "./BinarySessionExecution.js";
import { closeAnalysisClient } from "../../providers/AnalysisClientCleanup.js";
import { analysisErrorWithCleanupDependencies, analysisErrorWithCloseRejection, analysisErrorWithCloseRejections, } from "../../domain/analysisErrorCleanup.js";
import { analysisErrorWithCancellation } from "../../domain/analysisErrorCancellation.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { profilelessNativeDispatchProfile } from "./ProfilelessNativeWorkflowSnapshot.js";
import { ResourceSnapshotMismatchError } from "../../domain/evidenceErrors.js";
import { parseBinaryTarget, } from "../BinaryTargetResolver.js";
import { resolveAppBundleResourceRoot } from "../AppBundleExecutable.js";
import { BUNDLE_RESOURCE_OPERATIONS } from "../../ports/BundleResourceOperations.js";
const trackCleanupFailures = (signal, operation) => {
    let error;
    let cleanupFailure;
    let cancellation;
    const observed = new Set();
    return {
        get error() {
            return error;
        },
        onFailure: (failure) => {
            if (observed.has(failure) ||
                (failure.cleanupPrimary !== undefined &&
                    observed.has(failure.cleanupPrimary)))
                return;
            observed.add(failure);
            if (cleanupFailure === undefined) {
                if (isAborted(signal))
                    cancellation = cancelledBy(operation, signal);
                cleanupFailure = failure;
            }
            else {
                // Both operands are cleanup observations here. An earlier rejection
                // without a live lifecycle must not disappear when a later owner resolves.
                cleanupFailure = analysisErrorWithCloseRejections(cleanupFailure, failure, operation);
            }
            error =
                cancellation === undefined
                    ? cleanupFailure
                    : analysisErrorWithCloseRejection(cancellation, cleanupFailure, operation);
        },
    };
};
/** Provider metadata cannot confer authority to an uncommitted Evidence ID. */
const unrecordedExecution = (result) => {
    if (!result.ok || !("evidenceId" in result.value))
        return result;
    const observation = { ...result.value };
    delete observation.evidenceId;
    return ok(observation);
};
/**
 * Owns the single active target shared by CLI and MCP adapters.
 *
 * Target transitions are serialized because switching targets tears down the
 * active provider client. A failed switch recreates the previous target instead
 * of retaining a client whose resources were already shut down.
 */
export class BinarySession extends BinarySessionRecords {
    #active;
    #externalMutationCleanupFailure;
    #lastCloseCleanupFailure;
    #pendingCleanup;
    #transition = Promise.resolve();
    #transitionGeneration = 0;
    #transitionPending = 0;
    /** Process shutdown has begun; later target acquisition must not outlive it. */
    #shutdownStarted = false;
    #calls = new Map();
    #promptCompletionControllers = new Set();
    #providerRouter;
    #bundleResourceFactory;
    #activeBundleResources;
    #pendingBundleResourceCleanup = [];
    #runtimeAvailability = new SessionRuntimeAvailability();
    #availabilityListeners = new Set();
    constructor(providerRouter, records = new InvestigationRecords(), bundleResourceFactory) {
        super(records);
        this.#providerRouter = providerRouter;
        this.#bundleResourceFactory = bundleResourceFactory;
    }
    /** Create an isolated session over this session's auxiliary providers. */
    createManagedBinarySession() {
        return new BinarySession(this.#providerRouter.auxiliaryOnly());
    }
    /** Open an app resource root without requiring CFBundleExecutable. */
    openBundleResources(path, options = {}) {
        return this.#serialize(async (admittedThrough) => {
            const refused = this.#targetAcquisitionRefused("open_bundle_resources", options.signal);
            if (refused !== undefined)
                return refused;
            await this.#drainCalls(admittedThrough);
            if (isAborted(options.signal))
                return err(cancelledBy("open_bundle_resources", options.signal));
            if (this.#externalMutationCleanupFailure?.cleanupIncomplete === true)
                return err(this.#externalMutationCleanupFailure);
            if (this.#bundleResourceFactory === undefined)
                return err(new AnalysisCapabilityUnavailableError("bundle-resources", "open_bundle_resources", "No app resource reader is configured."));
            const resolved = await resolveAppBundleResourceRoot(path);
            if (!resolved.ok)
                return resolved;
            if (isAborted(options.signal))
                return err(cancelledBy("open_bundle_resources", options.signal));
            const pendingClosed = await this.#retryPendingCleanup();
            if (!pendingClosed.ok)
                return pendingClosed;
            const pendingResourcesClosed = await this.#retryPendingBundleResourceCleanup();
            if (!pendingResourcesClosed.ok)
                return pendingResourcesClosed;
            if (isAborted(options.signal))
                return err(cancelledBy("open_bundle_resources", options.signal));
            const runId = randomUUID();
            let bundleClient;
            try {
                bundleClient = await this.#bundleResourceFactory.createClient(resolved.value);
            }
            catch (cause) {
                return err(cause instanceof AnalysisError
                    ? cause
                    : new ProviderAdapterError("bundle-resources", "open_bundle_resources", { cause }));
            }
            const candidate = {
                root: resolved.value,
                client: bundleClient.client,
                capabilities: bundleClient.capabilities,
                runId,
            };
            const started = await candidate.client.execute("health", {}, options);
            if (!started.ok) {
                this.#pendingBundleResourceCleanup.push(candidate);
                const closed = await this.#retryPendingBundleResourceCleanup();
                return err(closed.ok
                    ? started.error
                    : analysisErrorWithCloseRejection(started.error, closed.error, "open_bundle_resources"));
            }
            if (isAborted(options.signal)) {
                const cancelled = cancelledBy("open_bundle_resources", options.signal);
                this.#pendingBundleResourceCleanup.push(candidate);
                const closed = await this.#retryPendingBundleResourceCleanup();
                return err(closed.ok
                    ? cancelled
                    : analysisErrorWithCloseRejection(cancelled, closed.error, "open_bundle_resources"));
            }
            const cleanupFailures = trackCleanupFailures(options.signal, "open_bundle_resources");
            const closed = await this.#closeActive({}, cleanupFailures.onFailure);
            if (!closed.ok) {
                this.#pendingBundleResourceCleanup.push(candidate);
                const candidateClosed = await this.#retryPendingBundleResourceCleanup(undefined, cleanupFailures.onFailure);
                const primary = cleanupFailures.error ?? closed.error;
                return err(cleanupFailures.error ??
                    (candidateClosed.ok
                        ? primary
                        : analysisErrorWithCloseRejections(primary, candidateClosed.error, "open_bundle_resources")));
            }
            if (isAborted(options.signal)) {
                const cancelled = cancelledBy("open_bundle_resources", options.signal);
                this.#pendingBundleResourceCleanup.push(candidate);
                const candidateClosed = await this.#retryPendingBundleResourceCleanup(undefined, cleanupFailures.onFailure);
                return err(cleanupFailures.error ??
                    (candidateClosed.ok
                        ? cancelled
                        : analysisErrorWithCloseRejection(cancelled, candidateClosed.error, "open_bundle_resources")));
            }
            this.#activeBundleResources = candidate;
            this.resetSnapshotInvalidation();
            return resolved;
        });
    }
    /**
     * Fast-path liveness gate (#1719): short-circuit only when the retained
     * client is genuinely alive. The probe reads the child's operation health
     * rather than the composite's unconditionally-ok `health`, so a dead child
     * falls through and a real client is started; an aborted caller leaves the
     * session untouched. Returns the fast-path result, or undefined to fall
     * through to the slow path.
     */
    async #tryRetainedFastPath(retained, target, options) {
        const live = await this.#retainedClientLive(retained.client, options);
        if (isAborted(options.signal))
            return err(cancelledBy("open_binary", options.signal));
        if (!live)
            return undefined;
        if (options.snapshot !== undefined) {
            const imported = this.importAnalysisSnapshot(options.snapshot);
            if (!imported.ok)
                return imported;
        }
        // The same bytes can be selected through a different spelling without retiring the engine.
        if (retained.target.callerInputPath !== target.callerInputPath)
            this.#active = { ...retained, target };
        return ok(target);
    }
    /** Identify the provider producing evidence for this session. */
    providerIdentity(operation) {
        return routeProviderIdentity(this.#currentRoute(), operation);
    }
    /** External live state cannot be replayed by a direct or composed CLI workflow. */
    allowsSnapshotReplay(operation) {
        if (operation === "decompile_all")
            return false;
        if (this.#activeBundleResources !== undefined)
            return false;
        return routeAllowsSnapshotReplay(this.#active?.route, operation);
    }
    /** Return the selected immutable profile, optionally scoped to an operation. */
    analysisProfile(operation) {
        const profile = this.#active?.profile;
        if (profile === null || profile === undefined) {
            if (operation !== "inspect_native_dispatch_metadata")
                return undefined;
            return this.#active?.profilelessWorkflowProfile === undefined
                ? undefined
                : structuredClone(this.#active.profilelessWorkflowProfile);
        }
        if (operation !== undefined &&
            this.providerIdentity(operation).id !== profile.provider.id)
            return undefined;
        return structuredClone(profile);
    }
    /** Observe runtime provider-health changes that affect discovery metadata. */
    onAvailabilityChanged(listener) {
        this.#availabilityListeners.add(listener);
        return () => this.#availabilityListeners.delete(listener);
    }
    /** Resolve target identity under this session's file cleanup owner. */
    resolveTarget(path, options = {}) {
        return parseBinaryTarget(path, {
            ...options,
            resources: this.fileResources,
        });
    }
    /** Resolve a target and provider profile without creating a provider client. */
    previewTarget(target, options = {}) {
        if (isAborted(options.signal))
            return Promise.resolve(err(cancelledBy("open_binary", options.signal)));
        return resolveSessionTarget({
            router: this.#providerRouter,
            current: this.#active,
            target,
            options,
            stagedSnapshotMismatch: (target, profile) => this.snapshotMismatch(target, profile),
        }).then((resolved) => resolved.ok && isAborted(options.signal)
            ? err(cancelledBy("open_binary", options.signal))
            : resolved);
    }
    /**
     * Open or switch targets after draining calls against the current target.
     * Returns the switch failure even if best-effort restoration also fails.
     */
    open(path, options = {}) {
        return this.#open((admitted) => resolveSessionOpen({
            resources: this.fileResources,
            router: this.#providerRouter,
            current: this.#active,
            path,
            options: admitted,
            stagedSnapshotMismatch: (target, profile) => this.snapshotMismatch(target, profile),
        }), options);
    }
    /** Open a previewed target without repeating parsing or provider profile discovery. */
    openResolvedTarget(resolved, options = {}) {
        return this.#open(() => Promise.resolve(validateResolvedSessionTarget({
            ...resolved,
            current: this.#active,
            options,
            stagedSnapshotMismatch: (target, profile) => this.snapshotMismatch(target, profile),
        })), options);
    }
    #open(resolve, options) {
        return this.#serialize(async (admittedThrough) => {
            const attempt = async () => {
                const refused = this.#targetAcquisitionRefused("open_binary", options.signal);
                if (refused !== undefined)
                    return refused;
                const admitted = await this.#withLoadedSnapshot(options);
                if (!admitted.ok)
                    return admitted;
                return this.#openWithinTransition(admittedThrough, () => resolve(admitted.value), admitted.value);
            };
            const result = await attempt();
            if (result.ok)
                return result;
            return {
                ...result,
                selection: this.#openSelectionReceipt(),
                targetAtCompletion: this.#active === undefined
                    ? null
                    : binaryTargetSummary(this.#active.target),
                providerIdAtCompletion: this.#active?.route.binding?.identity.id ?? null,
            };
        });
    }
    #openSelectionReceipt() {
        if (this.#active !== undefined)
            return {
                kind: "binary",
                path: this.#active.target.path,
                sha256: this.#active.target.sha256,
                ...(this.#active.target.callerInputPath === undefined
                    ? {}
                    : { caller_input_path: this.#active.target.callerInputPath }),
            };
        if (this.#activeBundleResources !== undefined)
            return {
                kind: "resources",
                path: this.#activeBundleResources.root.canonicalPath,
                caller_path: this.#activeBundleResources.root.callerPath,
            };
        return { kind: "none" };
    }
    /** Read the staged snapshot only after earlier lifecycle transitions have settled. */
    async #withLoadedSnapshot(options) {
        if (options.loadSnapshot === undefined)
            return ok(options);
        if (isAborted(options.signal))
            return err(cancelledBy("open_binary", options.signal));
        const loaded = await options.loadSnapshot();
        if (!loaded.ok)
            return loaded;
        const { loadSnapshot: _loaded, ...rest } = options;
        return ok({ ...rest, snapshot: loaded.value });
    }
    async #openWithinTransition(admittedThrough, resolve, options) {
        if (this.#externalMutationCleanupFailure?.cleanupIncomplete === true)
            return err(this.#externalMutationCleanupFailure);
        if (isAborted(options.signal))
            return err(cancelledBy("open_binary", options.signal));
        const resolved = await resolve();
        if (!resolved.ok)
            return resolved;
        const { target, sameTarget } = resolved.value;
        let { route } = resolved.value;
        let { profile } = route;
        if (isAborted(options.signal))
            return err(cancelledBy("open_binary", options.signal));
        const activeProfile = this.#active?.profile;
        const sameProfile = activeProfile === null || activeProfile === undefined
            ? profile === null
            : profile !== null && analysisProfilesEqual(activeProfile, profile);
        await this.#drainCalls(admittedThrough);
        if (isAborted(options.signal))
            return err(cancelledBy("open_binary", options.signal));
        const pendingClosed = await this.#retryPendingCleanup();
        if (!pendingClosed.ok)
            return pendingClosed;
        const pendingResourcesClosed = await this.#retryPendingBundleResourceCleanup();
        if (!pendingResourcesClosed.ok)
            return pendingResourcesClosed;
        if (isAborted(options.signal))
            return err(cancelledBy("open_binary", options.signal));
        const retained = sameTarget && sameProfile ? this.#active : undefined;
        if (retained !== undefined) {
            const fastPath = await this.#tryRetainedFastPath(retained, target, options);
            if (fastPath !== undefined)
                return fastPath;
        }
        const previous = this.#active;
        this.#active = undefined;
        if (previous !== undefined) {
            const closed = await this.#retireClient(previous);
            if (!closed.ok) {
                // A failed open retires the provider cache, not the investigation.
                // Preserve Evidence and Unknown history for export and recovery.
                this.clearSnapshot();
                this.#clearRuntimeAvailability();
                if (isAborted(options.signal))
                    return err(analysisErrorWithCleanupDependencies(cancelledBy("open_binary", options.signal), closed.error, "open_binary"));
                return closed;
            }
        }
        if (isAborted(options.signal))
            return err(await this.#restoreAfterFailedOpen(previous, cancelledBy("open_binary", options.signal)));
        if (previous !== undefined) {
            const refreshed = await this.#providerRouter.refreshAfterRetirement(route, target, options.signal);
            const admitted = refreshed.ok
                ? validateResolvedSessionTarget({
                    target,
                    route: refreshed.value,
                    current: previous,
                    options,
                    stagedSnapshotMismatch: (target, profile) => this.snapshotMismatch(target, profile),
                })
                : refreshed;
            if (!admitted.ok)
                return err(await this.#restoreAfterFailedOpen(previous, admitted.error));
            route = admitted.value.route;
            profile = route.profile;
        }
        const runId = randomUUID();
        const client = route.createClient(target, {
            runId,
        });
        const run = { client, route, runId };
        const started = await client.execute("health", {}, options);
        if (!started.ok) {
            return err(await this.#failedOpen(run, previous, started.error));
        }
        if (isAborted(options.signal)) {
            return err(await this.#failedOpen(run, previous, cancelledBy("open_binary", options.signal)));
        }
        const cleanupFailures = trackCleanupFailures(options.signal, "open_binary");
        if (this.#activeBundleResources !== undefined) {
            this.#pendingBundleResourceCleanup.push(this.#activeBundleResources);
            this.#activeBundleResources = undefined;
            const retiredResources = await this.#retryPendingBundleResourceCleanup(undefined, cleanupFailures.onFailure);
            if (!retiredResources.ok) {
                const primary = cleanupFailures.error ?? retiredResources.error;
                const failed = await this.#failedOpen(run, previous, primary, cleanupFailures.onFailure);
                return err(cleanupFailures.error ?? failed);
            }
        }
        if (isAborted(options.signal)) {
            const cancelled = cancelledBy("open_binary", options.signal);
            const failed = await this.#failedOpen(run, previous, cancelled, cleanupFailures.onFailure);
            return err(cleanupFailures.error ?? failed);
        }
        const profilelessWorkflowProfile = profile === null ? profilelessNativeDispatchProfile(route) : undefined;
        this.#active = {
            target,
            profile,
            ...(profilelessWorkflowProfile === undefined
                ? {}
                : { profilelessWorkflowProfile }),
            ...run,
            nativeSourceAdmitted: false,
        };
        this.#clearRuntimeAvailability();
        this.resetSnapshotInvalidation();
        if (options.snapshot === undefined) {
            if (profile === null)
                this.clearSnapshot();
            else
                this.selectSnapshot(target, profile);
        }
        if (options.snapshot !== undefined) {
            const imported = this.importAnalysisSnapshot(options.snapshot);
            if (!imported.ok) {
                this.#active = undefined;
                return err(await this.#failedOpen(run, previous, imported.error));
            }
        }
        return ok(target);
    }
    /** Serialize an external mutation and retire the potentially stale analysis. */
    withAdmittedExternalMutation(_path, signal, operation, completionFailure, operationName = "execute_rizin_command", cleanupRecovery) {
        if (this.#shutdownStarted)
            return Promise.resolve(err(cancelledBy(operationName, isAborted(signal) ? signal : OwnerCancellation.ownerClosed)));
        return this.#serialize(async (admittedThrough) => {
            if (this.#activeBundleResources !== undefined)
                return err(new AnalysisCapabilityUnavailableError("bundle-resources", operationName, "External mutation requires an active executable analysis target."));
            if (isAborted(signal))
                return err(cancelledBy(operationName, signal));
            await this.#drainCalls(admittedThrough);
            if (isAborted(signal))
                return err(cancelledBy(operationName, signal));
            if (this.#externalMutationCleanupFailure?.cleanupIncomplete === true) {
                if (cleanupRecovery === undefined)
                    return err(this.#externalMutationCleanupFailure);
                const recovered = await cleanupRecovery(this.#externalMutationCleanupFailure);
                if (!recovered.ok)
                    return err(isAborted(signal)
                        ? analysisErrorWithCancellation(recovered.error, cancelledBy(operationName, signal))
                        : recovered.error);
                if (this.#externalMutationCleanupFailure.cleanupIncomplete)
                    return err(isAborted(signal)
                        ? analysisErrorWithCancellation(this.#externalMutationCleanupFailure, cancelledBy(operationName, signal))
                        : this.#externalMutationCleanupFailure);
                this.#externalMutationCleanupFailure = undefined;
            }
            const pendingCleanup = await this.#retryPendingCleanup();
            if (!pendingCleanup.ok)
                return err(isAborted(signal)
                    ? analysisErrorWithCancellation(pendingCleanup.error, cancelledBy(operationName, signal))
                    : pendingCleanup.error);
            if (isAborted(signal))
                return err(cancelledBy(operationName, signal));
            const activeAtDispatch = this.#active;
            if (activeAtDispatch?.route.binding?.identity.id === "ghidra")
                return err(new AnalysisOutputError(operationName, "Close the active Ghidra session explicitly before an external mutation; rebinding would discard its ephemeral analysis edits."));
            // A protocol reply does not prove that background writers have stopped.
            // Retire the old analysis and require an explicit fresh open rather than
            // silently binding a snapshot while an unrestricted command can still write.
            const retireTarget = activeAtDispatch !== undefined;
            this.invalidateSnapshot();
            const value = await operation();
            this.#externalMutationCleanupFailure =
                !value.ok && value.error.cleanupIncomplete ? value.error : undefined;
            if (retireTarget) {
                const retired = await this.#closeActive({});
                if (!retired.ok) {
                    const primary = completionFailure(value, retired.error);
                    const failure = retired.error.cleanupIncomplete && primary !== retired.error
                        ? analysisErrorWithCleanupDependencies(primary, retired.error, operationName)
                        : primary;
                    return err(isAborted(signal)
                        ? analysisErrorWithCancellation(failure, cancelledBy(operationName, signal))
                        : failure);
                }
            }
            if (isAborted(signal))
                return err(completionFailure(value, cancelledBy(operationName, signal)));
            return ok(value);
        });
    }
    /**
     * Reject target acquisition once process shutdown has begun.
     * Acquisition already inside its transition still finishes; the shutdown
     * close queued behind that transition retires it.
     */
    beginShutdown() {
        this.#shutdownStarted = true;
    }
    #targetAcquisitionRefused(operation, signal) {
        if (!this.#shutdownStarted)
            return undefined;
        return err(cancelledBy(operation, isAborted(signal) ? signal : OwnerCancellation.ownerClosed));
    }
    /** Release the engine and replay state while retaining investigation history. */
    close(options = {}) {
        return this.#serialize(async (admittedThrough) => {
            await this.#drainCalls(admittedThrough);
            return this.#offerCleanupRetry(await this.#closeActive(options), options.cleanupRetry);
        });
    }
    /** Drain earlier requests, save an immutable snapshot, and close under one lifecycle lock. */
    closeWithSnapshot(path, overwrite, options = {}) {
        return this.#serialize(async (admittedThrough) => {
            await this.#drainCalls(admittedThrough);
            const snapshot = this.exportAnalysisSnapshot();
            if (!snapshot.ok)
                return snapshot;
            const written = await this.writeAnalysisSnapshot(snapshot.value, path, overwrite);
            if (!written.ok)
                return written;
            const receipt = {
                ...written.value,
                primitive_entries: snapshot.value.entries.length,
                workflow_entries: snapshot.value.workflow_entries.length,
                evidence_records: snapshot.value.evidence_bundle.records.length,
            };
            // A failed export or save returned above with the target still open, so
            // only a failed retirement can offer the caller's cleanup retry.
            const closed = this.#offerCleanupRetry(await this.#closeActive(options), options.cleanupRetry);
            return closed.ok
                ? ok(receipt)
                : err(retainSavedAnalysisSnapshot(closed.error, receipt));
        });
    }
    /** Explicit whole-runtime disposal, separate from reusable engine cleanup. */
    dispose(options = {}) {
        this.beginShutdown();
        return this.#serialize(async (admittedThrough) => {
            await this.#drainCalls(admittedThrough);
            const closed = await this.#closeActive(options);
            if (closed.ok)
                this.disposeInvestigationRecords();
            return closed;
        });
    }
    /** Save once at an explicit boundary, then end the investigation atomically. */
    resetInvestigation(options = {}) {
        if (this.#shutdownStarted)
            return Promise.resolve(err(cancelledBy("reset_investigation", isAborted(options.signal)
                ? options.signal
                : OwnerCancellation.ownerClosed)));
        return this.#serialize(async (admittedThrough) => {
            await this.#drainCalls(admittedThrough);
            if (isAborted(options.signal))
                return err(cancelledBy("reset_investigation", options.signal));
            const adapterResources = await options.retryCleanup?.();
            if (adapterResources !== undefined && !adapterResources.ok)
                return adapterResources;
            if (this.#externalMutationCleanupFailure?.cleanupIncomplete === true)
                return err(this.#externalMutationCleanupFailure);
            const pending = await this.#retryPendingCleanup();
            if (!pending.ok)
                return pending;
            const bundles = await this.#retryPendingBundleResourceCleanup();
            if (!bundles.ok)
                return bundles;
            const files = await this.closeFileResources();
            if (!files.ok)
                return files;
            if (this.#providerRouter.hasPendingOwnedResources()) {
                const candidates = await this.#providerRouter.closeOwnedResources();
                if (!candidates.ok)
                    return candidates;
            }
            if (isAborted(options.signal))
                return err(cancelledBy("reset_investigation", options.signal));
            const statistics = this.investigationStatistics();
            let saved;
            if (options.savePath !== undefined) {
                const bundle = this.immutableEvidenceBundle();
                const written = await writeEvidenceBundle(bundle, options.savePath, options.overwrite ?? false, this.fileResources, options.signal, "reset_investigation");
                if (!written.ok)
                    return written;
                saved = evidenceBundleExportReceipt(bundle, written.value);
            }
            // Publication can win cancellation. Report the committed file but retain
            // the investigation if cancellation arrived during publication/cleanup.
            if (isAborted(options.signal))
                return err(cancelledBy("reset_investigation", options.signal, saved === undefined ? {} : { diagnostics: { saved_bundle: saved } }));
            this.clearInvestigationRecords();
            return ok({
                cleared_evidence_records: statistics.evidence_records,
                cleared_unknown_revisions: statistics.unknown_revisions,
                cleared_unknown_heads: statistics.unknown_heads,
                retained_target: this.#active !== undefined ||
                    this.#activeBundleResources !== undefined,
                ...(saved === undefined ? {} : { saved_bundle: saved }),
            });
        });
    }
    /** Offer the caller's retry only while this session retains the failed cleanup. */
    #offerCleanupRetry(closed, retry) {
        this.#lastCloseCleanupFailure = undefined;
        if (!closed.ok &&
            retry !== undefined &&
            closed.error.cleanupIncomplete &&
            this.#retainsCloseCleanup()) {
            closed.error.bindCleanupRetry(retry);
            this.#lastCloseCleanupFailure = closed.error;
        }
        return closed;
    }
    /** Only a retired target's known close owner can offer this status retry. */
    #statusCleanupRetry() {
        if (this.#active !== undefined ||
            this.#activeBundleResources !== undefined ||
            this.#externalMutationCleanupFailure?.cleanupIncomplete === true ||
            !this.#retainsCloseCleanup())
            return undefined;
        return this.#lastCloseCleanupFailure?.cleanupRetry;
    }
    /** Owners the next close retries; external mutation owners retry elsewhere. */
    #retainsCloseCleanup() {
        return (this.#pendingCleanup !== undefined ||
            this.#pendingBundleResourceCleanup.length > 0 ||
            this.hasPendingFileResources ||
            this.#providerRouter.hasPendingOwnedResources());
    }
    async #closeActive(options, onCleanupFailure) {
        const previous = this.#active;
        const previousResources = this.#activeBundleResources;
        this.#active = undefined;
        this.#activeBundleResources = undefined;
        if (previousResources !== undefined)
            this.#pendingBundleResourceCleanup.push(previousResources);
        const closing = previous === undefined
            ? this.#retryPendingCleanup(options.progress, options.retainProviderDocuments, onCleanupFailure)
            : this.#retireClient(previous, {
                ...(options.progress === undefined
                    ? {}
                    : { progress: options.progress }),
                ...(options.retainProviderDocuments === true
                    ? { retainDocument: true }
                    : {}),
                ...(onCleanupFailure === undefined ? {} : { onCleanupFailure }),
            });
        // Register the retiring resource owner before notifying observers that
        // the engine/cache is gone. Cleanup is still pending at this boundary.
        this.clearEngineRecords();
        this.#clearRuntimeAvailability();
        const closed = await closing;
        const fileResources = await this.closeFileResources();
        if (!fileResources.ok)
            onCleanupFailure?.(fileResources.error);
        const candidateResources = await this.#providerRouter.closeOwnedResources();
        if (!candidateResources.ok)
            onCleanupFailure?.(candidateResources.error);
        const bundleClosed = await this.#retryPendingBundleResourceCleanup(options.progress, onCleanupFailure);
        const resourceFailures = [
            ...(bundleClosed.ok ? [] : [bundleClosed.error]),
            ...(fileResources.ok ? [] : [fileResources.error]),
            ...(candidateResources.ok ? [] : [candidateResources.error]),
        ];
        let resourceFailure = resourceFailures[0];
        for (const next of resourceFailures.slice(1))
            if (resourceFailure !== undefined) {
                resourceFailure = analysisErrorWithCloseRejections(resourceFailure, next, "close_binary");
            }
        if (!closed.ok && resourceFailure !== undefined) {
            return err(analysisErrorWithCloseRejections(closed.error, resourceFailure, "close_binary"));
        }
        if (!closed.ok)
            return closed;
        return resourceFailure === undefined ? ok(null) : err(resourceFailure);
    }
    async #retryPendingBundleResourceCleanup(progress, onCleanupFailure) {
        if (this.#pendingBundleResourceCleanup.length === 0)
            return ok(null);
        const pending = this.#pendingBundleResourceCleanup;
        const retained = [];
        let failure;
        for (const session of pending) {
            const closed = await closeAnalysisClient(session.client, "bundle-resources", {
                ...(progress === undefined ? {} : { progress }),
                ...(onCleanupFailure === undefined ? {} : { onCleanupFailure }),
            });
            if (!closed.ok) {
                retained.push(session);
                failure =
                    failure === undefined
                        ? closed.error
                        : analysisErrorWithCloseRejections(failure, closed.error, "close_binary");
            }
        }
        this.#pendingBundleResourceCleanup = retained;
        return failure === undefined ? ok(null) : err(failure);
    }
    async #retireClient(run, options = {}) {
        this.#pendingCleanup = {
            run,
            retainDocument: options.retainDocument === true,
            release: new AnalysisCleanupRelease(),
        };
        return this.#retryPendingCleanup(options.progress, undefined, options.onCleanupFailure);
    }
    async #retryPendingCleanup(progress, retainDocument, onCleanupFailure) {
        let pending = this.#pendingCleanup;
        if (pending === undefined)
            return ok(null);
        if (retainDocument !== undefined) {
            pending = { ...pending, retainDocument };
            this.#pendingCleanup = pending;
        }
        const closed = await closeAnalysisClient(pending.run.client, pending.run.route.identity.id, {
            ...(progress === undefined ? {} : { progress }),
            ...(pending.retainDocument ? { retainDocument: true } : {}),
            onCleanupFailure: (failure) => {
                pending.release.bindUnowned(failure);
                onCleanupFailure?.(failure);
            },
        });
        if (closed.ok) {
            pending.release.confirm();
            this.#pendingCleanup = undefined;
        }
        else
            pending.release.bindUnowned(closed.error);
        return closed;
    }
    async #failedOpen(run, previous, primary, onCleanupFailure) {
        const closed = await this.#retireClient(run, onCleanupFailure === undefined ? {} : { onCleanupFailure });
        if (!closed.ok)
            return analysisErrorWithCloseRejection(primary, closed.error, "open_binary");
        return this.#restoreAfterFailedOpen(previous, primary);
    }
    async #restoreAfterFailedOpen(previous, primary) {
        const restored = await this.#restore(previous);
        if (restored.ok)
            return primary;
        primary.retainSecondaryFailure(restored.error, {
            restoration_error: projectAnalysisError(primaryAnalysisError(restored.error)),
        });
        return restored.error.cleanupIncomplete
            ? analysisErrorWithCloseRejection(primary, restored.error, "open_binary")
            : primary;
    }
    /** Describe the active binary session. */
    status(options = {}) {
        return options.refreshCandidates === true
            ? this.#serialize(() => this.#status(options), { abortPrompts: false })
            : this.#status(options);
    }
    /** Keep an explicit candidate refresh ordered with target transitions. */
    #status(options) {
        const resourceRun = this.#activeBundleResources;
        const run = this.#active ??
            resourceRun ??
            this.#pendingBundleResourceCleanup[0] ??
            this.#pendingCleanup?.run;
        const client = run?.client;
        const cleanupRetry = this.#statusCleanupRetry();
        return binarySessionStatus({
            ...options,
            investigation: this.investigationStatistics(),
            target: this.#active?.target,
            ...(resourceRun === undefined
                ? {}
                : {
                    bundleResourceRoot: resourceRun.root,
                    resourceCapabilities: resourceRun.capabilities,
                }),
            route: this.#currentRoute(),
            router: this.#providerRouter,
            runtimeUnavailability: this.#runtimeAvailability.entries,
            runId: run?.runId,
            runtimeLineageSnapshots: client?.runtimeLineageSnapshots?.() ?? [],
            requestActivitySnapshots: client?.requestActivitySnapshots?.() ?? [],
            providerOperationHealth: client?.operationHealthSnapshot?.() ?? null,
            ...(cleanupRetry === undefined ? {} : { cleanupRetry }),
            cleanupPending: this.#externalMutationCleanupFailure?.cleanupIncomplete === true ||
                this.#retainsCloseCleanup(),
        });
    }
    /** Return the immutable artifact identity captured before its provider started. */
    activeTarget() {
        return this.#active === undefined
            ? undefined
            : structuredClone(this.#active.target);
    }
    exportAnalysisSnapshot() {
        if (this.#activeBundleResources !== undefined)
            return err(new ResourceSnapshotMismatchError("export"));
        return super.exportAnalysisSnapshot();
    }
    importAnalysisSnapshot(snapshot) {
        if (this.#activeBundleResources !== undefined)
            return err(new ResourceSnapshotMismatchError("import"));
        return super.importAnalysisSnapshot(snapshot);
    }
    activeAnalysisBinding() {
        return this.#active;
    }
    /**
     * Invoke a provider operation against the active target.
     * Calls may overlap, but a pending target transition prevents new calls from
     * entering until the transition has settled.
     */
    execute(name, arguments_, options) {
        return this.#trackedExecute(name, arguments_, options);
    }
    /** Preserve the one-shot caller's Evidence identity if source retention fails. */
    executeForDirectObservation(name, arguments_, evidenceParameters, options) {
        return this.#trackedExecute(name, arguments_, options, evidenceParameters);
    }
    #trackedExecute(name, arguments_, options, recoveryParameters) {
        if (this.#shutdownStarted)
            return Promise.resolve(err(cancelledBy(name, isAborted(options?.signal)
                ? options.signal
                : OwnerCancellation.ownerClosed)));
        const generation = this.#transitionGeneration;
        const call = this.#execute(name, arguments_, options, this.#transition, recoveryParameters);
        this.#calls.set(call, generation);
        return call.finally(() => this.#calls.delete(call));
    }
    /** Run a prompt lookup only against an already connected provider child. */
    executeIfProviderReady(name, arguments_, options) {
        const active = this.#active;
        if (this.#shutdownStarted ||
            this.#transitionPending > 0 ||
            active === undefined ||
            active.client.executeIfReady === undefined)
            return Promise.resolve(undefined);
        const controller = new AbortController();
        this.#promptCompletionControllers.add(controller);
        const signal = options?.signal === undefined
            ? controller.signal
            : AbortSignal.any([controller.signal, options.signal]);
        const generation = this.#transitionGeneration;
        const call = active.client.executeIfReady(name, arguments_, {
            ...options,
            signal,
        });
        this.#calls.set(call, generation);
        return call.finally(() => {
            this.#calls.delete(call);
            this.#promptCompletionControllers.delete(controller);
        });
    }
    /** Admit one composed request until its result and session bookkeeping settle. */
    withAdmittedAnalysis(operationName, signal, operation) {
        if (this.#shutdownStarted)
            return Promise.resolve(err(cancelledBy(operationName, isAborted(signal) ? signal : OwnerCancellation.ownerClosed)));
        const generation = this.#transitionGeneration;
        const transition = this.#transition;
        const call = (async () => {
            const admission = await this.#waitForTransition(operationName, signal, transition);
            if (!admission.ok)
                return admission;
            return ok(await operation({
                resourceScope: this.resourceScope,
                execute: (name, arguments_, options) => this.#execute(name, arguments_, options, Promise.resolve()),
            }));
        })();
        // Register synchronously before a lifecycle transition can snapshot calls.
        this.#calls.set(call, generation);
        return call.finally(() => this.#calls.delete(call));
    }
    async #execute(name, arguments_, options, transition, recoveryParameters) {
        const transitioned = await this.#waitForTransition(name, options?.signal, transition);
        if (!transitioned.ok)
            return transitioned;
        const resources = this.#activeBundleResources;
        if (resources !== undefined) {
            if (!BUNDLE_RESOURCE_OPERATIONS.has(name))
                return err(new AnalysisCapabilityUnavailableError("bundle-resources", name, "This operation requires an executable analysis target; the active session contains only app resource access."));
            const result = unrecordedExecution(await resources.client.execute(name, arguments_, options));
            if (!result.ok)
                return result;
            const execution = { ...result.value, subject: null };
            return ok(execution);
        }
        const sessionBinding = this.#active;
        const prepared = prepareSessionExecution({
            active: sessionBinding,
            operation: name,
            parameters: arguments_,
            snapshotContext: options?.snapshotContext,
            nativeSourceAdmitted: sessionBinding?.nativeSourceAdmitted === true,
            isOperationAvailable: (operation) => this.#currentlyAvailable(operation),
            isOperationAdvertised: options?.isOperationAdvertised,
            unboundOperationError: (operation, route) => this.#providerRouter.unboundOperationError(operation, route),
            lookupSnapshot: (target, profile, operation, parameters) => this.lookupSnapshot(target, profile, operation, parameters),
        });
        if (!prepared.ok)
            return prepared;
        const { active, capability, profile, cacheable, cached } = prepared.value;
        if (cached !== undefined)
            return ok(cached);
        // A failed reply cannot prove that a dispatched metadata write rolled back.
        // Stop replay before dispatch, including reads overlapping the write.
        if (capability.effects.mutatesArtifact)
            this.invalidateSnapshot();
        const dispatch = this.#runtimeAvailability.dispatch();
        const dispatched = await active.client.execute(name, arguments_, options);
        const result = unrecordedExecution(dispatched);
        const profiled = bindExecutionTarget(commitExecutionProfile(name, result, profile), name, active.target);
        const execution = profiled.ok &&
            (name === "procedure_callers" || name === "procedure_callees") &&
            profiled.value.relationshipCoverage === undefined
            ? ok({
                ...profiled.value,
                relationshipCoverage: {
                    status: "unknown",
                    reason: "Provider did not report relationship coverage for this observation.",
                },
            })
            : profiled;
        // A successful Ghidra operation proves this client's native source snapshot
        // was admitted; a composite health response and parsed path do not.
        const currentBinding = this.#active;
        if (execution.ok &&
            capability.provider.id === "ghidra" &&
            currentBinding !== undefined &&
            currentBinding.runId === sessionBinding?.runId)
            currentBinding.nativeSourceAdmitted = true;
        if (this.#runtimeAvailability.observe(dispatch, capability, active.route.capabilities.values(), execution))
            this.#emitAvailabilityChanged();
        // Source facts belong to the observation, even when this query cannot be
        // replayed (for example a Ghidra procedure read without a document selector).
        if (execution.ok && execution.value.sourceEvidence !== undefined) {
            const sourcesRecorded = recordEvidenceSources((source) => this.recordEvidence(source), execution.value.sourceEvidence);
            if (!sourcesRecorded.ok) {
                recoverProviderSourceFailure({
                    error: sourcesRecorded.error,
                    operation: name,
                    parameters: recoveryParameters ?? arguments_,
                    execution: {
                        ...execution.value,
                        sourceEvidence: execution.value.sourceEvidence,
                        subject: execution.value.subject === undefined
                            ? active.target
                            : execution.value.subject,
                    },
                    admit: this.admitRecoveryObservation.bind(this),
                    evidenceForAnalysis: this.evidenceForAnalysis.bind(this),
                });
                return sourcesRecorded;
            }
        }
        if (execution.ok &&
            isSourceEvidenceRetainable(name, capability, arguments_, {
                snapshotContext: options?.snapshotContext,
                requiresSourceEvidence: execution.value.requiresSourceEvidence === true,
            }) &&
            profile !== undefined) {
            const evidenceExecution = {
                ...execution.value,
                analysisProfile: profile,
                subject: execution.value.subject === undefined
                    ? active.target
                    : execution.value.subject,
            };
            const admitted = admitCompletedAnalysis(name, arguments_, evidenceExecution, {
                callerTarget: active.target,
                admit: this.admitRecoveryObservation.bind(this),
            });
            if (!admitted.ok)
                return admitted;
            const evidence = createAnalysisExecutionEvidence(name, arguments_, evidenceExecution, "observed", { callerTarget: active.target });
            const recorded = this.recordEvidence(evidence);
            if (!recorded.ok) {
                // The provider finished. A full ledger must not discard that observation.
                recorded.error.retainPartialObservation(evidence);
                return recorded;
            }
            const authenticated = this.evidenceForAnalysis(evidence.evidence_id);
            const retained = authenticated === undefined
                ? { ...execution.value, evidenceId: evidence.evidence_id }
                : bindSessionEvidenceExecution({ ...execution.value, evidenceId: evidence.evidence_id }, authenticated, active.target.callerInputPath);
            if (cacheable && execution.value.cachePolicy !== "live")
                this.recordSnapshot({
                    target: active.target,
                    profile,
                    operation: name,
                    parameters: arguments_,
                    execution: retained,
                    evidence: this.evidenceForAnalysis(evidence.evidence_id) ?? evidence,
                });
            return ok(retained);
        }
        return execution;
    }
    /** Whether the active route can run an operation now, as status reports it. */
    #currentlyAvailable(operation) {
        const active = this.#active;
        const descriptor = active?.route.capabilities.get(operation);
        return (descriptor !== undefined &&
            currentRouteCapability(descriptor, active?.target, this.#runtimeAvailability.entries).available);
    }
    #clearRuntimeAvailability() {
        if (this.#runtimeAvailability.clear())
            this.#emitAvailabilityChanged();
    }
    #emitAvailabilityChanged() {
        for (const listener of this.#availabilityListeners) {
            try {
                const notification = listener();
                if (notification !== undefined) {
                    // best-effort cleanup: async observer notifications must not reject
                    // unhandled; state transitions and other listeners continue.
                    void notification.catch(() => undefined);
                }
            }
            catch (cause) {
                // External observers are best-effort notifications. Contain only the
                // callback failure so state transitions and other listeners continue.
                void cause;
            }
        }
    }
    #currentRoute() {
        return this.#active?.route ?? this.#providerRouter.initialRoute();
    }
    #serialize(operation, options = {}) {
        if (options.abortPrompts !== false)
            for (const controller of this.#promptCompletionControllers)
                controller.abort(OwnerCancellation.noLongerNeeded);
        this.#transitionPending += 1;
        // Later calls wait for this transition and must not be included in its drain.
        const admittedThrough = this.#transitionGeneration++;
        const perform = () => operation(admittedThrough);
        const result = this.#transition.then(perform, perform);
        this.#transition = result.then(() => undefined, () => undefined);
        const finish = () => {
            this.#transitionPending -= 1;
        };
        void result.then(finish, finish);
        return result;
    }
    async #drainCalls(admittedThrough) {
        await Promise.allSettled([...this.#calls]
            .filter(([, generation]) => generation <= admittedThrough)
            .map(([call]) => call));
    }
    /**
     * Probe whether a retained provider client is still live.
     *
     * On production routes the client is a CompositeProvider whose `health`
     * answers unconditionally ok without touching a child, so `health` alone
     * cannot see a dead child. `operationHealthSnapshot` reaches the
     * instantiated children instead. Only the known-live states allow the
     * fast path: `exited`/`unreachable` are dead, `unknown` is never
     * evidence of health (it is what a recorded but uncharacterized failure
     * reports), and `not_started` is a startup that never completed — in the
     * Hopper timeout case the client holds retained resources that block the
     * next `start()` until `close()` retries cleanup, so treating it as live
     * would skip the retire path and hand the wedged client to subsequent
     * analysis. The gate fails closed: without a snapshot signal, fall back
     * to the `health` admission probe.
     */
    async #retainedClientLive(client, options) {
        if (client.reuseReadiness?.() === "blocked")
            return false;
        const snapshot = client.operationHealthSnapshot?.();
        if (snapshot !== undefined)
            return snapshot.state === "idle" || snapshot.state === "busy";
        try {
            return (await client.execute("health", {}, options)).ok;
        }
        catch {
            return false;
        }
    }
    async #restore(previous) {
        if (previous === undefined)
            return ok(null);
        const refreshed = await this.#providerRouter.refreshAfterRetirement(previous.route, previous.target);
        if (!refreshed.ok)
            return refreshed;
        const route = refreshed.value;
        const runId = randomUUID();
        const client = route.createClient(previous.target, {
            runId,
        });
        const run = { client, route, runId };
        const started = await client.execute("health", {});
        if (started.ok) {
            this.#active = {
                ...previous,
                profile: route.profile,
                ...run,
                nativeSourceAdmitted: false,
            };
            this.#clearRuntimeAvailability();
            return ok(null);
        }
        const closed = await this.#retireClient(run);
        return closed.ok
            ? err(started.error)
            : err(analysisErrorWithCloseRejection(started.error, closed.error, "open_binary"));
    }
    async #waitForTransition(operation, signal, transition) {
        if (signal?.aborted === true)
            return err(cancelledBy(operation, signal));
        if (signal === undefined) {
            await transition;
            return ok(undefined);
        }
        return new Promise((resolve) => {
            const onAbort = () => {
                resolve(err(cancelledBy(operation, signal)));
            };
            signal.addEventListener("abort", onAbort, { once: true });
            const finish = () => {
                signal.removeEventListener("abort", onAbort);
                resolve(signal.aborted ? err(cancelledBy(operation, signal)) : ok(undefined));
            };
            transition.then(finish, finish);
        });
    }
}
