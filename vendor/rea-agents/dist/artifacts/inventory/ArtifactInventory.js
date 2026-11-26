import { absoluteCallerPath } from "../../filesystem/callerPath.js";
import { artifactInventoryResultSchema, } from "../../domain/artifactGraph.js";
import { scanCanonicalArtifactInventoryInScope, scanCanonicalArtifactInventoryForExtractionInScope, } from "./scanCanonical.js";
import { abortIfNeeded, resolveArtifactSourcePath, } from "../../resources/index.js";
/** Inventory one local artifact and return every graph collection inline. */
export const inventoryArtifact = async (inputPath, options) => {
    const snapshot = await options.resourceScope.run(() => scanArtifactInventoryInScope(inputPath, options));
    return artifactInventoryResultSchema.parse({
        ...snapshot,
        ...(options.readerLimits === undefined
            ? {}
            : { effective_limits: options.readerLimits }),
    });
};
/** Inventory under an admission the caller already holds on its scope. */
export const inventoryArtifactInScope = async (inputPath, options) => artifactInventoryResultSchema.parse(await scanArtifactInventoryInScope(inputPath, options));
export const scanArtifactInventoryInScope = async (inputPath, options) => {
    abortIfNeeded(options.signal);
    const path = await resolveArtifactSourcePath(inputPath);
    return scanCanonicalArtifactInventoryInScope(path, options, undefined, absoluteCallerPath(options.selectedPath ?? inputPath));
};
export const scanArtifactInventoryForExtractionInScope = async (inputPath, options, probeFacts) => {
    abortIfNeeded(options.signal);
    const path = await resolveArtifactSourcePath(inputPath);
    return scanCanonicalArtifactInventoryForExtractionInScope(path, options, probeFacts, absoluteCallerPath(options.selectedPath ?? inputPath));
};
