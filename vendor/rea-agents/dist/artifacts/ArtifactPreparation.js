import { artifactReadCancelledBy } from "../resources/index.js";
/** Share one preparation while allowing another caller to retry its cancellation. */
export class ArtifactPreparation {
    #pending;
    async run(signal, prepare, assertOpen) {
        for (;;) {
            const pending = (this.#pending ??= { signal, promise: prepare() });
            try {
                await pending.promise;
                return;
            }
            catch (cause) {
                if (this.#pending === pending)
                    this.#pending = undefined;
                if (pending.signal !== signal &&
                    signal?.aborted !== true &&
                    artifactReadCancelledBy(cause, pending.signal)) {
                    assertOpen();
                    continue;
                }
                throw cause;
            }
        }
    }
    clear() {
        this.#pending = undefined;
    }
}
