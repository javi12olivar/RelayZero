import { decodeStrictUtf8 } from "../domain/strictUtf8.js";
import { opendir, readlink, realpath, stat } from "node:fs/promises";
import { basename, dirname, join, sep } from "node:path";
import { ArtifactReaderFailure, } from "../resources/index.js";
import { OwnedDirectoryHandle } from "../filesystem/OwnedDirectoryHandle.js";
import { absoluteCallerPath, appendCallerPath, } from "../filesystem/callerPath.js";
import { err, ok } from "../domain/result.js";
import { cancelled, entryFailure, failure, filesystemFailureDetail, safeSize, } from "./ReferenceSourceReaderErrors.js";
import { isPathWithinRoot } from "../domain/localPath.js";
import { pathFromRoot } from "./ReferenceSourceReaderPaths.js";
import { readStableFile } from "./ReferenceSourceReaderFile.js";
import { decodeDirectoryEntryName } from "../filesystem/decodeDirectoryEntryName.js";
import { isAborted, sameFile, validateDirectory, bigLstat, } from "./ReferenceSourceReaderValidate.js";
const recordDirectoryFailure = (state, absolute, code, message, localDiagnostic) => {
    if (absolute === state.root)
        state.rootFailure = { code, message: localDiagnostic ?? message };
    else
        state.entries.push(entryFailure(pathFromRoot(state.root, absolute), "directory", code, message, undefined, localDiagnostic));
};
/**
 * How many identity observations run ahead of their turn: the next pending
 * directories' opening admissions, the metadata of the next listed names
 * within a directory, and the closing admissions of directories already
 * enumerated. Each is a read-only lookup. Callbacks run and the first error
 * is returned in traversal order, every started lookup settles before the
 * read returns, and the inventory is sorted; only the syscalls overlap.
 * Measured on macOS (#11365), 4 gives the gain of 8, 16 and 32: libuv runs
 * four filesystem calls at once by default.
 */
const OBSERVATION_WINDOW = 4;
/** A started observation stays handled until its turn consumes it. */
const ahead = (observation) => {
    observation.catch(() => undefined);
    return observation;
};
/**
 * Start identity admission for the directories traversal pops next. Children
 * pushed later bury older siblings whose lookups may still run, so the count
 * of running lookups, not only the stack positions, is bounded.
 */
