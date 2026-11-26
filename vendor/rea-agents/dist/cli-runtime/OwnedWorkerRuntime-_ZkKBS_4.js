import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { ProcessAdmissionError, init_ProcessAdmissionError } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { cleanupOwnedProcessGroup, init_ProcessOwnership } from "./ProcessOwnership-CezAYpow.js";

//#region dist/process/OwnedWorkerRuntime.js
var OwnedWorkerRuntime_exports = /* @__PURE__ */ __exportAll({ OwnedWorkerRuntime: () => OwnedWorkerRuntime });
var WorkerCleanupRegistry, processWorkerCleanup, OwnedWorkerRuntimeCleanupError, OwnedWorkerRuntimeCleanupEpoch, releasedCleanupOwner, bindCleanupOwner, OwnedWorkerRuntime;
function init_OwnedWorkerRuntime() {
	return (init_OwnedWorkerRuntime = __esmMin((() => {
		init_ProcessAdmissionError();
		init_PrivateRuntimeRoot();
		init_ProviderProcess();
		init_ProcessOwnership();
		init_errorMessage();
		WorkerCleanupRegistry = class {
			#pending = new Set();
			has(runtime) {
				return this.#pending.has(runtime);
			}
			add(runtime) {
				this.#pending.add(runtime);
			}
			delete(runtime) {
				this.#pending.delete(runtime);
			}
			async retry(except) {
				const failures = [];
				for (const owner of [...this.#pending]) {
					if (owner === except) continue;
					try {
						await owner.retryRetainedCleanup();
					} catch (cause) {
						failures.push(cause);
					}
				}
				if (failures.length === 1) throw failures[0];
				if (failures.length > 1) throw new AggregateError(failures, "Owned worker cleanup remains incomplete");
			}
		};
		processWorkerCleanup = new WorkerCleanupRegistry();
		OwnedWorkerRuntimeCleanupError = class extends Error {
			cleanupResources;
			processId;
			#cleanupEpoch;
			constructor(cleanupResources, processId, message, cleanupEpoch, options) {
				super(message, options);
				this.cleanupResources = cleanupResources;
				this.processId = processId;
				this.name = "OwnedWorkerRuntimeCleanupError";
				this.#cleanupEpoch = cleanupEpoch;
			}
			bindCleanupFailure(error) {
				bindCleanupOwner(error, this.#cleanupEpoch);
			}
		};
		OwnedWorkerRuntimeCleanupEpoch = class {
			rootPath;
			#released = false;
			#runId;
			constructor(rootPath) {
				this.rootPath = rootPath;
			}
			get cleanupReleased() {
				return this.#released;
			}
			get cleanupResources() {
				return this.#released ? [] : [...this.#runId === undefined ? [] : [this.#runId], this.rootPath];
			}
			setRunId(runId) {
				if (!this.#released) this.#runId = runId;
			}
			release() {
				this.#released = true;
			}
		};
		releasedCleanupOwner = {
			cleanupResources: [],
			cleanupReleased: true
		};
		bindCleanupOwner = (error, epoch) => {
			const owner = epoch ?? releasedCleanupOwner;
			error.bindCleanupResourceOwner(owner);
			error.bindCleanupReleaseClaim(owner);
		};
		OwnedWorkerRuntime = class {
			options;
			#registry;
			#root;
			#cleanupEpoch;
			#supervisor;
			#acquisition;
			#cleanupRetryAttempt;
			#stopAttempt;
			#closeAttempt;
			#closing = false;
			#closed = false;
			#lastRunId;
			#terminalCloseRequested = false;
			#inputFailure;
			#launchFailure;
			#stdinGeneration = 0;
			#stdoutListeners = new Set();
			constructor(options) {
				this.options = options;
				this.#registry = options.cleanupRegistry ?? processWorkerCleanup;
			}
			get rootPath() {
				return this.#root?.path;
			}
			/** Exposes the exact supervisor so consumers retain their protocol policy. */
			get supervisor() {
				return this.#supervisor;
			}
			get cleanupResources() {
				const resources = [...this.#supervisor === undefined ? [] : [this.#supervisor.launch.ownership?.runId ?? this.#lastRunId], ...this.#root === undefined ? [] : [this.#root.path]].filter((resource) => resource !== undefined);
				return resources.length === 0 ? [] : resources;
			}
			/** Whether this exact owner still retains an unconfirmed resource release. */
			get hasPendingCleanup() {
				return this.#registry.has(this);
			}
			/** First error observed on the current child's request stream, if any. */
			get inputFailure() {
				return this.#inputFailure;
			}
			/** Failure observed at the current launcher call, without reclassifying its cause. */
			get launchFailure() {
				return this.#launchFailure;
			}
			/** Keep a returned typed cleanup error live until this exact owner releases. */
			bindCleanupFailure(error) {
				bindCleanupOwner(error, this.#cleanupEpoch);
			}
			/** Mark this still-owned runtime for retry before any consumer starts a child. */
			retainForCleanup() {
				this.#registry.add(this);
			}
			/** Retry every retained runtime in this host's registry. */
			retryCohort() {
				return this.#registry.retry();
			}
			/** Called by the owning registry. Not a process-wide sweep. */
			retryRetainedCleanup() {
				return this.#retryPending();
			}
			/** Retry runtimes left on the process registry by owners that named no host. */
			static async retryPending(except) {
				await processWorkerCleanup.retry(except);
			}
			/**
			* Acquire one child and let the protocol owner complete its own handshake.
			* Close waits for this entire callback, including a late handshake.
			*/
			start(spawnOptions, initialize) {
				if (this.#terminalCloseRequested || this.#closing) return Promise.reject(new ProcessAdmissionError("runtime_closing"));
				if (this.#acquisition !== undefined) return this.#acquisition;
				if (this.#supervisor !== undefined && !this.#registry.has(this)) return Promise.resolve();
				if (this.options.retryCleanup !== undefined && this.#registry.has(this)) return this.#retryOwnedCleanup().then(() => {
					if (this.#terminalCloseRequested || this.#closing) throw new ProcessAdmissionError("runtime_closing");
					return this.start(spawnOptions, initialize);
				});
				const ownRetry = this.#registry.has(this) ? this.#retryPending() : Promise.resolve();
				this.#launchFailure = undefined;
				const acquisition = ownRetry.then(async () => {
					if (this.#closed) this.#closed = false;
					await this.#start(spawnOptions, initialize);
				});
				this.#acquisition = acquisition;
				void acquisition.finally(() => {
					if (this.#acquisition === acquisition) this.#acquisition = undefined;
				}).catch(() => undefined);
				return acquisition;
			}
			/** Attach protocol stdout while ensuring it is detached before process stop. */
			onStdout(listener) {
				const stream = this.#supervisor?.launch.process.stdout;
				if (stream === null || stream === undefined) throw new ProcessAdmissionError("stdout_missing");
				stream.on("data", listener);
				this.#stdoutListeners.add({
					stream,
					listener
				});
			}
			stop() {
				if (this.#stopAttempt !== undefined) return this.#stopAttempt;
				const attempt = this.#stop();
				this.#stopAttempt = attempt;
				void attempt.finally(() => {
					if (this.#stopAttempt === attempt) this.#stopAttempt = undefined;
				}).catch(() => undefined);
				return attempt;
			}
			/** Stop the exact child before releasing its root; every failure is retryable. */
			close() {
				this.#terminalCloseRequested = true;
				this.#closing = true;
				if (this.#closed) return Promise.resolve();
				if (this.#closeAttempt !== undefined) return this.#closeAttempt;
				const attempt = this.#close();
				this.#closeAttempt = attempt;
				void attempt.finally(() => {
					if (this.#closeAttempt === attempt) this.#closeAttempt = undefined;
				}).catch(() => undefined);
				return attempt;
			}
			async #retryPending() {
				if (this.options.retryCleanup !== undefined) return this.#retryOwnedCleanup();
				if (this.#terminalCloseRequested) return this.close();
				this.#closing = true;
				if (this.#closeAttempt === undefined) {
					const attempt = this.#close();
					this.#closeAttempt = attempt;
					void attempt.finally(() => {
						if (this.#closeAttempt === attempt) this.#closeAttempt = undefined;
					}).catch(() => undefined);
				}
				const attempt = this.#closeAttempt;
				if (attempt === undefined) return;
				try {
					await attempt;
					if (!this.#terminalCloseRequested) {
						this.#closed = false;
						this.#closing = false;
					}
				} catch (cause) {
					if (!this.#terminalCloseRequested) this.#closing = false;
					throw cause;
				}
			}
			#retryOwnedCleanup() {
				if (this.#cleanupRetryAttempt !== undefined) return this.#cleanupRetryAttempt;
				const attempt = Promise.resolve().then(() => this.options.retryCleanup?.()).then(() => {
					if (this.#registry.has(this)) throw this.#cleanupError("Higher-level cleanup retry returned while ownership remains pending");
				});
				this.#cleanupRetryAttempt = attempt;
				void attempt.finally(() => {
					if (this.#cleanupRetryAttempt === attempt) this.#cleanupRetryAttempt = undefined;
				}).catch(() => undefined);
				return attempt;
			}
			async #start(spawnOptions, initialize) {
				await this.#registry.retry(this);
				if (this.#closing) throw new ProcessAdmissionError("runtime_closing");
				this.#root ??= await PrivateRuntimeRoot.create({ prefix: this.options.rootPrefix });
				this.#cleanupEpoch ??= new OwnedWorkerRuntimeCleanupEpoch(this.#root.path);
				if (this.#closing) throw new ProcessAdmissionError("runtime_closing");
				this.#lastRunId = spawnOptions.runId;
				let spawned;
				try {
					spawned = await (this.options.launcher ?? spawnOwnedProviderProcess)({
						...spawnOptions,
						cwd: this.#root.path
					});
				} catch (cause) {
					this.#launchFailure = { cause };
					throw cause;
				}
				this.#inputFailure = undefined;
				this.#observeStdin(spawned.process.stdin);
				this.#cleanupEpoch.setRunId(spawned.ownership?.runId ?? spawnOptions.runId);
				this.#supervisor = new ProviderProcessSupervisor({
					...spawned,
					ownsProcessLifetime: true,
					cleanup: spawned.cleanup ?? (() => cleanupOwnedProcessGroup(spawned.ownership))
				}, this.options.supervisorOptions);
				if (this.#closing) throw new ProcessAdmissionError("runtime_closing");
				await initialize?.(this.#supervisor);
				if (this.#closing) throw new ProcessAdmissionError("runtime_closing");
			}
			async #stop() {
				const acquisition = this.#acquisition;
				if (acquisition !== undefined) await acquisition.catch(() => undefined);
				const supervisor = this.#supervisor;
				if (supervisor === undefined) return { status: "already-exited" };
				this.#detachStdout();
				const stopped = await supervisor.stop();
				if (stopped.status === "incomplete") {
					this.#registry.add(this);
					const stdin = supervisor.launch.process.stdin;
					if (stdin !== undefined && stdin !== null && !stdin.destroyed && !stdin.writableEnded) {
						try {
							stdin.end();
						} catch {}
					}
					return stopped;
				}
				supervisor.dispose();
				this.#supervisor = undefined;
				this.#cleanupEpoch?.setRunId(undefined);
				return stopped;
			}
			async #close() {
				const acquisition = this.#acquisition;
				if (acquisition !== undefined) await acquisition.catch(() => undefined);
				const stopped = await this.stop();
				if (stopped.status === "incomplete") throw this.#cleanupError(stopped.reason);
				if (this.#root !== undefined) {
					try {
						await this.#root.close();
						this.#root = undefined;
						this.#cleanupEpoch?.release();
						this.#cleanupEpoch = undefined;
					} catch (cause) {
						this.#registry.add(this);
						throw this.#cleanupError(errorMessage(cause), cause);
					}
				}
				this.#closed = true;
				this.#registry.delete(this);
			}
			#detachStdout() {
				for (const { stream, listener } of this.#stdoutListeners) stream.off("data", listener);
				this.#stdoutListeners.clear();
			}
			#observeStdin(stream) {
				if (stream === null || stream === undefined) return;
				const generation = ++this.#stdinGeneration;
				const onError = (cause) => {
					if (generation !== this.#stdinGeneration || this.#inputFailure !== undefined) return;
					this.#inputFailure = cause instanceof Error ? cause : new ProcessAdmissionError("request_stream_failed", undefined, { cause });
					this.options.onInputFailure?.(this.#inputFailure);
				};
				const onClose = () => {
					stream.off("error", onError);
					stream.off("close", onClose);
				};
				stream.on("error", onError);
				stream.once("close", onClose);
			}
			#cleanupError(reason, cause) {
				const resources = this.cleanupResources ?? [];
				return new OwnedWorkerRuntimeCleanupError(resources, this.#supervisor?.launch.process.pid ?? null, reason, this.#cleanupEpoch, cause === undefined ? undefined : { cause });
			}
		};
	})))();
}

//#endregion
export { OwnedWorkerRuntime, OwnedWorkerRuntimeCleanupError, OwnedWorkerRuntime_exports, WorkerCleanupRegistry, init_OwnedWorkerRuntime, processWorkerCleanup };