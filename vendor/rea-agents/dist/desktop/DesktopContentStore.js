import { ArtifactReaderFailure, ArtifactResourceScope, } from "../resources/index.js";
import { mkdir, open, rename, rm, rmdir } from "node:fs/promises";
import { join } from "node:path";
import { Budget } from "../domain/budget.js";
import { OwnedFileHandle } from "../filesystem/OwnedFileHandle.js";
import { RegularFileCleanupFailure, regularFileCancellation, withOwnedFileHandle, withOwnedRegularFile, } from "../filesystem/OwnedRegularFile.js";
import { NonRegularFileReadError, RegularFileChangedError, isSelectedRegularFileError, } from "../filesystem/RegularFile.js";
import { RegularFileCapacityError, readStableFileBytes, } from "../filesystem/readStableFileBytes.js";
import { sha256Hex } from "../kernel/sha256Hex.js";
class ChangedSinceWalk extends Error {
}
/** Permission refusals; path changes use the shared selected-file classification. */
const DENIED_CODES = new Set(["EACCES", "EPERM", "ENXIO"]);
/** Content-addressed copies of observed files under `<capture>/content`. */
export class DesktopContentStore {
    #directory;
    #maxFileBytes;
    #stored = new Map();
    #storedSizes = new Set();
    #omissions = [];
    /** Handles whose close failed; kept owned so `close` can retry them. */
    #unclosed = new ArtifactResourceScope();
    /** Every partial file this store created but has not published or removed. */
    #unpublished = new Set();
    #bytes;
    constructor(captureDirectory, maxFileBytes, maxBytes) {
        this.#directory = join(captureDirectory, "content");
        this.#maxFileBytes = maxFileBytes;
        this.#bytes = new Budget(maxBytes);
    }
    /** Create the private content directory; it must not exist yet. */
    async prepare() {
        await mkdir(this.#directory, { mode: 0o700 });
    }
    get files() {
        return this.#stored.size;
    }
    get bytes() {
        return [...this.#stored.values()].reduce((sum, size) => sum + size, 0);
    }
    get omissions() {
        return this.#omissions;
    }
    /** Where retained content is stored. */
    get directory() {
        return this.#directory;
    }
    /** The existing capture cleanup owner also retains failed inspection resources. */
    get resourceScope() {
        return this.#unclosed;
    }
    /**
     * Retry every handle whose close failed during a read. A handle that fails
     * again stays owned, and the rejection carries its exact cleanup lease.
     */
    close() {
        return this.#unclosed.retryCleanup();
    }
    /**
     * Remove every file this store wrote, then its content directory. Rejects
     * when the directory holds anything else or a removal fails.
     */
    async discard() {
        for (const path of this.#unpublished) {
            await rm(path, { force: true });
            this.#unpublished.delete(path);
        }
        for (const sha256 of this.#stored.keys()) {
            await rm(join(this.#directory, sha256), { force: true });
            this.#stored.delete(sha256);
        }
        this.#storedSizes.clear();
        await rmdir(this.#directory).catch((cause) => {
            if (cause.code !== "ENOENT")
                throw cause;
        });
    }
    /**
     * Copy one regular file if it is still the version the walk recorded and it
     * holds still while read. Content already stored costs no budget; a file
     * larger than the remaining budget is read only when stored content of the
     * same size could make it a duplicate.
     */
    async retain(path, expected, signal) {
        const read = await this.#read(path, expected, signal);
        if (read.kind === "omitted") {
            this.#omissions.push({ path, reason: read.reason });
            return read;
        }
        const stored = await this.retainBytes(read.bytes);
        if (stored.kind === "omitted")
            this.#omissions.push({ path, reason: stored.reason });
        return stored;
    }
    /** Store bytes already read, such as a verified apt key; over the per-file limit or the remaining budget they are omitted. */
    async retainBytes(bytes) {
        const sha256 = sha256Hex(bytes);
        const size = bytes.byteLength;
        if (size > this.#maxFileBytes)
            return { kind: "omitted", reason: "too_large" };
        if (this.#stored.has(sha256))
            return { kind: "retained", sha256, size };
        // Reserve before writing; a write that fails retains nothing.
        if (!this.#bytes.tryCharge(size))
            return { kind: "omitted", reason: "budget_exhausted" };
        try {
            await this.#publish(sha256, bytes);
        }
        catch (error) {
            this.#bytes.refund(size);
            throw error;
        }
        this.#stored.set(sha256, size);
        this.#storedSizes.add(size);
        return { kind: "retained", sha256, size };
    }
    async #publish(sha256, bytes) {
        const target = join(this.#directory, sha256);
        const partial = `${target}.partial`;
        const owner = new OwnedFileHandle(await open(partial, "wx", 0o600));
        this.#unpublished.add(partial);
        await withOwnedFileHandle(partial, owner, {
            retainFailedClose: (handle) => {
                this.#unclosed.retain({
                    kind: "file-handle",
                    resource: partial,
                    handle,
                });
            },
        }, (file) => file.writeFile(bytes));
        await rename(partial, target);
        this.#unpublished.delete(partial);
    }
    async #read(path, expected, signal) {
        if (expected.type !== "file")
            return { kind: "omitted", reason: "unreadable" };
        if (expected.size > this.#maxFileBytes)
            return { kind: "omitted", reason: "too_large" };
        // Over budget, only a size some stored content has can still be a duplicate.
        if (expected.size > this.#bytes.remaining &&
            !this.#storedSizes.has(expected.size))
            return { kind: "omitted", reason: "budget_exhausted" };
        const options = {
            symlinks: "reject",
            retainFailedClose: (handle) => {
                this.#unclosed.retain({ kind: "file-handle", resource: path, handle });
            },
            ...(signal === undefined ? {} : { signal }),
        };
        try {
            const bytes = await withOwnedRegularFile(path, options, async ({ handle }) => {
                const stats = await handle.stat({ bigint: true });
                if (Number(stats.size) !== expected.size ||
                    stats.mtimeNs.toString() !== expected.mtime_ns ||
                    `${stats.dev.toString()}:${stats.ino.toString()}` !== expected.inode)
                    throw new ChangedSinceWalk();
                return readStableFileBytes(handle, path, this.#maxFileBytes, options);
            });
            return { kind: "read", bytes };
        }
        catch (cause) {
            const cancellation = regularFileCancellation(cause);
            if (cancellation !== undefined)
                throw new ArtifactReaderFailure("cancelled", "Desktop content read cancelled", {
                    cause: cancellation.reason,
                    cancellation,
                });
            if (cause instanceof ChangedSinceWalk)
                return { kind: "omitted", reason: "changed_since_walk" };
            // The read finished or failed but its close did not; the owner is kept.
            if (cause instanceof RegularFileCleanupFailure)
                return { kind: "omitted", reason: "unreadable" };
            if (cause instanceof RegularFileChangedError)
                return { kind: "omitted", reason: "changed_during_read" };
            // The path was renamed, removed or retyped after the walk.
            if (isSelectedRegularFileError(cause))
                return { kind: "omitted", reason: "changed_since_walk" };
            if (cause instanceof RegularFileCapacityError)
                return { kind: "omitted", reason: "too_large" };
            if (cause instanceof NonRegularFileReadError ||
                DENIED_CODES.has(cause.code ?? ""))
                return { kind: "omitted", reason: "unreadable" };
            throw cause;
        }
    }
}
