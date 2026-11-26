import { BrowserObservationError } from "../domain/browserObservationError.js";
/** Preserve a producer's command rejection independently from fatal transport parsing errors. */
export class CdpCommandRejection extends BrowserObservationError {
    command;
    code;
    reportedMessage;
    constructor(operation, command, code, reportedMessage) {
        super(operation, "protocol_error", {
            detail: reportedMessage === null
                ? "CDP returned a malformed command error."
                : `CDP ${command} failed (${code === null ? "unknown code" : String(code)}): ${reportedMessage}`,
        });
        this.command = command;
        this.code = code;
        this.reportedMessage = reportedMessage;
    }
}
/**
 * CDP confirmed that the command's flat session no longer exists. The target
 * is gone, so nothing REA installed through that session remains to restore.
 */
export const isCdpSessionGoneRejection = (cause) => cause instanceof CdpCommandRejection &&
    (cause.code === -32_001 ||
        (cause.reportedMessage !== null &&
            /no session with given id|session with given id not found/iu.test(cause.reportedMessage)));
