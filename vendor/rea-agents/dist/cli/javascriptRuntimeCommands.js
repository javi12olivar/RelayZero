import { projectCliAnalysisResult } from "./projectCliAnalysisResult.js";
import { listJavaScriptRuntimeTargets, observeJavaScriptRuntime, } from "../application/javascript/JavaScriptRuntimeObservationService.js";
import { createJavaScriptRuntimeObservationProvider } from "../composition/javascriptRuntimeObservation.js";
import { JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS } from "../contracts/javascript/javascriptRuntimeObservationToolContracts.js";
import { V8InspectorAdmission } from "../inspector/V8InspectorProvider.js";
import { projectAnalysisError } from "../domain/analysisErrorProjection.js";
import { finishAnalysisCommand } from "./finishAnalysisCommand.js";
import { contractNamed } from "./contractCliDescription.js";
import { admittedContractInput, registerContractCommand, } from "./contractCommand.js";
/** Register CLI equivalents of passive V8 Inspector tools. */
export const registerJavaScriptRuntimeObservationCommands = (cli, logger, environment) => {
    const admission = new V8InspectorAdmission();
    // Admit the contract input, then observe through a disposable Inspector
    // provider whose close the command awaits.
    const observe = (contract, run) => async (_input, context) => {
        const admitted = admittedContractInput(context);
        if (!admitted.ok)
            return cliError(admitted.error);
        const input = admitted.value;
        const { signal } = context;
        const provider = createJavaScriptRuntimeObservationProvider(environment, undefined, admission);
        return finishAnalysisCommand(() => run(provider, input, { signal }), { close: () => provider.close?.() ?? Promise.resolve() }, provider.identity().id, contract.name, signal, "V8 Inspector resources").then(projectCliAnalysisResult);
    };
    const endpoint = {
        name: "endpoint",
        description: "Literal-loopback Inspector endpoint",
    };
    const listTargets = contractNamed(JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS, "list_javascript_runtime_targets");
    registerContractCommand(cli, logger, listTargets, {
        description: "List Node/Electron V8 Inspector targets",
        positionals: ["inspector_endpoint"],
        fields: { inspector_endpoint: endpoint },
    }, observe(listTargets, listJavaScriptRuntimeTargets));
    const observeRuntime = contractNamed(JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS, "observe_javascript_runtime");
    registerContractCommand(cli, logger, observeRuntime, {
        description: "Passively observe one exact Node/Electron Inspector target",
        positionals: ["inspector_endpoint", "target_id"],
        fields: {
            inspector_endpoint: endpoint,
            target_id: {
                description: "Target from list-javascript-runtime-targets",
            },
            runtime_kind: {
                description: "Declared target role; Inspector cannot authenticate the Electron role",
            },
            observation_ms: {
                description: "Observation window in milliseconds",
            },
        },
    }, observe(observeRuntime, observeJavaScriptRuntime));
};
const cliError = (error) => ({
    error: "JavaScript runtime observation failed",
    ...projectAnalysisError(error),
});
