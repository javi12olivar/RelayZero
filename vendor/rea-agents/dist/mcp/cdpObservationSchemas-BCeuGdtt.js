import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { it as sha256Hex, rt as init_sha256Hex } from "./canonicalDigest-DUQN3Yyz.js";
import { n as urlDeclaresQueryOrFragment, t as init_urlComponents } from "./urlComponents-CGbK3-fc.js";
import { a as init_targetIdentity, l as unknownTarget } from "./targetIdentity-ZgCbCvWA.js";
import { f as init_browserDeadline, o as browserDiscoveryTimeoutSchema, v as webRuntimeCommandTimeoutSchema } from "./browserDeadline-CtCyBFlP.js";
import { z } from "zod";

//#region dist/domain/recordedTransportUrl.js
/** Separator coordinates shared by name projection and selected-value matching. */
function* queryFields(query) {
	let start = query.startsWith("?") ? 1 : 0;
	let equals = query.indexOf("=", start);
	while (start < query.length) {
		const separator = query.indexOf("&", start);
		const end = separator < 0 ? query.length : separator;
		if (end > start) yield [
			start,
			equals >= start && equals < end ? equals : end,
			end
		];
		start = end + 1;
		if (equals >= 0 && equals < start) equals = query.indexOf("=", start);
	}
}
/** Scan one field at a time; selection avoids decoding unrelated values. */
function* iterateUrlQueryParameters(query, selected) {
	for (const [start, nameEnd, end] of queryFields(query)) {
		const name = formComponent(query.slice(start, nameEnd));
		if (selected === undefined || selected.has(name)) yield [name, formComponent(nameEnd < end ? query.slice(nameEnd + 1, end) : "")];
	}
}
/** WHATWG form-query names, preserving order, repeats and empty names without decoding values. */
function* parseUrlQueryParameterNames(query) {
	for (const [start, nameEnd] of queryFields(query)) yield formComponent(query.slice(start, nameEnd));
}
var parseRecordedTransportUrl, formComponent, singleQueryValues, recordedPathSegments, redactRecordedTransportUrl;
function init_recordedTransportUrl() {
	return (init_recordedTransportUrl = __esmMin((() => {
		parseRecordedTransportUrl = (value, options = {}) => {
			const prefix = /^[\x00-\x20]*(?:([A-Za-z][A-Za-z0-9+.-]*):)?\/\//u.exec(value);
			const absolute = URL.parse(value);
			const credentialBase = options.credentialBaseUrl === undefined ? null : URL.parse(options.credentialBaseUrl);
			if (credentialBase !== null) {
				credentialBase.username = "";
				credentialBase.password = "";
			}
			const parsed = credentialBase === null ? absolute ?? URL.parse(value, "https://rea.invalid") : URL.parse(value, credentialBase);
			const hasCredentials = parsed !== null && (parsed.username !== "" || parsed.password !== "");
			const origin = absolute !== null && absolute.origin !== "null" ? absolute.origin : null;
			if (prefix === null) return {
				origin,
				path: null,
				credentials: hasCredentials ? "ambiguous" : null
			};
			const authorityStart = prefix[0].length;
			const protocol = parsed?.protocol ?? `${prefix[1]?.toLowerCase() ?? "https"}:`;
			const special = [
				"ftp:",
				"file:",
				"http:",
				"https:",
				"ws:",
				"wss:"
			].includes(protocol);
			let authorityEnd = authorityStart;
			while (authorityEnd < value.length && !"/?#".includes(value[authorityEnd]) && !(special && value[authorityEnd] === "\\")) authorityEnd += 1;
			const authority = value.slice(authorityStart, authorityEnd);
			const stableAuthority = authority.length > 0 && !/[\t\n\r]/u.test(authority);
			const at = authority.lastIndexOf("@");
			const credentials = !stableAuthority && hasCredentials ? "ambiguous" : at >= 0 ? {
				start: authorityStart,
				end: authorityStart + at + 1
			} : hasCredentials ? "ambiguous" : null;
			if (origin === null || !/^[A-Za-z][A-Za-z0-9+.-]*:\/\//u.test(value) || !stableAuthority || special && value[authorityEnd] === "\\") return {
				origin,
				path: null,
				credentials
			};
			const hash = value.indexOf("#", authorityEnd);
			const question = value.indexOf("?", authorityEnd);
			const hasQuery = question >= 0 && (hash < 0 || question < hash);
			const query = options.includeQuery === true ? { query: absolute.search || (hasQuery ? "?" : "") } : {};
			if (value[authorityEnd] !== "/") return {
				origin,
				path: "/",
				credentials,
				...query
			};
			let pathEnd = authorityEnd;
			while (pathEnd < value.length && !"?#".includes(value[pathEnd])) pathEnd += 1;
			return {
				origin,
				path: value.slice(authorityEnd, pathEnd),
				credentials,
				...query
			};
		};
		formComponent = (raw) => {
			if (!/[%+\uD800-\uDFFF]/u.test(raw)) return raw;
			if (!/[\uD800-\uDFFF]/u.test(raw)) {
				try {
					return decodeURIComponent(raw.replaceAll("+", " "));
				} catch {}
			}
			return new URLSearchParams(`value=${raw}`).get("value") ?? "";
		};
		singleQueryValues = (query) => {
			const values = new Map();
			for (const [name, value] of iterateUrlQueryParameters(query ?? "")) {
				if (values.has(name) && values.get(name) !== value) return undefined;
				values.set(name, value);
			}
			return values;
		};
		recordedPathSegments = (path, indexes) => {
			const needed = new Set();
			for (const index of indexes) if (Number.isSafeInteger(index) && index >= 0) needed.add(index);
			const result = new Map();
			if (needed.size === 0) return result;
			let start = path.indexOf("/");
			if (start < 0) return result;
			start += 1;
			let index = 0;
			while (needed.size > 0) {
				const end = path.indexOf("/", start);
				if (needed.delete(index)) result.set(index, path.slice(start, end < 0 ? path.length : end));
				if (end < 0) break;
				start = end + 1;
				index += 1;
			}
			return result;
		};
		redactRecordedTransportUrl = (value) => {
			if (value === null) return {
				url: null,
				url_credentials_redacted: false
			};
			const { credentials } = parseRecordedTransportUrl(value);
			if (credentials === null) return {
				url: value,
				url_credentials_redacted: false
			};
			if (credentials === "ambiguous") return {
				url: null,
				url_credentials_redacted: true
			};
			return {
				url: value.slice(0, credentials.start) + value.slice(credentials.end),
				url_credentials_redacted: true
			};
		};
	})))();
}

