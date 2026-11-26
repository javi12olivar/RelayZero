import { MACHO_DYLIB_FIELDS_OFFSET, MACHO_DYLIB_NAME_MIN, machoDylibFieldsSize, readMachoDylibFields, } from "./machoDylibCommand.js";
import { LC, LC_REQ_DYLD } from "./machoLoadCommandCodes.js";
import { MachoLoadCommandCursor, machoWordReader, decodeMachoFixedWordFields, machoFixedWordFieldNames, readMachoLoadCommandTableHeader, } from "./machoLoadCommands.js";
import { classifyMachoVersionMinCommand, } from "./machoPlatform.js";
import { machoSegmentHeaderSize, machoSegmentSectionTableFits, readMachoSegmentHeader, } from "./machoSegmentHeader.js";
import { machoSectionHeaderSize, readMachoSectionHeader, } from "./machoSectionHeader.js";
import { createHash } from "node:crypto";
import { decodeLimit, malformedInput, truncatedInput, } from "../parseFailure.js";
import { invariantViolation } from "../internalInvariant.js";
/** loader.h defines these with LC_REQ_DYLD; the reader also accepts each code without that bit. */
const withoutRequiredByDyld = (code) => code & ~LC_REQ_DYLD;
const DYLIB_COMMANDS = new Set([
    LC.LOAD_DYLIB,
    LC.ID_DYLIB,
    withoutRequiredByDyld(LC.LOAD_WEAK_DYLIB),
    LC.LOAD_WEAK_DYLIB,
    withoutRequiredByDyld(LC.REEXPORT_DYLIB),
    LC.REEXPORT_DYLIB,
    LC.LAZY_LOAD_DYLIB,
    withoutRequiredByDyld(LC.LOAD_UPWARD_DYLIB),
    LC.LOAD_UPWARD_DYLIB,
]);
const LC_STR_COMMANDS = new Set([
    ...DYLIB_COMMANDS,
    LC.LOADFVMLIB,
    LC.IDFVMLIB,
    LC.FVMFILE,
    LC.PREBOUND_DYLIB,
    LC.LOAD_DYLINKER,
    LC.ID_DYLINKER,
    LC.SUB_FRAMEWORK,
    LC.SUB_UMBRELLA,
    LC.SUB_CLIENT,
    LC.SUB_LIBRARY,
    LC.RPATH,
    LC.DYLD_ENVIRONMENT,
    LC.TARGET_TRIPLE,
]);
const loadCommandLimit = (maximum, unit) => decodeLimit("macho", `Mach-O load-command ${unit === "projected_bytes" ? "projected bytes" : unit} exceed the retained output budget`, { name: `macho_load_command_${unit}`, maximum });
// Reserve fixed projection keys, scalar metadata, arrays and bounded limitation
// messages even when the input has no load commands.
const PROJECTED_ENVELOPE_BYTES = 8192;
// A section becomes both a segment-view object and a set of indexed command
// fields. Reserve for their keys, numbers, identities and JSON framing before
// retaining the section. Strings are charged separately for escaping and hex.
const PROJECTED_COMMAND_BYTES = 2048;
const PROJECTED_SECTION_BYTES = 2048;
const PROJECTED_CHILD_BYTES = 256;
const PROJECTED_STRING_EXPANSION = 24;
const DEFAULT_PROJECTED_BYTES = 64 * 1024 * 1024;
/**
 * Walk only fixed records and declared strings from a selected thin image.
 * The caller owns identity, cancellation, closing, and the per-string byte cap.
 */
