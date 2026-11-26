import { err, ok } from "./result.js";
/** Map a physically contiguous virtual span across consistent adjacent ranges. */
export const resolveMappedFileOffset = (mappings, address, size, zeroFills = []) => {
    if (!Number.isSafeInteger(size) || size < 0)
        return err({
            reason: "invalid-size",
            message: "Virtual span size is invalid",
        });
    const spanBytes = BigInt(size);
    const end = address + spanBytes;
    const overlapsZeroFill = () => zeroFills.some(({ address: start, size: bytes }) => spansOverlap(address, spanBytes, start, bytes));
    const unmapped = () => err({
        reason: "unmapped",
        message: "Virtual address or string range is not file mapped",
        overlapsZeroFill: overlapsZeroFill(),
    });
    let found;
    const covered = [];
    let whollyCovered = size === 0;
    for (const mapping of mappings) {
        const mappingEnd = mapping.address + BigInt(mapping.size);
        const start = address > mapping.address ? address : mapping.address;
        const overlapEnd = end < mappingEnd ? end : mappingEnd;
        if (size === 0
            ? address < mapping.address || address > mappingEnd
            : start >= overlapEnd)
            continue;
        const origin = mapping.offset + Number(address - mapping.address);
        if (found !== undefined && found !== origin)
            return err({
                reason: "ambiguous",
                message: "Virtual span has ambiguous or noncontiguous file mappings",
            });
        found = origin;
        if (start === address && overlapEnd === end)
            whollyCovered = true;
        else if (!whollyCovered)
            covered.push({ start, end: overlapEnd });
    }
    if (found === undefined)
        return unmapped();
    if (!whollyCovered) {
        covered.sort((left, right) => left.start < right.start ? -1 : left.start > right.start ? 1 : 0);
        let cursor = address;
        for (const span of covered) {
            if (span.start > cursor)
                return unmapped();
            if (span.end > cursor)
                cursor = span.end;
        }
        if (cursor < end)
            return unmapped();
    }
    if (overlapsZeroFill())
        return err({
            reason: "ambiguous",
            message: "Virtual address has ambiguous file and zero-fill mappings",
        });
    return ok(found);
};
const spansOverlap = (address, size, otherAddress, otherSize) => size > 0n &&
    otherSize > 0n &&
    address < otherAddress + otherSize &&
    otherAddress < address + size;
