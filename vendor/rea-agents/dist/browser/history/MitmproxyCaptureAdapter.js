import { access, stat } from "node:fs/promises";
import { HOST_PLATFORM } from "../../platform/HostPlatform.js";
import { constants } from "node:fs";
import { isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { AnalysisCapabilityUnavailableError } from "../../domain/analysisErrorCore.js";
import { MITMPROXY_CAPTURE_PROVIDER_IDENTITY } from "./CaptureProviderIdentities.js";
import { snapshotEnvironment } from "../../process/snapshotEnvironment.js";
const OPERATION = "inspect_web_network_capture";
const MITMDUMP_REQUIREMENT = "Native capture decoding requires Linux and an absolute REA_MITMDUMP_COMMAND path to caller-supplied mitmdump 12.2.3; HAR needs no external engine.";
/** Native mitmproxy decoding is offline and uses only an explicitly configured Linux tool. */
export class MitmproxyCaptureAdapter {
    environment;
    platform;
    format = "mitmproxy";
    identity = MITMPROXY_CAPTURE_PROVIDER_IDENTITY;
    constructor(environment, 
    // The host mitmdump runs on; defaults to the running host.
    platform = HOST_PLATFORM.platform) {
        this.environment = environment;
        this.platform = platform;
    }
    snapshotConfiguration() {
        return new MitmproxyCaptureAdapter(snapshotEnvironment(this.environment, this.platform), this.platform);
    }
    async command(requestPath, runtimePath) {
        const command = this.environment.REA_MITMDUMP_COMMAND;
        if (this.platform !== "linux" ||
            command === undefined ||
            !isAbsolute(command))
            throw new AnalysisCapabilityUnavailableError("mitmproxy", OPERATION, MITMDUMP_REQUIREMENT, { userMessage: MITMDUMP_REQUIREMENT });
        try {
            await access(command, constants.R_OK | constants.X_OK);
            if (!(await stat(command)).isFile())
                throw new TypeError("Configured path is not a regular file");
        }
        catch (cause) {
            const reason = `Configured mitmdump executable is unavailable: ${command}.`;
            throw new AnalysisCapabilityUnavailableError("mitmproxy", OPERATION, reason, { cause, userMessage: reason });
        }
        return {
            command,
            arguments: [
                "--no-server",
                "-q",
                "--set",
                `confdir=${runtimePath}`,
                "--set",
                `rea_request_path=${requestPath}`,
                "-s",
                fileURLToPath(new URL("../../../bridge/mitmproxy/capture.py", import.meta.url)),
            ],
        };
    }
}
