/** Closing all sessions could not confirm that these debuggers stopped. */
export class OwnedDebuggerCleanupError extends AggregateError {
    /** Process IDs when cleanup gave up. Observations, not lasting proof of identity. */
    retainedProcessIds;
    constructor(failures, message, retainedProcessIds) {
        super(failures, message);
        this.retainedProcessIds = retainedProcessIds;
    }
}
/** One owned debugger whose stop could not be confirmed, naming why. */
export class OwnedDebuggerStopFailure extends Error {
    code;
    constructor(stop) {
        super(stop.reason);
        this.name = "OwnedDebuggerStopFailure";
        this.code = stop.code;
    }
}
/** Visit every error in a composed cleanup failure once. */
const visitCleanupFailure = (cause, onError) => {
    const visited = new WeakSet();
    const visit = (node) => {
        if (typeof node !== "object" || node === null || visited.has(node))
            return;
        visited.add(node);
        if (node instanceof Error)
            onError(node);
        if (node instanceof AggregateError)
            for (const error of node.errors)
                visit(error);
        if (node instanceof Error)
            visit(node.cause);
    };
    visit(cause);
};
/** Retained debugger process IDs anywhere in a composed cleanup failure. */
export const retainedDebuggerProcessIds = (cause) => {
    const found = new Set();
    visitCleanupFailure(cause, (error) => {
        if (error instanceof OwnedDebuggerCleanupError)
            for (const pid of error.retainedProcessIds)
                found.add(pid);
    });
    return [...found];
};
/** Why each unconfirmed debugger stop in a composed cleanup failure is incomplete. */
export const debuggerCleanupCodes = (cause) => {
    const found = new Set();
    visitCleanupFailure(cause, (error) => {
        if (error instanceof OwnedDebuggerStopFailure)
            found.add(error.code);
    });
    return [...found];
};
/** Log or diagnostic fields naming those processes; empty when none are known. */
export const retainedDebuggerDiagnostics = (cause) => {
    const pids = retainedDebuggerProcessIds(cause);
    const codes = debuggerCleanupCodes(cause);
    return {
        ...(pids.length === 0 ? {} : { retained_debugger_pids: [...pids] }),
        ...(codes.length === 0 ? {} : { debugger_cleanup_codes: [...codes] }),
    };
};
/** What a caller must do once REA ends with these debuggers unconfirmed. */
export const retainedDebuggerRemediation = (pids) => `REA exits without confirming that the debugger stopped, and no later REA command can retry this cleanup. Check process ${pids.join(", ")} and its target, and stop them if they are still running.`;
