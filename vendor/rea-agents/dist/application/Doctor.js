import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { projectAnalysisError } from "../domain/analysisErrorProjection.js";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { AnalysisCancelledError, cancelledBy, carriedReason, OwnerCancellation, } from "../domain/analysisErrorCore.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { analysisErrorWithCleanupDependencies } from "../domain/analysisErrorCleanup.js";
import { bindArtifactFileCleanup, ArtifactReaderFailure, AnalysisCleanupLease, ArtifactResourceScope, } from "../resources/index.js";
import { constants } from "node:fs";
import { access, realpath, stat } from "node:fs/promises";
import { posix, win32 } from "node:path";
import { inspectNativeAnalysisConfiguration, } from "../config/parseConfig.js";
import { homeDirectoryFromEnvironment } from "../config/homeDirectory.js";
import { snapshotEnvironment } from "../process/snapshotEnvironment.js";
import { appendCallerPath } from "../filesystem/callerPath.js";
import { analysisErrorRemediationAction } from "../domain/analysisErrorPresentation.js";
import { BinaryTargetError } from "../domain/configurationErrors.js";
import { execFileOutput, ExecFileOutputCancelledError, execFileOutputFailure, execFileFailureCapturedOutput, } from "../process/ExecFileOutput.js";
import { jsonValueSchema } from "../domain/jsonValue.js";
import { javaScriptRuntime, } from "../domain/runtimeVersion.js";
import { installedCaskAppdir, probeHomebrew } from "./homebrew.js";
import { readMacHopperRenamedLauncherCandidates } from "../hopperPaths/MacHopperPaths.js";
import { inspectLinuxHopperLauncher, linuxSharedLibrariesAvailable, readLinuxDistribution, } from "./LinuxHopper.js";
import { readInstalledSkillIdentity, } from "./SetupSkill.js";
import { loadDefaultCatalogIdentity } from "../contracts/catalog/defaultCatalogIdentity.js";
import { PRODUCT_IDENTITY, SDK_IDENTITY } from "../identity.js";
import { readClientRegistrationStatuses, } from "./ClientRegistrationStatus.js";
import { registrationSpelledSettings } from "./SetupRegistrationEnvironment.js";
import { collectDoctorDiagnostics, doctorHealthy, } from "./DoctorDiagnostics.js";
import { normalizeDoctorScope, scopeDoctorChecks, } from "./DoctorScope.js";
import { selectedDesktopBuildChecks } from "./DesktopBuildDoctor.js";
import { errorMessage } from "../kernel/errorMessage.js";
import { settleConcurrent } from "./settleConcurrent.js";
/**
 * Check requirements and an optional target without mutating the host.
 * Every failed check includes remediation suitable for either the one-shot CLI
 * or an agent consuming the structured result.
 */
export const runDoctor = async (target, selectedHost, requestedScope) => selectedHost === undefined
    ? runDoctorOwned(target, systemDoctorHost(), requestedScope)
    : inspectDoctor(target, selectedHost, requestedScope);
