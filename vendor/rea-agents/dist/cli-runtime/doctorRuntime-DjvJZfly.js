import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, AnalysisCapabilityUnavailableError, cancelledBy, carriedReason, errorMessage, init_analysisErrorCore, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_safeJson, init_strictUtf8, safeParseJson, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, mergeEnvironmentOverrides, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactFileCleanupFailure, ArtifactResourceScope, RegularFileCleanupFailure, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactResourceScope, init_OwnedRegularFile, init_resources, regularFileCancellation, withArtifactFileHandle } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { RetainedRegularFileCleanupFailure, init_RegularFileRead, readRegularFileText } from "./RegularFileRead-CRu2Ia6l.js";
import { init_SupportedClients, resolveSupportedClients } from "./SupportedClients-C1oeYZNH.js";
import { clientRegistrationEnvironmentDetails, init_ClientConfigurationFiles, init_ClientRegistrationEnvironment, readEffectiveClientRegistrationConfiguration } from "./ClientRegistration-BAglyiA5.js";
import { execFileOutputFailure, init_ExecFileOutput } from "./ExecFileOutput-YDVPmL3I.js";
import { homeDirectoryFromEnvironment, init_homeDirectory } from "./homeDirectory-DC_DeJIg.js";
import { describeSystemPs, init_systemPs, resolveSystemPs } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { cleanupOwnedProcessGroup, init_ProcessOwnership } from "./ProcessOwnership-CezAYpow.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { analysisClientFailureForOperation, init_AnalysisClientFailure } from "./AnalysisClientFailure-DEt-O8Hp.js";
import { JADX_FAILURE_KINDS, JADX_JAR_CONFIGURATION_REMEDIATION, init_JadxConfiguration, init_JadxRelease, inspectJadxAvailability, jadxFailureClassification } from "./JadxConfiguration-D6Tl50Zm.js";
import { BUILD_COMPUTER_SETTINGS, init_buildComputerSettings } from "./buildComputerSettings-CBkm3nxB.js";
import { DESKTOP_EXPORT_FRAMEWORK_VERSION, init_appExport } from "./appExport-CjCA74-5.js";
import { PYTHON_BUILD_ARCHIVE_PROBE, init_appBuildArchive } from "./appBuildArchive-C5zrHQMh.js";
import { init_Doctor, init_settleConcurrent, settleConcurrent, systemDoctorHost } from "./Doctor-CrZFfEIG.js";
import { init_LinuxHopperPython, inspectLinuxHopperPythonRuntime, linuxHopperPythonUnavailable } from "./HopperLauncherDiscovery-CgQ1J_rv.js";
import { agentEnvReportedVersion, defaultBuildComputerArchive, init_BuildComputerEnvironment, programOnPath, resolveBuildComputerProgram } from "./BuildComputerEnvironment-V50CmKer.js";
import { EXISTING_PROJECT_WINDOWS_REMEDIATION, EXISTING_PROJECT_WINDOWS_UNAVAILABLE, GHIDRA_RESTRICTED_TEMP_REMEDIATION, IDA_WORKSPACE_ROOT_REMEDIATION, KUNA_COMMAND_REMEDIATION, KUNA_PROVIDER_ID, KUNA_UNVERIFIED_VERSION_REMEDIATION, KUNA_VERIFIED_VERSION, KUNA_VERSION_PROBE_REMEDIATION, admitGhidraInstallation, admitIdaConfiguration, admitKunaCommand, init_GhidraAdmission, init_GhidraInstallation, init_GhidraTemporaryDirectory, init_IdaAdmission, init_IdaConfiguration, init_KunaAdmission, init_KunaRelease, init_LinuxPrivateDisplayProbe, inspectGhidraInstallation, probeGhidraTemporaryDirectory, readIdaConfiguration, selectLinuxPrivateDisplayStrategy } from "./KunaAdmission-B_Q9expM.js";
import { constants } from "node:fs";
import { basename, dirname, isAbsolute, join, posix, win32 } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";
import { access, lstat, open, realpath, stat, statfs } from "node:fs/promises";
import { execFile } from "node:child_process";

//#region dist/process/BoundedControlLines.js
/**
* Frame wire bytes before decoding. The limit excludes LF or CRLF. Report
* overflow as soon as it is known, then drain to LF before the next frame.
* The caller owns failure policy and the input iterator's early-return cleanup.
*/
async function* readBoundedControlLines(chunks, maxBytes) {
	const decoder = strictUtf8Decoder("preserve");
	let pending;
	let pendingBytes = 0;
	let oversized = false;
	const decode = (bytes) => {
		if (bytes.length > maxBytes) return exceeded;
		try {
			return ok(decoder.decode(bytes));
		} catch (cause) {
			if (!(cause instanceof TypeError)) throw cause;
			return malformed;
		}
	};
	for await (const chunk of chunks) {
		let start = 0;
		while (start < chunk.length) {
			const newline = chunk.indexOf(LF, start);
			const end = newline === -1 ? chunk.length : newline;
			if (!oversized) {
				const fragment = chunk.subarray(start, end);
				const count = pendingBytes + fragment.length;
				const last = fragment.length > 0 ? fragment[fragment.length - 1] : pending?.[pendingBytes - 1];
				if (count > maxBytes + (last === CR ? 1 : 0)) {
					pendingBytes = 0;
					oversized = true;
					yield exceeded;
				} else if (newline !== -1) {
					const length = count - (last === CR ? 1 : 0);
					if (pending === undefined || pendingBytes === 0) yield decode(fragment.subarray(0, length));
					else {
						pending.set(fragment, pendingBytes);
						yield decode(pending.subarray(0, length));
					}
					pendingBytes = 0;
				} else if (fragment.length > 0) {
					pending ??= new Uint8Array(maxBytes + 1);
					pending.set(fragment, pendingBytes);
					pendingBytes = count;
				}
			}
			if (newline === -1) break;
			oversized = false;
			start = newline + 1;
		}
	}
	if (pending !== undefined && pendingBytes > 0) yield decode(pending.subarray(0, pendingBytes));
}
var exceeded, malformed, LF, CR;
function init_BoundedControlLines() {
	return (init_BoundedControlLines = __esmMin((() => {
		init_result();
		init_strictUtf8();
		exceeded = err({ _tag: "ControlLineLimitExceeded" });
		malformed = err({ _tag: "ControlLineMalformedUtf8" });
		LF = 10;
		CR = 13;
	})))();
}

//#endregion
//#region dist/desktop/AgentEnvProviderIdentity.js
var AGENTENV_PROVIDER;
function init_AgentEnvProviderIdentity() {
	return (init_AgentEnvProviderIdentity = __esmMin((() => {
		AGENTENV_PROVIDER = "agentenv";
	})))();
}

