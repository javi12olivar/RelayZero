import { setImmediate } from "node:timers/promises";
import { z } from "zod";
import { prepareSnapshotEntry, parsePreparedAnalysisSnapshot, serializeAnalysisSnapshot, } from "../../domain/analysisSnapshot.js";
import { EvidenceFileError, EvidenceIntegrityError, } from "../../domain/evidenceErrors.js";
import { err, ok } from "../../domain/result.js";
import { describeValidationFailure } from "../../domain/validationFailure.js";
import { validationIssueOptions } from "../../domain/evidenceValidation.js";
import { isUnsupportedEvidenceFormat } from "../../domain/evidenceFormat.js";
import { AnalysisCancelledError, cancelledBy, } from "../../domain/analysisErrorCore.js";
import { readJsonObjectMembersFile } from "../JsonFiles.js";
import { writeTextFile, } from "../../resources/index.js";
const READ_OPERATION = "open_binary";
/** Read and validate an analysis snapshot from the caller's path. */
export const readAnalysisSnapshot = async (path, signal, resources) => {
    const entries = snapshotEntryReader("provider");
    const workflows = snapshotEntryReader("workflow");
    const header = {};
    const metadata = new Map(["target", "binding", "evidence_bundle"].map((name) => [
        name,
        {
            mode: "value",
            begin: () => {
                delete header[name];
            },
            accept: (value) => {
                header[name] = value;
            },
            reject: (cause) => {
                throw cause;
            },
        },
    ]));
    try {
        const loaded = await readJsonObjectMembersFile(path, [
            new Map([
                ["entries", entries.reader],
                ["workflow_entries", workflows.reader],
            ]),
            metadata,
        ], signal, resources, READ_OPERATION);
        if (!loaded.ok)
            return loaded;
        signal?.throwIfAborted();
        const snapshot = parsePreparedAnalysisSnapshot(header, entries.finish(), workflows.finish());
        // Deliver queued cancellation before handing a complete cache to the session.
        await setImmediate();
        signal?.throwIfAborted();
        return ok(snapshot);
    }
    catch (cause) {
        if (signal?.aborted === true)
            return err(cancelledBy(READ_OPERATION, signal));
        return err(new EvidenceIntegrityError(snapshotValidationMessage(cause), {
            cause,
            ...validationIssueOptions(cause, []),
        }));
    }
};
/** Locate an entry's schema issues within its snapshot collection. */
const locateEntryFailure = (cause, collection, index) => cause instanceof z.ZodError
    ? new z.ZodError(cause.issues.map((issue) => ({
        ...issue,
        path: [collection, index, ...issue.path],
    })))
    : cause;
const snapshotEntryReader = (kind) => {
    const collection = kind === "provider" ? "entries" : "workflow_entries";
    let seen = false;
    let entries = [];
    let failure;
    const reader = {
        mode: "array",
        begin: () => {
            seen = true;
            entries = [];
            failure = undefined;
        },
        accept: (value) => {
            if (failure !== undefined)
                return;
            try {
                entries.push(prepareSnapshotEntry(value, kind));
            }
            catch (cause) {
                throw locateEntryFailure(cause, collection, entries.length);
            }
        },
        reject: (cause) => {
            failure ??= { cause };
        },
    };
    return {
        reader,
        finish: () => {
            if (!seen)
                throw new TypeError(`Analysis snapshot ${collection} is missing`);
            if (failure !== undefined)
                throw failure.cause;
            return entries;
        },
    };
};
/** Atomically write a deterministic analysis snapshot to the caller's path. */
export const writeAnalysisSnapshot = async (snapshot, path, overwrite, resources) => {
    let encoded;
    try {
        encoded = serializeAnalysisSnapshot(snapshot);
    }
    catch (cause) {
        return err(new EvidenceIntegrityError(snapshotValidationMessage(cause), {
            cause,
            ...validationIssueOptions(cause, []),
        }));
    }
    return writeTextFile(encoded, path, overwrite, resources);
};
const snapshotValidationMessage = (cause) => {
    if (cause instanceof z.ZodError)
        return `Analysis snapshot validation failed ${describeValidationFailure(cause)}`;
    // The Evidence format owner's refusal carries the recreate guidance.
    return cause instanceof TypeError || isUnsupportedEvidenceFormat(cause)
        ? cause.message
        : "Analysis snapshot validation failed";
};
