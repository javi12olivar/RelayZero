/** A value as one single-quoted shell word. */
export const shellQuote = (value) => `'${value.replaceAll("'", `'"'"'`)}'`;
