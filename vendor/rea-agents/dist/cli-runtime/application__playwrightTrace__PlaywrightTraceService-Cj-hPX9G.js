import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisErrorBase, primaryAnalysisError } from "./jsonSerialization-DAF9DVXC.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { PLAYWRIGHT_TRACE_OPERATION, PLAYWRIGHT_TRACE_PROVIDER, init_playwrightTrace, playwrightTraceSchema } from "./playwrightTrace-CY5VynIY.js";
import { init_playwrightTraceQuery, inspectPlaywrightTraceInputSchema } from "./playwrightTraceQuery-CfUtrJbO.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";

//#region dist/application/playwrightTrace/PlaywrightTraceService.js
var evidence, PlaywrightTraceService;
function init_PlaywrightTraceService() {
	return (init_PlaywrightTraceService = __esmMin((() => {
		init_analysisErrorBase();
		init_evidence();
		init_playwrightTraceQuery();
		init_playwrightTrace();
		init_AnalysisInput();
		init_ProviderOperationExecution();
		evidence = (report) => createEvidence({
			path: report.artifact.path,
			format: "file",
			sha256: report.artifact.sha256
		}, PLAYWRIGHT_TRACE_PROVIDER, {
			operation: PLAYWRIGHT_TRACE_OPERATION,
			predicateType: "rea.playwright-trace-inventory",
			parameters: {
				path: report.artifact.path,
				decoder_profile: "playwright-trace-v10"
			},
			result: report,
			confidence: "observed",
			limitations: report.limitations,
			locations: [{
				kind: "artifact-path",
				path: report.artifact.path
			}]
		});
		PlaywrightTraceService = class {
			port;
			constructor(port) {
				this.port = port;
			}
			async inspect(raw, signal) {
				const parsed = parseAnalysisInput(PLAYWRIGHT_TRACE_OPERATION, raw, inspectPlaywrightTraceInputSchema, signal);
				if (!parsed.ok) return parsed;
				const loaded = await this.port.inspect(parsed.value.path, signal);
				if (!loaded.ok) {
					const source = loaded.error.partialObservation ?? primaryAnalysisError(loaded.error).partialObservation;
					const partial = playwrightTraceSchema.safeParse(source);
					if (partial.success) {
						const projected = evidence(partial.data);
						let current = loaded.error;
						while (current !== undefined) {
							if (current.partialObservation === source || current.partialObservation === undefined) current.partialObservation = projected;
							current = current.cleanupPrimary;
						}
					}
					return loaded;
				}
				return completeProviderEvidence(evidence(loaded.value), signal);
			}
		};
	})))();
}

//#endregion
init_PlaywrightTraceService();
export { PlaywrightTraceService };