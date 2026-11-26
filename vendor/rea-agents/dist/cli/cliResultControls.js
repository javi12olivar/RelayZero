import { AsyncLocalStorage } from "node:async_hooks";
const invocation = new AsyncLocalStorage();
/** Keep the controls in the invocation that owns the command and its output. */
export const withCliResultControls = (run) => invocation.run({}, run);
export const recordCliResultControls = (collect) => {
    const context = invocation.getStore();
    if (context !== undefined)
        context.collect = collect;
};
/** Record the complete Evidence this invocation delivers, before any wrapper. */
export const recordCliDeliveredEvidence = (evidence) => {
    const context = invocation.getStore();
    if (context !== undefined)
        context.delivered = evidence;
};
/** The complete Evidence this invocation delivered, when its delivery recorded it. */
export const cliDeliveredEvidence = () => invocation.getStore()?.delivered;
/**
 * This invocation's recorded controls, or undefined when its result records
 * none. The result is read only when this is called.
 */
export const cliResultControls = () => {
    const controls = invocation.getStore()?.collect?.();
    return controls === undefined || Object.keys(controls).length === 0
        ? undefined
        : controls;
};
