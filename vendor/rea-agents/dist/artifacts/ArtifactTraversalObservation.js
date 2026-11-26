import { compareUnicodeCodePoints } from "../domain/unicodeCodePointOrder.js";
import { normalizeArtifactPath } from "../resources/index.js";
/**
 * Iterate one reader traversal whose completeness the reader must declare.
 * A traversal that ends without a coverage declaration, or that its consumer
 * stops before the reader finished, reports unknown coverage naming the
 * reader. A failed traversal reports nothing here; its failure is the result.
 * The returned iterator forwards `next` and `return` unchanged, so callers
 * keep unwinding the reader's iterator exactly as they would without it.
 */
export const declaredArtifactEntries = (reader, signal, options) => {
    let declared = false;
    let end;
    const iterator = reader
        .entries(signal, {
        ...options,
        onCoverage: (coverage) => {
            declared = true;
            options.onCoverage(coverage);
        },
    })[Symbol.asyncIterator]();
    const unknown = (limitation) => options.onCoverage({ status: "unknown", limitations: [limitation] });
    return {
        [Symbol.asyncIterator]() {
            return this;
        },
        async next() {
            let next;
            try {
                next = await iterator.next();
            }
            catch (cause) {
                end ??= "failed";
                throw cause;
            }
            if (next.done !== true)
                return next;
            if (end === undefined) {
                end = "exhausted";
                if (!declared)
                    unknown(`The ${reader.format} reader ended its traversal without declaring coverage; members it did not list are unknown.`);
            }
            return { done: true, value: undefined };
        },
        async return() {
            if (end === undefined) {
                end = "stopped";
                unknown(`The ${reader.format} traversal stopped before the reader finished; members after the last listed entry are unknown.`);
            }
            await iterator.return?.();
            return { done: true, value: undefined };
        },
    };
};
/**
 * Retain coverage and omissions across one or more reader traversals. Each
 * traversal must declare its own coverage; one declared-complete traversal
 * never covers another that stayed silent.
 */
export class ArtifactTraversalObservation {
    #limitations = new Set();
    #unknown = false;
    /** Record coverage a reader declared or a consumer established itself. */
    record = (coverage) => {
        this.#unknown ||= coverage.status === "unknown";
        for (const limitation of coverage.limitations)
            this.#limitations.add(limitation);
    };
    /** Record an entry or subtree a traversal deliberately excluded. */
    omit = (omission) => {
        const path = normalizeArtifactPath(omission.path);
        this.#unknown = true;
        this.#limitations.add(`Artifact traversal omitted ${omission.kind} at ${JSON.stringify(path)}.`);
    };
    /** Iterate one reader traversal into this observation. */
    entries(reader, signal) {
        return declaredArtifactEntries(reader, signal, {
            onCoverage: this.record,
            onOmission: this.omit,
        });
    }
    snapshot() {
        return {
            status: this.#unknown ? "unknown" : "complete",
            limitations: [...this.#limitations].sort(compareUnicodeCodePoints),
        };
    }
}
