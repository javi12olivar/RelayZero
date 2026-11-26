import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, AnalysisInputError, AnalysisTimeoutError, cancelledBy, carriedReason, errorMessage, hostRangeErrorKind, init_analysisErrorCore, init_errorMessage, init_jsonValue, init_parseFailure, init_sha256Hex, jsonValueSchema, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, SafeOutputTree, SafeOutputTreeCreationFailure, artifactFileCancellationCause, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_SafeOutputTree, init_SafeOutputTreeCreationFailure, init_readStableArtifact, init_resources, readStableArtifact } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, inspectWithService, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { cliDecimalField, init_options } from "./options-BYpy7iiK.js";
import { executeProviderOperation, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { OwnedCommandFailure, init_OwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_OwnedCommandCleanup, processInspectionFailure, retainProcessInspectionCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { classifyProviderOutcome, init_classifyProviderOutcome } from "./classifyProviderOutcome-BMRoGrMs.js";
import { init_nodeCodecResult, nodeCodecResult } from "./nodeCodecResult-Ky56xTop.js";
import { init_ProviderOutcome, providerOutcomeOf } from "./ProviderOutcome-iJMiaLYK.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { COMPRESSION_GUID_BY_DISPLAY, FFS_HEADER_LAYOUT, FFS_TYPE_NAME_BY_CODE, FV_HEADER_LAYOUT, OPAQUE_GUIDED_SECTION_GUIDS, SECTION_LAYOUT, SECTION_TYPE_NAME_BY_CODE, absoluteOffset, alignUp, checkFfsFileIntegrity, formatGuidLittleEndian, imageRegion, init_FfsFile, init_FirmwareVolume, init_UefiBytes, init_UefiCodeTables, init_UefiGuid, inspectFirmwareVolumeExtension, isWindowUniform, localOffsetOf, parseFirmwareVolumeHeader, readFfsHeader, scanFirmwareVolumes, sliceRegion, unsupportedVolumeBodyReason } from "./FirmwareVolume-C6tnpN0n.js";
import { UEFI_FIRMWARE_LIMITS, init_uefiLimits } from "./uefiLimits-B1Km845N.js";
import { UEFI_TOOL_CONTRACTS, init_uefiFirmwareAnalysis, init_uefiToolContracts, uefiRequestSchema, uefiResultSchemas } from "./uefiToolContracts-j-5aPkGK.js";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { Readable } from "node:stream";
import { promisify } from "node:util";
import { Buffer as Buffer$1 } from "node:buffer";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { inflate } from "node:zlib";

//#region dist/application/uefi/UefiAnalysisService.js
var UefiAnalysisService;
function init_UefiAnalysisService() {
	return (init_UefiAnalysisService = __esmMin((() => {
		init_uefiFirmwareAnalysis();
		init_ProviderOperationExecution();
		UefiAnalysisService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close?.() ?? Promise.resolve();
			}
			/** Run one caller-selected UEFI request and retain image identity inline. */
			execute(operation, input, options) {
				return executeProviderOperation(operation, input, options, uefiRequestSchema, this.provider, "observed");
			}
		};
	})))();
}

//#endregion
//#region dist/uefi/UefiPspDirectory.js
/** The PSP checksum covers the count, additional info and directory entries. */
function directoryChecksum(reader, start, end) {
	let low = 65535;
	let high = 65535;
	for (let offset = start; offset < end; offset += 2) {
		low += reader.u16(offset);
		low = (low & 65535) + (low >>> 16);
		high += low;
		high = (high & 65535) + (high >>> 16);
	}
	return (high << 16 | low) >>> 0;
}
/** Merge the two signature scans by source offset without retaining all hits. */
function* directoryCandidates(image) {
	const [primaryMagic, secondaryMagic] = PSP_MAGICS;
	let primary = image.indexOf(primaryMagic, 0, "ascii");
	let secondary = image.indexOf(secondaryMagic, 0, "ascii");
	while (primary >= 0 || secondary >= 0) {
		if (secondary < 0 || primary >= 0 && primary < secondary) {
			yield {
				offset: primary,
				magic: primaryMagic
			};
			primary = image.indexOf(primaryMagic, primary + primaryMagic.length, "ascii");
		} else {
			yield {
				offset: secondary,
				magic: secondaryMagic
			};
			secondary = image.indexOf(secondaryMagic, secondary + secondaryMagic.length, "ascii");
		}
	}
}
var PSP_MAGICS, PSP_HEADER_LENGTH, PSP_ENTRY_LENGTH, PSP_MAX_ENTRIES, PSP_FUSE_CHAIN, scanPspDirectories;
function init_UefiPspDirectory() {
	return (init_UefiPspDirectory = __esmMin((() => {
		init_binaryContainer();
		PSP_MAGICS = ["$PSP", "$PL2"];
		PSP_HEADER_LENGTH = 16;
		PSP_ENTRY_LENGTH = 16;
		PSP_MAX_ENTRIES = 255;
		PSP_FUSE_CHAIN = 11;
		scanPspDirectories = (image, reserve) => {
			const tables = [];
			const candidates = [];
			const reader = new BinaryReader(image, true, "AMD PSP directory");
			for (const { offset, magic } of directoryCandidates(image)) {
				if (!reserve()) break;
				if (offset + PSP_HEADER_LENGTH > image.length) {
					candidates.push({
						offset,
						magic,
						reason: "truncated-header"
					});
					continue;
				}
				const totalEntries = reader.u32(offset + 8);
				if (totalEntries === 0 || totalEntries > PSP_MAX_ENTRIES) {
					candidates.push({
						offset,
						magic,
						reason: "implausible-entry-count"
					});
					continue;
				}
				const length = PSP_HEADER_LENGTH + totalEntries * PSP_ENTRY_LENGTH;
				if (offset + length > image.length) {
					candidates.push({
						offset,
						magic,
						reason: "truncated-entries"
					});
					continue;
				}
				if (reader.u32(offset + 4) !== directoryChecksum(reader, offset + 8, offset + length)) {
					candidates.push({
						offset,
						magic,
						reason: "checksum-mismatch"
					});
					continue;
				}
				if (!reserve(totalEntries)) break;
				const entries = [];
				for (let index = 0; index < totalEntries; index += 1) {
					const start = offset + PSP_HEADER_LENGTH + index * PSP_ENTRY_LENGTH;
					const type = reader.u8(start);
					const raw = reader.word(start + 8, 64);
					const location = raw & (1n << 62n) - 1n;
					entries.push({
						type,
						declaredLocation: type !== PSP_FUSE_CHAIN && location <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(location) : null,
						declaredLocationRaw: `0x${raw.toString(16).padStart(16, "0")}`,
						addressMode: Number(raw >> 62n),
						declaredSize: reader.u32(start + 4),
						imageOffset: null,
						sha256: null,
						locationBasis: "declared-unverified"
					});
				}
				tables.push({
					offset,
					length,
					tableMagic: magic,
					totalEntries,
					entries,
					entryStrideBasis: "psp-16"
				});
			}
			return {
				tables,
				candidates
			};
		};
	})))();
}

