import { AsyncLocalStorage } from "node:async_hooks";
import { selectedWebNetworkCaptureBudgets, } from "../../domain/webNetworkCapture.js";
const accepted = new AsyncLocalStorage();
const defaults = Object.freeze(selectedWebNetworkCaptureBudgets({}));
/** A decoder operation and its asynchronous consumers share immutable admitted facts. */
export const withCaptureBudgets = (budgets, run) => accepted.run(Object.freeze({ ...budgets }), run);
/** Standalone format readers use the same defaults as the public operation. */
export const captureBudgets = () => accepted.getStore() ?? defaults;
