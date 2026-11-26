/**
 * Enum selectors whose current value already chooses stdio. Replacing the
 * launcher with a stdio launcher leaves them correct, so a refresh keeps them
 * instead of superseding them like a remote selector.
 */
export const stdioSelectingFields = (source, connection) => new Set(connection.stdio.flatMap((condition) => {
    if (condition.kind !== "required-enum" &&
        condition.kind !== "optional-enum")
        return [];
    const value = Object.hasOwn(source, condition.field)
        ? source[condition.field]
        : undefined;
    return typeof value === "string" && condition.values.includes(value)
        ? [condition.field]
        : [];
}));
