import { positiveDecimalIntegerSchema } from "./positiveDecimalInteger.js";
import { analysisSettingLimit } from "../domain/analysisSettingDefinitions.js";
import { AnalysisResourceConstraintError } from "../domain/analysisErrorCore.js";
import { ConfigurationError } from "../domain/configurationErrors.js";
import { err, ok } from "../domain/result.js";
import { readRuntimeSetting } from "./runtimeAnalysisSettings.js";
import { DEFAULT_BRIDGE_MAX_REQUEST_BYTES, MAXIMUM_BRIDGE_MAX_REQUEST_BYTES, MINIMUM_BRIDGE_MAX_REQUEST_BYTES, } from "../domain/analysisResourceLimits.js";
export const BRIDGE_MAX_REQUEST_BYTES_SETTING = "REA_BRIDGE_MAX_REQUEST_BYTES";
export const DEFAULT_BRIDGE_MAX_REQUEST = {
    maximumBytes: DEFAULT_BRIDGE_MAX_REQUEST_BYTES,
    source: "default",
};
const bridgeMaxRequestBytesConstraint = `${BRIDGE_MAX_REQUEST_BYTES_SETTING} must be a positive decimal integer from ${String(MINIMUM_BRIDGE_MAX_REQUEST_BYTES)} to ${String(MAXIMUM_BRIDGE_MAX_REQUEST_BYTES)} bytes; the default is ${String(DEFAULT_BRIDGE_MAX_REQUEST_BYTES)} bytes (16 MiB). A value below ${String(MINIMUM_BRIDGE_MAX_REQUEST_BYTES)} bytes cannot carry the largest admitted symbol-name command, and a larger value is refused so the encoded payload plus its framing LF stays one string under Node's single-string ceiling.`;
/** Optional decimal byte count for the Hopper and Cutter request payload ceiling. */
export const bridgeMaxRequestBytesSchema = positiveDecimalIntegerSchema(MINIMUM_BRIDGE_MAX_REQUEST_BYTES, MAXIMUM_BRIDGE_MAX_REQUEST_BYTES, bridgeMaxRequestBytesConstraint);
/** Resolve the effective ceiling from one environment value. */
export const parseBridgeMaxRequestBytes = (value) => {
    if (value === undefined)
        return ok(DEFAULT_BRIDGE_MAX_REQUEST);
    const parsed = bridgeMaxRequestBytesSchema.safeParse(value);
    return parsed.success
        ? ok({ maximumBytes: parsed.data, source: "setting" })
        : err(new ConfigurationError(bridgeMaxRequestBytesConstraint, {
            settings: [
                {
                    setting: BRIDGE_MAX_REQUEST_BYTES_SETTING,
                    constraint: bridgeMaxRequestBytesConstraint,
                },
            ],
        }));
};
/**
 * Copy the effective request ceiling when a request is admitted, in the
 * caller's async context, so a queued request is written under the ceiling it
 * was admitted with. A malformed launch seed no override covers is refused.
 */
export const admitBridgeRequestLimit = (limit) => readRuntimeSetting(() => ({
    maximumBytes: limit.maximumBytes,
    source: limit.source,
}));
/** How to read and change the effective bridge request ceiling. */
export const bridgeRequestLimit = (limit) => analysisSettingLimit("bridge.max_request_bytes", limit.maximumBytes, limit.source);
export const bridgeMaxRequestBytesRecovery = (limit, peer = "Hopper") => [
    `The effective bridge.max_request_bytes value is ${String(limit.maximumBytes)} bytes (source ${limit.source}; default ${String(DEFAULT_BRIDGE_MAX_REQUEST_BYTES)}, floor ${String(MINIMUM_BRIDGE_MAX_REQUEST_BYTES)}, maximum ${String(MAXIMUM_BRIDGE_MAX_REQUEST_BYTES)}). It can be changed at runtime with update_analysis_settings. The launch seed is ${BRIDGE_MAX_REQUEST_BYTES_SETTING}.`,
    peer === "Ghidra"
        ? `The Ghidra bridge enforces no request ceiling of its own, so only the REA client applies bridge.max_request_bytes to Ghidra requests.`
        : "The Hopper or Cutter bridge keeps the ceiling it started with until that bridge starts again.",
].join(" ");
const limitFacts = (limit) => ({
    max_request_bytes: limit.maximumBytes,
});
/** Refuse one request whose payload is above the effective ceiling. */
export const bridgeRequestOversizeError = (operation, limit, payloadBytes, peer) => {
    const recovery = bridgeMaxRequestBytesRecovery(limit, peer);
    const refusal = peer === "Cutter"
        ? `Cutter request exceeds its authenticated frame limit of ${String(limit.maximumBytes)} bytes; no command was sent.`
        : `${peer} request exceeds its ${String(limit.maximumBytes)}-byte payload limit; no request was sent.`;
    return new AnalysisResourceConstraintError(operation, "transport", `${refusal} ${recovery}`, { ...limitFacts(limit), payload_bytes: payloadBytes }, {
        remediationAction: recovery,
        retryable: false,
        limit: bridgeRequestLimit(limit),
        requestSent: false,
    });
};
/** Refuse a command when the bridge advertisement and the client ceiling differ. */
export const bridgeRequestLimitMismatchError = (operation, limit, bridgeBytes, peer, sent = peer === "Cutter" ? "No command was sent." : "No request was sent.") => {
    const recovery = bridgeMaxRequestBytesRecovery(limit, peer);
    return new AnalysisResourceConstraintError(operation, "transport", `The ${peer} bridge ceiling is ${String(bridgeBytes)} bytes and the REA client ceiling is ${String(limit.maximumBytes)} bytes. ${sent} An out-of-band ${peer} process defaults to ${String(DEFAULT_BRIDGE_MAX_REQUEST_BYTES)} bytes when ${BRIDGE_MAX_REQUEST_BYTES_SETTING} is unset. ${recovery}`, {
        bridge_max_request_bytes: bridgeBytes,
        client_max_request_bytes: limit.maximumBytes,
    }, {
        remediationAction: recovery,
        retryable: false,
        limit: bridgeRequestLimit(limit),
        requestSent: false,
    });
};
/** Refuse a Cutter response that exceeds the same configured frame ceiling. */
export const bridgeResponseOversizeError = (limit) => {
    const recovery = bridgeMaxRequestBytesRecovery(limit, "Cutter");
    return new AnalysisResourceConstraintError("cutter_command", "transport", `Cutter bridge response exceeded its framed transport limit of ${String(limit.maximumBytes)} bytes. ${recovery}`, limitFacts(limit), {
        remediationAction: recovery,
        retryable: false,
        limit: bridgeRequestLimit(limit),
        requestSent: true,
    });
};
