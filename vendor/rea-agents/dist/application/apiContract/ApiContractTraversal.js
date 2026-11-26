import { setImmediate } from "node:timers/promises";
import { cancelledBy, carriedReason } from "../../domain/analysisErrorCore.js";
import { err } from "../../domain/result.js";
import { API_CONTRACT_OPERATION as operation } from "../../domain/apiContract/apiContract.js";
/** Let a producer retain already interpreted facts before releasing its provisional state. */
const cancelSteps = (steps, reason) => {
    const cancellation = cancelledBy(operation, carriedReason(reason));
    try {
        const stopped = steps.throw(cancellation);
        if (stopped.done && !stopped.value.ok)
            return stopped.value;
    }
    catch (cause) {
        if (cause !== cancellation)
            throw cause;
    }
    return err(cancellation);
};
/** Cooperative traversals release their provisional state on cancellation. */
export const completeApiContractSteps = async (steps, signal) => {
    let completed = false;
    try {
        for (;;) {
            if (signal?.aborted)
                return cancelSteps(steps, signal.reason);
            const next = steps.next();
            if (next.done) {
                completed = true;
                if (!next.value.ok)
                    return next.value;
                // The Evidence owner classifies queued late cancellation with completed facts.
                await setImmediate();
                return next.value;
            }
            await setImmediate();
        }
    }
    finally {
        if (!completed)
            steps.return(undefined);
    }
};
