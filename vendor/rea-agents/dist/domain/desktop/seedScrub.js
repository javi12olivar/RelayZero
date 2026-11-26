import { gunzip, gzipDeterministic, hasExtraField, isGzip, } from "./gzipDocument.js";
import { identityLeftIn, identitySpellings, scrubHostIdentity, } from "./hostIdentity.js";
import { detectStateFormat, isTextualFormat, textSyntaxFormat, } from "./stateFormats.js";
import { decodeStateUtf16 } from "./stateTextEncoding.js";
import { strictUtf8Decoder } from "../strictUtf8.js";
import { isRecord } from "../../kernel/isRecord.js";
/** Seeds up to this size are decoded, well inside a JavaScript string; a larger one is only searched byte for byte. */
const MAX_SCRUBBED_BYTES = 256 * 1024 * 1024;
/** Whitespace JSON allows between tokens. */
const JSON_SPACE = new Set([" ", "\t", "\n", "\r"]);
/** Where the string literal opening at `start` ends, just past its closing quote: the first of its quotes no odd run of backslashes escapes, or -1. */
const stringEnd = (text, start) => {
    const mark = text[start] ?? "";
    for (let quote = text.indexOf(mark, start + 1); quote !== -1;) {
        let slashes = 0;
        while (text[quote - 1 - slashes] === "\\")
            slashes += 1;
        if (slashes % 2 === 0)
            return quote + 1;
        quote = text.indexOf(mark, quote + 1);
    }
    return -1;
};
/** Whether the token after a string literal is a colon, which makes it a member name or dictionary key. */
const isMemberName = (text, end) => {
    let next = end;
    while (JSON_SPACE.has(text[next] ?? ""))
        next += 1;
    return text[next] === ":";
};
/**
 * JSON with each string value scrubbed as its decoded value and rewritten
 * only when that changed, so names, literals, numbers and other strings keep
 * their spelling. A name is never rewritten, since two could then collide;
 * one holding the identity is left for the search for what is left. The
 * document, already read as JSON, is walked one string at a time, so a long
 * string costs no more stack than a short one.
 */
