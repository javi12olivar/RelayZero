import { isParseLimit, parseFailureAnalysisError, parseLimitConstraint, } from "../../domain/parseFailureAnalysisError.js";
import { projectOwnedArtifactIdentityFailure, projectSelectedArtifactFileFailure, projectStableArtifactFailure, stableArtifactInputFailure, projectArtifactCloseFailure, ArtifactReaderFailure, readStableArtifact, artifactFilePrimaryFacts, ArtifactResourceScope, } from "../../resources/index.js";
import { ArtifactOperationError } from "../../domain/artifactOperationError.js";
import { AnalysisResourceConstraintError } from "../../domain/analysisErrorCore.js";
import { MAX_DEVICETREE_FILE_BYTES, } from "../../domain/firmware/devicetree.js";
import { err, ok } from "../../domain/result.js";
import { DEVICETREE_PROVIDER } from "../../domain/investigationProviders.js";
import { DEVICETREE_FORMAT, parseDevicetree, } from "../../domain/firmware/devicetreeParser.js";
const OPERATION = "inspect_devicetree";
/** Portable parser over one bounded, identity-checked regular file. */
export class DevicetreeProvider {
    identity = DEVICETREE_PROVIDER;
    #resources = new ArtifactResourceScope();
    async close() {
        try {
            await this.#resources.close();
        }
        catch (cause) {
            throw projectArtifactCloseFailure(cause, DEVICETREE_PROVIDER.id, OPERATION);
        }
    }
    async inspect(input, options) {
        let snapshot;
        try {
            return await this.#resources.run(async () => {
                snapshot = await readStableArtifact(input.path, input.max_file_bytes, options?.signal, undefined, this.#resources);
                const { report } = parseDevicetree(snapshot.bytes, {
                    path: input.path,
                    sha256: snapshot.sha256,
                    bytes: snapshot.bytes.length,
                }, input);
                return ok(report);
            });
        }
        catch (cause) {
            return err(devicetreeFailure(cause, input, snapshot));
        }
    }
}
const devicetreeFailurePrimary = (facts, input) => {
    const { cause, origin } = facts;
    if (isParseLimit(cause, DEVICETREE_FORMAT))
        return parseLimitConstraint(OPERATION, cause.failure.limit.name === "decoded_bytes" ? "memory" : "capacity", cause, { retryable: false, remediationAction: cause.failure.detail });
    const formatFailure = parseFailureAnalysisError(OPERATION, input.path, cause);
    if (formatFailure !== undefined)
        return formatFailure;
    const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, input.path);
    if (identityFailure !== undefined)
        return identityFailure;
    if (origin === "owned-or-classified" &&
        cause instanceof ArtifactReaderFailure) {
        if (cause.reason === "limit") {
            return new AnalysisResourceConstraintError(OPERATION, cause.boundary ?? "memory", cause.message, { max_file_bytes: input.max_file_bytes }, {
                cause,
                retryable: false,
                remediationAction: input.max_file_bytes < MAX_DEVICETREE_FILE_BYTES
                    ? "Raise max_file_bytes within its schema ceiling or select a smaller DTB."
                    : "Select a smaller DTB; the fixed file-byte ceiling has been reached.",
            });
        }
        if (cause.reason === "path" || cause.reason === "format")
            return stableArtifactInputFailure(cause, OPERATION);
    }
    const fileFailure = projectSelectedArtifactFileFailure(cause, OPERATION, input.path, "devicetree blob");
    if (fileFailure !== undefined)
        return fileFailure;
    return new ArtifactOperationError(OPERATION, origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure
        ? cause.reason
        : "io", undefined, cause instanceof Error ? cause.message : "devicetree inspection failed.", { cause });
};
const devicetreeFailure = (cause, input, snapshot) => {
    const primary = devicetreeFailurePrimary(artifactFilePrimaryFacts(cause), input);
    return projectStableArtifactFailure(cause, primary, input.path, DEVICETREE_PROVIDER.id, OPERATION, snapshot);
};
