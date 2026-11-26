import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, FIXED_ALLOWANCE_KINDS, analysisSettingLimit, cancelledBy, carriedReason, errorMessage, fixedCeilingConstraint, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_analysisSettingDefinitions, init_errorMessage, init_explicitSensitiveValues, init_fixedAllowanceRemediation, init_jsonValue, init_runtimeVersion, init_sha256Hex, javaScriptRuntime, jsonObjectSchema, redactExplicitText, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_parseFailureAnalysisError, init_safeJson, init_strictUtf8, isParseLimit, parseLimitConstraint, safeParseUtf8Json, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, artifactFileCancellationCause, artifactFilePrimaryFacts, artifactSelectedPathErrno, bindArtifactFileCleanup, completedStableArtifact, completedStableArtifactObservation, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_StableArtifactObservation, init_readStableArtifact, init_resources, readStableArtifact, readerIntegrityFailure, stableArtifactInputRecovery } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { DEFAULT_CAPTURE_DECODER_HEAP, captureDecoderHeapContinuingRecovery, captureDecoderHeapRecovery, init_captureDecoderHeap, init_runtimeAnalysisSettings, resolveCaptureDecoderHeap, runtimeCaptureDecoderHeap } from "./runtimeAnalysisSettings-CJ3kVGDD.js";
import { Budget, init_budget, init_jsonPointer, unescapeJsonPointerToken } from "./jsonPointer-aolC6MvJ.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { createAnalysisProfile, createEvidence, init_analysisProfile, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_explicitSensitiveFailure, redactExplicitFailure } from "./explicitSensitiveFailure-C747xsnc.js";
import { WEB_NETWORK_CAPTURE_LIMITS, captureSensitiveValues, init_webNetworkCapture, inspectWebNetworkCaptureInputSchema, selectedWebNetworkCaptureBudgets, selectedWebNetworkCaptureTimeoutMs, webNetworkCaptureBudgetFacts, webNetworkCaptureBudgetRecovery, webNetworkCapturePayloadSchema, webNetworkCaptureSchema, webNetworkCaptureTimeoutRecovery } from "./webNetworkCapture-DzOKad85.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { init_RuntimeExhaustion, runtimeExhaustionReport } from "./ProviderProcess-OkgijDXB.js";
import { OwnedCommandFailure, init_OwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_OwnedCommandCleanup, processInspectionFailure, retainProcessInspectionCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { init_ProviderOutcome, providerOutcomeOf } from "./ProviderOutcome-iJMiaLYK.js";
import { ULEB64, init_leb128, readLeb128 } from "./leb128-QVew1RrX.js";
import { init_JavaScriptWorkerMemoryLimit, javaScriptWorkerMemoryLimitBytes } from "./JavaScriptWorkerMemoryLimit-DlffZ_vK.js";
import { CAPTURE_FORMAT, CAPTURE_LIMITS, CaptureFormatError, CaptureRedaction, HAR_CAPTURE_PROVIDER_IDENTITY, MITMPROXY_CAPTURE_PROVIDER_IDENTITY, QLOG_CAPTURE_PROVIDER_IDENTITY, SAZ_CAPTURE_PROVIDER_IDENTITY, captureBudgets, captureLimitForReply, capturePointer, init_CaptureBudgets, init_CaptureFormatError, init_CaptureProviderIdentities, init_CaptureRedaction, isCaptureCredentialHeaderBytes, withCaptureBudgets } from "./CaptureProviderIdentities-ELDLheGD.js";
import { constants } from "node:fs";
import { isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { access, stat, writeFile } from "node:fs/promises";
import { setImmediate } from "node:timers/promises";

//#region dist/domain/webNetworkCaptureCoordinates.js
var excludeCaptureCoordinates;
function init_webNetworkCaptureCoordinates() {
	return (init_webNetworkCaptureCoordinates = __esmMin((() => {
		init_explicitSensitiveValues();
		excludeCaptureCoordinates = (value, sensitiveValues) => {
			if (sensitiveValues.length === 0) return value;
			let excluded = false;
			const sensitive = (pointer) => sensitiveValues.some((literal) => pointer.includes(literal));
			const sidecars = (items) => items.filter((item) => {
				if (!sensitive(item.pointer)) return true;
				excluded = true;
				return false;
			});
			const records = value.records.map((record) => {
				const location = record.location.kind === "json-pointer" && sensitive(record.location.pointer) || record.location.kind === "archive-members" && record.location.members.some(sensitive) || record.location.kind === "byte-range" && (sensitive(String(record.location.offset)) || sensitive(String(record.location.bytes))) ? {
					kind: "unknown",
					reason: "explicit-sensitive-value"
				} : record.location;
				if (location !== record.location) excluded = true;
				return {
					...record,
					location,
					binary_fields: sidecars(record.binary_fields),
					numeric_literals: sidecars(record.numeric_literals),
					redactions: sidecars(record.redactions)
				};
			});
			const recordsPointer = value.container.records_pointer;
			const records_pointer = recordsPointer !== null && sensitive(recordsPointer) ? null : recordsPointer;
			if (records_pointer !== recordsPointer) excluded = true;
			const container = {
				...value.container,
				records_pointer,
				numeric_literals: sidecars(value.container.numeric_literals),
				redactions: sidecars(value.container.redactions)
			};
			const qlog = value.format === "qlog" ? {
				...value.qlog,
				traces: value.qlog.traces.map((trace) => {
					if (trace.location.kind !== "json-pointer" || !sensitive(trace.location.pointer)) return trace;
					excluded = true;
					return {
						...trace,
						location: {
							kind: "unknown",
							reason: "explicit-sensitive-value"
						}
					};
				})
			} : undefined;
			return {
				...value,
				...qlog === undefined ? {} : { qlog },
				container,
				records,
				limitations: excluded ? [...value.limitations, redactExplicitText("Marked source coordinates and their sidecars are excluded; affected record locations remain unknown.", sensitiveValues)] : value.limitations
			};
		};
	})))();
}

//#endregion
//#region dist/application/WebNetworkCaptureService.js
var OPERATION$3, WebNetworkCaptureService, isCapturePartialCandidate;
function init_WebNetworkCaptureService() {
	return (init_WebNetworkCaptureService = __esmMin((() => {
		init_targetIdentity();
		init_explicitSensitiveFailure();
		init_webNetworkCaptureCoordinates();
		init_explicitSensitiveValues();
		init_analysisErrorCore();
		init_analysisProfile();
		init_evidence();
		init_inputIssueProjection();
		init_jsonValue();
		init_result();
		init_webNetworkCapture();
		init_ProviderOperationExecution();
		init_analysisErrorCleanup();
		OPERATION$3 = "inspect_web_network_capture";
		WebNetworkCaptureService = class {
			port;
			constructor(port) {
				this.port = port;
			}
			/** Release resources retained by the selected capture adapter. */
			close() {
				return this.port.close?.() ?? Promise.resolve();
			}
			/** Return selected complete records inline, without inventing live browser attribution. */
			async inspect(rawInput, options) {
				if (options?.signal?.aborted) return err(cancelledBy(OPERATION$3, options.signal));
				const failure = (error) => err(redactExplicitFailure(error, captureSensitiveValues(rawInput)));
				const parsed = inspectWebNetworkCaptureInputSchema.safeParse(rawInput);
				if (!parsed.success) return failure(analysisInputErrorFromIssues(OPERATION$3, parsed.error.issues, rawInput, { cause: parsed.error }));
				const input = parsed.data;
				if (input.record_ordinals !== undefined && new Set(input.record_ordinals).size !== input.record_ordinals.length) return failure(new AnalysisInputError(OPERATION$3, undefined, [{
					path: ["record_ordinals"],
					reason: "invalid_format",
					message: "Each requested producer ordinal must occur once."
				}]));
				if (input.protobuf !== undefined && input.record_ordinals === undefined) return failure(new AnalysisInputError(OPERATION$3, undefined, [{
					path: ["record_ordinals"],
					reason: "invalid_format",
					message: "Protobuf options require explicit producer record ordinals."
				}]));
				const loaded = await this.port.inspect(input, options);
				if (!loaded.ok) {
					const partial = webNetworkCaptureSchema.safeParse(loaded.error.partialObservation);
					let partialFailure;
					if (partial.success) {
						const projected = this.#projectCapture(input, partial.data);
						if (projected.ok) loaded.error.partialObservation = projected.value;
						else partialFailure = projected.error;
					} else if (isCapturePartialCandidate(loaded.error.partialObservation)) {
						partialFailure = new AnalysisOutputError(OPERATION$3, "Capture adapter retained malformed historical evidence.", { cause: partial.error });
					}
					if (partialFailure !== undefined) {
						const rejected = loaded.error.partialObservation;
						for (let owner = loaded.error; owner !== undefined; owner = owner.cleanupPrimary) {
							if (owner.partialObservation === rejected) owner.partialObservation = undefined;
						}
						partialFailure.retainSecondaryFailure(loaded.error);
						return failure(loaded.error.cleanupIncomplete ? analysisErrorWithCleanupDependencies(partialFailure, loaded.error, OPERATION$3) : partialFailure);
					}
					return failure(loaded.error);
				}
				const report = webNetworkCaptureSchema.safeParse(loaded.value);
				if (!report.success) return failure(new AnalysisOutputError(OPERATION$3, "Capture adapter returned malformed historical evidence."));
				const projected = this.#projectCapture(input, report.data);
				if (!projected.ok) return failure(projected.error);
				return completeProviderEvidence(projected.value, options?.signal);
			}
			#projectCapture(input, value) {
				const artifactSha256 = value.artifact.sha256;
				if (artifactSha256 === null) return err(new AnalysisOutputError(OPERATION$3, "Capture adapter omitted its observed artifact digest before explicit projection."));
				if (value.artifact.path !== input.capture_path || value.format !== input.format || value.total_records !== value.records.length || value.records.some((record, index) => record.ordinal !== index)) return err(new AnalysisOutputError(OPERATION$3, "Capture adapter changed the selected artifact, format or original record sequence."));
				const safeValue = excludeCaptureCoordinates(value, input.sensitive_values);
				const redactText = (text) => redactExplicitText(text, input.sensitive_values);
				const isSensitive = (text) => input.sensitive_values.some((literal) => text.includes(literal));
				const selected = input.record_ordinals ?? value.records.map(({ ordinal }) => ordinal);
				const records = [];
				for (const [index, ordinal] of selected.entries()) {
					const record = safeValue.records[ordinal];
					if (record === undefined) return err(new AnalysisInputError(OPERATION$3, undefined, [value.total_records === 0 ? {
						path: ["record_ordinals", index],
						reason: "invalid_value",
						message: "The selected capture contains no records."
					} : {
						path: ["record_ordinals", index],
						reason: "out_of_range",
						minimum: 0,
						maximum: value.total_records - 1,
						message: `Producer ordinal ${ordinal} is outside the retained capture (${value.total_records} records).`
					}]));
					records.push({
						...record,
						limitations: record.limitations.map(redactText)
					});
				}
				const safePath = isSensitive(input.capture_path) ? "" : input.capture_path;
				const safeSha256 = isSensitive(artifactSha256) ? null : artifactSha256;
				const subjectUnavailableReason = redactText("The explicitly sensitive artifact digest is excluded; its cryptographic identity is unknown in this Evidence.");
				const limitations = [...safeValue.limitations, ...safePath === "" ? ["The explicitly sensitive artifact path is excluded; its size remains available."] : []].map(redactText);
				const parameters = jsonObjectSchema.parse({
					capture_path: safePath,
					...isSensitive(input.format) ? {} : { format: input.format },
					record_ordinals: selected,
					...input.protobuf === undefined ? {} : { protobuf: {
						framing: input.protobuf.framing,
						...input.protobuf.body_pointers === undefined ? {} : { body_pointers: input.protobuf.body_pointers.map(redactText) },
						...input.protobuf.schema === undefined ? {} : { schema: {
							descriptor_set_path: redactText(input.protobuf.schema.descriptor_set_path),
							message_type: redactText(input.protobuf.schema.message_type)
						} }
					} },
					sensitive_value_count: input.sensitive_values.length,
					...input.max_input_bytes === undefined ? {} : { max_input_bytes: input.max_input_bytes },
					...input.max_reply_bytes === undefined ? {} : { max_reply_bytes: input.max_reply_bytes },
					...input.max_nesting_depth === undefined ? {} : { max_nesting_depth: input.max_nesting_depth },
					...input.capture_timeout_ms === undefined ? {} : { capture_timeout_ms: input.capture_timeout_ms }
				});
				const evidence = createEvidence(safeSha256 === null ? unknownTarget("not-observed") : {
					path: safePath,
					sha256: safeSha256,
					format: "file"
				}, value.decoder, {
					operation: OPERATION$3,
					parameters,
					result: {
						...safeValue,
						artifact: {
							...value.artifact,
							path: safePath,
							sha256: safeSha256
						},
						records,
						limitations: safeSha256 === null ? [...limitations, subjectUnavailableReason] : limitations
					},
					...safeValue.format !== "qlog" ? {} : { analysisProfile: createAnalysisProfile(value.decoder, {
						qlog_profile: safeValue.qlog.profile,
						clock: safeValue.qlog.clock,
						scope: safeValue.qlog.scope
					}) },
					confidence: "observed",
					authority: "historical-reference",
					limitations: safeSha256 === null ? [subjectUnavailableReason, ...limitations] : limitations,
					locations: safePath === "" ? [] : [{
						kind: "artifact-path",
						path: safePath
					}]
				});
				return ok(evidence);
			}
		};
		isCapturePartialCandidate = (value) => {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
			const candidate = value;
			return "artifact" in candidate && [
				"format",
				"records",
				"decoder"
			].some((field) => field in candidate);
		};
	})))();
}

//#endregion
//#region dist/browser/history/CaptureRelease.js
var NODE_CAPTURE_HEAP_ENFORCED;
function init_CaptureRelease() {
	return (init_CaptureRelease = __esmMin((() => {
		init_runtimeVersion();
		NODE_CAPTURE_HEAP_ENFORCED = javaScriptRuntime(process.versions).id === "node";
	})))();
}

//#endregion
//#region dist/browser/history/CaptureFailures.js
var OPERATION$2, protobufCaptureFailure, CAPTURE_PROCESS_MEMORY_LIMIT_REASON, historicalCaptureFailure, captureMemoryFailure, withCaptureReaderCleanup;
function init_CaptureFailures() {
	return (init_CaptureFailures = __esmMin((() => {
		init_capturedProviderOutput();
		init_JavaScriptWorkerMemoryLimit();
		init_SignalAbort();
		init_CaptureBudgets();
		init_analysisSettingDefinitions();
		init_resources();
		init_analysisErrorCleanup();
		init_analysisErrorBase();
		init_parseFailureAnalysisError();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_providerCleanupError();
		init_webNetworkCapture();
		init_captureDecoderHeap();
		init_OwnedCommand();
		init_ProviderOutcome();
		init_RuntimeExhaustion();
		init_CaptureRelease();
		init_analysisResourceLimits();
		init_CaptureFormatError();
		init_errorMessage();
		OPERATION$2 = "inspect_web_network_capture";
		protobufCaptureFailure = (input, cause) => {
			const { limit } = cause;
			if (limit === undefined || !isParseLimit(cause, "web-network-capture")) return new AnalysisInputError(OPERATION$2, { cause }, [{
				path: ["protobuf"],
				reason: "invalid_format",
				message: cause.message
			}]);
			const { parameter, expected } = CAPTURE_LIMITS[limit.name];
			return parseLimitConstraint(OPERATION$2, "capacity", cause, {
				legacyMaximumKey: expected,
				retryable: false,
				...parameter === null ? {} : { remediationAction: webNetworkCaptureBudgetRecovery(input, parameter, limit.maximum) }
			});
		};
		CAPTURE_PROCESS_MEMORY_LIMIT_REASON = "The capture decoder reached its Windows Job Object memory limit";
		historicalCaptureFailure = (input, rawCause, phase, options, heap = DEFAULT_CAPTURE_DECODER_HEAP, cleanupLease) => {
			const { cause, origin } = artifactFilePrimaryFacts(rawCause);
			if (origin === "owned-or-classified" && cause instanceof AnalysisError) return cause;
			const descriptorRead = phase === "descriptor-read";
			const sourcePath = descriptorRead ? input.protobuf?.schema?.descriptor_set_path ?? input.capture_path : input.capture_path;
			const inputPath = descriptorRead ? [
				"protobuf",
				"schema",
				"descriptor_set_path"
			] : ["capture_path"];
			const sourceLabel = descriptorRead ? "descriptor set" : "capture";
			if (origin === "owned-or-classified" && cause instanceof OwnedCommandFailure) {
				if (cause.cleanupFailure !== null) {
					const cleanup = new ProviderCleanupError(input.format, cause.resources, {
						reason: cause.cleanupFailure,
						previous_error: {
							failure_kind: cause.reason,
							message: cause.message,
							exit_code: cause.snapshot?.exitCode ?? null,
							signal: cause.snapshot?.signal ?? null,
							stdout: cause.snapshot?.stdout.text ?? null,
							stderr: cause.snapshot?.stderr.text ?? null,
							diagnostic_truncated: cause.snapshot?.diagnosticTruncated ?? null
						}
					}, {
						operation: OPERATION$2,
						cause
					});
					if (cleanupLease !== undefined) new AnalysisCleanupLeaseGroup(cleanup, [cleanupLease]);
					return cause.cause instanceof OwnedCommandFailure ? analysisErrorWithCleanupFailure(historicalCaptureFailure(input, cause.cause, phase, options, heap), cleanup, OPERATION$2) : cleanup;
				}
				if (cause.reason === "cancelled") return cancelledBy(OPERATION$2, carriedReason(cause.cancellation === undefined ? options?.signal?.aborted === true ? options.signal.reason : undefined : cause.cancellation.reason));
				if (cause.reason === "timeout") {
					const timeoutMs = selectedWebNetworkCaptureTimeoutMs(input.capture_timeout_ms);
					return new AnalysisTimeoutError(OPERATION$2, timeoutMs, webNetworkCaptureTimeoutRecovery(timeoutMs));
				}
				const outcome = providerOutcomeOf(cause);
				if (phase === "decoder" && outcome.kind === "runtime-exhausted") return captureMemoryFailure(input, `The ${input.format} decoder exhausted its ${String(heap.oldGenerationMiB)} MiB V8 old-generation heap (source ${heap.source})`, cause, heap, outcome.exhaustion);
				if (cause.reason === "output-limit") return new AnalysisOutputError(OPERATION$2, cause.message);
				if (phase === "decoder" && cause.reason === "process" && cause.snapshot?.memoryLimitReached === true) return captureMemoryFailure(input, CAPTURE_PROCESS_MEMORY_LIMIT_REASON, cause, heap);
			}
			if (phase !== "decoder" && origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure && cause.reason === "integrity") return readerIntegrityFailure(OPERATION$2, sourcePath, cause);
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") return cancelledBy(OPERATION$2, carriedReason(artifactFileCancellationCause(cause)));
			if (phase === "decoder" && origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure && cause.reason === "limit") return new AnalysisOutputError(OPERATION$2, cause.message, {
				cause,
				remediationAction: webNetworkCaptureBudgetRecovery(input, "max_reply_bytes"),
				diagnostics: {
					boundary: "historical-capture-reply",
					maximum_reply_bytes: captureBudgets().outputBytes,
					budget: webNetworkCaptureBudgetFacts(input, "max_reply_bytes")
				}
			});
			if (phase !== "decoder" && origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure && (cause.reason === "limit" || cause.reason === "format" || cause.reason === "path")) return new AnalysisInputError(OPERATION$2, {
				cause,
				...cause.reason === "limit" ? {
					diagnostics: { budget: webNetworkCaptureBudgetFacts(input, "max_input_bytes") },
					remediationAction: webNetworkCaptureBudgetRecovery(input, "max_input_bytes")
				} : stableArtifactInputRecovery(cause)
			}, [{
				path: inputPath,
				reason: cause.reason === "limit" ? "out_of_range" : "invalid_format",
				message: cause.reason === "limit" ? `${cause.message}. Increase max_input_bytes above ${String(captureBudgets().inputBytes)} on the next call without restarting REA, or select a smaller complete ${sourceLabel}. Reply, worker heap and capture_timeout_ms controls remain separate.` : cause.message,
				...cause.reason === "limit" ? { expected: { [descriptorRead ? "maximum_descriptor_set_bytes" : "maximum_capture_bytes"]: captureBudgets().inputBytes } } : {}
			}]);
			if (phase !== "decoder" && cause instanceof Error && "code" in cause && (cause.code === "EACCES" || cause.code === "EPERM")) return new AnalysisAccessDeniedError(OPERATION$2, sourcePath, cause.code, { cause });
			const selectedPathErrno = phase === "decoder" ? undefined : artifactSelectedPathErrno(cause);
			if (selectedPathErrno !== undefined) return new AnalysisInputError(OPERATION$2, { cause }, [{
				path: inputPath,
				reason: "invalid_value",
				message: `Selected ${sourceLabel} could not be read (${selectedPathErrno}): ${sourcePath}.`
			}]);
			if (phase === "decoder" && origin === "owned-or-classified" && isAbortOf(cause, options?.signal)) return cancelledBy(OPERATION$2, options.signal);
			return new ProviderAdapterError(input.format, OPERATION$2, {
				cause,
				diagnostics: {
					phase,
					capture_path: input.capture_path,
					...descriptorRead ? {
						source_path: sourcePath,
						input_path: inputPath
					} : {},
					reason: errorMessage(cause),
					...origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure ? { failure_kind: cause.reason } : {},
					...origin === "owned-or-classified" && cause instanceof OwnedCommandFailure && cause.snapshot !== null ? {
						...capturedProviderOutput(cause.snapshot),
						diagnostic_truncated: cause.snapshot.diagnosticTruncated ?? false
					} : {}
				}
			});
		};
		captureMemoryFailure = (input, reason, cause, heap = DEFAULT_CAPTURE_DECODER_HEAP, exhaustion) => {
			const processMemoryLimitBytes = javaScriptWorkerMemoryLimitBytes(heap.oldGenerationMiB);
			const recovery = captureDecoderHeapRecovery(heap);
			const continuingRecovery = captureDecoderHeapContinuingRecovery(heap);
			return new AnalysisResourceConstraintError(OPERATION$2, "memory", `${reason}: ${input.capture_path}. No complete capture result is available.`, {
				boundary: "historical-capture-decoder",
				capture_path: input.capture_path,
				format: input.format,
				maximum_input_bytes: captureBudgets().inputBytes,
				maximum_reply_bytes: captureBudgets().outputBytes,
				...input.format !== "mitmproxy" && NODE_CAPTURE_HEAP_ENFORCED ? {
					old_generation_heap_mib: heap.oldGenerationMiB,
					old_generation_heap_source: heap.source,
					semi_space_heap_mib: 8
				} : {},
				...input.format !== "mitmproxy" && processMemoryLimitBytes !== null ? { process_memory_limit_bytes: processMemoryLimitBytes } : {},
				...cause instanceof OwnedCommandFailure ? {
					observed_exit_code: cause.snapshot?.exitCode ?? null,
					observed_signal: cause.snapshot?.signal ?? null
				} : {}
			}, {
				cause,
				...exhaustion === undefined ? {} : { diagnostics: { runtime_exhaustion_report: runtimeExhaustionReport(exhaustion) } },
				...input.format !== "mitmproxy" && (NODE_CAPTURE_HEAP_ENFORCED || processMemoryLimitBytes !== null) ? { limit: analysisSettingLimit("capture.decoder_old_generation_mib", heap.oldGenerationMiB, heap.source) } : {},
				remediationAction: `Use a smaller capture exported by its producer, or another decoder with sufficient capacity for the original capture. Preserve the original for provenance; a subset does not establish complete-capture coverage.${input.format !== "mitmproxy" ? ` ${recovery}` : ""}${input.format !== "mitmproxy" && processMemoryLimitBytes !== null ? ` The Windows Job Object commit limit for this decoder is ${String(processMemoryLimitBytes)} bytes, ${String(heap.oldGenerationMiB)} MiB plus a 512 MiB Bun reserve.` : ""}`,
				...input.format === "mitmproxy" ? {} : { continuingCallerGuidance: { remediationAction: `Use a smaller capture exported by its producer, or another decoder with sufficient capacity for the original capture. Preserve the original for provenance; a subset does not establish complete-capture coverage. ${continuingRecovery}${processMemoryLimitBytes !== null ? ` The Windows Job Object commit limit for this decoder is ${String(processMemoryLimitBytes)} bytes, ${String(heap.oldGenerationMiB)} MiB plus a 512 MiB Bun reserve.` : ""}` } },
				...cause instanceof OwnedCommandFailure && cause.snapshot !== null ? { capturedOutput: capturedProviderOutput(cause.snapshot) } : {}
			});
		};
		withCaptureReaderCleanup = (primary, cause) => {
			if (!(cause instanceof ArtifactReaderFailure) || cause.cleanup === undefined) return primary;
			const cleanup = new ProviderCleanupError("web-network-capture", cause.cleanup.resources, { reason: cause.cleanup.reason }, {
				operation: OPERATION$2,
				cause
			});
			bindArtifactFileCleanup(cause, cleanup);
			if (cause.reason === "unavailable" && primary instanceof ProviderAdapterError && primary.cause === cause) {
				if (primary.partialObservation !== undefined) cleanup.retainPartialObservation(primary.partialObservation);
				return cleanup;
			}
			const composed = analysisErrorWithCleanupDependencies(primary, cleanup, OPERATION$2);
			bindArtifactFileCleanup(cause, composed);
			return composed;
		};
	})))();
}

//#endregion
//#region dist/browser/history/protobuf/ProtobufWire.js
var ProtobufBudget, readProtobufVarint, utf8, textOf, readWireField, messageCandidate, packedVarintCandidate, decodeProtobufWire;
function init_ProtobufWire() {
	return (init_ProtobufWire = __esmMin((() => {
		init_budget();
		init_strictUtf8();
		init_CaptureBudgets();
		init_leb128();
		init_result();
		init_CaptureFormatError();
		ProtobufBudget = class {
			signal;
			#bytes = new Budget(captureBudgets().outputBytes);
			#work = 0;
			constructor(signal) {
				this.signal = signal;
			}
			charge(bytes) {
				this.#bytes.charge(bytes, () => new CaptureFormatError({
					name: "protobuf-decoding",
					maximum: this.#bytes.maximum
				}, `Protobuf decoding exceeds max_reply_bytes (${String(this.#bytes.maximum)} bytes); raise that per-call allowance and retry.`));
			}
			async checkpoint() {
				this.signal?.throwIfAborted();
				if (++this.#work % 256 === 0) {
					await setImmediate();
					this.signal?.throwIfAborted();
				}
			}
		};
		readProtobufVarint = (bytes, start, end = bytes.length) => {
			const read = readLeb128(bytes, start, end, ULEB64);
			return "failure" in read ? undefined : {
				value: read.value,
				end: read.next
			};
		};
		utf8 = strictUtf8Decoder("preserve");
		textOf = (bytes) => {
			try {
				return utf8.decode(bytes);
			} catch {
				return undefined;
			}
		};
		readWireField = (bytes, at, until) => {
			const tag = readProtobufVarint(bytes, at, until);
			if (tag === undefined) return err("Truncated or overflowing field tag");
			const number = Number(tag.value >> 3n);
			const type = Number(tag.value & 7n);
			if (number === 0 || tag.value >> 3n > 536870911n) return err("Invalid field number");
			let payloadOffset = tag.end;
			let next = tag.end;
			let value;
			if (type === 0) {
				const parsed = readProtobufVarint(bytes, tag.end, until);
				if (parsed === undefined) return err("Truncated or overflowing uint64 varint");
				next = parsed.end;
				value = parsed.value;
			} else if (type === 1 || type === 5) {
				next += type === 1 ? 8 : 4;
				if (next > until) return err("Truncated fixed-width field");
			} else if (type === 2) {
				const length = readProtobufVarint(bytes, tag.end, until);
				if (length === undefined) return err("Truncated or overflowing length prefix");
				if (length.value > BigInt(until - length.end)) return err("Length-delimited field exceeds its message");
				payloadOffset = length.end;
				next = payloadOffset + Number(length.value);
			} else if (type !== 3 && type !== 4) return err(`Invalid wire type ${type}`);
			return ok({
				number,
				type,
				payloadOffset,
				next,
				...value === undefined ? {} : { value }
			});
		};
		messageCandidate = async (bytes, start, end, budget) => {
			const groups = [];
			while (start < end) {
				await budget.checkpoint();
				const parsed = readWireField(bytes, start, end);
				if (!parsed.ok) return false;
				const field = parsed.value;
				if (field.type === 3) {
					if (groups.length >= captureBudgets().depth) return false;
					groups.push(field.number);
				} else if (field.type === 4 && groups.pop() !== field.number) return false;
				start = field.next;
			}
			return groups.length === 0;
		};
		packedVarintCandidate = async (bytes, start, end, budget) => {
			while (start < end) {
				await budget.checkpoint();
				const value = readProtobufVarint(bytes, start, end);
				if (value === undefined) return false;
				start = value.end;
			}
			return true;
		};
		decodeProtobufWire = async (bytes, start, end, frameIndex, budget, redact, schema, baseIndex = 0) => {
			const fields = [];
			const walk = async (from, until, parent, depth, group) => {
				let at = from;
				const fail = (reason) => ({
					end: at,
					error: {
						offset: at,
						reason
					}
				});
				while (at < until) {
					await budget.checkpoint();
					const parsed = readWireField(bytes, at, until);
					if (!parsed.ok) return fail(parsed.error);
					const { number, type, payloadOffset } = parsed.value;
					let next = parsed.value.next;
					if (type === 4) return group === number ? {
						end: next,
						payloadEnd: at
					} : fail("Unexpected or mismatched end-group tag");
					if (type === 3 && depth >= captureBudgets().depth) return fail(`Group nesting exceeds max_nesting_depth (${String(captureBudgets().depth)} levels)`);
					let value = parsed.value.value?.toString();
					if (type === 1 || type === 5) {
						let integer = 0n;
						for (let p = next - 1; p >= payloadOffset; p--) integer = integer << 8n | BigInt(bytes[p]);
						value = integer.toString();
					}
					budget.charge(1024);
					const field = {
						index: baseIndex + fields.length,
						frame_index: frameIndex,
						parent_index: parent?.index ?? null,
						field_id: `offset:${at}`,
						parent_field_id: parent === undefined ? null : `offset:${parent.offset}`,
						number,
						wire_type: type === 0 ? "varint" : type === 1 ? "i64" : type === 2 ? "len" : type === 3 ? "group" : "i32",
						offset: at,
						bytes: next - at,
						payload_offset: payloadOffset,
						payload_bytes: next - payloadOffset,
						...value === undefined ? {} : { value: redact(value) }
					};
					fields.push(field);
					if (type === 2) {
						budget.charge(field.payload_bytes * 8);
						const text = textOf(bytes.subarray(payloadOffset, next));
						const candidate = await messageCandidate(bytes, payloadOffset, next, budget);
						const packed = await packedVarintCandidate(bytes, payloadOffset, next, budget);
						field.interpretations = [
							...text === undefined ? [] : ["utf8-string"],
							...candidate ? ["nested-message"] : [],
							...packed ? ["packed-varint"] : [],
							...field.payload_bytes % 4 === 0 ? ["packed-fixed32"] : [],
							...field.payload_bytes % 8 === 0 ? ["packed-fixed64"] : [],
							"bytes"
						];
						if (text !== undefined) field.text = redact(text);
					}
					if (schema !== undefined) await schema.annotate(field, bytes, parent);
					if (type === 3) {
						const nested = await walk(payloadOffset, until, field, depth + 1, number);
						field.bytes = nested.end - at;
						field.payload_bytes = (nested.payloadEnd ?? nested.end) - payloadOffset;
						if (nested.error !== undefined) return nested;
						next = nested.end;
					} else if (type === 2 && schema?.nested(field)) {
						const error = depth >= captureBudgets().depth ? {
							offset: payloadOffset,
							reason: `Schema message nesting exceeds max_nesting_depth (${String(captureBudgets().depth)} levels)`
						} : (await walk(payloadOffset, next, field, depth + 1)).error;
						if (error !== undefined) {
							field.schema_status = "invalid-message";
							field.schema_error = error;
						}
					}
					at = next;
				}
				return group === undefined ? { end: at } : fail("Missing end-group tag");
			};
			const result = await walk(start, end, undefined, 0);
			return {
				fields,
				examined_bytes: result.end - start,
				...result.error === undefined ? {} : { error: result.error }
			};
		};
	})))();
}

