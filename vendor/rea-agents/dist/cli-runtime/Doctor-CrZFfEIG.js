import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, AnalysisError, BinaryTargetError, MAX_NODE_TIMER_DELAY_MS, OwnerCancellation, SUPPORTED_NODE_VERSION_PROSE, blocksProcessStart, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_configurationErrors, init_errorMessage, init_jsonValue, init_processStart, init_runtimeVersion, javaScriptRuntime, jsonValueSchema, supportsJavaScriptRuntime } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { PRODUCT_IDENTITY, SDK_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { DESKTOP_BUILD_PROVIDER_ID, analysisErrorRemediationAction, init_analysisErrorPresentation, init_analysisErrorProjection, init_doctorProviderIds, isDesktopBuildCheck, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { AnalysisCleanupLease, ArtifactReaderFailure, ArtifactResourceScope, bindArtifactFileCleanup, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_SupportedClients, manualRegistrationRemediation } from "./SupportedClients-C1oeYZNH.js";
import { ExecFileOutputCancelledError, execFileFailureCapturedOutput, execFileOutput, execFileOutputFailure, init_ExecFileOutput } from "./ExecFileOutput-YDVPmL3I.js";
import { homeDirectoryFromEnvironment, init_homeDirectory } from "./homeDirectory-DC_DeJIg.js";
import { init_parseConfig, inspectNativeAnalysisConfiguration } from "./parseConfig-Bllp42MT.js";
import { init_canonicalOrdering, uniqueSorted } from "./canonicalOrdering-C7Yzy62j.js";
import { init_SetupSkill, readInstalledSkillIdentity } from "./SetupSkill-C0Ili3Va.js";
import { RECORDED_DEFAULT_CATALOG_IDENTITY, init_recordedCatalogDigests } from "./recordedCatalogDigests-CmASFVov.js";
import { DESKTOP_EXPORT_FRAMEWORK_VERSION, init_appExport } from "./appExport-CjCA74-5.js";
import { LINUX_HOPPER_SETUP_HOSTS, hopperLauncherDiscovery, init_HopperLauncherDiscovery, init_LinuxHopper, init_MacHopperPaths, inspectLinuxHopperLauncher, linuxSharedLibrariesAvailable, readLinuxDistribution, readMacHopperRenamedLauncherCandidates, supportsReaHost } from "./HopperLauncherDiscovery-CgQ1J_rv.js";
import { init_ClientRegistrationStatus, init_SetupRegistrationEnvironment, readClientRegistrationStatuses, registrationSpelledSettings } from "./SetupRegistrationEnvironment-Z2gzconq.js";
import { constants } from "node:fs";
import { join, posix, win32 } from "node:path";
import { z } from "zod";
import { access, readFile, realpath, stat } from "node:fs/promises";

//#region dist/application/homebrew.js
var HOMEBREW_COMMANDS, probeHomebrew, caskDirectoriesSchema, caskConfigSchema, installedCaskAppdir;
function init_homebrew() {
	return (init_homebrew = __esmMin((() => {
		init_callerPath();
		HOMEBREW_COMMANDS = [
			"brew",
			"/opt/homebrew/bin/brew",
			"/usr/local/bin/brew"
		];
		probeHomebrew = async (probe) => {
			for (const command of HOMEBREW_COMMANDS) {
				const result = await probe(command);
				if (result !== undefined) return result;
			}
			return undefined;
		};
		caskDirectoriesSchema = z.object({ appdir: z.string().min(1).optional() }).loose();
		caskConfigSchema = z.object({
			default: caskDirectoriesSchema.optional(),
			env: caskDirectoriesSchema.optional(),
			explicit: caskDirectoriesSchema.optional()
		}).loose();
		installedCaskAppdir = async (caskroom, token, home) => {
			let text;
			try {
				text = await readFile(join(caskroom, token, ".metadata", "config.json"), "utf8");
			} catch (cause) {
				void cause;
				return undefined;
			}
			let parsed;
			try {
				parsed = JSON.parse(text);
			} catch (cause) {
				void cause;
				return undefined;
			}
			const config = caskConfigSchema.safeParse(parsed);
			if (!config.success) return undefined;
			const appdir = config.data.explicit?.appdir ?? config.data.env?.appdir ?? config.data.default?.appdir;
			if (appdir === undefined) return undefined;
			return appdir.startsWith("~/") ? appendCallerPath(home, appdir.slice(2)) : appdir;
		};
	})))();
}

//#endregion
//#region dist/contracts/catalog/defaultCatalogIdentity.js
var loadDefaultCatalogIdentity;
function init_defaultCatalogIdentity() {
	return (init_defaultCatalogIdentity = __esmMin((() => {
		init_recordedCatalogDigests();
		loadDefaultCatalogIdentity = async () => RECORDED_DEFAULT_CATALOG_IDENTITY ?? (await import("./catalogIdentity-MngsEs90.js").then((n) => (n.init_catalogIdentity(), n.catalogIdentity_exports))).DEFAULT_CATALOG_IDENTITY;
	})))();
}

//#endregion
//#region dist/domain/macosVersion.js
var macosVersionComponents, macosMajorVersion, macosVersionMeetsMinimum;
function init_macosVersion() {
	return (init_macosVersion = __esmMin((() => {
		macosVersionComponents = (version) => {
			if (version === undefined || !/^\d+(?:\.\d+)*$/u.test(version)) return undefined;
			const components = version.split(".").map(Number);
			return components.every((component) => Number.isSafeInteger(component)) ? components : undefined;
		};
		macosMajorVersion = (version) => macosVersionComponents(version)?.[0];
		macosVersionMeetsMinimum = (hostVersion, minimumVersion) => {
			const host = macosVersionComponents(hostVersion);
			const minimum = macosVersionComponents(minimumVersion);
			if (host === undefined || minimum === undefined) return undefined;
			for (let index = 0; index < Math.max(host.length, minimum.length); index++) {
				const difference = (host[index] ?? 0) - (minimum[index] ?? 0);
				if (difference !== 0) return difference > 0;
			}
			return true;
		};
	})))();
}

//#endregion
//#region dist/application/settleConcurrent.js
var settleConcurrent;
function init_settleConcurrent() {
	return (init_settleConcurrent = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		settleConcurrent = async (tasks) => {
			const settled = await Promise.allSettled(tasks);
			const rejected = settled.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
			if (rejected.length > 0) {
				const physical = rejected.find((cause) => !(cause instanceof AnalysisCancelledError));
				if (physical !== undefined) throw physical;
				const withCleanup = rejected.find((cause) => cause instanceof AnalysisError && cause.cleanupIncomplete);
				throw withCleanup ?? rejected[0];
			}
			return settled.map((outcome) => outcome.status === "fulfilled" ? outcome.value : undefined);
		};
	})))();
}

