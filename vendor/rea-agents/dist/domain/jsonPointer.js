/** Encode one RFC 6901 reference token. */
export const escapeJsonPointerToken = (token) => token.replaceAll("~", "~0").replaceAll("/", "~1");
/** Decode a reference token without validating the enclosing pointer. */
export const unescapeJsonPointerToken = (token) => token.replaceAll("~1", "/").replaceAll("~0", "~");
/** Split an already-admitted JSON pointer into decoded reference tokens. */
export const jsonPointerTokens = (pointer) => pointer === ""
    ? []
    : pointer.slice(1).split("/").map(unescapeJsonPointerToken);
