import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_jsonValue, jsonObjectSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_jsonRecord, jsonRecordSchema } from "./jsonRecord-Cuy_NNu4.js";
import { init_nativeInstruction, nativeInstructionInputSchema } from "./nativeValueTrace-B4vmCxtN.js";
import { decompileAnalysisSchema, init_nativeSearch, init_procedurePseudocodeSchemas, nativeSearchInput } from "./analysisViewResult-vDCF9Pxo.js";
import { MAX_BYTE_SEARCH_MATCHES, TOOL_EXAMPLE_OVERRIDES, address, analysisDetailSchema, analysisDetailSummaryDefaultSchema, bytePatternFields, document, enhancedInputSchemas, enhancedOutputSchemas, evidenceEffects, examplesFor, init_analysisDetail, init_bytePattern, init_enhancedInputs, init_nativeDataType, init_nativeFunctionAnnotations, init_toolContractExamples, init_toolContractHelpers, init_toolEffects, init_toolOutputSchemaGroups, init_toolOutputSchemaPrimitives, nativeDataTypeInputSchema, nativeFunctionAnnotationsInputSchema, officialOutputSchemas, optionalAddress, procedure, providerEffects, providerNetworkEvidenceEffects, providerRemoteEffects, providerUiNetworkEvidenceEffects, requireOutputSchema, toolContractMetadata, toolEffects, validateBytePattern } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/contracts/functionWorkflowToolContracts.js
var functionWorkflowInputSchemas, FUNCTION_WORKFLOW_CLI_CONTRACTS, functionWorkflow, FUNCTION_WORKFLOW_TOOL_CONTRACTS;
function init_functionWorkflowToolContracts() {
	return (init_functionWorkflowToolContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_jsonValue();
		init_analysisDetail();
		init_enhancedInputs();
		init_toolContractExamples();
		init_toolEffects();
		init_toolOutputSchemaGroups();
		functionWorkflowInputSchemas = {
			analyze_function: enhancedInputSchemas.analyze_function.extend({ detail: analysisDetailSummaryDefaultSchema }),
			inspect_native_api: enhancedInputSchemas.inspect_native_api
		};
		FUNCTION_WORKFLOW_CLI_CONTRACTS = new Set(["inspect_native_api"]);
		functionWorkflow = (name, audit, description) => {
			const inputSchema = functionWorkflowInputSchemas[name];
			const outputSchema = requireOutputSchema(enhancedOutputSchemas, name);
			return {
				name,
				...toolContractMetadata(name, audit),
				description,
				kind: "enhanced",
				...FUNCTION_WORKFLOW_CLI_CONTRACTS.has(name) ? { cli: true } : {},
				requiresActiveTarget: true,
				inputSchema,
				outputSchema,
				examples: [{
					title: `Example ${name.replaceAll("_", " ")} request`,
					input: jsonObjectSchema.parse(inputSchema.parse(TOOL_EXAMPLE_OVERRIDES[name] ?? {}))
				}]
			};
		};
		FUNCTION_WORKFLOW_TOOL_CONTRACTS = [functionWorkflow("analyze_function", providerUiNetworkEvidenceEffects, "Inspect one native function by symbol or provider-returned address. Default summary returns identity, pseudocode size, facet counts and value-flow availability while retaining the complete dossier. Read selected facts with inspect_analysis_view using normalized_result.parent_evidence_id; detail complete returns everything inline. Facets include pseudocode, assembly, body ranges, comments, calls, references, strings/names, CFG and native API observations. Extents reflect provider analysis; limitations report unknown ranges and possible Ghidra terminal-call truncation."), functionWorkflow("inspect_native_api", providerEffects(toolEffects({
			mutatesSession: true,
			idempotent: false
		}), {
			...providerRemoteEffects,
			changesUiState: true
		}), "Inspect recovered parameter/return boundary types and jump-table dispatch for one native function selected by symbol or address. Returns confidence, supporting Evidence, case/data/target mappings, unsupported facets and residual unknowns. Null case values are unresolved, never known defaults. Use analyze_function for the broader function dossier.")];
	})))();
}

