import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactResourceScope, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";

//#region dist/cli/evidenceInputCommand.js
var evidenceBundleOption, runEvidenceInputCommand;
function init_evidenceInputCommand() {
	return (init_evidenceInputCommand = __esmMin((() => {
		init_localPath();
		init_result();
		init_analysisErrorProjection();
		init_resources();
		init_callerPath();
		init_AnalysisInput();
		init_finishAnalysisCommand();
		evidenceBundleOption = localPathStringSchema.optional().describe("Resolve exact retained Evidence IDs from this local Evidence bundle without reopening an analysis target");
		runEvidenceInputCommand = (document, context, execute) => {
			const { operation, signal, frame } = context;
			const bundlePath = context.cliOptions.evidenceBundle;
			const framed = parseAnalysisInput(operation, document, frame, signal);
			if (!framed.ok) return Promise.resolve(err(projectAnalysisError(framed.error)));
			const resources = new ArtifactResourceScope();
			return finishAnalysisCommand(async () => {
				let lookup;
				if (bundlePath !== undefined) {
					const { readImmutableEvidenceBundle } = await import("./EvidenceInputResolver-DpJOzfQ9.js").then((n) => (n.init_EvidenceBundleFiles(), n.EvidenceBundleFiles_exports));
					const bundle = await readImmutableEvidenceBundle(absoluteCallerPath(bundlePath), signal, resources, operation);
					if (!bundle.ok) return bundle;
					const records = new Map(bundle.value.records.map((record) => [record.evidence_id, record]));
					lookup = (id) => records.get(id);
				}
				return execute(lookup, resources);
			}, resources, "rea", operation, signal);
		};
	})))();
}

//#endregion
export { evidenceBundleOption, init_evidenceInputCommand, runEvidenceInputCommand };