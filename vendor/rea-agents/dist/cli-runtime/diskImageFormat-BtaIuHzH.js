import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, cancelledBy, decodeLimit, init_analysisErrorCore, init_configurationErrors, init_parseFailure, init_sha256Hex, malformedInput, sha256Hex, truncatedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_strictUtf8, init_zstandardFrameAllowance, strictUtf8Decoder, zstandardWorkLimitFacts } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryFormatFailure, BinaryReader as BinaryReader$1, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_readFileHandleRange, readFileHandleRange } from "./resources-B3P64jvH.js";
import { hasZipSignature, init_zipPackageFormat, zipPackageFormatForPath } from "./canonicalOrdering-C7Yzy62j.js";
import { ESP_PARTITION_TABLE_DEFAULT_OFFSET, ESP_PARTITION_TABLE_MAX_BYTES, ESP_PARTITION_TABLE_SECTOR_BYTES, decodeEspPartitionTable, hasMftFileRecordHeader, init_espPartitionTable, init_inesContainer, init_ntfsMft, nesContainerFormat, parseInesLayout } from "./espFlashSelection-DrhknbQ_.js";
import { ESP_FLASH_SECTOR_BYTES, ESP_SIGNATURE_BLOCK_BYTES, decodeEspDescriptor, decodeEspSignatureBlock, espSignatureSlot, firstUnerased, hex as hex$2, init_espImageStructures, offsetText, u16, u32 } from "./espImageStructures-Dt191T9V.js";
import { boundedList, describeBoundedList, init_boundedList } from "./boundedList-D6JdQAuV.js";
import { hasBinaryPlistSignature, init_appleArchiveFormat } from "./appleArchiveFormat-B-JoSBSY.js";
import { decodeZstandardFrames, decodeZstandardFramesCooperative, init_zstandardExactFrame } from "./zstandardExactFrame-DU_U6T0l.js";
import { claimsExecutableHeader, init_binaryTarget } from "./binaryTarget-BWcJ62i0.js";
import { byteToHex, init_byteToHex } from "./byteToHex-N4MIskWf.js";
import { hasDevicetreeMagic, init_devicetreeHeader, readDevicetreeHeader } from "./devicetreeHeader-qDz5cYn9.js";
import { hasGodotPckHeader, hasUnityFsHeader, init_godotPckFormat, init_unityfsFormat } from "./unityfsFormat-D0CcnmXe.js";
import { imageRegion, init_FirmwareVolume, init_UefiBytes, scanFirmwareVolumes } from "./FirmwareVolume-C6tnpN0n.js";
import { UEFI_FIRMWARE_LIMITS, init_uefiLimits } from "./uefiLimits-B1Km845N.js";
import { createHash } from "node:crypto";
import { crc32 } from "node:zlib";
import { BinaryReader, WireType } from "@bufbuild/protobuf/wire";

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
//#region dist/domain/firmware/espChips.js
var ESP_CHIP_TABLE_SOURCE, range, C6_H2_PAGE_SIZES, CHIPS, BY_ID, espChipForId, ESP_ROM_BOOTLOADER_OFFSETS, SIXTEEN_MIB, espSegmentLengthLimit, RESERVED_ADDRESS_LIMIT, classifyEspSegment, espPageSizedMappingAmbiguity, isMapped, pageSizedHigh;
function init_espChips() {
	return (init_espChips = __esmMin((() => {
		ESP_CHIP_TABLE_SOURCE = "ESP-IDF v6.1";
		range = (low, high) => ({
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
				mapped: [range(1074593792, 1077936128), range(1061158912, 1065353216)]
			},
			{
				chipId: 2,
				target: "esp32s2",
				isa: "xtensa",
				romBootloaderOffset: 4096,
				cache32BitAddressMap: false,
				mapped: [range(1074266112, 1082130432), range(1056964608, 1073217536)]
			},
			{
				chipId: 5,
				target: "esp32c3",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: false,
				mapped: [range(1107296256, 1115684864), range(1006632960, 1015021568)]
			},
			{
				chipId: 9,
				target: "esp32s3",
				isa: "xtensa",
				romBootloaderOffset: 0,
				cache32BitAddressMap: true,
				mapped: [range(1107296256, 1140850688), range(1006632960, 1040187392)]
			},
			{
				chipId: 12,
				target: "esp32c2",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: false,
				mapped: [range(1107296256, 1111490560), range(1006632960, 1010827264)]
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
				mapped: [range(1073741824, 1140850688), range(1207959552, 1275068416)]
			},
			{
				chipId: 20,
				target: "esp32c61",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: true,
				mapped: [range(1107296256, 1140850688)]
			},
			{
				chipId: 23,
				target: "esp32c5",
				isa: "riscv",
				romBootloaderOffset: 8192,
				cache32BitAddressMap: true,
				mapped: [range(1107296256, 1140850688)]
			},
			{
				chipId: 25,
				target: "esp32h21",
				isa: "riscv",
				romBootloaderOffset: 0,
				cache32BitAddressMap: false,
				mapped: [range(1107296256, 1124073472)]
			},
			{
				chipId: 28,
				target: "esp32h4",
				isa: "riscv",
				romBootloaderOffset: 8192,
				cache32BitAddressMap: true,
				mapped: [range(1107296256, 1140850688)]
			},
			{
				chipId: 32,
				target: "esp32s31",
				isa: "riscv",
				romBootloaderOffset: 8192,
				cache32BitAddressMap: true,
				mapped: [range(1073741824, 1140850688), range(1342177280, 1409286144)]
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
			return paged === undefined ? undefined : range(pageSizedHigh(paged.low, Math.min(...paged.pageSizes)), pageSizedHigh(paged.low, Math.max(...paged.pageSizes)));
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
//#region dist/domain/firmware/espImage.js
var ESP_IMAGE_MAGIC, ESP_IMAGE_HEADER_BYTES, ESP_IMAGE_MAX_SEGMENTS, CHECKSUM_SEED, SPI_SPEEDS, LAST_SPI_MODE, ESP8266_LOAD_REGIONS, ESP8266_REFUSAL, alignUp, recognizeHeader, recognizeEspImage, createEspImageDecoder, StreamingEspImageDecoder;
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
		alignUp = (value, alignment) => Math.ceil(value / alignment) * alignment;
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
				this.#checksumOffset = alignUp(this.#position + 1, 16) - 1;
				this.#enter("padding", this.#checksumOffset - this.#position);
			}
			#endImage() {
				this.#imageEnd = this.#position;
				this.#sectorOffset = alignUp(this.#position, ESP_FLASH_SECTOR_BYTES);
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
		return err(malformed$1(cause instanceof Error ? `Android OTA partition ${partition.name} could not be reconstructed: ${cause.message}` : `Android OTA partition ${partition.name} could not be reconstructed`));
	}
	if (!hasCompleteExtentCoverage(partition.operations, size, blockSize)) return err(malformed$1(`Android OTA partition ${partition.name} destination extents do not cover the full ${String(size)}-byte image`));
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
var ANDROID_OTA_MAGIC, ANDROID_OTA_MAGIC_BYTES, ANDROID_OTA_MAJOR_VERSION, ANDROID_OTA_HEADER_V2_BYTES, ANDROID_OTA_MAX_MANIFEST_BYTES, ANDROID_OTA_MAX_PARTITIONS, ANDROID_OTA_MAX_OPERATIONS, ANDROID_OTA_MAX_OPERATIONS_TOTAL, ANDROID_OTA_MAX_EXTENTS_TOTAL, ANDROID_OTA_MAX_SIGNATURE_BYTES, ANDROID_OTA_MAX_SIGNATURES, ANDROID_OTA_MAX_GROUPS, ANDROID_OTA_MAX_GROUP_PARTITION_NAMES, ANDROID_OTA_MAX_APEX, ANDROID_OTA_MAX_EXTRACT_BYTES, ANDROID_OTA_MAX_OPERATION_DATA_BYTES, ANDROID_OTA_DEFAULT_BLOCK_SIZE, ANDROID_OTA_PAYLOAD_LIMITATIONS, androidOtaExtractRefusalLimitation, INSTALL_OPERATION_NAMES, EXTRACTABLE_TYPES, ANDROID_OTA_FORMAT, malformed$1, truncated, unsupportedVersion, capacity, zstdWorkRefusal, androidOtaUnsupportedVersion, u32be, u64be, hasAndroidOtaPayloadMagic, recognizeAndroidOtaPayload, toBigInt, asSafeUint, asSafeInt, hex$1, protobufFailure, fail, unwrap, walk, parseAndroidOtaHeader, emptyPartitionInfo, decodeExtent, decodePartitionInfo, decodeOperation, decodePartition, decodeGroup, decodeApex, decodeDynamicMetadata, countAndroidOtaSignatures, decodeManifest, partitionFileName, operationCountsOf, isExtractable, parseAndroidOtaPayload, withAndroidOtaPayloadSignature, writeExtents, destinationExtentBytes, androidOtaDistinctOperationDataBytes, androidOtaExtractRefusalError, chargeReconstructionWork, hasCompleteExtentCoverage, driveAndroidOtaReconstruction, reconstructAndroidOtaPartition, reconstructAndroidOtaPartitionCooperative;
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
		malformed$1 = (message) => malformedInput(ANDROID_OTA_FORMAT, message);
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
			if (numeric < 0n || numeric > BigInt(Number.MAX_SAFE_INTEGER)) return err(malformed$1(`${label} is not an exact nonnegative extent`));
			return ok(Number(numeric));
		};
		asSafeInt = (value) => {
			const numeric = toBigInt(value);
			if (numeric < BigInt(Number.MIN_SAFE_INTEGER) || numeric > BigInt(Number.MAX_SAFE_INTEGER)) return null;
			return Number(numeric);
		};
		hex$1 = (bytes) => Buffer.from(bytes).toString("hex");
		protobufFailure = (cause) => malformed$1(cause instanceof Error ? `DeltaArchiveManifest protobuf is truncated or malformed: ${cause.message}` : "DeltaArchiveManifest protobuf is truncated or malformed");
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
			if (!Number.isSafeInteger(fileSize) || fileSize < 0) return err(malformed$1("Android OTA payload size is not an exact nonnegative extent"));
			if (bytes.length < 4 || Buffer.from(bytes.subarray(0, 4)).toString("latin1") !== "CrAU") return err(malformed$1("Android OTA payload magic mismatch: expected CrAU"));
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
			if (!Number.isSafeInteger(blobOffset)) return err(malformed$1("Android OTA payload header extents overflow"));
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
					if (extent.startBlock !== null && !Number.isSafeInteger(extent.startBlock)) fail(malformed$1("extent start_block is not an exact nonnegative extent"));
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
					if (operation.typeCode < 0) fail(malformed$1("InstallOperation type is negative"));
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
					if (digest.length !== 0 && digest.length !== 32) fail(malformed$1("operation data_sha256_hash must be 32 bytes or empty"));
					operation.dataHashHex = digest.length === 0 ? null : hex$1(digest);
					return;
				}
				reader.skip(wire);
			});
			if (!walked.ok) return walked;
			if (!operation.hasType) return err(malformed$1("InstallOperation is missing type"));
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
			if (partition.name === undefined) return err(malformed$1("PartitionUpdate is missing partition_name"));
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
			if (group.name === undefined) return err(malformed$1("DynamicPartitionGroup is missing name"));
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
					if (size === 0) fail(malformed$1("manifest block_size is zero"));
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
					if (!Number.isSafeInteger(end) || end < operation.dataOffset) return err(malformed$1("operation data extent overflows"));
					if (signatureDeclaration !== null && end > signatureDeclaration.blobOffset) return err(malformed$1(`operation data extent ${String(operation.dataOffset)}+${String(operation.dataLength)} overruns the ${String(signatureDeclaration.blobOffset)}-byte payload blob`));
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
			if (payload.payloadSignatureRange?.bytes !== signature.length) return err(malformed$1("payload signature blob length does not match signatures_size"));
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
				if (extent.startBlock === null) return err(malformed$1("InstallOperation destination extent has no start_block"));
				const start = extent.startBlock * blockSize;
				const extentBytes = extent.numBlocks * blockSize;
				if (!Number.isSafeInteger(start) || start < 0 || start >= image.length || extentBytes > blockAlignedEnd - start) return err(malformed$1("InstallOperation destination extent overruns the partition image"));
				const length = Math.min(extentBytes, image.length - start);
				span += extentBytes;
				if (fillZero) {
					image.fill(0, start, start + length);
					continue;
				}
				if (data.length - cursor < length) return err(malformed$1("InstallOperation data is shorter than its destination extents"));
				image.set(data.subarray(cursor, cursor + length), start);
				cursor += extentBytes;
			}
			if (!fillZero && data.length > span) return err(malformed$1("InstallOperation data is longer than its destination extents"));
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
				case "missing_size": return malformed$1(`Android OTA partition ${partition.name} has no new_partition_info size`);
				case "size_limit": return capacity("extracted partition size", ANDROID_OTA_MAX_EXTRACT_BYTES, "byte");
				case "blob_truncated": return {
					_tag: "AndroidOtaPayloadBlobTruncated",
					message: `Android OTA partition ${partition.name} reads operation data past the end of the payload file`
				};
			}
		};
		chargeReconstructionWork = (operations, blockSize) => {
			if (blockSize <= 0 || !Number.isSafeInteger(blockSize)) return err(malformed$1("block_size is not a positive extent"));
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
export { ANDROID_BOOT_MAGIC, ANDROID_OTA_PAYLOAD_LIMITATIONS, ESP8266_REFUSAL, ESP_CHIP_TABLE_SOURCE, ESP_IMAGE_LIMITATIONS, HEX_RECORD_ENCODING_LABELS, UIMAGE_MULTI_TABLE_WINDOW, VENDOR_BOOT_MAGIC, admitWxapkgMemberExtents, androidOtaDistinctOperationDataBytes, androidOtaExtractRefusalError, androidOtaExtractRefusalLimitation, artifactNameForClassification, createDfuSeDecoder, createEspImageDecoder, createHexRecordDecoder, createUf2Decoder, espChipForId, espFlashDumpOrigin, hasDfuSePrefix, hasDiskImageSignature, hasUImageSizeTable, hasWxapkgEncryptedMagic, init_UefiFormatProbe, init_androidBootImageFormat, init_androidOtaPayload, init_artifactFormatRecognition, init_artifactNameSelection, init_dfuse, init_diskImageFormat, init_espChips, init_espFlashLocation, init_espImage, init_espImageFacts, init_hexRecords, init_uf2, init_uimageFormat, init_wxapkgFormat, locateEspFlashLayout, namedArtifactFormat, parseAndroidOtaHeader, parseAndroidOtaPayload, parseMultiImageTable, parseUImageHeaderFields, probeUefiFlashImage, readWxapkgHeaderFacts, recognizeArtifactFormat, recognizeEspImage, reconstructAndroidOtaPartitionCooperative, resolveWxapkgIndexLayouts, withAndroidOtaPayloadSignature };