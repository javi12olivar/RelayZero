import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisError, AnalysisTimeoutError, DEFAULT_JADX_OPERATION_TIMEOUT_MS, MAX_NODE_TIMER_DELAY_MS, analysisSettingLimit, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_analysisSettingDefinitions, init_errorMessage, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { InternalInvariantError, init_internalInvariant, invariantViolation } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_executableSearch, posixPathCandidates, windowsPathCandidates } from "./executableSearch-B91ds2Qv.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactFileCancelled, ArtifactFileCleanupFailure, ArtifactReaderFailure, ZipArtifactReader, bindArtifactFileCleanup, init_ArtifactFileOperation, init_ArtifactReader, init_ZipArtifactReader, init_resources, withArtifactRegularFile } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_WindowsNativeLoader, systemWindowsNativeAuthority } from "./WindowsNativeLoader-CCqowxwW.js";
import { init_WindowsAuthority, inspectWindowsNativeReadiness } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { init_providerStartupTimeout, providerStartupTimeoutSchema } from "./providerStartupTimeout-DNZGsNYA.js";
import { init_launchFailure, launcherFailureOf } from "./ExecFileOutput-YDVPmL3I.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { OwnedCommandFailure, init_OwnedCommand, preparationHostCapacityFailure, prepareOwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { bindProcessInspectionCancellations, init_OwnedCommandCleanup, processInspectionCancellationError, processInspectionFailure, retainOwnedCommandCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { classifyLaunchFailure, init_classifyProviderOutcome } from "./classifyProviderOutcome-BMRoGrMs.js";
import { analysisClientFailureForOperation, init_AnalysisClientFailure } from "./AnalysisClientFailure-DEt-O8Hp.js";
import { init_ownedProcessAvailability, ownedProcessPrerequisiteAvailability } from "./ownedProcessAvailability-DkUuARAb.js";
import { constants, readFileSync } from "node:fs";
import { isAbsolute, posix, win32 } from "node:path";
import { randomUUID } from "node:crypto";
import { access, realpath, stat } from "node:fs/promises";

//#region dist/android/JadxInterruption.js
var JadxInterruption, throwIfJadxInterrupted;
function init_JadxInterruption() {
	return (init_JadxInterruption = __esmMin((() => {
		JadxInterruption = class extends Error {
			reason;
			constructor(reason) {
				super("Android operation interrupted", { cause: reason });
				this.reason = reason;
				this.name = "AbortError";
			}
		};
		throwIfJadxInterrupted = (signal) => {
			if (signal?.aborted === true) throw new JadxInterruption(signal.reason);
		};
	})))();
}

//#endregion
//#region dist/android/JadxOperationTimeout.js
var JADX_OPERATION_TIMEOUT_REMEDIATION, jadxOperationTimeoutGuidance;
function init_JadxOperationTimeout() {
	return (init_JadxOperationTimeout = __esmMin((() => {
		init_analysisSettingDefinitions();
		init_analysisResourceLimits();
		JADX_OPERATION_TIMEOUT_REMEDIATION = `Set REA_JADX_OPERATION_TIMEOUT_MS to a decimal millisecond count from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}, or unset it to keep the ${String(DEFAULT_JADX_OPERATION_TIMEOUT_MS)} ms default.`;
		jadxOperationTimeoutGuidance = (timeoutMs) => ({
			limit: analysisSettingLimit("jadx.operation_timeout_ms", timeoutMs, undefined),
			userMessage: `JADX reached its configured operation deadline of ${String(timeoutMs)} ms (deadlineExpired).`,
			remediationAction: `Set REA_JADX_OPERATION_TIMEOUT_MS in REA's launch environment to an integer from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)} milliseconds (omitted means ${String(DEFAULT_JADX_OPERATION_TIMEOUT_MS)} ms). For a running MCP server, use update_analysis_settings with setting jadx.operation_timeout_ms and action set; it applies to the next operation without restarting REA. Environment changes apply on the next REA process start. The effective deadline for this attempt was ${String(timeoutMs)} ms. It does not raise the bridge's 30000 ms startup handshake. Raising only the MCP client deadline does not change this budget. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`
		});
	})))();
}