export const prefetchDirectoryValidations = (state) => {
    const { pending } = state;
    for (let index = pending.length - 1; index >= Math.max(0, pending.length - OBSERVATION_WINDOW) &&
        state.openingLookups < OBSERVATION_WINDOW; index -= 1) {
        const directory = pending[index];
        if (directory.validation !== undefined)
            continue;
        state.openingLookups += 1;
        directory.validation = ahead(validateDirectory(state.root, state.rootIdentity, directory.path, state.signal).finally(() => {
            state.openingLookups -= 1;
        }));
    }
};
export const traverseDirectory = async (state, current) => {
    const before = await (current.validation ??
        validateDirectory(state.root, state.rootIdentity, current.path, state.signal));
    if (!before.ok) {
        recordDirectoryFailure(state, current.path, before.code, before.message, before.localDiagnostic);
        return isAborted(state.signal)
            ? err(cancelled(state.signal))
            : ok(undefined);
    }
    if (isAborted(state.signal))
        return err(cancelled(state.signal));
    const directories = [];
    let readFailure;
    let readFailureCause;
    const recordReadFailure = (detail) => {
        recordDirectoryFailure(state, current.path, "io", detail.message, detail.localDiagnostic);
        return detail;
    };
    let unrepresentableNameCount = 0;
    let firstUnrepresentableNameHex;
    let handle;
    try {
        // Preserve directory-entry identity until UTF-8 validity is established.
        // Node's opendir accepts this byte-preserving encoding; @types/node's
        // OpenDirOptions currently narrows it to text encodings.
        handle = await opendir(current.path, {
            encoding: "buffer",
        });
    }
    catch (cause) {
        readFailureCause = { value: cause };
        if (current.path === state.root)
            state.rootFailureCause = readFailureCause;
        readFailure = recordReadFailure(directoryReadFailure(cause));
    }
    if (handle !== undefined) {
        const owner = new OwnedDirectoryHandle(handle);
        let result = ok(undefined);
        let cleanup;
        // Names listed ahead of processing, each with its metadata lookup started.
        const listed = [];
        let listingComplete = false;
        // A listing failure takes effect after the names listed before it, as if
        // each had been processed before the next read.
        let listingFailure;
        try {
            // A directory that cannot be opened retains its ordinary partial-entry
            // failure; only an opened directory needs policy before enumeration.
            result = isAborted(state.signal)
                ? err(cancelled(state.signal))
                : ((await state.beforeDirectory?.(pathFromRoot(state.root, current.path))) ?? ok(undefined));
            if (result.ok && isAborted(state.signal))
                result = err(cancelled(state.signal));
            while (result.ok) {
                while (!listingComplete && listed.length < OBSERVATION_WINDOW) {
                    let child;
                    try {
                        child = await handle.read();
                    }
                    catch (cause) {
                        listingFailure = {
                            detail: directoryReadFailure(cause),
                            cause: { value: cause },
                        };
                        listingComplete = true;
                        break;
                    }
                    if (child === null) {
                        listingComplete = true;
                        break;
                    }
                    if (!Buffer.isBuffer(child.name)) {
                        listingFailure = {
                            detail: {
                                message: "Directory entry name was not returned as raw bytes",
                            },
                        };
                        listingComplete = true;
                        break;
                    }
                    const decoded = decodeDirectoryEntryName(child.name);
                    if (decoded.kind === "unrepresentable") {
                        unrepresentableNameCount += 1;
                        firstUnrepresentableNameHex ??= decoded.rawHex;
                        continue;
                    }
                    listed.push({
                        name: decoded.name,
                        metadata: ahead(readMetadata(join(current.path, decoded.name))),
                    });
                }
                const next = listed.shift();
                if (next === undefined)
                    break;
                result = await processEntry(state, current, next.name, next.metadata, directories);
            }
            if (result.ok && listingFailure !== undefined) {
                readFailureCause = listingFailure.cause;
                if (current.path === state.root && readFailureCause !== undefined)
                    state.rootFailureCause = readFailureCause;
                readFailure = recordReadFailure(listingFailure.detail);
            }
        }
        finally {
            await Promise.allSettled(listed.map(({ metadata }) => metadata));
            cleanup = await state.resources.release({
                kind: "directory-handle",
                handle: owner,
                resource: current.path,
            });
        }
        if (cleanup.kind === "failed") {
            const observation = ArtifactReaderFailure.cleanupObservation(cleanup.cause, current.path);
            const previous = result.ok ? undefined : result.error.cleanup;
            const primary = result.ok
                ? readFailure !== undefined
                    ? {
                        ...failure("io", readFailure.localDiagnostic ?? readFailure.message),
                        ...(readFailureCause === undefined
                            ? {}
                            : { cause: readFailureCause.value }),
                    }
                    : isAborted(state.signal)
                        ? cancelled(state.signal)
                        : failure("io", `Reference directory cleanup failed: ${current.path}`)
                : result.error;
            return err({
                ...primary,
                cleanup: previous === undefined
                    ? observation
                    : {
                        reason: `${previous.reason}; ${observation.reason}`,
                        resources: [
                            ...new Set([...previous.resources, ...observation.resources]),
                        ],
                    },
                cause: Object.hasOwn(primary, "cause") ? primary.cause : cleanup.cause,
            });
        }
        if (!result.ok)
            return result;
    }
    if (readFailure !== undefined) {
        scheduleObservedDirectories(state, directories);
        return isAborted(state.signal)
            ? err({
                ...failure("io", readFailure.localDiagnostic ?? readFailure.message),
                ...(readFailureCause === undefined
                    ? {}
                    : { cause: readFailureCause.value }),
            })
            : ok(undefined);
    }
    if (isAborted(state.signal))
        return err(cancelled(state.signal));
    // The closing admission decides only this directory's own record; its
    // children are scheduled either way, so traversal continues while it runs.
    const settled = validateDirectory(state.root, state.rootIdentity, current.path, state.signal).then((after) => {
        if (!after.ok || !sameFile(before.stats, after.stats))
            recordDirectoryFailure(state, current.path, after.ok ? "changed" : after.code, after.ok ? "Directory changed while it was read" : after.message, after.ok ? undefined : after.localDiagnostic);
        else if (isAborted(state.signal))
            return;
        else if (unrepresentableNameCount > 0)
            recordDirectoryFailure(state, current.path, "unsupported", `Directory contains ${String(unrepresentableNameCount)} entry name(s) that are not valid UTF-8; no filesystem operations were performed for them. First raw basename bytes: ${firstUnrepresentableNameHex ?? "unknown"}.`);
        else if (current.path !== state.root)
            state.entries.push({
                status: "read",
                kind: "directory",
                path: pathFromRoot(state.root, current.path),
            });
    });
    scheduleObservedDirectories(state, directories);
    state.settling.push(ahead(settled));
    if (state.settling.length > OBSERVATION_WINDOW)
        await state.settling.shift();
    return ok(undefined);
};
/**
 * Wait for every directory's closing admission. One that threw precedes, in
 * traversal order, any result returned after it, so its throw wins.
 */
