import { PcapProvider } from "../pcap/PcapProvider.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
/** Construct one pcap provider bound to the caller-selected tools. */
export const createPcapAnalysisProvider = (environment = process.env, platform = HOST_PLATFORM.platform) => new PcapProvider({ environment, platform });
