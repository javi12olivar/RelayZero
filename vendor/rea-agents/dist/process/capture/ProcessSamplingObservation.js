import { isProcessInspectionFailure, processInspectionCancellations, } from "../ProcessInspectionCleanup.js";
import { ProcessOwnershipInspectionCancelled, isProcessOwnershipInspectionCancellation, } from "../ProcessInspectionCancellation.js";
import { ProcessRunTokenReadError } from "../ProcessRunTokenObservations.js";
import { err, ok } from "../../domain/result.js";
/** Settled sampling facts are neutral; each consumer owns its error presentation and cleanup. */
export class SamplingReadBatchFailure extends AggregateError {
    #outcomes;
    #inspectionFailures;
    #otherFailures;
    get outcomes() {
        return this.#outcomes;
    }
    get inspectionFailures() {
        return this.#inspectionFailures;
    }
    get otherFailures() {
        return this.#otherFailures;
    }
    constructor(outcomes) {
        const rejected = outcomes.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
        super(rejected, "Admitted process sampling reads failed");
        this.name = "SamplingReadBatchFailure";
        this.#outcomes = outcomes;
        this.#inspectionFailures = [
            ...new Set(rejected.flatMap(samplingInspectionFailures)),
        ];
        this.#otherFailures = rejected.flatMap((failure) => failure instanceof SamplingReadBatchFailure
            ? failure.otherFailures
            : isProcessInspectionFailure(failure)
                ? []
                : [failure]);
    }
}
/** Only the direct lower fact or this owner's explicit settled vector transfers inspection facts. */
export const samplingInspectionFailures = (cause) => cause instanceof SamplingReadBatchFailure
    ? cause.inspectionFailures
    : isProcessInspectionFailure(cause)
        ? [cause]
        : [];
export async function settleSamplingReads(reads) {
    const outcomes = await Promise.allSettled(reads);
    if (outcomes.some((outcome) => outcome.status === "rejected"))
        throw new SamplingReadBatchFailure(outcomes);
    return outcomes.flatMap((outcome) => outcome.status === "fulfilled" ? [outcome.value] : []);
}
export const mergeSamplingDiagnostics = (...parts) => ({
    count: parts.reduce((count, part) => count + part.count, 0),
    first: parts.find((part) => part.first !== null)?.first ?? null,
    interrupted: parts.some((part) => part.interrupted),
});
export const samplingObservation = (value, ...diagnostics) => ({
    value,
    diagnostics: mergeSamplingDiagnostics(...diagnostics),
});
export const samplingFailure = (diagnostic) => ({
    count: 1,
    first: diagnostic,
    interrupted: false,
});
/** An interrupted attempt left an observation or declared traversal unfinished. */
export const samplingInterrupted = () => ({
    count: 0,
    first: null,
    interrupted: true,
});
/** Settle each issued read, including peers still completing after shutdown. */
export const readSamplingSource = async (source, signal, read) => {
    if (signal.aborted)
        return err({ kind: "cancelled", reason: signal.reason });
    try {
        return ok(await read());
    }
    catch (cause) {
        const cancellation = ProcessOwnershipInspectionCancelled.from(cause);
        if (signal.aborted &&
            isProcessOwnershipInspectionCancellation(cancellation) &&
            processInspectionCancellations(cancellation).every((fact) => fact.reason === signal.reason))
            return err({ kind: "cancelled", reason: signal.reason });
        const inspection = cancellation ?? cause;
        if (isProcessInspectionFailure(inspection) ||
            inspection instanceof SamplingReadBatchFailure)
            throw inspection;
        if (cause instanceof ProcessRunTokenReadError &&
            cause.availability === "absent")
            return err({ kind: "process-exited" });
        const systemCode = cause instanceof Error &&
            "code" in cause &&
            typeof cause.code === "string"
            ? cause.code
            : undefined;
        const reason = cause instanceof Error
            ? `${cause.name}: ${cause.message}`
            : String(cause);
        return err({
            kind: "unavailable",
            systemCode,
            diagnostic: `${source}: ${systemCode === undefined ? "" : `${systemCode}: `}${reason}`,
        });
    }
};
export const samplingReadObservation = (result) => result.ok
    ? samplingObservation(result.value)
    : samplingObservation(undefined, result.error.kind === "cancelled"
        ? samplingInterrupted()
        : result.error.kind === "process-exited"
            ? mergeSamplingDiagnostics()
            : samplingFailure(result.error.diagnostic));
/** Missing procfs entries are expected exit races; denied reads stay unknown. */
export const readProcSamplingSource = async (path, signal, read) => {
    const result = await readSamplingSource(path, signal, read);
    if (!result.ok &&
        result.error.kind === "unavailable" &&
        (result.error.systemCode === "ENOENT" ||
            result.error.systemCode === "ESRCH"))
        return samplingObservation(undefined);
    return samplingReadObservation(result);
};
