import { AsyncLocalStorage } from "node:async_hooks";
const snapshots = new AsyncLocalStorage();
/**
 * Bind the snapshot accepted for one operation. Providers and filesystem
 * helpers read it at the point they enforce a limit. A later update does not
 * change work already inside this call.
 */
export const runWithAnalysisOperationSnapshot = (snapshot, operation) => snapshots.run(snapshot, operation);
/** The snapshot for the operation on this async stack, when one was accepted. */
export const currentAnalysisOperationSnapshot = () => snapshots.getStore();
/** Accepted override for one setting, when this operation has a snapshot. */
export const currentAnalysisSettingOverride = (setting) => currentAnalysisOperationSnapshot()?.overrides[setting];
