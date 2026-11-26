import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { byteToHex, init_byteToHex } from "./byteToHex-N4MIskWf.js";
import { UEFI_FIRMWARE_LIMITS, init_uefiLimits } from "./uefiLimits-B1Km845N.js";
import { Buffer } from "node:buffer";

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
	const reader = new BinaryReader(buffer, true, "UEFI GUID");
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
		const reader = new BinaryReader(region.buffer, true, "FFS file");
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
	const reader = new BinaryReader(region.buffer, true, "UEFI firmware volume");
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
	const reader = new BinaryReader(region.buffer, true, "UEFI FV extension");
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
	const checksumReader = new BinaryReader(buffer, true, "UEFI firmware volume");
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
	const signatureText = Buffer.from("_FVH", "ascii");
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
export { COMPRESSION_GUID_BY_DISPLAY, FFS_HEADER_LAYOUT, FFS_TYPE_NAME_BY_CODE, FV_HEADER_LAYOUT, OPAQUE_GUIDED_SECTION_GUIDS, SECTION_LAYOUT, SECTION_TYPE_NAME_BY_CODE, absoluteOffset, alignUp, checkFfsFileIntegrity, formatGuidLittleEndian, imageRegion, init_FfsFile, init_FirmwareVolume, init_UefiBytes, init_UefiCodeTables, init_UefiGuid, inspectFirmwareVolumeExtension, isWindowUniform, localOffsetOf, parseFirmwareVolumeHeader, readFfsHeader, scanFirmwareVolumes, sliceRegion, unsupportedVolumeBodyReason };