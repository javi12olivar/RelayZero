import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_jsonValue, init_sha256Hex, jsonValueSchema, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_safeJson, init_strictUtf8, isStrictUtf8, safeParseUtf8Json } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, ArtifactFileCancelled, ArtifactFileCleanupFailure, ArtifactPathRegistry, ArtifactReaderFailure, ArtifactResourceScope, NonRegularFileReadError, OwnedDirectoryHandle, SafeOutputTree, SafeOutputTreeCreationFailure, artifactFileCancellationCause, fileSnapshotPartialObservationSchema, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactPaths, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedDirectoryHandle, init_RegularFile, init_SafeOutputTree, init_SafeOutputTreeCreationFailure, init_fileSnapshotObservation, init_resources, normalizeArtifactPath, sameRegularFileState, withArtifactRegularFile } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { BOUNDED_PRODUCER_LIMITS, init_producerResourceLimits } from "./urlComponents-DJm-wtqY.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { cleanupOwnedProcessGroup, init_ProcessOwnership } from "./ProcessOwnership-CezAYpow.js";
import { init_OwnedCommandCleanup, processInspectionCancellationError, retainProcessInspectionCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { assertArtifactCommandPath, init_ArtifactCommandPath, selectArtifactCommandPath } from "./ArtifactCommandPath-B5Zuhaxu.js";
import { init_LinuxResourceLimits, prlimitArgumentVector } from "./LinuxResourceLimits-vLyr_vuV.js";
import { JAVASCRIPT_RECOVERY_TOOL_CONTRACTS, init_javascriptRecovery as init_javascriptRecovery$1, init_javascriptRecoveryToolContracts, javascriptRecoveryInputSchema, javascriptRecoveryResultSchema } from "./javascriptRecoveryToolContracts-TpJIfDoP.js";
import { constants } from "node:fs";
import { basename, dirname, isAbsolute, join, relative, sep } from "node:path";
import { satisfies, valid } from "semver";
import { z } from "zod";
import { Readable } from "node:stream";
import { createHash, randomUUID } from "node:crypto";
import { access, lstat, mkdir, mkdtemp, opendir, realpath, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";

//#region dist/application/javascript/JavaScriptRecoveryService.js
var OPERATION$5, JavaScriptRecoveryService;
function init_JavaScriptRecoveryService() {
	return (init_JavaScriptRecoveryService = __esmMin((() => {
		init_AnalysisInput();
		init_analysisErrorCore();
		init_evidence();
		init_javascriptRecovery$1();
		init_result();
		init_ProviderOperationExecution();
		OPERATION$5 = "recover_javascript_sources";
		JavaScriptRecoveryService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close?.() ?? Promise.resolve();
			}
			/** Recover sources and bind the result to its original immutable input. */
			async recover(input, options) {
				const parsed = parseAnalysisInput(OPERATION$5, input, javascriptRecoveryInputSchema, options?.signal);
				if (!parsed.ok) return parsed;
				const execution = await this.provider.recover(parsed.value, options);
				if (!execution.ok) return execution;
				const result = javascriptRecoveryResultSchema.safeParse(execution.value.result);
				if (!result.success || execution.value.subject == null) return err(new AnalysisOutputError(OPERATION$5, "Recovery did not return a valid result bound to the original source"));
				if (result.data.source.path !== parsed.value.path || (result.data.additional_sources ?? []).length !== (parsed.value.additional_paths ?? []).length || (parsed.value.additional_paths ?? []).some((path, index) => result.data.additional_sources?.[index]?.path !== path) || execution.value.subject.path !== result.data.source.path || execution.value.subject.sha256 !== result.data.source.sha256 || execution.value.provider.id !== result.data.engine.id || execution.value.provider.version !== result.data.engine.version) return err(new AnalysisOutputError(OPERATION$5, "Recovery source or engine identity disagrees with its Evidence binding"));
				const evidence = createEvidence(execution.value.subject, execution.value.provider, {
					operation: OPERATION$5,
					parameters: parsed.value,
					result: result.data,
					rawResult: execution.value.rawResult,
					locations: execution.value.locations,
					limitations: execution.value.limitations,
					confidence: "derived",
					authority: "shipped-artifact"
				});
				return completeProviderEvidence(evidence, options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/javascript/recovery/WakaruRelease.js
var WAKARU_ACCEPTED_RANGE, wakaruFixedLimitRecovery, RECOVERY_LIMITS, RECOVERY_LIMITATIONS;
function init_WakaruRelease() {
	return (init_WakaruRelease = __esmMin((() => {
		init_producerResourceLimits();
		WAKARU_ACCEPTED_RANGE = "^1.13.0";
		wakaruFixedLimitRecovery = (allowance) => ({
			userMessage: `${allowance}. This release has no runtime override.`,
			remediationAction: `${allowance}. This release has no runtime override. Raising max_heap_mb or analysis_timeout_ms does not raise it. Repeating the unchanged request fails the same way.`
		});
		RECOVERY_LIMITS = {
			inputBytes: 64 * 1024 * 1024,
			outputBytes: 128 * 1024 * 1024,
			outputEntries: 1e4,
			reportBytes: 8 * 1024 * 1024,
			addressSpaceBytes: BOUNDED_PRODUCER_LIMITS.address_space_bytes,
			cpuSeconds: 120,
			timeoutMs: 12e4
		};
		RECOVERY_LIMITATIONS = [
			"Recovered sources are derived artifacts; original variable names and runtime equivalence are not established.",
			"Extraction ranges refer to half-open UTF-8 byte offsets in the original input, not rewritten line positions or whole-bundle coverage.",
			"Emitted source maps are preserved as reported by the engine; their mapping accuracy is not independently established.",
			"Inspection mode may produce non-executable regions. No input or recovered application code is executed.",
			"Linux adapter: one worker, 1 GiB address-space ceiling, 120-second deadline, 64 MiB total input, 128 MiB output, 10000 output entries and 8 MiB per diagnostic/report stream. Resource limits are per operation, not aggregate host containment."
		];
	})))();
}

//#endregion
//#region dist/javascript/recovery/RecoveryFiles.js
var OPERATION$4, RecoveryFileSizeError, isRecoveryFileSizeError, scanRecoveryFile, fingerprintRecoveryFile, readRecoveryFile, snapshotRecoveryInput, recoveryInputLayoutPath, snapshotRecoveryInputs, inventoryRecoveryFiles, recoveryInputFailure, checkRecoveryCancellation, checkRecoveryDeadline;
function init_RecoveryFiles() {
	return (init_RecoveryFiles = __esmMin((() => {
		init_resources();
		init_fileSnapshotObservation();
		init_OwnedDirectoryHandle();
		init_analysisErrorCore();
		init_RegularFile();
		init_WakaruRelease();
		init_strictUtf8();
		init_errorMessage();
		init_sha256Hex();
		OPERATION$4 = "recover_javascript_sources";
		RecoveryFileSizeError = class extends AnalysisOutputError {
			maximum;
			constructor(reason, maximum) {
				super(OPERATION$4, reason);
				this.maximum = maximum;
			}
		};
		isRecoveryFileSizeError = (cause, maximum) => cause instanceof RecoveryFileSizeError && (maximum === undefined || cause.maximum === maximum);
		scanRecoveryFile = async (path, maximum, consume, signal, resources) => {
			try {
				return await withArtifactRegularFile(path, resources ?? new ArtifactResourceScope(), signal, async ({ handle, initial: before }) => {
					const hash = createHash("sha256");
					if (before.size > maximum) throw new RecoveryFileSizeError(`Expected a regular file no larger than ${String(maximum)} bytes: ${path}`, maximum);
					let bytes = 0;
					for await (const raw of handle.createReadStream({ autoClose: false })) {
						checkRecoveryCancellation(signal);
						const chunk = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
						bytes += chunk.length;
						if (bytes > maximum) throw new RecoveryFileSizeError(`File exceeds ${String(maximum)} bytes: ${path}`, maximum);
						hash.update(chunk);
						consume(chunk);
					}
					const after = await handle.stat();
					const current = await lstat(path);
					if (before.size !== bytes || [after, current].some((state) => !sameRegularFileState(before, state))) throw new AnalysisArtifactChangedError(OPERATION$4, path, `File identity changed while reading: ${path}`);
					return {
						sha256: hash.digest("hex"),
						bytes
					};
				});
			} catch (cause) {
				if (cause instanceof ArtifactFileCleanupFailure) throw cause;
				if (cause instanceof ArtifactFileCancelled) throw cancelledBy(OPERATION$4, carriedReason(cause.fileCancellation.reason), { partialObservation: fileSnapshotPartialObservationSchema.parse(Object.assign({}, cause.fileCancellation.outcome.value, {
					kind: "file-snapshot-hash",
					path
				})) });
				if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") throw cancelledBy(OPERATION$4, carriedReason(artifactFileCancellationCause(cause)));
				if (cause instanceof Error && "code" in cause && (cause.code === "EACCES" || cause.code === "EPERM")) throw new AnalysisAccessDeniedError(OPERATION$4, path, cause.code, { cause });
				if (cause instanceof NonRegularFileReadError) throw new AnalysisOutputError(OPERATION$4, `Expected a regular file no larger than ${String(maximum)} bytes: ${path}`);
				throw cause;
			}
		};
		fingerprintRecoveryFile = async (path, maximum, signal, resources) => scanRecoveryFile(path, maximum, () => {}, signal, resources);
		readRecoveryFile = async (path, maximum, signal, resources) => {
			const chunks = [];
			const result = await scanRecoveryFile(path, maximum, (chunk) => chunks.push(chunk), signal, resources);
			return Buffer.concat(chunks, result.bytes);
		};
		snapshotRecoveryInput = async (path, snapshotPath, relativePath, maximum, signal, resources) => {
			let bytes;
			try {
				bytes = await readRecoveryFile(path, maximum, signal, resources);
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError || cause instanceof AnalysisAccessDeniedError || cause instanceof AnalysisArtifactChangedError || cause instanceof ArtifactFileCleanupFailure) throw cause;
				if (cause instanceof RecoveryFileSizeError) throw new AnalysisResourceConstraintError(OPERATION$4, "file-size", `Selected JavaScript input ${path} exceeds the ${String(cause.maximum)} bytes remaining of the ${String(RECOVERY_LIMITS.inputBytes)}-byte total input allowance`, {
					maximum_input_bytes: RECOVERY_LIMITS.inputBytes,
					remaining_input_bytes: cause.maximum
				}, {
					cause,
					retryable: false,
					remediationAction: `Select JavaScript inputs whose combined size is within the ${String(RECOVERY_LIMITS.inputBytes)}-byte total input allowance (maximum_input_bytes). This release has no runtime override. Raising max_heap_mb does not raise it. Do not truncate required source; retrying the unchanged selection will fail again.`
				});
				throw recoveryInputFailure("path", `Cannot snapshot UTF-8 JavaScript input ${path}: ${errorMessage(cause)}`, cause);
			}
			if (!isStrictUtf8(bytes)) throw new AnalysisInputError(OPERATION$4, {}, [{
				path: ["path"],
				reason: "invalid_format",
				expected: "UTF-8",
				message: `JavaScript input is not valid UTF-8: ${path}`
			}]);
			try {
				await mkdir(dirname(snapshotPath), {
					recursive: true,
					mode: 448
				});
				await writeFile(snapshotPath, bytes, {
					flag: "wx",
					mode: 384
				});
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && (cause.code === "EEXIST" || cause.code === "ENOTDIR")) throw recoveryInputFailure("additional_paths", `Selected input ${path} collides with another selected input at ${relativePath} on this filesystem. Select each file once.`, cause);
				throw cause;
			}
			return {
				path,
				snapshot_path: snapshotPath,
				relative_path: relativePath,
				sha256: sha256Hex(bytes),
				bytes: bytes.length
			};
		};
		recoveryInputLayoutPath = async (path, signal) => {
			try {
				checkRecoveryCancellation(signal);
				const parent = dirname(path);
				if (!(await stat(parent)).isDirectory()) throw new NonRegularFileReadError(path, false);
				const canonicalParent = await realpath(parent);
				checkRecoveryCancellation(signal);
				return join(canonicalParent, basename(path));
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError) throw cause;
				if (cause instanceof Error && "code" in cause && (cause.code === "EACCES" || cause.code === "EPERM")) throw new AnalysisAccessDeniedError(OPERATION$4, path, cause.code, { cause });
				throw recoveryInputFailure("path", `Cannot resolve selected JavaScript input parent ${path}: ${errorMessage(cause)}`, cause);
			}
		};
		snapshotRecoveryInputs = async (paths, directory, signal, resources) => {
			const selections = [{
				path: paths[0],
				layoutPath: await recoveryInputLayoutPath(paths[0], signal)
			}];
			for (const path of paths.slice(1)) selections.push({
				path,
				layoutPath: await recoveryInputLayoutPath(path, signal)
			});
			let commonDirectory = dirname(selections[0].layoutPath);
			for (const { layoutPath } of selections) {
				while (true) {
					const fromCommon = relative(commonDirectory, layoutPath);
					if (fromCommon !== ".." && !fromCommon.startsWith(`..${sep}`) && !isAbsolute(fromCommon)) break;
					const parent = dirname(commonDirectory);
					if (parent === commonDirectory) throw recoveryInputFailure("additional_paths", "Selected files must share a filesystem root");
					commonDirectory = parent;
				}
			}
			const snapshots = [];
			let remaining = RECOVERY_LIMITS.inputBytes;
			for (const { path, layoutPath } of selections) {
				const relativePath = selections.length === 1 ? "bundle.js" : relative(commonDirectory, layoutPath).split(sep).join("/");
				try {
					if (relativePath.includes("\\")) throw new TypeError("Wakaru cannot preserve literal backslashes in input paths");
					if (normalizeArtifactPath(relativePath) !== relativePath) throw new TypeError("Input names must already use NFC Unicode spelling");
				} catch (cause) {
					throw recoveryInputFailure("path", `Cannot preserve selected input path in published artifacts: ${path}: ${errorMessage(cause)}`, cause);
				}
				const snapshot = await snapshotRecoveryInput(path, join(directory, relativePath), relativePath, remaining, signal, resources);
				snapshots.push(snapshot);
				remaining -= snapshot.bytes;
			}
			const [primary, ...additional] = snapshots;
			if (primary === undefined) throw recoveryInputFailure("path", "Select a JavaScript input");
			return [primary, ...additional];
		};
		inventoryRecoveryFiles = async (root, signal, resources = new ArtifactResourceScope()) => {
			const files = [];
			let bytes = 0;
			let entries = 0;
			const visit = async (directory, prefix) => {
				const metadata = await lstat(directory);
				if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new AnalysisOutputError(OPERATION$4, `Unsafe staging directory: ${directory}`);
				const handle = await opendir(directory);
				const owner = new OwnedDirectoryHandle(handle);
				const children = [];
				let outcome;
				try {
					for (;;) {
						const entry = await handle.read();
						if (entry === null) break;
						checkRecoveryCancellation(signal);
						entries++;
						if (entries > RECOVERY_LIMITS.outputEntries) throw new AnalysisOutputError(OPERATION$4, "Recovery staging exceeds the 10000-entry resource limit", wakaruFixedLimitRecovery(`Recovery staging exceeds the ${String(RECOVERY_LIMITS.outputEntries)}-entry resource limit`));
						children.push(entry.name);
					}
					outcome = { kind: "completed" };
				} catch (cause) {
					outcome = {
						kind: "failed",
						cause
					};
				}
				const cleanup = await resources.release({
					kind: "directory-handle",
					handle: owner,
					resource: directory
				});
				if (cleanup.kind === "failed") {
					const failure = resources.cleanupFailure(outcome, [cleanup]);
					if (outcome.kind === "completed" && signal?.aborted === true) throw new ArtifactReaderFailure("cancelled", "Recovery inventory cancelled during directory close", {
						cause: failure,
						cancellation: { reason: signal.reason },
						cleanup: failure.cleanup,
						cleanupLeases: failure.cleanupLeases
					});
					throw failure;
				}
				if (outcome.kind === "failed") throw outcome.cause;
				checkRecoveryCancellation(signal);
				for (const name of children) {
					checkRecoveryCancellation(signal);
					const relativePath = prefix === "" ? name : `${prefix}/${name}`;
					const path = join(directory, name);
					const info = await lstat(path);
					if (info.isSymbolicLink() || !info.isDirectory() && !info.isFile()) throw new AnalysisOutputError(OPERATION$4, `Recovery produced a symlink or special file: ${relativePath}`);
					if (info.isDirectory()) await visit(path, relativePath);
					else {
						bytes += info.size;
						if (bytes > RECOVERY_LIMITS.outputBytes) throw new AnalysisOutputError(OPERATION$4, "Recovery staging exceeds the 128 MiB resource limit", wakaruFixedLimitRecovery(`Recovery staging exceeds the ${String(RECOVERY_LIMITS.outputBytes)}-byte output allowance`));
						files.push({
							relativePath,
							path,
							bytes: info.size
						});
					}
				}
			};
			await visit(root, "");
			return files;
		};
		recoveryInputFailure = (field, message, cause) => new AnalysisInputError(OPERATION$4, { cause }, [{
			path: [field],
			reason: "invalid_value",
			message
		}]);
		checkRecoveryCancellation = (signal) => {
			if (signal?.aborted === true) throw cancelledBy(OPERATION$4, signal);
		};
		checkRecoveryDeadline = (deadline, signal) => {
			checkRecoveryCancellation(signal);
			if (performance.now() >= deadline) throw new AnalysisTimeoutError(OPERATION$4, RECOVERY_LIMITS.timeoutMs, {
				userMessage: `JavaScript source recovery reached its ${String(RECOVERY_LIMITS.timeoutMs)} ms Wakaru adapter deadline. This is REA's fixed per-operation deadline, not the MCP client deadline.`,
				remediationAction: `This release has no runtime override for the ${String(RECOVERY_LIMITS.timeoutMs)} ms Wakaru recovery deadline. Raising analysis_timeout_ms or max_heap_mb does not raise it. A smaller complete input may finish inside this deadline. An unchanged retry may hit this deadline again. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`
			});
		};
	})))();
}

//#endregion
//#region dist/javascript/recovery/WakaruCommand.js
var OPERATION$3, WAKARU_REQUIREMENT, wakaruHostSupported, WakaruCleanupFailure, resolveWakaruCommand, runWakaruCommand;
function init_WakaruCommand() {
	return (init_WakaruCommand = __esmMin((() => {
		init_capturedProviderOutput();
		init_ArtifactCommandPath();
		init_analysisErrorCore();
		init_resources();
		init_providerAdapterError();
		init_providerCleanupError();
		init_analysisErrorBase();
		init_analysisErrorCancellation();
		init_LinuxResourceLimits();
		init_OwnedCommandCleanup();
		init_ProcessOwnership();
		init_ProviderProcess();
		init_RecoveryFiles();
		init_WakaruRelease();
		init_errorMessage();
		OPERATION$3 = "recover_javascript_sources";
		WAKARU_REQUIREMENT = "Provide an absolute REA_WAKARU_COMMAND pointing to a Wakaru ^1.13.0 Linux x64 binary (verified with 1.14.0); no tool is installed by REA. See docs/guides/javascript/javascript-recovery.md#install-wakaru.";
		wakaruHostSupported = (platform, arch) => platform === "linux" && arch === "x64";
		WakaruCleanupFailure = class extends ProviderCleanupError {
			cleanupOwner;
			runId;
			cwd;
			constructor(cleanupOwner, runId, cwd, reason, previousError, snapshot) {
				super("wakaru", [runId, cwd], {
					reason,
					previous_error: previousError instanceof Error ? previousError.message : null,
					exit_code: snapshot.exitCode ?? null,
					signal: snapshot.signal ?? null
				}, {
					operation: OPERATION$3,
					cause: previousError,
					...previousError instanceof AnalysisError ? { cleanupPrimary: previousError } : {},
					capturedOutput: capturedProviderOutput(snapshot)
				});
				this.cleanupOwner = cleanupOwner;
				this.runId = runId;
				this.cwd = cwd;
			}
		};
		resolveWakaruCommand = async (environment, host, resources, signal) => {
			const configured = environment.REA_WAKARU_COMMAND;
			if (!wakaruHostSupported(host.platform, host.architecture) || configured === undefined || !isAbsolute(configured)) throw new AnalysisCapabilityUnavailableError("wakaru", OPERATION$3, WAKARU_REQUIREMENT, { userMessage: WAKARU_REQUIREMENT });
			try {
				const selection = await selectArtifactCommandPath(configured, signal);
				await access(selection.resolvedPath, constants.R_OK | constants.X_OK);
				const fingerprint = await fingerprintRecoveryFile(selection.resolvedPath, RECOVERY_LIMITS.outputBytes, signal, resources);
				const limiter = environment.REA_JAVASCRIPT_PRLIMIT_COMMAND ?? "/usr/bin/prlimit";
				if (!isAbsolute(limiter)) throw new TypeError("REA_JAVASCRIPT_PRLIMIT_COMMAND must be absolute");
				const limiterSelection = await selectArtifactCommandPath(limiter, signal);
				await access(limiterSelection.resolvedPath, constants.X_OK);
				if (!(await stat(limiter)).isFile()) throw new TypeError(`Resource limiter is not a regular file: ${limiter}`);
				return {
					command: selection,
					limiter: limiterSelection,
					...fingerprint
				};
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError || cause instanceof AnalysisArtifactChangedError || cause instanceof ArtifactReaderFailure && (cause.cleanup !== undefined || cause.reason === "cancelled")) throw cause;
				const reason = `Configured Wakaru or util-linux prlimit is unavailable: ${errorMessage(cause)}`;
				throw new AnalysisCapabilityUnavailableError("wakaru", OPERATION$3, reason, {
					cause,
					userMessage: reason
				});
			}
		};
		runWakaruCommand = async (context) => {
			checkRecoveryDeadline(context.deadline, context.signal);
			const runId = `rea-wakaru-${randomUUID()}`;
			const spawned = await (context.launcher ?? spawnOwnedProviderProcess)({
				command: context.limiter,
				arguments: [...prlimitArgumentVector({
					address_space_bytes: RECOVERY_LIMITS.addressSpaceBytes,
					file_bytes: RECOVERY_LIMITS.outputBytes,
					cpu_seconds: RECOVERY_LIMITS.cpuSeconds
				}, context.command), ...context.arguments],
				expectedCommand: null,
				runId,
				cwd: context.cwd,
				hostEnvironment: context.environment,
				...context.signal === undefined ? {} : { signal: context.signal },
				env: {
					TMPDIR: context.cwd,
					RAYON_NUM_THREADS: "1",
					NO_COLOR: "1"
				}
			}).catch((cause) => {
				const cancellation = processInspectionCancellationError(cause, OPERATION$3);
				let primary;
				if (cancellation !== undefined) {
					primary = cancellation;
				} else {
					const physical = new ProviderAdapterError("wakaru", OPERATION$3, {
						cause,
						diagnostics: {
							reason: "Failed to launch configured Wakaru through util-linux prlimit",
							command: context.command,
							detail: errorMessage(cause)
						}
					});
					primary = context.signal?.aborted === true ? analysisErrorWithCancellation(physical, cancelledBy(OPERATION$3, context.signal)) : physical;
				}
				throw retainProcessInspectionCleanup(cause, primary, context.resources, OPERATION$3);
			});
			let oversized = false;
			const supervisor = new ProviderProcessSupervisor({
				...spawned,
				ownsProcessLifetime: true,
				cleanup: spawned.cleanup ?? (() => cleanupOwnedProcessGroup(spawned.ownership))
			}, {
				maxDiagnosticBytes: {
					stdout: RECOVERY_LIMITS.reportBytes,
					stderr: RECOVERY_LIMITS.reportBytes
				},
				onDiagnostic: (event) => {
					if (event.type === "output" && event.totalBytes > RECOVERY_LIMITS.reportBytes) oversized = true;
				}
			});
			let failure;
			try {
				while (!await supervisor.waitForOutputClose(100)) {
					checkRecoveryDeadline(context.deadline, context.signal);
					if (oversized) throw new AnalysisOutputError(OPERATION$3, "Wakaru diagnostic stream exceeds 8 MiB", wakaruFixedLimitRecovery(`Wakaru diagnostic stream exceeds the ${String(RECOVERY_LIMITS.reportBytes)}-byte report allowance`));
					if (context.staging !== undefined) await inventoryRecoveryFiles(context.staging, context.signal, context.resources);
				}
				checkRecoveryDeadline(context.deadline, context.signal);
				if (oversized) throw new AnalysisOutputError(OPERATION$3, "Wakaru diagnostic stream exceeds 8 MiB", wakaruFixedLimitRecovery(`Wakaru diagnostic stream exceeds the ${String(RECOVERY_LIMITS.reportBytes)}-byte report allowance`));
			} catch (cause) {
				failure = cause;
			}
			const stopped = await supervisor.stop();
			const snapshot = supervisor.snapshot();
			if (context.signal?.aborted === true) {
				const cancelled = cancelledBy(OPERATION$3, context.signal);
				if (failure === undefined || failure instanceof AnalysisError) failure = analysisErrorWithCancellation(failure, cancelled);
			}
			const captured = capturedProviderOutput(snapshot);
			if (failure instanceof AnalysisError) failure.retainCapturedOutput(captured);
			if (stopped.status === "incomplete") throw new WakaruCleanupFailure(supervisor, runId, context.cwd, stopped.reason, failure, snapshot);
			if (failure !== undefined) throw failure;
			return {
				exit_code: captured.exit_code ?? null,
				signal: captured.signal ?? null,
				stdout: captured.stdout,
				stderr: captured.stderr,
				command: context.command,
				arguments: [...context.arguments],
				resource_limiter: context.limiter
			};
		};
	})))();
}

//#endregion
//#region dist/javascript/recovery/WakaruReport.js
var warningSchema, reportSchema, rangeSchema, provenanceSchema, OPERATION$2, WakaruReportReadFailure, parseWakaruReports, PROVENANCE_REPORT_ALLOWANCE, readWakaruProvenanceReport, wakaruReportGuidance, validateModuleSet, validateRanges, utf8Boundary, recoveryRanges, validateRecoverySourceMap;
function init_WakaruReport() {
	return (init_WakaruReport = __esmMin((() => {
		init_safeJson();
		init_resources();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_RecoveryFiles();
		init_WakaruRelease();
		init_errorMessage();
		warningSchema = z.looseObject({
			filename: z.string(),
			kind: z.string(),
			is_error: z.boolean(),
			message: z.string()
		});
		reportSchema = z.looseObject({
			detected_formats: z.array(z.string()),
			safety: z.string(),
			modules: z.array(z.looseObject({
				filename: z.string().min(1),
				kind: z.literal("javascript"),
				status: z.string().min(1)
			})),
			warnings: z.array(warningSchema),
			total: z.int().nonnegative(),
			failed: z.int().nonnegative(),
			elapsed_ms: z.int().nonnegative()
		});
		rangeSchema = z.tuple([z.int().nonnegative(), z.int().nonnegative()]);
		provenanceSchema = z.looseObject({
			format: z.string(),
			strategy: z.string(),
			modules: z.record(z.string(), z.looseObject({
				input: z.string(),
				ranges: z.array(rangeSchema),
				extraction: z.string(),
				context_ranges: z.array(rangeSchema).optional()
			}))
		});
		OPERATION$2 = "recover_javascript_sources";
		WakaruReportReadFailure = class extends Error {
			failure;
			capturedOutput;
			constructor(failure, capturedOutput) {
				super(failure.message, { cause: failure });
				this.failure = failure;
				this.capturedOutput = capturedOutput;
			}
		};
		parseWakaruReports = async (context) => {
			const { execution, provenancePath, resources, signal } = context;
			try {
				if (execution.exit_code !== 0 && execution.exit_code !== 1) throw new TypeError("Wakaru did not complete recovery (expected exit 0 or a reported partial exit 1)");
				const report = reportSchema.parse(JSON.parse(execution.stdout));
				const decoded = safeParseUtf8Json(await readWakaruProvenanceReport(provenancePath, signal, resources));
				if (!decoded.ok) throw decoded.cause;
				const provenance = provenanceSchema.parse(decoded.value);
				if (report.total !== report.modules.length || report.failed > report.total) throw new TypeError("Reported module totals disagree");
				if (execution.exit_code === 1 && report.failed === 0 && !report.warnings.some((warning) => warning.is_error)) throw new TypeError("Wakaru exited 1 without a reported partial recovery reason");
				validateModuleSet(report, provenance, context);
				return {
					report,
					provenance,
					status: report.failed > 0 || report.warnings.some((warning) => warning.is_error) || execution.exit_code === 1 ? "partial" : "complete"
				};
			} catch (cause) {
				const capturedOutput = {
					stdout: execution.stdout,
					stderr: execution.stderr,
					exit_code: execution.exit_code,
					signal: execution.signal,
					truncated: false
				};
				if (cause instanceof AnalysisCancelledError || cause instanceof AnalysisAccessDeniedError || cause instanceof AnalysisArtifactChangedError) throw cause.retainCapturedOutput(capturedOutput);
				if (cause instanceof ArtifactReaderFailure && (cause.cleanup !== undefined || cause.reason === "cancelled")) throw new WakaruReportReadFailure(cause, capturedOutput);
				throw new ProviderAdapterError("wakaru", OPERATION$2, {
					cause,
					...wakaruReportGuidance(cause),
					diagnostics: {
						reason: `Unusable Wakaru recovery report: ${errorMessage(cause)}`,
						exit_code: execution.exit_code,
						signal: execution.signal,
						stdout: execution.stdout,
						stderr: execution.stderr
					}
				});
			}
		};
		PROVENANCE_REPORT_ALLOWANCE = `Wakaru provenance report exceeds the ${String(RECOVERY_LIMITS.reportBytes)}-byte report allowance`;
		readWakaruProvenanceReport = async (path, signal, resources) => {
			try {
				return await readRecoveryFile(path, RECOVERY_LIMITS.reportBytes, signal, resources);
			} catch (cause) {
				if (!isRecoveryFileSizeError(cause, RECOVERY_LIMITS.reportBytes)) throw cause;
				throw new AnalysisOutputError(OPERATION$2, PROVENANCE_REPORT_ALLOWANCE, {
					cause,
					...wakaruFixedLimitRecovery(PROVENANCE_REPORT_ALLOWANCE)
				});
			}
		};
		wakaruReportGuidance = (cause) => {
			if (typeof cause !== "object" || cause === null) return {};
			const userMessage = "userMessage" in cause && typeof cause.userMessage === "string" ? cause.userMessage : undefined;
			const remediationAction = "remediationAction" in cause && typeof cause.remediationAction === "string" ? cause.remediationAction : undefined;
			return {
				...userMessage === undefined ? {} : { userMessage },
				...remediationAction === undefined ? {} : { remediationAction }
			};
		};
		validateModuleSet = (report, provenance, context) => {
			const { files, snapshots } = context;
			const registry = new ArtifactPathRegistry();
			const expected = new Set(["provenance.json"]);
			const observed = new Set(files.map((file) => file.relativePath));
			for (const module of report.modules) {
				const path = normalizeArtifactPath(module.filename);
				if (path !== module.filename || !/\.(?:js|mjs|cjs)$/u.test(path)) throw new TypeError(`Unsupported module path: ${module.filename}`);
				registry.add(path, "file");
				if (!observed.has(path)) throw new TypeError(`Missing reported module file: ${path}`);
				expected.add(path);
				if (observed.has(`${path}.map`)) expected.add(`${path}.map`);
				const entry = provenance.modules[path];
				const sourceBytes = entry === undefined ? undefined : snapshots.get(entry.input);
				if (entry === undefined || sourceBytes === undefined) throw new TypeError(`Module provenance does not bind the selected input snapshot: ${path}`);
				validateRanges([...entry.ranges, ...entry.context_ranges ?? []], sourceBytes, path);
			}
			if (Object.keys(provenance.modules).length !== report.modules.length) throw new TypeError("Provenance and reported module sets disagree");
			for (const path of observed) if (!expected.has(path)) throw new TypeError(`Unreported recovery artifact: ${path}`);
		};
		validateRanges = (ranges, bytes, filename) => {
			for (const [start, end] of ranges) {
				if (start > end || end > bytes.length || !utf8Boundary(bytes, start) || !utf8Boundary(bytes, end)) throw new TypeError(`Invalid half-open UTF-8 byte range [${String(start)},${String(end)}) for ${filename}`);
			}
		};
		utf8Boundary = (bytes, offset) => {
			const value = bytes[offset];
			return value === undefined || (value & 192) !== 128;
		};
		recoveryRanges = (ranges) => ranges.map(([start, end]) => ({
			start,
			end
		}));
		validateRecoverySourceMap = (bytes, filename) => {
			const schema = z.object({
				version: z.literal(3),
				sources: z.array(z.string()),
				names: z.array(z.string()),
				mappings: z.string()
			});
			try {
				const decoded = safeParseUtf8Json(bytes);
				if (!decoded.ok) throw decoded.cause;
				schema.parse(decoded.value);
			} catch (cause) {
				throw new AnalysisOutputError(OPERATION$2, `Invalid emitted source map for ${filename}: ${errorMessage(cause)}`, { cause });
			}
		};
	})))();
}

//#endregion
//#region dist/javascript/recovery/WakaruProviderIdentity.js
var WAKARU_RELEASE, WAKARU_PROVIDER_IDENTITY;
function init_WakaruProviderIdentity() {
	return (init_WakaruProviderIdentity = __esmMin((() => {
		WAKARU_RELEASE = {
			version: "1.14.0",
			revision: "8219bf5016a063d7fb215101a8c45d5959ec733f",
			repository: "https://github.com/pionxzh/wakaru"
		};
		WAKARU_PROVIDER_IDENTITY = {
			id: "wakaru",
			name: "Wakaru",
			version: WAKARU_RELEASE.version
		};
	})))();
}

//#endregion
//#region dist/javascript/recovery/WakaruPublication.js
var publishWakaruArtifacts, publishModule;
function init_WakaruPublication() {
	return (init_WakaruPublication = __esmMin((() => {
		init_analysisErrorCore();
		init_javascriptRecovery$1();
		init_RecoveryFiles();
		init_sha256Hex();
		init_WakaruReport();
		init_WakaruRelease();
		init_WakaruProviderIdentity();
		publishWakaruArtifacts = async (context) => {
			const { tree, sources, parsed, staging, signal, resources } = context;
			const write = async (path, bytes) => {
				const sha256 = sha256Hex(bytes);
				const file = await tree.write(path, Readable.from([bytes]), {
					sha256,
					bytes: bytes.byteLength
				}, signal);
				return {
					path: join(tree.outputRoot, file.relativePath),
					sha256: file.sha256,
					bytes: file.bytesWritten
				};
			};
			const publishedSources = [];
			for (const selected of sources) {
				const { relative_path, ...source } = selected;
				const snapshot = await readRecoveryFile(source.snapshot_path, source.bytes, signal, resources);
				if (sha256Hex(snapshot) !== source.sha256) throw new AnalysisOutputError("recover_javascript_sources", `The input snapshot changed during recovery: ${source.path}`);
				publishedSources.push({
					...source,
					published_copy: await write(`inputs/${relative_path}`, snapshot)
				});
			}
			const [source, ...additionalSources] = publishedSources;
			const modules = [];
			for (const module of parsed.report.modules) {
				modules.push(await publishModule(context, module, write));
			}
			const report = await write("reports/stdout.json", Buffer.from(context.execution.stdout));
			const provenance = await write("reports/provenance.json", await readRecoveryFile(join(staging, "provenance.json"), RECOVERY_LIMITS.reportBytes, signal, resources));
			const details = {
				source,
				...additionalSources.length === 0 ? {} : { additional_sources: additionalSources },
				engine: {
					id: "wakaru",
					version: context.admitted.version,
					executable: {
						path: context.engine.command.resolvedPath,
						sha256: context.engine.sha256,
						bytes: context.engine.bytes
					},
					audited_source_revision: WAKARU_RELEASE.revision,
					executed_source_revision: null
				},
				options: {
					extraction_mode: context.input.extraction_mode,
					rewrite_level: context.input.rewrite_level
				},
				status: parsed.status,
				detected_formats: parsed.report.detected_formats,
				reported_safety: parsed.report.safety,
				reported_strategy: parsed.provenance.strategy,
				reported_format: parsed.provenance.format,
				total: parsed.report.total,
				failed: parsed.report.failed,
				modules,
				warnings: parsed.report.warnings.map(({ filename, kind, is_error, message }) => ({
					filename,
					kind,
					is_error,
					message
				})),
				report,
				provenance,
				analysis_input: modules.length === 0 ? null : {
					input_path: join(tree.outputRoot, "modules"),
					format: "directory"
				},
				runtime_equivalence: "unknown",
				limitations: [...RECOVERY_LIMITATIONS, ...context.admitted.status === "compatible" ? [context.admitted.limitation] : []]
			};
			const manifest = await write("manifest.json", Buffer.from(`${JSON.stringify(details, null, 2)}\n`));
			return javascriptRecoveryResultSchema.parse({
				...details,
				manifest
			});
		};
		publishModule = async (context, module, write) => {
			const { staging, sources, parsed, signal, resources } = context;
			const artifact = await write(`modules/${module.filename}`, await readRecoveryFile(join(staging, module.filename), RECOVERY_LIMITS.outputBytes, signal, resources));
			const mapPath = join(staging, `${module.filename}.map`);
			let sourceMap = null;
			const map = await readRecoveryFile(mapPath, RECOVERY_LIMITS.outputBytes, signal, resources).catch((cause) => {
				if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return null;
				throw cause;
			});
			if (map !== null) {
				validateRecoverySourceMap(map, module.filename);
				sourceMap = await write(`modules/${module.filename}.map`, map);
			}
			const provenance = parsed.provenance.modules[module.filename];
			if (provenance === undefined) throw new AnalysisOutputError("recover_javascript_sources", `Missing module provenance: ${module.filename}`);
			const origin = sources.find((source) => source.snapshot_path === provenance.input);
			if (origin === undefined) throw new AnalysisOutputError("recover_javascript_sources", `Unselected module provenance input: ${provenance.input}`);
			return {
				reported_filename: module.filename,
				reported_status: module.status,
				artifact,
				source_map: sourceMap,
				provenance: {
					reported_input: provenance.input,
					original_path: origin.path,
					original_sha256: origin.sha256,
					extraction: provenance.extraction,
					byte_ranges: recoveryRanges(provenance.ranges),
					context_byte_ranges: recoveryRanges(provenance.context_ranges ?? []),
					range_semantics: "half-open-utf8-bytes"
				}
			};
		};
	})))();
}

//#endregion
//#region dist/javascript/recovery/WakaruVersion.js
var wakaruReleaseLine, admitWakaruVersion;
function init_WakaruVersion() {
	return (init_WakaruVersion = __esmMin((() => {
		init_WakaruRelease();
		init_WakaruProviderIdentity();
		wakaruReleaseLine = () => `Wakaru ${WAKARU_ACCEPTED_RANGE} (verified with ${WAKARU_RELEASE.version})`;
		admitWakaruVersion = (banner) => {
			const token = banner.startsWith("wakaru ") ? banner.slice("wakaru ".length) : undefined;
			if (token === undefined || valid(token) !== token || !satisfies(token, "^1.13.0")) return {
				status: "unsupported",
				message: `Unsupported Wakaru version ${banner.length === 0 ? "missing" : banner}; accepted releases are ${wakaruReleaseLine()}`
			};
			if (token === WAKARU_RELEASE.version) return {
				status: "verified",
				version: token
			};
			return {
				status: "compatible",
				version: token,
				limitation: `This session uses Wakaru ${token}. The report parser is verified against ${WAKARU_RELEASE.version}; other ${WAKARU_ACCEPTED_RANGE} releases are accepted and the observed version is reported.`
			};
		};
	})))();
}

//#endregion
//#region dist/javascript/recovery/WakaruExecution.js
var OPERATION$1, MODES, executeWakaruRecovery, prepareWakaruExecution;
function init_WakaruExecution() {
	return (init_WakaruExecution = __esmMin((() => {
		init_ArtifactCommandPath();
		init_AnalysisProvider();
		init_analysisErrorCore();
		init_jsonValue();
		init_RecoveryFiles();
		init_WakaruCommand();
		init_WakaruReport();
		init_WakaruPublication();
		init_WakaruRelease();
		init_WakaruProviderIdentity();
		init_WakaruVersion();
		OPERATION$1 = "recover_javascript_sources";
		MODES = {
			structural: "strict",
			heuristic: "auto",
			inspection: "inspect"
		};
		executeWakaruRecovery = async (context) => {
			const { root, input, sources, engine, environment, launcher, options, resources } = context;
			const staging = join(root, "modules");
			const commandContext = {
				command: engine.command.invocationPath,
				limiter: engine.limiter.invocationPath,
				cwd: root,
				deadline: context.deadline,
				environment,
				...options?.signal === undefined ? {} : { signal: options.signal },
				...launcher === undefined ? {} : { launcher },
				resources
			};
			const run = async (execution) => {
				for (const selected of [engine.command, engine.limiter]) await assertArtifactCommandPath(selected, OPERATION$1, { signal: options?.signal });
				const output = await runWakaruCommand(execution);
				for (const selected of [engine.command, engine.limiter]) await assertArtifactCommandPath(selected, OPERATION$1, { capturedOutput: {
					stdout: output.stdout,
					stderr: output.stderr,
					exit_code: output.exit_code,
					signal: output.signal,
					truncated: false
				} });
				return output;
			};
			const version = await run({
				...commandContext,
				arguments: ["--version"]
			});
			const admitted = version.exit_code === 0 ? admitWakaruVersion(version.stdout.trim()) : undefined;
			if (admitted === undefined || admitted.status === "unsupported") {
				const mismatch = `${admitted?.message ?? `Wakaru --version failed; reported version: ${version.stdout.trim()}`}; exit: ${String(version.exit_code)}`;
				throw new AnalysisCapabilityUnavailableError("wakaru", OPERATION$1, `${mismatch}; stderr: ${version.stderr}`, { userMessage: `${mismatch}.` });
			}
			const execution = await run({
				...commandContext,
				staging,
				arguments: [
					...sources.map((source) => source.snapshot_path),
					`--unpack=${MODES[input.extraction_mode]}`,
					`--level=${input.rewrite_level}`,
					"--provenance",
					"--emit-source-map",
					"--json",
					"-o",
					staging
				]
			});
			const files = await inventoryRecoveryFiles(staging, options?.signal, resources);
			const snapshots = new Map();
			for (const source of sources) snapshots.set(source.snapshot_path, await readRecoveryFile(source.snapshot_path, source.bytes, options?.signal, resources));
			const parsed = await parseWakaruReports({
				execution,
				provenancePath: join(staging, "provenance.json"),
				snapshots,
				files,
				...options?.signal === undefined ? {} : { signal: options.signal },
				resources
			});
			return {
				version,
				admitted,
				run: execution,
				parsed
			};
		};
		prepareWakaruExecution = async (context) => {
			const { root, tree, input, sources, engine, options, resources } = context;
			const [source] = sources;
			const staging = join(root, "modules");
			const { version, admitted, run, parsed } = await executeWakaruRecovery(context);
			const result = await publishWakaruArtifacts({
				tree,
				staging,
				input,
				sources,
				engine,
				admitted,
				parsed,
				execution: run,
				...options?.signal === undefined ? {} : { signal: options.signal },
				resources
			});
			for (const selected of sources) {
				const current = await fingerprintRecoveryFile(selected.path, RECOVERY_LIMITS.inputBytes, options?.signal, resources);
				if (current.sha256 !== selected.sha256 || current.bytes !== selected.bytes) throw new AnalysisArtifactChangedError(OPERATION$1, selected.path, `Original input changed during recovery: ${selected.path}`, { diagnostics: {
					expected_sha256: selected.sha256,
					observed_sha256: current.sha256,
					expected_bytes: selected.bytes,
					observed_bytes: current.bytes
				} });
			}
			const currentEngine = await fingerprintRecoveryFile(engine.command.resolvedPath, RECOVERY_LIMITS.outputBytes, options?.signal, resources);
			if (currentEngine.sha256 !== engine.sha256) throw new AnalysisArtifactChangedError(OPERATION$1, engine.command.invocationPath, "Configured engine bytes changed during recovery", { diagnostics: {
				expected_sha256: engine.sha256,
				observed_sha256: currentEngine.sha256
			} });
			return createAnalysisExecution(result, {
				...WAKARU_PROVIDER_IDENTITY,
				version: admitted.version
			}, {
				rawResult: jsonValueSchema.parse({
					version,
					execution: run,
					report: parsed.report,
					provenance: parsed.provenance
				}),
				subject: {
					path: source.path,
					sha256: source.sha256,
					format: "javascript"
				},
				locations: [...sources.map((selected) => ({
					kind: "artifact-path",
					path: selected.path
				})), ...result.modules.map((module) => ({
					kind: "artifact-path",
					path: module.artifact.path
				}))],
				limitations: result.limitations
			});
		};
	})))();
}

//#endregion
//#region dist/javascript/recovery/WakaruProvider.js
var OPERATION, WakaruProvider;
function init_WakaruProvider() {
	return (init_WakaruProvider = __esmMin((() => {
		init_snapshotEnvironment();
		init_HostPlatform();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCancellation();
		init_analysisErrorCore();
		init_javascriptRecovery$1();
		init_providerAdapterError();
		init_providerCleanupError();
		init_result();
		init_RecoveryFiles();
		init_WakaruCommand();
		init_WakaruExecution();
		init_WakaruRelease();
		init_WakaruReport();
		init_errorMessage();
		OPERATION = "recover_javascript_sources";
		WakaruProvider = class {
			environment;
			launcher;
			host;
			#resources = new ArtifactResourceScope();
			#tail = Promise.resolve();
			#closing = false;
			#closePromise;
			#pendingCleanup;
			constructor(environment = process.env, launcher, host = HOST_PLATFORM) {
				this.environment = environment;
				this.launcher = launcher;
				this.host = host;
			}
			/** Recover selected scripts using validated reports and verified output bytes. */
			recover(input, options) {
				if (this.#closing) return Promise.resolve(err(this.#closedError()));
				const operation = this.#tail.then(() => this.#closing ? err(this.#closedError()) : this.#recover(input, options));
				this.#tail = operation.then(() => undefined, () => undefined);
				return operation;
			}
			#closedError() {
				return new AnalysisCapabilityUnavailableError("wakaru", OPERATION, "Provider is closing");
			}
			async #recover(input, options) {
				const pending = await this.#retire();
				if (pending !== undefined) return err(pending);
				const environment = snapshotEnvironment(this.environment, this.host.platform);
				let root;
				let tree;
				let failed;
				let execution;
				const deadline = performance.now() + RECOVERY_LIMITS.timeoutMs;
				try {
					checkRecoveryCancellation(options?.signal);
					const engine = await resolveWakaruCommand(environment, this.host, this.#resources, options?.signal);
					root = await mkdtemp(join(tmpdir(), "rea-wakaru-"));
					const inputs = join(root, "inputs");
					const staging = join(root, "modules");
					await mkdir(inputs, { mode: 448 });
					await mkdir(staging, { mode: 448 });
					const sources = await snapshotRecoveryInputs([input.path, ...input.additional_paths ?? []], inputs, options?.signal, this.#resources);
					try {
						tree = await SafeOutputTree.create(input.output_directory);
					} catch (cause) {
						if (cause instanceof SafeOutputTreeCreationFailure) tree = cause.tree;
						throw recoveryInputFailure("output_directory", `Cannot create new recovery directory ${input.output_directory}: ${errorMessage(cause)}`, cause);
					}
					execution = await prepareWakaruExecution({
						root,
						tree,
						resources: this.#resources,
						input,
						sources,
						engine,
						environment,
						launcher: this.launcher,
						options,
						deadline
					});
					checkRecoveryDeadline(deadline, options?.signal);
					await rm(root, {
						recursive: true,
						force: true
					});
					root = undefined;
					checkRecoveryDeadline(deadline, options?.signal);
					await tree.commit(options?.signal);
				} catch (cause) {
					failed = { cause };
				}
				if (failed !== undefined) {
					const reportFailure = failed.cause instanceof WakaruReportReadFailure ? failed.cause : undefined;
					const primary = reportFailure?.failure ?? failed.cause;
					let failure = primary instanceof ArtifactReaderFailure && primary.reason === "cancelled" && primary.cleanup === undefined ? cancelledBy(OPERATION, carriedReason(artifactFileCancellationCause(primary)), {
						...primary.partialObservation === undefined ? {} : { partialObservation: primary.partialObservation },
						...reportFailure === undefined ? {} : { capturedOutput: reportFailure.capturedOutput }
					}) : primary;
					const residuals = [];
					const cleanupFailures = [];
					const cleanupOwner = failure instanceof WakaruCleanupFailure ? failure.cleanupOwner : undefined;
					let failedTree;
					try {
						await tree?.rollback();
					} catch (cause) {
						if (tree !== undefined) {
							failedTree = tree;
							residuals.push(tree.outputRoot);
							cleanupFailures.push({
								resource: tree.outputRoot,
								reason: errorMessage(cause)
							});
						}
					}
					if (cleanupOwner !== undefined) residuals.push(cleanupOwner.launch.ownership?.runId ?? "wakaru-worker");
					const filesPending = this.#resources.hasPending;
					if (filesPending) residuals.push(...this.#resources.cleanupResources);
					if (root !== undefined && cleanupOwner === undefined && !filesPending) {
						const failedRoot = root;
						try {
							await rm(failedRoot, {
								recursive: true,
								force: true
							});
							root = undefined;
						} catch (cause) {
							residuals.push(failedRoot);
							cleanupFailures.push({
								resource: failedRoot,
								reason: errorMessage(cause)
							});
						}
					}
					if (cleanupOwner !== undefined || failedTree !== undefined || root !== undefined || filesPending) {
						const resources = {
							root,
							process: cleanupOwner,
							tree: failedTree
						};
						const files = this.#resources;
						const lease = new AnalysisCleanupLease(() => this.#releasePending(resources), { get cleanupResources() {
							return [
								...files.cleanupResources,
								...resources.process === undefined ? [] : [resources.process.launch.ownership?.runId ?? "wakaru-worker"],
								...resources.tree === undefined ? [] : [resources.tree.outputRoot],
								...resources.root === undefined ? [] : [resources.root]
							];
						} });
						this.#pendingCleanup = {
							resources,
							lease
						};
						if (root !== undefined) residuals.push(root);
						root = undefined;
					}
					const signal = options?.signal;
					if (signal?.aborted === true) {
						const analysisFailure = failure instanceof AnalysisError ? failure : new ProviderAdapterError("wakaru", OPERATION, {
							cause: failure,
							diagnostics: { reason: errorMessage(failure) },
							...failure instanceof ArtifactReaderFailure && failure.partialObservation !== undefined ? { partialObservation: failure.partialObservation } : {},
							...reportFailure === undefined ? {} : { capturedOutput: reportFailure.capturedOutput }
						});
						failure = analysisErrorWithCancellation(analysisFailure, cancelledBy(OPERATION, signal));
					}
					if (residuals.length > 0) {
						const error = new ProviderCleanupError("wakaru", residuals, {
							...failure instanceof WakaruCleanupFailure ? failure.diagnostics : {},
							previous_error: failure instanceof WakaruCleanupFailure ? failure.diagnostics?.previous_error ?? null : errorMessage(failure),
							cleanup_failures: cleanupFailures
						}, {
							operation: OPERATION,
							cause: failure,
							...failure instanceof AnalysisError ? {
								cleanupPrimary: failure,
								capturedOutput: failure.capturedOutput
							} : {},
							...reportFailure === undefined ? {} : { capturedOutput: reportFailure.capturedOutput },
							...tree?.published && execution !== undefined ? { partialObservation: {
								kind: "javascript-recovery",
								result: javascriptRecoveryResultSchema.parse(execution.result)
							} } : (failure instanceof AnalysisError || failure instanceof ArtifactReaderFailure) && failure.partialObservation !== undefined ? { partialObservation: failure.partialObservation } : {}
						});
						const lease = this.#pendingCleanup?.lease;
						if (lease !== undefined) {
							if (failure instanceof WakaruCleanupFailure) lease.bindCleanupError(failure);
							lease.bindCleanupError(error);
							error.bindCleanupResourceOwner(lease);
						}
						return err(error);
					}
					if (tree?.published === true && execution !== undefined) return ok(execution);
					return err(failure instanceof AnalysisError ? failure : new ProviderAdapterError("wakaru", OPERATION, {
						cause: failure,
						diagnostics: { reason: errorMessage(failure) },
						...reportFailure === undefined ? {} : { capturedOutput: reportFailure.capturedOutput }
					}));
				}
				return execution === undefined ? err(new AnalysisOutputError(OPERATION, "Recovery returned no execution")) : ok(execution);
			}
			async close() {
				this.#closing = true;
				this.#closePromise ??= this.#tail.then(async () => {
					const failure = await this.#retire();
					if (failure !== undefined) throw failure;
				}).catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #retire() {
				const pending = this.#pendingCleanup;
				if (pending === undefined) return undefined;
				try {
					await pending.lease.release();
					this.#pendingCleanup = undefined;
					return undefined;
				} catch (cause) {
					const error = new ProviderCleanupError("wakaru", pending.lease.cleanupResources ?? [], { reason: errorMessage(cause) }, {
						operation: OPERATION,
						cause
					}).bindCleanupResourceOwner(pending.lease);
					pending.lease.bindCleanupError(error);
					return error;
				}
			}
			async #releasePending(pending) {
				if (pending.process !== undefined) {
					const stopped = await pending.process.stop();
					if (stopped.status === "incomplete") throw new Error(stopped.reason);
					pending.process = undefined;
				}
				await this.#resources.retryCleanup();
				if (pending.tree !== undefined) {
					await pending.tree.rollback();
					pending.tree = undefined;
				}
				if (pending.root !== undefined) {
					await rm(pending.root, {
						recursive: true,
						force: true
					});
					pending.root = undefined;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/composition/javascriptRecovery.js
var createJavaScriptRecoveryProvider;
function init_javascriptRecovery() {
	return (init_javascriptRecovery = __esmMin((() => {
		init_WakaruProvider();
		init_HostPlatform();
		createJavaScriptRecoveryProvider = (environment = process.env, launcher, host = HOST_PLATFORM) => new WakaruProvider(environment, launcher, host);
	})))();
}

//#endregion
//#region dist/cli/javascriptRecoveryCommands.js
var javascriptRecoveryCommands_exports = /* @__PURE__ */ __exportAll({ registerJavaScriptRecoveryCommands: () => registerJavaScriptRecoveryCommands });
var registerJavaScriptRecoveryCommands;
function init_javascriptRecoveryCommands() {
	return (init_javascriptRecoveryCommands = __esmMin((() => {
		init_JavaScriptRecoveryService();
		init_javascriptRecovery();
		init_javascriptRecoveryToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		init_projectCliAnalysisResult();
		registerJavaScriptRecoveryCommands = (cli, logger, environment) => {
			const service = new JavaScriptRecoveryService(createJavaScriptRecoveryProvider(environment));
			registerContractCommand(cli, logger, contractNamed(JAVASCRIPT_RECOVERY_TOOL_CONTRACTS, "recover_javascript_sources"), {
				description: "Recover readable JavaScript modules with source provenance and verified files",
				positionals: ["path", "output_directory"],
				fields: { additional_paths: { name: "additionalPath" } }
			}, (input, { operation, signal }) => finishAnalysisCommand(() => service.recover(input, { signal }), service, "wakaru", operation, signal).then(projectCliAnalysisResult));
		};
	})))();
}

//#endregion
export { init_javascriptRecoveryCommands, javascriptRecoveryCommands_exports };