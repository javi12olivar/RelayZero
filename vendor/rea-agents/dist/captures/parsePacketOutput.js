import { z } from "zod";
import { packetFieldsSchema } from "../domain/captures/packetCapture.js";
import { err, ok } from "../domain/result.js";
import { readTsharkJsonPackets } from "../domain/pcap/tsharkJsonPackets.js";
const packetsSchema = z.array(packetFieldsSchema);
/**
 * Read selected `-e` fields from `tshark -T json`. The expansion estimate is
 * charged before parsing. The read is not signal-aware: the producer already
 * finished, so a late abort keeps complete Evidence.
 */
export const parsePacketOutput = async (text, packetLimit, budget) => {
    const read = await readTsharkJsonPackets(text, {
        maxBytes: budget.outputBytes,
        maxDecodedBytes: budget.expansionBytes,
        decodedBytes: 0,
    });
    if (!read.ok)
        switch (read.error.kind) {
            case "json-expansion":
                return err({ kind: "expansion" });
            case "json-bytes":
                return err({
                    kind: "output",
                    reason: "TShark output exceeds the selected producer output budget.",
                });
            case "malformed-json":
                return err({
                    kind: "output",
                    reason: "TShark emitted malformed JSON.",
                    cause: read.error.cause,
                });
            case "malformed-packet":
                return err({ kind: "output", reason: `TShark ${read.error.reason}.` });
            case "cancelled":
                // No signal is passed, so the reader cannot report cancellation.
                throw new Error("Packet output read observed no signal.");
        }
    const parsed = packetsSchema.safeParse(read.value);
    if (!parsed.success)
        return err({
            kind: "output",
            reason: "TShark packet fields do not match the selected-field shape.",
            cause: parsed.error,
        });
    let previous = 0n;
    for (const packet of parsed.data) {
        const frame = BigInt(packet["frame.number"][0]);
        if (frame <= previous)
            return err({
                kind: "output",
                reason: "TShark returned unordered frames.",
            });
        if (packetLimit !== null && frame > BigInt(packetLimit))
            return err({
                kind: "output",
                reason: "TShark returned a frame beyond the selected input packet limit.",
            });
        previous = frame;
    }
    return ok(parsed.data);
};
