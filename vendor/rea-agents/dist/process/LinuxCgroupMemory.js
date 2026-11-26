import { open } from "node:fs/promises";
import { decodeStrictUtf8 } from "../domain/strictUtf8.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { posix } from "node:path";
import { OwnedFileHandle } from "../filesystem/OwnedFileHandle.js";
import { RegularFileCleanupFailure, withOwnedFileHandle, } from "../filesystem/OwnedRegularFile.js";
const KERNEL_FILE_BYTES = 16 * 1024;
/** Hosts with many container layers publish long mount tables. */
const MOUNT_INFO_BYTES = 4 * 1024 * 1024;
/** Decode only a selected path field, retaining literal U+FFFD as data. */
const decodeKernelPath = (raw) => {
    try {
        return decodeStrictUtf8(Buffer.from(raw, "latin1"), "preserve");
    }
    catch {
        return undefined;
    }
};
/** Read the single cgroup v2 (`0::`) row of one `/proc/<pid>/cgroup` record. */
const parseLinuxCgroupV2Path = (value) => {
    let path;
    for (const line of value.toString("latin1").split("\n")) {
        if (!line.startsWith("0::"))
            continue;
        if (path !== undefined)
            return undefined;
        path = line.slice(3);
    }
    if (path === undefined || !path.startsWith("/"))
        return undefined;
    return path.split("/").includes("..") ? undefined : decodeKernelPath(path);
};
/** Read the single `oom_kill` counter of one cgroup v2 `memory.events` file. */
const parseLinuxCgroupOomKills = (value) => {
    let count;
    for (const line of value.split("\n")) {
        const match = /^oom_kill ([0-9]+)$/u.exec(line);
        if (match === null)
            continue;
        if (count !== undefined)
            return undefined;
        count = Number(match[1]);
    }
    return count !== undefined && Number.isSafeInteger(count) ? count : undefined;
};
/** Read one cgroup v2 `memory.max` file; `max` means no limit. */
const parseLinuxCgroupMemoryMax = (value) => {
    const token = value.trim();
    if (token === "max")
        return "max";
    if (!/^[0-9]+$/u.test(token))
        return undefined;
    const bytes = Number(token);
    return Number.isSafeInteger(bytes) ? bytes : undefined;
};
/** Decode the octal escapes the kernel writes for space, tab, newline and backslash. */
const mountInfoField = (value) => value.replace(/\\([0-7]{3})/gu, (_match, code) => String.fromCharCode(Number.parseInt(code, 8)));
/** List the cgroup2 mounts of one `/proc/<pid>/mountinfo` record. */
const parseLinuxCgroup2Mounts = (value) => value
    .toString("latin1")
    .split("\n")
    .flatMap((line) => {
    const fields = line.split(" ");
    const separator = fields.indexOf("-");
    const root = fields[3];
    const mountPoint = fields[4];
    if (separator < 6 ||
        fields[separator + 1] !== "cgroup2" ||
        root === undefined ||
        mountPoint === undefined)
        return [];
    const decodedRoot = decodeKernelPath(root);
    const decodedMountPoint = decodeKernelPath(mountPoint);
    return decodedRoot === undefined || decodedMountPoint === undefined
        ? []
        : [
            {
                root: mountInfoField(decodedRoot),
                mountPoint: mountInfoField(decodedMountPoint),
            },
        ];
});
/**
 * Locate a cgroup path below the mount whose root covers it most closely; a
 * mount that exposes only part of the hierarchy is joined from its own root.
 */
const linuxCgroupDirectory = (mounts, path) => {
    let selected;
    for (const mount of mounts) {
        const rest = mount.root === "/"
            ? path
            : path === mount.root
                ? "/"
                : path.startsWith(`${mount.root}/`)
                    ? path.slice(mount.root.length)
                    : undefined;
        if (rest === undefined)
            continue;
        if (selected === undefined ||
            mount.root.length > selected.mount.root.length)
            selected = { mount, rest };
    }
    return selected === undefined
        ? undefined
        : posix.resolve(selected.mount.mountPoint, `.${selected.rest}`);
};
/**
 * Observe this process's cgroup v2 memory group. Unavailable on other
 * platforms, under cgroup v1, or when the files are unreadable.
 */
export const readLinuxCgroupMemoryState = async (options = {}) => {
    if ((options.platform ?? HOST_PLATFORM.platform) !== "linux")
        return undefined;
    const membership = await readKernelFile(options.procCgroupPath ?? "/proc/self/cgroup", undefined, options.retainFailedClose);
    const path = membership === undefined ? undefined : parseLinuxCgroupV2Path(membership);
    if (path === undefined)
        return undefined;
    const mountInfo = await readKernelFile(options.procMountInfoPath ?? "/proc/self/mountinfo", MOUNT_INFO_BYTES, options.retainFailedClose);
    const group = mountInfo === undefined
        ? undefined
        : linuxCgroupDirectory(parseLinuxCgroup2Mounts(mountInfo), path);
    if (group === undefined)
        return undefined;
    const events = await readKernelFile(posix.join(group, "memory.events"), undefined, options.retainFailedClose);
    const oomKills = events === undefined
        ? undefined
        : parseLinuxCgroupOomKills(events.toString("utf8"));
    if (oomKills === undefined)
        return undefined;
    const limit = await readKernelFile(posix.join(group, "memory.max"), undefined, options.retainFailedClose);
    return {
        path,
        oomKills,
        memoryMax: limit === undefined
            ? null
            : (parseLinuxCgroupMemoryMax(limit.toString("utf8")) ?? null),
    };
};
/**
 * Read a kernel report to EOF within a fixed budget; procfs may return it in
 * several short reads. Absent on any failure or when the budget is exceeded.
 */
const readKernelFile = async (path, maxBytes = KERNEL_FILE_BYTES, retainFailedClose) => {
    try {
        return await withOwnedFileHandle(path, new OwnedFileHandle(await open(path, "r")), retainFailedClose === undefined
            ? {}
            : { retainFailedClose: (owner) => retainFailedClose(path, owner) }, async (handle) => {
            const buffer = Buffer.alloc(maxBytes + 1);
            let length = 0;
            for (;;) {
                const { bytesRead } = await handle.read(buffer, length, buffer.length - length, null);
                if (bytesRead === 0)
                    break;
                length += bytesRead;
                if (length > maxBytes)
                    return undefined;
            }
            return buffer.subarray(0, length);
        });
    }
    catch (cause) {
        if (cause instanceof RegularFileCleanupFailure &&
            cause.retention.kind !== "callback_returned")
            throw cause;
        return undefined;
    }
};
