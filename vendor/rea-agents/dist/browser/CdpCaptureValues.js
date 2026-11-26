import { MAX_NODE_TIMER_DELAY_MS } from "../domain/analysisResourceLimits.js";
import { cancelledBy, carriedReason } from "../domain/analysisErrorCore.js";
import { sanitizeBrowserUrl } from "../domain/browserObservation.js";
import { createWebTextArtifact } from "../domain/webContentArtifact.js";
import { err, ok } from "../domain/result.js";
import { isRecord } from "../kernel/isRecord.js";
export const recordValue = (value) => isRecord(value) ? value : undefined;
/** Preserve an omitted producer inventory as unknown rather than empty. */
export const admitRecords = (value) => Array.isArray(value) ? value : undefined;
export const recordsValue = (value) => Array.isArray(value)
    ? value.flatMap((item) => {
        const record = recordValue(item);
        return record === undefined ? [] : [record];
    })
    : [];
export const cdpStringValue = (value) => typeof value === "string" ? value : undefined;
export const numberValue = (value) => typeof value === "number" && Number.isFinite(value) ? value : undefined;
/** An omitted resource size is unknown; a supplied invalid size is malformed. */
export const resourceContentSize = (value) => {
    if (value === undefined)
        return ok(null);
    const size = numberValue(value);
    return size !== undefined && size >= 0
        ? ok(size)
        : err({ _tag: "InvalidCdpResourceSize" });
};
export const isHttpUrl = (value) => {
    if (value === undefined)
        return false;
    try {
        const protocol = new URL(value).protocol;
        return protocol === "http:" || protocol === "https:";
    }
    catch (cause) {
        // Non-URL input is not an HTTP URL.
        void cause;
        return false;
    }
};
export const allowedSanitizedUrl = (value, allowedOrigins) => {
    const text = cdpStringValue(value);
    if (text === undefined)
        return undefined;
    const sanitized = sanitizeBrowserUrl(text);
    return sanitized.origin !== null && allowedOrigins.has(sanitized.origin)
        ? sanitized
        : undefined;
};
export const sourceResult = (source) => ({
    included: true,
    artifact: createWebTextArtifact(source, "text/javascript"),
});
export const sourceExcluded = (reason) => ({ included: false, reason });
export const delayWithCancellation = async (durationMs, operation, signal) => {
    let remaining = durationMs;
    while (remaining > 0) {
        if (signal?.aborted === true)
            throw cancelledBy(operation, signal);
        const delay = Math.min(remaining, MAX_NODE_TIMER_DELAY_MS);
        await new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                signal?.removeEventListener("abort", onAbort);
                resolve();
            }, delay);
            const onAbort = () => {
                clearTimeout(timer);
                signal?.removeEventListener("abort", onAbort);
                reject(cancelledBy(operation, carriedReason(signal?.reason)));
            };
            signal?.addEventListener("abort", onAbort, { once: true });
            if (signal?.aborted === true)
                onAbort();
        });
        remaining -= delay;
    }
};
