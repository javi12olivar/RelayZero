import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { cancelledBy, init_analysisErrorCore, isAborted } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { init_JsonAuthenticationHeadroom, requireAuthenticationHeadroom } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { init_JsonFiles, readJsonFileWithSource } from "./JsonFiles-CvkLtuRa.js";
import { historicalSourceGraphSchema, init_referenceSourceGraph } from "./referenceSourceGraph-Bt5EfEba.js";
import { setImmediate } from "node:timers/promises";

//#region dist/application/javascript/SourceToBundleReference.js
var resolveSourceToBundleReference;
function init_SourceToBundleReference() {
	return (init_SourceToBundleReference = __esmMin((() => {
		init_JsonAuthenticationHeadroom();
		init_referenceSourceGraph();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_result();
		init_JsonFiles();
		resolveSourceToBundleReference = async (reference, signal, resources, requestedPath) => {
			if (isAborted(signal)) return err(cancelledBy("compare_source_to_bundle", signal));
			if (!("kind" in reference)) return ok({ reference });
			const read = await readJsonFileWithSource(reference.path, signal, resources, "compare_source_to_bundle");
			if (!read.ok) return read;
			await setImmediate();
			if (isAborted(signal)) return err(cancelledBy("compare_source_to_bundle", signal));
			const headroom = requireAuthenticationHeadroom(read.value.data, {
				operation: "compare_source_to_bundle",
				path: read.value.path,
				description: "Insufficient heap headroom to authenticate the historical source graph"
			});
			if (!headroom.ok) return headroom;
			const parsed = historicalSourceGraphSchema.safeParse(read.value.data);
			await setImmediate();
			if (isAborted(signal)) return err(cancelledBy("compare_source_to_bundle", signal));
			if (!parsed.success) return err(analysisInputErrorFromIssues("compare_source_to_bundle", parsed.error.issues.map((issue) => ({
				...issue,
				path: ["reference", ...issue.path]
			})), { reference: read.value.data }, { cause: parsed.error }));
			return ok({
				reference: parsed.data,
				reference_source: {
					kind: "file",
					path: read.value.path,
					requested_path: requestedPath ?? reference.path
				}
			});
		};
	})))();
}

//#endregion
init_SourceToBundleReference();
export { resolveSourceToBundleReference };