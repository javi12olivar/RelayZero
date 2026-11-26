import { Budget } from "../domain/budget.js";
import { BinaryReader } from "../domain/binaryContainer.js";
import { formatGuidLittleEndian, GUID_LENGTH } from "./UefiGuid.js";
import { UEFI_FIRMWARE_LIMITS } from "../domain/uefi/uefiLimits.js";
/**
 * AMI NVRAM variable-store cartography for UEFI flash images.
 *
 * Vendor AMI images carry factory defaults (and other setup state) in a
 * proprietary variable store whose entries are chained by the ASCII magic
 * "NVAR". This module finds those chains inside a raw image and reports their
 * structure as observations; it never interprets the variable data and never
 * executes anything.
 *
 * The fixed prefix contains magic, size, a 24-bit Next displacement and an
 * 8-bit attribute field. Body framing follows the attributes. See the
 * AMI NVAR format definition in UEFITool (common/ksy/ami_nvar.ksy).
 *
 * The factory-default store is itself one such entry (name "StdDefaults") whose
 * data holds a nested NVAR chain of the individual setup variables. The scan
 * therefore recurses into entries whose data starts with a bounded NVAR record,
 * so the result is a flat list with `depth` and `parent_offset` describing the
 * nesting instead of hiding the children behind an opaque data range.
 */
