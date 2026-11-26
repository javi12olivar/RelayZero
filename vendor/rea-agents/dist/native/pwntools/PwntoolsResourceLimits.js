import { resolvePwntoolsLimits, } from "../../domain/native/pwntoolsResourceLimits.js";
import { safeParseUtf8Json } from "../../domain/safeJson.js";
import { join } from "node:path";
import { completedStableArtifact, readStableArtifact, } from "../../resources/index.js";
import { OwnedCommandFailure } from "../../process/OwnedCommand.js";
import { PWNTOOLS_MEMORY_FAILURE_EXIT, PWNTOOLS_FILE_SIZE_FAILURE_EXIT, } from "./PwntoolsRelease.js";
import { z } from "zod";
import { errorMessage } from "../../kernel/errorMessage.js";
/** Actual limits reported by the owned bridge after lowering inherited soft limits. */
export const pwntoolsResourceLimitsSchema = z.strictObject({
    address_space_bytes: z.int().nonnegative(),
    cpu_seconds: z.int().nonnegative(),
    file_size_bytes: z.int().nonnegative(),
});
/** A report must fit this operation's selected ceilings, including raised budgets. */
export const pwntoolsResourceLimitsSchemaFor = (limits) => pwntoolsResourceLimitsSchema.extend({
    address_space_bytes: z.int().nonnegative().max(limits.address_space_bytes),
    cpu_seconds: z.int().nonnegative().max(limits.cpu_seconds),
    file_size_bytes: z.int().nonnegative().max(limits.file_bytes),
});
/** Read only bounded owned reports; unverified reserved statuses stay unclassified. */
export const readPwntoolsFailureEvidence = async (cause, rootPath, resources, selectedLimits = resolvePwntoolsLimits()) => {
    const finalizationFailures = {};
    let limitReport;
    let marker;
    if (cause instanceof OwnedCommandFailure &&
        cause.snapshot?.signal === null &&
        (cause.snapshot.exitCode === PWNTOOLS_MEMORY_FAILURE_EXIT ||
            cause.snapshot.exitCode === PWNTOOLS_FILE_SIZE_FAILURE_EXIT) &&
        rootPath !== undefined) {
        try {
            const reported = await readStableArtifact(join(rootPath, "resource.failure"), 1, undefined, undefined, resources).catch((cause) => {
                const completed = completedStableArtifact(cause);
                if (completed === undefined)
                    throw cause;
                finalizationFailures["resource.failure"] = errorMessage(cause);
                return completed;
            });
            const expected = cause.snapshot.exitCode === PWNTOOLS_MEMORY_FAILURE_EXIT ? "M" : "F";
            marker = reported.bytes.equals(Buffer.from(expected, "ascii"))
                ? { resource: expected === "M" ? "memory" : "file-size", failure: null }
                : {
                    resource: null,
                    failure: "Private bridge failure marker does not match the observed exit status.",
                };
        }
        catch (markerFailure) {
            marker = {
                resource: null,
                failure: errorMessage(markerFailure),
            };
        }
    }
    if (cause instanceof OwnedCommandFailure &&
        (cause.snapshot?.signal === "SIGXCPU" ||
            cause.snapshot?.signal === "SIGXFSZ" ||
            ((cause.snapshot?.exitCode === PWNTOOLS_FILE_SIZE_FAILURE_EXIT ||
                cause.snapshot?.exitCode === PWNTOOLS_MEMORY_FAILURE_EXIT) &&
                cause.snapshot.signal === null)) &&
        rootPath !== undefined) {
        try {
            const reported = await readStableArtifact(join(rootPath, "limits.json"), 4096, undefined, undefined, resources).catch((cause) => {
                const completed = completedStableArtifact(cause);
                if (completed === undefined)
                    throw cause;
                finalizationFailures["limits.json"] = errorMessage(cause);
                return completed;
            });
            const decoded = safeParseUtf8Json(reported.bytes);
            if (!decoded.ok)
                throw decoded.cause;
            limitReport = {
                limits: pwntoolsResourceLimitsSchemaFor(selectedLimits).parse(decoded.value),
                failure: null,
            };
        }
        catch (reportFailure) {
            limitReport = {
                limits: null,
                failure: errorMessage(reportFailure),
            };
        }
    }
    return {
        ...(Object.keys(finalizationFailures).length === 0
            ? {}
            : { finalizationFailures }),
        ...(limitReport === undefined ? {} : { limits: limitReport }),
        ...(marker === undefined ? {} : { marker }),
    };
};
