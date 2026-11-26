import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/javascript/javascriptModuleSpecifier.js
var isRelativeJavaScriptModuleSpecifier, decodeJavaScriptModuleUrlPath;
function init_javascriptModuleSpecifier() {
	return (init_javascriptModuleSpecifier = __esmMin((() => {
		init_result();
		isRelativeJavaScriptModuleSpecifier = (value) => value === "." || value === ".." || value.startsWith("./") || value.startsWith("../");
		decodeJavaScriptModuleUrlPath = (value) => {
			if (/%(?:2f|5c)/iu.test(value)) return err("ES module URL paths cannot contain percent-encoded slash or backslash bytes.");
			try {
				const decoded = decodeURIComponent(value);
				return decoded.includes("\0") ? err("The decoded module URL path contains NUL.") : ok(decoded);
			} catch (cause) {
				if (!(cause instanceof URIError)) throw cause;
				return err("The module URL path contains malformed percent encoding.");
			}
		};
	})))();
}

//#endregion
//#region dist/application/TypeScriptEmittedSourceCandidates.js
var EMITTED_SUFFIXES, typescriptEmittedSourceCandidates;
function init_TypeScriptEmittedSourceCandidates() {
	return (init_TypeScriptEmittedSourceCandidates = __esmMin((() => {
		EMITTED_SUFFIXES = [
			[".js", [
				".ts",
				".tsx",
				".d.ts"
			]],
			[".mjs", [".mts", ".d.mts"]],
			[".cjs", [".cts", ".d.cts"]],
			[".jsx", [".tsx", ".d.ts"]]
		];
		typescriptEmittedSourceCandidates = (sourcePath, candidate) => {
			if (!/\.(?:ts|tsx|mts|cts)$/u.test(sourcePath)) return [];
			const emitted = EMITTED_SUFFIXES.find(([suffix]) => candidate.endsWith(suffix));
			if (emitted === undefined) return [];
			const stem = candidate.slice(0, candidate.length - emitted[0].length);
			return emitted[1].map((suffix) => ({
				path: `${stem}${suffix}`,
				kind: suffix.startsWith(".d.") ? "declaration" : "implementation"
			}));
		};
	})))();
}

//#endregion
export { decodeJavaScriptModuleUrlPath, init_TypeScriptEmittedSourceCandidates, init_javascriptModuleSpecifier, isRelativeJavaScriptModuleSpecifier, typescriptEmittedSourceCandidates };