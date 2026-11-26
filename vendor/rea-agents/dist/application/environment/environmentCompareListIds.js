import { completePairingByLiteral, hasForcedIdentifierListInversion, identifierListKeys as keysOf, recoverIdentifierListSurvivors, } from "./environmentIdentifierListSurvivors.js";
const ID_LIST_FIELD = /^(ids|uuids|guids)$/u;
const scalar = (value) => value === null || typeof value !== "object";
const literalKey = (value) => `literal:${JSON.stringify(value)}`;
const identityKey = (value) => `id:${value}`;
const environmentIdentity = (value) => ({
    literal: literalKey(value),
    mapped: typeof value === "number" || typeof value === "string"
        ? identityKey(value)
        : undefined,
});
/** Compare one scalar identifier list using the call's proven collection ownership. */
export const compareIdentifierList = (live, env, field, map, ownedScope) => {
    if (field === undefined)
        return undefined;
    const named = ID_LIST_FIELD.test(field);
    if ((!named &&
        !live.some((value) => typeof value === "string" && map.isStateReference(value, field))) ||
        !live.every(scalar) ||
        !env.every(scalar))
        return undefined;
    const scope = named ? ownedScope : undefined;
    const hasMapping = new Set();
    const identities = live.map((value, index) => {
        const id = ((typeof value === "number" || typeof value === "string") && named) ||
            (typeof value === "string" && map.isStateReference(value, field));
        const mapped = id ? map.env(value, scope) : undefined;
        if (mapped !== undefined)
            hasMapping.add(index);
        return {
            literal: scope !== undefined &&
                mapped !== undefined &&
                String(mapped) !== String(value)
                ? undefined
                : literalKey(value),
            mapped: mapped === undefined ? undefined : identityKey(mapped),
        };
    });
    if (!named && hasMapping.size === 0)
        return undefined;
    let survivors = new Map();
    let assigned = new Set();
    const replacements = new Map();
    const envIdentities = env.map(environmentIdentity);
    // Preserve complete lists that already agree in position, including
    // literal references whose collection was not established.
    if (live.length === env.length &&
        identities.every(({ literal, mapped }, index) => (literal !== undefined && literal === envIdentities[index].literal) ||
            (mapped !== undefined && mapped === envIdentities[index].mapped))) {
        for (const index of live.keys())
            survivors.set(index, index);
        return { survivors, replacements, hasMapping, reordered: false };
    }
    const available = new Map();
    for (const [index, identity] of envIdentities.entries())
        for (const key of keysOf(identity)) {
            const bucket = available.get(key);
            if (bucket === undefined)
                available.set(key, { indices: [index], next: 0 });
            else
                bucket.indices.push(index);
        }
    const pair = (left, key) => {
        if (key === undefined || survivors.has(left))
            return;
        const bucket = available.get(key);
        if (bucket === undefined)
            return;
        while (bucket.next < bucket.indices.length) {
            const right = bucket.indices[bucket.next++];
            if (assigned.has(right))
                continue;
            survivors.set(left, right);
            assigned.add(right);
            return;
        }
    };
    // Protect values that have only a literal match before taking optional
    // raw matches for mapped references with unresolved collection ownership.
    for (const [index, { mapped, literal }] of identities.entries())
        if (mapped === undefined)
            pair(index, literal);
    for (const [index, { mapped }] of identities.entries())
        pair(index, mapped);
    for (const [index, { literal }] of identities.entries())
        pair(index, literal);
    const upperBound = Math.min(live.length, env.length);
    if (survivors.size < upperBound &&
        identities.some((identity, index) => !survivors.has(index) &&
            keysOf(identity).some((key) => available.has(key)))) {
        const literal = completePairingByLiteral(identities, available, survivors, identities.keys(), upperBound);
        if (literal === undefined)
            recoverIdentifierListSurvivors(identities, envIdentities, available, survivors, assigned);
        else {
            survivors = literal;
            assigned = new Set(literal.values());
        }
    }
    // On equal-length lists, matching every item in order requires each item
    // to match at its original index. The positional check above already
    // ruled that out, so a complete pairing establishes a reorder.
    if (live.length === env.length && survivors.size === live.length)
        return { survivors, replacements, hasMapping, reordered: true };
    const occurrences = new Map();
    for (const identity of identities)
        for (const key of keysOf(identity))
            occurrences.set(key, (occurrences.get(key) ?? 0) + 1);
    let replacement = 0;
    let last = -1;
    let furthest = -1;
    let possibleInversion = false;
    let reordered = false;
    for (const [index, identity] of identities.entries()) {
        const right = survivors.get(index);
        if (right === undefined) {
            while (assigned.has(replacement))
                replacement++;
            if (replacement < env.length)
                replacements.set(index, replacement++);
            continue;
        }
        // Identical environment entries can always exchange their positions, so
        // a reversal between those occurrences cannot require the residual proof.
        if (available.get(envIdentities[right].literal).indices.length === 1) {
            possibleInversion ||= right < furthest;
            furthest = Math.max(furthest, right);
        }
        // With no competing occurrence on either side, the match is forced.
        // For overlapping choices, the residual graph can prove more.
        if (keysOf(identity).some((key) => available.get(key)?.indices.some((candidate) => candidate !== right)) ||
            keysOf(envIdentities[right]).some((key) => (occurrences.get(key) ?? 0) >
                Number(key === identity.literal || key === identity.mapped)))
            continue;
        reordered ||= right < last;
        last = right;
    }
    if (!reordered && possibleInversion)
        reordered = hasForcedIdentifierListInversion(identities, envIdentities, available, survivors, assigned);
    return { survivors, replacements, hasMapping, reordered };
};
