import { isStrictUtf8 } from "../strictUtf8.js";
import { withoutCredentialsIn } from "./aptRepositories.js";
import { DEBIAN_PACKAGE_NAME } from "./debianPackageFile.js";
/** Format string passed to `dpkg-query -W -f`. */
export const DPKG_STATUS_FORMAT = "${Package}\\t${Version}\\t${Architecture}\\t${db:Status-Status}\\n";
/** `-S` otherwise interprets patterns, and cannot frame a path containing a line break. */
export const literalDpkgOwnershipPath = (path) => path.startsWith("/") && !/[\0\n*?[\\]/u.test(path);
/** Decode each ownership row separately so malformed bytes cannot hide valid siblings. */
function* dpkgOwnershipRows(output) {
    if (typeof output === "string") {
        yield* output.split("\n");
        return;
    }
    for (let start = 0; start < output.length;) {
        const end = output.indexOf(0x0a, start);
        const row = output.subarray(start, end < 0 ? output.length : end);
        yield isStrictUtf8(row) ? row.toString("utf8") : undefined;
        if (end < 0)
            break;
        start = end + 1;
    }
}
const dpkgOwnerName = (owner) => {
    const colon = owner.indexOf(":");
    return colon < 0
        ? DEBIAN_PACKAGE_NAME.test(owner)
        : DEBIAN_PACKAGE_NAME.test(owner.slice(0, colon)) &&
            /^[a-z0-9][a-z0-9-]*$/u.test(owner.slice(colon + 1));
};
/** One interpretation of `dpkg-query -S` output for the whole literal batch. */
export const parseDpkgOwners = (output, paths) => {
    const requested = new Set(paths);
    const matched = new Map();
    let complete = true;
    for (const row of dpkgOwnershipRows(output)) {
        if (row === undefined) {
            complete = false;
            continue;
        }
        if (row === "" || /^(?:local )?diversion /u.test(row))
            continue;
        // An architecture qualifier contains no space; a literal pathname can
        // contain further occurrences of the ownership separator.
        const separator = row.indexOf(": ");
        const path = row.slice(separator + 2);
        const names = row.slice(0, separator).split(", ");
        if (separator < 0 || !path.startsWith("/") || !names.every(dpkgOwnerName)) {
            complete = false;
            continue;
        }
        if (!requested.has(path))
            continue;
        const owners = matched.get(path) ?? new Set();
        matched.set(path, owners);
        for (const name of names)
            owners.add(name);
    }
    const owners = new Map();
    for (const path of requested) {
        const found = matched.get(path);
        if (found !== undefined || complete)
            owners.set(path, [...(found ?? [])]);
    }
    return { owners, complete };
};
/** Only merged system directories have alternate `/usr` spellings; application, home and shared-data paths retain their own identity. */
export const ownershipCandidates = (paths) => [
    ...new Set(paths.flatMap((path) => {
        if (!/^\/(?:usr\/)?(?:bin|sbin|lib(?:32|64|o32|x32)?)\//u.test(path))
            return [path];
        return path.startsWith("/usr/")
            ? [path, path.slice(4)]
            : [path, `/usr${path}`];
    })),
];
/** Parse one `dpkg-query -W -f DPKG_STATUS_FORMAT` line. */
export const parseDpkgStatus = (output) => {
    const [name, version, architecture, status] = (output.split("\n")[0] ?? "").split("\t");
    if (name === undefined ||
        version === undefined ||
        architecture === undefined ||
        status === undefined ||
        name.length === 0)
        return undefined;
    return { name, version, architecture, status };
};
// apt adds a localized `(phased N%)` after the version's priority.
const POLICY_VERSION = /^ (?<marker>\*\*\*| {3}) \S+ -?\d+(?: \(.+ \d+%\))?$/u;
const POLICY_PRIORITY = /^( *)(-?\d+) /u;
const POLICY_PRIORITY_WIDTH = 4;
const POLICY_VERSION_SOURCE_INDENT = 7;
/** Default only: apt-config can select a different installed-package database. */
export const DEFAULT_DPKG_STATUS_SOURCE = "/var/lib/dpkg/status";
/** Frame apt's `%4i %s` rows and protect the configured status path from line splitting. */
function* policyRows(output, statusFile, sourceIndent) {
    let start = 0;
    while (start < output.length) {
        const end = output.indexOf("\n", start);
        const lineEnd = end < 0 ? output.length : end;
        const line = output.slice(start, lineEnd);
        const prefix = POLICY_PRIORITY.exec(line);
        const padding = prefix?.[1];
        const priority = prefix?.[2];
        if (prefix !== null &&
            padding !== undefined &&
            priority !== undefined &&
            padding.length ===
                sourceIndent + Math.max(0, POLICY_PRIORITY_WIDTH - priority.length)) {
            const sourceStart = start + prefix[0].length;
            const statusEnd = sourceStart + statusFile.length;
            if (output.startsWith(statusFile, sourceStart) &&
                (statusEnd === output.length || output[statusEnd] === "\n")) {
                yield { kind: "status", source: statusFile };
                start = statusEnd + 1;
                continue;
            }
            if (sourceStart < lineEnd)
                yield {
                    kind: "source",
                    source: withoutCredentialsIn(output.slice(sourceStart, lineEnd)),
                };
        }
        else {
            yield { kind: "line", line };
        }
        start = lineEnd + 1;
    }
}
/**
 * The package sources `apt-cache policy` lists for the installed version,
 * excluding the dpkg status database every installed version carries.
 */
export const parseAptPolicySources = (output, statusFile = DEFAULT_DPKG_STATUS_SOURCE) => {
    const sources = [];
    let installed = false;
    for (const row of policyRows(output, statusFile, POLICY_VERSION_SOURCE_INDENT)) {
        if (row.kind === "line") {
            const version = POLICY_VERSION.exec(row.line);
            if (version !== null)
                installed = version.groups?.marker === "***";
        }
        else if (row.kind === "source" && installed) {
            sources.push(row.source);
        }
    }
    return sources;
};
const POLICY_PACKAGE = /^(?<name>\S+):$/u;
/**
 * The sources of every version of each package `apt-cache policy <names…>`
 * lists, by the name it heads the package with; a name apt does not know is
 * left out, as apt prints nothing for it.
 */
export const parseAptPolicyPackageSources = (output, statusFile = DEFAULT_DPKG_STATUS_SOURCE) => {
    const packages = new Map();
    let current;
    for (const row of policyRows(output, statusFile, POLICY_VERSION_SOURCE_INDENT)) {
        if (row.kind === "line") {
            const name = POLICY_PACKAGE.exec(row.line)?.groups?.name;
            if (name !== undefined) {
                current = [];
                packages.set(name, current);
            }
        }
        else if (row.kind === "source" &&
            current &&
            !current.includes(row.source)) {
            current.push(row.source);
        }
    }
    return packages;
};
const GLOBAL_POLICY_RELEASE = /^ +release (?<fields>.*)$/u;
/**
 * The `o=` origin of each package file `apt-cache policy` (with no package)
 * lists, keyed by the source text `parseAptPolicySources` returns; null when
 * the file's release line names no origin.
 */
export const parseAptPolicyOrigins = (output, statusFile = DEFAULT_DPKG_STATUS_SOURCE) => {
    const origins = new Map();
    let source;
    for (const row of policyRows(output, statusFile, 0)) {
        if (row.kind !== "line") {
            source = row.source;
            if (!origins.has(source))
                origins.set(source, null);
            continue;
        }
        if (row.line.startsWith("Pinned packages:"))
            break;
        const fields = GLOBAL_POLICY_RELEASE.exec(row.line)?.groups?.fields;
        if (fields === undefined || source === undefined)
            continue;
        const origin = fields
            .split(",")
            .find((field) => field.startsWith("o="))
            ?.slice(2);
        if (origin !== undefined &&
            origin.length > 0 &&
            origins.get(source) === null)
            origins.set(source, origin);
    }
    return origins;
};
/** Recognise snap, flatpak and AppImage installs from a resolved path. */
export const packageFromPath = (path) => {
    const snap = /^\/snap\/(?<name>[^/]+)\/(?<revision>[^/]+)\//u.exec(path);
    if (snap?.groups?.name !== undefined && snap.groups.name !== "bin")
        return {
            kind: "snap",
            name: snap.groups.name,
            revision: snap.groups.revision ?? null,
        };
    const snapBin = /^\/snap\/bin\/(?<name>[^/.]+)/u.exec(path);
    if (snapBin?.groups?.name !== undefined)
        return { kind: "snap", name: snapBin.groups.name, revision: null };
    const flatpak = /\/flatpak\/(?:app\/(?<app>[^/]+)\/|exports\/bin\/(?<bin>[^/]+)$)/u.exec(path);
    const flatpakName = flatpak?.groups?.app ?? flatpak?.groups?.bin;
    if (flatpakName !== undefined)
        return { kind: "flatpak", name: flatpakName };
    if (/\.appimage$/iu.test(path))
        return { kind: "appimage" };
    return undefined;
};
/** ELF images that carry the AppImage type 1 or type 2 magic at byte 8. */
export const isAppImageHeader = (header) => header.length >= 11 &&
    header[0] === 0x7f &&
    header[1] === 0x45 &&
    header[2] === 0x4c &&
    header[3] === 0x46 &&
    header[8] === 0x41 &&
    header[9] === 0x49 &&
    (header[10] === 0x01 || header[10] === 0x02);
