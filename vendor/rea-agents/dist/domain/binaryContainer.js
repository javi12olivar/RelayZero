import { resolveMappedFileOffset, } from "./virtualFileMapping.js";
import { decodeLimit, ParseFailureError } from "./parseFailure.js";
/** Distinguish corrupt recognized binaries from containers outside parser coverage. */
export class BinaryFormatFailure extends ParseFailureError {
    constructor(kind, message, facts = {}) {
        const { undecodedContent = false, format = "native-binary", ...at } = facts;
        super(kind === "unsupported"
            ? { kind, format, detail: message, undecodedContent, ...at }
            : { kind, format, detail: message, ...at });
        this.name = "BinaryFormatFailure";
    }
    /** The image holds the metadata, in a form this reader cannot decode. */
    get undecodedContent() {
        return this.failure.kind === "unsupported" && this.failure.undecodedContent;
    }
}
/** A missing file span is a candidate miss; conflicting owners are malformed. */
export class BinaryMappingFailure extends BinaryFormatFailure {
    reason;
    constructor(reason, message) {
        super("malformed", message);
        this.reason = reason;
    }
}
/**
 * Resource boundary exceeded while decoding metadata or native container
 * structure. `allowance` names the exhausted allowance in the failure's
 * `LimitRef`; it defaults to the boundary when a decoder has only one.
 */
export class BinaryResourceFailure extends ParseFailureError {
    boundary;
    maximum_bytes;
    unit;
    /**
     * @param maximum_bytes The exceeded maximum, in `unit`. Despite its name,
     *   some producers count entries or values; `unit` says which, and is
     *   undefined when the producer has not named it.
     */
    constructor(boundary, maximum_bytes, message, allowance = boundary, unit) {
        super({
            kind: "limit",
            format: "native-binary",
            detail: message,
            limit: { name: allowance, maximum: maximum_bytes },
        });
        this.boundary = boundary;
        this.maximum_bytes = maximum_bytes;
        this.unit = unit;
        this.name = "BinaryResourceFailure";
    }
}
/** The exceeded maximum as fixed-ceiling facts; the unit only when its producer named it. */
export const binaryResourceCeiling = (failure) => ({
    limit: failure.maximum_bytes,
    ...(failure.unit === undefined ? {} : { unit: failure.unit }),
});
/** The failure's allowance when it is one of `allowances`, else `null`. */
export const binaryResourceAllowance = (failure, allowances) => allowances.find((allowance) => allowance === failure.failure.limit.name) ??
    null;
/** Limit name of the fixed per-string NUL-termination read allowance. */
const STRING_READ_LIMIT = "string-read-bytes";
/** A bounded read could not establish termination within `maximumBytes`. */
export const binaryStringReadLimit = (maximumBytes) => decodeLimit("native-binary", `String termination was not established within its ${String(maximumBytes)}-byte read allowance`, { name: STRING_READ_LIMIT, maximum: maximumBytes });
/** Whether a cause is a string read that stopped at its allowance. */
export const isBinaryStringReadLimit = (cause) => cause instanceof ParseFailureError &&
    cause.failure.kind === "limit" &&
    cause.failure.limit.name === STRING_READ_LIMIT;
/** Recognized format failures and bounded string-read failures. */
export const isBinaryFormatOrStringLimitFailure = (cause) => cause instanceof BinaryFormatFailure || isBinaryStringReadLimit(cause);
/** All declared file-backed image memory, including PE headers at the image base. */
export const imageFileMappings = (container) => container.pe_header_mapping === undefined
    ? container.mappings
    : [container.pe_header_mapping, ...container.mappings];
