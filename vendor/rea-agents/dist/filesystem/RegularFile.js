import { constants } from "node:fs";
import { constants as osConstants } from "node:os";
import { lstat, open, realpath, stat } from "node:fs/promises";
import { settleChangeTimeBaseline } from "./ChangeTimeBaseline.js";
import { OwnedFileHandle } from "./OwnedFileHandle.js";
/** Cancellation observed at a file operation's explicit checkpoint. */
export class RegularFileOperationCancelled extends Error {
    reason;
    _tag = "RegularFileOperationCancelled";
    constructor(reason) {
        super("Regular file operation cancelled", { cause: reason });
        this.reason = reason;
        this.name = this._tag;
    }
}
export const assertRegularFileActive = (signal) => {
    if (signal?.aborted === true)
        throw new RegularFileOperationCancelled(signal.reason);
};
/** Identifies a selected path that cannot be read as one regular file. */
export class NonRegularFileReadError extends Error {
    path;
    code;
    constructor(path, directory) {
        super(`Selected input must be a regular file: ${path}`);
        this.path = path;
        this.name = "NonRegularFileReadError";
        this.code = directory ? "EISDIR" : "ENOTFILE";
    }
}
/** O_NOFOLLOW refused a selected leaf observed as a symbolic link. */
export class RejectedRegularFileSymlink extends Error {
    path;
    resolvedPath;
    code = "ELOOP";
    constructor(path, resolvedPath, cause) {
        super(`Selected path is a symbolic link and is not admitted: ${path}`, {
            cause,
        });
        this.path = path;
        this.resolvedPath = resolvedPath;
        this.name = "RejectedRegularFileSymlink";
    }
}
/** Resolve recovery only when the selected path currently names a regular file. */
export const resolvedRegularFile = async (path, fileSystem = { realpath, lstat }) => {
    try {
        const resolved = await fileSystem.realpath?.(path);
        if (resolved === undefined)
            return undefined;
        const target = await fileSystem.lstat(resolved);
        return target.isFile() && !target.isSymbolicLink() ? resolved : undefined;
    }
    catch {
        return undefined;
    }
};
/** Admission failed and the opened descriptor could not be confirmed closed. */
export class RegularFileAdmissionFailure extends Error {
    path;
    cleanupCause;
    owner;
    cause;
    constructor(path, admissionCause, cleanupCause, owner) {
        super(`Selected input failed admission and its descriptor close failed: ${path}`);
        this.path = path;
        this.cleanupCause = cleanupCause;
        this.owner = owner;
        this.name = "RegularFileAdmissionFailure";
        this.cause = admissionCause;
    }
}
/** A regular input no longer matches the extent or identity admitted for reading. */
export class RegularFileChangedError extends Error {
    path;
    code = "ESTALE";
    constructor(path, options) {
        super(`Selected input changed while being read: ${path}`, options);
        this.path = path;
        this.name = "RegularFileChangedError";
    }
}
/** Errnos establishing that no file resolves at the path as written. */
const UNRESOLVED_PATH_ERROR_CODES = new Set([
    "ENOENT",
    "ENOTDIR",
    "ELOOP",
    "ENAMETOOLONG",
]);
const SELECTED_REGULAR_FILE_ERROR_CODES = new Set([
    ...UNRESOLVED_PATH_ERROR_CODES,
    "EISDIR",
    "ENOTFILE",
    "ESTALE",
]);
/** Whether an errno identifies the selected path or file itself. */
export const isSelectedRegularFileError = (cause) => {
    if (!(cause instanceof Error))
        return false;
    const code = Reflect.get(cause, "code");
    return (typeof code === "string" && SELECTED_REGULAR_FILE_ERROR_CODES.has(code));
};
/** Admit a non-blocking regular-file descriptor with its validated initial facts. */
export const openRegularFile = async (path, options) => {
    assertRegularFileActive(options.signal);
    const handle = await open(path, constants.O_RDONLY |
        (constants.O_NONBLOCK ?? 0) |
        (constants.O_NOCTTY ?? 0) |
        (options.symlinks === "reject" ? (constants.O_NOFOLLOW ?? 0) : 0)).catch(async (cause) => {
        if (options.symlinks === "reject" &&
            cause instanceof Error &&
            "code" in cause &&
            cause.code === "ELOOP") {
            const named = await lstat(path).catch(() => undefined);
            if (named?.isSymbolicLink())
                throw new RejectedRegularFileSymlink(path, await resolvedRegularFile(path), cause);
        }
        const nonRegular = await nonRegularOpenFailure(path, options.symlinks, cause);
        if (nonRegular === undefined)
            throw cause;
        throw nonRegular;
    });
    const owner = new OwnedFileHandle(handle);
    try {
        assertRegularFileActive(options.signal);
        // The admitted facts become the baseline every later comparison tests
        // against. External files wait out a Windows ChangeTime that can still
        // move. A private file REA just wrote is recorded as written: settling
        // each one costs about a second, and a compressed PYZ spool does that
        // once per image. The first observation still validates the file type,
        // so a directory is refused before any settling delay.
        const readMetadata = async () => {
            assertRegularFileActive(options.signal);
            const observed = await handle.stat();
            if (!observed.isFile())
                throw new NonRegularFileReadError(path, observed.isDirectory());
            return observed;
        };
        const metadata = options.changeTime === "as-written"
            ? await readMetadata()
            : await settleChangeTimeBaseline(readMetadata, {
                signal: options.signal,
                // Callers match on this type to tell cancellation from a read fault.
                cancellationError: (reason) => new RegularFileOperationCancelled(reason),
            });
        assertRegularFileActive(options.signal);
        // O_NOFOLLOW is unavailable on Windows. Recheck the name only on hosts
        // where open could have followed a symlink, while the descriptor is owned.
        if (options.symlinks === "reject" && (constants.O_NOFOLLOW ?? 0) === 0) {
            const named = await lstat(path);
            if (named.isSymbolicLink())
                throw new NonRegularFileReadError(path, false);
            if (!sameRegularFileState(metadata, named))
                throw new RegularFileChangedError(path);
            assertRegularFileActive(options.signal);
        }
        return { handle, initial: metadata };
    }
    catch (cause) {
        try {
            await owner.close();
        }
        catch (cleanupCause) {
            throw new RegularFileAdmissionFailure(path, cause, cleanupCause, owner);
        }
        throw cause;
    }
};
/**
 * Some non-regular files cannot be opened at all: a Unix socket fails with
 * ENXIO on Linux and EOPNOTSUPP on macOS. Confirm such a failure against the
 * path's own metadata before reporting a non-regular selection.
 */
