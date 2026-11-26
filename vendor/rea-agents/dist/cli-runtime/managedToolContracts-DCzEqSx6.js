import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, distinctItems, init_localPath, init_schemaConstraints } from "./jsonSerialization-DAF9DVXC.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { analysisDetailSchema, compareManagedMembersRequestSchema, evidenceEffects, init_analysisDetail, init_managedApplicationGraph, init_managedMemberComparison, init_managedNativeVerificationSchemas, init_managedReconstruction, init_toolEffects, init_toolOutputSchemaGroups, init_toolOutputSchemaPrimitives, managedApplicationGraphReferenceInputSchema, managedNativeVerificationRequestSchema, managedOutputSchemas, managedReconstructionImportRequestSchema, managedWorkflowOutputSchemas, requireOutputSchema, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";
import { init_managedInspectionLimits, managedInspectionBudgetShape } from "./managedInspectionLimits-BiqjZJWO.js";
import { z } from "zod";

//#region dist/contracts/managed/managedWorkflowExamples.js
var MANAGED_STATIC_EXAMPLE_PROVIDER, NATIVE_EXAMPLE_PROVIDER, emptyManagedMembers, evidence, runtimeMembers, MANAGED_MEMBER_COMPARISON_EXAMPLE, runtimeExampleEvidence, MANAGED_APPLICATION_GRAPH_EXAMPLE, boundaryEvidence, nativeExportEvidence, coverage, MANAGED_RECONSTRUCTION_IMPORT_EXAMPLE, MANAGED_NATIVE_VERIFICATION_EXAMPLE;
function init_managedWorkflowExamples() {
	return (init_managedWorkflowExamples = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		MANAGED_STATIC_EXAMPLE_PROVIDER = {
			id: "rea-dotnet-static",
			name: "REA managed static analysis provider",
			version: "1"
		};
		NATIVE_EXAMPLE_PROVIDER = {
			id: "native-macos",
			name: "REA native macOS provider",
			version: "1"
		};
		emptyManagedMembers = (sha256, mvid) => ({
			signature_resolution: null,
			assembly: null,
			artifact: {
				path: `/examples/${sha256.slice(0, 8)}.dll`,
				sha256,
				byte_length: 4096,
				format: "pe"
			},
			module: {
				name: "Example.dll",
				generation: 0,
				mvid,
				enc_id: null,
				enc_base_id: null,
				token: "0x00000001",
				row_offset: 0
			},
			metadata: {
				status: "complete",
				version: "v4.0.30319",
				table_row_counts: {}
			},
			identity_scope: {
				token_identity: "build-local",
				requires_artifact_sha256: sha256,
				requires_mvid: mvid
			},
			types: [],
			nesting_read: true,
			method_rows: {
				offset: 0,
				count: 0,
				total: 0
			},
			exported_types: [],
			fields: [],
			methods: [],
			member_refs: [],
			call_edges: [],
			field_accesses: [],
			user_strings: {
				state: "complete",
				literals: [],
				issues: []
			},
			selection: null,
			coverage: {
				state: "complete",
				issues: []
			},
			limitations: []
		});
		evidence = (result) => createEvidence(unknownTarget("not-observed"), MANAGED_STATIC_EXAMPLE_PROVIDER, {
			operation: "inspect_managed_members",
			parameters: {},
			result,
			rawResult: null,
			limitations: result.limitations
		});
		runtimeMembers = () => {
			const result = emptyManagedMembers("2".repeat(64), "11112222-3333-4444-9555-666677778888");
			return {
				...result,
				signature_resolution: "type-names-v2",
				method_rows: {
					offset: 0,
					count: 1,
					total: 1
				},
				methods: [{
					token: "0x06000001",
					row_offset: 128,
					declaring_type_token: "0x02000001",
					declaring_type: "Example.Program",
					name: "Main",
					rva: 8192,
					impl_flags: 0,
					flags: 22,
					signature: {
						raw_length: 3,
						raw_sha256: "3".repeat(64),
						resolved_sha256: "3".repeat(64),
						kind: "method",
						parse_status: "decoded",
						calling_convention: "default",
						generic_parameter_count: 0,
						parameter_count: 0,
						return_type: "void",
						parameter_types: [],
						field_type: null,
						issue: null
					},
					body: {
						status: "present",
						header_format: "tiny",
						rva: 8192,
						file_offset: 512,
						max_stack: 8,
						init_locals: false,
						local_var_sig_token: null,
						local_var_signature: null,
						il_size: 1,
						il_sha256: "4".repeat(64),
						normalized_il_sha256: "5".repeat(64),
						instruction_count: 1,
						decoded_instruction_count: 1,
						truncated_instructions: 0,
						opcode_counts: { ret: 1 },
						anchors: [],
						exception_regions: [],
						issue: null
					}
				}]
			};
		};
		MANAGED_MEMBER_COMPARISON_EXAMPLE = {
			left: evidence(emptyManagedMembers("0".repeat(64), "00112233-4455-6677-8899-aabbccddeeff")),
			right: evidence(emptyManagedMembers("1".repeat(64), "ffeeddcc-bbaa-4988-9766-554433221100"))
		};
		runtimeExampleEvidence = evidence(runtimeMembers());
		MANAGED_APPLICATION_GRAPH_EXAMPLE = { managed_members: runtimeExampleEvidence };
		boundaryEvidence = () => {
			const result = {
				artifact: {
					path: "/examples/ManagedInterop.exe",
					sha256: "6".repeat(64),
					byte_length: 8192,
					format: "pe"
				},
				module: {
					name: "ManagedInterop.exe",
					generation: 0,
					mvid: "00112233-4455-4677-8899-aabbccddeeff",
					enc_id: null,
					enc_base_id: null,
					token: "0x00000001",
					row_offset: 0
				},
				metadata: {
					status: "complete",
					version: "v4.0.30319",
					table_row_counts: {}
				},
				identity_scope: {
					token_identity: "build-local",
					requires_artifact_sha256: "6".repeat(64),
					requires_mvid: "00112233-4455-4677-8899-aabbccddeeff"
				},
				cli_native: {
					il_only: true,
					requires_32bit: false,
					strong_name_signed: false,
					native_entry_point: false,
					ready_to_run_signature: false,
					managed_native_header_rva: 0,
					managed_native_header_size: 0
				},
				module_refs: [{
					token: "0x1a000001",
					row_offset: 256,
					name: "nativehelper.dll"
				}],
				pinvoke_imports: [{
					token: "0x1c000001",
					row_offset: 288,
					mapping_flags: 0,
					mapping_flags_hex: "0x0000",
					member_token: "0x06000001",
					member_kind: "method",
					member_name: "OpenNative",
					import_name: "open_native",
					import_scope_token: "0x1a000001",
					import_scope_name: "nativehelper.dll",
					no_mangle: true,
					char_set: "not-specified",
					call_convention: "cdecl",
					supports_last_error: false,
					best_fit: "assembly-default",
					throw_on_unmappable_char: "assembly-default",
					verification: "managed-declaration-only"
				}],
				native_implementations: [],
				summary: {
					module_ref_count: 1,
					pinvoke_import_count: 1,
					native_implementation_count: 0,
					ready_to_run: false,
					mixed_mode_or_native_header: false
				},
				coverage: {
					state: "complete",
					issues: []
				},
				limitations: []
			};
			return createEvidence(unknownTarget("not-observed"), MANAGED_STATIC_EXAMPLE_PROVIDER, {
				operation: "inspect_managed_native_boundaries",
				parameters: {},
				result,
				rawResult: null,
				limitations: result.limitations
			});
		};
		nativeExportEvidence = () => {
			const result = {
				format: "mach-o",
				selected_architecture: {
					name: "x86_64",
					container_file_offset: null
				},
				endian: "little",
				word_size: 64,
				file_type: "dylib",
				flags: [],
				uuid: null,
				entrypoints: coverage([]),
				architectures: coverage([]),
				build_metadata: coverage([]),
				load_commands: coverage([]),
				dependencies: coverage([]),
				imports: coverage([]),
				exports: coverage([{
					name: "open_native",
					runtime_name: "open_native",
					address: "0x1000",
					weak: false,
					reexport: false,
					source: "nm"
				}]),
				segments: coverage([]),
				encryption: coverage([]),
				provenance: [],
				limitations: ["Selected Mach-O slice container offset is unknown in this synthetic example."]
			};
			return createEvidence({
				path: "/examples/nativehelper.dll",
				sha256: "7".repeat(64),
				format: "mach-o",
				architecture: "x86_64"
			}, NATIVE_EXAMPLE_PROVIDER, {
				operation: "inspect_macho",
				parameters: {},
				result,
				rawResult: null,
				limitations: result.limitations
			});
		};
		coverage = (items) => ({
			items: [...items],
			total: items.length,
			exhaustive: true,
			limitations: []
		});
		MANAGED_RECONSTRUCTION_IMPORT_EXAMPLE = {
			static_members: runtimeExampleEvidence,
			decompiler: {
				name: "ilspycmd",
				version: "9.1.0.7988",
				family: "ilspy",
				executable_sha256: null,
				options: [
					"--disable-updatecheck",
					"--type",
					"Example.Program"
				]
			},
			methods: [{
				token: "0x06000001",
				signature_sha256: "3".repeat(64),
				normalized_il_sha256: "5".repeat(64),
				reconstruction: {
					kind: "decompiled-csharp",
					language: "csharp",
					text: "internal static void Main() { }",
					source_path: "/examples/Example.Program.cs",
					start_line: 1,
					end_line: 1
				}
			}],
			notes: ["Synthetic example only; decompiler output is imported as inference."]
		};
		MANAGED_NATIVE_VERIFICATION_EXAMPLE = {
			managed_boundaries: boundaryEvidence(),
			native_observations: [nativeExportEvidence()]
		};
	})))();
}

