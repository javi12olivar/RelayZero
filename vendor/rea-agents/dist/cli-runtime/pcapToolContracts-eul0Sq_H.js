import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisViewResult, init_pcapAnalysis, pcapCaptureSummaryViewResultSchema, pcapInputSchemas, pcapResultSchemas } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, analysisDetailSchema, evidenceResultOf, init_analysisDetail, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";

//#region dist/contracts/pcap/pcapToolContracts.js
var PCAP_TOOL_CONTRACTS;
function init_pcapToolContracts() {
	return (init_pcapToolContracts = __esmMin((() => {
		init_pcapAnalysis();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		init_analysisDetail();
		init_analysisViewResult();
		PCAP_TOOL_CONTRACTS = [{
			name: "inspect_pcap_client",
			cli: true,
			...toolContractMetadata("inspect_pcap_client", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			})),
			description: "Inspect the caller-selected tshark and capinfos binaries: selected commands, selection sources, and versions. Both tools must be usable. Reads no capture file. REA never installs the Wireshark suite; select binaries with REA_TSHARK_COMMAND and REA_CAPINFOS_COMMAND (absolute) or from PATH.",
			kind: "pcap-provider",
			inputSchema: pcapInputSchemas.inspect_pcap_client,
			outputSchema: evidenceResultOf(pcapResultSchemas.inspect_pcap_client),
			examples: [{
				title: "Check the analysis tools",
				input: {}
			}]
		}, {
			name: "inspect_pcap_capture",
			availability: { host: "pcapCapture" },
			cli: true,
			...toolContractMetadata("inspect_pcap_capture", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			})),
			description: "Summarize a saved pcap/pcapng snapshot: exact packet count, SHA-256, IP endpoints, DNS questions/addresses, TLS SNI, protocols and HTTP URIs. Use inspect_packet_capture for caller-selected TShark fields or display filters. Default complete returns full Evidence; detail summary retains it for inspect_analysis_view kind pcap. Unknown DNS attribution and excluded credentials stay explicit. Requires caller-supplied capinfos/tshark and Linux prlimit or Windows Job Objects; never captures live traffic.",
			kind: "pcap-provider",
			inputSchema: pcapInputSchemas.inspect_pcap_capture.extend({ detail: analysisDetailSchema }),
			outputSchema: analysisDetailOutputSchemaOf(pcapResultSchemas.inspect_pcap_capture, pcapCaptureSummaryViewResultSchema),
			examples: [{
				title: "Inspect a capture file",
				input: { path: "/captures/session.pcap" }
			}]
		}];
	})))();
}

//#endregion
export { PCAP_TOOL_CONTRACTS, init_pcapToolContracts };