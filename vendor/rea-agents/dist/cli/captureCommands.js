import { createPacketCaptureService } from "../composition/captures.js";
import { CAPTURE_TOOL_CONTRACTS } from "../contracts/captures/captureToolContracts.js";
import { contractNamed } from "./contractCliDescription.js";
import { analyzeWithService, inspectWithService, registerContractCommand, } from "./contractCommand.js";
import { PRODUCER_LIMITS_HELP } from "./producerLimitsOption.js";
export const registerCaptureCommands = (cli, logger, environment, service = createPacketCaptureService(environment)) => {
    const close = () => service.close();
    registerContractCommand(cli, logger, contractNamed(CAPTURE_TOOL_CONTRACTS, "inspect_packet_fields"), {
        description: "Search installed TShark protocol and field definitions",
        jsonText: ["producer_limits"],
        nullFlags: {
            limit: {
                key: "all",
                description: "Return all remaining matches within resource limits",
            },
        },
        fields: {
            producer_limits: { description: PRODUCER_LIMITS_HELP },
            limit: {
                description: "Maximum matching records to return; defaults to 50",
            },
        },
    }, analyzeWithService(() => ({
        inspect: (input, options) => service.inspectFields(input, options),
        close,
    }), "tshark-capture"));
    registerContractCommand(cli, logger, contractNamed(CAPTURE_TOOL_CONTRACTS, "inspect_packet_capture"), {
        description: "Inspect an existing packet capture with caller-supplied TShark",
        positionals: ["path"],
        callerPaths: ["path"],
        jsonText: ["producer_limits"],
        nullFlags: {
            match_limit: {
                key: "all_matches",
                description: "Return all remaining matching frames instead of a bounded page",
            },
        },
        crossFieldRules: "argv",
        fields: {
            path: { description: "Local packet capture" },
            producer_limits: { description: PRODUCER_LIMITS_HELP },
            display_filter: { name: "display_filter" },
            decode_as: { name: "decode_as" },
            packet_limit: { name: "packet_limit" },
            two_pass: { name: "two_pass" },
            match_offset: { name: "match_offset" },
            match_limit: {
                name: "match_limit",
                description: "Returned matching frames per page; default 50",
            },
        },
    }, inspectWithService(() => ({
        inspect: (input, options) => service.inspect(input, options),
        close,
    }), "tshark-capture"));
};
