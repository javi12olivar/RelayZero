import { err, ok } from "../domain/result.js";
import { strictUtf8Decoder } from "../domain/strictUtf8.js";
const exceeded = err({ _tag: "ControlLineLimitExceeded" });
const malformed = err({ _tag: "ControlLineMalformedUtf8" });
const LF = 0x0a;
const CR = 0x0d;
/**
 * Frame wire bytes before decoding. The limit excludes LF or CRLF. Report
 * overflow as soon as it is known, then drain to LF before the next frame.
 * The caller owns failure policy and the input iterator's early-return cleanup.
 */
export async function* readBoundedControlLines(chunks, maxBytes) {
    const decoder = strictUtf8Decoder("preserve");
    let pending;
    let pendingBytes = 0;
    let oversized = false;
    const decode = (bytes) => {
        if (bytes.length > maxBytes)
            return exceeded;
        try {
            return ok(decoder.decode(bytes));
        }
        catch (cause) {
            if (!(cause instanceof TypeError))
                throw cause;
            return malformed;
        }
    };
    for await (const chunk of chunks) {
        let start = 0;
        while (start < chunk.length) {
            const newline = chunk.indexOf(LF, start);
            const end = newline === -1 ? chunk.length : newline;
            if (!oversized) {
                const fragment = chunk.subarray(start, end);
                const count = pendingBytes + fragment.length;
                const last = fragment.length > 0
                    ? fragment[fragment.length - 1]
                    : pending?.[pendingBytes - 1];
                // The byte after the limit can still be CR awaiting LF in the next chunk.
                if (count > maxBytes + (last === CR ? 1 : 0)) {
                    pendingBytes = 0;
                    oversized = true;
                    yield exceeded;
                }
                else if (newline !== -1) {
                    const length = count - (last === CR ? 1 : 0);
                    if (pending === undefined || pendingBytes === 0)
                        yield decode(fragment.subarray(0, length));
                    else {
                        pending.set(fragment, pendingBytes);
                        yield decode(pending.subarray(0, length));
                    }
                    pendingBytes = 0;
                }
                else if (fragment.length > 0) {
                    pending ??= new Uint8Array(maxBytes + 1);
                    pending.set(fragment, pendingBytes);
                    pendingBytes = count;
                }
            }
            if (newline === -1)
                break;
            oversized = false;
            start = newline + 1;
        }
    }
    if (pending !== undefined && pendingBytes > 0)
        yield decode(pending.subarray(0, pendingBytes));
}