//#endregion
//#region dist/application/DoctorDiagnostics.js
var collectDoctorDiagnostics, doctorHealthy, nodeCheck, hostCheck$1, findHopper, firstExecutable, hopperCheck, optionalHopperStartupTimeoutCheck, runtimeConfigurationChecks, optionalHopperVersionCheck, optionalHopperDemoCheck, optionalIlspyCheck, optionalTargetCheck, check, providerDoctorChecks, unsupportedHopperRemediation, providerCheckName;
function init_DoctorDiagnostics() {
	return (init_DoctorDiagnostics = __esmMin((() => {
		init_analysisResourceLimits();
		init_runtimeVersion();
		init_HopperLauncherDiscovery();
		init_macosVersion();
		init_LinuxHopper();
		init_doctorProviderIds();
		init_settleConcurrent();
		collectDoctorDiagnostics = async (target, host, clients = []) => {
			const checks = [nodeCheck(host)];
			const [resolvedHostCheck, hopperOutcome, providerInspections, ilspyCheck, targetCheck] = await settleConcurrent([
				hostCheck$1(host),
				(async () => {
					const hopperPath = await findHopper(host);
					const [hopperVersionCheck, hopperDemoCheck] = await settleConcurrent([optionalHopperVersionCheck(host, hopperPath), optionalHopperDemoCheck(host, hopperPath)]);
					return {
						hopperPath,
						hopperVersionCheck,
						hopperDemoCheck
					};
				})(),
				Promise.resolve(host.providerInspections?.(clients ?? [])),
				optionalIlspyCheck(host),
				optionalTargetCheck(target, host)
			]);
			checks.push(resolvedHostCheck);
			const { hopperPath, hopperVersionCheck, hopperDemoCheck } = hopperOutcome;
			checks.push(hopperCheck(host, hopperPath));
			const hopperTimeoutCheck = optionalHopperStartupTimeoutCheck(host);
			if (hopperTimeoutCheck !== undefined) checks.push(hopperTimeoutCheck);
			checks.push(...runtimeConfigurationChecks(host));
			if (hopperVersionCheck !== undefined) checks.push(hopperVersionCheck);
			if (providerInspections !== undefined) checks.push(...providerInspections.flatMap(providerDoctorChecks));
			if (ilspyCheck !== undefined) checks.push(ilspyCheck);
			if (hopperDemoCheck !== undefined) checks.push(hopperDemoCheck);
			if (targetCheck !== undefined) checks.push(targetCheck);
			return {
				checks,
				...hopperPath === undefined ? {} : { hopperPath },
				...providerInspections === undefined ? {} : { providerInspections }
			};
		};
		doctorHealthy = (checks, providers) => {
			const audited = checks.filter(({ name }) => !isDesktopBuildCheck(name));
			if (providers.providerInspections === undefined) return audited.every(({ ok }) => ok);
			const providerChecks = audited.filter(({ name }) => name.startsWith("hopper") || providers.providerInspections?.some((inspection) => providerCheckName(inspection.id, name)) === true);
			const coreHealthy = audited.filter((candidate) => !providerChecks.includes(candidate)).every(({ ok }) => ok);
			const configuredProvidersHealthy = providerChecks.filter(({ name }) => {
				if (name === "hopper-startup-timeout") return true;
				if (name.startsWith("hopper")) return providers.hopperConfigured;
				return providers.providerInspections?.some((inspection) => inspection.configured && providerCheckName(inspection.id, name));
			}).every(({ ok }) => ok);
			return coreHealthy && configuredProvidersHealthy && (providers.hopperAvailable || providers.providerInspections.some(({ available }) => available));
		};
		nodeCheck = ({ runtime }) => {
			const failure = {
				remediation: `Install ${SUPPORTED_NODE_VERSION_PROSE}.`,
				classification: "missing_dependency"
			};
			if (runtime.id === "node") return {
				...check("node", supportsJavaScriptRuntime(runtime), runtime.version, failure),
				details: {
					runtime: "node",
					version: runtime.version
				}
			};
			return {
				...check("node", supportsJavaScriptRuntime(runtime), `Bun ${runtime.version} (Node.js ${runtime.nodeCompatibilityVersion} compatibility)`, failure),
				details: {
					runtime: "bun",
					version: runtime.version,
					node_compatibility_version: runtime.nodeCompatibilityVersion
				}
			};
		};
		hostCheck$1 = async (host) => {
			const macosVersion = host.platform === "darwin" ? await host.macosVersion() : undefined;
			const linuxDistribution = host.platform === "linux" ? await host.linuxDistribution() : undefined;
			const macosMajor = macosMajorVersion(macosVersion);
			if (host.platform === "darwin" && macosMajor === undefined) return {
				name: "host",
				ok: false,
				classification: "unknown",
				detail: macosVersion === undefined ? "The macOS version could not be determined." : `The macOS version probe returned an unrecognized value: ${JSON.stringify(macosVersion)}.`,
				remediation: "Check /usr/bin/sw_vers -productVersion and rerun doctor."
			};
			const supported = host.platform === "darwin" && macosMajor !== undefined && macosMajor >= 12 || host.platform === "linux" && supportsReaHost(linuxDistribution) || host.platform === "win32" && host.architecture === "x64";
			const detail = macosVersion ?? (linuxDistribution === undefined ? `${host.platform} ${host.architecture}` : `${linuxDistribution.id} ${linuxDistribution.versionId ?? "unknown"}`);
			return check("host", supported, detail, {
				remediation: `REA supports macOS 12+, Linux distributions with a recognized apt, dnf, or pacman package family, and the experimental Windows x64 Ghidra P0 boundary; automated Hopper setup on Linux additionally requires ${LINUX_HOPPER_SETUP_HOSTS}.`,
				classification: "unsupported_host"
			});
		};
		findHopper = async (host) => {
			if (host.configuredHopperPath !== undefined) return firstExecutable(host, [host.configuredHopperPath]);
			const discovery = hopperLauncherDiscovery(host.platform, host.homeDirectory);
			const fixed = await firstExecutable(host, discovery.candidates);
			if (fixed !== undefined || !discovery.probesMacApplicationBundles) return fixed;
			const renamed = await firstExecutable(host, await host.manualHopperPaths());
			if (renamed !== undefined) return renamed;
			const brewCandidate = await host.brewHopperPath();
			return firstExecutable(host, brewCandidate === undefined ? [] : [brewCandidate]);
		};
		firstExecutable = async (host, candidates) => {
			for (const candidate of new Set(candidates)) if (await host.executable(candidate)) return candidate;
			return undefined;
		};
		hopperCheck = (host, hopperPath) => check("hopper", hopperPath !== undefined, hopperPath ?? host.configuredHopperPath, {
			remediation: host.configuredHopperPath === undefined ? "Run rea setup to install Hopper, or set HOPPER_LAUNCHER_PATH." : "Unset or update HOPPER_LAUNCHER_PATH to an executable Hopper launcher.",
			classification: host.configuredHopperPath === undefined ? "missing_analysis_engine" : "config_drift"
		});
		optionalHopperStartupTimeoutCheck = (host) => {
			const parsed = host.nativeConfiguration?.configuredHopperStartupTimeout;
			if (parsed === undefined) return undefined;
			return check("hopper-startup-timeout", parsed.ok, parsed.ok ? `REA_HOPPER_STARTUP_TIMEOUT_MS=${String(parsed.value)}` : `REA_HOPPER_STARTUP_TIMEOUT_MS: ${parsed.error.settings.map(({ constraint }) => constraint).join("; ")}`, {
				classification: "config_drift",
				remediation: `Unset REA_HOPPER_STARTUP_TIMEOUT_MS to use the default, or set it to a positive decimal integer from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)} milliseconds.`
			});
		};
		runtimeConfigurationChecks = (host) => {
			const issues = host.nativeConfiguration?.issues;
			if (issues === undefined || issues.length === 0) return [];
			const grouped = [];
			for (const issue of issues) {
				if (issue.setting === "REA_HOPPER_STARTUP_TIMEOUT_MS") continue;
				const existing = grouped.find((item) => item.setting === issue.setting);
				if (existing === undefined) grouped.push({
					setting: issue.setting,
					constraints: [issue.constraint]
				});
				else existing.constraints.push(issue.constraint);
			}
			return grouped.map(({ setting, constraints }) => ({
				...check(`runtime-configuration:${setting}`, false, constraints.map((constraint) => constraint.includes(setting) ? constraint.replace(/\.$/u, "") : `${setting}: ${constraint}`).join("; "), {
					classification: "config_drift",
					remediation: `Correct ${setting} in the environment that starts REA (your shell or the MCP client's registration), then rerun.`
				}),
				details: { setting }
			}));
		};
		optionalHopperVersionCheck = async (host, hopperPath) => {
			if (host.platform !== "linux" || hopperPath === undefined) return undefined;
			const inspected = await host.inspectLinuxHopper(hopperPath);
			const buildCheck = check("hopper-version", inspected.ok, hopperPath, {
				remediation: unsupportedHopperRemediation(host.configuredHopperPath === hopperPath),
				classification: !inspected.ok && [
					"release_metadata",
					"download",
					"verification_unavailable",
					"cancelled",
					"cleanup_failed"
				].includes(inspected.error.reason) ? "unknown" : "config_drift"
			});
			return {
				...buildCheck,
				details: inspected.ok ? {
					reported_release_version: inspected.value.version,
					launcher_sha256: inspected.value.sha256,
					primary_fingerprint: inspected.value.primaryFingerprint,
					source: inspected.value.source
				} : {
					reason: inspected.error.reason,
					message: inspected.error.message
				}
			};
		};
		optionalHopperDemoCheck = async (host, hopperPath) => host.platform !== "linux" || hopperPath === undefined ? undefined : host.linuxDemoRuntimeCheck();
		optionalIlspyCheck = async (host) => {
			if (host.configuredIlspyCmdPath === undefined) return undefined;
			const version = await host.ilspyCmdVersion?.(host.configuredIlspyCmdPath);
			return check("ilspycmd", version !== undefined, version === undefined ? host.configuredIlspyCmdPath : `${host.configuredIlspyCmdPath} (${version})`, {
				remediation: "Unset REA_ILSPY_CMD_PATH or point it at a runnable ilspycmd executable.",
				classification: "config_drift"
			});
		};
		optionalTargetCheck = async (target, host) => target === undefined ? undefined : host.inspectTarget !== undefined ? host.inspectTarget(target) : check("target", await host.validTarget(target), target, {
			remediation: "Supply a readable local app or program path.",
			classification: "config_drift"
		});
		check = (name, ok, detail, failure) => ({
			name,
			ok,
			classification: ok ? "healthy" : failure.classification,
			...detail === undefined ? {} : { detail },
			...ok ? {} : { remediation: failure.remediation }
		});
		providerDoctorChecks = (inspection) => inspection.checks.map((candidate) => ({
			name: candidate.name === "configuration" ? inspection.id : `${inspection.id}-${candidate.name}`,
			ok: candidate.ok,
			classification: candidate.ok ? "healthy" : candidate.classification,
			detail: candidate.detail,
			...candidate.remediation === null ? {} : { remediation: candidate.remediation },
			...candidate.details === undefined ? {} : { details: candidate.details }
		}));
		unsupportedHopperRemediation = (configured) => configured ? "Check HOPPER_LAUNCHER_PATH and its publisher verification evidence. Run rea setup to install and retain an authenticated official Hopper package for offline use." : "Run rea setup to install and retain an authenticated official Hopper package for offline use.";
		providerCheckName = (providerId, name) => name === providerId || name.startsWith(`${providerId}-`);
	})))();
}

