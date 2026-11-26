import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES, init_analysisResourceLimits } from "./jsonSerialization-DAF9DVXC.js";
import { currentAnalysisOperationSnapshot, init_analysisOperationSnapshot } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { PWNTOOLS_LIMITS, init_pwntoolsResourceLimits } from "./urlComponents-DJm-wtqY.js";
import { z } from "zod";

//#region dist/config/pwntoolsInputLimit.js
var pwntoolsInputBytesSchema, CONSTRAINT, pwntoolsInputBytes;
function init_pwntoolsInputLimit() {
	return (init_pwntoolsInputLimit = __esmMin((() => {
		init_analysisResourceLimits();
		init_analysisOperationSnapshot();
		init_pwntoolsResourceLimits();
		pwntoolsInputBytesSchema = z.string().regex(/^[1-9]\d*$/u, "must be a positive decimal integer").transform(Number).pipe(z.int().safe().max(MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES));
		CONSTRAINT = `REA_PWNTOOLS_MAX_INPUT_BYTES must be a decimal integer from 1 to ` + `${String(MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES)} bytes, and REA never installs Python or packages.`;
		pwntoolsInputBytes = (environment) => {
			const override = currentAnalysisOperationSnapshot()?.overrides["pwntools.max_input_bytes"];
			if (override !== undefined) return {
				configured: true,
				bytes: override,
				source: "runtime"
			};
			const value = environment.REA_PWNTOOLS_MAX_INPUT_BYTES;
			if (value === undefined) return {
				configured: true,
				bytes: PWNTOOLS_LIMITS.input_bytes,
				source: "default"
			};
			const parsed = pwntoolsInputBytesSchema.safeParse(value);
			return parsed.success ? {
				configured: true,
				bytes: parsed.data,
				source: "setting"
			} : {
				configured: false,
				error: CONSTRAINT
			};
		};
	})))();
}

//#endregion
export { init_pwntoolsInputLimit, pwntoolsInputBytes, pwntoolsInputBytesSchema };