//#endregion
//#region dist/uefi/FfsSections.js
function readCommonHeader(reader, start, end) {
	if (start + SECTION_LAYOUT.commonLength > end) return null;
	const compactSize = reader.u16(start) | reader.u8(start + 2) << 16;
	const extended = compactSize === SECTION_LAYOUT.largeSectionMarker;
	const commonLength = extended ? SECTION_LAYOUT.extendedLength : SECTION_LAYOUT.commonLength;
	if (start + commonLength > end) return null;
	return {
		commonLength,
		declaredLength: extended ? reader.u32(start + SECTION_LAYOUT.extendedSizeOffset) : compactSize,
		typeCode: reader.u8(start + SECTION_LAYOUT.typeOffset)
	};
}
/** A bounded first frame establishes a section chain regardless of payload validity. */
function startsWithSectionFrame(region) {
	const reader = new BinaryReader(region.buffer, true, "FFS sections");
	return hasBoundedFrame(reader, region.start, region.end);
}
function hasBoundedFrame(reader, start, end) {
	const header = readCommonHeader(reader, start, end);
	return header !== null && header.declaredLength >= header.commonLength && header.declaredLength <= end - start;
}
function guidedSectionContent(reader, { kind, guid, attributes }, start, end) {
	const reservedAttributes = attributes & ~GUIDED_KNOWN_ATTRIBUTES;
	if (reservedAttributes !== 0) return {
		kind: "unsupported",
		gap: "unparsed-region",
		detail: `GUID-defined header uses reserved attribute bits 0x${reservedAttributes.toString(16)}.`
	};
	if (kind === "lzma-custom") return {
		kind: "decode",
		format: "lzma"
	};
	if (kind === "lzmaf86") return {
		kind: "decode",
		format: "lzmaf86"
	};
	if (kind === "amd-zlib") return {
		kind: "decode",
		format: "zlib"
	};
	if ((attributes & GUIDED_PROCESSING_REQUIRED) === 0 && (kind === "crc32-guided" || kind === "unknown-guid" && guid !== null && !OPAQUE_GUIDED_SECTION_GUIDS.has(guid) && hasBoundedFrame(reader, start, end))) return {
		kind: "stored-sections",
		guidedIntegrityUnchecked: kind === "crc32-guided" || (attributes & GUIDED_AUTH_STATUS_VALID) !== 0
	};
	return {
		kind: "unsupported",
		gap: kind === "unknown-guid" ? "unknown-guid-handler" : "unsupported-compression"
	};
}
/** Read one PI section chain, with each child aligned relative to its stream. */
function walkSections(region, reserve = () => true, largeFile = true) {
	const reader = new BinaryReader(region.buffer, true, "FFS sections");
	const sections = [];
	const nonzeroPadding = [];
	const { start: localStart, end: localEnd } = region;
	let cursor = localStart;
	while (cursor < localEnd) {
		const header = readCommonHeader(reader, cursor, localEnd);
		if (header === null) break;
		if (!reserve()) return {
			sections,
			nonzeroPadding,
			remainder: {
				kind: "limited",
				start: cursor
			}
		};
		const { commonLength, declaredLength, typeCode } = header;
		const observedLength = Math.max(commonLength, Math.min(declaredLength, localEnd - cursor));
		const truncated = observedLength < declaredLength;
		let headerLength = commonLength;
		let compression = { kind: "none" };
		let content = { kind: "leaf" };
		if (typeCode === 3) content = {
			kind: "stored-sections",
			guidedIntegrityUnchecked: false
		};
		else if (typeCode === 21) content = { kind: "ui" };
		else if (typeCode === 23) content = { kind: "volume" };
		let malformed = declaredLength < commonLength;
		const fields = cursor + commonLength;
		if (typeCode === 1) {
			headerLength += SECTION_LAYOUT.compressionFieldsLength;
			malformed = declaredLength < headerLength;
			if (observedLength >= headerLength) {
				const compressionType = reader.u8(fields + SECTION_LAYOUT.compressionTypeFieldOffset);
				if (compressionType === 0) {
					content = {
						kind: "stored-sections",
						guidedIntegrityUnchecked: false
					};
					malformed = reader.u32(fields) !== declaredLength - headerLength;
				} else {
					content = {
						kind: "unsupported",
						gap: "unsupported-compression"
					};
					compression = {
						kind: compressionType === 1 ? "efi-standard" : "unknown-compression",
						guid: null,
						dataOffset: headerLength,
						attributes: null
					};
				}
			}
		} else if (typeCode === 2) {
			headerLength += SECTION_LAYOUT.guidedFieldsLength;
			malformed = declaredLength < headerLength;
			if (observedLength >= headerLength) {
				const dataOffset = reader.u16(fields + SECTION_LAYOUT.guidDataOffsetFieldOffset);
				const guid = formatGuidLittleEndian(region.buffer, fields);
				const attributes = reader.u16(fields + SECTION_LAYOUT.guidAttributesFieldOffset);
				const kind = guid === null ? "unknown-guid" : COMPRESSION_GUID_BY_DISPLAY[guid] ?? "unknown-guid";
				compression = {
					kind,
					guid,
					dataOffset,
					attributes
				};
				if (kind === "crc32-guided") {
					headerLength += SECTION_LAYOUT.guidedCrc32Length;
				}
				malformed = dataOffset < headerLength || dataOffset > declaredLength;
				if (!malformed) {
					headerLength = dataOffset;
					content = guidedSectionContent(reader, {
						kind,
						guid,
						attributes
					}, cursor + dataOffset, cursor + observedLength);
				}
			}
		} else if (typeCode === 20 || typeCode === 24) {
			headerLength += typeCode === 20 ? 2 : 16;
			malformed = declaredLength < headerLength;
		}
		let framingIssue;
		if (typeCode === 0) framingIssue = "Section type 0x00 is a section retrieval wildcard.";
		if (commonLength === SECTION_LAYOUT.extendedLength) {
			if (declaredLength < SECTION_LAYOUT.largeSectionMarker) framingIssue = "Extended section size fits in the compact PI header.";
			else if (!largeFile) framingIssue = "Extended section header requires a large FFS file.";
		}
		malformed ||= framingIssue !== undefined;
		sections.push({
			absoluteBase: absoluteOffset(region, cursor),
			headerLength,
			declaredLength,
			observedLength,
			truncated,
			malformed,
			...framingIssue === undefined ? {} : { framingIssue },
			content,
			typeCode,
			compression,
			payload: malformed || headerLength > observedLength ? null : {
				start: cursor + headerLength,
				end: cursor + observedLength
			}
		});
		if (truncated) return {
			sections,
			nonzeroPadding,
			remainder: null
		};
		if (declaredLength < commonLength) {
			cursor += commonLength;
			break;
		}
		const end = cursor + declaredLength;
		cursor = localStart + alignUp(end - localStart, 4);
		const paddingEnd = Math.min(cursor, localEnd);
		if (end < paddingEnd && !isWindowUniform(region.buffer, end, paddingEnd, 0)) nonzeroPadding.push({
			start: end,
			end: paddingEnd
		});
	}
	return {
		sections,
		nonzeroPadding,
		remainder: cursor < localEnd ? {
			kind: "unparsed",
			start: cursor
		} : null
	};
}
/** Peel the 0x100-byte AMD header off one amd-zlib payload, or null when short. */
function peelAmdZlibPayload(payload) {
	if (payload.length < 256) {
		return null;
	}
	const payloadReader = new BinaryReader(payload, true, "AMD zlib section");
	return {
		stream: payload.subarray(256),
		declaredCompressedSize: payloadReader.u32(20)
	};
}
var GUIDED_PROCESSING_REQUIRED, GUIDED_AUTH_STATUS_VALID, GUIDED_KNOWN_ATTRIBUTES, AMD_ZLIB_HEADER_LENGTH;
function init_FfsSections() {
	return (init_FfsSections = __esmMin((() => {
		init_binaryContainer();
		init_UefiBytes();
		init_UefiGuid();
		init_UefiCodeTables();
		GUIDED_PROCESSING_REQUIRED = 1;
		GUIDED_AUTH_STATUS_VALID = 2;
		GUIDED_KNOWN_ATTRIBUTES = GUIDED_PROCESSING_REQUIRED | GUIDED_AUTH_STATUS_VALID;
		AMD_ZLIB_HEADER_LENGTH = 256;
	})))();
}

