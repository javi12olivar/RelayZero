import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { CLI_COMMANDS, cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { addressOrProcedureGuidance, commandRoute, contractNamed, dataTypeSelectorGuidance, equalSelectorGuidance, init_analysisSelector, init_contractCliDescription, init_contractCommand, registerContractCommand, registerRoutedCommand, requiredSelectorGuidance, runDirectOnTarget } from "./contractCommand-Di2ugplH.js";
import { init_options, nativeTarget } from "./options-BYpy7iiK.js";
import { findAppBundleResourceRoot, init_AppBundleExecutable } from "./AppBundleExecutable-BZSToRs7.js";
import { init_javascriptApplicationAnalysis, javaScriptApplicationCliProjection, runJavaScriptApplicationCommand } from "./javascriptApplicationAnalysis-CTeOsq5n.js";
import { ENHANCED_TOOL_CONTRACTS, OFFICIAL_TOOL_CONTRACTS, init_enhancedToolContracts, init_officialToolContracts } from "./officialToolContracts-7Ov7fJ7b.js";
import { ELECTRON_TOOL_CONTRACTS, init_electronToolContracts } from "./electronToolContracts-BJB7T-ib.js";
import { z } from "zod";
import { realpath, stat } from "node:fs/promises";

//#region dist/cli/decompileDirectoryCommand.js
var registerDecompileDirectoryCommand;
function init_decompileDirectoryCommand() {
	return (init_decompileDirectoryCommand = __esmMin((() => {
		init_contractCliDescription();
		init_enhancedToolContracts();
		init_contractCommand();
		init_options();
		registerDecompileDirectoryCommand = (cli, logger, run) => {
			registerContractCommand(cli, logger, contractNamed(ENHANCED_TOOL_CONTRACTS, "decompile_all"), {
				description: "Write every function's pseudocode into a directory and return a manifest",
				sessionTarget: nativeTarget("App or program path", "Load a local analysis snapshot. decompile-all does not update it."),
				callerPaths: ["output_directory"],
				fields: { output_directory: {
					name: "output",
					description: "Output directory. A relative path is resolved from the working directory. The parent must exist."
				} }
			}, run);
		};
	})))();
}

//#endregion
//#region dist/cli/coreBinaryCommands.js
var decompileSelectorGuidance, namedAddressGuidance, querySelectorGuidance, patternSelectorGuidance, registerCoreBinaryCommands, noDocument$1, program, procedureSelector, registerContractBinaryCommands, registerOverviewCommands, registerDecompileCommand, isJavaScriptApplicationPath, registerSearchCommand;
function init_coreBinaryCommands() {
	return (init_coreBinaryCommands = __esmMin((() => {
		init_contractCliDescription();
		init_AppBundleExecutable();
		init_analysisSelector();
		init_cliCommandNames();
		init_options();
		init_javascriptApplicationAnalysis();
		init_decompileDirectoryCommand();
		init_officialToolContracts();
		init_enhancedToolContracts();
		init_electronToolContracts();
		init_contractCommand();
		decompileSelectorGuidance = `${addressOrProcedureGuidance} Alternatively, use --file-offset alone.`;
		namedAddressGuidance = requiredSelectorGuidance("the positional address or --address");
		querySelectorGuidance = requiredSelectorGuidance("the positional query or --query");
		patternSelectorGuidance = requiredSelectorGuidance("the positional pattern or --pattern");
		registerCoreBinaryCommands = (cli, logger, runDirectAnalysis, environment) => {
			const run = runDirectOnTarget(runDirectAnalysis, logger);
			registerOverviewCommands(cli, logger, runDirectAnalysis, environment);
			registerDecompileCommand(cli, logger, run);
			registerDecompileDirectoryCommand(cli, logger, run);
			registerSearchCommand(cli, logger, run);
			registerContractBinaryCommands(cli, logger, run);
		};
		noDocument$1 = { document: "The CLI opens one target per invocation and selects no Hopper document" };
		program = nativeTarget("App or program path", true);
		procedureSelector = {
			positionals: ["procedure"],
			selectorOptions: { procedure: {
				name: "procedure",
				description: `Procedure name or address; use --procedure=<value> for leading dashes. ${addressOrProcedureGuidance}`,
				kind: "native"
			} },
			fields: { procedure: {
				name: "address",
				description: `Procedure name or address. ${addressOrProcedureGuidance}`
			} }
		};
		registerContractBinaryCommands = (cli, logger, run) => {
			registerContractCommand(cli, logger, contractNamed(ENHANCED_TOOL_CONTRACTS, "binary_overview"), {
				command: CLI_COMMANDS.inspect,
				description: "Inspect an app overview with evidence",
				sessionTarget: nativeTarget("App, program, or analysis database path", true)
			}, run);
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "xrefs"), {
				description: `List bounded, untyped references to an analyzed address. For typed incoming references, use inspect-native-instruction at the target address where supported. ${namedAddressGuidance} ${equalSelectorGuidance}`,
				sessionTarget: program,
				positionals: ["address"],
				selectorOptions: { address: {
					name: "address",
					description: `Address or symbol name; use --address=<value> for leading dashes. ${namedAddressGuidance}`,
					kind: "native",
					required: true
				} },
				omit: noDocument$1,
				fields: { address: { description: `Address or symbol name. ${namedAddressGuidance}` } }
			}, run);
			registerContractCommand(cli, logger, contractNamed(ENHANCED_TOOL_CONTRACTS, "trace_feature"), {
				command: CLI_COMMANDS.trace,
				description: `Trace a literal feature through analyzed references. ${querySelectorGuidance} ${equalSelectorGuidance}`,
				sessionTarget: program,
				positionals: ["query"],
				selectorOptions: { query: {
					name: "query",
					description: `Complete literal feature query; use --query=<value> for leading dashes. ${querySelectorGuidance}`
				} },
				evidenceDelivery: true,
				fields: {
					query: { description: `Literal feature query. ${querySelectorGuidance}` },
					case_sensitive: { description: "Match the query with exact letter case" }
				}
			}, run);
			registerContractCommand(cli, logger, contractNamed(ENHANCED_TOOL_CONTRACTS, "analyze_function"), {
				command: CLI_COMMANDS.function,
				description: `Analyze one complete function with evidence. ${addressOrProcedureGuidance} ${equalSelectorGuidance}`,
				sessionTarget: program,
				...procedureSelector,
				evidenceDelivery: true
			}, run);
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "read_function_instructions"), {
				command: CLI_COMMANDS.instructions,
				description: `Read every raw instruction without decompiling. ${addressOrProcedureGuidance} ${equalSelectorGuidance}`,
				sessionTarget: program,
				...procedureSelector,
				omit: noDocument$1
			}, run);
		};
		registerOverviewCommands = (cli, logger, runDirectAnalysis, environment) => {
			const description = "Get an overview of an app";
			const target = "App, program, or analysis database path";
			registerRoutedCommand(cli, logger, { description }, [commandRoute(contractNamed(ELECTRON_TOOL_CONTRACTS, "analyze_javascript_application"), {
				command: CLI_COMMANDS.analyze,
				description,
				...javaScriptApplicationCliProjection(target),
				evidenceDelivery: true,
				viewDelivery: { invalidJson: "view must be valid JSON" }
			}, runJavaScriptApplicationCommand(environment), {
				takes: async ({ path }) => typeof path === "string" && isJavaScriptApplicationPath(path),
				requirement: "the static JavaScript ASAR/directory analysis lane"
			}), commandRoute(contractNamed(ENHANCED_TOOL_CONTRACTS, "binary_overview"), {
				command: CLI_COMMANDS.analyze,
				description,
				sessionTarget: nativeTarget(target, true)
			}, runDirectOnTarget(runDirectAnalysis, logger), { requirement: "a native program target" })]);
		};
		registerDecompileCommand = (cli, logger, run) => {
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "procedure_pseudo_code"), {
				command: CLI_COMMANDS.decompile,
				description: `Read one part of an app as code. ${decompileSelectorGuidance} Equal positional and --procedure values are accepted; conflicts fail. With Ghidra, a space-qualified address such as ram:0x... avoids file-offset fallback; inspect-native-load-image reports the observed default space.`,
				sessionTarget: program,
				positionals: ["procedure"],
				selectorOptions: { procedure: {
					name: "procedure",
					description: `Procedure name or address; use --procedure=<value> for leading dashes. ${decompileSelectorGuidance}`,
					kind: "native",
					alternative: {
						name: "file-offset",
						description: `Ghidra source-file byte offset; mapped internally to an analysis address. ${decompileSelectorGuidance}`,
						schema: z.string().regex(/^0x[0-9a-fA-F]+$/u),
						selects: (offset) => `file-offset:${offset}`
					}
				} },
				evidenceDelivery: true,
				omit: noDocument$1,
				fields: { procedure: {
					name: "address",
					description: `Procedure name or address. ${decompileSelectorGuidance}`
				} }
			}, run);
		};
		isJavaScriptApplicationPath = async (path) => {
			try {
				const canonical = await realpath(path);
				if (canonical.toLowerCase().endsWith(".asar")) return true;
				if (!(await stat(canonical)).isDirectory()) return false;
				const bundle = await findAppBundleResourceRoot(canonical);
				return bundle.ok && bundle.value === undefined;
			} catch (cause) {
				void cause;
				return false;
			}
		};
		registerSearchCommand = (cli, logger, run) => {
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "search_strings"), {
				command: CLI_COMMANDS.search,
				description: `Search every analyzed string or procedure name. ${patternSelectorGuidance} ${equalSelectorGuidance}`,
				sessionTarget: program,
				positionals: ["pattern"],
				selectorOptions: { pattern: {
					name: "pattern",
					description: `Complete literal text or regex pattern; use --pattern=<value> for leading dashes. ${patternSelectorGuidance}`
				} },
				cliOptions: { kind: z.enum(["strings", "procedures"]).default("strings").describe("Analyzed item kind to search") },
				operationBy: {
					option: "kind",
					contracts: { procedures: contractNamed(OFFICIAL_TOOL_CONTRACTS, "search_procedures") }
				},
				omit: {
					...noDocument$1,
					detail: "The CLI returns the complete inventory matches"
				},
				fields: {
					pattern: { description: `Literal text or regex pattern. ${patternSelectorGuidance}` },
					mode: { description: "Interpret the pattern as literal text or a regex" },
					case_sensitive: {
						name: "caseSensitive",
						description: "Match the pattern with exact letter case"
					}
				}
			}, run);
		};
	})))();
}