/** Reader that checks every structural range before decoding numeric fields. */
export class BinaryReader {
    bytes;
    little;
    format;
    constructor(bytes, little, 
    /** The native format these bytes hold, named in every failure. */
    format) {
        this.bytes = bytes;
        this.little = little;
        this.format = format;
    }
    #checkRange(offset, size, label) {
        if (!Number.isSafeInteger(offset) ||
            !Number.isSafeInteger(size) ||
            offset < 0 ||
            size < 0 ||
            offset > this.bytes.length)
            throw new BinaryFormatFailure("malformed", `${label} range is truncated or outside the file`, {
                format: this.format,
                field: label,
                ...(Number.isSafeInteger(offset) ? { offset } : {}),
            });
        if (size > this.bytes.length - offset)
            throw new BinaryFormatFailure("truncated", `${label} range is truncated or outside the file`, { format: this.format, offset, field: label });
    }
    range(offset, size, label) {
        this.#checkRange(offset, size, label);
        return this.bytes.subarray(offset, offset + size);
    }
    u8(offset) {
        this.#checkRange(offset, 1, "8-bit field");
        return this.bytes.readUInt8(offset);
    }
    i8(offset) {
        this.#checkRange(offset, 1, "8-bit field");
        return this.bytes.readInt8(offset);
    }
    u16(offset) {
        this.#checkRange(offset, 2, "16-bit field");
        return this.little
            ? this.bytes.readUInt16LE(offset)
            : this.bytes.readUInt16BE(offset);
    }
    i16(offset) {
        this.#checkRange(offset, 2, "16-bit field");
        return this.little
            ? this.bytes.readInt16LE(offset)
            : this.bytes.readInt16BE(offset);
    }
    u32(offset) {
        this.#checkRange(offset, 4, "32-bit field");
        return this.little
            ? this.bytes.readUInt32LE(offset)
            : this.bytes.readUInt32BE(offset);
    }
    i32(offset) {
        this.#checkRange(offset, 4, "32-bit field");
        return this.little
            ? this.bytes.readInt32LE(offset)
            : this.bytes.readInt32BE(offset);
    }
    i64(offset) {
        this.#checkRange(offset, 8, "64-bit field");
        return this.little
            ? this.bytes.readBigInt64LE(offset)
            : this.bytes.readBigInt64BE(offset);
    }
    f32(offset) {
        this.#checkRange(offset, 4, "32-bit field");
        return this.little
            ? this.bytes.readFloatLE(offset)
            : this.bytes.readFloatBE(offset);
    }
    f64(offset) {
        this.#checkRange(offset, 8, "64-bit field");
        return this.little
            ? this.bytes.readDoubleLE(offset)
            : this.bytes.readDoubleBE(offset);
    }
    word(offset, bits) {
        if (bits === 32)
            return BigInt(this.u32(offset));
        this.#checkRange(offset, 8, "64-bit field");
        return this.little
            ? this.bytes.readBigUInt64LE(offset)
            : this.bytes.readBigUInt64BE(offset);
    }
    fileRange(offset, size, label) {
        const length = BigInt(this.bytes.length);
        if (offset < 0n || offset > length)
            throw new BinaryFormatFailure("malformed", `${label} range is outside the file`, {
                format: this.format,
                field: label,
                ...(offset >= BigInt(Number.MIN_SAFE_INTEGER) &&
                    offset <= BigInt(Number.MAX_SAFE_INTEGER)
                    ? { offset: Number(offset) }
                    : {}),
            });
        if (size > length - offset)
            throw new BinaryFormatFailure("truncated", `${label} range is outside the file`, { format: this.format, offset: Number(offset), field: label });
        const result = { address: 0n, offset: Number(offset), size: Number(size) };
        this.range(result.offset, result.size, label);
        return result;
    }
    table(offset, count, width, label) {
        const size = BigInt(count) * BigInt(width);
        const range = this.fileRange(offset, size, label);
        if (size > 16n * 1024n * 1024n)
            throw new BinaryResourceFailure("structure", 16 * 1024 * 1024, `${label} exceeds the 16 MiB structural decoding budget`, "structure", "bytes");
        return range.offset;
    }
}
/** Admit a declared file span, or mark it unbacked when it leaves the file. */
export const declaredFileRange = (fileBytes, offset, size) => {
    if (offset < 0n ||
        size < 0n ||
        offset > BigInt(Number.MAX_SAFE_INTEGER) ||
        size > BigInt(Number.MAX_SAFE_INTEGER) ||
        offset > BigInt(fileBytes) ||
        size > BigInt(fileBytes) - offset)
        return { offset: 0, size: 0, file_backed: false };
    return {
        offset: Number(offset),
        size: Number(size),
        file_backed: size > 0n,
    };
};
/** Translate the domain mapping result into native parser failure classes. */
export const mappedFileOffset = (mappings, address, size, zeroFills = []) => {
    const mapped = resolveMappedFileOffset(mappings, address, size, zeroFills);
    if (mapped.ok)
        return mapped.value;
    const { reason, message } = mapped.error;
    if (reason === "invalid-size")
        throw new BinaryFormatFailure("malformed", message);
    throw new BinaryMappingFailure(reason, message);
};
/** Index of the last sorted value at or below `value`, or -1. */
const lastAtOrBelow = (sorted, value) => {
    let low = 0;
    let high = sorted.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (sorted[middle] <= value)
            low = middle + 1;
        else
            high = middle;
    }
    return low - 1;
};
/** Sorted starts with the furthest end reached by any span starting at or before each. */
const prefixReach = (spans) => {
    const sorted = [...spans].sort((left, right) => left.start < right.start ? -1 : left.start > right.start ? 1 : 0);
    const starts = [];
    const reach = [];
    let furthest = -1n;
    for (const span of sorted) {
        if (span.end > furthest)
            furthest = span.end;
        starts.push(span.start);
        reach.push(furthest);
    }
    return { starts, reach };
};
/**
 * Indexed `mappedFileOffset` for parsers that translate many spans in one
 * image. Construction is O(n log n) over mappings; each lookup is O(log n), so
 * hostile section counts cannot multiply the cost of every table entry. It
 * accepts, rejects and translates exactly the spans `mappedFileOffset` does;
 * a span that is both a conflicting file alias and a zero-fill overlap may be
 * refused under either ambiguity message.
 */
