import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_evidence, parseEvidence, withEvidenceCallerInputPath } from "./nativeValueFlow-13oOEkkJ.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { ZodError } from "zod";

//#region dist/cli/cliEvidenceCallerPath.js
var bindCliEvidenceCallerPath, finishCliEvidenceCommand;
function init_cliEvidenceCallerPath() {
	return (init_cliEvidenceCallerPath = __esmMin((() => {
		init_evidence();
		init_finishAnalysisCommand();
		bindCliEvidenceCallerPath = (callerPath, run, additionalPaths) => async () => {
			const result = await run();
			if (result.ok) return {
				ok: true,
				value: withEvidenceCallerInputPath(result.value, callerPath, additionalPaths)
			};
			if (result.error.partialObservation !== undefined) {
				try {
					result.error.partialObservation = withEvidenceCallerInputPath(parseEvidence(result.error.partialObservation), callerPath, additionalPaths);
				} catch (cause) {
					if (!(cause instanceof ZodError)) throw cause;
				}
			}
			return result;
		};
		finishCliEvidenceCommand = (callerPath, run, service, providerId, operation, signal, additionalPaths) => finishAnalysisCommand(bindCliEvidenceCallerPath(callerPath, run, additionalPaths), service, providerId, operation, signal);
	})))();
}

//#endregion
export { bindCliEvidenceCallerPath, finishCliEvidenceCommand, init_cliEvidenceCallerPath };