import { BinaryReader } from "../binaryContainer.js";
import { isJvmClassFile, JVM_CLASS_IDENTITY_LIMIT_REASON, } from "./jvmClassFile.js";
/** loader.h: load commands are 8-byte aligned in 64-bit images, 4 in 32-bit. */
export const machoLoadCommandAlignment = (wide) => wide ? 8 : 4;
const machoReader = (bytes, littleEndian) => new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "Mach-O");
/** Parse only facts present in the observed prefix of a thin Mach-O header. */
export const readMachoHeaderPrefixFacts = (bytes) => {
    if (bytes.byteLength < 4)
        return { magic: null, format: null, identity: null };
    const magic = machoReader(bytes, false).u32(0);
    const format = thinMachoFormat(magic);
    if (format === null)
        return { magic, format: null, identity: null };
    if (bytes.byteLength < 12)
        return { magic, format, identity: null };
    const fields = machoReader(bytes, format.littleEndian);
    return {
        magic,
        format,
        identity: { cpuType: fields.u32(4), cpuSubtype: fields.u32(8) },
    };
};
const FAT_MAGIC = 0xcafebabe;
const FAT_MAGIC_64 = 0xcafebabf;
const FAT_CIGAM = 0xbebafeca;
const FAT_CIGAM_64 = 0xbfbafeca;
const MAX_FAT_ARCHITECTURES = 128;
const KNOWN_MACHO_CPU_TYPES = [
    7, 0x01000007, 12, 0x0100000c, 0x0200000c, 18, 0x01000012,
];
const thinMachoFormat = (magic) => {
    if (![0xfeedface, 0xfeedfacf, 0xcefaedfe, 0xcffaedfe].includes(magic))
        return null;
    const wide = magic === 0xfeedfacf || magic === 0xcffaedfe;
    return {
        wide,
        littleEndian: magic === 0xcefaedfe || magic === 0xcffaedfe,
        headerSize: wide ? 32 : 28,
    };
};
/** Raw thin/FAT signature recognition; FAT magic alone does not resolve JVM ambiguity. */
export const hasMachoMagic = (bytes) => {
    if (readMachoHeaderPrefixFacts(bytes).format !== null)
        return true;
    const fat = readFatHeaderPrefix(bytes);
    return fat.state !== "unknown" && fat.state !== "not-fat";
};
/** Interpret a raw FAT magic without asserting container identity or header readiness. */
const readFatMagicFormat = (magic) => {
    if (![FAT_MAGIC, FAT_MAGIC_64, FAT_CIGAM, FAT_CIGAM_64].includes(magic))
        return null;
    return {
        magic,
        wide: magic === FAT_MAGIC_64 || magic === FAT_CIGAM_64,
        littleEndian: magic === FAT_CIGAM || magic === FAT_CIGAM_64,
    };
};
/** Classify a Mach-O signature without admitting a thin header or FAT table. */
export const machoContainerKindFromMagic = (magic) => {
    if (thinMachoFormat(magic) !== null)
        return "thin";
    const fat = readFatMagicFormat(magic);
    return fat === null ? null : fat.wide ? "fat64" : "fat32";
};
/** Observe the fixed FAT header without table, count-limit or container-identity admission. */
export const readFatHeaderPrefix = (bytes) => {
    if (bytes.byteLength < 4)
        return { state: "unknown", requiredBytes: 4 };
    const magic = machoReader(bytes, false).u32(0);
    const format = readFatMagicFormat(magic);
    if (format === null)
        return { state: "not-fat", magic };
    if (bytes.byteLength < 8)
        return { state: "incomplete", ...format, requiredBytes: 8 };
    const count = machoReader(bytes, format.littleEndian).u32(4);
    return {
        state: "parsed",
        ...format,
        count,
        tableEnd: 8 + count * (format.wide ? 32 : 20),
    };
};
/** Parse a bounded FAT header and table without treating the magic alone as proof. */
export const readFatContainerHeader = (bytes, fileSize) => {
    const prefix = readFatHeaderPrefix(bytes);
    if (prefix.state === "unknown" || prefix.state === "not-fat")
        return { state: "not-fat" };
    if (!Number.isSafeInteger(fileSize) || fileSize < bytes.byteLength)
        return {
            state: "malformed",
            reason: "FAT file size is invalid or contradicts retained bytes",
        };
    const table = decodeFatContainerTable(bytes, prefix);
    if (table.state !== "parsed") {
        if (table.state === "needs-data" && table.requiredBytes > fileSize) {
            return table.requiredBytes === 8 && fileSize < 8
                ? { state: "malformed", reason: "FAT header is truncated" }
                : { state: "not-fat" };
        }
        return table;
    }
    if (bytes.byteLength === fileSize && isJvmClassFile(bytes))
        return { state: "not-fat" };
    if (table.tableEnd > fileSize)
        return { state: "not-fat" };
    return {
        ...table,
        rangeIssues: table.slices.map((slice) => inspectFatSliceRange(slice, fileSize, table.tableEnd)),
    };
};
/** Decode bounded FAT declarations without assuming the final file size. */
export const readFatContainerTable = (bytes) => decodeFatContainerTable(bytes, readFatHeaderPrefix(bytes));
const decodeFatContainerTable = (bytes, prefix) => {
    if (prefix.state === "unknown" || prefix.state === "not-fat")
        return { state: "not-fat" };
    if (prefix.state === "incomplete")
        return { state: "needs-data", requiredBytes: prefix.requiredBytes };
    const { magic, littleEndian, wide, count, tableEnd } = prefix;
    if (count === 0)
        return {
            state: "malformed",
            reason: "FAT header declares no architectures",
        };
    if (count > MAX_FAT_ARCHITECTURES)
        return { state: "not-fat" };
    if (tableEnd > bytes.byteLength)
        return { state: "needs-data", requiredBytes: tableEnd };
    const declarations = readFatSliceDeclarations(bytes.subarray(8, tableEnd), {
        count,
        wide,
        littleEndian,
    });
    return declarations.status === "parsed"
        ? {
            state: "parsed",
            magic,
            count,
            wide,
            littleEndian,
            tableEnd,
            slices: declarations.slices,
        }
        : { state: "malformed", reason: declarations.reason };
};
/** Confirm FAT identity from observed slice headers, not CPU declarations. */
export const classifyFatContainerIdentity = (header, sliceHeaderAt) => {
    const hasKnownCpu = header.slices.some(({ cpuType }) => KNOWN_MACHO_CPU_TYPES.includes(cpuType));
    const invalidRange = header.rangeIssues.find((issue) => issue !== null);
    // Preserve the existing malformed-range result for recognized CPU tables;
    // a valid CPU declaration by itself does not establish a Mach-O image.
    if (hasKnownCpu && invalidRange !== undefined)
        return { state: "malformed", ...invalidRange };
    const validRanges = header.slices.filter((_slice, index) => header.rangeIssues[index] === null);
    const missingHeaders = [];
    let observedMachO = false;
    let observedNonMachO = false;
    for (const slice of validRanges) {
        if (slice.size < 4) {
            observedNonMachO = true;
            continue;
        }
        const magic = sliceHeaderAt(slice.offset);
        if (magic === undefined || magic === null)
            missingHeaders.push(slice.offset);
        else if (thinMachoFormat(magic) !== null)
            observedMachO = true;
        else
            observedNonMachO = true;
    }
    if (observedNonMachO)
        return { state: "not-mach-o" };
    if (missingHeaders.length > 0)
        return { state: "needs-slice-header", offsets: missingHeaders };
    if (observedMachO)
        return invalidRange === undefined
            ? { state: "mach-o" }
            : { state: "malformed", ...invalidRange };
    return { state: "not-mach-o" };
};
/** Explicit slice observations take precedence over bytes retained in a root prefix. */
export const classifyFatContainerEvidence = (header, prefix, sliceHeadersByOffset) => classifyFatContainerIdentity(header, (offset) => {
    if (sliceHeadersByOffset?.has(offset))
        return sliceHeadersByOffset.get(offset)?.magic;
    const slice = header.slices.find((candidate) => candidate.offset === offset);
    if (slice === undefined || offset >= prefix.byteLength)
        return undefined;
    const available = Math.max(0, Math.min(slice.size, prefix.byteLength - offset, 12));
    return readMachoHeaderPrefixFacts(prefix.subarray(offset, offset + available)).magic;
});
/**
 * A malformed table is conclusive after a capped JVM scan only if one
 * range-valid slice owns a complete, matching thin header. A sibling's range
 * failure still belongs to that sibling.
 */
