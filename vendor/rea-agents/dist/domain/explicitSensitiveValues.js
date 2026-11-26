import { toUSVString } from "node:util";
/**
 * The one owner for redacting declared sensitive values: literals a caller
 * explicitly marked sensitive, and transport credentials REA minted itself.
 * Nothing here infers secrecy from names or text patterns; an undeclared value
 * is ordinary evidence. Producers choose what they declare, this module
 * decides how every declared value is found and replaced.
 */
/**
 * HTTP fields whose values are transport credentials by protocol definition
 * (RFC 9110 authentication, RFC 6265 cookies), in lower case. Other headers
 * are ordinary evidence unless a caller declares them.
 */
export const TRANSPORT_CREDENTIAL_HEADERS = new Set([
    "authorization",
    "proxy-authorization",
    "cookie",
    "set-cookie",
]);
/** Whether an HTTP field name carries a transport credential. */
export const isTransportCredentialHeader = (name) => TRANSPORT_CREDENTIAL_HEADERS.has(name.toLowerCase());
/** Distinct non-empty declarations, longest first so overlaps redact whole. */
const declaredLiterals = (values) => [...new Set(values)]
    .filter((literal) => literal !== "")
    .sort((left, right) => right.length - left.length);
/** Whether any declared literal occurs in `value`. */
export const explicitValuesOccurIn = (value, sensitiveValues) => sensitiveValues.some((literal) => literal !== "" && value.includes(literal));
/**
 * UTF-8 spellings of the declared literals, for searching retained bytes. An
 * unpaired surrogate has no UTF-8 representation; encoding it would invent
 * replacement-character bytes and discard real evidence, so it is skipped.
 */
export const explicitUtf8Spellings = (sensitiveValues) => declaredLiterals(sensitiveValues).flatMap((value) => {
    const encoded = Buffer.from(value, "utf8");
    return encoded.toString("utf8") === value ? [encoded] : [];
});
/**
 * Every occurrence of any declared literal in `value`, in order. Overlapping
 * occurrences (of one literal or of several) merge into one span, so no part
 * of an overlapping declaration survives between two replacements. Spans are
 * produced lazily with one cursor per literal, so a caller that stops at a
 * budget does no further matching work.
 */
export function* explicitValueSpans(value, sensitiveValues) {
    const literals = declaredLiterals(sensitiveValues);
    const next = literals.map((literal) => value.indexOf(literal));
    let pending;
    for (;;) {
        // Earliest occurrence; at one start, the longest literal (listed first).
        let selected = -1;
        for (let index = 0; index < literals.length; index += 1)
            if (next[index] >= 0 && (selected < 0 || next[index] < next[selected]))
                selected = index;
        if (selected < 0)
            break;
        const start = next[selected];
        const end = start + literals[selected].length;
        next[selected] = value.indexOf(literals[selected], start + 1);
        if (pending !== undefined && start < pending.end)
            pending = { start: pending.start, end: Math.max(pending.end, end) };
        else {
            if (pending !== undefined)
                yield pending;
            pending = { start, end };
        }
    }
    if (pending !== undefined)
        yield pending;
}
/** Characters of `bytes`' base64 that depend on them alone at a byte offset. */
const base64Stable = (bytes, offset) => {
    const encoded = Buffer.concat([Buffer.alloc(offset), bytes]).toString("base64");
    return encoded.slice(Math.ceil((8 * offset) / 6), Math.floor((8 * (offset + bytes.length)) / 6));
};
const spellingsOf = (value, spelling) => {
    // URL and form serializers replace unpaired surrogates with U+FFFD.
    const scalar = toUSVString(value);
    switch (spelling) {
        case "uri-component":
            return [encodeURIComponent(scalar)];
        case "uri-query":
            return [encodeURIComponent(scalar).replace(/'/gu, "%27")];
        case "uri-plus-space":
            return [encodeURIComponent(scalar).replaceAll("%20", "+")];
        case "form":
            return [
                new URLSearchParams([["value", scalar]])
                    .toString()
                    .slice("value=".length),
            ];
        case "json-escaped":
            return [JSON.stringify(value).slice(1, -1)];
        case "hex": {
            const hex = Buffer.from(value, "utf8").toString("hex");
            return [hex, hex.toUpperCase()];
        }
        case "base64": {
            const bytes = Buffer.from(value, "utf8");
            const aligned = [0, 1, 2].map((offset) => base64Stable(bytes, offset));
            return [
                ...aligned,
                ...aligned.map((text) => text.replaceAll("+", "-").replaceAll("/", "_")),
            ];
        }
    }
};
/**
 * The selected encoded spellings of one declared value, distinct and
 * non-empty, excluding the value itself.
 */
export const explicitTextSpellings = (value, spellings) => [
    ...new Set(spellings
        .flatMap((spelling) => spellingsOf(value, spelling))
        .filter((text) => text !== "" && text !== value)),
];
/** The value in UTF-16 of both byte orders, for searching retained bytes. */
export const explicitUtf16Spellings = (value) => {
    const little = Buffer.from(value, "utf16le");
    return [little, Buffer.from(little).swap16()];
};
/** Lower-case every percent escape, so spellings compare escape-case-insensitively. */
export const lowercasePercentEscapes = (value) => value.includes("%")
    ? value.replace(/%[0-9a-f]{2}/giu, (escape) => escape.toLowerCase())
    : value;
/** Replace declared literal text values without guessing sensitivity from names. */
export const redactExplicitText = (value, sensitiveValues, options = {}) => {
    const literals = declaredLiterals(sensitiveValues);
    if (literals.length === 0)
        return value;
    const replacement = [
        ...(options.replacement === undefined ? [] : [options.replacement]),
        "[REDACTED]",
        "…",
        "",
    ].find((candidate) => literals.every((literal) => !candidate.includes(literal))) ?? "";
    let result = "";
    let cursor = 0;
    for (const { start, end } of explicitValueSpans(value, literals)) {
        result += value.slice(cursor, start) + replacement;
        cursor = end;
    }
    result += value.slice(cursor);
    if (options.cutOff === true) {
        const tail = cutOffPrefixLength(result, literals);
        if (tail > 0)
            result = `${result.slice(0, result.length - tail)}${replacement}`;
    }
    // Replacement boundaries can form another declaration; exclude that text.
    return literals.some((literal) => result.includes(literal)) ? "" : result;
};
/**
 * Redact declared values in retained output. Output whose observed length
 * exceeds the retained bytes was cut by its budget, so its end is checked for
 * the start of a declared value too.
 */
export const redactExplicitOutput = (output, sensitiveValues, replacement) => redactExplicitText(output.text, sensitiveValues, {
    cutOff: output.observedBytes > output.bytes,
    ...(replacement === undefined ? {} : { replacement }),
});
/** Length of the longest proper prefix of a declaration that ends `text`. */
const cutOffPrefixLength = (text, literals) => {
    let longest = 0;
    for (const literal of literals)
        for (let length = Math.min(text.length, literal.length - 1); length > longest; length -= 1)
            if (text.endsWith(literal.slice(0, length))) {
                longest = length;
                break;
            }
    return longest;
};
