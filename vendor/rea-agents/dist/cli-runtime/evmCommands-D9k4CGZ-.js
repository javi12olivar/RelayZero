import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, MAX_NODE_TIMER_DELAY_MS, cancelledBy, carriedReason, deadlineParameterLimit, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_errorMessage, init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, decodeStrictUtf8, init_HostPlatform, init_safeJson, init_strictUtf8, safeParseUtf8Json } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError, projectAnalysisErrorWithoutCapturedOutput } from "./analysisErrorProjection-bycI20-L.js";
import { cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, artifactFileCancellationCause, bindArtifactFileCleanup, completedStableArtifact, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_readStableArtifact, init_resources, readStableArtifact } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { describeLaunchFailure, init_launchFailure } from "./ExecFileOutput-YDVPmL3I.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_contractCommand, inspectWithService, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { DEFAULT_EVM_TIMEOUT_MS, evmInterfaceSchema, evmProducerLimitRecovery, init_evmInterface, init_solidityMetadata, inspectEvmInterfaceInputSchema, selectedEvmProducerLimits, solidityMetadataSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput, providerResultDiagnostics } from "./capturedProviderOutput-DfFM2jt6.js";
import { OwnedCommandFailure, init_OwnedCommand, ownedCommandResources, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { PRODUCER_LIMITS_HELP, init_producerLimitsOption } from "./producerLimitsOption-qOlmwAOk.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { describeLinuxResourceLimitsFailure, init_LinuxResourceLimits, readLinuxResourceLimits } from "./LinuxResourceLimits-vLyr_vuV.js";
import { INSPECT_EVM_INTERFACE_CONTRACT, init_evmToolContracts } from "./evmToolContracts-Ckx5mJFb.js";
import { constants } from "node:fs";
import { isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { access, stat, writeFile } from "node:fs/promises";

//#region dist/domain/evm/evmInterfaceEvidence.js
var evmInterfaceEvidence;
function init_evmInterfaceEvidence() {
	return (init_evmInterfaceEvidence = __esmMin((() => {
		init_evidence();
		evmInterfaceEvidence = (input, execution) => createEvidence(execution.subject, execution.provider, {
			operation: "inspect_evm_interface",
			parameters: {
				path: input.path,
				encoding: input.encoding,
				...input.producer_limits === undefined ? {} : { producer_limits: input.producer_limits },
				...input.timeout_ms === undefined ? {} : { timeout_ms: input.timeout_ms }
			},
			result: execution.result,
			...execution.rawResult === null ? {} : { rawResult: execution.rawResult },
			confidence: "inferred",
			locations: execution.locations,
			limitations: execution.limitations
		});
	})))();
}

//#endregion
//#region dist/application/evm/EvmInterfaceService.js
var OPERATION$2, diagnosticsSchema, EvmInterfaceService;
function init_EvmInterfaceService() {
	return (init_EvmInterfaceService = __esmMin((() => {
		init_analysisErrorCore();
		init_evmInterfaceEvidence();
		init_evmInterface();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		OPERATION$2 = "inspect_evm_interface";
		diagnosticsSchema = z.object({ diagnostics: evmInterfaceSchema.shape.diagnostics });
		EvmInterfaceService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close?.() ?? Promise.resolve();
			}
			/** Preserve selected byte identity while clearly labeling recovered ABI candidates as inferences. */
			async inspect(rawInput, options) {
				const input = parseAnalysisInput(OPERATION$2, rawInput, inspectEvmInterfaceInputSchema, options?.signal);
				if (!input.ok) return input;
				const inspected = await this.provider.inspect(input.value, options);
				if (!inspected.ok) return inspected;
				const diagnostics = diagnosticsSchema.safeParse(inspected.value.result);
				const outputOptions = diagnostics.success ? { capturedOutput: diagnostics.data.diagnostics } : undefined;
				const execution = inspected.value;
				const report = evmInterfaceSchema.safeParse(execution.result);
				if (!report.success || report.data.artifact.path !== input.value.path || report.data.artifact.encoding !== input.value.encoding || execution.subject?.format !== "file" || execution.subject?.path !== input.value.path || execution.subject.sha256 !== report.data.artifact.sha256) return err(new AnalysisOutputError(OPERATION$2, "Interface adapter returned malformed data or changed the selected carrier identity/encoding.", outputOptions));
				return completeProviderEvidence(evmInterfaceEvidence(input.value, execution), options?.signal, outputOptions?.capturedOutput);
			}
		};
	})))();
}

//#endregion
//#region dist/evm/EvmAdmissionError.js
var EVM_ADMISSION_CODES, EvmAdmissionError;
function init_EvmAdmissionError() {
	return (init_EvmAdmissionError = __esmMin((() => {
		EVM_ADMISSION_CODES = [
			"prlimit_not_absolute",
			"prlimit_not_file",
			"cleanup_incomplete",
			"cleanup_unconfirmed",
			"marker_mismatch",
			"request_path_missing",
			"tag_or_float",
			"text_bytes_unavailable",
			"collection_exceeds_bound",
			"nesting_exceeds_profile",
			"value_outside_profile",
			"repeated_map_key",
			"root_not_map"
		];
		EvmAdmissionError = class extends Error {
			code;
			detail;
			_tag = "EvmAdmissionError";
			constructor(code, detail, options) {
				super(code, options);
				this.code = code;
				this.detail = detail;
				this.name = "EvmAdmissionError";
			}
		};
	})))();
}

//#endregion
//#region dist/evm/EvmoleRelease.js
var EVM_FILE_SIZE_FAILURE_EXIT, EVM_WORKER_HEAP_MIB;
function init_EvmoleRelease() {
	return (init_EvmoleRelease = __esmMin((() => {
		EVM_FILE_SIZE_FAILURE_EXIT = 76;
		EVM_WORKER_HEAP_MIB = 256;
	})))();
}

//#endregion
//#region dist/evm/EvmoleProviderIdentity.js
var EVMOLE_PROVIDER_IDENTITY;
function init_EvmoleProviderIdentity() {
	return (init_EvmoleProviderIdentity = __esmMin((() => {
		EVMOLE_PROVIDER_IDENTITY = {
			id: "evmole-interface",
			name: "REA EVM interface adapter",
			version: "evmole@0.9.3"
		};
	})))();
}