/** Inspect with a host whose lifetime belongs to this operation. */
export const runDoctorOwned = async (target, host, requestedScope) => {
    let report;
    try {
        report = await inspectDoctor(target, host, requestedScope);
    }
    catch (cause) {
        const cleanup = await closeDoctorHost(host);
        if (cleanup !== undefined && cause instanceof AnalysisError) {
            const cleanupError = typeof cleanup === "string"
                ? new ProviderCleanupError("rea", [], { reason: cleanup }, { operation: "doctor" })
                : cleanup;
            throw analysisErrorWithCleanupDependencies(cause, cleanupError, "doctor");
        }
        if (cleanup !== undefined)
            throw new AggregateError([cause, typeof cleanup === "string" ? new Error(cleanup) : cleanup], "Doctor failed and its resource cleanup remains incomplete.", { cause });
        throw cause;
    }
    const cleanup = await closeDoctorHost(host);
    if (cleanup === undefined && report.healthy && host.signal?.aborted)
        throw cancelledBy("doctor", host.signal, {
            diagnostics: { doctor_report: jsonValueSchema.parse(report) },
        });
    return cleanup === undefined
        ? report
        : doctorReportWithCleanup(report, cleanup);
};
const inspectDoctor = async (target, host, requestedScope) => {
    if (host.signal?.aborted)
        throw cancelledBy("doctor", host.signal);
    const scope = normalizeDoctorScope(requestedScope, target);
    const { checks: diagnosticChecks, hopperPath, providerInspections, } = await collectDoctorDiagnostics(target, host, scope.clients);
    const hopperAvailable = hopperPath !== undefined &&
        diagnosticChecks
            .filter(({ name }) => name.startsWith("hopper"))
            .every(({ ok }) => ok);
    const selections = providerSettingSelections(providerInspections, hopperAvailable && hopperPath === host.configuredHopperPath
        ? hopperPath
        : undefined);
    const identity = await collectDoctorIdentity(host, scope, selections);
    const checks = [
        ...diagnosticChecks,
        ...identity.checks,
        ...registrationAdvisoryChecks(identity.value.registrations),
        ...registrationEnvironmentChecks(identity.value.registrations, selections),
        ...(await selectedDesktopBuildChecks(host, scope, identity.value.skill)),
    ];
    const providers = {
        hopperAvailable,
        hopperConfigured: host.configuredHopperPath !== undefined,
        providerInspections,
    };
    const environmentHealthy = doctorHealthy(checks, providers);
    const scoped = scopeDoctorChecks({
        checks,
        registrations: identity.value.registrations,
        skillState: identity.value.skill.state,
        providers,
        scope,
    });
    return {
        healthy: scope.mode === "audit-wide" ? environmentHealthy : scoped.healthy,
        environment_healthy: environmentHealthy,
        scope,
        scope_checks: scope.mode === "audit-wide" ? checks : scoped.scopeChecks,
        informational_checks: scope.mode === "audit-wide" ? [] : scoped.informationalChecks,
        ...(hopperPath === undefined ? {} : { hopperPath }),
        ...(providerInspections === undefined ? {} : { providerInspections }),
        checks,
        identity: identity.value,
    };
};
const registrationAdvisoryChecks = (registrations) => registrations.flatMap(({ client, advisory }) => advisory === undefined
    ? []
    : [
        {
            name: `registration_timeout:${client}`,
            ok: true,
            classification: "healthy",
            detail: advisory,
        },
    ]);
const providerSettingSelections = (inspections, configuredHopperPath) => [
    ...(inspections ?? [])
        .filter(({ available }) => available)
        .map(({ id, registrationEnvironment }) => ({
        provider: id,
        settings: registrationEnvironment,
    })),
    // Startup probes the fixed and renamed locations on its own, so only an
    // explicit path is something this terminal selected for the server.
    ...(configuredHopperPath === undefined
        ? []
        : [
            {
                provider: "hopper",
                settings: { HOPPER_LAUNCHER_PATH: configuredHopperPath },
            },
        ]),
];
/** Render what the registration comparison established without inferring its effective environment. */
const registrationEnvironmentDetail = (client, { unrecorded, differing, unresolved, }) => [
    `Provider checks used this terminal's environment; what the server ${client} starts receives is unknown.`,
    ...(unrecorded.length === 0
        ? []
        : [`Its registration does not record ${unrecorded.join(", ")}.`]),
    ...(differing.length === 0
        ? []
        : [`It records other values for ${differing.join(", ")}.`]),
    ...(unresolved.length === 0
        ? []
        : [`REA could not resolve its ${unresolved.join(", ")}.`]),
].join(" ");
/**
 * Report what the registration's file leaves out without gating health:
 * doctor cannot observe the environment the client actually passes on.
 */
