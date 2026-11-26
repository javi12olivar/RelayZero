import { evmInterfaceModule } from "../composition/evm.js";
import { inspectWithService, registerContractCommand, } from "./contractCommand.js";
import { PRODUCER_LIMITS_HELP } from "./producerLimitsOption.js";
/** Resolve operator paths and preserve explicit encoding through the shared workflow. */
export const registerEvmCommands = (cli, logger, environment) => {
    const service = evmInterfaceModule.create(environment);
    registerContractCommand(cli, logger, evmInterfaceModule.contract, {
        command: evmInterfaceModule.cliCommand,
        description: "Infer interface candidates from explicit local EVM bytecode",
        positionals: ["path", "encoding"],
        callerPaths: ["path"],
        jsonText: ["producer_limits"],
        fields: {
            path: { description: "Local bytecode carrier" },
            encoding: { description: "Selected carrier representation" },
            producer_limits: { description: PRODUCER_LIMITS_HELP },
        },
        omit: {
            detail: "One-shot output is complete Evidence; this command has no summary delivery",
        },
    }, inspectWithService(() => service, "evmole-interface"));
};
