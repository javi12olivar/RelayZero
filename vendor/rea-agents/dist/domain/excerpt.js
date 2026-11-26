/** Mark text the excerpt helpers retained; only they produce excerpt text. */
export const excerptText = (text) => text;
/**
 * `text` cut to at most `maximum` UTF-16 code units for display, never
 * splitting a surrogate pair, with "…" appended when anything was dropped.
 * Text that fits is returned whole.
 */
export const ellipsisExcerpt = (text, maximum) => text.length <= maximum
    ? excerptText(text)
    : excerptText(`${text.slice(0, excerptEnd(text, maximum))}…`);
/**
 * Cut `text` to at most `maximum` UTF-16 code units without splitting a
 * surrogate pair, format the retained prefix, and append "…" when anything was
 * dropped.
 */
export const formattedEllipsisExcerpt = (text, maximum, format = (prefix) => prefix) => text.length <= maximum
    ? excerptText(format(text))
    : excerptText(`${format(text.slice(0, excerptEnd(text, maximum)))}…`);
/**
 * `text` quoted as a JSON string for a diagnostic. Text longer than `maximum`
 * UTF-16 code units is cut as by {@link ellipsisExcerpt} and keeps its full
 * length: `"abc"… (300 UTF-16 code units)`.
 */
export const quotedExcerpt = (text, maximum) => text.length <= maximum
    ? excerptText(JSON.stringify(text))
    : excerptText(`${JSON.stringify(text.slice(0, excerptEnd(text, maximum)))}… (${String(text.length)} UTF-16 code units)`);
/** Where a cut to `maximum` code units ends without splitting a surrogate pair. */
const excerptEnd = (text, maximum) => maximum > 0 && /[\uD800-\uDBFF]/u.test(text.charAt(maximum - 1))
    ? maximum - 1
    : Math.max(0, maximum);