export const readFatJvmIdentityLimitIssue = async (header, identity, readAt) => {
    if (identity.state !== "malformed")
        return null;
    for (const [index, slice] of header.slices.entries()) {
        // A 28-byte header is the smallest complete thin header. Never read
        // outside the slice, even when the enclosing file has more bytes.
        if (header.rangeIssues[index] !== null || slice.size < 28)
            continue;
        const requested = Math.min(32, slice.size);
        const observed = await readAt(slice.offset, requested);
        const { format, identity: embedded } = readMachoHeaderPrefixFacts(observed);
        if (format !== null &&
            embedded !== null &&
            format.headerSize <= requested &&
            format.headerSize <= observed.byteLength &&
            validateFatSliceIdentity(slice, embedded) === null)
            return null;
    }
    return JVM_CLASS_IDENTITY_LIMIT_REASON;
};
/** Decode FAT table entries once so artifact and native readers share identity facts. */
export const readFatSliceDeclarations = (tableBytes, options) => {
    const { count, wide, littleEndian } = options;
    const entrySize = wide ? 32 : 20;
    if (tableBytes.byteLength < count * entrySize)
        return { status: "malformed", reason: "FAT table is truncated" };
    const fields = machoReader(tableBytes, littleEndian);
    const slices = [];
    for (let index = 0; index < count; index++) {
        const base = index * entrySize;
        const offset = wide
            ? safeNumber(fields.word(base + 8, 64))
            : fields.u32(base + 8);
        const size = wide
            ? safeNumber(fields.word(base + 16, 64))
            : fields.u32(base + 12);
        if (offset === null || size === null)
            return {
                status: "malformed",
                reason: "FAT offset or size exceeds the safe range",
            };
        slices.push({
            index,
            offset,
            size,
            alignmentExponent: fields.u32(base + (wide ? 24 : 16)),
            cpuType: fields.u32(base),
            cpuSubtype: fields.u32(base + 4),
            reserved: wide ? fields.u32(base + 28) : null,
        });
    }
    return { status: "parsed", slices };
};
/** Find an overlapping pair without changing the declarations' table order. */
export const findOverlappingFatSlices = (declarations) => {
    const ranges = [...declarations].sort((a, b) => a.offset - b.offset);
    for (let index = 1; index < ranges.length; index++) {
        const previous = ranges[index - 1];
        const current = ranges[index];
        if (previous !== undefined &&
            current !== undefined &&
            current.offset < previous.offset + previous.size)
            return [previous, current];
    }
    return null;
};
/** The malformed-container reason for two FAT declarations whose byte ranges overlap. */
export const fatSliceOverlapReason = (overlap) => `Mach-O slices ${overlap[0].index} and ${overlap[1].index} overlap.`;
/** Validate byte-range and table/header identity facts shared by Mach-O readers. */
export const validateFatSlice = (declaration, containerSize, tableEnd, embedded) => {
    const rangeIssue = inspectFatSliceRange(declaration, containerSize, tableEnd);
    if (rangeIssue !== null)
        return rangeIssue.reason;
    return embedded === undefined
        ? null
        : validateFatSliceIdentity(declaration, embedded);
};
/** Validate table placement, container bounds, and alignment with a typed failure. */
export const inspectFatSliceRange = (declaration, containerSize, tableEnd) => {
    const { index, offset, size, alignmentExponent } = declaration;
    if (!Number.isSafeInteger(offset) ||
        !Number.isSafeInteger(size) ||
        size <= 0 ||
        offset < tableEnd)
        return {
            category: "malformed",
            reason: `FAT architecture ${index} has an invalid slice range`,
        };
    if (offset > containerSize || size > containerSize - offset)
        return {
            category: "malformed",
            reason: `FAT architecture ${index} slice range extends beyond the file`,
        };
    if (!Number.isInteger(alignmentExponent) ||
        alignmentExponent < 0 ||
        alignmentExponent > 52)
        return {
            category: "unsupported",
            reason: `FAT architecture ${index} alignment exponent ${alignmentExponent} is unsupported`,
        };
    if (offset % 2 ** alignmentExponent !== 0)
        return {
            category: "malformed",
            reason: `FAT architecture ${index} offset is not aligned to 2^${alignmentExponent}`,
        };
    return null;
};
/** Validate only the identity claim after the owner has validated its range. */
export const validateFatSliceIdentity = (declaration, embedded) => embedded.cpuType === declaration.cpuType &&
    embedded.cpuSubtype === declaration.cpuSubtype
    ? null
    : `FAT architecture ${declaration.index} CPU type/subtype disagrees with its Mach-O header`;
const safeNumber = (value) => value > BigInt(Number.MAX_SAFE_INTEGER) ? null : Number(value);