//#endregion
//#region dist/desktop/AgentEnvComputerHelper.js
var execFileAsync, HELPER, HANDSHAKE_BYTES, STDERR_BYTES, TEARDOWN_MS, RUNNER_REMEDIATION, handshakeSchema, unavailable, executable$1, readHead, agentEnvInterpreter, CONTAINER_NAME, sandboxFilters, removeSandbox, parseHandshake, ComputerHelper;
function init_AgentEnvComputerHelper() {
	return (init_AgentEnvComputerHelper = __esmMin((() => {
		init_analysisErrorCore();
		init_BoundedControlLines();
		init_ProcessOwnership();
		init_ProviderProcess();
		init_resources();
		init_errorMessage();
		init_AgentEnvProviderIdentity();
		execFileAsync = promisify(execFile);
		HELPER = fileURLToPath(new URL("../../bridge/agentenv/computer.py", new URL("../desktop/AgentEnvComputerHelper.js", import.meta.url).href));
		HANDSHAKE_BYTES = 64 * 1024;
		STDERR_BYTES = 16 * 1024;
		TEARDOWN_MS = 12e4;
		RUNNER_REMEDIATION = "Put agent-env on PATH, or set REA_AGENT_ENV_COMMAND to the absolute path of the agent-env program of an agentenv-framework install (a venv, uv tool or pipx), then restart REA. rea doctor --provider desktop_build checks the build host.";
		handshakeSchema = z.union([z.strictObject({
			base_url: z.url({ protocol: /^https?$/u }),
			mcp_url: z.url({ protocol: /^https?$/u }),
			control_token: z.string().min(1).nullable(),
			sandbox_id: z.string().min(1)
		}), z.strictObject({ error: z.string() })]);
		unavailable = (operation, reason, cause) => new AnalysisCapabilityUnavailableError(AGENTENV_PROVIDER, operation, reason, {
			userMessage: reason,
			remediationAction: RUNNER_REMEDIATION,
			...cause === undefined ? {} : { cause }
		});
		executable$1 = async (path) => access(path, constants.X_OK).then(() => true, () => false);
		readHead = async (path, resources) => withArtifactFileHandle(path, await open(path, "r"), resources, undefined, async (file) => {
			const { buffer, bytesRead } = await file.read(Buffer.alloc(512), 0, 512, 0);
			return buffer.subarray(0, bytesRead).toString("utf8");
		});
		agentEnvInterpreter = async (environment, operation, resources) => {
			const command = environment.REA_AGENT_ENV_COMMAND;
			if (command === undefined || !isAbsolute(command)) throw unavailable(operation, "Build computers need REA_AGENT_ENV_COMMAND, the absolute path of agentenv's agent-env program, or agent-env on PATH; REA runs its helper with that runner's Python.");
			let program;
			let head;
			try {
				program = await realpath(command);
				head = await readHead(program, resources);
			} catch (cause) {
				if (cause instanceof ArtifactFileCleanupFailure) throw cause;
				throw unavailable(operation, `REA_AGENT_ENV_COMMAND ${command} cannot be read.`, cause);
			}
			const named = /^#!(\/\S+)[ \t]*\r?\n/u.exec(head)?.[1];
			for (const candidate of [...named !== undefined && basename(named).startsWith("python") ? [named] : [], join(dirname(program), "python3")]) if (await executable$1(candidate)) return candidate;
			throw unavailable(operation, `REA_AGENT_ENV_COMMAND ${command} names no Python: its first line names no python interpreter and no python3 sits beside it.`);
		};
		CONTAINER_NAME = /^[A-Za-z0-9_.-]+$/u;
		sandboxFilters = (sandbox) => [...CONTAINER_NAME.test(sandbox) ? [`name=^agent-${sandbox.replaceAll(".", "\\.")}$`] : [], `label=agentenv.sandbox=${sandbox}`];
		removeSandbox = async (environment, sandbox) => {
			const filters = sandboxFilters(sandbox);
			const manual = `Run docker rm -f ${filters.map((filter) => `$(docker ps -aq --filter '${filter}')`).join(" ")}.`;
			const docker = environment.REA_DOCKER_COMMAND;
			if (docker === undefined || !isAbsolute(docker)) return `agentenv's teardown did not confirm sandbox ${sandbox} is gone, and REA_DOCKER_COMMAND is not an absolute path to remove its containers. ${manual}`;
			const options = {
				env: environment,
				timeout: TEARDOWN_MS
			};
			try {
				const containers = new Set();
				for (const filter of filters) {
					const listed = await execFileAsync(docker, [
						"ps",
						"-aq",
						"--filter",
						filter
					], options);
					for (const id of listed.stdout.split(/\s+/u).filter(Boolean)) containers.add(id);
				}
				if (containers.size > 0) await execFileAsync(docker, [
					"rm",
					"-f",
					...containers
				], options);
				return undefined;
			} catch (cause) {
				return `Removing sandbox ${sandbox}'s containers failed: ${errorMessage(cause)}. ${manual}`;
			}
		};
		parseHandshake = (line) => {
			try {
				const parsed = handshakeSchema.safeParse(JSON.parse(line));
				if (parsed.success) return parsed.data;
			} catch {}
			return { error: "the helper wrote something other than its handshake" };
		};
		ComputerHelper = class ComputerHelper {
			spawned;
			environment;
			#supervisor;
			#handshake;
			#sandboxId;
			/** The helper said no computer came up, and exits on its own after its teardown. */
			#failed = false;
			#token = null;
			#stopped;
			constructor(spawned, environment) {
				this.spawned = spawned;
				this.environment = environment;
				this.#supervisor = new ProviderProcessSupervisor({
					...spawned,
					ownsProcessLifetime: true,
					cleanup: spawned.cleanup ?? (() => cleanupOwnedProcessGroup(spawned.ownership))
				}, {
					captureStdout: false,
					maxDiagnosticBytes: {
						stdout: 0,
						stderr: STDERR_BYTES
					},
					diagnosticRetention: "tail"
				});
				spawned.process.stdin?.on("error", () => undefined);
				this.#handshake = new Promise((resolve) => {
					const ended = () => resolve(undefined);
					void this.#drain(resolve).then(ended, ended);
				});
			}
			/**
			* Spawn the helper for a bundle folder; it deploys the bundle's smoke task.
			* Python writes no bytecode, in the helper or the children that inherit its
			* environment, such as agentenv's own import of the bundle's app class, so
			* the bundle's files stay as they were shared.
			*/
			static async spawn(options) {
				const { environment, signal } = options;
				const interpreter = await agentEnvInterpreter(environment, options.operation);
				const spawned = await spawnOwnedProviderProcess({
					command: interpreter,
					arguments: [
						HELPER,
						options.bundle,
						"smoke"
					],
					runId: randomUUID(),
					expectedCommand: null,
					hostEnvironment: environment,
					env: { PYTHONDONTWRITEBYTECODE: "1" },
					stdin: "pipe",
					signal
				});
				return new ComputerHelper(spawned, environment);
			}
			async #drain(resolve) {
				const stdout = this.spawned.process.stdout;
				if (stdout === null) return;
				let first;
				for await (const line of readBoundedControlLines(stdout, HANDSHAKE_BYTES)) {
					if (first !== undefined) continue;
					first = line.ok ? parseHandshake(line.value) : { error: line.error._tag === "ControlLineMalformedUtf8" ? "the helper's handshake is not valid UTF-8" : "the helper's handshake line is too long" };
					if ("sandbox_id" in first) {
						this.#sandboxId = first.sandbox_id;
						this.#token = first.control_token;
					} else this.#failed = true;
					resolve(first);
				}
			}
			/** The handshake, or undefined when the helper ended without one; cancellation rejects with its reason. */
			handshake(signal) {
				signal.throwIfAborted();
				const aborted = new Promise((_, reject) => {
					signal.addEventListener("abort", () => reject(signal.reason), { once: true });
				});
				return Promise.race([this.#handshake, aborted]);
			}
			/** The helper's stderr tail with the control token removed, and how it exited. */
			output() {
				const snapshot = this.#supervisor.snapshot();
				const token = this.#token;
				return {
					stdout: "",
					stderr: token === null ? snapshot.stderr.text : snapshot.stderr.text.replaceAll(token, "[control token]"),
					truncated: snapshot.diagnosticTruncated === true || snapshot.stderr.observedBytes > snapshot.stderr.bytes,
					exit_code: snapshot.exitCode ?? null,
					signal: snapshot.signal ?? null
				};
			}
			/**
			* Close stdin once the helper holds a computer; let one that reported its
			* failure finish its own teardown; else SIGTERM. SIGTERM after a grace,
			* then clear its process group.
			*/
			async #stop() {
				const child = this.spawned.process;
				const holding = this.#sandboxId !== undefined;
				const waiting = holding || this.#failed;
				if (holding) child.stdin?.end();
				else if (!this.#failed) child.kill("SIGTERM");
				if (!await this.#supervisor.waitForExit(TEARDOWN_MS) && waiting) {
					child.kill("SIGTERM");
					await this.#supervisor.waitForExit(TEARDOWN_MS);
				}
				const exit = this.#supervisor.observedExit()?.code;
				const result = await this.#supervisor.stop();
				return result.status === "incomplete" ? {
					exit,
					stopped: result.reason
				} : { exit };
			}
			/**
			* Bring the computer down. The helper's exit 0 or 2 means agentenv tore
			* down everything it kept; otherwise the containers of the sandbox it
			* named are removed by their `agentenv.sandbox` label. A failed release
			* can be retried.
			*/
			async release() {
				const { exit, stopped } = await (this.#stopped ??= this.#stop());
				if (stopped !== undefined) {
					this.#stopped = undefined;
					return {
						verified: false,
						reason: `REA's agentenv helper did not stop: ${stopped}`,
						resources: [`process group ${String(this.spawned.ownership.processGroupId)}`]
					};
				}
				if (exit === 0 || exit === 2) return {
					verified: true,
					teardown: "agentenv"
				};
				const sandbox = this.#sandboxId;
				if (sandbox === undefined) return {
					verified: false,
					reason: `REA's agentenv helper ended (exit ${String(exit)}) before naming its sandbox; look for its container with docker ps -a --filter name=agent- and docker ps -a --filter label=agentenv.sandbox.`,
					resources: ["an unnamed agentenv sandbox"]
				};
				const failure = await removeSandbox(this.environment, sandbox);
				return failure === undefined ? {
					verified: true,
					teardown: "container_label"
				} : {
					verified: false,
					reason: failure,
					resources: [`containers labelled agentenv.sandbox=${sandbox}`]
				};
			}
		};
	})))();
}

