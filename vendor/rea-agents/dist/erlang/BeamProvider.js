import { ERLANG_BEAM_PROVIDER_IDENTITY } from "./ErlangBeamProviderIdentity.js";
import { projectOwnedArtifactIdentityFailure, projectStableArtifactFailure, stableArtifactInputFailure, projectArtifactCloseFailure, ArtifactReaderFailure, readStableArtifact, artifactFilePrimaryFacts, artifactSelectedPathErrno, ArtifactResourceScope, } from "../resources/index.js";
import { ArtifactOperationError } from "../domain/artifactOperationError.js";
import { AnalysisAccessDeniedError, AnalysisInputError, AnalysisResourceConstraintError, } from "../domain/analysisErrorCore.js";
import { MAX_INSPECT_ERLANG_BEAM_ATOMS, MAX_INSPECT_ERLANG_BEAM_CHUNKS, MAX_INSPECT_ERLANG_BEAM_FILE_BYTES, } from "../domain/erlang/beam.js";
import { err, ok } from "../domain/result.js";
import { isParseLimit, parseLimitConstraint, } from "../domain/parseFailureAnalysisError.js";
import { parseErlangBeam } from "./BeamParser.js";
const OPERATION = "inspect_erlang_beam";
/** Portable parser over one bounded, identity-checked regular file. */
export class BeamProvider {
    identity = ERLANG_BEAM_PROVIDER_IDENTITY;
    #resources = new ArtifactResourceScope();
    async close() {
        try {
            await this.#resources.close();
        }
        catch (cause) {
            throw projectArtifactCloseFailure(cause, ERLANG_BEAM_PROVIDER_IDENTITY.id, OPERATION);
        }
    }
    async inspect(input, options) {
        let snapshot;
        try {
            return await this.#resources.run(async () => {
                snapshot = await readStableArtifact(input.path, input.max_file_bytes, options?.signal, undefined, this.#resources);
                return ok(parseErlangBeam(snapshot.bytes, {
                    path: input.path,
                    sha256: snapshot.sha256,
                    bytes: snapshot.bytes.length,
                }, input));
            });
        }
        catch (cause) {
            return err(beamFailure(cause, input, snapshot));
        }
    }
}
const fileBudgetRemediation = (maximum) => maximum >= MAX_INSPECT_ERLANG_BEAM_FILE_BYTES
    ? `The file exceeds the ${String(MAX_INSPECT_ERLANG_BEAM_FILE_BYTES)}-byte input ceiling this operation accepts; select a smaller artifact.`
    : `Raise max_file_bytes above ${String(maximum)} bytes or select a smaller artifact; the limit is the caller-selected input read budget.`;
const parserBudgetRemediation = ({ name, maximum }) => {
    switch (name) {
        case "max_atoms":
            return maximum >= MAX_INSPECT_ERLANG_BEAM_ATOMS
                ? `The file exceeds the ${String(MAX_INSPECT_ERLANG_BEAM_ATOMS)}-atom ceiling this operation accepts; select a smaller artifact.`
                : `Raise max_atoms above ${String(maximum)} or select a smaller artifact; the limit is the caller-selected atom budget.`;
        case "max_table_rows":
            return `The file exceeds the ${String(maximum)}-row ceiling this operation accepts; select a smaller artifact.`;
        case "max_chunks":
            return maximum >= MAX_INSPECT_ERLANG_BEAM_CHUNKS
                ? `The file exceeds the ${String(MAX_INSPECT_ERLANG_BEAM_CHUNKS)}-chunk ceiling this operation accepts; select a smaller artifact.`
                : `Raise max_chunks above ${String(maximum)} or select a smaller artifact; the limit is the caller-selected chunk budget.`;
    }
    return undefined;
};
const beamFailurePrimary = (facts, input) => {
    const { cause, origin } = facts;
    const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, input.path);
    if (identityFailure !== undefined)
        return identityFailure;
    const reportedLimits = {
        max_file_bytes: input.max_file_bytes,
        max_chunks: input.max_chunks,
        max_atoms: input.max_atoms,
    };
    if (origin === "owned-or-classified" && isParseLimit(cause, "beam")) {
        const { limit } = cause.failure;
        const remediationAction = parserBudgetRemediation(limit);
        return parseLimitConstraint(OPERATION, "capacity", cause, {
            reportedLimitContext: reportedLimits,
            legacyMaximumKey: limit.name,
            ...(remediationAction === undefined ? {} : { remediationAction }),
            retryable: false,
        });
    }
    if (origin === "owned-or-classified" &&
        cause instanceof ArtifactReaderFailure) {
        if (cause.reason === "limit") {
            return new AnalysisResourceConstraintError(OPERATION, cause.boundary ?? "memory", cause.message, reportedLimits, {
                cause,
                ...(cause.boundary === "file-size"
                    ? {
                        retryable: false,
                        remediationAction: fileBudgetRemediation(input.max_file_bytes),
                    }
                    : {}),
            });
        }
        if (cause.reason === "path" || cause.reason === "format")
            return stableArtifactInputFailure(cause, OPERATION);
    }
    if (cause instanceof Error && "code" in cause) {
        if (cause.code === "EACCES" || cause.code === "EPERM")
            return new AnalysisAccessDeniedError(OPERATION, input.path, cause.code, {
                cause,
            });
        const pathErrno = artifactSelectedPathErrno(cause);
        if (pathErrno !== undefined)
            return new AnalysisInputError(OPERATION, { cause }, [
                {
                    path: ["path"],
                    reason: "invalid_value",
                    message: `Selected BEAM file could not be read (${pathErrno}): ${input.path}.`,
                },
            ]);
    }
    return new ArtifactOperationError(OPERATION, origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure
        ? cause.reason
        : "io", undefined, cause instanceof Error ? cause.message : "BEAM inspection failed.", { cause });
};
const beamFailure = (cause, input, snapshot) => {
    const primary = beamFailurePrimary(artifactFilePrimaryFacts(cause), input);
    return projectStableArtifactFailure(cause, primary, input.path, ERLANG_BEAM_PROVIDER_IDENTITY.id, OPERATION, snapshot);
};
