import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, ArtifactOperationError, ParseFailureError, decodeLimit, init_analysisErrorCore, init_artifactOperationError, init_parseFailure, init_sha256Hex, malformedInput, sha256Hex, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_parseFailureAnalysisError, isParseLimit, parseFailureAnalysisError, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactReaderFailure, ArtifactResourceScope, artifactFilePrimaryFacts, artifactSelectedPathErrno, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_readStableArtifact, init_resources, projectArtifactCloseFailure, projectOwnedArtifactIdentityFailure, projectStableArtifactFailure, readStableArtifact, stableArtifactInputFailure } from "./resources-B3P64jvH.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, inspectWithService, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { MAX_INSPECT_V8_CODE_CACHE_FILE_BYTES, MAX_INSPECT_V8_CODE_CACHE_STRINGS, MAX_INSPECT_V8_CODE_CACHE_STRING_BYTES, V8_CODE_CACHE_COMPILE_FUNCTION_BIT, V8_CODE_CACHE_HEADER_SIZES, V8_CODE_CACHE_LEGACY_MODULE_BIT, V8_CODE_CACHE_MAGIC_HIGH, V8_CODE_CACHE_MIN_HEADER_BYTES, V8_CODE_CACHE_MODULE_BIT, V8_CODE_CACHE_SOURCE_LENGTH_MASK, V8_CODE_CACHE_TOOL_CONTRACTS, init_v8CodeCache as init_v8CodeCache$1, init_v8CodeCacheToolContracts, inspectV8CodeCacheInputSchema, v8CodeCacheSchema } from "./v8CodeCacheToolContracts-nIOfP95w.js";

//#region dist/application/v8CodeCache/V8CodeCacheService.js
var OPERATION$1, V8CodeCacheService, validReport;
function init_V8CodeCacheService() {
	return (init_V8CodeCacheService = __esmMin((() => {
		init_analysisErrorCore();
		init_evidence();
		init_v8CodeCache$1();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		OPERATION$1 = "inspect_v8_code_cache";
		V8CodeCacheService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			async inspect(rawInput, options) {
				const input = parseAnalysisInput(OPERATION$1, rawInput, inspectV8CodeCacheInputSchema, options?.signal);
				if (!input.ok) return input;
				const result = await this.provider.inspect(input.value, options);
				if (!result.ok) return result;
				const report = v8CodeCacheSchema.safeParse(result.value);
				if (!report.success || report.data.artifact.path !== input.value.path || !validReport(report.data, input.value)) return err(new AnalysisOutputError(OPERATION$1, "V8 code cache provider returned malformed output or changed artifact identity."));
				const value = report.data;
				return completeProviderEvidence(createEvidence({
					path: value.artifact.path,
					format: "file",
					sha256: value.artifact.sha256
				}, this.provider.identity, {
					operation: OPERATION$1,
					parameters: input.value,
					result: value,
					confidence: "observed",
					limitations: value.limitations,
					locations: [{
						kind: "artifact-path",
						path: value.artifact.path
					}, {
						kind: "file-offset-range",
						start: value.payload.offset,
						end: value.payload.offset + value.payload.bytes
					}]
				}), options?.signal);
			}
		};
		validReport = (report, input) => {
			if (report.artifact.bytes > input.max_file_bytes) return false;
			if (report.embedded_strings.length > input.max_strings) return false;
			if (report.payload.offset + report.payload.bytes !== report.artifact.bytes || report.payload.offset !== report.header.header_bytes) return false;
			return report.embedded_strings.every((observation) => observation.bytes >= input.min_string_bytes && observation.offset >= report.payload.offset && observation.offset + observation.bytes <= report.artifact.bytes);
		};
	})))();
}

