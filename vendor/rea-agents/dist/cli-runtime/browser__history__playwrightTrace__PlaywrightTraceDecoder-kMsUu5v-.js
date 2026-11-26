import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisError, AnalysisInputError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, ArtifactOperationError, cancelledBy, carriedReason, fixedAllowanceOptions, fixedCeilingConstraint, init_analysisErrorBase, init_analysisErrorCore, init_artifactOperationError, init_fixedAllowanceRemediation, init_sha256Hex, init_stringPatterns, isCanonicalBase64, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_parseFailureAnalysisError, init_strictUtf8, isParseLimit, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactReaderFailure, ZipArtifactReader, artifactFileCancellationCause, artifactFilePrimaryFacts, assertArtifactFileSelectedSource, assertArtifactReadActive, hashStableRootArtifactHandle, init_ArtifactFileOperation, init_ArtifactFileSource, init_ArtifactReader, init_RegularFile, init_StableArtifactFailure, init_StableRootArtifact, init_ZipArtifactReader, init_resources, isSelectedRegularFileError, projectStableArtifactFailure, readerIntegrityFailure, stableArtifactInputFailure, withArtifactRegularFile } from "./resources-B3P64jvH.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { Budget, escapeJsonPointerToken, init_budget, init_jsonPointer } from "./jsonPointer-aolC6MvJ.js";
import { PLAYWRIGHT_TRACE_LIMITS, PLAYWRIGHT_TRACE_OPERATION, PLAYWRIGHT_TRACE_PROVIDER, init_playwrightTrace } from "./playwrightTrace-CY5VynIY.js";
import { init_recordedResponseBody, readRecordedResponseDeclaration } from "./recordedResponseBody-wPebrtnk.js";
import { WEB_NETWORK_CAPTURE_LIMITS, init_webNetworkCapture } from "./webNetworkCapture-DzOKad85.js";
import { CAPTURE_FORMAT, CAPTURE_LIMITS, CaptureFormatError, CaptureRedaction, HAR_CAPTURE_PROVIDER_IDENTITY, captureBudgets, captureObject, capturePointer, init_CaptureBudgets, init_CaptureFormatError, init_CaptureProviderIdentities, init_CaptureRedaction } from "./CaptureProviderIdentities-ELDLheGD.js";
import { createRequire } from "node:module";
import { z } from "zod";
import { setImmediate } from "node:timers/promises";
import { LosslessNumber, isSafeNumber } from "lossless-json";
import { visit } from "jsonc-parser";
import { getHeapStatistics } from "node:v8";
import { isIP } from "node:net";
import { Ajv } from "ajv";

//#region dist/browser/history/playwrightTrace/TraceInventory.js
var traceIdentity, TraceInventory;
function init_TraceInventory() {
	return (init_TraceInventory = __esmMin((() => {
		init_canonicalDigest();
		init_budget();
		init_analysisErrorCore();
		init_playwrightTrace();
		traceIdentity = (prefix, value) => `${prefix}_${digestCanonicalValue(value)}`;
		TraceInventory = class {
			artifact;
			members = [];
			streams = [];
			events = [];
			diagnostics = [];
			#paths = new Map();
			#facts = new Budget(PLAYWRIGHT_TRACE_LIMITS.factsBytes);
			constructor(artifact) {
				this.artifact = artifact;
			}
			reserve(bytes) {
				this.#facts.charge(bytes, () => new AnalysisResourceConstraintError(PLAYWRIGHT_TRACE_OPERATION, "memory", "Trace facts exceed the 32 MiB retained representation allowance.", { retained_fact_allowance: PLAYWRIGHT_TRACE_LIMITS.factsBytes }, { remediationAction: "Select a smaller complete recorder chunk; fields and reply pagination do not increase parser allowances." }));
			}
			retain(value) {
				this.reserve(512 + Buffer.byteLength(JSON.stringify(value)) * 4);
			}
			member(entry) {
				const path = entry.sourcePath ?? entry.path;
				this.reserve(1024 + (path.length + entry.path.length + entry.limitations.reduce((sum, value) => sum + value.length, 0)) * 12);
				const row = {
					member_id: traceIdentity("trace_member", [this.artifact.sha256, entry.adapterKey]),
					path,
					logical_path: entry.path,
					kind: entry.kind,
					declared_bytes: entry.declaredSize,
					declared_compressed_bytes: entry.compressedSize,
					encrypted: entry.encrypted,
					decoded: false,
					limitations: [...entry.limitations]
				};
				this.members.push(row);
				const matches = this.#paths.get(row.path) ?? [];
				if (matches.length > 0) this.diagnostic(row, null, "duplicate-member-path", "Archive member names are ambiguous; directory occurrences keep distinct identity.");
				matches.push(row);
				this.#paths.set(row.path, matches);
				return row;
			}
			diagnostic(member, line, code, message) {
				const row = {
					diagnostic_id: traceIdentity("trace_diagnostic", [
						this.artifact.sha256,
						member?.member_id ?? null,
						line,
						code,
						this.diagnostics.length
					]),
					member_id: member?.member_id ?? null,
					line,
					code,
					message
				};
				this.retain(row);
				this.diagnostics.push(row);
			}
			/** References establish directory presence only; payload decoding and image validity stay unknown. */
			finish(incomplete = false) {
				const events = this.events.map((event) => ({
					...event,
					resource_references: event.resource_references.map((reference) => {
						const matches = this.#paths.get(reference.path) ?? [];
						const member = matches.length === 1 ? matches[0] : undefined;
						const state = matches.length === 0 ? "missing" : matches.length > 1 ? "ambiguous" : member?.kind !== "file" || member.encrypted ? "unavailable" : "present-unread";
						return {
							...reference,
							state,
							member_id: member?.member_id ?? null,
							matching_members: matches.length
						};
					})
				}));
				const unavailable = events.reduce((sum, event) => sum + event.resource_references.filter((reference) => reference.state !== "present-unread").length, 0);
				return {
					kind: "playwright-trace",
					trace_id: traceIdentity("playwright_trace", [this.artifact.sha256, 10]),
					decoder_profile: "playwright-trace-v10",
					artifact: this.artifact,
					ordering: "per-stream-source-order-only",
					members: this.members,
					streams: this.streams,
					events,
					diagnostics: this.diagnostics,
					summary: {
						events: events.length,
						action_before: events.filter((row) => row.kind === "action-before").length,
						action_after: events.filter((row) => row.kind === "action-after").length,
						console: events.filter((row) => row.kind === "console").length,
						network: events.filter((row) => row.kind === "network").length,
						screenshots: events.filter((row) => row.kind === "screenshot").length,
						unavailable_references: unavailable
					},
					source_coverage: {
						recording_completeness: "unknown",
						interpretation: incomplete || this.diagnostics.length > 0 || this.members.some((member) => member.limitations.length > 0) || unavailable > 0 || this.streams.some((row) => row.state !== "supported") ? "partial" : "scoped",
						resource_contents: "not-decoded"
					},
					limitations: [
						...incomplete ? ["Import stopped before all selected members completed; only fully verified stream facts are included."] : [],
						"Recorded producer declarations are not authenticated. The archive was read offline without browser launch, replay or requests to recorded URLs.",
						"Order is preserved within each source member only; no total order or clock alignment is inferred across trace and network streams.",
						"Only v10 action boundaries, console text/location, network metadata and screencast references are interpreted. Other event types, DOM, context options, most action arguments, results, stacks and resource contents are not analyzed. Original archive bytes remain the complete raw source.",
						"Only decoded stream members have checked decompression/CRC. Resource reference presence does not establish readable content, valid images, observed runtime behavior or complete capture coverage."
					]
				};
			}
		};
	})))();
}

