import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisError, AnalysisOutputError, AnalysisResourceConstraintError, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_isRecord, init_sha256Hex, isRecord, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { ZstandardFrameAllowanceError, decodeStrictUtf8, init_parseFailureAnalysisError, init_strictUtf8, init_zstandardFrameAllowance, parseFailureAnalysisError, parseLimitConstraint, projectZstandardFrameAllowance, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryFormatFailure, BinaryReader, BinaryResourceFailure, init_binaryContainer, isBinaryStringReadLimit } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { ArtifactReaderFailure, ArtifactResourceScope, artifactFileCancellationCause, artifactFileCompletion, artifactFilePrimaryFacts, assertArtifactReadActive, bindArtifactFileCleanup, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_RegularFile, init_RegularFileErrorProjection, init_StableArtifactFailure, init_resources, isSelectedRegularFileError, readerIntegrityFailure, sameRegularFileState, selectedFileTargetError, withArtifactRegularFile, yieldArtifactRead } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { contractNamed, deliverWithService, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { gpuCodeObjectsPartialSchema, gpuCodeObjectsSchema, init_gpuCodeObjects, inspectGpuCodeObjectsInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { init_AnalysisViewService, projectRetainedAnalysis, requireAnalysisViewRetention } from "./AnalysisViewService-D_M3W3PD.js";
import { elfSymbolSize, init_elfSymbol, readElfSymbol } from "./elfSymbol-BFeMfDna.js";
import { elfNoteSectionStorage, init_elfNoteLayout, readElfNoteFrame } from "./elfNoteLayout-MbAzXIGv.js";
import { init_nodeCodecResult, nodeCodecResult } from "./nodeCodecResult-Ky56xTop.js";
import { decodeZstandardFramesCooperative, init_zstandardExactFrame } from "./zstandardExactFrame-DU_U6T0l.js";
import { decodeElfSectionNameRequestCooperative, init_elfSectionNameTable, init_nativeSectionDirectory, readElfSectionDirectory, readPeSectionDirectory } from "./nativeSectionDirectory-FUNOhzEu.js";
import { ELF_SHN_XINDEX, ElfSymbolSectionIndexTables, init_elfSymbolSectionIndex, readElfSymbolSectionReference } from "./elfSymbolSectionIndex-BmazlrNY.js";
import { init_elfStringBytes, readElfStringBytes } from "./elfStringBytes-DXkwW9pI.js";
import { decodeLz4Block, init_Lz4Block } from "./Lz4Block-CsrHKTRN.js";
import { GPU_TOOL_CONTRACTS, init_gpuToolContracts } from "./gpuToolContracts-B3SmOPZd.js";
import { promisify } from "node:util";
import { createHash } from "node:crypto";
import { lstat } from "node:fs/promises";
import { scheduler } from "node:timers/promises";
import { inflate } from "node:zlib";
import { decode } from "@msgpack/msgpack";

//#region dist/domain/gpu/gpuCodeObjectsEvidence.js
var gpuParameters, createGpuCodeObjectsEvidence, createGpuCodeObjectsPartialEvidence;
function init_gpuCodeObjectsEvidence() {
	return (init_gpuCodeObjectsEvidence = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		gpuParameters = (parameters) => ({
			path: parameters.path,
			analysis: parameters.analysis,
			...parameters.object_ids === undefined ? {} : { object_ids: parameters.object_ids },
			...parameters.targets === undefined ? {} : { targets: parameters.targets },
			...parameters.expected_sha256 === undefined ? {} : { expected_sha256: parameters.expected_sha256 }
		});
		createGpuCodeObjectsEvidence = (report, provider, parameters) => createEvidence({
			path: report.artifact.path,
			sha256: report.artifact.sha256,
			format: "file"
		}, provider, {
			operation: "inspect_gpu_code_objects",
			parameters: gpuParameters(parameters),
			result: report,
			confidence: "observed",
			locations: [{
				kind: "artifact-path",
				path: report.artifact.path
			}],
			limitations: report.limitations
		});
		createGpuCodeObjectsPartialEvidence = (report, provider, parameters) => createEvidence(unknownTarget("not-observed"), provider, {
			operation: "inspect_gpu_code_objects",
			parameters: gpuParameters(parameters),
			result: report,
			confidence: "observed",
			locations: [{
				kind: "artifact-path",
				path: report.artifact.path
			}],
			limitations: ["The interrupted inspection did not complete final file identity verification; root digest and completeness are unknown.", ...report.limitations]
		});
	})))();
}

//#endregion
//#region dist/application/gpu/GpuCodeObjectsService.js
var GpuCodeObjectsService;
function init_GpuCodeObjectsService() {
	return (init_GpuCodeObjectsService = __esmMin((() => {
		init_gpuCodeObjects();
		init_inputIssueProjection();
		init_analysisErrorCore();
		init_gpuCodeObjectsEvidence();
		init_result();
		init_AnalysisViewService();
		GpuCodeObjectsService = class {
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
				const input = inspectGpuCodeObjectsInputSchema.safeParse(raw);
				if (!input.success) return err(analysisInputErrorFromIssues("inspect_gpu_code_objects", input.error.issues, raw, { cause: input.error }));
				if (options?.signal?.aborted) return err(cancelledBy("inspect_gpu_code_objects", options.signal));
				const { detail, view, ...parameters } = input.data;
				if (detail === "summary") {
					const ready = requireAnalysisViewRetention("inspect_gpu_code_objects", retention);
					if (!ready.ok) return ready;
				}
				const inspected = await this.provider.inspect(parameters, options);
				if (!inspected.ok) return inspected;
				const checked = gpuCodeObjectsSchema.safeParse(inspected.value);
				if (!checked.success || checked.data.artifact.path !== parameters.path || checked.data.analysis !== parameters.analysis || parameters.expected_sha256 !== undefined && checked.data.artifact.sha256 !== parameters.expected_sha256) return err(new AnalysisOutputError("inspect_gpu_code_objects", "GPU reader changed the selected input or returned invalid facts"));
				const report = checked.data;
				const evidence = createGpuCodeObjectsEvidence(report, this.provider.identity, parameters);
				if (options?.signal?.aborted) return err(cancelledBy("inspect_gpu_code_objects", options.signal, { partialObservation: evidence }));
				return detail === "summary" ? projectRetainedAnalysis(evidence, retention, view === undefined ? { kind: "summary" } : {
					kind: "gpu-code-objects",
					...view
				}) : ok(evidence);
			}
		};
	})))();
}

