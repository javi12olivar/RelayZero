import { GhidraAdmissionError } from "./GhidraAdmissionError.js";
import { z } from "zod";
import { ownedJsonValueSchema } from "../domain/jsonValue.js";
import { err, ok } from "../domain/result.js";
const responseSchema = z.discriminatedUnion("ok", [
    z.strictObject({
        id: z.int().positive(),
        ok: z.literal(true),
        result: ownedJsonValueSchema,
    }),
    z.strictObject({
        // Id 0 is BRIDGE_CONNECTION_FAILURE_ID: the bridge could not parse the
        // request, so it cannot name the request id it rejects.
        id: z.int().nonnegative(),
        ok: z.literal(false),
        error: z
            .object({
            code: z.string().min(1),
            message: z.string().min(1),
        })
            .strict(),
    }),
]);
/** Expected operation failure returned by the authenticated Java bridge. */
export class GhidraRemoteError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = "GhidraRemoteError";
    }
}
/** The remote failure one rejected request carries. */
export const ghidraRemoteError = (error) => new GhidraRemoteError(error.code, error.message);
/** Parse one complete Java-bridge response without accepting extra fields. */
const parseGhidraResponseLine = (line) => {
    try {
        const parsed = JSON.parse(line);
        const response = responseSchema.safeParse(parsed);
        return response.success
            ? ok(response.data)
            : err(new GhidraAdmissionError("response_shape"));
    }
    catch (cause) {
        return err(new GhidraAdmissionError("response_json", undefined, { cause }));
    }
};
/** Ghidra's `ok`-discriminated envelope for the shared JSON-line reader. */
export const ghidraReplyEnvelope = {
    parse: parseGhidraResponseLine,
    id: (response) => response.id,
    remoteFailure: (response) => response.ok ? undefined : ghidraRemoteError(response.error),
};
