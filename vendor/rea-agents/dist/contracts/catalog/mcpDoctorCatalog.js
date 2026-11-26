import { createCatalogIdentity } from "./catalogIdentity.js";
import { DISCOVER_TOOLS, HOT_TOOL_NAMES, progressiveCatalogIdentity, } from "./catalogDiscovery.js";
import { contractsForToolFamilies } from "../toolFamilies.js";
import { toolContract } from "../toolContracts.js";
import { advertisedOutputJsonSchema } from "../toolSchemaMetadata.js";
import { promptsForToolFamilies } from "../promptToolFamilyScope.js";
const liveExpectationCache = new Map();
let cachedBinarySessionOutputSchema;
const binarySessionOutputJsonSchema = () => (cachedBinarySessionOutputSchema ??= Object.freeze(advertisedOutputJsonSchema(toolContract("binary_session"))));
/** Build expectations from live contracts when family selection or source runs require it. */
export const buildLiveMcpDoctorExpectation = (selection, outputSchemaProfile, progressive) => {
    const key = `${selection === undefined ? "*" : [...selection].sort().join(",")}|${outputSchemaProfile}|${progressive ? "1" : "0"}`;
    const cached = liveExpectationCache.get(key);
    if (cached !== undefined)
        return cached;
    const contracts = contractsForToolFamilies(selection);
    const promptContracts = promptsForToolFamilies(selection);
    const catalog = createCatalogIdentity({
        contracts,
        outputSchemaProfile,
        promptContracts,
    });
    const expectation = Object.freeze({
        catalog: progressive ? progressiveCatalogIdentity(catalog) : catalog,
        expectedToolNames: Object.freeze(progressive
            ? [
                ...contracts
                    .map(({ name }) => name)
                    .filter((name) => HOT_TOOL_NAMES.has(name)),
                DISCOVER_TOOLS.name,
            ]
            : contracts.map(({ name }) => name)),
        expectedPromptNames: Object.freeze(promptContracts.map(({ name }) => name)),
        binarySessionOutputSchema: binarySessionOutputJsonSchema(),
    });
    liveExpectationCache.set(key, expectation);
    return expectation;
};
