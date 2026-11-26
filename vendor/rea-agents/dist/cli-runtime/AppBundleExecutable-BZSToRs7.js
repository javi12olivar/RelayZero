import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, BinaryTargetError, ParseFailureError, cancelledBy, carriedReason, decodeLimit, errorMessage, init_analysisErrorCore, init_appleBundleTypes, init_configurationErrors, init_errorMessage, init_localPath, init_parseFailure, isPathWithinRoot, malformedInput, openableAppleBundleExtension, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_OwnedRegularFile, regularFileCancellation } from "./resources-B3P64jvH.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { RegularFileReadFailure, RetainedRegularFileCleanupFailure, bindRegularFileCleanup, init_RegularFileRead, readRegularFile, retryRegularFileCleanup } from "./RegularFileRead-CRu2Ia6l.js";
import { PlistNestingLimitError, UnknownPlistScalar, createPlistNumberCollector, init_plistNumbers, init_plistUid, init_plistValue, init_unknownPlistScalar, markPlistDictionary } from "./plistValue-B9ZFeVoz.js";
import { createPlistDuplicateKeyCollector, decodeBinaryPropertyList, estimateBinaryPlistExpansion, init_binaryPlistMaterializer, init_plistDuplicateKeys, init_propertyListDecodeBudget, isPlistDecodeBudgetFailure, preflightXmlPropertyListDecode } from "./binaryPlistMaterializer-B6psqr1d.js";
import { decodeXmlPlistText, init_propertyListXmlText } from "./propertyListXmlText-8rMzCv3L.js";
import { hasBinaryPlistSignature, init_appleArchiveFormat } from "./appleArchiveFormat-B-JoSBSY.js";
import { XML_LINE_ENDING, init_xmlDocument, parseXmlDocument } from "./xmlDocument-DuM0TF5n.js";
import { extname, join, sep } from "node:path";
import { z } from "zod";
import { lstat, opendir, realpath, stat } from "node:fs/promises";
import { parseOpenStep } from "plist";

//#region dist/domain/propertyListXmlData.js
var XmlPlistDataError, BASE64_DIGITS, C_WHITESPACE, visitDataQuartets, decodeXmlPlistData;
function init_propertyListXmlData() {
	return (init_propertyListXmlData = __esmMin((() => {
		init_parseFailure();
		init_result();
		XmlPlistDataError = class extends ParseFailureError {
			reason;
			characterOffset;
			constructor(reason, characterOffset = null) {
				const detail = `Cannot decode XML plist <data>: ${reason}`;
				super(reason === "source-location" ? {
					kind: "unsupported",
					format: "xml-plist",
					detail,
					field: "data",
					undecodedContent: true
				} : {
					kind: "malformed",
					format: "xml-plist",
					detail,
					field: "data"
				});
				this.reason = reason;
				this.characterOffset = characterOffset;
				this.name = "XmlPlistDataError";
			}
		};
		BASE64_DIGITS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		C_WHITESPACE = new Set([
			" ",
			"	",
			"\n",
			"\v",
			"\f",
			"\r"
		]);
		visitDataQuartets = (text, visit) => {
			let quartet = 0;
			let digits = 0;
			let padding = 0;
			for (let index = 0; index < text.length; index += 1) {
				if (text.charCodeAt(index) >= 128) return err(new XmlPlistDataError("non-ascii", index));
				const character = text[index];
				if (character === "=") padding += 1;
				else if (!C_WHITESPACE.has(character)) padding = 0;
				const digit = character === "=" ? 0 : BASE64_DIGITS.indexOf(character);
				if (digit < 0) continue;
				quartet = (quartet << 6 | digit) & 16777215;
				digits += 1;
				if (digits % 4 === 0) visit(quartet, padding >= 2 ? 1 : padding === 1 ? 2 : 3);
			}
			return ok(undefined);
		};
		decodeXmlPlistData = (text) => {
			let length = 0;
			const counted = visitDataQuartets(text, (_value, byteCount) => {
				length += byteCount;
			});
			if (!counted.ok) return counted;
			const bytes = new Uint8Array(length);
			let offset = 0;
			const decoded = visitDataQuartets(text, (value, byteCount) => {
				bytes[offset++] = value >> 16;
				if (byteCount >= 2) bytes[offset++] = value >> 8;
				if (byteCount === 3) bytes[offset++] = value;
			});
			return decoded.ok ? ok(bytes) : decoded;
		};
	})))();
}

