import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { K as init_safeJson, S as BrowserObservationError, q as safeParseJson, w as init_browserObservationError } from "./analysisErrorProjection-B0_t_nHz.js";
import { i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { $t as init_analysisResourceLimits, Jt as MAX_NODE_TIMER_DELAY_MS, v as init_isRecord, y as isRecord } from "./jsonValue-BIEmjG1z.js";
import { _ as init_analysisErrorCore, a as AnalysisCapabilityUnavailableError, h as carriedReason, i as AnalysisCancelledError, m as cancelledBy } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_errorMessage, t as errorMessage } from "./errorMessage-rfGn5D1_.js";
import { n as urlDeclaresQueryOrFragment, t as init_urlComponents } from "./urlComponents-CGbK3-fc.js";
import { r as init_unicodeCodePointOrder, t as compareUnicodeCodePoints } from "./unicodeCodePointOrder-BezCbTpg.js";
import { a as init_providerCleanupError, i as ProviderCleanupError } from "./SignalAbort-CPFWtyzs.js";
import { Hn as AnalysisCleanupLeaseGroup, Un as init_AnalysisCleanupLease, Vn as AnalysisCleanupLease, Vr as analysisErrorWithCleanupFailure, Wr as init_analysisErrorCleanup, qr as withInheritedCleanupOwnership, t as init_resources } from "./resources-C5FMDwcC.js";
import { c as cdpCommandDeadlineRecovery, d as cdpDiscoveryTimeoutRecovery, f as init_browserDeadline, l as cdpCommandTimeoutIsSelectable, n as CDP_DISCOVERY_RESPONSE_TIMEOUT_MS, p as noRuntimeOverrideSentence, r as DEFAULT_CDP_COMMAND_TIMEOUT_MS, s as cdpCleanupGraceExpired, u as cdpCommandTimeoutUnrelatedControl } from "./browserDeadline-CtCyBFlP.js";
import { S as observeBrowserUrl, T as sanitizeBrowserUrl, _ as init_browserObservation, a as init_cdpObservationSchemas, h as browserResponseStatusSchema, n as cdpResourceColumnSchema, o as createWebTextArtifact, s as init_webContentArtifact } from "./cdpObservationSchemas-BCeuGdtt.js";
import { i as mediaTypeEssence, t as init_recordedMediaType } from "./recordedMediaType-CDteDKWr.js";
import { n as init_webRuntime, t as WEB_RUNTIME_LIMITS } from "./webRuntime-CkS0qD76.js";
import { z } from "zod";
import { isUtf8 } from "node:buffer";
import { request } from "node:http";
import WebSocket from "ws";

//#region dist/browser/CdpCaptureValues.js
var recordValue, admitRecords, recordsValue, cdpStringValue, numberValue, resourceContentSize, isHttpUrl, allowedSanitizedUrl, sourceResult, sourceExcluded, delayWithCancellation;
function init_CdpCaptureValues() {
	return (init_CdpCaptureValues = __esmMin((() => {
		init_analysisResourceLimits();
		init_analysisErrorCore();
		init_browserObservation();
		init_webContentArtifact();
		init_result();
		recordValue = (value) => isRecord(value) ? value : undefined;
		admitRecords = (value) => Array.isArray(value) ? value : undefined;
		recordsValue = (value) => Array.isArray(value) ? value.flatMap((item) => {
			const record = recordValue(item);
			return record === undefined ? [] : [record];
		}) : [];
		cdpStringValue = (value) => typeof value === "string" ? value : undefined;
		numberValue = (value) => typeof value === "number" && Number.isFinite(value) ? value : undefined;
		resourceContentSize = (value) => {
			if (value === undefined) return ok(null);
			const size = numberValue(value);
			return size !== undefined && size >= 0 ? ok(size) : err({ _tag: "InvalidCdpResourceSize" });
		};
		isHttpUrl = (value) => {
			if (value === undefined) return false;
			try {
				const protocol = new URL(value).protocol;
				return protocol === "http:" || protocol === "https:";
			} catch (cause) {
				void cause;
				return false;
			}
		};
		allowedSanitizedUrl = (value, allowedOrigins) => {
			const text = cdpStringValue(value);
			if (text === undefined) return undefined;
			const sanitized = sanitizeBrowserUrl(text);
			return sanitized.origin !== null && allowedOrigins.has(sanitized.origin) ? sanitized : undefined;
		};
		sourceResult = (source) => ({
			included: true,
			artifact: createWebTextArtifact(source, "text/javascript")
		});
		sourceExcluded = (reason) => ({
			included: false,
			reason
		});
		delayWithCancellation = async (durationMs, operation, signal) => {
			let remaining = durationMs;
			while (remaining > 0) {
				if (signal?.aborted === true) throw cancelledBy(operation, signal);
				const delay = Math.min(remaining, MAX_NODE_TIMER_DELAY_MS);
				await new Promise((resolve, reject) => {
					const timer = setTimeout(() => {
						signal?.removeEventListener("abort", onAbort);
						resolve();
					}, delay);
					const onAbort = () => {
						clearTimeout(timer);
						signal?.removeEventListener("abort", onAbort);
						reject(cancelledBy(operation, carriedReason(signal?.reason)));
					};
					signal?.addEventListener("abort", onAbort, { once: true });
					if (signal?.aborted === true) onAbort();
				});
				remaining -= delay;
			}
		};
	})))();
}

//#endregion
//#region dist/browser/CdpSnapshotStrings.js
var CDP_EMPTY_STRING_INDEX, cdpSnapshotString, cdpSnapshotValueString;
function init_CdpSnapshotStrings() {
	return (init_CdpSnapshotStrings = __esmMin((() => {
		init_CdpCaptureValues();
		CDP_EMPTY_STRING_INDEX = -1;
		cdpSnapshotString = (strings, index) => {
			const integer = numberValue(index);
			if (integer === undefined || !Number.isSafeInteger(integer) || integer < 0) return undefined;
			return strings[integer];
		};
		cdpSnapshotValueString = (strings, index) => numberValue(index) === CDP_EMPTY_STRING_INDEX ? "" : cdpSnapshotString(strings, index);
	})))();
}

//#endregion
//#region dist/browser/CdpSnapshotNodes.js
var integer$2, attributes, invalidateParentCycles, snapshotDocumentNodes, snapshotNodeAt;
function init_CdpSnapshotNodes() {
	return (init_CdpSnapshotNodes = __esmMin((() => {
		init_result();
		init_CdpCaptureValues();
		init_CdpSnapshotStrings();
		integer$2 = (value) => {
			const parsed = numberValue(value);
			return parsed !== undefined && Number.isSafeInteger(parsed) ? parsed : undefined;
		};
		attributes = (value, strings) => {
			if (!Array.isArray(value) || value.length % 2 !== 0) return undefined;
			const pairs = [];
			for (let offset = 0; offset < value.length; offset += 2) {
				const name = cdpSnapshotString(strings, value[offset]);
				const text = cdpSnapshotValueString(strings, value[offset + 1]);
				if (name === undefined || text === undefined) return undefined;
				pairs.push([name, text]);
			}
			return pairs;
		};
		invalidateParentCycles = (parents) => {
			const state = new Uint8Array(parents.length);
			const path = [];
			for (let start = 0; start < parents.length; start += 1) {
				if (state[start] !== 0) continue;
				path.length = 0;
				let cursor = start;
				while (cursor >= 0 && state[cursor] === 0) {
					state[cursor] = 1;
					path.push(cursor);
					cursor = parents[cursor] ?? -1;
				}
				if (cursor >= 0 && state[cursor] === 1) for (let index = path.indexOf(cursor); index < path.length; index += 1) parents[path[index]] = undefined;
				for (const index of path) state[index] = 2;
			}
		};
		snapshotDocumentNodes = (value, strings) => {
			const raw = recordValue(value);
			if (raw === undefined || !Array.isArray(raw.nodeType) || !Array.isArray(raw.nodeName) || !Array.isArray(raw.nodeValue) || !Array.isArray(raw.parentIndex) || !Array.isArray(raw.attributes)) return undefined;
			const count = raw.nodeType.length;
			if (raw.nodeName.length !== count || raw.nodeValue.length !== count || raw.parentIndex.length !== count) return undefined;
			const parents = raw.parentIndex.map((value, index) => {
				const parent = integer$2(value);
				return parent !== undefined && parent >= -1 && parent < count && parent !== index ? parent : undefined;
			});
			invalidateParentCycles(parents);
			const backend = Array.isArray(raw.backendNodeId) ? raw.backendNodeId : [];
			return {
				nodeTypes: raw.nodeType.map((value) => {
					const type = integer$2(value);
					return type !== undefined && type >= 0 ? type : undefined;
				}),
				nodeNames: raw.nodeName.map((value) => cdpSnapshotString(strings, value)),
				nodeValues: raw.nodeValue.map((value) => cdpSnapshotValueString(strings, value)),
				parents,
				attributes: raw.attributes.slice(0, count).map((value) => attributes(value, strings)),
				backendNodeIds: backend.slice(0, count).map((value) => {
					const id = integer$2(value);
					return id !== undefined && id > 0 ? id : undefined;
				}),
				excessAttributes: Math.max(0, raw.attributes.length - count)
			};
		};
		snapshotNodeAt = (nodes, index) => {
			const nodeType = nodes.nodeTypes[index];
			const nodeName = nodes.nodeNames[index];
			const nodeValue = nodes.nodeValues[index];
			const parent = nodes.parents[index];
			const attributes = nodes.attributes[index];
			return nodeType === undefined || nodeName === undefined || nodeValue === undefined || parent === undefined || attributes === undefined ? err({
				_tag: "InvalidCdpSnapshotNode",
				index
			}) : ok({
				nodeType,
				nodeName,
				nodeValue,
				parent,
				attributes
			});
		};
	})))();
}

//#endregion
//#region dist/browser/CdpCaptureEventHelpers.js
var malformedCallFrame, topCallFrame, initiatorLocation, exclusionReasonForUrl, cdpSourceCoordinates, isJsonContentType, isJsonMediaType, consolePrimitive;
function init_CdpCaptureEventHelpers() {
	return (init_CdpCaptureEventHelpers = __esmMin((() => {
		init_result();
		init_recordedMediaType();
		init_cdpObservationSchemas();
		init_CdpCaptureValues();
		malformedCallFrame = { _tag: "MalformedCdpCallFrame" };
		topCallFrame = (value) => {
			if (value === undefined) return ok(undefined);
			const stack = recordValue(value);
			if (stack === undefined) return err(malformedCallFrame);
			const frames = admitRecords(stack.callFrames);
			if (frames === undefined) return err(malformedCallFrame);
			if (frames.length === 0) return ok(undefined);
			const frame = recordValue(frames[0]);
			return frame === undefined ? err(malformedCallFrame) : ok(frame);
		};
		initiatorLocation = (initiator) => {
			let stack = initiator?.stack;
			for (let depth = 0; depth < 32 && stack !== undefined; depth += 1) {
				const frame = topCallFrame(stack);
				if (!frame.ok || frame.value !== undefined) return frame;
				stack = recordValue(stack)?.parent;
			}
			return ok(cdpStringValue(initiator?.url) === undefined ? undefined : initiator);
		};
		exclusionReasonForUrl = (value) => value === undefined || value === "" ? "unattributed_origin" : isHttpUrl(value) ? "disallowed_origin" : "unsupported_url";
		cdpSourceCoordinates = (frame) => {
			const validLine = (value) => typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
			const line = frame?.lineNumber;
			const column = cdpResourceColumnSchema.safeParse(frame?.columnNumber);
			return {
				line: validLine(line) ? line : null,
				column: column.success ? column.data : null,
				invalid: line !== undefined && !validLine(line) || frame?.columnNumber !== undefined && !column.success
			};
		};
		isJsonContentType = (headers) => {
			if (headers === undefined) return false;
			for (const [name, value] of Object.entries(headers)) if (name.toLowerCase() === "content-type" && isJsonMediaType(cdpStringValue(value))) return true;
			return false;
		};
		isJsonMediaType = (value) => {
			const mediaType = value === null || value === undefined ? null : mediaTypeEssence(value);
			return mediaType === "application/json" || mediaType?.endsWith("+json") === true;
		};
		consolePrimitive = (value) => {
			const type = cdpStringValue(value.type);
			switch (type) {
				case "string": return typeof value.value === "string" ? {
					type,
					text: value.value
				} : undefined;
				case "boolean": return typeof value.value === "boolean" ? {
					type,
					text: String(value.value)
				} : undefined;
				case "number": return typeof value.value === "number" ? {
					type,
					text: String(value.value)
				} : typeof value.unserializableValue === "string" ? {
					type,
					text: value.unserializableValue
				} : undefined;
				case "bigint": return typeof value.unserializableValue === "string" ? {
					type,
					text: value.unserializableValue
				} : undefined;
				case "undefined": return {
					type,
					text: "undefined"
				};
				case "object": return cdpStringValue(value.subtype) === "null" ? {
					type,
					text: "null"
				} : undefined;
				default: return undefined;
			}
		};
	})))();
}