//#endregion
//#region dist/evm/EvmoleFailures.js
var OPERATION$1, evmReplyBudgetFailure, evmTimeoutRecovery, evmFailureDialect, evmCommandContext, evmWorkerDiagnostics, configuredWorkerLimits;
function init_EvmoleFailures() {
	return (init_EvmoleFailures = __esmMin((() => {
		init_analysisResourceLimits();
		init_capturedProviderOutput();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_launchFailure();
		init_evmInterface();
		init_EvmoleRelease();
		init_EvmoleProviderIdentity();
		init_errorMessage();
		OPERATION$1 = "inspect_evm_interface";
		evmReplyBudgetFailure = (reason, options, limits = selectedEvmProducerLimits(undefined)) => new AnalysisResourceConstraintError(OPERATION$1, "file-size", reason, {
			maximum_reply_bytes: limits.output_bytes,
			parameter: "producer_limits.output_bytes"
		}, {
			...options,
			retryable: false,
			remediationAction: evmProducerLimitRecovery(limits, "output_bytes")
		});
		evmTimeoutRecovery = (timeoutMs) => `${timeoutMs < 2147483647 ? `Increase timeout_ms above ${String(timeoutMs)} (integer milliseconds, maximum ${String(MAX_NODE_TIMER_DELAY_MS)}).` : `timeout_ms is already at the maximum supported ${String(MAX_NODE_TIMER_DELAY_MS)} ms; no higher worker deadline is supported. Report this blocker or select another suitable complete carrier with caller approval.`} This is a per-call setting; no server restart is needed. It covers the owned EVMole worker command, not carrier acquisition or final reply reads. Allow the MCP client deadline to cover acquisition, the worker, reply reads, cleanup and delivery; increasing only that client deadline does not change this budget. Separate producer_limits control carrier/reply/diagnostic bytes, address-space/file bytes and CPU seconds; timeout_ms does not raise them. The 256 MiB worker heap stays independent. Resolve any incomplete cleanup before retrying; do not repeat the unchanged failed call.`;
		evmFailureDialect = (context) => {
			const resolved = {
				...context,
				limiter: context.limiter ?? "/usr/bin/prlimit",
				timeoutMs: context.timeoutMs ?? 3e4,
				producerLimits: context.producerLimits ?? selectedEvmProducerLimits(undefined)
			};
			const { phase, path, producerLimits } = resolved;
			return {
				providerId: EVMOLE_PROVIDER_IDENTITY.id,
				operation: OPERATION$1,
				command: () => evmCommandContext(resolved),
				...phase === "artifact-read" ? { file: {
					path,
					description: "bytecode carrier",
					retainCompletedIdentity: true,
					fileSize: (limit, details) => new AnalysisResourceConstraintError(OPERATION$1, "file-size", `${limit.message} producer_limits.input_bytes is ${String(producerLimits.input_bytes)} bytes; timeout_ms does not raise it.`, {
						maximum_input_bytes: producerLimits.input_bytes,
						parameter: "producer_limits.input_bytes"
					}, {
						...details,
						retryable: false,
						remediationAction: evmProducerLimitRecovery(producerLimits, "input_bytes")
					})
				} } : {},
				unclassified: (unrecognised, details) => new ProviderAdapterError(EVMOLE_PROVIDER_IDENTITY.id, OPERATION$1, {
					...details,
					cause: unrecognised,
					diagnostics: {
						...evmWorkerDiagnostics(context),
						reason: errorMessage(unrecognised)
					}
				})
			};
		};
		evmCommandContext = (context) => {
			const { workerLimits, limiter, fileFailure, timeoutMs, producerLimits } = context;
			return {
				operation: OPERATION$1,
				capturedOutput: capturedProviderOutput,
				timeout: {
					ms: timeoutMs,
					userMessage: `The EVMole worker reached its ${String(timeoutMs)} ms server/provider deadline (timeout_ms). This is not a carrier-read or MCP client deadline. Omitted timeout_ms uses ${String(DEFAULT_EVM_TIMEOUT_MS)} ms.`,
					remediationAction: evmTimeoutRecovery(timeoutMs),
					limit: deadlineParameterLimit("timeout_ms", timeoutMs, DEFAULT_EVM_TIMEOUT_MS)
				},
				outputLimit: {
					limits: {
						maximum_diagnostic_bytes: producerLimits.diagnostic_bytes,
						parameter: "producer_limits.diagnostic_bytes"
					},
					recovery: {
						retryable: false,
						remediationAction: evmProducerLimitRecovery(producerLimits, "diagnostic_bytes")
					}
				},
				resourceSignal: (signal) => ({
					limits: configuredWorkerLimits(workerLimits),
					recovery: {
						retryable: false,
						remediationAction: evmProducerLimitRecovery(producerLimits, signal === "SIGXCPU" ? "cpu_seconds" : "file_bytes")
					}
				}),
				runtimeExhaustion: () => ({
					limits: { worker_heap_mib: 256 },
					recovery: {
						retryable: false,
						remediationAction: `The EVMole worker's ${String(256)} MiB heap is fixed in this release; producer_limits and timeout_ms do not raise it. Select a smaller bytecode carrier; repeating the unchanged request is expected to fail the same way.`
					}
				}),
				launchUnavailable: (failure, details) => {
					const reason = `Configured util-linux prlimit could not launch (${describeLaunchFailure(failure)}): ${limiter}. Check its executable/interpreter and host execute access.`;
					return new AnalysisCapabilityUnavailableError(EVMOLE_PROVIDER_IDENTITY.id, OPERATION$1, reason, {
						...details,
						userMessage: reason
					});
				},
				dialect: (outcome, details, unclassified) => {
					if (outcome.kind === "exited" && fileFailure?.verified === true && outcome.exitCode === 76 && outcome.signal === null) return new AnalysisResourceConstraintError(OPERATION$1, "file-size", "Owned EVM worker reported EFBIG while writing its reply; the exact write failure cause is unknown. Effective worker limits are unknown. Configured soft limits are retained separately.", configuredWorkerLimits(workerLimits), {
						...details,
						retryable: false,
						remediationAction: evmProducerLimitRecovery(producerLimits, "file_bytes")
					});
					return unclassified({ diagnostics: evmWorkerDiagnostics(context) });
				}
			};
		};
		evmWorkerDiagnostics = ({ phase, path, workerLimits, fileFailure }) => ({
			phase,
			path,
			...workerLimits === undefined ? {} : { configured_resource_limits: {
				addressSpaceBytes: workerLimits.address_space_bytes,
				cpuSeconds: workerLimits.cpu_seconds,
				fileSizeBytes: workerLimits.file_bytes
			} },
			...fileFailure === undefined ? {} : { file_size_failure_marker: { ...fileFailure } }
		});
		configuredWorkerLimits = (workerLimits) => workerLimits === undefined ? null : {
			configured_soft_limits: {
				address_space_bytes: workerLimits.address_space_bytes,
				cpu_seconds: workerLimits.cpu_seconds,
				file_size_bytes: workerLimits.file_bytes
			},
			effective_soft_limits: null
		};
	})))();
}

