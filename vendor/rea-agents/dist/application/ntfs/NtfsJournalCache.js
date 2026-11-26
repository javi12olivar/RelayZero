import { createUsnMftCorrelator } from "../../domain/windows/ntfsJournalCorrelation.js";
/** One completed digest-bound pair per resource scope; no descriptors or negative entries. */
export class NtfsJournalCache {
    #pair;
    #active = false;
    begin() {
        if (this.#active)
            return false;
        this.#active = true;
        return true;
    }
    end() {
        this.#active = false;
    }
    clear() {
        this.#pair = undefined;
    }
    select(mftPath, journalPath) {
        if (this.#pair?.mft.path !== mftPath ||
            this.#pair.journal.path !== journalPath)
            this.clear();
        return this.#pair;
    }
    retain(mft, journal, image) {
        const pair = {
            mft,
            journal,
            image,
            correlate: createUsnMftCorrelator(image.records),
        };
        this.#pair = pair;
        return pair;
    }
}
const scopedCaches = new WeakMap();
/** Scope shutdown clears retained bytes after admitted operations and cleanup settle. */
export const ntfsJournalCacheFor = (resources) => {
    let cache = scopedCaches.get(resources);
    if (cache === undefined) {
        cache = new NtfsJournalCache();
        const owned = cache;
        resources.addCloseHook(async () => {
            owned.clear();
        });
        scopedCaches.set(resources, cache);
    }
    return cache;
};
