import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { init_toolFamilyIds, isToolFamilyAdvertised } from "./toolFamilyIds-CqxikYDX.js";
import { CLI_COMMANDS, cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { COMPACT_INPUT_SCHEMA_PRESENTATION, advertisedToolPresentation, init_mcpSchemaPresentation, resolveMcpOutputSchemaProfile } from "./mcpToolFamilies-Cjva4yr_.js";
import { RECORDED_CATALOG_DIGEST_PROFILES, init_recordedCatalogDigests } from "./recordedCatalogDigests-CmASFVov.js";
import { TOOL_CONTRACTS, TOOL_CONTRACT_GROUPS, init_toolContracts } from "./toolContracts-CKzBMbP1.js";
import { PROMPT_CONTRACTS, init_promptContracts } from "./promptContracts-DKMGPjV4.js";
import { advertisedInputJsonSchema, advertisedOutputJsonSchema, init_toolSchemaMetadata } from "./toolSchemaMetadata-DWb0gWO6.js";
import { advertiseTool, init_advertisedTool } from "./advertisedTool-ByKiy8tg.js";
import canonicalize from "canonicalize";

//#region dist/contracts/toolFamilies.js
var TOOL_FAMILY_DEFINITIONS, familyByTool, toolFamilyId, contractsForToolFamilies;
function init_toolFamilies() {
	return (init_toolFamilies = __esmMin((() => {
		init_toolContracts();
		TOOL_FAMILY_DEFINITIONS = [
			{
				id: "direct",
				surface: "official-proxy",
				contracts: TOOL_CONTRACT_GROUPS.OFFICIAL_TOOL_CONTRACTS
			},
			{
				id: "enhanced",
				surface: "enhanced",
				contracts: TOOL_CONTRACT_GROUPS.ENHANCED_TOOL_CONTRACTS
			},
			{
				id: "native",
				surface: "native-provider",
				contracts: [
					...TOOL_CONTRACT_GROUPS.NATIVE_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.BINARY_DIAGNOSTICS_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.CUTTER_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.REVERSE_ENGINEERING_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.GDB_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.RIZIN_DEBUG_TOOL_CONTRACTS
				]
			},
			{
				id: "artifact",
				surface: "artifact-provider",
				contracts: [
					...TOOL_CONTRACT_GROUPS.ARTIFACT_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.RELEASE_EXPOSURE_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.DESKTOP_APPLICATION_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.EVM_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.GO_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.GPU_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.IL2CPP_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.MODEL_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.RUST_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.PYTHON_PYC_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.NUGET_NUPKG_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.ERLANG_BEAM_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.V8_CODE_CACHE_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.MAVEN_GRADLE_METADATA_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.WASM_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.APK_SIGNATURE_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.SQLITE_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.CAPTURE_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.SIGNAL_TOOL_CONTRACTS
				]
			},
			{
				id: "managed",
				surface: "managed",
				contracts: [...TOOL_CONTRACT_GROUPS.MANAGED_TOOL_CONTRACTS, ...TOOL_CONTRACT_GROUPS.MANAGED_WORKFLOW_TOOL_CONTRACTS]
			},
			{
				id: "firmware",
				surface: "firmware-provider",
				contracts: TOOL_CONTRACT_GROUPS.FIRMWARE_TOOL_CONTRACTS
			},
			{
				id: "uefi",
				surface: "firmware-provider",
				contracts: TOOL_CONTRACT_GROUPS.UEFI_TOOL_CONTRACTS
			},
			{
				id: "android",
				surface: "android-provider",
				contracts: TOOL_CONTRACT_GROUPS.ANDROID_TOOL_CONTRACTS
			},
			{
				id: "pcap",
				surface: "pcap-provider",
				contracts: TOOL_CONTRACT_GROUPS.PCAP_TOOL_CONTRACTS
			},
			{
				id: "flutter",
				surface: "flutter-provider",
				contracts: TOOL_CONTRACT_GROUPS.FLUTTER_TOOL_CONTRACTS
			},
			{
				id: "frida",
				surface: "instrumentation-provider",
				contracts: TOOL_CONTRACT_GROUPS.FRIDA_TOOL_CONTRACTS
			},
			{
				id: "apktool",
				surface: "apktool-provider",
				contracts: TOOL_CONTRACT_GROUPS.APKTOOL_TOOL_CONTRACTS
			},
			{
				id: "jeb",
				surface: "jeb-provider",
				contracts: TOOL_CONTRACT_GROUPS.JEB_TOOL_CONTRACTS
			},
			{
				id: "adb",
				surface: "adb-provider",
				contracts: TOOL_CONTRACT_GROUPS.ADB_TOOL_CONTRACTS
			},
			{
				id: "browser",
				surface: "browser-provider",
				contracts: [
					...TOOL_CONTRACT_GROUPS.BROWSER_PROVIDER_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.WEB_RUNTIME_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.WEB_NETWORK_CAPTURE_TOOL_CONTRACTS
				]
			},
			{
				id: "electron",
				surface: "electron-provider",
				contracts: TOOL_CONTRACT_GROUPS.ELECTRON_TOOL_CONTRACTS
			},
			{
				id: "javascript-runtime",
				surface: "runtime-provider",
				contracts: TOOL_CONTRACT_GROUPS.JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS
			},
			{
				id: "application",
				surface: "application-workflow",
				contracts: [
					...TOOL_CONTRACT_GROUPS.APPLICATION_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.ANALYSIS_SETTINGS_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.ENVIRONMENT_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.DESKTOP_BUILD_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.ANALYSIS_VIEW_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.WEB_SCRIPT_TOOL_CONTRACTS,
					...TOOL_CONTRACT_GROUPS.JAVASCRIPT_RECOVERY_TOOL_CONTRACTS
				]
			},
			{
				id: "session",
				surface: "session",
				contracts: TOOL_CONTRACT_GROUPS.SESSION_TOOL_CONTRACTS
			}
		];
		familyByTool = new Map();
		for (const { id, contracts } of TOOL_FAMILY_DEFINITIONS) for (const contract of contracts) familyByTool.set(contract.name, id);
		toolFamilyId = (name) => familyByTool.get(name);
		contractsForToolFamilies = (selection) => selection === undefined ? TOOL_CONTRACTS : TOOL_CONTRACTS.filter(({ name }) => {
			const family = toolFamilyId(name);
			return family !== undefined && selection.has(family);
		});
	})))();
}

//#endregion
//#region dist/contracts/promptToolFamilyScope.js
var requiredPromptTools, promptsForToolFamilies;
function init_promptToolFamilyScope() {
	return (init_promptToolFamilyScope = __esmMin((() => {
		init_promptContracts();
		init_toolFamilies();
		init_toolFamilyIds();
		requiredPromptTools = (contract) => contract.steps.filter((step) => step.availability !== "optional").flatMap((step) => step.tools);
		promptsForToolFamilies = (selection, contracts = PROMPT_CONTRACTS) => {
			if (selection === undefined) return contracts;
			const advertises = (tool) => isToolFamilyAdvertised(selection, toolFamilyId(tool));
			return contracts.flatMap((contract) => requiredPromptTools(contract).every(advertises) ? [{
				...contract,
				steps: contract.steps.filter((step) => step.tools.every(advertises))
			}] : []);
		};
	})))();
}

//#endregion
//#region dist/contracts/catalog/catalogIdentity.js
var catalogIdentity_exports = /* @__PURE__ */ __exportAll({ DEFAULT_CATALOG_IDENTITY: () => DEFAULT_CATALOG_IDENTITY });
var cliCommandNames, CLI_COMMAND_NAMES, createToolCatalog, presentToolCatalog, createPromptCatalog, sortByName, canonicalJson, digestPresentedCatalogs, digestCatalogs, createCatalogDigests, createCatalogDigestProfiles, createCatalogIdentity, DEFAULT_CATALOG_IDENTITY, catalogIdentityForToolFamilies;
function init_catalogIdentity() {
	return (init_catalogIdentity = __esmMin((() => {
		init_toolFamilies();
		init_promptToolFamilyScope();
		init_promptContracts();
		init_toolContracts();
		init_cliCommandNames();
		init_unicodeCodePointOrder();
		init_toolSchemaMetadata();
		init_advertisedTool();
		init_recordedCatalogDigests();
		init_mcpSchemaPresentation();
		init_sha256Hex();
		cliCommandNames = (contracts) => Object.freeze([...contracts.flatMap(({ name, cli }) => cli === true ? [cliCommandFor(name)] : []), ...Object.values(CLI_COMMANDS)]);
		CLI_COMMAND_NAMES = cliCommandNames(TOOL_CONTRACTS);
		createToolCatalog = (contracts) => contracts.map((contract) => ({
			name: contract.name,
			title: contract.title,
			surface: contract.kind,
			description: contract.description,
			effects: { ...contract.effects },
			returns_target_content: contract.returnsTargetContent,
			annotations: contract.annotations,
			input_schema: advertisedInputJsonSchema(contract),
			output_schema: advertisedOutputJsonSchema(contract)
		}));
		presentToolCatalog = (catalog, presentation) => catalog.map((tool) => {
			const advertised = advertiseTool({
				description: tool.description,
				inputSchema: tool.input_schema,
				outputSchema: tool.output_schema
			}, presentation);
			return {
				...tool,
				description: advertised.description ?? tool.description,
				input_schema: advertised.inputSchema ?? tool.input_schema,
				output_schema: advertised.outputSchema ?? tool.output_schema
			};
		});
		createPromptCatalog = (contracts) => contracts.map((contract) => ({
			name: contract.name,
			title: contract.title,
			description: contract.description,
			objective: contract.objective,
			arguments: contract.arguments,
			steps: contract.steps
		})).sort((left, right) => compareUnicodeCodePoints(left.name, right.name));
		sortByName = (contracts) => [...contracts].sort((left, right) => compareUnicodeCodePoints(left.name, right.name));
		canonicalJson = (value) => {
			const encoded = canonicalize(value);
			if (encoded === undefined) throw new TypeError("Catalog is not canonical JSON");
			return encoded;
		};
		digestPresentedCatalogs = (catalog, prompts, outputSchemaProfile) => {
			const tools = canonicalJson({
				output_schema_profile: outputSchemaProfile,
				catalog
			});
			const promptCatalog = canonicalJson(prompts);
			const combined = `{"cli":${canonicalJson(CLI_COMMAND_NAMES)},"prompts":${promptCatalog},"tools":${tools}}`;
			return {
				tools_sha256: sha256Hex(tools),
				prompts_sha256: sha256Hex(promptCatalog),
				combined_sha256: sha256Hex(combined)
			};
		};
		digestCatalogs = (catalog, prompts, compactPresentation, outputSchemaProfile) => digestPresentedCatalogs(presentToolCatalog(catalog, advertisedToolPresentation(outputSchemaProfile, compactPresentation)), prompts, outputSchemaProfile);
		createCatalogDigests = (contracts = TOOL_CONTRACTS, promptContracts = PROMPT_CONTRACTS, compactPresentation = COMPACT_INPUT_SCHEMA_PRESENTATION, outputSchemaProfile = resolveMcpOutputSchemaProfile(undefined)) => digestCatalogs(createToolCatalog(sortByName(contracts)), createPromptCatalog(promptContracts), compactPresentation, outputSchemaProfile);
		createCatalogDigestProfiles = (contracts = TOOL_CONTRACTS, promptContracts = PROMPT_CONTRACTS) => {
			const catalog = createToolCatalog(sortByName(contracts));
			const prompts = createPromptCatalog(promptContracts);
			return {
				off: digestCatalogs(catalog, prompts, COMPACT_INPUT_SCHEMA_PRESENTATION, "off"),
				compact: digestCatalogs(catalog, prompts, COMPACT_INPUT_SCHEMA_PRESENTATION, "compact")
			};
		};
		createCatalogIdentity = (options = {}) => {
			const { compactPresentation = COMPACT_INPUT_SCHEMA_PRESENTATION, contracts = TOOL_CONTRACTS, outputSchemaProfile = resolveMcpOutputSchemaProfile(undefined), promptContracts = PROMPT_CONTRACTS } = options;
			const selectedPresentation = { budgetBytes: compactPresentation.budgetBytes };
			let catalogDigests = selectedPresentation.budgetBytes !== COMPACT_INPUT_SCHEMA_PRESENTATION.budgetBytes || contracts !== TOOL_CONTRACTS || promptContracts !== PROMPT_CONTRACTS ? undefined : RECORDED_CATALOG_DIGEST_PROFILES?.[outputSchemaProfile];
			return {
				counts: {
					cli_commands: CLI_COMMAND_NAMES.length,
					mcp_tools: contracts.length,
					mcp_prompts: promptContracts.length
				},
				get digests() {
					return catalogDigests ??= createCatalogDigests(contracts, promptContracts, selectedPresentation, outputSchemaProfile);
				}
			};
		};
		DEFAULT_CATALOG_IDENTITY = createCatalogIdentity();
		catalogIdentityForToolFamilies = (compactPresentation, outputSchemaProfile, advertisedToolFamilies) => compactPresentation.budgetBytes === COMPACT_INPUT_SCHEMA_PRESENTATION.budgetBytes && outputSchemaProfile === resolveMcpOutputSchemaProfile(undefined) && advertisedToolFamilies === undefined ? DEFAULT_CATALOG_IDENTITY : createCatalogIdentity({
			compactPresentation: { budgetBytes: compactPresentation.budgetBytes },
			contracts: contractsForToolFamilies(advertisedToolFamilies),
			outputSchemaProfile,
			promptContracts: promptsForToolFamilies(advertisedToolFamilies)
		});
	})))();
}

//#endregion
export { catalogIdentityForToolFamilies, catalogIdentity_exports, contractsForToolFamilies, createCatalogIdentity, init_catalogIdentity, init_promptToolFamilyScope, init_toolFamilies, promptsForToolFamilies };