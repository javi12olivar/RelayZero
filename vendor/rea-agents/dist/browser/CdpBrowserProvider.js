import { DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE, } from "../domain/javascript/javascriptSemanticWorkAllowance.js";
import { sanitizeBrowserUrl, } from "../domain/browserObservation.js";
import { browserTargetListSchema, webPageInspectionSchema, } from "../domain/browserObservationSchemas.js";
import { IsolatedWebBundleAnalyzer, } from "./IsolatedWebBundleAnalyzer.js";
import { sourceMapsWithCaptureExclusions } from "../domain/webSourceMapCoverage.js";
import { webObservationSessionSchema, } from "../domain/browserSession.js";
import { webMcpDiscoverySchema, } from "../domain/webMcpDiscovery.js";
import { browserCaptureComparisonSchema, compareBrowserCaptures, } from "../domain/browserCaptureComparison.js";
import { webScreenshotDiffSchema, webScreenshotSchema, } from "../domain/webScreenshot.js";
import { AnalysisError, } from "../domain/analysisErrorBase.js";
import { analysisErrorWithCleanupFailure, providerCleanupErrorFromFailures, } from "../domain/analysisErrorCleanup.js";
import { AnalysisInputError, cancelledBy, carriedReason, } from "../domain/analysisErrorCore.js";
import { BrowserObservationError } from "../domain/browserObservationError.js";
import { ProviderAdapterError } from "../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { err, ok } from "../domain/result.js";
import { hasCdpTargetWebSocket, } from "./CdpEndpoint.js";
import { attachCdpTargetSession, closeCdpTargetSession, openCdpEndpoint, openCdpTargetSession, } from "./CdpTargetSession.js";
import { capturePage } from "./CdpPageCapture.js";
import { selectedCdpCommandTimeoutMs, selectedCdpDiscoveryTimeoutMs, } from "../domain/browserDeadline.js";
import { fetchWebSourceMaps } from "./WebSourceMapFetcher.js";
import { authorizeCdpTarget } from "./CdpAuthorizedTarget.js";
import { observeCdpSession } from "./CdpObservationSession.js";
import { discoverWebMcp } from "./CdpWebMcpDiscovery.js";
import { captureCdpScreenshot } from "./CdpScreenshot.js";
import { comparePngScreenshots } from "../domain/pngVisualDiff.js";
import { CDP_BROWSER_PROVIDER_IDENTITY } from "./providerIdentities.js";
import { compareUnicodeCodePoints } from "../domain/unicodeCodePointOrder.js";
import { CdpTargetSessionOwner, bindCdpTransportCleanup, } from "./CdpTargetSessionOwner.js";
import { errorMessage } from "../kernel/errorMessage.js";
const CLEANUP_DOMAINS = [
    "Network",
    "Debugger",
    "Runtime",
    "Page",
    "WebMCP",
];
/** Passive browser observation through a selected user-owned CDP endpoint. */
export class CdpBrowserProvider {
    #owner = new CdpTargetSessionOwner();
    #bundleAnalyzer;
    #activeOperations = 0;
    #closing = false;
    #closePromise;
    #idleWaiters = new Set();
    #memberMutationAllowance;
    /**
     * `memberMutationAllowance` resolves the accepted operation's allowance at
     * each bundle analysis; the default applies when the host selects none.
     */
    constructor(admission, memberMutationAllowance = () => ok(DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE)) {
        this.#bundleAnalyzer = new IsolatedWebBundleAnalyzer(undefined, admission);
        this.#memberMutationAllowance = memberMutationAllowance;
    }
    async close() {
        this.#closing = true;
        this.#closePromise ??= this.#closeResources().catch((cause) => {
            this.#closePromise = undefined;
            throw cause;
        });
        return await this.#closePromise;
    }
    async #closeResources() {
        const outcomes = await Promise.allSettled([
            this.#closeTransports(),
            this.#bundleAnalyzer.close(),
        ]);
        const failures = outcomes.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
        if (failures.length === 1)
            throw failures[0];
        if (failures.length > 1) {
            const typed = failures.filter((failure) => failure instanceof AnalysisError);
            throw providerCleanupErrorFromFailures(CDP_BROWSER_PROVIDER_IDENTITY.id, typed, "Browser transport and analyzer cleanup remain incomplete", { operation: "analyze_web_bundle", causes: failures });
        }
    }
    async #closeTransports() {
        while (this.#activeOperations > 0)
            await new Promise((resolve) => this.#idleWaiters.add(resolve));
        await this.#owner.close();
    }
    async #withAdmission(operation, work) {
        if (this.#closing)
            return err(new ProviderAdapterError(CDP_BROWSER_PROVIDER_IDENTITY.id, operation, {
                diagnostics: { reason: "provider_closed" },
                userMessage: "Browser provider is closed to new observations.",
            }));
        this.#activeOperations += 1;
        try {
            return await work();
        }
        finally {
            this.#activeOperations -= 1;
            if (this.#activeOperations === 0) {
                for (const resolve of this.#idleWaiters)
                    resolve();
                this.#idleWaiters.clear();
            }
        }
    }
    identity() {
        return CDP_BROWSER_PROVIDER_IDENTITY;
    }
    async listTargets(input, options = {}) {
        return await this.#withAdmission("list_browser_targets", () => this.#listTargets(input, options));
    }
    async #listTargets(input, options) {
        try {
            const endpoint = await openCdpEndpoint(input.cdp_endpoint, "list_browser_targets", options.signal, selectedCdpDiscoveryTimeoutMs(input.discovery_timeout_ms), this.#owner, undefined, { reuseBrowserSocket: true });
            if (endpoint.connection !== undefined) {
                if (endpoint.reusableBrowserSocket === true)
                    await this.#owner.releaseBrowserSocket(endpoint.connection);
                else
                    await this.#owner.finish(endpoint.connection);
            }
            const { discovery } = endpoint;
            const selected = selectTargets(discovery, input.allowed_origins.length === 0
                ? undefined
                : new Set(input.allowed_origins));
            return ok(browserTargetListSchema.parse({
                browser: discovery.version,
                targets: selected.allowed,
                excluded: selected.excluded,
                limitations: [
                    ...(discovery.limitations ?? []),
                    input.allowed_origins.length === 0
                        ? "All page targets with supported HTTP(S) URLs and a validated CDP transport are listed."
                        : "Only page targets with a validated CDP transport whose current URL matches an explicitly requested exact origin are listed.",
                    ...(selected.unconnectable === 0
                        ? []
                        : [
                            `${String(selected.unconnectable)} otherwise allowed page target(s) lacked a validated direct CDP WebSocket and were excluded.`,
                        ]),
                    ...(selected.allowed.some((target) => target.attached === null)
                        ? [
                            "CDP discovery could not establish debugger attachment state for one or more targets.",
                        ]
                        : []),
                ],
            }));
        }
        catch (cause) {
            return err(providerError(cause, "list_browser_targets", options.signal));
        }
    }
    async inspectPage(input, options = {}) {
        return await this.#withAdmission("inspect_web_page", () => this.#inspectPage(input, options));
    }
    async #inspectPage(input, options) {
        try {
            const captured = await this.#capture(input, options, "inspect_web_page");
            return ok(webPageInspectionSchema.parse(captured.inspection));
        }
        catch (cause) {
            return err(providerError(cause, "inspect_web_page", options.signal));
        }
    }
    async analyzeBundle(input, options = {}) {
        return await this.#withAdmission("analyze_web_bundle", () => this.#analyzeBundle(input, options));
    }
    async #analyzeBundle(input, options) {
        // An invalid setting is refused before capture, never replaced by the default.
        const memberMutationAllowance = this.#memberMutationAllowance();
        if (!memberMutationAllowance.ok)
            return memberMutationAllowance;
        const admission = await this.#bundleAnalyzer.reserve();
        if (!admission.ok)
            return admission;
        let captured;
        try {
            captured = await this.#capture(input, options, "analyze_web_bundle");
            let sourceMaps;
            if (input.fetch_source_maps) {
                const fetched = await fetchWebSourceMaps(captured.sourceMapRequests, {
                    ...input,
                    allowed_origins: input.allowed_origins.length > 0
                        ? input.allowed_origins
                        : [captured.inspection.target.origin],
                }, options.signal);
                if (!fetched.ok) {
                    const partial = fetched.error.partialObservation;
                    if (partial !== undefined &&
                        "kind" in partial &&
                        partial.kind === "web-source-map-fetch")
                        fetched.error.partialObservation = {
                            kind: "web-bundle-acquisition",
                            inspection: captured.inspection,
                            source_maps: sourceMapsWithCaptureExclusions(partial.source_maps, captured.inspection.completeness.excluded),
                            analysis_status: "not_performed",
                        };
                    else
                        fetched.error.retainPartialObservation(captured.inspection);
                    return err(fetched.error);
                }
                sourceMaps = sourceMapsWithCaptureExclusions(fetched.value, captured.inspection.completeness.excluded);
            }
            return await this.#bundleAnalyzer.analyze(captured.inspection, sourceMaps ?? {
                status: "not_requested",
                requested: 0,
                processed: 0,
                items: [],
            }, input, options.signal, memberMutationAllowance.value);
        }
        catch (cause) {
            // Capture and analyzer work can still throw the exact caller reason.
            if (options.signal?.aborted === true && cause === options.signal.reason) {
                return err(cancelledBy("analyze_web_bundle", carriedReason(cause), captured === undefined
                    ? {}
                    : { partialObservation: captured.inspection }));
            }
            return err(providerError(cause, "analyze_web_bundle", options.signal));
        }
        finally {
            this.#bundleAnalyzer.releaseReservation();
        }
    }
    async observeSession(input, options = {}) {
        return await this.#withAdmission("observe_web_session", () => this.#observeSession(input, options));
    }
    async #observeSession(input, options) {
        try {
            return ok(webObservationSessionSchema.parse(await withTargetSession(input, "observe_web_session", options, observeCdpSession, this.#owner)));
        }
        catch (cause) {
            return err(providerError(cause, "observe_web_session", options.signal));
        }
    }
    async discoverWebMcpTools(input, options = {}) {
        return await this.#withAdmission("discover_webmcp_tools", () => this.#discoverWebMcpTools(input, options));
    }
    async #discoverWebMcpTools(input, options) {
        try {
            return ok(webMcpDiscoverySchema.parse(await withTargetSession(input, "discover_webmcp_tools", options, discoverWebMcp, this.#owner)));
        }
        catch (cause) {
            return err(providerError(cause, "discover_webmcp_tools", options.signal));
        }
    }
    async compareCaptures(input) {
        try {
            return ok(browserCaptureComparisonSchema.parse(compareBrowserCaptures(input)));
        }
        catch (cause) {
            return err(providerError(cause, "compare_web_captures"));
        }
    }
    async captureScreenshot(input, options = {}) {
        return await this.#withAdmission("capture_web_screenshot", () => this.#captureScreenshot(input, options));
    }
    async #captureScreenshot(input, options) {
        try {
            return ok(webScreenshotSchema.parse(await withTargetSession(input, "capture_web_screenshot", options, captureCdpScreenshot, this.#owner)));
        }
        catch (cause) {
            return err(providerError(cause, "capture_web_screenshot", options.signal));
        }
    }
    async compareScreenshots(input) {
        try {
            return ok(webScreenshotDiffSchema.parse(comparePngScreenshots(input)));
        }
        catch (cause) {
            if (cause instanceof TypeError)
                return err(new AnalysisInputError("compare_web_screenshots", { cause }, [
                    { path: [], reason: "invalid_format", message: cause.message },
                ]));
            return err(providerError(cause, "compare_web_screenshots"));
        }
    }
    async #capture(input, options, operation) {
        return await withTargetSession(input, operation, options, async (session) => await capturePage({ ...session, operation }), this.#owner, (captured) => captured.inspection);
    }
}
/** Authorize one discovered target, run work in its session, and release or close REA's socket. */
const withTargetSession = async (input, operation, options, work, owner, partialObservation) => {
    const discoveryTimeoutMs = selectedCdpDiscoveryTimeoutMs(input.discovery_timeout_ms);
    const commandTimeoutMs = selectedCdpCommandTimeoutMs(input.command_timeout_ms);
    const endpoint = await openCdpEndpoint(input.cdp_endpoint, operation, options.signal, discoveryTimeoutMs, owner, commandTimeoutMs, { reuseBrowserSocket: true });
    let targetSession;
    let attachAttempted = false;
    let outcome;
    let cleanupFailure;
    try {
        const { target, allowedOrigins } = authorizeCdpTarget(endpoint.discovery, input, operation);
        // The authorization owner already derived the target origin scope.
        const scopedInput = input.allowed_origins.length > 0
            ? input
            : { ...input, allowed_origins: [...allowedOrigins] };
        if (endpoint.connection === undefined) {
            targetSession = await openCdpTargetSession(endpoint.discovery, target, operation, options.signal, { commandTimeoutMs }, owner);
        }
        else {
            attachAttempted = true;
            targetSession = await attachCdpTargetSession(endpoint.connection, target, operation, options.signal, owner);
        }
        outcome = ok(await work({
            connection: targetSession.connection,
            sessionId: targetSession.sessionId,
            discovery: endpoint.discovery,
            target,
            input: scopedInput,
            ...(options.signal === undefined ? {} : { signal: options.signal }),
            ...(options.progress === undefined
                ? {}
                : { progress: options.progress }),
        }));
    }
    catch (cause) {
        outcome = err(cause);
    }
    try {
        if (targetSession !== undefined)
            await closeCdpTargetSession(targetSession, CLEANUP_DOMAINS, options.signal, owner, endpoint.reusableBrowserSocket === true);
        if (endpoint.connection !== undefined &&
            endpoint.connection !== targetSession?.connection) {
            if (endpoint.reusableBrowserSocket === true) {
                if (attachAttempted)
                    await owner.evictBrowserSocket(endpoint.connection);
                else
                    await owner.releaseBrowserSocket(endpoint.connection);
            }
            else {
                await owner.finish(endpoint.connection);
            }
        }
    }
    catch (cause) {
        cleanupFailure =
            cause instanceof AnalysisError
                ? cause
                : new ProviderCleanupError("rea-cdp-browser", [input.target_id], { reason: errorMessage(cause) }, { operation, cause });
    }
    if (outcome.ok && options.signal?.aborted === true)
        outcome = err(partialObservation === undefined
            ? cancelledBy(operation, options.signal)
            : cancelledBy(operation, options.signal, {
                partialObservation: partialObservation(outcome.value),
            }));
    if (cleanupFailure !== undefined) {
        if (!outcome.ok && outcome.error instanceof AnalysisError)
            throw bindCdpTransportCleanup(cleanupFailure, analysisErrorWithCleanupFailure(outcome.error, cleanupFailure, operation));
        if (!outcome.ok)
            throw new AggregateError([outcome.error, cleanupFailure], `CDP operation ${operation} failed and cleanup remains incomplete.`, { cause: outcome.error });
        throw bindCdpTransportCleanup(cleanupFailure, new ProviderCleanupError("rea-cdp-browser", cleanupFailure.cleanupResources, { cleanup_error: cleanupFailure.message }, {
            operation,
            cause: cleanupFailure,
            ...(partialObservation === undefined
                ? {}
                : { partialObservation: partialObservation(outcome.value) }),
        }));
    }
    if (!outcome.ok)
        throw outcome.error;
    return outcome.value;
};
const selectTargets = (discovery, allowedOrigins) => {
    const allowed = [];
    let disallowedOrigin = 0;
    let unsupportedUrl = 0;
    let nonPage = 0;
    let unconnectable = 0;
    for (const target of discovery.targets) {
        if (target.type !== "page") {
            nonPage += 1;
            continue;
        }
        const url = sanitizeBrowserUrl(target.url);
        if (url.origin === null) {
            unsupportedUrl += 1;
            continue;
        }
        if (allowedOrigins !== undefined && !allowedOrigins.has(url.origin)) {
            disallowedOrigin += 1;
            continue;
        }
        if (!hasCdpTargetWebSocket(discovery, target)) {
            unconnectable += 1;
            continue;
        }
        allowed.push({
            target_id: target.id,
            type: target.type,
            title: target.title,
            url: url.url,
            origin: url.origin,
            attached: target.attached,
        });
    }
    allowed.sort((left, right) => compareUnicodeCodePoints(left.target_id, right.target_id));
    return {
        allowed,
        excluded: {
            disallowed_origin: disallowedOrigin,
            unsupported_url: unsupportedUrl,
            non_page: nonPage,
        },
        unconnectable,
    };
};
const providerError = (cause, operation, signal) => cause instanceof BrowserObservationError
    ? cause.forOperation(operation)
    : cause instanceof AnalysisError
        ? cause
        : signal?.aborted === true
            ? cancelledBy(operation, carriedReason(cause))
            : new ProviderAdapterError(CDP_BROWSER_PROVIDER_IDENTITY.id, operation, {
                cause,
            });
