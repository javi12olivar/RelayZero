import { lstat } from "node:fs/promises";
import { ConfigurationError } from "../domain/configurationErrors.js";
import { absoluteCallerPath } from "../filesystem/callerPath.js";
export const selectedPath = (path, context) => absoluteCallerPath(path, { cwd: context.cwd, platform: context.platform });
/** The client-root context of one registration selection. */
export const rootContext = ({ home, platform, environment, }) => ({
    home,
    platform,
    env: environment,
});
export const present = async (path) => {
    try {
        await lstat(path);
        return true;
    }
    catch (cause) {
        if (cause instanceof Error && "code" in cause && cause.code === "ENOENT")
            return false;
        throw new ConfigurationError(`Cannot determine the registration location at ${path}. Repair its access or path before registering.`, { cause });
    }
};
export const firstExisting = async (candidates, fallback) => {
    for (const candidate of candidates)
        if (await present(candidate))
            return candidate;
    return fallback;
};
/** Fixed relative target precedence used by clients with a single project document. */
export const fixedProjectLocation = (candidates) => async (context) => {
    const paths = candidates.map((path) => selectedPath(path, context));
    return {
        configPath: await firstExisting(paths, selectedPath(candidates[0], context)),
    };
};
