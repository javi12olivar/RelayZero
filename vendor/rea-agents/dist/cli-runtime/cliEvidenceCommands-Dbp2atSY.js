import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { CLI_COMMANDS, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliLogging, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { bundleComparisonInputSchema, init_bundleComparison } from "./evidenceRecordSummary-B3n4elFj.js";
import { compareEvidenceBundlesCommand, exportEvidenceBundleCommand, importEvidenceBundleCommand, init_EvidenceBundleCommands } from "./EvidenceBundleCommands-HNZ8Jc46.js";
import { init_cliJsonInput, parseCliJsonInput } from "./cliJsonInput-DxRb6ijM.js";
import { z } from "zod";

//#region dist/cliEvidenceCommands.js
var cliEvidenceCommands_exports = /* @__PURE__ */ __exportAll({ registerEvidenceCommands: () => registerEvidenceCommands });
var registerEvidenceCommands, cliError;
function init_cliEvidenceCommands() {
	return (init_cliEvidenceCommands = __esmMin((() => {
		init_commandCancellation();
		init_cliJsonInput();
		init_inputIssueProjection();
		init_bundleComparison();
		init_commandRegistry();
		init_EvidenceBundleCommands();
		init_cliLogging();
		init_cliCommandNames();
		init_analysisErrorProjection();
		init_localPath();
		registerEvidenceCommands = (cli, logger) => {
			registerCliCommand(cli, CLI_COMMANDS.evidenceImport, {
				description: "Validate a standalone Evidence bundle and count records and Unknown revisions; does not retain them in an MCP session",
				args: z.object({ path: localPathStringSchema.describe("Evidence bundle JSON path") }),
				run: ({ args }) => withCommandCancellation((signal) => logCliCommand(logger, "evidence-import", async () => {
					const imported = await importEvidenceBundleCommand(args.path, signal);
					return imported.ok ? imported.value : cliError(imported.error);
				}))
			});
			registerCliCommand(cli, CLI_COMMANDS.evidenceExport, {
				description: "Validate and atomically export canonical Evidence JSON",
				args: z.object({
					source: localPathStringSchema.describe("Existing evidence bundle JSON path"),
					output: localPathStringSchema.describe("Canonical output JSON path")
				}),
				options: z.object({ overwrite: z.boolean().default(false).describe("Replace output file") }),
				run: ({ args, options }) => withCommandCancellation((signal) => logCliCommand(logger, "evidence-export", async () => {
					const exported = await exportEvidenceBundleCommand(args.source, args.output, options.overwrite, signal);
					return exported.ok ? exported.value : cliError(exported.error);
				}))
			});
			registerCliCommand(cli, CLI_COMMANDS.compare, {
				description: "Compare two canonical Evidence bundles by record identity; use compare-artifacts for artifact inventory contents",
				args: z.object({
					left: localPathStringSchema.describe("Left Evidence bundle JSON path"),
					right: localPathStringSchema.describe("Right Evidence bundle JSON path")
				}),
				options: z.object({ record_pairs: z.string().optional().describe("Inline JSON array or local JSON file of left_evidence_id/right_evidence_id pairs") }),
				run: ({ args, options }) => withCommandCancellation((signal) => logCliCommand(logger, "compare", async () => {
					const decoded = options.record_pairs === undefined ? {
						ok: true,
						value: []
					} : await parseCliJsonInput(options.record_pairs, "compare_bundles", signal);
					if (!decoded.ok) return decoded.error;
					const input = { record_pairs: decoded.value };
					const selected = bundleComparisonInputSchema.pick({ record_pairs: true }).safeParse(input);
					if (!selected.success) return cliError(analysisInputErrorFromIssues("compare_bundles", selected.error.issues, input));
					const compared = await compareEvidenceBundlesCommand({
						leftPath: args.left,
						rightPath: args.right,
						recordPairs: selected.data.record_pairs,
						signal
					});
					return compared.ok ? compared.value : cliError(compared.error);
				}))
			}, { operations: [{
				name: "compare_bundles",
				flags: { record_pairs: "--record_pairs" }
			}] });
		};
		cliError = (error) => ({
			error: "Analysis failed",
			...projectAnalysisError(error)
		});
	})))();
}

//#endregion
export { cliEvidenceCommands_exports, init_cliEvidenceCommands };