//#endregion
//#region dist/application/DesktopBuildDoctor.js
var DESKTOP_BUILD_MIN_FREE_BYTES, AGENTENV_INSTALL_COMMAND, INFORMATIONAL, isDesktopBuildInformationalCheck, named, result, selectedDesktopBuildChecks, setupCommand, desktopBuildChecks, hostCheck, commandDetail, dockerCheck, daemonCheck, diskCheck, agentEnvCheck, archiveCheck, registrationCheck$2, registrationDetail, skillCheck, solveEndpointCheck, leftoverContainersCheck;
function init_DesktopBuildDoctor() {
	return (init_DesktopBuildDoctor = __esmMin((() => {
		init_appExport();
		init_DoctorDiagnostics();
		init_doctorProviderIds();
		DESKTOP_BUILD_MIN_FREE_BYTES = 20 * 1e3 ** 3;
		AGENTENV_INSTALL_COMMAND = `uv tool install agentenv-framework==${DESKTOP_EXPORT_FRAMEWORK_VERSION}`;
		INFORMATIONAL = new Set([`${DESKTOP_BUILD_PROVIDER_ID}-solve-endpoint`, `${DESKTOP_BUILD_PROVIDER_ID}-leftover-containers`]);
		isDesktopBuildInformationalCheck = (name) => INFORMATIONAL.has(name);
		named = (name) => `${DESKTOP_BUILD_PROVIDER_ID}-${name}`;
		result = (name, ok, detail, outcome) => ({
			name: named(name),
			ok,
			classification: ok ? "healthy" : outcome.classification,
			detail,
			...outcome.details === undefined ? {} : { details: outcome.details },
			...ok ? {} : { remediation: outcome.remediation }
		});
		selectedDesktopBuildChecks = async (host, scope, skill) => scope.providers.includes("desktop_build") && host.desktopBuildFacts !== undefined ? desktopBuildChecks(await host.desktopBuildFacts(scope.clients), {
			host,
			clients: scope.clients,
			skill
		}) : [];
		setupCommand = (clients) => clients.length === 1 ? `rea setup --client ${clients[0]} --desktop-build` : "rea setup --client <client> --desktop-build";
		desktopBuildChecks = (facts, context) => [
			hostCheck(context.host),
			{
				...nodeCheck(context.host),
				name: named("node")
			},
			result("ps", facts.ps.found, facts.ps.detail, {
				classification: "missing_dependency",
				remediation: "Install procps, whose ps REA's process supervisor runs from /bin/ps or /usr/bin/ps: sudo apt install procps."
			}),
			dockerCheck(facts.docker),
			daemonCheck(facts.daemon),
			diskCheck(facts.disk),
			agentEnvCheck(facts),
			archiveCheck(facts.archive, context.clients),
			registrationCheck$2(facts, context.clients),
			skillCheck(context.skill),
			solveEndpointCheck(facts.solveEndpoint),
			leftoverContainersCheck(facts.leftoverContainers)
		];
		hostCheck = (host) => result("host", host.platform === "linux" && (host.architecture === "x64" || host.architecture === "arm64"), `${host.platform} ${host.architecture}`, {
			classification: "unsupported_host",
			remediation: "Builds run on a Linux host on amd64 or arm64 and target its own architecture; run REA on such a host."
		});
		commandDetail = (command, name) => command.status === "found" ? `${command.path} (${command.source === "environment" ? name : "PATH"})` : command.status === "invalid" ? `${name}=${command.value} is not an absolute path to a program.` : `${name} is unset and none is on PATH.`;
		dockerCheck = (docker) => result("docker", docker.status === "found", commandDetail(docker, "REA_DOCKER_COMMAND"), {
			classification: docker.status === "invalid" ? "config_drift" : "missing_dependency",
			remediation: docker.status === "invalid" ? "Set REA_DOCKER_COMMAND to the absolute path of the Docker CLI, or unset it to use docker on PATH." : "Install Docker Engine: https://docs.docker.com/engine/install/"
		});
		daemonCheck = (daemon) => result("docker-daemon", daemon.status === "reachable", daemon.status === "reachable" ? `Docker keeps its data in ${daemon.rootDirectory}.` : daemon.status === "unchecked" ? "Not checked without a Docker CLI." : daemon.detail, daemon.status === "unreachable" ? {
			classification: "runtime_failure",
			remediation: "Start Docker (sudo systemctl start docker), then rerun rea doctor --provider desktop_build."
		} : {
			classification: "config_drift",
			remediation: "Let your user reach Docker without sudo: sudo usermod -aG docker $USER, then log out and in again."
		});
		diskCheck = (disk) => {
			const gb = (bytes) => `${(bytes / 1e3 ** 3).toFixed(1)} GB`;
			return "error" in disk ? result("disk", false, `${disk.path}: ${disk.error}`, {
				classification: "unknown",
				remediation: `Check that ${disk.path} is readable, then rerun rea doctor --provider desktop_build.`
			}) : result("disk", disk.freeBytes >= DESKTOP_BUILD_MIN_FREE_BYTES, `${gb(disk.freeBytes)} free in ${disk.path}.`, {
				classification: "missing_dependency",
				remediation: `Free at least ${gb(DESKTOP_BUILD_MIN_FREE_BYTES)} in ${disk.path}, or move Docker's data root (data-root in /etc/docker/daemon.json) to a larger disk.`,
				details: {
					path: disk.path,
					free_bytes: disk.freeBytes
				}
			});
		};
		agentEnvCheck = (facts) => {
			const { agentEnv } = facts;
			const clients = facts.registrations.filter(({ registered }) => registered);
			if (clients.some(({ runner, unresolved }) => runner !== undefined || unresolved.includes("REA_AGENT_ENV_COMMAND"))) {
				const rows = clients.map(({ client, runner, unresolved }) => ({
					client,
					...runner ?? (unresolved.includes("REA_AGENT_ENV_COMMAND") ? { status: "unknown" } : agentEnv.status !== "found" ? { status: "invalid" } : agentEnv.version === undefined ? { status: "unknown" } : {
						status: agentEnv.version === "0.9.1485" ? "current" : "stale",
						version: agentEnv.version
					})
				}));
				const healthy = rows.every(({ status }) => status === "current");
				return result("agent-env", healthy, rows.map(({ client, status }) => `${client}'s runner is ${status}.`).join(" "), {
					classification: rows.some(({ status }) => status === "unknown") ? "unknown" : "missing_dependency",
					remediation: `${AGENTENV_INSTALL_COMMAND}, or rea setup --desktop-build --install-agentenv.`,
					details: {
						expected_version: DESKTOP_EXPORT_FRAMEWORK_VERSION,
						clients: rows
					}
				});
			}
			const pinned = agentEnv.version === DESKTOP_EXPORT_FRAMEWORK_VERSION;
			const detail = agentEnv.status !== "found" ? commandDetail(agentEnv, "REA_AGENT_ENV_COMMAND") : `${commandDetail(agentEnv, "REA_AGENT_ENV_COMMAND")} reports ${agentEnv.version === undefined ? "no version" : `agentenv-framework ${agentEnv.version}`}; bundles target ${DESKTOP_EXPORT_FRAMEWORK_VERSION}.`;
			return result("agent-env", agentEnv.status === "found" && pinned, detail, {
				classification: agentEnv.status === "invalid" ? "config_drift" : "missing_dependency",
				remediation: agentEnv.status === "invalid" ? `Set REA_AGENT_ENV_COMMAND to the absolute path of agent-env, or unset it to use agent-env on PATH. To install it: ${AGENTENV_INSTALL_COMMAND}` : `${AGENTENV_INSTALL_COMMAND}, or rea setup --desktop-build --install-agentenv.`,
				details: { expected_version: DESKTOP_EXPORT_FRAMEWORK_VERSION }
			});
		};
		archiveCheck = (archive, clients) => result("archive", archive.status === "current", archive.detail ?? (archive.status === "current" ? `${archive.path} holds this REA version.` : `${archive.path} is missing.`), {
			classification: archive.status === "unknown" ? "unknown" : "config_drift",
			remediation: archive.source === "environment" ? `Repack it with npm run pack:build-computer-runtime -- ${archive.path}, or unset REA_BUILD_COMPUTER_REA_ARCHIVE and run ${setupCommand(clients)}.` : `Run ${setupCommand(clients)} to pack it.`,
			details: {
				path: archive.path,
				source: archive.source
			}
		});
		registrationCheck$2 = (facts, clients) => {
			const set = new Set(facts.environmentSettings);
			const gaps = facts.registrations.map(({ client, registered, unrecorded, unresolved, differing = [], unchecked = [], runner }) => ({
				client,
				registered,
				missing: unrecorded.filter((name) => !set.has(name)),
				unresolved: [...unresolved],
				...differing.length === 0 ? {} : { differing: [...differing] },
				...unchecked.length === 0 ? {} : { unchecked: [...unchecked] },
				...runner === undefined ? {} : { runner }
			}));
			const failing = gaps.filter(({ registered, missing, differing, runner }) => !registered || missing.length > 0 || (differing ?? []).some((name) => name !== "REA_AGENT_ENV_COMMAND" || runner?.status !== "current"));
			const unknown = gaps.filter(({ unresolved, unchecked }) => unresolved.length > 0 || (unchecked?.length ?? 0) > 0);
			const repair = failing[0]?.client ?? unknown[0]?.client;
			const remediation = failing.some(({ differing }) => (differing?.length ?? 0) > 0) ? "Correct or remove the failed settings in the client's REA registration, then restart the client and run doctor again." : unknown.length > 0 ? "Check the unverified settings in the client's REA registration, then restart the client and run doctor again." : `Run ${setupCommand(repair === undefined ? clients : [repair])}, then restart the client.`;
			return result("registration", gaps.length > 0 && failing.length === 0 && unknown.length === 0, gaps.length === 0 ? "No REA registration was found." : gaps.map(registrationDetail).join(" "), {
				classification: failing.length === 0 && gaps.length > 0 ? "unknown" : "config_drift",
				remediation,
				details: { registrations: gaps }
			});
		};
		registrationDetail = (gap) => {
			if (!gap.registered) return `${gap.client} does not register REA.`;
			const details = [
				...gap.missing.length === 0 ? [] : [`${gap.client}'s registration does not record ${gap.missing.join(", ")}, and this environment does not set them.`],
				...gap.unresolved.length === 0 ? [] : [`REA could not read ${gap.client}'s ${gap.unresolved.join(", ")}.`],
				...gap.differing === undefined ? [] : [`${gap.client}'s recorded ${gap.differing.join(", ")} failed verification.`],
				...gap.unchecked === undefined ? [] : [`REA could not verify ${gap.client}'s recorded ${gap.unchecked.join(", ")}.`]
			];
			return details.length > 0 ? details.join(" ") : `${gap.client}'s registration records the build settings, or this environment sets them.`;
		};
		skillCheck = (skill) => result("skill", skill.state === "aligned", `The installed REA skill, with its desktop-build reference, is ${skill.state}.`, {
			classification: skill.state === "unknown" ? "unknown" : "config_drift",
			remediation: skill.remediation ?? "Run rea setup --skill to update the REA skill."
		});
		solveEndpointCheck = (where) => result("solve-endpoint", where !== undefined && where !== null, where === null ? "REA could not determine whether agentenv has a model endpoint configured." : where === undefined ? "No model endpoint is configured for solver runs." : `A model endpoint is configured in ${where}; its availability was not checked.`, {
			classification: where === null ? "unknown" : "missing_dependency",
			remediation: "For solver runs, export LITELLM_BASE_URL and LITELLM_API_KEY in the shell that starts the agent, or set base_url and api_key under [model] in .agentenv/config.toml."
		});
		leftoverContainersCheck = (containers) => result("leftover-containers", containers === undefined || containers.length === 0, containers === undefined ? "Not checked without a reachable Docker daemon." : containers.length === 0 ? "No agentenv sandbox containers are left." : `${String(containers.length)} agentenv sandbox containers remain: ${containers.join(", ")}.`, {
			classification: "config_drift",
			remediation: `If no build is running, remove them: docker rm -f ${(containers ?? []).join(" ")}`
		});
	})))();
}