//#endregion
//#region dist/browser/CdpCaptureDomNamespaces.js
var SVG_NAMESPACE, XLINK_NAMESPACE, XHTML_NAMESPACE, capturedSvgNodeKind, xmlDocument, createDocumentNamespaceAncestry, domXmlElement, resolveXmlElements, applyDeclarations, xmlnsPrefix, elementExpandedName, xlinkHrefValue, svgSourceNode;
function init_CdpCaptureDomNamespaces() {
	return (init_CdpCaptureDomNamespaces = __esmMin((() => {
		SVG_NAMESPACE = "http://www.w3.org/2000/svg";
		XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
		XHTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
		capturedSvgNodeKind = (query, { node }) => node.backendNodeId !== query.backendNodeId || node.nodeName !== query.nodeName || node.nodeType !== 1 ? undefined : node.isSVG ?? false;
		xmlDocument = (nodes) => {
			const documentIndex = nodes.nodeTypes.findIndex((nodeType) => nodeType === 9);
			if (documentIndex < 0) return false;
			if (svgSourceNode(nodes, documentIndex) === undefined || nodes.parents[documentIndex] !== -1) return undefined;
			for (let index = 0; index < nodes.nodeTypes.length; index += 1) {
				if (nodes.nodeTypes[index] !== 1) continue;
				if (nodes.parents[index] !== documentIndex) continue;
				const source = svgSourceNode(nodes, index);
				if (source === undefined) return undefined;
				const name = source.nodeName;
				if (name === "HTML") return false;
				if (name === "html" || name.includes(":")) return true;
				const attributes = source.attributes;
				for (const [attributeName] of attributes) if (xmlnsPrefix(attributeName) !== undefined) return true;
				return false;
			}
			return false;
		};
		createDocumentNamespaceAncestry = (nodes) => {
			const xml = xmlDocument(nodes);
			return {
				xml,
				xmlElements: xml === true ? resolveXmlElements(nodes) : new Map()
			};
		};
		domXmlElement = (ancestry, index) => {
			if (ancestry.xml === false) {
				return {
					svgElement: false,
					xmlDocument: false,
					elementNamespace: undefined,
					localName: undefined,
					xlinkHref: undefined
				};
			}
			if (ancestry.xml === undefined) {
				return {
					svgElement: false,
					xmlDocument: undefined,
					elementNamespace: undefined,
					localName: undefined,
					xlinkHref: undefined
				};
			}
			const resolved = ancestry.xmlElements.get(index);
			if (resolved === undefined) {
				return {
					svgElement: false,
					xmlDocument: undefined,
					elementNamespace: undefined,
					localName: undefined,
					xlinkHref: undefined
				};
			}
			return {
				svgElement: resolved.svgElement,
				xmlDocument: true,
				elementNamespace: resolved.elementNamespace,
				localName: resolved.localName,
				xlinkHref: resolved.xlinkHref
			};
		};
		resolveXmlElements = (nodes) => {
			const children = new Map();
			const pending = [];
			for (let node = 0; node < nodes.nodeNames.length; node += 1) {
				const parent = nodes.parents[node];
				if (parent === undefined) continue;
				if (parent < 0) pending.push({ node });
				else {
					const siblings = children.get(parent);
					if (siblings === undefined) children.set(parent, [node]);
					else siblings.push(node);
				}
			}
			const bindings = new Map();
			const resolved = new Map();
			while (pending.length > 0) {
				const step = pending.pop();
				if (step === undefined) break;
				if ("restore" in step) {
					for (const { prefix, previous } of step.restore) {
						if (previous === undefined) bindings.delete(prefix);
						else bindings.set(prefix, previous);
					}
					continue;
				}
				const { node } = step;
				const source = svgSourceNode(nodes, node);
				if (source === undefined) continue;
				const attributes = source.attributes;
				const restore = applyDeclarations(bindings, attributes);
				const expandedName = elementExpandedName(source.nodeName, bindings);
				const svgElement = source.nodeType === 1 && expandedName?.namespace === SVG_NAMESPACE;
				resolved.set(node, {
					svgElement,
					elementNamespace: expandedName?.namespace,
					localName: expandedName?.localName,
					xlinkHref: svgElement ? xlinkHrefValue(attributes, bindings) : undefined
				});
				pending.push({ restore });
				for (const child of children.get(node) ?? []) pending.push({ node: child });
			}
			return resolved;
		};
		applyDeclarations = (bindings, attributes) => {
			const restore = [];
			const seen = new Set();
			for (const [name, value] of attributes) {
				const prefix = xmlnsPrefix(name);
				if (prefix === undefined || seen.has(prefix)) continue;
				seen.add(prefix);
				restore.push({
					prefix,
					previous: bindings.get(prefix)
				});
				if (value.length === 0) bindings.delete(prefix);
				else bindings.set(prefix, value);
			}
			return restore;
		};
		xmlnsPrefix = (name) => {
			if (name === undefined) return undefined;
			if (name === "xmlns") return "";
			if (!name.startsWith("xmlns:")) return undefined;
			const prefix = name.slice("xmlns:".length);
			if (prefix.length === 0 || prefix === "xmlns" || prefix.includes(":")) return undefined;
			return prefix;
		};
		elementExpandedName = (nodeName, bindings) => {
			if (nodeName === undefined) return undefined;
			const colon = nodeName.indexOf(":");
			if (colon < 0) return {
				namespace: bindings.get("") ?? "",
				localName: nodeName
			};
			const prefix = nodeName.slice(0, colon);
			const local = nodeName.slice(colon + 1);
			if (prefix.length === 0 || local.length === 0 || local.includes(":") || prefix === "xmlns") return undefined;
			const namespace = bindings.get(prefix);
			return namespace === undefined ? undefined : {
				namespace,
				localName: local
			};
		};
		xlinkHrefValue = (attributes, bindings) => {
			const seen = new Set();
			for (const [name, value] of attributes) {
				if (seen.has(name)) continue;
				seen.add(name);
				const colon = name.indexOf(":");
				if (colon <= 0) continue;
				const prefix = name.slice(0, colon);
				const local = name.slice(colon + 1);
				if (local !== "href" || bindings.get(prefix) !== XLINK_NAMESPACE) continue;
				return value;
			}
			return undefined;
		};
		svgSourceNode = (nodes, index) => {
			const nodeType = nodes.nodeTypes[index];
			const nodeName = nodes.nodeNames[index];
			const attributes = nodes.attributes[index];
			return nodeType === undefined || nodeName === undefined || attributes === undefined ? undefined : {
				nodeType,
				nodeName,
				attributes
			};
		};
	})))();
}

//#endregion
//#region dist/browser/CdpCaptureDocuments.js
/** Project one snapshot, requesting bounded batches of SVG identity facts. */
function* captureDom(root, allowedOrigins, input, completeness) {
	const strings = root.strings.map(cdpStringValue);
	const nodes = [];
	const urls = [];
	const agentHints = [];
	let excludedUrls = 0;
	let total = 0;
	let unresolvedSvgNodes = 0;
	for (const document of snapshotDocuments(root.documents, (count) => excludeDocumentEvidence(completeness, "invalid_protocol_value", count))) {
		const documentUrl = cdpSnapshotString(strings, document.documentURL);
		if (documentUrl === undefined) {
			excludeDocumentEvidence(completeness, "invalid_protocol_value");
			continue;
		}
		if (allowedSanitizedUrl(documentUrl, allowedOrigins) === undefined) {
			excludeDocumentEvidence(completeness, exclusionReasonForUrl(documentUrl));
			continue;
		}
		const baseUrlValue = document.baseURL === undefined ? documentUrl : cdpSnapshotValueString(strings, document.baseURL);
		if (baseUrlValue === undefined) {
			excludeDocumentEvidence(completeness, "invalid_protocol_value");
			continue;
		}
		const baseUrl = baseUrlValue || documentUrl;
		const documentNodes = snapshotDocumentNodes(document.nodes, strings);
		if (documentNodes === undefined) {
			excludeDocumentEvidence(completeness, "invalid_protocol_value");
			continue;
		}
		const { nodeTypes, backendNodeIds } = documentNodes;
		if (documentNodes.excessAttributes > 0) excludeDocumentEvidence(completeness, "invalid_protocol_value", documentNodes.excessAttributes);
		const baseIndex = total;
		total += nodeTypes.length;
		const ancestry = createDocumentNamespaceAncestry(documentNodes);
		const pendingMetadata = [];
		for (let index = 0; index < nodeTypes.length; index += 1) {
			const admitted = snapshotNodeAt(documentNodes, index);
			if (!admitted.ok) {
				excludeDocumentEvidence(completeness, "invalid_protocol_value");
				continue;
			}
			const { nodeType, nodeName, nodeValue, parent, attributes } = admitted.value;
			const nodeIndex = baseIndex + index;
			const attributeNames = [...new Set(attributes.map(([name]) => name))];
			const domElement = domXmlElement(ancestry, index);
			const htmlTagName = domHtmlTagName(nodeName, domElement);
			if (domElement.xmlDocument === undefined) completeness?.exclude("metadata", "invalid_protocol_value");
			let svgQuery;
			if (domElement.xmlDocument === false && nodeType === 1 && attributeNames.includes("xlink:href") && !attributeNames.includes("href")) {
				const backendNodeId = backendNodeIds[index];
				svgQuery = backendNodeId !== undefined ? {
					backendNodeId,
					nodeName
				} : null;
			}
			nodes.push({
				index: nodeIndex,
				parent_index: parent < 0 ? -1 : baseIndex + parent,
				node_type: nodeType,
				node_name: nodeName,
				node_value_length: nodeValue.length,
				attribute_names: attributeNames
			});
			pendingMetadata.push({
				svgQuery,
				options: {
					attributes,
					baseUrl: htmlTagName === "base" ? documentUrl : baseUrl,
					documentUrl,
					nodeIndex,
					htmlTagName,
					allowedOrigins,
					...domElement
				}
			});
			if (pendingMetadata.length === DOM_METADATA_BATCH_SIZE || index === nodeTypes.length - 1) {
				const metadata = yield* captureDomMetadata(pendingMetadata, completeness);
				urls.push(...metadata.urls);
				agentHints.push(...metadata.agentHints);
				excludedUrls += metadata.excludedUrls;
				unresolvedSvgNodes += metadata.unresolvedSvgNodes;
				pendingMetadata.length = 0;
			}
		}
		if (pendingMetadata.length > 0) {
			const metadata = yield* captureDomMetadata(pendingMetadata, completeness);
			urls.push(...metadata.urls);
			agentHints.push(...metadata.agentHints);
			excludedUrls += metadata.excludedUrls;
			unresolvedSvgNodes += metadata.unresolvedSvgNodes;
			pendingMetadata.length = 0;
		}
	}
	return {
		total,
		nodeValueLengthUnit: "utf16-code-units",
		nodes,
		urls,
		agentHints,
		excludedUrls,
		unresolvedSvgNodes
	};
}
function* captureDomMetadata(pending, completeness) {
	const queries = pending.flatMap(({ svgQuery }) => svgQuery == null ? [] : [svgQuery]);
	const kinds = queries.length > 0 ? yield queries : [];
	const urls = [];
	const agentHints = [];
	let queryIndex = 0;
	let unresolvedSvgNodes = 0;
	let excludedUrls = 0;
	for (const { options, svgQuery } of pending) {
		let svgElement = options.svgElement;
		if (svgQuery !== undefined) {
			const kind = svgQuery === null ? undefined : kinds[queryIndex++];
			svgElement = kind === true;
			if (kind === undefined) {
				unresolvedSvgNodes += 1;
				completeness?.exclude("metadata", "provider_unavailable");
			}
		}
		const metadata = domMetadata({
			...options,
			svgElement
		});
		for (const url of metadata.urls) {
			urls.push(url);
			if (url.destination_scope !== "approved") {
				excludedUrls += 1;
				completeness?.exclude("metadata", url.destination_scope === "outside_policy" ? "disallowed_origin" : "unsupported_url");
			}
		}
		agentHints.push(...metadata.agentHints);
	}
	return {
		urls,
		agentHints,
		unresolvedSvgNodes,
		excludedUrls
	};
}
var captureFrames, observeCdpFrameUrl, classifyCdpFrameUrl, captureResources, emptyDomCapture, DOM_METADATA_BATCH_SIZE, excludeDocumentEvidence, snapshotDocuments, captureAccessibility, ACCESSIBILITY_STATE_NAMES, accessibilityStates, axText, domHtmlTagName, hrefAttributeValue, domMetadata, domDestination, domUrlAttributes, agentRelValues;
function init_CdpCaptureDocuments() {
	return (init_CdpCaptureDocuments = __esmMin((() => {
		init_browserObservation();
		init_CdpCaptureValues();
		init_CdpSnapshotStrings();
		init_CdpSnapshotNodes();
		init_CdpCaptureEventHelpers();
		init_CdpCaptureDomNamespaces();
		init_unicodeCodePointOrder();
		captureFrames = (tree, allowedOrigins, maximum, completeness) => {
			if (tree.omittedFrames) completeness?.exclude("frames", "invalid_protocol_value", null);
			const items = [];
			let rootFrame;
			for (const node of tree.frames) {
				const identity = node.facts;
				const frameId = identity.frameId;
				const observation = node.url;
				const scopeUrl = observation.kind === "missing" ? undefined : observation.scopeUrl;
				const facts = classifyCdpFrameUrl(observation, allowedOrigins);
				if (frameId === null) {
					completeness?.exclude("frames", "invalid_protocol_value");
					continue;
				}
				if (observation.kind === "invalid_fragment") {
					completeness?.exclude("frames", "invalid_protocol_value");
					if (facts.scope !== "approved") completeness?.exclude("frames", exclusionReasonForUrl(scopeUrl));
					continue;
				}
				if (facts.url === undefined || facts.origin === null) {
					completeness?.exclude("frames", exclusionReasonForUrl(scopeUrl));
					continue;
				}
				if (maximum !== undefined && items.length >= maximum) continue;
				const isRoot = node === tree.root;
				if (identity.parentIssue !== null || !isRoot && identity.parentRelation === "root") completeness?.exclude("frames", "invalid_protocol_value");
				const captured = {
					frame_id: frameId,
					parent_frame_id: identity.parentId,
					url: facts.url,
					origin: facts.origin
				};
				items.push(captured);
				if (isRoot && identity.parentRelation === "root") rootFrame = captured;
			}
			return {
				items,
				root: rootFrame
			};
		};
		observeCdpFrameUrl = (frame) => {
			const url = cdpStringValue(frame?.url);
			if (url === undefined) return { kind: "missing" };
			if (frame?.urlFragment === undefined) return {
				kind: "observed",
				url,
				scopeUrl: url
			};
			const fragment = cdpStringValue(frame.urlFragment);
			if (fragment === undefined || fragment !== "" && !fragment.startsWith("#")) return {
				kind: "invalid_fragment",
				scopeUrl: url
			};
			return {
				kind: "observed",
				url: `${url.split("#", 1)[0] ?? ""}${fragment}`,
				scopeUrl: url
			};
		};
		classifyCdpFrameUrl = (observation, allowedOrigins) => {
			if (observation.kind === "missing") return {
				scope: "unknown",
				origin: null,
				url: undefined
			};
			const base = sanitizeBrowserUrl(observation.scopeUrl);
			const scope = base.origin === null ? "unsupported" : allowedOrigins.has(base.origin) ? "approved" : "outside_policy";
			return {
				scope,
				origin: base.origin,
				url: observation.kind === "observed" && scope === "approved" ? sanitizeBrowserUrl(observation.url).url : undefined
			};
		};
		captureResources = (tree, allowedOrigins, completeness) => {
			if (tree.omittedResources) completeness?.exclude("resources", "invalid_protocol_value", null);
			if (tree.malformedResources > 0) completeness?.exclude("resources", "invalid_protocol_value", tree.malformedResources);
			const items = [];
			for (const resource of tree.resources) {
				const url = allowedSanitizedUrl(resource.url, allowedOrigins);
				if (url === undefined || url.origin === null) {
					completeness?.exclude("resources", exclusionReasonForUrl(resource.url));
					continue;
				}
				const { type, mimeType, contentSize } = resource;
				if (type === undefined || type.length === 0 || mimeType === undefined) {
					completeness?.exclude("resources", "invalid_protocol_value");
					continue;
				}
				if (!contentSize.ok) completeness?.exclude("resources", "invalid_protocol_value");
				items.push({
					rawUrl: resource.url ?? "",
					url: url.url,
					origin: url.origin,
					type,
					mime_type: mimeType,
					content_size: contentSize.ok ? contentSize.value : null
				});
			}
			return { items };
		};
		emptyDomCapture = {
			total: 0,
			nodeValueLengthUnit: "utf16-code-units",
			nodes: [],
			urls: [],
			agentHints: [],
			excludedUrls: 0,
			unresolvedSvgNodes: 0
		};
		DOM_METADATA_BATCH_SIZE = 8;
		excludeDocumentEvidence = (completeness, reason, count = 1) => {
			completeness?.exclude("dom", reason, count);
			completeness?.exclude("metadata", reason, count);
		};
		snapshotDocuments = (values, onInvalid) => values.flatMap((item) => {
			const document = recordValue(item);
			if (document === undefined) onInvalid(1);
			return document === undefined ? [] : [document];
		});
		captureAccessibility = (results, options) => {
			const all = results.flatMap(({ nodes: inventory }) => {
				const nodes = [];
				let malformedCount = 0;
				for (const entry of inventory) {
					const node = recordValue(entry);
					const nodeId = cdpStringValue(node?.nodeId);
					if (node === undefined || nodeId === undefined || nodeId.length === 0 || typeof node.ignored !== "boolean") {
						malformedCount += 1;
						continue;
					}
					const parentId = cdpStringValue(node.parentId);
					if (node.parentId !== undefined && (parentId === undefined || parentId.length === 0)) malformedCount += 1;
					const childIds = Array.isArray(node.childIds) ? node.childIds.filter((childId) => typeof childId === "string" && childId.length > 0) : [];
					if (node.childIds !== undefined && (!Array.isArray(node.childIds) || childIds.length !== node.childIds.length)) malformedCount += 1;
					nodes.push({
						nodeId,
						parentId: parentId === undefined || parentId.length === 0 ? null : parentId,
						childIds,
						ignored: node.ignored,
						role: node.role,
						name: node.name,
						description: node.description,
						properties: node.properties
					});
				}
				if (malformedCount > 0) options.completeness?.exclude("accessibility", "invalid_protocol_value", malformedCount);
				return nodes;
			});
			const nodeIds = new Set(all.map((node) => node.nodeId));
			let excludedFields = 0;
			const nodes = all.map((node) => {
				const captureText = (value) => {
					const raw = cdpStringValue(recordValue(value)?.value);
					if (raw === undefined) return null;
					if (!options.includeText) {
						excludedFields += 1;
						return null;
					}
					return raw;
				};
				return {
					node_id: node.nodeId,
					parent_id: node.parentId,
					role: axText(node.role),
					name: captureText(node.name),
					description: captureText(node.description),
					ignored: node.ignored,
					states: accessibilityStates(node.properties)
				};
			});
			return {
				total: all.length,
				nodes,
				hasUnobservedChildren: all.some((node) => node.childIds.some((childId) => !nodeIds.has(childId))),
				textCapture: {
					status: options.unavailable ? "unavailable" : !options.includeText ? "not_approved" : "included",
					retained_bytes: nodes.reduce((total, node) => total + Buffer.byteLength(node.name ?? "") + Buffer.byteLength(node.description ?? ""), 0),
					excluded_fields: excludedFields
				}
			};
		};
		ACCESSIBILITY_STATE_NAMES = new Set([
			"atomic",
			"autocomplete",
			"busy",
			"checked",
			"disabled",
			"editable",
			"expanded",
			"focusable",
			"focused",
			"hasPopup",
			"hidden",
			"invalid",
			"level",
			"live",
			"modal",
			"multiline",
			"multiselectable",
			"orientation",
			"pressed",
			"readonly",
			"required",
			"selected",
			"valuemax",
			"valuemin"
		]);
		accessibilityStates = (value) => {
			const states = new Map();
			for (const property of recordsValue(value)) {
				const name = cdpStringValue(property.name);
				if (name === undefined || !ACCESSIBILITY_STATE_NAMES.has(name)) continue;
				const raw = recordValue(property.value)?.value;
				const state = typeof raw === "boolean" ? raw : typeof raw === "number" ? numberValue(raw) : typeof raw === "string" ? raw : undefined;
				if (state !== undefined) states.set(name, state);
			}
			return [...states].sort(([left], [right]) => compareUnicodeCodePoints(left, right)).map(([name, state]) => ({
				name,
				value: state
			}));
		};
		axText = (value) => cdpStringValue(recordValue(value)?.value) ?? null;
		domHtmlTagName = (nodeName, element) => element.xmlDocument === false ? nodeName.toLowerCase() : element.xmlDocument === true && element.elementNamespace === "http://www.w3.org/1999/xhtml" ? element.localName ?? "" : "";
		hrefAttributeValue = (pairs, attribute, options) => {
			const declared = pairs.get(attribute);
			if (declared !== undefined) return declared;
			if (attribute !== "href" || !options.svgElement) return undefined;
			return options.xmlDocument ? options.xlinkHref : pairs.get("xlink:href");
		};
		domMetadata = (options) => {
			const { attributes, baseUrl, documentUrl, nodeIndex, htmlTagName, allowedOrigins } = options;
			const pairs = new Map();
			for (const [name, value] of attributes) {
				if (!pairs.has(name)) pairs.set(name, value);
			}
			const tagName = htmlTagName;
			const urls = [];
			for (const attribute of domUrlAttributes) {
				const value = hrefAttributeValue(pairs, attribute, options);
				if (value === undefined) continue;
				const usesDocumentUrl = tagName === "form" && attribute === "action" && /^[\t\n\f\r ]*$/u.test(value) || (tagName === "button" || tagName === "input") && attribute === "formaction" && value === "";
				const destination = domDestination(usesDocumentUrl ? documentUrl : value, baseUrl, allowedOrigins);
				urls.push({
					node_index: nodeIndex,
					attribute,
					url: destination.url,
					destination_scope: destination.scope
				});
			}
			const rel = [...new Set((pairs.get("rel") ?? "").toLowerCase().split(/[\t\n\f\r ]+/u).filter((value) => agentRelValues.includes(value)))];
			const href = urls.find(({ attribute }) => attribute === "href")?.url ?? null;
			const agentHints = tagName === "link" && rel.length > 0 ? rel.map((declaration) => ({
				mechanism: "dom_link_rel",
				declaration,
				url: href,
				trust: "page-declared-untrusted"
			})) : [];
			return {
				urls,
				agentHints
			};
		};
		domDestination = (value, baseUrl, allowedOrigins) => {
			try {
				const parsed = new URL(value, baseUrl);
				if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return {
					url: null,
					scope: "unsupported"
				};
				if (!allowedOrigins.has(parsed.origin)) return {
					url: null,
					scope: "outside_policy"
				};
				return {
					url: allowedSanitizedUrl(parsed.href, allowedOrigins)?.url ?? null,
					scope: "approved"
				};
			} catch (cause) {
				void cause;
				return {
					url: null,
					scope: "unsupported"
				};
			}
		};
		domUrlAttributes = [
			"href",
			"src",
			"action",
			"formaction",
			"poster"
		];
		agentRelValues = [
			"mcp",
			"model-context",
			"ai-plugin",
			"service-desc"
		];
	})))();
}