//#endregion
//#region dist/domain/propertyListXmlSource.js
var scalarSourceUnlocated, readXmlPlistSource, openingTagEnd, closingTagStart, PLIST_LEXICAL_SCALARS, PLIST_CONTAINER_ELEMENTS, collectXmlPlistScalarSpans;
function init_propertyListXmlSource() {
	return (init_propertyListXmlSource = __esmMin((() => {
		init_plistValue();
		init_result();
		init_parseFailure();
		init_xmlDocument();
		init_propertyListXmlData();
		scalarSourceUnlocated = () => unsupportedInput("xml-plist", "Cannot locate XML plist scalar in its original source", { undecodedContent: true });
		readXmlPlistSource = (text, maximumDepth = 128) => {
			const parsed = parseXmlDocument(text, {
				doctype: "allow",
				lineEndings: "preserve"
			});
			if (!parsed.ok) throw parsed.error;
			const document = parsed.value;
			const lineEndings = new RegExp(XML_LINE_ENDING);
			let line = 1;
			let lineStart = 0;
			const readSpan = (node) => {
				if (node.lineNumber === undefined || node.columnNumber === undefined) return err("source-location");
				while (line < node.lineNumber) {
					const ending = lineEndings.exec(text);
					if (ending === null) return err("source-location");
					lineStart = ending.index + ending[0].length;
					line += 1;
				}
				if (line !== node.lineNumber) return err("source-location");
				const start = lineStart + node.columnNumber - 1;
				const openingEnd = openingTagEnd(text, start);
				if (openingEnd < 0 || text[start] !== "<") return err("source-location");
				const selfClosing = text[openingEnd - 1] === "/";
				const end = selfClosing ? openingEnd + 1 : closingTagStart(text, openingEnd + 1);
				return end < 0 ? err("source-location") : ok({
					start: openingEnd + 1,
					end,
					selfClosing
				});
			};
			const spans = collectXmlPlistScalarSpans(document, readSpan, maximumDepth);
			return {
				document,
				scalarLiteral(node) {
					const span = spans.get(node);
					return span?.ok === true ? ok(text.slice(span.value.start, span.value.end)) : err(scalarSourceUnlocated());
				},
				dataValue(node) {
					const span = spans.get(node);
					if (node.nodeName !== "data" || span === undefined) return err(new XmlPlistDataError("source-location"));
					if (!span.ok) return err(new XmlPlistDataError(span.error));
					for (let child = node.firstChild; child !== null; child = child.nextSibling) if (child.nodeType !== child.TEXT_NODE) return err(new XmlPlistDataError("markup"));
					if (span.value.selfClosing) return err(new XmlPlistDataError("empty-element"));
					return decodeXmlPlistData(text.slice(span.value.start, span.value.end));
				}
			};
		};
		openingTagEnd = (source, start) => {
			let quote;
			for (let cursor = start; cursor < source.length; cursor += 1) {
				const character = source[cursor];
				if (quote !== undefined) {
					if (character === quote) quote = undefined;
				} else if (character === "\"" || character === "'") quote = character;
				else if (character === ">") return cursor;
			}
			return -1;
		};
		closingTagStart = (source, contentStart) => {
			let depth = 1;
			let cursor = contentStart;
			while (cursor < source.length) {
				const start = source.indexOf("<", cursor);
				if (start < 0) return -1;
				const delimiter = source.startsWith("<!--", start) ? "-->" : source.startsWith("<![CDATA[", start) ? "]]>" : source.startsWith("<?", start) ? "?>" : undefined;
				if (delimiter !== undefined) {
					const end = source.indexOf(delimiter, start + 2);
					if (end < 0) return -1;
					cursor = end + delimiter.length;
					continue;
				}
				const end = openingTagEnd(source, start);
				if (end < 0) return -1;
				if (source[start + 1] === "/") {
					depth -= 1;
					if (depth === 0) return start;
				} else if (source[end - 1] !== "/") depth += 1;
				cursor = end + 1;
			}
			return -1;
		};
		PLIST_LEXICAL_SCALARS = new Set([
			"data",
			"integer",
			"real",
			"date",
			"true",
			"false"
		]);
		PLIST_CONTAINER_ELEMENTS = new Set([
			"plist",
			"dict",
			"array"
		]);
		collectXmlPlistScalarSpans = (document, readSpan, maximumDepth) => {
			const spans = new WeakMap();
			const root = document.documentElement;
			if (root === null) return spans;
			const pending = [{
				node: root,
				depth: -1
			}];
			while (pending.length > 0) {
				const entry = pending.pop();
				if (entry === undefined) break;
				const { node, depth } = entry;
				if (node.nextSibling !== null) pending.push({
					node: node.nextSibling,
					depth
				});
				if (node.nodeType !== node.ELEMENT_NODE) continue;
				if (node.nodeName !== "key" && depth > maximumDepth) throw new PlistNestingLimitError(maximumDepth);
				if (PLIST_LEXICAL_SCALARS.has(node.nodeName)) spans.set(node, readSpan(node));
				if (PLIST_CONTAINER_ELEMENTS.has(node.nodeName) && node.firstChild !== null) pending.push({
					node: node.firstChild,
					depth: depth + 1
				});
			}
			return spans;
		};
	})))();
}

//#endregion
//#region dist/domain/propertyListXmlScalar.js
var INTEGER_WHITESPACE, REAL_WHITESPACE, INTEGER_LITERAL, REAL_LEADING_WHITESPACE, parseXmlPlistIntegerLiteral, decodeXmlPlistDateLiteral, parseXmlPlistRealLiteral;
function init_propertyListXmlScalar() {
	return (init_propertyListXmlScalar = __esmMin((() => {
		init_result();
		INTEGER_WHITESPACE = "[\\u0000-\\u0020\\u007f\\u2000-\\u200b\\u205f\\u3000]*";
		REAL_WHITESPACE = "[\\u0000-\\u0020\\u007f-\\u00a0\\u2000-\\u200b\\u3000\\ufeff]*";
		INTEGER_LITERAL = new RegExp(`^${INTEGER_WHITESPACE}(?:([+-])${INTEGER_WHITESPACE})?(?:0[xX]([\\da-fA-F]+)|(\\d+))$`, "u");
		REAL_LEADING_WHITESPACE = new RegExp(`^${REAL_WHITESPACE}`, "u");
		parseXmlPlistIntegerLiteral = (raw) => {
			const match = INTEGER_LITERAL.exec(raw);
			if (match === null) return undefined;
			const magnitude = BigInt(match[2] === undefined ? match[3] : `0x${match[2]}`);
			return match[1] === "-" ? -magnitude : magnitude;
		};
		decodeXmlPlistDateLiteral = (raw) => {
			const match = /^(-?)(\d+)-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/u.exec(raw);
			if (match === null) return err("invalid-literal");
			const yearMagnitude = Number(match[2]);
			const year = match[1] === "-" ? -yearMagnitude : yearMagnitude;
			const month = Number(match[3]);
			const day = Number(match[4]);
			const hour = Number(match[5]);
			const minute = Number(match[6]);
			const second = Number(match[7]);
			if (!Number.isSafeInteger(year) || month < 1 || month > 12 || hour > 23 || minute > 59 || second > 59) return err("unrepresentable");
			const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
			const daysInMonth = [
				31,
				leapYear ? 29 : 28,
				31,
				30,
				31,
				30,
				31,
				31,
				30,
				31,
				30,
				31
			][month - 1];
			if (day < 1 || day > daysInMonth) return err("unrepresentable");
			const date = new Date(0);
			date.setUTCFullYear(year, month - 1, day);
			date.setUTCHours(hour, minute, second, 0);
			return Number.isNaN(date.getTime()) ? err("unrepresentable") : ok(date);
		};
		parseXmlPlistRealLiteral = (raw) => {
			const text = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>|&#(?:x([\da-fA-F]+)|(\d+));|&(amp|lt|gt|apos|quot);/gu, (_token, cdata, hex, decimal, name) => {
				if (cdata !== undefined) return cdata;
				if (hex !== undefined) return String.fromCodePoint(Number.parseInt(hex, 16));
				if (decimal !== undefined) return String.fromCodePoint(Number.parseInt(decimal, 10));
				return name === "amp" ? "&" : name === "lt" ? "<" : name === "gt" ? ">" : name === "apos" ? "'" : "\"";
			});
			if (text.length <= 9) {
				switch (text.toLowerCase()) {
					case "nan": return ok(Number.NaN);
					case "+infinity":
					case "infinity":
					case "+inf":
					case "inf": return ok(Number.POSITIVE_INFINITY);
					case "-infinity":
					case "-inf": return ok(Number.NEGATIVE_INFINITY);
				}
			}
			const numericText = text.replace(REAL_LEADING_WHITESPACE, "");
			if (!/^[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:[eE][+-]?\d+)?$/u.test(numericText)) return err("invalid-literal");
			const value = Number(numericText);
			return Number.isFinite(value) ? ok(value) : err("unrepresentable");
		};
	})))();
}