//#endregion
//#region dist/application/DoctorScope.js
var normalizeDoctorScope, scopeDoctorChecks, registrationEnvironmentInScope, isProviderCheck, selectedProviderChecksFor, requiredDesktopBuildChecks, selectedRegistrationCheck, registrationCheck$1, selectedSkillCheck, doctorProviderCheckName;
function init_DoctorScope() {
	return (init_DoctorScope = __esmMin((() => {
		init_canonicalOrdering();
		init_processStart();
		init_SupportedClients();
		init_DesktopBuildDoctor();
		init_doctorProviderIds();
		normalizeDoctorScope = (requested, target) => ({
			mode: requested === undefined ? "audit-wide" : "explicit",
			clients: uniqueSorted(requested?.clients ?? []),
			...requested?.skillClients === undefined ? {} : { skill_clients: uniqueSorted(requested.skillClients) },
			providers: uniqueSorted(requested?.providers ?? []),
			skill: requested?.skill === true,
			target: target ?? null
		});
		scopeDoctorChecks = (input) => {
			const providerChecks = input.checks.filter((candidate) => isProviderCheck(candidate.name, input.providers.providerInspections));
			const coreChecks = input.checks.filter(({ name }) => name === "node" || input.scope.target !== null && name === "target");
			const clientChecks = input.scope.clients.map((client) => selectedRegistrationCheck(client, input.registrations.find((candidate) => candidate.client === client)));
			const environmentChecks = input.checks.filter((check) => registrationEnvironmentInScope(check, input.scope));
			const skillChecks = input.scope.skill ? [selectedSkillCheck(input.skillState, input.checks)] : [];
			const selectedProviderChecks = input.scope.providers.flatMap((providerId) => providerId === "desktop_build" ? requiredDesktopBuildChecks(input.checks) : selectedProviderChecksFor(providerId, providerChecks, input.providers));
			const hopperHostChecks = input.scope.providers.includes("hopper") ? input.checks.filter(({ name }) => name === "host") : [];
			const blocksMcpStartup = (check) => check.name.startsWith("runtime-configuration:") || check.name === "hopper-startup-timeout";
			const blocksProcess = (check) => {
				const setting = check.details?.setting;
				return check.name.startsWith("runtime-configuration:") && typeof setting === "string" && blocksProcessStart(setting);
			};
			const exercisesMcpStartup = input.scope.clients.length > 0 || input.scope.providers.length > 0;
			const startupChecks = (exercisesMcpStartup ? input.checks.filter(blocksMcpStartup) : input.checks.filter(blocksProcess)).filter((check) => check.name !== "hopper-startup-timeout" || !input.scope.providers.includes("hopper"));
			const scopeChecks = [
				...coreChecks,
				...startupChecks,
				...hopperHostChecks,
				...selectedProviderChecks,
				...clientChecks,
				...environmentChecks,
				...skillChecks
			];
			const selectedNames = new Set(scopeChecks.map(({ name }) => name));
			return {
				healthy: coreChecks.every(({ ok }) => ok) && startupChecks.every(({ ok }) => ok) && hopperHostChecks.every(({ ok }) => ok) && clientChecks.every(({ ok }) => ok) && skillChecks.every(({ ok }) => ok) && selectedProviderChecks.every(({ ok }) => ok),
				scopeChecks,
				informationalChecks: input.checks.filter(({ name }) => !selectedNames.has(name))
			};
		};
		registrationEnvironmentInScope = ({ name, details }, scope) => {
			const [family, client] = name.split(":");
			if (family !== "registration_environment" || client === undefined) return false;
			const providers = details?.providers;
			return scope.clients.includes(client) || Array.isArray(providers) && scope.providers.some((provider) => providers.includes(provider));
		};
		isProviderCheck = (name, inspections) => name.startsWith("hopper") || inspections?.some(({ id }) => doctorProviderCheckName(id, name)) === true;
		selectedProviderChecksFor = (providerId, checks, providers) => {
			const selected = checks.filter(({ name }) => providerId === "hopper" ? name.startsWith("hopper") : doctorProviderCheckName(providerId, name));
			const available = providerId === "hopper" ? providers.hopperAvailable : providers.providerInspections?.find(({ id }) => id === providerId)?.available === true;
			if (available && selected.every(({ ok }) => ok)) return selected;
			if (selected.some(({ ok }) => !ok)) return selected;
			return [...selected, {
				name: `provider:${providerId}`,
				ok: false,
				classification: "missing_analysis_engine",
				detail: `Requested provider ${providerId} is unavailable.`,
				remediation: `Configure the ${providerId} provider, then rerun rea doctor.`
			}];
		};
		requiredDesktopBuildChecks = (checks) => {
			const required = checks.filter(({ name }) => isDesktopBuildCheck(name) && !isDesktopBuildInformationalCheck(name));
			return required.length > 0 ? required : [{
				name: `provider:${DESKTOP_BUILD_PROVIDER_ID}`,
				ok: false,
				classification: "unknown",
				detail: "This doctor host does not check desktop build hosts.",
				remediation: "Run rea doctor --provider desktop_build from the CLI."
			}];
		};
		selectedRegistrationCheck = (client, status) => {
			const manual = manualRegistrationRemediation(client);
			if (status === undefined && manual !== undefined) return {
				name: `registration:${client}`,
				ok: false,
				classification: "config_drift",
				detail: `${client} is not registered through a local configuration file.`,
				remediation: manual
			};
			return status === undefined ? {
				name: `registration:${client}`,
				ok: false,
				classification: "config_drift",
				detail: `Requested client ${client} was not detected.`,
				remediation: `Install or select ${client}, then run rea setup --client ${client}.`
			} : status.state === "aligned" ? {
				name: `registration:${client}`,
				ok: true,
				classification: "healthy",
				detail: status.config_path
			} : registrationCheck$1(status);
		};
		registrationCheck$1 = (status) => ({
			name: `registration:${status.client}`,
			ok: false,
			classification: status.state === "unknown" ? "unknown" : "config_drift",
			detail: status.config_path,
			remediation: status.remediation
		});
		selectedSkillCheck = (state, checks) => checks.find(({ name }) => name === "skill:identity") ?? {
			name: "skill:identity",
			ok: state === "aligned",
			classification: state === "aligned" ? "healthy" : state === "unknown" ? "unknown" : "config_drift",
			...state === "aligned" ? { detail: "Installed REA skill identity is aligned." } : { remediation: state === "unmanaged" ? "Use regular skill directories, or run rea setup with --skill=false to configure the client without installing the skill." : state === "unknown" ? "Verify access to the reported skill files before retrying." : "Run rea setup to update the installed REA skill." }
		};
		doctorProviderCheckName = (providerId, name) => name === providerId || name.startsWith(`${providerId}-`);
	})))();
}

