import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, MAX_NODE_TIMER_DELAY_MS, OwnerCancellation, errorMessage, init_analysisErrorCore, init_analysisResourceLimits, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_safeJson, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { FileReadCancelled, OwnedFileHandle, RegularFileCancelled, RegularFileCleanupFailure, RegularFileOperationCancelled, init_OwnedFileHandle, init_OwnedRegularFile, init_RegularFile, init_readFileHandleChunks, readFileHandleChunks, regularFileCancellation, withOwnedFileHandle } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS, init_providerStartupTimeout, providerStartupTimeoutSchema } from "./providerStartupTimeout-DNZGsNYA.js";
import { ExecFileOutputCancelledError, execFileFailureCapturedOutput, execFileOutput, execFileOutputFailure, init_ExecFileOutput, init_launchFailure, launchExhaustedResource, spawnCapacityExhausted } from "./ExecFileOutput-YDVPmL3I.js";
import { AnalysisCleanupRelease, init_analysisCleanupRelease } from "./analysisCleanupRelease-ME3hxZPc.js";
import { init_utf8HeadExcerpt, utf8HeadExcerpt } from "./utf8HeadExcerpt-BO0eOwRw.js";
import { createDarwinHelperCache, darwinHelperCacheDirectory, init_DarwinHelperCache } from "./DarwinHelperCache-Rk6edZtl.js";
import { constants, rmSync, writeSync } from "node:fs";
import { basename, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { access, mkdir, mkdtemp, open, readlink, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { setTimeout as setTimeout$1 } from "node:timers/promises";
import { performance } from "node:perf_hooks";

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
export { DARWIN_PROCESS_OWNERSHIP_REMEDIATION, DarwinProcessOwnershipInspectionError, LINUX_PROCESS_OWNERSHIP_REMEDIATION, LinuxOwnedProcessPrerequisiteError, PROCESS_CLEANUP_VERIFICATION_GRACE_MS, ProcessAdmissionError, ProcessOwnershipEvidenceOwner, ProcessOwnershipIdentityBatchFailure, ProcessOwnershipInspectionCancelled, ProcessRunTokenReadError, SWIFTC_INTERRUPT, assertProcessOwnershipInspectionActive, descendantsOf, describeSystemPs, init_DarwinProcessRunTokenReader, init_LinuxProcessStat, init_ProcessAdmissionError, init_ProcessInspectionCancellation, init_ProcessInspectionCleanup, init_ProcessInspectionFile, init_ProcessLifecycle, init_ProcessOwnershipEvidence, init_ProcessOwnershipIdentity, init_ProcessOwnershipObservation, init_ProcessOwnershipProcessTree, init_ProcessRunTokenObservations, init_systemPs, isProcessInspectionFailure, isProcessOwnershipInspectionCancellation, launcherIdentityFailure, liveProcesses, observeOwnedProcessGroups, observeOwnedProcessLineage, observeProcessStartIdentity, observeProcessStartIdentityExit, parseLinuxProcessStat, prepareProcessOwnershipInspection, processIdentityHasExited, processIdentityIsExiting, processInspectionCancellations, processInspectionCleanupFailures, processOwnershipAdmissionRecovery, processRunIdFromEnvironment, readNativeProcessIdentityMap, readProcessInspectionFile, readProcessOwnershipFacts, readProcessRunTokens, readRunTokenCarriers, reobserveUnavailableTokenFacts, resolveSystemPs, rethrowProcessInspectionFailure, selectCapturedProcessGroupIds, settleExitingProcessIdentities, settleVanishedTokenFacts, signalProcessWithStartIdentity, systemProcessOwnershipHost, waitForProcessOwnershipInspection };