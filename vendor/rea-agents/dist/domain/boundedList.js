/**
 * Retain the first `maximum` items and count the rest, adding to `omitted`
 * items an earlier bound already left out.
 */
export const boundedList = (items, maximum, omitted = 0) => ({
    items: items.slice(0, maximum),
    omitted: omitted + Math.max(0, items.length - maximum),
});
/** Collects items up to a maximum and counts each item offered past it. */
export class BoundedListCollector {
    maximum;
    #items = [];
    #omitted = 0;
    constructor(maximum) {
        this.maximum = maximum;
    }
    push(item) {
        if (this.#items.length < this.maximum)
            this.#items.push(item);
        else
            this.#omitted += 1;
    }
    /** Whether a retained item equals `item`; omitted items are not kept. */
    retains(item) {
        return this.#items.includes(item);
    }
    toList() {
        return { items: [...this.#items], omitted: this.#omitted };
    }
}
/**
 * The retained items joined by `separator`, then "and N more" for the omitted
 * ones: `a; b; and 3 more`.
 */
export const describeBoundedList = (list, separator) => {
    if (list.omitted === 0)
        return list.items.join(separator);
    const rest = `and ${String(list.omitted)} more`;
    return list.items.length === 0
        ? rest
        : `${list.items.join(separator)}${separator}${rest}`;
};
