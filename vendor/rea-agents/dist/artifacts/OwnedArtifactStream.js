import { pipeline, Transform } from "node:stream";
import { ArtifactReaderFailure, artifactReadCancelledBy, } from "../resources/index.js";
const READER_CLOSED = Symbol("Artifact stream reader closed");
/** Close and caller cancellation share one ordering for a reader's member streams. */
export class ArtifactStreamLifecycle {
    label;
    #shutdown = new AbortController();
    constructor(label) {
        this.label = label;
    }
    get closed() {
        return this.#shutdown.signal.aborted;
    }
    close() {
        this.#shutdown.abort(READER_CLOSED);
    }
    member(caller) {
        const signal = caller === undefined
            ? this.#shutdown.signal
            : AbortSignal.any([caller, this.#shutdown.signal]);
        const cancellationFailure = (reason) => reason === READER_CLOSED
            ? new ArtifactReaderFailure("unavailable", `${this.label} reader closed`)
            : new ArtifactReaderFailure("cancelled", `${this.label} read cancelled`, { cause: reason });
        return {
            signal,
            cancellationFailure,
            async verify(check) {
                try {
                    await check(signal);
                }
                catch (cause) {
                    if (signal.reason === READER_CLOSED &&
                        artifactReadCancelledBy(cause, signal))
                        throw cancellationFailure(READER_CLOSED);
                    throw cause;
                }
                if (signal.aborted)
                    throw cancellationFailure(signal.reason);
            },
        };
    }
}
/** Verify the member's byte count and source before stream completion. */
export const checkedArtifactMemberStream = (entry, label, incomplete, verify) => {
    let bytes = 0;
    return new Transform({
        transform(chunk, _encoding, callback) {
            bytes += chunk.length;
            callback(null, chunk);
        },
        flush(callback) {
            if (bytes !== entry.declaredSize) {
                callback(incomplete(`member ended early: ${entry.path}`));
                return;
            }
            void verify().then(() => callback(), (cause) => callback(cause instanceof Error
                ? cause
                : new Error(`${label} read failed`, { cause })));
        },
    });
};
/** Keep the carrier and buffered output owned through production and retirement. */
export const ownArtifactStream = (source, output, { scope, streams, signal, cancellationFailure, label, }) => {
    output.on("error", () => undefined);
    streams?.add(output);
    let producerComplete = false;
    const onAbort = () => {
        // Active I/O and validation own failure precedence; cancellation also
        // retires buffered output after production completes.
        if (!producerComplete || output.destroyed)
            return;
        output.destroy(cancellationFailure(signal?.reason));
    };
    const retired = new Promise((resolve) => {
        output.once("close", () => {
            streams?.delete(output);
            signal?.removeEventListener("abort", onAbort);
            resolve();
        });
    });
    signal?.addEventListener("abort", onAbort, { once: true });
    if (signal?.aborted)
        onAbort();
    output.once("finish", () => {
        // A successful writable finish follows the transform's final validation.
        // Pipeline retirement may follow later while readable bytes remain buffered.
        producerComplete = true;
        if (signal?.aborted)
            onAbort();
    });
    void scope
        .run(async () => {
        await Promise.all([
            new Promise((resolve) => {
                pipeline(source, output, () => {
                    producerComplete = true;
                    if (signal?.aborted)
                        onAbort();
                    resolve();
                });
            }),
            retired,
        ]);
    })
        .catch((cause) => output.destroy(cause instanceof Error
        ? cause
        : new Error(`${label} stream ownership failed`, { cause })));
};
