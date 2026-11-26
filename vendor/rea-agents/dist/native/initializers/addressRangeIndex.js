const compareBigInt = (left, right) => left < right ? -1 : left > right ? 1 : 0;
/** Minimal binary heap; `before(a, b)` is true when `a` belongs on top. */
const heap = (before) => {
    const items = [];
    const swap = (a, b) => {
        const held = items[a];
        items[a] = items[b];
        items[b] = held;
    };
    return {
        top: () => items[0],
        push(item) {
            items.push(item);
            let at = items.length - 1;
            while (at > 0) {
                const parent = (at - 1) >> 1;
                if (!before(items[at], items[parent]))
                    break;
                swap(at, parent);
                at = parent;
            }
        },
        pop() {
            const last = items.pop();
            if (last === undefined || items.length === 0)
                return;
            items[0] = last;
            let at = 0;
            for (;;) {
                const left = at * 2 + 1;
                const right = left + 1;
                let best = at;
                if (left < items.length && before(items[left], items[best]))
                    best = left;
                if (right < items.length && before(items[right], items[best]))
                    best = right;
                if (best === at)
                    return;
                swap(at, best);
                at = best;
            }
        },
    };
};
/** `prefer(a, b) < 0` when `a` wins where both cover an address. It must be a total order. */
export const buildAddressRangeIndex = (ranges, prefer) => {
    const sorted = ranges
        .filter((range) => range.end > range.start)
        .sort((left, right) => compareBigInt(left.start, right.start));
    const bounds = [
        ...new Set(sorted.flatMap((range) => [range.start, range.end])),
    ].sort(compareBigInt);
    const active = heap((left, right) => prefer(left.value, right.value) < 0);
    const starts = [];
    const ends = [];
    const winners = [];
    let next = 0;
    for (let index = 0; index + 1 < bounds.length; index += 1) {
        const bound = bounds[index];
        while (next < sorted.length &&
            sorted[next].start <= bound) {
            active.push(sorted[next]);
            next += 1;
        }
        let top = active.top();
        while (top !== undefined && top.end <= bound) {
            active.pop();
            top = active.top();
        }
        if (top === undefined)
            continue;
        const pieceEnd = bounds[index + 1];
        const last = winners.length - 1;
        if (last >= 0 && winners[last] === top && ends[last] === bound) {
            ends[last] = pieceEnd;
            continue;
        }
        starts.push(bound);
        ends.push(pieceEnd);
        winners.push(top);
    }
    return {
        at(address) {
            let low = 0;
            let high = starts.length - 1;
            while (low <= high) {
                const middle = (low + high) >> 1;
                if (starts[middle] > address)
                    high = middle - 1;
                else if (ends[middle] <= address)
                    low = middle + 1;
                else
                    return winners[middle];
            }
            return undefined;
        },
    };
};
