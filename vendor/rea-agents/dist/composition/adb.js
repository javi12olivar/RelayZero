import { AdbProvider } from "../adb/AdbProvider.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
/** Construct one ADB provider bound to the caller-selected binary. */
export const createAdbDeviceAnalysisProvider = (environment = process.env, platform = HOST_PLATFORM.platform) => new AdbProvider({ environment, platform });
