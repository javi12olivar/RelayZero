import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { err, ok } from "../domain/result.js";
import { ReverseEngineeringService } from "../application/reverse/ReverseEngineeringService.js";
import { objdumpCommand, objdumpCommandLimitations, } from "../objdump/ObjdumpCommand.js";
import { OBJDUMP_COMMAND_REPAIR, OBJDUMP_PROVIDER_IDENTITY, } from "../objdump/ObjdumpProviderIdentity.js";
import { rizinCommand, rizinCommandLimitations, rizinCommandRejection, } from "../rizin/RizinCommand.js";
import { RIZIN_COMMAND_REPAIR, RIZIN_PROVIDER_IDENTITY, } from "../rizin/RizinProviderIdentity.js";
import { resolveWindowsProviderExecutable } from "./resolveWindowsProviderExecutable.js";
export const createReverseEngineeringCommandPort = (environment, platform = HOST_PLATFORM.platform) => ({
    objdump: (input) => selectCommand(environment.REA_OBJDUMP_COMMAND ?? "objdump", environment, platform, {
        arguments: objdumpCommand(input),
        limitations: objdumpCommandLimitations(input),
        identity: OBJDUMP_PROVIDER_IDENTITY,
        repair: OBJDUMP_COMMAND_REPAIR,
        environmentOverrides: { DEBUGINFOD_URLS: "" },
    }),
    rizin: (input) => selectCommand(environment.REA_RIZIN_COMMAND ?? "rizin", environment, platform, {
        arguments: rizinCommand(input),
        limitations: rizinCommandLimitations(input),
        rejection: rizinCommandRejection,
        identity: RIZIN_PROVIDER_IDENTITY,
        repair: RIZIN_COMMAND_REPAIR,
    }),
});
/** Bind the configured executable, resolving Windows bare names on PATH. */
const selectCommand = (command, environment, platform, profile) => {
    if (platform !== "win32")
        return ok({ ...profile, executable: command });
    const resolved = resolveWindowsProviderExecutable(command, environment);
    if (resolved.ok)
        return ok({ ...profile, executable: resolved.value });
    return err({
        identity: profile.identity,
        repair: profile.repair,
        command,
        reason: resolved.error.kind === "not_found"
            ? { kind: "not_found" }
            : { kind: "invalid_pathext", extension: resolved.error.extension },
    });
};
/** Compose BYO reverse-engineering commands without acquiring tools at import time. */
export const createReverseEngineeringService = (environment = process.env, options = {}) => {
    const environmentSnapshot = { ...environment };
    return new ReverseEngineeringService({
        ...options,
        environment: environmentSnapshot,
        commands: createReverseEngineeringCommandPort(environmentSnapshot),
    });
};
