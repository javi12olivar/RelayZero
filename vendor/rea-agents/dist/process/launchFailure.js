import { windowsExecutableLaunchPath } from "../windows/WindowsOwnedProcess.js";
const LAUNCH_REFUSALS = {
    ENOENT: "missing",
    ENOTDIR: "missing",
    ELOOP: "missing",
    ENAMETOOLONG: "missing",
    EACCES: "not_executable",
    EPERM: "not_executable",
    ENOEXEC: "not_executable",
    // Node on Windows (libuv) reports ERROR_BAD_EXE_FORMAT as EFTYPE.
    EFTYPE: "not_executable",
    EISDIR: "not_executable",
};
/** The native launcher's Win32 code for a file that is not a runnable image. */
const ERROR_BAD_EXE_FORMAT = 193;
/**
 * The errno of a launch failure. The Windows native launcher names only
 * file-not-found and access-denied as errno; its ERROR_BAD_EXE_FORMAT
 * becomes EFTYPE, as Node's own spawn reports the same file.
 */
const launchErrnoOf = (cause) => {
    const code = Reflect.get(cause, "code");
    return code === "ERR_REA_WINDOWS_NATIVE" &&
        Reflect.get(cause, "win32Code") === ERROR_BAD_EXE_FORMAT
        ? "EFTYPE"
        : code;
};
const HOST_EXHAUSTION = {
    EAGAIN: "processes",
    ENOMEM: "memory",
    EMFILE: "file-descriptors",
    ENFILE: "file-descriptors",
};
/**
 * The host resource a spawn errno reports as exhausted; undefined for any
 * other errno. The selected command may be usable once capacity is freed.
 */
export const launchExhaustedResource = (code) => typeof code === "string" && Object.hasOwn(HOST_EXHAUSTION, code)
    ? HOST_EXHAUSTION[code]
    : undefined;
/** Classify any spawn errno; see `LaunchFailure`. */
const classifyLaunchErrno = (code) => {
    const refusal = classifyLaunchFailureCode(code);
    if (refusal !== undefined)
        return refusal;
    const resource = launchExhaustedResource(code);
    if (resource !== undefined && typeof code === "string")
        return { kind: "host-exhausted", code, resource };
    if (code === "E2BIG")
        return { kind: "argument-list", code };
    return { kind: "failed", code: typeof code === "string" ? code : undefined };
};
/** Classify a spawn errno; undefined when it is not a launch refusal. */
const classifyLaunchFailureCode = (code) => {
    if (typeof code !== "string" || !Object.hasOwn(LAUNCH_REFUSALS, code))
        return undefined;
    const kind = LAUNCH_REFUSALS[code];
    return kind === undefined ? undefined : { kind, code };
};
/**
 * Name the executable on an errno Node threw synchronously from `spawn`.
 * Node emits ENOENT and EACCES as `spawn <path>` with `path`, but throws
 * other refusals such as ENOEXEC and ENOTDIR with a bare `spawn` syscall;
 * the launcher that passed `command` gives them the emitted shape.
 */
export const nameSpawnedExecutable = (cause, command) => {
    if (cause instanceof Error &&
        Reflect.get(cause, "syscall") === "spawn" &&
        Reflect.get(cause, "path") === undefined) {
        Reflect.set(cause, "syscall", `spawn ${command}`);
        Reflect.set(cause, "path", command);
    }
    return cause;
};
/**
 * Whether a launcher raised this error while starting a process, and the
 * executable it named: Node's `spawn` or `spawn <path>` error, or the Windows
 * native launcher's executable-launch constraint. Undefined when no launcher
 * raised it, such as an errno from reading a file or preparing ownership.
 */
const launcherIdentityOf = (cause) => {
    const syscall = Reflect.get(cause, "syscall");
    if (typeof syscall === "string" && /^spawn(?: |$)/u.test(syscall)) {
        const path = Reflect.get(cause, "path");
        return {
            executable: typeof path === "string" && syscall === `spawn ${path}`
                ? path
                : undefined,
        };
    }
    const requestedPath = windowsExecutableLaunchPath(cause);
    return requestedPath === undefined
        ? undefined
        : { executable: requestedPath };
};
/**
 * Classify a launcher's failure to start an executable, by errno. Undefined
 * when no launcher raised the error, such as an errno from reading a file or
 * preparing process ownership.
 */
export const launcherFailureOf = (cause) => {
    if (!(cause instanceof Error))
        return undefined;
    const identity = launcherIdentityOf(cause);
    if (identity === undefined)
        return undefined;
    const syscall = Reflect.get(cause, "syscall");
    return {
        ...classifyLaunchErrno(launchErrnoOf(cause)),
        ...identity,
        syscall: typeof syscall === "string" ? syscall : undefined,
    };
};
/**
 * How a launch failure reads in a report: the errno, and the launcher's
 * syscall for a failure that is neither a refusal nor a host constraint.
 */
export const describeLaunchFailure = (failure) => {
    const code = failure.code ?? "no system code";
    return failure.kind === "failed" && failure.syscall !== undefined
        ? `${code} from ${failure.syscall}`
        : code;
};
