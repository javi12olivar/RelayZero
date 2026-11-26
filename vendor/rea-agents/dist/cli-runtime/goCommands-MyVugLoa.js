import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { contractNamed, deliverWithService, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { createGoBinaryService, init_go } from "./go-DhSG-cHX.js";
import { GO_TOOL_CONTRACTS, init_goToolContracts } from "./goToolContracts-D8ZBiXW7.js";

//#region dist/cli/goCommands.js
var goCommands_exports = /* @__PURE__ */ __exportAll({ registerGoCommands: () => registerGoCommands });
var registerGoCommands;
function init_goCommands() {
	return (init_goCommands = __esmMin((() => {
		init_go();
		init_goToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerGoCommands = (cli, logger) => {
			const contract = contractNamed(GO_TOOL_CONTRACTS, "inspect_go_binary");
			registerContractCommand(cli, logger, contract, {
				description: "Inspect embedded Go compiler, modules, build settings and optional static (ptr, len) string literals without target execution",
				positionals: ["path"],
				callerPaths: ["path"],
				evidenceDelivery: true,
				fields: {
					path: { description: "Local ELF, PE, thin Mach-O or universal Mach-O image" },
					architecture: { description: "Slice to read from a universal Mach-O, by CPU family; when several slices share a family, arm64 (arm64 or arm64v8), arm64e (arm64e or arm64e.x1) or x86_64 names the subtype, and a value matching several slices is refused; required for universal files" },
					include_string_literals: { description: "Also recover bounded inferred Go UTF-8 string literals from static (ptr, len) headers" }
				}
			}, deliverWithService(createGoBinaryService, "go-build-info"));
		};
	})))();
}

//#endregion
export { goCommands_exports, init_goCommands };