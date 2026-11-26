import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisError, AnalysisOutputError, AnalysisResourceConstraintError, cancelledBy, carriedReason, decodeLimit, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_parseFailure, malformedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_internalInvariant, init_parseFailureAnalysisError, init_strictUtf8, invariantViolation, isParseLimit, parseFailureAnalysisError, parseLimitConstraint, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { ArtifactReaderFailure, ArtifactResourceScope, artifactFileCancellationCause, artifactFileCompletion, artifactFilePrimaryFacts, assertArtifactReadActive, bindArtifactFileCleanup, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_RegularFile, init_RegularFileErrorProjection, init_StableArtifactFailure, init_resources, isSelectedRegularFileError, readerIntegrityFailure, sameRegularFileState, selectedFileTargetError, withArtifactRegularFile } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_jsonDuplicateMember, init_providerCleanupError, parseJsonStringLiteral } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { Budget, escapeJsonPointerToken, init_budget, init_jsonPointer } from "./jsonPointer-aolC6MvJ.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { deliverWithService, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_modelArtifact, init_modelArtifactQuery, inspectModelArtifactInputSchema, modelArtifactPartialSchema, modelArtifactSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { init_AnalysisViewService, projectRetainedAnalysis, requireAnalysisViewRetention } from "./AnalysisViewService-D_M3W3PD.js";
import { INSPECT_MODEL_ARTIFACT_CONTRACT, init_modelToolContracts } from "./modelToolContracts-BW0RcXpl.js";
import { isUtf8 } from "node:buffer";
import { createHash } from "node:crypto";
import { lstat } from "node:fs/promises";
import { setImmediate } from "node:timers/promises";

//#region dist/domain/model/modelArtifactEvidence.js
var createModelArtifactEvidence, createModelArtifactPartialEvidence;
function init_modelArtifactEvidence() {
	return (init_modelArtifactEvidence = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		createModelArtifactEvidence = (report, provider, parameters) => {
			const source = report.artifact;
			return createEvidence(source.sha256 === null ? unknownTarget("not-observed") : {
				path: source.path,
				sha256: source.sha256,
				format: "file"
			}, provider, {
				operation: "inspect_model_artifact",
				parameters: {
					path: parameters.path,
					hash: parameters.hash
				},
				result: report,
				confidence: "observed",
				locations: [{
					kind: "artifact-path",
					path: source.path
				}, {
					kind: "file-offset-range",
					start: 0,
					end: source.header_length
				}],
				limitations: [...source.sha256 === null ? ["Full-file identity is unknown in header-only mode; normalized_result.artifact records a scoped header SHA-256 and exact source path/extent."] : [], ...report.limitations]
			});
		};
		createModelArtifactPartialEvidence = (partial, provider, parameters) => createEvidence(unknownTarget("not-observed"), provider, {
			operation: "inspect_model_artifact",
			parameters: {
				path: parameters.path,
				hash: parameters.hash
			},
			result: partial,
			confidence: "observed",
			locations: [{
				kind: "artifact-path",
				path: partial.artifact.path
			}],
			limitations: ["The interrupted read did not complete final file identity verification; digest and identity remain unknown.", ...partial.limitations]
		});
	})))();
}

//#endregion
//#region dist/application/model/ModelArtifactService.js
var ModelArtifactService;
function init_ModelArtifactService() {
	return (init_ModelArtifactService = __esmMin((() => {
		init_modelArtifactQuery();
		init_modelArtifact();
		init_inputIssueProjection();
		init_analysisErrorCore();
		init_modelArtifactEvidence();
		init_result();
		init_AnalysisViewService();
		ModelArtifactService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			async inspect(raw, options, retention = {
				evidenceById: undefined,
				recordEvidence: undefined
			}) {
				const input = inspectModelArtifactInputSchema.safeParse(raw);
				if (!input.success) return err(analysisInputErrorFromIssues("inspect_model_artifact", input.error.issues, raw, { cause: input.error }));
				if (options?.signal?.aborted) return err(cancelledBy("inspect_model_artifact", options.signal));
				const { detail, view, ...parameters } = input.data;
				if (detail === "summary") {
					const ready = requireAnalysisViewRetention("inspect_model_artifact", retention);
					if (!ready.ok) return ready;
				}
				const inspected = await this.provider.inspect(parameters, options);
				if (!inspected.ok) return inspected;
				const checked = modelArtifactSchema.safeParse(inspected.value);
				if (!checked.success || checked.data.artifact.path !== parameters.path || checked.data.artifact.read_scope !== (parameters.hash === "full" ? "full-file" : "header") || (parameters.hash === "header" ? checked.data.artifact.sha256 !== null : checked.data.artifact.sha256 === null)) return err(new AnalysisOutputError("inspect_model_artifact", "Model reader changed the selected input or returned invalid facts"));
				const report = checked.data;
				const evidence = createModelArtifactEvidence(report, this.provider.identity, parameters);
				if (options?.signal?.aborted) return err(cancelledBy("inspect_model_artifact", options.signal, { partialObservation: evidence }));
				return detail === "summary" ? projectRetainedAnalysis(evidence, retention, view === undefined ? { kind: "summary" } : {
					kind: "model-artifact",
					...view
				}) : ok(evidence);
			}
		};
	})))();
}

