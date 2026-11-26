import { err, ok } from "../domain/result.js";
import { CdpMalformedReply, } from "./protocol/CdpCommands.js";
import { CdpCommandRejection } from "./CdpCommandRejection.js";
import { CdpConnection } from "./CdpConnection.js";
/**
 * Execute an optional CDP method. "Method not found" and a reply that fails
 * its result schema are returned as gaps for the caller's section to record;
 * transport and cancellation failures still propagate.
 */
export const optionalCdpCommand = async (context, method, parameters, limitations) => {
    try {
        return ok(await context.connection.send(method, parameters, context.sessionId, context.signal));
    }
    catch (cause) {
        if (cause instanceof CdpMalformedReply) {
            const limitation = `${method} returned a malformed result; the section that reads it is incomplete.`;
            if (!limitations.includes(limitation))
                limitations.push(limitation);
            return err({ _tag: "CdpMalformedReply", reply: cause });
        }
        if (!(cause instanceof CdpCommandRejection) || cause.code !== -32_601)
            throw cause;
        limitations.push(`${method} was unavailable from this browser target.`);
        return err({ _tag: "CdpCommandUnavailable" });
    }
};
