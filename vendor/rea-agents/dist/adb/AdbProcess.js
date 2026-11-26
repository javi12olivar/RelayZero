import { randomUUID } from "node:crypto";
import { AnalysisError, } from "../domain/analysisErrorBase.js";
import { analysisErrorWithCancellation } from "../domain/analysisErrorCancellation.js";
import { analysisErrorWithCleanupDependencies } from "../domain/analysisErrorCleanup.js";
import { AnalysisProtocolError, cancelledBy, carriedReason, } from "../domain/analysisErrorCore.js";
import { capturedProviderOutput } from "../process/capturedProviderOutput.js";
import { DarwinProcessOwnershipInspectionError } from "../process/DarwinProcessRunTokenReader.js";
import { launcherFailureOf, } from "../process/launchFailure.js";
import { OwnedCommandFailure, OwnedCommandStdoutBytes, prepareOwnedCommand, preparationHostCapacityFailure, runOwnedCommand, } from "../process/OwnedCommand.js";
import { bindProcessInspectionCancellations, processInspectionCancellationError, processInspectionFailure, retainArtifactCommandCleanup, } from "../providers/OwnedCommandCleanup.js";
/**
 * adb is asked to stop before its process group is killed, as it was before
 * owned supervision, so it can close its server connection.
 */
const ADB_TERMINATION = {
    signal: "SIGTERM",
    graceMs: 5_000,
};
const exitedRun = (snapshot, stdout, exitCode) => {
    let capturedOutput;
    return {
        stdout,
        stderr: snapshot.stderr.text,
        exitCode,
        get capturedOutput() {
            return (capturedOutput ??= {
                stdout: stdout.toString("utf8"),
                stderr: snapshot.stderr.text,
                stdout_bytes: stdout.byteLength,
                stderr_bytes: snapshot.stderr.observedBytes,
                exit_code: exitCode,
                signal: null,
                truncated: false,
            });
        },
    };
};
/** Output an interrupted run left: stdout from the collector, stderr from the supervisor. */
const failureOutput = (command, cause, stdout) => {
    if (command?.snapshot == null) {
        const preparation = processInspectionFailure(cause);
        return preparation instanceof DarwinProcessOwnershipInspectionError
            ? preparation.capturedOutput
            : undefined;
    }
    const observed = capturedProviderOutput(command.snapshot);
    return {
        ...observed,
        // The bytes adb wrote up to its capture limit; `truncated` marks a cut.
        stdout: stdout.toString("utf8"),
        stdout_bytes: stdout.byteLength,
        truncated: observed.truncated ||
            command.reason === "output-limit" ||
            command.snapshot.outputIncomplete === true,
    };
};
/**
 * Run one adb command in an owned process group, with its stdout kept as
 * bytes up to `maxOutputBytes`. A nonzero exit is a completed run; the caller
 * reads adb's verdict from it.
 */
export const runAdbProcess = async (host, arguments_, limits, signal) => {
    const stdout = new OwnedCommandStdoutBytes();
    let exited;
    try {
        await prepareOwnedCommand(signal);
        await runOwnedCommand({
            command: host.binary,
            arguments: arguments_,
            runId: `rea-adb-${randomUUID()}`,
            hostEnvironment: host.environment,
        }, {
            timeoutMs: limits.timeoutMs,
            diagnosticBytes: limits.maxOutputBytes,
            stdout,
            maxStdoutBytes: limits.maxOutputBytes,
            acceptNonZeroExit: true,
            termination: ADB_TERMINATION,
            observeCompleted: (snapshot) => {
                // An accepted run exited normally, so it has a numeric status.
                if (typeof snapshot.exitCode === "number")
                    exited = exitedRun(snapshot, stdout.bytes, snapshot.exitCode);
            },
        }, {
            signal,
            ...(host.launcher === undefined ? {} : { launcher: host.launcher }),
        });
        if (exited === undefined)
            throw new OwnedCommandFailure("process", "adb completed without an exit status");
        return { ok: true, run: exited };
    }
    catch (cause) {
        const command = cause instanceof OwnedCommandFailure ? cause : undefined;
        return {
            ok: false,
            failure: {
                cause,
                command,
                launch: launcherFailureOf(command?.processError ?? cause) ??
                    preparationHostCapacityFailure(cause),
                capturedOutput: exited === undefined
                    ? failureOutput(command, cause, stdout.bytes)
                    : exited.capturedOutput,
                exited,
            },
        };
    }
};
/**
 * Report a failed adb run: a completed nonzero exit verdict stays primary
 * before attaching late cancellation or cleanup failures; otherwise caller
 * cancellation and interrupted process inspection come first, then `classify`
 * for the run's own failure. Process and inspection owners whose cleanup
 * failed move to the host's scope.
 */
export const adbRunFailureError = (operation, host, failure, classify) => {
    const { cause, command } = failure;
    const completed = failure.exited === undefined ? undefined : classify(failure);
    const cleanups = retainArtifactCommandCleanup(cause, host.resources, operation, failure.exited === undefined || completed !== undefined
        ? undefined
        : { capturedOutput: failure.exited.capturedOutput });
    const inspectionCancellation = command === undefined || command.preparationFailure !== undefined
        ? processInspectionCancellationError(cause, operation)
        : undefined;
    const commandCancellation = command?.reason === "cancelled" && command.cancellation !== undefined
        ? (inspectionCancellation ??
            cancelledBy(operation, carriedReason(command.cancellation.reason), failure.capturedOutput === undefined
                ? {}
                : { capturedOutput: failure.capturedOutput }))
        : inspectionCancellation;
    let primary;
    if (completed !== undefined)
        primary =
            commandCancellation === undefined
                ? completed
                : analysisErrorWithCancellation(completed, commandCancellation);
    else if (commandCancellation !== undefined)
        primary = commandCancellation;
    // Ownership preparation reports its own analysis failure, such as cleanup
    // of an earlier preparation it must finish before admitting another launch.
    else if (command === undefined && cause instanceof AnalysisError)
        primary = cause;
    else if (cleanups[0] !== undefined)
        primary = cleanups[0];
    else
        primary =
            classify(failure) ??
                new AnalysisProtocolError(`adb failed for ${operation}`, { cause });
    for (const cleanup of cleanups)
        if (cleanup !== primary)
            primary = analysisErrorWithCleanupDependencies(primary, cleanup, operation);
    return bindProcessInspectionCancellations(cause, primary, operation);
};
