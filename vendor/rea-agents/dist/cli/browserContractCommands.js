import { createBrowserObservationProvider } from "../composition/browserObservation.js";
import { browserCliError } from "./browserCliError.js";
import { admittedContractInput, } from "./contractCommand.js";
import { finishAnalysisCommand } from "./finishAnalysisCommand.js";
import { projectCliAnalysisResult } from "./projectCliAnalysisResult.js";
/**
 * The CLI spelling shared by browser commands that select one CDP page
 * target: `<endpoint> <targetId>`, then the contract's scope and deadline
 * options.
 */
export const browserTargetProjection = {
    positionals: ["cdp_endpoint", "target_id"],
    fields: {
        cdp_endpoint: { name: "endpoint" },
        target_id: { description: "Target ID from list-browser-targets" },
        allowed_origins: { description: "Optional exact-origin filter" },
    },
};
/**
 * Admit the contract input, then run one browser observation with a
 * disposable provider whose close the command awaits.
 */
export const observeThroughBrowser = (contract, run) => async (_input, context) => {
    const admitted = admittedContractInput(context);
    if (!admitted.ok)
        return browserCliError(admitted.error);
    const input = admitted.value;
    const { signal } = context;
    const provider = createBrowserObservationProvider();
    return finishAnalysisCommand(() => run(provider, input, { signal }), {
        close: async () => {
            await provider.close?.();
        },
    }, provider.identity().id, contract.name, signal).then(projectCliAnalysisResult);
};
