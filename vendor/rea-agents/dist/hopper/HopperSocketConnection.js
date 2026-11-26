import { connectLocalSocketOnce } from "../process/LocalSocketConnection.js";
import { hopperCancelledBySignal, HopperStartError, } from "./HopperErrors.js";
import { err } from "../domain/result.js";
/** Open one abort-aware Hopper Unix-socket connection attempt. */
export const connectHopperSocketOnce = async (socketPath, signal) => {
    const connected = await connectLocalSocketOnce({ path: socketPath }, signal);
    if (connected.ok)
        return connected;
    return err(connected.error.kind === "cancelled"
        ? hopperCancelledBySignal(signal)
        : new HopperStartError({ cause: connected.error.cause }));
};