//#endregion
//#region dist/domain/propertyListXml.js
var decodeXmlPropertyList;
function init_propertyListXml() {
	return (init_propertyListXml = __esmMin((() => {
		init_plistUid();
		init_propertyListXmlSource();
		init_plistNumbers();
		init_plistDuplicateKeys();
		init_unknownPlistScalar();
		init_plistValue();
		init_propertyListXmlScalar();
		decodeXmlPropertyList = (text, maximumDepth = 128) => {
			const source = readXmlPlistSource(text, maximumDepth);
			const document = source.document;
			const root = document.documentElement;
			if (root?.nodeName !== "plist") throw new TypeError("malformed document. First element should be <plist>");
			const numbers = createPlistNumberCollector();
			const duplicates = createPlistDuplicateKeyCollector();
			const textNode = (node) => node.nodeType === node.TEXT_NODE;
			const characterNode = (node) => textNode(node) || node.nodeType === node.CDATA_SECTION_NODE;
			const content = (node, accepts) => {
				let text = "";
				for (let child = node.firstChild; child !== null; child = child.nextSibling) {
					if (accepts(child)) text += child.nodeValue ?? "";
				}
				return text;
			};
			const hasUnsupportedMarkup = (node, accepts) => {
				for (let child = node.firstChild; child !== null; child = child.nextSibling) if (!accepts(child)) return true;
				return false;
			};
			const dictionaryKey = (node) => {
				for (let child = node.firstChild; child !== null; child = child.nextSibling) if (child.nodeType === child.ELEMENT_NODE) return String(node.firstChild?.nodeValue ?? null);
				return content(node, characterNode);
			};
			const members = function* (node) {
				for (let child = node.firstChild; child !== null; child = child.nextSibling) if (child.nodeType !== child.TEXT_NODE && child.nodeType !== child.CDATA_SECTION_NODE && child.nodeType !== child.COMMENT_NODE && child.nodeType !== child.PROCESSING_INSTRUCTION_NODE) yield child;
			};
			const decode = (node) => {
				switch (node.nodeName) {
					case "plist": return Array.from(members(node), decode);
					case "array": {
						const values = [];
						for (const member of members(node)) {
							const value = decode(member);
							if (value !== null) values.push(value);
						}
						return values;
					}
					case "dict": {
						const entries = [];
						let key;
						for (const child of members(node)) {
							if (key === undefined) {
								if (child.nodeName !== "key") throw new TypeError("Missing key while parsing <dict/>");
								key = dictionaryKey(child);
							} else {
								if (child.nodeName === "key") throw new TypeError("Unexpected <key> while parsing <dict/>. Keys and values must alternate.");
								entries.push([key, decode(child)]);
								key = undefined;
							}
						}
						if (key !== undefined) throw new TypeError("Missing value for key while parsing <dict/>");
						duplicates.dictionary(entries.map(([name]) => name));
						const value = Object.fromEntries(entries);
						const keys = Object.keys(value);
						markPlistDictionary(value, keys.length === 1 && keys[0] === "CF$UID" && typeof value["CF$UID"] === "number" ? value["CF$UID"] : undefined);
						return value;
					}
					case "key": {
						const value = node.firstChild === null ? "" : node.firstChild.nodeValue;
						return value;
					}
					case "string": return content(node, characterNode);
					case "integer": {
						const raw = source.scalarLiteral(node);
						if (!raw.ok) throw raw.error;
						const unsupportedMarkup = hasUnsupportedMarkup(node, textNode);
						const exact = !unsupportedMarkup ? parseXmlPlistIntegerLiteral(raw.value) : undefined;
						if (exact === undefined) return new UnknownPlistScalar("integer", raw.value, unsupportedMarkup ? "unsupported-markup" : "invalid-literal");
						numbers.integer(exact);
						const decoded = Number(exact);
						return Number.isFinite(decoded) ? decoded : exact;
					}
					case "real": {
						const raw = source.scalarLiteral(node);
						if (!raw.ok) throw raw.error;
						if (hasUnsupportedMarkup(node, characterNode)) return new UnknownPlistScalar("real", raw.value, "unsupported-markup");
						const value = parseXmlPlistRealLiteral(raw.value);
						if (!value.ok) return new UnknownPlistScalar("real", raw.value, value.error);
						numbers.real(value.value);
						return value.value;
					}
					case "data": {
						const value = source.dataValue(node);
						if (!value.ok) throw value.error;
						return value.value;
					}
					case "date": {
						const raw = source.scalarLiteral(node);
						if (!raw.ok) throw raw.error;
						if (hasUnsupportedMarkup(node, textNode)) return new UnknownPlistScalar("date", raw.value, "unsupported-markup");
						const date = decodeXmlPlistDateLiteral(raw.value);
						return date.ok ? date.value : new UnknownPlistScalar("date", raw.value, date.error);
					}
					case "null": return null;
					case "true":
					case "false": {
						const raw = source.scalarLiteral(node);
						if (!raw.ok) throw raw.error;
						return raw.value === "" ? node.nodeName === "true" : new UnknownPlistScalar(node.nodeName, raw.value, hasUnsupportedMarkup(node, textNode) ? "unsupported-markup" : "invalid-literal");
					}
					default: throw new TypeError(`Invalid PLIST tag ${node.nodeName}`);
				}
			};
			const values = Array.from(members(root), decode);
			return {
				value: values.length === 1 ? values[0] : values,
				numberLiterals: numbers.result(),
				duplicateKeys: duplicates.result()
			};
		};
	})))();
}

