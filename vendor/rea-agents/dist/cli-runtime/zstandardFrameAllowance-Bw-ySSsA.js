import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, ConfigurationError, DEFAULT_ASAR_MAX_HEADER_BYTES, DEFAULT_ASAR_MAX_LISTING_BYTES, DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS, DEFAULT_ZSTD_MAX_FRAMES, MAXIMUM_ASAR_MAX_HEADER_BYTES, MAXIMUM_ASAR_MAX_LISTING_BYTES, MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, MAXIMUM_ZSTD_MAX_FRAMES, ParseFailureError, analysisSettingLimit, errorMessage, init_analysisErrorCore, init_analysisResourceLimits, init_analysisSettingDefinitions, init_configurationErrors, init_errorMessage, init_parseFailure, reportedParseLimit } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { z } from "zod";
import { isUtf8 } from "node:buffer";
import { AsyncLocalStorage } from "node:async_hooks";

//#region dist/platform/HostPlatform.js
var HOST_PLATFORM;
function init_HostPlatform() {
	return (init_HostPlatform = __esmMin((() => {
		HOST_PLATFORM = Object.freeze({
			platform: process.platform,
			architecture: process.arch
		});
	})))();
}

//#endregion
//#region dist/domain/strictUtf8.js
var strictUtf8Decoder, preserving, stripping, decodeStrictUtf8, isStrictUtf8;
function init_strictUtf8() {
	return (init_strictUtf8 = __esmMin((() => {
		strictUtf8Decoder = (bom) => new TextDecoder("utf-8", {
			fatal: true,
			ignoreBOM: bom === "preserve"
		});
		preserving = strictUtf8Decoder("preserve");
		stripping = strictUtf8Decoder("strip-signature");
		decodeStrictUtf8 = (bytes, bom) => (bom === "preserve" ? preserving : stripping).decode(bytes);
		isStrictUtf8 = (bytes) => isUtf8(bytes);
	})))();
}

//#endregion
//#region dist/domain/safeJson.js
var safeParseUtf8Json, safeParseJson;
function init_safeJson() {
	return (init_safeJson = __esmMin((() => {
		init_strictUtf8();
		init_errorMessage();
		safeParseUtf8Json = (bytes) => {
			let text;
			try {
				text = strictUtf8Decoder("preserve").decode(bytes);
			} catch (cause) {
				return {
					ok: false,
					error: errorMessage(cause),
					cause
				};
			}
			return safeParseJson(text);
		};
		safeParseJson = (value, reviver) => {
			try {
				return {
					ok: true,
					value: JSON.parse(value, reviver)
				};
			} catch (cause) {
				return {
					ok: false,
					error: errorMessage(cause),
					cause
				};
			}
		};
	})))();
}

//#endregion
//#region dist/domain/analysisOperationSnapshot.js
var snapshots, runWithAnalysisOperationSnapshot, currentAnalysisOperationSnapshot, currentAnalysisSettingOverride;
function init_analysisOperationSnapshot() {
	return (init_analysisOperationSnapshot = __esmMin((() => {
		snapshots = new AsyncLocalStorage();
		runWithAnalysisOperationSnapshot = (snapshot, operation) => snapshots.run(snapshot, operation);
		currentAnalysisOperationSnapshot = () => snapshots.getStore();
		currentAnalysisSettingOverride = (setting) => currentAnalysisOperationSnapshot()?.overrides[setting];
	})))();
}

