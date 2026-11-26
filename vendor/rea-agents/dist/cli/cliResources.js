/**
 * Process-owned CLI resources. Each owning module registers its closer when it
 * loads, so a CLI closes only the command families it loaded.
 */
const closers = new Map();
/** Register an owner's closer. A repeated name keeps its first closer. */
export const ownCliProcessResource = (name, close) => {
    if (!closers.has(name))
        closers.set(name, close);
};
/** Settle every process-owned resource, then report each failure. */
export const closeCliResources = async () => {
    const results = await Promise.allSettled([...closers.values()].map((close) => close()));
    const failures = results.flatMap((result) => result.status === "rejected" ? [result.reason] : []);
    if (failures.length === 1)
        throw failures[0];
    if (failures.length > 1)
        throw new AggregateError(failures, "CLI resource cleanup failed");
};