export const readMachoCommandNames = async (read, imageSize, maximumStringBytes, maximumRecords, maximumProjectedBytes = DEFAULT_PROJECTED_BYTES) => {
    if (!Number.isSafeInteger(maximumStringBytes) ||
        maximumStringBytes < 0 ||
        !Number.isSafeInteger(maximumRecords) ||
        maximumRecords < 0 ||
        !Number.isSafeInteger(maximumProjectedBytes) ||
        maximumProjectedBytes < 0)
        throw invariantViolation("Mach-O read limits must be nonnegative safe integers");
    const exact = async (offset, size) => {
        if (!Number.isSafeInteger(offset) ||
            !Number.isSafeInteger(size) ||
            offset < 0 ||
            size < 0 ||
            offset > imageSize - size)
            throw malformedInput("macho", "Mach-O range exceeds selected slice");
        const value = await read(offset, size);
        if (value.byteLength !== size)
            throw truncatedInput("macho", "Mach-O range is truncated");
        return value;
    };
    const header = await exact(0, Math.min(32, imageSize));
    const parsed = readMachoLoadCommandTableHeader(header, imageSize);
    if (!parsed.ok)
        throw malformedInput("macho", parsed.error);
    if (parsed.value === null)
        throw malformedInput("macho", "Selected slice is not Mach-O");
    const table = parsed.value;
    const cursor = new MachoLoadCommandCursor(table);
    if (table.commandCount > maximumRecords)
        throw loadCommandLimit(maximumRecords, "records");
    let projectedBytes = 0;
    const chargeProjection = (count, perItem) => {
        if (count > Math.floor((maximumProjectedBytes - projectedBytes) / perItem))
            throw loadCommandLimit(maximumProjectedBytes, "projected_bytes");
        projectedBytes += count * perItem;
    };
    chargeProjection(1, PROJECTED_ENVELOPE_BYTES);
    chargeProjection(table.commandCount, PROJECTED_COMMAND_BYTES);
    let records = table.commandCount;
    let retainedStringBytes = 0;
    const stringAllowance = () => Math.min(maximumStringBytes - retainedStringBytes, Math.floor((maximumProjectedBytes - projectedBytes) / PROJECTED_STRING_EXPANSION));
    const admitStringBytes = (count) => {
        if (count > maximumStringBytes - retainedStringBytes)
            throw loadCommandLimit(maximumStringBytes, "bytes");
        if (count > stringAllowance())
            throw loadCommandLimit(maximumProjectedBytes, "projected_bytes");
    };
    const retain = (bytes) => {
        admitStringBytes(bytes.byteLength);
        chargeProjection(bytes.byteLength, PROJECTED_STRING_EXPANSION);
        retainedStringBytes += bytes.byteLength;
        // Range readers may return Buffer views into a much larger read window.
        // Charge the retained length before allocating an independently owned copy.
        return Uint8Array.from(bytes);
    };
    const readString = async (offset, extent, label) => {
        const length = Math.min(extent, stringAllowance() + 1);
        const bytes = await exact(offset, length);
        const end = bytes.indexOf(0);
        if (end < 0) {
            if (length < extent)
                admitStringBytes(length);
            throw malformedInput("macho", `${label} is unterminated`);
        }
        return retain(bytes.subarray(0, end));
    };
    const commands = [];
    while (cursor.nextOffset !== null) {
        const row = cursor.read(await exact(table.headerSize + cursor.nextOffset, 8));
        if (!row.ok)
            throw malformedInput("macho", row.error);
        const frame = row.value;
        const at = table.headerSize + frame.offset;
        const fixedNames = machoFixedWordFieldNames(frame.command);
        let fixedFields;
        if (fixedNames !== undefined) {
            const byteLength = fixedNames.length * 4;
            const decoded = frame.size < 8 + byteLength
                ? null
                : decodeMachoFixedWordFields(frame.command, await exact(at + 8, byteLength), table.littleEndian);
            if (decoded === null)
                throw malformedInput("macho", "Mach-O fixed command fields are truncated");
            fixedFields = decoded;
        }
        const segmentWide = frame.command === LC.SEGMENT_64
            ? true
            : frame.command === LC.SEGMENT
                ? false
                : null;
        let segmentName;
        let segmentFacts;
        let sections;
        if (segmentWide !== null) {
            const segmentHeaderSize = machoSegmentHeaderSize(segmentWide);
            if (frame.size < segmentHeaderSize)
                throw malformedInput("macho", "Mach-O segment is truncated");
            const segmentBytes = await exact(at, segmentHeaderSize);
            const segment = readMachoSegmentHeader(segmentBytes, segmentWide, table.littleEndian);
            if (!segment.ok)
                throw malformedInput("macho", segment.error.message);
            const width = machoSectionHeaderSize(segmentWide);
            if (!machoSegmentSectionTableFits(segment.value, frame.size, segmentWide))
                throw malformedInput("macho", "Mach-O section table is truncated");
            if (segment.value.sectionCount > maximumRecords - records)
                throw loadCommandLimit(maximumRecords, "records");
            chargeProjection(segment.value.sectionCount, PROJECTED_SECTION_BYTES);
            records += segment.value.sectionCount;
            segmentName = retain(segment.value.nameBytes);
            segmentFacts = {
                address: segment.value.address,
                memorySize: segment.value.memorySize,
                fileOffset: segment.value.fileOffset,
                fileSize: segment.value.fileSize,
                maxProtection: segment.value.maxProtection,
                protection: segment.value.protection,
                flags: segment.value.flags,
            };
            sections = [];
            for (let i = 0; i < segment.value.sectionCount; i++) {
                const sectionBytes = await exact(at + segmentHeaderSize + i * width, width);
                const section = readMachoSectionHeader(sectionBytes, segmentWide, table.littleEndian);
                if (!section.ok)
                    throw malformedInput("macho", section.error.message);
                sections.push({
                    name: retain(section.value.nameBytes),
                    segmentName: retain(section.value.segmentNameBytes),
                    address: section.value.address,
                    size: section.value.size,
                    fileOffset: section.value.offset,
                    alignmentExponent: section.value.alignmentExponent,
                    relocationOffset: section.value.relocationOffset,
                    relocationCount: section.value.relocationCount,
                    reserved1: section.value.reserved1,
                    reserved2: section.value.reserved2,
                    ...(section.value.reserved3 === undefined
                        ? {}
                        : { reserved3: section.value.reserved3 }),
                    flags: section.value.flags,
                });
            }
        }
        // Dylib and rpath commands own an lc_str at offset 8. Retain bytes up to
        // the first NUL without allocating the command's full declared extent.
        let commandString;
        let commandStringOffset;
        let dylib;
        if (LC_STR_COMMANDS.has(frame.command)) {
            if (frame.size < 12)
                throw malformedInput("macho", "Mach-O command string offset is truncated");
            const data = await exact(at + 8, 4);
            const offset = machoWordReader(data, table.littleEndian).u32(0);
            const minimum = DYLIB_COMMANDS.has(frame.command)
                ? MACHO_DYLIB_NAME_MIN
                : frame.command === LC.LOADFVMLIB ||
                    frame.command === LC.IDFVMLIB ||
                    frame.command === LC.PREBOUND_DYLIB
                    ? 20
                    : frame.command === LC.FVMFILE
                        ? 16
                        : 12;
            if (offset < minimum || offset >= frame.size)
                throw malformedInput("macho", "Mach-O command string offset is invalid");
            commandString = await readString(at + offset, frame.size - offset, "Mach-O command string");
            commandStringOffset = offset;
            if (DYLIB_COMMANDS.has(frame.command))
                dylib = readMachoDylibFields(await exact(at + MACHO_DYLIB_FIELDS_OFFSET, machoDylibFieldsSize(frame.command, offset)), frame.command, offset, table.littleEndian);
        }
        let prebound;
        if (frame.command === LC.PREBOUND_DYLIB) {
            if (frame.size < 20)
                throw malformedInput("macho", "Mach-O prebound dylib command is truncated");
            const data = await exact(at + 12, 8);
            const view = machoWordReader(data, table.littleEndian);
            const moduleCount = view.u32(0);
            const linkedModulesOffset = view.u32(4);
            const length = Math.ceil(moduleCount / 8);
            if (linkedModulesOffset < 20 || linkedModulesOffset > frame.size - length)
                throw malformedInput("macho", "Mach-O prebound module bitmap exceeds its command");
            admitStringBytes(length);
            prebound = {
                moduleCount,
                linkedModulesOffset,
                linkedModules: retain(await exact(at + linkedModulesOffset, length)),
            };
        }
        let fvmlib;
        if (frame.command === LC.LOADFVMLIB || frame.command === LC.IDFVMLIB) {
            if (frame.size < 20)
                throw malformedInput("macho", "Mach-O fvmlib command is truncated");
            const data = await exact(at + 12, 8);
            const view = machoWordReader(data, table.littleEndian);
            fvmlib = {
                minorVersion: view.u32(0),
                headerAddress: view.u32(4),
            };
        }
        let fvmfile;
        if (frame.command === LC.FVMFILE) {
            if (frame.size < 16)
                throw malformedInput("macho", "Mach-O fvmfile command is truncated");
            const data = await exact(at + 12, 4);
            fvmfile = {
                headerAddress: machoWordReader(data, table.littleEndian).u32(0),
            };
        }
        let linkerOptions;
        if (frame.command === LC.LINKER_OPTION) {
            if (frame.size < 12)
                throw malformedInput("macho", "Mach-O linker option count is truncated");
            const countBytes = await exact(at + 8, 4);
            const count = machoWordReader(countBytes, table.littleEndian).u32(0);
            if (count > frame.size - 12)
                throw malformedInput("macho", "Mach-O linker option table is truncated");
            if (count > maximumRecords - records)
                throw loadCommandLimit(maximumRecords, "records");
            chargeProjection(count, PROJECTED_CHILD_BYTES);
            records += count;
            linkerOptions = [];
            let offset = 12;
            let current = new Uint8Array(0);
            let currentLength = 0;
            while (linkerOptions.length < count && offset < frame.size) {
                const length = Math.min(frame.size - offset, 4096);
                const bytes = await exact(at + offset, length);
                offset += length;
                for (const byte of bytes) {
                    if (byte === 0) {
                        linkerOptions.push(retain(current.subarray(0, currentLength)));
                        current = new Uint8Array(0);
                        currentLength = 0;
                        if (linkerOptions.length === count)
                            break;
                    }
                    else {
                        const remaining = stringAllowance();
                        if (currentLength >= remaining)
                            admitStringBytes(currentLength + 1);
                        if (currentLength === current.byteLength) {
                            const capacity = Math.min(remaining, Math.max(32, current.byteLength * 2));
                            const expanded = new Uint8Array(capacity);
                            expanded.set(current);
                            current = expanded;
                        }
                        current[currentLength++] = byte;
                    }
                }
            }
            if (linkerOptions.length !== count)
                throw malformedInput("macho", "Mach-O linker option is unterminated");
        }
        let legacyBuild;
        const versionMin = classifyMachoVersionMinCommand(frame.command, frame.size);
        if (versionMin?.kind === "truncated")
            throw malformedInput("macho", "Mach-O minimum version command is truncated");
        if (versionMin?.kind === "exact") {
            const bytes = await exact(at + 8, 8);
            const view = machoWordReader(bytes, table.littleEndian);
            legacyBuild = {
                platform: versionMin.platform,
                version: view.u32(0),
                sdk: view.u32(4),
            };
        }
        let note;
        if (frame.command === LC.NOTE) {
            if (frame.size < 40)
                throw malformedInput("macho", "Mach-O note command is truncated");
            const data = await exact(at + 8, 32);
            const view = machoWordReader(data, table.littleEndian);
            note = {
                owner: retain(data.subarray(0, 16)),
                offset: view.word(16, 64),
                size: view.word(24, 64),
            };
        }
        let fileset;
        let filesetStringStartsAfterHeader = false;
        let filesetStringEnd;
        if (frame.command === LC.FILESET_ENTRY) {
            if (frame.size < 32)
                throw malformedInput("macho", "Mach-O fileset command is truncated");
            const data = await exact(at + 8, 24);
            const view = machoWordReader(data, table.littleEndian);
            const offset = view.u32(16);
            if (offset < 32 || offset >= frame.size)
                throw malformedInput("macho", "Mach-O fileset entry string offset is invalid");
            filesetStringStartsAfterHeader = offset === 32;
            const entryId = await readString(at + offset, frame.size - offset, "Mach-O fileset entry string");
            fileset = {
                address: view.word(0, 64),
                fileOffset: view.word(8, 64),
                entryId,
                reserved: view.u32(20),
            };
            filesetStringEnd = offset + entryId.byteLength + 1;
        }
        let uuid;
        if (frame.command === LC.UUID) {
            if (frame.size < 24)
                throw malformedInput("macho", "Mach-O UUID command is truncated");
            uuid = Uint8Array.from(await exact(at + 8, 16));
        }
        let entrypoint;
        if (frame.command === LC.MAIN) {
            if (frame.size < 24)
                throw malformedInput("macho", "Mach-O entrypoint command is truncated");
            const bytes = await exact(at + 8, 16);
            const view = machoWordReader(bytes, table.littleEndian);
            entrypoint = {
                offset: view.word(0, 64),
                stackSize: view.word(8, 64),
            };
        }
        let build;
        if (frame.command === LC.BUILD_VERSION) {
            if (frame.size < 24)
                throw malformedInput("macho", "Mach-O build version command is truncated");
            const header = await exact(at + 8, 16);
            const view = machoWordReader(header, table.littleEndian);
            const toolCount = view.u32(12);
            if (toolCount > Math.floor((frame.size - 24) / 8))
                throw malformedInput("macho", "Mach-O build tool table is truncated");
            if (toolCount > maximumRecords - records)
                throw loadCommandLimit(maximumRecords, "records");
            chargeProjection(toolCount, PROJECTED_CHILD_BYTES);
            records += toolCount;
            const tools = [];
            for (let i = 0; i < toolCount; i++) {
                const tool = await exact(at + 24 + i * 8, 8);
                const toolView = machoWordReader(tool, table.littleEndian);
                tools.push({
                    tool: toolView.u32(0),
                    version: toolView.u32(4),
                });
            }
            build = {
                platform: view.u32(0),
                minimumOs: view.u32(4),
                sdk: view.u32(8),
                tools,
            };
        }
        const fullyDecoded = (linkerOptions !== undefined &&
            frame.size ===
                12 +
                    linkerOptions.reduce((total, option) => total + option.byteLength + 1, 0)) ||
            (note !== undefined && frame.size === 40) ||
            (fileset !== undefined &&
                filesetStringStartsAfterHeader &&
                filesetStringEnd === frame.size) ||
            (fixedNames !== undefined && frame.size === 8 + fixedNames.length * 4) ||
            (uuid !== undefined && frame.size === 24) ||
            (entrypoint !== undefined && frame.size === 24) ||
            legacyBuild !== undefined ||
            (segmentWide !== null &&
                sections !== undefined &&
                frame.size ===
                    (segmentWide ? 72 : 56) +
                        sections.length * (segmentWide ? 80 : 68)) ||
            (build !== undefined && frame.size === 24 + build.tools.length * 8);
        let rawSha256 = null;
        if (!fullyDecoded && frame.size <= maximumStringBytes) {
            const digest = createHash("sha256");
            for (let position = 0; position < frame.size;) {
                const length = Math.min(64 * 1024, frame.size - position);
                digest.update(await exact(at + position, length));
                position += length;
            }
            rawSha256 = digest.digest("hex");
        }
        commands.push({
            index: frame.index,
            command: frame.command,
            offset: frame.offset,
            size: frame.size,
            fullyDecoded,
            rawSha256,
            ...(fixedFields === undefined ? {} : { fixedFields }),
            ...(segmentName === undefined ||
                sections === undefined ||
                segmentFacts === undefined
                ? {}
                : { segmentName, segment: segmentFacts, sections }),
            ...(commandString === undefined ? {} : { commandString }),
            ...(commandStringOffset === undefined ? {} : { commandStringOffset }),
            ...(dylib === undefined ? {} : { dylib }),
            ...(legacyBuild === undefined ? {} : { legacyBuild }),
            ...(linkerOptions === undefined ? {} : { linkerOptions }),
            ...(note === undefined ? {} : { note }),
            ...(fileset === undefined ? {} : { fileset }),
            ...(prebound === undefined ? {} : { prebound }),
            ...(fvmlib === undefined ? {} : { fvmlib }),
            ...(fvmfile === undefined ? {} : { fvmfile }),
            ...(uuid === undefined ? {} : { uuid }),
            ...(entrypoint === undefined ? {} : { entrypoint }),
            ...(build === undefined ? {} : { build }),
        });
    }
    const end = cursor.finish();
    if (!end.ok)
        throw malformedInput("macho", end.error);
    return {
        sliceSize: imageSize,
        header: {
            wide: table.wide,
            littleEndian: table.littleEndian,
            cpuType: table.identity.cpuType,
            cpuSubtype: table.identity.cpuSubtype,
            fileType: table.fileType,
            flags: machoWordReader(header, table.littleEndian).u32(24),
        },
        commands,
    };
};