//#endregion
//#region dist/contracts/enhancedToolContracts.js
var ENHANCED_CLI_CONTRACTS, enhanced, ENHANCED_TOOL_CONTRACTS;
function init_enhancedToolContracts() {
	return (init_enhancedToolContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_analysisDetail();
		init_enhancedInputs();
		init_toolOutputSchemaGroups();
		init_toolContractHelpers();
		init_toolEffects();
		init_functionWorkflowToolContracts();
		ENHANCED_CLI_CONTRACTS = new Set([
			"inspect_native_dispatch_metadata",
			"decompile_all",
			"trace_native_ui_action",
			"trace_native_values"
		]);
		enhanced = (name, audit, description, inputSchema) => ({
			name,
			...toolContractMetadata(name, audit),
			description,
			kind: "enhanced",
			...ENHANCED_CLI_CONTRACTS.has(name) ? { cli: true } : {},
			requiresActiveTarget: true,
			inputSchema,
			outputSchema: requireOutputSchema(enhancedOutputSchemas, name),
			examples: examplesFor(name, inputSchema)
		});
		ENHANCED_TOOL_CONTRACTS = [
			enhanced("inspect_native_dispatch_metadata", evidenceEffects, "Inspect analyzed Objective-C class/method and Swift mangled symbols, with optional exact Objective-C import-pointer binding facts from the selected Mach-O slice. Returns decoded names up to max_records, provider/profile identity, target digest when available, facet coverage and per-record Evidence. Symbol observations do not establish runtime layouts, conformances or witness/class tables. The selected provider owns name discovery. max_input_bytes bounds the whole-file Mach-O read; unresolved bindings remain partial or unsupported.", enhancedInputSchemas.inspect_native_dispatch_metadata),
			enhanced("get_objc_classes", evidenceEffects, "Find Objective-C class labels, optionally by literal substring. Labels remain separate unless exact selected-image pointer-fixup Evidence establishes the same imported class binding, including library, ordinal, weak status and addend. Missing binding proof remains unknown, partial or unsupported.", enhancedInputSchemas.get_objc_classes),
			enhanced("get_objc_protocols", evidenceEffects, "Discover and deduplicate Objective-C and Swift protocol labels.", enhancedInputSchemas.get_objc_protocols),
			enhanced("batch_decompile", providerUiNetworkEvidenceEffects, "Decompile an explicit list of procedure symbols/addresses in input order, with one provider read active per batch. Returns per-item pseudocode, unavailable or error outcomes and aggregate counts; input selectors and observed canonical procedure identities remain separate. Null pseudocode is unavailable, without an inferred capability or retry reason; failed counts include unavailable items. detail summary retains the batch for inspect_analysis_view item/body pages; complete includes every body. Per-function limits do not bound the whole batch.", enhancedInputSchemas.batch_decompile.extend({ detail: analysisDetailSchema })),
			enhanced("decompile_all", providerEffects(toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				idempotent: false
			}), {
				...providerRemoteEffects,
				changesUiState: true
			}), "Export pseudocode for all or selected analyzed functions to a directory; returns a manifest/index, with bodies kept in files. Existing output requires resume with matching target, provider, profile and layout; verified files are skipped and conflicts preserved. External functions produce no file. Item failures do not stop others; cancellation keeps written files. retry_failed: independent_fresh retries only provider-reported function failures when supported, retaining each attempt and its limitations; independent attempts may use different analysis context. layout dwarf falls back to address filenames when compilation-unit paths are unavailable. Select limit/resume to fit the whole client deadline; per-function limits do not bound the export.", enhancedInputSchemas.decompile_all),
			enhanced("get_call_graph", providerEffects(evidenceEffects, providerRemoteEffects), "Traverse the provider-observed caller or callee graph from one symbol/address, returning canonical-address nodes with per-node outcomes. Use trace_call_path for a shortest path to a goal, or build_call_path to compose existing function dossiers without provider reads. Indirect calls may be unresolved; this is not a whole-program CFG. detail summary retains the complete graph for native-observation pages and native-context caveats.", enhancedInputSchemas.get_call_graph.extend({ detail: analysisDetailSchema })),
			enhanced("analyze_swift_types", providerEffects(evidenceEffects, providerRemoteEffects), "Classify analyzed Swift procedure names into classes, structs, enums, protocols and extensions using manglings or same-address symbol aliases. Returns deduplicated procedure-name counts, not unique source types; provider names, mangled_names and unresolved classifications remain available. Category and case-sensitive literal pattern filters do not suppress unclassified rows. Example: {category: \"structs\", pattern: \"Pair\"}.", enhancedInputSchemas.analyze_swift_types),
			enhanced("find_xrefs_to_name", evidenceEffects, "Find references to an exact analyzed symbol name: resolves the name, then returns its address and referencing addresses. name_not_found means lookup is unresolved, not that a reference search found none or the target lacks the symbol. References are address-only; use inspect_native_instruction for typed incoming references where supported. Kuna lacks the required general name inventory; xrefs can resolve names its inventory knows.", enhancedInputSchemas.find_xrefs_to_name),
			enhanced("binary_overview", providerEffects(evidenceEffects, providerRemoteEffects), "Summarize the bound document, complete provider-inventory procedure/string row counts, and segments when supported. Counts do not establish discovery of every function/string and are not comparable across providers. Omitted segments mean unavailable coverage. image_base is returned only when observed segments agree. Use search_procedures, list_procedures or analyze_function directly when the procedure is already known.", enhancedInputSchemas.binary_overview),
			...FUNCTION_WORKFLOW_TOOL_CONTRACTS,
			enhanced("trace_feature", providerEffects(toolEffects({
				mutatesSession: true,
				idempotent: false
			}), providerRemoteEffects), "Search procedure/string inventories for the complete literal query, then query xrefs at matched start addresses. Interior-byte references are not searched; empty results or truncated: false never establish no references. Containment refusals preserve an unavailable owner, and reference kinds remain unknown. For typed incoming procedure references use procedure_references, comparing target addresses for exact-entry matches. detail summary retains matches/references/unknowns for inspect_analysis_view kind native-feature-trace.", enhancedInputSchemas.trace_feature.extend({ detail: analysisDetailSchema })),
			enhanced("trace_call_path", providerEffects(toolEffects({
				mutatesSession: true,
				idempotent: false
			}), providerRemoteEffects), "Resolve start and optional goal symbols or addresses, then trace direct callers or callees. Returns observed edges and a shortest path within the provider-observed graph. search_scope distinguishes the observed-graph result from whether discovery is established; a missing goal is unknown when relationship reads or discovery are incomplete. Unresolved indirect calls remain unknown.", enhancedInputSchemas.trace_call_path),
			enhanced("trace_native_ui_action", providerNetworkEvidenceEffects, "Trace one unique compiled UI action, object ID, native symbol or exact function address through authored connections, encoded or symbolized Objective-C handlers, and bounded static call references. Typed direct and resolved indirect calls, ambiguous candidates, inferred untyped provider callees, and targetless sites remain distinct. Runtime reachability is unknown; use trace_native_values for recovered value dependencies.", enhancedInputSchemas.trace_native_ui_action),
			enhanced("trace_native_values", providerUiNetworkEvidenceEffects, "Trace static value dependencies across resolved calls from one native procedure: high-p-code def-use, constants, operators, memory/branch operations and derived argument/return bindings. Alias effects, missing bindings, persistent state and RNG roles remain unknown. Caller-selected budgets bound traversal and retained facts; nodes are paged. A Ghidra per-function timeout does not bound the traversal: allow startup and every attempted function, or reduce max_functions.", enhancedInputSchemas.trace_native_values)
		];
	})))();
}

