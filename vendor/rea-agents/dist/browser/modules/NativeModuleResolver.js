import { snapshotEnvironment } from "../../process/snapshotEnvironment.js";
import { HOST_PLATFORM } from "../../platform/HostPlatform.js";
import { chromiumLaunchRemediation, chromiumSandboxEnabled, } from "../ChromiumSandbox.js";
import { isAbsolute } from "node:path";
import { z } from "zod";
import { analysisErrorWithCleanupDependencies } from "../../domain/analysisErrorCleanup.js";
import { analysisErrorWithCancellation } from "../../domain/analysisErrorCancellation.js";
import { AnalysisCapabilityUnavailableError, AnalysisOutputError, AnalysisTimeoutError, cancelledBy, } from "../../domain/analysisErrorCore.js";
import { BrowserObservationError } from "../../domain/browserObservationError.js";
import { jsonObjectSchema } from "../../domain/jsonValue.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
import { err, ok } from "../../domain/result.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, } from "../../resources/index.js";
import { webModuleResolutionSchema } from "../../domain/webModuleTrace.js";
import { ProviderStartupDeadline } from "../../process/ProviderDeadline.js";
import { importMapForTrustedResolver } from "./importMapForTrustedResolver.js";
import { errorMessage } from "../../kernel/errorMessage.js";
const OPERATION = "trace_web_module_imports";
const TIMEOUT_MS = 20000;
const reportSchema = z.strictObject({
    importer_url: z.string(),
    entries: z.array(z.strictObject({
        specifier: z.string(),
        resolution: webModuleResolutionSchema,
    })),
});
const launch = async (options) => (await import("playwright-core")).chromium.launch(options);
const moduleResolverFailure = (cause, executable, remediationAction) => new ProviderAdapterError("native-module-resolver", OPERATION, {
    cause,
    ...(remediationAction === undefined ? {} : { remediationAction }),
    diagnostics: {
        executable,
        error_message: errorMessage(cause),
    },
});
/** Use native import.meta.resolve in an owned context with locally fulfilled requests. */
export class NativeModuleResolver {
    launcher;
    platform;
    #tail = Promise.resolve();
    #closing = false;
    #closePromise;
    #pendingCleanup;
    environment;
    constructor(environment, launcher = launch, 
    // The host Chromium launches on; defaults to the running host.
    platform = HOST_PLATFORM.platform) {
        this.launcher = launcher;
        this.platform = platform;
        this.environment = snapshotEnvironment(environment, platform);
    }
    resolve(input, options) {
        if (this.#closing)
            return Promise.resolve(err(this.#closedError()));
        const operation = this.#tail.then(() => this.#closing ? err(this.#closedError()) : this.#resolve(input, options));
        this.#tail = operation.then(() => undefined, () => undefined);
        return operation;
    }
    async #resolve(input, options) {
        if (options?.signal?.aborted === true)
            return err(cancelledBy(OPERATION, options.signal));
        const pending = await this.#retryCleanup();
        if (pending !== undefined)
            return err(pending);
        const executable = this.environment.REA_BROWSER_EXECUTABLE;
        if (executable === undefined || !isAbsolute(executable))
            return err(new AnalysisCapabilityUnavailableError("native-module-resolver", OPERATION, executable === undefined
                ? "missing_browser_executable"
                : "invalid_browser_executable", {
                userMessage: "Provide an absolute REA_BROWSER_EXECUTABLE for a caller-supplied Chromium browser supporting import.meta.resolve. REA installs no browser.",
                ...(executable === undefined
                    ? {}
                    : { diagnostics: { executable } }),
            }));
        const chromiumSandbox = chromiumSandboxEnabled(this.environment, this.platform);
        const deadline = new ProviderStartupDeadline(TIMEOUT_MS, options?.signal);
        let activeCall;
        let interruption;
        const interrupted = () => deadline.interruption === "cancelled"
            ? cancelledBy(OPERATION, deadline.signal)
            : new AnalysisTimeoutError(OPERATION, TIMEOUT_MS);
        const assertActive = () => {
            if (!deadline.signal.aborted)
                return;
            interruption = interrupted();
            throw interruption;
        };
        const observe = (call) => {
            assertActive();
            const observed = { settled: false };
            activeCall = observed;
            return call().then((value) => {
                observed.settled = true;
                return value;
            }, (cause) => {
                observed.settled = true;
                throw observed.interruption === undefined
                    ? cause
                    : observed.interruption;
            });
        };
        let lease;
        let launched = false;
        let cleanup;
        const close = () => {
            if (cleanup === undefined && lease !== undefined) {
                const owned = lease;
                cleanup = Promise.resolve().then(async () => {
                    await owned.release();
                    this.#pendingCleanup = undefined;
                });
            }
            return cleanup ?? Promise.resolve();
        };
        const onAbort = () => {
            if (lease !== undefined) {
                const pending = close();
                void pending.catch(() => undefined);
            }
        };
        deadline.signal.addEventListener("abort", onAbort, { once: true });
        let result;
        try {
            assertActive();
            const browser = await observe(() => this.launcher({
                executablePath: executable,
                env: this.environment,
                headless: true,
                timeout: Math.max(1, deadline.remainingMs()),
                handleSIGINT: false,
                handleSIGTERM: false,
                handleSIGHUP: false,
                chromiumSandbox,
                args: [
                    "--disable-dev-shm-usage",
                    "--disable-background-networking",
                    "--renderer-process-limit=1",
                    "--js-flags=--max-old-space-size=128",
                ],
            }));
            launched = true;
            lease = new AnalysisCleanupLease(async () => {
                if (deadline.signal.aborted &&
                    activeCall !== undefined &&
                    !activeCall.settled) {
                    interruption = interrupted();
                    activeCall.interruption = interruption;
                }
                await browser.close();
            }, ["chromium-browser"]);
            this.#pendingCleanup = lease;
            assertActive();
            result = ok(await resolveInBrowser(browser, input, deadline, executable, assertActive, observe));
        }
        catch (cause) {
            result = err(cause === interruption && interruption !== undefined
                ? interruption
                : cause instanceof AnalysisOutputError ||
                    cause instanceof AnalysisCapabilityUnavailableError ||
                    cause instanceof BrowserObservationError
                    ? cause
                    : moduleResolverFailure(cause, executable, 
                    // Only an unresolved sandboxed launch can be a sandbox failure;
                    // later engine failures keep the default recovery guidance.
                    launched || !chromiumSandbox
                        ? undefined
                        : chromiumLaunchRemediation(true)));
        }
        finally {
            deadline.signal.removeEventListener("abort", onAbort);
            deadline.dispose();
        }
        let cleanupError;
        try {
            await close();
        }
        catch (cause) {
            cleanupError = cleanupFailure(cause, result.ok ? completedObservation(input, result.value) : undefined);
            if (lease !== undefined)
                new AnalysisCleanupLeaseGroup(cleanupError, [lease]);
        }
        if (options?.signal?.aborted)
            result = err(analysisErrorWithCancellation(result.ok ? undefined : result.error, cancelledBy(OPERATION, options.signal, result.ok
                ? {
                    partialObservation: completedObservation(input, result.value),
                }
                : {})));
        if (cleanupError !== undefined)
            return err(result.ok
                ? cleanupError
                : analysisErrorWithCleanupDependencies(result.error, cleanupError, OPERATION));
        return result;
    }
    async close() {
        this.#closing = true;
        this.#closePromise ??= this.#tail
            .then(async () => {
            const failure = await this.#retryCleanup();
            if (failure !== undefined)
                throw failure;
        })
            .catch((cause) => {
            this.#closePromise = undefined;
            throw cause;
        });
        return this.#closePromise;
    }
    #closedError() {
        return new AnalysisCapabilityUnavailableError("native-module-resolver", OPERATION, "Native module resolver is closing.");
    }
    async #retryCleanup() {
        const lease = this.#pendingCleanup;
        if (lease === undefined)
            return undefined;
        try {
            await lease.release();
            this.#pendingCleanup = undefined;
            return undefined;
        }
        catch (cause) {
            const failure = cleanupFailure(cause);
            new AnalysisCleanupLeaseGroup(failure, [lease]);
            return failure;
        }
    }
}
const resolveInBrowser = async (browser, input, deadline, executable, assertActive, observe) => {
    const context = await observe(() => browser.newContext({
        serviceWorkers: "block",
        acceptDownloads: false,
    }));
    const page = await observe(() => context.newPage());
    const diagnostics = [];
    let diagnosticBytes = 0;
    page.on("console", (message) => {
        const text = message.text();
        diagnosticBytes += Buffer.byteLength(text);
        if (diagnosticBytes <= 1024 * 1024)
            diagnostics.push(`${message.type()}: ${text}`);
    });
    const requests = [];
    const importerUrl = new URL(input.importerUrl).href;
    const documentUrl = new URL("/.rea-module-resolver/document", importerUrl)
        .href;
    const transportUrl = new URL(importerUrl);
    transportUrl.hash = "";
    let stubSent = false;
    await observe(() => context.route("**/*", async (route) => {
        const request = route.request();
        if (request.resourceType() === "document" &&
            request.url() === documentUrl.split("#")[0]) {
            requests.push({
                url: request.url(),
                resource_type: "document",
                effect: "fulfilled",
            });
            await route.fulfill({
                status: 200,
                contentType: "text/html",
                body: `<!doctype html>${input.importMap === null ? "" : `<base href="${htmlAttribute(new URL(input.importMap.baseUrl).href)}"><script type="importmap">${scriptJson(importMapForTrustedResolver(input.importMap.value, importerUrl, input.importMap.baseUrl))}</script>`}`,
            });
        }
        else if (!stubSent &&
            request.resourceType() === "script" &&
            request.url() === transportUrl.href) {
            stubSent = true;
            requests.push({
                url: request.url(),
                resource_type: "script",
                effect: "fulfilled",
            });
            await route.fulfill({
                status: 200,
                contentType: "text/javascript",
                headers: { "Access-Control-Allow-Origin": "*" },
                body: `if (typeof import.meta.resolve !== "function") {globalThis.__reaModuleUnsupported = true;} else {globalThis.__reaModuleResult = {importer_url: import.meta.url, entries: ${scriptJson(input.specifiers)}.map(specifier => {try {return {specifier, resolution: {state: "resolved", url: import.meta.resolve(specifier)}}} catch (error) {return {specifier, resolution: {state: "rejected", message: String(error)}}}})};}`,
            });
        }
        else {
            requests.push({
                url: request.url(),
                resource_type: request.resourceType(),
                effect: "blocked",
            });
            // Playwright's default network error code, named so the abort-reason
            // guard sees an argument rather than a bare AbortController abort.
            await route.abort("failed");
        }
    }));
    await observe(() => page.goto(documentUrl, {
        timeout: Math.max(1, deadline.remainingMs()),
    }));
    await observe(() => page.evaluate(`{const script = document.createElement("script"); script.type = "module"; script.src = ${scriptJson(importerUrl)}; script.onerror = () => {globalThis.__reaModuleFailure = "Trusted resolver stub could not be loaded in the selected context.";}; document.head.append(script);}`));
    await observe(() => page.waitForFunction(() => Reflect.has(globalThis, "__reaModuleResult") ||
        Reflect.has(globalThis, "__reaModuleUnsupported") ||
        Reflect.has(globalThis, "__reaModuleFailure"), undefined, { timeout: Math.max(1, deadline.remainingMs()) }));
    const unsupported = await observe(() => page.evaluate(() => Reflect.get(globalThis, "__reaModuleUnsupported")));
    if (unsupported === true)
        throw new AnalysisCapabilityUnavailableError("native-module-resolver", OPERATION, "native_resolution_unsupported", {
            userMessage: `Configured Chromium ${browser.version()} does not supply import.meta.resolve; use a browser supporting native module resolution.`,
        });
    const raw = await observe(() => page.evaluate(() => Reflect.get(globalThis, "__reaModuleResult")));
    const failure = await observe(() => page.evaluate(() => Reflect.get(globalThis, "__reaModuleFailure")));
    if (typeof failure === "string")
        throw new AnalysisOutputError(OPERATION, `${failure} Native diagnostics: ${diagnostics.join("\n")}`);
    const parsed = reportSchema.safeParse(raw);
    if (!parsed.success ||
        parsed.data.importer_url !== importerUrl ||
        parsed.data.entries.length !== input.specifiers.length ||
        parsed.data.entries.some((entry, index) => entry.specifier !== input.specifiers[index]))
        throw new AnalysisOutputError(OPERATION, "Native resolver report has invalid shape or does not match the selected importer/specifiers.");
    if (diagnosticBytes > 1024 * 1024)
        throw new BrowserObservationError(OPERATION, "payload_limit");
    assertActive();
    const engine = {
        id: "chromium-native-module-resolver",
        version: browser.version(),
    };
    return {
        engine,
        resolutions: parsed.data.entries.map((entry) => entry.resolution),
        diagnostics,
        rawResult: jsonObjectSchema.parse({
            native_report: parsed.data,
            requests,
            diagnostics,
            engine,
            executable_path: executable,
        }),
    };
};
const completedObservation = (input, batch) => ({
    kind: "web-module-resolution",
    request: input,
    batch,
});
const cleanupFailure = (cause, observation) => new ProviderCleanupError("native-module-resolver", ["chromium-browser"], {
    reason: errorMessage(cause),
}, {
    cause,
    operation: OPERATION,
    ...(observation === undefined ? {} : { partialObservation: observation }),
});
const scriptJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
const htmlAttribute = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