//#endregion
//#region dist/browser/history/CaptureJson.js
var captureNodeAdmission, selectCaptureObjectProperty, parseCaptureJson, decodeCaptureText;
function init_CaptureJson() {
	return (init_CaptureJson = __esmMin((() => {
		init_jsonPointer();
		init_CaptureBudgets();
		init_CaptureFormatError();
		init_strictUtf8();
		init_webNetworkCapture();
		captureNodeAdmission = (maximumNodes) => {
			let nodes = 0;
			return () => {
				nodes++;
				if (maximumNodes !== undefined && nodes > maximumNodes) throw new CaptureFormatError({
					name: "parser-nodes",
					maximum: maximumNodes
				}, "JSON exceeds its parser node representation allowance.");
			};
		};
		selectCaptureObjectProperty = (frames, key, format) => {
			const frame = frames.at(-1);
			if (frame?.kind !== "object") throw new TypeError("JSON visitor emitted a property outside an object.");
			if (frame.members.has(key)) throw new CaptureFormatError("malformed", `${format} JSON contains duplicate object members.`);
			frame.pendingKey = key;
		};
		parseCaptureJson = (text, format, maximumNodes) => {
			const frames = [];
			const admitNode = captureNodeAdmission(maximumNodes);
			const fixedDepth = format === "Playwright trace";
			const maximumDepth = fixedDepth ? WEB_NETWORK_CAPTURE_LIMITS.depth : captureBudgets().depth;
			let result;
			const valuePointer = () => {
				const parent = frames.at(-1);
				if (parent === undefined) return "";
				if (parent.kind === "array") return `${parent.pointer}/${parent.items.length}`;
				return parent.pendingKey === undefined ? parent.pointer : `${parent.pointer}/${escapeJsonPointerToken(parent.pendingKey)}`;
			};
			const admitContainer = () => {
				admitNode();
				if (frames.length >= maximumDepth) throw new CaptureFormatError({
					name: "nesting-depth",
					maximum: maximumDepth
				}, `${format} exceeds ${fixedDepth ? "its fixed JSON nesting allowance" : "max_nesting_depth"} (${String(maximumDepth)} levels).`, valuePointer());
			};
			const append = (value) => {
				const parent = frames.at(-1);
				if (parent === undefined) result = value;
				else if (parent.kind === "array") parent.items.push(value);
				else {
					if (parent.pendingKey === undefined) throw new TypeError("JSON visitor omitted an object property identity.");
					parent.members.set(parent.pendingKey, value);
					delete parent.pendingKey;
				}
			};
			const endContainer = (kind) => {
				const frame = frames.pop();
				if (frame?.kind !== kind) throw new TypeError(`JSON visitor ended an unexpected ${kind}.`);
				append(frame.kind === "object" ? Object.fromEntries(frame.members) : frame.items);
			};
			visit(text, {
				onObjectBegin: () => {
					admitContainer();
					frames.push({
						kind: "object",
						pointer: valuePointer(),
						members: new Map()
					});
				},
				onObjectProperty: (key) => {
					admitNode();
					selectCaptureObjectProperty(frames, key, format);
				},
				onObjectEnd: () => endContainer("object"),
				onArrayBegin: () => {
					admitContainer();
					frames.push({
						kind: "array",
						pointer: valuePointer(),
						items: []
					});
				},
				onArrayEnd: () => endContainer("array"),
				onLiteralValue: (value, offset, length) => {
					admitNode();
					if (typeof value === "number") append(new LosslessNumber(text.slice(offset, offset + length)));
					else if (typeof value === "string") append(JSON.parse(text.slice(offset, offset + length)));
					else if (value === null || typeof value === "boolean") append(value);
					else throw new TypeError("JSON visitor emitted an unsupported literal.");
				},
				onError: () => {
					throw new CaptureFormatError("malformed", `${format} is malformed JSON.`);
				}
			}, {
				disallowComments: true,
				allowTrailingComma: false,
				allowEmptyContent: false
			});
			return result;
		};
		decodeCaptureText = (bytes, format) => {
			try {
				return decodeStrictUtf8(bytes, "strip-signature");
			} catch {
				throw new CaptureFormatError("malformed", `${format} is not valid UTF-8 JSON.`);
			}
		};
	})))();
}

