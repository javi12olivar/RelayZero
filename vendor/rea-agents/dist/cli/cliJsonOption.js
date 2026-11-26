import { AnalysisInputError } from "../domain/analysisErrorCore.js";
import { err, ok } from "../domain/result.js";
import { safeParseJson } from "../domain/safeJson.js";
/** Decode one named CLI option before using the selected inputs. */
export const parseCliJsonOption = (operation, name, text, message) => {
    if (text === undefined)
        return ok(undefined);
    const parsed = safeParseJson(text);
    return parsed.ok
        ? parsed
        : err(new AnalysisInputError(operation, { cause: parsed.cause }, [
            { path: [name], reason: "invalid_format", expected: "JSON", message },
        ]));
};
