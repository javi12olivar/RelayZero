import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { z } from "zod";

//#region dist/domain/javascript/javascriptArtifactFiles.js
var javaScriptFileOccurrenceSchema, isJavaScriptSourcePath, javaScriptArtifactTextExclusion, javaScriptSemanticSourceExclusion;
function init_javascriptArtifactFiles() {
	return (init_javascriptArtifactFiles = __esmMin((() => {
		init_digests();
		javaScriptFileOccurrenceSchema = z.strictObject({
			container_sha256: digestSchema,
			path: z.string().min(1),
			sha256: digestSchema
		});
		isJavaScriptSourcePath = (path) => /\.(?:cjs|cts|mjs|mts|js|jsx|ts|tsx)$/iu.test(path);
		javaScriptArtifactTextExclusion = (file) => {
			if (file.text.included || file.text.reason === "not-applicable") return null;
			if (file.text.reason === "invalid-utf8" && file.kind !== "javascript") return null;
			return file.text.reason === "outside-analysis-scope" ? "Source was not analyzed because it is outside the caller-selected source_paths." : "Source bytes are not valid UTF-8; JavaScript semantics were not analyzed.";
		};
		javaScriptSemanticSourceExclusion = (file, parseStatus) => {
			if (file.kind !== "javascript") return null;
			return javaScriptArtifactTextExclusion(file) ?? (parseStatus === "failed" ? "JavaScript syntax could not be parsed; JavaScript semantics were not analyzed." : null);
		};
	})))();
}

//#endregion
export { init_javascriptArtifactFiles, isJavaScriptSourcePath, javaScriptArtifactTextExclusion, javaScriptFileOccurrenceSchema, javaScriptSemanticSourceExclusion };