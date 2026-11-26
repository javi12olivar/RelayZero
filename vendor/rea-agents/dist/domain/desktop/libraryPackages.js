import { posix } from "node:path";
import { compositeKey } from "../unicodeCodePointOrder.js";
import { fromUbuntuNobleArchive } from "./appExportInstall.js";
import { isWithinAny } from "./desktopStateDiff.js";
const CACHE_LINE = /^\s+(?<soname>\S+) \((?<flags>[^)]*)\) => (?<path>\/.+)$/u;
/** The entries of `ldconfig -p` output. */
export const parseLinkerCache = (output) => output.split("\n").flatMap((line) => {
    const groups = CACHE_LINE.exec(line)?.groups;
    return groups?.soname === undefined || groups.path === undefined
        ? []
        : [
            {
                soname: groups.soname,
                flags: (groups.flags ?? "").split(",").map((flag) => flag.trim()),
                path: groups.path,
            },
        ];
});
/** The flag `ldconfig -p` marks a library for a 64-bit ELF machine with. */
const CACHE_FLAGS = new Map([
    [62, "x86-64"],
    [183, "AArch64"],
]);
const MACHINE_FLAGS = new Set(CACHE_FLAGS.values());
const cachedPaths = (cache, soname, machine) => {
    const matching = cache.filter((entry) => entry.soname === soname);
    const flag = CACHE_FLAGS.get(machine);
    if (flag !== undefined)
        return matching
            .filter((entry) => entry.flags.includes(flag))
            .map((entry) => entry.path);
    const unclassified = matching.filter((entry) => !entry.flags.some((name) => MACHINE_FLAGS.has(name)));
    return (unclassified.length > 0 ? unclassified : matching).map((entry) => entry.path);
};
const ORIGIN_TOKEN = /\$(?:ORIGIN(?![A-Za-z0-9_])|\{ORIGIN\})/gu;
/** Expand only the declaration: dollars in the owner's directory are literal data. */
const expandOrigin = (owner, declaration) => declaration.replace(ORIGIN_TOKEN, () => posix.dirname(owner));
/** Absolute directories with `$ORIGIN` expanded to the owner's folder; relative and other dynamic-token paths are left out. */
const expanded = (owner, directories) => directories
    // Check tokens before expansion: dollars in the owner's directory are data.
    .filter((path) => !path.replace(ORIGIN_TOKEN, "").includes("$"))
    .map((path) => expandOrigin(owner, path))
    .filter((path) => path.startsWith("/"));
/**
 * Where ld.so looks for an object's needed libraries before its cache: an
 * object without RUNPATH uses the RPATH of itself and of each object up its
 * loader chain to the executable, and then its RUNPATH.
 */
const searchDirectories = (object) => {
    const rpaths = [];
    if (object.dependencies.runpath === undefined)
        for (let at = object; at; at = at.loader)
            rpaths.push(...expanded(at.path, at.dependencies.rpath));
    return [
        ...new Set([
            ...rpaths,
            ...expanded(object.path, object.dependencies.runpath ?? []),
        ]),
    ];
};
/** Preserve filesystem lookup spelling until the host resolves its target. */
async function* libraryCandidates(request, directories, machine, cache, host) {
    if (request.startsWith("/")) {
        yield { path: request, unprobed: false };
        return;
    }
    const unprobed = [];
    if (!request.includes("/"))
        for (const directory of directories) {
            const candidate = `${directory}/${request}`;
            const probe = await host.isFile(candidate);
            if (probe.kind === "file") {
                if (probe.isFile)
                    yield { path: candidate, unprobed: false };
            }
            else if (probe.unreachable)
                unprobed.push(candidate);
            else
                yield { path: candidate, unprobed: false };
        }
    for (const path of cachedPaths(cache, request, machine))
        yield { path, unprobed: false };
    for (const path of unprobed)
        yield { path, unprobed: true };
}
/**
 * Walk DT_NEEDED breadth first from the executable: each soname is looked up
 * in the RPATH and RUNPATH directories ld.so searches for the needing object,
 * then the linker cache. Filesystem-resolved paths own identity and containment;
 * original lookup paths retain the declaring object's ORIGIN semantics.
 * Libraries in the executable's own folder are the application's and are
 * walked but not listed. At most `limit` sonames are resolved.
 */
