import canonicalize from "canonicalize";
import { contractsForToolFamilies } from "../toolFamilies.js";
import { promptsForToolFamilies } from "../promptToolFamilyScope.js";
import { PROMPT_CONTRACTS } from "../promptContracts.js";
import { TOOL_CONTRACTS } from "../toolContracts.js";
import { CLI_COMMANDS, cliCommandFor } from "../cliCommandNames.js";
import { compareUnicodeCodePoints } from "../../domain/unicodeCodePointOrder.js";
import { advertisedInputJsonSchema, advertisedOutputJsonSchema, } from "../toolSchemaMetadata.js";
import { advertiseTool, } from "../advertisedTool.js";
import { RECORDED_CATALOG_DIGEST_PROFILES, } from "./recordedCatalogDigests.js";
import { advertisedToolPresentation, resolveMcpOutputSchemaProfile, COMPACT_INPUT_SCHEMA_PRESENTATION, } from "../mcpSchemaPresentation.js";
import { sha256Hex } from "../../kernel/sha256Hex.js";
/**
 * Digested per-tool projection. Every contract field that changes what a
 * client receives belongs here, including `returns_target_content`: a server
 * that predates the untrusted-content framing must not digest equal to one
 * that emits `_meta.provenance`, or a stale process would report aligned.
 */
/**
 * Primary CLI command inventory, aliases excluded: the command of every
 * contract that declares `cli: true`, in catalog order, then the commands no
 * contract names.
 */
export const cliCommandNames = (contracts) => Object.freeze([
    ...contracts.flatMap(({ name, cli }) => cli === true ? [cliCommandFor(name)] : []),
    ...Object.values(CLI_COMMANDS),
]);
/** The primary CLI command inventory of the public contract registry. */
export const CLI_COMMAND_NAMES = cliCommandNames(TOOL_CONTRACTS);
const createToolCatalog = (contracts) => contracts.map((contract) => ({
    name: contract.name,
    title: contract.title,
    surface: contract.kind,
    description: contract.description,
    effects: { ...contract.effects },
    returns_target_content: contract.returnsTargetContent,
    annotations: contract.annotations,
    input_schema: advertisedInputJsonSchema(contract),
    output_schema: advertisedOutputJsonSchema(contract),
}));
/**
 * The identity's view of each tool: what the selected presentation
 * advertises. An omitted output advertisement still digests the canonical
 * reply contract the server validates.
 */
const presentToolCatalog = (catalog, presentation) => catalog.map((tool) => {
    const advertised = advertiseTool({
        description: tool.description,
        inputSchema: tool.input_schema,
        outputSchema: tool.output_schema,
    }, presentation);
    return {
        ...tool,
        description: advertised.description ?? tool.description,
        input_schema: advertised.inputSchema ?? tool.input_schema,
        output_schema: advertised.outputSchema ?? tool.output_schema,
    };
});
const createPromptCatalog = (contracts) => contracts
    .map((contract) => ({
    name: contract.name,
    title: contract.title,
    description: contract.description,
    objective: contract.objective,
    arguments: contract.arguments,
    steps: contract.steps,
}))
    .sort((left, right) => compareUnicodeCodePoints(left.name, right.name));
const sortByName = (contracts) => [...contracts].sort((left, right) => compareUnicodeCodePoints(left.name, right.name));
const canonicalJson = (value) => {
    const encoded = canonicalize(value);
    if (encoded === undefined)
        throw new TypeError("Catalog is not canonical JSON");
    return encoded;
};
/** Digests of the presented tool and prompt catalog. */
const digestPresentedCatalogs = (catalog, prompts, outputSchemaProfile) => {
    const tools = canonicalJson({
        output_schema_profile: outputSchemaProfile,
        catalog,
    });
    const promptCatalog = canonicalJson(prompts);
    // RFC 8785 writes an object as its members in key order, each value in its
    // own canonical form, so the combined document reuses the canonical tool and
    // prompt texts instead of canonicalizing the whole catalog a second time.
    const combined = `{"cli":${canonicalJson(CLI_COMMAND_NAMES)},"prompts":${promptCatalog},"tools":${tools}}`;
    return {
        tools_sha256: sha256Hex(tools),
        prompts_sha256: sha256Hex(promptCatalog),
        combined_sha256: sha256Hex(combined),
    };
};
const digestCatalogs = (catalog, prompts, compactPresentation, outputSchemaProfile) => digestPresentedCatalogs(presentToolCatalog(catalog, advertisedToolPresentation(outputSchemaProfile, compactPresentation)), prompts, outputSchemaProfile);
/**
 * Catalog digests over the given tool contracts. Exported so tests can prove
 * which contract fields the identity covers; production uses
 * {@link DEFAULT_CATALOG_IDENTITY}.
 */