//#endregion
//#region dist/domain/propertyListOpenStep.js
var OPEN_STEP_SYNTAX_CODES, NEXT_STEP_LATIN_TABLE, decodeOpenStepQuotedString, OpenStepPropertyListError, startsOpenStepPropertyList, skipTrivia, decodeOpenStepPropertyList;
function init_propertyListOpenStep() {
	return (init_propertyListOpenStep = __esmMin((() => {
		init_plistValue();
		init_parseFailure();
		init_plistUid();
		OPEN_STEP_SYNTAX_CODES = [
			"unterminated_block_comment",
			"unexpected_end",
			"unterminated_dictionary",
			"expected_equals",
			"unterminated_array",
			"expected_separator",
			"unexpected_character"
		];
		NEXT_STEP_LATIN_TABLE = [
			160,
			192,
			193,
			194,
			195,
			196,
			197,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			210,
			211,
			212,
			213,
			214,
			217,
			218,
			219,
			220,
			221,
			222,
			181,
			215,
			247,
			169,
			161,
			162,
			163,
			8260,
			165,
			402,
			167,
			164,
			8217,
			8220,
			171,
			8249,
			8250,
			64257,
			64258,
			174,
			8211,
			8224,
			8225,
			183,
			166,
			182,
			8226,
			8218,
			8222,
			8221,
			187,
			8230,
			8240,
			172,
			191,
			185,
			715,
			180,
			710,
			732,
			175,
			728,
			729,
			168,
			178,
			730,
			184,
			179,
			733,
			731,
			711,
			8212,
			177,
			188,
			189,
			190,
			224,
			225,
			226,
			227,
			228,
			229,
			231,
			232,
			233,
			234,
			235,
			236,
			198,
			237,
			170,
			238,
			239,
			240,
			241,
			321,
			216,
			338,
			186,
			242,
			243,
			244,
			245,
			246,
			230,
			249,
			250,
			251,
			305,
			252,
			253,
			322,
			248,
			339,
			223,
			254,
			255,
			65533,
			65533
		];
		decodeOpenStepQuotedString = (token) => {
			parseOpenStep(token);
			const content = token.slice(1, -1);
			let result = "";
			let i = 0;
			while (i < content.length) {
				const ch = content[i];
				if (ch !== "\\") {
					result += ch;
					i += 1;
					continue;
				}
				i += 1;
				if (i >= content.length) break;
				const esc = content[i];
				i += 1;
				switch (esc) {
					case "a":
						result += "\x07";
						break;
					case "b":
						result += "\b";
						break;
					case "f":
						result += "\f";
						break;
					case "n":
						result += "\n";
						break;
					case "r":
						result += "\r";
						break;
					case "t":
						result += "	";
						break;
					case "v":
						result += "\v";
						break;
					case "\"":
						result += "\"";
						break;
					case "\\":
						result += "\\";
						break;
					case "\n":
						result += "\n";
						break;
					case "U": {
						let num = 0;
						let digits = 0;
						while (digits < 4 && i < content.length) {
							const hexChar = content[i];
							if (/^[0-9a-fA-F]$/.test(hexChar)) {
								num = num << 4 | parseInt(hexChar, 16);
								i += 1;
								digits += 1;
							} else {
								break;
							}
						}
						if (num >= 55296 && num <= 56319) {
							if (content[i] === "\\" && content[i + 1] === "U") {
								let lowNum = 0;
								let lowDigits = 0;
								let j = i + 2;
								while (lowDigits < 4 && j < content.length) {
									const hexChar = content[j];
									if (/^[0-9a-fA-F]$/.test(hexChar)) {
										lowNum = lowNum << 4 | parseInt(hexChar, 16);
										j += 1;
										lowDigits += 1;
									} else {
										break;
									}
								}
								if (lowDigits === 4 && lowNum >= 56320 && lowNum <= 57343) {
									i = j;
									result += String.fromCharCode(num, lowNum);
									break;
								}
							}
							result += "�";
						} else if (num >= 56320 && num <= 57343) {
							result += "�";
						} else {
							result += String.fromCharCode(num);
						}
						break;
					}
					case "0":
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7": {
						let num = esc.charCodeAt(0) - 48;
						for (let j = 0; j < 2; j += 1) {
							if (i < content.length) {
								const octChar = content[i];
								if (octChar >= "0" && octChar <= "7") {
									num = (num << 3) + (octChar.charCodeAt(0) - 48) & 255;
									i += 1;
								} else {
									break;
								}
							}
						}
						if (num < 128) {
							result += String.fromCharCode(num);
						} else {
							const codePoint = NEXT_STEP_LATIN_TABLE[num - 128];
							result += codePoint !== undefined ? String.fromCharCode(codePoint) : "�";
						}
						break;
					}
					default:
						result += esc;
						break;
				}
			}
			return result;
		};
		OpenStepPropertyListError = class extends ParseFailureError {
			code;
			position;
			constructor(code, position) {
				super({
					kind: "malformed",
					format: "openstep-plist",
					detail: code
				});
				this.code = code;
				this.position = position;
				this.name = "OpenStepPropertyListError";
			}
		};
		startsOpenStepPropertyList = (text) => {
			const cursor = skipTrivia(text, 0, false);
			return text[cursor] === "{" || text[cursor] === "(";
		};
		skipTrivia = (text, start, strict = true) => {
			let cursor = start;
			while (cursor < text.length) {
				if (/\s/u.test(text[cursor])) cursor += 1;
				else if (text.startsWith("//", cursor)) {
					cursor += 2;
					while (cursor < text.length && !"\n\r\u2028\u2029".includes(text[cursor])) cursor += 1;
				} else if (text.startsWith("/*", cursor)) {
					const end = text.indexOf("*/", cursor + 2);
					if (end < 0) {
						if (strict) throw new OpenStepPropertyListError("unterminated_block_comment", cursor);
						return text.length;
					}
					cursor = end + 2;
				} else break;
			}
			return cursor;
		};
		decodeOpenStepPropertyList = (text, maximumDepth = 128, duplicates) => {
			let cursor = 0;
			const trivia = () => {
				cursor = skipTrivia(text, cursor);
			};
			const assertDepth = (depth) => {
				if (depth > maximumDepth) throw new PlistNestingLimitError(maximumDepth);
			};
			const value = (depth, dictionaryKey = false) => {
				trivia();
				if (cursor >= text.length) throw new OpenStepPropertyListError("unexpected_end", cursor);
				const character = text[cursor];
				if (character === "{") {
					assertDepth(depth);
					cursor += 1;
					const dictionary = {};
					const keys = [];
					markPlistDictionary(dictionary);
					while (true) {
						trivia();
						if (cursor >= text.length) throw new OpenStepPropertyListError("unterminated_dictionary", cursor);
						if (text[cursor] === "}") {
							cursor += 1;
							duplicates?.dictionary(keys);
							return dictionary;
						}
						const key = value(depth + 1, true);
						trivia();
						if (text[cursor] !== "=") throw new OpenStepPropertyListError("expected_equals", cursor);
						cursor += 1;
						const entry = value(depth + 1);
						keys.push(String(key));
						Object.defineProperty(dictionary, String(key), {
							value: entry,
							enumerable: true,
							configurable: true,
							writable: true
						});
						trivia();
						if (text[cursor] === ";") cursor += 1;
					}
				}
				if (character === "(") {
					assertDepth(depth);
					cursor += 1;
					const array = [];
					trivia();
					if (text[cursor] === ")") {
						cursor += 1;
						return array;
					}
					while (true) {
						array.push(value(depth + 1));
						trivia();
						if (cursor >= text.length) throw new OpenStepPropertyListError("unterminated_array", cursor);
						if (text[cursor] === ")") {
							cursor += 1;
							return array;
						}
						if (text[cursor] !== ",") throw new OpenStepPropertyListError("expected_separator", cursor);
						cursor += 1;
						trivia();
						if (text[cursor] === ")") {
							cursor += 1;
							return array;
						}
					}
				}
				const start = cursor;
				if (character === "\"") {
					cursor += 1;
					while (cursor < text.length) {
						const next = text[cursor];
						cursor += next === "\\" ? 2 : 1;
						if (next === "\"") break;
					}
				} else if (character === "<") {
					const end = text.indexOf(">", cursor + 1);
					cursor = end < 0 ? text.length : end + 1;
				} else {
					while (cursor < text.length && /[a-zA-Z0-9._/$:-]/u.test(text[cursor])) cursor += 1;
					if (cursor === start) throw new OpenStepPropertyListError("unexpected_character", cursor);
				}
				if (!dictionaryKey) assertDepth(depth);
				const token = text.slice(start, cursor);
				if (character === "\"") {
					return decodeOpenStepQuotedString(token);
				}
				return character === "<" ? parseOpenStep(token) : token;
			};
			return value(0);
		};
	})))();
}

