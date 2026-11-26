import { ArtifactReaderFailure } from "../../resources/index.js";
/** Adapt a parser failure, keeping the integrity check it names. */
export const pyInstallerReaderFailure = (error) => error.reason === "integrity"
    ? new ArtifactReaderFailure(error.reason, error.message, {
        integrityCheck: error.integrityCheck,
    })
    : new ArtifactReaderFailure(error.reason, error.message);
export const pyInstallerFailure = (reason, message) => ({ reason, message });
/** Table entries that disagree with each other or place a member outside its archive. */
export const pyInstallerLayoutFailure = (message) => ({
    reason: "integrity",
    message,
    integrityCheck: "layout-consistency",
});
