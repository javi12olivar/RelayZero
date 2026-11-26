import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { goBinarySchema, goBinarySummaryViewResultSchema, init_analysisViewResult, init_goBinary, inspectGoBinaryInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, evidenceEffects, init_analysisDetail, init_toolEffects, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";

//#region dist/contracts/go/goToolContracts.js
var GO_TOOL_CONTRACTS;
function init_goToolContracts() {
	return (init_goToolContracts = __esmMin((() => {
		init_goBinary();
		init_toolEffects();
		init_analysisDetail();
		init_analysisViewResult();
		GO_TOOL_CONTRACTS = [{
			name: "inspect_go_binary",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_go_binary", evidenceEffects),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Read embedded Go compiler, module, dependency/replacement and build-setting metadata from a local ELF, PE or selected Mach-O slice without running it or requiring Go. include_string_literals: true adds inferred static UTF-8 literals; runtime use and dependency completeness remain unknown. Missing build info does not prove the image is not Go. Default complete returns artifact SHA-256, source ranges and original metadata; detail summary retains it for inspect_analysis_view kind go, collections dependencies/settings/string_literals, or kind cyclonedx for one CycloneDX 1.6 document, with parent_evidence_id. Slice ranges remain offsets in the original universal file. No function/type/source recovery. Increase only the reported per-call budget and retry the same artifact; it does not raise parser or MCP delivery limits. Malformed/unsupported inputs fail explicitly.",
			inputSchema: inspectGoBinaryInputSchema,
			outputSchema: analysisDetailOutputSchemaOf(goBinarySchema, goBinarySummaryViewResultSchema),
			examples: [{
				title: "Inspect embedded build provenance",
				input: { path: "/artifacts/application" }
			}]
		}];
	})))();
}

//#endregion
export { GO_TOOL_CONTRACTS, init_goToolContracts };