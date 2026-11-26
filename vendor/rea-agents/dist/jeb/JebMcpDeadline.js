import { SdkError, SdkErrorCode } from "@modelcontextprotocol/client";
import { AnalysisTimeoutError, cancelledBy, } from "../domain/analysisErrorCore.js";
import { analysisSettingLimit } from "../domain/analysisSettingDefinitions.js";
import { currentAnalysisOperationSnapshot } from "../domain/analysisOperationSnapshot.js";
import { DEFAULT_JEB_MCP_TIMEOUT_MS } from "../domain/analysisResourceLimits.js";
import { ProviderStartupDeadline } from "../process/ProviderDeadline.js";
/**
 * Runtime override, then the launch setting, then the built-in default.
 * An invalid launch value is omitted by the caller so this can still select
 * the override.
 */
export const selectedJebMcpTimeout = (launchMs) => {
    const override = currentAnalysisOperationSnapshot()?.overrides["jeb.mcp_timeout_ms"];
    if (override !== undefined)
        return { ms: override, source: "runtime" };
    if (launchMs !== undefined)
        return { ms: launchMs, source: "setting" };
    return { ms: DEFAULT_JEB_MCP_TIMEOUT_MS, source: "default" };
};
/** Name the deadline that both JEB phases share. */
export const jebMcpTimeoutGuidance = (phase, timeoutMs, source) => {
    const limit = analysisSettingLimit("jeb.mcp_timeout_ms", timeoutMs, source);
    return {
        userMessage: `This request reached REA's configured JEB ${phase === "discovery" ? "catalog discovery" : phase} deadline of ${String(timeoutMs)} ms (deadlineExpired).`,
        remediationAction: `jeb.mcp_timeout_ms is ${String(timeoutMs)} ms (source ${source}; default ${String(DEFAULT_JEB_MCP_TIMEOUT_MS)} ms, floor ${String(limit.minimum)} ms, maximum ${String(limit.maximum)} ms). It can be changed at runtime with update_analysis_settings. The launch seed is REA_JEB_MCP_TIMEOUT_MS. The same setting raises catalog discovery and each tools/call. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`,
        limit,
    };
};
/**
 * One JEB MCP phase's deadline. It reports its own interruption when it
 * aborts: a timeout when its budget elapsed, otherwise a cancellation by the
 * caller's or the connection owner's signal. SDK 2.3.1 rejects an aborted
 * request with an `SdkError` abort reason by identity, so that identity maps
 * back to the report.
 */
export class JebMcpDeadline {
    phase;
    operation;
    #deadline;
    #controller = new AbortController();
    #interruption = new SdkError(SdkErrorCode.RequestTimeout, "JEB MCP interrupted");
    #caller;
    #reported;
    #cancelledBy;
    #onAbort = () => {
        if (this.#deadline.interruption === "timeout")
            this.#reported = this.#timeout(this.#deadline.signal.reason);
        else {
            // The caller's own signal decides whose cancellation this is.
            this.#cancelledBy = this.#caller?.aborted === true ? "caller" : "owner";
            this.#reported = cancelledBy(this.operation, this.#deadline.signal);
        }
        this.#controller.abort(this.#interruption);
    };
    timeoutMs;
    source;
    constructor(selected, phase, 
    /** The phase operation its interruption is reported under. */
    operation, signals) {
        this.phase = phase;
        this.operation = operation;
        this.timeoutMs = selected.ms;
        this.source = selected.source;
        this.#caller = signals.caller;
        this.#deadline = new ProviderStartupDeadline(selected.ms, signals.caller === undefined
            ? signals.owner
            : AbortSignal.any([signals.caller, signals.owner]));
        if (this.#deadline.signal.aborted)
            this.#onAbort();
        else
            this.#deadline.signal.addEventListener("abort", this.#onAbort, {
                once: true,
            });
    }
    get signal() {
        return this.#controller.signal;
    }
    remainingMs() {
        return this.#deadline.remainingMs();
    }
    /** Whose signal cancelled this phase; undefined unless one did. */
    get cancelledBy() {
        return this.#cancelledBy;
    }
    #timeout(cause) {
        return new AnalysisTimeoutError(this.operation, this.timeoutMs, {
            cause,
            ...jebMcpTimeoutGuidance(this.phase, this.timeoutMs, this.source),
        });
    }
    /**
     * This deadline's own report for an SDK rejection it caused: its recorded
     * interruption, or the SDK's request timeout under this deadline's budget.
     * Undefined for any other SDK failure.
     */
    interruption(rejection) {
        if (rejection === this.#interruption)
            return this.#reported;
        if (rejection.code === SdkErrorCode.RequestTimeout)
            return this.#timeout(rejection);
        return undefined;
    }
    dispose() {
        this.#deadline.signal.removeEventListener("abort", this.#onAbort);
        this.#deadline.dispose();
    }
}
