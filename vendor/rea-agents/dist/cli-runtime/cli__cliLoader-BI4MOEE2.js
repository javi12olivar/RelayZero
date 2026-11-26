import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { CLI_COMMAND_REGISTRATIONS, init_cliCommandRegistrations } from "./cliCommandRegistrations-CnaBb9Gg.js";
import { RECORDED_CLI_COMMAND_REGISTRATIONS } from "../recordedCliCommandRegistrations.js";

//#region dist/cli/cliLoader.js
var COMMAND_OUTPUT_FLAGS, isRegistrationId, selectCliRegistrations, loadCliRuntime;
function init_cliLoader() {
	return (init_cliLoader = __esmMin((() => {
		init_cliCommandRegistrations();
		COMMAND_OUTPUT_FLAGS = new Set([
			"--json",
			"--full-output",
			"--token-count",
			"--timings",
			"--no-timings"
		]);
		isRegistrationId = (id) => Object.hasOwn(CLI_COMMAND_REGISTRATIONS, id);
		selectCliRegistrations = (global, recorded) => {
			if (global === undefined) return undefined;
			const { command, flags } = global;
			if (flags.has("--mcp") && command.length > 0) return [];
			if (command.length === 0 && flags.size === 1 && flags.has("--version")) return [];
			if (recorded === undefined) return undefined;
			for (const flag of flags) if (!COMMAND_OUTPUT_FLAGS.has(flag) && !flag.startsWith("--timings=")) return undefined;
			const name = command[0];
			if (name === undefined || !Object.hasOwn(recorded, name)) return undefined;
			const id = recorded[name];
			return isRegistrationId(id) ? [id] : undefined;
		};
		loadCliRuntime = async (global, environment) => {
			const ids = selectCliRegistrations(global, RECORDED_CLI_COMMAND_REGISTRATIONS);
			if (ids === undefined) {
				const { createCli, closeCliResources } = await import("./cli.js");
				return {
					createCli: (resultOutput) => createCli(environment, resultOutput),
					closeCliResources
				};
			}
			const selected = ids.map((id) => CLI_COMMAND_REGISTRATIONS[id]);
			const [modules, { createCliShell }, { closeCliResources }, analysis] = await Promise.all([
				Promise.all(selected.map((registration) => registration.load())),
				import("./cliShell-BDIhpPPf.js").then((n) => (n.init_cliShell(), n.cliShell_exports)),
				import("./cliResources-Bw83MG-j.js").then((n) => (n.init_cliResources(), n.cliResources_exports)),
				selected.some((registration) => registration.analysis) ? import("./directAnalysis-DMLaoFdA.js").then((n) => (n.init_directAnalysis(), n.directAnalysis_exports)) : undefined
			]);
			return {
				createCli: (resultOutput) => createCliShell({
					selectedEnvironment: environment,
					resultOutput,
					registrations: selected.map((registration, index) => ({
						registration,
						module: modules[index]
					})),
					...analysis === undefined ? {} : { createAnalysis: analysis.createDirectAnalysis }
				}),
				closeCliResources
			};
		};
	})))();
}

//#endregion
init_cliLoader();
export { loadCliRuntime };