import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_localPath, init_schemaAnnotations, presentRootDiscriminator } from "./jsonSerialization-DAF9DVXC.js";
import { init_analysisViewResult, init_javascriptRoutesView, javaScriptRoutesCompleteDeliveryShape, javaScriptRoutesSummaryDeliveryShape, javaScriptRoutesViewResultSchema, javascriptApplicationSummaryViewResultSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { analyzeJavaScriptApplicationInputSchema, init_javascriptApplicationAnalysis, javascriptApplicationAnalysisResultSchema } from "./javascriptModuleUnits-YkbK0IJF.js";
import { analysisDetailOutputSchemaOf, browserEvidenceEffects, electronFuseOutputSchemas, evidenceEffects, evidenceResultOf, init_analysisDetail, init_electronFuses, init_toolEffects, init_toolOutputSchemaGroups, init_toolOutputSchemaPrimitives, inspectElectronFusesInputSchema, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { JAVASCRIPT_RUNTIME_RECONCILIATION_EXAMPLE, electronActiveObservationInputSchema, electronActiveObservationResultSchema, electronPageInspectionSchema, electronTargetListSchema, init_applicationWorkflowInputContracts, init_electronActiveObservation, init_electronObservation, init_javascriptRuntimeReconciliationExample, init_javascriptRuntimeReconciliationSchemas, inspectElectronPageInputSchema, javascriptRuntimeReconciliationResultSchema, listElectronTargetsInputSchema, reconcileJavaScriptRuntimeRequestSchema } from "./javascriptRuntimeReconciliationExample-CfD5_IWS.js";
import { z } from "zod";

//#region dist/contracts/javascript/electronToolContracts.js
var listOutputSchema, inspectionOutputSchema, javascriptApplicationMcpInputSchema, analyzeJavaScriptApplicationRequestSchema, applicationOutputSchema, reconciliationOutputSchema, endpoint, activeExample, ELECTRON_TOOL_CONTRACTS;
function init_electronToolContracts() {
	return (init_electronToolContracts = __esmMin((() => {
		init_localPath();
		init_toolEffects();
		init_toolOutputSchemaGroups();
		init_toolOutputSchemaPrimitives();
		init_electronFuses();
		init_electronObservation();
		init_electronActiveObservation();
		init_javascriptRoutesView();
		init_analysisViewResult();
		init_analysisDetail();
		init_javascriptApplicationAnalysis();
		init_javascriptRuntimeReconciliationSchemas();
		init_applicationWorkflowInputContracts();
		init_javascriptRuntimeReconciliationExample();
		init_schemaAnnotations();
		listOutputSchema = evidenceResultOf(electronTargetListSchema);
		inspectionOutputSchema = evidenceResultOf(electronPageInspectionSchema);
		javascriptApplicationMcpInputSchema = analyzeJavaScriptApplicationInputSchema.extend({ input_path: absoluteLocalPathStringSchema.describe("Absolute path to the JavaScript application on the machine running REA.") });
		analyzeJavaScriptApplicationRequestSchema = presentRootDiscriminator(z.discriminatedUnion("detail", [javascriptApplicationMcpInputSchema.extend(javaScriptRoutesCompleteDeliveryShape), javascriptApplicationMcpInputSchema.extend(javaScriptRoutesSummaryDeliveryShape)]), "detail");
		applicationOutputSchema = analysisDetailOutputSchemaOf(javascriptApplicationAnalysisResultSchema, z.union([javascriptApplicationSummaryViewResultSchema, javaScriptRoutesViewResultSchema]));
		reconciliationOutputSchema = evidenceResultOf(javascriptRuntimeReconciliationResultSchema);
		endpoint = "http://127.0.0.1:9223";
		activeExample = {
			executable_path: "/Applications/Electron.app/Contents/MacOS/Electron",
			application_path: "/Applications/Example.app/Contents/Resources/main.js",
			args: [],
			actions: [{
				step_id: "exercise-ipc",
				kind: "click",
				selector: "#run"
			}]
		};
		ELECTRON_TOOL_CONTRACTS = [
			{
				name: "list_electron_targets",
				cli: true,
				...toolContractMetadata("list_electron_targets", browserEvidenceEffects),
				description: "List every Electron file:// page target from a selected loopback CDP endpoint. Local file paths are canonicalized after symlink resolution. Selecting an endpoint exposes every eligible target and its local path metadata.",
				kind: "electron-provider",
				inputSchema: listElectronTargetsInputSchema,
				outputSchema: listOutputSchema,
				examples: [{
					title: "List Electron file pages",
					input: { cdp_endpoint: endpoint }
				}]
			},
			{
				name: "inspect_electron_page",
				cli: true,
				...toolContractMetadata("inspect_electron_page", browserEvidenceEffects),
				description: "Passively inspect one Electron file page by supplying its loopback CDP endpoint and target ID. The provider rechecks that the target currently exists at that endpoint and is a local file page. Returns frames, DOM structure, resource paths, and scripts without evaluating renderer JavaScript or invoking Electron APIs. The selected endpoint exposes every local file page and its metadata to this tool.",
				kind: "electron-provider",
				inputSchema: inspectElectronPageInputSchema,
				outputSchema: inspectionOutputSchema,
				examples: [{
					title: "Inspect an Electron page",
					input: {
						cdp_endpoint: endpoint,
						target_id: "TARGET_ID_FROM_LIST_ELECTRON_TARGETS"
					}
				}]
			},
			{
				name: "analyze_javascript_application",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("analyze_javascript_application", toolEffects({
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true
				})),
				description: "Build a static application graph from a local ASAR or extracted JavaScript app without executing it. Supply input_path, e.g. {input_path:\"/apps/client\",source_paths:[\"main.js\"],detail:\"summary\"}. Copy source_paths exactly from the inventory, not host-absolute paths inferred from input_path. Returns nodes, edges, semantic relations, integrity contradictions, coverage and unknowns. source_paths limits source analysis to exact inventoried paths without narrowing inventory or artifact identity; dependencies are not implicitly analyzed and unselected sources remain unknown. detail summary reduces delivery, retaining complete Evidence for inspect_analysis_view; it does not reduce analysis. With summary detail, view {kind:\"javascript-routes\",collection:\"routes\",offset:0,limit:64} selects static route patterns; static routes do not prove reachability or the complete route set. Integrity mismatches fail by default; record-and-continue retains untrusted observed bytes and partial coverage. analysis_timeout_ms is a per-source provider budget. A host-only timeout needs a longer client deadline, not that budget; do not repeat unchanged work or assume it stopped. If configuration cannot be edited, report the host setting (Codex: mcp_servers.<server>.tool_timeout_sec, seconds).",
				kind: "electron-provider",
				inputSchema: analyzeJavaScriptApplicationRequestSchema,
				outputSchema: applicationOutputSchema,
				examples: [
					{
						title: "Analyze one local JavaScript application",
						input: {
							input_path: "/Applications/Example.app/Contents/Resources/app.asar",
							format: "auto",
							integrity_policy: "fail"
						}
					},
					{
						title: "Analyze selected entry sources before unrelated vendor files",
						input: {
							input_path: "/Applications/Example.app/Contents/Resources/app.asar",
							source_paths: [
								"package.json",
								"main.js",
								"preload.js"
							],
							detail: "summary"
						}
					},
					{
						title: "Retain the complete analysis and return its summary view",
						input: {
							input_path: "/Applications/Example.app/Contents/Resources/app.asar",
							detail: "summary"
						}
					}
				]
			},
			{
				name: "reconcile_javascript_runtime",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("reconcile_javascript_runtime", evidenceEffects),
				description: "Reconcile verified static JavaScript application graphs with existing passive web/Electron CDP, passive V8 Inspector, or provider-owned active Electron Evidence. Active Electron captures contribute an explicitly partial target-only runtime record; they never invent renderer scripts, frames, workers, or execution claims. Exact captured-source digests take priority over caller-declared file/URL mappings; target, frame, script, and worker ambiguity remains explicit, and source-map authority stays separate.",
				kind: "electron-provider",
				inputSchema: reconcileJavaScriptRuntimeRequestSchema,
				outputSchema: reconciliationOutputSchema,
				examples: [{
					title: "Reconcile one passive Electron capture",
					input: JAVASCRIPT_RUNTIME_RECONCILIATION_EXAMPLE
				}]
			},
			{
				name: "capture_electron_scenario",
				cli: true,
				...toolContractMetadata("capture_electron_scenario", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true,
					accessesNetwork: true,
					changesUiState: true,
					mayDiscardData: true,
					executesForeignCode: true,
					idempotent: false
				})),
				description: "Launch and exercise an owned Electron app when passive CDP/Inspector observation cannot answer the question. REA owns startup/teardown; selected click/wait, renderer reload/crash and synthetic open-url/second-instance actions change runtime behavior. Returns correlated window/WebContents/process/preload/session/navigation/shell/IPC observations without payload values, plus action targets and coverage/truncation. Actions wait for completion or cancellation; a missing click target can remain pending. External shell, navigation, permission, download, popup, updater and OS-integration effects are blocked and recorded. Cleanup failures retain observations with explicit uncertainty. Use inspect_electron_page or observe_javascript_runtime for passive observation.",
				kind: "electron-provider",
				inputSchema: electronActiveObservationInputSchema,
				outputSchema: evidenceResultOf(electronActiveObservationResultSchema),
				examples: [{
					title: "Exercise an owned Electron application",
					input: activeExample
				}]
			},
			{
				name: "inspect_electron_fuses",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_electron_fuses", evidenceEffects),
				kind: "artifact-provider",
				requiresActiveTarget: true,
				description: "Inspect packaged Electron fuse bytes in one local macOS app bundle, Electron Framework binary, Windows PE executable, or Linux ELF executable. Returns the artifact digest, per-slice wire version, fuse index, version-1 name, state, and raw byte, plus derived implications for Inspector flags, ELECTRON_RUN_AS_NODE, embedded ASAR integrity, and app.asar-only loading. A missing sentinel is unknown fuse state. Reads artifact bytes only and does not modify the selected file or open a runtime target.",
				inputSchema: inspectElectronFusesInputSchema,
				outputSchema: electronFuseOutputSchemas.inspect_electron_fuses,
				examples: [{
					title: "Read packaged Electron fuse state",
					input: { path: "/Applications/Example.app" }
				}]
			}
		];
	})))();
}

//#endregion
export { ELECTRON_TOOL_CONTRACTS, init_electronToolContracts };