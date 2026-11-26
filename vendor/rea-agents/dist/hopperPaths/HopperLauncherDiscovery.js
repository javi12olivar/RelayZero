import { accessSync, constants, statSync } from "node:fs";
import { homeDirectoryFromEnvironment } from "../config/homeDirectory.js";
import { linuxHopperLauncherCandidates, REA_MANAGED_LINUX_HOPPER_LAUNCHER, } from "./LinuxHopperPaths.js";
import { localMacHopperRenamedLauncherCandidates, MAC_HOPPER_SYSTEM_LAUNCHER, macHopperCanonicalLauncherCandidates, } from "./MacHopperPaths.js";
/** Select the automatic Hopper launcher candidates for one platform. */
export const hopperLauncherDiscovery = (platform, homeDirectory) => {
    if (platform === "darwin")
        return {
            candidates: macHopperCanonicalLauncherCandidates(homeDirectory),
            probesMacApplicationBundles: true,
            fallback: MAC_HOPPER_SYSTEM_LAUNCHER,
        };
    if (platform === "linux")
        return {
            candidates: linuxHopperLauncherCandidates(homeDirectory),
            probesMacApplicationBundles: false,
            fallback: REA_MANAGED_LINUX_HOPPER_LAUNCHER,
        };
    return {
        candidates: [],
        probesMacApplicationBundles: false,
        fallback: MAC_HOPPER_SYSTEM_LAUNCHER,
    };
};
const executableAvailable = (path) => {
    try {
        accessSync(path, constants.X_OK);
        return statSync(path).isFile();
    }
    catch {
        return false;
    }
};
/**
 * The launcher automatic discovery selects: the first executable candidate,
 * then renamed macOS application bundles, else the platform's fallback.
 */
export const defaultHopperLauncherPath = (platform, homeDirectory, executable = executableAvailable) => {
    const discovery = hopperLauncherDiscovery(platform, homeDirectory);
    for (const candidate of discovery.candidates)
        if (executable(candidate))
            return candidate;
    if (discovery.probesMacApplicationBundles)
        for (const candidate of localMacHopperRenamedLauncherCandidates(homeDirectory))
            if (executable(candidate))
                return candidate;
    return discovery.fallback;
};
/**
 * The launcher the Hopper provider uses: the caller's `HOPPER_LAUNCHER_PATH`
 * spelling unchanged, else the one automatic discovery selects from the
 * caller environment's home.
 */
export const selectedHopperLauncherPath = (configured, platform, environment) => configured ??
    defaultHopperLauncherPath(platform, homeDirectoryFromEnvironment(environment, platform));
