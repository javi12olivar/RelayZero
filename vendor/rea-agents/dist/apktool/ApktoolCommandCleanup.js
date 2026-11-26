import { bindProcessInspectionCancellations, processInspectionFailure, } from "../providers/OwnedCommandCleanup.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactResourceRetryFailure, ArtifactResourceScope, ArtifactReaderFailure, } from "../resources/index.js";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { analysisErrorWithCleanupDependencies } from "../domain/analysisErrorCleanup.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { RegularFileCleanupFailure } from "../filesystem/OwnedRegularFile.js";
import { processInspectionCleanupFailures } from "../process/ProcessInspectionCleanup.js";
import { describeValidationFailure } from "../domain/validationFailure.js";
import { OwnedCommandFailure } from "../process/OwnedCommand.js";
/** Retain exact command/helper capabilities across invocation and shutdown. */
export class ApktoolCommandCleanup {
    #scope = new ArtifactResourceScope();
    #owners = new Set();
    async run(operation, name) {
        try {
            return await this.#scope.run(() => {
                this.#prune();
                return operation();
            });
        }
        catch (cause) {
            throw this.#retryFailure(cause, name);
        }
    }
    async close() {
        try {
            await this.#scope.close();
        }
        catch (cause) {
            throw this.#retryFailure(cause, "close");
        }
        finally {
            this.#prune();
        }
    }
    pendingFor(root) {
        this.#prune();
        return [...this.#owners].some((owner) => owner.root === root);
    }
    retainFailure(cause, primary, operation, root) {
        const retained = [];
        const command = cause instanceof OwnedCommandFailure ? cause : undefined;
        for (const preparation of processInspectionCleanupFailures(processInspectionFailure(cause))) {
            if (preparation instanceof RegularFileCleanupFailure) {
                const cleanup = new ProviderCleanupError("apktool", [preparation.path], { reason: describeValidationFailure(preparation.cleanupCause) }, { operation, cause: preparation });
                const retainedOwner = this.#retain(cleanup, () => preparation.owner.close(), root);
                cleanup.bindCleanupResourceOwner(retainedOwner.lease);
                retainedOwner.lease.bindCleanupError(cleanup);
                retained.push(retainedOwner);
            }
            else {
                const cleanup = preparation.cleanupFailure ??
                    new ProviderCleanupError("apktool", ["process ownership inspection"], { reason: preparation.message }, { operation, cause: preparation });
                const owner = preparation.cleanupOwner;
                const retainedOwner = this.#retain(cleanup, async () => {
                    if (owner === undefined)
                        throw cleanup;
                    await owner.close();
                }, root);
                retainedOwner.lease.bindCleanupError(cleanup);
                retained.push(retainedOwner);
            }
        }
        if (command !== undefined &&
            (command.cleanupOwner !== undefined || command.cleanupFailure !== null)) {
            const owner = command.cleanupOwner;
            const cleanup = new ProviderCleanupError("apktool", command.resources, {
                reason: command.cleanupFailure ?? "Command cleanup remains incomplete",
            }, { operation, cause });
            const retainedOwner = this.#retain(cleanup, async () => {
                if (owner === undefined)
                    throw cleanup;
                const result = await owner.stop();
                if (result.status === "incomplete")
                    throw new Error(result.reason);
            }, root);
            retainedOwner.lease.bindCleanupError(cleanup);
            retained.push(retainedOwner);
        }
        if (retained.length === 0)
            return bindProcessInspectionCancellations(cause, primary, operation);
        const cleanup = new ProviderCleanupError("apktool", retained.flatMap((owner) => owner.cleanup.cleanupResources), {}, { operation, cause });
        this.#bind(cleanup, retained);
        return bindProcessInspectionCancellations(cause, analysisErrorWithCleanupDependencies(primary, cleanup, operation), operation);
    }
    #retain(cleanup, release, root) {
        const lease = new AnalysisCleanupLease(async () => {
            try {
                await release();
            }
            catch (cause) {
                throw new ArtifactReaderFailure("unavailable", cleanup.message, {
                    cause,
                    cleanup: {
                        reason: cleanup.message,
                        resources: cleanup.cleanupResources,
                    },
                });
            }
        }, cleanup.cleanupResources);
        const owner = { lease, cleanup, root };
        this.#owners.add(owner);
        this.#scope.retain({
            kind: "lease",
            resource: cleanup.cleanupResources[0] ?? "apktool command",
            lease,
        });
        return owner;
    }
    #bind(error, owners) {
        new AnalysisCleanupLeaseGroup(error, owners.map((owner) => owner.lease));
        // Helper cleanup can itself contain independently released peers. Its
        // producer owns current labels; the leases own completion of this retry set.
        error.bindCleanupResourceOwner({
            get cleanupResources() {
                return [
                    ...new Set(owners
                        .filter((owner) => !owner.lease.released)
                        .flatMap((owner) => owner.cleanup.cleanupResources)),
                ];
            },
        });
    }
    #retryFailure(cause, operation) {
        if (!(cause instanceof ArtifactResourceRetryFailure) ||
            cause.cleanup === undefined ||
            !cause.failedOwners.every((failed) => failed.kind === "lease" &&
                [...this.#owners].some((owner) => owner.lease === failed.lease)))
            return cause;
        const owners = [...this.#owners].filter((owner) => !owner.lease.released);
        const failure = new ProviderCleanupError("apktool", owners.flatMap((owner) => owner.cleanup.cleanupResources), { reason: cause.cleanup.reason }, { operation, cause });
        this.#bind(failure, owners);
        return failure;
    }
    #prune() {
        for (const owner of this.#owners)
            if (owner.lease.released)
                this.#owners.delete(owner);
    }
}
