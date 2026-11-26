import { cancelledBy } from "../domain/analysisErrorCore.js";
import { analysisInputErrorFromIssues } from "../domain/inputIssueProjection.js";
import { err, ok } from "../domain/result.js";
import { isRecord } from "../kernel/isRecord.js";
/** Keep top-level caller selections separate from defaults resolved for execution. */
export const callerAnalysisParameters = (rawInput) => {
    const selected = new Set(isRecord(rawInput)
        ? Object.keys(rawInput).filter((name) => rawInput[name] !== undefined)
        : []);
    return (resolved) => {
        const parameters = { ...resolved };
        for (const name of Object.keys(parameters))
            if (!selected.has(name))
                Reflect.deleteProperty(parameters, name);
        return parameters;
    };
};
/** Validate an application request, honoring cancellation before admission when supplied. */
export const parseAnalysisInput = (operation, rawInput, schema, signal) => {
    if (signal?.aborted)
        return err(cancelledBy(operation, signal));
    const input = schema.safeParse(rawInput);
    if (!input.success)
        return err(analysisInputErrorFromIssues(operation, input.error.issues, rawInput, {
            cause: input.error,
        }));
    return ok(input.data);
};