const registrationEnvironmentChecks = (registrations, selections) => registrations.flatMap(({ client, provider_settings: settings }) => {
    if (settings === undefined)
        return [];
    const { unrecorded, differing, unresolved } = settings;
    const names = [...unrecorded, ...differing, ...unresolved];
    return [
        {
            name: `registration_environment:${client}`,
            ok: true,
            classification: "unknown",
            detail: registrationEnvironmentDetail(client, settings),
            details: {
                effective_environment: "unknown",
                providers: selections
                    .filter(({ settings: selected }) => names.some((name) => selected[name] !== undefined))
                    .map(({ provider }) => provider),
            },
            remediation: `Preview rea setup --client ${client} --skill=false --dry-run from this terminal, apply it to record these settings and restart the client, or read binary_session result.tool_availability in the client.`,
        },
    ];
});
const closeDoctorHost = async (host) => {
    try {
        return await host.close?.();
    }
    catch (cause) {
        if (cause instanceof AnalysisError)
            return cause;
        return `Doctor host cleanup failed: ${errorMessage(cause)}`;
    }
};
const doctorReportWithCleanup = (report, cleanup) => {
    const check = {
        name: "doctor-resource-cleanup",
        ok: false,
        classification: "config_drift",
        detail: typeof cleanup === "string"
            ? cleanup
            : `${cleanup.message} ${cleanup.cleanupResources.join(", ")}`,
        ...(typeof cleanup === "string"
            ? {}
            : { details: { cleanup_failure: projectAnalysisError(cleanup) } }),
        remediation: "Resolve the reported cleanup failure, then rerun rea doctor.",
    };
    return {
        ...report,
        healthy: false,
        environment_healthy: false,
        checks: [...report.checks, check],
        scope_checks: [...report.scope_checks, check],
    };
};
const collectDoctorIdentity = async (host, scope, selections) => {
    const skillClientIds = scope.skill_clients ??
        (scope.clients.length > 0 ? scope.clients : undefined);
    const [resolvedLaunchers, resolvedRegistrations, installedSkillIdentity, defaultCatalogIdentity,] = await settleConcurrent([
        Promise.resolve(host.installationLaunchers?.()),
        Promise.resolve(host.clientRegistrations?.(scope.clients, Object.fromEntries(selections.flatMap(({ settings }) => Object.entries(settings))))),
        Promise.resolve(host.installedSkillIdentity?.(skillClientIds)),
        loadDefaultCatalogIdentity(),
    ]);
    const launchers = resolvedLaunchers ?? [];
    const registrations = resolvedRegistrations ?? [];
    const skillAligned = skillIdentityAligned(installedSkillIdentity, defaultCatalogIdentity.counts.mcp_tools);
    return {
        checks: [
            ...(skillAligned
                ? []
                : [
                    skillIdentityCheck(installedSkillIdentity, defaultCatalogIdentity.counts.mcp_tools),
                ]),
            ...registrations
                .filter((registration) => registration.state !== "aligned" && registration.state !== "manual")
                .map(registrationCheck),
        ],
        value: {
            cli_package_version: PRODUCT_IDENTITY.packageVersion,
            expected_skill_version: PRODUCT_IDENTITY.skillVersion,
            sdk: SDK_IDENTITY,
            catalog: {
                counts: defaultCatalogIdentity.counts,
                digests: defaultCatalogIdentity.digests,
            },
            live_server: {
                state: "unknown",
                // `binary_session` is advertised only when the saved scope includes
                // `session`, so the remediation also names the scope requirement: doctor
                // cannot see the saved selection here, and one sentence has to fit both
                // a complete registration and a scope that omits the session family.
                remediation: "Call binary_session in the active client to inspect the running server identity; a registration whose saved scope omits the session family cannot report it, so include session through rea setup --tool-families and restart first.",
            },
            installations: {
                paths: launchers.map(({ path }) => path),
                state: installationState(launchers),
            },
            skill: {
                installed_version: installedSkillIdentity?.version ?? null,
                installed_tool_count: installedSkillIdentity?.toolCount ?? null,
                state: skillIdentityState(installedSkillIdentity, defaultCatalogIdentity.counts.mcp_tools),
                ...(installedSkillIdentity?.issues === undefined
                    ? {}
                    : { issues: installedSkillIdentity.issues }),
                remediation: skillAligned
                    ? null
                    : skillIdentityRemediation(installedSkillIdentity),
            },
            registrations,
        },
    };
};
const skillIdentityAligned = (identity, expectedToolCount) => identity?.version === PRODUCT_IDENTITY.skillVersion &&
    identity.toolCount === expectedToolCount &&
    identity.canonical;