export const createCatalogDigests = (contracts = TOOL_CONTRACTS, promptContracts = PROMPT_CONTRACTS, compactPresentation = COMPACT_INPUT_SCHEMA_PRESENTATION, outputSchemaProfile = resolveMcpOutputSchemaProfile(undefined)) => digestCatalogs(createToolCatalog(sortByName(contracts)), createPromptCatalog(promptContracts), compactPresentation, outputSchemaProfile);
/** Build-time identities share schema conversion across both output profiles. */
export const createCatalogDigestProfiles = (contracts = TOOL_CONTRACTS, promptContracts = PROMPT_CONTRACTS) => {
    const catalog = createToolCatalog(sortByName(contracts));
    const prompts = createPromptCatalog(promptContracts);
    return {
        off: digestCatalogs(catalog, prompts, COMPACT_INPUT_SCHEMA_PRESENTATION, "off"),
        compact: digestCatalogs(catalog, prompts, COMPACT_INPUT_SCHEMA_PRESENTATION, "compact"),
    };
};
export const createCatalogIdentity = (options = {}) => {
    const { compactPresentation = COMPACT_INPUT_SCHEMA_PRESENTATION, contracts = TOOL_CONTRACTS, outputSchemaProfile = resolveMcpOutputSchemaProfile(undefined), promptContracts = PROMPT_CONTRACTS, } = options;
    const selectedPresentation = { budgetBytes: compactPresentation.budgetBytes };
    // Recorded digests describe the complete catalog at the built-in budget
    // only; a scoped tool or prompt set, or a custom budget, computes from its
    // own inputs on first use.
    let catalogDigests = selectedPresentation.budgetBytes !==
        COMPACT_INPUT_SCHEMA_PRESENTATION.budgetBytes ||
        contracts !== TOOL_CONTRACTS ||
        promptContracts !== PROMPT_CONTRACTS
        ? undefined
        : RECORDED_CATALOG_DIGEST_PROFILES?.[outputSchemaProfile];
    return {
        counts: {
            cli_commands: CLI_COMMAND_NAMES.length,
            mcp_tools: contracts.length,
            mcp_prompts: promptContracts.length,
        },
        get digests() {
            return (catalogDigests ??= createCatalogDigests(contracts, promptContracts, selectedPresentation, outputSchemaProfile));
        },
    };
};
/** Default MCP advertisement: compact input, output schemas omitted. */
export const DEFAULT_CATALOG_IDENTITY = createCatalogIdentity();
/**
 * Identity whose digests cover exactly the contracts a registration advertises.
 * Composition reuses it when a deferred server attaches its runtime, so both
 * paths derive the same value from the same scope.
 */
export const catalogIdentityForToolFamilies = (compactPresentation, outputSchemaProfile, advertisedToolFamilies) => compactPresentation.budgetBytes ===
    COMPACT_INPUT_SCHEMA_PRESENTATION.budgetBytes &&
    outputSchemaProfile === resolveMcpOutputSchemaProfile(undefined) &&
    advertisedToolFamilies === undefined
    ? DEFAULT_CATALOG_IDENTITY
    : createCatalogIdentity({
        compactPresentation: { budgetBytes: compactPresentation.budgetBytes },
        contracts: contractsForToolFamilies(advertisedToolFamilies),
        outputSchemaProfile,
        promptContracts: promptsForToolFamilies(advertisedToolFamilies),
    });
