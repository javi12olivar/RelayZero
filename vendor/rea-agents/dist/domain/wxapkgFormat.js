import { BinaryReader } from "./binaryContainer.js";
import { err, ok } from "./result.js";
/**
 * WeChat mini-program package (wxapkg): an 18-byte big-endian header, a
 * name/offset/size member table, then verbatim member data. Members are stored
 * uncompressed at absolute file offsets. All multi-byte fields are big-endian.
 */
export const WXAPKG_FIRST_MARK = 0xbe;
export const WXAPKG_LAST_MARK = 0xed;
export const WXAPKG_HEADER_BYTES = 18;
/** Minimum fixed row fields: name length, offset and size without name bytes. */
export const WXAPKG_MIN_ROW_BYTES = 12;
/**
 * The member count is stored in the last four header bytes. Some producers
 * include those bytes in `indexLength`; others count only the rows that follow.
 */
const WXAPKG_MEMBER_COUNT_BYTES = 4;
/**
 * Encrypted PC-client packages start with this ASCII magic instead of the
 * plain header. Their member data is ciphertext; no decryption is supported.
 */
export const WXAPKG_ENCRYPTED_MAGIC = Buffer.from("V1MMWX", "latin1");
/** Whether bytes start with the encrypted PC-client magic. */
export const hasWxapkgEncryptedMagic = (bytes) => bytes.length >= WXAPKG_ENCRYPTED_MAGIC.length &&
    Buffer.from(bytes.buffer, bytes.byteOffset, WXAPKG_ENCRYPTED_MAGIC.length).equals(WXAPKG_ENCRYPTED_MAGIC);
/**
 * Whether bytes carry the plain wxapkg marks. Recognition is intentionally
 * separate from admission: a damaged package keeps its format identity and the
 * reader rejects impossible table accounting as a typed format failure.
 */
export const hasWxapkgHeader = (bytes) => bytes.length >= WXAPKG_HEADER_BYTES &&
    bytes[0] === WXAPKG_FIRST_MARK &&
    bytes[13] === WXAPKG_LAST_MARK;
/**
 * Decode declared fields after the caller admits a prefix covering the fixed
 * header. Undefined means the admitted bytes cannot carry a plausible header;
 * both mark checks and minimal row accounting must hold.
 */
export const readWxapkgHeaderFacts = (bytes) => {
    if (!hasWxapkgHeader(bytes))
        return undefined;
    const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), false, "wxapkg");
    const info = reader.u32(1);
    const indexLength = reader.u32(5);
    const dataLength = reader.u32(9);
    const fileCount = reader.u32(14);
    // Every row carries at least its fixed fields; a table too small for the
    // declared count cannot be a wxapkg index.
    if (fileCount === 0 || indexLength < fileCount * WXAPKG_MIN_ROW_BYTES)
        return undefined;
    return { info, indexLength, dataLength, fileCount };
};
const spanEnd = (start, length) => {
    if (!Number.isSafeInteger(start) ||
        !Number.isSafeInteger(length) ||
        length < 0)
        return undefined;
    const end = start + length;
    return Number.isSafeInteger(end) ? end : undefined;
};
const indexLayout = (facts, fileSize, includedCountBytes) => {
    if (!Number.isSafeInteger(facts.indexLength) ||
        !Number.isSafeInteger(facts.fileCount) ||
        facts.fileCount < 0 ||
        facts.indexLength < includedCountBytes)
        return "too-small";
    const tableBytes = facts.indexLength - includedCountBytes;
    if (tableBytes < facts.fileCount * WXAPKG_MIN_ROW_BYTES)
        return "too-small";
    const dataStart = spanEnd(WXAPKG_HEADER_BYTES, tableBytes);
    if (dataStart === undefined || dataStart > fileSize)
        return "index-outside";
    const dataEnd = spanEnd(dataStart, facts.dataLength);
    if (dataEnd === undefined || dataEnd > fileSize)
        return "data-outside";
    return { tableStart: WXAPKG_HEADER_BYTES, tableBytes, dataStart, dataEnd };
};
/**
 * Admit every index-length convention whose index and declared data region
 * both lie inside the carrier. Trailing bytes can make both fit, so callers
 * keep every candidate until the parsed rows and member ranges decide.
 */
export const resolveWxapkgIndexLayouts = (facts, fileSize) => {
    if (!Number.isSafeInteger(fileSize) || fileSize < 0)
        return err({ _tag: "IndexExceedsFile" });
    const described = [WXAPKG_MEMBER_COUNT_BYTES, 0].map((included) => indexLayout(facts, fileSize, included));
    const admissible = described.filter((layout) => typeof layout !== "string");
    if (admissible.length === 0)
        return err({
            _tag: described.some((layout) => layout === "data-outside")
                ? "DataRegionExceedsFile"
                : "IndexExceedsFile",
        });
    return ok(admissible);
};
const memberFitsIndex = (layout, member) => {
    const extentEnd = member.offset + member.size;
    return (member.offset >= layout.dataStart &&
        extentEnd <= layout.dataEnd &&
        extentEnd >= member.offset);
};
/** Require one declared layout to contain the parsed rows and every member. */
export const admitWxapkgMemberExtents = (layouts, consumedRowBytes, members) => {
    const candidates = layouts.filter((layout) => layout.tableBytes >= consumedRowBytes);
    if (candidates.length === 0)
        return err({ _tag: "TruncatedRows" });
    if (candidates.some((layout) => members.every((member) => memberFitsIndex(layout, member))))
        return ok(undefined);
    const outside = members.find((member) => candidates.every((layout) => !memberFitsIndex(layout, member)));
    return outside !== undefined
        ? err({ _tag: "MemberOutsideDataRegion", member: outside })
        : err({ _tag: "ConflictingMemberExtents" });
};
