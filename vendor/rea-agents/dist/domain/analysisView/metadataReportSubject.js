import { metadataReportSubjectFormat, } from "../apple/machoTargetSelection.js";
import { binaryMetadataArchitecture } from "../binaryMetadataArchitecture.js";
import { evidenceFileTarget } from "../evidence.js";
import { err, ok } from "../result.js";
import { analysisViewInputError } from "./analysisViewErrors.js";
/**
 * One owner for the metadata-report subject check. The parent subject must
 * name the report artifact's digest, container format and CPU family.
 */
export const requireMetadataReportSubject = (parent, report, message) => {
    const subject = evidenceFileTarget(parent);
    if (subject == null ||
        subject.sha256 !== report.artifact.sha256 ||
        subject.format !== metadataReportSubjectFormat(report) ||
        subject.architecture !==
            (binaryMetadataArchitecture(report.architecture) ?? null))
        return err(analysisViewInputError([
            {
                path: ["source", "subject"],
                reason: "invalid_value",
                message,
            },
        ]));
    return ok(undefined);
};
