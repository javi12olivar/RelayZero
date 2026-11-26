import { isExactJsonNumber } from "../exactJsonNumber.js";
import { jsonValueExceedsDepth } from "../jsonValue.js";
import { DESKTOP_VIEW_DEFAULTS, desktopViewByteDisplay, } from "./desktopViewPolicy.js";
import { err, ok } from "../result.js";
import { safeParseJson } from "../safeJson.js";
import { hasZipLocalHeader, hasZipSignature } from "../zipPackageFormat.js";
import { ZIP_EOCD_BYTES } from "../zipEndOfCentralDirectory.js";
import { declaredDocumentType, isWellFormedXml, opensLikeXml, parseXmlDocument, } from "../xmlDocument.js";
import { expatXmlName } from "./expatXmlNames.js";
import { desktopLineBreak, isKeyfile, keyfileLines, } from "./desktopTextSyntax.js";
import { decodeStateUtf16 } from "./stateTextEncoding.js";
import { decodeStrictUtf8 } from "../strictUtf8.js";
const SQLITE_HEADER = "SQLite format 3\0";
/** Files beside a SQLite database that hold or undo its committed changes. */
export const SQLITE_SIDECARS = [
    { suffix: "-wal", label: "write-ahead log" },
    { suffix: "-journal", label: "rollback journal" },
];
const GVDB_HEADER = "GVariant";
const XML_EXTENSIONS = /\.(?:xml|xbel|plist|svg|ui)$/iu;
/** A DOCTYPE that only names its DTD reads as XML; one with an internal subset, which can declare entities, does not. */
export const XML_POLICY = {
    doctype: "external",
    lineEndings: "normalize",
    nameSupported: expatXmlName,
};
/** Decode UTF-8 and BOM-marked UTF-16, or return undefined for binary content. */
export const decodeStateText = (bytes) => {
    const utf16 = decodeStateUtf16(bytes);
    if (utf16 !== undefined)
        return utf16.text.includes("\0") ? undefined : utf16.text;
    if (bytes.subarray(0, 8192).includes(0))
        return undefined;
    try {
        return decodeStrictUtf8(bytes, "strip-signature");
    }
    catch {
        return undefined;
    }
};
const JSON_NUMBER = /-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/uy;
const JSON_HEX4 = /[0-9a-fA-F]{4}/uy;
const JSON_ESCAPES = new Set(['"', "\\", "/", "b", "f", "n", "r", "t"]);
/** Where the JSON string opening at `start` ends, past its closing quote, or -1 when it is malformed. */
const jsonStringEnd = (text, start) => {
    for (let at = start + 1; at < text.length; at += 1) {
        const code = text.charCodeAt(at);
        if (code === 0x22)
            return at + 1;
        if (code < 0x20)
            return -1;
        if (code === 0x5c) {
            const escape = text.charAt(at + 1);
            JSON_HEX4.lastIndex = at + 2;
            if (escape === "u" && JSON_HEX4.test(text))
                at += 5;
            else if (JSON_ESCAPES.has(escape))
                at += 1;
            else
                return -1;
        }
    }
    return -1;
};
/** Where the JSON string, number or literal starting at `start` ends, or -1 when none does. */
const jsonScalarEnd = (text, start) => {
    if (text.charCodeAt(start) === 0x22)
        return jsonStringEnd(text, start);
    for (const literal of ["true", "false", "null"])
        if (text.startsWith(literal, start))
            return start + literal.length;
    JSON_NUMBER.lastIndex = start;
    return JSON_NUMBER.test(text) ? JSON_NUMBER.lastIndex : -1;
};
/** Open a container, growing the brackets held as it nests deeper. */
const openJson = (scan, bracket) => {
    if (scan.depth === scan.open.length) {
        const grown = new Uint8Array(scan.open.length * 2);
        grown.set(scan.open);
        scan.open = grown;
    }
    scan.open[scan.depth] = bracket;
    scan.depth += 1;
    scan.expect = bracket === 0x5b ? "value" : "key";
    scan.empty = true;
};
/** Read one bracket, comma or colon into the scan; false when the text cannot hold it there. */
const jsonPunctuation = (scan, char) => {
    const code = char.charCodeAt(0);
    const inner = scan.depth > 0 ? scan.open[scan.depth - 1] : undefined;
    switch (char) {
        case "[":
        case "{":
            if (scan.expect !== "value")
                return false;
            openJson(scan, code);
            return true;
        case "]":
        case "}":
            // A closing bracket's code is its opening's plus two.
            if ((scan.expect !== "after" && !scan.empty) || inner !== code - 2)
                return false;
            scan.depth -= 1;
            break;
        case ",":
            if (scan.expect !== "after" || inner === undefined)
                return false;
            scan.expect = inner === 0x5b ? "value" : "key";
            return true;
        default:
            if (scan.expect !== "colon")
                return false;
            scan.expect = "value";
            return true;
    }
    scan.expect = "after";
    scan.empty = false;
    return true;
};
/** Read a string, number or literal into the scan; false when the text cannot hold it there. */
const jsonScalar = (scan, string) => {
    if (scan.expect === "value")
        scan.expect = "after";
    else if (string && scan.expect === "key")
        scan.expect = "colon";
    else
        return false;
    scan.empty = false;
    return true;
};
/**
 * Whether text is one JSON value as `JSON.parse` reads it, checked a token at
 * a time without building the value: it holds a byte per open container, so
 * text too large to parse into a view is still told apart from other text.
 */
