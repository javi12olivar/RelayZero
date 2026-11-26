import { z } from "zod";
import { cliCommands } from "./commandRegistry.js";
const INPUT_GROUPS = ["args", "options"];
/**
 * Advertise parser-filled defaults as omittable CLI inputs.
 *
 * The CLI derives `--schema`, the `--llms` manifests, and help synopses from
 * Zod's output view, where a defaulted field always has a value and is
 * therefore listed as required. Callers may omit such a field, so each one is
 * wrapped as optional while its default, constraints, metadata, and parsed
 * value stay unchanged.
 */
export const presentOmittableDefaults = (cli) => {
    for (const { definition } of cliCommands(cli))
        presentInputs(definition);
};
const presentInputs = (command) => {
    for (const group of INPUT_GROUPS) {
        const schema = command[group];
        if (schema instanceof z.ZodObject)
            command[group] = withOmittableDefaults(schema);
    }
};
const withOmittableDefaults = (schema) => {
    const omittable = Object.entries(schema.shape).filter(([, field]) => fillsOmission(field));
    if (omittable.length === 0)
        return schema;
    const metadata = schema.meta();
    const result = schema.safeExtend(Object.fromEntries(omittable.map(([key, field]) => [key, optionalWithMetadata(field)])));
    return metadata === undefined ? result : result.meta(metadata);
};
/** Let the object parser decide omission; the CLI advertises required outputs. */
const fillsOmission = (field) => field._zod.optout === undefined &&
    z.object({ value: field }).safeParse({}).success;
const optionalWithMetadata = (field) => {
    const metadata = field.meta();
    return metadata === undefined
        ? field.optional()
        : field.optional().meta(metadata);
};
