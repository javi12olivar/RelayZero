import { DarwinProcessOwnershipInspectionError } from "./DarwinProcessRunTokenReader.js";
import { assertProcessOwnershipInspectionActive, rethrowProcessOwnershipInspectionFailure, } from "./ProcessInspectionCancellation.js";
import { liveProcesses } from "./ProcessOwnershipProcessTree.js";
import { errorMessage } from "../kernel/errorMessage.js";
/** Structured native token availability, distinct from failed reads and caller cancellation. */
export class ProcessRunTokenReadError extends Error {
    pid;
    availability;
    reason;
    _tag = "ProcessRunTokenReadError";
    constructor(pid, availability, reason) {
        super(`Run token for PID ${String(pid)}: ${reason}`);
        this.pid = pid;
        this.availability = availability;
        this.reason = reason;
        this.name = "ProcessRunTokenReadError";
    }
}
/** Only a variable observed on this process supplies its run token. */
export const processRunIdFromEnvironment = (environment) => Object.hasOwn(environment, "REA_PROCESS_RUN_ID")
    ? environment.REA_PROCESS_RUN_ID
    : undefined;
/** Read a selected PID's environment token without requiring process-table relations. */
export const readProcessRunToken = async (host, pid, signal) => {
    assertProcessOwnershipInspectionActive(signal);
    try {
        const environment = signal === undefined
            ? await host.environment(pid)
            : await host.environment(pid, signal);
        assertProcessOwnershipInspectionActive(signal);
        return {
            state: "readable",
            runId: processRunIdFromEnvironment(environment),
        };
    }
    catch (cause) {
        if (cause instanceof DarwinProcessOwnershipInspectionError &&
            (cause.cleanupOwner !== undefined || cause.cleanupFailure !== undefined))
            throw cause;
        rethrowProcessOwnershipInspectionFailure(cause);
        const code = cause instanceof Error &&
            "code" in cause &&
            typeof cause.code === "string"
            ? cause.code
            : undefined;
        return {
            state: "unavailable",
            ...(code === undefined ? {} : { code }),
            reason: errorMessage(cause),
        };
    }
};
/** Read only ownership tokens, using per-process fallback for missing batch rows. */
export async function* readProcessRunTokens(host, processes, signal) {
    assertProcessOwnershipInspectionActive(signal);
    if (processes.length === 0)
        return;
    let batch;
    let batchFailure;
    if (host.runTokens !== undefined) {
        try {
            batch =
                signal === undefined
                    ? await host.runTokens(processes)
                    : await host.runTokens(processes, signal);
        }
        catch (cause) {
            if (cause instanceof DarwinProcessOwnershipInspectionError &&
                (cause.cleanupOwner !== undefined || cause.cleanupFailure !== undefined))
                throw cause;
            rethrowProcessOwnershipInspectionFailure(cause);
            batchFailure = errorMessage(cause);
        }
    }
    for (const process of processes) {
        assertProcessOwnershipInspectionActive(signal);
        let observation = batch?.get(process.pid);
        if (observation === undefined) {
            observation = await readProcessRunToken(host, process.pid, signal);
            if (observation.state === "unavailable" && batchFailure !== undefined)
                observation = {
                    ...observation,
                    reason: `${observation.reason}; run-token batch failed: ${batchFailure}`,
                };
        }
        assertProcessOwnershipInspectionActive(signal);
        yield { process, observation };
    }
}
/**
 * Live processes in the current process table that expose this run token.
 * A process whose token cannot be read is left out, so the list proves
 * presence only; it does not prove that no other carrier exists.
 */
export const readRunTokenCarriers = async (host, runId, signal) => {
    const carriers = [];
    const processes = liveProcesses(signal === undefined
        ? await host.listProcesses()
        : await host.listProcesses(signal));
    for await (const { process, observation } of readProcessRunTokens(host, processes, signal))
        if (observation.state === "readable" && observation.runId === runId)
            carriers.push(process);
    return carriers;
};
