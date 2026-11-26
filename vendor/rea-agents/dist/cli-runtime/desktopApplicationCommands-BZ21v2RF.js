import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { contractNamed, deliverWithService, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { createDesktopApplicationService, init_desktop } from "./desktop-DgOZAjbC.js";
import { DESKTOP_APPLICATION_TOOL_CONTRACTS, init_desktopApplicationToolContracts } from "./desktopApplicationToolContracts-DNyd7u1e.js";

//#region dist/cli/desktopApplicationCommands.js
var desktopApplicationCommands_exports = /* @__PURE__ */ __exportAll({ registerDesktopApplicationCommands: () => registerDesktopApplicationCommands });
var registerDesktopApplicationCommands;
function init_desktopApplicationCommands() {
	return (init_desktopApplicationCommands = __esmMin((() => {
		init_desktop();
		init_desktopApplicationToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerDesktopApplicationCommands = (cli, logger) => {
			registerContractCommand(cli, logger, contractNamed(DESKTOP_APPLICATION_TOOL_CONTRACTS, "inspect_desktop_application"), {
				description: "Identify desktop runtime candidates from bounded directory and header observations",
				positionals: ["path"],
				callerPaths: ["path"],
				evidenceDelivery: true,
				fields: {
					path: { description: "Local installation directory" },
					max_entries: {
						name: "max_entries",
						description: "Maximum directory entries to examine; exhaustion leaves partial coverage"
					},
					max_probe_bytes: {
						name: "max_probe_bytes",
						description: "Maximum total bytes read from selected file ranges"
					}
				}
			}, deliverWithService(createDesktopApplicationService, "rea-artifact-graph"));
		};
	})))();
}

//#endregion
export { desktopApplicationCommands_exports, init_desktopApplicationCommands };