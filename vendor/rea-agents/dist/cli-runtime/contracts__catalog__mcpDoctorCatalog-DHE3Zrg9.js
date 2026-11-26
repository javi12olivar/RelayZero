import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { DISCOVER_TOOLS, HOT_TOOL_NAMES, init_catalogDiscovery, progressiveCatalogIdentity } from "./catalogDiscovery-DRfzYms0.js";
import { init_toolContracts, toolContract } from "./toolContracts-CKzBMbP1.js";
import { advertisedOutputJsonSchema, init_toolSchemaMetadata } from "./toolSchemaMetadata-DWb0gWO6.js";
import { contractsForToolFamilies, createCatalogIdentity, init_catalogIdentity, init_promptToolFamilyScope, init_toolFamilies, promptsForToolFamilies } from "./catalogIdentity-MngsEs90.js";

//#region dist/contracts/catalog/mcpDoctorCatalog.js
var liveExpectationCache, cachedBinarySessionOutputSchema, binarySessionOutputJsonSchema, buildLiveMcpDoctorExpectation;
function init_mcpDoctorCatalog() {
	return (init_mcpDoctorCatalog = __esmMin((() => {
		init_catalogIdentity();
		init_catalogDiscovery();
		init_toolFamilies();
		init_toolContracts();
		init_toolSchemaMetadata();
		init_promptToolFamilyScope();
		liveExpectationCache = new Map();
		;
		binarySessionOutputJsonSchema = () => cachedBinarySessionOutputSchema ??= Object.freeze(advertisedOutputJsonSchema(toolContract("binary_session")));
		buildLiveMcpDoctorExpectation = (selection, outputSchemaProfile, progressive) => {
			const key = `${selection === undefined ? "*" : [...selection].sort().join(",")}|${outputSchemaProfile}|${progressive ? "1" : "0"}`;
			const cached = liveExpectationCache.get(key);
			if (cached !== undefined) return cached;
			const contracts = contractsForToolFamilies(selection);
			const promptContracts = promptsForToolFamilies(selection);
			const catalog = createCatalogIdentity({
				contracts,
				outputSchemaProfile,
				promptContracts
			});
			const expectation = Object.freeze({
				catalog: progressive ? progressiveCatalogIdentity(catalog) : catalog,
				expectedToolNames: Object.freeze(progressive ? [...contracts.map(({ name }) => name).filter((name) => HOT_TOOL_NAMES.has(name)), DISCOVER_TOOLS.name] : contracts.map(({ name }) => name)),
				expectedPromptNames: Object.freeze(promptContracts.map(({ name }) => name)),
				binarySessionOutputSchema: binarySessionOutputJsonSchema()
			});
			liveExpectationCache.set(key, expectation);
			return expectation;
		};
	})))();
}

//#endregion
init_mcpDoctorCatalog();
export { buildLiveMcpDoctorExpectation };