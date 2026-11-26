import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { defaultTreeAdapter, parse } from "parse5";

//#region dist/domain/javascript/htmlArtifactReferences.js
var HTML_INLINE_SCRIPT_LOCATION_LIMIT, JAVASCRIPT_MIME_TYPES, javaScriptType, asciiLowercase, scriptAttributes, htmlArtifactReferences, inlineScriptBody, sourcePoint;
function init_htmlArtifactReferences() {
	return (init_htmlArtifactReferences = __esmMin((() => {
		HTML_INLINE_SCRIPT_LOCATION_LIMIT = 100;
		JAVASCRIPT_MIME_TYPES = new Set([
			"application/ecmascript",
			"application/javascript",
			"application/x-ecmascript",
			"application/x-javascript",
			"text/ecmascript",
			"text/javascript",
			"text/javascript1.0",
			"text/javascript1.1",
			"text/javascript1.2",
			"text/javascript1.3",
			"text/javascript1.4",
			"text/javascript1.5",
			"text/jscript",
			"text/livescript",
			"text/x-ecmascript",
			"text/x-javascript"
		]);
		javaScriptType = (attrs) => {
			const type = attrs.find(({ name }) => name === "type");
			const language = attrs.find(({ name }) => name === "language");
			const typeString = type !== undefined ? type.value : language !== undefined && language.value !== "" ? `text/${language.value}` : "";
			if (typeString === "") return "classic";
			const mimeCandidate = type === undefined ? typeString : typeString.replace(/^[\t\n\f\r ]+|[\t\n\f\r ]+$/gu, "");
			if (JAVASCRIPT_MIME_TYPES.has(asciiLowercase(mimeCandidate))) return "classic";
			return asciiLowercase(typeString) === "module" ? "module" : null;
		};
		asciiLowercase = (value) => value.replace(/[A-Z]/gu, (letter) => letter.toLowerCase());
		scriptAttributes = (node) => {
			const html = node.namespaceURI === "http://www.w3.org/1999/xhtml";
			const source = html ? node.attrs.find(({ name }) => name === "src") : node.attrs.find(({ name, namespace }) => name === "href" && namespace === undefined) ?? node.attrs.find(({ name, namespace }) => name === "href" && namespace === "http://www.w3.org/1999/xlink");
			return {
				source,
				scriptType: javaScriptType(html ? node.attrs : node.attrs.filter(({ name, namespace }) => name === "type" && namespace === undefined))
			};
		};
		htmlArtifactReferences = (text) => {
			const pending = [parse(text, { sourceCodeLocationInfo: true })];
			const scripts = [];
			const inlineScripts = [];
			let inlineScriptCount = 0;
			let baseHref = null;
			while (pending.length > 0) {
				const node = pending.pop();
				if (node === undefined) continue;
				if (defaultTreeAdapter.isElementNode(node) && (node.namespaceURI === "http://www.w3.org/1999/xhtml" || node.namespaceURI === "http://www.w3.org/2000/svg")) {
					if (node.namespaceURI === "http://www.w3.org/1999/xhtml" && node.tagName === "base" && baseHref === null) {
						const href = node.attrs.find(({ name }) => name === "href");
						if (href !== undefined) baseHref = href.value;
					}
					if (node.tagName === "script") {
						const { scriptType, source: src } = scriptAttributes(node);
						const location = node.sourceCodeLocation?.startTag;
						if (src !== undefined && src.value !== "" && location !== undefined) {
							scripts.push({
								scriptPath: src.value,
								scriptType,
								location: {
									start: sourcePoint(location.startLine, location.startCol),
									end: sourcePoint(location.endLine, location.endCol)
								}
							});
						}
						const inline = src === undefined ? inlineScriptBody(node) : undefined;
						if (inline !== undefined && scriptType !== null) {
							inlineScriptCount += 1;
							if (inlineScripts.length < 100) inlineScripts.push({
								scriptType,
								...inline
							});
						}
					}
				}
				if ("childNodes" in node) {
					for (const child of node.childNodes.toReversed()) pending.push(child);
				}
			}
			return {
				baseHref,
				scripts,
				inlineScripts,
				inlineScriptCount
			};
		};
		inlineScriptBody = (node) => {
			const startTag = node.sourceCodeLocation?.startTag;
			if (startTag === undefined) return undefined;
			let blank = true;
			let text = "";
			let end;
			for (const child of node.childNodes) {
				if (!defaultTreeAdapter.isTextNode(child)) continue;
				if (blank && /\S/u.test(child.value)) blank = false;
				text += child.value;
				end = child.sourceCodeLocation ?? end;
			}
			if (blank || end == null) return undefined;
			return {
				location: {
					start: sourcePoint(startTag.endLine, startTag.endCol),
					end: sourcePoint(end.endLine, end.endCol)
				},
				text
			};
		};
		sourcePoint = (line, column) => ({
			line,
			column: column - 1
		});
	})))();
}

//#endregion
export { htmlArtifactReferences, init_htmlArtifactReferences };