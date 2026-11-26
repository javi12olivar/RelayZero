import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_strictUtf8, isStrictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, mergeEnvironmentOverrides } from "./snapshotEnvironment-ftfZc5dr.js";
import { WindowsOwnedProcess, init_WindowsOwnedProcess, init_launchFailure, nameSpawnedExecutable } from "./ExecFileOutput-YDVPmL3I.js";
import { DarwinProcessOwnershipInspectionError, ProcessAdmissionError, ProcessOwnershipEvidenceOwner, assertProcessOwnershipInspectionActive, init_DarwinProcessRunTokenReader, init_ProcessAdmissionError, init_ProcessInspectionCancellation, init_ProcessInspectionCleanup, init_ProcessOwnershipEvidence, init_ProcessOwnershipObservation, prepareProcessOwnershipInspection, processInspectionCleanupFailures, systemProcessOwnershipHost } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { AnalysisCleanupRelease, init_analysisCleanupRelease } from "./analysisCleanupRelease-ME3hxZPc.js";
import { isUtf8 } from "node:buffer";
import { spawn } from "node:child_process";

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
export { JVM_EXHAUSTION_DETAILS, ProviderProcessSupervisor, RUNTIME_EXHAUSTION_AREAS, RUNTIME_EXHAUSTION_TOKENS, externalJvmExhaustionRecovery, init_ProviderProcess, init_RuntimeExhaustion, jvmExhaustionArea, runtimeExhaustion, runtimeExhaustionReport, spawnOwnedProviderProcess };