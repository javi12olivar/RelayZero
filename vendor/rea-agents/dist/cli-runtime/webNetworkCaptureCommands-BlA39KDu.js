import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { contractNamed, deliverCliAnalysisEvidence, init_analysisEvidenceDelivery, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { createWebNetworkCaptureService, init_webNetworkCaptures } from "./webNetworkCaptures-BBa8pLB1.js";
import { WEB_NETWORK_CAPTURE_TOOL_CONTRACTS, init_webNetworkCaptureToolContracts } from "./webNetworkCaptureToolContracts-B9gT7NsJ.js";

//#region dist/cli/webNetworkCaptureCommands.js
var webNetworkCaptureCommands_exports = /* @__PURE__ */ __exportAll({ registerWebNetworkCaptureCommands: () => registerWebNetworkCaptureCommands });
var DESCRIPTOR_PATH, registerWebNetworkCaptureCommands;
function init_webNetworkCaptureCommands() {
	return (init_webNetworkCaptureCommands = __esmMin((() => {
		init_webNetworkCaptures();
		init_webNetworkCaptureToolContracts();
		init_analysisEvidenceDelivery();
		init_contractCliDescription();
		init_contractCommand();
		DESCRIPTOR_PATH = "protobuf.schema.descriptor_set_path";
		registerWebNetworkCaptureCommands = (cli, logger, environment) => registerContractCommand(cli, logger, contractNamed(WEB_NETWORK_CAPTURE_TOOL_CONTRACTS, "inspect_web_network_capture"), {
			description: "Inspect retained HAR, native mitmproxy, Fiddler SAZ or aioquic qlog records without fetching recorded URLs",
			positionals: ["capture_path", "format"],
			callerPaths: ["capture_path"],
			evidenceDelivery: true,
			flatten: { protobuf: {
				framing: {
					name: "protobufFraming",
					description: "Override framing for selected retained binary bodies"
				},
				body_pointers: {
					name: "protobufBodyPointer",
					description: "Exact body pointers; repeat to select several"
				},
				schema: { flatten: {
					descriptor_set_path: {
						name: "protobufSchema",
						description: "Local compiled FileDescriptorSet path",
						callerPath: true
					},
					message_type: {
						name: "protobufMessage",
						description: "Fully qualified message type in the descriptor set"
					}
				} }
			} },
			fields: {
				capture_path: { description: "Local capture path" },
				format: { description: "Producer capture format" },
				record_ordinals: {
					name: "record",
					description: "Zero-based producer ordinals; repeat to select several"
				},
				sensitive_values: {
					name: "sensitiveValue",
					description: "Literal string values explicitly marked sensitive; repeat as needed"
				}
			}
		}, async (input, { signal, delivery, callerInputs }) => {
			const service = createWebNetworkCaptureService(environment);
			const descriptor = callerInputs[DESCRIPTOR_PATH];
			return deliverCliAnalysisEvidence({
				run: () => service.inspect(input, { signal }),
				callerInputPath: callerInputs.capture_path,
				...descriptor === undefined ? {} : { callerInputPaths: { descriptor_set_path: descriptor } },
				service,
				providerId: "web-network-capture",
				operation: "inspect_web_network_capture",
				signal,
				detail: delivery.detail,
				evidenceOutput: delivery.evidenceOutput,
				sensitiveValues: input.sensitive_values ?? []
			});
		});
	})))();
}

//#endregion
export { init_webNetworkCaptureCommands, webNetworkCaptureCommands_exports };