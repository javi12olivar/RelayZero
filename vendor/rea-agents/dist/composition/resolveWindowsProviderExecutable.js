import { statSync } from "node:fs";
import { win32 } from "node:path";
import { err, ok } from "../domain/result.js";
import { windowsPathCandidates, } from "../process/executableSearch.js";
const isRegularFile = (path) => {
    try {
        return statSync(path).isFile();
    }
    catch {
        return false;
    }
};
/**
 * Resolve a configured command against the captured child environment. A
 * path is resolved against `cwd`; a bare name must be found on PATH/PATHEXT,
 * and is never returned unresolved, because Windows would then also search
 * the current directory.
 */
export const resolveWindowsProviderExecutable = (executable, environment, lookup = {}) => {
    const cwd = lookup.cwd ?? process.cwd();
    if (win32.isAbsolute(executable) ||
        executable.includes("/") ||
        executable.includes("\\") ||
        win32.parse(executable).root !== "")
        return ok(win32.resolve(cwd, executable));
    const candidates = windowsPathCandidates(executable, environment, { cwd });
    if (!candidates.ok)
        return candidates;
    for (const { path } of candidates.value)
        if ((lookup.isFile ?? isRegularFile)(path))
            return ok(path);
    return err({ kind: "not_found" });
};