const skillIdentityState = (identity, expectedToolCount) => {
    if (identity?.issues?.some(({ kind }) => kind === "unreadable" || kind === "unresolved"))
        return "unknown";
    if (identity?.issues?.some(({ kind }) => kind === "symbolic_link" || kind === "not_directory"))
        return "unmanaged";
    if (identity?.issues?.some(({ kind }) => kind === "stale"))
        return "stale";
    if (identity?.issues?.some(({ kind }) => kind === "missing"))
        return "missing";
    return identity === undefined
        ? "missing"
        : skillIdentityAligned(identity, expectedToolCount)
            ? "aligned"
            : "stale";
};
const skillIdentityRemediation = (identity) => {
    const issues = identity?.issues;
    if (issues !== undefined && issues.length > 0)
        return issues
            .map(({ path, detail, kind, client }) => {
            const repair = kind === "stale" || kind === "missing"
                ? `Run rea setup --skill-client ${client ?? "shared"} --skill to repair this copy.`
                : "Repair the selected path/profile before rerunning setup, or use --skill=false to configure clients without installing the skill.";
            return `${detail} (${path}). ${repair}`;
        })
            .join(" ");
    return "Run rea setup to update the installed REA skill.";
};
const skillIdentityCheck = (identity, expectedToolCount) => {
    const issues = identity?.issues;
    const state = skillIdentityState(identity, expectedToolCount);
    return {
        name: "skill:identity",
        ok: false,
        // An unreadable or unresolved copy is unknown, not proven drift.
        classification: state === "unknown" ? "unknown" : "config_drift",
        detail: issues !== undefined && issues.length > 0
            ? `Selected skill identity is ${state}: ${issues.map(({ path }) => path).join(", ")}.`
            : identity === undefined
                ? "Installed REA skill identity is missing."
                : "Installed REA skill identity is stale.",
        remediation: skillIdentityRemediation(identity),
    };
};
const registrationCheck = (registration) => ({
    name: `registration:${registration.client}`,
    ok: false,
    classification: registration.state === "unknown" ? "unknown" : "config_drift",
    detail: registration.config_path,
    remediation: registration.remediation,
});
const installationState = (launchers) => {
    const installations = new Set(launchers.map(({ installation }) => installation));
    return installations.size === 0
        ? "unknown"
        : installations.size === 1
            ? "single"
            : "multiple";
};
/**
 * One installation is one launcher directory after symlink resolution. npm
 * writes `rea`, `rea.cmd` and `rea.ps1` side by side on Windows, where `where`
 * lists each and directory spelling is case-insensitive; PATH can also reach
 * one launcher through a symlinked directory. An unresolvable launcher keeps
 * its listed path rather than joining another installation.
 */