//#endregion
//#region dist/browser/history/protobuf/ProtobufFraming.js
var readGrpcFrame, decodeText, prepareProtobufBody;
function init_ProtobufFraming() {
	return (init_ProtobufFraming = __esmMin((() => {
		init_CaptureBudgets();
		init_result();
		init_CaptureFormatError();
		init_ProtobufWire();
		readGrpcFrame = (data, at, framing) => {
			if (data.length - at < 5) return err({
				offset: at,
				reason: "Truncated gRPC frame header"
			});
			const flags = data[at];
			if (framing === "grpc" && flags !== 0 && flags !== 1 || (flags & ~129) !== 0) return err({
				offset: at,
				reason: "Invalid flags for the selected gRPC framing"
			});
			const length = data[at + 1] * 2 ** 24 + data[at + 2] * 2 ** 16 + data[at + 3] * 256 + data[at + 4];
			if (length > data.length - at - 5) return err({
				offset: at,
				reason: "gRPC frame exceeds the retained body"
			});
			return ok({
				flags,
				bytes: length,
				payload_offset: at + 5,
				end: at + 5 + length
			});
		};
		decodeText = async (body, work) => {
			const text = Buffer.from(body.buffer, body.byteOffset, body.byteLength).toString("latin1").replace(/[ \r\n\t]/g, "");
			if (/[^A-Za-z0-9+/=]/.test(text)) return undefined;
			const output = Buffer.alloc(Math.floor(text.length * 3 / 4));
			let at = 0;
			let written = 0;
			while (at < text.length) {
				await work.checkpoint();
				let end = text.indexOf("=", at);
				if (end < 0) end = text.length;
				else {
					end++;
					if (text[end] === "=") end++;
				}
				const chunk = text.slice(at, end);
				if (chunk.length % 4 === 1 || chunk.includes("=") && chunk.length % 4 !== 0) return undefined;
				const bytes = Buffer.from(chunk, "base64");
				if (bytes.toString("base64").replace(/=+$/, "") !== chunk.replace(/=+$/, "")) return undefined;
				output.set(bytes, written);
				written += bytes.length;
				at = end;
			}
			return output.subarray(0, written);
		};
		prepareProtobufBody = async (body, framing, exclusions, signal) => {
			if (body.length > captureBudgets().inputBytes) throw new CaptureFormatError({
				name: "protobuf-body",
				maximum: captureBudgets().inputBytes
			}, `Protobuf body exceeds max_input_bytes (${String(captureBudgets().inputBytes)} bytes)`);
			const work = new ProtobufBudget(signal);
			await work.checkpoint();
			const data = framing === "grpc-web-text" ? await decodeText(body, work) : body;
			if (data === undefined) return {
				data,
				credentialsChecked: false
			};
			if (exclusions.decoded(data)) return {
				data,
				credentialsChecked: true,
				excluded: "explicit-sensitive-value"
			};
			if (framing === "raw" || framing === "grpc") return {
				data,
				credentialsChecked: true
			};
			let at = 0;
			let credentialsChecked = true;
			while (at < data.length) {
				await work.checkpoint();
				const parsed = readGrpcFrame(data, at, framing);
				if (!parsed.ok) {
					credentialsChecked = false;
					break;
				}
				const frame = parsed.value;
				if (frame.flags === 129) credentialsChecked = false;
				if (frame.flags === 128) {
					let start = frame.payload_offset;
					for (let index = start; index <= frame.end; index++) {
						if ((index - start) % 256 === 0) await work.checkpoint();
						if (index !== frame.end && data[index] !== 10) continue;
						let colon = start;
						while (colon < index && data[colon] !== 58) colon++;
						if (colon < index && exclusions.header(data, start, colon)) return {
							data,
							credentialsChecked: true,
							excluded: "transport-credential"
						};
						start = index + 1;
					}
				}
				at = frame.end;
			}
			return {
				data,
				credentialsChecked
			};
		};
	})))();
}