//#endregion
//#region dist/android/JadxJavaProbe.js
var JAVA_MODULE_LISTING_TIMEOUT_MS, JAVA_MODULE_LISTING_MAX_OUTPUT_BYTES, refusal, projectRefusal, inspectJadxJava, hostLaunchConstraint, commandProbeRefusal, parseJavaModules;
function init_JadxJavaProbe() {
	return (init_JadxJavaProbe = __esmMin((() => {
		init_capturedProviderOutput();
		init_launchFailure();
		init_classifyProviderOutcome();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_analysisErrorCleanup();
		init_internalInvariant();
		init_jsonValue();
		init_result();
		init_OwnedCommand();
		init_DarwinProcessRunTokenReader();
		init_OwnedCommandCleanup();
		init_AnalysisClientFailure();
		init_JadxOperationTimeout();
		JAVA_MODULE_LISTING_TIMEOUT_MS = 1e4;
		JAVA_MODULE_LISTING_MAX_OUTPUT_BYTES = 1024 * 1024;
		refusal = (code, message, diagnostics, kind) => err({
			code,
			message,
			diagnostics,
			kind
		});
		projectRefusal = (failure, operation, cause, output) => {
			const { stdout: _stdout, stderr: _stderr, ...facts } = failure.diagnostics;
			return new AnalysisCapabilityUnavailableError("jadx", operation, failure.message, {
				cause,
				userMessage: failure.message,
				diagnostics: {
					...facts,
					failure_kind: failure.kind,
					failure_code: failure.code
				},
				...output === undefined ? {} : { capturedOutput: output }
			});
		};
		inspectJadxJava = async (java, environment, options) => {
			const operation = options.operation ?? "inspect_jadx_configuration";
			try {
				return await options.resourceOwner.run(async () => {
					let observed;
					try {
						await prepareOwnedCommand(options.signal);
						await runOwnedCommand({
							command: java,
							arguments: ["--list-modules"],
							runId: randomUUID(),
							expectedCommand: null,
							hostEnvironment: environment,
							sweepTokenOwnedProcesses: true
						}, {
							timeoutMs: options.timeoutMs ?? JAVA_MODULE_LISTING_TIMEOUT_MS,
							diagnosticBytes: JAVA_MODULE_LISTING_MAX_OUTPUT_BYTES,
							acceptNonZeroExit: true,
							observeCompleted: (snapshot) => {
								observed = parseJavaModules(java, snapshot);
							}
						}, {
							signal: options.signal,
							...options.launcher === undefined ? {} : { launcher: options.launcher }
						});
						if (observed === undefined) throw invariantViolation("Java probe completed without an observation");
						return observed;
					} catch (cause) {
						const command = cause instanceof OwnedCommandFailure ? cause : undefined;
						const preparation = processInspectionFailure(cause);
						const output = command?.snapshot == null ? preparation instanceof DarwinProcessOwnershipInspectionError ? preparation.capturedOutput : undefined : capturedProviderOutput(command.snapshot);
						const inspectionCancellation = command === undefined || command.preparationFailure !== undefined ? processInspectionCancellationError(cause, operation) : undefined;
						const cleanups = retainOwnedCommandCleanup(cause, options.resourceOwner, "jadx", operation);
						const hostConstraint = hostLaunchConstraint(command, cause);
						let primary;
						if (observed !== undefined && !observed.ok) {
							if (cleanups.length === 0) return observed;
							primary = projectRefusal(observed.error, operation, cause, output);
						} else if (command?.reason === "cancelled" && command.cancellation !== undefined) {
							const reason = command.cancellation.reason;
							const errorOptions = {
								...output === undefined ? {} : { capturedOutput: output },
								...observed?.ok === true ? { diagnostics: { java_module_observation: {
									compiler: observed.value.compiler,
									major: observed.value.major
								} } } : {}
							};
							primary = options.operationDeadline?.signal.aborted === true && reason === options.operationDeadline.signal.reason ? new AnalysisTimeoutError(operation, options.operationDeadline.timeoutMs, {
								...errorOptions,
								cause: reason,
								...jadxOperationTimeoutGuidance(options.operationDeadline.timeoutMs)
							}) : inspectionCancellation ?? cancelledBy(operation, carriedReason(reason), errorOptions);
						} else if (inspectionCancellation !== undefined) {
							primary = inspectionCancellation;
						} else if (observed?.ok === true && command?.cleanupOwner !== undefined) {
							primary = new ProviderAdapterError("jadx", operation, {
								cause,
								...output === undefined ? {} : { capturedOutput: output },
								diagnostics: {
									stage: "cleanup",
									java_module_observation: {
										compiler: observed.value.compiler,
										major: observed.value.major
									}
								}
							});
						} else if (preparation !== undefined && command?.reason !== "timeout" && hostConstraint === undefined) {
							primary = new ProviderAdapterError("jadx", operation, {
								cause,
								...output === undefined ? {} : { capturedOutput: output },
								diagnostics: {
									stage: "ownership_preparation",
									...!(preparation instanceof DarwinProcessOwnershipInspectionError) || preparation.compilerOutcome === undefined ? {} : { compiler_outcome: jsonValueSchema.parse(preparation.compilerOutcome) }
								}
							});
						} else if (cause instanceof AnalysisError) {
							primary = cause;
						} else if (cause instanceof InternalInvariantError) {
							primary = new ProviderAdapterError("jadx", operation, {
								cause,
								...output === undefined ? {} : { capturedOutput: output }
							});
						} else if (hostConstraint !== undefined) {
							primary = classifyLaunchFailure(hostConstraint, {
								providerId: "jadx",
								operation,
								fixedArguments: true,
								command: java,
								details: {
									cause,
									diagnostics: {
										java_executable: java,
										phase: "module-inspection"
									}
								}
							});
						} else {
							const failure = commandProbeRefusal(java, command, cause, options.timeoutMs ?? JAVA_MODULE_LISTING_TIMEOUT_MS);
							if (preparation !== undefined) Object.defineProperty(failure, "inspectionFailure", { value: preparation });
							if (cleanups.length === 0) return err(failure);
							primary = projectRefusal(failure, operation, cause, output);
						}
						for (const cleanup of cleanups) primary = analysisErrorWithCleanupDependencies(primary, cleanup, operation);
						throw bindProcessInspectionCancellations(cause, primary, operation);
					}
				});
			} catch (cause) {
				if (cause instanceof AnalysisError) throw cause;
				throw analysisClientFailureForOperation(cause, "jadx", operation);
			}
		};
		hostLaunchConstraint = (command, cause) => {
			const launch = preparationHostCapacityFailure(cause) ?? launcherFailureOf(command?.processError ?? cause);
			return launch?.kind === "host-exhausted" || launch?.kind === "argument-list" ? launch : undefined;
		};
		commandProbeRefusal = (java, command, cause, timeoutMs) => {
			const output = command?.snapshot == null ? undefined : capturedProviderOutput(command.snapshot);
			const processError = command?.processError ?? (cause instanceof Error ? cause : undefined);
			const systemCode = processError === undefined ? undefined : Reflect.get(processError, "code");
			const missing = launcherFailureOf(processError)?.kind === "missing";
			const limited = command?.reason === "output-limit";
			const timedOut = command?.reason === "timeout";
			return {
				code: missing ? "runtime_missing" : limited || timedOut ? "version_unresolved" : "runtime_unavailable",
				kind: missing ? "java_runtime" : "java_probe",
				message: limited ? `The selected Java launcher ${java} exceeded the ${String(JAVA_MODULE_LISTING_MAX_OUTPUT_BYTES)}-byte module-listing output budget. This release has no runtime override. REA retained partial output but could not establish compiler or version availability. Inspect the selected launcher for verbose or unbounded output; java --list-modules should return a concise module listing. REA_JADX_OPERATION_TIMEOUT_MS does not raise this probe.` : timedOut ? `The selected Java launcher ${java} did not finish the module-listing probe within ${String(timeoutMs)} ms. This release has no runtime override. Inspect its startup responsiveness and verify it with java --list-modules. REA_JADX_OPERATION_TIMEOUT_MS does not raise this probe.` : `Cannot inspect selected Java runtime ${java}: ${missing ? `spawn java ${String(systemCode)}` : cause instanceof Error ? cause.message : cause === undefined ? `exit ${String(output?.exit_code ?? "unknown")}${output?.signal == null ? "" : ` (${output.signal})`}` : String(cause)}. Review the selected launcher and retained diagnostics.`,
				diagnostics: {
					java_executable: java,
					phase: "module-inspection",
					exit_code: output?.exit_code ?? null,
					process_error_code: typeof systemCode === "string" ? systemCode : null,
					signal: output?.signal ?? null,
					killed: null,
					stdout: output?.stdout ?? "",
					stderr: output?.stderr ?? "",
					output_truncated: output?.truncated ?? true,
					...limited ? {
						failure: "output_limit",
						output_limit_bytes: JAVA_MODULE_LISTING_MAX_OUTPUT_BYTES
					} : {},
					...timedOut ? {
						failure: "probe_terminated",
						deadline_ms: timeoutMs
					} : {}
				}
			};
		};
		parseJavaModules = (java, snapshot) => {
			if (snapshot.exitCode !== 0 || snapshot.signal !== null) return err(commandProbeRefusal(java, {
				reason: "process",
				snapshot,
				processError: undefined
			}, undefined, JAVA_MODULE_LISTING_TIMEOUT_MS));
			const stdout = snapshot.stdout.text;
			const stderr = snapshot.stderr.text;
			const compiler = /^jdk\.compiler(?:@|$)/mu.test(stdout);
			if (!compiler) return refusal("runtime_missing", `Selected Java runtime ${java} does not provide jdk.compiler. Select a full JDK including jdk.compiler via JAVA_HOME or PATH; verify it with java --list-modules. A JRE cannot compile REA's source bridge.`, {
				java_executable: java,
				phase: "module-inspection",
				jdk_compiler: false,
				stdout,
				stderr,
				output_truncated: false
			}, "java_runtime");
			const major = /^java\.base@(\d+)(?:[.+_-]|$)/mu.exec(stdout)?.[1];
			if (major === undefined) return refusal("version_unresolved", `The selected Java launcher ${java} did not report a parseable java.base version in its module listing. Inspect the launcher output and verify it with java --list-modules.`, {
				java_executable: java,
				phase: "module-inspection",
				jdk_compiler: true,
				java_major: null,
				stdout,
				stderr,
				output_truncated: false
			}, "java_probe");
			const majorNumber = Number(major);
			if (!Number.isSafeInteger(majorNumber) || majorNumber <= 0) return refusal("version_unresolved", `The selected Java launcher ${java} reported an invalid java.base major version. Review the retained module listing.`, {
				java_executable: java,
				phase: "module-inspection",
				jdk_compiler: true,
				java_major: null,
				unparsed_java_major: major,
				stdout,
				stderr,
				output_truncated: false
			}, "java_probe");
			if (majorNumber < 17) return refusal("unsupported_version", `Selected Java runtime ${java} must be JDK 17 or newer and include jdk.compiler; verify it with java --list-modules.`, {
				java_executable: java,
				phase: "module-inspection",
				jdk_compiler: true,
				java_major: major ?? null,
				stdout,
				stderr,
				output_truncated: false
			}, "java_runtime");
			return ok({
				compiler: true,
				major: majorNumber
			});
		};
	})))();
}