//#endregion
//#region dist/uefi/UefiImageScan.js
function decodeUiString(payload) {
	const reader = new BinaryReader(payload, true, "UEFI UI section");
	const limit = Math.min(payload.length - payload.length % 2, UI_STRING_BYTES);
	for (let end = 0; end < limit; end += 2) {
		if (reader.u16(end) === 0) return {
			kind: "found",
			value: end === 0 ? null : payload.toString("utf16le", 0, end)
		};
	}
	return { kind: payload.length > UI_STRING_BYTES ? "limited" : "malformed" };
}
var hex$1, ffsTypeNameFor, scanUefiImage, subRegion, UI_STRING_BYTES;
function init_UefiImageScan() {
	return (init_UefiImageScan = __esmMin((() => {
		init_UefiPspDirectory();
		init_budget();
		init_binaryContainer();
		init_sha256Hex();
		init_uefiLimits();
		init_UefiCodeTables();
		init_FfsFile();
		init_FfsSections();
		init_FirmwareVolume();
		init_UefiBytes();
		hex$1 = (value) => `0x${value.toString(16)}`;
		ffsTypeNameFor = (code) => {
			const name = FFS_TYPE_NAME_BY_CODE[code];
			return name ?? "unknown";
		};
		scanUefiImage = async (image, limits, decodeLzma, checkpoint = () => {}) => {
			const payloads = new Map();
			const decodedStreams = new Map();
			const compressedCarriers = new Map();
			let decodedBytes = 0;
			const records = new Budget(UEFI_FIRMWARE_LIMITS.scanRecords);
			let structuralLimitReached = false;
			const reserve = (count = 1) => {
				checkpoint();
				if (structuralLimitReached) return false;
				if (records.tryCharge(count)) return true;
				structuralLimitReached = true;
				limitations.push(`Structural record limit ${UEFI_FIRMWARE_LIMITS.scanRecords} reached.`);
				return false;
			};
			const payloadOf = (region, start, end) => ({
				bytes: region.buffer.subarray(start, end),
				sourceStream: region.sourceStream ?? null,
				range: {
					offset: absoluteOffset(region, start),
					length: end - start
				}
			});
			const volumes = [];
			const unknownRegions = [];
			const omissions = [];
			const integrity = [];
			const limitations = [];
			let incompleteFraming = false;
			let filesDiscovered = 0;
			let volumesDiscovered = 0;
			const noteIntegrity = (kind, logicalPath, offset, length, detail, sourceStream) => {
				if (!reserve()) return;
				integrity.push({
					kind,
					logical_path: logicalPath,
					source_stream: sourceStream,
					range: {
						offset,
						length
					},
					detail
				});
			};
			const noteLimitations = (lines) => {
				for (const line of lines) {
					if (limitations.length >= 512) break;
					limitations.push(line);
				}
			};
			const recordOmission = (omission) => {
				omissions.push(omission);
				if (omission.kind !== "pad-file") noteLimitations([omission.detail]);
			};
			const noteOmission = (kind, region, logicalPath, start, end, detail) => {
				if (start >= end) return;
				recordOmission({
					kind,
					logical_path: logicalPath,
					source_stream: region.sourceStream ?? null,
					range: {
						offset: start,
						length: end - start
					},
					detail
				});
			};
			const noteCarrierGap = (path, payload, kind, detail) => {
				if (payload.bytes.length > 0) compressedCarriers.set(path, payload);
				recordOmission({
					kind,
					logical_path: path,
					source_stream: payload.sourceStream,
					range: payload.range.length > 0 ? payload.range : null,
					detail
				});
				return null;
			};
			const noteUnparsedRange = (region, absoluteStart, absoluteEnd, logicalPath, known) => {
				const length = absoluteEnd - absoluteStart;
				if (length <= 0) return;
				if (!reserve()) {
					noteOmission("size-truncated", region, logicalPath, absoluteStart, absoluteEnd, `Structural record limit reached before classifying bytes under ${logicalPath}.`);
					return;
				}
				const localStart = Math.max(region.start, Math.min(region.end, localOffsetOf(region, absoluteStart)));
				const localEnd = Math.max(localStart, Math.min(region.end, localStart + length));
				let classification = "no-fv-magic";
				let erasure = "none";
				if (!known?.nonErased && isWindowUniform(region.buffer, localStart, localEnd, 255)) {
					classification = "erased-ff";
					erasure = "0xff";
				} else if (!known?.nonErased && isWindowUniform(region.buffer, localStart, localEnd, 0)) {
					classification = "erased-00";
					erasure = "0x00";
				}
				unknownRegions.push({
					source_stream: region.sourceStream ?? null,
					offset: absoluteStart,
					length,
					sha256: sha256Hex(region.buffer.subarray(localStart, localEnd)),
					classification: known?.classification ?? classification,
					erasure
				});
				if (known !== undefined || erasure === "none") {
					noteOmission("unparsed-region", region, logicalPath, absoluteStart, absoluteEnd, known?.detail ?? `Unparsed region under ${logicalPath} at ${hex$1(absoluteStart)}, ${length} bytes.`);
				}
			};
			const scanVolumesInRegion = async (region, depth, parentOffset, parentLogicalPath, mode = "volume-region") => {
				const localRecords = [];
				const regionEnd = absoluteOffset(region, region.end);
				if (depth > limits.maxDepth) {
					noteOmission("depth-limited", region, parentLogicalPath, region.origin, regionEnd, `Volume depth limit ${limits.maxDepth} reached under ${parentLogicalPath}.`);
					return {
						volumes: localRecords,
						status: "limited"
					};
				}
				const fvImageSection = mode === "fv-image-section";
				const discovered = scanFirmwareVolumes(region, UEFI_FIRMWARE_LIMITS.scanRecords, {
					reserve,
					skipNested: true,
					...fvImageSection ? { signatureEnd: region.start + FV_HEADER_LAYOUT.signatureOffset + 4 } : {}
				});
				for (const rejected of discovered.rejected) {
					noteLimitations([`_FVH hit under ${parentLogicalPath} at ${hex$1(rejected.absoluteBase)} not confirmed: ${rejected.reason}.`]);
					if (mode !== "embedded-probe" && rejected.truncation !== undefined) {
						incompleteFraming = true;
					}
				}
				let volumeLimitFrom;
				let mappedThrough = region.origin;
				for (const { header } of discovered.volumes) {
					if (volumesDiscovered >= limits.maxVolumes) {
						volumeLimitFrom = header.absoluteBase;
						break;
					}
					volumesDiscovered += 1;
					noteUnparsedRange(region, mappedThrough, header.absoluteBase, parentLogicalPath);
					const logicalPath = `${parentLogicalPath}/FV@${hex$1(header.absoluteBase)}`;
					if (!header.checksumValid) {
						noteIntegrity("fv-checksum-mismatch", logicalPath, header.absoluteBase, header.headerLength, "Volume header checksum does not sum to zero over HeaderLength bytes.", region.sourceStream ?? null);
					}
					const volumeEnd = Math.min(header.absoluteBase + header.declaredLength, absoluteOffset(region, region.end));
					const observed = sliceRegion(region, header.absoluteBase, volumeEnd - header.absoluteBase);
					const volume = {
						source_stream: region.sourceStream ?? null,
						parent_logical_path: parentOffset === null ? null : parentLogicalPath,
						logical_path: logicalPath,
						offset: header.absoluteBase,
						length: Math.max(1, volumeEnd - header.absoluteBase),
						declared_length: header.declaredLength,
						depth,
						parent_offset: parentOffset,
						sha256: sha256Hex(observed ?? Buffer$1.alloc(0)),
						file_system_guid: header.fileSystemGuid,
						signature: "_FVH",
						header_length: header.headerLength,
						attributes: header.attributes,
						revision: header.revision,
						ext_header_offset: header.extHeaderOffset,
						block_map: header.blockMap.map((entry) => ({
							num_blocks: entry.numBlocks,
							length: entry.blockLength
						})),
						ffs_files: []
					};
					volumes.push(volume);
					if (header.fileSystem === "unsupported") {
						noteUnparsedRange(region, volume.offset + volume.header_length, volumeEnd, logicalPath, {
							detail: unsupportedVolumeBodyReason(header),
							classification: "unsupported-file-system"
						});
					} else {
						await walkFiles(volume, header, depth, region, volumeEnd);
					}
					const lastFile = volume.ffs_files.at(-1);
					for (const issue of inspectFirmwareVolumeExtension(region, header, reserve, checkpoint, lastFile === undefined ? undefined : lastFile.offset + lastFile.length)) {
						noteOmission(issue.kind, region, logicalPath, issue.offset, issue.offset + issue.length, issue.detail);
					}
					mappedThrough = volumeEnd;
					localRecords.push(volume);
				}
				if (volumeLimitFrom !== undefined || discovered.limit !== null) {
					const detail = discovered.limit === "structural-records" ? `Structural record limit reached during volume scan under ${parentLogicalPath}.` : discovered.limit === "candidates" ? `Volume candidate limit reached under ${parentLogicalPath}.` : `Firmware volume budget ${limits.maxVolumes} reached under ${parentLogicalPath}.`;
					noteOmission("size-truncated", region, parentLogicalPath, volumeLimitFrom ?? mappedThrough, regionEnd, detail);
					return {
						volumes: localRecords,
						status: "limited"
					};
				}
				if (fvImageSection) {
					noteUnparsedRange(region, mappedThrough, regionEnd, parentLogicalPath, { detail: localRecords.length === 0 ? `FV-image section ${parentLogicalPath} does not begin with a confirmed firmware volume.` : `FV-image section ${parentLogicalPath} extends beyond its firmware volume.` });
				} else if (mode !== "embedded-probe" || localRecords.length > 0) {
					noteUnparsedRange(region, mappedThrough, regionEnd, parentLogicalPath);
				}
				return {
					volumes: localRecords,
					status: localRecords.length > 0 ? "mapped" : "absent"
				};
			};
			const walkFiles = async (volume, header, depth, parentRegion, volumeEnd) => {
				const volumeLocalEnd = localOffsetOf(parentRegion, volumeEnd);
				const fileAreaStart = Math.min(header.firstFileLocal, volumeLocalEnd);
				const fileArea = subRegion(parentRegion, header.localBase, volumeLocalEnd);
				const notePadding = ({ offset, length }) => noteUnparsedRange(fileArea, offset, offset + length, volume.logical_path, {
					nonErased: true,
					detail: `Unexpected FFS alignment bytes at ${hex$1(offset)}: ${length} bytes.`
				});
				for (const padding of header.filePrefixPadding) notePadding(padding);
				let cursor = fileAreaStart;
				const reserveFile = () => filesDiscovered < limits.maxFiles && reserve();
				while (cursor < fileArea.end) {
					checkpoint();
					const read = readFfsHeader(fileArea, cursor, header, reserveFile);
					const at = absoluteOffset(fileArea, cursor);
					if (read.kind === "limited") {
						noteOmission("size-truncated", fileArea, volume.logical_path, at, volumeEnd, structuralLimitReached ? `Structural record limit reached during FFS walk in ${volume.logical_path}.` : `FFS file budget ${limits.maxFiles} reached inside ${volume.logical_path}.`);
						return;
					}
					if (read.kind === "unusable-header") {
						noteOmission("unparsed-region", fileArea, volume.logical_path, read.offset, read.offset + read.length, read.detail);
						cursor = read.nextLocal;
						continue;
					}
					if (read.kind === "unparsed") {
						noteUnparsedRange(fileArea, read.offset, read.offset + read.length, volume.logical_path, {
							nonErased: true,
							detail: read.detail ?? `Unparsed FFS suffix in ${volume.logical_path} at ${hex$1(read.offset)}: ${read.length} bytes.`
						});
						return;
					}
					if (read.kind === "end") break;
					const fileHeader = read.header;
					filesDiscovered += 1;
					for (const implausibility of fileHeader.implausibilities) {
						noteLimitations([`FFS header implausibility "${implausibility}" at ${hex$1(fileHeader.absoluteBase)} in ${volume.logical_path}.`]);
					}
					const logicalPath = `${volume.logical_path}/FFS:${fileHeader.nameGuid ?? "unknown"}@${hex$1(fileHeader.absoluteBase)}`;
					const truncatesArea = fileHeader.extentIssue === "declared-length-truncates-region";
					if (fileHeader.extentIssue !== null) {
						const detail = `FFS declares ${fileHeader.declaredLength} bytes; observed ${fileHeader.observedLength} bytes with a ${fileHeader.headerLength}-byte header (${fileHeader.extentIssue}).`;
						noteOmission(fileHeader.extentIssue === "unusable-header-state" ? "unparsed-region" : "size-truncated", fileArea, logicalPath, fileHeader.absoluteBase, fileHeader.absoluteBase + fileHeader.observedLength, detail);
						if (fileHeader.extentIssue !== "unusable-header-state") noteIntegrity("size-truncation", logicalPath, fileHeader.absoluteBase, fileHeader.observedLength, detail, fileArea.sourceStream ?? null);
					} else if (fileHeader.typeCode === 240) {
						noteOmission("pad-file", fileArea, logicalPath, fileHeader.absoluteBase, fileHeader.absoluteBase + fileHeader.observedLength, "Pad file extent retained.");
					}
					if (!fileHeader.headerChecksumValid) {
						noteIntegrity("ffs-header-checksum-mismatch", logicalPath, fileHeader.absoluteBase, fileHeader.headerLength, "FFS header checksum does not sum to zero with State and File bytes zeroed.", fileArea.sourceStream ?? null);
					}
					const checksum = checkFfsFileIntegrity(fileArea, fileHeader);
					if (checksum.verdict === "invalid") {
						noteIntegrity("ffs-file-checksum-mismatch", logicalPath, checksum.offset, checksum.length, checksum.detail, fileArea.sourceStream ?? null);
					}
					const observedBytes = sliceRegion(parentRegion, fileHeader.absoluteBase, fileHeader.observedLength) ?? Buffer$1.alloc(0);
					const sections = [];
					let uiString = null;
					if (fileHeader.typeCode !== 240 && fileHeader.body !== null && fileHeader.bodyIssue !== null) {
						const { start, end } = fileHeader.body;
						noteOmission("unparsed-region", fileArea, logicalPath, absoluteOffset(fileArea, start), absoluteOffset(fileArea, end), `FFS file ${logicalPath} has a valid header but its data is not marked valid.`);
					} else if (fileHeader.typeCode !== 240 && fileHeader.body !== null) {
						const { start: bodyStart, end: observedEnd } = fileHeader.body;
						const sectioned = fileHeader.typeCode >= 2 && fileHeader.typeCode <= 15;
						if (sectioned) {
							uiString = await walkSectionChain(subRegion(fileArea, bodyStart, observedEnd), logicalPath, depth, {
								volumeOffset: volume.offset,
								records: sections,
								largeFile: fileHeader.headerLength === FFS_HEADER_LAYOUT.extendedLength
							});
						} else {
							if (!truncatesArea) payloads.set(logicalPath, payloadOf(fileArea, bodyStart, observedEnd));
							if (fileHeader.typeCode === 1 && observedEnd - bodyStart >= FV_HEADER_LAYOUT.minimumLength) {
								await scanVolumesInRegion(subRegion(fileArea, bodyStart, observedEnd), depth + 1, volume.offset, `${logicalPath}/embedded`, "embedded-probe");
							}
						}
					}
					volume.ffs_files.push({
						source_stream: fileArea.sourceStream ?? null,
						offset: fileHeader.absoluteBase,
						header_length: fileHeader.headerLength,
						length: fileHeader.observedLength,
						declared_length: fileHeader.declaredLength,
						guid: fileHeader.nameGuid ?? "ffffffff-ffff-ffff-ffff-ffffffffffff",
						type_code: fileHeader.typeCode,
						type_name: ffsTypeNameFor(fileHeader.typeCode),
						attributes: fileHeader.attributes,
						alignment: String(fileHeader.dataAlignment),
						state: fileHeader.rawState,
						state_flags: fileHeader.stateFlags,
						checksum: checksum.verdict,
						ui_string: uiString,
						logical_path: logicalPath,
						volume_offset: volume.offset,
						sha256: sha256Hex(observedBytes),
						sections
					});
					if (read.padding !== null) notePadding(read.padding);
					cursor = read.nextLocal;
				}
				noteUnparsedRange(fileArea, absoluteOffset(fileArea, cursor), volumeEnd, volume.logical_path);
			};
			const walkSectionChain = async (region, parentLogicalPath, depth, owner) => {
				const { volumeOffset, records, largeFile } = owner;
				const walked = walkSections(region, reserve, largeFile);
				if (walked.remainder !== null) {
					const limited = walked.remainder.kind === "limited";
					noteOmission(limited ? "size-truncated" : "unparsed-region", region, parentLogicalPath, absoluteOffset(region, walked.remainder.start), absoluteOffset(region, region.end), limited ? `Structural record limit reached during section walk under ${parentLogicalPath}.` : `Section chain under ${parentLogicalPath} ends with incomplete framing.`);
				}
				for (const padding of walked.nonzeroPadding) {
					noteOmission("unparsed-region", region, parentLogicalPath, absoluteOffset(region, padding.start), absoluteOffset(region, padding.end), `Nonzero alignment bytes in section chain under ${parentLogicalPath}.`);
				}
				let uiString = null;
				for (const [index, draft] of walked.sections.entries()) {
					checkpoint();
					const logicalPath = `${parentLogicalPath}/section[${index}]`;
					const payload = draft.payload === null ? null : payloadOf(region, draft.payload.start, draft.payload.end);
					const compression = draft.compression;
					const record = {
						logical_path: logicalPath,
						parent_logical_path: parentLogicalPath,
						source_stream: region.sourceStream ?? null,
						offset: draft.absoluteBase,
						header_length: draft.headerLength,
						length: draft.observedLength,
						declared_length: draft.declaredLength,
						truncated: draft.truncated,
						malformed: draft.malformed,
						type_code: draft.typeCode,
						type_name: SECTION_TYPE_NAME_BY_CODE[draft.typeCode] ?? "unknown",
						sha256: sha256Hex(payload?.bytes ?? Buffer$1.alloc(0)),
						compression: compression.kind === "none" ? compression : {
							kind: compression.kind,
							guid: compression.guid,
							data_offset: compression.dataOffset,
							attributes: compression.attributes
						},
						sub_volumes: []
					};
					records.push(record);
					if (draft.truncated || draft.malformed) {
						noteOmission(draft.truncated ? "size-truncated" : "unparsed-region", region, logicalPath, draft.absoluteBase, draft.absoluteBase + draft.observedLength, draft.framingIssue === undefined ? `Section ${logicalPath} framing is ${draft.malformed ? "malformed" : "truncated"}; declared ${draft.declaredLength} bytes, observed ${draft.observedLength}.` : `Section ${logicalPath} has invalid framing. ${draft.framingIssue}`);
						continue;
					}
					if (draft.payload === null || payload === null) continue;
					const content = draft.content;
					if (content.kind === "unsupported") {
						noteCarrierGap(logicalPath, payload, content.gap, content.detail ?? `No decoder is available for ${compression.kind} section ${logicalPath}.`);
						continue;
					}
					if (content.kind !== "decode") {
						if (compression.kind === "none") payloads.set(logicalPath, payload);
						else if (content.kind === "stored-sections" && content.guidedIntegrityUnchecked) noteLimitations([`Guided integrity status for ${logicalPath} was not verified.`]);
						if (draft.payload.start === draft.payload.end && content.kind !== "ui") {
							if (content.kind === "volume") noteOmission("unparsed-region", region, logicalPath, draft.absoluteBase, draft.absoluteBase + draft.observedLength, `FV-image section ${logicalPath} has an empty payload.`);
							continue;
						}
					}
					const payloadRegion = subRegion(region, draft.payload.start, draft.payload.end);
					if (content.kind === "ui") {
						const name = decodeUiString(payload.bytes);
						if (name.kind === "found") uiString ??= name.value;
						else {
							const limited = name.kind === "limited";
							noteOmission(limited ? "size-truncated" : "unparsed-region", region, logicalPath, limited ? payload.range.offset + UI_STRING_BYTES : draft.absoluteBase, draft.absoluteBase + draft.observedLength, limited ? `UI name under ${logicalPath} exceeds the ${UI_STRING_BYTES}-byte display limit.` : `UI section ${logicalPath} has no complete NUL-terminated UTF-16 name.`);
						}
					} else if (content.kind === "volume") {
						const nested = await scanVolumesInRegion(payloadRegion, depth + 1, volumeOffset, logicalPath, "fv-image-section");
						record.sub_volumes = nested.volumes.map((entry) => entry.logical_path);
					} else if (content.kind === "stored-sections") {
						if (depth >= limits.maxDepth) {
							noteOmission("depth-limited", payloadRegion, logicalPath, payload.range.offset, payload.range.offset + payload.range.length, `Section depth limit reached under ${logicalPath}.`);
						} else {
							const childUi = await walkSectionChain(payloadRegion, logicalPath, depth + 1, owner);
							uiString ??= childUi;
						}
					} else if (content.kind === "decode") {
						const decoded = await resolveDecodedSection(payload, logicalPath, depth, content.format);
						if (decoded === null) continue;
						const decodedRegion = {
							buffer: decoded.bytes,
							start: 0,
							end: decoded.bytes.length,
							origin: 0,
							sourceStream: logicalPath
						};
						const leadingSection = startsWithSectionFrame(decodedRegion);
						const rootVolume = leadingSection ? parseFirmwareVolumeHeader(decodedRegion, decodedRegion.start, reserve) : null;
						const sectionsFirst = leadingSection && (rootVolume === null || rootVolume.implausibilities.length > 0);
						if (!sectionsFirst) {
							const nested = await scanVolumesInRegion(decodedRegion, depth + 1, volumeOffset, `${logicalPath}/${decoded.format}`, "embedded-probe");
							record.sub_volumes = nested.volumes.map((entry) => entry.logical_path);
							if (nested.status === "absent") {
								noteUnparsedRange(decodedRegion, 0, decoded.bytes.length, logicalPath, { detail: `Decoded stream at ${logicalPath} has no confirmed volume or section framing; decoded bytes retained.` });
							}
						} else {
							const childUi = await walkSectionChain(decodedRegion, logicalPath, depth + 1, {
								volumeOffset,
								records
							});
							uiString ??= childUi;
						}
					}
				}
				return uiString;
			};
			const resolveDecodedSection = async (payload, logicalPath, depth, format) => {
				const maxOutputBytes = Math.min(UEFI_FIRMWARE_LIMITS.lzmaOutputBytes, UEFI_FIRMWARE_LIMITS.decodedBytes - decodedBytes);
				if (depth >= limits.maxDepth) return noteCarrierGap(logicalPath, payload, "depth-limited", `Decode depth limit reached under ${logicalPath}.`);
				if (maxOutputBytes <= 0) return noteCarrierGap(logicalPath, payload, "size-truncated", `Aggregate decoded output limit reached under ${logicalPath}.`);
				if (payload.bytes.length === 0) return noteCarrierGap(logicalPath, payload, "unparsed-region", `Empty ${format} carrier at ${logicalPath}.`);
				let carrier = payload;
				if (format === "zlib") {
					const peeled = peelAmdZlibPayload(payload.bytes);
					if (peeled === null || peeled.declaredCompressedSize !== peeled.stream.length) {
						return noteCarrierGap(logicalPath, payload, "unparsed-region", `Invalid AMD zlib header or stream length at ${logicalPath}; carrier retained.`);
					}
					carrier = {
						bytes: peeled.stream,
						sourceStream: payload.sourceStream,
						range: {
							offset: payload.range.offset + 256,
							length: peeled.stream.length
						}
					};
				}
				const decodedResult = await decodeLzma({
					payload: carrier.bytes,
					format,
					maxOutputBytes
				});
				checkpoint();
				if (!decodedResult.ok) {
					return noteCarrierGap(logicalPath, payload, decodedResult.reason === "output-limit" ? "size-truncated" : "unparsed-region", `${format} decode failed at ${logicalPath}: ${decodedResult.message}`);
				}
				const outcome = decodedResult.outcome;
				if (outcome.bytes.length > maxOutputBytes) {
					return noteCarrierGap(logicalPath, payload, "size-truncated", `Decoded output exceeded its byte limit at ${logicalPath}.`);
				}
				if (outcome.consumedBytes < carrier.range.length) {
					const unusedBytes = carrier.range.length - outcome.consumedBytes;
					recordOmission({
						kind: "unparsed-region",
						logical_path: logicalPath,
						source_stream: carrier.sourceStream,
						range: {
							offset: carrier.range.offset + outcome.consumedBytes,
							length: unusedBytes
						},
						detail: `The ${format} decoder did not examine the final ${unusedBytes} bytes of the carrier at ${logicalPath}.`
					});
					carrier = {
						bytes: carrier.bytes.subarray(0, outcome.consumedBytes),
						sourceStream: carrier.sourceStream,
						range: {
							offset: carrier.range.offset,
							length: outcome.consumedBytes
						}
					};
				}
				decodedBytes += outcome.bytes.length;
				const decoded = {
					bytes: outcome.bytes,
					format,
					decoderVersion: outcome.decoderVersion,
					carrier
				};
				decodedStreams.set(logicalPath, decoded);
				return decoded;
			};
			const imageRegion0 = imageRegion(image, 0, image.length);
			await scanVolumesInRegion(imageRegion0, 0, null, "flash");
			const { tables: pspTables, candidates: pspCandidates } = scanPspDirectories(image, reserve);
			return {
				inputSize: image.length,
				payloads,
				decodedStreams,
				compressedCarriers,
				volumes,
				unknownRegions,
				integrity,
				pspTables,
				pspCandidates,
				limitations,
				omissions,
				coverage: structuralLimitReached || incompleteFraming || omissions.some(({ kind }) => kind !== "pad-file") ? "partial" : "complete"
			};
		};
		subRegion = (region, start, end) => ({
			...region,
			start,
			end,
			origin: absoluteOffset(region, start)
		});
		UI_STRING_BYTES = 1024;
	})))();
}