/** "NVAR" stored as a little-endian uint32. */
const NVAR_MAGIC = 0x5241564e;
const NVAR_HEADER_BYTES = 10;
const NVAR_MIN_ENTRY_BYTES = NVAR_HEADER_BYTES + 1;
const NVAR_ATTRIBUTES = {
    valid: 0x80,
    extendedHeader: 0x10,
    dataOnly: 0x08,
    localGuid: 0x04,
    asciiName: 0x02,
};
/** ASCII search needle for locating candidate chains. */
const NVAR_BYTES = Buffer.from("NVAR", "ascii");
const isPrintableAscii = (byte) => byte >= 0x20 && byte <= 0x7e;
/** Locate a nonempty, terminated name within the framed record body. */
const readNvarName = (reader, start, end, ascii) => {
    const width = ascii ? 1 : 2;
    for (let cursor = start; cursor + width <= end; cursor += width) {
        const unit = ascii ? reader.u8(cursor) : reader.u16(cursor);
        if (unit === 0) {
            if (cursor === start)
                return null;
            return {
                name: reader.bytes.toString(ascii ? "ascii" : "utf16le", start, cursor),
                dataOffset: cursor + width,
            };
        }
        if (ascii
            ? !isPrintableAscii(unit)
            : unit < 0x20 || (unit >= 0xd800 && unit <= 0xdfff))
            return null;
    }
    return null;
};
function readNvarRecord(reader, offset, endOffset, reserve) {
    if (offset < 0 ||
        offset + NVAR_BYTES.length > endOffset ||
        reader.u32(offset) !== NVAR_MAGIC)
        return { kind: "end" };
    if (!reserve(offset))
        return { kind: "limited" };
    if (offset + NVAR_HEADER_BYTES > endOffset)
        return { kind: "invalid-frame" };
    const totalSize = reader.u16(offset + 4);
    const entryEnd = offset + totalSize;
    if (totalSize < NVAR_HEADER_BYTES || entryEnd > endOffset)
        return { kind: "invalid-frame" };
    const attributes = reader.u8(offset + 9);
    if ((attributes & NVAR_ATTRIBUTES.valid) === 0)
        return { kind: "inactive", endOffset: entryEnd };
    const entry = parseActiveRecord(reader, offset, entryEnd, attributes);
    return entry === null
        ? { kind: "malformed", endOffset: entryEnd }
        : { kind: "active", entry };
}
/** A short matching signature at an established boundary is a truncated successor. */
function readNvarSuccessor(reader, offset, endOffset, reserve) {
    const remaining = endOffset - offset;
    if (remaining > 0 &&
        remaining < NVAR_BYTES.length &&
        reader.bytes
            .subarray(offset, endOffset)
            .equals(NVAR_BYTES.subarray(0, remaining))) {
        return reserve(offset) ? { kind: "invalid-frame" } : { kind: "limited" };
    }
    return readNvarRecord(reader, offset, endOffset, reserve);
}
function parseActiveRecord(reader, offset, entryEnd, attributes) {
    if (entryEnd - offset < NVAR_MIN_ENTRY_BYTES)
        return null;
    const next = reader.u16(offset + 6) | (reader.u8(offset + 8) << 16);
    const bodyStart = offset + NVAR_HEADER_BYTES;
    let dataEnd = entryEnd;
    if ((attributes & NVAR_ATTRIBUTES.extendedHeader) !== 0) {
        if (entryEnd - bodyStart < 3)
            return null;
        const extensionSize = reader.u16(entryEnd - 2);
        if (extensionSize < 3 || extensionSize > entryEnd - bodyStart)
            return null;
        dataEnd -= extensionSize;
    }
    let dataOffset = bodyStart;
    let name = null;
    let guidIndex = null;
    let guid = null;
    if ((attributes & NVAR_ATTRIBUTES.dataOnly) === 0) {
        const inlineGuid = (attributes & NVAR_ATTRIBUTES.localGuid) !== 0;
        const nameStart = bodyStart + (inlineGuid ? GUID_LENGTH : 1);
        const parsedName = readNvarName(reader, nameStart, dataEnd, (attributes & NVAR_ATTRIBUTES.asciiName) !== 0);
        if (parsedName === null)
            return null;
        ({ name, dataOffset } = parsedName);
        if (inlineGuid)
            guid = formatGuidLittleEndian(reader.bytes, bodyStart);
        else
            guidIndex = reader.u8(bodyStart);
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
        endOffset: entryEnd,
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
            // Its extent is unknown, but raw discovery already examined this signature.
            return { endOffset: cursor, nextSearchOffset: cursor + 1 };
        }
        if (record.kind !== "active") {
            if (record.kind === "malformed")
                noteOmission(`NVAR record at 0x${cursor.toString(16)} has malformed variable data.`);
            cursor = record.endOffset;
            record = readNvarSuccessor(reader, cursor, frame.endOffset, reserve);
            continue;
        }
        const { entry } = record;
        out.push({ ...entry, ...scope });
        const dataEnd = entry.dataOffset + entry.dataLength;
        const nested = readNvarRecord(reader, entry.dataOffset, dataEnd, reserve);
        if (nested.kind === "limited") {
            return { endOffset: entry.endOffset, nextSearchOffset: entry.endOffset };
        }
        if (nested.kind === "invalid-frame") {
            noteOmission(`Possible nested NVAR record at 0x${entry.dataOffset.toString(16)} has an incomplete or invalid extent.`);
        }
        else if (nested.kind !== "end") {
            // Framing can establish a nested chain even if its first body is unusable.
            if (scope.depth < maxDepth) {
                collectChain(context, { offset: entry.dataOffset, first: nested, endOffset: dataEnd }, { depth: scope.depth + 1, parentOffset: entry.offset }, out);
            }
            else {
                noteOmission(`Nested NVAR chain below max_depth ${maxDepth} under variable at 0x${entry.offset.toString(16)}.`);
            }
        }
        cursor = entry.endOffset;
        record = readNvarSuccessor(reader, cursor, frame.endOffset, reserve);
    }
    return { endOffset: cursor, nextSearchOffset: cursor };
}
/** Scan a raw image for chained AMI NVRAM variable stores. */
export const scanAmiNvramStores = (image, maxStores, maxDepth, checkpoint = () => { }) => {
    const stores = [];
    const limitations = [];
    const reader = new BinaryReader(image, true, "AMI NVAR");
    let partial = false;
    const noteOmission = (detail) => {
        partial = true;
        if (limitations.length < 512)
            limitations.push(detail);
    };
    const records = new Budget(UEFI_FIRMWARE_LIMITS.scanRecords);
    const limit = { offset: null };
    const reserve = (offset) => {
        checkpoint();
        if (records.tryCharge(1))
            return true;
        limit.offset ??= offset;
        return false;
    };
    const context = { reader, reserve, maxDepth, noteOmission };
    let searchFrom = 0;
    while (searchFrom + NVAR_MIN_ENTRY_BYTES <= image.length) {
        checkpoint();
        const firstOffset = image.indexOf(NVAR_BYTES, searchFrom);
        if (firstOffset < 0)
            break;
        const first = readNvarRecord(reader, firstOffset, image.length, reserve);
        if (first.kind === "limited")
            break;
        if (first.kind !== "active") {
            searchFrom = firstOffset + 1;
            continue;
        }
        if (stores.length >= maxStores) {
            limitations.push(`Stopped after ${maxStores} AMI NVRAM stores; additional stores exist.`);
            return { stores, coverage: "partial", limitations };
        }
        const variables = [];
        const { endOffset, nextSearchOffset } = collectChain(context, { offset: firstOffset, first, endOffset: image.length }, { depth: 0, parentOffset: null }, variables);
        let padding = 0;
        while (limit.offset === null &&
            endOffset + padding < image.length &&
            image[endOffset + padding] === 0xff) {
            if (padding % 65536 === 0)
                checkpoint();
            padding += 1;
        }
        if (variables.length > 0)
            stores.push({
                offset: firstOffset,
                name: first.entry.name,
                variables,
                trailingPadding: padding > 0 ? padding : null,
            });
        searchFrom = nextSearchOffset;
        if (limit.offset !== null)
            break;
    }
    if (limit.offset !== null) {
        limitations.push(`Structural record limit ${UEFI_FIRMWARE_LIMITS.scanRecords} reached at NVAR candidate 0x${limit.offset.toString(16)}.`);
        return { stores, coverage: "partial", limitations };
    }
    if (stores.length === 0)
        limitations.push("No AMI NVRAM variable stores (NVAR chains) were found in the image.");
    return {
        stores,
        coverage: partial ? "partial" : "complete",
        limitations,
    };
};