export const libraryClosure = async (executable, cache, host, limit) => {
    // Reuse admitted path facts only within this walk and by exact spelling.
    // Failures stay retryable within the walk budget. Bound the cache separately
    // because multiple spellings can resolve to the same request identity.
    const resolvedLookups = new Map();
    const seen = new Set();
    const closure = {
        requiredAliases: [],
        libraries: [],
        missing: [],
        unreadable: [],
        truncated: false,
    };
    const rootPath = await host.resolvePath(executable.path);
    if (rootPath === undefined) {
        closure.unreadable.push({
            path: executable.path,
            reason: "the executable's filesystem path could not be resolved",
        });
        return closure;
    }
    const root = { ...executable, path: rootPath.resolvedPath };
    const ownFolder = posix.dirname(root.path);
    const queue = [{ ...root, loader: undefined }];
    // Every required lookup can have its own package; the same resolved object
    // supplies its dependency declarations only once, through its first load path.
    const walkedObjects = new Set([rootPath.fileIdentity]);
    const retainedAliases = new Set();
    for (const object of queue) {
        const directories = searchDirectories(object);
        for (const soname of object.dependencies.needed) {
            // DT_NEEDED tokens belong to the declaring object, before request identity
            // is shared across the closure. Identical source spellings can name two files.
            const expandedRequest = expandOrigin(object.path, soname);
            const unsupported = expandedRequest !== soname &&
                soname.replace(ORIGIN_TOKEN, "").includes("$");
            const direct = !unsupported && expandedRequest.startsWith("/");
            let directPath = direct
                ? resolvedLookups.get(expandedRequest)
                : undefined;
            if (direct && directPath === undefined) {
                // Cached facts can still identify duplicates at capacity. A new
                // filesystem lookup needs room in the dependency budget.
                if (seen.size >= limit)
                    return { ...closure, truncated: true };
                directPath = await host.resolvePath(expandedRequest);
                if (directPath !== undefined && resolvedLookups.size < limit)
                    resolvedLookups.set(expandedRequest, directPath);
            }
            const request = directPath?.path ?? expandedRequest;
            // An unresolved declaration cannot claim a known literal lookup's identity.
            const key = unsupported || (direct && directPath === undefined)
                ? compositeKey(["unresolved", object.path, soname])
                : compositeKey([
                    "lookup",
                    request,
                    directPath?.ownershipPath ?? request,
                    ...(directPath?.requiredAliases.flatMap((alias) => [
                        alias.path,
                        alias.ownershipPath,
                    ]) ?? []),
                ]);
            if (seen.has(key))
                continue;
            if (seen.size >= limit)
                return { ...closure, truncated: true };
            seen.add(key);
            if (unsupported) {
                closure.unreadable.push({
                    path: object.path,
                    reason: `DT_NEEDED ${JSON.stringify(soname)} contains an unsupported dynamic token or dollar expression alongside $ORIGIN`,
                });
                continue;
            }
            if (direct && directPath === undefined) {
                closure.unreadable.push({
                    path: expandedRequest,
                    reason: "the library's filesystem path could not be resolved",
                });
                continue;
            }
            let selected;
            let unresolved = false;
            // Denied search directories remain behind reachable candidates.
            let unprobed;
            for await (const { path: candidate, unprobed: couldNotProbe, } of libraryCandidates(request, directories, object.dependencies.machine, cache, host)) {
                const resolved = request.startsWith("/")
                    ? directPath
                    : await host.resolvePath(candidate);
                if (resolved === undefined) {
                    if (couldNotProbe) {
                        unprobed ??= {
                            path: candidate,
                            reason: "the library's filesystem path could not be resolved",
                        };
                        continue;
                    }
                    closure.unreadable.push({
                        path: candidate,
                        reason: "the library's filesystem path could not be resolved",
                    });
                    unresolved = true;
                    break;
                }
                const { path, resolvedPath } = resolved;
                const dependencies = await host.dependencies(resolvedPath, object.dependencies);
                if (!dependencies.ok && dependencies.error.identity === null) {
                    if (couldNotProbe) {
                        unprobed ??= { path, reason: dependencies.error.reason };
                        continue;
                    }
                    // A failed identity read does not prove this candidate can be skipped,
                    // or that its package belongs to the executable's loaded closure.
                    closure.unreadable.push({
                        path,
                        reason: dependencies.error.reason,
                    });
                    unresolved = true;
                    break;
                }
                if (!dependencies.ok && dependencies.error.kind === "incompatible") {
                    if (request.startsWith("/")) {
                        closure.unreadable.push({
                            path,
                            reason: dependencies.error.reason,
                        });
                        unresolved = true;
                        break;
                    }
                    continue;
                }
                selected = {
                    path,
                    resolvedPath,
                    fileIdentity: resolved.fileIdentity,
                    lookupPath: request.startsWith("/") ? expandedRequest : candidate,
                    ownershipPath: resolved.ownershipPath,
                    requiredAliases: resolved.requiredAliases,
                    dependencies,
                };
                break;
            }
            if (selected === undefined) {
                if (unprobed !== undefined)
                    closure.unreadable.push(unprobed);
                else if (!unresolved)
                    closure.missing.push(soname);
                continue;
            }
            const { path, resolvedPath, fileIdentity, lookupPath, dependencies } = selected;
            for (const alias of selected.requiredAliases) {
                const key = compositeKey([alias.path, alias.ownershipPath]);
                if (isWithinAny(alias.path, [ownFolder]) || retainedAliases.has(key))
                    continue;
                retainedAliases.add(key);
                closure.requiredAliases.push(alias);
            }
            if (!isWithinAny(path, [ownFolder]) ||
                !isWithinAny(resolvedPath, [ownFolder]))
                closure.libraries.push({
                    soname,
                    ownershipPath: selected.ownershipPath,
                    path,
                    resolvedPath,
                });
            if (dependencies.ok) {
                if (!walkedObjects.has(fileIdentity)) {
                    walkedObjects.add(fileIdentity);
                    queue.push({
                        path: lookupPath,
                        dependencies: dependencies.value,
                        loader: object,
                    });
                }
            }
            else
                closure.unreadable.push({ path, reason: dependencies.error.reason });
        }
    }
    return closure;
};
/** Package names from `dpkg-query -S` owners: architecture qualifiers dropped and the application's own package left out. */
export const libraryPackageNames = (owners, ownPackage) => [
    ...new Set(owners
        .map((owner) => owner.split(":")[0] ?? owner)
        .filter((name) => name !== ownPackage.split(":")[0])),
].sort();
/**
 * Library packages the computer can install, and the rest: a package is
 * installable when some version of it comes from the Ubuntu 24.04 archive
 * or from one of the vendor sources the export declares. `supplied` names the
 * declared sources of each installable package the archive does not offer.
 */
export const installableLibraryPackages = (names, available) => {
    const installable = [];
    const uninstallable = [];
    const supplied = new Map();
    for (const name of names) {
        const sources = available.sources.get(name) ?? [];
        const declared = sources.filter((source) => available.declared.has(source));
        const archive = fromUbuntuNobleArchive(sources, available.origins === undefined
            ? undefined
            : sources.map((source) => available.origins?.get(source) ?? null));
        if (archive || declared.length > 0)
            installable.push(name);
        else
            uninstallable.push(name);
        if (!archive && declared.length > 0)
            supplied.set(name, declared);
    }
    return { installable, uninstallable, supplied };
};