//#endregion
//#region dist/config/windowsChangeTimeSettle.js
var decimalInteger$1, WINDOWS_CHANGE_TIME_DRIFT_MS, WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, windowsChangeTimeSettingFailure, windowsChangeTimeSettingMessage, inRange, windowsChangeTimeSettingSchema, windowsChangeTimeDriftMsSchema, windowsChangeTimeSettlePollMsSchema, windowsChangeTimeSettleMaxPollsSchema, WINDOWS_CHANGE_TIME_OVERRIDES, readBound, resolveWindowsChangeTimeSettle, applyWindowsChangeTimeSnapshot;
function init_windowsChangeTimeSettle() {
	return (init_windowsChangeTimeSettle = __esmMin((() => {
		init_analysisOperationSnapshot();
		init_analysisResourceLimits();
		init_configurationErrors();
		init_result();
		decimalInteger$1 = /^[1-9]\d*$/u;
		WINDOWS_CHANGE_TIME_DRIFT_MS = {
			setting: "REA_WINDOWS_CHANGE_TIME_DRIFT_MS",
			defaultValue: DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS,
			floor: 1,
			maximum: MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS,
			unit: "ms"
		};
		WINDOWS_CHANGE_TIME_SETTLE_POLL_MS = {
			setting: "REA_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS",
			defaultValue: 25,
			floor: 1,
			maximum: MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS,
			unit: "ms"
		};
		WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS = {
			setting: "REA_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS",
			defaultValue: 40,
			floor: 1,
			maximum: MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS,
			unit: "polls"
		};
		windowsChangeTimeSettingFailure = (bound, currentValue) => ({
			setting: bound.setting,
			currentValue,
			source: "setting",
			defaultValue: bound.defaultValue,
			floor: bound.floor,
			maximum: bound.maximum,
			unit: bound.unit,
			update_mode: "runtime"
		});
		windowsChangeTimeSettingMessage = (failure) => `The supplied ${failure.setting} value is ${failure.currentValue} ${failure.unit} (source ${failure.source}; default ${String(failure.defaultValue)} ${failure.unit}, floor ${String(failure.floor)} ${failure.unit}, maximum ${String(failure.maximum)} ${failure.unit}). windows change-time settings can be changed at runtime with update_analysis_settings. The launch seed ${failure.setting} must be a positive decimal integer from ${String(failure.floor)} to ${String(failure.maximum)}. The rejected value is not active.`;
		inRange = (bound, value) => {
			if (!decimalInteger$1.test(value)) return false;
			const parsed = BigInt(value);
			return parsed >= BigInt(bound.floor) && parsed <= BigInt(bound.maximum);
		};
		windowsChangeTimeSettingSchema = (bound) => z.string().superRefine((value, context) => {
			if (inRange(bound, value)) return;
			const failure = windowsChangeTimeSettingFailure(bound, value);
			context.addIssue({
				code: "custom",
				message: windowsChangeTimeSettingMessage(failure),
				params: { update_mode: failure.update_mode }
			});
		}).transform(Number);
		windowsChangeTimeDriftMsSchema = windowsChangeTimeSettingSchema(WINDOWS_CHANGE_TIME_DRIFT_MS);
		windowsChangeTimeSettlePollMsSchema = windowsChangeTimeSettingSchema(WINDOWS_CHANGE_TIME_SETTLE_POLL_MS);
		windowsChangeTimeSettleMaxPollsSchema = windowsChangeTimeSettingSchema(WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS);
		WINDOWS_CHANGE_TIME_OVERRIDES = {
			[WINDOWS_CHANGE_TIME_DRIFT_MS.setting]: "windows.change_time_drift_ms",
			[WINDOWS_CHANGE_TIME_SETTLE_POLL_MS.setting]: "windows.change_time_settle_poll_ms",
			[WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS.setting]: "windows.change_time_settle_max_polls"
		};
		readBound = (bound, environment, failures) => {
			const value = environment[bound.setting];
			if (value === undefined) return undefined;
			const parsed = windowsChangeTimeSettingSchema(bound).safeParse(value);
			if (parsed.success) return parsed.data;
			const override = WINDOWS_CHANGE_TIME_OVERRIDES[bound.setting];
			if (currentAnalysisOperationSnapshot()?.overrides[override] !== undefined) return undefined;
			failures.push(windowsChangeTimeSettingFailure(bound, value));
			return undefined;
		};
		resolveWindowsChangeTimeSettle = (environment) => {
			const failures = [];
			const driftMs = readBound(WINDOWS_CHANGE_TIME_DRIFT_MS, environment, failures);
			const pollMs = readBound(WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, environment, failures);
			const maxPolls = readBound(WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, environment, failures);
			if (failures.length > 0) return err(new ConfigurationError(failures.map(windowsChangeTimeSettingMessage).join(" "), { settings: failures.map((failure) => ({
				setting: failure.setting,
				constraint: windowsChangeTimeSettingMessage(failure),
				update_mode: failure.update_mode
			})) }));
			return ok({
				driftMs: driftMs ?? WINDOWS_CHANGE_TIME_DRIFT_MS.defaultValue,
				driftSource: driftMs === undefined ? "default" : "setting",
				pollMs: pollMs ?? WINDOWS_CHANGE_TIME_SETTLE_POLL_MS.defaultValue,
				pollSource: pollMs === undefined ? "default" : "setting",
				maxPolls: maxPolls ?? WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS.defaultValue,
				maxPollsSource: maxPolls === undefined ? "default" : "setting"
			});
		};
		applyWindowsChangeTimeSnapshot = (limits) => {
			const overrides = currentAnalysisOperationSnapshot()?.overrides;
			if (overrides === undefined) return limits;
			const driftMs = overrides["windows.change_time_drift_ms"];
			const pollMs = overrides["windows.change_time_settle_poll_ms"];
			const maxPolls = overrides["windows.change_time_settle_max_polls"];
			return {
				driftMs: driftMs ?? limits.driftMs,
				driftSource: driftMs === undefined ? limits.driftSource : "runtime",
				pollMs: pollMs ?? limits.pollMs,
				pollSource: pollMs === undefined ? limits.pollSource : "runtime",
				maxPolls: maxPolls ?? limits.maxPolls,
				maxPollsSource: maxPolls === undefined ? limits.maxPollsSource : "runtime"
			};
		};
	})))();
}

