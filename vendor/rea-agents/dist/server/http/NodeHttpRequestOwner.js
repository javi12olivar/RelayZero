import { writeWebResponse } from "./nodeHttpBridge.js";
import { Budget } from "../../domain/budget.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
const HTTP_RESPONSE_SOURCE = "MCP HTTP response source";
/** Own admitted exchanges and separately joinable response-source cleanup. */
export class NodeHttpRequestOwner {
    target;
    #dispatches;
    #exchanges = new Set();
    #bodyCleanups = new Set();
    #cleanupFailures = [];
    constructor(capacity, target) {
        this.target = target;
        if (!Number.isSafeInteger(capacity) || capacity < 1)
            throw new RangeError("maxConcurrentDispatches must be a positive safe integer");
        this.#dispatches = new Budget(capacity);
    }
    handle(request, response) {
        // Node queues a pipelined response without assigning a socket until its
        // predecessor finishes. Never start work or queue a refusal behind it.
        if (request.socket.destroyed || response.socket === null) {
            request.socket.destroy();
            return Promise.resolve();
        }
        const refusal = this.#cleanupFailures.length > 0
            ? "cleanup"
            : this.#dispatches.tryCharge(1)
                ? undefined
                : "capacity";
        if (refusal !== undefined) {
            return this.#trackExchange(async () => {
                try {
                    await writeWebResponse(this.target.refuse(refusal), response, {
                        closeConnection: true,
                        onBodyCleanup: this.#trackBodyCleanup,
                    });
                }
                catch {
                    response.destroy();
                }
            });
        }
        let reserved = true;
        let dispatched = false;
        let inputDone = false;
        let responseDone = false;
        let holdResponse = true;
        let pendingCleanups = 0;
        let cleanupFailed = false;
        const release = () => {
            if (!reserved)
                return;
            reserved = false;
            this.#dispatches.refund(1);
            request.off("end", inputEnded);
            request.off("close", inputEnded);
            response.off("close", inputEnded);
        };
        const releaseIfReady = () => {
            if (dispatched &&
                inputDone &&
                (!holdResponse ||
                    (responseDone && pendingCleanups === 0 && !cleanupFailed)))
                release();
        };
        const inputEnded = () => {
            inputDone = true;
            releaseIfReady();
        };
        return this.#trackExchange(async () => {
            if (request.socket.destroyed || response.destroyed) {
                release();
                return;
            }
            try {
                await this.target.serve(request, response, {
                    onBodyCleanup: (cleanup) => {
                        pendingCleanups += 1;
                        this.#trackBodyCleanup(cleanup, (succeeded) => {
                            pendingCleanups -= 1;
                            cleanupFailed ||= !succeeded;
                            releaseIfReady();
                        });
                    },
                    onDispatchSettled: ({ hasUnreadBody, admissionLifetime }) => {
                        dispatched = true;
                        holdResponse = admissionLifetime === "response";
                        if (!hasUnreadBody || request.destroyed || response.destroyed) {
                            inputEnded();
                            return;
                        }
                        request.once("end", inputEnded);
                        request.once("close", inputEnded);
                        response.once("close", inputEnded);
                    },
                });
            }
            catch (cause) {
                response.destroy();
                release();
                throw cause;
            }
            finally {
                responseDone = true;
                releaseIfReady();
            }
        });
    }
    #trackExchange(serve) {
        const exchange = Promise.resolve().then(serve);
        this.#exchanges.add(exchange);
        return exchange.finally(() => this.#exchanges.delete(exchange));
    }
    #trackBodyCleanup = (cleanup, settled) => {
        this.#bodyCleanups.add(cleanup);
        void cleanup.then(() => {
            this.#bodyCleanups.delete(cleanup);
            settled?.(true);
        }, (cause) => {
            this.#cleanupFailures.push(cause);
            this.#bodyCleanups.delete(cleanup);
            settled?.(false);
        });
    };
    async drain() {
        // An exchange can register cancellation after its route has returned,
        // including when a late Response finds that its client already left.
        while (this.#exchanges.size > 0)
            await Promise.allSettled(this.#exchanges);
        while (this.#bodyCleanups.size > 0)
            await Promise.allSettled(this.#bodyCleanups);
        if (this.#cleanupFailures.length > 0)
            // Unconfirmed cleanup is retained work, not a budget the caller can raise.
            throw new ProviderCleanupError("rea", [HTTP_RESPONSE_SOURCE], {
                reason: "HTTP response cleanup could not be confirmed; provider shutdown remains blocked",
                failed_cleanup_count: this.#cleanupFailures.length,
            }, {
                operation: "mcp_http_response_cleanup",
                cause: new AggregateError(this.#cleanupFailures, "Response cleanup failed"),
            });
    }
}
