import { projectAnalysisError } from "../domain/analysisErrorProjection.js";
import { analysisClientFailureForOperation } from "../providers/AnalysisClientFailure.js";
import { admitGhidraInstallation, EXISTING_PROJECT_WINDOWS_REMEDIATION, EXISTING_PROJECT_WINDOWS_UNAVAILABLE, } from "./GhidraAdmission.js";
import { inspectGhidraInstallation, } from "./GhidraInstallation.js";
import { GHIDRA_RESTRICTED_TEMP_REMEDIATION, probeGhidraTemporaryDirectory, } from "./GhidraTemporaryDirectory.js";
/** Client settings consulted by this readiness probe. */
export const GHIDRA_DOCTOR_SETTINGS = [
    "GHIDRA_INSTALL_DIR",
    "JAVA_HOME",
    "PATH",
    "REA_GHIDRA_PROJECT_PATH",
];
/** Project installation and runtime-authority facts into the doctor contract. */
export const projectGhidraDoctorInspection = (inspection, temporaryDirectory, selection = { existingProject: false }) => {
    const admission = admitGhidraInstallation(inspection, selection);
    const existingProjectRefused = !admission.admitted &&
        admission.refusal.kind === "existing_project_unsupported_host";
    // Native authority is reported once the installation itself is usable.
    const readiness = inspection.status === "available" ? admission.windowsNative : undefined;
    const windowsAuthorityUnavailable = readiness?.available === false;
    const temporaryDirectoryUnavailable = temporaryDirectory?.ok === false;
    return {
        id: "ghidra",
        configured: inspection.installDir !== null,
        available: admission.admitted && !temporaryDirectoryUnavailable,
        providerVersion: inspection.providerVersion,
        registrationEnvironment: inspection.status === "available"
            ? {
                GHIDRA_INSTALL_DIR: inspection.installDir,
                JAVA_HOME: inspection.javaHome,
            }
            : {},
        checks: [
            ...selectedChecks(inspection).map((check) => projectCheck(check, inspection.installDir !== null, inspection.javaProbeFailure, inspection.nativeDecompilerHeaderFailure)),
            ...(readiness !== undefined
                ? [
                    {
                        name: "native_authority",
                        ok: !windowsAuthorityUnavailable,
                        code: !readiness.available ? readiness.code : null,
                        detail: !readiness.available
                            ? readiness.reason
                            : "Verified Windows native Job Object, private DACL, and reparse-safe handle controls; local NTFS/ReFS only.",
                        remediation: !readiness.available ? readiness.remediation : null,
                        classification: !readiness.available && readiness.code === "runtime_unavailable"
                            ? "runtime_failure"
                            : !readiness.available && readiness.code === "runtime_missing"
                                ? "missing_dependency"
                                : "unsupported_host",
                    },
                ]
                : []),
            ...(temporaryDirectory === undefined
                ? []
                : [temporaryDirectoryCheck(temporaryDirectory)]),
            ...(existingProjectRefused
                ? [
                    {
                        name: "existing_project",
                        ok: false,
                        code: "unsupported_host",
                        detail: EXISTING_PROJECT_WINDOWS_UNAVAILABLE,
                        remediation: EXISTING_PROJECT_WINDOWS_REMEDIATION,
                        classification: "unsupported_host",
                    },
                ]
                : []),
        ],
    };
};
/** Report the REA-process write probe without claiming child-process access. */
const temporaryDirectoryCheck = (probe) => probe.ok
    ? {
        name: "temp_directory",
        ok: true,
        code: null,
        detail: `REA created and deleted a file under the Ghidra session root ${probe.directory}, where session runtimes are created. This does not test writes by Ghidra's child JVM.`,
        remediation: null,
        classification: "runtime_failure",
    }
    : {
        name: "temp_directory",
        ok: false,
        code: "temp_directory_unwritable",
        detail: `REA could not ${probe.stage === "write" ? "write" : "clean up"} a probe file under the Ghidra session root ${probe.directory}, where session runtimes are created${probe.code === undefined ? "" : ` (${probe.code})`}: ${probe.message}${probe.retainedPath === undefined ? "" : `. The probe file ${probe.retainedPath} remains; REA retains its cleanup and retries removal when doctor finishes.`}`,
        remediation: GHIDRA_RESTRICTED_TEMP_REMEDIATION,
        classification: "runtime_failure",
        details: {
            directory: probe.directory,
            stage: probe.stage,
            ...(probe.code === undefined ? {} : { system_code: probe.code }),
            ...(probe.retainedPath === undefined
                ? {}
                : { retained_path: probe.retainedPath }),
        },
    };
