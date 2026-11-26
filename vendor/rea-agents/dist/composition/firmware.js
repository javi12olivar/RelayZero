import { FirmwareProvider } from "../firmware/FirmwareProvider.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
/** Construct one firmware provider without launching or acquiring an engine. */
export const createFirmwareAnalysisProvider = (environment = process.env, launcher, host = HOST_PLATFORM) => new FirmwareProvider(environment, launcher, host);
