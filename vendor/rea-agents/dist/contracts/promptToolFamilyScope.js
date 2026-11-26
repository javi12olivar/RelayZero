import { PROMPT_CONTRACTS } from "./promptContracts.js";
import { toolFamilyId } from "./toolFamilies.js";
import { isToolFamilyAdvertised } from "./toolFamilyIds.js";
/** Required by discovery even before the runtime renders the prompt's admitted routes. */
export const requiredPromptTools = (contract) => contract.steps
    .filter((step) => step.availability !== "optional")
    .flatMap((step) => step.tools);
/**
 * Require core workflow tools and omit optional routes whose tools are disabled.
 * Consumers share this projected contract so discovery, rendering and catalog
 * identity agree. An absent selection preserves the complete inventory.
 */
export const promptsForToolFamilies = (selection, contracts = PROMPT_CONTRACTS) => {
    if (selection === undefined)
        return contracts;
    const advertises = (tool) => isToolFamilyAdvertised(selection, toolFamilyId(tool));
    return contracts.flatMap((contract) => requiredPromptTools(contract).every(advertises)
        ? [
            {
                ...contract,
                steps: contract.steps.filter((step) => step.tools.every(advertises)),
            },
        ]
        : []);
};
