import { MAX_NODE_TIMER_DELAY_MS } from "../domain/analysisResourceLimits.js";
import WebSocket, {} from "ws";
import { isUtf8 } from "node:buffer";
import { cancelledBy, carriedReason } from "../domain/analysisErrorCore.js";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { BrowserObservationError } from "../domain/browserObservationError.js";
import { CdpCommandRejection } from "./CdpCommandRejection.js";
import { admitCdpReply, assertCdpCommand, } from "./protocol/CdpCommands.js";
import { assertCdpEvent, registeredCdpEvent, } from "./protocol/CdpEvents.js";
import { cdpCleanupGraceExpired, cdpCommandDeadlineRecovery, cdpCommandTimeoutIsSelectable, cdpCommandTimeoutUnrelatedControl, DEFAULT_CDP_COMMAND_TIMEOUT_MS, noRuntimeOverrideSentence, } from "../domain/browserDeadline.js";
import { safeParseJson } from "../domain/safeJson.js";
import { WEB_RUNTIME_LIMITS } from "../domain/webRuntime.js";
import { isRecord } from "../kernel/isRecord.js";
// ws currently stores maxPayload as a signed 32-bit integer. Larger values can
// wrap to a negative number, which disables its limit check.
const MAX_WEBSOCKET_PAYLOAD_BYTES = 0x7fff_ffff;
/** Admit one event message: parse its payload once by its registered schema. */
export const receiveCdpEvent = ({ method, params, sessionId, }) => ({
    domain: method.split(".", 1)[0] ?? method,
    ...(sessionId === undefined ? {} : { sessionId }),
    registered: registeredCdpEvent(method, params),
});
class CdpTransportCore {
    socket;
    maxPayloadBytes;
    #pending = new Map();
    #listeners = new Set();
    #disconnectListeners = new Set();
    #protocolFailureListeners = new Set();
    #nextId = 1;
    #closed = false;
    #closePromise;
    /** The wire itself broke its protocol; no later message is trusted. */
    #protocolFailed = false;
    /**
     * A subscriber threw while handling an event. The wire is still sound, so
     * only cleanup-grace commands (owners restoring what they changed) may run.
     */
    #listenerFailed = false;
    /** What that subscriber threw; the protocol failure's cause. */
    #listenerFailure;
    #transportFailure = "disconnected";
    root;
    constructor(socket, maxPayloadBytes) {
        this.socket = socket;
        this.maxPayloadBytes = maxPayloadBytes;
        socket.on("message", (data) => this.#receive(data));
        socket.on("close", () => this.#disconnect());
        socket.on("error", (cause) => this.#disconnect(isRecord(cause) && cause.code === "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            ? "payload_limit"
            : "disconnected"));
    }
    isReusable() {
        return (!this.#closed &&
            this.#closePromise === undefined &&
            !this.#protocolFailed &&
            !this.#listenerFailed &&
            this.socket.readyState === WebSocket.OPEN);
    }
    onEvent(listener) {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }
    onDisconnect(operation, listener) {
        if (this.#closed) {
            listener(this.transportError(this.#transportFailure, operation));
            return () => undefined;
        }
        const wrapped = (reason) => {
            listener(this.transportError(reason, operation));
        };
        this.#disconnectListeners.add(wrapped);
        return () => this.#disconnectListeners.delete(wrapped);
    }
    onProtocolFailure(operation, listener) {
        if (this.#protocolFailed || this.#listenerFailed) {
            listener(this.transportError("protocol_error", operation));
            return () => undefined;
        }
        const wrapped = () => {
            listener(this.transportError("protocol_error", operation));
        };
        this.#protocolFailureListeners.add(wrapped);
        return () => this.#protocolFailureListeners.delete(wrapped);
    }
    reschedulePending(ids, timeoutMs) {
        for (const id of ids)
            this.#pending.get(id)?.reschedule(timeoutMs);
    }
    async send(method, params, sessionId, signal, context) {
        const { operation } = context;
        if (this.#protocolFailed ||
            (this.#listenerFailed && context.deadlineKind() !== "cleanup"))
            throw this.transportError("protocol_error", operation);
        if (this.#closed || this.socket.readyState !== WebSocket.OPEN)
            throw this.transportError(this.#transportFailure, operation);
        if (signal?.aborted === true)
            throw cancelledBy(operation, signal);
        const id = this.#nextId;
        this.#nextId += 1;
        const message = JSON.stringify({
            id,
            method,
            params,
            ...(sessionId === undefined ? {} : { sessionId }),
        });
        return await new Promise((resolve, reject) => {
            const onAbort = () => {
                const pending = this.#pending.get(id);
                if (pending === undefined)
                    return;
                this.#complete(id, pending);
                reject(cancelledBy(operation, carriedReason(signal?.reason)));
            };
            const failTimeout = () => {
                const pending = this.#pending.get(id);
                if (pending === undefined)
                    return;
                this.#complete(id, pending);
                if (context.deadlineKind() === "cleanup") {
                    const detail = cdpCleanupGraceExpired();
                    reject(new BrowserObservationError(operation, "timeout", {
                        detail,
                        remediationAction: detail,
                    }));
                    return;
                }
                const timeoutMs = context.commandTimeoutMs();
                const recovery = cdpCommandDeadlineRecovery(timeoutMs, "command", method, cdpCommandTimeoutIsSelectable(operation));
                reject(new BrowserObservationError(operation, "timeout", {
                    detail: recovery.userMessage,
                    remediationAction: recovery.remediationAction,
                    limit: recovery.limit,
                }));
            };
            let timer = setTimeout(failTimeout, context.commandTimeoutMs());
            signal?.addEventListener("abort", onAbort, { once: true });
            context.scopedIds.add(id);
            this.#pending.set(id, {
                method,
                operation,
                ...(sessionId === undefined ? {} : { sessionId }),
                resolve,
                reject,
                reschedule: (timeoutMs) => {
                    clearTimeout(timer);
                    timer = setTimeout(failTimeout, timeoutMs);
                },
                dispose: () => {
                    context.scopedIds.delete(id);
                    clearTimeout(timer);
                    signal?.removeEventListener("abort", onAbort);
                },
            });
            this.socket.send(message, (error) => {
                if (error === undefined || error === null)
                    return;
                const pending = this.#pending.get(id);
                if (pending === undefined)
                    return;
                this.#complete(id, pending);
                reject(new BrowserObservationError(operation, "disconnected", {
                    cause: error,
                }));
            });
        });
    }
    close(operation) {
        this.#closePromise ??= this.#closeTransport(operation).catch((cause) => {
            this.#closePromise = undefined;
            throw cause;
        });
        return this.#closePromise;
    }
    async #closeTransport(operation) {
        this.#disconnect("disconnected");
        if (socketIsClosed(this.socket))
            return;
        await new Promise((resolve, reject) => {
            let settled = false;
            let fallbackStarted = false;
            let fallbackTimer;
            const finish = (cause) => {
                if (settled)
                    return;
                settled = true;
                clearTimeout(timer);
                if (fallbackTimer !== undefined)
                    clearTimeout(fallbackTimer);
                this.socket.off("close", onClose);
                if (cause === undefined)
                    resolve();
                else
                    reject(cause);
            };
            const onClose = () => finish();
            const forceClose = (gracefulFailure) => {
                if (settled || fallbackStarted)
                    return;
                fallbackStarted = true;
                clearTimeout(timer);
                if (socketIsClosed(this.socket)) {
                    finish();
                    return;
                }
                try {
                    this.socket.terminate();
                }
                catch (cause) {
                    gracefulFailure =
                        gracefulFailure === undefined
                            ? cause
                            : new AggregateError([gracefulFailure, cause], "Graceful and forced CDP WebSocket close both failed.", { cause: gracefulFailure });
                }
                if (socketIsClosed(this.socket))
                    finish();
                else {
                    fallbackTimer = setTimeout(() => {
                        if (socketIsClosed(this.socket)) {
                            finish();
                            return;
                        }
                        finish(gracefulFailure ??
                            new BrowserObservationError(operation, "cleanup_failed", {
                                detail: "REA could not confirm release of its CDP WebSocket.",
                            }));
                    }, 1_000);
                }
            };
            const timer = setTimeout(() => forceClose(), 1_000);
            this.socket.once("close", onClose);
            try {
                this.socket.close();
            }
            catch (closeCause) {
                forceClose(closeCause);
            }
        });
    }
    #receive(data) {
        if (this.#closed || this.#protocolFailed)
            return;
        const bytes = rawBytes(data);
        // Binary WebSocket messages bypass ws's text-frame UTF-8 validation.
        // Never replacement-decode protocol facts into a different accepted value.
        if (!isUtf8(bytes)) {
            this.#failPending("protocol_error");
            return;
        }
        const parsed = safeParseJson(bytes.toString("utf8"));
        if (!parsed.ok) {
            this.#failPending("protocol_error");
            return;
        }
        const message = parsed.value;
        if (!isRecord(message)) {
            this.#failPending("protocol_error");
            return;
        }
        if ("id" in message) {
            if (typeof message.id !== "number" ||
                !Number.isSafeInteger(message.id) ||
                message.id < 1) {
                this.#failPending("protocol_error");
                return;
            }
            this.#receiveResponse(message, message.id);
            return;
        }
        if (typeof message.method !== "string" ||
            message.method.length === 0 ||
            ("params" in message && !isRecord(message.params)) ||
            ("sessionId" in message && typeof message.sessionId !== "string")) {
            this.#failPending("protocol_error");
            return;
        }
        const event = {
            ...receiveCdpEvent({
                method: message.method,
                params: "params" in message ? message.params : {},
                ...(typeof message.sessionId === "string"
                    ? { sessionId: message.sessionId }
                    : {}),
            }),
            wireBytes: bytes.byteLength,
        };
        if (this.#listenerFailed)
            return;
        for (const listener of this.#listeners) {
            try {
                listener(event);
            }
            catch (cause) {
                // A subscriber that cannot consume an event leaves its session's view
                // of the target incomplete. Fail the connection's sessions with that
                // cause instead of letting it escape the socket callback.
                this.#failListener(cause);
                return;
            }
        }
    }
    /**
     * Reject pending commands and notify protocol-failure subscribers, but keep
     * reading replies: owners still restore what they changed in cleanup grace.
     */
    #failListener(cause) {
        this.#listenerFailed = true;
        this.#listenerFailure = cause;
        for (const [id, pending] of this.#pending) {
            this.#complete(id, pending);
            pending.reject(this.transportError("protocol_error", pending.operation));
        }
        this.#notifyProtocolFailure();
    }
    #notifyProtocolFailure() {
        const listeners = [...this.#protocolFailureListeners];
        this.#protocolFailureListeners.clear();
        for (const listener of listeners)
            listener();
    }
    #receiveResponse(message, id) {
        const pending = this.#pending.get(id);
        if (pending === undefined)
            return;
        const hasResult = "result" in message;
        const hasError = "error" in message;
        // Chromium cannot route a rejection through a flat session after that
        // session disappears. Its browser-level reply omits sessionId, but the
        // connection-global command id still binds this exact terminal error.
        const detachedSessionError = pending.sessionId !== undefined &&
            !("sessionId" in message) &&
            hasError &&
            isRecord(message.error) &&
            message.error.code === -32_001 &&
            message.error.message === "Session with given id not found.";
        if ((pending.sessionId === undefined
            ? "sessionId" in message
            : message.sessionId !== pending.sessionId && !detachedSessionError) ||
            hasResult === hasError) {
            this.#failPending("protocol_error");
            return;
        }
        if (hasResult) {
            if (!isRecord(message.result)) {
                this.#failPending("protocol_error");
                return;
            }
            this.#complete(id, pending);
            pending.resolve(message.result);
            return;
        }
        const reported = message.error;
        if (!isRecord(reported) ||
            typeof reported.code !== "number" ||
            !Number.isSafeInteger(reported.code) ||
            typeof reported.message !== "string") {
            this.#failPending("protocol_error");
            return;
        }
        this.#complete(id, pending);
        pending.reject(new CdpCommandRejection(pending.operation, pending.method, reported.code, reported.message));
    }
    #complete(id, pending) {
        pending.dispose();
        this.#pending.delete(id);
    }
    #failPending(reason) {
        if (reason !== "protocol_error")
            this.#closed = true;
        else
            this.#protocolFailed = true;
        for (const [id, pending] of this.#pending) {
            this.#complete(id, pending);
            pending.reject(this.transportError(reason, pending.operation));
        }
        if (reason === "protocol_error")
            this.#notifyProtocolFailure();
    }
    #disconnect(reason = "disconnected") {
        const wasClosed = this.#closed;
        if (!wasClosed)
            this.#transportFailure = reason;
        this.#failPending(reason);
        if (wasClosed)
            return;
        for (const listener of this.#disconnectListeners)
            listener(reason);
        this.#disconnectListeners.clear();
    }
    transportError(reason, operation) {
        if (reason === "payload_limit")
            return new BrowserObservationError(operation, reason, {
                detail: noRuntimeOverrideSentence(`CDP message exceeded the ${String(this.maxPayloadBytes)} byte protocol budget.`, cdpCommandTimeoutUnrelatedControl(operation)),
            });
        return new BrowserObservationError(operation, reason, reason === "protocol_error" && this.#listenerFailed
            ? { cause: this.#listenerFailure }
            : undefined);
    }
}
/** Correlated JSON-RPC transport for one CDP target operation. */
export class CdpConnection {
    core;
    operation;
    #scopedPendingIds = new Set();
    #commandTimeoutMs;
    #deadlineKind = "command";
    constructor(core, operation, commandTimeoutMs) {
        this.core = core;
        this.operation = operation;
        this.#commandTimeoutMs = commandTimeoutMs;
    }
    /** Canonical connection identity registered with `CdpTargetSessionOwner`. */
    get transportRoot() {
        return this.core.root;
    }
    /** True while the underlying WebSocket remains open, unpoisoned, and outside cleanup grace. */
    isReusable() {
        return this.#deadlineKind === "command" && this.core.isReusable();
    }
    /** Bind an isolated operation and command-deadline view over this shared WebSocket. */
    withOperation(operation, commandTimeoutMs) {
        return new CdpConnection(this.core, operation, commandTimeoutMs);
    }
    /** Connect to one already-validated loopback CDP WebSocket. */
    static async connect(url, operation, signal, limits, onConnected) {
        if (signal?.aborted === true)
            throw cancelledBy(operation, signal);
        const maxPayloadBytes = limits?.maxPayloadBytes ?? WEB_RUNTIME_LIMITS.protocolBytes;
        const commandTimeoutMs = limits?.commandTimeoutMs ?? DEFAULT_CDP_COMMAND_TIMEOUT_MS;
        const handshakeTimeoutMs = limits?.handshakeTimeoutMs ?? commandTimeoutMs;
        if (!Number.isSafeInteger(maxPayloadBytes) ||
            maxPayloadBytes <= 0 ||
            maxPayloadBytes > MAX_WEBSOCKET_PAYLOAD_BYTES)
            throw new RangeError(`CDP maxPayloadBytes must be a positive safe integer no greater than ${String(MAX_WEBSOCKET_PAYLOAD_BYTES)}.`);
        const socket = new WebSocket(url, {
            // waitForOpen owns the deadline and typed handshake failures; the
            // connection owner registers this socket before waiting for open.
            handshakeTimeout: 0,
            maxPayload: maxPayloadBytes,
            perMessageDeflate: false,
        });
        const core = new CdpTransportCore(socket, maxPayloadBytes);
        const connection = new CdpConnection(core, operation, commandTimeoutMs);
        core.root = connection;
        try {
            onConnected?.(connection);
        }
        catch (cause) {
            await connection.close();
            throw cause;
        }
        try {
            await waitForOpen(socket, operation, signal, handshakeTimeoutMs);
        }
        catch (cause) {
            if (onConnected === undefined) {
                try {
                    await connection.close();
                }
                catch (cleanupCause) {
                    throw new AggregateError([cause, cleanupCause], "CDP WebSocket handshake failed and its transport cleanup is incomplete.", { cause });
                }
            }
            throw cause;
        }
        return connection;
    }
    /** Subscribe to validated CDP event envelopes. */
    onEvent(listener) {
        return this.core.onEvent(listener);
    }
    /**
     * Subscribe to one registered event. An unregistered name is refused here,
     * before subscribing, because no event of that name could reach the
     * listener: JavaScript verifiers name events the compiler cannot check.
     */
    onRegisteredEvent(method, listener) {
        assertCdpEvent(method, this.operation);
        return this.core.onEvent((event) => {
            if (event.registered?.method === method)
                listener(event.registered, event);
        });
    }
    /** Subscribe to an unexpected transport loss while an operation is active. */
    onDisconnect(listener) {
        return this.core.onDisconnect(this.operation, listener);
    }
    /** Notify fatal wire parsing failure even when no command is outstanding. */
    onProtocolFailure(listener) {
        return this.core.onProtocolFailure(this.operation, listener);
    }
    /** Apply the post-discovery command deadline to commands that have not started. */
    selectCommandTimeout(timeoutMs) {
        if (this.#deadlineKind === "cleanup")
            return;
        this.#commandTimeoutMs = timeoutMs;
    }
    /**
     * Restoration uses the fixed cleanup grace. Commands already waiting are
     * rescheduled from now so a raised command deadline cannot extend them.
     */
    beginCleanupGrace(timeoutMs) {
        this.#deadlineKind = "cleanup";
        this.#commandTimeoutMs = timeoutMs;
        this.core.reschedulePending(this.#scopedPendingIds, timeoutMs);
    }
    /**
     * Bound each response separately from the caller-selected observation
     * window. A registered command's reply is parsed by its result schema; a
     * mismatch rejects that command with `CdpMalformedReply`.
     */
    async send(method, params, sessionId, signal) {
        assertCdpCommand(method, this.operation);
        const reply = await this.core.send(method, params ?? {}, sessionId, signal, {
            operation: this.operation,
            commandTimeoutMs: () => this.#commandTimeoutMs,
            deadlineKind: () => this.#deadlineKind,
            scopedIds: this.#scopedPendingIds,
        });
        return admitCdpReply(method, reply, this.operation);
    }
    /** Close only REA's socket; never close the browser or selected page. */
    close() {
        return this.core.close(this.operation);
    }
}
const socketIsClosed = (socket) => socket.readyState === WebSocket.CLOSED;
const rawBytes = (data) => Array.isArray(data)
    ? Buffer.concat(data)
    : Buffer.isBuffer(data)
        ? data
        : Buffer.from(data);
const waitForOpen = async (socket, operation, signal, handshakeTimeoutMs) => await new Promise((resolve, reject) => {
    const onOpen = () => {
        cleanup();
        resolve();
    };
    const onFailure = (cause) => {
        cleanup();
        reject(new BrowserObservationError(operation, "endpoint_unreachable", {
            cause,
        }));
    };
    const onClose = (code, reason) => {
        onFailure(new Error(`CDP WebSocket closed before opening (${code}: ${reason.toString("utf8")})`));
    };
    const onAbort = () => {
        cleanup();
        terminateSocket(socket);
        reject(cancelledBy(operation, carriedReason(signal?.reason)));
    };
    const cleanup = () => {
        clearTimeout(timer);
        socket.off("open", onOpen);
        socket.off("error", onFailure);
        socket.off("close", onClose);
        signal?.removeEventListener("abort", onAbort);
    };
    const boundedTimeoutMs = Math.min(MAX_NODE_TIMER_DELAY_MS, handshakeTimeoutMs);
    const timer = setTimeout(() => {
        terminateSocket(socket);
        cleanup();
        const recovery = cdpCommandDeadlineRecovery(boundedTimeoutMs, "handshake", undefined, cdpCommandTimeoutIsSelectable(operation));
        reject(new BrowserObservationError(operation, "timeout", {
            detail: recovery.userMessage,
            remediationAction: recovery.remediationAction,
            limit: recovery.limit,
        }));
    }, boundedTimeoutMs);
    socket.once("open", onOpen);
    socket.once("error", onFailure);
    socket.once("close", onClose);
    signal?.addEventListener("abort", onAbort, { once: true });
    if (signal?.aborted === true)
        onAbort();
});
const terminateSocket = (socket) => {
    try {
        socket.terminate();
    }
    catch {
        // The owning connection remains registered and will retry bounded close.
    }
};