//#endregion
//#region dist/v8/V8CodeCache.errors.js
var V8_CODE_CACHE_FORMAT, V8_CODE_CACHE_BUDGET_BOUNDARIES, v8CodeCacheBudgetFailure, v8CodeCacheBudgetLimitOf;
function init_V8CodeCache_errors() {
	return (init_V8CodeCache_errors = __esmMin((() => {
		init_parseFailure();
		V8_CODE_CACHE_FORMAT = "v8-code-cache";
		V8_CODE_CACHE_BUDGET_BOUNDARIES = new Set(["max_strings", "min_string_bytes"]);
		v8CodeCacheBudgetFailure = (boundary, limit, message) => decodeLimit(V8_CODE_CACHE_FORMAT, message, {
			name: boundary,
			maximum: limit
		});
		v8CodeCacheBudgetLimitOf = (cause) => cause instanceof ParseFailureError && cause.failure.kind === "limit" && cause.failure.format === "v8-code-cache" && V8_CODE_CACHE_BUDGET_BOUNDARIES.has(cause.failure.limit.name) ? {
			boundary: cause.failure.limit.name,
			limit: cause.failure.limit.maximum,
			message: cause.failure.detail
		} : undefined;
	})))();
}

//#endregion
//#region dist/v8/V8CodeCacheProviderIdentity.js
var V8_CODE_CACHE_PROVIDER_IDENTITY;
function init_V8CodeCacheProviderIdentity() {
	return (init_V8CodeCacheProviderIdentity = __esmMin((() => {
		V8_CODE_CACHE_PROVIDER_IDENTITY = {
			id: "rea-v8-code-cache",
			name: "REA V8 code cache reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/v8/V8CodeCacheParser.js
var unsupported, malformed, HEADER_ROLES, LIMITATIONS, MODULE_BITS, isPrintable, parseV8CodeCache;
function init_V8CodeCacheParser() {
	return (init_V8CodeCacheParser = __esmMin((() => {
		init_v8CodeCache$1();
		init_V8CodeCache_errors();
		init_binaryContainer();
		init_parseFailure();
		init_sha256Hex();
		unsupported = (message) => {
			throw unsupportedInput(V8_CODE_CACHE_FORMAT, message);
		};
		malformed = (message) => {
			throw malformedInput(V8_CODE_CACHE_FORMAT, message);
		};
		HEADER_ROLES = [
			{
				role: "magic",
				status: "confirmed"
			},
			{
				role: "version_hash",
				status: "inferred"
			},
			{
				role: "source_length",
				status: "confirmed"
			},
			{
				role: "flag_hash",
				status: "inferred"
			},
			{
				role: "build_constant",
				status: "inferred"
			},
			{
				role: "payload_length",
				status: "confirmed"
			},
			{
				role: "reserved",
				status: "unconfirmed"
			},
			{
				role: "reserved",
				status: "unconfirmed"
			}
		];
		LIMITATIONS = [
			"The payload is serialized V8 heap data, not source. No logic is recovered and no bytecode is decompiled.",
			"Recovering logic requires a version-pinned V8 decompiler (View8-style) that this tool neither installs nor runs.",
			"Embedded strings are byte-pattern observations inside the payload, not parsed heap objects: a reported sequence is not proof V8 retained it as a string, and a missing literal is not proof it is absent.",
			"Header field roles beyond magic, source length, and payload length are inferred from one producer and are version-dependent; treat them as observations, not a fixed ABI.",
			"An unflagged producer word is reported as unknown: whether V8 marks a vm.compileFunction cache at all is a build detail, so the container cannot separate a vm.Script from an unmarked function cache on its own."
		];
		MODULE_BITS = V8_CODE_CACHE_MODULE_BIT | V8_CODE_CACHE_LEGACY_MODULE_BIT;
		isPrintable = (byte) => byte >= 32 && byte <= 126 || byte === 9;
		parseV8CodeCache = (bytes, artifact, input) => {
			if (bytes.length !== artifact.bytes) malformed("Selected artifact length disagrees with the retained bytes.");
			if (bytes.length < V8_CODE_CACHE_MIN_HEADER_BYTES) malformed(`Selected file is shorter than the ${String(V8_CODE_CACHE_MIN_HEADER_BYTES)}-byte V8 code cache header.`);
			const headerReader = new BinaryReader(bytes.subarray(0, 32), true, V8_CODE_CACHE_FORMAT);
			const readField = (entry, index) => {
				const offset = index * 4;
				return {
					offset,
					value: headerReader.u32(offset),
					...entry
				};
			};
			const commonFieldCount = 28 / 4;
			const fields = HEADER_ROLES.slice(0, commonFieldCount).map(readField);
			const magic = fields[0].value;
			const magicHigh = magic >>> 16;
			if (magicHigh !== 49374) unsupported(`Container magic 0x${magic.toString(16).padStart(8, "0")} does not carry the V8 code cache high half 0x${V8_CODE_CACHE_MAGIC_HIGH.toString(16)}; this file is not a V8 code cache.`);
			const declaredPayload = fields[5].value;
			const payloadOffset = bytes.length - declaredPayload;
			if (!V8_CODE_CACHE_HEADER_SIZES.includes(payloadOffset)) malformed(`Header declares a ${String(declaredPayload)}-byte payload, leaving ${String(payloadOffset)} header bytes, which is no admitted V8 code cache header size (${V8_CODE_CACHE_HEADER_SIZES.join(" or ")}); the container is truncated or corrupt.`);
			if (payloadOffset === 28 && bytes.length >= 32 && headerReader.u32(28) === 0) malformed("A 28-byte header extent followed by a zero word is ambiguous: the file may have a zero-leading narrow payload or a truncated 32-byte layout.");
			if (payloadOffset === 32) fields.push(readField(HEADER_ROLES[commonFieldCount], commonFieldCount));
			const sourceWord = fields[2].value;
			const sourceLength = sourceWord & V8_CODE_CACHE_SOURCE_LENGTH_MASK;
			const producer = (sourceWord & MODULE_BITS) !== 0 ? "module" : (sourceWord & 536870912) !== 0 ? "compile_function" : "unknown";
			const payload = bytes.subarray(payloadOffset);
			const observations = [];
			let runStart = -1;
			const flush = (end) => {
				if (runStart < 0) return;
				const runBytes = end - runStart;
				if (runBytes >= input.min_string_bytes) {
					if (observations.length >= input.max_strings) throw v8CodeCacheBudgetFailure("max_strings", input.max_strings, `Payload contains more than ${String(input.max_strings)} printable runs of at least ${String(input.min_string_bytes)} bytes, so the max_strings observation budget was exhausted before the scan finished.`);
					const retained = Math.min(runBytes, MAX_INSPECT_V8_CODE_CACHE_STRING_BYTES);
					const absolute = payloadOffset + runStart;
					observations.push({
						offset: absolute,
						bytes: runBytes,
						retained_bytes: retained,
						truncated: retained < runBytes,
						text: payload.subarray(runStart, runStart + retained).toString("latin1")
					});
				}
				runStart = -1;
			};
			const payloadLength = payload.length;
			for (let index = 0; index < payloadLength; index += 1) {
				if (isPrintable(payload[index])) {
					if (runStart < 0) runStart = index;
				} else {
					flush(index);
				}
			}
			flush(payloadLength);
			return {
				artifact,
				header: {
					magic,
					magic_build_stable: magicHigh,
					fields,
					header_bytes: payloadOffset,
					source_length: sourceLength,
					producer
				},
				payload: {
					offset: payloadOffset,
					bytes: payload.length,
					sha256: sha256Hex(payload),
					trailing_bytes: 0
				},
				embedded_strings: observations,
				coverage: {
					status: "complete",
					scanned_bytes: payload.length,
					strings: observations.length
				},
				limitations: LIMITATIONS
			};
		};
	})))();
}

//#endregion
//#region dist/v8/V8CodeCacheProvider.js
var OPERATION, V8CodeCacheProvider, inputBudgetRemediation, observationBudgetRecovery, observationBudgetRemediation, v8CodeCacheFailurePrimary, v8CodeCacheFailure;
function init_V8CodeCacheProvider() {
	return (init_V8CodeCacheProvider = __esmMin((() => {
		init_parseFailureAnalysisError();
		init_resources();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_v8CodeCache$1();
		init_result();
		init_V8CodeCache_errors();
		init_V8CodeCacheProviderIdentity();
		init_V8CodeCacheParser();
		OPERATION = "inspect_v8_code_cache";
		V8CodeCacheProvider = class {
			identity = V8_CODE_CACHE_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					throw projectArtifactCloseFailure(cause, V8_CODE_CACHE_PROVIDER_IDENTITY.id, OPERATION);
				}
			}
			async inspect(input, options) {
				let snapshot;
				try {
					return await this.#resources.run(async () => {
						snapshot = await readStableArtifact(input.path, input.max_file_bytes, options?.signal, undefined, this.#resources);
						return ok(parseV8CodeCache(snapshot.bytes, {
							path: input.path,
							sha256: snapshot.sha256,
							bytes: snapshot.bytes.length
						}, input));
					});
				} catch (cause) {
					return err(v8CodeCacheFailure(cause, input, snapshot));
				}
			}
		};
		inputBudgetRemediation = (cause, input) => {
			if (cause.boundary === "file-size") return input.max_file_bytes >= 67108864 ? `The file exceeds the ${String(MAX_INSPECT_V8_CODE_CACHE_FILE_BYTES)}-byte input ceiling this operation accepts; select a smaller artifact.` : `Raise max_file_bytes above ${String(input.max_file_bytes)} bytes or select a smaller artifact; the limit is the caller-selected input read budget.`;
			return undefined;
		};
		observationBudgetRecovery = (cause, input) => {
			const canRaiseMaxStrings = input.max_strings < MAX_INSPECT_V8_CODE_CACHE_STRINGS;
			const canRaiseMinStringBytes = input.min_string_bytes < 256;
			const canLowerMinStringBytes = input.min_string_bytes > 4;
			if (cause.boundary !== "max_strings") return {
				boundary: cause.boundary,
				canRaiseMaxStrings,
				canRaiseMinStringBytes,
				canLowerMinStringBytes,
				requiresSmallerArtifact: !canLowerMinStringBytes
			};
			return {
				boundary: cause.boundary,
				canRaiseMaxStrings,
				canRaiseMinStringBytes,
				canLowerMinStringBytes,
				requiresSmallerArtifact: !canRaiseMaxStrings && !canRaiseMinStringBytes
			};
		};
		observationBudgetRemediation = (cause, input) => {
			const recovery = observationBudgetRecovery(cause, input);
			if (recovery.boundary !== "max_strings") return `Lower min_string_bytes below ${String(cause.limit)} or select a smaller artifact.`;
			if (recovery.requiresSmallerArtifact) return `Both max_strings and min_string_bytes are already at their ceilings (${String(MAX_INSPECT_V8_CODE_CACHE_STRINGS)} observations, ${String(256)}-byte runs), so no option change clears this budget; select a smaller artifact.`;
			if (!recovery.canRaiseMaxStrings) return `Raise min_string_bytes above ${String(input.min_string_bytes)}; max_strings is already at its ${String(MAX_INSPECT_V8_CODE_CACHE_STRINGS)}-observation ceiling, so a shorter run length cannot help.`;
			if (!recovery.canRaiseMinStringBytes) return `Raise max_strings above ${String(cause.limit)}; min_string_bytes is already at its ${String(256)}-byte ceiling, so a larger artifact must be reduced or split.`;
			return `Raise max_strings above ${String(cause.limit)} or raise min_string_bytes above ${String(input.min_string_bytes)}; both are caller-selected observation budgets.`;
		};
		v8CodeCacheFailurePrimary = (facts, input) => {
			const { cause, origin } = facts;
			if (isParseLimit(cause, "v8-code-cache")) {
				const budgetLimit = v8CodeCacheBudgetLimitOf(cause);
				if (budgetLimit !== undefined) return parseLimitConstraint(OPERATION, "capacity", cause, {
					retryable: false,
					remediationAction: observationBudgetRemediation(budgetLimit, input)
				});
			}
			const formatFailure = parseFailureAnalysisError(OPERATION, input.path, cause);
			if (formatFailure !== undefined) return formatFailure;
			const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, input.path);
			if (identityFailure !== undefined) return identityFailure;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "limit") {
					const remediationAction = inputBudgetRemediation(cause, input);
					return new AnalysisResourceConstraintError(OPERATION, cause.boundary ?? "memory", cause.message, {
						max_file_bytes: input.max_file_bytes,
						max_strings: input.max_strings
					}, {
						cause,
						...remediationAction === undefined ? {} : {
							retryable: false,
							remediationAction
						}
					});
				}
				if (cause.reason === "path" || cause.reason === "format") return stableArtifactInputFailure(cause, OPERATION);
			}
			if (cause instanceof Error && "code" in cause) {
				if (cause.code === "EACCES" || cause.code === "EPERM") return new AnalysisAccessDeniedError(OPERATION, input.path, cause.code, { cause });
				const pathErrno = artifactSelectedPathErrno(cause);
				if (pathErrno !== undefined) return new AnalysisInputError(OPERATION, { cause }, [{
					path: ["path"],
					reason: "invalid_value",
					message: `Selected V8 code cache could not be read (${pathErrno}): ${input.path}.`
				}]);
			}
			return new ArtifactOperationError(OPERATION, origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure ? cause.reason : "io", undefined, cause instanceof Error ? cause.message : "V8 code cache inspection failed.", { cause });
		};
		v8CodeCacheFailure = (cause, input, snapshot) => {
			const primary = v8CodeCacheFailurePrimary(artifactFilePrimaryFacts(cause), input);
			return projectStableArtifactFailure(cause, primary, input.path, V8_CODE_CACHE_PROVIDER_IDENTITY.id, OPERATION, snapshot);
		};
	})))();
}

