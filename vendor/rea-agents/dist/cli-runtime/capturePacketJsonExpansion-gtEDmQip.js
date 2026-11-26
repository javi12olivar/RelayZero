import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisResourceConstraintError, ConfigurationError, DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES, MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, analysisSettingLimit, init_analysisErrorCore, init_analysisResourceLimits, init_analysisSettingDefinitions, init_configurationErrors } from "./jsonSerialization-DAF9DVXC.js";
import { currentAnalysisSettingOverride, init_analysisOperationSnapshot } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_positiveDecimalInteger, positiveDecimalIntegerSchema } from "./positiveDecimalInteger-BhPy7XMJ.js";

//#region dist/config/capturePacketJsonExpansion.js
var CAPTURE_PACKET_JSON_EXPANSION_SETTING, constraint, capturePacketJsonExpansionBytesSchema, resolveCapturePacketJsonExpansion, capturePacketJsonExpansionError;
function init_capturePacketJsonExpansion() {
	return (init_capturePacketJsonExpansion = __esmMin((() => {
		init_analysisResourceLimits();
		init_analysisOperationSnapshot();
		init_analysisErrorCore();
		init_analysisSettingDefinitions();
		init_configurationErrors();
		init_result();
		init_positiveDecimalInteger();
		CAPTURE_PACKET_JSON_EXPANSION_SETTING = "REA_CAPTURE_PACKET_JSON_EXPANSION_BYTES";
		constraint = `${CAPTURE_PACKET_JSON_EXPANSION_SETTING} must be a decimal integer from ${String(MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES)} to ${String(MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES)} bytes; the default is ${String(DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES)} bytes.`;
		capturePacketJsonExpansionBytesSchema = positiveDecimalIntegerSchema(MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, constraint);
		resolveCapturePacketJsonExpansion = (environment) => {
			const override = currentAnalysisSettingOverride("capture.packet_json_expansion_bytes");
			if (override !== undefined) return ok({
				maximumBytes: override,
				source: "runtime"
			});
			const value = environment[CAPTURE_PACKET_JSON_EXPANSION_SETTING];
			if (value === undefined) return ok({
				maximumBytes: DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES,
				source: "default"
			});
			const parsed = capturePacketJsonExpansionBytesSchema.safeParse(value);
			return parsed.success ? ok({
				maximumBytes: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(constraint, { settings: [{
				setting: CAPTURE_PACKET_JSON_EXPANSION_SETTING,
				constraint
			}] }));
		};
		capturePacketJsonExpansionError = (operation, budget, capturedOutput) => new AnalysisResourceConstraintError(operation, "memory", `TShark JSON expansion exceeds the capture.packet_json_expansion_bytes budget of ${String(budget.maximumBytes)} bytes; the packets were not parsed.`, { max_decoded_bytes: budget.maximumBytes }, {
			retryable: false,
			limit: analysisSettingLimit("capture.packet_json_expansion_bytes", budget.maximumBytes, budget.source),
			...capturedOutput === undefined ? {} : { capturedOutput }
		});
	})))();
}

//#endregion
export { capturePacketJsonExpansionBytesSchema, capturePacketJsonExpansionError, init_capturePacketJsonExpansion, resolveCapturePacketJsonExpansion };