import { ApktoolProvider } from "../apktool/ApktoolProvider.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
/** Construct one Apktool provider bound to the caller-selected launcher. */
export const createApktoolResourceAnalysisProvider = (environment = process.env, platform = HOST_PLATFORM.platform) => new ApktoolProvider({ environment, platform });
