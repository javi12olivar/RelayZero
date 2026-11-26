import { toolContract } from "../contracts/toolContracts.js";
import { OFFICIAL_TOOL_CONTRACTS } from "../contracts/officialToolContracts.js";
import { NATIVE_TOOL_CONTRACTS } from "../contracts/native/nativeToolContracts.js";
import { ARTIFACT_TOOL_CONTRACTS, artifactInventoryInputSchema, } from "../contracts/artifactToolContracts.js";
import { MANAGED_TOOL_CONTRACTS, managedArtifactInputSchema, managedMembersInputSchema, } from "../contracts/managed/managedToolContracts.js";
import { enhancedInputSchemas, } from "../contracts/enhancedInputs.js";
import { callerAnalysisParameters, parseAnalysisInput, } from "./AnalysisInput.js";
import { ok } from "../domain/result.js";
const schemasByName = (contracts) => Object.fromEntries(contracts.map(({ name, inputSchema }) => [name, inputSchema]));
const schemas = {
    ...schemasByName(OFFICIAL_TOOL_CONTRACTS),
    ...schemasByName(NATIVE_TOOL_CONTRACTS),
    ...schemasByName(ARTIFACT_TOOL_CONTRACTS),
    ...schemasByName(MANAGED_TOOL_CONTRACTS),
    ...enhancedInputSchemas,
    inspect_native_load_image: toolContract("inspect_native_load_image").inputSchema.omit({ detail: true }),
    inspect_managed_artifact: managedArtifactInputSchema.omit({ detail: true }),
    inspect_managed_members: managedMembersInputSchema.omit({ detail: true }),
    inventory_artifact: artifactInventoryInputSchema,
};
/** Parse the named operation before target selection or snapshot replay. */
export const admitOneShotOperation = (name, input, signal) => {
    const parsed = parseAnalysisInput(name, input, schemas[name], signal);
    if (!parsed.ok)
        return parsed;
    // Admission owns the selected request: preserve top-level omissions for
    // Evidence and snapshot identity while carrying each selected parsed value.
    // Nested defaults remain in the owning field's parsed value.
    const selected = callerAnalysisParameters(input)(parsed.value);
    return ok({ name, input: selected });
};
