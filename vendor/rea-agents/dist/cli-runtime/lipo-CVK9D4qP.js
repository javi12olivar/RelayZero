import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, init_parseFailure, malformedInput } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { ArtifactReaderFailure, init_ArtifactReader, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { DEFAULT_NATIVE_COMMAND_TIMEOUT_MS, init_nativeDeadlines } from "./urlComponents-DJm-wtqY.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { init_machoCpuIdentity, machoCpuSubtypeBase } from "./machoCpuIdentity-B0Mlm3Ly.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { init_utf8HeadExcerpt, utf8HeadExcerpt } from "./utf8HeadExcerpt-BO0eOwRw.js";
import { OwnedCommandFailure, init_OwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_OwnedCommandCleanup, processInspectionFailure } from "./OwnedCommandCleanup-CmeE0187.js";
import { init_ArtifactCommandPath, selectArtifactCommandPath } from "./ArtifactCommandPath-B5Zuhaxu.js";
import { createReadStream } from "node:fs";
import { z } from "zod";
import { createHash, randomUUID } from "node:crypto";

//#region dist/domain/native/nativeCommandOutput.js
var NATIVE_COMMAND_OUTPUT_BUDGET_BYTES;
function init_nativeCommandOutput() {
	return (init_nativeCommandOutput = __esmMin((() => {
		NATIVE_COMMAND_OUTPUT_BUDGET_BYTES = 64 * 1024 * 1024;
	})))();
}

//#endregion
//#region dist/providers/NativeCommandRunner.js
var NATIVE_FAILURE_DIAGNOSTIC_BYTES, NativeCommandFailure, XcrunCommandRunner, commandProcessResources, commandCleanupFailure, ALLOWED_TOOLS, resolveXcrunTool, failureCapture, captureProcess, processFailureReason, processCaptureFromSnapshot, hashFile;
function init_NativeCommandRunner() {
	return (init_NativeCommandRunner = __esmMin((() => {
		init_capturedProviderOutput();
		init_HostPlatform();
		init_OwnedCommandCleanup();
		init_snapshotEnvironment();
		init_result();
		init_providerCleanupError();
		init_DarwinProcessRunTokenReader();
		init_OwnedCommand();
		init_utf8HeadExcerpt();
		init_nativeDeadlines();
		init_nativeCommandOutput();
		init_ArtifactCommandPath();
		init_resources();
		init_SignalAbort();
		NATIVE_FAILURE_DIAGNOSTIC_BYTES = 64 * 1024;
		NativeCommandFailure = class NativeCommandFailure extends Error {
			tool;
			reason;
			exitCode;
			capture;
			cleanupFailure;
			cleanupResources;
			/** Caller-owned cancellation fact retained separately from the physical cause. */
			cancellation;
			cleanupOwner;
			cleanupFailures;
			cleanupMarker;
			detail;
			preparationFailure;
			constructor(tool, reason, exitCode = null, options, capture = null, cleanupFailure = null, cleanupResources = []) {
				super(`Native command ${tool} failed: ${reason}`, options);
				this.tool = tool;
				this.reason = reason;
				this.exitCode = exitCode;
				this.capture = capture;
				this.cleanupFailure = cleanupFailure;
				this.cleanupResources = cleanupResources;
				this.cancellation = options?.cancellation === undefined ? undefined : { reason: options.cancellation.reason };
				this.cleanupOwner = options?.cleanupOwner;
				this.cleanupFailures = options?.cleanupFailures ?? [];
				this.cleanupMarker = options?.cleanupMarker;
				this.preparationFailure = options?.cause instanceof NativeCommandFailure ? options.cause.preparationFailure : processInspectionFailure(options?.cause);
				this.detail = options?.detail ?? this.preparationFailure?.message ?? null;
			}
		};
		XcrunCommandRunner = class {
			resolveTool;
			launcher;
			environment;
			#cleanupMarkers = new Map();
			#cleanupAttempt;
			constructor(environment, resolveTool = (tool, signal, launcher, timeoutMs) => resolveXcrunTool(tool, this.environment, signal, launcher, timeoutMs), launcher) {
				this.resolveTool = resolveTool;
				this.launcher = launcher;
				this.environment = snapshotEnvironment(environment, HOST_PLATFORM.platform);
			}
			run(tool, arguments_, options) {
				if (!ALLOWED_TOOLS.has(tool)) return Promise.resolve(err(new NativeCommandFailure(tool, "unavailable")));
				return this.#runAfterCleanup(tool, arguments_, options);
			}
			/** Retry every retained owner; a failed retry prevents another command launch. */
			retryCleanup() {
				if (this.#cleanupMarkers.size === 0) return Promise.resolve([]);
				if (this.#cleanupAttempt !== undefined) return this.#cleanupAttempt;
				this.#cleanupAttempt = this.#retryCleanup().finally(() => {
					this.#cleanupAttempt = undefined;
				});
				return this.#cleanupAttempt;
			}
			async #runAfterCleanup(tool, arguments_, options) {
				const pendingFailures = await this.retryCleanup();
				if (pendingFailures.length > 0) return err(commandCleanupFailure(tool, pendingFailures));
				const resolved = await this.resolveTool(tool, options.signal, this.launcher, options.timeoutMs);
				if (!resolved.ok) {
					return err(this.#retainCleanupOwner(resolved.error));
				}
				const captured = await captureProcess(resolved.value.invocationPath, arguments_, tool, options, this.environment, this.launcher);
				if (!captured.ok) return err(this.#retainCleanupOwner(captured.error));
				return ok({
					...captured.value,
					tool,
					executable: resolved.value.invocationPath,
					executableSha256: resolved.value.sha256,
					toolVersion: null,
					versionReason: "Tool exposes no uniform stable version flag; executable SHA-256 is a prelaunch file sample and does not prove atomic OS image binding.",
					arguments: [...arguments_]
				});
			}
			async #retryCleanup() {
				const failures = [];
				for (const [owner, marker] of this.#cleanupMarkers) {
					let reason;
					try {
						const stopped = await owner.stop();
						if (stopped.status === "not-owned") {
							reason = "native command ownership remains unresolved";
						} else if (stopped.status !== "incomplete") {
							this.#cleanupMarkers.delete(owner);
							continue;
						} else reason = stopped.reason || "native command cleanup remains unverified";
					} catch (cause) {
						reason = cause instanceof Error ? cause.message || cause.name : String(cause) || "native command cleanup failed unexpectedly";
					}
					failures.push({
						owner,
						reason: reason ?? "native command cleanup remains unverified",
						resources: commandProcessResources(owner),
						marker
					});
				}
				return failures;
			}
			#retainCleanupOwner(failure) {
				const owner = failure.cleanupOwner;
				if (owner === undefined) return failure;
				let marker = failure.cleanupMarker ?? this.#cleanupMarkers.get(owner);
				if (marker === undefined) {
					marker = new ProviderCleanupError("native-macos", commandProcessResources(owner), { reason: failure.cleanupFailure ?? "native command cleanup remains incomplete" }, {
						operation: "native_command",
						cause: failure
					});
				}
				marker.bindCleanupReleaseClaim(owner.cleanupRelease);
				this.#cleanupMarkers.set(owner, marker);
				if (failure.cleanupMarker === marker) return failure;
				return new NativeCommandFailure(failure.tool, failure.reason, failure.exitCode, {
					cause: failure,
					...failure.cancellation === undefined ? {} : { cancellation: failure.cancellation },
					cleanupOwner: owner,
					cleanupFailures: failure.cleanupFailures,
					cleanupMarker: marker,
					...failure.detail === null ? {} : { detail: failure.detail }
				}, failure.capture, failure.cleanupFailure, failure.cleanupResources);
			}
		};
		commandProcessResources = (owner) => {
			const ownership = owner.launch.ownership;
			return ownership === undefined ? ["native-command-process"] : [
				ownership.runId,
				`pid:${String(ownership.leaderPid)}`,
				`process-group:${String(ownership.processGroupId)}`
			];
		};
		commandCleanupFailure = (tool, failures) => new NativeCommandFailure(tool, "io", null, {
			cleanupFailures: failures,
			cause: new AggregateError(failures.map(({ reason, resources }) => new Error(`${reason} (${resources.join(", ")})`)), "Previously owned native command cleanup remains incomplete")
		}, null, failures.map(({ reason, resources }) => `${resources.join(", ")}: ${reason}`).join("; "), [...new Set(failures.flatMap(({ resources }) => resources))]);
		ALLOWED_TOOLS = new Set([
			"codesign",
			"dyld_info",
			"dwarfdump",
			"file",
			"lipo",
			"nm",
			"plutil",
			"strings",
			"swift-demangle",
			"vtool"
		]);
		resolveXcrunTool = async (tool, environment, signal, launcher, timeoutMs) => {
			const found = await captureProcess("/usr/bin/xcrun", ["--find", tool], "xcrun", {
				...signal === undefined ? {} : { signal },
				...timeoutMs === undefined ? {} : { timeoutMs }
			}, environment, launcher);
			if (!found.ok) {
				return err(new NativeCommandFailure(tool, found.error.reason === "nonzero-exit" || found.error.reason === "unavailable" ? "unavailable" : found.error.reason, found.error.exitCode, {
					cause: found.error,
					...found.error.cleanupOwner === undefined ? {} : { cleanupOwner: found.error.cleanupOwner },
					...found.error.cleanupFailures.length === 0 ? {} : { cleanupFailures: found.error.cleanupFailures },
					...found.error.cleanupMarker === undefined ? {} : { cleanupMarker: found.error.cleanupMarker },
					...found.error.cancellation === undefined ? {} : { cancellation: found.error.cancellation },
					...found.error.detail === null ? {} : { detail: found.error.detail }
				}, found.error.capture, found.error.cleanupFailure, found.error.cleanupResources));
			}
			if (found.value.exitCode !== 0) return err(new NativeCommandFailure(tool, "unavailable", found.value.exitCode, undefined, failureCapture(found.value, false)));
			const candidate = found.value.stdout.trim();
			if (!candidate.startsWith("/")) return err(new NativeCommandFailure(tool, "unavailable", found.value.exitCode, undefined, failureCapture(found.value, false)));
			try {
				const selected = await selectArtifactCommandPath(candidate, signal);
				return ok({
					...selected,
					sha256: await hashFile(selected.resolvedPath, signal)
				});
			} catch (cause) {
				const capture = failureCapture(found.value, false);
				const cancellation = signal?.aborted === true ? { reason: signal.reason } : undefined;
				const observedCancellation = isAbortOf(cause, signal) || signal?.aborted === true && cause instanceof ArtifactReaderFailure && cause.reason === "cancelled" && cause.cause === signal.reason;
				return err(new NativeCommandFailure(tool, observedCancellation ? "cancelled" : "io", capture.exitCode, {
					cause,
					...cancellation === undefined ? {} : { cancellation }
				}, capture));
			}
		};
		failureCapture = (capture, truncated) => {
			const stdout = utf8HeadExcerpt(capture.stdout, NATIVE_FAILURE_DIAGNOSTIC_BYTES);
			const stderr = utf8HeadExcerpt(capture.stderr, NATIVE_FAILURE_DIAGNOSTIC_BYTES);
			return {
				stdout: stdout.text,
				stderr: stderr.text,
				stdoutBytes: capture.stdoutBytes,
				stderrBytes: capture.stderrBytes,
				exitCode: capture.exitCode,
				signal: capture.signal,
				truncated: truncated || stdout.truncated || stderr.truncated
			};
		};
		captureProcess = async (executable, arguments_, tool, options, environment, launcher) => {
			const runId = `rea-native-command-${randomUUID()}`;
			try {
				const snapshot = await runOwnedCommand({
					command: executable,
					arguments: [...arguments_],
					runId,
					env: {
						LC_ALL: "C",
						LANG: "C"
					},
					hostEnvironment: environment,
					...options.signal === undefined ? {} : { signal: options.signal }
				}, {
					timeoutMs: options.timeoutMs ?? 6e4,
					diagnosticBytes: NATIVE_COMMAND_OUTPUT_BUDGET_BYTES,
					acceptNonZeroExit: options.acceptNonZero === true
				}, launcher === undefined ? {} : { launcher });
				return ok(processCaptureFromSnapshot(snapshot));
			} catch (cause) {
				if (cause instanceof OwnedCommandFailure) {
					const capture = cause.snapshot === null ? null : failureCapture(processCaptureFromSnapshot(cause.snapshot), cause.snapshot.diagnosticTruncated === true);
					return err(new NativeCommandFailure(tool, cause.reason === "process" ? processFailureReason(capture) : cause.reason, capture?.exitCode ?? null, {
						cause,
						...cause.cancellation === undefined ? {} : { cancellation: cause.cancellation },
						...cause.cleanupOwner === undefined ? {} : { cleanupOwner: cause.cleanupOwner }
					}, capture, cause.cleanupFailure, cause.resources));
				}
				return err(new NativeCommandFailure(tool, cause instanceof DarwinProcessOwnershipInspectionError && cause.cancellation !== undefined ? "cancelled" : "io", null, { cause }));
			}
		};
		processFailureReason = (capture) => capture !== null && (capture.signal !== null || capture.exitCode !== null && capture.exitCode !== 0) ? "nonzero-exit" : "io";
		processCaptureFromSnapshot = (snapshot) => {
			const captured = capturedProviderOutput(snapshot);
			return {
				stdout: captured.stdout,
				stderr: captured.stderr,
				stdoutBytes: snapshot.stdout.bytes,
				stderrBytes: snapshot.stderr.bytes,
				exitCode: captured.exit_code ?? null,
				signal: captured.signal ?? null
			};
		};
		hashFile = (path, signal) => new Promise((resolve, reject) => {
			const hash = createHash("sha256");
			const stream = createReadStream(path, signal === undefined ? undefined : { signal });
			stream.on("data", (chunk) => hash.update(chunk));
			stream.once("error", reject);
			stream.once("end", () => resolve(hash.digest("hex")));
		});
	})))();
}