//#endregion
//#region dist/domain/propertyListKeys.js
var parseXmlPropertyList;
function init_propertyListKeys() {
	return (init_propertyListKeys = __esmMin((() => {
		init_propertyListXml();
		init_propertyListDecodeBudget();
		init_propertyListOpenStep();
		init_plistNumbers();
		init_plistValue();
		init_plistDuplicateKeys();
		parseXmlPropertyList = (text, maximumDepth = 128, maximumXmlDecodeBytes) => {
			if (!startsOpenStepPropertyList(text)) {
				if (maximumXmlDecodeBytes !== undefined) preflightXmlPropertyListDecode(text, maximumXmlDecodeBytes);
				return decodeXmlPropertyList(text, maximumDepth);
			}
			const duplicates = createPlistDuplicateKeyCollector();
			return {
				value: decodeOpenStepPropertyList(text, maximumDepth, duplicates),
				numberLiterals: createPlistNumberCollector().result(true),
				duplicateKeys: duplicates.result()
			};
		};
	})))();
}

//#endregion
//#region dist/domain/apple/infoPlist.js
var INFO_PLIST_DECODE_BYTES, decodeInfoPlistValue;
function init_infoPlist() {
	return (init_infoPlist = __esmMin((() => {
		init_parseFailure();
		init_propertyListKeys();
		init_propertyListXmlText();
		init_appleArchiveFormat();
		init_appleBundleTypes();
		init_binaryPlistMaterializer();
		init_plistValue();
		init_propertyListDecodeBudget();
		INFO_PLIST_DECODE_BYTES = 16 * 1024 * 1024;
		decodeInfoPlistValue = (plist, keys) => {
			const decoded = hasBinaryPlistSignature(plist) ? decodeBinaryPropertyList(plist, estimateBinaryPlistExpansion(plist, INFO_PLIST_DECODE_BYTES)) : parseXmlPropertyList(decodeXmlPlistText(plist), 128, INFO_PLIST_DECODE_BYTES);
			const { names, namesOmitted } = decoded.duplicateKeys;
			const repeated = keys.filter((key) => namesOmitted || names.includes(key));
			if (repeated.length > 0) throw malformedInput("plist", `Info.plist may declare ${repeated.join(", ")} more than once; which declaration applies is ambiguous`);
			return decoded.value;
		};
	})))();
}

