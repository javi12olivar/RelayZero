import { DESKTOP_VIEW_DEFAULTS } from "../../domain/desktop/desktopViewPolicy.js";
import { join } from "node:path";
import { ArtifactReaderFailure, bindArtifactFileCleanup, ArtifactResourceScope, } from "../../resources/index.js";
import { err, ok } from "../../domain/result.js";
import { analysisErrorWithCleanupDependencies } from "../../domain/analysisErrorCleanup.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
import { RegularFileCleanupFailure, regularFileCancellation, withOwnedRegularFile, } from "../../filesystem/OwnedRegularFile.js";
import { RegularFileCapacityError, readStableFileBytes, } from "../../filesystem/readStableFileBytes.js";
import { sha256Hex } from "../../kernel/sha256Hex.js";
const MIB = 1024 * 1024;
/** Largest retained file the state view reads. */
const DEFAULT_MAX_BYTES = DESKTOP_VIEW_DEFAULTS.file_bytes;
/**
 * Reads retained content without following links and checks each digest.
 * A handle whose close failed is kept, with its path, for `release`.
 */
export class RetainedContent {
    folder;
    maxBytes;
    #unclosed = [];
    constructor(folder, maxBytes = DEFAULT_MAX_BYTES) {
        this.folder = folder;
        this.maxBytes = maxBytes;
    }
    /**
     * The bytes stored under a digest, or why they cannot be used, worded to
     * follow the name of what was read.
     */
    async read(sha256, signal) {
        const path = join(this.folder, "content", sha256);
        const options = {
            symlinks: "reject",
            retainFailedClose: (owner) => {
                this.#unclosed.push({ path, owner });
            },
            ...(signal === undefined ? {} : { signal }),
        };
        let bytes;
        try {
            bytes = await withOwnedRegularFile(path, options, ({ handle }) => readStableFileBytes(handle, path, this.maxBytes, options));
        }
        catch (cause) {
            const cancellation = regularFileCancellation(cause);
            if (cancellation !== undefined)
                throw new ArtifactReaderFailure("cancelled", "Retained content read cancelled", {
                    cause: cancellation.reason,
                    cancellation,
                });
            const outcome = cause instanceof RegularFileCleanupFailure ? cause.outcome : undefined;
            // A read that finished keeps its bytes; its failed close is retried by `release`.
            if (outcome?.kind === "completed" && Buffer.isBuffer(outcome.value))
                bytes = outcome.value;
            else if ((outcome?.kind === "failed" ? outcome.cause : cause) instanceof
                RegularFileCapacityError)
                return err(`is larger than the ${String(this.maxBytes / MIB)} MiB read limit`);
            else if (cause instanceof Error)
                return err("is missing or unreadable");
            else
                throw cause;
        }
        return sha256Hex(bytes) === sha256
            ? ok(bytes)
            : err("does not match its digest");
    }
    /** Close every kept handle; each close that fails again keeps its owner. */
    async release(resources) {
        const failures = [];
        for (const { path, owner } of this.#unclosed.splice(0)) {
            const attempt = await resources.release({
                kind: "file-handle",
                resource: path,
                handle: owner,
            });
            if (attempt.kind === "failed")
                failures.push(attempt);
        }
        return failures;
    }
}
/**
 * Run with a retained content reader whose handles are released on every
 * exit. A release that fails is reported with the run's own outcome and the
 * exact handle owners.
 */
export const withRetainedContent = async (folder, run, maxBytes) => {
    const content = new RetainedContent(folder, maxBytes);
    let outcome;
    try {
        outcome = { kind: "completed", value: await run(content) };
    }
    catch (cause) {
        outcome = { kind: "failed", cause };
    }
    const resources = new ArtifactResourceScope();
    const [first, ...rest] = await content.release(resources);
    if (first !== undefined) {
        const failures = [first, ...rest];
        if (outcome.kind === "failed" &&
            outcome.cause instanceof ProviderCleanupError) {
            const fileFailure = resources.cleanupFailure({ kind: "completed" }, failures);
            const fileCleanup = new ProviderCleanupError("rea-desktop", fileFailure.cleanup?.resources ?? [], { reason: fileFailure.cleanup?.reason ?? fileFailure.message }, { operation: outcome.cause.operation, cause: fileFailure });
            bindArtifactFileCleanup(fileFailure, fileCleanup);
            throw analysisErrorWithCleanupDependencies(outcome.cause, fileCleanup, outcome.cause.operation);
        }
        throw resources.cleanupFailure(outcome, failures);
    }
    if (outcome.kind === "failed")
        throw outcome.cause;
    return outcome.value;
};
