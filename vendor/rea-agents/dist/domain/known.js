/** A fact the producer established. */
export const known = (value) => ({ known: true, value });
/** A fact the producer could not establish, with why. */
export const unknownBecause = (reason) => ({
    known: false,
    reason,
});
/**
 * Sum counts; one unknown count makes the sum unknown, with the first
 * unknown's reason, rather than counting as zero.
 */
export const sumKnownCounts = (counts) => {
    let total = 0;
    for (const count of counts) {
        if (!count.known)
            return count;
        total += count.value;
    }
    return known(total);
};
/** Project a fact onto a wire field where `null` means unknown. */
export const knownOrNull = (fact, read) => (fact.known ? read(fact.value) : null);
