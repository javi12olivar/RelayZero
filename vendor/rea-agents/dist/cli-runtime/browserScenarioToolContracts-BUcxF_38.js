import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { IDENTIFIER_PATTERN, absoluteLocalPathStringSchema, init_analysisResourceLimits, init_jsonValue, init_localPath, init_stringPatterns, jsonValueSchema, timerDurationMsSchema } from "./jsonSerialization-DAF9DVXC.js";
import { browserEndpointSchema, browserOriginSchema, browserResponseStatusSchema, init_browserDeadline, init_browserObservation, webRuntimeCommandTimeoutSchema } from "./browserObservation-BVcDYwHI.js";
import { DEFAULT_BROWSER_SCENARIO_CAPTURE_LIMITS, browserNetworkContentSelectionSchema, browserScenarioCaptureLimitsSchema, browserScenarioCaptureSchema as browserScenarioCaptureSchema$1, browserScenarioEventFamilySchema, init_browserNetworkEvidence, init_browserScenarioCapture, init_browserScenarioCaptureLimits, init_browserScenarioCaptureValues } from "./browserNetworkMediaType-CbMlNDyh.js";
import { browserScenarioSummaryViewResultSchema, init_analysisViewResult } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, analysisDetailSchema, init_analysisDetail, init_toolEffects, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

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
//#region dist/domain/browserScenario.js
function* storageSecretReferences(scenario) {
	for (const cookie of scenario.storage.cookies) {
		yield* secretReferencesInValue(cookie.value);
		yield* destinationSecretReferences(cookie.destination);
	}
	for (const collection of ["local_storage", "session_storage"]) for (const storage of scenario.storage[collection]) for (const entry of storage.entries) yield* secretReferencesInValue(entry.value);
}
var browserScenarioInputSchema, addIssue, assertUnique, secretReferencesInValue, headerValues, jsonStrings, sentSavedNames, savedNames, destinationSecretReferences, actionSecretReferences, validateSavedValues, validateRequestSteps, validateSecretReferences, validateBrowserScenario, browserScenarioSchema;
function init_browserScenario() {
	return (init_browserScenario = __esmMin((() => {
		init_browserDeadline();
		init_browserScenarioValues();
		browserScenarioInputSchema = z.strictObject({
			browser: browserScenarioBrowserSchema.describe("Required launch/connect selection. Launch uses the selected executable and an owned temporary profile; connect uses one loopback CDP endpoint and target."),
			start_url: browserScenarioUrlSchema.describe("Required initial HTTP(S) URL. Query values must be declared separately as public literals or secret references."),
			environment: browserScenarioEnvironmentSchema,
			actions: z.array(browserScenarioActionSchema).min(1).describe("Required sequence of explicit browser actions."),
			storage: browserScenarioStorageSchema,
			secrets: z.array(browserScenarioSecretSchema).default([]).describe("Optional environment-variable references for values used in actions, URLs, storage, or replay, and for redacting matching observed text. Secret values are never supplied inline."),
			capture: browserScenarioCaptureSchema,
			command_timeout_ms: webRuntimeCommandTimeoutSchema
		});
		addIssue = (context, path, message) => context.addIssue({
			code: "custom",
			path,
			message
		});
		assertUnique = (values, path, label, context) => {
			if (new Set(values).size !== values.length) addIssue(context, path, `${label} must be unique`);
		};
		secretReferencesInValue = (value) => value?.source === "secret" ? [value.secret_id] : [];
		headerValues = (action) => action.headers.flatMap(({ value }) => value.source === "basic_credentials" ? value.parts : [value]);
		jsonStrings = (value) => {
			if (typeof value === "string") return [value];
			if (Array.isArray(value)) return value.flatMap(jsonStrings);
			if (value !== null && typeof value === "object") return Object.values(value).flatMap(jsonStrings);
			return [];
		};
		sentSavedNames = (action) => {
			if (action.action === "goto") return savedPlaceholderNames(action.destination.url, SAVED_URL_PLACEHOLDER);
			if (action.action !== "request") return [];
			return [...[action.path, ...jsonStrings(action.json)].flatMap((text) => savedPlaceholderNames(text)), ...headerValues(action).flatMap((value) => value.source === "saved" ? [value.name] : [])];
		};
		savedNames = (action) => action.action === "request" ? action.save.map(({ name }) => name) : (action.action === "click" || action.action === "press") && action.save_response !== undefined ? action.save_response.save.map(({ name }) => name) : [];
		destinationSecretReferences = (destination) => destination.query.flatMap(({ value }) => secretReferencesInValue(value));
		actionSecretReferences = (action) => {
			if (action.action === "fill" || action.action === "select_option") return secretReferencesInValue(action.value);
			if (action.action === "goto") return destinationSecretReferences(action.destination);
			if (action.action === "request") return [...action.query.flatMap(({ value }) => secretReferencesInValue(value)), ...headerValues(action).flatMap((value) => value.source === "secret" ? [value.secret_id] : [])];
			return [];
		};
		validateSavedValues = (scenario, context) => {
			const saved = new Set();
			scenario.actions.forEach((action, index) => {
				for (const name of new Set(sentSavedNames(action))) if (!saved.has(name)) addIssue(context, ["actions", index], `Step ${action.step_id} sends saved value ${name}, which no earlier step saves`);
				for (const name of savedNames(action)) saved.add(name);
			});
		};
		validateRequestSteps = (scenario, context) => {
			const origin = new URL(scenario.start_url.url).origin;
			scenario.actions.forEach((action, index) => {
				if (action.action !== "request") return;
				const resolved = URL.parse(action.path, origin);
				if (resolved === null) addIssue(context, [
					"actions",
					index,
					"path"
				], "The request step path is not a URL path the browser can resolve");
				else if (resolved.origin !== origin) addIssue(context, [
					"actions",
					index,
					"path"
				], `Request steps must stay on the start URL's origin ${origin}`);
				if (action.json !== undefined && (action.method === "GET" || action.method === "HEAD")) addIssue(context, [
					"actions",
					index,
					"json"
				], `A ${action.method} request step cannot send a body`);
				const names = new Set();
				action.headers.forEach((header, position) => {
					const name = header.name.toLowerCase();
					if (names.has(name)) addIssue(context, [
						"actions",
						index,
						"headers",
						position,
						"name"
					], `Request step headers name ${header.name} more than once`);
					names.add(name);
					if (header.value.source === "literal" && !HEADER_FIELD_VALUE.test(header.value.value)) addIssue(context, [
						"actions",
						index,
						"headers",
						position,
						"value",
						"value"
					], "A header value cannot carry line breaks or control characters");
					const username = header.value.source === "basic_credentials" ? header.value.parts[0] : undefined;
					if (username?.source === "literal" && !validBasicCredentialUsername(username.value)) addIssue(context, [
						"actions",
						index,
						"headers",
						position,
						"value",
						"parts",
						0,
						"value"
					], "A Basic username cannot contain a colon, which separates the username from the password");
					const password = header.value.source === "basic_credentials" ? header.value.parts[1] : undefined;
					if (password?.source === "literal" && password.value !== "") addIssue(context, [
						"actions",
						index,
						"headers",
						position,
						"value",
						"parts",
						1
					], "Basic credentials take their password from a declared secret, a saved value, a cookie or local storage, not a literal");
				});
			});
		};
		validateSecretReferences = (scenario, references, context) => {
			const declared = new Set(scenario.secrets.map(({ secret_id: id }) => id));
			for (const reference of references) if (!declared.has(reference)) addIssue(context, ["secrets"], `Secret reference ${reference} is not declared`);
		};
		validateBrowserScenario = (scenario, context) => {
			assertUnique(scenario.actions.map(({ step_id: id }) => id), ["actions"], "Action step IDs", context);
			const reservedIndex = scenario.actions.findIndex(({ step_id: id }) => id === BROWSER_SCENARIO_START_STEP_ID);
			if (reservedIndex !== -1) addIssue(context, [
				"actions",
				reservedIndex,
				"step_id"
			], "Action step IDs must not reuse the reserved initial step identity");
			assertUnique(scenario.secrets.map(({ secret_id: id }) => id), ["secrets"], "Secret IDs", context);
			assertUnique(scenario.secrets.map(({ environment_variable: name }) => name), ["secrets"], "Secret environment variables", context);
			validateRequestSteps(scenario, context);
			validateSavedValues(scenario, context);
			const references = new Set(scenario.actions.flatMap(actionSecretReferences));
			for (const reference of destinationSecretReferences(scenario.start_url)) references.add(reference);
			for (const reference of storageSecretReferences(scenario)) references.add(reference);
			validateSecretReferences(scenario, references, context);
		};
		browserScenarioSchema = browserScenarioInputSchema.superRefine(validateBrowserScenario);
	})))();
}

