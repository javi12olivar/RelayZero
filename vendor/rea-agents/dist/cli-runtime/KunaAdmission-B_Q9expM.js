import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisCancelledError, AnalysisError, AnalysisProtocolError, AnalysisResourceConstraintError, ConfigurationError, DEFAULT_KUNA_FUNCTION_TIMEOUT_MS, DEFAULT_KUNA_PROJECT_TIMEOUT_MS, MAX_NODE_TIMER_DELAY_MS, cancelledBy, carriedReason, errorMessage, fixedAllowanceOptions, fixedProducerInputAllowance, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_configurationErrors, init_errorMessage, init_fixedAllowanceRemediation, init_jsonValue, init_sha256Hex, jsonValueSchema, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, currentAnalysisOperationSnapshot, init_HostPlatform, init_analysisOperationSnapshot, init_safeJson, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { init_executableSearch, posixPathCandidates, windowsPathCandidates } from "./executableSearch-B91ds2Qv.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { init_inputIssueProjection, projectInputIssues } from "./inputIssueProjection-W-zXU1iH.js";
import { AnalysisCleanupLease, ArtifactFileCleanupFailure, ArtifactReaderFailure, ArtifactResourceScope, NonRegularFileReadError, RegularFileChangedError, RegularFileCleanupFailure, RegularFileOperationCancelled, artifactFileCompletion, artifactFilePrimaryFacts, assertArtifactReadActive, bindArtifactFileCleanup, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedRegularFile, init_RegularFile, init_resources, mapArtifactFileFailure, regularFileCancellation, withArtifactFileHandle, withArtifactRegularFile, withOwnedRegularFile } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot, init_WindowsAuthority, inspectWindowsNativeReadiness, privateRuntimeRootCapability } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { init_BoundedFileBytes, readBoundedFileBytes } from "./RegularFileRead-CRu2Ia6l.js";
import { init_providerStartupTimeout, providerStartupTimeoutSchema } from "./providerStartupTimeout-DNZGsNYA.js";
import { init_jsonRecord, jsonRecordSchema } from "./jsonRecord-Cuy_NNu4.js";
import { init_launchFailure, launcherFailureOf } from "./ExecFileOutput-YDVPmL3I.js";
import { homeDirectoryFromEnvironment, init_homeDirectory } from "./homeDirectory-DC_DeJIg.js";
import { init_binaryTargetTypes, isMachOFormat } from "./binaryTargetTypes-CrE-Muhh.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { init_utf8HeadExcerpt, utf8HeadExcerpt } from "./utf8HeadExcerpt-BO0eOwRw.js";
import { RegularFileCapacityError, init_readStableFileBytes, readStableFileBytes, readStableFilePrefix } from "./readStableFileBytes-DcvIhp5d.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { cleanupOwnedProcessGroup, init_ProcessOwnership } from "./ProcessOwnership-CezAYpow.js";
import { OwnedCommandFailure, init_OwnedCommand, preparationHostCapacityFailure, prepareOwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { bindProcessInspectionCancellations, init_OwnedCommandCleanup, processInspectionCancellationError, processInspectionFailure, retainOwnedCommandCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { classifyLaunchFailure, init_classifyProviderOutcome } from "./classifyProviderOutcome-BMRoGrMs.js";
import { init_binaryTarget, parseExecutableHeader, readFatArchitectureFamilies } from "./binaryTarget-BWcJ62i0.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { analysisClientFailureForOperation, init_AnalysisClientFailure } from "./AnalysisClientFailure-DEt-O8Hp.js";
import { defaultKunaCacheDirectory, init_cacheDirectory } from "./cacheDirectory-Dg3TgBIa.js";
import { accessSync, constants, createReadStream, readdirSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, isAbsolute, join, normalize, posix, resolve, sep, win32 } from "node:path";
import { z } from "zod";
import { createHash, randomUUID } from "node:crypto";
import { access, open, realpath, stat, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";

//#region dist/hopper/HopperStartupFailure.js
var HOPPER_DEMO_DIALOG_TIMEOUT_SETTING, DEFAULT_HOPPER_DEMO_DIALOG_TIMEOUT_MS, MINIMUM_HOPPER_DEMO_DIALOG_TIMEOUT_MS, invalidDialogTimeoutMessage, failures, HOPPER_STARTUP_FAILURES, hopperStartupFailure, hopperStartupExitCode, isDialogTimeoutRejection, dialogTimeoutFromDiagnostic, isHopperStartupFailureCode;
function init_HopperStartupFailure() {
	return (init_HopperStartupFailure = __esmMin((() => {
		init_analysisResourceLimits();
		HOPPER_DEMO_DIALOG_TIMEOUT_SETTING = "REA_HOPPER_DEMO_DIALOG_TIMEOUT_MS";
		DEFAULT_HOPPER_DEMO_DIALOG_TIMEOUT_MS = 1e4;
		MINIMUM_HOPPER_DEMO_DIALOG_TIMEOUT_MS = 1;
		invalidDialogTimeoutMessage = (setting) => {
			const current = setting === undefined ? "was rejected" : `is ${JSON.stringify(setting.value)} ms`;
			const floor = String(1);
			const maximum = String(MAX_NODE_TIMER_DELAY_MS);
			const source = setting?.source ?? "setting";
			return [`The effective ${HOPPER_DEMO_DIALOG_TIMEOUT_SETTING} value ${current} (source ${source}; default ${String(DEFAULT_HOPPER_DEMO_DIALOG_TIMEOUT_MS)} ms, floor ${floor} ms, maximum ${maximum} ms).`, `Set ${HOPPER_DEMO_DIALOG_TIMEOUT_SETTING} in the environment that starts REA to a positive decimal integer from ${floor} to ${maximum}, then restart REA.`].join(" ");
		};
		failures = [
			[
				70,
				"private_display_unavailable",
				"REA could not start its private Linux display. Install Xvfb, then rerun rea doctor."
			],
			[
				71,
				"x11_authorization_failed",
				"REA could not authorize its private Linux display. Install xauth, then rerun rea doctor."
			],
			[
				72,
				"unsupported_hopper_build",
				"This Hopper build is not supported for unattended Linux analysis. Unset HOPPER_LAUNCHER_PATH and rerun rea setup --yes --install-hopper, or update REA."
			],
			[
				73,
				"invalid_launch_command",
				"REA refused an unexpected Hopper launch command. Check HOPPER_LAUNCHER_PATH and rerun rea doctor."
			],
			[
				74,
				"process_ownership_mismatch",
				"REA could not verify ownership of the launched Hopper process and stopped safely. Close other Hopper sessions and retry."
			],
			[
				75,
				"hopper_exited_during_startup",
				"Hopper exited before the REA bridge was ready. In CI, run rea doctor --provider hopper --json; if Hopper showed a UI or license prompt, complete it in the runner user session, otherwise close stale Hopper sessions and retry."
			],
			[
				76,
				"unsupported_demo_dialog",
				"This Hopper demo dialog is not supported for unattended Linux analysis. Update REA or use a supported Hopper build."
			],
			[
				77,
				"unexpected_display_geometry",
				"REA's private Linux display did not match the validated layout. Close custom display overrides and retry."
			],
			[
				78,
				"x11_input_failed",
				"REA could not activate Hopper's validated demo control. Install the XTEST runtime, then rerun rea doctor."
			],
			[
				79,
				"runtime_dependency_unavailable",
				"A Linux demo-session dependency is unavailable. Rerun rea setup --yes --install-hopper, then rea doctor."
			],
			[
				80,
				"x11_socket_directory_unusable",
				"REA cannot use the host X11 socket directory for a private display. Run rea doctor --provider hopper for exact mount and namespace diagnostics."
			],
			[
				81,
				"demo_dialog_absent",
				"Hopper passed launcher authentication but did not present a registration dialog within the wait window. If this host is slow, raise REA_HOPPER_DEMO_DIALOG_TIMEOUT_MS and retry; otherwise complete Hopper setup or close stale sessions and retry."
			],
			[
				82,
				"invalid_dialog_timeout",
				invalidDialogTimeoutMessage()
			]
		];
		HOPPER_STARTUP_FAILURES = new Map(failures.map(([exitCode, code, message]) => [exitCode, {
			code,
			message
		}]));
		hopperStartupFailure = (exitCode) => exitCode === null ? undefined : HOPPER_STARTUP_FAILURES.get(exitCode);
		hopperStartupExitCode = (code) => failures.find(([, candidate]) => candidate === code)?.[0];
		isDialogTimeoutRejection = (value) => {
			if (typeof value !== "object" || value === null) return false;
			const setting = Reflect.get(value, "setting");
			const shown = Reflect.get(value, "value");
			const source = Reflect.get(value, "source");
			return setting === "REA_HOPPER_DEMO_DIALOG_TIMEOUT_MS" && typeof shown === "string" && shown.length <= 128 && source === "setting" && Reflect.get(value, "minimum_ms") === 1 && Reflect.get(value, "maximum_ms") === 2147483647 && Reflect.get(value, "default_ms") === 1e4;
		};
		dialogTimeoutFromDiagnostic = (diagnostic) => {
			if (diagnostic?.status !== "error") return undefined;
			const value = Reflect.get(diagnostic, "dialog_timeout");
			return isDialogTimeoutRejection(value) ? value : undefined;
		};
		isHopperStartupFailureCode = (value) => failures.some(([, candidate]) => candidate === value);
	})))();
}

//#endregion
//#region dist/hopper/LinuxPrivateDisplayDiagnostic.js
var LINUX_PRIVATE_DISPLAY_DIAGNOSTIC_PREFIX, diagnosticContextSchema, dialogTimeoutSchema, failureCodeSchema, diagnosticSchema, parseLinuxPrivateDisplayDiagnostic;
function init_LinuxPrivateDisplayDiagnostic() {
	return (init_LinuxPrivateDisplayDiagnostic = __esmMin((() => {
		init_analysisResourceLimits();
		init_HopperStartupFailure();
		init_safeJson();
		LINUX_PRIVATE_DISPLAY_DIAGNOSTIC_PREFIX = "REA_X11_DIAGNOSTIC=";
		diagnosticContextSchema = z.object({
			component: z.literal("hopper_private_display"),
			operation: z.enum(["probe", "launch"]),
			reason: z.string().regex(/^[a-z0-9_]+$/u),
			socket_directory: z.literal("/tmp/.X11-unix"),
			socket_directory_mode: z.string().regex(/^[0-7]{4}$/u).nullable(),
			mount_read_only: z.boolean().nullable(),
			effective_socket_directory_mode: z.string().regex(/^[0-7]{4}$/u).nullable(),
			effective_mount_read_only: z.boolean().nullable(),
			wsl: z.boolean(),
			strategy: z.enum([
				"direct",
				"user-mount-namespace",
				"unavailable"
			]),
			fallback_reason: z.string().regex(/^[a-z0-9_]+$/u).nullable(),
			xvfb_stderr_bytes: z.int().nonnegative().safe()
		});
		dialogTimeoutSchema = z.object({
			setting: z.literal(HOPPER_DEMO_DIALOG_TIMEOUT_SETTING),
			value: z.string().max(128),
			source: z.literal("setting"),
			minimum_ms: z.literal(1),
			maximum_ms: z.literal(MAX_NODE_TIMER_DELAY_MS),
			default_ms: z.literal(DEFAULT_HOPPER_DEMO_DIALOG_TIMEOUT_MS)
		}).strict();
		failureCodeSchema = z.string().transform((value, context) => {
			if (isHopperStartupFailureCode(value)) return value;
			context.addIssue({
				code: "custom",
				message: "Unknown startup failure code"
			});
			return z.NEVER;
		});
		diagnosticSchema = z.discriminatedUnion("status", [diagnosticContextSchema.extend({
			status: z.literal("ready"),
			failure_code: z.null()
		}).strict(), diagnosticContextSchema.extend({
			status: z.literal("error"),
			failure_code: failureCodeSchema,
			dialog_timeout: dialogTimeoutSchema.optional()
		}).strict()]);
		parseLinuxPrivateDisplayDiagnostic = (stderr) => {
			const records = stderr.split("\n").filter((line) => line.startsWith(LINUX_PRIVATE_DISPLAY_DIAGNOSTIC_PREFIX));
			if (records.length === 0) return {
				ok: false,
				reason: "diagnostic_missing"
			};
			if (records.length !== 1) return {
				ok: false,
				reason: "diagnostic_multiple"
			};
			const record = records[0];
			if (record === undefined) return {
				ok: false,
				reason: "diagnostic_missing"
			};
			const decoded = safeParseJson(record.slice(LINUX_PRIVATE_DISPLAY_DIAGNOSTIC_PREFIX.length));
			if (!decoded.ok) return {
				ok: false,
				reason: "diagnostic_malformed"
			};
			const parsed = diagnosticSchema.safeParse(decoded.value);
			if (!parsed.success) return {
				ok: false,
				reason: "diagnostic_malformed"
			};
			const value = parsed.data;
			if (value.status === "error" && value.dialog_timeout === undefined) {
				const { dialog_timeout: _omitted, ...diagnostic } = value;
				return {
					ok: true,
					value: diagnostic
				};
			}
			return {
				ok: true,
				value
			};
		};
	})))();
}

//#endregion
//#region dist/hopper/LinuxPrivateDisplayProbe.js
var PYTHON_PATH, UNSHARE_PATH, DEFAULT_PROBE_TIMEOUT_MS, isAborted, selectLinuxPrivateDisplayStrategy, runLinuxPrivateDisplayProbe, privateDisplayProbeCommand, evaluatedProbe, exitMatchesDiagnostic, syntheticDiagnostic, unavailable, emptyProcessResult, waitForProbeOutputClose;
function init_LinuxPrivateDisplayProbe() {
	return (init_LinuxPrivateDisplayProbe = __esmMin((() => {
		init_resources();
		init_HopperStartupFailure();
		init_ProcessOwnership();
		init_ProviderProcess();
		init_LinuxPrivateDisplayDiagnostic();
		init_errorMessage();
		PYTHON_PATH = "/usr/bin/python3";
		UNSHARE_PATH = "/usr/bin/unshare";
		DEFAULT_PROBE_TIMEOUT_MS = 5e3;
		isAborted = (signal) => signal?.aborted === true;
		selectLinuxPrivateDisplayStrategy = async (options) => {
			const timeoutMs = options.timeoutMs ?? DEFAULT_PROBE_TIMEOUT_MS;
			const runner = options.runProbe ?? runLinuxPrivateDisplayProbe;
			const direct = await evaluatedProbe("direct", options, timeoutMs, runner);
			if (direct.ok) return direct;
			if (direct.diagnostic.failure_code !== "x11_socket_directory_unusable") return unavailable(direct.diagnostic, direct.cleanup);
			const isolated = await evaluatedProbe("user-mount-namespace", options, timeoutMs, runner);
			if (!isolated.ok) return unavailable({
				...direct.diagnostic,
				strategy: "unavailable",
				reason: "namespace_unavailable",
				fallback_reason: isolated.diagnostic.reason,
				effective_socket_directory_mode: isolated.diagnostic.effective_socket_directory_mode,
				effective_mount_read_only: isolated.diagnostic.effective_mount_read_only,
				xvfb_stderr_bytes: isolated.diagnostic.xvfb_stderr_bytes
			}, isolated.cleanup);
			return {
				ok: true,
				strategy: "user-mount-namespace",
				diagnostic: {
					...isolated.diagnostic,
					socket_directory_mode: direct.diagnostic.socket_directory_mode,
					mount_read_only: direct.diagnostic.mount_read_only,
					fallback_reason: null
				}
			};
		};
		runLinuxPrivateDisplayProbe = async (strategy, options) => {
			if (isAborted(options.signal)) return emptyProcessResult("cancelled");
			const command = privateDisplayProbeCommand(options.helperPath, strategy);
			let started;
			try {
				started = await spawnOwnedProviderProcess({
					command: command.command,
					arguments: command.arguments,
					runId: randomUUID(),
					expectedCommand: null,
					...options.environment === undefined ? {} : { hostEnvironment: options.environment },
					...options.signal === undefined ? {} : { signal: options.signal }
				});
			} catch (cause) {
				void cause;
				return emptyProcessResult(isAborted(options.signal) ? "cancelled" : "launch-failed");
			}
			const launch = {
				process: started.process,
				ownsProcessLifetime: true,
				cleanup: () => cleanupOwnedProcessGroup(started.ownership)
			};
			const supervisor = new ProviderProcessSupervisor(launch);
			const outcome = await waitForProbeOutputClose(supervisor, options.timeoutMs, options.signal);
			let cleanup = { status: "released" };
			const lease = new AnalysisCleanupLease(async () => {
				const stopped = await supervisor.stop();
				if (stopped.status === "incomplete") throw new Error(stopped.reason);
				if (stopped.status === "not-owned") throw new Error("Private-display probe ownership remains unresolved");
				supervisor.dispose();
			}, [`hopper-private-display-probe:${started.ownership.runId}`]);
			try {
				await lease.release();
			} catch (cause) {
				cleanup = {
					status: "pending",
					lease,
					reason: errorMessage(cause)
				};
			}
			const snapshot = supervisor.snapshot();
			return {
				outcome: outcome === "exit" ? "exited" : outcome === "timeout" ? "timed-out" : "cancelled",
				exitCode: snapshot.exitCode,
				stderr: snapshot.stderr.text,
				stderrBytes: snapshot.stderr.bytes,
				cleanup
			};
		};
		privateDisplayProbeCommand = (helperPath, strategy) => strategy === "direct" ? {
			command: PYTHON_PATH,
			arguments: [
				helperPath,
				"--probe",
				"--strategy",
				"direct"
			]
		} : {
			command: UNSHARE_PATH,
			arguments: [
				"--user",
				"--map-root-user",
				"--mount",
				"--propagation",
				"private",
				PYTHON_PATH,
				helperPath,
				"--probe",
				"--strategy",
				"user-mount-namespace",
				"--mount-private-x11"
			]
		};
		evaluatedProbe = async (strategy, options, timeoutMs, runner) => {
			let processResult;
			try {
				processResult = await runner(strategy, {
					helperPath: options.helperPath,
					...options.environment === undefined ? {} : { environment: options.environment },
					timeoutMs,
					...options.signal === undefined ? {} : { signal: options.signal }
				});
			} catch (cause) {
				void cause;
				return {
					ok: false,
					diagnostic: syntheticDiagnostic(strategy, "probe_failed")
				};
			}
			const cleanup = processResult.cleanup.status === "pending" ? processResult.cleanup : undefined;
			const failed = (reason) => ({
				ok: false,
				diagnostic: syntheticDiagnostic(strategy, reason),
				...cleanup === undefined ? {} : { cleanup }
			});
			if (processResult.outcome === "cancelled") return failed("cancelled");
			if (processResult.outcome === "timed-out") return failed("probe_timeout");
			if (processResult.outcome === "launch-failed") return failed("probe_failed");
			if (cleanup !== undefined) return failed("cleanup_incomplete");
			const parsed = parseLinuxPrivateDisplayDiagnostic(processResult.stderr);
			if (!parsed.ok) return {
				ok: false,
				diagnostic: syntheticDiagnostic(strategy, parsed.reason)
			};
			const diagnostic = parsed.value;
			if (diagnostic.strategy !== strategy || diagnostic.operation !== "probe" || !exitMatchesDiagnostic(processResult.exitCode, diagnostic)) return {
				ok: false,
				diagnostic: syntheticDiagnostic(strategy, "diagnostic_malformed")
			};
			return diagnostic.status === "ready" ? {
				ok: true,
				strategy,
				diagnostic
			} : {
				ok: false,
				diagnostic
			};
		};
		exitMatchesDiagnostic = (exitCode, diagnostic) => diagnostic.status === "ready" ? exitCode === 0 : hopperStartupExitCode(diagnostic.failure_code) === exitCode;
		syntheticDiagnostic = (strategy, reason, failureCode = "private_display_unavailable") => ({
			component: "hopper_private_display",
			operation: "probe",
			status: "error",
			failure_code: failureCode,
			reason,
			socket_directory: "/tmp/.X11-unix",
			socket_directory_mode: null,
			mount_read_only: null,
			effective_socket_directory_mode: null,
			effective_mount_read_only: null,
			wsl: false,
			strategy,
			fallback_reason: null,
			xvfb_stderr_bytes: 0
		});
		unavailable = (diagnostic, cleanup) => ({
			ok: false,
			strategy: "unavailable",
			exitCode: hopperStartupExitCode(diagnostic.failure_code) ?? 70,
			diagnostic: {
				...diagnostic,
				strategy: "unavailable"
			},
			...cleanup === undefined ? {} : { cleanup }
		});
		emptyProcessResult = (outcome) => ({
			outcome,
			exitCode: undefined,
			stderr: "",
			stderrBytes: 0,
			cleanup: { status: "released" }
		});
		waitForProbeOutputClose = async (supervisor, timeoutMs, signal) => {
			if (signal?.aborted === true) return "cancelled";
			const closed = await supervisor.waitForOutputClose(Math.max(1, timeoutMs), signal);
			return closed ? "exit" : isAborted(signal) ? "cancelled" : "timeout";
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraAdmissionError.js
var GHIDRA_ADMISSION_CODES, GhidraAdmissionError;
function init_GhidraAdmissionError() {
	return (init_GhidraAdmissionError = __esmMin((() => {
		GHIDRA_ADMISSION_CODES = [
			"existing_project_windows",
			"existing_project_program_name",
			"existing_project_psp",
			"existing_project_dos",
			"existing_project_raw_binary",
			"existing_project_language_override",
			"existing_project_mips_soft_float",
			"existing_project_riscv_calling_convention",
			"existing_project_elf_image_base",
			"existing_project_analysis",
			"gamecube_dol_combined",
			"psp_combined",
			"psp_raw_binary",
			"mips_soft_float_scope",
			"riscv_calling_convention_scope",
			"elf_image_base_scope",
			"elf_image_base_format",
			"language_override_dos",
			"language_override_raw_binary",
			"raw_binary_dos",
			"invalid_environment_entry",
			"invalid_jvm_argument",
			"unterminated_quote",
			"platform_override",
			"argument_files_exceed_bound",
			"nested_argument_file",
			"argument_file_unreadable",
			"argument_file_path_invalid",
			"argument_files_require_scope",
			"prepared_options_exceed_bound",
			"output_unobserved",
			"handshake_identity",
			"import_identity_unavailable",
			"import_identity_mismatch",
			"response_shape",
			"response_json",
			"seed_path_differs",
			"seed_changed",
			"canonical_path",
			"nesting_exceeds_limit",
			"entry_kind",
			"component_missing",
			"loader_jar_missing",
			"bytes_exceed_limit",
			"properties_exceed_limit",
			"component_changed",
			"component_truncated",
			"properties_invalid",
			"metadata_mismatch",
			"host_unsupported",
			"inventory_exceeds_limit",
			"not_jar",
			"unregistered",
			"path_differs",
			"digest_differs"
		];
		GhidraAdmissionError = class extends Error {
			code;
			detail;
			_tag = "GhidraAdmissionError";
			constructor(code, detail, options) {
				super(code, options);
				this.code = code;
				this.detail = detail;
				this.name = "GhidraAdmissionError";
			}
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraFileArtifacts.js
var readGhidraProfileArtifact, writeGhidraProfileArtifact, ghidraPhysicalFailure, ghidraFileDialect;
function init_GhidraFileArtifacts() {
	return (init_GhidraFileArtifacts = __esmMin((() => {
		init_GhidraAdmissionError();
		init_resources();
		init_readStableFileBytes();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_RegularFile();
		init_providerAdapterError();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_errorMessage();
		readGhidraProfileArtifact = (path, maximumBytes, resources, signal, interpret) => withArtifactRegularFile(path, resources, signal, async ({ handle: file }) => {
			const bytes = await readStableFileBytes(file, path, maximumBytes, {
				symlinks: "reject",
				...signal === undefined ? {} : { signal }
			});
			return interpret(bytes);
		});
		writeGhidraProfileArtifact = async (path, bytes, resources, signal) => {
			assertArtifactReadActive(signal);
			const file = await open(path, "wx", 384);
			await withArtifactFileHandle(path, file, resources, signal, (handle) => handle.writeFile(bytes));
		};
		ghidraPhysicalFailure = (primary, operation, diagnostics) => {
			if (primary instanceof RegularFileCapacityError) return new AnalysisResourceConstraintError(operation, "file-size", primary.message, {
				maximum_bytes: primary.maximumBytes,
				observed_bytes: primary.observedBytes.toString()
			}, {
				cause: primary,
				diagnostics,
				retryable: false
			});
			if (primary instanceof RegularFileChangedError) return new AnalysisArtifactChangedError(operation, primary.path, primary.message, {
				cause: primary,
				diagnostics
			});
			if (primary instanceof Error && "code" in primary && (primary.code === "EACCES" || primary.code === "EPERM")) {
				const path = "path" in primary && typeof primary.path === "string" ? primary.path : diagnostics.path;
				if (typeof path === "string") return new AnalysisAccessDeniedError(operation, path, primary.code, {
					cause: primary,
					diagnostics
				});
			}
			return primary;
		};
		ghidraFileDialect = (operation, diagnostics = {}) => ({
			providerId: "ghidra",
			operation,
			diagnostics,
			recognise: (cause) => {
				const mapped = mapArtifactFileFailure(cause, (primary) => ghidraPhysicalFailure(primary, operation, diagnostics));
				const { cause: primary, origin } = artifactFilePrimaryFacts(mapped);
				if (origin !== "owned-or-classified" || !(primary instanceof AnalysisError)) return undefined;
				const cleanup = mapped instanceof ArtifactReaderFailure ? mapped.cleanup : undefined;
				if (cleanup === undefined) return primary;
				const failure = new ProviderCleanupError("ghidra", cleanup.resources, { reason: cleanup.reason }, { cause: mapped });
				bindArtifactFileCleanup(mapped, failure);
				return analysisErrorWithCleanupDependencies(primary, failure, operation);
			},
			unclassified: (cause, details) => {
				const { cause: primary } = artifactFilePrimaryFacts(cause);
				const admission = primary instanceof GhidraAdmissionError ? primary : undefined;
				const reason = admission?.code ?? errorMessage(primary);
				const systemCode = admission === undefined && primary instanceof Error && "code" in primary && typeof primary.code === "string" ? primary.code : undefined;
				return new ProviderAdapterError("ghidra", operation, {
					...details,
					cause,
					diagnostics: {
						...admission?.detail,
						...diagnostics,
						...admission === undefined ? {} : { code: admission.code },
						...systemCode === undefined ? {} : { system_code: systemCode },
						...primary instanceof Error && "syscall" in primary && typeof primary.syscall === "string" ? { syscall: primary.syscall } : {},
						reason
					},
					userMessage: reason
				});
			}
		});
	})))();
}

//#endregion
//#region dist/ghidra/GhidraAdmission.js
var EXISTING_PROJECT_WINDOWS_UNAVAILABLE, EXISTING_PROJECT_WINDOWS_REMEDIATION, admitGhidraInstallation;
function init_GhidraAdmission() {
	return (init_GhidraAdmission = __esmMin((() => {
		init_WindowsAuthority();
		EXISTING_PROJECT_WINDOWS_UNAVAILABLE = "An existing Ghidra project cannot be opened on the Windows launch path.";
		EXISTING_PROJECT_WINDOWS_REMEDIATION = "Unset REA_GHIDRA_PROJECT_PATH in the environment that starts REA to import targets into an ephemeral project, or open the existing project on a supported Linux or macOS host; restart REA after changing the environment.";
		admitGhidraInstallation = (installation, selection) => {
			const windowsNative = installation.platform === "win32" ? inspectWindowsNativeReadiness(installation.platform) : undefined;
			if (selection.existingProject && installation.platform === "win32") return {
				windowsNative,
				admitted: false,
				refusal: {
					kind: "existing_project_unsupported_host",
					installation
				}
			};
			if (installation.status !== "available") return {
				windowsNative,
				admitted: false,
				refusal: {
					kind: "installation_rejected",
					installation
				}
			};
			if (windowsNative?.available === false) return {
				windowsNative,
				admitted: false,
				refusal: {
					kind: "windows_native_unavailable",
					installation,
					readiness: windowsNative
				}
			};
			return {
				windowsNative,
				admitted: true,
				installation
			};
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraJavaProperties.js
/** Join odd-backslash continuations while stripping leading continuation space. */
function* logicalPropertyLines(content) {
	let physicalStart = 0;
	let logical = "";
	let continuing = false;
	while (physicalStart <= content.length) {
		let physicalEnd = physicalStart;
		while (physicalEnd < content.length && content[physicalEnd] !== "\n" && content[physicalEnd] !== "\r") physicalEnd += 1;
		const raw = content.slice(physicalStart, physicalEnd);
		let leading = 0;
		while (isPropertyWhitespace(raw[leading])) leading += 1;
		const line = raw.slice(leading);
		const comment = logical.length === 0 && (line[0] === "#" || line[0] === "!");
		let continued = false;
		if (!comment) {
			let slashes = 0;
			for (let index = line.length - 1; index >= 0 && line[index] === "\\"; index -= 1) slashes += 1;
			continued = slashes % 2 === 1;
			logical += continued ? line.slice(0, -1) : line;
		}
		if (!continued) {
			yield logical;
			logical = "";
		}
		continuing = continued;
		if (physicalEnd === content.length) break;
		physicalStart = content[physicalEnd] === "\r" && content[physicalEnd + 1] === "\n" ? physicalEnd + 2 : physicalEnd + 1;
	}
	if (continuing) yield logical;
}
var GHIDRA_JAVA_PROPERTIES_CODES, parseGhidraJavaProperties, isPropertyWhitespace, decodePropertyEscapes;
function init_GhidraJavaProperties() {
	return (init_GhidraJavaProperties = __esmMin((() => {
		GHIDRA_JAVA_PROPERTIES_CODES = ["trailing_escape", "malformed_unicode_escape"];
		parseGhidraJavaProperties = (content) => {
			const values = new Map();
			for (const line of logicalPropertyLines(content)) {
				let start = 0;
				while (isPropertyWhitespace(line[start])) start += 1;
				if (start === line.length || line[start] === "#" || line[start] === "!") continue;
				let end = start;
				let escaped = false;
				while (end < line.length) {
					const character = line[end];
					if (!escaped && (character === "=" || character === ":" || isPropertyWhitespace(character))) break;
					if (character === "\\") escaped = !escaped;
					else escaped = false;
					end += 1;
				}
				let valueStart = end;
				while (isPropertyWhitespace(line[valueStart])) valueStart += 1;
				if (line[valueStart] === "=" || line[valueStart] === ":") valueStart += 1;
				while (isPropertyWhitespace(line[valueStart])) valueStart += 1;
				const key = decodePropertyEscapes(line.slice(start, end));
				if (!key.ok) return key;
				const value = decodePropertyEscapes(line.slice(valueStart));
				if (!value.ok) return value;
				values.set(key.value, value.value);
			}
			return {
				ok: true,
				value: values
			};
		};
		isPropertyWhitespace = (value) => value === " " || value === "	" || value === "\f";
		decodePropertyEscapes = (value) => {
			let result = "";
			for (let index = 0; index < value.length; index += 1) {
				const character = value[index];
				if (character !== "\\") {
					result += character;
					continue;
				}
				const escaped = value[++index];
				if (escaped === undefined) return {
					ok: false,
					error: "trailing_escape"
				};
				if (escaped === "t") result += "	";
				else if (escaped === "n") result += "\n";
				else if (escaped === "r") result += "\r";
				else if (escaped === "f") result += "\f";
				else if (escaped === "u") {
					const digits = value.slice(index + 1, index + 5);
					if (digits.length !== 4 || !/^[0-9a-f]{4}$/iu.test(digits)) return {
						ok: false,
						error: "malformed_unicode_escape"
					};
					result += String.fromCharCode(Number.parseInt(digits, 16));
					index += 4;
				} else result += escaped;
			}
			return {
				ok: true,
				value: result
			};
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraJavaProbe.js
var JAVA_PROBE_MAX_OUTPUT_BYTES, JAVA_DIAGNOSTIC_STREAM_BYTES, capturedProbeOutput, executablePath$1, probeGhidraJava, observeGhidraJava, systemCode, probeFailureError, parseGhidraJavaOutput, javaProperty, javaMajor;
function init_GhidraJavaProbe() {
	return (init_GhidraJavaProbe = __esmMin((() => {
		init_HostPlatform();
		init_launchFailure();
		init_classifyProviderOutcome();
		init_GhidraAdmissionError();
		init_OwnedCommandCleanup();
		init_AnalysisClientFailure();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_analysisErrorCleanup();
		init_jsonValue();
		init_DarwinProcessRunTokenReader();
		init_OwnedCommand();
		init_utf8HeadExcerpt();
		init_result();
		init_errorMessage();
		JAVA_PROBE_MAX_OUTPUT_BYTES = 1024 * 1024;
		JAVA_DIAGNOSTIC_STREAM_BYTES = 8192;
		capturedProbeOutput = (observed) => {
			const stdout = utf8HeadExcerpt(observed.stdout.text, JAVA_DIAGNOSTIC_STREAM_BYTES);
			const stderr = utf8HeadExcerpt(observed.stderr.text, JAVA_DIAGNOSTIC_STREAM_BYTES);
			return {
				stdout: stdout.text,
				stderr: stderr.text,
				truncated: stdout.truncated || stderr.truncated || observed.diagnosticTruncated === true || observed.outputIncomplete === true,
				stdout_bytes: observed.stdout.observedBytes,
				stderr_bytes: observed.stderr.observedBytes,
				exit_code: observed.exitCode ?? null,
				signal: observed.signal ?? null
			};
		};
		executablePath$1 = (path) => {
			try {
				accessSync(path, constants.X_OK);
				return statSync(path).isFile();
			} catch {
				return false;
			}
		};
		probeGhidraJava = async (command, environment, options) => {
			try {
				return await options.resourceOwner.run(() => observeGhidraJava(command, environment, options));
			} catch (cause) {
				return err(analysisClientFailureForOperation(cause, "ghidra", "ghidra:java"));
			}
		};
		observeGhidraJava = async (command, environment, options) => {
			let interpreted;
			try {
				await prepareOwnedCommand(options.signal);
				await runOwnedCommand({
					command,
					arguments: [
						"-Dstdout.encoding=UTF-8",
						"-Dstderr.encoding=UTF-8",
						"-Dsun.stdout.encoding=UTF-8",
						"-Dsun.stderr.encoding=UTF-8",
						"-XX:-UsePerfData",
						"-XshowSettings:properties",
						"-version"
					],
					runId: randomUUID(),
					expectedCommand: null,
					hostEnvironment: environment,
					sweepTokenOwnedProcesses: true
				}, {
					timeoutMs: options.timeoutMs ?? 5e3,
					diagnosticBytes: JAVA_PROBE_MAX_OUTPUT_BYTES,
					acceptNonZeroExit: true,
					observeCompleted: (snapshot) => {
						interpreted = parseGhidraJavaOutput(command, snapshot);
					}
				}, {
					signal: options.signal,
					...options.launcher === undefined ? {} : { launcher: options.launcher }
				});
				if (interpreted === undefined) throw new GhidraAdmissionError("output_unobserved");
				return interpreted;
			} catch (cause) {
				const commandFailure = cause instanceof OwnedCommandFailure ? cause : undefined;
				const preparation = processInspectionFailure(cause);
				const output = commandFailure?.snapshot === undefined || commandFailure.snapshot === null ? preparation instanceof DarwinProcessOwnershipInspectionError ? preparation.capturedOutput : undefined : capturedProbeOutput(commandFailure.snapshot);
				if (interpreted !== undefined && !interpreted.ok && commandFailure?.cancellation !== undefined) Object.defineProperty(interpreted.error, "cancellation", { value: commandFailure.cancellation });
				const inspectionCancellation = commandFailure === undefined || commandFailure.preparationFailure !== undefined ? processInspectionCancellationError(cause, "ghidra:java") : undefined;
				const cleanups = retainOwnedCommandCleanup(cause, options.resourceOwner, "ghidra", "ghidra:java");
				let primary;
				if (interpreted !== undefined && !interpreted.ok) {
					if (cleanups.length === 0) return interpreted;
					primary = probeFailureError(interpreted.error, cause);
				} else if (commandFailure?.reason === "cancelled" && commandFailure.cancellation !== undefined) {
					primary = inspectionCancellation ?? cancelledBy("ghidra:java", carriedReason(commandFailure.cancellation.reason), {
						...output === undefined ? {} : { capturedOutput: output },
						...interpreted?.ok === true ? { diagnostics: { java_observation: jsonValueSchema.parse(interpreted.value) } } : {}
					});
				} else if (inspectionCancellation !== undefined) {
					primary = inspectionCancellation;
				} else if (interpreted?.ok === true && commandFailure?.cleanupOwner !== undefined) {
					primary = new ProviderAdapterError("ghidra", "ghidra:java", {
						cause,
						...output === undefined ? {} : { capturedOutput: output },
						diagnostics: {
							java_observation: jsonValueSchema.parse(interpreted.value),
							stage: "cleanup",
							...commandFailure.cancellation === undefined ? {} : { cancellation_observed: true }
						}
					});
				} else if (preparation !== undefined && commandFailure?.reason !== "timeout" && preparationHostCapacityFailure(cause) === undefined) {
					primary = new ProviderAdapterError("ghidra", "ghidra:java", {
						cause,
						...output === undefined ? {} : { capturedOutput: output },
						diagnostics: {
							stage: "ownership_preparation",
							...!(preparation instanceof DarwinProcessOwnershipInspectionError) || preparation.compilerOutcome === undefined ? {} : { compiler_outcome: jsonValueSchema.parse(preparation.compilerOutcome) }
						}
					});
				} else if (cause instanceof AnalysisError) {
					primary = cause;
				}
				const launch = preparationHostCapacityFailure(cause) ?? launcherFailureOf(commandFailure?.processError ?? cause);
				if (primary === undefined && (launch?.kind === "host-exhausted" || launch?.kind === "argument-list")) primary = classifyLaunchFailure(launch, {
					providerId: "ghidra",
					operation: "ghidra:java",
					fixedArguments: true,
					command,
					details: {
						cause,
						diagnostics: { java_executable: command }
					}
				});
				if (primary === undefined) {
					const code = commandFailure?.reason === "timeout" ? "ETIMEDOUT" : commandFailure?.reason === "output-limit" ? "ENOBUFS" : systemCode(commandFailure?.processError ?? cause);
					const failed = {
						_tag: "GhidraJavaProbeFailure",
						code: launch?.kind === "missing" ? "runtime_missing" : "runtime_unavailable",
						detail: `${command}: ${errorMessage(cause)}`,
						...code === undefined ? {} : { processErrorCode: code },
						...output === undefined ? {} : { output }
					};
					if (preparation !== undefined) Object.defineProperty(failed, "inspectionFailure", { value: preparation });
					if (commandFailure?.cancellation !== undefined) Object.defineProperty(failed, "cancellation", { value: commandFailure.cancellation });
					if (cleanups.length === 0) return err(failed);
					primary = probeFailureError(failed, cause);
				}
				for (const cleanup of cleanups) primary = analysisErrorWithCleanupDependencies(primary, cleanup, "ghidra:java");
				return err(bindProcessInspectionCancellations(cause, primary, "ghidra:java"));
			}
		};
		systemCode = (cause) => cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
		probeFailureError = (failure, cause) => {
			const { output, ...facts } = failure;
			return new ProviderAdapterError("ghidra", "ghidra:java", {
				cause,
				...output === undefined ? {} : { capturedOutput: output },
				diagnostics: {
					java_probe_failure: jsonValueSchema.parse(facts),
					...failure.cancellation === undefined ? {} : { cancellation_observed: true }
				}
			});
		};
		parseGhidraJavaOutput = (command, observed) => {
			if (observed.exitCode !== 0 || observed.signal !== null) return err({
				_tag: "GhidraJavaProbeFailure",
				code: "runtime_unavailable",
				detail: `${command}: Java exited ${String(observed.exitCode)}${observed.signal == null ? "" : ` (${observed.signal})`}`,
				output: capturedProbeOutput(observed)
			});
			const output = `${observed.stdout.text}\n${observed.stderr.text}`;
			const version = javaProperty(output, "java.version") || null;
			const home = javaProperty(output, "java.home") || null;
			const vmName = javaProperty(output, "java.vm.name");
			const osArch = javaProperty(output, "os.arch");
			const osName = javaProperty(output, "os.name");
			const reportedBits = javaProperty(output, "sun.arch.data.model");
			const parsedBits = reportedBits !== null && /^\d+$/.test(reportedBits) ? Number(reportedBits) : null;
			const bits = parsedBits !== null && Number.isSafeInteger(parsedBits) ? parsedBits : null;
			const major = version === null ? undefined : javaMajor(version);
			if (version === null || home === null || major === undefined) return err({
				_tag: "GhidraJavaProbeFailure",
				code: "version_unresolved",
				detail: `${command}: successful Java probe did not establish a valid java.version and nonempty java.home`,
				output: capturedProbeOutput(observed),
				properties: {
					version,
					home,
					vmName,
					osArch,
					osName,
					bits
				}
			});
			return ok({
				version,
				major,
				home,
				...vmName === null ? {} : { vmName },
				...osArch === null ? {} : { osArch },
				...osName === null ? {} : { osName },
				bits,
				...reportedBits === null || bits !== null ? {} : { unparsedBits: reportedBits },
				runtime: executablePath$1((HOST_PLATFORM.platform === "win32" ? win32 : posix).join(home, "bin", HOST_PLATFORM.platform === "win32" ? "javac.exe" : "javac")) ? "jdk" : "jre"
			});
		};
		javaProperty = (output, name) => new RegExp(`^[ \\t]*${name.replaceAll(".", "\\.")} = ([^\\r\\n]*)\\r?$`, "mu").exec(output)?.[1] ?? null;
		javaMajor = (version) => {
			const legacy = /^1\.([1-8])(?:\.[0-9]+)*(?:_[0-9]+)?(?:-[-a-zA-Z0-9.]+)?$/u.exec(version);
			if (legacy?.[1] !== undefined) return Number(legacy[1]);
			const modern = /^(?<number>[1-9][0-9]*(?:(?:\.0)*\.[1-9][0-9]*)*)(?:(?:-[a-zA-Z0-9]+)?\+(?<build>0|[1-9][0-9]*)(?:-[-a-zA-Z0-9.]+)?|-[a-zA-Z0-9]+(?:-[-a-zA-Z0-9.]+)?|\+-[-a-zA-Z0-9.]+)?$/u.exec(version);
			const number = modern?.groups?.number;
			if (number === undefined) return undefined;
			const parts = number.split(".").map(Number);
			const build = modern?.groups?.build;
			if ([...parts, ...build === undefined ? [] : [Number(build)]].some((value) => !Number.isSafeInteger(value) || value > 2147483647)) return undefined;
			return parts[0];
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraExecutableHeader.js
var GHIDRA_EXECUTABLE_HEADER_BYTES, readGhidraExecutableHeader;
function init_GhidraExecutableHeader() {
	return (init_GhidraExecutableHeader = __esmMin((() => {
		init_fixedAllowanceRemediation();
		init_classifyProviderFailure();
		init_result();
		init_analysisErrorCore();
		init_resources();
		init_readStableFileBytes();
		init_GhidraFileArtifacts();
		init_sha256Hex();
		GHIDRA_EXECUTABLE_HEADER_BYTES = 4096;
		readGhidraExecutableHeader = async (path, options) => {
			let completedHeader;
			try {
				return ok(await options.resourceOwner.run(() => withArtifactRegularFile(path, { retain: (resource) => options.resourceOwner.retain({ close: () => resource.lease.release() }, resource.resource) }, options.signal, async ({ handle: file }) => {
					const observed = await readStableFilePrefix(file, path, GHIDRA_EXECUTABLE_HEADER_BYTES, {
						symlinks: "follow",
						...options.signal === undefined ? {} : { signal: options.signal }
					});
					if (observed.size > BigInt(Number.MAX_SAFE_INTEGER)) throw new AnalysisResourceConstraintError("ghidra:installation", "file-size", "Executable extent cannot be represented exactly by the header parser", {
						maximum_bytes: Number.MAX_SAFE_INTEGER,
						observed_bytes: observed.size.toString()
					}, {
						diagnostics: {
							path,
							stage: "native_decompiler_header"
						},
						...fixedAllowanceOptions("The header parser's exactly representable executable extent", "parser", {
							limit: Number.MAX_SAFE_INTEGER,
							unit: "bytes"
						})
					});
					completedHeader = {
						bytes: observed.bytes,
						size: Number(observed.size)
					};
					return completedHeader;
				}, "follow")));
			} catch (cause) {
				return err(classifyProviderFailure(cause, ghidraFileDialect("ghidra:installation", {
					path,
					stage: "native_decompiler_header",
					...completedHeader === undefined ? {} : { completed_header: {
						file_bytes: completedHeader.size,
						examined_bytes: completedHeader.bytes.length,
						prefix_sha256: sha256Hex(completedHeader.bytes)
					} }
				})));
			}
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraReleasePolicy.js
var SUPPORTED_GHIDRA_VERSION, SUPPORTED_GHIDRA_JAVA_MAJOR, ADMITTED_GHIDRA_MINOR_FLOOR, GHIDRA_RELEASE_PATTERN, ghidraReleaseCompatibility, GHIDRA_CLANG_O0_SWITCH_DEFECT, GHIDRA_AARCH64_MASKED_BYTE_SWITCH_DEFECT, formatClosedSwitchDefect, formatOpenSwitchDefect, ghidraKnownProviderDefectLimitations, unverifiedGhidraBuildLimitation, ghidraReleaseLine, ghidraVersionDetail, ghidraReleaseAccepted, verifiedGhidraRelease, parseGhidraRelease, ghidraConfigurationVersion, parsedReleasePrecedes, ghidraKnownProviderDefects, integerGroup;
function init_GhidraReleasePolicy() {
	return (init_GhidraReleasePolicy = __esmMin((() => {
		SUPPORTED_GHIDRA_VERSION = "12.2";
		SUPPORTED_GHIDRA_JAVA_MAJOR = 25;
		ADMITTED_GHIDRA_MINOR_FLOOR = 2;
		GHIDRA_RELEASE_PATTERN = /^(\d+)\.(\d+)(?:\.(\d+))?([-+].*)?$/u;
		ghidraReleaseCompatibility = (raw) => {
			if (raw === null || raw === undefined) return {
				status: "unresolved",
				raw: null
			};
			const version = parseGhidraRelease(raw);
			if (version === undefined) return {
				status: "unresolved",
				raw
			};
			if (raw === "12.2") return {
				status: "verified",
				version,
				raw
			};
			const verified = verifiedGhidraRelease();
			return version.major === verified.major && version.minor >= 2 ? {
				status: "compatible",
				version,
				raw
			} : {
				status: "unsupported",
				version,
				raw
			};
		};
		GHIDRA_CLANG_O0_SWITCH_DEFECT = {
			kind: "known-provider-defect",
			id: "ghidra-9996",
			provider_id: "ghidra",
			release: "12.2",
			fixed_in: "12.2.1",
			fix_commit: "c93917a622211349998f641de54cfdbe0e0e5bee",
			scope: {
				compiler: "clang",
				architecture: "x86-64",
				optimization: "-O0",
				construct: "switch",
				case_base: "above-zero"
			},
			effect: "jump-table-flow-references-omitted",
			upstream_issue: "https://github.com/NationalSecurityAgency/ghidra/issues/9996"
		};
		GHIDRA_AARCH64_MASKED_BYTE_SWITCH_DEFECT = {
			kind: "known-provider-defect",
			id: "ghidra-10154",
			provider_id: "ghidra",
			release: "12.2",
			status: "open",
			scope: {
				architecture: "aarch64",
				optimization: "-O",
				construct: "switch",
				bound: "and-0xff",
				table: "byte-offset",
				source: "swift-enum"
			},
			effect: "jump-table-unrecovered-function-truncated",
			upstream_issue: "https://github.com/NationalSecurityAgency/ghidra/issues/10154"
		};
		formatClosedSwitchDefect = (defect) => `Known provider defect ${defect.id} (${defect.effect}): Ghidra ${defect.release} can omit jump-table flow references and emit incorrect decompiler output for ${defect.scope.compiler} ${defect.scope.optimization} ${defect.scope.architecture} switches whose case labels start above zero. Upstream issue ${defect.upstream_issue} is closed by ${defect.fix_commit}, milestone ${defect.fixed_in}, which is not yet released. This limitation is recorded for parsed ${defect.release} releases whose patch is below ${defect.fixed_in}, including a zero patch and a suffix, and clears on ${defect.fixed_in}. REA's verified switch lane compiles with -O2 and does not cover this shape.`;
		formatOpenSwitchDefect = (defect) => `Known provider defect ${defect.id} (${defect.effect}): Ghidra ${defect.release} leaves an ${defect.scope.architecture} ${defect.scope.construct} unrecovered when it is a ${defect.scope.table} bounded by ${defect.scope.bound}. The function body stops at the indirect branch. Upstream issue ${defect.upstream_issue} is ${defect.status} and names a Swift ${defect.scope.optimization} ${defect.scope.source} switch; it has no fix commit and no milestone. REA reproduced the unrecovered jump table on the exact ${defect.release} build with an AArch64 ELF object of that instruction shape. A compare-bounded byte table still recovers. This record stays on every admitted build until a release is known to clear it.`;
		ghidraKnownProviderDefectLimitations = (providerVersion) => ghidraKnownProviderDefects(providerVersion).map((defect) => defect.id === "ghidra-9996" ? formatClosedSwitchDefect(defect) : formatOpenSwitchDefect(defect));
		unverifiedGhidraBuildLimitation = (providerVersion) => {
			const compatibility = ghidraReleaseCompatibility(providerVersion);
			if (compatibility.status !== "compatible") return undefined;
			return `This session uses Ghidra ${providerVersion}. The bridge is verified against ${SUPPORTED_GHIDRA_VERSION}; other ${ghidraReleaseLine()} builds are accepted and the observed version is reported.`;
		};
		ghidraReleaseLine = () => {
			const verified = verifiedGhidraRelease();
			return `${String(verified.major)}.x (>=${String(verified.major)}.${String(2)})`;
		};
		ghidraVersionDetail = (raw) => {
			const compatibility = ghidraReleaseCompatibility(raw);
			switch (compatibility.status) {
				case "unresolved": return compatibility.raw ?? "unknown";
				case "verified": return compatibility.raw;
				case "compatible": return `${compatibility.raw}; compatible ${ghidraReleaseLine()} release (verified build ${SUPPORTED_GHIDRA_VERSION})`;
				case "unsupported": return `${compatibility.raw}; accepted releases are ${ghidraReleaseLine()} (verified build ${SUPPORTED_GHIDRA_VERSION})`;
				default: {
					const unreachable = compatibility;
					return unreachable;
				}
			}
		};
		ghidraReleaseAccepted = (raw) => {
			const status = ghidraReleaseCompatibility(raw).status;
			return status === "verified" || status === "compatible";
		};
		verifiedGhidraRelease = () => {
			const version = parseGhidraRelease(SUPPORTED_GHIDRA_VERSION);
			if (version === undefined || version.minor < 2) throw new TypeError(`SUPPORTED_GHIDRA_VERSION ${SUPPORTED_GHIDRA_VERSION} is not an admitted Ghidra release`);
			return version;
		};
		parseGhidraRelease = (raw) => {
			const match = GHIDRA_RELEASE_PATTERN.exec(raw);
			const major = integerGroup(match?.[1]);
			const minor = integerGroup(match?.[2]);
			if (match === null || major === undefined || minor === undefined) return undefined;
			const patch = match[3] === undefined ? 0 : integerGroup(match[3]);
			return patch === undefined ? undefined : {
				major,
				minor,
				patch,
				suffix: match[4] ?? ""
			};
		};
		ghidraConfigurationVersion = (raw) => {
			const version = parseGhidraRelease(raw);
			if (version === undefined || version.suffix.startsWith("+")) return undefined;
			const patch = version.patch === 0 ? "" : `.${String(version.patch)}`;
			const suffix = version.suffix === "-" ? "" : version.suffix;
			return `${String(version.major)}.${String(version.minor)}${patch}${suffix}`;
		};
		parsedReleasePrecedes = (version, boundary) => version.major < boundary.major || version.major === boundary.major && version.minor < boundary.minor || version.major === boundary.major && version.minor === boundary.minor && version.patch < boundary.patch;
		ghidraKnownProviderDefects = (providerVersion) => {
			const version = parseGhidraRelease(providerVersion);
			if (version === undefined) return [];
			const fix = parseGhidraRelease(GHIDRA_CLANG_O0_SWITCH_DEFECT.fixed_in);
			const defects = [];
			if (fix !== undefined && version.major === 12 && version.minor === 2 && parsedReleasePrecedes(version, fix)) defects.push(GHIDRA_CLANG_O0_SWITCH_DEFECT);
			if (ghidraReleaseAccepted(providerVersion)) defects.push(GHIDRA_AARCH64_MASKED_BYTE_SWITCH_DEFECT);
			return defects;
		};
		integerGroup = (value) => {
			if (value === undefined) return undefined;
			const parsed = Number(value);
			return Number.isSafeInteger(parsed) ? parsed : undefined;
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraInstallationPolicy.js
var ghidraApplicationProperties, ghidraJavaRequirement, ghidraJavaRangeLabel, ghidraJavaMajorAccepted, parseJavaBound, parseJavaMaximum, parseJavaInteger, javaDecimalDigit, unresolvedJavaRequirement;
function init_GhidraInstallationPolicy() {
	return (init_GhidraInstallationPolicy = __esmMin((() => {
		init_GhidraJavaProperties();
		init_GhidraReleasePolicy();
		ghidraApplicationProperties = (content) => {
			const parsed = parseGhidraJavaProperties(content);
			if (!parsed.ok) return {
				providerVersion: null,
				configurationDirectoryName: null,
				javaMinimum: {
					status: "unresolved",
					raw: parsed.error
				},
				javaMaximum: {
					status: "unresolved",
					raw: parsed.error
				},
				parseError: parsed.error
			};
			const providerVersion = parsed.value.get("application.version");
			const releaseName = parsed.value.get("application.release.name")?.replaceAll(/[ \t\n\r\f\v]/gu, "").toUpperCase();
			const configurationVersion = providerVersion === undefined ? undefined : ghidraConfigurationVersion(providerVersion);
			const configurationDirectoryName = providerVersion !== undefined && configurationVersion !== undefined && releaseName !== undefined && /^[A-Za-z0-9][A-Za-z0-9._+-]*$/u.test(providerVersion) && /^[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(releaseName) ? `ghidra_${configurationVersion}_${releaseName}` : null;
			const minimum = parsed.value.get("application.java.min");
			const maximum = parsed.value.get("application.java.max");
			return {
				providerVersion: providerVersion ?? null,
				configurationDirectoryName,
				javaMinimum: minimum === undefined ? { status: "absent" } : parseJavaBound(minimum),
				javaMaximum: parseJavaMaximum(maximum),
				parseError: null
			};
		};
		ghidraJavaRequirement = (properties) => {
			if (properties?.parseError !== null && properties?.parseError !== undefined) return unresolvedJavaRequirement(`application.properties parse failed: ${properties.parseError}`);
			if (properties === undefined) return unresolvedJavaRequirement("application.properties is unavailable");
			const minimum = properties.javaMinimum;
			const maximum = properties.javaMaximum;
			if (minimum.status === "unresolved") return unresolvedJavaRequirement(`application.java.min=${minimum.raw}`);
			if (minimum.status === "absent") return unresolvedJavaRequirement("application.java.min is missing");
			if (maximum.status === "unresolved") return unresolvedJavaRequirement(`application.java.max=${maximum.raw}`);
			const minimumMajor = minimum.major;
			const maximumMajor = maximum.status === "major" ? maximum.major : null;
			if (maximumMajor !== null && maximumMajor < minimumMajor) return unresolvedJavaRequirement(`application.java.max=${String(maximumMajor)} is below application.java.min=${String(minimumMajor)}`);
			return {
				minimumMajor,
				maximumMajor,
				unresolved: null
			};
		};
		ghidraJavaRangeLabel = (requirement) => {
			if (requirement.unresolved !== null) return "a 64-bit full JDK matching the installation's declared Java bounds";
			if (requirement.maximumMajor === null) return `a 64-bit full JDK ${String(requirement.minimumMajor)} or newer`;
			if (requirement.maximumMajor === requirement.minimumMajor) return `a 64-bit full JDK ${String(requirement.minimumMajor)}`;
			return `a 64-bit full JDK ${String(requirement.minimumMajor)} through ${String(requirement.maximumMajor)}`;
		};
		ghidraJavaMajorAccepted = (major, requirement) => requirement.unresolved === null && major >= requirement.minimumMajor && (requirement.maximumMajor === null || major <= requirement.maximumMajor);
		parseJavaBound = (raw) => {
			const major = parseJavaInteger(raw);
			return major === undefined ? {
				status: "unresolved",
				raw
			} : {
				status: "major",
				major
			};
		};
		parseJavaMaximum = (raw) => {
			if (raw === undefined || raw === "") return { status: "absent" };
			const bound = parseJavaBound(raw);
			return bound.status === "major" && bound.major === 0 ? { status: "absent" } : bound;
		};
		parseJavaInteger = (raw) => {
			let index = 0;
			let sign = 1;
			if (raw[index] === "+" || raw[index] === "-") {
				if (raw[index] === "-") sign = -1;
				index += 1;
			}
			if (index === raw.length) return undefined;
			const limit = sign < 0 ? 2147483648 : 2147483647;
			let value = 0;
			for (; index < raw.length; index += 1) {
				const character = raw[index];
				if (character === undefined) return undefined;
				const digit = javaDecimalDigit(character);
				if (digit === undefined) return undefined;
				if (value > Math.floor((limit - digit) / 10)) return undefined;
				value = value * 10 + digit;
			}
			return sign * value;
		};
		javaDecimalDigit = (character) => {
			const code = character.charCodeAt(0);
			if (code >= 48 && code <= 57) return code - 48;
			if (!/^\p{Decimal_Number}$/u.test(character)) return undefined;
			let blockStart = code;
			while (blockStart > 0 && /^\p{Decimal_Number}$/u.test(String.fromCharCode(blockStart - 1))) blockStart -= 1;
			return (code - blockStart) % 10;
		};
		unresolvedJavaRequirement = (unresolved) => ({ unresolved });
	})))();
}

//#endregion
//#region dist/ghidra/GhidraInstallationProperties.js
var MAX_GHIDRA_INSTALLATION_PROPERTIES_BYTES, readGhidraInstallationProperties;
function init_GhidraInstallationProperties() {
	return (init_GhidraInstallationProperties = __esmMin((() => {
		init_classifyProviderFailure();
		init_resources();
		init_jsonValue();
		init_readStableFileBytes();
		init_analysisErrorCore();
		init_fixedAllowanceRemediation();
		init_RegularFile();
		init_GhidraInstallationPolicy();
		init_GhidraFileArtifacts();
		init_sha256Hex();
		MAX_GHIDRA_INSTALLATION_PROPERTIES_BYTES = 1024 * 1024;
		readGhidraInstallationProperties = async (path, options) => {
			try {
				return await options.resourceOwner.run(() => withArtifactRegularFile(path, { retain: (resource) => options.resourceOwner.retain({ close: () => resource.lease.release() }, resource.resource) }, options.signal, async ({ handle: file }) => (await readStableFileBytes(file, path, MAX_GHIDRA_INSTALLATION_PROPERTIES_BYTES, {
					symlinks: "follow",
					...options.signal === undefined ? {} : { signal: options.signal }
				})).toString("latin1"), "follow"));
			} catch (cause) {
				const { cause: physical } = artifactFilePrimaryFacts(cause);
				if (!(cause instanceof ArtifactFileCleanupFailure) && physical instanceof Error && "code" in physical && "syscall" in physical && physical.syscall === "open" && (physical.code === "ENOENT" || physical.code === "ENOTDIR")) return undefined;
				const completed = artifactFileCompletion(cause)?.value;
				const diagnostics = {
					path,
					stage: "installation_properties",
					...physical instanceof NonRegularFileReadError ? { system_code: physical.code } : {},
					...typeof completed !== "string" ? {} : { completed_properties: {
						bytes: Buffer.byteLength(completed, "latin1"),
						sha256: sha256Hex(completed, "latin1"),
						properties: jsonValueSchema.parse(ghidraApplicationProperties(completed))
					} }
				};
				const qualified = mapArtifactFileFailure(cause, (primary) => primary instanceof RegularFileCapacityError ? new AnalysisResourceConstraintError("ghidra:installation", "file-size", primary.message, {
					maximum_bytes: primary.maximumBytes,
					observed_bytes: primary.observedBytes.toString()
				}, {
					cause: primary,
					diagnostics,
					...fixedProducerInputAllowance(MAX_GHIDRA_INSTALLATION_PROPERTIES_BYTES, "The Ghidra installation-properties read allowance")
				}) : primary);
				throw classifyProviderFailure(qualified, ghidraFileDialect("ghidra:installation", diagnostics));
			}
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraInstallation.js
var NATIVE_PLATFORMS, NATIVE_TOOL_FORMATS, NATIVE_ARCHITECTURES, assessNativeDecompiler, inspectGhidraInstallation, availableInstallation, installationCoordinates, installationChecks, configurationCheck, ghidraInstallationDiagnostics, ghidraJavaEnvironment, installationCheck, nativeDecompilerCheck, jvmOsNameMatchesPlatform, jvmOsArchNativeDirectory, versionCheck, javaCheck, javaRemediation, systemGhidraInstallationHost, discoverGhidraInstallationOnPath, stableGhidraInstallationRoot, stableJavaHome, executablePath;
function init_GhidraInstallation() {
	return (init_GhidraInstallation = __esmMin((() => {
		init_analysisErrorBase();
		init_HostPlatform();
		init_analysisErrorCore();
		init_GhidraJavaProbe();
		init_result();
		init_analysisErrorProjection();
		init_GhidraExecutableHeader();
		init_snapshotEnvironment();
		init_callerPath();
		init_executableSearch();
		init_GhidraInstallationProperties();
		init_binaryTarget();
		init_binaryTargetTypes();
		init_GhidraInstallationPolicy();
		init_GhidraReleasePolicy();
		NATIVE_PLATFORMS = {
			linux: {
				x64: "linux_x86_64",
				arm64: "linux_arm_64"
			},
			darwin: {
				x64: "mac_x86_64",
				arm64: "mac_arm_64"
			},
			win32: { x64: "win_x86_64" }
		};
		NATIVE_TOOL_FORMATS = {
			linux: "elf",
			darwin: "mach-o",
			win32: "pe"
		};
		NATIVE_ARCHITECTURES = [
			{
				node: "x64",
				binary: "x86_64"
			},
			{
				node: "ia32",
				binary: "x86"
			},
			{
				node: "arm",
				binary: "arm"
			},
			{
				node: "arm64",
				binary: "arm64"
			}
		];
		assessNativeDecompiler = (path, platform, architecture, probe) => {
			const expectedFormat = NATIVE_TOOL_FORMATS[platform];
			const expectedArchitecture = NATIVE_ARCHITECTURES.find(({ node }) => node === architecture)?.binary;
			if (expectedFormat === undefined || expectedArchitecture === undefined) return {
				status: "unknown",
				detail: `${path} is executable, but no native tool format is defined for ${platform}/${architecture}`
			};
			const parsed = probe === undefined ? undefined : parseExecutableHeader(probe.bytes, architecture, probe.size);
			const families = probe !== undefined && parsed !== undefined && !parsed.ok ? readFatArchitectureFamilies(probe.bytes, probe.size) : null;
			const header = parsed?.ok ? parsed.value : families?.ok && !families.value.some((family) => family === expectedArchitecture) ? {
				format: "mach-o-universal",
				architecture: families.value.join("/") || "no supported architecture"
			} : undefined;
			if (header === undefined) return {
				status: "unknown",
				detail: `${path} is executable, but its executable format for ${platform}/${architecture} could not be established`
			};
			const observed = `${header.format} ${header.architecture}`;
			const expected = `${expectedFormat} ${expectedArchitecture}`;
			const formatMatches = isMachOFormat(expectedFormat) ? isMachOFormat(header.format) : header.format === expectedFormat;
			if (formatMatches && header.architecture === expectedArchitecture) return {
				status: "compatible",
				detail: `${path} reports ${observed}, which matches ${platform}/${architecture}`
			};
			const nativeDirectory = NATIVE_PLATFORMS[platform]?.[architecture];
			const executable = platform === "win32" ? "decompile.exe" : "decompile";
			return {
				status: "incompatible",
				detail: `${path} reports ${observed}, but ${platform}/${architecture} requires ${expected}`,
				remediation: `Provide an executable Ghidra/Features/Decompiler/os/${nativeDirectory ?? "<platform>"}/${executable} built for ${expected}, or its build/os equivalent. REA does not build or install native tools.`
			};
		};
		inspectGhidraInstallation = async (options, host = systemGhidraInstallationHost()) => {
			if (options.signal?.aborted) throw cancelledBy("ghidra:installation", options.signal);
			const platform = options.platform ?? HOST_PLATFORM.platform;
			const architecture = options.architecture ?? HOST_PLATFORM.architecture;
			const coordinates = await installationCoordinates(options, platform, architecture, host);
			const checks = installationChecks({
				coordinates,
				platform,
				architecture,
				javaHome: options.javaHome,
				host
			});
			const failed = checks.find((check) => check.status === "failed");
			const javaObservation = coordinates.java ?? coordinates.javaProbeFailure?.properties;
			const observation = {
				platform,
				architecture,
				applicationPropertiesPath: coordinates.applicationPropertiesPath,
				configurationDirectoryName: coordinates.properties?.configurationDirectoryName ?? null,
				nativeDecompilerPath: coordinates.nativeDecompilerPath,
				...coordinates.nativeDecompilerHeader.ok ? {} : { nativeDecompilerHeaderFailure: coordinates.nativeDecompilerHeader.error },
				...coordinates.javaDiscoveryFailures === undefined ? {} : { javaDiscoveryFailures: coordinates.javaDiscoveryFailures },
				javaCommand: coordinates.javaCommand,
				...coordinates.javaProbeFailure === undefined ? {} : { javaProbeFailure: coordinates.javaProbeFailure },
				...javaObservation?.vmName == null ? {} : { javaVmName: javaObservation.vmName },
				...javaObservation?.osArch == null ? {} : { javaOsArch: javaObservation.osArch },
				...javaObservation?.osName == null ? {} : { javaOsName: javaObservation.osName },
				checks
			};
			if (failed !== undefined) return {
				status: "unavailable",
				...observation,
				installDir: coordinates.installDir,
				analyzeHeadlessPath: coordinates.analyzeHeadlessPath,
				providerVersion: coordinates.properties?.providerVersion ?? null,
				javaHome: javaObservation?.home ?? options.javaHome ?? null,
				javaVersion: javaObservation?.version ?? null,
				rejection: {
					code: failed.code,
					reason: failed.remediation,
					remediation: failed.remediation
				}
			};
			if (options.signal?.aborted) throw cancelledBy("ghidra:installation", options.signal, { diagnostics: ghidraInstallationDiagnostics(availableInstallation(coordinates, observation, options.javaHome)) });
			return availableInstallation(coordinates, observation, options.javaHome);
		};
		availableInstallation = (coordinates, observation, selectedJavaHome) => {
			const providerVersion = coordinates.properties?.providerVersion;
			if (coordinates.installDir === null || coordinates.applicationPropertiesPath === null || coordinates.analyzeHeadlessPath === null || providerVersion === null || providerVersion === undefined || coordinates.java === undefined) throw new TypeError("Passing Ghidra installation checks produced incomplete coordinates");
			return {
				status: "available",
				...observation,
				installDir: coordinates.installDir,
				analyzeHeadlessPath: coordinates.analyzeHeadlessPath,
				applicationPropertiesPath: coordinates.applicationPropertiesPath,
				providerVersion,
				javaHome: stableJavaHome(coordinates.java.home, selectedJavaHome, observation.platform),
				javaVersion: coordinates.java.version
			};
		};
		installationCoordinates = async (options, platform, architecture, host) => {
			const path = platform === "win32" ? win32 : posix;
			const installDir = options.installDir ?? host.discoverInstallDirOnPath?.(options.environment, platform) ?? null;
			const applicationPropertiesPath = installDir === null ? null : appendCallerPath(installDir, "Ghidra/application.properties", platform);
			const analyzeHeadlessPath = installDir === null ? null : appendCallerPath(installDir, `support/${platform === "win32" ? "analyzeHeadless.bat" : "analyzeHeadless"}`, platform);
			const decompilerPlatform = NATIVE_PLATFORMS[platform]?.[architecture];
			const decompilerExecutable = platform === "win32" ? "decompile.exe" : "decompile";
			const nativeDecompilerPath = installDir === null || decompilerPlatform === undefined ? null : [appendCallerPath(installDir, `Ghidra/Features/Decompiler/os/${decompilerPlatform}/${decompilerExecutable}`, platform), appendCallerPath(installDir, `Ghidra/Features/Decompiler/build/os/${decompilerPlatform}/${decompilerExecutable}`, platform)].find((candidate) => host.executable(candidate)) ?? null;
			const properties = applicationPropertiesPath === null ? undefined : await host.readText(applicationPropertiesPath, {
				resourceOwner: options.resourceOwner,
				...options.signal === undefined ? {} : { signal: options.signal }
			});
			const nativeDecompilerHeader = nativeDecompilerPath === null || host.executableHeader === undefined ? ok(undefined) : await host.executableHeader(nativeDecompilerPath, {
				resourceOwner: options.resourceOwner,
				...options.signal === undefined ? {} : { signal: options.signal }
			});
			if (!nativeDecompilerHeader.ok && (nativeDecompilerHeader.error instanceof AnalysisCancelledError || nativeDecompilerHeader.error.cleanupIncomplete)) throw nativeDecompilerHeader.error;
			const parsedProperties = properties === undefined ? undefined : ghidraApplicationProperties(properties);
			const javaRequirement = ghidraJavaRequirement(parsedProperties);
			const homebrewJavaCandidates = () => (architecture === "arm64" ? ["/opt/homebrew", "/usr/local"] : ["/usr/local", "/opt/homebrew"]).flatMap((prefix) => {
				const opt = path.join(prefix, "opt");
				const versioned = (host.directoryEntries?.(opt) ?? []).filter((name) => /^openjdk@[1-9][0-9]*$/u.test(name)).map((name) => ({
					name,
					major: Number(name.slice("openjdk@".length))
				})).filter(({ major }) => Number.isSafeInteger(major) && ghidraJavaMajorAccepted(major, javaRequirement)).sort((left, right) => left.major - right.major).map(({ name }) => name);
				return ["openjdk", ...versioned].map((formula) => path.join(opt, formula, "libexec/openjdk.jdk/Contents/Home/bin/java"));
			}).filter((candidate) => host.executable(candidate));
			const selectedJava = (() => {
				if (options.javaHome !== undefined) return {
					source: "configured",
					command: appendCallerPath(options.javaHome, `bin/${platform === "win32" ? "java.exe" : "java"}`, platform)
				};
				if (platform !== "darwin") return {
					source: "default",
					command: platform === "win32" ? "java.exe" : "java"
				};
				for (const { path: javaOnPath } of posixPathCandidates("java", options.environment.PATH ?? "", { relativeEntries: "skip" })) if (host.executable(javaOnPath)) return {
					source: "path",
					command: javaOnPath
				};
				const homebrew = homebrewJavaCandidates()[0];
				return homebrew === undefined ? {
					source: "default",
					command: "/usr/bin/java"
				} : {
					source: "homebrew",
					command: homebrew
				};
			})();
			let javaCommand = selectedJava.command;
			let javaProbe = installDir !== null && properties !== undefined && (options.javaHome === undefined || path.isAbsolute(options.javaHome)) ? await host.probeJava(javaCommand, ghidraJavaEnvironment(options.javaHome, options.environment, platform), {
				resourceOwner: options.resourceOwner,
				...options.signal === undefined ? {} : { signal: options.signal }
			}) : undefined;
			if (javaProbe !== undefined && !javaProbe.ok && javaProbe.error instanceof AnalysisError) throw javaProbe.error;
			const javaDiscoveryFailures = [];
			if (platform === "darwin" && options.javaHome === undefined && selectedJava.source !== "configured" && javaProbe !== undefined && !javaProbe.ok && !(javaProbe.error instanceof AnalysisError) && javaProbe.error.code !== "version_unresolved" && javaProbe.error.cancellation === undefined && !options.signal?.aborted) {
				javaDiscoveryFailures.push({
					command: javaCommand,
					failure: javaProbe.error
				});
				for (const candidate of homebrewJavaCandidates()) {
					if (candidate === selectedJava.command) continue;
					const fallback = await host.probeJava(candidate, ghidraJavaEnvironment(undefined, options.environment, platform), {
						resourceOwner: options.resourceOwner,
						...options.signal === undefined ? {} : { signal: options.signal }
					});
					if (fallback.ok) {
						javaCommand = candidate;
						javaProbe = fallback;
						break;
					}
					const failure = fallback.error;
					if (failure instanceof AnalysisError) throw failure;
					javaDiscoveryFailures.push({
						command: candidate,
						failure
					});
					if (failure.cancellation !== undefined || options.signal?.aborted) {
						javaCommand = candidate;
						javaProbe = fallback;
						break;
					}
				}
			}
			return {
				installDir,
				applicationPropertiesPath,
				analyzeHeadlessPath,
				nativeDecompilerPath,
				nativeDecompilerHeader,
				properties: parsedProperties,
				...javaDiscoveryFailures.length === 0 ? {} : { javaDiscoveryFailures },
				javaCommand,
				java: javaProbe?.ok === true ? javaProbe.value : undefined,
				javaProbeFailure: javaProbe !== undefined && !javaProbe.ok && !(javaProbe.error instanceof AnalysisError) ? javaProbe.error : undefined
			};
		};
		installationChecks = ({ coordinates, platform, architecture, javaHome, host }) => [
			configurationCheck(coordinates.installDir, javaHome, platform),
			installationCheck({
				name: "platform",
				passed: NATIVE_PLATFORMS[platform] !== undefined,
				code: "unsupported_host",
				detail: platform,
				remediation: "Use Linux or macOS x64/arm64, or Windows x64 with matching native Ghidra tools."
			}),
			installationCheck({
				name: "architecture",
				passed: NATIVE_PLATFORMS[platform]?.[architecture] !== undefined,
				code: "unsupported_host",
				detail: architecture,
				remediation: "Use x64/arm64 on Linux or macOS, or x64 on Windows."
			}),
			installationCheck({
				name: "installation",
				passed: coordinates.properties !== undefined,
				code: "executable_missing",
				detail: coordinates.applicationPropertiesPath ?? "Ghidra application properties unavailable",
				remediation: "Point GHIDRA_INSTALL_DIR at the root of an extracted official Ghidra release."
			}),
			versionCheck(coordinates.properties),
			installationCheck({
				name: "headless",
				passed: coordinates.analyzeHeadlessPath !== null && host.executable(coordinates.analyzeHeadlessPath),
				code: "executable_missing",
				detail: coordinates.analyzeHeadlessPath ?? "analyzeHeadless unavailable",
				remediation: "Restore support/analyzeHeadless or support/analyzeHeadless.bat from the official Ghidra release."
			}),
			nativeDecompilerCheck({
				coordinates,
				platform,
				architecture
			}),
			javaCheck(coordinates.java, coordinates.javaCommand, javaHome, coordinates.properties, platform, coordinates.javaProbeFailure)
		];
		configurationCheck = (installDir, javaHome, platform) => {
			const { isAbsolute } = platform === "win32" ? win32 : posix;
			const relative = [...installDir !== null && !isAbsolute(installDir) ? ["GHIDRA_INSTALL_DIR"] : [], ...javaHome !== undefined && !isAbsolute(javaHome) ? ["JAVA_HOME"] : []];
			if (installDir === null || relative.length === 0) return installationCheck({
				name: "configuration",
				passed: installDir !== null,
				code: "not_configured",
				detail: installDir ?? "GHIDRA_INSTALL_DIR is not set",
				remediation: `Set GHIDRA_INSTALL_DIR to an extracted Ghidra ${ghidraReleaseLine()} release directory.`
			});
			const settings = relative.join(" and ");
			return installationCheck({
				name: "configuration",
				passed: false,
				code: "not_configured",
				detail: `${settings} must be absolute`,
				remediation: `Set ${settings} to ${relative.length === 1 ? "an absolute path" : "absolute paths"}. REA's analysis and MCP server reject relative paths even when they resolve from the current directory.`
			});
		};
		ghidraInstallationDiagnostics = (inspection) => ({
			install_dir: inspection.installDir,
			analyze_headless_path: inspection.analyzeHeadlessPath,
			native_decompiler_path: inspection.nativeDecompilerPath,
			...inspection.nativeDecompilerHeaderFailure === undefined ? {} : { native_decompiler_header_failure: projectAnalysisError(inspection.nativeDecompilerHeaderFailure) },
			application_properties_path: inspection.applicationPropertiesPath,
			provider_version: inspection.providerVersion,
			java_command: inspection.javaCommand,
			...inspection.javaProbeFailure === undefined ? {} : { java_probe_failure: {
				code: inspection.javaProbeFailure.code,
				...inspection.javaProbeFailure.processErrorCode === undefined ? {} : { process_error_code: inspection.javaProbeFailure.processErrorCode },
				detail: inspection.javaProbeFailure.detail,
				...inspection.javaProbeFailure.cancellation === undefined ? {} : { cancellation_observed: true },
				...inspection.javaProbeFailure.properties === undefined ? {} : { properties: { ...inspection.javaProbeFailure.properties } },
				...inspection.javaProbeFailure.output === undefined ? {} : { output: { ...inspection.javaProbeFailure.output } }
			} },
			...inspection.javaDiscoveryFailures === undefined ? {} : { java_discovery_failures: inspection.javaDiscoveryFailures.map(({ command, failure }) => ({
				command,
				code: failure.code,
				detail: failure.detail,
				...failure.output === undefined ? {} : { output: { ...failure.output } },
				...failure.properties === undefined ? {} : { properties: { ...failure.properties } },
				...failure.cancellation === undefined ? {} : { cancellation_observed: true }
			})) },
			java_home: inspection.javaHome,
			java_version: inspection.javaVersion,
			java_vm_name: inspection.javaVmName ?? null,
			java_os_arch: inspection.javaOsArch ?? null,
			java_os_name: inspection.javaOsName ?? null,
			platform: inspection.platform,
			architecture: inspection.architecture,
			checks: inspection.checks.map((check) => ({
				name: check.name,
				ok: check.status === "passed",
				code: check.status === "failed" ? check.code : null,
				detail: check.detail
			}))
		});
		ghidraJavaEnvironment = (javaHome, environment, platform) => {
			const selectedEnvironment = snapshotEnvironment(environment, platform);
			const boundedEnvironment = {
				...selectedEnvironment,
				_JAVA_OPTIONS: "",
				JAVA_TOOL_OPTIONS: "",
				JDK_JAVA_OPTIONS: "",
				GHIDRA_JAVA_OPTIONS: ""
			};
			return javaHome === undefined ? boundedEnvironment : {
				...boundedEnvironment,
				JAVA_HOME: javaHome,
				PATH: `${appendCallerPath(javaHome, "bin", platform)}${platform === "win32" ? win32.delimiter : posix.delimiter}${selectedEnvironment.PATH ?? ""}`
			};
		};
		installationCheck = (options) => options.passed ? {
			status: "passed",
			name: options.name,
			detail: options.detail
		} : {
			status: "failed",
			name: options.name,
			code: options.code,
			detail: options.detail,
			remediation: options.remediation
		};
		nativeDecompilerCheck = ({ coordinates, platform, architecture }) => {
			const path = coordinates.nativeDecompilerPath;
			const compatibility = path === null ? undefined : !coordinates.nativeDecompilerHeader.ok ? {
				status: "unknown",
				detail: `${path} header is unknown: ${coordinates.nativeDecompilerHeader.error.message}`
			} : assessNativeDecompiler(path, platform, architecture, coordinates.nativeDecompilerHeader.value);
			const osArch = coordinates.java?.osArch ?? coordinates.javaProbeFailure?.properties?.osArch ?? undefined;
			const osName = coordinates.java?.osName ?? coordinates.javaProbeFailure?.properties?.osName ?? undefined;
			const selectedDirectory = jvmOsArchNativeDirectory(platform, osArch);
			const validatedDirectory = NATIVE_PLATFORMS[platform]?.[architecture];
			if (coordinates.java !== undefined) {
				if (selectedDirectory === undefined) return installationCheck({
					name: "native_decompiler",
					passed: false,
					code: "executable_missing",
					detail: osArch === undefined ? "The Java probe did not report os.arch; the JVM-selected native decompiler directory is unknown and cannot be matched to the validated host directory" : `JVM reports unrecognized os.arch=${osArch}; its selected native decompiler directory is unknown and cannot be matched to the validated host directory`,
					remediation: `Point JAVA_HOME at a JDK whose reported architecture maps to the validated Ghidra decompiler (${validatedDirectory ?? "unsupported host"}). REA does not build or install native tools.`
				});
				if (validatedDirectory !== undefined && selectedDirectory !== validatedDirectory && path !== null) return installationCheck({
					name: "native_decompiler",
					passed: false,
					code: "executable_missing",
					detail: `JVM reports os.arch=${osArch}, so Ghidra selects its native decompiler from os/${selectedDirectory}, but the validated decompiler targets ${validatedDirectory} (host ${platform}/${architecture})`,
					remediation: `Point JAVA_HOME at a JDK whose architecture matches the built decompiler (${validatedDirectory}). REA does not build or install native tools.`
				});
				if (osName === undefined) return installationCheck({
					name: "native_decompiler",
					passed: false,
					code: "executable_missing",
					detail: "The Java probe did not report os.name; the JVM-selected native decompiler OS directory is unknown and cannot be matched to the validated host platform",
					remediation: `Point JAVA_HOME at a JDK whose reported operating system matches the host platform (${platform}). REA does not build or install native tools.`
				});
				if (!jvmOsNameMatchesPlatform(platform, osName) && path !== null) return installationCheck({
					name: "native_decompiler",
					passed: false,
					code: "executable_missing",
					detail: `JVM reports os.name=${osName}, which does not match the validated host platform ${platform} (host ${platform}/${architecture})`,
					remediation: `Point JAVA_HOME at a JDK whose reported operating system matches the host platform (${platform}). REA does not build or install native tools.`
				});
			}
			return installationCheck({
				name: "native_decompiler",
				passed: path !== null && compatibility?.status !== "incompatible",
				code: "executable_missing",
				detail: compatibility?.detail ?? `Matching native decompiler for ${platform}/${architecture} was not found`,
				remediation: compatibility?.status === "incompatible" ? compatibility.remediation : `Provide an executable Ghidra/Features/Decompiler/os/${NATIVE_PLATFORMS[platform]?.[architecture] ?? "<platform>"}/${platform === "win32" ? "decompile.exe" : "decompile"}, or its build/os equivalent. REA does not build or install native tools.`
			});
		};
		jvmOsNameMatchesPlatform = (platform, osName) => {
			const normalized = osName.toLowerCase();
			if (platform === "win32") return normalized.startsWith("windows");
			if (platform === "darwin") return normalized.startsWith("mac") || normalized.startsWith("darwin");
			if (platform === "linux") return normalized.startsWith("linux");
			return false;
		};
		jvmOsArchNativeDirectory = (platform, osArch) => {
			if (osArch === undefined) return undefined;
			const normalized = osArch.toLowerCase();
			const node = normalized === "x86_64" || normalized === "amd64" || normalized === "x64" ? "x64" : normalized === "aarch64" || normalized === "arm64" ? "arm64" : undefined;
			return node === undefined ? undefined : NATIVE_PLATFORMS[platform]?.[node];
		};
		versionCheck = (properties) => {
			const raw = properties?.providerVersion;
			const parseError = properties?.parseError;
			return installationCheck({
				name: "version",
				passed: parseError == null && ghidraReleaseAccepted(raw),
				code: parseError != null ? "version_unresolved" : ghidraReleaseCompatibility(raw).status === "unsupported" ? "unsupported_version" : "version_unresolved",
				detail: parseError == null ? ghidraVersionDetail(raw) : `application.properties could not be parsed: ${parseError}`,
				remediation: `Install a Ghidra ${ghidraReleaseLine()} release (verified with ${SUPPORTED_GHIDRA_VERSION}), or update REA for another Ghidra line.`
			});
		};
		javaCheck = (observation, command, configuredHome, properties, platform, failure) => {
			const requirement = ghidraJavaRequirement(properties);
			const range = ghidraJavaRangeLabel(requirement);
			const supported = observation !== undefined && ghidraJavaMajorAccepted(observation.major, requirement) && observation.bits === 64 && observation.runtime === "jdk";
			const bitness = observation === undefined ? undefined : observation.bits === null ? `bitness unknown${observation.unparsedBits === undefined ? "" : ` (sun.arch.data.model = ${JSON.stringify(observation.unparsedBits)})`}` : `${String(observation.bits)}-bit`;
			const knownMismatch = observation !== undefined && (!ghidraJavaMajorAccepted(observation.major, requirement) || observation.bits !== null && observation.bits !== 64 || observation.runtime !== "jdk");
			const detail = observation === undefined ? requirement.unresolved === null ? failure?.detail ?? `${command}: Java probe was not attempted` : `${failure?.detail ?? command}; ${requirement.unresolved}` : `${observation.version}; ${bitness}; ${observation.runtime === "jdk" ? "JDK" : "runtime only"}; ${observation.home}; accepted ${range}`;
			return installationCheck({
				name: "java",
				passed: supported,
				code: requirement.unresolved !== null ? "version_unresolved" : observation === undefined ? failure?.code ?? "version_unresolved" : knownMismatch ? "unsupported_version" : "version_unresolved",
				detail,
				remediation: javaRemediation(requirement, configuredHome, range, platform)
			});
		};
		javaRemediation = (requirement, configuredHome, range, platform) => {
			if (requirement.unresolved !== null) return `The Ghidra installation's Java bounds could not be read (${requirement.unresolved}). Install a 64-bit full JDK inside the declared application.java.min and application.java.max.`;
			return configuredHome === undefined ? `Select ${range} on PATH, or set JAVA_HOME to its installation root before starting REA.${platform === "darwin" ? " Homebrew OpenJDK can be keg-only: set JAVA_HOME to the selected formula's libexec/openjdk.jdk/Contents/Home (for example /opt/homebrew/opt/openjdk/libexec/openjdk.jdk/Contents/Home or /usr/local/opt/openjdk/libexec/openjdk.jdk/Contents/Home). The installed JDK must satisfy the declared Ghidra Java bounds." : ""}` : `Update JAVA_HOME to the root of ${range} installation.`;
		};
		systemGhidraInstallationHost = () => ({
			readText: readGhidraInstallationProperties,
			directoryEntries(path) {
				try {
					return readdirSync(path);
				} catch {
					return [];
				}
			},
			executableHeader: readGhidraExecutableHeader,
			executable(path) {
				try {
					accessSync(path, constants.X_OK);
					return statSync(path).isFile();
				} catch (cause) {
					void cause;
					return false;
				}
			},
			probeJava: probeGhidraJava,
			discoverInstallDirOnPath: discoverGhidraInstallationOnPath
		});
		discoverGhidraInstallationOnPath = (environment, platform) => {
			if (platform !== HOST_PLATFORM.platform) return undefined;
			const path = platform === "win32" ? win32 : posix;
			if (platform !== "win32" && environment.PATH === undefined) return undefined;
			const windowsSearch = platform === "win32" ? windowsPathCandidates([
				"ghidra.bat",
				"ghidraRun.bat",
				"ghidra.exe",
				"ghidraRun.exe"
			], environment, { allowBatch: true }) : undefined;
			const candidates = windowsSearch === undefined ? posixPathCandidates(["ghidra", "ghidraRun"], environment.PATH ?? "", { relativeEntries: "resolve" }) : windowsSearch.ok ? windowsSearch.value : [];
			for (const { path: candidate } of candidates) {
				let resolved;
				try {
					if (!executablePath(candidate)) continue;
					resolved = realpathSync.native(candidate);
				} catch (cause) {
					void cause;
					continue;
				}
				const root = dirname(resolved);
				const properties = path.join(root, "Ghidra", "application.properties");
				const headless = path.join(root, "support", platform === "win32" ? "analyzeHeadless.bat" : "analyzeHeadless");
				try {
					if (statSync(properties).isFile() && executablePath(headless)) return stableGhidraInstallationRoot(root, platform);
				} catch (cause) {
					void cause;
				}
			}
			return undefined;
		};
		stableGhidraInstallationRoot = (root, platform) => {
			if (platform !== "darwin") return root;
			const parsed = posix.parse(root);
			const segments = root.slice(parsed.root.length).split(posix.sep);
			const cellarIndex = segments.length - 4;
			const formula = segments[cellarIndex + 1];
			const version = segments[cellarIndex + 2];
			if (cellarIndex < 0 || segments[cellarIndex] !== "Cellar" || formula === undefined || formula.length === 0 || version === undefined || version.length === 0 || segments[cellarIndex + 3] !== "libexec") return root;
			const prefix = posix.join(parsed.root, ...segments.slice(0, cellarIndex));
			const candidate = posix.join(prefix, "opt", formula, "libexec");
			try {
				return realpathSync.native(candidate) === root ? candidate : root;
			} catch (cause) {
				void cause;
				return root;
			}
		};
		stableJavaHome = (observedHome, selectedHome, platform) => {
			if (platform !== HOST_PLATFORM.platform) return observedHome;
			const sameHome = (candidate) => {
				try {
					return realpathSync.native(candidate) === realpathSync.native(observedHome);
				} catch (cause) {
					void cause;
					return false;
				}
			};
			if (selectedHome !== undefined) return sameHome(selectedHome) ? selectedHome : observedHome;
			if (platform !== "darwin") return observedHome;
			const parsed = posix.parse(observedHome);
			const segments = observedHome.slice(parsed.root.length).split(posix.sep);
			const cellarIndex = segments.length - 7;
			const formula = segments[cellarIndex + 1];
			const version = segments[cellarIndex + 2];
			if (cellarIndex < 0 || segments[cellarIndex] !== "Cellar" || formula === undefined || formula.length === 0 || version === undefined || version.length === 0 || segments.slice(cellarIndex + 3).join("/") !== "libexec/openjdk.jdk/Contents/Home") return observedHome;
			const prefix = posix.join(parsed.root, ...segments.slice(0, cellarIndex));
			const candidate = posix.join(prefix, "opt", formula, "libexec/openjdk.jdk/Contents/Home");
			return sameHome(candidate) ? candidate : observedHome;
		};
		executablePath = (path) => {
			try {
				accessSync(path, constants.X_OK);
				return statSync(path).isFile();
			} catch (cause) {
				void cause;
				return false;
			}
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraSessionRoot.js
var hasDotPrefixElement, nearestSafeAncestor, ghidraSessionRoot;
function init_GhidraSessionRoot() {
	return (init_GhidraSessionRoot = __esmMin((() => {
		init_HostPlatform();
		hasDotPrefixElement = (directory) => resolve(directory).split(sep).some((element) => element.startsWith("."));
		nearestSafeAncestor = (directory) => {
			let current = resolve(directory);
			for (;;) {
				if (!hasDotPrefixElement(current)) return current;
				const parent = dirname(current);
				if (parent === current) return undefined;
				current = parent;
			}
		};
		ghidraSessionRoot = (options = {}) => {
			const base = resolve(options.base ?? tmpdir());
			if (!hasDotPrefixElement(base)) return base;
			const platform = options.platform ?? HOST_PLATFORM.platform;
			const fallback = options.fallback ?? (platform === "win32" ? undefined : "/tmp");
			if (fallback !== undefined && isAbsolute(fallback) && !hasDotPrefixElement(fallback)) return resolve(fallback);
			return nearestSafeAncestor(base) ?? base;
		};
	})))();
}

//#endregion
//#region dist/ghidra/GhidraTemporaryDirectory.js
var GHIDRA_RESTRICTED_TEMP_REMEDIATION, writeProbe, errorCode, probeGhidraTemporaryDirectory;
function init_GhidraTemporaryDirectory() {
	return (init_GhidraTemporaryDirectory = __esmMin((() => {
		init_resources();
		init_GhidraSessionRoot();
		init_errorMessage();
		GHIDRA_RESTRICTED_TEMP_REMEDIATION = "REA places each Ghidra session's private runtime under the Ghidra session root: os.tmpdir(), which follows TMP/TEMP on Windows, or, when that path has a dot-prefixed element that Ghidra rejects, its nearest ancestor without one. On a restricted or sandboxed host that denies child-process writes outside an allowed tree, set TMP and TEMP to a directory inside that allowed tree whose path has no dot-prefixed element, in the environment that starts REA (your shell or the MCP client's registration), restart REA, and retry. Ghidra's LaunchSupport rewrites java_home.save, so creating that file in advance does not help.";
		writeProbe = async (path, resourceOwner) => {
			const resources = new ArtifactResourceScope();
			try {
				await withArtifactFileHandle(path, await open(path, "wx", 384), resources, undefined, (handle) => handle.writeFile("rea doctor probe\n"));
			} finally {
				if (resources.hasPending) resourceOwner.retain({
					close: () => resources.close(),
					cleanupResources: [path]
				}, path);
			}
		};
		errorCode = (cause) => cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
		probeGhidraTemporaryDirectory = async (resourceOwner) => {
			const directory = ghidraSessionRoot();
			const path = join(directory, `rea-doctor-probe-${randomUUID()}`);
			const remove = () => unlink(path).catch((cause) => {
				if (errorCode(cause) !== "ENOENT") throw cause;
			});
			const retain = () => resourceOwner.retain({
				close: remove,
				cleanupResources: [path]
			}, path);
			try {
				await writeProbe(path, resourceOwner);
			} catch (cause) {
				const cleanupOnly = cause instanceof ArtifactFileCleanupFailure && cause.fileCleanupFailure.outcome.kind === "completed";
				const primary = cleanupOnly ? cause.fileCleanupFailure.cleanupCause : artifactFilePrimaryFacts(cause).cause;
				const stage = cleanupOnly ? "cleanup" : "write";
				const removed = await remove().then(() => true, () => false);
				if (!removed) retain();
				return {
					ok: false,
					directory,
					stage,
					code: errorCode(primary),
					message: errorMessage(primary),
					...removed ? {} : { retainedPath: path }
				};
			}
			try {
				await unlink(path);
			} catch (cause) {
				retain();
				return {
					ok: false,
					directory,
					stage: "cleanup",
					code: errorCode(cause),
					message: errorMessage(cause),
					retainedPath: path
				};
			}
			return {
				ok: true,
				directory
			};
		};
	})))();
}

//#endregion
//#region dist/ida/IdaConfiguration.js
var DEFAULT_IDA_REQUEST_TIMEOUT_MS, MIN_IDA_REQUEST_TIMEOUT_MS, LOCAL_IDA_HTTP_HOSTS, common, LEGACY_PROTOCOL_REMOVED, registrationSchema, registrationConstraint, IDA_COMPATIBILITY_PROFILES, idaCompatibilityProfile, readIdaConfiguration, MAXIMUM_REGISTRATION_BYTES, registrationTooLarge, idaRegistrationTimeoutGuidance, idaConfigurationError;
function init_IdaConfiguration() {
	return (init_IdaConfiguration = __esmMin((() => {
		init_analysisResourceLimits();
		init_jsonRecord();
		init_resources();
		init_configurationErrors();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_result();
		init_OwnedRegularFile();
		init_RegularFile();
		init_BoundedFileBytes();
		init_errorMessage();
		DEFAULT_IDA_REQUEST_TIMEOUT_MS = 3e5;
		MIN_IDA_REQUEST_TIMEOUT_MS = 1;
		LOCAL_IDA_HTTP_HOSTS = new Set([
			"localhost",
			"127.0.0.1",
			"[::1]",
			"host.docker.internal",
			"host.containers.internal"
		]);
		common = {
			sensitive: z.strictObject({
				headers: z.array(z.string().min(1)).default([]),
				env: z.array(z.string().min(1)).default([])
			}).optional(),
			mode: z.enum(["attached", "headless"]).default("attached"),
			/**
			* An attached registration names its upstream protocol. `"legacy"` (the
			* removed ida-pro-mcp 1.4 GUI proxy) is still recognized so that a stored
			* registration is refused with migration guidance rather than reported as an
			* unknown value or read as another protocol. Headless mode has one protocol
			* (the database supervisor).
			*/
			protocol: z.enum(["legacy", "native"]).optional(),
			timeoutMs: z.int().min(MIN_IDA_REQUEST_TIMEOUT_MS).max(MAX_NODE_TIMER_DELAY_MS).default(DEFAULT_IDA_REQUEST_TIMEOUT_MS),
			workspaceRoot: z.string().refine(isAbsolute, "workspaceRoot must be absolute on the REA host").optional()
		};
		LEGACY_PROTOCOL_REMOVED = "the legacy ida-pro-mcp 1.4 attached protocol was removed. Replace this registration with the native ida-free-mcp plugin (\"protocol\": \"native\") for an open GUI database, or an ida-pro-mcp 2.x database supervisor in headless mode, as described in \"Migrate a legacy attached registration\"";
		registrationSchema = z.union([z.object({
			...common,
			type: z.literal("stdio").optional(),
			command: z.string().min(1),
			args: z.array(z.string()).default([]),
			env: jsonRecordSchema(z.string()).default({})
		}).strict(), z.object({
			...common,
			type: z.literal("http").optional(),
			url: z.url().refine((value) => {
				const url = new URL(value);
				return ["http:", "https:"].includes(url.protocol) && LOCAL_IDA_HTTP_HOSTS.has(url.hostname) && url.username === "" && url.password === "";
			}, "IDA MCP must use a local HTTP endpoint without URL credentials"),
			headers: jsonRecordSchema(z.string()).default({})
		}).strict()]).refine((config) => config.protocol === undefined || config.mode === "attached", "An IDA MCP protocol requires attached mode; headless registrations omit protocol").refine((config) => config.protocol !== undefined || config.mode !== "attached", "attached IDA registrations must set protocol to \"native\" (ida-free-mcp plugin)").transform((config, context) => {
			if (config.protocol === "legacy") {
				context.addIssue({
					code: "custom",
					path: ["protocol"],
					message: LEGACY_PROTOCOL_REMOVED
				});
				return z.NEVER;
			}
			return {
				...config,
				protocol: config.protocol ?? "modern"
			};
		});
		registrationConstraint = (issue) => {
			if (issue.path.length === 1 && issue.path[0] === "timeoutMs") return `timeoutMs must be an integer from ${String(MIN_IDA_REQUEST_TIMEOUT_MS)} to ${String(MAX_NODE_TIMER_DELAY_MS)} milliseconds`;
			return issue.message === undefined ? undefined : `${issue.path.join(".") || "registration"}: ${issue.message}`;
		};
		IDA_COMPATIBILITY_PROFILES = {
			modern: {
				protocol: "modern",
				mode: "headless",
				identity: "database-supervisor",
				diagnosticIdentity: "database-supervisor",
				diagnosticLabel: "headless"
			},
			native: {
				protocol: "native",
				mode: "attached",
				identity: "native-ida-mcp",
				diagnosticIdentity: "native",
				diagnosticLabel: "native attached"
			}
		};
		idaCompatibilityProfile = (config) => IDA_COMPATIBILITY_PROFILES[config.protocol];
		readIdaConfiguration = (path, options) => options.resourceScope.run(async () => {
			let closeLease;
			try {
				const text = await withOwnedRegularFile(path, {
					...options.signal === undefined ? {} : { signal: options.signal },
					retainFailedClose: (owner) => {
						closeLease = AnalysisCleanupLease.forCloseOwner(owner, path);
						options.resourceScope.retain({
							close: () => closeLease.release(),
							get cleanupResources() {
								return closeLease.cleanupResources;
							}
						}, path);
					}
				}, async ({ handle, initial: metadata }) => {
					if (metadata.size > MAXIMUM_REGISTRATION_BYTES) throw registrationTooLarge();
					const bytes = await readBoundedFileBytes(handle, MAXIMUM_REGISTRATION_BYTES, {
						signal: options.signal,
						cancellationFailure: (reason) => new RegularFileOperationCancelled(reason)
					});
					if (bytes === undefined) throw registrationTooLarge();
					return bytes.toString("utf8");
				});
				const input = JSON.parse(text);
				const envelope = z.object({ mcpServers: z.object({ "ida-pro-mcp": z.unknown() }) }).safeParse(input);
				const registration = envelope.success ? envelope.data.mcpServers["ida-pro-mcp"] : input;
				const parsed = registrationSchema.safeParse(registration);
				if (parsed.success) return ok(parsed.data);
				const constraints = projectInputIssues(parsed.error.issues, registration).flatMap((issue) => {
					const constraint = registrationConstraint(issue);
					return constraint === undefined ? [] : [constraint];
				});
				if (constraints.length === 0) return err(idaConfigurationError("REA_IDA_MCP_CONFIG must contain an IDA MCP command/args or local url registration; see docs/providers/ida-provider.md.", parsed.error));
				return err(new ConfigurationError(`REA_IDA_MCP_CONFIG: ${constraints.join("; ")}. See docs/providers/ida-provider.md.`, {
					cause: parsed.error,
					settings: constraints.map((constraint) => ({
						setting: "REA_IDA_MCP_CONFIG",
						constraint
					}))
				}));
			} catch (cause) {
				if (cause instanceof ConfigurationError) return err(cause);
				if (cause instanceof NonRegularFileReadError) return err(idaConfigurationError(`REA_IDA_MCP_CONFIG must select a regular JSON file: ${path}`, cause));
				if (cause instanceof AnalysisCancelledError) throw cause;
				const cancellation = regularFileCancellation(cause);
				if (cancellation !== undefined) {
					if (cause instanceof RegularFileCleanupFailure) {
						const error = cancelledBy("ida:registration", carriedReason(cancellation.reason), { cleanup: {
							reason: errorMessage(cause.cleanupCause),
							resources: [path]
						} });
						closeLease?.bindCleanupError(error);
						throw error;
					}
					throw cancelledBy("ida:registration", carriedReason(cancellation.reason));
				}
				if (cause instanceof RegularFileCleanupFailure) {
					const primary = cause.outcome.kind === "failed" ? cause.outcome.cause : cause.cleanupCause;
					const primaryMessage = cause.outcome.kind === "failed" ? primary instanceof ConfigurationError ? primary.message : primary instanceof NonRegularFileReadError ? `REA_IDA_MCP_CONFIG must select a regular JSON file: ${path}` : `Cannot read IDA MCP registration ${path}: ${errorMessage(primary)}` : `Cannot close IDA MCP registration ${path}; provide a readable JSON configuration.`;
					const error = new ConfigurationError(primaryMessage, {
						cause,
						cleanup: {
							reason: errorMessage(cause.cleanupCause),
							resources: [path]
						},
						settings: [{
							setting: "REA_IDA_MCP_CONFIG",
							constraint: `Close remains incomplete for ${path}`
						}]
					});
					closeLease?.bindCleanupError(error);
					return err(error);
				}
				return err(idaConfigurationError(`Cannot read IDA MCP registration ${path}; provide a readable JSON configuration.`, cause));
			}
		});
		MAXIMUM_REGISTRATION_BYTES = 65536;
		registrationTooLarge = () => idaConfigurationError("REA_IDA_MCP_CONFIG exceeds the 64 KiB registration size.");
		idaRegistrationTimeoutGuidance = (timeoutMs, phase, ceilingMs = timeoutMs) => ({
			userMessage: phase === "readiness" ? `IDA readiness reached its ${String(timeoutMs)} ms deadline while the headless worker was still busy (deadlineExpired).` : ceilingMs === timeoutMs ? `This IDA request reached the registration timeoutMs deadline of ${String(timeoutMs)} ms (deadlineExpired).` : `This IDA request reached its ${String(timeoutMs)} ms deadline (deadlineExpired), within the registration timeoutMs ceiling of ${String(ceilingMs)} ms.`,
			remediationAction: `Set timeoutMs in the JSON file named by REA_IDA_MCP_CONFIG to an integer from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)} (omitted means ${String(DEFAULT_IDA_REQUEST_TIMEOUT_MS)}). REA applies the edited file on the next IDA connection after it re-reads the registration; an already open session keeps the timeout it connected with. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`
		});
		idaConfigurationError = (constraint, cause) => new ConfigurationError(constraint, {
			...cause === undefined ? {} : { cause },
			settings: [{
				setting: "REA_IDA_MCP_CONFIG",
				constraint
			}]
		});
	})))();
}

//#endregion
//#region dist/ida/IdaWorkspace.js
var idaFileDigest, sameIdaHostPath, resolveIdaWorkspaceParent, IdaWorkspace;
function init_IdaWorkspace() {
	return (init_IdaWorkspace = __esmMin((() => {
		init_HostPlatform();
		init_callerPath();
		init_analysisErrorCore();
		init_configurationErrors();
		init_analysisErrorBase();
		init_PrivateRuntimeRoot();
		init_resources();
		init_errorMessage();
		idaFileDigest = async (path) => {
			const hash = createHash("sha256");
			for await (const chunk of createReadStream(path)) hash.update(chunk);
			return hash.digest("hex");
		};
		sameIdaHostPath = (left, right) => HOST_PLATFORM.platform === "win32" ? normalize(left).toLowerCase() === normalize(right).toLowerCase() : isAbsolute(left) === isAbsolute(right) && absoluteCallerPath(left) === absoluteCallerPath(right);
		resolveIdaWorkspaceParent = async (root = tmpdir()) => {
			await stat(root);
			return realpath(root);
		};
		IdaWorkspace = class IdaWorkspace {
			runtime;
			inputPath;
			target;
			sessionId = `rea-${randomUUID()}`;
			#inputSha256;
			#files = new ArtifactResourceScope();
			constructor(runtime, inputPath, target) {
				this.runtime = runtime;
				this.inputPath = inputPath;
				this.target = target;
			}
			/** Filesystem root owned exclusively by this headless session. */
			get directory() {
				return this.runtime.path;
			}
			/** SHA-256 of the private input bytes copyInput admitted; undefined until prepared. */
			get inputSha256() {
				return this.#inputSha256;
			}
			/** Allocate a protected workspace so its owner can retain it before input preparation. */
			static async allocate(target, root = tmpdir()) {
				let runtime;
				try {
					runtime = await PrivateRuntimeRoot.create({
						parent: await resolveIdaWorkspaceParent(root),
						prefix: "rea-ida-"
					});
				} catch (cause) {
					if (cause instanceof AnalysisError) throw cause;
					throw new ConfigurationError("IDA workspaceRoot is not a usable private workspace parent.", {
						cause,
						settings: [{
							setting: "workspaceRoot",
							constraint: `Select an existing writable and searchable directory: ${errorMessage(cause)}`
						}],
						diagnostics: { workspace_root: root }
					});
				}
				const inputPath = join(runtime.path, basename(target.path));
				return new IdaWorkspace(runtime, inputPath, target);
			}
			/**
			* Copy and verify admitted bytes after the session owns this workspace's
			* cleanup. Universal Mach-O containers are thinned to the selected slice so
			* the upstream engine analyzes the architecture admission reported; the
			* whole-source digest still anchors the copy against admission-time changes.
			*/
			copyInput(signal) {
				return this.#files.run(async () => {
					assertArtifactReadActive(signal);
					const source = await open(this.target.path, "r");
					await withArtifactFileHandle(this.target.path, source, this.#files, signal, async (source) => {
						assertArtifactReadActive(signal);
						const input = await open(this.inputPath, "wx");
						await withArtifactFileHandle(this.inputPath, input, this.#files, signal, (input) => this.#copyBytes(source, input, signal));
					});
				});
			}
			async #copyBytes(source, input, signal) {
				const slice = this.target.format === "mach-o-universal" ? this.target.universalSlice : undefined;
				const sourceHash = createHash("sha256");
				const inputHash = createHash("sha256");
				const chunk = Buffer.allocUnsafe(64 * 1024);
				let position = 0;
				for (;;) {
					assertArtifactReadActive(signal);
					const observed = await source.read(chunk, 0, chunk.length, position);
					if (observed.bytesRead === 0) break;
					assertArtifactReadActive(signal);
					const bytes = chunk.subarray(0, observed.bytesRead);
					sourceHash.update(bytes);
					const start = slice === undefined ? position : Math.max(position, slice.offset);
					const end = slice === undefined ? position + bytes.length : Math.min(position + bytes.length, slice.offset + slice.size);
					if (end > start) {
						const admitted = bytes.subarray(start - position, end - position);
						inputHash.update(admitted);
						let offset = 0;
						while (offset < admitted.length) {
							assertArtifactReadActive(signal);
							const { bytesWritten } = await input.write(admitted, offset, admitted.length - offset);
							if (bytesWritten === 0) throw new AnalysisProtocolError("IDA input copy write made no progress");
							offset += bytesWritten;
						}
						assertArtifactReadActive(signal);
					}
					position += observed.bytesRead;
				}
				if (sourceHash.digest("hex") !== this.target.sha256) throw new AnalysisProtocolError("IDA target changed between admission and the private input copy; reopen the target.");
				this.#inputSha256 = inputHash.digest("hex");
			}
			/** Delete only this object's privately allocated directory after worker cleanup. */
			async remove() {
				await this.#files.close();
				await this.runtime.close();
			}
		};
	})))();
}

//#endregion
//#region dist/ida/IdaAdmission.js
var IDA_WORKSPACE_ROOT_REMEDIATION, admitIdaConfiguration, workspaceParentUnusable;
function init_IdaAdmission() {
	return (init_IdaAdmission = __esmMin((() => {
		init_HostPlatform();
		init_PrivateRuntimeRoot();
		init_IdaWorkspace();
		init_errorMessage();
		IDA_WORKSPACE_ROOT_REMEDIATION = "Set workspaceRoot to an existing directory REA can create entries in, or omit it to use the system temporary directory; see docs/providers/ida-provider.md.";
		admitIdaConfiguration = async (configuration) => {
			if (configuration.mode !== "headless") return { admitted: true };
			const root = configuration.workspaceRoot;
			const privacy = privateRuntimeRootCapability(HOST_PLATFORM.platform);
			if (!privacy.available) return {
				admitted: false,
				workspaceRoot: root,
				refusal: {
					kind: "private_workspace_unavailable",
					privacy
				}
			};
			const unusable = await workspaceParentUnusable(root);
			return unusable === undefined ? {
				admitted: true,
				workspace: {
					root,
					proof: privacy.proof
				}
			} : {
				admitted: false,
				workspaceRoot: root,
				refusal: {
					kind: "workspace_unusable",
					reason: unusable
				}
			};
		};
		workspaceParentUnusable = async (root) => {
			try {
				const parent = await resolveIdaWorkspaceParent(root);
				if (!(await stat(parent)).isDirectory()) return `IDA workspaceRoot ${root ?? "the system temporary directory"} is not a directory.`;
				await access(parent, constants.W_OK | constants.X_OK);
				return undefined;
			} catch (cause) {
				return `IDA workspaceRoot ${root ?? "the system temporary directory"} is not a usable directory: ${errorMessage(cause)}`;
			}
		};
	})))();
}

//#endregion
//#region dist/kuna/KunaRelease.js
var KUNA_VERIFIED_VERSION, KUNA_RELEASE_VERIFICATION_EXPLANATION, KUNA_UNVERIFIED_VERSION_REMEDIATION, KUNA_PROVIDER_ID, KUNA_COMMAND_REMEDIATION, KUNA_UNSUPPORTED_HOST_REMEDIATION, KUNA_VERSION_PROBE_REMEDIATION;
function init_KunaRelease() {
	return (init_KunaRelease = __esmMin((() => {
		KUNA_VERIFIED_VERSION = "1.1000";
		KUNA_RELEASE_VERIFICATION_EXPLANATION = "At selection, REA compared the reported version with its baseline, checked on macOS arm64. This does not authenticate or recheck the executable or guarantee support or results on this host.";
		KUNA_UNVERIFIED_VERSION_REMEDIATION = `To use the verified release, select Kuna ${KUNA_VERIFIED_VERSION} by setting REA_KUNA_COMMAND to its absolute executable path in the environment that starts REA, then restart REA. You may continue with the selected unverified release.`;
		KUNA_PROVIDER_ID = "kuna";
		KUNA_COMMAND_REMEDIATION = `Set REA_KUNA_COMMAND to the absolute path of a caller-supplied kuna executable (verified with ${KUNA_VERIFIED_VERSION}). REA does not download, install or update Kuna.`;
		KUNA_UNSUPPORTED_HOST_REMEDIATION = "Use Linux or macOS for the Kuna provider. Windows process-tree ownership for Kuna is not verified.";
		KUNA_VERSION_PROBE_REMEDIATION = "Run the selected executable with --version: it must exit promptly and print `kuna <major>.<minor>`.";
	})))();
}

//#endregion
//#region dist/kuna/KunaConfiguration.js
var MAXIMUM_KUNA_JOBS, SERIAL_KUNA_JOBS, DEFAULT_KUNA_CACHE_MAX_BYTES, MINIMUM_KUNA_CACHE_MAX_BYTES, MAXIMUM_KUNA_CACHE_MAX_BYTES, kunaDeadline, kunaFunctionDeadline, kunaProjectDeadline, failure, positiveInteger, configuredTimeout, refuseInvalidLaunch, readKunaConfiguration;
function init_KunaConfiguration() {
	return (init_KunaConfiguration = __esmMin((() => {
		init_analysisResourceLimits();
		init_configurationErrors();
		init_analysisOperationSnapshot();
		init_cacheDirectory();
		init_homeDirectory();
		init_providerStartupTimeout();
		init_result();
		init_KunaRelease();
		MAXIMUM_KUNA_JOBS = 32;
		SERIAL_KUNA_JOBS = 1;
		DEFAULT_KUNA_CACHE_MAX_BYTES = 4 * 1024 ** 3;
		MINIMUM_KUNA_CACHE_MAX_BYTES = 1024 ** 2;
		MAXIMUM_KUNA_CACHE_MAX_BYTES = Number.MAX_SAFE_INTEGER;
		kunaDeadline = (configuration, setting, overrideSetting, ms, source, launchValid) => {
			const override = currentAnalysisOperationSnapshot()?.overrides[overrideSetting];
			if (override !== undefined) return {
				setting,
				ms: override,
				source: "runtime"
			};
			if (launchValid === false) {
				const constraint = `${setting} is not a valid launch seed and no runtime override is active.`;
				throw new ConfigurationError(constraint, {
					settings: [{
						setting,
						constraint,
						update_mode: "runtime"
					}],
					remediationAction: `Use update_analysis_settings to set ${overrideSetting} to a valid millisecond timeout, then retry the operation. The launch seed is ${setting}.`
				});
			}
			return {
				setting,
				ms,
				source
			};
		};
		kunaFunctionDeadline = (configuration) => kunaDeadline(configuration, "REA_KUNA_TIMEOUT_MS", "kuna.function_timeout_ms", configuration.functionTimeoutMs, configuration.functionTimeoutSource, configuration.functionTimeoutLaunchValid);
		kunaProjectDeadline = (configuration) => kunaDeadline(configuration, "REA_KUNA_PROJECT_TIMEOUT_MS", "kuna.project_timeout_ms", configuration.projectTimeoutMs, configuration.projectTimeoutSource, configuration.projectTimeoutLaunchValid);
		failure = (code, reason, setting = null) => err({
			code,
			reason,
			setting,
			remediation: code === "unsupported_host" ? KUNA_UNSUPPORTED_HOST_REMEDIATION : setting === null || setting === "REA_KUNA_COMMAND" ? KUNA_COMMAND_REMEDIATION : `Correct ${setting} to meet the reported constraint, or unset it to use its default. Restart REA after changing the environment.`
		});
		positiveInteger = (value) => /^[1-9]\d*$/u.test(value) && Number.isSafeInteger(Number(value)) ? Number(value) : undefined;
		configuredTimeout = (raw, setting, fallback) => {
			if (raw === undefined) return ok({
				ms: fallback,
				source: "default",
				launchValid: true
			});
			const parsed = providerStartupTimeoutSchema.safeParse(raw);
			if (parsed.success) return ok({
				ms: parsed.data,
				source: "setting",
				launchValid: true
			});
			return ok({
				ms: fallback,
				source: "default",
				launchValid: false
			});
		};
		refuseInvalidLaunch = (raw, setting, parsed) => {
			if (parsed.launchValid) return ok(undefined);
			return failure("open_options_invalid", `${setting} must be a decimal millisecond count from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}; received ${String(raw)}.`, setting);
		};
		readKunaConfiguration = (environment, platform) => {
			const command = environment.REA_KUNA_COMMAND;
			if (command === undefined || command.length === 0) return failure("not_configured", KUNA_COMMAND_REMEDIATION);
			if (!isAbsolute(command)) return failure("open_options_invalid", `REA_KUNA_COMMAND must be an absolute path; received ${command}. ${KUNA_COMMAND_REMEDIATION}`, "REA_KUNA_COMMAND");
			if (platform !== "darwin" && platform !== "linux") return failure("unsupported_host", KUNA_UNSUPPORTED_HOST_REMEDIATION);
			const cacheRoot = environment.REA_KUNA_CACHE_DIR;
			if (cacheRoot !== undefined && !isAbsolute(cacheRoot)) return failure("open_options_invalid", `REA_KUNA_CACHE_DIR must be an absolute directory; received ${cacheRoot}.`, "REA_KUNA_CACHE_DIR");
			const rawMaxBytes = environment.REA_KUNA_CACHE_MAX_BYTES;
			const cacheMaxBytes = rawMaxBytes === undefined ? DEFAULT_KUNA_CACHE_MAX_BYTES : positiveInteger(rawMaxBytes);
			if (cacheMaxBytes === undefined || cacheMaxBytes < MINIMUM_KUNA_CACHE_MAX_BYTES || cacheMaxBytes > MAXIMUM_KUNA_CACHE_MAX_BYTES) return failure("open_options_invalid", `REA_KUNA_CACHE_MAX_BYTES must be a decimal byte count of at least ${String(MINIMUM_KUNA_CACHE_MAX_BYTES)}; received ${String(rawMaxBytes)}.`, "REA_KUNA_CACHE_MAX_BYTES");
			const overrides = currentAnalysisOperationSnapshot()?.overrides;
			const projectTimeout = configuredTimeout(environment.REA_KUNA_PROJECT_TIMEOUT_MS, "REA_KUNA_PROJECT_TIMEOUT_MS", DEFAULT_KUNA_PROJECT_TIMEOUT_MS);
			if (!projectTimeout.ok) return projectTimeout;
			if (overrides?.["kuna.project_timeout_ms"] === undefined) {
				const refused = refuseInvalidLaunch(environment.REA_KUNA_PROJECT_TIMEOUT_MS, "REA_KUNA_PROJECT_TIMEOUT_MS", projectTimeout.value);
				if (!refused.ok) return refused;
			}
			const functionTimeout = configuredTimeout(environment.REA_KUNA_TIMEOUT_MS, "REA_KUNA_TIMEOUT_MS", DEFAULT_KUNA_FUNCTION_TIMEOUT_MS);
			if (!functionTimeout.ok) return functionTimeout;
			if (overrides?.["kuna.function_timeout_ms"] === undefined) {
				const refused = refuseInvalidLaunch(environment.REA_KUNA_TIMEOUT_MS, "REA_KUNA_TIMEOUT_MS", functionTimeout.value);
				if (!refused.ok) return refused;
			}
			const rawJobs = environment.REA_KUNA_JOBS;
			const jobs = rawJobs === undefined ? 1 : positiveInteger(rawJobs);
			if (jobs === undefined || jobs < 1 || jobs > 32) return failure("open_options_invalid", `REA_KUNA_JOBS must be an integer from ${String(1)} to ${String(32)}; received ${String(rawJobs)}.`, "REA_KUNA_JOBS");
			return ok({
				command,
				cacheRoot: cacheRoot ?? defaultKunaCacheDirectory(homeDirectoryFromEnvironment(environment, platform), environment, platform),
				cacheMaxBytes,
				projectTimeoutMs: projectTimeout.value.ms,
				projectTimeoutSource: projectTimeout.value.source,
				projectTimeoutLaunchValid: projectTimeout.value.launchValid,
				functionTimeoutMs: functionTimeout.value.ms,
				functionTimeoutSource: functionTimeout.value.source,
				functionTimeoutLaunchValid: functionTimeout.value.launchValid,
				jobs
			});
		};
	})))();
}

//#endregion
//#region dist/kuna/KunaAdmission.js
var admitKunaCommand;
function init_KunaAdmission() {
	return (init_KunaAdmission = __esmMin((() => {
		init_result();
		init_KunaConfiguration();
		init_KunaRelease();
		init_errorMessage();
		admitKunaCommand = (environment, platform) => {
			const configuration = readKunaConfiguration(environment, platform);
			if (!configuration.ok) {
				const { code, reason, remediation, setting } = configuration.error;
				return err({
					code,
					reason,
					remediation,
					setting,
					diagnostics: {
						configured: code !== "not_configured",
						...setting === null ? {} : { setting }
					}
				});
			}
			const { command } = configuration.value;
			const refused = (reason) => err({
				code: "executable_missing",
				reason: `${reason} ${KUNA_COMMAND_REMEDIATION}`,
				remediation: KUNA_COMMAND_REMEDIATION,
				setting: "REA_KUNA_COMMAND",
				diagnostics: {
					configured: true,
					command
				}
			});
			try {
				accessSync(command, constants.X_OK);
				if (!statSync(command).isFile()) return refused(`REA_KUNA_COMMAND is not a regular file: ${command}.`);
			} catch (cause) {
				return refused(`Cannot execute REA_KUNA_COMMAND ${command}: ${errorMessage(cause)}.`);
			}
			return ok(configuration.value);
		};
	})))();
}

//#endregion
export { EXISTING_PROJECT_WINDOWS_REMEDIATION, EXISTING_PROJECT_WINDOWS_UNAVAILABLE, GHIDRA_RESTRICTED_TEMP_REMEDIATION, GhidraAdmissionError, IDA_COMPATIBILITY_PROFILES, IDA_WORKSPACE_ROOT_REMEDIATION, IdaWorkspace, KUNA_COMMAND_REMEDIATION, KUNA_PROVIDER_ID, KUNA_RELEASE_VERIFICATION_EXPLANATION, KUNA_UNVERIFIED_VERSION_REMEDIATION, KUNA_VERIFIED_VERSION, KUNA_VERSION_PROBE_REMEDIATION, admitGhidraInstallation, admitIdaConfiguration, admitKunaCommand, dialogTimeoutFromDiagnostic, ghidraFileDialect, ghidraInstallationDiagnostics, ghidraJavaEnvironment, ghidraKnownProviderDefectLimitations, ghidraSessionRoot, hopperStartupFailure, idaCompatibilityProfile, idaConfigurationError, idaFileDigest, idaRegistrationTimeoutGuidance, init_GhidraAdmission, init_GhidraAdmissionError, init_GhidraFileArtifacts, init_GhidraInstallation, init_GhidraJavaProperties, init_GhidraReleasePolicy, init_GhidraSessionRoot, init_GhidraTemporaryDirectory, init_HopperStartupFailure, init_IdaAdmission, init_IdaConfiguration, init_IdaWorkspace, init_KunaAdmission, init_KunaConfiguration, init_KunaRelease, init_LinuxPrivateDisplayDiagnostic, init_LinuxPrivateDisplayProbe, inspectGhidraInstallation, invalidDialogTimeoutMessage, kunaFunctionDeadline, kunaProjectDeadline, parseGhidraJavaProperties, parseLinuxPrivateDisplayDiagnostic, probeGhidraTemporaryDirectory, readGhidraProfileArtifact, readIdaConfiguration, readKunaConfiguration, sameIdaHostPath, selectLinuxPrivateDisplayStrategy, unverifiedGhidraBuildLimitation, writeGhidraProfileArtifact };