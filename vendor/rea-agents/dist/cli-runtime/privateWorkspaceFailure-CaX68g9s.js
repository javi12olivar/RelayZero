import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisResourceConstraintError, errorMessage, init_analysisErrorCore, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";

//#region dist/process/privateWorkspaceFailure.js
var STORAGE_EXHAUSTION_CODES, DESCRIPTOR_EXHAUSTION_CODES, systemCode, systemPath, privateWorkspaceFailure;
function init_privateWorkspaceFailure() {
	return (init_privateWorkspaceFailure = __esmMin((() => {
		init_analysisErrorCore();
		init_providerAdapterError();
		init_errorMessage();
		STORAGE_EXHAUSTION_CODES = new Set(["ENOSPC", "EDQUOT"]);
		DESCRIPTOR_EXHAUSTION_CODES = new Set(["EMFILE", "ENFILE"]);
		systemCode = (cause) => cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause.code : null;
		systemPath = (cause) => cause instanceof Error && "path" in cause && typeof cause.path === "string" ? cause.path : null;
		privateWorkspaceFailure = (providerId, operation, cause, workspacePath) => {
			const code = systemCode(cause);
			const path = systemPath(cause) ?? workspacePath;
			const reason = errorMessage(cause);
			if (code !== null && (STORAGE_EXHAUSTION_CODES.has(code) || code === "EFBIG")) return new AnalysisResourceConstraintError(operation, "file-size", `Private analysis workspace failed (${code}): ${reason}`, {
				workspace_path: workspacePath,
				path,
				system_code: code
			}, {
				cause,
				...STORAGE_EXHAUSTION_CODES.has(code) ? { remediationAction: "Free disk space or quota on the filesystem holding details.reported_limits.path (the host temporary directory, TMPDIR), then retry." } : {}
			});
			return new ProviderAdapterError(providerId, operation, {
				cause,
				userMessage: `Cannot prepare the private analysis workspace${code === null ? "" : ` (${code})`}: ${reason}`,
				remediationAction: code !== null && DESCRIPTOR_EXHAUSTION_CODES.has(code) ? "Close unused files or raise the open-file limit of the REA process, then retry." : "Review details.diagnostics.system_code and details.diagnostics.path. Make the host temporary directory (TMPDIR) an existing directory this user can create files in on a writable filesystem, then retry.",
				diagnostics: {
					stage: "workspace",
					workspace_path: workspacePath,
					path,
					system_code: code,
					reason
				}
			});
		};
	})))();
}

//#endregion
export { init_privateWorkspaceFailure, privateWorkspaceFailure };