//#endregion
//#region dist/desktop/DesktopBuildDoctorFacts.js
var DEFAULT_DOCKER_ROOT, CONFIG_BYTES, missingPath, readDesktopBuildFacts, attempt, executable, settingCommand, psFact, dockerDaemon, freeSpace, agentEnvVersion, archiveObservationSchema, archiveFact, registrationFacts, solveEndpoint, doctorFileCleanupFailure, runnerCleanupFailure, canReadModelConfig, leftoverContainers;
function init_DesktopBuildDoctorFacts() {
	return (init_DesktopBuildDoctorFacts = __esmMin((() => {
		init_analysisErrorCore();
		init_safeJson();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_appExport();
		init_appBuildArchive();
		init_identity();
		init_ExecFileOutput();
		init_systemPs();
		init_AgentEnvComputerHelper();
		init_resources();
		init_providerCleanupError();
		init_BuildComputerEnvironment();
		init_buildComputerSettings();
		init_errorMessage();
		DEFAULT_DOCKER_ROOT = "/var/lib/docker";
		CONFIG_BYTES = 1024 * 1024;
		missingPath = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
		readDesktopBuildFacts = async (input) => {
			const { environment } = input;
			const docker = await settingCommand(environment, "REA_DOCKER_COMMAND", "docker");
			const daemon = docker.status === "found" ? await dockerDaemon(input, docker.path) : { status: "unchecked" };
			const agentEnv = await settingCommand(environment, "REA_AGENT_ENV_COMMAND", "agent-env");
			const versions = new Map();
			const versionFor = (path) => {
				const existing = versions.get(path);
				if (existing !== undefined) return existing;
				const pending = agentEnvVersion(input, path);
				versions.set(path, pending);
				return pending;
			};
			const archive = await archiveFact(input, async () => agentEnv.status === "found" ? agentEnvInterpreter({
				...input.environment,
				REA_AGENT_ENV_COMMAND: agentEnv.path
			}, "desktop_build_doctor", input.resources).catch((cause) => {
				if (cause instanceof ArtifactFileCleanupFailure) throw runnerCleanupFailure(cause);
				return "python3";
			}) : "python3");
			const chosenCommand = (name, command) => (environment[name] ?? "") !== "" ? environment[name] : command.status === "found" ? command.path : undefined;
			const selectedDocker = chosenCommand("REA_DOCKER_COMMAND", docker);
			const selectedAgentEnv = chosenCommand("REA_AGENT_ENV_COMMAND", agentEnv);
			const selectedSettings = {
				...selectedDocker === undefined ? {} : { REA_DOCKER_COMMAND: selectedDocker },
				...selectedAgentEnv === undefined ? {} : { REA_AGENT_ENV_COMMAND: selectedAgentEnv },
				REA_BUILD_COMPUTER_REA_ARCHIVE: archive.path
			};
			return {
				ps: await psFact(input),
				docker,
				daemon,
				disk: await freeSpace(daemon.status === "reachable" ? daemon.rootDirectory : DEFAULT_DOCKER_ROOT),
				agentEnv: agentEnv.status === "found" ? {
					...agentEnv,
					version: await versionFor(agentEnv.path)
				} : agentEnv,
				archive,
				registrations: await registrationFacts(input, selectedSettings, versionFor),
				environmentSettings: BUILD_COMPUTER_SETTINGS.filter((name) => (environment[name] ?? "") !== ""),
				solveEndpoint: await solveEndpoint(input, agentEnv),
				leftoverContainers: docker.status === "found" && daemon.status === "reachable" ? await leftoverContainers(input, docker.path) : undefined
			};
		};
		attempt = async (input, command, arguments_) => {
			try {
				const { stdout } = await input.run(command, arguments_, { env: input.environment });
				return {
					ok: true,
					stdout
				};
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError) throw cause;
				const failure = execFileOutputFailure(cause);
				const stderr = failure?.stderr.trim() ?? "";
				return {
					ok: false,
					reason: stderr === "" ? errorMessage(cause) : stderr
				};
			}
		};
		executable = (path) => access(path, constants.X_OK).then(async () => (await stat(path)).isFile(), () => false);
		settingCommand = async (environment, name, program) => {
			const value = environment[name];
			if (value === undefined || value === "") {
				const path = await programOnPath(program, environment);
				return path === undefined ? { status: "missing" } : {
					status: "found",
					path,
					source: "path"
				};
			}
			return isAbsolute(value) && await executable(value) ? {
				status: "found",
				path: value,
				source: "environment"
			} : {
				status: "invalid",
				value
			};
		};
		psFact = async (input) => {
			const selected = await resolveSystemPs(input.platform);
			const ps = selected.source === "system" ? selected.command : await programOnPath("ps", input.environment);
			if (ps === undefined) return {
				found: false,
				detail: `No ${describeSystemPs(selected)}.`
			};
			const probe = await attempt(input, ps, [
				"-o",
				"pid=",
				"-p",
				String(process.pid)
			]);
			return probe.ok ? {
				found: true,
				detail: ps
			} : {
				found: false,
				detail: `${ps} is not procps-compatible: ${probe.reason}`
			};
		};
		dockerDaemon = async (input, docker) => {
			const info = await attempt(input, docker, [
				"info",
				"--format",
				"{{.DockerRootDir}}"
			]);
			if (info.ok) return {
				status: "reachable",
				rootDirectory: info.stdout.trim() || DEFAULT_DOCKER_ROOT
			};
			return {
				status: /permission denied/iu.test(info.reason) ? "permission_denied" : "unreachable",
				detail: info.reason
			};
		};
		freeSpace = async (path) => {
			let candidate = path;
			for (;;) {
				try {
					const fs = await statfs(candidate);
					return {
						path: candidate,
						freeBytes: fs.bavail * fs.bsize
					};
				} catch (cause) {
					const parent = dirname(candidate);
					if (parent === candidate || !missingPath(cause)) return {
						path,
						error: errorMessage(cause)
					};
					candidate = parent;
				}
			}
		};
		agentEnvVersion = async (input, agentEnv) => {
			const reported = await attempt(input, agentEnv, ["--version"]);
			return reported.ok ? agentEnvReportedVersion(reported.stdout) : undefined;
		};
		archiveObservationSchema = z.object({
			version: z.string().nullable(),
			problem: z.string().nullable()
		});
		archiveFact = async (input, pythonForArchive) => {
			const selected = input.environment.REA_BUILD_COMPUTER_REA_ARCHIVE;
			const source = selected === undefined || selected === "" ? "cache" : "environment";
			const path = source === "cache" ? defaultBuildComputerArchive(input.environment, input.platform) : selected;
			try {
				if (!(await stat(path)).isFile()) return {
					path,
					source,
					status: "missing"
				};
			} catch (cause) {
				return missingPath(cause) ? {
					path,
					source,
					status: "missing"
				} : {
					path,
					source,
					status: "unknown",
					detail: `REA could not inspect ${path}: ${errorMessage(cause)}`
				};
			}
			const python = await pythonForArchive();
			if (python === undefined) return {
				path,
				source,
				status: "unknown",
				detail: `REA could not identify the selected runner's Python to inspect ${path}.`
			};
			const packed = await attempt(input, python, [
				"-I",
				"-c",
				PYTHON_BUILD_ARCHIVE_PROBE,
				path
			]);
			if (!packed.ok) return {
				path,
				source,
				status: "unknown",
				detail: `REA could not inspect ${path}: ${packed.reason}`
			};
			const parsed = safeParseJson(packed.stdout);
			const observation = parsed.ok ? archiveObservationSchema.safeParse(parsed.value) : undefined;
			if (observation?.success === true && observation.data.problem !== null) {
				const { version, problem } = observation.data;
				return {
					path,
					source,
					status: "invalid",
					detail: `${version === null ? path : `${path} declares REA ${version}`}. ${problem}`
				};
			}
			const version = observation?.success === true ? observation.data.version : null;
			return version === PRODUCT_IDENTITY.packageVersion ? {
				path,
				source,
				status: "current"
			} : version === null ? {
				path,
				source,
				status: "unknown",
				detail: `REA could not identify the version of the runnable archive ${path}.`
			} : {
				path,
				source,
				status: "stale",
				detail: `${path} holds REA ${version}; this is REA ${PRODUCT_IDENTITY.packageVersion}.`
			};
		};
		registrationFacts = async (input, selectedSettings, versionFor) => {
			const selected = input.clientIds.length === 0 ? undefined : input.clientIds;
			const recorded = new Map();
			const statuses = await input.registrations(selected, Object.fromEntries(BUILD_COMPUTER_SETTINGS.map((name) => [name, selectedSettings[name] ?? ""])), undefined, (client, name, value) => {
				if (selected === undefined || selected.includes(client)) {
					const settings = recorded.get(client) ?? new Map();
					settings.set(name, value);
					recorded.set(client, settings);
				}
			});
			const registered = statuses.filter(({ command }) => command.length > 0);
			const considered = selected ?? registered.map(({ client }) => client);
			const outcomes = await Promise.allSettled(considered.map(async (client) => {
				const status = registered.find((entry) => entry.client === client);
				const values = status === undefined ? undefined : recorded.get(client);
				const recordedRunner = values?.get("REA_AGENT_ENV_COMMAND");
				const effectiveRunner = recordedRunner === undefined ? undefined : await resolveBuildComputerProgram(recordedRunner, "agent-env", input.environment);
				let runner;
				if (recordedRunner !== undefined) {
					if (effectiveRunner === undefined || !isAbsolute(effectiveRunner) || !await executable(effectiveRunner)) runner = { status: "invalid" };
					else {
						const version = await versionFor(effectiveRunner);
						runner = version === undefined ? { status: "unknown" } : {
							status: version === "0.9.1485" ? "current" : "stale",
							version
						};
					}
				}
				const differing = (status?.provider_settings?.differing ?? []).filter((name) => name !== "REA_AGENT_ENV_COMMAND" || recordedRunner !== "" || effectiveRunner === undefined || effectiveRunner !== selectedSettings.REA_AGENT_ENV_COMMAND);
				const compared = [];
				const unchecked = [];
				for (const name of differing) {
					if (name === "REA_AGENT_ENV_COMMAND") {
						if (runner !== undefined) compared.push(name);
						else unchecked.push(name);
						continue;
					}
					const value = values?.get(name);
					if (value === undefined) {
						unchecked.push(name);
						continue;
					}
					const environment = {
						...input.environment,
						[name]: value
					};
					if (name === "REA_DOCKER_COMMAND") {
						const command = await settingCommand(environment, name, "docker");
						if (command.status !== "found") compared.push(name);
						else if ((await dockerDaemon({
							...input,
							environment
						}, command.path)).status !== "reachable") unchecked.push(name);
					} else if (name === "REA_BUILD_COMPUTER_REA_ARCHIVE") {
						const archive = await archiveFact({
							...input,
							environment
						}, async () => effectiveRunner === undefined || runner?.status === "invalid" ? undefined : agentEnvInterpreter({
							...environment,
							REA_AGENT_ENV_COMMAND: effectiveRunner
						}, "desktop_build_doctor", input.resources).catch((cause) => {
							if (cause instanceof ArtifactFileCleanupFailure) throw runnerCleanupFailure(cause);
							return undefined;
						}));
						if (archive.status === "unknown") unchecked.push(name);
						else if (archive.status !== "current") compared.push(name);
					} else unchecked.push(name);
				}
				return {
					client,
					registered: status !== undefined,
					unrecorded: status?.provider_settings?.unrecorded ?? [],
					unresolved: status?.provider_settings?.unresolved ?? [],
					...compared.length === 0 ? {} : { differing: compared },
					...unchecked.length === 0 ? {} : { unchecked },
					...runner === undefined ? {} : { runner }
				};
			}));
			const failure = outcomes.find((outcome) => outcome.status === "rejected");
			if (failure !== undefined) throw failure.reason;
			return outcomes.flatMap((outcome) => outcome.status === "fulfilled" ? [outcome.value] : []);
		};
		solveEndpoint = async (input, runner) => {
			if (input.signal.aborted) throw cancelledBy("doctor", input.signal);
			if (runner.status !== "found") return null;
			const discovery = await attempt(input, runner.path, [
				"config",
				"debug",
				"--json"
			]);
			if (!discovery.ok) return null;
			const discovered = safeParseJson(discovery.stdout);
			const candidates = discovered.ok ? z.object({ search_path: z.array(z.object({
				path: z.string(),
				exists: z.boolean()
			})) }).safeParse(discovered.value) : undefined;
			if (candidates === undefined || !candidates.success) return null;
			const selected = candidates.data.search_path.find(({ exists }) => exists)?.path;
			if (selected === undefined && (input.environment.AGENT_ENV_CONFIG ?? "") !== "") return null;
			if (selected !== undefined && !await canReadModelConfig(selected, input)) return null;
			const explained = await attempt(input, runner.path, [
				"config",
				"explain",
				"model.base_url",
				"--json"
			]);
			if (!explained.ok) return null;
			const parsed = safeParseJson(explained.stdout);
			const result = parsed.ok ? z.object({
				path: z.literal("model.base_url"),
				value: z.unknown(),
				error: z.unknown(),
				winner: z.object({ kind: z.string() }).nullable().optional()
			}).safeParse(parsed.value) : undefined;
			if (result === undefined || !result.success || result.data.error != null) return null;
			const value = result.data.value;
			if (value === "" && result.data.winner?.kind === "env") return null;
			if (value === null || value === "") return undefined;
			if (typeof value !== "string" || /^(?:env|secret):/u.test(value)) return null;
			return result.data.winner?.kind === "env" ? "LITELLM_BASE_URL" : selected ?? "agentenv model configuration";
		};
		doctorFileCleanupFailure = (lease, resources, reason, cause, cleanupPrimary) => {
			const failure = new ProviderCleanupError("rea", resources, { reason }, {
				operation: "doctor",
				cause,
				cleanupPrimary
			});
			new AnalysisCleanupLeaseGroup(failure, [lease]);
			return failure;
		};
		runnerCleanupFailure = (cause) => doctorFileCleanupFailure(cause.cleanupLease, cause.cleanup?.resources ?? cause.cleanupLease.cleanupResources ?? [], cause.cleanup?.reason ?? cause.message, cause);
		canReadModelConfig = async (path, input) => {
			try {
				if (input.signal.aborted) throw cancelledBy("doctor", input.signal);
				const candidate = await stat(path);
				if (input.signal.aborted) throw cancelledBy("doctor", input.signal);
				if (!candidate.isFile() || candidate.size > CONFIG_BYTES) return false;
				await readRegularFileText(path, {
					signal: input.signal,
					admit: (state) => {
						if (state.size > CONFIG_BYTES) throw new Error("Configuration exceeds the read limit");
					},
					cancellationFailure: (reason) => cancelledBy("doctor", carriedReason(reason))
				});
				return true;
			} catch (cause) {
				if (cause instanceof RetainedRegularFileCleanupFailure) {
					input.resources.retain(cause.cleanupOwner);
					const cancellation = regularFileCancellation(cause);
					throw doctorFileCleanupFailure(cause.cleanupLease, [cause.path], cause.message, cause, cancellation === undefined ? undefined : cancelledBy("doctor", carriedReason(cancellation.reason)));
				}
				if (cause instanceof AnalysisCancelledError) throw cause;
				if (input.signal.aborted) throw cancelledBy("doctor", input.signal);
				return false;
			}
		};
		leftoverContainers = async (input, docker) => {
			const names = new Set();
			for (const filter of ["name=^agent-", "label=agentenv.sandbox"]) {
				const listed = await attempt(input, docker, [
					"ps",
					"-a",
					"--filter",
					filter,
					"--format",
					"{{.Names}}"
				]);
				if (!listed.ok) return undefined;
				for (const name of listed.stdout.split(/\s+/u).filter(Boolean)) names.add(name);
			}
			return [...names].sort();
		};
	})))();
}

