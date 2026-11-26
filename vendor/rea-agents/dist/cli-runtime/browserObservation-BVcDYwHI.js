import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { MAX_NODE_TIMER_DELAY_MS, deadlineParameterLimit, init_analysisResourceLimits, timerDurationMsSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_urlComponents, urlDeclaresQueryOrFragment } from "./urlComponents-DJm-wtqY.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { z } from "zod";

//#region dist/domain/browserDeadline.js
var DEFAULT_CDP_COMMAND_TIMEOUT_MS, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS, CDP_CLEANUP_GRACE_MS, optionalBrowserDeadlineMs, selectedBrowserDeadlineMs, browserDeadlineIncrease, browserDeadlineRetry, noRuntimeOverrideSentence, webRuntimeCommandTimeoutSchema, browserDiscoveryTimeoutSchema, DISCOVERY_TIMEOUT_OPERATIONS, cdpDiscoveryTimeoutIsSelectable, COMMAND_TIMEOUT_OPERATIONS, cdpCommandTimeoutIsSelectable, cdpCommandTimeoutUnrelatedControl, cdpDeadlineSubject, cdpCommandDeadlineRecovery, cdpDiscoveryTimeoutRecovery, cdpCleanupGraceExpired, selectedCdpCommandTimeoutMs, selectedCdpDiscoveryTimeoutMs;
function init_browserDeadline() {
	return (init_browserDeadline = __esmMin((() => {
		init_analysisResourceLimits();
		DEFAULT_CDP_COMMAND_TIMEOUT_MS = 2e4;
		CDP_DISCOVERY_RESPONSE_TIMEOUT_MS = 1e4;
		CDP_CLEANUP_GRACE_MS = 5e3;
		optionalBrowserDeadlineMs = (description) => timerDurationMsSchema.optional().describe(description);
		selectedBrowserDeadlineMs = (selected, defaultMs) => selected ?? defaultMs;
		browserDeadlineIncrease = (key, timeoutMs, defaultMs) => timeoutMs < 2147483647 ? `Increase ${key} above ${String(timeoutMs)} (integer milliseconds from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}; omitted means ${String(defaultMs)}).` : `${key} is already at the maximum ${String(MAX_NODE_TIMER_DELAY_MS)} ms; do not increase it further.`;
		browserDeadlineRetry = "Applies on the next call. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.";
		noRuntimeOverrideSentence = (allowance, unrelatedControl) => `${allowance} This release has no runtime override.${unrelatedControl === undefined ? "" : ` ${unrelatedControl} does not raise it.`}`;
		webRuntimeCommandTimeoutSchema = optionalBrowserDeadlineMs(`CDP WebSocket handshake and per-command response deadline in milliseconds (default ${String(DEFAULT_CDP_COMMAND_TIMEOUT_MS)}). Omitted means ${String(DEFAULT_CDP_COMMAND_TIMEOUT_MS)} and applies on the next call. deadlineExpired for a handshake or command is not the caller observation window, not the CDP discovery deadline (default ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ms, or discovery_timeout_ms where supported), and not the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace. It also bounds passive script-source collection and the inspection/source-join phase that share this deadline. Does not raise the fixed protocol, retained-event, or source byte budgets, or the cleanup grace, which have no runtime override.`);
		browserDiscoveryTimeoutSchema = optionalBrowserDeadlineMs(`Loopback CDP HTTP discovery per-response deadline and browser-socket handshake plus discovery (Browser.getVersion, Target.getTargets) deadline in milliseconds (default ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)}). Omitted means ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} and applies on the next call. Separate from command_timeout_ms, the caller observation window, and the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace. Does not raise the fixed HTTP discovery document or WebSocket protocol byte budgets, which have no runtime override.`);
		DISCOVERY_TIMEOUT_OPERATIONS = new Set([
			"list_browser_targets",
			"inspect_web_page",
			"analyze_web_bundle",
			"observe_web_session",
			"discover_webmcp_tools",
			"capture_web_screenshot"
		]);
		cdpDiscoveryTimeoutIsSelectable = (operation) => DISCOVERY_TIMEOUT_OPERATIONS.has(operation);
		COMMAND_TIMEOUT_OPERATIONS = new Set([
			"inspect_web_page",
			"analyze_web_bundle",
			"observe_web_session",
			"observe_web_execution",
			"inspect_web_event_listeners",
			"discover_webmcp_tools",
			"capture_web_screenshot",
			"inspect_electron_page",
			"capture_browser_scenario"
		]);
		cdpCommandTimeoutIsSelectable = (operation) => COMMAND_TIMEOUT_OPERATIONS.has(operation);
		cdpCommandTimeoutUnrelatedControl = (operation) => cdpCommandTimeoutIsSelectable(operation) ? "command_timeout_ms" : undefined;
		cdpDeadlineSubject = (timeoutMs, phase, method, selectable) => {
			const budget = selectable ? `${String(timeoutMs)} ms command_timeout_ms` : `fixed ${String(timeoutMs)} ms`;
			if (phase === "handshake") return `CDP WebSocket handshake exceeded its ${budget} deadline (deadlineExpired).`;
			if (phase === "source-join") return `The inspection/source-join phase exceeded its ${budget} deadline (deadlineExpired).`;
			return `CDP command ${method ?? "request"} exceeded its ${budget} response deadline (deadlineExpired).`;
		};
		cdpCommandDeadlineRecovery = (timeoutMs, phase, method, selectable = true) => {
			const subject = cdpDeadlineSubject(timeoutMs, phase, method, selectable);
			if (!selectable) {
				const fixed = noRuntimeOverrideSentence(`${subject} This is not the caller observation window and not the ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ms CDP discovery deadline.`);
				return {
					userMessage: fixed,
					remediationAction: fixed
				};
			}
			return {
				userMessage: `${subject} This is not the caller observation window, not the ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ms CDP discovery deadline, and not the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace.`,
				limit: deadlineParameterLimit("command_timeout_ms", timeoutMs, DEFAULT_CDP_COMMAND_TIMEOUT_MS),
				remediationAction: `${browserDeadlineIncrease("command_timeout_ms", timeoutMs, DEFAULT_CDP_COMMAND_TIMEOUT_MS)} ${browserDeadlineRetry} command_timeout_ms does not raise the CDP discovery deadline (default ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ms, or discovery_timeout_ms where supported), nor the fixed protocol, retained-event, or source byte budgets or the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace, which have no runtime override.`
			};
		};
		cdpDiscoveryTimeoutRecovery = (operation, timeoutMs, phase, budgetDescription) => {
			const unrelatedCommand = cdpCommandTimeoutUnrelatedControl(operation);
			if (!cdpDiscoveryTimeoutIsSelectable(operation)) {
				const subject = phase === "response" ? `CDP discovery response exceeded its ${String(timeoutMs)} ms deadline.` : `CDP browser-socket discovery exceeded its ${String(timeoutMs)} ms deadline.`;
				const fixed = noRuntimeOverrideSentence(`${budgetDescription} and the ${String(timeoutMs)} ms discovery deadline stay fixed.`, unrelatedCommand);
				return {
					userMessage: `${subject} ${fixed}`,
					remediationAction: fixed
				};
			}
			const subject = phase === "response" ? `CDP discovery response exceeded its ${String(timeoutMs)} ms discovery_timeout_ms deadline (deadlineExpired).` : `CDP browser-socket discovery exceeded its ${String(timeoutMs)} ms discovery_timeout_ms deadline (deadlineExpired).`;
			const fixedBudget = noRuntimeOverrideSentence(`${budgetDescription} stays fixed.`, unrelatedCommand);
			return {
				userMessage: `${subject} This is not the caller observation window and not the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace. ${fixedBudget}`,
				remediationAction: `${browserDeadlineIncrease("discovery_timeout_ms", timeoutMs, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ${browserDeadlineRetry} ${fixedBudget}`,
				limit: deadlineParameterLimit("discovery_timeout_ms", timeoutMs, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)
			};
		};
		cdpCleanupGraceExpired = () => noRuntimeOverrideSentence(`CDP runtime cleanup exceeded its ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace.`, "command_timeout_ms");
		selectedCdpCommandTimeoutMs = (selected) => selectedBrowserDeadlineMs(selected, DEFAULT_CDP_COMMAND_TIMEOUT_MS);
		selectedCdpDiscoveryTimeoutMs = (selected) => selectedBrowserDeadlineMs(selected, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS);
	})))();
}

