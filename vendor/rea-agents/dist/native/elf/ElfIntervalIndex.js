const compareBig = (left, right) => left < right ? -1 : left > right ? 1 : 0;
/** First index whose boundary is greater than `key`. */
const upperBound = (boundaries, key) => {
    let low = 0;
    let high = boundaries.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (boundaries[middle] <= key)
            low = middle + 1;
        else
            high = middle;
    }
    return low;
};
/** First index whose boundary is at least `key`. */
const lowerBound = (boundaries, key) => {
    let low = 0;
    let high = boundaries.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (boundaries[middle] < key)
            low = middle + 1;
        else
            high = middle;
    }
    return low;
};
/**
 * Builds a lookup that returns, for any key, the highest-priority interval
 * containing it (`prefer(a, b) < 0` means `a` wins). Overlaps are resolved
 * once at build time, so each lookup is a binary search instead of a scan of
 * every interval.
 */
export const buildIntervalIndex = (intervals, prefer) => {
    const usable = intervals.filter((interval) => interval.high > interval.low);
    const boundaries = [
        ...new Set(usable.flatMap((interval) => [interval.low, interval.high])),
    ].sort(compareBig);
    const segments = Math.max(0, boundaries.length - 1);
    const owners = Array.from({ length: segments });
    // next[i] is the first unpainted segment at or after i (path-compressed).
    const next = Int32Array.from({ length: segments + 1 }, (_, index) => index);
    const find = (index) => {
        let root = index;
        while (next[root] !== root)
            root = next[root];
        let cursor = index;
        while (next[cursor] !== root) {
            const following = next[cursor];
            next[cursor] = root;
            cursor = following;
        }
        return root;
    };
    const ordered = [...usable].sort((left, right) => prefer(left.value, right.value));
    for (const interval of ordered) {
        const last = lowerBound(boundaries, interval.high);
        let segment = find(lowerBound(boundaries, interval.low));
        while (segment < last) {
            owners[segment] = interval.value;
            next[segment] = segment + 1;
            segment = find(segment + 1);
        }
    }
    return (key) => {
        const segment = upperBound(boundaries, key) - 1;
        return segment < 0 || segment >= segments ? undefined : owners[segment];
    };
};
