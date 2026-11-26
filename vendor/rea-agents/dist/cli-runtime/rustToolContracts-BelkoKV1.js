import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisViewResult, init_rustBinary, init_rustBinaryQuery, inspectRustBinaryRequestSchema, rustBinaryPageViewResultSchema, rustBinarySchema, rustBinarySummaryViewResultSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/contracts/rust/rustToolContracts.js
var RUST_TOOL_CONTRACTS;
function init_rustToolContracts() {
	return (init_rustToolContracts = __esmMin((() => {
		init_rustBinary();
		init_rustBinaryQuery();
		init_analysisViewResult();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		RUST_TOOL_CONTRACTS = [{
			name: "inspect_rust_binary",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_rust_binary", evidenceEffects),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Read the embedded cargo-auditable crate dependencies of a local ELF, PE, selected Mach-O slice or WebAssembly core module without running it or requiring Rust. Returns artifact identity, source ranges, ordered packages and dependency edges. Missing metadata does not prove no dependencies; a rustc commit from an observed source path is inferred. Default complete returns the report; detail summary retains it for inspect_analysis_view kind rust, collections packages/edges, or kind cyclonedx for one CycloneDX 1.6 document, via parent_evidence_id. Optional view selects a page in this call and cannot accompany explicit complete detail. Original row indices and every matching version survive selection; select dependencies explicitly for package dependency vectors. Runtime dependencies remain unknown; malformed or oversized inputs fail rather than return partial success.",
			inputSchema: inspectRustBinaryRequestSchema,
			outputSchema: evidenceResultOf(z.union([
				rustBinarySchema,
				rustBinarySummaryViewResultSchema,
				rustBinaryPageViewResultSchema
			])),
			examples: [{
				title: "Inspect an embedded Rust dependency list",
				input: { path: "/artifacts/application" }
			}]
		}];
	})))();
}

//#endregion
export { RUST_TOOL_CONTRACTS, init_rustToolContracts };