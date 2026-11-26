import { applyWindowsChangeTimeSnapshot, resolveWindowsChangeTimeSettle, } from "../config/windowsChangeTimeSettle.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
const limitsFrom = (seams) => {
    if (seams.limits !== undefined)
        return seams.limits;
    const resolved = resolveWindowsChangeTimeSettle(seams.environment ?? process.env);
    if (!resolved.ok)
        throw resolved.error;
    return applyWindowsChangeTimeSnapshot(resolved.value);
};
/** Stop settling as soon as the owning operation is cancelled. */
const throwIfAborted = (seams) => {
    if (seams.signal?.aborted !== true)
        return;
    const reason = seams.signal.reason;
    throw seams.cancellationError ? seams.cancellationError(reason) : reason;
};
const defaultSleep = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));
const changeTimeMs = (stats) => typeof stats.ctimeMs === "number" ? stats.ctimeMs : Number.NaN;
/**
 * Whether an observed ChangeTime can still move on its own, so recording it now
 * would create a baseline a later observation is entitled to disagree with.
 */
const changeTimeMayStillDrift = (stats, seams = {}) => {
    const platform = seams.platform ?? HOST_PLATFORM.platform;
    if (platform !== "win32")
        return false;
    const changeTime = changeTimeMs(stats);
    // An unreadable ChangeTime cannot establish that it has settled; re-observation
    // is the only way to obtain a comparable value.
    if (!Number.isFinite(changeTime))
        return true;
    const now = seams.now?.() ?? Date.now();
    return now - changeTime < limitsFrom(seams).driftMs;
};
/**
 * Observe until the ChangeTime itself has aged out of the drift window, then
 * return it as the baseline. Waiting for two consecutive reads to agree is not
 * enough: two observations taken before Windows performs a delayed update agree
 * with each other and disagree with every later one.
 *
 * Only a ChangeTime still inside the window is re-observed, so an established
 * file costs exactly one read.
 *
 * Returns the last observation if the wait budget runs out: the caller's
 * comparisons still see that value, and refusing to admit a readable file would
 * trade a false "changed" report for a failure to inspect it.
 */
export const settleChangeTimeBaseline = async (read, seams = {}) => {
    throwIfAborted(seams);
    if ((seams.platform ?? HOST_PLATFORM.platform) !== "win32") {
        const observed = await read();
        throwIfAborted(seams);
        return observed;
    }
    const limits = limitsFrom(seams);
    const settled = { ...seams, limits };
    const sleep = seams.sleep ?? defaultSleep;
    let observed = await read();
    for (let poll = 0; poll < limits.maxPolls; poll += 1) {
        throwIfAborted(seams);
        if (!changeTimeMayStillDrift(observed, settled))
            return observed;
        // A settle window is bounded by driftMs, not by the poll budget, so a
        // cancelled scope must not keep an inventory waiting it out.
        await sleep(limits.pollMs);
        throwIfAborted(seams);
        observed = await read();
    }
    throwIfAborted(seams);
    return observed;
};
