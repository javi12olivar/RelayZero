import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { X as currentZstandardFrameAllowance, Z as init_zstandardFrameAllowance, tt as zstandardWorkLimitFacts } from "./analysisErrorProjection-B0_t_nHz.js";
import { i as init_configurationErrors } from "./configurationErrors-DgUy2JKH.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { A as absoluteLocalPathStringSchema, C as init_parseFailure, J as init_schemaConstraints, K as distinctItems, O as truncatedInput, S as hostRangeErrorKind, T as malformedInput, b as ParseFailureError, j as init_localPath, k as unsupportedInput, o as jsonValueSchema, r as init_jsonValue, x as decodeLimit } from "./jsonValue-BIEmjG1z.js";
import { A as init_binaryContainer, I as init_virtualFileMapping, L as resolveMappedFileOffset, S as BinaryReader$1, b as BinaryFormatFailure, it as sha256Hex, rt as init_sha256Hex } from "./canonicalDigest-DUQN3Yyz.js";
import { _ as init_analysisErrorCore, a as AnalysisCapabilityUnavailableError, h as carriedReason, l as AnalysisResourceConstraintError, m as cancelledBy, u as AnalysisTimeoutError } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_budget, t as Budget } from "./budget-CGAFFXhi.js";
import { a as nativeEvidenceEffects, d as toolEffects, i as init_toolEffects, r as evidenceEffects, u as toolContractMetadata } from "./toolEffects-2_RvkT6b.js";
import { i as strictUtf8Decoder, n as init_strictUtf8, r as isStrictUtf8 } from "./strictUtf8-Cx_KgW8Z.js";
import { J as init_zipPackageFormat, X as zipPackageFormatForPath, ot as init_binaryTargetTypes, q as hasZipSignature, rt as PE_CODEVIEW_PREFIX_BYTES, st as isMachOFormat } from "./evidence-z4eWkAQk.js";
import { r as init_providerAdapterError, t as ProviderAdapterError } from "./providerAdapterError-CdFzW4Ag.js";
import { n as init_byteToHex, t as byteToHex } from "./byteToHex-Xt_ueDjR.js";
import { Sn as init_boundedList, bn as boundedList, xn as describeBoundedList } from "./interfaceBuilderGraph-BpsIKsqX.js";
import { a as init_machoCpuIdentity, c as machoCpuSubtypeBase, l as machoHostSubtypeRank } from "./machoCpuIdentity-BfL0-CNI.js";
import { Nr as init_readFileHandleRange, Pr as readFileHandleRange, Qt as init_artifactReaderLimits, Xt as artifactReaderLimitsInputSchema, d as zstandardFrameKind, f as zstandardFrameReads, u as init_zstandardFrameWire } from "./resources-C5FMDwcC.js";
import { Am as cStringBytes, Dm as ESP_FLASH_SECTOR_BYTES, Fm as hex$2, Im as init_espImageStructures, Jm as parseInesLayout, Km as init_inesContainer, Lm as offsetText, Mm as decodeEspSignatureBlock, Nm as espSignatureSlot, Om as ESP_SIGNATURE_BLOCK_BYTES, Pm as firstUnerased, Qp as init_toolOutputSchemaPrimitives, Rm as u16, Um as artifactOccurrenceSchema, Wm as init_artifactGraph, a as init_toolOutputSchemaGroups, ch as init_keyedArchive, dm as appleAssetCatalogInputSchema, dn as analysisDetailSchema, eh as hasMftFileRecordHeader, em as requireOutputSchema, jm as decodeEspDescriptor, km as cString, lh as keyedArchiveInputSchema, nh as init_ntfsMft, pm as init_appleAssetCatalog, pn as init_analysisDetail, qm as nesContainerFormat, t as artifactOutputSchemas, zm as u32 } from "./toolOutputSchemaGroups-CDSPEFEc.js";
import { a as readPeSectionHeader, t as init_peSectionHeader } from "./peSectionHeader-BqXmkwjd.js";
import { I as hasBinaryPlistSignature, z as init_appleArchiveFormat } from "./ArtifactCommandPath-DDu6EnVS.js";
import { c as dylibResolutionInputSchema, u as init_dylibResolution } from "./electronFuses-BR2MuGUf.js";
import { A as init_machoLoadCommands, D as MachoLoadCommandCursor, R as readMachoLoadCommandTableHeader, W as classifyFatContainerEvidence, Y as init_machoContainer, Z as readFatContainerHeader, it as validateFatSliceIdentity, nt as readMachoHeaderPrefixFacts } from "./machoLoadCommandReader-B5f4kamk.js";
import { a as readPeOptionalHeaderStructure, f as init_dosMz, g as parseMzHeaderEvidence, l as readPeCoffHeader, n as readPeOptionalHeaderDirectory, p as mzWindowsHeaderLayoutLimitation, r as readPeOptionalHeaderFixedFields, s as init_peCoffHeader, t as init_peOptionalHeader } from "./peOptionalHeader-CeaiI83J.js";
import { i as readElfFixedHeader, n as elfFixedHeaderWidth, r as init_elfFixedHeader } from "./elfFixedHeader-C98GFkO6.js";
import { Mt as describeLaunchFailure, Nt as init_launchFailure, P as runtimeExhaustionReport, Pt as launcherFailureOf, c as OwnedCommandFailure, j as init_RuntimeExhaustion, u as init_OwnedCommand } from "./OwnedCommandCleanup-pq-3btab.js";
import { i as readPeOptionalHeader, n as init_peMachine, t as decodePeMachine } from "./peMachine-OrU9gMl1.js";
import { z } from "zod";
import { Buffer as Buffer$1, constants } from "node:buffer";
import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { constants as constants$1, crc32, zstdCompressSync, zstdDecompress, zstdDecompressSync } from "node:zlib";
import { BinaryReader, WireType } from "@bufbuild/protobuf/wire";

//#region dist/domain/apple/artifactTargetApplicability.js
var artifactTargetRefusal;
function init_artifactTargetApplicability() {
	return (init_artifactTargetApplicability = __esmMin((() => {
		init_binaryTargetTypes();
		artifactTargetRefusal = (operation, target) => {
			const bundle = target.bundleInfoPlist !== undefined;
			const refuse = (reason) => ({
				code: "target_kind_unsupported",
				reason
			});
			switch (operation) {
				case "decode_interface_builder":
				case "inspect_asset_catalog": return bundle ? undefined : refuse(`${operation} requires an active .app bundle target`);
				case "inspect_keyed_archive": return bundle || target.kind === "artifact" && target.format === "plist" ? undefined : refuse("inspect_keyed_archive requires an active plist or .app bundle");
				case "trace_dylib_resolution":
					if (target.kind !== "executable") return refuse("trace_dylib_resolution requires an active Mach-O or .app bundle target");
					return isMachOFormat(target.format) ? undefined : {
						code: "target_format_unsupported",
						reason: "trace_dylib_resolution requires an active Mach-O or .app bundle target"
					};
				default: return undefined;
			}
		};
	})))();
}

//#endregion
//#region dist/kernel/nodeCodecResult.js
var nodeCodecResult;
function init_nodeCodecResult() {
	return (init_nodeCodecResult = __esmMin((() => {
		nodeCodecResult = (value) => {
			if (typeof value !== "object" || value === null || !("buffer" in value) || !Buffer.isBuffer(value.buffer) || !("engine" in value) || typeof value.engine !== "object" || value.engine === null || !("bytesWritten" in value.engine) || typeof value.engine.bytesWritten !== "number") throw new Error("Built-in decoder omitted its buffer or consumed-input accounting");
			return {
				buffer: value.buffer,
				consumedBytes: value.engine.bytesWritten
			};
		};
	})))();
}

