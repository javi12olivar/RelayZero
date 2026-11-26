import { requireOutputSchema } from "./toolOutputSchemaPrimitives.js";
import { jsonObjectSchema } from "../domain/jsonValue.js";
import { analysisDetailSummaryDefaultSchema } from "./analysisDetail.js";
import { enhancedInputSchemas } from "./enhancedInputs.js";
import { TOOL_EXAMPLE_OVERRIDES } from "./toolContractExamples.js";
import { toolContractMetadata, providerEffects, providerRemoteEffects, providerUiNetworkEvidenceEffects, toolEffects, } from "./toolEffects.js";
import { enhancedOutputSchemas } from "./toolOutputSchemaGroups.js";
/**
 * MCP inputs: the provider input plus analyze_function's delivery detail, which
 * the tool handler separates before any provider call. Composed workflows such
 * as inspect_native_api build provider inputs from enhancedInputSchemas alone.
 */
export const functionWorkflowInputSchemas = {
    analyze_function: enhancedInputSchemas.analyze_function.extend({
        detail: analysisDetailSummaryDefaultSchema,
    }),
    inspect_native_api: enhancedInputSchemas.inspect_native_api,
};
/** The contracts below that the CLI exposes as commands. */
const FUNCTION_WORKFLOW_CLI_CONTRACTS = new Set([
    "inspect_native_api",
]);
const functionWorkflow = (name, audit, description) => {
    const inputSchema = functionWorkflowInputSchemas[name];
    const outputSchema = requireOutputSchema(enhancedOutputSchemas, name);
    return {
        name,
        ...toolContractMetadata(name, audit),
        description,
        kind: "enhanced",
        ...(FUNCTION_WORKFLOW_CLI_CONTRACTS.has(name)
            ? { cli: true }
            : {}),
        requiresActiveTarget: true,
        inputSchema,
        outputSchema,
        examples: [
            {
                title: `Example ${name.replaceAll("_", " ")} request`,
                input: jsonObjectSchema.parse(inputSchema.parse(TOOL_EXAMPLE_OVERRIDES[name] ?? {})),
            },
        ],
    };
};
/** Function dossier and native API reconstruction workflow contracts. */
export const FUNCTION_WORKFLOW_TOOL_CONTRACTS = [
    functionWorkflow("analyze_function", providerUiNetworkEvidenceEffects, "Inspect one native function by symbol or provider-returned address. Default summary returns identity, pseudocode size, facet counts and value-flow availability while retaining the complete dossier. Read selected facts with inspect_analysis_view using normalized_result.parent_evidence_id; detail complete returns everything inline. Facets include pseudocode, assembly, body ranges, comments, calls, references, strings/names, CFG and native API observations. Extents reflect provider analysis; limitations report unknown ranges and possible Ghidra terminal-call truncation."),
    functionWorkflow("inspect_native_api", providerEffects(toolEffects({ mutatesSession: true, idempotent: false }), {
        ...providerRemoteEffects,
        changesUiState: true,
    }), "Inspect recovered parameter/return boundary types and jump-table dispatch for one native function selected by symbol or address. Returns confidence, supporting Evidence, case/data/target mappings, unsupported facets and residual unknowns. Null case values are unresolved, never known defaults. Use analyze_function for the broader function dossier."),
];
