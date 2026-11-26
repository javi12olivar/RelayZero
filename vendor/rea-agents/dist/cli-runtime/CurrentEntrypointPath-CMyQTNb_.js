import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_runtimeVersion, javaScriptRuntime } from "./jsonSerialization-DAF9DVXC.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { realpathSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

//#region dist/process/CurrentEntrypointPath.js
var normalizeEntrypointPath, CURRENT_ENTRYPOINT_PATH, isDirectEntrypoint;
function init_CurrentEntrypointPath() {
	return (init_CurrentEntrypointPath = __esmMin((() => {
		init_runtimeVersion();
		init_callerPath();
		normalizeEntrypointPath = (entrypoint, runtime = javaScriptRuntime(process.versions).id) => entrypoint === undefined || entrypoint.length === 0 ? undefined : runtime === "bun" ? absoluteCallerPath(entrypoint) : resolve(entrypoint);
		CURRENT_ENTRYPOINT_PATH = normalizeEntrypointPath(process.argv[1]);
		isDirectEntrypoint = (entryPath, moduleUrl) => {
			if (entryPath === undefined) return false;
			try {
				return pathToFileURL(realpathSync(entryPath)).href === moduleUrl;
			} catch {
				return false;
			}
		};
	})))();
}

//#endregion
export { CURRENT_ENTRYPOINT_PATH, init_CurrentEntrypointPath, isDirectEntrypoint, normalizeEntrypointPath };