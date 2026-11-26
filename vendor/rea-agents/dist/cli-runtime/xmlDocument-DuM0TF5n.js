import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, init_parseFailure, malformedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { DOMParser, onErrorStopParsing } from "@xmldom/xmldom";
import { SaxesParser } from "saxes";

//#region dist/domain/xmlDocument.js
var XML_LINE_ENDING, isUnqualifiedXmlElement, XML_FORMAT, notWellFormed, unsupportedDoctype, isXmlFailure, xmlFailure, declaresInternalSubset, NAME_START, NAME_MORE, XML_ELEMENT_OPENING, XML_OPENING, opensLikeXml, PUBID, SPACE, EXTERNAL_DOCTYPE, checkXmlSyntax, isWellFormedXml, xmlElementRanges, xmlAttributeQuoteRanges, StopXmlNodeCount, countXmlNodes, parseXmlDocument, literalValue, declaredDocumentType;
function init_xmlDocument() {
	return (init_xmlDocument = __esmMin((() => {
		init_result();
		init_parseFailure();
		XML_LINE_ENDING = /\r\n?|\n/gu;
		isUnqualifiedXmlElement = (node) => node !== null && node.nodeType === 1 && node.namespaceURI === null;
		XML_FORMAT = "xml";
		notWellFormed = (cause) => malformedInput(XML_FORMAT, `XML is not well-formed${cause instanceof Error ? `: ${cause.message}` : ""}`, { cause });
		unsupportedDoctype = (field) => unsupportedInput(XML_FORMAT, field === "doctype" ? "XML document types are unsupported" : "XML document type internal subsets are unsupported", { field });
		isXmlFailure = (cause) => cause instanceof ParseFailureError && cause.failure.format === XML_FORMAT && (cause.kind === "malformed" || cause.kind === "unsupported");
		xmlFailure = (cause) => isXmlFailure(cause) ? cause : notWellFormed(cause);
		declaresInternalSubset = (declaration) => declaration.replace(/"[^"]*"|'[^']*'/gu, "").includes("[");
		NAME_START = String.raw`:A-Z_a-z\u{C0}-\u{D6}\u{D8}-\u{F6}\u{F8}-\u{2FF}\u{370}-\u{37D}\u{37F}-\u{1FFF}\u{200C}\u{200D}\u{2070}-\u{218F}\u{2C00}-\u{2FEF}\u{3001}-\u{D7FF}\u{F900}-\u{FDCF}\u{FDF0}-\u{FFFD}\u{10000}-\u{EFFFF}`;
		NAME_MORE = String.raw`\-.0-9\u{B7}\u{300}-\u{36F}\u{203F}\u{2040}`;
		XML_ELEMENT_OPENING = String.raw`<[${NAME_START}][${NAME_START}${NAME_MORE}]*(?=[ \t\r\n]|/?>)`;
		XML_OPENING = new RegExp(`^(?:<\\?xml\\b|<!DOCTYPE\\b|${XML_ELEMENT_OPENING})`, "u");
		opensLikeXml = (source) => XML_OPENING.test(source);
		PUBID = String.raw`\n\r a-zA-Z0-9\-()+,./:=?;!*#@$_%`;
		SPACE = String.raw`[ \t\r\n]`;
		EXTERNAL_DOCTYPE = new RegExp(`^${SPACE}+[${NAME_START}][${NAME_START}${NAME_MORE}]*` + `(?:${SPACE}+(?:SYSTEM|PUBLIC${SPACE}+(?:"[${PUBID}']*"|'[${PUBID}]*'))` + `${SPACE}+(?:"[^"]*"|'[^']*'))?${SPACE}*$`, "u");
		checkXmlSyntax = (source, doctype, listen, nameSupported) => {
			const syntax = new SaxesParser({
				xmlns: true,
				defaultXMLVersion: "1.0",
				forceXMLVersion: true
			});
			listen?.(syntax);
			const checkName = (name) => {
				if (nameSupported !== undefined && !nameSupported(name)) throw notWellFormed();
			};
			if (nameSupported !== undefined) {
				syntax.on("opentagstart", (tag) => checkName(tag.name));
				syntax.on("attribute", (attribute) => checkName(attribute.name));
				syntax.on("processinginstruction", (instruction) => checkName(instruction.target));
			}
			syntax.on("doctype", (declaration) => {
				if (doctype === "reject") throw unsupportedDoctype("doctype");
				if (doctype !== "external") return;
				if (declaresInternalSubset(declaration)) throw unsupportedDoctype("internal-subset");
				if (!EXTERNAL_DOCTYPE.test(declaration)) throw notWellFormed();
				checkName(declaration.trimStart().split(/[ \t\r\n]/u, 1)[0] ?? "");
			});
			syntax.write(source).close();
		};
		isWellFormedXml = (source, policy) => {
			try {
				checkXmlSyntax(source, policy.doctype, undefined, policy.nameSupported);
				return true;
			} catch {
				return false;
			}
		};
		xmlElementRanges = (source, select, policy) => {
			const ranges = [];
			const open = [];
			let selectedAncestor = false;
			try {
				checkXmlSyntax(source, policy.doctype, (syntax) => {
					syntax.on("opentagstart", () => {
						open.push({
							start: source.lastIndexOf("<", syntax.position - 1),
							picked: false
						});
					});
					syntax.on("opentag", (tag) => {
						const element = open.at(-1);
						if (element === undefined || selectedAncestor) return;
						element.picked = select({
							uri: tag.uri,
							local: tag.local,
							attribute: (uri, local) => Object.values(tag.attributes).find((attribute) => attribute.uri === uri && attribute.local === local)?.value
						});
						selectedAncestor = element.picked;
					});
					syntax.on("closetag", () => {
						const element = open.pop();
						if (element?.picked === true) {
							ranges.push({
								start: element.start,
								end: syntax.position
							});
							selectedAncestor = false;
						}
					});
				});
				return ok(ranges.sort((left, right) => left.start - right.start));
			} catch (cause) {
				return err(xmlFailure(cause));
			}
		};
		xmlAttributeQuoteRanges = (source) => {
			const ranges = [];
			let reader;
			try {
				checkXmlSyntax(source, "allow", (syntax) => {
					reader = syntax;
					syntax.on("attribute", () => {
						const end = syntax.position - 1;
						const quote = source[end];
						if (quote !== "\"" && quote !== "'") throw notWellFormed();
						const start = source.lastIndexOf(quote, end - 1);
						if (start < 0) throw notWellFormed();
						ranges.push({
							start,
							end
						});
					});
				});
				return ok(ranges);
			} catch (cause) {
				return err({
					error: xmlFailure(cause),
					ranges,
					examined: Math.max(0, (reader?.position ?? 0) - 1)
				});
			}
		};
		StopXmlNodeCount = class extends Error {};
		countXmlNodes = (source, limit) => {
			let nodes = 0;
			const count = () => {
				nodes += 1;
				if (nodes > limit) throw new StopXmlNodeCount();
			};
			try {
				checkXmlSyntax(source, "allow", (syntax) => {
					syntax.on("error", (cause) => {
						throw notWellFormed(cause);
					});
					syntax.on("opentagstart", count);
					syntax.on("attribute", count);
					syntax.on("text", count);
					syntax.on("cdata", count);
					syntax.on("comment", count);
					syntax.on("processinginstruction", count);
				});
			} catch (cause) {
				if (!(cause instanceof StopXmlNodeCount) && !isXmlFailure(cause)) throw cause;
			}
			return nodes;
		};
		parseXmlDocument = (source, policy) => {
			try {
				checkXmlSyntax(source, policy.doctype, undefined, policy.nameSupported);
				return ok(new DOMParser({
					normalizeLineEndings: policy.lineEndings === "preserve" ? (text) => text : (text) => text.replace(XML_LINE_ENDING, "\n"),
					onError: onErrorStopParsing
				}).parseFromString(source, "application/xml"));
			} catch (cause) {
				return err(xmlFailure(cause));
			}
		};
		literalValue = (literal) => literal === "" ? null : literal.slice(1, -1);
		declaredDocumentType = (document) => {
			const doctype = document.doctype;
			if (doctype === null) return undefined;
			const publicId = literalValue(doctype.publicId);
			return {
				name: doctype.name,
				publicId: publicId === null ? null : publicId.replace(/[ \r\n]+/gu, " ").replace(/^ | $/gu, ""),
				systemId: literalValue(doctype.systemId)
			};
		};
	})))();
}

//#endregion
export { XML_ELEMENT_OPENING, XML_LINE_ENDING, countXmlNodes, declaredDocumentType, init_xmlDocument, isUnqualifiedXmlElement, isWellFormedXml, opensLikeXml, parseXmlDocument, xmlAttributeQuoteRanges, xmlElementRanges };