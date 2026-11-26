import { z } from "zod";
import { jsonDocumentText } from "../domain/schemaConstraints.js";
const JSON_SCHEMA_DIALECT = "$schema";
const wrapperTypes = new Set([
    "optional",
    "nonoptional",
    "nullable",
    "default",
    "prefault",
    "readonly",
    "catch",
]);
const innerSchema = (schema) => {
    if (!("unwrap" in schema) || typeof schema.unwrap !== "function")
        return undefined;
    const inner = schema.unwrap();
    return inner instanceof z.ZodType ? inner : undefined;
};
/** Skip wrappers so `unknown` and `any` are recognized as the whole document. */
const documentType = (schema) => {
    let current = schema;
    for (;;) {
        const type = current._zod.def.type;
        if (!wrapperTypes.has(type))
            return type;
        const inner = innerSchema(current);
        if (inner === undefined)
            return type;
        current = inner;
    }
};
/**
 * JSON Schema for one positional JSON document.
 *
 * `{}` is only returned for a document the handler parses as `unknown` or
 * `any`. Any other empty conversion is omitted: a custom or unrepresentable
 * document must not be advertised as accepting every value. Input mode keeps
 * the type a transform accepts, so a string transform stays a string.
 */
export const jsonInputContentSchema = (schema) => {
    let converted;
    try {
        converted = z.toJSONSchema(schema, {
            io: "input",
            unrepresentable: "any",
        });
    }
    catch {
        return undefined;
    }
    const content = { ...converted };
    delete content[JSON_SCHEMA_DIALECT];
    if (Object.keys(content).length > 0)
        return content;
    const type = documentType(schema);
    return type === "unknown" || type === "any" ? {} : undefined;
};
/** Keep the positional string and attach the document contract the CLI advertises. */
export const jsonInputArgument = (description, schema) => {
    return jsonDocumentText(z.string().describe(description), jsonInputContentSchema(schema));
};
