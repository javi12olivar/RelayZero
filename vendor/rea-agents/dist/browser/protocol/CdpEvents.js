import { z } from "zod";
import { BrowserObservationError } from "../../domain/browserObservationError.js";
import { err, ok } from "../../domain/result.js";
import { observeCdpFrameUrl, } from "../CdpCaptureDocuments.js";
import { topCallFrame } from "../CdpCaptureEventHelpers.js";
import { admitRecords, cdpStringValue, numberValue, recordValue, } from "../CdpCaptureValues.js";
import { cdpFrameEventPayloadFacts, } from "../CdpFrameIdentity.js";
import { readCdpLoadingFailed, readCdpLoadingFinished, readCdpRequestWillBeSent, readCdpResponseReceived, readCdpWebSocketCreated, readCdpWebSocketFrame, runtimeRequestSchema, } from "../CdpNetworkEventFacts.js";
import { readCdpExecutionContextCreated, readCdpExecutionContextDestroyed, readCdpScriptParsed, runtimeContextSchema, runtimeScriptParsedSchema, } from "../CdpScriptContextFacts.js";
const frameEvent = (kind) => z.unknown().transform((params) => {
    const record = recordValue(params);
    const urlSource = kind === "navigated"
        ? recordValue(record?.frame)
        : kind === "within_document" || kind === "requested"
            ? record
            : undefined;
    return {
        facts: cdpFrameEventPayloadFacts(kind, params),
        url: observeCdpFrameUrl(urlSource),
        reason: kind === "requested" ? cdpStringValue(record?.reason) : undefined,
        transitionType: kind === "navigated"
            ? cdpStringValue(recordValue(record?.frame)?.transitionType)
            : undefined,
    };
});
/**
 * UTF-8 JSON size of a declaration as the producer sent it, for retention
 * budgets. Serialization can fail on input that parsed (for example, nesting
 * deeper than the serializer's stack); that failure is a fact for the budget
 * owner to report, never an exception in the connection's event callback.
 */
const declarationBytes = (params) => {
    try {
        return ok(Buffer.byteLength(JSON.stringify(params) ?? ""));
    }
    catch (cause) {
        return err(cause);
    }
};
/**
 * A script declaration has two admission policies: passive capture keeps
 * tolerant facts and records gaps, while the active runtime requires the
 * complete declaration. Both are derived here, once.
 */
const scriptEvent = z.unknown().transform((params) => ({
    facts: readCdpScriptParsed(params),
    runtime: runtimeScriptParsedSchema.safeParse(params),
    declarationBytes: declarationBytes(params),
}));
const executionContextCreated = z.unknown().transform((params) => ({
    facts: readCdpExecutionContextCreated(params),
    runtime: runtimeContextSchema.safeParse(params),
    declarationBytes: declarationBytes(params),
}));
/**
 * The console call site, argument inventory, timestamp and type. A malformed
 * stack stays a failure; malformed arguments keep their positions so
 * retained siblings keep their CDP argument indices.
 */
const consoleApiCalled = z.unknown().transform((params) => {
    const record = recordValue(params);
    return {
        topFrame: topCallFrame(record?.stackTrace),
        arguments: admitRecords(record?.args)?.map((argument) => recordValue(argument)),
        timestamp: numberValue(record?.timestamp),
        type: cdpStringValue(record?.type),
    };
});
/** Passive capture and the timeline read tolerant facts; the active runtime requires the declaration. */
const requestWillBeSent = z.unknown().transform((params) => ({
    facts: readCdpRequestWillBeSent(params),
    runtime: runtimeRequestSchema.safeParse(params),
}));
/** The flat session a target event names; undefined when missing or malformed. */
const targetDetached = z.unknown().transform((params) => ({
    sessionId: cdpStringValue(recordValue(params)?.sessionId),
}));
const targetAttached = z.unknown().transform((params) => {
    const record = recordValue(params);
    const targetInfo = recordValue(record?.targetInfo);
    return {
        sessionId: cdpStringValue(record?.sessionId),
        targetId: cdpStringValue(targetInfo?.targetId),
        targetType: cdpStringValue(targetInfo?.type),
    };
});
/** A non-flat child session's protocol message, still JSON text. */
const targetMessage = z.unknown().transform((params) => {
    const record = recordValue(params);
    return {
        sessionId: cdpStringValue(record?.sessionId),
        message: cdpStringValue(record?.message),
    };
});
/**
 * A pause's call frames. Resuming is target-wide, so a consumer that resumes
 * needs every frame's identity; the declaration is kept as one parse result.
 */