//#endregion
//#region dist/config/asarHeaderAdmission.js
var ASAR_HEADER_ADMISSION_SETTING, DEFAULT_ASAR_HEADER_ADMISSION, asarMaxHeaderBytesConstraint, asarMaxHeaderBytesSchema, parseAsarHeaderAdmission;
function init_asarHeaderAdmission() {
	return (init_asarHeaderAdmission = __esmMin((() => {
		init_analysisResourceLimits();
		init_configurationErrors();
		init_result();
		ASAR_HEADER_ADMISSION_SETTING = "REA_ASAR_MAX_HEADER_BYTES";
		DEFAULT_ASAR_HEADER_ADMISSION = {
			maximumBytes: DEFAULT_ASAR_MAX_HEADER_BYTES,
			source: "default"
		};
		asarMaxHeaderBytesConstraint = `${ASAR_HEADER_ADMISSION_SETTING} must be a positive decimal integer of at most ${String(MAXIMUM_ASAR_MAX_HEADER_BYTES)} bytes (256 MiB); the default is ${String(DEFAULT_ASAR_MAX_HEADER_BYTES)} bytes (16 MiB).`;
		asarMaxHeaderBytesSchema = z.string().regex(/^[1-9]\d*$/u, { error: asarMaxHeaderBytesConstraint }).transform(Number).pipe(z.number().int().max(MAXIMUM_ASAR_MAX_HEADER_BYTES, { error: asarMaxHeaderBytesConstraint }));
		parseAsarHeaderAdmission = (value) => {
			if (value === undefined) return ok(DEFAULT_ASAR_HEADER_ADMISSION);
			const parsed = asarMaxHeaderBytesSchema.safeParse(value);
			return parsed.success ? ok({
				maximumBytes: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(asarMaxHeaderBytesConstraint, { settings: [{
				setting: ASAR_HEADER_ADMISSION_SETTING,
				constraint: asarMaxHeaderBytesConstraint
			}] }));
		};
	})))();
}

//#endregion
//#region dist/config/asarListingAdmission.js
var ASAR_LISTING_ADMISSION_SETTING, DEFAULT_ASAR_LISTING_ADMISSION, constraint$1, asarMaxListingBytesSchema, parseAsarListingAdmission;
function init_asarListingAdmission() {
	return (init_asarListingAdmission = __esmMin((() => {
		init_analysisResourceLimits();
		init_configurationErrors();
		init_result();
		ASAR_LISTING_ADMISSION_SETTING = "REA_ASAR_MAX_LISTING_BYTES";
		DEFAULT_ASAR_LISTING_ADMISSION = {
			maximumBytes: DEFAULT_ASAR_MAX_LISTING_BYTES,
			source: "default"
		};
		constraint$1 = `${ASAR_LISTING_ADMISSION_SETTING} must be a positive decimal safe integer in bytes, at most ${String(MAXIMUM_ASAR_MAX_LISTING_BYTES)}; the default is ${String(DEFAULT_ASAR_MAX_LISTING_BYTES)} bytes.`;
		asarMaxListingBytesSchema = z.string().regex(/^[1-9]\d*$/u, { error: constraint$1 }).transform(Number).pipe(z.number().int().min(1).max(MAXIMUM_ASAR_MAX_LISTING_BYTES));
		parseAsarListingAdmission = (value) => {
			if (value === undefined) return ok(DEFAULT_ASAR_LISTING_ADMISSION);
			const parsed = asarMaxListingBytesSchema.safeParse(value);
			return parsed.success ? ok({
				maximumBytes: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(constraint$1, { settings: [{
				setting: ASAR_LISTING_ADMISSION_SETTING,
				constraint: constraint$1
			}] }));
		};
	})))();
}

//#endregion
//#region dist/domain/internalInvariant.js
var InternalInvariantError, invariantViolation;
function init_internalInvariant() {
	return (init_internalInvariant = __esmMin((() => {
		InternalInvariantError = class extends Error {
			_tag = "InternalInvariantError";
			constructor(message, options) {
				super(message, options);
				this.name = "InternalInvariantError";
			}
		};
		invariantViolation = (message, options) => new InternalInvariantError(message, options);
	})))();
}

//#endregion
//#region dist/domain/parseFailureAnalysisError.js
var isParseLimit, parseLimitConstraint, parseFailureAnalysisError;
function init_parseFailureAnalysisError() {
	return (init_parseFailureAnalysisError = __esmMin((() => {
		init_analysisErrorCore();
		init_parseFailure();
		isParseLimit = (cause, format) => cause instanceof ParseFailureError && cause.failure.kind === "limit" && cause.failure.format === format;
		parseLimitConstraint = (operation, resource, cause, options) => {
			const { detail, limit } = cause.failure;
			const { path, legacyMaximumKey, reportedLimitContext, ...errorOptions } = options;
			const reportedLimit = legacyMaximumKey === undefined ? reportedParseLimit(limit) : { [legacyMaximumKey]: limit.maximum };
			return new AnalysisResourceConstraintError(operation, resource, path === undefined ? detail : `Selected artifact ${path}: ${detail}`, {
				...reportedLimitContext,
				...reportedLimit
			}, {
				...errorOptions,
				cause
			});
		};
		parseFailureAnalysisError = (operation, path, cause, field = "path") => {
			if (!(cause instanceof ParseFailureError)) return undefined;
			const { failure } = cause;
			switch (failure.kind) {
				case "limit": return undefined;
				case "unsupported": return new AnalysisUnsupportedTargetError(operation, path, failure.detail, {
					cause,
					undecodedContent: failure.undecodedContent
				});
				case "malformed":
				case "truncated": return new AnalysisInputError(operation, { cause }, [{
					path: [field],
					reason: "invalid_format",
					message: `Selected artifact ${path}: ${failure.detail}`
				}]);
			}
		};
	})))();
}

//#endregion
//#region dist/domain/compression/zstandardFrameAllowance.js
var ZSTD_MAX_FRAMES_ENVIRONMENT, ZSTD_MAX_FRAMES_SETTING, constraint, decimalInteger, zstandardMaxFramesSchema, invalidSeed, resolveZstandardFrameAllowance, currentZstandardFrameAllowance, zstandardWorkLimitFacts, ZstandardFrameAllowanceError, zstandardFrameAllowanceCause, projectZstandardFrameAllowance;
function init_zstandardFrameAllowance() {
	return (init_zstandardFrameAllowance = __esmMin((() => {
		init_analysisResourceLimits();
		init_analysisSettingDefinitions();
		init_analysisErrorCore();
		init_analysisOperationSnapshot();
		init_configurationErrors();
		init_parseFailureAnalysisError();
		init_parseFailure();
		init_result();
		ZSTD_MAX_FRAMES_ENVIRONMENT = "REA_ZSTD_MAX_FRAMES";
		ZSTD_MAX_FRAMES_SETTING = "zstd.max_frames";
		constraint = `${ZSTD_MAX_FRAMES_ENVIRONMENT} must be a decimal integer from ${String(1)} to ${String(MAXIMUM_ZSTD_MAX_FRAMES)} frames; the default is ${String(DEFAULT_ZSTD_MAX_FRAMES)}.`;
		decimalInteger = /^[1-9]\d*$/u;
		zstandardMaxFramesSchema = z.string().regex(decimalInteger, { error: constraint }).refine((value) => {
			if (!decimalInteger.test(value)) return true;
			const parsed = BigInt(value);
			return parsed >= BigInt(1) && parsed <= BigInt(65536);
		}, { error: constraint }).transform(Number);
		invalidSeed = () => new ConfigurationError(constraint, {
			remediationAction: `On a running MCP session, call update_analysis_settings for ${ZSTD_MAX_FRAMES_SETTING}, then retry. For CLI or future REA processes, correct ${ZSTD_MAX_FRAMES_ENVIRONMENT} in the launch environment.`,
			settings: [{
				setting: ZSTD_MAX_FRAMES_ENVIRONMENT,
				constraint,
				update_mode: "runtime",
				pending_restart: false
			}]
		});
		resolveZstandardFrameAllowance = (environment, override = currentAnalysisSettingOverride(ZSTD_MAX_FRAMES_SETTING)) => {
			if (override !== undefined) return ok({
				maxFrames: override,
				source: "runtime"
			});
			const raw = environment[ZSTD_MAX_FRAMES_ENVIRONMENT];
			if (raw === undefined) return ok({
				maxFrames: DEFAULT_ZSTD_MAX_FRAMES,
				source: "default"
			});
			const parsed = zstandardMaxFramesSchema.safeParse(raw);
			return parsed.success ? ok({
				maxFrames: parsed.data,
				source: "setting"
			}) : err(invalidSeed());
		};
		currentZstandardFrameAllowance = () => resolveZstandardFrameAllowance(process.env);
		zstandardWorkLimitFacts = (allowance) => ({
			reason: "work_limit",
			setting: ZSTD_MAX_FRAMES_SETTING,
			value: allowance.maxFrames,
			source: allowance.source,
			minimum: 1,
			maximum: MAXIMUM_ZSTD_MAX_FRAMES
		});
		ZstandardFrameAllowanceError = class extends ParseFailureError {
			reason = "work_limit";
			setting = ZSTD_MAX_FRAMES_SETTING;
			value;
			source;
			minimum;
			maximum;
			offset;
			constructor(allowance, offset) {
				const facts = zstandardWorkLimitFacts(allowance);
				const detail = `${facts.setting} is ${String(facts.value)} (source ${facts.source}, range ${String(facts.minimum)}..${String(facts.maximum)})`;
				super({
					kind: "limit",
					format: "zstd",
					detail,
					offset,
					field: facts.reason,
					limit: {
						name: facts.setting,
						maximum: facts.value,
						required: facts.value + 1
					}
				});
				this.name = "ZstandardFrameAllowanceError";
				this.value = facts.value;
				this.source = facts.source;
				this.minimum = facts.minimum;
				this.maximum = facts.maximum;
				this.offset = offset;
			}
		};
		zstandardFrameAllowanceCause = (cause) => cause instanceof ZstandardFrameAllowanceError ? cause : cause instanceof AnalysisResourceConstraintError && cause.cause instanceof ZstandardFrameAllowanceError ? cause.cause : undefined;
		projectZstandardFrameAllowance = (operation, error) => parseLimitConstraint(operation, "cpu", error, {
			retryable: false,
			limit: analysisSettingLimit(error.setting, error.value, error.source),
			reportedLimitContext: {
				setting: error.setting,
				value: error.value,
				source: error.source,
				minimum: error.minimum,
				maximum: error.maximum
			}
		});
	})))();
}

//#endregion
export { ASAR_HEADER_ADMISSION_SETTING, DEFAULT_ASAR_HEADER_ADMISSION, DEFAULT_ASAR_LISTING_ADMISSION, HOST_PLATFORM, InternalInvariantError, ZstandardFrameAllowanceError, applyWindowsChangeTimeSnapshot, asarMaxHeaderBytesSchema, asarMaxListingBytesSchema, currentAnalysisOperationSnapshot, currentAnalysisSettingOverride, currentZstandardFrameAllowance, decodeStrictUtf8, init_HostPlatform, init_analysisOperationSnapshot, init_asarHeaderAdmission, init_asarListingAdmission, init_internalInvariant, init_parseFailureAnalysisError, init_safeJson, init_strictUtf8, init_windowsChangeTimeSettle, init_zstandardFrameAllowance, invariantViolation, isParseLimit, isStrictUtf8, parseAsarHeaderAdmission, parseAsarListingAdmission, parseFailureAnalysisError, parseLimitConstraint, projectZstandardFrameAllowance, resolveWindowsChangeTimeSettle, safeParseJson, safeParseUtf8Json, strictUtf8Decoder, windowsChangeTimeDriftMsSchema, windowsChangeTimeSettleMaxPollsSchema, windowsChangeTimeSettlePollMsSchema, zstandardFrameAllowanceCause, zstandardMaxFramesSchema, zstandardWorkLimitFacts };