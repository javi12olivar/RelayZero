import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { OwnerCancellation, errorMessage, init_analysisErrorCore, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { RegularFileCleanupFailure, init_OwnedRegularFile } from "./resources-B3P64jvH.js";
import { init_launchFailure, launcherFailureOf } from "./ExecFileOutput-YDVPmL3I.js";
import { DarwinProcessOwnershipInspectionError, ProcessOwnershipIdentityBatchFailure, ProcessOwnershipInspectionCancelled, assertProcessOwnershipInspectionActive, init_DarwinProcessRunTokenReader, init_ProcessInspectionCancellation, init_ProcessOwnershipObservation, prepareProcessOwnershipInspection, systemProcessOwnershipHost } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { cleanupOwnedProcessGroup, init_ProcessOwnership } from "./ProcessOwnership-CezAYpow.js";
import { AbortedWait, init_AbortablePromise, waitForAbortable } from "./AbortablePromise-CvIbazUz.js";
import { ProviderStartupDeadline, init_ProviderDeadline, waitForAbortableDelay } from "./ProviderDeadline-BXAnhNBa.js";
import { Transform, Writable, finished } from "node:stream";
import { pipeline as pipeline$1 } from "node:stream/promises";

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
export { OwnedCommandFailure, OwnedCommandStdoutBytes, init_OwnedCommand, ownedCommandResources, preparationHostCapacityFailure, prepareOwnedCommand, runOwnedCommand };