const debuggerPaused = z.unknown().transform((params) => z
    .object({
    callFrames: z.array(z.object({
        callFrameId: z.string(),
        location: z.object({ scriptId: z.string() }),
    })),
})
    .safeParse(params));
/** A frame lifecycle milestone; the timeline decides frame selection and time policy. */
const lifecycleEvent = z.unknown().transform((params) => {
    const record = recordValue(params);
    return {
        frameId: cdpStringValue(record?.frameId),
        loaderId: cdpStringValue(record?.loaderId),
        name: cdpStringValue(record?.name),
        timestamp: numberValue(record?.timestamp),
    };
});
/**
 * Declared WebMCP tools. A missing or non-list inventory is undefined, never
 * empty; malformed entries keep their positions as undefined.
 */
const webMcpTools = z.unknown().transform((params) => ({
    tools: admitRecords(recordValue(params)?.tools)?.map((tool) => recordValue(tool)),
}));
/**
 * One payload schema per subscribed event. The connection parses each
 * registered event once, before any subscriber sees it. A schema never
 * rejects: malformed members become explicit facts that each subscriber
 * reports as a protocol failure or a recorded coverage gap.
 */
const CDP_EVENT_PAYLOADS = {
    "Page.frameAttached": frameEvent("attached"),
    "Page.frameDetached": frameEvent("detached"),
    "Page.frameNavigated": frameEvent("navigated"),
    "Page.frameRequestedNavigation": frameEvent("requested"),
    "Page.navigatedWithinDocument": frameEvent("within_document"),
    "Debugger.scriptParsed": scriptEvent,
    "Debugger.scriptFailedToParse": scriptEvent,
    "Runtime.executionContextCreated": executionContextCreated,
    "Runtime.executionContextDestroyed": z
        .unknown()
        .transform(readCdpExecutionContextDestroyed),
    "Runtime.consoleAPICalled": consoleApiCalled,
    "Runtime.executionContextsCleared": z.unknown().transform(() => ({})),
    "Inspector.targetCrashed": z.unknown().transform(() => ({})),
    "Debugger.paused": debuggerPaused,
    "Target.receivedMessageFromTarget": targetMessage,
    "Network.requestWillBeSent": requestWillBeSent,
    "Network.responseReceived": z.unknown().transform(readCdpResponseReceived),
    "Network.loadingFinished": z.unknown().transform(readCdpLoadingFinished),
    "Network.loadingFailed": z.unknown().transform(readCdpLoadingFailed),
    "Network.webSocketCreated": z.unknown().transform(readCdpWebSocketCreated),
    "Network.webSocketFrameSent": z.unknown().transform(readCdpWebSocketFrame),
    "Target.attachedToTarget": targetAttached,
    "Target.detachedFromTarget": targetDetached,
    "Page.lifecycleEvent": lifecycleEvent,
    "WebMCP.toolsAdded": webMcpTools,
    "WebMCP.toolsRemoved": webMcpTools,
    "Network.webSocketFrameReceived": z
        .unknown()
        .transform(readCdpWebSocketFrame),
};
/** Whether a payload schema is registered for this event name. */
export const isCdpEvent = (method) => Object.hasOwn(CDP_EVENT_PAYLOADS, method);
/**
 * Refuse a subscription to an event without a registered payload schema: no
 * event of that name could reach the listener. TypeScript callers cannot name
 * one; JavaScript verifiers can.
 */
export function assertCdpEvent(method, operation) {
    if (!isCdpEvent(method))
        throw new BrowserObservationError(operation, "protocol_error", {
            detail: `REA refused to subscribe to CDP event ${JSON.stringify(method)}: no payload schema is registered for it.`,
        });
}
/** Parse one event's payload by its registered schema, or undefined when unregistered. */
export const registeredCdpEvent = (method, params) => {
    if (!isCdpEvent(method))
        return undefined;
    const schema = CDP_EVENT_PAYLOADS[method];
    return {
        method,
        payload: schema.parse(params),
    };
};
const FRAME_EVENTS = [
    "Page.frameAttached",
    "Page.frameDetached",
    "Page.frameNavigated",
    "Page.frameRequestedNavigation",
    "Page.navigatedWithinDocument",
];
const FRAME_EVENT_NAMES = new Set(FRAME_EVENTS);
const isFrameEvent = (event) => FRAME_EVENT_NAMES.has(event.method);
/** The parsed frame lifecycle payload of a registered frame event. */
export const cdpFrameEvent = (event) => event.registered !== undefined && isFrameEvent(event.registered)
    ? event.registered.payload
    : undefined;
