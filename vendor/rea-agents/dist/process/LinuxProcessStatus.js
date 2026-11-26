/** Parse the single `Uid:` or `Gid:` row of one Linux `/proc/<pid>/status` record. */
export const parseLinuxProcessIds = (value, row) => {
    let ids;
    for (const line of value.split("\n")) {
        if (!line.startsWith(`${row}:`))
            continue;
        if (ids !== undefined)
            return undefined;
        const match = /^[UG]id:\s+([0-9]+)\s+([0-9]+)\s+([0-9]+)\s+([0-9]+)\s*$/u.exec(line);
        if (match === null)
            return undefined;
        const [real, effective, saved, filesystem] = match.slice(1).map(Number);
        if (real === undefined ||
            effective === undefined ||
            saved === undefined ||
            filesystem === undefined ||
            [real, effective, saved, filesystem].some((id) => !Number.isSafeInteger(id) || id < 0))
            return undefined;
        ids = [real, effective, saved, filesystem];
    }
    return ids;
};
/** Different readable UID maps prove distinct namespaces; equal maps do not prove sameness. */
export const linuxUidMapsDiffer = (target, caller) => {
    const normalized = (value) => {
        if (value === undefined || value.trim() === "")
            return undefined;
        const rows = [];
        for (const line of value.trim().split("\n")) {
            const match = /^\s*([0-9]+)\s+([0-9]+)\s+([0-9]+)\s*$/u.exec(line);
            if (match === null)
                return undefined;
            const numbers = match.slice(1).map(Number);
            if (numbers.some((number) => !Number.isSafeInteger(number)))
                return undefined;
            rows.push(numbers.join(" "));
        }
        return rows.join("\n");
    };
    const targetMap = normalized(target);
    const callerMap = normalized(caller);
    return targetMap === undefined || callerMap === undefined
        ? undefined
        : targetMap !== callerMap;
};
/** Derive the kernel's environment restriction from one generation's procfs facts. */
export const linuxEnvironmentRestriction = (facts) => {
    const { uids, gids, procfsOwnerUid, callerUid, callerGid, userNamespaceDiffers, } = facts;
    if ((callerUid !== undefined &&
        uids.slice(0, 3).some((uid) => uid !== callerUid)) ||
        (callerGid !== undefined &&
            gids !== undefined &&
            gids.slice(0, 3).some((gid) => gid !== callerGid)))
        return "credentials";
    if (procfsOwnerUid !== undefined && procfsOwnerUid !== uids[1])
        return "non-dumpable";
    return userNamespaceDiffers === true ? "user-namespace" : undefined;
};
