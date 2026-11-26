import { inspectWindowsNativeReadiness, } from "../process/WindowsAuthority.js";
/** The selected database mode is not part of Windows P0 authority. */
export const EXISTING_PROJECT_WINDOWS_UNAVAILABLE = "An existing Ghidra project cannot be opened on the Windows launch path.";
/** Windows P0 imports targets into ephemeral projects only. */
export const EXISTING_PROJECT_WINDOWS_REMEDIATION = "Unset REA_GHIDRA_PROJECT_PATH in the environment that starts REA to import targets into an ephemeral project, or open the existing project on a supported Linux or macOS host; restart REA after changing the environment.";
export const admitGhidraInstallation = (installation, selection) => {
    const windowsNative = installation.platform === "win32"
        ? inspectWindowsNativeReadiness(installation.platform)
        : undefined;
    if (selection.existingProject && installation.platform === "win32")
        return {
            windowsNative,
            admitted: false,
            refusal: { kind: "existing_project_unsupported_host", installation },
        };
    if (installation.status !== "available")
        return {
            windowsNative,
            admitted: false,
            refusal: { kind: "installation_rejected", installation },
        };
    if (windowsNative?.available === false)
        return {
            windowsNative,
            admitted: false,
            refusal: {
                kind: "windows_native_unavailable",
                installation,
                readiness: windowsNative,
            },
        };
    return { windowsNative, admitted: true, installation };
};