//#endregion
//#region dist/uefi/UefiNvram.js
function readNvarRecord(reader, offset, endOffset, reserve) {
	if (offset < 0 || offset + NVAR_BYTES.length > endOffset || reader.u32(offset) !== NVAR_MAGIC) return { kind: "end" };
	if (!reserve(offset)) return { kind: "limited" };
	if (offset + NVAR_HEADER_BYTES > endOffset) return { kind: "invalid-frame" };
	const totalSize = reader.u16(offset + 4);
	const entryEnd = offset + totalSize;
	if (totalSize < NVAR_HEADER_BYTES || entryEnd > endOffset) return { kind: "invalid-frame" };
	const attributes = reader.u8(offset + 9);
	if ((attributes & NVAR_ATTRIBUTES.valid) === 0) return {
		kind: "inactive",
		endOffset: entryEnd
	};
	const entry = parseActiveRecord(reader, offset, entryEnd, attributes);
	return entry === null ? {
		kind: "malformed",
		endOffset: entryEnd
	} : {
		kind: "active",
		entry
	};
}
/** A short matching signature at an established boundary is a truncated successor. */
function readNvarSuccessor(reader, offset, endOffset, reserve) {
	const remaining = endOffset - offset;
	if (remaining > 0 && remaining < NVAR_BYTES.length && reader.bytes.subarray(offset, endOffset).equals(NVAR_BYTES.subarray(0, remaining))) {
		return reserve(offset) ? { kind: "invalid-frame" } : { kind: "limited" };
	}
	return readNvarRecord(reader, offset, endOffset, reserve);
}
function parseActiveRecord(reader, offset, entryEnd, attributes) {
	if (entryEnd - offset < NVAR_MIN_ENTRY_BYTES) return null;
	const next = reader.u16(offset + 6) | reader.u8(offset + 8) << 16;
	const bodyStart = offset + NVAR_HEADER_BYTES;
	let dataEnd = entryEnd;
	if ((attributes & NVAR_ATTRIBUTES.extendedHeader) !== 0) {
		if (entryEnd - bodyStart < 3) return null;
		const extensionSize = reader.u16(entryEnd - 2);
		if (extensionSize < 3 || extensionSize > entryEnd - bodyStart) return null;
		dataEnd -= extensionSize;
	}
	let dataOffset = bodyStart;
	let name = null;
	let guidIndex = null;
	let guid = null;
	if ((attributes & NVAR_ATTRIBUTES.dataOnly) === 0) {
		const inlineGuid = (attributes & NVAR_ATTRIBUTES.localGuid) !== 0;
		const nameStart = bodyStart + (inlineGuid ? 16 : 1);
		const parsedName = readNvarName(reader, nameStart, dataEnd, (attributes & NVAR_ATTRIBUTES.asciiName) !== 0);
		if (parsedName === null) return null;
		({name, dataOffset} = parsedName);
		if (inlineGuid) guid = formatGuidLittleEndian(reader.bytes, bodyStart);
		else guidIndex = reader.u8(bodyStart);
	}
	return {
		offset,
		name,
		next,
		attributes,
		guidIndex,
		guid,
		dataOffset,
		dataLength: dataEnd - dataOffset,
		endOffset: entryEnd
	};
}
/** Walk a confirmed chain without using record bodies to advance its cursor. */
function collectChain(context, frame, scope, out) {
	const { reader, reserve, maxDepth, noteOmission } = context;
	let cursor = frame.offset;
	let record = frame.first;
	while (record.kind !== "end" && record.kind !== "limited") {
		if (record.kind === "invalid-frame") {
			noteOmission(`NVAR record at 0x${cursor.toString(16)} has an incomplete or invalid extent.`);
			return {
				endOffset: cursor,
				nextSearchOffset: cursor + 1
			};
		}
		if (record.kind !== "active") {
			if (record.kind === "malformed") noteOmission(`NVAR record at 0x${cursor.toString(16)} has malformed variable data.`);
			cursor = record.endOffset;
			record = readNvarSuccessor(reader, cursor, frame.endOffset, reserve);
			continue;
		}
		const { entry } = record;
		out.push({
			...entry,
			...scope
		});
		const dataEnd = entry.dataOffset + entry.dataLength;
		const nested = readNvarRecord(reader, entry.dataOffset, dataEnd, reserve);
		if (nested.kind === "limited") {
			return {
				endOffset: entry.endOffset,
				nextSearchOffset: entry.endOffset
			};
		}
		if (nested.kind === "invalid-frame") {
			noteOmission(`Possible nested NVAR record at 0x${entry.dataOffset.toString(16)} has an incomplete or invalid extent.`);
		} else if (nested.kind !== "end") {
			if (scope.depth < maxDepth) {
				collectChain(context, {
					offset: entry.dataOffset,
					first: nested,
					endOffset: dataEnd
				}, {
					depth: scope.depth + 1,
					parentOffset: entry.offset
				}, out);
			} else {
				noteOmission(`Nested NVAR chain below max_depth ${maxDepth} under variable at 0x${entry.offset.toString(16)}.`);
			}
		}
		cursor = entry.endOffset;
		record = readNvarSuccessor(reader, cursor, frame.endOffset, reserve);
	}
	return {
		endOffset: cursor,
		nextSearchOffset: cursor
	};
}
var NVAR_MAGIC, NVAR_HEADER_BYTES, NVAR_MIN_ENTRY_BYTES, NVAR_ATTRIBUTES, NVAR_BYTES, isPrintableAscii, readNvarName, scanAmiNvramStores;
function init_UefiNvram() {
	return (init_UefiNvram = __esmMin((() => {
		init_budget();
		init_binaryContainer();
		init_UefiGuid();
		init_uefiLimits();
		NVAR_MAGIC = 1380013646;
		NVAR_HEADER_BYTES = 10;
		NVAR_MIN_ENTRY_BYTES = NVAR_HEADER_BYTES + 1;
		NVAR_ATTRIBUTES = {
			valid: 128,
			extendedHeader: 16,
			dataOnly: 8,
			localGuid: 4,
			asciiName: 2
		};
		NVAR_BYTES = Buffer.from("NVAR", "ascii");
		isPrintableAscii = (byte) => byte >= 32 && byte <= 126;
		readNvarName = (reader, start, end, ascii) => {
			const width = ascii ? 1 : 2;
			for (let cursor = start; cursor + width <= end; cursor += width) {
				const unit = ascii ? reader.u8(cursor) : reader.u16(cursor);
				if (unit === 0) {
					if (cursor === start) return null;
					return {
						name: reader.bytes.toString(ascii ? "ascii" : "utf16le", start, cursor),
						dataOffset: cursor + width
					};
				}
				if (ascii ? !isPrintableAscii(unit) : unit < 32 || unit >= 55296 && unit <= 57343) return null;
			}
			return null;
		};
		scanAmiNvramStores = (image, maxStores, maxDepth, checkpoint = () => {}) => {
			const stores = [];
			const limitations = [];
			const reader = new BinaryReader(image, true, "AMI NVAR");
			let partial = false;
			const noteOmission = (detail) => {
				partial = true;
				if (limitations.length < 512) limitations.push(detail);
			};
			const records = new Budget(UEFI_FIRMWARE_LIMITS.scanRecords);
			const limit = { offset: null };
			const reserve = (offset) => {
				checkpoint();
				if (records.tryCharge(1)) return true;
				limit.offset ??= offset;
				return false;
			};
			const context = {
				reader,
				reserve,
				maxDepth,
				noteOmission
			};
			let searchFrom = 0;
			while (searchFrom + NVAR_MIN_ENTRY_BYTES <= image.length) {
				checkpoint();
				const firstOffset = image.indexOf(NVAR_BYTES, searchFrom);
				if (firstOffset < 0) break;
				const first = readNvarRecord(reader, firstOffset, image.length, reserve);
				if (first.kind === "limited") break;
				if (first.kind !== "active") {
					searchFrom = firstOffset + 1;
					continue;
				}
				if (stores.length >= maxStores) {
					limitations.push(`Stopped after ${maxStores} AMI NVRAM stores; additional stores exist.`);
					return {
						stores,
						coverage: "partial",
						limitations
					};
				}
				const variables = [];
				const { endOffset, nextSearchOffset } = collectChain(context, {
					offset: firstOffset,
					first,
					endOffset: image.length
				}, {
					depth: 0,
					parentOffset: null
				}, variables);
				let padding = 0;
				while (limit.offset === null && endOffset + padding < image.length && image[endOffset + padding] === 255) {
					if (padding % 65536 === 0) checkpoint();
					padding += 1;
				}
				if (variables.length > 0) stores.push({
					offset: firstOffset,
					name: first.entry.name,
					variables,
					trailingPadding: padding > 0 ? padding : null
				});
				searchFrom = nextSearchOffset;
				if (limit.offset !== null) break;
			}
			if (limit.offset !== null) {
				limitations.push(`Structural record limit ${UEFI_FIRMWARE_LIMITS.scanRecords} reached at NVAR candidate 0x${limit.offset.toString(16)}.`);
				return {
					stores,
					coverage: "partial",
					limitations
				};
			}
			if (stores.length === 0) limitations.push("No AMI NVRAM variable stores (NVAR chains) were found in the image.");
			return {
				stores,
				coverage: partial ? "partial" : "complete",
				limitations
			};
		};
	})))();
}