//#endregion
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
export { CDP_CLEANUP_GRACE_MS, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS, DEFAULT_CDP_COMMAND_TIMEOUT_MS, browserAllowedOriginsSchema, browserDeadlineIncrease, browserDeadlineRetry, browserDiscoveryTimeoutSchema, browserEndpointSchema, browserObservationEndpointSchema, browserOriginSchema, browserResponseStatusSchema, browserUrlTargetIdentity, cdpCleanupGraceExpired, cdpCommandDeadlineRecovery, cdpCommandTimeoutIsSelectable, cdpCommandTimeoutUnrelatedControl, cdpDiscoveryTimeoutRecovery, init_browserDeadline, init_browserObservation, init_recordedTransportUrl, inspectWebPageInputSchema, inspectWebPageWithSourceInputSchema, isLiteralLoopbackHostname, iterateUrlQueryParameters, listBrowserTargetsInputSchema, noRuntimeOverrideSentence, observeBrowserUrl, optionalBrowserDeadlineMs, parseRecordedTransportUrl, parseUrlQueryParameterNames, recordedBrowserObservationEndpointSchema, recordedBrowserOriginSchema, recordedPathSegments, redactRecordedTransportUrl, sanitizeBrowserUrl, sanitizeEndpointCandidate, sanitizedBrowserUrlSchema, selectedBrowserDeadlineMs, selectedCdpCommandTimeoutMs, selectedCdpDiscoveryTimeoutMs, singleQueryValues, webRuntimeCommandTimeoutSchema };