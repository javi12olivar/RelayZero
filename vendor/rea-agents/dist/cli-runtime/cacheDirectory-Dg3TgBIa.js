import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteCallerPath, appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { isAbsolute, posix, win32 } from "node:path";

//#region dist/filesystem/cacheDirectory.js
var defaultKunaCacheDirectory, reaCacheDirectory, sameLexicalDirectory, withinLexicalDirectory, hasParentTraversal, lexicalDirectory;
function init_cacheDirectory() {
	return (init_cacheDirectory = __esmMin((() => {
		init_callerPath();
		defaultKunaCacheDirectory = (home, environment, platform) => reaCacheDirectory(home, environment, platform, "kuna");
		reaCacheDirectory = (home, environment, platform, name) => {
			if (platform === "darwin") return appendCallerPath(home, `Library/Caches/rea/${name}`, platform);
			const xdg = environment.XDG_CACHE_HOME;
			const root = xdg !== undefined && isAbsolute(xdg) ? xdg : appendCallerPath(home, ".cache", platform);
			return appendCallerPath(root, `rea/${name}`, platform);
		};
		sameLexicalDirectory = (left, right, platform) => lexicalDirectory(left, platform) === lexicalDirectory(right, platform);
		withinLexicalDirectory = (child, parent, platform) => {
			const base = lexicalDirectory(parent, platform);
			const inner = lexicalDirectory(child, platform);
			const separator = (platform === "win32" ? win32 : posix).sep;
			return inner === base || inner.startsWith(base.endsWith(separator) ? base : base + separator);
		};
		hasParentTraversal = (value) => value.split("/").includes("..");
		lexicalDirectory = (value, platform) => {
			const pathApi = platform === "win32" ? win32 : posix;
			const normalized = absoluteCallerPath(value, { platform });
			const root = pathApi.parse(normalized).root;
			let end = normalized.length;
			while (end > root.length && normalized.charCodeAt(end - 1) === pathApi.sep.charCodeAt(0)) end -= 1;
			return normalized.slice(0, end);
		};
	})))();
}

//#endregion
export { defaultKunaCacheDirectory, hasParentTraversal, init_cacheDirectory, reaCacheDirectory, sameLexicalDirectory, withinLexicalDirectory };