//#endregion
//#region dist/uefi/UefiProviderIdentity.js
var UEFI_PROVIDER_IDENTITY;
function init_UefiProviderIdentity() {
	return (init_UefiProviderIdentity = __esmMin((() => {
		UEFI_PROVIDER_IDENTITY = {
			id: "rea-uefi",
			name: "REA UEFI firmware parser",
			version: "1.0.0"
		};
	})))();
}

//#endregion
//#region dist/uefi/UefiFailures.js
var uefiFailureDialect;
function init_UefiFailures() {
	return (init_UefiFailures = __esmMin((() => {
		init_capturedProviderOutput();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_uefiLimits();
		init_errorMessage();
		init_classifyProviderOutcome();
		init_DarwinProcessRunTokenReader();
		init_OwnedCommand();
		init_ProviderOutcome();
		init_resources();
		init_UefiProviderIdentity();
		uefiFailureDialect = (operation, path) => {
			const providerId = UEFI_PROVIDER_IDENTITY.id;
			const cancellation = (reason, { cause: _cause, ...details }) => reason instanceof AnalysisTimeoutError ? new AnalysisTimeoutError(operation, reason.timeoutMs, {
				...details,
				cause: reason
			}) : cancelledBy(operation, carriedReason(reason instanceof AnalysisCancelledError ? reason.cause : reason), details);
			return {
				providerId,
				operation,
				file: {
					path,
					description: "UEFI artifact",
					fileSize: (cause, details) => new AnalysisInputError(operation, {
						...details,
						cause
					}, [{
						path: ["path"],
						reason: "out_of_range",
						message: cause.message
					}])
				},
				recognise(cause, details) {
					if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") {
						return cancellation(artifactFileCancellationCause(cause), {
							...details,
							partialObservation: cause.partialObservation
						});
					}
					if (cause instanceof DarwinProcessOwnershipInspectionError && cause.cancellation !== undefined) {
						return cancellation(cause.cancellation.reason, {
							...details,
							capturedOutput: cause.capturedOutput
						});
					}
					if (!(cause instanceof OwnedCommandFailure)) return undefined;
					const outcome = providerOutcomeOf(cause);
					const primary = classifyProviderOutcome(outcome.kind === "cancelled" && outcome.reason instanceof AnalysisTimeoutError ? {
						...outcome,
						kind: "timeout"
					} : outcome, {
						providerId,
						operation,
						details: {
							...details,
							...cause.cleanupFailure === null ? {} : { cleanup: {
								reason: cause.cleanupFailure,
								resources: cause.resources
							} }
						},
						capturedOutput: capturedProviderOutput,
						timeout: { ms: UEFI_FIRMWARE_LIMITS.timeoutMs },
						outputLimit: {
							limits: { diagnostic_bytes: UEFI_FIRMWARE_LIMITS.diagnosticBytes },
							recovery: {
								retryable: false,
								remediationAction: "Use a smaller firmware image or select a narrower extraction scope."
							}
						},
						dialect: (_outcome, _details, unclassified) => unclassified()
					});
					return primary;
				},
				unclassified: (cause, details) => new ProviderAdapterError(providerId, operation, {
					...details,
					cause,
					diagnostics: {
						phase: "unclassified",
						path,
						reason: errorMessage(cause)
					}
				})
			};
		};
	})))();
}

