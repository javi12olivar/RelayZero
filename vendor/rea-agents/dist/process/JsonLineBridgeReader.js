import { Utf8NdjsonLineBuffer, Utf8NdjsonOversizeError, } from "./Utf8NdjsonLineBuffer.js";
/**
 * Reply id a REA-owned bridge uses for a failure it cannot attribute to one
 * request, such as an unparseable or oversized request frame. No client
 * request uses it: both clients number requests from 1.
 */
export const BRIDGE_CONNECTION_FAILURE_ID = 0;
/**
 * Reads one REA-owned JSON-line bridge connection: bounded UTF-8 framing,
 * envelope parsing, and request-id correlation including connection-level
 * rejections on the reserved id. After the first failure it ignores input
 * until `reset`, because the owner closes the connection.
 */
export class JsonLineBridgeReader {
    #options;
    #lines;
    #failed = false;
    constructor(options) {
        this.#options = options;
        this.#lines = new Utf8NdjsonLineBuffer(options.maxReplyBytes);
    }
    push(chunk) {
        if (this.#failed)
            return;
        for (const line of this.#lines.push(chunk)) {
            if (!line.ok) {
                this.#fail(line.error instanceof Utf8NdjsonOversizeError
                    ? {
                        kind: "reply_oversize",
                        maximumBytes: line.error.maximumBytes,
                        observedBytes: line.error.observedBytes,
                    }
                    : { kind: "utf8", cause: line.error });
                return;
            }
            if (!this.#route(line.value))
                return;
        }
    }
    /** Validate the unterminated tail at EOF. */
    finish() {
        if (this.#failed)
            return;
        const tail = this.#lines.finish();
        if (!tail.ok)
            this.#fail({ kind: "utf8", cause: tail.error });
    }
    /** Discard buffered bytes and accept input again for a new connection. */
    reset() {
        this.#lines.reset();
        this.#failed = false;
    }
    /** Route one complete line; false once the stream has failed. */
    #route(line) {
        const { envelope } = this.#options;
        const parsed = envelope.parse(line);
        if (!parsed.ok)
            return this.#fail({ kind: "envelope", cause: parsed.error });
        const message = parsed.value;
        const id = envelope.id(message);
        if (id === BRIDGE_CONNECTION_FAILURE_ID) {
            const cause = envelope.remoteFailure(message);
            if (cause === undefined)
                return this.#fail({ kind: "unknown_id", id });
            // The bridge could not attribute the rejected request and closes the
            // connection, so every request in flight fails with its remote reason.
            if (!this.#options.rejectInFlight(cause))
                return this.#fail({ kind: "connection_rejected", cause });
            return true;
        }
        if (this.#options.deliver(message))
            return true;
        if (this.#options.wasSent(id))
            return true;
        return this.#fail({ kind: "unknown_id", id });
    }
    #fail(failure) {
        this.#failed = true;
        this.#lines.reset();
        this.#options.fail(failure);
        return false;
    }
}
