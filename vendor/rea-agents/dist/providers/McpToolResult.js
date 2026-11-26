import { z } from "zod";
import { jsonValueSchema } from "../domain/jsonValue.js";
import { err, ok } from "../domain/result.js";
import { safeParseJson } from "../domain/safeJson.js";
/** Borrow the dictionary shape; selected payloads receive JSON validation in the adapter. */
const structuredContentSchema = z.custom((value) => {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
});
/** IDA/JEB's object-structured envelope; each adapter owns selection and error policy. */
export const mcpToolResultSchema = z.object({
    isError: z.boolean().optional(),
    structuredContent: structuredContentSchema.optional(),
    content: z.array(z.object({ type: z.string(), text: z.string().optional() }).passthrough()),
});
export const mcpTextBlocks = (content) => content.flatMap((block) => block.type === "text" && block.text !== undefined ? [block.text] : []);
/**
 * Decode one text block as JSON. Malformed JSON is never reinterpreted as
 * ordinary text.
 */
export const decodeMcpJsonText = (text) => {
    const parsed = safeParseJson(text);
    if (!parsed.ok)
        return err({ reason: "malformed_json", cause: parsed.cause });
    // A parsed JSON value must satisfy the same admission rules as structured
    // evidence; a validation failure is not a reason to treat it as text.
    return ok(jsonValueSchema.parse(parsed.value));
};
