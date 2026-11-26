import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { a as init_snapshotEnvironment, i as providerStartupTimeoutSchema, o as mergeEnvironmentOverrides, r as init_providerStartupTimeout, s as snapshotEnvironment, t as DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS } from "./providerStartupTimeout-D-0ufAK2.js";
import { K as init_safeJson, Sn as init_callerPath, Tn as init_HostPlatform, q as safeParseJson, wn as HOST_PLATFORM, xn as appendCallerPath } from "./analysisErrorProjection-B0_t_nHz.js";
import { a as primaryAnalysisError, i as init_analysisErrorBase } from "./analysisErrorBase-C0hMa0_b.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { $t as init_analysisResourceLimits, Jt as MAX_NODE_TIMER_DELAY_MS, o as jsonValueSchema, r as init_jsonValue, v as init_isRecord, y as isRecord } from "./jsonValue-BIEmjG1z.js";
import { it as sha256Hex, rt as init_sha256Hex } from "./canonicalDigest-DUQN3Yyz.js";
import { _ as init_analysisErrorCore, a as AnalysisCapabilityUnavailableError, i as AnalysisCancelledError, p as OwnerCancellation } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_errorMessage, t as errorMessage } from "./errorMessage-rfGn5D1_.js";
import { n as init_strictUtf8, r as isStrictUtf8 } from "./strictUtf8-Cx_KgW8Z.js";
import { r as init_unicodeCodePointOrder, t as compareUnicodeCodePoints } from "./unicodeCodePointOrder-BezCbTpg.js";
import { a as init_providerCleanupError, i as ProviderCleanupError, n as isAbortOf, t as init_SignalAbort } from "./SignalAbort-CPFWtyzs.js";
import { Br as analysisErrorWithCleanupDependencies, Er as excerptText, Or as init_excerpt, Un as init_AnalysisCleanupLease, Vn as AnalysisCleanupLease, Wr as init_analysisErrorCleanup, _r as OwnedFileHandle, ar as withOwnedRegularFile, cr as RegularFileChangedError, dr as assertStableRegularFileIdentity, er as RegularFileCancelled, fr as init_RegularFile, hn as readFileHandleChunks, ir as withOwnedFileHandle, lr as RegularFileOperationCancelled, mn as init_readFileHandleChunks, nr as init_OwnedRegularFile, pn as FileReadCancelled, rr as regularFileCancellation, t as init_resources, tr as RegularFileCleanupFailure, ur as assertRegularFileActive, vr as init_OwnedFileHandle } from "./resources-C5FMDwcC.js";
import { f as init_dosMz, i as readPeOptionalHeaderIdentity, l as readPeCoffHeader, m as observeMzWindowsHeader, s as init_peCoffHeader, t as init_peOptionalHeader } from "./peOptionalHeader-CeaiI83J.js";
import { n as init_ProviderDeadline, r as waitForAbortableDelay, t as ProviderStartupDeadline } from "./ProviderDeadline-DNC6uvib.js";
import { createRequire } from "node:module";
import { constants, readFileSync, rmSync, writeSync } from "node:fs";
import { basename, dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { isUtf8 } from "node:buffer";
import { promisify } from "node:util";
import { access, chmod, copyFile, lstat, mkdir, mkdtemp, open, readFile, readlink, realpath, rename, rm, stat, writeFile } from "node:fs/promises";
import { setTimeout as setTimeout$1 } from "node:timers/promises";
import { release, tmpdir } from "node:os";
import { PassThrough, Transform, Writable, finished } from "node:stream";
import { EventEmitter } from "node:events";
import { pipeline as pipeline$1 } from "node:stream/promises";
import { PACKAGE_METADATA } from "../generatedPackageMetadata.js";
import { execFile, spawn } from "node:child_process";
import { performance } from "node:perf_hooks";

//#region dist/domain/analysisErrorCancellation.js
var analysisErrorWithCancellation;
function init_analysisErrorCancellation() {
	return (init_analysisErrorCancellation = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		analysisErrorWithCancellation = (failure, cancellation) => {
			if (failure === undefined) return cancellation;
			const primary = primaryAnalysisError(failure);
			if (!(primary instanceof AnalysisCancelledError) && !primary.secondaryFailures.some((secondary) => secondary instanceof AnalysisCancelledError && Object.is(secondary.cause, cancellation.cause))) primary.retainSecondaryFailure(cancellation);
			return failure;
		};
	})))();
}

//#endregion
//#region dist/domain/runtimeControlUnavailableError.js
var RuntimeControlUnavailableError, runtimeControlCapabilityError;
function init_runtimeControlUnavailableError() {
	return (init_runtimeControlUnavailableError = __esmMin((() => {
		init_analysisErrorCore();
		RuntimeControlUnavailableError = class extends Error {
			retryable;
			/** Caller-facing recovery, when the owner knows a specific one. */
			remediationAction;
			constructor(message, options) {
				super(message, options);
				this.retryable = options?.retryable ?? false;
				this.remediationAction = options?.remediationAction;
			}
		};
		runtimeControlCapabilityError = (providerId, operation, cause) => new AnalysisCapabilityUnavailableError(providerId, operation, cause.message, {
			cause,
			retryable: cause.retryable,
			...cause.remediationAction === undefined ? {} : {
				userMessage: cause.message,
				remediationAction: cause.remediationAction
			}
		});
	})))();
}

//#endregion
//#region dist/domain/windowsNativeArtifact.js
var WINDOWS_NATIVE_ARTIFACT, WindowsNativeArtifactError, parseWindowsNativeManifest, validateWindowsX64Artifact, validateWindowsNativeArtifact, createWindowsNativeManifest;
function init_windowsNativeArtifact() {
	return (init_windowsNativeArtifact = __esmMin((() => {
		init_dosMz();
		init_peCoffHeader();
		init_peOptionalHeader();
		init_result();
		init_sha256Hex();
		WINDOWS_NATIVE_ARTIFACT = {
			platform: "win32",
			architecture: "x64",
			abiVersion: 1,
			nodeApiVersion: 8,
			artifact: "rea-windows-x64.node"
		};
		WindowsNativeArtifactError = class extends Error {
			_tag = "WindowsNativeArtifactError";
		};
		parseWindowsNativeManifest = (value, packageVersion) => {
			if (value === null || typeof value !== "object" || Array.isArray(value)) return err(new WindowsNativeArtifactError("Windows native artifact manifest must be an object"));
			const manifest = value;
			const keys = [
				"packageVersion",
				...Object.keys(WINDOWS_NATIVE_ARTIFACT),
				"artifactSha256"
			];
			if (Object.keys(manifest).length !== keys.length || keys.some((key) => !Object.hasOwn(manifest, key))) return err(new WindowsNativeArtifactError("Windows native artifact manifest has missing or unknown fields"));
			for (const [key, expected] of Object.entries(WINDOWS_NATIVE_ARTIFACT)) if (manifest[key] !== expected) return err(new WindowsNativeArtifactError(`Windows native artifact manifest has an invalid ${key}`));
			if (typeof manifest.packageVersion !== "string") return err(new WindowsNativeArtifactError("Windows native artifact manifest has an invalid packageVersion"));
			if (typeof manifest.artifactSha256 !== "string" || !/^[a-f0-9]{64}$/u.test(manifest.artifactSha256)) return err(new WindowsNativeArtifactError("Windows native artifact manifest has an invalid artifactSha256"));
			if (manifest.packageVersion !== packageVersion) return err(new WindowsNativeArtifactError("Windows native artifact belongs to another REA version"));
			return ok({
				...WINDOWS_NATIVE_ARTIFACT,
				packageVersion: manifest.packageVersion,
				artifactSha256: manifest.artifactSha256
			});
		};
		validateWindowsX64Artifact = (bytes) => {
			if (bytes.length < 64 || bytes.toString("latin1", 0, 2) !== "MZ") return err(new WindowsNativeArtifactError("Windows native artifact is not a PE image"));
			const observed = observeMzWindowsHeader(bytes);
			if (observed.state !== "declared" || observed.signature !== "PE") return err(new WindowsNativeArtifactError("Windows native artifact is not a Windows x64 PE32+ image"));
			const offset = observed.offset;
			const coff = readPeCoffHeader(bytes.subarray(offset + 4, offset + 24));
			if (!coff.ok || coff.value.machine !== 34404 || coff.value.optionalHeaderSize > bytes.length - offset - 24) return err(new WindowsNativeArtifactError("Windows native artifact is not a Windows x64 PE32+ image"));
			const optional = readPeOptionalHeaderIdentity(bytes.subarray(offset + 24, offset + 24 + coff.value.optionalHeaderSize));
			if (!optional.ok || optional.value.bits !== 64) return err(new WindowsNativeArtifactError("Windows native artifact is not a Windows x64 PE32+ image"));
			return ok(undefined);
		};
		validateWindowsNativeArtifact = (manifest, bytes) => {
			if (sha256Hex(bytes) !== manifest.artifactSha256) return err(new WindowsNativeArtifactError("Windows native artifact SHA-256 does not match package metadata"));
			return validateWindowsX64Artifact(bytes);
		};
		createWindowsNativeManifest = (packageVersion, bytes) => {
			const valid = validateWindowsX64Artifact(bytes);
			if (!valid.ok) return valid;
			return parseWindowsNativeManifest({
				...WINDOWS_NATIVE_ARTIFACT,
				packageVersion,
				artifactSha256: sha256Hex(bytes)
			}, packageVersion);
		};
	})))();
}

//#endregion
//#region dist/windows/WindowsNativeLoader.js
var windowsHandleSchema, windowsFileIdentitySchema, inspectionSchema, bindingSchema, missingWindowsNativeFileReason, WINDOWS_NATIVE_LOAD_REFUSED_REMEDIATION, windowsNativeFailureRemediation, WindowsNativeAuthorityUnavailableError, readPackagedWindowsNativeFile, loadWindowsNativeAuthority, cached, loadPackagedWindowsNativeAuthority, systemWindowsNativeAuthority, requireWindowsNativeAuthority;
function init_WindowsNativeLoader() {
	return (init_WindowsNativeLoader = __esmMin((() => {
		init_HostPlatform();
		init_windowsNativeArtifact();
		init_runtimeControlUnavailableError();
		init_errorMessage();
		windowsHandleSchema = z.custom((value) => isRecord(value));
		windowsFileIdentitySchema = z.strictObject({
			requestedPath: z.string(),
			finalPath: z.string(),
			filesystem: z.enum(["NTFS", "ReFS"]),
			volumeSerial: z.string().regex(/^[a-f0-9]{16}$/u),
			fileId: z.string().regex(/^[a-f0-9]{32}$/u),
			size: z.int().nonnegative().max(Number.MAX_SAFE_INTEGER),
			directory: z.boolean()
		});
		inspectionSchema = z.strictObject({
			abiVersion: z.literal(WINDOWS_NATIVE_ARTIFACT.abiVersion),
			nodeApiVersion: z.literal(WINDOWS_NATIVE_ARTIFACT.nodeApiVersion),
			architecture: z.literal(WINDOWS_NATIVE_ARTIFACT.architecture),
			filesystem: windowsFileIdentitySchema,
			privateDacl: z.literal(true),
			privateBridgeDescriptorAccess: z.literal(true),
			atomicJobAssignment: z.literal(true),
			killOnOwnerClose: z.literal(true),
			protocolStdin: z.boolean().optional(),
			/** Absent from artifacts built before owned Job Object commit limits. */
			jobMemoryLimit: z.literal(true).optional(),
			/** Absent from artifacts built before transient private-runtime writes. */
			runtimeWriteTransient: z.literal(true).optional()
		});
		bindingSchema = z.strictObject({ call: z.custom((value) => typeof value === "function") });
		missingWindowsNativeFileReason = (file) => `Missing packaged Windows native file native/windows/build/${file} (ENOENT). Restore both native/windows/build/manifest.json and native/windows/build/rea-windows-x64.node from the rea-agents@${PACKAGE_METADATA.version} tarball only when this checkout matches that published release's native contract. Matching package version alone is insufficient; otherwise build them from this exact source checkout using native/windows/README.md. No native artifact was loaded.`;
		WINDOWS_NATIVE_LOAD_REFUSED_REMEDIATION = "The file matched the package manifest, so restoring or reinstalling it will not help. If Windows reports that an Application Control policy blocked the file, Smart App Control or an App Control for Business policy refused it. Windows native controls, which Ghidra and JADX need on Windows, stay unavailable; rea setup can still register clients. Run REA on a host whose policy allows this file, or ask the REA maintainers about a signed build.";
		windowsNativeFailureRemediation = (failureStage) => failureStage === "host" ? "Use a Windows x64 host and a supported Node.js runtime with Node-API 8 or newer." : failureStage === "load" ? WINDOWS_NATIVE_LOAD_REFUSED_REMEDIATION : failureStage === "artifact" ? "Use the matching published Windows x64 REA package. Restore native/windows/build/manifest.json and native/windows/build/rea-windows-x64.node from a same-version rea-agents tarball only for its corresponding release source. Matching package version alone is insufficient for an unreleased checkout; otherwise build them from this exact source checkout using native/windows/README.md. The loader checks version, ABI, architecture, and digest before granting authority; no download or install is performed automatically." : failureStage === "inspection" ? "Install the matching Windows x64 REA package; its native inspection must prove every required security control." : "Inspect the preserved native self-test error. Check that the process has a writable local NTFS/ReFS temporary directory and that its filesystem, DACL, Job Object, and cleanup operations are permitted. Resolve the reported constraint, then rerun rea doctor; reinstalling Ghidra or Java cannot fix this self-test.";
		WindowsNativeAuthorityUnavailableError = class extends RuntimeControlUnavailableError {
			code = "windows-native-authority-unavailable";
			failureStage;
			constructor(loaded) {
				super(loaded.reason, {
					retryable: loaded.retryable === true,
					remediationAction: windowsNativeFailureRemediation(loaded.failureStage)
				});
				this.name = "WindowsNativeAuthorityUnavailableError";
				this.failureStage = loaded.failureStage;
			}
		};
		readPackagedWindowsNativeFile = (file, read) => {
			try {
				return read();
			} catch (cause) {
				if (typeof cause === "object" && cause !== null && "code" in cause && cause.code === "ENOENT") throw new Error(missingWindowsNativeFileReason(file), { cause });
				throw cause;
			}
		};
		loadWindowsNativeAuthority = (host) => {
			if (host.platform !== "win32" || host.architecture !== "x64") return {
				available: false,
				failureStage: "host",
				reason: "REA Windows native controls require a Windows x64 host."
			};
			const nodeApiVersion = Number(host.nodeApiVersion);
			if (!Number.isSafeInteger(nodeApiVersion) || nodeApiVersion < WINDOWS_NATIVE_ARTIFACT.nodeApiVersion) return {
				available: false,
				failureStage: "host",
				reason: "REA Windows native controls require Node-API 8 or newer."
			};
			try {
				const manifest = parseWindowsNativeManifest(readPackagedWindowsNativeFile("manifest.json", () => host.readManifest()), host.packageVersion);
				if (!manifest.ok) throw manifest.error;
				const artifact = readPackagedWindowsNativeFile(WINDOWS_NATIVE_ARTIFACT.artifact, () => host.readArtifact());
				const valid = validateWindowsNativeArtifact(manifest.value, artifact);
				if (!valid.ok) throw valid.error;
				let loadedModule;
				try {
					loadedModule = host.loadArtifact();
				} catch (cause) {
					return {
						available: false,
						failureStage: "load",
						reason: `REA Windows native controls are unavailable: Windows refused to load the verified native/windows/build/rea-windows-x64.node: ${errorMessage(cause)} ${WINDOWS_NATIVE_LOAD_REFUSED_REMEDIATION}`
					};
				}
				const binding = bindingSchema.parse(loadedModule);
				let observed;
				try {
					observed = binding.call("inspect", []);
				} catch (cause) {
					return {
						available: false,
						failureStage: "self-test",
						retryable: true,
						reason: `REA Windows native self-test failed: ${errorMessage(cause)}`
					};
				}
				const parsed = inspectionSchema.safeParse(observed);
				if (!parsed.success) return {
					available: false,
					failureStage: "inspection",
					reason: `REA Windows native inspection is invalid: ${parsed.error.message}`
				};
				const inspection = parsed.data;
				return {
					available: true,
					authority: {
						call: binding.call,
						inspection
					}
				};
			} catch (cause) {
				return {
					available: false,
					failureStage: "artifact",
					reason: `REA Windows native controls are unavailable: ${errorMessage(cause)}`
				};
			}
		};
		;
		loadPackagedWindowsNativeAuthority = ({ platform, architecture }) => loadWindowsNativeAuthority({
			platform,
			architecture,
			nodeApiVersion: process.versions.napi,
			packageVersion: PACKAGE_METADATA.version,
			readManifest: () => {
				const encoded = readFileSync(new URL("../../native/windows/build/manifest.json", new URL("../windows/WindowsNativeLoader.js", import.meta.url).href), "utf8");
				const value = JSON.parse(encoded);
				return value;
			},
			readArtifact: () => readFileSync(new URL("../../native/windows/build/rea-windows-x64.node", new URL("../windows/WindowsNativeLoader.js", import.meta.url).href)),
			loadArtifact: () => {
				const value = createRequire(new URL("../windows/WindowsNativeLoader.js", import.meta.url).href)(fileURLToPath(new URL("../../native/windows/build/rea-windows-x64.node", new URL("../windows/WindowsNativeLoader.js", import.meta.url).href)));
				return value;
			}
		});
		systemWindowsNativeAuthority = (host = HOST_PLATFORM) => {
			if (host !== HOST_PLATFORM) return loadPackagedWindowsNativeAuthority(host);
			if (cached?.available === false && cached.retryable === true) cached = undefined;
			cached ??= loadPackagedWindowsNativeAuthority(host);
			return cached;
		};
		requireWindowsNativeAuthority = () => {
			const loaded = systemWindowsNativeAuthority();
			if (!loaded.available) throw new WindowsNativeAuthorityUnavailableError(loaded);
			return loaded.authority;
		};
	})))();
}

//#endregion
//#region dist/windows/WindowsOwnedProcess.js
var launchSchema, pollSchema, limitedPollSchema, NATIVE_CONTROL_NAMES, WindowsNativeControlUnavailableError, WINDOWS_EXECUTABLE_SPAWN_CONSTRAINTS, WINDOWS_CONTROL_SPAWN_CONSTRAINTS, WINDOWS_SPAWN_CONTROL_REMEDIATION, WindowsNativeSpawnControlError, isWindowsExecutableLaunchFailure, windowsExecutableLaunchPath, windowsNativeSpawnControlError, quoteWindowsProcessArgument, POLL_RETRY_MS, WindowsOwnedProcess;
function init_WindowsOwnedProcess() {
	return (init_WindowsOwnedProcess = __esmMin((() => {
		init_runtimeControlUnavailableError();
		init_WindowsNativeLoader();
		init_errorMessage();
		launchSchema = z.strictObject({
			pid: z.int().positive().max(4294967295),
			handle: windowsHandleSchema,
			jobAssigned: z.literal(true),
			killOnOwnerClose: z.literal(true)
		});
		pollSchema = z.strictObject({
			stdout: z.instanceof(Buffer),
			stderr: z.instanceof(Buffer),
			stdoutEnded: z.boolean(),
			stderrEnded: z.boolean(),
			exitCode: z.int().nonnegative().max(4294967295).nullable(),
			activeProcesses: z.int().nonnegative()
		});
		limitedPollSchema = pollSchema.extend({
			memoryLimitReached: z.boolean(),
			peakJobMemoryBytes: z.int().nonnegative().max(Number.MAX_SAFE_INTEGER)
		});
		NATIVE_CONTROL_NAMES = {
			"protocol-stdin": "owned protocol stdin",
			"job-memory-limit": "Job Object memory limits"
		};
		WindowsNativeControlUnavailableError = class extends RuntimeControlUnavailableError {
			control;
			code = "windows-native-control-unavailable";
			constructor(control) {
				super(`The bundled Windows native artifact does not support ${NATIVE_CONTROL_NAMES[control]}; use a matching current Windows x64 REA package.`, { remediationAction: "Install the matching current Windows x64 REA package; its native inspection must prove this control. REA does not launch without it, so retrying the unchanged installation will not succeed." });
				this.control = control;
				this.name = "WindowsNativeControlUnavailableError";
			}
		};
		WINDOWS_EXECUTABLE_SPAWN_CONSTRAINTS = new Set(["Create process atomically inside owned Job Object failed", "Owned Windows process requires an absolute executable path"]);
		WINDOWS_CONTROL_SPAWN_CONSTRAINTS = [
			"Wrong native process launch argument count",
			"Job memory limit must be a positive safe integer",
			"Job memory limit must be a whole number of pages",
			"Create owned Job Object failed",
			"Apply kill-on-owner-close Job Object policy failed",
			"Read Job Object policy failed",
			"Job Object policy permits unexpected breakaway",
			"Job Object memory limit was not applied exactly",
			"Create owned Job Object notification port failed",
			"Associate owned Job Object notification port failed",
			"Create owned process output pipe failed",
			"Protect parent process pipe handle inheritance failed",
			"Open owned process null input failed",
			"Initialize process attributes failed",
			"Windows atomic process attribute is unavailable",
			"Invalid child environment name",
			"Empty child environment entry",
			"Compare Windows environment names failed",
			"Open suspended process default-owner token failed",
			"Read suspended process user identity failed",
			"Set suspended process file owner failed",
			"Read caller process affinity failed",
			"Preserve caller process affinity failed",
			"Caller CPU affinity cannot bound an owned process in another processor group",
			"Preserve caller process priority failed",
			"Suspended process has no owned Job Object membership",
			"Resume job-owned process failed"
		];
		WINDOWS_SPAWN_CONTROL_REMEDIATION = "Inspect the preserved Windows native process launch control error. Ensure the host permits owned Job Object assignment, token normalization, pipe inheritance, and caller CPU affinity/priority preservation across processor groups, then retry.";
		WindowsNativeSpawnControlError = class extends RuntimeControlUnavailableError {
			code = "windows-native-spawn-control-unavailable";
			constraint;
			win32Code;
			constructor(cause, message) {
				const constraint = cause instanceof Error && typeof Reflect.get(cause, "constraint") === "string" ? Reflect.get(cause, "constraint") : undefined;
				const win32Code = cause instanceof Error && typeof Reflect.get(cause, "win32Code") === "number" ? Reflect.get(cause, "win32Code") : undefined;
				super(message ?? errorMessage(cause), {
					cause,
					retryable: true,
					remediationAction: WINDOWS_SPAWN_CONTROL_REMEDIATION
				});
				this.name = "WindowsNativeSpawnControlError";
				this.constraint = constraint;
				this.win32Code = win32Code;
			}
		};
		isWindowsExecutableLaunchFailure = (cause) => {
			if (!(cause instanceof Error)) return false;
			const constraint = Reflect.get(cause, "constraint");
			if (typeof constraint === "string" && constraint.length > 0) {
				return WINDOWS_EXECUTABLE_SPAWN_CONSTRAINTS.has(constraint);
			}
			if ([...WINDOWS_EXECUTABLE_SPAWN_CONSTRAINTS].some((prefix) => cause.message.startsWith(prefix))) {
				return true;
			}
			if (WINDOWS_CONTROL_SPAWN_CONSTRAINTS.some((prefix) => cause.message.startsWith(prefix))) {
				return false;
			}
			const code = Reflect.get(cause, "code");
			return typeof code === "string" && code !== "ERR_REA_WINDOWS_NATIVE";
		};
		windowsExecutableLaunchPath = (cause) => {
			if (!(cause instanceof Error)) return undefined;
			const constraint = Reflect.get(cause, "constraint");
			const requestedPath = Reflect.get(cause, "requestedPath");
			return typeof constraint === "string" && WINDOWS_EXECUTABLE_SPAWN_CONSTRAINTS.has(constraint) && typeof requestedPath === "string" && requestedPath.length > 0 ? requestedPath : undefined;
		};
		windowsNativeSpawnControlError = (cause) => {
			if (cause instanceof WindowsNativeSpawnControlError) return cause;
			if (!(cause instanceof Error)) return undefined;
			const constraint = Reflect.get(cause, "constraint");
			if (typeof constraint === "string" && constraint.length > 0) {
				return WINDOWS_EXECUTABLE_SPAWN_CONSTRAINTS.has(constraint) ? undefined : new WindowsNativeSpawnControlError(cause);
			}
			if (WINDOWS_CONTROL_SPAWN_CONSTRAINTS.some((prefix) => cause.message.startsWith(prefix))) {
				return new WindowsNativeSpawnControlError(cause);
			}
			return undefined;
		};
		quoteWindowsProcessArgument = (value) => {
			if (value.includes("\0")) throw new TypeError("Windows process argument contains NUL");
			return `"${value.replace(/(\\*)"/gu, "$1$1\\\"").replace(/(\\+)$/u, "$1$1")}"`;
		};
		POLL_RETRY_MS = 250;
		WindowsOwnedProcess = class extends EventEmitter {
			stdout = new PassThrough();
			stderr = new PassThrough();
			stdin;
			signalCode = null;
			exitCode = null;
			pid;
			#handle;
			#authority;
			#settled;
			#settle;
			#closed = false;
			#releasePending = false;
			#failure;
			#timer;
			#blockedWake;
			#blockedOutput = new Set();
			#unreferenced = false;
			#cleanup;
			#memoryLimitBytes;
			#memoryLimitReached = false;
			#peakJobMemoryBytes;
			#outputIncomplete = false;
			constructor(command, arguments_, cwd, environment, verbatim, options = {}) {
				super();
				const protocolStdin = options.protocolStdin === true;
				this.#memoryLimitBytes = options.memoryLimitBytes;
				this.#authority = options.authority ?? requireWindowsNativeAuthority();
				if (protocolStdin && this.#authority.inspection.protocolStdin !== true) throw new WindowsNativeControlUnavailableError("protocol-stdin");
				if (this.#memoryLimitBytes !== undefined && this.#authority.inspection.jobMemoryLimit !== true) throw new WindowsNativeControlUnavailableError("job-memory-limit");
				const entries = Object.entries(environment).filter((entry) => entry[1] !== undefined).map(([key, value]) => `${key}=${value}`);
				const line = [quoteWindowsProcessArgument(command.replaceAll("/", "\\")), ...arguments_.map((value) => verbatim ? value : quoteWindowsProcessArgument(value))].join(" ");
				let controls = protocolStdin ? [true] : [];
				if (this.#memoryLimitBytes !== undefined) controls = [protocolStdin, this.#memoryLimitBytes];
				let spawned;
				try {
					spawned = this.#authority.call("process_spawn", [
						command,
						line,
						cwd ?? "",
						entries,
						...controls
					]);
				} catch (cause) {
					if (isWindowsExecutableLaunchFailure(cause)) throw cause;
					throw new WindowsNativeSpawnControlError(cause);
				}
				let launched;
				try {
					launched = this.#memoryLimitBytes === undefined ? launchSchema.parse(spawned) : launchSchema.extend({ jobMemoryLimitBytes: z.literal(this.#memoryLimitBytes) }).parse(spawned);
				} catch (cause) {
					throw new WindowsNativeSpawnControlError(cause, "Windows native process launch did not confirm required Job Object controls.");
				}
				this.pid = launched.pid;
				this.#handle = launched.handle;
				this.stdin = protocolStdin ? new Writable({
					write: (chunk, _encoding, callback) => {
						void this.#writeInput(chunk).then(() => callback(), (cause) => callback(cause instanceof Error ? cause : new Error(String(cause))));
					},
					final: (callback) => {
						try {
							this.#authority.call("process_stdin_close", [this.#handle]);
							callback();
						} catch (cause) {
							callback(cause instanceof Error ? cause : new Error(String(cause)));
						}
					},
					destroy: (cause, callback) => {
						try {
							if (!this.#closed) this.#authority.call("process_stdin_close", [this.#handle]);
							callback(cause);
						} catch (failure) {
							callback(failure instanceof Error ? failure : new Error(String(failure)));
						}
					}
				}) : null;
				this.#settled = new Promise((resolve) => {
					this.#settle = resolve;
				});
				this.#schedule();
			}
			/** Whether the job reported reaching its commit limit; sticky once observed. */
			get memoryLimitReached() {
				return this.#memoryLimitReached;
			}
			/** Latest observed peak job commit; undefined for an unlimited job. */
			get peakJobMemoryBytes() {
				return this.#peakJobMemoryBytes;
			}
			/** True when cleanup destroyed a backpressured stream before all output was observed. */
			get outputIncomplete() {
				return this.#outputIncomplete;
			}
			async #writeInput(chunk) {
				const bytes = z.instanceof(Buffer).parse(chunk);
				const written = z.int().nonnegative().max(Number.MAX_SAFE_INTEGER).parse(await this.#authority.call("process_stdin_write", [this.#handle, bytes]));
				if (written !== bytes.length) throw new Error("Owned Windows input write did not preserve all requested bytes");
			}
			/** Terminate the retained job, never a PID supplied by another caller. */
			kill(signal) {
				if (signal === 0) return !this.#closed && z.number().parse(this.#authority.call("process_alive", [this.#handle])) > 0;
				return this.#closed ? false : z.boolean().parse(this.#authority.call("process_terminate", [this.#handle]));
			}
			/** Terminate and verify that the entire job has settled before releasing it. */
			cleanup() {
				this.#cleanup ??= this.#stop().then((result) => {
					if (!result.cleaned) this.#cleanup = undefined;
					return result;
				});
				return this.#cleanup;
			}
			/** Release event-loop references so unsettled jobs do not prevent host exit. */
			unref() {
				this.#unreferenced = true;
				this.#timer?.unref();
				this.#blockedWake?.unref();
			}
			/** Restore event-loop references when retrying process lifecycle observation. */
			ref() {
				this.#unreferenced = false;
				this.#timer?.ref();
				this.#blockedWake?.ref();
			}
			async #stop() {
				if (this.#closed) return {
					cleaned: true,
					signaled: false
				};
				if (this.#releasePending) {
					try {
						this.#release();
						return {
							cleaned: true,
							signaled: false
						};
					} catch (cause) {
						return {
							cleaned: false,
							reason: errorMessage(cause)
						};
					}
				}
				let timer;
				try {
					const signaled = this.kill();
					this.#discardBlockedOutput();
					this.#schedule();
					const settled = await Promise.race([this.#settled.then(() => true), new Promise((resolve) => {
						timer = setTimeout(() => resolve(false), 5e3);
					})]);
					return settled ? {
						cleaned: true,
						signaled
					} : {
						cleaned: false,
						reason: this.#failure ?? "Windows Job Object did not settle within the cleanup deadline"
					};
				} catch (cause) {
					return {
						cleaned: false,
						reason: errorMessage(cause)
					};
				} finally {
					if (timer !== undefined) clearTimeout(timer);
				}
			}
			#schedule(delay = 25) {
				if (this.#closed || this.#timer !== undefined || this.#blockedOutput.size > 0) return;
				this.#timer = setTimeout(() => this.#poll(), delay);
				if (this.#unreferenced) this.#timer.unref();
			}
			#scheduleBlockedWake() {
				if (this.#closed || this.#blockedOutput.size === 0 || this.#blockedWake !== undefined) return;
				this.#blockedWake = setTimeout(() => {
					this.#blockedWake = undefined;
					this.#scheduleBlockedWake();
				}, 1e3);
				if (this.#unreferenced) this.#blockedWake.unref();
			}
			#clearBlockedWake() {
				if (this.#blockedWake !== undefined) clearTimeout(this.#blockedWake);
				this.#blockedWake = undefined;
			}
			#unblockOutput(stream) {
				if (stream.destroyed) this.#outputIncomplete = true;
				this.#blockedOutput.delete(stream);
				if (this.#blockedOutput.size === 0) this.#clearBlockedWake();
				this.#schedule(0);
			}
			#discardBlockedOutput() {
				if (this.#blockedOutput.size > 0) this.#outputIncomplete = true;
				for (const stream of this.#blockedOutput) stream.destroy();
				this.#blockedOutput.clear();
				this.#clearBlockedWake();
			}
			#poll() {
				this.#timer = undefined;
				if (this.#closed) return;
				if (this.#releasePending) {
					try {
						this.#release();
					} catch (cause) {
						const failure = cause instanceof Error ? cause : new Error(String(cause));
						this.#failure = failure.message;
						if (this.listenerCount("error") > 0) this.emit("error", failure);
					}
					return;
				}
				try {
					const observed = this.#authority.call("process_poll", [this.#handle]);
					let state;
					if (this.#memoryLimitBytes === undefined) state = pollSchema.parse(observed);
					else {
						const limited = limitedPollSchema.parse(observed);
						this.#memoryLimitReached ||= limited.memoryLimitReached;
						this.#peakJobMemoryBytes = limited.peakJobMemoryBytes;
						state = limited;
					}
					this.#failure = undefined;
					const idle = state.stdout.length === 0 && state.stderr.length === 0;
					this.#writeOutput(this.stdout, state.stdout);
					this.#writeOutput(this.stderr, state.stderr);
					if (state.exitCode !== null && this.exitCode === null) {
						this.exitCode = state.exitCode;
						this.emit("exit", state.exitCode, null);
					}
					if (state.exitCode !== null && state.stdoutEnded && state.stderrEnded && state.activeProcesses === 0) {
						this.#release();
					} else this.#schedule(idle ? 25 : 0);
				} catch (cause) {
					const failure = cause instanceof Error ? cause : new Error(String(cause));
					const repeated = this.#failure !== undefined;
					this.#failure = failure.message;
					if (!repeated && this.listenerCount("error") > 0) this.emit("error", failure);
					this.#schedule(POLL_RETRY_MS);
				}
			}
			#writeOutput(stream, bytes) {
				if (bytes.length === 0 || stream.writableEnded) return;
				if (stream.destroyed) {
					this.#outputIncomplete = true;
					return;
				}
				if (stream.write(bytes)) return;
				this.#blockedOutput.add(stream);
				const unblock = () => {
					stream.off("drain", unblock);
					stream.off("close", unblock);
					this.#unblockOutput(stream);
				};
				stream.once("drain", unblock);
				stream.once("close", unblock);
				this.#scheduleBlockedWake();
			}
			#release() {
				if (this.#closed) return;
				if (!this.#releasePending) {
					if (this.#timer !== undefined) clearTimeout(this.#timer);
					this.#timer = undefined;
					this.#clearBlockedWake();
					this.stdin?.destroy();
					if (!this.stdout.destroyed) this.stdout.end();
					if (!this.stderr.destroyed) this.stderr.end();
					this.#releasePending = true;
				}
				this.#authority.call("process_close", [this.#handle]);
				this.#releasePending = false;
				this.#closed = true;
				this.#settle?.();
				this.emit("close", this.exitCode, null);
			}
		};
	})))();
}