//#endregion
//#region dist/android/JadxRelease.js
/**
* Java source as string and character literals, single characters, and one
* space per comment, each with the brace depth it sits at (a brace carries the
* depth outside it). Braces inside literals and comments are not counted. Text
* blocks are not handled; the bridge source does not use them.
*/
function* javaPieces(source) {
	let depth = 0;
	let index = 0;
	while (index < source.length) {
		const character = source[index] ?? "";
		const next = source[index + 1];
		let end = index + 1;
		let text = character;
		if (character === "/" && (next === "/" || next === "*")) {
			const close = next === "/" ? source.indexOf("\n", index) : source.indexOf("*/", index + 2);
			end = close === -1 ? source.length : next === "/" ? close : close + 2;
			text = " ";
		} else if (character === "\"" || character === "'") {
			while (end < source.length && source[end] !== character) end += source[end] === "\\" ? 2 : 1;
			end += 1;
			text = source.slice(index, end);
		}
		if (text === "}") depth -= 1;
		yield {
			text,
			depth
		};
		if (text === "{") depth += 1;
		index = end;
	}
}
var JADX_RELEASE, JADX_BRIDGE_SOURCE_URL, topLevelClassMembers, declaredString, parseJadxBridgeIdentity, bridgeIdentity, jadxBridgeIdentity, JADX_JAR_CONFIGURATION_REMEDIATION, JADX_JAVA_RUNTIME_REMEDIATION, JADX_JVM_OPTIONS_REMEDIATION, JADX_HEAP_REMEDIATION, JADX_UNSUPPORTED_HOST_REMEDIATION, JADX_WINDOWS_NATIVE_REMEDIATION, JADX_JAVA_PROBE_REMEDIATION, JADX_PROVIDER_IDENTITY, JADX_LIMITATIONS;
function init_JadxRelease() {
	return (init_JadxRelease = __esmMin((() => {
		JADX_RELEASE = Object.freeze({
			version: "0.7.1",
			revision: "5844800a486d2248fa949b74c9896285f5b54de2",
			sha256: "6e5eacf500b64292bfb73c49797c1958f6ee44646e43e868039ae7feb573ff75",
			url: "https://github.com/1013503897/jadx-headless-mcp/releases/download/v0.7.1/jadx-headless-mcp-0.7.1-all.jar"
		});
		JADX_BRIDGE_SOURCE_URL = new URL("../../bridge/android/ReaJadxBridge.java", new URL("../android/JadxRelease.js", import.meta.url).href);
		topLevelClassMembers = (source, className) => {
			const declaresClass = new RegExp(String.raw`(?:^|\s)class\s+${className}(?![\w$])`, "u");
			let members = "";
			let header = "";
			let inClass = false;
			let classBodies = 0;
			for (const { text, depth } of javaPieces(source)) {
				if (depth === 0 && text === "{") {
					inClass = declaresClass.test(header);
					if (inClass) classBodies += 1;
					header = "";
				} else if (depth === 0) header = text === ";" || text === "}" ? "" : header + text;
				else if (depth === 1 && inClass) members += text === "{" || text === "}" ? " " : text;
			}
			return classBodies === 1 ? {
				ok: true,
				value: members
			} : {
				ok: false,
				error: `REA's JADX bridge source must declare top-level class ${className} exactly once; found ${String(classBodies)}`
			};
		};
		declaredString = (members, constant) => {
			const matches = [...members.matchAll(new RegExp(String.raw`(?:^|[;\s])(?:(?:public|protected|private|static|final)\s+)*String\s+${constant}\s*=\s*"([A-Za-z0-9._-]+)"\s*;`, "gu"))];
			const value = matches.length === 1 ? matches[0]?.[1] : undefined;
			return value === undefined ? {
				ok: false,
				error: `REA's JADX bridge source must declare ${constant} exactly once; found ${String(matches.length)}`
			} : {
				ok: true,
				value
			};
		};
		parseJadxBridgeIdentity = (source) => {
			const members = topLevelClassMembers(source, "ReaJadxBridge");
			if (!members.ok) return members;
			const name = declaredString(members.value, "BRIDGE_NAME");
			if (!name.ok) return name;
			const version = declaredString(members.value, "BRIDGE_VERSION");
			if (!version.ok) return version;
			return {
				ok: true,
				value: Object.freeze({
					name: name.value,
					version: version.value
				})
			};
		};
		;
		jadxBridgeIdentity = () => {
			bridgeIdentity ??= parseJadxBridgeIdentity(readFileSync(JADX_BRIDGE_SOURCE_URL, "utf8"));
			return bridgeIdentity;
		};
		JADX_JAR_CONFIGURATION_REMEDIATION = `Download the jadx-headless-mcp ${JADX_RELEASE.version} release JAR from ${JADX_RELEASE.url}, verify SHA-256 ${JADX_RELEASE.sha256}, and set REA_JADX_MCP_JAR to its absolute path. REA does not download or install it.`;
		JADX_JAVA_RUNTIME_REMEDIATION = "Select a full JDK including jdk.compiler via JAVA_HOME or PATH, then verify it with java --list-modules. REA does not install Java.";
		JADX_JVM_OPTIONS_REMEDIATION = "Set REA_JADX_HEAP_MIB to a positive integer (heap size in MiB) and REA_JADX_ACTIVE_PROCESSOR_COUNT to a positive integer within the JVM's signed 32-bit range.";
		JADX_HEAP_REMEDIATION = "Increase REA_JADX_HEAP_MIB (MiB) in the environment that starts REA, within the host or container memory budget. REA passes it as an explicit -Xmx, so JAVA_TOOL_OPTIONS and JDK_JAVA_OPTIONS set the heap only while it is unset, and _JAVA_OPTIONS overrides it. An observed heap is this run's limit, not the heap the APK requires.";
		JADX_UNSUPPORTED_HOST_REMEDIATION = "Use Linux, macOS, or Windows x64 with its bundled native controls for Android JADX analysis.";
		JADX_WINDOWS_NATIVE_REMEDIATION = "Use a matching current Windows x64 REA package with its bundled native controls. The native failure above identifies the failed constraint; Java installation or registration changes cannot enable a missing native backend.";
		JADX_JAVA_PROBE_REMEDIATION = "Verify the selected Java launcher with java --list-modules: it must start promptly and emit a concise module listing including a parseable java.base version. REA does not install Java.";
		JADX_PROVIDER_IDENTITY = Object.freeze({
			id: "jadx",
			name: "JADX headless",
			version: JADX_RELEASE.version
		});
		JADX_LIMITATIONS = [
			"Static decompiler observations do not establish runtime behavior; the APK is never executed.",
			"Method signatures use provider display types; DEX prototypes come from frozen JADX metadata. Display names may be aliases, and overload indices are local to this engine and artifact.",
			"Class inventories use parsed metadata before code generation, including synthetic members that may be omitted from decompiled source. Source positions remain unknown.",
			"Incoming reference totals count JADX using nodes. Direct invoke entries within a using method report raw DEX code-unit offsets and method indexes, but coverage is limited to those nodes and directly matched invokes; it does not establish every possible dynamic or reflective call site.",
			"Manifest summaries are parsed once by REA's bridge from the exact root AndroidManifest.xml resource, using namespace-aware XML attributes; decoded XML is retained. These summaries do not verify APK signatures, split APKs or Android runtime capture."
		];
	})))();
}

