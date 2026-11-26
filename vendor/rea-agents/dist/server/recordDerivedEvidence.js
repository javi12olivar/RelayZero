import { ok } from "../domain/result.js";
/** Atomically record derived Evidence with an optional supported unknown. */
export const recordDerivedEvidence = (session, evidence, unknown) => {
    const recorded = unknown === undefined
        ? session.recordEvidence(evidence)
        : session.recordEvidenceWithUnknown(evidence, unknown);
    return recorded.ok ? ok(evidence) : recorded;
};
