import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { CLI_COMMANDS, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliLogging, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { ArtifactResourceScope, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, init_jsonInputArgument, jsonInputArgument, registerContractDocumentCommand } from "./contractCommand-Di2ugplH.js";
import { init_EvidenceBundleCommands, inspectEvidenceBundleCommand } from "./EvidenceBundleCommands-HNZ8Jc46.js";
import { ANALYSIS_VIEW_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { init_AnalysisViewService, inspectAnalysisView } from "./AnalysisViewService-D_M3W3PD.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { init_cliJsonInput, parseCliJsonInput } from "./cliJsonInput-DxRb6ijM.js";
import { getEvidenceBundleInputSchema, importEvidenceBundleInputSchema, init_sessionToolSchemas } from "./sessionToolContracts-D9XcfL6p.js";
import { ANALYSIS_VIEW_TOOL_CONTRACTS, init_analysisViewToolContracts } from "./analysisViewToolContracts-CBSSJIK5.js";
import { z } from "zod";

//#region dist/cli/analysisViewCommands.js
var analysisViewCommands_exports = /* @__PURE__ */ __exportAll({ registerAnalysisViewCommands: () => registerAnalysisViewCommands });
var inspectEvidenceBundleCliInputSchema, registerAnalysisViewCommands;
function init_analysisViewCommands() {
	return (init_analysisViewCommands = __esmMin((() => {
		init_AnalysisViewService();
		init_resources();
		init_investigationProviders();
		init_EvidenceBundleCommands();
		init_analysisViewToolContracts();
		init_sessionToolSchemas();
		init_cliCommandNames();
		init_cliJsonInput();
		init_cliLogging();
		init_analysisErrorProjection();
		init_inputIssueProjection();
		init_commandRegistry();
		init_localPath();
		init_commandCancellation();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		init_jsonInputArgument();
		inspectEvidenceBundleCliInputSchema = getEvidenceBundleInputSchema.safeExtend({ path: importEvidenceBundleInputSchema.shape.path });
		registerAnalysisViewCommands = (cli, logger) => {
			registerCliCommand(cli, CLI_COMMANDS.inspectEvidenceBundle, {
				description: "Inspect a local Evidence bundle completely, as discovery metadata, as a page of selected complete records, or as direct-link and retained-closure membership.",
				args: z.object({ inputJson: jsonInputArgument("JSON or JSON file with absolute path, detail, optional record filters, records or links offset/limit, and links traversal/link_status", inspectEvidenceBundleCliInputSchema) }),
				run: ({ args }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.inspectEvidenceBundle, async () => {
					const input = await parseCliJsonInput(args.inputJson, CLI_COMMANDS.inspectEvidenceBundle, signal);
					if (!input.ok) return input.error;
					const parsed = inspectEvidenceBundleCliInputSchema.safeParse(input.value);
					if (!parsed.success) return {
						error: "Evidence bundle inspection failed",
						...projectAnalysisError(analysisInputErrorFromIssues(CLI_COMMANDS.inspectEvidenceBundle, parsed.error.issues, input.value))
					};
					const result = await inspectEvidenceBundleCommand(parsed.data, signal);
					return result.ok ? result.value : {
						error: "Evidence bundle inspection failed",
						...projectAnalysisError(result.error)
					};
				}))
			});
			registerContractDocumentCommand(cli, logger, contractNamed(ANALYSIS_VIEW_TOOL_CONTRACTS, "inspect_analysis_view"), {
				description: "Project a selected view of completed Evidence JSON for a supported analysis operation. For inventory rows, use --format csv or --format tsv with --filter-output normalized_result.items and --columns logical_path,artifact_id (if those fields are included in the view).",
				document: "Inline workflow JSON or JSON file path",
				callerPaths: [["source", "path"]],
				cliOptions: { evidenceBundle: localPathStringSchema.optional().describe("Read the exact retained-evidence source ID from this local Evidence bundle without reopening the target; omit for inline Evidence") }
			}, async (document, { signal, operation, cliOptions }) => {
				const resources = new ArtifactResourceScope();
				const bundlePath = cliOptions.evidenceBundle;
				const result = await finishAnalysisCommand(() => inspectAnalysisView(document, undefined, {
					signal,
					resources,
					...bundlePath === undefined ? {} : { evidenceBundlePath: bundlePath }
				}), resources, ANALYSIS_VIEW_PROVIDER.id, operation, signal);
				return result.ok ? result.value : bundlePath === undefined ? {
					error: "Application workflow failed",
					...result.error
				} : result.error;
			});
		};
	})))();
}

//#endregion
export { analysisViewCommands_exports, init_analysisViewCommands };