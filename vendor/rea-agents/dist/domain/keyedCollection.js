import { err, ok } from "./result.js";
/**
 * Key the members of a parsed table. Members without a key (null or
 * undefined), such as an unnamed section, are not keyed and cannot be
 * selected by key.
 */
export const keyedBy = (values, keyOf) => {
    const entries = [];
    const seen = new Set();
    const duplicates = new Set();
    for (const value of values) {
        const key = keyOf(value);
        if (key === undefined || key === null)
            continue;
        if (seen.has(key))
            duplicates.add(key);
        seen.add(key);
        entries.push({ key, ordinal: entries.length, value });
    }
    return { entries, duplicates: [...duplicates] };
};
/**
 * The single declaration of a key the format allows once: undefined when
 * absent, and a typed failure carrying every ordinal when repeated.
 */
export const uniqueKeyed = (keyed, key) => {
    const matches = keyed.entries.filter((entry) => entry.key === key);
    if (matches.length > 1)
        return err({
            kind: "duplicate",
            key,
            ordinals: matches.map(({ ordinal }) => ordinal),
        });
    return ok(matches[0]?.value);
};
/**
 * Every declaration of a key the format allows to repeat, in source order,
 * such as same-named sections that a consumer reads together.
 */
export const allKeyed = (keyed, key) => keyed.entries.flatMap((entry) => (entry.key === key ? [entry.value] : []));
/**
 * The first declaration of a key, for a format whose consumer defines that
 * precedence. Callers must state the format's rule.
 */
export const firstKeyed = (keyed, key, precedence) => {
    if (precedence.trim() === "")
        throw new TypeError("A keyed precedence must state its format rule");
    return keyed.entries.find((entry) => entry.key === key)?.value;
};
