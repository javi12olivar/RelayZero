import { isStrictUtf8 } from "../domain/strictUtf8.js";
import { ArtifactReaderFailure } from "../resources/index.js";
import { execFileBytes, execFileOutputFailure, ExecFileOutputCancelledError, } from "../process/ExecFileOutput.js";
const COMMAND_TIMEOUT_MS = 30_000;
const COMMAND_MAX_BUFFER = 4 * 1024 * 1024;
/** Run a query command with a bounded time and output. */
export const runHostQuery = async (command, arguments_, signal, options) => {
    try {
        const { stdout } = await execFileBytes(command, arguments_, {
            timeout: COMMAND_TIMEOUT_MS,
            maxBuffer: COMMAND_MAX_BUFFER,
            ...(options?.locale === undefined
                ? {}
                : { env: { ...process.env, LC_ALL: options.locale } }),
            ...(options?.preserveStdoutBytes ? { preserveFailedStdout: true } : {}),
            ...(signal === undefined ? {} : { signal }),
        });
        return {
            stdout: stdout.toString("utf8"),
            ...(options?.preserveStdoutBytes === true
                ? { stdoutBuffer: stdout }
                : {}),
            exitCode: 0,
        };
    }
    catch (cause) {
        if (cause instanceof ExecFileOutputCancelledError)
            throw new ArtifactReaderFailure("cancelled", "Host query cancelled", {
                cause: cause.cause,
                cancellation: { reason: cause.cause },
            });
        const failure = execFileOutputFailure(cause);
        if (failure?.code === "ENOENT")
            return "missing";
        return typeof failure?.code === "number" &&
            !failure.killed &&
            !failure.outputTruncated
            ? {
                stdout: failure.stdout,
                ...(failure.stdoutBuffer === undefined
                    ? {}
                    : { stdoutBuffer: failure.stdoutBuffer }),
                exitCode: failure.code,
            }
            : "failed";
    }
};
/** The output of a query that exited 0. */
export const succeeded = (outcome) => typeof outcome === "object" && outcome.exitCode === 0
    ? outcome.stdout
    : undefined;
/** Read text that supplies identifiers, withholding a query with undecodable output. */
export const queryUtf8Text = async (runQuery, command, args, signal) => {
    const outcome = await runQuery(command, args, signal, {
        preserveStdoutBytes: true,
    });
    if (outcome === "missing")
        return { kind: "missing" };
    if (typeof outcome !== "object" || outcome.exitCode !== 0)
        return { kind: "unavailable" };
    if (outcome.stdoutBuffer !== undefined && !isStrictUtf8(outcome.stdoutBuffer))
        return { kind: "undecodable" };
    return {
        kind: "read",
        text: outcome.stdoutBuffer?.toString("utf8") ?? outcome.stdout,
    };
};