const launcherInstallation = async (path, platform) => {
    const resolved = await realpath(path).catch(() => path);
    return platform === "win32"
        ? win32.dirname(resolved).toLowerCase()
        : posix.dirname(resolved);
};
const runInChildResourceScope = (parent, label, operation) => parent.track(async () => {
    const child = new ArtifactResourceScope();
    try {
        return await operation(child);
    }
    finally {
        if (child.hasPending) {
            parent.retain({
                kind: "lease",
                resource: label,
                lease: AnalysisCleanupLease.forCloseOwner(child, label),
            });
        }
        else {
            await child.close();
        }
    }
});
/** Create diagnostics backed by the current process and host commands. */
export const systemDoctorHost = (options = {}) => {
    const resources = new ArtifactResourceScope();
    const controller = new AbortController();
    const inspectionSignal = options.signal === undefined
        ? controller.signal
        : AbortSignal.any([options.signal, controller.signal]);
    const platform = options.platform ?? HOST_PLATFORM.platform;
    const architecture = options.architecture ?? HOST_PLATFORM.architecture;
    const environment = options.environment ?? process.env;
    const nativeConfiguration = inspectNativeAnalysisConfiguration(snapshotEnvironment(environment, platform));
    const execute = options.execFileOutput ?? execFileOutput;
    // These commands report short host facts, not analysis output. Reuse the
    // ILSpy probe's ten-second allowance and bound each captured stream to 64 KiB.
    // Baseline diagnostics must work without provider ownership prerequisites.
    const hostExecFileOutput = (command, args, input) => resources.track(async () => {
        try {
            const output = await execute(command, args, {
                ...input,
                timeout: 10_000,
                maxBuffer: 64 * 1024,
                stopSignal: "SIGTERM",
                signal: inspectionSignal,
            });
            if (inspectionSignal.aborted)
                throw cancelledBy("doctor", inspectionSignal, {
                    capturedOutput: {
                        stdout: output.stdout,
                        stderr: output.stderr,
                        stdout_bytes: output.stdoutBytes,
                        stderr_bytes: output.stderrBytes,
                        exit_code: 0,
                        signal: null,
                        truncated: false,
                    },
                });
            return output;
        }
        catch (cause) {
            if (cause instanceof ExecFileOutputCancelledError) {
                const output = execFileOutputFailure(cause);
                throw cancelledBy("doctor", carriedReason(cause.cause), output === undefined
                    ? {}
                    : { capturedOutput: execFileFailureCapturedOutput(output) });
            }
            throw cause;
        }
    });
    const homeDirectory = homeDirectoryFromEnvironment(environment, platform);
    const commandEnvironment = { env: environment };
    const resourceScope = {
        retain: (owner, resource) => resources.retain({
            kind: "lease",
            resource,
            lease: AnalysisCleanupLease.forCloseOwner(owner, resource),
        }),
        run: (operation) => resources.track(operation),
    };
    const resolveProviderRequestBudget = options.resolveProviderRequestBudget === undefined
        ? undefined
        : Object.assign((provider, environment) => options.resolveProviderRequestBudget(provider, environment, resourceScope, inspectionSignal), 
        // Carry the declared read set through the 2-parameter adaptation,
        // so the budget gate stays fail-closed only for settings this
        // resolver may actually read.
        options.resolveProviderRequestBudget.budgetSettings === undefined
            ? {}
            : {
                budgetSettings: options.resolveProviderRequestBudget.budgetSettings,
            });
    const host = {
        ...(options.signal === undefined ? {} : { signal: options.signal }),
        platform,
        architecture,
        runtime: javaScriptRuntime(process.versions),
        homeDirectory,
        ...(environment.HOPPER_LAUNCHER_PATH === undefined
            ? {}
            : { configuredHopperPath: environment.HOPPER_LAUNCHER_PATH }),
        nativeConfiguration,
        ...(environment.REA_ILSPY_CMD_PATH === undefined
            ? {}
            : { configuredIlspyCmdPath: environment.REA_ILSPY_CMD_PATH }),
        macosVersion: () => readMacosVersion(hostExecFileOutput, commandEnvironment),
        linuxDistribution: () => readLinuxDistribution(architecture),
        async validTarget(path) {
            const { parseBinaryTarget } = await import("./BinaryTargetResolver.js");
            return (await parseBinaryTarget(path, {
                cwd: process.cwd(),
                hostArchitecture: architecture,
            })).ok;
        },
        async inspectTarget(path) {
            const { parseBinaryTarget } = await import("./BinaryTargetResolver.js");
            const result = await parseBinaryTarget(path, {
                cwd: process.cwd(),
                hostArchitecture: architecture,
            });
            if (result.ok)
                return {
                    name: "target",
                    ok: true,
                    classification: "healthy",
                    detail: path,
                };
            const error = result.error;
            const targetError = error instanceof BinaryTargetError ? error : undefined;
            return {
                name: "target",
                ok: false,
                classification: targetError?.constraint !== undefined
                    ? "unsupported_target"
                    : "config_drift",
                detail: path,
                details: {
                    reason: targetError?.reason ?? error.message,
                    ...(targetError?.constraint === undefined
                        ? {}
                        : { constraint: targetError.constraint }),
                },
                remediation: analysisErrorRemediationAction(error),
            };
        },
        executable: (path) => executableAvailable(path, platform, hostExecFileOutput, commandEnvironment),
        linuxDemoRuntimeCheck: () => options.linuxDemoRuntimeCheck === undefined
            ? uncomposedLinuxDemoRuntimeCheck()
            : options.linuxDemoRuntimeCheck(resourceScope, inspectionSignal),
        inspectLinuxHopper: (path) => inspectLinuxHopperLauncher(path, environment),
        async brewHopperPath() {
            return probeHomebrew(async (command) => {
                let caskroom;
                try {
                    // Without a cask argument, `--caskroom` does not load Homebrew's
                    // cask API, so doctor writes no Homebrew cache files.
                    caskroom = (await hostExecFileOutput(command, ["--caskroom"], commandEnvironment)).stdout.trim();
                }
                catch (cause) {
                    if (cause instanceof AnalysisCancelledError)
                        throw cause;
                    // best-effort cleanup: optional Homebrew probing; absence means uninstalled.
                    void cause;
                    return undefined;
                }
                const appdir = await installedCaskAppdir(caskroom, "hopper-disassembler", homeDirectory);
                return appdir === undefined
                    ? undefined
                    : appendCallerPath(appdir, "Hopper Disassembler.app/Contents/MacOS/hopper");
            });
        },
        manualHopperPaths: () => readMacHopperRenamedLauncherCandidates(homeDirectory),
        ...(options.providerInspections === undefined
            ? {}
            : {
                providerInspections: (clients) => resources.track(() => options.providerInspections(resourceScope, inspectionSignal, clients)),
            }),
        ...(resolveProviderRequestBudget === undefined
            ? {}
            : { resolveProviderRequestBudget }),
        async ilspyCmdVersion(path) {
            try {
                await access(path, constants.X_OK);
                return firstIlspyVersionLine((await hostExecFileOutput(path, ["--version"], commandEnvironment))
                    .stdout);
            }
            catch (cause) {
                if (cause instanceof AnalysisCancelledError)
                    throw cause;
                // best-effort cleanup: optional version probing; failure means unavailable.
                void cause;
                return undefined;
            }
        },
        async installationLaunchers() {
            try {
                const command = platform === "win32" ? "where" : "which";
                const arguments_ = platform === "win32" ? ["rea"] : ["-a", "rea"];
                const paths = uniqueLines((await hostExecFileOutput(command, arguments_, commandEnvironment))
                    .stdout);
                return await Promise.all(paths.map(async (path) => ({
                    path,
                    installation: await launcherInstallation(path, platform),
                })));
            }
            catch (cause) {
                if (cause instanceof AnalysisCancelledError)
                    throw cause;
                // best-effort cleanup: optional path probing; failure means none found.
                void cause;
                return [];
            }
        },
        installedSkillIdentity: (clientIds) => runInChildResourceScope(resources, "skill-identity", (child) => readInstalledSkillIdentity(homeDirectory, clientIds, environment, platform, child)),
        close: async () => {
            controller.abort(OwnerCancellation.startupOwnerClosed);
            try {
                await resources.close();
                return undefined;
            }
            catch (cause) {
                const observation = ArtifactReaderFailure.cleanupObservation(cause, "doctor resources");
                const failure = new ProviderCleanupError("rea", observation.resources, { reason: observation.reason }, { cause, operation: "doctor" });
                bindArtifactFileCleanup(cause, failure);
                throw failure;
            }
        },
        clientRegistrations: (selectedClientIds, providerSettings, ownedProviderSetting, observeProviderSetting) => runInChildResourceScope(resources, "client-registrations", (child) => readClientRegistrationStatuses(homeDirectory, undefined, {
            platform,
            environment,
            resources: child,
            ...(selectedClientIds === undefined ? {} : { selectedClientIds }),
            ...(ownedProviderSetting === undefined
                ? {}
                : { ownedProviderSetting }),
            ...(observeProviderSetting === undefined
                ? {}
                : { observeProviderSetting }),
            ...(providerSettings === undefined
                ? {}
                : {
                    providerSettings: registrationSpelledSettings(providerSettings, environment),
                }),
            ...(resolveProviderRequestBudget === undefined
                ? {}
                : {
                    resolveProviderRequestBudget,
                }),
        })),
    };
    const readFacts = options.desktopBuildFacts;
    return readFacts === undefined
        ? host
        : {
            ...host,
            desktopBuildFacts: (clientIds) => runInChildResourceScope(resources, "desktop-build-facts", (child) => readFacts({
                environment,
                platform,
                signal: inspectionSignal,
                resources: child,
                run: hostExecFileOutput,
                clientIds,
                registrations: host.clientRegistrations,
            })),
        };
};
const readMacosVersion = async (run, options) => {
    try {
        return (await run("/usr/bin/sw_vers", ["-productVersion"], options)).stdout.trim();
    }
    catch (cause) {
        if (cause instanceof AnalysisCancelledError)
            throw cause;
        // best-effort cleanup: optional OS version probing; failure means unknown.
        void cause;
        return undefined;
    }
};
const executableAvailable = async (path, platform, run, options) => {
    try {
        await access(path, constants.X_OK);
        if (!(await stat(path)).isFile())
            return false;
        if (platform !== "linux")
            return true;
        const linked = await run("ldd", [path], options);
        return linuxSharedLibrariesAvailable(`${linked.stdout}\n${linked.stderr}`);
    }
    catch (cause) {
        if (cause instanceof AnalysisCancelledError)
            throw cause;
        // best-effort cleanup: optional executable probing; failure means unavailable.
        void cause;
        return false;
    }
};
const uncomposedLinuxDemoRuntimeCheck = () => Promise.resolve({
    name: "hopper-demo-runtime",
    ok: false,
    classification: "config_drift",
    detail: "Linux Hopper private-display diagnostics were not composed",
    remediation: "Run rea doctor through the production CLI adapter.",
});
const uniqueLines = (value) => [
    ...new Set(value
        .split(/\r?\n/u)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)),
];
const firstIlspyVersionLine = (value) => uniqueLines(value).find((line) => line.startsWith("ilspycmd:"));
