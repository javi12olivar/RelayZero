import { z } from "zod";
/**
 * How a command's option schema field is spelled and typed on the command
 * line. Option keys are camelCase; each is spelled `--kebab-case`. Help,
 * completion and argument parsing read fields through these helpers so the
 * spelling and the unwrapped type have one owner.
 */
/** The `--flag` spelling of an option key, without the dashes. */
export const optionFlagName = (key) => key.replaceAll(/[A-Z]/gu, (letter) => `-${letter.toLowerCase()}`);
/** The declared type below optional, default, nullable and similar wrappers. */
export const declaredOptionType = (field) => {
    let current = field;
    for (let inner = Reflect.get(current.def, "innerType"); inner instanceof z.ZodType; inner = Reflect.get(current.def, "innerType"))
        current = inner;
    return current;
};
/** A count option (`.meta({ count: true })`) adds one per occurrence. */
export const isCountOption = (field) => field.meta()?.count === true;
