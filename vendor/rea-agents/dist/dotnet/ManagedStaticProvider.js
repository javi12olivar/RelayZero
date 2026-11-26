import { createAnalysisExecution, } from "../ports/AnalysisProvider.js";
import { invariantViolation } from "../domain/internalInvariant.js";
import { ArtifactReaderFailure, ArtifactResourceScope, } from "../resources/index.js";
import { managedStaticCapabilities } from "./ManagedStaticProviderMetadata.js";
import { MANAGED_STATIC_PROVIDER } from "../domain/investigationProviders.js";
import { MANAGED_TOOL_CONTRACTS, managedMembersInputSchema, managedTargetInputSchema, } from "../contracts/managed/managedToolContracts.js";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { AnalysisCapabilityUnavailableError, AnalysisUnsupportedTargetError, cancelledBy, } from "../domain/analysisErrorCore.js";
import { ProviderAdapterError } from "../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { err, ok } from "../domain/result.js";
import { inspectManagedArtifactBytes } from "./ManagedArtifactInspector.js";
import { inspectManagedMembersBytes } from "./ManagedMemberInspector.js";
import { inspectManagedNativeBoundariesBytes } from "./ManagedNativeBoundaryInspector.js";
import { RegularFileCleanupFailure } from "../filesystem/OwnedRegularFile.js";
import { managedInspectionInputFailure } from "../domain/managed/managedReaderFailure.js";
import { analysisInputErrorFromIssues } from "../domain/inputIssueProjection.js";
import { hashManagedSource, managedCleanupError, readManagedSnapshot, verifyManagedSourceIdentity, } from "./ManagedSnapshot.js";
import { errorMessage } from "../kernel/errorMessage.js";
/** Execution-free managed PE/CLI auxiliary provider. */
export class ManagedStaticProvider {
    #capabilities = managedStaticCapabilities();
    identity() {
        return MANAGED_STATIC_PROVIDER;
    }
    capabilities() {
        return this.#capabilities;
    }
    createClient(target) {
        return new ManagedStaticClient(target);
    }
}
class ManagedStaticClient {
    target;
    #snapshotBytes;
    #resources = new ArtifactResourceScope();
    constructor(target) {
        this.target = target;
    }
    async execute(operation, parameters, options) {
        if (operation === "health")
            return ok(createAnalysisExecution(null, MANAGED_STATIC_PROVIDER));
        if (!isManagedOperation(operation))
            return err(new AnalysisCapabilityUnavailableError(MANAGED_STATIC_PROVIDER.id, operation, "Operation is not implemented by the managed static provider."));
        // A non-PE target is outside this operation's formats, not a missing
        // provider capability; the unimplemented-operation refusal above is.
        if (this.target.format !== "pe")
            return err(new AnalysisUnsupportedTargetError(operation, this.target.path, `Managed static triage requires a PE target; observed ${this.target.format}.`));
        try {
            const input = operation === "inspect_managed_members"
                ? managedMembersInputSchema.safeParse(parameters)
                : managedTargetInputSchema.safeParse(parameters);
            if (!input.success)
                return err(analysisInputErrorFromIssues(operation, input.error.issues, parameters));
            const snapshotOptions = {
                expectedSha256: this.target.sha256,
                signal: options?.signal,
                resources: this.#resources,
                ...(input.data.max_snapshot_bytes === undefined
                    ? {}
                    : { maxBytes: input.data.max_snapshot_bytes }),
            };
            if (options?.signal?.aborted === true)
                return err(cancelledBy(operation, options.signal));
            const snapshot = this.#snapshotBytes;
            const observed = snapshot === undefined
                ? await readManagedSnapshot(this.target.path, operation, snapshotOptions)
                : await hashManagedSource(this.target.path, operation, snapshotOptions);
            const admitted = verifyManagedSourceIdentity(this.target, observed, operation);
            if (!admitted.ok)
                return admitted;
            const bytes = snapshot ?? observed.bytes;
            if (bytes === undefined)
                throw invariantViolation("Managed snapshot bytes are unavailable");
            this.#snapshotBytes = bytes;
            const result = inspectManagedOperation(operation, input.data, bytes, this.target);
            return ok(createAnalysisExecution(result, MANAGED_STATIC_PROVIDER, {
                rawResult: null,
                limitations: result.limitations,
                subject: this.target,
                locations: managedLocations(result),
            }));
        }
        catch (cause) {
            if (isCleanupFailure(cause))
                return err(this.#cleanupError(operation, cause));
            if (cause instanceof AnalysisError)
                return err(cause);
            if (options?.signal?.aborted === true)
                return err(cancelledBy(operation, options.signal));
            const inputFailure = managedInspectionInputFailure(operation, this.target.path, cause);
            if (inputFailure !== undefined)
                return err(inputFailure);
            return err(new ProviderAdapterError(MANAGED_STATIC_PROVIDER.id, operation, {
                cause,
            }));
        }
    }
    async close() {
        this.#snapshotBytes = undefined;
        try {
            await this.#resources.close();
            return ok(null);
        }
        catch (cause) {
            return err(this.#cleanupError("close", cause));
        }
    }
    #cleanupError(operation, cause) {
        const failure = managedCleanupError(cause, this.target.path, operation);
        if (failure instanceof ProviderCleanupError)
            return failure;
        const cleanup = cause instanceof ArtifactReaderFailure ? cause.cleanup : undefined;
        return new ProviderCleanupError(MANAGED_STATIC_PROVIDER.id, cleanup?.resources ?? [this.target.path], {
            reason: cleanup?.reason ?? errorMessage(cause),
        }, { cause, operation });
    }
}
const isCleanupFailure = (cause) => cause instanceof RegularFileCleanupFailure ||
    (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined);
const isManagedOperation = (operation) => MANAGED_TOOL_CONTRACTS.some(({ name }) => name === operation);
const inspectManagedOperation = (operation, parameters, bytes, target) => {
    if (operation === "inspect_managed_members") {
        const { type_names: typeNames } = parameters;
        return inspectManagedMembersBytes(bytes, target, {
            ...(typeNames === undefined ? {} : { typeNames }),
            ...(parameters.max_metadata_representation_bytes === undefined
                ? {}
                : {
                    maxRepresentationBytes: parameters.max_metadata_representation_bytes,
                }),
        });
    }
    if (operation === "inspect_managed_artifact") {
        return inspectManagedArtifactBytes(bytes, target, parameters.max_metadata_representation_bytes);
    }
    return inspectManagedNativeBoundariesBytes(bytes, target, parameters.max_metadata_representation_bytes);
};
const managedLocations = (result) => {
    if ("pe" in result) {
        if (result.pe.cli === null)
            return [{ kind: "file-offset", offset: 0 }];
        return [
            {
                kind: "file-offset-range",
                start: result.pe.cli.header_offset,
                end: result.pe.cli.header_offset + result.pe.cli.header_size,
            },
            ...[result.module, result.assembly]
                .filter((value) => value !== null)
                .map((value) => ({
                kind: "file-offset",
                offset: value.row_offset,
            })),
        ];
    }
    if ("methods" in result)
        return [
            ...(result.module === null
                ? [{ kind: "file-offset", offset: 0 }]
                : [{ kind: "file-offset", offset: result.module.row_offset }]),
            ...result.methods
                .filter((method) => method.body.file_offset !== null)
                .map((method) => ({
                kind: "file-offset",
                offset: method.body.file_offset ?? 0,
            })),
        ];
    return [
        ...(result.module === null
            ? [{ kind: "file-offset", offset: 0 }]
            : [{ kind: "file-offset", offset: result.module.row_offset }]),
        ...result.pinvoke_imports.map((mapping) => ({
            kind: "file-offset",
            offset: mapping.row_offset,
        })),
    ];
};