//#endregion
//#region dist/contracts/browserScenarioToolContracts.js
var example, BROWSER_SCENARIO_TOOL_CONTRACTS;
function init_browserScenarioToolContracts() {
	return (init_browserScenarioToolContracts = __esmMin((() => {
		init_toolEffects();
		init_analysisDetail();
		init_analysisViewResult();
		init_browserScenario();
		init_browserScenarioCapture();
		example = {
			browser: {
				mode: "launch",
				executable_path: "/opt/chromium/chrome"
			},
			start_url: {
				url: "https://app.example.test/",
				query: []
			},
			actions: [{
				step_id: "settle",
				action: "wait_for_timeout",
				duration_ms: 250
			}]
		};
		BROWSER_SCENARIO_TOOL_CONTRACTS = [{
			name: "capture_browser_scenario",
			cli: true,
			...toolContractMetadata("capture_browser_scenario", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				writesFilesystem: true,
				launchesProcess: true,
				accessesNetwork: true,
				changesUiState: true,
				mayDiscardData: true,
				executesForeignCode: true,
				idempotent: false
			})),
			description: "Drive a browser scenario when passive observation cannot exercise the app. Launch the selected executable or connect to a loopback CDP target; actions can change application state and make network requests. Supply browser, start_url and actions, e.g. {browser:{mode:\"launch\",executable_path:\"/opt/chromium/chrome\"},start_url:{url:\"https://app.example.test/\"},actions:[{step_id:\"settle\",action:\"wait_for_timeout\",duration_ms:250}]}. Empty storage and a URL-only final capture are defaults. Request actions use page fetch on the start origin; capture.network independently opts into request_body, response_body and header_values. Credentials and declared secrets are redacted. capture.limits controls retained event/content budgets; omissions identify affected events/transactions. Role locators match the exact full accessible name. Actions wait for completion or cancellation; per-action timeout_ms bounds a step. Default complete delivery returns Evidence inline. detail summary retains it and returns step outcomes, final/first-unsuccessful accessibility, and counts; inspect_analysis_view kind browser-scenario pages steps, events, transactions and UTF-16 text. Use inspect_web_page for observation without actions.",
			kind: "browser-provider",
			inputSchema: browserScenarioInputSchema.extend({ detail: analysisDetailSchema }),
			outputSchema: analysisDetailOutputSchemaOf(browserScenarioCaptureSchema$1, browserScenarioSummaryViewResultSchema),
			examples: [{
				title: "Capture a deterministic browser scenario",
				input: example
			}]
		}];
	})))();
}

//#endregion
export { BROWSER_SCENARIO_START_STEP_ID, BROWSER_SCENARIO_TOOL_CONTRACTS, HEADER_FIELD_VALUE, SAVED_PLACEHOLDER, SAVED_URL_PLACEHOLDER, browserScenarioSchema, init_browserScenario, init_browserScenarioToolContracts, init_browserScenarioValues, validBasicCredentialUsername };