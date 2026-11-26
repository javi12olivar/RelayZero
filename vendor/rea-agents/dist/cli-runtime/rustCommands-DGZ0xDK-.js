import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { contractNamed, deliverWithService, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { PRODUCER_LIMITS_HELP, init_producerLimitsOption } from "./producerLimitsOption-qOlmwAOk.js";
import { createRustBinaryService, init_rust } from "./rust-BZX588Kx.js";
import { RUST_TOOL_CONTRACTS, init_rustToolContracts } from "./rustToolContracts-BelkoKV1.js";

//#region dist/cli/rustCommands.js
var rustCommands_exports = /* @__PURE__ */ __exportAll({ registerRustCommands: () => registerRustCommands });
var registerRustCommands;
function init_rustCommands() {
	return (init_rustCommands = __esmMin((() => {
		init_rust();
		init_rustToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_producerLimitsOption();
		registerRustCommands = (cli, logger) => {
			registerContractCommand(cli, logger, contractNamed(RUST_TOOL_CONTRACTS, "inspect_rust_binary"), {
				description: "Inspect an embedded cargo-auditable Rust dependency list without target execution",
				positionals: ["path"],
				callerPaths: ["path"],
				jsonText: ["producer_limits"],
				evidenceDelivery: true,
				viewDelivery: {
					invalidJson: "view must be a JSON package or edge selection",
					kind: "rust",
					viewSelectsSummary: true
				},
				fields: {
					path: { description: "Local ELF, PE, thin or universal Mach-O, or WebAssembly core-module image" },
					producer_limits: { description: PRODUCER_LIMITS_HELP },
					architecture: { description: "Slice to read from a universal Mach-O, by CPU family; when several slices share a family, arm64 (arm64 or arm64v8), arm64e (arm64e or arm64e.x1) or x86_64 names the subtype, and a value matching several slices is refused; required for universal files" },
					detail: { description: "Default complete; a view selects compact delivery with --evidence_output" },
					view: { description: "JSON package or edge selection; retains complete Evidence with --evidence_output" }
				}
			}, deliverWithService(createRustBinaryService, "rust-auditable"));
		};
	})))();
}

//#endregion
export { init_rustCommands, rustCommands_exports };