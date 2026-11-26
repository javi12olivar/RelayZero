import { requireAuthenticationHeadroom } from "../JsonAuthenticationHeadroom.js";
import { setImmediate } from "node:timers/promises";
import { historicalSourceGraphSchema, } from "../../domain/referenceSourceGraph.js";
import { cancelledBy, isAborted } from "../../domain/analysisErrorCore.js";
import { analysisInputErrorFromIssues } from "../../domain/inputIssueProjection.js";
import { err, ok } from "../../domain/result.js";
import { readJsonFileWithSource } from "../JsonFiles.js";
/** Resolve one caller-selected historical graph using the shared bounded regular-file reader. No file cache. */
export const resolveSourceToBundleReference = async (reference, signal, resources, 
/** The file path as the caller spelled it, when an adapter resolved it. */
requestedPath) => {
    if (isAborted(signal))
        return err(cancelledBy("compare_source_to_bundle", signal));
    if (!("kind" in reference))
        return ok({ reference });
    const read = await readJsonFileWithSource(reference.path, signal, resources, "compare_source_to_bundle");
    if (!read.ok)
        return read;
    await setImmediate();
    if (isAborted(signal))
        return err(cancelledBy("compare_source_to_bundle", signal));
    const headroom = requireAuthenticationHeadroom(read.value.data, {
        operation: "compare_source_to_bundle",
        path: read.value.path,
        description: "Insufficient heap headroom to authenticate the historical source graph",
    });
    if (!headroom.ok)
        return headroom;
    const parsed = historicalSourceGraphSchema.safeParse(read.value.data);
    // Dispatch aborts queued while synchronous validation and commitment hashing ran.
    await setImmediate();
    if (isAborted(signal))
        return err(cancelledBy("compare_source_to_bundle", signal));
    if (!parsed.success)
        return err(analysisInputErrorFromIssues("compare_source_to_bundle", parsed.error.issues.map((issue) => ({
            ...issue,
            path: ["reference", ...issue.path],
        })), { reference: read.value.data }, { cause: parsed.error }));
    return ok({
        reference: parsed.data,
        reference_source: {
            kind: "file",
            path: read.value.path,
            requested_path: requestedPath ?? reference.path,
        },
    });
};
