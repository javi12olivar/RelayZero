import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { artifactIntegrityPairOf, init_artifactIntegrity, init_jsonValue, init_sha256Hex, jsonValueSchema, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { init_safeJson, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, analysisErrorUserMessage, childFailureDiagnostics, composedCallerGuidance, init_analysisErrorPresentation, init_analysisErrorProjection, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { posix } from "node:path";
import { z } from "zod";
import { constants } from "node:buffer";
import { createHash } from "node:crypto";
import { isSafeNumber } from "lossless-json";

//#region dist/domain/jsonDuplicateMember.js
function parseJsonWithDuplicatePolicy(text, policy, read) {
	const reviver = typeof read === "function" ? read : undefined;
	const observation = typeof read === "object" ? read : undefined;
	let value;
	try {
		value = JSON.parse(text, reviver);
	} catch (cause) {
		return {
			ok: false,
			cause
		};
	}
	if (policy === "last-wins") return {
		ok: true,
		value
	};
	const members = observeJsonMembers(text, observation === undefined ? undefined : {
		...observation,
		root: value
	});
	if (members.duplicate !== undefined) return {
		ok: false,
		duplicate: members.duplicate
	};
	return members.firstObjectMember === undefined ? {
		ok: true,
		value
	} : {
		ok: true,
		value,
		firstObjectMember: members.firstObjectMember
	};
}
var QUOTE, BACKSLASH, parseJsonStringLiteral, parseLastWinsJson, objectRecord, decimalMemberPrefix, mayHaveDecimalMember, decimalMemberValue, JsonNumberSourceCursor, findDuplicateJsonMember, observeJsonMembers;
function init_jsonDuplicateMember() {
	return (init_jsonDuplicateMember = __esmMin((() => {
		QUOTE = 34;
		BACKSLASH = 92;
		parseJsonStringLiteral = (raw) => JSON.parse(raw);
		parseLastWinsJson = (text, reviver) => JSON.parse(text, reviver);
		objectRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value) ? value : undefined;
		decimalMemberPrefix = String.raw`:[\t\r\n ]*-?\d+[.Ee]`;
		mayHaveDecimalMember = new RegExp(decimalMemberPrefix, "u");
		decimalMemberValue = /[\t\r\n ]*:[\t\r\n ]*(-?\d+(?:\.\d+(?:[Ee][+-]?\d+)?|[Ee][+-]?\d+))/y;
		JsonNumberSourceCursor = class {
			observation;
			#objects = [];
			#next;
			constructor(observation) {
				this.observation = observation;
				this.#next = objectRecord(observation.root);
			}
			enter(object) {
				this.#objects.push(object ? this.#next : undefined);
				this.#next = undefined;
			}
			leave() {
				this.#objects.pop();
			}
			member(name, source, end) {
				const owner = this.#objects.at(-1);
				if (owner === undefined) return;
				const value = owner[name];
				this.#next = objectRecord(value);
				if (name !== this.observation.name || typeof value !== "number") return;
				decimalMemberValue.lastIndex = end;
				const raw = decimalMemberValue.exec(source)?.[1];
				if (raw !== undefined) this.observation.read(owner, value, raw);
			}
		};
		findDuplicateJsonMember = (text) => observeJsonMembers(text).duplicate;
		observeJsonMembers = (text, observation) => {
			const cursor = observation !== undefined && mayHaveDecimalMember.test(text) ? new JsonNumberSourceCursor(observation) : undefined;
			const open = [];
			let expectName = false;
			let firstObjectMember;
			for (let index = 0; index < text.length; index++) {
				const code = text.charCodeAt(index);
				if (code === QUOTE) {
					const start = index;
					const shortEnd = start + 32;
					for (index++; index < shortEnd && text.charCodeAt(index) !== QUOTE; index++) if (text.charCodeAt(index) === BACKSLASH) index++;
					if (index >= shortEnd) {
						let quote = text.indexOf("\"", index);
						while (quote >= 0) {
							let escapeStart = quote;
							while (escapeStart > index && text.charCodeAt(escapeStart - 1) === BACKSLASH) escapeStart--;
							if ((quote - escapeStart) % 2 === 0) break;
							index = quote + 1;
							quote = text.indexOf("\"", index);
						}
						index = quote < 0 ? text.length : quote;
					}
					if (!expectName) continue;
					expectName = false;
					const names = open.at(-1);
					if (names === null || names === undefined) continue;
					const raw = text.slice(start, index + 1);
					const name = raw.includes("\\") ? JSON.parse(raw) : raw.slice(1, -1);
					if (open.length === 1) firstObjectMember ??= name;
					if (names.has(name)) return {
						firstObjectMember,
						duplicate: {
							name,
							offset: start
						}
					};
					names.add(name);
					cursor?.member(name, text, index + 1);
					continue;
				}
				switch (text[index]) {
					case "{":
						cursor?.enter(true);
						open.push(new Set());
						expectName = true;
						break;
					case "[":
						cursor?.enter(false);
						open.push(null);
						break;
					case "}":
					case "]":
						cursor?.leave();
						open.pop();
						expectName = false;
						break;
					case ",":
						expectName = open.at(-1) instanceof Set;
						break;
					default: break;
				}
			}
			return {
				firstObjectMember,
				duplicate: undefined
			};
		};
	})))();
}

//#endregion
//#region dist/domain/exactJsonNumber.js
var isExactJsonNumber, parseExactJson;
function init_exactJsonNumber() {
	return (init_exactJsonNumber = __esmMin((() => {
		init_jsonValue();
		init_safeJson();
		isExactJsonNumber = (value, source) => source !== undefined && isSafeNumber(source) && isSafeNumber(String(value)) && !Object.is(value, -0);
		parseExactJson = (text) => {
			const parsed = safeParseJson(text, (_key, value, context) => {
				if (typeof value === "number" && !isExactJsonNumber(value, context?.source)) throw new RangeError("JSON numeric conversion would lose recorded data");
				return value;
			});
			if (!parsed.ok) return undefined;
			const value = jsonValueSchema.safeParse(parsed.value);
			return value.success ? value.data : undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/excerpt.js
var excerptText, ellipsisExcerpt, formattedEllipsisExcerpt, quotedExcerpt, excerptEnd;
function init_excerpt() {
	return (init_excerpt = __esmMin((() => {
		excerptText = (text) => text;
		ellipsisExcerpt = (text, maximum) => text.length <= maximum ? excerptText(text) : excerptText(`${text.slice(0, excerptEnd(text, maximum))}…`);
		formattedEllipsisExcerpt = (text, maximum, format = (prefix) => prefix) => text.length <= maximum ? excerptText(format(text)) : excerptText(`${format(text.slice(0, excerptEnd(text, maximum)))}…`);
		quotedExcerpt = (text, maximum) => text.length <= maximum ? excerptText(JSON.stringify(text)) : excerptText(`${JSON.stringify(text.slice(0, excerptEnd(text, maximum)))}… (${String(text.length)} UTF-16 code units)`);
		excerptEnd = (text, maximum) => maximum > 0 && /[\uD800-\uDBFF]/u.test(text.charAt(maximum - 1)) ? maximum - 1 : Math.max(0, maximum);
	})))();
}

//#endregion
//#region dist/domain/artifactReaderLimits.js
var bytes, count, representedBytes, DEFAULT_BUN_READER_LIMITS, bunReaderLimitsSchema, DEFAULT_DOTNET_BUNDLE_READER_LIMITS, dotnetBundleReaderLimitsSchema, DEFAULT_NODE_SEA_READER_LIMITS, nodeSeaReaderLimitsSchema, DEFAULT_GODOT_READER_LIMITS, godotReaderLimitsSchema, artifactReaderLimitsInputSchema, artifactReaderLimitsSchema, resolveArtifactReaderLimits, artifactReaderLimitMaximum;
function init_artifactReaderLimits() {
	return (init_artifactReaderLimits = __esmMin((() => {
		bytes = z.int().min(1).max(Number.MAX_SAFE_INTEGER);
		count = z.int().min(1).max(2147483647);
		representedBytes = bytes.max(constants.MAX_STRING_LENGTH);
		DEFAULT_BUN_READER_LIMITS = {
			payload_bytes: 256 * 1024 * 1024,
			module_count: 1e5,
			representation_bytes: 256 * 1024 * 1024,
			metadata_read_bytes: 256 * 1024 * 1024,
			recognition_table_bytes: 1024 * 1024,
			recognition_load_command_bytes: 16 * 1024 * 1024,
			path_parts: 256,
			path_nodes: 25e4
		};
		bunReaderLimitsSchema = z.strictObject({
			payload_bytes: bytes,
			module_count: count,
			representation_bytes: representedBytes,
			metadata_read_bytes: bytes,
			recognition_table_bytes: bytes,
			recognition_load_command_bytes: bytes,
			path_parts: count,
			path_nodes: count
		});
		DEFAULT_DOTNET_BUNDLE_READER_LIMITS = {
			metadata_bytes: 16 * 1024 * 1024,
			entry_count: 1e5,
			string_bytes: 64 * 1024,
			path_parts: 256,
			path_nodes: 25e4,
			member_bytes: 512 * 1024 * 1024,
			expanded_bytes: 2 * 1024 * 1024 * 1024
		};
		dotnetBundleReaderLimitsSchema = z.strictObject({
			metadata_bytes: bytes,
			entry_count: count,
			string_bytes: representedBytes,
			path_parts: count,
			path_nodes: count,
			member_bytes: bytes,
			expanded_bytes: bytes
		});
		DEFAULT_NODE_SEA_READER_LIMITS = {
			blob_bytes: 256 * 1024 * 1024,
			asset_count: 1e5,
			asset_name_bytes: 8 * 1024 * 1024,
			argument_count: 4096,
			argument_bytes: 1024 * 1024,
			recognition_header_count: 4096,
			recognition_load_command_bytes: 8 * 1024 * 1024
		};
		nodeSeaReaderLimitsSchema = z.strictObject({
			blob_bytes: bytes,
			asset_count: count,
			asset_name_bytes: bytes,
			argument_count: count,
			argument_bytes: bytes,
			recognition_header_count: count,
			recognition_load_command_bytes: bytes
		});
		DEFAULT_GODOT_READER_LIMITS = { directory_bytes: 64 * 1024 * 1024 };
		godotReaderLimitsSchema = z.strictObject({ directory_bytes: representedBytes });
		artifactReaderLimitsInputSchema = z.strictObject({
			bun: z.strictObject({
				payload_bytes: bunReaderLimitsSchema.shape.payload_bytes.exactOptional(),
				module_count: bunReaderLimitsSchema.shape.module_count.exactOptional(),
				representation_bytes: bunReaderLimitsSchema.shape.representation_bytes.exactOptional(),
				metadata_read_bytes: bunReaderLimitsSchema.shape.metadata_read_bytes.exactOptional(),
				recognition_table_bytes: bunReaderLimitsSchema.shape.recognition_table_bytes.exactOptional(),
				recognition_load_command_bytes: bunReaderLimitsSchema.shape.recognition_load_command_bytes.exactOptional(),
				path_parts: bunReaderLimitsSchema.shape.path_parts.exactOptional(),
				path_nodes: bunReaderLimitsSchema.shape.path_nodes.exactOptional()
			}).exactOptional().describe(`Bun admission; omitted fields use ${JSON.stringify(DEFAULT_BUN_READER_LIMITS)}. Recognition limits precede graph decoding; payload, retained representation and physical metadata-read work are independent.`),
			dotnet_bundle: z.strictObject({
				metadata_bytes: dotnetBundleReaderLimitsSchema.shape.metadata_bytes.exactOptional(),
				entry_count: dotnetBundleReaderLimitsSchema.shape.entry_count.exactOptional(),
				string_bytes: dotnetBundleReaderLimitsSchema.shape.string_bytes.exactOptional(),
				path_parts: dotnetBundleReaderLimitsSchema.shape.path_parts.exactOptional(),
				path_nodes: dotnetBundleReaderLimitsSchema.shape.path_nodes.exactOptional(),
				member_bytes: dotnetBundleReaderLimitsSchema.shape.member_bytes.exactOptional(),
				expanded_bytes: dotnetBundleReaderLimitsSchema.shape.expanded_bytes.exactOptional()
			}).exactOptional().describe(`.NET bundle admission; omitted fields use ${JSON.stringify(DEFAULT_DOTNET_BUNDLE_READER_LIMITS)}. String bytes apply to paths and bundle IDs; member bytes bound stored and expanded members; expanded bytes bound aggregate work.`),
			node_sea: z.strictObject({
				blob_bytes: nodeSeaReaderLimitsSchema.shape.blob_bytes.exactOptional(),
				asset_count: nodeSeaReaderLimitsSchema.shape.asset_count.exactOptional(),
				asset_name_bytes: nodeSeaReaderLimitsSchema.shape.asset_name_bytes.exactOptional(),
				argument_count: nodeSeaReaderLimitsSchema.shape.argument_count.exactOptional(),
				argument_bytes: nodeSeaReaderLimitsSchema.shape.argument_bytes.exactOptional(),
				recognition_header_count: nodeSeaReaderLimitsSchema.shape.recognition_header_count.exactOptional(),
				recognition_load_command_bytes: nodeSeaReaderLimitsSchema.shape.recognition_load_command_bytes.exactOptional()
			}).exactOptional().describe(`Node SEA admission; omitted fields use ${JSON.stringify(DEFAULT_NODE_SEA_READER_LIMITS)}. Asset-name and argument bytes are aggregate decoded text budgets. Recognition limits apply before blob decoding.`),
			godot: z.strictObject({ directory_bytes: godotReaderLimitsSchema.shape.directory_bytes.exactOptional() }).exactOptional().describe(`Godot directory representation admission; omitted fields use ${JSON.stringify(DEFAULT_GODOT_READER_LIMITS)}. Applies before path allocation and again to retained metadata.`),
			expanded_bytes: bytes.exactOptional().describe("Aggregate plaintext work for archive-backed readers; omitted retains the encoded-size-derived allowance. Includes repeated readable logical occurrences.")
		});
		artifactReaderLimitsSchema = z.strictObject({
			bun: bunReaderLimitsSchema,
			dotnet_bundle: dotnetBundleReaderLimitsSchema,
			node_sea: nodeSeaReaderLimitsSchema,
			godot: godotReaderLimitsSchema,
			expanded_bytes: bytes.exactOptional()
		});
		resolveArtifactReaderLimits = (selected) => ({
			bun: {
				...DEFAULT_BUN_READER_LIMITS,
				...selected?.bun
			},
			dotnet_bundle: {
				...DEFAULT_DOTNET_BUNDLE_READER_LIMITS,
				...selected?.dotnet_bundle
			},
			node_sea: {
				...DEFAULT_NODE_SEA_READER_LIMITS,
				...selected?.node_sea
			},
			godot: {
				...DEFAULT_GODOT_READER_LIMITS,
				...selected?.godot
			},
			...selected?.expanded_bytes === undefined ? {} : { expanded_bytes: selected.expanded_bytes }
		});
		artifactReaderLimitMaximum = (parameter, unit) => unit === "count" ? 2147483647 : [
			"artifact_limits.bun.representation_bytes",
			"artifact_limits.dotnet_bundle.string_bytes",
			"artifact_limits.godot.directory_bytes"
		].includes(parameter) ? constants.MAX_STRING_LENGTH : Number.MAX_SAFE_INTEGER;
	})))();
}

//#endregion
//#region dist/domain/providerCleanupError.js
var ProviderCleanupError;
function init_providerCleanupError() {
	return (init_providerCleanupError = __esmMin((() => {
		init_providerAdapterError();
		ProviderCleanupError = class extends ProviderAdapterError {
			userMessage = "Provider cleanup could not be fully confirmed. Review the reported local resources before opening another target.";
			/** Producer-attested completed output; ordinary partial observations cannot recover success. */
			completedObservation;
			constructor(providerId, resources, diagnostics, options) {
				const { operation = "close_binary", completedObservation, ...errorOptions } = options ?? {};
				super(providerId, operation, {
					...errorOptions,
					diagnostics
				});
				this.completedObservation = completedObservation;
				this.markCleanupIncomplete(true);
				this.setCleanupResources(resources);
			}
		};
	})))();
}

//#endregion
//#region dist/domain/analysisErrorCleanup.js
var analysisErrorWithCleanupFailure, analysisErrorWithCleanupDependencies, analysisErrorWithCloseRejection, analysisErrorWithCloseRejections, providerCleanupErrorFromFailures, providerCleanupErrorFromCloseRejections, withInheritedCleanupOwnership;
function init_analysisErrorCleanup() {
	return (init_analysisErrorCleanup = __esmMin((() => {
		init_providerAdapterError();
		init_providerCleanupError();
		init_analysisErrorProjection();
		init_analysisErrorPresentation();
		analysisErrorWithCleanupFailure = (primary, cleanup, operation = "close_binary") => new ProviderAdapterError(cleanup instanceof ProviderAdapterError ? cleanup.providerId : "rea", operation, {
			cleanupPrimary: primary,
			cause: new AggregateError([primary, cleanup], "Analysis failed and cleanup remains incomplete.", { cause: primary }),
			...composedCallerGuidance({
				message: primary,
				remediation: cleanup
			}),
			...primary.capturedOutput === undefined ? {} : { capturedOutput: primary.capturedOutput },
			...primary.partialObservation === undefined ? {} : { partialObservation: primary.partialObservation },
			cleanup: {
				reason: cleanup.cleanup?.reason ?? analysisErrorUserMessage(cleanup, "invocation"),
				resources: [...new Set([...primary.cleanupIncomplete ? primary.cleanupResources : [], ...cleanup.cleanupResources])]
			},
			...childFailureDiagnostics({
				primary_error: {
					error: primary,
					omitRecovery: true,
					...primary.capturedOutput === undefined ? {} : { capturedOutput: "omit" }
				},
				cleanup_error: { error: cleanup }
			})
		});
		analysisErrorWithCleanupDependencies = (primary, cleanup, operation = "close_binary") => analysisErrorWithCleanupFailure(primary, cleanup, operation).bindCleanupDependencies([primary, cleanup]);
		analysisErrorWithCloseRejection = (primary, rejection, operation = "close_binary") => rejection.cleanupIncomplete ? analysisErrorWithCleanupDependencies(primary, rejection, operation) : analysisErrorWithCleanupFailure(primary, rejection, operation);
		analysisErrorWithCloseRejections = (first, second, operation = "close_binary") => first.cleanupIncomplete ? analysisErrorWithCloseRejection(first, second, operation) : analysisErrorWithCleanupFailure(first, second, operation);
		providerCleanupErrorFromFailures = (providerId, failures, diagnostics, options) => new ProviderCleanupError(providerId, failures.flatMap((failure) => failure.cleanupResources), typeof diagnostics === "string" ? { reason: diagnostics } : diagnostics, {
			operation: options.operation,
			cause: new AggregateError(options.causes ?? failures, options.message)
		}).bindCleanupDependencies(failures);
		providerCleanupErrorFromCloseRejections = (providerId, rejections, diagnostics, options) => {
			const owners = rejections.flatMap(({ cleanupOwner }) => cleanupOwner === undefined ? [] : [cleanupOwner]);
			const resources = () => [...new Set(rejections.flatMap(({ cleanupOwner, unconfirmedResources }) => {
				if (cleanupOwner === undefined) return unconfirmedResources ?? [];
				return cleanupOwner.cleanupIncomplete ? cleanupOwner.cleanupResources : [];
			}))];
			const aggregate = new ProviderCleanupError(providerId, resources(), diagnostics, {
				operation: options.operation,
				cause: new AggregateError(rejections.map(({ cause }) => cause), options.message),
				...options.remediationAction === undefined ? {} : { remediationAction: options.remediationAction }
			});
			if (owners.length === rejections.length) return aggregate.bindCleanupDependencies(owners);
			if (owners.length > 0) aggregate.bindCleanupResourceOwner({ get cleanupResources() {
				return resources();
			} });
			return aggregate;
		};
		withInheritedCleanupOwnership = (failure, owner) => owner.cleanupIncomplete ? failure.bindCleanupDependencies([owner]) : failure;
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
//#region dist/domain/artifactIdentity.js
var logicalPathNfc, normalizeJoinedLogicalPath, logicalPathEscapesRoot, artifactIdForContent, artifactIdForNode, occurrenceIdForLocation, artifactGraphDigest, artifactManifestId, artifactContradictionId, artifactEdgeId;
function init_artifactIdentity() {
	return (init_artifactIdentity = __esmMin((() => {
		init_artifactIntegrity();
		init_canonicalDigest();
		logicalPathNfc = (value) => value.normalize("NFC");
		normalizeJoinedLogicalPath = (value) => {
			if (value.includes("\0")) return value;
			return logicalPathNfc(posix.normalize(value).replace(/^\.\//u, ""));
		};
		logicalPathEscapesRoot = (path) => path.includes("\0") || path === ".." || path.startsWith("../") || path.startsWith("/");
		artifactIdForContent = (sha256) => `art_${digestCanonicalValue({ sha256 }, "Artifact")}`;
		artifactIdForNode = (node) => node.content_state === "virtual" ? `art_${digestCanonicalValue({
			sha256: node.sha256,
			content_state: "virtual"
		}, "Artifact")}` : artifactIdForContent(node.sha256);
		occurrenceIdForLocation = (input) => input.logicalPath === "." ? `occ_${digestCanonicalValue({ root: input.rootArtifactId }, "Artifact")}` : `occ_${digestCanonicalValue({
			root_artifact_id: input.rootArtifactId,
			logical_path: input.logicalPath,
			entry_kind: input.entryKind,
			...input.duplicateOrdinal === undefined ? {} : { duplicate_ordinal: input.duplicateOrdinal }
		}, "Artifact")}`;
		artifactGraphDigest = (input) => digestCanonicalValue({
			nodes: input.nodes,
			occurrences: input.occurrences,
			edges: input.edges,
			integrity_contradictions: input.contradictions
		}, "Artifact");
		artifactManifestId = (rootArtifactId, graphSha256) => `agm_${digestCanonicalValue({
			root_artifact_id: rootArtifactId,
			graph_sha256: graphSha256
		}, "Artifact")}`;
		artifactContradictionId = (input) => `ic_${digestCanonicalValue({
			root_artifact_id: input.rootArtifactId,
			logical_path: input.logicalPath,
			...artifactIntegrityPairOf(input.integrity)
		}, "Artifact")}`;
		artifactEdgeId = (edge, occurrence) => `edge_${digestCanonicalValue({
			parent_artifact_id: edge.parent_artifact_id,
			child_artifact_id: occurrence.artifact_id,
			relation: edge.relation,
			occurrence_id: edge.occurrence_id,
			logical_path: occurrence.logical_path
		}, "Artifact")}`;
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
export { CanonicalDigestError, DEFAULT_BUN_READER_LIMITS, DEFAULT_DOTNET_BUNDLE_READER_LIMITS, DEFAULT_GODOT_READER_LIMITS, DEFAULT_NODE_SEA_READER_LIMITS, ProviderCleanupError, ZIP64_END, ZIP64_LOCATOR, ZIP_CLASSIC_DIRECTORY_LIMITS, ZIP_CLASSIC_DISK_OFFSETS, ZIP_LOCAL_HEADER_SIGNATURE, ZIP_MAX_COMMENT_BYTES, ZIP_SINGLE_VOLUME, analysisErrorWithCleanupDependencies, analysisErrorWithCleanupFailure, analysisErrorWithCloseRejection, analysisErrorWithCloseRejections, artifactContradictionId, artifactEdgeId, artifactGraphDigest, artifactIdForContent, artifactIdForNode, artifactManifestId, artifactReaderLimitMaximum, artifactReaderLimitsInputSchema, artifactReaderLimitsSchema, digestCanonicalValue, ellipsisExcerpt, excerptText, findDuplicateJsonMember, formattedEllipsisExcerpt, init_analysisErrorCleanup, init_artifactIdentity, init_artifactReaderLimits, init_canonicalDigest, init_exactJsonNumber, init_excerpt, init_jsonDuplicateMember, init_providerCleanupError, init_zipEndOfCentralDirectory, init_zipLocalHeader, isExactJsonNumber, logicalPathEscapesRoot, logicalPathNfc, normalizeJoinedLogicalPath, occurrenceIdForLocation, parseExactJson, parseJsonStringLiteral, parseJsonWithDuplicatePolicy, parseLastWinsJson, providerCleanupErrorFromCloseRejections, providerCleanupErrorFromFailures, quotedExcerpt, readZip64DirectoryRecord, readZip64Locator, resolveArtifactReaderLimits, withInheritedCleanupOwnership, zip64EndUsesSingleVolume, zip64LocatorUsesSingleVolume, zipEndOfCentralDirectoryCandidates, zipEndUsesSingleVolume, zipLocalDataOffset };