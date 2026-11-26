import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { processWorkerCleanup } from "../../process/OwnedWorkerRuntime.js";
import { OwnedCommandFailure } from "../../process/OwnedCommand.js";
import { readerFailure, retainReaderCleanup, } from "./DesktopTaskReaderCleanup.js";
import { READER_RUNNER_SLACK_S, readerAnswerView, readerCommand, readerTimeout, } from "../../domain/desktop/appTaskReaders.js";
/** Recover only a complete, valid answer emitted before later finalization failed. */
const completedReaderAnswer = (cause) => {
    if (!(cause instanceof OwnedCommandFailure) ||
        cause.collectionFailure ||
        cause.snapshot?.exitCode !== 0 ||
        cause.snapshot.outputIncomplete === true)
        return undefined;
    const stdout = cause.snapshot.stdout;
    if (stdout.invalidUtf8 || stdout.bytes !== stdout.observedBytes)
        return undefined;
    try {
        return { view: readerAnswerView(stdout.text) };
    }
    catch {
        return undefined;
    }
};
/** Each reader's view of the bytes `bytesOf` gives for its file, each written to a private folder the runner reads. */
export const readerViewsOfBytes = async (readers, bytesOf, run) => {
    const views = new Map();
    if (readers.length > 0)
        await processWorkerCleanup.retry();
    const absent = [];
    for (const reader of readers) {
        let file;
        try {
            file = await bytesOf(reader);
        }
        catch (cause) {
            throw readerFailure(cause, { views, absent });
        }
        if (file.kind === "absent") {
            absent.push(reader.id);
            continue;
        }
        if (file.kind === "error") {
            views.set(reader.id, { format: null, view: null, error: file.error });
            continue;
        }
        const folder = await mkdtemp(join(tmpdir(), "rea-reader-bytes-")).catch((cause) => {
            throw readerFailure(cause, { views, absent });
        });
        let failure;
        try {
            const path = join(folder, reader.file.split("/").at(-1) ?? "file");
            await writeFile(path, file.bytes);
            // The runner works inside this folder, so removing it cleans up after a runner that was killed.
            const result = await run(readerCommand(reader, path, folder), readerTimeout(reader) + READER_RUNNER_SLACK_S);
            if (result.exit_code !== 0 || result.timed_out)
                throw new Error(`REA's reader runner for ${reader.id} ${result.timed_out ? "timed out" : `exited ${String(result.exit_code)}`}: ${result.stderr.slice(-1024) || result.stdout.slice(-1024)}`);
            const view = readerAnswerView(result.stdout);
            if (view === undefined)
                absent.push(reader.id);
            else
                views.set(reader.id, view);
        }
        catch (cause) {
            failure = { cause };
            const completed = completedReaderAnswer(cause);
            if (completed !== undefined) {
                if (completed.view === undefined)
                    absent.push(reader.id);
                else
                    views.set(reader.id, completed.view);
            }
        }
        const facts = { views, absent };
        const retained = retainReaderCleanup(folder, failure?.cause, facts);
        if (retained !== undefined)
            throw retained;
        try {
            await rm(folder, { recursive: true, force: true });
        }
        catch (cause) {
            throw retainReaderCleanup(folder, failure?.cause, facts, { cause });
        }
        if (failure !== undefined)
            throw readerFailure(failure.cause, facts);
    }
    return views;
};
