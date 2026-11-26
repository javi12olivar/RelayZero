import { BINARY_ARCHITECTURES } from "../binaryTargetTypes.js";
import { elfArchitecture } from "../elfFixedHeader.js";
import { createEvidence, } from "../evidence.js";
/** File-offset ranges of the decoded debuglink, debugaltlink and debugdata sections. */
export const elfDebugLinkRanges = (report) => [
    report.debuglink.location,
    report.debugaltlink.location,
    report.debugdata.location,
].filter((range) => range !== null);
/** One Evidence interpretation for success and reports retained by later candidate failures. */
export const createElfDebugLinkEvidence = (report, provider, parameters) => {
    const architecture = BINARY_ARCHITECTURES.find((supported) => supported === elfArchitecture(report.machine));
    return createEvidence({
        path: report.artifact.path,
        format: "elf",
        sha256: report.artifact.sha256,
        ...(architecture === undefined ? {} : { architecture }),
    }, provider, {
        operation: "inspect_elf_debug_link",
        parameters,
        result: report,
        confidence: "observed",
        limitations: report.limitations,
        locations: [
            { kind: "artifact-path", path: report.artifact.path },
            ...(report.candidate === null
                ? []
                : [{ kind: "artifact-path", path: report.candidate.path }]),
            ...elfDebugLinkRanges(report).map((range) => ({
                kind: "file-offset-range",
                start: range.offset,
                end: range.offset + range.bytes,
            })),
        ],
    });
};
