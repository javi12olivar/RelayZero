import { parseEvidence, withEvidenceCallerInputPath, } from "../domain/evidence.js";
import { ZodError } from "zod";
import { finishAnalysisCommand } from "./finishAnalysisCommand.js";
/**
 * Bind the CLI selection before final cleanup or publication can retain it.
 * An omitted `callerPath` keeps the Evidence's own, binding only the named
 * auxiliary paths.
 */
export const bindCliEvidenceCallerPath = (callerPath, run, additionalPaths) => async () => {
    const result = await run();
    if (result.ok)
        return {
            ok: true,
            value: withEvidenceCallerInputPath(result.value, callerPath, additionalPaths),
        };
    if (result.error.partialObservation !== undefined) {
        try {
            result.error.partialObservation = withEvidenceCallerInputPath(parseEvidence(result.error.partialObservation), callerPath, additionalPaths);
        }
        catch (cause) {
            // Raw or invalid partial observations must retain their original form.
            if (!(cause instanceof ZodError))
                throw cause;
        }
    }
    return result;
};
/** Finalize a one-shot file inspection with its original CLI selection. */
export const finishCliEvidenceCommand = (callerPath, run, service, providerId, operation, signal, additionalPaths) => finishAnalysisCommand(bindCliEvidenceCallerPath(callerPath, run, additionalPaths), service, providerId, operation, signal);
