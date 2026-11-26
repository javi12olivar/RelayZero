import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_schemaAnnotations, presentRootDiscriminator } from "./jsonSerialization-DAF9DVXC.js";
import { erlangBeamCompleteDeliveryShape, erlangBeamSchema, erlangBeamSummaryDeliveryShape, erlangBeamSummaryViewResultSchema, erlangBeamTableViewResultSchema, init_analysisViewResult, init_beam, init_erlangBeamView, inspectErlangBeamInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, evidenceEffects, init_analysisDetail, init_toolEffects, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/contracts/erlang/beamToolContracts.js
var inspectErlangBeamRequestSchema, ERLANG_BEAM_TOOL_CONTRACTS;
function init_beamToolContracts() {
	return (init_beamToolContracts = __esmMin((() => {
		init_beam();
		init_toolEffects();
		init_analysisDetail();
		init_analysisViewResult();
		init_erlangBeamView();
		init_schemaAnnotations();
		inspectErlangBeamRequestSchema = presentRootDiscriminator(z.discriminatedUnion("detail", [inspectErlangBeamInputSchema.extend(erlangBeamCompleteDeliveryShape), inspectErlangBeamInputSchema.extend(erlangBeamSummaryDeliveryShape)]), "detail");
		ERLANG_BEAM_TOOL_CONTRACTS = [{
			name: "inspect_erlang_beam",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_erlang_beam", evidenceEffects),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Inspect an Erlang BEAM IFF file without executing bytecode or requiring Erlang. Returns chunk byte ranges/digests, atoms, exports/imports/lambdas and Code header. Default complete returns full Evidence; detail summary retains it, and an optional beam view selects collection rows in the first call. Reuse inspect_analysis_view kind beam for atoms/exports/imports/lambdas/chunks, exact names/indices/fields and paging. source_index scopes rows to parent/collection, preserving every arity; original atom/lambda indices remain distinct. Missing tables/counts stay null, not empty; runtime absence is unknown. Malformed/truncated input or exhausted budgets fail without partial success.",
			inputSchema: inspectErlangBeamRequestSchema,
			outputSchema: analysisDetailOutputSchemaOf(erlangBeamSchema, z.union([erlangBeamSummaryViewResultSchema, erlangBeamTableViewResultSchema])),
			examples: [{
				title: "Return selected exports and retain the complete BEAM report",
				input: {
					path: "/artifacts/app.beam",
					detail: "summary",
					view: {
						kind: "beam",
						collection: "exports",
						names: ["module_info"],
						fields: [
							"function_index",
							"function",
							"arity",
							"label"
						]
					}
				}
			}, {
				title: "Inspect the complete BEAM structure",
				input: { path: "/artifacts/app.beam" }
			}]
		}];
	})))();
}

//#endregion
export { ERLANG_BEAM_TOOL_CONTRACTS, init_beamToolContracts };