//#endregion
//#region dist/evm/EvmoleInterfaceAdapter.js
var offset, reportedMetadata, evmoleInterfaceReplySchema, projectEvmoleFunctions;
function init_EvmoleInterfaceAdapter() {
	return (init_EvmoleInterfaceAdapter = __esmMin((() => {
		offset = z.int().nonnegative();
		reportedMetadata = z.strictObject({
			bytecodeOffset: offset,
			cborLength: offset,
			entries: z.array(z.strictObject({
				key: z.string(),
				value: z.discriminatedUnion("type", [
					z.strictObject({
						type: z.literal("string"),
						value: z.string()
					}),
					z.strictObject({
						type: z.literal("integer"),
						value: z.number().refine(Number.isInteger, "Expected an integer")
					}),
					z.strictObject({
						type: z.literal("bytes"),
						value: z.string()
					}),
					z.strictObject({
						type: z.literal("bool"),
						value: z.boolean()
					}),
					z.strictObject({
						type: z.literal("undecoded"),
						value: z.string()
					})
				])
			}))
		});
		evmoleInterfaceReplySchema = z.strictObject({
			storage: z.undefined().optional(),
			transientStorage: z.undefined().optional(),
			disassembled: z.undefined().optional(),
			basicBlocks: z.undefined().optional(),
			controlFlowGraph: z.undefined().optional(),
			metadata: reportedMetadata.optional(),
			functions: z.array(z.strictObject({
				selector: z.string().regex(/^[a-f0-9]{8}$/),
				bytecodeOffset: offset,
				dispatch: z.enum(["abi", "fallback"]),
				arguments: z.string().optional(),
				stateMutability: z.string().optional()
			})).optional()
		});
		projectEvmoleFunctions = (producer) => (producer.functions ?? []).map((fn) => ({
			selector: `0x${fn.selector}`,
			bytecode_offset: fn.bytecodeOffset,
			dispatch: fn.dispatch,
			inferred_arguments: fn.arguments ?? null,
			inferred_state_mutability: fn.stateMutability ?? null
		}));
	})))();
}

//#endregion
//#region dist/evm/EvmBytecodeCarrier.js
var EvmCarrierFailure, asciiWhitespace, decodeEvmBytecodeCarrier;
function init_EvmBytecodeCarrier() {
	return (init_EvmBytecodeCarrier = __esmMin((() => {
		init_strictUtf8();
		EvmCarrierFailure = class extends Error {};
		asciiWhitespace = (code) => code === 32 || code >= 9 && code <= 13;
		decodeEvmBytecodeCarrier = (bytes, encoding) => {
			if (encoding === "raw") return Uint8Array.from(bytes);
			let text;
			try {
				text = decodeStrictUtf8(bytes, "preserve");
			} catch (cause) {
				throw new EvmCarrierFailure("Hex carrier must be valid UTF-8.", { cause });
			}
			let start = 0;
			let end = text.length;
			while (start < end && asciiWhitespace(text.charCodeAt(start))) start += 1;
			while (end > start && asciiWhitespace(text.charCodeAt(end - 1))) end -= 1;
			const code = text.slice(start, end).replace(/^0x/i, "");
			if (!/^(?:[a-fA-F0-9]{2})*$/.test(code)) throw new EvmCarrierFailure("Hex carrier requires complete hexadecimal byte pairs, an optional 0x prefix and outer ASCII whitespace; interior separators are invalid.");
			return Uint8Array.from(Buffer.from(code, "hex"));
		};
	})))();
}

