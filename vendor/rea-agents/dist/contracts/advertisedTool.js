import { projectToAdvertisedDialect } from "./advertisedDialectProjection.js";
import { presentAdvertisedInput, } from "./compactInputSchema.js";
import { presentAdvertisedOutputSchema, } from "./compactOutputSchema.js";
/** The tool description followed by the input guidance its schema omits. */
const describe = (description, guidance) => {
    if (guidance.length === 0)
        return description;
    const input = guidance.join(" ");
    return description === undefined || description === ""
        ? input
        : `${description}\n\n${input}`;
};
// The SDK and the contract metadata memoize each canonical schema object, so
// repeated listings and both output profiles reuse one projection.
const annotated = new WeakMap();
const presentInput = (schema, presentation) => {
    if (presentation !== "annotated")
        return presentAdvertisedInput(schema, presentation);
    let projected = annotated.get(schema);
    if (projected === undefined)
        annotated.set(schema, (projected = projectToAdvertisedDialect(schema)));
    return projected;
};
/**
 * The advertised description and input schema. Reading the description
 * projects the schema; a tool without an input schema keeps its description.
 */
export const advertiseToolInput = (description, inputSchema, presentation) => {
    const input = presentInput(inputSchema, presentation);
    return {
        description: describe(description, input.guidance),
        inputSchema: input.schema,
    };
};
const compactedOutput = new WeakMap();
/** The advertised output schema, or undefined when the presentation omits it. */
export const advertiseToolOutput = (outputSchema, presentation) => {
    if (presentation === undefined)
        return undefined;
    let byBudget = compactedOutput.get(outputSchema);
    if (byBudget === undefined)
        compactedOutput.set(outputSchema, (byBudget = new Map()));
    let advertised = byBudget.get(presentation.budgetBytes);
    if (advertised === undefined)
        byBudget.set(presentation.budgetBytes, (advertised = presentAdvertisedOutputSchema(outputSchema, presentation)));
    return advertised;
};
/** Everything a client receives for one tool, from its canonical schemas. */
export const advertiseTool = (canonical, presentation) => {
    const input = canonical.inputSchema === undefined
        ? { description: canonical.description }
        : advertiseToolInput(canonical.description, canonical.inputSchema, presentation.input);
    const outputSchema = canonical.outputSchema === undefined
        ? undefined
        : advertiseToolOutput(canonical.outputSchema, presentation.output);
    return {
        ...(input.description === undefined
            ? {}
            : { description: input.description }),
        ...("inputSchema" in input ? { inputSchema: input.inputSchema } : {}),
        ...(outputSchema === undefined ? {} : { outputSchema }),
    };
};