//#endregion
//#region dist/domain/apple/lipo.js
var architectureSchema, LipoFieldRetentionError, parseLipoOutput, lipoDescribesCpu, parseLipoOutputResult, integer, CPU_TYPES, CPU_SUBTYPES, ownCpuCode, cpuTypeCode, cpuSubtypeFacts, pointerAuthenticationAbi, numericArchitectureName, signedCpuType, printedSubtypeBase, capabilityBits, unsigned32, alignment;
function init_lipo() {
	return (init_lipo = __esmMin((() => {
		init_result();
		init_parseFailure();
		init_nativeCommandOutput();
		init_machoCpuIdentity();
		architectureSchema = z.object({
			name: z.string().min(1),
			hidden: z.boolean(),
			cpu_type: z.string().nullable(),
			cpu_subtype: z.string().nullable(),
			cpu_type_code: z.int().nonnegative().nullable(),
			cpu_subtype_code: z.int().nonnegative().nullable(),
			cpu_subtype_base: z.int().nonnegative().nullable(),
			capabilities: z.string().nullable(),
			file_offset: z.int().min(0).nullable(),
			size: z.int().min(0).nullable(),
			alignment: z.int().min(0).nullable()
		});
		LipoFieldRetentionError = class extends Error {
			requiredBytes;
			_tag = "LipoFieldRetentionError";
			constructor(requiredBytes) {
				super("lipo numeric field observations exceed the retained native output budget");
				this.requiredBytes = requiredBytes;
				this.name = this._tag;
			}
		};
		parseLipoOutput = (output, operandPath) => {
			if (operandPath !== undefined) {
				const header = `Fat header in: ${operandPath}`;
				if (output.startsWith(header)) {
					if (output.startsWith("\r\n", header.length)) output = output.slice(header.length + 2);
					else if (output.startsWith("\n", header.length)) output = output.slice(header.length + 1);
				}
			}
			const thinArchitecture = /(?:^|\r?\n)Non-fat file:[\s\S]* is architecture: ([^\r\n]+)$/u.exec(output.trimEnd())?.[1];
			const thinNumericName = thinArchitecture === undefined ? undefined : numericArchitectureName(thinArchitecture);
			if (thinArchitecture !== undefined && (thinNumericName !== undefined || /^\S+$/u.test(thinArchitecture))) return {
				format: "thin",
				declaredArchitectureCount: null,
				hiddenArchitectureCount: null,
				architectures: [{
					...architectureSchema.parse({
						name: thinArchitecture,
						hidden: false,
						cpu_type: null,
						cpu_subtype: null,
						cpu_type_code: thinNumericName?.cpuType ?? null,
						cpu_subtype_code: null,
						cpu_subtype_base: thinNumericName?.cpuSubtypeBase ?? null,
						capabilities: null,
						file_offset: null,
						size: null,
						alignment: null
					}),
					...thinNumericName === undefined ? {} : { numericName: thinNumericName },
					fields: {
						offset: { kind: "absent" },
						size: { kind: "absent" },
						align: { kind: "absent" }
					},
					limitations: []
				}]
			};
			const architectures = [];
			let declaredArchitectureCount = null;
			let hiddenArchitectureCount = null;
			let current;
			let observations = {};
			let retainedFieldBytes = 0;
			const admitFieldBytes = (bytes) => {
				retainedFieldBytes += bytes;
				if (retainedFieldBytes > 67108864) throw new LipoFieldRetentionError(retainedFieldBytes);
			};
			const flush = () => {
				if (current === undefined) return;
				const name = current.architecture ?? current["Non-fat file"];
				if (name !== undefined) {
					const observe = (key) => {
						const observed = observations[key];
						if (observed === undefined) return { kind: "absent" };
						const sourceLines = observed.map(({ sourceLine }) => sourceLine);
						const value = observed[0]?.value;
						return value === null || value === undefined || observed.some((candidate) => candidate.value !== value) ? {
							kind: "uninterpretable",
							sourceLines
						} : {
							kind: "parsed",
							sourceLines,
							value
						};
					};
					const fields = {
						offset: observe("offset"),
						size: observe("size"),
						align: observe("align")
					};
					const value = (field) => field.kind === "parsed" ? field.value : null;
					const limitations = Object.entries(fields).flatMap(([field, observation]) => {
						if (observation.kind !== "uninterpretable") return [];
						admitFieldBytes(name.length * 14 + 256);
						return [`lipo ${field} for ${name} could not be interpreted; ${observation.sourceLines.length === 1 ? "source line: " : "source lines:\n"}${observation.sourceLines.join("\n")}`];
					});
					const displayName = current.architecture ? name.replace(/ \(hidden\)$/u, "") : name.split(" is architecture: ").at(-1) ?? name;
					const numericName = numericArchitectureName(displayName);
					const subtype = cpuSubtypeFacts(current.cpusubtype, current.capabilities);
					const pointerAuthAbi = pointerAuthenticationAbi(current.capabilities);
					if (pointerAuthAbi !== undefined && subtype.code === null) {
						admitFieldBytes(160);
						limitations.push("lipo identified the pointer-authentication ABI class but did not establish its version.");
					}
					architectures.push({
						...architectureSchema.parse({
							name: displayName,
							hidden: name.endsWith(" (hidden)"),
							cpu_type: current.cputype ?? null,
							cpu_subtype: current.cpusubtype ?? null,
							cpu_type_code: cpuTypeCode(current.cputype) ?? numericName?.cpuType ?? null,
							cpu_subtype_code: subtype.code,
							cpu_subtype_base: subtype.base ?? numericName?.cpuSubtypeBase ?? null,
							capabilities: current.capabilities ?? null,
							file_offset: value(fields.offset),
							size: value(fields.size),
							alignment: value(fields.align)
						}),
						...numericName === undefined ? {} : { numericName },
						...pointerAuthAbi === undefined ? {} : { pointerAuthAbi },
						fields,
						limitations
					});
				}
				current = undefined;
				observations = {};
			};
			for (const rawLine of output.split(/\r?\n/u)) {
				const line = rawLine.trim();
				const count = /^nfat_arch\s+(\d+)(?:\s+\(\+(\d+) hidden\))?$/u.exec(line);
				if (count?.[1] !== undefined) {
					declaredArchitectureCount = integer(count[1]);
					hiddenArchitectureCount = integer(count[2] ?? "0");
					continue;
				}
				if (line.startsWith("Non-fat file:")) {
					flush();
					current = { "Non-fat file": line };
					continue;
				}
				if (line.startsWith("architecture ")) {
					flush();
					current = { architecture: line.slice("architecture ".length).trim() };
					continue;
				}
				const numericField = /^\s*(offset|size|align)(?:\s+(.*))?$/u.exec(rawLine);
				if (numericField?.[1] === "offset" || numericField?.[1] === "size" || numericField?.[1] === "align") {
					current ??= {};
					const field = numericField[1];
					admitFieldBytes(rawLine.length * 18 + 128);
					const sourceValue = (numericField[2] ?? "").trim();
					const observed = {
						sourceLine: rawLine,
						value: field === "align" ? alignment(sourceValue) : integer(sourceValue)
					};
					(observations[field] ??= []).push(observed);
					continue;
				}
				const match = /^(cputype|cpusubtype|capabilities)\s+(.+)$/u.exec(line);
				if (match?.[1] !== undefined && match[2] !== undefined) {
					current ??= {};
					current[match[1]] = match[2].trim();
				}
			}
			flush();
			if (architectures.length === 0) throw malformedInput("lipo-output", "lipo output contained no architectures");
			return {
				format: "fat",
				declaredArchitectureCount,
				hiddenArchitectureCount,
				architectures
			};
		};
		lipoDescribesCpu = (row, cpuType, cpuSubtype) => {
			const base = cpuSubtype === null ? null : machoCpuSubtypeBase(cpuSubtype);
			return (cpuType === null || (row.cpu_type_code === null || row.cpu_type_code === cpuType) && (row.numericName === undefined || row.numericName.cpuType === cpuType) && (row.pointerAuthAbi === undefined || cpuType === CPU_TYPES.CPU_TYPE_ARM64)) && (cpuSubtype === null || (row.cpu_subtype_code === null || row.cpu_subtype_code === cpuSubtype) && (row.cpu_subtype_base === null || row.cpu_subtype_base === base) && (row.numericName === undefined || row.numericName.cpuSubtypeBase === base) && (row.pointerAuthAbi === undefined || cpuSubtype >>> 30 === (row.pointerAuthAbi === "KERNEL" ? 3 : 2)));
		};
		parseLipoOutputResult = (output, operandPath) => {
			try {
				return ok(parseLipoOutput(output, operandPath));
			} catch (cause) {
				if (!(cause instanceof ParseFailureError) && !(cause instanceof z.ZodError) && !(cause instanceof LipoFieldRetentionError)) throw cause;
				return err(cause);
			}
		};
		integer = (value) => {
			if (value === undefined || !/^\d+$/u.test(value)) return null;
			const parsed = Number.parseInt(value, 10);
			return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null;
		};
		CPU_TYPES = {
			CPU_TYPE_X86: 7,
			CPU_TYPE_I386: 7,
			CPU_TYPE_X86_64: 16777223,
			CPU_TYPE_ARM: 12,
			CPU_TYPE_ARM64: 16777228,
			CPU_TYPE_ARM64_32: 33554444,
			CPU_TYPE_POWERPC: 18,
			CPU_TYPE_POWERPC64: 16777234
		};
		CPU_SUBTYPES = {
			CPU_SUBTYPE_X86_ALL: 3,
			CPU_SUBTYPE_I386_ALL: 3,
			CPU_SUBTYPE_X86_64_ALL: 3,
			CPU_SUBTYPE_X86_64_H: 8,
			CPU_SUBTYPE_ARM64_ALL: 0,
			CPU_SUBTYPE_ARM64_V8: 1,
			CPU_SUBTYPE_ARM64E: 2,
			CPU_SUBTYPE_ARM64_32_ALL: 0,
			CPU_SUBTYPE_ARM64_32_V8: 1,
			CPU_SUBTYPE_ARM_V7: 9,
			CPU_SUBTYPE_ARM_V7S: 11,
			CPU_SUBTYPE_ARM_V7K: 12,
			CPU_SUBTYPE_POWERPC_ALL: 0,
			CPU_SUBTYPE_POWERPC_970: 100
		};
		ownCpuCode = (codes, name) => Object.hasOwn(codes, name) ? codes[name] : undefined;
		cpuTypeCode = (value) => {
			if (value === undefined) return null;
			const decimal = /^\((-?\d+)\)$/u.exec(value)?.[1];
			return decimal === undefined ? unsigned32(value) ?? ownCpuCode(CPU_TYPES, value) ?? null : signedCpuType(decimal);
		};
		cpuSubtypeFacts = (value, capabilities) => {
			if (value === undefined) return {
				base: null,
				code: null
			};
			const numeric = unsigned32(value);
			if (numeric !== null) return {
				base: machoCpuSubtypeBase(numeric),
				code: numeric
			};
			const decimal = /^cpusubtype \((\d+)\)$/u.exec(value)?.[1];
			const base = decimal === undefined ? ownCpuCode(CPU_SUBTYPES, value) ?? null : printedSubtypeBase(decimal);
			const bits = capabilityBits(capabilities);
			return {
				base,
				code: base === null || bits === null ? null : (bits << 24 | base) >>> 0
			};
		};
		pointerAuthenticationAbi = (capabilities) => {
			const abi = /^PTR_AUTH_VERSION\s+(USERSPACE|KERNEL)\s+\d+$/u.exec(capabilities ?? "")?.[1];
			return abi === "USERSPACE" || abi === "KERNEL" ? abi : undefined;
		};
		numericArchitectureName = (value) => {
			const parts = /^\(cputype \((-?\d+)\) cpusubtype \((\d+)\)\)$/u.exec(value);
			if (parts === null) return undefined;
			const cpuType = signedCpuType(parts[1]);
			const cpuSubtypeBase = printedSubtypeBase(parts[2]);
			return cpuType === null || cpuSubtypeBase === null ? undefined : {
				cpuType,
				cpuSubtypeBase
			};
		};
		signedCpuType = (decimal) => {
			const value = Number(decimal);
			return value >= -2147483648 && value <= 2147483647 ? value >>> 0 : null;
		};
		printedSubtypeBase = (decimal) => {
			const value = Number(decimal);
			return value <= 16777215 ? value : null;
		};
		capabilityBits = (capabilities) => {
			if (capabilities === "CPU_SUBTYPE_LIB64") return 128;
			const bits = /^0x([\da-f]{1,2})$/iu.exec(capabilities ?? "")?.[1];
			return bits === undefined ? null : Number.parseInt(bits, 16);
		};
		unsigned32 = (value) => {
			if (!/^(?:\d+|0x[\da-f]+)$/iu.test(value)) return null;
			const parsed = Number(value);
			return Number.isInteger(parsed) && parsed >= 0 && parsed <= 4294967295 ? parsed >>> 0 : null;
		};
		alignment = (value) => {
			if (value === undefined) return null;
			const exponent = /^2\^(\d+)(?: \((\d+)\))?$/u.exec(value);
			const powerText = exponent?.[1];
			if (powerText !== undefined) {
				const power = Number.parseInt(powerText, 10);
				if (power > 52) return null;
				const alignment = 2 ** power;
				const reported = exponent?.[2];
				return reported === undefined || integer(reported) === alignment ? alignment : null;
			}
			return integer(value);
		};
	})))();
}

//#endregion
export { LipoFieldRetentionError, NATIVE_COMMAND_OUTPUT_BUDGET_BYTES, NATIVE_FAILURE_DIAGNOSTIC_BYTES, NativeCommandFailure, XcrunCommandRunner, failureCapture, init_NativeCommandRunner, init_lipo, init_nativeCommandOutput, lipoDescribesCpu, parseLipoOutputResult, resolveXcrunTool };