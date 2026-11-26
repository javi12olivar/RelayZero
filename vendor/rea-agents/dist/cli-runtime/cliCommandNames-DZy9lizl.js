import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/contracts/cliCommandNames.js
var cliCommandFor, CLI_COMMANDS, DEFAULT_INFO_LOGGING_COMMANDS;
function init_cliCommandNames() {
	return (init_cliCommandNames = __esmMin((() => {
		cliCommandFor = (name) => name.replaceAll("_", "-");
		CLI_COMMANDS = Object.freeze({
			analyze: "analyze",
			inspect: "inspect",
			decompile: "decompile",
			setup: "setup",
			doctor: "doctor",
			uninstall: "uninstall",
			update: "update",
			trace: "trace",
			capabilities: "capabilities",
			providers: "providers",
			guidance: "guidance",
			function: "function",
			instructions: "instructions",
			search: "search",
			importReferenceSource: "import-reference-source",
			listObjdumpArchitectures: "list-objdump-architectures",
			debugWithGdb: "debug-with-gdb",
			debugWithRizin: "debug-with-rizin",
			inspectEvidenceBundle: "inspect-evidence-bundle",
			evidenceImport: "evidence-import",
			evidenceExport: "evidence-export",
			environmentServe: "environment-serve",
			environmentExport: "environment-export",
			environmentCompare: "environment-compare",
			environmentBuild: "environment-build",
			compare: "compare",
			captureProcess: "capture-process",
			captureDesktopApplication: "capture-desktop-application",
			inspectDesktopApplicationState: "inspect-desktop-application-state",
			exportDesktopApplication: "export-desktop-application",
			describeDesktopApplicationTask: "describe-desktop-application-task",
			validateBrowserScenario: "validate-browser-scenario"
		});
		DEFAULT_INFO_LOGGING_COMMANDS = new Set([CLI_COMMANDS.environmentServe, CLI_COMMANDS.environmentBuild]);
	})))();
}

//#endregion
export { CLI_COMMANDS, DEFAULT_INFO_LOGGING_COMMANDS, cliCommandFor, init_cliCommandNames };