//#endregion
//#region dist/domain/browserObservation.js
var browserResponseStatusSchema, parseExactOrigin, browserOriginSchema, recordedBrowserOriginSchema, isLiteralLoopbackHostname, HTTP_ENDPOINT_MESSAGE, BROWSER_SOCKET_PATH, REDACTED_BROWSER_SOCKET_PATH, explicitEndpointAuthority, httpDiscoveryOrigin, browserSocketAuthority, browserEndpointSchema, browserObservationEndpointSchema, recordedBrowserObservationEndpointSchema, browserAllowedOriginsSchema, browserInput, listBrowserTargetsInputSchema, inspectWebPageInputFacts, inspectWebPageWithoutSourceSchema, inspectWebPageWithSourceShapeSchema, refineInspectWebPageInput, inspectWebPageWithSourceInputSchema, inspectWebPageInputSchema, sanitizedBrowserUrlSchema, observeBrowserUrl, sanitizeBrowserUrl, removeUrlUserInfo, credentialFreeHref, browserUrlTargetIdentity, sanitizeEndpointCandidate;
function init_browserObservation() {
	return (init_browserObservation = __esmMin((() => {
		init_browserDeadline();
		init_urlComponents();
		init_recordedTransportUrl();
		init_targetIdentity();
		browserResponseStatusSchema = z.int().min(100).max(999);
		parseExactOrigin = (value) => {
			let url;
			try {
				url = new URL(value);
			} catch (cause) {
				void cause;
				return undefined;
			}
			if (url.protocol !== "http:" && url.protocol !== "https:" || url.hostname.includes("*") || url.username !== "" || url.password !== "" || url.pathname !== "/" || urlDeclaresQueryOrFragment(url)) return undefined;
			return url.origin;
		};
		browserOriginSchema = z.string().min(1).transform((value, context) => {
			const origin = parseExactOrigin(value);
			if (origin === undefined) {
				context.addIssue({
					code: "custom",
					message: "Expected one exact HTTP(S) origin without a path or wildcard"
				});
				return z.NEVER;
			}
			return origin;
		});
		recordedBrowserOriginSchema = z.string().superRefine((value, context) => {
			const parsed = browserOriginSchema.safeParse(value);
			if (parsed.success && parsed.data === value) return;
			context.addIssue({
				code: "custom",
				message: "Expected one canonical HTTP(S) origin"
			});
		});
		isLiteralLoopbackHostname = (hostname) => hostname === "127.0.0.1" || hostname === "[::1]" || hostname === "::1";
		HTTP_ENDPOINT_MESSAGE = "CDP endpoint must be an explicit-port HTTP URL on 127.0.0.1 or ::1";
		BROWSER_SOCKET_PATH = "/devtools/browser/";
		REDACTED_BROWSER_SOCKET_PATH = `${BROWSER_SOCKET_PATH}[REDACTED]`;
		explicitEndpointAuthority = (value, url) => {
			const authority = /^[a-z][a-z0-9+.-]*:\/\/([^/?#\\]*)/iu.exec(value)?.[1];
			const port = authority === undefined ? undefined : /:([0-9]+)$/u.exec(authority)?.[1];
			return port === undefined ? undefined : `${url.protocol}//${url.hostname}:${String(Number(port))}`;
		};
		httpDiscoveryOrigin = (value, url) => url.protocol === "http:" && isLiteralLoopbackHostname(url.hostname) && url.username === "" && url.password === "" && url.pathname === "/" && !urlDeclaresQueryOrFragment(url) ? explicitEndpointAuthority(value, url) : undefined;
		browserSocketAuthority = (value, url) => {
			const id = url.pathname.slice(BROWSER_SOCKET_PATH.length);
			return url.protocol === "ws:" && isLiteralLoopbackHostname(url.hostname) && url.username === "" && url.password === "" && !urlDeclaresQueryOrFragment(url) && url.pathname.startsWith(BROWSER_SOCKET_PATH) && id.length > 0 && !id.includes("/") ? explicitEndpointAuthority(value, url) : undefined;
		};
		browserEndpointSchema = z.string().min(1).transform((value, context) => {
			const url = URL.parse(value);
			const origin = url === null ? undefined : httpDiscoveryOrigin(value, url);
			if (origin !== undefined) return origin;
			context.addIssue({
				code: "custom",
				message: url === null ? "Invalid CDP endpoint URL" : HTTP_ENDPOINT_MESSAGE
			});
			return z.NEVER;
		});
		browserObservationEndpointSchema = z.string().min(1).describe("Literal loopback CDP endpoint: http://127.0.0.1:PORT, or ws://127.0.0.1:PORT/devtools/browser/ID.").transform((value, context) => {
			const url = URL.parse(value);
			if (url === null) {
				context.addIssue({
					code: "custom",
					message: "Invalid CDP endpoint URL"
				});
				return z.NEVER;
			}
			const origin = httpDiscoveryOrigin(value, url);
			if (origin !== undefined) return {
				transport: "http_discovery",
				url: origin,
				recorded: origin
			};
			const authority = browserSocketAuthority(value, url);
			if (authority !== undefined) return {
				transport: "browser_websocket",
				url: `${authority}${url.pathname}`,
				recorded: `${authority}${REDACTED_BROWSER_SOCKET_PATH}`
			};
			context.addIssue({
				code: "custom",
				message: url.protocol === "ws:" ? "CDP browser WebSocket must be ws://127.0.0.1:PORT/devtools/browser/ID or ws://[::1]:PORT/devtools/browser/ID" : HTTP_ENDPOINT_MESSAGE
			});
			return z.NEVER;
		});
		recordedBrowserObservationEndpointSchema = z.string().min(1).refine((value) => {
			const url = URL.parse(value);
			return url !== null && (httpDiscoveryOrigin(value, url) !== undefined || browserSocketAuthority(value, url) !== undefined && url.pathname === REDACTED_BROWSER_SOCKET_PATH);
		}, { message: "Recorded CDP endpoint must be a loopback HTTP origin or a redacted browser WebSocket URL" });
		browserAllowedOriginsSchema = z.array(browserOriginSchema).transform((origins) => Array.from(new Set(origins)).sort()).default([]);
		browserInput = {
			cdp_endpoint: browserObservationEndpointSchema,
			allowed_origins: browserAllowedOriginsSchema,
			discovery_timeout_ms: browserDiscoveryTimeoutSchema
		};
		listBrowserTargetsInputSchema = z.strictObject({ ...browserInput });
		inspectWebPageInputFacts = {
			...browserInput,
			target_id: z.string().min(1),
			command_timeout_ms: webRuntimeCommandTimeoutSchema,
			observation_ms: z.int().min(0).default(500),
			include_accessibility_text: z.boolean().default(false),
			include_console_text: z.boolean().default(false),
			include_json_body_shapes: z.boolean().default(false),
			include_websocket_shapes: z.boolean().default(false),
			include_storage_keys: z.boolean().default(false),
			include_storage_fingerprints: z.boolean().default(false)
		};
		inspectWebPageWithoutSourceSchema = z.strictObject({
			...inspectWebPageInputFacts,
			include_script_sources: z.literal(false).optional().default(false)
		});
		inspectWebPageWithSourceShapeSchema = z.strictObject({
			...inspectWebPageInputFacts,
			include_script_sources: z.literal(true).default(true)
		});
		refineInspectWebPageInput = (input, context) => {
			if (input.include_storage_fingerprints && !input.include_storage_keys) context.addIssue({
				code: "custom",
				path: ["include_storage_fingerprints"],
				message: "Storage fingerprints require storage key capture"
			});
		};
		inspectWebPageWithSourceInputSchema = inspectWebPageWithSourceShapeSchema.superRefine(refineInspectWebPageInput);
		inspectWebPageInputSchema = z.discriminatedUnion("include_script_sources", [inspectWebPageWithoutSourceSchema.superRefine(refineInspectWebPageInput), inspectWebPageWithSourceShapeSchema.extend({ include_script_sources: z.literal(true) }).superRefine(refineInspectWebPageInput)]);
		sanitizedBrowserUrlSchema = z.object({
			url: z.string(),
			origin: z.string().nullable(),
			query_parameter_names: z.array(z.string()),
			redacted: z.boolean()
		});
		observeBrowserUrl = (value) => {
			let parsed;
			try {
				parsed = new URL(value);
			} catch (cause) {
				void cause;
				return {
					kind: "malformed",
					source: value
				};
			}
			const hadCredentials = parsed.username !== "" || parsed.password !== "";
			return {
				kind: "parsed",
				source: value,
				protocol: parsed.protocol,
				sanitized: {
					url: hadCredentials ? removeUrlUserInfo(value, parsed) : value,
					origin: parsed.origin === "null" ? null : parsed.origin,
					query_parameter_names: [...parseUrlQueryParameterNames(parsed.search)],
					redacted: hadCredentials
				}
			};
		};
		sanitizeBrowserUrl = (value) => {
			const observation = observeBrowserUrl(value);
			return observation.kind === "parsed" ? observation.sanitized : {
				url: observation.source,
				origin: null,
				query_parameter_names: [],
				redacted: false
			};
		};
		removeUrlUserInfo = (value, parsed) => {
			const { credentials } = parseRecordedTransportUrl(value);
			return credentials === null || credentials === "ambiguous" ? credentialFreeHref(parsed) : `${value.slice(0, credentials.start)}${value.slice(credentials.end)}`;
		};
		credentialFreeHref = (parsed) => {
			parsed.username = "";
			parsed.password = "";
			return parsed.href;
		};
		browserUrlTargetIdentity = (value) => {
			const observation = observeBrowserUrl(value);
			return observation.kind === "parsed" ? {
				kind: "url",
				url: observation.sanitized.url,
				origin: observation.sanitized.origin
			} : unknownTarget("not-observed");
		};
		sanitizeEndpointCandidate = (value) => {
			return sanitizeBrowserUrl(value).url;
		};
	})))();
}

//#endregion
//#region dist/domain/webContentArtifact.js
var webTextFacts, webTextArtifactMetadataSchema, webTextArtifactSchema, createWebTextArtifact;
function init_webContentArtifact() {
	return (init_webContentArtifact = __esmMin((() => {
		init_sha256Hex();
		webTextFacts = (text) => ({
			sha256: sha256Hex(text),
			utf8Bytes: Buffer.byteLength(text),
			utf16Units: text.length
		});
		webTextArtifactMetadataSchema = z.object({
			sha256: z.string().regex(/^[a-f0-9]{64}$/u),
			bytes: z.int().min(0),
			media_type: z.string().min(1),
			charset: z.literal("utf-8")
		});
		webTextArtifactSchema = webTextArtifactMetadataSchema.extend({ text: z.string() }).superRefine((artifact, context) => {
			const facts = webTextFacts(artifact.text);
			if (artifact.bytes !== facts.utf8Bytes) context.addIssue({
				code: "custom",
				path: ["bytes"],
				message: "Byte count mismatch"
			});
			if (artifact.sha256 !== facts.sha256) context.addIssue({
				code: "custom",
				path: ["sha256"],
				message: "Digest mismatch"
			});
		});
		createWebTextArtifact = (text, mediaType) => {
			const facts = webTextFacts(text);
			return {
				sha256: facts.sha256,
				bytes: facts.utf8Bytes,
				media_type: mediaType,
				charset: "utf-8",
				text
			};
		};
	})))();
}

//#endregion
//#region dist/domain/cdpObservationSchemas.js
var cdpResourceColumnSchema, cdpDomNodeSchema, cdpDomSnapshotSchema, cdpScriptSourceSchema, cdpScriptMetadataSchema;
function init_cdpObservationSchemas() {
	return (init_cdpObservationSchemas = __esmMin((() => {
		init_webContentArtifact();
		cdpResourceColumnSchema = z.int();
		cdpDomNodeSchema = z.object({
			index: z.number().int().min(0),
			parent_index: z.number().int().min(-1),
			node_type: z.number().int().min(0),
			node_name: z.string(),
			node_value_length: z.number().int().min(0).describe("Length in the enclosing DOM snapshot's node_value_length_unit."),
			attribute_names: z.array(z.string())
		});
		cdpDomSnapshotSchema = z.object({
			total_nodes: z.int().min(0),
			node_value_length_unit: z.enum(["utf16-code-units", "utf8-bytes"]).describe("Unit for all node_value_length values."),
			nodes: z.array(cdpDomNodeSchema)
		});
		cdpScriptSourceSchema = z.discriminatedUnion("included", [z.object({
			included: z.literal(false),
			reason: z.string()
		}), z.object({
			included: z.literal(true),
			artifact: webTextArtifactSchema
		})]);
		cdpScriptMetadataSchema = z.object({
			cdp_hash: z.string().nullable().describe("Producer-reported script hash; null when unavailable."),
			length: z.number().int().min(0).nullable().describe("Producer-reported script length; null when unavailable."),
			is_module: z.boolean().nullable().describe("Producer-reported module classification; null when unavailable."),
			language: z.string().nullable()
		});
	})))();
}

//#endregion
export { parseRecordedTransportUrl as A, recordedBrowserObservationEndpointSchema as C, sanitizedBrowserUrlSchema as D, sanitizeEndpointCandidate as E, recordedPathSegments as M, redactRecordedTransportUrl as N, init_recordedTransportUrl as O, singleQueryValues as P, observeBrowserUrl as S, sanitizeBrowserUrl as T, init_browserObservation as _, init_cdpObservationSchemas as a, isLiteralLoopbackHostname as b, webTextArtifactMetadataSchema as c, browserAllowedOriginsSchema as d, browserEndpointSchema as f, browserUrlTargetIdentity as g, browserResponseStatusSchema as h, cdpScriptSourceSchema as i, parseUrlQueryParameterNames as j, iterateUrlQueryParameters as k, webTextArtifactSchema as l, browserOriginSchema as m, cdpResourceColumnSchema as n, createWebTextArtifact as o, browserObservationEndpointSchema as p, cdpScriptMetadataSchema as r, init_webContentArtifact as s, cdpDomSnapshotSchema as t, webTextFacts as u, inspectWebPageInputSchema as v, recordedBrowserOriginSchema as w, listBrowserTargetsInputSchema as x, inspectWebPageWithSourceInputSchema as y };