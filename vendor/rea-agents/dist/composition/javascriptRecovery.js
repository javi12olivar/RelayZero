import { WakaruProvider } from "../javascript/recovery/WakaruProvider.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
/** Construct optional recovery without acquiring tools, processes or workspaces. */
export const createJavaScriptRecoveryProvider = (environment = process.env, launcher, host = HOST_PLATFORM) => new WakaruProvider(environment, launcher, host);
