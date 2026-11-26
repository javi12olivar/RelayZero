import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { abortIfNeeded, init_ArtifactSelectedSource, init_StreamDigest, init_resources, resolveArtifactSourcePath } from "./resources-B3P64jvH.js";
import { artifactInventoryResultSchema, init_artifactGraph } from "./artifactGraph-D-c8dgaG.js";
import { init_scanCanonical, scanCanonicalArtifactInventoryForExtractionInScope, scanCanonicalArtifactInventoryInScope } from "./scanCanonical-CeokfyxI.js";

//#region dist/artifacts/inventory/ArtifactInventory.js
var inventoryArtifact, inventoryArtifactInScope, scanArtifactInventoryInScope, scanArtifactInventoryForExtractionInScope;
function init_ArtifactInventory() {
	return (init_ArtifactInventory = __esmMin((() => {
		init_callerPath();
		init_artifactGraph();
		init_scanCanonical();
		init_resources();
		inventoryArtifact = async (inputPath, options) => {
			const snapshot = await options.resourceScope.run(() => scanArtifactInventoryInScope(inputPath, options));
			return artifactInventoryResultSchema.parse({
				...snapshot,
				...options.readerLimits === undefined ? {} : { effective_limits: options.readerLimits }
			});
		};
		inventoryArtifactInScope = async (inputPath, options) => artifactInventoryResultSchema.parse(await scanArtifactInventoryInScope(inputPath, options));
		scanArtifactInventoryInScope = async (inputPath, options) => {
			abortIfNeeded(options.signal);
			const path = await resolveArtifactSourcePath(inputPath);
			return scanCanonicalArtifactInventoryInScope(path, options, undefined, absoluteCallerPath(options.selectedPath ?? inputPath));
		};
		scanArtifactInventoryForExtractionInScope = async (inputPath, options, probeFacts) => {
			abortIfNeeded(options.signal);
			const path = await resolveArtifactSourcePath(inputPath);
			return scanCanonicalArtifactInventoryForExtractionInScope(path, options, probeFacts, absoluteCallerPath(options.selectedPath ?? inputPath));
		};
	})))();
}

//#endregion
export { init_ArtifactInventory, inventoryArtifact, inventoryArtifactInScope, scanArtifactInventoryForExtractionInScope };