import { MAX_NATIVE_INITIALIZER_NAME_BYTES, NATIVE_INITIALIZER_LIMITATIONS, } from "../../domain/native/nativeInitializers.js";
import { joinCoverageStatus, } from "../../domain/coverage.js";
/** A name known to exceed the byte limit, kept until an entry uses it. */
export const withheldInitializerSymbolName = Symbol("withheld initializer symbol name");
/** Keep a readable name in the existing preference order, even beside a withheld alias. */
export const preferInitializerSymbolName = (preferred, fallback) => typeof preferred === "string" ? preferred : (fallback ?? preferred ?? null);
/** Lowercase `0x` hex without leading zeros other than `0x0`. */
export const hexAddress = (value) => `0x${value.toString(16)}`;
const fitsName = (name) => typeof name === "string" &&
    name.length > 0 &&
    name.length <= MAX_NATIVE_INITIALIZER_NAME_BYTES;
/** Target-derived text. Empty and over-long names are not reported. */
const untrustedName = (name) => fitsName(name) ? { name, trust: "observed-untrusted" } : null;
const pageOf = (entries, examined, page, status) => {
    const returned = entries.slice(page.offset, page.offset + page.limit);
    return {
        entries: returned,
        coverage: {
            status,
            examined_entries: examined,
            total_entries: status === "complete" ? entries.length : null,
            returned_entries: returned.length,
            offset: page.offset,
            limit: page.limit,
        },
    };
};
/** Project one entry after completeness has accounted for all collected names. */
const toEntry = (entry) => ({
    index: entry.index,
    kind: entry.kind,
    slot_va: entry.slotVa === null ? null : hexAddress(entry.slotVa),
    slot_file_offset: entry.slotFileOffset,
    slot_bytes: entry.slotBytes,
    value_va: entry.valueVa === null ? null : hexAddress(entry.valueVa),
    value_file_offset: entry.valueFileOffset,
    slot_section: untrustedName(entry.slotSection),
    section: untrustedName(entry.section),
    symbol: untrustedName(entry.symbol),
    resolution: entry.resolution,
    detail: untrustedName(entry.detail)?.name ?? null,
});
/**
 * Standing limitations first, then observations from this image. `examined`
 * counts every slot read, including omitted sentinels. `coverage` is the
 * scan's own: `partial` when it left declared slots or names unreported,
 * `unknown` when it could not determine whether the listed facts are complete.
 */
export const finishInitializerReport = (body, entries, examined, notes, page, coverage) => {
    let withheld = 0;
    let indexedNameWithheld = false;
    for (const entry of entries) {
        indexedNameWithheld ||= entry.symbol === withheldInitializerSymbolName;
        for (const name of [
            entry.slotSection,
            entry.section,
            entry.symbol,
            entry.detail,
        ])
            if (typeof name === "string" &&
                name.length > MAX_NATIVE_INITIALIZER_NAME_BYTES)
                withheld += 1;
    }
    // A withheld name is a known gap in this entry's reported facts.
    const status = joinCoverageStatus([
        coverage,
        withheld > 0 || indexedNameWithheld ? "partial" : "complete",
    ]);
    const paged = pageOf(entries, examined, page, status);
    const returned = paged.entries.map(toEntry);
    return {
        ...body,
        applicability: "applicable",
        status: status === "complete" ? "parsed" : "incomplete",
        coverage: paged.coverage,
        entries: returned,
        limitations: [
            ...NATIVE_INITIALIZER_LIMITATIONS,
            ...notes.list(),
            ...(withheld === 0
                ? []
                : [
                    `${String(withheld)} section, symbol or detail name(s) exceeded the ${String(MAX_NATIVE_INITIALIZER_NAME_BYTES)}-byte name budget and were reported as null.`,
                ]),
        ],
    };
};
