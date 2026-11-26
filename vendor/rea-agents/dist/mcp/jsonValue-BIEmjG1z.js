import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { isAbsolute, relative, sep } from "node:path";
import { z } from "zod";
import { types } from "node:util";
import { isProxy } from "node:util/types";

//#region dist/domain/analysisResourceLimits.js
var DEFAULT_ASAR_MAX_HEADER_BYTES, MAXIMUM_ASAR_MAX_HEADER_BYTES, DEFAULT_ASAR_MAX_LISTING_BYTES, MAXIMUM_ASAR_MAX_LISTING_BYTES, DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS, DEFAULT_GHIDRA_VALUE_FLOW_MAX_INPUTS_PER_OPERATION, DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES, MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS, MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB, DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES, MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES, DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS, DEFAULT_HOPPER_STARTUP_TIMEOUT_MS, DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS, MINIMUM_HOPPER_CALLER_SCAN_BUDGET_MS, MAX_NODE_TIMER_DELAY_MS, deadlineParameterLimit, TIMER_DURATION_MINIMUM_MS, timerDurationMsSchema, MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS, DEFAULT_REGEX_MATCHING_DEADLINE_MS, DEFAULT_REGEX_WORKER_HEAP_REQUEST_MIB, MINIMUM_REGEX_WORKER_HEAP_REQUEST_MIB, MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB, DEFAULT_CAPTURE_DECODER_OLD_GENERATION_MIB, CAPTURE_DECODER_SEMI_SPACE_MIB, MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB, DEFAULT_JADX_OPERATION_TIMEOUT_MS, DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS, MINIMUM_DEBUGGER_COMMAND_DEADLINE_MS, DEFAULT_DEBUGGER_MAX_SESSIONS, MINIMUM_DEBUGGER_MAX_SESSIONS, MAXIMUM_DEBUGGER_MAX_SESSIONS, DEFAULT_DEBUGGER_MAX_PENDING_COMMANDS, MINIMUM_DEBUGGER_MAX_PENDING_COMMANDS, MAXIMUM_DEBUGGER_MAX_PENDING_COMMANDS, DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, NODE_MAX_STRING_LENGTH, DEBUGGER_OUTPUT_JSON_ESCAPE_CODE_UNITS, DEBUGGER_OUTPUT_EVIDENCE_ENVELOPE_CODE_UNITS, MINIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, DEBUGGER_CONTROL_REPLY_BYTES, DEFAULT_BRIDGE_MAX_REQUEST_BYTES, MINIMUM_BRIDGE_MAX_REQUEST_BYTES, MAXIMUM_BRIDGE_MAX_REQUEST_BYTES, DEFAULT_BRIDGE_MAX_REPLY_BYTES, MINIMUM_BRIDGE_MAX_REPLY_BYTES, MAXIMUM_BRIDGE_MAX_REPLY_BYTES, DEFAULT_JEB_MCP_TIMEOUT_MS, DEFAULT_KUNA_PROJECT_TIMEOUT_MS, DEFAULT_KUNA_FUNCTION_TIMEOUT_MS, DEFAULT_PWNTOOLS_MAX_INPUT_BYTES, MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES, DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES, MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS, MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS, DEFAULT_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, DEFAULT_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, DEFAULT_ZSTD_MAX_FRAMES, MINIMUM_ZSTD_MAX_FRAMES, MAXIMUM_ZSTD_MAX_FRAMES;
function init_analysisResourceLimits() {
	return (init_analysisResourceLimits = __esmMin((() => {
		DEFAULT_ASAR_MAX_HEADER_BYTES = 16 * 1024 * 1024;
		MAXIMUM_ASAR_MAX_HEADER_BYTES = 256 * 1024 * 1024;
		DEFAULT_ASAR_MAX_LISTING_BYTES = 64 * 1024 * 1024;
		MAXIMUM_ASAR_MAX_LISTING_BYTES = Number.MAX_SAFE_INTEGER;
		DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS = 3e3;
		DEFAULT_GHIDRA_VALUE_FLOW_MAX_INPUTS_PER_OPERATION = 64;
		DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES = 12e3;
		MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS = 2147483647;
		MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB = 2047;
		DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES = 524288;
		MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES = 8388608;
		DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES = 96 * 1024 * 1024;
		MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES = 1024 * 1024 * 1024;
		DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS = 33e4;
		DEFAULT_HOPPER_STARTUP_TIMEOUT_MS = 12e4;
		DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS = 2e3;
		MINIMUM_HOPPER_CALLER_SCAN_BUDGET_MS = 1;
		MAX_NODE_TIMER_DELAY_MS = 2147483647;
		deadlineParameterLimit = (parameter, timeoutMs, defaultMs) => ({
			control_kind: "parameter",
			parameter,
			effective_value: timeoutMs,
			unit: "ms",
			minimum: 1,
			maximum: MAX_NODE_TIMER_DELAY_MS,
			default_value: defaultMs,
			applies_at: "next_call"
		});
		TIMER_DURATION_MINIMUM_MS = 1;
		timerDurationMsSchema = z.int().min(1).max(MAX_NODE_TIMER_DELAY_MS);
		MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS = Math.floor(MAX_NODE_TIMER_DELAY_MS / 1e3);
		DEFAULT_REGEX_MATCHING_DEADLINE_MS = 5e3;
		DEFAULT_REGEX_WORKER_HEAP_REQUEST_MIB = 128;
		MINIMUM_REGEX_WORKER_HEAP_REQUEST_MIB = 7;
		MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB = 16384;
		DEFAULT_CAPTURE_DECODER_OLD_GENERATION_MIB = 192;
		CAPTURE_DECODER_SEMI_SPACE_MIB = 8;
		MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB = 16384;
		DEFAULT_JADX_OPERATION_TIMEOUT_MS = 12e4;
		DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS = 12e4;
		MINIMUM_DEBUGGER_COMMAND_DEADLINE_MS = 1;
		DEFAULT_DEBUGGER_MAX_SESSIONS = 8;
		MINIMUM_DEBUGGER_MAX_SESSIONS = 1;
		MAXIMUM_DEBUGGER_MAX_SESSIONS = 64;
		DEFAULT_DEBUGGER_MAX_PENDING_COMMANDS = 16;
		MINIMUM_DEBUGGER_MAX_PENDING_COMMANDS = 1;
		MAXIMUM_DEBUGGER_MAX_PENDING_COMMANDS = 256;
		DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES = 16 * 1024 * 1024;
		NODE_MAX_STRING_LENGTH = 536870888;
		DEBUGGER_OUTPUT_JSON_ESCAPE_CODE_UNITS = 6;
		DEBUGGER_OUTPUT_EVIDENCE_ENVELOPE_CODE_UNITS = 1024 * 1024;
		MINIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES = 1;
		MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES = Math.floor((NODE_MAX_STRING_LENGTH - DEBUGGER_OUTPUT_EVIDENCE_ENVELOPE_CODE_UNITS) / DEBUGGER_OUTPUT_JSON_ESCAPE_CODE_UNITS);
		DEBUGGER_CONTROL_REPLY_BYTES = 16 * 1024 * 1024;
		DEFAULT_BRIDGE_MAX_REQUEST_BYTES = 16 * 1024 * 1024;
		MINIMUM_BRIDGE_MAX_REQUEST_BYTES = 7464;
		MAXIMUM_BRIDGE_MAX_REQUEST_BYTES = 536870888 - 1;
		DEFAULT_BRIDGE_MAX_REPLY_BYTES = 256 * 1024 * 1024;
		MINIMUM_BRIDGE_MAX_REPLY_BYTES = 1024 * 1024;
		MAXIMUM_BRIDGE_MAX_REPLY_BYTES = NODE_MAX_STRING_LENGTH;
		DEFAULT_JEB_MCP_TIMEOUT_MS = 6e4;
		DEFAULT_KUNA_PROJECT_TIMEOUT_MS = 30 * 60 * 1e3;
		DEFAULT_KUNA_FUNCTION_TIMEOUT_MS = 12e4;
		DEFAULT_PWNTOOLS_MAX_INPUT_BYTES = 32 * 1024 * 1024;
		MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES = 1024 * 1024 * 1024;
		DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES = 128 * 1024 ** 3;
		MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES = 1024 * 1024;
		MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES = 128 * 1024 ** 3;
		DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS = 2e3;
		MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS = 6e4;
		DEFAULT_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS = 25;
		MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS = 1e3;
		DEFAULT_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS = 40;
		MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS = 1e3;
		DEFAULT_ZSTD_MAX_FRAMES = 4096;
		MINIMUM_ZSTD_MAX_FRAMES = 1;
		MAXIMUM_ZSTD_MAX_FRAMES = 65536;
	})))();
}