//#endregion
//#region dist/gpu/GpuCodeObjectsProviderIdentity.js
var GPU_CODE_OBJECTS_PROVIDER_IDENTITY;
function init_GpuCodeObjectsProviderIdentity() {
	return (init_GpuCodeObjectsProviderIdentity = __esmMin((() => {
		GPU_CODE_OBJECTS_PROVIDER_IDENTITY = {
			id: "gpu-code-objects",
			name: "REA static GPU code-object reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/gpu/GpuSource.js
var GPU_OBJECT_BYTES, GPU_REPORT_BYTES, GpuReportCapacityFailure, rejectGpu, gpuCount, checkGpuRange, GpuFileSource, GpuBufferSource, readGpuNativeDirectory, nextGpuContainerOffset;
function init_GpuSource() {
	return (init_GpuSource = __esmMin((() => {
		init_resources();
		init_binaryContainer();
		init_elfSectionNameTable();
		GPU_OBJECT_BYTES = 128 * 1024 * 1024;
		GPU_REPORT_BYTES = 16 * 1024 * 1024;
		GpuReportCapacityFailure = class extends BinaryResourceFailure {
			constructor() {
				super("structure", GPU_REPORT_BYTES, "GPU facts exceed the 16 MiB retained report budget", "gpu-retained-report-bytes", "bytes");
			}
		};
		rejectGpu = (message) => {
			throw new BinaryFormatFailure("malformed", message);
		};
		gpuCount = (value) => {
			if (value < 0n || value > BigInt(Number.MAX_SAFE_INTEGER)) rejectGpu("GPU range exceeds exact host offset precision");
			return Number(value);
		};
		checkGpuRange = (length, offset, size) => {
			if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || offset < 0 || size < 0 || offset > length || size > length - offset) rejectGpu("GPU byte range is outside its containing object");
			if (size > 134217728) throw new BinaryResourceFailure("structure", GPU_OBJECT_BYTES, "GPU object exceeds the 128 MiB decoding budget");
		};
		GpuFileSource = class {
			file;
			size;
			signal;
			containerId = null;
			bytesRead = 0;
			constructor(file, size, signal) {
				this.file = file;
				this.size = size;
				this.signal = signal;
			}
			async read(offset, size) {
				checkGpuRange(this.size, offset, size);
				const bytes = Buffer.alloc(size);
				let position = 0;
				while (position < size) {
					assertArtifactReadActive(this.signal);
					const result = await this.file.read(bytes, position, size - position, offset + position);
					if (result.bytesRead === 0) throw new ArtifactReaderFailure("integrity", "GPU source was truncated during inspection", { integrityCheck: "read-coverage" });
					position += result.bytesRead;
					this.bytesRead += result.bytesRead;
				}
				return bytes;
			}
			async digest() {
				const hash = createHash("sha256");
				for (let position = 0; position < this.size;) {
					const bytes = await this.read(position, Math.min(1024 * 1024, this.size - position));
					hash.update(bytes);
					position += bytes.length;
				}
				return hash.digest("hex");
			}
		};
		GpuBufferSource = class {
			bytes;
			containerId;
			size;
			constructor(bytes, containerId) {
				this.bytes = bytes;
				this.containerId = containerId;
				this.size = bytes.length;
			}
			async read(offset, size) {
				checkGpuRange(this.size, offset, size);
				return this.bytes.subarray(offset, offset + size);
			}
		};
		readGpuNativeDirectory = async (source, steps, pause) => {
			let next = steps.next();
			while (!next.done) {
				const step = next.value;
				if (step.sectionNames !== undefined && step.fulfillSectionNames !== undefined) {
					step.fulfillSectionNames(await decodeElfSectionNameRequestCooperative(step.sectionNames, pause));
					next = steps.next(Buffer.alloc(0));
					continue;
				}
				next = steps.next(await source.read(step.offset, step.size));
			}
			return next.value;
		};
		nextGpuContainerOffset = async (source, start) => {
			let width = 64;
			for (let position = start; position < source.size;) {
				const bytes = await source.read(position, Math.min(width, source.size - position));
				const index = bytes.findIndex((byte) => byte !== 0);
				if (index >= 0) return position + index;
				position += bytes.length;
				width = 65536;
			}
			return source.size;
		};
	})))();
}

//#endregion
//#region dist/gpu/GpuObject.js
var recordDeclaredGpuDecodedSize, gpuLocation, gpuObject;
function init_GpuObject() {
	return (init_GpuObject = __esmMin((() => {
		recordDeclaredGpuDecodedSize = (row, size) => {
			if (size > Number.MAX_SAFE_INTEGER) {
				row.decoded_size = null;
				row.limitations.push(`Declared decoded size is ${String(size)} bytes, outside the exact integer range of decoded_size`);
			} else {
				row.decoded_size = Number(size);
			}
		};
		gpuLocation = (source, offset, size) => ({
			container_id: source.containerId,
			offset,
			size,
			section_index: null,
			section_name: null
		});
		gpuObject = (source, input) => {
			const { offset, size, kind, metadata = {
				offset,
				size: 0
			} } = input;
			return {
				id: `${source.containerId ?? "file"}@${metadata.offset.toString(16)}`,
				parent_id: source.containerId,
				kind,
				target: null,
				payload_target: null,
				cuda_target_header: null,
				amd_target_metadata: null,
				target_consistency: "unexamined",
				bundle_id: null,
				compression: "none",
				compression_id: null,
				encoded_size: size,
				decoded_size: size,
				sha256: null,
				raw_flags: null,
				location: gpuLocation(source, offset, size),
				metadata_location: gpuLocation(source, metadata.offset, metadata.size),
				inspection: "inventory",
				limitations: []
			};
		};
	})))();
}

//#endregion
//#region dist/gpu/AmdGpuTarget.js
var processor, targetFeaturesSource, targetIdSource, targetId, targetTripleSource, bundleTriple, bundleTarget, noteTarget, ELF_PROCESSORS, parseAmdGpuTargetId, isAmdGpuBundleId, readAmdGpuBundleTarget, readAmdGpuNoteTarget, readAmdGpuElfProcessor;
function init_AmdGpuTarget() {
	return (init_AmdGpuTarget = __esmMin((() => {
		processor = String.raw`gfx[0-9a-z]+(?:-[0-9a-z]+)*`;
		targetFeaturesSource = String.raw`(?:(?::[a-z0-9_-]+[+-])|(?:\+[a-z0-9_-]+))*`;
		targetIdSource = `${processor}${targetFeaturesSource}`;
		targetId = new RegExp(`^(${processor})${targetFeaturesSource}$`, "iu");
		targetTripleSource = String.raw`(?:amdgcn|amdgpu(?:[0-9]+(?:\.[0-9a-f]+)?)?)-amd-amdhsa`;
		bundleTriple = new RegExp(`^(?:hip|hipv4)-${targetTripleSource}-`, "iu");
		bundleTarget = new RegExp(`(?:--|-)(${targetIdSource})$`, "iu");
		noteTarget = new RegExp(`^${targetTripleSource}(?:--|-unknown-)(${targetIdSource})$`, "iu");
		ELF_PROCESSORS = {
			32: "gfx600",
			33: "gfx601",
			34: "gfx700",
			35: "gfx701",
			36: "gfx702",
			37: "gfx703",
			38: "gfx704",
			40: "gfx801",
			41: "gfx802",
			42: "gfx803",
			43: "gfx810",
			44: "gfx900",
			45: "gfx902",
			46: "gfx904",
			47: "gfx906",
			48: "gfx908",
			49: "gfx909",
			50: "gfx90c",
			51: "gfx1010",
			52: "gfx1011",
			53: "gfx1012",
			54: "gfx1030",
			55: "gfx1031",
			56: "gfx1032",
			57: "gfx1033",
			58: "gfx602",
			59: "gfx705",
			60: "gfx805",
			61: "gfx1035",
			62: "gfx1034",
			63: "gfx90a",
			65: "gfx1100",
			66: "gfx1013",
			67: "gfx1150",
			68: "gfx1103",
			69: "gfx1036",
			70: "gfx1101",
			71: "gfx1102",
			72: "gfx1200",
			73: "gfx1250",
			74: "gfx1151",
			76: "gfx942",
			78: "gfx1201",
			79: "gfx950",
			80: "gfx1310",
			81: "gfx9-generic",
			82: "gfx10-1-generic",
			83: "gfx10-3-generic",
			84: "gfx11-generic",
			85: "gfx1152",
			87: "gfx1154",
			88: "gfx1153",
			89: "gfx12-generic",
			90: "gfx1251",
			91: "gfx12-5-generic",
			92: "gfx1172",
			93: "gfx1170",
			94: "gfx1171",
			95: "gfx9-4-generic",
			98: "gfx11-7-generic",
			99: "gfx13-generic",
			235: "gfx1250-strict"
		};
		parseAmdGpuTargetId = (value) => {
			const match = targetId.exec(value);
			return match?.[1] === undefined ? null : {
				key: value,
				processor: match[1].toLowerCase()
			};
		};
		isAmdGpuBundleId = (name) => bundleTriple.test(name);
		readAmdGpuBundleTarget = (name) => {
			if (!isAmdGpuBundleId(name)) return null;
			const target = bundleTarget.exec(name)?.[1];
			return target === undefined ? null : parseAmdGpuTargetId(target);
		};
		readAmdGpuNoteTarget = (target) => {
			const value = noteTarget.exec(target)?.[1];
			return value === undefined ? null : parseAmdGpuTargetId(value);
		};
		readAmdGpuElfProcessor = (flags) => ELF_PROCESSORS[flags & 255] ?? null;
	})))();
}

//#endregion
//#region dist/gpu/ClangOffloadBundle.js
var CLANG_BUNDLE_MAGIC, CCOB_MAGIC, CLANG_BUNDLE_HEADER_BYTES, CLANG_BUNDLE_ENTRY_BYTES, CLANG_BUNDLE_MAX_ENTRIES, CLANG_BUNDLE_MAX_ID_BYTES, readClangBundleDirectory, readCcobHeader, findLegacyCcobRecoveryTotal;
function init_ClangOffloadBundle() {
	return (init_ClangOffloadBundle = __esmMin((() => {
		init_strictUtf8();
		init_binaryContainer();
		init_resources();
		init_GpuSource();
		init_GpuObject();
		init_AmdGpuTarget();
		CLANG_BUNDLE_MAGIC = Buffer.from("__CLANG_OFFLOAD_BUNDLE__");
		CCOB_MAGIC = Buffer.from("CCOB");
		CLANG_BUNDLE_HEADER_BYTES = 32;
		CLANG_BUNDLE_ENTRY_BYTES = 24;
		CLANG_BUNDLE_MAX_ENTRIES = 65536;
		CLANG_BUNDLE_MAX_ID_BYTES = 65536;
		readClangBundleDirectory = async (source, base, signal) => {
			const header = await source.read(base, CLANG_BUNDLE_HEADER_BYTES);
			if (!header.subarray(0, CLANG_BUNDLE_MAGIC.length).equals(CLANG_BUNDLE_MAGIC)) rejectGpu("Invalid Clang offload bundle magic");
			const declaredCount = new BinaryReader(header, true, "clang offload bundle").word(CLANG_BUNDLE_MAGIC.length, 64);
			const sourceEnd = BigInt(source.size);
			const firstEntry = base + CLANG_BUNDLE_HEADER_BYTES;
			if (declaredCount * BigInt(CLANG_BUNDLE_ENTRY_BYTES) > sourceEnd - BigInt(firstEntry)) rejectGpu("Clang offload bundle directory is truncated");
			const count = gpuCount(declaredCount);
			if (count > CLANG_BUNDLE_MAX_ENTRIES) throw new BinaryResourceFailure("structure", CLANG_BUNDLE_MAX_ENTRIES, "HIP bundle entry count exceeds the inventory budget", "hip-bundle-entries", "entries");
			const declarations = [];
			let position = firstEntry;
			let firstPayload = sourceEnd;
			let lastPayloadEnd = firstEntry;
			for (let index = 0; index < count; index++) {
				if (index % 256 === 0) {
					await scheduler.yield();
					assertArtifactReadActive(signal);
				}
				const entry = new BinaryReader(await source.read(position, CLANG_BUNDLE_ENTRY_BYTES), true, "clang offload bundle");
				const rawOffset = BigInt(base) + entry.word(0, 64);
				const rawSize = entry.word(8, 64);
				const rawNameSize = entry.word(16, 64);
				if (rawOffset > sourceEnd || rawSize > sourceEnd - rawOffset) rejectGpu("HIP entry range is outside its bundle");
				const offset = Number(rawOffset);
				const size = Number(rawSize);
				if (rawSize > 0n) {
					if (rawOffset < firstPayload) firstPayload = rawOffset;
					lastPayloadEnd = Math.max(lastPayloadEnd, offset + size);
				}
				const nameOffset = position + CLANG_BUNDLE_ENTRY_BYTES;
				const minimumDirectoryEnd = BigInt(nameOffset + (count - index - 1) * CLANG_BUNDLE_ENTRY_BYTES) + rawNameSize;
				if (minimumDirectoryEnd > sourceEnd) rejectGpu("HIP bundle ID or following entry is outside its bundle");
				if (minimumDirectoryEnd > firstPayload) rejectGpu("HIP entry overlaps its bundle directory");
				const nameSize = Number(rawNameSize);
				if (nameSize > CLANG_BUNDLE_MAX_ID_BYTES) throw new BinaryResourceFailure("structure", CLANG_BUNDLE_MAX_ID_BYTES, `HIP bundle ID exceeds ${String(CLANG_BUNDLE_MAX_ID_BYTES)} bytes`, "hip-bundle-id-bytes", "bytes");
				if (nameOffset - base + nameSize > 16777216) throw new BinaryResourceFailure("structure", GPU_REPORT_BYTES, "HIP bundle directory exceeds its retained byte budget", "hip-bundle-directory-bytes", "bytes");
				let name;
				try {
					name = decodeStrictUtf8(await source.read(nameOffset, nameSize), "preserve");
				} catch (cause) {
					if (cause instanceof TypeError) return rejectGpu("HIP bundle ID is not valid UTF-8");
					throw cause;
				}
				const row = gpuObject(source, {
					offset,
					size,
					kind: name.startsWith("host-") ? "host" : isAmdGpuBundleId(name) ? "amdgpu" : "unknown",
					metadata: {
						offset: position,
						size: CLANG_BUNDLE_ENTRY_BYTES + nameSize
					}
				});
				row.bundle_id = name;
				const amdTarget = readAmdGpuBundleTarget(name);
				row.target = amdTarget?.key ?? null;
				declarations.push({
					object: row,
					amdTarget
				});
				position = nameOffset + nameSize;
			}
			return {
				declarations,
				end: Math.max(position, lastPayloadEnd)
			};
		};
		readCcobHeader = (bytes, remaining) => {
			if (bytes.length < 20) rejectGpu("CCOB header is truncated");
			if (!bytes.subarray(0, CCOB_MAGIC.length).equals(CCOB_MAGIC)) rejectGpu("Invalid CCOB magic");
			const reader = new BinaryReader(bytes, true, "ccob");
			const version = reader.u16(4), method = reader.u16(6);
			let width, total, decoded, hash;
			if (version === 1) {
				width = 20;
				total = remaining;
				decoded = reader.word(8, 32);
				hash = reader.word(12, 64);
			} else if (version === 2) {
				width = 24;
				if (bytes.length < width) rejectGpu("CCOB v2 header is truncated");
				total = reader.u32(8);
				decoded = reader.word(12, 32);
				hash = reader.word(16, 64);
			} else if (version === 3) {
				width = 32;
				if (bytes.length < width) rejectGpu("CCOB v3 header is truncated");
				total = gpuCount(reader.word(8, 64));
				decoded = reader.word(16, 64);
				hash = reader.word(24, 64);
			} else throw new BinaryFormatFailure("unsupported", `Unsupported CCOB version ${version}`);
			if (total < width || total > remaining) rejectGpu("CCOB declared extent is invalid");
			return {
				version,
				method,
				width,
				total,
				decoded,
				hash
			};
		};
		findLegacyCcobRecoveryTotal = async (source, base) => {
			const searchEnd = Math.min(source.size, base + GPU_OBJECT_BYTES);
			let position = base + 20;
			let tail = Buffer.alloc(0);
			while (position < searchEnd) {
				const bytes = await source.read(position, Math.min(64 * 1024, searchEnd - position));
				const haystack = tail.length === 0 ? bytes : Buffer.concat([tail, bytes]);
				const index = haystack.indexOf("CCOB");
				if (index >= 0) return position - tail.length + index - base;
				tail = haystack.subarray(Math.max(0, haystack.length - 3));
				position += bytes.length;
			}
			if (searchEnd < source.size) throw new BinaryResourceFailure("structure", GPU_OBJECT_BYTES, "Legacy CCOB v1 extent exceeds the 128 MiB decoding budget");
			return source.size - base;
		};
	})))();
}

//#endregion
//#region dist/gpu/CudaTarget.js
var readCudaTarget;
function init_CudaTarget() {
	return (init_CudaTarget = __esmMin((() => {
		init_GpuObject();
		init_GpuSource();
		readCudaTarget = (source, directory) => {
			if (directory.format !== "elf" || directory.machine !== 190 || directory.elf_os_abi === null) return rejectGpu("CUDA target declaration requires a CUDA ELF header");
			const flags = directory.flags;
			const legacy = directory.elf_os_abi === 51;
			const newer = directory.elf_os_abi === 65 && directory.bits === 64 && directory.little && (flags & 16711935) === 2;
			const architecture = legacy ? flags & 255 : newer ? flags >>> 8 & 255 : null;
			const value = architecture !== null && architecture >= 10 ? `sm_${architecture}` : null;
			const cudaHeader = {
				os_abi: directory.elf_os_abi,
				flags: `0x${flags.toString(16).padStart(8, "0")}`,
				location: gpuLocation(source, 0, directory.bits === 64 ? 64 : 52)
			};
			return {
				value,
				key: value,
				scope: "cuda-base",
				cudaHeader,
				...value === null ? { limitation: `CUDA ELF target encoding is unknown for OS ABI 0x${directory.elf_os_abi?.toString(16)} and flags ${cudaHeader.flags}; the raw header remains available.` } : {}
			};
		};
	})))();
}

//#endregion
//#region dist/gpu/CudaFatbinary.js
async function* readCudaFatbinary(source, signal) {
	let base = 0;
	while (base < source.size) {
		const header = new BinaryReader(await source.read(base, 16), true, CUDA_FATBINARY);
		if (header.u32(0) !== 3126193488) rejectGpu("Unexpected bytes between CUDA fatbinary records");
		if (header.u16(4) !== 1 || header.u16(6) < 16) rejectGpu("Unsupported CUDA fatbinary header");
		const start = base + header.u16(6), length = gpuCount(header.word(8, 64));
		if (start > source.size || length > source.size - start) rejectGpu("CUDA fatbinary extent is truncated");
		const end = start + length;
		for (let position = start; position < end;) {
			assertArtifactReadActive(signal);
			if (end - position < 64) rejectGpu("CUDA entry header is truncated");
			const h = new BinaryReader(await source.read(position, 64), true, CUDA_FATBINARY);
			const kind = h.u16(0), version = h.u16(2), width = h.u32(4);
			const padded = gpuCount(h.word(8, 64)), encoded = h.u32(16), flags = h.word(40, 64);
			if (width < 64 || width > end - position || padded > end - position - width || encoded > padded) rejectGpu("CUDA entry extent is invalid");
			const compressed = (flags & 45056n) !== 0n;
			const row = gpuObject(source, {
				offset: position + width,
				size: compressed ? encoded : padded,
				kind: kind === 1 ? "ptx" : kind === 2 ? "cubin" : "unknown",
				metadata: {
					offset: position,
					size: width
				}
			});
			const architectureSuffix = (flags & 1048576n) !== 0n ? "a" : (flags & 2097152n) !== 0n ? "f" : "";
			row.target = `sm_${h.u32(28)}${architectureSuffix}`;
			row.raw_flags = `0x${flags.toString(16)}`;
			row.compression = (flags & 32768n) !== 0n && (flags & 8192n) === 0n ? "zstd" : (flags & 8192n) !== 0n && (flags & 32768n) === 0n ? "lz4" : compressed ? "unsupported" : "none";
			row.compression_id = compressed ? `cuda-flags:${row.raw_flags}` : null;
			const declaredDecodedSize = compressed ? h.word(56, 64) : padded;
			if (compressed && (encoded === 0 || declaredDecodedSize === 0n)) rejectGpu("Compressed CUDA entry has an empty declared extent");
			if (version !== 257) {
				row.compression = "unsupported";
				row.target = null;
				row.decoded_size = null;
				row.limitations.push(`CUDA entry version 0x${version.toString(16)} is not decoded`);
			} else {
				recordDeclaredGpuDecodedSize(row, declaredDecodedSize);
			}
			if (row.compression === "unsupported") row.limitations.push("This CUDA compression/version is not supported; original encoded bytes and target declarations remain located");
			yield {
				row,
				declaredDecodedSize
			};
			position += width + padded;
		}
		base = await nextGpuContainerOffset(source, end);
	}
}
var CUDA_FATBINARY;
function init_CudaFatbinary() {
	return (init_CudaFatbinary = __esmMin((() => {
		init_binaryContainer();
		init_resources();
		init_GpuSource();
		init_GpuObject();
		CUDA_FATBINARY = "cuda-fatbinary";
	})))();
}

//#endregion
//#region dist/gpu/GpuPayloadCodec.js
var unzip, decodeGpuPayloadStream, decodeGpuPayload;
function init_GpuPayloadCodec() {
	return (init_GpuPayloadCodec = __esmMin((() => {
		init_nodeCodecResult();
		init_resources();
		init_Lz4Block();
		init_zstandardExactFrame();
		init_zstandardFrameAllowance();
		init_binaryContainer();
		init_GpuSource();
		unzip = promisify(inflate);
		decodeGpuPayloadStream = async (bytes, compression, maximumDecodedSize, signal) => {
			assertArtifactReadActive(signal);
			const maxOutputLength = Math.max(1, maximumDecodedSize);
			if (compression === "zstd") {
				const decoded = await decodeZstandardFramesCooperative(bytes, {
					maxOutputLength,
					windowLogMax: 27,
					mode: "prefix"
				}, async () => {
					await scheduler.yield();
					assertArtifactReadActive(signal);
				});
				assertArtifactReadActive(signal);
				if (!decoded.ok) {
					if (decoded.reason === "invalid_allowance" && decoded.configuration !== undefined) throw decoded.configuration;
					if (decoded.reason === "work_limit") throw new ZstandardFrameAllowanceError({
						maxFrames: decoded.value ?? 0,
						source: decoded.source ?? "default"
					}, decoded.offset);
					throw new BinaryFormatFailure("malformed", "GPU payload decompression failed or exceeded its declared length", {
						format: "zstd",
						field: decoded.reason,
						offset: decoded.offset
					});
				}
				return {
					buffer: decoded.bytes,
					consumedBytes: decoded.consumedBytes
				};
			}
			let result;
			try {
				result = await unzip(bytes, {
					maxOutputLength,
					info: true
				});
			} catch {
				assertArtifactReadActive(signal);
				return rejectGpu("GPU payload decompression failed or exceeded its declared length");
			}
			assertArtifactReadActive(signal);
			const { buffer: decoded, consumedBytes: consumed } = nodeCodecResult(result);
			if (!Number.isSafeInteger(consumed) || consumed <= 0 || consumed > bytes.length) rejectGpu("GPU decoder returned an invalid complete codec extent");
			return {
				buffer: decoded,
				consumedBytes: consumed
			};
		};
		decodeGpuPayload = async (bytes, compression, expected, signal) => {
			assertArtifactReadActive(signal);
			if (compression === "lz4") return decodeLz4Block(bytes, expected, GPU_OBJECT_BYTES, signal);
			const decoded = await decodeGpuPayloadStream(bytes, compression, expected, signal);
			if (decoded.consumedBytes !== bytes.length) rejectGpu("GPU compressed payload contains bytes outside its complete codec stream");
			if (decoded.buffer.length !== expected) rejectGpu("GPU decompressed length disagrees with its declaration");
			return decoded.buffer;
		};
	})))();
}

//#endregion
//#region dist/gpu/CudaInfo.js
/** CUDA nv.info is a numeric record format, not a string-keyed metadata map. */
function* readCudaInfo(bytes, little, budget = new CudaMetadataBudget()) {
	const reader = new BinaryReader(bytes, little, "cuda-nv-info");
	for (let offset = 0; offset < bytes.length;) {
		budget.visit();
		const head = reader.range(offset, 4, "CUDA nv.info record");
		const format = head[0], attribute = head[1], value = reader.u16(offset + 2);
		if (format < 1 || format > 4) rejectGpu("Unknown CUDA nv.info record format");
		const length = format === 4 ? value : 0;
		yield {
			format,
			attribute,
			value,
			offset,
			length: 4 + length,
			data: reader.range(offset + 4, length, "CUDA nv.info value")
		};
		offset += 4 + length;
	}
}
var CudaMetadataBudget, readCudaParameters;
function init_CudaInfo() {
	return (init_CudaInfo = __esmMin((() => {
		init_binaryContainer();
		init_GpuSource();
		init_budget();
		init_jsonValueByteLength();
		CudaMetadataBudget = class {
			#visits = new Budget(262144);
			#readBytes = new Budget(GPU_OBJECT_BYTES);
			#indexBytes = new Budget(GPU_REPORT_BYTES);
			visit() {
				this.#visits.charge(1, () => new BinaryResourceFailure("structure", 262144, "CUDA metadata exceeds 262144 aggregate record/symbol visits"));
			}
			read(size) {
				this.#readBytes.charge(size, () => new BinaryResourceFailure("structure", GPU_OBJECT_BYTES, "CUDA metadata exceeds 128 MiB aggregate section reads"));
			}
			retain(value) {
				this.#indexBytes.charge(jsonValueByteLength(value, GPU_REPORT_BYTES) + 2, () => new BinaryResourceFailure("structure", GPU_REPORT_BYTES, "CUDA metadata exceeds the 16 MiB temporary index budget"));
			}
		};
		readCudaParameters = (bytes, little, budget = new CudaMetadataBudget()) => {
			const parameters = [];
			const byteDeclarations = new Set();
			const limitations = [];
			let complete = true;
			for (const record of readCudaInfo(bytes, little, budget)) {
				if (record.format === 3 && record.attribute === 25) byteDeclarations.add(record.value);
				if (record.format !== 4 || record.attribute !== 23 && record.attribute !== 69) continue;
				if (record.data.length !== 12) {
					complete = false;
					continue;
				}
				const r = new BinaryReader(record.data, little, "cuda-nv-info");
				if (r.u32(0) !== 0) complete = false;
				const parameter = {
					ordinal: r.u16(4),
					name: null,
					offset: r.u16(6),
					size: record.attribute === 69 ? r.u32(8) : r.u32(8) >>> 18,
					type: null,
					hidden: null
				};
				budget.retain(parameter);
				parameters.push(parameter);
			}
			parameters.sort((a, b) => a.ordinal - b.ordinal);
			if (parameters.some((row, index) => row.ordinal !== index)) complete = false;
			const parameter_bytes = byteDeclarations.size === 1 ? [...byteDeclarations][0] : null;
			if (byteDeclarations.size > 1) limitations.push(`Conflicting CUDA argument-area byte declarations: ${[...byteDeclarations].join(", ")}; parameter_bytes remains unknown`);
			if (parameter_bytes !== null && parameters.some((row) => row.offset > parameter_bytes || row.size > parameter_bytes - row.offset)) limitations.push("CUDA parameter ranges disagree with the declared argument-area length; declarations do not establish a valid ABI layout");
			if (!complete) limitations.push("CUDA parameter records have unsupported indices/sizes, duplicate ordinals or gaps; parameter count is unknown");
			return {
				parameter_count: complete && (parameters.length > 0 || parameter_bytes === 0) ? parameters.length : null,
				parameter_bytes,
				parameters,
				limitations
			};
		};
	})))();
}

//#endregion
//#region dist/gpu/AmdGpuMetadata.js
var AMD_METADATA_BYTES, AMD_METADATA_DEPTH, AMD_METADATA_VALUES, AMD_METADATA_CONTAINER_ENTRIES, AMD_METADATA_VALUE_BYTES, metadataValueLimit, utf8, preflight, readAmdMetadata, amdRecord, amdCount, amdString;
function init_AmdGpuMetadata() {
	return (init_AmdGpuMetadata = __esmMin((() => {
		init_strictUtf8();
		init_binaryContainer();
		init_GpuSource();
		AMD_METADATA_BYTES = 8 * 1024 * 1024;
		AMD_METADATA_DEPTH = 32;
		AMD_METADATA_VALUES = 262144;
		AMD_METADATA_CONTAINER_ENTRIES = 65536;
		AMD_METADATA_VALUE_BYTES = 65536;
		metadataValueLimit = () => new BinaryResourceFailure("structure", AMD_METADATA_VALUES, `AMDGPU metadata exceeds its ${String(AMD_METADATA_VALUES)}-value aggregate allowance`, "amdgpu-metadata-values", "entries");
		utf8 = strictUtf8Decoder("preserve");
		preflight = (bytes) => {
			const strings = new Set();
			const reader = new BinaryReader(bytes, false, "amdgpu-metadata");
			let at = 0, values = 0;
			const take = (size) => {
				const start = at;
				if (size > bytes.length - at) rejectGpu("Truncated AMDGPU MessagePack metadata");
				at += size;
				return start;
			};
			const value = (depth) => {
				if (depth > AMD_METADATA_DEPTH) throw new BinaryResourceFailure("structure", AMD_METADATA_DEPTH, `AMDGPU metadata exceeds its ${String(AMD_METADATA_DEPTH)}-level nesting allowance`, "amdgpu-metadata-depth");
				if (++values > AMD_METADATA_VALUES) throw metadataValueLimit();
				const code = bytes[take(1)];
				const string = (code & 224) === 160 || code === 217 || code === 218 || code === 219;
				const map = (code & 240) === 128 || code === 222 || code === 223;
				let count = 0, payload = 0;
				if (code <= 127 || code >= 224 || code === 192 || code === 194 || code === 195) return;
				if ((code & 224) === 160) payload = code & 31;
				else if ((code & 240) === 144) count = code & 15;
				else if ((code & 240) === 128) count = (code & 15) * 2;
				else if (code === 220 || code === 222) count = reader.u16(take(2)) * (code === 222 ? 2 : 1);
				else if (code === 221 || code === 223) count = reader.u32(take(4)) * (code === 223 ? 2 : 1);
				else if (code === 217 || code === 196) payload = bytes[take(1)];
				else if (code === 218 || code === 197) payload = reader.u16(take(2));
				else if (code === 219 || code === 198) payload = reader.u32(take(4));
				else {
					const widths = {
						202: 4,
						203: 8,
						204: 1,
						205: 2,
						206: 4,
						207: 8,
						208: 1,
						209: 2,
						210: 4,
						211: 8
					};
					const width = widths[code];
					if (width === undefined) {
						if ([
							199,
							200,
							201,
							212,
							213,
							214,
							215,
							216
						].includes(code)) throw new BinaryFormatFailure("unsupported", "AMDGPU MessagePack extensions are outside metadata coverage");
						rejectGpu("Reserved AMDGPU MessagePack token");
					}
					payload = width;
				}
				const start = take(payload);
				if (count > bytes.length - at) rejectGpu("Truncated AMDGPU MessagePack metadata container");
				if ((map ? count / 2 : count) > AMD_METADATA_CONTAINER_ENTRIES) throw new BinaryResourceFailure("structure", AMD_METADATA_CONTAINER_ENTRIES, `AMDGPU metadata container exceeds its ${String(AMD_METADATA_CONTAINER_ENTRIES)}-entry allocation budget`);
				if (payload > AMD_METADATA_VALUE_BYTES) throw new BinaryResourceFailure("structure", AMD_METADATA_VALUE_BYTES, `AMDGPU metadata value exceeds its ${String(AMD_METADATA_VALUE_BYTES)}-byte allocation budget`);
				if (count > AMD_METADATA_VALUES - values) throw metadataValueLimit();
				if (string) {
					strings.add(`${bytes.byteOffset + start}:${payload}`);
					try {
						return utf8.decode(bytes.subarray(start, start + payload));
					} catch {
						return rejectGpu("AMDGPU metadata contains invalid UTF-8");
					}
				}
				if (map) {
					const keys = new Set();
					for (let index = 0; index < count; index += 2) {
						const key = value(depth + 1);
						if (key === undefined || keys.has(key)) rejectGpu("AMDGPU metadata map has non-string or duplicate keys");
						keys.add(key);
						value(depth + 1);
					}
				} else for (let index = 0; index < count; index++) value(depth + 1);
				return undefined;
			};
			value(0);
			if (at !== bytes.length) rejectGpu("Trailing AMDGPU MessagePack values");
			return strings;
		};
		readAmdMetadata = (bytes) => {
			if (bytes.length > 8388608) throw new BinaryResourceFailure("structure", AMD_METADATA_BYTES, "AMDGPU metadata exceeds 8 MiB");
			const strings = preflight(bytes);
			const stringValue = (value) => {
				if (!(value instanceof Uint8Array) || value.buffer !== bytes.buffer || !strings.has(`${value.byteOffset}:${value.byteLength}`)) return rejectGpu("AMDGPU metadata map key is not a string");
				return utf8.decode(value);
			};
			const normalize = (value) => {
				if (value instanceof Uint8Array) return value.buffer === bytes.buffer && strings.has(`${value.byteOffset}:${value.byteLength}`) ? stringValue(value) : value;
				if (Array.isArray(value)) {
					for (let index = 0; index < value.length; index++) value[index] = normalize(value[index]);
				} else if (value !== null && typeof value === "object") for (const key of Object.keys(value)) {
					const record = value;
					record[key] = normalize(record[key]);
				}
				return value;
			};
			try {
				return normalize(decode(bytes, {
					rawStrings: true,
					keyDecoder: {
						canBeCached: () => true,
						decode: (source, offset, length) => utf8.decode(source.subarray(offset, offset + length))
					},
					mapKeyConverter: (key) => {
						if (typeof key !== "string") return rejectGpu("AMDGPU metadata map key is not a string");
						return key;
					},
					useBigInt64: true,
					maxStrLength: AMD_METADATA_VALUE_BYTES,
					maxBinLength: AMD_METADATA_VALUE_BYTES,
					maxArrayLength: AMD_METADATA_CONTAINER_ENTRIES,
					maxMapLength: AMD_METADATA_CONTAINER_ENTRIES,
					maxExtLength: 0
				}));
			} catch {
				return rejectGpu("Malformed AMDGPU MessagePack metadata");
			}
		};
		amdRecord = (value) => isRecord(value) ? value : null;
		amdCount = (value) => {
			if (typeof value === "bigint") return value >= 0n && value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : null;
			return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;
		};
		amdString = (value) => typeof value === "string" ? value : null;
	})))();
}

//#endregion
//#region dist/gpu/GpuElfKernels.js
var sectionBytes, site, blankKernel, readGpuElfKernels, indexCudaMetadata, attachCudaResources, cudaKernels, readAmdElfMetadata, amdKernels;
function init_GpuElfKernels() {
	return (init_GpuElfKernels = __esmMin((() => {
		init_CudaTarget();
		init_AmdGpuTarget();
		init_result();
		init_elfNoteLayout();
		init_CudaInfo();
		init_binaryContainer();
		init_nativeSectionDirectory();
		init_elfStringBytes();
		init_elfSymbol();
		init_elfSymbolSectionIndex();
		init_GpuSource();
		init_AmdGpuMetadata();
		sectionBytes = (source, section, budget) => {
			if (!section.file_backed || section.compressed) rejectGpu("GPU metadata section has no supported uncompressed file range");
			budget?.read(gpuCount(section.size));
			return source.read(gpuCount(section.offset), gpuCount(section.size));
		};
		site = (source, section, offset = 0, size = gpuCount(section.size)) => ({
			container_id: source.containerId,
			offset: gpuCount(section.offset) + offset,
			size,
			section_index: section.index,
			section_name: section.name
		});
		blankKernel = (source, id, name, location) => ({
			id: `${source.containerId}/${id}`,
			object_id: source.containerId,
			representation: "cuda-elf-metadata",
			name,
			symbol: name,
			parameter_count: null,
			parameter_bytes: null,
			parameters: [],
			registers: {
				physical: null,
				sgpr: null,
				vgpr: null,
				agpr: null,
				virtual: []
			},
			shared_bytes: null,
			private_bytes: null,
			location,
			sources: {
				parameters: null,
				registers: null,
				shared: null,
				private: null
			},
			limitations: []
		});
		readGpuElfKernels = async (source, kind, onKernel, pause, preparedAmd, onTarget) => {
			if (kind === "amdgpu" && preparedAmd !== undefined) return amdKernels(source, preparedAmd, onKernel, onTarget);
			const directory = await readGpuNativeDirectory(source, readElfSectionDirectory(source.size), pause);
			if (directory.machine !== (kind === "cubin" ? 190 : 224)) rejectGpu("GPU entry kind disagrees with ELF machine");
			if (kind === "cubin") {
				onTarget?.(readCudaTarget(source, directory));
				const coverage = await cudaKernels(source, directory, onKernel);
				return {
					coverage,
					limitations: [...directory.sections.some((s) => s.name === null) ? ["Some ELF section names are unknown; named metadata coverage is partial"] : [], ...directory.sections.some((s) => s.type === 2 || s.type === 11) ? [] : ["No CUBIN symbol table was available; kernel declaration coverage is unknown"]]
				};
			}
			const metadata = await readAmdElfMetadata(source, directory);
			const parsed = amdKernels(source, metadata.ok ? metadata.value : metadata.error.partial, onKernel, onTarget);
			if (!metadata.ok) throw metadata.error.cause;
			return parsed;
		};
		indexCudaMetadata = async (source, directory) => {
			const infosByText = new Map(), sharedByText = new Map();
			const registerFacts = new Map();
			const budget = new CudaMetadataBudget(), seenMetadata = new Set();
			for (const row of directory.sections) {
				const map = row.type === 8 && row.name?.startsWith(".nv.shared.") === true ? sharedByText : row.type === 1879048192 && row.name?.startsWith(".nv.info.") === true ? infosByText : undefined;
				const global = row.type === 1879048192 && row.name === ".nv.info";
				if (map === undefined && !global) continue;
				const key = `${row.type}:${row.flags}:${row.name}:${row.offset}:${row.size}:${row.link}:${row.info}`;
				if (seenMetadata.has(key)) continue;
				budget.retain(key);
				seenMetadata.add(key);
				if (map !== undefined) {
					budget.retain({
						text: row.info,
						section: row.index
					});
					const values = map.get(row.info) ?? [];
					values.push(row);
					map.set(row.info, values);
				}
				if (global) {
					for (const record of readCudaInfo(await sectionBytes(source, row, budget), directory.little, budget)) {
						if (record.format !== 4 || record.attribute !== 47) continue;
						if (record.data.length !== 8) rejectGpu("CUDA register count record has an unsupported extent");
						const r = new BinaryReader(record.data, directory.little, "elf"), key = `${row.link}:${r.u32(0)}`;
						const values = registerFacts.get(key) ?? new Map();
						const value = r.u32(4);
						if (!values.has(value)) {
							const location = site(source, row, record.offset, record.length);
							budget.retain({
								symbol: key,
								value,
								location
							});
							values.set(value, location);
							registerFacts.set(key, values);
						}
					}
				}
			}
			const allNamesKnown = directory.sections.every((row) => row.name !== null);
			return {
				source,
				directory,
				infosByText,
				sharedByText,
				registerFacts,
				allNamesKnown,
				budget,
				parameters: new Map()
			};
		};
		attachCudaResources = (kernel, text, index, symbolKey) => {
			const { source, directory } = index;
			const registerRows = index.registerFacts.get(symbolKey);
			const registerValues = new Set(registerRows?.keys());
			const sectionRegisters = text.info >>> 24;
			kernel.registers.physical = registerValues.size === 1 ? [...registerValues][0] : registerValues.size === 0 && sectionRegisters !== 0 ? sectionRegisters : null;
			if (registerValues.size === 1) kernel.sources.registers = registerRows.values().next().value;
			else if (sectionRegisters !== 0) kernel.sources.registers = {
				container_id: source.containerId,
				offset: text.header_offset,
				size: directory.bits === 64 ? 64 : 40,
				section_index: text.index,
				section_name: text.name
			};
			const registerConflict = registerValues.size > 1 || kernel.registers.physical !== null && sectionRegisters !== 0 && kernel.registers.physical !== sectionRegisters;
			if (registerConflict) {
				kernel.registers.physical = null;
				kernel.limitations.push("Conflicting CUDA register declarations; physical count remains unknown");
			}
			const shared = index.sharedByText.get(text.index) ?? [];
			kernel.shared_bytes = shared.length === 1 ? gpuCount(shared[0].size) : shared.length === 0 && index.allNamesKnown ? 0 : null;
			if (shared.length === 1) kernel.sources.shared = {
				container_id: source.containerId,
				offset: shared[0].header_offset,
				size: directory.bits === 64 ? 64 : 40,
				section_index: shared[0].index,
				section_name: shared[0].name
			};
			return registerConflict ? "partial" : "complete";
		};
		cudaKernels = async (source, directory, onKernel) => {
			const index = await indexCudaMetadata(source, directory);
			const extendedTables = new ElfSymbolSectionIndexTables(directory.sections);
			let complete = index.allNamesKnown;
			let symbolTables = 0;
			for (const section of directory.sections) {
				if (section.type !== 2 && section.type !== 11) continue;
				symbolTables++;
				const width = gpuCount(section.entry_size), minimum = elfSymbolSize(directory.bits);
				if (width < minimum || section.size % BigInt(width) !== 0n) rejectGpu("CUBIN symbol table width is invalid");
				const namesSection = directory.sections[section.link];
				if (namesSection === undefined || namesSection.type !== 3) rejectGpu("CUBIN symbol string table is invalid");
				const names = await sectionBytes(source, namesSection, index.budget);
				const bytes = await sectionBytes(source, section, index.budget);
				const symbolCount = bytes.length / width;
				let extendedIndices = null;
				for (let offset = 0; offset < bytes.length; offset += width) {
					index.budget.visit();
					const parsedSymbol = readElfSymbol(bytes.subarray(offset, offset + width), directory.bits, directory.little);
					if (!parsedSymbol.ok) throw new BinaryFormatFailure(parsedSymbol.error.kind, parsedSymbol.error.message);
					const symbol = parsedSymbol.value;
					if (symbol.type !== 2 || (symbol.other & 16) === 0) continue;
					const sectionIndex = symbol.section_index;
					if (sectionIndex === 65535) {
						if (extendedIndices === null) {
							const extended = extendedTables.tableFor(section.index, BigInt(symbolCount));
							if (!extended.ok) return rejectGpu(`CUBIN ${extended.error.message}`);
							extendedIndices = await sectionBytes(source, extended.value, index.budget);
						}
					}
					const resolved = readElfSymbolSectionReference(sectionIndex, offset / width, directory.sections.length, directory.little, extendedIndices ?? undefined);
					if (!resolved.ok) return rejectGpu(`CUBIN ${resolved.error.message}`);
					const text = resolved.value.kind === "section" ? directory.sections[resolved.value.index] : undefined;
					if (text === undefined || text.type !== 1 || (text.flags & 4n) === 0n) rejectGpu("CUBIN kernel symbol has no executable section");
					const kernel = blankKernel(source, `sym:${section.index}:${offset / width}`, readElfStringBytes(names, symbol.name_offset).toString("latin1"), site(source, section, offset, width));
					if (attachCudaResources(kernel, text, index, `${section.index}:${offset / width}`) === "partial") complete = false;
					const infos = index.infosByText.get(text.index) ?? [];
					if (infos.length === 1) {
						const info = infos[0];
						let decoded = index.parameters.get(info.index);
						if (decoded === undefined) {
							decoded = readCudaParameters(await sectionBytes(source, info, index.budget), directory.little, index.budget);
							index.budget.retain({ parameter_section: info.index });
							index.parameters.set(info.index, decoded);
						}
						if (decoded.limitations.length > 0) complete = false;
						kernel.sources.parameters = site(source, infos[0]);
						kernel.parameter_bytes = decoded.parameter_bytes;
						kernel.parameter_count = decoded.parameter_count;
						kernel.parameters = decoded.parameters;
						kernel.limitations.push(...decoded.limitations);
					} else {
						complete = false;
						kernel.limitations.push("Exactly one matching CUDA nv.info parameter section was not available");
					}
					kernel.limitations.push("CUDA metadata fields are declarations from ELF symbols, section headers and nv.info; SASS and runtime behavior were not inspected");
					onKernel(kernel);
				}
			}
			return complete && symbolTables > 0 ? "complete" : "partial";
		};
		readAmdElfMetadata = async (source, directory) => {
			const limitations = [];
			const notes = [];
			let retainedBytes = 0;
			let unsupportedNotes = false;
			let targetMetadata = null;
			const observed = () => {
				const targets = new Set((targetMetadata?.notes ?? []).flatMap(({ target }) => target === null ? [] : [target]));
				const processor = targetMetadata?.processor ?? null;
				const noteTarget = targets.size === 1 ? [...targets][0] : null;
				const noteIdentity = noteTarget === null ? null : readAmdGpuNoteTarget(noteTarget);
				const noteConflict = targets.size > 1;
				const processorConflict = processor !== null && noteIdentity !== null && processor !== noteIdentity.processor;
				const invalidTarget = (targetMetadata?.notes ?? []).some(({ target_state }) => target_state === "invalid");
				const conflict = noteConflict || processorConflict || invalidTarget;
				const limitation = invalidTarget ? "AMDGPU note target is not a string; processor identity is unknown" : noteConflict ? "AMDGPU notes declare conflicting processor targets; processor identity is unknown" : processorConflict ? "AMDGPU ELF processor flags conflict with target note metadata; processor identity is unknown" : null;
				if (limitation !== null && !limitations.includes(limitation)) limitations.push(limitation);
				const target = conflict ? null : noteTarget ?? processor;
				const targetIdentity = conflict ? null : noteIdentity ?? (noteTarget === null && processor !== null ? {
					key: processor,
					processor
				} : null);
				return {
					target,
					targetIdentity,
					targetMetadata,
					limitations,
					notes
				};
			};
			try {
				if (directory.machine !== 224) rejectGpu("AMDGPU metadata requires an AMDGPU ELF machine");
				targetMetadata = {
					flags: `0x${directory.flags.toString(16).padStart(8, "0")}`,
					processor: readAmdGpuElfProcessor(directory.flags),
					header_location: {
						container_id: source.containerId,
						offset: 0,
						size: directory.bits === 64 ? 64 : 52,
						section_index: null,
						section_name: null
					},
					note_coverage: "partial",
					notes: []
				};
				for (const section of directory.sections) {
					if (elfNoteSectionStorage(section) === "not-note") continue;
					const sectionSize = gpuCount(section.size);
					if (sectionSize > 8388608 - retainedBytes) throw new BinaryResourceFailure("structure", AMD_METADATA_BYTES, "AMDGPU ELF note discovery exceeds the 8 MiB retained metadata budget");
					retainedBytes += sectionSize;
					const bytes = await sectionBytes(source, section);
					for (let p = 0; p < bytes.length;) {
						const frame = readElfNoteFrame(bytes.subarray(p, p + 12), directory.little, 4, bytes.length - p);
						if (!frame.ok) return rejectGpu(frame.error.message);
						const { namesz, descsz: size, type, descriptor, next, framing } = frame.value;
						if (framing !== "complete") rejectGpu("ELF note entry exceeds its declared note section");
						const nameOffset = p + 12;
						const desc = p + descriptor;
						const vendor = bytes.subarray(nameOffset, nameOffset + namesz).toString("latin1").replace(/\0$/u, "");
						if (vendor === "AMDGPU" && type === 32) {
							const metadata = amdRecord(readAmdMetadata(bytes.subarray(desc, desc + size)));
							if (metadata === null) rejectGpu("AMDGPU metadata is not a map");
							const target = amdString(metadata?.["amdhsa.target"]);
							const target_state = !Object.hasOwn(metadata, "amdhsa.target") ? "absent" : target === null ? "invalid" : "declared";
							if (target_state === "invalid") unsupportedNotes = true;
							targetMetadata.notes.push({
								target,
								target_state,
								location: site(source, section, desc, size)
							});
							const kernels = metadata?.["amdhsa.kernels"];
							if (!Array.isArray(kernels)) return rejectGpu("AMDGPU metadata has no valid kernel array");
							notes.push({
								section,
								noteOffset: p,
								desc,
								size,
								kernels
							});
						} else if (vendor === "AMD" && (type === 10 || type === 11)) {
							unsupportedNotes = true;
							limitations.push("Legacy AMDGPU YAML metadata is outside MessagePack coverage");
						}
						p += next;
					}
				}
				targetMetadata.note_coverage = unsupportedNotes || directory.sections.length === 0 ? "partial" : "complete";
				if (notes.length === 0) throw new BinaryFormatFailure("unsupported", "No AMDGPU v3+ MessagePack kernel metadata was available");
				return ok(observed());
			} catch (cause) {
				return err({
					kind: "incomplete-amd-metadata",
					cause,
					partial: observed()
				});
			}
		};
		amdKernels = (source, prepared, onKernel, onTarget) => {
			onTarget?.({
				value: prepared.target,
				identity: prepared.targetIdentity,
				amdMetadata: prepared.targetMetadata,
				scope: "amdgpu"
			});
			for (const { section, noteOffset, desc, size, kernels: rows } of prepared.notes) {
				for (let index = 0; index < rows.length; index++) {
					const value = amdRecord(rows[index]);
					const name = value === null ? null : amdString(value[".name"]);
					if (value === null || name === null) rejectGpu("AMDGPU kernel metadata has no name");
					const kernel = blankKernel(source, `note:${section.index}:${noteOffset}:${index}`, name, site(source, section, desc, size));
					kernel.representation = "amdgpu-metadata";
					kernel.sources = {
						parameters: kernel.location,
						registers: kernel.location,
						shared: kernel.location,
						private: kernel.location
					};
					kernel.symbol = amdString(value[".symbol"]);
					kernel.parameter_bytes = amdCount(value[".kernarg_segment_size"]);
					kernel.shared_bytes = amdCount(value[".group_segment_fixed_size"]);
					kernel.private_bytes = amdCount(value[".private_segment_fixed_size"]);
					kernel.registers.sgpr = amdCount(value[".sgpr_count"]);
					kernel.registers.vgpr = amdCount(value[".vgpr_count"]);
					kernel.registers.agpr = amdCount(value[".agpr_count"]);
					const args = value[".args"];
					if (Array.isArray(args)) {
						kernel.parameter_count = args.length;
						kernel.parameters = args.map((argument, ordinal) => {
							const row = amdRecord(argument);
							if (row === null) rejectGpu("Malformed AMDGPU argument metadata");
							const kind = amdString(row[".value_kind"]);
							return {
								ordinal,
								name: amdString(row[".name"]),
								offset: amdCount(row[".offset"]),
								size: amdCount(row[".size"]),
								type: amdString(row[".type_name"]),
								hidden: kind === null ? null : kind.startsWith("hidden_")
							};
						});
					}
					kernel.limitations.push("AMDGPU parameter count includes hidden ABI arguments when present; missing fields remain unknown. Kernel metadata is a declaration, not runtime verification.");
					onKernel(kernel);
				}
			}
			return {
				limitations: prepared.limitations,
				coverage: prepared.limitations.length === 0 ? "complete" : "partial"
			};
		};
	})))();
}

//#endregion
//#region dist/gpu/PtxKernels.js
/** Byte coordinates are accumulated once, including non-ASCII comments and quoted strings. */
function* tokens(text) {
	let at = 0, byte = 0;
	const advance = () => {
		const code = text.codePointAt(at);
		at += code > 65535 ? 2 : 1;
		byte += code < 128 ? 1 : code < 2048 ? 2 : code < 65536 ? 3 : 4;
	};
	while (at < text.length) {
		if (/\s/u.test(text[at])) {
			advance();
			continue;
		}
		if (text.startsWith("//", at)) {
			while (at < text.length && text[at] !== "\n") advance();
			continue;
		}
		if (text.startsWith("/*", at)) {
			advance();
			advance();
			while (at < text.length && !text.startsWith("*/", at)) advance();
			if (at === text.length) rejectGpu("Unterminated PTX comment");
			advance();
			advance();
			continue;
		}
		const start = byte, position = at;
		if (text[at] === "\"") {
			advance();
			let closed = false;
			while (at < text.length) {
				if (text[at] === "\"") {
					advance();
					closed = true;
					break;
				}
				if (text[at] === "\\") {
					advance();
					if (at < text.length) advance();
				} else advance();
			}
			if (!closed) rejectGpu("Unterminated PTX string");
			yield {
				value: "\"\"",
				start,
				end: byte
			};
			continue;
		}
		if (/[.\w$%@]/u.test(text[at])) {
			const keyword = text[at] === ".";
			advance();
			while (at < text.length && /[.\w$%@]/u.test(text[at]) && (!keyword || text[at] !== ".")) advance();
		} else advance();
		if (at - position > 65536) throw new BinaryResourceFailure("structure", 65536, "PTX token exceeds the string budget");
		yield {
			value: text.slice(position, at),
			start,
			end: byte
		};
	}
}
/** Entry declarations and virtual resources; no instruction semantics or physical register claims. */
function* readPtxKernels(text, objectId) {
	if (Buffer.byteLength(text) > 16777216) throw new BinaryResourceFailure("structure", GPU_REPORT_BYTES, "PTX text exceeds the 16 MiB retained report budget");
	const iterator = tokens(text);
	const next = () => {
		const value = iterator.next();
		if (value.done) return rejectGpu("Truncated PTX entry declaration");
		return value.value;
	};
	let kernelCount = 0;
	let outerDepth = 0;
	let version = null;
	for (let step = iterator.next(); !step.done; step = iterator.next()) {
		const token = step.value;
		if (token.value === "{") {
			outerDepth++;
			continue;
		}
		if (token.value === "}") {
			if (outerDepth === 0) rejectGpu("Unbalanced PTX body");
			outerDepth--;
			continue;
		}
		if (outerDepth !== 0) continue;
		if (token.value === ".version") {
			const value = iterator.next();
			version = value.done ? null : ptxVersion(value.value.value);
			continue;
		}
		if (token.value !== ".entry") continue;
		const name = next();
		if (!identifier.test(name.value)) rejectGpu("Malformed PTX entry name or parameters");
		const parameters = [];
		let part = [], parameterBytes = 0;
		const flush = () => {
			if (part.length === 0) return;
			if (part[0] !== ".param") rejectGpu("Unknown PTX parameter declaration");
			if (parameters.length >= 65536) throw new BinaryResourceFailure("structure", 65536, "PTX parameter declarations exceed the facts budget");
			const value = declaration(part);
			let offset = null;
			if (parameterBytes !== null && value.size !== null && value.align !== null) {
				const aligned = Math.ceil(parameterBytes / value.align) * value.align;
				const end = aligned + value.size;
				offset = Number.isSafeInteger(aligned) ? aligned : null;
				parameterBytes = Number.isSafeInteger(end) ? end : null;
			} else parameterBytes = null;
			parameters.push({
				ordinal: parameters.length,
				name: value.name,
				offset,
				size: value.size,
				type: value.type,
				hidden: null
			});
			part = [];
		};
		let t = next();
		if (t.value === "(") {
			let parentheses = 0, brackets = 0;
			while (true) {
				t = next();
				if (t.value === "(") parentheses++;
				else if (t.value === ")") {
					if (parentheses > 0) parentheses--;
					else if (brackets === 0) break;
					else rejectGpu("Malformed PTX parameter dimension");
				} else if (t.value === "[") brackets++;
				else if (t.value === "]") {
					if (brackets === 0) rejectGpu("Malformed PTX parameter dimension");
					brackets--;
				}
				if (t.value === "," && parentheses === 0 && brackets === 0) flush();
				else part.push(t.value);
				if (part.length > 128) throw new BinaryResourceFailure("structure", 65536, "PTX parameter declarations exceed the facts budget");
			}
			flush();
			t = next();
		} else if (t.value !== "{" && t.value !== ";" && !t.value.startsWith(".")) {
			rejectGpu("Malformed PTX entry name or parameters");
		}
		let headerTokens = 0;
		while (t.value !== "{" && t.value !== ";") {
			if (++headerTokens > 65536) rejectGpu("PTX entry header is too large");
			if (t.value === ".pragma") {
				t = next();
				if (t.value !== "\"\"") rejectGpu("Malformed PTX entry pragma");
				while (true) {
					if (++headerTokens > 65536) rejectGpu("PTX entry header is too large");
					t = next();
					if (t.value === ";") break;
					if (t.value !== ",") rejectGpu("Malformed PTX entry pragma");
					t = next();
					if (t.value !== "\"\"") rejectGpu("Malformed PTX entry pragma");
				}
				t = next();
				continue;
			}
			t = next();
		}
		let end = t.end, shared = t.value === "{" ? 0 : null;
		const virtual = new Map();
		if (t.value === "{") {
			let depth = 1;
			while (depth > 0) {
				t = next();
				end = t.end;
				if (t.value === "{") {
					depth++;
					continue;
				}
				if (t.value === "}") {
					depth--;
					continue;
				}
				if (t.value === ".param" && version !== null && version.major === 1 && version.minor <= 3) {
					const bodyParameter = [t.value];
					for (t = next(); t.value !== ";"; t = next()) {
						if (t.value === "}") rejectGpu("Malformed PTX parameter declaration");
						if (bodyParameter.length >= 128) throw new BinaryResourceFailure("structure", 65536, "PTX parameter declarations exceed the facts budget");
						bodyParameter.push(t.value);
					}
					part = bodyParameter;
					flush();
					end = t.end;
					continue;
				}
				if (t.value === ".callprototype") {
					for (t = next(); t.value !== ";"; t = next()) {
						if (t.value === "}") rejectGpu("Malformed PTX call prototype");
					}
					end = t.end;
					continue;
				}
				if (t.value !== ".reg" && t.value !== ".shared") continue;
				if (t.value === ".reg") {
					const { type, count } = registerDeclaration(next);
					const previous = virtual.get(type);
					const total = previous === null || count === null ? null : (previous ?? 0) + count;
					virtual.set(type, total === null || !Number.isSafeInteger(total) ? null : total);
					continue;
				}
				const declarationTokens = [];
				for (t = next(); t.value !== ";"; t = next()) {
					if (t.value === "}" || declarationTokens.length > 128) rejectGpu("Malformed PTX resource declaration");
					declarationTokens.push(t.value);
				}
				const value = declaration(declarationTokens);
				if (shared === null || value.size === null || value.align === null) shared = null;
				else {
					const total = Math.ceil(shared / value.align) * value.align + value.size;
					shared = Number.isSafeInteger(total) ? total : null;
				}
			}
		}
		const kernel = {
			id: `${objectId}/entry@${token.start.toString(16)}`,
			object_id: objectId,
			representation: "ptx-declarations",
			name: name.value,
			symbol: null,
			parameter_count: parameters.length,
			parameter_bytes: parameterBytes,
			parameters,
			registers: {
				physical: null,
				sgpr: null,
				vgpr: null,
				agpr: null,
				virtual: [...virtual].map(([type, count]) => ({
					type,
					count
				}))
			},
			shared_bytes: shared,
			private_bytes: null,
			location: {
				container_id: objectId,
				offset: token.start,
				size: end - token.start,
				section_index: null,
				section_name: null
			},
			sources: {
				parameters: {
					container_id: objectId,
					offset: token.start,
					size: end - token.start,
					section_index: null,
					section_name: null
				},
				registers: null,
				shared: null,
				private: null
			},
			limitations: ["PTX registers are virtual declarations, not physical allocations. Parameter offsets/sizes and entry-local static shared bytes are derived from supported declarations; module shared bytes, dynamic allocation, device ABI and runtime allocation were not verified."]
		};
		let coverage = "complete";
		if (parameterBytes === null) {
			coverage = "partial";
			kernel.limitations.push("Unsupported PTX parameter declarations or overflowing layouts leave parameter sizes/offsets and the total byte count unknown.");
		}
		if (shared === null) {
			coverage = "partial";
			kernel.limitations.push("Unsupported, dynamic or overflowing PTX shared declarations, or an absent entry body, leave entry-local static shared bytes unknown.");
		}
		if (kernel.registers.virtual.some((row) => row.count === null)) {
			coverage = "partial";
			kernel.limitations.push("Unsupported PTX register declarations or overflowing totals leave the affected virtual register count unknown.");
		}
		if (++kernelCount > 65536) throw new BinaryResourceFailure("structure", 65536, "PTX kernel count exceeds the facts budget");
		yield {
			kernel,
			coverage
		};
	}
	if (outerDepth !== 0) rejectGpu("Unbalanced PTX body");
}
var integer, arrayExtent, alignmentValue, ptxVersion, sizeOf, identifier, registerDeclaration, declaration, ptxTargetIdentity, readPtxTarget;
function init_PtxKernels() {
	return (init_PtxKernels = __esmMin((() => {
		init_binaryContainer();
		init_GpuSource();
		integer = (token) => {
			if (token === undefined || !/^(?:0|[1-9][0-9]*)$/u.test(token)) return null;
			const value = Number(token);
			return Number.isSafeInteger(value) ? value : null;
		};
		arrayExtent = (token) => {
			if (token === undefined) return null;
			const digits = token.endsWith("U") ? token.slice(0, -1) : token;
			if (/^0[0-7]+$/u.test(digits)) {
				const value = Number(`0o${digits.slice(1)}`);
				return Number.isSafeInteger(value) ? value : null;
			}
			if (!/^0(?:[xX][0-9a-fA-F]+|[bB][01]+)$/u.test(digits)) return integer(digits);
			const value = Number(digits);
			return Number.isSafeInteger(value) ? value : null;
		};
		alignmentValue = (token) => {
			const value = integer(token);
			return value !== null && value > 0 && 2 ** Math.round(Math.log2(value)) === value ? value : null;
		};
		ptxVersion = (token) => {
			const match = /^(\d+)\.(\d+)$/u.exec(token ?? "");
			if (match === null) return null;
			const major = Number(match[1]), minor = Number(match[2]);
			return Number.isSafeInteger(major) && Number.isSafeInteger(minor) ? {
				major,
				minor
			} : null;
		};
		sizeOf = (type) => {
			const match = /^\.(?:b|u|s|f)(8|16|32|64|128)$/u.exec(type ?? "");
			return match === null ? null : Number(match[1]) / 8;
		};
		identifier = /^(?:%?[A-Za-z_$][\w$@.]*|%[0-9][A-Za-z0-9_$]*)$/u;
		registerDeclaration = (next) => {
			let type = "";
			let t = next();
			while (!identifier.test(t.value)) {
				if (t.value === ";" || t.value === "}") rejectGpu("PTX register declaration has no type or name");
				type += `${type.length === 0 ? "" : " "}${t.value}`;
				t = next();
			}
			if (type.length === 0) rejectGpu("PTX register declaration has no type or name");
			const supported = /^\.(?:pred|[busf](?:8|16|32|64|128))$/u.test(type);
			let count = 0;
			const discard = (token) => {
				while (token.value !== ";") {
					if (token.value === "}") rejectGpu("Malformed PTX resource declaration");
					token = next();
				}
				return {
					type,
					count: null
				};
			};
			while (true) {
				let declared = 1;
				let separator = next();
				if (separator.value === "<") {
					const range = next();
					if (range.value === ";" || range.value === "}") return discard(range);
					const close = next();
					if (close.value !== ">") return discard(close);
					const value = integer(range.value);
					if (value === null || value === 0) return discard(next());
					declared = value;
					separator = next();
				}
				if (separator.value === ";") {
					const total = count + declared;
					return {
						type,
						count: supported && Number.isSafeInteger(total) ? total : null
					};
				}
				if (separator.value !== ",") return discard(separator);
				count += declared;
				if (!Number.isSafeInteger(count) || !supported) return discard(separator);
				const name = next();
				if (name.value === ";" || !identifier.test(name.value)) return discard(name);
			}
		};
		declaration = (source) => {
			const values = source[0] === ".param" ? source.slice(1) : source;
			let at = 0;
			let explicit = values[at] === ".align";
			let alignment = explicit ? alignmentValue(values[++at]) : null;
			if (explicit) at++;
			const vector = values[at] === ".v2" ? 2 : values[at] === ".v4" ? 4 : 1;
			if (vector !== 1) at++;
			const scalar = values[at++], unit = sizeOf(scalar);
			let pointer = false, layoutKnown = unit !== null && (!explicit || alignment !== null);
			while (values[at]?.startsWith(".")) {
				const qualifier = values[at++];
				if (qualifier === ".ptr") {
					if (pointer) layoutKnown = false;
					pointer = true;
				} else if (pointer && [
					".const",
					".global",
					".local",
					".shared"
				].includes(qualifier)) {} else if (qualifier === ".align") {
					const alignmentToken = values[at];
					if (alignmentToken !== undefined && /^[0-9]+$/u.test(alignmentToken)) at++;
					const declaredAlignment = alignmentValue(alignmentToken);
					if (declaredAlignment === null) layoutKnown = false;
					if (!pointer) {
						if (explicit) layoutKnown = false;
						explicit = true;
						alignment = declaredAlignment;
					}
				} else layoutKnown = false;
			}
			const name = identifier.test(values[at] ?? "") ? values[at] : null;
			if (name === null) layoutKnown = false;
			let cursor = at + (name === null ? 0 : 1);
			const dimensions = [];
			while (values[cursor] === "[") {
				const start = ++cursor;
				let parentheses = 0;
				while (cursor < values.length) {
					const value = values[cursor];
					if (value === "(") parentheses++;
					else if (value === ")") {
						if (parentheses === 0) break;
						parentheses--;
					} else if (value === "]" && parentheses === 0) break;
					cursor++;
				}
				if (values[cursor] !== "]" || parentheses !== 0) {
					layoutKnown = false;
					break;
				}
				dimensions.push(values.slice(start, cursor));
				cursor++;
			}
			if (cursor !== values.length || dimensions.length > 1) layoutKnown = false;
			let size = unit === null ? null : unit * vector;
			const type = scalar === undefined ? null : vector === 1 ? scalar : `.v${vector} ${scalar}`;
			const align = explicit ? alignment : size;
			if (dimensions.length === 1) {
				const dimension = dimensions[0], count = dimension.length === 1 ? arrayExtent(dimension[0]) : null;
				if (count === null || size === null || !Number.isSafeInteger(count * size)) layoutKnown = false;
				else size *= count;
			}
			if (align === null || !layoutKnown) return {
				name,
				type,
				size: null,
				align: null
			};
			return {
				name,
				type,
				size,
				align
			};
		};
		ptxTargetIdentity = (target) => target.replace(/^compute_(\d+[a-z]?)$/u, "sm_$1");
		readPtxTarget = (text) => {
			const stream = tokens(text);
			let depth = 0, target = null, targetIdentity = null, targetArchitecture = -1, ambiguous = false, unsupported = false, malformed = false;
			try {
				const first = stream.next();
				if (first.done || first.value.value !== ".version") return {
					recognized: false,
					target: null,
					limitation: null
				};
				const declaredVersion = stream.next();
				if (declaredVersion.done || ptxVersion(declaredVersion.value.value) === null) return {
					recognized: false,
					target: null,
					limitation: null
				};
				for (const token of stream) {
					if (token.value === "{") {
						depth++;
						continue;
					}
					if (token.value === "}") {
						if (depth > 0) depth--;
						continue;
					}
					if (depth !== 0) continue;
					if (token.value !== ".target") continue;
					const value = stream.next();
					if (value.done) {
						unsupported = true;
						continue;
					}
					const spelling = value.value.value, match = /^(?:sm_|compute_)([0-9]+)(?:a|f)?$/u.exec(spelling);
					if (match === null) {
						unsupported = true;
						continue;
					}
					const architecture = Number(match[1]);
					if (!Number.isSafeInteger(architecture)) {
						unsupported = true;
						continue;
					}
					const identity = ptxTargetIdentity(spelling);
					if (architecture > targetArchitecture) {
						target = spelling;
						targetIdentity = identity;
						targetArchitecture = architecture;
						ambiguous = false;
					} else if (architecture === targetArchitecture && targetIdentity !== identity) {
						ambiguous = true;
					}
				}
			} catch (cause) {
				if (!(cause instanceof BinaryFormatFailure)) throw cause;
				malformed = true;
			}
			const recognized = target !== null;
			const limitation = !recognized ? null : unsupported ? "Unsupported PTX target directives leave the effective target unknown." : ambiguous ? "Same-generation PTX target profiles cannot be represented by one effective target." : malformed ? "Malformed PTX text prevents complete target discovery." : null;
			return {
				recognized,
				target: limitation === null ? target : null,
				limitation
			};
		};
	})))();
}

//#endregion
//#region dist/gpu/GpuInventory.js
var PTX_INVALID_UTF8, readPtxText, GpuInventory, LLVM_BITCODE_LIMITATION, isLlvmBitcode, isGpuSection;
function init_GpuInventory() {
	return (init_GpuInventory = __esmMin((() => {
		init_strictUtf8();
		init_ClangOffloadBundle();
		init_GpuObject();
		init_CudaTarget();
		init_CudaFatbinary();
		init_GpuPayloadCodec();
		init_zstandardFrameAllowance();
		init_analysisErrorBase();
		init_binaryContainer();
		init_nativeSectionDirectory();
		init_resources();
		init_jsonValueByteLength();
		init_GpuSource();
		init_sha256Hex();
		init_GpuElfKernels();
		init_PtxKernels();
		PTX_INVALID_UTF8 = "PTX is not valid UTF-8 text";
		readPtxText = (bytes, coverage) => {
			try {
				if (coverage === "complete") return decodeStrictUtf8(bytes, "preserve");
				return strictUtf8Decoder("preserve").decode(bytes, { stream: true });
			} catch (cause) {
				if (!(cause instanceof TypeError)) throw cause;
				return null;
			}
		};
		GpuInventory = class {
			input;
			signal;
			objects = [];
			kernels = [];
			ptx_artifacts = [];
			limitations = ["Static declarations only; no GPU execution, SASS disassembly, host launch correlation or runtime compatibility was verified.", "Object IDs are positional identities scoped to artifact.sha256. Locations inside decoded objects name their containing object; they are not file offsets."];
			discovery = "complete";
			examined_sections = 0;
			unknown_section_names = 0;
			#factBytes = 0;
			#workBytes = 0;
			#outerTargets = new WeakMap();
			#selectedObjects;
			#selectedTargets;
			constructor(input, signal) {
				this.input = input;
				this.signal = signal;
				this.#selectedObjects = input.object_ids === undefined ? undefined : new Set(input.object_ids);
				this.#selectedTargets = input.targets === undefined ? undefined : new Set(input.targets);
				this.#retain({
					path: input.path,
					limitations: this.limitations
				});
				this.#factBytes += 1024;
			}
			#retain(value) {
				const bytes = jsonValueByteLength(value, GPU_REPORT_BYTES);
				if (bytes + 2 > 16777216 - this.#factBytes) throw new GpuReportCapacityFailure();
				this.#factBytes += bytes + 2;
			}
			#add(row, amdTarget) {
				if (row.raw_flags !== null || row.bundle_id !== null) this.#outerTargets.set(row, amdTarget ?? row.target);
				this.#retain(row);
				this.#retain(" ".repeat(32));
				this.objects.push(row);
			}
			#decoded(row, sha256, size) {
				this.#retain({
					sha256,
					decoded_size: size
				});
				row.sha256 = sha256;
				row.decoded_size = size;
			}
			#encodedExtent(row, size) {
				this.#retain({
					encoded_size: size,
					size
				});
				row.encoded_size = size;
				row.location.size = size;
			}
			#objectLimitations(row, messages) {
				this.#retain(messages);
				row.limitations.push(...messages);
			}
			/** Reserve input/output work atomically, before any payload allocation or read. */
			#budgetWork(...sizes) {
				let workBytes = this.#workBytes;
				for (const size of sizes) {
					if (size > Math.min(134217728, 512 * 1024 * 1024 - workBytes)) throw new BinaryResourceFailure("structure", GPU_OBJECT_BYTES, "GPU reads/decoding exceed 128 MiB per buffer or 512 MiB per inspection");
					workBytes += Number(size);
				}
				this.#workBytes = workBytes;
			}
			#selected(row) {
				return (this.#selectedObjects === undefined || this.#selectedObjects.has(row.id)) && (this.#selectedTargets === undefined || row.target !== null && this.#selectedTargets.has(row.target));
			}
			async inspect(source, depth = 0) {
				assertArtifactReadActive(this.signal);
				if (depth > 8) throw new BinaryResourceFailure("structure", 8, "GPU container nesting exceeds eight levels");
				const prefix = await source.read(0, Math.min(32, source.size));
				if (prefix.subarray(0, 4).equals(Buffer.from([
					80,
					237,
					85,
					186
				]))) {
					await this.#cuda(source);
					return "cuda-fatbin";
				}
				if (prefix.subarray(0, CLANG_BUNDLE_MAGIC.length).equals(CLANG_BUNDLE_MAGIC)) {
					await this.#hip(source, depth);
					return "hip-bundle";
				}
				if (prefix.subarray(0, CCOB_MAGIC.length).equals(CCOB_MAGIC)) {
					await this.#hip(source, depth);
					return "hip-bundle";
				}
				if (prefix.subarray(0, 4).equals(Buffer.from([
					127,
					69,
					76,
					70
				])) || prefix[0] === 77 && prefix[1] === 90) {
					const elf = prefix[0] === 127;
					const directory = await readGpuNativeDirectory(source, elf ? readElfSectionDirectory(source.size) : readPeSectionDirectory(source.size), () => yieldArtifactRead(this.signal));
					if (elf && (directory.machine === 190 || directory.machine === 224)) {
						const row = gpuObject(source, {
							offset: 0,
							size: source.size,
							kind: directory.machine === 190 ? "cubin" : "amdgpu"
						});
						this.#add(row);
						if (directory.machine === 190) {
							this.#target(row, readCudaTarget(source, directory));
						}
						if (directory.machine === 224) await this.#amdPayload(source, row, directory);
						else await this.#payload(source, row);
					} else {
						for (const section of directory.sections) {
							this.examined_sections++;
							if (section.name === null) {
								this.unknown_section_names++;
								this.discovery = "partial";
								continue;
							}
							if (!isGpuSection(section.name)) continue;
							if (!section.file_backed || section.compressed) {
								this.discovery = "partial";
								const message = `GPU section ${section.index} has no supported uncompressed file range`;
								this.#retain(message);
								this.limitations.push(message);
								continue;
							}
							const offset = gpuCount(section.offset), size = gpuCount(section.size);
							const borrowed = {
								size,
								containerId: source.containerId,
								read: (start, length) => {
									checkGpuRange(size, start, length);
									return source.read(offset + start, length);
								}
							};
							const row = gpuObject(source, {
								offset,
								size,
								kind: "native-section",
								metadata: {
									offset: section.header_offset,
									size: directory.format === "elf" ? directory.bits === 64 ? 64 : 40 : 40
								}
							});
							row.location.section_index = section.index;
							row.location.section_name = section.name;
							this.#add(row);
							const sectionSource = {
								...borrowed,
								containerId: row.id
							};
							try {
								await this.inspect(sectionSource, depth + 1);
								row.inspection = "complete";
							} catch (cause) {
								this.#retainFailure(row, cause);
								this.discovery = "partial";
							}
						}
					}
					return directory.format;
				}
				const probe = await source.read(0, Math.min(source.size, GPU_REPORT_BYTES));
				const complete = probe.length === source.size;
				const text = readPtxText(probe, complete ? "complete" : "prefix");
				const targetFacts = readPtxTarget(text ?? probe.toString("utf8"));
				if (targetFacts.recognized) {
					const row = gpuObject(source, {
						offset: 0,
						size: source.size,
						kind: "ptx"
					});
					if (text === null) row.limitations.push(PTX_INVALID_UTF8);
					if (!complete) row.limitations.push("PTX target scan reached the 16 MiB text budget before all module directives were examined.");
					if (complete && text !== null) {
						row.target = targetFacts.target;
						if (targetFacts.limitation !== null) row.limitations.push(targetFacts.limitation);
					}
					if (row.limitations.length > 0) {
						row.inspection = text === null ? "malformed" : "partial";
						this.discovery = "partial";
					}
					this.#add(row);
					await this.#payload(complete ? new GpuBufferSource(probe, source.containerId) : source, row, complete ? { standalonePtx: text === null ? null : {
						text,
						targetFacts
					} } : undefined);
					return "ptx";
				}
				if (!complete) throw new BinaryResourceFailure("structure", GPU_REPORT_BYTES, "Standalone text recognition exceeds the 16 MiB PTX budget before a target was established");
				throw new BinaryFormatFailure("unsupported", "No supported CUDA/HIP container or PTX declarations were identified");
			}
			#retainFailure(row, cause) {
				if (cause instanceof GpuReportCapacityFailure) throw cause;
				if (cause instanceof ZstandardFrameAllowanceError) throw projectZstandardFrameAllowance("inspect_gpu_code_objects", cause);
				if (cause instanceof AnalysisError) throw cause;
				const capacity = cause instanceof BinaryResourceFailure || isBinaryStringReadLimit(cause);
				if (!capacity && !(cause instanceof BinaryFormatFailure)) throw cause;
				row.inspection = capacity ? "capacity" : cause.kind === "unsupported" ? "unsupported" : "malformed";
				this.#objectLimitations(row, [cause.message]);
			}
			async #payload(source, row, { amdMetadata, declaredDecodedSize, standalonePtx } = {}) {
				if (this.input.analysis !== "kernels") return;
				if (!this.#selected(row)) {
					row.inspection = "not-selected";
					return;
				}
				if (row.compression === "unsupported") {
					row.inspection = "unsupported";
					return;
				}
				try {
					const decodedSize = declaredDecodedSize ?? row.decoded_size;
					let coverage = "complete";
					if (row.kind === "ptx" && (decodedSize === null || decodedSize > 16777216)) throw new BinaryResourceFailure("structure", GPU_REPORT_BYTES, "PTX text exceeds the 16 MiB retained report budget");
					const compression = row.compression;
					const compressed = compression === "zstd" || compression === "zlib" || compression === "lz4";
					if (compressed && decodedSize === null) rejectGpu("Compressed GPU object has no decoded length");
					this.#budgetWork(row.location.size, ...compressed ? [decodedSize] : []);
					let bytes = await source.read(row.location.offset, row.location.size);
					if (compressed) {
						try {
							bytes = await decodeGpuPayload(bytes, compression, Number(decodedSize), this.signal);
						} catch (cause) {
							if (cause instanceof ZstandardFrameAllowanceError) throw projectZstandardFrameAllowance("inspect_gpu_code_objects", cause);
							if (cause instanceof BinaryResourceFailure || cause instanceof AnalysisError) throw cause;
							assertArtifactReadActive(this.signal);
							throw new BinaryFormatFailure("malformed", "GPU payload decompression failed");
						}
					}
					this.#decoded(row, sha256Hex(bytes), bytes.length);
					const decoded = new GpuBufferSource(bytes, row.id);
					if (row.kind === "ptx") {
						if (standalonePtx === null) return;
						let length = bytes.length;
						if (row.raw_flags !== null) while (length > 0 && bytes[length - 1] === 0) length--;
						const content = bytes.subarray(0, length);
						const text = standalonePtx?.text ?? readPtxText(content, "complete");
						if (text === null) return rejectGpu(PTX_INVALID_UTF8);
						const target = standalonePtx?.targetFacts ?? readPtxTarget(text);
						const conflict = this.#target(row, {
							value: target.target,
							key: target.target,
							scope: "exact",
							...target.limitation === null ? {} : { limitation: target.limitation }
						});
						if (conflict !== undefined) coverage = "partial";
						const parsed = readPtxKernels(text, row.id);
						const artifact = {
							id: `${row.id}/ptx`,
							object_id: row.id,
							sha256: sha256Hex(content),
							media_type: "text/x-ptx",
							encoding: "utf-8",
							byte_length: content.length,
							text,
							location: gpuLocation(decoded, 0, content.length)
						};
						this.#retain(artifact);
						this.ptx_artifacts.push(artifact);
						for (const { kernel, coverage: kernelCoverage } of parsed) {
							if (conflict !== undefined) kernel.limitations.push(conflict);
							if (kernelCoverage === "partial") coverage = "partial";
							this.#retain(kernel);
							this.kernels.push(kernel);
						}
					} else if (row.kind === "cubin" || row.kind === "amdgpu") {
						if (row.kind === "amdgpu" && isLlvmBitcode(bytes)) throw new BinaryFormatFailure("unsupported", LLVM_BITCODE_LIMITATION);
						coverage = await this.#elfFacts(decoded, row, row.kind, amdMetadata);
					} else {
						row.inspection = "unsupported";
						this.#objectLimitations(row, ["Payload kind is outside kernel metadata coverage"]);
						return;
					}
					row.inspection = coverage;
				} catch (cause) {
					this.#retainFailure(row, cause);
				}
			}
			#target(row, payload) {
				const selectedTarget = row.target;
				const outerIdentity = this.#outerTargets.get(row) ?? null;
				const outer = typeof outerIdentity === "string" ? outerIdentity : outerIdentity?.key ?? null;
				const payloadKey = payload.scope === "amdgpu" ? payload.identity?.key ?? null : payload.key;
				const hasOuter = outer !== null;
				let state = "unknown";
				if (payload.value !== null && !hasOuter) state = "single-source";
				else if (outer !== null && payloadKey !== null) {
					if (payload.scope === "cuda-base") {
						const base = /^sm_([0-9]+)[a-z]*$/u.exec(outer)?.[1];
						const inner = /^sm_([0-9]+)$/u.exec(payloadKey)?.[1];
						if (base !== undefined && inner !== undefined) state = base === inner ? "base-only" : "conflict";
					} else if (payload.scope === "amdgpu") {
						if (outer === payloadKey) state = "consistent";
						else state = typeof outerIdentity === "object" && outerIdentity !== null && payload.identity !== null && outerIdentity.processor === payload.identity.processor ? "unknown" : "conflict";
					} else if (ptxTargetIdentity(outer) === ptxTargetIdentity(payloadKey)) state = "consistent";
					else state = "conflict";
				}
				this.#retain({
					payload_target: payload.value,
					cuda_target_header: payload.cudaHeader ?? null,
					amd_target_metadata: payload.amdMetadata ?? null,
					target_consistency: state,
					target: selectedTarget ?? payload.value
				});
				row.payload_target = payload.value;
				row.cuda_target_header = payload.cudaHeader ?? null;
				row.amd_target_metadata = payload.amdMetadata ?? null;
				row.target_consistency = state;
				if (selectedTarget === null) row.target = payload.value;
				if (row.target === null) this.discovery = "partial";
				if (state !== "conflict" && payload.limitation === undefined) return;
				const message = state === "conflict" ? `Conflicting target declarations: inventory ${outer}; payload ${payload.value}. Target agreement is not established.` : payload.limitation;
				if (!row.limitations.includes(message)) this.#objectLimitations(row, [message]);
				return message;
			}
			async #amdPayload(source, row, directory) {
				const child = {
					size: row.location.size,
					containerId: row.id,
					read: (offset, size) => {
						checkGpuRange(row.location.size, offset, size);
						this.#budgetWork(size);
						return source.read(row.location.offset + offset, size);
					}
				};
				try {
					if (directory === undefined && isLlvmBitcode(await child.read(0, Math.min(4, child.size)))) {
						this.discovery = "partial";
						if (this.input.analysis !== "kernels" || !this.#selected(row)) this.#objectLimitations(row, [LLVM_BITCODE_LIMITATION]);
						await this.#payload(source, row);
						return;
					}
					const native = directory ?? await readGpuNativeDirectory(child, readElfSectionDirectory(child.size), () => yieldArtifactRead(this.signal));
					const inspected = await readAmdElfMetadata(child, native);
					const prepared = inspected.ok ? inspected.value : inspected.error.partial;
					if (prepared.limitations.length > 0) this.discovery = "partial";
					this.#target(row, {
						value: prepared.target,
						identity: prepared.targetIdentity,
						amdMetadata: prepared.targetMetadata,
						scope: "amdgpu"
					});
					if (!inspected.ok) {
						this.discovery = "partial";
						if (this.input.analysis === "kernels" && this.#selected(row)) await this.#elfFacts(child, row, "amdgpu", prepared);
						else this.#objectLimitations(row, prepared.limitations);
						this.#retainFailure(row, inspected.error.cause);
						return;
					}
					const payloadSelected = this.input.analysis === "kernels" && this.#selected(row);
					await this.#payload(source, row, { amdMetadata: prepared });
					if (!payloadSelected && prepared.limitations.length > 0) this.#objectLimitations(row, prepared.limitations);
				} catch (cause) {
					this.discovery = "partial";
					this.#retainFailure(row, cause);
				}
			}
			async #elfFacts(source, row, kind, preparedAmd) {
				let conflict;
				const parsed = await readGpuElfKernels(source, kind, (kernel) => {
					if (conflict !== undefined) kernel.limitations.push(conflict);
					this.#retain(kernel);
					this.kernels.push(kernel);
				}, () => yieldArtifactRead(this.signal), preparedAmd, (target) => {
					conflict = this.#target(row, target);
				});
				this.#objectLimitations(row, parsed.limitations);
				return conflict !== undefined ? "partial" : parsed.coverage;
			}
			async #cuda(source) {
				for await (const { row, declaredDecodedSize } of readCudaFatbinary(source, this.signal)) {
					this.#add(row);
					await this.#payload(source, row, { declaredDecodedSize });
				}
			}
			async #hip(source, depth) {
				let base = 0;
				let bundles = 0;
				let legacyWindow;
				while (base < source.size) {
					if (++bundles % 128 === 0) {
						await scheduler.yield();
						assertArtifactReadActive(this.signal);
					}
					const prefix = await source.read(base, Math.min(32, source.size - base));
					if (prefix.subarray(0, 24).equals(CLANG_BUNDLE_MAGIC)) {
						const directory = await readClangBundleDirectory(source, base, this.signal);
						for (const { object: row, amdTarget } of directory.declarations) {
							this.#add(row, amdTarget);
							if (row.kind === "host") row.inspection = "complete";
							else if (row.kind === "amdgpu" && row.target === null) await this.#amdPayload(source, row);
							else await this.#payload(source, row);
						}
						base = await nextGpuContainerOffset(source, directory.end);
						continue;
					}
					if (!prefix.subarray(0, CCOB_MAGIC.length).equals(CCOB_MAGIC)) rejectGpu("Unexpected bytes between Clang offload bundles");
					const header = readCcobHeader(prefix, source.size - base), { width, decoded: declaredDecodedSize, hash, version, method } = header;
					let total = header.total;
					let extentKnown = version !== 1;
					const row = gpuObject(source, {
						offset: base + width,
						size: total - width,
						kind: "hip-bundle",
						metadata: {
							offset: base,
							size: width
						}
					});
					row.compression = method === 0 ? "zlib" : method === 1 ? "zstd" : "unsupported";
					row.compression_id = `ccob:${version}:${method}`;
					recordDeclaredGpuDecodedSize(row, declaredDecodedSize);
					if (extentKnown) this.#add(row);
					if (row.compression === "unsupported") {
						row.inspection = "unsupported";
						this.#objectLimitations(row, ["Unsupported CCOB compression method"]);
						this.discovery = "partial";
					} else try {
						const inputSize = version === 1 ? Math.min(total - width, GPU_OBJECT_BYTES) : total - width;
						let data;
						if (version === 1) {
							const start = base + width;
							const cached = legacyWindow !== undefined && start >= legacyWindow.offset && start < legacyWindow.offset + legacyWindow.bytes.length;
							const readWindow = async () => {
								this.#budgetWork(inputSize, declaredDecodedSize);
								legacyWindow = undefined;
								const bytes = await source.read(start, inputSize);
								legacyWindow = {
									offset: start,
									bytes
								};
								return bytes;
							};
							if (cached) this.#budgetWork(declaredDecodedSize);
							let encoded = cached ? legacyWindow.bytes.subarray(start - legacyWindow.offset) : await readWindow();
							const decoded = Number(declaredDecodedSize);
							const available = encoded.length;
							const compression = row.compression;
							const completed = await decodeGpuPayloadStream(encoded, compression, decoded, this.signal).catch(async (cause) => {
								if (!(cause instanceof BinaryFormatFailure) || !cached || available >= inputSize) throw cause;
								encoded = undefined;
								return decodeGpuPayloadStream(await readWindow(), compression, decoded, this.signal);
							});
							total = width + completed.consumedBytes;
							extentKnown = true;
							this.#encodedExtent(row, completed.consumedBytes);
							this.#add(row);
							data = completed.buffer;
							if (data.length !== decoded) rejectGpu("GPU decompressed length disagrees with its declaration");
						} else {
							this.#budgetWork(inputSize, declaredDecodedSize);
							data = await decodeGpuPayload(await source.read(base + width, inputSize), row.compression, Number(declaredDecodedSize), this.signal);
						}
						if (new BinaryReader(createHash("md5").update(data).digest(), true, "ccob").word(0, 64) !== hash) rejectGpu("CCOB truncated MD5 does not match decoded bytes");
						this.#decoded(row, sha256Hex(data), data.length);
						await this.inspect(new GpuBufferSource(data, row.id), depth + 1);
						row.inspection = "complete";
					} catch (cause) {
						this.#retainFailure(row, cause);
						this.discovery = "partial";
					}
					if (!extentKnown) {
						if (row.inspection !== "capacity") try {
							total = await findLegacyCcobRecoveryTotal(source, base);
						} catch (cause) {
							if (!(cause instanceof BinaryResourceFailure)) throw cause;
							this.#retainFailure(row, cause);
						}
						if (row.inspection === "capacity") {
							this.#objectLimitations(row, ["CCOB v1 codec extent is unknown; the retained size is only the containing tail, not a completed codec extent. Later siblings were not inferred."]);
							this.#add(row);
							return;
						}
						this.#encodedExtent(row, total - width);
						this.#objectLimitations(row, [total < source.size - base ? "CCOB v1 codec extent is unknown; the next CCOB marker is only an uncertain recovery candidate." : "CCOB v1 codec extent is unknown; the retained range extends to the container end."]);
						this.#add(row);
					}
					base = await nextGpuContainerOffset(source, base + total);
				}
			}
		};
		LLVM_BITCODE_LIMITATION = "LLVM bitcode kernel metadata is outside current coverage; bitcode validity and inner target were not inspected.";
		isLlvmBitcode = (bytes) => {
			if (bytes.length < 4) return false;
			const magic = new BinaryReader(bytes, true, "llvm-bitcode").u32(0);
			return magic === 3737142082 || magic === 186106078;
		};
		isGpuSection = (name) => [
			".nv_fatbin",
			".nv_fatb",
			".hip_fatbin",
			".hip_fat",
			".llvm.offloading"
		].includes(name);
	})))();
}

