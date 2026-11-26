import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { C as init_parseFailure, b as ParseFailureError, x as decodeLimit } from "./jsonValue-BIEmjG1z.js";
import { z } from "zod";
import { createHash } from "node:crypto";

//#region dist/kernel/sha256Hex.js
var sha256Hex;
function init_sha256Hex() {
	return (init_sha256Hex = __esmMin((() => {
		sha256Hex = (data, encoding) => (typeof data === "string" && encoding !== undefined ? createHash("sha256").update(data, encoding) : createHash("sha256").update(data)).digest("hex");
	})))();
}

//#endregion
//#region dist/domain/residualUnknownGraphError.js
var describeResidualUnknownGraphConstraint, InvalidResidualUnknownGraphError;
function init_residualUnknownGraphError() {
	return (init_residualUnknownGraphError = __esmMin((() => {
		describeResidualUnknownGraphConstraint = (constraint) => {
			switch (constraint.kind) {
				case "history_gap": return `Residual unknown ${constraint.unknown_id} revision history has a gap`;
				case "revision_chain": return `Residual unknown ${constraint.unknown_id} revision chain is broken`;
				case "missing_evidence": return `Residual unknown references missing evidence ${constraint.evidence_id}`;
				case "missing_unknown": return `Residual unknown references missing unknown ${constraint.related_unknown_id}`;
				case "contradicting_evidence": return `Residual unknown ${constraint.unknown_id} retains contradicting evidence`;
				case "resolution_unproven": return `Residual unknown ${constraint.unknown_id} has no qualifying resolution evidence`;
				case "dependency_cycle": return "Residual unknown dependency graph contains a cycle";
			}
		};
		InvalidResidualUnknownGraphError = class extends TypeError {
			constraint;
			constructor(constraint) {
				super(describeResidualUnknownGraphConstraint(constraint));
				this.constraint = constraint;
				this.name = "InvalidResidualUnknownGraphError";
			}
		};
	})))();
}

