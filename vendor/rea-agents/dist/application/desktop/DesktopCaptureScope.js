import { lstat } from "node:fs/promises";
import { basename, isAbsolute } from "node:path";
import { isWithinAny } from "../../domain/desktop/desktopStateDiff.js";
import { SQLITE_SIDECARS } from "../../domain/desktop/stateFormats.js";
import { absoluteCallerPath } from "../../filesystem/callerPath.js";
import { canonicalCallerPath } from "../../filesystem/canonicalCallerPath.js";
const unique = (paths) => [...new Set(paths)];
/** A discovered state path whose physical file cannot be established. */
const unresolvedStateDirectory = (cause) => {
    const code = cause.code;
    return (code === "ENOENT" ||
        code === "EACCES" ||
        code === "EPERM" ||
        code === "ENOTDIR" ||
        code === "ELOOP");
};
/**
 * Canonicalize a discovered state directory when the filesystem can. An
 * unreadable path or dangling symlink stays the discovered absolute path so
 * the capture can publish that unknown instead of aborting.
 */
const canonicalStateDirectory = async (path) => {
    try {
        return await canonicalCallerPath(path);
    }
    catch (cause) {
        if (!unresolvedStateDirectory(cause))
            throw cause;
        return absoluteCallerPath(path);
    }
};
/** Whether the walked path is a directory. A missing path is not one, matching the sidecar decision. */
const pathKind = async (path) => (await lstat(path).then((stats) => stats.isDirectory(), (cause) => {
    if (cause.code === "ENOENT")
        return false;
    throw cause;
}))
    ? "directory"
    : "file";
/**
 * Paths in their physical spelling, so walks and exclusions agree; a selected
 * path keeps the spelling it was named by too, which a link would lose. An
 * absolute argument becomes a content root unless it is `/` or contains the
 * home directory, which would retain and walk whole trees. A selected path
 * that is not a directory brings its SQLite sidecars as content roots too.
 */
export const captureScope = async (request, inventory, home, output) => {
    const canonical = (paths) => Promise.all(paths.map((path) => canonicalCallerPath(path)));
    const named = (paths) => Promise.all(paths.map(async (path) => ({
        path: absoluteCallerPath(path),
        physical: await canonicalCallerPath(path),
    })));
    const stateDirectories = await Promise.all(inventory.state_directories.map((entry) => canonicalStateDirectory(entry.path)));
    const argumentPaths = await named(request.arguments.filter((value) => isAbsolute(value)));
    const broadArguments = unique(argumentPaths
        .map(({ physical }) => physical)
        .filter((path) => isWithinAny(home, [path])));
    const selectedPaths = await Promise.all([
        ...new Map([
            ...(await named(request.statePaths)),
            ...argumentPaths.filter(({ physical }) => !broadArguments.includes(physical)),
        ].map((entry) => [entry.path, entry])).values(),
    ].map(async (entry) => ({
        ...entry,
        kind: await pathKind(entry.physical),
    })));
    const selected = unique(selectedPaths.map(({ physical }) => physical));
    // A database selected on its own is unreadable without its logs. A directory
    // is not a database, so a neighbor named like a log stays a normal file.
    const contentRoots = unique([
        ...stateDirectories,
        ...selected,
        ...selectedPaths.flatMap(({ physical, kind }) => kind === "directory"
            ? []
            : SQLITE_SIDECARS.map(({ suffix }) => `${physical}${suffix}`)),
    ]);
    return {
        scope: {
            roots: unique([
                home,
                ...contentRoots.filter((path) => !isWithinAny(path, [home])),
            ]),
            contentRoots,
            stateDirectories,
            excluded: unique([output, ...(await canonical(request.excludes))]),
            maxEntries: request.maxEntries,
        },
        selectedPaths,
        broadArguments,
    };
};
/**
 * Window names that mark a window as the application's: the entry's
 * `StartupWMClass`, its full id and last id part, the executable's name and a
 * flatpak's application id. A flatpak's window pids are sandbox pids, so its
 * windows are matched by name only.
 */
export const applicationWindowMatching = (inventory) => {
    const flatpak = inventory.package.kind === "flatpak";
    const executable = basename(inventory.executable.path);
    return {
        names: new Set([
            inventory.desktop_entry?.startup_wm_class,
            flatpak && executable === "flatpak" ? null : executable,
            inventory.desktop_entry?.id,
            inventory.desktop_entry?.id?.split(".").at(-1),
            flatpak ? inventory.package.name : null,
        ]
            .filter((name) => typeof name === "string" && name.length > 0)
            .map((name) => name.toLowerCase())),
        byPid: !flatpak,
    };
};