export const settleDirectoryAdmissions = async (state) => {
    const settled = await Promise.allSettled(state.settling.splice(0));
    const thrown = settled.find((outcome) => outcome.status === "rejected");
    if (thrown !== undefined)
        throw thrown.reason;
};
const scheduleObservedDirectories = (state, directories) => {
    for (const directory of directories.reverse())
        state.pending.push(directory);
};
const directoryReadFailure = (cause) => {
    const detail = filesystemFailureDetail(cause, "Directory could not be read");
    if (detail === undefined)
        throw cause;
    return detail;
};
const readMetadata = async (path) => {
    try {
        return { ok: true, value: await bigLstat(path) };
    }
    catch (cause) {
        const detail = filesystemFailureDetail(cause, "Entry metadata could not be read");
        if (detail === undefined)
            throw cause;
        return { ok: false, ...detail };
    }
};
const processEntry = async (state, current, name, metadataLookup, directories) => {
    const absolute = join(current.path, name);
    const path = pathFromRoot(state.root, absolute);
    // The lookup started when the name was listed; a failure it observed is
    // retained even if cancellation arrived meanwhile.
    const metadata = await metadataLookup;
    if (!metadata.ok) {
        const excluded = applyExclusion(state.shouldExclude, path, "unknown");
        if (!excluded.ok)
            return {
                ok: false,
                error: failure("io", "Reference source exclusion check failed"),
            };
        if (excluded.value) {
            state.exclusions.push({ path, kind: "unknown" });
            return { ok: true, value: undefined };
        }
        state.entries.push(entryFailure(path, "unknown", "io", metadata.message, undefined, metadata.localDiagnostic));
        return isAborted(state.signal)
            ? err(cancelled(state.signal))
            : ok(undefined);
    }
    if (isAborted(state.signal))
        return err(cancelled(state.signal));
    const kind = metadata.value.isSymbolicLink()
        ? "symlink"
        : metadata.value.isDirectory()
            ? "directory"
            : metadata.value.isFile()
                ? "file"
                : "other";
    const excluded = applyExclusion(state.shouldExclude, path, kind);
    if (!excluded.ok)
        return {
            ok: false,
            error: {
                tag: "reference-source-reader",
                code: "io",
                message: "Reference source exclusion check failed",
            },
        };
    if (excluded.value) {
        state.exclusions.push({ path, kind });
        return { ok: true, value: undefined };
    }
    if (isAborted(state.signal))
        return { ok: false, error: cancelled(state.signal) };
    if (kind === "symlink")
        state.entries.push(await readStableSymlinkTarget(absolute, path, metadata.value, state.signal, () => readSymlinkTarget(state.root, absolute, path)));
    else if (kind === "directory") {
        directories.push({ path: absolute });
    }
    else if (kind !== "file")
        state.entries.push(entryFailure(path, "other", "unsupported", "Entry is not a regular file", safeSize(metadata.value.size)));
    else
        return processFileEntry(state, absolute, path, metadata.value);
    return { ok: true, value: undefined };
};
const processFileEntry = async (state, absolute, path, metadata) => {
    const result = await readStableFile({
        resources: state.resources,
        root: state.root,
        rootIdentity: state.rootIdentity,
        absolute,
        path,
        expected: metadata,
        ...(state.signal === undefined ? {} : { signal: state.signal }),
    });
    const { entry } = result;
    if (entry.status === "read" && entry.kind === "file")
        state.bytesRead += entry.bytes.byteLength;
    state.entries.push(entry);
    if (result.cleanup !== undefined)
        return err({
            tag: "reference-source-reader",
            code: entry.status === "failed" && entry.code === "cancelled"
                ? "cancelled"
                : "io",
            message: entry.status === "failed"
                ? entry.message
                : `Reference file cleanup failed: ${path}`,
            cleanup: result.cleanup,
            ...(entry.status === "failed" &&
                entry.code === "cancelled" &&
                state.signal?.aborted === true
                ? { cause: state.signal.reason }
                : {}),
        });
    return ok(undefined);
};
/** Bracket target observation with the symlink identity captured at enumeration. */
export const readStableSymlinkTarget = async (absolute, path, expected, signal, readTarget) => {
    try {
        const before = await bigLstat(absolute);
        if (isAborted(signal))
            return cancelledSymlink(path);
        if (!before.isSymbolicLink() || !sameFile(expected, before))
            return changedSymlink(path);
        const observed = await readTarget();
        if (observed.status === "failed")
            return observed;
        if (isAborted(signal))
            return cancelledSymlink(path);
        const after = await bigLstat(absolute);
        if (isAborted(signal))
            return cancelledSymlink(path);
        if (!after.isSymbolicLink() || !sameFile(expected, after))
            return changedSymlink(path);
        return observed;
    }
    catch (cause) {
        const code = cause instanceof Error ? Reflect.get(cause, "code") : undefined;
        if (code === "ENOENT" || code === "ENOTDIR")
            return changedSymlink(path);
        const detail = filesystemFailureDetail(cause, "Symbolic link target could not be read safely");
        if (detail === undefined)
            throw cause;
        return entryFailure(path, "symlink", "io", detail.message, undefined, detail.localDiagnostic);
    }
};
const cancelledSymlink = (path) => entryFailure(path, "symlink", "cancelled", "Symlink inspection cancelled");
const changedSymlink = (path) => entryFailure(path, "symlink", "changed", "Symbolic link changed while its target was read");
const readSymlinkTarget = async (root, absolute, path) => {
    let rawTarget;
    try {
        // Keep the symlink's source bytes until UTF-8 validity is known. The
        // default string encoding can alias an invalid target with a real U+FFFD
        // sibling during the subsequent path lookup.
        rawTarget = await readlink(absolute, { encoding: "buffer" });
    }
    catch (cause) {
        // POSIX readlink reports EINVAL when the observed link became a non-link.
        // Keep this classification at the syscall, rather than hiding EINVAL from
        // unrelated metadata or target-resolution operations.
        if (cause instanceof Error && Reflect.get(cause, "code") === "EINVAL")
            return changedSymlink(path);
        throw cause;
    }
    let target;
    try {
        target = decodeStrictUtf8(rawTarget, "preserve");
    }
    catch {
        return entryFailure(path, "symlink", "unsupported", `Symlink target is not valid UTF-8 (raw target bytes: ${rawTarget.toString("hex")})`);
    }
    const nativeTarget = absoluteCallerPath(target, { cwd: dirname(absolute) });
    let canonicalTarget;
    try {
        // The filesystem resolves parent segments after following symlinks. A
        // lexical containment check can both select a decoy and misclassify scope.
        // realpath can collapse file/.. on some hosts even though native lookup
        // rejects that traversal, so establish existence through stat first.
        await stat(nativeTarget);
        canonicalTarget = await realpath(nativeTarget);
    }
    catch (cause) {
        const code = cause instanceof Error ? Reflect.get(cause, "code") : undefined;
        if (code !== "ENOENT" && code !== "ENOTDIR")
            throw cause;
        return {
            status: "read",
            kind: "symlink",
            path,
            target: await missingSymlinkPath(root, nativeTarget, code === "ENOENT"),
            targetState: "missing",
        };
    }
    const internal = isPathWithinRoot(root, canonicalTarget);
    return {
        status: "read",
        kind: "symlink",
        path,
        target: internal ? pathFromRoot(root, canonicalTarget) : canonicalTarget,
        targetState: internal ? "internal" : "external",
    };
};
/** Preserve the native spelling when a missing parent prevents canonical lookup. */
const missingSymlinkPath = async (root, target, missingFinalComponent) => {
    if (basename(target) === "..")
        return target;
    let parent;
    try {
        await stat(dirname(target));
        parent = await realpath(dirname(target));
    }
    catch (cause) {
        const code = cause instanceof Error ? Reflect.get(cause, "code") : undefined;
        if (code === "ENOENT" || code === "ENOTDIR")
            return target;
        throw cause;
    }
    const candidate = appendCallerPath(parent, basename(target));
    const directoryRequired = target.endsWith(sep);
    if (directoryRequired && !missingFinalComponent)
        return `${candidate}${sep}`;
    const internal = isPathWithinRoot(root, candidate);
    const scoped = internal ? pathFromRoot(root, candidate) : candidate;
    return directoryRequired ? `${scoped}${internal ? "/" : sep}` : scoped;
};
const applyExclusion = (shouldExclude, path, kind) => {
    try {
        return { ok: true, value: shouldExclude?.(path, kind) === true };
    }
    catch (cause) {
        // Exclusion predicates are caller-supplied; a throwing predicate fails
        // closed and the caller-visible `{ ok: false }` preserves the rejection
        // without propagating an arbitrary predicate cause.
        void cause;
        return { ok: false };
    }
};
