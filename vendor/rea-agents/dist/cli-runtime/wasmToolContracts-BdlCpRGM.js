import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_wasmArtifact, init_wasmInterface, inspectWasmArtifactInputSchema, wasmArtifactSchema, wasmInterfaceByteBudgetSchema, wasmInterfaceSchema } from "./jsonSerialization-DAF9DVXC.js";
import { evidenceInputSchema, init_evidenceReference } from "./nativeValueFlow-13oOEkkJ.js";
import { init_analysisViewResult, wasmArtifactSummaryViewResultSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, analysisDetailSchema, evidenceEffects, evidenceResultOf, init_analysisDetail, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/contracts/wasm/wasmComparisonContracts.js
var compareWasmInterfacesInputSchema, identity, wasmInterfaceComparisonSchema, COMPARE_WASM_INTERFACES_CONTRACT;
function init_wasmComparisonContracts() {
	return (init_wasmComparisonContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_evidenceReference();
		init_wasmInterface();
		init_toolEffects();
		compareWasmInterfacesInputSchema = z.strictObject({
			left: evidenceInputSchema.describe("Exact complete inspect_wasm_artifact Evidence or retained session reference"),
			right: evidenceInputSchema.describe("Exact complete inspect_wasm_artifact Evidence or retained session reference"),
			max_interface_bytes: wasmInterfaceByteBudgetSchema,
			scope: z.enum([
				"imports",
				"exports",
				"both"
			]).describe("Explicit interface selection; static equality does not establish runtime compatibility")
		});
		identity = z.object({
			evidence_id: z.string(),
			artifact: z.object({
				path: z.string(),
				sha256: z.string(),
				bytes: z.int().nonnegative()
			})
		});
		wasmInterfaceComparisonSchema = z.object({
			left: identity,
			right: identity,
			scope: z.enum([
				"imports",
				"exports",
				"both"
			]),
			coverage: z.enum([
				"complete-within-inputs",
				"partial",
				"unknown"
			]),
			changes: z.array(z.object({
				direction: z.enum(["import", "export"]),
				module: z.string().nullable(),
				name: z.string(),
				state: z.enum([
					"added",
					"removed",
					"changed",
					"unchanged",
					"unknown"
				]),
				left: wasmInterfaceSchema.shape.entries,
				right: wasmInterfaceSchema.shape.entries,
				reason: z.string().nullable()
			})),
			summary: z.object({
				added: z.number(),
				removed: z.number(),
				changed: z.number(),
				unchanged: z.number(),
				unknown: z.number()
			}),
			limitations: z.array(z.string())
		});
		COMPARE_WASM_INTERFACES_CONTRACT = {
			name: "compare_wasm_interfaces",
			cli: true,
			...toolContractMetadata("compare_wasm_interfaces", evidenceEffects),
			kind: "application",
			description: "Compare typed core WASM import/export names, kinds and exact signatures from two authenticated inspect_wasm_artifact Evidence records. Select imports, exports or both explicitly. MCP references resolve in the current session; CLI references use an explicitly selected --evidence-bundle. max_interface_bytes selects this comparison's independent representation allowance (default 32MiB); raising it cannot restore omitted producer facts. Duplicate names, unsupported types and missing historical interface facets remain unknown. Preserve original module digests and every occurrence; no source acquisition, module execution or runtime-compatibility inference.",
			inputSchema: compareWasmInterfacesInputSchema,
			outputSchema: evidenceResultOf(wasmInterfaceComparisonSchema),
			examples: []
		};
	})))();
}

//#endregion
//#region dist/contracts/wasm/wasmToolContracts.js
var wasmArtifactInspectionInputSchema, INSPECT_WASM_ARTIFACT_CONTRACT, WASM_TOOL_CONTRACTS;
function init_wasmToolContracts() {
	return (init_wasmToolContracts = __esmMin((() => {
		init_wasmComparisonContracts();
		init_wasmArtifact();
		init_toolEffects();
		init_analysisDetail();
		init_analysisViewResult();
		wasmArtifactInspectionInputSchema = inspectWasmArtifactInputSchema.extend({ detail: analysisDetailSchema });
		INSPECT_WASM_ARTIFACT_CONTRACT = {
			name: "inspect_wasm_artifact",
			cli: true,
			...toolContractMetadata("inspect_wasm_artifact", toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				launchesProcess: true
			})),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Validate and inspect local WASM with caller-supplied WABT 1.0.42, without executing it or fetching dependencies. Returns artifact SHA-256, sections, import/export WAT forms and decoded WAT; custom-section interpretation warnings do not invalidate the core module. Default complete returns full Evidence; detail summary retains it for inspect_analysis_view kind wasm using normalized_result.parent_evidence_id, with import/export rows or UTF-16 WAT pages. Delivery does not change analysis. Optional JavaScript glue associations preserve ambiguous candidates. Configure absolute REA_WABT_BIN_DIRECTORY. Per-call command_timeout_ms, input/tool/output, interface-precision and auxiliary-path budgets are independent; reported limit errors identify the control to adjust. No installation or original-source claim.",
			inputSchema: wasmArtifactInspectionInputSchema,
			outputSchema: analysisDetailOutputSchemaOf(wasmArtifactSchema, wasmArtifactSummaryViewResultSchema),
			examples: [{
				title: "Inspect a selected local WASM module",
				input: {
					path: "/artifacts/module.wasm",
					glue_paths: [],
					candidate_paths: []
				}
			}]
		};
		WASM_TOOL_CONTRACTS = [INSPECT_WASM_ARTIFACT_CONTRACT, COMPARE_WASM_INTERFACES_CONTRACT];
	})))();
}

//#endregion
export { COMPARE_WASM_INTERFACES_CONTRACT, INSPECT_WASM_ARTIFACT_CONTRACT, WASM_TOOL_CONTRACTS, compareWasmInterfacesInputSchema, init_wasmComparisonContracts, init_wasmToolContracts, wasmInterfaceComparisonSchema };