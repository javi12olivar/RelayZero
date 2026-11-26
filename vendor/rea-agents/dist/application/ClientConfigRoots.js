import { isAbsolute, join, posix, resolve, win32 } from "node:path";
import { err, ok } from "../domain/result.js";
import { windowsAppDataRoots } from "./MsixPackageStorage.js";
/**
 * `XDG_CONFIG_HOME || ~/.config`: an empty value is unset and a relative value
 * is kept, resolving against the reader's working directory. This is the
 * xdg-basedir package (OpenCode, Kilo) and VS Code's `getDefaultUserDataPath`
 * on Linux. Clients that do not document their reader also use it; it is not
 * established for them.
 */
export const xdgConfigHomeOrDefault = ({ home, env, }) => env.XDG_CONFIG_HOME || join(home, ".config");
/**
 * The XDG Base Directory rule: only an absolute `XDG_CONFIG_HOME` counts;
 * empty and relative values are invalid and fall back to `~/.config`. This is
 * Rust `dirs::config_dir` on Linux (Zed) and etcetera's XDG strategy (Goose).
 */
export const absoluteXdgConfigHome = ({ home, env, }) => {
    const value = env.XDG_CONFIG_HOME;
    return value !== undefined && posix.isAbsolute(value)
        ? value
        : join(home, ".config");
};
/** MCPorter's expandHome: a leading `~` path segment names the home folder. */
export const mcporterExpandHome = (value, home) => value === "~"
    ? home
    : value.startsWith("~/") || value.startsWith("~\\")
        ? join(home, value.slice(2))
        : value;
/**
 * MCPorter's XDG folder (`mcporterConfigCandidates`): `XDG_CONFIG_HOME` is
 * trimmed and `~`-expanded, and only an absolute result counts. Otherwise
 * MCPorter uses its legacy `~/.mcporter` folder rather than `~/.config`, so
 * there is no XDG folder and this returns `undefined`.
 */
export const mcporterXdgConfigHome = ({ home, platform, env, }) => {
    const value = mcporterExpandHome(env.XDG_CONFIG_HOME?.trim() ?? "", home);
    return (platform === "win32" ? win32 : posix).isAbsolute(value)
        ? value
        : undefined;
};
/**
 * Code-OSS's `getUserDataPath` for one product's data folder (`Code` for VS
 * Code; `Cursor`, `Windsurf`, `VSCodium` or `Code - Insiders` for builds that
 * share it): non-empty `VSCODE_PORTABLE` selects portable storage, then
 * non-empty `VSCODE_APPDATA`, then the platform default. A relative result
 * resolves against `VSCODE_CWD`. Extensions such as Cline keep their global
 * storage under this directory. `VSCODE_PORTABLE` describes the portable
 * build that set it, which REA attributes only to VS Code itself.
 */
export const vscodeUserDirectory = ({ home, platform, env }, dataFolder = "Code") => {
    const userData = env.VSCODE_PORTABLE && dataFolder === "Code"
        ? join(env.VSCODE_PORTABLE, "user-data")
        : env.VSCODE_APPDATA
            ? join(env.VSCODE_APPDATA, dataFolder)
            : platform === "win32"
                ? join(windowsAppDataRoots(home, env).roaming, dataFolder)
                : platform === "darwin"
                    ? join(home, "Library", "Application Support", dataFolder)
                    : join(xdgConfigHomeOrDefault({ home, env }), dataFolder);
    // The catalog can describe Windows clients on another host; retain its
    // drive-absolute paths instead of resolving them against that host cwd.
    const absoluteUserData = platform === "win32" && win32.isAbsolute(userData) && !isAbsolute(userData)
        ? userData
        : isAbsolute(userData)
            ? resolve(userData)
            : resolve(env.VSCODE_CWD || process.cwd(), userData);
    return join(absoluteUserData, "User");
};
/**
 * Why a client path still depends on where the client runs, or `undefined`
 * when it names one location. On Windows a rooted path without a drive
 * (`\\cline`, `/cline`) resolves against the client's current drive, so only
 * drive-qualified and UNC paths name one location.
 */
export const clientPathDependence = (path, platform) => {
    if (platform !== "win32")
        return posix.isAbsolute(path) ? undefined : "relative";
    if (!win32.isAbsolute(path))
        return "relative";
    return /^[\\/](?![\\/])/u.test(path) ? "driveless" : undefined;
};
/**
 * A client folder or file named by an environment variable that the client
 * resolves against its own working directory. Setup cannot know that
 * directory, so only a path naming one location is selected; a relative or
 * Windows drive-less one is refused rather than resolved against REA's.
 */
export const absoluteClientRoot = (path, variable, client, platform) => {
    const dependence = clientPathDependence(path, platform);
    return dependence === undefined
        ? ok(path)
        : err({
            path,
            message: dependence === "relative"
                ? `${variable} is relative, so the location ${client} reads depends on its working directory. Set an absolute ${variable} before configuring ${client}.`
                : `${variable} has no drive, so the location ${client} reads depends on its current drive. Set ${variable} to a path with a drive letter or a UNC path before configuring ${client}.`,
        });
};
