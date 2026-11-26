import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { evmInterfaceSchema, evmInterfaceSummaryViewResultSchema, init_analysisViewResult, init_evmInterface, inspectEvmInterfaceInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, analysisDetailSchema, init_analysisDetail, init_toolEffects, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";

//#region dist/contracts/evm/evmToolContracts.js
var evmInterfaceInspectionInputSchema, INSPECT_EVM_INTERFACE_CONTRACT, EVM_TOOL_CONTRACTS;
function init_evmToolContracts() {
	return (init_evmToolContracts = __esmMin((() => {
		init_evmInterface();
		init_toolEffects();
		init_analysisDetail();
		init_analysisViewResult();
		evmInterfaceInspectionInputSchema = inspectEvmInterfaceInputSchema.extend({ detail: analysisDetailSchema });
		INSPECT_EVM_INTERFACE_CONTRACT = {
			name: "inspect_evm_interface",
			availability: { host: "evmInterface" },
			cli: true,
			...toolContractMetadata("inspect_evm_interface", toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				launchesProcess: true
			})),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Infer interface candidates from explicit local flat EVM bytecode using bundled EVMole 0.9.3/WASM; select raw or hex encoding. Linux x64 profile; EOF-style EF00 containers are unsupported. Returns selectors, offsets, arguments and mutability candidates, not verified deployment or runtime behavior. Bytecode kind, hardfork and discovery completeness stay unknown. Default complete includes bytecode/full Evidence; detail summary retains it for inspect_analysis_view kind evm, facets functions/bytecode_hex/stdout/stderr, via parent_evidence_id. timeout_ms and producer_limits are independent of each other and worker heap; tighter inherited limits still apply. No target execution, chain/RPC access, signature lookup, wallet action or broadcast.",
			inputSchema: evmInterfaceInspectionInputSchema,
			outputSchema: analysisDetailOutputSchemaOf(evmInterfaceSchema, evmInterfaceSummaryViewResultSchema),
			examples: [{
				title: "Inspect a local runtime bytecode hex carrier",
				input: {
					path: "/artifacts/runtime.hex",
					encoding: "hex"
				}
			}, {
				title: "Read every inferred interface candidate without bytecode text",
				input: {
					path: "/artifacts/runtime.hex",
					encoding: "hex",
					detail: "summary"
				}
			}]
		};
		EVM_TOOL_CONTRACTS = [INSPECT_EVM_INTERFACE_CONTRACT];
	})))();
}

//#endregion
export { EVM_TOOL_CONTRACTS, INSPECT_EVM_INTERFACE_CONTRACT, init_evmToolContracts };