//#endregion
//#region dist/browser/CdpFrameIdentity.js
var nonEmptyString, identityIssueFor, noParent, requiredChildParentFacts, frameParentFacts, selectCdpFrameIdentity, loaderFacts, cdpFrameRecordFacts, cdpFrameEventPayloadFacts;
function init_CdpFrameIdentity() {
	return (init_CdpFrameIdentity = __esmMin((() => {
		init_CdpCaptureValues();
		nonEmptyString = (value) => typeof value === "string" && value.length > 0 ? value : undefined;
		identityIssueFor = (navigated, frame, rawId) => {
			if (navigated && frame === undefined) return "missing_frame";
			if (rawId === undefined) return "missing_id";
			return nonEmptyString(rawId) === undefined ? "invalid_id" : null;
		};
		noParent = {
			parentRelation: "not_applicable",
			parentId: null,
			parentIssue: null
		};
		requiredChildParentFacts = (frameId, rawParent) => {
			const parentId = nonEmptyString(rawParent);
			return parentId === undefined || parentId === frameId ? {
				parentRelation: "unknown",
				parentId: null,
				parentIssue: parentId === undefined ? "invalid_parent_id" : "self_parent"
			} : {
				parentRelation: "child",
				parentId,
				parentIssue: null
			};
		};
		frameParentFacts = (frame) => {
			if (frame === undefined) return {
				parentRelation: "unknown",
				parentId: null,
				parentIssue: null
			};
			if (!("parentId" in frame)) return {
				parentRelation: "root",
				parentId: null,
				parentIssue: null
			};
			return requiredChildParentFacts(nonEmptyString(frame.id) ?? null, frame.parentId);
		};
		selectCdpFrameIdentity = (facts, mainFrameId) => {
			if (facts.kind !== "navigated" && facts.kind !== "requested" && facts.kind !== "within_document") return {
				applicability: "not_applicable",
				selection: "unknown",
				isRootReplacement: false,
				frameId: null,
				identityIssue: null,
				parentRelation: "not_applicable",
				parentId: null,
				parentIssue: null
			};
			const { frameId, identityIssue, parentRelation, parentId, parentIssue } = facts;
			const identity = {
				frameId,
				identityIssue,
				parentRelation,
				parentId,
				parentIssue
			};
			const selection = identity.frameId === null ? "unknown" : identity.frameId === mainFrameId ? "main" : "other";
			return {
				applicability: "applicable",
				selection,
				isRootReplacement: selection === "other" && identity.parentRelation === "root",
				...identity,
				parentIssue: selection === "main" && (identity.parentRelation === "child" || identity.parentIssue === "self_parent") ? "main_frame_has_parent" : identity.parentIssue
			};
		};
		loaderFacts = (source) => ({
			loaderId: cdpStringValue(source?.loaderId),
			loaderIssue: source?.loaderId !== undefined && typeof source.loaderId !== "string" ? "invalid_loader_id" : null
		});
		cdpFrameRecordFacts = (source) => {
			const frameId = nonEmptyString(source?.id) ?? null;
			return {
				kind: "record",
				frameId,
				identityIssue: identityIssueFor(true, source, source?.id),
				...frameParentFacts(source),
				...loaderFacts(source)
			};
		};
		cdpFrameEventPayloadFacts = (kind, rawParams) => {
			const empty = {
				kind,
				frameId: null,
				identityIssue: null,
				parentRelation: "not_applicable",
				parentId: null,
				parentIssue: null,
				loaderId: undefined,
				loaderIssue: null
			};
			const params = recordValue(rawParams);
			if (params === undefined) return {
				...empty,
				identityIssue: rawParams === undefined ? "missing_params" : "invalid_params"
			};
			if (kind === "navigated") return {
				...cdpFrameRecordFacts(recordValue(params.frame)),
				kind
			};
			const frameId = nonEmptyString(params.frameId) ?? null;
			return {
				kind,
				frameId,
				identityIssue: identityIssueFor(false, undefined, params.frameId),
				...kind === "attached" ? requiredChildParentFacts(frameId, params.parentFrameId) : noParent,
				loaderId: undefined,
				loaderIssue: null
			};
		};
	})))();
}

//#endregion
//#region dist/browser/protocol/CdpFrameTree.js
var treeRecord, readChildren, walkTrees, cdpFrameTreeReplySchema, cdpResourceTreeReplySchema, reportedFrameUrl, observedFrameUrl;
function init_CdpFrameTree() {
	return (init_CdpFrameTree = __esmMin((() => {
		init_CdpCaptureDocuments();
		init_CdpCaptureValues();
		init_CdpFrameIdentity();
		treeRecord = z.custom(isRecord, { message: "Expected a frame tree object." });
		readChildren = (tree) => {
			const raw = tree.childFrames;
			if (raw === undefined) return {
				children: [],
				omitted: false
			};
			if (!Array.isArray(raw)) return {
				children: [],
				omitted: true
			};
			const children = raw.filter(isRecord);
			return {
				children,
				omitted: children.length !== raw.length
			};
		};
		walkTrees = (root, visit) => {
			let omittedFrames = false;
			const frames = [];
			const pending = [{
				tree: root,
				enclosing: undefined
			}];
			let rootNode;
			while (pending.length > 0) {
				const { tree, enclosing } = pending.pop();
				const frame = recordValue(tree.frame);
				const node = {
					enclosing,
					facts: cdpFrameRecordFacts(frame),
					url: observeCdpFrameUrl(frame),
					securityOrigin: cdpStringValue(frame?.securityOrigin),
					children: []
				};
				rootNode ??= node;
				enclosing?.children.push(node);
				frames.push(node);
				visit(tree, node);
				const { children, omitted } = readChildren(tree);
				omittedFrames ||= omitted;
				for (let index = children.length - 1; index >= 0; index -= 1) pending.push({
					tree: children[index],
					enclosing: node
				});
			}
			return {
				root: rootNode,
				frames,
				omittedFrames
			};
		};
		cdpFrameTreeReplySchema = z.object({ frameTree: treeRecord }).transform(({ frameTree }) => walkTrees(frameTree, () => undefined));
		cdpResourceTreeReplySchema = z.object({ frameTree: treeRecord }).transform(({ frameTree }) => {
			const resources = [];
			let omittedResources = false;
			let malformedResources = 0;
			const tree = walkTrees(frameTree, (raw) => {
				if (!Array.isArray(raw.resources)) {
					omittedResources = true;
					return;
				}
				for (const entry of raw.resources) {
					const resource = recordValue(entry);
					if (resource === undefined) {
						malformedResources += 1;
						continue;
					}
					resources.push({
						url: cdpStringValue(resource.url),
						type: cdpStringValue(resource.type),
						mimeType: cdpStringValue(resource.mimeType),
						contentSize: resourceContentSize(resource.contentSize)
					});
				}
			});
			return {
				resources,
				omittedResources: omittedResources || tree.omittedFrames,
				malformedResources
			};
		});
		reportedFrameUrl = (observation) => observation.kind === "missing" ? undefined : observation.scopeUrl;
		observedFrameUrl = (observation) => observation.kind === "observed" ? observation.url : undefined;
	})))();
}

