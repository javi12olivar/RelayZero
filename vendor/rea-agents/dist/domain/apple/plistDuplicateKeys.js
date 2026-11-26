import { quotedExcerpt } from "../excerpt.js";
/** Repeated key names kept for the limitation text; the counts stay exact. */
const NAMED_DUPLICATE_KEYS = 8;
/** UTF-16 units of one key shown in the limitation; longer keys are shortened. */
const SHOWN_KEY_LENGTH = 64;
/** Collect repeated keys across the dictionaries of one decode. */
export const createPlistDuplicateKeyCollector = () => {
    let dictionaries = 0;
    let replaced = 0;
    const names = new Set();
    let namesOmitted = false;
    return {
        /** Record one dictionary's keys in source order. */
        dictionary(keys) {
            const seen = new Set();
            let repeated = false;
            for (const key of keys) {
                if (!seen.has(key)) {
                    seen.add(key);
                    continue;
                }
                repeated = true;
                replaced += 1;
                if (names.size < NAMED_DUPLICATE_KEYS)
                    names.add(key);
                else if (!names.has(key))
                    namesOmitted = true;
            }
            if (repeated)
                dictionaries += 1;
        },
        result() {
            return { dictionaries, replaced, names: [...names], namesOmitted };
        },
    };
};
/** One key as shown in the limitation, marked when shortened. */
const shownKey = (name) => quotedExcerpt(name, SHOWN_KEY_LENGTH);
/** The decode limitation for repeated keys, or none when no key repeats. */
export const plistDuplicateKeyLimitations = (duplicates) => duplicates.replaced === 0
    ? []
    : [
        `${String(duplicates.dictionaries)} dictionary(ies) declare a key more than once (${duplicates.names.map(shownKey).join(", ")}${duplicates.namesOmitted ? ", ..." : ""}). REA kept the last value for each key; ${String(duplicates.replaced)} earlier value(s) are not reported, and other plist readers may keep a different one.`,
    ];