//#endregion
//#region dist/contracts/managed/managedWorkflowToolContracts.js
var comparisonOutputSchema, reconstructionOutputSchema, nativeVerificationOutputSchema, managedApplicationGraphOutputSchema, MANAGED_WORKFLOW_TOOL_CONTRACTS;
function init_managedWorkflowToolContracts() {
	return (init_managedWorkflowToolContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_managedApplicationGraph();
		init_managedMemberComparison();
		init_managedNativeVerificationSchemas();
		init_managedReconstruction();
		init_toolOutputSchemaGroups();
		init_managedWorkflowExamples();
		init_toolEffects();
		comparisonOutputSchema = requireOutputSchema(managedWorkflowOutputSchemas, "compare_managed_members");
		reconstructionOutputSchema = requireOutputSchema(managedWorkflowOutputSchemas, "import_managed_reconstruction");
		nativeVerificationOutputSchema = requireOutputSchema(managedWorkflowOutputSchemas, "verify_managed_native_boundaries");
		managedApplicationGraphOutputSchema = requireOutputSchema(managedWorkflowOutputSchemas, "project_managed_application_graph");
		MANAGED_WORKFLOW_TOOL_CONTRACTS = [
			{
				name: "compare_managed_members",
				cli: true,
				...toolContractMetadata("compare_managed_members", evidenceEffects),
				description: "Compare two authenticated inspect_managed_members Evidence records, inline or retained, using unique exact type/name/signature/CIL or decoded structural matches. Names alone never establish correspondence; undecoded signatures, unresolved declaring types and ambiguous candidates remain unknown rather than added/removed. Structural cross-name matching cannot consume a member whose own type/name counterpart remains unpaired. Matched methods compare aligned call-site shapes and observed target names; unaligned or missing facts stay unknown. Tokens remain local to each artifact SHA-256/MVID; tuple hashes do not remap them. Static call names do not prove overload identity or runtime dispatch.",
				kind: "application",
				inputSchema: compareManagedMembersRequestSchema,
				outputSchema: comparisonOutputSchema,
				examples: [{
					title: "Compare two managed member observations",
					input: {
						left: MANAGED_MEMBER_COMPARISON_EXAMPLE.left,
						right: MANAGED_MEMBER_COMPARISON_EXAMPLE.right
					}
				}]
			},
			{
				name: "verify_managed_native_boundaries",
				cli: true,
				...toolContractMetadata("verify_managed_native_boundaries", evidenceEffects),
				description: "Verify managed P/Invoke/native-boundary declarations against authenticated native export or function Evidence, with inline or exact retained sources, without executing managed code or translating managed metadata tokens into native addresses. The workflow preserves declaration-only, verified, inferred, contradicted, and unresolved states; a name candidate with missing managed or native module identity remains unresolved with its candidate evidence retained.",
				kind: "application",
				inputSchema: managedNativeVerificationRequestSchema,
				outputSchema: nativeVerificationOutputSchema,
				examples: [{
					title: "Verify a managed P/Invoke declaration against native Evidence",
					input: {
						managed_boundaries: MANAGED_NATIVE_VERIFICATION_EXAMPLE.managed_boundaries,
						native_observations: MANAGED_NATIVE_VERIFICATION_EXAMPLE.native_observations
					}
				}]
			},
			{
				name: "import_managed_reconstruction",
				cli: true,
				...toolContractMetadata("import_managed_reconstruction", evidenceEffects),
				description: "Import decompiler-produced managed reconstruction against authenticated inspect_managed_members Evidence supplied inline or by exact retained reference. The workflow locks each method to artifact SHA-256, MVID, metadata token, signature hash, and the limited decoded-IL tuple hash, records the decompiler identity and options, and marks C# or pseudocode as analyst inference rather than canonical byte observation.",
				kind: "application",
				inputSchema: managedReconstructionImportRequestSchema,
				outputSchema: reconstructionOutputSchema,
				examples: [{
					title: "Import a decompiler reconstruction for one managed method",
					input: {
						static_members: MANAGED_RECONSTRUCTION_IMPORT_EXAMPLE.static_members,
						decompiler: MANAGED_RECONSTRUCTION_IMPORT_EXAMPLE.decompiler,
						methods: MANAGED_RECONSTRUCTION_IMPORT_EXAMPLE.methods,
						notes: MANAGED_RECONSTRUCTION_IMPORT_EXAMPLE.notes
					}
				}]
			},
			{
				name: "project_managed_application_graph",
				cli: true,
				...toolContractMetadata("project_managed_application_graph", evidenceEffects),
				description: "Project authenticated managed artifact, member, and native-boundary Evidence, supplied inline or by exact retained reference, into the provider-neutral application graph without executing managed code, loading assemblies, or translating managed metadata tokens to native addresses. The graph preserves managed static observations as managed-specific nodes linked to source Evidence, with in-module calls and field-access edges; other call and field-access sites are counted in limitations.",
				kind: "application",
				inputSchema: managedApplicationGraphReferenceInputSchema,
				outputSchema: managedApplicationGraphOutputSchema,
				examples: [{
					title: "Project static managed observations into an application graph",
					input: { managed_members: MANAGED_APPLICATION_GRAPH_EXAMPLE.managed_members }
				}]
			}
		];
	})))();
}

