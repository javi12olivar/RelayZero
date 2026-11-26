import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { cancelledBy, init_analysisErrorCore, init_isRecord, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";

//#region dist/application/AnalysisInput.js
var callerAnalysisParameters, parseAnalysisInput;
function init_AnalysisInput() {
	return (init_AnalysisInput = __esmMin((() => {
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_result();
		callerAnalysisParameters = (rawInput) => {
			const selected = new Set(isRecord(rawInput) ? Object.keys(rawInput).filter((name) => rawInput[name] !== undefined) : []);
			return (resolved) => {
				const parameters = { ...resolved };
				for (const name of Object.keys(parameters)) if (!selected.has(name)) Reflect.deleteProperty(parameters, name);
				return parameters;
			};
		};
		parseAnalysisInput = (operation, rawInput, schema, signal) => {
			if (signal?.aborted) return err(cancelledBy(operation, signal));
			const input = schema.safeParse(rawInput);
			if (!input.success) return err(analysisInputErrorFromIssues(operation, input.error.issues, rawInput, { cause: input.error }));
			return ok(input.data);
		};
	})))();
}

//#endregion
export { callerAnalysisParameters, init_AnalysisInput, parseAnalysisInput };