const nonRegularOpenFailure = async (path, symlinks, cause) => {
    // Only errors meaning "this file type cannot be opened" are reclassified;
    // permission, symlink-rejection and resource failures keep their codes.
    if (!isUnopenableFileTypeError(cause))
        return undefined;
    const metadata = await (symlinks === "reject" ? lstat : stat)(path).catch(() => undefined);
    if (metadata === undefined || metadata.isFile())
        return undefined;
    return new NonRegularFileReadError(path, metadata.isDirectory());
};
// Match by errno: libuv has no name for macOS EOPNOTSUPP (102) and reports
// "Unknown system error -102" as its code.
const errnos = osConstants.errno;
const UNOPENABLE_FILE_TYPE_ERRNOS = new Set([errnos.ENXIO, errnos.EOPNOTSUPP, errnos.ENOTSUP].flatMap((errno) => errno === undefined ? [] : [-errno]));
const isUnopenableFileTypeError = (cause) => cause instanceof Error &&
    "errno" in cause &&
    typeof cause.errno === "number" &&
    UNOPENABLE_FILE_TYPE_ERRNOS.has(cause.errno);
export const regularFileState = (stats) => ({
    dev: stats.dev,
    ino: stats.ino,
    size: stats.size,
    mode: stats.mode,
    mtimeMs: stats.mtimeMs,
    ctimeMs: stats.ctimeMs,
});
/** Compare one regular file's identity and mutable metadata across a read. */
export const sameRegularFileState = (expected, observed) => observed.isFile() &&
    expected.dev === observed.dev &&
    expected.ino === observed.ino &&
    expected.size === observed.size &&
    expected.mode === observed.mode &&
    ("mtimeNs" in expected && "mtimeNs" in observed
        ? expected.mtimeNs === observed.mtimeNs &&
            expected.ctimeNs === observed.ctimeNs
        : expected.mtimeMs === observed.mtimeMs &&
            expected.ctimeMs === observed.ctimeMs);
/** Validate an admitted descriptor and selected name at the same precision as admission. */
export const assertStableRegularFileIdentity = async (file, path, before, options) => {
    assertRegularFileActive(options.signal);
    const bigint = typeof before.dev === "bigint";
    const named = async () => {
        try {
            const lookup = options.symlinks === "follow" ? stat : lstat;
            return bigint ? await lookup(path, { bigint: true }) : await lookup(path);
        }
        catch (cause) {
            if (isSelectedRegularFileError(cause))
                throw new RegularFileChangedError(path, { cause });
            throw cause;
        }
    };
    const selected = await named();
    assertRegularFileActive(options.signal);
    const opened = await file.stat({ bigint });
    assertRegularFileActive(options.signal);
    if (!sameRegularFileState(before, opened) ||
        !sameRegularFileState(before, selected))
        throw new RegularFileChangedError(path);
};
