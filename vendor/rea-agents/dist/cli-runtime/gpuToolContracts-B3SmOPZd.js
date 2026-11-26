import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { gpuCodeObjectsPageViewResultSchema, gpuCodeObjectsSchema, gpuCodeObjectsSummaryViewResultSchema, init_analysisViewResult, init_gpuCodeObjects, inspectGpuCodeObjectsInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/contracts/gpu/gpuToolContracts.js
var GPU_TOOL_CONTRACTS;
function init_gpuToolContracts() {
	return (init_gpuToolContracts = __esmMin((() => {
		init_gpuCodeObjects();
		init_analysisViewResult();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		GPU_TOOL_CONTRACTS = [{
			name: "inspect_gpu_code_objects",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_gpu_code_objects", evidenceEffects),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Inspect CUDA/HIP code objects in local ELF/PE, fatbins, CUBIN, PTX or Clang HIP bundles without GPU tools or target execution. Default inventory hashes the full file; analysis kernels decodes selected object_ids/targets, with object_ids requiring the inventory expected_sha256. IDs are positional within that digest. Returns distinct PTX/CUBIN/AMDGPU kernel declarations, encoded/decoded provenance and explicit partial/unknown coverage; unsupported compression retains encoded locations. Default summary retains complete Evidence. Optional view selects targets/objects/kernels or PTX text; inspect_analysis_view kind gpu-code-objects pages retained facts without reopening (PTX offsets are UTF-16 units). No SASS disassembly, host-launch correlation or network; decoded-work/retention limits remain independent of selection.",
			inputSchema: inspectGpuCodeObjectsInputSchema,
			outputSchema: evidenceResultOf(z.union([
				gpuCodeObjectsSchema,
				gpuCodeObjectsSummaryViewResultSchema,
				gpuCodeObjectsPageViewResultSchema
			])),
			examples: [{
				title: "List embedded GPU targets before selecting payloads",
				input: {
					path: "/artifacts/application.so",
					analysis: "inventory",
					detail: "summary",
					view: { collection: "targets" }
				}
			}]
		}];
	})))();
}

//#endregion
export { GPU_TOOL_CONTRACTS, init_gpuToolContracts };