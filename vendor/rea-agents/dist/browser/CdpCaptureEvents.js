import { CdpCaptureCompleteness } from "./CdpCaptureCompleteness.js";
import * as bodyShapes from "./CdpCaptureEventBodyShapes.js";
import * as handlers from "./CdpCaptureEventHandlers.js";
import { isJsonMediaType } from "./CdpCaptureEventHelpers.js";
/** Event accumulator that validates and normalizes payloads at ingestion. */
export class CdpCaptureEvents {
    #coverageStarts = new Map();
    #scriptMetadataBudgetExclusionsRecorded = false;
    #networkRequestOccurrences = new Map();
    #responseBodyExaminedOccurrences = new Map();
    scripts = new Map();
    scriptMetadataBudgetOmissionsById = new Map();
    rejectedScriptMetadataBudgetCount = 0;
    rejectedSourceMapMetadataBudgetCount = 0;
    scriptMetadataBytesById = new Map();
    retainedScriptMetadataBytes = 0;
    retainedEventBytes = 0;
    bodyShapeBytesByRequestId = new Map();
    executionContextFrames = new Map();
    network = new Map();
    networkRequestTimestamps = new Map();
    malformedRedirectRequestIds = new Set();
    missingRequestBodyShapeIds = new Set();
    webSocketConnectionsById = new Map();
    console = [];
    responseMetadata = [];
    agentHints = [];
    completeness = new CdpCaptureCompleteness([
        "network_requests",
        "console_events",
        "websocket_connections",
        "websocket_frames",
        "metadata",
    ]);
    originViolation = false;
    unknownRootIdentity = false;
    document = undefined;
    input;
    allowedOrigins;
    constructor(input, allowedOrigins) {
        this.input = input;
        this.allowedOrigins = allowedOrigins;
    }
    /**
     * Start capture for the authorized document. Root navigations reach the
     * capture through the target session's document owner, not as raw events.
     */
    beginAuthorizedFrame(document) {
        this.document?.close();
        this.document = document;
        document.onNavigation((navigation) => handlers.handleRootNavigation(this, navigation));
        this.#coverageStarts.clear();
        this.originViolation = false;
        this.unknownRootIdentity = false;
        this.scripts.clear();
        this.scriptMetadataBudgetOmissionsById.clear();
        this.rejectedScriptMetadataBudgetCount = 0;
        this.rejectedSourceMapMetadataBudgetCount = 0;
        this.scriptMetadataBytesById.clear();
        this.retainedScriptMetadataBytes = 0;
        this.retainedEventBytes = 0;
        this.bodyShapeBytesByRequestId.clear();
        this.#scriptMetadataBudgetExclusionsRecorded = false;
        this.executionContextFrames.clear();
        this.network.clear();
        this.networkRequestTimestamps.clear();
        this.#networkRequestOccurrences.clear();
        this.#responseBodyExaminedOccurrences.clear();
        this.malformedRedirectRequestIds.clear();
        this.missingRequestBodyShapeIds.clear();
        this.webSocketConnectionsById.clear();
        this.console.length = 0;
        this.responseMetadata.length = 0;
        this.agentHints.length = 0;
        this.completeness.reset();
        if (!this.input.include_console_text)
            this.completeness.exclude("console_text", "not_approved", null);
        if (!this.input.include_json_body_shapes)
            this.completeness.exclude("json_body_shapes", "not_approved", null);
        if (!this.input.include_websocket_shapes)
            this.completeness.exclude("websocket_shapes", "not_approved", null);
    }
    /** The first observed domain event or successful enable reply proves activity. */
    markDomainEnabled(domain) {
        if (!this.#coverageStarts.has(domain))
            this.#coverageStarts.set(domain, new Date().toISOString());
    }
    coverageStartedAt(domain) {
        const started = this.#coverageStarts.get(domain);
        if (started === undefined)
            throw new Error(`${domain} observation has not been enabled`);
        return started;
    }
    /** Record final script metadata omissions after all scriptParsed replacements. */
    recordScriptMetadataBudgetExclusions() {
        if (this.#scriptMetadataBudgetExclusionsRecorded)
            return;
        this.#scriptMetadataBudgetExclusionsRecorded = true;
        const omittedScripts = this.rejectedScriptMetadataBudgetCount;
        const omittedSourceMaps = this.rejectedSourceMapMetadataBudgetCount +
            this.scriptMetadataBudgetOmissionsById.size;
        if (omittedScripts > 0)
            this.completeness.exclude("scripts", "resource_budget_exhausted", omittedScripts);
        if (omittedSourceMaps > 0)
            this.completeness.exclude("source_maps", "resource_budget_exhausted", omittedSourceMaps);
    }
    ingest(event) {
        if (this.document !== undefined) {
            if (event.domain === "Network" || event.domain === "Runtime")
                this.markDomainEnabled(event.domain);
        }
        const registered = event.registered;
        switch (registered?.method) {
            case "Runtime.executionContextCreated":
                handlers.handleExecutionContextCreated(this, registered.payload.facts);
                return;
            case "Runtime.executionContextDestroyed":
                handlers.handleExecutionContextDestroyed(this, registered.payload);
                return;
            case "Debugger.scriptParsed":
                handlers.handleScriptParsed(this, registered.payload.facts);
                return;
            case "Runtime.consoleAPICalled":
                handlers.handleConsoleAPICalled(this, registered.payload);
                return;
            case "Network.requestWillBeSent": {
                const facts = registered.payload.facts;
                const requestId = facts.requestId;
                const previous = requestId === null ? undefined : this.network.get(requestId);
                handlers.handleRequestWillBeSent(this, facts);
                if (requestId !== null && this.network.get(requestId) !== previous)
                    this.#networkRequestOccurrences.set(requestId, (this.#networkRequestOccurrences.get(requestId) ?? 0) + 1);
                return;
            }
            case "Network.responseReceived":
                handlers.handleResponseReceived(this, registered.payload);
                return;
            case "Network.loadingFinished":
                handlers.handleLoadingFinished(this, registered.payload);
                return;
            case "Network.webSocketCreated":
                handlers.handleWebSocketCreated(this, registered.payload);
                return;
            case "Network.webSocketFrameSent":
                handlers.handleWebSocketFrame(this, registered.payload, "sent");
                return;
            case "Network.webSocketFrameReceived":
                handlers.handleWebSocketFrame(this, registered.payload, "received");
                return;
            case "Runtime.executionContextsCleared":
                this.executionContextFrames.clear();
                return;
            default:
                return;
        }
    }
    /** Resolve a transient execution context to one already authorized frame. */
    frameForScript(script, allowedFrameIds) {
        return script.frameId !== null && allowedFrameIds.has(script.frameId)
            ? script.frameId
            : null;
    }
    responseBodyRequests() {
        if (!this.input.include_json_body_shapes)
            return [];
        return [...this.network.values()]
            .filter((request) => !this.malformedRedirectRequestIds.has(request.request_id))
            .filter((request) => isJsonMediaType(request.mime_type))
            .flatMap((request) => {
            const occurrence = this.#networkRequestOccurrences.get(request.request_id);
            return occurrence === undefined
                ? []
                : [{ requestId: request.request_id, occurrence }];
        });
    }
    currentResponseBodyRequest(candidate) {
        if (candidate.occurrence !==
            this.#networkRequestOccurrences.get(candidate.requestId))
            return undefined;
        return this.network.get(candidate.requestId);
    }
    responseBodyUnavailable(candidate) {
        if (this.currentResponseBodyRequest(candidate) === undefined)
            return;
        this.#responseBodyExaminedOccurrences.set(candidate.requestId, candidate.occurrence);
        if (this.malformedRedirectRequestIds.has(candidate.requestId))
            return;
        bodyShapes.updateResponseBodyShape(this, candidate.requestId, null);
        this.completeness.unavailable("json_body_shapes");
    }
    /**
     * Mark eligible response bodies that arrived after the fetch pass was
     * enumerated.
     */
    settleUnexaminedResponseBodies() {
        for (const candidate of this.responseBodyRequests()) {
            const request = this.currentResponseBodyRequest(candidate);
            if (request?.body_shapes.response === null &&
                this.#responseBodyExaminedOccurrences.get(candidate.requestId) !==
                    candidate.occurrence)
                this.responseBodyUnavailable(candidate);
        }
    }
    /** `"malformed"` records the body shape as an invalid protocol value. */
    ingestResponseBody(candidate, reply) {
        if (this.currentResponseBodyRequest(candidate) === undefined)
            return;
        this.#responseBodyExaminedOccurrences.set(candidate.requestId, candidate.occurrence);
        if (this.malformedRedirectRequestIds.has(candidate.requestId))
            return;
        bodyShapes.ingestResponseBodyShape(this, candidate.requestId, reply);
    }
}