//#endregion
//#region dist/uefi/UefiPublication.js
var publishUefiFiles;
function init_UefiPublication() {
	return (init_UefiPublication = __esmMin((() => {
		init_sha256Hex();
		init_resources();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_UefiFailures();
		init_classifyProviderFailure();
		init_UefiProviderIdentity();
		publishUefiFiles = async (context) => {
			let tree;
			let result;
			const files = [];
			try {
				context.checkpoint();
				tree = await SafeOutputTree.create(context.outputDirectory);
				for (const entry of context.entries) {
					context.checkpoint();
					const sha256 = sha256Hex(entry.bytes);
					const written = await tree.write(entry.relativePath, Readable.from([entry.bytes]), {
						sha256,
						bytes: entry.bytes.length
					}, context.signal);
					files.push({
						...entry.facts,
						relative_path: written.relativePath,
						path: join(tree.outputRoot, written.relativePath),
						size: written.bytesWritten,
						sha256: written.sha256
					});
				}
				result = context.buildResult(tree.outputRoot, files);
				context.checkpoint();
				await tree.commit(context.signal);
				return { result };
			} catch (cause) {
				if (cause instanceof SafeOutputTreeCreationFailure) tree = cause.tree;
				const primary = classifyProviderFailure(cause, uefiFailureDialect(context.operation, context.outputDirectory));
				if (tree === undefined) throw primary;
				const ownedTree = tree;
				const lease = new AnalysisCleanupLease(async () => {
					await ownedTree.rollback();
				}, [ownedTree.outputRoot]);
				if (primary.cleanupIncomplete) lease.bindCleanupError(primary);
				const released = await context.resources.release({
					kind: "lease",
					resource: ownedTree.outputRoot,
					lease
				});
				if (released.kind === "released") {
					if (tree.published && result !== undefined) return { result };
					throw primary;
				}
				const cleanup = new ProviderCleanupError(UEFI_PROVIDER_IDENTITY.id, [tree.outputRoot], { reason: String(released.cause) }, {
					cause: released.cause,
					operation: context.operation
				});
				new AnalysisCleanupLeaseGroup(cleanup, [released.lease]);
				const failure = analysisErrorWithCleanupDependencies(primary, cleanup, context.operation);
				if (tree.published && result !== undefined) return {
					result,
					failure
				};
				throw failure;
			}
		};
	})))();
}

//#endregion
//#region dist/uefi/UefiLzmaProtocol.js
var decodeFailureReasonSchema, lzmaRequestSchema, lzmaReplySchema;
function init_UefiLzmaProtocol() {
	return (init_UefiLzmaProtocol = __esmMin((() => {
		init_digests();
		init_uefiLimits();
		decodeFailureReasonSchema = z.enum([
			"format",
			"decoder",
			"output-limit"
		]);
		lzmaRequestSchema = z.strictObject({
			format: z.enum(["lzma", "lzmaf86"]),
			payload_path: z.string(),
			output_path: z.string(),
			reply_path: z.string(),
			max_output_bytes: z.number().int().min(1).max(UEFI_FIRMWARE_LIMITS.lzmaOutputBytes)
		});
		lzmaReplySchema = z.discriminatedUnion("ok", [z.strictObject({
			ok: z.literal(true),
			lzma_version: z.string(),
			input_bytes_consumed: z.number().int().min(1).max(UEFI_FIRMWARE_LIMITS.inputBytes),
			output: z.strictObject({
				sha256: digestSchema,
				bytes: z.number().int().min(0)
			})
		}), z.strictObject({
			ok: z.literal(false),
			reason: decodeFailureReasonSchema,
			message: z.string()
		})]);
	})))();
}