//#endregion
//#region dist/contracts/managed/managedToolContracts.js
var managedTargetInputSchema, managedArtifactInputSchema, managedMembersInputSchema, outputSchema, memberOutputSchema, nativeBoundaryOutputSchema, MANAGED_TOOL_CONTRACTS, isManagedToolName;
function init_managedToolContracts() {
	return (init_managedToolContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_toolOutputSchemaGroups();
		init_toolEffects();
		init_localPath();
		init_schemaConstraints();
		init_analysisDetail();
		init_managedInspectionLimits();
		managedTargetInputSchema = z.strictObject({
			...managedInspectionBudgetShape,
			path: absoluteLocalPathStringSchema.describe("Explicit absolute managed PE/CLI path; omit to reuse the previously selected managed target").optional()
		});
		managedArtifactInputSchema = managedTargetInputSchema.extend({ detail: analysisDetailSchema });
		managedMembersInputSchema = managedArtifactInputSchema.extend({ type_names: distinctItems(z.array(z.string().min(1).describe("Exact declaring-type full_name: namespace-qualified for top-level types (System.Threading.Monitor); nested types report their bare name, so it selects every nested type of that name")).min(1), "type_names must not repeat a name").describe("Inspect only the fields, methods, call edges, and field accesses declared by these exact type full names, and the user strings their method bodies load; omit to inspect every type. Unmatched names are reported in selection.unmatched_type_names.").optional() });
		outputSchema = requireOutputSchema(managedOutputSchemas, "inspect_managed_artifact");
		memberOutputSchema = requireOutputSchema(managedOutputSchemas, "inspect_managed_members");
		nativeBoundaryOutputSchema = requireOutputSchema(managedOutputSchemas, "inspect_managed_native_boundaries");
		MANAGED_TOOL_CONTRACTS = [
			{
				name: "inspect_managed_artifact",
				cli: true,
				retainedSummary: { evidenceParameters: "omit-detail" },
				...toolContractMetadata("inspect_managed_artifact", evidenceEffects),
				description: "Inspect PE/CLI identity, classification and metadata inventories from an explicit path or selected managed target without loading or executing code. Default complete returns all producer facts; detail summary retains them and returns identity, assembly/MVID, frameworks, coverage and counts. Page references/resources/attributes with inspect_analysis_view kind managed and normalized_result.parent_evidence_id. Counts cover returned rows; partial, malformed and unavailable metadata stay explicit. Tokens are build-local. Use inspect_managed_members for methods, signatures and CIL anchors.",
				kind: "managed-provider",
				inputSchema: managedArtifactInputSchema,
				outputSchema,
				examples: [{
					title: "Example inspect managed artifact request",
					input: { path: "/tmp/Example.dll" }
				}, {
					title: "Inspect identity and coverage without unrelated metadata inventories",
					input: {
						path: "/tmp/Example.dll",
						detail: "summary"
					}
				}]
			},
			{
				name: "inspect_managed_members",
				cli: true,
				retainedSummary: { evidenceParameters: "omit-detail" },
				...toolContractMetadata("inspect_managed_members", evidenceEffects),
				description: "Inspect PE/CLI types, members, signatures, CIL hashes/instruction tuples, exception regions, static calls, field accesses and loaded #US strings without executing code. type_names selects exact declaring types and their body literals; assembly-wide member_refs/exported_types are still included. Tokens remain local to artifact SHA-256/MVID; tuple hashes do not resolve them or fully commit control flow. Default complete returns collections; detail summary retains them for inspect_analysis_view kind managed-members using parent_evidence_id. Page types/exported_types/fields/methods/member_refs/call_edges/field_accesses/user_strings or unresolved_definitions for checked rows with failed name columns. Exact names/declaring_types and fields narrow supported rows. Omit body to avoid IL anchors. Unmatched names and incomplete coverage stay explicit.",
				kind: "managed-provider",
				inputSchema: managedMembersInputSchema,
				outputSchema: memberOutputSchema,
				examples: [
					{
						title: "Example inspect managed members request",
						input: {}
					},
					{
						title: "Example inspect selected managed types request",
						input: {
							path: "/tmp/mscorlib.dll",
							type_names: ["System.Threading.Monitor"]
						}
					},
					{
						title: "Summarize selected managed types and retain their members",
						input: {
							path: "/tmp/mscorlib.dll",
							type_names: ["System.Threading.Monitor"],
							detail: "summary"
						}
					}
				]
			},
			{
				name: "inspect_managed_native_boundaries",
				cli: true,
				...toolContractMetadata("inspect_managed_native_boundaries", evidenceEffects),
				description: "Inspect PE/CLI ModuleRef, ImplMap/PInvoke declarations, CLI native-header indicators, and non-IL method implementation flags without loading or executing target code. Results are managed declarations and degraded native-boundary observations, not verified native exports or addresses.",
				kind: "managed-provider",
				inputSchema: managedTargetInputSchema,
				outputSchema: nativeBoundaryOutputSchema,
				examples: [{
					title: "Example inspect managed/native boundary request",
					input: {}
				}]
			}
		];
		isManagedToolName = (name) => MANAGED_TOOL_CONTRACTS.some((contract) => contract.name === name);
	})))();
}

//#endregion
export { MANAGED_TOOL_CONTRACTS, MANAGED_WORKFLOW_TOOL_CONTRACTS, init_managedToolContracts, init_managedWorkflowToolContracts, isManagedToolName, managedArtifactInputSchema, managedMembersInputSchema, managedTargetInputSchema };