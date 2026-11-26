import { launcherFailureOf } from "./launchFailure.js";
import { OwnedCommandFailure } from "./OwnedCommand.js";
const outputOf = (snapshot) => snapshot === null
    ? undefined
    : {
        snapshot,
        truncated: snapshot.diagnosticTruncated === true ||
            snapshot.outputIncomplete === true,
    };
const ownedCommandOutcome = (failure) => {
    const facts = {
        cause: failure,
        message: failure.message,
        output: outputOf(failure.snapshot),
    };
    if (failure.reason === "cancelled")
        return {
            ...facts,
            kind: "cancelled",
            reason: failure.cancellation === undefined
                ? failure
                : failure.cancellation.reason,
        };
    // An allocation refused by the enforced limit can surface as a hang, an
    // overflow or an exit; the limit is the fact that explains each of them.
    if (failure.snapshot?.memoryLimitReached === true)
        return { ...facts, kind: "memory-limit" };
    const snapshot = failure.snapshot;
    // The runtime's own report explains an exit or the stack trace that
    // overflowed the output budget; it does not explain the owner's deadline.
    if (snapshot?.runtimeExhaustion !== undefined &&
        !failure.collectionFailure &&
        (failure.reason === "process" || failure.reason === "output-limit"))
        return {
            ...facts,
            kind: "runtime-exhausted",
            exhaustion: snapshot.runtimeExhaustion,
            exitCode: snapshot.exitCode ?? null,
            signal: snapshot.signal ?? null,
        };
    if (failure.reason !== "process")
        return { ...facts, kind: failure.reason };
    if (failure.collectionFailure || snapshot === null)
        return { ...facts, kind: "protocol" };
    if (snapshot.signal === "SIGXCPU" || snapshot.signal === "SIGXFSZ")
        return { ...facts, kind: "resource-signal", signal: snapshot.signal };
    return {
        ...facts,
        kind: "exited",
        exitCode: snapshot.exitCode ?? null,
        signal: snapshot.signal ?? null,
        stopRequested: snapshot.stopRequested === true,
    };
};
export function providerOutcomeOf(cause) {
    if (cause instanceof OwnedCommandFailure)
        return ownedCommandOutcome(cause);
    // Only a launcher's errno is a launch failure; one from reading a file is not.
    const failure = launcherFailureOf(cause);
    if (failure === undefined || !(cause instanceof Error))
        return undefined;
    return {
        kind: "launch-failed",
        failure,
        cause,
        message: cause.message,
        output: undefined,
    };
}
