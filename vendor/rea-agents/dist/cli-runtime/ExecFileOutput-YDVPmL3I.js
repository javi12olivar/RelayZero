import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { RuntimeControlUnavailableError, init_WindowsNativeLoader, init_runtimeControlUnavailableError, requireWindowsNativeAuthority, windowsHandleSchema } from "./WindowsNativeLoader-CCqowxwW.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { z } from "zod";
import { PassThrough, Writable } from "node:stream";
import { EventEmitter } from "node:events";
import { execFile, spawn } from "node:child_process";

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
export { ExecFileOutputCancelledError, WindowsNativeSpawnControlError, WindowsOwnedProcess, describeLaunchFailure, execFileBytes, execFileFailureCapturedOutput, execFileOutput, execFileOutputFailure, init_ExecFileOutput, init_WindowsOwnedProcess, init_launchFailure, launchExhaustedResource, launcherFailureOf, nameSpawnedExecutable, spawnCapacityExhausted, windowsNativeSpawnControlError };