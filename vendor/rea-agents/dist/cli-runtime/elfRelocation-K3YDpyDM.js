import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/elfRelocation.js
/** Decode standard REL/RELA fields; architecture-specific application remains with consumers. */
function readElfRelocationEntry(bytes, bits, littleEndian, encoding) {
	const wordBytes = bits === 64 ? 8 : 4;
	if (bytes.byteLength < wordBytes * (encoding === "rela" ? 3 : 2)) return err({
		kind: "malformed",
		message: "ELF relocation entry is truncated"
	});
	const reader = new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "elf");
	const offset = reader.word(0, bits);
	const info = reader.word(wordBytes, bits);
	const entry = {
		offset,
		...decodeElfRelocationInfo(info, bits)
	};
	if (encoding === "rel") return ok(entry);
	const addend = bits === 64 ? reader.i64(wordBytes * 2) : BigInt(reader.i32(wordBytes * 2));
	return ok({
		...entry,
		addend
	});
}
var ELF_RELR_DYNAMIC_TAGS, ELF_ANDROID_PACKED_RELOCATION_TABLES, ELF_ANDROID_PACKED_RELOCATION_TAGS, androidRelocationTags, isElfAndroidRelocationDynamicTag, relocationSectionTypes, isElfRelocationSectionType, decodeElfRelocationInfo;
function init_elfRelocation() {
	return (init_elfRelocation = __esmMin((() => {
		init_binaryContainer();
		init_result();
		ELF_RELR_DYNAMIC_TAGS = {
			standard: {
				address: 36n,
				size: 35n,
				entry: 37n
			},
			android: {
				address: 1879040000n,
				size: 1879040001n,
				entry: 1879040003n
			}
		};
		ELF_ANDROID_PACKED_RELOCATION_TABLES = [[
			1610612751n,
			1610612752n,
			"rel"
		], [
			1610612753n,
			1610612754n,
			"rela"
		]];
		ELF_ANDROID_PACKED_RELOCATION_TAGS = ELF_ANDROID_PACKED_RELOCATION_TABLES.flatMap(([address, size]) => [address, size]);
		androidRelocationTags = new Set([...Object.values(ELF_RELR_DYNAMIC_TAGS.android), ...ELF_ANDROID_PACKED_RELOCATION_TAGS]);
		isElfAndroidRelocationDynamicTag = (tag) => androidRelocationTags.has(tag);
		relocationSectionTypes = new Set([
			4,
			9,
			19,
			1610612737,
			1610612738,
			1879047936
		]);
		isElfRelocationSectionType = (type) => relocationSectionTypes.has(type);
		decodeElfRelocationInfo = (info, bits) => ({
			type: Number(info & (bits === 64 ? 4294967295n : 255n)),
			symbolIndex: Number(info >> (bits === 64 ? 32n : 8n))
		});
	})))();
}

//#endregion
export { ELF_ANDROID_PACKED_RELOCATION_TABLES, ELF_ANDROID_PACKED_RELOCATION_TAGS, ELF_RELR_DYNAMIC_TAGS, decodeElfRelocationInfo, init_elfRelocation, isElfAndroidRelocationDynamicTag, isElfRelocationSectionType, readElfRelocationEntry };