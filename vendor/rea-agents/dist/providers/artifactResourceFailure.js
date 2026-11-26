import { ArtifactReaderFailure, stableArtifactInputRecovery, } from "../resources/index.js";
import { AnalysisInputError } from "../domain/analysisErrorCore.js";
import { ProviderAdapterError } from "../domain/providerAdapterError.js";
import { ArtifactAnalysisResources, } from "../process/ArtifactAnalysisResources.js";
import { classifyProviderFailure, } from "./classifyProviderFailure.js";
import { errorMessage } from "../kernel/errorMessage.js";
/**
 * The dialect for a failure the artifact resources observed: a selected input
 * read, a post-run identity read, or the resources' own descriptors. Each is
 * built from the typed pieces those resources own.
 */
export const artifactResourceDialect = (resources, context) => {
    const { operation } = context;
    const { providerId } = resources;
    const observedOutput = context.kind === "selected-input"
        ? context.input.observedOutput
        : context.kind === "integrity"
            ? context.capturedOutput
            : undefined;
    const captured = observedOutput === undefined ? {} : { capturedOutput: observedOutput };
    const shared = {
        providerId,
        operation,
        readCleanup: (read, primary) => resources.readCleanupFailure(read, primary, observedOutput, operation),
        observedOutput,
    };
    switch (context.kind) {
        case "selected-input": {
            const { input } = context;
            return {
                ...shared,
                file: {
                    path: input.path,
                    description: "artifact",
                    fileSize: resources.selectedFileSize(input, operation),
                    retainCompletedIdentity: true,
                },
                unclassified: (cause, details) => new AnalysisInputError(operation, {
                    ...details,
                    cause,
                    ...(cause instanceof ArtifactReaderFailure
                        ? stableArtifactInputRecovery(cause)
                        : {}),
                }, [
                    {
                        path: ["path"],
                        reason: "invalid_value",
                        message: errorMessage(cause),
                    },
                ]),
            };
        }
        case "integrity":
            return {
                ...shared,
                recognise: (cause, details) => cause instanceof ArtifactReaderFailure
                    ? resources.integrityChanged(cause, context.path, { ...details, ...captured, cause }, operation)
                    : undefined,
                unclassified: (cause, details) => new ProviderAdapterError(providerId, operation, {
                    ...details,
                    ...captured,
                    cause,
                    diagnostics: {
                        stage: "integrity",
                        resource_path: context.path,
                        reason: errorMessage(cause),
                    },
                }),
            };
        case "resources":
            return {
                ...shared,
                unclassified: (cause, details) => new ProviderAdapterError(providerId, operation, {
                    ...details,
                    cause,
                    diagnostics: { stage: "artifact-resources", reason: String(cause) },
                }),
            };
    }
};
/** Artifact resources whose observed failures classify through the shared owner. */
export const createArtifactAnalysisResources = (providerId, operation, readArtifact, readKernelLimits, capacity) => {
    const resources = new ArtifactAnalysisResources(providerId, operation, readArtifact, readKernelLimits, capacity, (cause, context) => classifyProviderFailure(cause, artifactResourceDialect(resources, context)));
    return resources;
};