/** Inspect the process-configured BYO Ghidra installation for `rea doctor`. */
export const inspectSystemGhidraProvider = async (environment, resourceOwner, signal, 
/** The host whose installation is inspected; defaults to the running host. */
platform) => {
    try {
        const installation = await inspectGhidraInstallation({
            environment,
            resourceOwner,
            ...(platform === undefined ? {} : { platform }),
            ...(signal === undefined ? {} : { signal }),
            ...(environment.GHIDRA_INSTALL_DIR === undefined
                ? {}
                : { installDir: environment.GHIDRA_INSTALL_DIR }),
            ...(environment.JAVA_HOME === undefined
                ? {}
                : { javaHome: environment.JAVA_HOME }),
        });
        // The restricted-host denial reported for #7075 is Windows-specific.
        const temporaryDirectory = installation.status === "available" && installation.platform === "win32"
            ? await probeGhidraTemporaryDirectory(resourceOwner)
            : undefined;
        return projectGhidraDoctorInspection(installation, temporaryDirectory, {
            existingProject: environment.REA_GHIDRA_PROJECT_PATH !== undefined,
        });
    }
    catch (cause) {
        throw analysisClientFailureForOperation(cause, "ghidra", "doctor");
    }
};
const selectedChecks = (inspection) => {
    const byName = new Map(inspection.checks.map((candidate) => [candidate.name, candidate]));
    const configuration = byName.get("configuration");
    if (configuration === undefined)
        return [];
    if (configuration.status === "failed")
        return [configuration];
    const installation = byName.get("installation");
    return [
        configuration,
        byName.get("platform"),
        byName.get("architecture"),
        installation,
        ...(installation?.status === "passed"
            ? [
                byName.get("version"),
                byName.get("headless"),
                byName.get("native_decompiler"),
            ]
            : []),
        byName.get("java"),
    ].filter((candidate) => Boolean(candidate));
};
const projectCheck = (check, configured, javaFailure, headerFailure) => ({
    name: check.name,
    ok: check.status === "passed",
    code: check.status === "failed" ? check.code : null,
    detail: check.detail,
    ...(check.name === "java" && javaFailure?.output !== undefined
        ? {
            details: {
                output: { ...javaFailure.output },
                ...(javaFailure.processErrorCode === undefined
                    ? {}
                    : { process_error_code: javaFailure.processErrorCode }),
                ...(javaFailure.properties === undefined
                    ? {}
                    : { properties: { ...javaFailure.properties } }),
            },
        }
        : {}),
    ...(check.name === "native_decompiler" && headerFailure !== undefined
        ? { details: { header_failure: projectAnalysisError(headerFailure) } }
        : {}),
    remediation: check.status === "failed" ? check.remediation : null,
    classification: check.name === "platform" || check.name === "architecture"
        ? "unsupported_host"
        : check.name === "java" &&
            check.status === "failed" &&
            check.code === "runtime_missing"
            ? "missing_dependency"
            : check.name === "java" &&
                check.status === "failed" &&
                check.code === "runtime_unavailable"
                ? "runtime_failure"
                : configured
                    ? "config_drift"
                    : "missing_analysis_engine",
});
