import { SignalRecordingService } from "../application/signals/SignalRecordingService.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { SigrokRecordingProvider } from "../signals/SigrokRecordingProvider.js";
export const createSignalRecordingService = (environment = process.env, platform = HOST_PLATFORM.platform) => new SignalRecordingService(new SigrokRecordingProvider(environment, undefined, undefined, platform));
