import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { link, lstat, mkdtemp, open, realpath, rename, stat, } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { EvidenceFileError, } from "../domain/evidenceErrors.js";
import { AnalysisCancelledError, cancelledBy, carriedReason, } from "../domain/analysisErrorCore.js";
import { err, ok } from "../domain/result.js";
import { ArtifactReaderFailure } from "./ArtifactReader.js";
import { bindArtifactFileCleanup } from "./ArtifactFileOperation.js";
import { AnalysisCleanupLeaseGroup, } from "./AnalysisCleanupLease.js";
import { OwnedFileHandle } from "../filesystem/OwnedFileHandle.js";
import { OwnedStagedOutput } from "../filesystem/OwnedStagedOutput.js";
import { StagedOutputError } from "../filesystem/StagedOutputError.js";
import { absoluteCallerPath } from "../filesystem/callerPath.js";
/** Atomically write text to the caller-supplied path. */
export const writeTextFile = async (encoded, path, overwrite, resources) => writeTextParts([encoded], path, overwrite, resources);
export function writeTextParts(parts, path, overwrite, resources, cancellation) {
    return resources
        .run(() => writeTextPartsOwned(parts, path, overwrite, resources, cancellation))
        .catch((cause) => {
        const cleanup = cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined
            ? cause.cleanup
            : undefined;
        const error = new EvidenceFileError("write", "io", {
            cause,
            path: absoluteCallerPath(path),
            ...(cleanup === undefined ? {} : { cleanup }),
        });
        // A failed admission retry names its exact retained leases.
        bindArtifactFileCleanup(cause, error);
        return err(error);
    });
}
const writeTextPartsOwned = async (parts, path, overwrite, resources, cancellation) => {
    const requestedPath = absoluteCallerPath(path);
    try {
        assertWriteActive(cancellation);
        if (HOST_PLATFORM.platform !== "win32" && requestedPath.endsWith("/"))
            return err(new EvidenceFileError("write", "not-file", { path: requestedPath }));
        const selectedParent = dirname(requestedPath);
        // Native lookup must accept the parent before realpath can collapse it.
        // On macOS realpath(file/..) succeeds even though that traversal is ENOTDIR.
        if (!(await stat(selectedParent)).isDirectory())
            return err(new EvidenceFileError("write", "missing", { path: requestedPath }));
        const canonicalParent = await realpath(selectedParent);
        const destination = resolve(canonicalParent, basename(requestedPath));
        const existing = await lstat(destination).catch((cause) => {
            if (fileErrorCode(cause) === "ENOENT")
                return undefined;
            throw cause;
        });
        if (existing !== undefined) {
            if (!existing.isFile() || existing.isSymbolicLink())
                return err(new EvidenceFileError("write", "not-file", { path: requestedPath }));
            if (!overwrite)
                return err(new EvidenceFileError("write", "exists", { path: requestedPath }));
        }
        assertWriteActive(cancellation);
        const bytes = await publishFile(destination, parts, overwrite, resources, cancellation);
        return ok({ path: requestedPath, bytes });
    }
    catch (cause) {
        if (cause instanceof StagedOutputCleanupFailure) {
            const cleanup = {
                reason: failureMessage(cause.cleanupCause),
                resources: [cause.owner.directory],
            };
            if (cause.outcome.ok)
                return stagedCleanupFailure(new EvidenceFileError("write", "io", {
                    cause,
                    path: requestedPath,
                    cleanup,
                    published: { ...cause.outcome.value, path: requestedPath },
                    ...stagedOutputDiagnostics(cause.cleanupCause),
                }), cause.lease);
            if (cause.outcome.error instanceof AnalysisCancelledError)
                return stagedCleanupFailure(cancelledBy(cause.outcome.error.operation, carriedReason(cause.outcome.error.cause), { cleanupPrimary: cause.outcome.error, cleanup }), cause.lease);
            const failure = classifyWriteFailure(cause.outcome.error);
            return stagedCleanupFailure(new EvidenceFileError("write", failure.reason, {
                cause,
                path: requestedPath,
                cleanup,
                ...(failure.systemCode === undefined
                    ? {}
                    : { systemCode: failure.systemCode }),
                ...stagedOutputDiagnostics(!cause.outcome.ok &&
                    cause.outcome.error instanceof StagedOutputError
                    ? cause.outcome.error
                    : cause.cleanupCause),
            }), cause.lease);
        }
        if (cancellation?.signal.aborted === true &&
            cause instanceof AnalysisCancelledError &&
            cause.operation === cancellation.operation)
            return err(cause);
        if (!overwrite && fileErrorCode(cause) === "EEXIST")
            return err(new EvidenceFileError("write", "exists", {
                cause,
                path: requestedPath,
            }));
        const failure = classifyWriteFailure(cause);
        return err(new EvidenceFileError("write", failure.reason, {
            cause,
            path: requestedPath,
            ...(failure.systemCode === undefined
                ? {}
                : { systemCode: failure.systemCode }),
            ...stagedOutputDiagnostics(cause),
        }));
    }
};
/** Recognize only host codes that establish a publication resource refusal. */
const classifyWriteFailure = (cause) => {
    const code = fileErrorCode(cause);
    return code === "EFBIG" || code === "ENOSPC" || code === "EDQUOT"
        ? { reason: "storage-limit", systemCode: code }
        : { reason: fileAccessFailureReason(cause) };
};
/** The retained staging lease clears this error only when a retry confirms release. */
const stagedCleanupFailure = (error, lease) => {
    new AnalysisCleanupLeaseGroup(error, [lease]);
    return err(error);
};
/** A missing path or parent is a selection error, not a permission failure; JSON reads classify with it too. */
export const fileAccessFailureReason = (cause) => {
    const code = fileErrorCode(cause);
    if (code === "ENAMETOOLONG")
        return "path-limit";
    if (code === "ELOOP")
        return "symlink-traversal";
    return code === "ENOENT" || code === "ENOTDIR" ? "missing" : "io";
};
const publishFile = async (destination, parts, overwrite, resources, cancellation) => {
    const { owner, staged, file } = await acquireStagedFile(dirname(destination), resources, cancellation);
    let outcome;
    try {
        let written;
        try {
            const bytes = await writeStagedParts(file, parts, cancellation);
            assertWriteActive(cancellation);
            await file.sync();
            written = ok(bytes);
        }
        catch (cause) {
            written = err(cause);
        }
        try {
            await owner.closeFile();
        }
        catch (cause) {
            if (written.ok)
                written = err(cause);
        }
        if (!written.ok)
            throw written.error;
        // Once submitted, atomic publication can win a later cancellation race.
        assertWriteActive(cancellation);
        await owner.assertReadyForPublication(staged);
        assertWriteActive(cancellation);
        if (overwrite) {
            await rename(staged, destination);
            owner.recordPublishedRename();
        }
        // A hard link publishes complete bytes atomically and cannot replace an existing name.
        else
            await link(staged, destination);
        outcome = ok({ path: destination, bytes: written.value });
    }
    catch (cause) {
        outcome = err(cause);
    }
    // One cleanup phase owns both the open descriptor (if any) and its staging directory.
    const released = await resources.release({
        kind: "staged-output",
        resource: owner.directory,
        output: owner,
    });
    if (released.kind === "failed")
        throw new StagedOutputCleanupFailure(outcome, released.cause, owner, released.lease);
    if (!outcome.ok)
        throw outcome.error;
    return outcome.value.bytes;
};
/** Keep staging on the destination filesystem without imposing a shorter path ceiling. */
const acquireStagedFile = async (destinationParent, resources, cancellation) => {
    const destinationDevice = (await lstat(destinationParent)).dev;
    let parent = destinationParent;
    for (;;) {
        assertWriteActive(cancellation);
        let failure;
        let directory;
        try {
            directory = await mkdtemp(resolve(parent, ".rea-write-"));
        }
        catch (cause) {
            if (fileErrorCode(cause) !== "ENAMETOOLONG")
                throw cause;
            failure = cause;
        }
        if (directory !== undefined) {
            const owner = await OwnedStagedOutput.create(directory);
            const staged = resolve(directory, "content");
            try {
                const file = await open(staged, "wx", 0o600);
                owner.setFile(new OwnedFileHandle(file));
                return { owner, staged, file };
            }
            catch (cause) {
                const released = await resources.release({
                    kind: "staged-output",
                    resource: owner.directory,
                    output: owner,
                });
                if (released.kind === "failed")
                    throw new StagedOutputCleanupFailure(err(cause), released.cause, owner, released.lease);
                if (fileErrorCode(cause) !== "ENAMETOOLONG")
                    throw cause;
                failure = cause;
            }
        }
        const ancestor = dirname(parent);
        if (ancestor === parent)
            throw failure;
        const metadata = await lstat(ancestor);
        if (metadata.dev !== destinationDevice)
            throw failure;
        parent = ancestor;
    }
};
class StagedOutputCleanupFailure extends Error {
    outcome;
    cleanupCause;
    owner;
    lease;
    constructor(outcome, cleanupCause, owner, lease) {
        super("Staged output cleanup failed", {
            cause: outcome.ok ? cleanupCause : outcome.error,
        });
        this.outcome = outcome;
        this.cleanupCause = cleanupCause;
        this.owner = owner;
        this.lease = lease;
    }
}
const stagedOutputDiagnostics = (cause) => {
    if (!(cause instanceof StagedOutputError))
        return {};
    return { diagnostics: { code: cause.code, ...cause.detail } };
};
const failureMessage = (cause) => cause instanceof Error ? cause.message || cause.name : String(cause);
const writeStagedParts = async (file, parts, cancellation) => {
    assertWriteActive(cancellation);
    const iterator = parts[Symbol.iterator]();
    let exhausted = false;
    let bytes = 0;
    try {
        for (;;) {
            assertWriteActive(cancellation);
            const part = iterator.next();
            if (part.done)
                exhausted = true;
            assertWriteActive(cancellation);
            if (part.done)
                return bytes;
            await file.writeFile(part.value, { encoding: "utf8" });
            bytes += Buffer.byteLength(part.value, "utf8");
        }
    }
    finally {
        if (!exhausted)
            iterator.return?.();
    }
};
const assertWriteActive = (cancellation) => {
    if (cancellation?.signal.aborted === true)
        throw cancelledBy(cancellation.operation, cancellation.signal);
};
const fileErrorCode = (cause) => typeof cause === "object" && cause !== null && "code" in cause
    ? cause.code
    : undefined;
