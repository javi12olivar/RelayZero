import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { desktopApplicationSchema, desktopApplicationSummaryViewResultSchema, init_analysisViewResult, init_desktopApplication, inspectDesktopApplicationInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/contracts/desktopApplicationToolContracts.js
var DESKTOP_APPLICATION_TOOL_CONTRACTS;
function init_desktopApplicationToolContracts() {
	return (init_desktopApplicationToolContracts = __esmMin((() => {
		init_desktopApplication();
		init_analysisViewResult();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		DESKTOP_APPLICATION_TOOL_CONTRACTS = [{
			name: "inspect_desktop_application",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_desktop_application", evidenceEffects),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Identify runtime candidates and next probes in a local desktop app directory from bounded listings, headers and metadata. Recognizes .NET, Unity Mono/IL2CPP, Unreal, Godot, GameMaker and Electron; returns supporting paths and range hashes. Default summary retains complete Evidence for inspect_analysis_view kind desktop-application; detail complete returns retained facts inline. Identity covers examined ranges, not every file byte. Coverage and unavailable probes remain explicit. No target execution, extraction, network or target changes.",
			inputSchema: inspectDesktopApplicationInputSchema.extend({ detail: z.enum(["summary", "complete"]).default("summary") }),
			outputSchema: evidenceResultOf(z.union([desktopApplicationSchema, desktopApplicationSummaryViewResultSchema])),
			examples: [{
				title: "Identify a desktop installation",
				input: { path: "/artifacts/application" }
			}]
		}];
	})))();
}

//#endregion
export { DESKTOP_APPLICATION_TOOL_CONTRACTS, init_desktopApplicationToolContracts };