//#endregion
//#region dist/browser/protocol/CdpCommands.js
/**
* Admit one command reply at a transport boundary: `CdpConnection` and the
* Playwright CDP sessions both call this. Only registered commands can be
* sent, so every reply is parsed or rejected here.
*/
/**
* Refuse a command without a registered result schema before it reaches the
* browser. TypeScript callers cannot name one; JavaScript verifiers can, and
* the effects of a command REA cannot admit a reply for are not reviewed.
*/
function assertCdpCommand(method, operation) {
	if (!isCdpCommand(method)) throw new BrowserObservationError(operation, "protocol_error", { detail: `REA refused to send CDP command ${JSON.stringify(method)}: no result schema is registered for it.` });
}
var acknowledgement, coverageOffset, nodeId, positive, layoutMetricsReply, eventListenersReply, preciseCoverageReply, browserVersionReply, inventory, indexedDbVersion, CDP_COMMAND_REPLIES, isCdpCommand, CdpMalformedReply, jsonPointer, parseCdpCommandResult, admitCdpReply;
function init_CdpCommands() {
	return (init_CdpCommands = __esmMin((() => {
		init_browserObservationError();
		init_cdpObservationSchemas();
		init_result();
		init_CdpFrameTree();
		acknowledgement = z.object({});
		coverageOffset = z.int().min(0);
		nodeId = z.int().min(1);
		positive = z.number().positive();
		layoutMetricsReply = z.object({
			visualViewport: z.object({
				clientWidth: positive,
				clientHeight: positive,
				scale: positive
			}),
			cssVisualViewport: z.object({
				pageX: z.number(),
				pageY: z.number(),
				clientWidth: positive,
				clientHeight: positive,
				scale: positive
			})
		});
		eventListenersReply = z.object({ listeners: z.array(z.object({
			type: z.string(),
			useCapture: z.boolean(),
			passive: z.boolean(),
			once: z.boolean(),
			scriptId: z.string(),
			lineNumber: z.int().min(0),
			columnNumber: cdpResourceColumnSchema
		})) });
		preciseCoverageReply = z.object({
			timestamp: z.number().min(0),
			result: z.array(z.object({
				scriptId: z.string().min(1),
				url: z.string(),
				functions: z.array(z.object({
					functionName: z.string(),
					isBlockCoverage: z.boolean(),
					ranges: z.array(z.object({
						startOffset: coverageOffset,
						endOffset: coverageOffset,
						count: coverageOffset
					}))
				}))
			}))
		});
		browserVersionReply = z.object({
			protocolVersion: z.string().min(1),
			product: z.string().min(1),
			revision: z.string(),
			userAgent: z.string(),
			jsVersion: z.string()
		});
		inventory = z.array(z.unknown());
		indexedDbVersion = z.unknown().transform((value) => typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : undefined).optional();
		CDP_COMMAND_REPLIES = {
			"DOM.describeNode": z.object({ node: z.object({
				backendNodeId: nodeId,
				nodeName: z.string(),
				nodeType: z.int(),
				isSVG: z.boolean().optional()
			}) }),
			"DOM.disable": acknowledgement,
			"DOM.enable": acknowledgement,
			"DOM.getDocument": z.object({ root: z.object({ nodeId }) }),
			"DOM.querySelector": z.object({ nodeId: z.int().min(0) }),
			"DOM.resolveNode": z.object({ object: z.object({ objectId: z.string().min(1) }) }),
			"DOMDebugger.getEventListeners": eventListenersReply,
			"Accessibility.getFullAXTree": z.object({ nodes: inventory }),
			"Browser.close": acknowledgement,
			"Browser.getVersion": browserVersionReply,
			"CacheStorage.requestCacheNames": z.object({ caches: inventory }),
			"CacheStorage.requestCachedResponse": z.object({ response: z.object({ body: z.string() }) }),
			"CacheStorage.requestEntries": z.object({
				cacheDataEntries: inventory,
				returnCount: z.int().min(0)
			}),
			"DOMSnapshot.captureSnapshot": z.object({
				documents: inventory.min(1),
				strings: inventory
			}),
			"DOMStorage.getDOMStorageItems": z.object({ entries: inventory }),
			"Debugger.disable": acknowledgement,
			"Debugger.enable": acknowledgement,
			"Debugger.evaluateOnCallFrame": z.object({
				result: z.looseObject({}),
				exceptionDetails: z.unknown().optional()
			}),
			"Debugger.getScriptSource": z.object({ scriptSource: z.string() }),
			"Debugger.resume": acknowledgement,
			"Debugger.setBreakpointByUrl": z.object({ breakpointId: z.string() }),
			"Emulation.clearDeviceMetricsOverride": acknowledgement,
			"Emulation.setDeviceMetricsOverride": acknowledgement,
			"Emulation.setPageScaleFactor": acknowledgement,
			"Emulation.setEmulatedMedia": acknowledgement,
			"Emulation.setFocusEmulationEnabled": acknowledgement,
			"Emulation.setLocaleOverride": acknowledgement,
			"Emulation.setTimezoneOverride": acknowledgement,
			"IndexedDB.requestData": z.object({
				objectStoreDataEntries: inventory,
				hasMore: z.boolean()
			}),
			"IndexedDB.requestDatabase": z.object({ databaseWithObjectStores: z.object({
				name: z.string(),
				version: indexedDbVersion,
				objectStores: inventory
			}) }),
			"IndexedDB.requestDatabaseNames": z.object({ databaseNames: inventory }),
			"Network.disable": acknowledgement,
			"Network.enable": acknowledgement,
			"Network.getCookies": z.object({ cookies: inventory }),
			"Network.getResponseBody": z.object({
				body: z.string(),
				base64Encoded: z.boolean()
			}),
			"Page.addScriptToEvaluateOnNewDocument": z.object({ identifier: z.string() }),
			"Page.createIsolatedWorld": z.object({ executionContextId: z.int() }),
			"Page.disable": acknowledgement,
			"Page.enable": acknowledgement,
			"Page.captureScreenshot": z.object({ data: z.string() }),
			"Page.getFrameTree": cdpFrameTreeReplySchema,
			"Page.getLayoutMetrics": layoutMetricsReply,
			"Page.getResourceTree": cdpResourceTreeReplySchema,
			"Page.navigate": z.object({
				frameId: z.string().min(1),
				loaderId: z.string().min(1).optional(),
				errorText: z.string().optional()
			}),
			"Page.reload": acknowledgement,
			"Page.removeScriptToEvaluateOnNewDocument": acknowledgement,
			"Page.setLifecycleEventsEnabled": acknowledgement,
			"Page.stopLoading": acknowledgement,
			"Performance.enable": acknowledgement,
			"Performance.getMetrics": z.object({ metrics: z.array(z.object({
				name: z.string(),
				value: z.number()
			})) }),
			"Profiler.disable": acknowledgement,
			"Profiler.enable": acknowledgement,
			"Profiler.startPreciseCoverage": z.object({ timestamp: z.number().min(0) }),
			"Profiler.stopPreciseCoverage": acknowledgement,
			"Profiler.takePreciseCoverage": preciseCoverageReply,
			"Runtime.disable": acknowledgement,
			"Runtime.enable": acknowledgement,
			"Runtime.evaluate": z.object({
				result: z.object({
					type: z.string(),
					value: z.unknown().optional()
				}),
				exceptionDetails: z.unknown().optional()
			}),
			"Runtime.releaseObjectGroup": acknowledgement,
			"Runtime.runIfWaitingForDebugger": acknowledgement,
			"Storage.getStorageKey": z.object({ storageKey: z.string() }),
			"Storage.getUsageAndQuota": z.object({
				usage: z.number(),
				quota: z.number()
			}),
			"Target.activateTarget": acknowledgement,
			"Target.attachToTarget": z.object({ sessionId: z.string().min(1) }),
			"Target.closeTarget": z.object({ success: z.boolean() }),
			"Target.createTarget": z.object({ targetId: z.string().min(1) }),
			"Target.detachFromTarget": acknowledgement,
			"Target.getTargetInfo": z.object({ targetInfo: z.object({ targetId: z.string() }) }),
			"Target.getTargets": z.object({ targetInfos: inventory }),
			"Target.sendMessageToTarget": acknowledgement,
			"Target.setAutoAttach": acknowledgement,
			"WebMCP.disable": acknowledgement,
			"WebMCP.enable": acknowledgement
		};
		isCdpCommand = (method) => Object.hasOwn(CDP_COMMAND_REPLIES, method);
		CdpMalformedReply = class extends BrowserObservationError {
			command;
			pointer;
			constructor(operation, facts) {
				super(operation, "protocol_error", { detail: `CDP ${facts.command} returned a malformed result at ${facts.pointer === "" ? "/" : facts.pointer}: ${facts.issue}` });
				this.command = facts.command;
				this.pointer = facts.pointer;
			}
		};
		jsonPointer = (path) => path.map((segment) => `/${String(segment).replaceAll("~", "~0").replaceAll("/", "~1")}`).join("");
		parseCdpCommandResult = (command, value) => {
			if (!isCdpCommand(command)) return err({
				command,
				pointer: "",
				issue: "No result schema is registered for this command."
			});
			const schema = CDP_COMMAND_REPLIES[command];
			const parsed = schema.safeParse(value);
			if (parsed.success) return ok(parsed.data);
			const issue = parsed.error.issues[0];
			return err({
				command,
				pointer: jsonPointer(issue?.path ?? []),
				issue: issue?.message ?? "The result did not match its protocol schema."
			});
		};
		admitCdpReply = (method, reply, operation) => {
			const parsed = parseCdpCommandResult(method, reply);
			if (!parsed.ok) throw new CdpMalformedReply(operation, parsed.error);
			return parsed.value;
		};
	})))();
}

//#endregion
//#region dist/browser/CdpDiscoveryTargets.js
var identitySchema, browserSocketIdentitySchema, parseCdpDiscoveryTargets, selectCdpDiscoveryTarget;
function init_CdpDiscoveryTargets() {
	return (init_CdpDiscoveryTargets = __esmMin((() => {
		init_browserObservationError();
		identitySchema = z.object({
			id: z.string().min(1),
			type: z.string().min(1),
			url: z.string(),
			title: z.unknown().optional(),
			attached: z.unknown().optional(),
			webSocketDebuggerUrl: z.unknown().optional()
		});
		browserSocketIdentitySchema = identitySchema.omit({ id: true }).extend({ targetId: identitySchema.shape.id });
		parseCdpDiscoveryTargets = (input, operation, source = "http") => {
			const label = source === "http" ? "CDP /json/list" : "CDP Target.getTargets";
			if (!Array.isArray(input)) throw new BrowserObservationError(operation, "invalid_endpoint_response", { detail: `${label} must return an array of target rows.` });
			const schema = source === "browser-socket" ? browserSocketIdentitySchema : identitySchema;
			const targets = [];
			const limitations = [];
			const idCounts = new Map();
			for (const row of input) {
				if (typeof row !== "object" || row === null || Array.isArray(row)) continue;
				const id = Reflect.get(row, source === "http" ? "id" : "targetId");
				if (typeof id === "string" && id !== "") idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
			}
			const ambiguousTargetIds = [];
			for (const [id, count] of idCounts) {
				if (count > 1) {
					ambiguousTargetIds.push(id);
					limitations.push(`${label} reported target ID ${id} in ${String(count)} rows; its identity is ambiguous and cannot be selected.`);
				}
			}
			for (const [index, row] of input.entries()) {
				const parsed = schema.safeParse(row);
				if (!parsed.success) {
					limitations.push(`${label} row ${String(index)} was excluded because its target identity is malformed: ${JSON.stringify(parsed.error.issues)}.`);
					continue;
				}
				const target = parsed.data;
				const id = "targetId" in target ? target.targetId : target.id;
				if (target.attached !== undefined && target.attached !== null && typeof target.attached !== "boolean") limitations.push(`${label} row ${String(index)} target ${id} reported malformed attached metadata ${JSON.stringify(target.attached)}; attachment state is unknown.`);
				if (target.title !== undefined && typeof target.title !== "string") limitations.push(`${label} row ${String(index)} target ${id} reported malformed title metadata ${JSON.stringify(target.title)}; title is unavailable.`);
				targets.push({
					id,
					type: target.type,
					url: target.url,
					title: typeof target.title === "string" ? target.title : "",
					attached: typeof target.attached === "boolean" ? target.attached : null,
					webSocketDebuggerUrl: target.webSocketDebuggerUrl
				});
			}
			return {
				targets,
				limitations,
				ambiguousTargetIds
			};
		};
		selectCdpDiscoveryTarget = (targets, targetId, operation, ambiguousTargetIds = []) => {
			const matches = targets.filter((target) => target.id === targetId);
			if (matches.length > 1 || ambiguousTargetIds.includes(targetId)) throw new BrowserObservationError(operation, "invalid_endpoint_response", {
				detail: `Target ID ${targetId} is ambiguous in endpoint discovery; REA cannot select its identity or location.`,
				diagnostics: { target_id: targetId },
				remediationAction: "Refresh discovery after the endpoint reports a unique row for this target ID, or select a different target."
			});
			return matches[0];
		};
	})))();
}

