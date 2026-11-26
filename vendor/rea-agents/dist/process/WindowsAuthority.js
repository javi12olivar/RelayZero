import { systemWindowsNativeAuthority, windowsNativeFailureRemediation, } from "../windows/WindowsNativeLoader.js";
/** Interpret the loader's tagged failure without guessing from OS error text. */
export const inspectWindowsNativeReadiness = (platform, observation) => {
    if (platform !== "win32")
        return {
            available: false,
            failureStage: "host",
            reason: "Windows native authority is not applicable on this host",
            proof: "not-applicable",
            code: "unsupported_host",
            remediation: "Use a Windows x64 host for Windows native controls.",
        };
    const loaded = observation ?? systemWindowsNativeAuthority();
    if (loaded.available)
        return { available: true };
    const failureStage = loaded.failureStage;
    return {
        available: false,
        failureStage,
        reason: loaded.reason,
        ...(loaded.retryable === true ? { retryable: true } : {}),
        proof: "not-proven",
        code: failureStage === "host"
            ? "unsupported_host"
            : failureStage === "artifact" || failureStage === "load"
                ? "runtime_missing"
                : "runtime_unavailable",
        remediation: windowsNativeFailureRemediation(failureStage),
    };
};
/**
 * Describe native Windows controls without inferring them from taskkill,
 * chmod, symlink creation, or a numeric POSIX open flag.
 */
export const windowsNativeCapabilities = (platform, readiness = inspectWindowsNativeReadiness(platform)) => {
    const capability = readiness.available
        ? { available: true, reason: null, proof: "native-authority" }
        : {
            available: false,
            reason: readiness.reason,
            proof: readiness.proof,
            code: readiness.code,
            failureStage: readiness.failureStage,
            remediation: readiness.remediation,
            ...(readiness.retryable === true ? { retryable: true } : {}),
        };
    return {
        job_object_process_ownership: capability,
        private_runtime_dacl: capability,
        reparse_safe_path_admission: capability,
    };
};