//#endregion
//#region dist/model/ModelArtifactProviderIdentity.js
var MODEL_ARTIFACT_PROVIDER_IDENTITY;
function init_ModelArtifactProviderIdentity() {
	return (init_ModelArtifactProviderIdentity = __esmMin((() => {
		MODEL_ARTIFACT_PROVIDER_IDENTITY = {
			id: "model-artifact",
			name: "REA model header reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/model/ModelFormat.js
function rejectModel(message) {
	throw malformedInput(MODEL_FORMAT, message);
}
function rejectPickle() {
	throw unsupportedInput(MODEL_FORMAT, "PyTorch pickle/ZIP model deserialization is unsupported; supply GGUF or safetensors instead");
}
var MODEL_FORMAT, modelCapacityFailure, MODEL_HEADER_BYTES, MODEL_REPORT_BYTES, MODEL_ARRAY_PREVIEW, MODEL_METADATA_NESTING, MODEL_JSON_NESTING, fixedModelLimit, modelCapacityLimits, isModelCapacityLimit, modelCapacityConstraint, ModelReportBudget;
function init_ModelFormat() {
	return (init_ModelFormat = __esmMin((() => {
		init_budget();
		init_parseFailure();
		init_parseFailureAnalysisError();
		MODEL_FORMAT = "model";
		modelCapacityFailure = (limit, detail) => decodeLimit(MODEL_FORMAT, detail, {
			name: limit,
			maximum: modelCapacityLimits[limit].maximum
		});
		MODEL_HEADER_BYTES = 1e8;
		MODEL_REPORT_BYTES = 32 * 1024 * 1024;
		MODEL_ARRAY_PREVIEW = 8;
		MODEL_METADATA_NESTING = 32;
		MODEL_JSON_NESTING = 32;
		fixedModelLimit = (allowance) => `${allowance}. This release has no runtime override. Additional host memory does not raise it. Repeating the unchanged request fails the same way.`;
		modelCapacityLimits = {
			"header-bytes": {
				maximum: MODEL_HEADER_BYTES,
				legacyMaximumKey: "maximum_header_bytes",
				allowance: (maximum) => `The model header allowance is ${maximum.toLocaleString("en-US")} bytes`
			},
			"report-bytes": {
				maximum: MODEL_REPORT_BYTES,
				legacyMaximumKey: "maximum_report_bytes",
				allowance: (maximum) => `The retained model report allowance is ${String(maximum)} bytes`
			},
			"representation-bytes": {
				maximum: MODEL_REPORT_BYTES,
				legacyMaximumKey: "maximum_representation_bytes",
				allowance: (maximum) => `The retained model representation allowance is ${String(maximum)} bytes`
			},
			"exact-offset": {
				maximum: Number.MAX_SAFE_INTEGER,
				legacyMaximumKey: "maximum_exact_offset",
				allowance: (maximum) => `Exact host offset precision stops at ${String(maximum)}`
			},
			"metadata-nesting": {
				maximum: 32,
				legacyMaximumKey: "maximum_array_frames",
				allowance: (maximum) => `GGUF metadata nesting is limited to ${String(maximum)} array frames`
			},
			"json-nesting": {
				maximum: 32,
				legacyMaximumKey: "maximum_json_depth",
				allowance: (maximum) => `Safetensors JSON nesting is limited to ${String(maximum)} levels`
			}
		};
		isModelCapacityLimit = (name) => Object.hasOwn(modelCapacityLimits, name);
		modelCapacityConstraint = (operation, cause) => {
			if (!isParseLimit(cause, "model")) return undefined;
			const { name, maximum } = cause.failure.limit;
			if (!isModelCapacityLimit(name)) return undefined;
			const { allowance, legacyMaximumKey } = modelCapacityLimits[name];
			return parseLimitConstraint(operation, "memory", cause, {
				legacyMaximumKey,
				retryable: false,
				remediationAction: fixedModelLimit(allowance(maximum))
			});
		};
		ModelReportBudget = class {
			#bytes = new Budget(MODEL_REPORT_BYTES);
			charge(bytes) {
				this.#bytes.charge(bytes, () => modelCapacityFailure("representation-bytes", "Model facts exceed the 32 MiB retained representation budget. This release has no runtime override."));
			}
		};
	})))();
}

//#endregion
//#region dist/model/ModelHeaderReader.js
var ModelHeaderReader;
function init_ModelHeaderReader() {
	return (init_ModelHeaderReader = __esmMin((() => {
		init_resources();
		init_ModelFormat();
		init_internalInvariant();
		ModelHeaderReader = class {
			file;
			size;
			signal;
			position = 0;
			#end = 0;
			#guaranteedEnd = 0;
			#buffer = Buffer.alloc(0);
			#start = 0;
			#headerPrefixBytes = 0;
			#hash = createHash("sha256");
			constructor(file, size, signal) {
				this.file = file;
				this.size = size;
				this.signal = signal;
			}
			/** Safetensors declares JSON bytes separately from its fixed length prefix. */
			excludeSafetensorsLengthPrefix() {
				if (this.position !== 8) throw invariantViolation("Safetensors header budget must follow its eight-byte length prefix");
				this.#headerPrefixBytes = 8;
			}
			/** Validate a raw file extent before host conversion or allocation admission. */
			requireFileExtent(offset, length) {
				if (!Number.isSafeInteger(offset) || offset < 0 || length < 0n || BigInt(offset) + length > BigInt(this.size)) rejectModel("Declared extent is outside the file");
			}
			/** Minimum header bytes; physical validity precedes the independent header budget. */
			guarantee(bytes) {
				if (typeof bytes === "number" && !Number.isSafeInteger(bytes)) rejectModel("Invalid header field length");
				const length = BigInt(bytes);
				this.requireFileExtent(this.position, length);
				const end = this.position + Number(length);
				this.#validateEnd(end);
				this.#guaranteedEnd = Math.max(this.#guaranteedEnd, end);
			}
			#validateEnd(end) {
				if (!Number.isSafeInteger(end) || end < 0 || end > this.size) rejectModel("Declared header extent is outside the file");
				if (end - this.#headerPrefixBytes > 1e8) throw modelCapacityFailure("header-bytes", "Model header exceeds 100,000,000 bytes. This release has no runtime override.");
			}
			async take(length) {
				assertArtifactReadActive(this.signal);
				const end = this.position + length;
				this.#validateEnd(end);
				if (!Number.isSafeInteger(length) || length < 0) rejectModel("Invalid header field length");
				if (end > this.#end) {
					const readEnd = Math.max(end, Math.min(this.position + 65536, this.#guaranteedEnd));
					const retained = this.#buffer.subarray(this.position - this.#start);
					const next = Buffer.allocUnsafe(readEnd - this.position);
					retained.copy(next);
					let offset = retained.length;
					while (offset < next.length) {
						assertArtifactReadActive(this.signal);
						const result = await this.file.read(next, offset, next.length - offset, this.position + offset);
						if (result.bytesRead === 0) throw new ArtifactReaderFailure("integrity", "Model header ended before its admitted file extent", { integrityCheck: "read-coverage" });
						this.#hash.update(next.subarray(offset, offset + result.bytesRead));
						offset += result.bytesRead;
					}
					this.#start = this.position;
					this.#end = readEnd;
					this.#buffer = next;
				}
				const result = this.#buffer.subarray(this.position - this.#start, end - this.#start);
				this.position = end;
				return result;
			}
			async consume(length) {
				while (length > 0) {
					const size = Math.min(length, 65536);
					await this.take(size);
					length -= size;
				}
			}
			/** Complete the exact prefix commitment, optionally streaming weights without retaining them. */
			async finish(full) {
				if (this.position !== this.#end) rejectModel("Parser left unconsumed header bytes");
				const header_sha256 = this.#hash.copy().digest("hex");
				if (!full) return {
					header_sha256,
					sha256: null,
					bytes_read: this.position
				};
				const buffer = Buffer.allocUnsafe(1024 * 1024);
				let position = this.position;
				while (position < this.size) {
					assertArtifactReadActive(this.signal);
					const { bytesRead } = await this.file.read(buffer, 0, Math.min(buffer.length, this.size - position), position);
					if (bytesRead === 0) throw new ArtifactReaderFailure("integrity", "Model ended before its admitted extent during full-file hashing", { integrityCheck: "read-coverage" });
					this.#hash.update(buffer.subarray(0, bytesRead));
					position += bytesRead;
				}
				return {
					header_sha256,
					sha256: this.#hash.digest("hex"),
					bytes_read: position
				};
			}
		};
	})))();
}

//#endregion
//#region dist/model/ModelTensorTypes.js
var kStorageLimitation, ambiguousGgmlType, GGML_TYPES, ggmlType, SAFETENSORS_BITS, safetensorsBits;
function init_ModelTensorTypes() {
	return (init_ModelTensorTypes = __esmMin((() => {
		kStorageLimitation = {
			kind: "storage",
			reason: "K-quantization types (IDs 10–15) have released 64-element and 256-element block layouts with the same GGUF and quantization versions. The common 64-element row constraint does not establish a storage block size. Nonempty tensor byte lengths and storage validation remain unknown; file extents and general.file_type do not identify the layout."
		};
		ambiguousGgmlType = (id, candidates) => [
			`AMBIGUOUS_${String(id)}`,
			1,
			null,
			{
				kind: "type-identity",
				reason: `GGUF tensor type ID ${String(id)} has released ${candidates} meanings with the same GGUF and quantization versions. Textual identity and nonempty byte lengths remain unknown; file extents and general.file_type do not identify the per-tensor layout.`
			}
		];
		GGML_TYPES = {
			0: [
				"F32",
				1,
				4
			],
			1: [
				"F16",
				1,
				2
			],
			2: [
				"Q4_0",
				32,
				18
			],
			3: [
				"Q4_1",
				32,
				20
			],
			6: [
				"Q5_0",
				32,
				22
			],
			7: [
				"Q5_1",
				32,
				24
			],
			8: [
				"Q8_0",
				32,
				34
			],
			9: [
				"Q8_1",
				32,
				null,
				{
					kind: "storage",
					reason: "Q8_1 has released 40-byte and 36-byte layouts per 32 elements with the same GGUF and quantization versions. Nonempty tensor byte lengths and storage validation remain unknown; offsets and file padding do not identify the layout."
				}
			],
			10: [
				"Q2_K",
				64,
				null,
				kStorageLimitation
			],
			11: [
				"Q3_K",
				64,
				null,
				kStorageLimitation
			],
			12: [
				"Q4_K",
				64,
				null,
				kStorageLimitation
			],
			13: [
				"Q5_K",
				64,
				null,
				kStorageLimitation
			],
			14: [
				"Q6_K",
				64,
				null,
				kStorageLimitation
			],
			15: [
				"Q8_K",
				64,
				null,
				kStorageLimitation
			],
			16: ambiguousGgmlType(16, "I8 / IQ2_XXS"),
			17: ambiguousGgmlType(17, "I16 / I8 / IQ2_XS"),
			18: ambiguousGgmlType(18, "I32 / I16 / I8 / IQ3_XXS"),
			19: ambiguousGgmlType(19, "I32 / I16 / I8 / IQ1_S"),
			20: ambiguousGgmlType(20, "I32 / I16 / I8 / IQ4_NL"),
			21: ambiguousGgmlType(21, "I32 / I16 / I8 / IQ3_S"),
			22: ambiguousGgmlType(22, "I32 / I16 / I8 / IQ2_S"),
			23: ambiguousGgmlType(23, "I32 / I16 / I8 / IQ4_XS"),
			24: ambiguousGgmlType(24, "I32 / I16 / I8"),
			25: ambiguousGgmlType(25, "I32 / I16"),
			26: [
				"I32",
				1,
				4
			],
			27: [
				"I64",
				1,
				8
			],
			28: [
				"F64",
				1,
				8
			],
			29: [
				"IQ1_M",
				256,
				56
			],
			30: [
				"BF16",
				1,
				2
			],
			34: [
				"TQ1_0",
				256,
				54
			],
			35: [
				"TQ2_0",
				256,
				66
			],
			39: [
				"MXFP4",
				32,
				17
			],
			40: [
				"NVFP4",
				64,
				36
			],
			41: [
				"Q1_0",
				128,
				18
			],
			42: [
				"Q2_0",
				64,
				18
			]
		};
		ggmlType = (id) => GGML_TYPES[id];
		SAFETENSORS_BITS = {
			BOOL: 8,
			F4: 4,
			F6_E2M3: 6,
			F6_E3M2: 6,
			I8: 8,
			U8: 8,
			F8_E5M2: 8,
			F8_E4M3: 8,
			F8_E8M0: 8,
			F8_E4M3FNUZ: 8,
			F8_E5M2FNUZ: 8,
			I16: 16,
			U16: 16,
			F16: 16,
			BF16: 16,
			I32: 32,
			U32: 32,
			F32: 32,
			I64: 64,
			U64: 64,
			F64: 64,
			C64: 64
		};
		safetensorsBits = (type) => Object.hasOwn(SAFETENSORS_BITS, type) ? SAFETENSORS_BITS[type] : undefined;
	})))();
}

//#endregion
//#region dist/model/GgufHeader.js
var NAMES, STRING_LENGTH_BYTES, WIDTHS, MIN_METADATA_ROW_BYTES, TENSOR_STORAGE_FIELDS_BYTES, MIN_TENSOR_DESCRIPTOR_BYTES, GgufHeader;
function init_GgufHeader() {
	return (init_GgufHeader = __esmMin((() => {
		init_binaryContainer();
		init_strictUtf8();
		init_ModelHeaderReader();
		init_parseFailure();
		init_ModelFormat();
		init_ModelTensorTypes();
		NAMES = [
			"UINT8",
			"INT8",
			"UINT16",
			"INT16",
			"UINT32",
			"INT32",
			"FLOAT32",
			"BOOL",
			"STRING",
			"ARRAY",
			"UINT64",
			"INT64",
			"FLOAT64"
		];
		STRING_LENGTH_BYTES = 8;
		WIDTHS = [
			1,
			1,
			2,
			2,
			4,
			4,
			4,
			1,
			STRING_LENGTH_BYTES,
			12,
			8,
			8,
			8
		];
		MIN_METADATA_ROW_BYTES = STRING_LENGTH_BYTES + 4 + 1;
		TENSOR_STORAGE_FIELDS_BYTES = 4 + 8;
		MIN_TENSOR_DESCRIPTOR_BYTES = STRING_LENGTH_BYTES + 4 + TENSOR_STORAGE_FIELDS_BYTES;
		GgufHeader = class {
			reader;
			#little = true;
			#budget = new ModelReportBudget();
			constructor(reader) {
				this.reader = reader;
			}
			async #field(width) {
				return new BinaryReader(await this.reader.take(width), this.#little, "gguf");
			}
			async #unsigned(width) {
				return (await this.#field(width)).word(0, width === 4 ? 32 : 64);
			}
			async #text(retain, requiredAfter, maximum) {
				const rawLength = await this.#unsigned(STRING_LENGTH_BYTES);
				if (maximum !== undefined && rawLength > BigInt(maximum)) rejectModel("GGUF name exceeds its format byte limit");
				this.reader.guarantee(rawLength + BigInt(requiredAfter));
				const length = Number(rawLength);
				if (retain) this.#budget.charge(6 * length + 2);
				if (!retain && length <= 65536) {
					if (!isUtf8(await this.reader.take(length))) rejectModel("GGUF string is not valid UTF-8");
					return "";
				}
				const decoder = strictUtf8Decoder("preserve");
				let result = "";
				try {
					for (let left = length; left > 0;) {
						const n = Math.min(left, 65536);
						const text = decoder.decode(await this.reader.take(n), { stream: true });
						if (retain) result += text;
						left -= n;
					}
					const tail = decoder.decode();
					if (retain) result += tail;
				} catch (cause) {
					if (cause instanceof TypeError) rejectModel("GGUF string is not valid UTF-8");
					throw cause;
				}
				return result;
			}
			async #value(type, retain, requiredAfter, enclosingFrames = 0) {
				const width = WIDTHS[type];
				if (width === undefined) rejectModel(`Unknown GGUF metadata type ${String(type)}`);
				this.reader.guarantee(width + requiredAfter);
				if (type === 8) return {
					value: await this.#text(retain, requiredAfter),
					element_type: null,
					element_count: null,
					complete: true
				};
				if (type === 9) {
					const frames = enclosingFrames + 1;
					if (frames > 32) throw modelCapacityFailure("metadata-nesting", `GGUF metadata nesting exceeds ${String(32)} array frames`);
					const element = Number(await this.#unsigned(4));
					const rawCount = await this.#unsigned(8);
					const minimum = WIDTHS[element];
					if (minimum === undefined) rejectModel(`Unknown GGUF array element type ${String(element)}`);
					this.reader.guarantee(rawCount * BigInt(minimum) + BigInt(requiredAfter));
					const count = Number(rawCount);
					const preview = [];
					if (retain) this.#budget.charge(128 + Math.min(count, 8) * 64);
					let complete = count <= 8;
					for (let index = 0; index < count; index++) {
						if (index % 4096 === 4095) await setImmediate();
						if (element !== 8 && element !== 9 && (!retain || index >= 8)) {
							let left = (count - index) * minimum;
							while (left > 0) {
								const size = Math.min(left, 65536);
								const bytes = await this.reader.take(size);
								if (element === 7 && bytes.some((byte) => byte !== 0 && byte !== 1)) rejectModel("GGUF boolean must be 0 or 1");
								left -= size;
							}
							break;
						}
						const keep = retain && index < 8;
						const value = await this.#value(element, keep, (count - index - 1) * minimum + requiredAfter, frames);
						if (keep) preview.push(element === 9 ? {
							type: "ARRAY",
							element_type: value.element_type,
							element_count: value.element_count,
							preview: value.value,
							preview_complete: value.complete
						} : value.value);
						complete &&= value.complete;
					}
					return {
						value: preview,
						element_type: NAMES[element] ?? null,
						element_count: count,
						complete
					};
				}
				const b = await this.#field(width);
				let value;
				switch (type) {
					case 0:
						value = b.u8(0);
						break;
					case 1:
						value = b.i8(0);
						break;
					case 2:
						value = b.u16(0);
						break;
					case 3:
						value = b.i16(0);
						break;
					case 4:
						value = b.u32(0);
						break;
					case 5:
						value = b.i32(0);
						break;
					case 6:
						value = b.f32(0);
						break;
					case 7: {
						const byte = b.u8(0);
						if (byte !== 0 && byte !== 1) rejectModel("GGUF boolean must be 0 or 1");
						value = byte === 1;
						break;
					}
					case 10:
						value = b.word(0, 64).toString();
						break;
					case 11:
						value = b.i64(0).toString();
						break;
					case 12:
						value = b.f64(0);
						break;
					default: return rejectModel("Unsupported GGUF scalar");
				}
				if (Object.is(value, -0)) value = "-0";
				if (typeof value === "number" && !Number.isFinite(value)) value = Number.isNaN(value) ? "NaN" : value > 0 ? "+Infinity" : "-Infinity";
				return {
					value: retain ? value : null,
					element_type: null,
					element_count: null,
					complete: true
				};
			}
			async read(progress) {
				const versionBytes = await this.reader.take(4);
				const littleVersion = new BinaryReader(versionBytes, true, "gguf").u32(0);
				const bigVersion = new BinaryReader(versionBytes, false, "gguf").u32(0);
				let version;
				if (littleVersion === 2 || littleVersion === 3) {
					this.#little = true;
					version = littleVersion;
				} else if (bigVersion === 2 || bigVersion === 3) {
					this.#little = false;
					version = bigVersion;
				} else {
					throw unsupportedInput(MODEL_FORMAT, `GGUF version bytes ${versionBytes.toString("hex")} are unsupported (little-endian ${String(littleVersion)}, big-endian ${String(bigVersion)}; byte order unknown); supported versions are 2 and 3`);
				}
				if (!this.#little && version !== 3) rejectModel("Big-endian GGUF requires version 3");
				const rawTensorCount = await this.#unsigned(8);
				const rawMetadataCount = await this.#unsigned(8);
				const minimumDirectoryBytes = rawTensorCount * BigInt(MIN_TENSOR_DESCRIPTOR_BYTES) + rawMetadataCount * BigInt(MIN_METADATA_ROW_BYTES);
				this.reader.requireFileExtent(this.reader.position, minimumDirectoryBytes);
				const tensorCount = Number(rawTensorCount);
				const metadataCount = Number(rawMetadataCount);
				progress?.onHeader({
					version,
					byte_order: this.#little ? "little" : "big",
					declared_metadata_count: metadataCount,
					declared_tensor_count: tensorCount
				});
				this.reader.guarantee(minimumDirectoryBytes);
				this.#budget.charge((tensorCount + metadataCount) * 512);
				const metadata = [];
				const keys = new Set();
				let alignment = 32;
				let remainingDirectoryBytes = Number(minimumDirectoryBytes);
				for (let index = 0; index < metadataCount; index++) {
					this.reader.guarantee(remainingDirectoryBytes);
					remainingDirectoryBytes -= MIN_METADATA_ROW_BYTES;
					const start = this.reader.position;
					const key = await this.#text(true, remainingDirectoryBytes + MIN_METADATA_ROW_BYTES - STRING_LENGTH_BYTES, 65535);
					if (!/^[a-z0-9]+(?:[_-][a-z0-9]+)*(?:\.[a-z0-9]+(?:[_-][a-z0-9]+)*)*$/u.test(key)) rejectModel("GGUF metadata keys require lowercase ASCII hierarchy components");
					if (keys.has(key)) rejectModel(`Duplicate GGUF metadata key ${key}`);
					keys.add(key);
					const type = Number(await this.#unsigned(4));
					const parsed = await this.#value(type, true, remainingDirectoryBytes);
					const row = {
						index,
						key,
						type: NAMES[type] ?? String(type),
						value: parsed.value,
						element_type: parsed.element_type,
						element_count: parsed.element_count,
						preview_complete: parsed.complete,
						source_offset: start,
						source_length: this.reader.position - start,
						json_pointer: null
					};
					if (key === "general.alignment") {
						if (type !== 4 || typeof parsed.value !== "number" || parsed.value === 0 || parsed.value % 8 !== 0) rejectModel("GGUF general.alignment must be a positive UINT32 multiple of eight");
						alignment = parsed.value;
						progress?.onAlignment(alignment);
					}
					metadata.push(row);
					progress?.onMetadata(row);
				}
				if (!keys.has("general.alignment")) progress?.onAlignment(alignment);
				progress?.onMetadataComplete();
				progress?.onTensorsStarted();
				const tensors = [];
				const names = new Set();
				const limitations = new Set();
				const note = (message) => {
					if (limitations.has(message)) return;
					limitations.add(message);
					progress?.onLimitation(message);
				};
				for (let index = 0; index < tensorCount; index++) {
					this.reader.guarantee(remainingDirectoryBytes);
					remainingDirectoryBytes -= MIN_TENSOR_DESCRIPTOR_BYTES;
					const start = this.reader.position;
					const name = await this.#text(true, remainingDirectoryBytes + MIN_TENSOR_DESCRIPTOR_BYTES - STRING_LENGTH_BYTES, 64);
					if (names.has(name)) rejectModel(`Duplicate GGUF tensor name ${name}`);
					names.add(name);
					const dimensions = Number(await this.#unsigned(4));
					if (dimensions > 4) rejectModel("GGUF tensor dimension count must be at most 4");
					this.reader.guarantee(dimensions * 8 + TENSOR_STORAGE_FIELDS_BYTES + remainingDirectoryBytes);
					const shape = [];
					let parameters = 1n;
					for (let d = 0; d < dimensions; d++) {
						const value = await this.#unsigned(8);
						shape.push(value.toString());
						parameters *= value;
					}
					const id = Number(await this.#unsigned(4));
					const rawOffset = await this.#unsigned(8);
					this.reader.requireFileExtent(0, rawOffset);
					const offset = Number(rawOffset);
					if (offset % alignment !== 0) rejectModel(`GGUF tensor ${name} offset is not aligned`);
					const type = ggmlType(id);
					let length = null;
					if (type !== undefined) {
						const [, rowElementMultiple, blockBytes, limitation] = type;
						if (BigInt(shape[0] ?? "1") % BigInt(rowElementMultiple) !== 0n) rejectModel(`GGUF tensor ${name} first dimension must be a multiple of ${String(rowElementMultiple)} elements`);
						if (limitation !== undefined && (parameters !== 0n || limitation.kind === "type-identity")) note(limitation.reason);
						if (parameters === 0n) length = 0;
						else if (blockBytes !== null) {
							const bytes = parameters / BigInt(rowElementMultiple) * BigInt(blockBytes);
							if (bytes > BigInt(this.reader.size)) rejectModel(`GGUF tensor ${name} declared byte length exceeds the file`);
							length = Number(bytes);
						}
					} else note(`Unknown tensor type UNKNOWN_${String(id)} prevents storage-size validation.`);
					const tensor = {
						index,
						name,
						type: type?.[0] ?? `UNKNOWN_${String(id)}`,
						type_id: id,
						shape,
						data_offset: offset,
						file_offset: null,
						byte_length: length,
						parameter_count: parameters.toString(),
						byte_length_state: length === null ? "unknown" : "derived",
						storage_validation: "not-established",
						source_offset: start,
						source_length: this.reader.position - start,
						json_pointer: null
					};
					tensors.push(tensor);
					progress?.onTensorDeclaration(tensor);
				}
				const directoryEnd = this.reader.position;
				const alignedDataOffset = Math.ceil(directoryEnd / alignment) * alignment;
				const tensor_data_offset = tensorCount === 0 && this.reader.size === directoryEnd ? directoryEnd : alignedDataOffset;
				if (tensor_data_offset > this.reader.size) rejectModel("GGUF tensor data section begins outside the file");
				for (const tensor of tensors) {
					const offset = BigInt(tensor_data_offset) + BigInt(tensor.data_offset);
					if (offset > BigInt(this.reader.size) || offset + BigInt(tensor.byte_length ?? 0) > BigInt(this.reader.size)) rejectModel(`GGUF tensor ${tensor.name} range is outside the file`);
					tensor.file_offset = Number(offset);
				}
				const completeTensors = tensors.map((tensor) => ({
					...tensor,
					file_offset: tensor.file_offset,
					storage_validation: tensor.byte_length === null ? "unknown" : "consistent"
				}));
				const intervals = completeTensors.filter((row) => row.byte_length !== null).sort((a, b) => a.file_offset - b.file_offset);
				let end = tensor_data_offset;
				for (const row of intervals) {
					if (row.file_offset < end && row.byte_length !== 0) rejectModel(`Overlapping tensor byte ranges at ${row.name}`);
					end = Math.max(end, row.file_offset + (row.byte_length ?? 0));
				}
				return {
					version,
					byte_order: this.#little ? "little" : "big",
					alignment,
					tensor_data_offset,
					metadata,
					tensors: completeTensors,
					limitations: [...limitations]
				};
			}
		};
	})))();
}

//#endregion
//#region dist/model/SafetensorsHeader.js
var JsonNumber, HeaderJson, objectOf, integersOf, exactOffset, readSafetensorsHeader;
function init_SafetensorsHeader() {
	return (init_SafetensorsHeader = __esmMin((() => {
		init_binaryContainer();
		init_strictUtf8();
		init_jsonDuplicateMember();
		init_jsonPointer();
		init_resources();
		init_ModelHeaderReader();
		init_ModelFormat();
		init_ModelTensorTypes();
		JsonNumber = class {
			raw;
			constructor(raw) {
				this.raw = raw;
			}
		};
		HeaderJson = class {
			text;
			budget;
			#position = 0;
			#nodes = 0;
			constructor(text, budget) {
				this.text = text;
				this.budget = budget;
			}
			#space() {
				while (" 	\r\n".includes(this.text[this.#position] ?? "x")) this.#position++;
			}
			#string() {
				const start = this.#position++;
				while (this.#position < this.text.length) {
					const c = this.text[this.#position++];
					if (c === "\\") this.#position++;
					else if (c === "\"") {
						const raw = this.text.slice(start, this.#position);
						this.budget.charge(6 * raw.length + 2);
						try {
							const value = parseJsonStringLiteral(raw);
							if (typeof value !== "string") return rejectModel("Invalid JSON string");
							for (const unit of value) {
								const code = unit.codePointAt(0) ?? 0;
								if (code >= 55296 && code <= 57343) rejectModel("Safetensors JSON contains an unpaired surrogate");
							}
							return value;
						} catch (cause) {
							if (cause instanceof SyntaxError) rejectModel("Invalid safetensors JSON string");
							throw cause;
						}
					}
				}
				return rejectModel("Unterminated safetensors JSON string");
			}
			*#value(depth) {
				if (++this.#nodes % 4096 === 0) yield;
				this.#space();
				this.budget.charge(64);
				if (depth > 32) throw modelCapacityFailure("json-nesting", `Safetensors JSON nesting exceeds ${String(32)} levels`);
				const c = this.text[this.#position];
				if (c === "\"") return this.#string();
				if (this.text.startsWith("null", this.#position)) {
					this.#position += 4;
					return null;
				}
				if (this.text.startsWith("true", this.#position)) {
					this.#position += 4;
					return true;
				}
				if (this.text.startsWith("false", this.#position)) {
					this.#position += 5;
					return false;
				}
				if (c === "{" || c === "[") {
					this.#position++;
					const object = Object.create(null);
					const array = [];
					const close = c === "{" ? "}" : "]";
					this.#space();
					if (this.text[this.#position] === close) {
						this.#position++;
						return c === "{" ? object : array;
					}
					while (true) {
						this.#space();
						if (c === "{") {
							if (this.text[this.#position] !== "\"") rejectModel("Expected safetensors JSON object key");
							const key = this.#string();
							if (Object.hasOwn(object, key)) rejectModel(`Duplicate safetensors JSON key ${key}`);
							this.#space();
							if (this.text[this.#position++] !== ":") rejectModel("Expected safetensors JSON colon");
							object[key] = yield* this.#value(depth + 1);
						} else array.push(yield* this.#value(depth + 1));
						this.#space();
						const next = this.text[this.#position++];
						if (next === close) return c === "{" ? object : array;
						if (next !== ",") rejectModel("Invalid safetensors JSON container");
					}
				}
				const start = this.#position;
				if (this.text[this.#position] === "-") this.#position++;
				const integerStart = this.#position;
				if (this.text[this.#position] === "0") this.#position++;
				else if (/^[1-9]$/u.test(this.text[this.#position] ?? "")) {
					this.#position++;
					while (/^[0-9]$/u.test(this.text[this.#position] ?? "")) this.#position++;
				}
				if (this.#position === integerStart) return rejectModel("Invalid safetensors JSON value");
				if (this.text[this.#position] === ".") {
					this.#position++;
					const fractionStart = this.#position;
					while (/^[0-9]$/u.test(this.text[this.#position] ?? "")) this.#position++;
					if (this.#position === fractionStart) return rejectModel("Invalid safetensors JSON value");
				}
				if (/[eE]/u.test(this.text[this.#position] ?? "")) {
					this.#position++;
					if (/[+-]/u.test(this.text[this.#position] ?? "")) this.#position++;
					const exponentStart = this.#position;
					while (/^[0-9]$/u.test(this.text[this.#position] ?? "")) this.#position++;
					if (this.#position === exponentStart) return rejectModel("Invalid safetensors JSON value");
				}
				const numeric = this.text.slice(start, this.#position);
				if (/^(?:0|[1-9][0-9]*)$/u.test(numeric)) {
					if (numeric.length > 20) return new JsonNumber(numeric);
					const integer = BigInt(numeric);
					if (integer <= 18446744073709551615n) return integer;
				}
				return new JsonNumber(numeric);
			}
			*read() {
				if (this.text[0] !== "{") rejectModel("Safetensors header must begin with a JSON object");
				const value = yield* this.#value(0);
				this.#space();
				if (this.#position !== this.text.length) rejectModel("Trailing non-whitespace safetensors header bytes");
				return value;
			}
		};
		objectOf = (value) => {
			if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value) || value instanceof JsonNumber) return rejectModel("Expected safetensors header object");
			return value;
		};
		integersOf = (value) => {
			if (!Array.isArray(value) || !value.every((item) => typeof item === "bigint")) return rejectModel("Expected safetensors integer array");
			return value;
		};
		exactOffset = (value) => {
			if (value > BigInt(Number.MAX_SAFE_INTEGER)) throw modelCapacityFailure("exact-offset", "Safetensors data offset exceeds exact host offset precision");
			return Number(value);
		};
		readSafetensorsHeader = async (reader, first) => {
			const budget = new ModelReportBudget();
			const protocol = first[1] ?? 0;
			const pickle = first[0] === 128 && protocol >= 2 && protocol <= 5;
			const zip = first.equals(Buffer.from([
				80,
				75,
				3,
				4
			]));
			if ((pickle || zip) && reader.size < 9) rejectPickle();
			const second = await reader.take(4);
			reader.excludeSafetensorsLengthPrefix();
			const length = new BinaryReader(first, true, "safetensors").word(0, 32) + (new BinaryReader(second, true, "safetensors").word(0, 32) << 32n);
			const brace = length === 0n ? undefined : (await reader.take(1))[0];
			if ((pickle || zip) && (brace !== 123 || length > BigInt(1e8))) rejectPickle();
			if (brace !== 123) rejectModel("File does not contain a GGUF or safetensors header");
			reader.requireFileExtent(8, length);
			const size = Number(length);
			reader.guarantee(size - 1);
			budget.charge(2 * size);
			let text;
			try {
				text = "{" + decodeStrictUtf8(await reader.take(size - 1), "preserve");
			} catch (cause) {
				if (cause instanceof TypeError) rejectModel("Safetensors header is not valid UTF-8");
				throw cause;
			}
			const steps = new HeaderJson(text, budget).read();
			let step = steps.next();
			while (!step.done) {
				await setImmediate();
				assertArtifactReadActive(reader.signal);
				step = steps.next();
			}
			const root = objectOf(step.value);
			const source = {
				source_offset: 8,
				source_length: size
			};
			const metadata = [];
			if (Object.hasOwn(root, "__metadata__") && root.__metadata__ !== null) {
				for (const [key, value] of Object.entries(objectOf(root.__metadata__))) {
					if (typeof value !== "string") rejectModel("Safetensors __metadata__ values must be strings");
					metadata.push({
						index: metadata.length,
						key,
						type: "STRING",
						value,
						element_type: null,
						element_count: null,
						preview_complete: true,
						...source,
						json_pointer: `/__metadata__/${escapeJsonPointerToken(key)}`
					});
				}
			}
			const tensors = [];
			const unknownTypes = new Set();
			const tensor_data_offset = 8 + size;
			const names = Object.keys(root).filter((name) => name !== "__metadata__").sort();
			budget.charge(names.length * 512);
			for (const name of names) {
				const entry = objectOf(root[name]);
				if (!Object.hasOwn(entry, "dtype") || !Object.hasOwn(entry, "shape") || !Object.hasOwn(entry, "data_offsets")) rejectModel(`Safetensors tensor ${name} must declare dtype, shape and data_offsets`);
				const type = entry.dtype;
				if (typeof type !== "string") rejectModel(`Safetensors tensor ${name} dtype must be a string`);
				const shape = integersOf(entry.shape);
				const offsets = integersOf(entry.data_offsets);
				if (offsets.length !== 2) rejectModel(`Safetensors tensor ${name} requires two data offsets`);
				const rawStart = offsets[0] ?? 0n;
				const rawEnd = offsets[1] ?? 0n;
				if (rawStart < 0n || rawEnd < rawStart) rejectModel(`Safetensors tensor ${name} has an invalid data range`);
				reader.requireFileExtent(tensor_data_offset, rawEnd);
				const start = exactOffset(rawStart);
				const end = exactOffset(rawEnd);
				let parameters = 1n;
				for (const dimension of shape) {
					parameters *= dimension;
					if (parameters > 18446744073709551615n) rejectModel(`Safetensors tensor ${name} parameter count overflows uint64`);
				}
				const bits = safetensorsBits(type);
				if (bits === undefined) unknownTypes.add(type);
				if (bits !== undefined) {
					const expected = parameters * BigInt(bits);
					if (expected % 8n !== 0n || expected / 8n !== BigInt(end - start)) rejectModel(`Safetensors tensor ${name} byte length does not match dtype and shape`);
				}
				tensors.push({
					index: tensors.length,
					name,
					type,
					type_id: null,
					shape: shape.map(String),
					data_offset: start,
					file_offset: tensor_data_offset + start,
					byte_length: end - start,
					parameter_count: parameters.toString(),
					byte_length_state: "declared",
					storage_validation: bits === undefined ? "unknown" : "consistent",
					...source,
					json_pointer: `/${escapeJsonPointerToken(name)}`
				});
			}
			const ordered = [...tensors].sort((a, b) => a.data_offset - b.data_offset || (a.byte_length ?? 0) - (b.byte_length ?? 0));
			let end = 0;
			for (const tensor of ordered) {
				if (tensor.data_offset !== end) rejectModel(`Safetensors data ${tensor.data_offset < end ? "overlap" : "gap"} before ${tensor.name}: expected ${String(end)}, observed ${String(tensor.data_offset)}`);
				end = tensor.data_offset + (tensor.byte_length ?? 0);
			}
			if (end !== reader.size - tensor_data_offset) rejectModel(`Safetensors unindexed trailing data: ${String(reader.size - tensor_data_offset - end)} bytes`);
			return {
				version: null,
				byte_order: "little",
				alignment: null,
				tensor_data_offset,
				metadata,
				tensors,
				limitations: unknownTypes.size === 0 ? [] : [`Unknown tensor types prevent storage-size validation: ${[...unknownTypes].join(", ")}`]
			};
		};
	})))();
}

//#endregion
//#region dist/model/ModelArtifactProvider.js
var OPERATION, ModelArtifactProvider;
function init_ModelArtifactProvider() {
	return (init_ModelArtifactProvider = __esmMin((() => {
		init_resources();
		init_ModelArtifactProviderIdentity();
		init_modelArtifactEvidence();
		init_modelArtifact();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_result();
		init_analysisErrorCleanup();
		init_ModelHeaderReader();
		init_GgufHeader();
		init_SafetensorsHeader();
		init_ModelFormat();
		init_jsonValueByteLength();
		init_parseFailureAnalysisError();
		init_providerCleanupError();
		init_RegularFile();
		init_errorMessage();
		OPERATION = "inspect_model_artifact";
		ModelArtifactProvider = class {
			identity = MODEL_ARTIFACT_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			#busy = false;
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					const error = new ProviderCleanupError(this.identity.id, this.#resources.cleanupResources, {}, {
						cause,
						operation: OPERATION
					});
					bindArtifactFileCleanup(cause, error);
					throw error;
				}
			}
			async inspect(input, options) {
				if (this.#busy) return err(new AnalysisResourceConstraintError(OPERATION, "capacity", "One model inspection is already active", { concurrent_inspections: 1 }, {
					retryable: true,
					measuredExhaustion: true
				}));
				this.#busy = true;
				let partialProgress;
				try {
					return ok(await this.#resources.run(() => withArtifactRegularFile(input.path, this.#resources, options?.signal, ({ handle: file }) => this.#read(file, input, options?.signal, (progress) => {
						partialProgress = progress;
					}))));
				} catch (cause) {
					const { cause: primary, origin } = artifactFilePrimaryFacts(cause);
					const capacityError = modelCapacityConstraint(OPERATION, primary);
					const formatError = parseFailureAnalysisError(OPERATION, input.path, primary);
					let error;
					if (origin === "owned-or-classified" && primary instanceof AnalysisError) error = primary;
					else if (capacityError !== undefined) error = capacityError;
					else if (formatError !== undefined) error = formatError;
					else if (origin === "owned-or-classified" && primary instanceof ArtifactReaderFailure && primary.reason === "cancelled") error = cancelledBy(OPERATION, carriedReason(artifactFileCancellationCause(primary)));
					else if (origin === "owned-or-classified" && primary instanceof ArtifactReaderFailure && primary.reason === "integrity") error = readerIntegrityFailure(OPERATION, input.path, primary, { cause });
					else if (primary instanceof Error && "code" in primary && (primary.code === "EACCES" || primary.code === "EPERM")) error = new AnalysisAccessDeniedError(OPERATION, input.path, primary.code, { cause: primary });
					else if (origin === "owned-or-classified" && primary instanceof ArtifactReaderFailure && primary.reason === "limit") error = new AnalysisResourceConstraintError(OPERATION, "memory", primary.message, {}, { cause: primary });
					else if (isSelectedRegularFileError(primary)) error = selectedFileTargetError(input.path, primary, cause);
					else error = new ProviderAdapterError(this.identity.id, OPERATION, {
						cause,
						diagnostics: {
							path: input.path,
							reason: errorMessage(primary)
						}
					});
					if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
						const cleanup = new ProviderCleanupError(this.identity.id, cause.cleanup.resources, { reason: cause.cleanup.reason }, {
							cause,
							operation: OPERATION
						});
						error = analysisErrorWithCleanupFailure(error, cleanup, OPERATION);
					}
					const completed = artifactFileCompletion(cause);
					if (completed !== undefined) {
						const report = modelArtifactSchema.safeParse(completed.value);
						if (report.success) error.retainPartialObservation(createModelArtifactEvidence(report.data, this.identity, input));
					}
					if (error.partialObservation === undefined && partialProgress !== undefined && (partialProgress.coverage.header === "complete" || partialProgress.declared_metadata_count !== null || partialProgress.declared_tensor_count !== null || partialProgress.metadata.length > 0 || partialProgress.tensor_declarations.length > 0 || partialProgress.tensors.length > 0)) {
						const parsed = modelArtifactPartialSchema.safeParse(partialProgress);
						if (parsed.success) error.retainPartialObservation(createModelArtifactPartialEvidence(parsed.data, this.identity, input));
					}
					bindArtifactFileCleanup(cause, error);
					return err(error);
				} finally {
					this.#busy = false;
				}
			}
			async #read(file, input, signal, retainProgress) {
				const initial = await file.stat({ bigint: true });
				if (initial.size > BigInt(Number.MAX_SAFE_INTEGER)) throw modelCapacityFailure("exact-offset", "Model file exceeds exact host offset precision");
				const reader = new ModelHeaderReader(file, Number(initial.size), signal);
				const first = await reader.take(4);
				const format = first.equals(Buffer.from("GGUF")) ? "gguf" : "safetensors";
				const partial = {
					kind: "model-artifact-partial",
					artifact: {
						path: input.path,
						observed_file_size: Number(initial.size),
						header_sha256: null,
						sha256: null,
						file_identity: "unverified"
					},
					format,
					version: null,
					byte_order: null,
					alignment: null,
					declared_metadata_count: null,
					declared_tensor_count: null,
					metadata: [],
					tensor_declarations: [],
					tensors: [],
					coverage: {
						header: "partial",
						metadata: "not-started",
						tensors: "not-started"
					},
					limitations: [
						"This partial observation contains only rows fully parsed before the interrupted read.",
						"Header and full-file digests and final file identity are unknown because finalization did not complete.",
						"No model behavior or tensor payload values were interpreted."
					]
				};
				retainProgress(partial);
				const parsed = format === "gguf" ? await new GgufHeader(reader).read({
					onHeader: (info) => {
						partial.version = info.version;
						partial.byte_order = info.byte_order;
						partial.declared_metadata_count = info.declared_metadata_count;
						partial.declared_tensor_count = info.declared_tensor_count;
						partial.coverage.metadata = "partial";
					},
					onMetadata: (row) => partial.metadata.push(row),
					onAlignment: (alignment) => {
						partial.alignment = alignment;
					},
					onMetadataComplete: () => {
						partial.coverage.metadata = "complete";
					},
					onTensorsStarted: () => {
						partial.coverage.tensors = "partial";
					},
					onTensorDeclaration: (row) => partial.tensor_declarations.push(row),
					onLimitation: (message) => partial.limitations.push(message)
				}) : await readSafetensorsHeader(reader, first);
				partial.version = parsed.version;
				partial.byte_order = parsed.byte_order;
				partial.alignment = parsed.alignment;
				partial.metadata = parsed.metadata;
				partial.declared_metadata_count = parsed.metadata.length;
				partial.declared_tensor_count = parsed.tensors.length;
				partial.tensor_declarations = [];
				partial.tensors = parsed.tensors;
				partial.limitations = [...new Set([...partial.limitations, ...parsed.limitations])];
				partial.coverage = {
					header: "complete",
					metadata: "complete",
					tensors: "complete"
				};
				const header_length = reader.position;
				const hashes = await reader.finish(input.hash === "full");
				const after = await file.stat({ bigint: true });
				const named = await lstat(input.path, { bigint: true }).catch((cause) => {
					if (cause instanceof Error && "code" in cause && [
						"ENOENT",
						"ENOTDIR",
						"ELOOP"
					].includes(String(cause.code))) throw new ArtifactReaderFailure("integrity", "Selected model path changed during inspection", {
						cause,
						integrityCheck: "container-identity"
					});
					throw cause;
				});
				if ([after, named].some((stat) => !sameRegularFileState(initial, stat))) throw new ArtifactReaderFailure("integrity", "Model file changed during inspection", { integrityCheck: "container-identity" });
				const groups = new Map();
				let parameters = 0n;
				let bytes = 0;
				for (const row of parsed.tensors) {
					const count = BigInt(row.parameter_count);
					parameters += count;
					bytes = bytes === null || row.byte_length === null ? null : bytes + row.byte_length;
					const group = groups.get(row.type) ?? {
						type: row.type,
						tensors: 0,
						parameter_count: 0n,
						bytes: 0
					};
					group.tensors++;
					group.parameter_count += count;
					group.bytes = group.bytes === null || row.byte_length === null ? null : group.bytes + row.byte_length;
					groups.set(row.type, group);
				}
				const report = {
					artifact: {
						path: input.path,
						file_size: Number(initial.size),
						header_length,
						...hashes,
						read_scope: input.hash === "full" ? "full-file" : "header"
					},
					format,
					...parsed,
					totals: {
						confidence: "derived",
						parameter_count: parameters.toString(),
						tensor_bytes: bytes,
						by_type: [...groups.values()].map((group) => ({
							...group,
							parameter_count: group.parameter_count.toString()
						}))
					},
					coverage: {
						header: "complete",
						tensor_data: "not-interpreted",
						array_values: parsed.metadata.every((row) => row.preview_complete) ? "complete" : "partial",
						storage_sizes: parsed.tensors.every((row) => row.storage_validation === "consistent") ? "complete" : "partial",
						tensor_ranges: parsed.tensors.every((row) => row.byte_length !== null) ? "complete" : "partial"
					},
					limitations: [
						"Facts are file declarations; model behavior, weight values and compatibility with an inference runtime were not verified.",
						"Header SHA-256 commits only to the recorded prefix; file size is a separate observation. Different weights may share these declarations.",
						...input.hash === "header" ? ["Full-file SHA-256 is unknown because tensor data was not read."] : ["Full-file SHA-256 required streaming the entire file, including tensor data, without interpreting it."],
						...parsed.metadata.some((row) => !row.preview_complete) ? ["Metadata arrays retain at most eight elements per array; remaining values are omitted, with exact declared counts and source byte ranges."] : [],
						...parsed.limitations
					]
				};
				if (jsonValueByteLength(report, 33554432) > 33554432) throw modelCapacityFailure("report-bytes", "Model report exceeds 32 MiB");
				return modelArtifactSchema.parse(report);
			}
		};
	})))();
}

//#endregion
//#region dist/composition/model.js
var createModelArtifactService;
function init_model() {
	return (init_model = __esmMin((() => {
		init_ModelArtifactService();
		init_ModelArtifactProvider();
		createModelArtifactService = () => new ModelArtifactService(new ModelArtifactProvider());
	})))();
}

//#endregion
//#region dist/cli/modelCommands.js
var modelCommands_exports = /* @__PURE__ */ __exportAll({ registerModelCommands: () => registerModelCommands });
var registerModelCommands;
function init_modelCommands() {
	return (init_modelCommands = __esmMin((() => {
		init_model();
		init_modelToolContracts();
		init_contractCommand();
		registerModelCommands = (cli, logger) => {
			const deliver = deliverWithService(createModelArtifactService, "model-artifact");
			registerContractCommand(cli, logger, INSPECT_MODEL_ARTIFACT_CONTRACT, {
				description: "Inspect GGUF or safetensors headers without loading model weights",
				positionals: ["path"],
				callerPaths: ["path"],
				evidenceDelivery: true,
				viewDelivery: {
					invalidJson: "view must be a JSON model page selection",
					kind: "model-artifact"
				},
				fields: {
					path: { description: "Local model file, detected by content" },
					hash: { description: "header reads declarations only; full additionally streams all bytes for SHA-256" },
					view: { description: "JSON model page selection; requires --detail summary and --evidence_output" }
				}
			}, (input, context) => deliver({
				...input,
				detail: "complete"
			}, context));
		};
	})))();
}

//#endregion
export { init_modelCommands, modelCommands_exports };