//#endregion
//#region dist/domain/inputArgumentGuidance.js
var PROCEDURE_OPERATIONS, ADDRESS_OPERATIONS, PATTERN_OPERATIONS, QUERY_OPERATIONS, PROCEDURE_INSTEAD_OF_ADDRESS, ADDRESS_INSTEAD_OF_PROCEDURE, PATTERN_INSTEAD_OF_QUERY, QUERY_INSTEAD_OF_PATTERN, knownArgumentMistakeGuidance, knownArgumentMistakeRemediation, knownViewMistakeGuidance;
function init_inputArgumentGuidance() {
	return (init_inputArgumentGuidance = __esmMin((() => {
		PROCEDURE_OPERATIONS = new Set([
			"analyze_function",
			"annotate_native_function",
			"inspect_native_api",
			"procedure_address",
			"procedure_assembly",
			"procedure_callees",
			"procedure_callers",
			"procedure_info",
			"procedure_pseudo_code",
			"procedure_references",
			"read_function_instructions",
			"trace_native_values"
		]);
		ADDRESS_OPERATIONS = new Set([
			"address_name",
			"address_to_file_offset",
			"comment",
			"get_call_graph",
			"goto_address",
			"inline_comment",
			"inspect_address_context",
			"inspect_native_instruction",
			"next_address",
			"prev_address",
			"read_bytes",
			"resolve_containing_procedure",
			"resolve_native_call_targets",
			"set_address_name",
			"set_bookmark",
			"set_comment",
			"set_inline_comment",
			"unset_bookmark",
			"xrefs"
		]);
		PATTERN_OPERATIONS = new Set([
			"analyze_swift_types",
			"get_objc_classes",
			"search_bytes",
			"search_procedures",
			"search_strings"
		]);
		QUERY_OPERATIONS = new Set(["search_guidance", "trace_feature"]);
		PROCEDURE_INSTEAD_OF_ADDRESS = {
			expected: "procedure",
			message: "Unrecognized argument 'address'; did you mean 'procedure'?",
			remediation: "Use 'procedure' (a procedure name or address) instead of 'address'."
		};
		ADDRESS_INSTEAD_OF_PROCEDURE = {
			expected: "address",
			message: "Unrecognized argument 'procedure'; did you mean 'address'?",
			remediation: "Use 'address' instead of 'procedure'."
		};
		PATTERN_INSTEAD_OF_QUERY = {
			expected: "pattern",
			message: "Unrecognized argument 'query'; did you mean 'pattern'?",
			remediation: "Use 'pattern' instead of 'query'."
		};
		QUERY_INSTEAD_OF_PATTERN = {
			expected: "query",
			message: "Unrecognized argument 'pattern'; did you mean 'query'?",
			remediation: "Use 'query' instead of 'pattern'."
		};
		knownArgumentMistakeGuidance = (operation, argumentName) => {
			if (operation === undefined) return undefined;
			if (argumentName === "address" && PROCEDURE_OPERATIONS.has(operation)) return PROCEDURE_INSTEAD_OF_ADDRESS;
			if (argumentName === "procedure" && ADDRESS_OPERATIONS.has(operation)) return ADDRESS_INSTEAD_OF_PROCEDURE;
			if (argumentName === "query" && PATTERN_OPERATIONS.has(operation)) return PATTERN_INSTEAD_OF_QUERY;
			if (argumentName === "pattern" && QUERY_OPERATIONS.has(operation)) return QUERY_INSTEAD_OF_PATTERN;
			return undefined;
		};
		knownArgumentMistakeRemediation = (operation, issues) => {
			const hints = [];
			const seen = new Set();
			for (const issue of issues) {
				if (issue.reason !== "unknown_argument" || issue.path.length !== 1) continue;
				const key = issue.path[0];
				if (typeof key !== "string") continue;
				const guidance = knownArgumentMistakeGuidance(operation, key);
				if (guidance !== undefined && issue.expected === guidance.expected && !seen.has(guidance.remediation)) {
					seen.add(guidance.remediation);
					hints.push(guidance.remediation);
				}
			}
			return hints.length === 0 ? undefined : hints.join(" ");
		};
		knownViewMistakeGuidance = (operation, input, path) => {
			if (operation !== "inspect_analysis_view") return undefined;
			const isViewProjection = path.length >= 2 && path[path.length - 2] === "view" && path[path.length - 1] === "projection";
			if (!isViewProjection) return undefined;
			const rawView = typeof input === "object" && input !== null ? input.view ?? input.input?.view : undefined;
			if (typeof rawView !== "object" || rawView === null) return undefined;
			const viewRecord = rawView;
			if (viewRecord.kind === "javascript" && viewRecord.collection === "modules" && viewRecord.projection === undefined) {
				return {
					message: "To page modules, use view: { kind: 'page', collection: 'modules' }. For module references, specify projection: 'references'.",
					remediation: "Use view: { kind: 'page', collection: 'modules' } to page modules, or set projection: 'references'."
				};
			}
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/evidenceErrors.js
var EvidenceIntegrityError, AnalysisSnapshotMismatchError, ResourceSnapshotMismatchError, EvidenceReferenceError, EvidenceFileError;
function init_evidenceErrors() {
	return (init_evidenceErrors = __esmMin((() => {
		init_analysisErrorBase();
		EvidenceIntegrityError = class extends AnalysisError {
			_tag = "EvidenceIntegrityError";
			userMessage;
			/** For a two-sided comparison input, the side whose Evidence failed. */
			side;
			/** The first failing location inside that Evidence or its result, when schema-located. */
			issuePath;
			/** The constraint a schema refinement named on that first issue. */
			constraint;
			/** Schema issues after the first, which the message only summarizes. */
			remainingIssueCount;
			constructor(message, options) {
				super(message, options);
				this.userMessage = options?.userMessage;
				this.side = options?.side;
				this.issuePath = options?.issuePath;
				this.constraint = options?.constraint;
				this.remainingIssueCount = options?.remainingIssueCount;
			}
		};
		AnalysisSnapshotMismatchError = class extends EvidenceIntegrityError {
			bindingMismatch;
			constructor(message, bindingMismatch) {
				super(message);
				this.bindingMismatch = bindingMismatch;
			}
		};
		ResourceSnapshotMismatchError = class extends AnalysisSnapshotMismatchError {
			operation;
			constructor(operation) {
				super("Analysis snapshots do not apply to a resource-only app session because it has no executable identity or replay binding.");
				this.operation = operation;
			}
		};
		EvidenceReferenceError = class extends EvidenceIntegrityError {
			evidenceId;
			reason;
			expected;
			actual;
			/** Set when the consuming workflow requires retained closure. */
			referenceScope;
			constructor(evidenceId, reason, options) {
				super(`Evidence reference ${reason}: ${evidenceId}`, options);
				this.evidenceId = evidenceId;
				this.reason = reason;
				this.expected = options.expected;
				this.actual = options.actual;
				this.referenceScope = options.referenceScope;
			}
		};
		EvidenceFileError = class extends AnalysisError {
			operation;
			reason;
			_tag = "EvidenceFileError";
			userMessage;
			/** Caller-selected path that failed, resolved against the working directory. */
			path;
			/** Present only when a write committed before cleanup failed. */
			published;
			/** Schema issues relative to the selected file's JSON root, never the request envelope. */
			contentIssues;
			systemCode;
			/** For `wrong-kind`: the recognized kind the file holds instead, when known. */
			detectedKind;
			constructor(operation, reason, options) {
				super(`Evidence bundle ${operation} failed: ${reason}`, options);
				this.operation = operation;
				this.reason = reason;
				this.path = options?.path;
				this.published = options?.published;
				this.userMessage = options?.userMessage;
				this.contentIssues = options?.contentIssues;
				this.systemCode = options?.systemCode;
				this.detectedKind = options?.detectedKind;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/unknownRegistryError.js
var UnknownRegistryError;
function init_unknownRegistryError() {
	return (init_unknownRegistryError = __esmMin((() => {
		init_analysisErrorBase();
		UnknownRegistryError = class extends AnalysisError {
			_tag = "UnknownRegistryError";
			constraint;
			reason;
			constructor(failure, options) {
				const reason = typeof failure === "string" ? failure : failure.kind === "history_gap" || failure.kind === "revision_chain" ? "integrity" : "constraint";
				super(`Residual unknown registry mutation failed: ${reason}`, options);
				this.reason = reason;
				this.constraint = typeof failure === "string" ? undefined : failure;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/digests.js
var SHA256_PATTERN, digestSchema, prefixedDigestSchema, isDigest;
function init_digests() {
	return (init_digests = __esmMin((() => {
		SHA256_PATTERN = /^[a-f0-9]{64}$/u;
		digestSchema = z.string().regex(SHA256_PATTERN);
		prefixedDigestSchema = (prefix) => z.string().regex(new RegExp(`^${prefix}_[a-f0-9]{64}$`, "u"), `Expected a ${prefix}_ prefixed lowercase sha256 digest`);
		isDigest = (value) => typeof value === "string" && SHA256_PATTERN.test(value);
	})))();
}

//#endregion
//#region dist/domain/virtualFileMapping.js
var resolveMappedFileOffset, spansOverlap$1;
function init_virtualFileMapping() {
	return (init_virtualFileMapping = __esmMin((() => {
		init_result();
		resolveMappedFileOffset = (mappings, address, size, zeroFills = []) => {
			if (!Number.isSafeInteger(size) || size < 0) return err({
				reason: "invalid-size",
				message: "Virtual span size is invalid"
			});
			const spanBytes = BigInt(size);
			const end = address + spanBytes;
			const overlapsZeroFill = () => zeroFills.some(({ address: start, size: bytes }) => spansOverlap$1(address, spanBytes, start, bytes));
			const unmapped = () => err({
				reason: "unmapped",
				message: "Virtual address or string range is not file mapped",
				overlapsZeroFill: overlapsZeroFill()
			});
			let found;
			const covered = [];
			let whollyCovered = size === 0;
			for (const mapping of mappings) {
				const mappingEnd = mapping.address + BigInt(mapping.size);
				const start = address > mapping.address ? address : mapping.address;
				const overlapEnd = end < mappingEnd ? end : mappingEnd;
				if (size === 0 ? address < mapping.address || address > mappingEnd : start >= overlapEnd) continue;
				const origin = mapping.offset + Number(address - mapping.address);
				if (found !== undefined && found !== origin) return err({
					reason: "ambiguous",
					message: "Virtual span has ambiguous or noncontiguous file mappings"
				});
				found = origin;
				if (start === address && overlapEnd === end) whollyCovered = true;
				else if (!whollyCovered) covered.push({
					start,
					end: overlapEnd
				});
			}
			if (found === undefined) return unmapped();
			if (!whollyCovered) {
				covered.sort((left, right) => left.start < right.start ? -1 : left.start > right.start ? 1 : 0);
				let cursor = address;
				for (const span of covered) {
					if (span.start > cursor) return unmapped();
					if (span.end > cursor) cursor = span.end;
				}
				if (cursor < end) return unmapped();
			}
			if (overlapsZeroFill()) return err({
				reason: "ambiguous",
				message: "Virtual address has ambiguous file and zero-fill mappings"
			});
			return ok(found);
		};
		spansOverlap$1 = (address, size, otherAddress, otherSize) => size > 0n && otherSize > 0n && address < otherAddress + otherSize && otherAddress < address + size;
	})))();
}

//#endregion
//#region dist/domain/binaryContainer.js
var BinaryFormatFailure, BinaryMappingFailure, BinaryResourceFailure, binaryResourceCeiling, binaryResourceAllowance, STRING_READ_LIMIT, binaryStringReadLimit, isBinaryStringReadLimit, isBinaryFormatOrStringLimitFailure, imageFileMappings, BinaryReader, declaredFileRange, mappedFileOffset, lastAtOrBelow, prefixReach, createFileMappingIndex, readMappedCString, readMappedString, isZeroFilledSpan, spansOverlap;
function init_binaryContainer() {
	return (init_binaryContainer = __esmMin((() => {
		init_virtualFileMapping();
		init_parseFailure();
		BinaryFormatFailure = class extends ParseFailureError {
			constructor(kind, message, facts = {}) {
				const { undecodedContent = false, format = "native-binary", ...at } = facts;
				super(kind === "unsupported" ? {
					kind,
					format,
					detail: message,
					undecodedContent,
					...at
				} : {
					kind,
					format,
					detail: message,
					...at
				});
				this.name = "BinaryFormatFailure";
			}
			/** The image holds the metadata, in a form this reader cannot decode. */
			get undecodedContent() {
				return this.failure.kind === "unsupported" && this.failure.undecodedContent;
			}
		};
		BinaryMappingFailure = class extends BinaryFormatFailure {
			reason;
			constructor(reason, message) {
				super("malformed", message);
				this.reason = reason;
			}
		};
		BinaryResourceFailure = class extends ParseFailureError {
			boundary;
			maximum_bytes;
			unit;
			/**
			* @param maximum_bytes The exceeded maximum, in `unit`. Despite its name,
			*   some producers count entries or values; `unit` says which, and is
			*   undefined when the producer has not named it.
			*/
			constructor(boundary, maximum_bytes, message, allowance = boundary, unit) {
				super({
					kind: "limit",
					format: "native-binary",
					detail: message,
					limit: {
						name: allowance,
						maximum: maximum_bytes
					}
				});
				this.boundary = boundary;
				this.maximum_bytes = maximum_bytes;
				this.unit = unit;
				this.name = "BinaryResourceFailure";
			}
		};
		binaryResourceCeiling = (failure) => ({
			limit: failure.maximum_bytes,
			...failure.unit === undefined ? {} : { unit: failure.unit }
		});
		binaryResourceAllowance = (failure, allowances) => allowances.find((allowance) => allowance === failure.failure.limit.name) ?? null;
		STRING_READ_LIMIT = "string-read-bytes";
		binaryStringReadLimit = (maximumBytes) => decodeLimit("native-binary", `String termination was not established within its ${String(maximumBytes)}-byte read allowance`, {
			name: STRING_READ_LIMIT,
			maximum: maximumBytes
		});
		isBinaryStringReadLimit = (cause) => cause instanceof ParseFailureError && cause.failure.kind === "limit" && cause.failure.limit.name === STRING_READ_LIMIT;
		isBinaryFormatOrStringLimitFailure = (cause) => cause instanceof BinaryFormatFailure || isBinaryStringReadLimit(cause);
		imageFileMappings = (container) => container.pe_header_mapping === undefined ? container.mappings : [container.pe_header_mapping, ...container.mappings];
		BinaryReader = class {
			bytes;
			little;
			format;
			constructor(bytes, little, format) {
				this.bytes = bytes;
				this.little = little;
				this.format = format;
			}
			#checkRange(offset, size, label) {
				if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || offset < 0 || size < 0 || offset > this.bytes.length) throw new BinaryFormatFailure("malformed", `${label} range is truncated or outside the file`, {
					format: this.format,
					field: label,
					...Number.isSafeInteger(offset) ? { offset } : {}
				});
				if (size > this.bytes.length - offset) throw new BinaryFormatFailure("truncated", `${label} range is truncated or outside the file`, {
					format: this.format,
					offset,
					field: label
				});
			}
			range(offset, size, label) {
				this.#checkRange(offset, size, label);
				return this.bytes.subarray(offset, offset + size);
			}
			u8(offset) {
				this.#checkRange(offset, 1, "8-bit field");
				return this.bytes.readUInt8(offset);
			}
			i8(offset) {
				this.#checkRange(offset, 1, "8-bit field");
				return this.bytes.readInt8(offset);
			}
			u16(offset) {
				this.#checkRange(offset, 2, "16-bit field");
				return this.little ? this.bytes.readUInt16LE(offset) : this.bytes.readUInt16BE(offset);
			}
			i16(offset) {
				this.#checkRange(offset, 2, "16-bit field");
				return this.little ? this.bytes.readInt16LE(offset) : this.bytes.readInt16BE(offset);
			}
			u32(offset) {
				this.#checkRange(offset, 4, "32-bit field");
				return this.little ? this.bytes.readUInt32LE(offset) : this.bytes.readUInt32BE(offset);
			}
			i32(offset) {
				this.#checkRange(offset, 4, "32-bit field");
				return this.little ? this.bytes.readInt32LE(offset) : this.bytes.readInt32BE(offset);
			}
			i64(offset) {
				this.#checkRange(offset, 8, "64-bit field");
				return this.little ? this.bytes.readBigInt64LE(offset) : this.bytes.readBigInt64BE(offset);
			}
			f32(offset) {
				this.#checkRange(offset, 4, "32-bit field");
				return this.little ? this.bytes.readFloatLE(offset) : this.bytes.readFloatBE(offset);
			}
			f64(offset) {
				this.#checkRange(offset, 8, "64-bit field");
				return this.little ? this.bytes.readDoubleLE(offset) : this.bytes.readDoubleBE(offset);
			}
			word(offset, bits) {
				if (bits === 32) return BigInt(this.u32(offset));
				this.#checkRange(offset, 8, "64-bit field");
				return this.little ? this.bytes.readBigUInt64LE(offset) : this.bytes.readBigUInt64BE(offset);
			}
			fileRange(offset, size, label) {
				const length = BigInt(this.bytes.length);
				if (offset < 0n || offset > length) throw new BinaryFormatFailure("malformed", `${label} range is outside the file`, {
					format: this.format,
					field: label,
					...offset >= BigInt(Number.MIN_SAFE_INTEGER) && offset <= BigInt(Number.MAX_SAFE_INTEGER) ? { offset: Number(offset) } : {}
				});
				if (size > length - offset) throw new BinaryFormatFailure("truncated", `${label} range is outside the file`, {
					format: this.format,
					offset: Number(offset),
					field: label
				});
				const result = {
					address: 0n,
					offset: Number(offset),
					size: Number(size)
				};
				this.range(result.offset, result.size, label);
				return result;
			}
			table(offset, count, width, label) {
				const size = BigInt(count) * BigInt(width);
				const range = this.fileRange(offset, size, label);
				if (size > 16n * 1024n * 1024n) throw new BinaryResourceFailure("structure", 16 * 1024 * 1024, `${label} exceeds the 16 MiB structural decoding budget`, "structure", "bytes");
				return range.offset;
			}
		};
		declaredFileRange = (fileBytes, offset, size) => {
			if (offset < 0n || size < 0n || offset > BigInt(Number.MAX_SAFE_INTEGER) || size > BigInt(Number.MAX_SAFE_INTEGER) || offset > BigInt(fileBytes) || size > BigInt(fileBytes) - offset) return {
				offset: 0,
				size: 0,
				file_backed: false
			};
			return {
				offset: Number(offset),
				size: Number(size),
				file_backed: size > 0n
			};
		};
		mappedFileOffset = (mappings, address, size, zeroFills = []) => {
			const mapped = resolveMappedFileOffset(mappings, address, size, zeroFills);
			if (mapped.ok) return mapped.value;
			const { reason, message } = mapped.error;
			if (reason === "invalid-size") throw new BinaryFormatFailure("malformed", message);
			throw new BinaryMappingFailure(reason, message);
		};
		lastAtOrBelow = (sorted, value) => {
			let low = 0;
			let high = sorted.length;
			while (low < high) {
				const middle = low + high >>> 1;
				if (sorted[middle] <= value) low = middle + 1;
				else high = middle;
			}
			return low - 1;
		};
		prefixReach = (spans) => {
			const sorted = [...spans].sort((left, right) => left.start < right.start ? -1 : left.start > right.start ? 1 : 0);
			const starts = [];
			const reach = [];
			let furthest = -1n;
			for (const span of sorted) {
				if (span.end > furthest) furthest = span.end;
				starts.push(span.start);
				reach.push(furthest);
			}
			return {
				starts,
				reach
			};
		};
		createFileMappingIndex = (mappings, zeroFills = []) => {
			const backed = mappings.filter((mapping) => mapping.size > 0).map((mapping) => ({
				start: mapping.address,
				end: mapping.address + BigInt(mapping.size),
				translation: BigInt(mapping.offset) - mapping.address
			}));
			const zeroFilled = prefixReach(zeroFills.filter((zeroFill) => zeroFill.size > 0n).map((zeroFill) => ({
				start: zeroFill.address,
				end: zeroFill.address + zeroFill.size
			})));
			const events = new Map();
			const event = (at) => {
				let entry = events.get(at);
				if (entry === undefined) {
					entry = {
						add: [],
						remove: []
					};
					events.set(at, entry);
				}
				return entry;
			};
			for (const span of backed) {
				event(span.start).add.push(span.translation);
				event(span.end).remove.push(span.translation);
			}
			const boundaries = [...events.keys()].sort((left, right) => left < right ? -1 : left > right ? 1 : 0);
			const active = new Map();
			const translations = [];
			for (const boundary of boundaries) {
				const entry = events.get(boundary);
				for (const translation of entry?.remove ?? []) {
					const count = (active.get(translation) ?? 0) - 1;
					if (count === 0) active.delete(translation);
					else active.set(translation, count);
				}
				for (const translation of entry?.add ?? []) active.set(translation, (active.get(translation) ?? 0) + 1);
				translations.push(active.size === 0 ? undefined : active.size === 1 ? active.keys().next().value : null);
			}
			const runEnd = boundaries.map(() => 0n);
			for (let index = boundaries.length - 1; index >= 0; index--) {
				const next = boundaries[index + 1];
				const translation = translations[index];
				runEnd[index] = next === undefined ? boundaries[index] : translation !== null && translation !== undefined && translations[index + 1] === translation ? runEnd[index + 1] : next;
			}
			const ambiguousPrefix = [0];
			const previousMapped = [];
			const nextMapped = [];
			const translationRuns = [];
			let previous = -1;
			let run = 0;
			let previousTranslation;
			for (const [index, translation] of translations.entries()) {
				ambiguousPrefix.push((ambiguousPrefix[index] ?? 0) + (translation === null ? 1 : 0));
				if (typeof translation === "bigint") {
					if (translation !== previousTranslation) run += 1;
					previousTranslation = translation;
					previous = index;
				}
				previousMapped.push(previous);
				translationRuns.push(run);
			}
			let next = translations.length;
			for (let index = translations.length - 1; index >= 0; index--) {
				if (typeof translations[index] === "bigint") next = index;
				nextMapped[index] = next;
			}
			const offset = (address, size) => {
				if (!Number.isSafeInteger(size) || size <= 0) return mappedFileOffset(mappings, address, size, zeroFills);
				const end = address + BigInt(size);
				const interval = lastAtOrBelow(boundaries, address);
				const lower = Math.max(0, interval);
				const upper = lastAtOrBelow(boundaries, end - 1n);
				const first = nextMapped[lower] ?? translations.length;
				const last = previousMapped[upper] ?? -1;
				if ((ambiguousPrefix[upper + 1] ?? 0) - (ambiguousPrefix[lower] ?? 0) > 0 || first <= upper && last >= lower && translationRuns[first] !== translationRuns[last]) throw new BinaryMappingFailure("ambiguous", "Virtual span has ambiguous or noncontiguous file mappings");
				const translation = translations[interval];
				if (typeof translation !== "bigint" || runEnd[interval] < end) throw new BinaryMappingFailure("unmapped", "Virtual address or string range is not file mapped");
				const zeroFill = lastAtOrBelow(zeroFilled.starts, end - 1n);
				if (zeroFill >= 0 && zeroFilled.reach[zeroFill] > address) throw new BinaryMappingFailure("ambiguous", "Virtual address has ambiguous file and zero-fill mappings");
				return Number(address + translation);
			};
			const access = {
				offset,
				mappingAt: (address) => {
					const start = offset(address, 1);
					const interval = lastAtOrBelow(boundaries, address);
					return {
						address,
						offset: start,
						size: Number(runEnd[interval] - address)
					};
				}
			};
			return {
				offset,
				readCString: (bytes, address, maximumBytes) => readMappedString(bytes, access, address, maximumBytes)
			};
		};
		readMappedCString = (bytes, mappings, address, maximumBytes, zeroFills) => {
			return readMappedString(bytes, {
				mappingAt: (cursor) => mappings.find((range) => range.address <= cursor && cursor < range.address + BigInt(range.size)),
				offset: (cursor, size) => mappedFileOffset(mappings, cursor, size, zeroFills)
			}, address, maximumBytes);
		};
		readMappedString = (bytes, access, address, maximumBytes) => {
			const chunks = [];
			let length = 0;
			while (length <= maximumBytes) {
				const cursor = address + BigInt(length);
				const mapping = access.mappingAt(cursor);
				if (mapping === undefined) {
					access.offset(cursor, 1);
					throw new BinaryMappingFailure("unmapped", "String range is not file mapped");
				}
				const size = Math.min(maximumBytes + 1 - length, Number(mapping.address + BigInt(mapping.size) - cursor));
				const offset = mapping.offset + Number(cursor - mapping.address);
				const chunk = bytes.subarray(offset, offset + size);
				const terminator = chunk.indexOf(0);
				const consumed = terminator < 0 ? size : terminator + 1;
				access.offset(cursor, consumed);
				if (terminator >= 0) {
					const tail = chunk.subarray(0, terminator);
					if (chunks.length === 0) return tail;
					chunks.push(tail);
					return Buffer.concat(chunks, length + terminator);
				}
				chunks.push(chunk);
				length += size;
			}
			throw binaryStringReadLimit(maximumBytes);
		};
		isZeroFilledSpan = (mappings, zeroFills, address, size) => {
			const bytes = BigInt(size);
			if (!zeroFills.some((mapping) => address >= mapping.address && address + bytes <= mapping.address + mapping.size)) return false;
			for (const mapping of mappings) {
				if (spansOverlap(address, bytes, mapping.address, BigInt(mapping.size))) throw new BinaryMappingFailure("ambiguous", "Virtual address has ambiguous file and zero-fill mappings");
			}
			return true;
		};
		spansOverlap = (address, size, otherAddress, otherSize) => size > 0n && otherSize > 0n && address < otherAddress + otherSize && otherAddress < address + size;
	})))();
}

//#endregion
//#region dist/domain/zip/zipLocalHeader.js
var ZIP_LOCAL_HEADER_BYTES, ZIP_LOCAL_HEADER_SIGNATURE, zipLocalDataOffset;
function init_zipLocalHeader() {
	return (init_zipLocalHeader = __esmMin((() => {
		ZIP_LOCAL_HEADER_BYTES = 30;
		ZIP_LOCAL_HEADER_SIGNATURE = 67324752;
		zipLocalDataOffset = (header, offset) => header.bytes.length >= 30 && header.u32(0) === 67324752 ? offset + 30 + header.u16(26) + header.u16(28) : undefined;
	})))();
}

//#endregion
//#region dist/domain/zipEndOfCentralDirectory.js
/**
* Observe complete classic records whose declared comment ends this window,
* latest first. Candidate recognition does not establish directory validity,
* ambiguity policy, disk support, or the meaning of Zip64 sentinel fields.
*/
function* zipEndOfCentralDirectoryCandidates(bytes) {
	const earliest = Math.max(0, bytes.byteLength - 22 - ZIP_MAX_COMMENT_BYTES);
	const tail = Buffer.from(bytes.buffer, bytes.byteOffset + earliest, bytes.byteLength - earliest);
	const reader = new BinaryReader(tail, true, "zip");
	for (let searchFrom = tail.length - 22; searchFrom >= 0;) {
		const offset = tail.lastIndexOf(EOCD_SIGNATURE, searchFrom);
		if (offset < 0) break;
		searchFrom = offset - 1;
		const commentLength = reader.u16(offset + 20);
		if (offset + 22 + commentLength !== tail.length) continue;
		yield {
			offset: earliest + offset,
			disk: reader.u16(offset + ZIP_CLASSIC_DISK_OFFSETS.disk),
			directoryDisk: reader.u16(offset + ZIP_CLASSIC_DISK_OFFSETS.directoryDisk),
			entriesOnDisk: reader.u16(offset + 8),
			totalEntries: reader.u16(offset + 10),
			directorySize: reader.u32(offset + 12),
			directoryOffset: reader.u32(offset + 16),
			commentLength
		};
	}
}
var ZIP_EOCD_BYTES, ZIP_MAX_COMMENT_BYTES, ZIP_CLASSIC_DIRECTORY_LIMITS, ZIP64_END, ZIP64_LOCATOR, readZip64Locator, readZip64DirectoryRecord, EOCD_SIGNATURE, ZIP_CLASSIC_DISK_OFFSETS, ZIP_SINGLE_VOLUME, zipEndUsesSingleVolume, zip64LocatorUsesSingleVolume, zip64EndUsesSingleVolume;
function init_zipEndOfCentralDirectory() {
	return (init_zipEndOfCentralDirectory = __esmMin((() => {
		init_binaryContainer();
		init_result();
		ZIP_EOCD_BYTES = 22;
		ZIP_MAX_COMMENT_BYTES = 65535;
		ZIP_CLASSIC_DIRECTORY_LIMITS = {
			count: 65535,
			size: 4294967295,
			offset: 4294967295
		};
		ZIP64_END = {
			signature: 101075792,
			fixedBytes: 56,
			sizePrefixBytes: 12,
			sizeOffset: 4,
			diskOffset: 16,
			directoryDiskOffset: 20,
			entriesOnDiskOffset: 24,
			totalEntriesOffset: 32,
			directorySizeOffset: 40,
			directoryOffset: 48
		};
		ZIP64_LOCATOR = {
			signature: 117853008,
			bytes: 20,
			diskOffset: 4,
			recordOffset: 8,
			totalDisksOffset: 16
		};
		readZip64Locator = (reader, offset) => {
			if (offset < 0 || offset + ZIP64_LOCATOR.bytes > reader.bytes.length || reader.u32(offset) !== ZIP64_LOCATOR.signature) return undefined;
			return {
				disk: reader.u32(offset + ZIP64_LOCATOR.diskOffset),
				totalDisks: reader.u32(offset + ZIP64_LOCATOR.totalDisksOffset),
				recordOffset: reader.word(offset + ZIP64_LOCATOR.recordOffset, 64)
			};
		};
		readZip64DirectoryRecord = (reader, offset, limit) => {
			const room = Math.min(limit, reader.bytes.length) - offset;
			if (offset < 0 || room < ZIP64_END.fixedBytes) return err("fixed-fields");
			if (reader.u32(offset) !== ZIP64_END.signature) return err("signature");
			const bodyBytes = reader.word(offset + ZIP64_END.sizeOffset, 64);
			if (bodyBytes < BigInt(ZIP64_END.fixedBytes - ZIP64_END.sizePrefixBytes) || bodyBytes > BigInt(room - ZIP64_END.sizePrefixBytes)) return err("size");
			return ok({
				end: offset + ZIP64_END.sizePrefixBytes + Number(bodyBytes),
				disk: reader.u32(offset + ZIP64_END.diskOffset),
				directoryDisk: reader.u32(offset + ZIP64_END.directoryDiskOffset),
				entriesOnDisk: reader.word(offset + ZIP64_END.entriesOnDiskOffset, 64),
				totalEntries: reader.word(offset + ZIP64_END.totalEntriesOffset, 64),
				directorySize: reader.word(offset + ZIP64_END.directorySizeOffset, 64),
				directoryOffset: reader.word(offset + ZIP64_END.directoryOffset, 64)
			});
		};
		EOCD_SIGNATURE = Buffer.from([
			80,
			75,
			5,
			6
		]);
		ZIP_CLASSIC_DISK_OFFSETS = {
			disk: 4,
			directoryDisk: 6
		};
		ZIP_SINGLE_VOLUME = {
			classic: [0],
			zip64Classic: [0, 65535],
			zip64Locator: [[ZIP64_LOCATOR.diskOffset, 0], [ZIP64_LOCATOR.totalDisksOffset, 1]],
			zip64End: [[ZIP64_END.diskOffset, 0], [ZIP64_END.directoryDiskOffset, 0]]
		};
		zipEndUsesSingleVolume = ({ disk, directoryDisk }, layout = "classic") => {
			const allowed = ZIP_SINGLE_VOLUME[layout];
			return allowed.includes(disk) && allowed.includes(directoryDisk);
		};
		zip64LocatorUsesSingleVolume = ({ disk, totalDisks }) => disk === ZIP_SINGLE_VOLUME.zip64Locator[0][1] && totalDisks === ZIP_SINGLE_VOLUME.zip64Locator[1][1];
		zip64EndUsesSingleVolume = ({ disk, directoryDisk }) => disk === ZIP_SINGLE_VOLUME.zip64End[0][1] && directoryDisk === ZIP_SINGLE_VOLUME.zip64End[1][1];
	})))();
}

//#endregion
//#region dist/domain/canonicalDigest.js
var digestCanonicalValue, CanonicalDigestError, emitCanonical;
function init_canonicalDigest() {
	return (init_canonicalDigest = __esmMin((() => {
		init_sha256Hex();
		digestCanonicalValue = (value, context = "Comparison") => {
			if (typeof value === "number" && !Number.isFinite(value)) throw new CanonicalDigestError(Number.isNaN(value) ? "nan" : "infinity");
			if (value === null || typeof value !== "object") {
				const encoded = JSON.stringify(value);
				if (encoded === undefined) throw new TypeError(`${context} could not canonicalize data`);
				return sha256Hex(encoded);
			}
			const hash = createHash("sha256");
			let buffered = "";
			const flush = () => {
				if (buffered.length === 0) return;
				hash.update(buffered);
				buffered = "";
			};
			const emit = (part) => {
				if (part.length >= 8192) {
					flush();
					hash.update(part);
					return;
				}
				buffered += part;
				if (buffered.length >= 8192) flush();
			};
			const encoded = emitCanonical(value, emit, new Set());
			if (!encoded) throw new TypeError(`${context} could not canonicalize data`);
			flush();
			return hash.digest("hex");
		};
		CanonicalDigestError = class extends Error {
			code;
			_tag = "CanonicalDigestError";
			constructor(code) {
				super(code);
				this.code = code;
				this.name = "CanonicalDigestError";
			}
		};
		emitCanonical = (value, emit, ancestors) => {
			if (typeof value === "number" && !Number.isFinite(value)) throw new CanonicalDigestError(Number.isNaN(value) ? "nan" : "infinity");
			if (value === null || typeof value !== "object") {
				const encoded = JSON.stringify(value);
				if (encoded === undefined) return false;
				emit(encoded);
				return true;
			}
			if (ancestors.has(value)) throw new CanonicalDigestError("circular");
			ancestors.add(value);
			try {
				if ("toJSON" in value && typeof value.toJSON === "function") {
					const normalized = value.toJSON();
					return emitCanonical(normalized, emit, ancestors);
				}
				if (Array.isArray(value)) {
					emit("[");
					const length = value.length;
					for (let index = 0; index < length; index += 1) {
						if (index > 0) emit(",");
						if (!(index in value)) continue;
						const item = value[index];
						emitCanonical(item === undefined || typeof item === "symbol" ? null : item, emit, ancestors);
					}
					emit("]");
				} else {
					emit("{");
					let first = true;
					const record = value;
					const keys = Object.keys(record);
					if (keys.length === 2) {
						if (keys[0] > keys[1]) {
							const firstKey = keys[0];
							keys[0] = keys[1];
							keys[1] = firstKey;
						}
					} else if (keys.length > 2) {
						keys.sort();
					}
					for (let index = 0; index < keys.length; index += 1) {
						const key = keys[index];
						if (record[key] === undefined || typeof record[key] === "symbol") continue;
						const item = record[key];
						if (!first) emit(",");
						first = false;
						emit(JSON.stringify(key));
						emit(":");
						if (!emitCanonical(item, emit, ancestors)) emit("undefined");
					}
					emit("}");
				}
				return true;
			} finally {
				ancestors.delete(value);
			}
		};
	})))();
}

//#endregion
export { knownViewMistakeGuidance as $, init_binaryContainer as A, isDigest as B, BinaryResourceFailure as C, createFileMappingIndex as D, binaryStringReadLimit as E, readMappedCString as F, EvidenceFileError as G, UnknownRegistryError as H, init_virtualFileMapping as I, ResourceSnapshotMismatchError as J, EvidenceIntegrityError as K, resolveMappedFileOffset as L, isBinaryStringReadLimit as M, isZeroFilledSpan as N, declaredFileRange as O, mappedFileOffset as P, knownArgumentMistakeRemediation as Q, digestSchema as R, BinaryReader as S, binaryResourceCeiling as T, init_unknownRegistryError as U, prefixedDigestSchema as V, AnalysisSnapshotMismatchError as W, init_inputArgumentGuidance as X, init_evidenceErrors as Y, knownArgumentMistakeGuidance as Z, ZIP_LOCAL_HEADER_SIGNATURE as _, ZIP64_LOCATOR as a, BinaryFormatFailure as b, ZIP_MAX_COMMENT_BYTES as c, readZip64DirectoryRecord as d, InvalidResidualUnknownGraphError as et, readZip64Locator as f, zipEndUsesSingleVolume as g, zipEndOfCentralDirectoryCandidates as h, ZIP64_END as i, sha256Hex as it, isBinaryFormatOrStringLimitFailure as j, imageFileMappings as k, ZIP_SINGLE_VOLUME as l, zip64LocatorUsesSingleVolume as m, digestCanonicalValue as n, init_residualUnknownGraphError as nt, ZIP_CLASSIC_DIRECTORY_LIMITS as o, zip64EndUsesSingleVolume as p, EvidenceReferenceError as q, init_canonicalDigest as r, init_sha256Hex as rt, ZIP_CLASSIC_DISK_OFFSETS as s, CanonicalDigestError as t, describeResidualUnknownGraphConstraint as tt, init_zipEndOfCentralDirectory as u, init_zipLocalHeader as v, binaryResourceAllowance as w, BinaryMappingFailure as x, zipLocalDataOffset as y, init_digests as z };