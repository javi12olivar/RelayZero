import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { admittedContractInput, commandRoute, contractInputBranch, contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand, registerRoutedCommand } from "./contractCommand-Di2ugplH.js";
import { CdpBrowserProvider, browserCliError, browserTargetProjection, init_CdpBrowserProvider, init_browserCliError, init_browserContractCommands, observeThroughBrowser } from "./browserContractCommands-CwIJaahw.js";
import { init_browserCaptureComparison, isScenarioCaptureDocument } from "./browserCaptureComparison-CENSP7Ut.js";
import { captureWebScreenshot, compareWebCaptureEvidence, compareWebScreenshotEvidence, discoverWebMcpTools, init_BrowserObservationService } from "./BrowserObservationService-D7lOk8uo.js";
import { BROWSER_TOOL_CONTRACTS, init_browserToolContracts } from "./browserToolContracts-DbPtPXBh.js";

//#region dist/cli/browserAdvancedCommands.js
var browserAdvancedCommands_exports = /* @__PURE__ */ __exportAll({ registerAdvancedBrowserCommands: () => registerAdvancedBrowserCommands });
var registerAdvancedBrowserCommands, registerCaptureDiff, compareCaptures, registerScreenshotDiff;
function init_browserAdvancedCommands() {
	return (init_browserAdvancedCommands = __esmMin((() => {
		init_browserCliError();
		init_browserContractCommands();
		init_contractCliDescription();
		init_contractCommand();
		init_BrowserObservationService();
		init_CdpBrowserProvider();
		init_browserToolContracts();
		init_browserCaptureComparison();
		registerAdvancedBrowserCommands = (cli, logger) => {
			const discoverWebMcp = contractNamed(BROWSER_TOOL_CONTRACTS, "discover_webmcp_tools");
			registerContractCommand(cli, logger, discoverWebMcp, {
				description: "Passively discover page-declared WebMCP tools",
				...browserTargetProjection,
				fields: {
					...browserTargetProjection.fields,
					observation_ms: { description: "Observation duration in milliseconds" }
				}
			}, observeThroughBrowser(discoverWebMcp, discoverWebMcpTools));
			registerCaptureDiff(cli, logger);
			const screenshot = contractNamed(BROWSER_TOOL_CONTRACTS, "capture_web_screenshot");
			registerContractCommand(cli, logger, screenshot, {
				description: "Capture one visible page viewport within the supplied origin scope",
				...browserTargetProjection
			}, observeThroughBrowser(screenshot, captureWebScreenshot));
			registerScreenshotDiff(cli, logger);
		};
		registerCaptureDiff = (cli, logger) => {
			const contract = contractNamed(BROWSER_TOOL_CONTRACTS, "compare_web_captures");
			const command = { description: "Compare two normalized passive captures or recorded browser scenarios" };
			const beforeJson = "beforeJson must be inline JSON or a JSON file path";
			const afterJson = "afterJson must be inline JSON or a JSON file path";
			const before = {
				name: "beforeJson",
				description: "Earlier normalized web capture JSON or JSON file path"
			};
			const after = {
				name: "afterJson",
				description: "Later normalized web capture JSON or JSON file path"
			};
			const scenarios = contractInputBranch(contract, "before_scenario");
			const passive = contractInputBranch(contract, "before");
			registerRoutedCommand(cli, logger, command, [commandRoute(scenarios, {
				...command,
				positionals: ["before_scenario", "after_scenario"],
				jsonInputs: {
					before_scenario: beforeJson,
					after_scenario: afterJson,
					normalization: "normalizationJson must be inline JSON or a JSON file path"
				},
				fields: {
					before_scenario: before,
					after_scenario: after,
					normalization: {
						name: "normalizationJson",
						description: "Recorded literal normalization policy JSON or JSON file path for browser scenarios"
					}
				}
			}, compareCaptures, {
				takes: async (values) => isScenarioCaptureDocument(values.beforeJson) || isScenarioCaptureDocument(values.afterJson),
				requirement: "recorded browser scenario captures"
			}), commandRoute(passive, {
				...command,
				positionals: ["before", "after"],
				jsonInputs: {
					before: beforeJson,
					after: afterJson
				},
				fields: {
					before,
					after
				}
			}, compareCaptures, { requirement: "passive page captures" })]);
		};
		compareCaptures = async (_input, { operation, parsed }) => {
			if (parsed === undefined) throw new Error(`${operation} admits its decoded captures`);
			const result = await compareWebCaptureEvidence(new CdpBrowserProvider(), parsed);
			return result.ok ? result.value : browserCliError(result.error);
		};
		registerScreenshotDiff = (cli, logger) => {
			const contract = contractNamed(BROWSER_TOOL_CONTRACTS, "compare_web_screenshots");
			registerContractCommand(cli, logger, contract, {
				description: "Compare two self-verifying PNG artifact JSON values",
				positionals: ["before", "after"],
				jsonInputs: {
					before: "beforeJson must be inline JSON or a JSON file path",
					after: "afterJson must be inline JSON or a JSON file path"
				},
				fields: {
					before: {
						name: "beforeJson",
						description: "Earlier screenshot artifact JSON or JSON file path"
					},
					after: {
						name: "afterJson",
						description: "Later screenshot artifact JSON or JSON file path"
					},
					channel_threshold: { description: "Per-channel difference threshold for changed pixels" }
				}
			}, async (_input, context) => {
				const admitted = admittedContractInput(context);
				if (!admitted.ok) return browserCliError(admitted.error);
				const result = await compareWebScreenshotEvidence(new CdpBrowserProvider(), admitted.value);
				return result.ok ? result.value : browserCliError(result.error);
			});
		};
	})))();
}

//#endregion
export { browserAdvancedCommands_exports, init_browserAdvancedCommands };