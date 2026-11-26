import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { init_strictUtf8, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { crc32 } from "node:zlib";

//#region dist/domain/firmware/espImageStructures.js
var ESP_IMAGE_SEGMENT_HEADER_BYTES, ESP_IMAGE_DIGEST_BYTES, ESP_FLASH_SECTOR_BYTES, ESP_APP_DESC_BYTES, ESP_SIGNATURE_BLOCK_BYTES, ERASED, APP_DESC_MAGIC, BOOTLOADER_DESC_MAGIC, BOOTLOADER_DESC_BYTES, SIGNATURE_MAGIC, SIGNATURE_CRC_OFFSET, u32, u16, hex, offsetText, firstUnerased, allZero, UTF8, cStringBytes, cString, ESP_DESCRIPTOR_LIMITATIONS, decodeEspDescriptor, espSignatureSlot, RSA_LAYOUT, ECDSA_LAYOUTS, decodeEspSignatureBlock;
function init_espImageStructures() {
	return (init_espImageStructures = __esmMin((() => {
		init_strictUtf8();
		init_sha256Hex();
		ESP_IMAGE_SEGMENT_HEADER_BYTES = 8;
		ESP_IMAGE_DIGEST_BYTES = 32;
		ESP_FLASH_SECTOR_BYTES = 4096;
		ESP_APP_DESC_BYTES = 256;
		ESP_SIGNATURE_BLOCK_BYTES = 1216;
		ERASED = 255;
		APP_DESC_MAGIC = 2882360370;
		BOOTLOADER_DESC_MAGIC = 80;
		BOOTLOADER_DESC_BYTES = 80;
		SIGNATURE_MAGIC = 231;
		SIGNATURE_CRC_OFFSET = 1196;
		u32 = (bytes, at) => ((bytes[at] ?? 0) | (bytes[at + 1] ?? 0) << 8 | (bytes[at + 2] ?? 0) << 16 | (bytes[at + 3] ?? 0) << 24) >>> 0;
		u16 = (bytes, at) => (bytes[at] ?? 0) | (bytes[at + 1] ?? 0) << 8;
		hex = (bytes) => Buffer.from(bytes).toString("hex");
		offsetText = (value) => `0x${value.toString(16)}`;
		firstUnerased = (bytes, offset) => {
			const index = bytes.findIndex((byte) => byte !== ERASED);
			return index < 0 ? undefined : offset + index;
		};
		allZero = (bytes) => bytes.every((byte) => byte === 0);
		UTF8 = strictUtf8Decoder("preserve");
		cStringBytes = (bytes) => {
			const end = bytes.indexOf(0);
			return end < 0 ? bytes : bytes.subarray(0, end);
		};
		cString = (bytes) => {
			try {
				return UTF8.decode(cStringBytes(bytes));
			} catch {
				return null;
			}
		};
		ESP_DESCRIPTOR_LIMITATIONS = {
			fieldNotUtf8: (field) => `ESP image descriptor field ${field} is not valid UTF-8; its text is unknown.`,
			reservedBytesNotZero: "ESP image segment 0 begins with the bootloader descriptor magic 0x50, but its reserved bytes are not zero; it is not read as an esp_bootloader_desc_t."
		};
		decodeEspDescriptor = (bytes, offset, limitations) => {
			const text = (from, length, field) => {
				const value = cString(bytes.subarray(from, from + length));
				if (value === null) limitations.push(ESP_DESCRIPTOR_LIMITATIONS.fieldNotUtf8(field));
				return value;
			};
			if (bytes.length >= 4 && u32(bytes, 0) === APP_DESC_MAGIC) {
				const held = (end) => bytes.length >= end;
				return {
					kind: "app",
					offset,
					observed_length: Math.min(bytes.length, 256),
					secure_version: held(8) ? u32(bytes, 4) : null,
					version: held(48) ? text(16, 32, "version") : null,
					project_name: held(80) ? text(48, 32, "project_name") : null,
					time: held(96) ? text(80, 16, "time") : null,
					date: held(112) ? text(96, 16, "date") : null,
					idf_ver: held(144) ? text(112, 32, "idf_ver") : null,
					app_elf_sha256: held(176) ? hex(bytes.subarray(144, 176)) : null,
					min_efuse_blk_rev_full: held(178) ? u16(bytes, 176) : null,
					max_efuse_blk_rev_full: held(180) ? u16(bytes, 178) : null,
					mmu_page_size: bytes[180] ?? null,
					spi_flash_mode: bytes[181] ?? null
				};
			}
			if (bytes.length < BOOTLOADER_DESC_BYTES || bytes[0] !== BOOTLOADER_DESC_MAGIC) return null;
			if (!allZero(bytes.subarray(1, 3)) || !allZero(bytes.subarray(64, 80))) {
				limitations.push(ESP_DESCRIPTOR_LIMITATIONS.reservedBytesNotZero);
				return null;
			}
			return {
				kind: "bootloader",
				offset,
				secure_version: bytes[3] ?? 0,
				version: u32(bytes, 4),
				idf_ver: text(8, 32, "idf_ver"),
				date_time: text(40, 24, "date_time")
			};
		};
		espSignatureSlot = (slot) => {
			if (slot.length === 1216 && slot[0] === SIGNATURE_MAGIC && crc32(slot.subarray(0, SIGNATURE_CRC_OFFSET)) === u32(slot, SIGNATURE_CRC_OFFSET)) return "block";
			return slot.every((byte) => byte === ERASED) ? "erased" : "other";
		};
		RSA_LAYOUT = {
			digestBytes: 32,
			keyStart: 36,
			keyEnd: 812,
			curveAt: undefined
		};
		ECDSA_LAYOUTS = {
			0: {
				digestBytes: 32,
				keyStart: 36,
				keyEnd: 101,
				curveAt: 36
			},
			1: {
				digestBytes: 48,
				keyStart: 52,
				keyEnd: 149,
				curveAt: 52
			}
		};
		decodeEspSignatureBlock = (block, index, content) => {
			const version = block[1] ?? 0;
			const scheme = version === 2 ? "rsa" : version === 3 ? "ecdsa" : null;
			const shaVersion = scheme === "ecdsa" ? block[2] ?? 0 : null;
			const layout = scheme === "rsa" ? RSA_LAYOUT : shaVersion === null ? undefined : ECDSA_LAYOUTS[shaVersion];
			const unknown = {
				curve_id: null,
				digest_algorithm: null,
				image_digest: null,
				image_digest_matches: null,
				public_key_sha256: null
			};
			if (layout === undefined) return {
				kind: "esp-image-signature-block",
				index,
				version,
				scheme,
				sha_version: shaVersion,
				...unknown,
				signature_status: "unverified"
			};
			const digestAlgorithm = layout.digestBytes === 48 ? "sha384" : "sha256";
			const imageDigest = hex(block.subarray(4, 4 + layout.digestBytes));
			const expected = content[digestAlgorithm];
			return {
				kind: "esp-image-signature-block",
				index,
				version,
				scheme,
				sha_version: shaVersion,
				curve_id: layout.curveAt === undefined ? null : block[layout.curveAt] ?? 0,
				digest_algorithm: digestAlgorithm,
				image_digest: imageDigest,
				image_digest_matches: expected === undefined ? null : expected === imageDigest,
				public_key_sha256: sha256Hex(block.subarray(layout.keyStart, layout.keyEnd)),
				signature_status: "unverified"
			};
		};
	})))();
}

//#endregion
export { ESP_FLASH_SECTOR_BYTES, ESP_SIGNATURE_BLOCK_BYTES, cString, cStringBytes, decodeEspDescriptor, decodeEspSignatureBlock, espSignatureSlot, firstUnerased, hex, init_espImageStructures, offsetText, u16, u32 };