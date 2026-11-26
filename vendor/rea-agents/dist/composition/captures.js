import { PacketCaptureService } from "../application/captures/PacketCaptureService.js";
import { TsharkCaptureProvider } from "../captures/TsharkCaptureProvider.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
export const createPacketCaptureService = (environment = process.env, platform = HOST_PLATFORM.platform) => new PacketCaptureService(new TsharkCaptureProvider(environment, undefined, undefined, platform));