//#endregion
//#region dist/gpu/GpuCodeObjectsProvider.js
var OPERATION, GpuCodeObjectsProvider;
function init_GpuCodeObjectsProvider() {
	return (init_GpuCodeObjectsProvider = __esmMin((() => {
		init_resources();
		init_GpuCodeObjectsProviderIdentity();
		init_gpuCodeObjectsEvidence();
		init_gpuCodeObjects();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_parseFailureAnalysisError();
		init_zstandardFrameAllowance();
		init_providerAdapterError();
		init_result();
		init_analysisErrorCleanup();
		init_binaryContainer();
		init_GpuSource();
		init_GpuInventory();
		init_providerCleanupError();
		init_RegularFile();
		init_errorMessage();
		OPERATION = "inspect_gpu_code_objects";
		GpuCodeObjectsProvider = class {
			identity = GPU_CODE_OBJECTS_PROVIDER_IDENTITY;
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
				if (this.#busy) return err(new AnalysisResourceConstraintError(OPERATION, "capacity", "One GPU inspection is already active", { concurrent_inspections: 1 }, {
					retryable: true,
					measuredExhaustion: true
				}));
				this.#busy = true;
				let progress;
				try {
					return ok(await this.#resources.run(() => withArtifactRegularFile(input.path, this.#resources, options?.signal, ({ handle: file }) => this.#read(file, input, options?.signal, (value) => {
						progress = value;
					}))));
				} catch (cause) {
					const { cause: primary, origin } = artifactFilePrimaryFacts(cause);
					const formatFailure = parseFailureAnalysisError(OPERATION, input.path, primary);
					const frameAllowance = primary instanceof ZstandardFrameAllowanceError ? primary : cause instanceof ZstandardFrameAllowanceError ? cause : undefined;
					let error;
					if (frameAllowance !== undefined) error = projectZstandardFrameAllowance(OPERATION, frameAllowance);
					else if (origin === "owned-or-classified" && primary instanceof AnalysisError) error = primary;
					else if (primary instanceof BinaryResourceFailure) error = parseLimitConstraint(OPERATION, "memory", primary, {
						reportedLimitContext: {
							maximum_object_bytes: GPU_OBJECT_BYTES,
							maximum_report_bytes: GPU_REPORT_BYTES
						},
						retryable: false,
						remediationAction: `${primary.message} This release has no runtime override for that GPU parser allowance. Additional host memory does not raise it. Repeating the unchanged request fails the same way.`
					});
					else if (formatFailure !== undefined) error = formatFailure;
					else if (origin === "owned-or-classified" && primary instanceof ArtifactReaderFailure && primary.reason === "cancelled") error = cancelledBy(OPERATION, carriedReason(artifactFileCancellationCause(primary)));
					else if (origin === "owned-or-classified" && primary instanceof ArtifactReaderFailure && primary.reason === "integrity") error = readerIntegrityFailure(OPERATION, input.path, primary, { cause });
					else if (primary instanceof Error && "code" in primary && (primary.code === "EACCES" || primary.code === "EPERM")) error = new AnalysisAccessDeniedError(OPERATION, input.path, primary.code, { cause: primary });
					else if (isSelectedRegularFileError(primary)) error = selectedFileTargetError(input.path, primary, cause);
					else if (origin === "owned-or-classified" && primary instanceof ArtifactReaderFailure && primary.reason === "limit") error = new AnalysisResourceConstraintError(OPERATION, "memory", primary.message, { maximum_object_bytes: GPU_OBJECT_BYTES }, {
						cause: primary,
						retryable: false,
						remediationAction: `${primary.message} The GPU object allowance is ${String(GPU_OBJECT_BYTES)} bytes. This release has no runtime override. Additional host memory does not raise it. Repeating the unchanged request fails the same way.`
					});
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
						const report = gpuCodeObjectsSchema.safeParse(completed.value);
						if (report.success) error.retainPartialObservation(createGpuCodeObjectsEvidence(report.data, this.identity, input));
					}
					if (error.partialObservation === undefined && progress !== undefined && progress.inventory.objects.length > 0) {
						const partial = gpuCodeObjectsPartialSchema.parse({
							kind: "gpu-code-objects-partial",
							artifact: {
								path: input.path,
								observed_file_size: progress.size,
								sha256: null,
								file_identity: "unverified"
							},
							analysis: input.analysis,
							objects: progress.inventory.objects,
							kernels: progress.inventory.kernels,
							ptx_artifacts: progress.inventory.ptx_artifacts,
							coverage: {
								discovery: "partial",
								payloads: "partial"
							},
							limitations: [...progress.inventory.limitations, "Only completed declarations observed before interruption are retained. Root file identity and completeness were not verified; positional IDs are scoped to this interrupted observation."]
						});
						error.retainPartialObservation(createGpuCodeObjectsPartialEvidence(partial, this.identity, input));
					}
					bindArtifactFileCleanup(cause, error);
					return err(error);
				} finally {
					this.#busy = false;
				}
			}
			async #read(file, input, signal, retainProgress) {
				const initial = await file.stat({ bigint: true });
				const size = gpuCount(initial.size);
				const source = new GpuFileSource(file, size, signal);
				const sha256 = await source.digest();
				if (input.expected_sha256 !== undefined && sha256 !== input.expected_sha256) throw new AnalysisArtifactChangedError(OPERATION, input.path, "GPU source does not match the inventory's selected SHA-256");
				const inventory = new GpuInventory(input, signal);
				retainProgress({
					inventory,
					size
				});
				const format = await inventory.inspect(source);
				const after = await file.stat({ bigint: true });
				const named = await lstat(input.path, { bigint: true }).catch((cause) => {
					if (cause instanceof Error && "code" in cause && [
						"ENOENT",
						"ENOTDIR",
						"ELOOP"
					].includes(String(cause.code))) throw new ArtifactReaderFailure("integrity", "Selected GPU path changed during inspection", {
						cause,
						integrityCheck: "container-identity"
					});
					throw cause;
				});
				if ([after, named].some((state) => !sameRegularFileState(initial, state))) throw new ArtifactReaderFailure("integrity", "GPU source changed during inspection", { integrityCheck: "container-identity" });
				const leaves = inventory.objects.filter((row) => row.kind !== "cuda-fatbin" && row.kind !== "hip-bundle" && row.kind !== "native-section" && row.kind !== "host");
				return gpuCodeObjectsSchema.parse({
					artifact: {
						path: input.path,
						file_size: size,
						sha256,
						bytes_read: source.bytesRead
					},
					format,
					analysis: input.analysis,
					objects: inventory.objects,
					kernels: inventory.kernels,
					ptx_artifacts: inventory.ptx_artifacts,
					coverage: {
						discovery_scope: "supported-section-names-and-standalone-formats",
						discovery: inventory.discovery,
						payloads: input.analysis === "inventory" ? "not-requested" : leaves.every((row) => row.inspection === "complete") && inventory.discovery === "complete" ? "complete" : "partial",
						examined_sections: inventory.examined_sections,
						unknown_section_names: inventory.unknown_section_names
					},
					limitations: [...inventory.limitations, "Full-file SHA-256 streams every file byte; section and selected payload reads add to artifact.bytes_read. Retained Evidence is historical and never reopens the target."]
				});
			}
		};
	})))();
}