//#endregion
//#region dist/evm/EvmoleInterfaceProvider.js
var OPERATION, abortedFailure, HOST_REQUIREMENT, evmHostSupported, EVM_PRLIMIT_COMMAND_DEFAULT, selectEvmLimiter, evmLimiterAvailability, replySchema, ownerCleanupMarker, bindEvmCleanupOwners, retainedCleanupFailure, inheritedLimitsDialect, compactErrorProjection, evmCleanupFailure, evmReplyCompletionFailure, EvmoleInterfaceProvider;
function init_EvmoleInterfaceProvider() {
	return (init_EvmoleInterfaceProvider = __esmMin((() => {
		init_capturedProviderOutput();
		init_EvmAdmissionError();
		init_HostPlatform();
		init_snapshotEnvironment();
		init_safeJson();
		init_classifyProviderFailure();
		init_AnalysisProvider();
		init_resources();
		init_analysisErrorCleanup();
		init_OwnedCommand();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_SignalAbort();
		init_analysisErrorProjection();
		init_evmInterfaceEvidence();
		init_evmInterface();
		init_solidityMetadata();
		init_providerAdapterError();
		init_providerCleanupError();
		init_result();
		init_PrivateRuntimeRoot();
		init_LinuxResourceLimits();
		init_EvmoleFailures();
		init_EvmoleInterfaceAdapter();
		init_EvmoleRelease();
		init_EvmoleProviderIdentity();
		init_EvmBytecodeCarrier();
		init_errorMessage();
		init_sha256Hex();
		OPERATION = "inspect_evm_interface";
		abortedFailure = (signal, retainedOutput) => cancelledBy(OPERATION, signal, retainedOutput === undefined ? {} : { capturedOutput: retainedOutput });
		HOST_REQUIREMENT = "Initial real-verified offline EVM interface profile supports Linux x64 only.";
		evmHostSupported = (platform, arch) => platform === "linux" && arch === "x64";
		EVM_PRLIMIT_COMMAND_DEFAULT = "/usr/bin/prlimit";
		selectEvmLimiter = async (environment, probes, signal, operation = OPERATION) => {
			const throwIfAborted = () => {
				if (signal?.aborted) throw cancelledBy(operation, signal);
			};
			throwIfAborted();
			const { platform, arch } = probes;
			if (!evmHostSupported(platform, arch)) return undefined;
			const path = environment.REA_EVM_PRLIMIT_COMMAND ?? EVM_PRLIMIT_COMMAND_DEFAULT;
			const diagnostics = {
				limiter_path: path,
				platform,
				arch
			};
			try {
				if (!isAbsolute(path)) throw new EvmAdmissionError("prlimit_not_absolute", { setting: "REA_EVM_PRLIMIT_COMMAND" });
				const fs = probes.fs ?? {
					access,
					stat
				};
				await fs.access(path, constants.X_OK);
				throwIfAborted();
				if (!(await fs.stat(path)).isFile()) throw new EvmAdmissionError("prlimit_not_file");
				throwIfAborted();
				return ok({
					path,
					diagnostics
				});
			} catch (cause) {
				throwIfAborted();
				if (cause instanceof EvmAdmissionError) return err({
					path,
					code: "not_configured",
					diagnostics: {
						...diagnostics,
						code: cause.code,
						...cause.detail
					},
					reason: `Set REA_EVM_PRLIMIT_COMMAND to an absolute executable regular file for caller-supplied util-linux prlimit. The selected path ${path} ${cause.code === "prlimit_not_absolute" ? "is not absolute" : "is not a regular file"}.`,
					cause
				});
				const systemCode = cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
				const permissionDenied = systemCode === "EACCES" || systemCode === "EPERM";
				const missing = systemCode === "ENOENT" || systemCode === "ENOTDIR";
				const recovery = permissionDenied ? "Grant execute permission and filesystem access to the selected file, or set REA_EVM_PRLIMIT_COMMAND to an accessible absolute executable regular file for util-linux prlimit." : missing ? "Set REA_EVM_PRLIMIT_COMMAND to an existing absolute executable regular file for util-linux prlimit." : "Check the selected file and filesystem access, or set REA_EVM_PRLIMIT_COMMAND to an accessible absolute executable regular file for util-linux prlimit.";
				const reason = `Offline EVM interface inspection requires caller-supplied util-linux prlimit: ${path}; ${errorMessage(cause)}. ${recovery}`;
				return err({
					path,
					code: missing ? "executable_missing" : "runtime_unavailable",
					diagnostics: {
						...diagnostics,
						...systemCode === undefined ? {} : { system_code: systemCode }
					},
					reason,
					cause
				});
			}
		};
		evmLimiterAvailability = async (environment, probes) => {
			const selected = await selectEvmLimiter(environment, probes, probes.signal, "binary_session");
			if (selected === undefined) return undefined;
			return selected.ok ? {
				status: "available",
				code: null,
				reason: null,
				diagnostics: selected.value.diagnostics
			} : {
				status: "unavailable",
				code: selected.error.code,
				reason: selected.error.reason,
				remediation: selected.error.reason,
				diagnostics: selected.error.diagnostics
			};
		};
		replySchema = z.discriminatedUnion("ok", [z.strictObject({
			ok: z.literal(true),
			version: z.literal("0.9.3"),
			bytecode: z.strictObject({
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				bytes: z.int().nonnegative(),
				hex: z.string().regex(/^(?:[a-f0-9]{2})*$/),
				metadata: solidityMetadataSchema.optional()
			}),
			raw: evmoleInterfaceReplySchema
		}), z.strictObject({
			ok: z.literal(false),
			reason: z.enum([
				"format",
				"decoder",
				"output-limit",
				"unsupported"
			]),
			message: z.string()
		})]);
		ownerCleanupMarker = (owners) => new ProviderCleanupError(EVMOLE_PROVIDER_IDENTITY.id, owners.flatMap((owner) => owner.cleanupResources ?? ["owned-EVM-resource"]), { reason: "Exact EVM cleanup owners have not confirmed release." }, { operation: OPERATION });
		bindEvmCleanupOwners = (failure, owners, primary) => {
			const marker = ownerCleanupMarker(owners);
			new AnalysisCleanupLeaseGroup(marker, owners);
			failure.bindCleanupDependencies([marker, ...primary?.cleanupIncomplete === true ? [primary] : []]);
		};
		retainedCleanupFailure = (cause) => {
			if (cause instanceof ProviderCleanupError) return cause;
			if (cause instanceof ArtifactReaderFailure) {
				const observation = ArtifactReaderFailure.cleanupObservation(cause, "EVM artifact resources");
				const failure = new ProviderCleanupError(EVMOLE_PROVIDER_IDENTITY.id, observation.resources.length === 0 ? ["EVM artifact resources"] : observation.resources, { reason: observation.reason }, {
					operation: OPERATION,
					cause
				});
				bindArtifactFileCleanup(cause, failure);
				return failure;
			}
			return new ProviderCleanupError(EVMOLE_PROVIDER_IDENTITY.id, cause instanceof AnalysisError && cause.cleanupResources.length > 0 ? cause.cleanupResources : ["EVM provider cleanup"], { reason: errorMessage(cause) }, {
				operation: OPERATION,
				cause,
				...cause instanceof AnalysisError ? { cleanupPrimary: cause } : {}
			});
		};
		inheritedLimitsDialect = {
			providerId: EVMOLE_PROVIDER_IDENTITY.id,
			operation: OPERATION,
			readCleanup: (read, primary) => {
				const cleanup = retainedCleanupFailure(read);
				return primary === undefined ? cleanup : analysisErrorWithCleanupDependencies(primary, cleanup, OPERATION);
			},
			unclassified: (failure, details) => {
				const reason = describeLinuxResourceLimitsFailure(failure);
				return new AnalysisCapabilityUnavailableError(EVMOLE_PROVIDER_IDENTITY.id, OPERATION, reason, {
					...details,
					cause: failure,
					userMessage: reason
				});
			}
		};
		compactErrorProjection = (error) => {
			const projection = projectAnalysisError(error);
			if (error.capturedOutput === undefined) return projection;
			const details = { ...projection.details };
			delete details.captured_output;
			return {
				...projection,
				details
			};
		};
		evmCleanupFailure = (input, result, resources, reason, output, cause) => {
			const partialObservation = result.ok ? evmInterfaceEvidence(input, result.value) : result.error.partialObservation;
			const capturedOutput = result.ok ? output : result.error.capturedOutput ?? output;
			return new ProviderCleanupError(EVMOLE_PROVIDER_IDENTITY.id, resources, {
				reason,
				previous_error: result.ok ? null : compactErrorProjection(result.error),
				...capturedOutput === undefined ? {} : { captured_output: { ...capturedOutput } }
			}, {
				operation: OPERATION,
				...result.ok ? {} : { cleanupPrimary: result.error },
				...cause === undefined ? {} : { cause },
				...partialObservation === undefined ? {} : { partialObservation }
			});
		};
		evmReplyCompletionFailure = (cause, capturedOutput) => {
			const cancellation = cause.reason === "cancelled" ? cancelledBy(OPERATION, carriedReason(artifactFileCancellationCause(cause)), { capturedOutput }) : undefined;
			if (cause.cleanup === undefined) {
				if (cancellation !== undefined) return cancellation;
				return new AnalysisOutputError(OPERATION, "Owned EVM reply finalization failed.", {
					cause,
					capturedOutput
				});
			}
			const cleanup = new ProviderCleanupError(EVMOLE_PROVIDER_IDENTITY.id, cause.cleanup.resources, {
				phase: "reply_descriptor_close",
				reason: cause.cleanup.reason
			}, {
				operation: OPERATION,
				cause,
				capturedOutput
			});
			bindArtifactFileCleanup(cause, cleanup);
			return cancellation === undefined ? cleanup : analysisErrorWithCleanupDependencies(cancellation, cleanup, OPERATION);
		};
		EvmoleInterfaceProvider = class {
			environment;
			launcher;
			createRuntime;
			host;
			#resources = new ArtifactResourceScope();
			#resourceScopeLease;
			#tail = Promise.resolve();
			#closing = false;
			#closePromise;
			#pendingCleanup;
			#artifactScopeLease() {
				if (this.#resourceScopeLease !== undefined) return this.#resourceScopeLease;
				const provider = this;
				const owner = {
					close: () => provider.#resources.close(),
					get cleanupResources() {
						return provider.#resources.cleanupResources;
					}
				};
				this.#resourceScopeLease = AnalysisCleanupLease.forCloseOwner(owner, "EVM artifact resources");
				return this.#resourceScopeLease;
			}
			constructor(environment = process.env, launcher, createRuntime = () => PrivateRuntimeRoot.create({ prefix: "rea-evm-interface-" }), host = HOST_PLATFORM) {
				this.environment = environment;
				this.launcher = launcher;
				this.createRuntime = createRuntime;
				this.host = host;
			}
			/** Bind recovered interface candidates to both original carrier and decoded byte identity. */
			inspect(input, options) {
				if (this.#closing) return Promise.resolve(err(this.#closedError()));
				const operation = this.#tail.then(async () => {
					if (this.#closing) return err(this.#closedError());
					const environment = snapshotEnvironment(this.environment, this.host.platform);
					try {
						return await this.#resources.run(() => this.#inspect(input, environment, options));
					} catch (cause) {
						const failure = classifyProviderFailure(cause, evmFailureDialect({
							phase: "artifact-read",
							path: input.path,
							limiter: environment.REA_EVM_PRLIMIT_COMMAND ?? EVM_PRLIMIT_COMMAND_DEFAULT,
							timeoutMs: input.timeout_ms ?? 3e4,
							producerLimits: selectedEvmProducerLimits(input.producer_limits)
						}));
						return err(failure);
					}
				});
				this.#tail = operation.then(() => undefined, () => undefined);
				return operation;
			}
			async #inspect(input, environment, options) {
				const pending = await this.#retire();
				if (pending !== undefined) return err(pending);
				let root;
				let rootLease;
				let processOwner;
				let processCleanup;
				const processLeases = new WeakMap();
				const processLeaseFor = (owner) => {
					let lease = processLeases.get(owner);
					if (lease === undefined) {
						lease = new AnalysisCleanupLease(async () => {
							const stopped = await owner.stop();
							if (stopped.status === "incomplete" || stopped.status === "not-owned") throw new EvmAdmissionError(stopped.status === "incomplete" ? "cleanup_incomplete" : "cleanup_unconfirmed", stopped.status === "incomplete" ? { reason: stopped.reason } : undefined, { cause: stopped });
						}, owner.launch.ownership === undefined ? ["owned-worker"] : ownedCommandResources(owner.launch.ownership, root?.path));
						processLeases.set(owner, lease);
					}
					return lease;
				};
				const rootLeaseFor = (owner) => {
					rootLease ??= AnalysisCleanupLease.forCloseOwner(owner, owner.path);
					return rootLease;
				};
				const timeoutMs = input.timeout_ms ?? 3e4;
				const producerLimits = selectedEvmProducerLimits(input.producer_limits);
				let retainedOutput;
				let replyFinalization;
				let phase = "configuration";
				let workerLimits;
				let limiter = environment.REA_EVM_PRLIMIT_COMMAND ?? EVM_PRLIMIT_COMMAND_DEFAULT;
				let result;
				try {
					if (options?.signal?.aborted) throw cancelledBy(OPERATION, options.signal);
					if (!evmHostSupported(this.host.platform, this.host.architecture)) throw new AnalysisCapabilityUnavailableError(EVMOLE_PROVIDER_IDENTITY.id, OPERATION, HOST_REQUIREMENT, { userMessage: HOST_REQUIREMENT });
					const selectedLimiter = await selectEvmLimiter(environment, {
						platform: this.host.platform,
						arch: this.host.architecture
					}, options?.signal);
					if (selectedLimiter === undefined) throw new AnalysisCapabilityUnavailableError(EVMOLE_PROVIDER_IDENTITY.id, OPERATION, HOST_REQUIREMENT, { userMessage: HOST_REQUIREMENT });
					if (!selectedLimiter.ok) {
						limiter = selectedLimiter.error.path;
						throw new AnalysisCapabilityUnavailableError(EVMOLE_PROVIDER_IDENTITY.id, OPERATION, selectedLimiter.error.reason, {
							cause: selectedLimiter.error.cause,
							diagnostics: selectedLimiter.error.diagnostics,
							userMessage: selectedLimiter.error.reason
						});
					}
					limiter = selectedLimiter.value.path;
					try {
						workerLimits = await readLinuxResourceLimits(producerLimits, this.#resources, options?.signal);
					} catch (cause) {
						throw classifyProviderFailure(cause, inheritedLimitsDialect);
					}
					phase = "artifact-read";
					const carrier = await readStableArtifact(input.path, producerLimits.input_bytes, options?.signal, undefined, this.#resources);
					phase = "worker";
					root = await this.createRuntime();
					rootLeaseFor(root);
					const snapshotPath = join(root.path, "carrier.snapshot");
					const requestPath = join(root.path, "request.json");
					const replyPath = join(root.path, "reply.json");
					await writeFile(snapshotPath, carrier.bytes, {
						flag: "wx",
						mode: 384,
						...options?.signal === undefined ? {} : { signal: options.signal }
					});
					await writeFile(requestPath, JSON.stringify({
						snapshot_path: snapshotPath,
						reply_path: replyPath,
						failure_marker_path: join(root.path, "resource.failure"),
						encoding: input.encoding,
						producer_limits: producerLimits
					}), {
						flag: "wx",
						mode: 384
					});
					const { NODE_OPTIONS: _ambientNodeOptions, ...workerEnvironment } = environment;
					const execution = await runOwnedCommand({
						command: limiter,
						arguments: [
							`--as=${String(workerLimits.address_space_bytes)}:`,
							`--fsize=${String(workerLimits.file_bytes)}:`,
							"--core=0:",
							`--cpu=${String(workerLimits.cpu_seconds)}:`,
							"--",
							process.execPath,
							`--max-old-space-size=${String(256)}`,
							"--v8-pool-size=1",
							"--disable-wasm-trap-handler",
							fileURLToPath(new URL("./EvmoleInterfaceWorker.js", new URL("../evm/EvmoleInterfaceProvider.js", import.meta.url).href)),
							requestPath
						],
						cwd: root.path,
						expectedCommand: null,
						runId: `rea-evm-interface-${randomUUID()}`,
						hostEnvironment: workerEnvironment
					}, {
						timeoutMs,
						diagnosticBytes: producerLimits.diagnostic_bytes,
						runtime: "v8"
					}, {
						...options?.signal === undefined ? {} : { signal: options.signal },
						...this.launcher === undefined ? {} : { launcher: this.launcher },
						retainCleanup: (owner, cleanup) => {
							processOwner = owner;
							processLeaseFor(owner);
							processCleanup = {
								reason: cleanup.reason,
								resources: owner.launch.ownership === undefined ? ["owned-worker"] : ownedCommandResources(owner.launch.ownership, root?.path)
							};
						}
					});
					const capturedOutput = capturedProviderOutput(execution);
					retainedOutput = capturedOutput;
					let reply;
					try {
						let file;
						try {
							file = await readStableArtifact(replyPath, producerLimits.output_bytes, options?.signal, undefined, this.#resources);
						} catch (cause) {
							const completed = completedStableArtifact(cause);
							if (!(cause instanceof ArtifactReaderFailure) || completed === undefined) throw cause;
							file = completed;
							replyFinalization = evmReplyCompletionFailure(cause, capturedOutput);
						}
						const decoded = safeParseUtf8Json(file.bytes);
						if (!decoded.ok) throw decoded.cause;
						reply = replySchema.parse(decoded.value);
					} catch (cause) {
						const cleanup = cause instanceof ArtifactReaderFailure ? cause.cleanup : undefined;
						if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") {
							const failure = cancelledBy(OPERATION, carriedReason(artifactFileCancellationCause(cause)), {
								capturedOutput,
								...cleanup === undefined ? {} : { cleanup }
							});
							if (cause instanceof ArtifactReaderFailure) bindArtifactFileCleanup(cause, failure);
							throw failure;
						}
						const failure = cause instanceof ArtifactReaderFailure && cause.reason === "limit" && cause.boundary === "file-size" ? evmReplyBudgetFailure(cause.message, {
							cause,
							capturedOutput,
							...cleanup === undefined ? {} : { cleanup }
						}, producerLimits) : new AnalysisOutputError(OPERATION, `Owned interface worker reply failed for ${input.path}: ${errorMessage(cause)}`, {
							cause,
							capturedOutput,
							...cleanup === undefined ? {} : { cleanup }
						});
						if (cause instanceof ArtifactReaderFailure) bindArtifactFileCleanup(cause, failure);
						throw failure;
					}
					if (!reply.ok) {
						if (reply.reason === "unsupported") throw new AnalysisUnsupportedTargetError(OPERATION, input.path, reply.message, { capturedOutput });
						if (reply.reason === "format") throw new AnalysisInputError(OPERATION, { capturedOutput }, [{
							path: ["path"],
							reason: "invalid_format",
							message: reply.message
						}]);
						if (reply.reason === "output-limit") throw evmReplyBudgetFailure(reply.message, { capturedOutput }, producerLimits);
						throw new ProviderAdapterError(EVMOLE_PROVIDER_IDENTITY.id, OPERATION, { diagnostics: {
							phase,
							failure_kind: reply.reason,
							reason: reply.message,
							stdout: capturedOutput.stdout,
							stderr: capturedOutput.stderr,
							captured_output: { ...capturedOutput }
						} });
					}
					const selectedBytes = decodeEvmBytecodeCarrier(carrier.bytes, input.encoding);
					const selectedHex = Buffer.from(selectedBytes).toString("hex");
					const decodedHash = sha256Hex(selectedBytes);
					if (decodedHash !== reply.bytecode.sha256 || selectedHex !== reply.bytecode.hex || selectedBytes.length !== reply.bytecode.bytes) throw new AnalysisOutputError(OPERATION, "Decoded bytecode representation does not match the selected carrier, encoding or reported SHA-256.", { capturedOutput });
					const limitations = [
						`Configured worker resource soft limits: address_space_bytes=${String(workerLimits.address_space_bytes)}, cpu_seconds=${String(workerLimits.cpu_seconds)}, file_size_bytes=${String(workerLimits.file_bytes)}. Selected from inherited tighter limits; original hard limits are retained. Effective worker limits are not independently probed.`,
						"Upstream may also report terminal metadata while recovering selectors. Its reported values are retained in raw_result, but integer precision and non-text-key coverage are unknown in the JS binding; complete original bytecode remains available.",
						"Recovered selectors, argument strings and mutability are upstream inferences, not verified ABI signatures or names. Empty results do not prove the absence of callable dispatch.",
						"Bytecode kind, hardfork and deployed-contract authenticity are unknown. This inspection performs no target runtime execution, chain/RPC lookup or network request.",
						"Original carrier and decoded bytecode SHA-256 are distinct identities; SHA-256 is not the Ethereum Keccak code hash.",
						"Terminal CBOR metadata is an independently decoded candidate, not proof of Solidity origin, source identity or deployment. Nested or unsupported values retain explicit unavailable interpretation and original byte ranges.",
						`The owned worker has a 256 MiB JavaScript heap. The profile maxima are ${String(producerLimits.address_space_bytes)} address-space bytes and ${String(producerLimits.cpu_seconds)} CPU seconds; the configured soft limits above retain tighter inherited limits. The command deadline is timeout_ms at ${String(timeoutMs)} ms (default ${String(DEFAULT_EVM_TIMEOUT_MS)}). producer_limits can change those requested byte, address-space and CPU allowances on the next call without restart; timeout_ms does not raise them. The 256 MiB worker heap remains independent. Virtual address space is distinct from resident memory; limits fail without partial success.`
					];
					const validated = evmInterfaceSchema.safeParse({
						artifact: {
							path: input.path,
							sha256: carrier.sha256,
							bytes: carrier.bytes.length,
							encoding: input.encoding
						},
						bytecode: {
							...reply.bytecode,
							digest_algorithm: "sha256",
							kind: "unknown",
							deployment_authenticity: "unknown",
							hardfork: "unknown"
						},
						evidence_kind: "inferred",
						functions: projectEvmoleFunctions(reply.raw),
						discovery_completeness: "unknown",
						runtime_execution: "not-performed",
						diagnostics: providerResultDiagnostics(capturedOutput),
						limitations
					});
					if (!validated.success) throw new AnalysisOutputError(OPERATION, `Interface worker returned invalid bytecode-relative evidence: ${validated.error.issues[0]?.message ?? "schema mismatch"}`, { capturedOutput });
					const report = validated.data;
					result = ok(createAnalysisExecution(report, EVMOLE_PROVIDER_IDENTITY, {
						rawResult: reply.raw,
						subject: {
							path: input.path,
							format: "file",
							sha256: carrier.sha256
						},
						locations: [{
							kind: "artifact-path",
							path: input.path
						}],
						limitations
					}));
				} catch (cause) {
					if (cause instanceof OwnedCommandFailure && cause.cleanupOwner !== undefined) {
						processOwner = cause.cleanupOwner;
						processLeaseFor(cause.cleanupOwner);
					}
					let fileFailure;
					let markerCleanupFailure;
					if (cause instanceof OwnedCommandFailure && cause.snapshot?.exitCode === 76 && cause.snapshot.signal === null && cause.cleanupOwner === undefined && cause.cleanupFailure === null && processOwner === undefined && root !== undefined) {
						try {
							let marker;
							try {
								marker = await readStableArtifact(join(root.path, "resource.failure"), 1, undefined, undefined, this.#resources);
							} catch (markerFailure) {
								if (markerFailure instanceof ArtifactReaderFailure && markerFailure.cleanup !== undefined) markerCleanupFailure = markerFailure;
								const completed = completedStableArtifact(markerFailure);
								if (completed === undefined) throw markerFailure;
								marker = completed;
							}
							if (!marker.bytes.equals(Buffer.from("F"))) throw new EvmAdmissionError("marker_mismatch");
							fileFailure = {
								verified: true,
								failure: null
							};
						} catch (markerFailure) {
							fileFailure = {
								verified: false,
								failure: errorMessage(markerFailure)
							};
						}
					}
					const signal = options?.signal;
					let failure = isAbortOf(cause, signal) ? abortedFailure(signal, retainedOutput) : classifyProviderFailure(cause, evmFailureDialect({
						phase,
						path: input.path,
						workerLimits,
						limiter,
						fileFailure,
						timeoutMs,
						producerLimits
					}));
					if (markerCleanupFailure !== undefined) {
						const cleanup = retainedCleanupFailure(markerCleanupFailure);
						failure = analysisErrorWithCleanupDependencies(failure, cleanup, OPERATION);
					}
					result = err(failure);
				}
				if (replyFinalization !== undefined) {
					if (result.ok) {
						replyFinalization.retainPartialObservation(evmInterfaceEvidence(input, result.value));
						result = err(replyFinalization);
					} else {
						result = err(replyFinalization.cleanupIncomplete ? analysisErrorWithCleanupDependencies(result.error, replyFinalization, OPERATION) : result.error.retainSecondaryFailure(replyFinalization, { reply_finalization_error: projectAnalysisErrorWithoutCapturedOutput(replyFinalization) }));
					}
				}
				const retainCancellation = (outcome) => outcome.ok && options?.signal?.aborted ? err(cancelledBy(OPERATION, options.signal, {
					partialObservation: evmInterfaceEvidence(input, outcome.value),
					...retainedOutput === undefined ? {} : { capturedOutput: retainedOutput }
				})) : outcome;
				result = retainCancellation(result);
				if (processOwner !== undefined) {
					const lease = processLeaseFor(processOwner);
					const rootOwnerLease = root === undefined ? undefined : rootLeaseFor(root);
					this.#pendingCleanup = {
						input,
						result,
						output: retainedOutput,
						root: root === undefined || rootOwnerLease === undefined ? undefined : {
							owner: root,
							lease: rootOwnerLease
						},
						process: lease
					};
					if (processCleanup === undefined) {
						const owners = [lease, rootOwnerLease].filter((owner) => owner !== undefined);
						if (!result.ok && result.error.cleanupIncomplete) {
							bindEvmCleanupOwners(result.error, owners);
							return result;
						}
						const failure = evmCleanupFailure(input, result, [...new Set([...root === undefined ? [] : [root.path], ...lease.cleanupResources ?? []])], "Owned EVM worker cleanup remained unresolved without a failure description.", retainedOutput, processOwner);
						bindEvmCleanupOwners(failure, owners, result.ok ? undefined : result.error);
						return err(failure);
					}
					const failure = evmCleanupFailure(input, result, [...new Set([...root === undefined ? [] : [root.path], ...processCleanup.resources])], processCleanup.reason, retainedOutput, processOwner);
					bindEvmCleanupOwners(failure, [lease, rootOwnerLease].filter((lease) => lease !== undefined), result.ok ? undefined : result.error);
					return err(failure);
				}
				if (root !== undefined) {
					try {
						await rootLeaseFor(root).release();
					} catch (cause) {
						const retainedRoot = root;
						const lease = rootLeaseFor(retainedRoot);
						const cleanupResult = retainCancellation(result);
						this.#pendingCleanup = {
							input,
							result: cleanupResult,
							output: retainedOutput,
							root: {
								owner: retainedRoot,
								lease
							},
							process: undefined
						};
						root = undefined;
						const failure = evmCleanupFailure(input, cleanupResult, [retainedRoot.path], errorMessage(cause), retainedOutput, cause);
						bindEvmCleanupOwners(failure, [lease], cleanupResult.ok ? undefined : cleanupResult.error);
						return err(failure);
					}
				}
				return retainCancellation(result);
			}
			async close() {
				this.#closing = true;
				this.#closePromise ??= this.#tail.then(async () => {
					const [retirement, artifacts] = await Promise.allSettled([this.#retire(), this.#artifactScopeLease().release()]);
					const failures = [];
					if (retirement.status === "rejected") failures.push(retainedCleanupFailure(retirement.reason));
					else if (retirement.value !== undefined) failures.push(retirement.value);
					if (artifacts.status === "rejected") {
						const scopeLease = this.#artifactScopeLease();
						const artifactFailure = retainedCleanupFailure(artifacts.reason);
						const marker = ownerCleanupMarker([scopeLease]);
						new AnalysisCleanupLeaseGroup(marker, [scopeLease]);
						artifactFailure.bindCleanupDependencies([marker]);
						failures.push(artifactFailure);
					}
					if (failures.length > 0) {
						const resources = failures.flatMap((failure) => failure instanceof ProviderCleanupError ? failure.cleanupResources : failure instanceof ArtifactReaderFailure && failure.cleanup !== undefined ? failure.cleanup.resources : ["artifact-resources"]);
						const failure = new ProviderCleanupError(EVMOLE_PROVIDER_IDENTITY.id, [...new Set(resources)], { failures: failures.map((failure) => errorMessage(failure)) }, {
							operation: OPERATION,
							cause: new AggregateError(failures)
						});
						failure.bindCleanupDependencies(failures);
						throw failure;
					}
				}).catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			#closedError() {
				return new AnalysisCapabilityUnavailableError(EVMOLE_PROVIDER_IDENTITY.id, OPERATION, "Provider is closing; create a new EVM inspection service.");
			}
			async #retire() {
				const pending = this.#pendingCleanup;
				if (pending === undefined) return undefined;
				if (pending.process !== undefined) {
					try {
						await pending.process.release();
					} catch (cause) {
						const failure = evmCleanupFailure(pending.input, pending.result, [...new Set([...pending.root === undefined ? [] : [pending.root.owner.path], ...pending.process.cleanupResources ?? []])], errorMessage(cause), pending.output, cause);
						bindEvmCleanupOwners(failure, [pending.process, ...pending.root === undefined ? [] : [pending.root.lease]], pending.result.ok ? undefined : pending.result.error);
						return failure;
					}
					pending.process = undefined;
				}
				if (pending.root !== undefined) {
					const { owner: root, lease } = pending.root;
					try {
						await lease.release();
						pending.root = undefined;
					} catch (cause) {
						const failure = evmCleanupFailure(pending.input, pending.result, lease.cleanupResources ?? [root.path], errorMessage(cause), pending.output, cause);
						bindEvmCleanupOwners(failure, [lease], pending.result.ok ? undefined : pending.result.error);
						return failure;
					}
				}
				this.#pendingCleanup = undefined;
				return undefined;
			}
		};
	})))();
}

