import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCapabilityUnavailableError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, MAX_NODE_TIMER_DELAY_MS, OwnerCancellation, cancelledBy, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_errorMessage, init_jsonValue, init_sha256Hex, isAborted, jsonObjectSchema, jsonValueSchema, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_safeJson, safeParseUtf8Json } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, compareUnicodeCodePoints, init_callerPath, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisErrorWithoutCapturedOutput } from "./analysisErrorProjection-bycI20-L.js";
import { analysisOperationInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { AnalysisCleanupLease, ArtifactReaderFailure, ArtifactResourceScope, NonRegularFileReadError, SafeOutputTree, SafeOutputTreeCreationFailure, artifactSelectedPathErrno, assertArtifactReadActive, bindArtifactFileCleanup, decodeDirectoryEntryName, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_RegularFile, init_SafeOutputTree, init_SafeOutputTreeAdmission, init_SafeOutputTreeCreationFailure, init_decodeDirectoryEntryName, init_readArtifactFileChunks, init_resources, mapArtifactFileFailure, outputDirectoryAdmissionRefusal, readArtifactFileChunks, withArtifactRegularFile } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError, providerCleanupErrorFromFailures } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { init_BoundedFileBytes, readBoundedFileBytes } from "./RegularFileRead-CRu2Ia6l.js";
import { BOUNDED_PRODUCER_LIMITS, init_producerResourceLimits } from "./urlComponents-DJm-wtqY.js";
import { init_symlinkTarget, observedSymlinkTarget } from "./nativeValueFlow-13oOEkkJ.js";
import { init_canonicalOrdering, uniqueSorted } from "./canonicalOrdering-C7Yzy62j.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, inspectWithService, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { cleanupOwnedProcessGroup, init_ProcessOwnership } from "./ProcessOwnership-CezAYpow.js";
import { init_OwnedCommandCleanup, processInspectionCancellationError, retainProcessInspectionCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { assertArtifactCommandPath, init_ArtifactCommandPath, selectArtifactCommandPath } from "./ArtifactCommandPath-B5Zuhaxu.js";
import { init_LinuxResourceLimits, prlimitArgumentVector, readLinuxResourceLimits } from "./LinuxResourceLimits-vLyr_vuV.js";
import { DEFAULT_FIRMWARE_ANALYSIS_TIMEOUT_MS, FIRMWARE_OPERATION_ENGINES, FIRMWARE_TOOL_CONTRACTS, FIRMWARE_TOOL_REQUIREMENTS, MAX_FIRMWARE_STAGING_BYTES, MAX_FIRMWARE_STAGING_ENTRIES, firmwareExecutionBudgetSchema, firmwareRequestSchema, firmwareResultSchemas, init_firmwareAnalysis, init_firmwareToolContracts, init_firmwareToolRequirements } from "./firmwareToolContracts-Dmpu0DWo.js";
import { constants, createWriteStream } from "node:fs";
import { isAbsolute, join, relative, sep } from "node:path";
import { z } from "zod";
import { Readable, Transform } from "node:stream";
import { createHash, randomUUID } from "node:crypto";
import { access, chmod, lstat, opendir, readlink, stat } from "node:fs/promises";
import { pipeline as pipeline$1 } from "node:stream/promises";

//#region dist/application/firmware/FirmwareAnalysisService.js
var FirmwareAnalysisService;
function init_FirmwareAnalysisService() {
	return (init_FirmwareAnalysisService = __esmMin((() => {
		init_analysisObservation();
		init_firmwareAnalysis();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_result();
		init_ProviderOperationExecution();
		FirmwareAnalysisService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close?.() ?? Promise.resolve();
			}
			/** Execute an explicit inspection or extraction and preserve its producing identity. */
			async execute(operation, input, options) {
				if (options?.signal?.aborted === true) return err(cancelledBy(operation, options.signal));
				const parsed = firmwareRequestSchema.safeParse({
					operation,
					input
				});
				if (!parsed.success) return err(analysisOperationInputErrorFromIssues(operation, parsed.error.issues, input, parsed.error));
				const executed = await this.provider.execute(parsed.data, options);
				if (!executed.ok) return executed;
				const execution = executed.value;
				if (execution.subject == null) return err(new AnalysisOutputError(operation, "Firmware execution did not bind its source artifact"));
				const budget = firmwareExecutionBudgetSchema.safeParse(execution.result);
				if (!budget.success || budget.data.analysis_timeout_ms !== (parsed.data.input.analysis_timeout_ms ?? 12e4)) return err(new AnalysisOutputError(operation, "Firmware execution did not retain its selected analysis budget"));
				return completeProviderEvidence(createAnalysisExecutionEvidence(operation, parsed.data.input, execution, "observed"), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/firmware/FirmwareDeadline.js
var startFirmwareDeadline, firmwareDeadlineElapsed;
function init_FirmwareDeadline() {
	return (init_FirmwareDeadline = __esmMin((() => {
		startFirmwareDeadline = (phase, timeoutMs) => ({
			phase,
			expiresAtMs: performance.now() + timeoutMs,
			signal: AbortSignal.timeout(timeoutMs),
			timeoutMs
		});
		firmwareDeadlineElapsed = (deadline) => performance.now() >= deadline.expiresAtMs;
	})))();
}

//#endregion
//#region dist/firmware/FirmwareRelease.js
var FIRMWARE_LIMITS;
function init_FirmwareRelease() {
	return (init_FirmwareRelease = __esmMin((() => {
		init_producerResourceLimits();
		FIRMWARE_LIMITS = {
			inputBytes: 128 * 1024 * 1024,
			reportBytes: 8 * 1024 * 1024,
			diagnosticBytes: 8 * 1024 * 1024,
			addressSpaceBytes: BOUNDED_PRODUCER_LIMITS.address_space_bytes,
			cpuSeconds: 120
		};
	})))();
}

//#endregion
//#region dist/firmware/FirmwareFailures.js
var firmwareLimitRecovery, firmwareSignalLimitError, firmwareProcessLimitRecovery, timeoutFailure, deadlineTimeout, firmwareSignalInterruption, firmwarePhaseInterruption, firmwareFailureDialect;
function init_FirmwareFailures() {
	return (init_FirmwareFailures = __esmMin((() => {
		init_analysisResourceLimits();
		init_resources();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_providerAdapterError();
		init_providerCleanupError();
		init_FirmwareDeadline();
		init_FirmwareRelease();
		init_errorMessage();
		firmwareLimitRecovery = (allowance) => `${allowance}. This release has no runtime override. analysis_timeout_ms (--analysis-timeout-ms in the CLI) does not raise it. Repeating the unchanged request fails the same way.`;
		firmwareSignalLimitError = (operation, signal, fileSizeBytes, fileSizeAdjustable, capturedOutput) => {
			const recovery = (remediationAction) => new AnalysisResourceConstraintError(operation, signal === "SIGXCPU" ? "cpu" : "file-size", signal === "SIGXCPU" ? `Firmware analysis reached its ${String(FIRMWARE_LIMITS.cpuSeconds)}-second CPU allowance (cpuSeconds).` : `Firmware analysis reached its ${String(fileSizeBytes)}-byte file-size allowance.`, signal === "SIGXCPU" ? { cpu_seconds: FIRMWARE_LIMITS.cpuSeconds } : { file_size_bytes: fileSizeBytes }, {
				retryable: false,
				remediationAction,
				...capturedOutput === undefined ? {} : { capturedOutput }
			});
			if (signal === "SIGXCPU") return recovery(firmwareLimitRecovery(`cpuSeconds is ${String(FIRMWARE_LIMITS.cpuSeconds)}`));
			if (signal !== "SIGXFSZ") return undefined;
			return recovery(fileSizeAdjustable ? `The file-size cap for this extraction is ${String(fileSizeBytes)} bytes, one byte above max_output_bytes. analysis_timeout_ms does not raise it. Increase max_output_bytes when it is below its schema maximum and the larger staging budget is still required. Repeating the unchanged request fails the same way.` : firmwareLimitRecovery(`The firmware file-size allowance is ${String(fileSizeBytes)} bytes`));
		};
		firmwareProcessLimitRecovery = (fileSizeBytes, fileSizeAdjustable) => `cpuSeconds is ${String(FIRMWARE_LIMITS.cpuSeconds)}. The address-space allowance is ${String(FIRMWARE_LIMITS.addressSpaceBytes)} bytes. This release has no runtime override for those per-process allowances, and analysis_timeout_ms does not raise them. ${fileSizeAdjustable ? `The file-size cap for this call is ${String(fileSizeBytes)} bytes, one byte above max_output_bytes. analysis_timeout_ms does not raise it.` : `The file-size allowance is ${String(fileSizeBytes)} bytes. This release has no runtime override for that allowance, and analysis_timeout_ms does not raise it.`}`;
		timeoutFailure = (operation, reason, deadline, publication, details = {}) => new AnalysisTimeoutError(operation, deadline.timeoutMs, {
			...details,
			cause: reason,
			diagnostics: {
				phase: deadline.phase,
				...publication === undefined ? {} : { publication }
			},
			...deadline.phase === "publication" ? {
				userMessage: `Firmware publication exceeded its ${deadline.timeoutMs}ms budget. Extraction already completed.`,
				remediationAction: "Read any retained publication receipt first. For a retry, choose an absent local output directory or increase publication_timeout_ms (--publication-timeout-ms in the CLI)."
			} : {
				userMessage: `Firmware analysis exceeded its ${deadline.timeoutMs}ms wall-clock budget${operation === "extract_firmware" ? " before publication" : " during inspection or its final workspace cleanup"}.`,
				remediationAction: `Retry the same operation and preserve the selected input and analysis question. ${deadline.timeoutMs < 2147483647 ? `Increase analysis_timeout_ms (--analysis-timeout-ms in the CLI), an integer from 1 to ${MAX_NODE_TIMER_DELAY_MS} (default 120000).` : `analysis_timeout_ms (--analysis-timeout-ms in the CLI) is already at the maximum ${MAX_NODE_TIMER_DELAY_MS}; do not increase it further.`} Set the client tool-call timeout above the analysis budget plus publication and cleanup headroom. publication_timeout_ms only controls the later publication phase and cannot repair this analysis timeout. Fixed per-process CPU, memory and byte limits are unchanged. If cleanup is incomplete, resolve the reported owned resources before retrying; no server restart is needed after confirmed cleanup.`
			}
		});
		deadlineTimeout = (operation, phase, details) => phase.signal.aborted && phase.deadline.signal.aborted && phase.signal.reason === phase.deadline.signal.reason ? timeoutFailure(operation, phase.signal.reason, phase.deadline, phase.publication, details) : undefined;
		firmwareSignalInterruption = (operation, signal, deadline, publication) => (deadline === undefined ? undefined : deadlineTimeout(operation, {
			signal,
			deadline,
			publication
		})) ?? cancelledBy(operation, signal);
		firmwarePhaseInterruption = (operation, signal, deadline, publication) => isAborted(signal) ? firmwareSignalInterruption(operation, signal, deadline, publication) : firmwareDeadlineElapsed(deadline) ? timeoutFailure(operation, undefined, deadline, publication) : undefined;
		firmwareFailureDialect = (context) => {
			const { engine, operation, phase, treeCleanupLease } = context;
			return {
				providerId: engine,
				operation,
				recognise: (cause, details) => cause instanceof z.ZodError ? new AnalysisOutputError(operation, "Tool report violated the pinned producer protocol", {
					...details,
					cause
				}) : undefined,
				...phase === undefined ? {} : { interruption: (details) => deadlineTimeout(operation, phase, details) },
				readCleanup: (read, primary) => {
					const cleanup = new ProviderCleanupError(engine, read.cleanup.resources, { reason: read.cleanup.reason }, {
						operation,
						cause: read
					});
					bindArtifactFileCleanup(read, cleanup);
					if (read.cleanupLeases === undefined) treeCleanupLease?.bindCleanupError(cleanup);
					if (primary === undefined) return cleanup;
					return analysisErrorWithCleanupDependencies(primary, cleanup, operation);
				},
				unclassified: (cause, details) => new ProviderAdapterError(engine, operation, {
					...details,
					cause,
					diagnostics: { reason: errorMessage(cause) }
				})
			};
		};
	})))();
}

//#endregion
//#region dist/firmware/FirmwarePublication.js
var GAP_CONTINUATIONS, UNNAMED_DEPENDENCY_CONTINUATION, depthContinuation, nestedRegionContinuation, emptyGap, gapSortKey, publishFirmwareExtraction, dependencyExtractionGaps, extractionGaps;
function init_FirmwarePublication() {
	return (init_FirmwarePublication = __esmMin((() => {
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_FirmwareFailures();
		init_classifyProviderFailure();
		init_analysisErrorCore();
		init_providerCleanupError();
		init_jsonValue();
		init_firmwareAnalysis();
		init_FirmwareRelease();
		init_errorMessage();
		init_sha256Hex();
		GAP_CONTINUATIONS = {
			"missing-extractor-dependency": "REA installs nothing. Add the named dependency to your own environment and rerun extract_firmware on the same immutable input with a fresh output_directory to re-evaluate the affected region; otherwise it stays unextracted.",
			"unknown-chunk-handler": "If Binwalk is configured with REA_BINWALK_COMMAND, run inspect_firmware_regions on the same input for signature hypotheses. Without configured Binwalk that inspection is unavailable. Alternatively, select a materially narrower range with extract_firmware and a fresh output_directory; the region is not decoded content.",
			"unclassified-range": "The producer reported no chunk covering these bytes. Their format and extraction status remain unknown. If Binwalk is configured, inspect_firmware_regions can supply signature hypotheses; otherwise retain this range as unexamined.",
			"encrypted-chunk": "No static extraction continues past encryption; treat the region as unexamined rather than empty or corrupt.",
			"extractor-failure": "The producer retained this chunk's extraction problem in diagnostics. Review the reported failure, then rerun extract_firmware on the same immutable input with a fresh output_directory; the region is not decoded content.",
			"depth-limited": `Rerun extract_firmware with a higher max_depth (up to ${10}) and a fresh output_directory to descend into this path.`,
			"unpublished-entry": "The entry is retained as metadata; only regular files are published, without executable permission bits."
		};
		UNNAMED_DEPENDENCY_CONTINUATION = "The producer reported a missing extractor dependency without naming it; its identity is unavailable in this evidence. No specific installation or rerun can be prescribed from this report. Retain the gap as unextracted unless additional provider evidence establishes the dependency. REA installs nothing.";
		depthContinuation = (maxDepth, publishedChildPaths) => maxDepth < 10 ? GAP_CONTINUATIONS["depth-limited"] : publishedChildPaths.length > 0 ? `This extraction already ran at the lane's maximum depth. To continue, rerun extract_firmware with path set to any eligible published child below this path and a fresh output directory; each child listed here restarts the depth budget: ${publishedChildPaths.map((path) => JSON.stringify(path)).join(", ")}.` : `This extraction already ran at the lane's maximum depth, and no published child under this path is both nonempty and within the ${FIRMWARE_LIMITS.inputBytes}-byte firmware input limit, so the depth budget cannot be restarted from this output. Treat the region below this path as unexamined.`;
		nestedRegionContinuation = (publishedFile) => {
			const base = "This region is within a nested extraction, so its range is relative to the published child named by this gap's input_path, not to the original input.";
			return publishedFile !== undefined && publishedFile.size > 0 && publishedFile.size <= FIRMWARE_LIMITS.inputBytes ? `${base} Run inspect_firmware_regions with path set to that published child for signature hypotheses only if Binwalk is configured with REA_BINWALK_COMMAND. This inspection step is unavailable without configured Binwalk; retain the region as unexamined. Repeating the same whole-child extraction with unchanged handlers would not advance analysis.` : `${base} That published child is not a nonempty file within the ${FIRMWARE_LIMITS.inputBytes}-byte firmware input limit, so inspect_firmware_regions cannot accept it as a fresh input; treat the region as unexamined.`;
		};
		emptyGap = {
			relative_path: null,
			handler: null,
			provider_id: null,
			range: null,
			root_file_range: null,
			dependencies: []
		};
		gapSortKey = (gap) => [
			gap.input_path,
			gap.kind,
			gap.provider_id ?? "",
			gap.relative_path ?? ""
		].join("\0");
		publishFirmwareExtraction = async (context) => {
			let tree;
			let result;
			const files = [];
			let totalFiles = 0;
			const progress = () => ({
				output_directory: context.outputDirectory,
				verified_files: files.length,
				total_files: totalFiles
			});
			try {
				const materialized = new Set();
				for (const entry of context.entries) if (entry.kind === "file") materialized.add(`$output/${entry.relativePath}`);
				totalFiles = materialized.size;
				for (const path of context.normalized.files.keys()) {
					if (path !== "$input" && !materialized.has(path)) throw new AnalysisOutputError("extract_firmware", `Reported regular file is absent from materialized output: ${path}`);
				}
				const unpublished = [];
				tree = await SafeOutputTree.create(context.outputDirectory);
				for (const entry of context.entries) {
					if (entry.kind !== "file") {
						unpublished.push({
							relative_path: entry.relativePath,
							kind: entry.kind,
							link_target: entry.linkTarget,
							...entry.linkTargetHex === undefined ? {} : { link_target_hex: entry.linkTargetHex }
						});
						continue;
					}
					const logicalPath = `$output/${entry.relativePath}`;
					const reported = context.normalized.files.get(logicalPath);
					const sha256 = await context.files.hash(entry.path, context.signal);
					if (reported?.sha256 !== null && reported?.sha256 !== undefined && reported.sha256 !== sha256 || context.normalized.sizes.has(logicalPath) && context.normalized.sizes.get(logicalPath) !== entry.size) throw new AnalysisOutputError("extract_firmware", `Extracted bytes disagree with provider report: ${entry.relativePath}`);
					const written = await context.files.publish(entry, sha256, tree, context.signal);
					files.push({
						relative_path: entry.relativePath,
						path: join(tree.outputRoot, written.relativePath),
						size: entry.size,
						sha256,
						reported_sha256: reported?.sha256 ?? null,
						mime_type: reported?.mimeType ?? null,
						analysis_depth: reported?.depth ?? null,
						runtime_address: null,
						original_file_range: null
					});
				}
				result = firmwareResultSchemas.extract_firmware.parse({
					analysis_timeout_ms: context.analysisTimeoutMs,
					engine: context.engine,
					selection: context.selection,
					output_directory: tree.outputRoot,
					coverage: unpublished.length > 0 ? "partial" : context.normalized.coverage,
					files,
					unpublished_entries: unpublished,
					chunks: context.normalized.chunks.map(({ extraction_failure_kinds, ...chunk }) => ({
						...chunk,
						extraction_failed: extraction_failure_kinds.length > 0
					})),
					derivations: context.normalized.derivations,
					depth_limited_paths: context.normalized.depth_limited_paths,
					diagnostics: context.normalized.diagnostics,
					...extractionGaps(unpublished, files, context.normalized, context.maxDepth),
					published_bytes: files.reduce((sum, file) => sum + file.size, 0)
				});
				const interruption = firmwarePhaseInterruption("extract_firmware", context.signal, context.deadline, progress());
				if (interruption !== undefined) throw interruption;
				await tree.commit(context.signal);
				return result;
			} catch (cause) {
				if (cause instanceof SafeOutputTreeCreationFailure) tree = cause.tree;
				const ownedTree = tree;
				const treeLease = ownedTree === undefined ? undefined : new AnalysisCleanupLease(async () => {
					await ownedTree.rollback();
				});
				const primary = classifyProviderFailure(outputDirectoryAdmissionRefusal("extract_firmware", "output_directory", cause), firmwareFailureDialect({
					engine: "unblob",
					operation: "extract_firmware",
					phase: {
						signal: context.signal,
						deadline: context.deadline,
						publication: progress()
					},
					treeCleanupLease: treeLease
				}));
				try {
					await treeLease?.release();
				} catch (cleanupCause) {
					const publishedResult = tree?.published === true && result !== undefined ? {
						kind: "firmware",
						result: jsonValueSchema.parse(result)
					} : undefined;
					const cleanup = new ProviderCleanupError("unblob", [context.outputDirectory, context.workspacePath], {
						reason: errorMessage(cleanupCause),
						previous_error: errorMessage(cause)
					}, {
						cause: cleanupCause,
						operation: "extract_firmware",
						...publishedResult === undefined ? {} : { partialObservation: publishedResult }
					});
					if (tree !== undefined && treeLease !== undefined) context.retainCleanup(tree, treeLease, cleanup);
					if (publishedResult !== undefined) primary.retainPartialObservation(publishedResult);
					throw analysisErrorWithCleanupDependencies(primary, cleanup, "extract_firmware");
				}
				if (tree?.published === true && result !== undefined) return result;
				throw primary;
			}
		};
		dependencyExtractionGaps = (normalized, continuation) => {
			const chunksByKey = new Map(normalized.chunks.map((chunk) => [JSON.stringify([chunk.input_path, chunk.provider_id]), chunk]));
			return [
				...normalized.chunk_missing_dependencies.flatMap(({ input_path, provider_id, dependencies }) => {
					const affected = chunksByKey.get(JSON.stringify([input_path, provider_id]));
					return [{
						kind: "missing-extractor-dependency",
						input_path,
						...emptyGap,
						...affected === undefined ? {} : {
							handler: affected.handler,
							provider_id,
							range: affected.range,
							root_file_range: affected.root_file_range
						},
						dependencies: [...dependencies],
						continuation_id: continuation(dependencies.length > 0 ? GAP_CONTINUATIONS["missing-extractor-dependency"] : UNNAMED_DEPENDENCY_CONTINUATION)
					}];
				}),
				...normalized.failed_extraction_stages.filter(({ kind }) => kind === "missing-extractor-dependency").map(({ input_path, provider_id, handler, dependencies }) => ({
					kind: "missing-extractor-dependency",
					input_path,
					...emptyGap,
					handler,
					provider_id,
					dependencies: [...dependencies],
					continuation_id: continuation(dependencies.length > 0 ? GAP_CONTINUATIONS["missing-extractor-dependency"] : UNNAMED_DEPENDENCY_CONTINUATION)
				})),
				...normalized.missing_dependencies.map(({ input_path, dependencies }) => ({
					kind: "missing-extractor-dependency",
					input_path,
					...emptyGap,
					dependencies: [...dependencies],
					continuation_id: continuation(dependencies.length > 0 ? GAP_CONTINUATIONS["missing-extractor-dependency"] : UNNAMED_DEPENDENCY_CONTINUATION)
				}))
			];
		};
		extractionGaps = (unpublished, files, normalized, maxDepth) => {
			const instructions = new Map();
			const continuation = (instruction) => {
				const known = instructions.get(instruction);
				if (known !== undefined) return known;
				const id = sha256Hex(instruction);
				instructions.set(instruction, id);
				return id;
			};
			const dependencyGaps = dependencyExtractionGaps(normalized, continuation);
			const publishedFiles = new Map(files.map((file) => [`$output/${file.relative_path}`, file]));
			const nestedContinuationId = (inputPath) => {
				return continuation(nestedRegionContinuation(publishedFiles.get(inputPath)));
			};
			const chunkGaps = (kind, matches) => normalized.chunks.filter(matches).map((chunk) => ({
				kind,
				input_path: chunk.input_path,
				...emptyGap,
				handler: chunk.handler,
				provider_id: chunk.provider_id,
				range: chunk.range,
				root_file_range: chunk.root_file_range,
				dependencies: [],
				continuation_id: kind === "unknown-chunk-handler" && chunk.input_path.startsWith("$output/") ? nestedContinuationId(chunk.input_path) : continuation(GAP_CONTINUATIONS[kind])
			}));
			const ceilingReached = maxDepth >= 10 && normalized.depth_limited_paths.length > 0;
			const reRootablePaths = new Map();
			if (ceilingReached) for (const [filePath, file] of [...publishedFiles].sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)) {
				const size = file.size;
				if (size <= 0 || size > FIRMWARE_LIMITS.inputBytes) continue;
				const segments = filePath.split("/");
				while (segments.length > 1) {
					const ancestor = segments.join("/");
					const childPaths = reRootablePaths.get(ancestor) ?? new Set();
					childPaths.add(file.path);
					reRootablePaths.set(ancestor, childPaths);
					segments.pop();
				}
			}
			const depthContinuationIds = new Map();
			const depthContinuationId = (inputPath) => {
				const existing = depthContinuationIds.get(inputPath);
				if (existing !== undefined) return existing;
				const id = continuation(depthContinuation(maxDepth, [...reRootablePaths.get(inputPath) ?? []].sort()));
				depthContinuationIds.set(inputPath, id);
				return id;
			};
			const gaps = [
				...dependencyGaps,
				...normalized.unclassified_ranges.map((unclassified) => ({
					...emptyGap,
					...unclassified,
					kind: "unclassified-range",
					continuation_id: unclassified.input_path.startsWith("$output/") ? nestedContinuationId(unclassified.input_path) : continuation(GAP_CONTINUATIONS["unclassified-range"])
				})),
				...normalized.failed_extraction_stages.filter(({ kind }) => kind === "extractor-failure").map(({ input_path, provider_id, handler }) => ({
					kind: "extractor-failure",
					input_path,
					...emptyGap,
					handler,
					provider_id,
					dependencies: [],
					continuation_id: continuation("The producer retained this extraction stage's failure in diagnostics. Review the stage report and correct the reported cause before rerunning extract_firmware on the same immutable input with a fresh output_directory; this report establishes no byte-region ownership.")
				})),
				...chunkGaps("unknown-chunk-handler", (chunk) => chunk.handler === null),
				...chunkGaps("encrypted-chunk", (chunk) => chunk.encrypted === true),
				...chunkGaps("extractor-failure", (chunk) => chunk.extraction_failure_kinds.includes("extractor-failure")),
				...normalized.depth_limited_paths.map((input_path) => ({
					kind: "depth-limited",
					input_path,
					...emptyGap,
					dependencies: [],
					continuation_id: depthContinuationId(input_path)
				})),
				...unpublished.map((entry) => ({
					kind: "unpublished-entry",
					input_path: `$output/${entry.relative_path}`,
					...emptyGap,
					relative_path: entry.relative_path,
					dependencies: [],
					continuation_id: continuation(GAP_CONTINUATIONS["unpublished-entry"])
				}))
			];
			gaps.sort((left, right) => gapSortKey(left) < gapSortKey(right) ? -1 : gapSortKey(left) > gapSortKey(right) ? 1 : 0);
			return {
				extraction_gaps: gaps,
				extraction_continuations: [...instructions].map(([instruction, id]) => ({
					id,
					instruction
				}))
			};
		};
	})))();
}

//#endregion
//#region dist/firmware/FirmwareProviderIdentities.js
var BINWALK_PROVIDER_IDENTITY, UNBLOB_PROVIDER_IDENTITY;
function init_FirmwareProviderIdentities() {
	return (init_FirmwareProviderIdentities = __esmMin((() => {
		init_firmwareToolRequirements();
		BINWALK_PROVIDER_IDENTITY = {
			id: "binwalk",
			name: FIRMWARE_TOOL_REQUIREMENTS.binwalk.name,
			version: FIRMWARE_TOOL_REQUIREMENTS.binwalk.version
		};
		UNBLOB_PROVIDER_IDENTITY = {
			id: "unblob",
			name: FIRMWARE_TOOL_REQUIREMENTS.unblob.name,
			version: FIRMWARE_TOOL_REQUIREMENTS.unblob.version
		};
	})))();
}

//#endregion
//#region dist/firmware/FirmwareVersion.js
var TOKEN, parseToken, admitFirmwareVersion, versionToken;
function init_FirmwareVersion() {
	return (init_FirmwareVersion = __esmMin((() => {
		init_firmwareToolRequirements();
		TOKEN = /^(\d+)\.(\d+)\.(\d+)([-+][0-9A-Za-z.-]+)?$/u;
		parseToken = (token) => {
			const match = TOKEN.exec(token);
			if (match === null) return undefined;
			const major = Number(match[1]);
			const minor = Number(match[2]);
			const patch = Number(match[3]);
			if (![
				major,
				minor,
				patch
			].every((part) => Number.isSafeInteger(part))) return undefined;
			return {
				major,
				minor,
				token
			};
		};
		admitFirmwareVersion = (engine, banner) => {
			const token = versionToken(engine, banner);
			const parsed = token === undefined ? undefined : parseToken(token);
			const verified = FIRMWARE_TOOL_REQUIREMENTS[engine];
			const accepted = `accepted releases are ${verified.requirement}`;
			if (parsed === undefined) return {
				status: "unresolved",
				message: `Unsupported tool version ${banner.length === 0 ? "missing" : banner}; ${accepted}.`
			};
			if (parsed.major !== verified.major || parsed.minor !== verified.minor) return {
				status: "unsupported",
				message: `Unsupported tool version ${banner}; ${accepted}.`
			};
			if (parsed.token === verified.version) return {
				status: "verified",
				version: parsed.token
			};
			return {
				status: "compatible",
				version: parsed.token,
				limitation: `This session uses ${verified.name} ${parsed.token}. The report parser is verified against ${verified.version}; other ${verified.line} builds are accepted and the observed version is reported.`
			};
		};
		versionToken = (engine, banner) => {
			switch (engine) {
				case "binwalk": return banner.startsWith("binwalk ") ? banner.slice("binwalk ".length) : undefined;
				case "unblob": return banner;
				default: {
					const unreachable = engine;
					return unreachable;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/firmware/FirmwareFiles.js
var throwIfFirmwareInventoryCancelled, FirmwareFileAccess, firmwareReportFailure, firmwareSourceAdmissionFailure, firmwareInputFailure, inventoryFirmwareOutput, firmwareStagingBudgetRemediation, firmwareStagingLimit, firmwareFileSizeLimitReached, firmwareLogicalPath;
function init_FirmwareFiles() {
	return (init_FirmwareFiles = __esmMin((() => {
		init_safeJson();
		init_analysisErrorCore();
		init_firmwareAnalysis();
		init_callerPath();
		init_LinuxResourceLimits();
		init_BoundedFileBytes();
		init_FirmwareRelease();
		init_FirmwareFailures();
		init_unicodeCodePointOrder();
		init_resources();
		init_decodeDirectoryEntryName();
		init_RegularFile();
		init_symlinkTarget();
		throwIfFirmwareInventoryCancelled = (signal, operation, deadline) => {
			if (isAborted(signal)) throw firmwareSignalInterruption(operation, signal, deadline);
		};
		FirmwareFileAccess = class {
			resources = new ArtifactResourceScope();
			/** Retry retained descriptors without closing admission for future operations. */
			retryCleanup() {
				return this.resources.retryCleanup();
			}
			/** Wait for admitted operations and retry every retained descriptor. */
			close() {
				return this.resources.close();
			}
			/** Read inherited file policy through this same retryable descriptor owner. */
			async fileSizeCeiling(signal) {
				return this.resources.run(async () => {
					assertArtifactReadActive(signal);
					const limits = await readLinuxResourceLimits({
						address_space_bytes: FIRMWARE_LIMITS.addressSpaceBytes,
						cpu_seconds: FIRMWARE_LIMITS.cpuSeconds,
						file_bytes: Number.MAX_SAFE_INTEGER
					}, this.resources);
					assertArtifactReadActive(signal);
					return limits.file_bytes;
				});
			}
			/** Hash one admitted regular file without retaining its bytes in memory. */
			hash(path, signal) {
				return this.resources.run(() => this.#hash(path, signal));
			}
			async #hash(path, signal) {
				return withArtifactRegularFile(path, this.resources, signal, async ({ handle }) => {
					const hash = createHash("sha256");
					for await (const chunk of readArtifactFileChunks(handle, { signal })) {
						assertArtifactReadActive(signal);
						hash.update(chunk);
					}
					assertArtifactReadActive(signal);
					return hash.digest("hex");
				});
			}
			/** Copy and identify the exact bytes consumed by firmware providers. */
			snapshot(request, root, signal) {
				return this.resources.run(() => this.#snapshot(request, root, signal));
			}
			async #snapshot(request, root, signal) {
				const sourcePath = absoluteCallerPath(request.input.path);
				let sourceAdmitted = false;
				const fullPath = join(root, "firmware.bin");
				const copied = await withArtifactRegularFile(sourcePath, this.resources, signal, async ({ handle, initial: stat }) => {
					sourceAdmitted = true;
					if (stat.size === 0 || stat.size > FIRMWARE_LIMITS.inputBytes) throw firmwareInputFailure(request.operation);
					const hash = createHash("sha256");
					let size = 0;
					const meter = new Transform({ transform(chunk, _encoding, callback) {
						size += chunk.length;
						if (size > FIRMWARE_LIMITS.inputBytes) {
							callback(firmwareInputFailure(request.operation));
							return;
						}
						hash.update(chunk);
						callback(null, chunk);
					} });
					await pipeline$1(readArtifactFileChunks(handle, { signal }), meter, createWriteStream(fullPath, {
						flags: "wx",
						mode: 384
					}));
					return {
						size,
						sha256: hash.digest("hex")
					};
				}, "follow").catch((cause) => {
					throw sourceAdmitted ? cause : firmwareSourceAdmissionFailure(request.operation, sourcePath, cause);
				});
				const { size, sha256 } = copied;
				await chmod(fullPath, 256);
				const selected = request.operation === "extract_firmware" ? request.input.range : undefined;
				const offset = selected?.offset ?? 0;
				const length = selected?.length ?? size;
				if (length === 0 || offset > size || length > size - offset) throw new AnalysisInputError(request.operation, undefined, [{
					path: ["range"],
					reason: "out_of_range",
					message: `Selected range must be within the ${size}-byte firmware file`
				}]);
				let inputPath = fullPath;
				if (selected !== undefined) {
					inputPath = join(root, "selected.bin");
					await withArtifactRegularFile(fullPath, this.resources, signal, async ({ handle }) => {
						await pipeline$1(readArtifactFileChunks(handle, {
							start: offset,
							end: offset + length - 1,
							signal
						}), createWriteStream(inputPath, {
							flags: "wx",
							mode: 384
						}));
					});
					await chmod(inputPath, 256);
				}
				return {
					subject: {
						path: sourcePath,
						sha256,
						format: "file"
					},
					size,
					inputPath,
					selection: {
						offset,
						length,
						sha256: selected === undefined ? sha256 : await this.#hash(inputPath, signal)
					}
				};
			}
			/** Own the exact source descriptor consumed by publication through its final close. */
			publish(entry, sha256, tree, signal) {
				return this.resources.run(() => withArtifactRegularFile(entry.path, this.resources, signal, ({ handle }) => tree.write(entry.relativePath, Readable.from((async function* () {
					assertArtifactReadActive(signal);
					yield* readArtifactFileChunks(handle, { signal });
				})()), {
					sha256,
					bytes: entry.size
				}, signal)));
			}
			/**
			* Read a complete bounded report; oversized data is never reported as complete.
			* Each refusal records its observed report state, so an absent or empty report
			* is never conflated with an empty scan or a malformed one.
			*/
			async report(path, operation, signal) {
				return this.resources.run(() => withArtifactRegularFile(path, this.resources, signal, async ({ handle }) => {
					const bytes = await readBoundedFileBytes(handle, FIRMWARE_LIMITS.reportBytes);
					if (bytes === undefined) throw firmwareReportFailure(operation, "oversized", `Report exceeded ${FIRMWARE_LIMITS.reportBytes} bytes`);
					assertArtifactReadActive(signal);
					if (bytes.length === 0) throw firmwareReportFailure(operation, "empty", "Report is empty");
					try {
						const decoded = safeParseUtf8Json(bytes);
						if (!decoded.ok) throw decoded.cause;
						return decoded.value;
					} catch (cause) {
						throw firmwareReportFailure(operation, "invalid_json", "Tool report is not valid complete JSON", cause);
					}
				}).catch((cause) => {
					throw mapArtifactFileFailure(cause, (primary) => primary instanceof NonRegularFileReadError ? firmwareReportFailure(operation, "not_regular_file", "Report is not a regular file", primary) : primary instanceof Error && "code" in primary && primary.code === "ENOENT" ? firmwareReportFailure(operation, "missing", "Report was not created", primary) : primary);
				}));
			}
		};
		firmwareReportFailure = (operation, state, reason, cause) => new AnalysisOutputError(operation, reason, {
			cause,
			diagnostics: { report_state: state }
		});
		firmwareSourceAdmissionFailure = (operation, path, cause) => mapArtifactFileFailure(cause, (primary) => {
			if (primary instanceof NonRegularFileReadError) return firmwareInputFailure(operation, primary);
			if (primary instanceof Error && "code" in primary && (primary.code === "EACCES" || primary.code === "EPERM")) return new AnalysisAccessDeniedError(operation, path, primary.code, { cause: primary });
			if (artifactSelectedPathErrno(primary) !== undefined) return new AnalysisInputError(operation, { cause: primary }, [{
				path: ["path"],
				reason: "invalid_value",
				message: "Firmware source must resolve to an accessible regular file"
			}]);
			return primary;
		});
		firmwareInputFailure = (operation, cause) => {
			const message = `Firmware must be a nonempty regular file no larger than ${String(FIRMWARE_LIMITS.inputBytes)} bytes. Select a stable copy within this allowance. ${firmwareLimitRecovery(`The firmware input allowance is ${String(FIRMWARE_LIMITS.inputBytes)} bytes`)}`;
			return new AnalysisInputError(operation, {
				cause,
				userMessage: message
			}, [{
				path: ["path"],
				reason: "out_of_range",
				message
			}]);
		};
		inventoryFirmwareOutput = async (root, maxBytes, maxEntries, fileSizeBytes, operation, signal, deadline) => {
			const entries = [];
			const pending = [root];
			let bytes = 0;
			let count = 0;
			while (pending.length > 0) {
				throwIfFirmwareInventoryCancelled(signal, operation, deadline);
				const directory = pending.pop();
				if (directory === undefined) break;
				const directoryStat = await lstat(directory).catch((cause) => {
					if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return undefined;
					throw cause;
				});
				if (directoryStat === undefined || !directoryStat.isDirectory() || directoryStat.isSymbolicLink()) continue;
				const handle = await opendir(directory, { encoding: "buffer" }).catch((cause) => {
					if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return undefined;
					throw cause;
				});
				if (handle === undefined) continue;
				const names = [];
				for await (const entry of handle) {
					throwIfFirmwareInventoryCancelled(signal, operation, deadline);
					count++;
					if (count > maxEntries) throw firmwareStagingLimit(operation, "max_output_files", maxEntries);
					const decoded = decodeDirectoryEntryName(entry.name);
					if (decoded.kind === "unrepresentable") throw new AnalysisOutputError(operation, "Extracted filename cannot be represented losslessly as UTF-8", { diagnostics: {
						directory: relative(root, directory),
						raw_name_hex: decoded.rawHex
					} });
					names.push(decoded.name);
				}
				for (const name of names.sort()) {
					const path = join(directory, name);
					const stat = await lstat(path).catch((cause) => {
						if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return undefined;
						throw cause;
					});
					if (stat === undefined) continue;
					if (stat.isDirectory()) {
						pending.push(path);
						continue;
					}
					if (stat.isFile()) bytes += stat.size;
					if (bytes > maxBytes) throw firmwareStagingLimit(operation, "max_output_bytes", maxBytes);
					if (stat.isFile() && stat.size >= fileSizeBytes) throw firmwareFileSizeLimitReached(operation, fileSizeBytes);
					const linkTarget = stat.isSymbolicLink() ? observedSymlinkTarget(await readlink(path, { encoding: "buffer" })) : undefined;
					entries.push({
						path,
						relativePath: relative(root, path).split(sep).join("/"),
						size: stat.size,
						kind: stat.isSymbolicLink() ? "symlink" : stat.isFile() ? "file" : "special",
						linkTarget: linkTarget?.text ?? null,
						...linkTarget === undefined ? {} : { linkTargetHex: linkTarget.hex }
					});
				}
			}
			return entries.sort((a, b) => compareUnicodeCodePoints(a.relativePath, b.relativePath));
		};
		firmwareStagingBudgetRemediation = (budget, selectedLimit) => {
			const maximum = budget === "max_output_files" ? MAX_FIRMWARE_STAGING_ENTRIES : MAX_FIRMWARE_STAGING_BYTES;
			const description = budget === "max_output_files" ? "staging entry budget, which counts extracted directories and links" : "staging file-byte budget, checked during extraction";
			if (selectedLimit < maximum) return `The ${description} was exceeded (${budget}=${String(selectedLimit)}; supported maximum ${String(maximum)}). Increase ${budget} up to ${String(maximum)} if the larger extraction is required, or select a materially narrower firmware byte range. analysis_timeout_ms does not raise this staging allowance.`;
			return `The ${description} reached its supported maximum (${budget}=${String(selectedLimit)}; maximum ${String(maximum)}). Raising ${budget} further is not supported. Select a smaller firmware byte range or analyze a smaller image. analysis_timeout_ms does not raise this staging allowance.`;
		};
		firmwareStagingLimit = (operation, field, maximum) => new AnalysisResourceConstraintError(operation, "capacity", `Firmware staging exceeded ${field} (${maximum})`, { [field]: maximum }, {
			retryable: false,
			remediationAction: firmwareStagingBudgetRemediation(field, maximum)
		});
		firmwareFileSizeLimitReached = (operation, fileSizeBytes) => new AnalysisResourceConstraintError(operation, "file-size", `A staged firmware file reached the ${String(fileSizeBytes)}-byte per-file limit and may be truncated`, { file_size_bytes: fileSizeBytes }, {
			retryable: false,
			remediationAction: `REA inherited a ${String(fileSizeBytes)}-byte file-size limit (RLIMIT_FSIZE), so it could not keep one byte of headroom above max_output_bytes and the report and diagnostic allowances. A staged file that reaches the limit cannot be told apart from one the kernel cut short. Raise the file-size limit REA inherits (for example ulimit -f in the launching shell or service) above the largest file the extraction needs. analysis_timeout_ms does not raise it, and repeating the unchanged request fails the same way.`
		});
		firmwareLogicalPath = (path, inputPath, outputRoot) => {
			if (path === inputPath) return "$input";
			const rel = relative(outputRoot, path);
			if (!isAbsolute(path) || rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new AnalysisOutputError("extract_firmware", `Provider reported a path outside its owned output: ${path}`);
			return rel === "" ? "$output" : `$output/${rel.split(sep).join("/")}`;
		};
	})))();
}

//#endregion
//#region dist/firmware/FirmwareCommand.js
var firmwareToolUnavailable, firmwareHostSupported, executableRegularFileRefusal, resolveFirmwareCommand, firmwareFileSizeLimit, firmwareFileSizeAdjustable, runFirmwareCommand, firmwareExecutionOutput, readFirmwareCommandReport;
function init_FirmwareCommand() {
	return (init_FirmwareCommand = __esmMin((() => {
		init_capturedProviderOutput();
		init_OwnedCommandCleanup();
		init_resources();
		init_ArtifactCommandPath();
		init_firmwareToolRequirements();
		init_analysisErrorCore();
		init_classifyProviderFailure();
		init_providerAdapterError();
		init_providerCleanupError();
		init_analysisErrorProjection();
		init_FirmwareFailures();
		init_LinuxResourceLimits();
		init_ProcessOwnership();
		init_ProviderProcess();
		init_FirmwareRelease();
		init_FirmwareFiles();
		init_errorMessage();
		firmwareToolUnavailable = (engine, operation, reason) => new AnalysisCapabilityUnavailableError(engine, operation, reason, { userMessage: reason });
		firmwareHostSupported = (platform) => platform === "linux";
		executableRegularFileRefusal = async (accessPath, statPath, mode) => {
			try {
				await access(accessPath, mode);
				return (await stat(statPath)).isFile() ? undefined : "Configured path is not a regular file";
			} catch (cause) {
				return errorMessage(cause);
			}
		};
		resolveFirmwareCommand = async (environment, engine, operation, files, platform, signal) => {
			const variable = FIRMWARE_TOOL_REQUIREMENTS[engine].commandEnvironment;
			const configured = environment[variable];
			if (!firmwareHostSupported(platform) || configured === undefined || !isAbsolute(configured)) throw firmwareToolUnavailable(engine, operation, `This integration requires Linux and an absolute ${variable} path to the caller-supplied tool`);
			const selection = await selectArtifactCommandPath(configured, signal).catch((cause) => {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				throw firmwareToolUnavailable(engine, operation, `${variable} is unavailable: ${errorMessage(cause)}`);
			});
			const command = selection.invocationPath;
			const engineUnavailable = (reason) => firmwareToolUnavailable(engine, operation, `${variable} is not a readable executable regular file: ${command}: ${reason}`);
			const engineRefusal = await executableRegularFileRefusal(command, command, constants.R_OK | constants.X_OK);
			if (engineRefusal !== undefined) throw engineUnavailable(engineRefusal);
			let sha256;
			try {
				sha256 = await files.hash(selection.resolvedPath, signal);
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				throw engineUnavailable(errorMessage(cause));
			}
			const limiter = environment.REA_FIRMWARE_PRLIMIT_COMMAND ?? "/usr/bin/prlimit";
			if (!isAbsolute(limiter)) throw firmwareToolUnavailable(engine, operation, "REA_FIRMWARE_PRLIMIT_COMMAND must be absolute");
			const limiterUnavailable = (reason) => firmwareToolUnavailable(engine, operation, `Resource limiter is not an executable regular file: ${limiter}: ${reason}; provide util-linux prlimit`);
			let limiterSelection;
			try {
				limiterSelection = await selectArtifactCommandPath(limiter, signal);
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				throw limiterUnavailable(errorMessage(cause));
			}
			const limiterRefusal = await executableRegularFileRefusal(limiterSelection.resolvedPath, limiter, constants.X_OK);
			if (limiterRefusal !== undefined) throw limiterUnavailable(limiterRefusal);
			return {
				command: selection,
				limiter: limiterSelection,
				sha256,
				fileSizeCeiling: await files.fileSizeCeiling(signal)
			};
		};
		firmwareFileSizeLimit = (fileSizeCeiling, stagingBytes) => Math.min(fileSizeCeiling, Math.max(stagingBytes ?? 0, FIRMWARE_LIMITS.reportBytes, FIRMWARE_LIMITS.diagnosticBytes) + 1);
		firmwareFileSizeAdjustable = (fileSizeCeiling, stagingBytes) => stagingBytes !== undefined && firmwareFileSizeLimit(fileSizeCeiling, stagingBytes + 1) > firmwareFileSizeLimit(fileSizeCeiling, stagingBytes);
		runFirmwareCommand = async (context) => {
			const { engine, operation, signal } = context;
			const dialect = firmwareFailureDialect({
				engine,
				operation,
				phase: {
					signal,
					deadline: context.deadline
				}
			});
			const fileSizeBytes = firmwareFileSizeLimit(context.fileSizeCeiling, context.outputBudget?.bytes);
			const fileSizeAdjustable = firmwareFileSizeAdjustable(context.fileSizeCeiling, context.outputBudget?.bytes);
			const checkInterruption = () => {
				const failure = firmwarePhaseInterruption(operation, signal, context.deadline);
				if (failure !== undefined) throw failure;
			};
			checkInterruption();
			const runId = `rea-firmware-${randomUUID()}`;
			const spawned = await (context.launcher ?? spawnOwnedProviderProcess)({
				command: context.limiter,
				arguments: [...prlimitArgumentVector({
					address_space_bytes: FIRMWARE_LIMITS.addressSpaceBytes,
					file_bytes: fileSizeBytes,
					cpu_seconds: FIRMWARE_LIMITS.cpuSeconds
				}, context.command), ...context.args],
				expectedCommand: null,
				runId,
				cwd: context.cwd,
				hostEnvironment: context.environment,
				signal,
				env: {
					TMPDIR: context.cwd,
					OMP_NUM_THREADS: "1",
					OPENBLAS_NUM_THREADS: "1",
					RAYON_NUM_THREADS: "1",
					NO_COLOR: "1"
				}
			}).catch((cause) => {
				const cancellation = processInspectionCancellationError(cause, operation);
				const interruption = cancellation === undefined ? undefined : firmwarePhaseInterruption(operation, signal, context.deadline);
				const primary = cancellation === undefined ? classifyProviderFailure(cause, dialect) : interruption instanceof AnalysisTimeoutError ? interruption : cancellation;
				throw retainProcessInspectionCleanup(cause, primary, context.resources, operation);
			});
			let failure;
			const isFailedExit = (code) => code !== undefined && code !== 0 && !(context.acceptReportedExtractionFailure === true && code === 1);
			const completedFailure = (snapshot) => {
				if (isFailedExit(snapshot.exitCode)) {
					const signalLimit = firmwareSignalLimitError(operation, snapshot.signal, fileSizeBytes, fileSizeAdjustable, capturedProviderOutput(snapshot));
					if (signalLimit !== undefined) return signalLimit;
					return new ProviderAdapterError(engine, operation, {
						diagnostics: {
							reason: "Tool failed; inspect exit status and stderr for format, dependency, sandbox or resource-limit failures",
							...capturedProviderOutput(snapshot)
						},
						remediationAction: `Inspect exit status and stderr for format, dependency, sandbox, or resource-limit failures. ${firmwareProcessLimitRecovery(fileSizeBytes, fileSizeAdjustable)} A format or dependency failure is not repaired by changing analysis_timeout_ms.`
					});
				}
				return undefined;
			};
			let completedFailureObserved = false;
			let diagnosticTruncated = false;
			const supervisor = new ProviderProcessSupervisor({
				...spawned,
				ownsProcessLifetime: true,
				cleanup: spawned.cleanup ?? (() => cleanupOwnedProcessGroup(spawned.ownership))
			}, {
				maxDiagnosticBytes: FIRMWARE_LIMITS.diagnosticBytes,
				onDiagnostic: (event) => {
					if (event.type === "output" && event.truncated === true) diagnosticTruncated = true;
					if (event.type === "exit" && failure === undefined && !diagnosticTruncated && firmwarePhaseInterruption(operation, signal, context.deadline) === undefined) completedFailureObserved = isFailedExit(event.code);
				}
			});
			const checkDiagnostics = () => {
				if (diagnosticTruncated) {
					const snapshot = supervisor.snapshot();
					throw new AnalysisOutputError(operation, `Tool diagnostics exceeded the ${FIRMWARE_LIMITS.diagnosticBytes}-byte capture budget`, {
						capturedOutput: capturedProviderOutput(snapshot),
						userMessage: `Firmware diagnostics exceeded the ${String(FIRMWARE_LIMITS.diagnosticBytes)}-byte capture allowance. This release has no runtime override.`,
						remediationAction: firmwareLimitRecovery(`The firmware diagnostic capture allowance is ${String(FIRMWARE_LIMITS.diagnosticBytes)} bytes`)
					});
				}
			};
			try {
				while (!await supervisor.waitForOutputClose(100)) {
					checkDiagnostics();
					checkInterruption();
					if (context.outputBudget !== undefined) await inventoryFirmwareOutput(context.outputBudget.root, context.outputBudget.bytes, context.outputBudget.entries, fileSizeBytes, operation, signal, context.deadline);
				}
				checkDiagnostics();
				checkInterruption();
			} catch (cause) {
				failure ??= classifyProviderFailure(cause, dialect);
			}
			const stopped = await supervisor.stop();
			failure ??= firmwarePhaseInterruption(operation, signal, context.deadline);
			const snapshot = supervisor.snapshot();
			if (completedFailureObserved) failure = completedFailure(snapshot);
			if (stopped.status === "incomplete") {
				context.retainCleanup(supervisor);
				const previous = failure === undefined ? undefined : projectAnalysisErrorWithoutCapturedOutput(failure);
				throw new ProviderCleanupError(engine, [runId, context.cwd], {
					reason: stopped.reason,
					leader_pid: spawned.ownership.leaderPid,
					process_group_id: spawned.ownership.processGroupId,
					previous_error: previous ?? null
				}, {
					operation,
					cleanupPrimary: failure,
					capturedOutput: capturedProviderOutput(snapshot)
				});
			}
			if (failure !== undefined) throw failure;
			return {
				stdout: snapshot.stdout,
				stderr: snapshot.stderr,
				exit_code: snapshot.exitCode,
				signal: snapshot.signal ?? null,
				command: context.command,
				args: [...context.args],
				resource_limiter: context.limiter
			};
		};
		firmwareExecutionOutput = (execution) => capturedProviderOutput({
			stdout: execution.stdout,
			stderr: execution.stderr,
			exitCode: execution.exit_code,
			signal: execution.signal
		});
		readFirmwareCommandReport = async (context) => {
			try {
				return await context.files.report(context.path, context.operation, context.signal);
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) {
					const { engine, operation, execution, deadline } = context;
					const signal = context.signal ?? deadline?.signal;
					const failure = classifyProviderFailure(cause, firmwareFailureDialect({
						engine,
						operation,
						phase: deadline === undefined || signal === undefined ? undefined : {
							signal,
							deadline
						}
					}));
					if (cause.partialObservation !== undefined) failure.retainPartialObservation(cause.partialObservation);
					throw failure.retainCapturedOutput(firmwareExecutionOutput(execution));
				}
				const { engine, operation, execution } = context;
				const reportFailure = cause instanceof AnalysisOutputError ? cause.reason : `Report could not be read: ${errorMessage(cause)}`;
				const diagnostics = {
					...cause instanceof AnalysisOutputError ? cause.diagnostics : {},
					report_path: context.path,
					report_failure: reportFailure,
					command: execution.command,
					args: execution.args,
					resource_limiter: execution.resource_limiter,
					...firmwareExecutionOutput(execution)
				};
				if (execution.exit_code === 1) throw new ProviderAdapterError(engine, operation, {
					cause,
					diagnostics: {
						reason: "Tool exited 1 without a usable analysis report; inspect stderr for startup, sandbox or dependency failures",
						...diagnostics
					}
				});
				const oversized = cause instanceof AnalysisOutputError && cause.diagnostics?.report_state === "oversized";
				const reportFacts = "Review diagnostics.report_state, the exit status and captured stdout/stderr. REA did not retry or substitute an empty result. diagnostics.command and diagnostics.args record what ran; their workspace paths are REA-private and removed after the attempt, so they cannot be replayed as-is.";
				const reportAllowance = firmwareLimitRecovery(`The firmware report allowance is ${String(FIRMWARE_LIMITS.reportBytes)} bytes`);
				const observed = `${engine} exited successfully but left no usable report (${reportFailure}), so ${operation} produced no Evidence. A successful exit status is not an empty or complete result.`;
				throw new AnalysisOutputError(operation, `${engine} exited ${String(execution.exit_code)} without a usable report: ${reportFailure}`, {
					cause,
					diagnostics,
					userMessage: oversized ? `${observed} ${reportAllowance}` : observed,
					remediationAction: oversized ? `${reportFacts} ${reportAllowance} \`rea doctor\` checks configuration only and cannot recover this report.` : `${reportFacts} Rerun the same REA request to check whether this is intermittent; each attempt uses a fresh workspace. If it recurs, copy the selected input bytes into a new directory and run diagnostics.command with the same flags, replacing every private path with your copy and a new report path, under the documented firmware resource limits; confirm that it writes the requested report. \`rea doctor\` checks configuration only and cannot recover this report.`
				});
			}
		};
	})))();
}

//#endregion
//#region dist/firmware/FirmwareReports.js
var integer, signature, scan, report, task, extraction, stat$1, multiFile, hashes, missingDependency, extractionError, extractionProblemFacts, accumulateDependencies, region, known, diagnosticDependencyNames, extractionDiagnostic, normalizeBinwalkReport, normalizeUnblobReport;
function init_FirmwareReports() {
	return (init_FirmwareReports = __esmMin((() => {
		init_analysisErrorCore();
		init_jsonValue();
		init_digests();
		init_canonicalOrdering();
		init_FirmwareFiles();
		integer = z.int().min(0).max(Number.MAX_SAFE_INTEGER);
		signature = z.object({
			id: z.string().min(1),
			offset: integer,
			size: integer,
			name: z.string(),
			description: z.string(),
			confidence: z.int().min(0).max(255),
			always_display: z.boolean(),
			extraction_declined: z.boolean()
		});
		scan = z.array(z.object({ Analysis: z.object({
			file_path: z.string(),
			file_map: z.array(signature),
			extractions: jsonObjectSchema
		}) }));
		report = jsonObjectSchema.pipe(z.custom((value) => typeof value === "object" && value !== null && "__typename__" in value && typeof value.__typename__ === "string", "Expected report __typename__ string"));
		task = z.object({
			path: z.string(),
			depth: integer,
			blob_id: z.string(),
			is_multi_file: z.boolean()
		});
		extraction = z.array(z.object({
			task,
			reports: z.array(report),
			subtasks: z.array(task)
		}));
		stat$1 = z.object({
			__typename__: z.literal("StatReport"),
			path: z.string(),
			size: integer,
			is_dir: z.boolean(),
			is_file: z.boolean(),
			is_link: z.boolean(),
			link_target: z.string().nullable()
		});
		multiFile = z.object({
			id: z.string(),
			handler_name: z.string(),
			name: z.string(),
			paths: z.array(z.string()),
			extraction_reports: z.array(jsonValueSchema)
		});
		hashes = z.object({ sha256: digestSchema });
		missingDependency = z.object({
			__typename__: z.literal("ExtractorDependencyNotFoundReport"),
			dependencies: z.array(z.string())
		});
		extractionError = z.object({ severity: z.literal("ERROR") });
		extractionProblemFacts = (reports) => {
			const kinds = new Set();
			let dependencies = null;
			for (const item of reports) {
				const parsed = missingDependency.safeParse(item);
				if (parsed.success) {
					kinds.add("missing-extractor-dependency");
					dependencies ??= {
						names: new Set(),
						unnamed: false
					};
					if (parsed.data.dependencies.length === 0) dependencies.unnamed = true;
					for (const name of parsed.data.dependencies) if (name === "") dependencies.unnamed = true;
					else dependencies.names.add(name);
				} else if (extractionError.safeParse(item).success) kinds.add("extractor-failure");
			}
			return {
				failureKinds: [...kinds],
				dependencies
			};
		};
		accumulateDependencies = (owners, key, facts) => {
			if (facts === null) return;
			const known = owners.get(key);
			if (known === undefined) {
				owners.set(key, facts);
				return;
			}
			for (const name of facts.names) known.names.add(name);
			known.unnamed ||= facts.unnamed;
		};
		region = z.object({
			id: z.string(),
			start_offset: integer,
			end_offset: integer,
			size: integer
		});
		known = new Set([
			"StatReport",
			"HashReport",
			"FileMagicReport",
			"RandomnessReport",
			"ChunkReport",
			"UnknownChunkReport",
			"CarveDirectoryReport",
			"MultiFileReport"
		]);
		diagnosticDependencyNames = (value) => {
			const found = new Set();
			const visit = (node) => {
				if (Array.isArray(node)) {
					for (const item of node) visit(item);
					return;
				}
				if (typeof node !== "object" || node === null) return;
				const failure = missingDependency.safeParse(node);
				if (failure.success) {
					for (const dependency of failure.data.dependencies) if (dependency !== "") found.add(dependency);
				}
				for (const child of Object.values(node)) visit(child);
			};
			visit(value);
			return [...found];
		};
		extractionDiagnostic = (inputPath, stage, report) => {
			const dependencies = diagnosticDependencyNames(report);
			return {
				input_path: inputPath,
				...stage === null ? {} : { stage },
				...dependencies.length === 0 ? {} : { missing_dependencies: dependencies },
				report
			};
		};
		normalizeBinwalkReport = (raw, inputPath, size) => {
			const records = scan.parse(raw);
			const analysis = records[0]?.Analysis;
			if (records.length !== 1 || analysis?.file_path !== inputPath || Object.keys(analysis.extractions).length !== 0) throw new AnalysisOutputError("inspect_firmware_regions", "Expected one inspection-only report for the selected immutable input");
			return analysis.file_map.map((hit) => {
				if (hit.offset >= size || hit.size > size - hit.offset) throw new AnalysisOutputError("inspect_firmware_regions", "Reported region lies outside the selected file");
				return {
					provider_id: hit.id,
					offset: hit.offset,
					reported_size: hit.size,
					signature: hit.name,
					description: hit.description,
					reported_confidence: hit.confidence,
					size_basis: "provider_reported_validation_unknown"
				};
			});
		};
		normalizeUnblobReport = (raw, context) => {
			const records = extraction.parse(raw);
			const logical = (path) => firmwareLogicalPath(path, context.inputPath, context.outputRoot);
			const roots = records.filter(({ task: item }) => item.path === context.inputPath && item.depth === 0);
			if (roots.length !== 1) throw new AnalysisOutputError("extract_firmware", "Expected exactly one selected input task");
			const rootHash = roots[0]?.reports.find((r) => r.__typename__ === "HashReport");
			if (rootHash === undefined || hashes.parse(rootHash).sha256 !== context.sha256) throw new AnalysisOutputError("extract_firmware", "Unblob input hash disagrees with selected snapshot");
			const files = new Map();
			const sizes = new Map();
			const depths = [];
			const failedExtractionStages = [];
			const diagnostics = [];
			const blobOrigins = new Map();
			const addBlobOrigin = (parentPath, id, origin) => {
				const key = JSON.stringify([parentPath, id]);
				if (blobOrigins.has(key)) throw new AnalysisOutputError("extract_firmware", `Duplicate blob identity in parent task: ${parentPath} (${id})`);
				blobOrigins.set(key, origin);
			};
			const chunks = [];
			const seen = new Set();
			const taskFailures = new Set();
			const missingDependencies = new Map();
			/** Dependencies reported by one chunk's extraction, keyed with its chunk id. */
			const chunkMissingDependencies = new Map();
			const dependencyRows = (facts) => [...facts.names.size > 0 ? [{ dependencies: uniqueSorted([...facts.names]) }] : [], ...facts.unnamed ? [{ dependencies: [] }] : []];
			for (const record of records) {
				const path = logical(record.task.path);
				if (seen.has(path)) throw new AnalysisOutputError("extract_firmware", `Duplicate analysis task: ${path}`);
				seen.add(path);
				if (record.task.depth >= context.maxDepth) depths.push(path);
				const metadata = record.reports.find((r) => r.__typename__ === "StatReport");
				if (metadata === undefined) throw new AnalysisOutputError("extract_firmware", `Missing StatReport: ${path}`);
				const parsedStat = stat$1.parse(metadata);
				if (parsedStat.path !== record.task.path) throw new AnalysisOutputError("extract_firmware", `StatReport is bound to another task: ${path}`);
				if (path === "$input" && parsedStat.size !== context.length) throw new AnalysisOutputError("extract_firmware", "Unblob input size disagrees with selected snapshot");
				if (path === "$input" && (!parsedStat.is_file || parsedStat.is_link || parsedStat.is_dir)) throw new AnalysisOutputError("extract_firmware", "Selected input was not reported as a regular file");
				sizes.set(path, parsedStat.size);
				const hash = record.reports.find((r) => r.__typename__ === "HashReport");
				const magic = record.reports.find((r) => r.__typename__ === "FileMagicReport");
				if (parsedStat.is_file && !parsedStat.is_link) files.set(path, {
					sha256: hash === undefined ? null : hashes.parse(hash).sha256,
					mimeType: magic === undefined ? null : z.object({ mime_type: z.string() }).parse(magic).mime_type,
					depth: record.task.depth
				});
				for (const item of record.reports) {
					if (!known.has(item.__typename__)) diagnostics.push(jsonValueSchema.parse({
						input_path: path,
						report: item
					}));
					const problem = extractionProblemFacts([item]);
					accumulateDependencies(missingDependencies, path, problem.dependencies);
					if (problem.failureKinds.includes("extractor-failure") && !taskFailures.has(path)) {
						taskFailures.add(path);
						failedExtractionStages.push({
							input_path: path,
							provider_id: null,
							handler: null,
							dependencies: [],
							kind: "extractor-failure"
						});
					}
					if (item.__typename__ === "ChunkReport" || item.__typename__ === "UnknownChunkReport") {
						const parsed = region.parse(item);
						if (parsed.end_offset <= parsed.start_offset || parsed.end_offset > parsedStat.size || parsed.size !== parsed.end_offset - parsed.start_offset) throw new AnalysisOutputError("extract_firmware", `Invalid chunk bounds for ${path}`);
						const detail = item.__typename__ === "ChunkReport" ? z.object({
							handler_name: z.string(),
							is_encrypted: z.boolean(),
							extraction_reports: z.array(jsonValueSchema)
						}).parse(item) : null;
						const problems = extractionProblemFacts(detail?.extraction_reports ?? []);
						if (problems.dependencies !== null) {
							const chunkKey = JSON.stringify([path, parsed.id]);
							const knownChunk = chunkMissingDependencies.get(chunkKey);
							if (knownChunk === undefined) {
								chunkMissingDependencies.set(chunkKey, {
									input_path: path,
									provider_id: parsed.id,
									facts: problems.dependencies
								});
							} else {
								for (const name of problems.dependencies.names) knownChunk.facts.names.add(name);
								knownChunk.facts.unnamed ||= problems.dependencies.unnamed;
							}
						}
						if (detail !== null) for (const problem of detail.extraction_reports) {
							diagnostics.push(extractionDiagnostic(path, detail.handler_name, jsonValueSchema.parse(problem)));
						}
						addBlobOrigin(path, parsed.id, {
							handler: detail?.handler_name ?? null,
							range: {
								offset: parsed.start_offset,
								length: parsed.size
							}
						});
						chunks.push({
							input_path: path,
							provider_id: parsed.id,
							range: {
								offset: parsed.start_offset,
								length: parsed.size
							},
							handler: detail?.handler_name ?? null,
							encrypted: detail?.is_encrypted ?? null,
							extraction_failure_kinds: problems.failureKinds,
							root_file_range: path === "$input" ? {
								offset: context.offset + parsed.start_offset,
								length: parsed.size
							} : null
						});
					}
					if (item.__typename__ === "MultiFileReport") {
						const parsed = multiFile.parse(item);
						addBlobOrigin(path, parsed.id, {
							handler: parsed.handler_name,
							range: null
						});
						if (parsed.extraction_reports.length > 0) {
							diagnostics.push(extractionDiagnostic(path, parsed.handler_name, jsonValueSchema.parse(item)));
							const problems = extractionProblemFacts(parsed.extraction_reports);
							const dependencies = problems.dependencies;
							const rows = [...dependencies === null ? [] : dependencyRows(dependencies).map((row) => ({
								...row,
								kind: "missing-extractor-dependency"
							})), ...problems.failureKinds.includes("extractor-failure") ? [{
								dependencies: [],
								kind: "extractor-failure"
							}] : []];
							for (const row of rows) failedExtractionStages.push({
								input_path: path,
								provider_id: parsed.id,
								handler: parsed.handler_name,
								dependencies: row.dependencies,
								kind: row.kind
							});
						}
					}
				}
			}
			const recordsByPath = new Map(records.map((record) => [record.task.path, record.task]));
			const derivations = records.flatMap((record) => record.subtasks.map((child) => {
				const parentPath = logical(record.task.path);
				const childPath = logical(child.path);
				if (!seen.has(childPath)) throw new AnalysisOutputError("extract_firmware", `Missing child task: ${childPath}`);
				const reportedChild = recordsByPath.get(child.path);
				if (reportedChild?.depth !== child.depth || reportedChild.blob_id !== child.blob_id || reportedChild.is_multi_file !== child.is_multi_file) throw new AnalysisOutputError("extract_firmware", `Child task identity disagrees with its analysis: ${childPath}`);
				const origin = blobOrigins.get(JSON.stringify([parentPath, child.blob_id]));
				return {
					parent_path: parentPath,
					child_path: childPath,
					provider_blob_id: child.blob_id,
					handler: origin?.handler ?? null,
					parent_file_range: origin?.range ?? null
				};
			}));
			const reachable = new Set(["$input"]);
			const pending = ["$input"];
			const childrenByParent = new Map();
			for (const edge of derivations) {
				const children = childrenByParent.get(edge.parent_path) ?? [];
				children.push(edge.child_path);
				childrenByParent.set(edge.parent_path, children);
			}
			while (pending.length > 0) {
				const parent = pending.pop();
				for (const child of childrenByParent.get(parent ?? "") ?? []) {
					if (reachable.has(child)) continue;
					reachable.add(child);
					pending.push(child);
				}
			}
			if (reachable.size !== seen.size) throw new AnalysisOutputError("extract_firmware", "Report contains tasks disconnected from the selected input");
			const unclassifiedRanges = [];
			const chunksByPath = new Map();
			for (const chunk of chunks) {
				const owned = chunksByPath.get(chunk.input_path) ?? [];
				owned.push(chunk);
				chunksByPath.set(chunk.input_path, owned);
			}
			for (const [path, size] of [...sizes].sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)) {
				if (!files.has(path)) continue;
				let coveredEnd = 0;
				const gap = (offset, length) => unclassifiedRanges.push({
					input_path: path,
					range: {
						offset,
						length
					},
					root_file_range: path === "$input" ? {
						offset: context.offset + offset,
						length
					} : null
				});
				for (const chunk of (chunksByPath.get(path) ?? []).sort((left, right) => left.range.offset - right.range.offset)) {
					if (chunk.range.offset > coveredEnd) gap(coveredEnd, chunk.range.offset - coveredEnd);
					coveredEnd = Math.max(coveredEnd, chunk.range.offset + chunk.range.length);
				}
				if (coveredEnd < size) gap(coveredEnd, size - coveredEnd);
			}
			return {
				files,
				sizes,
				chunks,
				unclassified_ranges: unclassifiedRanges,
				derivations,
				depth_limited_paths: depths.sort(),
				failed_extraction_stages: failedExtractionStages.sort((left, right) => `${left.input_path}\u0000${left.provider_id ?? ""}` < `${right.input_path}\u0000${right.provider_id ?? ""}` ? -1 : `${left.input_path}\u0000${left.provider_id ?? ""}` > `${right.input_path}\u0000${right.provider_id ?? ""}` ? 1 : 0),
				diagnostics,
				missing_dependencies: [...missingDependencies.entries()].flatMap(([input_path, facts]) => dependencyRows(facts).map(({ dependencies }) => ({
					input_path,
					dependencies
				}))).sort((left, right) => left.input_path < right.input_path ? -1 : left.input_path > right.input_path ? 1 : 0),
				chunk_missing_dependencies: [...chunkMissingDependencies.values()].flatMap(({ input_path, provider_id, facts }) => dependencyRows(facts).map(({ dependencies }) => ({
					input_path,
					provider_id,
					dependencies
				}))).sort((left, right) => `${left.input_path}\u0000${left.provider_id}` < `${right.input_path}\u0000${right.provider_id}` ? -1 : `${left.input_path}\u0000${left.provider_id}` > `${right.input_path}\u0000${right.provider_id}` ? 1 : 0),
				coverage: unclassifiedRanges.length > 0 || depths.length > 0 || diagnostics.length > 0 || chunks.some((c) => c.handler === null || c.encrypted === true) ? "partial" : "complete"
			};
		};
	})))();
}

//#endregion
//#region dist/firmware/FirmwareProvider.js
var bindWorkspaceFailure, combineCleanupFailures, waitForPredecessor, limitations, UNBLOB_LINK_TARGET_LIMITATION, publishedSymlinks, FirmwareProvider, finishFirmwareWorkspace, completedFirmwareObservation;
function init_FirmwareProvider() {
	return (init_FirmwareProvider = __esmMin((() => {
		init_firmwareToolRequirements();
		init_HostPlatform();
		init_snapshotEnvironment();
		init_ArtifactCommandPath();
		init_AnalysisProvider();
		init_firmwareAnalysis();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_analysisErrorCore();
		init_classifyProviderFailure();
		init_providerAdapterError();
		init_providerCleanupError();
		init_jsonValue();
		init_result();
		init_PrivateRuntimeRoot();
		init_resources();
		init_FirmwarePublication();
		init_FirmwareProviderIdentities();
		init_FirmwareDeadline();
		init_FirmwareVersion();
		init_FirmwareCommand();
		init_FirmwareFiles();
		init_FirmwareReports();
		init_FirmwareFailures();
		init_errorMessage();
		bindWorkspaceFailure = (pending, failure) => {
			pending.rootLease.bindCleanupError(failure);
			return failure;
		};
		combineCleanupFailures = (failures) => {
			if (failures.length < 2) return failures[0];
			return providerCleanupErrorFromFailures("firmware", failures, {
				reason: "Multiple owned firmware resources could not be cleaned",
				failures: failures.map((failure) => ({
					engine: failure instanceof ProviderAdapterError ? failure.providerId : "firmware",
					operation: failure instanceof ProviderAdapterError ? failure.operation : "close_firmware",
					resources: [...failure.cleanupResources],
					reason: failure.diagnostics?.reason ?? failure.message
				}))
			}, { operation: "close_firmware" });
		};
		waitForPredecessor = (predecessor, operation, signal) => {
			if (signal === undefined) return predecessor.then(() => ok(undefined));
			return new Promise((resolve) => {
				const abort = () => resolve(err(cancelledBy(operation, signal)));
				signal.addEventListener("abort", abort, { once: true });
				if (signal.aborted) abort();
				void predecessor.then(() => {
					signal.removeEventListener("abort", abort);
					resolve(ok(undefined));
				});
			});
		};
		limitations = [
			"Signature matches and reported sizes do not establish partition validity, encryption or runtime mappings. Binwalk may infer unknown lengths before emitting its report.",
			"Only Linux is supported by this integration. One worker, inherited per-process address-space/file-size/CPU limits and a deadline constrain execution; staging byte and entry budgets are polled and may transiently overshoot. Limits are not aggregate process-memory or filesystem quotas.",
			"Unblob's default sandbox and skip rules remain enabled. Missing external extractors, unknown chunks, encrypted chunks and depth limits yield partial coverage. Extracted code is never executed; only regular files are published, without executable permission bits.",
			"extraction_gaps lists regions that were carved or left unextracted and names extractor dependencies the producer reported as missing. A listed gap does not mean the target is corrupt or that a retained region is empty.",
			"The actual launcher executable is hashed. Interpreter, shared libraries and installed Python package dependencies are not independently attested; source revision remains unknown for caller-supplied builds."
		];
		UNBLOB_LINK_TARGET_LIMITATION = "Symlink link_target values are read from Unblob's extracted tree, not from the firmware's filesystem metadata. Unblob rewrites absolute targets relative to the extraction root, so a relative link_target may have been stored as an absolute path in the image.";
		publishedSymlinks = (result) => {
			const parsed = firmwareResultSchemas.extract_firmware.safeParse(result);
			return parsed.success && parsed.data.unpublished_entries.some((entry) => entry.kind === "symlink");
		};
		FirmwareProvider = class {
			environment;
			launcher;
			host;
			#tail = Promise.resolve();
			#closed = false;
			#closing;
			#files = new FirmwareFileAccess();
			#pendingCleanup = new Map();
			constructor(environment = process.env, launcher, host = HOST_PLATFORM) {
				this.environment = environment;
				this.launcher = launcher;
				this.host = host;
			}
			/** Inspect regions or explicitly extract selected bytes without changing the source. */
			async execute(request, options) {
				if (this.#closed) return err(cancelledBy(request.operation, OwnerCancellation.ownerClosed));
				const predecessor = this.#tail;
				let release = () => {};
				this.#tail = new Promise((resolve) => {
					release = resolve;
				});
				const waited = await waitForPredecessor(predecessor, request.operation, options?.signal);
				if (!waited.ok) {
					void predecessor.then(release);
					return err(waited.error);
				}
				try {
					if (this.#closed) return err(cancelledBy(request.operation, OwnerCancellation.ownerClosed));
					const cleanup = await this.#retryCleanup();
					if (cleanup.executionBlocked && cleanup.failure !== undefined) return err(cleanup.failure);
					return await this.#execute(request, options);
				} finally {
					release();
				}
			}
			/** Retry every retained owner, reporting failures without discarding other roots. */
			close() {
				this.#closed = true;
				return this.#closing ??= this.#close().finally(() => {
					this.#closing = undefined;
				});
			}
			async #close() {
				await this.#tail;
				const failures = [];
				try {
					await this.#files.close();
				} catch (cause) {
					failures.push(classifyProviderFailure(cause, firmwareFailureDialect({
						engine: "firmware",
						operation: "close_firmware"
					})));
				}
				const workspace = await this.#retryWorkspaceCleanup();
				if (workspace.failure !== undefined) failures.push(workspace.failure);
				const failure = combineCleanupFailures(failures);
				if (failure !== undefined) throw failure;
			}
			async #retryCleanup() {
				let fileFailure;
				try {
					await this.#files.retryCleanup();
				} catch (cause) {
					fileFailure = classifyProviderFailure(cause, firmwareFailureDialect({
						engine: "firmware",
						operation: "close_firmware"
					}));
				}
				const workspace = await this.#retryWorkspaceCleanup();
				return {
					failure: combineCleanupFailures([...fileFailure === undefined ? [] : [fileFailure], ...workspace.failure === undefined ? [] : [workspace.failure]]),
					executionBlocked: fileFailure !== undefined || workspace.executionBlocked
				};
			}
			async #retryWorkspaceCleanup() {
				const failures = [];
				let executionBlocked = false;
				for (const [path, pending] of this.#pendingCleanup) {
					try {
						const stopped = await pending.supervisor?.stop();
						if (stopped?.status === "incomplete") {
							executionBlocked = true;
							failures.push(bindWorkspaceFailure(pending, new ProviderCleanupError(pending.engine, [path], { reason: stopped.reason }, { operation: pending.operation })));
							continue;
						}
						delete pending.supervisor;
					} catch (cause) {
						executionBlocked = true;
						failures.push(bindWorkspaceFailure(pending, new ProviderCleanupError(pending.engine, [path], { reason: errorMessage(cause) }, {
							operation: pending.operation,
							cause
						})));
						continue;
					}
					try {
						if (pending.tree !== undefined) {
							await pending.tree.lease.release();
							delete pending.tree;
						}
					} catch (cause) {
						failures.push(bindWorkspaceFailure(pending, new ProviderCleanupError(pending.engine, [path, pending.tree?.tree.outputRoot ?? path], { reason: errorMessage(cause) }, {
							operation: pending.operation,
							cause
						})));
					}
					if (pending.tree !== undefined) continue;
					try {
						await pending.rootLease.release();
						this.#pendingCleanup.delete(path);
					} catch (cause) {
						failures.push(bindWorkspaceFailure(pending, new ProviderCleanupError(pending.engine, [path], { reason: errorMessage(cause) }, {
							operation: pending.operation,
							cause
						})));
					}
				}
				return {
					failure: combineCleanupFailures(failures),
					executionBlocked
				};
			}
			async #execute(request, options) {
				const environment = snapshotEnvironment(this.environment, this.host.platform);
				let root;
				let rootLease;
				const engineName = FIRMWARE_OPERATION_ENGINES[request.operation];
				const withCaller = (phase) => options?.signal === undefined ? phase.signal : AbortSignal.any([options.signal, phase.signal]);
				const analysisTimeoutMs = request.input.analysis_timeout_ms ?? 12e4;
				let deadline = startFirmwareDeadline("analysis", analysisTimeoutMs);
				let signal = withCaller(deadline);
				let outcome;
				try {
					if (isAborted(signal)) throw firmwareSignalInterruption(request.operation, signal, deadline);
					if (request.operation === "extract_firmware") await SafeOutputTree.checkDestination(request.input.output_directory).catch((cause) => {
						throw outputDirectoryAdmissionRefusal(request.operation, "output_directory", cause);
					});
					const command = await resolveFirmwareCommand(environment, engineName, request.operation, this.#files, this.host.platform, signal);
					root = await PrivateRuntimeRoot.create({ prefix: "rea-firmware-" });
					const ownedRoot = root;
					const ownedRootLease = new AnalysisCleanupLease(() => ownedRoot.close());
					rootLease = ownedRootLease;
					const target = await this.#files.snapshot(request, root.path, signal);
					const run = async (args, outputBudget) => {
						for (const selected of [command.command, command.limiter]) await assertArtifactCommandPath(selected, request.operation, { signal });
						const output = await runFirmwareCommand({
							engine: engineName,
							operation: request.operation,
							fileSizeCeiling: command.fileSizeCeiling,
							command: command.command.invocationPath,
							limiter: command.limiter.invocationPath,
							args,
							cwd: root?.path ?? "",
							environment,
							signal,
							deadline,
							resources: this.#files.resources,
							retainCleanup: (supervisor) => {
								this.#pendingCleanup.set(ownedRoot.path, {
									supervisor,
									root: ownedRoot,
									rootLease: ownedRootLease,
									engine: engineName,
									operation: request.operation
								});
							},
							...this.launcher === undefined ? {} : { launcher: this.launcher },
							...outputBudget === undefined ? {} : {
								outputBudget,
								acceptReportedExtractionFailure: true
							}
						});
						for (const selected of [command.command, command.limiter]) await assertArtifactCommandPath(selected, request.operation, { capturedOutput: firmwareExecutionOutput(output) });
						return output;
					};
					const versionRun = await run(["--version"]);
					const version = versionRun.stdout.text.trim();
					if (versionRun.stdout.bytes > 1024) throw firmwareToolUnavailable(engineName, request.operation, `Tool version banner is ${String(versionRun.stdout.bytes)} bytes; expected a short ${engineName} version line.`);
					const admitted = admitFirmwareVersion(engineName, version);
					if (admitted.status === "unsupported" || admitted.status === "unresolved") throw firmwareToolUnavailable(engineName, request.operation, admitted.message);
					const engine = {
						name: engineName,
						version: admitted.version,
						executable_path: command.command.resolvedPath,
						executable_sha256: command.sha256,
						source_revision: null,
						worker_count: 1
					};
					const reportPath = join(root.path, "report.json");
					let result;
					let raw;
					if (request.operation === "inspect_firmware_regions") {
						const processRun = await run([
							"--quiet",
							"--search-all",
							"--threads",
							"1",
							"--log",
							reportPath,
							target.inputPath
						]);
						const report = await readFirmwareCommandReport({
							path: reportPath,
							engine: engineName,
							operation: request.operation,
							execution: processRun,
							files: this.#files,
							signal,
							deadline
						});
						result = firmwareResultSchemas.inspect_firmware_regions.parse({
							analysis_timeout_ms: analysisTimeoutMs,
							engine,
							input_size: target.size,
							regions: normalizeBinwalkReport(report, target.inputPath, target.size),
							coverage: "signature_scan"
						});
						raw = {
							report,
							execution: processRun,
							version_execution: versionRun
						};
					} else {
						const outputRoot = join(root.path, "extracted");
						const processRun = await run([
							"--process-num",
							"1",
							"--depth",
							String(request.input.max_depth),
							"--randomness-depth",
							"0",
							"--report",
							reportPath,
							"--log",
							join(root.path, "unblob.log"),
							"--extract-dir",
							outputRoot,
							target.inputPath
						], {
							root: outputRoot,
							bytes: request.input.max_output_bytes,
							entries: request.input.max_output_files
						});
						const report = await readFirmwareCommandReport({
							path: reportPath,
							engine: engineName,
							operation: request.operation,
							execution: processRun,
							files: this.#files,
							signal,
							deadline
						});
						const normalized = normalizeUnblobReport(report, {
							inputPath: target.inputPath,
							outputRoot,
							...target.selection,
							maxDepth: request.input.max_depth
						});
						if (processRun.exit_code === 1 && normalized.diagnostics.length === 0) throw new AnalysisOutputError(request.operation, "Unblob failed without a reported extraction diagnostic");
						const entries = await inventoryFirmwareOutput(outputRoot, request.input.max_output_bytes, request.input.max_output_files, firmwareFileSizeLimit(command.fileSizeCeiling, request.input.max_output_bytes), request.operation, signal, deadline);
						const interruption = firmwarePhaseInterruption(request.operation, signal, deadline);
						if (interruption !== undefined) throw interruption;
						deadline = startFirmwareDeadline("publication", request.input.publication_timeout_ms);
						signal = withCaller(deadline);
						result = await publishFirmwareExtraction({
							analysisTimeoutMs,
							files: this.#files,
							workspacePath: root.path,
							deadline,
							outputDirectory: request.input.output_directory,
							entries,
							normalized,
							selection: target.selection,
							maxDepth: request.input.max_depth,
							engine,
							signal,
							retainCleanup: (tree, lease, failure) => {
								ownedRootLease.bindCleanupError(failure);
								const pending = this.#pendingCleanup.get(ownedRoot.path) ?? {
									root: ownedRoot,
									rootLease: ownedRootLease,
									engine: engineName,
									operation: request.operation
								};
								pending.tree = {
									tree,
									lease
								};
								this.#pendingCleanup.set(ownedRoot.path, pending);
							}
						});
						raw = {
							report,
							execution: processRun,
							version_execution: versionRun
						};
					}
					const catalog = engineName === "binwalk" ? BINWALK_PROVIDER_IDENTITY : UNBLOB_PROVIDER_IDENTITY;
					outcome = ok(createAnalysisExecution(result, {
						...catalog,
						version: admitted.version
					}, {
						subject: target.subject,
						rawResult: raw,
						limitations: [
							...limitations,
							...engineName === "unblob" && publishedSymlinks(result) ? [UNBLOB_LINK_TARGET_LIMITATION] : [],
							...admitted.status === "compatible" ? [admitted.limitation] : []
						],
						locations: [{
							kind: "file-offset-range",
							start: target.selection.offset,
							end: target.selection.offset + target.selection.length
						}]
					}));
				} catch (cause) {
					outcome = err(classifyProviderFailure(cause, firmwareFailureDialect({
						engine: engineName,
						operation: request.operation,
						phase: {
							signal,
							deadline
						}
					})));
				}
				const finished = await finishFirmwareWorkspace(root, outcome, engineName, request, rootLease, signal, deadline);
				if (!finished.ok && finished.error.cleanupIncomplete && root !== undefined && rootLease !== undefined && finished.error.cleanupResources.includes(root.path) && !this.#pendingCleanup.has(root.path)) this.#pendingCleanup.set(root.path, {
					root,
					rootLease,
					engine: engineName,
					operation: request.operation
				});
				if (!finished.ok && root !== undefined && rootLease !== undefined && finished.error.cleanupResources.includes(root.path)) rootLease.bindCleanupError(finished.error);
				if (finished.ok) {
					const interruption = firmwarePhaseInterruption(request.operation, signal, deadline);
					if (interruption !== undefined) return err(interruption.retainPartialObservation(completedFirmwareObservation(finished.value)));
				}
				return finished;
			}
		};
		finishFirmwareWorkspace = async (root, outcome, engineName, request, rootLease, signal, deadline) => {
			if (!outcome.ok && outcome.error.cleanupIncomplete && (root === undefined || outcome.error.cleanupResources.includes(root.path))) return outcome;
			try {
				await rootLease?.release();
			} catch (cause) {
				const cleanup = new ProviderCleanupError(engineName, [root?.path ?? "unknown", ...outcome.ok && request.operation === "extract_firmware" ? [request.input.output_directory] : []], { reason: errorMessage(cause) }, {
					cause,
					operation: request.operation,
					...outcome.ok ? { partialObservation: completedFirmwareObservation(outcome.value) } : outcome.error.partialObservation === undefined ? {} : { partialObservation: outcome.error.partialObservation }
				});
				rootLease?.bindCleanupError(cleanup);
				const primary = outcome.ok ? firmwarePhaseInterruption(request.operation, signal, deadline) : undefined;
				if (outcome.ok && primary !== undefined) {
					primary.retainPartialObservation(completedFirmwareObservation(outcome.value));
					return err(analysisErrorWithCleanupDependencies(primary, cleanup, request.operation));
				}
				return err(outcome.ok ? cleanup : analysisErrorWithCleanupDependencies(outcome.error, cleanup, request.operation));
			}
			return outcome;
		};
		completedFirmwareObservation = (execution) => ({
			kind: "firmware",
			result: execution.result,
			provenance: jsonValueSchema.parse({
				raw_result: execution.rawResult,
				provider: execution.provider,
				subject: execution.subject,
				locations: execution.locations,
				limitations: execution.limitations,
				...execution.analysisProfile === undefined ? {} : { analysis_profile: execution.analysisProfile }
			})
		});
	})))();
}

//#endregion
//#region dist/composition/firmware.js
var createFirmwareAnalysisProvider;
function init_firmware() {
	return (init_firmware = __esmMin((() => {
		init_FirmwareProvider();
		init_HostPlatform();
		createFirmwareAnalysisProvider = (environment = process.env, launcher, host = HOST_PLATFORM) => new FirmwareProvider(environment, launcher, host);
	})))();
}

//#endregion
//#region dist/cli/firmwareCommands.js
var firmwareCommands_exports = /* @__PURE__ */ __exportAll({ registerFirmwareCommands: () => registerFirmwareCommands });
var FIRMWARE_PATH_HELP, registerFirmwareCommands;
function init_firmwareCommands() {
	return (init_firmwareCommands = __esmMin((() => {
		init_FirmwareAnalysisService();
		init_firmware();
		init_firmwareToolContracts();
		init_firmwareToolRequirements();
		init_contractCliDescription();
		init_contractCommand();
		FIRMWARE_PATH_HELP = "Local firmware path; never executed";
		registerFirmwareCommands = (cli, logger, environment) => {
			const service = new FirmwareAnalysisService(createFirmwareAnalysisProvider(environment));
			const run = (operation) => inspectWithService(() => ({
				inspect: (input, options) => service.execute(operation, input, options),
				close: () => service.close()
			}), FIRMWARE_OPERATION_ENGINES[operation]);
			registerContractCommand(cli, logger, contractNamed(FIRMWARE_TOOL_CONTRACTS, "inspect_firmware_regions"), {
				description: "Inspect firmware signature candidates without extracting them",
				positionals: ["path"],
				callerPaths: ["path"],
				fields: { path: { description: FIRMWARE_PATH_HELP } }
			}, run("inspect_firmware_regions"));
			registerContractCommand(cli, logger, contractNamed(FIRMWARE_TOOL_CONTRACTS, "extract_firmware"), {
				description: "Extract selected firmware bytes and return verified files and provenance",
				positionals: ["path", "output_directory"],
				callerPaths: ["path", "output_directory"],
				flatten: { range: {
					offset: { description: "Selected byte offset; requires length" },
					length: { description: "Selected byte length; requires offset" }
				} },
				fields: {
					path: { description: FIRMWARE_PATH_HELP },
					output_directory: { description: "Absent output directory; parent must exist" }
				}
			}, run("extract_firmware"));
		};
	})))();
}

//#endregion
export { firmwareCommands_exports, init_firmwareCommands };