//#endregion
//#region dist/domain/coverage.js
var coverageStatusSchema, knownCoverageStatusSchema, completeOrUnknownCoverageSchema, joinCoverageStatus;
function init_coverage() {
	return (init_coverage = __esmMin((() => {
		coverageStatusSchema = z.enum([
			"complete",
			"partial",
			"unknown"
		]);
		knownCoverageStatusSchema = coverageStatusSchema.exclude(["unknown"]);
		completeOrUnknownCoverageSchema = coverageStatusSchema.exclude(["partial"]);
		joinCoverageStatus = (parts) => parts.includes("unknown") ? "unknown" : parts.includes("partial") ? "partial" : "complete";
	})))();
}

//#endregion
//#region dist/domain/schemaAnnotations.js
var annotations, schemaAnnotations, presentRootDiscriminator, presentCompleteObservation, annotatePatternDeclaration, presentObjectRoot;
function init_schemaAnnotations() {
	return (init_schemaAnnotations = __esmMin((() => {
		annotations = z.registry();
		schemaAnnotations = (schema) => annotations.get(schema);
		presentRootDiscriminator = (schema, discriminator) => {
			annotations.add(schema, {
				...annotations.get(schema),
				rootDiscriminator: discriminator
			});
			return schema;
		};
		presentCompleteObservation = (schema) => {
			const annotated = schema.clone();
			annotations.add(annotated, { completeObservation: true });
			return annotated;
		};
		annotatePatternDeclaration = (schema, relation) => {
			annotations.add(schema, {
				...annotations.get(schema),
				patternDeclaration: relation
			});
			return schema;
		};
		presentObjectRoot = (schema) => {
			annotations.add(schema, {
				...annotations.get(schema),
				objectRoot: true
			});
			return schema;
		};
	})))();
}