//#endregion
//#region dist/composition/evm.js
var createEvmInterfaceService, evmInterfaceModule;
function init_evm() {
	return (init_evm = __esmMin((() => {
		init_EvmInterfaceService();
		init_EvmoleInterfaceProvider();
		init_cliCommandNames();
		init_HostPlatform();
		init_evmToolContracts();
		createEvmInterfaceService = (environment = process.env, host = HOST_PLATFORM) => new EvmInterfaceService(new EvmoleInterfaceProvider(environment, undefined, undefined, host));
		evmInterfaceModule = {
			contract: INSPECT_EVM_INTERFACE_CONTRACT,
			cliCommand: cliCommandFor("inspect_evm_interface"),
			create: createEvmInterfaceService
		};
	})))();
}

//#endregion
//#region dist/cli/evmCommands.js
var evmCommands_exports = /* @__PURE__ */ __exportAll({ registerEvmCommands: () => registerEvmCommands });
var registerEvmCommands;
function init_evmCommands() {
	return (init_evmCommands = __esmMin((() => {
		init_evm();
		init_contractCommand();
		init_producerLimitsOption();
		registerEvmCommands = (cli, logger, environment) => {
			const service = evmInterfaceModule.create(environment);
			registerContractCommand(cli, logger, evmInterfaceModule.contract, {
				command: evmInterfaceModule.cliCommand,
				description: "Infer interface candidates from explicit local EVM bytecode",
				positionals: ["path", "encoding"],
				callerPaths: ["path"],
				jsonText: ["producer_limits"],
				fields: {
					path: { description: "Local bytecode carrier" },
					encoding: { description: "Selected carrier representation" },
					producer_limits: { description: PRODUCER_LIMITS_HELP }
				},
				omit: { detail: "One-shot output is complete Evidence; this command has no summary delivery" }
			}, inspectWithService(() => service, "evmole-interface"));
		};
	})))();
}

//#endregion
export { evmCommands_exports, init_evmCommands };