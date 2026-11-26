import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, errorMessage, init_analysisErrorCore, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { artifactSelectedPathErrno, assertArtifactReadActive, init_ArtifactFileOperation, init_resources } from "./resources-B3P64jvH.js";
import { realpath } from "node:fs/promises";

//#region dist/process/ArtifactCommandPath.js
var selectArtifactCommandPath, assertArtifactCommandPath;
function init_ArtifactCommandPath() {
	return (init_ArtifactCommandPath = __esmMin((() => {
		init_providerAdapterError();
		init_resources();
		init_analysisErrorCore();
		init_errorMessage();
		selectArtifactCommandPath = async (invocationPath, signal) => {
			assertArtifactReadActive(signal);
			const resolvedPath = await realpath(invocationPath);
			assertArtifactReadActive(signal);
			return Object.freeze({
				invocationPath,
				resolvedPath
			});
		};
		assertArtifactCommandPath = async (selected, operation, options = {}) => {
			assertArtifactReadActive(options.signal);
			const changed = (cause) => new AnalysisArtifactChangedError(operation, selected.invocationPath, "Selected command no longer resolves to its admitted executable.", {
				cause,
				...options.capturedOutput === undefined ? {} : { capturedOutput: options.capturedOutput }
			});
			let current;
			try {
				current = await realpath(selected.invocationPath);
			} catch (cause) {
				if (artifactSelectedPathErrno(cause) !== undefined) throw changed(cause);
				const systemCode = cause instanceof Error && "code" in cause ? String(cause.code) : undefined;
				const failureOptions = {
					cause,
					capturedOutput: options.capturedOutput
				};
				if (systemCode === "EACCES" || systemCode === "EPERM") throw new AnalysisAccessDeniedError(operation, selected.invocationPath, systemCode, failureOptions);
				throw new ProviderAdapterError("rea", operation, {
					...failureOptions,
					diagnostics: {
						path: selected.invocationPath,
						reason: errorMessage(cause),
						system_code: systemCode ?? null
					}
				});
			}
			if (current !== selected.resolvedPath) throw changed();
			assertArtifactReadActive(options.signal);
		};
	})))();
}

//#endregion
export { assertArtifactCommandPath, init_ArtifactCommandPath, selectArtifactCommandPath };