//#endregion
//#region dist/domain/schemaConstraints.js
var distinctItems, excludedValues, maxCodePoints, declarePresence, requirePresence, declaredPattern, declaredTokenPattern, declaredByPatterns, jsonDocumentText;
function init_schemaConstraints() {
	return (init_schemaConstraints = __esmMin((() => {
		init_schemaAnnotations();
		distinctItems = (schema, message) => schema.refine((items) => new Set(items).size === items.length, { message }).meta({ uniqueItems: true });
		excludedValues = (schema, values, message) => schema.refine((value) => !values.includes(value), { message }).meta({ not: { enum: [...values] } });
		maxCodePoints = (schema, maximum, message) => schema.refine((value) => {
			const characters = value[Symbol.iterator]();
			for (let count = 0; count <= maximum; count += 1) if (characters.next().done) return true;
			return false;
		}, {
			message,
			abort: true
		}).meta({ maxLength: maximum });
		declarePresence = (rules) => {
			const dependentRequired = {};
			const conditionals = [];
			for (const rule of rules) {
				if (rule.equals === undefined && rule.requiresValue === undefined) {
					(dependentRequired[rule.when] ??= []).push(rule.requires);
					continue;
				}
				conditionals.push({
					if: {
						...rule.equals === undefined ? {} : { properties: { [rule.when]: { const: rule.equals } } },
						required: [rule.when]
					},
					then: {
						required: [rule.requires],
						...rule.requiresValue === undefined ? {} : { properties: { [rule.requires]: { const: rule.requiresValue } } }
					}
				});
			}
			return {
				...Object.keys(dependentRequired).length === 0 ? {} : { dependentRequired },
				...conditionals.length === 1 ? conditionals[0] : conditionals.length > 1 ? { allOf: conditionals } : {}
			};
		};
		requirePresence = (schema, rules) => schema.superRefine((parsed, context) => {
			const value = parsed;
			for (const rule of rules) {
				const trigger = value[rule.when];
				if (trigger === undefined || rule.equals !== undefined && trigger !== rule.equals || (rule.requiresValue === undefined ? value[rule.requires] !== undefined : value[rule.requires] === rule.requiresValue)) continue;
				context.addIssue({
					code: "custom",
					path: [rule.path ?? rule.when],
					message: rule.message
				});
			}
		}).meta(declarePresence(rules));
		declaredPattern = (expression) => {
			if (expression.flags !== "" && expression.flags !== "u") throw new TypeError(`Pattern /${expression.source}/${expression.flags} has flags JSON Schema cannot declare`);
			return expression.source;
		};
		declaredTokenPattern = (schema, pattern) => schema.meta({ pattern: declaredPattern(pattern) });
		declaredByPatterns = (schema, predicate, declaration, check) => {
			const allOf = [...(declaration.matches ?? []).map((expression) => ({ pattern: declaredPattern(expression) })), ...(declaration.excludes ?? []).map((expression) => ({ not: { pattern: declaredPattern(expression) } }))];
			if (allOf.length === 0) throw new TypeError("A pattern declaration needs at least one pattern");
			return annotatePatternDeclaration(schema.refine(predicate, check).meta({ allOf }), declaration.relation);
		};
		jsonDocumentText = (schema, contentSchema) => schema.meta({
			contentMediaType: "application/json",
			...contentSchema === undefined ? {} : { contentSchema }
		});
	})))();
}