//#endregion
//#region dist/application/Doctor.js
var Doctor_exports = /* @__PURE__ */ __exportAll({
	runDoctor: () => runDoctor,
	runDoctorOwned: () => runDoctorOwned,
	systemDoctorHost: () => systemDoctorHost
});
var runDoctor, runDoctorOwned, inspectDoctor, registrationAdvisoryChecks, providerSettingSelections, registrationEnvironmentDetail, registrationEnvironmentChecks, closeDoctorHost, doctorReportWithCleanup, collectDoctorIdentity, skillIdentityAligned, skillIdentityState, skillIdentityRemediation, skillIdentityCheck, registrationCheck, installationState, launcherInstallation, runInChildResourceScope, systemDoctorHost, readMacosVersion, executableAvailable, uncomposedLinuxDemoRuntimeCheck, uniqueLines, firstIlspyVersionLine;
function init_Doctor() {
	return (init_Doctor = __esmMin((() => {
		init_HostPlatform();
		init_analysisErrorProjection();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_resources();
		init_parseConfig();
		init_homeDirectory();
		init_snapshotEnvironment();
		init_callerPath();
		init_analysisErrorPresentation();
		init_configurationErrors();
		init_ExecFileOutput();
		init_jsonValue();
		init_runtimeVersion();
		init_homebrew();
		init_MacHopperPaths();
		init_LinuxHopper();
		init_SetupSkill();
		init_defaultCatalogIdentity();
		init_identity();
		init_ClientRegistrationStatus();
		init_SetupRegistrationEnvironment();
		init_DoctorDiagnostics();
		init_DoctorScope();
		init_DesktopBuildDoctor();
		init_errorMessage();
		init_settleConcurrent();
		runDoctor = async (target, selectedHost, requestedScope) => selectedHost === undefined ? runDoctorOwned(target, systemDoctorHost(), requestedScope) : inspectDoctor(target, selectedHost, requestedScope);
		runDoctorOwned = async (target, host, requestedScope) => {
			let report;
			try {
				report = await inspectDoctor(target, host, requestedScope);
			} catch (cause) {
				const cleanup = await closeDoctorHost(host);
				if (cleanup !== undefined && cause instanceof AnalysisError) {
					const cleanupError = typeof cleanup === "string" ? new ProviderCleanupError("rea", [], { reason: cleanup }, { operation: "doctor" }) : cleanup;
					throw analysisErrorWithCleanupDependencies(cause, cleanupError, "doctor");
				}
				if (cleanup !== undefined) throw new AggregateError([cause, typeof cleanup === "string" ? new Error(cleanup) : cleanup], "Doctor failed and its resource cleanup remains incomplete.", { cause });
				throw cause;
			}
			const cleanup = await closeDoctorHost(host);
			if (cleanup === undefined && report.healthy && host.signal?.aborted) throw cancelledBy("doctor", host.signal, { diagnostics: { doctor_report: jsonValueSchema.parse(report) } });
			return cleanup === undefined ? report : doctorReportWithCleanup(report, cleanup);
		};
		inspectDoctor = async (target, host, requestedScope) => {
			if (host.signal?.aborted) throw cancelledBy("doctor", host.signal);
			const scope = normalizeDoctorScope(requestedScope, target);
			const { checks: diagnosticChecks, hopperPath, providerInspections } = await collectDoctorDiagnostics(target, host, scope.clients);
			const hopperAvailable = hopperPath !== undefined && diagnosticChecks.filter(({ name }) => name.startsWith("hopper")).every(({ ok }) => ok);
			const selections = providerSettingSelections(providerInspections, hopperAvailable && hopperPath === host.configuredHopperPath ? hopperPath : undefined);
			const identity = await collectDoctorIdentity(host, scope, selections);
			const checks = [
				...diagnosticChecks,
				...identity.checks,
				...registrationAdvisoryChecks(identity.value.registrations),
				...registrationEnvironmentChecks(identity.value.registrations, selections),
				...await selectedDesktopBuildChecks(host, scope, identity.value.skill)
			];
			const providers = {
				hopperAvailable,
				hopperConfigured: host.configuredHopperPath !== undefined,
				providerInspections
			};
			const environmentHealthy = doctorHealthy(checks, providers);
			const scoped = scopeDoctorChecks({
				checks,
				registrations: identity.value.registrations,
				skillState: identity.value.skill.state,
				providers,
				scope
			});
			return {
				healthy: scope.mode === "audit-wide" ? environmentHealthy : scoped.healthy,
				environment_healthy: environmentHealthy,
				scope,
				scope_checks: scope.mode === "audit-wide" ? checks : scoped.scopeChecks,
				informational_checks: scope.mode === "audit-wide" ? [] : scoped.informationalChecks,
				...hopperPath === undefined ? {} : { hopperPath },
				...providerInspections === undefined ? {} : { providerInspections },
				checks,
				identity: identity.value
			};
		};
		registrationAdvisoryChecks = (registrations) => registrations.flatMap(({ client, advisory }) => advisory === undefined ? [] : [{
			name: `registration_timeout:${client}`,
			ok: true,
			classification: "healthy",
			detail: advisory
		}]);
		providerSettingSelections = (inspections, configuredHopperPath) => [...(inspections ?? []).filter(({ available }) => available).map(({ id, registrationEnvironment }) => ({
			provider: id,
			settings: registrationEnvironment
		})), ...configuredHopperPath === undefined ? [] : [{
			provider: "hopper",
			settings: { HOPPER_LAUNCHER_PATH: configuredHopperPath }
		}]];
		registrationEnvironmentDetail = (client, { unrecorded, differing, unresolved }) => [
			`Provider checks used this terminal's environment; what the server ${client} starts receives is unknown.`,
			...unrecorded.length === 0 ? [] : [`Its registration does not record ${unrecorded.join(", ")}.`],
			...differing.length === 0 ? [] : [`It records other values for ${differing.join(", ")}.`],
			...unresolved.length === 0 ? [] : [`REA could not resolve its ${unresolved.join(", ")}.`]
		].join(" ");
		registrationEnvironmentChecks = (registrations, selections) => registrations.flatMap(({ client, provider_settings: settings }) => {
			if (settings === undefined) return [];
			const { unrecorded, differing, unresolved } = settings;
			const names = [
				...unrecorded,
				...differing,
				...unresolved
			];
			return [{
				name: `registration_environment:${client}`,
				ok: true,
				classification: "unknown",
				detail: registrationEnvironmentDetail(client, settings),
				details: {
					effective_environment: "unknown",
					providers: selections.filter(({ settings: selected }) => names.some((name) => selected[name] !== undefined)).map(({ provider }) => provider)
				},
				remediation: `Preview rea setup --client ${client} --skill=false --dry-run from this terminal, apply it to record these settings and restart the client, or read binary_session result.tool_availability in the client.`
			}];
		});
		closeDoctorHost = async (host) => {
			try {
				return await host.close?.();
			} catch (cause) {
				if (cause instanceof AnalysisError) return cause;
				return `Doctor host cleanup failed: ${errorMessage(cause)}`;
			}
		};
		doctorReportWithCleanup = (report, cleanup) => {
			const check = {
				name: "doctor-resource-cleanup",
				ok: false,
				classification: "config_drift",
				detail: typeof cleanup === "string" ? cleanup : `${cleanup.message} ${cleanup.cleanupResources.join(", ")}`,
				...typeof cleanup === "string" ? {} : { details: { cleanup_failure: projectAnalysisError(cleanup) } },
				remediation: "Resolve the reported cleanup failure, then rerun rea doctor."
			};
			return {
				...report,
				healthy: false,
				environment_healthy: false,
				checks: [...report.checks, check],
				scope_checks: [...report.scope_checks, check]
			};
		};
		collectDoctorIdentity = async (host, scope, selections) => {
			const skillClientIds = scope.skill_clients ?? (scope.clients.length > 0 ? scope.clients : undefined);
			const [resolvedLaunchers, resolvedRegistrations, installedSkillIdentity, defaultCatalogIdentity] = await settleConcurrent([
				Promise.resolve(host.installationLaunchers?.()),
				Promise.resolve(host.clientRegistrations?.(scope.clients, Object.fromEntries(selections.flatMap(({ settings }) => Object.entries(settings))))),
				Promise.resolve(host.installedSkillIdentity?.(skillClientIds)),
				loadDefaultCatalogIdentity()
			]);
			const launchers = resolvedLaunchers ?? [];
			const registrations = resolvedRegistrations ?? [];
			const skillAligned = skillIdentityAligned(installedSkillIdentity, defaultCatalogIdentity.counts.mcp_tools);
			return {
				checks: [...skillAligned ? [] : [skillIdentityCheck(installedSkillIdentity, defaultCatalogIdentity.counts.mcp_tools)], ...registrations.filter((registration) => registration.state !== "aligned" && registration.state !== "manual").map(registrationCheck)],
				value: {
					cli_package_version: PRODUCT_IDENTITY.packageVersion,
					expected_skill_version: PRODUCT_IDENTITY.skillVersion,
					sdk: SDK_IDENTITY,
					catalog: {
						counts: defaultCatalogIdentity.counts,
						digests: defaultCatalogIdentity.digests
					},
					live_server: {
						state: "unknown",
						remediation: "Call binary_session in the active client to inspect the running server identity; a registration whose saved scope omits the session family cannot report it, so include session through rea setup --tool-families and restart first."
					},
					installations: {
						paths: launchers.map(({ path }) => path),
						state: installationState(launchers)
					},
					skill: {
						installed_version: installedSkillIdentity?.version ?? null,
						installed_tool_count: installedSkillIdentity?.toolCount ?? null,
						state: skillIdentityState(installedSkillIdentity, defaultCatalogIdentity.counts.mcp_tools),
						...installedSkillIdentity?.issues === undefined ? {} : { issues: installedSkillIdentity.issues },
						remediation: skillAligned ? null : skillIdentityRemediation(installedSkillIdentity)
					},
					registrations
				}
			};
		};
		skillIdentityAligned = (identity, expectedToolCount) => identity?.version === PRODUCT_IDENTITY.skillVersion && identity.toolCount === expectedToolCount && identity.canonical;
		skillIdentityState = (identity, expectedToolCount) => {
			if (identity?.issues?.some(({ kind }) => kind === "unreadable" || kind === "unresolved")) return "unknown";
			if (identity?.issues?.some(({ kind }) => kind === "symbolic_link" || kind === "not_directory")) return "unmanaged";
			if (identity?.issues?.some(({ kind }) => kind === "stale")) return "stale";
			if (identity?.issues?.some(({ kind }) => kind === "missing")) return "missing";
			return identity === undefined ? "missing" : skillIdentityAligned(identity, expectedToolCount) ? "aligned" : "stale";
		};
		skillIdentityRemediation = (identity) => {
			const issues = identity?.issues;
			if (issues !== undefined && issues.length > 0) return issues.map(({ path, detail, kind, client }) => {
				const repair = kind === "stale" || kind === "missing" ? `Run rea setup --skill-client ${client ?? "shared"} --skill to repair this copy.` : "Repair the selected path/profile before rerunning setup, or use --skill=false to configure clients without installing the skill.";
				return `${detail} (${path}). ${repair}`;
			}).join(" ");
			return "Run rea setup to update the installed REA skill.";
		};
		skillIdentityCheck = (identity, expectedToolCount) => {
			const issues = identity?.issues;
			const state = skillIdentityState(identity, expectedToolCount);
			return {
				name: "skill:identity",
				ok: false,
				classification: state === "unknown" ? "unknown" : "config_drift",
				detail: issues !== undefined && issues.length > 0 ? `Selected skill identity is ${state}: ${issues.map(({ path }) => path).join(", ")}.` : identity === undefined ? "Installed REA skill identity is missing." : "Installed REA skill identity is stale.",
				remediation: skillIdentityRemediation(identity)
			};
		};
		registrationCheck = (registration) => ({
			name: `registration:${registration.client}`,
			ok: false,
			classification: registration.state === "unknown" ? "unknown" : "config_drift",
			detail: registration.config_path,
			remediation: registration.remediation
		});
		installationState = (launchers) => {
			const installations = new Set(launchers.map(({ installation }) => installation));
			return installations.size === 0 ? "unknown" : installations.size === 1 ? "single" : "multiple";
		};
		launcherInstallation = async (path, platform) => {
			const resolved = await realpath(path).catch(() => path);
			return platform === "win32" ? win32.dirname(resolved).toLowerCase() : posix.dirname(resolved);
		};
		runInChildResourceScope = (parent, label, operation) => parent.track(async () => {
			const child = new ArtifactResourceScope();
			try {
				return await operation(child);
			} finally {
				if (child.hasPending) {
					parent.retain({
						kind: "lease",
						resource: label,
						lease: AnalysisCleanupLease.forCloseOwner(child, label)
					});
				} else {
					await child.close();
				}
			}
		});
		systemDoctorHost = (options = {}) => {
			const resources = new ArtifactResourceScope();
			const controller = new AbortController();
			const inspectionSignal = options.signal === undefined ? controller.signal : AbortSignal.any([options.signal, controller.signal]);
			const platform = options.platform ?? HOST_PLATFORM.platform;
			const architecture = options.architecture ?? HOST_PLATFORM.architecture;
			const environment = options.environment ?? process.env;
			const nativeConfiguration = inspectNativeAnalysisConfiguration(snapshotEnvironment(environment, platform));
			const execute = options.execFileOutput ?? execFileOutput;
			const hostExecFileOutput = (command, args, input) => resources.track(async () => {
				try {
					const output = await execute(command, args, {
						...input,
						timeout: 1e4,
						maxBuffer: 64 * 1024,
						stopSignal: "SIGTERM",
						signal: inspectionSignal
					});
					if (inspectionSignal.aborted) throw cancelledBy("doctor", inspectionSignal, { capturedOutput: {
						stdout: output.stdout,
						stderr: output.stderr,
						stdout_bytes: output.stdoutBytes,
						stderr_bytes: output.stderrBytes,
						exit_code: 0,
						signal: null,
						truncated: false
					} });
					return output;
				} catch (cause) {
					if (cause instanceof ExecFileOutputCancelledError) {
						const output = execFileOutputFailure(cause);
						throw cancelledBy("doctor", carriedReason(cause.cause), output === undefined ? {} : { capturedOutput: execFileFailureCapturedOutput(output) });
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
					lease: AnalysisCleanupLease.forCloseOwner(owner, resource)
				}),
				run: (operation) => resources.track(operation)
			};
			const resolveProviderRequestBudget = options.resolveProviderRequestBudget === undefined ? undefined : Object.assign((provider, environment) => options.resolveProviderRequestBudget(provider, environment, resourceScope, inspectionSignal), options.resolveProviderRequestBudget.budgetSettings === undefined ? {} : { budgetSettings: options.resolveProviderRequestBudget.budgetSettings });
			const host = {
				...options.signal === undefined ? {} : { signal: options.signal },
				platform,
				architecture,
				runtime: javaScriptRuntime(process.versions),
				homeDirectory,
				...environment.HOPPER_LAUNCHER_PATH === undefined ? {} : { configuredHopperPath: environment.HOPPER_LAUNCHER_PATH },
				nativeConfiguration,
				...environment.REA_ILSPY_CMD_PATH === undefined ? {} : { configuredIlspyCmdPath: environment.REA_ILSPY_CMD_PATH },
				macosVersion: () => readMacosVersion(hostExecFileOutput, commandEnvironment),
				linuxDistribution: () => readLinuxDistribution(architecture),
				async validTarget(path) {
					const { parseBinaryTarget } = await import("./BinaryTargetResolver-DJfoiHmh.js").then((n) => (n.init_BinaryTargetResolver(), n.BinaryTargetResolver_exports));
					return (await parseBinaryTarget(path, {
						cwd: process.cwd(),
						hostArchitecture: architecture
					})).ok;
				},
				async inspectTarget(path) {
					const { parseBinaryTarget } = await import("./BinaryTargetResolver-DJfoiHmh.js").then((n) => (n.init_BinaryTargetResolver(), n.BinaryTargetResolver_exports));
					const result = await parseBinaryTarget(path, {
						cwd: process.cwd(),
						hostArchitecture: architecture
					});
					if (result.ok) return {
						name: "target",
						ok: true,
						classification: "healthy",
						detail: path
					};
					const error = result.error;
					const targetError = error instanceof BinaryTargetError ? error : undefined;
					return {
						name: "target",
						ok: false,
						classification: targetError?.constraint !== undefined ? "unsupported_target" : "config_drift",
						detail: path,
						details: {
							reason: targetError?.reason ?? error.message,
							...targetError?.constraint === undefined ? {} : { constraint: targetError.constraint }
						},
						remediation: analysisErrorRemediationAction(error)
					};
				},
				executable: (path) => executableAvailable(path, platform, hostExecFileOutput, commandEnvironment),
				linuxDemoRuntimeCheck: () => options.linuxDemoRuntimeCheck === undefined ? uncomposedLinuxDemoRuntimeCheck() : options.linuxDemoRuntimeCheck(resourceScope, inspectionSignal),
				inspectLinuxHopper: (path) => inspectLinuxHopperLauncher(path, environment),
				async brewHopperPath() {
					return probeHomebrew(async (command) => {
						let caskroom;
						try {
							caskroom = (await hostExecFileOutput(command, ["--caskroom"], commandEnvironment)).stdout.trim();
						} catch (cause) {
							if (cause instanceof AnalysisCancelledError) throw cause;
							void cause;
							return undefined;
						}
						const appdir = await installedCaskAppdir(caskroom, "hopper-disassembler", homeDirectory);
						return appdir === undefined ? undefined : appendCallerPath(appdir, "Hopper Disassembler.app/Contents/MacOS/hopper");
					});
				},
				manualHopperPaths: () => readMacHopperRenamedLauncherCandidates(homeDirectory),
				...options.providerInspections === undefined ? {} : { providerInspections: (clients) => resources.track(() => options.providerInspections(resourceScope, inspectionSignal, clients)) },
				...resolveProviderRequestBudget === undefined ? {} : { resolveProviderRequestBudget },
				async ilspyCmdVersion(path) {
					try {
						await access(path, constants.X_OK);
						return firstIlspyVersionLine((await hostExecFileOutput(path, ["--version"], commandEnvironment)).stdout);
					} catch (cause) {
						if (cause instanceof AnalysisCancelledError) throw cause;
						void cause;
						return undefined;
					}
				},
				async installationLaunchers() {
					try {
						const command = platform === "win32" ? "where" : "which";
						const arguments_ = platform === "win32" ? ["rea"] : ["-a", "rea"];
						const paths = uniqueLines((await hostExecFileOutput(command, arguments_, commandEnvironment)).stdout);
						return await Promise.all(paths.map(async (path) => ({
							path,
							installation: await launcherInstallation(path, platform)
						})));
					} catch (cause) {
						if (cause instanceof AnalysisCancelledError) throw cause;
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
					} catch (cause) {
						const observation = ArtifactReaderFailure.cleanupObservation(cause, "doctor resources");
						const failure = new ProviderCleanupError("rea", observation.resources, { reason: observation.reason }, {
							cause,
							operation: "doctor"
						});
						bindArtifactFileCleanup(cause, failure);
						throw failure;
					}
				},
				clientRegistrations: (selectedClientIds, providerSettings, ownedProviderSetting, observeProviderSetting) => runInChildResourceScope(resources, "client-registrations", (child) => readClientRegistrationStatuses(homeDirectory, undefined, {
					platform,
					environment,
					resources: child,
					...selectedClientIds === undefined ? {} : { selectedClientIds },
					...ownedProviderSetting === undefined ? {} : { ownedProviderSetting },
					...observeProviderSetting === undefined ? {} : { observeProviderSetting },
					...providerSettings === undefined ? {} : { providerSettings: registrationSpelledSettings(providerSettings, environment) },
					...resolveProviderRequestBudget === undefined ? {} : { resolveProviderRequestBudget }
				}))
			};
			const readFacts = options.desktopBuildFacts;
			return readFacts === undefined ? host : {
				...host,
				desktopBuildFacts: (clientIds) => runInChildResourceScope(resources, "desktop-build-facts", (child) => readFacts({
					environment,
					platform,
					signal: inspectionSignal,
					resources: child,
					run: hostExecFileOutput,
					clientIds,
					registrations: host.clientRegistrations
				}))
			};
		};
		readMacosVersion = async (run, options) => {
			try {
				return (await run("/usr/bin/sw_vers", ["-productVersion"], options)).stdout.trim();
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError) throw cause;
				void cause;
				return undefined;
			}
		};
		executableAvailable = async (path, platform, run, options) => {
			try {
				await access(path, constants.X_OK);
				if (!(await stat(path)).isFile()) return false;
				if (platform !== "linux") return true;
				const linked = await run("ldd", [path], options);
				return linuxSharedLibrariesAvailable(`${linked.stdout}\n${linked.stderr}`);
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError) throw cause;
				void cause;
				return false;
			}
		};
		uncomposedLinuxDemoRuntimeCheck = () => Promise.resolve({
			name: "hopper-demo-runtime",
			ok: false,
			classification: "config_drift",
			detail: "Linux Hopper private-display diagnostics were not composed",
			remediation: "Run rea doctor through the production CLI adapter."
		});
		uniqueLines = (value) => [...new Set(value.split(/\r?\n/u).map((line) => line.trim()).filter((line) => line.length > 0))];
		firstIlspyVersionLine = (value) => uniqueLines(value).find((line) => line.startsWith("ilspycmd:"));
	})))();
}

//#endregion
export { AGENTENV_INSTALL_COMMAND, Doctor_exports, init_DesktopBuildDoctor, init_Doctor, init_macosVersion, init_settleConcurrent, macosMajorVersion, macosVersionMeetsMinimum, runDoctor, settleConcurrent, systemDoctorHost };