//#endregion
//#region dist/composition/gpu.js
var createGpuCodeObjectsService;
function init_gpu() {
	return (init_gpu = __esmMin((() => {
		init_GpuCodeObjectsService();
		init_GpuCodeObjectsProvider();
		createGpuCodeObjectsService = () => new GpuCodeObjectsService(new GpuCodeObjectsProvider());
	})))();
}

//#endregion
//#region dist/cli/gpuCommands.js
var gpuCommands_exports = /* @__PURE__ */ __exportAll({ registerGpuCommands: () => registerGpuCommands });
var registerGpuCommands;
function init_gpuCommands() {
	return (init_gpuCommands = __esmMin((() => {
		init_gpu();
		init_gpuToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerGpuCommands = (cli, logger) => {
			const deliver = deliverWithService(createGpuCodeObjectsService, "gpu-code-objects");
			registerContractCommand(cli, logger, contractNamed(GPU_TOOL_CONTRACTS, "inspect_gpu_code_objects"), {
				description: "Inspect embedded CUDA/HIP targets and selected static kernel metadata",
				positionals: ["path"],
				callerPaths: ["path"],
				evidenceDelivery: true,
				viewDelivery: {
					invalidJson: "view must be valid JSON",
					kind: "gpu-code-objects"
				},
				runtimeJson: {
					object_ids: "object_ids must be valid JSON",
					targets: "targets must be valid JSON"
				},
				fields: {
					path: { description: "Local ELF/PE, CUDA fatbin, CUBIN, PTX or HIP bundle" },
					analysis: { description: "Inventory GPU targets or decode selected kernel metadata" },
					expected_sha256: {
						name: "expected_sha256",
						description: "Inventory SHA-256 as 64 lowercase hex digits; required with --object_ids"
					},
					object_ids: {
						name: "object_ids",
						description: "JSON array of exact object IDs to decode"
					},
					targets: { description: "JSON array of exact target declarations to decode" },
					view: { description: "JSON GPU object/kernel/PTX page selection; requires --detail summary and --evidence_output" }
				}
			}, (input, context) => deliver({
				...input,
				detail: "complete"
			}, context));
		};
	})))();
}

//#endregion
export { gpuCommands_exports, init_gpuCommands };