//#endregion
//#region dist/browser/history/protobuf/ProtobufTrailers.js
var parseGrpcWebTrailers, isTrailerNameByte;
function init_ProtobufTrailers() {
	return (init_ProtobufTrailers = __esmMin((() => {
		init_strictUtf8();
		init_result();
		parseGrpcWebTrailers = (bytes, budget) => {
			let decoder = strictUtf8Decoder("preserve");
			const trailers = [];
			let examinedBytes = 0;
			const facts = () => ({
				trailers,
				examined_bytes: examinedBytes
			});
			let opaqueValueFailure;
			for (let start = 0; start <= bytes.length;) {
				let end = start;
				while (end + 1 < bytes.length && !(bytes[end] === 13 && bytes[end + 1] === 10)) end += 1;
				const hasSeparator = end + 1 < bytes.length;
				const lineEnd = hasSeparator ? end : bytes.length;
				const lineExaminedBytes = hasSeparator ? end + 2 : lineEnd;
				if (lineEnd === start) {
					if (!hasSeparator) break;
					if (lineExaminedBytes < bytes.length) return err({
						...facts(),
						examined_bytes: lineExaminedBytes,
						kind: "invalid-boundary",
						reason: "gRPC-web trailer block has bytes after a blank line"
					});
					examinedBytes = lineExaminedBytes;
					break;
				}
				let colon = start;
				while (colon < lineEnd && bytes[colon] !== 58) colon += 1;
				if (colon === start || colon === lineEnd) return err({
					...facts(),
					examined_bytes: lineExaminedBytes,
					kind: "invalid-name",
					reason: "gRPC-web trailer header names must be lower-case HTTP field names"
				});
				let name = "";
				let validName = true;
				for (let index = start; index < colon; index += 1) {
					const byte = bytes[index];
					if (!isTrailerNameByte(byte)) {
						validName = false;
						break;
					}
					name += String.fromCharCode(byte);
				}
				if (!validName) return err({
					...facts(),
					examined_bytes: lineExaminedBytes,
					kind: "invalid-name",
					reason: "gRPC-web trailer header names must be lower-case HTTP field names"
				});
				let valueStart = colon + 1;
				while (valueStart < lineEnd && [9, 32].includes(bytes[valueStart])) valueStart += 1;
				for (let index = valueStart; index < lineEnd; index += 1) {
					const byte = bytes[index];
					if (byte <= 8 || byte >= 10 && byte <= 31 || byte === 127) return err({
						...facts(),
						examined_bytes: lineExaminedBytes,
						kind: "invalid-value",
						reason: "gRPC-web trailer field value contains a forbidden control character"
					});
				}
				let valueEnd = lineEnd;
				while (valueEnd > valueStart && [9, 32].includes(bytes[valueEnd - 1])) valueEnd -= 1;
				let value;
				try {
					value = decoder.decode(bytes.subarray(valueStart, valueEnd));
				} catch (cause) {
					if (!(cause instanceof TypeError)) throw cause;
					decoder = strictUtf8Decoder("preserve");
					opaqueValueFailure ??= {
						...facts(),
						kind: "invalid-utf8-value",
						reason: "gRPC-web trailer field contains opaque non-UTF-8 bytes; that field was omitted"
					};
					examinedBytes = lineExaminedBytes;
					if (!hasSeparator) break;
					start = end + 2;
					continue;
				}
				budget.charge(512);
				trailers.push({
					name,
					value
				});
				examinedBytes = lineExaminedBytes;
				if (!hasSeparator) break;
				start = end + 2;
			}
			if (opaqueValueFailure !== undefined) return err({
				...opaqueValueFailure,
				trailers,
				examined_bytes: bytes.length
			});
			return ok({
				trailers,
				examined_bytes: bytes.length
			});
		};
		isTrailerNameByte = (byte) => byte >= 97 && byte <= 122 || byte >= 48 && byte <= 57 || byte === 33 || byte >= 35 && byte <= 39 || byte === 42 || byte === 43 || byte >= 45 && byte <= 46 || byte === 94 || byte === 95 || byte === 96 || byte === 124 || byte === 126;
	})))();
}

