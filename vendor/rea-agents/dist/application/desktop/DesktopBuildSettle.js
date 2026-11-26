import { setTimeout as delay } from "node:timers/promises";
import { appFileDigests, } from "../../domain/desktop/appSettle.js";
const monotonicClock = {
    now: () => performance.now(),
    delay: (ms, signal) => delay(ms, undefined, { signal }),
    // A timeout takes whole milliseconds.
    timeout: (ms) => AbortSignal.timeout(Math.max(1, Math.floor(ms))),
};
const seconds = (ms) => `${(ms / 1000).toFixed(1)} s`;
/**
 * Read an app's data/get every interval until each file's bytes have held
 * for the window, counted from the read that returned them, or until the
 * bound, as the exported verifier does; `waiting` hears why it reads again.
 * No read starts at or past the bound, and one in flight there is cut.
 */
export const settledAppData = async (read, timing, signal, waiting) => {
    const clock = timing.clock ?? monotonicClock;
    const start = clock.now();
    const elapsed = () => clock.now() - start;
    // The first read is the one a grade needs, so only its own timeout bounds it.
    let parts = await read(signal);
    let files = appFileDigests(parts);
    // Offsets from the first read's start: when the last completed read began,
    // and when a read first returned the bytes it holds.
    let began = 0;
    let since = elapsed();
    const unsettled = () => began - since < timing.windowMs;
    while (unsettled()) {
        // Reads come an interval apart, and the one that can settle the files as soon as the window allows.
        const next = Math.max(Math.min(began + timing.intervalMs, since + timing.windowMs), elapsed());
        if (next >= timing.boundMs)
            return { parts, settled: false, readCut: false };
        await clock.delay(Math.max(0, next - elapsed()), signal);
        const at = Math.max(next, elapsed());
        if (at >= timing.boundMs)
            return { parts, settled: false, readCut: false };
        const bound = clock.timeout(timing.boundMs - at);
        let latest;
        try {
            latest = await read(AbortSignal.any([signal, bound]));
        }
        catch (cause) {
            if (bound.aborted && !signal.aborted)
                return { parts, settled: false, readCut: true };
            throw cause;
        }
        began = at;
        parts = latest;
        const digests = appFileDigests(latest);
        if (digests !== files) {
            since = elapsed();
            files = digests;
        }
        if (unsettled())
            await waiting(`waiting for the app's files to hold for ${seconds(timing.windowMs)}: unchanged for ${seconds(Math.max(0, began - since))}, ${seconds(began)} of at most ${seconds(timing.boundMs)}`);
    }
    return { parts, settled: true, readCut: false };
};
