import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { $t as init_analysisResourceLimits, A as absoluteLocalPathStringSchema, F as IDENTIFIER_PATTERN, V as init_stringPatterns, en as timerDurationMsSchema, j as init_localPath, o as jsonValueSchema, r as init_jsonValue } from "./jsonValue-BIEmjG1z.js";
import { C as browserNetworkContentSelectionSchema, a as browserScenarioCaptureLimitsSchema, c as browserScenarioEventFamilySchema, i as DEFAULT_BROWSER_SCENARIO_CAPTURE_LIMITS, m as init_browserScenarioCaptureValues, o as init_browserScenarioCaptureLimits, w as init_browserNetworkEvidence } from "./browserScenarioCapture-CIaRaHtE.js";
import { _ as init_browserObservation, f as browserEndpointSchema, h as browserResponseStatusSchema, m as browserOriginSchema } from "./cdpObservationSchemas-BCeuGdtt.js";
import { z } from "zod";
import { toUSVString } from "node:util";

//#region dist/domain/explicitSensitiveValues.js
/**
* Every occurrence of any declared literal in `value`, in order. Overlapping
* occurrences (of one literal or of several) merge into one span, so no part
* of an overlapping declaration survives between two replacements. Spans are
* produced lazily with one cursor per literal, so a caller that stops at a
* budget does no further matching work.
*/
function* explicitValueSpans(value, sensitiveValues) {
	const literals = declaredLiterals(sensitiveValues);
	const next = literals.map((literal) => value.indexOf(literal));
	let pending;
	for (;;) {
		let selected = -1;
		for (let index = 0; index < literals.length; index += 1) if (next[index] >= 0 && (selected < 0 || next[index] < next[selected])) selected = index;
		if (selected < 0) break;
		const start = next[selected];
		const end = start + literals[selected].length;
		next[selected] = value.indexOf(literals[selected], start + 1);
		if (pending !== undefined && start < pending.end) pending = {
			start: pending.start,
			end: Math.max(pending.end, end)
		};
		else {
			if (pending !== undefined) yield pending;
			pending = {
				start,
				end
			};
		}
	}
	if (pending !== undefined) yield pending;
}
var TRANSPORT_CREDENTIAL_HEADERS, isTransportCredentialHeader, declaredLiterals, explicitValuesOccurIn, explicitUtf8Spellings, base64Stable, spellingsOf, explicitTextSpellings, explicitUtf16Spellings, lowercasePercentEscapes, redactExplicitText, redactExplicitOutput, cutOffPrefixLength;
function init_explicitSensitiveValues() {
	return (init_explicitSensitiveValues = __esmMin((() => {
		TRANSPORT_CREDENTIAL_HEADERS = new Set([
			"authorization",
			"proxy-authorization",
			"cookie",
			"set-cookie"
		]);
		isTransportCredentialHeader = (name) => TRANSPORT_CREDENTIAL_HEADERS.has(name.toLowerCase());
		declaredLiterals = (values) => [...new Set(values)].filter((literal) => literal !== "").sort((left, right) => right.length - left.length);
		explicitValuesOccurIn = (value, sensitiveValues) => sensitiveValues.some((literal) => literal !== "" && value.includes(literal));
		explicitUtf8Spellings = (sensitiveValues) => declaredLiterals(sensitiveValues).flatMap((value) => {
			const encoded = Buffer.from(value, "utf8");
			return encoded.toString("utf8") === value ? [encoded] : [];
		});
		base64Stable = (bytes, offset) => {
			const encoded = Buffer.concat([Buffer.alloc(offset), bytes]).toString("base64");
			return encoded.slice(Math.ceil(8 * offset / 6), Math.floor(8 * (offset + bytes.length) / 6));
		};
		spellingsOf = (value, spelling) => {
			const scalar = toUSVString(value);
			switch (spelling) {
				case "uri-component": return [encodeURIComponent(scalar)];
				case "uri-query": return [encodeURIComponent(scalar).replace(/'/gu, "%27")];
				case "uri-plus-space": return [encodeURIComponent(scalar).replaceAll("%20", "+")];
				case "form": return [new URLSearchParams([["value", scalar]]).toString().slice("value=".length)];
				case "json-escaped": return [JSON.stringify(value).slice(1, -1)];
				case "hex": {
					const hex = Buffer.from(value, "utf8").toString("hex");
					return [hex, hex.toUpperCase()];
				}
				case "base64": {
					const bytes = Buffer.from(value, "utf8");
					const aligned = [
						0,
						1,
						2
					].map((offset) => base64Stable(bytes, offset));
					return [...aligned, ...aligned.map((text) => text.replaceAll("+", "-").replaceAll("/", "_"))];
				}
			}
		};
		explicitTextSpellings = (value, spellings) => [...new Set(spellings.flatMap((spelling) => spellingsOf(value, spelling)).filter((text) => text !== "" && text !== value))];
		explicitUtf16Spellings = (value) => {
			const little = Buffer.from(value, "utf16le");
			return [little, Buffer.from(little).swap16()];
		};
		lowercasePercentEscapes = (value) => value.includes("%") ? value.replace(/%[0-9a-f]{2}/giu, (escape) => escape.toLowerCase()) : value;
		redactExplicitText = (value, sensitiveValues, options = {}) => {
			const literals = declaredLiterals(sensitiveValues);
			if (literals.length === 0) return value;
			const replacement = [
				...options.replacement === undefined ? [] : [options.replacement],
				"[REDACTED]",
				"…",
				""
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
				if (tail > 0) result = `${result.slice(0, result.length - tail)}${replacement}`;
			}
			return literals.some((literal) => result.includes(literal)) ? "" : result;
		};
		redactExplicitOutput = (output, sensitiveValues, replacement) => redactExplicitText(output.text, sensitiveValues, {
			cutOff: output.observedBytes > output.bytes,
			...replacement === undefined ? {} : { replacement }
		});
		cutOffPrefixLength = (text, literals) => {
			let longest = 0;
			for (const literal of literals) for (let length = Math.min(text.length, literal.length - 1); length > longest; length -= 1) if (text.endsWith(literal.slice(0, length))) {
				longest = length;
				break;
			}
			return longest;
		};
	})))();
}

//#endregion
//#region dist/domain/browserScenarioValues.js
var scenarioIdentifierSchema, BROWSER_SCENARIO_START_STEP_ID, browserScenarioBaseUrlSchema, browserScenarioValueSchema, queryEntrySchema, BROWSER_SCENARIO_REQUEST_METHODS, FORBIDDEN_REQUEST_HEADERS, HEADER_FIELD_VALUE, settableRequestHeader, browserScenarioPageValueSchemas, START_ORIGIN_PATH, SAVED_PLACEHOLDER, SAVED_URL_PLACEHOLDER, savedPlaceholderNames, savedValueSchema, browserScenarioRequestValueSchema, basicCredentialPartSchema, validBasicCredentialUsername, basicCredentialsSchema, saveEntrySchema, saveResponseSchema, requestHeaderSchema, browserScenarioUrlSchema, browserScenarioBrowserSchema, browserScenarioEnvironmentSchema, locatorSchema, stepBase, browserScenarioActionSchema, storageEntrySchema, browserScenarioStorageSchema, browserScenarioSecretSchema, snapshotKindSchema, browserScenarioCaptureSchema;
function init_browserScenarioValues() {
	return (init_browserScenarioValues = __esmMin((() => {
		init_analysisResourceLimits();
		init_stringPatterns();
		init_jsonValue();
		init_localPath();
		init_browserNetworkEvidence();
		init_browserScenarioCaptureValues();
		init_browserScenarioCaptureLimits();
		init_browserObservation();
		scenarioIdentifierSchema = z.string().regex(IDENTIFIER_PATTERN);
		BROWSER_SCENARIO_START_STEP_ID = "scenario_start";
		browserScenarioBaseUrlSchema = z.string().min(1).transform((value, context) => {
			let url;
			try {
				url = new URL(value);
			} catch (cause) {
				void cause;
				context.addIssue({
					code: "custom",
					message: "Invalid browser URL"
				});
				return z.NEVER;
			}
			if (url.protocol !== "http:" && url.protocol !== "https:" || url.username !== "" || url.password !== "") {
				context.addIssue({
					code: "custom",
					message: "Browser URLs must be HTTP(S) and omit credentials"
				});
				return z.NEVER;
			}
			return url.toString();
		});
		browserScenarioValueSchema = z.discriminatedUnion("source", [z.strictObject({
			source: z.literal("literal"),
			value: z.string()
		}), z.strictObject({
			source: z.literal("secret"),
			secret_id: scenarioIdentifierSchema
		})]);
		queryEntrySchema = z.strictObject({
			name: z.string().min(1),
			value: browserScenarioValueSchema
		});
		BROWSER_SCENARIO_REQUEST_METHODS = [
			"GET",
			"HEAD",
			"POST",
			"PUT",
			"PATCH",
			"DELETE"
		];
		FORBIDDEN_REQUEST_HEADERS = new Set([
			"accept-charset",
			"accept-encoding",
			"access-control-request-headers",
			"access-control-request-method",
			"connection",
			"content-length",
			"cookie",
			"cookie2",
			"date",
			"dnt",
			"expect",
			"host",
			"keep-alive",
			"origin",
			"referer",
			"set-cookie",
			"te",
			"trailer",
			"transfer-encoding",
			"upgrade",
			"user-agent",
			"via"
		]);
		HEADER_FIELD_VALUE = /^[\t\x20-\x7e\x80-\xff]*$/u;
		settableRequestHeader = (name) => {
			const lower = name.toLowerCase();
			return !FORBIDDEN_REQUEST_HEADERS.has(lower) && !lower.startsWith("proxy-") && !lower.startsWith("sec-");
		};
		browserScenarioPageValueSchemas = [z.strictObject({
			source: z.literal("cookie"),
			name: z.string().min(1).describe("Cookie the browser holds for the request URL.")
		}), z.strictObject({
			source: z.literal("local_storage"),
			key: z.string().min(1).describe("Local storage key on the start origin."),
			json_pointer: z.string().regex(/^(?:\/.*)?$/u).optional().describe("Parse the stored value as JSON and use the string or number at this pointer; empty selects the whole value.")
		})];
		START_ORIGIN_PATH = /^\x2F(?:[^\x2F\x5C]|$)/u;
		SAVED_PLACEHOLDER = /\{saved:([A-Za-z][A-Za-z0-9._-]*)\}/gu;
		SAVED_URL_PLACEHOLDER = /(?:\{|%7[Bb])saved(?::|%3[Aa])([A-Za-z][A-Za-z0-9._-]*)(?:\}|%7[Dd])/gu;
		savedPlaceholderNames = (text, placeholder = SAVED_PLACEHOLDER) => [...text.matchAll(placeholder)].map(([, name]) => name);
		savedValueSchema = z.strictObject({
			source: z.literal("saved"),
			name: scenarioIdentifierSchema
		});
		browserScenarioRequestValueSchema = z.discriminatedUnion("source", [...browserScenarioValueSchema.options, savedValueSchema]);
		basicCredentialPartSchema = z.discriminatedUnion("source", [
			...browserScenarioRequestValueSchema.options,
			z.strictObject({
				source: z.literal("cookie"),
				name: z.string().min(1)
			}),
			z.strictObject({
				source: z.literal("local_storage"),
				key: z.string().min(1),
				json_pointer: z.string().regex(/^(?:\/.*)?$/u).optional()
			})
		]);
		validBasicCredentialUsername = (username) => !username.includes(":");
		basicCredentialsSchema = z.strictObject({
			source: z.literal("basic_credentials"),
			parts: z.array(basicCredentialPartSchema).length(2).describe("Username, then password.")
		});
		saveEntrySchema = z.strictObject({
			name: scenarioIdentifierSchema,
			json_pointer: z.string().regex(/^(?:\/.*)?$/u),
			secret: z.boolean().default(false)
		});
		saveResponseSchema = z.strictObject({
			method: z.enum(BROWSER_SCENARIO_REQUEST_METHODS),
			path: z.string().regex(START_ORIGIN_PATH).describe("`{*}` matches one segment; the query is ignored."),
			save: z.array(saveEntrySchema).min(1)
		}).describe("Save values from a newly observed matching 2xx JSON response; matching does not prove the UI caused it. Multiple observed matches fail.");
		requestHeaderSchema = z.strictObject({
			name: z.string().regex(/^[!#$%&'*+.^_`\x7C~0-9A-Za-z\x2D]+$/u).refine(settableRequestHeader, { message: "A page's fetch cannot set this header" }),
			value: z.discriminatedUnion("source", [
				...browserScenarioValueSchema.options,
				...browserScenarioPageValueSchemas,
				savedValueSchema,
				basicCredentialsSchema
			]),
			prefix: z.string().regex(HEADER_FIELD_VALUE, { message: "A header value cannot carry line breaks or control characters" }).optional().describe("Text sent before the value, such as `Bearer `.")
		});
		browserScenarioUrlSchema = z.strictObject({
			url: browserScenarioBaseUrlSchema,
			query: z.array(queryEntrySchema).default([])
		});
		browserScenarioBrowserSchema = z.discriminatedUnion("mode", [z.strictObject({
			mode: z.literal("launch"),
			executable_path: absoluteLocalPathStringSchema.describe("Absolute local filesystem path for the browser executable; relative paths are rejected."),
			headless: z.boolean().default(true).describe("Run without a visible browser window; defaults to true and can be disabled when the host supports a display.")
		}), z.strictObject({
			mode: z.literal("connect"),
			cdp_endpoint: browserEndpointSchema,
			target_id: z.string().min(1)
		})]);
		browserScenarioEnvironmentSchema = z.strictObject({
			viewport: z.strictObject({
				width: z.int().positive().default(1280),
				height: z.int().positive().default(720),
				device_scale_factor: z.number().positive().default(1)
			}).default({
				width: 1280,
				height: 720,
				device_scale_factor: 1
			}),
			locale: z.string().min(2).regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/u).default("en-US").describe("Formatting locale. Launch also sets navigator.language(s) and Accept-Language; connect retains the caller's page and request languages and reports this limitation."),
			timezone: z.string().min(1).regex(/^[A-Za-z0-9_+\x2d]+(?:\x2f[A-Za-z0-9_+\x2d]+)*$/u).default("UTC"),
			color_scheme: z.enum([
				"light",
				"dark",
				"no-preference"
			]).default("light"),
			reduced_motion: z.enum(["reduce", "no-preference"]).default("reduce"),
			service_workers: z.enum(["allow", "block"]).default("block")
		}).default({
			viewport: {
				width: 1280,
				height: 720,
				device_scale_factor: 1
			},
			locale: "en-US",
			timezone: "UTC",
			color_scheme: "light",
			reduced_motion: "reduce",
			service_workers: "block"
		}).describe("Optional deterministic browser settings. Defaults to 1280x720, en-US, UTC, light mode, reduced motion, and blocked service workers.");
		locatorSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("test_id"),
				value: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("role"),
				role: z.enum([
					"button",
					"checkbox",
					"combobox",
					"dialog",
					"link",
					"listbox",
					"menuitem",
					"option",
					"radio",
					"slider",
					"spinbutton",
					"switch",
					"tab",
					"textbox"
				]),
				name: z.string().min(1).describe("The exact full accessible name of the element with this role.")
			}),
			z.strictObject({
				kind: z.literal("css"),
				selector: z.string().min(1)
			})
		]);
		stepBase = {
			step_id: scenarioIdentifierSchema,
			timeout_ms: timerDurationMsSchema.optional().describe("Optional action deadline in milliseconds; omitted means wait until completion or request cancellation.")
		};
		browserScenarioActionSchema = z.discriminatedUnion("action", [
			z.strictObject({
				...stepBase,
				action: z.literal("goto"),
				destination: browserScenarioUrlSchema,
				wait_until: z.enum([
					"commit",
					"domcontentloaded",
					"load"
				])
			}),
			z.strictObject({
				...stepBase,
				action: z.literal("click"),
				locator: locatorSchema,
				button: z.enum([
					"left",
					"middle",
					"right"
				]).default("left"),
				click_count: z.int().positive().default(1),
				save_response: saveResponseSchema.optional()
			}),
			z.strictObject({
				...stepBase,
				action: z.literal("fill"),
				locator: locatorSchema,
				value: browserScenarioValueSchema
			}),
			z.strictObject({
				...stepBase,
				action: z.literal("press"),
				locator: locatorSchema,
				key: z.string().min(1),
				save_response: saveResponseSchema.optional()
			}),
			z.strictObject({
				...stepBase,
				action: z.literal("select_option"),
				locator: locatorSchema,
				value: browserScenarioValueSchema
			}),
			z.strictObject({
				...stepBase,
				action: z.enum(["check", "uncheck"]),
				locator: locatorSchema
			}),
			z.strictObject({
				...stepBase,
				action: z.literal("wait_for"),
				locator: locatorSchema,
				state: z.enum([
					"attached",
					"detached",
					"visible",
					"hidden"
				])
			}),
			z.strictObject({
				...stepBase,
				action: z.literal("request"),
				method: z.enum(BROWSER_SCENARIO_REQUEST_METHODS),
				path: z.string().regex(START_ORIGIN_PATH).describe("Path, and optional literal query, on the start URL's origin, such as /api/folders; it must resolve to that origin."),
				query: z.array(queryEntrySchema).default([]),
				headers: z.array(requestHeaderSchema).default([]),
				json: jsonValueSchema.optional().describe("JSON request body, sent with Content-Type application/json unless a header sets one; not allowed for GET or HEAD."),
				save: z.array(saveEntrySchema).default([]).describe("Values to save from the JSON response. Later steps send one as `{saved:name}` in a request path, goto URL or JSON string, or as a header value."),
				expected_status: z.array(browserResponseStatusSchema.refine((status) => status < 300 || status > 399, { message: "Request steps follow no redirects, so a 3xx status cannot complete one" })).min(1).optional().describe("Statuses that complete the step; any other status fails it. Omitted means any response completes it.")
			}),
			z.strictObject({
				step_id: scenarioIdentifierSchema,
				action: z.literal("wait_for_timeout"),
				duration_ms: timerDurationMsSchema.describe("Wait this many milliseconds; the wait ends early on cancellation.")
			})
		]);
		storageEntrySchema = z.strictObject({
			name: z.string().min(1),
			value: browserScenarioValueSchema
		});
		browserScenarioStorageSchema = z.strictObject({
			cookies: z.array(z.strictObject({
				name: z.string().min(1),
				value: browserScenarioValueSchema,
				destination: browserScenarioUrlSchema,
				http_only: z.boolean(),
				secure: z.boolean(),
				same_site: z.enum([
					"Strict",
					"Lax",
					"None"
				])
			})).default([]),
			local_storage: z.array(z.strictObject({
				origin: browserOriginSchema,
				entries: z.array(storageEntrySchema)
			})).default([]),
			session_storage: z.array(z.strictObject({
				origin: browserOriginSchema,
				entries: z.array(storageEntrySchema)
			})).default([])
		}).default({
			cookies: [],
			local_storage: [],
			session_storage: []
		}).describe("Optional initial cookies, local storage, or session storage. Defaults to empty; every supplied value and origin must be declared and within the allowed origins.");
		browserScenarioSecretSchema = z.strictObject({
			secret_id: scenarioIdentifierSchema,
			environment_variable: z.string().min(1).refine((name) => !name.includes("=") && !name.includes("\0"), "Environment variable names cannot contain '=' or NUL")
		});
		snapshotKindSchema = z.enum([
			"screenshot",
			"dom",
			"accessibility",
			"url",
			"history",
			"storage"
		]);
		browserScenarioCaptureSchema = z.strictObject({
			after_each_step: z.array(snapshotKindSchema).default([]),
			at_end: z.array(snapshotKindSchema).default(["url"]),
			events: z.array(browserScenarioEventFamilySchema).default([]),
			network: browserNetworkContentSelectionSchema,
			limits: browserScenarioCaptureLimitsSchema.default(DEFAULT_BROWSER_SCENARIO_CAPTURE_LIMITS)
		}).default({
			after_each_step: [],
			at_end: ["url"],
			events: [],
			network: {
				request_body: false,
				response_body: false,
				header_values: false
			},
			limits: DEFAULT_BROWSER_SCENARIO_CAPTURE_LIMITS
		}).describe("Optional retained artifacts and event families. Defaults to only a final sanitized URL; request screenshots, DOM, accessibility, history, storage, and event capture explicitly.");
	})))();
}

//#endregion
export { lowercasePercentEscapes as C, isTransportCredentialHeader as S, redactExplicitText as T, explicitUtf16Spellings as _, browserScenarioActionSchema as a, explicitValuesOccurIn as b, browserScenarioEnvironmentSchema as c, browserScenarioUrlSchema as d, init_browserScenarioValues as f, explicitTextSpellings as g, TRANSPORT_CREDENTIAL_HEADERS as h, SAVED_URL_PLACEHOLDER as i, browserScenarioSecretSchema as l, validBasicCredentialUsername as m, HEADER_FIELD_VALUE as n, browserScenarioBrowserSchema as o, savedPlaceholderNames as p, SAVED_PLACEHOLDER as r, browserScenarioCaptureSchema as s, BROWSER_SCENARIO_START_STEP_ID as t, browserScenarioStorageSchema as u, explicitUtf8Spellings as v, redactExplicitOutput as w, init_explicitSensitiveValues as x, explicitValueSpans as y };