//#endregion
//#region dist/browser/history/playwrightTrace/TraceLines.js
/** Buffer one physical line; do not decode a partial UTF-8 sequence or split records by characters. */
async function* traceLines(stream, budget, signal) {
	let fragments = [];
	let pendingBytes = 0;
	let line = 0;
	const append = (part) => {
		pendingBytes += part.length;
		if (pendingBytes > PLAYWRIGHT_TRACE_LIMITS.lineBytes) throw new AnalysisResourceConstraintError(PLAYWRIGHT_TRACE_OPERATION, "memory", "A trace line exceeds the 4 MiB parser representation allowance.", { max_line_bytes: PLAYWRIGHT_TRACE_LIMITS.lineBytes }, { remediationAction: "Select a smaller recorder chunk; changing reply pagination does not change parsing allowances." });
		fragments.push(part);
	};
	for await (const chunk of stream) {
		assertArtifactReadActive(signal);
		if (!Buffer.isBuffer(chunk)) throw new TypeError("ZIP trace stream returned non-byte data");
		budget.decodedBytes += chunk.length;
		if (budget.decodedBytes > PLAYWRIGHT_TRACE_LIMITS.decodedBytes) throw new AnalysisResourceConstraintError(PLAYWRIGHT_TRACE_OPERATION, "memory", "Decoded trace streams exceed the 32 MiB analysis allowance.", { max_decoded_bytes: PLAYWRIGHT_TRACE_LIMITS.decodedBytes }, { remediationAction: "Select a smaller complete recorder chunk; binary resource payloads are not decoded by this tool." });
		let start = 0;
		for (;;) {
			const end = chunk.indexOf(10, start);
			if (end === -1) {
				if (start < chunk.length) append(chunk.subarray(start));
				break;
			}
			append(chunk.subarray(start, end));
			const bytes = fragments.length === 1 ? fragments[0] : Buffer.concat(fragments, pendingBytes);
			line++;
			yield {
				line,
				bytes
			};
			fragments = [];
			pendingBytes = 0;
			start = end + 1;
			if (line % 128 === 0) {
				await setImmediate();
				assertArtifactReadActive(signal);
			}
		}
	}
	if (pendingBytes > 0) yield {
		line: line + 1,
		bytes: Buffer.concat(fragments, pendingBytes)
	};
}
function init_TraceLines() {
	return (init_TraceLines = __esmMin((() => {
		init_resources();
		init_analysisErrorCore();
		init_playwrightTrace();
	})))();
}

//#endregion
//#region dist/browser/history/HarSchema.js
var durationSchema, optionalDurationSchema, timingsSchema, HAR_PRODUCER_PROFILES, createHarValidator, allowObservedProducerRepresentations, HAR_REQUEST_URL_FORMAT, harRequestUrlValidator, isCallable;
function init_HarSchema() {
	return (init_HarSchema = __esmMin((() => {
		init_CaptureFormatError();
		init_CaptureRedaction();
		durationSchema = {
			type: "number",
			minimum: 0
		};
		optionalDurationSchema = { anyOf: [durationSchema, { const: -1 }] };
		timingsSchema = {
			$id: "timings.json#",
			$schema: "http://json-schema.org/draft-06/schema#",
			type: "object",
			required: [
				"send",
				"wait",
				"receive"
			],
			properties: {
				send: durationSchema,
				wait: durationSchema,
				receive: durationSchema,
				blocked: optionalDurationSchema,
				dns: optionalDurationSchema,
				connect: optionalDurationSchema,
				ssl: optionalDurationSchema,
				comment: { type: "string" }
			}
		};
		HAR_PRODUCER_PROFILES = [
			{
				name: "Playwright",
				version: "1.58.2",
				bracketedIpv6: true
			},
			{
				name: "Playwright",
				version: "1.64.1",
				bracketedIpv6: true,
				unavailableFailedRequestTimings: true
			},
			{
				name: "WebInspector",
				version: "537.36",
				label: "Chromium DevTools (WebInspector 537.36)",
				bracketedIpv6: true
			},
			{
				name: "mitmproxy",
				version: "12.2.3",
				nullPostDataText: true
			}
		];
		createHarValidator = () => {
			const require = createRequire(new URL("../browser/history/HarSchema.js", import.meta.url).href);
			const schemas = z.record(z.string(), z.record(z.string(), z.unknown())).parse(require("har-schema"));
			const ajv = new Ajv({
				strict: false,
				allErrors: false,
				ownProperties: true
			});
			ajv.addMetaSchema(require("ajv/dist/refs/json-schema-draft-06.json"));
			const plugin = require("ajv-formats");
			if (typeof plugin !== "function") throw new Error("Pinned AJV formats plugin is unavailable");
			plugin(ajv);
			ajv.addFormat(HAR_REQUEST_URL_FORMAT, harRequestUrlValidator(plugin));
			const propertiesSchema = z.record(z.string(), z.unknown());
			const correctedSchemas = {
				timings: timingsSchema,
				cache: {
					...schemas.cache,
					type: "object"
				},
				request: {
					...schemas.request,
					properties: {
						...propertiesSchema.parse(schemas.request?.properties),
						url: {
							type: "string",
							format: HAR_REQUEST_URL_FORMAT
						}
					}
				},
				entry: {
					...schemas.entry,
					properties: {
						...propertiesSchema.parse(schemas.entry?.properties),
						time: durationSchema
					}
				},
				pageTimings: {
					...schemas.pageTimings,
					properties: {
						...propertiesSchema.parse(schemas.pageTimings?.properties),
						onContentLoad: optionalDurationSchema,
						onLoad: optionalDurationSchema
					}
				}
			};
			for (const [name, schema] of Object.entries(schemas)) ajv.addSchema(correctedSchemas[name] ?? schema);
			const validate = ajv.getSchema("har.json#");
			if (validate === undefined) throw new Error("Pinned HAR root schema is unavailable");
			return (value) => {
				const adaptations = allowObservedProducerRepresentations(value);
				if (!validate(value)) {
					const error = validate.errors?.[0];
					throw new CaptureFormatError("malformed", error === undefined ? "HAR schema validation failed: unknown constraint." : `HAR schema validation failed: ${error.keyword} (${error.message ?? "no detail"}).`, error?.instancePath ?? "");
				}
				return adaptations;
			};
		};
		allowObservedProducerRepresentations = (value) => {
			const none = {
				bracketedIpv6: null,
				failedRequests: null
			};
			if (!captureObject(value) || !captureObject(value.log)) return none;
			const log = value.log;
			const creator = log.creator;
			if (!captureObject(creator) || !Array.isArray(log.entries)) return none;
			const profile = HAR_PRODUCER_PROFILES.find(({ name, version }) => creator.name === name && creator.version === version);
			if (profile === undefined) return none;
			const failedRequests = [];
			const adaptedEntries = [];
			for (const [ordinal, entry] of log.entries.entries()) {
				const candidate = entry;
				if (!captureObject(candidate)) continue;
				const response = candidate.response;
				const timings = candidate.timings;
				if (profile.unavailableFailedRequestTimings && captureObject(response) && typeof response._failureText === "string" && response._failureText.length > 0 && captureObject(timings)) {
					let adapted = false;
					for (const field of [
						"send",
						"wait",
						"receive"
					]) if (timings[field] === -1) {
						timings[field] = 0;
						adapted = true;
					}
					if (adapted) failedRequests.push(ordinal);
				}
				const address = candidate.serverIPAddress;
				if (profile.bracketedIpv6 && typeof address === "string" && address.startsWith("[") && address.endsWith("]") && !address.includes("%") && isIP(address.slice(1, -1)) === 6) {
					candidate.serverIPAddress = address.slice(1, -1);
					adaptedEntries.push(ordinal);
				}
				if (!profile.nullPostDataText) continue;
				const request = candidate.request;
				if (!captureObject(request)) continue;
				const body = request.postData;
				if (captureObject(body) && body.text === null) delete body.text;
			}
			const producer = profile.label ?? `${profile.name} ${profile.version}`;
			return {
				bracketedIpv6: adaptedEntries.length === 0 ? null : {
					producer,
					entries: adaptedEntries
				},
				failedRequests: failedRequests.length === 0 ? null : {
					producer,
					entries: failedRequests
				}
			};
		};
		HAR_REQUEST_URL_FORMAT = "absolute-url";
		harRequestUrlValidator = (plugin) => {
			const getFormat = Reflect.get(plugin, "get");
			const rfc3986 = isCallable(getFormat) ? getFormat("uri") : undefined;
			if (!isCallable(rfc3986)) throw new Error("Pinned AJV uri format is unavailable");
			return (value) => rfc3986(value) === true || URL.parse(value)?.href === value;
		};
		isCallable = (value) => typeof value === "function";
	})))();
}