//#endregion
//#region dist/android/JadxConfiguration.js
var JAR_METADATA_READ_MAX_BYTES, JADX_FAILURE_KINDS, jadxFailureRemediation, jadxFailureClassification, JadxConfigurationFailure, inspectJadxAvailability, resolveJadxOperationTimeout, resolveJadxConfigurationInputs, validateJadxConfiguration, readJadxConfigurationInputs, validateJadxConfigurationContents, projectConfigurationFailure, requireEngineArchive, archiveInspectionFailure, archiveAnalysisFailure, archiveCancellation, requireSupportedHost, resolveJar, resolveJava, requireJavaHomeExecutable, JADX_JVM_NUMERIC_MINIMUM, JADX_JVM_DEFAULT, JADX_HEAP_MIB_MAXIMUM, JADX_ACTIVE_PROCESSOR_COUNT_MAXIMUM, jadxJvmBounds, resolveJvmArguments, readOperationTimeout, inspectJavaRuntime, configurationFailure;
function init_JadxConfiguration() {
	return (init_JadxConfiguration = __esmMin((() => {
		init_callerPath();
		init_analysisResourceLimits();
		init_JadxOperationTimeout();
		init_JadxJavaProbe();
		init_JadxInterruption();
		init_executableSearch();
		init_WindowsAuthority();
		init_WindowsNativeLoader();
		init_providerStartupTimeout();
		init_analysisErrorCore();
		init_result();
		init_ownedProcessAvailability();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_resources();
		init_AnalysisClientFailure();
		init_JadxRelease();
		init_errorMessage();
		JAR_METADATA_READ_MAX_BYTES = 8 * 1024 * 1024;
		JADX_FAILURE_KINDS = [
			"windows_native_artifact",
			"windows_native_runtime",
			"java_runtime",
			"java_home",
			"jvm_options",
			"operation_timeout",
			"jar",
			"java_probe",
			"unsupported_host"
		];
		jadxFailureRemediation = (kind) => {
			switch (kind) {
				case "windows_native_artifact":
				case "windows_native_runtime": return JADX_WINDOWS_NATIVE_REMEDIATION;
				case "java_runtime":
				case "java_home": return JADX_JAVA_RUNTIME_REMEDIATION;
				case "jvm_options": return JADX_JVM_OPTIONS_REMEDIATION;
				case "operation_timeout": return JADX_OPERATION_TIMEOUT_REMEDIATION;
				case "jar": return JADX_JAR_CONFIGURATION_REMEDIATION;
				case "java_probe": return JADX_JAVA_PROBE_REMEDIATION;
				case "unsupported_host": return JADX_UNSUPPORTED_HOST_REMEDIATION;
			}
		};
		jadxFailureClassification = (kind, configured) => {
			const drift = configured ? "config_drift" : "missing_analysis_engine";
			switch (kind) {
				case "windows_native_artifact":
				case "java_runtime": return "missing_dependency";
				case "windows_native_runtime": return "runtime_failure";
				case "unsupported_host": return "unsupported_host";
				case "java_home":
				case "jvm_options":
				case "operation_timeout":
				case "jar":
				case "java_probe":
				case null: return drift;
			}
		};
		JadxConfigurationFailure = class extends Error {
			code;
			diagnostics;
			kind;
			constructor(code, message, diagnostics, kind, options) {
				super(message, options);
				this.code = code;
				this.diagnostics = diagnostics;
				this.kind = kind;
			}
		};
		inspectJadxAvailability = async (environment, options) => {
			try {
				const operationTimeoutMs = readOperationTimeout(environment, options.operationTimeoutMs);
				const configuration = await readJadxConfigurationInputs(environment, options.host, options.signal);
				await validateJadxConfigurationContents(configuration, environment, options);
				return {
					status: "available",
					code: null,
					reason: null,
					diagnostics: {
						configured: true,
						java_executable: configuration.java,
						jdk_compiler: true,
						jar_path: configuration.jar,
						operation_timeout_ms: operationTimeoutMs
					}
				};
			} catch (cause) {
				if (cause instanceof JadxInterruption) throw cancelledBy(options.operation ?? "inspect_jadx_configuration", carriedReason(cause.reason));
				if (cause instanceof JadxConfigurationFailure) return {
					status: "unavailable",
					code: cause.code,
					reason: cause.message,
					remediation: jadxFailureRemediation(cause.kind),
					diagnostics: {
						...cause.diagnostics,
						failure_kind: cause.kind
					}
				};
				const prerequisite = ownedProcessPrerequisiteAvailability(cause);
				if (prerequisite !== undefined) return prerequisite;
				throw cause;
			}
		};
		resolveJadxOperationTimeout = (environment, operation, runtimeTimeoutMs) => {
			try {
				return ok(readOperationTimeout(environment, runtimeTimeoutMs));
			} catch (cause) {
				if (!(cause instanceof JadxConfigurationFailure)) throw cause;
				return err(projectConfigurationFailure(operation, cause));
			}
		};
		resolveJadxConfigurationInputs = async (environment, operation, host, signal) => {
			try {
				return await readJadxConfigurationInputs(environment, host, signal);
			} catch (cause) {
				if (!(cause instanceof JadxConfigurationFailure)) throw cause;
				throw projectConfigurationFailure(operation, cause);
			}
		};
		validateJadxConfiguration = async (configuration, environment, operation, options) => {
			try {
				await validateJadxConfigurationContents(configuration, environment, {
					...options,
					operation
				});
			} catch (cause) {
				if (!(cause instanceof JadxConfigurationFailure)) throw cause;
				throw projectConfigurationFailure(operation, cause);
			}
		};
		readJadxConfigurationInputs = async (environment, host, signal) => {
			throwIfJadxInterrupted(signal);
			requireSupportedHost(host);
			const jar = await resolveJar(environment);
			const java = await resolveJava(environment, host.platform, signal);
			await requireJavaHomeExecutable(environment.JAVA_HOME, java);
			throwIfJadxInterrupted(signal);
			return {
				jar,
				java,
				jvmArguments: resolveJvmArguments(environment)
			};
		};
		validateJadxConfigurationContents = async (configuration, environment, options) => {
			throwIfJadxInterrupted(options.signal);
			await inspectJavaRuntime(configuration.java, environment, options);
			await requireEngineArchive(configuration.jar, options);
		};
		projectConfigurationFailure = (operation, cause) => {
			const output = cause.diagnostics;
			const { stdout: _stdout, stderr: _stderr, ...facts } = output;
			return new AnalysisCapabilityUnavailableError("jadx", operation, cause.message, {
				cause,
				userMessage: cause.message,
				diagnostics: {
					...facts,
					failure_kind: cause.kind,
					failure_code: cause.code
				},
				...typeof output.stdout === "string" && typeof output.stderr === "string" ? { capturedOutput: {
					stdout: output.stdout,
					stderr: output.stderr,
					truncated: output.output_truncated === true
				} } : {}
			});
		};
		requireEngineArchive = async (jar, options) => {
			const operation = options.operation ?? "inspect_jadx_configuration";
			try {
				await options.resourceOwner.run(() => withArtifactRegularFile(jar, { retain: ({ lease, resource }) => options.resourceOwner.retain({ close: () => lease.release() }, resource) }, options.signal, async ({ handle, initial }) => {
					try {
						const reader = new ZipArtifactReader(jar, "zip", JAR_METADATA_READ_MAX_BYTES, {
							handle,
							initial
						});
						const missing = new Set([
							"com/atxx/jhmcp/JadxSession.class",
							"com/atxx/jhmcp/SessionHolder.class",
							"jadx/api/JadxDecompiler.class",
							"com/google/gson/Gson.class",
							"io/modelcontextprotocol/kotlin/sdk/server/Server.class"
						]);
						for await (const entry of reader.entries(options.signal)) {
							if (entry.kind === "file" && !entry.encrypted) missing.delete(entry.path);
							if (missing.size === 0) return;
						}
						throw configurationFailure("unsupported_version", `REA_JADX_MCP_JAR ${jar} does not contain the required metadata bridge classes: ${[...missing].join(", ")}. ${JADX_JAR_CONFIGURATION_REMEDIATION}`, {
							jar_path: jar,
							phase: "jar-inspection",
							missing_classes: [...missing]
						}, "jar");
					} catch (cause) {
						if (cause instanceof JadxConfigurationFailure || cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") throw cause;
						throw archiveInspectionFailure(jar, cause);
					}
				}));
			} catch (cause) {
				if (cause instanceof ArtifactFileCleanupFailure) {
					const physical = cause.fileCleanupFailure;
					const cleanup = new ProviderCleanupError("jadx", [jar], {
						phase: "jar-inspection",
						...physical.outcome.kind === "completed" ? { archive_observation: {
							jar_path: jar,
							required_classes: true
						} } : {}
					}, {
						operation,
						cause: physical.cleanupCause
					});
					bindArtifactFileCleanup(cause, cleanup);
					const primary = physical.outcome.kind === "failed" ? archiveAnalysisFailure(jar, physical.outcome.cause, options) : physical.completionCancellation === undefined ? undefined : archiveCancellation(physical.completionCancellation.reason, options, { archive_observation: {
						jar_path: jar,
						required_classes: true
					} });
					if (primary === undefined) throw cleanup;
					throw analysisErrorWithCleanupDependencies(primary, cleanup, operation);
				}
				if (cause instanceof ArtifactFileCancelled) {
					throw archiveCancellation(cause.fileCancellation.reason, options, { archive_observation: {
						jar_path: jar,
						required_classes: true
					} });
				}
				if (cause instanceof ArtifactReaderFailure) {
					if (cause.reason === "cancelled") throw archiveCancellation(cause.cancellation?.reason, options);
					throw analysisClientFailureForOperation(cause, "jadx", operation);
				}
				if (cause instanceof AnalysisError || cause instanceof JadxConfigurationFailure) throw cause;
				throw archiveInspectionFailure(jar, cause);
			}
		};
		archiveInspectionFailure = (jar, cause) => {
			const reason = errorMessage(cause);
			return configurationFailure("version_unresolved", `Cannot inspect REA_JADX_MCP_JAR ${jar} as a Java archive: ${reason}. ${JADX_JAR_CONFIGURATION_REMEDIATION}`, {
				jar_path: jar,
				phase: "jar-inspection",
				archive_error: reason,
				maximum_metadata_read_bytes: JAR_METADATA_READ_MAX_BYTES
			}, "jar", cause);
		};
		archiveAnalysisFailure = (jar, cause, options) => {
			if (cause instanceof AnalysisError) return cause;
			if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") return archiveCancellation(cause.cancellation?.reason, options);
			return projectConfigurationFailure(options.operation ?? "inspect_jadx_configuration", cause instanceof JadxConfigurationFailure ? cause : archiveInspectionFailure(jar, cause));
		};
		archiveCancellation = (reason, options, diagnostics) => {
			const operation = options.operation ?? "inspect_jadx_configuration";
			return options.operationDeadline?.signal.aborted === true && reason === options.operationDeadline.signal.reason ? new AnalysisTimeoutError(operation, options.operationDeadline.timeoutMs, {
				cause: reason,
				diagnostics,
				...jadxOperationTimeoutGuidance(options.operationDeadline.timeoutMs)
			}) : cancelledBy(operation, carriedReason(reason), { diagnostics });
		};
		requireSupportedHost = (host) => {
			const { platform, architecture } = host;
			if (platform === "linux" || platform === "darwin") return;
			if (platform === "win32" && architecture === "x64") {
				const loaded = systemWindowsNativeAuthority(host);
				if (loaded.available) {
					if (loaded.authority.inspection.protocolStdin === true) return;
					throw configurationFailure("runtime_missing", "The bundled Windows native artifact lacks owned protocol stdin; use a matching current Windows x64 REA package.", {
						platform,
						architecture,
						phase: "process-ownership",
						owned_protocol_stdin: false
					}, "windows_native_artifact");
				}
				const readiness = inspectWindowsNativeReadiness(platform, loaded);
				throw configurationFailure(readiness.available ? "runtime_unavailable" : readiness.code, readiness.available ? "Windows native readiness disagreed with the native loader result." : readiness.reason, {
					platform,
					architecture,
					phase: "process-ownership",
					owned_protocol_stdin: false,
					...readiness.available ? {} : {
						failure_stage: readiness.failureStage,
						remediation: readiness.remediation
					}
				}, readiness.available ? "windows_native_runtime" : readiness.code === "unsupported_host" ? "unsupported_host" : readiness.code === "runtime_missing" ? "windows_native_artifact" : "windows_native_runtime");
			}
			throw configurationFailure("unsupported_host", `Android JADX subprocess ownership is unsupported on ${platform}/${architecture}; use Linux, macOS, or Windows x64 with its bundled native controls.`, { platform }, "unsupported_host");
		};
		resolveJar = async (environment) => {
			const jar = environment.REA_JADX_MCP_JAR;
			if (jar === undefined) throw configurationFailure("not_configured", JADX_JAR_CONFIGURATION_REMEDIATION, { jar_configured: false }, "jar");
			if (!isAbsolute(jar)) throw configurationFailure("open_options_invalid", `REA_JADX_MCP_JAR must be an absolute path; received ${JSON.stringify(jar)}. ${JADX_JAR_CONFIGURATION_REMEDIATION}`, {
				jar_configured: true,
				jar_path: jar,
				path_requirement: "absolute"
			}, "jar");
			try {
				await access(jar, constants.R_OK);
				if (!(await stat(jar)).isFile()) throw configurationFailure("executable_missing", `REA_JADX_MCP_JAR is not a regular file: ${jar}`, { jar_path: jar }, "jar");
				return await realpath(jar);
			} catch (cause) {
				if (cause instanceof JadxConfigurationFailure) throw cause;
				throw configurationFailure("executable_missing", `Cannot read REA_JADX_MCP_JAR ${jar}: ${errorMessage(cause)}`, { jar_path: jar }, "jar", cause);
			}
		};
		resolveJava = async (environment, platform, signal) => {
			const windows = platform === "win32";
			const executable = windows ? "java.exe" : "java";
			if (environment.JAVA_HOME === undefined) {
				const windowsSearch = windows ? windowsPathCandidates(executable, environment) : undefined;
				const candidates = windowsSearch === undefined ? posixPathCandidates(executable, environment.PATH ?? "/usr/bin:/bin", { relativeEntries: "resolve" }) : windowsSearch.ok ? windowsSearch.value : [];
				for (const { path: candidate } of candidates) {
					throwIfJadxInterrupted(signal);
					try {
						await access(candidate, windows ? constants.R_OK | constants.X_OK : constants.X_OK);
						if ((await stat(candidate)).isFile()) return windows ? await realpath(candidate) : candidate;
					} catch (cause) {
						if (typeof cause === "object" && cause !== null && "code" in cause && (cause.code === "ENOENT" || cause.code === "ENOTDIR" || !windows && (cause.code === "EACCES" || cause.code === "EPERM"))) continue;
						throw configurationFailure("runtime_missing", `Cannot inspect selected Java executable ${candidate}: ${errorMessage(cause)}`, { java_executable: candidate }, "java_runtime", cause);
					}
				}
				throw configurationFailure("runtime_missing", `Cannot find an executable ${executable} on the selected ${windows ? "Windows " : ""}PATH. Select a full JDK with JAVA_HOME or PATH, then verify it with java --list-modules. REA does not install Java.`, {
					java_executable: executable,
					phase: "path-lookup"
				}, "java_runtime");
			}
			if ((windows ? win32 : posix).isAbsolute(environment.JAVA_HOME)) return appendCallerPath(environment.JAVA_HOME, `bin/${executable}`, platform);
			throw configurationFailure("open_options_invalid", "JAVA_HOME must select an existing JDK by absolute path; omit it to use java on PATH.", { java_home: environment.JAVA_HOME }, "java_home");
		};
		requireJavaHomeExecutable = async (javaHome, java) => {
			if (javaHome === undefined) return;
			try {
				await access(java, constants.R_OK | constants.X_OK);
				if ((await stat(java)).isFile()) return;
				throw configurationFailure("runtime_missing", `JAVA_HOME java is not a regular file: ${java}`, { java_executable: java }, "java_runtime");
			} catch (cause) {
				if (cause instanceof JadxConfigurationFailure) throw cause;
				throw configurationFailure("runtime_missing", `Cannot execute JAVA_HOME java ${java}: ${errorMessage(cause)}`, { java_executable: java }, "java_runtime", cause);
			}
		};
		JADX_JVM_NUMERIC_MINIMUM = 1;
		JADX_JVM_DEFAULT = null;
		JADX_HEAP_MIB_MAXIMUM = Number.MAX_SAFE_INTEGER;
		JADX_ACTIVE_PROCESSOR_COUNT_MAXIMUM = 2147483647;
		jadxJvmBounds = (name) => name === "REA_JADX_HEAP_MIB" ? {
			defaultValue: null,
			minimum: 1,
			maximum: JADX_HEAP_MIB_MAXIMUM
		} : {
			defaultValue: null,
			minimum: 1,
			maximum: JADX_ACTIVE_PROCESSOR_COUNT_MAXIMUM
		};
		resolveJvmArguments = (environment) => {
			const result = [];
			for (const [name, prefix, suffix] of [[
				"REA_JADX_HEAP_MIB",
				"-Xmx",
				"m"
			], [
				"REA_JADX_ACTIVE_PROCESSOR_COUNT",
				"-XX:ActiveProcessorCount=",
				""
			]]) {
				const bounds = jadxJvmBounds(name);
				const selected = environment[name] ?? (bounds.defaultValue === null ? undefined : String(bounds.defaultValue));
				if (selected === undefined) continue;
				const parsed = /^[1-9]\d*$/u.test(selected) && Number.isSafeInteger(Number(selected)) ? Number(selected) : undefined;
				if (parsed === undefined || parsed < bounds.minimum) throw configurationFailure("open_options_invalid", `${name} must be a positive safe integer; received ${selected}.`, {
					setting: name,
					value: selected
				}, "jvm_options");
				if (parsed > bounds.maximum) throw configurationFailure("open_options_invalid", name === "REA_JADX_ACTIVE_PROCESSOR_COUNT" ? `${name} exceeds the JVM's signed 32-bit processor-count range.` : `${name} must be a positive safe integer; received ${selected}.`, {
					setting: name,
					value: selected
				}, "jvm_options");
				result.push(`${prefix}${selected}${suffix}`);
			}
			return result;
		};
		readOperationTimeout = (environment, runtimeTimeoutMs) => {
			if (runtimeTimeoutMs !== undefined) return runtimeTimeoutMs;
			const value = environment.REA_JADX_OPERATION_TIMEOUT_MS;
			if (value === undefined) return DEFAULT_JADX_OPERATION_TIMEOUT_MS;
			const parsed = providerStartupTimeoutSchema.safeParse(value);
			if (parsed.success) return parsed.data;
			throw configurationFailure("open_options_invalid", `REA_JADX_OPERATION_TIMEOUT_MS must be a decimal millisecond count from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}; received ${value}.`, {
				setting: "REA_JADX_OPERATION_TIMEOUT_MS",
				value
			}, "operation_timeout");
		};
		inspectJavaRuntime = async (java, environment, options) => {
			const result = await inspectJadxJava(java, environment, options);
			if (!result.ok) {
				const failure = result.error;
				throw configurationFailure(failure.code, failure.message, failure.diagnostics, failure.kind, failure.inspectionFailure);
			}
		};
		configurationFailure = (code, message, diagnostics, kind, cause) => new JadxConfigurationFailure(code, message, diagnostics, kind, cause === undefined ? undefined : { cause });
	})))();
}

//#endregion
export { JADX_BRIDGE_SOURCE_URL, JADX_FAILURE_KINDS, JADX_HEAP_REMEDIATION, JADX_JAR_CONFIGURATION_REMEDIATION, JADX_LIMITATIONS, JADX_PROVIDER_IDENTITY, JADX_RELEASE, JadxInterruption, init_JadxConfiguration, init_JadxInterruption, init_JadxOperationTimeout, init_JadxRelease, inspectJadxAvailability, jadxBridgeIdentity, jadxFailureClassification, jadxOperationTimeoutGuidance, resolveJadxConfigurationInputs, resolveJadxOperationTimeout, throwIfJadxInterrupted, validateJadxConfiguration };