//#endregion
//#region dist/android/JadxDoctor.js
var JADX_DOCTOR_SETTINGS, inspectJadxProvider, optionalEntry, configurationCheck, windowsNativeFailureDetails, asFailureKind, probeDetails;
function init_JadxDoctor() {
	return (init_JadxDoctor = __esmMin((() => {
		init_JadxConfiguration();
		init_JadxRelease();
		JADX_DOCTOR_SETTINGS = [
			"REA_JADX_MCP_JAR",
			"JAVA_HOME",
			"PATH",
			"REA_JADX_HEAP_MIB",
			"REA_JADX_ACTIVE_PROCESSOR_COUNT",
			"REA_JADX_OPERATION_TIMEOUT_MS"
		];
		inspectJadxProvider = async (environment, resourceOwner, host, signal) => {
			const configured = environment.REA_JADX_MCP_JAR !== undefined;
			const availability = await inspectJadxAvailability(environment, {
				host,
				resourceOwner,
				signal
			});
			const jarPath = availability.status === "available" && typeof availability.diagnostics["jar_path"] === "string" ? availability.diagnostics["jar_path"] : undefined;
			const available = availability.status === "available" && jarPath !== undefined;
			const configuredJar = environment.REA_JADX_MCP_JAR;
			return {
				id: "jadx",
				configured,
				available,
				providerVersion: null,
				registrationEnvironment: jarPath === undefined || configuredJar === undefined ? {} : {
					REA_JADX_MCP_JAR: configuredJar,
					...optionalEntry("JAVA_HOME", environment.JAVA_HOME),
					...optionalEntry("REA_JADX_HEAP_MIB", environment.REA_JADX_HEAP_MIB),
					...optionalEntry("REA_JADX_ACTIVE_PROCESSOR_COUNT", environment.REA_JADX_ACTIVE_PROCESSOR_COUNT),
					...optionalEntry("REA_JADX_OPERATION_TIMEOUT_MS", environment.REA_JADX_OPERATION_TIMEOUT_MS)
				},
				checks: [configurationCheck(configured, availability, jarPath)]
			};
		};
		optionalEntry = (name, value) => value === undefined ? {} : { [name]: value };
		configurationCheck = (configured, availability, jarPath) => {
			const code = availability.status === "unavailable" ? availability.code : null;
			if (availability.status === "available" && jarPath !== undefined) {
				const operationTimeout = availability.diagnostics["operation_timeout_ms"];
				return {
					name: "configuration",
					ok: true,
					code: null,
					detail: `JADX MCP bridge JAR validated at ${jarPath}; its path is recorded for agent registrations. This checks configuration, not whether a selected APK fits in the worker's memory.`,
					remediation: null,
					classification: "config_drift",
					...typeof operationTimeout === "number" ? { details: { operation_timeout_ms: operationTimeout } } : {}
				};
			}
			const kind = availability.status === "unavailable" ? asFailureKind(availability.diagnostics["failure_kind"]) : null;
			return {
				name: "configuration",
				ok: false,
				code,
				detail: availability.status === "available" ? "Validated JADX configuration reported no JAR path." : availability.reason,
				remediation: availability.status === "available" ? JADX_JAR_CONFIGURATION_REMEDIATION : availability.remediation,
				classification: jadxFailureClassification(kind, configured),
				...kind === "java_probe" && availability.status === "unavailable" ? { details: probeDetails(availability.diagnostics) } : kind !== null && kind.startsWith("windows_native_") && availability.status === "unavailable" ? { details: windowsNativeFailureDetails(availability.diagnostics) } : {}
			};
		};
		windowsNativeFailureDetails = (diagnostics) => {
			const details = {};
			for (const key of ["failure_stage", "remediation"]) {
				const value = diagnostics[key];
				if (value !== undefined) details[key] = value;
			}
			return details;
		};
		asFailureKind = (value) => typeof value === "string" && JADX_FAILURE_KINDS.includes(value) ? value : null;
		probeDetails = (diagnostics) => {
			const details = {};
			for (const key of [
				"java_executable",
				"failure",
				"output_truncated",
				"exit_code",
				"process_error_code",
				"signal",
				"killed",
				"output_limit_bytes",
				"deadline_ms",
				"jdk_compiler",
				"java_major"
			]) {
				const value = diagnostics[key];
				if (value !== undefined) details[key] = value;
			}
			return details;
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraDoctor.js
var GHIDRA_DOCTOR_SETTINGS, projectGhidraDoctorInspection, temporaryDirectoryCheck, inspectSystemGhidraProvider, selectedChecks, projectCheck;
function init_GhidraDoctor() {
	return (init_GhidraDoctor = __esmMin((() => {
		init_analysisErrorProjection();
		init_AnalysisClientFailure();
		init_GhidraAdmission();
		init_GhidraInstallation();
		init_GhidraTemporaryDirectory();
		GHIDRA_DOCTOR_SETTINGS = [
			"GHIDRA_INSTALL_DIR",
			"JAVA_HOME",
			"PATH",
			"REA_GHIDRA_PROJECT_PATH"
		];
		projectGhidraDoctorInspection = (inspection, temporaryDirectory, selection = { existingProject: false }) => {
			const admission = admitGhidraInstallation(inspection, selection);
			const existingProjectRefused = !admission.admitted && admission.refusal.kind === "existing_project_unsupported_host";
			const readiness = inspection.status === "available" ? admission.windowsNative : undefined;
			const windowsAuthorityUnavailable = readiness?.available === false;
			const temporaryDirectoryUnavailable = temporaryDirectory?.ok === false;
			return {
				id: "ghidra",
				configured: inspection.installDir !== null,
				available: admission.admitted && !temporaryDirectoryUnavailable,
				providerVersion: inspection.providerVersion,
				registrationEnvironment: inspection.status === "available" ? {
					GHIDRA_INSTALL_DIR: inspection.installDir,
					JAVA_HOME: inspection.javaHome
				} : {},
				checks: [
					...selectedChecks(inspection).map((check) => projectCheck(check, inspection.installDir !== null, inspection.javaProbeFailure, inspection.nativeDecompilerHeaderFailure)),
					...readiness !== undefined ? [{
						name: "native_authority",
						ok: !windowsAuthorityUnavailable,
						code: !readiness.available ? readiness.code : null,
						detail: !readiness.available ? readiness.reason : "Verified Windows native Job Object, private DACL, and reparse-safe handle controls; local NTFS/ReFS only.",
						remediation: !readiness.available ? readiness.remediation : null,
						classification: !readiness.available && readiness.code === "runtime_unavailable" ? "runtime_failure" : !readiness.available && readiness.code === "runtime_missing" ? "missing_dependency" : "unsupported_host"
					}] : [],
					...temporaryDirectory === undefined ? [] : [temporaryDirectoryCheck(temporaryDirectory)],
					...existingProjectRefused ? [{
						name: "existing_project",
						ok: false,
						code: "unsupported_host",
						detail: EXISTING_PROJECT_WINDOWS_UNAVAILABLE,
						remediation: EXISTING_PROJECT_WINDOWS_REMEDIATION,
						classification: "unsupported_host"
					}] : []
				]
			};
		};
		temporaryDirectoryCheck = (probe) => probe.ok ? {
			name: "temp_directory",
			ok: true,
			code: null,
			detail: `REA created and deleted a file under the Ghidra session root ${probe.directory}, where session runtimes are created. This does not test writes by Ghidra's child JVM.`,
			remediation: null,
			classification: "runtime_failure"
		} : {
			name: "temp_directory",
			ok: false,
			code: "temp_directory_unwritable",
			detail: `REA could not ${probe.stage === "write" ? "write" : "clean up"} a probe file under the Ghidra session root ${probe.directory}, where session runtimes are created${probe.code === undefined ? "" : ` (${probe.code})`}: ${probe.message}${probe.retainedPath === undefined ? "" : `. The probe file ${probe.retainedPath} remains; REA retains its cleanup and retries removal when doctor finishes.`}`,
			remediation: GHIDRA_RESTRICTED_TEMP_REMEDIATION,
			classification: "runtime_failure",
			details: {
				directory: probe.directory,
				stage: probe.stage,
				...probe.code === undefined ? {} : { system_code: probe.code },
				...probe.retainedPath === undefined ? {} : { retained_path: probe.retainedPath }
			}
		};
		inspectSystemGhidraProvider = async (environment, resourceOwner, signal, platform) => {
			try {
				const installation = await inspectGhidraInstallation({
					environment,
					resourceOwner,
					...platform === undefined ? {} : { platform },
					...signal === undefined ? {} : { signal },
					...environment.GHIDRA_INSTALL_DIR === undefined ? {} : { installDir: environment.GHIDRA_INSTALL_DIR },
					...environment.JAVA_HOME === undefined ? {} : { javaHome: environment.JAVA_HOME }
				});
				const temporaryDirectory = installation.status === "available" && installation.platform === "win32" ? await probeGhidraTemporaryDirectory(resourceOwner) : undefined;
				return projectGhidraDoctorInspection(installation, temporaryDirectory, { existingProject: environment.REA_GHIDRA_PROJECT_PATH !== undefined });
			} catch (cause) {
				throw analysisClientFailureForOperation(cause, "ghidra", "doctor");
			}
		};
		selectedChecks = (inspection) => {
			const byName = new Map(inspection.checks.map((candidate) => [candidate.name, candidate]));
			const configuration = byName.get("configuration");
			if (configuration === undefined) return [];
			if (configuration.status === "failed") return [configuration];
			const installation = byName.get("installation");
			return [
				configuration,
				byName.get("platform"),
				byName.get("architecture"),
				installation,
				...installation?.status === "passed" ? [
					byName.get("version"),
					byName.get("headless"),
					byName.get("native_decompiler")
				] : [],
				byName.get("java")
			].filter((candidate) => Boolean(candidate));
		};
		projectCheck = (check, configured, javaFailure, headerFailure) => ({
			name: check.name,
			ok: check.status === "passed",
			code: check.status === "failed" ? check.code : null,
			detail: check.detail,
			...check.name === "java" && javaFailure?.output !== undefined ? { details: {
				output: { ...javaFailure.output },
				...javaFailure.processErrorCode === undefined ? {} : { process_error_code: javaFailure.processErrorCode },
				...javaFailure.properties === undefined ? {} : { properties: { ...javaFailure.properties } }
			} } : {},
			...check.name === "native_decompiler" && headerFailure !== undefined ? { details: { header_failure: projectAnalysisError(headerFailure) } } : {},
			remediation: check.status === "failed" ? check.remediation : null,
			classification: check.name === "platform" || check.name === "architecture" ? "unsupported_host" : check.name === "java" && check.status === "failed" && check.code === "runtime_missing" ? "missing_dependency" : check.name === "java" && check.status === "failed" && check.code === "runtime_unavailable" ? "runtime_failure" : configured ? "config_drift" : "missing_analysis_engine"
		});
	})))();
}

//#endregion
//#region dist/ida/IdaDoctor.js
var IDA_DOCTOR_SETTINGS, inspectIdaRegistration, privateWorkspaceChecks;
function init_IdaDoctor() {
	return (init_IdaDoctor = __esmMin((() => {
		init_IdaConfiguration();
		init_analysisErrorProjection();
		init_IdaAdmission();
		IDA_DOCTOR_SETTINGS = ["REA_IDA_MCP_CONFIG"];
		inspectIdaRegistration = async (path, resourceScope, signal, registration) => {
			const parsed = path === undefined ? undefined : await (registration ?? readIdaConfiguration(path, {
				resourceScope,
				...signal === undefined ? {} : { signal }
			}));
			const valid = parsed?.ok === true;
			const admission = parsed?.ok === true ? await admitIdaConfiguration(parsed.value) : undefined;
			const workspaceChecks = admission === undefined ? [] : privateWorkspaceChecks(admission);
			return {
				id: "ida",
				configured: path !== undefined,
				available: admission?.admitted === true,
				providerVersion: null,
				registrationEnvironment: valid && path !== undefined ? { REA_IDA_MCP_CONFIG: path } : {},
				checks: [{
					name: "registration",
					ok: valid,
					code: valid ? null : path === undefined ? "not_configured" : "invalid_configuration",
					detail: valid ? "IDA MCP registration is valid. Upstream availability, compatibility, and target binding are checked when analysis starts; no IDA process was launched." : parsed !== undefined && !parsed.ok ? parsed.error.message : "IDA MCP registration is not configured.",
					remediation: valid ? null : parsed !== undefined && !parsed.ok ? projectAnalysisError(parsed.error).remediation.action : "Set REA_IDA_MCP_CONFIG to your upstream IDA MCP registration JSON; see docs/providers/ida-provider.md.",
					classification: path === undefined ? "missing_analysis_engine" : "config_drift"
				}, ...workspaceChecks]
			};
		};
		privateWorkspaceChecks = (admission) => {
			if (admission.admitted) return admission.workspace === undefined ? [] : [{
				name: "private_workspace",
				ok: true,
				code: null,
				detail: `Private workspace authority is available (${admission.workspace.proof}) under ${admission.workspace.root ?? "the system temporary directory"}.`,
				remediation: null,
				classification: "unsupported_host"
			}];
			const { refusal } = admission;
			switch (refusal.kind) {
				case "workspace_unusable": return [{
					name: "private_workspace",
					ok: false,
					code: "invalid_configuration",
					detail: refusal.reason,
					remediation: IDA_WORKSPACE_ROOT_REMEDIATION,
					classification: "config_drift"
				}];
				case "private_workspace_unavailable": {
					const { privacy } = refusal;
					return [{
						name: "private_workspace",
						ok: false,
						code: privacy.code,
						detail: privacy.reason,
						remediation: privacy.remediation,
						classification: privacy.code === "runtime_missing" ? "missing_dependency" : privacy.code === "runtime_unavailable" ? "runtime_failure" : "unsupported_host"
					}];
				}
				default: {
					const unreachable = refusal;
					return unreachable;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/kuna/KunaDoctor.js
var KUNA_DOCTOR_SETTINGS, KUNA_REGISTRATION_SETTINGS, inspectKunaProvider, versionCheck, admissionFailure, cleanupIncompleteCheck, probeCleanupFailure, probeFailure, cacheCheck, nearestDirectoryWritable, isMissing, entryAbsent, cacheRootWithoutTrailingSeparator;
function init_KunaDoctor() {
	return (init_KunaDoctor = __esmMin((() => {
		init_KunaAdmission();
		init_providerAdapterError();
		init_classifyProviderFailure();
		init_KunaRelease();
		init_errorMessage();
		KUNA_DOCTOR_SETTINGS = [
			"REA_KUNA_COMMAND",
			"REA_KUNA_CACHE_DIR",
			"HOME",
			"USERPROFILE",
			"XDG_CACHE_HOME",
			"REA_KUNA_CACHE_MAX_BYTES",
			"REA_KUNA_PROJECT_TIMEOUT_MS",
			"REA_KUNA_TIMEOUT_MS",
			"REA_KUNA_JOBS"
		];
		KUNA_REGISTRATION_SETTINGS = KUNA_DOCTOR_SETTINGS.filter((name) => name !== "HOME" && name !== "USERPROFILE" && name !== "XDG_CACHE_HOME");
		inspectKunaProvider = async (environment, platform, options) => {
			const configured = environment.REA_KUNA_COMMAND !== undefined && environment.REA_KUNA_COMMAND.length > 0;
			const admission = admitKunaCommand(environment, platform);
			if (!admission.ok) return {
				id: KUNA_PROVIDER_ID,
				configured,
				available: false,
				providerVersion: null,
				registrationEnvironment: {},
				checks: [admissionFailure(admission.error, configured)]
			};
			const { command, cacheRoot, cacheMaxBytes } = admission.value;
			const version = await versionCheck(environment, platform, options);
			return {
				id: KUNA_PROVIDER_ID,
				configured,
				available: true,
				providerVersion: version.version,
				registrationEnvironment: Object.fromEntries(KUNA_REGISTRATION_SETTINGS.flatMap((name) => {
					const setting = environment[name];
					return setting === undefined ? [] : [[name, setting]];
				})),
				checks: [
					{
						name: "installation",
						ok: true,
						code: null,
						detail: `REA_KUNA_COMMAND ${command} is an executable regular file.`,
						remediation: null,
						classification: "config_drift",
						details: { command }
					},
					version.check,
					await cacheCheck(cacheRoot, cacheMaxBytes, platform)
				]
			};
		};
		versionCheck = async (environment, platform, options) => {
			const { createKunaResourceScope, inspectKunaInstallation } = await import("./KunaInstallation-BxLSfF5v.js").then((n) => (n.init_KunaInstallation(), n.KunaInstallation_exports));
			const kunaResources = createKunaResourceScope(options.resourceScope);
			let installation;
			try {
				installation = await inspectKunaInstallation(environment, {
					platform,
					resourceScope: kunaResources.owner,
					...options.signal === undefined ? {} : { signal: options.signal }
				});
			} catch (cause) {
				const { kunaInstallationDialect } = await import("./KunaCommand-BiHaAtGa.js").then((n) => (n.init_KunaCommand(), n.KunaCommand_exports));
				return {
					version: null,
					check: probeCleanupFailure(cause, kunaResources, kunaInstallationDialect)
				};
			}
			if (!installation.ok) {
				const check = probeFailure(installation.error);
				if (!kunaResources.hasPending) return {
					version: null,
					check
				};
				return {
					version: null,
					check: cleanupIncompleteCheck({
						...check,
						code: "cleanup_incomplete"
					}, installation.error.diagnostics, kunaResources.cleanupResources)
				};
			}
			const { value } = installation;
			const versionGuidance = value.verified ? null : KUNA_UNVERIFIED_VERSION_REMEDIATION;
			return {
				version: value.version,
				check: {
					name: "version",
					ok: true,
					code: null,
					detail: `${value.executable} reports Kuna ${value.version} (sha256 ${value.sha256})${value.verified ? "." : `; REA verified ${KUNA_VERIFIED_VERSION}, so this release's project layout is unverified. ${versionGuidance}`}`,
					remediation: versionGuidance,
					classification: "config_drift",
					details: {
						executable: value.executable,
						version: value.version,
						verified_version: KUNA_VERIFIED_VERSION,
						sha256: value.sha256
					}
				}
			};
		};
		admissionFailure = (refusal, configured) => ({
			name: "installation",
			ok: false,
			code: refusal.code,
			detail: refusal.reason,
			remediation: refusal.remediation,
			classification: refusal.code === "unsupported_host" ? "unsupported_host" : configured ? "config_drift" : "missing_analysis_engine",
			details: refusal.diagnostics
		});
		cleanupIncompleteCheck = (check, diagnostics, cleanupResources) => ({
			...check,
			details: {
				...diagnostics,
				cleanup_incomplete: true,
				...cleanupResources === undefined ? {} : { cleanup_resources: [...cleanupResources] }
			}
		});
		probeCleanupFailure = (cause, kunaResources, kunaInstallationDialect) => {
			let recognised = true;
			const failure = classifyProviderFailure(cause, kunaInstallationDialect("doctor", kunaResources, (unrecognised) => {
				recognised = false;
				return new ProviderAdapterError(KUNA_PROVIDER_ID, "doctor", { cause: unrecognised });
			}));
			if (!recognised) throw cause;
			if (!failure.cleanupIncomplete) throw failure;
			return cleanupIncompleteCheck({
				name: "version",
				ok: false,
				code: "cleanup_incomplete",
				detail: `Kuna installation inspection could not confirm cleanup: ${failure.message}`,
				remediation: null,
				classification: "config_drift"
			}, failure.diagnostics, failure.cleanupResources);
		};
		probeFailure = (failure) => ({
			name: "version",
			ok: false,
			code: failure.code,
			detail: failure.reason,
			remediation: failure.remediation ?? (failure.code === "version_unresolved" ? "Run the selected executable with --version: it must exit promptly and print `kuna <major>.<minor>`." : KUNA_COMMAND_REMEDIATION),
			classification: "config_drift",
			details: failure.diagnostics
		});
		cacheCheck = async (cacheRoot, cacheMaxBytes, platform) => {
			const details = {
				cache_root: cacheRoot,
				cache_max_bytes: cacheMaxBytes
			};
			const inspected = cacheRootWithoutTrailingSeparator(cacheRoot, platform);
			try {
				if (!(await stat(inspected)).isDirectory()) return {
					name: "cache",
					ok: false,
					code: "open_options_invalid",
					detail: `The Kuna cache root ${cacheRoot} exists but is not a directory.`,
					remediation: "Set REA_KUNA_CACHE_DIR to a directory REA may own, or remove the conflicting file.",
					classification: "config_drift",
					details
				};
				await access(inspected, constants.W_OK | constants.X_OK);
			} catch (cause) {
				if (isMissing(cause)) {
					const creatable = await nearestDirectoryWritable(inspected);
					return creatable.ok ? {
						name: "cache",
						ok: true,
						code: null,
						detail: `REA creates the Kuna project cache at ${cacheRoot} on first use.`,
						remediation: null,
						classification: "config_drift",
						details
					} : {
						name: "cache",
						ok: false,
						code: "open_options_invalid",
						detail: `REA cannot create the Kuna cache root ${cacheRoot}: ${creatable.reason}`,
						remediation: "Set REA_KUNA_CACHE_DIR to a directory the REA process user can create or write.",
						classification: "config_drift",
						details
					};
				}
				return {
					name: "cache",
					ok: false,
					code: "open_options_invalid",
					detail: `REA cannot write the Kuna cache root ${cacheRoot}: ${errorMessage(cause)}`,
					remediation: "Set REA_KUNA_CACHE_DIR to a directory the REA process user can write.",
					classification: "config_drift",
					details
				};
			}
			return {
				name: "cache",
				ok: true,
				code: null,
				detail: `Kuna project exports are cached in ${cacheRoot} (at most ${String(cacheMaxBytes)} bytes).`,
				remediation: null,
				classification: "config_drift",
				details
			};
		};
		nearestDirectoryWritable = async (path) => {
			let candidate = path;
			for (;;) {
				try {
					if (!(await stat(candidate)).isDirectory()) return {
						ok: false,
						reason: `${candidate} is not a directory.`
					};
					await access(candidate, constants.W_OK | constants.X_OK);
					return { ok: true };
				} catch (cause) {
					const parent = dirname(candidate);
					const absent = isMissing(cause) ? await entryAbsent(candidate) : false;
					if (absent !== true || parent === candidate) return {
						ok: false,
						reason: typeof absent === "string" ? absent : `${candidate} is not writable: ${errorMessage(cause)}`
					};
					candidate = parent;
				}
			}
		};
		isMissing = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
		entryAbsent = async (path) => {
			try {
				return (await lstat(path)).isSymbolicLink() ? `${path} is a symbolic link whose target does not exist.` : `${path} exists but cannot be resolved.`;
			} catch (cause) {
				return isMissing(cause) ? true : `${path} cannot be inspected: ${errorMessage(cause)}`;
			}
		};
		cacheRootWithoutTrailingSeparator = (cacheRoot, platform) => {
			const pathApi = platform === "win32" ? win32 : posix;
			const root = pathApi.parse(cacheRoot).root;
			const separator = pathApi.sep.charCodeAt(0);
			let end = cacheRoot.length;
			while (end > root.length && cacheRoot.charCodeAt(end - 1) === separator) end -= 1;
			return end === cacheRoot.length ? cacheRoot : cacheRoot.slice(0, end);
		};
	})))();
}

//#endregion
//#region dist/doctorRuntime.js
var selectedRegistrationEnvironment, selectedProviderSettings, readSelectedRegistration, PROVIDER_SETTINGS, settingAffectsProbe, unresolvedProvider, withProbeResourceScope, createSystemDoctorHost, HOPPER_DEMO_HELPER_PATH, inspectLinuxHopperDemoRuntime;
function init_doctorRuntime() {
	return (init_doctorRuntime = __esmMin((() => {
		init_HostPlatform();
		init_Doctor();
		init_DesktopBuildDoctorFacts();
		init_JadxDoctor();
		init_GhidraDoctor();
		init_IdaDoctor();
		init_KunaDoctor();
		init_IdaConfiguration();
		init_LinuxPrivateDisplayProbe();
		init_result();
		init_analysisErrorCore();
		init_providerCleanupError();
		init_resources();
		init_OwnedRegularFile();
		init_ClientConfigurationFiles();
		init_ClientRegistrationEnvironment();
		init_snapshotEnvironment();
		init_SupportedClients();
		init_homeDirectory();
		init_LinuxHopperPython();
		init_settleConcurrent();
		selectedRegistrationEnvironment = async (clients, processEnvironment, resourceScope, signal, platform) => {
			const [selected] = clients;
			if (selected === undefined || clients.length !== 1) return undefined;
			signal.throwIfAborted();
			const home = homeDirectoryFromEnvironment(processEnvironment, platform);
			const client = (await resolveSupportedClients(home, platform, processEnvironment)).find(({ name }) => name === selected);
			if (client === undefined || client.format === "unsupported") return {
				environment: {},
				unresolved: new Set(),
				unknown: true
			};
			const registered = await readSelectedRegistration(client, resourceScope, platform);
			if (registered === undefined) return undefined;
			if ("unknown" in registered) return {
				environment: {},
				unresolved: new Set(),
				unknown: true
			};
			return {
				environment: registered.values,
				unresolved: registered.unresolvedSettings
			};
		};
		selectedProviderSettings = (selected, terminal, platform) => {
			if (selected === undefined) return terminal;
			const settings = { ...snapshotEnvironment(mergeEnvironmentOverrides(terminal, selected.environment, platform), platform) };
			for (const name of Object.keys(snapshotEnvironment(Object.fromEntries([...selected.unresolved].map((entry) => [entry, ""])), platform))) delete settings[name];
			return settings;
		};
		readSelectedRegistration = async (client, resourceScope, platform) => {
			const configuration = await resourceScope.run(() => readEffectiveClientRegistrationConfiguration(client, undefined, platform)).catch((cause) => {
				if (cause instanceof RegularFileCleanupFailure) {
					resourceScope.retain(cause.owner, cause.path);
					return undefined;
				}
				throw cause;
			});
			if (configuration === undefined) return { unknown: true };
			if (!configuration.ok) {
				const cleanup = configuration.error.cleanupFailure;
				if (cleanup !== undefined) resourceScope.retain(cleanup.owner, cleanup.path);
				return { unknown: true };
			}
			if (configuration.value.document === undefined) return undefined;
			const details = clientRegistrationEnvironmentDetails(configuration.value.document, client, platform, {}, "effective");
			return details.ok ? {
				values: details.value.values,
				unresolvedSettings: details.value.unresolvedSettings
			} : { unknown: true };
		};
		PROVIDER_SETTINGS = {
			ghidra: GHIDRA_DOCTOR_SETTINGS,
			ida: IDA_DOCTOR_SETTINGS,
			jadx: JADX_DOCTOR_SETTINGS,
			kuna: KUNA_DOCTOR_SETTINGS
		};
		settingAffectsProbe = (id, name, environment, platform) => {
			const read = (key) => environment[platform === "win32" ? key.toUpperCase() : key];
			switch (id) {
				case "jadx": return name !== "PATH" || read("JAVA_HOME") === undefined;
				case "ghidra":
					if (name === "REA_GHIDRA_PROJECT_PATH") return platform === "win32";
					return name !== "PATH" || read("GHIDRA_INSTALL_DIR") === undefined || read("JAVA_HOME") === undefined;
				case "kuna": {
					if (name !== "HOME" && name !== "USERPROFILE" && name !== "XDG_CACHE_HOME") return true;
					if (read("REA_KUNA_CACHE_DIR") !== undefined) return false;
					if (name === "XDG_CACHE_HOME") return platform !== "darwin";
					if (name === "USERPROFILE" && platform !== "win32" && (read("HOME")?.length ?? 0) > 0) return false;
					return true;
				}
				default: return true;
			}
		};
		unresolvedProvider = (id, selected, environment, platform) => {
			if (selected === undefined) return undefined;
			const normalize = (key) => platform === "win32" ? key.toUpperCase() : key;
			const read = new Set((PROVIDER_SETTINGS[id] ?? []).map(normalize));
			const unresolved = [...selected.unresolved].filter((name) => read.has(normalize(name)) && settingAffectsProbe(id, normalize(name), environment, platform));
			if (selected.unknown !== true && unresolved.length === 0) return undefined;
			const configurationKeys = {
				ghidra: "GHIDRA_INSTALL_DIR",
				ida: "REA_IDA_MCP_CONFIG",
				jadx: "REA_JADX_MCP_JAR",
				kuna: "REA_KUNA_COMMAND"
			};
			const configurationKey = configurationKeys[id];
			const unknownConfiguration = selected.unknown === true || configurationKey === undefined || unresolved.some((name) => normalize(name) === normalize(configurationKey));
			const configuration = configurationKey === undefined ? undefined : environment[configurationKey];
			const configured = unknownConfiguration ? null : id === "kuna" ? configuration !== undefined && configuration.length > 0 : configuration !== undefined;
			return {
				id,
				configured,
				available: null,
				providerVersion: null,
				registrationEnvironment: {},
				checks: [{
					name: "configuration",
					ok: false,
					code: "registration_environment_unknown",
					classification: "unknown",
					detail: selected.unknown === true ? "The selected client's registration could not be read or resolved." : `The selected client's registration has unresolved settings: ${unresolved.join(", ")}.`,
					remediation: "Inspect the selected client's registration on the host and rerun doctor."
				}]
			};
		};
		withProbeResourceScope = (parent, label, operation) => parent.run(async () => {
			const child = new ArtifactResourceScope();
			const scope = {
				retain: (owner, resource) => child.retain({
					kind: "lease",
					resource,
					lease: AnalysisCleanupLease.forCloseOwner(owner, resource)
				}),
				run: (work) => child.run(work)
			};
			try {
				return await operation(scope);
			} finally {
				if (child.hasPending) parent.retain(child, label);
				else await child.close();
			}
		});
		createSystemDoctorHost = (environment = process.env, signal, host = HOST_PLATFORM) => {
			const { platform } = host;
			const registrationReads = new WeakMap();
			const readRegistration = (path, resourceScope, inspectionSignal) => {
				let byPath = registrationReads.get(resourceScope);
				if (byPath === undefined) {
					byPath = new Map();
					registrationReads.set(resourceScope, byPath);
				}
				let registration = byPath.get(path);
				if (registration === undefined) {
					registration = withProbeResourceScope(resourceScope, path, (probeScope) => readIdaConfiguration(path, {
						resourceScope: probeScope,
						signal: inspectionSignal
					}));
					byPath.set(path, registration);
				}
				return registration;
			};
			return systemDoctorHost({
				environment,
				platform,
				architecture: host.architecture,
				...signal === undefined ? {} : { signal },
				resolveProviderRequestBudget: Object.assign(async (analysisProvider, registrationEnvironment, resourceScope, inspectionSignal) => {
					if (analysisProvider !== "ida" && analysisProvider !== "auto") return ok(undefined);
					const path = registrationEnvironment.REA_IDA_MCP_CONFIG;
					if (path === undefined) return ok(undefined);
					const registration = await readRegistration(path, resourceScope, inspectionSignal);
					if (registration.ok) return ok(registration.value.timeoutMs);
					return analysisProvider === "ida" ? registration : ok(undefined);
				}, { budgetSettings: new Set(["REA_IDA_MCP_CONFIG"]) }),
				providerInspections: async (resourceScope, inspectionSignal, clients) => {
					const selected = await withProbeResourceScope(resourceScope, "selected-registration", (probeScope) => selectedRegistrationEnvironment(clients, environment, probeScope, inspectionSignal, platform));
					const inspectionEnvironment = selectedProviderSettings(selected, environment, platform);
					const ghidraUnresolved = unresolvedProvider("ghidra", selected, inspectionEnvironment, platform);
					const idaUnresolved = unresolvedProvider("ida", selected, inspectionEnvironment, platform);
					const jadxUnresolved = unresolvedProvider("jadx", selected, inspectionEnvironment, platform);
					const kunaUnresolved = unresolvedProvider("kuna", selected, inspectionEnvironment, platform);
					return await settleConcurrent([
						ghidraUnresolved !== undefined ? Promise.resolve(ghidraUnresolved) : withProbeResourceScope(resourceScope, "ghidra-doctor", (probeScope) => inspectSystemGhidraProvider(inspectionEnvironment, probeScope, inspectionSignal)),
						idaUnresolved !== undefined ? Promise.resolve(idaUnresolved) : withProbeResourceScope(resourceScope, "ida-doctor", (probeScope) => inspectIdaRegistration(inspectionEnvironment.REA_IDA_MCP_CONFIG, probeScope, inspectionSignal, inspectionEnvironment.REA_IDA_MCP_CONFIG === undefined ? undefined : readRegistration(inspectionEnvironment.REA_IDA_MCP_CONFIG, resourceScope, inspectionSignal))),
						jadxUnresolved !== undefined ? Promise.resolve(jadxUnresolved) : withProbeResourceScope(resourceScope, "jadx-doctor", (probeScope) => inspectJadxProvider(inspectionEnvironment, probeScope, host, inspectionSignal)),
						kunaUnresolved !== undefined ? Promise.resolve(kunaUnresolved) : withProbeResourceScope(resourceScope, "kuna-doctor", (probeScope) => inspectKunaProvider(inspectionEnvironment, platform, {
							resourceScope: probeScope,
							signal: inspectionSignal
						}))
					]);
				},
				desktopBuildFacts: readDesktopBuildFacts,
				linuxDemoRuntimeCheck: (resourceScope, inspectionSignal) => withProbeResourceScope(resourceScope, "hopper-demo-runtime", (probeScope) => inspectLinuxHopperDemoRuntime(environment, probeScope, inspectionSignal))
			});
		};
		HOPPER_DEMO_HELPER_PATH = fileURLToPath(new URL("../scripts/hopper-demo-x11.py", new URL("../doctorRuntime.js", import.meta.url).href));
		inspectLinuxHopperDemoRuntime = async (environment, resourceScope, signal) => {
			const selection = await selectLinuxPrivateDisplayStrategy({
				helperPath: HOPPER_DEMO_HELPER_PATH,
				environment,
				...signal === undefined ? {} : { signal }
			});
			if (!selection.ok && selection.cleanup !== undefined) {
				const { lease, reason } = selection.cleanup;
				resourceScope.retain({
					close: () => lease.release(),
					get cleanupResources() {
						return lease.cleanupResources;
					}
				}, "hopper-private-display-probe");
				const cleanup = {
					reason,
					resources: [...lease.cleanupResources ?? ["hopper-private-display-probe"]]
				};
				const diagnostics = { hopper_demo_runtime: { private_display: { ...selection.diagnostic } } };
				const failure = signal?.aborted === true ? cancelledBy("doctor", signal, {
					cleanup,
					diagnostics
				}) : new ProviderCleanupError("hopper", cleanup.resources, {
					reason,
					...diagnostics
				}, { operation: "doctor" });
				new AnalysisCleanupLeaseGroup(failure, [lease]);
				throw failure;
			}
			if (signal?.aborted === true) throw cancelledBy("doctor", signal, { diagnostics: { hopper_demo_runtime: { private_display: { ...selection.diagnostic } } } });
			const python = await inspectLinuxHopperPythonRuntime(environment, signal);
			const pythonFailure = !python.ok ? python.error : python.value.library.status !== "loadable" ? linuxHopperPythonUnavailable(python.value.library) : undefined;
			const pythonDiagnostic = {
				scope: "system_interpreter",
				hopper_interpreter: "unknown",
				...python.ok ? {
					status: "observed",
					...python.value
				} : {
					status: "unknown",
					reason: python.error.reason,
					message: python.error.message
				}
			};
			const value = selection.diagnostic;
			const detail = [
				`strategy=${selection.strategy}`,
				`socket_directory=${value.socket_directory}`,
				`mode=${value.socket_directory_mode ?? "unknown"}`,
				`mount_read_only=${String(value.mount_read_only)}`,
				`effective_mode=${value.effective_socket_directory_mode ?? "unknown"}`,
				`effective_mount_read_only=${String(value.effective_mount_read_only)}`,
				`wsl=${String(value.wsl)}`,
				`system_python=${python.ok ? python.value.library.status : "unknown"}`
			].join("; ");
			const details = {
				private_display: { ...value },
				embedded_python: pythonDiagnostic
			};
			if (!python.ok && python.error.reason === "cancelled") throw cancelledBy("doctor", carriedReason(python.error.cause), { diagnostics: { hopper_demo_runtime: details } });
			if (selection.ok && pythonFailure === undefined) return {
				name: "hopper-demo-runtime",
				ok: true,
				classification: "healthy",
				detail,
				details
			};
			const missingDependency = value.failure_code === "runtime_dependency_unavailable" || value.failure_code === "x11_authorization_failed" || python.ok && python.value.library.status === "unavailable";
			const pythonRemediation = pythonFailure === undefined ? undefined : pythonFailure.reason === "runtime_unavailable" ? pythonFailure.message + " On a supported system run rea setup --install-hopper, then rerun rea doctor --provider hopper. This checks the system interpreter; a custom Hopper Python interpreter needs its own matching shared runtime." : pythonFailure.reason === "configuration_unknown" ? pythonFailure.message + " Inspect this interpreter's shared-runtime configuration, then rerun rea doctor --provider hopper." : pythonFailure.message + " Retry rea doctor --provider hopper and inspect /usr/bin/python3 if its runtime remains unknown.";
			const displayRemediation = selection.ok ? undefined : value.failure_code === "x11_socket_directory_unusable" ? "Enable unprivileged user and mount namespaces, or provide a writable mode-1777 /tmp/.X11-unix directory. Do not mutate the current host mount with sudo; then rerun rea doctor --provider hopper." : value.failure_code === "runtime_dependency_unavailable" || value.failure_code === "x11_authorization_failed" ? "Install Xvfb, xauth, Python 3, libX11, and libXtst, then rerun rea doctor --provider hopper." : "Inspect the private-display diagnostic, correct the reported local condition, and rerun rea doctor --provider hopper.";
			return {
				name: "hopper-demo-runtime",
				ok: false,
				classification: missingDependency ? "missing_dependency" : selection.ok ? "unknown" : "config_drift",
				detail,
				details,
				remediation: [pythonRemediation, displayRemediation].filter((message) => message !== undefined).join(" ")
			};
		};
	})))();
}

//#endregion
init_doctorRuntime();
export { createSystemDoctorHost, selectedProviderSettings, settingAffectsProbe };