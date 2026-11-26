import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { APPLICATION_TOOL_CONTRACTS, init_applicationToolContracts } from "./applicationToolContracts-BF58W5cg.js";

//#region dist/cli/guidedWorkflowCommands.js
var guidedWorkflowCommands_exports = /* @__PURE__ */ __exportAll({ registerGuidedWorkflowCommands: () => registerGuidedWorkflowCommands });
var registerGuidedWorkflowCommands;
function init_guidedWorkflowCommands() {
	return (init_guidedWorkflowCommands = __esmMin((() => {
		init_applicationToolContracts();
		init_analysisErrorProjection();
		init_contractCliDescription();
		init_contractCommand();
		registerGuidedWorkflowCommands = (cli, logger) => registerContractCommand(cli, logger, contractNamed(APPLICATION_TOOL_CONTRACTS, "guided_workflows"), {
			description: "List or render REA's existing guided workflows",
			runtimeJson: { arguments: "--arguments-json must contain a valid JSON object of string values." },
			fields: {
				action: {
					default: "list",
					description: "List available workflows or render one"
				},
				workflow_id: { description: "Guided workflow identifier for --action render" },
				arguments: {
					name: "argumentsJson",
					description: "JSON object containing caller-supplied string arguments"
				}
			}
		}, async (input) => {
			const { accessGuidedWorkflows } = await import("./application__GuidedWorkflowAccess-B0fj9K1X.js");
			const result = accessGuidedWorkflows(input);
			return result.ok ? result.value : projectAnalysisError(result.error);
		});
	})))();
}

//#endregion
export { guidedWorkflowCommands_exports, init_guidedWorkflowCommands };