import { desktopViewPolicy, } from "../../domain/desktop/desktopViewPolicy.js";
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { SCREEN_EXAMPLE_MAX_BYTES } from "../../domain/desktop/appTaskScreen.js";
import { versionAt, } from "../../domain/desktop/desktopState.js";
import { shippedSeedBytes, shippedSeedViews, } from "./DesktopExportFiles.js";
import { withRetainedContent, } from "./DesktopRetainedContent.js";
import { readerViewsOfBytes, } from "./DesktopTaskReaders.js";
/** The screenshot a build computer took at the seed or at a checkpoint's position, a task's end, too large to ship, or undefined when there is none. */
const screenAt = async (sources, at) => {
    const name = sources.checkpoints[at === "seed" ? sources.ends.seed : at];
    if (sources.screens === undefined || name === undefined)
        return undefined;
    const path = join(sources.screens, `${name}.jpg`);
    const found = await stat(path).catch(() => undefined);
    if (found?.isFile() !== true)
        return undefined;
    return found.size > SCREEN_EXAMPLE_MAX_BYTES ? "too-large" : readFile(path);
};
/** A reader's file at the seed, as the bundle ships it, or at a checkpoint's position, a task's end or near miss, as retained. */
const readerFile = async (sources, content, file, at) => {
    const { copies, files, checkpoints, identity, signal } = sources;
    if (at === "seed") {
        const copy = copies.find(({ seed }) => seed?.home === file);
        return copy === undefined
            ? { kind: "absent" }
            : {
                kind: "bytes",
                bytes: await shippedSeedBytes(content, copy, identity, signal),
            };
    }
    const path = files.get(file);
    const version = path === undefined ? undefined : versionAt(path, at);
    if (version?.present !== true)
        return { kind: "absent" };
    if (version.sha256 === null)
        return {
            kind: "error",
            error: `~/${file} was not retained at the ${checkpoints[at] ?? "end"} checkpoint, so there is nothing to read`,
        };
    const read = await content.read(version.sha256, signal);
    return read.ok
        ? { kind: "bytes", bytes: read.value }
        : {
            kind: "error",
            error: `the retained content of ~/${file} ${read.error}`,
        };
};
/** Each reader's view of its file at the seed or at a checkpoint's position, run on this host, where the export runs: in the build computer, beside the app. */
const exportReaderViews = (sources) => (readers, at) => withRetainedContent(sources.capture, (content) => readerViewsOfBytes(readers, (reader) => readerFile(sources, content, reader.file, at), (argv, timeoutS) => sources.taskReader(argv, timeoutS, sources.signal)), sources.maxBytes);
/** What a task's checks read beyond the state view: the text seeds' views as the bundle ships them, its readers' and its screenshots. */
export const taskReads = async (request, maxBytes, found) => {
    const sources = {
        ...found,
        capture: request.capture,
        screens: request.screens,
        viewPolicy: request.viewPolicy,
        maxBytes,
    };
    return readsOf(request.tasks.length, sources);
};
const readsOf = async (tasks, sources) => ({
    seedViews: tasks === 0
        ? new Map()
        : await withRetainedContent(sources.capture, (content) => shippedSeedViews(content, sources.copies, sources.identity, sources.signal, desktopViewPolicy(sources.viewPolicy)), sources.maxBytes),
    readerViews: exportReaderViews(sources),
    screens: (at) => screenAt(sources, at),
});
