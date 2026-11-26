/** Re-derive the diagnostic view after readiness or target facts change. */
export const withCandidateRejections = (status) => ({
    ...status,
    rejections: candidateRejections(status),
});
/** Stable reasons this candidate's readiness or target support excluded it. */
const candidateRejections = (candidate) => {
    const rejections = [];
    if (candidate.availability.status === "unavailable")
        rejections.push(selectedRejection(candidate, "availability", candidate.availability));
    if (candidate.targetSupport.status === "unsupported")
        rejections.push(selectedRejection(candidate, "target", candidate.targetSupport));
    return rejections;
};
/** Name the observation a rejection came from so availability cannot read as a refusal. */
const selectedRejection = (candidate, origin, rejection) => ({
    providerId: candidate.provider.id,
    origin,
    code: rejection.code,
    reason: rejection.reason,
    ...("remediation" in rejection ? { remediation: rejection.remediation } : {}),
    // ProviderSelectionError owns the single defensive diagnostic copy.
    diagnostics: rejection.diagnostics,
});