//#endregion
//#region dist/contracts/functionInstructionContract.js
var functionInstructionInputSchema;
function init_functionInstructionContract() {
	return (init_functionInstructionContract = __esmMin((() => {
		init_toolContractHelpers();
		functionInstructionInputSchema = z.object({
			procedure,
			document: z.string().optional().describe("The document name")
		});
	})))();
}

//#endregion
//#region dist/contracts/hopperMemoryContracts.js
var HOPPER_MEMORY_TOOL_DEFINITIONS;
function init_hopperMemoryContracts() {
	return (init_hopperMemoryContracts = __esmMin((() => {
		init_toolEffects();
		init_toolContractHelpers();
		init_bytePattern();
		HOPPER_MEMORY_TOOL_DEFINITIONS = [
			{
				name: "search_bytes",
				effects: evidenceEffects,
				description: "Find masked byte signatures in initialized analyzed memory. Hex byte pairs and ?? wildcards are supported; an optional equal-length hex mask selects bits. Bounds are inclusive. Without bounds, unloaded blocks and loaded overlays are skipped and listed separately; select an overlay address space with start or end to search it. Matches are ordered by provider address and may span adjacent eligible initialized blocks; gaps and excluded blocks end a contiguous range. A match’s segment and file offset describe its starting address. Coverage describes this page; reuse the same query with next_cursor to continue. Uninitialized blocks are listed separately. Ghidra only; Hopper is unavailable.",
				inputSchema: z.strictObject({
					...bytePatternFields,
					document,
					start: address.optional(),
					end: address.optional(),
					limit: z.int().min(1).max(MAX_BYTE_SEARCH_MATCHES).default(100),
					cursor: z.string().min(1).optional()
				}).superRefine(validateBytePattern)
			},
			{
				name: "read_bytes",
				effects: evidenceEffects,
				description: "Read analyzed bytes from one provider-normalized virtual address. Ghidra reads initialized memory, which can include loader fixups; these bytes can differ from the original file. The hexadecimal payload reports the exact returned length; incomplete reads remain explicit and unsupported provider APIs return typed capability unavailability.",
				inputSchema: z.object({
					address,
					length: z.int().min(1).default(256),
					document
				})
			},
			{
				name: "address_to_file_offset",
				effects: evidenceEffects,
				description: "Map one provider-normalized virtual address to its original nonnegative file offset. The mapping is for that address; it does not imply a contiguous file range or that analyzed memory bytes equal file bytes. Hopper verifies the original bytes against the selected executable digest and translates FAT image-relative offsets using the loaded header. Results preserve the provider coordinate, image base, and source path. Unmapped addresses fail explicitly; changed or unavailable sources return typed errors retaining native mapping facts as partial evidence.",
				inputSchema: z.object({
					address,
					document
				})
			}
		];
	})))();
}

