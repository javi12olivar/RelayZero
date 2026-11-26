import { advertisedInputDialectViolations } from "./advertisedDialect.js";
import { projectToAdvertisedDialect } from "./advertisedDialectProjection.js";
import { COMPACT_SCHEMA_MAX_DEPTH, inlineWithinBudget, isSchemaObject, reduceToShallowProperties, schemaDepth, serializedBytes, stripAnnotations, } from "./compactJsonSchema.js";
const INPUT_REDUCED_ANNOTATION = "Advertised in reduced form by the compact input schema profile; the server still validates complete canonical inputs.";
// `detail` selects between complete Evidence and a bounded summary. Without
// its guidance, callers default to complete replies that can exceed context.
const retainedRootPropertyDescriptions = ["detail"];
/** Restore the description of root properties whose choice bounds the reply. */
const retainRootPropertyGuidance = (schema, stripped) => {
    if (!isSchemaObject(schema.properties) ||
        !isSchemaObject(stripped.properties))
        return stripped;
    const properties = { ...stripped.properties };
    for (const name of retainedRootPropertyDescriptions) {
        const source = schema.properties[name];
        const kept = properties[name];
        if (isSchemaObject(source) &&
            isSchemaObject(kept) &&
            typeof source.description === "string")
            properties[name] = { ...kept, description: source.description };
    }
    return { ...stripped, properties };
};
const withinDialect = (schema) => advertisedInputDialectViolations({
    name: "input",
    inputSchema: schema,
}).length === 0;
/**
 * Render an advertised input schema within a per-schema byte budget for
 * providers that validate the literal serialized schema size. The complete
 * validation structure is projected into the portable dialect when it fits;
 * otherwise only root properties and their types remain.
 */
export const compactAdvertisedInputSchema = (schema, budgetBytes) => {
    const expanded = inlineWithinBudget(stripAnnotations(schema), budgetBytes);
    const inline = expanded === undefined
        ? undefined
        : projectToAdvertisedDialect(retainRootPropertyGuidance(schema, expanded));
    if (inline !== undefined &&
        serializedBytes(inline.schema) <= budgetBytes &&
        schemaDepth(inline.schema) <= COMPACT_SCHEMA_MAX_DEPTH &&
        withinDialect(inline.schema))
        return { ...inline, presentation: "inline" };
    const reduced = projectToAdvertisedDialect(reduceToShallowProperties(schema, INPUT_REDUCED_ANNOTATION));
    if (serializedBytes(reduced.schema) <= budgetBytes)
        return { ...reduced, presentation: "reduced" };
    // A future contract with an extreme root-property count still advertises
    // an honest, budget-fitting shape instead of an oversized one.
    return {
        ...projectToAdvertisedDialect(reduceToShallowProperties({ type: "object" }, INPUT_REDUCED_ANNOTATION)),
        presentation: "reduced",
    };
};
// Registration needs the guidance and the SDK later needs the schema; both
// read one projection of the same memoized canonical schema object.
const compacted = new WeakMap();
/** The compact advertised input with its guidance; `advertisedTool.ts` composes the tool. */
export const presentAdvertisedInput = (schema, compactPresentation) => {
    const { budgetBytes } = compactPresentation;
    let byBudget = compacted.get(schema);
    if (byBudget === undefined)
        compacted.set(schema, (byBudget = new Map()));
    let presented = byBudget.get(budgetBytes);
    if (presented === undefined)
        byBudget.set(budgetBytes, (presented = compactAdvertisedInputSchema(schema, budgetBytes)));
    return presented;
};
