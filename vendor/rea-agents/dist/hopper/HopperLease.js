import { realpath } from "node:fs/promises";
import { ArtifactFileCleanupFailure, bindArtifactFileCleanup, } from "../resources/index.js";
import { HopperStartError } from "./HopperErrors.js";
import { OwnedLeaseCleanupFailure, } from "../process/OwnedLease.js";
import { acquireHopperLease, hopperLeaseMessage, } from "../process/HopperLease.js";
/** Keep two REA processes from opening duplicate Hopper documents for one target/profile. */
export const acquireHopperTargetLease = async (input) => {
    // Canonicalization is required for lease identity. A lexical fallback could
    // let two aliases reserve independent sockets for the same Hopper document.
    let targetPath;
    try {
        targetPath = await realpath(input.targetPath);
    }
    catch (cause) {
        throw new HopperStartError({
            cause,
            userMessage: `REA could not resolve Hopper target ${JSON.stringify(input.targetPath)} to a canonical path before reserving the document. Confirm that the target exists and its path is accessible.`,
        });
    }
    return acquireHopperLease({
        ...input,
        failure: hopperLeaseFailure,
        identity: {
            targetPath,
            targetKind: input.targetKind,
            loaderArgs: input.loaderArgs,
        },
    });
};
/** Reserve the Linux demo's singleton application before it can forward a target to another owner. */
export const acquireLinuxHopperApplicationLease = (input) => acquireHopperLease({
    ...input,
    failure: hopperLeaseFailure,
    identity: { application: "linux-hopper-demo" },
});
/** A lease that could not be reserved stops Hopper from starting. */
const hopperLeaseFailure = (failure, cause) => {
    const primary = cause instanceof OwnedLeaseCleanupFailure
        ? cause.primary
        : cause instanceof ArtifactFileCleanupFailure &&
            cause.fileCleanupFailure.outcome.kind === "failed"
            ? cause.fileCleanupFailure.outcome.cause
            : undefined;
    const error = new HopperStartError({
        ...(cause === undefined ? {} : { cause }),
        ...(primary instanceof HopperStartError ? { cleanupPrimary: primary } : {}),
        ...(cause instanceof ArtifactFileCleanupFailure ||
            cause instanceof OwnedLeaseCleanupFailure
            ? { cleanup: cause.cleanup }
            : {}),
        userMessage: primary instanceof HopperStartError
            ? (primary.userMessage ?? hopperLeaseMessage(failure))
            : hopperLeaseMessage(failure),
    });
    bindArtifactFileCleanup(cause, error);
    return error;
};
