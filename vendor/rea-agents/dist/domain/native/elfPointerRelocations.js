import { admitElfDynamicDirectory, readElfDynamicEntry, } from "../elfDynamicEntry.js";
import { decodeElfRelocationInfo, ELF_ANDROID_PACKED_RELOCATION_TABLES, ELF_ANDROID_PACKED_RELOCATION_TAGS, ELF_RELR_DYNAMIC_TAGS, readElfRelocationEntry, } from "../elfRelocation.js";
import { readLeb128, SLEB64 } from "../leb128.js";
import { elfSymbolSize, readElfSymbol } from "../elfSymbol.js";
import { readElfHashSymbolCount, readElfGnuHashSymbolCount, } from "../elfHashSymbolCount.js";
import { err, ok } from "../result.js";
import { BinaryMappingFailure, BinaryReader, createFileMappingIndex, isZeroFilledSpan, } from "../binaryContainer.js";
import { ParseFailureError } from "../parseFailure.js";
/** The ParseFailure format of ELF loader pointer interpretation. */
export const ELF_POINTER_RELOCATION_FORMAT = "elf-pointer-relocations";
/**
 * Shared loader interpretation; language adapters choose their public errors.
 * The stable `reason` names the loader rule; `native-index-capacity` is a
 * ParseFailure `limit` carrying the exceeded maximum.
 */
export class ElfPointerRelocationFailure extends ParseFailureError {
    reason;
    /** What the limit's maximum counts, set only for `native-index-capacity`. */
    unit;
    constructor(reason, message, maximum, unit) {
        const facts = { format: ELF_POINTER_RELOCATION_FORMAT, detail: message };
        super(maximum !== undefined
            ? { ...facts, kind: "limit", limit: { name: reason, maximum } }
            : reason === "malformed-container"
                ? { ...facts, kind: "malformed" }
                : {
                    ...facts,
                    kind: "unsupported",
                    // A pointer the loader encodes in an unread form still ships.
                    undecodedContent: reason === "unsupported-pointer-encoding",
                });
        this.reason = reason;
        this.unit = unit;
        this.name = "ElfPointerRelocationFailure";
    }
}
// JNI sparse consumers retain per-write provenance; streaming materializers do not.
const MAX_RELOCATION_RECORDS = 65_536;
/** Conservative logical reservation for three Map entries, boxed coordinates and
 * values, and finish-time tuples/ranges/reach/sort storage including growth slack.
 * This is allocation accounting, not a measurement of a JavaScript VM's RSS. */
