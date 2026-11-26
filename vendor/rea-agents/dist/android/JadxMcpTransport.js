import { OwnedMcpStdioTransport, } from "../process/OwnedMcpStdioTransport.js";
/** The JADX provider's bounded stdio protocol transport. */
export class JadxMcpTransport extends OwnedMcpStdioTransport {
    constructor(options, launcher) {
        super(options, {
            provider: "jadx",
            label: "JADX",
            maxFrameBytes: 8 * 1024 * 1024,
            maxOperationBytes: 32 * 1024 * 1024,
            notifyOnExit: true,
        }, launcher);
    }
}
