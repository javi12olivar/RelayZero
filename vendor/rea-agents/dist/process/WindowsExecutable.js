import { stat } from "node:fs/promises";
import { err, ok } from "../domain/result.js";
import { AbortedWait, waitForAbortable } from "./AbortablePromise.js";
import { windowsPathCandidates } from "./executableSearch.js";
/**
 * Resolve a command the way Windows users name it: a bare name against
 * PATH/PATHEXT only, and a path-qualified name (`C:\Python\python`,
 * `.venv\Scripts\python`) at that location with the same PATHEXT suffixes,
 * probing the search owner's candidates (src/process/executableSearch) in
 * order. Owned launches pass an explicit application name to
 * `CreateProcessW`, which never appends an extension itself. Never return a
 * bare name on failure: handing it to Windows would restart implicit CWD
 * lookup. Callers own the lookup deadline and translation to their operation
 * errors.
 */
export const findWindowsExecutable = async (executable, environment, options) => {
    if (options.signal.aborted)
        return err({ kind: "interrupted" });
    const candidates = windowsPathCandidates(executable, environment, options);
    if (!candidates.ok)
        return candidates;
    for (const { path: candidate } of candidates.value) {
        if (options.signal.aborted)
            return err({ kind: "interrupted" });
        try {
            const metadata = await waitForAbortable(stat(candidate), options.signal);
            if (metadata instanceof AbortedWait || options.signal.aborted)
                return err({ kind: "interrupted" });
            if (metadata.isFile())
                return ok(candidate);
        }
        catch (cause) {
            if (options.signal.aborted)
                return err({ kind: "interrupted" });
            const code = typeof cause === "object" && cause !== null
                ? Reflect.get(cause, "code")
                : undefined;
            if (code === "ENOENT" || code === "ENOTDIR")
                continue;
            return err({
                kind: "inspection",
                path: candidate,
                code: typeof code === "string" ? code : null,
                cause,
            });
        }
    }
    return err({ kind: "missing" });
};
