import { parseDpkgOwners } from "../domain/desktop/linuxPackages.js";
/** dpkg may return owner rows and exit 1 when only some requested paths match. */
export const queryDpkgOwnership = async (runQuery, paths, signal) => {
    const outcome = await runQuery("dpkg-query", ["-S", ...paths], signal, {
        preserveStdoutBytes: true,
        locale: "C.UTF-8",
    });
    if (typeof outcome === "string")
        return { kind: outcome };
    if (outcome.exitCode !== 0 && outcome.exitCode !== 1)
        return { kind: "unavailable" };
    return {
        kind: "read",
        ...parseDpkgOwners(outcome.stdoutBuffer ?? outcome.stdout, paths),
    };
};
