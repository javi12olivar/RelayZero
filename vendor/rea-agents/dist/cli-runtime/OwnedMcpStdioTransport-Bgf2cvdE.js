import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { OwnerCancellation, errorMessage, init_analysisErrorCore, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_strictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, init_AnalysisCleanupLease, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader, init_ProcessInspectionCleanup, processInspectionCleanupFailures } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { cleanupOwnedProcessGroup, init_ProcessOwnership } from "./ProcessOwnership-CezAYpow.js";
import { randomUUID } from "node:crypto";
import { finished } from "node:stream/promises";
import { deserializeMessage, serializeMessage } from "@modelcontextprotocol/client";

//#region dist/process/OwnedMcpStdioTransport.js
var OwnedMcpStdioTransport;
function init_OwnedMcpStdioTransport() {
	return (init_OwnedMcpStdioTransport = __esmMin((() => {
		init_strictUtf8();
		init_analysisErrorCore();
		init_budget();
		init_ProviderProcess();
		init_ProcessOwnership();
		init_DarwinProcessRunTokenReader();
		init_ProcessInspectionCleanup();
		init_providerCleanupError();
		init_resources();
		init_errorMessage();
		OwnedMcpStdioTransport = class {
			options;
			settings;
			launcher;
			onclose;
			onerror;
			onmessage;
			runId = randomUUID();
			#spawned;
			#supervisor;
			#frameBuffer = Buffer.alloc(0);
			#frameLength = 0;
			/** Output charged to the current operation; stays over once it is exceeded. */
			#bytes;
			#started = false;
			#closed = false;
			#cleanup = new AnalysisCleanupLease(() => this.#stop(), [this.runId]);
			#starting;
			/** Preparation cleanup owners a failed launch transferred and that closed. */
			#releasedPreparations = new Set();
			/** Ends a launch still resolving or spawning when the transport closes. */
			#acquisition = new AbortController();
			#failure;
			constructor(options, settings, launcher = spawnOwnedProviderProcess) {
				this.options = options;
				this.settings = settings;
				this.launcher = launcher;
				if (settings.maxOperationBytes !== undefined) this.#bytes = new Budget(settings.maxOperationBytes);
			}
			/** Acquires exactly one protocol process after the SDK installs callbacks. */
			start() {
				if (this.#started || this.#closed) throw new Error(`${this.settings.label} transport cannot be restarted`);
				this.#started = true;
				this.#starting = this.#acquire().catch((cause) => {
					this.#failure ??= {
						kind: "process",
						cause
					};
					throw cause;
				});
				return this.#starting;
			}
			async #acquire() {
				const spawned = await this.launcher({
					...this.options,
					runId: this.runId,
					stdin: "pipe",
					signal: this.options.signal === undefined ? this.#acquisition.signal : AbortSignal.any([this.options.signal, this.#acquisition.signal])
				});
				this.#spawned = spawned;
				this.#supervisor = new ProviderProcessSupervisor({
					...spawned,
					ownsProcessLifetime: true,
					cleanup: spawned.cleanup ?? (() => cleanupOwnedProcessGroup(spawned.ownership))
				}, {
					captureStdout: false,
					...this.settings.maxDiagnosticBytes === undefined ? {} : { maxDiagnosticBytes: this.settings.maxDiagnosticBytes }
				});
				if (spawned.process.stdin === undefined || spawned.process.stdin === null || spawned.process.stdout === null) throw new Error(`${this.settings.label} launcher did not supply protocol stdin/stdout`);
				spawned.process.stdout.on("data", this.#read);
				spawned.process.stdout.on("error", this.#error);
				spawned.process.stderr?.on("data", this.#countStderr);
				if (this.settings.onStderr !== undefined) spawned.process.stderr?.on("data", this.settings.onStderr);
				spawned.process.on("error", this.#error);
				spawned.process.once("exit", this.#exit);
				spawned.process.once("close", this.#outputClosed);
				spawned.process.stdin.on("error", this.#error);
				if (this.#closed) throw new Error(`${this.settings.label} transport closed during startup`);
			}
			/** Writes SDK-serialized messages and observes stream backpressure. */
			async send(message) {
				const input = this.#spawned?.process.stdin;
				if (this.#closed || input === undefined || input === null) throw new Error(`${this.settings.label} protocol process is not writable`);
				await new Promise((resolve, reject) => {
					try {
						input.write(serializeMessage(message), (cause) => {
							if (cause === null || cause === undefined) resolve();
							else {
								this.#failure ??= {
									kind: "process",
									cause
								};
								reject(cause);
							}
						});
					} catch (cause) {
						this.#failure ??= {
							kind: "process",
							cause
						};
						reject(cause);
					}
				});
			}
			/** Verifies owned process exit before declaring the transport closed. */
			close() {
				this.#closed = true;
				return this.#cleanup.release();
			}
			/** Keep the interruption reason distinct from errors produced by its teardown. */
			interrupt(reason) {
				this.#failure ??= {
					kind: "interrupted",
					reason
				};
				return this.close();
			}
			/** Captured provider stderr without persisting inherited environment values. */
			diagnostics() {
				const owner = this.#supervisor;
				if (owner === undefined) return undefined;
				const snapshot = owner.snapshot();
				return {
					stdout: "",
					stderr: snapshot.stderr.text,
					stderr_bytes: snapshot.stderr.observedBytes,
					truncated: snapshot.diagnosticTruncated === true || !owner.observedOutputClose(),
					...snapshot.exitCode === undefined ? {} : { exit_code: snapshot.exitCode },
					...snapshot.signal === undefined ? {} : { signal: snapshot.signal }
				};
			}
			/** Preserve the failed protocol/resource constraint after the SDK closes requests. */
			observedFailure() {
				return this.#failure;
			}
			/**
			* Stop the retained process from holding the host's event loop after its
			* cleanup failed; a later close restores the references for the retry.
			*/
			detach() {
				this.#supervisor?.unref();
			}
			/** Scope both the byte budget and diagnostic retention to the next serialized request. */
			beginOperation() {
				this.#bytes?.restore(0);
				this.#supervisor?.resetOutput();
			}
			async #stop() {
				this.#frameBuffer = Buffer.alloc(0);
				this.#frameLength = 0;
				this.#acquisition.abort(OwnerCancellation.ownerClosed);
				const startFailure = await this.#starting?.then(() => undefined, (cause) => cause);
				const process = this.#spawned?.process;
				process?.stdout?.off("data", this.#read);
				process?.stdout?.off("error", this.#error);
				process?.stderr?.off("data", this.#countStderr);
				process?.off("error", this.#error);
				process?.off("exit", this.#exit);
				process?.off("close", this.#outputClosed);
				const input = process?.stdin;
				const inputClosed = input === undefined || input === null ? undefined : finished(input, {
					readable: false,
					cleanup: true
				}).catch(() => undefined);
				const gracefulInputCloseMs = this.settings.gracefulInputCloseMs ?? 0;
				if (input !== undefined && input !== null && gracefulInputCloseMs > 0) {
					input.end();
					await this.#supervisor?.waitForExit(gracefulInputCloseMs);
				}
				const stopped = await this.#supervisor?.stop();
				input?.destroy();
				await inputClosed;
				input?.off("error", this.#error);
				if (this.settings.onStderr !== undefined) process?.stderr?.off("data", this.settings.onStderr);
				this.onclose?.();
				if (stopped?.status === "incomplete") {
					const failure = new ProviderCleanupError(this.settings.provider, [this.runId], {
						reason: stopped.reason,
						stderr: this.diagnostics()?.stderr ?? ""
					}, {
						...this.settings.operation === undefined ? {} : { operation: this.settings.operation },
						...this.settings.capturedOutput === undefined ? {} : { capturedOutput: this.settings.capturedOutput() }
					});
					new AnalysisCleanupLeaseGroup(failure, [this.#cleanup]);
					throw failure;
				}
				for (const preparation of processInspectionCleanupFailures(startFailure)) await this.#releasePreparation(preparation);
			}
			/**
			* Close one transferred preparation owner. Until it closes (or when the
			* launch reported a failure without an owner) the close fails and a later
			* close retries it.
			*/
			async #releasePreparation(preparation) {
				const darwin = preparation instanceof DarwinProcessOwnershipInspectionError;
				const owner = darwin ? preparation.cleanupOwner : preparation.owner;
				if (owner !== undefined && this.#releasedPreparations.has(owner)) return;
				let reason = preparation.message;
				if (owner !== undefined) try {
					await owner.close();
					this.#releasedPreparations.add(owner);
					return;
				} catch (cause) {
					reason = errorMessage(cause);
				}
				const failure = new ProviderCleanupError(this.settings.provider, [darwin ? "process ownership inspection" : preparation.path], { reason }, {
					cause: preparation,
					...this.settings.operation === undefined ? {} : { operation: this.settings.operation }
				});
				new AnalysisCleanupLeaseGroup(failure, [this.#cleanup], { preserveResourceAttribution: true });
				throw failure;
			}
			#error = (error) => {
				this.#failure ??= {
					kind: "process",
					cause: error
				};
				this.onerror?.(error);
				void this.close().catch((cause) => this.onerror?.(cause instanceof Error ? cause : new Error(String(cause))));
			};
			#exit = () => {
				this.#failure ??= { kind: "exit" };
				if (this.settings.notifyOnExit === true) this.onclose?.();
			};
			#outputClosed = () => {
				if (this.settings.notifyOnExit !== true) this.onclose?.();
			};
			#countStderr = (chunk) => {
				this.#countOperationBytes(Buffer.byteLength(chunk));
			};
			/** Charge output to the operation budget; false once it is exceeded. */
			#countOperationBytes(bytes) {
				const budget = this.#bytes;
				if (budget === undefined) return true;
				budget.chargeOverCommitting(bytes);
				if (budget.overCommitted === 0) return true;
				const limit = budget.maximum;
				this.#failLimit("operation", limit, `${this.settings.label} operation output exceeds ${limit} bytes; no complete result is available`);
				return false;
			}
			#read = (chunk) => {
				if (this.#closed) return;
				const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
				if (!this.#countOperationBytes(bytes.length)) return;
				try {
					let offset = 0;
					while (offset < bytes.length) {
						const newline = bytes.indexOf(10, offset);
						const end = newline === -1 ? bytes.length : newline;
						const fragment = bytes.subarray(offset, end);
						const frameBytes = this.#frameLength + fragment.length;
						if (frameBytes > this.settings.maxFrameBytes) {
							this.#failLimit("frame", this.settings.maxFrameBytes, `${this.settings.label} MCP frame exceeds ${this.settings.maxFrameBytes} bytes`);
							return;
						}
						this.#appendFrame(fragment, frameBytes);
						if (newline === -1) return;
						const line = decodeStrictUtf8(this.#frameBuffer.subarray(0, this.#frameLength), "preserve");
						this.#frameBuffer = Buffer.alloc(0);
						this.#frameLength = 0;
						this.onmessage?.(deserializeMessage(line));
						offset = newline + 1;
					}
				} catch (cause) {
					this.#fail(cause instanceof Error ? cause : new Error(String(cause)));
				}
			};
			#appendFrame(fragment, frameBytes) {
				if (frameBytes > this.#frameBuffer.length) {
					const capacity = Math.min(this.settings.maxFrameBytes, Math.max(frameBytes, this.#frameBuffer.length * 2, 1));
					const grown = Buffer.allocUnsafe(capacity);
					this.#frameBuffer.copy(grown, 0, 0, this.#frameLength);
					this.#frameBuffer = grown;
				}
				fragment.copy(this.#frameBuffer, this.#frameLength);
				this.#frameLength = frameBytes;
			}
			#fail(error) {
				this.#failure ??= {
					kind: "protocol",
					cause: error
				};
				this.#error(error);
			}
			/** Record a fixed output ceiling the process exceeded, then fail the session. */
			#failLimit(scope, limit, message) {
				const cause = new Error(message);
				this.#failure ??= {
					kind: "output_limit",
					scope,
					ceiling: {
						name: `The ${this.settings.label} ${scope === "frame" ? "frame" : "operation output"} allowance of ${String(limit)} bytes`,
						kind: "bytes",
						limit,
						unit: "bytes"
					},
					cause
				};
				this.#error(cause);
			}
		};
	})))();
}

//#endregion
export { OwnedMcpStdioTransport, init_OwnedMcpStdioTransport };