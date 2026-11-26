import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_strictUtf8, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";

//#region dist/domain/godotPckFormat.js
var hasGodotPckHeader, pckReader, readGodotPckHeaderFacts, godotPckHeaderEnd, godotPckDataStartsAfterHeader, readGodotPckTrailerFacts;
function init_godotPckFormat() {
	return (init_godotPckFormat = __esmMin((() => {
		init_binaryContainer();
		hasGodotPckHeader = (bytes) => bytes.length >= 4 && bytes[0] === 71 && bytes[1] === 68 && bytes[2] === 80 && bytes[3] === 67;
		pckReader = (bytes) => new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "godot-pck");
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
			const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), false, "unityfs");
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
export { UNITYFS_HEADER_PREFIX_BYTES, godotPckDataStartsAfterHeader, godotPckHeaderEnd, hasGodotPckHeader, hasUnityFsHeader, init_godotPckFormat, init_unityfsFormat, readGodotPckHeaderFacts, readGodotPckTrailerFacts, readUnityFsHeaderFacts, unityFsLayoutFlags };