import { createWebRuntimeService } from "../composition/webRuntime.js";
import { WEB_RUNTIME_TOOL_CONTRACTS } from "../contracts/webRuntimeToolContracts.js";
import { browserTargetProjection } from "./browserContractCommands.js";
import { cliProgressReporter } from "./cliProgress.js";
import { contractNamed } from "./contractCliDescription.js";
import { registerContractCommand, } from "./contractCommand.js";
import { finishAnalysisCommand } from "./finishAnalysisCommand.js";
import { projectCliAnalysisResult } from "./projectCliAnalysisResult.js";
const targetFields = {
    ...browserTargetProjection.fields,
    cdp_endpoint: {
        name: "endpoint",
        description: "Existing loopback browser CDP endpoint",
    },
    target_id: {
        description: "Selected page target ID from list-browser-targets",
    },
};
/** Register public equivalents of the two modular website runtime tools. */
export const registerWebRuntimeCommands = (cli, logger) => {
    registerContractCommand(cli, logger, contractNamed(WEB_RUNTIME_TOOL_CONTRACTS, "observe_web_execution"), {
        description: "Observe precise page execution; resets counters and temporarily disables optimization",
        positionals: browserTargetProjection.positionals,
        fields: {
            ...targetFields,
            observation_ms: { description: "Observation duration in milliseconds" },
        },
    }, throughWebRuntime((service, input, options) => service.observe(input, { ...options, progress: cliProgressReporter })));
    registerContractCommand(cli, logger, contractNamed(WEB_RUNTIME_TOOL_CONTRACTS, "inspect_web_event_listeners"), {
        description: "Inspect native listener source locations on the first main-document CSS match",
        positionals: [...browserTargetProjection.positionals, "selector"],
        fields: {
            ...targetFields,
            selector: {
                description: "Native CSS selector; inspect the first main-document match",
            },
        },
    }, throughWebRuntime((service, input, options) => service.inspect(input, options)));
};
/**
 * Run one web runtime operation with a disposable service, whose contract
 * parse admits the input, and await its provider's close.
 */
const throughWebRuntime = (run) => async (input, { operation, signal }) => {
    const service = createWebRuntimeService();
    return finishAnalysisCommand(() => run(service, input, { signal }), {
        close: async () => {
            await service.provider.close?.();
        },
    }, service.provider.identity().id, operation, signal).then(projectCliAnalysisResult);
};