//#endregion
//#region dist/browser/history/protobuf/ProtobufBody.js
var PROTOBUF_FRAMING, PROTOBUF_LIMITATIONS, decodeProtobufBody;
function init_ProtobufBody() {
	return (init_ProtobufBody = __esmMin((() => {
		init_ProtobufFraming();
		init_ProtobufTrailers();
		init_ProtobufWire();
		PROTOBUF_FRAMING = {
			"application/grpc": "grpc",
			"application/grpc+proto": "grpc",
			"application/grpc-web": "grpc-web",
			"application/grpc-web+proto": "grpc-web",
			"application/grpc-web-text": "grpc-web-text",
			"application/grpc-web-text+proto": "grpc-web-text",
			"application/x-protobuf": "raw",
			"application/protobuf": "raw",
			"application/vnd.google.protobuf": "raw"
		};
		PROTOBUF_LIMITATIONS = ["Wire numbers and ranges are observations. Length-delimited string, nested-message and packed readings are candidates without a supplied schema. Raw decoding does not infer field names, signedness or business meaning; nested candidate bytes remain accessible through their ranges.", "Schema values are interpretations of the caller-supplied descriptor, not proof that the sender used that schema. Map semantics, extensions, required-field validation and unknown schema fields are not reconstructed."];
		decodeProtobufBody = async (body, framing, source, redact, budget, schema, prepared) => {
			const result = {
				...source,
				decoder: "rea-protobuf-wire-v1",
				framing,
				offset_basis: framing === "grpc-web-text" ? "base64-decoded-body" : "retained-body",
				decoded_bytes: 0,
				status: "complete",
				examined_bytes: 0,
				frames: [],
				fields: [],
				limitations: []
			};
			const stop = (offset, reason) => {
				result.status = "partial";
				result.error = {
					offset,
					reason: redact(reason)
				};
				return result;
			};
			if (framing === "grpc-web-text") budget.charge(body.length * 6);
			const data = prepared === undefined ? (await prepareProtobufBody(body, framing, {
				decoded: () => false,
				header: () => false
			}, budget.signal)).data : prepared.data;
			if (data === undefined) return stop(0, "gRPC-web text is not canonical base64 or independently padded base64 chunks");
			result.decoded_bytes = data.length;
			let at = 0;
			const addMessage = async (frame) => {
				if (frame.compressed) {
					frame.status = "unknown";
					frame.error = {
						offset: frame.payload_offset,
						reason: "Compressed gRPC payload requires its negotiated codec; source bytes remain retained"
					};
					return;
				}
				const decoded = await decodeProtobufWire(data, frame.payload_offset, frame.payload_offset + frame.bytes, frame.index, budget, redact, schema, result.fields.length);
				for (const field of decoded.fields) result.fields.push(field);
				frame.examined_bytes = decoded.examined_bytes;
				if (decoded.error !== undefined) {
					frame.status = "partial";
					frame.error = decoded.error;
				}
			};
			if (framing === "raw") {
				const frame = {
					index: 0,
					kind: "data",
					offset: 0,
					payload_offset: 0,
					bytes: data.length,
					compressed: false,
					status: "complete",
					examined_bytes: 0
				};
				result.frames.push(frame);
				await addMessage(frame);
				result.status = frame.status;
				result.examined_bytes = frame.examined_bytes;
				return result;
			}
			let trailerSeen = false;
			while (at < data.length) {
				await budget.checkpoint();
				if (trailerSeen) return stop(at, "A gRPC-web trailer frame must terminate the body");
				const parsed = readGrpcFrame(data, at, framing);
				if (!parsed.ok) return stop(parsed.error.offset, parsed.error.reason);
				const { flags, bytes: length } = parsed.value;
				budget.charge(1024);
				const frame = {
					index: result.frames.length,
					kind: flags & 128 ? "trailer" : "data",
					offset: at,
					payload_offset: at + 5,
					bytes: length,
					compressed: (flags & 1) !== 0,
					status: "complete",
					examined_bytes: 0
				};
				result.frames.push(frame);
				if (frame.kind === "data") await addMessage(frame);
				else {
					trailerSeen = true;
					if (frame.compressed) {
						frame.status = "unknown";
						frame.error = {
							offset: at + 5,
							reason: "Compressed gRPC-web trailers remain opaque"
						};
					} else {
						budget.charge(length * 8);
						const parsed = parseGrpcWebTrailers(data.subarray(at + 5, at + 5 + length), budget);
						const facts = parsed.ok ? parsed.value : parsed.error;
						frame.examined_bytes = facts.examined_bytes;
						frame.trailers = facts.trailers.map(({ name, value }) => ({
							name: redact(name),
							value: redact(value)
						}));
						if (!parsed.ok) {
							frame.status = "partial";
							frame.error = {
								offset: at + 5,
								reason: parsed.error.reason
							};
						}
					}
				}
				if (frame.status !== "complete") result.status = "partial";
				result.examined_bytes += 5 + frame.examined_bytes;
				at += 5 + length;
			}
			return result;
		};
	})))();
}

