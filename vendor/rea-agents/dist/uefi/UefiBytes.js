import { Buffer } from "node:buffer";
/** Build a region over one full-image address range; bounds are clamped. */
export function imageRegion(buffer, start, end) {
    const clampedStart = Math.max(0, Math.min(start, buffer.length));
    const clampedEnd = Math.max(clampedStart, Math.min(end, buffer.length));
    return { buffer, start: clampedStart, end: clampedEnd, origin: clampedStart };
}
/** Map a local position inside the region to its source-stream offset. */
export function absoluteOffset(region, localOffset) {
    return region.origin + (localOffset - region.start);
}
/** Map an source-stream offset back to its local position inside the region. */
export function localOffsetOf(region, absoluteAddress) {
    return absoluteAddress - region.origin + region.start;
}
/** Read bytes of one sub-range as a view; null when outside region bounds. */
export function sliceRegion(region, absoluteStart, length) {
    const local = absoluteStart - region.origin + region.start;
    if (absoluteStart < region.origin ||
        local < region.start ||
        local + length > region.end) {
        return null;
    }
    return region.buffer.subarray(local, local + length);
}
/** Round up to the next multiple of `alignment`; zero stays zero. */
export function alignUp(value, alignment) {
    if (alignment <= 1) {
        return Math.max(0, value);
    }
    return Math.ceil(value / alignment) * alignment;
}
/** Uniformity over a bounded window; out-of-window bytes read as absent. */
export function isWindowUniform(buffer, start, end, byte) {
    const boundedStart = Math.max(0, start);
    const boundedEnd = Math.min(end, buffer.length);
    if (boundedStart >= boundedEnd) {
        return false;
    }
    for (let index = boundedStart; index < boundedEnd; index += 1) {
        if (buffer[index] !== byte) {
            return false;
        }
    }
    return true;
}
