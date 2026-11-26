import { AnalysisOutputError } from "../domain/analysisErrorCore.js";
import { err, ok } from "../domain/result.js";
import { sha256Hex } from "../kernel/sha256Hex.js";
/** Bind actual source text to the selected manifest entry before analysis. */
export const validateSelectedWebScript = (input, data, operation) => {
    const selected = data.manifest.scripts[input.script_index];
    if (selected === undefined ||
        selected.content.state !== "exported" ||
        selected.content.sha256 !== data.sourceFile.sha256 ||
        selected.content.bytes !== data.sourceFile.bytes ||
        Buffer.byteLength(data.source) !== data.sourceFile.bytes ||
        sha256Hex(data.source) !== data.sourceFile.sha256 ||
        data.manifestFile.path !== input.manifest_path)
        return err(new AnalysisOutputError(operation, "Artifact port changed the selected script/source identity."));
    return ok(selected);
};
/** Carry reported capture context alongside independently verified manifest bytes. */
export const capturedWebManifestIdentity = (data) => ({
    ...data.manifestFile,
    reported_output_directory: data.manifest.output_directory,
    capture_sha256: data.manifest.capture_sha256,
    capture_path: data.manifest.capture_path,
    capture_kind: data.manifest.capture_kind,
    capture_completeness: data.manifest.capture_completeness,
    source_evidence_id: data.manifest.source_evidence_id,
});