//#endregion
//#region dist/domain/stringPatterns.js
var IDENTIFIER_PATTERN, STABLE_IDENTIFIER_PATTERN, BASE64_QUARTET_LENGTH_PATTERN, INVALID_BASE64_CHARACTER_PATTERN, INVALID_BASE64_PADDING_PATTERN, INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN, UNPAIRED_SURROGATE_PATTERN, rejectUnpairedSurrogates, isPaddedBase64, isCanonicalBase64, canonicalBase64Schema;
function init_stringPatterns() {
	return (init_stringPatterns = __esmMin((() => {
		init_schemaConstraints();
		IDENTIFIER_PATTERN = /^[A-Za-z][A-Za-z0-9._\x2d]*$/u;
		STABLE_IDENTIFIER_PATTERN = /^[A-Za-z][A-Za-z0-9._:\x2f\x2d]*$/u;
		BASE64_QUARTET_LENGTH_PATTERN = /^(?:....)*$/;
		INVALID_BASE64_CHARACTER_PATTERN = /[^A-Za-z0-9+\x2f=]/;
		INVALID_BASE64_PADDING_PATTERN = /(?:=[^=]|===)/;
		INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN = /(?:[^AQgw]==$|[BCDFGHJKLNOPRSTVWXZabdefhijlmnpqrtuvxyz1235679+\x2f]=$)/;
		UNPAIRED_SURROGATE_PATTERN = /[\uD800-\uDFFF]/u;
		rejectUnpairedSurrogates = (schema, message) => schema.superRefine((value, context) => {
			if (UNPAIRED_SURROGATE_PATTERN.test(value)) context.addIssue({
				code: "invalid_format",
				format: "regex",
				message,
				input: value
			});
		});
		isPaddedBase64 = (value) => value.length % 4 === 0 && !INVALID_BASE64_CHARACTER_PATTERN.test(value) && !INVALID_BASE64_PADDING_PATTERN.test(value);
		isCanonicalBase64 = (value) => isPaddedBase64(value) && !INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN.test(value);
		canonicalBase64Schema = declaredByPatterns(z.string(), isCanonicalBase64, {
			matches: [BASE64_QUARTET_LENGTH_PATTERN],
			excludes: [
				INVALID_BASE64_CHARACTER_PATTERN,
				INVALID_BASE64_PADDING_PATTERN,
				INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN
			],
			relation: "exact"
		}, {
			message: "Expected canonical padded base64",
			abort: true
		});
	})))();
}

//#endregion
//#region dist/domain/localPath.js
var nulFreeStringSchema, localPathStringSchema, windowsAbsolutePathPattern, absoluteLocalPathStringSchema, isPathWithinRoot;
function init_localPath() {
	return (init_localPath = __esmMin((() => {
		init_stringPatterns();
		nulFreeStringSchema = z.string().regex(/^[^\x00]*$/u, "Local filesystem paths cannot contain NUL");
		localPathStringSchema = rejectUnpairedSurrogates(nulFreeStringSchema.min(1), "Local filesystem paths must contain well-formed Unicode");
		windowsAbsolutePathPattern = /^(?:[\x5C\x2F]|[A-Za-z]:[\x5C\x2F])/u;
		absoluteLocalPathStringSchema = localPathStringSchema.regex(windowsAbsolutePathPattern, {
			message: "must be an absolute local filesystem path",
			abort: true
		}).superRefine((value, context) => {
			if (!isAbsolute(value)) context.addIssue({
				code: "invalid_format",
				format: "regex",
				message: "must be an absolute local filesystem path",
				input: value
			});
		});
		isPathWithinRoot = (root, path) => {
			const value = relative(root, path);
			return value === "" || value !== ".." && !value.startsWith(`..${sep}`) && !isAbsolute(value);
		};
	})))();
}

