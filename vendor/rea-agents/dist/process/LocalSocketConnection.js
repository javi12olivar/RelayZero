import { createConnection } from "node:net";
import { err, ok } from "../domain/result.js";
/** Open one local socket and hand it to the caller only after connection. */
export const connectLocalSocketOnce = (target, signal) => signal.aborted
    ? Promise.resolve(err({ kind: "cancelled", reason: signal.reason }))
    : new Promise((resolve) => {
        const socket = "path" in target
            ? createConnection(target.path)
            : createConnection({ host: target.host, port: target.port });
        const detach = () => {
            socket.off("connect", onConnect);
            socket.off("error", onError);
            signal.removeEventListener("abort", onAbort);
        };
        const onConnect = () => {
            detach();
            resolve(ok(socket));
        };
        const onError = (cause) => {
            detach();
            socket.destroy();
            resolve(err({ kind: "error", cause }));
        };
        const onAbort = () => {
            detach();
            socket.destroy();
            resolve(err({ kind: "cancelled", reason: signal.reason }));
        };
        socket.once("connect", onConnect);
        socket.once("error", onError);
        signal.addEventListener("abort", onAbort, { once: true });
        if (signal.aborted)
            onAbort();
    });
