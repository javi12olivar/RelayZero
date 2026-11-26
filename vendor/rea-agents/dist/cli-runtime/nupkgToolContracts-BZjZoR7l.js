import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_nupkg, inspectNugetNupkgInputSchema, nugetNupkgSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";

//#region dist/contracts/nuget/nupkgToolContracts.js
var NUGET_NUPKG_TOOL_CONTRACTS;
function init_nupkgToolContracts() {
	return (init_nupkgToolContracts = __esmMin((() => {
		init_nupkg();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		NUGET_NUPKG_TOOL_CONTRACTS = [{
			name: "inspect_nuget_nupkg",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_nuget_nupkg", evidenceEffects),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Inspect a local NuGet .nupkg ZIP without restoring, executing, or contacting a feed. Returns package identity (id, version, authors, description), license and repository fields as present in the .nuspec, dependency groups with target frameworks and version ranges, and a ZIP contents inventory (entry names, sizes, encrypted flag, path-derived folder roles). Missing, ambiguous, or malformed .nuspec members succeed with inventory and explicit limitations. Encrypted members are listed and not extracted. Invalid ZIP input fails without partial success. Member roles are folder conventions, not restore-time asset selection. Complete Evidence is the result.",
			inputSchema: inspectNugetNupkgInputSchema,
			outputSchema: evidenceResultOf(nugetNupkgSchema),
			examples: [{
				title: "Inspect package identity and dependency groups",
				input: { path: "/artifacts/Demo.Package.1.2.3.nupkg" }
			}]
		}];
	})))();
}

//#endregion
export { NUGET_NUPKG_TOOL_CONTRACTS, init_nupkgToolContracts };