//#endregion
//#region dist/domain/parseFailure.js
var reportedParseLimit, ParseFailureError, failureWith, malformedInput, truncatedInput, unsupportedInput, decodeLimit, HOST_CAPACITY_MESSAGES, HOST_CAPACITY_CODES, hostRangeErrorKind, isHostLimitFailure, parseFailureFromCause;
function init_parseFailure() {
	return (init_parseFailure = __esmMin((() => {
		reportedParseLimit = ({ name, maximum, required }) => ({
			boundary: name,
			maximum,
			...required === undefined ? {} : { required: typeof required === "bigint" ? String(required) : required }
		});
		ParseFailureError = class extends Error {
			failure;
			_tag = "ParseFailureError";
			constructor(failure, options) {
				super(failure.detail, options);
				this.failure = failure;
				this.name = "ParseFailureError";
			}
			get kind() {
				return this.failure.kind;
			}
		};
		failureWith = (failure, cause) => new ParseFailureError(failure, cause === undefined ? undefined : { cause });
		malformedInput = (format, detail, { cause, ...at } = {}) => failureWith({
			kind: "malformed",
			format,
			detail,
			...at
		}, cause);
		truncatedInput = (format, detail, { cause, ...at } = {}) => failureWith({
			kind: "truncated",
			format,
			detail,
			...at
		}, cause);
		unsupportedInput = (format, detail, { cause, undecodedContent = false, ...at } = {}) => failureWith({
			kind: "unsupported",
			format,
			detail,
			...at,
			undecodedContent
		}, cause);
		decodeLimit = (format, detail, limit, { cause, ...at } = {}) => failureWith({
			kind: "limit",
			format,
			detail,
			...at,
			limit
		}, cause);
		HOST_CAPACITY_MESSAGES = new Set([
			"Invalid string length",
			"Array buffer allocation failed",
			"Invalid array length"
		]);
		HOST_CAPACITY_CODES = new Set(["ERR_STRING_TOO_LONG", "ERR_BUFFER_TOO_LARGE"]);
		hostRangeErrorKind = (cause) => {
			if (!(cause instanceof Error)) return undefined;
			const code = "code" in cause ? String(cause.code) : undefined;
			if (code !== undefined && HOST_CAPACITY_CODES.has(code)) return "host-capacity";
			if (!(cause instanceof RangeError)) return undefined;
			if (cause.message === "Maximum call stack size exceeded") return "stack-overflow";
			if (HOST_CAPACITY_MESSAGES.has(cause.message) || cause.message.startsWith("Invalid typed array length")) return "host-capacity";
			return undefined;
		};
		isHostLimitFailure = (cause) => {
			const kind = hostRangeErrorKind(cause);
			return kind === "stack-overflow" || kind === "host-capacity";
		};
		parseFailureFromCause = (cause) => {
			if (cause instanceof ParseFailureError) return cause;
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/kernel/isRecord.js
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function init_isRecord() {
	return (init_isRecord = __esmMin((() => {})))();
}

//#endregion
//#region dist/domain/immutableJson.js
function* ownedTreeChildren(value) {
	if (Array.isArray(value)) {
		for (let index = 0; index < value.length; index++) {
			const descriptor = Object.getOwnPropertyDescriptor(value, index);
			if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) throw new TypeError("Owned JSON trees require dense data arrays");
			yield descriptor.value;
		}
	} else {
		for (const key in value) {
			if (!Object.hasOwn(value, key)) continue;
			const descriptor = Object.getOwnPropertyDescriptor(value, key);
			if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) throw new TypeError("Immutable JSON snapshots cannot contain accessors");
			yield descriptor.value;
		}
	}
}
/**
* Seal exclusively owned JSON in bounded steps, authenticating only completion.
* Abandonment or failure can leave the provisional input partly frozen.
*/
function* freezeOwnedJsonSnapshotSteps(value) {
	const pending = [{
		value,
		exiting: false
	}];
	const visited = new Set();
	const ancestors = new Set();
	let examined = 0;
	try {
		while (pending.length > 0) {
			if (examined++ === 4096) {
				examined = 0;
				yield;
			}
			const entry = pending.pop();
			if (entry === undefined) break;
			const item = entry.value;
			if (entry.exiting && typeof item === "object" && item !== null) {
				ancestors.delete(item);
				visited.add(item);
				continue;
			}
			if (isImmutableJsonSnapshot(item)) continue;
			if (typeof item !== "object" || item === null) throw new TypeError("Immutable JSON snapshots require JSON values");
			if (ancestors.has(item)) throw new TypeError("Immutable JSON snapshots cannot contain circular references");
			if (visited.has(item)) continue;
			ancestors.add(item);
			pending.push({
				value: item,
				exiting: true
			});
			pushSnapshotChildren(item, pending);
			Object.freeze(item);
		}
		if (typeof value === "object" && value !== null) immutableSnapshots.add(value);
		return value;
	} finally {
		pending.length = 0;
		visited.clear();
		ancestors.clear();
	}
}
var immutableSnapshots, isImmutableJsonSnapshot, immutableJsonSnapshotMember, canBorrowParsedJsonSnapshot, freezeJsonSnapshot, freezeOwnedJsonTreeSnapshot, pushSnapshotChildren;
function init_immutableJson() {
	return (init_immutableJson = __esmMin((() => {
		immutableSnapshots = new WeakSet();
		isImmutableJsonSnapshot = (value) => value === null || typeof value === "string" || typeof value === "boolean" || typeof value === "number" && Number.isFinite(value) || typeof value === "object" && immutableSnapshots.has(value);
		immutableJsonSnapshotMember = (snapshot, key) => {
			if (typeof snapshot !== "object" || snapshot === null || !immutableSnapshots.has(snapshot)) return undefined;
			const descriptor = Object.getOwnPropertyDescriptor(snapshot, key);
			if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) return undefined;
			const member = descriptor.value;
			if (typeof member === "object" && member !== null) immutableSnapshots.add(member);
			return member;
		};
		canBorrowParsedJsonSnapshot = (source, parsed) => {
			if (!isImmutableJsonSnapshot(source)) return false;
			if (Object.is(source, parsed)) return true;
			const pending = [source, parsed];
			const compared = new Map();
			const sources = new Map();
			while (pending.length > 0) {
				const right = pending.pop();
				const left = pending.pop();
				if (typeof left !== "object" || left === null || typeof right !== "object" || right === null) {
					if (!Object.is(left, right)) return false;
					continue;
				}
				if (isProxy(right) || Object.getPrototypeOf(left) !== Object.getPrototypeOf(right)) return false;
				const previous = compared.get(left);
				if (previous !== undefined) {
					if (previous !== right) return false;
					continue;
				}
				if (sources.has(right)) return false;
				compared.set(left, right);
				sources.set(right, left);
				const keys = Reflect.ownKeys(left);
				if (keys.length !== Reflect.ownKeys(right).length) return false;
				for (const key of keys) {
					if (typeof key !== "string") return false;
					const a = Object.getOwnPropertyDescriptor(left, key);
					const b = Object.getOwnPropertyDescriptor(right, key);
					if (a === undefined || b === undefined || !Object.hasOwn(a, "value") || !Object.hasOwn(b, "value") || a.enumerable !== b.enumerable) return false;
					pending.push(a.value, b.value);
				}
			}
			return true;
		};
		freezeJsonSnapshot = (value) => {
			const pending = [{
				value,
				exiting: false
			}];
			const visited = new Set();
			const ancestors = new Set();
			const objects = [];
			while (pending.length > 0) {
				const entry = pending.pop();
				if (entry === undefined) break;
				const item = entry.value;
				if (entry.exiting && typeof item === "object" && item !== null) {
					ancestors.delete(item);
					visited.add(item);
					objects.push(item);
					continue;
				}
				if (isImmutableJsonSnapshot(item)) continue;
				if (typeof item !== "object" || item === null) throw new TypeError("Immutable JSON snapshots require JSON values");
				if (ancestors.has(item)) throw new TypeError("Immutable JSON snapshots cannot contain circular references");
				if (visited.has(item)) continue;
				ancestors.add(item);
				pending.push({
					value: item,
					exiting: true
				});
				pushSnapshotChildren(item, pending);
			}
			for (const item of objects) Object.freeze(item);
			if (typeof value === "object" && value !== null) immutableSnapshots.add(value);
			return value;
		};
		freezeOwnedJsonTreeSnapshot = (value) => {
			const frames = [];
			const ancestors = new Set();
			const enter = (item) => {
				if (isImmutableJsonSnapshot(item)) return;
				if (typeof item !== "object" || item === null) throw new TypeError("Immutable JSON snapshots require JSON values");
				if (isProxy(item)) throw new TypeError("Immutable JSON snapshots cannot contain proxies");
				if (ancestors.has(item)) throw new TypeError("Immutable JSON snapshots cannot contain circular references");
				const prototype = Object.getPrototypeOf(item);
				if (!Array.isArray(item) && prototype !== Object.prototype && prototype !== null) throw new TypeError("Immutable JSON snapshots require ordinary objects");
				ancestors.add(item);
				frames.push({
					value: item,
					children: ownedTreeChildren(item)
				});
			};
			enter(value);
			while (frames.length > 0) {
				const frame = frames[frames.length - 1];
				const next = frame.children.next();
				if (!next.done) enter(next.value);
				else {
					Object.freeze(frame.value);
					ancestors.delete(frame.value);
					frames.pop();
				}
			}
			if (typeof value === "object" && value !== null) immutableSnapshots.add(value);
			return value;
		};
		pushSnapshotChildren = (item, pending) => {
			if (isProxy(item)) throw new TypeError("Immutable JSON snapshots cannot contain proxies");
			const prototype = Object.getPrototypeOf(item);
			if (!Array.isArray(item) && prototype !== Object.prototype && prototype !== null) throw new TypeError("Immutable JSON snapshots require ordinary objects");
			if (Array.isArray(item)) {
				for (let index = 0; index < item.length; index += 1) if (!Object.hasOwn(item, index)) throw new TypeError("Immutable JSON snapshots cannot contain sparse arrays");
			}
			for (const key of Object.getOwnPropertyNames(item)) {
				const descriptor = Object.getOwnPropertyDescriptor(item, key);
				if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) throw new TypeError("Immutable JSON snapshots cannot contain accessors");
				const child = descriptor.value;
				pending.push({
					value: child,
					exiting: false
				});
			}
		};
	})))();
}

//#endregion
//#region dist/domain/jsonValue.js
function* ownEnumerableKeys(value) {
	for (const key in value) if (Object.hasOwn(value, key)) yield key;
}
function* jsonObjectValues(record) {
	for (const key of ownEnumerableKeys(record)) yield record[key];
}
/** Validate JSON in bounded steps; cache only authenticated immutable roots. */
function* jsonValueValidationSteps(root) {
	const immutable = typeof root === "object" && root !== null && isImmutableJsonSnapshot(root) ? root : undefined;
	if (immutable !== undefined && immutableValidation.has(immutable)) return immutableValidation.get(immutable);
	const finish = (issue) => {
		if (immutable !== undefined) immutableValidation.set(immutable, issue);
		return issue;
	};
	const pending = [];
	let value = root;
	let depth = 0;
	let inspect = true;
	let examined = 0;
	for (;;) {
		if (inspect) {
			if (examined++ === 4096) {
				examined = 0;
				yield;
			}
			if (depth > 1e3) return finish(`JSON value exceeds maximum nesting depth of ${MAX_JSON_DEPTH}. This release has no runtime override.`);
			if (typeof value === "object" && value !== null && types.isProxy(value)) return finish("JSON values cannot contain proxies");
			if (value === null || typeof value === "string" || typeof value === "boolean") {
				inspect = false;
			} else if (typeof value === "number") {
				if (!Number.isFinite(value)) return finish("JSON numbers must be finite");
				inspect = false;
			} else if (Array.isArray(value)) {
				pending.push({
					kind: "array",
					value,
					depth,
					index: 0
				});
				inspect = false;
			} else if (isRecord(value)) {
				const prototype = Object.getPrototypeOf(value);
				if (prototype !== Object.prototype && prototype !== null) return finish("JSON objects require ordinary data properties");
				for (const key of Object.getOwnPropertySymbols(value)) if (Object.getOwnPropertyDescriptor(value, key)?.enumerable === true) return finish("JSON object keys must be strings");
				pending.push({
					kind: "object",
					value,
					depth,
					keys: ownEnumerableKeys(value)
				});
				inspect = false;
			} else return finish("Invalid JSON value");
			continue;
		}
		const frame = pending[pending.length - 1];
		if (frame === undefined) return finish(undefined);
		if (frame.kind === "array") {
			if (frame.index >= frame.value.length) {
				pending.pop();
				continue;
			}
			const index = frame.index++;
			const descriptor = Object.getOwnPropertyDescriptor(frame.value, index);
			if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) return finish("JSON arrays require dense data properties without accessors");
			value = descriptor.value;
			depth = frame.depth + 1;
			inspect = true;
			continue;
		}
		const next = frame.keys.next();
		if (next.done) {
			pending.pop();
			continue;
		}
		const descriptor = Object.getOwnPropertyDescriptor(frame.value, next.value);
		if (descriptor?.enumerable !== true) continue;
		if (!Object.hasOwn(descriptor, "value")) return finish("JSON objects cannot contain accessors");
		value = descriptor.value;
		depth = frame.depth + 1;
		inspect = true;
	}
}
var MAX_JSON_DEPTH, equalJsonValues, immutableValidation, jsonValueValidationIssue, jsonValueExceedsDepth, preserveJsonValue, validatedJsonValue, jsonValueSchema, ownedJsonValueSchema, objectValidation, objectProjection, jsonObjectSchema, ownedJsonObjectSchema;
function init_jsonValue() {
	return (init_jsonValue = __esmMin((() => {
		init_immutableJson();
		MAX_JSON_DEPTH = 1e3;
		equalJsonValues = (left, right) => {
			if (left === right) return true;
			if (left === null || right === null || typeof left !== "object" || typeof right !== "object") return false;
			if (Array.isArray(left)) {
				if (!Array.isArray(right) || left.length !== right.length) return false;
				for (let index = 0; index < left.length; index++) if (!equalJsonValues(left[index], right[index])) return false;
				return true;
			}
			if (Array.isArray(right)) return false;
			const keys = Object.keys(left);
			if (keys.length !== Object.keys(right).length) return false;
			for (const key of keys) if (!Object.prototype.propertyIsEnumerable.call(right, key) || !equalJsonValues(left[key], right[key])) return false;
			return true;
		};
		immutableValidation = new WeakMap();
		jsonValueValidationIssue = (root) => {
			const steps = jsonValueValidationSteps(root);
			for (;;) {
				const step = steps.next();
				if (step.done) return step.value;
			}
		};
		jsonValueExceedsDepth = (root, limit) => {
			const levels = [[root].values()];
			for (let level = levels.at(-1); level !== undefined; level = levels.at(-1)) {
				const next = level.next();
				if (next.done === true) levels.pop();
				else if (levels.length - 1 > limit) return true;
				else if (Array.isArray(next.value)) levels.push(next.value.values());
				else if (isRecord(next.value)) levels.push(jsonObjectValues(next.value));
			}
			return false;
		};
		preserveJsonValue = (value) => {
			const immutableCandidate = value;
			if (isImmutableJsonSnapshot(immutableCandidate)) return value;
			if (Array.isArray(value)) {
				const copy = [];
				for (let index = 0; index < value.length; index += 1) copy.push(preserveJsonValue(value[index]));
				return copy;
			}
			if (value !== null && typeof value === "object") {
				const copy = {};
				for (const key of ownEnumerableKeys(value)) Object.defineProperty(copy, key, {
					value: preserveJsonValue(value[key]),
					enumerable: true,
					configurable: true,
					writable: true
				});
				return copy;
			}
			return value;
		};
		validatedJsonValue = z.unknown().superRefine((value, context) => {
			const issue = jsonValueValidationIssue(value);
			if (issue !== undefined) context.addIssue({
				code: "custom",
				message: issue,
				continue: false
			});
		}).transform((value) => value);
		validatedJsonValue._zod.toJSONSchema = () => ({});
		jsonValueSchema = z.unknown().nonoptional().pipe(validatedJsonValue).transform(preserveJsonValue);
		jsonValueSchema._zod.toJSONSchema = () => ({});
		ownedJsonValueSchema = z.unknown().nonoptional().pipe(validatedJsonValue);
		ownedJsonValueSchema._zod.toJSONSchema = () => ({});
		objectValidation = z.custom(isRecord, "Expected JSON object");
		objectProjection = () => ({
			type: "object",
			additionalProperties: {}
		});
		objectValidation._zod.toJSONSchema = objectProjection;
		jsonObjectSchema = jsonValueSchema.pipe(objectValidation);
		jsonObjectSchema._zod.toJSONSchema = objectProjection;
		ownedJsonObjectSchema = ownedJsonValueSchema.pipe(objectValidation);
		ownedJsonObjectSchema._zod.toJSONSchema = objectProjection;
	})))();
}

//#endregion
export { presentObjectRoot as $, init_analysisResourceLimits as $t, absoluteLocalPathStringSchema as A, MAXIMUM_ASAR_MAX_HEADER_BYTES as At, canonicalBase64Schema as B, MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES as Bt, init_parseFailure as C, DEFAULT_KUNA_FUNCTION_TIMEOUT_MS as Ct, reportedParseLimit as D, DEFAULT_REGEX_MATCHING_DEADLINE_MS as Dt, parseFailureFromCause as E, DEFAULT_PWNTOOLS_MAX_INPUT_BYTES as Et, IDENTIFIER_PATTERN as F, MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES as Ft, declaredByPatterns as G, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS as Gt, isCanonicalBase64 as H, MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB as Ht, INVALID_BASE64_CHARACTER_PATTERN as I, MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES as It, init_schemaConstraints as J, MAX_NODE_TIMER_DELAY_MS as Jt, distinctItems as K, MAXIMUM_ZSTD_MAX_FRAMES as Kt, INVALID_BASE64_PADDING_PATTERN as L, MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB as Lt, isPathWithinRoot as M, MAXIMUM_BRIDGE_MAX_REPLY_BYTES as Mt, localPathStringSchema as N, MAXIMUM_BRIDGE_MAX_REQUEST_BYTES as Nt, truncatedInput as O, DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS as Ot, nulFreeStringSchema as P, MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB as Pt, presentCompleteObservation as Q, deadlineParameterLimit as Qt, INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN as R, MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS as Rt, hostRangeErrorKind as S, DEFAULT_JEB_MCP_TIMEOUT_MS as St, malformedInput as T, DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES as Tt, isPaddedBase64 as U, MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS as Ut, init_stringPatterns as V, MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES as Vt, rejectUnpairedSurrogates as W, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS as Wt, requirePresence as X, MINIMUM_BRIDGE_MAX_REQUEST_BYTES as Xt, maxCodePoints as Y, MINIMUM_BRIDGE_MAX_REPLY_BYTES as Yt, init_schemaAnnotations as Z, MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES as Zt, isImmutableJsonSnapshot as _, DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS as _t, jsonValueExceedsDepth as a, joinCoverageStatus as at, ParseFailureError as b, DEFAULT_JADX_OPERATION_TIMEOUT_MS as bt, jsonValueValidationSteps as c, DEFAULT_ASAR_MAX_HEADER_BYTES as ct, canBorrowParsedJsonSnapshot as d, DEFAULT_BRIDGE_MAX_REQUEST_BYTES as dt, timerDurationMsSchema as en, presentRootDiscriminator as et, freezeJsonSnapshot as f, DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES as ft, init_immutableJson as g, DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES as gt, immutableJsonSnapshotMember as h, DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS as ht, jsonObjectSchema as i, init_coverage as it, init_localPath as j, MAXIMUM_ASAR_MAX_LISTING_BYTES as jt, unsupportedInput as k, DEFAULT_ZSTD_MAX_FRAMES as kt, ownedJsonObjectSchema as l, DEFAULT_ASAR_MAX_LISTING_BYTES as lt, freezeOwnedJsonTreeSnapshot as m, DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES as mt, equalJsonValues as n, completeOrUnknownCoverageSchema as nt, jsonValueSchema as o, knownCoverageStatusSchema as ot, freezeOwnedJsonSnapshotSteps as p, DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS as pt, excludedValues as q, MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS as qt, init_jsonValue as r, coverageStatusSchema as rt, jsonValueValidationIssue as s, DEBUGGER_CONTROL_REPLY_BYTES as st, MAX_JSON_DEPTH as t, schemaAnnotations as tt, ownedJsonValueSchema as u, DEFAULT_BRIDGE_MAX_REPLY_BYTES as ut, init_isRecord as v, DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS as vt, isHostLimitFailure as w, DEFAULT_KUNA_PROJECT_TIMEOUT_MS as wt, decodeLimit as x, DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES as xt, isRecord as y, DEFAULT_HOPPER_STARTUP_TIMEOUT_MS as yt, STABLE_IDENTIFIER_PATTERN as z, MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES as zt };