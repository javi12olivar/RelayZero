import { projectCliAnalysisResult } from "./projectCliAnalysisResult.js";
import { NATIVE_TOOL_CONTRACTS } from "../contracts/native/nativeToolContracts.js";
import { projectAnalysisError } from "../domain/analysisErrorProjection.js";
import { contractNamed } from "./contractCliDescription.js";
import { admittedContractInput, registerContractDocumentCommand, } from "./contractCommand.js";
/** `observe-native-calls <path> <input-json>`: the MCP input object as JSON. */
export const registerNativeCallCommands = (cli, logger, runProviderAnalysis) => {
    const contract = contractNamed(NATIVE_TOOL_CONTRACTS, "observe_native_calls");
    registerContractDocumentCommand(cli, logger, contract, {
        description: "Launch a Mach-O under LLDB and record entries into selected functions or Objective-C methods",
        sessionTarget: { description: "Mach-O or app path" },
        document: "Inline JSON or a JSON file path: breakpoints, arguments, environment, duration_ms, max_events, argument_registers, backtrace_frames, capture_limits",
    }, async (_document, context) => {
        const admitted = admittedContractInput(context);
        if (!admitted.ok)
            return {
                error: "Analysis failed",
                ...projectAnalysisError(admitted.error),
            };
        return runProviderAnalysis(context.sessionTarget, contract.name, admitted.value, logger, context.signal).then((result) => projectCliAnalysisResult(result));
    });
};
