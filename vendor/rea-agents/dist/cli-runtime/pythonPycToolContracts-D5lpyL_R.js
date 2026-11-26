import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_schemaAnnotations, presentRootDiscriminator } from "./jsonSerialization-DAF9DVXC.js";
import { init_analysisViewResult, init_pythonPyc, init_pythonPycView, inspectPythonPycInputSchema, pythonPycCodeObjectsViewResultSchema, pythonPycCompleteDeliveryShape, pythonPycSchema, pythonPycSummaryDeliveryShape, pythonPycSummaryViewResultSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, evidenceEffects, init_analysisDetail, init_toolEffects, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/contracts/python/pythonPycToolContracts.js
var inspectPythonPycRequestSchema, PYTHON_PYC_TOOL_CONTRACTS;
function init_pythonPycToolContracts() {
	return (init_pythonPycToolContracts = __esmMin((() => {
		init_pythonPyc();
		init_toolEffects();
		init_analysisDetail();
		init_analysisViewResult();
		init_pythonPycView();
		init_schemaAnnotations();
		inspectPythonPycRequestSchema = presentRootDiscriminator(z.discriminatedUnion("detail", [inspectPythonPycInputSchema.extend(pythonPycCompleteDeliveryShape), inspectPythonPycInputSchema.extend(pythonPycSummaryDeliveryShape)]), "detail");
		PYTHON_PYC_TOOL_CONTRACTS = [{
			name: "inspect_python_pyc",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_python_pyc", evidenceEffects),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Inspect local CPython 3.7–3.15 .pyc headers and nested code objects without executing bytecode, invoking Python or recovering source. Returns pinned version/header fields, names, constant summaries and bytecode lengths/digests; nested_code links code constants, not runtime calls. Default complete returns full Evidence; detail summary retains it for inspect_analysis_view kind python-pyc, collection code_objects, with exact names/indices/fields and paging. source_index preserves same-name alternatives. Unsupported magics/layouts, truncation and exhausted budgets fail without partial success. A header does not prove matching .py source exists.",
			inputSchema: inspectPythonPycRequestSchema,
			outputSchema: analysisDetailOutputSchemaOf(pythonPycSchema, z.union([pythonPycSummaryViewResultSchema, pythonPycCodeObjectsViewResultSchema])),
			examples: [
				{
					title: "Return selected function facts immediately and retain the complete report",
					input: {
						path: "/artifacts/module.pyc",
						detail: "summary",
						view: {
							kind: "python-pyc",
							collection: "code_objects",
							names: ["parse_args"],
							fields: [
								"name",
								"qualname",
								"bytecode",
								"nested_code"
							]
						}
					}
				},
				{
					title: "Inspect a CPython 3.12 pyc header and nested code objects",
					input: { path: "/artifacts/module.pyc" }
				},
				{
					title: "Retain the complete pyc report and return only its header and coverage",
					input: {
						path: "/artifacts/module.pyc",
						detail: "summary"
					}
				}
			]
		}];
	})))();
}

//#endregion
export { PYTHON_PYC_TOOL_CONTRACTS, init_pythonPycToolContracts };