//#endregion
//#region dist/domain/compression/zstandardExactFrame.js
function* frameAt(bytes, offset, kind, progress) {
	let cursor = offset + 4;
	const reads = zstandardFrameReads(kind, offset);
	let step = reads.next();
	while (!step.done) {
		if (needsFrameWalkPause(progress)) yield;
		const read = step.value;
		const end = cursor + read.length;
		if (end > bytes.length) return failure(read.eof, read.failureOffset);
		step = reads.next(read.inspect ? bytes.subarray(cursor, end) : unreadBytes);
		cursor = end;
	}
	if (step.value !== undefined) return failure("malformed", step.value.offset, step.value.code);
	return {
		offset,
		length: cursor - offset,
		kind
	};
}
/**
* Exact frame boundaries for one buffer. The walk does not ask the decoder
* how many bytes it consumed.
*/
function* walkFrames(bytes, allowance, mode) {
	const frames = [];
	const progress = { reads: 0 };
	let offset = 0;
	while (offset < bytes.length) {
		const kind = zstandardFrameKind(bytes, offset);
		if (frames.length === allowance.maxFrames) {
			if (kind !== undefined) return workLimit(allowance, offset);
			if (mode === "exact") return failure("trailing_bytes", offset);
			break;
		}
		if (offset + 4 > bytes.length) {
			if (frames.length === 0) return failure("truncated_frame_header", offset);
			if (mode === "exact") return failure("trailing_bytes", offset);
			break;
		}
		if (kind === undefined) {
			if (frames.length === 0) return failure("malformed", offset, "magic");
			if (mode === "exact") return failure("trailing_bytes", offset);
			break;
		}
		const next = yield* frameAt(bytes, offset, kind, progress);
		if ("ok" in next) return next;
		frames.push(next);
		offset += next.length;
	}
	if (frames.length === 0) return failure("truncated_frame_header", 0);
	return {
		ok: true,
		frames,
		consumed: offset
	};
}
function* prepareDecode(bytes, options) {
	const resolved = options.allowance === undefined ? currentZstandardFrameAllowance() : {
		ok: true,
		value: options.allowance
	};
	if (!resolved.ok) return {
		ok: false,
		reason: "invalid_allowance",
		offset: 0,
		configuration: resolved.error
	};
	const mode = options.mode ?? "exact";
	const walked = yield* walkFrames(bytes, resolved.value, mode);
	if ("reason" in walked) return walked;
	return {
		frames: walked.frames,
		consumed: walked.consumed,
		options: {
			maxOutputLength: options.maxOutputLength ?? constants.MAX_LENGTH,
			windowLogMax: options.windowLogMax ?? 27,
			...options.dictionary === undefined ? {} : { dictionary: options.dictionary },
			rejectTrailing: nodeDecodesStrictSequence()
		}
	};
}
var ZSTANDARD_WINDOW_LOG_MAX, ZSTANDARD_FRAME_REASONS, READS_PER_PAUSE, needsFrameWalkPause, failure, workLimit, unreadBytes, decoderCode, decoderFailure, isFrameFailure, strictSequence, nodeDecodesStrictSequence, unzstd, decompress, decompressSequence, ownedZstandardBytes, withinOutput, decodeDataFrame, finishFrames, decodeFrames, decodeZstandardFrames, decodeZstandardFramesCooperative;
function init_zstandardExactFrame() {
	return (init_zstandardExactFrame = __esmMin((() => {
		init_nodeCodecResult();
		init_parseFailure();
		init_zstandardFrameAllowance();
		init_zstandardFrameWire();
		ZSTANDARD_WINDOW_LOG_MAX = 27;
		ZSTANDARD_FRAME_REASONS = [
			"truncated_frame_header",
			"truncated_block",
			"truncated_checksum",
			"trailing_bytes",
			"work_limit",
			"malformed",
			"output_limit",
			"invalid_allowance"
		];
		READS_PER_PAUSE = 64;
		needsFrameWalkPause = (progress) => ++progress.reads % READS_PER_PAUSE === 0;
		failure = (reason, offset, code, detail) => ({
			ok: false,
			reason,
			offset,
			...code === undefined ? {} : { code },
			...detail === undefined ? {} : { detail }
		});
		workLimit = (allowance, offset) => ({
			ok: false,
			offset,
			...zstandardWorkLimitFacts(allowance)
		});
		unreadBytes = new Uint8Array(0);
		decoderCode = (cause) => {
			if (typeof cause !== "object" || cause === null || !("code" in cause)) return undefined;
			const code = cause.code;
			return typeof code === "string" ? code : undefined;
		};
		decoderFailure = (cause, offset) => {
			if (hostRangeErrorKind(cause) === "host-capacity") return failure("output_limit", offset);
			const code = decoderCode(cause);
			const detail = cause instanceof Error ? cause.message : undefined;
			if (code === "ZSTD_error_dstSize_tooSmall" || code === "ERR_BUFFER_TOO_LARGE") return failure("output_limit", offset, code, detail);
			return failure("malformed", offset, code, detail);
		};
		isFrameFailure = (value) => "reason" in value;
		;
		nodeDecodesStrictSequence = () => {
			if (strictSequence !== undefined) return strictSequence;
			const frame = zstdCompressSync(Buffer.from([97]));
			const pair = Buffer.concat([frame, frame]);
			let concatenated = false;
			try {
				concatenated = zstdDecompressSync(pair).length === 2;
			} catch {
				concatenated = false;
			}
			let strict = false;
			if (concatenated) {
				try {
					zstdDecompressSync(Buffer.concat([frame, Buffer.of(0)]), { rejectGarbageAfterEnd: true });
				} catch {
					strict = true;
				}
			}
			strictSequence = strict;
			return strictSequence;
		};
		unzstd = promisify(zstdDecompress);
		decompress = (input, offset, options) => {
			try {
				const result = nodeCodecResult(zstdDecompressSync(input, {
					info: true,
					maxOutputLength: Math.max(1, options.maxOutputLength),
					...options.rejectTrailing ? { rejectGarbageAfterEnd: true } : {},
					...options.dictionary === undefined ? {} : { dictionary: options.dictionary },
					params: { [constants$1.ZSTD_d_windowLogMax]: options.windowLogMax }
				}));
				if (result.consumedBytes !== input.length) return failure("malformed", offset, "unconsumed_input");
				return { bytes: result.buffer };
			} catch (cause) {
				return decoderFailure(cause, offset);
			}
		};
		decompressSequence = async (input, offset, options) => {
			try {
				const result = nodeCodecResult(await unzstd(input, {
					info: true,
					rejectGarbageAfterEnd: true,
					maxOutputLength: Math.max(1, options.maxOutputLength),
					...options.dictionary === undefined ? {} : { dictionary: options.dictionary },
					params: { [constants$1.ZSTD_d_windowLogMax]: options.windowLogMax }
				}));
				if (result.consumedBytes !== input.length) return failure("malformed", offset, "unconsumed_input");
				return { bytes: ownedZstandardBytes(result.buffer) };
			} catch (cause) {
				return decoderFailure(cause, offset);
			}
		};
		ownedZstandardBytes = (bytes) => {
			if (bytes.byteOffset === 0 && bytes.buffer.byteLength === bytes.byteLength) return bytes;
			const owned = Buffer.allocUnsafe(bytes.byteLength);
			bytes.copy(owned);
			return owned;
		};
		withinOutput = (bytes, remaining, offset) => bytes.length > remaining ? failure("output_limit", offset) : { bytes };
		decodeDataFrame = (bytes, frame, total, options) => {
			const remaining = options.maxOutputLength - total;
			const decoded = decompress(bytes.subarray(frame.offset, frame.offset + frame.length), frame.offset, {
				...options,
				maxOutputLength: Math.max(1, remaining)
			});
			if (isFrameFailure(decoded)) return decoded;
			const bounded = withinOutput(decoded.bytes, remaining, frame.offset);
			if (isFrameFailure(bounded)) return bounded;
			return { bytes: ownedZstandardBytes(bounded.bytes) };
		};
		finishFrames = (chunks, consumed, frames) => {
			const only = chunks.length === 1 ? chunks[0] : undefined;
			return {
				ok: true,
				bytes: only !== undefined ? only : chunks.length === 0 ? Buffer.alloc(0) : Buffer.concat(chunks),
				consumedBytes: consumed,
				frames
			};
		};
		decodeFrames = (bytes, frames, consumed, options) => {
			if (options.rejectTrailing) {
				const decoded = decompress(bytes.subarray(0, consumed), 0, options);
				if (isFrameFailure(decoded)) return decoded;
				const bounded = withinOutput(decoded.bytes, options.maxOutputLength, 0);
				if (isFrameFailure(bounded)) return bounded;
				return { ...finishFrames([ownedZstandardBytes(bounded.bytes)], consumed, frames.length) };
			}
			const chunks = [];
			let total = 0;
			for (const frame of frames) {
				if (frame.kind === "skippable") continue;
				const step = decodeDataFrame(bytes, frame, total, options);
				if (isFrameFailure(step)) return step;
				total += step.bytes.length;
				chunks.push(step.bytes);
			}
			return finishFrames(chunks, consumed, frames.length);
		};
		decodeZstandardFrames = (bytes, options = {}) => {
			const steps = prepareDecode(bytes, options);
			let next = steps.next();
			while (!next.done) next = steps.next();
			const prepared = next.value;
			if ("reason" in prepared) return prepared;
			return decodeFrames(bytes, prepared.frames, prepared.consumed, prepared.options);
		};
		decodeZstandardFramesCooperative = async (bytes, options, pause) => {
			const steps = prepareDecode(bytes, options);
			let next = steps.next();
			while (!next.done) {
				await pause();
				next = steps.next();
			}
			const prepared = next.value;
			if ("reason" in prepared) return prepared;
			if (prepared.options.rejectTrailing) {
				await pause();
				const decoded = await decompressSequence(bytes.subarray(0, prepared.consumed), 0, prepared.options);
				if (isFrameFailure(decoded)) return decoded;
				const bounded = withinOutput(decoded.bytes, prepared.options.maxOutputLength, 0);
				if (isFrameFailure(bounded)) return bounded;
				await pause();
				return finishFrames([bounded.bytes], prepared.consumed, prepared.frames.length);
			}
			const chunks = [];
			let total = 0;
			for (const frame of prepared.frames) {
				if (frame.kind === "skippable") continue;
				await pause();
				const step = decodeDataFrame(bytes, frame, total, prepared.options);
				if (isFrameFailure(step)) return step;
				total += step.bytes.length;
				chunks.push(step.bytes);
			}
			await pause();
			return finishFrames(chunks, prepared.consumed, prepared.frames.length);
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/androidOtaPayload.js
function* reconstructAndroidOtaPartitionSteps(partition, blockSize, readBlob, options = {}) {
	const refused = androidOtaExtractRefusalError(partition);
	if (refused !== null) return err(refused);
	const size = partition.newPartitionInfo.size;
	const budget = chargeReconstructionWork(partition.operations, blockSize);
	if (!budget.ok) return budget;
	const image = Buffer.alloc(size);
	const blobHashes = new WeakMap();
	try {
		for (const [index, operation] of partition.operations.entries()) {
			if (operation.typeCode === 6) {
				const written = writeExtents(image, operation.dstExtents, blockSize, new Uint8Array(), true);
				if (!written.ok) return written;
				continue;
			}
			const raw = operation.dataLength === 0 ? new Uint8Array() : readBlob(operation.dataOffset, operation.dataLength);
			if (raw.length !== operation.dataLength) return err(truncated(`operation data for ${partition.name} is truncated: expected ${String(operation.dataLength)} bytes`));
			if (operation.dataHashHex !== null) {
				const observed = blobHashes.get(raw) ?? sha256Hex(raw);
				blobHashes.set(raw, observed);
				if (operation.dataHashHex !== observed) return err({
					_tag: "AndroidOtaPayloadIntegrityFailure",
					message: `Android OTA partition ${partition.name} operation ${String(index)} data hash mismatch`,
					declaredHashHex: operation.dataHashHex,
					observedHashHex: observed
				});
			}
			let payload = raw;
			if (operation.typeCode === 14) {
				const dstBytes = destinationExtentBytes(operation.dstExtents, blockSize);
				if (!dstBytes.ok) return dstBytes;
				const maxOutputLength = Math.max(1, Math.min(dstBytes.value, ANDROID_OTA_MAX_EXTRACT_BYTES));
				const decoded = yield {
					raw,
					maxOutputLength
				};
				if (!decoded.ok) {
					if (decoded.reason === "invalid_allowance" && decoded.configuration !== undefined) return err(decoded.configuration);
					if (decoded.reason === "work_limit") return err(zstdWorkRefusal(decoded));
					if (decoded.reason === "output_limit") return err(capacity("REPLACE_ZSTD decoded output", maxOutputLength, "byte"));
					return err(malformedInput(ANDROID_OTA_FORMAT, "REPLACE_ZSTD operation payload is not a valid Zstandard frame", {
						offset: decoded.offset,
						field: decoded.reason
					}));
				}
				payload = decoded.bytes;
			}
			const written = writeExtents(image, operation.dstExtents, blockSize, payload, false);
			if (!written.ok) return written;
		}
	} catch (cause) {
		return err(malformed$2(cause instanceof Error ? `Android OTA partition ${partition.name} could not be reconstructed: ${cause.message}` : `Android OTA partition ${partition.name} could not be reconstructed`));
	}
	if (!hasCompleteExtentCoverage(partition.operations, size, blockSize)) return err(malformed$2(`Android OTA partition ${partition.name} destination extents do not cover the full ${String(size)}-byte image`));
	if (options.verifyDeclaredHash === false) return ok(image);
	const observed = sha256Hex(image);
	const declared = partition.newPartitionInfo.hashHex;
	if (declared !== null && declared !== observed) return err({
		_tag: "AndroidOtaPayloadIntegrityFailure",
		message: `Android OTA partition ${partition.name} hash mismatch`,
		declaredHashHex: declared,
		observedHashHex: observed
	});
	return ok(image);
}
var ANDROID_OTA_MAGIC, ANDROID_OTA_MAGIC_BYTES, ANDROID_OTA_MAJOR_VERSION, ANDROID_OTA_HEADER_V2_BYTES, ANDROID_OTA_MAX_MANIFEST_BYTES, ANDROID_OTA_MAX_PARTITIONS, ANDROID_OTA_MAX_OPERATIONS, ANDROID_OTA_MAX_OPERATIONS_TOTAL, ANDROID_OTA_MAX_EXTENTS_TOTAL, ANDROID_OTA_MAX_SIGNATURE_BYTES, ANDROID_OTA_MAX_SIGNATURES, ANDROID_OTA_MAX_GROUPS, ANDROID_OTA_MAX_GROUP_PARTITION_NAMES, ANDROID_OTA_MAX_APEX, ANDROID_OTA_MAX_EXTRACT_BYTES, ANDROID_OTA_MAX_OPERATION_DATA_BYTES, ANDROID_OTA_DEFAULT_BLOCK_SIZE, ANDROID_OTA_PAYLOAD_LIMITATIONS, androidOtaExtractRefusalLimitation, INSTALL_OPERATION_NAMES, EXTRACTABLE_TYPES, ANDROID_OTA_FORMAT, malformed$2, truncated, unsupportedVersion, capacity, zstdWorkRefusal, androidOtaUnsupportedVersion, u32be, u64be, hasAndroidOtaPayloadMagic, recognizeAndroidOtaPayload, toBigInt, asSafeUint, asSafeInt, hex$1, protobufFailure, fail, unwrap, walk, parseAndroidOtaHeader, emptyPartitionInfo, decodeExtent, decodePartitionInfo, decodeOperation, decodePartition, decodeGroup, decodeApex, decodeDynamicMetadata, countAndroidOtaSignatures, decodeManifest, partitionFileName, operationCountsOf, isExtractable, parseAndroidOtaPayload, withAndroidOtaPayloadSignature, writeExtents, destinationExtentBytes, androidOtaDistinctOperationDataBytes, androidOtaExtractRefusalError, chargeReconstructionWork, hasCompleteExtentCoverage, driveAndroidOtaReconstruction, reconstructAndroidOtaPartition, reconstructAndroidOtaPartitionCooperative;
function init_androidOtaPayload() {
	return (init_androidOtaPayload = __esmMin((() => {
		init_zstandardExactFrame();
		init_zstandardFrameAllowance();
		init_configurationErrors();
		init_sha256Hex();
		init_parseFailure();
		init_result();
		ANDROID_OTA_MAGIC = "CrAU";
		ANDROID_OTA_MAGIC_BYTES = Buffer.from(ANDROID_OTA_MAGIC, "latin1");
		ANDROID_OTA_MAJOR_VERSION = 2n;
		ANDROID_OTA_HEADER_V2_BYTES = 24;
		ANDROID_OTA_MAX_MANIFEST_BYTES = 16 * 1024 * 1024;
		ANDROID_OTA_MAX_PARTITIONS = 4096;
		ANDROID_OTA_MAX_OPERATIONS = 65536;
		ANDROID_OTA_MAX_OPERATIONS_TOTAL = 262144;
		ANDROID_OTA_MAX_EXTENTS_TOTAL = 1048576;
		ANDROID_OTA_MAX_SIGNATURE_BYTES = 1024 * 1024;
		ANDROID_OTA_MAX_SIGNATURES = 64;
		ANDROID_OTA_MAX_GROUPS = 256;
		ANDROID_OTA_MAX_GROUP_PARTITION_NAMES = 4096;
		ANDROID_OTA_MAX_APEX = 4096;
		ANDROID_OTA_MAX_EXTRACT_BYTES = 32 * 1024 * 1024;
		ANDROID_OTA_MAX_OPERATION_DATA_BYTES = 32 * 1024 * 1024;
		ANDROID_OTA_DEFAULT_BLOCK_SIZE = 4096;
		ANDROID_OTA_PAYLOAD_LIMITATIONS = {
			inventoryScope: "Android OTA payload inventory reads the CrAU header and DeltaArchiveManifest. Signatures are not verified, delta operations are not applied, and partition images are reconstructed only from REPLACE, ZERO, and REPLACE_ZSTD operations.",
			signaturesUnverified: "Metadata and payload signatures were parsed for size and signature count only; they were not verified.",
			blobTruncated: "The payload blob is truncated; partition inventory comes from the manifest and operation data past the end of the file was not read.",
			unsupportedOperations: "Delta and compressed operations other than REPLACE_ZSTD are not applied; those partitions cannot be reconstructed.",
			missingPartitionSize: "A partition without a new_partition_info size cannot be reconstructed.",
			partitionSizeLimit: `A partition larger than the fixed ${String(32 * 1024 * 1024)}-byte extraction ceiling is inventoried but not reconstructed.`,
			partitionBlobTruncated: "A partition whose operation data extends past the end of the payload file cannot be reconstructed."
		};
		androidOtaExtractRefusalLimitation = (refusal) => ({
			unsupported_operations: ANDROID_OTA_PAYLOAD_LIMITATIONS.unsupportedOperations,
			missing_size: ANDROID_OTA_PAYLOAD_LIMITATIONS.missingPartitionSize,
			size_limit: ANDROID_OTA_PAYLOAD_LIMITATIONS.partitionSizeLimit,
			blob_truncated: ANDROID_OTA_PAYLOAD_LIMITATIONS.partitionBlobTruncated
		})[refusal];
		INSTALL_OPERATION_NAMES = {
			0: "REPLACE",
			1: "REPLACE_BZ",
			2: "MOVE",
			3: "BSDIFF",
			4: "SOURCE_COPY",
			5: "SOURCE_BSDIFF",
			6: "ZERO",
			7: "DISCARD",
			8: "REPLACE_XZ",
			9: "PUFFDIFF",
			10: "BROTLI_BSDIFF",
			11: "ZUCCHINI",
			12: "LZ4DIFF_BSDIFF",
			13: "LZ4DIFF_PUFFDIFF",
			14: "REPLACE_ZSTD"
		};
		EXTRACTABLE_TYPES = new Set([
			0,
			6,
			14
		]);
		ANDROID_OTA_FORMAT = "android-ota-payload";
		malformed$2 = (message) => malformedInput(ANDROID_OTA_FORMAT, message);
		truncated = (message) => truncatedInput(ANDROID_OTA_FORMAT, message);
		unsupportedVersion = (majorVersion) => unsupportedInput(ANDROID_OTA_FORMAT, androidOtaUnsupportedVersion(majorVersion), {
			offset: 4,
			field: "major_version"
		});
		capacity = (name, maximum, unit) => decodeLimit(ANDROID_OTA_FORMAT, `Android OTA payload ${name} exceeds the fixed ${String(maximum)}-${unit} ceiling`, {
			name: `Android OTA payload ${name}`,
			maximum
		});
		zstdWorkRefusal = (decoded) => {
			const facts = zstandardWorkLimitFacts({
				maxFrames: decoded.value ?? 0,
				source: decoded.source ?? "default"
			});
			return {
				_tag: "ZstandardFrameWorkRefusal",
				...facts,
				offset: decoded.offset,
				message: `${facts.setting} is ${String(facts.value)} (source ${facts.source}, range ${String(facts.minimum)}..${String(facts.maximum)})`
			};
		};
		androidOtaUnsupportedVersion = (version) => `Android OTA payload major version ${String(version)} is unsupported; this reader supports version 2 only`;
		u32be = (bytes, at) => ((bytes[at] ?? 0) << 24 | (bytes[at + 1] ?? 0) << 16 | (bytes[at + 2] ?? 0) << 8 | (bytes[at + 3] ?? 0)) >>> 0;
		u64be = (bytes, at) => BigInt(u32be(bytes, at)) << 32n | BigInt(u32be(bytes, at + 4));
		hasAndroidOtaPayloadMagic = (prefix) => prefix.length >= 4 && prefix.subarray(0, 4).equals(ANDROID_OTA_MAGIC_BYTES);
		recognizeAndroidOtaPayload = (prefix) => {
			if (!hasAndroidOtaPayloadMagic(prefix)) return undefined;
			if (prefix.length < 12) return { state: "recognized" };
			const version = u64be(prefix, 4);
			return version === 2n ? { state: "recognized" } : {
				state: "refused",
				reason: androidOtaUnsupportedVersion(version)
			};
		};
		toBigInt = (value) => typeof value === "bigint" ? value : typeof value === "number" ? BigInt(value) : BigInt(value);
		asSafeUint = (value, label) => {
			const numeric = toBigInt(value);
			if (numeric < 0n || numeric > BigInt(Number.MAX_SAFE_INTEGER)) return err(malformed$2(`${label} is not an exact nonnegative extent`));
			return ok(Number(numeric));
		};
		asSafeInt = (value) => {
			const numeric = toBigInt(value);
			if (numeric < BigInt(Number.MIN_SAFE_INTEGER) || numeric > BigInt(Number.MAX_SAFE_INTEGER)) return null;
			return Number(numeric);
		};
		hex$1 = (bytes) => Buffer.from(bytes).toString("hex");
		protobufFailure = (cause) => malformed$2(cause instanceof Error ? `DeltaArchiveManifest protobuf is truncated or malformed: ${cause.message}` : "DeltaArchiveManifest protobuf is truncated or malformed");
		fail = (failure) => {
			throw failure;
		};
		unwrap = (result) => {
			if (result.ok) return result.value;
			return fail(result.error);
		};
		walk = (bytes, visit) => {
			try {
				const reader = new BinaryReader(bytes);
				while (reader.pos < reader.len) {
					const [field, wire] = reader.tag();
					visit(field, wire, reader);
				}
				return ok(undefined);
			} catch (cause) {
				return err(cause instanceof ParseFailureError ? cause : protobufFailure(cause));
			}
		};
		parseAndroidOtaHeader = (bytes, fileSize) => {
			if (!Number.isSafeInteger(fileSize) || fileSize < 0) return err(malformed$2("Android OTA payload size is not an exact nonnegative extent"));
			if (bytes.length < 4 || Buffer.from(bytes.subarray(0, 4)).toString("latin1") !== "CrAU") return err(malformed$2("Android OTA payload magic mismatch: expected CrAU"));
			if (bytes.length < 12) return err(truncated(`Android OTA payload header is truncated: ${String(bytes.length)} bytes, expected ${String(24)}`));
			const majorVersion = u64be(bytes, 4);
			if (majorVersion !== 2n) return err(unsupportedVersion(majorVersion));
			if (bytes.length < 24) return err(truncated(`Android OTA payload header is truncated: ${String(bytes.length)} bytes, expected ${String(24)}`));
			const manifestSize = u64be(bytes, 12);
			const metadataSignatureSize = u32be(bytes, 20);
			const size = asSafeUint(manifestSize, "manifest_size");
			if (!size.ok) return size;
			const manifestEnd = 24 + size.value;
			const blobOffset = manifestEnd + metadataSignatureSize;
			if (!Number.isSafeInteger(blobOffset)) return err(malformed$2("Android OTA payload header extents overflow"));
			if (fileSize < manifestEnd) return err(truncated(`Android OTA payload manifest is truncated: header declares ${String(size.value)} manifest bytes but the file ends at ${String(fileSize)}`));
			if (size.value > 16777216) return err(capacity("manifest size", ANDROID_OTA_MAX_MANIFEST_BYTES, "byte"));
			const metadataSignatureFits = blobOffset <= fileSize;
			if (metadataSignatureFits && metadataSignatureSize > 1048576) return err(capacity("metadata signature size", ANDROID_OTA_MAX_SIGNATURE_BYTES, "byte"));
			return ok({
				magic: ANDROID_OTA_MAGIC,
				majorVersion: 2,
				manifestSize: size.value,
				metadataSignatureSize,
				manifestOffset: 24,
				metadataPrefixEnd: metadataSignatureFits ? blobOffset : manifestEnd,
				blobOffset
			});
		};
		emptyPartitionInfo = () => ({
			size: null,
			hashHex: null
		});
		decodeExtent = (bytes) => {
			const extent = {
				startBlock: null,
				numBlocks: 0
			};
			const walked = walk(bytes, (field, wire, reader) => {
				if (field === 1 && wire === WireType.Varint) {
					const start = toBigInt(reader.uint64());
					extent.startBlock = start === 18446744073709551615n ? null : Number(start);
					if (extent.startBlock !== null && !Number.isSafeInteger(extent.startBlock)) fail(malformed$2("extent start_block is not an exact nonnegative extent"));
					return;
				}
				if (field === 2 && wire === WireType.Varint) {
					extent.numBlocks = unwrap(asSafeUint(reader.uint64(), "extent num_blocks"));
					return;
				}
				reader.skip(wire);
			});
			return walked.ok ? ok(extent) : walked;
		};
		decodePartitionInfo = (bytes, info) => {
			const walked = walk(bytes, (field, wire, reader) => {
				if (field === 1 && wire === WireType.Varint) {
					info.size = unwrap(asSafeUint(reader.uint64(), "partition size"));
					return;
				}
				if (field === 2 && wire === WireType.LengthDelimited) {
					info.hashHex = hex$1(reader.bytes());
					return;
				}
				reader.skip(wire);
			});
			return walked.ok ? ok(info) : walked;
		};
		decodeOperation = (bytes, extentTotal) => {
			const operation = {
				hasType: false,
				typeCode: 0,
				dataOffset: 0,
				dataLength: 0,
				dataHashHex: null,
				srcExtents: [],
				dstExtents: []
			};
			const walked = walk(bytes, (field, wire, reader) => {
				if (field === 1 && wire === WireType.Varint) {
					operation.hasType = true;
					operation.typeCode = reader.int32();
					if (operation.typeCode < 0) fail(malformed$2("InstallOperation type is negative"));
					return;
				}
				if (field === 2 && wire === WireType.Varint) {
					operation.dataOffset = unwrap(asSafeUint(reader.uint64(), "operation data_offset"));
					return;
				}
				if (field === 3 && wire === WireType.Varint) {
					operation.dataLength = unwrap(asSafeUint(reader.uint64(), "operation data_length"));
					return;
				}
				if ((field === 4 || field === 6) && wire === WireType.LengthDelimited) {
					if (extentTotal.count >= 1048576) fail(capacity("extent total", ANDROID_OTA_MAX_EXTENTS_TOTAL, "extent"));
					extentTotal.count += 1;
					(field === 4 ? operation.srcExtents : operation.dstExtents).push(unwrap(decodeExtent(reader.bytes())));
					return;
				}
				if (field === 8 && wire === WireType.LengthDelimited) {
					const digest = reader.bytes();
					if (digest.length !== 0 && digest.length !== 32) fail(malformed$2("operation data_sha256_hash must be 32 bytes or empty"));
					operation.dataHashHex = digest.length === 0 ? null : hex$1(digest);
					return;
				}
				reader.skip(wire);
			});
			if (!walked.ok) return walked;
			if (!operation.hasType) return err(malformed$2("InstallOperation is missing type"));
			return ok(operation);
		};
		decodePartition = (bytes, operationTotal, extentTotal) => {
			const partition = {
				name: undefined,
				runPostinstall: null,
				postinstallPath: null,
				filesystemType: null,
				oldPartitionInfo: null,
				newPartitionInfo: emptyPartitionInfo(),
				operations: [],
				version: null,
				mergeOperationCount: 0,
				estimateCowSize: null
			};
			const walked = walk(bytes, (field, wire, reader) => {
				if (field === 1 && wire === WireType.LengthDelimited) {
					partition.name = reader.string();
					return;
				}
				if (field === 2 && wire === WireType.Varint) {
					partition.runPostinstall = reader.bool();
					return;
				}
				if (field === 3 && wire === WireType.LengthDelimited) {
					partition.postinstallPath = reader.string();
					return;
				}
				if (field === 4 && wire === WireType.LengthDelimited) {
					partition.filesystemType = reader.string();
					return;
				}
				if (field === 6 && wire === WireType.LengthDelimited) {
					partition.oldPartitionInfo = unwrap(decodePartitionInfo(reader.bytes(), partition.oldPartitionInfo ?? emptyPartitionInfo()));
					return;
				}
				if (field === 7 && wire === WireType.LengthDelimited) {
					partition.newPartitionInfo = unwrap(decodePartitionInfo(reader.bytes(), partition.newPartitionInfo));
					return;
				}
				if (field === 8 && wire === WireType.LengthDelimited) {
					if (partition.operations.length >= 65536) fail(capacity("operations per partition", ANDROID_OTA_MAX_OPERATIONS, "operation"));
					if (operationTotal.count >= 262144) fail(capacity("operation total", ANDROID_OTA_MAX_OPERATIONS_TOTAL, "operation"));
					partition.operations.push(unwrap(decodeOperation(reader.bytes(), extentTotal)));
					operationTotal.count += 1;
					return;
				}
				if (field === 17 && wire === WireType.LengthDelimited) {
					partition.version = reader.string();
					return;
				}
				if (field === 18 && wire === WireType.LengthDelimited) {
					reader.skip(wire);
					partition.mergeOperationCount += 1;
					return;
				}
				if (field === 19 && wire === WireType.Varint) {
					partition.estimateCowSize = unwrap(asSafeUint(reader.uint64(), "estimate_cow_size"));
					return;
				}
				reader.skip(wire);
			});
			if (!walked.ok) {
				const cause = walked.error;
				return err(cause);
			}
			if (partition.name === undefined) return err(malformed$2("PartitionUpdate is missing partition_name"));
			return ok(partition);
		};
		decodeGroup = (bytes, partitionNameTotal) => {
			const group = {
				name: undefined,
				size: null,
				partitionNames: []
			};
			const walked = walk(bytes, (field, wire, reader) => {
				if (field === 1 && wire === WireType.LengthDelimited) {
					group.name = reader.string();
					return;
				}
				if (field === 2 && wire === WireType.Varint) {
					group.size = unwrap(asSafeUint(reader.uint64(), "dynamic partition group size"));
					return;
				}
				if (field === 3 && wire === WireType.LengthDelimited) {
					if (partitionNameTotal.count >= 4096) fail(capacity("dynamic partition group partition_names total", ANDROID_OTA_MAX_GROUP_PARTITION_NAMES, "name"));
					partitionNameTotal.count += 1;
					group.partitionNames.push(reader.string());
					return;
				}
				reader.skip(wire);
			});
			if (!walked.ok) return walked;
			if (group.name === undefined) return err(malformed$2("DynamicPartitionGroup is missing name"));
			return ok(group);
		};
		decodeApex = (bytes) => {
			const apex = {
				packageName: null,
				version: null,
				isCompressed: null,
				decompressedSize: null
			};
			const walked = walk(bytes, (field, wire, reader) => {
				if (field === 1 && wire === WireType.LengthDelimited) {
					apex.packageName = reader.string();
					return;
				}
				if (field === 2 && wire === WireType.Varint) {
					apex.version = asSafeInt(reader.int64());
					return;
				}
				if (field === 3 && wire === WireType.Varint) {
					apex.isCompressed = reader.bool();
					return;
				}
				if (field === 4 && wire === WireType.Varint) {
					apex.decompressedSize = asSafeInt(reader.int64());
					return;
				}
				reader.skip(wire);
			});
			return walked.ok ? ok(apex) : walked;
		};
		decodeDynamicMetadata = (bytes, draft) => {
			draft.hasDynamicMetadata = true;
			return walk(bytes, (field, wire, reader) => {
				if (field === 1 && wire === WireType.LengthDelimited) {
					if (draft.groups.length >= 256) fail(capacity("dynamic partition groups", 256, "group"));
					draft.groups.push(unwrap(decodeGroup(reader.bytes(), draft.groupPartitionNameTotal)));
					return;
				}
				if (field === 2 && wire === WireType.Varint) {
					draft.snapshotEnabled = reader.bool();
					return;
				}
				if (field === 3 && wire === WireType.Varint) {
					draft.vabcEnabled = reader.bool();
					return;
				}
				if (field === 4 && wire === WireType.LengthDelimited) {
					draft.vabcCompressionParam = reader.string();
					return;
				}
				reader.skip(wire);
			});
		};
		countAndroidOtaSignatures = (bytes) => {
			let count = 0;
			const walked = walk(bytes, (field, wire, reader) => {
				if (field === 1 && wire === WireType.LengthDelimited) {
					reader.skip(wire);
					count += 1;
					if (count > 64) fail(capacity("signature count", 64, "signature"));
					return;
				}
				reader.skip(wire);
			});
			return walked.ok ? ok(count) : walked;
		};
		decodeManifest = (bytes) => {
			const draft = {
				blockSize: ANDROID_OTA_DEFAULT_BLOCK_SIZE,
				signaturesOffset: null,
				signaturesSize: null,
				minorVersion: 0,
				partitions: [],
				maxTimestamp: null,
				maxTimestampOutOfRange: false,
				partialUpdate: null,
				securityPatchLevel: null,
				groups: [],
				snapshotEnabled: null,
				vabcEnabled: null,
				vabcCompressionParam: null,
				hasDynamicMetadata: false,
				apex: [],
				operationTotal: 0,
				groupPartitionNameTotal: { count: 0 }
			};
			const operationTotal = { count: 0 };
			const extentTotal = { count: 0 };
			const walked = walk(bytes, (field, wire, reader) => {
				if (field === 3 && wire === WireType.Varint) {
					const size = unwrap(asSafeUint(reader.uint64(), "block_size"));
					if (size === 0) fail(malformed$2("manifest block_size is zero"));
					draft.blockSize = size;
					return;
				}
				if (field === 4 && wire === WireType.Varint) {
					draft.signaturesOffset = unwrap(asSafeUint(reader.uint64(), "signatures_offset"));
					return;
				}
				if (field === 5 && wire === WireType.Varint) {
					draft.signaturesSize = unwrap(asSafeUint(reader.uint64(), "signatures_size"));
					return;
				}
				if (field === 12 && wire === WireType.Varint) {
					draft.minorVersion = unwrap(asSafeUint(reader.uint64(), "minor_version"));
					return;
				}
				if (field === 13 && wire === WireType.LengthDelimited) {
					if (draft.partitions.length >= 4096) fail(capacity("partition count", ANDROID_OTA_MAX_PARTITIONS, "partition"));
					draft.partitions.push(unwrap(decodePartition(reader.bytes(), operationTotal, extentTotal)));
					return;
				}
				if (field === 14 && wire === WireType.Varint) {
					const timestamp = asSafeInt(reader.int64());
					if (timestamp === null) draft.maxTimestampOutOfRange = true;
					else draft.maxTimestamp = timestamp;
					return;
				}
				if (field === 15 && wire === WireType.LengthDelimited) {
					unwrap(decodeDynamicMetadata(reader.bytes(), draft));
					return;
				}
				if (field === 16 && wire === WireType.Varint) {
					draft.partialUpdate = reader.bool();
					return;
				}
				if (field === 17 && wire === WireType.LengthDelimited) {
					if (draft.apex.length >= 4096) fail(capacity("apex_info count", ANDROID_OTA_MAX_APEX, "entry"));
					draft.apex.push(unwrap(decodeApex(reader.bytes())));
					return;
				}
				if (field === 18 && wire === WireType.LengthDelimited) {
					draft.securityPatchLevel = reader.string();
					return;
				}
				reader.skip(wire);
			});
			if (!walked.ok) return walked;
			draft.operationTotal = operationTotal.count;
			return ok(draft);
		};
		partitionFileName = (name, index, state) => {
			const stem = name.replace(/[^A-Za-z0-9._-]+/gu, "_").replace(/^\.+/u, "") || `partition-${String(index)}`;
			const withExt = stem.endsWith(".img") ? stem : `${stem}.img`;
			let candidate = withExt;
			if (state.used.has(candidate)) {
				let suffix = state.nextSuffix.get(stem) ?? 1;
				do {
					candidate = `${stem}-${String(suffix)}.img`;
					suffix += 1;
				} while (state.used.has(candidate));
				state.nextSuffix.set(stem, suffix);
			}
			state.used.add(candidate);
			return candidate;
		};
		operationCountsOf = (operations) => {
			const counts = new Map();
			for (const operation of operations) counts.set(operation.typeCode, (counts.get(operation.typeCode) ?? 0) + 1);
			return [...counts.entries()].sort((left, right) => left[0] - right[0]).map(([type_code, count]) => ({
				type: INSTALL_OPERATION_NAMES[type_code] ?? "unknown",
				type_code,
				count
			}));
		};
		isExtractable = (operations) => operations.length > 0 && operations.every((operation) => EXTRACTABLE_TYPES.has(operation.typeCode));
		parseAndroidOtaPayload = (header, metadata, fileSize) => {
			if (metadata.length < header.manifestSize) return err(truncated(`Android OTA payload manifest is truncated: header declares ${String(header.manifestSize)} bytes starting at ${String(header.manifestOffset)}`));
			const manifest = decodeManifest(metadata.subarray(0, header.manifestSize));
			if (!manifest.ok) return manifest;
			let metadataSignatureCount = null;
			const metadataBytes = header.metadataPrefixEnd - header.manifestOffset;
			if (metadataBytes > header.manifestSize && metadata.length >= metadataBytes) {
				const counted = countAndroidOtaSignatures(metadata.subarray(header.manifestSize, metadataBytes));
				if (!counted.ok) return counted;
				metadataSignatureCount = counted.value;
			}
			const { signaturesOffset, signaturesSize } = manifest.value;
			const signatureDeclaration = signaturesOffset === null || signaturesSize === null ? null : {
				blobOffset: signaturesOffset,
				size: signaturesSize
			};
			let payloadSignatureRange = null;
			let blobTruncated = fileSize < header.blobOffset;
			if (signatureDeclaration !== null) {
				const { blobOffset, size } = signatureDeclaration;
				const offset = header.blobOffset + blobOffset;
				const end = offset + size;
				if (!Number.isSafeInteger(end) || end > fileSize) blobTruncated = true;
				else {
					if (size > 1048576) return err(capacity("payload signature size", ANDROID_OTA_MAX_SIGNATURE_BYTES, "byte"));
					if (size > 0) payloadSignatureRange = {
						offset,
						bytes: size
					};
				}
			}
			const blobAvailable = Math.max(0, fileSize - header.blobOffset);
			for (const partition of manifest.value.partitions) {
				for (const operation of partition.operations) {
					if (operation.dataLength === 0) continue;
					const end = operation.dataOffset + operation.dataLength;
					if (!Number.isSafeInteger(end) || end < operation.dataOffset) return err(malformed$2("operation data extent overflows"));
					if (signatureDeclaration !== null && end > signatureDeclaration.blobOffset) return err(malformed$2(`operation data extent ${String(operation.dataOffset)}+${String(operation.dataLength)} overruns the ${String(signatureDeclaration.blobOffset)}-byte payload blob`));
					if (end > blobAvailable) blobTruncated = true;
				}
			}
			const nameState = {
				used: new Set(),
				nextSuffix: new Map()
			};
			const partitions = manifest.value.partitions.map((partition, index) => {
				const operations = partition.operations.map((operation) => ({
					typeCode: operation.typeCode,
					typeName: INSTALL_OPERATION_NAMES[operation.typeCode] ?? "unknown",
					dataOffset: operation.dataOffset,
					dataLength: operation.dataLength,
					dataHashHex: operation.dataHashHex,
					srcExtents: operation.srcExtents.map((extent) => ({
						startBlock: extent.startBlock,
						numBlocks: extent.numBlocks
					})),
					dstExtents: operation.dstExtents.map((extent) => ({
						startBlock: extent.startBlock,
						numBlocks: extent.numBlocks
					}))
				}));
				const needsBlob = operations.some((operation) => operation.dataLength > 0);
				const blobFits = operations.every((operation) => operation.dataLength === 0 || operation.dataOffset + operation.dataLength <= blobAvailable);
				const size = partition.newPartitionInfo.size;
				const extractRefusal = !isExtractable(partition.operations) ? "unsupported_operations" : size === null ? "missing_size" : size > 33554432 ? "size_limit" : needsBlob && !blobFits ? "blob_truncated" : null;
				return {
					index,
					name: partition.name,
					path: partitionFileName(partition.name, index, nameState),
					newPartitionInfo: {
						size: partition.newPartitionInfo.size,
						hashHex: partition.newPartitionInfo.hashHex
					},
					oldPartitionInfo: partition.oldPartitionInfo === null ? null : {
						size: partition.oldPartitionInfo.size,
						hashHex: partition.oldPartitionInfo.hashHex
					},
					version: partition.version,
					runPostinstall: partition.runPostinstall,
					postinstallPath: partition.postinstallPath,
					filesystemType: partition.filesystemType,
					operations,
					operationCounts: operationCountsOf(partition.operations),
					totalDataLength: operations.reduce((total, operation) => total + operation.dataLength, 0),
					mergeOperationCount: partition.mergeOperationCount,
					estimateCowSize: partition.estimateCowSize,
					extractable: extractRefusal === null,
					extractRefusal
				};
			});
			const limitations = [ANDROID_OTA_PAYLOAD_LIMITATIONS.inventoryScope, ANDROID_OTA_PAYLOAD_LIMITATIONS.signaturesUnverified];
			if (blobTruncated) limitations.push(ANDROID_OTA_PAYLOAD_LIMITATIONS.blobTruncated);
			for (const refusal of new Set(partitions.flatMap((partition) => partition.extractRefusal === null ? [] : [partition.extractRefusal]))) limitations.push(androidOtaExtractRefusalLimitation(refusal));
			if (manifest.value.maxTimestampOutOfRange) limitations.push("max_timestamp is outside the exact integer range this reader reports.");
			return ok({
				header,
				fileSize,
				blockSize: manifest.value.blockSize,
				minorVersion: manifest.value.minorVersion,
				payloadKind: manifest.value.minorVersion === 0 ? "full" : "delta",
				maxTimestamp: manifest.value.maxTimestamp,
				partialUpdate: manifest.value.partialUpdate,
				securityPatchLevel: manifest.value.securityPatchLevel,
				signaturesOffset: manifest.value.signaturesOffset,
				signaturesSize: manifest.value.signaturesSize,
				metadataSignatureBlobSize: header.metadataSignatureSize,
				metadataSignatureCount,
				payloadSignatureBlobSize: signatureDeclaration?.size ?? null,
				payloadSignatureRange,
				payloadSignatureCount: null,
				partitions,
				dynamicPartitionGroups: manifest.value.groups.map((group) => ({
					name: group.name,
					size: group.size,
					partitionNames: group.partitionNames
				})),
				snapshotEnabled: manifest.value.hasDynamicMetadata ? manifest.value.snapshotEnabled : null,
				vabcEnabled: manifest.value.hasDynamicMetadata ? manifest.value.vabcEnabled : null,
				vabcCompressionParam: manifest.value.hasDynamicMetadata ? manifest.value.vabcCompressionParam : null,
				apexInfo: manifest.value.apex,
				blobTruncated,
				limitations
			});
		};
		withAndroidOtaPayloadSignature = (payload, signature) => {
			if (payload.payloadSignatureRange?.bytes !== signature.length) return err(malformed$2("payload signature blob length does not match signatures_size"));
			const count = countAndroidOtaSignatures(signature);
			return count.ok ? ok({
				...payload,
				payloadSignatureCount: count.value
			}) : count;
		};
		writeExtents = (image, extents, blockSize, data, fillZero) => {
			const blockAlignedEnd = Math.ceil(image.length / blockSize) * blockSize;
			let cursor = 0;
			let span = 0;
			for (const extent of extents) {
				if (extent.numBlocks === 0) continue;
				if (extent.startBlock === null) return err(malformed$2("InstallOperation destination extent has no start_block"));
				const start = extent.startBlock * blockSize;
				const extentBytes = extent.numBlocks * blockSize;
				if (!Number.isSafeInteger(start) || start < 0 || start >= image.length || extentBytes > blockAlignedEnd - start) return err(malformed$2("InstallOperation destination extent overruns the partition image"));
				const length = Math.min(extentBytes, image.length - start);
				span += extentBytes;
				if (fillZero) {
					image.fill(0, start, start + length);
					continue;
				}
				if (data.length - cursor < length) return err(malformed$2("InstallOperation data is shorter than its destination extents"));
				image.set(data.subarray(cursor, cursor + length), start);
				cursor += extentBytes;
			}
			if (!fillZero && data.length > span) return err(malformed$2("InstallOperation data is longer than its destination extents"));
			return ok(undefined);
		};
		destinationExtentBytes = (extents, blockSize) => {
			let total = 0;
			for (const extent of extents) {
				if (!Number.isSafeInteger(extent.numBlocks) || extent.numBlocks < 0) return err(capacity("REPLACE_ZSTD decoded output", ANDROID_OTA_MAX_EXTRACT_BYTES, "byte"));
				if (extent.numBlocks > 0 && blockSize > Math.floor(Number.MAX_SAFE_INTEGER / extent.numBlocks)) return err(capacity("REPLACE_ZSTD decoded output", ANDROID_OTA_MAX_EXTRACT_BYTES, "byte"));
				const bytes = extent.numBlocks * blockSize;
				if (total > Number.MAX_SAFE_INTEGER - bytes) return err(capacity("REPLACE_ZSTD decoded output", ANDROID_OTA_MAX_EXTRACT_BYTES, "byte"));
				total += bytes;
			}
			return ok(total);
		};
		androidOtaDistinctOperationDataBytes = (operations) => {
			const seen = new Set();
			let total = 0;
			for (const operation of operations) {
				if (operation.dataLength === 0) continue;
				const key = `${String(operation.dataOffset)}:${String(operation.dataLength)}`;
				if (seen.has(key)) continue;
				seen.add(key);
				if (!Number.isSafeInteger(operation.dataLength) || operation.dataLength < 0 || total > Number.MAX_SAFE_INTEGER - operation.dataLength) return err(capacity("partition operation data", ANDROID_OTA_MAX_OPERATION_DATA_BYTES, "byte"));
				total += operation.dataLength;
			}
			if (total > 33554432) return err(capacity("partition operation data", ANDROID_OTA_MAX_OPERATION_DATA_BYTES, "byte"));
			return ok(total);
		};
		androidOtaExtractRefusalError = (partition) => {
			switch (partition.extractRefusal) {
				case null: return null;
				case "unsupported_operations": {
					const unsupported = partition.operations.find((operation) => !EXTRACTABLE_TYPES.has(operation.typeCode));
					return {
						_tag: "AndroidOtaPayloadUnsupportedOperation",
						message: `Android OTA partition ${partition.name} uses unsupported operation ${unsupported?.typeName ?? "unknown"}`,
						typeCode: unsupported?.typeCode ?? -1
					};
				}
				case "missing_size": return malformed$2(`Android OTA partition ${partition.name} has no new_partition_info size`);
				case "size_limit": return capacity("extracted partition size", ANDROID_OTA_MAX_EXTRACT_BYTES, "byte");
				case "blob_truncated": return {
					_tag: "AndroidOtaPayloadBlobTruncated",
					message: `Android OTA partition ${partition.name} reads operation data past the end of the payload file`
				};
			}
		};
		chargeReconstructionWork = (operations, blockSize) => {
			if (blockSize <= 0 || !Number.isSafeInteger(blockSize)) return err(malformed$2("block_size is not a positive extent"));
			let work = 0;
			for (const operation of operations) {
				const dstBytes = destinationExtentBytes(operation.dstExtents, blockSize);
				if (!dstBytes.ok) return dstBytes;
				work += dstBytes.value;
				if (work > 33554432) return err(capacity("partition reconstruction work", ANDROID_OTA_MAX_EXTRACT_BYTES, "byte"));
			}
			return ok(work);
		};
		hasCompleteExtentCoverage = (operations, imageSize, blockSize) => {
			const blockCount = Math.ceil(imageSize / blockSize);
			if (blockCount === 0) return true;
			const spans = [];
			for (const operation of operations) {
				for (const extent of operation.dstExtents) {
					if (extent.numBlocks === 0) continue;
					if (extent.startBlock === null) return false;
					spans.push([extent.startBlock, extent.startBlock + extent.numBlocks]);
				}
			}
			spans.sort((left, right) => left[0] - right[0]);
			let coveredUntil = 0;
			for (const [start, end] of spans) {
				if (start > coveredUntil) return false;
				if (end > coveredUntil) coveredUntil = end;
				if (coveredUntil >= blockCount) return true;
			}
			return false;
		};
		driveAndroidOtaReconstruction = (steps, decode) => {
			const run = async () => {
				let next = steps.next();
				while (!next.done) next = steps.next(await decode(next.value.raw, next.value.maxOutputLength));
				return next.value;
			};
			return run();
		};
		reconstructAndroidOtaPartition = (partition, blockSize, readBlob, options = {}) => {
			const steps = reconstructAndroidOtaPartitionSteps(partition, blockSize, readBlob, options);
			let next = steps.next();
			while (!next.done) next = steps.next(decodeZstandardFrames(next.value.raw, { maxOutputLength: next.value.maxOutputLength }));
			return next.value;
		};
		reconstructAndroidOtaPartitionCooperative = (partition, blockSize, readBlob, pause, options = {}) => driveAndroidOtaReconstruction(reconstructAndroidOtaPartitionSteps(partition, blockSize, readBlob, options), (raw, maxOutputLength) => decodeZstandardFramesCooperative(raw, { maxOutputLength }, pause));
	})))();
}

//#endregion
//#region dist/domain/firmware/espChips.js
var ESP_CHIP_TABLE_SOURCE, range$1, C6_H2_PAGE_SIZES, CHIPS, BY_ID, espChipForId, ESP_ROM_BOOTLOADER_OFFSETS, SIXTEEN_MIB, espSegmentLengthLimit, RESERVED_ADDRESS_LIMIT, classifyEspSegment, espPageSizedMappingAmbiguity, isMapped, pageSizedHigh;
function init_espChips() {
	return (init_espChips = __esmMin((() => {
		ESP_CHIP_TABLE_SOURCE = "ESP-IDF v6.1";
		range$1 = (low, high) => ({
			low,
			high
		});
		C6_H2_PAGE_SIZES = [
			8192,
			16384,
			32768,
			65536
		];
		CHIPS = [
			{
				chipId: 0,
				target: "esp32",
				isa: "xtensa",
				romBootloaderOffset: 4096,
				cache32BitAddressMap: false,
				mapped: [range$1(1074593792, 1077936128), range$1(1061158912, 1065353216)]
			},
			{
				chipId: 2,
				target: "esp32s2",
				isa: "xtensa",
				romBootloaderOffset: 4096,
				cache32BitAddressMap: false,
				mapped: [range$1(1074266112, 1082130432), range$1(1056964608, 1073217536)]
			},
			{
				chipId: 5,
				target: "esp32c3",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: false,
				mapped: [range$1(1107296256, 1115684864), range$1(1006632960, 1015021568)]
			},
			{
				chipId: 9,
				target: "esp32s3",
				isa: "xtensa",
				romBootloaderOffset: 0,
				cache32BitAddressMap: true,
				mapped: [range$1(1107296256, 1140850688), range$1(1006632960, 1040187392)]
			},
			{
				chipId: 12,
				target: "esp32c2",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: false,
				mapped: [range$1(1107296256, 1111490560), range$1(1006632960, 1010827264)]
			},
			{
				chipId: 13,
				target: "esp32c6",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: false,
				mapped: [],
				pageSizedMapping: {
					low: 1107296256,
					pageSizes: C6_H2_PAGE_SIZES
				}
			},
			{
				chipId: 16,
				target: "esp32h2",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: false,
				mapped: [],
				pageSizedMapping: {
					low: 1107296256,
					pageSizes: C6_H2_PAGE_SIZES
				}
			},
			{
				chipId: 18,
				target: "esp32p4",
				isa: "riscv",
				romBootloaderOffset: 8192,
				cache32BitAddressMap: true,
				mapped: [range$1(1073741824, 1140850688), range$1(1207959552, 1275068416)]
			},
			{
				chipId: 20,
				target: "esp32c61",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: true,
				mapped: [range$1(1107296256, 1140850688)]
			},
			{
				chipId: 23,
				target: "esp32c5",
				isa: "riscv",
				romBootloaderOffset: 8192,
				cache32BitAddressMap: true,
				mapped: [range$1(1107296256, 1140850688)]
			},
			{
				chipId: 25,
				target: "esp32h21",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: false,
				mapped: [range$1(1107296256, 1124073472)]
			},
			{
				chipId: 28,
				target: "esp32h4",
				isa: "riscv",
				romBootloaderOffset: 8192,
				cache32BitAddressMap: true,
				mapped: [range$1(1107296256, 1140850688)]
			},
			{
				chipId: 32,
				target: "esp32s31",
				isa: "riscv",
				romBootloaderOffset: 8192,
				cache32BitAddressMap: true,
				mapped: [range$1(1073741824, 1140850688), range$1(1342177280, 1409286144)]
			}
		];
		BY_ID = new Map(CHIPS.map((chip) => [chip.chipId, chip]));
		espChipForId = (chipId) => BY_ID.get(chipId);
		ESP_ROM_BOOTLOADER_OFFSETS = [...new Set(CHIPS.map(({ romBootloaderOffset }) => romBootloaderOffset))].sort((left, right) => left - right);
		SIXTEEN_MIB = 16777216;
		espSegmentLengthLimit = (chip) => chip.cache32BitAddressMap ? undefined : SIXTEEN_MIB;
		RESERVED_ADDRESS_LIMIT = 268435456;
		classifyEspSegment = (chip, address) => {
			if (chip === undefined) return "unknown";
			const mapped = isMapped(chip, address);
			if (mapped === undefined) return "unknown";
			if (mapped) return "mapped";
			return address < RESERVED_ADDRESS_LIMIT ? "not-loaded" : "loaded";
		};
		espPageSizedMappingAmbiguity = (chip) => {
			const paged = chip.pageSizedMapping;
			return paged === undefined ? undefined : range$1(pageSizedHigh(paged.low, Math.min(...paged.pageSizes)), pageSizedHigh(paged.low, Math.max(...paged.pageSizes)));
		};
		isMapped = (chip, address) => {
			if (chip.mapped.some(({ low, high }) => address >= low && address < high)) return true;
			const paged = chip.pageSizedMapping;
			if (paged === undefined || address < paged.low) return false;
			if (address < pageSizedHigh(paged.low, Math.min(...paged.pageSizes))) return true;
			return address < pageSizedHigh(paged.low, Math.max(...paged.pageSizes)) ? undefined : false;
		};
		pageSizedHigh = (low, pageSize) => low + pageSize * 256;
	})))();
}

//#endregion
//#region dist/domain/firmware/espImageFacts.js
var SIGNATURE_SLOTS, hexByte, ESP_IMAGE_LIMITATIONS, deriveEspImage, imageComplete, headerFacts, segmentFacts, segmentLimitations, truncation, checksumFacts, digestFacts, trailingFacts;
function init_espImageFacts() {
	return (init_espImageFacts = __esmMin((() => {
		init_espChips();
		init_espImageStructures();
		init_byteToHex();
		SIGNATURE_SLOTS = 3;
		hexByte = (value) => `0x${byteToHex(value)}`;
		ESP_IMAGE_LIMITATIONS = {
			/** What an ESP image inventory reads, and what it leaves unverified. */
			inventoryScope: "ESP image inventory reads the header-declared segments, checksum, appended SHA-256, descriptor and Secure Boot v2 signature blocks. Segment classification follows ESP-IDF v6.1 should_map and should_load for a cold boot and does not check RAM ranges; signatures are not cryptographically verified, and code is not disassembled.",
			undescribedTrailing: (bytes, ranges, firstOffset) => `${String(bytes)} bytes after the ESP image, in ${String(ranges)} range(s) from offset ${offsetText(firstOffset)}, are not described by its header, erased flash or a signature sector. They may be other flash contents, a Secure Boot v1 signature, or flash segments that esptool --ram-only-header leaves out of the segment count.`,
			unknownChip: (chipId) => `ESP image chip_id 0x${chipId.toString(16).padStart(4, "0")} is not in the ${ESP_CHIP_TABLE_SOURCE} chip table; chip, ISA and segment classification are unknown.`,
			unclassifiedPages: (target, low, high) => `${target} maps flash through 256 MMU pages of the bootloader's configured size, which the image does not record; segments from ${offsetText(low)} to ${offsetText(high)} are unclassified.`,
			segmentLengthUnaligned: (index, length) => `ESP image segment ${String(index)} length ${offsetText(length)} is not a multiple of 4; ESP-IDF rejects such an image.`,
			segmentLengthTooLarge: (index, length, limit, target) => `ESP image segment ${String(index)} length ${offsetText(length)} is ${String(limit / 1048576)} MiB or more; ESP-IDF rejects such an image for ${target}.`,
			truncatedSegment: (index, declared, offset, available) => `ESP image is truncated: segment ${String(index)} declares ${String(declared)} bytes at offset ${offsetText(offset)}, but the file holds ${String(available)}.`,
			truncatedSegmentHeaders: (declared, present) => `ESP image is truncated: the header declares ${String(declared)} segments, but the file ends before the header of segment ${String(present)}.`,
			truncatedBeforeChecksum: (offset) => `ESP image is truncated before its checksum at offset ${offsetText(offset)}.`,
			checksumMismatch: (stored, offset, computed) => `ESP image checksum ${hexByte(stored)} at offset ${offsetText(offset)} does not match the computed ${hexByte(computed)}.`,
			truncatedBeforeDigest: (offset) => `ESP image is truncated before its appended SHA-256 at offset ${offsetText(offset)}.`,
			digestMismatch: (offset) => `ESP image appended SHA-256 at offset ${offsetText(offset)} does not match the SHA-256 of the bytes before it.`,
			segmentEntryTruncated: (index, declared, available) => `ESP image segment ${String(index)} is truncated: its header declares ${String(declared)} bytes; the file holds ${String(available)}.`,
			signatureDigestMismatch: (slot, offset) => `Secure Boot v2 signature block in slot ${String(slot)} at offset ${offsetText(offset)} records an image digest that does not match the bytes before its sector.`,
			invalidSignatureSlot: (slot, offset) => `Secure Boot v2 slot ${String(slot)} at offset ${offsetText(offset)} has the 0xE7 magic but not a matching CRC32 or a complete block; it is not a valid signature block.`,
			signatureSlotsCut: (fileSize, sector) => `The file ends at ${offsetText(fileSize)} in erased flash, before the Secure Boot v2 signature slots at ${offsetText(sector)} are complete; signature blocks may be missing.`,
			signatureSectorTruncated: (sector, fileSize, sectorEnd) => `Secure Boot v2 signature sector at offset ${offsetText(sector)} is truncated: the file ends at ${offsetText(fileSize)}, before ${offsetText(sectorEnd)}.`
		};
		deriveEspImage = (observed) => {
			const limitations = [];
			const chipId = u16(observed.header, 12);
			const chip = espChipForId(chipId);
			const first = observed.segments[0];
			const descriptor = first === undefined ? null : decodeEspDescriptor(observed.descriptorBytes, first.headerOffset + 8, limitations);
			const segments = observed.segments.map((segment) => segmentFacts(observed, segment, chip));
			limitations.push(...segmentLimitations(chipId, chip, segments));
			const truncated = truncation(observed, segments, limitations);
			const checksum = checksumFacts(observed, truncated, limitations);
			const appendedSha256 = digestFacts(observed, limitations);
			const trailing = trailingFacts(observed, limitations);
			const undescribedBytes = trailing.undescribed.reduce((total, { length }) => total + length, 0);
			const firstUndescribed = trailing.undescribed[0];
			if (firstUndescribed !== undefined) limitations.push(ESP_IMAGE_LIMITATIONS.undescribedTrailing(undescribedBytes, trailing.undescribed.length, firstUndescribed.offset));
			return {
				metadata: {
					kind: "esp-image",
					header: headerFacts(observed.header),
					chip: chip === undefined ? null : {
						target: chip.target,
						isa: chip.isa,
						source: ESP_CHIP_TABLE_SOURCE
					},
					checksum,
					appended_sha256: appendedSha256,
					image_end: observed.imageEnd ?? null,
					signature_sector_offset: trailing.blocks.length > 0 ? observed.sectorOffset ?? null : null,
					undescribed_trailing: trailing.undescribed,
					descriptor,
					flash_dump: null
				},
				segments,
				signatureBlocks: trailing.blocks,
				coverage: truncated || !imageComplete(observed) || trailing.undescribed.length > 0 || trailing.truncated ? "unknown" : "complete",
				limitations
			};
		};
		imageComplete = (observed) => observed.imageEnd !== undefined;
		headerFacts = (header) => ({
			segment_count: header[1] ?? 0,
			spi_mode: header[2] ?? 0,
			spi_speed: (header[3] ?? 0) & 15,
			spi_size: (header[3] ?? 0) >> 4,
			entry_addr: u32(header, 4),
			wp_pin: header[8] ?? 0,
			spi_pin_drv: hex$2(header.subarray(9, 12)),
			chip_id: u16(header, 12),
			min_chip_rev: header[14] ?? 0,
			min_chip_rev_full: u16(header, 15),
			max_chip_rev_full: u16(header, 17),
			reserved: hex$2(header.subarray(19, 23)),
			hash_appended: header[23] === 1
		});
		segmentFacts = (observed, segment, chip) => {
			const dataOffset = segment.headerOffset + 8;
			return {
				dataOffset,
				availableLength: Math.max(0, Math.min(segment.length, observed.observedEnd - dataOffset)),
				metadata: {
					kind: "esp-image-segment",
					index: segment.index,
					load_addr: segment.loadAddress,
					data_len: segment.length,
					header_offset: segment.headerOffset,
					classification: classifyEspSegment(chip, segment.loadAddress)
				}
			};
		};
		segmentLimitations = (chipId, chip, segments) => {
			const limitations = [];
			const ambiguity = chip === undefined ? undefined : espPageSizedMappingAmbiguity(chip);
			if (chip === undefined) limitations.push(ESP_IMAGE_LIMITATIONS.unknownChip(chipId));
			else if (ambiguity !== undefined && segments.some(({ metadata }) => metadata.classification === "unknown")) limitations.push(ESP_IMAGE_LIMITATIONS.unclassifiedPages(chip.target, ambiguity.low, ambiguity.high));
			const lengthLimit = chip === undefined ? undefined : espSegmentLengthLimit(chip);
			for (const { metadata } of segments) {
				if (metadata.data_len % 4 !== 0) limitations.push(ESP_IMAGE_LIMITATIONS.segmentLengthUnaligned(metadata.index, metadata.data_len));
				if (chip !== undefined && lengthLimit !== undefined && metadata.data_len >= lengthLimit) limitations.push(ESP_IMAGE_LIMITATIONS.segmentLengthTooLarge(metadata.index, metadata.data_len, lengthLimit, chip.target));
			}
			return limitations;
		};
		truncation = (observed, segments, limitations) => {
			const declared = observed.header[1] ?? 0;
			const short = segments.find(({ availableLength, metadata }) => availableLength < metadata.data_len);
			if (short !== undefined) {
				limitations.push(ESP_IMAGE_LIMITATIONS.truncatedSegment(short.metadata.index, short.metadata.data_len, short.dataOffset, short.availableLength));
				return true;
			}
			if (segments.length < declared) {
				limitations.push(ESP_IMAGE_LIMITATIONS.truncatedSegmentHeaders(declared, segments.length));
				return true;
			}
			return false;
		};
		checksumFacts = (observed, truncated, limitations) => {
			const offset = observed.checksumOffset ?? null;
			const computed = truncated ? null : observed.checksum;
			const stored = observed.storedChecksum ?? null;
			if (offset === null || computed === null || stored === null) {
				if (!truncated && offset !== null) limitations.push(ESP_IMAGE_LIMITATIONS.truncatedBeforeChecksum(offset));
				return {
					offset,
					stored,
					computed,
					status: "unavailable"
				};
			}
			if (stored !== computed) limitations.push(ESP_IMAGE_LIMITATIONS.checksumMismatch(stored, offset, computed));
			return {
				offset,
				stored,
				computed,
				status: stored === computed ? "valid" : "invalid"
			};
		};
		digestFacts = (observed, limitations) => {
			if (observed.header[23] !== 1) return {
				offset: null,
				stored: null,
				computed: null,
				status: "not-appended"
			};
			const offset = observed.checksumOffset === undefined ? null : observed.checksumOffset + 1;
			const computed = observed.imageSha256 ?? null;
			if (offset === null || computed === null || observed.observedEnd < offset + 32) {
				if (computed !== null && offset !== null) limitations.push(ESP_IMAGE_LIMITATIONS.truncatedBeforeDigest(offset));
				return {
					offset,
					stored: null,
					computed,
					status: "unavailable"
				};
			}
			const stored = hex$2(observed.storedDigest);
			if (stored !== computed) limitations.push(ESP_IMAGE_LIMITATIONS.digestMismatch(offset));
			return {
				offset,
				stored,
				computed,
				status: stored === computed ? "valid" : "invalid"
			};
		};
		trailingFacts = (observed, limitations) => {
			const { imageEnd: end, sectorOffset: sector, fileSize } = observed;
			const blocks = [];
			const undescribed = [];
			if (end === undefined || sector === undefined || fileSize <= end) return {
				blocks,
				undescribed,
				truncated: false
			};
			const add = (from, to) => {
				if (from === undefined || to <= from) return;
				const last = undescribed.at(-1);
				if (last !== undefined && last.offset + last.length === from) undescribed[undescribed.length - 1] = {
					offset: last.offset,
					length: to - last.offset
				};
				else undescribed.push({
					offset: from,
					length: to - from
				});
			};
			add(observed.gapFirstUnerased, Math.min(sector, fileSize));
			const held = observed.sector.subarray(0, Math.max(0, Math.min(ESP_FLASH_SECTOR_BYTES, fileSize - sector)));
			const slots = Array.from({ length: SIGNATURE_SLOTS }, (_, index) => {
				const from = index * ESP_SIGNATURE_BLOCK_BYTES;
				const bytes = held.subarray(from, from + ESP_SIGNATURE_BLOCK_BYTES);
				return {
					index,
					offset: sector + from,
					bytes,
					kind: bytes.length === 0 ? undefined : espSignatureSlot(bytes)
				};
			});
			for (const { index, offset, bytes, kind } of slots) {
				if (kind === "block") {
					const metadata = decodeEspSignatureBlock(bytes, index, observed.signedContent);
					blocks.push({
						offset,
						metadata
					});
					if (metadata.image_digest_matches === false) limitations.push(ESP_IMAGE_LIMITATIONS.signatureDigestMismatch(index, offset));
				} else if (kind === "other" && bytes[0] === 231) limitations.push(ESP_IMAGE_LIMITATIONS.invalidSignatureSlot(index, offset));
			}
			const sectorEnd = sector + ESP_FLASH_SECTOR_BYTES;
			const slotsEnd = sector + SIGNATURE_SLOTS * ESP_SIGNATURE_BLOCK_BYTES;
			if (blocks.length === 0) {
				add(firstUnerased(held, sector), sector + held.length);
				add(observed.restFirstUnerased, fileSize);
				if (undescribed.length > 0 || fileSize >= slotsEnd) return {
					blocks,
					undescribed,
					truncated: false
				};
				limitations.push(ESP_IMAGE_LIMITATIONS.signatureSlotsCut(fileSize, sector));
				return {
					blocks,
					undescribed,
					truncated: true
				};
			}
			for (const { offset, bytes, kind } of slots) if (kind === "other") add(offset, offset + bytes.length);
			const slack = held.subarray(SIGNATURE_SLOTS * ESP_SIGNATURE_BLOCK_BYTES);
			add(firstUnerased(slack, slotsEnd), sector + held.length);
			add(observed.restFirstUnerased, fileSize);
			if (fileSize < sectorEnd) {
				limitations.push(ESP_IMAGE_LIMITATIONS.signatureSectorTruncated(sector, fileSize, sectorEnd));
				return {
					blocks,
					undescribed,
					truncated: true
				};
			}
			return {
				blocks,
				undescribed,
				truncated: false
			};
		};
	})))();
}

//#endregion
//#region dist/domain/androidBootImageFormat.js
var ANDROID_BOOT_MAGIC, VENDOR_BOOT_MAGIC, ANDROID_BOOT_MAGIC_BYTES, VENDOR_BOOT_MAGIC_BYTES, hasAndroidBootImageMagic;
function init_androidBootImageFormat() {
	return (init_androidBootImageFormat = __esmMin((() => {
		ANDROID_BOOT_MAGIC = "ANDROID!";
		VENDOR_BOOT_MAGIC = "VNDRBOOT";
		ANDROID_BOOT_MAGIC_BYTES = Buffer.from(ANDROID_BOOT_MAGIC);
		VENDOR_BOOT_MAGIC_BYTES = Buffer.from(VENDOR_BOOT_MAGIC);
		hasAndroidBootImageMagic = (prefix) => prefix.length >= 8 && (prefix.subarray(0, 8).equals(ANDROID_BOOT_MAGIC_BYTES) || prefix.subarray(0, 8).equals(VENDOR_BOOT_MAGIC_BYTES));
	})))();
}

//#endregion
//#region dist/domain/elfRawTableDeclarations.js
var readElfRawTableDeclarations;
function init_elfRawTableDeclarations() {
	return (init_elfRawTableDeclarations = __esmMin((() => {
		init_binaryContainer();
		init_elfFixedHeader();
		init_result();
		readElfRawTableDeclarations = (bytes, format) => {
			const { elfClass, byteOrder } = format;
			const wide = elfClass === 64;
			if (bytes.byteLength < elfFixedHeaderWidth(elfClass)) return err({
				kind: "malformed",
				message: "ELF table declarations are truncated"
			});
			const reader = new BinaryReader$1(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), byteOrder === "little", "elf");
			return ok({
				programs: {
					offset: reader.word(wide ? 32 : 28, elfClass),
					width: reader.u16(wide ? 54 : 42),
					count: reader.u16(wide ? 56 : 44)
				},
				sections: {
					offset: reader.word(wide ? 40 : 32, elfClass),
					width: reader.u16(wide ? 58 : 46),
					count: reader.u16(wide ? 60 : 48),
					namesIndex: reader.u16(wide ? 62 : 50)
				}
			});
		};
	})))();
}

//#endregion
//#region dist/domain/elfSectionHeader.js
var elfSectionHeaderWidth, readElfSectionHeader;
function init_elfSectionHeader() {
	return (init_elfSectionHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		elfSectionHeaderWidth = (bits) => bits === 64 ? 64 : 40;
		readElfSectionHeader = (bytes, bits, littleEndian) => {
			const wide = bits === 64;
			if (bytes.byteLength < elfSectionHeaderWidth(bits)) return err({
				kind: "malformed",
				message: "ELF section header is truncated"
			});
			const reader = new BinaryReader$1(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "elf");
			const flags = reader.word(8, bits);
			return ok({
				nameOffset: reader.u32(0),
				type: reader.u32(4),
				flags,
				compressed: (flags & 2048n) !== 0n,
				address: reader.word(wide ? 16 : 12, bits),
				offset: reader.word(wide ? 24 : 16, bits),
				size: reader.word(wide ? 32 : 20, bits),
				link: reader.u32(wide ? 40 : 24),
				info: reader.u32(wide ? 44 : 28),
				alignment: reader.word(wide ? 48 : 32, bits),
				entrySize: reader.word(wide ? 56 : 36, bits)
			});
		};
	})))();
}

//#endregion
//#region dist/domain/elfProgramHeader.js
var PT_INTERP, elfProgramHeaderWidth, readElfProgramHeader, admitElfLoadSegment, elfLoadSpans;
function init_elfProgramHeader() {
	return (init_elfProgramHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		PT_INTERP = 3;
		elfProgramHeaderWidth = (bits) => bits === 64 ? 56 : 32;
		readElfProgramHeader = (bytes, bits, littleEndian) => {
			const wide = bits === 64;
			if (bytes.byteLength < elfProgramHeaderWidth(bits)) return err({
				kind: "malformed",
				message: "ELF program header is truncated"
			});
			const reader = new BinaryReader$1(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "elf");
			return ok({
				type: reader.u32(0),
				flags: reader.u32(wide ? 4 : 24),
				offset: reader.word(wide ? 8 : 4, bits),
				virtualAddress: reader.word(wide ? 16 : 8, bits),
				physicalAddress: reader.word(wide ? 24 : 12, bits),
				fileSize: reader.word(wide ? 32 : 16, bits),
				memorySize: reader.word(wide ? 40 : 20, bits),
				alignment: reader.word(wide ? 48 : 28, bits)
			});
		};
		admitElfLoadSegment = (segment, bits) => segment.fileSize > segment.memorySize || segment.virtualAddress + segment.memorySize > 1n << BigInt(bits) ? err({
			kind: "malformed",
			message: "ELF load segment sizes or addresses are invalid"
		}) : ok(null);
		elfLoadSpans = ({ virtualAddress, offset, fileSize, memorySize }) => ({
			fileBacked: fileSize === 0n ? undefined : {
				address: virtualAddress,
				offset: Number(offset),
				size: Number(fileSize)
			},
			zeroFill: memorySize > fileSize ? {
				address: virtualAddress + fileSize,
				size: memorySize - fileSize
			} : undefined
		});
	})))();
}

