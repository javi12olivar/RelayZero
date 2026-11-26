import { BinaryReader } from "./binaryContainer.js";
import { err, ok } from "./result.js";
export const ELF_RELR_DYNAMIC_TAGS = {
    standard: { address: 36n, size: 35n, entry: 37n },
    android: { address: 0x6fffe000n, size: 0x6fffe001n, entry: 0x6fffe003n },
};
/** Android packed REL and RELA tables declare an address, byte size, and encoding. */
export const ELF_ANDROID_PACKED_RELOCATION_TABLES = [
    [0x6000000fn, 0x60000010n, "rel"],
    [0x60000011n, 0x60000012n, "rela"],
];
export const ELF_ANDROID_PACKED_RELOCATION_TAGS = ELF_ANDROID_PACKED_RELOCATION_TABLES.flatMap(([address, size]) => [
    address,
    size,
]);
const androidRelocationTags = new Set([
    ...Object.values(ELF_RELR_DYNAMIC_TAGS.android),
    ...ELF_ANDROID_PACKED_RELOCATION_TAGS,
]);
/** Recognize Android relocation declarations independently of decoding support. */
export const isElfAndroidRelocationDynamicTag = (tag) => androidRelocationTags.has(tag);
const relocationSectionTypes = new Set([
    4, // SHT_RELA
    9, // SHT_REL
    19, // SHT_RELR
    0x60000001, // SHT_ANDROID_REL
    0x60000002, // SHT_ANDROID_RELA
    0x6fffff00, // SHT_ANDROID_RELR
]);
export const isElfRelocationSectionType = (type) => relocationSectionTypes.has(type);
/** The class-specific r_info split, shared by fixed and Android packed records. */
export const decodeElfRelocationInfo = (info, bits) => ({
    type: Number(info & (bits === 64 ? 0xffffffffn : 0xffn)),
    symbolIndex: Number(info >> (bits === 64 ? 32n : 8n)),
});
/** Decode standard REL/RELA fields; architecture-specific application remains with consumers. */
export function readElfRelocationEntry(bytes, bits, littleEndian, encoding) {
    const wordBytes = bits === 64 ? 8 : 4;
    if (bytes.byteLength < wordBytes * (encoding === "rela" ? 3 : 2))
        return err({
            kind: "malformed",
            message: "ELF relocation entry is truncated",
        });
    const reader = new BinaryReader(Buffer.isBuffer(bytes)
        ? bytes
        : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "elf");
    const offset = reader.word(0, bits);
    const info = reader.word(wordBytes, bits);
    const entry = {
        offset,
        ...decodeElfRelocationInfo(info, bits),
    };
    if (encoding === "rel")
        return ok(entry);
    const addend = bits === 64 ? reader.i64(wordBytes * 2) : BigInt(reader.i32(wordBytes * 2));
    return ok({ ...entry, addend });
}
