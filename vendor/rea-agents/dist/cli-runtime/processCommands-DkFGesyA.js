import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisResourceConstraintError, EvidenceFileError, EvidenceIntegrityError, MAX_NODE_TIMER_DELAY_MS, OwnerCancellation, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_errorMessage, init_evidenceErrors, init_jsonValue, init_localPath, isAborted, jsonValueSchema, localPathStringSchema, primaryAnalysisError } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, mergeEnvironmentOverrides, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { init_executableSearch, posixPathCandidates } from "./executableSearch-B91ds2Qv.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { CLI_COMMANDS, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliLogging, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, FileReadCancelled, OwnedDirectoryHandle, OwnedFileHandle, OwnedRegularFileOperationFailure, RegularFileCancelled, RegularFileCleanupFailure, RegularFileOperationCancelled, artifactPrimaryCleanupLeases, bindArtifactFileCleanup, decodeDirectoryEntryName, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedDirectoryHandle, init_OwnedFileHandle, init_OwnedRegularFile, init_RegularFile, init_decodeDirectoryEntryName, init_readFileHandleChunks, init_resources, readFileHandleChunks, sameRegularFileState, withOwnedFileHandle } from "./resources-B3P64jvH.js";
import { analysisErrorWithCleanupDependencies, init_analysisErrorCleanup } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { execFileOutput, init_ExecFileOutput } from "./ExecFileOutput-YDVPmL3I.js";
import { describeValidationFailure, digestProcessCommitment, firstValidationIssue, hasCaptureTruncation, init_evidenceFormat, init_evidenceValidation, init_processCapture, init_processCaptureCoverage, init_processCaptureParsing, init_processScenario, init_symlinkTarget, init_validationFailure, isUnsupportedEvidenceFormat, observedSymlinkTarget, parseProcessCapture, partialProcessCaptureObservationSchema, processComparisonContract, processScenarioCommitment, processScenarioSchema, sensitiveProcessInputProjection, unsupportedEvidenceFormatError, validationIssueOptions } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_EvidenceInputResolver, resolveEvidenceRequest } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { init_JsonFiles, jsonFileReadCleanupLeases, readJsonFile } from "./JsonFiles-CvkLtuRa.js";
import { PROCESS_COMPARISON_DIMENSIONS, PROCESS_PROVIDER, SESSION_TOOL_CONTRACTS, compareProcessCaptureEvidence, init_processComparison, init_processComparisonContracts, init_processComparisonEvidence, init_processEvidenceProvider, init_sessionToolContracts, processComparisonInputSchema } from "./sessionToolContracts-D9XcfL6p.js";
import { createProgressReporter, init_ProgressReporter } from "./ProgressReporter-B-0u8rUo.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { DarwinProcessOwnershipInspectionError, ProcessAdmissionError, ProcessOwnershipEvidenceOwner, ProcessOwnershipIdentityBatchFailure, init_DarwinProcessRunTokenReader, init_ProcessAdmissionError, init_ProcessInspectionCancellation, init_ProcessInspectionCleanup, init_ProcessOwnershipEvidence, init_ProcessOwnershipObservation, init_ProcessOwnershipProcessTree, init_systemPs, isProcessInspectionFailure, isProcessOwnershipInspectionCancellation, observeOwnedProcessGroups, observeProcessStartIdentity, prepareProcessOwnershipInspection, processInspectionCancellations, processInspectionCleanupFailures, resolveSystemPs, selectCapturedProcessGroupIds, signalProcessWithStartIdentity, systemProcessOwnershipHost } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { cleanupFailureFollowedSignal, cleanupOwnedProcessGroup, init_ProcessOwnership, readProcessRunId } from "./ProcessOwnership-CezAYpow.js";
import { AbortedWait, init_AbortablePromise, waitForAbortable } from "./AbortablePromise-CvIbazUz.js";
import { createProcessCaptureEvidence, createProcessScenarioPlanEvidence, init_ProcessEvidence, parseProcessCaptureEvidence, wrongWorkflowIssueFacts } from "./ProcessEvidence-Cg4ucez4.js";
import { SamplingReadBatchFailure, init_LinuxProcessSampling, init_ProcessSamplingObservation, inspectLinuxProcess, inspectLinuxProcessMetadata, mergeSamplingDiagnostics, readLinuxProcessStat, readProcSamplingSource, readSamplingSource, samplingInterrupted, samplingObservation, samplingReadObservation, settleSamplingReads } from "./LinuxProcessSampling-DWLmVfVi.js";
import { createRequire } from "node:module";
import { constants, statSync } from "node:fs";
import { basename, dirname, isAbsolute, join, relative, sep } from "node:path";
import { z } from "zod";
import { createHash, randomUUID } from "node:crypto";
import { access, lstat, mkdtemp, open, opendir, readlink, realpath, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { setImmediate, setTimeout as setTimeout$1 } from "node:timers/promises";
import { isIP } from "node:net";

//#region dist/application/process/ProcessComparisonService.js
var compareProcessEvidence, compareParsedProcessEvidence, readProcessComparisonSource, unsupportedProcessCaptureProvider, comparisonUnknownInput;
function init_ProcessComparisonService() {
	return (init_ProcessComparisonService = __esmMin((() => {
		init_processComparisonContracts();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_validationFailure();
		init_evidenceErrors();
		init_evidenceValidation();
		init_processComparison();
		init_processComparisonEvidence();
		init_processEvidenceProvider();
		init_result();
		init_ProcessEvidence();
		init_EvidenceInputResolver();
		compareProcessEvidence = (input, lookup, options = {}) => {
			const selected = resolveEvidenceRequest("compare_process_captures", input, processComparisonInputSchema, lookup, options);
			if (!selected.ok) return selected;
			const request = selected.value.input;
			const left = readProcessComparisonSource("left", request.left);
			if (!left.ok) return left;
			const right = readProcessComparisonSource("right", request.right);
			if (!right.ok) return right;
			return compareParsedProcessEvidence(left.value, right.value, {
				...request.max_capture_age_ms === undefined ? {} : { maxCaptureAgeMs: request.max_capture_age_ms },
				...request.trace_spec === undefined ? {} : { traceSpecification: request.trace_spec }
			});
		};
		compareParsedProcessEvidence = (left, right, options = {}) => {
			try {
				const { comparison, evidence } = compareProcessCaptureEvidence(left, right, options);
				return ok({
					evidence,
					sources: [left.record, right.record],
					unknown: comparisonUnknownInput({
						left_evidence_id: left.record.evidence_id,
						right_evidence_id: right.record.evidence_id,
						comparison_evidence_id: evidence.evidence_id
					}, comparison)
				});
			} catch (cause) {
				if (cause instanceof AnalysisError) return err(cause);
				throw cause;
			}
		};
		readProcessComparisonSource = (side, value, projectFailure) => {
			const operation = "compare_process_captures";
			const parsed = parseProcessCaptureEvidence(value);
			if (parsed.ok) return parsed;
			const failure = parsed.error;
			if (projectFailure !== undefined) return err(projectFailure(failure, side, value));
			switch (failure.kind) {
				case "invalid-evidence": return err(new EvidenceIntegrityError(`${side} Evidence failed validation`, {
					cause: failure.cause,
					side,
					...validationIssueOptions(failure.cause, []),
					userMessage: `The ${side} Evidence failed validation (${describeValidationFailure(failure.cause)}). Supply unmodified capture Evidence from capture_process_scenario.`
				}));
				case "wrong-workflow": return err(new AnalysisInputError(operation, undefined, [{
					path: [side],
					reason: "invalid_value",
					message: `Expected process capture Evidence (operation ${failure.expected.operation}, predicate ${failure.expected.predicate}); the ${side} Evidence has operation ${failure.actual.operation} and predicate ${failure.actual.predicate}.`,
					...wrongWorkflowIssueFacts(failure)
				}]));
				case "unsupported-provider": return err(unsupportedProcessCaptureProvider(side, failure));
				case "invalid-capture": return err(new EvidenceIntegrityError(`${side} process capture failed validation`, {
					cause: failure.cause,
					side,
					...validationIssueOptions(failure.cause, ["normalized_result"]),
					userMessage: `The ${side} Evidence has an invalid process capture result (${describeValidationFailure(failure.cause)}). Recreate the capture with capture_process_scenario.`
				}));
			}
		};
		unsupportedProcessCaptureProvider = (side, failure) => new AnalysisInputError("compare_process_captures", undefined, [{
			path: [side, "provider"],
			reason: "invalid_value",
			message: `The ${side} Evidence provider ${failure.provider.id} v${failure.provider.version} (${failure.provider.name}) is not the current or supported legacy ${PROCESS_PROVIDER.id} v${PROCESS_PROVIDER.version} process capture provider.`
		}]);
		comparisonUnknownInput = (parsed, comparison) => {
			if (comparison.status === "unchanged") return undefined;
			const differingScopes = PROCESS_COMPARISON_DIMENSIONS.filter((dimension) => comparison[dimension] !== "unchanged").join(", ");
			const contradictory = comparison.status === "changed" && parsed.left_evidence_id !== parsed.right_evidence_id;
			return {
				question: `${contradictory ? "Process captures disagree" : `Process comparison is ${comparison.status}`} across: ${differingScopes} (comparison ${parsed.comparison_evidence_id})`,
				severity: "high",
				domain: "process-comparison",
				supporting_evidence_ids: contradictory ? [parsed.left_evidence_id] : [...new Set([parsed.left_evidence_id, parsed.right_evidence_id])],
				contradicting_evidence_ids: contradictory ? [parsed.right_evidence_id] : [],
				required_authority: "controlled-replay",
				required_confidence: "observed",
				required_environment: null,
				recommended_probes: [{
					operation: "capture_process_scenario",
					rationale: "Repeat both scenarios under the same controlled environment."
				}],
				relationships: []
			};
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessCaptureError.js
var ProcessCaptureError, describeProcessCaptureExecutionFailure, captureCancellationPresentation, processCaptureCancelled, ProcessCaptureInspectionFailure, ProcessCaptureSamplingFailure, captureInspectionFailures, normalizeCaptureFailure, retainCaptureInspectionCancellations;
function init_ProcessCaptureError() {
	return (init_ProcessCaptureError = __esmMin((() => {
		init_ProcessSamplingObservation();
		init_analysisErrorCancellation();
		init_resources();
		init_analysisErrorCore();
		init_ProcessInspectionCancellation();
		init_ProcessInspectionCleanup();
		init_DarwinProcessRunTokenReader();
		init_analysisErrorBase();
		ProcessCaptureError = class ProcessCaptureError extends AnalysisError {
			_tag = "ProcessCaptureError";
			userMessage;
			userCategory;
			reason;
			executionFailure;
			partialObservation;
			cleanupReport;
			#retryable;
			get retryable() {
				return this.#retryable && !this.cleanupIncomplete;
			}
			constructor(message, options) {
				super(message, options);
				this.userMessage = options?.userMessage ?? message;
				this.userCategory = options?.userCategory;
				this.reason = options?.reason ?? (options?.userCategory === "cancelled" ? "cancelled" : "capture_failed");
				if (this.reason === "cleanup_incomplete") this.markCleanupIncomplete(true);
				this.executionFailure = options?.executionFailure ?? message;
				this.partialObservation = options?.partialObservation;
				this.cleanupReport = options?.cleanupReport;
				this.#retryable = options?.retryable === true;
			}
			/** Add final capture observations while preserving primary facts and cleanup ownership. */
			withFinalization(options) {
				const secondary = options.cleanupFailure;
				const resources = [...new Set([...this.cleanupResources, ...secondary?.cleanupResources ?? []])];
				const executionFailure = this.executionFailure ?? options.executionFailure;
				const partialObservation = this.partialObservation ?? options.partialObservation;
				const cleanupReport = this.cleanupReport ?? options.cleanupReport;
				const finalized = new ProcessCaptureError(this.message, {
					cleanupPrimary: this,
					...Object.hasOwn(this, "cause") ? { cause: this.cause } : {},
					...this.userMessage === undefined ? {} : { userMessage: this.userMessage },
					...this.userCategory === undefined ? {} : { userCategory: this.userCategory },
					reason: this.reason,
					...this.capturedOutput === undefined ? {} : { capturedOutput: this.capturedOutput },
					...secondary === undefined ? this.cleanup === undefined ? {} : { cleanup: this.cleanup } : { cleanup: {
						reason: secondary.message,
						resources
					} },
					...executionFailure === undefined ? {} : { executionFailure },
					...partialObservation === undefined ? {} : { partialObservation },
					...cleanupReport === undefined ? {} : { cleanupReport },
					...this.#retryable ? { retryable: true } : {}
				}).bindCleanupDependencies([this, ...secondary === undefined ? [] : [secondary]]);
				if (secondary !== undefined) finalized.retainSecondaryFailure(secondary);
				return finalized;
			}
		};
		describeProcessCaptureExecutionFailure = (failure) => {
			if (failure instanceof Error) return failure.message || failure.name;
			if (typeof failure === "string") return failure;
			if (failure === undefined) return undefined;
			return "Process capture failed with a non-error rejection.";
		};
		captureCancellationPresentation = {
			userCategory: "cancelled",
			reason: "cancelled",
			userMessage: "Process capture was cancelled. Start it again when ready."
		};
		processCaptureCancelled = (reason) => new ProcessCaptureError("process capture was cancelled", {
			cause: reason,
			...captureCancellationPresentation
		});
		ProcessCaptureInspectionFailure = class extends ProcessCaptureError {
			inspectionFailure;
			#cleanupLeases;
			get cleanupLeases() {
				return this.#cleanupLeases;
			}
			constructor(inspectionFailure) {
				const darwin = inspectionFailure instanceof DarwinProcessOwnershipInspectionError ? inspectionFailure : undefined;
				const cancellation = darwin?.cancellation ?? (isProcessOwnershipInspectionCancellation(inspectionFailure) ? { reason: inspectionFailure.reason } : undefined);
				const cleanupFailures = processInspectionCleanupFailures(inspectionFailure);
				const cleanupResources = [...new Set(cleanupFailures.flatMap((failure) => failure instanceof DarwinProcessOwnershipInspectionError ? failure.cleanupFailure?.cleanupResources ?? ["process ownership inspection"] : [failure.path]))];
				super(cancellation === undefined ? inspectionFailure.message : "process capture was cancelled", {
					cause: cancellation === undefined ? inspectionFailure : cancellation.reason,
					...cancellation === undefined ? {} : captureCancellationPresentation,
					...cleanupFailures.length === 0 ? {} : { cleanup: {
						reason: cleanupFailures.map((failure) => failure instanceof DarwinProcessOwnershipInspectionError ? failure.cleanupFailure?.message ?? failure.message : describeProcessCaptureExecutionFailure(failure.cleanupCause) ?? "descriptor cleanup failed").join("; "),
						resources: cleanupResources
					} },
					...darwin?.capturedOutput === undefined ? {} : { capturedOutput: darwin.capturedOutput },
					...darwin?.compilerTimedOut === true ? { retryable: true } : {},
					...inspectionFailure instanceof ProcessOwnershipIdentityBatchFailure ? { diagnostics: {
						retained_observation_count: inspectionFailure.observations.size,
						rejected_request_count: inspectionFailure.failures.length
					} } : {}
				});
				this.inspectionFailure = inspectionFailure;
				const leases = [];
				for (const failure of cleanupFailures) {
					if (failure instanceof DarwinProcessOwnershipInspectionError) {
						const marker = failure.cleanupFailure;
						if (marker !== undefined) this.bindCleanupDependencies([marker]);
						if (failure.cleanupOwner === undefined || marker?.cleanupIncomplete === false) continue;
						const owner = failure.cleanupOwner;
						const lease = new AnalysisCleanupLease(() => owner.close(), marker ?? ["process ownership inspection"]);
						if (marker !== undefined) lease.bindCleanupError(marker);
						leases.push(lease);
					} else leases.push(new AnalysisCleanupLease(() => failure.owner.close(), [failure.path]));
				}
				this.#cleanupLeases = leases;
				if (leases.length > 0) new AnalysisCleanupLeaseGroup(this, leases);
				if (cancellation === undefined) for (const fact of processInspectionCancellations(inspectionFailure)) this.retainSecondaryFailure(cancelledBy("capture_process", carriedReason(fact.reason)));
			}
		};
		ProcessCaptureSamplingFailure = class extends ProcessCaptureError {
			#inspectionFailures;
			#samplingFailure;
			get inspectionFailures() {
				return this.#inspectionFailures;
			}
			get samplingFailure() {
				return this.#samplingFailure;
			}
			constructor(samplingFailure) {
				const inspections = samplingFailure.inspectionFailures.map((failure) => new ProcessCaptureInspectionFailure(failure));
				const primary = inspections.find((failure) => failure.userCategory !== "cancelled") ?? (samplingFailure.otherFailures.length > 0 ? undefined : inspections[0]);
				const resources = [...new Set(inspections.flatMap((failure) => failure.cleanupResources))];
				super(primary?.message ?? samplingFailure.message, {
					cause: samplingFailure,
					...primary === undefined ? {} : { cleanupPrimary: primary },
					...primary?.userCategory === "cancelled" ? captureCancellationPresentation : {},
					...resources.length === 0 ? {} : { cleanup: {
						reason: "Process sampling descriptors remain owned",
						resources
					} }
				});
				this.#inspectionFailures = inspections;
				this.#samplingFailure = samplingFailure;
				for (const failure of inspections) if (failure !== primary) this.retainSecondaryFailure(failure);
				this.bindCleanupDependencies(inspections);
			}
		};
		captureInspectionFailures = (cause) => cause instanceof ProcessCaptureSamplingFailure ? cause.inspectionFailures : cause instanceof ProcessCaptureInspectionFailure ? [cause] : [];
		normalizeCaptureFailure = (cause) => {
			if (cause instanceof ProcessCaptureError) return cause;
			if (cause instanceof SamplingReadBatchFailure) return new ProcessCaptureSamplingFailure(cause);
			if (isProcessInspectionFailure(cause)) return new ProcessCaptureInspectionFailure(cause);
			return cause;
		};
		retainCaptureInspectionCancellations = (failure, inspection) => {
			const primary = primaryAnalysisError(failure);
			if (inspection.reason === "cancelled" && primary !== inspection) analysisErrorWithCancellation(primary, cancelledBy("capture_process", carriedReason(inspection.cause)));
			for (const secondary of inspection.secondaryFailures) if (secondary instanceof AnalysisCancelledError) analysisErrorWithCancellation(primary, secondary);
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessTerminalObservation.js
var terminalFailure, retainTerminalObservationFailure, createProcessTerminalFinalizer, observeTerminal;
function init_ProcessTerminalObservation() {
	return (init_ProcessTerminalObservation = __esmMin((() => {
		init_result();
		init_analysisErrorBase();
		init_analysisErrorProjection();
		init_ProcessCaptureError();
		init_errorMessage();
		terminalFailure = (cause) => cause instanceof AnalysisError ? cause : new ProcessCaptureError(`Terminal observation failed: ${errorMessage(cause)}`, { cause });
		retainTerminalObservationFailure = (primary, failure) => {
			if (primary === undefined) return failure;
			const error = primary instanceof AnalysisError ? primary : new ProcessCaptureError("process capture failed", { cause: primary });
			if (error !== failure) error.retainSecondaryFailure(failure, { terminal_observation_error: projectAnalysisError(failure) });
			return error;
		};
		createProcessTerminalFinalizer = (renderer, retention, observations) => {
			let completed;
			const complete = () => completed ??= observeTerminal(renderer, retention, observations);
			return {
				complete,
				dispose: async () => {
					await complete();
					await renderer.dispose();
				}
			};
		};
		observeTerminal = async (renderer, readRetention, observations) => {
			let retention;
			try {
				retention = ok(readRetention());
			} catch (cause) {
				retention = err(terminalFailure(cause));
			}
			let rendered;
			try {
				const frames = await renderer.frames();
				rendered = ok(frames);
				observations.rendered_frames = {
					state: "available",
					value: frames
				};
			} catch (cause) {
				const failure = terminalFailure(cause);
				rendered = err(failure);
				observations.rendered_frames = {
					state: "unavailable",
					reason: `Rendered terminal frame collection failed: ${failure.message}`
				};
			}
			if (!retention.ok) {
				if (!rendered.ok && rendered.error !== retention.error) retention.error.retainSecondaryFailure(rendered.error, { rendered_terminal_failure: projectAnalysisError(rendered.error) });
				return retention;
			}
			if (!rendered.ok) return rendered;
			return ok({
				retention: retention.value,
				renderedFrames: rendered.value
			});
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessCaptureClock.js
var monotonicProcessCaptureClock;
function init_ProcessCaptureClock() {
	return (init_ProcessCaptureClock = __esmMin((() => {
		monotonicProcessCaptureClock = () => Math.floor(performance.now());
	})))();
}

//#endregion
//#region dist/process/capture/ProcessSampling.js
var isInitializedPtyRoot, sampleLinux, readPsRowsRaw, readPsRows, sampleLinuxFallback, readRootIdentity, inspectInitializedPtyRoot, samplePs, sampleProcesses, isOwnedSamplingShutdown, startProcessSampler;
function init_ProcessSampling() {
	return (init_ProcessSampling = __esmMin((() => {
		init_ProcessInspectionCancellation();
		init_systemPs();
		init_ProcessInspectionCleanup();
		init_ProcessCaptureError();
		init_ExecFileOutput();
		init_ProcessOwnership();
		init_ProcessCaptureClock();
		init_LinuxProcessSampling();
		init_ProcessSamplingObservation();
		isInitializedPtyRoot = (options) => {
			const sessionIdentityMatches = options.before.session_id === options.rootPid && options.after.session_id === options.rootPid || options.before.session_id === null && options.after.session_id === null;
			return options.before.pid === options.rootPid && options.before.process_group_id === options.rootPid && sessionIdentityMatches && options.after.pid === options.rootPid && options.after.parent_pid === options.before.parent_pid && options.after.process_group_id === options.rootPid && options.after.startTime === options.before.startTime && options.observedRunId === options.expectedRunId;
		};
		sampleLinux = async (context) => {
			const { rootPid, limit, signal, identities } = context;
			if (limit <= 0) return samplingObservation([]);
			const root = await inspectLinuxProcess(rootPid, undefined, signal, identities);
			if (root.value === undefined) return samplingObservation([], root.diagnostics);
			if (root.value.children === undefined && !signal.aborted) {
				const fallback = await sampleLinuxFallback(context, root.value);
				return samplingObservation(fallback.value, root.diagnostics, fallback.diagnostics);
			}
			const rows = [root.value];
			let diagnostics = root.diagnostics;
			const visited = new Set([rootPid]);
			let level = (root.value.children ?? []).map((pid) => ({
				pid,
				expectedParent: rootPid
			}));
			for (const { pid } of level) visited.add(pid);
			while (level.length > 0 && rows.length < limit && !signal.aborted) {
				const batchSize = Math.min(level.length, 64, limit - rows.length);
				const batch = level.slice(0, batchSize);
				level = level.slice(batchSize);
				const observations = await settleSamplingReads(batch.map(({ pid, expectedParent }) => inspectLinuxProcess(pid, expectedParent, signal, identities)));
				for (const observation of observations) {
					diagnostics = mergeSamplingDiagnostics(diagnostics, observation.diagnostics);
					const node = observation.value;
					if (node === undefined) continue;
					rows.push(node);
					for (const child of node.children ?? []) {
						if (visited.has(child)) continue;
						visited.add(child);
						level.push({
							pid: child,
							expectedParent: node.pid
						});
					}
				}
			}
			if (level.length > 0 && signal.aborted) diagnostics = mergeSamplingDiagnostics(diagnostics, samplingInterrupted());
			return samplingObservation(rows, diagnostics);
		};
		readPsRowsRaw = async (platform, signal) => {
			const { stdout } = await execFileOutput((await resolveSystemPs(platform)).command, ["-axo", "pid=,ppid=,pgid=,sess=,command="], {
				signal,
				stopSignal: "SIGTERM"
			});
			return stdout.split("\n").map((line) => /\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(.*)/u.exec(line)).filter((match) => match !== null).map((match) => ({
				pid: Number(match[1]),
				parent_pid: Number(match[2]),
				process_group_id: Number(match[3]),
				session_id: Number(match[4]) || null,
				command: match[5] ?? "",
				startTime: undefined,
				lifecycle: undefined
			})).filter((row) => Number.isSafeInteger(row.pid) && row.pid > 0 && Number.isSafeInteger(row.parent_pid) && row.parent_pid >= 0).sort((left, right) => left.pid - right.pid);
		};
		readPsRows = async (platform, signal) => samplingReadObservation(await readSamplingSource("process table (ps)", signal, () => readPsRowsRaw(platform, signal)));
		sampleLinuxFallback = async (context, root) => {
			const observed = await readPsRows(context.platform, context.signal);
			if (observed.value === undefined) return samplingObservation([root], observed.diagnostics);
			const childrenByParent = new Map();
			for (const row of observed.value) {
				const children = childrenByParent.get(row.parent_pid) ?? [];
				children.push(row.pid);
				childrenByParent.set(row.parent_pid, children);
			}
			const rows = [root];
			let diagnostics = observed.diagnostics;
			const visited = new Set([root.pid]);
			let level = (childrenByParent.get(root.pid) ?? []).map((pid) => ({
				pid,
				expectedParent: root.pid
			}));
			while (level.length > 0 && rows.length < context.limit && !context.signal.aborted) {
				const batch = level.splice(0, Math.min(64, context.limit - rows.length));
				const candidates = batch.filter(({ pid }) => !visited.has(pid));
				for (const { pid } of candidates) visited.add(pid);
				const observations = await settleSamplingReads(candidates.map(({ pid, expectedParent }) => inspectLinuxProcessMetadata(pid, expectedParent, context.signal, context.identities)));
				for (const observation of observations) {
					diagnostics = mergeSamplingDiagnostics(diagnostics, observation.diagnostics);
					if (observation.value === undefined) continue;
					rows.push(observation.value);
					for (const child of childrenByParent.get(observation.value.pid) ?? []) level.push({
						pid: child,
						expectedParent: observation.value.pid
					});
				}
			}
			if (level.length > 0 && context.signal.aborted) diagnostics = mergeSamplingDiagnostics(diagnostics, samplingInterrupted());
			const after = await readLinuxProcessStat(root.pid, context.signal);
			diagnostics = mergeSamplingDiagnostics(diagnostics, after.diagnostics);
			return samplingObservation(after.value !== undefined && after.value.startTime === root.startTime && after.value.parent_pid === root.parent_pid ? rows : [root], diagnostics);
		};
		readRootIdentity = async (platform, rootPid, signal) => {
			if (platform === "linux") return readLinuxProcessStat(rootPid, signal);
			const rows = await readPsRows(platform, signal);
			return samplingObservation(rows.value?.find(({ pid }) => pid === rootPid), rows.diagnostics);
		};
		inspectInitializedPtyRoot = async (platform, rootPid, runId, signal) => {
			const before = await readRootIdentity(platform, rootPid, signal);
			if (before.value === undefined || before.value.process_group_id !== rootPid || before.value.session_id !== rootPid && before.value.session_id !== null) return samplingObservation(undefined, before.diagnostics);
			const observedRunId = platform === "linux" ? await readProcSamplingSource(`/proc/${String(rootPid)}/environ`, signal, () => readProcessRunId(rootPid, undefined, signal)) : samplingReadObservation(await readSamplingSource(`run token for PID ${String(rootPid)}`, signal, () => readProcessRunId(rootPid, undefined, signal)));
			const after = await readRootIdentity(platform, rootPid, signal);
			const diagnostics = mergeSamplingDiagnostics(before.diagnostics, observedRunId.diagnostics, after.diagnostics);
			if (after.value === undefined || !isInitializedPtyRoot({
				rootPid,
				expectedRunId: runId,
				before: before.value,
				observedRunId: observedRunId.value,
				after: after.value
			})) return samplingObservation(undefined, diagnostics);
			return samplingObservation({ startTime: after.value.startTime }, diagnostics);
		};
		samplePs = async (context) => {
			const { rootPid, limit, signal } = context;
			if (limit <= 0) return samplingObservation([]);
			const observed = await readPsRows(context.platform, signal);
			const rows = observed.value ?? [];
			const rowByPid = new Map(rows.map((row) => [row.pid, row]));
			const childrenByParent = new Map();
			for (const row of rows) {
				const siblings = childrenByParent.get(row.parent_pid) ?? [];
				siblings.push(row);
				childrenByParent.set(row.parent_pid, siblings);
			}
			const result = [];
			const visited = new Set();
			const queue = [rootPid];
			let index = 0;
			while (index < queue.length && result.length < limit) {
				const pid = queue[index];
				if (pid === undefined) break;
				index += 1;
				if (visited.has(pid)) continue;
				visited.add(pid);
				const row = rowByPid.get(pid);
				if (row !== undefined) result.push(row);
				if (result.length >= limit) break;
				for (const child of childrenByParent.get(pid) ?? []) {
					if (!visited.has(child.pid)) queue.push(child.pid);
				}
			}
			return samplingObservation(result, observed.diagnostics);
		};
		sampleProcesses = async (context) => {
			if (context.platform === "win32" || context.limit <= 0) return samplingObservation([]);
			const rows = context.platform === "linux" ? await sampleLinux(context) : await samplePs(context);
			const { elapsedMs, identities } = context;
			const samples = [];
			for (const row of rows.value) {
				if (row.startTime !== undefined) {
					const existing = identities.get(row.pid);
					if (existing !== undefined && existing !== row.startTime) continue;
					identities.set(row.pid, row.startTime);
				}
				samples.push({
					at_ms: elapsedMs,
					pid: row.pid,
					parent_pid: row.parent_pid,
					command: row.command,
					process_group_id: row.process_group_id,
					session_id: row.session_id
				});
			}
			return samplingObservation(samples, rows.diagnostics);
		};
		isOwnedSamplingShutdown = (cause, reason) => {
			const inspections = captureInspectionFailures(cause);
			return inspections.length > 0 && (!(cause instanceof ProcessCaptureSamplingFailure) || cause.userCategory === "cancelled") && inspections.every((inspection) => isProcessOwnershipInspectionCancellation(inspection.inspectionFailure) && processInspectionCancellations(inspection.inspectionFailure).every((fact) => fact.reason === reason));
		};
		startProcessSampler = (options) => {
			const { rootPid, runId, platform, started, limit, samples } = options;
			const identities = new Map();
			const lastObservations = new Map();
			let pending;
			let stopped = false;
			const shutdownReason = Symbol("process sampler shutdown");
			let stopRequested = false;
			let abortCurrent;
			let limitReached = false;
			let samplingFailures = 0;
			let samplingWasInterrupted = false;
			let firstSamplingFailure = null;
			let rootInitialized = false;
			let inspectionFailure;
			const sample = () => {
				if (stopped || pending !== undefined) return;
				const controller = new AbortController();
				abortCurrent = () => controller.abort(shutdownReason);
				pending = (async () => {
					let diagnostics = mergeSamplingDiagnostics();
					if (!rootInitialized) {
						const identity = await inspectInitializedPtyRoot(platform, rootPid, runId, controller.signal);
						diagnostics = identity.diagnostics;
						if (identity.value === undefined) return samplingObservation([], diagnostics);
						if (identity.value.startTime !== undefined) identities.set(rootPid, identity.value.startTime);
						rootInitialized = true;
					}
					const observation = await sampleProcesses({
						rootPid,
						platform,
						elapsedMs: monotonicProcessCaptureClock() - started,
						limit: limit + 1,
						identities,
						signal: controller.signal
					});
					return samplingObservation(observation.value, diagnostics, observation.diagnostics);
				})().then((observation) => {
					samplingFailures += observation.diagnostics.count;
					samplingWasInterrupted ||= observation.diagnostics.interrupted;
					firstSamplingFailure ??= observation.diagnostics.first;
					for (const value of observation.value) {
						const observation = JSON.stringify({
							parent_pid: value.parent_pid,
							command: value.command,
							process_group_id: value.process_group_id,
							session_id: value.session_id
						});
						if (lastObservations.get(value.pid) === observation) continue;
						if (samples.length >= limit) {
							limitReached = true;
							continue;
						}
						lastObservations.set(value.pid, observation);
						const index = samples.length;
						samples.push(value);
						options.recordEvent?.("process_samples", index);
					}
				}).catch((cause) => {
					const normalized = normalizeCaptureFailure(cause);
					const inspections = captureInspectionFailures(normalized);
					for (const inspection of inspections) options.resourceScope.retainInspectionFailure(inspection);
					if (inspections.length > 0) {
						if (stopRequested && isOwnedSamplingShutdown(normalized, shutdownReason)) {
							samplingWasInterrupted = true;
							return;
						}
						inspectionFailure = normalized instanceof ProcessCaptureSamplingFailure ? normalized : inspections[0];
						stopped = true;
						clearInterval(timer);
						return;
					}
					samplingFailures += 1;
					firstSamplingFailure ??= cause instanceof Error ? `${cause.name}: ${cause.message}` : typeof cause === "string" ? cause : `Unexpected sampling rejection (${typeof cause})`;
				}).then(() => {
					abortCurrent = undefined;
					pending = undefined;
				});
			};
			const timer = setInterval(sample, 50);
			sample();
			return async () => {
				stopRequested = true;
				stopped = true;
				clearInterval(timer);
				abortCurrent?.();
				await pending;
				if (inspectionFailure !== undefined) throw inspectionFailure;
				const failureCount = samplingFailures + (samplingWasInterrupted ? 1 : 0);
				const interrupted = "Sampler shutdown interrupted an unfinished process observation; unexamined processes remain unknown";
				const firstFailure = samplingWasInterrupted ? firstSamplingFailure === null ? interrupted : `${firstSamplingFailure}; ${interrupted}` : firstSamplingFailure;
				const partial = limitReached || failureCount > 0;
				return {
					partial,
					coverage: {
						sample_limit: limit,
						sampling_partial: partial,
						retained_samples: samples.length,
						sample_limit_reached: limitReached,
						sampling_failures: failureCount,
						first_sampling_failure: firstFailure,
						coverage: "sampled"
					}
				};
			};
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessScenarioRuntimeValidation.js
var resolveProcessScenarioRuntimePaths, resolveExecutable, invalidScenarioPath, hostAccessDenial, osErrorCode, osFailure, assertNotCancelled;
function init_ProcessScenarioRuntimeValidation() {
	return (init_ProcessScenarioRuntimeValidation = __esmMin((() => {
		init_callerPath();
		init_executableSearch();
		init_analysisErrorCore();
		init_snapshotEnvironment();
		init_ProcessCaptureError();
		resolveProcessScenarioRuntimePaths = async (scenario, environment = process.env, platform) => {
			const selectedWorkingDirectory = absoluteCallerPath(scenario.working_directory);
			let workingDirectory;
			try {
				workingDirectory = await realpath(selectedWorkingDirectory);
			} catch (cause) {
				throw hostAccessDenial(selectedWorkingDirectory, cause) ?? invalidScenarioPath("working_directory", `working directory could not be resolved: ${selectedWorkingDirectory}${osFailure(cause)}`, cause);
			}
			let workingDirectoryStat;
			try {
				workingDirectoryStat = await stat(workingDirectory);
			} catch (cause) {
				throw hostAccessDenial(selectedWorkingDirectory, cause) ?? invalidScenarioPath("working_directory", `working directory could not be inspected: ${selectedWorkingDirectory}${osFailure(cause)}`, cause);
			}
			if (!workingDirectoryStat.isDirectory()) throw invalidScenarioPath("working_directory", `working directory is not a directory: ${selectedWorkingDirectory}`);
			const executable = await resolveExecutable(scenario.executable, workingDirectory, snapshotEnvironment(scenario.environment, platform).PATH ?? snapshotEnvironment(environment, platform).PATH);
			const observationPaths = scenario.filesystem_observation_paths.map((path) => absoluteCallerPath(path, { cwd: workingDirectory }));
			return {
				...scenario,
				executable,
				working_directory: workingDirectory,
				filesystem_observation_paths: observationPaths
			};
		};
		resolveExecutable = async (command, workingDirectory, searchPath) => {
			const explicit = isAbsolute(command) || command.includes("/") || sep === "\\" && command.includes("\\");
			const candidates = explicit ? [absoluteCallerPath(command, { cwd: workingDirectory })] : Array.from(posixPathCandidates(command, searchPath ?? "/usr/bin:/bin", {
				relativeEntries: "resolve",
				workingDirectory
			}), ({ path }) => path);
			const failures = [];
			for (const candidate of candidates) {
				let metadata;
				try {
					metadata = await stat(candidate);
				} catch (cause) {
					const denial = explicit ? hostAccessDenial(candidate, cause) : undefined;
					if (denial !== undefined) throw denial;
					failures.push(`${candidate}${osFailure(cause)}`);
					continue;
				}
				if (!metadata.isFile()) {
					failures.push(`${candidate} (not a regular file)`);
					continue;
				}
				try {
					await access(candidate, constants.X_OK);
					return candidate;
				} catch (cause) {
					failures.push(`${candidate}${osFailure(cause)}`);
				}
			}
			throw invalidScenarioPath("executable", `executable could not be resolved: ${command}; checked ${failures.join("; ")}`);
		};
		invalidScenarioPath = (field, message, cause) => new AnalysisInputError("capture_process_scenario", cause === undefined ? undefined : { cause }, [{
			path: [field],
			reason: "invalid_value",
			message
		}]);
		hostAccessDenial = (selected, cause) => {
			const code = osErrorCode(cause);
			return code === "EACCES" || code === "EPERM" ? new AnalysisAccessDeniedError("capture_process_scenario", selected, code, { cause }) : undefined;
		};
		osErrorCode = (cause) => typeof cause === "object" && cause !== null && "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
		osFailure = (cause) => {
			const code = osErrorCode(cause);
			return code === undefined ? "" : ` (${code})`;
		};
		assertNotCancelled = (signal) => {
			if (signal?.aborted === true) throw processCaptureCancelled(signal.reason);
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessCaptureRead.js
var ProcessCaptureReadFailure, operationCancellation, withProcessCaptureFile, withProcessCaptureDirectory;
function init_ProcessCaptureRead() {
	return (init_ProcessCaptureRead = __esmMin((() => {
		init_resources();
		init_ProcessCaptureError();
		init_OwnedDirectoryHandle();
		init_OwnedFileHandle();
		init_OwnedRegularFile();
		init_RegularFile();
		init_readFileHandleChunks();
		ProcessCaptureReadFailure = class extends ProcessCaptureError {
			path;
			outcome;
			cleanupLeases;
			cleanupCause;
			operationFailure;
			retention;
			/** An observed abort is independent of whether cancellation caused the read failure. */
			cancellation;
			constructor(options) {
				const operationFailure = options.operationFailure ?? (options.outcome.kind === "failed" && options.outcome.cause instanceof OwnedRegularFileOperationFailure ? options.outcome.cause : undefined);
				const outcome = operationFailure !== undefined && options.outcome.kind === "failed" ? {
					kind: "failed",
					cause: operationFailure.operationCause
				} : options.outcome;
				const cleanupLeases = options.cleanupLease === undefined ? [] : [options.cleanupLease];
				const primaryCancellation = outcome.kind === "failed" ? operationFailure === undefined ? operationCancellation(outcome.cause) : undefined : options.completionCancellation;
				const cancellation = primaryCancellation ?? (options.signal?.aborted === true ? { reason: options.signal.reason } : undefined);
				const primary = primaryCancellation !== undefined ? primaryCancellation.reason : outcome.kind === "failed" ? outcome.cause : options.cleanupCause;
				const cleanupCause = options.cleanupCause;
				const cleanupReason = describeProcessCaptureExecutionFailure(cleanupCause) ?? "descriptor close rejected without a value";
				const reasons = [...outcome.kind === "failed" ? [describeProcessCaptureExecutionFailure(outcome.cause) ?? "read rejected without a value"] : [], ...options.cleanupLease === undefined ? [] : [`descriptor close failed: ${cleanupReason}`]];
				super(`Process capture read failed for ${options.path}${reasons.length === 0 ? "" : `: ${reasons.join("; ")}`}`, {
					cause: primary,
					...primaryCancellation === undefined ? {} : {
						userCategory: "cancelled",
						reason: "cancelled"
					},
					...options.cleanupLease === undefined ? {} : { cleanup: {
						reason: cleanupReason,
						resources: options.cleanupLease?.cleanupResources ?? [options.path]
					} }
				});
				this.path = options.path;
				this.outcome = outcome;
				this.cleanupLeases = cleanupLeases;
				this.cleanupCause = cleanupCause;
				this.operationFailure = operationFailure;
				this.retention = options.retention ?? { kind: "not_requested" };
				this.cancellation = cancellation;
				if (cleanupLeases.length > 0) new AnalysisCleanupLeaseGroup(this, cleanupLeases);
			}
		};
		operationCancellation = (cause) => {
			if (cause instanceof RegularFileOperationCancelled || cause instanceof FileReadCancelled) return { reason: cause.reason };
			if (cause instanceof ProcessCaptureError && cause.userCategory === "cancelled") return { reason: Object.hasOwn(cause, "cause") ? cause.cause : cause };
			return undefined;
		};
		withProcessCaptureFile = async (path, handle, signal, retainer, operation) => {
			const owner = new OwnedFileHandle(handle);
			const cleanupLease = AnalysisCleanupLease.forCloseOwner(owner, path);
			try {
				return await withOwnedFileHandle(path, owner, {
					...signal === undefined ? {} : { signal },
					...retainer === undefined ? {} : { retainFailedClose: () => retainer.retain(cleanupLease) }
				}, operation);
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) throw new ProcessCaptureReadFailure({
					path,
					outcome: cause.outcome,
					cleanupCause: cause.cleanupCause,
					cleanupLease,
					retention: cause.retention,
					operationFailure: cause.operationFailure,
					...cause.completionCancellation === undefined ? {} : { completionCancellation: cause.completionCancellation },
					signal
				});
				if (cause instanceof RegularFileCancelled) throw new ProcessCaptureReadFailure({
					path,
					outcome: cause.outcome,
					completionCancellation: { reason: cause.reason },
					signal
				});
				throw new ProcessCaptureReadFailure({
					path,
					outcome: {
						kind: "failed",
						cause
					},
					signal
				});
			}
		};
		withProcessCaptureDirectory = async (path, directory, signal, retainer, operation) => {
			const owner = new OwnedDirectoryHandle(directory);
			const cleanupLease = AnalysisCleanupLease.forCloseOwner(owner, path);
			let outcome;
			try {
				if (signal?.aborted === true) throw new RegularFileOperationCancelled(signal.reason);
				outcome = {
					kind: "completed",
					value: await operation(directory)
				};
			} catch (cause) {
				outcome = {
					kind: "failed",
					cause
				};
			}
			try {
				await owner.close();
			} catch (cleanupCause) {
				let retention = { kind: "not_requested" };
				if (retainer !== undefined) {
					try {
						retainer.retain(cleanupLease);
						retention = { kind: "callback_returned" };
					} catch (cause) {
						retention = {
							kind: "callback_threw",
							cause
						};
					}
				}
				throw new ProcessCaptureReadFailure({
					path,
					outcome,
					cleanupCause,
					cleanupLease,
					retention,
					...outcome.kind === "completed" && signal?.aborted === true ? { completionCancellation: { reason: signal.reason } } : {},
					signal
				});
			}
			if (outcome.kind === "failed") {
				throw new ProcessCaptureReadFailure({
					path,
					outcome,
					signal
				});
			}
			if (signal?.aborted === true) throw new ProcessCaptureReadFailure({
				path,
				outcome,
				completionCancellation: { reason: signal.reason },
				signal
			});
			return outcome.value;
		};
	})))();
}

//#endregion
//#region dist/process/capture/FilesystemSnapshot.js
var hasSameIdentity, filesystemSystemCode, unavailableSystemCodes, fileUnavailableSystemCode, readEntryObservation, observeSymlink, lookupPath, admitFilesystemObservationRoots, ProcessCaptureSnapshotFailure, hashFile, snapshotRoots;
function init_FilesystemSnapshot() {
	return (init_FilesystemSnapshot = __esmMin((() => {
		init_ProcessScenarioRuntimeValidation();
		init_symlinkTarget();
		init_callerPath();
		init_decodeDirectoryEntryName();
		init_RegularFile();
		init_result();
		init_analysisErrorCore();
		init_resources();
		init_ProcessCaptureError();
		init_ProcessCaptureRead();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		hasSameIdentity = (before, after, expected) => before.dev === after.dev && before.ino === after.ino && (expected === "directory" ? after.isDirectory() : after.isSymbolicLink());
		filesystemSystemCode = (cause) => {
			if (!(cause instanceof Error) || !("code" in cause)) return undefined;
			const code = cause.code;
			return typeof code === "string" ? code : undefined;
		};
		unavailableSystemCodes = new Set([
			"EACCES",
			"EISDIR",
			"ELOOP",
			"ENOTDIR",
			"ENOENT",
			"EPERM",
			"ESTALE"
		]);
		fileUnavailableSystemCode = (cause) => {
			const code = filesystemSystemCode(cause);
			return code !== undefined && unavailableSystemCodes.has(code) ? code : undefined;
		};
		readEntryObservation = async (read, signal) => {
			assertNotCancelled(signal);
			let value;
			try {
				value = await read();
			} catch (cause) {
				const code = filesystemSystemCode(cause);
				if (code === undefined || !unavailableSystemCodes.has(code) && code !== "EINVAL") throw cause;
				return err({
					reason: "entry_unavailable",
					system_code: code
				});
			}
			assertNotCancelled(signal);
			return ok(value);
		};
		observeSymlink = async (path, before, signal) => {
			const target = await readEntryObservation(() => readlink(path, { encoding: "buffer" }), signal);
			if (!target.ok) return target;
			const after = await readEntryObservation(() => lstat(path), signal);
			if (!after.ok) return after;
			if (!hasSameIdentity(before, after.value, "symlink")) return err({
				reason: "identity_changed",
				system_code: null
			});
			return ok(observedSymlinkTarget(target.value));
		};
		lookupPath = async (path, signal) => {
			assertNotCancelled(signal);
			let stats;
			try {
				stats = await lstat(path);
			} catch (cause) {
				const systemCode = fileUnavailableSystemCode(cause);
				if (systemCode === undefined) throw cause;
				assertNotCancelled(signal);
				return {
					state: systemCode === "ENOENT" || systemCode === "ENOTDIR" ? "absent" : "unavailable",
					system_code: systemCode,
					cause
				};
			}
			assertNotCancelled(signal);
			return {
				state: "present",
				stats
			};
		};
		admitFilesystemObservationRoots = async (scenario, signal) => {
			try {
				for (const root of scenario.filesystem_observation_paths) {
					const lookup = await lookupPath(root, signal);
					if (lookup.state === "present") continue;
					if (lookup.system_code === "ENOENT") continue;
					if (lookup.system_code === "EACCES" || lookup.system_code === "EPERM") return err(new AnalysisAccessDeniedError("capture_process_scenario", root, lookup.system_code, { cause: lookup.cause }));
					throw lookup.cause;
				}
				return ok(undefined);
			} catch (cause) {
				const normalized = cause instanceof AnalysisError ? cause : normalizeCaptureFailure(cause);
				return err(normalized instanceof AnalysisError ? normalized : new ProcessCaptureError("filesystem observation admission failed", { cause }));
			}
		};
		ProcessCaptureSnapshotFailure = class extends ProcessCaptureError {
			snapshot;
			cleanupLeases;
			readFailures;
			constructor(options) {
				const cleanupLeases = [...new Set(options.cleanupLeases ?? [])];
				const readFailures = [...new Set(options.readFailures ?? [])];
				const readFailure = options.cause instanceof ProcessCaptureReadFailure ? options.cause : undefined;
				const primary = readFailure !== undefined && Object.hasOwn(readFailure, "cause") ? readFailure.cause : options.cause instanceof ProcessCaptureError && options.cause.userCategory === "cancelled" && Object.hasOwn(options.cause, "cause") ? options.cause.cause : options.cause;
				const cancellation = readFailure?.userCategory === "cancelled" || options.cause instanceof ProcessCaptureError && options.cause.userCategory === "cancelled";
				const closeDetails = readFailures.filter((failure) => failure.cleanupLeases.length > 0).map((failure) => {
					const reason = failure.cleanup?.reason ?? "descriptor close failed";
					return `${failure.path}: ${reason}`;
				});
				const primaryMessage = describeProcessCaptureExecutionFailure(options.cause) ?? "snapshot read rejected without a value";
				const message = closeDetails.length === 0 ? `Process filesystem snapshot failed: ${primaryMessage}` : `Process filesystem snapshot failed: ${primaryMessage}; ${closeDetails.join("; ")}`;
				const cleanupReason = closeDetails.join("; ") || cleanupLeases.map((lease) => lease.cleanupResources ?? []).flat().join(", ") || "snapshot handle cleanup failed";
				super(message, {
					cause: primary,
					...options.cause instanceof AnalysisAccessDeniedError ? { cleanupPrimary: options.cause } : {},
					...cancellation ? {
						userCategory: "cancelled",
						reason: "cancelled"
					} : {},
					...cleanupLeases.length === 0 ? {} : { cleanup: {
						reason: cleanupReason,
						resources: [...new Set(cleanupLeases.flatMap((lease) => lease.cleanupResources ?? []))]
					} }
				});
				this.snapshot = options.snapshot;
				this.cleanupLeases = cleanupLeases;
				this.readFailures = readFailures;
				if (cleanupLeases.length > 0) new AnalysisCleanupLeaseGroup(this, cleanupLeases);
			}
			/** The snapshot owns observations; the admitted read owns its failure identity. */
			failureForCaller() {
				const primary = this.cleanupPrimary;
				if (!(primary instanceof AnalysisAccessDeniedError)) return this;
				return this.cleanupIncomplete ? analysisErrorWithCleanupDependencies(primary, this, "capture_process") : primary;
			}
		};
		hashFile = async (path, expected, maxBytes, signal, retainer) => {
			assertNotCancelled(signal);
			const noFollowAvailable = typeof constants.O_NOFOLLOW === "number" && constants.O_NOFOLLOW !== 0;
			let handle;
			try {
				handle = await open(path, constants.O_RDONLY | (noFollowAvailable ? constants.O_NOFOLLOW : 0) | (constants.O_NONBLOCK ?? 0));
			} catch (cause) {
				const systemCode = fileUnavailableSystemCode(cause);
				if (systemCode === undefined) throw cause;
				assertNotCancelled(signal);
				return {
					state: "omitted",
					reason: "file_unavailable",
					system_code: systemCode
				};
			}
			return await withProcessCaptureFile(path, handle, signal, retainer, async (ownedHandle) => {
				try {
					assertNotCancelled(signal);
					if (!noFollowAvailable) {
						const named = await lstat(path);
						assertNotCancelled(signal);
						if (!expected.isFile() || !sameRegularFileState(expected, named)) return {
							state: "omitted",
							reason: "file_changed_or_short_read",
							system_code: null
						};
					}
					const stats = await ownedHandle.stat();
					assertNotCancelled(signal);
					if (!expected.isFile() || !sameRegularFileState(expected, stats) || stats.size > maxBytes) return {
						state: "omitted",
						reason: "file_changed_or_short_read",
						system_code: null
					};
					const hash = createHash("sha256");
					const buffer = Buffer.allocUnsafe(Math.min(64 * 1024, maxBytes));
					let position = 0;
					while (position < stats.size) {
						assertNotCancelled(signal);
						const { bytesRead } = await ownedHandle.read(buffer, 0, Math.min(buffer.length, stats.size - position), position);
						if (bytesRead === 0) return {
							state: "omitted",
							reason: "file_changed_or_short_read",
							system_code: null
						};
						hash.update(buffer.subarray(0, bytesRead));
						position += bytesRead;
					}
					const after = await ownedHandle.stat();
					assertNotCancelled(signal);
					let unchanged = sameRegularFileState(stats, after);
					if (unchanged && !noFollowAvailable) {
						const namedAfter = await lstat(path);
						assertNotCancelled(signal);
						unchanged = sameRegularFileState(after, namedAfter);
					}
					if (!unchanged) return {
						state: "omitted",
						reason: "file_changed_or_short_read",
						system_code: null
					};
					return {
						state: "hashed",
						sha256: hash.digest("hex")
					};
				} catch (cause) {
					const systemCode = fileUnavailableSystemCode(cause);
					if (systemCode === undefined) throw cause;
					assertNotCancelled(signal);
					return {
						state: "omitted",
						reason: "file_unavailable",
						system_code: systemCode
					};
				}
			});
		};
		snapshotRoots = async (scenario, signal, admission, resources = {}) => {
			const retainer = resources.cleanup;
			const observerPaths = resources.observerPaths ?? [];
			const entries = [];
			const completeRoots = [];
			let remainingBytes = scenario.limits.file_bytes;
			let pendingNames = 0;
			let unrepresentableNames = 0;
			let truncated = false;
			const enumerationReasons = new Set();
			const enumerationOmissions = [];
			const hashOmissions = [];
			const closeFailures = [];
			const unobservedSubtrees = [];
			const resolvedObserverPaths = await Promise.all(observerPaths.map(async (path) => {
				try {
					return await realpath(path);
				} catch (cause) {
					const code = filesystemSystemCode(cause);
					if (code === "ENOENT" || code === "ENOTDIR") return undefined;
					throw cause;
				}
			}));
			const observerRoots = new Set(resolvedObserverPaths.filter((path) => path !== undefined));
			const observerNames = new Set([...observerRoots].map((path) => basename(path)));
			const omitObserverPath = async (root, alias, path) => {
				if (!observerNames.has(basename(path))) return false;
				const physical = join(await realpath(dirname(path)), basename(path));
				if (!observerRoots.has(physical)) return false;
				unobservedSubtrees.push({
					path: `${alias}:${relative(root, path) || "."}`,
					reason: "observer_owned"
				});
				return true;
			};
			const omitEntry = (path, omission) => {
				truncated = true;
				enumerationReasons.add(omission.reason);
				enumerationOmissions.push({
					path,
					...omission
				});
				return false;
			};
			const recordFile = (rootAlias, relativePath, stats, outcome) => {
				let sha256 = null;
				let omission;
				if (outcome.state === "hashed") {
					sha256 = outcome.sha256;
					remainingBytes -= stats.size;
				} else {
					omission = {
						path: `${rootAlias}:${relativePath}`,
						size_bytes: stats.size,
						remaining_budget_bytes: remainingBytes,
						reason: outcome.reason,
						system_code: outcome.system_code
					};
				}
				if (omission !== undefined) {
					truncated = true;
					hashOmissions.push(omission);
				}
				entries.push({
					path: `${rootAlias}:${relativePath}`,
					type: "file",
					mode: stats.mode,
					size: stats.size,
					sha256,
					symlink_target: null
				});
			};
			const visit = async (root, rootAlias, path, depth, admitted) => {
				assertNotCancelled(signal);
				if (await omitObserverPath(root, rootAlias, path)) return true;
				if (entries.length + unrepresentableNames >= scenario.limits.files || depth > scenario.limits.filesystem_depth) {
					truncated = true;
					if (entries.length + unrepresentableNames >= scenario.limits.files) enumerationReasons.add("files_limit");
					if (depth > scenario.limits.filesystem_depth) enumerationReasons.add("depth_limit");
					return false;
				}
				const relativePath = relative(root, path) || ".";
				const lookup = admitted === undefined ? await lookupPath(path, signal) : {
					state: "present",
					stats: admitted
				};
				if (lookup.state !== "present") return lookup.state === "absent" || omitEntry(`${rootAlias}:${relativePath}`, {
					reason: "entry_unavailable",
					system_code: lookup.system_code
				});
				const { stats } = lookup;
				if (stats.isSymbolicLink()) {
					const target = await observeSymlink(path, stats, signal);
					if (!target.ok) return omitEntry(`${rootAlias}:${relativePath}`, target.error);
					entries.push({
						path: `${rootAlias}:${relativePath}`,
						type: "symlink",
						mode: stats.mode,
						size: stats.size,
						sha256: null,
						symlink_target: target.value.text,
						symlink_target_hex: target.value.hex
					});
					unobservedSubtrees.push({
						path: `${rootAlias}:${relativePath}`,
						reason: "symlink_not_followed"
					});
					truncated = true;
					enumerationReasons.add("symlink_not_followed");
					enumerationOmissions.push({
						path: `${rootAlias}:${relativePath}`,
						reason: "symlink_not_followed",
						system_code: null
					});
					return depth > 0;
				}
				if (stats.isFile()) {
					if (remainingBytes < stats.size) {
						recordFile(rootAlias, relativePath, stats, {
							state: "omitted",
							reason: "file_bytes_budget",
							system_code: null
						});
					} else {
						let outcome;
						try {
							outcome = await hashFile(path, stats, remainingBytes, signal, retainer);
						} catch (cause) {
							if (cause instanceof ProcessCaptureReadFailure && cause.outcome.kind === "completed" && cause.userCategory === "cancelled") {
								recordFile(rootAlias, relativePath, stats, cause.outcome.value);
								if (depth === 0) completeRoots.push(rootAlias);
								throw cause;
							}
							if (cause instanceof ProcessCaptureReadFailure && cause.outcome.kind === "completed" && cause.cleanupLeases.length > 0) {
								closeFailures.push(cause);
								outcome = cause.outcome.value;
							} else {
								throw cause;
							}
						}
						recordFile(rootAlias, relativePath, stats, outcome);
					}
					return true;
				}
				const type = stats.isDirectory() ? "directory" : "other";
				entries.push({
					path: `${rootAlias}:${relativePath}`,
					type,
					mode: stats.mode,
					size: stats.size,
					sha256: null,
					symlink_target: null
				});
				if (type !== "directory") return true;
				const children = [];
				let complete = true;
				let remainingEntries = scenario.limits.files - entries.length - pendingNames - unrepresentableNames;
				let directory;
				try {
					directory = await opendir(path, { encoding: "buffer" });
				} catch (cause) {
					const systemCode = fileUnavailableSystemCode(cause);
					if (systemCode === undefined) throw cause;
					assertNotCancelled(signal);
					truncated = true;
					complete = false;
					enumerationReasons.add("directory_unavailable");
					enumerationOmissions.push({
						path: `${rootAlias}:${relativePath}`,
						reason: "directory_unavailable",
						system_code: systemCode
					});
					return false;
				}
				try {
					await withProcessCaptureDirectory(path, directory, signal, retainer, async (ownedDirectory) => {
						while (true) {
							assertNotCancelled(signal);
							const child = await ownedDirectory.read();
							if (child === null) break;
							const decoded = decodeDirectoryEntryName(child.name);
							if (decoded.kind === "decoded" && await omitObserverPath(root, rootAlias, appendCallerPath(path, decoded.name))) continue;
							if (children.length >= remainingEntries || depth >= scenario.limits.filesystem_depth) {
								truncated = true;
								complete = false;
								if (children.length >= remainingEntries) enumerationReasons.add("files_limit");
								if (depth >= scenario.limits.filesystem_depth) enumerationReasons.add("depth_limit");
								break;
							}
							if (decoded.kind === "unrepresentable") {
								unrepresentableNames += 1;
								remainingEntries -= 1;
								truncated = true;
								complete = false;
								enumerationReasons.add("unrepresentable_name");
								enumerationOmissions.push({
									path: `${rootAlias}:${relativePath}`,
									reason: "unrepresentable_name",
									system_code: null,
									raw_name_hex: decoded.rawHex
								});
								continue;
							}
							children.push(decoded.name);
							pendingNames += 1;
						}
					});
				} catch (cause) {
					if (cause instanceof ProcessCaptureReadFailure && cause.outcome.kind === "completed" && cause.cleanupLeases.length > 0) {
						if (cause.userCategory === "cancelled") {
							throw cause;
						}
						closeFailures.push(cause);
					} else {
						throw cause;
					}
				}
				const afterRead = await readEntryObservation(() => lstat(path), signal);
				if (!afterRead.ok || !hasSameIdentity(stats, afterRead.value, "directory")) {
					pendingNames -= children.length;
					return omitEntry(`${rootAlias}:${relativePath}`, afterRead.ok ? {
						reason: "identity_changed",
						system_code: null
					} : afterRead.error);
				}
				children.sort().reverse();
				while (children.length > 0) {
					const child = children.pop();
					if (child === undefined) break;
					pendingNames -= 1;
					if (!await visit(root, rootAlias, appendCallerPath(path, child), depth + 1)) complete = false;
				}
				return complete;
			};
			const buildSnapshot = () => ({
				files: entries,
				truncated,
				completeRoots,
				coverage: {
					files_limit: scenario.limits.files,
					depth_limit: scenario.limits.filesystem_depth,
					enumeration_truncated: completeRoots.length !== scenario.filesystem_observation_paths.length || enumerationOmissions.length > 0,
					enumeration_reasons: [...enumerationReasons],
					enumeration_omissions: enumerationOmissions,
					unobserved_subtrees: unobservedSubtrees,
					hash_budget_bytes: scenario.limits.file_bytes,
					hashed_bytes: scenario.limits.file_bytes - remainingBytes,
					hash_omissions: hashOmissions
				}
			});
			try {
				assertNotCancelled(signal);
				for (const [index, root] of scenario.filesystem_observation_paths.entries()) {
					const alias = `root_${String(index)}`;
					const lookup = await lookupPath(root, signal);
					if (lookup.state !== "present") {
						if (admission === undefined && lookup.system_code !== "ENOENT") {
							if (lookup.system_code === "EACCES" || lookup.system_code === "EPERM") {
								omitEntry(`${alias}:.`, {
									reason: "entry_unavailable",
									system_code: lookup.system_code
								});
								throw new AnalysisAccessDeniedError("capture_process_scenario", root, lookup.system_code, { cause: lookup.cause });
							}
							throw lookup.cause;
						}
						if (lookup.state === "absent") completeRoots.push(alias);
						else omitEntry(`${alias}:.`, {
							reason: "entry_unavailable",
							system_code: lookup.system_code
						});
						continue;
					}
					if (await visit(root, alias, root, 0, lookup.stats)) completeRoots.push(alias);
				}
				assertNotCancelled(signal);
				const snapshot = buildSnapshot();
				if (closeFailures.length > 0) {
					const causes = closeFailures.map(({ cleanupCause }) => cleanupCause);
					throw new ProcessCaptureSnapshotFailure({
						cause: causes.length === 1 ? causes[0] : new AggregateError(causes, "Snapshot handle closes failed"),
						snapshot,
						cleanupLeases: closeFailures.flatMap(({ cleanupLeases }) => cleanupLeases),
						readFailures: closeFailures
					});
				}
				return snapshot;
			} catch (cause) {
				if (cause instanceof ProcessCaptureSnapshotFailure) throw cause;
				truncated ||= completeRoots.length !== scenario.filesystem_observation_paths.length;
				const readFailures = [...closeFailures, ...cause instanceof ProcessCaptureReadFailure ? [cause] : []];
				throw new ProcessCaptureSnapshotFailure({
					cause: normalizeCaptureFailure(cause),
					snapshot: buildSnapshot(),
					cleanupLeases: readFailures.flatMap(({ cleanupLeases }) => cleanupLeases),
					readFailures
				});
			}
		};
	})))();
}

//#endregion
//#region dist/process/capture/TerminalRenderer.js
var require, HeadlessPackage, SerializePackage, TRAILING_SPACES, TerminalRenderer;
function init_TerminalRenderer() {
	return (init_TerminalRenderer = __esmMin((() => {
		require = createRequire(new URL("../process/capture/TerminalRenderer.js", import.meta.url).href);
		HeadlessPackage = require("@xterm/headless");
		SerializePackage = require("@xterm/addon-serialize");
		TRAILING_SPACES = / +$/u;
		TerminalRenderer = class {
			options;
			#terminal;
			#serializeAddon = new SerializePackage.SerializeAddon();
			#frames = [];
			#pending = Promise.resolve();
			#operations = [];
			#capturedBytes = 0;
			#observedBytes = 0;
			#observedFrames = 0;
			#truncated = false;
			#unknownSizeFrames = 0;
			#normalizationOverBudgetFrames = 0;
			constructor(options) {
				this.options = options;
				this.#terminal = new HeadlessPackage.Terminal({
					allowProposedApi: true,
					cols: options.columns,
					rows: options.rows,
					scrollback: options.scrollback
				});
				this.#terminal.loadAddon(this.#serializeAddon);
			}
			/** Queue one PTY chunk and capture state only after xterm has parsed it. */
			write(data, atMs) {
				this.#queue(() => new Promise((resolveWrite, rejectWrite) => {
					this.#terminal.write(typeof data === "string" ? data : data(), () => {
						try {
							this.#capture(atMs);
							resolveWrite();
						} catch (error) {
							rejectWrite(error);
						}
					});
				}));
			}
			/** Queue a terminal resize after every preceding write. */
			resize(columns, rows, atMs) {
				this.#queue(() => {
					this.#terminal.resize(columns, rows);
					this.#capture(atMs);
				});
			}
			/** Await all queued parsing and return immutable rendered observations. */
			async frames() {
				do {
					const operations = this.#operations;
					this.#operations = [];
					for (const operation of operations) this.#pending = this.#pending.then(operation);
					await this.#pending;
				} while (this.#operations.length > 0);
				return structuredClone(this.#frames);
			}
			/** Whether a rendered observation exceeded its independent capture budget. */
			truncated() {
				return this.#truncated;
			}
			/** Budget accounting after awaiting queued writes with frames(). */
			retention() {
				return {
					budget_bytes: this.options.maxBytes,
					observed_bytes: this.#observedBytes,
					retained_bytes: this.#capturedBytes,
					observed_frames: this.#observedFrames,
					retained_frames: this.#frames.length,
					...this.#unknownSizeFrames === 0 ? {} : { unknown_size_frames: this.#unknownSizeFrames },
					...this.#normalizationOverBudgetFrames === 0 ? {} : { normalization_over_budget_frames: this.#normalizationOverBudgetFrames }
				};
			}
			/** Release addon and terminal resources after all writes settle. */
			async dispose() {
				await this.#pending.catch(() => undefined);
				this.#operations = [];
				this.#terminal.dispose();
			}
			#queue(operation) {
				this.#operations.push(operation);
			}
			#capture(atMs) {
				const buffer = this.#terminal.buffer.active;
				const lines = [];
				this.#observedFrames += 1;
				let remainingBytes = this.options.maxBytes - this.#capturedBytes;
				let bytes = 0;
				for (let row = 0; row < this.#terminal.rows; row += 1) {
					const line = buffer.getLine(buffer.viewportY + row);
					const renderedLine = line?.translateToString(false, 0, this.#terminal.cols) ?? " ".repeat(this.#terminal.cols);
					const trailingSpaceBytes = Buffer.byteLength(renderedLine.match(TRAILING_SPACES)?.[0] ?? "");
					const normalized = this.options.normalize(renderedLine, Math.min(Number.MAX_SAFE_INTEGER, remainingBytes + trailingSpaceBytes));
					if (normalized.state === "over_budget") {
						if (normalized.reason === "normalization") this.#normalizationOverBudgetFrames += 1;
						this.#unknownSizeFrames += 1;
						this.#truncated = true;
						return;
					}
					const normalizedLine = normalized.value.replace(TRAILING_SPACES, "");
					const lineBytes = Buffer.byteLength(normalizedLine);
					if (lineBytes > remainingBytes) {
						this.#unknownSizeFrames += 1;
						this.#truncated = true;
						return;
					}
					remainingBytes -= lineBytes;
					bytes += lineBytes;
					lines.push(normalizedLine);
				}
				const normalizedState = this.options.normalize(this.#serializeAddon.serialize(), remainingBytes);
				if (normalizedState.state === "over_budget") {
					if (normalizedState.reason === "normalization") this.#normalizationOverBudgetFrames += 1;
					this.#unknownSizeFrames += 1;
					this.#truncated = true;
					return;
				}
				bytes += normalizedState.utf8Bytes;
				this.#observedBytes += bytes;
				this.#capturedBytes += bytes;
				const sequence = this.#frames.length;
				this.#frames.push({
					sequence,
					at_ms: atMs,
					columns: this.#terminal.cols,
					rows: this.#terminal.rows,
					cursor_x: buffer.cursorX,
					cursor_y: buffer.cursorY,
					active_buffer: buffer.type,
					lines,
					serialized_state: normalizedState.value
				});
				this.options.recordEvent?.("rendered_frames", sequence);
			}
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessSensitiveOutput.js
var MAX_STATES, MAX_BUILD_WORK, MAX_PROJECTION_WORK, MAX_INDEX_BYTES, capacity, visibleUnits, ProcessSensitiveOutput, createProcessSensitiveOutput;
function init_ProcessSensitiveOutput() {
	return (init_ProcessSensitiveOutput = __esmMin((() => {
		init_ProcessAdmissionError();
		init_analysisErrorBase();
		init_budget();
		init_analysisErrorCore();
		init_result();
		MAX_STATES = 65536;
		MAX_BUILD_WORK = 8388608;
		MAX_PROJECTION_WORK = 67108864;
		MAX_INDEX_BYTES = 33554432;
		capacity = (limit, requested, maximum) => new AnalysisResourceConstraintError("capture_process", "capacity", `Sensitive terminal redaction exceeded ${limit}. Select a smaller complete sensitive-input/output workload; terminal text is withheld on failure.`, {
			boundary: "terminal-sensitive-input",
			limit,
			requested,
			maximum
		}, {
			retryable: false,
			fixedAllowance: {
				name: "Sensitive terminal redaction",
				kind: "capture"
			}
		});
		visibleUnits = function* (parts) {
			let state = "text";
			let position = 0;
			for (const part of parts) {
				for (let index = 0; index < part.length; index += 1, position += 1) {
					const code = part.charCodeAt(index);
					if (code === 24 || code === 26) {
						state = "text";
						continue;
					}
					if (state === "osc" || state === "string") {
						if (code === 156 || state === "osc" && code === 7) state = "text";
						else if (code === 27) state = state === "osc" ? "osc_escape" : "string_escape";
						continue;
					}
					if (state === "osc_escape" || state === "string_escape") {
						if (code === 92 || code === 156 || state === "osc_escape" && code === 7) state = "text";
						else if (code !== 27) state = state === "osc_escape" ? "osc" : "string";
						continue;
					}
					if (code === 27) {
						state = "escape";
						continue;
					}
					if (state === "escape") {
						state = code === 91 ? "csi" : code === 93 ? "osc" : [
							80,
							88,
							94,
							95
						].includes(code) ? "string" : code >= 32 && code <= 47 ? "intermediate" : "text";
						continue;
					}
					if (state === "intermediate") {
						if (code < 32 || code > 47) state = "text";
						continue;
					}
					if (state === "csi") {
						if (code >= 64 && code <= 126) state = "text";
						continue;
					}
					if (code === 155) {
						state = "csi";
						continue;
					}
					if (code === 157) {
						state = "osc";
						continue;
					}
					if ([
						144,
						152,
						158,
						159
					].includes(code)) {
						state = "string";
						continue;
					}
					if (code < 32 && code !== 9 && code !== 10 && code !== 13 || code >= 127 && code <= 159) continue;
					yield {
						code,
						position
					};
				}
			}
		};
		ProcessSensitiveOutput = class {
			prefixes;
			#index = new Uint32Array(0);
			#work = new Budget(MAX_PROJECTION_WORK);
			#failure;
			constructor(prefixes) {
				this.prefixes = prefixes;
			}
			get failure() {
				return this.#failure;
			}
			fail(failure) {
				this.#failure ??= failure;
			}
			#prefix(index) {
				const value = this.prefixes[index];
				if (value === undefined) throw new ProcessAdmissionError("prefix_identity_lost");
				return value;
			}
			#consume(units) {
				this.#work.charge(units, () => capacity("projection_work_units", this.#work.used + units, MAX_PROJECTION_WORK));
			}
			#advance(state, code) {
				this.#consume(1);
				let next = this.#prefix(state).edges.get(code);
				while (next === undefined && state !== 0) {
					this.#consume(1);
					state = this.#prefix(state).failure;
					next = this.#prefix(state).edges.get(code);
				}
				return next ?? 0;
			}
			#contains(parts, includeTrailingPrefix) {
				let state = 0;
				for (const part of parts) for (let index = 0; index < part.length; index += 1) {
					state = this.#advance(state, part.charCodeAt(index));
					if (this.#prefix(state).match > 0) return true;
				}
				if (includeTrailingPrefix && this.#prefix(state).depth > 0) return true;
				state = 0;
				for (const { code } of visibleUnits(parts)) {
					state = this.#advance(state, code);
					if (this.#prefix(state).match > 0) return true;
				}
				return includeTrailingPrefix && this.#prefix(state).depth > 0;
			}
			/** Nonexpanding projection, including matches across original chunk boundaries. */
			project(parts, includeTrailingPrefix = false) {
				if (this.#failure !== undefined) return err(this.#failure);
				try {
					let size = 0;
					let controls = false;
					for (const part of parts) {
						size += part.length;
						controls ||= /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/u.test(part);
					}
					const words = size + 1 + (controls ? size : 0);
					if (words > MAX_INDEX_BYTES / Uint32Array.BYTES_PER_ELEMENT) return this.#reject(capacity("projection_index_bytes", words * Uint32Array.BYTES_PER_ELEMENT, MAX_INDEX_BYTES));
					if (size === 0) return ok(parts);
					this.#consume(size);
					if (this.#index.length < words) this.#index = new Uint32Array(words);
					const next = this.#index.subarray(0, size + 1);
					next.fill(0);
					const positions = this.#index.subarray(size + 1, words);
					let changed = false;
					const find = (index) => {
						let root = index;
						while (root < size && (next[root] ?? 0) !== 0) {
							this.#consume(1);
							root = (next[root] ?? 0) - 1;
						}
						while (index !== root) {
							const parent = (next[index] ?? 0) - 1;
							next[index] = root + 1;
							index = parent;
						}
						return root;
					};
					const mark = (start, end) => {
						changed = true;
						for (let index = find(start); index < end; index = find(index)) {
							this.#consume(1);
							next[index] = index + 2;
						}
					};
					let state = 0, position = 0;
					for (const part of parts) for (let index = 0; index < part.length; index += 1, position += 1) {
						state = this.#advance(state, part.charCodeAt(index));
						const length = this.#prefix(state).match;
						if (length > 0) mark(position + 1 - length, position + 1);
					}
					if (includeTrailingPrefix && this.#prefix(state).depth > 0) mark(size - this.#prefix(state).depth, size);
					if (controls) {
						state = 0;
						let logical = 0;
						for (const unit of visibleUnits(parts)) {
							positions[logical] = unit.position;
							state = this.#advance(state, unit.code);
							const length = this.#prefix(state).match;
							if (length > 0) mark(positions[logical + 1 - length] ?? 0, unit.position + 1);
							logical += 1;
						}
						if (includeTrailingPrefix && this.#prefix(state).depth > 0) mark(positions[logical - this.#prefix(state).depth] ?? 0, size);
					}
					if (!changed) return ok(parts);
					const projected = [];
					position = 0;
					for (const part of parts) {
						let value = "", start = 0;
						for (let index = 0; index < part.length; index += 1) {
							if ((next[position + index] ?? 0) === 0) continue;
							value += part.slice(start, index);
							start = index + 1;
						}
						projected.push(start === 0 ? part : value + part.slice(start));
						position += part.length;
					}
					return ok(this.#contains(projected, includeTrailingPrefix) ? projected.map(() => "") : projected);
				} catch (cause) {
					if (!(cause instanceof AnalysisError)) throw cause;
					return this.#reject(cause);
				}
			}
			#reject(failure) {
				this.fail(failure);
				return err(failure);
			}
			/** Publish no original-value backup, while retaining frame identity/order. */
			projectRawFrames(frames, coverageGap) {
				const originals = frames.map(({ raw_data, data }) => raw_data ?? data);
				const projected = coverageGap ? ok(originals.map(() => "")) : this.project(originals, true);
				if (!projected.ok) return projected;
				let removed = 0;
				for (const [index, frame] of frames.entries()) {
					const raw = projected.value[index] ?? "";
					removed += Buffer.byteLength(originals[index] ?? "") - Buffer.byteLength(raw);
					frames[index] = {
						sequence: frame.sequence,
						at_ms: frame.at_ms,
						data: raw
					};
				}
				return ok(removed);
			}
			projectNormalizedFrames(frames) {
				const projected = this.project(frames.map(({ data }) => data), true);
				if (!projected.ok) return projected;
				let bytes = 0;
				for (const [index, frame] of frames.entries()) {
					const raw = frame.raw_data ?? frame.data;
					const data = projected.value[index] ?? "";
					bytes += Buffer.byteLength(data);
					frames[index] = {
						sequence: frame.sequence,
						at_ms: frame.at_ms,
						data,
						...raw === data ? {} : { raw_data: raw }
					};
				}
				return ok(bytes);
			}
		};
		createProcessSensitiveOutput = (scenario) => {
			const prefixes = [{
				edges: new Map(),
				depth: 0,
				failure: 0,
				match: 0
			}];
			const seen = new Set();
			let work = 0;
			const step = () => {
				work += 1;
				if (work > MAX_BUILD_WORK) throw capacity("matcher_build_work_units", work, MAX_BUILD_WORK);
			};
			const read = (index) => {
				const node = prefixes[index];
				if (node === undefined) throw new ProcessAdmissionError("prefix_unavailable");
				return node;
			};
			try {
				for (const event of scenario.events) {
					if (event.type !== "input" || !event.sensitive) continue;
					work += event.data.length;
					if (work > MAX_BUILD_WORK) return err(capacity("matcher_build_work_units", work, MAX_BUILD_WORK));
					const wire = Buffer.from(event.data, "utf8").toString("utf8");
					let visible = "";
					for (const { code } of visibleUnits([wire])) visible += String.fromCharCode(code);
					for (const source of wire === visible ? [wire] : [wire, visible]) {
						for (const match of source.matchAll(/[^\r\n]+/gu)) {
							const literal = match[0];
							if (seen.has(literal)) continue;
							if (literal.length + 1 > MAX_STATES) return err(capacity("matcher_prefix_states", literal.length + 1, MAX_STATES));
							seen.add(literal);
							let state = 0;
							for (let index = 0; index < literal.length; index += 1) {
								step();
								const code = literal.charCodeAt(index);
								let next = read(state).edges.get(code);
								if (next === undefined) {
									if (prefixes.length >= MAX_STATES) return err(capacity("matcher_prefix_states", prefixes.length + 1, MAX_STATES));
									next = prefixes.length;
									prefixes.push({
										edges: new Map(),
										depth: read(state).depth + 1,
										failure: 0,
										match: 0
									});
									read(state).edges.set(code, next);
								}
								state = next;
							}
							read(state).match = literal.length;
						}
					}
				}
				if (seen.size === 0) return ok(undefined);
				const queue = [...read(0).edges.values()];
				for (let index = 0; index < queue.length; index += 1) {
					const parent = queue[index];
					if (parent === undefined) break;
					for (const [code, child] of read(parent).edges) {
						step();
						let failure = read(parent).failure;
						while (failure !== 0 && !read(failure).edges.has(code)) {
							step();
							failure = read(failure).failure;
						}
						const target = read(failure).edges.get(code) ?? 0;
						read(child).failure = target;
						read(child).match = Math.max(read(child).match, read(target).match);
						queue.push(child);
					}
				}
				return ok(new ProcessSensitiveOutput(prefixes));
			} catch (cause) {
				if (!(cause instanceof AnalysisError)) throw cause;
				return err(cause);
			}
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessNormalization.js
var createUtf8ByteCounter, isHighSurrogate, isLowSurrogate, boundedRegexReplace, boundedLiteralReplace, boundedIdentity, normalizeProcessElapsedTime, processSampleIdentifiers, createProcessIdentifierLookup, createProcessTextRules, createProcessTextNormalizer, createBoundedProcessTextNormalizer, normalizeProcessText, directoryIdentity, createPathRule, PORT_ENDPOINT_MATCHER, PORT_FIELD_MATCHER, portEndpointReplacement, portFieldReplacement, normalizeProcessSamples, createPidMatcher, normalizeRetainedTerminalFrames;
function init_ProcessNormalization() {
	return (init_ProcessNormalization = __esmMin((() => {
		init_analysisErrorCore();
		createUtf8ByteCounter = (maxBytes) => {
			let bytes = 0;
			let pendingHighSurrogate = false;
			const addBytes = (added) => {
				if (bytes > maxBytes || added > maxBytes - bytes) {
					bytes = Number.POSITIVE_INFINITY;
					return;
				}
				bytes += added;
			};
			return {
				add: (value) => {
					if (bytes > maxBytes || value.length === 0) return;
					let index = 0;
					if (pendingHighSurrogate) {
						if (value.length > 0 && isLowSurrogate(value.charCodeAt(0))) {
							addBytes(4);
							index = 1;
						} else {
							addBytes(3);
						}
						pendingHighSurrogate = false;
					}
					for (; index < value.length; index += 1) {
						const code = value.charCodeAt(index);
						if (code <= 127) addBytes(1);
						else if (code <= 2047) addBytes(2);
						else if (isHighSurrogate(code)) {
							if (index + 1 === value.length) {
								pendingHighSurrogate = true;
							} else if (isLowSurrogate(value.charCodeAt(index + 1))) {
								addBytes(4);
								index += 1;
							} else addBytes(3);
						} else addBytes(3);
						if (bytes > maxBytes) return;
					}
				},
				finish: () => {
					if (pendingHighSurrogate) addBytes(3);
					return bytes;
				}
			};
		};
		isHighSurrogate = (code) => code >= 55296 && code <= 56319;
		isLowSurrogate = (code) => code >= 56320 && code <= 57343;
		boundedRegexReplace = (value, matcher, replacement, maxBytes) => {
			const byteCounter = createUtf8ByteCounter(maxBytes);
			let cursor = 0;
			let changed = false;
			matcher.lastIndex = 0;
			let match;
			while ((match = matcher.exec(value)) !== null) {
				const index = match.index;
				const matched = match[0] ?? "";
				const nextCursor = index + matched.length;
				const replacementValue = replacement(matched, ...match.slice(1));
				changed ||= replacementValue !== matched;
				byteCounter.add(value.slice(cursor, index));
				byteCounter.add(replacementValue);
				cursor = nextCursor;
			}
			byteCounter.add(value.slice(cursor));
			const bytes = byteCounter.finish();
			if (bytes > maxBytes) {
				return changed ? { state: "over_budget" } : {
					state: "unchanged",
					value
				};
			}
			if (!changed) return {
				state: "unchanged",
				value
			};
			matcher.lastIndex = 0;
			const normalized = value.replace(matcher, replacement);
			return {
				state: "bounded",
				value: normalized,
				utf8Bytes: bytes
			};
		};
		boundedLiteralReplace = (value, pattern, replacement, maxBytes) => {
			const byteCounter = createUtf8ByteCounter(maxBytes);
			let cursor = 0;
			if (pattern === "") {
				if (replacement === "") return {
					state: "unchanged",
					value
				};
				for (let index = 0; index < value.length; index += 1) {
					byteCounter.add(replacement);
					byteCounter.add(value.slice(index, index + 1));
				}
				byteCounter.add(replacement);
				const bytes = byteCounter.finish();
				if (bytes > maxBytes) return { state: "over_budget" };
				return {
					state: "bounded",
					value: value.replaceAll(pattern, () => replacement),
					utf8Bytes: bytes
				};
			}
			if (pattern === replacement) return {
				state: "unchanged",
				value
			};
			let index = value.indexOf(pattern, cursor);
			if (index === -1) return {
				state: "unchanged",
				value
			};
			while (index !== -1) {
				byteCounter.add(value.slice(cursor, index));
				byteCounter.add(replacement);
				cursor = index + pattern.length;
				index = value.indexOf(pattern, cursor);
			}
			byteCounter.add(value.slice(cursor));
			const bytes = byteCounter.finish();
			if (bytes > maxBytes) return { state: "over_budget" };
			return {
				state: "bounded",
				value: value.replaceAll(pattern, () => replacement),
				utf8Bytes: bytes
			};
		};
		boundedIdentity = (value, maxBytes) => {
			const utf8Bytes = Buffer.byteLength(value);
			return utf8Bytes <= maxBytes ? {
				state: "bounded",
				value,
				utf8Bytes
			} : {
				state: "unchanged",
				value
			};
		};
		normalizeProcessElapsedTime = (elapsedMs, timeBucketMs) => Math.floor(elapsedMs / timeBucketMs) * timeBucketMs;
		processSampleIdentifiers = (samples, rootPid) => [...new Set([rootPid, ...samples.flatMap((sample) => [
			sample.pid,
			sample.parent_pid,
			sample.process_group_id ?? 0,
			sample.session_id ?? 0
		])])].filter((pid) => pid > 0);
		createProcessIdentifierLookup = (samples, rootPid) => {
			let count = -1;
			let root = -1;
			let identifiers = [];
			return () => {
				const currentRoot = rootPid();
				if (currentRoot !== root || count !== samples.length) {
					root = currentRoot;
					count = samples.length;
					identifiers = processSampleIdentifiers(samples, root);
				}
				return identifiers;
			};
		};
		createProcessTextRules = (scenario, temporaryRoot, pid) => {
			const rules = [];
			const pathRule = scenario.normalization.paths ? createPathRule(scenario, temporaryRoot) : undefined;
			if (pathRule !== undefined) rules.push({
				kind: "regex",
				...pathRule
			});
			if (scenario.normalization.ports) rules.push({
				kind: "regex",
				matcher: PORT_ENDPOINT_MATCHER,
				replace: portEndpointReplacement
			}, {
				kind: "regex",
				matcher: PORT_FIELD_MATCHER,
				replace: portFieldReplacement
			});
			const pidIndex = rules.length;
			if (scenario.normalization.pids) rules.push(undefined);
			for (const pattern of scenario.normalization.patterns) rules.push({
				kind: "literal",
				...pattern
			});
			let previousPid;
			return () => {
				if (scenario.normalization.pids) {
					const currentPid = typeof pid === "function" ? pid() : pid;
					if (currentPid !== previousPid) {
						previousPid = currentPid;
						const matcher = createPidMatcher(typeof currentPid === "number" ? [currentPid] : currentPid);
						rules[pidIndex] = matcher === undefined ? undefined : {
							kind: "regex",
							matcher,
							replace: () => "<pid>"
						};
					}
				}
				return rules;
			};
		};
		createProcessTextNormalizer = (scenario, temporaryRoot, pid) => {
			const rules = createProcessTextRules(scenario, temporaryRoot, pid);
			return (value) => {
				let normalized = value;
				for (const rule of rules()) {
					if (rule === undefined) continue;
					normalized = rule.kind === "regex" ? normalized.replace(rule.matcher, rule.replace) : normalized.replaceAll(rule.pattern, () => rule.replacement);
				}
				return normalized;
			};
		};
		createBoundedProcessTextNormalizer = (scenario, temporaryRoot, pid) => {
			const rules = createProcessTextRules(scenario, temporaryRoot, pid);
			return (value, maxBytes) => {
				let normalized = value;
				for (const rule of rules()) {
					if (rule === undefined) continue;
					const result = rule.kind === "regex" ? boundedRegexReplace(normalized, rule.matcher, rule.replace, maxBytes) : boundedLiteralReplace(normalized, rule.pattern, rule.replacement, maxBytes);
					if (result.state === "over_budget") return {
						state: "over_budget",
						reason: "normalization"
					};
					normalized = result.value;
				}
				const identity = boundedIdentity(normalized, maxBytes);
				return identity.state === "bounded" ? {
					state: "normalized",
					value: identity.value,
					utf8Bytes: identity.utf8Bytes
				} : {
					state: "over_budget",
					reason: "retention"
				};
			};
		};
		normalizeProcessText = (value, scenario, temporaryRoot, pid) => createProcessTextNormalizer(scenario, temporaryRoot, pid)(value);
		directoryIdentity = (path) => {
			let identity = path;
			while (identity.length > 1 && /\/\.?$/u.test(identity)) identity = identity.replace(/\/\.?$/u, "") || "/";
			return identity;
		};
		createPathRule = (scenario, temporaryRoot) => {
			const aliases = new Map();
			const selected = [
				[temporaryRoot, "<temporary-root>"],
				[directoryIdentity(scenario.working_directory), "<working-directory>"],
				[scenario.executable, "<executable>"],
				...scenario.filesystem_observation_paths.map((root, index) => [directoryIdentity(root), `<filesystem-root-${String(index)}>`])
			];
			for (const [path, alias] of selected) if (path !== undefined && path !== "" && !aliases.has(path)) aliases.set(path, alias);
			const paths = [...aliases.keys()].sort((left, right) => right.length - left.length);
			if (paths.length === 0) return undefined;
			const pattern = paths.map((path) => path === "/" ? "/(?!/)(?=([^\\s\"']?))" : `${path.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}(?=$|/|[\\s"'])`).join("|");
			const matcher = new RegExp(`(^|[\\s"'=:(\\[{<])(${pattern})`, "gu");
			return {
				matcher,
				replace: (match, prefix, path, rootChild) => path === "/" && prefix === "<" ? match : `${prefix}${aliases.get(path) ?? path}${path === "/" && rootChild ? "/" : ""}`
			};
		};
		PORT_ENDPOINT_MATCHER = /(\b[a-z][a-z0-9+.-]*:\/\/[^\s/?#"'<>]+|\blocalhost|\b(?:\d{1,3}\.){3}\d{1,3}|\[[\da-f:.%]+\]):(\d{1,5})(?![\p{L}\p{N}_@:]|\.(?:[\p{L}\p{N}_]|$))/giu;
		PORT_FIELD_MATCHER = /(\b(?:port|tcp_port|udp_port|listen)\b["']?\s*[:=]\s*)(\d{1,5})(?![\p{L}\p{N}_]|\.(?:[\p{L}\p{N}_]|$))/giu;
		portEndpointReplacement = (match, endpoint, port) => {
			if (Number(port) > 65535) return match;
			const isEndpoint = endpoint.includes("://") ? URL.canParse(`${endpoint}:${port}`) : endpoint.toLowerCase() === "localhost" || isIP(endpoint.replace(/^\[|\]$/gu, "")) !== 0;
			return isEndpoint ? `${endpoint}:<port>` : match;
		};
		portFieldReplacement = (match, prefix, port) => Number(port) <= 65535 ? `${prefix}<port>` : match;
		normalizeProcessSamples = (samples, scenario, rootPid) => {
			const identifiers = processSampleIdentifiers(samples, rootPid);
			const mapping = new Map(identifiers.map((identifier, index) => [identifier, index + 1]));
			const normalizeText = createProcessTextNormalizer(scenario, undefined, identifiers);
			const normalizeCommand = (command) => normalizeText(command).trim();
			return samples.map((sample) => ({
				at_ms: normalizeProcessElapsedTime(sample.at_ms, scenario.normalization.time_bucket_ms),
				pid: scenario.normalization.pids ? mapping.get(sample.pid) ?? 1 : sample.pid,
				parent_pid: scenario.normalization.pids ? mapping.get(sample.parent_pid) ?? 0 : sample.parent_pid,
				process_group_id: !scenario.normalization.pids || sample.process_group_id === null ? sample.process_group_id : mapping.get(sample.process_group_id) ?? 0,
				session_id: !scenario.normalization.pids || sample.session_id === null ? sample.session_id : mapping.get(sample.session_id) ?? 0,
				command: normalizeCommand(sample.command)
			}));
		};
		createPidMatcher = (identifiers) => {
			const tokens = [...new Set(identifiers)].filter((identifier) => Number.isSafeInteger(identifier) && identifier > 0).sort((left, right) => right - left).map(String);
			if (tokens.length === 0) return undefined;
			return new RegExp(`(?<!\\d)(?:${tokens.join("|")})(?!\\d)`, "gu");
		};
		normalizeRetainedTerminalFrames = (frames, normalize, maximumBytes, reason = "sampled-identifiers") => {
			let bytes = 0;
			const projected = [];
			for (const frame of frames) {
				const raw = frame.raw_data ?? frame.data;
				const value = normalize(raw, maximumBytes - bytes);
				if (value.state === "over_budget") throw new AnalysisResourceConstraintError("capture_process", "capacity", `Retained terminal text exceeded the selected output budget after ${reason} projection.`, {
					maximum_output_bytes: maximumBytes,
					frame_index: frame.sequence,
					boundary: reason === "sampled-identifiers" ? "terminal-pid-normalization" : "terminal-sensitive-input-normalization"
				}, {
					retryable: false,
					remediationAction: "Increase limits.output_bytes within its advertised range, or select a narrower scenario. Completed raw PTY chunks remain in partial observations; the corrected normalized representation did not fit."
				});
				bytes += value.utf8Bytes;
				projected.push({
					sequence: frame.sequence,
					at_ms: frame.at_ms,
					data: value.value,
					...value.value === raw ? {} : { raw_data: raw }
				});
			}
			for (const [index, frame] of projected.entries()) frames[index] = frame;
			return bytes;
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessFilesystemEffects.js
var unobservedAbsenceReason, classifyFilesystemEffects;
function init_ProcessFilesystemEffects() {
	return (init_ProcessFilesystemEffects = __esmMin((() => {
		unobservedAbsenceReason = (path, phase, snapshot) => {
			const alias = path.slice(0, path.indexOf(":"));
			if (!snapshot.completeRoots.includes(alias)) return `The ${phase} snapshot did not exhaust path enumeration under ${alias}; absence remains unknown.`;
			const rootPath = `${alias}:.`;
			if (path === rootPath) return undefined;
			if (snapshot.coverage.unobserved_subtrees === undefined) return `The ${phase} snapshot has no subtree coverage facts; descendant absence remains unknown.`;
			for (const subtree of snapshot.coverage.unobserved_subtrees) {
				const below = subtree.path === rootPath ? path.startsWith(`${alias}:`) : path.startsWith(`${subtree.path}${sep}`);
				if (below || subtree.reason === "observer_owned" && path === subtree.path) return `The ${phase} snapshot did not observe the subtree at ${subtree.path} (${subtree.reason}); descendant absence remains unknown.`;
			}
			return undefined;
		};
		classifyFilesystemEffects = (before, after) => {
			const beforeByPath = new Map(before.files.map((file) => [file.path, file]));
			const afterByPath = new Map(after.files.map((file) => [file.path, file]));
			return [...new Set([...beforeByPath.keys(), ...afterByPath.keys()])].sort().map((path) => {
				const beforeFile = beforeByPath.get(path) ?? null;
				const afterFile = afterByPath.get(path) ?? null;
				const reason = beforeFile === null ? unobservedAbsenceReason(path, "before", before) : afterFile === null ? unobservedAbsenceReason(path, "after", after) : undefined;
				if (reason !== undefined) return {
					path,
					status: "unknown",
					before: beforeFile,
					after: afterFile,
					reason
				};
				if (beforeFile === null) {
					if (afterFile === null) throw new TypeError(`Filesystem effect ${path} has no file state`);
					return {
						path,
						status: "created",
						before: null,
						after: afterFile
					};
				}
				if (afterFile === null) return {
					path,
					status: "deleted",
					before: beforeFile,
					after: null
				};
				const metadataChanged = beforeFile.type !== afterFile.type || beforeFile.mode !== afterFile.mode || beforeFile.size !== afterFile.size;
				const beforeTarget = beforeFile.type === "symlink" ? beforeFile.symlink_target_hex : null;
				const afterTarget = afterFile.type === "symlink" ? afterFile.symlink_target_hex : null;
				if (!metadataChanged && beforeFile.type === "file" && afterFile.type === "file" && (beforeFile.sha256 === null || afterFile.sha256 === null)) return {
					path,
					status: "unknown",
					before: beforeFile,
					after: afterFile,
					reason: "A file content hash is unavailable in at least one snapshot; matching metadata does not establish unchanged contents."
				};
				return {
					path,
					status: metadataChanged || beforeTarget !== afterTarget || beforeFile.sha256 !== afterFile.sha256 ? "modified" : "unchanged",
					before: beforeFile,
					after: afterFile
				};
			});
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessTimer.js
var systemTimerScheduler, scheduleProcessDelay, scheduleProcessInterval;
function init_ProcessTimer() {
	return (init_ProcessTimer = __esmMin((() => {
		init_analysisResourceLimits();
		systemTimerScheduler = (callback, delayMs) => {
			const timer = setTimeout(callback, delayMs);
			return { cancel: () => clearTimeout(timer) };
		};
		scheduleProcessDelay = (delayMs, callback, schedule = systemTimerScheduler) => {
			if (!Number.isSafeInteger(delayMs) || delayMs < 0) throw new RangeError("Process delay must be a nonnegative safe integer");
			let remaining = delayMs;
			let timer;
			let cancelled = false;
			const scheduleNext = () => {
				if (cancelled) return;
				const interval = Math.min(remaining, MAX_NODE_TIMER_DELAY_MS);
				timer = schedule(() => {
					if (cancelled) return;
					remaining -= interval;
					if (remaining === 0) callback();
					else scheduleNext();
				}, interval);
			};
			scheduleNext();
			return { cancel: () => {
				cancelled = true;
				timer?.cancel();
			} };
		};
		scheduleProcessInterval = (callback, intervalMs) => {
			const timer = setInterval(callback, intervalMs);
			return { cancel: () => clearInterval(timer) };
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessCaptureLifecycle.js
var normalExitCode, captureExitObservation, createProcessCaptureObservationBuffer, normalizePartialProcessObservations, settleProcessCaptureJournal, buildCaptureResult, captureCoverageUnknowns, identityFromStats, sameExecutableIdentity, filesystemFailure, selectedExecutableFileSystem, observeSelectedExecutable, observeLaunchedExecutable, createRunManifest, observeSettlement, describeUnverifiedCause, awaitTerminalExit, processCaptureCleanupHost, PROCESS_FINALIZATION_DELIVERY_GRACE_MS, releaseCapturedProcessGroup, ProcessCaptureResourceOwner, cleanupFailureMessage, ProcessCaptureResourceScope, unresolvedCleanupOutcomes, unresolvedCleanupResources, cleanupReportFailure, captureTerminalFrames, PROCESS_CAPTURE_CLEANUP_INTERVENTION_UNKNOWN, cleanupResidualUnknowns, processCaptureCleanupFacts, resolveProcessResult, prepareProcessCapture, systemProcessPreparationHost;
function init_ProcessCaptureLifecycle() {
	return (init_ProcessCaptureLifecycle = __esmMin((() => {
		init_analysisErrorCore();
		init_HostPlatform();
		init_readFileHandleChunks();
		init_resources();
		init_processScenario();
		init_processCaptureParsing();
		init_identity();
		init_FilesystemSnapshot();
		init_ProcessCaptureRead();
		init_ProcessFilesystemEffects();
		init_ProcessOwnership();
		init_ProcessOwnershipObservation();
		init_ProcessOwnershipEvidence();
		init_ProcessCaptureError();
		init_ProcessScenarioRuntimeValidation();
		init_ProcessNormalization();
		init_processEvidenceProvider();
		init_TerminalRenderer();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_jsonValue();
		init_processCaptureCoverage();
		init_ProcessTimer();
		init_ProcessCaptureClock();
		init_processCapture();
		init_errorMessage();
		normalExitCode = (exit) => exit.exitCode >= 0 && (exit.signal ?? 0) === 0 ? exit.exitCode : null;
		captureExitObservation = (exit) => ({
			code: exit.reason === "exited" ? normalExitCode(exit) : null,
			signal: exit.signal ?? null,
			reason: exit.reason,
			...exit.finalization === undefined ? {} : { finalization: exit.finalization }
		});
		createProcessCaptureObservationBuffer = (options) => ({
			target_pid: {
				state: "unavailable",
				reason: "No PTY process was spawned before the run failed."
			},
			frames: {
				state: "available",
				value: options.frames
			},
			rendered_frames: {
				state: "unavailable",
				reason: "Rendered terminal frames were not collected before capture completion finished."
			},
			interaction_events: {
				state: "available",
				value: options.interactions
			},
			exit: {
				state: "unavailable",
				reason: "Terminal exit was not observed before the run failed."
			},
			...options.finalizationEnabled === true ? { finalization: {
				state: "unavailable",
				reason: "Finalization was not observed before capture completion finished."
			} } : {},
			settlement: {
				state: "unavailable",
				reason: "Process settlement was not observed before capture completion finished."
			},
			process_samples: {
				state: "available",
				value: options.samples
			},
			filesystem_snapshots: {
				before: options.before === undefined ? {
					state: "unavailable",
					reason: "Initial filesystem snapshot did not complete."
				} : {
					state: "available",
					value: options.before
				},
				after: {
					state: "unavailable",
					reason: "Final filesystem snapshot was not collected before capture completion finished."
				}
			},
			event_journal: {
				state: "available",
				value: options.eventJournal
			},
			manifest: {
				state: "unavailable",
				reason: "Capture manifest was not produced before capture completion finished."
			}
		});
		normalizePartialProcessObservations = (observations, context) => {
			const targetPid = observations.target_pid;
			const target_pid = targetPid.state === "available" && context.rootPid !== undefined ? {
				state: "available",
				value: context.scenario.normalization.pids ? 1 : context.rootPid
			} : targetPid;
			const samples = observations.process_samples;
			const process_samples = samples.state === "available" && context.rootPid !== undefined ? {
				state: "available",
				value: normalizeProcessSamples(samples.value, context.scenario, context.rootPid)
			} : samples;
			return {
				...observations,
				target_pid,
				process_samples
			};
		};
		settleProcessCaptureJournal = async (journal, quietMs = 25, maxWaitMs = 500) => {
			const deadline = monotonicProcessCaptureClock() + maxWaitMs;
			let observed = journal.length;
			let lastChangeAt = monotonicProcessCaptureClock();
			while (monotonicProcessCaptureClock() < deadline) {
				await setTimeout$1(4);
				await setImmediate();
				if (journal.length !== observed) {
					observed = journal.length;
					lastChangeAt = monotonicProcessCaptureClock();
				} else if (monotonicProcessCaptureClock() - lastChangeAt >= quietMs) return;
			}
		};
		buildCaptureResult = (options) => {
			const hasSensitiveScriptedInput = options.scenario.events.some((event) => event.type === "input" && event.sensitive);
			const sensitiveInputUnknown = "Sensitive scripted input literals and retained terminal echoes are redacted. Terminal states are reconstructed from the redacted stream; private display effects and transformed values remain unknown.";
			const filesystemObservationUnknown = "No filesystem observation paths were selected; filesystem effects remain unknown.";
			const hasFilesystemObservations = options.scenario.filesystem_observation_paths.length > 0;
			const filesystemEffects = classifyFilesystemEffects(options.before, options.after);
			const filesystemUnknowns = [...new Set(filesystemEffects.flatMap((effect) => effect.status === "unknown" ? [effect.reason] : []))];
			return {
				manifest: options.manifest,
				normalization: options.scenario.normalization,
				frames: options.frames,
				rendered_frames: options.renderedFrames,
				interaction_events: options.interactions,
				exit: captureExitObservation(options.exit),
				settlement: options.settlement,
				process_samples: normalizeProcessSamples(options.samples, options.scenario, options.rootPid),
				filesystem_checkpoints: options.checkpoints,
				event_journal: options.eventJournal,
				files_before: options.before.files,
				files_after: options.after.files,
				filesystem_effects: filesystemEffects,
				truncated: hasCaptureTruncation(options.truncationDetails),
				truncation_details: options.truncationDetails,
				limitations: [
					"The executable digest is a prelaunch file sample; matching path metadata immediately after spawn does not prove an atomic operating-system image binding.",
					...Date.parse(options.manifest.completed_at) < Date.parse(options.manifest.started_at) ? ["Wall-clock completion time precedes start time; elapsed capture timing is recorded separately and remains monotonic."] : [],
					"Process trees are sampled and may omit short-lived descendants.",
					...options.samplingPartial ? ["Process-tree sampling ended with an incomplete observation."] : [],
					"Filesystem observations are before/after snapshots, not syscall traces.",
					"Inherited host environment variables are not recorded and may affect results.",
					...!hasFilesystemObservations ? [filesystemObservationUnknown] : [],
					...filesystemUnknowns,
					...captureCoverageUnknowns(options.truncationDetails).map(({ reason }) => reason),
					...hasSensitiveScriptedInput ? [sensitiveInputUnknown] : []
				],
				residual_unknowns: [
					{
						scope: "process",
						reason: "Process trees are sampled and may omit short-lived descendants."
					},
					{
						scope: "process",
						reason: "The executable digest is a prelaunch file sample; operating-system image binding is not atomically observed."
					},
					{
						scope: "environment",
						reason: "Inherited host environment variables are not recorded."
					},
					{
						scope: "network",
						reason: "Network activity is not observed by this capture."
					},
					...!hasFilesystemObservations ? [{
						scope: "filesystem",
						reason: filesystemObservationUnknown
					}] : [],
					...filesystemUnknowns.map((reason) => ({
						scope: "filesystem",
						reason
					})),
					...hasSensitiveScriptedInput ? [{
						scope: "interaction",
						reason: sensitiveInputUnknown
					}, {
						scope: "terminal",
						reason: sensitiveInputUnknown
					}] : [],
					...captureCoverageUnknowns(options.truncationDetails).filter(({ scope }) => scope !== "terminal")
				]
			};
		};
		captureCoverageUnknowns = (details) => {
			const unknowns = [];
			if (details.raw_terminal.observed_frames > details.raw_terminal.retained_frames) unknowns.push({
				scope: "terminal",
				reason: (details.normalized_terminal?.omitted_frames ?? 0) > 0 ? "Raw PTY chunks were omitted because original input exceeded output_bytes or an ordered normalization stage exceeded its remaining bound; final normalized sizes for the latter omissions are unknown. Rendered states also lack those inputs. See raw_terminal and normalized_terminal retention details, including the normalized omission count." : "Raw PTY chunks exceeded output_bytes and were omitted; rendered states also lack those inputs. See truncation_details.raw_terminal."
			});
			if ((details.raw_terminal.redacted_bytes ?? 0) > 0) unknowns.push({
				scope: "terminal",
				reason: "Sensitive terminal text was removed before rendering. Redacted bytes still consume the original output budget. When retained input has gaps, all retained terminal text is withheld; private display effects remain unknown."
			});
			if (details.rendered_terminal.observed_frames > details.rendered_terminal.retained_frames) unknowns.push({
				scope: "terminal",
				reason: (details.rendered_terminal.normalization_over_budget_frames ?? 0) > 0 ? "Rendered frames were omitted because a normalization stage exceeded the remaining output_bytes budget; final rendered byte totals are unknown for those frames. See truncation_details.rendered_terminal." : "Cumulative rendered state and visible-line bytes exceeded output_bytes; whole rendered frames were omitted. Raw PTY coverage is reported separately. See truncation_details.rendered_terminal."
			});
			for (const [name, coverage] of [["before", details.filesystem_before], ["after_settlement", details.filesystem_after]]) {
				for (const subtree of coverage.unobserved_subtrees ?? []) unknowns.push({
					scope: "filesystem",
					reason: `Filesystem ${name} subtree ${subtree.path} was outside observation: ${subtree.reason === "symlink_not_followed" ? "symbolic links are not followed" : "the exact observer-owned directory is excluded, including target activity within it"}.`
				});
				if (coverage.enumeration_truncated) unknowns.push({
					scope: "filesystem",
					reason: `Filesystem ${name} path enumeration was incomplete: ${coverage.enumeration_reasons.join(", ")}. See truncation_details.`
				});
				if (coverage.hash_omissions.length > 0) unknowns.push({
					scope: "filesystem",
					reason: `Filesystem ${name} omitted ${String(coverage.hash_omissions.length)} whole-file digests; per-path reasons and remaining file_bytes budget are in truncation_details.`
				});
			}
			if (details.process.sampling_partial) unknowns.push({
				scope: "process",
				reason: details.process.first_sampling_failure !== null ? `Process sampling has incomplete observations: ${details.process.first_sampling_failure}. See truncation_details.process.` : "The process sample limit was reached; see truncation_details.process."
			});
			return unknowns;
		};
		identityFromStats = (stats) => ({
			dev: stats.dev,
			ino: stats.ino,
			mode: stats.mode,
			size: stats.size,
			mtimeNs: stats.mtimeNs,
			ctimeNs: stats.ctimeNs
		});
		sameExecutableIdentity = (left, right) => left.dev === right.dev && left.ino === right.ino && left.mode === right.mode && left.size === right.size && left.mtimeNs === right.mtimeNs && left.ctimeNs === right.ctimeNs;
		filesystemFailure = (cause) => {
			if (!(cause instanceof Error) || !("code" in cause) || !("syscall" in cause)) return undefined;
			return `Executable file observation failed: ${cause.message}`;
		};
		selectedExecutableFileSystem = {
			open,
			stat: (path) => stat(path, { bigint: true })
		};
		observeSelectedExecutable = async (path, signal, fileSystem = selectedExecutableFileSystem, cleanupRetainer) => {
			assertNotCancelled(signal);
			try {
				const handle = await fileSystem.open(path, constants.O_RDONLY | constants.O_NONBLOCK);
				return await withProcessCaptureFile(path, handle, signal, cleanupRetainer, async (handle) => {
					const openedStats = await handle.stat({ bigint: true });
					if (!openedStats.isFile()) return {
						sha256: null,
						identity: null,
						reason: "Selected executable is not a regular file."
					};
					const openedIdentity = identityFromStats(openedStats);
					const selectedPathIdentity = identityFromStats(await fileSystem.stat(path));
					if (!sameExecutableIdentity(openedIdentity, selectedPathIdentity)) return {
						sha256: null,
						identity: null,
						reason: "Selected executable path changed while it was being opened."
					};
					assertNotCancelled(signal);
					const hash = createHash("sha256");
					for await (const chunk of readFileHandleChunks(handle, {
						signal,
						cancellationFailure: processCaptureCancelled
					})) {
						assertNotCancelled(signal);
						hash.update(chunk);
					}
					assertNotCancelled(signal);
					const finalIdentity = identityFromStats(await handle.stat({ bigint: true }));
					if (!sameExecutableIdentity(openedIdentity, finalIdentity)) return {
						sha256: null,
						identity: null,
						reason: "Selected executable changed while its contents were sampled."
					};
					return {
						sha256: hash.digest("hex"),
						identity: openedIdentity,
						reason: null
					};
				});
			} catch (cause) {
				if (cause instanceof ProcessCaptureReadFailure && !cause.cleanupIncomplete && cause.cancellation === undefined && cause.outcome.kind === "failed") {
					const reason = filesystemFailure(cause.outcome.cause);
					if (reason !== undefined) return {
						sha256: null,
						identity: null,
						reason
					};
				}
				const failure = normalizeCaptureFailure(cause);
				if (failure instanceof ProcessCaptureError) throw failure;
				const reason = filesystemFailure(failure);
				if (reason !== undefined) return {
					sha256: null,
					identity: null,
					reason
				};
				throw failure;
			}
		};
		observeLaunchedExecutable = (path, selected) => {
			if (selected.identity === null || selected.sha256 === null) return {
				selectedSha256: selected.sha256,
				sha256: null,
				state: "unknown",
				reason: selected.reason ?? "Selected executable identity is unavailable."
			};
			try {
				const currentStats = statSync(path, { bigint: true });
				const currentIdentity = identityFromStats(currentStats);
				if (currentStats.isFile() && sameExecutableIdentity(selected.identity, currentIdentity)) return {
					selectedSha256: selected.sha256,
					sha256: selected.sha256,
					state: "path_metadata_unchanged",
					reason: null
				};
				return {
					selectedSha256: selected.sha256,
					sha256: null,
					state: "unknown",
					reason: "Executable path metadata changed between sampling and spawn."
				};
			} catch (cause) {
				const reason = filesystemFailure(cause);
				if (reason !== undefined) return {
					selectedSha256: selected.sha256,
					sha256: null,
					state: "unknown",
					reason
				};
				throw cause;
			}
		};
		createRunManifest = async (scenario, startedAt, completedAt, executable, rootProcess, host = HOST_PLATFORM) => {
			const scenarioCommitment = processScenarioCommitment(scenario, executable.selectedSha256 ?? undefined);
			const comparisonContract = processComparisonContract(scenario);
			return {
				rea_version: PRODUCT_IDENTITY.packageVersion,
				provider_version: PROCESS_PROVIDER.version,
				platform: host.platform,
				architecture: host.architecture,
				pty_backend: "node-pty",
				started_at: startedAt.toISOString(),
				completed_at: completedAt.toISOString(),
				scenario: scenarioCommitment,
				comparison_contract: comparisonContract,
				full_scenario_sha256: digestProcessCommitment(scenarioCommitment),
				comparison_contract_sha256: digestProcessCommitment(comparisonContract),
				selected_executable_sha256: executable.selectedSha256,
				executable_sha256: executable.sha256,
				executable_identity: {
					state: executable.state,
					reason: executable.reason
				},
				root_process: rootProcess,
				normalization_sha256: digestProcessCommitment(scenario.normalization)
			};
		};
		observeSettlement = async ({ runId, processGroupIds, ownershipEvidence, settleMs, recordEvent = () => undefined, platform, signal, ownershipHost, onLiveProgress }) => {
			assertNotCancelled(signal);
			onLiveProgress?.();
			if (platform === "win32") {
				recordEvent("lifecycle", 1);
				return {
					state: "unverifiable",
					elapsed_ms: 0
				};
			}
			const started = monotonicProcessCaptureClock();
			let consecutiveEmpty = 0;
			let sawLive = false;
			let deadlineReached = false;
			while (!deadlineReached) {
				onLiveProgress?.();
				assertNotCancelled(signal);
				const observations = await observeOwnedProcessGroups(runId, processGroupIds, ownershipHost, signal, ownershipEvidence);
				assertNotCancelled(signal);
				if ([...observations.values()].some(({ state }) => state === "unverifiable")) {
					recordEvent("lifecycle", 1);
					return {
						state: "unverifiable",
						elapsed_ms: monotonicProcessCaptureClock() - started
					};
				}
				if ([...observations.values()].every(({ state }) => state === "empty")) {
					consecutiveEmpty += 1;
					if (consecutiveEmpty >= 2) {
						recordEvent("lifecycle", 1);
						return {
							state: "quiesced",
							elapsed_ms: monotonicProcessCaptureClock() - started
						};
					}
				} else {
					consecutiveEmpty = 0;
					sawLive = true;
				}
				deadlineReached = monotonicProcessCaptureClock() - started >= settleMs;
				if (deadlineReached) break;
				await setTimeout$1(50, undefined, { signal });
			}
			recordEvent("lifecycle", 1);
			return sawLive ? {
				state: "alive_at_deadline",
				elapsed_ms: monotonicProcessCaptureClock() - started
			} : {
				state: "unverifiable",
				elapsed_ms: monotonicProcessCaptureClock() - started
			};
		};
		describeUnverifiedCause = (cause, fallback) => {
			const message = errorMessage(cause);
			return message.trim() === "" ? fallback : message;
		};
		awaitTerminalExit = async ({ terminal, scenario, started, lastOutput, signal, signalTarget, recordFinalization, timers, interactions, dispatchedEventIndexes, recordEvent, onLiveProgress }) => new Promise((resolveExit) => {
			let reason = "exited";
			onLiveProgress?.();
			let finalizationStartedAt;
			let escalationSent = false;
			let settled = false;
			let exitObserved = false;
			const finalizationSignals = [];
			const pendingDeliveries = [];
			const snapshot = (elapsed, exitCode = null) => ({
				requested_ms: scenario.finalization_ms,
				elapsed_ms: elapsed,
				exit_code: exitCode,
				signals: finalizationSignals.map((attempt) => ({ ...attempt }))
			});
			const unobservedExit = () => {
				if (settled || exitObserved || finalizationStartedAt === undefined) return;
				settled = true;
				for (const timer of timers) timer.cancel();
				timers.clear();
				resolveExit({
					unobserved: true,
					reason: reason === "exited" ? "timeout" : reason,
					finalization: snapshot(null)
				});
			};
			const attempt = (finalizationSignal) => {
				if (finalizationStartedAt === undefined) return;
				const record = {
					signal: finalizationSignal,
					sent_at_ms: Math.max(0, monotonicProcessCaptureClock() - finalizationStartedAt),
					delivery: "unverified",
					reason: "delivery had not settled when the record was published"
				};
				finalizationSignals.push(record);
				recordFinalization(snapshot(null));
				const deliveryBound = new AbortController();
				pendingDeliveries.push(Promise.race([signalTarget(finalizationSignal), setTimeout$1(PROCESS_FINALIZATION_DELIVERY_GRACE_MS, {
					delivery: "unverified",
					reason: `delivery did not settle within ${String(PROCESS_FINALIZATION_DELIVERY_GRACE_MS)} ms`
				}, {
					ref: false,
					signal: deliveryBound.signal
				}).catch(() => ({
					delivery: "unverified",
					reason: "delivery wait was interrupted"
				}))]).finally(() => {
					deliveryBound.abort(OwnerCancellation.noLongerNeeded);
				}).then(({ delivery, reason: deliveryReason }) => {
					record.delivery = delivery;
					if (deliveryReason !== undefined) record.reason = deliveryReason;
					else delete record.reason;
				}, (cause) => {
					record.delivery = "unverified";
					record.reason = describeUnverifiedCause(cause, "signal delivery failed without a message");
				}).then(() => {
					recordFinalization(snapshot(null));
					if (finalizationSignal === "SIGKILL" && record.delivery !== "signaled" && record.delivery !== "gone") unobservedExit();
				}));
			};
			const forceKill = () => {
				if (finalizationStartedAt !== undefined) {
					if (escalationSent) return;
					escalationSent = true;
					attempt("SIGKILL");
					return;
				}
				terminal.kill("SIGKILL");
			};
			const terminateAtDeadline = () => {
				if (scenario.finalization_ms === 0) {
					terminal.kill("SIGKILL");
					return;
				}
				finalizationStartedAt = monotonicProcessCaptureClock();
				attempt("SIGTERM");
			};
			terminal.onExit((exit) => {
				if (settled) return;
				exitObserved = true;
				const finalizationElapsedMs = finalizationStartedAt === undefined ? undefined : Math.max(0, monotonicProcessCaptureClock() - finalizationStartedAt);
				recordEvent("lifecycle", 0);
				for (const [eventIndex, event] of scenario.events.entries()) {
					if (dispatchedEventIndexes.has(eventIndex)) continue;
					const sequence = interactions.length;
					interactions.push({
						sequence,
						scheduled_at_ms: event.at_ms,
						dispatched_at_ms: Math.max(0, monotonicProcessCaptureClock() - started),
						type: event.type,
						data: event.type === "input" ? "<not-dispatched>" : event.type === "resize" ? `${String(event.columns)}x${String(event.rows)}` : event.signal,
						outcome: "target_exited"
					});
					recordEvent("interaction_events", sequence);
				}
				for (const timer of timers) {
					timer.cancel();
				}
				timers.clear();
				const finish = () => {
					if (settled) return;
					settled = true;
					resolveExit({
						...exit,
						reason,
						...finalizationElapsedMs === undefined ? {} : { finalization: snapshot(finalizationElapsedMs, normalExitCode(exit)) }
					});
				};
				if (pendingDeliveries.length === 0) {
					finish();
					return;
				}
				const grace = new AbortController();
				void Promise.race([Promise.allSettled(pendingDeliveries), setTimeout$1(PROCESS_FINALIZATION_DELIVERY_GRACE_MS, undefined, {
					ref: false,
					signal: grace.signal
				}).catch(() => undefined)]).finally(() => {
					grace.abort(OwnerCancellation.noLongerNeeded);
				}).then(finish);
			});
			const timeout = scheduleProcessInterval(() => {
				onLiveProgress?.();
				if (signal?.aborted === true) {
					reason = "cancelled";
					forceKill();
				} else if (finalizationStartedAt !== undefined) {
					if (monotonicProcessCaptureClock() - finalizationStartedAt >= scenario.finalization_ms) forceKill();
				} else if (monotonicProcessCaptureClock() - started >= scenario.timeout_ms) {
					reason = "timeout";
					terminateAtDeadline();
				} else if (monotonicProcessCaptureClock() - lastOutput() >= scenario.idle_timeout_ms) {
					reason = "idle_timeout";
					terminateAtDeadline();
				}
			}, 20);
			timers.add(timeout);
		});
		processCaptureCleanupHost = {
			platform: HOST_PLATFORM.platform,
			cleanupProcessGroup: cleanupOwnedProcessGroup,
			removeTemporaryRoot: (path) => rm(path, {
				recursive: true,
				force: true
			})
		};
		PROCESS_FINALIZATION_DELIVERY_GRACE_MS = 1e3;
		releaseCapturedProcessGroup = async (ownership, host) => {
			if (host.platform === "win32") return {
				report: {
					state: "unverified",
					reason: "owned process cleanup is unverifiable on Windows without process-job authority"
				},
				signaled: undefined
			};
			let outcome = {
				state: "cleaned",
				reason: null
			};
			const unverified = [];
			const cleaned = await host.cleanupProcessGroup(ownership);
			unverified.push(...cleaned.unverified ?? []);
			if (!cleaned.cleaned) outcome = {
				state: "unverified",
				reason: cleaned.reason
			};
			return {
				signaled: cleaned.signaled,
				report: unverified.length === 0 ? outcome : {
					...outcome,
					unverified_processes: [...new Map(unverified.map(({ pid, diagnostic }) => [`${String(pid)}:${diagnostic}`, {
						pid,
						reason: diagnostic
					}])).values()]
				}
			};
		};
		ProcessCaptureResourceOwner = class {
			options;
			cleanupLease;
			#host;
			#ownershipEvidence;
			#inspections;
			#cleanupInspections = new Set();
			#terminalRenderer;
			#ownedProcessGroup;
			#temporaryRoot;
			#ownedProcessesSignaled = false;
			constructor(options) {
				this.options = options;
				this.#host = options.host ?? processCaptureCleanupHost;
				this.#inspections = new Set(options.inspectionFailures);
				this.#ownershipEvidence = options.ownershipEvidence ?? new ProcessOwnershipEvidenceOwner();
				if (options.renderer === undefined) this.#terminalRenderer = {
					state: "not_required",
					reason: null
				};
				if (options.terminal === undefined) this.#ownedProcessGroup = {
					state: "not_required",
					reason: null
				};
				this.cleanupLease = new AnalysisCleanupLease(async () => {
					const report = await this.close();
					const failure = cleanupReportFailure(report) ?? (this.#hasPendingInspection() ? "Process ownership inspection cleanup remains incomplete." : undefined);
					if (failure === undefined) return;
					const error = new ProcessCaptureError(failure, {
						reason: "cleanup_incomplete",
						cleanup: {
							reason: failure,
							resources: this.cleanupResources
						},
						cleanupReport: report
					});
					new AnalysisCleanupLeaseGroup(error, [this.cleanupLease]);
					throw error;
				}, this);
			}
			get cleanupResources() {
				return [...new Set([...unresolvedCleanupResources(this.report).map((resource) => resource === "temporary_root" ? this.options.temporaryRoot : resource), ...[...this.#inspections].flatMap((failure) => failure.cleanupLeases.flatMap((lease) => lease.released ? [] : lease.cleanupResources ?? []))])];
			}
			get report() {
				return structuredClone({
					owned_process_group: this.#ownedProcessGroup ?? {
						state: "unverified",
						reason: "owned process cleanup was not attempted"
					},
					terminal_renderer: this.#terminalRenderer ?? {
						state: "unverified",
						reason: "terminal renderer cleanup was not attempted"
					},
					temporary_root: this.#temporaryRoot ?? {
						state: "unverified",
						reason: "temporary root cleanup was not attempted"
					}
				});
			}
			async close() {
				for (const timer of this.options.timers) timer.cancel();
				for (const lease of new Set([...this.#inspections].flatMap((failure) => failure.cleanupLeases))) {
					try {
						await lease.release();
					} catch {}
				}
				await this.#releaseOwnedProcessGroup();
				await this.#releaseRenderer();
				await this.#releaseTemporaryRoot();
				return this.report;
			}
			async release() {
				try {
					await this.cleanupLease.release();
					return this.#outcome(this.report);
				} catch (cause) {
					if (!(cause instanceof ProcessCaptureError) || cause.cleanupReport === undefined) throw cause;
					return this.#outcome(cause.cleanupReport);
				}
			}
			#outcome(report) {
				return {
					report,
					cleanupLease: this.cleanupLease,
					...this.#ownedProcessesSignaled === undefined ? {} : { ownedProcessesSignaled: this.#ownedProcessesSignaled },
					...this.#cleanupInspections.size === 0 ? {} : { inspectionFailures: [...this.#cleanupInspections] }
				};
			}
			async #releaseRenderer() {
				if (this.options.renderer === undefined || this.#terminalRenderer?.state === "cleaned" || this.#terminalRenderer?.state === "not_required") return;
				try {
					await this.options.renderer.dispose();
					this.#terminalRenderer = {
						state: "cleaned",
						reason: null
					};
				} catch (cause) {
					this.#terminalRenderer = {
						state: "failed",
						reason: cleanupFailureMessage(cause, "renderer dispose failed")
					};
				}
			}
			async #releaseOwnedProcessGroup() {
				if (this.options.terminal === undefined || this.#ownedProcessGroup?.state === "cleaned" || this.#ownedProcessGroup?.state === "not_required") return;
				if (this.#hasPendingInspection()) {
					this.#ownedProcessGroup = {
						state: "unverified",
						reason: "Process ownership inspection cleanup remains incomplete; fresh ownership inspection was not attempted."
					};
					return;
				}
				try {
					const outcome = await releaseCapturedProcessGroup({
						runId: this.options.runId,
						leaderPid: this.options.terminal.pid,
						processGroupId: this.options.terminal.pid,
						sweepTokenOwnedProcesses: true,
						evidenceOwner: this.#ownershipEvidence,
						...this.options.sampledProcessGroupIds === undefined ? {} : { sampledProcessGroupIds: this.options.sampledProcessGroupIds },
						...this.options.captureBaseline === undefined ? {} : { captureBaseline: this.options.captureBaseline }
					}, this.#host);
					this.#ownedProcessGroup = outcome.report;
					this.#recordSignaled(outcome.signaled);
				} catch (cause) {
					this.#recordSignaled(cleanupFailureFollowedSignal(cause) ? true : undefined);
					const normalized = normalizeCaptureFailure(cause);
					if (normalized instanceof ProcessCaptureInspectionFailure && !this.#inspections.has(normalized)) {
						this.#inspections.add(normalized);
						this.#cleanupInspections.add(normalized);
					}
					this.#ownedProcessGroup = {
						state: "failed",
						reason: describeProcessCaptureExecutionFailure(cause) ?? "owned process cleanup failed"
					};
				}
			}
			#hasPendingInspection() {
				return [...this.#inspections].some((failure) => failure.cleanupLeases.some((lease) => !lease.released));
			}
			#recordSignaled(signaled) {
				this.#ownedProcessesSignaled = this.#ownedProcessesSignaled === true || signaled === true ? true : this.#ownedProcessesSignaled === undefined || signaled === undefined ? undefined : false;
			}
			async #releaseTemporaryRoot() {
				if (this.#temporaryRoot?.state === "cleaned") return;
				const owned = this.#ownedProcessGroup;
				if (owned?.state === "failed" || owned?.state === "unverified") {
					this.#temporaryRoot = {
						state: "unverified",
						reason: `temporary root retained because owned process cleanup is ${owned.state}: ${owned.reason ?? "ownership could not be verified"}`
					};
					return;
				}
				try {
					await this.#host.removeTemporaryRoot(this.options.temporaryRoot);
					this.#temporaryRoot = {
						state: "cleaned",
						reason: null
					};
				} catch (cause) {
					this.#temporaryRoot = {
						state: "failed",
						reason: cleanupFailureMessage(cause, "temporary root removal failed")
					};
				}
			}
		};
		cleanupFailureMessage = (cause, fallback) => cause instanceof Error ? cause.message || cause.name || fallback : fallback;
		ProcessCaptureResourceScope = class {
			#pending = new Set();
			#active = new Set();
			#draining;
			#closed = false;
			/** Admit one capture before it starts acquiring resources. */
			async run(operation) {
				while (true) {
					while (this.#draining !== undefined) await this.#draining;
					if (this.#closed) throw new ProcessCaptureError("process capture lifecycle is closing; start a new server session before capturing again");
					if (this.#pending.size === 0) break;
					await this.retryCleanup();
				}
				const running = Promise.resolve().then(operation);
				this.#active.add(running);
				try {
					return await running;
				} finally {
					this.#active.delete(running);
				}
			}
			/** Retain an exact child owner acquired by an already admitted capture. */
			retain(lease) {
				if (!lease.released) this.#pending.add(lease);
			}
			/** Adopt only the inspection owner's exact leases into this capture lifetime. */
			retainInspectionFailure(cause) {
				const normalized = normalizeCaptureFailure(cause);
				if (!(normalized instanceof ProcessCaptureInspectionFailure)) return undefined;
				for (const lease of normalized.cleanupLeases) this.retain(lease);
				return normalized;
			}
			async release(options) {
				const owner = new ProcessCaptureResourceOwner(options);
				this.#pending.add(owner.cleanupLease);
				for (const inspection of options.inspectionFailures ?? []) for (const lease of inspection.cleanupLeases) this.#pending.delete(lease);
				const outcome = await owner.release();
				if (owner.cleanupLease.released) this.#pending.delete(owner.cleanupLease);
				return outcome;
			}
			/** Drain active captures, then retry their retained resources without closing admission. */
			retryCleanup() {
				if (this.#draining !== undefined) return this.#draining;
				this.#draining = this.#drainAndRetry().finally(() => {
					this.#draining = undefined;
				});
				return this.#draining;
			}
			/** Stop admitting new captures, drain active runs, and retry all retained owners. */
			close() {
				this.#closed = true;
				return this.retryCleanup();
			}
			async #drainAndRetry() {
				while (this.#active.size > 0) await Promise.allSettled(this.#active);
				const failures = [];
				for (const lease of this.#pending) {
					try {
						await lease.release();
						this.#pending.delete(lease);
					} catch (cause) {
						failures.push({
							lease,
							cause
						});
					}
				}
				if (failures.length === 0) return;
				const reason = failures.map(({ cause }) => cleanupFailureMessage(cause, "cleanup incomplete")).join("; ");
				const error = new ProcessCaptureError(`Process capture cleanup remains incomplete: ${reason}`, {
					cause: new AggregateError(failures.map(({ cause }) => cause), "Process capture resources remain owned"),
					reason: "cleanup_incomplete",
					cleanup: {
						reason,
						resources: [...new Set(failures.flatMap(({ lease }) => lease.cleanupResources ?? []))]
					}
				});
				new AnalysisCleanupLeaseGroup(error, failures.map(({ lease }) => lease));
				throw error;
			}
		};
		unresolvedCleanupOutcomes = (report) => Object.entries(report).filter(([, outcome]) => outcome.state === "failed" || outcome.state === "unverified");
		unresolvedCleanupResources = (report) => unresolvedCleanupOutcomes(report).map(([resource]) => resource);
		cleanupReportFailure = (report) => {
			const failures = unresolvedCleanupOutcomes(report);
			return failures.length === 0 ? undefined : failures.map(([resource, outcome]) => `${resource}: ${outcome.reason ?? outcome.state}`).join("; ");
		};
		captureTerminalFrames = (options) => {
			let rawBytes = 0;
			let normalizedBytes = 0;
			let observedBytes = 0;
			let observedFrames = 0;
			let normalizedOmittedFrames = 0;
			let firstIdentifiers;
			let sealed = false;
			let redactedBytes = 0;
			const subscription = options.terminal.onData((data) => {
				if (sealed) return;
				options.onOutput();
				const bytes = Buffer.byteLength(data);
				observedBytes += bytes;
				observedFrames += 1;
				const budget = options.scenario.limits.output_bytes;
				if (bytes > budget - rawBytes) {
					return;
				}
				const normalized = options.normalizeText(data, budget - normalizedBytes);
				if (normalized.state === "over_budget") {
					normalizedOmittedFrames += 1;
					return;
				}
				firstIdentifiers ??= options.identifiers();
				rawBytes += bytes;
				normalizedBytes += normalized.utf8Bytes;
				const atMs = normalizeProcessElapsedTime(monotonicProcessCaptureClock() - options.started, options.scenario.normalization.time_bucket_ms);
				const sequence = options.frames.length;
				options.frames.push({
					sequence,
					at_ms: atMs,
					data: normalized.value,
					...normalized.value === data ? {} : { raw_data: data }
				});
				options.renderer.write(options.sensitiveOutput === undefined ? data : () => {
					if (options.sensitiveOutput?.failure !== undefined) throw options.sensitiveOutput.failure;
					const frame = options.frames[sequence];
					if (frame === undefined) throw new ProcessCaptureError("Retained terminal frame is unavailable.");
					return frame.raw_data ?? frame.data;
				}, atMs);
				options.recordEvent("frames", sequence);
			});
			return () => {
				if (!sealed) {
					sealed = true;
					try {
						if (options.sensitiveOutput !== undefined) {
							const projection = options.sensitiveOutput.projectRawFrames(options.frames, observedFrames > options.frames.length);
							if (!projection.ok) throw projection.error;
							redactedBytes = projection.value;
							normalizedBytes = normalizeRetainedTerminalFrames(options.frames, options.normalizeText, options.scenario.limits.output_bytes, "sensitive-input");
							const normalized = options.sensitiveOutput.projectNormalizedFrames(options.frames);
							if (!normalized.ok) throw normalized.error;
							normalizedBytes = normalized.value;
							rawBytes -= redactedBytes;
						}
					} catch (cause) {
						if (options.sensitiveOutput !== undefined) {
							const failure = cause instanceof AnalysisError ? cause : new ProcessCaptureError("Sensitive terminal projection failed; terminal text was withheld.");
							options.sensitiveOutput.fail(failure);
							for (const [index, frame] of options.frames.entries()) options.frames[index] = {
								sequence: frame.sequence,
								at_ms: frame.at_ms,
								data: ""
							};
							options.onSensitiveOutputFailure?.();
							throw failure;
						}
						throw cause;
					} finally {
						try {
							subscription.dispose();
						} catch (cause) {
							if (options.sensitiveOutput?.failure === undefined) throw cause;
							options.sensitiveOutput.failure.retainSecondaryFailure(new ProcessCaptureError("Terminal subscription disposal failed."));
						}
					}
				}
				if (options.sensitiveOutput?.failure !== undefined) throw options.sensitiveOutput.failure;
				const identifiers = options.identifiers();
				if (options.sensitiveOutput === undefined && options.scenario.normalization.pids && firstIdentifiers !== undefined && identifiers !== firstIdentifiers) {
					normalizedBytes = normalizeRetainedTerminalFrames(options.frames, options.normalizeText, options.scenario.limits.output_bytes);
					firstIdentifiers = identifiers;
				}
				return {
					raw_terminal: {
						budget_bytes: options.scenario.limits.output_bytes,
						observed_bytes: observedBytes,
						retained_bytes: rawBytes,
						...options.sensitiveOutput === undefined ? {} : { redacted_bytes: redactedBytes },
						observed_frames: observedFrames,
						retained_frames: options.frames.length
					},
					normalized_terminal: {
						budget_bytes: options.scenario.limits.output_bytes,
						retained_bytes: normalizedBytes,
						omitted_frames: normalizedOmittedFrames
					}
				};
			};
		};
		PROCESS_CAPTURE_CLEANUP_INTERVENTION_UNKNOWN = {
			scope: "process",
			reason: "Owned-process cleanup sent termination signals. Later terminal and filesystem observations may omit work ended by this intervention."
		};
		cleanupResidualUnknowns = (unknowns, signaled) => signaled === true && !unknowns.some((unknown) => unknown.scope === PROCESS_CAPTURE_CLEANUP_INTERVENTION_UNKNOWN.scope && unknown.reason === PROCESS_CAPTURE_CLEANUP_INTERVENTION_UNKNOWN.reason) ? [...unknowns, PROCESS_CAPTURE_CLEANUP_INTERVENTION_UNKNOWN] : unknowns;
		processCaptureCleanupFacts = (capture, outcome) => ({
			settlement: capture.settlement.state === "quiesced" ? {
				...capture.settlement,
				cleanup_outcome: outcome.ownedProcessesSignaled === true || "cleanup_outcome" in capture.settlement && capture.settlement.cleanup_outcome === "cleaned" ? "cleaned" : "not_required"
			} : {
				...capture.settlement,
				cleanup_outcome: outcome.ownedProcessesSignaled !== true && "cleanup_outcome" in capture.settlement && capture.settlement.cleanup_outcome === "failed" ? "failed" : "cleaned"
			},
			residual_unknowns: cleanupResidualUnknowns(capture.residual_unknowns, outcome.ownedProcessesSignaled)
		});
		resolveProcessResult = (capture, executionFailure, cleanupOutcome, observations, partialContext) => {
			const cleanup = cleanupOutcome.report;
			const cleanupFailure = cleanupReportFailure(cleanup);
			const executionFailureReason = describeProcessCaptureExecutionFailure(executionFailure);
			let partialObservation;
			if ((cleanupFailure !== undefined || executionFailure !== undefined) && (capture !== undefined || observations !== undefined)) {
				const normalizedObservations = observations === undefined || partialContext === undefined ? observations : normalizePartialProcessObservations(observations, partialContext);
				if (capture === undefined) {
					if (normalizedObservations !== undefined) {
						const partialResult = partialProcessCaptureObservationSchema.safeParse({
							observations: {
								...normalizedObservations,
								...cleanupOutcome.ownedProcessesSignaled === true ? { residual_unknowns: cleanupResidualUnknowns(normalizedObservations.residual_unknowns ?? [], cleanupOutcome.ownedProcessesSignaled) } : {}
							},
							cleanup,
							execution_failure: executionFailureReason ?? null
						});
						if (partialResult.success) partialObservation = partialResult.data;
					}
				} else {
					const captureData = "cleanup" in capture ? (() => {
						const { cleanup: _cleanup, ...data } = capture;
						void _cleanup;
						return data;
					})() : capture;
					const cleanupFacts = processCaptureCleanupFacts(capture, { ownedProcessesSignaled: cleanupOutcome.ownedProcessesSignaled });
					const partialResult = partialProcessCaptureObservationSchema.safeParse({
						capture: {
							...captureData,
							...cleanupFacts,
							settlement: cleanupFailure === undefined ? cleanupFacts.settlement : {
								...cleanupFacts.settlement,
								cleanup_outcome: "failed"
							}
						},
						cleanup,
						execution_failure: executionFailureReason ?? null
					});
					if (partialResult.success) partialObservation = partialResult.data;
				}
			}
			if (cleanupFailure !== undefined) {
				const cleanupResources = unresolvedCleanupResources(cleanup);
				const cleanupError = new ProcessCaptureError(cleanupFailure, {
					cause: executionFailure,
					reason: "cleanup_incomplete",
					cleanup: {
						reason: cleanupFailure,
						resources: cleanupResources
					},
					...executionFailureReason === undefined ? {} : { executionFailure: executionFailureReason },
					...partialObservation === undefined ? {} : { partialObservation },
					cleanupReport: cleanup
				});
				if (cleanupOutcome.cleanupLease !== undefined) new AnalysisCleanupLeaseGroup(cleanupError, [cleanupOutcome.cleanupLease]);
				for (const inspection of cleanupOutcome.inspectionFailures ?? []) {
					if (inspection !== executionFailure) cleanupError.retainSecondaryFailure(inspection);
					retainCaptureInspectionCancellations(executionFailure instanceof AnalysisError ? executionFailure : cleanupError, inspection);
				}
				if (executionFailure instanceof ProcessCaptureError) throw executionFailure.withFinalization({
					...executionFailureReason === undefined ? {} : { executionFailure: executionFailureReason },
					...partialObservation === undefined ? {} : { partialObservation },
					cleanupReport: cleanup,
					cleanupFailure: cleanupError
				});
				if (executionFailure instanceof AnalysisError) {
					if (partialObservation !== undefined) executionFailure.retainPartialObservation(partialObservation);
					throw analysisErrorWithCleanupDependencies(executionFailure, cleanupError, "capture_process");
				}
				throw cleanupError;
			}
			if (executionFailure instanceof ProcessCaptureError) {
				throw executionFailure.withFinalization({
					...executionFailureReason === undefined ? {} : { executionFailure: executionFailureReason },
					...partialObservation === undefined ? {} : { partialObservation },
					cleanupReport: cleanup
				});
			}
			if (executionFailure !== undefined) {
				if (executionFailure instanceof AnalysisError) {
					if (partialObservation !== undefined) executionFailure.retainPartialObservation(partialObservation);
					executionFailure.retainDiagnostics({ cleanup_report: jsonValueSchema.parse(cleanup) });
					throw executionFailure;
				}
				throw new ProcessCaptureError("process capture failed", {
					cause: executionFailure,
					reason: "capture_failed",
					...executionFailureReason === undefined ? {} : { executionFailure: executionFailureReason },
					...partialObservation === undefined ? {} : { partialObservation },
					cleanupReport: cleanup
				});
			}
			if (capture === undefined) throw new ProcessCaptureError("process capture produced no result");
			const unverifiedProcesses = cleanup.owned_process_group.unverified_processes;
			const cleanupFacts = processCaptureCleanupFacts(capture, { ownedProcessesSignaled: cleanupOutcome.ownedProcessesSignaled });
			if ("cleanup" in capture && unverifiedProcesses === undefined && capture.settlement.cleanup_outcome === cleanupFacts.settlement.cleanup_outcome && capture.residual_unknowns === cleanupFacts.residual_unknowns) return capture;
			try {
				return parseProcessCapture({
					...capture,
					...cleanupFacts,
					residual_unknowns: [...cleanupFacts.residual_unknowns, ...(unverifiedProcesses ?? []).map(({ pid, reason }) => ({
						scope: "process",
						reason: `Ownership of unrelated process ${String(pid)} could not be verified; it was left untouched: ${reason}`
					}))],
					cleanup: {
						..."cleanup" in capture ? capture.cleanup : {},
						owned_process_group: "verified",
						temporary_root: "removed",
						...unverifiedProcesses === undefined ? {} : { unverified_processes: unverifiedProcesses }
					}
				});
			} catch (cause) {
				throw new ProcessCaptureError(`process capture validation failed${cause instanceof Error ? `: ${cause.message}` : ""}`, { cause });
			}
		};
		prepareProcessCapture = async (scenario, signal, captureSnapshot = snapshotRoots, host = systemProcessPreparationHost, resourceScope) => {
			assertNotCancelled(signal);
			let before;
			let temporaryRoot;
			const runId = randomUUID();
			try {
				await host.prepareOwnershipInspector?.(signal);
				assertNotCancelled(signal);
				temporaryRoot = await host.createTemporaryRoot();
				before = await captureSnapshot(scenario, signal, undefined, {
					cleanup: resourceScope,
					observerPaths: [temporaryRoot]
				});
				assertNotCancelled(signal);
				const ownershipBaseline = await host.captureOwnershipBaseline?.(signal) ?? [];
				assertNotCancelled(signal);
				return {
					temporaryRoot,
					runId,
					ownershipBaseline,
					before
				};
			} catch (cause) {
				let failure = cause;
				if (cause instanceof ProcessCaptureSnapshotFailure) {
					before = cause.snapshot;
					for (const lease of cause.cleanupLeases) resourceScope.retain(lease);
					failure = cause.failureForCaller();
				}
				const normalized = normalizeCaptureFailure(failure);
				resourceScope.retainInspectionFailure(normalized);
				const cleanupOptions = temporaryRoot === undefined ? undefined : {
					timers: new Set(),
					terminal: undefined,
					renderer: undefined,
					runId,
					temporaryRoot,
					...normalized instanceof ProcessCaptureInspectionFailure ? { inspectionFailures: [normalized] } : {},
					host: {
						...processCaptureCleanupHost,
						removeTemporaryRoot: host.cleanup
					}
				};
				const cleanup = cleanupOptions === undefined ? {
					report: {
						terminal_renderer: {
							state: "not_required",
							reason: null
						},
						owned_process_group: {
							state: "not_required",
							reason: null
						},
						temporary_root: {
							state: "not_required",
							reason: null
						}
					},
					cleanupLease: undefined
				} : await resourceScope.release(cleanupOptions);
				resolveProcessResult(undefined, normalized, cleanup, createProcessCaptureObservationBuffer({
					frames: [],
					interactions: [],
					samples: [],
					eventJournal: [],
					before,
					finalizationEnabled: scenario.finalization_ms > 0
				}), { scenario });
				throw failure;
			}
		};
		systemProcessPreparationHost = {
			prepareOwnershipInspector: prepareProcessOwnershipInspection,
			captureOwnershipBaseline: (signal) => systemProcessOwnershipHost.captureBaseline?.(signal) ?? Promise.resolve([]),
			createTemporaryRoot: () => mkdtemp(join(tmpdir(), "rea-process-")),
			cleanup: (path) => rm(path, {
				recursive: true,
				force: true
			})
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessCaptureJournal.js
var createProcessCaptureJournal, scheduleScenarioInteractions;
function init_ProcessCaptureJournal() {
	return (init_ProcessCaptureJournal = __esmMin((() => {
		init_processScenario();
		init_ProcessNormalization();
		init_ProcessTimer();
		init_ProcessCaptureClock();
		createProcessCaptureJournal = () => {
			const entries = [];
			const recordEvent = (collection, index) => {
				entries.push({
					capture_order: entries.length,
					collection,
					index
				});
			};
			return {
				entries,
				recordEvent
			};
		};
		scheduleScenarioInteractions = (options) => {
			const { scenario, getTerminal, timers, interactions, renderer, started } = options;
			for (const [eventIndex, event] of scenario.events.entries()) {
				const timer = scheduleProcessDelay(event.at_ms, () => {
					options.dispatchedEventIndexes.add(eventIndex);
					const terminal = getTerminal();
					const dispatchedAt = Math.max(0, monotonicProcessCaptureClock() - started);
					let outcome = "dispatched";
					if (terminal === undefined) outcome = "target_exited";
					else {
						try {
							if (event.type === "input") terminal.write(event.data);
							else if (event.type === "resize") {
								terminal.resize(event.columns, event.rows);
								renderer.resize(event.columns, event.rows, normalizeProcessElapsedTime(dispatchedAt, scenario.normalization.time_bucket_ms));
							} else terminal.kill(event.signal);
						} catch (cause) {
							void cause;
							outcome = "failed";
						}
					}
					const sequence = interactions.length;
					interactions.push({
						sequence,
						scheduled_at_ms: event.at_ms,
						dispatched_at_ms: dispatchedAt,
						type: event.type,
						...event.type === "input" && event.sensitive ? sensitiveProcessInputProjection(event.data) : { data: event.type === "input" ? normalizeProcessText(event.data, scenario, undefined, -1) : event.type === "resize" ? `${String(event.columns)}x${String(event.rows)}` : event.signal },
						outcome
					});
					options.recordEvent("interaction_events", sequence);
				});
				timers.add(timer);
			}
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessCaptureEnvironment.js
var makeProcessCaptureEnvironment;
function init_ProcessCaptureEnvironment() {
	return (init_ProcessCaptureEnvironment = __esmMin((() => {
		init_HostPlatform();
		init_snapshotEnvironment();
		makeProcessCaptureEnvironment = (options) => {
			const platform = options.platform ?? HOST_PLATFORM.platform;
			const environment = snapshotEnvironment(mergeEnvironmentOverrides(options.hostEnvironment, options.scenario.environment, platform), platform);
			return {
				...Object.fromEntries(Object.entries(environment).filter((entry) => entry[1] !== undefined)),
				TERM: environment.TERM ?? "xterm-256color",
				REA_PROCESS_RUN_ID: options.runId
			};
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessCaptureCapability.js
var processCaptureOwnershipUnavailableReason, processCaptureProbeFailureReason, probeProcessCaptureCapability;
function init_ProcessCaptureCapability() {
	return (init_ProcessCaptureCapability = __esmMin((() => {
		init_HostPlatform();
		init_ProcessOwnershipObservation();
		processCaptureOwnershipUnavailableReason = (platform) => platform === "win32" ? "Windows PTY process capture is unavailable because this adapter does not yet verify descendant cleanup. Use Linux (including WSL for Linux commands) or macOS. Reinstalling the PTY backend does not enable native Windows capture." : undefined;
		processCaptureProbeFailureReason = (cause) => {
			const error = cause instanceof Error ? cause : new Error(String(cause));
			const code = "code" in error ? String(error.code) : "";
			const diagnostic = error.message;
			if (code === "ERR_MODULE_NOT_FOUND" || code === "MODULE_NOT_FOUND" || /cannot find module|cannot find package/iu.test(diagnostic)) return `the native PTY module is missing (${diagnostic}); reinstall REA for this host with optional dependencies enabled (for a source checkout, run npm ci)`;
			if (/NODE_MODULE_VERSION|compiled against a different Node\.js version|module version mismatch/iu.test(diagnostic)) return `the native PTY module is incompatible with this Node.js runtime (${diagnostic}); reinstall REA for this host and active Node.js version with optional dependencies enabled (for a source checkout, run npm ci after selecting that Node.js version)`;
			if (code === "ERR_DLOPEN_FAILED") return `the native PTY library failed to load (${diagnostic}); check the loader error, then reinstall REA for this host with optional dependencies enabled (for a source checkout, run npm ci)`;
			return `the native PTY probe failed (${diagnostic}); check the reported operating-system or process-startup error and reinstall REA for this host with optional dependencies enabled if the native binary is missing`;
		};
		probeProcessCaptureCapability = async (options = {}) => {
			const platform = options.platform ?? HOST_PLATFORM.platform;
			const ownershipReason = processCaptureOwnershipUnavailableReason(platform);
			if (ownershipReason !== undefined) return {
				available: false,
				backend: "node-pty",
				reason: ownershipReason
			};
			if (platform === "darwin") {
				try {
					await (options.prepareOwnershipInspector ?? prepareProcessOwnershipInspection)();
				} catch (cause) {
					return {
						available: false,
						backend: "node-pty",
						reason: cause instanceof Error ? cause.message : "macOS process ownership inspection could not be prepared"
					};
				}
			}
			try {
				const { spawn } = await (options.loadPty ?? (() => import("@lydell/node-pty")))();
				const terminal = spawn(platform === "win32" ? "cmd.exe" : "/bin/sh", platform === "win32" ? [
					"/c",
					"exit",
					"0"
				] : ["-c", "exit 0"], {
					cwd: tmpdir(),
					env: {
						HOME: tmpdir(),
						TERM: "xterm-256color"
					},
					cols: 80,
					rows: 24,
					name: "xterm-256color"
				});
				await new Promise((resolveExit) => terminal.onExit(() => resolveExit()));
				return {
					available: true,
					backend: "node-pty"
				};
			} catch (cause) {
				return {
					available: false,
					backend: "node-pty",
					reason: processCaptureProbeFailureReason(cause)
				};
			}
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessCaptureProgress.js
var formatProgressMessage, createProcessCaptureProgressTracker;
function init_ProcessCaptureProgress() {
	return (init_ProcessCaptureProgress = __esmMin((() => {
		init_ProcessCaptureClock();
		formatProgressMessage = (elapsedMs, counts, disposition, cleanup) => {
			const status = `elapsed_ms=${String(elapsedMs)} frames=${String(counts.frames)} samples=${String(counts.samples)} interactions=${String(counts.interactions)}`;
			const dispositionText = disposition === undefined ? "" : ` disposition=${disposition}`;
			const cleanupText = cleanup !== undefined ? ` owned_process_group=${cleanup.owned_process_group.state} terminal_renderer=${cleanup.terminal_renderer.state} temporary_root=${cleanup.temporary_root.state}` : disposition === undefined ? "" : " owned_process_group=unverified terminal_renderer=unverified temporary_root=unverified";
			return `${status}${dispositionText}${cleanupText}`;
		};
		createProcessCaptureProgressTracker = (progress) => {
			const started = monotonicProcessCaptureClock();
			let completed = 0;
			let live = true;
			let next;
			let pending;
			const flush = async () => {
				try {
					while (next !== undefined) {
						const update = next;
						next = undefined;
						try {
							await progress?.report(update);
						} catch {
							continue;
						}
					}
				} finally {
					pending = undefined;
				}
			};
			return {
				closeLive() {
					live = false;
					if (next?.terminal !== true) next = undefined;
				},
				report(update) {
					if (progress === undefined) return Promise.resolve();
					if (update.terminal !== true && !live) return Promise.resolve();
					const units = update.counts.frames + update.counts.samples + update.counts.interactions;
					if (units > completed) completed = units;
					next = {
						phase: update.phase,
						completed,
						total: null,
						message: formatProgressMessage(Math.max(0, monotonicProcessCaptureClock() - started), update.counts, update.disposition, update.cleanup),
						...update.terminal === true ? { terminal: true } : {}
					};
					pending ??= Promise.resolve().then(flush);
					return pending;
				}
			};
		};
	})))();
}

//#endregion
//#region dist/process/capture/ProcessHarness.js
var retainRootIdentity, retainRootSignaller, capturedRootProcess, cleanupFailedStartup, createTerminalRenderer, startCaptureRuntime, retainRunInspectionFailures, retainRootIdentityFailure, retainSecondaryInspectionFailure, finishProcessRun, completeCapture, captureProgressDisposition, runProcessScenario, captureProcessScenario;
function init_ProcessHarness() {
	return (init_ProcessHarness = __esmMin((() => {
		init_ProcessAdmissionError();
		init_HostPlatform();
		init_processCaptureParsing();
		init_result();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_ProcessTerminalObservation();
		init_analysisErrorCleanup();
		init_ProcessCaptureError();
		init_ProcessSampling();
		init_AbortablePromise();
		init_FilesystemSnapshot();
		init_TerminalRenderer();
		init_ProcessSensitiveOutput();
		init_ProcessNormalization();
		init_ProcessOwnershipProcessTree();
		init_ProcessCaptureLifecycle();
		init_ProcessScenarioRuntimeValidation();
		init_ProcessCaptureJournal();
		init_ProcessCaptureEnvironment();
		init_ProcessFilesystemEffects();
		init_ProcessCaptureCapability();
		init_ProcessCaptureProgress();
		init_ProcessOwnershipEvidence();
		init_ProcessOwnershipObservation();
		init_ProcessCaptureClock();
		retainRootIdentity = (pid, runId, observe = (rootPid) => observeProcessStartIdentity(rootPid, undefined, runId)) => observe(pid).then((observation) => observation === undefined ? { state: "gone" } : observation.state === "readable" ? {
			state: "identity",
			identity: observation.identity
		} : {
			state: "unverified",
			reason: observation.reason.trim() === "" ? "start identity is unavailable without a diagnostic" : observation.reason
		}, (cause) => {
			const [inspectionFailure] = captureInspectionFailures(normalizeCaptureFailure(cause));
			return {
				state: "unverified",
				reason: describeUnverifiedCause(cause, "start identity inspection failed without a message"),
				...inspectionFailure === undefined ? {} : { inspectionFailure }
			};
		});
		retainRootSignaller = (pid, retained, signalProcess = signalProcessWithStartIdentity) => {
			const deliveries = new Set();
			const inspectionFailures = [];
			const deliver = async (signal) => {
				const identity = await retained;
				if (identity.state === "unverified") return {
					delivery: "unverified",
					reason: identity.reason
				};
				if (identity.state === "gone") return { delivery: "gone" };
				try {
					const delivery = await signalProcess(pid, identity.identity, signal);
					return delivery === "unverified" ? {
						delivery,
						reason: "start identity could not be verified or the signal call failed"
					} : { delivery };
				} catch (cause) {
					inspectionFailures.push(...captureInspectionFailures(normalizeCaptureFailure(cause)));
					return {
						delivery: "unverified",
						reason: describeUnverifiedCause(cause, "signal delivery failed without a message")
					};
				}
			};
			return {
				signal: (signal) => {
					const delivery = deliver(signal);
					deliveries.add(delivery);
					void delivery.finally(() => deliveries.delete(delivery));
					return delivery;
				},
				settled: async () => {
					while (deliveries.size > 0) await Promise.allSettled(deliveries);
					return inspectionFailures.splice(0);
				}
			};
		};
		capturedRootProcess = (pid, identity, pidsNormalized) => pidsNormalized ? { state: "withheld-by-caller" } : identity.state === "identity" ? {
			state: "observed",
			pid,
			start_time: identity.identity
		} : {
			state: "unknown",
			reason: identity.state === "gone" ? "the root process exited before its start identity was read" : identity.reason
		};
		cleanupFailedStartup = async (options) => {
			const sampledProcessGroupIds = options.terminal !== undefined && options.observations?.process_samples.state === "available" ? selectCapturedProcessGroupIds(options.terminal.pid, options.observations.process_samples.value).filter((groupId) => groupId !== options.terminal?.pid) : undefined;
			const cleanupOptions = {
				timers: options.timers,
				terminal: options.terminal,
				renderer: options.terminalObservation ?? options.renderer,
				runId: options.runId,
				captureBaseline: options.captureBaseline,
				ownershipEvidence: options.ownershipEvidence,
				inspectionFailures: [...options.inspectionFailures],
				...sampledProcessGroupIds === undefined ? {} : { sampledProcessGroupIds },
				temporaryRoot: options.temporaryRoot,
				...options.cleanupHost === undefined ? {} : { host: options.cleanupHost }
			};
			const cleanupOutcome = await options.resourceScope.release(cleanupOptions);
			let cause = options.cause;
			if (options.terminalObservation !== undefined) {
				const terminal = await options.terminalObservation.complete();
				if (!terminal.ok) cause = retainTerminalObservationFailure(cause, terminal.error);
			}
			const cleanupFailure = cleanupReportFailure(cleanupOutcome.report);
			if (cleanupFailure !== undefined) {
				resolveProcessResult(undefined, cause, cleanupOutcome, options.observations, {
					scenario: options.scenario,
					...options.terminal === undefined ? {} : { rootPid: options.terminal.pid }
				});
			}
			throw cause;
		};
		createTerminalRenderer = (scenario, normalizeText, recordEvent) => new TerminalRenderer({
			columns: scenario.terminal.columns,
			rows: scenario.terminal.rows,
			scrollback: scenario.terminal.scrollback,
			maxBytes: scenario.limits.output_bytes,
			normalize: normalizeText,
			recordEvent
		});
		startCaptureRuntime = async (options) => {
			const { scenario } = options;
			const { ownershipEvidence } = options;
			let renderer;
			let terminal;
			let terminalObservation;
			let stopSampler;
			let rootIdentity;
			try {
				const privacy = createProcessSensitiveOutput(scenario);
				if (!privacy.ok) throw privacy.error;
				const sensitiveOutput = privacy.value;
				const { spawn } = await import("@lydell/node-pty");
				const selectedExecutable = await observeSelectedExecutable(scenario.executable, options.signal, undefined, options.resourceScope);
				const startedAt = new Date();
				const started = monotonicProcessCaptureClock();
				let lastOutput = started;
				const identifiers = createProcessIdentifierLookup(options.samples, () => terminal?.pid ?? -1);
				const normalizeText = createBoundedProcessTextNormalizer(scenario, options.temporaryRoot, identifiers);
				renderer = createTerminalRenderer(scenario, sensitiveOutput === undefined ? normalizeText : (value, maxBytes) => {
					const normalized = normalizeText(value, maxBytes);
					if (normalized.state === "over_budget") return normalized;
					const safe = sensitiveOutput.project([normalized.value]);
					if (!safe.ok) throw safe.error;
					const text = safe.value[0] ?? "";
					return {
						...normalized,
						value: text,
						utf8Bytes: Buffer.byteLength(text)
					};
				}, options.recordEvent);
				assertNotCancelled(options.signal);
				terminal = spawn(scenario.executable, [...scenario.arguments], {
					cwd: scenario.working_directory,
					env: makeProcessCaptureEnvironment(options),
					cols: scenario.terminal.columns,
					rows: scenario.terminal.rows,
					name: "xterm-256color"
				});
				options.onSpawn(terminal.pid);
				options.observationBuffer.target_pid = {
					state: "available",
					value: scenario.normalization.pids ? 1 : terminal.pid
				};
				const executableIdentity = observeLaunchedExecutable(scenario.executable, selectedExecutable);
				const terminalRetention = captureTerminalFrames({
					...options,
					terminal,
					started,
					onOutput: () => lastOutput = monotonicProcessCaptureClock(),
					renderer,
					normalizeText,
					identifiers,
					...sensitiveOutput === undefined ? {} : {
						sensitiveOutput,
						onSensitiveOutputFailure: () => {
							options.observationBuffer.frames = {
								state: "unavailable",
								reason: "Sensitive terminal projection failed; terminal text was withheld."
							};
						}
					}
				});
				terminalObservation = createProcessTerminalFinalizer(renderer, terminalRetention, options.observationBuffer);
				scheduleScenarioInteractions({
					...options,
					getTerminal: () => terminal,
					renderer,
					started
				});
				rootIdentity = retainRootIdentity(terminal.pid, options.runId, options.finalizationHost?.observe);
				stopSampler = startProcessSampler({
					rootPid: terminal.pid,
					runId: options.runId,
					platform: options.hostPlatform,
					started,
					limit: scenario.limits.processes,
					samples: options.samples,
					recordEvent: options.recordEvent,
					resourceScope: options.resourceScope
				});
				return {
					renderer,
					terminal,
					ownershipEvidence,
					started,
					startedAt,
					executableIdentity,
					lastOutput: () => lastOutput,
					terminalObservation,
					stopSampler,
					rootIdentity,
					rootSignaller: retainRootSignaller(terminal.pid, rootIdentity, options.finalizationHost?.signal)
				};
			} catch (cause) {
				for (const timer of options.timers) timer.cancel();
				let failure = retainRunInspectionFailures(cause, options.resourceScope, options.inspectionFailures);
				try {
					await stopSampler?.();
				} catch (samplingCause) {
					failure = retainSecondaryInspectionFailure(failure, samplingCause, options.resourceScope, options.inspectionFailures);
				}
				failure = retainRootIdentityFailure(failure, await rootIdentity, options.resourceScope, options.inspectionFailures);
				return cleanupFailedStartup({
					cause: failure,
					timers: options.timers,
					terminal,
					renderer,
					terminalObservation,
					runId: options.runId,
					captureBaseline: options.ownershipBaseline,
					ownershipEvidence,
					scenario,
					...options.cleanupHost === undefined ? {} : { cleanupHost: options.cleanupHost },
					observations: options.observationBuffer,
					temporaryRoot: options.temporaryRoot,
					resourceScope: options.resourceScope,
					inspectionFailures: options.inspectionFailures
				});
			}
		};
		retainRunInspectionFailures = (cause, resources, inspections) => {
			const failure = normalizeCaptureFailure(cause);
			for (const inspection of captureInspectionFailures(failure)) {
				resources.retainInspectionFailure(inspection);
				inspections.add(inspection);
			}
			return failure;
		};
		retainRootIdentityFailure = (primary, identity, resources, inspections) => identity?.state === "unverified" && identity.inspectionFailure !== undefined ? retainSecondaryInspectionFailure(primary, identity.inspectionFailure, resources, inspections) : primary;
		retainSecondaryInspectionFailure = (primary, cause, resources, inspections) => {
			const failure = retainRunInspectionFailures(cause, resources, inspections);
			if (failure instanceof AnalysisError) for (const inspection of captureInspectionFailures(failure)) retainCaptureInspectionCancellations(failure, inspection);
			if (primary === undefined || primary === failure) return failure;
			const error = primary instanceof AnalysisError ? primary : new ProcessCaptureError("process capture failed", { cause: primary });
			const secondary = failure instanceof AnalysisError ? failure : new ProcessCaptureError("process sampling failed", { cause: failure });
			for (const inspection of captureInspectionFailures(failure)) retainCaptureInspectionCancellations(error, inspection);
			if (error.secondaryFailures.includes(secondary)) return error;
			if (secondary.cleanupIncomplete) return analysisErrorWithCleanupDependencies(error, secondary, "capture_process").retainSecondaryFailure(secondary);
			return error.retainSecondaryFailure(secondary);
		};
		finishProcessRun = async (options) => {
			options.progress.closeLive();
			for (const timer of options.timers) timer.cancel();
			let { capture, executionFailure } = options;
			try {
				await options.stopSampler();
			} catch (cause) {
				executionFailure = retainSecondaryInspectionFailure(executionFailure, cause, options.resourceScope, options.inspectionFailures);
			}
			executionFailure = retainRootIdentityFailure(executionFailure, await options.runtime?.rootIdentity, options.resourceScope, options.inspectionFailures);
			for (const inspection of await options.runtime?.rootSignaller.settled() ?? []) executionFailure = retainSecondaryInspectionFailure(executionFailure, inspection, options.resourceScope, options.inspectionFailures);
			const sampledProcessGroupIds = options.runtime === undefined ? undefined : selectCapturedProcessGroupIds(options.runtime.terminal.pid, options.samples).filter((groupId) => groupId !== options.runtime?.terminal.pid);
			const cleanupOptions = {
				timers: options.timers,
				terminal: options.runtime?.terminal,
				renderer: options.runtime?.terminalObservation,
				runId: options.runId,
				captureBaseline: options.captureBaseline,
				ownershipEvidence: options.ownershipEvidence,
				inspectionFailures: [...options.inspectionFailures],
				...sampledProcessGroupIds === undefined ? {} : { sampledProcessGroupIds },
				temporaryRoot: options.temporaryRoot,
				...options.cleanupHost === undefined ? {} : { host: options.cleanupHost }
			};
			const cleanupOutcome = await options.resourceScope.release(cleanupOptions);
			if (options.runtime !== undefined && capture === undefined) {
				const terminal = await options.runtime.terminalObservation.complete();
				if (!terminal.ok) executionFailure = retainTerminalObservationFailure(executionFailure, terminal.error);
			}
			const cleanup = cleanupOutcome.report;
			if (executionFailure === undefined && options.signal?.aborted) executionFailure = processCaptureCancelled(options.signal.reason);
			const observedExit = options.observations?.exit.state === "available" ? options.observations.exit.value.reason : options.capture?.exit.reason;
			await options.progress.report({
				phase: "cleanup",
				counts: options.progressCounts(),
				terminal: true,
				disposition: captureProgressDisposition(observedExit, executionFailure),
				cleanup
			});
			const cleanupFailure = cleanupReportFailure(cleanup);
			let verifiedCapture;
			if (capture !== undefined && cleanupFailure === undefined) {
				const completedCapture = {
					...capture,
					...processCaptureCleanupFacts(capture, { ownedProcessesSignaled: cleanupOutcome.ownedProcessesSignaled }),
					cleanup: {
						owned_process_group: "verified",
						temporary_root: "removed"
					}
				};
				try {
					verifiedCapture = parseProcessCapture(completedCapture);
				} catch (cause) {
					executionFailure = new ProcessCaptureError(`process capture validation failed${cause instanceof Error ? `: ${cause.message}` : ""}`, { cause });
				}
			}
			const rootPid = options.runtime?.terminal.pid ?? options.rootPid;
			const partialContext = rootPid === undefined ? { scenario: options.scenario } : {
				scenario: options.scenario,
				rootPid
			};
			if (executionFailure === undefined && options.signal?.aborted) executionFailure = processCaptureCancelled(options.signal.reason);
			return resolveProcessResult(cleanupFailure === undefined ? verifiedCapture : capture, executionFailure, cleanupOutcome, options.observations, partialContext);
		};
		completeCapture = async (options) => {
			const unavailableReason = (stage, cause) => `${stage} failed: ${cause instanceof Error ? cause.message : "unknown failure"}`;
			const { runtime, scenario } = options;
			const { reason } = options.exit;
			if (reason === "cancelled") throw processCaptureCancelled(options.signal?.reason);
			let settlement;
			try {
				settlement = await observeSettlement({
					runId: options.runId,
					processGroupIds: selectCapturedProcessGroupIds(runtime.terminal.pid, options.samples),
					ownershipEvidence: runtime.ownershipEvidence,
					settleMs: scenario.settle_ms,
					recordEvent: options.recordEvent,
					platform: options.hostPlatform,
					signal: options.signal,
					onLiveProgress: options.onLiveProgress
				});
			} catch (cause) {
				options.observationBuffer.settlement = {
					state: "unavailable",
					reason: unavailableReason("Process settlement observation", cause)
				};
				throw cause;
			}
			options.observationBuffer.settlement = {
				state: "available",
				value: settlement
			};
			for (const timer of options.timers) timer.cancel();
			const sampling = await runtime.stopSampler();
			const samplingPartial = sampling.partial;
			await settleProcessCaptureJournal(options.eventJournal);
			assertNotCancelled(options.signal);
			let after;
			try {
				after = await options.captureSnapshot(scenario, options.signal, options.before, {
					cleanup: options.resourceScope,
					observerPaths: [options.temporaryRoot]
				});
			} catch (cause) {
				if (cause instanceof ProcessCaptureSnapshotFailure) for (const lease of cause.cleanupLeases) options.resourceScope.retain(lease);
				options.observationBuffer.filesystem_snapshots = {
					...options.observationBuffer.filesystem_snapshots,
					after: cause instanceof ProcessCaptureSnapshotFailure && cause.snapshot !== undefined ? {
						state: "available",
						value: cause.snapshot
					} : {
						state: "unavailable",
						reason: unavailableReason("Final filesystem snapshot", cause)
					}
				};
				throw cause instanceof ProcessCaptureSnapshotFailure ? cause.failureForCaller() : cause;
			}
			options.observationBuffer.filesystem_snapshots = {
				...options.observationBuffer.filesystem_snapshots,
				after: {
					state: "available",
					value: after
				}
			};
			options.recordEvent("filesystem_checkpoints", 1);
			const terminal = await runtime.terminalObservation.complete();
			if (!terminal.ok) throw terminal.error;
			const { renderedFrames, retention } = terminal.value;
			const checkpoints = [{
				name: "before",
				at_ms: 0,
				files: options.before.files,
				effects: [],
				truncated: options.before.truncated
			}, {
				name: "after_settlement",
				at_ms: Math.max(0, monotonicProcessCaptureClock() - runtime.started),
				files: after.files,
				effects: classifyFilesystemEffects(options.before, after),
				truncated: after.truncated
			}];
			const rootIdentity = await waitForAbortable(runtime.rootIdentity, options.signal);
			if (rootIdentity instanceof AbortedWait) throw processCaptureCancelled(rootIdentity.carried);
			let manifest;
			try {
				manifest = await createRunManifest(scenario, runtime.startedAt, new Date(), runtime.executableIdentity, capturedRootProcess(runtime.terminal.pid, rootIdentity, scenario.normalization.pids), {
					platform: options.hostPlatform,
					architecture: HOST_PLATFORM.architecture
				});
			} catch (cause) {
				options.observationBuffer.manifest = {
					state: "unavailable",
					reason: unavailableReason("Capture manifest creation", cause)
				};
				throw cause;
			}
			options.observationBuffer.manifest = {
				state: "available",
				value: manifest
			};
			return buildCaptureResult({
				frames: options.frames,
				exit: {
					...options.exit,
					reason
				},
				samples: options.samples,
				before: options.before,
				after,
				truncationDetails: {
					...retention,
					rendered_terminal: runtime.renderer.retention(),
					filesystem_before: options.before.coverage,
					filesystem_after: after.coverage,
					process: sampling.coverage
				},
				scenario,
				rootPid: runtime.terminal.pid,
				samplingPartial,
				renderedFrames,
				interactions: options.interactions,
				checkpoints,
				settlement,
				manifest,
				eventJournal: options.eventJournal
			});
		};
		captureProgressDisposition = (exitReason, executionFailure) => {
			if (exitReason === "exited" || exitReason === "timeout" || exitReason === "idle_timeout" || exitReason === "cancelled") return exitReason;
			if (executionFailure instanceof ProcessCaptureError && executionFailure.reason === "cancelled") return "cancelled";
			return "failed";
		};
		runProcessScenario = async (resourceScope, scenario, signal, hostEnvironment, hostPlatform, captureSnapshot, cleanupHost, progress, finalizationHost) => {
			const progressTracker = createProcessCaptureProgressTracker(progress);
			const frames = [];
			const samples = [];
			const interactions = [];
			const progressCounts = () => ({
				frames: frames.length,
				samples: samples.length,
				interactions: interactions.length
			});
			const reportRunning = () => {
				void progressTracker.report({
					phase: "running",
					counts: progressCounts()
				});
			};
			const reportSettling = () => {
				void progressTracker.report({
					phase: "settling",
					counts: progressCounts()
				});
			};
			let prepared;
			try {
				await progressTracker.report({
					phase: "prepare",
					counts: progressCounts()
				});
				prepared = await prepareProcessCapture(scenario, signal, captureSnapshot, undefined, resourceScope);
			} catch (cause) {
				progressTracker.closeLive();
				await progressTracker.report({
					phase: "cleanup",
					counts: progressCounts(),
					terminal: true,
					disposition: captureProgressDisposition(undefined, cause),
					...cause instanceof ProcessCaptureError && cause.cleanupReport !== undefined ? { cleanup: cause.cleanupReport } : {}
				});
				throw cause;
			}
			const { temporaryRoot, runId, ownershipBaseline, before } = prepared;
			const ownershipEvidence = new ProcessOwnershipEvidenceOwner();
			const inspectionFailures = new Set();
			const journal = createProcessCaptureJournal();
			const { entries: eventJournal, recordEvent } = journal;
			recordEvent("filesystem_checkpoints", 0);
			const observations = createProcessCaptureObservationBuffer({
				frames,
				interactions,
				samples,
				eventJournal,
				before,
				finalizationEnabled: scenario.finalization_ms > 0
			});
			let runtime;
			let actualRootPid;
			const timers = new Set();
			let capture;
			let executionFailure;
			let stopSampler = async () => ({ partial: false });
			const dispatchedEventIndexes = new Set();
			try {
				runtime = await startCaptureRuntime({
					scenario,
					hostEnvironment,
					hostPlatform,
					temporaryRoot,
					runId,
					ownershipBaseline,
					ownershipEvidence,
					...cleanupHost === undefined ? {} : { cleanupHost },
					resourceScope,
					inspectionFailures,
					observationBuffer: observations,
					onSpawn: (pid) => {
						actualRootPid = pid;
					},
					frames,
					samples,
					interactions,
					timers,
					dispatchedEventIndexes,
					recordEvent,
					...signal === undefined ? {} : { signal },
					...finalizationHost === undefined ? {} : { finalizationHost }
				});
				stopSampler = runtime.stopSampler;
				const exit = await awaitTerminalExit({
					terminal: runtime.terminal,
					scenario,
					started: runtime.started,
					lastOutput: runtime.lastOutput,
					signal,
					signalTarget: runtime.rootSignaller.signal,
					recordFinalization: (finalization) => {
						observations.finalization = {
							state: "available",
							value: finalization
						};
					},
					timers,
					interactions,
					dispatchedEventIndexes,
					recordEvent,
					...progress === undefined ? {} : { onLiveProgress: reportRunning }
				});
				if (exit.unobserved === true) {
					observations.finalization = {
						state: "available",
						value: exit.finalization
					};
					observations.exit = {
						state: "unavailable",
						reason: `The captured process exit was not observed because the finalization SIGKILL could not be delivered (initiating reason: ${exit.reason}).`
					};
					if (exit.reason === "cancelled") throw processCaptureCancelled(signal?.reason);
					throw new ProcessAdmissionError("finalization_unobserved");
				}
				if (exit.finalization !== undefined) observations.finalization = {
					state: "available",
					value: exit.finalization
				};
				observations.exit = {
					state: "available",
					value: captureExitObservation(exit)
				};
				capture = await completeCapture({
					timers,
					scenario,
					hostPlatform,
					runtime,
					runId,
					temporaryRoot,
					before,
					frames,
					samples,
					interactions,
					exit,
					eventJournal,
					observationBuffer: observations,
					recordEvent,
					captureSnapshot,
					resourceScope,
					...signal === undefined ? {} : { signal },
					...progress === undefined ? {} : { onLiveProgress: reportSettling }
				});
			} catch (cause) {
				executionFailure = retainRunInspectionFailures(cause, resourceScope, inspectionFailures);
			}
			return finishProcessRun({
				runtime,
				timers,
				runId,
				captureBaseline: ownershipBaseline,
				ownershipEvidence,
				...cleanupHost === undefined ? {} : { cleanupHost },
				temporaryRoot,
				scenario,
				samples,
				stopSampler,
				capture,
				executionFailure,
				observations,
				...actualRootPid === undefined ? {} : { rootPid: actualRootPid },
				progress: progressTracker,
				progressCounts,
				resourceScope,
				inspectionFailures,
				...signal === undefined ? {} : { signal }
			});
		};
		captureProcessScenario = async (scenario, signal, platform, environment = process.env, captureSnapshot, cleanupHost, progress, resourceScope, finalizationHost) => {
			const ownershipReason = processCaptureOwnershipUnavailableReason(platform);
			if (ownershipReason !== undefined) return err(new AnalysisCapabilityUnavailableError("rea-process", "capture_process_scenario", ownershipReason, { userMessage: ownershipReason }));
			const runResourceScope = resourceScope ?? new ProcessCaptureResourceScope();
			const execute = async () => {
				try {
					assertNotCancelled(signal);
					const resolvedScenario = await resolveProcessScenarioRuntimePaths(scenario, environment, platform);
					const capture = await runProcessScenario(runResourceScope, resolvedScenario, signal, environment, platform, captureSnapshot ?? snapshotRoots, cleanupHost, progress, finalizationHost);
					return ok(capture);
				} catch (cause) {
					const failure = normalizeCaptureFailure(cause);
					runResourceScope.retainInspectionFailure(failure);
					const executionFailureReason = describeProcessCaptureExecutionFailure(cause);
					return err(failure instanceof AnalysisError ? failure : new ProcessCaptureError("process capture failed", {
						cause,
						...executionFailureReason === undefined ? {} : { executionFailure: executionFailureReason }
					}));
				}
			};
			if (resourceScope !== undefined) {
				try {
					return await resourceScope.run(execute);
				} catch (cause) {
					const failure = normalizeCaptureFailure(cause);
					runResourceScope.retainInspectionFailure(failure);
					const executionFailure = describeProcessCaptureExecutionFailure(cause);
					return err(failure instanceof AnalysisError ? failure : new ProcessCaptureError("process capture lifecycle failed", {
						cause,
						reason: "cleanup_incomplete",
						cleanup: {
							reason: "process capture lifecycle failed",
							resources: ["process_capture_lifecycle"]
						},
						...executionFailure === undefined ? {} : { executionFailure }
					}));
				}
			}
			const capture = await runResourceScope.run(execute);
			try {
				await runResourceScope.close();
			} catch (cause) {
				if (!(cause instanceof AnalysisError)) throw cause;
				return err(capture.ok ? cause : capture.error instanceof ProcessCaptureError ? capture.error.withFinalization({ cleanupFailure: cause }) : analysisErrorWithCleanupDependencies(capture.error, cause, "capture_process_scenario"));
			}
			return capture;
		};
	})))();
}

//#endregion
//#region dist/application/process/ProcessScenarioPreparation.js
var prepareProcessScenarioPlan;
function init_ProcessScenarioPreparation() {
	return (init_ProcessScenarioPreparation = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_FilesystemSnapshot();
		init_ProcessCaptureCapability();
		init_ProcessSensitiveOutput();
		init_ProcessScenarioRuntimeValidation();
		init_result();
		prepareProcessScenarioPlan = async (scenario, environment, platform, signal) => {
			if (signal?.aborted === true) return err(cancelledBy("capture_process_scenario", signal));
			const ownershipReason = processCaptureOwnershipUnavailableReason(platform);
			if (ownershipReason !== undefined) return err(new AnalysisCapabilityUnavailableError("rea-process", "capture_process_scenario", ownershipReason, { userMessage: ownershipReason }));
			try {
				const { dry_run: _dryRun, ...resolved } = await resolveProcessScenarioRuntimePaths(scenario, environment, platform);
				if (isAborted(signal)) return err(cancelledBy("capture_process_scenario", signal));
				const privacy = createProcessSensitiveOutput(scenario);
				if (!privacy.ok) return privacy;
				const admitted = await admitFilesystemObservationRoots(resolved, signal);
				if (!admitted.ok) return isAborted(signal) ? err(cancelledBy("capture_process_scenario", signal)) : admitted;
				if (isAborted(signal)) return err(cancelledBy("capture_process_scenario", signal));
				return ok(resolved);
			} catch (cause) {
				if (isAborted(signal)) return err(cancelledBy("capture_process_scenario", signal));
				return err(cause instanceof AnalysisError ? cause : new AnalysisInputError("capture_process_scenario", { cause }, []));
			}
		};
	})))();
}

//#endregion
//#region dist/application/process/ProcessCli.js
var artifactFailureFacts, RetainedProcessCaptureFailure, captureProcessScenarioFile, projectCaptureFileFailure, invalidCaptureEvidence, readJson, processInputFailure, cliAnalysisError, projectProcessCliInputCleanupError, PROCESS_UNEXPECTED_FAILURE_REMEDIATION, projectProcessCliError, artifactFailureWithCancellation, withProcessInputResources;
function init_ProcessCli() {
	return (init_ProcessCli = __esmMin((() => {
		init_HostPlatform();
		init_analysisErrorBase();
		init_result();
		init_analysisErrorCleanup();
		init_analysisErrorCancellation();
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_providerAdapterError();
		init_validationFailure();
		init_processEvidenceProvider();
		init_inputIssueProjection();
		init_processScenario();
		init_ProcessComparisonService();
		init_ProgressReporter();
		init_ProcessHarness();
		init_ProcessCaptureLifecycle();
		init_ProcessCaptureError();
		init_ProcessEvidence();
		init_ProcessScenarioPreparation();
		init_JsonFiles();
		init_resources();
		init_evidenceErrors();
		init_ProviderOperationExecution();
		init_evidenceValidation();
		init_evidenceFormat();
		artifactFailureFacts = (failure) => ({
			...failure.primaryFacts(),
			...failure.cleanup === undefined ? {} : { cleanup: failure.cleanup },
			...failure.partialObservation === undefined ? {} : { partialObservation: failure.partialObservation },
			...failure.cancellation === undefined ? {} : { cancellation: failure.cancellation }
		});
		RetainedProcessCaptureFailure = class extends ArtifactReaderFailure {
			outcome;
			owner;
			primary;
			constructor(failure, outcome, owner, primary) {
				super(failure.reason, failure.message, {
					cause: failure,
					...artifactFailureFacts(failure),
					...failure.cleanupLeases === undefined ? {} : { cleanupLeases: failure.cleanupLeases }
				}, failure.details);
				this.outcome = outcome;
				this.owner = owner;
				this.primary = primary;
			}
		};
		captureProcessScenarioFile = async (path, environment = process.env, signal) => withProcessInputResources("capture_process_scenario", signal, async (resources) => {
			const input = await readJson(path, "capture_process_scenario", signal, resources);
			const parsed = processScenarioSchema.safeParse(input);
			if (!parsed.success) throw analysisInputErrorFromIssues("capture_process_scenario", parsed.error.issues, input, { cause: parsed.error });
			if (parsed.data.dry_run) {
				const prepared = await prepareProcessScenarioPlan(parsed.data, environment, HOST_PLATFORM.platform, signal);
				if (!prepared.ok) throw prepared.error;
				return createProcessScenarioPlanEvidence(prepared.value, HOST_PLATFORM.platform);
			}
			const progress = createProgressReporter(async (update) => {
				process.stderr.write(`${JSON.stringify({ rea_progress: update })}\n`);
			}, { minimumIntervalMs: 100 });
			const resourceScope = new ProcessCaptureResourceScope();
			let captureOutcome;
			try {
				const captured = await captureProcessScenario(parsed.data, signal, HOST_PLATFORM.platform, environment, undefined, undefined, progress, resourceScope);
				captureOutcome = captured.ok ? ok(createProcessCaptureEvidence(parsed.data, captured.value)) : captured;
			} catch (cause) {
				captureOutcome = err(cause);
			}
			try {
				await resourceScope.close();
			} catch (cause) {
				const owner = new AnalysisCleanupLease(() => resourceScope.close(), { get cleanupResources() {
					return cause instanceof AnalysisError ? cause.cleanupResources : undefined;
				} });
				resources.retain({
					kind: "lease",
					resource: "process capture resources",
					lease: owner
				});
				const original = captureOutcome.ok ? undefined : captureOutcome.error;
				const priorIncomplete = original instanceof AnalysisError && original.cleanupIncomplete;
				const primary = captureOutcome.ok ? cause : original instanceof AnalysisError && cause instanceof AnalysisError ? original instanceof ProcessCaptureError ? original.withFinalization({ cleanupFailure: cause }) : analysisErrorWithCleanupDependencies(original, cause, "capture_process_scenario") : new AggregateError([original, cause], "Process capture and cleanup failed", { cause: original });
				const failure = ArtifactReaderFailure.withCleanup(primary, ArtifactReaderFailure.cleanupObservation(cause, "process capture resources"), captureOutcome.ok ? captureOutcome.value : undefined, priorIncomplete ? undefined : [owner]);
				throw new RetainedProcessCaptureFailure(failure, captureOutcome, owner, primary instanceof AnalysisError ? primary : undefined);
			}
			if (!captureOutcome.ok) throw captureOutcome.error;
			return captureOutcome.value;
		});
		projectCaptureFileFailure = (failure, side, input) => {
			switch (failure.kind) {
				case "invalid-evidence":
					if (isUnsupportedEvidenceFormat(failure.cause)) return unsupportedEvidenceFormatError(failure.cause, side);
					return analysisInputErrorFromIssues("compare_process_captures", failure.cause.issues, input, { cause: failure.cause });
				case "wrong-workflow": return processInputFailure("compare_process_captures", "Capture evidence is not from the current process-capture workflow. Create new capture evidence, then try again.", [side], "invalid_value", wrongWorkflowIssueFacts(failure));
				case "unsupported-provider": return unsupportedProcessCaptureProvider(side, failure);
				case "invalid-capture": return invalidCaptureEvidence(failure.cause, side);
			}
		};
		invalidCaptureEvidence = (cause, side) => {
			const issue = firstValidationIssue(cause);
			return processInputFailure("compare_process_captures", `Capture evidence is malformed (${describeValidationFailure(cause)}). Create new capture evidence, then try again.`, [side], "invalid_value", issue === undefined ? undefined : { observed: {
				issue_path: ["normalized_result", ...issue.path],
				...issue.constraint === undefined ? {} : { constraint: issue.constraint },
				remaining_issue_count: issue.remainingIssueCount
			} });
		};
		readJson = async (path, operation, signal, resources) => {
			if (signal?.aborted) throw cancelledBy(operation, signal);
			const loaded = await readJsonFile(path, signal, resources, operation);
			if (!loaded.ok && loaded.error instanceof AnalysisCancelledError) throw cancelledBy(operation, carriedReason(loaded.error.cause));
			if (loaded.ok) {
				if (signal?.aborted) throw cancelledBy(operation, signal);
				return loaded.value;
			}
			if (loaded.error._tag !== "EvidenceFileError") throw loaded.error;
			if (loaded.error.reason === "io") throw loaded.error;
			const detail = describeValidationFailure(loaded.error.cause);
			throw processInputFailure(operation, loaded.error.reason === "invalid-json" ? `Process input file is not valid UTF-8 JSON: ${path} (${detail}). Repair the file, then try again.` : loaded.error.reason === "symlink-traversal" ? `Process input file could not be read: ${path} (${detail}). Repair the symbolic-link chain or select another file.` : `Process input file could not be read: ${path} (${detail}). Check the reported filesystem constraint and retry.`, ["input_file"], "invalid_value", { observed: { file_reason: loaded.error.reason } });
		};
		processInputFailure = (operation, userMessage, path, reason, facts) => new AnalysisInputError(operation, { userMessage }, [{
			path,
			reason,
			message: userMessage,
			...facts
		}]);
		cliAnalysisError = (error) => ({
			error: "Process command failed",
			...projectAnalysisError(error)
		});
		projectProcessCliInputCleanupError = (cause) => {
			if (!(cause instanceof ProviderAdapterError) || !(cause.cause instanceof ArtifactReaderFailure) || cause.cause.cleanup === undefined) throw cause;
			return cliAnalysisError(cause);
		};
		PROCESS_UNEXPECTED_FAILURE_REMEDIATION = "Do not repeat this command. Tell the user the process command could not complete, give them the reported reason, and ask them to check the scenario or capture files it read. If those files are valid, report the failure with its diagnostics.";
		projectProcessCliError = (cause, operation, signal) => {
			const failure = cause instanceof AnalysisError ? cause : new ProviderAdapterError(PROCESS_PROVIDER.id, operation, {
				cause,
				diagnostics: { phase: "process_cli" },
				userMessage: `Process command could not complete: ${describeValidationFailure(cause)}`,
				remediationAction: PROCESS_UNEXPECTED_FAILURE_REMEDIATION
			});
			return cliAnalysisError(signal?.aborted ? analysisErrorWithCancellation(failure, cancelledBy(operation, signal)) : failure);
		};
		artifactFailureWithCancellation = (failure, cancellation) => new ArtifactReaderFailure(failure.reason, failure.message, {
			cause: new AggregateError([failure, cancellation], "Process input failed and was cancelled", { cause: failure }),
			...artifactFailureFacts(failure),
			...failure.cleanupLeases === undefined ? {} : { cleanupLeases: failure.cleanupLeases }
		}, failure.details);
		withProcessInputResources = async (operation, signal, run) => {
			const resources = new ArtifactResourceScope();
			let outcome;
			try {
				outcome = ok(await run(resources));
			} catch (cause) {
				outcome = err(cause);
			}
			try {
				await resources.close();
			} catch (cause) {
				const cleanup = ArtifactReaderFailure.cleanupObservation(cause, resources.cleanupResources);
				const cancellation = signal?.aborted ? cancelledBy(operation, signal, outcome.ok ? { partialObservation: outcome.value } : {}) : undefined;
				const primary = outcome.ok ? cancellation === undefined ? cause : new ArtifactReaderFailure("cancelled", "Process input cleanup cancelled", {
					cause: cancellation,
					cancellation: { reason: cancellation.cause },
					partialObservation: outcome.value
				}) : cancellation === undefined ? outcome.error : outcome.error instanceof AnalysisError ? analysisErrorWithCancellation(outcome.error, cancellation) : outcome.error instanceof ArtifactReaderFailure ? artifactFailureWithCancellation(outcome.error, cancellation) : new AggregateError([outcome.error, cancellation], "Process input failed and was cancelled", { cause: outcome.error });
				const inherited = primary instanceof EvidenceFileError ? jsonFileReadCleanupLeases(primary) ?? artifactPrimaryCleanupLeases(primary) : artifactPrimaryCleanupLeases(primary);
				const local = cause instanceof ArtifactReaderFailure ? cause.cleanupLeases : undefined;
				const leases = inherited === undefined || local === undefined ? undefined : [...new Set([...inherited, ...local])];
				let failure = ArtifactReaderFailure.withCleanup(primary, cleanup, outcome.ok ? outcome.value : undefined, leases);
				if (leases === undefined && cause instanceof ArtifactReaderFailure) {
					failure = new ArtifactReaderFailure(failure.reason, failure.message, {
						cause: new AggregateError([failure, cause], "Process and input cleanup remain incomplete"),
						...artifactFailureFacts(failure)
					}, failure.details);
				}
				const typedPrimary = primary instanceof AnalysisError ? primary : primary instanceof RetainedProcessCaptureFailure ? primary.primary : undefined;
				const error = new ProviderAdapterError(PROCESS_PROVIDER.id, operation, {
					cause: failure,
					cleanupPrimary: typedPrimary,
					cleanup: failure.cleanup,
					partialObservation: failure.partialObservation,
					userMessage: failure.userMessage ?? failure.message
				});
				bindArtifactFileCleanup(failure, error);
				throw error;
			}
			if (!outcome.ok && outcome.error instanceof RetainedProcessCaptureFailure && outcome.error.owner.released) outcome = outcome.error.outcome;
			if (!outcome.ok) return projectProcessCliError(outcome.error, operation, signal);
			const completed = completeProviderEvidence(outcome.value, signal);
			return completed.ok ? completed.value : cliAnalysisError(completed.error);
		};
	})))();
}

//#endregion
//#region dist/cli/processCommands.js
var processCommands_exports = /* @__PURE__ */ __exportAll({ registerProcessCommands: () => registerProcessCommands });
var registerProcessCommands;
function init_processCommands() {
	return (init_processCommands = __esmMin((() => {
		init_ProcessCli();
		init_ProcessComparisonService();
		init_sessionToolContracts();
		init_analysisErrorProjection();
		init_contractCliDescription();
		init_contractCommand();
		init_commandRegistry();
		init_cliLogging();
		init_cliCommandNames();
		init_localPath();
		init_commandCancellation();
		registerProcessCommands = (cli, logger, environment) => {
			registerCliCommand(cli, CLI_COMMANDS.captureProcess, {
				description: "Capture one caller-selected process scenario",
				args: z.object({ scenario: localPathStringSchema.describe("Scenario JSON path") }),
				run: ({ args }) => withCommandCancellation((signal) => logCliCommand(logger, "capture-process", () => captureProcessScenarioFile(args.scenario, environment, signal).catch(projectProcessCliInputCleanupError)))
			}, { operations: [{
				name: "capture_process_scenario",
				flags: {}
			}] });
			registerContractCommand(cli, logger, contractNamed(SESSION_TOOL_CONTRACTS, "compare_process_captures"), {
				description: "Compare two process capture Evidence JSON files",
				positionals: [
					"left",
					"right",
					"trace_spec"
				],
				jsonInputs: {
					left: "left must be capture Evidence JSON or a JSON file path",
					right: "right must be capture Evidence JSON or a JSON file path",
					trace_spec: "traceSpec must be JSON or a JSON file path"
				},
				jsonInputChecks: {
					left: (value) => readProcessComparisonSource("left", value, projectCaptureFileFailure),
					right: (value) => readProcessComparisonSource("right", value, projectCaptureFileFailure)
				},
				fields: {
					left: { description: "Left capture Evidence JSON path" },
					right: { description: "Right capture Evidence JSON path" },
					trace_spec: {
						name: "traceSpec",
						description: "Optional partial-order or finite-trace specification path"
					},
					max_capture_age_ms: { description: "Refuse a capture completed more than this many milliseconds ago; omitted applies no age limit" }
				}
			}, async (_input, { checked, parsed }) => {
				const result = compareParsedProcessEvidence(checked.left, checked.right, {
					...parsed?.max_capture_age_ms === undefined ? {} : { maxCaptureAgeMs: parsed.max_capture_age_ms },
					...parsed?.trace_spec === undefined ? {} : { traceSpecification: parsed.trace_spec }
				});
				return result.ok ? result.value.evidence : projectAnalysisError(result.error);
			});
		};
	})))();
}

//#endregion
export { init_processCommands, processCommands_exports };