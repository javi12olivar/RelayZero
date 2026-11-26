import { BinaryReader } from "../domain/binaryContainer.js";
import { Buffer } from "node:buffer";
import { byteToHex } from "../kernel/byteToHex.js";
import { absoluteOffset, alignUp, isWindowUniform, } from "./UefiBytes.js";
import { formatGuidLittleEndian } from "./UefiGuid.js";
import { FFS_ATTRIBUTE_MASKS, FFS_HEADER_LAYOUT } from "./UefiCodeTables.js";
const FFS_DATA_ALIGNMENT_EXPONENTS = [0, 4, 7, 9, 10, 12, 15, 16];
const STATE_BIT_NAMES = [
    [0x01, "header-construction"],
    [0x02, "header-valid"],
    [0x04, "data-valid"],
    [0x08, "marked-for-update"],
    [0x10, "deleted"],
    [0x20, "header-invalid"],
];
/**
 * Parse one FFS header at a local position; null when framing is unconfirmed.
 * Checksum findings are observations on the header,
 * not rejections — invalid files stay in the inventory with their notes.
 */
export function parseFfsFileHeader(region, localBase, erasePolarity) {
    const parsed = observeFfsFileHeader(region, localBase, erasePolarity);
    return parsed !== null && !("kind" in parsed) ? parsed : null;
}
function observeFfsFileHeader(region, localBase, erasePolarity) {
    if (localBase < region.start ||
        localBase + FFS_HEADER_LAYOUT.length > region.end) {
        return null;
    }
    const available = region.end - localBase;
    const extended = available >= FFS_HEADER_LAYOUT.extendedLength;
    const attributes = region.buffer[localBase + FFS_HEADER_LAYOUT.attributesOffset] ?? 0;
    const sizeB0 = region.buffer[localBase + FFS_HEADER_LAYOUT.sizeOffset] ?? 0;
    const sizeB1 = region.buffer[localBase + FFS_HEADER_LAYOUT.sizeOffset + 1] ?? 0;
    const sizeB2 = region.buffer[localBase + FFS_HEADER_LAYOUT.sizeOffset + 2] ?? 0;
    const declaredCompact = sizeB0 | (sizeB1 << 8) | (sizeB2 << 16);
    const largeFile = (attributes & FFS_ATTRIBUTE_MASKS.largeFile) !== 0;
    const implausibilities = [];
    const rawState = region.buffer[localBase + FFS_HEADER_LAYOUT.stateOffset] ?? 0;
    const normalizedState = erasePolarity ? ~rawState & 0x3f : rawState & 0x3f;
    const stateFlags = STATE_BIT_NAMES.filter(([bit]) => (normalizedState & bit) !== 0).map(([, name]) => name);
    // PI state is the highest set bit. An incomplete or invalid header supplies
    // only its fixed extent; the stored size cannot consume the next file.
    const state = stateFlags.at(-1);
    if (state === undefined)
        return { kind: "unconfirmed-state", rawState };
    const unusableState = state === "header-construction" || state === "header-invalid"
        ? state
        : null;
    let headerLength = FFS_HEADER_LAYOUT.length;
    let declaredLength = declaredCompact;
    if (largeFile) {
        const reader = new BinaryReader(region.buffer, true, "FFS file");
        if (!extended)
            return null;
        headerLength = FFS_HEADER_LAYOUT.extendedLength;
        const size = reader.word(localBase + FFS_HEADER_LAYOUT.extendedSizeOffset, 64);
        if (size > BigInt(Number.MAX_SAFE_INTEGER))
            return { kind: "unrepresentable", size, unusableState };
        declaredLength = Number(size);
        if (declaredCompact !== 0)
            implausibilities.push("large-file-compact-size-is-nonzero");
    }
    const extentIssue = unusableState !== null
        ? "unusable-header-state"
        : declaredLength < headerLength
            ? "declared-length-below-header"
            : declaredLength > available
                ? "declared-length-truncates-region"
                : null;
    if (extentIssue !== null)
        implausibilities.push(extentIssue);
    const observedLength = unusableState !== null
        ? headerLength
        : Math.min(Math.max(declaredLength, headerLength), available);
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
        body: extentIssue === null || extentIssue === "declared-length-truncates-region"
            ? { start: localBase + headerLength, end: localBase + observedLength }
            : null,
        bodyIssue: state === "header-valid" ? "data-not-valid" : null,
        extentIssue,
        nameGuid: formatGuidLittleEndian(region.buffer.subarray(localBase, localBase + 16), 0),
        typeCode: region.buffer[localBase + FFS_HEADER_LAYOUT.typeOffset] ?? 0,
        attributes,
        dataAlignment: 2 **
            ((attributes & FFS_ATTRIBUTE_MASKS.dataAlignment2) !== 0
                ? 17 + ((attributes & FFS_ATTRIBUTE_MASKS.dataAlignment) >> 3)
                : (FFS_DATA_ALIGNMENT_EXPONENTS[(attributes & FFS_ATTRIBUTE_MASKS.dataAlignment) >> 3] ?? 0)),
        rawState,
        stateFlags,
        headerChecksumField,
        fileChecksumField,
        fileChecksumRequired,
        headerChecksumValid,
        implausibilities,
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
        if (offset === FFS_HEADER_LAYOUT.stateOffset ||
            offset === FFS_HEADER_LAYOUT.integrityCheckOffset + 1) {
            byte = 0;
        }
        total = (total + byte) & 0xff;
    }
    return total === 0;
}
/** Check the file's fixed integrity marker or its declared body checksum. */
export function checkFfsFileIntegrity(region, header) {
    if (header.typeCode === 0xf0)
        return { verdict: "pad-file-unchecked" };
    if (header.extentIssue !== null ||
        header.bodyIssue !== null ||
        header.body === null)
        return { verdict: "unchecked" };
    if (!header.fileChecksumRequired) {
        if (header.fileChecksumField === 0xaa)
            return { verdict: "unchecked" };
        return {
            verdict: "invalid",
            offset: header.absoluteBase + FFS_HEADER_LAYOUT.integrityCheckOffset + 1,
            length: 1,
            detail: `FFS IntegrityCheck.File is 0x${byteToHex(header.fileChecksumField)}. PI requires 0xaa when the file checksum attribute is clear.`,
        };
    }
    const { start, end } = header.body;
    const length = end - start;
    if (length === 0)
        return { verdict: "unchecked" };
    let total = header.fileChecksumField;
    for (const byte of region.buffer.subarray(start, end)) {
        total = (total + byte) & 0xff;
    }
    return total === 0
        ? { verdict: "valid" }
        : {
            verdict: "invalid",
            offset: absoluteOffset(region, start),
            length,
            detail: "File data checksum differs from the declared IntegrityCheck.File byte.",
        };
}
/** Identify a bounded FFS alignment span whose bytes differ from erase polarity. */
export function unexpectedFfsPadding(region, start, end, erasePolarity) {
    const boundedEnd = Math.min(end, region.end);
    if (start >= boundedEnd ||
        isWindowUniform(region.buffer, start, boundedEnd, erasePolarity ? 0xff : 0))
        return null;
    return { offset: absoluteOffset(region, start), length: boundedEnd - start };
}
/** Read a file and its alignment within a region starting at the volume base. */
export function readFfsHeader(region, local, { erasePolarity, fileSystem, }, reserve = () => true) {
    if (local >= region.end)
        return { kind: "end" };
    const erase = erasePolarity ? 0xff : 0;
    const prefixEnd = Math.min(local + FFS_HEADER_LAYOUT.length, region.end);
    if (isWindowUniform(region.buffer, local, prefixEnd, erase)) {
        if (prefixEnd === region.end ||
            isWindowUniform(region.buffer, prefixEnd, region.end, erase))
            return { kind: "end" };
    }
    else if (!isWindowUniform(region.buffer, local, prefixEnd, erase ^ 0xff)) {
        if (!reserve())
            return { kind: "limited" };
        const header = observeFfsFileHeader(region, local, erasePolarity);
        if (header !== null && "kind" in header) {
            const offset = absoluteOffset(region, local);
            if (header.kind === "unconfirmed-state") {
                return {
                    kind: "unparsed",
                    offset,
                    length: region.end - local,
                    detail: `FFS header at 0x${offset.toString(16)} has no recognized state bits (raw State 0x${byteToHex(header.rawState)}). Its declared extent is unconfirmed.`,
                };
            }
            const detail = `FFS ExtendedSize at 0x${offset.toString(16)} declares 0x${header.size.toString(16)} bytes, exceeding exactly representable lengths.`;
            if (header.unusableState === null)
                return { kind: "unparsed", offset, length: region.end - local, detail };
            return {
                kind: "unusable-header",
                offset,
                length: FFS_HEADER_LAYOUT.extendedLength,
                nextLocal: local + FFS_HEADER_LAYOUT.extendedLength,
                detail: `${detail} The ${header.unusableState} state permits advancing by the fixed header extent.`,
            };
        }
        if (header !== null) {
            const end = local + header.observedLength;
            const nextLocal = Math.min(region.end, region.start + alignUp(end - region.start, 8));
            if (fileSystem === "ffs2" &&
                header.headerLength === FFS_HEADER_LAYOUT.extendedLength) {
                const detail = `FFS2 volume contains an FFS3 file header at 0x${header.absoluteBase.toString(16)}.`;
                const fixedHeaderOnly = header.extentIssue === "unusable-header-state";
                if (!fixedHeaderOnly &&
                    (header.extentIssue !== null ||
                        !header.headerChecksumValid ||
                        header.declaredLength <= 0xff_ffff ||
                        header.implausibilities.includes("large-file-compact-size-is-nonzero")))
                    return {
                        kind: "unparsed",
                        offset: header.absoluteBase,
                        length: region.end - local,
                        detail: `${detail} Its occupied extent could not be confirmed.`,
                    };
                const skipEnd = fixedHeaderOnly ? end : nextLocal;
                return {
                    kind: "unusable-header",
                    offset: header.absoluteBase,
                    length: skipEnd - local,
                    nextLocal: skipEnd,
                    detail: fixedHeaderOnly
                        ? `${detail} Its state permits advancing by the fixed header extent.`
                        : detail,
                };
            }
            return {
                kind: "file",
                header,
                nextLocal,
                padding: unexpectedFfsPadding(region, end, nextLocal, erasePolarity),
            };
        }
    }
    return {
        kind: "unparsed",
        offset: absoluteOffset(region, local),
        length: region.end - local,
    };
}