const ELF_POINTER_INDEX_ENTRY_BYTES = 2 * 1024;
const DT_RELA = 7n, DT_RELASZ = 8n, DT_RELAENT = 9n;
const DT_REL = 17n, DT_RELSZ = 18n, DT_RELENT = 19n;
const DT_PLTRELSZ = 2n, DT_PLTREL = 20n, DT_JMPREL = 23n;
const { address: DT_RELR, size: DT_RELRSZ, entry: DT_RELRENT, } = ELF_RELR_DYNAMIC_TAGS.standard;
const DT_SYMTAB = 6n, DT_SYMENT = 11n, DT_HASH = 4n, DT_GNU_HASH = 0x6ffffef5n;
// Android's pre-standard RELR uses the same address/bitmap encoding. Resolve
// its dynamic-tag aliases here so every consumer shares validation, duplicate
// detection and relocation provenance with standard RELR.
const RELR_TAG_ALIASES = new Map([
    [ELF_RELR_DYNAMIC_TAGS.android.address, DT_RELR],
    [ELF_RELR_DYNAMIC_TAGS.android.size, DT_RELRSZ],
    [ELF_RELR_DYNAMIC_TAGS.android.entry, DT_RELRENT],
]);
const RELR_TAGS = new Set([DT_RELR, DT_RELRSZ, DT_RELRENT]);
const UNIQUE_TAGS = new Set([
    DT_RELA,
    DT_RELASZ,
    DT_RELAENT,
    DT_REL,
    DT_RELSZ,
    DT_RELENT,
    ...RELR_TAGS,
    DT_JMPREL,
    DT_PLTRELSZ,
    DT_PLTREL,
    ...ELF_ANDROID_PACKED_RELOCATION_TAGS,
]);
// Ambiguous symbol declarations leave symbolic writes unknown without
// rejecting independently decoded relative relocations.
const SYMBOL_TABLE_TAGS = new Set([DT_SYMTAB, DT_SYMENT, DT_HASH, DT_GNU_HASH]);
const malformed = (message) => {
    throw new ElfPointerRelocationFailure("malformed-container", message);
};
/** Bound packed input and equivalent expanded REL/RELA work before iteration. */
const ANDROID_PACKED_TABLE_BYTES = 16 * 1024 * 1024;
/** LLVM/AOSP APS2 group grammar; yields records without retaining an expanded table. */
function* androidPackedRelocations(bytes, fileOffset, bits, encoding) {
    const exhausted = () => {
        throw new ElfPointerRelocationFailure("native-index-capacity", "Android packed relocation input or expanded table exceeds the 16 MiB decode-work allowance", ANDROID_PACKED_TABLE_BYTES, "bytes");
    };
    if (bytes.length > ANDROID_PACKED_TABLE_BYTES)
        exhausted();
    if (bytes.length < 4 || bytes.toString("latin1", 0, 4) !== "APS2")
        return malformed("Android packed relocation table lacks an APS2 header");
    let cursor = 4;
    const signed = () => {
        const parsed = readLeb128(bytes, cursor, bytes.length, SLEB64);
        if ("failure" in parsed)
            return malformed(`Android APS2 integer is ${parsed.failure} at file offset ${String(fileOffset + parsed.at)}`);
        cursor = parsed.next;
        return parsed.value;
    };
    const rawCount = signed();
    if (rawCount < 0n)
        return malformed("Android APS2 relocation count is negative");
    const expandedWidth = (bits / 8) * (encoding === "rela" ? 3 : 2);
    if (rawCount * BigInt(expandedWidth) > BigInt(ANDROID_PACKED_TABLE_BYTES))
        exhausted();
    const count = Number(rawCount);
    let offset = BigInt.asUintN(bits, signed()), addend = 0n, read = 0;
    while (read < count) {
        const groupOffset = fileOffset + cursor;
        const groupCount = signed(), flags = signed();
        if (groupCount <= 0n || groupCount > BigInt(count - read))
            return malformed("Android APS2 group count exceeds the remaining records or is empty");
        if (flags < 0n ||
            flags > 15n ||
            ((flags & 4n) !== 0n && (flags & 8n) === 0n) ||
            (encoding === "rel" && (flags & 12n) !== 0n))
            return malformed("Invalid Android APS2 group flags");
        const groupedInfo = (flags & 1n) !== 0n, groupedOffset = (flags & 2n) !== 0n, groupedAddend = (flags & 4n) !== 0n, hasAddend = (flags & 8n) !== 0n;
        const offsetDelta = groupedOffset ? signed() : 0n;
        const info = groupedInfo ? BigInt.asUintN(bits, signed()) : 0n;
        const addendDelta = groupedAddend ? signed() : 0n;
        const entriesInGroup = Number(groupCount);
        for (let index = 0; index < entriesInGroup; index++, read++) {
            if (read % 4096 === 0)
                yield;
            // The loader assigns these values to ELF-word fields, including signed deltas.
            offset = BigInt.asUintN(bits, offset + (groupedOffset ? offsetDelta : signed()));
            const entryInfo = groupedInfo ? info : BigInt.asUintN(bits, signed());
            if (hasAddend)
                addend = BigInt.asIntN(bits, addend + (groupedAddend ? addendDelta : signed()));
            else
                addend = 0n;
            const decoded = decodeElfRelocationInfo(entryInfo, bits);
            yield {
                offset,
                ...decoded,
                ...(encoding === "rela" ? { addend } : {}),
                source: {
                    encoding,
                    kind: decoded.type,
                    record_file_offset: groupOffset,
                    packing: { format: "aps2", group_entry_index: index },
                },
            };
        }
    }
    // LLD keeps zero padding when layout convergence would otherwise shrink a section.
    for (; cursor < bytes.length; cursor++) {
        if (cursor % 65536 === 0)
            yield;
        if (bytes[cursor] !== 0)
            return malformed("Nonzero bytes follow the Android APS2 records");
    }
}
const RELOCATION_KINDS = [
    {
        machine: 183,
        globalData: 1025,
        absolute: 257,
        bits: 64,
        relative: 1027,
        copy: 1024,
        widths: new Map([
            [257, 8],
            [258, 4],
            [259, 2],
            [260, 8],
            [261, 4],
            [262, 2],
            // Link-time kinds that patch one 32-bit instruction.
            [273, 4], // LD_PREL_LO19
            [274, 4], // ADR_PREL_LO21
            [275, 4], // ADR_PREL_PG_HI21
            [277, 4], // ADD_ABS_LO12_NC
            [278, 4], // LDST8_ABS_LO12_NC
            [282, 4], // JUMP26
            [283, 4], // CALL26
            [284, 4], // LDST16_ABS_LO12_NC
            [285, 4], // LDST32_ABS_LO12_NC
            [286, 4], // LDST64_ABS_LO12_NC
            [299, 4], // LDST128_ABS_LO12_NC
            [309, 4], // GOT_LD_PREL19
            [311, 4], // ADR_GOT_PAGE
            [312, 4], // LD64_GOT_LO12_NC
            [541, 4], // TLSIE_ADR_GOTTPREL_PAGE21
            [542, 4], // TLSIE_LD64_GOTTPREL_LO12_NC
            [543, 4], // TLSIE_LD_GOTTPREL_PREL19
            [549, 4], // TLSLE_ADD_TPREL_HI12
            [551, 4], // TLSLE_ADD_TPREL_LO12_NC
            [562, 4], // TLSDESC_ADR_PAGE21
            [563, 4], // TLSDESC_LD64_LO12
            [564, 4], // TLSDESC_ADD_LO12
            [1025, 8],
            [1026, 8],
            [1028, 8],
            [1029, 8],
            [1030, 8],
            [1031, 16],
            [1032, 8],
        ]),
    },
    {
        machine: 62,
        globalData: 6,
        absolute: 1,
        bits: 64,
        relative: 8,
        copy: 5,
        widths: new Map([
            [1, 8],
            [2, 4],
            [4, 4], // PLT32
            [6, 8],
            [7, 8],
            [9, 4], // GOTPCREL
            [10, 4],
            [11, 4],
            [16, 8],
            [17, 8],
            [18, 8],
            [19, 4], // TLSGD
            [20, 4], // TLSLD
            [21, 4], // DTPOFF32
            [22, 4], // GOTTPOFF
            [23, 4], // TPOFF32
            [24, 8],
            [25, 8], // GOTOFF64
            [27, 8], // GOT64
            [29, 8], // GOTPC64
            [34, 4], // GOTPC32_TLSDESC
            [36, 16],
            [37, 8],
            [41, 4], // GOTPCRELX
            [42, 4], // REX_GOTPCRELX
        ]),
    },
    {
        machine: 40,
        globalData: 21,
        absolute: 2,
        bits: 32,
        relative: 23,
        copy: 20,
        widths: new Map([
            [2, 4],
            [3, 4],
            [13, 8],
            [17, 4],
            [18, 4],
            [19, 4],
            [21, 4],
            [22, 4],
            [160, 4],
        ]),
    },
    {
        machine: 3,
        globalData: 6,
        absolute: 1,
        bits: 32,
        relative: 8,
        copy: 5,
        widths: new Map([
            [1, 4],
            [2, 4],
            [3, 4],
            [4, 4],
            [6, 4],
            [7, 4],
            [9, 4],
            [10, 4],
            [11, 4],
            [14, 4],
            [15, 4],
            [16, 4],
            [17, 4],
            [18, 4],
            [19, 4],
            [20, 2],
            [21, 2],
            [22, 1],
            [23, 1],
            [35, 4],
            [36, 4],
            [37, 4],
            [38, 4],
            [41, 8],
            [42, 4],
            [43, 4],
        ]),
    },
    ...[32, 64].map((bits) => ({
        machine: 243, // EM_RISCV: its pointer relocation kinds depend on ELF class.
        bits,
        absolute: bits === 64 ? 2 : 1,
        relative: 3,
        copy: 4,
        // RISC-V has no GLOB_DAT. In particular, type 6 is TLS_DTPMOD32.
        globalData: null,
        widths: new Map([
            [1, 4], // R_RISCV_32
            [2, 8], // R_RISCV_64
            [5, bits / 8], // JUMP_SLOT
            [6, 4],
            [7, 8], // TLS_DTPMOD32/64
            [8, 4],
            [9, 8], // TLS_DTPREL32/64
            [10, 4],
            [11, 8], // TLS_TPREL32/64
            [12, bits / 4], // TLSDESC: two pointer words
            [18, 8],
            [19, 8], // CALL/CALL_PLT: two instructions
            [57, 4], // 32_PCREL
            [58, bits / 8], // IRELATIVE: resolver result is unknown
        ]),
    })),
];
const relocationKinds = (machine, bits) => RELOCATION_KINDS.find((kinds) => kinds.machine === machine && kinds.bits === bits);
/** R_*_RELATIVE type for a supported ELF machine, or undefined when unsupported. */
export const elfRelativeRelocationType = (machine, bits) => relocationKinds(machine, bits)?.relative;
/** Word-sized absolute (S + A) relocation type for a supported ELF machine. */
export const elfAbsoluteRelocationType = (machine, bits) => relocationKinds(machine, bits)?.absolute;
/** COPY relocation type, whose write is as wide as its symbol's `st_size`. */
export const elfCopyRelocationType = (machine, bits) => relocationKinds(machine, bits)?.copy;
/** Bytes written by a relocation; type zero is a no-op and unknown types remain undefined. */
export const elfRelocationWidth = (machine, type, bits) => type === 0 ? 0 : relocationKinds(machine, bits)?.widths.get(type);
function* dynamicTags(bytes, input) {
    yield;
    if (input.dynamicSegments.length > 1)
        malformed("multiple PT_DYNAMIC segments");
    const declaration = input.dynamicSegments[0];
    if (declaration === undefined)
        return { values: new Map(), ambiguous: new Set() };
    const table = admitElfDynamicDirectory(bytes.length, declaration, input.bits);
    if (!table.ok) {
        if (table.error.kind === "malformed")
            return malformed(table.error.message);
        throw new ElfPointerRelocationFailure("native-index-capacity", table.error.message, table.error.maximum, "bytes");
    }
    const { offset: start, size, width } = table.value;
    const tags = new Map();
    const redeclared = new Set();
    let relrFamily;
    const end = start + size;
    for (let at = start; at < end; at += width) {
        if ((at - start) % 65_536 === 0)
            yield;
        const parsed = readElfDynamicEntry(bytes.subarray(at, at + width), input.bits, input.little);
        if (!parsed.ok)
            return malformed(parsed.error.message);
        const { value } = parsed.value;
        const tag = RELR_TAG_ALIASES.get(parsed.value.tag) ?? parsed.value.tag;
        if (RELR_TAGS.has(tag)) {
            const family = tag === parsed.value.tag ? "standard" : "android";
            if (relrFamily !== undefined && relrFamily !== family)
                malformed("mixed standard and Android RELR dynamic tags");
            relrFamily = family;
        }
        if (tag === 0n) {
            for (const symbolTag of redeclared)
                tags.delete(symbolTag);
            return { values: tags, ambiguous: redeclared };
        }
        if (SYMBOL_TABLE_TAGS.has(tag)) {
            if (tags.has(tag))
                redeclared.add(tag);
            else
                tags.set(tag, value);
            continue;
        }
        if (UNIQUE_TAGS.has(tag) && tags.has(tag))
            malformed(`duplicate dynamic tag ${tag}`);
        if (UNIQUE_TAGS.has(tag))
            tags.set(tag, value);
    }
    return malformed("PT_DYNAMIC has no DT_NULL terminator");
}
/** Decode once from immutable bytes; consumers choose streaming or sparse retention. */
export function* readElfRelocationWritesSteps(bytes, input, options = {}) {
    const kinds = relocationKinds(input.machine, input.bits);
    if (kinds === undefined)
        throw new ElfPointerRelocationFailure("unsupported-container", "ELF relative pointers require a matching AArch64, x86-64, ARM, i386 or RISC-V image");
    const relative = kinds.relative;
    const absolute = kinds.absolute;
    const globalData = kinds.globalData;
    const wholeExtents = options.wholeExtents === true;
    const copy = wholeExtents ? kinds.copy : undefined;
    const unknownWidths = kinds.widths;
    if (options.requireDynamic === true && input.dynamicSegments.length === 0)
        throw new ElfPointerRelocationFailure("unsupported-container", "ELF image has no PT_DYNAMIC segment");
    const { values: tags, ambiguous: ambiguousTags } = yield* dynamicTags(bytes, input);
    const word = input.bits === 64 ? 8 : 4;
    const reader = new BinaryReader(bytes, input.little, "elf");
    const index = createFileMappingIndex(input.mappings, input.zeroFills);
    const fileOffset = (address, width) => {
        try {
            return index.offset(address, width);
        }
        catch (cause) {
            if (cause instanceof BinaryMappingFailure && cause.reason === "unmapped")
                return null;
            throw cause;
        }
    };
    const rawWord = (offset) => reader.word(offset, input.bits);
    const target = (address, width) => {
        const at = fileOffset(address, width);
        if (at === null &&
            !isZeroFilledSpan(input.mappings, input.zeroFills, address, width))
            malformed("RELATIVE relocation target is outside unambiguous loaded memory");
        return at;
    };
    const issues = new Set();
    let known = true;
    const unsupported = (message) => {
        if (options.unsupported !== "record")
            throw new ElfPointerRelocationFailure("unsupported-pointer-encoding", message);
        if (issues.size < 16)
            issues.add(message);
        else
            issues.add("Additional unsupported relocation encodings were not individually listed");
        known = false;
    };
    const write = (address, width, value, record) => ({
        address,
        width,
        value,
        file_offset: value === null ? fileOffset(address, width) : target(address, width),
        ...record,
    });
    const symbolBytes = elfSymbolSize(input.bits);
    const symbolTable = tags.get(DT_SYMENT) === BigInt(symbolBytes)
        ? tags.get(DT_SYMTAB)
        : undefined;
    const dynamicSymbol = (symbolIndex) => {
        if (symbolTable === undefined || symbolIndex === 0)
            return undefined;
        let at;
        try {
            at = index.offset(symbolTable + BigInt(symbolIndex) * BigInt(symbolBytes), symbolBytes);
        }
        catch (cause) {
            if (cause instanceof BinaryMappingFailure)
                return undefined;
            throw cause;
        }
        const parsed = readElfSymbol(bytes.subarray(at, at + symbolBytes), input.bits, input.little);
        return parsed.ok ? parsed.value : undefined;
    };
    const hashWords = (address) => (offset) => {
        try {
            // Hash walks skip bloom/bucket words; their whole prefix must be mapped.
            const at = index.offset(address, offset + 4) + offset;
            return ok(reader.u32(at));
        }
        catch (cause) {
            if (cause instanceof BinaryMappingFailure)
                return err(cause.message);
            throw cause;
        }
    };
    function* countSymbols() {
        if (ambiguousTags.has(DT_HASH) || ambiguousTags.has(DT_GNU_HASH))
            return undefined;
        const maximum = Math.floor(bytes.length / 4);
        let count;
        const classic = tags.get(DT_HASH);
        if (classic !== undefined) {
            const parsed = readElfHashSymbolCount(hashWords(classic), maximum);
            if (!parsed.ok)
                return undefined;
            count = parsed.value;
        }
        const gnu = tags.get(DT_GNU_HASH);
        if (gnu !== undefined) {
            const steps = readElfGnuHashSymbolCount(hashWords(gnu), word, maximum);
            let next = steps.next();
            while (!next.done) {
                yield;
                next = steps.next();
            }
            if (!next.value.ok)
                return undefined;
            const value = next.value.value;
            if (value !== null) {
                if (count !== undefined && count !== value)
                    return undefined;
                count = value;
            }
        }
        // Mapping a complete declared table bounds every later indexed read.
        if (symbolTable === undefined || count === undefined || count === 0)
            return undefined;
        try {
            index.offset(symbolTable, count * symbolBytes);
        }
        catch (cause) {
            if (cause instanceof BinaryMappingFailure)
                return undefined;
            throw cause;
        }
        return count;
    }
    let symbolCountRead = false;
    let symbolCount;
    function* symbolLinkValue(symbolIndex) {
        if (symbolIndex === 0)
            return 0n;
        if (!symbolCountRead) {
            symbolCountRead = true;
            symbolCount = yield* countSymbols();
        }
        if (symbolCount === undefined || symbolIndex >= symbolCount)
            return undefined;
        const symbol = dynamicSymbol(symbolIndex);
        if (symbol === undefined)
            return undefined;
        const { section_index, type, value } = symbol;
        // Undefined/reserved sections, TLS offsets and IFUNC resolvers do not
        // supply an ordinary link-image address for this file.
        return section_index !== 0 &&
            section_index < 0xff00 &&
            (type === 0 || type === 1 || type === 2)
            ? value
            : undefined;
    }
    /**
     * Bytes a COPY relocation can write: the loader copies at most the size this
     * image's own dynamic symbol records. Undefined when that size is unreadable
     * or the span leaves the address space.
     */
    const copyWidth = (destination, symbolIndex) => {
        const symbol = dynamicSymbol(symbolIndex);
        if (symbol === undefined)
            return undefined;
        const { size } = symbol;
        return size <= BigInt(Number.MAX_SAFE_INTEGER) &&
            destination + size <= 1n << BigInt(input.bits)
            ? Number(size)
            : undefined;
    };
    // Consumers do work across each COPY span, which repeated or overlapping
    // records would multiply, so the spans together are limited to the file size.
    let copyAllowance = bytes.length;
    /** One owner applies fixed and packed REL/RELA records to loader pointer facts. */
    function* applyRelocation(parsed, source) {
        const { type: kind, offset: destination, symbolIndex } = parsed;
        if (elfRelocationWidth(input.machine, kind, input.bits) === 0)
            return;
        const explicitAddend = parsed.addend;
        if (source.encoding === "rela" && explicitAddend === undefined)
            return malformed("RELA relocation has no decoded addend");
        const record = {
            source,
            symbol_index: symbolIndex,
            addend: explicitAddend ?? null,
        };
        if (kind === copy) {
            const width = copyWidth(destination, symbolIndex);
            if (width === undefined)
                unsupported("ELF COPY relocation write size is not established");
            else if (width > copyAllowance)
                unsupported("ELF COPY relocation sizes exceed the file byte count allowance");
            else if (width > 0) {
                copyAllowance -= width;
                yield write(destination, width, null, record);
            }
            return;
        }
        if (kind !== relative || symbolIndex !== 0) {
            if (options.symbolResolution === "image-definitions" &&
                (input.bits === 64 || input.machine === 243) &&
                (kind === absolute || kind === globalData)) {
                const value = yield* symbolLinkValue(symbolIndex);
                if (value !== undefined) {
                    // AArch64 ABS64/GLOB_DAT and x86-64 R_X86_64_64 use S + A.
                    // R_X86_64_GLOB_DAT uses S, ignoring even a nonzero addend.
                    const slot = explicitAddend === undefined ? target(destination, word) : null;
                    const addend = input.machine === 62 && kind === globalData
                        ? 0n
                        : (explicitAddend ?? (slot === null ? 0n : rawWord(slot)));
                    yield write(destination, word, BigInt.asUintN(input.bits, value + addend), record);
                    return;
                }
            }
            const width = unknownWidths.get(kind);
            if (width === undefined || (width > word && !wholeExtents)) {
                unsupported(`ELF relocation kind ${kind} is not decoded`);
                return;
            }
            yield write(destination, width, null, record);
            return;
        }
        const slot = target(destination, word);
        const addend = explicitAddend ?? (slot === null ? 0n : rawWord(slot));
        yield write(destination, word, BigInt.asUintN(input.bits, addend), record);
    }
    function* standardTable(address, size, entry, encoding) {
        const width = word * (encoding === "rela" ? 3 : 2);
        if (size === undefined ||
            size < 0n ||
            entry !== BigInt(width) ||
            size % entry !== 0n ||
            size > BigInt(bytes.length))
            return malformed(`invalid DT_${encoding.toUpperCase()}SZ or DT_${encoding.toUpperCase()}ENT`);
        if (size === 0n)
            return;
        const start = fileOffset(address, Number(size));
        if (start === null)
            return malformed(`${encoding.toUpperCase()} table is not file-backed`);
        for (let at = start; at < start + Number(size); at += width) {
            if ((at - start) % (width * 4096) === 0)
                yield;
            const parsed = encoding === "rela"
                ? readElfRelocationEntry(bytes.subarray(at, at + width), input.bits, input.little, "rela")
                : readElfRelocationEntry(bytes.subarray(at, at + width), input.bits, input.little, "rel");
            if (!parsed.ok)
                return malformed(parsed.error.message);
            yield* applyRelocation(parsed.value, {
                encoding,
                record_file_offset: at,
                kind: parsed.value.type,
            });
        }
    }
    for (const [addressTag, sizeTag, entryTag, encoding] of [
        [DT_RELA, DT_RELASZ, DT_RELAENT, "rela"],
        [DT_REL, DT_RELSZ, DT_RELENT, "rel"],
    ]) {
        const address = tags.get(addressTag);
        if (address !== undefined)
            yield* standardTable(address, tags.get(sizeTag), tags.get(entryTag) ?? BigInt(word * (encoding === "rela" ? 3 : 2)), encoding);
        else if ((tags.get(sizeTag) ?? 0n) !== 0n)
            malformed(`DT_${encoding.toUpperCase()}SZ has no DT_${encoding.toUpperCase()}`);
    }
    for (const [addressTag, sizeTag, encoding,] of ELF_ANDROID_PACKED_RELOCATION_TABLES) {
        const address = tags.get(addressTag), size = tags.get(sizeTag);
        if (address === undefined) {
            if (size !== undefined && size !== 0n)
                malformed("Android packed relocation size has no table address");
            continue;
        }
        if (size === undefined || size > BigInt(bytes.length))
            return malformed("Android packed relocation table has no valid byte size");
        if (size === 0n)
            continue;
        const start = fileOffset(address, Number(size));
        if (start === null)
            return malformed("Android packed relocation table is not file-backed");
        const packed = bytes.subarray(start, start + Number(size));
        if (packed.toString("latin1", 0, 4) === "APS1") {
            unsupported("Android packed APS1 relocations are not decoded");
            continue;
        }
        for (const entry of androidPackedRelocations(packed, start, input.bits, encoding)) {
            if (entry === undefined)
                yield;
            else
                yield* applyRelocation(entry, entry.source);
        }
    }
    const plt = tags.get(DT_JMPREL);
    if (plt !== undefined) {
        const encoding = tags.get(DT_PLTREL) === DT_RELA
            ? "rela"
            : tags.get(DT_PLTREL) === DT_REL
                ? "rel"
                : undefined;
        if (encoding === undefined)
            unsupported("PLT relocations require a declared REL or RELA encoding");
        else
            yield* standardTable(plt, tags.get(DT_PLTRELSZ), BigInt(word * (encoding === "rela" ? 3 : 2)), encoding);
    }
    else if ((tags.get(DT_PLTRELSZ) ?? 0n) !== 0n)
        malformed("DT_PLTRELSZ has no DT_JMPREL");
    const relr = tags.get(DT_RELR), relrSize = tags.get(DT_RELRSZ);
    if (relr === undefined) {
        if ((relrSize ?? 0n) !== 0n)
            malformed("DT_RELRSZ has no DT_RELR");
    }
    else {
        if (relrSize === undefined ||
            relrSize % BigInt(word) !== 0n ||
            relrSize > BigInt(bytes.length) ||
            (tags.get(DT_RELRENT) ?? BigInt(word)) !== BigInt(word))
            return malformed("invalid DT_RELRSZ or DT_RELRENT");
        const start = relrSize === 0n ? 0 : fileOffset(relr, Number(relrSize));
        if (start === null)
            return malformed("RELR table is not file-backed");
        let next;
        for (let at = start; at < start + Number(relrSize); at += word) {
            if ((at - start) % (word * 4096) === 0)
                yield;
            const entry = rawWord(at);
            const add = (address) => {
                if (address > (1n << BigInt(input.bits)) - BigInt(word))
                    malformed("RELR destination overflows the ELF address space");
                const slot = target(address, word);
                return write(address, word, slot === null ? 0n : rawWord(slot), {
                    source: { encoding: "relr", record_file_offset: at, kind: null },
                    symbol_index: null,
                    addend: null,
                });
            };
            if ((entry & 1n) === 0n) {
                yield add(entry);
                next = entry + BigInt(word);
            }
            else {
                if (next === undefined)
                    return malformed("RELR bitmap has no preceding address");
                for (let bit = 1; bit < input.bits; bit++)
                    if ((entry & (1n << BigInt(bit))) !== 0n)
                        yield add(next + BigInt((bit - 1) * word));
                next += BigInt((input.bits - 1) * word);
                if (next > 1n << BigInt(input.bits))
                    malformed("RELR bitmap overflows the ELF address space");
            }
        }
    }
    return {
        issues: [...issues],
        dynamic_present: input.dynamicSegments.length !== 0,
        pointer_coverage_known: known,
        originalValueAt: (address, width) => {
            const at = fileOffset(address, width);
            return at === null
                ? undefined
                : {
                    value: reader.word(at, width === 4 ? 32 : input.bits),
                    file_offset: at,
                    relocation: null,
                };
        },
    };
}
/** Both sparse consumers use virtual coordinates; physical aliases never merge writes. */
class ElfVirtualWriteIndex {
    word;
    little;
    maximumBytes;
    #values = new Map();
    #widths = new Map();
    #unresolved = new Map();
    #reservedBytes = 0;
    constructor(word, little, maximumBytes) {
        this.word = word;
        this.little = little;
        this.maximumBytes = maximumBytes;
    }
    add({ address, width, value, }) {
        if (!this.#widths.has(address)) {
            // Reserve retained containers and finish-time lookup expansion before
            // the first insertion. Repeated declarations of one VA share its charge.
            if (ELF_POINTER_INDEX_ENTRY_BYTES >
                this.maximumBytes - this.#reservedBytes)
                throw new ElfPointerRelocationFailure("native-index-capacity", `ELF virtual pointer index exceeds ${this.maximumBytes} estimated representation bytes (${ELF_POINTER_INDEX_ENTRY_BYTES} reserved per virtual address, including lookup workspace)`, this.maximumBytes, "bytes");
            this.#reservedBytes += ELF_POINTER_INDEX_ENTRY_BYTES;
        }
        this.#widths.set(address, Math.max(this.#widths.get(address) ?? 0, width));
        if (value === null ||
            (this.#values.has(address) && this.#values.get(address) !== value))
            this.#unresolved.set(address, Math.max(this.#unresolved.get(address) ?? 0, width));
        if (value !== null)
            this.#values.set(address, value);
    }
    get unresolvedSize() {
        return this.#unresolved.size;
    }
    finish() {
        const ranges = [...this.#widths]
            .map(([address, width]) => ({ address, end: address + BigInt(width) }))
            .sort((a, b) => a.address < b.address ? -1 : a.address > b.address ? 1 : 0);
        const reach = [];
        for (const range of ranges)
            reach.push(range.end > (reach.at(-1) ?? 0n) ? range.end : (reach.at(-1) ?? 0n));
        let previousEnd;
        let previousBefore = 0;
        const before = (end) => {
            // Sequential field scans reuse the immutable interval cursor. Large or
            // backward jumps keep binary lookup, so random queries cannot rescan it.
            if (previousEnd !== undefined &&
                end >= previousEnd &&
                end - previousEnd <= 16n) {
                while (previousBefore < ranges.length &&
                    ranges[previousBefore].address < end)
                    previousBefore++;
                previousEnd = end;
                return previousBefore;
            }
            let low = 0, high = ranges.length;
            while (low < high) {
                const mid = (low + high) >>> 1;
                if (ranges[mid].address < end)
                    low = mid + 1;
                else
                    high = mid;
            }
            previousEnd = end;
            previousBefore = low;
            return low;
        };
        const unsignedAt = (address, width, original) => {
            if (width > this.word)
                return undefined;
            const end = address + BigInt(width);
            const complete = (1n << BigInt(width * 8)) - 1n;
            let covered = original === undefined ? 0n : complete;
            let assigned = 0n;
            let result = original ?? 0n;
            let owner;
            for (let at = before(end) - 1; at >= 0 && (reach[at] ?? 0n) > address; at--) {
                const range = ranges[at];
                if (range.end <= address)
                    continue;
                const unknownWidth = this.#unresolved.get(range.address);
                if (unknownWidth !== undefined &&
                    range.address + BigInt(unknownWidth) > address)
                    return undefined;
                const value = this.#values.get(range.address);
                if (value === undefined ||
                    range.end - range.address !== BigInt(this.word) ||
                    (width === this.word &&
                        (range.address !== address || range.end !== end)))
                    return undefined;
                owner = range.address;
                if (width === this.word) {
                    if (assigned !== 0n)
                        return undefined;
                    result = value;
                    assigned = complete;
                    covered = complete;
                    continue;
                }
                const start = range.address > address ? range.address : address;
                const stop = range.end < end ? range.end : end;
                for (let byte = start; byte < stop; byte++) {
                    const sourceShift = this.little
                        ? byte - range.address
                        : range.end - byte - 1n;
                    const targetShift = this.little ? byte - address : end - byte - 1n;
                    const mask = 0xffn << (targetShift * 8n);
                    if ((assigned & mask) !== 0n)
                        return undefined;
                    result =
                        (result & ~mask) |
                            (((value >> (sourceShift * 8n)) & 0xffn) << (targetShift * 8n));
                    assigned |= mask;
                    covered |= mask;
                }
            }
            return owner !== undefined && covered === complete ? result : undefined;
        };
        return {
            unsignedAt,
            unresolved: this.#unresolved,
            hasWrites: (address, size) => {
                const low = before(address + BigInt(size));
                return low > 0 && (reach[low - 1] ?? 0n) > address;
            },
        };
    }
}
/** Retain provenance-bearing facts for bounded metadata queries. */
export function* readElfPointerRelocationsSteps(bytes, input, options = {}) {
    const writes = [];
    const values = new Map();
    const index = new ElfVirtualWriteIndex(input.bits === 64 ? 8 : 4, input.little, MAX_RELOCATION_RECORDS * ELF_POINTER_INDEX_ENTRY_BYTES);
    const steps = readElfRelocationWritesSteps(bytes, input, options);
    let next = steps.next();
    while (!next.done) {
        const write = next.value;
        if (write === undefined)
            yield;
        else {
            if (writes.length >= MAX_RELOCATION_RECORDS)
                throw new ElfPointerRelocationFailure("native-index-capacity", `ELF sparse relocation index exceeds ${MAX_RELOCATION_RECORDS} retained writes`, MAX_RELOCATION_RECORDS, "entries");
            writes.push(write);
            index.add(write);
            if (write.value !== null)
                values.set(write.address, write);
        }
        next = steps.next();
    }
    const facts = index.finish();
    const { issues, dynamic_present, pointer_coverage_known, originalValueAt } = next.value;
    const unsignedAt = (address, width) => {
        if (!pointer_coverage_known || width > input.bits / 8)
            return undefined;
        if (!facts.hasWrites(address, width))
            return originalValueAt(address, width);
        const resolved = facts.unsignedAt(address, width);
        if (resolved === undefined)
            return undefined;
        const source = values.get(address);
        return {
            value: resolved,
            file_offset: source.file_offset,
            relocation: source.source,
        };
    };
    return {
        writes,
        unresolved: facts.unresolved,
        issues,
        dynamic_present,
        pointer_coverage_known,
        pointerAt: (address) => unsignedAt(address, input.bits === 64 ? 8 : 4),
        hasWrites: facts.hasWrites,
    };
}
/** Value-only consumers keep input-bounded file-backed writes without per-record
 * provenance, with a separate allowance for unresolved and zero-fill state.
 */
export function* readElfPointerValuesSteps(bytes, input, maximumIndexBytes, options = {}) {
    const index = new ElfVirtualWriteIndex(input.bits === 64 ? 8 : 4, input.little, maximumIndexBytes);
    const zeroFill = new Set();
    const steps = readElfRelocationWritesSteps(bytes, input, {
        requireDynamic: true,
        ...options,
    });
    let next = steps.next();
    while (!next.done) {
        const write = next.value;
        if (write === undefined)
            yield;
        else {
            index.add(write);
            if (write.value !== null && write.file_offset === null)
                zeroFill.add(write.address);
            if (index.unresolvedSize + zeroFill.size > MAX_RELOCATION_RECORDS)
                throw new ElfPointerRelocationFailure("native-index-capacity", `ELF unresolved and zero-fill overlay exceeds ${MAX_RELOCATION_RECORDS} entries`, MAX_RELOCATION_RECORDS, "entries");
        }
        next = steps.next();
    }
    const facts = index.finish();
    const { originalValueAt } = next.value;
    return {
        hasWrites: facts.hasWrites,
        unsignedAt: (address, width) => {
            if (!facts.hasWrites(address, width))
                return undefined;
            return facts.unsignedAt(address, width, width === 4 && input.bits === 64
                ? originalValueAt(address, width)?.value
                : undefined);
        },
    };
}