//#endregion
//#region dist/uefi/UefiAnalysisProvider.js
var inflateBounded, hex, targetInputError, selectTarget, UefiAnalysisProvider;
function init_UefiAnalysisProvider() {
	return (init_UefiAnalysisProvider = __esmMin((() => {
		init_nodeCodecResult();
		init_sha256Hex();
		init_parseFailure();
		init_errorMessage();
		init_resources();
		init_AnalysisProvider();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_jsonValue();
		init_uefiLimits();
		init_uefiFirmwareAnalysis();
		init_OwnedCommand();
		init_OwnedCommandCleanup();
		init_PrivateRuntimeRoot();
		init_UefiImageScan();
		init_UefiNvram();
		init_UefiFailures();
		init_classifyProviderFailure();
		init_UefiPublication();
		init_UefiLzmaProtocol();
		init_UefiProviderIdentity();
		inflateBounded = promisify(inflate);
		hex = (value) => `0x${value.toString(16)}`;
		targetInputError = (message) => new AnalysisInputError("extract_uefi_firmware", { cause: undefined }, [{
			path: ["target"],
			reason: "invalid_value",
			message
		}]);
		selectTarget = (scan, target) => {
			if (target.kind === "whole-image") {
				return {
					offset: 0,
					length: scan.inputSize,
					logical_path: "flash",
					source_stream: null
				};
			}
			const matches = (record) => record.offset === target.offset && (target.source_stream === undefined || record.source_stream === target.source_stream);
			const records = target.kind === "volume" ? scan.volumes : target.kind === "ffs-file" ? scan.volumes.flatMap((volume) => volume.ffs_files) : scan.volumes.flatMap((volume) => volume.ffs_files.flatMap((file) => file.sections));
			const selected = records.filter(matches);
			const record = selected[0];
			if (record === undefined) {
				throw targetInputError(`No mapped ${target.kind} at ${hex(target.offset)} in the selected stream.`);
			}
			if (selected.length > 1) {
				throw targetInputError(`The ${target.kind} offset ${hex(target.offset)} appears in multiple streams. Select one with source_stream: ${selected.map(({ source_stream }) => JSON.stringify(source_stream)).join(", ")}.`);
			}
			return record;
		};
		UefiAnalysisProvider = class {
			#closing = false;
			#tail = Promise.resolve();
			#resources = new ArtifactResourceScope();
			#workerModulePath;
			constructor(workerModulePath = fileURLToPath(new URL("./UefiLzmaWorker.js", new URL("../uefi/UefiAnalysisProvider.js", import.meta.url).href))) {
				this.#workerModulePath = workerModulePath;
			}
			async inspectAvailability() {
				return {
					status: "available",
					code: null,
					reason: null,
					diagnostics: {
						decoder: "lzma-purejs (owned worker)",
						external_tools: "none"
					}
				};
			}
			async close() {
				this.#closing = true;
				await this.#tail.catch(() => undefined);
				await this.#resources.close();
			}
			async execute(request, options) {
				if (this.#closing) {
					return {
						ok: false,
						error: new AnalysisInputError(request.operation, { cause: undefined }, [{
							path: [],
							reason: "invalid_value",
							message: "rea-uefi provider is closed; construct a new provider."
						}])
					};
				}
				const signal = options?.signal;
				if (signal?.aborted) return this.#cancelled(request, signal.reason);
				const started = { value: false };
				const queued = this.#serialize(async () => {
					started.value = true;
					if (signal?.aborted) return this.#cancelled(request, signal.reason);
					return this.#executeWithDeadline(request, options);
				});
				return signal === undefined ? queued : this.#raceWithAbort(queued, request, signal, started);
			}
			#cancelled(request, reason) {
				return {
					ok: false,
					error: cancelledBy(request.operation, carriedReason(reason))
				};
			}
			#raceWithAbort(queued, request, signal, started) {
				if (signal.aborted && !started.value) {
					return Promise.resolve(this.#cancelled(request, signal.reason));
				}
				return new Promise((resolve) => {
					const onAbort = () => {
						if (!started.value) resolve(this.#cancelled(request, signal.reason));
					};
					signal.addEventListener("abort", onAbort, { once: true });
					queued.then((result) => {
						signal.removeEventListener("abort", onAbort);
						resolve(result);
					}, (cause) => {
						signal.removeEventListener("abort", onAbort);
						resolve({
							ok: false,
							error: classifyProviderFailure(cause, uefiFailureDialect(request.operation, request.input.path))
						});
					});
				});
			}
			#serialize(task) {
				const run = this.#tail.then(task, task);
				this.#tail = run.then(() => undefined, () => undefined);
				return run;
			}
			/** Bound the whole request with one deadline, including every decode stage. */
			async #executeWithDeadline(request, options) {
				const controller = new AbortController();
				const timeoutMs = UEFI_FIRMWARE_LIMITS.timeoutMs;
				const deadline = performance.now() + timeoutMs;
				const deadlineReason = new AnalysisTimeoutError(request.operation, timeoutMs);
				const expire = () => controller.abort(deadlineReason);
				const timer = setTimeout(expire, timeoutMs);
				const parent = options?.signal;
				const onParentAbort = () => controller.abort(cancelledBy(request.operation, carriedReason(parent?.reason)));
				if (parent?.aborted) onParentAbort();
				else parent?.addEventListener("abort", onParentAbort, { once: true });
				const checkpoint = () => {
					if (performance.now() >= deadline) expire();
					controller.signal.throwIfAborted();
				};
				try {
					return {
						ok: true,
						value: await this.#executeWithSignal(request, controller.signal, checkpoint)
					};
				} catch (cause) {
					return {
						ok: false,
						error: classifyProviderFailure(cause, uefiFailureDialect(request.operation, request.input.path))
					};
				} finally {
					clearTimeout(timer);
					parent?.removeEventListener("abort", onParentAbort);
				}
			}
			async #executeWithSignal(request, signal, checkpoint) {
				const finishObservation = (value) => {
					try {
						checkpoint();
						return value;
					} catch (cause) {
						throw classifyProviderFailure(cause, uefiFailureDialect(request.operation, request.input.path)).retainPartialObservation({
							kind: "uefi",
							result: value.result,
							provenance: jsonValueSchema.parse(value.subject)
						});
					}
				};
				return this.#resources.run(async () => {
					checkpoint();
					const snapshot = await readStableArtifact(request.input.path, UEFI_FIRMWARE_LIMITS.inputBytes, signal, undefined, this.#resources);
					checkpoint();
					if (request.operation === "inspect_uefi_nvram") {
						const value = this.#inspectNvram(request, snapshot.sha256, snapshot.bytes, checkpoint);
						return finishObservation(value);
					}
					const scan = await scanUefiImage(snapshot.bytes, {
						maxDepth: request.input.max_depth,
						maxVolumes: request.input.max_volumes,
						maxFiles: request.input.max_files
					}, ({ payload, format, maxOutputBytes }) => this.#decodeStream(request.operation, payload, format, maxOutputBytes, signal), checkpoint);
					checkpoint();
					if (request.operation === "extract_uefi_firmware") {
						return this.#extract(request, snapshot.sha256, scan, signal, checkpoint);
					}
					return finishObservation(this.#inspect(request, snapshot.sha256, scan));
				});
			}
			#inspect(request, imageSha256, scan) {
				const firstVolume = scan.volumes[0];
				const entryBasis = firstVolume === undefined ? "unknown" : firstVolume.offset === 0 ? "fv-at-zero" : scan.pspTables.some((table) => table.offset < firstVolume.offset) ? "amd-psp-first" : "scanned";
				const result = uefiResultSchemas.inspect_uefi_firmware.parse({
					parser: {
						name: "rea-uefi",
						version: UEFI_PROVIDER_IDENTITY.version
					},
					input_size: scan.inputSize,
					flash_image: {
						sha256: imageSha256,
						size: scan.inputSize,
						entry_basis: entryBasis
					},
					firmware_volumes: scan.volumes,
					psp_tables: scan.pspTables.map((table) => ({
						offset: table.offset,
						length: table.length,
						table_magic: table.tableMagic,
						total_entries: table.totalEntries,
						entries: table.entries.map((entry) => ({
							type: entry.type,
							declared_location: entry.declaredLocation,
							declared_location_raw: entry.declaredLocationRaw,
							address_mode: entry.addressMode,
							declared_size: entry.declaredSize,
							image_offset: entry.imageOffset,
							sha256: entry.sha256,
							location_basis: entry.locationBasis
						})),
						entry_stride_basis: table.entryStrideBasis
					})),
					psp_candidates: scan.pspCandidates,
					unknown_regions: scan.unknownRegions,
					integrity: scan.integrity,
					coverage: scan.coverage,
					limitations: [...scan.limitations]
				});
				return createAnalysisExecution(result, UEFI_PROVIDER_IDENTITY, {
					subject: {
						path: request.input.path,
						sha256: imageSha256,
						format: "file"
					},
					locations: [{
						kind: "artifact-path",
						path: request.input.path
					}],
					limitations: [...scan.limitations, "Static cartography only; no executable code is loaded or emulated."]
				});
			}
			/** AMI NVRAM stores are parsed from the raw image; no firmware-volume walk needed. */
			#inspectNvram(request, imageSha256, image, checkpoint) {
				const scan = scanAmiNvramStores(image, request.input.max_stores, request.input.max_depth, checkpoint);
				const result = uefiResultSchemas.inspect_uefi_nvram.parse({
					parser: {
						name: "rea-uefi",
						version: UEFI_PROVIDER_IDENTITY.version
					},
					input_size: image.length,
					image_sha256: imageSha256,
					stores: scan.stores.map((store) => ({
						offset: store.offset,
						name: store.name,
						variables: store.variables.map((variable) => {
							checkpoint();
							return {
								offset: variable.offset,
								name: variable.name,
								attributes: variable.attributes,
								next: variable.next,
								guid_index: variable.guidIndex,
								guid: variable.guid,
								depth: variable.depth,
								parent_offset: variable.parentOffset,
								data_offset: variable.dataOffset,
								data_length: variable.dataLength,
								data_sha256: sha256Hex(image.subarray(variable.dataOffset, variable.dataOffset + variable.dataLength))
							};
						}),
						trailing_padding: store.trailingPadding
					})),
					coverage: scan.coverage,
					limitations: [...scan.limitations]
				});
				return createAnalysisExecution(result, UEFI_PROVIDER_IDENTITY, {
					subject: {
						path: request.input.path,
						sha256: imageSha256,
						format: "file"
					},
					locations: [{
						kind: "artifact-path",
						path: request.input.path
					}],
					limitations: [...scan.limitations, "Static AMI NVRAM parsing only; variable bytes are reported, never interpreted or executed."]
				});
			}
			async #extract(request, imageSha256, scan, signal, checkpoint) {
				const input = request.input;
				const selection = selectTarget(scan, input.target);
				const includes = (path) => path === selection.logical_path || path.startsWith(`${selection.logical_path}/`);
				const gaps = [];
				const derivations = [];
				const plan = [];
				const emittedStreams = new Set();
				let stagedBytes = 0;
				const gap = (kind, logical_path, source_stream, range, detail) => {
					gaps.push({
						kind,
						logical_path,
						source_stream,
						range: range !== null && range.length > 0 ? range : null,
						detail
					});
				};
				const stage = (logicalPath, suffix, payload, source, parentLogicalPath, mediaType = null) => {
					checkpoint();
					if (payload.bytes.length === 0) return null;
					if (plan.length >= input.max_output_files || stagedBytes + payload.bytes.length > input.max_output_bytes) {
						gap("size-truncated", logicalPath, payload.sourceStream, payload.range, `Output file or byte limit prevented publication of ${logicalPath}.`);
						return null;
					}
					const relativePath = `${logicalPath.replaceAll(":", "-").replaceAll("[", "-").replaceAll("]", "")}.${suffix}.bin`;
					stagedBytes += payload.bytes.length;
					plan.push({
						relativePath,
						bytes: payload.bytes,
						facts: {
							original_file_range: payload.sourceStream === null ? payload.range : null,
							source_stream: payload.sourceStream,
							source_range: payload.range,
							runtime_address: null,
							media_type: mediaType,
							source,
							parent_logical_path: parentLogicalPath
						}
					});
					return relativePath;
				};
				const recordDerivation = (stream) => {
					if (stream === null || emittedStreams.has(stream)) return;
					const decoded = scan.decodedStreams.get(stream);
					if (decoded === undefined) throw new Error(`Missing decoded source ${stream}.`);
					const { carrier, format, decoderVersion } = decoded;
					recordDerivation(carrier.sourceStream);
					emittedStreams.add(stream);
					const child = includes(stream) ? stage(stream, "decoded", {
						bytes: decoded.bytes,
						sourceStream: stream,
						range: {
							offset: 0,
							length: decoded.bytes.length
						}
					}, `decompressed-${format}`, stream) : null;
					derivations.push({
						parent_path: stream,
						parent_file_range: carrier.sourceStream === null ? carrier.range : null,
						parent_stream: carrier.sourceStream,
						parent_stream_range: carrier.range,
						child_path: child,
						child_stream: stream,
						handler: `${format === "zlib" ? "node-zlib" : "lzma-purejs"}@${decoderVersion}${format === "lzmaf86" ? "+x86-bcj" : ""}`
					});
				};
				recordDerivation(selection.source_stream);
				for (const volume of scan.volumes) {
					for (const file of volume.ffs_files) {
						checkpoint();
						if (includes(file.logical_path)) {
							recordDerivation(file.source_stream);
							const raw = scan.payloads.get(file.logical_path);
							if (raw !== undefined) {
								stage(file.logical_path, "body", raw, "uncompressed-payload", null);
							}
						}
						for (const section of file.sections) {
							if (!includes(section.logical_path)) continue;
							checkpoint();
							if (section.truncated || section.malformed) continue;
							const path = section.logical_path;
							recordDerivation(section.source_stream);
							const payload = scan.payloads.get(path);
							const carrier = scan.compressedCarriers.get(path);
							if (scan.decodedStreams.has(path)) {
								recordDerivation(path);
							} else if (carrier !== undefined && input.include_compressed) {
								stage(path, "compressed", carrier, "compressed-passthrough", section.parent_logical_path);
							} else if (payload !== undefined && section.sub_volumes.length === 0) {
								stage(path, "payload", payload, "raw-section", section.parent_logical_path, section.type_code === 16 ? "application/vnd.microsoft.portable-executable" : null);
							}
						}
					}
				}
				for (const omission of scan.omissions) {
					if (!includes(omission.logical_path)) continue;
					checkpoint();
					recordDerivation(omission.source_stream);
					gaps.push(omission);
				}
				if (scan.volumes.length === 0 && gaps.length === 0) {
					gap("unparsed-region", selection.logical_path, selection.source_stream, {
						offset: selection.offset,
						length: selection.length
					}, "No firmware volumes were mapped in the input image.");
				}
				const publication = await publishUefiFiles({
					outputDirectory: input.output_directory,
					operation: request.operation,
					entries: plan,
					resources: this.#resources,
					signal,
					checkpoint,
					buildResult: (outputRoot, files) => uefiResultSchemas.extract_uefi_firmware.parse({
						parser: {
							name: "rea-uefi",
							version: UEFI_PROVIDER_IDENTITY.version
						},
						selection: {
							offset: selection.offset,
							length: selection.length,
							source_stream: selection.source_stream,
							target_kind: input.target.kind
						},
						output_directory: outputRoot,
						coverage: gaps.some(({ kind }) => kind !== "pad-file") ? "partial" : "complete",
						files,
						derivations,
						extraction_gaps: gaps,
						diagnostics: `${scan.volumes.length} volumes mapped; ${derivations.length} stream derivation(s), ${gaps.length} gap(s); wrote ${files.length} file(s).`,
						published_bytes: files.reduce((total, file) => total + file.size, 0)
					})
				});
				const { result } = publication;
				if (publication.failure !== undefined) {
					throw publication.failure.retainPartialObservation({
						kind: "uefi",
						result: jsonValueSchema.parse(result),
						provenance: {
							path: input.path,
							sha256: imageSha256
						}
					});
				}
				return createAnalysisExecution(result, UEFI_PROVIDER_IDENTITY, {
					subject: {
						path: input.path,
						sha256: imageSha256,
						format: "file"
					},
					locations: [{
						kind: "artifact-path",
						path: input.path
					}],
					limitations: input.target.kind === "whole-image" ? scan.limitations : gaps.filter(({ kind }) => kind !== "pad-file").slice(0, 512).map(({ detail }) => detail)
				});
			}
			async #decodeStream(operation, payload, format, maxOutputBytes, signal) {
				signal.throwIfAborted();
				if (format === "zlib") {
					try {
						const { buffer: bytes, consumedBytes } = nodeCodecResult(await inflateBounded(payload, {
							info: true,
							maxOutputLength: maxOutputBytes
						}));
						if (consumedBytes !== payload.length) return {
							ok: false,
							reason: "format",
							message: `AMD zlib stream used ${consumedBytes} of ${payload.length} declared compressed bytes.`
						};
						return {
							ok: true,
							outcome: {
								bytes,
								decoderVersion: process.versions.zlib ?? "unknown",
								consumedBytes
							}
						};
					} catch (cause) {
						const limit = hostRangeErrorKind(cause) === "host-capacity";
						return {
							ok: false,
							reason: limit ? "output-limit" : "decoder",
							message: limit ? `zlib output exceeds the configured or host buffer ceiling of ${maxOutputBytes} bytes: ${errorMessage(cause)}` : errorMessage(cause)
						};
					}
				}
				const root = await PrivateRuntimeRoot.create({ prefix: "rea-uefi-lzma-" });
				const files = new ArtifactResourceScope();
				let worker;
				const rootLease = AnalysisCleanupLease.forCloseOwner({
					async close() {
						if (worker?.cleanupOwner !== undefined) {
							const stopped = await worker.cleanupOwner.stop();
							if (stopped.status === "incomplete") throw new Error(stopped.reason);
							worker = undefined;
						}
						await files.close();
						await root.close();
					},
					get cleanupResources() {
						return [...new Set([
							...worker?.resources ?? [],
							...files.cleanupResources,
							root.path
						])];
					}
				}, root.path);
				const workspace = {
					kind: "lease",
					resource: root.path,
					lease: rootLease
				};
				const decode = async () => {
					const payloadPath = join(root.path, "payload.bin");
					const outputPath = join(root.path, "output.bin");
					const replyPath = join(root.path, "reply.json");
					const requestPath = join(root.path, "request.json");
					await writeFile(payloadPath, payload, {
						flag: "wx",
						mode: 384
					});
					await writeFile(requestPath, JSON.stringify({
						format,
						payload_path: payloadPath,
						output_path: outputPath,
						reply_path: replyPath,
						max_output_bytes: maxOutputBytes
					}), {
						flag: "wx",
						mode: 384
					});
					const { NODE_OPTIONS: _ambientNodeOptions, ...environment } = process.env;
					await runOwnedCommand({
						command: process.execPath,
						arguments: [
							"--max-old-space-size=256",
							"--disable-wasm-trap-handler",
							this.#workerModulePath,
							requestPath
						],
						cwd: root.path,
						expectedCommand: null,
						runId: `rea-uefi-lzma-${randomUUID()}`,
						hostEnvironment: environment
					}, {
						timeoutMs: UEFI_FIRMWARE_LIMITS.timeoutMs,
						diagnosticBytes: UEFI_FIRMWARE_LIMITS.diagnosticBytes
					}, { signal });
					const replyFile = await readStableArtifact(replyPath, UEFI_FIRMWARE_LIMITS.diagnosticBytes, signal, undefined, files);
					const reply = lzmaReplySchema.parse(JSON.parse(replyFile.bytes.toString("utf8")));
					if (!reply.ok) {
						return reply;
					}
					const consumedBytes = reply.input_bytes_consumed;
					if (consumedBytes > payload.length) {
						return {
							ok: false,
							reason: "decoder",
							message: `LZMA worker reported consuming ${consumedBytes} bytes from a ${payload.length}-byte input.`
						};
					}
					signal.throwIfAborted();
					const decoded = await readStableArtifact(outputPath, maxOutputBytes, signal, undefined, files);
					if (decoded.sha256 !== reply.output.sha256 || decoded.bytes.length !== reply.output.bytes) {
						return {
							ok: false,
							reason: "decoder",
							message: `LZMA worker output digest mismatch (${reply.output.sha256}).`
						};
					}
					return {
						ok: true,
						outcome: {
							bytes: decoded.bytes,
							decoderVersion: reply.lzma_version,
							consumedBytes
						}
					};
				};
				let outcome;
				let primary;
				try {
					outcome = await decode();
				} catch (cause) {
					primary = classifyProviderFailure(cause, uefiFailureDialect(operation, root.path));
					const preparation = processInspectionFailure(cause);
					if (preparation !== undefined) {
						primary = retainProcessInspectionCleanup(preparation, primary, this.#resources, operation);
					}
					if (cause instanceof OwnedCommandFailure && cause.cleanupOwner !== undefined) {
						worker = cause;
						this.#resources.retain(workspace);
						new AnalysisCleanupLeaseGroup(primary, [rootLease]);
						throw primary;
					}
				}
				const cleanup = (reason, cause) => {
					const failure = new ProviderCleanupError(UEFI_PROVIDER_IDENTITY.id, rootLease.cleanupResources ?? [root.path], { reason }, {
						cause,
						operation
					});
					new AnalysisCleanupLeaseGroup(failure, [rootLease]);
					return primary === undefined ? failure : analysisErrorWithCleanupDependencies(primary, failure, operation);
				};
				if (files.hasPending) {
					this.#resources.retain(workspace);
					throw cleanup("Worker output descriptors must close before the temporary root can be removed.");
				}
				const released = await this.#resources.release(workspace);
				if (released.kind === "failed") throw cleanup(errorMessage(released.cause), released.cause);
				if (primary !== undefined) throw primary;
				signal.throwIfAborted();
				if (outcome === undefined) throw new Error("UEFI decoder did not settle.");
				return outcome;
			}
		};
	})))();
}