//#endregion
//#region dist/browser/history/HarCapture.js
var decodeHarCapture, projectRecordedHarEntry, projectHar, validationNumber, integerLexeme, decodeHarBase64;
function init_HarCapture() {
	return (init_HarCapture = __esmMin((() => {
		init_CaptureBudgets();
		init_CaptureJson();
		init_stringPatterns();
		init_CaptureFormatError();
		init_CaptureRedaction();
		init_HarSchema();
		init_CaptureProviderIdentities();
		init_sha256Hex();
		decodeHarCapture = (text, sensitiveValues) => {
			const raw = parseCaptureJson(text, "HAR");
			const validation = projectHar(raw, [], "validation");
			const adaptations = createHarValidator()(validation.reported);
			const ipv6Adaptation = adaptations.bracketedIpv6;
			const timingAdaptation = adaptations.failedRequests;
			const failedRequests = new Set(timingAdaptation?.entries);
			const adaptedIpv6Entries = new Set(ipv6Adaptation?.entries);
			const ipv6Limitations = ipv6Adaptation === null ? [] : [`This capture declares ${ipv6Adaptation.producer} and reports bracketed IPv6 serverIPAddress. Original spellings are retained; brackets were removed only from valid IPv6 values in the validation copy. Producer declarations are not authenticated.`];
			if (!captureObject(raw) || !captureObject(raw.log) || !Array.isArray(raw.log.entries)) throw new CaptureFormatError("malformed", "HAR must contain log.entries.");
			if (raw.log.version !== "1.2") throw new CaptureFormatError("unsupported", "Only the pinned HAR 1.2 schema profile is supported.", "/log/version");
			const entries = raw.log.entries;
			const recordsExcluded = ["log", "entries"].some((key) => sensitiveValues.some((literal) => key.includes(literal)));
			const container = projectHar({
				...raw,
				log: {
					...raw.log,
					entries: null
				}
			}, sensitiveValues, "container");
			const records = entries.map((entry, ordinal) => {
				const projected = projectRecordedHarEntry(entry, sensitiveValues);
				const projection = recordsExcluded ? {
					reported: null,
					numeric_literals: [],
					binary_fields: [],
					redactions: [{
						pointer: "",
						reason: "explicit-sensitive-value"
					}]
				} : projected;
				return {
					ordinal,
					location: recordsExcluded ? {
						kind: "unknown",
						reason: "explicit-sensitive-value"
					} : {
						kind: "json-pointer",
						pointer: `/log/entries/${ordinal}`
					},
					...projection,
					limitations: [
						"HAR text without an encoding declaration is producer-decoded Unicode. Unsupported declared body encodings remain opaque; original body bytes remain unknown unless content explicitly uses valid base64. Declared sizes are preserved independently of retained bytes. mitmproxy 12.2.3 SaveHar may report null optional postData.text; that null is retained and omitted only from the upstream validation copy.",
						...adaptedIpv6Entries.has(ordinal) ? ipv6Limitations : [],
						...timingAdaptation !== null && failedRequests.has(ordinal) ? [`This capture declares ${timingAdaptation.producer} and records a failed request with unavailable timings (-1). The original failure and timing sentinels are retained; only the validation copy substitutes nonnegative timings. Producer declarations are not authenticated.`] : [],
						...recordsExcluded ? ["This record's payload and sidecars are excluded because its structural ancestor property was explicitly marked sensitive."] : []
					]
				};
			});
			return {
				decoder: { ...HAR_CAPTURE_PROVIDER_IDENTITY },
				container: {
					reported: container.reported,
					numeric_literals: container.numeric_literals,
					redactions: container.redactions,
					records_pointer: recordsExcluded ? null : "/log/entries"
				},
				total_records: records.length,
				records
			};
		};
		projectRecordedHarEntry = (value, sensitiveValues) => projectHar(value, sensitiveValues, "entry");
		projectHar = (value, sensitiveValues, scope) => {
			const redact = scope !== "validation";
			const redactor = new CaptureRedaction(sensitiveValues, scope === "entry" ? value : undefined);
			const numeric_literals = [];
			const binary_fields = [];
			const projectNumber = (item, pointer) => {
				if (!redact) return validationNumber(item.value);
				const number = redactor.number(item, pointer, redact);
				if (number === null) return null;
				numeric_literals.push({
					pointer,
					producer_type: "json-number",
					literal: number.literal
				});
				return number.reported;
			};
			const visit = (item, pointer, depth, parent) => {
				if (depth > captureBudgets().depth) throw new CaptureFormatError({
					name: "nesting-depth",
					maximum: captureBudgets().depth
				}, `HAR exceeds max_nesting_depth (${String(captureBudgets().depth)} levels).`, pointer);
				if (scope === "entry" && parent !== undefined && redactor.harCredential(pointer, parent)) return redactor.credential(pointer);
				if (item instanceof LosslessNumber) return projectNumber(item, pointer);
				if (typeof item === "string") {
					if (scope === "entry" && pointer === "/response/content/text" && parent?.encoding === "base64") {
						const bytes = decodeHarBase64(item, pointer);
						const contentBase64 = bytes.toString("base64");
						const sha256 = sha256Hex(bytes);
						const hidden = redactor.sensitiveBytes(bytes) || sensitiveValues.some((literal) => item.includes(literal) || contentBase64.includes(literal) || sha256.includes(literal) || String(bytes.length).includes(literal));
						binary_fields.push(hidden ? {
							pointer,
							representation: "har-base64-content",
							state: "redacted",
							content_base64: null,
							bytes: null,
							sha256: null
						} : {
							pointer,
							representation: "har-base64-content",
							state: "retained",
							content_base64: contentBase64,
							bytes: bytes.length,
							sha256
						});
						if (hidden) {
							redactor.redactions.push({
								pointer,
								reason: "explicit-sensitive-value"
							});
							return null;
						}
					}
					return redact ? redactor.text(item, pointer, scope === "entry" ? redactor.harTransportUrl(pointer, parent) : undefined) : item;
				}
				if (item === null || typeof item === "boolean") return item;
				if (Array.isArray(item)) return item.map((child, index) => visit(child, capturePointer(pointer, String(index)), depth + 1));
				if (captureObject(item)) return Object.fromEntries(Object.entries(item).flatMap(([key, child]) => {
					if (redact && sensitiveValues.some((literal) => key.includes(literal))) {
						const beforeNumbers = numeric_literals.length;
						const beforeBinaries = binary_fields.length;
						const beforeRedactions = redactor.redactions.length;
						visit(child, capturePointer(pointer, key), depth + 1, item);
						numeric_literals.splice(beforeNumbers);
						binary_fields.splice(beforeBinaries);
						redactor.redactions.splice(beforeRedactions);
						redactor.redactions.push({
							pointer,
							reason: "explicit-sensitive-value",
							scope: "property-name"
						});
						return [];
					}
					return [[key, visit(child, capturePointer(pointer, key), depth + 1, item)]];
				}));
				throw new CaptureFormatError("malformed", "HAR parser returned a non-JSON value.", pointer);
			};
			return {
				reported: visit(value, "", 0),
				numeric_literals,
				binary_fields,
				redactions: redactor.redactions
			};
		};
		validationNumber = (literal) => {
			const nearest = Number(literal);
			if (integerLexeme(literal)) return nearest;
			if (Number.isFinite(nearest) && !Number.isInteger(nearest)) return nearest;
			return literal.startsWith("-") ? -.5 : .5;
		};
		integerLexeme = (literal) => {
			const match = /^-?(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(literal);
			if (match === null) return false;
			const [, whole = "", fraction = "", exponent = "0"] = match;
			const digits = `${whole}${fraction}`;
			const significant = digits.replace(/0+$/, "");
			if (/^0*$/.test(significant)) return true;
			const trailingZeros = digits.length - significant.length;
			return Number(exponent) - fraction.length + trailingZeros >= 0;
		};
		decodeHarBase64 = (value, pointer) => {
			const compact = value.replace(/[\t\n\r ]/g, "");
			if (!isCanonicalBase64(compact)) throw new CaptureFormatError("malformed", "HAR content declares base64 but its text is not valid canonical base64 (ASCII whitespace is allowed).", pointer);
			return Buffer.from(compact, "base64");
		};
	})))();
}

//#endregion
//#region dist/browser/history/playwrightTrace/TraceEventProjection.js
var string, number$1, object, actionFacts, selectedEvent, projectTraceEvent;
function init_TraceEventProjection() {
	return (init_TraceEventProjection = __esmMin((() => {
		init_CaptureRedaction();
		init_HarCapture();
		init_recordedResponseBody();
		string = (value) => typeof value === "string" ? value : null;
		number$1 = (value) => typeof value === "number" && Number.isFinite(value) ? value : null;
		object = (value) => captureObject(value) ? value : {};
		actionFacts = (raw, redactor) => {
			const facts = {};
			for (const key of [
				"type",
				"callId",
				"parentId",
				"pageId",
				"startTime",
				"endTime",
				"class",
				"method",
				"title"
			]) if (Object.hasOwn(raw, key)) facts[key] = raw[key];
			const params = object(raw.params);
			const selected = {};
			if (Object.hasOwn(params, "selector")) selected.selector = params.selector;
			if ((raw.class === "Frame" || raw.class === "Page") && raw.method === "goto" && typeof params.url === "string") selected.url = redactor.text(params.url, "/params/url", {});
			if (Object.keys(selected).length > 0) facts.params = selected;
			if (Object.hasOwn(raw, "error")) {
				const error = object(raw.error);
				facts.error = captureObject(raw.error) ? Object.fromEntries(["name", "message"].filter((key) => Object.hasOwn(error, key)).map((key) => [key, error[key]])) : raw.error;
			}
			return facts;
		};
		selectedEvent = (raw, redactor) => {
			let kind;
			let selected;
			if (raw.type === "before" || raw.type === "after") {
				if (typeof raw.callId !== "string") return undefined;
				kind = raw.type === "before" ? "action-before" : "action-after";
				selected = actionFacts(raw, redactor);
			} else if (raw.type === "console") {
				kind = "console";
				const consoleFacts = Object.fromEntries([
					"type",
					"messageType",
					"text",
					"time",
					"pageId"
				].filter((key) => Object.hasOwn(raw, key)).map((key) => [key, raw[key]]));
				const location = object(raw.location);
				if (captureObject(raw.location)) Object.assign(consoleFacts, { location: {
					...location,
					...typeof location.url === "string" ? { url: redactor.text(location.url, "/location/url", {}) } : {}
				} });
				selected = consoleFacts;
			} else if (raw.type === "resource-snapshot") {
				kind = "network";
				if (!captureObject(raw.snapshot)) return undefined;
				selected = raw.snapshot;
			} else if (raw.type === "screencast-frame") {
				kind = "screenshot";
				selected = Object.fromEntries([
					"type",
					"pageId",
					"file",
					"width",
					"height",
					"timestamp",
					"frameSwapWallTime"
				].filter((key) => Object.hasOwn(raw, key)).map((key) => [key, raw[key]]));
			} else return undefined;
			return {
				kind,
				selected
			};
		};
		projectTraceEvent = (raw, identity) => {
			const redactor = new CaptureRedaction([]);
			const selected = selectedEvent(raw, redactor);
			if (selected === undefined) return undefined;
			const { kind } = selected;
			const projected = projectRecordedHarEntry(selected.selected, []);
			const facts = object(projected.reported);
			const params = object(facts.params), request = object(facts.request), response = object(facts.response);
			const error = object(facts.error);
			const redactions = [...projected.redactions, ...redactor.redactions].map(({ pointer, reason }) => ({
				pointer,
				reason
			}));
			const references = [];
			const reference = (value, pointer) => {
				if (typeof value === "string") references.push({
					path: value,
					source_pointer: pointer,
					state: "missing",
					member_id: null,
					matching_members: 0
				});
			};
			if (kind === "screenshot") reference(facts.file, "/file");
			if (kind === "network") {
				reference(object(request.postData)._file, "/snapshot/request/postData/_file");
				reference(object(response.content)._file, "/snapshot/response/content/_file");
			}
			return {
				...identity,
				kind,
				call_id: string(facts.callId),
				page_id: string(kind === "network" ? facts.pageref : facts.pageId),
				time: number$1(kind === "network" ? facts._monotonicTime : kind === "screenshot" ? facts.timestamp : kind === "action-before" ? facts.startTime : kind === "action-after" ? facts.endTime : facts.time),
				method: string(kind === "network" ? request.method : facts.method),
				url: string(kind === "network" ? request.url : params.url),
				status: readRecordedResponseDeclaration(projected.reported)?.status ?? null,
				text: string(kind === "console" ? facts.text : kind === "action-after" ? error.message : facts.title),
				selector: string(params.selector),
				resource_references: references,
				credential_redacted: redactions.some((row) => row.reason === "transport-credential"),
				reported: projected.reported,
				numeric_literals: projected.numeric_literals.map(({ pointer, literal }) => ({
					pointer,
					literal
				})),
				redactions
			};
		};
	})))();
}

//#endregion
//#region dist/browser/history/playwrightTrace/TraceStream.js
var text, number, readRecord, hasPartialHeadline, TraceStreamRead, readTraceStream;
function init_TraceStream() {
	return (init_TraceStream = __esmMin((() => {
		init_strictUtf8();
		init_fixedAllowanceRemediation();
		init_analysisErrorCore();
		init_parseFailureAnalysisError();
		init_playwrightTrace();
		init_CaptureRedaction();
		init_CaptureFormatError();
		init_CaptureJson();
		init_TraceInventory();
		init_TraceLines();
		init_TraceEventProjection();
		text = (value) => typeof value === "string" ? value : null;
		number = (value) => value instanceof LosslessNumber && isSafeNumber(value.value) ? Number(value.value) : null;
		readRecord = (bytes) => {
			const required = 32 * 1024 * 1024 + bytes.length * 64;
			if (required > getHeapStatistics().total_available_size) throw new AnalysisResourceConstraintError(PLAYWRIGHT_TRACE_OPERATION, "memory", "Insufficient heap headroom for trace record expansion.", {
				input_bytes: bytes.length,
				required_headroom_bytes: required
			}, { measuredExhaustion: true });
			let value;
			try {
				value = decodeStrictUtf8(bytes, "preserve");
			} catch (cause) {
				throw new CaptureFormatError("malformed", "Trace line is not valid UTF-8.", "", cause);
			}
			return parseCaptureJson(value, "Playwright trace", PLAYWRIGHT_TRACE_LIMITS.factsBytes / 256);
		};
		hasPartialHeadline = (event) => event.kind === "network" && (event.method === null || event.url === null || event.status === null) || event.kind === "console" && event.text === null || event.kind === "action-before" && event.method === null || event.kind === "screenshot" && event.resource_references.length === 0;
		TraceStreamRead = class {
			input;
			stream;
			pending = [];
			diagnostics = [];
			omitted = new Map();
			#headerSeen = false;
			constructor(input) {
				this.input = input;
				const { member, profileKnown } = input;
				this.stream = {
					stream_id: traceIdentity("trace_stream", member.member_id),
					member_id: member.member_id,
					role: member.path.endsWith(".network") ? "network" : "trace",
					version: profileKnown ? 10 : null,
					state: profileKnown ? "supported" : "unknown",
					lines: 0,
					supported_events: 0,
					omitted_event_types: [],
					producer: null
				};
			}
			diagnostic(line, code, message) {
				this.input.inventory.reserve(1024);
				this.diagnostics.push({
					line,
					code,
					message
				});
			}
			header(raw, line) {
				const { inventory } = this.input;
				this.#headerSeen = true;
				if (!captureObject(raw) || raw.type !== "context-options") {
					this.diagnostic(line, "missing-context-header", "A trace member has no initial context-options record; its event version stays unknown.");
					return;
				}
				const version = number(raw.version);
				if (version !== null && version !== 10) throw new AnalysisUnsupportedTargetError(PLAYWRIGHT_TRACE_OPERATION, inventory.artifact.path, "Only Playwright trace version 10 is supported.");
				if (version !== 10) {
					this.diagnostic(line, "unknown-version", "The context header does not declare numeric trace version 10.");
					return;
				}
				this.stream.version = 10;
				this.stream.state = "supported";
				this.stream.producer = {
					playwright_version: text(raw.playwrightVersion),
					browser_name: text(raw.browserName),
					origin: text(raw.origin)
				};
				inventory.retain(this.stream.producer);
			}
			record(line) {
				const { inventory, member } = this.input;
				let raw;
				try {
					raw = readRecord(line.bytes);
				} catch (cause) {
					if (!(cause instanceof CaptureFormatError)) throw cause;
					if (isParseLimit(cause, "web-network-capture")) {
						const { name, maximum } = cause.failure.limit;
						if (name !== "nesting-depth" && name !== "parser-nodes") throw cause;
						const nesting = name === "nesting-depth";
						throw parseLimitConstraint(PLAYWRIGHT_TRACE_OPERATION, "memory", cause, {
							reportedLimitContext: { [nesting ? "nesting_levels" : "parser_nodes"]: maximum },
							...fixedAllowanceOptions(nesting ? "The Playwright trace record nesting allowance" : "The Playwright trace record parser allowance", "parser", {
								limit: maximum,
								unit: CAPTURE_LIMITS[name].unit
							})
						});
					}
					this.diagnostic(line.line, "malformed-record", cause.message);
					this.#headerSeen = true;
					return;
				}
				if (this.stream.role === "trace" && !this.#headerSeen) {
					this.header(raw, line.line);
					return;
				}
				if (!captureObject(raw) || typeof raw.type !== "string") {
					this.diagnostic(line.line, "malformed-record", "An event must be an object with a type string.");
					return;
				}
				if (raw.type === "context-options") {
					this.stream.state = "unknown";
					this.diagnostic(line.line, "duplicate-context-header", "Repeated context headers make the remaining stream version unknown; later events are not interpreted.");
					return;
				}
				let event;
				try {
					event = projectTraceEvent(raw, {
						event_id: traceIdentity("trace_event", [member.member_id, line.line]),
						stream_id: this.stream.stream_id,
						ordinal: line.line - 1,
						source: {
							member_id: member.member_id,
							line: line.line,
							record_pointer: raw.type === "resource-snapshot" ? "/snapshot" : ""
						}
					});
				} catch (cause) {
					if (!(cause instanceof CaptureFormatError)) throw cause;
					this.diagnostic(line.line, "malformed-record", cause.message);
					return;
				}
				if (event !== undefined) {
					inventory.reserve(event.resource_references.length * 512);
					inventory.retain(event);
					this.pending.push(event);
					const partial = hasPartialHeadline(event);
					if (partial) this.diagnostic(line.line, "partial-event", "Selected headline fields are unavailable; known facts remain retained without assuming absent values.");
					return;
				}
				if (!this.omitted.has(raw.type)) inventory.reserve(512 + raw.type.length * 12);
				this.omitted.set(raw.type, (this.omitted.get(raw.type) ?? 0) + 1);
				if ([
					"before",
					"after",
					"console",
					"resource-snapshot",
					"screencast-frame"
				].includes(raw.type)) this.diagnostic(line.line, "malformed-event", "A supported event is missing its required payload identity.");
			}
			async read() {
				const { inventory, reader, entry, member, budget, signal } = this.input;
				if (entry.kind !== "file" || entry.encrypted) {
					this.stream.state = "unavailable";
					inventory.diagnostic(member, null, "unavailable-stream", "A selected stream is encrypted or is not a regular archive member.");
					return this.stream;
				}
				const content = await reader.open(entry, signal);
				for await (const line of traceLines(content, budget, signal)) {
					this.stream.lines = line.line;
					if (line.bytes.length === 0) continue;
					if (this.stream.role === "network" && this.stream.state !== "supported") continue;
					if (this.stream.role === "trace" && this.#headerSeen && this.stream.state !== "supported") continue;
					this.record(line);
				}
				member.decoded = true;
				if (this.stream.version === null) inventory.diagnostic(member, null, "unknown-stream-version", "This stream has no unambiguous v10 trace profile; its events were not interpreted.");
				for (const diagnostic of this.diagnostics) inventory.diagnostic(member, diagnostic.line, diagnostic.code, diagnostic.message);
				this.stream.supported_events = this.pending.length;
				this.stream.omitted_event_types = Array.from(this.omitted, ([type, count]) => ({
					type,
					count
				}));
				inventory.retain(this.stream);
				for (const event of this.pending) inventory.events.push(event);
				return this.stream;
			}
		};
		readTraceStream = (input) => new TraceStreamRead(input).read();
	})))();
}

//#endregion
//#region dist/browser/history/playwrightTrace/TraceFailure.js
var traceFailure;
function init_TraceFailure() {
	return (init_TraceFailure = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_playwrightTrace();
		init_resources();
		init_RegularFile();
		traceFailure = (cause, path) => {
			if (cause instanceof AnalysisError) return cause;
			if (cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "cancelled") return cancelledBy(PLAYWRIGHT_TRACE_OPERATION, carriedReason(artifactFileCancellationCause(cause)));
				if (cause.reason === "integrity") return readerIntegrityFailure(PLAYWRIGHT_TRACE_OPERATION, path, cause);
				if (cause.reason === "limit") return cause.fixedAllowance === undefined ? new AnalysisResourceConstraintError(PLAYWRIGHT_TRACE_OPERATION, cause.boundary ?? "memory", cause.message, null, {
					cause,
					remediationAction: "Select a smaller complete recorder chunk. Reply selection does not increase archive parsing allowances."
				}) : fixedCeilingConstraint(PLAYWRIGHT_TRACE_OPERATION, cause.boundary ?? "memory", cause.message, cause.fixedAllowance, { cause });
				if (cause.reason === "format" || cause.reason === "path") return stableArtifactInputFailure(cause, PLAYWRIGHT_TRACE_OPERATION);
				return new ArtifactOperationError(PLAYWRIGHT_TRACE_OPERATION, cause.reason, undefined, cause.message, { cause });
			}
			if (cause instanceof Error && "code" in cause && (cause.code === "EACCES" || cause.code === "EPERM")) return new AnalysisAccessDeniedError(PLAYWRIGHT_TRACE_OPERATION, path, cause.code, { cause });
			if (cause instanceof Error && isSelectedRegularFileError(cause)) return new AnalysisInputError(PLAYWRIGHT_TRACE_OPERATION, { cause }, [{
				path: ["path"],
				reason: "invalid_format",
				message: "Expected a readable regular trace archive without a symbolic link."
			}]);
			return new ArtifactOperationError(PLAYWRIGHT_TRACE_OPERATION, "io", undefined, "Trace archive could not be read.", { cause });
		};
	})))();
}