//#endregion
//#region dist/domain/elfDeclaredRanges.js
/** Canonical table declarations, including extended counts in inactive section zero. */
function* readElfTableDeclarations(bytes, fileSize) {
	const fixed = readElfFixedHeader(bytes, fileSize);
	if (!fixed.ok) return fixed;
	const header = fixed.value;
	const raw = readElfRawTableDeclarations(bytes, header);
	if (!raw.ok) return err(raw.error.message);
	const { programs, sections } = raw.value;
	const programOffset = programs.offset;
	const sectionOffset = sections.offset;
	const programWidth = programs.width;
	const sectionWidth = sections.width;
	let programCount = BigInt(programs.count);
	let sectionCount = BigInt(sections.count);
	let namesIndex = sections.namesIndex;
	const sectionTable = validateElfSectionTableFields(raw.value);
	if (!sectionTable.ok) return sectionTable;
	if (sectionOffset !== 0n && (sectionCount === 0n || namesIndex === 65535 || programCount === 65535n)) {
		const failure = tableFailure("section", {
			offset: sectionOffset,
			count: 1n,
			width: sectionWidth
		}, header, fileSize);
		if (failure !== undefined) return err(failure);
		const first = yield {
			offset: Number(sectionOffset),
			size: elfSectionHeaderWidth(header.elfClass)
		};
		const counts = extendedCounts(first, header, {
			programCount,
			sectionCount,
			namesIndex
		});
		if (!counts.ok) return counts;
		({programCount, sectionCount, namesIndex} = counts.value);
	}
	for (const [kind, offset, count, width] of [[
		"program",
		programOffset,
		programCount,
		programWidth
	], [
		"section",
		sectionOffset,
		sectionCount,
		sectionWidth
	]]) {
		const failure = tableFailure(kind, {
			offset,
			count,
			width
		}, header, fileSize);
		if (failure !== undefined) return err(failure);
	}
	if (sectionCount !== 0n && BigInt(namesIndex) >= sectionCount) return err("ELF section-name index lies outside the declared section table");
	return ok({
		header,
		programs: {
			offset: programOffset,
			count: Number(programCount),
			width: programWidth
		},
		sections: {
			offset: sectionOffset,
			count: Number(sectionCount),
			width: sectionWidth,
			namesIndex
		}
	});
}
/** Examine only header records; referenced payloads are range-checked, never copied. */
function* inspectTableRanges(kind, table, header, fileSize) {
	let hasInterpreter = false;
	const perRead = Math.max(1, Math.floor(64 * 1024 / table.width));
	for (let index = 0; index < table.count; index += perRead) {
		const count = Math.min(perRead, table.count - index);
		const size = count * table.width;
		const bytes = yield {
			offset: Number(table.offset) + index * table.width,
			size
		};
		if (bytes.length !== size) return err(`truncated ELF ${kind} header table`);
		for (let item = 0; item < count; item++) {
			const at = item * table.width;
			const parsed = kind === "program" ? readElfProgramHeader(bytes.subarray(at, at + table.width), header.elfClass, header.byteOrder === "little") : readElfSectionHeader(bytes.subarray(at, at + table.width), header.elfClass, header.byteOrder === "little");
			if (!parsed.ok) return err(parsed.error.message);
			const facts = parsed.value;
			if (facts.type === 0 || kind === "section" && facts.type === 8) continue;
			const offset = facts.offset;
			const length = "fileSize" in facts ? facts.fileSize : facts.size;
			const failure = rangeFailure(`${kind} ${String(index + item)}`, offset, length, fileSize);
			if (failure !== undefined) return err(failure);
			if (kind === "program" && facts.type === 3) {
				if (length < 2n) return err("invalid ELF PT_INTERP file size");
				hasInterpreter = true;
			}
		}
	}
	return ok({ hasInterpreter });
}
/** Physical extent admission, independent of section names, CPU lanes and decoder budgets. */
function* validateElfDeclaredRanges(prefix, fileSize) {
	const declarations = yield* readElfTableDeclarations(prefix, fileSize);
	if (!declarations.ok) return declarations;
	const { header, programs, sections } = declarations.value;
	let hasInterpreter = false;
	for (const [kind, table] of [["program", programs], ["section", sections]]) {
		if (table.count === 0) continue;
		const inspected = yield* inspectTableRanges(kind, table, header, fileSize);
		if (!inspected.ok) return inspected;
		if (kind === "program") {
			hasInterpreter = inspected.value.hasInterpreter;
		}
	}
	return ok({ hasInterpreter });
}
var SHN_LORESERVE, rangeFailure, tableFailure, extendedCounts, validateElfSectionTableFields;
function init_elfDeclaredRanges() {
	return (init_elfDeclaredRanges = __esmMin((() => {
		init_elfSectionHeader();
		init_elfProgramHeader();
		init_elfRawTableDeclarations();
		init_elfFixedHeader();
		init_result();
		SHN_LORESERVE = 65280;
		rangeFailure = (label, offset, size, fileSize) => size !== 0n && (offset > BigInt(fileSize) || size > BigInt(fileSize) - offset) ? `truncated ELF ${label}: declared file range ${String(offset)}..${String(offset + size)} exceeds the ${String(fileSize)}-byte file` : undefined;
		tableFailure = (kind, table, header, fileSize) => {
			if (table.count === 0n) return undefined;
			const minimumWidth = kind === "program" ? elfProgramHeaderWidth(header.elfClass) : elfSectionHeaderWidth(header.elfClass);
			const label = `${kind} header table`;
			if (table.width < minimumWidth) return `invalid ELF ${label} entry width`;
			if (table.offset < BigInt(header.headerSize)) return `ELF ${label} overlaps the fixed header`;
			return rangeFailure(label, table.offset, table.count * BigInt(table.width), fileSize);
		};
		extendedCounts = (first, header, initial) => {
			if (first.length !== elfSectionHeaderWidth(header.elfClass)) return err("truncated ELF extended section-zero header");
			const parsed = readElfSectionHeader(first, header.elfClass, header.byteOrder === "little");
			if (!parsed.ok) return err(parsed.error.message);
			const zero = parsed.value;
			if (zero.type !== 0) return err("ELF extended numbering requires an inactive SHT_NULL section zero");
			const counts = { ...initial };
			if (counts.sectionCount === 0n) {
				counts.sectionCount = zero.size;
				if (counts.sectionCount < BigInt(SHN_LORESERVE)) return err("invalid ELF extended section count");
			}
			if (counts.namesIndex === 65535) {
				counts.namesIndex = zero.link;
				if (counts.namesIndex < SHN_LORESERVE) return err("invalid ELF extended section-name index");
			}
			if (counts.programCount === 65535n) {
				counts.programCount = BigInt(zero.info);
				if (counts.programCount < 65535n) return err("invalid ELF extended program count");
			}
			return ok(counts);
		};
		validateElfSectionTableFields = (tables) => {
			if (tables.sections.count >= SHN_LORESERVE) return err("ELF e_shnum uses a reserved direct section count");
			if (tables.sections.offset === 0n && (tables.sections.count !== 0 || tables.sections.namesIndex !== 0 || tables.programs.count === 65535)) return err("ELF section table is missing");
			return ok(null);
		};
	})))();
}

