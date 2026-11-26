import { createUsnMftCorrelator, } from "./ntfsJournalCorrelation.js";
import { readUsnJournal, } from "./ntfsUsnJournal.js";
/** Compose a bounded source-order page for an explicitly paired acquisition. */
export const composeNtfsJournalTimeline = (mft, journal, window, correlate = createUsnMftCorrelator(mft.records)) => {
    const rows = [];
    let nextFileOffset = null;
    for (const result of readUsnJournal(journal, window.startFileOffset)) {
        const fileOffset = result.ok
            ? result.value.fileOffset
            : result.error.fileOffset;
        if (rows.length >= window.maxRows) {
            nextFileOffset = fileOffset;
            break;
        }
        if (!result.ok) {
            rows.push({ kind: "coverage", issue: result.error });
            continue;
        }
        const entry = result.value;
        const { extentSample, ...fields } = entry;
        rows.push({
            kind: "event",
            event: {
                ...fields,
                fileReference: entry.fileReference.toString(),
                parentReference: entry.parentReference.toString(),
                usn: entry.usn.toString(),
                timestampFileTime: entry.timestampFileTime?.toString() ?? null,
                ...(extentSample === undefined
                    ? {}
                    : {
                        extentSample: extentSample.map((extent) => ({
                            fileOffset: extent.fileOffset,
                            offset: extent.offset.toString(),
                            length: extent.length.toString(),
                        })),
                    }),
                mft: correlate(entry),
            },
        });
    }
    return {
        rows,
        historyCompleteness: "unknown",
        nextFileOffset,
        mftLimitations: mft.limitations,
    };
};