//#endregion
//#region dist/process/launchFailure.js
var LAUNCH_REFUSALS, ERROR_BAD_EXE_FORMAT, launchErrnoOf, HOST_EXHAUSTION, launchExhaustedResource, classifyLaunchErrno, classifyLaunchFailureCode, nameSpawnedExecutable, launcherIdentityOf, launcherFailureOf, describeLaunchFailure;
function init_launchFailure() {
	return (init_launchFailure = __esmMin((() => {
		init_WindowsOwnedProcess();
		LAUNCH_REFUSALS = {
			ENOENT: "missing",
			ENOTDIR: "missing",
			ELOOP: "missing",
			ENAMETOOLONG: "missing",
			EACCES: "not_executable",
			EPERM: "not_executable",
			ENOEXEC: "not_executable",
			EFTYPE: "not_executable",
			EISDIR: "not_executable"
		};
		ERROR_BAD_EXE_FORMAT = 193;
		launchErrnoOf = (cause) => {
			const code = Reflect.get(cause, "code");
			return code === "ERR_REA_WINDOWS_NATIVE" && Reflect.get(cause, "win32Code") === ERROR_BAD_EXE_FORMAT ? "EFTYPE" : code;
		};
		HOST_EXHAUSTION = {
			EAGAIN: "processes",
			ENOMEM: "memory",
			EMFILE: "file-descriptors",
			ENFILE: "file-descriptors"
		};
		launchExhaustedResource = (code) => typeof code === "string" && Object.hasOwn(HOST_EXHAUSTION, code) ? HOST_EXHAUSTION[code] : undefined;
		classifyLaunchErrno = (code) => {
			const refusal = classifyLaunchFailureCode(code);
			if (refusal !== undefined) return refusal;
			const resource = launchExhaustedResource(code);
			if (resource !== undefined && typeof code === "string") return {
				kind: "host-exhausted",
				code,
				resource
			};
			if (code === "E2BIG") return {
				kind: "argument-list",
				code
			};
			return {
				kind: "failed",
				code: typeof code === "string" ? code : undefined
			};
		};
		classifyLaunchFailureCode = (code) => {
			if (typeof code !== "string" || !Object.hasOwn(LAUNCH_REFUSALS, code)) return undefined;
			const kind = LAUNCH_REFUSALS[code];
			return kind === undefined ? undefined : {
				kind,
				code
			};
		};
		nameSpawnedExecutable = (cause, command) => {
			if (cause instanceof Error && Reflect.get(cause, "syscall") === "spawn" && Reflect.get(cause, "path") === undefined) {
				Reflect.set(cause, "syscall", `spawn ${command}`);
				Reflect.set(cause, "path", command);
			}
			return cause;
		};
		launcherIdentityOf = (cause) => {
			const syscall = Reflect.get(cause, "syscall");
			if (typeof syscall === "string" && /^spawn(?: |$)/u.test(syscall)) {
				const path = Reflect.get(cause, "path");
				return { executable: typeof path === "string" && syscall === `spawn ${path}` ? path : undefined };
			}
			const requestedPath = windowsExecutableLaunchPath(cause);
			return requestedPath === undefined ? undefined : { executable: requestedPath };
		};
		launcherFailureOf = (cause) => {
			if (!(cause instanceof Error)) return undefined;
			const identity = launcherIdentityOf(cause);
			if (identity === undefined) return undefined;
			const syscall = Reflect.get(cause, "syscall");
			return {
				...classifyLaunchErrno(launchErrnoOf(cause)),
				...identity,
				syscall: typeof syscall === "string" ? syscall : undefined
			};
		};
		describeLaunchFailure = (failure) => {
			const code = failure.code ?? "no system code";
			return failure.kind === "failed" && failure.syscall !== undefined ? `${code} from ${failure.syscall}` : code;
		};
	})))();
}

//#endregion
//#region dist/process/ExecFileOutput.js
var STOP_GRACE_MS, ExecFileOutputCancelledError, timeoutError, invalidTimeout, failedStdoutBuffers, execFileOutputFailure, spawnCapacityExhausted, execFileFailureCapturedOutput, admitSpawnFailure, execFileBytes, startStoppableCommand, execFileOutput;
function init_ExecFileOutput() {
	return (init_ExecFileOutput = __esmMin((() => {
		init_HostPlatform();
		init_launchFailure();
		init_SignalAbort();
		STOP_GRACE_MS = 5e3;
		ExecFileOutputCancelledError = class extends Error {
			_tag = "ExecFileOutputCancelledError";
			code = "ABORT_ERR";
			constructor(reason) {
				super("The operation was aborted", { cause: reason });
				this.name = "AbortError";
			}
		};
		timeoutError = (command, timeout, exit) => {
			const error = new Error(`Command timed out after ${String(timeout)} ms: ${command}`, exit === null ? undefined : { cause: exit });
			Reflect.set(error, "code", "ETIMEDOUT");
			Reflect.set(error, "killed", true);
			Reflect.set(error, "signal", exit === null ? null : Reflect.get(exit, "signal") ?? null);
			return error;
		};
		invalidTimeout = (timeout) => {
			if (Number.isSafeInteger(timeout) && timeout >= 0) return undefined;
			const error = new RangeError(`The value of "timeout" is out of range. It must be an unsigned integer. Received ${String(timeout)}`);
			Reflect.set(error, "code", "ERR_OUT_OF_RANGE");
			return error;
		};
		failedStdoutBuffers = new WeakMap();
		execFileOutputFailure = (cause) => {
			if (!(cause instanceof Error)) return undefined;
			const stdout = Reflect.get(cause, "stdout");
			const stdoutBuffer = failedStdoutBuffers.get(cause);
			const stderr = Reflect.get(cause, "stderr");
			const code = Reflect.get(cause, "code");
			const signal = Reflect.get(cause, "signal");
			const killed = Reflect.get(cause, "killed");
			const outputTruncated = Reflect.get(cause, "outputTruncated");
			const stdoutBytes = Reflect.get(cause, "stdoutBytes");
			const stderrBytes = Reflect.get(cause, "stderrBytes");
			const collectionFailure = Reflect.get(cause, "collectionFailure");
			const spawnFailed = Reflect.get(cause, "spawnFailed");
			if (typeof stdout !== "string" || typeof stderr !== "string") return undefined;
			return {
				stdout,
				...stdoutBuffer === undefined ? {} : { stdoutBuffer },
				stderr,
				...typeof stdoutBytes === "number" && Number.isSafeInteger(stdoutBytes) && stdoutBytes >= 0 ? { stdoutBytes } : {},
				...typeof stderrBytes === "number" && Number.isSafeInteger(stderrBytes) && stderrBytes >= 0 ? { stderrBytes } : {},
				code: typeof code === "string" || typeof code === "number" ? code : null,
				signal: typeof signal === "string" ? signal : null,
				killed: killed === true,
				outputTruncated: outputTruncated === true || code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER",
				...collectionFailure === true ? { collectionFailure: true } : {},
				...spawnFailed === true ? { spawnFailed: true } : {}
			};
		};
		spawnCapacityExhausted = (failure) => failure?.spawnFailed === true && launchExhaustedResource(failure.code) !== undefined;
		execFileFailureCapturedOutput = (failure) => ({
			stdout: failure.stdout,
			stderr: failure.stderr,
			...failure.stdoutBytes === undefined ? {} : { stdout_bytes: failure.stdoutBytes },
			...failure.stderrBytes === undefined ? {} : { stderr_bytes: failure.stderrBytes },
			exit_code: typeof failure.code === "number" ? failure.code : null,
			signal: failure.signal,
			truncated: failure.outputTruncated
		});
		admitSpawnFailure = (error) => {
			const syscall = Reflect.get(error, "syscall");
			if (typeof Reflect.get(error, "errno") !== "number" || typeof syscall !== "string" || !(syscall === "spawn" || syscall.startsWith("spawn "))) return false;
			Reflect.set(error, "spawnFailed", true);
			return true;
		};
		execFileBytes = (command, arguments_, options = {}) => new Promise((resolve, reject) => {
			const { stopSignal, signal, timeout, lifetimePipe, preserveFailedStdout, ...execOptions } = options;
			if (lifetimePipe === true && stopSignal === undefined) {
				reject(new TypeError("lifetimePipe requires stopSignal"));
				return;
			}
			const invalid = timeout === undefined ? undefined : invalidTimeout(timeout);
			if (invalid !== undefined) {
				reject(invalid);
				return;
			}
			if (stopSignal !== undefined && signal?.aborted === true) {
				reject(new ExecFileOutputCancelledError(signal.reason));
				return;
			}
			const complete = (error, stdout, stderr) => {
				if (error !== null) {
					admitSpawnFailure(error);
					if (preserveFailedStdout) failedStdoutBuffers.set(error, stdout);
					Reflect.set(error, "stdout", stdout.toString("utf8"));
					Reflect.set(error, "stderr", stderr.toString("utf8"));
					Reflect.set(error, "stdoutBytes", stdout.byteLength);
					Reflect.set(error, "stderrBytes", stderr.byteLength);
					reject(error);
					return;
				}
				resolve({
					stdout,
					stderr
				});
			};
			try {
				if (stopSignal === undefined) {
					const child = execFile(command, [...arguments_], {
						...execOptions,
						...signal === undefined ? {} : { signal },
						...timeout === undefined ? {} : { timeout },
						encoding: "buffer",
						maxBuffer: options.maxBuffer ?? Number.POSITIVE_INFINITY
					}, (error, stdout, stderr) => complete(error !== null && isAbortOf(error, signal) ? new ExecFileOutputCancelledError(signal.reason) : error, stdout, stderr));
					child.stdin?.end();
					return;
				}
				startStoppableCommand(command, arguments_, {
					...options,
					stopSignal
				}, complete);
			} catch (error) {
				if (error instanceof Error && admitSpawnFailure(error)) complete(error, Buffer.alloc(0), Buffer.alloc(0));
				else reject(error);
			}
		});
		startStoppableCommand = (command, arguments_, options, complete) => {
			const { stopSignal, signal, timeout, lifetimePipe, ...execOptions } = options;
			const maxBuffer = options.maxBuffer ?? Number.POSITIVE_INFINITY;
			if (typeof maxBuffer !== "number" || !(maxBuffer >= 0)) {
				const error = new RangeError("maxBuffer must be a nonnegative number");
				Reflect.set(error, "code", "ERR_OUT_OF_RANGE");
				throw error;
			}
			let stopped;
			let processError = null;
			let rootFailed = false;
			let outputError;
			let deadline;
			let grace;
			const child = spawn(command, [...arguments_], {
				...execOptions,
				stdio: lifetimePipe === true ? [
					"ignore",
					"pipe",
					"pipe",
					"pipe"
				] : [
					"ignore",
					"pipe",
					"pipe"
				],
				killSignal: stopSignal,
				detached: HOST_PLATFORM.platform !== "win32"
			});
			child.on("error", (error) => {
				processError ??= error;
			});
			const stdio = child.stdio;
			if (lifetimePipe === true) {
				const pipe = stdio?.[3];
				if (pipe != null && "resume" in pipe) pipe.resume();
			}
			let signalled = false;
			/**
			* Signal the command's process group while its leader is unreaped. Node
			* sets exitCode or signalCode in the same callback that reaps the leader,
			* so until then the leader's PID still names the group this call created.
			*/
			const signalFamily = (signalName) => {
				if (child.exitCode !== null || child.signalCode !== null) return;
				const pid = child.pid;
				if (HOST_PLATFORM.platform !== "win32" && pid !== undefined) try {
					process.kill(-pid, signalName);
					signalled = true;
					return;
				} catch {}
				if (child.kill(signalName)) signalled = true;
			};
			const stop = (reason) => {
				if (stopped !== undefined || rootFailed || processError !== null) return;
				stopped = reason;
				signalFamily(stopSignal);
				grace = setTimeout(() => signalFamily("SIGKILL"), STOP_GRACE_MS);
			};
			const onAbort = () => {
				stop("abort");
			};
			const capture = (stream, name) => {
				const chunks = [];
				let retained = 0;
				stream?.on("data", (chunk) => {
					const remaining = Math.max(0, Math.floor(maxBuffer - retained));
					if (chunk.byteLength <= remaining) {
						chunks.push(chunk);
						retained += chunk.byteLength;
						return;
					}
					if (remaining > 0) {
						chunks.push(Buffer.from(chunk.subarray(0, remaining)));
						retained += remaining;
					}
					if (outputError === undefined) {
						outputError = new RangeError(`${name} maxBuffer length exceeded`);
						Reflect.set(outputError, "code", "ERR_CHILD_PROCESS_STDIO_MAXBUFFER");
						stop("output-limit");
					}
				});
				return () => Buffer.concat(chunks, retained);
			};
			const stdout = capture(stdio?.[1], "stdout");
			const stderr = capture(stdio?.[2], "stderr");
			child.on("exit", (code, exitSignal) => {
				rootFailed = code !== 0 || exitSignal !== null;
			});
			child.on("close", (code, exitSignal) => {
				signal?.removeEventListener("abort", onAbort);
				clearTimeout(deadline);
				clearTimeout(grace);
				const out = stdout();
				const diagnostic = stderr();
				const invocation = [command, ...arguments_].join(" ");
				if (processError === null && (code !== 0 || exitSignal !== null)) {
					processError = new Error(`Command failed: ${invocation}\n${diagnostic.toString("utf8")}`);
					Reflect.set(processError, "code", code);
					Reflect.set(processError, "signal", exitSignal);
					Reflect.set(processError, "killed", signalled);
				}
				if (processError !== null) Reflect.set(processError, "cmd", invocation);
				if (outputError !== undefined) Reflect.set(outputError, "cmd", invocation);
				const failure = stopped === "abort" && signal !== undefined ? new ExecFileOutputCancelledError(signal.reason) : stopped === "timeout" && timeout !== undefined ? timeoutError(command, timeout, processError) : rootFailed && stopped === undefined ? processError : outputError ?? processError;
				if (failure !== null && outputError !== undefined) Reflect.set(failure, "outputTruncated", true);
				complete(failure, out, diagnostic);
			});
			signal?.addEventListener("abort", onAbort, { once: true });
			if (timeout !== undefined && timeout > 0) deadline = setTimeout(() => {
				stop("timeout");
			}, timeout);
		};
		execFileOutput = (command, arguments_, options = {}) => execFileBytes(command, arguments_, options).then(({ stdout, stderr }) => ({
			stdout: stdout.toString("utf8"),
			stderr: stderr.toString("utf8"),
			stdoutBytes: stdout.byteLength,
			stderrBytes: stderr.byteLength
		}));
	})))();
}

//#endregion
//#region dist/process/ProcessInspectionCancellation.js
var ProcessOwnershipInspectionCancelled, assertProcessOwnershipInspectionActive, isProcessOwnershipInspectionCancellation, ProcessOwnershipIdentityBatchFailure, rethrowProcessOwnershipInspectionFailure, waitForProcessOwnershipInspection;
function init_ProcessInspectionCancellation() {
	return (init_ProcessInspectionCancellation = __esmMin((() => {
		init_OwnedRegularFile();
		init_RegularFile();
		init_readFileHandleChunks();
		init_ExecFileOutput();
		ProcessOwnershipInspectionCancelled = class ProcessOwnershipInspectionCancelled extends Error {
			reason;
			_tag = "ProcessOwnershipInspectionCancelled";
			constructor(reason, options) {
				super("Process ownership inspection cancelled", { cause: options === undefined ? reason : options.cause });
				this.reason = reason;
				this.name = this._tag;
			}
			/** Normalize only cancellation facts emitted by the actual lower-level owner. */
			static from(cause) {
				if (isProcessOwnershipInspectionCancellation(cause)) return cause;
				if (cause instanceof ExecFileOutputCancelledError) return new ProcessOwnershipInspectionCancelled(cause.cause, { cause });
				if (cause instanceof RegularFileOperationCancelled || cause instanceof RegularFileCancelled || cause instanceof FileReadCancelled) return new ProcessOwnershipInspectionCancelled(cause.reason, { cause });
				return undefined;
			}
		};
		assertProcessOwnershipInspectionActive = (signal) => {
			if (signal?.aborted === true) throw new ProcessOwnershipInspectionCancelled(signal.reason);
		};
		isProcessOwnershipInspectionCancellation = (cause) => cause instanceof ProcessOwnershipInspectionCancelled || cause instanceof ProcessOwnershipIdentityBatchFailure && cause.origin === "cancelled";
		ProcessOwnershipIdentityBatchFailure = class extends AggregateError {
			failures;
			observations;
			_tag = "ProcessOwnershipIdentityBatchFailure";
			cancellations;
			physicalFailures;
			origin;
			/** Single caller cancellation value; every request's explicit fact remains in cancellations. */
			get reason() {
				return this.cancellations[0]?.cancellation.reason;
			}
			constructor(failures, observations, physicalReadFailures = []) {
				super([...physicalReadFailures, ...failures].map(({ cause }) => cause), "Native process identity inspection failed");
				this.failures = failures;
				this.observations = observations;
				this.name = this._tag;
				const cancellations = [];
				const physicalFailures = [...physicalReadFailures];
				for (const { pid, requestIndex, cause } of failures) {
					const cancellation = cause instanceof RegularFileCleanupFailure ? cause.outcome.kind === "failed" ? ProcessOwnershipInspectionCancelled.from(cause.outcome.cause) : cause.completionCancellation === undefined ? undefined : new ProcessOwnershipInspectionCancelled(cause.completionCancellation.reason, { cause }) : ProcessOwnershipInspectionCancelled.from(cause);
					if (cancellation !== undefined) cancellations.push({
						pid,
						requestIndex,
						cancellation
					});
					if (cause instanceof RegularFileCleanupFailure || cancellation === undefined) physicalFailures.push({
						pid,
						requestIndex,
						cause
					});
				}
				this.cancellations = cancellations;
				this.physicalFailures = physicalFailures;
				this.origin = physicalFailures.length === 0 && cancellations.length > 0 ? "cancelled" : "physical";
			}
		};
		rethrowProcessOwnershipInspectionFailure = (cause) => {
			if (cause instanceof RegularFileCleanupFailure || cause instanceof ProcessOwnershipIdentityBatchFailure) throw cause;
			const cancellation = ProcessOwnershipInspectionCancelled.from(cause);
			if (cancellation !== undefined) throw cancellation;
		};
		waitForProcessOwnershipInspection = async (milliseconds, signal) => {
			assertProcessOwnershipInspectionActive(signal);
			return new Promise((resolve, reject) => {
				const finish = () => {
					signal?.removeEventListener("abort", onAbort);
					resolve();
				};
				const timer = setTimeout(finish, milliseconds);
				const onAbort = () => {
					clearTimeout(timer);
					signal?.removeEventListener("abort", onAbort);
					reject(new ProcessOwnershipInspectionCancelled(signal?.reason));
				};
				signal?.addEventListener("abort", onAbort, { once: true });
				if (signal?.aborted === true) onAbort();
			});
		};
	})))();
}

//#endregion
//#region dist/process/ProcessAdmissionError.js
var PROCESS_ADMISSION_CODES, ProcessAdmissionError;
function init_ProcessAdmissionError() {
	return (init_ProcessAdmissionError = __esmMin((() => {
		PROCESS_ADMISSION_CODES = [
			"runtime_closing",
			"stdout_missing",
			"request_stream_failed",
			"finalization_unobserved",
			"prefix_identity_lost",
			"prefix_unavailable",
			"identity_snapshot_unavailable",
			"current_process_unreported",
			"baseline_unavailable",
			"memory_limit_unsupported",
			"launcher_pid_missing",
			"duplicate_key",
			"reader_closed",
			"token_json_invalid",
			"token_response_invalid",
			"token_pid_set",
			"token_pid_incomplete",
			"identity_json_invalid",
			"identity_response_invalid",
			"identity_pid_set",
			"identity_pid_incomplete",
			"limit_unreadable",
			"limit_invalid",
			"report_exceeds_budget"
		];
		ProcessAdmissionError = class extends Error {
			code;
			detail;
			_tag = "ProcessAdmissionError";
			constructor(code, detail, options) {
				super(code, options);
				this.code = code;
				this.detail = detail;
				this.name = "ProcessAdmissionError";
			}
		};
	})))();
}