export const createFileMappingIndex = (mappings, zeroFills = []) => {
    const backed = mappings
        .filter((mapping) => mapping.size > 0)
        .map((mapping) => ({
        start: mapping.address,
        end: mapping.address + BigInt(mapping.size),
        translation: BigInt(mapping.offset) - mapping.address,
    }));
    const zeroFilled = prefixReach(zeroFills
        .filter((zeroFill) => zeroFill.size > 0n)
        .map((zeroFill) => ({
        start: zeroFill.address,
        end: zeroFill.address + zeroFill.size,
    })));
    // Elementary intervals between every mapping boundary, each with the single
    // file translation shared by all mappings covering it (or none/ambiguous).
    const events = new Map();
    const event = (at) => {
        let entry = events.get(at);
        if (entry === undefined) {
            entry = { add: [], remove: [] };
            events.set(at, entry);
        }
        return entry;
    };
    for (const span of backed) {
        event(span.start).add.push(span.translation);
        event(span.end).remove.push(span.translation);
    }
    const boundaries = [...events.keys()].sort((left, right) => left < right ? -1 : left > right ? 1 : 0);
    const active = new Map();
    // Undefined is a gap; null is an overlap with conflicting translations.
    const translations = [];
    for (const boundary of boundaries) {
        const entry = events.get(boundary);
        for (const translation of entry?.remove ?? []) {
            const count = (active.get(translation) ?? 0) - 1;
            if (count === 0)
                active.delete(translation);
            else
                active.set(translation, count);
        }
        for (const translation of entry?.add ?? [])
            active.set(translation, (active.get(translation) ?? 0) + 1);
        translations.push(active.size === 0
            ? undefined
            : active.size === 1
                ? active.keys().next().value
                : null);
    }
    // runEnd[i]: end of the maximal run of intervals sharing interval i's translation.
    const runEnd = boundaries.map(() => 0n);
    for (let index = boundaries.length - 1; index >= 0; index--) {
        const next = boundaries[index + 1];
        const translation = translations[index];
        runEnd[index] =
            next === undefined
                ? boundaries[index]
                : translation !== null &&
                    translation !== undefined &&
                    translations[index + 1] === translation
                    ? runEnd[index + 1]
                    : next;
    }
    const ambiguousPrefix = [0];
    const previousMapped = [];
    const nextMapped = [];
    const translationRuns = [];
    let previous = -1;
    let run = 0;
    let previousTranslation;
    for (const [index, translation] of translations.entries()) {
        ambiguousPrefix.push((ambiguousPrefix[index] ?? 0) + (translation === null ? 1 : 0));
        if (typeof translation === "bigint") {
            if (translation !== previousTranslation)
                run += 1;
            previousTranslation = translation;
            previous = index;
        }
        previousMapped.push(previous);
        translationRuns.push(run);
    }
    let next = translations.length;
    for (let index = translations.length - 1; index >= 0; index--) {
        if (typeof translations[index] === "bigint")
            next = index;
        nextMapped[index] = next;
    }
    const offset = (address, size) => {
        if (!Number.isSafeInteger(size) || size <= 0)
            return mappedFileOffset(mappings, address, size, zeroFills);
        const end = address + BigInt(size);
        const interval = lastAtOrBelow(boundaries, address);
        const lower = Math.max(0, interval);
        const upper = lastAtOrBelow(boundaries, end - 1n);
        const first = nextMapped[lower] ?? translations.length;
        const last = previousMapped[upper] ?? -1;
        // Like the scan, conflicts anywhere in the requested span win over gaps.
        if ((ambiguousPrefix[upper + 1] ?? 0) - (ambiguousPrefix[lower] ?? 0) > 0 ||
            (first <= upper &&
                last >= lower &&
                translationRuns[first] !== translationRuns[last]))
            throw new BinaryMappingFailure("ambiguous", "Virtual span has ambiguous or noncontiguous file mappings");
        const translation = translations[interval];
        if (typeof translation !== "bigint" || runEnd[interval] < end)
            throw new BinaryMappingFailure("unmapped", "Virtual address or string range is not file mapped");
        const zeroFill = lastAtOrBelow(zeroFilled.starts, end - 1n);
        if (zeroFill >= 0 && zeroFilled.reach[zeroFill] > address)
            throw new BinaryMappingFailure("ambiguous", "Virtual address has ambiguous file and zero-fill mappings");
        return Number(address + translation);
    };
    const access = {
        offset,
        mappingAt: (address) => {
            const start = offset(address, 1);
            const interval = lastAtOrBelow(boundaries, address);
            return {
                address,
                offset: start,
                size: Number(runEnd[interval] - address),
            };
        },
    };
    return {
        offset,
        readCString: (bytes, address, maximumBytes) => readMappedString(bytes, access, address, maximumBytes),
    };
};
/** Read a bounded NUL-terminated string while retaining mapping/alias semantics. */
export const readMappedCString = (bytes, mappings, address, maximumBytes, zeroFills) => {
    return readMappedString(bytes, {
        mappingAt: (cursor) => mappings.find((range) => range.address <= cursor &&
            cursor < range.address + BigInt(range.size)),
        offset: (cursor, size) => mappedFileOffset(mappings, cursor, size, zeroFills),
    }, address, maximumBytes);
};
const readMappedString = (bytes, access, address, maximumBytes) => {
    const chunks = [];
    let length = 0;
    while (length <= maximumBytes) {
        const cursor = address + BigInt(length);
        const mapping = access.mappingAt(cursor);
        if (mapping === undefined) {
            access.offset(cursor, 1);
            throw new BinaryMappingFailure("unmapped", "String range is not file mapped");
        }
        const size = Math.min(maximumBytes + 1 - length, Number(mapping.address + BigInt(mapping.size) - cursor));
        const offset = mapping.offset + Number(cursor - mapping.address);
        const chunk = bytes.subarray(offset, offset + size);
        const terminator = chunk.indexOf(0);
        const consumed = terminator < 0 ? size : terminator + 1;
        access.offset(cursor, consumed);
        if (terminator >= 0) {
            const tail = chunk.subarray(0, terminator);
            if (chunks.length === 0)
                return tail;
            chunks.push(tail);
            return Buffer.concat(chunks, length + terminator);
        }
        chunks.push(chunk);
        length += size;
    }
    throw binaryStringReadLimit(maximumBytes);
};
/** Recognize a wholly zero-filled span while refusing even partial file aliases. */
export const isZeroFilledSpan = (mappings, zeroFills, address, size) => {
    const bytes = BigInt(size);
    if (!zeroFills.some((mapping) => address >= mapping.address &&
        address + bytes <= mapping.address + mapping.size))
        return false;
    for (const mapping of mappings) {
        if (spansOverlap(address, bytes, mapping.address, BigInt(mapping.size)))
            throw new BinaryMappingFailure("ambiguous", "Virtual address has ambiguous file and zero-fill mappings");
    }
    return true;
};
const spansOverlap = (address, size, otherAddress, otherSize) => size > 0n &&
    otherSize > 0n &&
    address < otherAddress + otherSize &&
    otherAddress < address + size;
