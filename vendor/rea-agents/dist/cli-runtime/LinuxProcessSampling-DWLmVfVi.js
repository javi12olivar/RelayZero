import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProcessOwnershipInspectionCancelled, ProcessRunTokenReadError, init_LinuxProcessStat, init_ProcessInspectionCancellation, init_ProcessInspectionCleanup, init_ProcessInspectionFile, init_ProcessRunTokenObservations, isProcessInspectionFailure, isProcessOwnershipInspectionCancellation, parseLinuxProcessStat, processInspectionCancellations, readProcessInspectionFile } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { readdir, readlink } from "node:fs/promises";

//#region dist/process/capture/ProcessSamplingObservation.js
async function settleSamplingReads(reads) {
	const outcomes = await Promise.allSettled(reads);
	if (outcomes.some((outcome) => outcome.status === "rejected")) throw new SamplingReadBatchFailure(outcomes);
	return outcomes.flatMap((outcome) => outcome.status === "fulfilled" ? [outcome.value] : []);
}
var SamplingReadBatchFailure, samplingInspectionFailures, mergeSamplingDiagnostics, samplingObservation, samplingFailure, samplingInterrupted, readSamplingSource, samplingReadObservation, readProcSamplingSource;
function init_ProcessSamplingObservation() {
	return (init_ProcessSamplingObservation = __esmMin((() => {
		init_ProcessInspectionCleanup();
		init_ProcessInspectionCancellation();
		init_ProcessRunTokenObservations();
		init_result();
		SamplingReadBatchFailure = class SamplingReadBatchFailure extends AggregateError {
			#outcomes;
			#inspectionFailures;
			#otherFailures;
			get outcomes() {
				return this.#outcomes;
			}
			get inspectionFailures() {
				return this.#inspectionFailures;
			}
			get otherFailures() {
				return this.#otherFailures;
			}
			constructor(outcomes) {
				const rejected = outcomes.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
				super(rejected, "Admitted process sampling reads failed");
				this.name = "SamplingReadBatchFailure";
				this.#outcomes = outcomes;
				this.#inspectionFailures = [...new Set(rejected.flatMap(samplingInspectionFailures))];
				this.#otherFailures = rejected.flatMap((failure) => failure instanceof SamplingReadBatchFailure ? failure.otherFailures : isProcessInspectionFailure(failure) ? [] : [failure]);
			}
		};
		samplingInspectionFailures = (cause) => cause instanceof SamplingReadBatchFailure ? cause.inspectionFailures : isProcessInspectionFailure(cause) ? [cause] : [];
		mergeSamplingDiagnostics = (...parts) => ({
			count: parts.reduce((count, part) => count + part.count, 0),
			first: parts.find((part) => part.first !== null)?.first ?? null,
			interrupted: parts.some((part) => part.interrupted)
		});
		samplingObservation = (value, ...diagnostics) => ({
			value,
			diagnostics: mergeSamplingDiagnostics(...diagnostics)
		});
		samplingFailure = (diagnostic) => ({
			count: 1,
			first: diagnostic,
			interrupted: false
		});
		samplingInterrupted = () => ({
			count: 0,
			first: null,
			interrupted: true
		});
		readSamplingSource = async (source, signal, read) => {
			if (signal.aborted) return err({
				kind: "cancelled",
				reason: signal.reason
			});
			try {
				return ok(await read());
			} catch (cause) {
				const cancellation = ProcessOwnershipInspectionCancelled.from(cause);
				if (signal.aborted && isProcessOwnershipInspectionCancellation(cancellation) && processInspectionCancellations(cancellation).every((fact) => fact.reason === signal.reason)) return err({
					kind: "cancelled",
					reason: signal.reason
				});
				const inspection = cancellation ?? cause;
				if (isProcessInspectionFailure(inspection) || inspection instanceof SamplingReadBatchFailure) throw inspection;
				if (cause instanceof ProcessRunTokenReadError && cause.availability === "absent") return err({ kind: "process-exited" });
				const systemCode = cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
				const reason = cause instanceof Error ? `${cause.name}: ${cause.message}` : String(cause);
				return err({
					kind: "unavailable",
					systemCode,
					diagnostic: `${source}: ${systemCode === undefined ? "" : `${systemCode}: `}${reason}`
				});
			}
		};
		samplingReadObservation = (result) => result.ok ? samplingObservation(result.value) : samplingObservation(undefined, result.error.kind === "cancelled" ? samplingInterrupted() : result.error.kind === "process-exited" ? mergeSamplingDiagnostics() : samplingFailure(result.error.diagnostic));
		readProcSamplingSource = async (path, signal, read) => {
			const result = await readSamplingSource(path, signal, read);
			if (!result.ok && result.error.kind === "unavailable" && (result.error.systemCode === "ENOENT" || result.error.systemCode === "ESRCH")) return samplingObservation(undefined);
			return samplingReadObservation(result);
		};
	})))();
}

