import { BrowserObservationError } from "../domain/browserObservationError.js";
import { admitCdpReply, assertCdpCommand, } from "./protocol/CdpCommands.js";
import { assertCdpEvent, registeredCdpEvent, } from "./protocol/CdpEvents.js";
const registeredSession = (session, operation) => {
    // Playwright emits events from its connection's message callback, so a
    // listener exception must not propagate into it.
    let failure;
    return {
        send: async (method, params) => {
            if (failure !== undefined)
                throw failure;
            assertCdpCommand(method, operation);
            return admitCdpReply(method, 
            // Playwright types each reply by an unchecked cast; the schema decides it.
            await session.send(method, params), operation);
        },
        on: (event, listener) => {
            assertCdpEvent(event, operation);
            const receive = (params) => {
                if (failure !== undefined)
                    return;
                const registered = registeredCdpEvent(event, params);
                if (registered?.method !== event)
                    return;
                try {
                    listener(registered);
                }
                catch (cause) {
                    failure = new BrowserObservationError(operation, "protocol_error", {
                        cause,
                    });
                }
            };
            session.on(event, receive);
            return () => {
                session.off(event, receive);
            };
        },
        detach: () => session.detach(),
    };
};
/** Attach a registered-command CDP session to one page. */
export const newPlaywrightCdpSession = async (context, page, operation) => registeredSession(await context.newCDPSession(page), operation);
