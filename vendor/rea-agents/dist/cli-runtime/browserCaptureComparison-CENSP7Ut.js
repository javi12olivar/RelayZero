import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_isRecord, init_jsonValue, init_schemaAnnotations, isRecord, jsonValueSchema, presentCompleteObservation } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, compositeKey, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_offsetDateTime, utcDateTimeSchema } from "./nativeValueFlow-13oOEkkJ.js";
import { digestSchema, init_digests, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { browserAllowedOriginsSchema, browserDiscoveryTimeoutSchema, browserObservationEndpointSchema, init_browserDeadline, init_browserObservation, webRuntimeCommandTimeoutSchema } from "./browserObservation-BVcDYwHI.js";
import { browserCompletenessSchema, browserVersionSchema, cdpResourceColumnSchema, init_browserCompleteness, init_browserObservationSchemas, init_cdpObservationSchemas, webPageInspectionSchema } from "./browserObservationSchemas-D0tzRJhs.js";
import { emptyArraySchema, init_emptyArraySchema } from "./emptyArraySchema-CqZKVQhm.js";
import { browserScenarioCaptureSchema, init_browserScenarioCapture, retainedBrowserScenarioCaptureSchema } from "./browserNetworkMediaType-CbMlNDyh.js";
import { indexBrowserScenarioTransactions, init_browserScenarioTransactions } from "./analysisViewResult-vDCF9Pxo.js";
import { z } from "zod";

//#region dist/domain/browserSession.js
var observeWebSessionInputSchema, destinationScopeSchema, timelineEventSchema, webObservationSessionSchema;
function init_browserSession() {
	return (init_browserSession = __esmMin((() => {
		init_offsetDateTime();
		init_browserDeadline();
		init_browserObservation();
		init_browserCompleteness();
		init_browserObservationSchemas();
		observeWebSessionInputSchema = z.strictObject({
			cdp_endpoint: browserObservationEndpointSchema,
			allowed_origins: browserAllowedOriginsSchema,
			discovery_timeout_ms: browserDiscoveryTimeoutSchema,
			target_id: z.string().min(1),
			observation_ms: z.int().min(1).default(1e4),
			command_timeout_ms: webRuntimeCommandTimeoutSchema
		});
		destinationScopeSchema = z.enum([
			"approved",
			"outside_policy",
			"unsupported"
		]);
		timelineEventSchema = z.object({
			sequence: z.int().min(1),
			type: z.enum([
				"navigation_requested",
				"navigation_committed",
				"same_origin_reload",
				"same_document_navigation",
				"redirect",
				"load_failed",
				"lifecycle",
				"target_terminated",
				"session_detached",
				"transport_disconnected"
			]),
			timestamp: z.number().min(0).nullable().describe("CDP monotonic seconds when supplied; null when the event has no valid comparable producer timestamp."),
			frame_id: z.string().nullable(),
			loader_id: z.string().nullable(),
			request_id: z.string().nullable(),
			url: z.string().nullable(),
			destination_scope: destinationScopeSchema.nullable(),
			detail: z.string().nullable(),
			redirect_response: z.object({
				url: z.string().nullable(),
				status: z.number().nullable(),
				scope: destinationScopeSchema.nullable()
			}).optional().describe("Prior-hop response metadata, present exactly on redirect events. URL and status require an approved response origin; null scope is unknown.")
		}).refine((event) => event.type === "redirect" === (event.redirect_response !== undefined), {
			path: ["redirect_response"],
			message: "redirect_response is present exactly on redirect events."
		});
		webObservationSessionSchema = z.object({
			browser: browserVersionSchema,
			target: z.object({
				target_id: z.string(),
				initial_url: z.string(),
				final_url: z.string().nullable()
			}),
			window: z.object({
				armed_at: utcDateTimeSchema,
				ended_at: utcDateTimeSchema,
				requested_ms: z.int().min(1),
				end_reason: z.enum([
					"window_elapsed",
					"target_left_scope",
					"target_terminated",
					"session_detached",
					"transport_disconnected"
				])
			}),
			timeline: z.array(timelineEventSchema),
			completeness: browserCompletenessSchema,
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/webMcpDiscovery.js
var discoverWebMcpToolsInputSchema, webMcpToolSchema, webMcpDiscoverySchema;
function init_webMcpDiscovery() {
	return (init_webMcpDiscovery = __esmMin((() => {
		init_browserDeadline();
		init_browserCompleteness();
		init_browserObservation();
		init_browserObservationSchemas();
		init_cdpObservationSchemas();
		init_jsonValue();
		init_digests();
		discoverWebMcpToolsInputSchema = z.strictObject({
			cdp_endpoint: browserObservationEndpointSchema,
			allowed_origins: browserAllowedOriginsSchema,
			discovery_timeout_ms: browserDiscoveryTimeoutSchema,
			target_id: z.string().min(1),
			observation_ms: z.int().min(0).default(100),
			command_timeout_ms: webRuntimeCommandTimeoutSchema
		});
		webMcpToolSchema = z.object({
			tool_key: prefixedDigestSchema("webmcp"),
			name: z.string(),
			description: z.string(),
			frame_id: z.string(),
			frame_url: z.string(),
			owner_origin: z.string(),
			declaration_kind: z.enum(["declarative", "imperative"]),
			input_schema: jsonValueSchema.nullable(),
			input_schema_sha256: digestSchema.nullable(),
			annotations: z.object({
				read_only: z.boolean().nullable(),
				untrusted_content: z.boolean().nullable(),
				consequential: z.boolean().nullable().optional(),
				autosubmit: z.boolean().nullable()
			}),
			registration_source: z.object({
				url: z.string(),
				line: z.int().min(0).nullable(),
				column: cdpResourceColumnSchema.nullable()
			}).nullable(),
			trust: z.literal("page-declared-untrusted")
		});
		webMcpDiscoverySchema = z.object({
			browser: browserVersionSchema,
			target: z.object({
				target_id: z.string(),
				url: z.string(),
				origin: z.string()
			}),
			status: z.enum(["available", "unavailable"]),
			tools: z.object({
				total: z.int().min(0),
				items: z.array(webMcpToolSchema)
			}),
			completeness: browserCompletenessSchema,
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/browserScenarioDiffValues.js
var browserScenarioArtifactKindSchema, normalizableArtifactKindSchema, normalizationRuleSchema, normalizationInputSchema, compareBrowserScenariosInputSchema, evidenceStateSchema, artifactDiffSchema, alignmentFailureSchema, BROWSER_SCENARIO_BUILT_IN_NORMALIZATION_RULES, builtInNormalizationSchema, browserScenarioDiffSchema;
function init_browserScenarioDiffValues() {
	return (init_browserScenarioDiffValues = __esmMin((() => {
		init_browserScenarioCapture();
		init_schemaAnnotations();
		browserScenarioArtifactKindSchema = z.enum([
			"action_state",
			"screenshot",
			"dom",
			"accessibility",
			"url",
			"history",
			"storage",
			"events"
		]);
		normalizableArtifactKindSchema = z.enum([
			"action_state",
			"dom",
			"accessibility",
			"url",
			"history",
			"storage",
			"events"
		]);
		normalizationRuleSchema = z.strictObject({
			rule_id: z.string().trim().min(1).describe("Stable rule identity; rules execute in rule_id order."),
			artifacts: z.array(normalizableArtifactKindSchema).min(1).describe("Artifact families whose durable string fields use this rule."),
			match: z.string().min(1).describe("Exact public literal to replace; regular expressions are not used."),
			replacement: z.string().describe("Recorded replacement text used in normalized comparison.")
		});
		normalizationInputSchema = z.strictObject({ rules: z.array(normalizationRuleSchema).default([]) }).superRefine((normalization, context) => {
			const ruleIds = new Set();
			for (const [index, rule] of normalization.rules.entries()) {
				if (ruleIds.has(rule.rule_id)) context.addIssue({
					code: "custom",
					path: [
						"rules",
						index,
						"rule_id"
					],
					message: "Normalization rule IDs must be unique"
				});
				ruleIds.add(rule.rule_id);
				if (new Set(rule.artifacts).size !== rule.artifacts.length) context.addIssue({
					code: "custom",
					path: [
						"rules",
						index,
						"artifacts"
					],
					message: "Normalization rule artifact kinds must be unique"
				});
			}
		});
		compareBrowserScenariosInputSchema = z.strictObject({
			before_scenario: presentCompleteObservation(retainedBrowserScenarioCaptureSchema.describe("Earlier complete normalized_result from capture_browser_scenario.")),
			after_scenario: presentCompleteObservation(retainedBrowserScenarioCaptureSchema.describe("Later complete normalized_result from capture_browser_scenario.")),
			normalization: normalizationInputSchema.default({ rules: [] }).describe("Exact-literal rules committed in the comparison result.")
		});
		evidenceStateSchema = z.enum([
			"captured",
			"not_requested",
			"missing",
			"truncated"
		]);
		artifactDiffSchema = z.strictObject({
			artifact: browserScenarioArtifactKindSchema,
			status: z.enum(["changed", "unknown"]),
			before_state: evidenceStateSchema,
			after_state: evidenceStateSchema,
			before_sha256: z.string().regex(/^[a-f0-9]{64}$/u).nullable(),
			after_sha256: z.string().regex(/^[a-f0-9]{64}$/u).nullable(),
			reason: z.string().min(1).nullable()
		});
		alignmentFailureSchema = z.strictObject({
			code: z.enum([
				"duplicate_before_step_id",
				"duplicate_after_step_id",
				"missing_before_step",
				"missing_after_step",
				"action_mismatch",
				"capture_context_mismatch"
			]),
			step_id: z.string().min(1).nullable(),
			reason: z.string().min(1)
		});
		BROWSER_SCENARIO_BUILT_IN_NORMALIZATION_RULES = [
			"ignore_step_elapsed_ms",
			"ignore_event_sequence",
			"ignore_event_step_index",
			"compare_screenshot_content_digest",
			"compare_normalized_text_content",
			"compare_storage_entries_as_unordered_collection",
			"ignore_capture_local_network_transaction_ids",
			"ignore_network_request_timing",
			"attribute_network_transactions_to_request_step",
			"compare_network_transactions_as_unordered_collection",
			"preserve_redirect_transaction_ancestry"
		];
		builtInNormalizationSchema = z.enum(BROWSER_SCENARIO_BUILT_IN_NORMALIZATION_RULES);
		browserScenarioDiffSchema = z.strictObject({
			comparison_kind: z.literal("browser_scenario"),
			overall_status: z.enum([
				"changed",
				"unchanged",
				"unknown"
			]),
			normalization: z.strictObject({
				built_in_rules: z.array(builtInNormalizationSchema).length(BROWSER_SCENARIO_BUILT_IN_NORMALIZATION_RULES.length),
				rules: z.array(normalizationRuleSchema),
				sha256: z.string().regex(/^[a-f0-9]{64}$/u)
			}),
			alignment: z.strictObject({
				status: z.enum([
					"aligned",
					"partial",
					"failed"
				]),
				aligned_steps: z.int().min(0),
				before_only: z.array(z.string().min(1)),
				after_only: z.array(z.string().min(1)),
				failures: z.array(alignmentFailureSchema)
			}),
			steps: z.array(z.strictObject({
				step_id: z.string().min(1),
				before_step_index: z.int().min(0),
				after_step_index: z.int().min(0),
				before_action: z.string().min(1),
				after_action: z.string().min(1),
				status: z.enum([
					"changed",
					"unchanged",
					"unknown"
				]),
				artifact_diffs: z.array(artifactDiffSchema)
			})),
			artifact_diffs: z.strictObject({ total: z.int().min(0) }),
			limitations: z.array(z.string().min(1))
		});
	})))();
}

//#endregion
//#region dist/domain/browserScenarioNormalization.js
var commitBrowserScenarioNormalization, digestNormalizedScenarioValue, normalizeScenarioValue, compareStorageEntries, compareStorageField;
function init_browserScenarioNormalization() {
	return (init_browserScenarioNormalization = __esmMin((() => {
		init_canonicalDigest();
		init_unicodeCodePointOrder();
		init_browserScenarioDiffValues();
		commitBrowserScenarioNormalization = (input) => {
			const rules = [...input.rules].map((rule) => ({
				...rule,
				artifacts: [...rule.artifacts].sort()
			})).sort((left, right) => left.rule_id < right.rule_id ? -1 : left.rule_id > right.rule_id ? 1 : 0);
			const commitment = {
				built_in_rules: [...BROWSER_SCENARIO_BUILT_IN_NORMALIZATION_RULES],
				rules
			};
			return {
				...commitment,
				sha256: digestCanonicalValue(commitment, "Browser scenario")
			};
		};
		digestNormalizedScenarioValue = (value, artifact, rules) => digestCanonicalValue(normalizeScenarioValue(value, artifact, rules), "Browser scenario");
		normalizeScenarioValue = (value, artifact, rules) => {
			if (artifact === "screenshot") return value;
			if (typeof value === "string") return rules.filter(({ artifacts }) => artifacts.includes(artifact)).reduce((normalized, rule) => normalized.split(rule.match).join(rule.replacement), value);
			if (Array.isArray(value)) {
				const normalized = value.map((item) => normalizeScenarioValue(item, artifact, rules));
				return artifact === "storage" ? normalized.sort(compareStorageEntries) : normalized;
			}
			if (typeof value !== "object" || value === null) return value;
			return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeScenarioValue(item, artifact, rules)]));
		};
		compareStorageEntries = (left, right) => {
			if (!isRecord(left) || !isRecord(right)) return compareUnicodeCodePoints(digestCanonicalValue(left, "Browser scenario"), digestCanonicalValue(right, "Browser scenario"));
			const fields = Object.hasOwn(left, "domain") || Object.hasOwn(right, "domain") ? [
				"domain",
				"http_only",
				"name",
				"path",
				"same_site",
				"secure",
				"value_sha256",
				"value_state"
			] : [
				"name",
				"value_sha256",
				"value_state"
			];
			for (const field of fields) {
				const compared = compareStorageField(left[field], right[field]);
				if (compared !== 0) return compared;
			}
			return 0;
		};
		compareStorageField = (left, right) => {
			if (left === right) return 0;
			if (left === null) return -1;
			if (right === null) return 1;
			if (typeof left === "string" && typeof right === "string") return compareUnicodeCodePoints(left, right);
			if (typeof left === "boolean" && typeof right === "boolean") return left ? 1 : -1;
			return compareUnicodeCodePoints(String(left), String(right));
		};
	})))();
}

//#endregion
//#region dist/domain/browserScenarioNetworkComparison.js
var ScenarioNetworkFingerprintError, scenarioNetworkTransactionSchema, scenarioNetworkTransactions, scenarioNetworkCoverageReason, withoutRequestTiming, fingerprintScenarioNetworkTransactions;
function init_browserScenarioNetworkComparison() {
	return (init_browserScenarioNetworkComparison = __esmMin((() => {
		init_canonicalDigest();
		init_browserScenarioNormalization();
		init_browserScenarioTransactions();
		ScenarioNetworkFingerprintError = class extends Error {
			_tag = "ScenarioNetworkFingerprintError";
			code = "missing_fingerprint";
			constructor() {
				super("missing_fingerprint");
				this.name = "ScenarioNetworkFingerprintError";
			}
		};
		scenarioNetworkTransactionSchema = z.strictObject({
			events: z.array(z.unknown()),
			predecessor: z.int().min(-2),
			step_index: z.int().min(0)
		});
		scenarioNetworkTransactions = (capture) => {
			const { requestCounts } = indexBrowserScenarioTransactions(capture.events.items);
			const sourceSteps = new Map(capture.events.items.map((event) => [event.sequence, event.step_index]));
			const requests = new Map(capture.events.items.flatMap((event) => event.kind === "request" && requestCounts.get(event.transaction_id) === 1 ? [[event.transaction_id, event]] : []));
			const grouped = new Map();
			for (const { sequence: _sequence, step_index: step, ...event } of capture.events.items) {
				if (!("transaction_id" in event)) continue;
				const id = event.transaction_id;
				const request = requests.get(id);
				const receiptStep = event.kind === "network-content" ? sourceSteps.get(event.source_event_sequence) : step;
				const requestStep = request?.step_index ?? receiptStep;
				let evidence;
				let predecessor;
				let predecessorState;
				if (event.kind === "network-content") {
					const { transaction_id: _id, source_event_sequence: _source, ...content } = event;
					evidence = content;
					predecessor = request?.redirected_from_transaction_id ?? null;
					predecessorState = request?.redirected_from_transaction_state;
				} else {
					const { transaction_id: _id, redirected_from_transaction_id: parent, redirected_from_transaction_state: _state, ...network } = event;
					evidence = withoutRequestTiming(network);
					predecessor = request === undefined ? parent : request.redirected_from_transaction_id;
					predecessorState = request === undefined ? event.redirected_from_transaction_state : request.redirected_from_transaction_state;
				}
				const previous = grouped.get(id);
				if (previous === undefined) grouped.set(id, {
					events: [evidence],
					predecessor,
					predecessorState,
					predecessorConflict: event.kind !== "network-content" && request !== undefined && (event.redirected_from_transaction_id !== null && event.redirected_from_transaction_id !== request.redirected_from_transaction_id || event.redirected_from_transaction_state === "root" && request.redirected_from_transaction_id !== null),
					stepIndex: requestStep ?? step
				});
				else {
					previous.events.push(evidence);
					if (event.kind !== "network-content") {
						const parent = event.redirected_from_transaction_id;
						const state = event.redirected_from_transaction_state;
						const knownParent = previous.predecessor;
						if (parent !== null && (knownParent !== null ? parent !== knownParent : previous.predecessorState === "root")) previous.predecessorConflict = true;
						else if (parent !== null && knownParent === null) {
							previous.predecessor = parent;
							previous.predecessorState = state;
						} else if (parent === null && state === "root" && knownParent !== null) previous.predecessorConflict = true;
						else if (parent === null && state === "root" && previous.predecessorState !== "root") previous.predecessorState = "root";
					}
				}
			}
			const indices = new Map([...grouped.keys()].map((id, index) => [id, index]));
			return [...grouped.values()].map((node) => ({
				events: node.events,
				predecessor: node.predecessorConflict ? -2 : node.predecessor === null ? node.predecessorState === "root" ? -1 : -2 : indices.get(node.predecessor) ?? -2,
				step_index: node.stepIndex
			}));
		};
		scenarioNetworkCoverageReason = (capture, nodes = scenarioNetworkTransactions(capture)) => {
			const { requestCounts } = indexBrowserScenarioTransactions(capture.events.items);
			if ([...requestCounts.values()].some((count) => count > 1)) return "Multiple requests share a transaction ID; network transaction identity remains unknown.";
			const finished = new Set();
			for (let start = 0; start < nodes.length; start += 1) {
				const path = new Set();
				let index = start;
				while (index >= 0 && !finished.has(index)) {
					if (path.has(index)) return "Redirect ancestry contains a cycle; network transaction identity remains unknown.";
					path.add(index);
					const node = nodes[index];
					if (node === undefined) return "Redirect predecessor evidence is missing; network transaction identity remains unknown.";
					index = node.predecessor;
				}
				if (index === -2) return "Redirect predecessor evidence is missing; network transaction identity remains unknown.";
				for (const item of path) finished.add(item);
			}
			return undefined;
		};
		withoutRequestTiming = (event) => {
			const { observed_at: _observed, started_at: _started, elapsed_ms: _elapsed, ...rest } = event;
			return rest;
		};
		fingerprintScenarioNetworkTransactions = (nodes, rules = []) => {
			const own = nodes.map((node) => node.events.map((event) => digestCanonicalValue(normalizeScenarioValue(event, "events", rules), "Browser scenario")).sort());
			const fingerprints = new Map();
			for (let start = 0; start < nodes.length; start += 1) {
				const path = [];
				const positions = new Map();
				let index = start;
				while (index >= 0 && nodes[index] !== undefined && !fingerprints.has(index)) {
					const position = positions.get(index);
					if (position !== undefined) {
						for (const member of path.slice(position)) fingerprints.set(member, digestCanonicalValue({
							events: own[member],
							redirected_from: { state: "cycle" }
						}, "Browser scenario"));
						break;
					}
					positions.set(index, path.length);
					path.push(index);
					index = nodes[index]?.predecessor ?? -2;
				}
				for (const member of path.reverse()) {
					if (fingerprints.has(member)) continue;
					const predecessor = nodes[member]?.predecessor ?? -2;
					const parent = predecessor === -1 ? null : fingerprints.get(predecessor) ?? { state: "missing" };
					fingerprints.set(member, digestCanonicalValue({
						events: own[member],
						redirected_from: parent
					}, "Browser scenario"));
				}
			}
			return nodes.map((_, index) => {
				const fingerprint = fingerprints.get(index);
				if (fingerprint === undefined) throw new ScenarioNetworkFingerprintError();
				return fingerprint;
			});
		};
	})))();
}

//#endregion
//#region dist/domain/browserScenarioDiffEvidence.js
var includesCompletenessSection, artifactEvidenceState, EVENT_SECTIONS, eventEvidenceState, actionState, storageProjection, storageFingerprintCoverageReason, prepareScenarioEvents, networkContentCoverageReason, eventFamilyCoverageReason, familyList, captured, screenshotProjection;
function init_browserScenarioDiffEvidence() {
	return (init_browserScenarioDiffEvidence = __esmMin((() => {
		init_browserScenarioNetworkComparison();
		includesCompletenessSection = (completeness, collection, section) => {
			const sections = completeness[collection];
			return sections.includes(section);
		};
		artifactEvidenceState = (artifact, state, step) => {
			if (state.state !== "captured") return state.state;
			const section = artifact === "action_state" ? "action" : artifact;
			if (includesCompletenessSection(step.completeness, "truncated_sections", section)) return "truncated";
			return includesCompletenessSection(step.completeness, "missing_sections", section) ? "missing" : "captured";
		};
		EVENT_SECTIONS = [
			"events",
			"frames",
			"workers",
			"popups",
			"websockets"
		];
		eventEvidenceState = (capture, step) => {
			const listed = (collection) => EVENT_SECTIONS.some((section) => includesCompletenessSection(capture.completeness, collection, section) || includesCompletenessSection(step.completeness, collection, section));
			if (capture.events.dropped > 0 || listed("truncated_sections")) return "truncated";
			return listed("missing_sections") ? "missing" : "captured";
		};
		actionState = (step) => ({
			action: step.action,
			status: step.status,
			before_url: step.before_url,
			after_url: step.after_url,
			error: step.error
		});
		storageProjection = ({ cookies, local_storage, session_storage }) => ({
			cookies,
			local_storage,
			session_storage
		});
		storageFingerprintCoverageReason = (...states) => states.some((state) => state.state === "captured" && state.value.fingerprint_version === undefined && [
			state.value.cookies,
			state.value.local_storage,
			state.value.session_storage
		].some((entries) => entries.some(({ value_state }) => value_state === "hashed"))) ? "Legacy storage fingerprints used lossy UTF-8; recapture both sides with code-unit-preserving storage fingerprints before comparing values." : undefined;
		prepareScenarioEvents = (capture, rules) => {
			const eventsByStep = new Map();
			for (const { sequence: _sequence, step_index, ...event } of capture.events.items) {
				if ("transaction_id" in event) continue;
				const events = eventsByStep.get(step_index) ?? [];
				events.push(event);
				eventsByStep.set(step_index, events);
			}
			const nodes = scenarioNetworkTransactions(capture);
			const fingerprints = fingerprintScenarioNetworkTransactions(nodes, rules);
			const networkByStep = new Map();
			for (const [index, node] of nodes.entries()) {
				const step = networkByStep.get(node.step_index) ?? [];
				const fingerprint = fingerprints[index];
				if (fingerprint === undefined) throw new ScenarioNetworkFingerprintError();
				step.push(fingerprint);
				networkByStep.set(node.step_index, step);
			}
			for (const fingerprintsForStep of networkByStep.values()) fingerprintsForStep.sort();
			return {
				coverageReason: scenarioNetworkCoverageReason(capture, nodes),
				forStep: (stepIndex) => ({
					events: eventsByStep.get(stepIndex) ?? [],
					network_transactions: networkByStep.get(stepIndex) ?? []
				})
			};
		};
		networkContentCoverageReason = (before, after) => {
			const left = before.scenario.network_content;
			const right = after.scenario.network_content;
			return left.request_body !== right.request_body || left.response_body !== right.response_body || left.header_values !== right.header_values ? "Network content selections differ; capture both sides with matching content selection before comparing network evidence." : undefined;
		};
		eventFamilyCoverageReason = (before, after) => {
			const left = before.scenario.event_families;
			const right = after.scenario.event_families;
			if (left === undefined || right === undefined) return "Event family selection was not recorded in at least one retained capture; event evidence remains unknown. Recapture both sides with explicit matching selections.";
			const leftFamilies = new Set(left);
			const rightFamilies = new Set(right);
			return leftFamilies.size === rightFamilies.size && [...leftFamilies].every((family) => rightFamilies.has(family)) ? undefined : `Event family selections differ (${familyList(leftFamilies)} before, ${familyList(rightFamilies)} after); capture both sides with matching event families before comparing event evidence.`;
		};
		familyList = (families) => families.size === 0 ? "none" : [...families].sort().join(", ");
		captured = (value) => ({
			state: "captured",
			value
		});
		screenshotProjection = (screenshot) => ({
			sha256: screenshot.sha256,
			bytes: screenshot.bytes,
			media_type: screenshot.media_type
		});
	})))();
}

//#endregion
//#region dist/domain/browserScenarioDiff.js
var scenarioEventsValueSchema, compareBrowserScenarios, alignScenarioSteps, compareAlignedSteps, duplicateStepIds, uniqueSteps, duplicateFailures, missingFailures, captureContextsMatch, compareStepArtifacts, compareScenarioEvents, digestScenarioEvents, compareCapturedValues, joinIncomparableReasons;
function init_browserScenarioDiff() {
	return (init_browserScenarioDiff = __esmMin((() => {
		init_canonicalDigest();
		init_browserScenarioDiffEvidence();
		init_browserScenarioDiffValues();
		init_browserScenarioNormalization();
		scenarioEventsValueSchema = z.strictObject({
			events: z.array(z.unknown()),
			network_transactions: z.array(z.string())
		});
		compareBrowserScenarios = (input) => {
			const normalization = commitBrowserScenarioNormalization(input.normalization);
			const beforeEvents = prepareScenarioEvents(input.before_scenario, normalization.rules);
			const afterEvents = prepareScenarioEvents(input.after_scenario, normalization.rules);
			const familyIncomparableReason = eventFamilyCoverageReason(input.before_scenario, input.after_scenario);
			const incomparableReason = joinIncomparableReasons(familyIncomparableReason, networkContentCoverageReason(input.before_scenario, input.after_scenario), beforeEvents.coverageReason, afterEvents.coverageReason);
			const alignment = alignScenarioSteps(input.before_scenario, input.after_scenario);
			const compared = compareAlignedSteps({
				beforeCapture: input.before_scenario,
				afterCapture: input.after_scenario,
				alignment,
				rules: normalization.rules,
				beforeEvents,
				afterEvents,
				incomparableReason,
				familyIncomparableReason
			});
			const failures = [...alignment.failures, ...compared.failures];
			const alignmentStatus = failures.length === 0 ? "aligned" : compared.steps.length === 0 ? "failed" : "partial";
			const stepStatuses = compared.steps.map(({ status }) => status);
			const equalityEligible = input.before_scenario.completeness.equality_eligible && input.after_scenario.completeness.equality_eligible && alignmentStatus === "aligned";
			const overallStatus = stepStatuses.includes("changed") ? "changed" : stepStatuses.includes("unknown") || !equalityEligible ? "unknown" : "unchanged";
			return browserScenarioDiffSchema.parse({
				comparison_kind: "browser_scenario",
				overall_status: overallStatus,
				normalization,
				alignment: {
					status: alignmentStatus,
					aligned_steps: compared.steps.length,
					before_only: alignment.beforeOnly,
					after_only: alignment.afterOnly,
					failures
				},
				steps: compared.steps,
				artifact_diffs: { total: compared.totalArtifactDiffs },
				limitations: [
					"Steps align only by exact, unique step_id; missing, duplicate, or action-mismatched steps are reported and prevent an unchanged claim.",
					"Only declared literal normalization rules are applied, in canonical rule_id order, to already-redacted durable capture fields.",
					"Elapsed time, event sequence/index values, request observation times and durations, and capture-local transaction IDs are excluded as volatile; network transactions are compared as an unordered collection in the step that sent their request; cookies, local storage and session storage entries are compared as unordered collections after literal normalization; screenshot bytes are compared by content digest.",
					"A changed status proves an observed normalized difference. Missing or truncated evidence, incompatible capture context, or alignment failure prevents an unchanged claim."
				]
			});
		};
		alignScenarioSteps = (beforeCapture, afterCapture) => {
			const beforeDuplicates = duplicateStepIds(beforeCapture.steps);
			const afterDuplicates = duplicateStepIds(afterCapture.steps);
			const before = uniqueSteps(beforeCapture.steps, beforeDuplicates);
			const after = uniqueSteps(afterCapture.steps, afterDuplicates);
			const beforeOnly = [...before.keys()].filter((stepId) => !after.has(stepId) && !afterDuplicates.has(stepId)).sort();
			const afterOnly = [...after.keys()].filter((stepId) => !before.has(stepId) && !beforeDuplicates.has(stepId)).sort();
			const failures = [
				...duplicateFailures("before", beforeDuplicates),
				...duplicateFailures("after", afterDuplicates),
				...missingFailures("before", afterOnly),
				...missingFailures("after", beforeOnly)
			];
			if (!captureContextsMatch(beforeCapture, afterCapture)) failures.push({
				code: "capture_context_mismatch",
				step_id: null,
				reason: "Browser product/version or scenario origin scope differs between captures."
			});
			return {
				before,
				after,
				beforeOnly,
				afterOnly,
				failures,
				orderedStepIds: beforeCapture.steps.map(({ step_id }) => step_id).filter((stepId, index, values) => values.indexOf(stepId) === index && before.has(stepId) && after.has(stepId))
			};
		};
		compareAlignedSteps = (input) => {
			let totalArtifactDiffs = 0;
			const steps = [];
			const failures = [];
			for (const stepId of input.alignment.orderedStepIds) {
				const beforeStep = input.alignment.before.get(stepId);
				const afterStep = input.alignment.after.get(stepId);
				if (beforeStep === undefined || afterStep === undefined) continue;
				if (beforeStep.action !== afterStep.action) failures.push({
					code: "action_mismatch",
					step_id: stepId,
					reason: `Aligned step action changed from ${beforeStep.action} to ${afterStep.action}.`
				});
				const artifacts = compareStepArtifacts({
					beforeCapture: input.beforeCapture,
					beforeStep,
					afterCapture: input.afterCapture,
					afterStep,
					rules: input.rules,
					beforeEvents: input.beforeEvents,
					afterEvents: input.afterEvents,
					incomparableReason: input.incomparableReason,
					familyIncomparableReason: input.familyIncomparableReason
				});
				const reportable = artifacts.flatMap(({ diff }) => diff === null ? [] : [diff]);
				totalArtifactDiffs += reportable.length;
				const statuses = artifacts.map(({ status }) => status);
				steps.push({
					step_id: stepId,
					before_step_index: beforeStep.step_index,
					after_step_index: afterStep.step_index,
					before_action: beforeStep.action,
					after_action: afterStep.action,
					status: statuses.includes("changed") ? "changed" : statuses.includes("unknown") ? "unknown" : "unchanged",
					artifact_diffs: reportable
				});
			}
			return {
				steps,
				failures,
				totalArtifactDiffs
			};
		};
		duplicateStepIds = (steps) => {
			const seen = new Set();
			const duplicates = new Set();
			for (const { step_id: stepId } of steps) {
				if (seen.has(stepId)) duplicates.add(stepId);
				seen.add(stepId);
			}
			return duplicates;
		};
		uniqueSteps = (steps, duplicates) => new Map(steps.flatMap((step) => duplicates.has(step.step_id) ? [] : [[step.step_id, step]]));
		duplicateFailures = (side, duplicates) => [...duplicates].sort().map((stepId) => ({
			code: side === "before" ? "duplicate_before_step_id" : "duplicate_after_step_id",
			step_id: stepId,
			reason: `${side} capture contains duplicate step_id ${stepId}.`
		}));
		missingFailures = (side, stepIds) => stepIds.map((stepId) => ({
			code: side === "before" ? "missing_before_step" : "missing_after_step",
			step_id: stepId,
			reason: `Step ${stepId} is missing from the ${side} capture.`
		}));
		captureContextsMatch = (before, after) => before.browser.product === after.browser.product && before.browser.version === after.browser.version && before.scenario.start_origin === after.scenario.start_origin;
		compareStepArtifacts = (input) => {
			const common = {
				beforeStep: input.beforeStep,
				afterStep: input.afterStep,
				rules: input.rules
			};
			return [
				compareCapturedValues({
					...common,
					artifact: "action_state",
					before: captured(actionState(input.beforeStep)),
					after: captured(actionState(input.afterStep))
				}),
				compareCapturedValues({
					...common,
					artifact: "screenshot",
					before: input.beforeStep.artifacts.screenshot,
					after: input.afterStep.artifacts.screenshot,
					project: screenshotProjection
				}),
				compareCapturedValues({
					...common,
					artifact: "dom",
					before: input.beforeStep.artifacts.dom,
					after: input.afterStep.artifacts.dom,
					project: ({ text }) => text
				}),
				compareCapturedValues({
					...common,
					artifact: "accessibility",
					before: input.beforeStep.artifacts.accessibility,
					after: input.afterStep.artifacts.accessibility,
					project: ({ text }) => text
				}),
				compareCapturedValues({
					...common,
					artifact: "url",
					before: input.beforeStep.artifacts.url,
					after: input.afterStep.artifacts.url
				}),
				compareCapturedValues({
					...common,
					artifact: "history",
					before: input.beforeStep.artifacts.history,
					after: input.afterStep.artifacts.history
				}),
				compareCapturedValues({
					...common,
					artifact: "storage",
					before: input.beforeStep.artifacts.storage,
					after: input.afterStep.artifacts.storage,
					project: storageProjection,
					incomparableReason: storageFingerprintCoverageReason(input.beforeStep.artifacts.storage, input.afterStep.artifacts.storage)
				}),
				compareScenarioEvents({
					...common,
					artifact: "events",
					before: captured(input.beforeEvents.forStep(input.beforeStep.step_index)),
					after: captured(input.afterEvents.forStep(input.afterStep.step_index)),
					beforeState: eventEvidenceState(input.beforeCapture, input.beforeStep),
					afterState: eventEvidenceState(input.afterCapture, input.afterStep),
					incomparableReason: input.incomparableReason,
					familyIncomparableReason: input.familyIncomparableReason
				})
			];
		};
		compareScenarioEvents = (input) => {
			const beforeState = input.beforeState ?? artifactEvidenceState(input.artifact, input.before, input.beforeStep);
			const afterState = input.afterState ?? artifactEvidenceState(input.artifact, input.after, input.afterStep);
			if (beforeState === "not_requested" && afterState === "not_requested") return {
				artifact: input.artifact,
				status: "not_compared",
				diff: null
			};
			const beforeValue = input.before.state === "captured" ? input.before.value : undefined;
			const afterValue = input.after.state === "captured" ? input.after.value : undefined;
			const isCaptured = beforeState === "captured" && afterState === "captured" && beforeValue !== undefined && afterValue !== undefined;
			const ordinaryBeforeDigest = beforeValue === undefined ? null : digestCanonicalValue(normalizeScenarioValue(beforeValue.events, "events", input.rules), "Browser scenario");
			const ordinaryAfterDigest = afterValue === undefined ? null : digestCanonicalValue(normalizeScenarioValue(afterValue.events, "events", input.rules), "Browser scenario");
			const beforeSha256 = beforeState === "captured" && beforeValue !== undefined ? digestScenarioEvents(beforeValue, ordinaryBeforeDigest) : null;
			const afterSha256 = afterState === "captured" && afterValue !== undefined ? digestScenarioEvents(afterValue, ordinaryAfterDigest) : null;
			const changedOrdinaryEvents = isCaptured && ordinaryBeforeDigest !== ordinaryAfterDigest;
			if (changedOrdinaryEvents && input.familyIncomparableReason === undefined) return {
				artifact: input.artifact,
				status: "changed",
				diff: {
					artifact: input.artifact,
					status: "changed",
					before_state: beforeState,
					after_state: afterState,
					before_sha256: beforeSha256,
					after_sha256: afterSha256,
					reason: input.incomparableReason ?? null
				}
			};
			if (!isCaptured || input.incomparableReason !== undefined || input.familyIncomparableReason !== undefined) return {
				artifact: input.artifact,
				status: "unknown",
				diff: {
					artifact: input.artifact,
					status: "unknown",
					before_state: beforeState,
					after_state: afterState,
					before_sha256: beforeSha256,
					after_sha256: afterSha256,
					reason: input.incomparableReason ?? `Artifact coverage is not comparable (${beforeState} before, ${afterState} after).`
				}
			};
			if (beforeSha256 === null || afterSha256 === null) throw new TypeError("Captured event digest refinement failed");
			if (beforeSha256 === afterSha256) return {
				artifact: input.artifact,
				status: "unchanged",
				diff: null
			};
			return {
				artifact: input.artifact,
				status: "changed",
				diff: {
					artifact: input.artifact,
					status: "changed",
					before_state: beforeState,
					after_state: afterState,
					before_sha256: beforeSha256,
					after_sha256: afterSha256,
					reason: null
				}
			};
		};
		digestScenarioEvents = (value, ordinaryEventsDigest) => {
			const parsed = scenarioEventsValueSchema.parse(value);
			return digestCanonicalValue({
				ordinary_events_sha256: ordinaryEventsDigest,
				network_transactions: parsed.network_transactions
			}, "Browser scenario");
		};
		compareCapturedValues = (input) => {
			const { artifact, before, after, beforeStep, afterStep, rules, project = (value) => value } = input;
			const beforeState = input.beforeState ?? artifactEvidenceState(artifact, before, beforeStep);
			const afterState = input.afterState ?? artifactEvidenceState(artifact, after, afterStep);
			if (beforeState === "not_requested" && afterState === "not_requested") return {
				artifact,
				status: "not_compared",
				diff: null
			};
			const beforeSha256 = beforeState === "captured" && before.state === "captured" ? digestNormalizedScenarioValue(project(before.value), artifact, rules) : null;
			const afterSha256 = afterState === "captured" && after.state === "captured" ? digestNormalizedScenarioValue(project(after.value), artifact, rules) : null;
			if (beforeState !== "captured" || afterState !== "captured" || before.state !== "captured" || after.state !== "captured" || input.incomparableReason !== undefined) return {
				artifact,
				status: "unknown",
				diff: {
					artifact,
					status: "unknown",
					before_state: beforeState,
					after_state: afterState,
					before_sha256: beforeSha256,
					after_sha256: afterSha256,
					reason: input.incomparableReason ?? `Artifact coverage is not comparable (${beforeState} before, ${afterState} after).`
				}
			};
			if (beforeSha256 === null || afterSha256 === null) throw new TypeError("Captured artifact digest refinement failed");
			if (beforeSha256 === afterSha256) return {
				artifact,
				status: "unchanged",
				diff: null
			};
			return {
				artifact,
				status: "changed",
				diff: {
					artifact,
					status: "changed",
					before_state: beforeState,
					after_state: afterState,
					before_sha256: beforeSha256,
					after_sha256: afterSha256,
					reason: null
				}
			};
		};
		joinIncomparableReasons = (...reasons) => {
			const present = reasons.filter((reason) => reason !== undefined);
			return present.length === 0 ? undefined : [...new Set(present)].join(" ");
		};
	})))();
}

//#endregion
//#region dist/domain/webInventory.js
var webResourceComparisonIdentity, stableWebResources, createCapturedWebScriptReconciler, stableWebScriptKey;
function init_webInventory() {
	return (init_webInventory = __esmMin((() => {
		init_canonicalDigest();
		init_unicodeCodePointOrder();
		webResourceComparisonIdentity = (resource) => `resg_${digestCanonicalValue({
			url: resource.url,
			origin: resource.origin,
			type: resource.type,
			mime_type: resource.mime_type
		}, "Web resource comparison identity")}`;
		stableWebResources = (resources) => {
			const keyed = resources.map((resource) => ({
				...resource,
				resource_key: `res_${digestCanonicalValue(resource, "Web inventory")}`
			}));
			return [...new Map(keyed.map((resource) => [resource.resource_key, resource])).values()].sort((left, right) => compareUnicodeCodePoints(left.resource_key, right.resource_key) || compareUnicodeCodePoints(left.url, right.url));
		};
		createCapturedWebScriptReconciler = (rawResources, resources) => {
			const rawByUrl = new Map();
			for (const resource of rawResources) rawByUrl.set(resource.rawUrl, rawByUrl.has(resource.rawUrl) ? null : resource);
			const keysByUrl = new Map();
			for (const resource of resources) {
				const keys = keysByUrl.get(resource.url);
				if (keys === undefined) keysByUrl.set(resource.url, [resource.resource_key]);
				else keys.push(resource.resource_key);
			}
			for (const [url, keys] of keysByUrl) if (keys.length > 1) keysByUrl.set(url, [...new Set(keys)].sort());
			return (script) => {
				const resource = rawByUrl.get(script.rawUrl);
				if (resource !== undefined && resource !== null) {
					const { rawUrl: _rawUrl, ...publicResource } = resource;
					const stable = stableWebResources([publicResource])[0];
					if (stable !== undefined) return {
						status: "exact",
						resource_key: stable.resource_key
					};
				}
				const candidates = keysByUrl.get(script.url);
				if (candidates !== undefined) return {
					status: "ambiguous",
					candidate_resource_keys: [...candidates]
				};
				return {
					status: "unmatched",
					reason: "no_exact_sanitized_url"
				};
			};
		};
		stableWebScriptKey = (script) => `scr_${digestCanonicalValue({
			url: script.url,
			cdp_hash: script.cdp_hash,
			length: script.length,
			is_module: script.is_module,
			language: script.language,
			source_map_url: script.source_map_url
		}, "Web inventory")}`;
	})))();
}

//#endregion
//#region dist/domain/webCaptureDiffSchemas.js
var captureSnapshotSchema, compareWebCapturesInputSchema, changeSchema, emptyDimensionShape, dimensionSchema, webCaptureDiffSchema;
function init_webCaptureDiffSchemas() {
	return (init_webCaptureDiffSchemas = __esmMin((() => {
		init_emptyArraySchema();
		init_schemaAnnotations();
		init_browserObservationSchemas();
		init_webMcpDiscovery();
		captureSnapshotSchema = z.object({
			inspection: presentCompleteObservation(webPageInspectionSchema.describe("Complete normalized_result from inspect_web_page, including capture identity, observations, completeness, and limitations.")),
			webmcp: presentCompleteObservation(webMcpDiscoverySchema).nullable().default(null).describe("Complete normalized_result from discover_webmcp_tools for this capture, or null when it was not recorded.")
		});
		compareWebCapturesInputSchema = z.strictObject({
			before: captureSnapshotSchema,
			after: captureSnapshotSchema
		});
		changeSchema = z.object({
			identity: z.string(),
			change: z.enum([
				"added",
				"removed",
				"modified"
			])
		});
		emptyDimensionShape = {
			total_changes: z.literal(0),
			changes: emptyArraySchema
		};
		dimensionSchema = z.union([
			z.object({
				status: z.literal("changed"),
				total_changes: z.int().min(1),
				changes: z.array(changeSchema),
				reason: z.null()
			}).superRefine((dimension, context) => {
				if (dimension.changes.length !== dimension.total_changes) context.addIssue({
					code: "custom",
					message: "Inline changes must equal total changes",
					path: ["total_changes"]
				});
			}),
			z.object({
				...emptyDimensionShape,
				status: z.literal("unchanged"),
				reason: z.null()
			}),
			z.object({
				...emptyDimensionShape,
				status: z.literal("unknown"),
				reason: z.string()
			})
		]);
		webCaptureDiffSchema = z.object({
			overall_status: z.enum([
				"changed",
				"unchanged",
				"unknown"
			]),
			before_target: z.object({
				target_id: z.string(),
				url: z.string()
			}),
			after_target: z.object({
				target_id: z.string(),
				url: z.string()
			}),
			dimensions: z.object({
				dom_structure: dimensionSchema,
				scripts: dimensionSchema,
				resources: dimensionSchema,
				network: dimensionSchema,
				metadata: dimensionSchema,
				webmcp: dimensionSchema,
				accessibility: dimensionSchema,
				storage: dimensionSchema
			}),
			limitations: z.array(z.string())
		}).superRefine((comparison, context) => {
			const statuses = Object.values(comparison.dimensions).map(({ status }) => status);
			const expected = statuses.includes("changed") ? "changed" : statuses.includes("unknown") ? "unknown" : "unchanged";
			if (comparison.overall_status !== expected) context.addIssue({
				code: "custom",
				message: "Overall status must summarize dimension statuses",
				path: ["overall_status"]
			});
		});
	})))();
}

//#endregion
//#region dist/domain/webCaptureFrameComparison.js
var WebCaptureFrameError, fingerprintWebCaptureFrames;
function init_webCaptureFrameComparison() {
	return (init_webCaptureFrameComparison = __esmMin((() => {
		init_canonicalDigest();
		WebCaptureFrameError = class extends Error {
			code;
			_tag = "WebCaptureFrameError";
			constructor(code) {
				super(code);
				this.code = code;
				this.name = "WebCaptureFrameError";
			}
		};
		fingerprintWebCaptureFrames = (frames) => {
			const byId = new Map(frames.map((frame) => [frame.frame_id, frame]));
			if (byId.size !== frames.length) return null;
			const remaining = new Map(frames.map((frame) => [frame.frame_id, 0]));
			for (const frame of frames) {
				if (frame.parent_frame_id === null) continue;
				const count = remaining.get(frame.parent_frame_id);
				if (count === undefined) return null;
				remaining.set(frame.parent_frame_id, count + 1);
			}
			const ready = frames.filter((frame) => remaining.get(frame.frame_id) === 0);
			const children = new Map();
			const roots = [];
			let examined = 0;
			for (let index = 0; index < ready.length; index += 1) {
				const frame = ready[index];
				if (frame === undefined) throw new WebCaptureFrameError("missing_ready_frame");
				const fingerprint = digestCanonicalValue({
					url: frame.url,
					origin: frame.origin,
					children: (children.get(frame.frame_id) ?? []).sort()
				});
				examined += 1;
				const parentId = frame.parent_frame_id;
				if (parentId === null) {
					roots.push(fingerprint);
					continue;
				}
				const siblings = children.get(parentId) ?? [];
				siblings.push(fingerprint);
				children.set(parentId, siblings);
				const count = (remaining.get(parentId) ?? 0) - 1;
				remaining.set(parentId, count);
				if (count === 0) {
					const parent = byId.get(parentId);
					if (parent === undefined) throw new WebCaptureFrameError("missing_parent_frame");
					ready.push(parent);
				}
			}
			return examined === frames.length ? digestCanonicalValue(roots.sort()) : null;
		};
	})))();
}

//#endregion
//#region dist/domain/webCaptureDiff.js
var compareWebCaptures, compareIdentities, compareDimension, accessibilityDimension, storageDimension, compareWebCaptureDimensions, resourceInventoryReadable, compareResources, resourceGroups, resourceSizesContained, bodyShapesSelected, webSocketShapesSelected, networkIdentity, networkIdentityCoverage, networkResponseFields, redirectMetadataFields, sharedNetworkMetadata, redirectNetworkIdentity, networkInventoryComplete, webSocketEventHasOpcode, webSocketEventHasPayloadBytes, webSocketEventHasPayloadShape, webSocketOpcodesKnown, networkDimension, networkMap, networkComparisonMaps, samplesContained, webSocketGroups, webSocketMetadataMap, webSocketPayloadMaps, webMcpDimension, projectWebMcpTools, webMcpComplete, sectionsComplete, incompleteSections, compareAggregate, domValueLengthsComparable, domNodesDiffer, domDimension, declarationCountsExceed, metadataEntries, groupScriptMapFacts, scriptMapMetadataFitsAll, scriptMapGroupAssignmentExceeds, scriptMapFactsExceed, scriptsDimension, metadataProjection, singleton, accessibilityComparable, accessibilityProjection, storageKeysComparable, storageMap, storageFingerprintIdentities, completeStorageFingerprints;
function init_webCaptureDiff() {
	return (init_webCaptureDiff = __esmMin((() => {
		init_canonicalDigest();
		init_unicodeCodePointOrder();
		init_webInventory();
		init_webCaptureDiffSchemas();
		init_webCaptureFrameComparison();
		compareWebCaptures = (input) => {
			const before = input.before.inspection;
			const after = input.after.inspection;
			const dimensions = compareWebCaptureDimensions(input);
			const statuses = Object.values(dimensions).map(({ status }) => status);
			return webCaptureDiffSchema.parse({
				overall_status: statuses.includes("changed") ? "changed" : statuses.includes("unknown") ? "unknown" : "unchanged",
				before_target: {
					target_id: before.target.target_id,
					url: before.target.url
				},
				after_target: {
					target_id: after.target.target_id,
					url: after.target.url
				},
				dimensions,
				limitations: [
					"A changed status proves an observed difference; an unknown status means necessary comparison facts or coverage were unavailable.",
					...!domValueLengthsComparable(before.dom, after.dom) ? ["DOM value-length comparison is unknown because units are missing or different; independent structural differences can still establish a change."] : [],
					"Network comparison covers only activity observed after each CDP attachment. WebSocket connections with the same URL are compared as an unordered collection of ordered frame streams, retaining connection counts; their individual identities are not stable across captures.",
					"Accessibility structure is compared when the tree is complete; text additionally requires complete selected text capture. A missing role leaves that node's role comparison unknown; independently observed differences can still establish a change.",
					"Storage key inventories are compared only when selected and complete; usage and quota are compared only when reported. Redacted content is compared through complete SHA-256 fingerprints."
				]
			});
		};
		compareIdentities = (before, after) => {
			const changes = [];
			for (const [identity, fingerprint] of before) {
				const next = after.get(identity);
				if (next === undefined) changes.push({
					identity,
					change: "removed"
				});
				else if (next !== fingerprint) changes.push({
					identity,
					change: "modified"
				});
			}
			for (const identity of after.keys()) if (!before.has(identity)) changes.push({
				identity,
				change: "added"
			});
			return changes.sort((left, right) => compareUnicodeCodePoints(left.identity, right.identity) || compareUnicodeCodePoints(left.change, right.change));
		};
		compareDimension = (before, after, complete, reason, inventoryComplete = complete) => {
			const all = compareIdentities(before, after).filter(({ identity, change }) => change === "modified" || (typeof inventoryComplete === "boolean" ? inventoryComplete : inventoryComplete(identity)));
			if (all.length > 0) return {
				status: "changed",
				total_changes: all.length,
				changes: all,
				reason: null
			};
			return complete ? {
				status: "unchanged",
				total_changes: 0,
				changes: [],
				reason: null
			} : {
				status: "unknown",
				total_changes: 0,
				changes: [],
				reason
			};
		};
		accessibilityDimension = (before, after) => {
			const beforeAccess = accessibilityComparable(before);
			const afterAccess = accessibilityComparable(after);
			const textComparable = beforeAccess.text && afterAccess.text;
			const nodesComparable = beforeAccess.nodes && afterAccess.nodes;
			const rolesComplete = before.accessibility.nodes.every((node) => node.role !== null) && after.accessibility.nodes.every((node) => node.role !== null);
			const reason = "Accessibility tree, role, or text capture was incomplete in at least one observation.";
			if (!nodesComparable) return {
				status: "unknown",
				total_changes: 0,
				changes: [],
				reason
			};
			return compareDimension(singleton("accessibility_tree", digestCanonicalValue(accessibilityProjection(before.accessibility, after.accessibility, textComparable))), singleton("accessibility_tree", digestCanonicalValue(accessibilityProjection(after.accessibility, before.accessibility, textComparable))), beforeAccess.complete && afterAccess.complete && rolesComplete, reason);
		};
		storageDimension = (before, after) => {
			const keysComplete = storageKeysComparable(before) && storageKeysComparable(after);
			const usageComplete = before.storage.usage_bytes !== null && after.storage.usage_bytes !== null && before.storage.quota_bytes !== null && after.storage.quota_bytes !== null;
			const comparableFingerprints = storageFingerprintIdentities(before.storage, after.storage);
			return compareDimension(storageMap(before.storage, keysComplete, usageComplete, comparableFingerprints), storageMap(after.storage, keysComplete, usageComplete, comparableFingerprints), keysComplete && usageComplete && before.storage.fingerprints_complete && after.storage.fingerprints_complete, "Storage fingerprints, inventories, usage, or quota were unavailable or truncated in at least one observation.", keysComplete);
		};
		compareWebCaptureDimensions = (input) => {
			const before = input.before.inspection;
			const after = input.after.inspection;
			return {
				dom_structure: domDimension(before, after),
				scripts: scriptsDimension(before, after),
				resources: compareResources(before.resources, after.resources, sectionsComplete(before, ["resources"]), sectionsComplete(after, ["resources"]), resourceInventoryReadable(before), resourceInventoryReadable(after)),
				network: networkDimension(before, after),
				metadata: compareAggregate("metadata", metadataProjection(before), metadataProjection(after), sectionsComplete(before, ["metadata"]) && sectionsComplete(after, ["metadata"]), "Safe metadata capture was incomplete in at least one observation."),
				webmcp: webMcpDimension(input.before.webmcp, input.after.webmcp),
				accessibility: accessibilityDimension(before, after),
				storage: storageDimension(before, after)
			};
		};
		resourceInventoryReadable = (inspection) => !inspection.completeness.unavailable_sections.includes("resources");
		compareResources = (before, after, beforeComplete, afterComplete, beforeReadable, afterReadable) => {
			const reason = "Resource inventory or content-size evidence was incomplete in at least one observation.";
			if (!beforeReadable || !afterReadable) return {
				status: "unknown",
				total_changes: 0,
				changes: [],
				reason
			};
			const complete = beforeComplete && afterComplete;
			const left = resourceGroups(before);
			const right = resourceGroups(after);
			const changes = [];
			let unresolved = false;
			for (const identity of new Set([...left.keys(), ...right.keys()])) {
				const leftSizes = left.get(identity);
				const rightSizes = right.get(identity);
				if (leftSizes === undefined || rightSizes === undefined) {
					const absenceProven = leftSizes === undefined ? beforeComplete : afterComplete;
					if (absenceProven) changes.push({
						identity,
						change: leftSizes === undefined ? "added" : "removed"
					});
					else unresolved = true;
					continue;
				}
				if (leftSizes.has(null) || rightSizes.has(null)) {
					unresolved = true;
					continue;
				}
				if (beforeComplete && !resourceSizesContained(rightSizes, leftSizes) || afterComplete && !resourceSizesContained(leftSizes, rightSizes)) changes.push({
					identity,
					change: "modified"
				});
			}
			if (changes.length > 0) return {
				status: "changed",
				total_changes: changes.length,
				changes: changes.sort((leftChange, rightChange) => compareUnicodeCodePoints(leftChange.identity, rightChange.identity)),
				reason: null
			};
			if (!complete || unresolved) return {
				status: "unknown",
				total_changes: 0,
				changes: [],
				reason
			};
			return {
				status: "unchanged",
				total_changes: 0,
				changes: [],
				reason: null
			};
		};
		resourceGroups = (resources) => {
			const groups = new Map();
			for (const resource of resources) {
				const identity = webResourceComparisonIdentity(resource);
				const sizes = groups.get(identity);
				if (sizes === undefined) groups.set(identity, new Set([resource.content_size]));
				else sizes.add(resource.content_size);
			}
			return groups;
		};
		resourceSizesContained = (observed, complete) => [...observed].every((size) => complete.has(size));
		bodyShapesSelected = (inspection) => !inspection.completeness.excluded.some(({ section, reason }) => section === "json_body_shapes" && reason === "not_approved") && (inspection.network.requests.length === 0 || inspection.network.requests.some(({ body_shapes }) => body_shapes.status !== "not_approved"));
		webSocketShapesSelected = (inspection) => !inspection.completeness.excluded.some(({ section, reason }) => section === "websocket_shapes" && reason === "not_approved");
		networkIdentity = (request) => `net_${digestCanonicalValue({
			method: request.method,
			url: request.url,
			resource_type: request.resource_type
		})}`;
		networkIdentityCoverage = (before, after) => {
			const complete = [before, after].every((inspection) => inspection.network.requests.every(({ resource_type }) => resource_type !== null));
			const ambiguousIdentities = new Set();
			if (complete) return {
				complete,
				ambiguousIdentities
			};
			const matchKey = (request) => JSON.stringify([request.method, request.url]);
			const unknownTypes = (inspection) => {
				const groups = new Map();
				for (const request of inspection.network.requests) {
					const key = matchKey(request);
					groups.set(key, groups.get(key) === true || request.resource_type === null);
				}
				return groups;
			};
			const retainPotentialMatches = (inspection, peer) => {
				for (const request of inspection.network.requests) {
					const peerUnknown = peer.get(matchKey(request));
					if (peerUnknown === true || peerUnknown === false && request.resource_type === null) ambiguousIdentities.add(networkIdentity(request));
				}
			};
			retainPotentialMatches(before, unknownTypes(after));
			retainPotentialMatches(after, unknownTypes(before));
			return {
				complete,
				ambiguousIdentities
			};
		};
		networkResponseFields = [
			"status",
			"mime_type",
			"encoded_data_length"
		];
		redirectMetadataFields = [...networkResponseFields, "resource_type"];
		sharedNetworkMetadata = (before, after) => {
			const shared = new Map();
			let complete = true;
			const retainKnownFields = (identity, metadata, required) => {
				const fields = shared.get(identity) ?? new Set(required);
				for (const field of required) if (metadata[field] === null) {
					fields.delete(field);
					complete = false;
				}
				shared.set(identity, fields);
			};
			for (const inspection of [before, after]) for (const request of inspection.network.requests) {
				const identity = networkIdentity(request);
				retainKnownFields(identity, request, networkResponseFields);
				for (const [index, redirect] of request.redirects.entries()) retainKnownFields(redirectNetworkIdentity(identity, index), redirect, redirectMetadataFields);
			}
			return {
				fields: shared,
				complete
			};
		};
		redirectNetworkIdentity = (identity, index) => compositeKey([
			identity,
			"redirect",
			index
		]);
		networkInventoryComplete = (inspection, sections) => sectionsComplete(inspection, sections) && sections.every((section) => inspection.completeness.dropped_events[section] === 0);
		webSocketEventHasOpcode = (event) => event !== undefined && event.opcode !== null;
		webSocketEventHasPayloadBytes = (event) => webSocketEventHasOpcode(event) && event.payload_bytes !== null;
		webSocketEventHasPayloadShape = (event) => webSocketEventHasOpcode(event) && event.payload_shape !== null;
		webSocketOpcodesKnown = (inspection) => inspection.network.websocket_connections.every((connection) => connection.events.every(webSocketEventHasOpcode));
		networkDimension = (before, after) => {
			const requestsComplete = [before, after].every((inspection) => networkInventoryComplete(inspection, ["network_requests"]));
			const webSocketFramesComplete = [before, after].every((inspection) => networkInventoryComplete(inspection, ["websocket_connections", "websocket_frames"]));
			const webSocketInventoryComplete = [before, after].every((inspection) => networkInventoryComplete(inspection, ["websocket_connections", "websocket_frames"]) && webSocketOpcodesKnown(inspection));
			const requestIdentities = networkIdentityCoverage(before, after);
			const metadata = sharedNetworkMetadata(before, after);
			const selected = bodyShapesSelected(before) && bodyShapesSelected(after);
			const webSocketShapes = webSocketShapesSelected(before) && webSocketShapesSelected(after);
			const projection = {
				metadataFields: metadata.fields,
				ambiguousIdentities: requestIdentities.ambiguousIdentities,
				initiatorsComplete: [before, after].every((inspection) => sectionsComplete(inspection, ["network_initiators"]))
			};
			const sources = new Map();
			if (selected) {
				const observedSources = (inspection) => {
					const result = new Map();
					for (const request of inspection.network.requests) {
						const identity = networkIdentity(request);
						const previous = result.get(identity);
						result.set(identity, {
							request: previous?.request !== false && request.body_shapes.request !== null,
							response: previous?.response !== false && request.body_shapes.response !== null
						});
					}
					return result;
				};
				const left = observedSources(before);
				const right = observedSources(after);
				for (const [identity, coverage] of left) {
					const next = right.get(identity);
					sources.set(identity, {
						request: coverage.request && next?.request === true,
						response: coverage.response && next?.response === true
					});
				}
			}
			const shapesComplete = !selected || [before, after].every((inspection) => sectionsComplete(inspection, ["json_body_shapes"]) && inspection.network.requests.every(({ body_shapes }) => body_shapes.status === "included"));
			const webSocketShapesComplete = !webSocketShapes || [before, after].every((inspection) => sectionsComplete(inspection, ["websocket_shapes"]) && inspection.network.websocket_connections.every((connection) => connection.events.every(webSocketEventHasPayloadShape)));
			const webSocketPayloadBytesComplete = [before, after].every((inspection) => inspection.network.websocket_connections.every((connection) => connection.events.every(webSocketEventHasPayloadBytes)));
			const beforeWebSockets = webSocketGroups(before);
			const afterWebSockets = webSocketGroups(after);
			const [beforeWebSocketPayload, afterWebSocketPayload] = webSocketPayloadMaps(beforeWebSockets, afterWebSockets, webSocketShapes, webSocketFramesComplete);
			const [beforeRequests, afterRequests] = networkComparisonMaps(networkMap(before, sources, projection), networkMap(after, sources, projection), networkInventoryComplete(before, ["network_requests"]), networkInventoryComplete(after, ["network_requests"]));
			const compared = compareDimension(new Map([
				...beforeRequests,
				...webSocketInventoryComplete ? webSocketMetadataMap(beforeWebSockets) : [],
				...beforeWebSocketPayload
			]), new Map([
				...afterRequests,
				...webSocketInventoryComplete ? webSocketMetadataMap(afterWebSockets) : [],
				...afterWebSocketPayload
			]), requestsComplete && requestIdentities.complete && projection.initiatorsComplete && webSocketInventoryComplete && shapesComplete && webSocketPayloadBytesComplete && webSocketShapesComplete, requestIdentities.complete ? "Network capture or selected HTTP/WebSocket payload-shape coverage is limited, unavailable, incomplete, or includes dropped network events." : "HTTP request identity is incomplete because a resource type is unavailable; potentially matching type groups cannot establish membership/content changes or complete network equality.", (identity) => identity.startsWith("net_") ? true : identity.startsWith("ws_") && webSocketInventoryComplete);
			if (metadata.complete) return compared;
			const responseEvidenceReason = "HTTP response or redirect status, MIME type, byte count, or resource-type evidence is incomplete.";
			if (compared.status === "changed") return compared;
			return {
				status: "unknown",
				total_changes: 0,
				changes: [],
				reason: compared.reason === null ? responseEvidenceReason : `${responseEvidenceReason} ${compared.reason}`
			};
		};
		networkMap = (inspection, sources, projection) => {
			const grouped = new Map();
			for (const request of inspection.network.requests) {
				const identity = networkIdentity(request);
				if (projection.ambiguousIdentities.has(identity)) continue;
				const shapes = sources.get(identity);
				const values = grouped.get(identity) ?? [];
				const response = {};
				for (const field of projection.metadataFields.get(identity) ?? []) response[field] = request[field];
				values.push(digestCanonicalValue({
					...response,
					redirects: request.redirects.map(({ request_timestamp: _requestTimestamp, redirect_event_timestamp: _redirectEventTimestamp, ...redirect }, index) => {
						const response = {};
						for (const field of projection.metadataFields.get(redirectNetworkIdentity(identity, index)) ?? []) if (redirect[field] !== null) response[field] = redirect[field];
						return {
							url: redirect.url,
							response_url: redirect.response_url,
							method: redirect.method,
							...response
						};
					}),
					...projection.initiatorsComplete ? { initiator: request.initiator } : {},
					...shapes?.request === true ? { request_shape: request.body_shapes.request } : {},
					...shapes?.response === true ? { response_shape: request.body_shapes.response } : {}
				}));
				grouped.set(identity, values);
			}
			return grouped;
		};
		networkComparisonMaps = (before, after, beforeComplete, afterComplete) => {
			const left = new Map();
			const right = new Map();
			for (const identity of new Set([...before.keys(), ...after.keys()])) {
				const previous = before.get(identity) ?? [];
				const next = after.get(identity) ?? [];
				if (!(beforeComplete && afterComplete) && !(beforeComplete && !samplesContained(next, previous)) && !(afterComplete && !samplesContained(previous, next))) continue;
				if (before.has(identity)) left.set(identity, digestCanonicalValue([...previous].sort()));
				if (after.has(identity)) right.set(identity, digestCanonicalValue([...next].sort()));
			}
			return [left, right];
		};
		samplesContained = (samples, complete) => {
			const counts = new Map();
			for (const sample of complete) counts.set(sample, (counts.get(sample) ?? 0) + 1);
			for (const sample of samples) {
				const count = counts.get(sample) ?? 0;
				if (count === 0) return false;
				counts.set(sample, count - 1);
			}
			return true;
		};
		webSocketGroups = (inspection) => {
			const groups = new Map();
			for (const connection of inspection.network.websocket_connections) {
				const stream = digestCanonicalValue(connection.events.map(({ direction, opcode }) => ({
					direction,
					opcode
				})));
				const key = digestCanonicalValue({
					url: connection.url,
					stream
				});
				const previous = groups.get(key);
				if (previous !== undefined) previous.connections.push(connection);
				else groups.set(key, {
					url: connection.url,
					stream,
					connections: [connection]
				});
			}
			return groups;
		};
		webSocketMetadataMap = (groups) => {
			const byUrl = new Map();
			for (const group of groups.values()) {
				const streams = byUrl.get(group.url) ?? [];
				for (let index = 0; index < group.connections.length; index += 1) streams.push(group.stream);
				byUrl.set(group.url, streams);
			}
			return new Map([...byUrl].map(([url, streams]) => [`ws_${digestCanonicalValue(url)}`, digestCanonicalValue(streams.sort(compareUnicodeCodePoints))]));
		};
		webSocketPayloadMaps = (beforeGroups, afterGroups, selected, inventoryComplete) => {
			const left = new Map();
			const right = new Map();
			if (!inventoryComplete) return [left, right];
			for (const [groupKey, beforeGroup] of beforeGroups) {
				const afterGroup = afterGroups.get(groupKey);
				if (afterGroup === undefined || beforeGroup.connections.length !== afterGroup.connections.length) continue;
				const eventCount = beforeGroup.connections[0]?.events.length ?? 0;
				const comparableBytes = new Set();
				const comparableShapes = new Set();
				for (let index = 0; index < eventCount; index += 1) {
					if (beforeGroup.connections.every((connection) => webSocketEventHasPayloadBytes(connection.events[index])) && afterGroup.connections.every((connection) => webSocketEventHasPayloadBytes(connection.events[index]))) comparableBytes.add(index);
					if (selected && beforeGroup.connections.every((connection) => webSocketEventHasPayloadShape(connection.events[index])) && afterGroup.connections.every((connection) => webSocketEventHasPayloadShape(connection.events[index]))) comparableShapes.add(index);
				}
				if (comparableBytes.size === 0 && comparableShapes.size === 0) continue;
				const project = (group) => digestCanonicalValue(group.connections.map((connection) => connection.events.map((event, index) => {
					const comparablePayload = {};
					if (comparableBytes.has(index)) comparablePayload.payload_bytes = event.payload_bytes;
					if (comparableShapes.has(index)) comparablePayload.payload_shape = event.payload_shape;
					return Object.keys(comparablePayload).length === 0 ? null : comparablePayload;
				})).map((stream) => digestCanonicalValue(stream)).sort(compareUnicodeCodePoints));
				const identity = `wss_${groupKey}`;
				left.set(identity, project(beforeGroup));
				right.set(identity, project(afterGroup));
			}
			return [left, right];
		};
		webMcpDimension = (before, after) => {
			const groups = (discovery) => {
				const result = new Map();
				for (const tool of discovery?.tools.items ?? []) {
					const identity = `webmcp_${digestCanonicalValue({
						name: tool.name,
						frame_url: tool.frame_url,
						owner_origin: tool.owner_origin
					})}`;
					const tools = result.get(identity) ?? [];
					tools.push(tool);
					result.set(identity, tools);
				}
				return result;
			};
			const previous = groups(before);
			const next = groups(after);
			const beforeComplete = webMcpComplete(before);
			const afterComplete = webMcpComplete(after);
			const inventoryComplete = beforeComplete && afterComplete;
			const left = new Map();
			const right = new Map();
			let valuesComplete = true;
			for (const identity of new Set([...previous.keys(), ...next.keys()])) {
				const beforeTools = previous.get(identity) ?? [];
				const afterTools = next.get(identity) ?? [];
				if (!beforeComplete && !afterComplete) {
					valuesComplete = false;
					continue;
				}
				if (beforeTools.length > 1 || afterTools.length > 1) {
					valuesComplete = false;
					if (inventoryComplete || beforeComplete && afterTools.length > beforeTools.length || afterComplete && beforeTools.length > afterTools.length) {
						if (beforeTools.length > 0) left.set(identity, String(beforeTools.length));
						if (afterTools.length > 0) right.set(identity, String(afterTools.length));
					}
					continue;
				}
				const projection = projectWebMcpTools(beforeTools[0], afterTools[0], beforeComplete, afterComplete);
				if (!projection.complete) valuesComplete = false;
				if (projection.before !== undefined) left.set(identity, projection.before);
				if (projection.after !== undefined) right.set(identity, projection.after);
			}
			return compareDimension(left, right, inventoryComplete && valuesComplete, "WebMCP discovery, owner correspondence, or declaration evidence was unavailable or incomplete in at least one capture.", (identity) => !previous.has(identity) ? beforeComplete : !next.has(identity) ? afterComplete : inventoryComplete);
		};
		projectWebMcpTools = (beforeTool, afterTool, beforeComplete, afterComplete) => {
			let valuesComplete = true;
			const inventoryComplete = beforeComplete && afterComplete;
			const paired = beforeTool !== undefined && afterTool !== undefined;
			const consequentialKnown = beforeTool?.annotations.consequential !== undefined && afterTool?.annotations.consequential !== undefined;
			if (beforeTool !== undefined && afterTool !== undefined && !consequentialKnown) valuesComplete = false;
			const beforeSource = beforeTool?.registration_source;
			const afterSource = afterTool?.registration_source;
			const sourcePresent = beforeSource != null && afterSource != null;
			const bothAbsent = beforeSource === null && afterSource === null && inventoryComplete;
			const sourceKnown = sourcePresent || bothAbsent;
			const lineKnown = sourcePresent && beforeSource.line !== null && afterSource.line !== null;
			const columnKnown = sourcePresent && beforeSource.column !== null && afterSource.column !== null;
			if (paired && (!sourceKnown || sourcePresent && (!lineKnown || !columnKnown))) valuesComplete = false;
			const schemaKnown = !paired || (beforeComplete || beforeTool.input_schema_sha256 !== null) && (afterComplete || afterTool.input_schema_sha256 !== null);
			const annotationKeys = [
				"read_only",
				"untrusted_content",
				"autosubmit"
			];
			const knownAnnotations = new Set(annotationKeys.filter((key) => !paired || (beforeComplete || beforeTool.annotations[key] !== null) && (afterComplete || afterTool.annotations[key] !== null)));
			if (paired && (!schemaKnown || knownAnnotations.size !== annotationKeys.length)) valuesComplete = false;
			const project = (tool) => {
				const { tool_key: _key, frame_id: _frameId, annotations, registration_source: source, input_schema: schema, input_schema_sha256: schemaDigest, ...content } = tool;
				return digestCanonicalValue({
					...content,
					...schemaKnown ? {
						input_schema: schema,
						input_schema_sha256: schemaDigest
					} : {},
					...sourceKnown ? { registration_source: source === null ? null : {
						url: source.url,
						...lineKnown ? { line: source.line } : {},
						...columnKnown ? { column: source.column } : {}
					} } : {},
					annotations: {
						...Object.fromEntries(annotationKeys.filter((key) => knownAnnotations.has(key)).map((key) => [key, annotations[key]])),
						...consequentialKnown ? { consequential: annotations.consequential } : {}
					}
				});
			};
			return {
				before: beforeTool === undefined ? undefined : project(beforeTool),
				after: afterTool === undefined ? undefined : project(afterTool),
				complete: valuesComplete
			};
		};
		webMcpComplete = (discovery) => discovery !== null && discovery.status === "available" && discovery.completeness.dropped_events.webmcp_tools === 0 && !incompleteSections(discovery.completeness).has("webmcp_tools");
		sectionsComplete = (inspection, sections) => {
			const incomplete = incompleteSections(inspection.completeness);
			return sections.every((section) => !incomplete.has(section));
		};
		incompleteSections = (completeness) => new Set([
			...completeness.policy_filtered_sections,
			...completeness.attach_limited_sections,
			...completeness.truncated_sections,
			...completeness.unavailable_sections
		]);
		compareAggregate = (identity, before, after, complete, reason) => compareDimension(complete ? singleton(identity, digestCanonicalValue(before)) : new Map(), complete ? singleton(identity, digestCanonicalValue(after)) : new Map(), complete, reason);
		domValueLengthsComparable = (before, after) => before.nodes.length === 0 && after.nodes.length === 0 || before.node_value_length_unit === after.node_value_length_unit;
		domNodesDiffer = (before, after, compareLengths) => before.length !== after.length || before.some((node, index) => {
			const next = after[index];
			return next === undefined || node.index !== next.index || node.parent_index !== next.parent_index || node.node_type !== next.node_type || node.node_name !== next.node_name || compareLengths && node.node_value_length !== next.node_value_length || node.attribute_names.length !== next.attribute_names.length || node.attribute_names.some((name, position) => name !== next.attribute_names[position]);
		});
		domDimension = (before, after) => {
			const beforeFrames = fingerprintWebCaptureFrames(before.frames);
			const afterFrames = fingerprintWebCaptureFrames(after.frames);
			const nodesComplete = [before, after].every((inspection) => sectionsComplete(inspection, ["dom"]) && inspection.dom.total_nodes === inspection.dom.nodes.length);
			const framesComplete = beforeFrames !== null && afterFrames !== null && [before, after].every((inspection) => sectionsComplete(inspection, ["frames"]));
			const changes = [];
			const lengthsComparable = domValueLengthsComparable(before.dom, after.dom);
			if (nodesComplete && domNodesDiffer(before.dom.nodes, after.dom.nodes, lengthsComparable)) changes.push({
				identity: "document",
				change: "modified"
			});
			if (framesComplete && beforeFrames !== afterFrames) changes.push({
				identity: "frames",
				change: "modified"
			});
			if (changes.length > 0) return {
				status: "changed",
				total_changes: changes.length,
				changes,
				reason: null
			};
			return nodesComplete && framesComplete && lengthsComparable ? {
				status: "unchanged",
				total_changes: 0,
				changes: [],
				reason: null
			} : {
				status: "unknown",
				total_changes: 0,
				changes: [],
				reason: "DOM or frame capture was incomplete, frame ancestry was unresolved, or DOM value-length units were missing or different in at least one observation."
			};
		};
		declarationCountsExceed = (needed, slots) => {
			if (needed.length > slots.length) return true;
			let unknown = 0;
			const exact = new Map();
			for (const slot of slots) {
				if (slot.unknown) {
					unknown += 1;
					continue;
				}
				exact.set(slot.declaration, (exact.get(slot.declaration) ?? 0) + 1);
			}
			const required = new Map();
			for (const item of needed) required.set(item.declaration, (required.get(item.declaration) ?? 0) + 1);
			let surplus = 0;
			for (const [declaration, count] of required) {
				const available = exact.get(declaration) ?? 0;
				if (count > available + unknown) return true;
				if (count > available) surplus += count - available;
			}
			return surplus > unknown;
		};
		metadataEntries = (metadata) => {
			const record = metadata;
			return Object.keys(record).sort().map((key) => [key, record[key]]);
		};
		groupScriptMapFacts = (items, keyFor) => {
			const groups = new Map();
			for (const item of items) {
				const key = keyFor(item);
				const existing = groups.get(key);
				if (existing === undefined) groups.set(key, {
					...item,
					count: 1
				});
				else existing.count += 1;
			}
			return [...groups.values()];
		};
		scriptMapMetadataFitsAll = (needed, slots, metadataCompatible) => needed.every((item) => slots.every((slot) => metadataCompatible(item.metadata, slot.metadata)));
		scriptMapGroupAssignmentExceeds = (needed, slots, metadataCompatible) => {
			const residual = slots.map((slot) => slot.count);
			const demand = needed.map((item) => item.count);
			const edges = needed.map((item) => slots.flatMap((slot, index) => metadataCompatible(item.metadata, slot.metadata) && (slot.unknown || slot.declaration === item.declaration) ? [index] : []));
			const flow = new Map();
			const flowKey = (needIndex, slotIndex) => `${String(needIndex)}:${String(slotIndex)}`;
			const send = (needIndex, seen, cap) => {
				for (const slotIndex of edges[needIndex] ?? []) {
					if (seen.has(slotIndex)) continue;
					const free = residual[slotIndex] ?? 0;
					if (free <= 0) continue;
					seen.add(slotIndex);
					const pushed = Math.min(cap, free);
					residual[slotIndex] = free - pushed;
					flow.set(flowKey(needIndex, slotIndex), (flow.get(flowKey(needIndex, slotIndex)) ?? 0) + pushed);
					return pushed;
				}
				for (const slotIndex of edges[needIndex] ?? []) {
					if (seen.has(slotIndex)) continue;
					seen.add(slotIndex);
					for (let other = 0; other < needed.length; other += 1) {
						if (other === needIndex) continue;
						const moved = flow.get(flowKey(other, slotIndex)) ?? 0;
						if (moved <= 0) continue;
						const rerouted = send(other, seen, Math.min(cap, moved));
						if (rerouted <= 0) continue;
						flow.set(flowKey(other, slotIndex), moved - rerouted);
						flow.set(flowKey(needIndex, slotIndex), (flow.get(flowKey(needIndex, slotIndex)) ?? 0) + rerouted);
						return rerouted;
					}
				}
				return 0;
			};
			for (let index = 0; index < needed.length; index += 1) while ((demand[index] ?? 0) > 0) {
				const pushed = send(index, new Set(), demand[index] ?? 0);
				if (pushed === 0) return true;
				demand[index] = (demand[index] ?? 0) - pushed;
			}
			return false;
		};
		scriptMapFactsExceed = (needed, slots, metadataCompatible) => {
			if (needed.length === 0) return false;
			if (declarationCountsExceed(needed, slots)) return true;
			const needGroups = groupScriptMapFacts(needed, (item) => compositeKey([metadataEntries(item.metadata), item.declaration]));
			const slotGroups = groupScriptMapFacts(slots, (slot) => compositeKey([
				metadataEntries(slot.metadata),
				slot.declaration,
				slot.unknown
			]));
			if (scriptMapMetadataFitsAll(needGroups, slotGroups, metadataCompatible)) return false;
			return scriptMapGroupAssignmentExceeds(needGroups, slotGroups, metadataCompatible);
		};
		scriptsDimension = (before, after) => {
			const groups = (inspection) => {
				const result = new Map();
				for (const script of inspection.scripts.items) {
					const identity = `scrg_${digestCanonicalValue(script.url)}`;
					const items = result.get(identity) ?? [];
					items.push(script);
					result.set(identity, items);
				}
				return result;
			};
			const previous = groups(before);
			const next = groups(after);
			const beforeComplete = sectionsComplete(before, ["scripts"]) && before.completeness.dropped_events.scripts === 0;
			const afterComplete = sectionsComplete(after, ["scripts"]) && after.completeness.dropped_events.scripts === 0;
			const declarationMayBeOmitted = (inspection) => inspection.completeness.policy_filtered_sections.includes("source_maps") || inspection.completeness.truncated_sections.includes("source_maps") || inspection.completeness.excluded.some((item) => item.section === "source_maps" && item.count !== 0 && [
				"disallowed_origin",
				"unsupported_url",
				"resource_budget_exhausted",
				"invalid_protocol_value"
			].includes(item.reason));
			const beforeMayOmitDeclaration = declarationMayBeOmitted(before);
			const afterMayOmitDeclaration = declarationMayBeOmitted(after);
			const left = new Map();
			const right = new Map();
			let valuesComplete = true;
			for (const identity of new Set([...previous.keys(), ...next.keys()])) {
				const prior = previous.get(identity) ?? [];
				const later = next.get(identity) ?? [];
				const all = [...prior, ...later];
				const fields = [
					"cdp_hash",
					"length",
					"is_module",
					"language"
				].filter((field) => all.every((script) => script[field] !== null));
				const sourceComparable = prior.length > 0 && later.length > 0 && all.every((script) => script.source.included);
				const mapComparable = prior.every((script) => script.source_map_url !== null || !beforeMayOmitDeclaration) && later.every((script) => script.source_map_url !== null || !afterMayOmitDeclaration);
				const metadataFields = [
					"cdp_hash",
					"length",
					"is_module",
					"language"
				];
				const scriptMetadata = (script) => {
					const metadata = {};
					for (const field of metadataFields) {
						const value = script[field];
						if (value !== null) metadata[field] = value;
					}
					if (sourceComparable && script.source.included) metadata.source_sha256 = script.source.artifact.sha256;
					return metadata;
				};
				const metadataCompatible = (left, right) => [...metadataFields, "source_sha256"].every((field) => left[field] === undefined || right[field] === undefined || left[field] === right[field]);
				const mapFactsExceed = (observed, observedMayOmit, complete, completeMayOmit) => {
					const needed = observed.flatMap((script) => script.source_map_url === null && observedMayOmit ? [] : [{
						metadata: scriptMetadata(script),
						declaration: script.source_map_url
					}]);
					const slots = complete.map((script) => ({
						metadata: scriptMetadata(script),
						declaration: script.source_map_url,
						unknown: script.source_map_url === null && completeMayOmit
					}));
					return scriptMapFactsExceed(needed, slots, metadataCompatible);
				};
				const provenMapDifference = !mapComparable && prior.length > 0 && later.length > 0 && (afterComplete && mapFactsExceed(prior, beforeMayOmitDeclaration, later, afterMayOmitDeclaration) || beforeComplete && mapFactsExceed(later, afterMayOmitDeclaration, prior, beforeMayOmitDeclaration));
				if (prior.length > 0 && later.length > 0 && !mapComparable) valuesComplete = false;
				if (prior.length > 0 && later.length > 0 && (!fields.includes("length") || !fields.includes("is_module") || !fields.includes("language") || !sourceComparable && (!fields.includes("cdp_hash") || all.some((script) => script.source.included)))) valuesComplete = false;
				const project = (items) => items.map((script) => digestCanonicalValue({
					url: script.url,
					...mapComparable ? { source_map_url: script.source_map_url } : {},
					...Object.fromEntries(fields.map((field) => [field, script[field]])),
					...sourceComparable && script.source.included ? { source_sha256: script.source.artifact.sha256 } : {}
				}));
				const priorSamples = project(prior);
				const laterSamples = project(later);
				if (!provenMapDifference && !(beforeComplete && afterComplete) && !(beforeComplete && !samplesContained(laterSamples, priorSamples)) && !(afterComplete && !samplesContained(priorSamples, laterSamples))) continue;
				if (prior.length > 0) left.set(identity, digestCanonicalValue({
					samples: priorSamples.sort(),
					proof: provenMapDifference ? "before" : null
				}));
				if (later.length > 0) right.set(identity, digestCanonicalValue({
					samples: laterSamples.sort(),
					proof: provenMapDifference ? "after" : null
				}));
			}
			return compareDimension(left, right, beforeComplete && afterComplete && valuesComplete, "Script inventory, source-map declarations, or corresponding source/metadata evidence was incomplete in at least one observation.", true);
		};
		metadataProjection = (inspection) => ({
			responses: inspection.metadata.responses.map(({ request_id: _requestId, ...response }) => response).map((value) => digestCanonicalValue(value)).sort(),
			dom_urls: inspection.metadata.dom_urls.map((value) => digestCanonicalValue(value)).sort(),
			agent_hints: inspection.metadata.agent_hints.map((value) => digestCanonicalValue(value)).sort(),
			excluded_dom_urls: inspection.metadata.excluded_dom_urls,
			headers_allowlisted: inspection.metadata.headers_allowlisted
		});
		singleton = (key, value) => new Map([[key, value]]);
		accessibilityComparable = (inspection) => {
			const text = inspection.accessibility.text_capture.status === "included" && inspection.accessibility.text_capture.excluded_fields === 0;
			const { completeness } = inspection;
			const exclusions = completeness.excluded.filter(({ section }) => section === "accessibility");
			const textOnlyPolicyFilter = inspection.accessibility.text_capture.status === "not_approved" && exclusions.length > 0 && exclusions.every(({ reason }) => reason === "not_approved");
			const nodes = [
				completeness.truncated_sections,
				completeness.unavailable_sections,
				completeness.attach_limited_sections
			].every((sections) => !sections.includes("accessibility")) && (!completeness.policy_filtered_sections.includes("accessibility") || textOnlyPolicyFilter) && inspection.accessibility.total_nodes === inspection.accessibility.nodes.length;
			const complete = text && nodes;
			return {
				text,
				nodes,
				complete
			};
		};
		accessibilityProjection = (accessibility, other, includeText) => {
			const nodeIndexes = new Map(accessibility.nodes.map((node, index) => [node.node_id, index]));
			return {
				total_nodes: accessibility.total_nodes,
				nodes: accessibility.nodes.map((node, index) => ({
					parent_index: node.parent_id === null ? null : nodeIndexes.get(node.parent_id) ?? -1,
					role: node.role === null || other.nodes[index]?.role === null ? null : node.role,
					ignored: node.ignored,
					states: node.states,
					...includeText ? {
						name: node.name,
						description: node.description
					} : {}
				}))
			};
		};
		storageKeysComparable = (inspection) => sectionsComplete(inspection, ["storage_keys"]);
		storageMap = (storage, includeKeys, includeUsage, fingerprintIdentities) => {
			const map = new Map([["storage:summary", digestCanonicalValue({
				origin: storage.origin,
				values_redacted: storage.values_redacted,
				...includeUsage ? {
					usage_bytes: storage.usage_bytes,
					quota_bytes: storage.quota_bytes
				} : {}
			})]]);
			const add = (kind, keys) => {
				for (const key of keys) {
					map.set(`storage:${kind}:${key}`, digestCanonicalValue(key));
				}
			};
			if (includeKeys) {
				add("local_storage", storage.local_storage_keys);
				add("session_storage", storage.session_storage_keys);
				add("indexed_db", storage.indexed_db_names);
				add("cache", storage.cache_names);
			}
			for (const fingerprint of storage.content_fingerprints) {
				const identity = `${fingerprint.scope}:${fingerprint.identity_sha256}`;
				if (!fingerprintIdentities.has(identity)) continue;
				map.set(`storage:content:${identity}`, digestCanonicalValue(fingerprint.value_sha256));
			}
			return map;
		};
		storageFingerprintIdentities = (before, after) => {
			const beforeComplete = completeStorageFingerprints(before);
			const afterComplete = completeStorageFingerprints(after);
			const bothComplete = before.fingerprints_complete && after.fingerprints_complete;
			return bothComplete ? new Set([...beforeComplete.keys(), ...afterComplete.keys()]) : new Set([...beforeComplete.keys()].filter((identity) => afterComplete.has(identity)));
		};
		completeStorageFingerprints = (storage) => new Map(storage.content_fingerprints.filter(({ complete }) => complete).map((fingerprint) => [`${fingerprint.scope}:${fingerprint.identity_sha256}`, fingerprint]));
	})))();
}

//#endregion
//#region dist/domain/browserCaptureComparison.js
var browserCaptureComparisonInputSchema, isScenarioCaptureDocument, browserCaptureComparisonSchema, compareBrowserCaptures;
function init_browserCaptureComparison() {
	return (init_browserCaptureComparison = __esmMin((() => {
		init_browserScenarioCapture();
		init_browserScenarioDiff();
		init_webCaptureDiff();
		init_browserScenarioDiffValues();
		init_webCaptureDiffSchemas();
		browserCaptureComparisonInputSchema = z.union([compareWebCapturesInputSchema, compareBrowserScenariosInputSchema], { error: (issue) => issue.code === "invalid_union" ? z.prettifyError(new z.ZodError(issue.errors.flat())) : undefined });
		isScenarioCaptureDocument = (document) => typeof document === "object" && document !== null && !("inspection" in document) && Object.keys(browserScenarioCaptureSchema.shape).some((field) => field in document);
		browserCaptureComparisonSchema = z.union([browserScenarioDiffSchema, webCaptureDiffSchema]);
		compareBrowserCaptures = (input) => "before_scenario" in input ? compareBrowserScenarios(input) : compareWebCaptures(input);
	})))();
}

//#endregion
export { browserCaptureComparisonInputSchema, browserCaptureComparisonSchema, commitBrowserScenarioNormalization, compareBrowserCaptures, createCapturedWebScriptReconciler, discoverWebMcpToolsInputSchema, init_browserCaptureComparison, init_browserScenarioNormalization, init_browserSession, init_webInventory, init_webMcpDiscovery, isScenarioCaptureDocument, observeWebSessionInputSchema, stableWebResources, stableWebScriptKey, webMcpDiscoverySchema, webObservationSessionSchema };