//#endregion
//#region dist/process/capture/LinuxProcessSampling.js
var PROC_READ_CONCURRENCY, readLinuxProcessStat, systemLinuxChildrenHost, readLinuxChildren, readStableLinuxProcessDetails, inspectStableLinuxProcess, readLinuxCommand, readLinuxOpenFiles, inspectLinuxProcessMetadata, inspectLinuxProcess;
function init_LinuxProcessSampling() {
	return (init_LinuxProcessSampling = __esmMin((() => {
		init_ProcessInspectionFile();
		init_LinuxProcessStat();
		init_ProcessSamplingObservation();
		PROC_READ_CONCURRENCY = 64;
		readLinuxProcessStat = async (pid, signal) => {
			const path = `/proc/${String(pid)}/stat`;
			const read = await readProcSamplingSource(path, signal, () => readProcessInspectionFile(path, signal));
			if (read.value === undefined) return samplingObservation(undefined, read.diagnostics);
			const parsed = parseLinuxProcessStat(read.value);
			if (parsed === undefined || parsed.pid !== pid) return samplingObservation(undefined, read.diagnostics, samplingFailure(`${path}: malformed process identity`));
			if (parsed.processGroupId <= 0 || parsed.sessionId <= 0) return samplingObservation(undefined, read.diagnostics);
			return samplingObservation({
				pid: parsed.pid,
				parent_pid: parsed.parentPid,
				process_group_id: parsed.processGroupId,
				session_id: parsed.sessionId,
				command: "",
				startTime: parsed.startTime,
				lifecycle: parsed.lifecycle
			}, read.diagnostics);
		};
		systemLinuxChildrenHost = {
			async taskIds(pid) {
				const entries = await readdir(`/proc/${String(pid)}/task`);
				return entries.filter((entry) => /^\d+$/u.test(entry)).map(Number).filter((taskId) => Number.isSafeInteger(taskId) && taskId > 0).sort((left, right) => left - right);
			},
			children(pid, taskId, signal) {
				return readProcessInspectionFile(`/proc/${String(pid)}/task/${String(taskId)}/children`, signal);
			}
		};
		readLinuxChildren = async (pid, signal, host = systemLinuxChildrenHost) => {
			const tasks = await readProcSamplingSource(`/proc/${String(pid)}/task`, signal, () => host.taskIds(pid, signal));
			if (tasks.value === undefined) return samplingObservation(undefined, tasks.diagnostics);
			if (tasks.value.length === 0) return samplingObservation([], tasks.diagnostics);
			const children = new Set();
			let diagnostics = tasks.diagnostics;
			let successfulReads = 0;
			let offset = 0;
			for (; offset < tasks.value.length && !signal.aborted; offset += 64) {
				const texts = await settleSamplingReads(tasks.value.slice(offset, offset + 64).map((taskId) => readProcSamplingSource(`/proc/${String(pid)}/task/${String(taskId)}/children`, signal, () => host.children(pid, taskId, signal))));
				for (const text of texts) {
					diagnostics = mergeSamplingDiagnostics(diagnostics, text.diagnostics);
					if (text.value === undefined) continue;
					successfulReads += 1;
					for (const value of text.value.trim().split(/\s+/u)) {
						if (!/^\d+$/u.test(value)) continue;
						const child = Number(value);
						if (Number.isSafeInteger(child) && child > 0) children.add(child);
					}
				}
			}
			if (offset < tasks.value.length && signal.aborted) diagnostics = mergeSamplingDiagnostics(diagnostics, samplingInterrupted());
			return samplingObservation(successfulReads === 0 ? undefined : [...children].sort((a, b) => a - b), diagnostics);
		};
		readStableLinuxProcessDetails = async (before, readStat, readDetails) => {
			if (before.value === undefined) return samplingObservation(undefined, before.diagnostics);
			const details = await readDetails(before.value);
			const after = await readStat();
			const diagnostics = mergeSamplingDiagnostics(before.diagnostics, details.diagnostics, after.diagnostics);
			if (after.value === undefined || before.value.pid !== after.value.pid || before.value.startTime !== after.value.startTime || before.value.parent_pid !== after.value.parent_pid) return samplingObservation(undefined, diagnostics);
			return samplingObservation({
				row: before.value,
				details: details.value
			}, diagnostics);
		};
		inspectStableLinuxProcess = async (pid, signal, lineage, readDetails) => {
			const readStat = () => readLinuxProcessStat(pid, signal);
			const before = await readStat();
			const { expectedParent, identities } = lineage;
			const existing = identities.get(pid);
			if (existing !== undefined && existing !== before.value?.startTime || expectedParent !== undefined && before.value?.parent_pid !== expectedParent) return samplingObservation(undefined, before.diagnostics);
			return readStableLinuxProcessDetails(before, readStat, readDetails);
		};
		readLinuxCommand = async (pid, signal) => {
			const path = `/proc/${String(pid)}/cmdline`;
			const command = await readProcSamplingSource(path, signal, () => readProcessInspectionFile(path, signal));
			return samplingObservation(command.value?.toString().replaceAll("\0", " ").trim() ?? "", command.diagnostics);
		};
		readLinuxOpenFiles = async (pid, signal) => {
			const directory = `/proc/${String(pid)}/fd`;
			const listing = await readProcSamplingSource(directory, signal, () => readdir(directory));
			const paths = [];
			let diagnostics = listing.diagnostics;
			for (const descriptor of listing.value ?? []) {
				if (signal.aborted) {
					diagnostics = mergeSamplingDiagnostics(diagnostics, samplingInterrupted());
					break;
				}
				const path = `${directory}/${descriptor}`;
				const target = await readProcSamplingSource(path, signal, () => readlink(path));
				diagnostics = mergeSamplingDiagnostics(diagnostics, target.diagnostics);
				if (target.value?.startsWith("/")) paths.push(target.value.replace(/ \(deleted\)$/u, ""));
			}
			return samplingObservation(paths, diagnostics);
		};
		inspectLinuxProcessMetadata = async (pid, expectedParent, signal, identities) => {
			const observed = await inspectStableLinuxProcess(pid, signal, {
				expectedParent,
				identities
			}, () => readLinuxCommand(pid, signal));
			return samplingObservation(observed.value === undefined ? undefined : {
				...observed.value.row,
				command: observed.value.details
			}, observed.diagnostics);
		};
		inspectLinuxProcess = async (pid, expectedParent, signal, identities) => {
			const observed = await inspectStableLinuxProcess(pid, signal, {
				expectedParent,
				identities
			}, async () => {
				const [command, children] = await settleSamplingReads([readLinuxCommand(pid, signal), readLinuxChildren(pid, signal)]);
				return samplingObservation({
					command: command.value,
					children: children.value
				}, command.diagnostics, children.diagnostics);
			});
			return samplingObservation(observed.value === undefined ? undefined : {
				...observed.value.row,
				...observed.value.details
			}, observed.diagnostics);
		};
	})))();
}

//#endregion
export { SamplingReadBatchFailure, init_LinuxProcessSampling, init_ProcessSamplingObservation, inspectLinuxProcess, inspectLinuxProcessMetadata, mergeSamplingDiagnostics, readLinuxChildren, readLinuxCommand, readLinuxOpenFiles, readLinuxProcessStat, readProcSamplingSource, readSamplingSource, readStableLinuxProcessDetails, samplingInspectionFailures, samplingInterrupted, samplingObservation, samplingReadObservation, settleSamplingReads };