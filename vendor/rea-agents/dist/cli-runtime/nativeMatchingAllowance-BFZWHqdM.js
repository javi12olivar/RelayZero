import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES, MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES, init_analysisResourceLimits, init_configurationErrors } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { z } from "zod";

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
export { DEFAULT_NATIVE_MATCHING_ALLOWANCE, init_nativeMatchingAllowance, nativeMatchingAllowanceRecovery, nativeMatchingByteAllowance, parseNativeMatchingAllowance };