//#endregion
//#region dist/composition/uefi.js
var createUefiAnalysisProvider;
function init_uefi() {
	return (init_uefi = __esmMin((() => {
		init_UefiAnalysisProvider();
		createUefiAnalysisProvider = () => new UefiAnalysisProvider();
	})))();
}

//#endregion
//#region dist/cli/uefiCommands.js
var uefiCommands_exports = /* @__PURE__ */ __exportAll({ registerUefiCommands: () => registerUefiCommands });
var FLASH_PATH, OFFSET_OPTIONS, targetOffset, registerUefiCommands;
function init_uefiCommands() {
	return (init_uefiCommands = __esmMin((() => {
		init_UefiAnalysisService();
		init_uefi();
		init_uefiToolContracts();
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_UefiProviderIdentity();
		init_contractCliDescription();
		init_contractCommand();
		init_options();
		FLASH_PATH = { description: "Local UEFI firmware image" };
		OFFSET_OPTIONS = {
			volumeOffset: "volume",
			fileOffset: "ffs-file",
			sectionOffset: "section"
		};
		targetOffset = cliDecimalField(z.number().int().nonnegative().optional());
		registerUefiCommands = (cli, logger) => {
			const service = new UefiAnalysisService(createUefiAnalysisProvider());
			const run = (operation) => inspectWithService(() => ({
				inspect: (input, options) => service.execute(operation, input, options),
				close: () => service.close()
			}), UEFI_PROVIDER_IDENTITY.id);
			registerContractCommand(cli, logger, contractNamed(UEFI_TOOL_CONTRACTS, "inspect_uefi_firmware"), {
				description: "Map UEFI firmware volumes, FFS files and sections of a flash image",
				positionals: ["path"],
				callerPaths: ["path"],
				fields: { path: FLASH_PATH }
			}, run("inspect_uefi_firmware"));
			registerContractCommand(cli, logger, contractNamed(UEFI_TOOL_CONTRACTS, "inspect_uefi_nvram"), {
				description: "Map AMI NVRAM variable stores (for example StdDefaults) of a flash image",
				positionals: ["path"],
				callerPaths: ["path"],
				fields: { path: FLASH_PATH }
			}, run("inspect_uefi_nvram"));
			const extraction = contractNamed(UEFI_TOOL_CONTRACTS, "extract_uefi_firmware");
			const extract = run(extraction.name);
			registerContractCommand(cli, logger, extraction, {
				description: "Extract selected UEFI firmware bytes with provenance and decode gaps",
				positionals: ["path", "output_directory"],
				callerPaths: ["path", "output_directory"],
				fields: {
					path: FLASH_PATH,
					output_directory: { description: "Absent output directory; parent must exist" }
				},
				handlerFields: ["target"],
				cliOptions: {
					volumeOffset: targetOffset.describe("Extract one firmware volume at this byte offset"),
					fileOffset: targetOffset.describe("Extract one FFS file at this byte offset"),
					sectionOffset: targetOffset.describe("Extract one section at this byte offset"),
					sourceStream: z.string().optional().describe("Carrier logical path for a decoded offset, or flash for the original image. Requires one target offset.")
				}
			}, async (input, context) => {
				const options = context.cliOptions;
				const selectors = Object.keys(OFFSET_OPTIONS).flatMap((key) => {
					const offset = options[key];
					return offset === undefined ? [] : [{
						kind: OFFSET_OPTIONS[key],
						offset
					}];
				});
				const selected = selectors[0];
				const source = options.sourceStream;
				const refuse = (key, message) => projectAnalysisError(new AnalysisInputError(extraction.name, undefined, [{
					path: [key],
					reason: "invalid_value",
					message
				}]));
				if (selectors.length > 1) return refuse("volumeOffset", "--volume-offset, --file-offset and --section-offset are mutually exclusive.");
				if (source !== undefined && selected === undefined) return refuse("sourceStream", "--source-stream requires one target offset.");
				return extract({
					...input,
					target: selected === undefined ? { kind: "whole-image" } : {
						kind: selected.kind,
						offset: selected.offset,
						...source === undefined ? {} : { source_stream: source === "flash" ? null : source }
					}
				}, context);
			});
		};
	})))();
}

//#endregion
export { init_uefiCommands, uefiCommands_exports };