//#endregion
//#region dist/application/AppBundleExecutable.js
var BUNDLE_INFO_PLIST_INPUT_BYTES, bundlePlistCancellation, readBundleInfoPlist, BUNDLE_LAYOUTS, VERSIONED_FRAMEWORK_LAYOUTS, FLATTENED_FRAMEWORK_LAYOUTS, resolveAppBundleExecutable, resolveAppleBundleExecutable, bundleLayouts, declaredBundleLayout, findAppBundleResourceRoot, resolveAppBundleResourceRoot, presentLayout, layoutPlistPresent, entryPresent, isAbsence, errorCode, codeDescription, isPermissionDenied, errorReason, wrappedBundle, plistReadFailure, readLayoutPlist, resolveLayoutExecutable, UndeclaredBundleExecutable, executableName, executableEntrySchema, isSafeExecutableName;
function init_AppBundleExecutable() {
	return (init_AppBundleExecutable = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_propertyListDecodeBudget();
		init_infoPlist();
		init_configurationErrors();
		init_parseFailure();
		init_localPath();
		init_appleBundleTypes();
		init_result();
		init_callerPath();
		init_OwnedRegularFile();
		init_errorMessage();
		init_RegularFileRead();
		BUNDLE_INFO_PLIST_INPUT_BYTES = 64 * 1024 * 1024;
		bundlePlistCancellation = (reason) => cancelledBy("resolve_binary_target", carriedReason(reason));
		readBundleInfoPlist = (path, signal) => readRegularFile(path, {
			symlinks: "follow",
			...signal === undefined ? {} : {
				signal,
				cancellationFailure: bundlePlistCancellation
			},
			admit: ({ size }) => {
				if (size > BUNDLE_INFO_PLIST_INPUT_BYTES) throw decodeLimit("plist", `Info.plist exceeds the ${String(BUNDLE_INFO_PLIST_INPUT_BYTES)}-byte input allowance: ${path} (${String(size)} bytes)`, {
					name: "bundle Info.plist input bytes",
					maximum: BUNDLE_INFO_PLIST_INPUT_BYTES,
					required: size
				});
			}
		});
		BUNDLE_LAYOUTS = [{
			name: "contents",
			plist: ["Contents", "Info.plist"],
			programs: ["Contents", "MacOS"],
			programsLabel: "Contents/MacOS"
		}, {
			name: "root",
			plist: ["Info.plist"],
			programs: [],
			programsLabel: "the bundle root"
		}];
		VERSIONED_FRAMEWORK_LAYOUTS = [...BUNDLE_LAYOUTS, {
			name: "versioned-framework",
			plist: [
				"Versions",
				"Current",
				"Resources",
				"Info.plist"
			],
			programs: ["Versions", "Current"],
			programsLabel: "Versions/Current"
		}];
		FLATTENED_FRAMEWORK_LAYOUTS = [...BUNDLE_LAYOUTS, {
			name: "flattened-framework",
			plist: ["Resources", "Info.plist"],
			programs: [],
			programsLabel: "the bundle root"
		}];
		resolveAppBundleExecutable = async (path, fileSystem, options) => {
			try {
				const layout = await presentLayout(path);
				if (layout !== undefined) return await resolveLayoutExecutable(path, layout, fileSystem, options);
				const wrapped = await wrappedBundle(path);
				if (wrapped !== undefined) {
					const wrappedLayout = await presentLayout(wrapped);
					if (wrappedLayout !== undefined) return await resolveLayoutExecutable(wrapped, wrappedLayout, fileSystem, options);
				}
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError) throw cause;
				if (cause instanceof BinaryTargetError) return err(cause);
				return err(new BinaryTargetError(path, errorReason(cause, path), { cause }));
			}
			return err(new BinaryTargetError(path, `app Info.plist is missing or no supported bundle layout was found: ${path}`, { cause: new Error("No Contents/Info.plist, root Info.plist, or single Wrapper/*.app bundle was found") }));
		};
		resolveAppleBundleExecutable = async (path, options = {}) => {
			const fileSystem = options.fileSystem ?? {
				readFile: (plistPath) => readBundleInfoPlist(plistPath, options.signal),
				realpath
			};
			if (extname(path).toLowerCase() === ".app") return resolveAppBundleExecutable(path, fileSystem, options);
			try {
				const layout = await declaredBundleLayout(path, fileSystem.realpath);
				if (!layout.ok) return layout;
				if (layout.value === undefined) return err(new BinaryTargetError(path, `bundle Info.plist was not found in any supported layout: ${path}`, {
					constraint: "bundle_info_plist_missing",
					probedPaths: (await bundleLayouts(path)).map((candidate) => join(path, ...candidate.plist))
				}));
				return await resolveLayoutExecutable(path, layout.value, fileSystem, options);
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError) throw cause;
				if (cause instanceof BinaryTargetError) return err(cause);
				return err(new BinaryTargetError(path, errorReason(cause, path), { cause }));
			}
		};
		bundleLayouts = async (bundle) => {
			if (extname(bundle).toLowerCase() !== ".framework") return BUNDLE_LAYOUTS;
			return await entryPresent(join(bundle, "Versions")) ? VERSIONED_FRAMEWORK_LAYOUTS : FLATTENED_FRAMEWORK_LAYOUTS;
		};
		declaredBundleLayout = async (path, canonicalize) => {
			const layouts = await bundleLayouts(path);
			if (layouts === VERSIONED_FRAMEWORK_LAYOUTS) {
				const current = join(path, "Versions", "Current");
				if (!await entryPresent(current)) return err(new BinaryTargetError(path, `framework has Versions but no Versions/Current: ${current}`, {
					constraint: "bundle_current_version_missing",
					probedPaths: [current]
				}));
			}
			const present = [];
			for (const layout of layouts) if (await layoutPlistPresent(join(path, ...layout.plist))) present.push(layout);
			const [layout, ...others] = present;
			if (layout === undefined) return ok(undefined);
			if (others.length > 0) return err(new BinaryTargetError(path, `bundle declares Info.plist in more than one layout: ${path}`, {
				constraint: "bundle_layout_ambiguous",
				probedPaths: present.map((candidate) => join(path, ...candidate.plist))
			}));
			const plistPath = join(path, ...layout.plist);
			if (!isPathWithinRoot(await canonicalize(path), await canonicalize(plistPath))) return err(new BinaryTargetError(path, "bundle Info.plist leaves the bundle", {
				constraint: "bundle_path_escapes",
				probedPaths: [plistPath]
			}));
			return ok(layout);
		};
		findAppBundleResourceRoot = async (path, options = {}) => {
			const callerPath = absoluteCallerPath(path, options.cwd === undefined ? {} : { cwd: options.cwd });
			try {
				await stat(callerPath);
				const canonicalInput = await realpath(callerPath);
				const extension = extname(canonicalInput).toLowerCase();
				if (extension !== ".app" && openableAppleBundleExtension(extension) !== undefined) {
					const declared = await declaredBundleLayout(canonicalInput, realpath);
					if (!declared.ok) return declared;
					if (declared.value === undefined) return err(new BinaryTargetError(callerPath, `bundle Info.plist was not found in any supported layout: ${callerPath}`, {
						constraint: "bundle_info_plist_missing",
						probedPaths: (await bundleLayouts(canonicalInput)).map((layout) => join(canonicalInput, ...layout.plist))
					}));
					return ok({
						callerPath,
						canonicalPath: canonicalInput,
						infoPlistPath: join(canonicalInput, ...declared.value.plist),
						layout: declared.value.name,
						executableSha256: null
					});
				}
				const directLayout = await presentLayout(canonicalInput);
				const wrapped = directLayout === undefined ? await wrappedBundle(canonicalInput) : undefined;
				const root = wrapped ?? canonicalInput;
				const layout = directLayout ?? await presentLayout(root);
				if (layout === undefined) return ok(undefined);
				const canonicalPath = await realpath(root);
				return ok({
					callerPath,
					canonicalPath,
					infoPlistPath: join(canonicalPath, ...layout.plist),
					layout: layout.name,
					executableSha256: null
				});
			} catch (cause) {
				if (cause instanceof BinaryTargetError) return err(cause);
				return err(new BinaryTargetError(callerPath, errorReason(cause, callerPath), { cause }));
			}
		};
		resolveAppBundleResourceRoot = async (path, options = {}) => {
			const found = await findAppBundleResourceRoot(path, options);
			if (!found.ok) return found;
			if (found.value !== undefined) return ok(found.value);
			const callerPath = absoluteCallerPath(path, options);
			return err(new BinaryTargetError(callerPath, `app resource root has no supported Info.plist layout: ${callerPath}`));
		};
		presentLayout = async (bundle) => {
			for (const layout of BUNDLE_LAYOUTS) if (await layoutPlistPresent(join(bundle, ...layout.plist))) return layout;
			return undefined;
		};
		layoutPlistPresent = async (path) => {
			try {
				return (await stat(path)).isFile();
			} catch (cause) {
				if (isAbsence(cause)) return false;
				if (isPermissionDenied(cause)) throw new BinaryTargetError(path, `permission denied inspecting app Info.plist ${path}`, { cause });
				throw cause;
			}
		};
		entryPresent = async (path) => {
			try {
				await lstat(path);
				return true;
			} catch (cause) {
				if (isAbsence(cause)) return false;
				throw cause;
			}
		};
		isAbsence = (cause) => {
			const code = errorCode(cause);
			return code === "ENOENT" || code === "ENOTDIR";
		};
		errorCode = (cause) => cause instanceof Error ? Reflect.get(cause, "code") : undefined;
		codeDescription = (cause) => {
			const code = errorCode(cause);
			return typeof code === "string" || typeof code === "number" ? ` (${String(code)})` : "";
		};
		isPermissionDenied = (cause) => errorCode(cause) === "EACCES" || errorCode(cause) === "EPERM";
		errorReason = (cause, path) => isPermissionDenied(cause) ? `permission denied accessing app bundle path ${path}` : isAbsence(cause) ? `app bundle path is missing: ${path}` : `could not inspect app bundle path ${path}`;
		wrappedBundle = async (bundle) => {
			const wrapper = join(bundle, "Wrapper");
			try {
				if (!(await lstat(wrapper)).isDirectory()) return undefined;
			} catch (cause) {
				if (isAbsence(cause)) return undefined;
				throw cause;
			}
			let app;
			for await (const entry of await opendir(wrapper)) {
				if (!entry.isDirectory() || !entry.name.toLowerCase().endsWith(".app")) continue;
				if (app !== undefined) return undefined;
				app = join(wrapper, entry.name);
			}
			return app;
		};
		plistReadFailure = (plistPath, noun, failure, signal) => {
			const cause = failure instanceof RegularFileReadFailure ? failure.operationCause : failure;
			const error = new BinaryTargetError(plistPath, cause instanceof ParseFailureError && cause.kind === "limit" ? cause.message : isPermissionDenied(cause) ? `permission denied reading ${noun} Info.plist ${plistPath}` : isAbsence(cause) ? `${noun} Info.plist is missing: ${plistPath}` : `could not read ${noun} Info.plist ${plistPath}${codeDescription(cause)}`, { cause });
			if (signal?.aborted === true) analysisErrorWithCancellation(error, bundlePlistCancellation(signal.reason));
			return error;
		};
		readLayoutPlist = async (path, noun, read, { resources, signal }) => {
			try {
				return ok(await read(path));
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError) throw cause;
				if (!(cause instanceof RetainedRegularFileCleanupFailure)) return err(plistReadFailure(path, noun, cause, signal));
				const failure = cause;
				const retry = resources === undefined ? undefined : await retryRegularFileCleanup(failure, resources, signal);
				const { outcome } = failure;
				const cancellation = regularFileCancellation(failure) ?? (outcome.kind === "completed" && signal?.aborted === true ? { reason: signal.reason } : undefined);
				if (retry !== undefined && retry.failure === undefined) {
					if (cancellation !== undefined) throw bundlePlistCancellation(cancellation.reason);
					return outcome.kind === "completed" ? ok(outcome.value) : err(plistReadFailure(path, noun, failure.operationFailure ?? outcome.cause, signal));
				}
				const primary = failure.operationFailure !== undefined ? plistReadFailure(path, noun, failure.operationFailure, signal) : cancellation !== undefined ? bundlePlistCancellation(cancellation.reason) : outcome.kind === "failed" ? plistReadFailure(path, noun, outcome.cause, signal) : undefined;
				const retained = retry?.failure ?? failure;
				const error = new BinaryTargetError(path, "The Info.plist file handle could not be closed", {
					cause: retained,
					cleanupPrimary: primary,
					cleanup: retry?.cleanup ?? {
						reason: errorMessage(failure.cleanupCause),
						resources: [failure.path]
					}
				});
				bindRegularFileCleanup(retained, error);
				return err(error);
			}
		};
		resolveLayoutExecutable = async (bundle, layout, fileSystem, options) => {
			const plistPath = join(bundle, ...layout.plist);
			const noun = extname(bundle).toLowerCase() === ".app" ? "app" : "bundle";
			const plist = await readLayoutPlist(plistPath, noun, fileSystem.readFile, options);
			if (!plist.ok) return plist;
			let name;
			try {
				name = executableName(decodeInfoPlistValue(plist.value, ["CFBundleExecutable"]));
			} catch (cause) {
				if (isPlistDecodeBudgetFailure(cause)) return err(new BinaryTargetError(plistPath, `${noun} Info.plist decoded representation exceeds the ${16} MiB property list decode budget: ${plistPath} (${cause.message}). Shrink the Info.plist and retry.`, {
					cause,
					constraint: "bundle_info_plist_decode_budget_exceeded",
					infoPlist: plistPath
				}));
				return err(new BinaryTargetError(plistPath, `${noun} Info.plist is malformed, unsupported, or lacks CFBundleExecutable: ${plistPath}${cause instanceof Error ? ` (${cause.message})` : ""}`, {
					cause,
					...cause instanceof UndeclaredBundleExecutable ? {
						constraint: "bundle_executable_undeclared",
						infoPlist: plistPath
					} : {}
				}));
			}
			if (!isSafeExecutableName(name)) return err(new BinaryTargetError(bundle, `${noun} has an unsafe CFBundleExecutable`));
			const programs = join(bundle, ...layout.programs);
			const executable = join(programs, name);
			let canonicalBundle;
			try {
				canonicalBundle = await fileSystem.realpath(bundle);
			} catch (cause) {
				return err(new BinaryTargetError(bundle, errorReason(cause, bundle), { cause }));
			}
			try {
				const canonicalPrograms = await fileSystem.realpath(programs);
				if (!isPathWithinRoot(canonicalBundle, canonicalPrograms)) return err(new BinaryTargetError(bundle, `${noun} program directory leaves ${layout.programsLabel}`, {
					constraint: "bundle_path_escapes",
					probedPaths: [programs]
				}));
				const canonicalExecutable = await fileSystem.realpath(executable);
				if (!isPathWithinRoot(canonicalPrograms, canonicalExecutable)) return err(new BinaryTargetError(bundle, `${noun} program file leaves ${layout.programsLabel}`, {
					constraint: "bundle_path_escapes",
					probedPaths: [executable]
				}));
				return ok({
					executable: canonicalExecutable,
					infoPlist: plistPath
				});
			} catch (cause) {
				return err(new BinaryTargetError(executable, isPermissionDenied(cause) ? `permission denied resolving ${noun} program file ${executable}` : isAbsence(cause) ? `${noun} program file is missing: ${executable}` : `could not resolve ${noun} program file ${executable}`, {
					cause,
					...isAbsence(cause) ? {
						constraint: "bundle_program_missing",
						infoPlist: plistPath,
						probedPaths: [executable]
					} : {}
				}));
			}
		};
		UndeclaredBundleExecutable = class extends Error {};
		executableName = (value) => {
			const executable = executableEntrySchema.safeParse(value);
			if (!executable.success) throw new UndeclaredBundleExecutable("CFBundleExecutable is missing");
			return executable.data.CFBundleExecutable;
		};
		executableEntrySchema = z.looseObject({ CFBundleExecutable: z.string() });
		isSafeExecutableName = (name) => name.length > 0 && name !== "." && name !== ".." && !name.includes("\0") && !name.includes("/") && (sep !== "\\" || !name.includes("\\"));
	})))();
}

//#endregion
export { decodeInfoPlistValue, findAppBundleResourceRoot, init_AppBundleExecutable, init_infoPlist, init_propertyListKeys, parseXmlPropertyList, readBundleInfoPlist, resolveAppBundleResourceRoot, resolveAppleBundleExecutable };