//#endregion
//#region dist/browser/CdpEndpoint.js
var endpointVersionSchema, CDP_DISCOVERY_RESPONSE_LIMITS, discoveryBudget, discoveryTimeout, discoverCdpEndpoint, withCdpDiscoveryDeadline, discoverCdpBrowserSocket, discoveryReply, sanitizeTargetTitle, sanitizeTargetUrlAlias, sanitizeSameOriginTitleUrl, escapeRegExp, cdpTargetWebSocket, hasCdpTargetWebSocket, availableCdpTargetWebSocket, parseCdpEndpointValue, safeCdpWebSocketEndpoint, cdpWebSocketPath, pathIdentifier, targetWebSocket, readCdpJson, endpointFailure;
function init_CdpEndpoint() {
	return (init_CdpEndpoint = __esmMin((() => {
		init_browserDeadline();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_browserObservationError();
		init_browserObservation();
		init_urlComponents();
		init_safeJson();
		init_webRuntime();
		init_CdpCommands();
		init_CdpDiscoveryTargets();
		endpointVersionSchema = z.object({
			Browser: z.string().min(1),
			"Protocol-Version": z.string().min(1),
			"User-Agent": z.string(),
			"V8-Version": z.string(),
			"WebKit-Version": z.string(),
			webSocketDebuggerUrl: z.string().min(1)
		});
		CDP_DISCOVERY_RESPONSE_LIMITS = {
			bytes: 8 * 1024 * 1024,
			timeoutMs: CDP_DISCOVERY_RESPONSE_TIMEOUT_MS
		};
		discoveryBudget = (phase) => phase === "response" ? `The ${String(CDP_DISCOVERY_RESPONSE_LIMITS.bytes)}-byte discovery document budget` : `The ${String(WEB_RUNTIME_LIMITS.protocolBytes)}-byte browser-socket message budget`;
		discoveryTimeout = (operation, timeoutMs, phase) => {
			const recovery = cdpDiscoveryTimeoutRecovery(operation, timeoutMs, phase, discoveryBudget(phase));
			return new BrowserObservationError(operation, "timeout", {
				detail: recovery.userMessage,
				remediationAction: recovery.remediationAction,
				limit: recovery.limit
			});
		};
		discoverCdpEndpoint = async (endpoint, operation, signal, timeoutMs = CDP_DISCOVERY_RESPONSE_LIMITS.timeoutMs) => {
			const limits = {
				bytes: CDP_DISCOVERY_RESPONSE_LIMITS.bytes,
				timeoutMs
			};
			const versionInput = await readCdpJson(new URL("/json/version", endpoint), operation, signal, limits);
			const targetsInput = await readCdpJson(new URL("/json/list", endpoint), operation, signal, limits);
			const version = parseCdpEndpointValue(endpointVersionSchema, versionInput, operation);
			const { targets, limitations, ambiguousTargetIds } = parseCdpDiscoveryTargets(targetsInput, operation);
			return {
				limitations,
				ambiguousTargetIds,
				webSocket: safeCdpWebSocketEndpoint(endpoint, version.webSocketDebuggerUrl, operation),
				version: {
					product: version.Browser,
					protocol_version: version["Protocol-Version"],
					revision: version["WebKit-Version"],
					user_agent: version["User-Agent"],
					js_version: version["V8-Version"]
				},
				targets: targets.map((target) => ({
					id: target.id,
					type: target.type,
					title: sanitizeTargetTitle(target.title, target.url),
					url: target.url,
					attached: target.attached,
					...targetWebSocket(endpoint, target, operation)
				}))
			};
		};
		withCdpDiscoveryDeadline = async (operation, signal, work, timeoutMs = CDP_DISCOVERY_RESPONSE_LIMITS.timeoutMs) => {
			const deadline = new AbortController();
			let abortSource;
			let abortReason;
			const abort = (source, reason) => {
				if (abortSource !== undefined) return;
				abortSource = source;
				abortReason = reason;
				deadline.abort(reason);
			};
			const onCallerAbort = () => {
				if (signal?.aborted === true) abort("caller", signal.reason);
			};
			const timer = setTimeout(() => abort("deadline", new Error("CDP discovery deadline exceeded")), timeoutMs);
			signal?.addEventListener("abort", onCallerAbort, { once: true });
			onCallerAbort();
			try {
				return await work(deadline.signal);
			} catch (cause) {
				if (cause === abortReason) {
					if (abortSource === "caller") throw cancelledBy(operation, carriedReason(abortReason));
					if (abortSource === "deadline") throw discoveryTimeout(operation, timeoutMs, "browser-socket");
				}
				if (cause instanceof AnalysisError) {
					if (abortSource === "deadline" && cause instanceof AnalysisCancelledError && cause.cause === abortReason) throw discoveryTimeout(operation, timeoutMs, "browser-socket");
					throw cause;
				}
				throw cause;
			} finally {
				clearTimeout(timer);
				signal?.removeEventListener("abort", onCallerAbort);
			}
		};
		discoverCdpBrowserSocket = async (connection, url, operation, signal) => {
			const version = await discoveryReply(connection.send("Browser.getVersion", {}, undefined, signal), operation);
			const { targetInfos } = await discoveryReply(connection.send("Target.getTargets", {}, undefined, signal), operation);
			const { targets, limitations, ambiguousTargetIds } = parseCdpDiscoveryTargets(targetInfos, operation, "browser-socket");
			return {
				limitations,
				ambiguousTargetIds,
				webSocket: {
					scope: "browser",
					url
				},
				version: {
					product: version.product,
					protocol_version: version.protocolVersion,
					revision: version.revision,
					user_agent: version.userAgent,
					js_version: version.jsVersion
				},
				targets: targets.map((target) => ({
					id: target.id,
					type: target.type,
					title: sanitizeTargetTitle(target.title, target.url),
					url: target.url,
					attached: target.attached
				}))
			};
		};
		discoveryReply = async (reply, operation) => {
			try {
				return await reply;
			} catch (cause) {
				if (!(cause instanceof CdpMalformedReply)) throw cause;
				throw new BrowserObservationError(operation, "invalid_endpoint_response", {
					cause,
					...cause.detail === undefined ? {} : { detail: cause.detail }
				});
			}
		};
		sanitizeTargetTitle = (value, targetUrl) => {
			let url;
			try {
				url = new URL(value);
			} catch (cause) {
				void cause;
				return sanitizeTargetUrlAlias(value, targetUrl);
			}
			return url.protocol === "http:" || url.protocol === "https:" ? sanitizeBrowserUrl(value).url : sanitizeTargetUrlAlias(value, targetUrl);
		};
		sanitizeTargetUrlAlias = (value, targetUrl) => {
			let parsed;
			try {
				parsed = new URL(targetUrl);
			} catch (cause) {
				void cause;
				return value;
			}
			const markers = [
				parsed.origin,
				`//${parsed.host}`,
				parsed.host
			];
			if (parsed.pathname !== "/") markers.push(parsed.pathname);
			const candidatePattern = new RegExp(`(?:${markers.map(escapeRegExp).join("|")})[^\\s<>"']*`, "gu");
			return value.replace(candidatePattern, (candidate) => sanitizeSameOriginTitleUrl(candidate, parsed));
		};
		sanitizeSameOriginTitleUrl = (candidate, target) => {
			let parsed;
			try {
				parsed = candidate.startsWith("//") ? new URL(`${target.protocol}${candidate}`) : candidate.startsWith(target.host) ? new URL(`${target.protocol}//${candidate}`) : new URL(candidate, target.origin);
			} catch (cause) {
				void cause;
				return candidate;
			}
			return parsed.origin === target.origin && (parsed.username !== "" || parsed.password !== "") ? sanitizeBrowserUrl(candidate).url : candidate;
		};
		escapeRegExp = (value) => value.replaceAll(/[.*+?^${}()|[\]\\]/gu, "\\$&");
		cdpTargetWebSocket = (discovery, target, operation) => {
			const webSocket = availableCdpTargetWebSocket(discovery, target);
			if (webSocket !== undefined) return webSocket;
			throw new BrowserObservationError(operation, "invalid_endpoint_response");
		};
		hasCdpTargetWebSocket = (discovery, target) => availableCdpTargetWebSocket(discovery, target) !== undefined;
		availableCdpTargetWebSocket = (discovery, target) => {
			if (discovery.webSocket.scope === "browser") return discovery.webSocket;
			if (target.webSocket !== undefined) return target.webSocket;
			return discovery.webSocket.targetId === target.id ? discovery.webSocket : undefined;
		};
		parseCdpEndpointValue = (schema, input, operation) => {
			const parsed = schema.safeParse(input);
			if (!parsed.success) throw new BrowserObservationError(operation, "invalid_endpoint_response", { cause: parsed.error });
			return parsed.data;
		};
		safeCdpWebSocketEndpoint = (endpoint, reported, operation) => {
			let parsed;
			try {
				parsed = new URL(reported);
			} catch (cause) {
				throw new BrowserObservationError(operation, "invalid_endpoint_response", { cause });
			}
			const trustedEndpoint = new URL(endpoint);
			const path = cdpWebSocketPath(parsed.pathname);
			if (parsed.protocol !== "ws:" || parsed.port !== trustedEndpoint.port || parsed.username !== "" || parsed.password !== "" || urlDeclaresQueryOrFragment(parsed) || path === undefined) throw new BrowserObservationError(operation, "invalid_endpoint_response");
			parsed.hostname = trustedEndpoint.hostname;
			return path.scope === "browser" ? {
				scope: "browser",
				url: parsed.href
			} : {
				scope: "page",
				targetId: path.targetId,
				url: parsed.href
			};
		};
		cdpWebSocketPath = (pathname) => {
			const browserId = pathIdentifier(pathname, "/devtools/browser/");
			if (browserId !== undefined) return { scope: "browser" };
			const targetId = pathIdentifier(pathname, "/devtools/page/");
			return targetId === undefined ? undefined : {
				scope: "page",
				targetId
			};
		};
		pathIdentifier = (pathname, prefix) => {
			if (!pathname.startsWith(prefix)) return undefined;
			const identifier = pathname.slice(prefix.length);
			return identifier.length > 0 && !identifier.includes("/") ? identifier : undefined;
		};
		targetWebSocket = (endpoint, target, operation) => {
			if (typeof target.webSocketDebuggerUrl !== "string" || target.webSocketDebuggerUrl.length === 0) return {};
			try {
				const webSocket = safeCdpWebSocketEndpoint(endpoint, target.webSocketDebuggerUrl, operation);
				return webSocket.scope === "page" && webSocket.targetId === target.id ? { webSocket } : {};
			} catch (cause) {
				void cause;
				return {};
			}
		};
		readCdpJson = async (url, operation, signal, limits = CDP_DISCOVERY_RESPONSE_LIMITS) => await new Promise((resolve, reject) => {
			if (signal?.aborted === true) {
				reject(cancelledBy(operation, signal));
				return;
			}
			let response;
			let request_;
			let timer;
			let settled = false;
			const removeAbort = () => signal?.removeEventListener("abort", onAbort);
			const finish = (error, value) => {
				if (settled) return;
				settled = true;
				if (timer !== undefined) clearTimeout(timer);
				removeAbort();
				if (error !== undefined) {
					reject(error);
					response?.destroy();
					request_?.destroy();
				} else resolve(value);
			};
			const onAbort = () => {
				if (signal?.aborted === true) finish(cancelledBy(operation, signal));
			};
			request_ = request(url, {
				method: "GET",
				headers: { Accept: "application/json" }
			}, (received) => {
				response = received;
				if (settled) {
					received.destroy();
					return;
				}
				if (received.statusCode !== 200) {
					finish(new BrowserObservationError(operation, "invalid_endpoint_response"));
					return;
				}
				const chunks = [];
				let bytes = 0;
				received.on("data", (chunk) => {
					if (settled) return;
					bytes += chunk.byteLength;
					if (bytes > limits.bytes) {
						finish(new BrowserObservationError(operation, "payload_limit", { detail: noRuntimeOverrideSentence(`CDP discovery response exceeds its ${String(limits.bytes)}-byte limit.`, cdpCommandTimeoutUnrelatedControl(operation)) }));
						return;
					}
					chunks.push(chunk);
				});
				received.on("end", () => {
					if (settled) return;
					const body = Buffer.concat(chunks, bytes);
					if (!isUtf8(body)) {
						finish(new BrowserObservationError(operation, "invalid_endpoint_response"));
						return;
					}
					const parsed = safeParseJson(body.toString("utf8"));
					if (!parsed.ok) {
						finish(new BrowserObservationError(operation, "invalid_endpoint_response", { cause: parsed.cause }));
						return;
					}
					finish(undefined, parsed.value);
				});
				received.on("aborted", () => finish(new BrowserObservationError(operation, "invalid_endpoint_response")));
				received.on("close", () => {
					if (!settled && !received.complete) finish(new BrowserObservationError(operation, "invalid_endpoint_response"));
				});
				received.on("error", (cause) => finish(endpointFailure(cause, operation, signal)));
			});
			request_.on("error", (cause) => finish(endpointFailure(cause, operation, signal)));
			signal?.addEventListener("abort", onAbort, { once: true });
			onAbort();
			if (settled) return;
			timer = setTimeout(() => finish(discoveryTimeout(operation, limits.timeoutMs, "response")), limits.timeoutMs);
			request_.end();
		});
		endpointFailure = (cause, operation, signal) => {
			if (cause instanceof AnalysisError) return cause;
			if (signal?.aborted === true) return cancelledBy(operation, signal);
			return new BrowserObservationError(operation, "endpoint_unreachable", { cause });
		};
	})))();
}

//#endregion
//#region dist/browser/CdpCommandRejection.js
var CdpCommandRejection, isCdpSessionGoneRejection;
function init_CdpCommandRejection() {
	return (init_CdpCommandRejection = __esmMin((() => {
		init_browserObservationError();
		CdpCommandRejection = class extends BrowserObservationError {
			command;
			code;
			reportedMessage;
			constructor(operation, command, code, reportedMessage) {
				super(operation, "protocol_error", { detail: reportedMessage === null ? "CDP returned a malformed command error." : `CDP ${command} failed (${code === null ? "unknown code" : String(code)}): ${reportedMessage}` });
				this.command = command;
				this.code = code;
				this.reportedMessage = reportedMessage;
			}
		};
		isCdpSessionGoneRejection = (cause) => cause instanceof CdpCommandRejection && (cause.code === -32001 || cause.reportedMessage !== null && /no session with given id|session with given id not found/iu.test(cause.reportedMessage));
	})))();
}

//#endregion
//#region dist/browser/CdpNetworkEventFacts.js
var integer$1, runtimeRequestSchema, readCdpResponseFacts, readResponseStatus, scopeCdpResponse, requestIdentity, readCdpRequestWillBeSent, readCdpResponseReceived, readCdpLoadingFinished, readCdpLoadingFailed, readCdpWebSocketCreated, readCdpWebSocketFrame;
function init_CdpNetworkEventFacts() {
	return (init_CdpNetworkEventFacts = __esmMin((() => {
		init_browserObservation();
		init_result();
		init_CdpCaptureValues();
		init_cdpObservationSchemas();
		integer$1 = z.int().min(0);
		runtimeRequestSchema = z.object({
			requestId: z.string().min(1),
			frameId: z.string().optional(),
			timestamp: z.number().min(0),
			request: z.object({
				url: z.string(),
				method: z.string()
			}),
			initiator: z.object({
				type: z.string(),
				stack: z.unknown().optional(),
				url: z.string().optional(),
				lineNumber: integer$1.optional(),
				columnNumber: cdpResourceColumnSchema.optional()
			}).passthrough()
		});
		readCdpResponseFacts = (reported) => {
			const source = recordValue(reported);
			if (source === undefined) return undefined;
			const url = cdpStringValue(source.url);
			return {
				source,
				url: url === undefined ? undefined : observeBrowserUrl(url),
				status: readResponseStatus(source.status),
				mimeType: cdpStringValue(source.mimeType),
				encodedDataLength: numberValue(source.encodedDataLength),
				headers: source.headers
			};
		};
		readResponseStatus = (value) => {
			if (value === undefined) return ok(null);
			const status = browserResponseStatusSchema.safeParse(value);
			return status.success ? ok(status.data) : err({ _tag: "InvalidCdpResponseStatus" });
		};
		scopeCdpResponse = (response, allowedOrigins, missingUrlReason = "invalid_protocol_value") => {
			if (response === undefined) return {
				scope: null,
				reason: "invalid_protocol_value"
			};
			const url = response.url;
			if (url === undefined || url.source === "") return {
				scope: null,
				reason: missingUrlReason
			};
			if (url.kind === "malformed") return {
				scope: null,
				reason: "invalid_protocol_value"
			};
			if (url.protocol !== "http:" && url.protocol !== "https:") return {
				scope: "unsupported",
				reason: "unsupported_url"
			};
			if (url.sanitized.origin === null || !allowedOrigins.has(url.sanitized.origin)) return {
				scope: "outside_policy",
				reason: "disallowed_origin"
			};
			return {
				scope: "approved",
				url: url.sanitized,
				response
			};
		};
		requestIdentity = (source) => {
			const id = cdpStringValue(source?.requestId);
			return id === undefined || id === "" ? null : id;
		};
		readCdpRequestWillBeSent = (reported) => {
			const source = recordValue(reported);
			const request = recordValue(source?.request);
			const initiator = recordValue(source?.initiator);
			const response = readCdpResponseFacts(source?.redirectResponse);
			return {
				source,
				requestId: requestIdentity(source),
				frameId: cdpStringValue(source?.frameId),
				loaderId: cdpStringValue(source?.loaderId),
				resourceType: cdpStringValue(source?.type),
				timestamp: numberValue(source?.timestamp),
				request: request === undefined ? undefined : {
					source: request,
					url: cdpStringValue(request.url),
					method: cdpStringValue(request.method)
				},
				initiator: initiator === undefined ? undefined : {
					source: initiator,
					type: cdpStringValue(initiator.type)
				},
				redirect: source === undefined || !Object.hasOwn(source, "redirectResponse") ? { kind: "missing" } : response === undefined ? { kind: "malformed" } : {
					kind: "response",
					response
				}
			};
		};
		readCdpResponseReceived = (reported) => {
			const source = recordValue(reported);
			return {
				source,
				requestId: requestIdentity(source),
				response: readCdpResponseFacts(source?.response)
			};
		};
		readCdpLoadingFinished = (reported) => {
			const source = recordValue(reported);
			return {
				source,
				requestId: requestIdentity(source),
				timestamp: numberValue(source?.timestamp),
				encodedDataLength: numberValue(source?.encodedDataLength)
			};
		};
		readCdpLoadingFailed = (reported) => {
			const source = recordValue(reported);
			return {
				source,
				requestId: requestIdentity(source),
				timestamp: numberValue(source?.timestamp),
				errorText: source?.errorText
			};
		};
		readCdpWebSocketCreated = (reported) => {
			const source = recordValue(reported);
			return {
				requestId: cdpStringValue(source?.requestId),
				url: cdpStringValue(source?.url)
			};
		};
		readCdpWebSocketFrame = (reported) => {
			const source = recordValue(reported);
			const response = recordValue(source?.response);
			return {
				requestId: cdpStringValue(source?.requestId),
				opcode: numberValue(response?.opcode),
				payloadData: cdpStringValue(response?.payloadData)
			};
		};
	})))();
}

//#endregion
//#region dist/browser/CdpScriptContextFacts.js
var integer, contextAuxDataSchema, scriptDeclaration, contextDeclaration, runtimeScriptParsedSchema, runtimeContextSchema, cdpContextFrameClaim, contextIdentity, readCdpExecutionContextCreated, readCdpExecutionContextDestroyed, readCdpScriptParsed, selectCdpScriptFrame;
function init_CdpScriptContextFacts() {
	return (init_CdpScriptContextFacts = __esmMin((() => {
		init_CdpCaptureValues();
		init_cdpObservationSchemas();
		integer = z.int().min(0);
		contextAuxDataSchema = z.object({
			frameId: z.string().optional(),
			isDefault: z.boolean().optional(),
			type: z.string().optional()
		}).passthrough();
		scriptDeclaration = z.object({
			scriptId: z.string(),
			url: z.string(),
			executionContextId: z.number()
		});
		contextDeclaration = z.object({
			id: z.number(),
			origin: z.string().optional(),
			name: z.string().optional(),
			uniqueId: z.string().optional(),
			auxData: contextAuxDataSchema.optional()
		});
		runtimeScriptParsedSchema = scriptDeclaration.extend({
			scriptId: z.string().min(1),
			executionContextId: integer,
			startLine: integer,
			startColumn: cdpResourceColumnSchema,
			endLine: integer,
			endColumn: cdpResourceColumnSchema,
			hash: z.string().optional(),
			sourceMapURL: z.string().optional(),
			hasSourceURL: z.boolean().optional(),
			scriptLanguage: z.string().optional(),
			executionContextAuxData: contextAuxDataSchema.optional()
		});
		runtimeContextSchema = z.object({ context: contextDeclaration.extend({ id: integer }).passthrough() });
		cdpContextFrameClaim = (auxiliary) => {
			if (auxiliary === undefined) return {
				state: "missing",
				frameId: undefined
			};
			const value = recordValue(auxiliary);
			if (value === undefined) return {
				state: "invalid",
				frameId: undefined
			};
			if (value.frameId === undefined) return {
				state: "missing",
				frameId: undefined
			};
			const frameId = cdpStringValue(value.frameId);
			return {
				state: frameId === undefined || frameId === "" ? "invalid" : "observed",
				frameId
			};
		};
		contextIdentity = (reported) => {
			const id = numberValue(reported);
			return {
				id,
				contextKey: id !== undefined && Number.isSafeInteger(id) ? String(id) : null
			};
		};
		readCdpExecutionContextCreated = (params) => {
			const context = recordValue(recordValue(params)?.context);
			return {
				...contextIdentity(context?.id),
				name: cdpStringValue(context?.name),
				origin: cdpStringValue(context?.origin),
				frameClaim: cdpContextFrameClaim(context?.auxData)
			};
		};
		readCdpExecutionContextDestroyed = (params) => contextIdentity(recordValue(params)?.executionContextId);
		readCdpScriptParsed = (params) => {
			const value = recordValue(params);
			const identity = contextIdentity(value?.executionContextId);
			const length = numberValue(value?.length);
			return {
				scriptId: cdpStringValue(value?.scriptId),
				url: cdpStringValue(value?.url),
				contextId: identity.id,
				contextKey: identity.contextKey,
				metadata: {
					hash: cdpStringValue(value?.hash) ?? null,
					length: length !== undefined && Number.isSafeInteger(length) && length >= 0 ? length : null,
					isModule: typeof value?.isModule === "boolean" ? value.isModule : null,
					language: cdpStringValue(value?.scriptLanguage) ?? null
				},
				frameClaim: cdpContextFrameClaim(value?.executionContextAuxData),
				hasSourceUrl: typeof value?.hasSourceURL === "boolean" ? value.hasSourceURL : null,
				invalidHasSourceUrl: value?.hasSourceURL !== undefined && typeof value.hasSourceURL !== "boolean",
				sourceMapUrl: value?.sourceMapURL
			};
		};
		selectCdpScriptFrame = (script, context) => {
			const invalid = script.state === "invalid" || context?.state === "invalid";
			const conflicting = script.state === "observed" && context?.state === "observed" && script.frameId !== context.frameId;
			return {
				frameId: invalid || conflicting ? null : script.frameId ?? context?.frameId ?? null,
				invalid,
				conflicting
			};
		};
	})))();
}

