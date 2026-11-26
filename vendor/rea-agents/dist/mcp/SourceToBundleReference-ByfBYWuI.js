import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { _ as init_analysisErrorCore, m as cancelledBy, v as isAborted } from "./analysisErrorCore-CrdY4k0A.js";
import { r as init_inputIssueProjection, t as analysisInputErrorFromIssues } from "./inputIssueProjection-BUIigDH2.js";
import { i as requireAuthenticationHeadroom, r as init_JsonAuthenticationHeadroom } from "./JsonAuthenticationHeadroom-C-ZFnIGa.js";
import { n as historicalSourceGraphSchema, r as init_referenceSourceGraph } from "./referenceSourceGraph-7omv8u-2.js";
import { r as readJsonFileWithSource, t as init_JsonFiles } from "./JsonFiles-GvIRBa_2.js";
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