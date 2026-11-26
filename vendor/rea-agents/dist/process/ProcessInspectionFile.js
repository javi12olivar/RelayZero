import { open } from "node:fs/promises";
import { OwnedFileHandle } from "../filesystem/OwnedFileHandle.js";
import { withOwnedFileHandle } from "../filesystem/OwnedRegularFile.js";
import { readFileHandleChunks } from "../filesystem/readFileHandleChunks.js";
import { assertProcessOwnershipInspectionActive, ProcessOwnershipInspectionCancelled, rethrowProcessOwnershipInspectionFailure, } from "./ProcessInspectionCancellation.js";
/** procfs extents are synthetic: read to EOF through an owned descriptor. */
export const readProcessInspectionFile = async (path, signal) => {
    assertProcessOwnershipInspectionActive(signal);
    const owner = new OwnedFileHandle(await open(path, "r"));
    try {
        return await withOwnedFileHandle(path, owner, signal === undefined ? {} : { signal }, async (handle) => {
            const bytes = [];
            for await (const chunk of readFileHandleChunks(handle, {
                signal,
                cancellationFailure: (reason) => new ProcessOwnershipInspectionCancelled(reason),
            }))
                bytes.push(chunk);
            return Buffer.concat(bytes).toString("utf8");
        });
    }
    catch (cause) {
        rethrowProcessOwnershipInspectionFailure(cause);
        throw cause;
    }
};