//#endregion
//#region dist/domain/native/peResources.js
var uint, range, identity, MAX_INSPECT_PE_FILE_BYTES, MAX_INSPECT_PE_DIRECTORY_ENTRIES, inspectPeResourcesInputSchema, peResourcesSchema;
function init_peResources() {
	return (init_peResources = __esmMin((() => {
		init_localPath();
		uint = z.number().int().min(0).max(4294967295);
		range = z.strictObject({
			offset: uint,
			bytes: uint
		});
		identity = z.discriminatedUnion("kind", [z.strictObject({
			kind: z.literal("id"),
			id: uint
		}), z.strictObject({
			kind: z.literal("name"),
			name: z.string(),
			utf16le_hex: z.string().regex(/^(?:[0-9a-f]{4})*$/),
			location: range
		})]);
		MAX_INSPECT_PE_FILE_BYTES = 536870912;
		MAX_INSPECT_PE_DIRECTORY_ENTRIES = 65536;
		inspectPeResourcesInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a PE image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_PE_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_entries: z.number().int().min(1).max(MAX_INSPECT_PE_DIRECTORY_ENTRIES).default(16384).describe("Maximum resource directory entries to examine; exceeding the budget fails without partial success")
		});
		peResourcesSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				bytes: uint
			}),
			format: z.enum(["pe32", "pe32-plus"]),
			machine: uint,
			directory: z.strictObject({
				rva: uint,
				location: range,
				data_directory_location: range
			}).nullable(),
			directories: z.array(z.strictObject({
				path: z.array(identity).max(2).describe("Type/name identities leading to this directory; [] for the root"),
				entry_locations: z.array(range).max(2).describe("Incoming entry file ranges corresponding to path"),
				location: range,
				characteristics: uint,
				timestamp: uint,
				major_version: uint,
				minor_version: uint,
				named_entries: uint,
				id_entries: uint
			})),
			resources: z.array(z.strictObject({
				index: uint,
				type: identity,
				name: identity,
				language: identity,
				entry_locations: z.array(range).length(3),
				data_entry_location: range,
				code_page: uint,
				reserved: uint,
				payload: z.strictObject({
					rva: uint,
					location: range,
					sha256: z.string().regex(/^[a-f0-9]{64}$/)
				})
			})),
			icon_groups: z.array(z.strictObject({
				resource_index: uint,
				images: z.array(z.strictObject({
					location: range,
					width: uint,
					height: uint,
					color_count: uint,
					reserved: uint,
					planes: uint,
					bit_count: uint,
					declared_bytes: uint,
					resource_id: uint,
					candidate_resource_indices: z.array(uint),
					same_language_resource_index: uint.nullable(),
					size_matches: z.boolean().nullable()
				}))
			})),
			coverage: z.strictObject({
				status: z.literal("complete"),
				examined_entries: uint,
				resources: uint
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/godotPckFormat.js
var hasGodotPckHeader, pckReader, readGodotPckHeaderFacts, godotPckHeaderEnd, godotPckDataStartsAfterHeader, readGodotPckTrailerFacts;
function init_godotPckFormat() {
	return (init_godotPckFormat = __esmMin((() => {
		init_binaryContainer();
		hasGodotPckHeader = (bytes) => bytes.length >= 4 && bytes[0] === 71 && bytes[1] === 68 && bytes[2] === 80 && bytes[3] === 67;
		pckReader = (bytes) => new BinaryReader$1(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "godot-pck");
		readGodotPckHeaderFacts = (bytes) => {
			const reader = pckReader(bytes);
			return {
				formatVersion: reader.u32(4),
				engineMajor: reader.u32(8),
				engineMinor: reader.u32(12),
				enginePatch: reader.u32(16)
			};
		};
		godotPckHeaderEnd = (start, version) => start + (version === 1 ? 84 : version === 2 ? 96 : 104);
		godotPckDataStartsAfterHeader = (packStart, formatVersion, offset) => offset >= godotPckHeaderEnd(packStart, formatVersion);
		readGodotPckTrailerFacts = (trailer, fileSize) => {
			if (!hasGodotPckHeader(trailer.subarray(8, 12))) return { state: "absent" };
			const packBytes = pckReader(trailer).word(0, 64);
			const end = fileSize - 12;
			return {
				state: "declared",
				packBytes,
				start: packBytes > BigInt(end) ? null : end - Number(packBytes),
				end
			};
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/dfuse.js
var PREFIX_BYTES, TARGET_PREFIX_BYTES, TARGET_NAME_OFFSET, TARGET_NAME_BYTES, ELEMENT_HEADER_BYTES, DFUSE_SUFFIX_BYTES, DFUSE_VERSION, DFU_SUFFIX_VERSION, ADDRESS_SPACE$1, NAMED_ELEMENTS, SIGNATURE, TARGET_SIGNATURE, SUFFIX_SIGNATURE, DFUSE_MAX_FILE_BYTES, DFUSE_MAX_ELEMENTS, readUint16, readUint32$1, startsWith, hex32$1, hasDfuSePrefix, hasDfuSeSuffix, isDfuSeFile, createDfuSeDecoder, dfuCrc, formatFailure$1, named$2, RetainingDfuSeDecoder, parseDfuSe, TargetWalk, latin1UntilNul, elementText, overlappingElements;
function init_dfuse() {
	return (init_dfuse = __esmMin((() => {
		init_boundedList();
		init_result();
		PREFIX_BYTES = 11;
		TARGET_PREFIX_BYTES = 274;
		TARGET_NAME_OFFSET = 11;
		TARGET_NAME_BYTES = 255;
		ELEMENT_HEADER_BYTES = 8;
		DFUSE_SUFFIX_BYTES = 16;
		DFUSE_VERSION = 1;
		DFU_SUFFIX_VERSION = 282;
		ADDRESS_SPACE$1 = 4294967296;
		NAMED_ELEMENTS = 4;
		SIGNATURE = [
			68,
			102,
			117,
			83,
			101
		];
		TARGET_SIGNATURE = [
			84,
			97,
			114,
			103,
			101,
			116
		];
		SUFFIX_SIGNATURE = [
			85,
			70,
			68
		];
		DFUSE_MAX_FILE_BYTES = 128 * 1024 * 1024;
		DFUSE_MAX_ELEMENTS = 65536;
		readUint16 = (bytes, offset) => (bytes[offset] ?? 0) | (bytes[offset + 1] ?? 0) << 8;
		readUint32$1 = (bytes, offset) => (readUint16(bytes, offset) | readUint16(bytes, offset + 2) << 16) >>> 0;
		startsWith = (bytes, offset, signature) => signature.every((byte, index) => bytes[offset + index] === byte);
		hex32$1 = (value) => `0x${value.toString(16).padStart(8, "0")}`;
		hasDfuSePrefix = (prefix) => startsWith(prefix, 0, SIGNATURE) && prefix[5] === DFUSE_VERSION;
		hasDfuSeSuffix = (suffix) => suffix.length === 16 && readUint16(suffix, 6) === DFU_SUFFIX_VERSION && startsWith(suffix, 8, SUFFIX_SIGNATURE) && suffix[11] === 16;
		isDfuSeFile = (prefix, suffix, fileBytes) => fileBytes >= PREFIX_BYTES + 16 && hasDfuSePrefix(prefix) && hasDfuSeSuffix(suffix);
		createDfuSeDecoder = (fileBytes) => Number.isSafeInteger(fileBytes) && fileBytes >= 0 && fileBytes <= 134217728 ? ok(new RetainingDfuSeDecoder(fileBytes)) : err({
			kind: "limit",
			boundary: "file-size",
			message: `file is ${String(fileBytes)} bytes, exceeding the fixed ${String(DFUSE_MAX_FILE_BYTES)}-byte (128 MiB) ceiling`
		});
		dfuCrc = (bytes) => ~crc32(bytes) >>> 0;
		formatFailure$1 = (offset, detail) => ({
			kind: "format",
			message: `byte offset ${String(offset)}: ${detail}`
		});
		named$2 = (items, total = items.length) => describeBoundedList(boundedList(items, NAMED_ELEMENTS, total - items.length), "; ");
		RetainingDfuSeDecoder = class {
			#bytes;
			#length = 0;
			constructor(fileBytes) {
				this.#bytes = new Uint8Array(fileBytes);
			}
			write(chunk) {
				if (this.#length + chunk.length > this.#bytes.length) return err({
					kind: "limit",
					boundary: "file-size",
					message: "file grew beyond its admitted size while being read"
				});
				this.#bytes.set(chunk, this.#length);
				this.#length += chunk.length;
				return ok(undefined);
			}
			finish() {
				return parseDfuSe(this.#bytes.subarray(0, this.#length));
			}
		};
		parseDfuSe = (bytes) => {
			const suffixStart = bytes.length - 16;
			if (bytes.length < PREFIX_BYTES + 16 || !hasDfuSePrefix(bytes) || !hasDfuSeSuffix(bytes.subarray(suffixStart))) return err(formatFailure$1(0, "the file does not begin with a DfuSe prefix and end with a DFU 1.1a suffix"));
			const imageSize = readUint32$1(bytes, 6);
			const suffixCrc = readUint32$1(bytes, suffixStart + 12);
			const computedCrc = dfuCrc(bytes.subarray(0, bytes.length - 4));
			if (imageSize !== suffixStart && imageSize !== bytes.length) return err(formatFailure$1(6, `DFUImageSize declares ${String(imageSize)} bytes, but the DFU suffix begins at byte ${String(suffixStart)} and the file holds ${String(bytes.length)} bytes; the suffix CRC ${suffixCrc === computedCrc ? "matches" : "does not match"} the file`));
			const targetCount = bytes[10] ?? 0;
			const walk = new TargetWalk(bytes, suffixStart);
			let offset = PREFIX_BYTES;
			for (let targetIndex = 0; targetIndex < targetCount; targetIndex += 1) {
				const next = walk.target(targetIndex, offset);
				if (!next.ok) return next;
				offset = next.value;
			}
			if (offset !== suffixStart) return err(formatFailure$1(offset, `${String(targetCount)} target(s) end at byte ${String(offset)}, but the DFU suffix begins at byte ${String(suffixStart)}`));
			const { elements } = walk;
			const overlaps = overlappingElements(elements);
			return ok({
				metadata: {
					kind: "dfuse",
					image_size: imageSize,
					target_count: targetCount,
					element_count: walk.elementCount,
					empty_element_count: walk.emptyElements,
					overlapping_element_count: overlaps.length,
					data_bytes: elements.reduce((sum, element) => sum + element.bytes.length, 0),
					device_version: readUint16(bytes, suffixStart),
					product_id: readUint16(bytes, suffixStart + 2),
					vendor_id: readUint16(bytes, suffixStart + 4),
					suffix_crc: suffixCrc,
					computed_crc: computedCrc
				},
				elements,
				limitations: [...overlaps.length === 0 ? [] : [`${String(overlaps.length)} DfuSe element(s) overlap an element earlier in address order within the same alternate setting; each stays a separate entry and no bytes were merged: ${named$2(overlaps)}.`], ...walk.unlistedCount === 0 ? [] : [`DfuSe declarations without bytes have no entry: ${named$2(walk.unlisted, walk.unlistedCount)}.`]]
			});
		};
		TargetWalk = class {
			bytes;
			suffixStart;
			elements = [];
			/**
			* The first NAMED_ELEMENTS empty elements and element-less targets, which no
			* entry can show. A file can hold millions of empty elements, so the rest
			* are only counted in `unlistedCount`.
			*/
			unlisted = [];
			unlistedCount = 0;
			elementCount = 0;
			emptyElements = 0;
			constructor(bytes, suffixStart) {
				this.bytes = bytes;
				this.suffixStart = suffixStart;
			}
			/** Parse one target at `offset`; the result is the offset after its elements. */
			target(targetIndex, offset) {
				const { bytes } = this;
				if (offset + TARGET_PREFIX_BYTES > this.suffixStart) return err(formatFailure$1(offset, `target ${String(targetIndex)} prefix needs ${String(TARGET_PREFIX_BYTES)} bytes, but the image ends at byte ${String(this.suffixStart)}`));
				if (!startsWith(bytes, offset, TARGET_SIGNATURE)) return err(formatFailure$1(offset, `target ${String(targetIndex)} does not begin with the "Target" signature`));
				const targetSize = readUint32$1(bytes, offset + 266);
				const declaredElements = readUint32$1(bytes, offset + 270);
				const bodyStart = offset + TARGET_PREFIX_BYTES;
				const bodyEnd = bodyStart + targetSize;
				if (bodyEnd > this.suffixStart) return err(formatFailure$1(offset + 266, `target ${String(targetIndex)} declares ${String(targetSize)} bytes, but the image ends at byte ${String(this.suffixStart)}`));
				const target = {
					targetIndex,
					alternateSetting: bytes[offset + 6] ?? 0,
					targetName: readUint32$1(bytes, offset + 7) === 0 ? null : latin1UntilNul(bytes.subarray(offset + TARGET_NAME_OFFSET, offset + TARGET_NAME_OFFSET + TARGET_NAME_BYTES))
				};
				if (declaredElements === 0) this.#unlisted(() => `target ${String(targetIndex)} (alternate setting ${String(target.alternateSetting)}) declares no elements`);
				let position = bodyStart;
				for (let index = 0; index < declaredElements; index += 1) {
					const next = this.#element(target, index, position, bodyEnd);
					if (!next.ok) return next;
					position = next.value;
				}
				return position === bodyEnd ? ok(bodyEnd) : err(formatFailure$1(position, `target ${String(targetIndex)} declares ${String(targetSize)} bytes, but its ${String(declaredElements)} element(s) end ${String(bodyEnd - position)} bytes earlier`));
			}
			#element(target, elementIndex, position, bodyEnd) {
				const name = `target ${String(target.targetIndex)} element ${String(elementIndex)}`;
				if (position + ELEMENT_HEADER_BYTES > bodyEnd) return err(formatFailure$1(position, `${name} header lies beyond the target's end at byte ${String(bodyEnd)}`));
				const address = readUint32$1(this.bytes, position);
				const size = readUint32$1(this.bytes, position + 4);
				const dataOffset = position + ELEMENT_HEADER_BYTES;
				if (dataOffset + size > bodyEnd) return err(formatFailure$1(position + 4, `${name} declares ${String(size)} bytes, but its target ends at byte ${String(bodyEnd)}`));
				if (address + size > ADDRESS_SPACE$1) return err(formatFailure$1(position, `${name} at ${hex32$1(address)} with ${String(size)} bytes wraps past 0xffffffff`));
				if (size > 0 && this.elements.length >= 65536) return err({
					kind: "limit",
					boundary: "capacity",
					message: `byte offset ${String(position)}: the file holds more than ${String(DFUSE_MAX_ELEMENTS)} elements with bytes, the most retained as entries`
				});
				this.elementCount += 1;
				if (size === 0) {
					this.emptyElements += 1;
					this.#unlisted(() => `${name} at ${hex32$1(address)} (alternate setting ${String(target.alternateSetting)}) holds no bytes`);
				} else this.elements.push({
					...target,
					elementIndex,
					address,
					dataOffset,
					bytes: this.bytes.subarray(dataOffset, dataOffset + size)
				});
				return ok(dataOffset + size);
			}
			/** Count a declaration without bytes; describe only the first few. */
			#unlisted(describe) {
				this.unlistedCount += 1;
				if (this.unlisted.length < NAMED_ELEMENTS) this.unlisted.push(describe());
			}
		};
		latin1UntilNul = (field) => {
			const end = field.indexOf(0);
			return String.fromCharCode(...field.subarray(0, end < 0 ? field.length : end));
		};
		elementText = (element) => `target ${String(element.targetIndex)} element ${String(element.elementIndex)} (${hex32$1(element.address)}-${hex32$1(element.address + element.bytes.length - 1)})`;
		overlappingElements = (elements) => {
			const ordered = [...elements].sort((left, right) => left.alternateSetting - right.alternateSetting || left.address - right.address);
			const overlaps = [];
			let reach;
			for (const element of ordered) {
				if (reach !== undefined && reach.alternateSetting === element.alternateSetting && element.address < reach.address + reach.bytes.length) overlaps.push(`${elementText(element)} overlaps ${elementText(reach)} in alternate setting ${String(element.alternateSetting)}`);
				if (reach === undefined || reach.alternateSetting !== element.alternateSetting || element.address + element.bytes.length > reach.address + reach.bytes.length) reach = element;
			}
			return overlaps;
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/espPartitionTable.js
var ESP_PARTITION_TABLE_DEFAULT_OFFSET, ESP_PARTITION_TABLE_SECTOR_BYTES, ESP_PARTITION_TABLE_MAX_BYTES, ENTRY_BYTES, MAX_ENTRIES, PARTITION_MAGIC, MD5_MAGIC, END_MAGIC, END_TYPE, MD5_DIGEST_OFFSET, KNOWN_FLAGS, partition, decodeEspPartitionTable, TYPE_NAMES$1, SUBTYPE_NAMES, espPartitionTypeName, espPartitionSubtypeName, APP_TYPE, OTA_DATA_SUBTYPE, DATA_TYPE, BOOTLOADER_TYPE, PARTITION_TABLE_TYPE, PRIMARY_SUBTYPE, OTA_APP_SUBTYPE_FLAG, OTA_APP_SUBTYPE_MASK, espOtaAppSlot, isEspFactoryApp, isEspOtaData, isEspAppPartition, espPrimaryLayoutRole, espBootPartitions;
function init_espPartitionTable() {
	return (init_espPartitionTable = __esmMin((() => {
		init_result();
		init_espImageStructures();
		ESP_PARTITION_TABLE_DEFAULT_OFFSET = 32768;
		ESP_PARTITION_TABLE_SECTOR_BYTES = 4096;
		ESP_PARTITION_TABLE_MAX_BYTES = 3072;
		ENTRY_BYTES = 32;
		MAX_ENTRIES = ESP_PARTITION_TABLE_MAX_BYTES / ENTRY_BYTES;
		PARTITION_MAGIC = 20650;
		MD5_MAGIC = 60395;
		END_MAGIC = 65535;
		END_TYPE = 255;
		MD5_DIGEST_OFFSET = 16;
		KNOWN_FLAGS = 3;
		partition = (entry, index, entryOffset) => {
			const flags = u32(entry, 28);
			const labelBytes = entry.subarray(12, 28);
			const label = cString(labelBytes);
			return {
				index,
				entryOffset,
				type: entry[2] ?? 0,
				subtype: entry[3] ?? 0,
				offset: u32(entry, 4),
				size: u32(entry, 8),
				label,
				labelHex: label === null ? hex$2(cStringBytes(labelBytes)) : null,
				encrypted: (flags & 1) !== 0,
				readonly: (flags & 2) !== 0,
				unknownFlags: (flags & ~KNOWN_FLAGS) >>> 0
			};
		};
		decodeEspPartitionTable = (bytes) => {
			const partitions = [];
			const limitations = [];
			let md5 = {
				status: "absent",
				entryOffset: null,
				entriesAfterChecksum: 0,
				stored: null,
				computed: null
			};
			let partitionsAfterMd5 = 0;
			for (let slot = 0; slot < MAX_ENTRIES; slot += 1) {
				const at = slot * ENTRY_BYTES;
				const entry = bytes.subarray(at, at + ENTRY_BYTES);
				if (entry.length < ENTRY_BYTES) return err(`the bytes end at ${offsetText(at + entry.length)}, inside entry ${String(slot)}`);
				const magic = u16(entry, 0);
				if (magic === PARTITION_MAGIC) {
					if (md5.entryOffset !== null) partitionsAfterMd5 += 1;
					partitions.push(partition(entry, partitions.length, at));
					continue;
				}
				if (magic === MD5_MAGIC) {
					const computed = createHash("md5").update(bytes.subarray(0, at)).digest("hex");
					const stored = hex$2(entry.subarray(MD5_DIGEST_OFFSET, ENTRY_BYTES));
					if (md5.status !== "absent") {
						limitations.push(`The partition table has a second MD5 entry at ${offsetText(at)}; ESP-IDF allows one and rejects the table.`);
						md5 = {
							...md5,
							status: "invalid"
						};
						continue;
					}
					md5 = {
						status: stored === computed ? "valid" : "invalid",
						entryOffset: at,
						entriesAfterChecksum: 0,
						stored,
						computed
					};
					if (stored !== computed) limitations.push(`The partition table MD5 at ${offsetText(at)} does not match the entries before it; ESP-IDF's bootloader rejects the table.`);
					continue;
				}
				const terminator = magic === END_MAGIC && entry[2] === END_TYPE && entry[3] === END_TYPE;
				if (terminator && partitions.length > 0) {
					const reported = {
						...md5,
						entriesAfterChecksum: partitionsAfterMd5
					};
					if (reported.entryOffset !== null && reported.entriesAfterChecksum > 0) limitations.push(`${String(reported.entriesAfterChecksum)} partition entries after the MD5 record at table-relative offset ${offsetText(reported.entryOffset)} are outside its checksum coverage.`);
					return ok({
						partitions,
						md5: reported,
						length: at + ENTRY_BYTES,
						limitations
					});
				}
				return err(slot === 0 && magic === END_MAGIC ? "the first entry is empty" : terminator ? `entry ${String(slot)} at ${offsetText(at)} ends the table before any partition entry` : `entry ${String(slot)} at ${offsetText(at)} has magic ${offsetText(magic)}, not a partition, MD5 or terminating entry`);
			}
			return err(`no terminating entry within ${String(MAX_ENTRIES)} entries (${offsetText(ESP_PARTITION_TABLE_MAX_BYTES)} bytes)`);
		};
		TYPE_NAMES$1 = {
			0: "app",
			1: "data",
			2: "bootloader",
			3: "partition_table"
		};
		SUBTYPE_NAMES = {
			0: {
				0: "factory",
				32: "test",
				...Object.fromEntries(Array.from({ length: 16 }, (_, slot) => [16 + slot, `ota_${String(slot)}`])),
				48: "tee_0",
				49: "tee_1"
			},
			1: {
				0: "ota",
				1: "phy",
				2: "nvs",
				3: "coredump",
				4: "nvs_keys",
				5: "efuse",
				6: "undefined",
				128: "esphttpd",
				129: "fat",
				130: "spiffs",
				131: "littlefs",
				144: "tee_ota"
			},
			2: {
				0: "primary",
				1: "ota",
				2: "recovery"
			},
			3: {
				0: "primary",
				1: "ota"
			}
		};
		espPartitionTypeName = (type) => TYPE_NAMES$1[type] ?? null;
		espPartitionSubtypeName = (type, subtype) => SUBTYPE_NAMES[type]?.[subtype] ?? null;
		APP_TYPE = 0;
		OTA_DATA_SUBTYPE = 0;
		DATA_TYPE = 1;
		BOOTLOADER_TYPE = 2;
		PARTITION_TABLE_TYPE = 3;
		PRIMARY_SUBTYPE = 0;
		OTA_APP_SUBTYPE_FLAG = 16;
		OTA_APP_SUBTYPE_MASK = 15;
		espOtaAppSlot = (part) => part.type === APP_TYPE && (part.subtype & ~OTA_APP_SUBTYPE_MASK) === OTA_APP_SUBTYPE_FLAG ? part.subtype & OTA_APP_SUBTYPE_MASK : null;
		isEspFactoryApp = (part) => part.type === APP_TYPE && part.subtype === 0;
		isEspOtaData = (part) => part.type === DATA_TYPE && part.subtype === OTA_DATA_SUBTYPE;
		isEspAppPartition = (part) => part.type === APP_TYPE;
		espPrimaryLayoutRole = (part) => {
			if (part.subtype !== PRIMARY_SUBTYPE) return undefined;
			if (part.type === BOOTLOADER_TYPE) return "bootloader";
			return part.type === PARTITION_TABLE_TYPE ? "partition-table" : undefined;
		};
		espBootPartitions = (partitions) => {
			let factory;
			let otadata;
			let otaAppCount = 0;
			const otaSlots = new Map();
			const roles = new Map();
			for (const part of partitions) {
				const slot = espOtaAppSlot(part);
				const role = isEspFactoryApp(part) ? "factory" : isEspOtaData(part) ? "otadata" : slot === null ? undefined : `ota_${String(slot)}`;
				if (role === undefined) continue;
				roles.set(role, [...roles.get(role) ?? [], part]);
				if (role === "factory") factory = part;
				else if (role === "otadata") otadata = part;
				else if (slot !== null) {
					otaSlots.set(slot, part);
					otaAppCount += 1;
				}
			}
			const limitations = [...roles].flatMap(([role, parts]) => parts.length < 2 ? [] : [`The table declares ${role} ${String(parts.length)} times (partitions ${parts.map(({ index }) => `#${String(index)}`).join(", ")}); ESP-IDF's bootloader uses the last.`]);
			return {
				factory,
				otadata,
				otaSlots,
				otaAppCount,
				limitations
			};
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/espImage.js
var ESP_IMAGE_MAGIC, ESP_IMAGE_HEADER_BYTES, ESP_IMAGE_MAX_SEGMENTS, CHECKSUM_SEED, SPI_SPEEDS, LAST_SPI_MODE, ESP8266_LOAD_REGIONS, ESP8266_REFUSAL, alignUp$1, recognizeHeader, recognizeEspImage, createEspImageDecoder, StreamingEspImageDecoder;
function init_espImage() {
	return (init_espImage = __esmMin((() => {
		init_result();
		init_espImageFacts();
		init_espImageStructures();
		ESP_IMAGE_MAGIC = 233;
		ESP_IMAGE_HEADER_BYTES = 24;
		ESP_IMAGE_MAX_SEGMENTS = 16;
		CHECKSUM_SEED = 239;
		SPI_SPEEDS = new Set([
			0,
			1,
			2,
			15
		]);
		LAST_SPI_MODE = 5;
		ESP8266_LOAD_REGIONS = [
			[1073643520, 1073741824],
			[1074790400, 1074855936],
			[1075838976, 1076887552]
		];
		ESP8266_REFUSAL = "ESP8266 firmware images are not supported: they share the 0xE9 magic but have an 8-byte header without the ESP32 extended header";
		alignUp$1 = (value, alignment) => Math.ceil(value / alignment) * alignment;
		recognizeHeader = (prefix, fileSize) => {
			if (!Number.isSafeInteger(fileSize) || prefix[0] !== 233) return undefined;
			const count = prefix[1] ?? 0;
			if (count > 16) return undefined;
			if (count > 0 && prefix.length >= 16 && fileSize >= 16) {
				const firstLoad = u32(prefix, 8);
				if (ESP8266_LOAD_REGIONS.some(([low, high]) => firstLoad >= low && firstLoad < high) && u32(prefix, 12) % 4 === 0) return "esp8266";
			}
			if (fileSize < 24 || prefix.length < 24) return undefined;
			return (prefix[2] ?? 0) > LAST_SPI_MODE || !SPI_SPEEDS.has((prefix[3] ?? 0) & 15) || (prefix[23] ?? 0) > 1 ? undefined : "esp-image";
		};
		recognizeEspImage = (prefix, fileSize) => {
			const recognized = recognizeHeader(prefix, fileSize);
			const firstHeaderEnd = 24 + 8;
			if (recognized !== "esp-image") return recognized;
			if (prefix[1] === 0) return undefined;
			if (fileSize < firstHeaderEnd) return recognized;
			if (prefix.length < firstHeaderEnd) return undefined;
			return u32(prefix, 28) % 4 === 0 ? "esp-image" : undefined;
		};
		createEspImageDecoder = (fileSize) => new StreamingEspImageDecoder(fileSize);
		StreamingEspImageDecoder = class {
			#fileSize;
			#header = new Uint8Array(24);
			#segmentHeader = new Uint8Array(8);
			#segments = [];
			#descriptor = new Uint8Array(256);
			#digest = new Uint8Array(32);
			#sector = new Uint8Array(ESP_FLASH_SECTOR_BYTES);
			/** Hash every byte before the sector; signatures cover all of them. */
			#sha256 = createHash("sha256");
			#sha384 = createHash("sha384");
			#stage = "header";
			#position = 0;
			#regionStart = 0;
			#regionEnd = 24;
			#segmentCount = 0;
			#checksum = CHECKSUM_SEED;
			#descriptorBytes = 0;
			#checksumOffset;
			#storedChecksum;
			#imageSha256;
			#imageEnd;
			#sectorOffset;
			#gapFirstUnerased;
			#restFirstUnerased;
			#contentSha256;
			#contentSha384;
			#failure;
			constructor(fileSize) {
				this.#fileSize = fileSize;
			}
			/** Reading stops at the first byte after the sector that is not erased. */
			get satisfied() {
				return this.#failure !== undefined || this.#stage === "rest" && this.#restFirstUnerased !== undefined;
			}
			write(chunk) {
				let index = 0;
				for (;;) {
					while (!this.satisfied && this.#position >= this.#regionEnd) this.#advance();
					if (this.satisfied || index >= chunk.length) return;
					const length = Math.min(chunk.length - index, this.#regionEnd - this.#position);
					this.#consume(chunk.subarray(index, index + length));
					index += length;
				}
			}
			finish() {
				if (this.#failure !== undefined) return err(this.#failure);
				if (!this.satisfied && this.#position !== this.#fileSize) return err({
					kind: "format",
					message: `ESP image input ended at offset ${offsetText(this.#position)}, before the admitted size ${offsetText(this.#fileSize)}`
				});
				if (this.#stage === "header") return err({
					kind: "format",
					message: `ESP image header needs ${String(24)} bytes; the file holds ${String(this.#position)}`
				});
				return ok(deriveEspImage({
					fileSize: this.#fileSize,
					observedEnd: this.#position,
					header: this.#header,
					segments: this.#segments,
					descriptorBytes: this.#descriptor.subarray(0, this.#descriptorBytes),
					checksum: this.#checksum,
					checksumOffset: this.#checksumOffset,
					storedChecksum: this.#storedChecksum,
					imageSha256: this.#imageSha256,
					storedDigest: this.#digest,
					imageEnd: this.#imageEnd,
					sectorOffset: this.#sectorOffset,
					gapFirstUnerased: this.#gapFirstUnerased,
					sector: this.#sector,
					restFirstUnerased: this.#restFirstUnerased,
					signedContent: {
						sha256: this.#contentSha256,
						sha384: this.#contentSha384
					}
				}));
			}
			#consume(bytes) {
				const within = this.#position - this.#regionStart;
				switch (this.#stage) {
					case "header":
						this.#header.set(bytes, this.#position);
						break;
					case "segment-header":
						this.#segmentHeader.set(bytes, within);
						break;
					case "segment-data": {
						let checksum = this.#checksum;
						for (let index = 0; index < bytes.length; index += 1) checksum ^= bytes[index] ?? 0;
						this.#checksum = checksum;
						if (this.#segments.length === 1 && this.#descriptorBytes < 256) {
							const captured = bytes.subarray(0, 256 - this.#descriptorBytes);
							this.#descriptor.set(captured, this.#descriptorBytes);
							this.#descriptorBytes += captured.length;
						}
						break;
					}
					case "checksum":
						this.#storedChecksum = bytes[0];
						break;
					case "digest":
						this.#digest.set(bytes, within);
						break;
					case "gap":
						this.#gapFirstUnerased ??= firstUnerased(bytes, this.#position);
						break;
					case "sector":
						this.#sector.set(bytes, within);
						break;
					case "rest":
						this.#restFirstUnerased ??= firstUnerased(bytes, this.#position);
						break;
					case "padding": break;
				}
				if (this.#sectorOffset === undefined || this.#position < this.#sectorOffset) {
					this.#sha256.update(bytes);
					this.#sha384.update(bytes);
				}
				this.#position += bytes.length;
			}
			/** Enter the next region once the current one is complete. */
			#advance() {
				switch (this.#stage) {
					case "header": {
						const recognized = recognizeHeader(this.#header, this.#fileSize);
						if (recognized !== "esp-image") {
							this.#failure = recognized === "esp8266" ? {
								kind: "unsupported",
								message: ESP8266_REFUSAL
							} : {
								kind: "format",
								message: "ESP image header is not recognized: it needs magic 0xe9, at most 16 segments, ESP-IDF flash mode and speed codes, and a hash_appended byte of 0 or 1"
							};
							return;
						}
						this.#segmentCount = this.#header[1] ?? 0;
						this.#nextSegment();
						return;
					}
					case "segment-header": {
						const length = u32(this.#segmentHeader, 4);
						this.#segments.push({
							index: this.#segments.length,
							headerOffset: this.#regionStart,
							loadAddress: u32(this.#segmentHeader, 0),
							length
						});
						this.#enter("segment-data", length);
						return;
					}
					case "segment-data":
						this.#nextSegment();
						return;
					case "padding":
						this.#enter("checksum", 1);
						return;
					case "checksum":
						this.#imageSha256 = this.#sha256.copy().digest("hex");
						if (this.#header[23] === 1) this.#enter("digest", 32);
						else this.#endImage();
						return;
					case "digest":
						this.#endImage();
						return;
					case "gap":
						this.#contentSha256 = this.#sha256.digest("hex");
						this.#contentSha384 = this.#sha384.digest("hex");
						this.#enter("sector", ESP_FLASH_SECTOR_BYTES);
						return;
					case "sector":
						this.#enter("rest", Number.POSITIVE_INFINITY);
						return;
					case "rest": return;
				}
			}
			#enter(stage, length) {
				this.#stage = stage;
				this.#regionStart = this.#position;
				this.#regionEnd = this.#position + length;
			}
			/** Read the next declared segment, or the checksum after the last one. */
			#nextSegment() {
				if (this.#segments.length < this.#segmentCount) {
					this.#enter("segment-header", 8);
					return;
				}
				this.#checksumOffset = alignUp$1(this.#position + 1, 16) - 1;
				this.#enter("padding", this.#checksumOffset - this.#position);
			}
			#endImage() {
				this.#imageEnd = this.#position;
				this.#sectorOffset = alignUp$1(this.#position, ESP_FLASH_SECTOR_BYTES);
				this.#enter("gap", this.#sectorOffset - this.#position);
			}
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/espFlashBootloader.js
var ESP_BOOTLOADER_PROBE_BYTES, locateEspBootloader, espImageSegmentsEnd, espBootloaderProbeOffsets;
function init_espFlashBootloader() {
	return (init_espFlashBootloader = __esmMin((() => {
		init_espChips();
		init_espImage();
		init_espImageStructures();
		ESP_BOOTLOADER_PROBE_BYTES = 32;
		locateEspBootloader = (probes) => {
			const limitations = [];
			let misplacedImage;
			let esp8266 = false;
			for (const probe of probes) {
				const recognized = recognizeEspImage(probe.prefix, probe.available);
				if (recognized === "esp8266") esp8266 = true;
				if (recognized !== "esp-image") continue;
				const chipId = u16(probe.prefix, 12);
				const chip = espChipForId(chipId);
				if (chip?.romBootloaderOffset === probe.flashAddress) return {
					location: {
						flashAddress: probe.flashAddress,
						fileOffset: probe.fileOffset,
						chip
					},
					limitations: [],
					misplacedImage: undefined,
					esp8266: false
				};
				if (chip !== undefined) misplacedImage ??= {
					chip,
					fileOffset: probe.fileOffset
				};
				limitations.push(chip === undefined ? `An ESP image at flash ${offsetText(probe.flashAddress)} has chip_id 0x${chipId.toString(16).padStart(4, "0")}, which is not in the chip table; it is not read as the bootloader.` : `An ${chip.target} image is at flash ${offsetText(probe.flashAddress)}, but its ROM loads the bootloader from ${offsetText(chip.romBootloaderOffset)}; the dump may not start at flash ${offsetText(probe.flashAddress - probe.fileOffset)}.`);
			}
			return {
				location: undefined,
				limitations,
				misplacedImage,
				esp8266
			};
		};
		espImageSegmentsEnd = async (read, fileOffset, fileSize) => {
			const header = await read(fileOffset, 24);
			if (header.length < 24) return fileSize;
			let cursor = fileOffset + 24;
			for (let index = 0; index < (header[1] ?? 0); index += 1) {
				const segment = await read(cursor, 8);
				if (segment.length < 8) return fileSize;
				cursor += 8 + u32(segment, 4);
				if (cursor >= fileSize) return fileSize;
			}
			return cursor;
		};
		espBootloaderProbeOffsets = (flashOffset, fileSize) => ESP_ROM_BOOTLOADER_OFFSETS.map((flashAddress) => ({
			flashAddress,
			fileOffset: flashAddress - flashOffset
		})).filter(({ fileOffset }) => fileOffset >= 0 && fileOffset < fileSize);
	})))();
}

//#endregion
//#region dist/domain/firmware/espFlashLocation.js
var SCAN_CHUNK_BYTES, MAGIC_LOW, MAGIC_HIGH, tableAt, espFlashDumpOrigin, scanForTable, locateEspFlashLayout;
function init_espFlashLocation() {
	return (init_espFlashLocation = __esmMin((() => {
		init_result();
		init_espFlashBootloader();
		init_espImage();
		init_espImageStructures();
		init_espPartitionTable();
		SCAN_CHUNK_BYTES = 65536;
		MAGIC_LOW = 170;
		MAGIC_HIGH = 80;
		tableAt = async (read, fileOffset) => decodeEspPartitionTable(await read(fileOffset, ESP_PARTITION_TABLE_MAX_BYTES));
		espFlashDumpOrigin = async (read, fileSize, image) => {
			const flashOffset = image.chip.romBootloaderOffset - image.fileOffset;
			const tableFileOffset = ESP_PARTITION_TABLE_DEFAULT_OFFSET - flashOffset;
			if (flashOffset <= 0 || tableFileOffset < image.end || tableFileOffset >= fileSize) return undefined;
			return (await tableAt(read, tableFileOffset)).ok ? {
				flashOffset,
				tableFileOffset
			} : undefined;
		};
		scanForTable = async (read, { fileSize, origin, start }, signal) => {
			const sector = ESP_PARTITION_TABLE_SECTOR_BYTES;
			const boundary = (sector - origin % sector) % sector;
			let position = start <= boundary ? boundary : boundary + Math.ceil((start - boundary) / sector) * sector;
			let chunkStart = position;
			let bytes = new Uint8Array(0);
			for (; position < fileSize; position += sector) {
				if (position - chunkStart + 2 > bytes.length) {
					signal?.throwIfAborted();
					chunkStart = position;
					bytes = await read(position, SCAN_CHUNK_BYTES);
				}
				const at = position - chunkStart;
				if (bytes[at] !== MAGIC_LOW || bytes[at + 1] !== MAGIC_HIGH) continue;
				const decoded = await tableAt(read, position);
				if (decoded.ok && decoded.value.md5.status === "valid") return {
					address: origin + position,
					table: decoded.value
				};
			}
			return undefined;
		};
		locateEspFlashLayout = async (fileSize, read, selection, { explicit, signal }) => {
			const origin = selection.flashOffset === undefined ? {
				value: 0,
				source: "default"
			} : {
				value: selection.flashOffset,
				source: "caller"
			};
			const probes = await Promise.all(espBootloaderProbeOffsets(origin.value, fileSize).map(async ({ flashAddress, fileOffset }) => ({
				flashAddress,
				fileOffset,
				prefix: await read(fileOffset, 32),
				available: fileSize - fileOffset
			})));
			const bootloader = locateEspBootloader(probes);
			const unconfirmed = bootloader.location === undefined && bootloader.misplacedImage === undefined && origin.source === "default" ? [`No bootloader at a ROM offset confirms that the dump starts at flash ${offsetText(origin.value)}; each partition's file offset assumes it. Pass flash_offset if the dump starts elsewhere.`] : [];
			const located = (tableAddress, tableMethod, table) => ok({
				origin,
				bootloader: bootloader.location,
				tableAddress,
				tableMethod,
				table,
				limitations: [...bootloader.limitations, ...unconfirmed]
			});
			const fileOffsetOf = (address) => address - origin.value;
			if (selection.partitionTableOffset !== undefined) {
				const address = selection.partitionTableOffset;
				if (fileOffsetOf(address) < 0 || fileOffsetOf(address) >= fileSize) return err(`the partition table offset ${offsetText(address)} is outside the dump, which holds flash ${offsetText(origin.value)}-${offsetText(origin.value + fileSize)}`);
				const decoded = await tableAt(read, fileOffsetOf(address));
				return decoded.ok ? located(address, "caller", decoded.value) : err(`no partition table at the given offset ${offsetText(address)}: ${decoded.error}`);
			}
			if (bootloader.location === undefined && bootloader.esp8266) return err(ESP8266_REFUSAL);
			const misplaced = bootloader.misplacedImage;
			if (bootloader.location === undefined && misplaced !== undefined) {
				const implied = await espFlashDumpOrigin(read, fileSize, {
					...misplaced,
					end: await espImageSegmentsEnd(read, misplaced.fileOffset, fileSize)
				});
				return err(`${bootloader.limitations.join(" ")} ${implied === undefined ? "Pass the flash_offset where the dump starts, or partition_table_offset" : `A partition table at file offset ${offsetText(implied.tableFileOffset)} shows the dump was read from flash ${offsetText(implied.flashOffset)}; pass flash_offset ${offsetText(implied.flashOffset)}`}`);
			}
			const imageEnd = bootloader.location === undefined ? 0 : await espImageSegmentsEnd(read, bootloader.location.fileOffset, fileSize);
			const defaultOffset = fileOffsetOf(ESP_PARTITION_TABLE_DEFAULT_OFFSET);
			if (defaultOffset >= imageEnd && defaultOffset < fileSize) {
				const decoded = await tableAt(read, defaultOffset);
				if (decoded.ok) return located(ESP_PARTITION_TABLE_DEFAULT_OFFSET, "default", decoded.value);
			}
			if (bootloader.location === undefined && !explicit) return err([`no partition table at ${offsetText(ESP_PARTITION_TABLE_DEFAULT_OFFSET)} and no bootloader at a ROM offset`, ...bootloader.limitations].join("; "));
			const scanned = await scanForTable(read, {
				fileSize,
				origin: origin.value,
				start: imageEnd
			}, signal);
			return scanned === undefined ? err(`no partition table at ${offsetText(ESP_PARTITION_TABLE_DEFAULT_OFFSET)} or in any 0x1000-aligned flash sector${bootloader.location === undefined ? "" : " after the bootloader image"} with a verified MD5; flash encryption is one cause`) : located(scanned.address, "scan", scanned.table);
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/devicetreeHeader.js
var FDT_MAX_HEADER_BYTES, FDT_MAGIC, malformed$1, hasDevicetreeMagic, readDevicetreeHeader;
function init_devicetreeHeader() {
	return (init_devicetreeHeader = __esmMin((() => {
		init_binaryContainer();
		FDT_MAX_HEADER_BYTES = 40;
		FDT_MAGIC = 3490578157;
		malformed$1 = (detail) => {
			throw new BinaryFormatFailure("malformed", detail);
		};
		hasDevicetreeMagic = (prefix) => prefix.length >= 4 && new BinaryReader$1(prefix, false, "devicetree").u32(0) === FDT_MAGIC;
		readDevicetreeHeader = (bytes) => {
			if (bytes.length < 28) throw new BinaryFormatFailure("malformed", "Truncated FDT header");
			const reader = new BinaryReader$1(bytes, false, "devicetree");
			const magic = reader.u32(0);
			if (magic !== FDT_MAGIC) throw new BinaryFormatFailure("unsupported", "Not a flattened devicetree blob");
			const version = reader.u32(20);
			if (version !== 16 && version !== 17) throw new BinaryFormatFailure("unsupported", `FDT version ${version} is unsupported; supported versions are 16 and 17`);
			const headerBytes = version === 17 ? 40 : 36;
			if (bytes.length < headerBytes) throw new BinaryFormatFailure("malformed", "Truncated FDT header");
			const header = {
				magic,
				totalsize: reader.u32(4),
				off_dt_struct: reader.u32(8),
				off_dt_strings: reader.u32(12),
				off_mem_rsvmap: reader.u32(16),
				version,
				last_comp_version: reader.u32(24),
				boot_cpuid_phys: reader.u32(28),
				size_dt_strings: reader.u32(32),
				size_dt_struct: version === 17 ? reader.u32(36) : null
			};
			if (header.totalsize < headerBytes || header.last_comp_version > version) throw new BinaryFormatFailure("malformed", "Invalid FDT header size or compatibility version");
			const structureEnd = header.size_dt_struct === null ? Math.min(header.totalsize, ...[...header.size_dt_strings > 0 ? [header.off_dt_strings] : [], header.off_mem_rsvmap].filter((offset) => offset > header.off_dt_struct)) : header.off_dt_struct + header.size_dt_struct;
			const ranges = [{
				start: 0,
				end: headerBytes
			}];
			const range = (start, size) => {
				if (size < 0 || size > 0 && start < headerBytes || start > header.totalsize - size) malformed$1("FDT block outside totalsize");
				if (size === 0) return;
				const r = {
					start,
					end: start + size
				};
				if (ranges.some((other) => r.start < other.end && other.start < r.end)) malformed$1("Overlapping FDT blocks");
				ranges.push(r);
			};
			if (header.off_dt_struct % 4 || header.off_mem_rsvmap % 8) malformed$1("Misaligned FDT block");
			range(header.off_dt_strings, header.size_dt_strings);
			range(header.off_dt_struct, structureEnd - header.off_dt_struct);
			const reservationEnd = Math.min(header.totalsize, ...[header.off_dt_struct, ...header.size_dt_strings > 0 ? [header.off_dt_strings] : []].filter((n) => n >= header.off_mem_rsvmap));
			if (ranges.some((r) => header.off_mem_rsvmap >= r.start && header.off_mem_rsvmap < r.end)) malformed$1("Reservation block overlaps another FDT block");
			if (header.off_mem_rsvmap > reservationEnd - 16) malformed$1("Unterminated or overlapping FDT reservation block");
			return {
				header,
				structureEnd,
				reservationEnd
			};
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/addressRuns.js
var runEnd, mergeArenaRuns, mergeRange;
function init_addressRuns() {
	return (init_addressRuns = __esmMin((() => {
		init_result();
		runEnd = (run) => run === undefined ? 0 : run.address + run.length;
		mergeArenaRuns = (runs, arena, space = () => 0) => {
			const ordered = [...runs].sort((left, right) => space(left) - space(right) || left.address - right.address);
			const ranges = [];
			let duplicateBytes = 0;
			let first = 0;
			while (first < ordered.length) {
				const head = ordered[first];
				if (head === undefined) break;
				let next = first + 1;
				let end = runEnd(head);
				while (next < ordered.length) {
					const candidate = ordered[next];
					if (candidate === undefined || space(candidate) !== space(head) || candidate.address > end) break;
					end = Math.max(end, runEnd(candidate));
					next += 1;
				}
				const range = mergeRange(ordered.slice(first, next), end, arena);
				if (!range.ok) return range;
				ranges.push(range.value.range);
				duplicateBytes += range.value.duplicateBytes;
				first = next;
			}
			return ok({
				ranges,
				duplicateBytes
			});
		};
		mergeRange = (group, end, arena) => {
			const start = group[0]?.address ?? 0;
			const bytes = new Uint8Array(end - start);
			let written = start;
			let duplicateBytes = 0;
			for (const run of group) {
				const overlapEnd = Math.min(written, runEnd(run));
				for (let address = run.address; address < overlapEnd; address += 1) {
					const existing = bytes[address - start] ?? 0;
					const incoming = arena[run.offset + address - run.address] ?? 0;
					if (existing !== incoming) return err({
						address,
						writer: group.find((candidate) => candidate !== run && candidate.address <= address && address < runEnd(candidate)) ?? run,
						run,
						existing,
						incoming
					});
				}
				duplicateBytes += Math.max(overlapEnd - run.address, 0);
				if (runEnd(run) > written) {
					bytes.set(arena.subarray(run.offset + written - run.address, run.offset + run.length), written - start);
					written = runEnd(run);
				}
			}
			return ok({
				range: {
					start,
					bytes,
					runs: group
				},
				duplicateBytes
			});
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/hexRecordSyntax.js
var INTEL_HEX_MAX_LINE_CHARS, SREC_MAX_LINE_CHARS, LF, CR, COLON, LETTER_S, INTEL_FIXED_DATA_BYTES, SREC_ADDRESS_BYTES, SREC_DATA_LIMITS, SREC_WIDTH_OF, HEX_VALUES, hex, readBigEndian, maxLineChars, trimTrailingBlanks, decodeHexDigits, byteSum, startCharacterFailure, parseIntelRecord, parseSrecRecord, parseRecord;
function init_hexRecordSyntax() {
	return (init_hexRecordSyntax = __esmMin((() => {
		init_result();
		INTEL_HEX_MAX_LINE_CHARS = 521;
		SREC_MAX_LINE_CHARS = 514;
		LF = 10;
		CR = 13;
		COLON = 58;
		LETTER_S = 83;
		INTEL_FIXED_DATA_BYTES = [
			undefined,
			0,
			2,
			4,
			2,
			4
		];
		SREC_ADDRESS_BYTES = [
			2,
			2,
			3,
			4,
			undefined,
			2,
			3,
			4,
			3,
			2
		];
		SREC_DATA_LIMITS = {
			S1: 65535,
			S2: 16777215,
			S3: 4294967295
		};
		SREC_WIDTH_OF = {
			S1: "S19",
			S2: "S28",
			S3: "S37",
			S9: "S19",
			S8: "S28",
			S7: "S37"
		};
		HEX_VALUES = (() => {
			const table = new Int8Array(256).fill(-1);
			for (const [value, digit] of [..."0123456789abcdef"].entries()) {
				table[digit.charCodeAt(0)] = value;
				table[digit.toUpperCase().charCodeAt(0)] = value;
			}
			return table;
		})();
		hex = (value, digits) => value.toString(16).padStart(digits, "0");
		readBigEndian = (bytes) => bytes.reduce((value, byte) => value * 256 + byte, 0);
		maxLineChars = (encoding) => encoding === "intel-hex" ? INTEL_HEX_MAX_LINE_CHARS : SREC_MAX_LINE_CHARS;
		trimTrailingBlanks = (line, length) => {
			let end = length;
			while (end > 0 && (line[end - 1] === 32 || line[end - 1] === 9)) end -= 1;
			return end;
		};
		decodeHexDigits = (line, from) => {
			for (let column = from; column < line.length; column += 1) if (HEX_VALUES[line[column] ?? 0] === -1) return err(`invalid character 0x${hex(line[column] ?? 0, 2)} at column ${String(column + 1)}`);
			if ((line.length - from) % 2 !== 0) return err(`odd number of hex digits (${String(line.length - from)})`);
			const bytes = new Uint8Array((line.length - from) / 2);
			for (let index = 0; index < bytes.length; index += 1) bytes[index] = (HEX_VALUES[line[from + index * 2] ?? 0] ?? 0) * 16 + (HEX_VALUES[line[from + index * 2 + 1] ?? 0] ?? 0);
			return ok(bytes);
		};
		byteSum = (bytes) => bytes.reduce((sum, byte) => sum + byte, 0);
		startCharacterFailure = (line, expected) => `invalid character 0x${hex(line[0] ?? 0, 2)} at column 1; a record starts with '${expected}'`;
		parseIntelRecord = (line) => {
			if (line[0] !== 58) return err(startCharacterFailure(line, ":"));
			const decoded = decodeHexDigits(line, 1);
			if (!decoded.ok) return decoded;
			const bytes = decoded.value;
			if (bytes.length < 5) return err(`record holds ${String(bytes.length)} bytes; count, address, type and checksum need 5`);
			const count = bytes[0] ?? 0;
			const typeCode = bytes[3] ?? 0;
			const type = hex(typeCode, 2);
			if (bytes.length !== count + 5) return err(`record type ${type} byte count 0x${hex(count, 2)} declares ${String(count)} data bytes, but the line holds ${String(bytes.length - 5)}`);
			const declared = bytes[bytes.length - 1] ?? 0;
			const computed = -byteSum(bytes.subarray(0, -1)) & 255;
			if (declared !== computed) return err(`record type ${type} checksum 0x${hex(declared, 2)} does not match computed 0x${hex(computed, 2)}`);
			if (typeCode > 5) return err(`unknown record type ${type}`);
			const fixed = INTEL_FIXED_DATA_BYTES[typeCode];
			if (fixed !== undefined && count !== fixed) return err(`record type ${type} requires ${String(fixed)} data bytes, found ${String(count)}`);
			const address = readBigEndian(bytes.subarray(1, 3));
			if (typeCode >= 2 && address !== 0) return err(`record type ${type} requires address 0x0000, found 0x${hex(address, 4)}`);
			return ok({
				type,
				address,
				data: bytes.subarray(4, 4 + count)
			});
		};
		parseSrecRecord = (line) => {
			if (line[0] !== 83) return err(startCharacterFailure(line, "S"));
			if (line.length < 2) return err("record has no type character");
			const digit = (line[1] ?? 0) - 48;
			if (digit < 0 || digit > 9) return err(`invalid record type character 0x${hex(line[1] ?? 0, 2)} at column 2`);
			const type = `S${String(digit)}`;
			const decoded = decodeHexDigits(line, 2);
			if (!decoded.ok) return decoded;
			const bytes = decoded.value;
			const count = bytes[0] ?? 0;
			if (bytes.length === 0 || bytes.length !== count + 1) return err(`record type ${type} byte count 0x${hex(count, 2)} declares ${String(count)} bytes after the count, but the line holds ${String(Math.max(bytes.length - 1, 0))}`);
			const declared = bytes[bytes.length - 1] ?? 0;
			const computed = ~byteSum(bytes.subarray(0, -1)) & 255;
			if (declared !== computed) return err(`record type ${type} checksum 0x${hex(declared, 2)} does not match computed 0x${hex(computed, 2)}`);
			const addressBytes = SREC_ADDRESS_BYTES[digit];
			if (addressBytes === undefined) return err(`reserved record type ${type}`);
			if (count < addressBytes + 1 || digit >= 5 && count !== addressBytes + 1) return err(`record type ${type} byte count 0x${hex(count, 2)} does not fit its ${String(addressBytes)}-byte address and checksum`);
			return ok({
				type,
				address: readBigEndian(bytes.subarray(1, 1 + addressBytes)),
				data: bytes.subarray(1 + addressBytes, -1)
			});
		};
		parseRecord = (encoding, line) => encoding === "intel-hex" ? parseIntelRecord(line) : parseSrecRecord(line);
	})))();
}

//#endregion
//#region dist/domain/firmware/hexRecords.js
var HEX_RECORD_MAX_FILE_BYTES, HEX_RECORD_MAX_RUNS, HEX_RECORD_ENCODING_LABELS, detectHexRecordEncoding, createHexRecordDecoder, formatFailure, StreamingHexRecordDecoder, startRecord, lineSpan, mergeRuns$1, conflict$1;
function init_hexRecords() {
	return (init_hexRecords = __esmMin((() => {
		init_result();
		init_addressRuns();
		init_hexRecordSyntax();
		HEX_RECORD_MAX_FILE_BYTES = 128 * 1024 * 1024;
		HEX_RECORD_MAX_RUNS = 65536;
		HEX_RECORD_ENCODING_LABELS = {
			"intel-hex": "Intel HEX",
			srec: "S-record"
		};
		detectHexRecordEncoding = (prefix) => {
			const encoding = prefix[0] === 58 ? "intel-hex" : prefix[0] === 83 ? "srec" : null;
			if (encoding === null) return undefined;
			const max = maxLineChars(encoding);
			const window = prefix.subarray(0, max + 2);
			const lf = window.indexOf(10);
			let length = lf < 0 ? window.length : lf;
			if (lf >= 0 && window[length - 1] === 13) length -= 1;
			if (length > max) return undefined;
			const line = window.subarray(0, trimTrailingBlanks(window, length));
			return parseRecord(encoding, line).ok ? encoding : undefined;
		};
		createHexRecordDecoder = (encoding, fileBytes) => Number.isSafeInteger(fileBytes) && fileBytes >= 0 && fileBytes <= 134217728 ? ok(new StreamingHexRecordDecoder(encoding, fileBytes)) : err({
			kind: "limit",
			boundary: "file-size",
			message: `file is ${String(fileBytes)} bytes, exceeding the fixed ${String(HEX_RECORD_MAX_FILE_BYTES)}-byte (128 MiB) ceiling`
		});
		formatFailure = (line, detail) => ({
			kind: "format",
			message: `line ${String(line)}: ${detail}`
		});
		StreamingHexRecordDecoder = class {
			#encoding;
			#line;
			#runs = [];
			#arena;
			#arenaWriteOffset = 0;
			#lineLength = 0;
			#lineNumber = 0;
			#recordCount = 0;
			#dataRecordCount = 0;
			#termination;
			#base = 0;
			#baseFromSegment = false;
			#segmentRecords = false;
			#linearRecords = false;
			#start;
			#startSegment;
			#header;
			#declaredCount = null;
			#dataTypes = new Set();
			constructor(encoding, fileBytes) {
				this.#encoding = encoding;
				this.#line = new Uint8Array(maxLineChars(encoding) + 1);
				this.#arena = new Uint8Array(Math.floor(fileBytes / 2));
			}
			write(chunk) {
				let from = 0;
				while (from < chunk.length) {
					const lf = chunk.indexOf(10, from);
					const piece = chunk.subarray(from, lf < 0 ? chunk.length : lf);
					if (this.#lineLength + piece.length > this.#line.length) return err(this.#overlong(this.#lineNumber + 1));
					this.#line.set(piece, this.#lineLength);
					this.#lineLength += piece.length;
					if (lf < 0) break;
					const ended = this.#endLine(true);
					if (!ended.ok) return ended;
					from = lf + 1;
				}
				return ok(undefined);
			}
			finish() {
				if (this.#lineLength > 0) {
					const ended = this.#endLine(false);
					if (!ended.ok) return ended;
				}
				const merged = mergeRuns$1(this.#runs, this.#arena);
				this.#arena = new Uint8Array(0);
				if (!merged.ok) return merged;
				const { regions, duplicateBytes } = merged.value;
				return ok({
					metadata: this.#metadata(regions, duplicateBytes),
					regions,
					terminated: this.#termination !== undefined,
					limitations: this.#limitations()
				});
			}
			#overlong(line) {
				return formatFailure(line, `line exceeds the ${String(maxLineChars(this.#encoding))}-character ${HEX_RECORD_ENCODING_LABELS[this.#encoding]} maximum`);
			}
			#endLine(lfTerminated) {
				this.#lineNumber += 1;
				let length = this.#lineLength;
				this.#lineLength = 0;
				if (lfTerminated && this.#line[length - 1] === 13) length -= 1;
				if (length > maxLineChars(this.#encoding)) return err(this.#overlong(this.#lineNumber));
				length = trimTrailingBlanks(this.#line, length);
				if (length === 0) return ok(undefined);
				const parsed = parseRecord(this.#encoding, this.#line.subarray(0, length));
				if (!parsed.ok) return err(this.#failure(parsed.error));
				if (this.#termination !== undefined) return err(this.#failure(`record follows the termination record at line ${String(this.#termination.line)}`));
				this.#recordCount += 1;
				return this.#encoding === "intel-hex" ? this.#applyIntel(parsed.value) : this.#applySrec(parsed.value);
			}
			#failure(detail) {
				return formatFailure(this.#lineNumber, detail);
			}
			#applyIntel(record) {
				const value = readBigEndian(record.data);
				switch (record.type) {
					case "00": return this.#intelData(record);
					case "01":
						this.#termination = {
							value: record.type,
							line: this.#lineNumber
						};
						return ok(undefined);
					case "02":
					case "04":
						this.#segmentRecords ||= record.type === "02";
						this.#linearRecords ||= record.type === "04";
						this.#baseFromSegment = record.type === "02";
						this.#base = record.type === "02" ? value * 16 : value * 65536;
						return ok(undefined);
					case "03": return this.#declareStartSegment([value >>> 16, value & 65535]);
					default:
						this.#linearRecords = true;
						return this.#declareStart(value, record.type);
				}
			}
			#intelData({ address, data }) {
				this.#dataRecordCount += 1;
				if (address + data.length > 65536) return err(this.#failure(`data at offset 0x${hex(address, 4)} with ${String(data.length)} bytes wraps past 0xffff; producers disagree on the wrapped address`));
				const start = this.#base + address;
				if (this.#baseFromSegment && start + data.length - 1 > 1048575) return err(this.#failure(`I16HEX data at 0x${hex(start, 8)} with ${String(data.length)} bytes exceeds the 20-bit address 0xfffff`));
				return this.#addData(start, data);
			}
			#applySrec(record) {
				switch (record.type) {
					case "S0":
						if (this.#header !== undefined) return err(this.#failure(`second S0 header record; the first is at line ${String(this.#header.line)}`));
						this.#header = {
							value: record.data.slice(),
							line: this.#lineNumber
						};
						return ok(undefined);
					case "S1":
					case "S2":
					case "S3": return this.#srecData(record);
					case "S5":
					case "S6":
						if (record.address !== this.#dataRecordCount) return err(this.#failure(`record type ${record.type} declares ${String(record.address)} data records, but ${String(this.#dataRecordCount)} precede it`));
						this.#declaredCount = record.address;
						return ok(undefined);
					default:
						this.#termination = {
							value: record.type,
							line: this.#lineNumber
						};
						return this.#declareStart(record.address, record.type);
				}
			}
			#srecData({ type, address, data }) {
				this.#dataRecordCount += 1;
				this.#dataTypes.add(type);
				const limit = SREC_DATA_LIMITS[type] ?? 0;
				if (address + data.length - 1 > limit) return err(this.#failure(`record type ${type} data at 0x${hex(address, 8)} with ${String(data.length)} bytes crosses 0x${hex(limit, 2)}`));
				return this.#addData(address, data);
			}
			#declareStart(value, record) {
				const existing = this.#start;
				if (existing !== undefined && existing.value !== value) return err(this.#failure(`start address 0x${hex(value, 8)} conflicts with 0x${hex(existing.value, 8)} declared at line ${String(existing.line)}`));
				this.#start ??= {
					value,
					line: this.#lineNumber,
					record
				};
				return ok(undefined);
			}
			#declareStartSegment(value) {
				this.#segmentRecords = true;
				const existing = this.#startSegment;
				if (existing !== undefined && (existing.value[0] !== value[0] || existing.value[1] !== value[1])) return err(this.#failure(`start segment 0x${hex(value[0], 4)}:0x${hex(value[1], 4)} conflicts with 0x${hex(existing.value[0], 4)}:0x${hex(existing.value[1], 4)} declared at line ${String(existing.line)}`));
				this.#startSegment ??= {
					value,
					line: this.#lineNumber
				};
				return ok(undefined);
			}
			#addData(address, data) {
				if (data.length === 0) return ok(undefined);
				if (this.#arenaWriteOffset + data.length > this.#arena.length) return err({
					kind: "limit",
					boundary: "file-size",
					message: `line ${String(this.#lineNumber)}: decoded bytes exceed half of the admitted file size`
				});
				const run = this.#runs.at(-1);
				if (run !== undefined && run.address + run.length === address) {
					run.length += data.length;
					run.recordCount += 1;
					run.lastLine = this.#lineNumber;
				} else {
					if (this.#runs.length >= 65536) return err({
						kind: "limit",
						boundary: "capacity",
						message: `line ${String(this.#lineNumber)}: data starts more than ${String(HEX_RECORD_MAX_RUNS)} address-discontiguous record runs`
					});
					this.#runs.push({
						address,
						offset: this.#arenaWriteOffset,
						length: data.length,
						recordCount: 1,
						firstLine: this.#lineNumber,
						lastLine: this.#lineNumber
					});
				}
				this.#arena.set(data, this.#arenaWriteOffset);
				this.#arenaWriteOffset += data.length;
				return ok(undefined);
			}
			#variant() {
				if (this.#encoding === "intel-hex") {
					if (this.#segmentRecords && this.#linearRecords) return "mixed";
					if (this.#linearRecords) return "I32HEX";
					return this.#segmentRecords ? "I16HEX" : "I8HEX";
				}
				const widths = new Set([...this.#dataTypes].map((type) => SREC_WIDTH_OF[type]));
				if (widths.size > 1) return "mixed";
				const width = [...widths][0] ?? (this.#termination === undefined ? undefined : SREC_WIDTH_OF[this.#termination.value]);
				return width === "S19" || width === "S28" || width === "S37" ? width : null;
			}
			#limitations() {
				const label = HEX_RECORD_ENCODING_LABELS[this.#encoding];
				if (this.#termination === undefined) return [`${label} has no termination record; the file may be truncated.`];
				const termination = this.#termination.value;
				const mismatched = [...this.#dataTypes].filter((type) => SREC_WIDTH_OF[type] !== SREC_WIDTH_OF[termination]);
				return this.#encoding === "srec" && mismatched.length > 0 ? [`S-record termination ${termination} does not match the address width of ${mismatched.sort().join(", ")} data records.`] : [];
			}
			#metadata(regions, duplicateBytes) {
				const header = this.#header?.value;
				const declaredStart = this.#start;
				return {
					kind: "hex-records",
					encoding: this.#encoding,
					variant: this.#variant(),
					line_count: this.#lineNumber,
					record_count: this.#recordCount,
					data_record_count: this.#dataRecordCount,
					data_bytes: regions.reduce((sum, region) => sum + region.bytes.length, 0),
					duplicate_bytes: duplicateBytes,
					region_count: regions.length,
					lowest_address: regions[0]?.start ?? null,
					highest_address: regions.at(-1)?.end ?? null,
					termination: this.#termination === undefined ? "absent" : "present",
					start_address: declaredStart?.value ?? null,
					start_address_record: startRecord(declaredStart?.record),
					start_segment_cs: this.#startSegment?.value[0] ?? null,
					start_segment_ip: this.#startSegment?.value[1] ?? null,
					header_hex: header === undefined ? null : [...header].map((byte) => hex(byte, 2)).join(""),
					header_text: header?.every((byte) => byte >= 32 && byte <= 126) === true ? String.fromCharCode(...header) : null,
					declared_data_record_count: this.#declaredCount
				};
			}
		};
		startRecord = (record) => record === "05" || record === "S7" || record === "S8" || record === "S9" ? record : null;
		lineSpan = (run) => run.firstLine === run.lastLine ? `line ${String(run.firstLine)}` : `lines ${String(run.firstLine)}-${String(run.lastLine)}`;
		mergeRuns$1 = (runs, arena) => {
			const merged = mergeArenaRuns(runs, arena);
			if (!merged.ok) return err(conflict$1(merged.error));
			return ok({
				regions: merged.value.ranges.map(({ start, bytes, runs: group }) => ({
					start,
					end: start + bytes.length - 1,
					bytes,
					recordCount: group.reduce((sum, run) => sum + run.recordCount, 0),
					firstLine: group.reduce((line, run) => Math.min(line, run.firstLine), Number.MAX_SAFE_INTEGER),
					lastLine: group.reduce((line, run) => Math.max(line, run.lastLine), 0)
				})),
				duplicateBytes: merged.value.duplicateBytes
			});
		};
		conflict$1 = ({ address, writer, run, existing, incoming }) => ({
			kind: "format",
			message: `address 0x${hex(address, 8)} written with different values at ${lineSpan(writer)} (0x${hex(existing, 2)}) and ${lineSpan(run)} (0x${hex(incoming, 2)})`
		});
	})))();
}

//#endregion
//#region dist/domain/binaryTarget.js
/** A CodeView declaration remains observable even when its payload has no usable file range. */
function* peCodeViewDirectoryEntries(directory, sectionTable, numberOfSections, sizeOfHeaders) {
	const reader = new BinaryReader$1(directory, true, "pe");
	for (let offset = 0; offset + 28 <= directory.length; offset += 28) {
		if (reader.u32(offset + 12) !== 2) continue;
		const declaredSize = reader.u32(offset + 16);
		if (declaredSize < 16) {
			yield {
				fileOffset: undefined,
				declaredSize
			};
			continue;
		}
		const rawPointer = reader.u32(offset + 24);
		const fileOffset = rawPointer !== 0 ? rawPointer : peRvaToFileOffset(reader.u32(offset + 20), sectionTable, numberOfSections, sizeOfHeaders, Math.min(declaredSize, PE_CODEVIEW_PREFIX_BYTES));
		yield {
			fileOffset,
			declaredSize
		};
	}
}
var PE_RECORD_HEADER_BYTES, MAX_PE_OPTIONAL_HEADER_BYTES, claimsExecutableHeader, parseExecutableHeader, readNativeHeaderFormat, walkMachoCommandFraming, CPU_TYPE_ARM64_32, parseThinMachO, validatedFatDeclarations, declaredFamilies, readFatArchitectureFamilies, parseFatMachO, selectHostFatSlice, fatSliceIdentityError, fatHostArchitecture, fatIdentityError, parseElf, parseMzExecutableMetadata, parsePeRecordStructure, parsePeRecordFacts, parseCodeViewData, decodeCodeViewPath, peDebugDirectoryEntry, peRvaToFileOffset, parsePeCodeViewFromBuffer, inspectPeCodeViewFromBuffer, machoBinaryArchitecture, machArchitecture;
function init_binaryTarget() {
	return (init_binaryTarget = __esmMin((() => {
		init_binaryContainer();
		init_virtualFileMapping();
		init_binaryTargetTypes();
		init_result();
		init_peOptionalHeader();
		init_peCoffHeader();
		init_peSectionHeader();
		init_strictUtf8();
		init_elfFixedHeader();
		init_dosMz();
		init_peMachine();
		init_machoContainer();
		init_machoCpuIdentity();
		init_machoLoadCommands();
		PE_RECORD_HEADER_BYTES = 24;
		MAX_PE_OPTIONAL_HEADER_BYTES = 4096;
		claimsExecutableHeader = (bytes, fileSize = bytes.length) => bytes.length >= 4 && (bytes.subarray(0, 4).equals(Buffer.from([
			127,
			69,
			76,
			70
		])) || readMachoHeaderPrefixFacts(bytes).format !== null) || bytes.length >= 2 && bytes[0] === 77 && bytes[1] === 90 || readFatContainerHeader(bytes, fileSize).state !== "not-fat";
		parseExecutableHeader = (bytes, hostArchitecture, fileSize = bytes.length, mzWindowsHeaderSignature, fatEvidence) => {
			if (bytes.length >= 4 && bytes.subarray(0, 4).equals(Buffer.from([
				127,
				69,
				76,
				70
			]))) return parseElf(bytes, fileSize);
			if (bytes.length >= 2 && bytes[0] === 77 && bytes[1] === 90) return parseMzExecutableMetadata(bytes, parseMzHeaderEvidence(bytes, fileSize, mzWindowsHeaderSignature));
			if (bytes.length < 8) return err("truncated or unsupported binary header");
			if (readMachoHeaderPrefixFacts(bytes).format !== null) return parseThinMachO(bytes, fileSize);
			const fatHeader = fatEvidence?.header ?? readFatContainerHeader(bytes, fileSize);
			if (fatHeader.state !== "not-fat") return parseFatMachO(bytes, hostArchitecture, fatHeader, fatEvidence);
			return err("unsupported binary format");
		};
		readNativeHeaderFormat = (bytes, fileSize = bytes.length) => {
			if (bytes.length >= 4 && bytes.subarray(0, 4).equals(Buffer.from([
				127,
				69,
				76,
				70
			]))) {
				const header = readElfFixedHeader(bytes, fileSize);
				return header.ok ? ok("elf") : header;
			}
			if (readMachoHeaderPrefixFacts(bytes).format === null) return ok(null);
			const table = readMachoLoadCommandTableHeader(bytes, fileSize);
			if (!table.ok) return table;
			if (table.value === null) return err("unsupported Mach-O header");
			const framing = walkMachoCommandFraming(bytes, table.value);
			return framing.ok ? ok("mach-o") : framing;
		};
		walkMachoCommandFraming = (bytes, table) => {
			const commands = new MachoLoadCommandCursor(table);
			while (commands.nextOffset !== null) {
				const offset = table.headerSize + commands.nextOffset;
				if (offset + 8 > bytes.length && commands.nextOffset + 8 <= table.commandBytes) return ok(null);
				const frame = commands.read(bytes.subarray(offset, offset + 8));
				if (!frame.ok) return frame;
			}
			return commands.finish();
		};
		CPU_TYPE_ARM64_32 = 33554444;
		parseThinMachO = (bytes, fileSize) => {
			const table = readMachoLoadCommandTableHeader(bytes, fileSize);
			if (!table.ok) return table;
			if (table.value === null) return err("unsupported binary format");
			const { identity } = table.value;
			const architecture = machoBinaryArchitecture(identity.cpuType);
			if (architecture === undefined) return err("unsupported Mach-O architecture");
			const framing = walkMachoCommandFraming(bytes, table.value);
			if (!framing.ok) return framing;
			if (architecture === "arm64_32") return ok({
				format: "mach-o",
				architecture,
				availableArchitectures: [architecture]
			});
			return ok({
				format: "mach-o",
				architecture,
				availableArchitectures: [architecture]
			});
		};
		validatedFatDeclarations = (bytes, header, fatEvidence) => {
			if (header.state === "needs-data") return err("truncated or invalid FAT architecture table");
			if (header.state === "malformed") return err(header.reason);
			const identityError = fatIdentityError(bytes, header, fatEvidence?.sliceHeadersByOffset);
			if (identityError !== null) return err(identityError);
			const sliceIdentityError = fatSliceIdentityError(bytes, header, fatEvidence?.sliceHeadersByOffset);
			if (sliceIdentityError !== null) return err(sliceIdentityError);
			return ok(header.slices.flatMap((declaration) => {
				const architecture = machArchitecture(declaration.cpuType);
				return architecture === undefined ? [] : [{
					architecture,
					offset: declaration.offset,
					size: declaration.size,
					cpuType: declaration.cpuType,
					cpuSubtype: declaration.cpuSubtype
				}];
			}));
		};
		declaredFamilies = (declarations) => [...new Set(declarations.map(({ architecture }) => architecture))];
		readFatArchitectureFamilies = (bytes, fileSize = bytes.length) => {
			const header = readFatContainerHeader(bytes, fileSize);
			if (header.state === "not-fat") return null;
			const declarations = validatedFatDeclarations(bytes, header);
			return declarations.ok ? ok(declaredFamilies(declarations.value)) : declarations;
		};
		parseFatMachO = (bytes, host, header, fatEvidence) => {
			const validated = validatedFatDeclarations(bytes, header, fatEvidence);
			if (!validated.ok) return validated;
			const declarations = validated.value;
			const preferred = fatHostArchitecture(host);
			const hostChoice = selectHostFatSlice(declarations, preferred);
			if (hostChoice?.ambiguous === true) return err(`FAT binary declares several ${preferred} slices; no slice was selected`);
			const hostSlice = hostChoice?.slice;
			const unambiguous = declarations.filter(({ architecture }) => declarations.filter((other) => other.architecture === architecture).length === 1);
			const candidates = hostSlice === undefined ? unambiguous : [hostSlice];
			const selected = candidates.find(({ architecture, size }) => size >= (architecture === "arm64" || architecture === "x86_64" ? 32 : 28));
			if (selected === undefined) {
				const first = candidates[0];
				if (first !== undefined) return err(`FAT slice for ${first.architecture} is shorter than its Mach-O header`);
				return err(declarations.length === 0 ? "FAT binary declares no supported Mach-O architecture" : `FAT binary has no ${host} slice and no foreign architecture declared exactly once`);
			}
			return ok({
				format: "mach-o-universal",
				architecture: selected.architecture,
				availableArchitectures: declaredFamilies(declarations),
				universalSlice: {
					offset: selected.offset,
					size: selected.size
				},
				universalSlices: header.state === "parsed" ? header.slices.map(({ offset, size, cpuType, cpuSubtype }) => ({
					offset,
					size,
					cpuType,
					cpuSubtype
				})) : []
			});
		};
		selectHostFatSlice = (declarations, preferred) => {
			if (preferred === undefined) return undefined;
			const hostSlices = declarations.filter(({ architecture }) => architecture === preferred);
			const only = hostSlices[0];
			if (hostSlices.length === 0 || only === undefined) return undefined;
			if (hostSlices.length === 1) return {
				slice: only,
				ambiguous: false
			};
			let bestRank = Number.POSITIVE_INFINITY;
			const winners = [];
			for (const slice of hostSlices) {
				const rank = machoHostSubtypeRank(slice.cpuType, slice.cpuSubtype);
				if (rank < bestRank) {
					bestRank = rank;
					winners.length = 0;
					winners.push(slice);
				} else if (rank === bestRank) winners.push(slice);
			}
			const first = winners[0];
			if (first === undefined) return { ambiguous: true };
			if (winners.length === 1) return {
				slice: first,
				ambiguous: false
			};
			const base = machoCpuSubtypeBase(first.cpuSubtype);
			if (winners.some((slice) => machoCpuSubtypeBase(slice.cpuSubtype) !== base)) return { ambiguous: true };
			const subtypes = new Set();
			for (const slice of winners) {
				if (subtypes.has(slice.cpuSubtype)) return { ambiguous: true };
				subtypes.add(slice.cpuSubtype);
			}
			if (subtypes.size < 2) return { ambiguous: true };
			return {
				slice: first,
				ambiguous: false
			};
		};
		fatSliceIdentityError = (bytes, header, sliceHeadersByOffset) => {
			for (let index = 0; index < header.slices.length; index += 1) {
				const declaration = header.slices[index];
				if (declaration === undefined || header.rangeIssues[index] !== null) continue;
				let facts;
				if (sliceHeadersByOffset?.has(declaration.offset)) {
					facts = sliceHeadersByOffset.get(declaration.offset);
				} else if (declaration.size >= 12 && declaration.offset <= bytes.length - 12) {
					facts = readMachoHeaderPrefixFacts(bytes.subarray(declaration.offset, declaration.offset + 12));
				}
				const identity = facts?.identity;
				if (identity === null || identity === undefined) return `FAT architecture ${declaration.index} thin Mach-O CPU identity is outside the bounded header`;
				const identityError = validateFatSliceIdentity(declaration, identity);
				if (identityError !== null) return identityError;
			}
			return null;
		};
		fatHostArchitecture = (host) => {
			switch (host) {
				case "arm64": return "arm64";
				case "x64": return "x86_64";
				case "ia32": return "x86";
				case "arm": return "arm";
				default: return undefined;
			}
		};
		fatIdentityError = (bytes, header, sliceHeadersByOffset) => {
			const identity = classifyFatContainerEvidence(header, bytes, sliceHeadersByOffset);
			if (identity.state === "needs-slice-header") return "FAT slice identity is outside the bounded prefix";
			if (identity.state === "not-mach-o") return "unsupported binary format";
			if (identity.state === "malformed") return identity.reason;
			return null;
		};
		parseElf = (bytes, fileSize) => {
			const fixedHeader = readElfFixedHeader(bytes, fileSize);
			if (!fixedHeader.ok) return fixedHeader;
			const { elfClass, byteOrder, architecture, machine, type, flags } = fixedHeader.value;
			if (architecture === null) return err(`unsupported ELF architecture: e_machine ${String(machine)}`);
			if (architecture === "mips" || architecture === "riscv" || architecture === "powerpc") {
				const metadata = {
					elfClass,
					byteOrder,
					type,
					flags
				};
				if (architecture === "powerpc") return ok({
					format: "elf",
					architecture,
					availableArchitectures: [architecture],
					powerpc: metadata
				});
				return architecture === "mips" ? ok({
					format: "elf",
					architecture,
					availableArchitectures: [architecture],
					mips: metadata
				}) : ok({
					format: "elf",
					architecture,
					availableArchitectures: [architecture],
					riscv: metadata
				});
			}
			if (architecture === "hexagon") return ok({
				format: "elf",
				architecture,
				availableArchitectures: [architecture]
			});
			if (architecture === "xtensa") return ok({
				format: "elf",
				architecture,
				availableArchitectures: [architecture]
			});
			return ok({
				format: "elf",
				architecture,
				availableArchitectures: [architecture]
			});
		};
		parseMzExecutableMetadata = (bytes, evidence) => {
			const { windowsHeader } = evidence;
			if (windowsHeader.state === "header-needed" || windowsHeader.state === "signature-needed") return err("Windows new-header pointer or signature is outside the bounded prefix");
			if (windowsHeader.state === "candidate") return err("MZ Windows new-header candidate is unresolved");
			if (windowsHeader.state === "declared") {
				const { offset } = windowsHeader;
				const limitation = mzWindowsHeaderLayoutLimitation(windowsHeader);
				if (limitation !== undefined) return err(limitation);
				if (offset > bytes.length - 24) return err("invalid or truncated Windows executable header in MZ image");
				if ([
					"NE",
					"LE",
					"LX"
				].includes(windowsHeader.signature)) return err(`unsupported ${windowsHeader.signature} executable in MZ image`);
				if (windowsHeader.signature !== "PE") return err("invalid or truncated Windows executable header in MZ image");
				const codeView = parsePeCodeViewFromBuffer(bytes, offset);
				const parsed = parsePeRecordFacts(bytes.subarray(offset), codeView);
				return parsed.ok ? ok(parsed.value.metadata) : parsed;
			}
			const parsed = evidence.dos;
			return parsed.ok ? ok({
				format: "dos-mz",
				architecture: "x86",
				availableArchitectures: ["x86"]
			}) : parsed;
		};
		parsePeRecordStructure = (record) => {
			if (record.length < 24) return err({
				kind: "incomplete",
				requiredBytes: 24,
				message: "invalid or truncated PE header"
			});
			if (record.toString("binary", 0, 4) !== "PE\0\0") return err({
				kind: "malformed",
				message: "invalid or truncated PE header"
			});
			const coff = readPeCoffHeader(record.subarray(4, 24));
			if (!coff.ok) return err({
				kind: "malformed",
				message: "invalid or truncated PE header"
			});
			const { machine, optionalHeaderSize, characteristics } = coff.value;
			if (optionalHeaderSize > 4096) return err({
				kind: "malformed",
				message: "invalid or truncated PE optional header"
			});
			const declaredEnd = 24 + optionalHeaderSize;
			if (record.length < declaredEnd) return err({
				kind: "incomplete",
				requiredBytes: declaredEnd,
				message: "invalid or truncated PE optional header"
			});
			const optionalHeader = record.subarray(24, declaredEnd);
			const parsed = readPeOptionalHeaderStructure(optionalHeader);
			if (!parsed.ok) return err({
				kind: "malformed",
				message: parsed.error.message
			});
			return ok({
				machine,
				characteristics,
				optionalHeader
			});
		};
		parsePeRecordFacts = (record, codeView) => {
			const structure = parsePeRecordStructure(record);
			if (!structure.ok) return err(structure.error.message);
			const { machine: machineType, characteristics, optionalHeader } = structure.value;
			const machine = decodePeMachine(machineType);
			if (machine === undefined) return err(`unsupported PE architecture (COFF machine 0x${machineType.toString(16).padStart(4, "0")})`);
			const facts = readPeOptionalHeader(optionalHeader, machineType);
			if (!facts.ok) return err(facts.error.message);
			if (facts.value.machine === null) return err("unsupported PE architecture");
			const { architecture } = facts.value.machine;
			return ok({
				optionalHeader: facts.value,
				metadata: {
					format: "pe",
					peMachine: machineType,
					architecture,
					availableArchitectures: [architecture],
					executableRole: (characteristics & 2) === 0 ? "non-executable" : (characteristics & 8192) === 0 ? "application" : "shared-library",
					managed: facts.value.managed,
					...codeView !== undefined ? { codeView } : {}
				}
			});
		};
		parseCodeViewData = (buffer, sizeOfData) => {
			if (sizeOfData < 16 || buffer.length < 16) return undefined;
			const magic = buffer.subarray(0, 4).toString("binary");
			const pathOffset = magic === "RSDS" ? 24 : magic === "NB10" ? 16 : undefined;
			if (pathOffset === undefined || sizeOfData <= pathOffset || buffer.length <= pathOffset) return undefined;
			const end = buffer.subarray(0, Math.min(sizeOfData, PE_CODEVIEW_PREFIX_BYTES)).indexOf(0, pathOffset);
			if (end <= pathOffset) return undefined;
			const reader = new BinaryReader$1(buffer, true, "pe");
			const path = decodeCodeViewPath(buffer.subarray(pathOffset, end), magic);
			if (magic === "RSDS") {
				const part1 = reader.u32(4).toString(16).padStart(8, "0");
				const part2 = reader.u16(8).toString(16).padStart(4, "0");
				const part3 = reader.u16(10).toString(16).padStart(4, "0");
				const part4 = buffer.subarray(12, 14).toString("hex");
				const part5 = buffer.subarray(14, 20).toString("hex");
				const guid = `${part1}-${part2}-${part3}-${part4}-${part5}`;
				const age = reader.u32(20);
				return {
					...path,
					guid,
					age
				};
			}
			return {
				...path,
				guid: null,
				age: reader.u32(12)
			};
		};
		decodeCodeViewPath = (bytes, magic) => {
			const textAvailable = magic === "RSDS" ? isStrictUtf8(bytes) : bytes.every((byte) => byte < 128);
			if (!textAvailable) return {
				pdbPath: null,
				pdbFileName: null,
				pdbPathBytesHex: bytes.toString("hex")
			};
			const pdbPath = bytes.toString("utf8");
			return {
				pdbPath,
				pdbFileName: pdbPath.split(/[/\\]/u).at(-1) ?? pdbPath
			};
		};
		peDebugDirectoryEntry = (optionalHeader) => {
			const fixed = readPeOptionalHeaderFixedFields(optionalHeader);
			if (!fixed.ok) return undefined;
			const observed = readPeOptionalHeaderDirectory(optionalHeader, fixed.value, 6);
			if (observed.state !== "present") return undefined;
			const { address: debugRva, size: debugSize } = observed.directory;
			if (debugRva === 0 || debugSize < 28) return undefined;
			return {
				debugRva,
				debugSize,
				sizeOfHeaders: fixed.value.sizeOfHeaders
			};
		};
		peRvaToFileOffset = (rva, sectionTable, numberOfSections, sizeOfHeaders, size = 1) => {
			const mappings = [{
				address: 0n,
				offset: 0,
				size: sizeOfHeaders
			}];
			const zeroFills = [];
			for (let index = 0; index < numberOfSections; index += 1) {
				const offset = index * 40;
				const parsed = readPeSectionHeader(sectionTable.subarray(offset, offset + 40));
				if (!parsed.ok) return undefined;
				const section = parsed.value;
				const address = BigInt(section.virtual_address);
				if (section.raw_size > 0) mappings.push({
					address,
					offset: section.offset,
					size: section.raw_size
				});
				if (section.virtual_size > section.raw_size) zeroFills.push({
					address: address + BigInt(section.raw_size),
					size: BigInt(section.virtual_size - section.raw_size)
				});
			}
			const mapped = resolveMappedFileOffset(mappings, BigInt(rva), size, zeroFills);
			return mapped.ok ? mapped.value : undefined;
		};
		parsePeCodeViewFromBuffer = (fileBytes, peOffset) => {
			const result = inspectPeCodeViewFromBuffer(fileBytes, peOffset);
			return result.ok ? result.value : undefined;
		};
		inspectPeCodeViewFromBuffer = (fileBytes, peOffset) => {
			const incomplete = (message) => err({
				kind: "incomplete",
				message
			});
			if (fileBytes.length < peOffset + 24) return incomplete("Truncated PE header.");
			const coff = readPeCoffHeader(fileBytes.subarray(peOffset + 4, peOffset + 24));
			if (!coff.ok) return incomplete(coff.error.message);
			const { sectionCount: numberOfSections, optionalHeaderSize } = coff.value;
			if (optionalHeaderSize > 4096 || fileBytes.length < peOffset + 24 + optionalHeaderSize) return incomplete("PE optional header is truncated or exceeds the parsing allowance.");
			const optionalHeader = fileBytes.subarray(peOffset + 24, peOffset + 24 + optionalHeaderSize);
			const fixed = readPeOptionalHeaderFixedFields(optionalHeader);
			if (!fixed.ok) return incomplete(fixed.error.message);
			const observed = readPeOptionalHeaderDirectory(optionalHeader, fixed.value, 6);
			if (observed.state === "absent") return ok(undefined);
			if (observed.state !== "present") return incomplete("Truncated PE debug directory declaration.");
			const { address: debugRva, size: debugSize } = observed.directory;
			if (debugRva === 0 && debugSize === 0) return ok(undefined);
			if (debugRva === 0 || debugSize < 28 || debugSize % 28 !== 0) return incomplete("Invalid PE debug directory declaration.");
			const debugDir = {
				debugRva,
				debugSize,
				sizeOfHeaders: fixed.value.sizeOfHeaders
			};
			const sectionTableOffset = peOffset + 24 + optionalHeaderSize;
			const sectionTableSize = numberOfSections * 40;
			if (fileBytes.length < sectionTableOffset + sectionTableSize) return incomplete("Truncated PE section table.");
			const sectionTable = fileBytes.subarray(sectionTableOffset, sectionTableOffset + sectionTableSize);
			const debugFileOffset = peRvaToFileOffset(debugDir.debugRva, sectionTable, numberOfSections, debugDir.sizeOfHeaders, Math.min(debugDir.debugSize, 4096));
			if (debugFileOffset === undefined || fileBytes.length < debugFileOffset + debugDir.debugSize) return incomplete("PE debug directory is unmapped or truncated.");
			const maxDebugBytes = Math.min(debugDir.debugSize, fileBytes.length - debugFileOffset);
			const directory = fileBytes.subarray(debugFileOffset, debugFileOffset + maxDebugBytes);
			let sawCodeView = false;
			for (const { fileOffset: pointerToRawData, declaredSize: sizeOfData } of peCodeViewDirectoryEntries(directory, sectionTable, numberOfSections, debugDir.sizeOfHeaders)) {
				sawCodeView = true;
				if (pointerToRawData === undefined || fileBytes.length < pointerToRawData + Math.min(sizeOfData, 24)) continue;
				const codeViewData = fileBytes.subarray(pointerToRawData, pointerToRawData + Math.min(sizeOfData, PE_CODEVIEW_PREFIX_BYTES));
				const parsed = parseCodeViewData(codeViewData, sizeOfData);
				if (parsed !== undefined) return ok(parsed);
			}
			return sawCodeView ? incomplete("PE CodeView records could not be decoded completely.") : ok(undefined);
		};
		machoBinaryArchitecture = (cpu) => cpu === CPU_TYPE_ARM64_32 ? "arm64_32" : machArchitecture(cpu);
		machArchitecture = (cpu) => {
			switch (cpu) {
				case 7: return "x86";
				case 16777223: return "x86_64";
				case 12: return "arm";
				case 16777228: return "arm64";
			}
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/uefi/uefiLimits.js
var UEFI_FIRMWARE_LIMITS;
function init_uefiLimits() {
	return (init_uefiLimits = __esmMin((() => {
		UEFI_FIRMWARE_LIMITS = {
			/** Largest accepted firmware image; Gigabyte AMI images are 16 MiB. */
			inputBytes: 128 * 1024 * 1024,
			/** Prefix bytes inspected for signature-based format admission. */
			scanProbeBytes: 1024 * 1024,
			/** Maximum firmware volumes mapped before coverage turns partial. */
			maxVolumes: 1024,
			defaultMaxVolumes: 512,
			/** Maximum FFS files mapped before coverage turns partial. */
			maxFiles: 1e5,
			defaultMaxFiles: 2e4,
			/** Maximum nested section and sub-volume depth, clamped by caller input. */
			maxDepth: 5,
			defaultMaxDepth: 3,
			/** Maximum total bytes of staged extraction files. */
			maxOutputBytes: 256 * 1024 * 1024,
			defaultMaxOutputBytes: 256 * 1024 * 1024,
			maxOutputFiles: 1e4,
			defaultMaxOutputFiles: 1e4,
			/** Whole-operation deadline for parser and worker runs. */
			timeoutMs: 6e4,
			/** Per-stream decompressed output ceiling for both decoders. */
			lzmaOutputBytes: 64 * 1024 * 1024,
			/** Shared structural record ceiling per inspection or extraction. */
			scanRecords: 1e5,
			/** Limit retained and traversed decoded data across all streams in an operation. */
			decodedBytes: 128 * 1024 * 1024,
			/** Diagnostic text retained inline before truncation. */
			diagnosticBytes: 8 * 1024 * 1024
		};
	})))();
}

//#endregion
//#region dist/uefi/UefiBytes.js
/** Build a region over one full-image address range; bounds are clamped. */
function imageRegion(buffer, start, end) {
	const clampedStart = Math.max(0, Math.min(start, buffer.length));
	const clampedEnd = Math.max(clampedStart, Math.min(end, buffer.length));
	return {
		buffer,
		start: clampedStart,
		end: clampedEnd,
		origin: clampedStart
	};
}
/** Map a local position inside the region to its source-stream offset. */
function absoluteOffset(region, localOffset) {
	return region.origin + (localOffset - region.start);
}
/** Map an source-stream offset back to its local position inside the region. */
function localOffsetOf(region, absoluteAddress) {
	return absoluteAddress - region.origin + region.start;
}
/** Read bytes of one sub-range as a view; null when outside region bounds. */
function sliceRegion(region, absoluteStart, length) {
	const local = absoluteStart - region.origin + region.start;
	if (absoluteStart < region.origin || local < region.start || local + length > region.end) {
		return null;
	}
	return region.buffer.subarray(local, local + length);
}
/** Round up to the next multiple of `alignment`; zero stays zero. */
function alignUp(value, alignment) {
	if (alignment <= 1) {
		return Math.max(0, value);
	}
	return Math.ceil(value / alignment) * alignment;
}
/** Uniformity over a bounded window; out-of-window bytes read as absent. */
function isWindowUniform(buffer, start, end, byte) {
	const boundedStart = Math.max(0, start);
	const boundedEnd = Math.min(end, buffer.length);
	if (boundedStart >= boundedEnd) {
		return false;
	}
	for (let index = boundedStart; index < boundedEnd; index += 1) {
		if (buffer[index] !== byte) {
			return false;
		}
	}
	return true;
}
function init_UefiBytes() {
	return (init_UefiBytes = __esmMin((() => {})))();
}

//#endregion
//#region dist/uefi/UefiGuid.js
/**
* Format a raw GUID with UEFI mixed-endian decoding: the first data word and
* the two following words read little-endian, the remaining eight bytes keep
* their written order. Returns null outside mapped bounds; null is an
* observation, never a guessed identifier.
*/
function formatGuidLittleEndian(buffer, offset) {
	if (offset < 0 || offset + 16 > buffer.length) {
		return null;
	}
	const reader = new BinaryReader$1(buffer, true, "UEFI GUID");
	const data1 = reader.u32(offset);
	const data2 = reader.u16(offset + 4);
	const data3 = reader.u16(offset + 6);
	const tail = buffer.subarray(offset + 8, offset + 16);
	const word = (value, digits) => value.toString(16).padStart(digits, "0");
	const node = Array.from(tail, (byte) => word(byte, 2)).join("");
	return [
		word(data1, 8),
		word(data2, 4),
		word(data3, 4),
		node.slice(0, 4),
		node.slice(4)
	].join("-");
}
/** Case-insensitive canonical GUID comparison. */
function guidEquals(left, right) {
	return left.toLowerCase() === right.toLowerCase();
}
var GUID_LENGTH, FFS2_FILE_SYSTEM_GUID, FFS3_FILE_SYSTEM_GUID;
function init_UefiGuid() {
	return (init_UefiGuid = __esmMin((() => {
		init_binaryContainer();
		GUID_LENGTH = 16;
		FFS2_FILE_SYSTEM_GUID = "8c8ce578-8a3d-4f1c-9935-896185c32dd3";
		FFS3_FILE_SYSTEM_GUID = "5473c07a-3dcb-4dca-bd6f-1e9689e7349a";
	})))();
}

//#endregion
//#region dist/uefi/UefiCodeTables.js
function flip(mapping) {
	const reversed = {};
	for (const [name, code] of Object.entries(mapping)) {
		reversed[code] = name;
	}
	return reversed;
}
var FFS_TYPE_CODES, SECTION_TYPE_CODES, FFS_TYPE_NAME_BY_CODE, SECTION_TYPE_NAME_BY_CODE, COMPRESSION_GUID_BY_DISPLAY, OPAQUE_GUIDED_SECTION_GUIDS, FFS_ATTRIBUTE_MASKS, FV_ATTRIBUTE_ERASE_POLARITY, FV_HEADER_LAYOUT, FFS_HEADER_LAYOUT, SECTION_LAYOUT;
function init_UefiCodeTables() {
	return (init_UefiCodeTables = __esmMin((() => {
		FFS_TYPE_CODES = {
			raw: 1,
			freeform: 2,
			"security-core": 3,
			"pei-core": 4,
			"dxe-core": 5,
			peim: 6,
			driver: 7,
			"combined-peim-driver": 8,
			application: 9,
			smm: 10,
			"firmware-volume-image": 11,
			"combined-smm-dxe": 12,
			"smm-core": 13,
			"mm-standalone": 14,
			"mm-core-standalone": 15,
			pad: 240
		};
		SECTION_TYPE_CODES = {
			compression: 1,
			"guid-defined": 2,
			disposable: 3,
			pe32: 16,
			pic: 17,
			te: 18,
			"dxe-depex": 19,
			version: 20,
			"user-interface": 21,
			compatibility16: 22,
			"firmware-volume-image": 23,
			"freeform-subtype-guid": 24,
			raw: 25,
			"pei-depex": 27,
			"mm-depex": 28
		};
		FFS_TYPE_NAME_BY_CODE = flip(FFS_TYPE_CODES);
		SECTION_TYPE_NAME_BY_CODE = flip(SECTION_TYPE_CODES);
		COMPRESSION_GUID_BY_DISPLAY = {
			"ee4e5898-3914-4259-9d6e-dc7bd79403cf": "lzma-custom",
			"d42ae6bd-1352-4bfb-909a-ca72a6eae889": "lzmaf86",
			"ce3233f5-2cd6-4d87-9152-4a238bb6d1c4": "amd-zlib",
			"a31280ad-481e-41b6-95e8-127f4c984779": "tiano",
			"fc1bcdb0-7d31-49aa-936a-a4600d9dd083": "crc32-guided"
		};
		OPAQUE_GUIDED_SECTION_GUIDS = new Set([
			"0f9d89e8-9259-4f76-a5af-0c89e34023df",
			"a7717414-c616-4977-9420-844712a735bf",
			"0ed85e23-f253-413f-a03c-901987b04397",
			"bd9921ea-ed91-404a-8b2f-b4d724747c8c",
			"1d301fe9-be79-4353-91c2-d23bc959ae0c",
			"3d532050-5cda-4fd0-879e-0f7f630d5afb"
		]);
		FFS_ATTRIBUTE_MASKS = {
			largeFile: 1,
			dataAlignment2: 2,
			fixed: 4,
			dataAlignment: 56,
			checksumValid: 64
		};
		FV_ATTRIBUTE_ERASE_POLARITY = 2048;
		FV_HEADER_LAYOUT = {
			zeroVectorLength: 16,
			fileSystemGuidOffset: 16,
			fvLengthOffset: 32,
			signatureOffset: 40,
			attributesOffset: 44,
			headerLengthOffset: 48,
			checksumOffset: 50,
			extHeaderOffsetOffset: 52,
			reservedOffset: 54,
			revisionOffset: 55,
			blockMapOffset: 56,
			blockMapEntryLength: 8,
			minimumLength: 64,
			fileAlignment: 8
		};
		FFS_HEADER_LAYOUT = {
			nameGuidOffset: 0,
			integrityCheckOffset: 16,
			typeOffset: 18,
			attributesOffset: 19,
			sizeOffset: 20,
			stateOffset: 23,
			length: 24,
			extendedSizeOffset: 24,
			extendedLength: 32
		};
		SECTION_LAYOUT = {
			sizeOffset: 0,
			typeOffset: 3,
			commonLength: 4,
			extendedSizeOffset: 4,
			extendedLength: 8,
			largeSectionMarker: 16777215,
			compressionFieldsLength: 5,
			compressionTypeFieldOffset: 4,
			guidedFieldsLength: 20,
			guidedCrc32Length: 4,
			guidDataOffsetFieldOffset: 16,
			guidAttributesFieldOffset: 18
		};
	})))();
}

//#endregion
//#region dist/uefi/FfsFile.js
/**
* Parse one FFS header at a local position; null when framing is unconfirmed.
* Checksum findings are observations on the header,
* not rejections — invalid files stay in the inventory with their notes.
*/
function parseFfsFileHeader(region, localBase, erasePolarity) {
	const parsed = observeFfsFileHeader(region, localBase, erasePolarity);
	return parsed !== null && !("kind" in parsed) ? parsed : null;
}
function observeFfsFileHeader(region, localBase, erasePolarity) {
	if (localBase < region.start || localBase + FFS_HEADER_LAYOUT.length > region.end) {
		return null;
	}
	const available = region.end - localBase;
	const extended = available >= FFS_HEADER_LAYOUT.extendedLength;
	const attributes = region.buffer[localBase + FFS_HEADER_LAYOUT.attributesOffset] ?? 0;
	const sizeB0 = region.buffer[localBase + FFS_HEADER_LAYOUT.sizeOffset] ?? 0;
	const sizeB1 = region.buffer[localBase + FFS_HEADER_LAYOUT.sizeOffset + 1] ?? 0;
	const sizeB2 = region.buffer[localBase + FFS_HEADER_LAYOUT.sizeOffset + 2] ?? 0;
	const declaredCompact = sizeB0 | sizeB1 << 8 | sizeB2 << 16;
	const largeFile = (attributes & FFS_ATTRIBUTE_MASKS.largeFile) !== 0;
	const implausibilities = [];
	const rawState = region.buffer[localBase + FFS_HEADER_LAYOUT.stateOffset] ?? 0;
	const normalizedState = erasePolarity ? ~rawState & 63 : rawState & 63;
	const stateFlags = STATE_BIT_NAMES.filter(([bit]) => (normalizedState & bit) !== 0).map(([, name]) => name);
	const state = stateFlags.at(-1);
	if (state === undefined) return {
		kind: "unconfirmed-state",
		rawState
	};
	const unusableState = state === "header-construction" || state === "header-invalid" ? state : null;
	let headerLength = FFS_HEADER_LAYOUT.length;
	let declaredLength = declaredCompact;
	if (largeFile) {
		const reader = new BinaryReader$1(region.buffer, true, "FFS file");
		if (!extended) return null;
		headerLength = FFS_HEADER_LAYOUT.extendedLength;
		const size = reader.word(localBase + FFS_HEADER_LAYOUT.extendedSizeOffset, 64);
		if (size > BigInt(Number.MAX_SAFE_INTEGER)) return {
			kind: "unrepresentable",
			size,
			unusableState
		};
		declaredLength = Number(size);
		if (declaredCompact !== 0) implausibilities.push("large-file-compact-size-is-nonzero");
	}
	const extentIssue = unusableState !== null ? "unusable-header-state" : declaredLength < headerLength ? "declared-length-below-header" : declaredLength > available ? "declared-length-truncates-region" : null;
	if (extentIssue !== null) implausibilities.push(extentIssue);
	const observedLength = unusableState !== null ? headerLength : Math.min(Math.max(declaredLength, headerLength), available);
	const headerChecksumField = region.buffer[localBase + FFS_HEADER_LAYOUT.integrityCheckOffset] ?? 0;
	const fileChecksumField = region.buffer[localBase + FFS_HEADER_LAYOUT.integrityCheckOffset + 1] ?? 0;
	const fileChecksumRequired = (attributes & FFS_ATTRIBUTE_MASKS.checksumValid) !== 0;
	const headerChecksumValid = verifyFfsHeaderChecksum(region.buffer, localBase, headerLength);
	return {
		absoluteBase: absoluteOffset(region, localBase),
		localBase,
		headerLength,
		declaredLength,
		observedLength,
		body: extentIssue === null || extentIssue === "declared-length-truncates-region" ? {
			start: localBase + headerLength,
			end: localBase + observedLength
		} : null,
		bodyIssue: state === "header-valid" ? "data-not-valid" : null,
		extentIssue,
		nameGuid: formatGuidLittleEndian(region.buffer.subarray(localBase, localBase + 16), 0),
		typeCode: region.buffer[localBase + FFS_HEADER_LAYOUT.typeOffset] ?? 0,
		attributes,
		dataAlignment: 2 ** ((attributes & FFS_ATTRIBUTE_MASKS.dataAlignment2) !== 0 ? 17 + ((attributes & FFS_ATTRIBUTE_MASKS.dataAlignment) >> 3) : FFS_DATA_ALIGNMENT_EXPONENTS[(attributes & FFS_ATTRIBUTE_MASKS.dataAlignment) >> 3] ?? 0),
		rawState,
		stateFlags,
		headerChecksumField,
		fileChecksumField,
		fileChecksumRequired,
		headerChecksumValid,
		implausibilities
	};
}
/**
* Header checksum: sum of all header bytes with the State byte and the
* IntegrityCheck.File byte set to zero must reach zero (mod 256).
*/
function verifyFfsHeaderChecksum(buffer, localBase, headerLength) {
	let total = 0;
	for (let offset = 0; offset < headerLength; offset += 1) {
		let byte = buffer[localBase + offset] ?? 0;
		if (offset === FFS_HEADER_LAYOUT.stateOffset || offset === FFS_HEADER_LAYOUT.integrityCheckOffset + 1) {
			byte = 0;
		}
		total = total + byte & 255;
	}
	return total === 0;
}
/** Check the file's fixed integrity marker or its declared body checksum. */
function checkFfsFileIntegrity(region, header) {
	if (header.typeCode === 240) return { verdict: "pad-file-unchecked" };
	if (header.extentIssue !== null || header.bodyIssue !== null || header.body === null) return { verdict: "unchecked" };
	if (!header.fileChecksumRequired) {
		if (header.fileChecksumField === 170) return { verdict: "unchecked" };
		return {
			verdict: "invalid",
			offset: header.absoluteBase + FFS_HEADER_LAYOUT.integrityCheckOffset + 1,
			length: 1,
			detail: `FFS IntegrityCheck.File is 0x${byteToHex(header.fileChecksumField)}. PI requires 0xaa when the file checksum attribute is clear.`
		};
	}
	const { start, end } = header.body;
	const length = end - start;
	if (length === 0) return { verdict: "unchecked" };
	let total = header.fileChecksumField;
	for (const byte of region.buffer.subarray(start, end)) {
		total = total + byte & 255;
	}
	return total === 0 ? { verdict: "valid" } : {
		verdict: "invalid",
		offset: absoluteOffset(region, start),
		length,
		detail: "File data checksum differs from the declared IntegrityCheck.File byte."
	};
}
/** Identify a bounded FFS alignment span whose bytes differ from erase polarity. */
function unexpectedFfsPadding(region, start, end, erasePolarity) {
	const boundedEnd = Math.min(end, region.end);
	if (start >= boundedEnd || isWindowUniform(region.buffer, start, boundedEnd, erasePolarity ? 255 : 0)) return null;
	return {
		offset: absoluteOffset(region, start),
		length: boundedEnd - start
	};
}
/** Read a file and its alignment within a region starting at the volume base. */
function readFfsHeader(region, local, { erasePolarity, fileSystem }, reserve = () => true) {
	if (local >= region.end) return { kind: "end" };
	const erase = erasePolarity ? 255 : 0;
	const prefixEnd = Math.min(local + FFS_HEADER_LAYOUT.length, region.end);
	if (isWindowUniform(region.buffer, local, prefixEnd, erase)) {
		if (prefixEnd === region.end || isWindowUniform(region.buffer, prefixEnd, region.end, erase)) return { kind: "end" };
	} else if (!isWindowUniform(region.buffer, local, prefixEnd, erase ^ 255)) {
		if (!reserve()) return { kind: "limited" };
		const header = observeFfsFileHeader(region, local, erasePolarity);
		if (header !== null && "kind" in header) {
			const offset = absoluteOffset(region, local);
			if (header.kind === "unconfirmed-state") {
				return {
					kind: "unparsed",
					offset,
					length: region.end - local,
					detail: `FFS header at 0x${offset.toString(16)} has no recognized state bits (raw State 0x${byteToHex(header.rawState)}). Its declared extent is unconfirmed.`
				};
			}
			const detail = `FFS ExtendedSize at 0x${offset.toString(16)} declares 0x${header.size.toString(16)} bytes, exceeding exactly representable lengths.`;
			if (header.unusableState === null) return {
				kind: "unparsed",
				offset,
				length: region.end - local,
				detail
			};
			return {
				kind: "unusable-header",
				offset,
				length: FFS_HEADER_LAYOUT.extendedLength,
				nextLocal: local + FFS_HEADER_LAYOUT.extendedLength,
				detail: `${detail} The ${header.unusableState} state permits advancing by the fixed header extent.`
			};
		}
		if (header !== null) {
			const end = local + header.observedLength;
			const nextLocal = Math.min(region.end, region.start + alignUp(end - region.start, 8));
			if (fileSystem === "ffs2" && header.headerLength === FFS_HEADER_LAYOUT.extendedLength) {
				const detail = `FFS2 volume contains an FFS3 file header at 0x${header.absoluteBase.toString(16)}.`;
				const fixedHeaderOnly = header.extentIssue === "unusable-header-state";
				if (!fixedHeaderOnly && (header.extentIssue !== null || !header.headerChecksumValid || header.declaredLength <= 16777215 || header.implausibilities.includes("large-file-compact-size-is-nonzero"))) return {
					kind: "unparsed",
					offset: header.absoluteBase,
					length: region.end - local,
					detail: `${detail} Its occupied extent could not be confirmed.`
				};
				const skipEnd = fixedHeaderOnly ? end : nextLocal;
				return {
					kind: "unusable-header",
					offset: header.absoluteBase,
					length: skipEnd - local,
					nextLocal: skipEnd,
					detail: fixedHeaderOnly ? `${detail} Its state permits advancing by the fixed header extent.` : detail
				};
			}
			return {
				kind: "file",
				header,
				nextLocal,
				padding: unexpectedFfsPadding(region, end, nextLocal, erasePolarity)
			};
		}
	}
	return {
		kind: "unparsed",
		offset: absoluteOffset(region, local),
		length: region.end - local
	};
}
var FFS_DATA_ALIGNMENT_EXPONENTS, STATE_BIT_NAMES;
function init_FfsFile() {
	return (init_FfsFile = __esmMin((() => {
		init_binaryContainer();
		init_byteToHex();
		init_UefiBytes();
		init_UefiGuid();
		init_UefiCodeTables();
		FFS_DATA_ALIGNMENT_EXPONENTS = [
			0,
			4,
			7,
			9,
			10,
			12,
			15,
			16
		];
		STATE_BIT_NAMES = [
			[1, "header-construction"],
			[2, "header-valid"],
			[4, "data-valid"],
			[8, "marked-for-update"],
			[16, "deleted"],
			[32, "header-invalid"]
		];
	})))();
}

//#endregion
//#region dist/uefi/FirmwareVolume.js
/**
* Parse one header at a local position. Returns null when the position cannot
* hold a structurally complete header (bounds or signature); returns header
* data plus implausibility findings otherwise. Mismatched declared checksums
* stay an observation, never a rejection.
*/
function parseFirmwareVolumeHeader(region, localHeaderBase, reserve = () => true) {
	const available = region.end - localHeaderBase;
	if (localHeaderBase < region.start || available < FV_HEADER_LAYOUT.minimumLength || localHeaderBase + FV_HEADER_LAYOUT.minimumLength > region.end) {
		return null;
	}
	const reader = new BinaryReader$1(region.buffer, true, "UEFI firmware volume");
	const signature = reader.u32(localHeaderBase + FV_HEADER_LAYOUT.signatureOffset);
	if (signature !== FVH_SIGNATURE) {
		return null;
	}
	const absoluteBase = absoluteOffset(region, localHeaderBase);
	const headerLength = reader.u16(localHeaderBase + FV_HEADER_LAYOUT.headerLengthOffset);
	const attributes = reader.u32(localHeaderBase + FV_HEADER_LAYOUT.attributesOffset);
	const revision = region.buffer[localHeaderBase + FV_HEADER_LAYOUT.revisionOffset] ?? 0;
	const extHeaderRaw = reader.u16(localHeaderBase + FV_HEADER_LAYOUT.extHeaderOffsetOffset);
	const declaredLengthValue = reader.word(localHeaderBase + FV_HEADER_LAYOUT.fvLengthOffset, 64);
	const declaredLength = Number(declaredLengthValue);
	const implausibilities = [];
	if (!Number.isSafeInteger(declaredLength) || declaredLengthValue > BigInt(Number.MAX_SAFE_INTEGER)) {
		return null;
	}
	if (headerLength < FV_HEADER_LAYOUT.minimumLength || headerLength % 2 !== 0) {
		implausibilities.push("header-length-implausible");
	}
	if (declaredLength < FV_HEADER_LAYOUT.minimumLength) {
		implausibilities.push("declared-length-implausible");
	}
	if (localHeaderBase + declaredLength > region.end) {
		implausibilities.push("declared-length-truncates-region");
	}
	if (headerLength > FV_HEADER_LAYOUT.minimumLength && localHeaderBase + headerLength > region.end) {
		implausibilities.push("header-length-truncates-region");
	}
	if (headerLength > declaredLength) implausibilities.push("header-exceeds-volume");
	const volumeEnd = localHeaderBase + Math.min(declaredLength, available);
	const blockMap = [];
	const blockMapCapacity = Math.floor((headerLength - FV_HEADER_LAYOUT.blockMapOffset) / FV_HEADER_LAYOUT.blockMapEntryLength);
	let blockMapTerminated = false;
	for (let index = 0; index < blockMapCapacity; index += 1) {
		const entryLocal = localHeaderBase + FV_HEADER_LAYOUT.blockMapOffset + index * FV_HEADER_LAYOUT.blockMapEntryLength;
		if (entryLocal + FV_HEADER_LAYOUT.blockMapEntryLength > volumeEnd) {
			implausibilities.push("block-map-truncation");
			break;
		}
		const numBlocks = reader.u32(entryLocal);
		const blockLength = reader.u32(entryLocal + 4);
		if (numBlocks === 0 && blockLength === 0) {
			blockMapTerminated = true;
			break;
		}
		if (numBlocks === 0 || blockLength === 0) {
			implausibilities.push("block-map-empty-run");
			break;
		}
		if (!reserve()) return null;
		blockMap.push({
			numBlocks,
			blockLength
		});
	}
	if (!blockMapTerminated) {
		implausibilities.push("block-map-terminator-missing");
	}
	if (blockMapTerminated) {
		const mapped = blockMap.reduce((total, entry) => total + BigInt(entry.numBlocks) * BigInt(entry.blockLength), 0n);
		if (mapped !== declaredLengthValue) implausibilities.push(mapped > declaredLengthValue ? "block-map-exceeds-volume" : "block-map-shorter-than-volume");
	}
	const erasePolarity = (attributes & FV_ATTRIBUTE_ERASE_POLARITY) !== 0;
	const headerEnd = localHeaderBase + headerLength;
	let prefixEnd = headerEnd;
	let firstFileLocal = localHeaderBase + alignUp(headerLength, 8);
	const filePrefixPadding = [];
	const checkPadding = (start, end) => {
		const padding = unexpectedFfsPadding({
			...region,
			end: volumeEnd
		}, start, end, erasePolarity);
		if (padding !== null) filePrefixPadding.push(padding);
	};
	let extensionEntries = null;
	if (extHeaderRaw !== 0 && blockMapTerminated) {
		const blockMapEnd = FV_HEADER_LAYOUT.blockMapOffset + (blockMap.length + 1) * FV_HEADER_LAYOUT.blockMapEntryLength;
		const extStart = localHeaderBase + extHeaderRaw;
		const extMinimumLength = 16 + 4;
		if (extHeaderRaw < blockMapEnd || extHeaderRaw % 4 !== 0 || extStart + extMinimumLength > volumeEnd) {
			implausibilities.push("extended-header-offset-implausible");
		} else {
			const extLength = reader.u32(extStart + 16);
			const extEnd = extStart + extLength;
			if (extLength < extMinimumLength || extEnd > volumeEnd) {
				implausibilities.push("extended-header-length-implausible");
			} else {
				extensionEntries = {
					start: extStart + extMinimumLength,
					end: extEnd
				};
			}
			if (extensionEntries !== null && extEnd > headerEnd) {
				const pad = parseFfsFileHeader({
					...region,
					end: volumeEnd
				}, firstFileLocal, erasePolarity);
				if (pad?.typeCode !== 240 || !pad.headerChecksumValid || pad.extentIssue !== null || pad.body === null || pad.body.start > extStart || pad.body.end < extEnd) {
					checkPadding(headerEnd, extStart);
					prefixEnd = extEnd;
					firstFileLocal = localHeaderBase + alignUp(extEnd - localHeaderBase, 8);
				}
			}
		}
	}
	checkPadding(prefixEnd, firstFileLocal);
	const checksumValid = localHeaderBase + headerLength <= volumeEnd && verifyFirmwareVolumeChecksum(region.buffer, localHeaderBase, headerLength);
	const fileSystemGuid = formatGuidLittleEndian(region.buffer, localHeaderBase + FV_HEADER_LAYOUT.fileSystemGuidOffset);
	return {
		localBase: localHeaderBase,
		absoluteBase,
		declaredLength,
		headerLength,
		firstFileLocal,
		filePrefixPadding,
		attributes,
		erasePolarity,
		extHeaderOffset: extHeaderRaw === 0 ? null : extHeaderRaw,
		extensionEntries,
		revision,
		fileSystemGuid,
		fileSystem: fileSystemGuid === "8c8ce578-8a3d-4f1c-9935-896185c32dd3" ? "ffs2" : fileSystemGuid === "5473c07a-3dcb-4dca-bd6f-1e9689e7349a" ? "ffs3" : "unsupported",
		blockMap,
		checksumValid,
		implausibilities
	};
}
/** Check extension metadata in admitted volumes without changing FFS bounds. */
function* inspectFirmwareVolumeExtension(region, header, reserve, checkpoint, observedFileEnd) {
	const entries = header.extensionEntries;
	if (entries === null || entries.start === entries.end) return;
	const reader = new BinaryReader$1(region.buffer, true, "UEFI FV extension");
	const minimumUsedSize = Math.max(header.headerLength, entries.end - header.localBase);
	let usedSize;
	let sizeConflict = false;
	let local = entries.start;
	while (local < entries.end) {
		const offset = absoluteOffset(region, local);
		const available = entries.end - local;
		if (!reserve()) {
			yield {
				kind: "size-truncated",
				offset,
				length: available,
				detail: `Structural record limit reached at FV extension offset 0x${offset.toString(16)}.`
			};
			return;
		}
		if (available < FV_EXTENSION_ENTRY_HEADER_LENGTH) {
			yield {
				kind: "unparsed-region",
				offset,
				length: available,
				detail: `Incomplete FV extension entry header at 0x${offset.toString(16)}.`
			};
			break;
		}
		const size = reader.u16(local);
		if (size < FV_EXTENSION_ENTRY_HEADER_LENGTH || size > available) {
			yield {
				kind: "unparsed-region",
				offset,
				length: available,
				detail: `FV extension entry at 0x${offset.toString(16)} has an invalid extent (declared ${size} bytes, ${available} bytes available).`
			};
			break;
		}
		const type = reader.u16(local + 2);
		const fieldLocal = local + FV_EXTENSION_ENTRY_HEADER_LENGTH;
		local += size;
		if (type !== FV_EXT_TYPE_USED_SIZE) {
			const minimum = minimumExtensionEntrySize(reader, type, size, fieldLocal);
			if (size < minimum) yield {
				kind: "unparsed-region",
				offset,
				length: size,
				detail: `FV extension type 0x${type.toString(16)} at 0x${offset.toString(16)} needs at least ${minimum} bytes; it declares ${size}.`
			};
			continue;
		}
		if (size !== FV_EXTENSION_ENTRY_HEADER_LENGTH + USED_SIZE_LENGTH) {
			yield {
				kind: "unparsed-region",
				offset,
				length: size,
				detail: `FV UsedSize entry at 0x${offset.toString(16)} has an invalid length (${size} bytes).`
			};
			continue;
		}
		const value = reader.u32(fieldLocal);
		const fieldOffset = absoluteOffset(region, fieldLocal);
		if (value < minimumUsedSize || value > header.declaredLength) {
			yield {
				kind: "unparsed-region",
				offset: fieldOffset,
				length: USED_SIZE_LENGTH,
				detail: `FV UsedSize ${value} at 0x${fieldOffset.toString(16)} is outside the volume data extent (${minimumUsedSize}–${header.declaredLength}).`
			};
			continue;
		}
		if (usedSize === undefined) {
			usedSize = {
				value,
				offset: fieldOffset
			};
		} else if (usedSize.value !== value) {
			sizeConflict = true;
			yield {
				kind: "unparsed-region",
				offset: fieldOffset,
				length: USED_SIZE_LENGTH,
				detail: `FV UsedSize ${value} at 0x${fieldOffset.toString(16)} conflicts with earlier declaration ${usedSize.value}.`
			};
		}
	}
	if (usedSize === undefined || sizeConflict) return;
	if (observedFileEnd !== undefined && observedFileEnd > header.absoluteBase + usedSize.value) {
		yield {
			kind: "unparsed-region",
			offset: usedSize.offset,
			length: USED_SIZE_LENGTH,
			detail: `FV UsedSize ${usedSize.value} at 0x${usedSize.offset.toString(16)} ends before the observed FFS file end at 0x${observedFileEnd.toString(16)}.`
		};
		return;
	}
	const tailStart = header.localBase + usedSize.value;
	const volumeEnd = Math.min(region.end, header.localBase + header.declaredLength);
	const eraseByte = header.erasePolarity ? 255 : 0;
	for (let index = tailStart; index < volumeEnd; index += 1) {
		if ((index & 65535) === 0) checkpoint();
		if (region.buffer[index] === eraseByte) continue;
		yield {
			kind: "unparsed-region",
			offset: usedSize.offset,
			length: USED_SIZE_LENGTH,
			detail: `FV UsedSize ${usedSize.value} at 0x${usedSize.offset.toString(16)} claims an erased tail with a non-erased byte at 0x${absoluteOffset(region, index).toString(16)}.`
		};
		return;
	}
}
function minimumExtensionEntrySize(reader, type, size, fieldLocal) {
	if (type === FV_EXT_TYPE_GUID) return FV_EXTENSION_ENTRY_HEADER_LENGTH + 16;
	if (type !== FV_EXT_TYPE_OEM) return FV_EXTENSION_ENTRY_HEADER_LENGTH;
	const prefixLength = FV_EXTENSION_ENTRY_HEADER_LENGTH + 4;
	if (size < prefixLength) return prefixLength;
	let guidCount = 0;
	for (let bits = reader.u32(fieldLocal); bits !== 0; bits = bits >>> 1) guidCount += bits & 1;
	return prefixLength + guidCount * 16;
}
/** Sum of 16-bit header words must reach zero (mod 2^16). */
function verifyFirmwareVolumeChecksum(buffer, localHeaderBase, headerLength) {
	if (headerLength % 2 !== 0 || localHeaderBase + headerLength > buffer.length) {
		return false;
	}
	const checksumReader = new BinaryReader$1(buffer, true, "UEFI firmware volume");
	let total = 0;
	for (let offset = 0; offset < headerLength; offset += 2) {
		total = total + checksumReader.u16(localHeaderBase + offset) & 65535;
	}
	return total === 0;
}
/**
* Scan for `_FVH` hits with a shared reservation for candidate and block-map
* records. Keep plausible headers and distinguish rejected candidates from a
* stopped scan. Format admission applies its own alignment check.
*/
function scanFirmwareVolumes(region, maxCandidates, options = {}) {
	const volumes = [];
	const rejected = [];
	const signatureText = Buffer$1.from("_FVH", "ascii");
	let searchFrom = region.start;
	const signatureEnd = Math.min(region.end, options.signatureEnd ?? region.end);
	const searchable = region.buffer.subarray(0, signatureEnd);
	const budget = new Budget(UEFI_FIRMWARE_LIMITS.scanRecords);
	let limit = null;
	const reserve = () => {
		options.checkpoint?.();
		if (options.reserve?.() ?? budget.tryCharge(1)) return true;
		limit = "structural-records";
		return false;
	};
	while (searchFrom < signatureEnd) {
		const hitLocal = searchable.indexOf(signatureText, searchFrom);
		if (hitLocal < 0 || hitLocal + 4 > signatureEnd) {
			break;
		}
		if (volumes.length + rejected.length >= maxCandidates) {
			limit = "candidates";
			break;
		}
		if (!reserve()) break;
		searchFrom = hitLocal + 1;
		const headerLocal = hitLocal - FV_HEADER_LAYOUT.signatureOffset;
		if (headerLocal < region.start) {
			rejected.push({
				absoluteBase: Math.max(0, absoluteOffset(region, hitLocal) - FV_HEADER_LAYOUT.signatureOffset),
				signatureLocal: hitLocal,
				reason: "header-precedes-region-start"
			});
			continue;
		}
		const header = parseFirmwareVolumeHeader(region, headerLocal, reserve);
		if (header === null) {
			if (limit !== null) break;
			rejected.push({
				absoluteBase: absoluteOffset(region, hitLocal) - FV_HEADER_LAYOUT.signatureOffset,
				signatureLocal: hitLocal,
				reason: "header-unparseable"
			});
			continue;
		}
		const reason = header.implausibilities[0];
		if (reason !== undefined) {
			const truncated = reason === "declared-length-truncates-region" || reason === "header-length-truncates-region";
			rejected.push({
				absoluteBase: header.absoluteBase,
				signatureLocal: hitLocal,
				reason,
				...truncated ? { truncation: {
					declaredLength: Math.max(header.declaredLength, header.headerLength),
					observedLength: region.end - headerLocal
				} } : {}
			});
			continue;
		}
		volumes.push({ header });
		if (options.skipNested || header.fileSystem === "unsupported") {
			searchFrom = Math.max(searchFrom, headerLocal + header.declaredLength + FV_HEADER_LAYOUT.signatureOffset);
		}
	}
	return {
		volumes,
		rejected,
		limit
	};
}
var FV_EXTENSION_ENTRY_HEADER_LENGTH, FV_EXT_TYPE_OEM, FV_EXT_TYPE_GUID, FV_EXT_TYPE_USED_SIZE, USED_SIZE_LENGTH, FVH_SIGNATURE, unsupportedVolumeBodyReason;
function init_FirmwareVolume() {
	return (init_FirmwareVolume = __esmMin((() => {
		init_budget();
		init_uefiLimits();
		init_binaryContainer();
		init_UefiBytes();
		init_UefiGuid();
		init_UefiCodeTables();
		init_FfsFile();
		FV_EXTENSION_ENTRY_HEADER_LENGTH = 4;
		FV_EXT_TYPE_OEM = 1;
		FV_EXT_TYPE_GUID = 2;
		FV_EXT_TYPE_USED_SIZE = 3;
		USED_SIZE_LENGTH = 4;
		FVH_SIGNATURE = 1213613663;
		unsupportedVolumeBodyReason = (header) => `Firmware volume at 0x${header.absoluteBase.toString(16)} has an unsupported file-system GUID (${header.fileSystemGuid ?? "unavailable"}); its body was not parsed.`;
	})))();
}

//#endregion
//#region dist/domain/firmware/uf2Families.js
var UF2_FAMILY_REGISTRY, UF2_FAMILY_NAMES, uf2FamilyName;
function init_uf2Families() {
	return (init_uf2Families = __esmMin((() => {
		UF2_FAMILY_REGISTRY = "microsoft/uf2 cf3bd7f9 utils/uf2families.json";
		UF2_FAMILY_NAMES = new Map([
			[475996592, "ESP32"],
			[3218951918, "ESP32S2"],
			[3296614247, "ESP32S3"],
			[822212545, "ESP32S31"],
			[730387100, "ESP32C2"],
			[3559628908, "ESP32C3"],
			[4145808195, "ESP32C5"],
			[1410195298, "ESP32C6"],
			[2010665156, "ESP32C61"],
			[858203894, "ESP32H2"],
			[3067936943, "ESP32H21"],
			[2651564682, "ESP32H4"],
			[1026592404, "ESP32P4"],
			[2125160941, "ESP8266"],
			[3834380118, "RP2040"],
			[3834380119, "RP2XXX_ABSOLUTE"],
			[3834380120, "RP2XXX_DATA"],
			[3834380121, "RP2350_ARM_S"],
			[3834380122, "RP2350_RISCV"],
			[3834380123, "RP2350_ARM_NS"],
			[1467308631, "STM32F4"],
			[2913282112, "NRF52840"],
			[1760373640, "SAMD21"],
			[1427194976, "SAMD51"],
			[2684343619, "RTL8710A"],
			[585160444, "RTL8710B"],
			[3767498084, "RTL8720C"],
			[863621090, "RTL8720D"],
			[1733968048, "BK7231U"],
			[2067722800, "BK7231N"],
			[1786956866, "BK7251"],
			[3725750455, "BL602"]
		]);
		uf2FamilyName = (familyId) => UF2_FAMILY_NAMES.get(familyId) ?? null;
	})))();
}

//#endregion
//#region dist/domain/firmware/uf2.js
var UF2_BLOCK_BYTES, UF2_DATA_OFFSET, UF2_DATA_BYTES, UF2_MD5_BYTES, UF2_MAGIC_START0, UF2_MAGIC_START1, UF2_MAGIC_END, UF2_FLAG_NOT_MAIN_FLASH, UF2_FLAG_FILE_CONTAINER, UF2_FLAG_FAMILY_ID, UF2_FLAG_MD5, UF2_FLAG_EXTENSION_TAGS, ADDRESS_SPACE, NAMED_GROUPS, UF2_MAX_FILE_BYTES, UF2_MAX_REGIONS, readUint32, hex32, familyText, named$1, hasUf2Block, createUf2Decoder, numberingFacts, StreamingUf2Decoder, blockSpan, mergeRuns, conflict;
function init_uf2() {
	return (init_uf2 = __esmMin((() => {
		init_boundedList();
		init_result();
		init_addressRuns();
		init_uf2Families();
		init_byteToHex();
		UF2_BLOCK_BYTES = 512;
		UF2_DATA_OFFSET = 32;
		UF2_DATA_BYTES = 476;
		UF2_MD5_BYTES = 24;
		UF2_MAGIC_START0 = 171066965;
		UF2_MAGIC_START1 = 2656915799;
		UF2_MAGIC_END = 179400496;
		UF2_FLAG_NOT_MAIN_FLASH = 1;
		UF2_FLAG_FILE_CONTAINER = 4096;
		UF2_FLAG_FAMILY_ID = 8192;
		UF2_FLAG_MD5 = 16384;
		UF2_FLAG_EXTENSION_TAGS = 32768;
		ADDRESS_SPACE = 4294967296;
		NAMED_GROUPS = 4;
		UF2_MAX_FILE_BYTES = 128 * 1024 * 1024;
		UF2_MAX_REGIONS = 65536;
		readUint32 = (bytes, offset) => ((bytes[offset] ?? 0) | (bytes[offset + 1] ?? 0) << 8 | (bytes[offset + 2] ?? 0) << 16 | (bytes[offset + 3] ?? 0) << 24) >>> 0;
		hex32 = (value) => `0x${value.toString(16).padStart(8, "0")}`;
		familyText = (familyId) => {
			if (familyId === null) return "no familyID";
			const name = uf2FamilyName(familyId);
			return name === null ? `family ${hex32(familyId)}` : `family ${hex32(familyId)} (${name})`;
		};
		named$1 = (items) => describeBoundedList(boundedList(items, NAMED_GROUPS), "; ");
		hasUf2Block = (prefix) => prefix.length >= 512 && readUint32(prefix, 0) === UF2_MAGIC_START0 && readUint32(prefix, 4) === UF2_MAGIC_START1 && readUint32(prefix, 512 - 4) === UF2_MAGIC_END;
		createUf2Decoder = (fileBytes) => Number.isSafeInteger(fileBytes) && fileBytes >= 0 && fileBytes <= 134217728 ? ok(new StreamingUf2Decoder(fileBytes)) : err({
			kind: "limit",
			boundary: "file-size",
			message: `file is ${String(fileBytes)} bytes, exceeding the fixed ${String(UF2_MAX_FILE_BYTES)}-byte (128 MiB) ceiling`
		});
		numberingFacts = (groups) => {
			let missing = 0;
			const absent = [];
			const ambiguous = [];
			for (const group of groups) {
				const seen = group.first.size;
				const name = `${familyText(group.familyId)} with ${String(group.declared)} numbered blocks`;
				if (seen < group.declared) {
					missing += group.declared - seen;
					absent.push(`${name} has ${String(seen)} of them`);
				}
				if (group.further.size === 0) continue;
				let most = 1;
				let fewest = group.further.size < group.addressedNumbers ? 1 : Number.MAX_SAFE_INTEGER;
				for (const further of group.further.values()) {
					most = Math.max(most, further.size + 1);
					fewest = Math.min(fewest, further.size + 1);
				}
				if (most !== fewest) ambiguous.push(`${name} has some numbers at ${String(fewest)} address(es) and others at ${String(most)}`);
			}
			return {
				missing,
				absent,
				ambiguous
			};
		};
		StreamingUf2Decoder = class {
			#block = new Uint8Array(512);
			#runs = [];
			#groups = new Map();
			#families = new Set();
			#arena;
			#arenaWriteOffset = 0;
			#blockLength = 0;
			#blockCount = 0;
			#invalid = 0;
			#firstInvalid;
			#flash = 0;
			#notMainFlash = 0;
			#notMainFlashBytes = 0;
			#fileContainer = 0;
			#md5 = 0;
			#extensionTags = 0;
			#repeated = 0;
			#outOfOrder = 0;
			#outOfRange = 0;
			constructor(fileBytes) {
				this.#arena = new Uint8Array(Math.floor(fileBytes / 512) * UF2_DATA_BYTES);
			}
			write(chunk) {
				let from = 0;
				while (from < chunk.length) {
					const count = Math.min(512 - this.#blockLength, chunk.length - from);
					this.#block.set(chunk.subarray(from, from + count), this.#blockLength);
					this.#blockLength += count;
					from += count;
					if (this.#blockLength < 512) break;
					this.#blockLength = 0;
					const decoded = this.#decodeBlock(this.#block);
					if (!decoded.ok) return decoded;
				}
				return ok(undefined);
			}
			finish() {
				const merged = mergeRuns(this.#runs, this.#arena);
				this.#arena = new Uint8Array(0);
				if (!merged.ok) return merged;
				const { regions, duplicateBytes } = merged.value;
				if (regions.length > 65536) return err({
					kind: "limit",
					boundary: "capacity",
					message: `payloads form ${String(regions.length)} address-discontiguous regions, more than the ${String(UF2_MAX_REGIONS)} retained as entries`
				});
				const numbering = numberingFacts(this.#groups.values());
				const limitations = this.#limitations(numbering);
				return ok({
					metadata: this.#metadata(regions, duplicateBytes, numbering),
					regions,
					complete: limitations.unknown.length === 0,
					limitations: [...limitations.unknown, ...limitations.known]
				});
			}
			#decodeBlock(block) {
				const index = this.#blockCount;
				this.#blockCount += 1;
				const flags = readUint32(block, 8);
				const fileContainer = (flags & UF2_FLAG_FILE_CONTAINER) !== 0;
				const nonflash = !fileContainer && (flags & UF2_FLAG_NOT_MAIN_FLASH) !== 0;
				const address = nonflash ? null : readUint32(block, 12);
				const size = readUint32(block, 16);
				const fault = readUint32(block, 0) !== UF2_MAGIC_START0 || readUint32(block, 4) !== UF2_MAGIC_START1 ? "start magic numbers do not match" : readUint32(block, 512 - 4) !== UF2_MAGIC_END ? "end magic number does not match" : size > UF2_DATA_BYTES ? `payload size ${String(size)} exceeds the ${String(UF2_DATA_BYTES)}-byte data area` : (flags & UF2_FLAG_MD5) !== 0 && size > UF2_DATA_BYTES - UF2_MD5_BYTES ? "payload overlaps the reserved MD5 checksum metadata" : address !== null && address + size > ADDRESS_SPACE ? `payload at ${hex32(address)} with ${String(size)} bytes wraps past 0xffffffff` : undefined;
				if (fault !== undefined) {
					this.#invalid += 1;
					this.#firstInvalid ??= {
						block: index,
						reason: fault
					};
					return ok(undefined);
				}
				const familyId = (flags & UF2_FLAG_FAMILY_ID) !== 0 ? readUint32(block, 28) : null;
				if ((flags & UF2_FLAG_MD5) !== 0) this.#md5 += 1;
				if ((flags & UF2_FLAG_EXTENSION_TAGS) !== 0) this.#extensionTags += 1;
				this.#number(familyId, readUint32(block, 24), readUint32(block, 20), address);
				if (fileContainer) {
					this.#fileContainer += 1;
					return ok(undefined);
				}
				if (address === null) {
					this.#notMainFlash += 1;
					this.#notMainFlashBytes += size;
					return ok(undefined);
				}
				this.#flash += 1;
				if (familyId !== null) this.#families.add(familyId);
				return this.#addData(index, familyId, address, block.subarray(UF2_DATA_OFFSET, UF2_DATA_OFFSET + size));
			}
			/** Numbering is per familyID and block count, as bootloaders ignore other families. */
			#number(familyId, declared, blockNo, address) {
				if (declared === 0 || blockNo >= declared) {
					this.#outOfRange += 1;
					return;
				}
				const key = `${familyId === null ? "none" : String(familyId)}:${String(declared)}`;
				let group = this.#groups.get(key);
				if (group === undefined) {
					group = {
						familyId,
						declared,
						first: new Map(),
						addressedNumbers: 0,
						further: new Map(),
						previous: -1
					};
					this.#groups.set(key, group);
				}
				const first = group.first.get(blockNo);
				if (first !== undefined) this.#repeated += 1;
				if (first === undefined || first === null && address !== null) {
					group.first.set(blockNo, address);
					if (address !== null) group.addressedNumbers += 1;
				} else if (address !== null && first !== address) {
					let further = group.further.get(blockNo);
					if (further === undefined) {
						further = new Set();
						group.further.set(blockNo, further);
					}
					further.add(address);
				}
				if (blockNo <= group.previous) this.#outOfOrder += 1;
				group.previous = blockNo;
			}
			#addData(block, familyId, address, data) {
				if (data.length === 0) return ok(undefined);
				if (this.#arenaWriteOffset + data.length > this.#arena.length) return err({
					kind: "limit",
					boundary: "file-size",
					message: `block ${String(block)}: payload bytes exceed ${String(UF2_DATA_BYTES)} per complete block of the admitted file size`
				});
				const run = this.#runs.at(-1);
				if (run !== undefined && run.familyId === familyId && run.address + run.length === address) {
					run.length += data.length;
					run.blockCount += 1;
					run.lastFileBlock = block;
				} else this.#runs.push({
					familyId,
					address,
					offset: this.#arenaWriteOffset,
					length: data.length,
					blockCount: 1,
					firstFileBlock: block,
					lastFileBlock: block
				});
				this.#arena.set(data, this.#arenaWriteOffset);
				this.#arenaWriteOffset += data.length;
				return ok(undefined);
			}
			/** Limitations that leave coverage unknown, then facts that do not. */
			#limitations(numbering) {
				const unknown = [];
				const known = [];
				if (this.#blockLength > 0) unknown.push(`UF2 file ends with ${String(this.#blockLength)} bytes after its last complete 512-byte block; the file may be truncated.`);
				if (this.#firstInvalid !== undefined) unknown.push(`${String(this.#invalid)} UF2 block(s) are invalid and were excluded; the first is block ${String(this.#firstInvalid.block)} at byte offset ${String(this.#firstInvalid.block * 512)}: ${this.#firstInvalid.reason}.`);
				if (numbering.missing > 0) unknown.push(`UF2 numbering declares ${String(numbering.missing)} block(s) that are absent: ${named$1(numbering.absent)}.`);
				if (numbering.ambiguous.length > 0) unknown.push(`UF2 numbering cannot show that every copy of a block sequence is complete: ${named$1(numbering.ambiguous)}.`);
				if (this.#outOfRange > 0) unknown.push(`${String(this.#outOfRange)} UF2 block(s) have a block number at or above their block count, so their numbering cannot establish completeness.`);
				if (this.#fileContainer > 0) unknown.push(`${String(this.#fileContainer)} UF2 block(s) belong to file containers (flag 0x1000); their files were not reconstructed.`);
				if (this.#notMainFlash > 0) known.push(`${String(this.#notMainFlash)} UF2 block(s) are flagged not main flash (flag 0x1); their ${String(this.#notMainFlashBytes)} payload bytes are in no region.`);
				if (this.#md5 > 0 || this.#extensionTags > 0) known.push(`${String(this.#md5)} UF2 block(s) declare an MD5 flash region (flag 0x4000) and ${String(this.#extensionTags)} declare extension tags (flag 0x8000); both are counted, not decoded or verified.`);
				return {
					unknown,
					known
				};
			}
			#metadata(regions, duplicateBytes, numbering) {
				return {
					kind: "uf2",
					block_count: this.#blockCount,
					trailing_bytes: this.#blockLength,
					invalid_block_count: this.#invalid,
					flash_block_count: this.#flash,
					not_main_flash_block_count: this.#notMainFlash,
					file_container_block_count: this.#fileContainer,
					md5_block_count: this.#md5,
					extension_tag_block_count: this.#extensionTags,
					family_count: this.#families.size,
					family_name_registry: UF2_FAMILY_REGISTRY,
					numbering_group_count: this.#groups.size,
					missing_block_count: numbering.missing,
					ambiguous_numbering_group_count: numbering.ambiguous.length,
					repeated_block_count: this.#repeated,
					out_of_order_block_count: this.#outOfOrder,
					block_number_out_of_range_count: this.#outOfRange,
					region_count: regions.length,
					data_bytes: regions.reduce((sum, region) => sum + region.bytes.length, 0),
					duplicate_bytes: duplicateBytes
				};
			}
		};
		blockSpan = (run) => run.firstFileBlock === run.lastFileBlock ? `block ${String(run.firstFileBlock)}` : `blocks ${String(run.firstFileBlock)}-${String(run.lastFileBlock)}`;
		mergeRuns = (runs, arena) => {
			const merged = mergeArenaRuns(runs, arena, (run) => run.familyId ?? -1);
			if (!merged.ok) return err(conflict(merged.error));
			return ok({
				regions: merged.value.ranges.map(({ start, bytes, runs: group }) => {
					const familyId = group[0]?.familyId ?? null;
					return {
						familyId,
						familyName: familyId === null ? null : uf2FamilyName(familyId),
						start,
						end: start + bytes.length - 1,
						bytes,
						blockCount: group.reduce((sum, run) => sum + run.blockCount, 0),
						firstFileBlock: group.reduce((block, run) => Math.min(block, run.firstFileBlock), Number.MAX_SAFE_INTEGER),
						lastFileBlock: group.reduce((block, run) => Math.max(block, run.lastFileBlock), 0)
					};
				}),
				duplicateBytes: merged.value.duplicateBytes
			});
		};
		conflict = ({ address, writer, run, existing, incoming }) => ({
			kind: "format",
			message: `${familyText(run.familyId)} address ${hex32(address)} is written with different values by ${blockSpan(writer)} (0x${byteToHex(existing)}) and ${blockSpan(run)} (0x${byteToHex(incoming)})`
		});
	})))();
}

//#endregion
//#region dist/domain/uimageFormat.js
var UIMAGE_MAGIC, UIMAGE_HEADER_SIZE, UIMAGE_NAME_LENGTH, UIMAGE_MAX_SUB_IMAGES, UIMAGE_SIZE_ENTRY_BYTES, UIMAGE_MULTI_TABLE_WINDOW, hasUImageSizeTable, ARCH_NAMES, OS_NAMES, TYPE_NAMES, COMPRESSION_NAMES, named, malformed, UTF8, hasUImageMagic, parseUImageHeaderFields, parseMultiImageTable;
function init_uimageFormat() {
	return (init_uimageFormat = __esmMin((() => {
		init_binaryContainer();
		init_result();
		init_strictUtf8();
		UIMAGE_MAGIC = 654645590;
		UIMAGE_HEADER_SIZE = 64;
		UIMAGE_NAME_LENGTH = 32;
		UIMAGE_MAX_SUB_IMAGES = 4096;
		UIMAGE_SIZE_ENTRY_BYTES = 4;
		UIMAGE_MULTI_TABLE_WINDOW = (UIMAGE_MAX_SUB_IMAGES + 1) * UIMAGE_SIZE_ENTRY_BYTES;
		hasUImageSizeTable = (type) => type === 4 || type === 6;
		ARCH_NAMES = {
			0: "invalid",
			1: "alpha",
			2: "arm",
			3: "x86",
			4: "ia64",
			5: "mips",
			6: "mips64",
			7: "ppc",
			8: "s390",
			9: "sh",
			10: "sparc",
			11: "sparc64",
			12: "m68k",
			13: "nios",
			14: "microblaze",
			15: "nios2",
			16: "blackfin",
			17: "avr32",
			18: "st200",
			19: "sandbox",
			20: "nds32",
			21: "openrisc",
			22: "arm64",
			23: "arc",
			24: "x86_64",
			25: "xtensa",
			26: "riscv"
		};
		OS_NAMES = {
			0: "invalid",
			1: "openbsd",
			2: "netbsd",
			3: "freebsd",
			4: "4_4bsd",
			5: "linux",
			6: "svr4",
			7: "esix",
			8: "solaris",
			9: "irix",
			10: "sco",
			11: "dell",
			12: "ncr",
			13: "lynxos",
			14: "vxworks",
			15: "psos",
			16: "qnx",
			17: "u-boot",
			18: "rtems",
			19: "artos",
			20: "unity",
			21: "integrity",
			22: "ose",
			23: "plan9",
			24: "openrtos",
			25: "arm-trusted-firmware",
			26: "tee",
			27: "opensbi",
			28: "efi",
			29: "elf"
		};
		TYPE_NAMES = {
			0: "invalid",
			1: "standalone",
			2: "kernel",
			3: "ramdisk",
			4: "multi",
			5: "firmware",
			6: "script",
			7: "filesystem",
			8: "flat_dt",
			9: "kwbimage",
			10: "imximage",
			11: "ublimage",
			12: "omapimage",
			13: "aisimage",
			14: "kernel_noload",
			15: "pblimage",
			16: "mxsimage",
			17: "gpimage",
			18: "atmelimage",
			19: "socfpgaimage",
			20: "x86_setup",
			21: "lpc32xximage",
			22: "loadable",
			23: "rkimage",
			24: "rksd",
			25: "rkspi",
			26: "zynqimage",
			27: "zynqmpimage",
			28: "zynqmpbif",
			29: "fpga",
			30: "vybridimage",
			31: "tee",
			32: "firmware_ivt",
			33: "pmmc",
			34: "stm32image",
			35: "socfpgaimage_v1",
			36: "mtk_image",
			37: "imx8mimage",
			38: "imx8image",
			39: "copro",
			40: "sunxi_egon",
			41: "sunxi_toc0",
			42: "fdt_legacy",
			43: "spkgimage",
			44: "sfspl",
			45: "tfa-bl31",
			46: "stm32imagev2",
			47: "amlimage"
		};
		COMPRESSION_NAMES = {
			0: "none",
			1: "gzip",
			2: "bzip2",
			3: "lzma",
			4: "lzo",
			5: "lz4",
			6: "zstd"
		};
		named = (table, value) => table[value] ?? "unknown";
		malformed = (message) => ({
			_tag: "UImageFormatFailure",
			message
		});
		UTF8 = strictUtf8Decoder("preserve");
		hasUImageMagic = (prefix) => prefix.length >= 4 && new BinaryReader$1(prefix, false, "uimage").u32(0) === 654645590;
		parseUImageHeaderFields = (header) => {
			if (header.length < 64) return err(malformed(`uImage header is truncated: ${header.length} bytes, expected ${64}`));
			const reader = new BinaryReader$1(header.subarray(0, 64), false, "uimage");
			const magic = reader.u32(0);
			if (magic !== 654645590) return err(malformed(`uImage magic mismatch: expected 0x${UIMAGE_MAGIC.toString(16)}, found 0x${magic.toString(16)}`));
			const declaredHeaderCrc = reader.u32(4);
			const zeroed = Buffer.from(reader.bytes);
			zeroed.writeUInt32BE(0, 4);
			const computedHeaderCrc = crc32(zeroed);
			if (computedHeaderCrc !== declaredHeaderCrc) return err(malformed(`uImage header CRC32 mismatch: declared 0x${declaredHeaderCrc.toString(16)}, computed 0x${computedHeaderCrc.toString(16)}`));
			const timestamp = reader.u32(8);
			const nameBytes = reader.range(32, 32, "uImage image name");
			const nul = nameBytes.indexOf(0);
			let name;
			try {
				name = UTF8.decode(nameBytes.subarray(0, nul === -1 ? 32 : nul));
			} catch {
				name = null;
			}
			const os = reader.bytes[28] ?? 0;
			const arch = reader.bytes[29] ?? 0;
			const type = reader.bytes[30] ?? 0;
			const compression = reader.bytes[31] ?? 0;
			return ok({
				magic,
				timestamp,
				timestampIso: new Date(timestamp * 1e3).toISOString(),
				payloadSize: reader.u32(12),
				loadAddress: reader.u32(16),
				entryPoint: reader.u32(20),
				headerCrc32: declaredHeaderCrc,
				dataCrc32: reader.u32(24),
				os,
				osName: named(OS_NAMES, os),
				arch,
				archName: named(ARCH_NAMES, arch),
				type,
				typeName: named(TYPE_NAMES, type),
				compression,
				compressionName: named(COMPRESSION_NAMES, compression),
				name,
				nameBytesHex: nameBytes.toString("hex")
			});
		};
		parseMultiImageTable = (prefix, payloadSize) => {
			if (!Number.isSafeInteger(payloadSize) || payloadSize < 0) return err(malformed("uImage payload size is not an exact nonnegative extent"));
			const table = new BinaryReader$1(prefix.subarray(0, Math.min(prefix.length, payloadSize)), false, "uimage");
			const sizes = [];
			let cursor = 0;
			for (;;) {
				if (cursor + UIMAGE_SIZE_ENTRY_BYTES > table.bytes.length) return err(malformed("uImage multi-image size table has no zero terminator inside the payload"));
				const size = table.u32(cursor);
				cursor += UIMAGE_SIZE_ENTRY_BYTES;
				if (size === 0) break;
				sizes.push(size);
				if (sizes.length > 4096) {
					const minimumData = sizes.reduce((total, current, index) => total + (index + 1 < sizes.length ? Math.ceil(current / 4) * 4 : current), 0);
					if (cursor + UIMAGE_SIZE_ENTRY_BYTES + minimumData > payloadSize) return err(malformed("uImage multi-image table and declared sub-images cannot fit in the payload"));
					return err({
						_tag: "UImageCapacityFailure",
						message: `uImage multi-image table declares more than ${UIMAGE_MAX_SUB_IMAGES} sub-images`
					});
				}
			}
			const subImages = [];
			let offset = 64 + cursor;
			for (const [index, size] of sizes.entries()) {
				if (offset + size > 64 + payloadSize) return err(malformed(`uImage multi-image sub-image ${index} of ${size} bytes overruns the ${payloadSize}-byte payload`));
				subImages.push({
					index,
					byteOffset: offset,
					declaredSize: size
				});
				offset += index + 1 < sizes.length ? Math.ceil(size / 4) * 4 : size;
			}
			return ok(subImages);
		};
	})))();
}

//#endregion
//#region dist/domain/unityfsFormat.js
var UNITYFS_SIGNATURE, hasUnityFsHeader, UNITYFS_FLAG_COMPRESSION_MASK, UNITYFS_FLAG_BLOCKS_INFO_AT_END, UNITYFS_FLAG_PADDING_OR_LEGACY_ENCRYPTION, UNITYFS_FLAG_USES_BUNDLE_ENCRYPTION, UNITYFS_COMPRESSION_NONE, UNITYFS_COMPRESSION_LZ4, UNITYFS_COMPRESSION_LZ4HC, UNITYFS_FORMAT_VERSION_MIN, UNITYFS_FORMAT_VERSION_MAX, unityfsHeaderAligned, parseUnityFsRevision, hasModernUnityFsFlags, unityFsLayoutFlags, UNITYFS_HEADER_STRING_MAX, UNITYFS_VERSION_STRINGS_OFFSET, UNITYFS_HEADER_TAIL_BYTES, UNITYFS_HEADER_PREFIX_BYTES, utf8, readUnityFsHeaderFacts;
function init_unityfsFormat() {
	return (init_unityfsFormat = __esmMin((() => {
		init_binaryContainer();
		init_strictUtf8();
		UNITYFS_SIGNATURE = Buffer.from("UnityFS\0", "latin1");
		hasUnityFsHeader = (bytes) => bytes.length >= UNITYFS_SIGNATURE.length && Buffer.from(bytes.buffer, bytes.byteOffset, UNITYFS_SIGNATURE.length).equals(UNITYFS_SIGNATURE);
		UNITYFS_FLAG_COMPRESSION_MASK = 63;
		UNITYFS_FLAG_BLOCKS_INFO_AT_END = 128;
		UNITYFS_FLAG_PADDING_OR_LEGACY_ENCRYPTION = 512;
		UNITYFS_FLAG_USES_BUNDLE_ENCRYPTION = 5120;
		UNITYFS_COMPRESSION_NONE = 0;
		UNITYFS_COMPRESSION_LZ4 = 2;
		UNITYFS_COMPRESSION_LZ4HC = 3;
		UNITYFS_FORMAT_VERSION_MIN = 6;
		UNITYFS_FORMAT_VERSION_MAX = 8;
		unityfsHeaderAligned = (formatVersion, engineMajor, engineMinor, enginePatch) => formatVersion >= 7 || engineMajor === 2019 && engineMinor === 4 && enginePatch !== undefined && enginePatch >= 15;
		parseUnityFsRevision = (value) => {
			const match = /^([1-9]\d*)\.(\d+)\.(\d+)(?:[abfp]\d+(?:c\d+)?)?$/u.exec(value);
			if (match === null) return undefined;
			const major = Number(match[1]), minor = Number(match[2]), patch = Number(match[3]);
			return [
				major,
				minor,
				patch
			].every(Number.isSafeInteger) ? [
				major,
				minor,
				patch
			] : undefined;
		};
		hasModernUnityFsFlags = ([major, minor, patch]) => {
			if (major < 2020) return false;
			if (major > 2022) return true;
			const minorThreshold = major === 2022 ? 1 : 3;
			const patchThreshold = major === 2020 ? 34 : major === 2021 ? 2 : 1;
			return minor > minorThreshold || minor === minorThreshold && patch >= patchThreshold;
		};
		unityFsLayoutFlags = (formatVersion, engineVersion, flags) => {
			const revision = parseUnityFsRevision(engineVersion);
			const reusedBit = (flags & UNITYFS_FLAG_PADDING_OR_LEGACY_ENCRYPTION) !== 0;
			const modernBits = (flags & UNITYFS_FLAG_USES_BUNDLE_ENCRYPTION) !== 0;
			if (revision === undefined) return {
				headerAligned: formatVersion >= 7 ? true : undefined,
				dataPadding: reusedBit ? undefined : false,
				encrypted: reusedBit || modernBits ? undefined : false
			};
			const modern = hasModernUnityFsFlags(revision);
			return {
				headerAligned: unityfsHeaderAligned(formatVersion, ...revision),
				dataPadding: modern && reusedBit,
				encrypted: modern ? modernBits : modernBits ? undefined : reusedBit
			};
		};
		UNITYFS_HEADER_STRING_MAX = 1024;
		UNITYFS_VERSION_STRINGS_OFFSET = UNITYFS_SIGNATURE.length + 4;
		UNITYFS_HEADER_TAIL_BYTES = 8 + 4 + 4 + 4;
		UNITYFS_HEADER_PREFIX_BYTES = UNITYFS_VERSION_STRINGS_OFFSET + 2 * UNITYFS_HEADER_STRING_MAX + UNITYFS_HEADER_TAIL_BYTES;
		utf8 = strictUtf8Decoder("preserve");
		readUnityFsHeaderFacts = (bytes) => {
			if (!hasUnityFsHeader(bytes)) return undefined;
			let cursor = UNITYFS_VERSION_STRINGS_OFFSET;
			const readString = () => {
				const start = cursor;
				while (cursor < bytes.length && cursor - start < UNITYFS_HEADER_STRING_MAX) {
					if (bytes[cursor] === 0) {
						const value = bytes.subarray(start, cursor);
						cursor += 1;
						try {
							return utf8.decode(value);
						} catch {
							return undefined;
						}
					}
					cursor += 1;
				}
				return undefined;
			};
			const playerVersion = readString();
			const engineVersion = readString();
			if (playerVersion === undefined || engineVersion === undefined || cursor + UNITYFS_HEADER_TAIL_BYTES > bytes.length) return undefined;
			const fixed = cursor;
			const reader = new BinaryReader$1(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), false, "unityfs");
			return {
				formatVersion: reader.u32(8),
				playerVersion,
				engineVersion,
				declaredSize: reader.word(fixed, 64),
				compressedBlocksInfoSize: reader.u32(fixed + 8),
				uncompressedBlocksInfoSize: reader.u32(fixed + 12),
				flags: reader.u32(fixed + 16),
				afterFixed: fixed + UNITYFS_HEADER_TAIL_BYTES
			};
		};
	})))();
}

//#endregion
//#region dist/domain/wxapkgFormat.js
var WXAPKG_FIRST_MARK, WXAPKG_LAST_MARK, WXAPKG_HEADER_BYTES, WXAPKG_MIN_ROW_BYTES, WXAPKG_MEMBER_COUNT_BYTES, WXAPKG_ENCRYPTED_MAGIC, hasWxapkgEncryptedMagic, hasWxapkgHeader, readWxapkgHeaderFacts, spanEnd, indexLayout, resolveWxapkgIndexLayouts, memberFitsIndex, admitWxapkgMemberExtents;
function init_wxapkgFormat() {
	return (init_wxapkgFormat = __esmMin((() => {
		init_binaryContainer();
		init_result();
		WXAPKG_FIRST_MARK = 190;
		WXAPKG_LAST_MARK = 237;
		WXAPKG_HEADER_BYTES = 18;
		WXAPKG_MIN_ROW_BYTES = 12;
		WXAPKG_MEMBER_COUNT_BYTES = 4;
		WXAPKG_ENCRYPTED_MAGIC = Buffer.from("V1MMWX", "latin1");
		hasWxapkgEncryptedMagic = (bytes) => bytes.length >= WXAPKG_ENCRYPTED_MAGIC.length && Buffer.from(bytes.buffer, bytes.byteOffset, WXAPKG_ENCRYPTED_MAGIC.length).equals(WXAPKG_ENCRYPTED_MAGIC);
		hasWxapkgHeader = (bytes) => bytes.length >= 18 && bytes[0] === 190 && bytes[13] === 237;
		readWxapkgHeaderFacts = (bytes) => {
			if (!hasWxapkgHeader(bytes)) return undefined;
			const reader = new BinaryReader$1(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), false, "wxapkg");
			const info = reader.u32(1);
			const indexLength = reader.u32(5);
			const dataLength = reader.u32(9);
			const fileCount = reader.u32(14);
			if (fileCount === 0 || indexLength < fileCount * 12) return undefined;
			return {
				info,
				indexLength,
				dataLength,
				fileCount
			};
		};
		spanEnd = (start, length) => {
			if (!Number.isSafeInteger(start) || !Number.isSafeInteger(length) || length < 0) return undefined;
			const end = start + length;
			return Number.isSafeInteger(end) ? end : undefined;
		};
		indexLayout = (facts, fileSize, includedCountBytes) => {
			if (!Number.isSafeInteger(facts.indexLength) || !Number.isSafeInteger(facts.fileCount) || facts.fileCount < 0 || facts.indexLength < includedCountBytes) return "too-small";
			const tableBytes = facts.indexLength - includedCountBytes;
			if (tableBytes < facts.fileCount * 12) return "too-small";
			const dataStart = spanEnd(18, tableBytes);
			if (dataStart === undefined || dataStart > fileSize) return "index-outside";
			const dataEnd = spanEnd(dataStart, facts.dataLength);
			if (dataEnd === undefined || dataEnd > fileSize) return "data-outside";
			return {
				tableStart: 18,
				tableBytes,
				dataStart,
				dataEnd
			};
		};
		resolveWxapkgIndexLayouts = (facts, fileSize) => {
			if (!Number.isSafeInteger(fileSize) || fileSize < 0) return err({ _tag: "IndexExceedsFile" });
			const described = [WXAPKG_MEMBER_COUNT_BYTES, 0].map((included) => indexLayout(facts, fileSize, included));
			const admissible = described.filter((layout) => typeof layout !== "string");
			if (admissible.length === 0) return err({ _tag: described.some((layout) => layout === "data-outside") ? "DataRegionExceedsFile" : "IndexExceedsFile" });
			return ok(admissible);
		};
		memberFitsIndex = (layout, member) => {
			const extentEnd = member.offset + member.size;
			return member.offset >= layout.dataStart && extentEnd <= layout.dataEnd && extentEnd >= member.offset;
		};
		admitWxapkgMemberExtents = (layouts, consumedRowBytes, members) => {
			const candidates = layouts.filter((layout) => layout.tableBytes >= consumedRowBytes);
			if (candidates.length === 0) return err({ _tag: "TruncatedRows" });
			if (candidates.some((layout) => members.every((member) => memberFitsIndex(layout, member)))) return ok(undefined);
			const outside = members.find((member) => candidates.every((layout) => !memberFitsIndex(layout, member)));
			return outside !== undefined ? err({
				_tag: "MemberOutsideDataRegion",
				member: outside
			}) : err({ _tag: "ConflictingMemberExtents" });
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/fitImage.js
var hasFitImagesNode;
function init_fitImage() {
	return (init_fitImage = __esmMin((() => {
		init_binaryContainer();
		init_devicetreeHeader();
		hasFitImagesNode = (prefix) => {
			if (!hasDevicetreeMagic(prefix)) return false;
			const bytes = prefix.subarray(0, 4096);
			let extent;
			try {
				extent = readDevicetreeHeader(bytes);
			} catch (cause) {
				if (cause instanceof BinaryFormatFailure) return false;
				throw cause;
			}
			const start = extent.header.off_dt_struct;
			const end = Math.min(bytes.length, extent.header.totalsize, extent.structureEnd);
			const structurePrefix = bytes.subarray(0, end);
			const reader = new BinaryReader$1(structurePrefix, false, "fit");
			let cursor = start;
			let depth = 0;
			while (cursor <= end - 4) {
				const token = reader.u32(cursor);
				if (token === 1) {
					const nul = structurePrefix.indexOf(0, cursor + 4);
					if (nul < 0) return false;
					const next = Math.ceil((nul + 1) / 4) * 4;
					if (next > end) return false;
					const name = String.fromCharCode(...bytes.subarray(cursor + 4, nul));
					if (depth === 0 && name !== "") return false;
					if (depth === 1 && name === "images") return true;
					depth += 1;
					cursor = next;
				} else if (token === 2) {
					depth -= 1;
					if (depth <= 0) return false;
					cursor += 4;
				} else if (token === 3) {
					if (cursor > end - 12) return false;
					cursor += Math.ceil((12 + reader.u32(cursor + 4)) / 4) * 4;
				} else if (token === 4) cursor += 4;
				else return false;
			}
			return false;
		};
	})))();
}

//#endregion
//#region dist/domain/artifactFormatRecognition.js
var when, ARTIFACT_FORMAT_RECOGNIZERS, recognizeArtifactFormat;
function init_artifactFormatRecognition() {
	return (init_artifactFormatRecognition = __esmMin((() => {
		init_androidBootImageFormat();
		init_appleArchiveFormat();
		init_dfuse();
		init_espImage();
		init_fitImage();
		init_hexRecords();
		init_uf2();
		init_godotPckFormat();
		init_inesContainer();
		init_androidOtaPayload();
		init_uimageFormat();
		init_unityfsFormat();
		init_ntfsMft();
		init_wxapkgFormat();
		init_zipPackageFormat();
		when = (format, claims) => ({ prefix }) => claims(prefix) ? {
			state: "recognized",
			format
		} : undefined;
		ARTIFACT_FORMAT_RECOGNIZERS = [
			({ prefix, fileSize }) => {
				if (nesContainerFormat(prefix) === undefined) return undefined;
				const layout = parseInesLayout(prefix, fileSize);
				return layout.ok ? {
					state: "recognized",
					format: "ines"
				} : {
					state: "refused",
					format: "ines",
					reason: layout.error.detail
				};
			},
			when("zip", hasZipSignature),
			when("godot-pck", hasGodotPckHeader),
			when("unityfs", hasUnityFsHeader),
			when("wxapkg", (prefix) => hasWxapkgEncryptedMagic(prefix) || hasWxapkgHeader(prefix)),
			when("uimage", hasUImageMagic),
			when("android-boot-image", hasAndroidBootImageMagic),
			({ prefix }) => {
				const ota = recognizeAndroidOtaPayload(prefix);
				if (ota === undefined) return undefined;
				return ota.state === "recognized" ? {
					state: "recognized",
					format: "android-ota-payload"
				} : {
					state: "refused",
					format: "android-ota-payload",
					reason: ota.reason
				};
			},
			({ prefix }) => {
				const format = detectHexRecordEncoding(prefix);
				return format === undefined ? undefined : {
					state: "recognized",
					format
				};
			},
			when("uf2", hasUf2Block),
			({ prefix, suffix, fileSize }) => {
				if (!hasDfuSePrefix(prefix)) return undefined;
				if (suffix === undefined) return {
					state: "needs-input",
					format: "dfuse"
				};
				return isDfuSeFile(prefix, suffix, fileSize) ? {
					state: "recognized",
					format: "dfuse"
				} : undefined;
			},
			({ espFlashLayout }) => espFlashLayout === undefined ? {
				state: "needs-input",
				format: "esp-flash-image"
			} : espFlashLayout ? {
				state: "recognized",
				format: "esp-flash-image"
			} : undefined,
			({ prefix, fileSize }) => {
				const esp = recognizeEspImage(prefix, fileSize);
				if (esp === undefined) return undefined;
				return esp === "esp-image" ? {
					state: "recognized",
					format: "esp-image"
				} : {
					state: "refused",
					format: "esp-image",
					reason: ESP8266_REFUSAL
				};
			},
			when("fit", hasFitImagesNode),
			when("ntfs-mft", hasMftFileRecordHeader),
			when("plist", hasBinaryPlistSignature)
		];
		recognizeArtifactFormat = (input, from = 0) => {
			for (let index = from; index < ARTIFACT_FORMAT_RECOGNIZERS.length; index++) {
				const recognition = ARTIFACT_FORMAT_RECOGNIZERS[index](input);
				if (recognition !== undefined) return {
					...recognition,
					index
				};
			}
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/uefi/UefiFormatProbe.js
/**
* Admit one volume whose header passes the full header plausibility checks
* (checksum, block-map terminator, mapped extent) and declares the FFS2
* or FFS3 file system. Rejected signature hits stay inconclusive so plain
* bytes containing `_FVH` cannot claim the format.
*/
function admitUefiFlashImage(buffer, signatureEnd = buffer.length) {
	const region = imageRegion(buffer, 0, buffer.length);
	const scan = scanFirmwareVolumes(region, PROBE_CANDIDATE_BUDGET, { signatureEnd });
	return scan.volumes.some(({ header }) => header.checksumValid && header.absoluteBase % VOLUME_ALIGNMENT_BYTES === 0 && header.fileSystem !== "unsupported");
}
/**
* Detect a PI flash image through an aligned `_FVH` plausibility probe over
* the declared admission prefix (1 MiB). The prefix decides most misses
* cheaply; only files that actually carry the signature cost a bounded
* whole-image read. Images whose first volume lies beyond the prefix stay
* unrecognized — an honest admission gap, noted in the probe contract.
*/
async function probeUefiFlashImage(handle, signal) {
	const throwIfCancelled = () => {
		if (signal?.aborted === true) throw cancelledBy("resolve_binary_target", signal);
	};
	throwIfCancelled();
	const { size } = await handle.stat();
	const prefix = await readFileHandleRange(handle, 0, Math.min(UEFI_FIRMWARE_LIMITS.scanProbeBytes, size), throwIfCancelled);
	throwIfCancelled();
	if (claimsExecutableHeader(prefix, size) || !prefix.includes("_FVH", "ascii")) return false;
	const readLimit = Math.min(UEFI_FIRMWARE_LIMITS.inputBytes, size);
	const observed = readLimit <= prefix.length ? prefix : await readFileHandleRange(handle, 0, readLimit, throwIfCancelled);
	throwIfCancelled();
	return admitUefiFlashImage(observed, prefix.length);
}
var PROBE_CANDIDATE_BUDGET, VOLUME_ALIGNMENT_BYTES;
function init_UefiFormatProbe() {
	return (init_UefiFormatProbe = __esmMin((() => {
		init_readFileHandleRange();
		init_binaryTarget();
		init_analysisErrorCore();
		init_UefiBytes();
		init_FirmwareVolume();
		init_uefiLimits();
		PROBE_CANDIDATE_BUDGET = 64;
		VOLUME_ALIGNMENT_BYTES = 16;
	})))();
}

//#endregion
//#region dist/domain/artifactNameSelection.js
var namedArtifactFormat, artifactNameForClassification;
function init_artifactNameSelection() {
	return (init_artifactNameSelection = __esmMin((() => {
		init_zipPackageFormat();
		namedArtifactFormat = (path) => {
			const lower = path.toLowerCase();
			if (lower.endsWith(".asar")) return "asar";
			if (lower.endsWith(".plist")) return "plist";
			if (lower.endsWith(".map")) return "source-map";
			return /\.(?:m?js|cjs)$/u.test(lower) ? "javascript" : undefined;
		};
		artifactNameForClassification = (selectedPath, canonicalPath) => namedArtifactFormat(selectedPath) !== undefined || zipPackageFormatForPath(selectedPath) !== undefined || /\.(?:app|pkg|dmg)$/iu.test(selectedPath) ? selectedPath : canonicalPath;
	})))();
}

//#endregion
//#region dist/domain/apple/diskImageFormat.js
var UDIF_TRAILER_BYTES, UDIF_TRAILER_SIGNATURE, GPT_BLOCK_BYTES, GPT_MIN_HEADER_BYTES, GPT_HEADER_SIGNATURE, GPT_REVISION_1_0, HFS_PLUS_HEADER_END, RAW_SIGNATURE_PREFIX_BYTES, hasDiskImageSignature, hasRawDiskImageSignature, hasGptHeader, hasApplePartitionMap, hasMbrPartitionTable, hasHfsPlusVolumeHeader;
function init_diskImageFormat() {
	return (init_diskImageFormat = __esmMin((() => {
		init_binaryContainer();
		UDIF_TRAILER_BYTES = 512;
		UDIF_TRAILER_SIGNATURE = Buffer.from("koly");
		GPT_BLOCK_BYTES = 512;
		GPT_MIN_HEADER_BYTES = 92;
		GPT_HEADER_SIGNATURE = Buffer.from("EFI PART");
		GPT_REVISION_1_0 = 65536;
		HFS_PLUS_HEADER_END = 1028;
		RAW_SIGNATURE_PREFIX_BYTES = HFS_PLUS_HEADER_END;
		hasDiskImageSignature = async (size, read) => {
			if (!Number.isSafeInteger(size) || size <= 0) return false;
			if (size >= UDIF_TRAILER_BYTES) {
				const trailer = await read(size - UDIF_TRAILER_BYTES, UDIF_TRAILER_SIGNATURE.length);
				if (Buffer.from(trailer).equals(UDIF_TRAILER_SIGNATURE)) return true;
			}
			return hasRawDiskImageSignature(Buffer.from(await read(0, Math.min(size, RAW_SIGNATURE_PREFIX_BYTES))));
		};
		hasRawDiskImageSignature = (prefix) => hasGptHeader(prefix) || hasApplePartitionMap(prefix) || hasMbrPartitionTable(prefix) || hasHfsPlusVolumeHeader(prefix);
		hasGptHeader = (prefix) => {
			const header = prefix.subarray(GPT_BLOCK_BYTES);
			if (header.length < GPT_MIN_HEADER_BYTES) return false;
			if (!header.subarray(0, 8).equals(GPT_HEADER_SIGNATURE)) return false;
			const reader = new BinaryReader$1(header, true, "GPT");
			const headerSize = reader.u32(12);
			return reader.u32(8) === GPT_REVISION_1_0 && headerSize >= GPT_MIN_HEADER_BYTES && headerSize <= GPT_BLOCK_BYTES && headerSize <= header.length;
		};
		hasApplePartitionMap = (prefix) => prefix.length >= 514 && prefix[0] === 69 && prefix[1] === 82 && prefix[512] === 80 && prefix[513] === 77;
		hasMbrPartitionTable = (prefix) => {
			if (prefix.length < 512 || prefix[510] !== 85 || prefix[511] !== 170) return false;
			const reader = new BinaryReader$1(prefix, true, "MBR");
			let used = false;
			for (let entry = 446; entry < 510; entry += 16) {
				const status = prefix[entry];
				if (status !== 0 && status !== 128) return false;
				used ||= prefix[entry + 4] !== 0 && reader.u32(entry + 12) !== 0;
			}
			return used;
		};
		hasHfsPlusVolumeHeader = (prefix) => {
			if (prefix.length < HFS_PLUS_HEADER_END || prefix[1024] !== 72) return false;
			const version = new BinaryReader$1(prefix, false, "HFS").u16(1026);
			return prefix[1025] === 43 && version === 4 || prefix[1025] === 88 && version === 5;
		};
	})))();
}

//#endregion
//#region dist/process/ProviderOutcome.js
function providerOutcomeOf(cause) {
	if (cause instanceof OwnedCommandFailure) return ownedCommandOutcome(cause);
	const failure = launcherFailureOf(cause);
	if (failure === undefined || !(cause instanceof Error)) return undefined;
	return {
		kind: "launch-failed",
		failure,
		cause,
		message: cause.message,
		output: undefined
	};
}
var outputOf, ownedCommandOutcome;
function init_ProviderOutcome() {
	return (init_ProviderOutcome = __esmMin((() => {
		init_launchFailure();
		init_OwnedCommand();
		outputOf = (snapshot) => snapshot === null ? undefined : {
			snapshot,
			truncated: snapshot.diagnosticTruncated === true || snapshot.outputIncomplete === true
		};
		ownedCommandOutcome = (failure) => {
			const facts = {
				cause: failure,
				message: failure.message,
				output: outputOf(failure.snapshot)
			};
			if (failure.reason === "cancelled") return {
				...facts,
				kind: "cancelled",
				reason: failure.cancellation === undefined ? failure : failure.cancellation.reason
			};
			if (failure.snapshot?.memoryLimitReached === true) return {
				...facts,
				kind: "memory-limit"
			};
			const snapshot = failure.snapshot;
			if (snapshot?.runtimeExhaustion !== undefined && !failure.collectionFailure && (failure.reason === "process" || failure.reason === "output-limit")) return {
				...facts,
				kind: "runtime-exhausted",
				exhaustion: snapshot.runtimeExhaustion,
				exitCode: snapshot.exitCode ?? null,
				signal: snapshot.signal ?? null
			};
			if (failure.reason !== "process") return {
				...facts,
				kind: failure.reason
			};
			if (failure.collectionFailure || snapshot === null) return {
				...facts,
				kind: "protocol"
			};
			if (snapshot.signal === "SIGXCPU" || snapshot.signal === "SIGXFSZ") return {
				...facts,
				kind: "resource-signal",
				signal: snapshot.signal
			};
			return {
				...facts,
				kind: "exited",
				exitCode: snapshot.exitCode ?? null,
				signal: snapshot.signal ?? null,
				stopRequested: snapshot.stopRequested === true
			};
		};
	})))();
}

//#endregion
//#region dist/domain/unclassifiedProviderFailure.js
var UnclassifiedProviderFailure;
function init_unclassifiedProviderFailure() {
	return (init_unclassifiedProviderFailure = __esmMin((() => {
		init_providerAdapterError();
		UnclassifiedProviderFailure = class extends ProviderAdapterError {
			examined;
			constructor(providerId, operation, examined, options = {}) {
				super(providerId, operation, {
					...options,
					diagnostics: {
						...options.diagnostics,
						...examined
					}
				});
				this.examined = examined;
			}
		};
	})))();
}

//#endregion
//#region dist/process/classifyProviderOutcome.js
var RUNTIME_NAMES, AREA_NAMES, EXHAUSTED_RESOURCE_NAMES, classifyLaunchFailure, examinedOutcome, classifyProviderOutcome;
function init_classifyProviderOutcome() {
	return (init_classifyProviderOutcome = __esmMin((() => {
		init_analysisErrorCore();
		init_unclassifiedProviderFailure();
		init_launchFailure();
		init_RuntimeExhaustion();
		RUNTIME_NAMES = {
			jvm: "The provider's Java virtual machine",
			v8: "The provider's JavaScript runtime"
		};
		AREA_NAMES = {
			heap: "heap",
			"gc-overhead": "garbage-collection overhead limit",
			metaspace: "metaspace",
			"array-size": "array size beyond the VM limit",
			"native-thread": "unable to create a native thread"
		};
		EXHAUSTED_RESOURCE_NAMES = {
			processes: "process",
			memory: "memory",
			"file-descriptors": "file-descriptor"
		};
		classifyLaunchFailure = (failure, context) => {
			const { operation } = context;
			const command = failure.executable ?? context.command;
			const subject = command ?? "the provider command";
			const launchFacts = {
				system_code: failure.code ?? null,
				...failure.syscall === undefined ? {} : { syscall: failure.syscall },
				...command === undefined ? {} : { command }
			};
			const details = {
				...context.details,
				diagnostics: {
					...context.details?.diagnostics,
					...launchFacts,
					boundary: failure.kind === "host-exhausted" ? "host-capacity" : "provider-launch"
				}
			};
			const unchanged = `${context.selection ?? "the selected command"} does not need to change`;
			switch (failure.kind) {
				case "host-exhausted": {
					const name = EXHAUSTED_RESOURCE_NAMES[failure.resource];
					return new AnalysisResourceConstraintError(operation, "capacity", `The host ran out of ${name} capacity (${failure.code}) to start ${subject}.`, {
						spawn_error: failure.code,
						exhausted_resource: failure.resource,
						...command === undefined ? {} : { command }
					}, {
						...details,
						retryable: true,
						remediationAction: `The host ran out of ${name} capacity (${failure.code}). Close unused processes or files, or raise the process or open-file limit of the REA process, then retry; ${unchanged}.`
					});
				}
				case "argument-list": return new AnalysisResourceConstraintError(operation, "transport", `The host rejected ${subject} because its argument list and environment exceed the process launch limit (${failure.code}).`, {
					spawn_error: failure.code,
					...context.argumentBytes === undefined ? {} : { argument_bytes: context.argumentBytes }
				}, {
					...details,
					diagnostics: {
						...details.diagnostics,
						oversized_launch_input: context.fixedArguments === true ? "environment" : "request_and_environment"
					},
					retryable: false,
					remediationAction: context.fixedArguments === true ? `This command's arguments do not depend on the request, so the environment REA passes to it is too large. Remove large or unneeded variables from the environment REA runs with, then retry; ${unchanged}. Retrying in the same environment fails the same way.` : `Select less input for one call, or pass large values through a file, then retry; ${unchanged}. An unchanged request fails the same way.`
				});
				case "missing":
				case "not_executable":
				case "failed": {
					if (context.unavailable !== undefined) return context.unavailable(failure, details);
					const reason = failure.kind === "missing" ? `${subject} was not found (${describeLaunchFailure(failure)}).` : failure.kind === "not_executable" ? `${subject} exists but could not be executed (${describeLaunchFailure(failure)}).` : `${subject} could not be launched (${describeLaunchFailure(failure)}).`;
					return new AnalysisCapabilityUnavailableError(context.providerId, operation, reason, {
						...details,
						userMessage: reason
					});
				}
			}
		};
		examinedOutcome = (outcome) => {
			const snapshot = outcome.output?.snapshot;
			return {
				failure_kind: outcome.kind,
				reason: outcome.message,
				exit_code: outcome.kind === "exited" ? outcome.exitCode : snapshot?.exitCode ?? null,
				signal: outcome.kind === "exited" ? outcome.signal : snapshot?.signal ?? null,
				...outcome.kind === "exited" ? { stop_requested: outcome.stopRequested } : {},
				...outcome.output === undefined ? {} : { output_truncated: outcome.output.truncated }
			};
		};
		classifyProviderOutcome = (outcome, context) => {
			const { operation } = context;
			const details = {
				...context.details,
				cause: outcome.cause,
				...outcome.output === undefined ? {} : { capturedOutput: context.capturedOutput(outcome.output.snapshot) }
			};
			switch (outcome.kind) {
				case "cancelled": {
					const { cause: _observed, ...cancellationDetails } = details;
					return cancelledBy(operation, carriedReason(outcome.reason), cancellationDetails);
				}
				case "timeout": return new AnalysisTimeoutError(operation, context.timeout.ms, {
					...details,
					...context.timeout.userMessage === undefined ? {} : { userMessage: context.timeout.userMessage },
					...context.timeout.remediationAction === undefined ? {} : { remediationAction: context.timeout.remediationAction },
					...context.timeout.limit === undefined ? {} : { limit: context.timeout.limit }
				});
				case "output-limit": return new AnalysisResourceConstraintError(operation, "memory", context.outputLimit.reason ?? outcome.message, context.outputLimit.limits, {
					...details,
					...context.outputLimit.recovery,
					...context.outputLimit.limit === undefined ? {} : { limit: context.outputLimit.limit }
				});
				case "memory-limit": return new AnalysisResourceConstraintError(operation, "memory", "The owned process tree reached its enforced committed-memory limit.", { process_memory_limit_bytes: context.memoryLimitBytes ?? null }, details);
				case "resource-signal": {
					const reported = context.resourceSignal?.(outcome.signal);
					return new AnalysisResourceConstraintError(operation, outcome.signal === "SIGXFSZ" ? "file-size" : "cpu", `Producer terminated with ${outcome.signal}; the signal's exact cause is not independently established.${reported?.detail === undefined ? "" : ` ${reported.detail}`}`, reported?.limits ?? null, {
						...details,
						...reported?.recovery,
						...reported?.limit === undefined ? {} : { limit: reported.limit }
					});
				}
				case "runtime-exhausted": {
					const reported = context.runtimeExhaustion?.(outcome.exhaustion);
					const { area, runtime } = outcome.exhaustion;
					return new AnalysisResourceConstraintError(operation, area === "native-thread" ? "capacity" : "memory", `${RUNTIME_NAMES[runtime]} reported running out of memory${area === undefined ? "" : ` (${AREA_NAMES[area]})`} before the process ended. This is reported evidence and does not prove the exact allocation failure.`, reported?.limits ?? null, {
						...details,
						diagnostics: {
							...details.diagnostics,
							runtime_exhaustion_report: runtimeExhaustionReport(outcome.exhaustion)
						},
						...reported?.recovery ?? (area === "native-thread" ? {
							retryable: true,
							remediationAction: "Reduce concurrent analysis processes or review the host's available thread and process capacity, then retry."
						} : {})
					});
				}
				case "launch-failed": return classifyLaunchFailure(outcome.failure, {
					providerId: context.providerId,
					operation,
					details,
					...context.launchUnavailable === undefined ? {} : { unavailable: context.launchUnavailable }
				});
				case "exited":
				case "protocol": return context.dialect(outcome, details, (options) => new UnclassifiedProviderFailure(context.providerId, operation, examinedOutcome(outcome), {
					...details,
					...options,
					diagnostics: {
						...details.diagnostics,
						...options?.diagnostics
					}
				}));
			}
		};
	})))();
}

//#endregion
//#region dist/domain/artifactIntegrityPolicy.js
var artifactIntegrityPolicySchema;
function init_artifactIntegrityPolicy() {
	return (init_artifactIntegrityPolicy = __esmMin((() => {
		artifactIntegrityPolicySchema = z.enum(["fail", "record-and-continue"]).default("fail");
	})))();
}

//#endregion
//#region dist/contracts/artifactToolContracts.js
var artifactInventoryInputSchema, artifactInspectionInputSchema, artifactExtractionInputSchema, artifactExtractionExecutionSchema, exampleInputSchema, examples, artifact, ARTIFACT_TOOL_CONTRACTS, ARTIFACT_ANALYSIS_OPERATIONS;
function init_artifactToolContracts() {
	return (init_artifactToolContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_artifactGraph();
		init_toolOutputSchemaGroups();
		init_artifactIntegrityPolicy();
		init_jsonValue();
		init_schemaConstraints();
		init_toolEffects();
		init_appleAssetCatalog();
		init_dylibResolution();
		init_keyedArchive();
		init_localPath();
		init_analysisDetail();
		init_artifactReaderLimits();
		artifactInventoryInputSchema = z.strictObject({
			integrity_policy: artifactIntegrityPolicySchema,
			artifact_limits: artifactReaderLimitsInputSchema.exactOptional().describe("Per-call Bun, .NET bundle, Node SEA and Godot producer admission, plus optional aggregate expanded plaintext work. Omitted fields retain existing defaults; changes apply on the next call without restart. Independent of summary/paging and MCP response limits.")
		});
		artifactInspectionInputSchema = artifactInventoryInputSchema.extend({ detail: analysisDetailSchema.unwrap().optional().describe("Omitted or complete returns the complete inspection Evidence. summary retains that complete Evidence in this session and returns its inspect_analysis_view summary; use normalized_result.parent_evidence_id for inventory views.") });
		artifactExtractionInputSchema = z.strictObject({
			artifact_limits: artifactInventoryInputSchema.shape.artifact_limits,
			integrity_policy: artifactIntegrityPolicySchema,
			output_root: absoluteLocalPathStringSchema.exactOptional().describe("Absolute destination path on the REA host. It must not exist and its parent must exist. Omit to use a fresh temporary directory. Successful output persists after the call."),
			occurrence_ids: distinctItems(z.array(artifactOccurrenceSchema.shape.occurrence_id).min(1), "Occurrence IDs must be unique").exactOptional().describe("Exact regular-file or slice occurrence IDs from the current inventory. Omit to extract all regular entries exposed by the active reader. Directories, links, the root and members inside nested archives cannot be selected.")
		});
		artifactExtractionExecutionSchema = artifactExtractionInputSchema.extend({ output_root: artifactExtractionInputSchema.shape.output_root.unwrap() });
		exampleInputSchema = z.record(z.string(), jsonValueSchema);
		examples = {
			inspect_artifact: { detail: "summary" },
			extract_artifact: {},
			decode_interface_builder: {},
			inspect_asset_catalog: {
				offset: 0,
				limit: 1e3
			},
			inspect_keyed_archive: { path: "Contents/Resources/Model.plist" },
			trace_dylib_resolution: {
				roots: ["Contents/MacOS/App"],
				architecture: "arm64"
			}
		};
		artifact = (name, audit, description, inputSchema, retainedSummary) => {
			const outputSchema = requireOutputSchema(artifactOutputSchemas, name);
			return {
				name,
				...toolContractMetadata(name, audit),
				description,
				kind: "artifact-provider",
				cli: true,
				requiresActiveTarget: true,
				...retainedSummary === undefined ? {} : { retainedSummary },
				inputSchema,
				outputSchema,
				examples: [{
					title: `Example ${name.replaceAll("_", " ")} request`,
					input: exampleInputSchema.parse(examples[name] ?? {})
				}]
			};
		};
		ARTIFACT_TOOL_CONTRACTS = [
			artifact("inspect_artifact", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			}), "Inventory the active archive, app package, firmware container or supported packaged executable without running it. Returns nested content-addressed inventory Evidence with integrity observations, unexplored branches and next probes. Default complete returns the full graph; detail summary retains it for inspect_analysis_view kind inventory using parent_evidence_id, exact paths/IDs, fields and paging. Summary changes delivery, not inventory coverage. Bun/Node SEA/Deno carriers expose stored modules/assets and recorded metadata; opaque bytecode and npm snapshots are not decoded. Local Evidence can include environment-file values and certificate bytes. iNES and NES 2.0 add file-region/reconstruction facts, not mapper execution. Integrity mismatches fail unless record-and-continue explicitly retains untrusted contradictions. Supported macOS DMGs are mounted read-only. Use extract_artifact to materialize regular contents; DMGs instead need a caller-managed read-only mount.", artifactInspectionInputSchema, { evidenceParameters: "preserve-detail" }),
			artifact("extract_artifact", toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				launchesProcess: true,
				idempotent: false
			}), "Write all or selected regular files from the active supported archive to an absent absolute output_root, or a fresh temporary directory if omitted. Use exact inventory occurrence_ids to select files. Returns IDs and actual output paths; successful files persist. Nested archives are copied, not recursively unpacked. Never overwrites; rejects traversal/symlink escapes and verifies cleanup. Full-input integrity checks still apply: mismatches fail unless record-and-continue retains explicitly untrusted contradictions. DMG extraction is unavailable; use a caller-managed read-only mount on macOS.", artifactExtractionInputSchema),
			artifact("decode_interface_builder", evidenceEffects, "Decode compiled storyboard and nib archives inside the active Apple app bundle, including keyed property lists and NIBArchive object tables, into a bounded object, hierarchy, and connection graph. This is static archive parsing; unrecognized archive classes and unresolved code handlers remain explicit unknowns. A full app graph is often several megabytes; detail summary retains it and returns documents with node, edge and coverage counts, then page rows, optionally one document's, with inspect_analysis_view kind interface-builder.", z.strictObject({
				max_documents: z.int().min(1).max(64).default(64),
				max_objects: z.int().min(1).max(2e4).default(2e4),
				max_connections: z.int().min(1).max(4e4).default(4e4),
				detail: analysisDetailSchema.unwrap().optional().describe("Omitted or complete returns the complete decoded graph Evidence. summary retains that complete Evidence in this session and returns its inspect_analysis_view summary; use normalized_result.parent_evidence_id for interface-builder pages.")
			}), { evidenceParameters: "omit-detail" }),
			artifact("inspect_keyed_archive", evidenceEffects, "Inspect one Foundation NSKeyedArchiver plist in the active app bundle as original object-table nodes, class descriptors, named roots, and UID edges. Preserves shared and cyclic references without instantiating classes. The path is relative to the bundle; root selection and object pagination preserve original identities.", keyedArchiveInputSchema),
			artifact("inspect_asset_catalog", nativeEvidenceEffects, "Inspect compiled Assets.car metadata in an active Apple app bundle. Returns stable paginated catalog and rendition records with raw assetutil metadata and catalog digests; rendition bytes are not extracted.", appleAssetCatalogInputSchema),
			artifact("trace_dylib_resolution", evidenceEffects, "Trace how dyld would resolve each Mach-O dylib load for the active Mach-O, or for every executable in the active .app bundle (the main app, XPC services, extensions, login items, helpers). Expands @executable_path, @loader_path, and @rpath through each process's LC_RPATH stack in dependents-first load order, and reports every candidate path with its outcome, the resolved image and digest, weak, re-export, upward, and lazy-load flags, including LC_LAZY_LOAD_DYLIB_INFO linkedit payloads, and derived findings such as unresolved required loads or absent earlier @rpath candidates. Pure header parsing: nothing is executed, and absolute or system paths outside the analyzed root stay undetermined. Select roots or one architecture to narrow large bundles.", dylibResolutionInputSchema)
		];
		ARTIFACT_ANALYSIS_OPERATIONS = ["inventory_artifact", ...ARTIFACT_TOOL_CONTRACTS.map(({ name }) => name)];
	})))();
}

//#endregion
//#region dist/ports/BundleResourceOperations.js
var BUNDLE_NATIVE_RESOURCE_OPERATIONS, BUNDLE_ARTIFACT_RESOURCE_OPERATIONS, BUNDLE_RESOURCE_OPERATIONS, isBundleResourceOperation;
function init_BundleResourceOperations() {
	return (init_BundleResourceOperations = __esmMin((() => {
		BUNDLE_NATIVE_RESOURCE_OPERATIONS = new Set(["inspect_plist"]);
		BUNDLE_ARTIFACT_RESOURCE_OPERATIONS = new Set([
			"decode_interface_builder",
			"inspect_asset_catalog",
			"inspect_keyed_archive"
		]);
		BUNDLE_RESOURCE_OPERATIONS = new Set([...BUNDLE_NATIVE_RESOURCE_OPERATIONS, ...BUNDLE_ARTIFACT_RESOURCE_OPERATIONS]);
		isBundleResourceOperation = (name) => {
			for (const operation of BUNDLE_RESOURCE_OPERATIONS) if (operation === name) return true;
			return false;
		};
	})))();
}

//#endregion
export { init_FfsFile as $, isEspAppPartition as $t, admitWxapkgMemberExtents as A, init_androidBootImageFormat as An, peCodeViewDirectoryEntries as At, UIMAGE_MULTI_TABLE_WINDOW as B, init_androidOtaPayload as Bn, espFlashDumpOrigin as Bt, artifactNameForClassification as C, elfSectionHeaderWidth as Cn, inspectPeCodeViewFromBuffer as Ct, probeUefiFlashImage as D, readElfRawTableDeclarations as Dn, parseMzExecutableMetadata as Dt, init_UefiFormatProbe as E, init_elfRawTableDeclarations as En, parseExecutableHeader as Et, UNITYFS_HEADER_PREFIX_BYTES as F, init_espChips as Fn, HEX_RECORD_ENCODING_LABELS as Ft, createUf2Decoder as G, decodeZstandardFrames as Gn, init_espImage as Gt, init_uimageFormat as H, parseAndroidOtaPayload as Hn, locateEspFlashLayout as Ht, hasUnityFsHeader as I, ANDROID_OTA_PAYLOAD_LIMITATIONS as In, createHexRecordDecoder as It, inspectFirmwareVolumeExtension as J, init_nodeCodecResult as Jn, espBootPartitions as Jt, init_uf2 as K, decodeZstandardFramesCooperative as Kn, recognizeEspImage as Kt, init_unityfsFormat as L, androidOtaDistinctOperationDataBytes as Ln, init_hexRecords as Lt, init_wxapkgFormat as M, init_espImageFacts as Mn, peRvaToFileOffset as Mt, readWxapkgHeaderFacts as N, ESP_CHIP_TABLE_SOURCE as Nn, readFatArchitectureFamilies as Nt, init_artifactFormatRecognition as O, ANDROID_BOOT_MAGIC as On, parsePeRecordFacts as Ot, resolveWxapkgIndexLayouts as P, espChipForId as Pn, readNativeHeaderFormat as Pt, checkFfsFileIntegrity as Q, init_espPartitionTable as Qt, readUnityFsHeaderFacts as R, androidOtaExtractRefusalError as Rn, init_devicetreeHeader as Rt, init_diskImageFormat as S, readElfProgramHeader as Sn, init_binaryTarget as St, namedArtifactFormat as T, readElfSectionHeader as Tn, parseCodeViewData as Tt, parseMultiImageTable as U, reconstructAndroidOtaPartitionCooperative as Un, ESP8266_REFUSAL as Ut, hasUImageSizeTable as V, parseAndroidOtaHeader as Vn, init_espFlashLocation as Vt, parseUImageHeaderFields as W, withAndroidOtaPayloadSignature as Wn, createEspImageDecoder as Wt, scanFirmwareVolumes as X, artifactTargetRefusal as Xn, espPartitionTypeName as Xt, parseFirmwareVolumeHeader as Y, nodeCodecResult as Yn, espPartitionSubtypeName as Yt, unsupportedVolumeBodyReason as Z, init_artifactTargetApplicability as Zn, espPrimaryLayoutRole as Zt, UnclassifiedProviderFailure as _, validateElfSectionTableFields as _n, sliceRegion as _t, isBundleResourceOperation as a, hasGodotPckHeader as an, OPAQUE_GUIDED_SECTION_GUIDS as at, providerOutcomeOf as b, elfProgramHeaderWidth as bn, MAX_PE_OPTIONAL_HEADER_BYTES as bt, artifactExtractionExecutionSchema as c, readGodotPckTrailerFacts as cn, init_UefiCodeTables as ct, init_artifactToolContracts as d, init_peResources as dn, absoluteOffset as dt, createDfuSeDecoder as en, readFfsHeader as et, artifactIntegrityPolicySchema as f, inspectPeResourcesInputSchema as fn, alignUp as ft, init_classifyProviderOutcome as g, validateElfDeclaredRanges as gn, localOffsetOf as gt, classifyProviderOutcome as h, readElfTableDeclarations as hn, isWindowUniform as ht, init_BundleResourceOperations as i, godotPckHeaderEnd as in, FV_HEADER_LAYOUT as it, hasWxapkgEncryptedMagic as j, ESP_IMAGE_LIMITATIONS as jn, peDebugDirectoryEntry as jt, recognizeArtifactFormat as k, VENDOR_BOOT_MAGIC as kn, parsePeRecordStructure as kt, artifactExtractionInputSchema as l, MAX_INSPECT_PE_DIRECTORY_ENTRIES as ln, formatGuidLittleEndian as lt, classifyLaunchFailure as m, init_elfDeclaredRanges as mn, init_UefiBytes as mt, BUNDLE_NATIVE_RESOURCE_OPERATIONS as n, init_dfuse as nn, FFS_HEADER_LAYOUT as nt, ARTIFACT_ANALYSIS_OPERATIONS as o, init_godotPckFormat as on, SECTION_LAYOUT as ot, init_artifactIntegrityPolicy as p, peResourcesSchema as pn, imageRegion as pt, init_FirmwareVolume as q, init_zstandardExactFrame as qn, ESP_PARTITION_TABLE_SECTOR_BYTES as qt, BUNDLE_RESOURCE_OPERATIONS as r, godotPckDataStartsAfterHeader as rn, FFS_TYPE_NAME_BY_CODE as rt, ARTIFACT_TOOL_CONTRACTS as s, readGodotPckHeaderFacts as sn, SECTION_TYPE_NAME_BY_CODE as st, BUNDLE_ARTIFACT_RESOURCE_OPERATIONS as t, hasDfuSePrefix as tn, COMPRESSION_GUID_BY_DISPLAY as tt, artifactInventoryInputSchema as u, MAX_INSPECT_PE_FILE_BYTES as un, init_UefiGuid as ut, init_unclassifiedProviderFailure as v, admitElfLoadSegment as vn, UEFI_FIRMWARE_LIMITS as vt, init_artifactNameSelection as w, init_elfSectionHeader as wn, machoBinaryArchitecture as wt, hasDiskImageSignature as x, init_elfProgramHeader as xn, claimsExecutableHeader as xt, init_ProviderOutcome as y, elfLoadSpans as yn, init_uefiLimits as yt, unityFsLayoutFlags as z, androidOtaExtractRefusalLimitation as zn, readDevicetreeHeader as zt };