//#endregion
//#region dist/composition/v8CodeCache.js
var createV8CodeCacheService;
function init_v8CodeCache() {
	return (init_v8CodeCache = __esmMin((() => {
		init_V8CodeCacheService();
		init_V8CodeCacheProvider();
		createV8CodeCacheService = () => new V8CodeCacheService(new V8CodeCacheProvider());
	})))();
}

//#endregion
//#region dist/cli/v8CodeCacheCommands.js
var v8CodeCacheCommands_exports = /* @__PURE__ */ __exportAll({ registerV8CodeCacheCommands: () => registerV8CodeCacheCommands });
var registerV8CodeCacheCommands;
function init_v8CodeCacheCommands() {
	return (init_v8CodeCacheCommands = __esmMin((() => {
		init_v8CodeCache();
		init_v8CodeCacheToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerV8CodeCacheCommands = (cli, logger) => {
			const contract = contractNamed(V8_CODE_CACHE_TOOL_CONTRACTS, "inspect_v8_code_cache");
			registerContractCommand(cli, logger, contract, {
				description: "Inspect a V8 code cache header and its embedded printable byte patterns without executing it",
				positionals: ["path"],
				callerPaths: ["path"],
				fields: { path: { description: "Local V8 code cache (.jsc) file" } }
			}, inspectWithService(createV8CodeCacheService, "rea-v8-code-cache"));
		};
	})))();
}

//#endregion
export { init_v8CodeCacheCommands, v8CodeCacheCommands_exports };