//#endregion
//#region dist/cli/coreNativeCommands.js
var executable, nativeApplication, noDocument, registerCoreNativeCommands, registerProcedureSelectorCommands;
function init_coreNativeCommands() {
	return (init_coreNativeCommands = __esmMin((() => {
		init_analysisSelector();
		init_cliCommandNames();
		init_options();
		init_contractCliDescription();
		init_enhancedToolContracts();
		init_officialToolContracts();
		init_contractCommand();
		executable = nativeTarget("Local executable path");
		nativeApplication = nativeTarget("Local native executable or app path");
		noDocument = { document: "The CLI opens one target per invocation and selects no Hopper document" };
		registerCoreNativeCommands = (cli, logger, runDirectAnalysis) => {
			const run = runDirectOnTarget(runDirectAnalysis, logger);
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "annotate_native_function"), {
				description: "Edit function annotations and return refreshed analysis",
				sessionTarget: executable,
				positionals: ["procedure"],
				fields: {
					procedure: { description: "Function name or address; Ghidra resolves interior addresses to the containing function and edits its entry" },
					name: { description: "Analyst function name" },
					comment: { description: "Regular entry comment; empty text clears it" },
					inline_comment: {
						name: "inline-comment",
						description: "Inline entry comment; empty text clears it"
					}
				}
			}, run);
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "search_bytes"), {
				description: "Find masked bytes; unbounded searches skip unloaded blocks and overlays",
				sessionTarget: executable,
				positionals: ["pattern"],
				omit: noDocument,
				fields: {
					start: { description: "Inclusive start address; use an overlay address space to search it" },
					end: { description: "Inclusive end address; use an overlay address space to search it" },
					cursor: { description: "Continuation from the same query's next_cursor" },
					limit: { description: "Maximum matches on this page" }
				}
			}, run);
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "inspect_native_load_image"), {
				description: "Inspect native load observations and supported snapshot verification",
				sessionTarget: executable,
				evidenceDelivery: true
			}, run);
			registerProcedureSelectorCommands(cli, logger, run);
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "read_bytes"), {
				description: "Read provider memory bytes; Ghidra memory may include loader fixups and differ from file bytes",
				sessionTarget: executable,
				positionals: ["address"],
				omit: noDocument,
				fields: {
					address: { description: "Exact provider memory address" },
					length: { description: "Requested byte count" }
				}
			}, run);
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "address_to_file_offset"), {
				description: "Map one analysis address to a file offset; memory bytes may differ and ranges may not be contiguous",
				sessionTarget: executable,
				positionals: ["address"],
				omit: noDocument,
				fields: { address: { description: "Exact provider memory address" } }
			}, run);
			registerContractCommand(cli, logger, contractNamed(ENHANCED_TOOL_CONTRACTS, "trace_native_values"), {
				description: "Trace bounded native def-use and call dependencies",
				sessionTarget: nativeApplication,
				positionals: ["procedure"],
				evidenceDelivery: true,
				fields: {
					procedure: { description: "Explicit native procedure symbol or address" },
					max_depth: { description: "Maximum call traversal depth" },
					max_functions: { description: "Maximum function decompilations" },
					max_call_sites: { description: "Maximum static call-site resolutions" },
					max_nodes: { description: "Maximum retained graph nodes" },
					max_edges: { description: "Maximum retained graph edges" },
					offset: { description: "First graph node index" },
					limit: { description: "Maximum nodes on this page" }
				}
			}, runDirectOnTarget(runDirectAnalysis, logger, { requireSourceEvidence: true }));
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "inspect_native_data_type"), {
				description: `Inspect one recovered database type or typed data object. ${dataTypeSelectorGuidance}`,
				sessionTarget: nativeApplication,
				omit: noDocument,
				fields: {
					type: { description: `Exact database type category path. ${dataTypeSelectorGuidance}` },
					address: { description: `Exact native address. ${dataTypeSelectorGuidance}` }
				}
			}, run);
			for (const [command, operation, description] of [[
				cliCommandFor("inspect_native_instruction"),
				"inspect_native_instruction",
				"Inspect a code or data address, its containing Ghidra listing object, and typed incoming references where supported"
			], [
				cliCommandFor("resolve_native_call_targets"),
				"resolve_native_call_targets",
				"Resolve one static native call site"
			]]) registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, operation), {
				command,
				description,
				sessionTarget: nativeApplication,
				positionals: ["address"],
				omit: noDocument,
				fields: { address: { description: "Exact native address" } }
			}, run);
			const evidenceTarget = "Target path used to bind the result evidence";
			registerContractCommand(cli, logger, contractNamed(ENHANCED_TOOL_CONTRACTS, "trace_native_ui_action"), {
				description: "Trace a compiled UI action selector to its native handler and direct callees",
				sessionTarget: nativeTarget(evidenceTarget),
				positionals: ["action"],
				fields: {
					action: { description: "A unique compiled UI action selector or interface object ID" },
					max_depth: { description: "Maximum relationship depth" },
					max_nodes: { description: "Maximum returned graph nodes" },
					max_edges: { description: "Maximum returned graph edges" }
				}
			}, run);
			registerContractCommand(cli, logger, contractNamed(ENHANCED_TOOL_CONTRACTS, "inspect_native_dispatch_metadata"), {
				description: "Inspect typed Objective-C and Swift dispatch metadata",
				sessionTarget: nativeTarget(evidenceTarget, "Load or update the local analysis snapshot"),
				fields: {
					max_records: { description: "Maximum symbol records to inspect" },
					objc_class_import_addresses: {
						name: "objcClassImportAddress",
						description: "Exact pointer-slot address from the selected name inventory, used to report decoded Objective-C class import bindings (repeatable)"
					},
					objc_class_import_addresses_complete: { description: "The addresses include every selected class-label row; otherwise binding coverage stays partial when the record budget truncates the scan" }
				}
			}, run);
		};
		registerProcedureSelectorCommands = (cli, logger, run) => {
			registerContractCommand(cli, logger, contractNamed(OFFICIAL_TOOL_CONTRACTS, "procedure_references"), {
				description: `Inspect incoming or outgoing references for one native procedure. ${addressOrProcedureGuidance} ${equalSelectorGuidance}`,
				sessionTarget: nativeTarget("Local executable path", true),
				positionals: ["procedure"],
				selectorOptions: { procedure: {
					name: "procedure",
					description: `Procedure name or provider address; use --procedure=<value> for leading dashes. ${addressOrProcedureGuidance}`,
					kind: "native"
				} },
				evidenceDelivery: true,
				omit: noDocument,
				fields: {
					procedure: { description: `Procedure name or provider address. ${addressOrProcedureGuidance}` },
					direction: { description: "Reference direction. Defaults to outgoing." }
				}
			}, run);
			registerContractCommand(cli, logger, contractNamed(ENHANCED_TOOL_CONTRACTS, "inspect_native_api"), {
				description: `Reconstruct one native function API boundary with evidence. ${addressOrProcedureGuidance} ${equalSelectorGuidance}`,
				sessionTarget: nativeTarget("App or program path", true),
				positionals: ["procedure"],
				selectorOptions: { procedure: {
					name: "procedure",
					description: `Procedure selector; use this option for symbols beginning with a dash. ${addressOrProcedureGuidance}`,
					kind: "native"
				} },
				fields: { procedure: {
					name: "address",
					description: `Procedure name or address. ${addressOrProcedureGuidance}`
				} }
			}, run);
		};
	})))();
}

//#endregion
//#region dist/cli/coreAnalysisCommands.js
var coreAnalysisCommands_exports = /* @__PURE__ */ __exportAll({ registerCoreAnalysisCommands: () => registerCoreAnalysisCommands });
var registerCoreAnalysisCommands;
function init_coreAnalysisCommands() {
	return (init_coreAnalysisCommands = __esmMin((() => {
		init_coreBinaryCommands();
		init_coreNativeCommands();
		registerCoreAnalysisCommands = (cli, logger, runDirectAnalysis, environment) => {
			registerCoreBinaryCommands(cli, logger, runDirectAnalysis, environment);
			registerCoreNativeCommands(cli, logger, runDirectAnalysis);
		};
	})))();
}

//#endregion
export { coreAnalysisCommands_exports, init_coreAnalysisCommands };