import { unknownTarget } from "../targetIdentity.js";
import { createEvidence, } from "../evidence.js";
const gpuParameters = (parameters) => ({
    path: parameters.path,
    analysis: parameters.analysis,
    ...(parameters.object_ids === undefined
        ? {}
        : { object_ids: parameters.object_ids }),
    ...(parameters.targets === undefined ? {} : { targets: parameters.targets }),
    ...(parameters.expected_sha256 === undefined
        ? {}
        : { expected_sha256: parameters.expected_sha256 }),
});
/** One Evidence interpretation for success and observations retained by file finalization failures. */
export const createGpuCodeObjectsEvidence = (report, provider, parameters) => createEvidence({
    path: report.artifact.path,
    sha256: report.artifact.sha256,
    format: "file",
}, provider, {
    operation: "inspect_gpu_code_objects",
    parameters: gpuParameters(parameters),
    result: report,
    confidence: "observed",
    locations: [{ kind: "artifact-path", path: report.artifact.path }],
    limitations: report.limitations,
});
export const createGpuCodeObjectsPartialEvidence = (report, provider, parameters) => createEvidence(unknownTarget("not-observed"), provider, {
    operation: "inspect_gpu_code_objects",
    parameters: gpuParameters(parameters),
    result: report,
    confidence: "observed",
    locations: [{ kind: "artifact-path", path: report.artifact.path }],
    limitations: [
        "The interrupted inspection did not complete final file identity verification; root digest and completeness are unknown.",
        ...report.limitations,
    ],
});