//#endregion
//#region dist/browser/history/playwrightTrace/PlaywrightTraceDecoder.js
var readStreams, TraceArchiveRead, PlaywrightTraceDecoder;
function init_PlaywrightTraceDecoder() {
	return (init_PlaywrightTraceDecoder = __esmMin((() => {
		init_resources();
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_fixedAllowanceRemediation();
		init_result();
		init_playwrightTrace();
		init_TraceInventory();
		init_TraceStream();
		init_TraceFailure();
		readStreams = async (inventory, reader, selected, signal) => {
			const budget = { decodedBytes: 0 };
			const profiles = new Map();
			for (const { entry, member } of selected.filter((row) => row.member.path.endsWith(".trace"))) {
				const stream = await readTraceStream({
					inventory,
					reader,
					entry,
					member,
					budget,
					profileKnown: false,
					...signal === undefined ? {} : { signal }
				});
				inventory.streams.push(stream);
				const previous = profiles.get(member.path) ?? [];
				previous.push(stream);
				profiles.set(member.path, previous);
			}
			for (const { entry, member } of selected.filter((row) => row.member.path.endsWith(".network"))) {
				const expected = member.path.slice(0, -".network".length) + ".trace";
				const paired = profiles.get(expected) ?? [];
				const known = paired.length === 1 && paired[0]?.version === 10 && paired[0].state === "supported";
				inventory.streams.push(await readTraceStream({
					inventory,
					reader,
					entry,
					member,
					budget,
					profileKnown: known,
					...signal === undefined ? {} : { signal }
				}));
			}
		};
		TraceArchiveRead = class {
			resources;
			path;
			signal;
			inventory;
			identity;
			primary;
			complete;
			constructor(resources, path, signal) {
				this.resources = resources;
				this.path = path;
				this.signal = signal;
			}
			async run() {
				try {
					const report = await this.resources.run(() => withArtifactRegularFile(this.path, this.resources, this.signal, (source) => this.readSource(source)));
					assertArtifactReadActive(this.signal);
					return ok(report);
				} catch (cause) {
					const error = traceFailure(this.primary ?? artifactFilePrimaryFacts(cause).cause, this.path);
					const partial = this.complete ?? (this.inventory?.members.length ? this.inventory.finish(true) : this.identity);
					if (partial !== undefined) error.retainPartialObservation(partial);
					if (this.signal?.aborted) analysisErrorWithCancellation(error, cancelledBy(PLAYWRIGHT_TRACE_OPERATION, this.signal));
					return err(projectStableArtifactFailure(cause, error, this.path, PLAYWRIGHT_TRACE_PROVIDER.id, PLAYWRIGHT_TRACE_OPERATION));
				}
			}
			async readSource(source) {
				if (source.initial.size > PLAYWRIGHT_TRACE_LIMITS.archiveBytes) throw new AnalysisResourceConstraintError(PLAYWRIGHT_TRACE_OPERATION, "file-size", "Trace archive exceeds the 256 MiB input allowance.", {
					input_bytes: source.initial.size,
					max_archive_bytes: PLAYWRIGHT_TRACE_LIMITS.archiveBytes
				}, fixedAllowanceOptions(`The Playwright trace archive input allowance of ${String(PLAYWRIGHT_TRACE_LIMITS.archiveBytes)} bytes`, "input", {
					limit: PLAYWRIGHT_TRACE_LIMITS.archiveBytes,
					unit: "bytes"
				}));
				const hash = await hashStableRootArtifactHandle(this.path, source.handle, source.initial, this.signal);
				this.identity = {
					kind: "file-snapshot-hash",
					path: this.path,
					sha256: hash.sha256,
					bytes: hash.bytes
				};
				const facts = new TraceInventory({
					path: this.path,
					sha256: hash.sha256,
					bytes: hash.bytes
				});
				this.inventory = facts;
				const reader = new ZipArtifactReader(this.path, "zip", PLAYWRIGHT_TRACE_LIMITS.metadataBytes, source);
				let outcome;
				try {
					const selected = [];
					for await (const entry of reader.entries(this.signal)) {
						const member = facts.member(entry);
						if (member.path.endsWith(".trace") || member.path.endsWith(".network")) selected.push({
							entry,
							member
						});
					}
					if (selected.length === 0) throw new AnalysisUnsupportedTargetError(PLAYWRIGHT_TRACE_OPERATION, this.path, "Archive contains no Playwright trace or network stream members.");
					if (!selected.some((row) => row.member.path.endsWith(".network"))) facts.diagnostic(null, null, "missing-network-member", "No network stream was supplied; this does not establish absent traffic.");
					await readStreams(facts, reader, selected, this.signal);
					await assertArtifactFileSelectedSource(this.path, source, "Playwright trace");
					this.complete = facts.finish();
					outcome = {
						kind: "completed",
						value: this.complete
					};
				} catch (cause) {
					this.primary = cause;
					outcome = {
						kind: "failed",
						cause
					};
				}
				const released = await this.resources.release({
					kind: "reader",
					resource: `Playwright ZIP reader for ${this.path}`,
					reader
				});
				if (outcome.kind === "completed" && this.signal?.aborted) {
					const cancellation = cancelledBy(PLAYWRIGHT_TRACE_OPERATION, this.signal, { partialObservation: this.complete ?? this.identity });
					this.primary = cancellation;
					outcome = {
						kind: "failed",
						cause: cancellation
					};
				}
				if (released.kind === "failed") throw this.resources.cleanupFailure(outcome, [released], this.complete ?? this.identity);
				if (outcome.kind === "failed") throw outcome.cause;
				return outcome.value;
			}
		};
		PlaywrightTraceDecoder = class {
			resources;
			#running = false;
			constructor(resources) {
				this.resources = resources;
			}
			async inspect(path, signal) {
				if (signal?.aborted) return err(cancelledBy(PLAYWRIGHT_TRACE_OPERATION, signal));
				if (this.#running) return err(new AnalysisResourceConstraintError(PLAYWRIGHT_TRACE_OPERATION, "capacity", "One trace archive import is already active in this decoder.", { maximum_concurrent_trace_imports: 1 }, {
					retryable: true,
					remediationAction: "Wait for the active import to finish, then retry. Queries against retained Evidence do not need another import."
				}));
				this.#running = true;
				try {
					return await new TraceArchiveRead(this.resources, path, signal).run();
				} finally {
					this.#running = false;
				}
			}
		};
	})))();
}

//#endregion
init_PlaywrightTraceDecoder();
export { PlaywrightTraceDecoder };