//#endregion
//#region dist/browser/protocol/CdpEvents.js
/**
* Refuse a subscription to an event without a registered payload schema: no
* event of that name could reach the listener. TypeScript callers cannot name
* one; JavaScript verifiers can.
*/
function assertCdpEvent(method, operation) {
	if (!isCdpEvent(method)) throw new BrowserObservationError(operation, "protocol_error", { detail: `REA refused to subscribe to CDP event ${JSON.stringify(method)}: no payload schema is registered for it.` });
}
var frameEvent, declarationBytes, scriptEvent, executionContextCreated, consoleApiCalled, requestWillBeSent, targetDetached, targetAttached, targetMessage, debuggerPaused, lifecycleEvent, webMcpTools, CDP_EVENT_PAYLOADS, isCdpEvent, registeredCdpEvent, FRAME_EVENTS, FRAME_EVENT_NAMES, isFrameEvent, cdpFrameEvent;
function init_CdpEvents() {
	return (init_CdpEvents = __esmMin((() => {
		init_browserObservationError();
		init_result();
		init_CdpCaptureDocuments();
		init_CdpCaptureEventHelpers();
		init_CdpCaptureValues();
		init_CdpFrameIdentity();
		init_CdpNetworkEventFacts();
		init_CdpScriptContextFacts();
		frameEvent = (kind) => z.unknown().transform((params) => {
			const record = recordValue(params);
			const urlSource = kind === "navigated" ? recordValue(record?.frame) : kind === "within_document" || kind === "requested" ? record : undefined;
			return {
				facts: cdpFrameEventPayloadFacts(kind, params),
				url: observeCdpFrameUrl(urlSource),
				reason: kind === "requested" ? cdpStringValue(record?.reason) : undefined,
				transitionType: kind === "navigated" ? cdpStringValue(recordValue(record?.frame)?.transitionType) : undefined
			};
		});
		declarationBytes = (params) => {
			try {
				return ok(Buffer.byteLength(JSON.stringify(params) ?? ""));
			} catch (cause) {
				return err(cause);
			}
		};
		scriptEvent = z.unknown().transform((params) => ({
			facts: readCdpScriptParsed(params),
			runtime: runtimeScriptParsedSchema.safeParse(params),
			declarationBytes: declarationBytes(params)
		}));
		executionContextCreated = z.unknown().transform((params) => ({
			facts: readCdpExecutionContextCreated(params),
			runtime: runtimeContextSchema.safeParse(params),
			declarationBytes: declarationBytes(params)
		}));
		consoleApiCalled = z.unknown().transform((params) => {
			const record = recordValue(params);
			return {
				topFrame: topCallFrame(record?.stackTrace),
				arguments: admitRecords(record?.args)?.map((argument) => recordValue(argument)),
				timestamp: numberValue(record?.timestamp),
				type: cdpStringValue(record?.type)
			};
		});
		requestWillBeSent = z.unknown().transform((params) => ({
			facts: readCdpRequestWillBeSent(params),
			runtime: runtimeRequestSchema.safeParse(params)
		}));
		targetDetached = z.unknown().transform((params) => ({ sessionId: cdpStringValue(recordValue(params)?.sessionId) }));
		targetAttached = z.unknown().transform((params) => {
			const record = recordValue(params);
			const targetInfo = recordValue(record?.targetInfo);
			return {
				sessionId: cdpStringValue(record?.sessionId),
				targetId: cdpStringValue(targetInfo?.targetId),
				targetType: cdpStringValue(targetInfo?.type)
			};
		});
		targetMessage = z.unknown().transform((params) => {
			const record = recordValue(params);
			return {
				sessionId: cdpStringValue(record?.sessionId),
				message: cdpStringValue(record?.message)
			};
		});
		debuggerPaused = z.unknown().transform((params) => z.object({ callFrames: z.array(z.object({
			callFrameId: z.string(),
			location: z.object({ scriptId: z.string() })
		})) }).safeParse(params));
		lifecycleEvent = z.unknown().transform((params) => {
			const record = recordValue(params);
			return {
				frameId: cdpStringValue(record?.frameId),
				loaderId: cdpStringValue(record?.loaderId),
				name: cdpStringValue(record?.name),
				timestamp: numberValue(record?.timestamp)
			};
		});
		webMcpTools = z.unknown().transform((params) => ({ tools: admitRecords(recordValue(params)?.tools)?.map((tool) => recordValue(tool)) }));
		CDP_EVENT_PAYLOADS = {
			"Page.frameAttached": frameEvent("attached"),
			"Page.frameDetached": frameEvent("detached"),
			"Page.frameNavigated": frameEvent("navigated"),
			"Page.frameRequestedNavigation": frameEvent("requested"),
			"Page.navigatedWithinDocument": frameEvent("within_document"),
			"Debugger.scriptParsed": scriptEvent,
			"Debugger.scriptFailedToParse": scriptEvent,
			"Runtime.executionContextCreated": executionContextCreated,
			"Runtime.executionContextDestroyed": z.unknown().transform(readCdpExecutionContextDestroyed),
			"Runtime.consoleAPICalled": consoleApiCalled,
			"Runtime.executionContextsCleared": z.unknown().transform(() => ({})),
			"Inspector.targetCrashed": z.unknown().transform(() => ({})),
			"Debugger.paused": debuggerPaused,
			"Target.receivedMessageFromTarget": targetMessage,
			"Network.requestWillBeSent": requestWillBeSent,
			"Network.responseReceived": z.unknown().transform(readCdpResponseReceived),
			"Network.loadingFinished": z.unknown().transform(readCdpLoadingFinished),
			"Network.loadingFailed": z.unknown().transform(readCdpLoadingFailed),
			"Network.webSocketCreated": z.unknown().transform(readCdpWebSocketCreated),
			"Network.webSocketFrameSent": z.unknown().transform(readCdpWebSocketFrame),
			"Target.attachedToTarget": targetAttached,
			"Target.detachedFromTarget": targetDetached,
			"Page.lifecycleEvent": lifecycleEvent,
			"WebMCP.toolsAdded": webMcpTools,
			"WebMCP.toolsRemoved": webMcpTools,
			"Network.webSocketFrameReceived": z.unknown().transform(readCdpWebSocketFrame)
		};
		isCdpEvent = (method) => Object.hasOwn(CDP_EVENT_PAYLOADS, method);
		registeredCdpEvent = (method, params) => {
			if (!isCdpEvent(method)) return undefined;
			const schema = CDP_EVENT_PAYLOADS[method];
			return {
				method,
				payload: schema.parse(params)
			};
		};
		FRAME_EVENTS = [
			"Page.frameAttached",
			"Page.frameDetached",
			"Page.frameNavigated",
			"Page.frameRequestedNavigation",
			"Page.navigatedWithinDocument"
		];
		FRAME_EVENT_NAMES = new Set(FRAME_EVENTS);
		isFrameEvent = (event) => FRAME_EVENT_NAMES.has(event.method);
		cdpFrameEvent = (event) => event.registered !== undefined && isFrameEvent(event.registered) ? event.registered.payload : undefined;
	})))();
}