//#endregion
//#region dist/domain/analysisCleanupRelease.js
var AnalysisCleanupRelease;
function init_analysisCleanupRelease() {
	return (init_analysisCleanupRelease = __esmMin((() => {
		AnalysisCleanupRelease = class {
			#released = false;
			get cleanupReleased() {
				return this.#released;
			}
			/** Let `error` report this owner's release whenever it is asked. */
			bind(error) {
				return error.bindCleanupReleaseClaim(this);
			}
			/**
			* Let a failure reported by another producer read this release only when
			* its cleanup has no owner of its own; an owned failure keeps reading that
			* owner, so a later release of its resources is not hidden behind this one.
			*/
			bindUnowned(error) {
				return error.cleanupIncomplete && !error.hasCleanupOwner ? this.bind(error) : error;
			}
			confirm() {
				this.#released = true;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/utf8HeadExcerpt.js
var utf8HeadExcerpt;
function init_utf8HeadExcerpt() {
	return (init_utf8HeadExcerpt = __esmMin((() => {
		init_excerpt();
		utf8HeadExcerpt = (text, maximumBytes) => {
			if (maximumBytes <= 0) return {
				text: excerptText(""),
				bytes: 0,
				truncated: text.length > 0
			};
			if (text.length * 3 <= maximumBytes) return {
				text: excerptText(text),
				bytes: Buffer.byteLength(text, "utf8"),
				truncated: false
			};
			const { read, written } = new TextEncoder().encodeInto(text, new Uint8Array(maximumBytes));
			return {
				text: excerptText(text.slice(0, read)),
				bytes: written,
				truncated: read < text.length
			};
		};
	})))();
}

//#endregion
//#region dist/filesystem/readStableFileBytes.js
var RegularFileCapacityError, readStableFileBytes, readStableFilePrefix, readExtent;
function init_readStableFileBytes() {
	return (init_readStableFileBytes = __esmMin((() => {
		init_RegularFile();
		RegularFileCapacityError = class extends Error {
			path;
			maximumBytes;
			observedBytes;
			_tag = "RegularFileCapacityError";
			constructor(path, maximumBytes, observedBytes) {
				super(`Selected file must be at most ${maximumBytes} bytes: ${path}`);
				this.path = path;
				this.maximumBytes = maximumBytes;
				this.observedBytes = observedBytes;
				this.name = this._tag;
			}
		};
		readStableFileBytes = async (file, path, maximumBytes, options) => {
			if (!Number.isSafeInteger(maximumBytes) || maximumBytes < 0) throw new RangeError("Maximum file bytes must be a nonnegative safe integer");
			assertRegularFileActive(options.signal);
			const before = await file.stat({ bigint: true });
			if (before.size > BigInt(maximumBytes)) throw new RegularFileCapacityError(path, maximumBytes, before.size);
			const bytes = await readExtent(file, path, Number(before.size), options.signal);
			assertRegularFileActive(options.signal);
			const extra = Buffer.alloc(1);
			if ((await file.read(extra, 0, 1, bytes.length)).bytesRead !== 0) throw new RegularFileChangedError(path);
			await assertStableRegularFileIdentity(file, path, before, options);
			return bytes;
		};
		readStableFilePrefix = async (file, path, maximumBytes, options) => {
			if (!Number.isSafeInteger(maximumBytes) || maximumBytes < 0) throw new RangeError("Maximum prefix bytes must be a nonnegative safe integer");
			assertRegularFileActive(options.signal);
			const before = await file.stat({ bigint: true });
			const length = Number(before.size < BigInt(maximumBytes) ? before.size : BigInt(maximumBytes));
			const bytes = await readExtent(file, path, length, options.signal);
			await assertStableRegularFileIdentity(file, path, before, options);
			return {
				bytes,
				size: before.size
			};
		};
		readExtent = async (file, path, length, signal) => {
			assertRegularFileActive(signal);
			const bytes = Buffer.alloc(length);
			let offset = 0;
			while (offset < bytes.length) {
				assertRegularFileActive(signal);
				const read = await file.read({
					buffer: bytes,
					offset,
					length: bytes.length - offset,
					position: offset
				});
				if (read.bytesRead === 0) throw new RegularFileChangedError(path);
				offset += read.bytesRead;
			}
			assertRegularFileActive(signal);
			return bytes;
		};
	})))();
}

//#endregion
//#region dist/process/DarwinHelperCache.js
var CACHE_FORMAT, HELPER_NAME, MANIFEST_NAME, MAX_MANIFEST_BYTES, MAX_HELPER_BYTES, TOOLCHAIN_LOOKUP_TIMEOUT_MS, manifestSchema, STICKY, defaultDarwinHelperCacheDirectory, darwinHelperCacheDirectory, privatelyOwned, ancestorsTrusted, realAncestors, ACL_WRITE_RIGHTS, aclListingGrantsWrite, isMissing, fileIdentity, createDarwinHelperCache;
function init_DarwinHelperCache() {
	return (init_DarwinHelperCache = __esmMin((() => {
		init_HostPlatform();
		init_providerCleanupError();
		init_analysisCleanupRelease();
		init_safeJson();
		init_callerPath();
		init_OwnedRegularFile();
		init_readStableFileBytes();
		init_ExecFileOutput();
		init_sha256Hex();
		CACHE_FORMAT = 2;
		HELPER_NAME = "reader";
		MANIFEST_NAME = "manifest.json";
		MAX_MANIFEST_BYTES = 4096;
		MAX_HELPER_BYTES = 16 * 1024 * 1024;
		TOOLCHAIN_LOOKUP_TIMEOUT_MS = 15e3;
		manifestSchema = z.strictObject({
			format: z.literal(CACHE_FORMAT),
			key: z.string().regex(/^[a-f0-9]{64}$/u),
			sha256: z.string().regex(/^[a-f0-9]{64}$/u),
			size: z.int().positive()
		});
		STICKY = 512;
		defaultDarwinHelperCacheDirectory = (home) => appendCallerPath(home, "Library/Caches/rea/process-helper", "darwin");
		darwinHelperCacheDirectory = (selection) => selection.compilerSelected || (selection.moduleCachePath ?? "") !== "" || selection.home === undefined || !isAbsolute(selection.home) ? undefined : defaultDarwinHelperCacheDirectory(selection.home);
		privatelyOwned = (stats, uid) => stats.uid === uid && (stats.mode & 18) === 0;
		ancestorsTrusted = async (path, uid) => {
			for (let current = path;; current = dirname(current)) {
				const stats = await lstat(current);
				if (!stats.isDirectory() || stats.uid !== uid && stats.uid !== 0) return false;
				if ((stats.mode & 18) !== 0 && !(stats.uid === 0 && (stats.mode & STICKY) !== 0)) return false;
				if (dirname(current) === current) return true;
			}
		};
		realAncestors = (path) => {
			const paths = [path];
			for (let current = path; dirname(current) !== current;) {
				current = dirname(current);
				paths.push(current);
			}
			return paths;
		};
		ACL_WRITE_RIGHTS = new Set([
			"write",
			"append",
			"writeattr",
			"writeextattr",
			"writesecurity",
			"chown",
			"delete",
			"add_file",
			"add_subdirectory",
			"delete_child"
		]);
		aclListingGrantsWrite = (listing) => listing.split("\n").some((line) => {
			const entry = /^\s*\d+:\s+\S+\s+(?:inherited\s+)?(allow|deny)\s+(\S+)/u.exec(line);
			return entry?.[1] === "allow" && (entry[2] ?? "").split(",").some((right) => ACL_WRITE_RIGHTS.has(right));
		});
		isMissing = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
		fileIdentity = async (path) => {
			const real = await realpath(path);
			const facts = await stat(real);
			return {
				path: real,
				size: facts.size,
				mtime_ms: facts.mtimeMs
			};
		};
		createDarwinHelperCache = (options) => {
			const uid = process.getuid?.();
			const retained = new Map();
			let cleanupRelease;
			let key;
			const xcrun = async (arguments_, signal) => {
				const { stdout } = await execFileOutput(options.xcrun, arguments_, {
					env: options.environment,
					timeout: TOOLCHAIN_LOOKUP_TIMEOUT_MS,
					maxBuffer: 64 * 1024,
					stopSignal: "SIGTERM",
					...signal === undefined ? {} : { signal }
				});
				const path = stdout.trim();
				if (!isAbsolute(path)) throw new Error(`xcrun ${arguments_.join(" ")} returned no path`);
				return path;
			};
			/** Wait for every started read before reporting the first failure. */
			const settleAll = async (pending) => {
				await Promise.allSettled(pending);
				return Promise.all(pending);
			};
			/** xcrun owns toolchain selection; key on what it resolves. */
			const computeKey = async (signal) => {
				const [sources, compilerPath, sdkPath] = await settleAll([
					Promise.all(options.sources.map(async (source) => sha256Hex(await readFile(source)))),
					xcrun(["--find", "swiftc"], signal),
					xcrun(["--show-sdk-path"], signal)
				]);
				const [compiler, sdk] = await settleAll([fileIdentity(compilerPath), fileIdentity(join(sdkPath, "SDKSettings.json"))]);
				return sha256Hex(JSON.stringify({
					format: CACHE_FORMAT,
					sources,
					compiler,
					sdk,
					architecture: HOST_PLATFORM.architecture,
					os_release: release()
				}));
			};
			/** A cancelled or failed key computation is retried by the next lookup. */
			const cacheKey = (signal) => {
				if (key !== undefined) return key;
				const pending = computeKey(signal);
				key = pending;
				pending.catch(() => {
					if (key === pending) key = undefined;
				});
				return pending;
			};
			/** On macOS, no ACL may grant a write that the mode bits withhold. */
			const withoutAclWriteGrants = async (paths, signal) => {
				if (HOST_PLATFORM.platform !== "darwin") return true;
				const { stdout } = await execFileOutput("/bin/ls", [
					"-lde",
					"--",
					...paths
				], {
					env: options.environment,
					timeout: TOOLCHAIN_LOOKUP_TIMEOUT_MS,
					maxBuffer: 1024 * 1024,
					stopSignal: "SIGTERM",
					...signal === undefined ? {} : { signal }
				});
				return !aclListingGrantsWrite(stdout);
			};
			/** The real cache root, created privately, with only trusted ancestors. */
			const trustedRoot = async (owner) => {
				await mkdir(options.directory, {
					recursive: true,
					mode: 448
				});
				const named = await lstat(options.directory);
				if (!named.isDirectory() || !privatelyOwned(named, owner)) return undefined;
				const root = await realpath(options.directory);
				return await ancestorsTrusted(root, owner) ? root : undefined;
			};
			const retainClose = (owner) => {
				retained.set(owner, () => owner.close());
			};
			/** Hash the opened descriptor itself; FIFOs and links never block or pass. */
			const readEntryFile = (path, owner, maximumBytes, executable) => withOwnedRegularFile(path, {
				symlinks: "reject",
				retainFailedClose: retainClose
			}, async ({ handle, initial }) => !privatelyOwned(initial, owner) || executable && (initial.mode & 64) === 0 || initial.size === 0 || initial.size > maximumBytes ? undefined : readStableFileBytes(handle, path, maximumBytes, { symlinks: "reject" })).catch(() => undefined);
			const verifiedHelper = async (entry, entryKey, owner) => {
				const manifestBytes = await readEntryFile(join(entry, MANIFEST_NAME), owner, MAX_MANIFEST_BYTES, false);
				const decoded = manifestBytes === undefined ? undefined : safeParseJson(manifestBytes.toString("utf8"));
				const manifest = decoded?.ok === true ? manifestSchema.safeParse(decoded.value) : undefined;
				if (manifest?.success !== true || manifest.data.key !== entryKey) return undefined;
				const executable = join(entry, HELPER_NAME);
				const helper = await readEntryFile(executable, owner, MAX_HELPER_BYTES, true);
				return helper !== undefined && helper.byteLength === manifest.data.size && sha256Hex(helper) === manifest.data.sha256 ? executable : undefined;
			};
			const lookup = async (signal) => {
				if (uid === undefined) return { kind: "unavailable" };
				try {
					const root = await trustedRoot(uid);
					if (root === undefined) return { kind: "unavailable" };
					const entryKey = await cacheKey(signal);
					const entry = join(root, entryKey);
					let entryStats;
					try {
						entryStats = await lstat(entry);
					} catch (cause) {
						if (isMissing(cause)) return {
							kind: "miss",
							key: entryKey
						};
						throw cause;
					}
					if (!entryStats.isDirectory() || !privatelyOwned(entryStats, uid)) return { kind: "unavailable" };
					const executable = await verifiedHelper(entry, entryKey, uid);
					if (executable === undefined || !await withoutAclWriteGrants([
						...realAncestors(root),
						entry,
						executable,
						join(entry, MANIFEST_NAME)
					], signal)) return { kind: "unavailable" };
					return {
						kind: "hit",
						executable
					};
				} catch {
					return { kind: "unavailable" };
				}
			};
			const removeStaging = async (path) => {
				const remove = () => rm(path, {
					recursive: true,
					force: true
				});
				await remove().catch(() => {
					retained.set(path, remove);
				});
			};
			/**
			* Atomically publish a verified copy and return the shared helper to run.
			* macOS assesses each new executable file on its first launch (about 0.3 s),
			* so running the shared copy pays that once for every later process.
			*/
			const publish = async (entryKey, compiled, signal) => {
				if (uid === undefined) return undefined;
				let staging;
				try {
					const root = await trustedRoot(uid);
					if (root === undefined || !await withoutAclWriteGrants(realAncestors(root), signal)) return undefined;
					staging = await mkdtemp(join(root, ".publish-"));
					const copied = join(staging, HELPER_NAME);
					await copyFile(compiled, copied, constants.COPYFILE_EXCL);
					await chmod(copied, 448);
					const helper = await readEntryFile(copied, uid, MAX_HELPER_BYTES, true);
					if (helper === undefined) return undefined;
					await writeFile(join(staging, MANIFEST_NAME), JSON.stringify({
						format: CACHE_FORMAT,
						key: entryKey,
						sha256: sha256Hex(helper),
						size: helper.byteLength
					}), {
						mode: 384,
						flag: "wx"
					});
					const entry = join(root, entryKey);
					try {
						await rename(staging, entry);
						staging = undefined;
						return join(entry, HELPER_NAME);
					} catch {
						const winner = await lookup(signal);
						return winner.kind === "hit" ? winner.executable : undefined;
					}
				} catch {
					return undefined;
				} finally {
					if (staging !== undefined) await removeStaging(staging);
				}
			};
			/** Retry every retained close or removal; unresolved ones stay owned. */
			const close = async () => {
				const failed = [];
				const causes = [];
				for (const [resource, cleanup] of retained) {
					try {
						await cleanup();
						retained.delete(resource);
					} catch (cause) {
						failed.push(typeof resource === "string" ? resource : `file handle ${String(resource.handle.fd)}`);
						causes.push(cause);
					}
				}
				if (failed.length > 0) {
					const failure = new ProviderCleanupError("process-ownership", failed, { reason: "Darwin ownership-helper cache resources remain owned until cleanup succeeds." }, {
						cause: new AggregateError(causes, "Darwin helper cache cleanup failed"),
						operation: "prepare_owned_process"
					});
					throw (cleanupRelease ??= new AnalysisCleanupRelease()).bind(failure);
				}
				cleanupRelease?.confirm();
				cleanupRelease = undefined;
			};
			return {
				lookup,
				publish,
				close
			};
		};
	})))();
}

//#endregion
//#region dist/process/DarwinProcessRunTokenReader.js
var removeHelperRootAtExit, responseSchema, identityResponseSchema, sourceFiles, SWIFTC_INTERRUPT, resolveSwiftcCompileTimeoutMs, swiftcCompileTimeoutRecovery, STDERR_EXCERPT_LIMIT, DarwinProcessOwnershipInspectionError, MAX_COMPILER_OUTPUT_BYTES, compilerFailureFacts, compilerOutcomeDescription, compilerInspectionError, waitForCompilation, helperLaunchFailed, createDarwinProcessRunTokenReader;
function init_DarwinProcessRunTokenReader() {
	return (init_DarwinProcessRunTokenReader = __esmMin((() => {
		init_analysisErrorCore();
		init_HostPlatform();
		init_ProcessInspectionCancellation();
		init_ProcessAdmissionError();
		init_providerStartupTimeout();
		init_analysisResourceLimits();
		init_result();
		init_providerCleanupError();
		init_analysisCleanupRelease();
		init_analysisErrorCleanup();
		init_safeJson();
		init_utf8HeadExcerpt();
		init_DarwinHelperCache();
		init_snapshotEnvironment();
		init_ExecFileOutput();
		init_errorMessage();
		removeHelperRootAtExit = (path) => {
			try {
				rmSync(path, {
					recursive: true,
					force: true
				});
			} catch (cause) {
				try {
					writeSync(2, `REA could not remove the Darwin ownership helper root ${path} at exit: ${errorMessage(cause)}\n`);
				} catch {}
			}
		};
		responseSchema = z.strictObject({ results: z.array(z.discriminatedUnion("state", [z.strictObject({
			pid: z.int().positive(),
			state: z.literal("readable"),
			run_id: z.string().optional(),
			reason: z.null().optional()
		}), z.strictObject({
			pid: z.int().positive(),
			state: z.literal("unavailable"),
			run_id: z.union([z.string(), z.null()]).optional(),
			reason: z.string().min(1)
		})])) });
		identityResponseSchema = z.strictObject({ results: z.array(z.discriminatedUnion("state", [
			z.strictObject({
				pid: z.int().positive(),
				state: z.literal("absent"),
				identity: z.null().optional(),
				reason: z.literal("not-in-snapshot")
			}),
			z.strictObject({
				pid: z.int().positive(),
				state: z.literal("readable"),
				identity: z.string().min(1),
				effective_uid: z.int().nonnegative().optional(),
				lifecycle: z.enum(["non-zombie", "zombie"]).optional(),
				relation: z.strictObject({
					state: z.literal("observed"),
					parent_pid: z.int().nonnegative(),
					process_group_id: z.int().nonnegative()
				}).optional(),
				name: z.string().optional(),
				reason: z.null().optional()
			}),
			z.strictObject({
				pid: z.int().positive(),
				state: z.literal("unavailable"),
				identity: z.null().optional(),
				reason: z.string().min(1)
			})
		])) });
		sourceFiles = [fileURLToPath(new URL("../../bridge/process/ProcessRunTokenReader.swift", new URL("../process/DarwinProcessRunTokenReader.js", import.meta.url).href)), fileURLToPath(new URL("../../bridge/process/ProcessRunTokenReaderMain.swift", new URL("../process/DarwinProcessRunTokenReader.js", import.meta.url).href))];
		SWIFTC_INTERRUPT = "SIGINT";
		resolveSwiftcCompileTimeoutMs = (options = {}) => {
			if (options.compileTimeoutMs !== undefined) return options.compileTimeoutMs;
			const raw = (options.environment ?? process.env).REA_SWIFTC_COMPILE_TIMEOUT_MS;
			if (raw === undefined) return DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS;
			const parsed = providerStartupTimeoutSchema.safeParse(raw);
			return parsed.success ? parsed.data : DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS;
		};
		swiftcCompileTimeoutRecovery = (timeoutMs) => `The effective REA_SWIFTC_COMPILE_TIMEOUT_MS value is ${String(timeoutMs)} ms (integer range 1..${String(MAX_NODE_TIMER_DELAY_MS)}; omitted default ${String(DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS)} ms). Set it in the environment that starts REA and restart REA; the next ownership-helper compile uses the new value.`;
		STDERR_EXCERPT_LIMIT = 512;
		DarwinProcessOwnershipInspectionError = class DarwinProcessOwnershipInspectionError extends Error {
			#cleanupOwner;
			get cleanupOwner() {
				return this.#cleanupOwner;
			}
			constructor(message, options) {
				const { compilerOutcome, capturedOutput, cleanupFailure, cleanupOwner, cancellation, ...errorOptions } = options ?? {};
				super(message, errorOptions);
				this.name = "DarwinProcessOwnershipInspectionError";
				this.compilerOutcome = compilerOutcome;
				this.capturedOutput = capturedOutput;
				this.#cleanupOwner = cleanupOwner;
				this.cleanupFailure = cleanupFailure;
				this.cancellation = cancellation;
			}
			compilerOutcome;
			capturedOutput;
			cleanupFailure;
			cancellation;
			/** Whether helper preparation failed because its compiler hit its deadline. */
			get compilerTimedOut() {
				return this.compilerOutcome?.outcome === "timed_out";
			}
			/** The compiler deadline and its recovery, when it is known. */
			get compileTimeout() {
				const outcome = this.compilerOutcome;
				if (outcome?.outcome !== "timed_out" || outcome.timeoutMs === undefined) return undefined;
				return {
					timeoutMs: outcome.timeoutMs,
					userMessage: `The macOS process ownership helper compiler reached its REA_SWIFTC_COMPILE_TIMEOUT_MS deadline of ${String(outcome.timeoutMs)} ms.`,
					remediationAction: swiftcCompileTimeoutRecovery(outcome.timeoutMs),
					limit: {
						control_kind: "environment",
						environment: "REA_SWIFTC_COMPILE_TIMEOUT_MS",
						effective_value: outcome.timeoutMs,
						unit: "ms",
						minimum: 1,
						maximum: MAX_NODE_TIMER_DELAY_MS,
						default_value: DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS,
						applies_at: "next_startup"
					}
				};
			}
			/** Preserve the physical preparation failure while following the exact cleanup owner. */
			withCleanupFailure(cleanup, owner) {
				const combined = this.cleanupFailure === undefined || this.cleanupFailure === cleanup ? cleanup : analysisErrorWithCleanupDependencies(this.cleanupFailure, cleanup);
				return new DarwinProcessOwnershipInspectionError(this.message, {
					...Object.hasOwn(this, "cause") ? { cause: this.cause } : {},
					...this.compilerOutcome === undefined ? {} : { compilerOutcome: this.compilerOutcome },
					...this.capturedOutput === undefined ? {} : { capturedOutput: this.capturedOutput },
					cleanupFailure: combined,
					cleanupOwner: owner ?? this.cleanupOwner,
					...this.cancellation === undefined ? {} : { cancellation: this.cancellation }
				});
			}
		};
		MAX_COMPILER_OUTPUT_BYTES = 8 * 1024;
		compilerFailureFacts = (cause, timeoutMs) => {
			const failure = execFileOutputFailure(cause);
			if (failure === undefined) return undefined;
			const stderr = utf8HeadExcerpt(failure.stderr, MAX_COMPILER_OUTPUT_BYTES);
			const stdout = utf8HeadExcerpt(failure.stdout, MAX_COMPILER_OUTPUT_BYTES);
			const outcome = failure.code === "ETIMEDOUT" ? "timed_out" : typeof failure.code === "number" ? "exited" : failure.signal !== null ? "signaled" : failure.code === "ENOENT" ? "spawn_failed" : "failed";
			return {
				outcome: {
					outcome,
					code: failure.code,
					signal: failure.signal,
					stderr: stderr.text,
					...failure.stderrBytes === undefined ? {} : { stderrBytes: failure.stderrBytes },
					stderrTruncated: stderr.truncated,
					outputTruncated: failure.outputTruncated,
					killed: failure.killed,
					...outcome === "timed_out" ? { timeoutMs } : {}
				},
				capturedOutput: {
					...execFileFailureCapturedOutput(failure),
					stdout: stdout.text,
					stderr: stderr.text,
					truncated: stdout.truncated || stderr.truncated || failure.outputTruncated
				}
			};
		};
		compilerOutcomeDescription = (outcome, fallbackCode) => {
			if (outcome === undefined) return `compiler result: ${String(fallbackCode)}`;
			if (outcome.outcome === "exited") return `compiler result: exit code ${String(outcome.code)}`;
			if (outcome.outcome === "timed_out") {
				if (outcome.timeoutMs === undefined) return "compiler result: timed out. The effective REA_SWIFTC_COMPILE_TIMEOUT_MS value was not reported.";
				return `compiler result: timed out after ${String(outcome.timeoutMs)} ms. ${swiftcCompileTimeoutRecovery(outcome.timeoutMs)}`;
			}
			if (outcome.outcome === "signaled") return `compiler result: stopped by signal ${outcome.signal ?? "an unknown signal"}`;
			return `compiler result: ${String(outcome.code)}`;
		};
		compilerInspectionError = (cause, timeoutMs, compiler) => {
			const facts = compilerFailureFacts(cause, timeoutMs);
			const outcome = facts?.outcome;
			const code = outcome?.code ?? "unknown";
			const description = compilerOutcomeDescription(outcome, code);
			const launcher = compiler.kind === "xcrun" ? "xcrun" : "the selected Swift compiler (REA_DARWIN_SWIFTC_PATH)";
			const prefix = code === "ENOENT" ? `macOS process ownership inspection requires the Apple Swift compiler via ${launcher}` : `macOS process ownership helper compilation failed via ${launcher}`;
			const stderr = utf8HeadExcerpt(outcome?.stderr ?? "", STDERR_EXCERPT_LIMIT);
			const diagnostics = stderr.text.trim();
			const truncated = stderr.truncated || outcome?.stderrTruncated === true || outcome?.outputTruncated === true;
			const truncationNote = !truncated ? "" : stderr.truncated ? `… [diagnostics truncated at ${String(STDERR_EXCERPT_LIMIT)} bytes; this release has no runtime override]` : "… [diagnostics truncated; this release has no runtime override]";
			const suffix = diagnostics ? `: ${diagnostics}${truncationNote}` : outcome === undefined ? `: ${errorMessage(cause)}` : ": no compiler diagnostics were captured";
			return new DarwinProcessOwnershipInspectionError(`${prefix} (${description})${suffix}`, {
				cause,
				...facts === undefined ? {} : {
					compilerOutcome: facts.outcome,
					capturedOutput: facts.capturedOutput
				}
			});
		};
		waitForCompilation = async (operation, signal) => {
			if (signal === undefined) return {
				kind: "completed",
				result: await operation.promise
			};
			return new Promise((resolve) => {
				let completed = false;
				const finish = (outcome) => {
					if (completed) return;
					completed = true;
					signal.removeEventListener("abort", onAbort);
					resolve(outcome);
				};
				const onAbort = () => {
					if (operation.primaryFailure !== undefined) return;
					finish({
						kind: "cancelled",
						reason: signal.reason
					});
				};
				signal.addEventListener("abort", onAbort, { once: true });
				void operation.promise.then((result) => finish({
					kind: "completed",
					result
				}));
				if (signal.aborted) onAbort();
			});
		};
		helperLaunchFailed = (cause) => {
			const failure = execFileOutputFailure(cause);
			const code = failure?.code ?? (cause instanceof Error && "code" in cause ? cause.code : undefined);
			return [
				"EACCES",
				"EPERM",
				"ENOEXEC",
				"ENOENT"
			].includes(String(code)) || failure?.signal === "SIGKILL" && !failure.killed;
		};
		createDarwinProcessRunTokenReader = (options = {}) => {
			const compiler = options.compiler ?? {
				kind: "xcrun",
				executable: "/usr/bin/xcrun"
			};
			const environment = snapshotEnvironment(options.environment ?? process.env, HOST_PLATFORM.platform);
			const compilerTimeoutMs = resolveSwiftcCompileTimeoutMs({
				...options,
				environment
			});
			const moduleCachePath = options.moduleCachePath ?? "";
			const helperCache = options.helperCacheDirectory === undefined || compiler.kind !== "xcrun" ? undefined : createDarwinHelperCache({
				directory: options.helperCacheDirectory,
				sources: sourceFiles,
				xcrun: compiler.executable,
				environment
			});
			let root;
			let executable;
			let sharedExecutable;
			let perRunExecutable;
			let bypassCache = false;
			let compilation;
			let closePromise;
			let closed = false;
			let exitCleanupInstalled = false;
			const activeCommands = new Set();
			const cleanupAtExit = () => {
				if (root !== undefined) removeHelperRootAtExit(root.path);
			};
			const cleanupRoot = (target) => {
				target.cleanupPromise ??= Promise.resolve().then(async () => {
					try {
						await rm(target.path, {
							recursive: true,
							force: true
						});
					} catch (cause) {
						const failure = new ProviderCleanupError("process-ownership", [target.path], { reason: "The Darwin ownership helper root remains owned until removal succeeds." }, {
							cause,
							operation: "prepare_owned_process"
						});
						throw (target.cleanupRelease ??= new AnalysisCleanupRelease()).bind(failure);
					}
					target.cleanupRelease?.confirm();
					target.cleanupRelease = undefined;
					if (root !== target) return;
					root = undefined;
					executable = undefined;
					if (exitCleanupInstalled) process.removeListener("exit", cleanupAtExit);
					exitCleanupInstalled = false;
				}).catch((cause) => {
					target.cleanupPromise = undefined;
					throw cause;
				});
				return target.cleanupPromise;
			};
			const cleanupFailedCompilationRoot = async (target, primaryFailure) => {
				try {
					await target.close();
				} catch (cleanup) {
					if (!(cleanup instanceof ProviderCleanupError)) throw cleanup;
					const cause = primaryFailure === undefined ? cleanup : primaryFailure.cause;
					const primary = cause instanceof DarwinProcessOwnershipInspectionError ? cause : new DarwinProcessOwnershipInspectionError(primaryFailure === undefined ? "Darwin process ownership helper root cleanup retry failed" : "Darwin process ownership helper preparation failed", {
						cause,
						...cause instanceof ProcessOwnershipInspectionCancelled ? { cancellation: { reason: cause.reason } } : {}
					});
					throw primary.withCleanupFailure(cleanup, target);
				}
			};
			const runCompilation = async (operation) => {
				const signal = operation.controller.signal;
				let operationRoot;
				try {
					if (compiler.kind === "swiftc" && (!isAbsolute(compiler.executable) || !isAbsolute(compiler.sdkRoot))) {
						throw new DarwinProcessOwnershipInspectionError("Direct Darwin helper compilation requires absolute REA_DARWIN_SWIFTC_PATH and SDKROOT paths selecting a compatible installed Swift compiler and macOS SDK.");
					}
					const cached = bypassCache ? undefined : await helperCache?.lookup(signal);
					if (signal.aborted || closed) throw new ProcessOwnershipInspectionCancelled(signal.reason);
					if (cached?.kind === "hit") {
						sharedExecutable = cached.executable;
						executable = cached.executable;
						return cached.executable;
					}
					const allocatedRoot = {
						path: await mkdtemp(join(tmpdir(), "rea-process-token-")),
						close: () => cleanupRoot(allocatedRoot)
					};
					operationRoot = allocatedRoot;
					root = allocatedRoot;
					process.once("exit", cleanupAtExit);
					exitCleanupInstalled = true;
					if (signal.aborted || closed) throw new ProcessOwnershipInspectionCancelled(signal.reason);
					const output = join(operationRoot.path, "reader");
					const compilerTemporary = join(operationRoot.path, "tmp");
					await mkdir(compilerTemporary);
					const compilerEnvironment = {
						...environment,
						TMPDIR: compilerTemporary
					};
					const compilerArguments = compiler.kind === "xcrun" ? ["swiftc"] : ["-sdk", compiler.sdkRoot];
					if (compiler.kind === "swiftc") compilerEnvironment.SDKROOT = compiler.sdkRoot;
					if (moduleCachePath === "") {
						delete compilerEnvironment.CLANG_MODULE_CACHE_PATH;
					} else {
						await mkdir(moduleCachePath, { recursive: true });
						compilerArguments.push("-module-cache-path", moduleCachePath);
						compilerEnvironment.CLANG_MODULE_CACHE_PATH = moduleCachePath;
					}
					compilerArguments.push(...sourceFiles, "-o", output);
					try {
						await execFileOutput(compiler.executable, compilerArguments, {
							timeout: compilerTimeoutMs,
							maxBuffer: 1024 * 1024,
							signal,
							stopSignal: SWIFTC_INTERRUPT,
							lifetimePipe: true,
							env: compilerEnvironment
						});
					} catch (cause) {
						rethrowProcessOwnershipInspectionFailure(cause);
						throw compilerInspectionError(cause, compilerTimeoutMs, compiler);
					}
					if (signal.aborted || closed) throw new ProcessOwnershipInspectionCancelled(signal.reason);
					const shared = cached?.kind === "miss" ? await helperCache?.publish(cached.key, output, signal) : undefined;
					if (signal.aborted || closed) throw new ProcessOwnershipInspectionCancelled(signal.reason);
					perRunExecutable = output;
					sharedExecutable = shared;
					executable = shared ?? output;
					return executable;
				} catch (cause) {
					operation.primaryFailure = { cause };
					if (operationRoot !== undefined) {
						await cleanupFailedCompilationRoot(operationRoot, operation.primaryFailure);
					}
					throw cause;
				}
			};
			const beginCompilation = () => {
				const controller = new AbortController();
				const operation = {
					controller,
					promise: Promise.resolve().then(() => runCompilation(operation)).then(ok, err).finally(() => {
						operation.settled = true;
						if (compilation === operation) compilation = undefined;
					}),
					waiters: 0,
					aborting: false,
					settled: false
				};
				compilation = operation;
				return operation;
			};
			const compile = async (signal) => {
				if (closed) throw new ProcessAdmissionError("reader_closed");
				assertProcessOwnershipInspectionActive(signal);
				while (true) {
					if (closed) throw new ProcessAdmissionError("reader_closed");
					assertProcessOwnershipInspectionActive(signal);
					if (executable !== undefined) return executable;
					if (compilation === undefined && root !== undefined) {
						await cleanupFailedCompilationRoot(root);
						continue;
					}
					let operation = compilation;
					if (operation?.aborting === true) {
						const waited = await waitForCompilation(operation, signal);
						if (waited.kind === "cancelled") throw new ProcessOwnershipInspectionCancelled(waited.reason);
						if (!waited.result.ok) {
							const failure = waited.result.error;
							if (failure instanceof DarwinProcessOwnershipInspectionError && failure.cleanupFailure !== undefined || !isProcessOwnershipInspectionCancellation(operation.primaryFailure?.cause)) throw failure;
						}
						continue;
					}
					operation ??= beginCompilation();
					operation.waiters += 1;
					const waited = await waitForCompilation(operation, signal);
					operation.waiters -= 1;
					if (operation.waiters === 0 && !operation.settled && !operation.aborting) {
						operation.aborting = true;
						operation.controller.abort(OwnerCancellation.noLongerNeeded);
						const finalized = await operation.promise;
						if (waited.kind === "cancelled" && !finalized.ok && finalized.error instanceof DarwinProcessOwnershipInspectionError && finalized.error.cleanupFailure !== undefined) {
							throw new DarwinProcessOwnershipInspectionError("Darwin process ownership helper preparation was cancelled", {
								cause: waited.reason,
								cancellation: { reason: waited.reason },
								cleanupFailure: finalized.error.cleanupFailure,
								cleanupOwner: finalized.error.cleanupOwner
							});
						}
					}
					if (waited.kind === "cancelled") throw new ProcessOwnershipInspectionCancelled(waited.reason);
					if (!waited.result.ok) throw waited.result.error;
					return waited.result.value;
				}
			};
			const runHelper = (arguments_, signal) => {
				if (closed) return Promise.reject(new ProcessAdmissionError("reader_closed"));
				const execute = async (binary) => {
					const { stdout } = await execFileOutput(binary, arguments_, {
						env: environment,
						timeout: 15e3,
						stopSignal: "SIGTERM",
						...signal === undefined ? {} : { signal }
					});
					assertProcessOwnershipInspectionActive(signal);
					return stdout;
				};
				const pending = (async () => {
					const binary = await compile(signal);
					const usedShared = binary === sharedExecutable;
					try {
						return await execute(binary);
					} catch (cause) {
						if (!usedShared || !helperLaunchFailed(cause)) throw cause;
						bypassCache = true;
						sharedExecutable = undefined;
						if (executable === binary) executable = perRunExecutable;
						return execute(await compile(signal));
					}
				})();
				activeCommands.add(pending);
				return pending.finally(() => {
					activeCommands.delete(pending);
				});
			};
			const read = async (processes, signal) => {
				assertProcessOwnershipInspectionActive(signal);
				if (processes.length === 0) return new Map();
				const pids = processes.map(({ pid }) => String(pid));
				const stdout = await runHelper(pids, signal);
				const decoded = safeParseJson(stdout);
				if (!decoded.ok) throw new ProcessAdmissionError("token_json_invalid", { parser: decoded.error }, { cause: decoded.cause });
				const parsed = responseSchema.safeParse(decoded.value);
				if (!parsed.success) throw new ProcessAdmissionError("token_response_invalid", undefined, { cause: parsed.error });
				const requested = new Set(processes.map(({ pid }) => pid));
				const observations = new Map();
				for (const result of parsed.data.results) {
					if (!requested.has(result.pid) || observations.has(result.pid)) throw new ProcessAdmissionError("token_pid_set");
					observations.set(result.pid, result.state === "readable" ? {
						state: "readable",
						runId: result.run_id
					} : {
						state: "unavailable",
						reason: result.reason ?? "process token observation is unavailable"
					});
				}
				if (observations.size !== requested.size) throw new ProcessAdmissionError("token_pid_incomplete");
				return observations;
			};
			const identities = async (processes, signal) => {
				if (processes.length === 0) return new Map();
				const pids = processes.map(({ pid }) => String(pid));
				const stdout = await runHelper(["--identities", ...pids], signal);
				const decoded = safeParseJson(stdout);
				if (!decoded.ok) throw new ProcessAdmissionError("identity_json_invalid", { parser: decoded.error }, { cause: decoded.cause });
				const parsed = identityResponseSchema.safeParse(decoded.value);
				if (!parsed.success) throw new ProcessAdmissionError("identity_response_invalid", undefined, { cause: parsed.error });
				const requested = new Set(processes.map(({ pid }) => pid));
				const observations = new Map();
				for (const result of parsed.data.results) {
					if (!requested.has(result.pid) || observations.has(result.pid)) throw new ProcessAdmissionError("identity_pid_set");
					observations.set(result.pid, result.state === "readable" ? {
						state: "readable",
						identity: result.identity,
						...result.effective_uid === undefined ? {} : { effectiveUid: result.effective_uid },
						...result.lifecycle === undefined ? {} : { lifecycle: {
							state: "observed",
							lifecycle: result.lifecycle
						} },
						...result.relation === undefined ? {} : { relation: {
							state: "observed",
							parentPid: result.relation.parent_pid,
							processGroupId: result.relation.process_group_id
						} },
						...result.name === undefined || result.name === "" ? {} : { name: result.name }
					} : result.state === "absent" ? {
						state: "absent",
						reason: result.reason
					} : {
						state: "unavailable",
						reason: result.reason
					});
				}
				if (observations.size !== requested.size) throw new ProcessAdmissionError("identity_pid_incomplete");
				return observations;
			};
			const close = () => {
				if (closePromise !== undefined) return closePromise;
				closed = true;
				const pendingClose = (async () => {
					const operation = compilation;
					if (operation !== undefined && !operation.settled) {
						operation.aborting = true;
						operation.controller.abort(OwnerCancellation.ownerClosed);
						await operation.promise;
					}
					await Promise.allSettled(activeCommands);
					const [rootCleanup, cacheCleanup] = await Promise.allSettled([root?.close(), helperCache?.close()]);
					if (rootCleanup.status === "rejected" && cacheCleanup.status === "rejected" && rootCleanup.reason instanceof ProviderCleanupError && cacheCleanup.reason instanceof ProviderCleanupError) throw analysisErrorWithCleanupDependencies(rootCleanup.reason, cacheCleanup.reason);
					if (rootCleanup.status === "rejected") throw rootCleanup.reason;
					if (cacheCleanup.status === "rejected") throw cacheCleanup.reason;
				})().catch((cause) => {
					if (closePromise === pendingClose) closePromise = undefined;
					throw cause;
				});
				closePromise = pendingClose;
				return closePromise;
			};
			return {
				read,
				identities,
				prepare: compile,
				close
			};
		};
	})))();
}

//#endregion
//#region dist/process/ProcessInspectionCleanup.js
var isProcessInspectionFailure, processInspectionCleanupFailures, processInspectionCancellations, rethrowProcessInspectionFailure;
function init_ProcessInspectionCleanup() {
	return (init_ProcessInspectionCleanup = __esmMin((() => {
		init_OwnedRegularFile();
		init_DarwinProcessRunTokenReader();
		init_ProcessInspectionCancellation();
		isProcessInspectionFailure = (cause) => cause instanceof DarwinProcessOwnershipInspectionError || cause instanceof RegularFileCleanupFailure || cause instanceof ProcessOwnershipInspectionCancelled || cause instanceof ProcessOwnershipIdentityBatchFailure;
		processInspectionCleanupFailures = (cause) => {
			const failures = [];
			const visited = new Set();
			const owners = new Set();
			const visit = (failure) => {
				if (visited.has(failure)) return;
				visited.add(failure);
				if (failure instanceof ProcessOwnershipIdentityBatchFailure) {
					for (const entry of failure.failures) visit(entry.cause);
					for (const entry of failure.physicalFailures) visit(entry.cause);
					return;
				}
				if (failure instanceof RegularFileCleanupFailure) {
					if (!owners.has(failure.owner)) {
						owners.add(failure.owner);
						failures.push(failure);
					}
					return;
				}
				if (!(failure instanceof DarwinProcessOwnershipInspectionError)) return;
				const owner = failure.cleanupOwner;
				if (owner === undefined) {
					if (failure.cleanupFailure !== undefined) failures.push(failure);
				} else if (!owners.has(owner)) {
					owners.add(owner);
					failures.push(failure);
				}
			};
			visit(cause);
			return failures;
		};
		processInspectionCancellations = (cause) => {
			const facts = [];
			const visited = new Set();
			const add = (fact) => {
				if (fact !== undefined && !facts.some((existing) => Object.is(existing.reason, fact.reason))) facts.push(fact);
			};
			const visit = (failure) => {
				if (visited.has(failure)) return;
				visited.add(failure);
				if (failure instanceof ProcessOwnershipIdentityBatchFailure) {
					for (const entry of failure.cancellations) visit(entry.cancellation);
					for (const entry of failure.physicalFailures) visit(entry.cause);
				} else if (failure instanceof DarwinProcessOwnershipInspectionError) add(failure.cancellation);
				else if (failure instanceof RegularFileCleanupFailure) {
					add(regularFileCancellation(failure));
					if (failure.operationFailure === undefined && failure.outcome.kind === "failed") add(ProcessOwnershipInspectionCancelled.from(failure.outcome.cause));
				} else if (failure instanceof ProcessOwnershipInspectionCancelled) add(failure);
			};
			visit(cause);
			return facts;
		};
		rethrowProcessInspectionFailure = (cause) => {
			if (processInspectionCleanupFailures(cause).length > 0 || processInspectionCancellations(cause).length > 0) throw cause;
			rethrowProcessOwnershipInspectionFailure(cause);
		};
	})))();
}

//#endregion
//#region dist/process/ProcessInspectionFile.js
var readProcessInspectionFile;
function init_ProcessInspectionFile() {
	return (init_ProcessInspectionFile = __esmMin((() => {
		init_OwnedFileHandle();
		init_OwnedRegularFile();
		init_readFileHandleChunks();
		init_ProcessInspectionCancellation();
		readProcessInspectionFile = async (path, signal) => {
			assertProcessOwnershipInspectionActive(signal);
			const owner = new OwnedFileHandle(await open(path, "r"));
			try {
				return await withOwnedFileHandle(path, owner, signal === undefined ? {} : { signal }, async (handle) => {
					const bytes = [];
					for await (const chunk of readFileHandleChunks(handle, {
						signal,
						cancellationFailure: (reason) => new ProcessOwnershipInspectionCancelled(reason)
					})) bytes.push(chunk);
					return Buffer.concat(bytes).toString("utf8");
				});
			} catch (cause) {
				rethrowProcessOwnershipInspectionFailure(cause);
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/process/systemPs.js
var LINUX_SYSTEM_PS_LOCATIONS, PROCESS_INVENTORY_PS_ARGUMENTS, describeSystemPs, executableFile, resolveSystemPs;
function init_systemPs() {
	return (init_systemPs = __esmMin((() => {
		LINUX_SYSTEM_PS_LOCATIONS = [
			"/bin/ps",
			"/usr/bin/ps",
			"/run/current-system/sw/bin/ps"
		];
		PROCESS_INVENTORY_PS_ARGUMENTS = ["-axo", "pid=,ppid=,pgid=,uid=,stat=,command="];
		describeSystemPs = (ps) => ps.source === "system" ? `ps at ${ps.command}` : `ps from REA's PATH (none of ${LINUX_SYSTEM_PS_LOCATIONS.join(", ")} is executable)`;
		executableFile = async (path) => {
			try {
				await access(path, constants.X_OK);
				return true;
			} catch {
				return false;
			}
		};
		resolveSystemPs = async (platform, { linuxLocations = LINUX_SYSTEM_PS_LOCATIONS, isExecutable = executableFile } = {}) => {
			if (platform === "darwin") return {
				command: "/bin/ps",
				source: "system"
			};
			if (platform === "linux") {
				for (const command of linuxLocations) if (await isExecutable(command)) return {
					command,
					source: "system"
				};
			}
			return {
				command: "ps",
				source: "path"
			};
		};
	})))();
}

//#endregion
//#region dist/process/ProcessLifecycle.js
var PROCESS_CLEANUP_VERIFICATION_GRACE_MS, PROCESS_CLEANUP_VERIFICATION_INTERVAL_MS, processIdentityHasExited, processIdentityIsExiting;
function init_ProcessLifecycle() {
	return (init_ProcessLifecycle = __esmMin((() => {
		PROCESS_CLEANUP_VERIFICATION_GRACE_MS = 1e3;
		PROCESS_CLEANUP_VERIFICATION_INTERVAL_MS = 25;
		processIdentityHasExited = (identity) => identity?.state === "absent" || identity?.state === "readable" && identity.lifecycle?.state === "observed" && (identity.lifecycle.lifecycle === "zombie" || identity.lifecycle.lifecycle === "dead");
		processIdentityIsExiting = (identity) => identity?.state === "readable" && identity.lifecycle?.state === "observed" && identity.lifecycle.lifecycle === "exiting";
	})))();
}

//#endregion
//#region dist/process/LinuxProcessStat.js
var PF_EXITING, PF_KTHREAD, parseLinuxProcessStat;
function init_LinuxProcessStat() {
	return (init_LinuxProcessStat = __esmMin((() => {
		PF_EXITING = 4;
		PF_KTHREAD = 2097152;
		parseLinuxProcessStat = (value) => {
			const commandStart = value.indexOf("(");
			const commandEnd = value.lastIndexOf(")");
			if (commandStart <= 0 || commandEnd <= commandStart) return undefined;
			const pidText = value.slice(0, commandStart).trim();
			if (!/^\d+$/u.test(pidText)) return undefined;
			const pid = Number(pidText);
			if (!Number.isSafeInteger(pid) || pid <= 0) return undefined;
			const fields = value.slice(commandEnd + 1).trim().split(/\s+/u);
			const state = fields[0];
			const parentPidText = fields[1];
			const processGroupIdText = fields[2];
			const sessionIdText = fields[3];
			const startTime = fields[19];
			if (state === undefined || !/^[A-Za-z]$/u.test(state) || parentPidText === undefined || !/^\d+$/u.test(parentPidText) || processGroupIdText === undefined || !/^(?:-1|\d+)$/u.test(processGroupIdText) || sessionIdText === undefined || !/^(?:-1|\d+)$/u.test(sessionIdText) || startTime === undefined || !/^\d+$/u.test(startTime)) return undefined;
			const parentPid = Number(parentPidText);
			const processGroupId = Number(processGroupIdText);
			const sessionId = Number(sessionIdText);
			if (!Number.isSafeInteger(parentPid) || !Number.isSafeInteger(processGroupId) || !Number.isSafeInteger(sessionId)) return undefined;
			const flagsText = fields[6];
			const flags = flagsText !== undefined && /^\d+$/u.test(flagsText) ? Number(flagsText) : Number.NaN;
			const kernelThread = Number.isSafeInteger(flags) ? (flags & PF_KTHREAD) !== 0 : undefined;
			const lifecycle = state === "Z" ? "zombie" : state === "X" || state === "x" ? "dead" : !Number.isSafeInteger(flags) ? undefined : (flags & PF_EXITING) !== 0 ? "exiting" : "non-zombie";
			return {
				pid,
				name: value.slice(commandStart + 1, commandEnd),
				startTime,
				lifecycle,
				parentPid,
				processGroupId,
				sessionId,
				kernelThread
			};
		};
	})))();
}

//#endregion
//#region dist/process/LinuxProcessStatus.js
var parseLinuxProcessIds, linuxUidMapsDiffer, linuxEnvironmentRestriction;
function init_LinuxProcessStatus() {
	return (init_LinuxProcessStatus = __esmMin((() => {
		parseLinuxProcessIds = (value, row) => {
			let ids;
			for (const line of value.split("\n")) {
				if (!line.startsWith(`${row}:`)) continue;
				if (ids !== undefined) return undefined;
				const match = /^[UG]id:\s+([0-9]+)\s+([0-9]+)\s+([0-9]+)\s+([0-9]+)\s*$/u.exec(line);
				if (match === null) return undefined;
				const [real, effective, saved, filesystem] = match.slice(1).map(Number);
				if (real === undefined || effective === undefined || saved === undefined || filesystem === undefined || [
					real,
					effective,
					saved,
					filesystem
				].some((id) => !Number.isSafeInteger(id) || id < 0)) return undefined;
				ids = [
					real,
					effective,
					saved,
					filesystem
				];
			}
			return ids;
		};
		linuxUidMapsDiffer = (target, caller) => {
			const normalized = (value) => {
				if (value === undefined || value.trim() === "") return undefined;
				const rows = [];
				for (const line of value.trim().split("\n")) {
					const match = /^\s*([0-9]+)\s+([0-9]+)\s+([0-9]+)\s*$/u.exec(line);
					if (match === null) return undefined;
					const numbers = match.slice(1).map(Number);
					if (numbers.some((number) => !Number.isSafeInteger(number))) return undefined;
					rows.push(numbers.join(" "));
				}
				return rows.join("\n");
			};
			const targetMap = normalized(target);
			const callerMap = normalized(caller);
			return targetMap === undefined || callerMap === undefined ? undefined : targetMap !== callerMap;
		};
		linuxEnvironmentRestriction = (facts) => {
			const { uids, gids, procfsOwnerUid, callerUid, callerGid, userNamespaceDiffers } = facts;
			if (callerUid !== undefined && uids.slice(0, 3).some((uid) => uid !== callerUid) || callerGid !== undefined && gids !== undefined && gids.slice(0, 3).some((gid) => gid !== callerGid)) return "credentials";
			if (procfsOwnerUid !== undefined && procfsOwnerUid !== uids[1]) return "non-dumpable";
			return userNamespaceDiffers === true ? "user-namespace" : undefined;
		};
	})))();
}

//#endregion
//#region dist/process/ProcessCommandIdentity.js
var matchesOwnedProcessCommand;
function init_ProcessCommandIdentity() {
	return (init_ProcessCommandIdentity = __esmMin((() => {
		matchesOwnedProcessCommand = (actual, expected, platform) => {
			const actualCommand = actual.trim();
			const expectedCommand = expected.trim();
			if (actualCommand === expectedCommand || actualCommand.startsWith(`${expectedCommand} `)) return true;
			if (platform !== "darwin") return false;
			const actualExecutable = actualCommand.split(/\s+/u, 1)[0];
			const expectedExecutable = expectedCommand.split(/\s+/u, 1)[0];
			const normalizedActualExecutable = actualExecutable?.startsWith("(") === true && actualExecutable.endsWith(")") ? actualExecutable.slice(1, -1) : actualExecutable;
			return normalizedActualExecutable !== undefined && expectedExecutable !== undefined && basename(normalizedActualExecutable) === basename(expectedExecutable);
		};
	})))();
}

//#endregion
//#region dist/process/ProcessOwnershipIdentity.js
var launcherIdentityFailure;
function init_ProcessOwnershipIdentity() {
	return (init_ProcessOwnershipIdentity = __esmMin((() => {
		init_ProcessCommandIdentity();
		init_HostPlatform();
		launcherIdentityFailure = (launcher, ownership) => {
			if (launcher.processGroupId !== ownership.processGroupId) return "owned launcher process-group identity did not match";
			if (ownership.expectedParentPid !== undefined && launcher.parentPid !== ownership.expectedParentPid) return "owned launcher parent identity did not match";
			if (ownership.expectedCommand !== undefined) {
				if (launcher.command === undefined) return "owned launcher command identity could not be verified";
				if (!matchesOwnedProcessCommand(launcher.command, ownership.expectedCommand, HOST_PLATFORM.platform)) return `owned launcher command identity did not match (observed=${launcher.command}; expected=${ownership.expectedCommand})`;
			}
			return null;
		};
	})))();
}

//#endregion
//#region dist/process/ProcessOwnershipProcessTree.js
var liveProcesses, descendantsOf, selectCapturedProcessGroupIds;
function init_ProcessOwnershipProcessTree() {
	return (init_ProcessOwnershipProcessTree = __esmMin((() => {
		liveProcesses = (members) => members.filter(({ state }) => !state.startsWith("Z"));
		descendantsOf = (rootPids, processes) => {
			const childrenByParent = new Map();
			for (const process of processes) {
				const siblings = childrenByParent.get(process.parentPid) ?? [];
				siblings.push(process);
				childrenByParent.set(process.parentPid, siblings);
			}
			const descendants = [];
			const pending = rootPids.flatMap((pid) => childrenByParent.get(pid) ?? []);
			const visited = new Set(rootPids);
			for (const process of pending) {
				if (visited.has(process.pid)) continue;
				visited.add(process.pid);
				descendants.push(process);
				for (const child of childrenByParent.get(process.pid) ?? []) pending.push(child);
			}
			return descendants;
		};
		selectCapturedProcessGroupIds = (rootPid, samples) => {
			const processGroupIds = new Set([rootPid]);
			for (const sample of samples) {
				if (sample.pid === sample.process_group_id) processGroupIds.add(sample.pid);
			}
			return [...processGroupIds];
		};
	})))();
}

//#endregion
//#region dist/process/ProcessRunTokenObservations.js
/** Read only ownership tokens, using per-process fallback for missing batch rows. */
async function* readProcessRunTokens(host, processes, signal) {
	assertProcessOwnershipInspectionActive(signal);
	if (processes.length === 0) return;
	let batch;
	let batchFailure;
	if (host.runTokens !== undefined) {
		try {
			batch = signal === undefined ? await host.runTokens(processes) : await host.runTokens(processes, signal);
		} catch (cause) {
			if (cause instanceof DarwinProcessOwnershipInspectionError && (cause.cleanupOwner !== undefined || cause.cleanupFailure !== undefined)) throw cause;
			rethrowProcessOwnershipInspectionFailure(cause);
			batchFailure = errorMessage(cause);
		}
	}
	for (const process of processes) {
		assertProcessOwnershipInspectionActive(signal);
		let observation = batch?.get(process.pid);
		if (observation === undefined) {
			observation = await readProcessRunToken(host, process.pid, signal);
			if (observation.state === "unavailable" && batchFailure !== undefined) observation = {
				...observation,
				reason: `${observation.reason}; run-token batch failed: ${batchFailure}`
			};
		}
		assertProcessOwnershipInspectionActive(signal);
		yield {
			process,
			observation
		};
	}
}
var ProcessRunTokenReadError, processRunIdFromEnvironment, readProcessRunToken, readRunTokenCarriers;
function init_ProcessRunTokenObservations() {
	return (init_ProcessRunTokenObservations = __esmMin((() => {
		init_DarwinProcessRunTokenReader();
		init_ProcessInspectionCancellation();
		init_ProcessOwnershipProcessTree();
		init_errorMessage();
		ProcessRunTokenReadError = class extends Error {
			pid;
			availability;
			reason;
			_tag = "ProcessRunTokenReadError";
			constructor(pid, availability, reason) {
				super(`Run token for PID ${String(pid)}: ${reason}`);
				this.pid = pid;
				this.availability = availability;
				this.reason = reason;
				this.name = "ProcessRunTokenReadError";
			}
		};
		processRunIdFromEnvironment = (environment) => Object.hasOwn(environment, "REA_PROCESS_RUN_ID") ? environment.REA_PROCESS_RUN_ID : undefined;
		readProcessRunToken = async (host, pid, signal) => {
			assertProcessOwnershipInspectionActive(signal);
			try {
				const environment = signal === undefined ? await host.environment(pid) : await host.environment(pid, signal);
				assertProcessOwnershipInspectionActive(signal);
				return {
					state: "readable",
					runId: processRunIdFromEnvironment(environment)
				};
			} catch (cause) {
				if (cause instanceof DarwinProcessOwnershipInspectionError && (cause.cleanupOwner !== undefined || cause.cleanupFailure !== undefined)) throw cause;
				rethrowProcessOwnershipInspectionFailure(cause);
				const code = cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
				return {
					state: "unavailable",
					...code === undefined ? {} : { code },
					reason: errorMessage(cause)
				};
			}
		};
		readRunTokenCarriers = async (host, runId, signal) => {
			const carriers = [];
			const processes = liveProcesses(signal === undefined ? await host.listProcesses() : await host.listProcesses(signal));
			for await (const { process, observation } of readProcessRunTokens(host, processes, signal)) if (observation.state === "readable" && observation.runId === runId) carriers.push(process);
			return carriers;
		};
	})))();
}

//#endregion
//#region dist/process/ProcessOwnershipObservation.js
var rethrowInspectionFailure, observeOwnedProcessGroups, observeOwnedProcessLineage, observeNativeOwnedProcessLineage, classifyIdentitylessLineageRefresh, processWithNativeRelation, lineageTokenMismatchReason, unavailableLineage, parseProcessEnvironment, identityFact, readIdentityFacts, readNativeProcessIdentityMap, settleExitingProcessIdentities, settleVanishedTokenFacts, readProcessOwnershipFacts, TOKEN_READ_RETRY_ATTEMPTS, TOKEN_READ_RETRY_DELAY_MS, reobserveUnavailableTokenFacts, createSystemProcessOwnershipHost, systemProcessOwnershipHost, observeProcessStartIdentity, liveProcessIdentity, observeProcessStartIdentityExit, signalProcessWithStartIdentity, LINUX_PROCESS_OWNERSHIP_REMEDIATION, LinuxOwnedProcessPrerequisiteError, DARWIN_PROCESS_OWNERSHIP_REMEDIATION, processOwnershipAdmissionRecovery, prepareProcessOwnershipInspection, processIsGone;
function init_ProcessOwnershipObservation() {
	return (init_ProcessOwnershipObservation = __esmMin((() => {
		init_ProcessInspectionFile();
		init_HostPlatform();
		init_systemPs();
		init_ProcessInspectionCancellation();
		init_ProcessAdmissionError();
		init_ProcessLifecycle();
		init_LinuxProcessStat();
		init_LinuxProcessStatus();
		init_analysisErrorCore();
		init_ProcessOwnershipIdentity();
		init_ProcessOwnershipProcessTree();
		init_ExecFileOutput();
		init_launchFailure();
		init_DarwinProcessRunTokenReader();
		init_DarwinHelperCache();
		init_ProcessRunTokenObservations();
		init_errorMessage();
		rethrowInspectionFailure = (cause) => {
			if (cause instanceof DarwinProcessOwnershipInspectionError && (cause.cleanupOwner !== undefined || cause.cleanupFailure !== undefined)) throw cause;
			rethrowProcessOwnershipInspectionFailure(cause);
		};
		observeOwnedProcessGroups = async (runId, processGroupIds, host = systemProcessOwnershipHost, signal, evidenceOwner) => {
			assertProcessOwnershipInspectionActive(signal);
			const groupIds = [...new Set(processGroupIds)];
			if (groupIds.length === 0) return new Map();
			let processes;
			try {
				processes = liveProcesses(await host.listProcesses(signal));
			} catch (cause) {
				rethrowInspectionFailure(cause);
				const failure = {
					state: "unverifiable",
					reason: `process group could not be inspected: ${errorMessage(cause)}`
				};
				return new Map(groupIds.map((groupId) => [groupId, failure]));
			}
			assertProcessOwnershipInspectionActive(signal);
			if (host.processIdentities !== undefined) {
				const observationRows = evidenceOwner?.rowsForObservation(processes) ?? processes;
				const retainedPids = new Set(evidenceOwner?.candidates.map(({ pid }) => pid) ?? []);
				const firstIdentities = await readNativeProcessIdentityMap(observationRows, host, signal);
				const candidateProcesses = observationRows.filter((process) => {
					if (retainedPids.has(process.pid)) return true;
					const identity = firstIdentities.get(process.pid);
					if (identity?.state === "readable") {
						if (processIdentityHasExited(identity)) return false;
						if (identity.relation?.state === "observed" && groupIds.includes(identity.relation.processGroupId)) return true;
						return groupIds.includes(process.processGroupId);
					}
					return groupIds.includes(process.processGroupId);
				});
				const facts = await readProcessOwnershipFacts(candidateProcesses, host, signal, { identityBefore: firstIdentities });
				evidenceOwner?.reconcile(facts, {
					runId,
					listedRows: processes.length,
					listedPids: new Set(processes.map(({ pid }) => pid)),
					leaderPid: -1,
					processGroupIds: new Set(groupIds),
					scopeFacts: facts
				});
				const observations = new Map(groupIds.map((groupId) => [groupId, { state: "empty" }]));
				for (const fact of facts) {
					if (processIdentityHasExited(fact.identityAfter)) continue;
					if (groupIds.includes(fact.process.processGroupId) && (fact.identityBefore.state !== "readable" || fact.identityBefore.relation?.state !== "observed")) observations.set(fact.process.processGroupId, {
						state: "unverifiable",
						reason: "native process-group membership could not be verified"
					});
					const nativeGroupId = fact.identityAfter.state === "readable" && fact.identityAfter.relation?.state === "observed" ? fact.identityAfter.relation.processGroupId : undefined;
					const candidateGroups = groupIds.filter((groupId) => nativeGroupId === groupId || nativeGroupId === undefined && fact.process.processGroupId === groupId);
					for (const groupId of candidateGroups) {
						if (observations.get(groupId)?.state === "unverifiable") continue;
						if (fact.state !== "same-generation" || fact.identityAfter.state !== "readable" || nativeGroupId !== groupId) {
							observations.set(groupId, {
								state: "unverifiable",
								reason: `native process-group membership could not be revalidated for PID ${String(fact.process.pid)}`
							});
							continue;
						}
						if (fact.token.state !== "readable" || fact.token.runId !== runId) {
							observations.set(groupId, {
								state: "unverifiable",
								reason: fact.token.state === "unavailable" ? `process ownership could not be revalidated for PID ${String(fact.process.pid)}: ${fact.token.reason}` : "process ownership did not match"
							});
							continue;
						}
						observations.set(groupId, { state: "alive" });
					}
				}
				assertProcessOwnershipInspectionActive(signal);
				return observations;
			}
			const membersByGroup = new Map(groupIds.map((groupId) => [groupId, []]));
			for (const process of processes) membersByGroup.get(process.processGroupId)?.push(process);
			const observations = new Map(groupIds.map((groupId) => [groupId, (membersByGroup.get(groupId)?.length ?? 0) > 0 ? { state: "alive" } : { state: "empty" }]));
			const liveMembers = groupIds.flatMap((groupId) => membersByGroup.get(groupId) ?? []);
			const pendingGroups = new Set(groupIds.filter((groupId) => (membersByGroup.get(groupId)?.length ?? 0) > 0));
			for await (const { process: member, observation } of readProcessRunTokens(host, liveMembers, signal)) {
				if (!pendingGroups.has(member.processGroupId)) continue;
				if (observation.state === "readable") {
					if (observation.runId !== runId) {
						observations.set(member.processGroupId, {
							state: "unverifiable",
							reason: "process ownership did not match"
						});
						pendingGroups.delete(member.processGroupId);
					}
				} else {
					const gone = await processIsGone(host, member.pid, signal);
					assertProcessOwnershipInspectionActive(signal);
					if (!gone) {
						observations.set(member.processGroupId, {
							state: "unverifiable",
							reason: `process ownership could not be revalidated for PID ${member.pid}: ${observation.reason}`
						});
						pendingGroups.delete(member.processGroupId);
					}
				}
				if (pendingGroups.size === 0) break;
			}
			assertProcessOwnershipInspectionActive(signal);
			return observations;
		};
		observeOwnedProcessLineage = async (ownership, host = systemProcessOwnershipHost) => {
			let processes;
			try {
				processes = liveProcesses(await host.listProcesses());
			} catch (cause) {
				rethrowInspectionFailure(cause);
				return unavailableLineage(ownership, `process table could not be inspected: ${errorMessage(cause)}`);
			}
			if (host.processIdentities !== undefined) return observeNativeOwnedProcessLineage(ownership, processes, host);
			const launcher = processes.find(({ pid }) => pid === ownership.leaderPid);
			if (launcher === undefined) return unavailableLineage(ownership, "owned launcher is not live");
			const identityFailure = launcherIdentityFailure(launcher, ownership);
			if (identityFailure !== null) return unavailableLineage(ownership, identityFailure);
			const descendants = descendantsOf([launcher.pid], processes);
			const verifiedDescendants = [];
			const initialTree = new Set(descendants.map(({ pid }) => pid));
			const initialRelations = new Map();
			const examinedRefresh = new Map();
			for (const process of processes) {
				if (process.pid === launcher.pid) continue;
				const relation = {
					parentPid: process.parentPid,
					processGroupId: process.processGroupId,
					inTree: initialTree.has(process.pid),
					tokenChecked: false,
					descendant: undefined
				};
				initialRelations.set(process.pid, relation);
				examinedRefresh.set(process.pid, relation);
			}
			let refreshDescendants = [];
			let suppressedRefreshPids = new Set();
			let latestRefreshPids;
			for await (const { process: member, observation } of readProcessRunTokens(host, [launcher, ...descendants])) {
				if (observation.state === "readable") {
					if (observation.runId !== ownership.runId) return unavailableLineage(ownership, lineageTokenMismatchReason(member.pid, observation.runId));
					if (member.pid !== launcher.pid) verifiedDescendants.push(member);
					const seeded = examinedRefresh.get(member.pid);
					if (seeded !== undefined) examinedRefresh.set(member.pid, {
						...seeded,
						tokenChecked: true
					});
				} else {
					let refreshed;
					try {
						refreshed = liveProcesses(await host.listProcesses());
					} catch (cause) {
						rethrowInspectionFailure(cause);
						void cause;
						return unavailableLineage(ownership, `process ownership could not be revalidated for PID ${member.pid}: ${observation.reason}`);
					}
					if (refreshed.some((process) => process.pid === member.pid)) return unavailableLineage(ownership, `process ownership could not be revalidated for PID ${member.pid}: ${observation.reason}`);
					if (member.pid === launcher.pid) return unavailableLineage(ownership, "owned launcher exited during lineage validation");
					const classified = await classifyIdentitylessLineageRefresh(ownership, launcher.pid, refreshed, host, examinedRefresh, initialRelations);
					if (classified.status === "unavailable") return unavailableLineage(ownership, classified.reason);
					refreshDescendants = classified.descendants;
					suppressedRefreshPids = new Set(classified.suppressedPids);
					latestRefreshPids = new Set(refreshed.map(({ pid }) => pid));
				}
			}
			return {
				status: "verified",
				observedAt: new Date().toISOString(),
				lineage: {
					runId: ownership.runId,
					launcherPid: launcher.pid,
					launcherParentPid: launcher.parentPid,
					processGroupId: launcher.processGroupId,
					descendants: [...verifiedDescendants.filter(({ pid }) => (latestRefreshPids === undefined || latestRefreshPids.has(pid)) && !suppressedRefreshPids.has(pid) && !refreshDescendants.some((descendant) => descendant.pid === pid)), ...refreshDescendants].sort((left, right) => left.pid - right.pid).map(({ pid, parentPid, processGroupId }) => ({
						pid,
						parentPid,
						processGroupId
					}))
				}
			};
		};
		observeNativeOwnedProcessLineage = async (ownership, processes, host) => {
			const initialIdentities = await readNativeProcessIdentityMap(processes, host);
			const launcher = processes.find(({ pid }) => pid === ownership.leaderPid);
			const launcherIdentity = launcher === undefined ? undefined : initialIdentities.get(launcher.pid);
			const nativeLauncher = launcher !== undefined && launcherIdentity?.state === "readable" && !processIdentityHasExited(launcherIdentity) ? processWithNativeRelation(launcher, launcherIdentity) : undefined;
			const identityFailure = nativeLauncher === undefined ? null : launcherIdentityFailure(nativeLauncher, ownership);
			const candidateProcesses = processes.map((process) => {
				const identity = initialIdentities.get(process.pid);
				const nativeProcess = identity?.state === "readable" ? processWithNativeRelation(process, identity) : undefined;
				return nativeProcess ?? process;
			});
			const descendants = descendantsOf([ownership.leaderPid], candidateProcesses);
			const lineageRows = [...launcher === undefined ? [] : [launcher], ...descendants];
			const nativeExitedPids = new Set(processes.filter(({ pid }) => processIdentityHasExited(initialIdentities.get(pid))).map(({ pid }) => pid));
			const candidates = lineageRows.filter(({ pid }) => !nativeExitedPids.has(pid));
			const facts = await readProcessOwnershipFacts(candidates, host, undefined, { identityBefore: initialIdentities });
			ownership.evidenceOwner?.reconcile(facts, {
				runId: ownership.runId,
				listedRows: processes.length,
				listedPids: new Set(processes.map(({ pid }) => pid)),
				leaderPid: ownership.leaderPid,
				processGroupIds: new Set([ownership.processGroupId, ...ownership.sampledProcessGroupIds ?? []]),
				allowCapturedScope: identityFailure === null,
				nativeExitedPids,
				unverifiedLineageRelations: new Map(lineageRows.map(({ pid, parentPid, processGroupId }) => [pid, {
					parentPid,
					processGroupId
				}]))
			});
			if (launcher === undefined) return unavailableLineage(ownership, "owned launcher is not live");
			if (launcherIdentity?.state === "absent") return unavailableLineage(ownership, "owned launcher is not live");
			if (launcherIdentity?.state !== "readable") return unavailableLineage(ownership, `owned launcher identity could not be read: ${launcherIdentity?.reason ?? "identity observation was omitted"}`);
			if (processIdentityHasExited(launcherIdentity)) return unavailableLineage(ownership, "owned launcher is not live");
			if (nativeLauncher === undefined) return unavailableLineage(ownership, "owned launcher native parent/group relation was unavailable");
			if (identityFailure !== null) return unavailableLineage(ownership, identityFailure);
			const factsByPid = new Map(facts.map((fact) => [fact.process.pid, fact]));
			const verifiedDescendants = [];
			let currentLauncher = nativeLauncher;
			for (const member of candidates) {
				const fact = factsByPid.get(member.pid);
				if (fact === undefined) return unavailableLineage(ownership, `native process facts were unavailable for PID ${String(member.pid)}`);
				if (fact.state === "absent") {
					if (member.pid === ownership.leaderPid) return unavailableLineage(ownership, "owned launcher exited during lineage validation");
					continue;
				}
				if (fact.state !== "same-generation") return unavailableLineage(ownership, `process identity changed or became unavailable during lineage validation for PID ${String(member.pid)}`);
				if (processIdentityHasExited(fact.identityAfter)) {
					if (member.pid === ownership.leaderPid) return unavailableLineage(ownership, "owned launcher exited during lineage validation");
					continue;
				}
				if (fact.token.state !== "readable") return unavailableLineage(ownership, `process ownership could not be revalidated for PID ${String(member.pid)}: ${fact.token.reason}`);
				if (fact.token.runId !== ownership.runId) return unavailableLineage(ownership, lineageTokenMismatchReason(member.pid, fact.token.runId));
				const nativeMember = processWithNativeRelation(fact.process, fact.identityAfter);
				if (nativeMember === undefined) return unavailableLineage(ownership, `native process relation was unavailable for PID ${String(member.pid)}`);
				if (member.pid === ownership.leaderPid) {
					const failure = launcherIdentityFailure(nativeMember, ownership);
					if (failure !== null) return unavailableLineage(ownership, failure);
					currentLauncher = nativeMember;
					continue;
				}
				verifiedDescendants.push(nativeMember);
			}
			const currentDescendantPids = new Set(descendantsOf([ownership.leaderPid], [currentLauncher, ...verifiedDescendants]).map(({ pid }) => pid));
			const moved = verifiedDescendants.find(({ pid }) => !currentDescendantPids.has(pid));
			if (moved !== undefined) return unavailableLineage(ownership, `process lineage relation changed during validation for PID ${String(moved.pid)}`);
			return {
				status: "verified",
				observedAt: new Date().toISOString(),
				lineage: {
					runId: ownership.runId,
					launcherPid: ownership.leaderPid,
					launcherParentPid: currentLauncher.parentPid,
					processGroupId: currentLauncher.processGroupId,
					descendants: verifiedDescendants.sort((left, right) => left.pid - right.pid).map(({ pid, parentPid, processGroupId }) => ({
						pid,
						parentPid,
						processGroupId
					}))
				}
			};
		};
		classifyIdentitylessLineageRefresh = async (ownership, launcherPid, refreshed, host, examined, initialRelations) => {
			const refreshedLauncher = refreshed.find((process) => process.pid === launcherPid);
			if (refreshedLauncher === undefined) return {
				status: "unavailable",
				reason: "owned launcher exited during lineage validation"
			};
			for await (const { observation } of readProcessRunTokens(host, [refreshedLauncher])) {
				if (observation.state !== "readable") return {
					status: "unavailable",
					reason: `process ownership could not be revalidated for PID ${String(launcherPid)}: ${observation.reason}`
				};
				if (observation.runId !== ownership.runId) return {
					status: "unavailable",
					reason: lineageTokenMismatchReason(launcherPid, observation.runId)
				};
			}
			const identityFailure = launcherIdentityFailure(refreshedLauncher, ownership);
			if (identityFailure !== null) return {
				status: "unavailable",
				reason: identityFailure
			};
			const inTree = new Set(descendantsOf([launcherPid], refreshed).map(({ pid }) => pid));
			const due = refreshed.filter((process) => {
				if (process.pid === launcherPid) return false;
				const previous = examined.get(process.pid);
				return previous === undefined || previous.tokenChecked || previous.parentPid !== process.parentPid || previous.processGroupId !== process.processGroupId || previous.inTree !== inTree.has(process.pid);
			});
			if (due.length > 0) {
				const included = new Map();
				const ownedOutside = [];
				for await (const { process, observation } of readProcessRunTokens(host, due)) {
					if (observation.state !== "readable") return {
						status: "unavailable",
						reason: `process ownership could not be revalidated for PID ${String(process.pid)}: ${observation.reason}`
					};
					if (observation.runId !== ownership.runId) {
						if (inTree.has(process.pid)) return {
							status: "unavailable",
							reason: lineageTokenMismatchReason(process.pid, observation.runId)
						};
						continue;
					}
					if (inTree.has(process.pid)) included.set(process.pid, process);
					else ownedOutside.push(process.pid);
				}
				if (ownedOutside.length > 0) return {
					status: "unavailable",
					reason: `process lineage refresh contained owned PID(s) outside the observed descendants: ${ownedOutside.sort((left, right) => left - right).join(", ")}`
				};
				for (const process of due) examined.set(process.pid, {
					parentPid: process.parentPid,
					processGroupId: process.processGroupId,
					inTree: inTree.has(process.pid),
					tokenChecked: true,
					descendant: included.get(process.pid)
				});
			}
			const livePids = new Set(refreshed.map(({ pid }) => pid));
			for (const pid of examined.keys()) if (!livePids.has(pid)) examined.delete(pid);
			const suppressedPids = [...examined.keys()].filter((pid) => {
				const seed = initialRelations.get(pid);
				const entry = examined.get(pid);
				return seed !== undefined && entry !== undefined && (seed.parentPid !== entry.parentPid || seed.processGroupId !== entry.processGroupId || seed.inTree !== entry.inTree);
			});
			return {
				status: "classified",
				descendants: [...examined.values()].flatMap((entry) => entry.descendant === undefined ? [] : [entry.descendant]),
				suppressedPids
			};
		};
		processWithNativeRelation = (process, identity) => identity.state === "readable" && identity.relation?.state === "observed" ? {
			...process,
			parentPid: identity.relation.parentPid,
			processGroupId: identity.relation.processGroupId
		} : undefined;
		lineageTokenMismatchReason = (pid, observedRunId) => observedRunId === undefined ? `REA_PROCESS_RUN_ID was absent from the readable environment for PID ${String(pid)}; process lineage ownership remains unverified` : "process lineage contains an unowned or PID-reused process";
		unavailableLineage = (ownership, reason) => ({
			status: "unavailable",
			observedAt: new Date().toISOString(),
			runId: ownership.runId,
			launcherPid: ownership.leaderPid,
			processGroupId: ownership.processGroupId,
			reason
		});
		parseProcessEnvironment = (value) => {
			const environment = Object.create(null);
			for (const entry of value.split("\0")) {
				const separator = entry.indexOf("=");
				if (separator > 0) environment[entry.slice(0, separator)] = entry.slice(separator + 1);
			}
			return environment;
		};
		identityFact = (observations, pid, phase, failure) => observations?.get(pid) ?? {
			state: "unavailable",
			reason: failure ?? `process identity was not returned during ${phase} observation`
		};
		readIdentityFacts = async (processes, host, phase, signal, credentialPids) => {
			assertProcessOwnershipInspectionActive(signal);
			if (host.processIdentities === undefined) return new Map(processes.map(({ pid }) => [pid, {
				state: "unavailable",
				reason: "process identity inspection is unsupported"
			}]));
			try {
				const observations = await host.processIdentities(processes, signal, credentialPids);
				assertProcessOwnershipInspectionActive(signal);
				return new Map(processes.map(({ pid }) => [pid, identityFact(observations, pid, phase)]));
			} catch (cause) {
				rethrowInspectionFailure(cause);
				const reason = errorMessage(cause);
				return new Map(processes.map(({ pid }) => [pid, identityFact(undefined, pid, phase, reason)]));
			}
		};
		readNativeProcessIdentityMap = async (processes, host, signal) => readIdentityFacts(processes, host, "before", signal);
		settleExitingProcessIdentities = async (processes, host, initial, signal, budget = { deadline: undefined }, credentialPids) => {
			assertProcessOwnershipInspectionActive(signal);
			let pending = processes.filter(({ pid }) => processIdentityIsExiting(initial.get(pid)));
			if (pending.length === 0) return initial;
			const identities = new Map(initial);
			const deadline = budget.deadline ??= performance.now() + PROCESS_CLEANUP_VERIFICATION_GRACE_MS;
			while (pending.length > 0) {
				const remaining = deadline - performance.now();
				if (remaining <= 0) break;
				await waitForProcessOwnershipInspection(Math.min(25, remaining), signal);
				const refreshed = await readIdentityFacts(pending, host, "before", signal, credentialPids);
				for (const { pid } of pending) identities.set(pid, identityFact(refreshed, pid, "after"));
				pending = pending.filter(({ pid }) => {
					const first = initial.get(pid);
					const current = identities.get(pid);
					return first?.state === "readable" && current?.state === "readable" && processIdentityIsExiting(current) && current.identity === first.identity;
				});
			}
			assertProcessOwnershipInspectionActive(signal);
			return identities;
		};
		settleVanishedTokenFacts = async (facts, host, budget, signal) => {
			if ((host.platform ?? HOST_PLATFORM.platform) !== "linux") return facts;
			let pending = facts.filter(({ token, identityAfter }) => token.state === "unavailable" && (token.code === "ENOENT" || token.code === "ESRCH") && !processIdentityHasExited(identityAfter)).map(({ process }) => process);
			if (pending.length === 0) return facts;
			let current = facts;
			const deadline = budget.deadline ??= performance.now() + PROCESS_CLEANUP_VERIFICATION_GRACE_MS;
			for (let attempt = 0; attempt < 4 && pending.length > 0; attempt += 1) {
				assertProcessOwnershipInspectionActive(signal);
				if (attempt > 0) {
					const remaining = deadline - performance.now();
					if (remaining <= 0) break;
					await waitForProcessOwnershipInspection(Math.min(40, remaining), signal);
				}
				const confirmed = await readNativeProcessIdentityMap(pending, host, signal);
				const pendingPids = new Set(pending.map(({ pid }) => pid));
				const nextPending = new Set();
				current = current.map((fact) => {
					if (!pendingPids.has(fact.process.pid)) return fact;
					const after = confirmed.get(fact.process.pid);
					if (after?.state === "absent") return {
						...fact,
						state: "absent",
						identityAfter: after,
						beforeExitSettlement: fact.beforeExitSettlement ?? fact
					};
					const previous = fact.identityAfter;
					if (previous.state !== "readable" || after?.state !== "readable") return fact;
					if (previous.identity !== after.identity) return {
						...fact,
						state: "unavailable",
						identityAfter: {
							state: "unavailable",
							reason: "process_identity_changed_during_final_token_exit_check"
						}
					};
					if (processIdentityHasExited(after)) return {
						...fact,
						identityAfter: after,
						beforeExitSettlement: fact.beforeExitSettlement ?? fact
					};
					nextPending.add(fact.process.pid);
					return fact;
				});
				pending = pending.filter(({ pid }) => nextPending.has(pid));
			}
			assertProcessOwnershipInspectionActive(signal);
			return current;
		};
		readProcessOwnershipFacts = async (processes, host, signal, options = {}) => {
			assertProcessOwnershipInspectionActive(signal);
			if (processes.length === 0) return [];
			const identityBefore = options.identityBefore === undefined ? await readIdentityFacts(processes, host, "before", signal) : new Map(processes.map(({ pid }) => [pid, identityFact(options.identityBefore, pid, "before")]));
			assertProcessOwnershipInspectionActive(signal);
			const tokens = new Map();
			try {
				for await (const { process, observation } of readProcessRunTokens(host, processes, signal)) {
					assertProcessOwnershipInspectionActive(signal);
					tokens.set(process.pid, observation);
				}
			} catch (cause) {
				rethrowInspectionFailure(cause);
				const reason = errorMessage(cause);
				for (const { pid } of processes) if (!tokens.has(pid)) tokens.set(pid, {
					state: "unavailable",
					reason
				});
			}
			assertProcessOwnershipInspectionActive(signal);
			const credentialPids = new Set(processes.filter(({ pid }) => tokens.get(pid)?.state !== "readable").map(({ pid }) => pid));
			const observedAfter = await readIdentityFacts(processes, host, "after", signal, credentialPids);
			let finalObservedAfter = observedAfter;
			if ((host.platform ?? HOST_PLATFORM.platform) === "linux") {
				const disappearing = processes.filter(({ pid }) => {
					const token = tokens.get(pid);
					return token?.state === "unavailable" && (token.code === "ENOENT" || token.code === "ESRCH") && observedAfter.get(pid)?.state === "readable";
				});
				if (disappearing.length > 0) {
					const refreshed = await readIdentityFacts(disappearing, host, "after", signal, credentialPids);
					const confirmed = new Map(observedAfter);
					for (const { pid } of disappearing) {
						const before = observedAfter.get(pid);
						const after = refreshed.get(pid);
						if (after?.state === "absent") {
							confirmed.set(pid, after);
						} else if (before?.state === "readable" && after?.state === "readable") {
							if (before.identity !== after.identity) confirmed.set(pid, {
								state: "unavailable",
								reason: "process_identity_changed_during_environment_exit_check"
							});
							else if (processIdentityHasExited(after)) confirmed.set(pid, after);
						}
					}
					finalObservedAfter = confirmed;
				}
			}
			const identityAfter = await settleExitingProcessIdentities(processes, host, finalObservedAfter, signal, options.exitSettlement, credentialPids);
			assertProcessOwnershipInspectionActive(signal);
			const deriveFact = (process, observation) => {
				const before = identityBefore.get(process.pid) ?? {
					state: "unavailable",
					reason: "process identity was not returned during before observation"
				};
				const after = observation ?? {
					state: "unavailable",
					reason: "process identity was not returned during after observation"
				};
				const token = tokens.get(process.pid) ?? {
					state: "unavailable",
					reason: "process token was not returned"
				};
				const state = after.state === "absent" ? "absent" : before.state === "readable" && after.state === "readable" ? before.identity === after.identity ? "same-generation" : "replaced" : before.state === "absent" && after.state === "readable" ? "replaced" : "unavailable";
				return {
					process,
					state,
					identityBefore: before,
					token,
					identityAfter: after
				};
			};
			const facts = processes.map((process) => {
				const after = identityAfter.get(process.pid);
				const original = observedAfter.get(process.pid);
				const fact = deriveFact(process, after);
				return after === original ? fact : {
					...fact,
					beforeExitSettlement: deriveFact(process, original)
				};
			});
			assertProcessOwnershipInspectionActive(signal);
			return facts;
		};
		TOKEN_READ_RETRY_ATTEMPTS = 3;
		TOKEN_READ_RETRY_DELAY_MS = 40;
		reobserveUnavailableTokenFacts = async (facts, host, exitSettlement, scope) => {
			const settled = ({ identityAfter }) => processIdentityHasExited(identityAfter) || processIdentityIsExiting(identityAfter);
			const transient = (fact) => fact.token.state === "unavailable" && !settled(fact) && (scope.generation === "current" || fact.state === "same-generation");
			const reread = (fact) => transient(fact) || scope.generation === "first-observed" && fact.state === "same-generation" && !settled(fact) && fact.token.state === "readable" && fact.token.runId === scope.runId;
			const bind = (fact, next) => {
				if (next === undefined || scope.generation === "current") return next ?? fact;
				if (fact.identityAfter.state !== "readable") return fact;
				const first = fact.identityAfter.identity;
				if (next.identityAfter.state === "absent") return next;
				if ([next.identityBefore, next.identityAfter].some((identity) => identity.state === "readable" && identity.identity !== first)) return {
					...fact,
					state: "unavailable",
					identityAfter: {
						state: "unavailable",
						reason: "process_identity_changed_during_token_reread"
					}
				};
				return next.state === "same-generation" || fact.token.state === "readable" ? next : fact;
			};
			let current = facts;
			for (let attempt = 0; attempt < 3; attempt += 1) {
				if (!current.some(transient)) break;
				await setTimeout$1(40);
				const next = new Map((await readProcessOwnershipFacts(current.filter(reread).map(({ process }) => process), host, undefined, { exitSettlement })).map((fact) => [fact.process.pid, fact]));
				current = current.map((fact) => bind(fact, next.get(fact.process.pid)));
			}
			return current;
		};
		createSystemProcessOwnershipHost = (platform, hostEnvironment = process.env, options = {}) => {
			const selectPs = () => resolveSystemPs(platform, options.linuxPsLocations === undefined ? {} : { linuxLocations: options.linuxPsLocations });
			const darwinModuleCachePath = options.darwinModuleCachePath ?? hostEnvironment.REA_DARWIN_MODULE_CACHE_PATH;
			const swiftcPath = hostEnvironment.REA_DARWIN_SWIFTC_PATH;
			const darwinCompiler = options.darwinCompiler ?? (swiftcPath === undefined || swiftcPath === "" ? undefined : {
				kind: "swiftc",
				executable: swiftcPath,
				sdkRoot: hostEnvironment.SDKROOT ?? ""
			});
			const helperCacheDirectory = darwinHelperCacheDirectory({
				home: hostEnvironment.HOME,
				compilerSelected: darwinCompiler !== undefined,
				moduleCachePath: darwinModuleCachePath
			});
			const darwinTokens = platform === "darwin" ? createDarwinProcessRunTokenReader({
				environment: hostEnvironment,
				...darwinCompiler === undefined ? {} : { compiler: darwinCompiler },
				...darwinModuleCachePath === undefined ? {} : { moduleCachePath: darwinModuleCachePath },
				...helperCacheDirectory === undefined ? {} : { helperCacheDirectory },
				...options.compileTimeoutMs === undefined ? {} : { compileTimeoutMs: options.compileTimeoutMs }
			}) : undefined;
			const listProcessesWith = async (ps, signal) => {
				let stdout;
				try {
					({stdout} = await execFileOutput(ps.command, PROCESS_INVENTORY_PS_ARGUMENTS, {
						env: hostEnvironment,
						stopSignal: "SIGTERM",
						...signal === undefined ? {} : { signal }
					}));
				} catch (cause) {
					rethrowInspectionFailure(cause);
					throw cause;
				}
				return stdout.split("\n").map((line) => /\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(.*)/u.exec(line)).filter((match) => match !== null).map((match) => ({
					pid: Number(match[1]),
					parentPid: Number(match[2]),
					processGroupId: Number(match[3]),
					uid: Number(match[4]),
					state: match[5] ?? "",
					command: match[6] ?? ""
				}));
			};
			const processIdentities = async (processes, signal, credentialPids) => {
				if (processes.length === 0) return new Map();
				if (platform === "linux") {
					const callerUserNamespace = credentialPids !== undefined && credentialPids.size > 0 ? readlink("/proc/self/ns/user").catch(() => undefined) : undefined;
					let callerUidMap;
					const readUidMap = async (path) => {
						try {
							return await readProcessInspectionFile(path, signal);
						} catch (cause) {
							rethrowInspectionFailure(cause);
							return undefined;
						}
					};
					const physicalReadFailures = [];
					const results = await Promise.allSettled(processes.map(async ({ pid }, requestIndex) => {
						if (!Number.isSafeInteger(pid) || pid <= 0) return [pid, {
							state: "unavailable",
							reason: "invalid_process_id"
						}];
						try {
							const stat$1 = await readProcessInspectionFile(`/proc/${String(pid)}/stat`, signal);
							const parsed = parseLinuxProcessStat(stat$1);
							if (parsed === undefined || parsed.pid !== pid) return [pid, {
								state: "unavailable",
								reason: "malformed_proc_stat"
							}];
							const readableIdentity = (facts, effectiveUid, environmentRestriction) => ({
								state: "readable",
								identity: `linux-starttime:${facts.startTime}`,
								...facts.name === "" ? {} : { name: facts.name },
								...facts.kernelThread === true ? { kernelThread: true } : {},
								...effectiveUid === undefined ? {} : { effectiveUid },
								...environmentRestriction === undefined ? {} : { environmentRestriction },
								lifecycle: facts.lifecycle === undefined ? {
									state: "unavailable",
									reason: "malformed_proc_flags"
								} : {
									state: "observed",
									lifecycle: facts.lifecycle
								},
								relation: facts.processGroupId < 0 ? {
									state: "unavailable",
									reason: "proc_stat_relation_unavailable"
								} : {
									state: "observed",
									parentPid: facts.parentPid,
									processGroupId: facts.processGroupId
								}
							});
							if (!credentialPids?.has(pid)) return [pid, readableIdentity(parsed)];
							let status;
							try {
								status = await readProcessInspectionFile(`/proc/${String(pid)}/status`, signal);
							} catch (cause) {
								rethrowInspectionFailure(cause);
								return [pid, readableIdentity(parsed)];
							}
							assertProcessOwnershipInspectionActive(signal);
							const uids = parseLinuxProcessIds(status, "Uid");
							if (uids === undefined) return [pid, readableIdentity(parsed)];
							let procfsOwnerUid;
							try {
								procfsOwnerUid = (await stat(`/proc/${String(pid)}/environ`)).uid;
							} catch (cause) {
								rethrowInspectionFailure(cause);
								void cause;
							}
							assertProcessOwnershipInspectionActive(signal);
							const restrictionFacts = {
								uids,
								gids: parseLinuxProcessIds(status, "Gid"),
								procfsOwnerUid,
								callerUid: process.geteuid?.(),
								callerGid: process.getegid?.()
							};
							let environmentRestriction = linuxEnvironmentRestriction(restrictionFacts);
							if (environmentRestriction === undefined) {
								let userNamespaceDiffers;
								try {
									const targetUserNamespace = await readlink(`/proc/${String(pid)}/ns/user`);
									const callerNamespace = await callerUserNamespace;
									if (callerNamespace !== undefined) userNamespaceDiffers = callerNamespace !== targetUserNamespace;
								} catch (cause) {
									rethrowInspectionFailure(cause);
									void cause;
								}
								assertProcessOwnershipInspectionActive(signal);
								if (userNamespaceDiffers === undefined) {
									const targetUidMap = await readUidMap(`/proc/${String(pid)}/uid_map`);
									if (targetUidMap !== undefined) {
										callerUidMap ??= readUidMap("/proc/self/uid_map");
										userNamespaceDiffers = linuxUidMapsDiffer(targetUidMap, await callerUidMap);
									}
								}
								environmentRestriction = linuxEnvironmentRestriction({
									...restrictionFacts,
									userNamespaceDiffers
								});
							}
							assertProcessOwnershipInspectionActive(signal);
							let afterStatus;
							try {
								afterStatus = await readProcessInspectionFile(`/proc/${String(pid)}/stat`, signal);
							} catch (cause) {
								rethrowInspectionFailure(cause);
								return [pid, readableIdentity(parsed)];
							}
							assertProcessOwnershipInspectionActive(signal);
							const verified = parseLinuxProcessStat(afterStatus);
							if (verified !== undefined && verified.pid === pid && verified.startTime !== parsed.startTime) return [pid, {
								state: "unavailable",
								reason: "process_identity_changed_during_uid_observation"
							}];
							if (verified === undefined || verified.pid !== pid) return [pid, readableIdentity(parsed)];
							return [pid, readableIdentity(verified, uids[1], environmentRestriction)];
						} catch (cause) {
							rethrowInspectionFailure(cause);
							if (cause instanceof Error && "code" in cause && (cause.code === "ENOENT" || cause.code === "ESRCH")) {
								assertProcessOwnershipInspectionActive(signal);
								let presenceProbeFailure;
								let presenceProbeSucceeded = false;
								try {
									presenceProbeSucceeded = process.kill(pid, 0);
								} catch (probeCause) {
									presenceProbeFailure = probeCause;
								}
								assertProcessOwnershipInspectionActive(signal);
								if (presenceProbeFailure instanceof Error && "code" in presenceProbeFailure && presenceProbeFailure.code === "ESRCH") return [pid, {
									state: "absent",
									reason: "not-found-in-caller-pid-namespace"
								}];
								physicalReadFailures.push({
									pid,
									requestIndex,
									cause
								});
								return [pid, {
									state: "unavailable",
									reason: presenceProbeFailure === undefined && presenceProbeSucceeded ? "proc_stat_missing_but_process_signal_probe_succeeded" : presenceProbeFailure === undefined ? "proc_stat_missing_and_process_signal_probe_returned_false" : `proc_stat_missing_and_process_signal_probe_failed: ${errorMessage(presenceProbeFailure)}`
								}];
							}
							physicalReadFailures.push({
								pid,
								requestIndex,
								cause
							});
							return [pid, {
								state: "unavailable",
								reason: errorMessage(cause)
							}];
						}
					}));
					const observations = new Map();
					const failures = [];
					results.forEach((result, requestIndex) => {
						if (result.status === "fulfilled") observations.set(result.value[0], result.value[1]);
						else failures.push({
							pid: processes[requestIndex].pid,
							requestIndex,
							cause: result.reason
						});
					});
					if (failures.length > 0) throw new ProcessOwnershipIdentityBatchFailure(failures, observations, physicalReadFailures);
					return observations;
				}
				if (darwinTokens === undefined) return new Map();
				try {
					return await darwinTokens.identities(processes, signal);
				} catch (cause) {
					rethrowInspectionFailure(cause);
					const reason = errorMessage(cause);
					return new Map(processes.map(({ pid }) => [pid, {
						state: "unavailable",
						reason
					}]));
				}
			};
			/**
			* Execution failures keep their identity; the message names the `ps` that
			* ran (`spawn /usr/bin/ps ENOENT`, or bare `ps` for the PATH fallback).
			*/
			const listProcesses = async (signal) => platform === "win32" ? [] : await listProcessesWith(await selectPs(), signal);
			const safeListProcesses = async (signal) => {
				const ps = await selectPs();
				try {
					return await listProcessesWith(ps, signal);
				} catch (cause) {
					rethrowInspectionFailure(cause);
					const failure = execFileOutputFailure(cause);
					if (spawnCapacityExhausted(failure) || typeof cause === "object" && cause !== null && launchExhaustedResource(Reflect.get(cause, "code")) !== undefined) throw cause;
					const rawCode = failure?.code ?? (typeof cause === "object" && cause !== null ? Reflect.get(cause, "code") : undefined);
					const systemCode = typeof rawCode === "string" ? rawCode : undefined;
					if (platform === "linux") throw new LinuxOwnedProcessPrerequisiteError(cause, {
						missing: systemCode === "ENOENT",
						systemCode,
						ps
					});
					throw new ProcessAdmissionError("baseline_unavailable", {
						...systemCode === undefined ? {} : { system_code: systemCode },
						ps_command: ps.command,
						ps_source: ps.source
					}, { cause });
				}
			};
			const captureBaseline = async (signal) => {
				if (platform !== "linux" && darwinTokens === undefined) return [];
				const processes = liveProcesses(await safeListProcesses(signal));
				let identities = await processIdentities(processes, signal);
				const unreadable = processes.filter(({ pid }) => identities.get(pid)?.state !== "readable");
				if (unreadable.length > 0) {
					const stillLive = liveProcesses(await safeListProcesses(signal)).filter(({ pid }) => unreadable.some((entry) => entry.pid === pid));
					const retried = await processIdentities(stillLive, signal);
					identities = new Map([...identities, ...retried]);
					const unresolved = stillLive.filter(({ pid }) => identities.get(pid)?.state !== "readable");
					const liveAfterRetry = liveProcesses(await safeListProcesses(signal));
					const stillUnresolved = unresolved.filter(({ pid }) => liveAfterRetry.some((entry) => entry.pid === pid));
					if (stillUnresolved.length > 0) throw new ProcessAdmissionError("identity_snapshot_unavailable", { live_processes: stillUnresolved.length });
				}
				return processes.map(({ pid }) => {
					const observation = identities.get(pid);
					return {
						pid,
						identity: observation?.state === "readable" ? observation.identity : null
					};
				});
			};
			return {
				platform,
				prepare: async (signal) => {
					await darwinTokens?.prepare(signal);
					if (platform === "linux") {
						const processes = await safeListProcesses(signal);
						if (!processes.some(({ pid }) => pid === process.pid)) throw new LinuxOwnedProcessPrerequisiteError(new ProcessAdmissionError("current_process_unreported"));
					}
				},
				listProcesses,
				async environment(pid, signal) {
					assertProcessOwnershipInspectionActive(signal);
					if (platform === "linux") return parseProcessEnvironment(await readProcessInspectionFile(`/proc/${pid}/environ`, signal));
					if (platform === "darwin") {
						const process = (await listProcesses(signal)).find((entry) => entry.pid === pid);
						if (process === undefined) throw new ProcessRunTokenReadError(pid, "absent", "process_not_in_snapshot");
						const observation = (await darwinTokens?.read([process], signal))?.get(pid);
						if (observation === undefined || observation.state === "unavailable") throw new ProcessRunTokenReadError(pid, observation?.reason === "process_not_in_snapshot" ? "absent" : "unavailable", observation?.reason ?? "process run token could not be read");
						const environment = Object.create(null);
						if (observation.runId !== undefined) environment.REA_PROCESS_RUN_ID = observation.runId;
						return environment;
					}
					const { stdout } = await execFileOutput((await selectPs()).command, [
						"eww",
						"-p",
						String(pid)
					], {
						env: hostEnvironment,
						stopSignal: "SIGTERM",
						...signal === undefined ? {} : { signal }
					});
					const observedEnvironment = Object.create(null);
					for (const match of stdout.matchAll(/(?:^|\s)([A-Za-z_][A-Za-z0-9_]*)=([^\s]*)/gu)) {
						const name = match[1];
						if (name !== undefined) observedEnvironment[name] = match[2] ?? "";
					}
					return observedEnvironment;
				},
				async runTokens(processes, signal) {
					assertProcessOwnershipInspectionActive(signal);
					if (platform !== "darwin" || processes.length === 0) return new Map();
					try {
						return await darwinTokens?.read(processes, signal) ?? new Map();
					} catch (cause) {
						rethrowInspectionFailure(cause);
						void cause;
						return new Map(processes.map(({ pid }) => [pid, {
							state: "unavailable",
							reason: "reader_failure"
						}]));
					}
				},
				...platform !== "linux" && darwinTokens === undefined ? {} : {
					processIdentities,
					captureBaseline,
					...darwinTokens === undefined ? {} : { close: darwinTokens.close }
				},
				signalGroup(processGroupId, signal) {
					process.kill(-processGroupId, signal);
				}
			};
		};
		systemProcessOwnershipHost = createSystemProcessOwnershipHost(HOST_PLATFORM.platform);
		observeProcessStartIdentity = async (pid, host = systemProcessOwnershipHost, expectedRunId) => {
			if (host.processIdentities === undefined) return {
				state: "unavailable",
				reason: "process identity is unsupported"
			};
			const identity = liveProcessIdentity((await host.processIdentities([{ pid }])).get(pid) ?? {
				state: "unavailable",
				reason: "process identity was not returned"
			});
			if (identity === undefined) return undefined;
			if (expectedRunId === undefined || identity.state !== "readable") return identity;
			const process = (await host.listProcesses()).find((entry) => entry.pid === pid);
			let token;
			if (process === undefined && host.runTokens !== undefined) token = (await host.runTokens([{ pid }])).get(pid);
			if (token === undefined) {
				if (process === undefined) token = await readProcessRunToken(host, pid);
				else for await (const { observation } of readProcessRunTokens(host, [process])) token = observation;
			}
			if (token === undefined || token.state === "unavailable") return {
				state: "unavailable",
				reason: `process ownership token could not be read for PID ${String(pid)}: ${token?.reason ?? "token was not returned"}`
			};
			if (token.runId !== expectedRunId) return {
				state: "unavailable",
				reason: `process ownership token did not match the captured run for PID ${String(pid)}`
			};
			const confirmed = await observeProcessStartIdentity(pid, host);
			if (confirmed === undefined || confirmed.state !== "readable") return confirmed;
			return confirmed.identity === identity.identity ? identity : {
				state: "unavailable",
				reason: `process identity changed while validating the captured run token for PID ${String(pid)}`
			};
		};
		liveProcessIdentity = (identity) => identity.state === "absent" || processIdentityHasExited(identity) ? undefined : identity;
		observeProcessStartIdentityExit = async (pid, expectedIdentity, host = systemProcessOwnershipHost) => {
			try {
				let observed = await observeProcessStartIdentity(pid, host);
				if (observed?.state === "readable" && observed.identity === expectedIdentity) {
					const settled = (await settleExitingProcessIdentities([{ pid }], host, new Map([[pid, observed]]))).get(pid);
					observed = settled === undefined ? observed : liveProcessIdentity(settled);
				}
				if (observed === undefined) return "exited";
				if (observed.state !== "readable") return "unverified";
				if (observed.identity !== expectedIdentity) return "exited";
				return processIdentityIsExiting(observed) ? "exiting" : "present";
			} catch (cause) {
				rethrowInspectionFailure(cause);
				return "unverified";
			}
		};
		signalProcessWithStartIdentity = async (pid, expectedIdentity, signal, options = {}) => {
			const host = options.host ?? systemProcessOwnershipHost;
			try {
				const observed = await observeProcessStartIdentity(pid, host);
				if (observed === undefined) return "gone";
				if (observed.state !== "readable") return "unverified";
				if (observed.identity !== expectedIdentity) return "identity-changed";
				(options.sendSignal ?? process.kill)(pid, signal);
				return "signaled";
			} catch (cause) {
				rethrowInspectionFailure(cause);
				return "unverified";
			}
		};
		LINUX_PROCESS_OWNERSHIP_REMEDIATION = `Install your distribution's procps or procps-ng package so a procps-compatible ps exists at ${LINUX_SYSTEM_PS_LOCATIONS.join(", ")}; REA uses its own PATH only when none of those exists. Then retry.`;
		LinuxOwnedProcessPrerequisiteError = class extends AnalysisCapabilityUnavailableError {
			systemCode;
			admissionCode;
			constructor(cause, optionsOrSystemCode = {}) {
				const options = typeof optionsOrSystemCode === "string" ? {
					missing: optionsOrSystemCode === "ENOENT",
					systemCode: optionsOrSystemCode
				} : optionsOrSystemCode;
				const admissionCode = cause instanceof ProcessAdmissionError ? cause.code : undefined;
				const rawCode = options.systemCode ?? execFileOutputFailure(cause)?.code ?? (typeof cause === "object" && cause !== null ? Reflect.get(cause, "code") : undefined);
				const resolvedCode = admissionCode === undefined && typeof rawCode === "string" ? rawCode : undefined;
				const isMissing = admissionCode === undefined && (options.missing ?? (resolvedCode === "ENOENT" || resolvedCode === undefined));
				const ran = options.ps === undefined ? "" : ` (ran ${describeSystemPs(options.ps)})`;
				const reason = admissionCode !== undefined || isMissing ? `Linux process ownership inspection requires a procps-compatible ps before launching a child: ${errorMessage(cause)}${ran}` : resolvedCode !== undefined ? `Linux process ownership inspection failed to execute ps (${resolvedCode}): ${errorMessage(cause)}${ran}` : `Linux process ownership inspection could not obtain the process table using ps: ${errorMessage(cause)}${ran}`;
				const remediation = admissionCode !== undefined ? processOwnershipAdmissionRecovery(admissionCode, "linux") : isMissing ? LINUX_PROCESS_OWNERSHIP_REMEDIATION : processOwnershipAdmissionRecovery("baseline_unavailable", "linux", resolvedCode);
				super("process-ownership", "prepare_owned_process", reason, {
					cause,
					userMessage: reason,
					remediationAction: remediation,
					diagnostics: {
						boundary: "process-ownership",
						...admissionCode === undefined ? {} : { admission_code: admissionCode },
						...resolvedCode === undefined ? {} : { system_code: resolvedCode },
						...options.ps === undefined ? {} : {
							ps_command: options.ps.command,
							ps_source: options.ps.source
						}
					}
				});
				this.systemCode = resolvedCode;
				this.admissionCode = admissionCode;
			}
		};
		DARWIN_PROCESS_OWNERSHIP_REMEDIATION = "Check the selected Xcode or Command Line Tools and Swift compiler configuration, then restart REA and retry.";
		processOwnershipAdmissionRecovery = (code, platform = systemProcessOwnershipHost.platform ?? HOST_PLATFORM.platform, systemCode) => {
			if (code === "identity_snapshot_unavailable") return platform === "darwin" ? "Check host process churn and ensure REA has permission to inspect process identities, then retry once process state settles." : "Check host process churn and ensure REA has permission to inspect /proc entries for running processes, then retry once process state settles.";
			if (code === "current_process_unreported") return platform === "darwin" ? "Ensure the host process table reports the running REA process under ps, then retry." : "Ensure the host process table reports the running REA process under /proc or ps, then retry.";
			if (code === "baseline_unavailable") {
				if (systemCode === "ENOENT") return platform === "darwin" ? "Ensure /bin/ps runs and process ownership inspection is supported on macOS before launching captured children." : LINUX_PROCESS_OWNERSHIP_REMEDIATION;
				if (systemCode !== undefined) return `Verify host process table inspection can execute ps (${systemCode}) before launching captured children, then retry.`;
				return platform === "darwin" ? "Ensure /bin/ps runs and process ownership inspection is supported on macOS before launching captured children." : "Ensure process ownership inspection is supported on the host platform before launching captured children.";
			}
			return "Verify host process ownership inspection prerequisites before retrying.";
		};
		prepareProcessOwnershipInspection = async (signal) => {
			assertProcessOwnershipInspectionActive(signal);
			await systemProcessOwnershipHost.prepare?.(signal);
			assertProcessOwnershipInspectionActive(signal);
		};
		processIsGone = async (host, pid, signal) => {
			try {
				const processes = signal === undefined ? await host.listProcesses() : await host.listProcesses(signal);
				return !liveProcesses(processes).some((process) => process.pid === pid);
			} catch (cause) {
				rethrowInspectionFailure(cause);
				void cause;
				return false;
			}
		};
	})))();
}

//#endregion
//#region dist/process/ProcessOutputTokenScanner.js
var PROCESS_OUTPUT_TOKEN_CONTEXT_BYTES, NEWLINE, isWordByte, ProcessOutputTokenScanner;
function init_ProcessOutputTokenScanner() {
	return (init_ProcessOutputTokenScanner = __esmMin((() => {
		PROCESS_OUTPUT_TOKEN_CONTEXT_BYTES = 1024;
		NEWLINE = 10;
		isWordByte = (byte) => byte >= 48 && byte <= 57 || byte >= 65 && byte <= 90 || byte >= 97 && byte <= 122 || byte === 95;
		ProcessOutputTokenScanner = class {
			#marker;
			#lineTail = Buffer.alloc(0);
			#lineTailCut = false;
			#latest;
			#pending;
			constructor(marker) {
				if (marker.length === 0 || marker.includes("\n")) throw new RangeError("Output token must be non-empty single-line text");
				this.#marker = Buffer.from(marker, "utf8");
				if (!isWordByte(this.#marker[this.#marker.length - 1])) throw new RangeError("Output token must end in an ASCII word byte");
			}
			scan(chunk, start) {
				if (chunk.length === 0) return;
				if (this.#pending !== undefined) {
					if (!isWordByte(chunk[0])) this.#latest = this.#pending;
					this.#pending = undefined;
				}
				this.#extendOpenLine(chunk);
				const carried = this.#lineTail.byteLength;
				const searched = carried === 0 ? chunk : Buffer.concat([this.#lineTail, chunk]);
				let index = searched.lastIndexOf(this.#marker);
				while (index >= 0 && index + this.#marker.byteLength > carried) {
					const end = index + this.#marker.byteLength;
					if (end === searched.length) this.#pending = this.#record(searched, index, start - carried);
					else if (!isWordByte(searched[end])) {
						this.#latest = this.#record(searched, index, start - carried);
						break;
					}
					index = index === 0 ? -1 : searched.lastIndexOf(this.#marker, index - 1);
				}
				this.#retainLineTail(searched);
			}
			/** Only a true stream end proves the boundary of a trailing bare token. */
			finish() {
				if (this.#pending !== undefined) this.#latest = this.#pending;
				this.#pending = undefined;
				if (this.#latest !== undefined) this.#latest.open = false;
			}
			latestWithin(start, end) {
				const latest = this.#latest;
				if (latest === undefined || latest.offset < start || latest.offset >= end) return undefined;
				const prefixInRange = latest.offset - latest.prefix.length >= start;
				const bytes = Buffer.concat([...prefixInRange ? [latest.prefix] : [], latest.suffix]);
				return {
					offset: latest.offset,
					line: bytes.toString("utf8"),
					...!isUtf8(bytes) ? { invalidUtf8: true } : {},
					truncated: latest.prefixCut || latest.suffixCut || !prefixInRange,
					...latest.suffixCut || latest.open ? { trailingContextIncomplete: true } : {}
				};
			}
			#record(searched, index, searchedStart) {
				const lineStart = index === 0 ? 0 : searched.lastIndexOf(NEWLINE, index - 1) + 1;
				const prefixFits = index - lineStart <= PROCESS_OUTPUT_TOKEN_CONTEXT_BYTES && (lineStart > 0 || !this.#lineTailCut);
				const lineEnd = searched.indexOf(NEWLINE, index);
				const available = lineEnd < 0 ? searched.byteLength : lineEnd;
				const suffixEnd = Math.min(available, index + this.#marker.byteLength + PROCESS_OUTPUT_TOKEN_CONTEXT_BYTES);
				return {
					offset: searchedStart + index,
					prefix: prefixFits ? Buffer.from(searched.subarray(lineStart, index)) : Buffer.alloc(0),
					prefixCut: !prefixFits,
					suffix: Buffer.from(searched.subarray(index, suffixEnd)),
					open: lineEnd < 0 && suffixEnd === available,
					suffixCut: suffixEnd < available
				};
			}
			#extendOpenLine(chunk) {
				const latest = this.#latest;
				if (latest?.open !== true) return;
				const lineEnd = chunk.indexOf(NEWLINE);
				const available = lineEnd < 0 ? chunk.byteLength : lineEnd;
				const room = this.#marker.byteLength + PROCESS_OUTPUT_TOKEN_CONTEXT_BYTES - latest.suffix.byteLength;
				const taken = Math.min(available, Math.max(0, room));
				if (taken > 0) latest.suffix = Buffer.concat([latest.suffix, chunk.subarray(0, taken)]);
				latest.suffixCut = taken < available;
				latest.open = lineEnd < 0 && taken === available;
			}
			#retainLineTail(searched) {
				const lineStart = searched.lastIndexOf(NEWLINE) + 1;
				const limit = PROCESS_OUTPUT_TOKEN_CONTEXT_BYTES + this.#marker.byteLength - 1;
				this.#lineTailCut = searched.byteLength - lineStart > limit || lineStart === 0 && this.#lineTailCut;
				this.#lineTail = Buffer.from(searched.subarray(Math.max(lineStart, searched.byteLength - limit)));
			}
		};
	})))();
}

//#endregion
//#region dist/process/ProcessOwnershipEvidence.js
var ProcessOwnershipEvidenceOwner;
function init_ProcessOwnershipEvidence() {
	return (init_ProcessOwnershipEvidence = __esmMin((() => {
		init_ProcessLifecycle();
		ProcessOwnershipEvidenceOwner = class {
			#candidates = new Map();
			#snapshotCount = 0;
			#coverage = {
				snapshotCount: 0,
				listedRows: 0,
				examinedPids: 0,
				retainedOnlyPids: 0,
				retainedOwned: 0,
				retainedUnresolved: 0,
				uncertainPids: [],
				processTableCoverage: "unreported-by-host"
			};
			get candidates() {
				return [...this.#candidates.values()];
			}
			get coverage() {
				return this.#coverage;
			}
			/**
			* Reconcile facts from one explicit snapshot. Unrelated transient rows are
			* never retained; unknown related candidates remain evidence, not authority.
			*/
			reconcile(facts, options) {
				this.#snapshotCount += 1;
				const factsByPid = new Map(facts.map((fact) => [fact.process.pid, fact]));
				const sameGeneration = new Map();
				const sameGenerationBefore = new Map();
				const tokenMatchedPids = new Set();
				const uncertainPids = new Set();
				const retiredPids = new Set();
				for (const fact of facts) {
					if (fact.state !== "same-generation") continue;
					if (fact.identityAfter.state !== "readable") continue;
					sameGeneration.set(fact.process.pid, fact.identityAfter);
					if (fact.identityBefore.state === "readable" && fact.identityBefore.identity === fact.identityAfter.identity) sameGenerationBefore.set(fact.process.pid, fact.identityBefore);
					if (fact.token.state === "readable" && fact.token.runId === options.runId) tokenMatchedPids.add(fact.process.pid);
				}
				const findScopeEvidence = (pid, generations, tokenOwners) => {
					let unverifiedRelation = false;
					const relationFor = (candidatePid) => {
						const identity = generations.get(candidatePid);
						if (identity?.relation?.state === "observed") return identity.relation;
						const fallback = options.unverifiedLineageRelations?.get(candidatePid);
						if (fallback === undefined) return undefined;
						const current = sameGeneration.get(candidatePid);
						if (current?.relation?.state === "observed") {
							if (identity === undefined) unverifiedRelation = true;
							return current.relation;
						}
						unverifiedRelation = true;
						return fallback;
					};
					const scoped = (evidence) => unverifiedRelation ? "unverified-table-relation" : evidence;
					const relation = relationFor(pid);
					if (relation === undefined) return undefined;
					if (options.allowCapturedScope !== false && options.processGroupIds.has(relation.processGroupId)) return scoped("captured-process-group-id");
					const visited = new Set([pid]);
					let parentPid = relation.parentPid;
					while (!visited.has(parentPid)) {
						const parent = generations.get(parentPid);
						const previousParent = this.#candidates.get(parentPid);
						if (parent !== undefined && (tokenOwners.has(parentPid) || previousParent?.applicability === "token-verified" && parent.identity === previousParent.identity)) return scoped("current-token-owned-parent");
						if (options.allowCapturedScope !== false && parentPid === options.leaderPid) return scoped("capture-leader-pid");
						visited.add(parentPid);
						const parentRelation = relationFor(parentPid);
						if (parentRelation === undefined) return undefined;
						parentPid = parentRelation.parentPid;
					}
					return undefined;
				};
				const scopeGenerations = new Map();
				const scopeBeforeGenerations = new Map();
				const scopeOwnedPids = new Set();
				for (const observed of options.scopeFacts ?? facts) {
					const fact = observed.beforeExitSettlement ?? observed;
					if (fact.state !== "same-generation" || fact.identityAfter.state !== "readable") continue;
					scopeGenerations.set(fact.process.pid, fact.identityAfter);
					if (fact.identityBefore.state === "readable" && fact.identityAfter.identity === fact.identityBefore.identity) scopeBeforeGenerations.set(fact.process.pid, fact.identityBefore);
					const previous = this.#candidates.get(fact.process.pid);
					if (fact.token.state === "readable" && fact.token.runId === options.runId || previous?.applicability === "token-verified" && previous.identity === fact.identityAfter.identity) scopeOwnedPids.add(fact.process.pid);
				}
				const related = (pid) => {
					const current = findScopeEvidence(pid, sameGeneration, tokenMatchedPids) ?? findScopeEvidence(pid, sameGenerationBefore, tokenMatchedPids);
					if (current !== undefined) return current;
					const original = scopeGenerations.get(pid);
					if (original === undefined || sameGeneration.get(pid)?.identity !== original.identity) return undefined;
					const initial = findScopeEvidence(pid, scopeGenerations, scopeOwnedPids) ?? findScopeEvidence(pid, scopeBeforeGenerations, scopeOwnedPids);
					return initial === undefined ? undefined : "previously-related-generation";
				};
				for (const [pid, previous] of this.#candidates) {
					if (options.nativeExitedPids?.has(pid)) {
						this.#candidates.delete(pid);
						retiredPids.add(pid);
						continue;
					}
					const fact = factsByPid.get(pid);
					if (fact === undefined) continue;
					if (fact.state === "absent" || fact.state === "replaced" || previous.identity !== undefined && fact.identityAfter.state === "readable" && fact.identityAfter.identity !== previous.identity || processIdentityHasExited(fact.identityAfter)) {
						this.#candidates.delete(pid);
						retiredPids.add(pid);
						continue;
					}
					if (fact.state !== "same-generation") {
						uncertainPids.add(pid);
						continue;
					}
					const identity = fact.identityAfter;
					if (identity.state !== "readable") {
						uncertainPids.add(pid);
						continue;
					}
					const matched = fact.token.state === "readable" && fact.token.runId === options.runId;
					if (previous.identity === undefined && !matched) {
						uncertainPids.add(pid);
						this.#candidates.set(pid, {
							...previous,
							process: fact.process,
							token: fact.token,
							...fact.token.state === "unavailable" ? { diagnostic: fact.token.reason } : {}
						});
						continue;
					}
					const relation = identity.relation?.state === "observed" ? {
						state: "observed",
						parentPid: identity.relation.parentPid,
						processGroupId: identity.relation.processGroupId
					} : undefined;
					this.#candidates.set(pid, {
						pid,
						identity: identity.identity,
						process: fact.process,
						applicability: matched || previous.applicability === "token-verified" ? "token-verified" : "related-ownership-unresolved",
						scopeEvidence: matched || previous.applicability === "token-verified" ? "run-token" : related(pid) ?? "previously-related-generation",
						token: fact.token,
						relation,
						...fact.token.state === "unavailable" ? { diagnostic: fact.token.reason } : {}
					});
				}
				for (const fact of facts) {
					const pid = fact.process.pid;
					const matched = fact.token.state === "readable" && fact.token.runId === options.runId;
					const unresolvedReplacement = fact.state === "replaced" && matched;
					if (this.#candidates.has(pid) || retiredPids.has(pid) && fact.state !== "same-generation" && !unresolvedReplacement || fact.state === "absent" || fact.state === "replaced" && !matched || processIdentityHasExited(fact.identityAfter)) continue;
					const identity = fact.identityAfter;
					if (fact.state !== "same-generation" || identity.state !== "readable") {
						if (options.allowCapturedScope === false && !matched && related(pid) === undefined) continue;
						this.#candidates.set(pid, {
							pid,
							identity: undefined,
							process: fact.process,
							applicability: "identity-unresolved",
							scopeEvidence: "native-identity-unresolved",
							token: fact.token,
							relation: undefined,
							...fact.token.state === "unavailable" ? { diagnostic: fact.token.reason } : {}
						});
						uncertainPids.add(pid);
						continue;
					}
					const unresolvedScope = matched ? undefined : related(pid);
					if (!matched && unresolvedScope === undefined) continue;
					const relation = identity.relation?.state === "observed" ? {
						state: "observed",
						parentPid: identity.relation.parentPid,
						processGroupId: identity.relation.processGroupId
					} : undefined;
					this.#candidates.set(pid, {
						pid,
						identity: identity.identity,
						process: fact.process,
						applicability: matched ? "token-verified" : "related-ownership-unresolved",
						scopeEvidence: matched ? "run-token" : unresolvedScope ?? "previously-related-generation",
						token: fact.token,
						relation,
						...fact.token.state === "unavailable" ? { diagnostic: fact.token.reason } : {}
					});
				}
				const retainedOnlyPids = [...this.#candidates.keys()].filter((pid) => !options.listedPids.has(pid));
				this.#coverage = {
					snapshotCount: this.#snapshotCount,
					listedRows: options.listedRows,
					examinedPids: facts.length,
					retainedOnlyPids: retainedOnlyPids.length,
					retainedOwned: [...this.#candidates.values()].filter(({ applicability }) => applicability === "token-verified").length,
					retainedUnresolved: [...this.#candidates.values()].filter(({ applicability }) => applicability !== "token-verified").length,
					uncertainPids: [...uncertainPids].sort((left, right) => left - right),
					processTableCoverage: "unreported-by-host"
				};
				return this.candidates;
			}
			/** Merge current discovery rows with retained candidates without PID-only proof. */
			rowsForObservation(processes) {
				const byPid = new Map(processes.map((process) => [process.pid, process]));
				for (const candidate of this.#candidates.values()) if (!byPid.has(candidate.pid)) byPid.set(candidate.pid, candidate.process);
				return [...byPid.values()];
			}
		};
	})))();
}

//#endregion
//#region dist/process/RuntimeExhaustion.js
var RUNTIME_EXHAUSTION_TOKENS, RUNTIME_EXHAUSTION_AREAS, JVM_EXHAUSTION_DETAILS, capitalized, lowered, externalJvmExhaustionRecovery, jvmExhaustionArea, runtimeExhaustion, runtimeExhaustionReport;
function init_RuntimeExhaustion() {
	return (init_RuntimeExhaustion = __esmMin((() => {
		RUNTIME_EXHAUSTION_TOKENS = {
			jvm: "java.lang.OutOfMemoryError",
			v8: "JavaScript heap out of memory"
		};
		RUNTIME_EXHAUSTION_AREAS = [
			"heap",
			"gc-overhead",
			"metaspace",
			"array-size",
			"native-thread"
		];
		JVM_EXHAUSTION_DETAILS = [
			["Java heap space", "heap"],
			["GC overhead limit exceeded", "gc-overhead"],
			["Metaspace", "metaspace"],
			["Requested array size exceeds VM limit", "array-size"],
			["unable to create native thread", "native-thread"]
		];
		capitalized = (text) => text.charAt(0).toUpperCase() + text.slice(1);
		lowered = (text) => text.charAt(0).toLowerCase() + text.slice(1);
		externalJvmExhaustionRecovery = (area, jvm) => {
			const heap = jvm.raise("maximum heap (-Xmx)");
			switch (area) {
				case "heap": return `REA does not set ${jvm.program} Java heap. ${heap}, or ${jvm.smaller}.`;
				case "gc-overhead": return `REA does not set ${jvm.program} Java heap. The ${jvm.role} JVM spent nearly all its time collecting garbage; ${lowered(heap)}, or ${jvm.smaller}.`;
				case "metaspace": return `REA does not set ${jvm.program} class metadata limit. ${jvm.raise("-XX:MaxMetaspaceSize")}; a larger heap (-Xmx) does not raise it.`;
				case "array-size": return `The ${jvm.role} requested an array larger than the JVM allows; a larger heap (-Xmx) does not lift this limit. ${capitalized(jvm.smaller)}.`;
				case "native-thread": return `The ${jvm.role} JVM could not create a native thread. ${jvm.threads}; a larger heap (-Xmx) does not help.`;
				case undefined: return `REA does not set the memory limits of ${jvm.program} JVM. Review the reported out-of-memory line and ${jvm.settings}, or ${jvm.smaller}.`;
			}
		};
		jvmExhaustionArea = (line) => JVM_EXHAUSTION_DETAILS.find(([detail]) => line.includes(detail))?.[1];
		runtimeExhaustion = (runtime, stream, token) => ({
			runtime,
			area: runtime === "jvm" ? jvmExhaustionArea(token.line) : "heap",
			stream,
			line: token.line,
			lineComplete: token.trailingContextIncomplete !== true,
			truncated: token.truncated,
			invalidUtf8: token.invalidUtf8 === true
		});
		runtimeExhaustionReport = ({ runtime, area, stream, line, lineComplete, truncated, invalidUtf8 }) => ({
			runtime,
			area: area ?? null,
			stream,
			line,
			line_complete: lineComplete,
			...truncated ? { truncated: true } : {},
			...invalidUtf8 ? { invalid_utf8: true } : {}
		});
	})))();
}

//#endregion
//#region dist/process/ProviderProcess.js
var DEFAULT_TERMINATION_GRACE_MS, DEFAULT_KILL_GRACE_MS, OUTPUT_CLOSE_GRACE_MS, MAX_LATE_OUTPUT_BYTES, outputCheckpoints, incompleteCleanup, spawnOwnedProviderProcess, signalUnreapedGroup, ProviderProcessSupervisor, ProcessOutputCapture, deferred, waitForSpawn, waitForProcessEvent;
function init_ProviderProcess() {
	return (init_ProviderProcess = __esmMin((() => {
		init_result();
		init_analysisCleanupRelease();
		init_HostPlatform();
		init_DarwinProcessRunTokenReader();
		init_ProcessInspectionCleanup();
		init_ProcessInspectionCancellation();
		init_ProcessAdmissionError();
		init_launchFailure();
		init_WindowsOwnedProcess();
		init_ProcessOutputTokenScanner();
		init_ProcessOwnershipObservation();
		init_ProcessOwnershipEvidence();
		init_snapshotEnvironment();
		init_RuntimeExhaustion();
		init_strictUtf8();
		init_errorMessage();
		DEFAULT_TERMINATION_GRACE_MS = 250;
		DEFAULT_KILL_GRACE_MS = 1e3;
		OUTPUT_CLOSE_GRACE_MS = 1e3;
		MAX_LATE_OUTPUT_BYTES = 64 * 1024;
		outputCheckpoints = new WeakMap();
		incompleteCleanup = (failure) => ({
			status: "incomplete",
			reason: failure.reason,
			cleanupResult: failure
		});
		spawnOwnedProviderProcess = async (options) => {
			assertProcessOwnershipInspectionActive(options.signal);
			await prepareProcessOwnershipInspection(options.signal);
			assertProcessOwnershipInspectionActive(options.signal);
			const platform = options.platform ?? HOST_PLATFORM.platform;
			const sweepTokenOwnedProcesses = options.sweepTokenOwnedProcesses === true && platform !== "win32";
			let captureBaseline;
			if (sweepTokenOwnedProcesses) {
				const capture = systemProcessOwnershipHost.captureBaseline;
				if (capture === undefined) throw new ProcessAdmissionError("baseline_unavailable");
				captureBaseline = await capture(options.signal);
				assertProcessOwnershipInspectionActive(options.signal);
			}
			const hostEnvironment = options.hostEnvironment ?? process.env;
			const selectedEnvironment = mergeEnvironmentOverrides(hostEnvironment, options.env ?? {}, platform);
			const environment = mergeEnvironmentOverrides(selectedEnvironment, { REA_PROCESS_RUN_ID: options.runId }, platform);
			if (platform === "win32" && HOST_PLATFORM.platform === "win32") {
				const child = new WindowsOwnedProcess(options.command, options.arguments, options.cwd, environment, options.windowsVerbatimArguments ?? false, {
					protocolStdin: options.stdin === "pipe",
					...options.memoryLimitBytes === undefined ? {} : { memoryLimitBytes: options.memoryLimitBytes }
				});
				return {
					process: child,
					ownership: {
						runId: options.runId,
						leaderPid: child.pid,
						processGroupId: child.pid,
						expectedParentPid: process.pid
					},
					cleanup: () => child.cleanup()
				};
			}
			if (options.memoryLimitBytes !== undefined) throw new ProcessAdmissionError("memory_limit_unsupported");
			let child;
			try {
				child = spawn(options.command, [...options.arguments], {
					shell: false,
					windowsHide: true,
					stdio: [
						options.stdin ?? "ignore",
						"pipe",
						"pipe"
					],
					detached: platform !== "win32",
					windowsVerbatimArguments: options.windowsVerbatimArguments ?? false,
					env: environment,
					...options.cwd === undefined ? {} : { cwd: options.cwd }
				});
			} catch (cause) {
				throw nameSpawnedExecutable(cause, options.command);
			}
			await waitForSpawn(child);
			const pid = child.pid;
			if (pid === undefined) throw new ProcessAdmissionError("launcher_pid_missing");
			const ownership = {
				runId: options.runId,
				leaderPid: pid,
				processGroupId: pid,
				expectedParentPid: process.pid,
				evidenceOwner: new ProcessOwnershipEvidenceOwner(),
				...sweepTokenOwnedProcesses ? {
					sweepTokenOwnedProcesses: true,
					captureBaseline
				} : {},
				...options.expectedCommand === null ? {} : { expectedCommand: options.expectedCommand ?? options.command }
			};
			return {
				process: child,
				ownership,
				requestStop: (signal) => signalUnreapedGroup(child, pid, signal)
			};
		};
		signalUnreapedGroup = (child, processGroupId, signal) => {
			if (child.exitCode !== null || child.signalCode !== null) return false;
			try {
				process.kill(-processGroupId, signal);
				return true;
			} catch {
				return false;
			}
		};
		ProviderProcessSupervisor = class {
			launch;
			#options;
			#stdout = new ProcessOutputCapture();
			#stderr = new ProcessOutputCapture();
			#exit = deferred();
			#outputClose = deferred();
			#outputClosed = false;
			#outputIncomplete = false;
			#stdoutObservedBytes = 0;
			#stderrObservedBytes = 0;
			#diagnosticTruncated = false;
			#stdoutMarker;
			#stderrMarker;
			#onStdout = (chunk) => {
				this.#capture("stdout", this.#stdout, chunk);
			};
			#onStderr = (chunk) => {
				this.#capture("stderr", this.#stderr, chunk);
			};
			#onStdoutEnd = () => {
				this.#stdoutMarker?.finish();
			};
			#onStderrEnd = () => {
				this.#stderrMarker?.finish();
			};
			#onStdoutError = (cause) => {
				this.#recordStreamError("stdout", cause);
			};
			#onStderrError = (cause) => {
				this.#recordStreamError("stderr", cause);
			};
			#onExit = (code, signal) => {
				this.#recordExit(code, signal);
			};
			#onClose = (code, signal) => {
				this.#recordExit(code, signal);
				this.#outputClosed = true;
				if (!this.#disposed) this.#options.onDiagnostic?.({
					type: "output-close",
					snapshot: this.snapshot()
				});
				this.#outputClose.resolve(undefined);
			};
			#onError = (cause) => {
				this.#options.onDiagnostic?.({
					type: "error",
					message: cause.message,
					cause
				});
			};
			#exitObservation;
			#stopPromise;
			#stopRequested = false;
			#release = new AnalysisCleanupRelease();
			#disposed = false;
			#maxAggregateDiagnosticBytes;
			#maxStreamDiagnosticBytes;
			#outputEpoch = 0;
			#inspectionCleanup = new Map();
			constructor(launch, options = {}) {
				this.launch = launch;
				this.#options = options;
				const budget = options.maxDiagnosticBytes;
				if (typeof budget === "number") this.#maxAggregateDiagnosticBytes = budget;
				else if (budget !== undefined) this.#maxStreamDiagnosticBytes = {
					stdout: budget.stdout,
					stderr: budget.stderr
				};
				this.#resetMarkers();
				if (options.captureStdout !== false) this.#attach(launch.process.stdout, "stdout");
				this.#attach(launch.process.stderr, "stderr");
				launch.process.once("exit", this.#onExit);
				launch.process.once("close", this.#onClose);
				launch.process.on("error", this.#onError);
				if (launch.process.exitCode !== null || launch.process.signalCode !== null) this.#recordExit(launch.process.exitCode, launch.process.signalCode);
			}
			/**
			* Recorded process exit without concatenating retained stream diagnostics.
			* Undefined until exit or close is observed.
			*/
			observedExit() {
				const exit = this.#exitObservation;
				if (exit === undefined) return undefined;
				return {
					code: exit.code,
					signal: exit.signal
				};
			}
			/** Whether the process owner acknowledged output closure, separately from exit. */
			observedOutputClose() {
				return this.#outputClosed;
			}
			/** Latest retained output and exit observation, with explicit configured truncation. */
			snapshot() {
				const outputIncomplete = this.#outputIncomplete || this.launch.process.outputIncomplete === true;
				return {
					...this.#diagnosticTruncated || outputIncomplete ? { diagnosticTruncated: true } : {},
					stdout: this.#stdout.snapshot(this.#stdoutObservedBytes),
					stderr: this.#stderr.snapshot(this.#stderrObservedBytes),
					exitCode: this.#exitObservation?.code,
					signal: this.#exitObservation?.signal,
					...this.launch.process.memoryLimitReached === true ? { memoryLimitReached: true } : {},
					...this.#stopRequested ? { stopRequested: true } : {},
					...outputIncomplete ? { outputIncomplete: true } : {},
					...this.#runtimeExhaustionWithin({
						stdout: 0,
						stderr: 0
					})
				};
			}
			/** Mark the current raw-byte position without copying or retaining output. */
			checkpointOutput() {
				const checkpoint = Object.freeze({});
				outputCheckpoints.set(checkpoint, {
					owner: this,
					epoch: this.#outputEpoch,
					stdout: this.#stdoutObservedBytes,
					stderr: this.#stderrObservedBytes
				});
				return checkpoint;
			}
			/** Snapshot only bytes produced after a valid checkpoint on this supervisor. */
			snapshotOutputSince(checkpoint) {
				const position = typeof checkpoint === "object" && checkpoint !== null ? outputCheckpoints.get(checkpoint) : undefined;
				if (position === undefined || position.owner !== this || position.epoch !== this.#outputEpoch) return {
					snapshot: {
						stdout: {
							text: "",
							bytes: 0,
							observedBytes: 0
						},
						stderr: {
							text: "",
							bytes: 0,
							observedBytes: 0
						},
						exitCode: this.#exitObservation?.code,
						signal: this.#exitObservation?.signal,
						outputIncomplete: true,
						diagnosticTruncated: true
					},
					complete: false
				};
				const stdout = this.#stdout.snapshotRange(position.stdout, this.#stdoutObservedBytes);
				const stderr = this.#stderr.snapshotRange(position.stderr, this.#stderrObservedBytes);
				const incomplete = stdout.complete === false || stderr.complete === false || this.#outputIncomplete || this.launch.process.outputIncomplete === true;
				return {
					snapshot: {
						...incomplete ? { diagnosticTruncated: true } : {},
						stdout: stdout.stream,
						stderr: stderr.stream,
						exitCode: this.#exitObservation?.code,
						signal: this.#exitObservation?.signal,
						...this.launch.process.memoryLimitReached === true ? { memoryLimitReached: true } : {},
						...incomplete ? { outputIncomplete: true } : {},
						...this.#runtimeExhaustionWithin(position)
					},
					complete: !incomplete,
					...this.#markersWithin(position)
				};
			}
			#markersWithin(position) {
				const stdout = this.#stdoutMarker?.latestWithin(position.stdout, this.#stdoutObservedBytes);
				const stderr = this.#stderrMarker?.latestWithin(position.stderr, this.#stderrObservedBytes);
				const markers = [...stdout === undefined ? [] : [{
					stream: "stdout",
					...stdout
				}], ...stderr === undefined ? [] : [{
					stream: "stderr",
					...stderr
				}]];
				return markers.length === 0 ? {} : { markers };
			}
			/** The runtime's exhaustion report after a position; stderr is preferred. */
			#runtimeExhaustionWithin(position) {
				const runtime = this.#options.runtime;
				if (runtime === undefined) return {};
				const stderr = this.#stderrMarker?.latestWithin(position.stderr, this.#stderrObservedBytes);
				if (stderr !== undefined) return { runtimeExhaustion: runtimeExhaustion(runtime, "stderr", stderr) };
				const stdout = this.#stdoutMarker?.latestWithin(position.stdout, this.#stdoutObservedBytes);
				return stdout === undefined ? {} : { runtimeExhaustion: runtimeExhaustion(runtime, "stdout", stdout) };
			}
			#resetMarkers() {
				const runtime = this.#options.runtime;
				const marker = runtime === undefined ? this.#options.outputToken : RUNTIME_EXHAUSTION_TOKENS[runtime];
				this.#stdoutMarker = marker === undefined ? undefined : new ProcessOutputTokenScanner(marker);
				this.#stderrMarker = marker === undefined ? undefined : new ProcessOutputTokenScanner(marker);
			}
			/** Begin a new observation on a retained process without retaining earlier output. */
			resetOutput() {
				this.#outputEpoch += 1;
				this.#stdout.reset();
				this.#stderr.reset();
				this.#stdoutObservedBytes = 0;
				this.#stderrObservedBytes = 0;
				this.#diagnosticTruncated = false;
				this.#resetMarkers();
			}
			/** Wait for process exit up to a caller-owned bounded interval. */
			async waitForExit(timeoutMs) {
				return waitForProcessEvent(this.#exitObservation !== undefined, this.#exit.promise, timeoutMs);
			}
			/** Wait until output streams close; omit the timeout to await physical completion.
			* WindowsOwnedProcess closes only after its whole Job Object settles.
			*/
			async waitForOutputClose(timeoutMs, signal) {
				return waitForProcessEvent(this.#outputClosed, this.#outputClose.promise, timeoutMs, signal);
			}
			/** Bound additional retained bytes while still draining all later output. */
			limitAdditionalOutputBytes(maxBytes) {
				if (!Number.isSafeInteger(maxBytes) || maxBytes < 0) throw new RangeError("Additional output limit must be a non-negative safe integer.");
				const retained = this.#stdout.bytes + this.#stderr.bytes;
				const requestedLimit = Math.min(Number.MAX_SAFE_INTEGER, retained + maxBytes);
				this.#maxAggregateDiagnosticBytes = this.#maxAggregateDiagnosticBytes === undefined ? requestedLimit : Math.min(this.#maxAggregateDiagnosticBytes, requestedLimit);
			}
			/** Unreference inherited output pipes without closing streams shared with descendants. */
			unrefOutputStreams() {
				for (const stream of [this.launch.process.stdout, this.launch.process.stderr]) {
					const unref = stream?.unref;
					unref?.call(stream);
				}
			}
			/** Adopt only explicit inspection capabilities into this process owner's existing lifetime. */
			retainInspectionFailure(cause) {
				for (const failure of processInspectionCleanupFailures(cause)) {
					const owner = failure instanceof DarwinProcessOwnershipInspectionError ? failure.cleanupOwner : failure.owner;
					const key = owner ?? failure;
					if (this.#inspectionCleanup.has(key)) continue;
					this.#inspectionCleanup.set(key, {
						failure,
						origin: cause,
						cause: failure instanceof DarwinProcessOwnershipInspectionError ? failure.cleanupFailure ?? failure : failure.cleanupCause
					});
				}
			}
			async #retryInspectionCleanup() {
				for (const [key, retained] of this.#inspectionCleanup) {
					const owner = retained.failure instanceof DarwinProcessOwnershipInspectionError ? retained.failure.cleanupOwner : retained.failure.owner;
					if (owner === undefined) continue;
					try {
						await owner.close();
						this.#inspectionCleanup.delete(key);
					} catch (cause) {
						retained.cause = cause;
					}
				}
			}
			#inspectionCleanupSnapshot() {
				const retained = [...this.#inspectionCleanup.values()];
				return {
					causes: [...new Set(retained.map(({ origin }) => origin))],
					failures: retained.map(({ failure, cause }) => ({
						failure,
						cause
					}))
				};
			}
			/** Retry only held inspection resources; success makes no process-cleanup claim. */
			async retryInspectionCleanup() {
				await this.#retryInspectionCleanup();
				return this.#inspectionCleanup.size === 0 ? ok(undefined) : err(this.#inspectionCleanupSnapshot());
			}
			#inspectionStopFailure(reason) {
				return {
					status: "incomplete",
					reason,
					...this.#inspectionCleanup.size === 0 ? {} : { inspectionCleanup: this.#inspectionCleanupSnapshot() }
				};
			}
			/**
			* Confirmed once a stop proves this process ended; errors reporting the
			* process read it instead of being told.
			*/
			get cleanupRelease() {
				return this.#release;
			}
			/** Share each stop attempt; incomplete cleanup retains ownership and permits retry. */
			stop(options = {}) {
				if (this.launch.ownsProcessLifetime && this.#exitObservation === undefined) this.#stopRequested = true;
				this.#stopPromise ??= this.#stop(options).then((result) => {
					if (result.status === "incomplete") this.#stopPromise = undefined;
					else if (result.status !== "not-owned") this.#release.confirm();
					return result;
				});
				return this.#stopPromise;
			}
			/** Detach capture and process listeners after an adapter releases ownership. */
			dispose() {
				if (this.#disposed) return;
				if (!this.#outputClosed) this.#outputIncomplete = true;
				this.#disposed = true;
				this.launch.process.stdout?.off("data", this.#onStdout);
				this.launch.process.stdout?.off("error", this.#onStdoutError);
				this.launch.process.stdout?.off("end", this.#onStdoutEnd);
				this.launch.process.stderr?.off("data", this.#onStderr);
				this.launch.process.stderr?.off("error", this.#onStderrError);
				this.launch.process.stderr?.off("end", this.#onStderrEnd);
				this.launch.process.off("exit", this.#onExit);
				this.launch.process.off("close", this.#onClose);
				this.launch.process.off("error", this.#onError);
			}
			/** Release event-loop references so incomplete cleanup does not prevent host exit. */
			unref() {
				const process = this.launch.process;
				process.unref?.();
				process.stdin?.unref?.();
				process.stdout?.unref?.();
				process.stderr?.unref?.();
			}
			/** Restore event-loop references when retrying supervised process cleanup. */
			ref() {
				const process = this.launch.process;
				process.ref?.();
				process.stdin?.ref?.();
				process.stdout?.ref?.();
				process.stderr?.ref?.();
			}
			async #stop(options) {
				if (this.launch.ownsProcessLifetime) {
					this.ref();
					this.limitAdditionalOutputBytes(MAX_LATE_OUTPUT_BYTES);
				}
				let completed = false;
				try {
					const result = await this.#stopWithin(options);
					completed = result.status !== "incomplete";
					if (completed && result.status !== "not-owned" && !this.#outputClosed) {
						if (!await this.waitForOutputClose(OUTPUT_CLOSE_GRACE_MS)) {
							this.#outputIncomplete = true;
							this.unref();
						}
					}
					if (!completed) this.unref();
					return result;
				} finally {
					if (completed) this.dispose();
				}
			}
			async #stopWithin(options) {
				try {
					if (!this.launch.ownsProcessLifetime) return { status: "not-owned" };
					await this.#retryInspectionCleanup();
					if (this.#inspectionCleanup.size > 0) return this.#inspectionStopFailure([...this.#inspectionCleanup.values()].map(({ cause }) => errorMessage(cause)).join("; "));
					if (this.launch.cleanup !== undefined) {
						if (options.termination !== undefined && options.cleanupResult === undefined && this.#exitObservation === undefined && this.launch.requestStop?.(options.termination.signal) === true) await this.waitForExit(options.termination.graceMs);
						const graceMs = options.killGraceMs ?? DEFAULT_KILL_GRACE_MS;
						const exitObservedBeforeCleanup = this.#exitObservation !== undefined;
						const cleanup = await this.#ownedCleanup(options.cleanupResult);
						if (!cleanup.cleaned) {
							if (exitObservedBeforeCleanup || !await this.waitForExit(graceMs)) return incompleteCleanup(cleanup);
							const settled = await this.launch.cleanup();
							return settled.cleaned ? { status: "verified-cleanup" } : incompleteCleanup(settled);
						}
						if (await this.waitForExit(graceMs)) return { status: "verified-cleanup" };
						const retried = await this.launch.cleanup();
						if (!retried.cleaned) return incompleteCleanup(retried);
						if (await this.waitForExit(graceMs)) return { status: "verified-cleanup" };
						return {
							status: "incomplete",
							reason: "verified process-group cleanup did not stop the launcher"
						};
					}
					if (this.#exitObservation !== undefined) return { status: "already-exited" };
					this.#signal("SIGTERM");
					if (await this.waitForExit(options.terminationGraceMs ?? DEFAULT_TERMINATION_GRACE_MS)) return { status: "terminated" };
					this.#signal("SIGKILL");
					if (await this.waitForExit(options.killGraceMs ?? DEFAULT_KILL_GRACE_MS)) return { status: "killed" };
					return {
						status: "incomplete",
						reason: "owned provider process did not exit after SIGKILL"
					};
				} catch (cause) {
					this.retainInspectionFailure(cause);
					return this.#inspectionStopFailure(cause instanceof Error ? cause.message : "owned provider process cleanup failed");
				}
			}
			#ownedCleanup(supplied) {
				if (supplied !== undefined) return Promise.resolve(supplied);
				const cleanup = this.launch.cleanup;
				return cleanup === undefined ? Promise.resolve({
					cleaned: false,
					reason: "owned provider process has no cleanup capability"
				}) : cleanup();
			}
			#signal(signal) {
				if (this.#exitObservation !== undefined) return;
				this.launch.process.kill(signal);
			}
			#attach(stream, name) {
				if (name === "stdout") {
					stream?.on("data", this.#onStdout);
					stream?.on("error", this.#onStdoutError);
					stream?.on("end", this.#onStdoutEnd);
				} else {
					stream?.on("data", this.#onStderr);
					stream?.on("error", this.#onStderrError);
					stream?.on("end", this.#onStderrEnd);
				}
			}
			#recordStreamError(stream, cause) {
				this.#outputIncomplete = true;
				this.#options.onDiagnostic?.({
					type: "error",
					message: `${stream} stream failed: ${cause.message}`,
					cause
				});
			}
			#capture(stream, capture, chunk) {
				const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
				if (stream === "stdout") {
					this.#stdoutMarker?.scan(bytes, this.#stdoutObservedBytes);
					this.#stdoutObservedBytes += bytes.byteLength;
				} else {
					this.#stderrMarker?.scan(bytes, this.#stderrObservedBytes);
					this.#stderrObservedBytes += bytes.byteLength;
				}
				const aggregateRemaining = this.#maxAggregateDiagnosticBytes === undefined ? bytes.byteLength : Math.max(0, this.#maxAggregateDiagnosticBytes - this.#stdout.bytes - this.#stderr.bytes);
				const streamLimit = this.#maxStreamDiagnosticBytes?.[stream];
				const streamRemaining = streamLimit === undefined ? bytes.byteLength : Math.max(0, streamLimit - capture.bytes);
				let truncated;
				if (this.#options.diagnosticRetention === "tail") {
					const limit = Math.min(capture.bytes + aggregateRemaining, streamLimit ?? Number.MAX_SAFE_INTEGER);
					truncated = capture.appendTail(bytes, limit) > 0;
				} else {
					const retained = Math.min(bytes.byteLength, aggregateRemaining, streamRemaining);
					if (retained > 0) capture.append(bytes.subarray(0, retained));
					truncated = retained < bytes.byteLength;
				}
				if (truncated) this.#diagnosticTruncated = true;
				this.#options.onDiagnostic?.({
					type: "output",
					stream,
					bytes: bytes.byteLength,
					totalBytes: stream === "stdout" ? this.#stdoutObservedBytes : this.#stderrObservedBytes,
					...truncated ? { truncated: true } : {}
				});
			}
			#recordExit(code, signal) {
				if (this.#exitObservation !== undefined) return;
				this.#exitObservation = {
					code,
					signal
				};
				this.#exit.resolve(this.#exitObservation);
				this.#options.onDiagnostic?.({
					type: "exit",
					code,
					signal,
					snapshot: this.snapshot()
				});
			}
		};
		ProcessOutputCapture = class {
			#chunks = [];
			#bytes = 0;
			/** Observed bytes before the first retained one, which tail retention dropped. */
			#start = 0;
			get bytes() {
				return this.#bytes;
			}
			reset() {
				this.#chunks.length = 0;
				this.#bytes = 0;
				this.#start = 0;
			}
			append(chunk) {
				this.#bytes += chunk.byteLength;
				this.#chunks.push(Buffer.from(chunk));
			}
			/**
			* Keep the latest `limit` bytes; returns how many observed bytes this
			* dropped. A UTF-8 character the cut splits is dropped whole.
			*/
			appendTail(chunk, limit) {
				const before = this.#start;
				const kept = chunk.subarray(Math.max(0, chunk.byteLength - limit));
				this.append(kept);
				this.#start += chunk.byteLength - kept.byteLength;
				const cut = kept.byteLength < chunk.byteLength || this.#bytes > limit;
				this.#dropFront(this.#bytes - limit, cut);
				return this.#start - before;
			}
			/** Drop the first `count` retained bytes and, after a cut, the rest of a character it split. */
			#dropFront(count, cut) {
				let remaining = Math.max(0, count);
				for (let first = this.#chunks[0]; first !== undefined; first = this.#chunks[0]) {
					let drop = Math.min(remaining, first.byteLength);
					while (cut && drop < first.byteLength && ((first[drop] ?? 0) & 192) === 128) drop += 1;
					if (drop === first.byteLength) this.#chunks.shift();
					else if (drop > 0) this.#chunks[0] = Buffer.from(first.subarray(drop));
					this.#bytes -= drop;
					this.#start += drop;
					remaining -= Math.min(remaining, drop);
					if (drop < first.byteLength) return;
				}
			}
			snapshot(observedBytes) {
				return this.#snapshotBuffer(Buffer.concat(this.#chunks, this.#bytes), observedBytes);
			}
			snapshotRange(start, end) {
				const retainedEnd = this.#start + this.#bytes;
				const availableEnd = Math.max(this.#start, Math.min(end, retainedEnd));
				const availableStart = Math.min(Math.max(start, this.#start), availableEnd);
				const chunks = [];
				let offset = this.#start;
				for (const chunk of this.#chunks) {
					const chunkEnd = offset + chunk.byteLength;
					const from = Math.max(availableStart, offset);
					const to = Math.min(availableEnd, chunkEnd);
					if (to > from) chunks.push(chunk.subarray(from - offset, to - offset));
					offset = chunkEnd;
					if (offset >= availableEnd) break;
				}
				const buffer = Buffer.concat(chunks, availableEnd - availableStart);
				return {
					stream: this.#snapshotBuffer(buffer, Math.max(0, end - start)),
					complete: start === end || start >= this.#start && start <= retainedEnd && end <= retainedEnd
				};
			}
			#snapshotBuffer(buffer, observedBytes) {
				const text = buffer.toString("utf8");
				const invalidUtf8 = !isStrictUtf8(buffer);
				return {
					text,
					bytes: buffer.byteLength,
					observedBytes,
					...invalidUtf8 ? { invalidUtf8: true } : {}
				};
			}
		};
		deferred = () => {
			let resolver;
			const promise = new Promise((resolve) => {
				resolver = resolve;
			});
			return {
				promise,
				resolve: (value) => {
					resolver?.(value);
				}
			};
		};
		waitForSpawn = (child) => new Promise((resolve, reject) => {
			const onSpawn = () => {
				child.off("error", onError);
				resolve();
			};
			const onError = (cause) => {
				child.off("spawn", onSpawn);
				reject(cause);
			};
			child.once("spawn", onSpawn);
			child.once("error", onError);
		});
		waitForProcessEvent = async (observed, event, timeoutMs, signal) => {
			if (observed) return true;
			if (signal?.aborted === true) return false;
			let timer;
			let onAbort;
			try {
				return await Promise.race([event.then(() => true), new Promise((resolve) => {
					if (timeoutMs !== undefined) timer = setTimeout(() => resolve(false), Math.max(0, timeoutMs));
					if (signal !== undefined) {
						onAbort = () => resolve(false);
						signal.addEventListener("abort", onAbort, { once: true });
					}
				})]);
			} finally {
				if (timer !== undefined) clearTimeout(timer);
				if (onAbort !== undefined) signal?.removeEventListener("abort", onAbort);
			}
		};
	})))();
}

//#endregion
//#region dist/process/ProcessOwnership.js
var execFileAsync, cleanupWindowsProcessTree, systemWindowsProcessTreeHost, readProcessRunId, mergeUnverifiedObservations, OWNED_GROUP_REVALIDATION_LIMIT, implicitEvidenceOwners, failuresAfterSignal, cleanupFailureFollowedSignal, cleanupOwnedProcessGroup, cleanupOwnedProcessGroupAttempt, verifyNoTokenOwnedProcesses, readLiveProcessTable, readProcessRelationSnapshot, settledProcessTable, EXIT_REFRESH_CONFIRMATION_LIMIT, isExitRefreshCandidate, classifyUnlinkedExitRows, settleLauncherExit, createOwnedCleanupPlan, mergeProcessOwnershipFailure, ownershipFailurePriority, revalidateOwnedProcessGroup, cleanupValidationFailure, unreadableTokenFailure, unreadableCandidateFacts, sanitizedTokenReadFailure, processOwnershipFailures, processRunTokenFailures, recheckOwnershipFailures, PLATFORM_BINARY_ENVIRONMENT_WITHHELD, RESTRICTED_PROCESS_ENVIRONMENT_WITHHELD, currentProcessUid, environmentWithheldFromInspection, scanTokenOwnedProcesses, scanWithOwnershipEvidence, settleUnreadableTokenCandidates;
function init_ProcessOwnership() {
	return (init_ProcessOwnership = __esmMin((() => {
		init_ProcessInspectionCleanup();
		init_HostPlatform();
		init_ProcessOwnershipObservation();
		init_ProcessOwnershipIdentity();
		init_ProcessOwnershipProcessTree();
		init_ProcessRunTokenObservations();
		init_unicodeCodePointOrder();
		init_ProcessOwnershipEvidence();
		init_ProcessLifecycle();
		init_errorMessage();
		execFileAsync = promisify(execFile);
		cleanupWindowsProcessTree = async (rootPid, host = systemWindowsProcessTreeHost) => {
			if (!Number.isSafeInteger(rootPid) || rootPid <= 0) return {
				cleaned: false,
				reason: "Windows process-tree PID is invalid"
			};
			try {
				const result = await host.terminateTree(rootPid);
				return {
					cleaned: true,
					signaled: result === "terminated"
				};
			} catch (cause) {
				return {
					cleaned: false,
					reason: `Windows process-tree termination failed for PID ${String(rootPid)}: ${errorMessage(cause)}`
				};
			}
		};
		systemWindowsProcessTreeHost = { async terminateTree(rootPid) {
			try {
				await execFileAsync("taskkill.exe", [
					"/pid",
					String(rootPid),
					"/t",
					"/f"
				], {
					windowsHide: true,
					timeout: 5e3
				});
				return "terminated";
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && (cause.code === 128 || cause.code === "ESRCH")) return "missing";
				throw cause;
			}
		} };
		readProcessRunId = async (pid, host = systemProcessOwnershipHost, signal) => processRunIdFromEnvironment(await host.environment(pid, signal));
		mergeUnverifiedObservations = (result, unverified) => {
			if (unverified.length === 0) return result;
			const merged = [...new Map([...result.unverified ?? [], ...unverified].map((item) => [JSON.stringify([item.pid, item.diagnostic]), item])).values()];
			return {
				...result,
				unverified: merged
			};
		};
		OWNED_GROUP_REVALIDATION_LIMIT = 2;
		implicitEvidenceOwners = new WeakMap();
		failuresAfterSignal = new WeakSet();
		cleanupFailureFollowedSignal = (cause) => typeof cause === "object" && cause !== null && failuresAfterSignal.has(cause);
		cleanupOwnedProcessGroup = async (ownership, host = systemProcessOwnershipHost) => {
			const attempt = { signaled: false };
			try {
				return await cleanupOwnedProcessGroupAttempt(ownership, host, attempt);
			} catch (cause) {
				if (attempt.signaled && typeof cause === "object" && cause !== null) failuresAfterSignal.add(cause);
				throw cause;
			}
		};
		cleanupOwnedProcessGroupAttempt = async (ownership, host, attempt) => {
			if (ownership.evidenceOwner === undefined) {
				let evidenceOwner = implicitEvidenceOwners.get(ownership);
				if (evidenceOwner === undefined) {
					evidenceOwner = new ProcessOwnershipEvidenceOwner();
					implicitEvidenceOwners.set(ownership, evidenceOwner);
				}
				ownership = {
					...ownership,
					evidenceOwner
				};
			}
			const exitSettlement = { deadline: undefined };
			const processTable = await readLiveProcessTable(host);
			if (!processTable.available) return {
				cleaned: false,
				reason: `process table could not be inspected: ${processTable.reason}`
			};
			const plan = await createOwnedCleanupPlan(ownership, processTable.processes, host, exitSettlement);
			if ("cleaned" in plan) return plan;
			const finish = (result, unverified = plan.unverified) => mergeUnverifiedObservations(attempt.signaled ? {
				...result,
				signaled: true
			} : result, unverified);
			const pendingGroups = [...plan.signalOrder];
			const pending = new Set(pendingGroups);
			const passes = new Map();
			while (pendingGroups.length > 0) {
				const processGroupId = pendingGroups.shift();
				if (processGroupId === undefined) break;
				pending.delete(processGroupId);
				const seen = passes.get(processGroupId) ?? 0;
				if (seen >= OWNED_GROUP_REVALIDATION_LIMIT) return finish({
					cleaned: false,
					reason: `owned process group ${String(processGroupId)} reappeared after ${String(OWNED_GROUP_REVALIDATION_LIMIT)} revalidation passes. This release has no runtime override.`
				});
				passes.set(processGroupId, seen + 1);
				const revalidation = await revalidateOwnedProcessGroup(processGroupId, ownership, host, plan.tokenOwnedIdentities, exitSettlement);
				if ("cleaned" in revalidation) return finish(revalidation);
				for (const groupId of revalidation.escapedProcessGroupIds) {
					if (groupId === processGroupId || pending.has(groupId)) continue;
					if ((passes.get(groupId) ?? 0) >= OWNED_GROUP_REVALIDATION_LIMIT) return finish({
						cleaned: false,
						reason: `owned process group ${String(groupId)} reappeared after ${String(OWNED_GROUP_REVALIDATION_LIMIT)} revalidation passes. This release has no runtime override.`
					});
					pending.add(groupId);
					pendingGroups.push(groupId);
				}
				if (revalidation.empty) continue;
				try {
					host.signalGroup(processGroupId, "SIGKILL");
					attempt.signaled = true;
				} catch (cause) {
					const code = cause instanceof Error && "code" in cause ? cause.code : undefined;
					if (code !== "ESRCH") return finish({
						cleaned: false,
						reason: `owned process group signal failed: ${errorMessage(cause)}`
					});
				}
			}
			if (plan.unresolved.length > 0) return finish(cleanupValidationFailure(plan.unresolved));
			if (ownership.sweepTokenOwnedProcesses === true) {
				let verification;
				try {
					const relation = {
						leaderPid: ownership.leaderPid,
						processGroupId: ownership.processGroupId,
						evidenceOwner: ownership.evidenceOwner,
						...ownership.sampledProcessGroupIds === undefined ? {} : { sampledProcessGroupIds: ownership.sampledProcessGroupIds }
					};
					const deadline = performance.now() + PROCESS_CLEANUP_VERIFICATION_GRACE_MS;
					verification = await verifyNoTokenOwnedProcesses(ownership.runId, host, ownership.captureBaseline, relation, exitSettlement);
					while (!verification.cleaned) {
						const remaining = deadline - performance.now();
						if (remaining <= 0) break;
						await setTimeout$1(Math.min(25, remaining));
						verification = await verifyNoTokenOwnedProcesses(ownership.runId, host, ownership.captureBaseline, relation, exitSettlement);
					}
				} catch (cause) {
					rethrowProcessInspectionFailure(cause);
					return finish({
						cleaned: false,
						reason: `final process ownership verification failed: ${errorMessage(cause)}`
					});
				}
				if (!verification.cleaned) return finish(verification);
				return finish({
					cleaned: true,
					signaled: attempt.signaled
				}, [...plan.unverified, ...verification.unverified ?? []]);
			}
			return finish({
				cleaned: true,
				signaled: attempt.signaled
			});
		};
		verifyNoTokenOwnedProcesses = async (runId, host = systemProcessOwnershipHost, captureBaseline, relation, exitSettlement = { deadline: undefined }) => {
			const processTable = await readLiveProcessTable(host);
			if (!processTable.available) return {
				cleaned: false,
				reason: `process table could not be inspected: ${processTable.reason}`
			};
			const scan = await scanTokenOwnedProcesses(processTable.processes, runId, host, captureBaseline, relation, exitSettlement);
			if (scan.failures.length > 0) return cleanupValidationFailure(scan.failures, scan.unverified);
			if (scan.owned.length > 0) return {
				cleaned: false,
				reason: "token-owned process remained after cleanup",
				...scan.unverified.length === 0 ? {} : { unverified: scan.unverified }
			};
			return {
				cleaned: true,
				signaled: false,
				...scan.unverified.length === 0 ? {} : { unverified: scan.unverified }
			};
		};
		readLiveProcessTable = async (host) => {
			try {
				return {
					available: true,
					processes: liveProcesses(await host.listProcesses())
				};
			} catch (cause) {
				rethrowProcessInspectionFailure(cause);
				return {
					available: false,
					reason: errorMessage(cause)
				};
			}
		};
		readProcessRelationSnapshot = async (ownership, processes, host) => {
			if (host.processIdentities === undefined) return {
				currentRelations: processes,
				identities: new Map(),
				failures: []
			};
			const retainedPids = ownership.evidenceOwner?.candidates.map(({ pid }) => pid) ?? [];
			const observationRows = ownership.evidenceOwner?.rowsForObservation(processes) ?? processes;
			const identities = await readNativeProcessIdentityMap(observationRows, host);
			const possibleDescendants = new Set(descendantsOf([ownership.leaderPid], processes).map(({ pid }) => pid));
			const relevantPids = new Set([
				ownership.leaderPid,
				...retainedPids,
				...possibleDescendants,
				...processes.filter(({ processGroupId }) => processGroupId === ownership.processGroupId || ownership.sampledProcessGroupIds?.includes(processGroupId)).map(({ pid }) => pid)
			]);
			const currentRelations = [];
			const failures = [];
			const listedPids = new Set(processes.map(({ pid }) => pid));
			const omittedFromListedTable = (pid) => processes.length > 0 && !listedPids.has(pid);
			for (const process of observationRows) {
				const identity = identities.get(process.pid);
				if (processIdentityHasExited(identity)) continue;
				if (identity?.state === "readable" && identity.relation?.state === "observed") {
					if (omittedFromListedTable(process.pid)) {
						failures.push({
							pid: process.pid,
							reason: "process-identity-unavailable",
							diagnostic: "retained process was omitted from the current process table"
						});
						continue;
					}
					currentRelations.push({
						...process,
						parentPid: identity.relation.parentPid,
						processGroupId: identity.relation.processGroupId
					});
					continue;
				}
				if (relevantPids.has(process.pid) && identity?.state !== "absent") failures.push({
					pid: process.pid,
					reason: "process-identity-unavailable",
					diagnostic: `native process membership could not be read${identity?.state === "unavailable" ? `: ${identity.reason}` : ""}`
				});
			}
			const launcher = currentRelations.find(({ pid }) => pid === ownership.leaderPid);
			if (launcher !== undefined) {
				const listedLauncher = processes.find(({ pid }) => pid === ownership.leaderPid);
				const reason = launcherIdentityFailure({
					parentPid: launcher.parentPid,
					processGroupId: launcher.processGroupId,
					...listedLauncher === undefined ? {} : { command: listedLauncher.command }
				}, ownership);
				if (reason !== null) return {
					cleaned: false,
					reason
				};
			}
			return {
				currentRelations,
				identities,
				failures
			};
		};
		settledProcessTable = (processes) => ({
			processes,
			escapedProcessGroupIds: []
		});
		EXIT_REFRESH_CONFIRMATION_LIMIT = 8;
		isExitRefreshCandidate = (process, ownership, initialRelations) => {
			if (process.processGroupId === ownership.processGroupId) return false;
			const initial = initialRelations.get(process.pid);
			return initial === undefined || initial.parentPid !== process.parentPid || initial.processGroupId !== process.processGroupId;
		};
		classifyUnlinkedExitRows = async (ownership, refreshed, unlinked, host, initialRelations) => {
			let current = refreshed;
			let pending = unlinked;
			let confirmations = 0;
			const matched = [];
			const inspected = new Set();
			const tokenRead = new Set();
			while (pending.length > 0) {
				const due = pending.filter((process) => !inspected.has(process.pid));
				if (due.length === 0) break;
				for (const process of due) inspected.add(process.pid);
				const unreadable = [];
				for await (const { process, observation } of readProcessRunTokens(host, due)) {
					if (observation.state === "readable") {
						tokenRead.add(process.pid);
						if (observation.runId === ownership.runId) matched.push(process);
						continue;
					}
					unreadable.push({
						pid: process.pid,
						reason: observation.reason
					});
				}
				if (unreadable.length === 0) break;
				let liveRows;
				try {
					liveRows = liveProcesses(await host.listProcesses());
				} catch (cause) {
					rethrowProcessInspectionFailure(cause);
					liveRows = undefined;
				}
				const live = liveRows === undefined ? undefined : new Set(liveRows.map(({ pid }) => pid));
				const stillLive = unreadable.filter((candidate) => live === undefined || live.has(candidate.pid));
				if (stillLive.length > 0) {
					const only = stillLive.length === 1 ? stillLive[0] : undefined;
					const pids = stillLive.map(({ pid }) => pid).sort((left, right) => left - right);
					return {
						kind: "uncertain",
						reason: only === undefined ? `process ownership could not be revalidated for PID(s): ${pids.join(", ")}` : `process ownership could not be revalidated for PID ${String(only.pid)}: ${only.reason}`
					};
				}
				if (liveRows === undefined) break;
				confirmations += 1;
				if (confirmations > EXIT_REFRESH_CONFIRMATION_LIMIT) return {
					kind: "uncertain",
					reason: `process ownership could not be revalidated: the exit refresh confirmation limit of ${String(EXIT_REFRESH_CONFIRMATION_LIMIT)} reads was exceeded. This release has no runtime override.`
				};
				current = liveRows;
				inspected.clear();
				matched.length = 0;
				pending = current.filter((process) => tokenRead.has(process.pid) || isExitRefreshCandidate(process, ownership, initialRelations));
			}
			const livePids = new Set(current.map(({ pid }) => pid));
			const stillMatched = matched.filter((process) => livePids.has(process.pid));
			if (stillMatched.length === 0) return {
				kind: "clear",
				processes: current
			};
			const matchedPids = new Set(stillMatched.map(({ pid }) => pid));
			const groupIds = new Set();
			for (const process of stillMatched) {
				const leader = current.find((candidate) => candidate.pid === process.processGroupId && candidate.processGroupId === process.processGroupId);
				if (leader === undefined || !matchedPids.has(leader.pid)) return {
					kind: "uncertain",
					reason: "descendant process-group leader identity could not be verified"
				};
				groupIds.add(process.processGroupId);
			}
			return {
				kind: "escaped",
				processes: current,
				groupIds: [...groupIds].sort((left, right) => left - right)
			};
		};
		settleLauncherExit = async (ownership, processes, host, exitSettlement) => {
			const launcher = processes.find(({ pid }) => pid === ownership.leaderPid);
			if (launcher === undefined) return settledProcessTable(processes);
			let identityCheckedLauncher = launcher;
			if (host.processIdentities !== undefined) {
				const initialIdentities = await readNativeProcessIdentityMap([launcher], host);
				const identities = await settleExitingProcessIdentities([launcher], host, initialIdentities, undefined, exitSettlement);
				const identity = identities.get(launcher.pid);
				const initialIdentity = initialIdentities.get(launcher.pid);
				if (initialIdentity?.state === "readable" && identity?.state === "readable" && initialIdentity.identity !== identity.identity) return {
					cleaned: false,
					reason: "owned launcher identity changed while verifying exit"
				};
				if (processIdentityIsExiting(identity)) return {
					cleaned: false,
					reason: "owned launcher exit could not be confirmed"
				};
				if (processIdentityHasExited(identity)) return settledProcessTable(processes.filter(({ pid }) => pid !== launcher.pid));
				if (identity?.state !== "readable" || identity.relation?.state !== "observed") return {
					cleaned: false,
					reason: `owned launcher native identity could not be verified${identity?.state === "unavailable" ? `: ${identity.reason}` : ""}`
				};
				identityCheckedLauncher = {
					...launcher,
					parentPid: identity.relation.parentPid,
					processGroupId: identity.relation.processGroupId
				};
			}
			const reason = launcherIdentityFailure(identityCheckedLauncher, ownership);
			if (reason === null) return settledProcessTable(processes);
			if (host.processIdentities !== undefined) return {
				cleaned: false,
				reason
			};
			const refreshed = await readLiveProcessTable(host);
			if (refreshed.available && !refreshed.processes.some(({ pid }) => pid === launcher.pid)) {
				const descendants = descendantsOf([launcher.pid], processes);
				const descendantPids = new Set(descendants.map(({ pid }) => pid));
				const descendantGroupIds = new Set(descendants.map(({ processGroupId }) => processGroupId));
				const refreshedDescendantPids = new Set(descendantsOf(descendants.map(({ pid }) => pid), refreshed.processes).map(({ pid }) => pid));
				if (refreshed.processes.some((process) => process.processGroupId !== ownership.processGroupId && (refreshedDescendantPids.has(process.pid) || descendantPids.has(process.pid) || descendantGroupIds.has(process.processGroupId)))) return {
					cleaned: false,
					reason
				};
				const initialRelations = new Map(processes.map((process) => [process.pid, {
					parentPid: process.parentPid,
					processGroupId: process.processGroupId
				}]));
				const unlinked = refreshed.processes.filter((process) => isExitRefreshCandidate(process, ownership, initialRelations) && !descendantPids.has(process.pid) && !descendantGroupIds.has(process.processGroupId) && !refreshedDescendantPids.has(process.pid));
				const classified = await classifyUnlinkedExitRows(ownership, refreshed.processes, unlinked, host, initialRelations);
				if (classified.kind === "uncertain") return {
					cleaned: false,
					reason: classified.reason
				};
				return {
					processes: classified.processes,
					escapedProcessGroupIds: classified.kind === "escaped" ? classified.groupIds : []
				};
			}
			return {
				cleaned: false,
				reason
			};
		};
		createOwnedCleanupPlan = async (ownership, initialProcesses, host, exitSettlement) => {
			const settled = await settleLauncherExit(ownership, initialProcesses, host, exitSettlement);
			if ("cleaned" in settled) return settled;
			const processes = settled.processes;
			const escapedProcessGroupIds = new Set(settled.escapedProcessGroupIds);
			const relationSnapshot = await readProcessRelationSnapshot(ownership, processes, host);
			if ("cleaned" in relationSnapshot) return relationSnapshot;
			const sampledProcessGroupIds = new Set((ownership.sampledProcessGroupIds ?? []).filter((processGroupId) => Number.isSafeInteger(processGroupId) && processGroupId > 0));
			const retainedPids = new Set(ownership.evidenceOwner?.candidates.map(({ pid }) => pid) ?? []);
			const tokenOwned = ownership.sweepTokenOwnedProcesses === true || retainedPids.size > 0 ? await scanTokenOwnedProcesses(ownership.sweepTokenOwnedProcesses === true ? processes : processes.filter(({ pid }) => retainedPids.has(pid)), ownership.runId, host, ownership.captureBaseline, {
				leaderPid: ownership.leaderPid,
				processGroupId: ownership.processGroupId,
				evidenceOwner: ownership.evidenceOwner,
				...sampledProcessGroupIds.size === 0 ? {} : { sampledProcessGroupIds: [...sampledProcessGroupIds] }
			}, exitSettlement) : {
				owned: [],
				failures: [],
				unverified: [],
				identities: new Map()
			};
			const listedPids = new Set(processes.map(({ pid }) => pid));
			const omittedFromListedTable = (pid) => processes.length > 0 && !listedPids.has(pid);
			const signalableOwned = tokenOwned.owned.filter(({ pid }) => !omittedFromListedTable(pid));
			const tokenOwnedGroupIds = new Set(signalableOwned.map(({ processGroupId }) => processGroupId));
			const launcher = relationSnapshot.currentRelations.find(({ pid }) => pid === ownership.leaderPid);
			const rootMembers = relationSnapshot.currentRelations.filter(({ processGroupId }) => processGroupId === ownership.processGroupId);
			const unresolved = [];
			for (const failure of tokenOwned.failures) mergeProcessOwnershipFailure(unresolved, failure);
			for (const failure of relationSnapshot.failures) if (!unresolved.some(({ pid }) => pid === failure.pid)) mergeProcessOwnershipFailure(unresolved, failure);
			for (const process of tokenOwned.owned) if (omittedFromListedTable(process.pid)) mergeProcessOwnershipFailure(unresolved, {
				pid: process.pid,
				reason: "process-identity-unavailable",
				diagnostic: "retained process was omitted from the current process table"
			});
			if (launcher === undefined && rootMembers.length === 0 && signalableOwned.length === 0 && escapedProcessGroupIds.size === 0 && !relationSnapshot.currentRelations.some(({ processGroupId }) => sampledProcessGroupIds.has(processGroupId))) return unresolved.length > 0 ? {
				signalOrder: [],
				tokenOwnedIdentities: tokenOwned.identities,
				unresolved,
				unverified: tokenOwned.unverified
			} : {
				cleaned: true,
				signaled: false,
				...tokenOwned.unverified.length === 0 ? {} : { unverified: tokenOwned.unverified }
			};
			let descendants = [];
			if (launcher !== undefined) {
				descendants = descendantsOf([launcher.pid], relationSnapshot.currentRelations);
			}
			const descendantPids = new Set(descendants.map(({ pid }) => pid));
			const processGroupIds = new Set([ownership.processGroupId]);
			for (const descendant of descendants) processGroupIds.add(descendant.processGroupId);
			for (const process of signalableOwned) processGroupIds.add(process.processGroupId);
			for (const processGroupId of sampledProcessGroupIds) processGroupIds.add(processGroupId);
			for (const processGroupId of escapedProcessGroupIds) processGroupIds.add(processGroupId);
			const signalableGroups = new Set();
			const unverifiableSampledGroups = new Set();
			for (const processGroupId of processGroupIds) {
				if (processGroupId === ownership.processGroupId) continue;
				const groupLeader = relationSnapshot.currentRelations.find(({ pid, processGroupId: observedGroupId }) => pid === processGroupId && observedGroupId === processGroupId);
				const provenGroup = tokenOwnedGroupIds.has(processGroupId) || escapedProcessGroupIds.has(processGroupId);
				if ((groupLeader === undefined || !descendantPids.has(groupLeader.pid)) && !provenGroup && !sampledProcessGroupIds.has(processGroupId)) return {
					cleaned: false,
					reason: "descendant process-group leader identity could not be verified"
				};
				if ((groupLeader === undefined || !descendantPids.has(groupLeader.pid)) && !provenGroup) unverifiableSampledGroups.add(processGroupId);
			}
			const liveMembers = relationSnapshot.currentRelations.filter(({ processGroupId }) => processGroupIds.has(processGroupId));
			for (const processGroupId of processGroupIds) {
				const members = liveMembers.filter(({ processGroupId: observedGroupId }) => observedGroupId === processGroupId);
				if (members.length === 0) continue;
				const { failures, validatedMembers } = await processOwnershipFailures(members, ownership, host, tokenOwned.identities, exitSettlement);
				if (failures.length === 0 && unverifiableSampledGroups.has(processGroupId)) unresolved.push(...validatedMembers.map(({ pid }) => ({
					pid,
					reason: "process-identity-unavailable",
					diagnostic: "sampled process-group leader identity could not be verified"
				})));
				const scanFailures = tokenOwned.failures.filter(({ pid }) => members.some((member) => member.pid === pid));
				for (const failure of failures) mergeProcessOwnershipFailure(unresolved, failure);
				if (failures.length === 0 && scanFailures.length === 0 && !unverifiableSampledGroups.has(processGroupId)) signalableGroups.add(processGroupId);
			}
			if (ownership.sweepTokenOwnedProcesses !== true && unresolved.length > 0) return cleanupValidationFailure(unresolved, tokenOwned.unverified);
			return {
				signalOrder: [...signalableGroups].filter((groupId) => processGroupIds.has(groupId)).sort((left, right) => left === ownership.processGroupId ? -1 : right === ownership.processGroupId ? 1 : left - right),
				tokenOwnedIdentities: tokenOwned.identities,
				unresolved,
				unverified: tokenOwned.unverified
			};
		};
		mergeProcessOwnershipFailure = (failures, next) => {
			const index = failures.findIndex(({ pid }) => pid === next.pid);
			if (index < 0) {
				failures.push(next);
				return;
			}
			const previous = failures[index];
			if (previous !== undefined && ownershipFailurePriority(next.reason) >= ownershipFailurePriority(previous.reason)) failures[index] = next;
		};
		ownershipFailurePriority = (reason) => reason === "run-token-mismatch" ? 3 : reason === "process-identity-unavailable" ? 2 : reason === "environment-unreadable" ? 1 : 0;
		revalidateOwnedProcessGroup = async (processGroupId, ownership, host, expectedIdentities, exitSettlement) => {
			const escapedProcessGroupIds = new Set();
			for (let refresh = 0;; refresh += 1) {
				let members;
				try {
					const settled = await settleLauncherExit(ownership, liveProcesses(await host.listProcesses()), host, exitSettlement);
					if ("cleaned" in settled) return settled;
					for (const groupId of settled.escapedProcessGroupIds) escapedProcessGroupIds.add(groupId);
					const relationSnapshot = await readProcessRelationSnapshot(ownership, settled.processes, host);
					if ("cleaned" in relationSnapshot) return relationSnapshot;
					if (relationSnapshot.failures.length > 0) return cleanupValidationFailure(relationSnapshot.failures);
					members = relationSnapshot.currentRelations.filter(({ processGroupId: observedGroupId }) => observedGroupId === processGroupId);
				} catch (cause) {
					rethrowProcessInspectionFailure(cause);
					return {
						cleaned: false,
						reason: `process ownership could not be revalidated: ${errorMessage(cause)}`
					};
				}
				const { failures, validatedMembers } = await processOwnershipFailures(members, ownership, host, expectedIdentities, exitSettlement);
				if (failures.length > 0) return cleanupValidationFailure(failures);
				if (processGroupId !== ownership.processGroupId && validatedMembers.length > 0 && !validatedMembers.some(({ pid }) => pid === processGroupId) && ownership.sweepTokenOwnedProcesses !== true) return {
					cleaned: false,
					reason: "descendant process-group leader identity could not be revalidated"
				};
				if (validatedMembers.length > 0 || members.length === 0) return {
					empty: validatedMembers.length === 0,
					escapedProcessGroupIds: [...escapedProcessGroupIds]
				};
				if (refresh >= OWNED_GROUP_REVALIDATION_LIMIT) return {
					cleaned: false,
					reason: `owned process group ${String(processGroupId)} members exited during revalidation after ${String(OWNED_GROUP_REVALIDATION_LIMIT)} table refreshes. This release has no runtime override.`
				};
			}
		};
		cleanupValidationFailure = (failures, unverified = []) => {
			const unverifiedEntry = unverified.length === 0 ? {} : { unverified };
			const unreadable = failures.filter(({ reason }) => reason === "environment-unreadable");
			if (failures.some(({ reason }) => reason === "run-token-mismatch")) return {
				cleaned: false,
				reason: `process ownership token mismatch for PID(s): ${[...new Set(failures.filter(({ reason }) => reason === "run-token-mismatch").map(({ pid }) => pid))].sort((left, right) => left - right).join(", ")}`,
				failures,
				...unverifiedEntry
			};
			if (failures.some(({ reason }) => reason === "process-identity-unavailable")) return {
				cleaned: false,
				reason: "process identity could not be revalidated",
				failures,
				...unverifiedEntry
			};
			if (unreadable.length > 0) {
				const counts = new Map();
				for (const { diagnostic } of unreadable) {
					const category = sanitizedTokenReadFailure(diagnostic);
					counts.set(category, (counts.get(category) ?? 0) + 1);
				}
				const breakdown = [...counts].sort(([left], [right]) => compareUnicodeCodePoints(left, right)).map(([category, count]) => `${category}=${String(count)}`).join(", ");
				const candidates = unreadable.map(({ pid, diagnostic, identityAfter }) => `${String(pid)}=${sanitizedTokenReadFailure(diagnostic)}${unreadableCandidateFacts(identityAfter)}`).sort((left, right) => compareUnicodeCodePoints(left, right));
				return {
					cleaned: false,
					reason: `process ownership token could not be read for ${String(unreadable.length)} live process(es): ${breakdown}; live candidates ${candidates.join(", ")}`,
					failures,
					...unverifiedEntry
				};
			}
			return {
				cleaned: false,
				reason: "process ownership could not be revalidated",
				failures,
				...unverifiedEntry
			};
		};
		unreadableTokenFailure = (fact, diagnostic) => ({
			pid: fact.process.pid,
			reason: "environment-unreadable",
			diagnostic,
			...fact.identityAfter.state === "readable" ? { identityAfter: fact.identityAfter } : {}
		});
		unreadableCandidateFacts = (identity) => {
			if (identity === undefined) return "";
			const facts = [
				...identity.name === undefined ? [] : [`name ${JSON.stringify(identity.name)}`],
				...identity.relation?.state === "observed" ? [`ppid ${String(identity.relation.parentPid)}`, `pgid ${String(identity.relation.processGroupId)}`] : [],
				`identity ${identity.identity}`
			];
			return ` (${facts.join(", ")})`;
		};
		sanitizedTokenReadFailure = (diagnostic) => {
			if (diagnostic === "environment_unavailable") return diagnostic;
			if (diagnostic === "platform_binary_environment_withheld") return diagnostic;
			if (diagnostic === "restricted_process_environment_withheld") return diagnostic;
			const environmentErrno = /^(EACCES|EPERM|ENOENT|ESRCH):/u.exec(diagnostic ?? "");
			if (environmentErrno?.[1] !== undefined) return `environment_errno_${environmentErrno[1]}`;
			if (diagnostic === "apple_vector_unavailable") return diagnostic;
			if (diagnostic === "ambiguous_environment_boundary") return diagnostic;
			if (diagnostic === "malformed_procargs") return diagnostic;
			if (diagnostic === "malformed_procargs_header" || diagnostic === "malformed_procargs_argument_count" || diagnostic === "malformed_procargs_executable_path" || diagnostic === "malformed_procargs_pointer_size" || diagnostic === "malformed_procargs_path_padding" || diagnostic === "malformed_procargs_arguments" || diagnostic === "malformed_procargs_terminator" || diagnostic === "malformed_procargs_trailing_entries") return diagnostic;
			if (diagnostic === "process_identity_changed_during_token_read") return diagnostic;
			if (diagnostic === "process_not_in_snapshot") return diagnostic;
			const processTableFailure = /^process_table_failed_(\d+)$/u.exec(diagnostic ?? "");
			if (processTableFailure?.[1] !== undefined) return `process_table_errno_${processTableFailure[1]}`;
			const sysctlFailure = /^sysctl_failed_(\d+)$/u.exec(diagnostic ?? "");
			if (sysctlFailure?.[1] !== undefined) return `sysctl_errno_${sysctlFailure[1]}`;
			if (diagnostic === "reader_failure") return diagnostic;
			if (diagnostic === "duplicate_run_token") return diagnostic;
			if (diagnostic === "invalid_run_token_encoding") return diagnostic;
			return "other_unavailable";
		};
		processOwnershipFailures = async (members, ownership, host, expectedIdentities, exitSettlement) => {
			const runId = ownership.runId;
			if (host.processIdentities !== undefined) {
				const facts = await settleVanishedTokenFacts(await reobserveUnavailableTokenFacts(await readProcessOwnershipFacts(members, host, undefined, { exitSettlement }), host, exitSettlement, {
					generation: "first-observed",
					runId
				}), host, exitSettlement);
				const failures = [];
				const validatedMembers = [];
				for (const fact of facts) {
					if (processIdentityHasExited(fact.identityAfter)) continue;
					if (processIdentityIsExiting(fact.identityAfter)) {
						failures.push({
							pid: fact.process.pid,
							reason: "process-identity-unavailable",
							diagnostic: "native process exit could not be confirmed before signal"
						});
						continue;
					}
					const relation = fact.identityAfter.state === "readable" && fact.identityAfter.relation?.state === "observed" ? fact.identityAfter.relation : undefined;
					if (relation !== undefined && relation.processGroupId !== fact.process.processGroupId) {
						ownership.evidenceOwner?.reconcile([fact], {
							runId,
							listedRows: 1,
							listedPids: new Set([fact.process.pid]),
							leaderPid: ownership.leaderPid,
							processGroupIds: new Set([fact.process.processGroupId]),
							scopeFacts: [fact]
						});
						failures.push({
							pid: fact.process.pid,
							reason: "process-identity-unavailable",
							diagnostic: "process group changed during ownership validation"
						});
						continue;
					}
					if (fact.state !== "same-generation") {
						failures.push({
							pid: fact.process.pid,
							reason: "process-identity-unavailable",
							diagnostic: "process identity changed or became unavailable before signal"
						});
						continue;
					}
					const expected = expectedIdentities.get(fact.process.pid);
					if (expected !== undefined && expected !== null && fact.identityAfter.state === "readable" && fact.identityAfter.identity !== expected || expected === null || relation === undefined) {
						failures.push({
							pid: fact.process.pid,
							reason: "process-identity-unavailable",
							diagnostic: "process identity or group membership could not be revalidated before signal"
						});
						continue;
					}
					if (fact.token.state === "unavailable") {
						failures.push(unreadableTokenFailure(fact, fact.token.reason));
					} else if (fact.token.runId !== runId) {
						failures.push({
							pid: fact.process.pid,
							reason: "run-token-mismatch"
						});
					} else {
						validatedMembers.push(fact.process);
					}
				}
				return {
					failures,
					validatedMembers
				};
			}
			return {
				failures: await processRunTokenFailures(members, runId, host),
				validatedMembers: members
			};
		};
		processRunTokenFailures = async (members, runId, host) => {
			const failures = [];
			for await (const { process: member, observation } of readProcessRunTokens(host, members)) {
				if (observation.state === "readable") {
					if (observation.runId !== runId) failures.push({
						pid: member.pid,
						reason: "run-token-mismatch"
					});
					continue;
				}
				failures.push({
					pid: member.pid,
					reason: "environment-unreadable",
					diagnostic: observation.reason
				});
			}
			return recheckOwnershipFailures(failures, host);
		};
		recheckOwnershipFailures = async (failures, host) => {
			if (!failures.some(({ reason }) => reason !== "run-token-mismatch")) return failures;
			try {
				let processes = await host.listProcesses();
				const isDarwin = (host.platform ?? HOST_PLATFORM.platform) === "darwin";
				for (let attempt = 0; isDarwin && attempt < 3 && processes.some(({ pid, state }) => failures.some((failure) => failure.pid === pid && failure.reason !== "run-token-mismatch") && state.slice(1).includes("E")); attempt += 1) {
					await setTimeout$1(40);
					processes = await host.listProcesses();
				}
				const live = new Set(liveProcesses(processes).map(({ pid }) => pid));
				return failures.filter(({ pid, reason }) => reason === "run-token-mismatch" || live.has(pid));
			} catch (cause) {
				rethrowProcessInspectionFailure(cause);
				return failures.map((failure) => failure.reason === "run-token-mismatch" ? failure : {
					...failure,
					diagnostic: `${failure.diagnostic}; process liveness recheck failed: ${errorMessage(cause)}`
				});
			}
		};
		PLATFORM_BINARY_ENVIRONMENT_WITHHELD = "platform_binary_environment_withheld";
		RESTRICTED_PROCESS_ENVIRONMENT_WITHHELD = "restricted_process_environment_withheld";
		currentProcessUid = () => typeof process.getuid === "function" ? process.getuid() : undefined;
		environmentWithheldFromInspection = (diagnostic, observedUid, restriction) => {
			if (restriction === "user-namespace") return /^(?:environment_errno_)?(?:EACCES|EPERM)(?::|\b)/u.test(diagnostic);
			if (restriction !== undefined) return true;
			const uid = currentProcessUid();
			if (uid !== undefined && observedUid !== undefined && observedUid !== uid) return true;
			return diagnostic === PLATFORM_BINARY_ENVIRONMENT_WITHHELD || diagnostic === RESTRICTED_PROCESS_ENVIRONMENT_WITHHELD;
		};
		scanTokenOwnedProcesses = async (processes, runId, host, captureBaseline, relation, exitSettlement) => {
			if (host.processIdentities !== undefined) return scanWithOwnershipEvidence(processes, runId, host, captureBaseline, relation, exitSettlement);
			const candidates = processes;
			const failures = [];
			const owned = [];
			const ownedIdentities = new Map();
			const recordOwned = (process) => {
				owned.push(process);
				ownedIdentities.set(process.pid, null);
			};
			const unreadable = [];
			for await (const { process, observation } of readProcessRunTokens(host, candidates)) {
				if (observation.state === "readable") {
					if (observation.runId === runId) recordOwned(process);
				} else unreadable.push({
					process,
					diagnostic: observation.reason
				});
			}
			const remaining = await settleUnreadableTokenCandidates(unreadable, runId, host, recordOwned);
			const relatedPids = new Set();
			const relatedGroupIds = new Set();
			if (relation !== undefined) {
				relatedPids.add(relation.leaderPid);
				for (const descendant of descendantsOf([relation.leaderPid], processes)) relatedPids.add(descendant.pid);
				relatedGroupIds.add(relation.processGroupId);
				for (const processGroupId of relation.sampledProcessGroupIds ?? []) if (Number.isSafeInteger(processGroupId) && processGroupId > 0) relatedGroupIds.add(processGroupId);
				for (const process of owned) relatedGroupIds.add(process.processGroupId);
			}
			const unverified = [];
			const strict = [];
			const withheld = [];
			for (const candidate of remaining) {
				const isRelated = relation === undefined || relatedPids.has(candidate.process.pid) || relatedGroupIds.has(candidate.process.processGroupId);
				if (!isRelated && environmentWithheldFromInspection(candidate.diagnostic, candidate.process.uid)) {
					withheld.push(candidate);
					continue;
				}
				strict.push(candidate);
			}
			let finalLive;
			try {
				finalLive = new Set(liveProcesses(await host.listProcesses()).map(({ pid }) => pid));
			} catch (cause) {
				rethrowProcessInspectionFailure(cause);
				finalLive = undefined;
			}
			for (const candidate of strict) {
				if (finalLive !== undefined && !finalLive.has(candidate.process.pid)) continue;
				failures.push({
					pid: candidate.process.pid,
					reason: "environment-unreadable",
					diagnostic: candidate.diagnostic
				});
			}
			for (const candidate of withheld) {
				if (finalLive !== undefined && !finalLive.has(candidate.process.pid)) continue;
				unverified.push({
					pid: candidate.process.pid,
					diagnostic: candidate.diagnostic
				});
			}
			return {
				owned,
				failures,
				unverified,
				identities: ownedIdentities
			};
		};
		scanWithOwnershipEvidence = async (listedProcesses, runId, host, captureBaseline, relation, exitSettlement) => {
			const evidenceOwner = relation === undefined ? new ProcessOwnershipEvidenceOwner() : relation.evidenceOwner;
			if (evidenceOwner === undefined) return {
				owned: [],
				failures: [{
					pid: relation?.leaderPid ?? -1,
					reason: "process-identity-unavailable",
					diagnostic: "persistent process ownership evidence owner is required for scoped token scan"
				}],
				unverified: [],
				identities: new Map()
			};
			const observationRows = evidenceOwner.rowsForObservation(listedProcesses);
			const listedPids = new Set(listedProcesses.map(({ pid }) => pid));
			const baseline = new Map((captureBaseline ?? []).map(({ pid, identity }) => [pid, identity]));
			const retainedPids = new Set(evidenceOwner.candidates.map(({ pid }) => pid));
			const firstIdentities = await readNativeProcessIdentityMap(observationRows, host);
			const candidates = observationRows.filter((process) => {
				if (retainedPids.has(process.pid)) return true;
				if (!baseline.has(process.pid)) return true;
				const before = baseline.get(process.pid);
				const now = firstIdentities.get(process.pid);
				if (before === null || now?.state !== "readable") {
					return true;
				}
				return now.identity !== before;
			});
			const initialFacts = await readProcessOwnershipFacts(candidates, host, undefined, {
				identityBefore: firstIdentities,
				exitSettlement
			});
			const facts = await settleVanishedTokenFacts(await reobserveUnavailableTokenFacts(initialFacts, host, exitSettlement, { generation: "current" }), host, exitSettlement);
			const processGroupIds = new Set([...relation === undefined ? [] : [relation.processGroupId], ...relation?.sampledProcessGroupIds ?? []]);
			const retained = evidenceOwner.reconcile(facts, {
				runId,
				listedRows: listedProcesses.length,
				listedPids,
				leaderPid: relation?.leaderPid ?? -1,
				processGroupIds,
				scopeFacts: initialFacts
			});
			const factsByPid = new Map(facts.map((fact) => [fact.process.pid, fact]));
			const retainedByPid = new Map(retained.map((candidate) => [candidate.pid, candidate]));
			const failures = [];
			const unverified = [];
			const owned = [];
			const identities = new Map();
			for (const fact of facts) {
				if (processIdentityHasExited(fact.identityAfter)) continue;
				if (fact.state === "replaced") failures.push({
					pid: fact.process.pid,
					reason: "process-identity-unavailable",
					diagnostic: "process identity changed during token validation"
				});
				else if (fact.state === "unavailable") failures.push({
					pid: fact.process.pid,
					reason: "process-identity-unavailable",
					diagnostic: "process identity was unavailable during token validation"
				});
				const retainedCandidate = retainedByPid.get(fact.process.pid);
				if (fact.state === "same-generation" && fact.token.state === "readable" && fact.token.runId !== runId && retainedCandidate !== undefined) failures.push({
					pid: fact.process.pid,
					reason: retainedCandidate.applicability === "identity-unresolved" ? "process-identity-unavailable" : "run-token-mismatch"
				});
				if (fact.token.state !== "unavailable") continue;
				const relationBefore = fact.identityBefore.state === "readable" ? fact.identityBefore.relation : undefined;
				const relationAfter = fact.identityAfter.state === "readable" ? fact.identityAfter.relation : undefined;
				const knownUnrelated = relation !== undefined && retainedCandidate === undefined && fact.state === "same-generation" && relationBefore?.state === "observed" && relationAfter?.state === "observed" && relationBefore.parentPid === relationAfter.parentPid && relationBefore.processGroupId === relationAfter.processGroupId;
				const observed = fact.state === "same-generation" && fact.identityAfter.state === "readable" ? fact.identityAfter : undefined;
				if (knownUnrelated && (observed?.kernelThread === true || environmentWithheldFromInspection(fact.token.reason, observed?.effectiveUid, observed?.environmentRestriction))) {
					unverified.push({
						pid: fact.process.pid,
						diagnostic: fact.token.reason
					});
					continue;
				}
				if (fact.state === "same-generation" || retainedCandidate?.applicability === "related-ownership-unresolved" && fact.identityAfter.state === "readable" && fact.identityAfter.identity === retainedCandidate.identity) failures.push(unreadableTokenFailure(fact, fact.token.reason));
			}
			for (const candidate of retained) {
				const fact = factsByPid.get(candidate.pid);
				if (fact?.state !== "same-generation") {
					if (fact?.identityAfter.state !== "absent" && !failures.some(({ pid }) => pid === candidate.pid)) mergeProcessOwnershipFailure(failures, {
						pid: candidate.pid,
						reason: "process-identity-unavailable",
						diagnostic: "retained candidate identity is not currently verified"
					});
					continue;
				}
				const identity = fact.identityAfter;
				if (identity.state !== "readable" || candidate.identity === undefined || identity.identity !== candidate.identity) continue;
				if (candidate.applicability !== "token-verified" || fact.token.state !== "readable" || fact.token.runId !== runId) continue;
				if (identity.relation?.state !== "observed") {
					failures.push({
						pid: candidate.pid,
						reason: "process-identity-unavailable",
						diagnostic: "native process membership was unavailable"
					});
					continue;
				}
				owned.push({
					...fact.process,
					parentPid: identity.relation.parentPid,
					processGroupId: identity.relation.processGroupId
				});
				identities.set(candidate.pid, candidate.identity);
			}
			const mergedFailures = [];
			for (const failure of failures) mergeProcessOwnershipFailure(mergedFailures, failure);
			return {
				owned,
				failures: mergedFailures,
				unverified,
				identities
			};
		};
		settleUnreadableTokenCandidates = async (pending, runId, host, recordOwned) => {
			let remaining = pending;
			for (let attempt = 0; attempt < 3 && remaining.length > 0; attempt += 1) {
				await setTimeout$1(40);
				let live;
				try {
					live = new Set(liveProcesses(await host.listProcesses()).map(({ pid }) => pid));
				} catch (cause) {
					rethrowProcessInspectionFailure(cause);
					live = undefined;
				}
				const stillUnreadable = [];
				const candidates = remaining.map(({ process }) => process).filter(({ pid }) => live === undefined || live.has(pid));
				for await (const { process, observation } of readProcessRunTokens(host, candidates)) {
					if (observation.state === "readable") {
						if (observation.runId === runId) recordOwned(process);
						continue;
					}
					stillUnreadable.push({
						process,
						diagnostic: observation.reason
					});
				}
				remaining = stillUnreadable;
			}
			return remaining;
		};
	})))();
}

//#endregion
//#region dist/process/AbortablePromise.js
var AbortedWait, waitForAbortable;
function init_AbortablePromise() {
	return (init_AbortablePromise = __esmMin((() => {
		AbortedWait = class {
			carried;
			constructor(carried) {
				this.carried = carried;
			}
		};
		waitForAbortable = async (pending, signal) => {
			if (signal === undefined) return pending;
			let onAbort;
			const cancelled = new Promise((resolve) => {
				if (signal.aborted) {
					resolve(new AbortedWait(signal.reason));
					return;
				}
				onAbort = () => resolve(new AbortedWait(signal.reason));
				signal.addEventListener("abort", onAbort, { once: true });
			});
			try {
				return await Promise.race([cancelled, pending]);
			} finally {
				if (onAbort !== undefined) signal.removeEventListener("abort", onAbort);
			}
		};
	})))();
}

//#endregion
//#region dist/process/OwnedCommand.js
/** Both preparation stages preserve physical failures, opaque cancellation and exact owners. */
function throwCommandPreparationFailure(cause, interruption) {
	const cancellation = ProcessOwnershipInspectionCancelled.from(cause);
	const preparationFailure = cause instanceof DarwinProcessOwnershipInspectionError || cause instanceof RegularFileCleanupFailure || cause instanceof ProcessOwnershipIdentityBatchFailure ? cause : cancellation;
	if (preparationFailure instanceof RegularFileCleanupFailure || preparationFailure instanceof ProcessOwnershipIdentityBatchFailure && preparationFailure.origin === "physical" || preparationFailure instanceof DarwinProcessOwnershipInspectionError && preparationFailure.cancellation === undefined) throw preparationFailure;
	const preparationCancellation = preparationFailure instanceof DarwinProcessOwnershipInspectionError ? preparationFailure.cancellation : undefined;
	if (cancellation !== undefined || preparationCancellation !== undefined) throw new OwnedCommandFailure(interruption ?? "cancelled", interruption !== "timeout" ? "Command cancelled during ownership preparation." : "Command deadline elapsed during ownership preparation.", null, null, {
		cause,
		...interruption === "timeout" ? {} : { cancellation: { reason: cancellation === undefined ? preparationCancellation?.reason : cancellation.reason } },
		...preparationFailure === undefined ? {} : { preparationFailure }
	});
	throw cause;
}
var OwnedCommandFailure, ownedCommandResources, prepareOwnedCommand, preparationHostCapacityFailure, runOwnedCommand, collectOwnedCommand, finishCommandInput, OwnedCommandStdoutBytes, stdoutLimit, consumeStdout;
function init_OwnedCommand() {
	return (init_OwnedCommand = __esmMin((() => {
		init_analysisErrorCore();
		init_OwnedRegularFile();
		init_ProcessInspectionCancellation();
		init_ProcessOwnershipObservation();
		init_DarwinProcessRunTokenReader();
		init_ProviderProcess();
		init_ProcessOwnership();
		init_AbortablePromise();
		init_ProviderDeadline();
		init_errorMessage();
		init_launchFailure();
		OwnedCommandFailure = class extends Error {
			reason;
			snapshot;
			cleanupFailure;
			resources;
			cleanupOwner;
			#cancellation;
			/** Opaque caller reason observed by the owner, distinct from physical causes. */
			get cancellation() {
				return this.#cancellation;
			}
			processError;
			cleanupResult;
			collectionFailure;
			#preparationFailure;
			get preparationFailure() {
				return this.#preparationFailure;
			}
			/** Failure-time inspection facts remain available after cleanup releases their owners. */
			#inspectionCleanup;
			get inspectionCleanup() {
				return this.#inspectionCleanup;
			}
			constructor(reason, message, snapshot = null, cleanupFailure = null, options, resources = [], cleanupOwner) {
				super(message, options);
				this.reason = reason;
				this.snapshot = snapshot;
				this.cleanupFailure = cleanupFailure;
				this.resources = resources;
				this.cleanupOwner = cleanupOwner;
				this.#cancellation = options?.cancellation === undefined ? undefined : { reason: options.cancellation.reason };
				this.processError = options?.processError;
				this.cleanupResult = options?.cleanupResult;
				this.collectionFailure = options?.collectionFailure ?? false;
				this.#preparationFailure = options?.preparationFailure;
				this.#inspectionCleanup = options?.inspectionCleanup;
			}
		};
		ownedCommandResources = (ownership, directory) => [
			ownership.runId,
			...directory === undefined ? [] : [directory],
			`pid:${ownership.leaderPid}`,
			`process-group:${ownership.processGroupId}`
		];
		prepareOwnedCommand = async (signal) => {
			if (systemProcessOwnershipHost.platform !== "darwin") return;
			try {
				assertProcessOwnershipInspectionActive(signal);
				await prepareProcessOwnershipInspection(signal);
			} catch (cause) {
				throwCommandPreparationFailure(cause, signal?.aborted === true ? "cancelled" : undefined);
			}
		};
		preparationHostCapacityFailure = (cause) => {
			if (cause instanceof OwnedCommandFailure && cause.cancellation !== undefined) return undefined;
			const preparation = cause instanceof OwnedCommandFailure ? cause.preparationFailure : cause;
			if (!(preparation instanceof DarwinProcessOwnershipInspectionError) || preparation.cancellation !== undefined) return undefined;
			const launch = launcherFailureOf(preparation.cause);
			return launch?.kind === "host-exhausted" ? launch : undefined;
		};
		runOwnedCommand = async (spawn, limits, options = {}) => {
			const callerSignal = options.signal ?? spawn.signal;
			if (callerSignal?.aborted) throw new OwnedCommandFailure("cancelled", "Command cancelled before launch.", null, null, { cancellation: { reason: callerSignal.reason } });
			const deadline = limits.timeoutMs === null ? undefined : new ProviderStartupDeadline(limits.timeoutMs, callerSignal);
			const control = deadline ?? {
				signal: callerSignal ?? new AbortController().signal,
				get interruption() {
					return callerSignal?.aborted === true ? "cancelled" : undefined;
				}
			};
			try {
				return await collectOwnedCommand(spawn, limits, options.launcher ?? spawnOwnedProviderProcess, control, callerSignal, options.retainCleanup);
			} finally {
				deadline?.dispose();
			}
		};
		collectOwnedCommand = async (spawn, limits, launcher, deadline, callerSignal, retainCleanup) => {
			const signal = deadline.signal;
			let launched;
			try {
				launched = await launcher({
					...spawn,
					...limits.stdin === undefined ? {} : { stdin: "pipe" },
					signal
				});
			} catch (cause) {
				throwCommandPreparationFailure(cause, deadline.interruption);
			}
			let exceeded = false;
			let outputLimitObservedBeforeInterruption = false;
			let processFailure;
			let processError;
			let processFailureCause;
			let processFailureBeforeInterruption;
			const supervisor = new ProviderProcessSupervisor({
				...launched,
				ownsProcessLifetime: true,
				cleanup: launched.cleanup ?? (() => cleanupOwnedProcessGroup(launched.ownership))
			}, {
				captureStdout: limits.stdout === undefined,
				maxDiagnosticBytes: limits.diagnosticBytes,
				...limits.runtime === undefined ? {} : { runtime: limits.runtime },
				onDiagnostic: (event) => {
					if (event.type === "output" && event.truncated === true) {
						exceeded = true;
						if (deadline.interruption === undefined) outputLimitObservedBeforeInterruption = true;
					}
					if (event.type === "error") {
						processFailure ??= event.message;
						processError ??= event.cause;
						if (deadline.interruption === undefined) processFailureBeforeInterruption ??= {
							message: processFailure,
							processError,
							collectionFailure: true
						};
					}
					if (event.type === "exit" && deadline.interruption === undefined) {
						const acceptedNonzeroExit = limits.acceptNonZeroExit === true && event.code !== null && event.code !== 0 && event.signal === null;
						if (event.signal !== null || event.code !== null && event.code !== 0 && !acceptedNonzeroExit) processFailureBeforeInterruption ??= {
							message: "Command failed; inspect its exit status and diagnostics.",
							processError: undefined,
							collectionFailure: false
						};
					}
				}
			});
			const abandoned = new AbortController();
			const collectionSignal = AbortSignal.any([signal, abandoned.signal]);
			const consumed = consumeStdout(launched.process.stdout, limits.stdout, collectionSignal, limits.maxStdoutBytes === undefined ? undefined : {
				maxBytes: limits.maxStdoutBytes,
				exceeded: () => {
					exceeded = true;
					if (deadline.interruption === undefined) outputLimitObservedBeforeInterruption = true;
				}
			});
			void consumed.then((failed) => {
				processFailure ??= failed;
				if (failed !== undefined && deadline.interruption === undefined) processFailureBeforeInterruption ??= {
					message: processFailure ?? failed,
					processError,
					collectionFailure: true
				};
			});
			let inputFailure;
			const inputCompleted = limits.stdin === "closed-pipe" ? finishCommandInput(launched.process.stdin, (cause) => {
				inputFailure ??= {
					cause,
					message: `stdin stream failed: ${errorMessage(cause)}`,
					processError: cause instanceof Error ? cause : undefined
				};
				if (processFailure === undefined) {
					processFailure = inputFailure.message;
					processError = inputFailure.processError;
					processFailureCause = { cause: inputFailure.cause };
				}
				if (deadline.interruption === undefined) processFailureBeforeInterruption ??= {
					message: processFailure,
					...processFailureCause,
					processError,
					collectionFailure: true
				};
				abandoned.abort(OwnerCancellation.noLongerNeeded);
			}) : Promise.resolve();
			let failure;
			const interruptionOrObservedFailure = (interruption, snapshot = null) => {
				if (interruption === undefined) return;
				if (outputLimitObservedBeforeInterruption) return new OwnedCommandFailure("output-limit", "Command diagnostic output exceeded its complete-output budget.", snapshot);
				if (processFailureBeforeInterruption !== undefined) return new OwnedCommandFailure("process", processFailureBeforeInterruption.message, snapshot, null, {
					..."cause" in processFailureBeforeInterruption ? { cause: processFailureBeforeInterruption.cause } : {},
					processError: processFailureBeforeInterruption.processError,
					collectionFailure: processFailureBeforeInterruption.collectionFailure
				});
				return new OwnedCommandFailure(interruption, interruption === "cancelled" ? "Command cancelled." : "Command deadline elapsed.", snapshot, null, interruption === "cancelled" ? { cancellation: { reason: signal.reason } } : undefined);
			};
			try {
				while (!await supervisor.waitForOutputClose(10)) {
					const interrupted = interruptionOrObservedFailure(deadline.interruption);
					if (interrupted !== undefined) throw interrupted;
					if (exceeded) throw new OwnedCommandFailure("output-limit", "Command diagnostic output exceeded its complete-output budget.");
					if (processFailure !== undefined) throw new OwnedCommandFailure("process", processFailure, null, null, {
						...processFailureCause,
						processError,
						collectionFailure: true
					});
					await waitForAbortableDelay(25, signal);
				}
				const sinkFailure = await waitForAbortable(consumed, collectionSignal);
				if (!(sinkFailure instanceof AbortedWait)) processFailure ??= sinkFailure;
				await waitForAbortable(inputCompleted, collectionSignal);
				const snapshot = supervisor.snapshot();
				const interrupted = interruptionOrObservedFailure(deadline.interruption, snapshot);
				if (interrupted !== undefined) throw interrupted;
				if (exceeded) throw new OwnedCommandFailure("output-limit", "Command diagnostic output exceeded its complete-output budget.", snapshot);
				const acceptedNonzeroExit = limits.acceptNonZeroExit === true && snapshot.exitCode !== null && snapshot.exitCode !== undefined && snapshot.exitCode !== 0 && snapshot.signal === null;
				if (processFailure !== undefined || (snapshot.exitCode !== 0 || snapshot.signal !== null) && !acceptedNonzeroExit) throw new OwnedCommandFailure("process", processFailure ?? "Command failed; inspect its exit status and diagnostics.", snapshot, null, {
					...processFailureCause,
					processError,
					collectionFailure: processFailure !== undefined
				});
				limits.observeCompleted?.(snapshot);
			} catch (cause) {
				failure = cause instanceof OwnedCommandFailure ? cause : new OwnedCommandFailure("process", "Command collection failed.", null, null, { cause });
			}
			abandoned.abort(OwnerCancellation.noLongerNeeded);
			const stopped = await supervisor.stop(limits.termination === undefined ? {} : { termination: limits.termination });
			const snapshot = supervisor.snapshot();
			if (failure === undefined && inputFailure !== undefined) failure = interruptionOrObservedFailure(deadline.interruption, snapshot) ?? new OwnedCommandFailure("process", inputFailure.message, snapshot, null, {
				cause: inputFailure.cause,
				processError: inputFailure.processError,
				collectionFailure: true
			});
			const cancellation = failure?.cancellation ?? (callerSignal?.aborted ? { reason: callerSignal.reason } : undefined);
			if (stopped.status === "incomplete" && retainCleanup !== undefined) retainCleanup(supervisor, stopped);
			else if (stopped.status === "incomplete") {
				const interruption = failure !== undefined ? undefined : callerSignal?.aborted ? "cancelled" : deadline.interruption === "timeout" ? "timeout" : undefined;
				throw new OwnedCommandFailure(failure?.reason ?? interruption ?? "process", failure?.message ?? (interruption === "cancelled" ? "Command cancelled during final cleanup." : interruption === "timeout" ? "Command deadline elapsed during final cleanup." : "Command cleanup failed."), snapshot, stopped.reason, {
					cancellation,
					...failure === undefined ? {} : {
						cause: failure,
						processError: failure.processError
					},
					...stopped.cleanupResult === undefined ? {} : { cleanupResult: stopped.cleanupResult },
					...stopped.inspectionCleanup === undefined ? {} : { inspectionCleanup: stopped.inspectionCleanup },
					...failure?.collectionFailure === true ? { collectionFailure: true } : {}
				}, ownedCommandResources(launched.ownership, spawn.cwd), supervisor);
			}
			if (failure !== undefined) throw new OwnedCommandFailure(failure.reason, failure.message, snapshot, failure.cleanupFailure, {
				cause: failure,
				cancellation,
				processError: failure.processError,
				...failure.cleanupResult === undefined ? {} : { cleanupResult: failure.cleanupResult },
				...failure.inspectionCleanup === undefined ? {} : { inspectionCleanup: failure.inspectionCleanup },
				...failure.collectionFailure ? { collectionFailure: true } : {}
			}, failure.resources);
			if (callerSignal?.aborted) throw new OwnedCommandFailure("cancelled", "Command cancelled.", snapshot, null, { cancellation: { reason: callerSignal.reason } });
			if (deadline.interruption === "timeout") throw new OwnedCommandFailure("timeout", "Command deadline elapsed during final cleanup.", snapshot);
			return snapshot;
		};
		finishCommandInput = (input, failed) => {
			if (input === null || input === undefined) {
				failed(new Error("stdin stream is unavailable"));
				return Promise.resolve();
			}
			return new Promise((resolve) => {
				const failure = (cause) => {
					failed(cause);
					resolve();
				};
				input.on("error", failure);
				finished(input, { readable: false }, (cause) => {
					if (cause !== undefined && cause !== null) failure(cause);
					else if (!input.writableFinished) failure(new Error("closed before writable finalization completed"));
					else resolve();
				});
				try {
					input.end();
				} catch (cause) {
					failure(cause);
				}
			});
		};
		OwnedCommandStdoutBytes = class extends Writable {
			#chunks = [];
			#length = 0;
			/** The bytes received so far. */
			get bytes() {
				return Buffer.concat(this.#chunks, this.#length);
			}
			_write(chunk, _encoding, callback) {
				this.#chunks.push(chunk);
				this.#length += chunk.byteLength;
				callback();
			}
		};
		stdoutLimit = (limit) => {
			let passed = 0;
			let reported = false;
			return new Transform({ transform(chunk, _encoding, callback) {
				const remaining = limit.maxBytes - passed;
				if (chunk.byteLength <= remaining) {
					passed += chunk.byteLength;
					callback(null, chunk);
					return;
				}
				if (remaining > 0) this.push(chunk.subarray(0, remaining));
				passed = limit.maxBytes;
				if (!reported) {
					reported = true;
					limit.exceeded();
				}
				callback();
			} });
		};
		consumeStdout = (stdout, sink, signal, limit) => {
			if (sink === undefined) return Promise.resolve(undefined);
			if (stdout === null) {
				sink.destroy();
				return Promise.resolve("stdout stream is unavailable");
			}
			return (limit === undefined ? pipeline$1(stdout, sink, { signal }) : pipeline$1(stdout, stdoutLimit(limit), sink, { signal })).then(() => undefined, (cause) => `stdout stream failed: ${errorMessage(cause)}`);
		};
	})))();
}

//#endregion
//#region dist/providers/OwnedCommandCleanup.js
var retainOwnedCommandCleanup, ProcessInspectionAnalysisCancelledError, processInspectionFailure, processInspectionCancellationError, retainArtifactCommandCleanup, retainProcessInspectionCleanup, bindProcessInspectionCancellations;
function init_OwnedCommandCleanup() {
	return (init_OwnedCommandCleanup = __esmMin((() => {
		init_OwnedRegularFile();
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_ProcessInspectionCancellation();
		init_ProcessInspectionCleanup();
		init_resources();
		init_analysisErrorCleanup();
		init_jsonValue();
		init_providerCleanupError();
		init_DarwinProcessRunTokenReader();
		init_OwnedCommand();
		init_errorMessage();
		retainOwnedCommandCleanup = (cause, resourceOwner, providerId, operation, completed) => {
			const commandFailure = cause instanceof OwnedCommandFailure ? cause : undefined;
			const cleanups = [];
			for (const preparation of processInspectionCleanupFailures(processInspectionFailure(cause))) {
				const darwin = preparation instanceof DarwinProcessOwnershipInspectionError;
				const owner = darwin ? preparation.cleanupOwner : preparation.owner;
				const cleanup = darwin ? preparation.cleanupFailure ?? new ProviderCleanupError(providerId, ["process ownership inspection"], { reason: preparation.message }, {
					cause: preparation,
					operation
				}) : new ProviderCleanupError(providerId, [preparation.path], { reason: errorMessage(preparation.cleanupCause) }, {
					cause: preparation,
					operation
				});
				cleanups.push(cleanup);
				if (owner === undefined) continue;
				const lease = new AnalysisCleanupLease(() => owner.close(), cleanup);
				lease.bindCleanupError(cleanup);
				resourceOwner.retain({
					close: () => lease.release(),
					get cleanupResources() {
						return lease.released ? [] : cleanup.cleanupResources;
					}
				}, cleanup.cleanupResources[0] ?? "process ownership inspection");
			}
			if (commandFailure !== undefined && (commandFailure.cleanupOwner !== undefined || commandFailure.cleanupFailure !== null)) {
				const supervisor = commandFailure.cleanupOwner;
				const failureForStop = (reason, result) => new ProviderCleanupError(providerId, commandFailure.resources, {
					reason,
					...result === undefined ? {} : { process_cleanup: jsonValueSchema.parse(result) }
				}, {
					cause,
					operation,
					...completed === undefined ? {} : { capturedOutput: completed.capturedOutput }
				});
				const cleanup = failureForStop(commandFailure.cleanupFailure ?? "Provider prerequisite cleanup remains incomplete", commandFailure.cleanupResult);
				cleanups.push(cleanup);
				if (supervisor === undefined) return cleanups;
				const lease = new AnalysisCleanupLease(async () => {
					const stopped = await supervisor.stop();
					if (stopped.status === "incomplete") {
						const failure = failureForStop(stopped.reason, stopped.cleanupResult);
						failure.bindCleanupResourceOwner(lease);
						lease.bindCleanupError(failure);
						throw failure;
					}
				}, commandFailure.resources);
				cleanup.bindCleanupResourceOwner(lease);
				lease.bindCleanupError(cleanup);
				resourceOwner.retain({
					close: () => lease.release(),
					get cleanupResources() {
						return lease.released ? [] : lease.cleanupResources ?? [];
					}
				}, commandFailure.resources[0] ?? "Provider prerequisite process");
			}
			return cleanups;
		};
		ProcessInspectionAnalysisCancelledError = class extends AnalysisCancelledError {
			inspectionFailure;
			constructor(operation, inspectionFailure, reason) {
				super(operation, {
					cause: reason,
					...inspectionFailure instanceof DarwinProcessOwnershipInspectionError && inspectionFailure.capturedOutput !== undefined ? { capturedOutput: inspectionFailure.capturedOutput } : {},
					...inspectionFailure instanceof ProcessOwnershipIdentityBatchFailure ? { diagnostics: {
						retained_observation_count: inspectionFailure.observations.size,
						rejected_request_count: inspectionFailure.failures.length
					} } : {}
				});
				this.inspectionFailure = inspectionFailure;
			}
		};
		processInspectionFailure = (cause) => {
			const failure = cause instanceof OwnedCommandFailure ? cause.preparationFailure : cause;
			return failure instanceof ProcessOwnershipInspectionCancelled || failure instanceof ProcessOwnershipIdentityBatchFailure || failure instanceof DarwinProcessOwnershipInspectionError || failure instanceof RegularFileCleanupFailure ? failure : undefined;
		};
		processInspectionCancellationError = (cause, operation) => {
			if (cause instanceof OwnedCommandFailure && cause.reason === "timeout") return undefined;
			const failure = processInspectionFailure(cause);
			if (failure instanceof DarwinProcessOwnershipInspectionError) return failure.cancellation === undefined ? undefined : new ProcessInspectionAnalysisCancelledError(operation, failure, failure.cancellation.reason);
			if (failure instanceof ProcessOwnershipInspectionCancelled || failure instanceof ProcessOwnershipIdentityBatchFailure && failure.origin === "cancelled") return new ProcessInspectionAnalysisCancelledError(operation, failure, failure.reason);
			return undefined;
		};
		retainArtifactCommandCleanup = (cause, resources, operation, completed) => retainOwnedCommandCleanup(cause, {
			retain: (owner, resource) => resources.retain({
				kind: "lease",
				resource,
				lease: AnalysisCleanupLease.forCloseOwner(owner, resource)
			}),
			run: (work) => work()
		}, "process-ownership", operation, completed);
		retainProcessInspectionCleanup = (cause, primary, resources, operation) => {
			const failures = retainArtifactCommandCleanup(cause, resources, operation);
			for (const failure of failures) primary = analysisErrorWithCleanupDependencies(primary, failure, operation);
			return bindProcessInspectionCancellations(cause, primary, operation);
		};
		bindProcessInspectionCancellations = (cause, primary, operation) => {
			const preparation = processInspectionFailure(cause);
			if (preparation instanceof DarwinProcessOwnershipInspectionError && preparation.capturedOutput !== undefined) primary.retainCapturedOutput(preparation.capturedOutput);
			if (preparation === undefined) return primary;
			for (const cancellation of processInspectionCancellations(preparation)) primary = analysisErrorWithCancellation(primary, new ProcessInspectionAnalysisCancelledError(operation, preparation, cancellation.reason));
			return primary;
		};
	})))();
}

//#endregion
export { init_LinuxProcessStat as $, externalJvmExhaustionRecovery as A, execFileOutputFailure as At, init_ProcessOwnershipObservation as B, requireWindowsNativeAuthority as Bt, verifyNoTokenOwnedProcesses as C, ProcessOwnershipInspectionCancelled as Ct, JVM_EXHAUSTION_DETAILS as D, execFileBytes as Dt, spawnOwnedProviderProcess as E, ExecFileOutputCancelledError as Et, ProcessOwnershipEvidenceOwner as F, WindowsNativeSpawnControlError as Ft, prepareProcessOwnershipInspection as G, RuntimeControlUnavailableError as Gt, observeOwnedProcessLineage as H, windowsFileIdentitySchema as Ht, init_ProcessOwnershipEvidence as I, init_WindowsOwnedProcess as It, systemProcessOwnershipHost as J, analysisErrorWithCancellation as Jt, processOwnershipAdmissionRecovery as K, init_runtimeControlUnavailableError as Kt, DARWIN_PROCESS_OWNERSHIP_REMEDIATION as L, windowsNativeSpawnControlError as Lt, jvmExhaustionArea as M, describeLaunchFailure as Mt, runtimeExhaustion as N, init_launchFailure as Nt, RUNTIME_EXHAUSTION_AREAS as O, execFileFailureCapturedOutput as Ot, runtimeExhaustionReport as P, launcherFailureOf as Pt, selectCapturedProcessGroupIds as Q, LINUX_PROCESS_OWNERSHIP_REMEDIATION as R, WindowsNativeAuthorityUnavailableError as Rt, readProcessRunId as S, ProcessOwnershipIdentityBatchFailure as St, init_ProviderProcess as T, isProcessOwnershipInspectionCancellation as Tt, observeProcessStartIdentity as U, windowsHandleSchema as Ut, observeOwnedProcessGroups as V, systemWindowsNativeAuthority as Vt, observeProcessStartIdentityExit as W, windowsNativeFailureRemediation as Wt, init_ProcessRunTokenObservations as X, ProcessRunTokenReadError as Y, init_analysisErrorCancellation as Yt, init_ProcessOwnershipProcessTree as Z, waitForAbortable as _, utf8HeadExcerpt as _t, retainArtifactCommandCleanup as a, init_ProcessInspectionCleanup as at, cleanupWindowsProcessTree as b, ProcessAdmissionError as bt, OwnedCommandFailure as c, processInspectionCleanupFailures as ct, ownedCommandResources as d, init_DarwinProcessRunTokenReader as dt, parseLinuxProcessStat as et, preparationHostCapacityFailure as f, RegularFileCapacityError as ft, init_AbortablePromise as g, init_utf8HeadExcerpt as gt, AbortedWait as h, readStableFilePrefix as ht, processInspectionFailure as i, readProcessInspectionFile as it, init_RuntimeExhaustion as j, init_ExecFileOutput as jt, RUNTIME_EXHAUSTION_TOKENS as k, execFileOutput as kt, OwnedCommandStdoutBytes as l, DarwinProcessOwnershipInspectionError as lt, runOwnedCommand as m, readStableFileBytes as mt, init_OwnedCommandCleanup as n, resolveSystemPs as nt, retainOwnedCommandCleanup as o, isProcessInspectionFailure as ot, prepareOwnedCommand as p, init_readStableFileBytes as pt, signalProcessWithStartIdentity as q, runtimeControlCapabilityError as qt, processInspectionCancellationError as r, init_ProcessInspectionFile as rt, retainProcessInspectionCleanup as s, processInspectionCancellations as st, bindProcessInspectionCancellations as t, init_systemPs as tt, init_OwnedCommand as u, SWIFTC_INTERRUPT as ut, cleanupFailureFollowedSignal as v, AnalysisCleanupRelease as vt, ProviderProcessSupervisor as w, init_ProcessInspectionCancellation as wt, init_ProcessOwnership as x, init_ProcessAdmissionError as xt, cleanupOwnedProcessGroup as y, init_analysisCleanupRelease as yt, LinuxOwnedProcessPrerequisiteError as z, init_WindowsNativeLoader as zt };