const scrubJson = (text, identity) => {
    const parts = [];
    const strings = [];
    let copied = 0;
    for (let start = text.indexOf('"'); start !== -1;) {
        const end = stringEnd(text, start);
        if (end === -1)
            break;
        const value = JSON.parse(text.slice(start, end));
        const clean = isMemberName(text, end)
            ? value
            : scrubHostIdentity(value, identity);
        strings.push(clean);
        if (clean !== value) {
            parts.push(text.slice(copied, start), JSON.stringify(clean));
            copied = end;
        }
        start = text.indexOf('"', end);
    }
    parts.push(text.slice(copied));
    const scrubbed = parts.join("");
    return { text: scrubbed, decoded: [scrubbed, ...strings].join("\n") };
};
/** Comments, CDATA sections, processing instructions and tags of a document already read as XML; the rest is character data. */
const XML_MARKUP = /<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)\]\]>|<\?[\s\S]*?\?>|<[^>"']*(?:(?:"[^"]*"|'[^']*')[^>"']*)*>/gu;
const XML_VALUE = /"([^"]*)"|'([^']*)'/gu;
const XML_REFERENCE = /&(?:#x([0-9a-fA-F]+)|#([0-9]+)|(lt|gt|amp|quot|apos));/gu;
const XML_ENTITIES = {
    lt: "<",
    gt: ">",
    amp: "&",
    quot: '"',
    apos: "'",
};
/** A character reference's character, or the reference as written when it names no Unicode code point. */
const referenced = (whole, point) => point <= 0x10ffff ? String.fromCodePoint(point) : whole;
const decodeXml = (text, quote) => {
    const normalized = quote !== undefined
        ? text.replace(/\r\n|[\r\n\t]/gu, " ")
        : text.replace(/\r\n|\r/gu, "\n");
    return normalized.replace(XML_REFERENCE, (whole, hex, decimal, name) => hex !== undefined
        ? referenced(whole, Number.parseInt(hex, 16))
        : decimal !== undefined
            ? referenced(whole, Number(decimal))
            : (XML_ENTITIES[name ?? ""] ?? whole));
};
/** Character data, or an attribute value in the given quote, escaped so XML reads it back as written. */
const encodeXml = (text, quote) => text.replace(/[&<>\r\t\n"']/gu, (character) => {
    if (character === "&")
        return "&amp;";
    if (character === "<")
        return "&lt;";
    if (character === ">")
        return "&gt;";
    if (character === "\r")
        return "&#13;";
    if (quote === undefined || (character !== quote && character.trim() !== ""))
        return character;
    return `&#${String(character.codePointAt(0))};`;
});
/**
 * XML with character data, attribute values, comments and CDATA scrubbed,
 * character data and attribute values as their decoded text and rewritten
 * only when that changed; names and processing instructions are kept. Only
 * changed spans are copied out, so however many elements the document has,
 * the scrub holds no more than its changes.
 */
const scrubXml = (text, identity) => {
    const data = (raw, quote) => {
        const value = decodeXml(raw, quote);
        const clean = scrubHostIdentity(value, identity);
        return clean === value ? raw : encodeXml(clean, quote);
    };
    const parts = [];
    let copied = 0;
    /** Replace the span at `start` written `raw` with `clean` when they differ. */
    const replace = (start, raw, clean) => {
        if (clean === raw)
            return;
        parts.push(text.slice(copied, start), clean);
        copied = start + raw.length;
    };
    let end = 0;
    for (const match of text.matchAll(XML_MARKUP)) {
        const [markup, comment, cdata] = match;
        const characters = text.slice(end, match.index);
        replace(end, characters, data(characters));
        end = match.index + markup.length;
        if (comment !== undefined)
            replace(match.index, markup, `<!--${scrubHostIdentity(comment, identity)}-->`);
        else if (cdata !== undefined)
            replace(match.index, markup, `<![CDATA[${scrubHostIdentity(cdata, identity)}]]>`);
        else if (!markup.startsWith("<?"))
            replace(match.index, markup, markup.replace(XML_VALUE, (_value, double, single) => double === undefined
                ? `'${data(single ?? "", "'")}'`
                : `"${data(double, '"')}"`));
    }
    const rest = text.slice(end);
    replace(end, rest, data(rest));
    parts.push(text.slice(copied));
    const scrubbed = parts.join("");
    return { text: scrubbed, decoded: decodeXml(scrubbed) };
};
/** GVariant escapes that stand for one character, as `g_variant_parse` reads them; a backslash before a line break joins lines. */
const GVARIANT_ESCAPES = {
    a: "\u0007",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "\t",
    v: "\v",
    "\n": "",
};
const GVARIANT_ESCAPE = /\\(?:u([0-9a-fA-F]{4})|U([0-9a-fA-F]{8})|([\s\S]))/gu;
/** What, outside quotes, types a GVariant literal as an object path or signature rather than a string. */
const GVARIANT_PATH_OR_SIGNATURE = /\b(?:objectpath|signature)\b|@[a-z(){}]*[og]/u;
/** Whether a code point is one a GVariant string can hold: not NUL, a surrogate or past Unicode. */
const isCharacter = (point) => point > 0 && point <= 0x10ffff && (point < 0xd800 || point >= 0xe000);
/** A GVariant string literal's body decoded, or undefined where `g_variant_parse` refuses it. */
const decodeGVariant = (body) => {
    let refused = body.includes("\0");
    const value = body.replace(GVARIANT_ESCAPE, (_escape, short, long, other) => {
        if (other !== undefined) {
            refused ||= other === "u" || other === "U";
            return GVARIANT_ESCAPES[other] ?? other;
        }
        const point = Number.parseInt(short ?? long ?? "0", 16);
        if (isCharacter(point))
            return String.fromCodePoint(point);
        refused = true;
        return "";
    });
    return refused ? undefined : value;
};
/** A GVariant string literal in the given quote, escaping what would end it or break its key file line. */
const encodeGVariant = (value, quote) => `${quote}${value.replace(/[\\'"\p{Cc}]/gu, (character) => {
    if (character === "\\" || character === quote)
        return `\\${character}`;
    if (character === "'" || character === '"')
        return character;
    return `\\u${(character.codePointAt(0) ?? 0).toString(16).padStart(4, "0")}`;
})}${quote}`;
/** Whether the literal opening at `start` is a bytestring, its `b` starting a token. */
const isBytestring = (text, start) => text[start - 1] === "b" && !/[A-Za-z0-9]/u.test(text[start - 2] ?? "");
/**
 * A dconf value, GVariant text as `dconf dump` prints it, with each string
 * scrubbed as its decoded value and rewritten only when that changed, as JSON
 * strings are: dictionary keys, bytestrings and everything outside quotes
 * keep their spelling. Undefined, so the value ships as captured, when a
 * literal does not parse or the value holds an object path or signature,
 * whose quoted literals are not strings.
 */
const scrubGVariant = (text, identity) => {
    const parts = [];
    const strings = [];
    const quotes = /['"]/gu;
    let outside = "";
    let last = 0;
    let copied = 0;
    for (let match = quotes.exec(text); match !== null; match = quotes.exec(text)) {
        const start = match.index;
        const end = stringEnd(text, start);
        if (end === -1)
            return undefined;
        outside += ` ${text.slice(last, start)}`;
        last = end;
        quotes.lastIndex = end;
        if (isBytestring(text, start))
            continue;
        const value = decodeGVariant(text.slice(start + 1, end - 1));
        if (value === undefined)
            return undefined;
        const clean = isMemberName(text, end)
            ? value
            : scrubHostIdentity(value, identity);
        strings.push(clean);
        if (clean !== value) {
            parts.push(text.slice(copied, start), encodeGVariant(clean, match[0]));
            copied = end;
        }
    }
    if (GVARIANT_PATH_OR_SIGNATURE.test(`${outside} ${text.slice(last)}`))
        return undefined;
    parts.push(text.slice(copied));
    const scrubbed = parts.join("");
    return { text: scrubbed, decoded: [scrubbed, ...strings].join("\n") };
};
/**
 * A dconf view's groups as the key file the computer compiles, each value's
 * strings scrubbed, and whether it still holds the identity, strings decoded.
 * Group names and keys are kept, so no two can collide; a value that does
 * not parse ships as captured.
 */
export const scrubDconf = (groups, identity) => {
    const lines = [];
    const decoded = [];
    for (const [group, keys] of Object.entries(groups)) {
        if (!isRecord(keys))
            continue;
        lines.push(`[${group}]`);
        for (const [key, value] of Object.entries(keys)) {
            if (typeof value !== "string")
                continue;
            const scrub = scrubGVariant(value, identity);
            lines.push(`${key}=${scrub?.text ?? value}`);
            if (scrub !== undefined)
                decoded.push(scrub.decoded);
        }
        lines.push("");
    }
    const text = lines.join("\n");
    return {
        text,
        holdsIdentity: identityLeftIn([text, ...decoded].join("\n"), identity) !== undefined,
    };
};
/** Text and key files, which hold the identity as written. */
const plainScrub = (text, identity) => {
    const scrubbed = scrubHostIdentity(text, identity);
    return { text: scrubbed, decoded: scrubbed };
};
/**
 * The seed's text, the format it is scrubbed as, and how to encode it again:
 * UTF-8 for a text format, or UTF-16 after a byte-order mark, JSON or XML as
 * its text would be in UTF-8, told by syntax alone so no view is built.
 */
const seedText = (bytes, { home, format }) => {
    if (bytes.length > MAX_SCRUBBED_BYTES)
        return undefined;
    const utf16 = decodeStateUtf16(bytes);
    if (utf16 !== undefined) {
        return {
            text: utf16.text,
            format: textSyntaxFormat(home, utf16.text),
            encode: (scrubbed) => {
                const encoded = Buffer.from(scrubbed, "utf16le");
                if (utf16.order === "be")
                    encoded.swap16();
                return Buffer.concat([bytes.subarray(0, 2), encoded]);
            },
        };
    }
    if (!isTextualFormat(format))
        return undefined;
    try {
        const text = strictUtf8Decoder("preserve").decode(bytes);
        return {
            // The byte-order mark is kept, as Python's utf-8 codec keeps it.
            text,
            encode: (scrubbed) => Buffer.from(scrubbed, "utf8"),
            format: format === "text" ? textSyntaxFormat(home, text) : format,
        };
    }
    catch {
        return undefined;
    }
};
/** Whether bytes it does not rewrite hold the identity: read as Latin-1, so each byte is one character, or searched byte for byte past the size it decodes. */
const holdsIdentity = (bytes, identity) => {
    if (bytes.length > MAX_SCRUBBED_BYTES)
        return identitySpellings(identity).some((spelling) => bytes.includes(spelling));
    const latin1 = (value) => value === null ? null : Buffer.from(value).toString("latin1");
    return (identityLeftIn(bytes.toString("latin1"), {
        home: latin1(identity.home) ?? "",
        hostname: latin1(identity.hostname),
        user: latin1(identity.user),
    }) !== undefined);
};
/**
 * Rewrite a seed as the computer reads it at boot: a text format as UTF-8,
 * and another file as UTF-16 when it starts with a byte-order mark, keeping
 * the mark and byte order. JSON is scrubbed by its strings and XML by its
 * character data and attribute values, in either encoding, so neither's
 * syntax changes. Other bytes ship as captured. Either way what ships is
 * searched, its escapes decoded, for what is left.
 */
const scrubDocument = (bytes, seed, identity) => {
    const decoded = seedText(bytes, seed);
    if (decoded === undefined)
        return { bytes: undefined, holdsIdentity: holdsIdentity(bytes, identity) };
    const scrub = decoded.format === "json"
        ? scrubJson(decoded.text, identity)
        : decoded.format === "xml"
            ? scrubXml(decoded.text, identity)
            : plainScrub(decoded.text, identity);
    return {
        bytes: scrub.text === decoded.text ? undefined : decoded.encode(scrub.text),
        holdsIdentity: identityLeftIn(scrub.decoded, identity) !== undefined,
    };
};
/**
 * Scrub a seed as `scrubDocument` does; a gzip file's document uses its
 * captured format, or the format detected from decoded bytes when unknown,
 * then is compressed again alike on every host whether or not it changed, so no file name, comment or time in the
 * captured header ships. One already so ships as captured, as do one that
 * does not decompress within the size decoded and one whose document needs no
 * edit but a member of which has an extra field, where BGZF and dictzip index
 * their blocks; both are searched as their bytes.
 */
export const scrubSeed = (bytes, seed, identity) => {
    if (!isGzip(bytes))
        return scrubDocument(bytes, seed, identity);
    const document = gunzip(bytes, MAX_SCRUBBED_BYTES);
    if (!document.ok)
        return { bytes: undefined, holdsIdentity: holdsIdentity(bytes, identity) };
    // The captured gzip may have exceeded the view's expansion-ratio limit;
    // once decoded for shipping, detect its document format at this boundary.
    const documentSeed = seed.format === null
        ? { ...seed, format: detectStateFormat(seed.home, document.value) }
        : seed;
    const scrub = scrubDocument(document.value, documentSeed, identity);
    if (scrub.bytes === undefined && hasExtraField(bytes))
        return {
            bytes: undefined,
            holdsIdentity: scrub.holdsIdentity || holdsIdentity(bytes, identity),
        };
    const shipped = gzipDeterministic(scrub.bytes ?? document.value);
    if (shipped.equals(bytes))
        return { bytes: undefined, holdsIdentity: scrub.holdsIdentity };
    return {
        bytes: shipped,
        holdsIdentity: scrub.holdsIdentity,
        ...(scrub.bytes === undefined ? { recompressed: true } : {}),
    };
};
