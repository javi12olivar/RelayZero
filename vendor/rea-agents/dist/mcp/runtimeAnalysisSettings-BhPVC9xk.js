import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { Ct as parseAsarListingAdmission, Dt as init_asarHeaderAdmission, Ot as parseAsarHeaderAdmission, St as init_asarListingAdmission, _t as currentAnalysisSettingOverride, gt as currentAnalysisOperationSnapshot, vt as init_analysisOperationSnapshot } from "./analysisErrorProjection-B0_t_nHz.js";
import { i as init_configurationErrors, n as ConfigurationError } from "./configurationErrors-DgUy2JKH.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { $t as init_analysisResourceLimits, Bt as MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES, Pt as MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB, Tt as DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES, _t as DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS, gt as DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES } from "./jsonValue-BIEmjG1z.js";
import { n as positiveDecimalIntegerSchema, t as init_positiveDecimalInteger } from "./positiveDecimalInteger-B6WcctiT.js";
import { z } from "zod";

//#region dist/config/captureDecoderHeap.js
var CAPTURE_DECODER_OLD_GENERATION_SETTING, DEFAULT_CAPTURE_DECODER_HEAP, captureDecoderHeapConstraint, captureDecoderOldGenerationMiBSchema, parseCaptureDecoderHeap, resolveCaptureDecoderHeap, captureDecoderHeapFacts, captureDecoderHeapRecovery, captureDecoderHeapContinuingRecovery;
function init_captureDecoderHeap() {
	return (init_captureDecoderHeap = __esmMin((() => {
		init_analysisResourceLimits();
		init_positiveDecimalInteger();
		init_configurationErrors();
		init_analysisOperationSnapshot();
		init_result();
		CAPTURE_DECODER_OLD_GENERATION_SETTING = "REA_CAPTURE_DECODER_OLD_GENERATION_MIB";
		DEFAULT_CAPTURE_DECODER_HEAP = {
			oldGenerationMiB: 192,
			source: "default"
		};
		captureDecoderHeapConstraint = `${CAPTURE_DECODER_OLD_GENERATION_SETTING} must be a decimal integer from ${String(8)} to ${String(MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB)} MiB; the default is ${String(192)} MiB. An old generation below the decoder's ${String(8)} MiB semi-space aborts Node during startup instead of enforcing a limit, and a larger value is refused.`;
		captureDecoderOldGenerationMiBSchema = positiveDecimalIntegerSchema(8, MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB, captureDecoderHeapConstraint);
		parseCaptureDecoderHeap = (value) => {
			if (value === undefined) return ok(DEFAULT_CAPTURE_DECODER_HEAP);
			const parsed = captureDecoderOldGenerationMiBSchema.safeParse(value);
			return parsed.success ? ok({
				oldGenerationMiB: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(captureDecoderHeapConstraint, { settings: [{
				setting: CAPTURE_DECODER_OLD_GENERATION_SETTING,
				constraint: captureDecoderHeapConstraint
			}] }));
		};
		resolveCaptureDecoderHeap = (environment) => {
			const override = currentAnalysisSettingOverride("capture.decoder_old_generation_mib");
			if (override !== undefined) return {
				oldGenerationMiB: override,
				source: "runtime"
			};
			const parsed = parseCaptureDecoderHeap(environment[CAPTURE_DECODER_OLD_GENERATION_SETTING]);
			if (!parsed.ok) throw parsed.error;
			return parsed.value;
		};
		captureDecoderHeapFacts = (heap) => [
			`The effective ${CAPTURE_DECODER_OLD_GENERATION_SETTING} value is ${String(heap.oldGenerationMiB)} MiB (source ${heap.source}; default ${String(192)} MiB, floor ${String(8)} MiB, maximum ${String(MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB)} MiB).`,
			`On Node.js the decoder passes --max-old-space-size=${String(heap.oldGenerationMiB)} and removes inherited NODE_OPTIONS, so additional host memory and NODE_OPTIONS do not raise this heap. The ${String(8)} MiB semi-space stays fixed.`,
			"On Bun the V8 flags are ignored. Windows limits the decoder's committed memory to this value plus a 512 MiB reserve. Other Bun hosts enforce no decoder heap limit."
		].join(" ");
		captureDecoderHeapRecovery = (heap) => [captureDecoderHeapFacts(heap), `Set ${CAPTURE_DECODER_OLD_GENERATION_SETTING} in the environment that starts the next REA invocation. It must be a decimal integer from ${String(8)} to ${String(MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB)}.`].join(" ");
		captureDecoderHeapContinuingRecovery = (heap) => [captureDecoderHeapFacts(heap), `Call update_analysis_settings with setting capture.decoder_old_generation_mib. It applies to the next decoder in this session. The launch seed remains ${CAPTURE_DECODER_OLD_GENERATION_SETTING}.`].join(" ");
	})))();
}

//#endregion
//#region dist/config/nativeMatchingAllowance.js
var NATIVE_MATCHING_ALLOWANCE_SETTING, DEFAULT_NATIVE_MATCHING_ALLOWANCE, nativeMatchingRepresentationBytesConstraint, nativeMatchingRepresentationBytesSchema, parseNativeMatchingAllowance, MEBIBYTE, nativeMatchingByteAllowance, nativeMatchingAllowanceRecovery;
function init_nativeMatchingAllowance() {
	return (init_nativeMatchingAllowance = __esmMin((() => {
		init_analysisResourceLimits();
		init_configurationErrors();
		init_result();
		NATIVE_MATCHING_ALLOWANCE_SETTING = "REA_NATIVE_MATCHING_REPRESENTATION_BYTES";
		DEFAULT_NATIVE_MATCHING_ALLOWANCE = {
			maximumBytes: DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES,
			source: "default"
		};
		nativeMatchingRepresentationBytesConstraint = `${NATIVE_MATCHING_ALLOWANCE_SETTING} must be a positive decimal integer of at most ${String(MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES)} bytes (1 GiB); the default is ${String(DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES)} bytes (96 MiB).`;
		nativeMatchingRepresentationBytesSchema = z.string().regex(/^[1-9]\d*$/u, { error: nativeMatchingRepresentationBytesConstraint }).transform(Number).pipe(z.number().int().max(MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES, { error: nativeMatchingRepresentationBytesConstraint }));
		parseNativeMatchingAllowance = (environment) => {
			const value = environment[NATIVE_MATCHING_ALLOWANCE_SETTING];
			if (value === undefined) return ok(DEFAULT_NATIVE_MATCHING_ALLOWANCE);
			const parsed = nativeMatchingRepresentationBytesSchema.safeParse(value);
			return parsed.success ? ok({
				maximumBytes: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(nativeMatchingRepresentationBytesConstraint, {
				remediationAction: `On a running MCP session, call update_analysis_settings with ${JSON.stringify({ changes: [{
					setting: "native.matching_representation_bytes",
					action: "set",
					value: DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES
				}] })}, then retry matching. This repairs the current session for the next operation. For CLI or future REA processes, correct ${NATIVE_MATCHING_ALLOWANCE_SETTING} in the launch environment.`,
				settings: [{
					setting: NATIVE_MATCHING_ALLOWANCE_SETTING,
					constraint: nativeMatchingRepresentationBytesConstraint
				}]
			}));
		};
		MEBIBYTE = 1024 * 1024;
		nativeMatchingByteAllowance = (bytes) => Number.isInteger(bytes / MEBIBYTE) ? `${String(bytes / MEBIBYTE)} MiB / ${String(bytes)} bytes` : `${String(bytes)} bytes`;
		nativeMatchingAllowanceRecovery = (allowance) => [
			`Native function matching is limited to ${nativeMatchingByteAllowance(allowance.maximumBytes)} of representation${allowance.source === "setting" ? ` by ${NATIVE_MATCHING_ALLOWANCE_SETTING}` : ""}.`,
			`On MCP, call update_analysis_settings with setting native.matching_representation_bytes, action set, and a value in bytes up to ${nativeMatchingByteAllowance(MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES)} (default ${nativeMatchingByteAllowance(DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES)}), then retry the original request. It applies to the next operation without restarting REA. For CLI or future REA processes, set ${NATIVE_MATCHING_ALLOWANCE_SETTING} in the launch environment.`,
			"This budget is not a bound on total process RSS; raising it lets matching retain more representation in the REA process.",
			"Splitting inventories into separate matches changes global name and body uniqueness, so it is not an equivalent workaround.",
			"Repeating the unchanged request fails the same way."
		].join(" ");
	})))();
}

//#endregion
//#region dist/config/runtimeAnalysisSettings.js
var readRuntimeSetting, runtimeAnalysisConfig, runtimeAsarHeaderAdmission, runtimeCaptureDecoderHeap, runtimeNativeMatchingAllowance;
function init_runtimeAnalysisSettings() {
	return (init_runtimeAnalysisSettings = __esmMin((() => {
		init_analysisOperationSnapshot();
		init_configurationErrors();
		init_result();
		init_analysisResourceLimits();
		init_asarListingAdmission();
		init_asarHeaderAdmission();
		init_captureDecoderHeap();
		init_nativeMatchingAllowance();
		readRuntimeSetting = (read) => {
			try {
				return ok(read());
			} catch (cause) {
				if (cause instanceof ConfigurationError) return err(cause);
				throw cause;
			}
		};
		runtimeAnalysisConfig = (config, read) => {
			const deadline = config.regexMatchingDeadline;
			const heap = config.regexWorkerHeapRequest;
			const scan = config.hopperCallerScanBudget;
			const bridge = config.bridgeMaxRequestBytes;
			const bridgeReply = config.bridgeMaxReplyBytes;
			const overrides = () => (read === undefined ? currentAnalysisOperationSnapshot()?.overrides : read().overrides) ?? {};
			const admit = (id) => {
				const error = config.invalidRuntimeSeeds?.[id];
				if (error !== undefined) throw error;
			};
			return {
				...config,
				get ghidraStartupTimeoutMs() {
					return overrides()["ghidra.startup_timeout_ms"] ?? (admit("ghidra.startup_timeout_ms"), config.ghidraStartupTimeoutMs);
				},
				get hopperStartupTimeoutMs() {
					return overrides()["hopper.startup_timeout_ms"] ?? (admit("hopper.startup_timeout_ms"), config.hopperStartupTimeoutMs);
				},
				get hopperStartupTimeoutSource() {
					if (overrides()["hopper.startup_timeout_ms"] !== undefined) return "runtime";
					admit("hopper.startup_timeout_ms");
					return config.hopperStartupTimeoutSource;
				},
				get ghidraDecompileTimeoutSeconds() {
					const value = overrides()["ghidra.decompile_timeout_seconds"];
					if (value !== undefined) return value === null ? undefined : value;
					admit("ghidra.decompile_timeout_seconds");
					return config.ghidraDecompileTimeoutSeconds;
				},
				get ghidraDecompileMaxPayloadMiB() {
					const value = overrides()["ghidra.decompile_max_payload_mib"];
					if (value !== undefined) return value === null ? undefined : value;
					admit("ghidra.decompile_max_payload_mib");
					return config.ghidraDecompileMaxPayloadMiB;
				},
				get ghidraValueFlowMaxOperations() {
					return overrides()["ghidra.value_flow_max_operations"] ?? (admit("ghidra.value_flow_max_operations"), config.ghidraValueFlowMaxOperations ?? 3e3);
				},
				get ghidraValueFlowMaxInputsPerOperation() {
					return overrides()["ghidra.value_flow_max_inputs_per_operation"] ?? (admit("ghidra.value_flow_max_inputs_per_operation"), config.ghidraValueFlowMaxInputsPerOperation ?? 64);
				},
				get ghidraValueFlowMaxEdges() {
					return overrides()["ghidra.value_flow_max_edges"] ?? (admit("ghidra.value_flow_max_edges"), config.ghidraValueFlowMaxEdges ?? 12e3);
				},
				regexMatchingDeadline: {
					get deadlineMs() {
						return overrides()["regex.matching_deadline_ms"] ?? (admit("regex.matching_deadline_ms"), deadline.deadlineMs);
					},
					get source() {
						if (overrides()["regex.matching_deadline_ms"] !== undefined) return "runtime";
						admit("regex.matching_deadline_ms");
						return deadline.source;
					}
				},
				regexWorkerHeapRequest: {
					get heapMiB() {
						return overrides()["regex.worker_heap_request_mib"] ?? (admit("regex.worker_heap_request_mib"), heap.heapMiB);
					},
					get source() {
						if (overrides()["regex.worker_heap_request_mib"] !== undefined) return "runtime";
						admit("regex.worker_heap_request_mib");
						return heap.source;
					}
				},
				hopperCallerScanBudget: {
					...scan,
					get milliseconds() {
						return overrides()["hopper.caller_scan_budget_ms"] ?? (admit("hopper.caller_scan_budget_ms"), scan.milliseconds);
					},
					get source() {
						if (overrides()["hopper.caller_scan_budget_ms"] !== undefined) return "runtime";
						admit("hopper.caller_scan_budget_ms");
						return scan.source;
					}
				},
				bridgeMaxRequestBytes: {
					get maximumBytes() {
						return overrides()["bridge.max_request_bytes"] ?? (admit("bridge.max_request_bytes"), bridge.maximumBytes);
					},
					get source() {
						if (overrides()["bridge.max_request_bytes"] !== undefined) return "runtime";
						admit("bridge.max_request_bytes");
						return bridge.source;
					}
				},
				bridgeMaxReplyBytes: {
					get maximumBytes() {
						return overrides()["bridge.max_reply_bytes"] ?? (admit("bridge.max_reply_bytes"), bridgeReply.maximumBytes);
					},
					get source() {
						if (overrides()["bridge.max_reply_bytes"] !== undefined) return "runtime";
						admit("bridge.max_reply_bytes");
						return bridgeReply.source;
					}
				}
			};
		};
		runtimeAsarHeaderAdmission = (environment, read) => {
			const parsed = parseAsarHeaderAdmission(environment.REA_ASAR_MAX_HEADER_BYTES);
			const listing = parseAsarListingAdmission(environment.REA_ASAR_MAX_LISTING_BYTES);
			const header = () => {
				const override = read?.().overrides["asar.max_header_bytes"] ?? currentAnalysisSettingOverride("asar.max_header_bytes");
				if (override !== undefined) return {
					maximumBytes: override,
					source: "runtime"
				};
				if (!parsed.ok) throw parsed.error;
				return parsed.value;
			};
			const expandedListing = () => {
				const override = read?.().overrides["asar.max_listing_bytes"] ?? currentAnalysisSettingOverride("asar.max_listing_bytes");
				if (override !== undefined) return {
					maximumBytes: override,
					source: "runtime"
				};
				if (!listing.ok) throw listing.error;
				return listing.value;
			};
			if (read === undefined) return {
				...header(),
				listing: expandedListing()
			};
			return {
				get maximumBytes() {
					return header().maximumBytes;
				},
				get source() {
					return header().source;
				},
				listing: {
					get maximumBytes() {
						return expandedListing().maximumBytes;
					},
					get source() {
						return expandedListing().source;
					}
				}
			};
		};
		runtimeCaptureDecoderHeap = (environment, read) => {
			const parsed = parseCaptureDecoderHeap(environment.REA_CAPTURE_DECODER_OLD_GENERATION_MIB);
			const effective = () => {
				const override = read?.().overrides["capture.decoder_old_generation_mib"] ?? currentAnalysisSettingOverride("capture.decoder_old_generation_mib");
				if (override !== undefined) return {
					oldGenerationMiB: override,
					source: "runtime"
				};
				if (!parsed.ok) throw parsed.error;
				return parsed.value;
			};
			if (read === undefined) return effective();
			return {
				get oldGenerationMiB() {
					return effective().oldGenerationMiB;
				},
				get source() {
					return effective().source;
				}
			};
		};
		runtimeNativeMatchingAllowance = (environment, read) => () => {
			const override = read?.().overrides["native.matching_representation_bytes"];
			return override === undefined ? parseNativeMatchingAllowance(environment) : ok({
				maximumBytes: override,
				source: "runtime"
			});
		};
	})))();
}

//#endregion
export { resolveCaptureDecoderHeap as _, runtimeCaptureDecoderHeap as a, init_nativeMatchingAllowance as c, parseNativeMatchingAllowance as d, DEFAULT_CAPTURE_DECODER_HEAP as f, init_captureDecoderHeap as g, captureDecoderOldGenerationMiBSchema as h, runtimeAsarHeaderAdmission as i, nativeMatchingAllowanceRecovery as l, captureDecoderHeapRecovery as m, readRuntimeSetting as n, runtimeNativeMatchingAllowance as o, captureDecoderHeapContinuingRecovery as p, runtimeAnalysisConfig as r, DEFAULT_NATIVE_MATCHING_ALLOWANCE as s, init_runtimeAnalysisSettings as t, nativeMatchingByteAllowance as u };