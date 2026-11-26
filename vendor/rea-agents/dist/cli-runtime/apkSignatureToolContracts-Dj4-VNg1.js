import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { apkSignaturePageViewResultSchema, apkSignatureResultSchema, apkSignatureSummaryViewResultSchema, init_analysisViewResult, init_apkSignatureQuery, init_apkSignatureReport, inspectApkSignatureInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/contracts/apkSignature/apkSignatureToolContracts.js
var INSPECT_APK_SIGNATURE_CONTRACT, APK_SIGNATURE_TOOL_CONTRACTS;
function init_apkSignatureToolContracts() {
	return (init_apkSignatureToolContracts = __esmMin((() => {
		init_apkSignatureReport();
		init_apkSignatureQuery();
		init_analysisViewResult();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		INSPECT_APK_SIGNATURE_CONTRACT = {
			name: "inspect_apk_signature",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_apk_signature", evidenceEffects),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Inspect declared APK v1/v2/v3/v3.1 signers, certificate fingerprints, digests, SDK ranges, rotation lineage and source stamp without executing Android code. Returns exact file SHA-256; identities include scheme/source ordinal and certificates retain DER digests. Default summary retains complete Evidence; optional view selects signers/digests/lineage by IDs/schemes/fields and pages. Reuse inspect_analysis_view kind apk-signature after removing the source. Matching content digests do not verify signatures or authenticity; lineage trust and v1 entry coverage remain unverified. No device, network or SDK; malformed structures and resource refusals are explicit.",
			inputSchema: inspectApkSignatureInputSchema,
			outputSchema: evidenceResultOf(z.union([
				apkSignatureResultSchema,
				apkSignatureSummaryViewResultSchema,
				apkSignaturePageViewResultSchema
			])),
			examples: [{
				title: "Identify who signed an APK and under which schemes",
				input: { path: "/artifacts/app.apk" }
			}]
		};
		APK_SIGNATURE_TOOL_CONTRACTS = [INSPECT_APK_SIGNATURE_CONTRACT];
	})))();
}

//#endregion
export { APK_SIGNATURE_TOOL_CONTRACTS, INSPECT_APK_SIGNATURE_CONTRACT, init_apkSignatureToolContracts };