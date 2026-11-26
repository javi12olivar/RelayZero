import { artifactComparisonResultSchema, } from "./artifactComparison.js";
import { EvidenceIntegrityError } from "./evidenceErrors.js";
import { readEvidencePayload } from "./evidenceValidation.js";
import { functionComparisonResultSchema, } from "./functionComparisonSchemas.js";
import { processCaptureComparisonSchema, } from "./process/processComparison.js";
import { webScreenshotDiffSchema, } from "./webScreenshot.js";
import { err, ok } from "./result.js";
import { comparisonSourceEvidenceSides } from "./comparisonSourceEvidence.js";
export function readComparisonResult(evidence, operation) {
    if (operation === "compare_process_captures") {
        const parsed = readEvidencePayload(processCaptureComparisonSchema, evidence.normalized_result, { within: ["normalized_result"] });
        if (!parsed.ok)
            return parsed;
        return ok({ operation, evidence, result: parsed.value });
    }
    if (operation === "compare_functions") {
        const parsed = readEvidencePayload(functionComparisonResultSchema, evidence.normalized_result, { within: ["normalized_result"] });
        if (!parsed.ok)
            return parsed;
        if (parsed.value.function_match.method === "same-evidence") {
            try {
                const { left, right } = comparisonSourceEvidenceSides(evidence);
                const sourceId = left[0];
                const sameSource = left.length === 1 &&
                    right.length === 1 &&
                    sourceId === right[0] &&
                    sourceId !== undefined &&
                    evidence.evidence_links.includes(sourceId) &&
                    parsed.value.dimensions.every(({ evidence_links }) => evidence_links.every((id) => id === sourceId));
                const impossibleChange = parsed.value.left_subject_sha256 !==
                    parsed.value.right_subject_sha256 ||
                    parsed.value.dimensions.some((dimension) => dimension.status === "changed" ||
                        (dimension.status === "unchanged" &&
                            dimension.left_digest !== dimension.right_digest));
                if (!sameSource || impossibleChange)
                    return err(new EvidenceIntegrityError("Same-Evidence function comparison must cite the same source on both sides"));
            }
            catch (cause) {
                if (cause instanceof EvidenceIntegrityError)
                    return err(cause);
                throw cause;
            }
        }
        const links = validateFindingLinks(evidence, parsed.value.dimensions.flatMap(({ evidence_links }) => evidence_links));
        if (!links.ok)
            return links;
        return ok({ operation, evidence, result: parsed.value });
    }
    if (operation === "compare_web_screenshots") {
        const parsed = readEvidencePayload(webScreenshotDiffSchema, evidence.normalized_result, { within: ["normalized_result"] });
        if (!parsed.ok)
            return parsed;
        return ok({ operation, evidence, result: parsed.value });
    }
    const parsed = readEvidencePayload(artifactComparisonResultSchema, evidence.normalized_result, { within: ["normalized_result"] });
    if (!parsed.ok)
        return parsed;
    const links = validateFindingLinks(evidence, [
        ...parsed.value.changes.flatMap(({ evidence_links }) => evidence_links),
        // optional-fact-default: only retained IDs are links to validate.
        ...(parsed.value.integrity_mismatch_evidence_ids ?? []),
    ]);
    if (!links.ok)
        return links;
    return ok({ operation, evidence, result: parsed.value });
}
const validateFindingLinks = (evidence, nestedLinks) => {
    const closure = new Set(evidence.evidence_links);
    return nestedLinks.some((id) => !closure.has(id))
        ? err(new EvidenceIntegrityError("Comparison finding cites Evidence outside its top-level closure"))
        : ok(undefined);
};
