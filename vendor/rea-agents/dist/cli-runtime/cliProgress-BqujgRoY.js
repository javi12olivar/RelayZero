import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/cli/cliProgress.js
var writeCliProgressLine, cliProgressReporter;
function init_cliProgress() {
	return (init_cliProgress = __esmMin((() => {
		writeCliProgressLine = (update) => {
			process.stderr.write(`${JSON.stringify({ rea_progress: update })}\n`);
		};
		cliProgressReporter = { report: async (update) => {
			writeCliProgressLine(update);
		} };
	})))();
}

//#endregion
export { cliProgressReporter, init_cliProgress, writeCliProgressLine };