import { hasVerifiedMftRecordIdentity } from "./ntfsMft.js";
/** Build one lookup for a selected MFT, then reuse it for each journal entry. */
export const createUsnMftCorrelator = (records) => {
    const byReference = new Map();
    for (const record of records) {
        // The stream ordinal is the segment number in an acquisition of the
        // logical MFT stream. Extension records do not identify separate files.
        if (record.baseRecordReference !== null ||
            !hasVerifiedMftRecordIdentity(record))
            continue;
        const reference = (BigInt(record.sequenceNumber) << 48n) | BigInt(record.index);
        byReference.set(reference, byReference.has(reference)
            ? null
            : {
                index: record.index,
                sequenceNumber: record.sequenceNumber,
                fileOffset: record.fileOffset,
            });
    }
    const lookup = (reference) => {
        const record = byReference.get(reference);
        if (record === undefined)
            return { kind: "unresolved" };
        if (record === null)
            return { kind: "ambiguous" };
        return { kind: "matched", record };
    };
    return (entry) => entry.referenceBytes === 16
        ? { file: { kind: "unresolved" }, parent: { kind: "unresolved" } }
        : {
            file: lookup(entry.fileReference),
            parent: lookup(entry.parentReference),
        };
};