//#endregion
//#region dist/browser/CdpConnection.js
var MAX_WEBSOCKET_PAYLOAD_BYTES, receiveCdpEvent, CdpTransportCore, CdpConnection, socketIsClosed, rawBytes, waitForOpen, terminateSocket;
function init_CdpConnection() {
	return (init_CdpConnection = __esmMin((() => {
		init_analysisResourceLimits();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_browserObservationError();
		init_CdpCommandRejection();
		init_CdpCommands();
		init_CdpEvents();
		init_browserDeadline();
		init_safeJson();
		init_webRuntime();
		MAX_WEBSOCKET_PAYLOAD_BYTES = 2147483647;
		receiveCdpEvent = ({ method, params, sessionId }) => ({
			domain: method.split(".", 1)[0] ?? method,
			...sessionId === undefined ? {} : { sessionId },
			registered: registeredCdpEvent(method, params)
		});
		CdpTransportCore = class {
			socket;
			maxPayloadBytes;
			#pending = new Map();
			#listeners = new Set();
			#disconnectListeners = new Set();
			#protocolFailureListeners = new Set();
			#nextId = 1;
			#closed = false;
			#closePromise;
			/** The wire itself broke its protocol; no later message is trusted. */
			#protocolFailed = false;
			/**
			* A subscriber threw while handling an event. The wire is still sound, so
			* only cleanup-grace commands (owners restoring what they changed) may run.
			*/
			#listenerFailed = false;
			/** What that subscriber threw; the protocol failure's cause. */
			#listenerFailure;
			#transportFailure = "disconnected";
			root;
			constructor(socket, maxPayloadBytes) {
				this.socket = socket;
				this.maxPayloadBytes = maxPayloadBytes;
				socket.on("message", (data) => this.#receive(data));
				socket.on("close", () => this.#disconnect());
				socket.on("error", (cause) => this.#disconnect(isRecord(cause) && cause.code === "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH" ? "payload_limit" : "disconnected"));
			}
			isReusable() {
				return !this.#closed && this.#closePromise === undefined && !this.#protocolFailed && !this.#listenerFailed && this.socket.readyState === WebSocket.OPEN;
			}
			onEvent(listener) {
				this.#listeners.add(listener);
				return () => this.#listeners.delete(listener);
			}
			onDisconnect(operation, listener) {
				if (this.#closed) {
					listener(this.transportError(this.#transportFailure, operation));
					return () => undefined;
				}
				const wrapped = (reason) => {
					listener(this.transportError(reason, operation));
				};
				this.#disconnectListeners.add(wrapped);
				return () => this.#disconnectListeners.delete(wrapped);
			}
			onProtocolFailure(operation, listener) {
				if (this.#protocolFailed || this.#listenerFailed) {
					listener(this.transportError("protocol_error", operation));
					return () => undefined;
				}
				const wrapped = () => {
					listener(this.transportError("protocol_error", operation));
				};
				this.#protocolFailureListeners.add(wrapped);
				return () => this.#protocolFailureListeners.delete(wrapped);
			}
			reschedulePending(ids, timeoutMs) {
				for (const id of ids) this.#pending.get(id)?.reschedule(timeoutMs);
			}
			async send(method, params, sessionId, signal, context) {
				const { operation } = context;
				if (this.#protocolFailed || this.#listenerFailed && context.deadlineKind() !== "cleanup") throw this.transportError("protocol_error", operation);
				if (this.#closed || this.socket.readyState !== WebSocket.OPEN) throw this.transportError(this.#transportFailure, operation);
				if (signal?.aborted === true) throw cancelledBy(operation, signal);
				const id = this.#nextId;
				this.#nextId += 1;
				const message = JSON.stringify({
					id,
					method,
					params,
					...sessionId === undefined ? {} : { sessionId }
				});
				return await new Promise((resolve, reject) => {
					const onAbort = () => {
						const pending = this.#pending.get(id);
						if (pending === undefined) return;
						this.#complete(id, pending);
						reject(cancelledBy(operation, carriedReason(signal?.reason)));
					};
					const failTimeout = () => {
						const pending = this.#pending.get(id);
						if (pending === undefined) return;
						this.#complete(id, pending);
						if (context.deadlineKind() === "cleanup") {
							const detail = cdpCleanupGraceExpired();
							reject(new BrowserObservationError(operation, "timeout", {
								detail,
								remediationAction: detail
							}));
							return;
						}
						const timeoutMs = context.commandTimeoutMs();
						const recovery = cdpCommandDeadlineRecovery(timeoutMs, "command", method, cdpCommandTimeoutIsSelectable(operation));
						reject(new BrowserObservationError(operation, "timeout", {
							detail: recovery.userMessage,
							remediationAction: recovery.remediationAction,
							limit: recovery.limit
						}));
					};
					let timer = setTimeout(failTimeout, context.commandTimeoutMs());
					signal?.addEventListener("abort", onAbort, { once: true });
					context.scopedIds.add(id);
					this.#pending.set(id, {
						method,
						operation,
						...sessionId === undefined ? {} : { sessionId },
						resolve,
						reject,
						reschedule: (timeoutMs) => {
							clearTimeout(timer);
							timer = setTimeout(failTimeout, timeoutMs);
						},
						dispose: () => {
							context.scopedIds.delete(id);
							clearTimeout(timer);
							signal?.removeEventListener("abort", onAbort);
						}
					});
					this.socket.send(message, (error) => {
						if (error === undefined || error === null) return;
						const pending = this.#pending.get(id);
						if (pending === undefined) return;
						this.#complete(id, pending);
						reject(new BrowserObservationError(operation, "disconnected", { cause: error }));
					});
				});
			}
			close(operation) {
				this.#closePromise ??= this.#closeTransport(operation).catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #closeTransport(operation) {
				this.#disconnect("disconnected");
				if (socketIsClosed(this.socket)) return;
				await new Promise((resolve, reject) => {
					let settled = false;
					let fallbackStarted = false;
					let fallbackTimer;
					const finish = (cause) => {
						if (settled) return;
						settled = true;
						clearTimeout(timer);
						if (fallbackTimer !== undefined) clearTimeout(fallbackTimer);
						this.socket.off("close", onClose);
						if (cause === undefined) resolve();
						else reject(cause);
					};
					const onClose = () => finish();
					const forceClose = (gracefulFailure) => {
						if (settled || fallbackStarted) return;
						fallbackStarted = true;
						clearTimeout(timer);
						if (socketIsClosed(this.socket)) {
							finish();
							return;
						}
						try {
							this.socket.terminate();
						} catch (cause) {
							gracefulFailure = gracefulFailure === undefined ? cause : new AggregateError([gracefulFailure, cause], "Graceful and forced CDP WebSocket close both failed.", { cause: gracefulFailure });
						}
						if (socketIsClosed(this.socket)) finish();
						else {
							fallbackTimer = setTimeout(() => {
								if (socketIsClosed(this.socket)) {
									finish();
									return;
								}
								finish(gracefulFailure ?? new BrowserObservationError(operation, "cleanup_failed", { detail: "REA could not confirm release of its CDP WebSocket." }));
							}, 1e3);
						}
					};
					const timer = setTimeout(() => forceClose(), 1e3);
					this.socket.once("close", onClose);
					try {
						this.socket.close();
					} catch (closeCause) {
						forceClose(closeCause);
					}
				});
			}
			#receive(data) {
				if (this.#closed || this.#protocolFailed) return;
				const bytes = rawBytes(data);
				if (!isUtf8(bytes)) {
					this.#failPending("protocol_error");
					return;
				}
				const parsed = safeParseJson(bytes.toString("utf8"));
				if (!parsed.ok) {
					this.#failPending("protocol_error");
					return;
				}
				const message = parsed.value;
				if (!isRecord(message)) {
					this.#failPending("protocol_error");
					return;
				}
				if ("id" in message) {
					if (typeof message.id !== "number" || !Number.isSafeInteger(message.id) || message.id < 1) {
						this.#failPending("protocol_error");
						return;
					}
					this.#receiveResponse(message, message.id);
					return;
				}
				if (typeof message.method !== "string" || message.method.length === 0 || "params" in message && !isRecord(message.params) || "sessionId" in message && typeof message.sessionId !== "string") {
					this.#failPending("protocol_error");
					return;
				}
				const event = {
					...receiveCdpEvent({
						method: message.method,
						params: "params" in message ? message.params : {},
						...typeof message.sessionId === "string" ? { sessionId: message.sessionId } : {}
					}),
					wireBytes: bytes.byteLength
				};
				if (this.#listenerFailed) return;
				for (const listener of this.#listeners) {
					try {
						listener(event);
					} catch (cause) {
						this.#failListener(cause);
						return;
					}
				}
			}
			/**
			* Reject pending commands and notify protocol-failure subscribers, but keep
			* reading replies: owners still restore what they changed in cleanup grace.
			*/
			#failListener(cause) {
				this.#listenerFailed = true;
				this.#listenerFailure = cause;
				for (const [id, pending] of this.#pending) {
					this.#complete(id, pending);
					pending.reject(this.transportError("protocol_error", pending.operation));
				}
				this.#notifyProtocolFailure();
			}
			#notifyProtocolFailure() {
				const listeners = [...this.#protocolFailureListeners];
				this.#protocolFailureListeners.clear();
				for (const listener of listeners) listener();
			}
			#receiveResponse(message, id) {
				const pending = this.#pending.get(id);
				if (pending === undefined) return;
				const hasResult = "result" in message;
				const hasError = "error" in message;
				const detachedSessionError = pending.sessionId !== undefined && !("sessionId" in message) && hasError && isRecord(message.error) && message.error.code === -32001 && message.error.message === "Session with given id not found.";
				if ((pending.sessionId === undefined ? "sessionId" in message : message.sessionId !== pending.sessionId && !detachedSessionError) || hasResult === hasError) {
					this.#failPending("protocol_error");
					return;
				}
				if (hasResult) {
					if (!isRecord(message.result)) {
						this.#failPending("protocol_error");
						return;
					}
					this.#complete(id, pending);
					pending.resolve(message.result);
					return;
				}
				const reported = message.error;
				if (!isRecord(reported) || typeof reported.code !== "number" || !Number.isSafeInteger(reported.code) || typeof reported.message !== "string") {
					this.#failPending("protocol_error");
					return;
				}
				this.#complete(id, pending);
				pending.reject(new CdpCommandRejection(pending.operation, pending.method, reported.code, reported.message));
			}
			#complete(id, pending) {
				pending.dispose();
				this.#pending.delete(id);
			}
			#failPending(reason) {
				if (reason !== "protocol_error") this.#closed = true;
				else this.#protocolFailed = true;
				for (const [id, pending] of this.#pending) {
					this.#complete(id, pending);
					pending.reject(this.transportError(reason, pending.operation));
				}
				if (reason === "protocol_error") this.#notifyProtocolFailure();
			}
			#disconnect(reason = "disconnected") {
				const wasClosed = this.#closed;
				if (!wasClosed) this.#transportFailure = reason;
				this.#failPending(reason);
				if (wasClosed) return;
				for (const listener of this.#disconnectListeners) listener(reason);
				this.#disconnectListeners.clear();
			}
			transportError(reason, operation) {
				if (reason === "payload_limit") return new BrowserObservationError(operation, reason, { detail: noRuntimeOverrideSentence(`CDP message exceeded the ${String(this.maxPayloadBytes)} byte protocol budget.`, cdpCommandTimeoutUnrelatedControl(operation)) });
				return new BrowserObservationError(operation, reason, reason === "protocol_error" && this.#listenerFailed ? { cause: this.#listenerFailure } : undefined);
			}
		};
		CdpConnection = class CdpConnection {
			core;
			operation;
			#scopedPendingIds = new Set();
			#commandTimeoutMs;
			#deadlineKind = "command";
			constructor(core, operation, commandTimeoutMs) {
				this.core = core;
				this.operation = operation;
				this.#commandTimeoutMs = commandTimeoutMs;
			}
			/** Canonical connection identity registered with `CdpTargetSessionOwner`. */
			get transportRoot() {
				return this.core.root;
			}
			/** True while the underlying WebSocket remains open, unpoisoned, and outside cleanup grace. */
			isReusable() {
				return this.#deadlineKind === "command" && this.core.isReusable();
			}
			/** Bind an isolated operation and command-deadline view over this shared WebSocket. */
			withOperation(operation, commandTimeoutMs) {
				return new CdpConnection(this.core, operation, commandTimeoutMs);
			}
			/** Connect to one already-validated loopback CDP WebSocket. */
			static async connect(url, operation, signal, limits, onConnected) {
				if (signal?.aborted === true) throw cancelledBy(operation, signal);
				const maxPayloadBytes = limits?.maxPayloadBytes ?? WEB_RUNTIME_LIMITS.protocolBytes;
				const commandTimeoutMs = limits?.commandTimeoutMs ?? 2e4;
				const handshakeTimeoutMs = limits?.handshakeTimeoutMs ?? commandTimeoutMs;
				if (!Number.isSafeInteger(maxPayloadBytes) || maxPayloadBytes <= 0 || maxPayloadBytes > MAX_WEBSOCKET_PAYLOAD_BYTES) throw new RangeError(`CDP maxPayloadBytes must be a positive safe integer no greater than ${String(MAX_WEBSOCKET_PAYLOAD_BYTES)}.`);
				const socket = new WebSocket(url, {
					handshakeTimeout: 0,
					maxPayload: maxPayloadBytes,
					perMessageDeflate: false
				});
				const core = new CdpTransportCore(socket, maxPayloadBytes);
				const connection = new CdpConnection(core, operation, commandTimeoutMs);
				core.root = connection;
				try {
					onConnected?.(connection);
				} catch (cause) {
					await connection.close();
					throw cause;
				}
				try {
					await waitForOpen(socket, operation, signal, handshakeTimeoutMs);
				} catch (cause) {
					if (onConnected === undefined) {
						try {
							await connection.close();
						} catch (cleanupCause) {
							throw new AggregateError([cause, cleanupCause], "CDP WebSocket handshake failed and its transport cleanup is incomplete.", { cause });
						}
					}
					throw cause;
				}
				return connection;
			}
			/** Subscribe to validated CDP event envelopes. */
			onEvent(listener) {
				return this.core.onEvent(listener);
			}
			/**
			* Subscribe to one registered event. An unregistered name is refused here,
			* before subscribing, because no event of that name could reach the
			* listener: JavaScript verifiers name events the compiler cannot check.
			*/
			onRegisteredEvent(method, listener) {
				assertCdpEvent(method, this.operation);
				return this.core.onEvent((event) => {
					if (event.registered?.method === method) listener(event.registered, event);
				});
			}
			/** Subscribe to an unexpected transport loss while an operation is active. */
			onDisconnect(listener) {
				return this.core.onDisconnect(this.operation, listener);
			}
			/** Notify fatal wire parsing failure even when no command is outstanding. */
			onProtocolFailure(listener) {
				return this.core.onProtocolFailure(this.operation, listener);
			}
			/** Apply the post-discovery command deadline to commands that have not started. */
			selectCommandTimeout(timeoutMs) {
				if (this.#deadlineKind === "cleanup") return;
				this.#commandTimeoutMs = timeoutMs;
			}
			/**
			* Restoration uses the fixed cleanup grace. Commands already waiting are
			* rescheduled from now so a raised command deadline cannot extend them.
			*/
			beginCleanupGrace(timeoutMs) {
				this.#deadlineKind = "cleanup";
				this.#commandTimeoutMs = timeoutMs;
				this.core.reschedulePending(this.#scopedPendingIds, timeoutMs);
			}
			/**
			* Bound each response separately from the caller-selected observation
			* window. A registered command's reply is parsed by its result schema; a
			* mismatch rejects that command with `CdpMalformedReply`.
			*/
			async send(method, params, sessionId, signal) {
				assertCdpCommand(method, this.operation);
				const reply = await this.core.send(method, params ?? {}, sessionId, signal, {
					operation: this.operation,
					commandTimeoutMs: () => this.#commandTimeoutMs,
					deadlineKind: () => this.#deadlineKind,
					scopedIds: this.#scopedPendingIds
				});
				return admitCdpReply(method, reply, this.operation);
			}
			/** Close only REA's socket; never close the browser or selected page. */
			close() {
				return this.core.close(this.operation);
			}
		};
		socketIsClosed = (socket) => socket.readyState === WebSocket.CLOSED;
		rawBytes = (data) => Array.isArray(data) ? Buffer.concat(data) : Buffer.isBuffer(data) ? data : Buffer.from(data);
		waitForOpen = async (socket, operation, signal, handshakeTimeoutMs) => await new Promise((resolve, reject) => {
			const onOpen = () => {
				cleanup();
				resolve();
			};
			const onFailure = (cause) => {
				cleanup();
				reject(new BrowserObservationError(operation, "endpoint_unreachable", { cause }));
			};
			const onClose = (code, reason) => {
				onFailure(new Error(`CDP WebSocket closed before opening (${code}: ${reason.toString("utf8")})`));
			};
			const onAbort = () => {
				cleanup();
				terminateSocket(socket);
				reject(cancelledBy(operation, carriedReason(signal?.reason)));
			};
			const cleanup = () => {
				clearTimeout(timer);
				socket.off("open", onOpen);
				socket.off("error", onFailure);
				socket.off("close", onClose);
				signal?.removeEventListener("abort", onAbort);
			};
			const boundedTimeoutMs = Math.min(MAX_NODE_TIMER_DELAY_MS, handshakeTimeoutMs);
			const timer = setTimeout(() => {
				terminateSocket(socket);
				cleanup();
				const recovery = cdpCommandDeadlineRecovery(boundedTimeoutMs, "handshake", undefined, cdpCommandTimeoutIsSelectable(operation));
				reject(new BrowserObservationError(operation, "timeout", {
					detail: recovery.userMessage,
					remediationAction: recovery.remediationAction,
					limit: recovery.limit
				}));
			}, boundedTimeoutMs);
			socket.once("open", onOpen);
			socket.once("error", onFailure);
			socket.once("close", onClose);
			signal?.addEventListener("abort", onAbort, { once: true });
			if (signal?.aborted === true) onAbort();
		});
		terminateSocket = (socket) => {
			try {
				socket.terminate();
			} catch {}
		};
	})))();
}

//#endregion
//#region dist/browser/CdpTargetSessionOwner.js
var CdpTransportCleanupFailure, composedConnectCleanupFailures, bindCdpTransportCleanup, CdpTargetSessionOwner, transportRoot, rebindPendingConnectFailure, cleanupError, aggregateCleanupFailures;
function init_CdpTargetSessionOwner() {
	return (init_CdpTargetSessionOwner = __esmMin((() => {
		init_analysisResourceLimits();
		init_resources();
		init_analysisErrorBase();
		init_browserObservationError();
		init_providerCleanupError();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_CdpConnection();
		init_errorMessage();
		CdpTransportCleanupFailure = class extends ProviderCleanupError {
			cleanupLeases;
			transportCause;
			constructor(cleanupLeases, failure) {
				super("rea-cdp-browser", failure.resources, failure.diagnostics, {
					operation: failure.operation,
					cause: failure.cause
				});
				this.cleanupLeases = cleanupLeases;
				this.transportCause = failure.cause;
				new AnalysisCleanupLeaseGroup(this, cleanupLeases);
			}
		};
		composedConnectCleanupFailures = new WeakMap();
		bindCdpTransportCleanup = (cause, failure) => {
			if (cause instanceof CdpTransportCleanupFailure) new AnalysisCleanupLeaseGroup(failure, cause.cleanupLeases);
			return failure;
		};
		CdpTargetSessionOwner = class {
			#connections = new Map();
			#browserSockets = new Map();
			#candidateBrowserSockets = new Map();
			#pendingBrowserSockets = new Map();
			#closing = false;
			#admissions = 0;
			#closePromise;
			#admissionWaiters = new Set();
			/** Reuse an admitted healthy browser socket for `url`, or coalesce a cold connect. */
			async acquireBrowserSocket(url, operation, options, limits) {
				this.#assertOpen(operation);
				await this.retryPending();
				const leased = await this.#leaseExistingBrowserSocket(url, operation, options, limits.commandTimeoutMs);
				if (leased !== undefined) return leased;
				return this.#joinPendingBrowserSocket(url, operation, options, limits);
			}
			async #leaseExistingBrowserSocket(url, operation, options, commandTimeoutMs) {
				while (true) {
					this.#assertOpen(operation);
					if (options.signal?.aborted === true) throw cancelledBy(operation, options.signal);
					const admitted = this.#browserSockets.get(url);
					const socket = admitted ?? this.#candidateBrowserSockets.get(url);
					if (socket === undefined) return undefined;
					const record = this.#connections.get(socket);
					if (record !== undefined && record.failure === undefined && !record.evicted && socket.isReusable()) {
						if (record.activeLeases === 0) {
							let settle = () => undefined;
							record.settled = new Promise((resolve) => {
								settle = resolve;
							});
							record.settle = settle;
							record.active = true;
						}
						record.activeLeases += 1;
						record.operation = operation;
						return {
							connection: socket.withOperation(operation, commandTimeoutMs),
							reused: admitted !== undefined
						};
					}
					if (admitted === socket) this.#browserSockets.delete(url);
					if (this.#candidateBrowserSockets.get(url) === socket) this.#candidateBrowserSockets.delete(url);
					if (record !== undefined) {
						this.#evictRecord(record);
						if (record.activeLeases === 0) await this.#releaseTransportRecord(record);
					}
				}
			}
			#joinPendingBrowserSocket(url, operation, options, limits) {
				let pending = this.#pendingBrowserSockets.get(url);
				let startPending;
				if (pending === undefined) {
					const created = {
						controller: new AbortController(),
						waiters: new Set(),
						done: Promise.resolve(undefined)
					};
					this.#pendingBrowserSockets.set(url, created);
					startPending = () => {
						created.done = this.#runPendingBrowserSocket({
							url,
							pending: created,
							initialOperation: operation,
							limits
						});
					};
					pending = created;
				}
				const activePending = pending;
				return new Promise((resolve, reject) => {
					const waiter = {
						operation,
						commandTimeoutMs: limits.commandTimeoutMs,
						signal: options.signal,
						resolve,
						reject,
						detachAbort: () => undefined
					};
					const onAbort = () => {
						waiter.detachAbort();
						if (!activePending.waiters.delete(waiter)) return;
						const cancelError = cancelledBy(operation, carriedReason(options.signal?.reason));
						if (activePending.waiters.size > 0) {
							reject(cancelError);
							return;
						}
						if (this.#pendingBrowserSockets.get(url) === activePending) this.#pendingBrowserSockets.delete(url);
						activePending.controller.abort(options.signal?.reason);
						void activePending.done.then((outcome) => {
							if (outcome !== undefined) reject(rebindPendingConnectFailure(outcome.cleanupFailure, waiter));
							else reject(cancelError);
						}, reject);
					};
					if (options.signal !== undefined) {
						options.signal.addEventListener("abort", onAbort, { once: true });
						waiter.detachAbort = () => options.signal?.removeEventListener("abort", onAbort);
					}
					activePending.waiters.add(waiter);
					if (options.signal?.aborted === true) {
						onAbort();
						return;
					}
					startPending?.();
				});
			}
			async #runPendingBrowserSocket(context) {
				const { url, pending, initialOperation, limits } = context;
				try {
					const root = await this.connect(url, initialOperation, { signal: pending.controller.signal }, "browser-endpoint", {
						...limits.maxPayloadBytes === undefined ? {} : { maxPayloadBytes: limits.maxPayloadBytes },
						commandTimeoutMs: limits.commandTimeoutMs,
						handshakeTimeoutMs: MAX_NODE_TIMER_DELAY_MS
					});
					if (this.#pendingBrowserSockets.get(url) === pending) this.#pendingBrowserSockets.delete(url);
					if (pending.waiters.size === 0) {
						await this.finish(root);
						return undefined;
					}
					const record = this.#connections.get(root);
					if (record !== undefined) {
						record.reusableUrl = url;
						record.activeLeases = pending.waiters.size;
						if (!this.#closing && !record.evicted && root.isReusable()) this.#candidateBrowserSockets.set(url, root);
					}
					const snapshot = [...pending.waiters];
					pending.waiters.clear();
					for (const waiter of snapshot) {
						waiter.detachAbort();
						waiter.resolve({
							connection: root.withOperation(waiter.operation, waiter.commandTimeoutMs),
							reused: false
						});
					}
					return undefined;
				} catch (cause) {
					if (this.#pendingBrowserSockets.get(url) === pending) this.#pendingBrowserSockets.delete(url);
					const snapshot = [...pending.waiters];
					pending.waiters.clear();
					for (const waiter of snapshot) {
						waiter.detachAbort();
						waiter.reject(rebindPendingConnectFailure(cause, waiter));
					}
					if (snapshot.length === 0 && (cause instanceof AnalysisError && cause.cleanupIncomplete || cause instanceof AggregateError)) return { cleanupFailure: cause };
					return undefined;
				}
			}
			/** Publish a verified browser socket for reuse across subsequent operations. */
			admitBrowserSocket(url, connection) {
				const root = transportRoot(connection);
				const record = this.#connections.get(root);
				if (record === undefined) return;
				record.reusableUrl = url;
				if (this.#candidateBrowserSockets.get(url) === root) this.#candidateBrowserSockets.delete(url);
				if (this.#closing || record.evicted || !root.isReusable()) {
					record.evicted = true;
					return;
				}
				const current = this.#browserSockets.get(url);
				if (current === root) return;
				if (current !== undefined) {
					const currentRecord = this.#connections.get(current);
					if (current.isReusable() && currentRecord !== undefined && currentRecord.failure === undefined && !currentRecord.evicted) {
						record.evicted = true;
						return;
					}
					this.#browserSockets.delete(url);
					if (currentRecord !== undefined) this.#evictRecord(currentRecord);
				}
				this.#browserSockets.set(url, root);
				let offDisconnect;
				let offProtocolFailure;
				const onUnusable = () => {
					if (this.#browserSockets.get(url) === root) this.#browserSockets.delete(url);
					record.evicted = true;
					record.statusUnsubscribe?.();
					record.statusUnsubscribe = undefined;
					if (record.activeLeases === 0 && !this.#closing) {
						void this.#releaseTransportRecord(record).catch(() => undefined);
					}
				};
				record.statusUnsubscribe = () => {
					offDisconnect?.();
					offProtocolFailure?.();
				};
				offDisconnect = root.onDisconnect(onUnusable);
				offProtocolFailure = root.onProtocolFailure(onUnusable);
			}
			/** Release one operation's lease on a browser socket, closing it when tainted or closing. */
			async releaseBrowserSocket(connection, cleanup) {
				const root = transportRoot(connection);
				const record = this.#connections.get(root);
				if (record === undefined) return;
				let keepSocket = !record.cleanupLease.released;
				let cleanupFailure;
				if (cleanup !== undefined && !record.cleanupLease.released) {
					try {
						keepSocket = await cleanup();
					} catch (cause) {
						keepSocket = false;
						cleanupFailure = cause;
					}
				}
				const mustCloseImmediately = !keepSocket || !root.isReusable() || record.failure !== undefined;
				if (record.activeLeases > 0) record.activeLeases -= 1;
				const canStayOpen = !mustCloseImmediately && !this.#closing && !record.evicted;
				const admitted = record.reusableUrl !== undefined && this.#browserSockets.get(record.reusableUrl) === root;
				const retain = canStayOpen && (admitted || record.activeLeases > 0);
				if (!retain) this.#evictRecord(record);
				try {
					if (mustCloseImmediately || !retain && record.activeLeases === 0) await this.#releaseTransportRecord(record, cleanupFailure);
					if (cleanupFailure !== undefined) {
						const failure = cleanupFailure instanceof CdpTransportCleanupFailure ? cleanupFailure : cleanupError(record, cleanupFailure);
						throw failure;
					}
				} finally {
					if (record.activeLeases === 0) {
						record.active = false;
						record.settle();
					}
				}
			}
			/** Evict a browser socket after failed discovery or unconfirmed attachment state. */
			async evictBrowserSocket(connection) {
				await this.releaseBrowserSocket(connection, async () => false);
			}
			/** Admit and own one WebSocket from handshake completion onward. */
			async connect(url, operation, options, resource, limits) {
				this.#assertOpen(operation);
				await this.retryPending();
				this.#assertOpen(operation);
				if (options.signal?.aborted === true) throw cancelledBy(operation, options.signal);
				this.#admissions += 1;
				let connection;
				try {
					return await CdpConnection.connect(url, operation, options.signal, limits, (opened) => {
						connection = opened;
						this.register(opened, operation, resource);
					});
				} catch (cause) {
					if (connection === undefined) throw cause;
					try {
						await this.finish(connection);
					} catch (cleanupCause) {
						if (cause instanceof AnalysisError && cleanupCause instanceof AnalysisError) {
							const combined = bindCdpTransportCleanup(cleanupCause, analysisErrorWithCleanupFailure(cause, cleanupCause, operation));
							composedConnectCleanupFailures.set(combined, {
								primary: cause,
								cleanupFailure: cleanupCause
							});
							throw combined;
						}
						throw new AggregateError([cause, cleanupCause], `CDP operation ${operation} failed during handshake and cleanup remains incomplete.`, { cause });
					}
					throw cause;
				} finally {
					this.#admissions -= 1;
					if (this.#admissions === 0) {
						for (const resolve of this.#admissionWaiters) resolve();
						this.#admissionWaiters.clear();
					}
				}
			}
			/** Register synchronously before awaiting the WebSocket handshake. */
			register(connection, operation, resource) {
				const root = transportRoot(connection);
				let settle = () => undefined;
				const settled = new Promise((resolve) => {
					settle = resolve;
				});
				this.#connections.set(root, {
					connection: root,
					operation,
					resource,
					cleanupLease: new AnalysisCleanupLease(() => root.close(), [resource]),
					active: true,
					activeLeases: 1,
					settled,
					settle,
					reusableUrl: undefined,
					evicted: false,
					closingTransport: false,
					statusUnsubscribe: undefined,
					cleanup: undefined,
					cleanupAttempted: false,
					failure: undefined
				});
			}
			/** Finish one admitted operation, retaining a failed transport for retry. */
			async finish(connection, cleanup) {
				const root = transportRoot(connection);
				const record = this.#connections.get(root);
				if (record === undefined) return;
				if (record.failure !== undefined) throw record.failure;
				this.#evictRecord(record);
				record.cleanup ??= cleanup;
				record.activeLeases = 0;
				try {
					if (!record.cleanupAttempted && record.cleanup !== undefined) {
						record.cleanupAttempted = true;
						await record.cleanup();
					}
					await this.#releaseTransportRecord(record);
				} catch (cause) {
					const failure = cause instanceof CdpTransportCleanupFailure ? cause : cleanupError(record, cause);
					record.failure = failure;
					throw failure;
				} finally {
					record.active = false;
					record.settle();
				}
			}
			/** Close retained browser sockets and retry failed transports after active peers finish. */
			async close() {
				this.#closing = true;
				this.#browserSockets.clear();
				this.#candidateBrowserSockets.clear();
				this.#closePromise ??= this.#closeAll().catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			/** Retry retained failures, including failed shared-socket closes with active peers. */
			async retryPending() {
				const failures = [];
				for (const record of this.#connections.values()) {
					const needsRelease = !record.cleanupLease.released && (record.failure !== undefined || record.closingTransport || !record.active && record.evicted);
					if (!needsRelease) continue;
					try {
						await this.#releaseTransportRecord(record);
					} catch (cause) {
						if (cause instanceof CdpTransportCleanupFailure) failures.push(cause);
						else throw cause;
					}
				}
				if (failures.length === 1) throw failures[0];
				if (failures.length > 1) throw aggregateCleanupFailures(failures);
			}
			#assertOpen(operation) {
				if (!this.#closing) return;
				throw new AnalysisCapabilityUnavailableError("rea-cdp-browser", operation, "CDP provider is closing and cannot admit another session.");
			}
			#evictRecord(record) {
				record.evicted = true;
				if (record.reusableUrl !== undefined) {
					if (this.#browserSockets.get(record.reusableUrl) === record.connection) this.#browserSockets.delete(record.reusableUrl);
					if (this.#candidateBrowserSockets.get(record.reusableUrl) === record.connection) this.#candidateBrowserSockets.delete(record.reusableUrl);
				}
				record.statusUnsubscribe?.();
				record.statusUnsubscribe = undefined;
			}
			async #releaseTransportRecord(record, primaryCleanupCause) {
				record.closingTransport = true;
				record.statusUnsubscribe?.();
				record.statusUnsubscribe = undefined;
				try {
					await record.cleanupLease.release();
					record.closingTransport = false;
					record.failure = undefined;
					if (record.activeLeases === 0) this.#connections.delete(record.connection);
				} catch (cause) {
					const combinedCause = primaryCleanupCause === undefined ? cause : new AggregateError([primaryCleanupCause, cause], "Target cleanup and CDP transport close both failed.", { cause: primaryCleanupCause });
					const failure = cleanupError(record, combinedCause);
					record.failure = failure;
					throw failure;
				}
			}
			async #closeAll() {
				while (this.#admissions > 0) await new Promise((resolve) => this.#admissionWaiters.add(resolve));
				while (true) {
					const active = [...this.#connections.values()].filter(({ active }) => active);
					if (active.length === 0) break;
					await Promise.all(active.map(({ settled }) => settled));
				}
				const failures = [];
				for (const record of this.#connections.values()) {
					this.#evictRecord(record);
					try {
						await this.#releaseTransportRecord(record);
					} catch (cause) {
						if (cause instanceof CdpTransportCleanupFailure) failures.push(cause);
						else throw cause;
					}
				}
				if (failures.length === 1) throw failures[0];
				if (failures.length > 1) throw aggregateCleanupFailures(failures);
			}
		};
		transportRoot = (connection) => connection.transportRoot ?? connection;
		rebindPendingConnectFailure = (cause, waiter) => {
			if (cause instanceof BrowserObservationError) {
				const rebound = cause.forOperation(waiter.operation);
				return withInheritedCleanupOwnership(rebound, cause);
			}
			if (cause instanceof AnalysisCancelledError) {
				const rebound = cancelledBy(waiter.operation, carriedReason(waiter.signal?.reason ?? cause.cause), { cleanup: cause.cleanup });
				return withInheritedCleanupOwnership(rebound, cause);
			}
			if (cause instanceof AnalysisError) {
				const composed = composedConnectCleanupFailures.get(cause);
				if (composed !== undefined) {
					const reboundPrimary = rebindPendingConnectFailure(composed.primary, waiter);
					if (reboundPrimary instanceof AnalysisError && reboundPrimary !== composed.primary) {
						const reboundComposed = bindCdpTransportCleanup(composed.cleanupFailure, analysisErrorWithCleanupFailure(reboundPrimary, composed.cleanupFailure, waiter.operation));
						composedConnectCleanupFailures.set(reboundComposed, {
							primary: reboundPrimary,
							cleanupFailure: composed.cleanupFailure
						});
						return reboundComposed;
					}
					return cause;
				}
			}
			if (cause instanceof CdpTransportCleanupFailure && cause.operation !== waiter.operation) {
				return new CdpTransportCleanupFailure(cause.cleanupLeases, {
					resources: cause.cleanupResources,
					operation: waiter.operation,
					diagnostics: cause.diagnostics ?? {},
					cause: cause.transportCause
				});
			}
			return cause;
		};
		cleanupError = (record, cause) => new CdpTransportCleanupFailure([record.cleanupLease], {
			resources: [record.resource],
			operation: record.operation,
			cause,
			diagnostics: { reason: cause instanceof AnalysisError ? cause.userMessage ?? cause.message : errorMessage(cause) }
		});
		aggregateCleanupFailures = (failures) => new CdpTransportCleanupFailure(failures.flatMap((failure) => failure.cleanupLeases), {
			resources: failures.flatMap(({ cleanupResources }) => cleanupResources),
			operation: "close_cdp_transports",
			cause: new AggregateError(failures, "One or more REA-owned CDP transports remain open."),
			diagnostics: { failures: failures.map(({ message, diagnostics }) => ({
				message,
				diagnostics: diagnostics ?? {}
			})) }
		});
	})))();
}

//#endregion
export { initiatorLocation as $, admitCdpReply as A, captureFrames as B, parseCdpEndpointValue as C, parseCdpDiscoveryTargets as D, init_CdpDiscoveryTargets as E, reportedFrameUrl as F, init_CdpCaptureDocuments as G, classifyCdpFrameUrl as H, init_CdpFrameIdentity as I, init_CdpCaptureDomNamespaces as J, snapshotDocuments as K, selectCdpFrameIdentity as L, init_CdpCommands as M, init_CdpFrameTree as N, selectCdpDiscoveryTarget as O, observedFrameUrl as P, init_CdpCaptureEventHelpers as Q, captureAccessibility as R, init_CdpEndpoint as S, withCdpDiscoveryDeadline as T, emptyDomCapture as U, captureResources as V, excludeDocumentEvidence as W, consolePrimitive as X, cdpSourceCoordinates as Y, exclusionReasonForUrl as Z, isCdpSessionGoneRejection as _, sourceResult as _t, init_CdpConnection as a, snapshotNodeAt as at, discoverCdpEndpoint as b, init_CdpEvents as c, allowedSanitizedUrl as ct, init_CdpScriptContextFacts as d, init_CdpCaptureValues as dt, isJsonContentType as et, selectCdpScriptFrame as f, isHttpUrl as ft, init_CdpCommandRejection as g, sourceExcluded as gt, CdpCommandRejection as h, recordsValue as ht, CdpConnection as i, snapshotDocumentNodes as it, assertCdpCommand as j, CdpMalformedReply as k, registeredCdpEvent as l, cdpStringValue as lt, scopeCdpResponse as m, recordValue as mt, bindCdpTransportCleanup as n, topCallFrame as nt, assertCdpEvent as o, cdpSnapshotString as ot, init_CdpNetworkEventFacts as p, numberValue as pt, capturedSvgNodeKind as q, init_CdpTargetSessionOwner as r, init_CdpSnapshotNodes as rt, cdpFrameEvent as s, init_CdpSnapshotStrings as st, CdpTargetSessionOwner as t, isJsonMediaType as tt, cdpContextFrameClaim as u, delayWithCancellation as ut, cdpTargetWebSocket as v, readCdpJson as w, hasCdpTargetWebSocket as x, discoverCdpBrowserSocket as y, captureDom as z };