const isJsonText = (text) => {
    const scan = {
        expect: "value",
        empty: false,
        open: new Uint8Array(64),
        depth: 0,
    };
    for (let at = 0; at < text.length;) {
        const char = text.charAt(at);
        if (" \t\n\r".includes(char))
            at += 1;
        else if ("[]{},:".includes(char)) {
            if (!jsonPunctuation(scan, char))
                return false;
            at += 1;
        }
        else {
            at = jsonScalarEnd(text, at);
            if (at < 0 || !jsonScalar(scan, char === '"'))
                return false;
        }
    }
    return scan.expect === "after" && scan.depth === 0;
};
/** Decode JSON string tokens in bounded chunks without constructing the document. */
export function* jsonStringChunks(text, chunkSize = 8192) {
    if (!isJsonText(text))
        return;
    for (let at = 0; at < text.length;) {
        if (text.charAt(at) !== '"') {
            at += 1;
            continue;
        }
        const end = jsonStringEnd(text, at);
        if (end < 0)
            return;
        let start = at + 1;
        let first = true;
        while (start < end - 1) {
            let next = start;
            while (next < end - 1 && next - start < chunkSize) {
                if (text.charAt(next) === "\\")
                    next += text.charAt(next + 1) === "u" ? 6 : 2;
                else
                    next += 1;
            }
            yield {
                text: JSON.parse(`"${text.slice(start, next)}"`),
                first,
            };
            first = false;
            start = next;
        }
        at = end;
    }
}
/** Whether a file's name or leading text marks it as JSON, which it is if it parses. */
const namedJson = (path, trimmed) => path.toLowerCase().endsWith(".json") || /^[[{]/u.test(trimmed);
/** Whether a file's name or XML declaration marks it as XML, which it is if it parses. */
const namedXml = (path, trimmed) => XML_EXTENSIONS.test(path) || trimmed.startsWith("<?xml");
/**
 * Whether text opens with an element, as a Freeplane map's `<map version=…>`
 * without a declaration, or with a DOCTYPE that has no internal subset and
 * then an element, as KmPlot's `<!DOCTYPE kmpdoc><kmpdoc …>`, so it is XML
 * if it is well formed, whatever the file is called. A DOCTYPE with an
 * internal subset, which may declare entities, never opens one.
 */
/**
 * Whether a DOCTYPE before `>` opens an internal subset. A `[` inside a
 * quoted system or public id, as `state[1].dtd`, does not.
 */
const doctypeOpensSubset = (text, from) => {
    let quote = "";
    for (let index = from; index < text.length; index += 1) {
        const character = text[index] ?? "";
        if (quote !== "") {
            if (character === quote)
                quote = "";
            continue;
        }
        if (character === '"' || character === "'")
            quote = character;
        else if (character === "[")
            return true;
        else if (character === ">")
            return false;
    }
    return false;
};
const opensElement = (trimmed) => {
    if (!trimmed.startsWith("<!DOCTYPE") && opensLikeXml(trimmed))
        return true;
    const declared = /^(?:<\?xml[^>]*>\s*)?<!DOCTYPE\b/u.exec(trimmed);
    if (declared === null)
        return false;
    let quote = "";
    for (let index = declared[0].length; index < trimmed.length; index += 1) {
        const character = trimmed[index] ?? "";
        if (quote !== "") {
            if (character === quote)
                quote = "";
            continue;
        }
        if (character === '"' || character === "'")
            quote = character;
        else if (character === "[")
            return false;
        else if (character === ">") {
            const rest = trimmed.slice(index + 1).trimStart();
            return opensLikeXml(rest);
        }
    }
    return false;
};
/** Whether `opening` has a DOCTYPE whose internal subset starts outside quotes. */
export const doctypeHasInternalSubset = (opening) => {
    const declared = /^(?:<\?xml[^>]*>\s*)?<!DOCTYPE\b/u.exec(opening);
    return declared !== null && doctypeOpensSubset(opening, declared[0].length);
};
/**
 * Whether decoded text is JSON or XML as `detectStateFormat` reads it, told
 * by syntax alone so no value or document is built: JSON a token at a time
 * and XML by its well-formedness pass, each holding only what is open.
 */
export const textSyntaxFormat = (path, text) => {
    const trimmed = text.trimStart();
    if (namedJson(path, trimmed) && isJsonText(text))
        return "json";
    if ((namedXml(path, trimmed) || opensElement(trimmed)) &&
        isWellFormedXml(text, { doctype: "external" }))
        return "xml";
    return "text";
};
/** Pick the reader for one retained file from its leading bytes and name. */
export const detectStateFormat = (path, bytes, policy = DESKTOP_VIEW_DEFAULTS) => {
    const header = new TextDecoder("latin1").decode(bytes.subarray(0, 16));
    if (header === SQLITE_HEADER)
        return "sqlite";
    if (header.startsWith(GVDB_HEADER))
        return "dconf";
    if (hasZipLocalHeader(bytes) ||
        (bytes.length >= ZIP_EOCD_BYTES && hasZipSignature(bytes)))
        return "zip";
    const text = decodeStateText(bytes);
    if (text === undefined)
        return "binary";
    const trimmed = text.trimStart();
    if (namedJson(path, trimmed) &&
        // JSON too large for a view is told apart without building its value.
        (bytes.length > policy.parsed_bytes
            ? isJsonText(text)
            : safeParseJson(text).ok))
        return "json";
    // Check syntax without constructing a document for format detection.
    if (namedXml(path, trimmed) || opensElement(trimmed))
        return isWellFormedXml(text, XML_POLICY) ? "xml" : "text";
    return isKeyfile(text) ? "keyfile" : "text";
};
/** An object's own values one at a time, without copying them into an array. */
/** A JSON file's value, refused when a number would be rounded or it nests too deeply. */
const jsonView = (text, policy) => {
    let rounded = false;
    const parsed = safeParseJson(text, (_key, value, context) => {
        if (typeof value === "number" && !isExactJsonNumber(value, context?.source))
            rounded = true;
        return value;
    });
    if (!parsed.ok)
        return parsed;
    if (rounded)
        return err("a number in it cannot be read exactly, such as an integer above 2^53");
    const value = parsed.value;
    return jsonValueExceedsDepth(value, policy.json_depth)
        ? err(`nested deeper than the ${String(policy.json_depth)} levels a JSON view keeps`)
        : ok(value);
};
/** A text file as lines, bounded. */
export const textView = (text, policy = DESKTOP_VIEW_DEFAULTS) => {
    const lines = text.split(desktopLineBreak);
    if (lines.at(-1) === "")
        lines.pop();
    return {
        lines: lines.slice(0, policy.text_lines),
        line_count: lines.length,
        truncated: lines.length > policy.text_lines,
    };
};
/** A dictionary without inherited properties, so captured keys such as `__proto__` stay plain data. */
export const plainRecord = () => Object.create(null);
/**
 * An INI-style key file (desktop entries, GLib key files, `dconf dump`) as
 * groups of string values. Keys before the first group sit in group "".
 */
export const keyfileView = (text) => {
    const groups = plainRecord();
    let group = "";
    for (const line of keyfileLines(text)) {
        if (line.kind === "group") {
            group = line.name;
            groups[group] ??= plainRecord();
        }
        else if (line.kind === "entry")
            (groups[group] ??= plainRecord())[line.key] = line.value;
    }
    return groups;
};
/** XML's whitespace: space, tab, carriage return and line feed, not Unicode's wider set. */
const XML_WHITESPACE = /^[ \t\r\n]*$/u;
const isTextNode = (node) => node.nodeType === node.TEXT_NODE || node.nodeType === node.CDATA_SECTION_NODE;
/** Whether an element holds child elements and no text but whitespace beside them. */
const holdsElementContent = (element) => {
    let elements = false;
    for (let child = element.firstChild; child !== null; child = child.nextSibling)
        if (child.nodeType === child.ELEMENT_NODE)
            elements = true;
        else if (isTextNode(child) && !XML_WHITESPACE.test(child.nodeValue ?? ""))
            return false;
    return elements;
};
const xmlNode = (node, depth, budget, scope, policy) => {
    if (budget.remaining <= 0 || depth > policy.xml_depth) {
        budget.truncated = true;
        return undefined;
    }
    budget.remaining -= 1;
    if (isTextNode(node)) {
        const text = node.nodeValue ?? "";
        return XML_WHITESPACE.test(text) && scope.elementContent && !scope.preserve
            ? undefined
            : text;
    }
    if (node.nodeType !== node.ELEMENT_NODE)
        return undefined;
    const element = node;
    const attributes = plainRecord();
    for (let index = 0; index < element.attributes.length; index += 1) {
        const attribute = element.attributes.item(index);
        if (attribute !== null)
            attributes[attribute.name] = attribute.value;
    }
    const space = element.getAttribute("xml:space");
    const inner = {
        preserve: space === null || space === "" ? scope.preserve : space === "preserve",
        elementContent: holdsElementContent(element),
    };
    const children = [];
    for (let child = element.firstChild; child !== null; child = child.nextSibling) {
        const value = xmlNode(child, depth + 1, budget, inner, policy);
        if (value !== undefined)
            children.push(value);
    }
    return { name: element.tagName, attributes, children };
};
/**
 * An XML document as a bounded element tree. A DOCTYPE that only names its DTD
 * is recorded as `doctype`, its DTD never read; one with an internal subset is
 * refused, as is a reference to any entity but XML's five.
 */
export const xmlView = (text, policy = DESKTOP_VIEW_DEFAULTS) => {
    const parsed = parseXmlDocument(text, XML_POLICY);
    const root = parsed.ok ? parsed.value.documentElement : null;
    if (!parsed.ok || root === null)
        return undefined;
    const budget = { remaining: policy.xml_nodes, truncated: false };
    const tree = xmlNode(root, 0, budget, {
        preserve: false,
        elementContent: false,
    }, policy);
    if (tree === undefined)
        return undefined;
    const doctype = declaredDocumentType(parsed.value);
    return {
        ...(doctype === undefined
            ? {}
            : {
                doctype: {
                    name: doctype.name,
                    public_id: doctype.publicId,
                    system_id: doctype.systemId,
                },
            }),
        root: tree,
        truncated: budget.truncated,
    };
};
/** Whether a format is one of the text formats. */
export const isTextualFormat = (format) => format === "text" ||
    format === "json" ||
    format === "keyfile" ||
    format === "xml";
/** A text, JSON, key file or XML file's view, or why it has none. */
export const textualView = (format, bytes, policy = DESKTOP_VIEW_DEFAULTS) => {
    if ((format === "json" || format === "keyfile") &&
        bytes.length > policy.parsed_bytes)
        return err(`larger than the ${desktopViewByteDisplay(policy.parsed_bytes)} limit for JSON and key file views`);
    const text = decodeStateText(bytes) ?? "";
    switch (format) {
        case "text":
            return ok(textView(text, policy));
        case "json":
            return jsonView(text, policy);
        case "keyfile":
            return ok({ groups: keyfileView(text) });
        case "xml": {
            const tree = xmlView(text, policy);
            return tree === undefined
                ? err("not well-formed XML, or its DOCTYPE has an internal subset")
                : ok(tree);
        }
    }
};
