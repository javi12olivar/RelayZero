import { localPathStringSchema } from "../domain/localPath.js";
import { err } from "../domain/result.js";
import { projectAnalysisError } from "../domain/analysisErrorProjection.js";
import { ArtifactResourceScope } from "../resources/index.js";
import { absoluteCallerPath } from "../filesystem/callerPath.js";
import { parseAnalysisInput } from "../application/AnalysisInput.js";
import { finishAnalysisCommand } from "./finishAnalysisCommand.js";
/** Explicit portable lookup context for CLI workflows accepting retained IDs. */
export const evidenceBundleOption = localPathStringSchema
    .optional()
    .describe("Resolve exact retained Evidence IDs from this local Evidence bundle without reopening an analysis target");
/**
 * Own one selected bundle read through workflow execution and final cleanup.
 * The document is admitted by its transport frame first, so a malformed
 * document is refused before the Evidence bundle is read.
 */
export const runEvidenceInputCommand = (document, context, execute) => {
    const { operation, signal, frame } = context;
    const bundlePath = context.cliOptions.evidenceBundle;
    const framed = parseAnalysisInput(operation, document, frame, signal);
    if (!framed.ok)
        return Promise.resolve(err(projectAnalysisError(framed.error)));
    const resources = new ArtifactResourceScope();
    return finishAnalysisCommand(async () => {
        let lookup;
        if (bundlePath !== undefined) {
            const { readImmutableEvidenceBundle } = await import("../application/EvidenceBundleFiles.js");
            const bundle = await readImmutableEvidenceBundle(absoluteCallerPath(bundlePath), signal, resources, operation);
            if (!bundle.ok)
                return bundle;
            const records = new Map(bundle.value.records.map((record) => [record.evidence_id, record]));
            lookup = (id) => records.get(id);
        }
        return execute(lookup, resources);
    }, resources, "rea", operation, signal);
};
