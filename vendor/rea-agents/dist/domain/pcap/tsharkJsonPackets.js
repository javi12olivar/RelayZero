import { setImmediate as yieldToEventLoop } from "node:timers/promises";
import { isRecord } from "../../kernel/isRecord.js";
import { parseJsonWithDuplicatePolicy } from "../jsonDuplicateMember.js";
import { err, ok } from "../result.js";
const YIELD_INTERVAL = 65_536;
/**
 * Estimate the expanded graph of `text` and stop when it exceeds the budget.
 * The estimate charges every string, container and member separator before
 * `JSON.parse` allocates them.
 */
const chargeExpansion = async (text, budget, signal) => {
    let quoted = false;
    let escaped = false;
    budget.decodedBytes += text.length * 2;
    for (let index = 0; index < text.length; index += 1) {
        if (index % YIELD_INTERVAL === 0) {
            await yieldToEventLoop();
            if (signal?.aborted)
                return { kind: "cancelled", cause: signal.reason };
        }
        const char = text[index];
        if (quoted) {
            if (escaped)
                escaped = false;
            else if (char === "\\")
                escaped = true;
            else if (char === '"')
                quoted = false;
        }
        else if (char === '"') {
            quoted = true;
            budget.decodedBytes += 64;
        }
        else if (char === "{" || char === "[" || char === ":" || char === ",")
            budget.decodedBytes += 128;
        if (budget.decodedBytes > budget.maxDecodedBytes)
            return {
                kind: "json-expansion",
                maxDecodedBytes: budget.maxDecodedBytes,
            };
    }
    return undefined;
};
/**
 * Parse a `tshark -T json` document as the ordered `_source.layers` record of
 * each packet. This owns the export envelope; interpreting the layers (flat
 * `-e` fields or a protocol tree) belongs to the caller. The caller has
 * already bounded `text`; `readTsharkJsonPackets` also bounds its expansion.
 */
export const parseTsharkJsonPackets = (text) => {
    // Both tshark callers pass `--no-duplicate-keys`, so tshark merges repeated
    // protocol and field names into arrays before REA parses the JSON document.
    const parsed = parseJsonWithDuplicatePolicy(text, "last-wins");
    if (!parsed.ok)
        return err({ kind: "malformed-json", cause: parsed.cause });
    const decoded = parsed.value;
    if (!Array.isArray(decoded))
        return err({
            kind: "malformed-packet",
            reason: "packet root must be an array",
        });
    const packets = [];
    for (const [index, packet] of decoded.entries()) {
        if (!isRecord(packet) ||
            !isRecord(packet._source) ||
            !isRecord(packet._source.layers))
            return err({
                kind: "malformed-packet",
                reason: `packet ${String(index + 1)} lacks _source.layers`,
            });
        packets.push(packet._source.layers);
    }
    return ok(packets);
};
/**
 * Admit a `tshark -T json` document against its byte and expansion budget,
 * yielding to the event loop and observing `signal` while estimating, then
 * parse it with `parseTsharkJsonPackets`.
 */
export const readTsharkJsonPackets = async (text, budget, signal) => {
    if (signal?.aborted)
        return err({ kind: "cancelled", cause: signal.reason });
    if (Buffer.byteLength(text) > budget.maxBytes)
        return err({ kind: "json-bytes", maxBytes: budget.maxBytes });
    const refused = await chargeExpansion(text, budget, signal);
    if (refused !== undefined)
        return err(refused);
    return parseTsharkJsonPackets(text);
};
