/** A source-only compilation cannot establish an opaque cache boundary. */
export const isPossibleCachedDataCompilation = (finding) => finding.cached_data_status !== "absent";