//#endregion
//#region dist/contracts/officialToolContracts.js
var decompileAnalysisSelection, OFFICIAL_CLI_CONTRACTS, official, OFFICIAL_TOOL_CONTRACTS;
function init_officialToolContracts() {
	return (init_officialToolContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_analysisDetail();
		init_jsonRecord();
		init_nativeFunctionAnnotations();
		init_toolOutputSchemaGroups();
		init_toolContractHelpers();
		init_toolEffects();
		init_nativeDataType();
		init_nativeInstruction();
		init_functionInstructionContract();
		init_hopperMemoryContracts();
		init_nativeSearch();
		init_procedurePseudocodeSchemas();
		decompileAnalysisSelection = decompileAnalysisSchema.optional().describe("Select standalone analysis. independent_fresh requires independent_decompile. call_destination requires call_destination_decompile and an exact address.");
		OFFICIAL_CLI_CONTRACTS = new Set([
			"annotate_native_function",
			"inspect_native_load_image",
			"inspect_native_data_type",
			"inspect_native_instruction",
			"resolve_native_call_targets",
			"procedure_references",
			"xrefs",
			"search_bytes",
			"read_bytes",
			"address_to_file_offset"
		]);
		official = (name, audit, description, inputSchema, retainedSummary) => {
			const strictInputSchema = inputSchema.strict();
			return {
				name,
				...toolContractMetadata(name, audit),
				description,
				kind: "official-proxy",
				...OFFICIAL_CLI_CONTRACTS.has(name) ? { cli: true } : {},
				requiresActiveTarget: true,
				...retainedSummary === undefined ? {} : { retainedSummary },
				inputSchema: strictInputSchema,
				outputSchema: requireOutputSchema(officialOutputSchemas, name),
				examples: examplesFor(name, strictInputSchema)
			};
		};
		OFFICIAL_TOOL_CONTRACTS = [
			official("annotate_native_function", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true,
				mayDiscardData: true
			}), "Atomically rename one function and/or change entry comments, verify readback, and return its refreshed complete dossier. Ghidra resolves interior addresses to function entries; use procedure_address to select the entry explicitly. Edits change analysis metadata, never executable bytes; empty comment text clears it. Invalid edits roll back together. Ghidra checkpoint mode saves on normal close; ephemeral mode discards edits, including in CLI cleanup. Check binary_session for the mode. Windows P0 and providers without this capability are unsupported.", nativeFunctionAnnotationsInputSchema),
			official("inspect_native_load_image", evidenceEffects, "Inspect provider source digests, loaded mappings, relocations, entries and register context without executing or changing the target. Independent snapshot checks support DOS MZ, selected COM, raw binaries and GameCube DOL; other formats retain observations with unsupported verification. Relocation symbols do not prove runtime binding. detail summary retains complete Evidence for inspect_analysis_view kind native-load-image, collection source_files/mappings/relocations/entry_points/entry_context/checks/sections. Null collections are unrecorded/inapplicable; payload bytes require explicit fields. Overlay and uninitialized coverage remain explicit.", z.strictObject({ detail: analysisDetailSchema }), { evidenceParameters: "omit-detail" }),
			official("inspect_native_data_type", evidenceEffects, "Inspect one recovered type by exact database category path or defined typed data address. Returns observed size, alignment, packing, fields, bitfields, enum values, and child type identities; source-level authority and flexible-tail semantics remain unknown unless substantiated.", nativeDataTypeInputSchema),
			official("inspect_native_instruction", evidenceEffects, "Inspect bytes, mnemonic, operand tokens, flow and typed incoming/outgoing references at one code/data address. Ghidra preserves the query and separately reports a containing listed instruction/data object; unlisted memory is not decoded. References do not establish runtime access, and token-only operands do not establish memory decomposition. Use inspect_native_data_type at a data object's start for layout, without inferring a selected field. Retained references use inspect_analysis_view kind native-instruction-references; null coverage is unavailable or unrecorded.", nativeInstructionInputSchema),
			official("resolve_native_call_targets", evidenceEffects, "Resolve one explicit static call site using typed provider call references. Preserves ambiguous targets as candidates and unresolved computed calls as unknown; does not execute code or traverse a call graph.", nativeInstructionInputSchema),
			official("address_name", evidenceEffects, "Resolve the primary analyzed name at a code or data address. Headless providers require an explicit address; GUI providers may default to their current cursor. Null means the provider has no primary name at that address.", z.object({
				document,
				address: optionalAddress
			})),
			official("comment", evidenceEffects, "Read the regular analysis comment at an explicit address, or the current cursor where supported. Returns null when absent; use set_comment to write one.", z.object({
				document,
				address: optionalAddress
			})),
			official("current_address", evidenceEffects, "Return Hopper's current cursor address for the selected document. Use only for interactive navigation state; prefer explicit addresses in reproducible investigations.", z.object({ document })),
			official("current_procedure", evidenceEffects, "Return the analyzed procedure containing Hopper's current cursor. This uses GUI cursor state and is not a procedure-name lookup.", z.object({ document })),
			official("current_document", evidenceEffects, "Return the document currently selected by REA's Hopper bridge.", z.object({})),
			official("goto_address", toolEffects({
				mutatesSession: true,
				changesUiState: true
			}), "Move Hopper's GUI cursor to a mapped address and return the observed cursor address. Interior coordinates snap to the containing analyzed object's start. Unmapped destinations fail without moving the cursor. This changes navigation state but not analysis data; use explicit-address tools for headless workflows.", z.object({
				address,
				document
			})),
			official("inline_comment", evidenceEffects, "Read the inline instruction comment at an explicit address, or the current cursor where supported. Returns null when absent; use set_inline_comment to write one.", z.object({
				document,
				address: optionalAddress
			})),
			official("list_bookmarks", evidenceEffects, "List every bookmark in the selected Hopper document as address and name pairs; unnamed bookmarks retain a null name. Use bookmarks as analyst-authored navigation aids; this does not discover code references.", z.object({ document })),
			official("list_documents", providerNetworkEvidenceEffects, "List provider program or document identities. Hopper may expose several documents; a Ghidra headless session contains exactly its one imported Program.", z.object({})),
			official("list_names", evidenceEffects, "List every analyzed memory and external symbol as address/value pairs. Provider metadata distinguishes Ghidra primary, dynamic, external, type, and source facts when available. Select detail summary for counts and retained native-inventory pages; complete remains the default.", z.object({
				document,
				address: optionalAddress,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("list_procedures", providerNetworkEvidenceEffects, "List every analyzed procedure as address/value pairs after provider analysis. Ghidra metadata distinguishes thunks and external functions; use returned addresses in later function operations. Select detail summary for counts and retained native-inventory pages; complete remains the default.", z.object({
				document,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("list_segments", evidenceEffects, "List segments or memory blocks using exclusive end addresses. Ghidra reports block permissions, address space, image base, initialization, and overlay facts; Hopper marks unavailable permissions explicitly.", z.object({ document })),
			official("list_strings", providerNetworkEvidenceEffects, "List every provider-reported string object or candidate, or filter to one address, as address/value pairs with encoding, terminator status, and byte length when available. Hopper reads complete typed objects and retains its original display text as provider_value; long literals may span adjacent unterminated objects. Kuna scans mapped printable sequences of at least five characters, including unterminated fragments; references are not computed. Select detail summary for counts and retained native-inventory pages; complete remains the default.", z.object({
				document,
				address: optionalAddress,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("next_address", evidenceEffects, "Return the next analyzed object address after an explicit address or current cursor. This is a navigation primitive, not instruction-flow or CFG analysis.", z.object({
				document,
				address: optionalAddress
			})),
			official("prev_address", evidenceEffects, "Return the previous analyzed object start before an explicit address or current cursor. This is a navigation primitive and may fail at document boundaries; data objects and instructions remain distinct from control flow.", z.object({
				document,
				address: optionalAddress
			})),
			official("procedure_address", providerNetworkEvidenceEffects, "Resolve an unambiguous procedure symbol name or provider-normalized address to its canonical entry address. External address spaces remain explicit. Select detail summary for selected facts and a context digest; native-observation and native-context views retain complete source access.", z.object({
				procedure,
				document,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("procedure_assembly", providerUiNetworkEvidenceEffects, "Return assembly for one analyzed procedure identified by symbol or hexadecimal address. Use when pseudocode loses calling-convention or instruction-level detail; output is currently returned as one unpaginated string. Ghidra terminal-call assumptions that may cut the analyzed body are reported in Evidence limitations.", z.object({
				procedure,
				document
			})),
			official("procedure_callees", providerNetworkEvidenceEffects, "Return the provider's resolved direct callees for one procedure identified by symbol or address. Unresolved indirect calls may be absent; use analyze_function and typed references to preserve available edge uncertainty. Ghidra terminal-call assumptions that may cut the analyzed body are reported in Evidence limitations. Select detail summary for selected facts and a context digest; native-observation and native-context views retain complete source access.", z.object({
				procedure,
				document,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("procedure_callers", providerNetworkEvidenceEffects, "Return the provider's resolved direct callers for one procedure identified by symbol or address. Results reflect completed static analysis and may omit unresolved indirect references. Ghidra terminal-call assumptions that may cut the analyzed body are reported in Evidence limitations. Select detail summary for selected facts and a context digest; native-observation and native-context views retain complete source access.", z.object({
				procedure,
				document,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("procedure_info", evidenceEffects, "Return provider metadata for one procedure identified by symbol or address: entrypoint, signature, locals, size, block count, and complete inclusive body ranges when observed. Extents reflect the provider's analyzed body; Ghidra terminal-call assumptions that may cut it are reported in Evidence limitations. Hopper locals preserve observed names and signed stack displacements; source types remain unknown. Body byte count and enclosing span remain distinct; unavailable extent is explicit.", z.object({
				procedure,
				document
			})),
			official("read_function_instructions", providerUiNetworkEvidenceEffects, "Return every raw instruction for one analyzed procedure. Instruction text and body extent are provider-specific. Ghidra terminal-call assumptions that may cut the analyzed body are reported in limitations.", functionInstructionInputSchema),
			...HOPPER_MEMORY_TOOL_DEFINITIONS.map(({ name, effects, description, inputSchema }) => official(name, effects, description, inputSchema)),
			official("procedure_references", evidenceEffects, "Return incoming or outgoing reference edges for one procedure. Ghidra preserves detailed reference flags; Hopper preserves native CallReference classifications and exact endpoints. Select detail summary to retain complete Evidence and page references or unresolved calls using inspect_analysis_view kind native-procedure-references. Page coverage describes retained observations, not complete discovery or proof the target ran.", z.object({
				procedure,
				direction: z.enum(["incoming", "outgoing"]).default("outgoing"),
				document,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("procedure_pseudo_code", providerUiNetworkEvidenceEffects, "Decompile one analyzed procedure by symbol or provider-normalized address. Returns provider-specific pseudocode or null, never original source; raw_result.pseudocode_absence distinguishes reported provider-failure from not-in-export, otherwise the cause is unknown. Use procedure_assembly for instruction precision. detail summary retains text for inspect_analysis_view native/pseudocode pages without another decompile; complete is default. analysis: independent_fresh requests a separate attempt only when binary_session advertises independent_decompile; it may use different analysis context. analysis: call_destination attempts standalone decompilation at an exact incoming direct call to an arm64 Mach-O address outside the procedure inventory when the capability declares call_destination_decompile. The result retains the call site and does not establish a discovered procedure. Ghidra accepts file-offset:0x... or unique file offsets when a 0x selector resolves to no procedure; existing analysis addresses take precedence, and space-qualified addresses avoid that fallback. Its terminal-call assumptions may truncate the analyzed body, as limitations report.", z.object({
				procedure,
				document,
				analysis: decompileAnalysisSelection,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("resolve_containing_procedure", providerNetworkEvidenceEffects, "Resolve an arbitrary address, including an interior instruction or exact external entry, to its provider-analyzed containing procedure. A negative result distinguishes outside segments from not in a procedure and is never guessed from nearby symbols. Select detail summary for selected facts and a context digest; native-observation and native-context views retain complete source access.", z.object({
				address,
				document,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("search_procedures", providerNetworkEvidenceEffects, "Find analyzed procedures by literal name (default) or regex, including accepted secondary names. Returns deterministic provider-inventory matches under primary names with matched_aliases and available thunk/external metadata. For Ghidra case-insensitive literal searches, raw_result retains unfiltered candidates; normalized_result holds matches. detail summary retains native-inventory pages. Regex uses Java Pattern in Ghidra and ECMAScript Unicode in Kuna, IDA and Hopper; binary_session and errors report effective limits and recovery.", z.object({
				...nativeSearchInput,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("search_strings", providerNetworkEvidenceEffects, "Find provider-reported strings by literal text (default) or regex. Complete results cover that inventory, not all artifact text; packed/undefined strings or independently matched fragments may be missing. Ghidra search_bytes finds known encoded bytes without establishing string identity/use; xrefs inspects references at a known address. Kuna scans mapped sequences of at least five characters without references or read_bytes. Hopper preserves decoded typed objects, display text and decoding unknowns. For Ghidra case-insensitive literal searches, raw_result holds candidates; normalized_result holds matches. detail summary retains native-inventory pages. Regex uses Java Pattern in Ghidra and ECMAScript Unicode elsewhere; binary_session/errors report limits.", z.object({
				...nativeSearchInput,
				detail: analysisDetailSchema
			}), { evidenceParameters: "omit-detail" }),
			official("set_address_name", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				mayDiscardData: true
			}), "Assign an analyst name to one mapped hexadecimal address and report whether the native edit succeeded and exact readback matched. Hopper rejects symbol names exceeding 1024 UTF-16 code units before mutation, and rejects names owned by another address; use set_addresses_names to explicitly move or swap labels among selected addresses. This mutates analysis metadata.", z.object({
				address,
				name: z.string(),
				document
			})),
			official("set_addresses_names", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				mayDiscardData: true
			}), "Assign analyst names to multiple mapped addresses in one call and return per-address edit/readback success booleans. Hopper validates mapped destinations, native string representations, its 1024 UTF-16 code-unit symbol-name limit, and unique destinations/names before applying edits; its labels may move or swap only among explicitly selected addresses, and unselected label owners remain unchanged. Ghidra rejects any address whose name another selected address also requests or holds in that namespace; others still apply, with reasons in raw_result.failures. This mutates analysis metadata; verify failures individually.", z.object({
				names: jsonRecordSchema(z.string()),
				document
			})),
			official("set_bookmark", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				mayDiscardData: true
			}), "Create or update a bookmark at a mapped hexadecimal address and report readback success. Omit name to preserve an existing name or create an unnamed bookmark; an empty string clears the bookmark name. This mutates navigation metadata; bookmarks are analyst-authored navigation aids, not binary evidence.", z.object({
				address,
				name: z.string().optional(),
				document
			})),
			official("set_comment", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				mayDiscardData: true
			}), "Write a regular analysis comment at a hexadecimal address and return whether readback matched. An empty comment clears it. This mutates the Hopper document; use comments to record evidence IDs or reasoning.", z.object({
				address,
				comment: z.string(),
				document
			})),
			official("set_inline_comment", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				mayDiscardData: true
			}), "Write an inline instruction comment at a hexadecimal address and return whether readback matched. An empty comment clears it; Hopper may flatten newlines, producing false on exact readback. This mutates analysis metadata.", z.object({
				address,
				comment: z.string(),
				document
			})),
			official("unset_bookmark", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				mayDiscardData: true
			}), "Remove the bookmark at a mapped hexadecimal address and return whether it is absent. Hopper also permits removing an existing legacy bookmark outside mapped memory. This mutates navigation metadata and does not alter binary bytes.", z.object({
				address,
				document
			})),
			official("xrefs", providerNetworkEvidenceEffects, "Return analyzed references to a code or data address. Hopper may default to its current cursor; headless providers such as Ghidra require an explicit address. Kuna also accepts names in its own inventory, including data names; an unlisted name may still exist in the target. Use to connect strings, globals, selectors, and functions; bare addresses are untyped and indirect references may be incomplete. Page a retained result with inspect_analysis_view and native-observation; use native-context for source caveats. Use inspect_native_instruction at the target address for typed incoming references where supported.", z.object({
				document,
				address: optionalAddress
			}))
		];
	})))();
}

//#endregion
export { ENHANCED_TOOL_CONTRACTS, OFFICIAL_TOOL_CONTRACTS, init_enhancedToolContracts, init_officialToolContracts };