//#endregion
//#region dist/browser/history/protobuf/ProtobufCapture.js
var object, excludeBody, mediaType, mimeParameter, protobufMediaType, bodyMetadata, prepareCaptureProtobuf, decodeCaptureProtobuf;
function init_ProtobufCapture() {
	return (init_ProtobufCapture = __esmMin((() => {
		init_jsonPointer();
		init_CaptureBudgets();
		init_CaptureFormatError();
		init_CaptureRedaction();
		init_resources();
		init_CaptureFailures();
		init_analysisErrorCore();
		init_explicitSensitiveValues();
		init_result();
		init_ProtobufWire();
		init_ProtobufBody();
		init_ProtobufFraming();
		init_sha256Hex();
		object = (value) => value !== null && typeof value === "object" && !Array.isArray(value) ? value : undefined;
		excludeBody = (record, pointer, reason) => {
			record.binary_fields = record.binary_fields.map((field) => field.pointer !== pointer ? field : {
				pointer: field.pointer,
				representation: field.representation,
				state: "redacted",
				content_base64: null,
				bytes: null,
				sha256: null
			});
			const parts = pointer.split("/").slice(1).map(unescapeJsonPointerToken);
			let parent = record.reported;
			for (const part of parts.slice(0, -1)) {
				if (parent === null || typeof parent !== "object" || !Object.hasOwn(parent, part)) {
					parent = undefined;
					break;
				}
				parent = Array.isArray(parent) ? parent[Number(part)] : parent[part];
			}
			const key = parts.at(-1);
			if (parent !== null && typeof parent === "object" && key !== undefined && Object.hasOwn(parent, key)) Object.defineProperty(parent, key, {
				value: null,
				writable: true,
				configurable: true,
				enumerable: true
			});
			record.redactions.push({
				pointer,
				reason
			});
		};
		mediaType = /^[\t ]*([!#$%&'*+.^_`|~0-9A-Za-z-]+)\/([!#$%&'*+.^_`|~0-9A-Za-z-]+)/;
		mimeParameter = /([!#$%&'*+.^_`|~0-9A-Za-z-]+)=([!#$%&'*+.^_`|~0-9A-Za-z-]+|"(?:[\t \x21\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\t \x21-\x7e\x80-\xff])*")/y;
		protobufMediaType = (value) => {
			if (value === undefined) return ok({
				framing: undefined,
				key: undefined
			});
			const type = mediaType.exec(value);
			const essence = type === null ? undefined : `${type[1].toLowerCase()}/${type[2].toLowerCase()}`;
			const framing = essence !== undefined && Object.hasOwn(PROTOBUF_FRAMING, essence) ? PROTOBUF_FRAMING[essence] : undefined;
			const invalid = (reason) => err({
				_tag: "InvalidProtobufMime",
				issue: `Selected body has an invalid MIME declaration (${reason}); automatic protobuf applicability is unknown.`,
				declaredFraming: framing
			});
			if (type === null) return invalid("malformed media type");
			const parameters = new Map();
			let at = type[0].length;
			while (at < value.length) {
				while (value[at] === " " || value[at] === "	") at++;
				if (at === value.length) break;
				if (value[at++] !== ";") return invalid("malformed media-type parameters");
				while (value[at] === " " || value[at] === "	") at++;
				if (at === value.length || value[at] === ";") continue;
				mimeParameter.lastIndex = at;
				const match = mimeParameter.exec(value);
				if (match === null) return invalid("malformed media-type parameters");
				at = mimeParameter.lastIndex;
				const name = match[1].toLowerCase();
				if (![
					"encoding",
					"charset",
					"version"
				].includes(name)) continue;
				const raw = match[2];
				const decoded = raw.startsWith("\"") ? raw.slice(1, -1).replace(/\\([\s\S])/g, "$1") : raw;
				if (parameters.has(name) && parameters.get(name) !== decoded) return invalid(`conflicting ${name} parameters`);
				parameters.set(name, decoded);
			}
			const encoding = parameters.get("encoding");
			const charset = parameters.get("charset");
			const version = parameters.get("version");
			if (framing === "raw" && (encoding !== undefined && encoding !== "binary" || charset !== undefined || version !== undefined)) return err({
				_tag: "InvalidProtobufMime",
				issue: "Selected binary Protobuf MIME profile has an illegal encoding, charset or reserved version parameter; retained bytes were not automatically interpreted. Select explicit framing to interpret the bytes independently of that declaration.",
				declaredFraming: framing
			});
			return ok({
				framing,
				key: JSON.stringify([
					essence,
					framing === "raw" ? encoding ?? "binary" : encoding ?? null,
					charset ?? null,
					version ?? null
				])
			});
		};
		bodyMetadata = (record, pointer, format, binaryByPointer) => {
			const side = /^\/(request|response)\//.exec(pointer)?.[1];
			if (side === undefined || ![
				"/request/postData/text",
				"/response/content/text",
				"/request/body",
				"/response/body",
				"/request/content",
				"/response/content"
			].includes(pointer)) return undefined;
			const message = object(object(record.reported)?.[side]);
			if (message === undefined) return undefined;
			const headers = new Map();
			let headerProfile = protobufMediaType(undefined);
			let headerDeclaredFraming;
			let headerNamesKnown = Array.isArray(message.headers);
			if (Array.isArray(message.headers)) {
				for (const [index, item] of message.headers.entries()) {
					const pair = object(item);
					const text = (value, coordinate) => {
						const binary = binaryByPointer.get(coordinate);
						if (binary !== undefined) return binary.state === "retained" ? Buffer.from(binary.content_base64, "base64").toString("latin1") : undefined;
						return typeof value === "string" ? value : undefined;
					};
					const name = Array.isArray(item) ? text(item[0], `/${side}/headers/${index}/0`) : pair?.name;
					const value = Array.isArray(item) ? text(item[1], `/${side}/headers/${index}/1`) : pair?.value;
					if (typeof name === "string") {
						const key = name.toLowerCase();
						const knownValue = typeof value === "string" ? value : undefined;
						const previous = headers.get(key);
						if (key === "content-type") {
							const nextProfile = protobufMediaType(knownValue);
							const nextDeclaredFraming = nextProfile.ok ? nextProfile.value.framing : nextProfile.error.declaredFraming;
							const agrees = previous !== undefined && knownValue !== undefined && headerProfile.ok && nextProfile.ok && headerProfile.value.key === nextProfile.value.key;
							const first = !headers.has(key);
							headerDeclaredFraming = first || headerDeclaredFraming === nextDeclaredFraming ? nextDeclaredFraming : undefined;
							headers.set(key, first ? knownValue : agrees ? previous : undefined);
							headerProfile = first ? nextProfile : agrees ? headerProfile : protobufMediaType(undefined);
							continue;
						}
						headers.set(key, !headers.has(key) ? knownValue : previous !== undefined && knownValue !== undefined && previous === knownValue ? previous : undefined);
					} else headerNamesKnown = false;
				}
			}
			const header = headers.get("content-type");
			if (format === "har") {
				if (pointer !== `/${side}/${side === "request" ? "postData" : "content"}/text`) return undefined;
				const mimeType = object(message[side === "request" ? "postData" : "content"])?.mimeType;
				const contentType = typeof mimeType === "string" ? mimeType : undefined;
				const profile = protobufMediaType(contentType);
				return {
					contentType,
					mimeProfile: profile,
					declaredFraming: contentType === undefined ? headerDeclaredFraming : profile.ok ? profile.value.framing : profile.error.declaredFraming,
					contentTypeKnown: contentType !== undefined,
					httpIdentityKnown: true,
					httpCodingKnown: true
				};
			}
			if (pointer !== `/${side}/body` && pointer !== `/${side}/content`) return undefined;
			return {
				contentType: header,
				mimeProfile: headerProfile,
				declaredFraming: headerDeclaredFraming,
				contentTypeKnown: header !== undefined || headerNamesKnown && !headers.has("content-type"),
				httpCodingKnown: headerNamesKnown && ["content-encoding", "transfer-encoding"].every((name) => !headers.has(name) || headers.get(name) !== undefined),
				httpIdentityKnown: headerNamesKnown && ["content-encoding", "transfer-encoding"].every((name) => !headers.has(name) || /^[ \t]*identity[ \t]*(?![\s\S])/i.test(headers.get(name) ?? ""))
			};
		};
		prepareCaptureProtobuf = async (capture, input, signal) => {
			if (input.record_ordinals === undefined) return undefined;
			capture.protobuf_coverage = {
				status: "partial",
				selected_records: input.record_ordinals.length,
				inspected_records: 0
			};
			capture.limitations.push(...PROTOBUF_LIMITATIONS);
			let incomplete = false;
			const records = [];
			const options = input.protobuf;
			const pointers = options?.body_pointers === undefined ? undefined : new Set(options.body_pointers);
			const redactions = new CaptureRedaction(input.sensitive_values);
			const work = new ProtobufBudget(signal);
			for (const ordinal of input.record_ordinals) {
				await work.checkpoint();
				const record = capture.records[ordinal];
				if (record === undefined) continue;
				const bodies = [];
				records.push({
					record,
					bodies
				});
				const binaryByPointer = new Map(record.binary_fields.map((field) => [field.pointer, field]));
				for (const field of record.binary_fields) {
					await work.checkpoint();
					if (pointers !== undefined && !pointers.has(field.pointer)) continue;
					const metadata = bodyMetadata(record, field.pointer, input.format, binaryByPointer);
					if (metadata === undefined) continue;
					if (field.state !== "retained") {
						incomplete = true;
						continue;
					}
					const { contentType, mimeProfile, declaredFraming } = metadata;
					const automatic = mimeProfile.ok ? mimeProfile.value.framing : undefined;
					const automaticSelected = options?.framing === undefined || options.framing === "auto";
					if (!mimeProfile.ok) {
						if (automaticSelected) incomplete = true;
						record.limitations.push(mimeProfile.error.issue);
					}
					if (automaticSelected && !metadata.contentTypeKnown && field.bytes > 0) {
						incomplete = true;
						record.limitations.push("Selected body's MIME metadata is excluded, conflicting or unavailable, so automatic protobuf framing applicability is unknown; its retained bytes were not interpreted. Select explicit framing to decode them.");
					}
					const framing = options?.framing === undefined || options.framing === "auto" ? automatic ?? declaredFraming : options.framing;
					if (framing === undefined) {
						continue;
					}
					if (field.bytes > captureBudgets().inputBytes || field.content_base64.length > Math.ceil(captureBudgets().inputBytes / 3) * 4) throw new CaptureFormatError({
						name: "protobuf-body",
						maximum: captureBudgets().inputBytes
					}, `Protobuf body exceeds max_input_bytes (${String(captureBudgets().inputBytes)} bytes)`);
					const body = Buffer.from(field.content_base64, "base64");
					if (body.length !== field.bytes || sha256Hex(body) !== field.sha256) throw new AnalysisInputError("inspect_web_network_capture", undefined, [{
						path: ["capture_path"],
						reason: "invalid_format",
						message: "Retained protobuf bytes contradict their source descriptor"
					}]);
					const exclusions = {
						decoded: (data) => redactions.sensitiveBytes(Buffer.from(data.buffer, data.byteOffset, data.byteLength)),
						header: isCaptureCredentialHeaderBytes
					};
					const prepared = await prepareProtobufBody(body, framing, exclusions, signal);
					const declared = prepared.excluded === undefined && declaredFraming !== undefined && declaredFraming !== framing ? await prepareProtobufBody(body, declaredFraming, exclusions, signal) : prepared;
					const excluded = prepared.excluded ?? declared.excluded;
					if (excluded !== undefined) {
						excludeBody(record, field.pointer, excluded);
						binaryByPointer.delete(field.pointer);
						incomplete = true;
						continue;
					}
					if (!metadata.httpCodingKnown && (!prepared.credentialsChecked || !declared.credentialsChecked)) throw new AnalysisCapabilityUnavailableError(input.format, "inspect_web_network_capture", "Credential inspection could not complete while HTTP coding metadata was unavailable; unchecked capture bodies were withheld.", {
						diagnostics: { body_pointer: field.pointer },
						userMessage: "Use a capture with available HTTP coding metadata, or select records whose transport can be inspected. Unchecked source bytes were not published."
					});
					if (!metadata.httpIdentityKnown) {
						incomplete = true;
						record.limitations.push("Selected protobuf body's HTTP content/transfer coding is encoded or unknown, so identity is not established; its exact stored bytes remain opaque.");
						continue;
					}
					if (automaticSelected && (!mimeProfile.ok || !metadata.contentTypeKnown)) continue;
					bodies.push({
						field,
						body,
						contentType,
						framing,
						prepared
					});
				}
			}
			return {
				records,
				incomplete
			};
		};
		decodeCaptureProtobuf = async (capture, input, resources, prepared, signal, encodedSourceBytes = 0) => {
			if (prepared === undefined || capture.protobuf_coverage === undefined) return;
			let incomplete = prepared.incomplete;
			const budget = new ProtobufBudget(signal);
			budget.charge(encodedSourceBytes + 256 + Buffer.byteLength(JSON.stringify(PROTOBUF_LIMITATIONS)));
			for (const entry of prepared.records) for (const item of entry.bodies) budget.charge(item.body.length + (item.prepared.data === item.body ? 0 : item.prepared.data?.length ?? 0));
			const redact = (text) => {
				if (input.sensitive_values.length === 0) return text;
				if (input.sensitive_values.some((literal) => text.includes(literal))) budget.charge(text.length * 60);
				return redactExplicitText(text, input.sensitive_values);
			};
			const options = input.protobuf;
			let schema;
			let schemaSource;
			if (options?.schema !== undefined) {
				const path = options.schema.descriptor_set_path;
				if (!isAbsolute(path)) throw new AnalysisInputError("inspect_web_network_capture", undefined, [{
					path: [
						"protobuf",
						"schema",
						"descriptor_set_path"
					],
					reason: "invalid_format",
					message: "Expected an absolute descriptor-set path"
				}]);
				const snapshot = await readStableArtifact(path, captureBudgets().inputBytes, signal, undefined, resources).catch((cause) => {
					const failure = withCaptureReaderCleanup(historicalCaptureFailure(input, cause, "descriptor-read", signal === undefined ? undefined : { signal }), cause);
					const snapshot = completedStableArtifactObservation(cause, path);
					if (snapshot !== undefined) failure.retainDiagnostics({ descriptor_set_snapshot: snapshot });
					throw failure;
				});
				const { ProtobufSchema } = await import("./browser__history__protobuf__ProtobufSchema-C_nDuGAL.js");
				const admitted = await ProtobufSchema.read(snapshot.bytes, options.schema.message_type, budget, redact);
				if (!admitted.ok) throw new AnalysisInputError("inspect_web_network_capture", undefined, [{
					path: [
						"protobuf",
						"schema",
						admitted.error.field
					],
					reason: admitted.error.kind === "missing-message" ? "invalid_value" : "invalid_format",
					message: redact(admitted.error.message)
				}]);
				schema = admitted.value;
				schemaSource = {
					decoder: "protobuf-es-2.16.0",
					descriptor_set_path: redact(path),
					descriptor_set_sha256: snapshot.sha256,
					descriptor_set_bytes: snapshot.bytes.length,
					message_type: redact(options.schema.message_type)
				};
			}
			for (const { record, bodies } of prepared.records) {
				const decoded = [];
				for (const { field, body, contentType, framing, prepared: bodySource } of bodies) {
					await budget.checkpoint();
					if (input.sensitive_values.some((value) => field.pointer.includes(value) || field.sha256.includes(value) || schemaSource?.descriptor_set_sha256.includes(value))) {
						incomplete = true;
						continue;
					}
					budget.charge(2048 + 8 * (field.pointer.length + (contentType?.length ?? 0) + (schemaSource?.descriptor_set_path.length ?? 0) + (schemaSource?.message_type.length ?? 0)));
					schema?.reset();
					const result = await decodeProtobufBody(body, framing, {
						pointer: field.pointer,
						content_type: contentType ?? null,
						body_sha256: field.sha256
					}, redact, budget, schema, bodySource);
					if (schemaSource !== undefined) result.schema = schemaSource;
					if (result.status !== "complete" || result.fields.some((field) => field.schema_status !== undefined && field.schema_status !== "decoded")) incomplete = true;
					decoded.push(result);
				}
				if (decoded.length > 0) record.protobuf = decoded;
				capture.protobuf_coverage.inspected_records++;
			}
			if (!incomplete && capture.protobuf_coverage.inspected_records === capture.protobuf_coverage.selected_records) capture.protobuf_coverage.status = "complete";
		};
	})))();
}

//#endregion
//#region dist/browser/history/HistoricalCaptureReply.js
var failureFields, replySchema, readHistoricalCaptureReply, replyFailureReason, excludeNormalizedNumbers;
function init_HistoricalCaptureReply() {
	return (init_HistoricalCaptureReply = __esmMin((() => {
		init_CaptureBudgets();
		init_SignalAbort();
		init_CaptureRedaction();
		init_safeJson();
		init_resources();
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_CaptureFailures();
		init_webNetworkCapture();
		init_fixedAllowanceRemediation();
		failureFields = {
			message: z.string(),
			pointer: z.string()
		};
		replySchema = z.discriminatedUnion("ok", [z.strictObject({
			ok: z.literal(true),
			value: webNetworkCapturePayloadSchema
		}), z.discriminatedUnion("reason", [z.strictObject({
			ok: z.literal(false),
			reason: z.enum([
				"format",
				"unsupported",
				"input-limit",
				"expanded-limit",
				"resource-limit",
				"decoder",
				"limit"
			]),
			...failureFields
		}), z.strictObject({
			ok: z.literal(false),
			reason: z.literal("fixed-limit"),
			...failureFields,
			ceiling: z.strictObject({
				name: z.string().min(1),
				kind: z.enum(FIXED_ALLOWANCE_KINDS),
				limit: z.number().nonnegative(),
				unit: z.string().min(1),
				narrowing: z.string().min(1).exactOptional()
			}),
			boundary: z.enum([
				"file-size",
				"capacity",
				"memory"
			])
		})])]);
		readHistoricalCaptureReply = async (path, capturePath, resources, signal, sensitiveValues = []) => {
			let finalization;
			try {
				let file;
				try {
					file = await readStableArtifact(path, captureBudgets().outputBytes, signal, undefined, resources);
				} catch (cause) {
					const completed = completedStableArtifact(cause);
					if (!(cause instanceof ArtifactReaderFailure) || completed === undefined) throw cause;
					finalization = cause;
					file = completed;
				}
				const decoded = safeParseUtf8Json(file.bytes);
				if (!decoded.ok) throw decoded.cause;
				const value = replySchema.parse(decoded.value);
				if (value.ok && sensitiveValues.length > 0) {
					excludeNormalizedNumbers(value.value.container, sensitiveValues);
					for (const record of value.value.records) excludeNormalizedNumbers(record, sensitiveValues);
				}
				return {
					value,
					bytes: file.bytes.length,
					finalization
				};
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				if (isAbortOf(cause, signal)) throw cause;
				const error = new AnalysisOutputError("inspect_web_network_capture", `Owned capture decoder reply failed for ${capturePath}: ${replyFailureReason(cause)}`, { cause });
				if (finalization?.reason === "cancelled") {
					const cancellation = cancelledBy("inspect_web_network_capture", carriedReason(artifactFileCancellationCause(finalization)));
					error.retainSecondaryFailure(cancellation, { reply_finalization_error: projectAnalysisError(cancellation) });
				}
				throw withCaptureReaderCleanup(error, finalization);
			}
		};
		replyFailureReason = (cause) => {
			if (cause instanceof ArtifactReaderFailure) return cause.message;
			if (cause instanceof z.ZodError) return `Reply violates its schema at ${cause.issues[0]?.path.map(String).join(".") ?? "root"}.`;
			if (cause instanceof SyntaxError) return "Reply is malformed JSON.";
			if (cause instanceof Error && "code" in cause && cause.code === "ERR_ENCODING_INVALID_ENCODED_DATA") return "Reply is not valid UTF-8.";
			if (cause instanceof Error && "code" in cause) return `Reply file could not be read (${String(cause.code)}).`;
			return "Reply could not be validated.";
		};
		excludeNormalizedNumbers = (projection, sensitiveValues) => {
			const redaction = new CaptureRedaction(sensitiveValues);
			const excluded = new Set();
			const visit = (value, pointer) => {
				if (typeof value === "number") {
					if (redaction.text(String(value), pointer) === null) {
						excluded.add(pointer);
						return null;
					}
				} else if (Array.isArray(value)) {
					for (let index = 0; index < value.length; index++) value[index] = visit(value[index], capturePointer(pointer, String(index)));
				} else if (value !== null && typeof value === "object") {
					for (const key of Object.keys(value)) value[key] = visit(value[key], capturePointer(pointer, key));
				}
				return value;
			};
			projection.reported = visit(projection.reported, "");
			if (excluded.size === 0) return;
			projection.numeric_literals = projection.numeric_literals.filter((number) => !excluded.has(number.pointer));
			for (const excludedValue of redaction.redactions) projection.redactions.push(excludedValue);
		};
	})))();
}

//#endregion
//#region dist/browser/history/HistoricalCaptureDecoder.js
var OPERATION$1, HistoricalCaptureDecoder, sharedCaptureDecoderHeap, nodeMemoryLimitation;
function init_HistoricalCaptureDecoder() {
	return (init_HistoricalCaptureDecoder = __esmMin((() => {
		init_JavaScriptWorkerMemoryLimit();
		init_HostPlatform();
		init_CaptureBudgets();
		init_ProtobufCapture();
		init_CaptureFormatError();
		init_CaptureFailures();
		init_captureDecoderHeap();
		init_CaptureRelease();
		init_resources();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_result();
		init_webNetworkCapture();
		init_snapshotEnvironment();
		init_OwnedCommand();
		init_PrivateRuntimeRoot();
		init_OwnedCommandCleanup();
		init_explicitSensitiveFailure();
		init_analysisErrorProjection();
		init_HistoricalCaptureReply();
		init_errorMessage();
		OPERATION$1 = "inspect_web_network_capture";
		HistoricalCaptureDecoder = class {
			adapters;
			environment;
			createRuntime;
			#resources;
			#heap;
			constructor(adapters, environment, createRuntime = () => PrivateRuntimeRoot.create({ prefix: "rea-web-capture-" }), resources = new ArtifactResourceScope()) {
				this.adapters = adapters;
				this.environment = environment;
				this.createRuntime = createRuntime;
				this.#resources = resources;
				const shared = sharedCaptureDecoderHeap(adapters);
				this.#heap = shared ?? resolveCaptureDecoderHeap(environment);
			}
			/** Heap the selected adapter launches, or the shared fallback when it has none. */
			#reportedHeap(adapter) {
				return adapter?.heap ?? this.#heap;
			}
			/** Retry retained readers and private roots at service shutdown. */
			close() {
				return this.#resources.close();
			}
			/** Snapshot the selected artifact, decode it offline, and release private credentials and processes. */
			async inspect(input, options) {
				return withCaptureBudgets(selectedWebNetworkCaptureBudgets(input), async () => {
					try {
						return await this.#resources.run(() => this.inspectAdmitted(input, options));
					} catch (cause) {
						const error = historicalCaptureFailure(input, cause, "capture-read", options, this.#heap);
						return err(redactExplicitFailure(withCaptureReaderCleanup(error, cause), input.sensitive_values));
					}
				});
			}
			async inspectAdmitted(input, options) {
				const selectedEnvironment = snapshotEnvironment(this.environment, HOST_PLATFORM.platform);
				let runtime;
				const runtimeResources = new ArtifactResourceScope();
				let processLease;
				let sourceObservation;
				let result;
				let phase = "capture-read";
				let encodedReplyBytes = 0;
				let reportedHeap = this.#heap;
				let replyFinalization;
				try {
					const selectedAdapter = this.adapters.find((candidate) => candidate.format === input.format);
					const adapter = selectedAdapter?.snapshotConfiguration?.() ?? selectedAdapter;
					reportedHeap = this.#reportedHeap(adapter);
					if (adapter === undefined) throw new AnalysisCapabilityUnavailableError(input.format, OPERATION$1, "No adapter is configured for the selected capture format.");
					const snapshot = await readStableArtifact(input.capture_path, captureBudgets().inputBytes, options?.signal, undefined, this.#resources);
					sourceObservation = {
						kind: "file-snapshot-hash",
						path: input.capture_path,
						sha256: snapshot.sha256,
						bytes: snapshot.bytes.length
					};
					phase = "decoder";
					runtime = await this.createRuntime();
					const snapshotPath = join(runtime.path, "capture.snapshot");
					const requestPath = join(runtime.path, "request.json");
					const replyPath = join(runtime.path, "reply.json");
					await writeFile(snapshotPath, snapshot.bytes, {
						mode: 384,
						flag: "wx",
						...options?.signal === undefined ? {} : { signal: options.signal }
					});
					await writeFile(requestPath, JSON.stringify({
						snapshot_path: snapshotPath,
						reply_path: replyPath,
						sensitive_values: input.sensitive_values,
						budgets: captureBudgets()
					}), {
						mode: 384,
						flag: "wx"
					});
					const command = await adapter.command(requestPath, runtime.path);
					const environment = {
						...selectedEnvironment,
						UV_THREADPOOL_SIZE: "1"
					};
					delete environment.NODE_OPTIONS;
					const completed = await runOwnedCommand({
						...command,
						runId: `rea-web-capture-${randomUUID()}`,
						cwd: runtime.path,
						hostEnvironment: environment
					}, {
						timeoutMs: selectedWebNetworkCaptureTimeoutMs(input.capture_timeout_ms),
						diagnosticBytes: 1024 * 1024,
						...adapter.heap === undefined ? {} : { runtime: "v8" }
					}, options?.signal === undefined ? {} : { signal: options.signal });
					if (completed.memoryLimitReached === true) throw captureMemoryFailure(input, CAPTURE_PROCESS_MEMORY_LIMIT_REASON, undefined, reportedHeap);
					const decodedReply = await readHistoricalCaptureReply(replyPath, input.capture_path, runtimeResources, options?.signal, input.sensitive_values);
					const reply = decodedReply.value;
					encodedReplyBytes = decodedReply.bytes;
					replyFinalization = decodedReply.finalization;
					if (!reply.ok) {
						if (reply.reason === "format") throw new AnalysisInputError(OPERATION$1, undefined, [{
							path: ["capture_path", reply.pointer],
							reason: "invalid_format",
							message: reply.message
						}]);
						if (reply.reason === "fixed-limit") throw fixedCeilingConstraint(OPERATION$1, reply.boundary, reply.message, reply.ceiling);
						const limit = captureLimitForReply(reply.reason);
						if (limit !== undefined) {
							const { parameter, expected } = CAPTURE_LIMITS[limit];
							const budget = webNetworkCaptureBudgetFacts(input, parameter);
							throw new AnalysisInputError(OPERATION$1, {
								diagnostics: { budget },
								remediationAction: webNetworkCaptureBudgetRecovery(input, parameter)
							}, [{
								path: ["capture_path", reply.pointer],
								reason: "out_of_range",
								message: reply.message,
								expected: { [expected]: budget.effective_value }
							}]);
						}
						if (reply.reason === "resource-limit") throw captureMemoryFailure(input, reply.message, undefined, reportedHeap);
						if (reply.reason === "decoder") throw new ProviderAdapterError(input.format, OPERATION$1, { diagnostics: {
							phase: "decoder",
							failure_kind: reply.reason,
							reason: reply.message,
							pointer: reply.pointer
						} });
						if (reply.reason === "unsupported") throw new AnalysisCapabilityUnavailableError(input.format, OPERATION$1, reply.message);
						throw new AnalysisOutputError(OPERATION$1, reply.message, {
							userMessage: `The capture decoder refused a complete reply exceeding ${String(captureBudgets().outputBytes)} bytes: ${reply.message}`,
							remediationAction: webNetworkCaptureBudgetRecovery(input, "max_reply_bytes"),
							diagnostics: {
								maximum_reply_bytes: captureBudgets().outputBytes,
								boundary: "historical-capture-reply",
								budget: webNetworkCaptureBudgetFacts(input, "max_reply_bytes")
							}
						});
					}
					if (reply.value.decoder.id !== adapter.identity.id || reply.value.decoder.name !== adapter.identity.name || reply.value.decoder.version !== adapter.identity.version) throw new AnalysisOutputError(OPERATION$1, "Capture decoder changed the selected upstream profile identity.");
					const common = {
						artifact: {
							path: input.capture_path,
							sha256: snapshot.sha256,
							bytes: snapshot.bytes.length
						},
						runtime_attribution: "unknown",
						limitations: [
							...adapter.limitations ?? [],
							"This is retained producer evidence, without live browser transaction IDs, scenario provenance, execution attribution or deployment authenticity. Recorded URLs are never fetched.",
							"Every record is decoded before selection; no partial success is returned on malformed input or a resource limit.",
							"Known authentication headers/cookies and explicitly marked literal values are excluded. Unknown extension names do not establish sensitivity.",
							`Complete evidence is bounded by a ${String(captureBudgets().inputBytes)}-byte input budget, a ${String(captureBudgets().outputBytes)}-byte reply budget, and a ${String(captureBudgets().depth)}-level nesting cap. Set max_input_bytes, max_reply_bytes or max_nesting_depth explicitly for the next call to change those budgets without restarting REA. capture_timeout_ms is ${String(selectedWebNetworkCaptureTimeoutMs(input.capture_timeout_ms))} ms (omitted means ${String(WEB_NETWORK_CAPTURE_LIMITS.timeoutMs)}). ${nodeMemoryLimitation(reportedHeap)} Mitmproxy decoding uses a 768 MiB Linux address-space limit.`
						]
					};
					if (input.format === "qlog") {
						if (!("qlog" in reply.value)) throw new AnalysisOutputError(OPERATION$1, "Capture decoder omitted qlog transport facts.");
						result = ok({
							...reply.value,
							...common,
							format: "qlog"
						});
					} else {
						if ("qlog" in reply.value) throw new AnalysisOutputError(OPERATION$1, "Capture decoder supplied inapplicable qlog transport facts.");
						result = ok({
							...reply.value,
							...common,
							format: input.format
						});
					}
					if (result.ok) {
						let safePartialSource = false;
						try {
							const prepared = await prepareCaptureProtobuf(result.value, input, options?.signal);
							safePartialSource = true;
							await decodeCaptureProtobuf(result.value, input, this.#resources, prepared, options?.signal, encodedReplyBytes + Buffer.byteLength(JSON.stringify(common)) + 16);
						} catch (cause) {
							const error = cause instanceof CaptureFormatError ? protobufCaptureFailure(input, cause) : historicalCaptureFailure(input, cause, phase, options, reportedHeap);
							if (safePartialSource) error.retainPartialObservation(result.value);
							throw error;
						}
						if (replyFinalization !== undefined) {
							const error = historicalCaptureFailure(input, replyFinalization, phase, options, reportedHeap);
							error.retainPartialObservation(result.value);
							throw error;
						}
					}
				} catch (cause) {
					if (cause instanceof OwnedCommandFailure && cause.cleanupOwner !== undefined) {
						const supervisor = cause.cleanupOwner;
						processLease = new AnalysisCleanupLease(async () => {
							const stopped = await supervisor.stop();
							if (stopped.status === "incomplete") throw new ProviderCleanupError(input.format, cause.resources, { reason: stopped.reason }, {
								operation: OPERATION$1,
								cause: stopped
							});
						}, cause.resources);
						runtimeResources.retain({
							kind: "lease",
							resource: runtime?.path ?? input.capture_path,
							lease: processLease
						});
					}
					const error = retainProcessInspectionCleanup(processInspectionFailure(cause), historicalCaptureFailure(input, cause, phase, options, reportedHeap, processLease), runtimeResources, OPERATION$1);
					if (replyFinalization?.reason === "cancelled" && !(error instanceof AnalysisCancelledError)) {
						const cancellation = historicalCaptureFailure(input, replyFinalization, phase, options, reportedHeap);
						error.retainSecondaryFailure(cancellation, { reply_finalization_error: projectAnalysisError(cancellation) });
					}
					const failure = withCaptureReaderCleanup(error, replyFinalization ?? cause);
					if (processLease !== undefined) new AnalysisCleanupLeaseGroup(failure, [processLease]);
					if (phase === "capture-read") {
						const snapshot = completedStableArtifactObservation(cause, input.capture_path);
						if (snapshot !== undefined) failure.retainPartialObservation(snapshot);
					}
					if (failure.partialObservation === undefined && sourceObservation !== undefined) failure.retainPartialObservation(sourceObservation);
					result = err(redactExplicitFailure(failure, input.sensitive_values));
				}
				const completedCapture = result.ok ? result.value : undefined;
				let cleanupFailure;
				if (runtime !== undefined) {
					const root = runtime;
					const lease = new AnalysisCleanupLease(async () => {
						await runtimeResources.close();
						await root.close();
					}, { get cleanupResources() {
						return [...new Set([root.path, ...runtimeResources.cleanupResources])];
					} });
					const owner = {
						kind: "lease",
						resource: root.path,
						lease
					};
					if (runtimeResources.hasPending) {
						this.#resources.retain(owner);
						cleanupFailure = {
							kind: "failed",
							owner,
							lease,
							cause: new ProviderCleanupError(input.format, lease.cleanupResources ?? [root.path], { reason: "Capture decoder resources must be released before runtime removal." }, { operation: OPERATION$1 })
						};
					} else {
						const cleanup = await this.#resources.release(owner);
						if (cleanup.kind === "failed") cleanupFailure = cleanup;
					}
				}
				if (result.ok && options?.signal?.aborted) result = err(cancelledBy(OPERATION$1, options.signal));
				if (cleanupFailure !== undefined) {
					const cleanupError = new ProviderCleanupError(input.format, [cleanupFailure.owner.resource], {
						capture_path: input.capture_path,
						reason: errorMessage(cleanupFailure.cause)
					}, {
						operation: OPERATION$1,
						cause: cleanupFailure.cause
					});
					const failure = result.ok ? cleanupError : analysisErrorWithCleanupDependencies(result.error, cleanupError, OPERATION$1);
					if (completedCapture !== undefined) failure.retainPartialObservation(completedCapture);
					new AnalysisCleanupLeaseGroup(cleanupError, [cleanupFailure.lease]);
					new AnalysisCleanupLeaseGroup(failure, [cleanupFailure.lease]);
					return err(redactExplicitFailure(failure, input.sensitive_values));
				}
				if (!result.ok && completedCapture !== undefined) result.error.retainPartialObservation(completedCapture);
				return result;
			}
		};
		sharedCaptureDecoderHeap = (adapters) => {
			const heaps = adapters.flatMap((adapter) => adapter.heap === undefined ? [] : [adapter.heap]);
			const first = heaps[0];
			if (first === undefined) return undefined;
			return heaps.every((heap) => heap === first || heap.oldGenerationMiB === first.oldGenerationMiB && heap.source === first.source) ? first : undefined;
		};
		nodeMemoryLimitation = (heap) => {
			const recovery = captureDecoderHeapRecovery(heap);
			if (NODE_CAPTURE_HEAP_ENFORCED) return `HAR/SAZ/qlog use a ${String(heap.oldGenerationMiB)} MiB Node old-generation heap (source ${heap.source}). ${recovery}`;
			const commitLimit = javaScriptWorkerMemoryLimitBytes(heap.oldGenerationMiB);
			return commitLimit === null ? `HAR/SAZ/qlog run on Bun, which does not enforce REA's V8 heap flags. ${recovery}` : `HAR/SAZ/qlog run on Bun, which does not enforce REA's V8 heap flags, under a ${String(commitLimit)}-byte Windows Job Object commit limit. ${recovery}`;
		};
	})))();
}

//#endregion
//#region dist/browser/history/NodeCaptureAdapter.js
var NodeCaptureAdapter;
function init_NodeCaptureAdapter() {
	return (init_NodeCaptureAdapter = __esmMin((() => {
		init_JavaScriptWorkerMemoryLimit();
		init_captureDecoderHeap();
		init_analysisResourceLimits();
		init_CaptureRelease();
		init_CaptureProviderIdentities();
		init_analysisErrorCore();
		NodeCaptureAdapter = class {
			format;
			identity;
			limitations;
			heap;
			/**
			* `environment` is the selected startup environment. Omitted means the
			* default heap, not ambient `process.env`. An invalid setting is refused.
			* `heap` is an already parsed fact and is not read from `environment` again.
			*/
			constructor(format, environment, heap) {
				this.format = format;
				this.heap = heap ?? (environment === undefined ? DEFAULT_CAPTURE_DECODER_HEAP : resolveCaptureDecoderHeap(environment));
				this.identity = format === "har" ? HAR_CAPTURE_PROVIDER_IDENTITY : format === "saz" ? SAZ_CAPTURE_PROVIDER_IDENTITY : QLOG_CAPTURE_PROVIDER_IDENTITY;
				this.limitations = format === "saz" ? [
					"SAZ ordinals follow first session-member occurrence in ZIP directory order, not chronology or numeric session ID.",
					"HTTP fields use byte-preserving Latin-1 text; start-line separators and header delimiters are not projected. Bodies retain stored bytes without transfer/content decoding. Absent and zero-byte HTTP members are null, distinct from empty bodies.",
					"XML preserves node order and attribute/text values, not its original byte serialization. WebSocket and gRPC members retain opaque message-file bytes, not decoded protocol events.",
					"Non-session archive members are inventoried but their content is not decoded."
				] : [];
			}
			async command(requestPath) {
				const memoryLimitBytes = javaScriptWorkerMemoryLimitBytes(this.heap.oldGenerationMiB);
				if (this.format !== "har" && !NODE_CAPTURE_HEAP_ENFORCED && memoryLimitBytes === null) throw new AnalysisCapabilityUnavailableError(this.identity.id, "inspect_web_network_capture", `${this.format} decoding requires an enforced decoder memory limit. Run REA with Node.js on this host.`);
				return {
					command: process.execPath,
					arguments: [
						`--max-old-space-size=${String(this.heap.oldGenerationMiB)}`,
						`--max-semi-space-size=${String(8)}`,
						"--v8-pool-size=1",
						"--single-threaded",
						fileURLToPath(new URL("./NodeCaptureProcess.js", new URL("../browser/history/NodeCaptureAdapter.js", import.meta.url).href)),
						requestPath,
						this.format
					],
					...memoryLimitBytes === null ? {} : { memoryLimitBytes }
				};
			}
		};
	})))();
}

//#endregion
//#region dist/browser/history/MitmproxyCaptureAdapter.js
var OPERATION, MITMDUMP_REQUIREMENT, MitmproxyCaptureAdapter;
function init_MitmproxyCaptureAdapter() {
	return (init_MitmproxyCaptureAdapter = __esmMin((() => {
		init_HostPlatform();
		init_analysisErrorCore();
		init_CaptureProviderIdentities();
		init_snapshotEnvironment();
		OPERATION = "inspect_web_network_capture";
		MITMDUMP_REQUIREMENT = "Native capture decoding requires Linux and an absolute REA_MITMDUMP_COMMAND path to caller-supplied mitmdump 12.2.3; HAR needs no external engine.";
		MitmproxyCaptureAdapter = class MitmproxyCaptureAdapter {
			environment;
			platform;
			format = "mitmproxy";
			identity = MITMPROXY_CAPTURE_PROVIDER_IDENTITY;
			constructor(environment, platform = HOST_PLATFORM.platform) {
				this.environment = environment;
				this.platform = platform;
			}
			snapshotConfiguration() {
				return new MitmproxyCaptureAdapter(snapshotEnvironment(this.environment, this.platform), this.platform);
			}
			async command(requestPath, runtimePath) {
				const command = this.environment.REA_MITMDUMP_COMMAND;
				if (this.platform !== "linux" || command === undefined || !isAbsolute(command)) throw new AnalysisCapabilityUnavailableError("mitmproxy", OPERATION, MITMDUMP_REQUIREMENT, { userMessage: MITMDUMP_REQUIREMENT });
				try {
					await access(command, constants.R_OK | constants.X_OK);
					if (!(await stat(command)).isFile()) throw new TypeError("Configured path is not a regular file");
				} catch (cause) {
					const reason = `Configured mitmdump executable is unavailable: ${command}.`;
					throw new AnalysisCapabilityUnavailableError("mitmproxy", OPERATION, reason, {
						cause,
						userMessage: reason
					});
				}
				return {
					command,
					arguments: [
						"--no-server",
						"-q",
						"--set",
						`confdir=${runtimePath}`,
						"--set",
						`rea_request_path=${requestPath}`,
						"-s",
						fileURLToPath(new URL("../../../bridge/mitmproxy/capture.py", new URL("../browser/history/MitmproxyCaptureAdapter.js", import.meta.url).href))
					]
				};
			}
		};
	})))();
}

//#endregion
//#region dist/composition/webNetworkCaptures.js
var webNetworkCaptures_exports = /* @__PURE__ */ __exportAll({ createWebNetworkCaptureService: () => createWebNetworkCaptureService });
var createWebNetworkCaptureService;
function init_webNetworkCaptures() {
	return (init_webNetworkCaptures = __esmMin((() => {
		init_WebNetworkCaptureService();
		init_HistoricalCaptureDecoder();
		init_NodeCaptureAdapter();
		init_MitmproxyCaptureAdapter();
		init_runtimeAnalysisSettings();
		createWebNetworkCaptureService = (environment = process.env, settings) => {
			const heap = runtimeCaptureDecoderHeap(environment, settings);
			return new WebNetworkCaptureService(new HistoricalCaptureDecoder([
				new NodeCaptureAdapter("har", environment, heap),
				new NodeCaptureAdapter("saz", environment, heap),
				new NodeCaptureAdapter("qlog", environment, heap),
				new MitmproxyCaptureAdapter(environment)
			], environment));
		};
	})))();
}

//#endregion
export { createWebNetworkCaptureService, decodeProtobufWire, init_ProtobufWire, init_webNetworkCaptures, readProtobufVarint, webNetworkCaptures_exports };