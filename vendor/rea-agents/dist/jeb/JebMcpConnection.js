import { SdkError } from "@modelcontextprotocol/client";
import { mcpToolResultSchema, mcpTextBlocks, decodeMcpJsonText, } from "../providers/McpToolResult.js";
import { jsonObjectSchema } from "../domain/jsonValue.js";
import { AnalysisCancelledError, AnalysisProtocolError, cancelledBy, carriedReason, OwnerCancellation, } from "../domain/analysisErrorCore.js";
import { JebMcpConnectionOwner, JebMcpCleanupFailure, JebMcpPhysicalFailure, } from "./JebMcpConnectionOwner.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { SharedStartupAttempt } from "../process/SharedStartupAttempt.js";
import { err, ok } from "../domain/result.js";
import { JebMcpDeadline, selectedJebMcpTimeout } from "./JebMcpDeadline.js";
import { isRecord } from "../kernel/isRecord.js";
/** Upstream protocol names for the operations REA exposes. */
export const JEB_ENGINE_TOOLS = {
    inspect_jeb_client: "get_client_information",
    open_jeb_project: "open_project",
    list_jeb_units: "list_units",
    decompile_jeb_item: "decompile_code_item",
};
const RELEVANT_ENGINE_TOOLS = new Set(Object.values(JEB_ENGINE_TOOLS));
const toolResultSchema = mcpToolResultSchema.extend({
    content: mcpToolResultSchema.shape.content.default([]),
});
/**
 * Decode a JEB MCP tool result without inventing an empty observation. Every
 * JEB tool replies with a JSON envelope; only an error-marked reply may carry
 * plain engine text, which is reported as the tool failure.
 */
export const decodeJebToolResult = (input) => {
    const result = toolResultSchema.parse(input);
    const blocks = mcpTextBlocks(result.content);
    let decoded;
    if (result.structuredContent !== undefined) {
        decoded = jsonObjectSchema.parse(result.structuredContent);
    }
    else {
        if (blocks.length !== 1)
            throw new AnalysisProtocolError("JEB MCP omitted a single structured or text result; unsupported content cannot establish an empty observation.");
        const text = decodeMcpJsonText(blocks[0]);
        if (!text.ok && result.isError !== true)
            throw new AnalysisProtocolError("JEB MCP returned malformed JSON text", {
                cause: text.error.cause,
                diagnostics: { upstream_response: blocks[0] },
            });
        decoded = text.ok ? text.value : blocks[0];
    }
    if (result.isError === true && !isJebFailureEnvelope(decoded))
        throw new AnalysisProtocolError(`JEB MCP tool failed: ${blocks[0] ?? "error-marked result without a JEB failure envelope"}`, { cause: decoded });
    return decoded;
};
const isJebFailureEnvelope = (value) => isRecord(value) && value.success === false;
/** Serve JEB requests from a running engine client over streamable HTTP. */
export const createStreamableHttpJebMcpConnection = (endpoint, timeouts) => {
    const discoveryTimeout = () => selectedJebMcpTimeout(timeouts?.discoveryTimeoutMs);
    const requestTimeout = () => selectedJebMcpTimeout(timeouts?.requestTimeoutMs);
    let state;
    let sessionGeneration = 0;
    let closing;
    let closed = false;
    const waitForAcquisition = async (owner, attempt, signal) => {
        const waited = await attempt.wait(signal);
        // Once acquisition failed, its final cleanup belongs to every attached
        // caller. A later abort cannot replace that already captured outcome.
        const outcome = waited.status === "cancelled"
            ? owner.acquisitionFailure === undefined
                ? undefined
                : await attempt.promise
            : waited.value;
        if (outcome !== undefined && !outcome.ok)
            throw outcome.error;
        if (outcome === undefined || signal?.aborted === true)
            throw cancelledBy("jeb_mcp_catalog", carriedReason(signal?.reason));
        return outcome.value;
    };
    const dispose = async (owner) => {
        await owner.close();
        if (state === owner)
            state = undefined;
    };
    const invalidate = async (owner, cause, operation) => {
        if (owner.invalidation === undefined) {
            owner.tools = undefined;
            const failure = (async () => {
                owner.signal.abort(cause);
                try {
                    await dispose(owner);
                }
                catch (cleanupCause) {
                    if (!(cleanupCause instanceof ProviderCleanupError))
                        return new AggregateError([cause, cleanupCause], "JEB MCP operation and cleanup failed", { cause });
                    return new JebMcpCleanupFailure(cause, cleanupCause, operation);
                }
                return cause;
            })();
            const invalidation = { failure, settled: false };
            owner.invalidation = invalidation;
            void failure.then(() => {
                invalidation.settled = true;
            });
        }
        throw await owner.invalidation.failure;
    };
    const requestFailure = (owner, deadline, phase, cause) => {
        const interruption = cause instanceof SdkError ? deadline.interruption(cause) : undefined;
        // A cancellation by the caller, or by closing, leaves the connection to
        // its owner; any other failure invalidates it.
        if (interruption instanceof AnalysisCancelledError &&
            (closed || deadline.cancelledBy === "caller"))
            return Promise.reject(interruption);
        return invalidate(owner, interruption ?? physicalFailure(phase, owner.responseFailure(cause)), deadline.operation);
    };
    const connect = async (signal) => {
        if (signal?.aborted === true)
            throw cancelledBy("jeb_mcp_catalog", signal);
        if (closing !== undefined)
            await closing;
        if (closed) {
            if (state !== undefined)
                await dispose(state);
            throw new AnalysisProtocolError("JEB MCP connection is closed");
        }
        if (state?.invalidation !== undefined && !state.invalidation.settled)
            throw await state.invalidation.failure;
        if (state?.tools !== undefined && !state.disposing)
            return state.tools;
        if (state?.acquisition !== undefined)
            return waitForAcquisition(state, state.acquisition, signal);
        if (state !== undefined) {
            await dispose(state);
            if (state !== undefined || closing !== undefined)
                return connect(signal);
        }
        const owner = new JebMcpConnectionOwner(endpoint);
        state = owner;
        const acquisition = new SharedStartupAttempt(async (startupSignal) => {
            const selected = discoveryTimeout();
            const deadline = new JebMcpDeadline(selected, "discovery", "jeb_mcp_catalog", { owner: startupSignal });
            try {
                await owner.client.connect(owner.transport, {
                    signal: deadline.signal,
                    timeout: deadline.remainingMs(),
                });
                const tools = await readToolNames(owner.client, deadline);
                deadline.signal.throwIfAborted();
                owner.tools = tools;
                sessionGeneration += 1;
                return ok(tools);
            }
            catch (cause) {
                const failure = (cause instanceof SdkError
                    ? deadline.interruption(cause)
                    : undefined) ??
                    physicalFailure("catalog", owner.responseFailure(cause));
                owner.acquisitionFailure = { cause: failure };
                owner.signal.abort(failure);
                try {
                    await dispose(owner);
                }
                catch (cleanupCause) {
                    if (!(cleanupCause instanceof ProviderCleanupError))
                        throw cleanupCause;
                    return err(new JebMcpCleanupFailure(failure, cleanupCause, "jeb_mcp_catalog"));
                }
                return err(failure);
            }
            finally {
                deadline.dispose();
            }
        }, owner.signal.signal);
        owner.acquisition = acquisition;
        const clearAcquisition = () => {
            if (owner.acquisition === acquisition)
                owner.acquisition = undefined;
        };
        void acquisition.promise.then(clearAcquisition, clearAcquisition);
        return waitForAcquisition(owner, acquisition, signal);
    };
    return {
        get sessionGeneration() {
            return sessionGeneration;
        },
        connect,
        async listTools(signal) {
            const existing = state?.tools !== undefined;
            // Initial acquisition owns its deadline and cleanup. A second timer
            // could detach this waiter before that owner has disposed a failed client.
            const tools = await connect(signal);
            if (!existing)
                return tools;
            const owner = state;
            if (owner === undefined)
                throw new AnalysisProtocolError("JEB MCP client failed to connect");
            const selected = discoveryTimeout();
            const deadline = new JebMcpDeadline(selected, "discovery", "jeb_mcp_catalog", { caller: signal, owner: owner.signal.signal });
            try {
                const refreshed = await readToolNames(owner.client, deadline);
                owner.tools = refreshed;
                return refreshed;
            }
            catch (cause) {
                return await requestFailure(owner, deadline, "catalog", cause);
            }
            finally {
                deadline.dispose();
            }
        },
        async call(name, args, signal) {
            await connect(signal);
            const owner = state;
            if (owner === undefined || owner.tools === undefined)
                throw new AnalysisProtocolError("JEB MCP client failed to connect");
            const selected = requestTimeout();
            const deadline = new JebMcpDeadline(selected, "tools/call", name, {
                caller: signal,
                owner: owner.signal.signal,
            });
            let result;
            try {
                result = await owner.client.callTool({ name, arguments: args }, { timeout: deadline.remainingMs(), signal: deadline.signal });
            }
            catch (cause) {
                return await requestFailure(owner, deadline, "tool", cause);
            }
            finally {
                deadline.dispose();
            }
            return decodeJebToolResult(result);
        },
        async close() {
            closed = true;
            if (closing !== undefined)
                return closing;
            const operation = (async () => {
                const owner = state;
                if (owner === undefined)
                    return;
                owner.tools = undefined;
                owner.signal.abort(OwnerCancellation.ownerClosed);
                if (owner.acquisition !== undefined)
                    await owner.acquisition.promise.catch(() => undefined);
                if (state === owner)
                    await dispose(owner);
            })();
            closing = operation;
            try {
                await operation;
            }
            finally {
                if (closing === operation)
                    closing = undefined;
            }
        },
    };
};
const readToolNames = async (client, deadline) => {
    const names = new Set();
    let cursor;
    do {
        deadline.signal.throwIfAborted();
        // listTools without a cursor aggregates and caches every page in SDK v2.
        // This owner needs single pages to bound retained names and the whole walk.
        // Each page gets the discovery budget still remaining, not the SDK default.
        const page = await client.request({
            method: "tools/list",
            ...(cursor === undefined ? {} : { params: { cursor } }),
        }, { signal: deadline.signal, timeout: deadline.remainingMs() });
        for (const tool of page.tools)
            if (RELEVANT_ENGINE_TOOLS.has(tool.name))
                names.add(tool.name);
        const next = page.nextCursor;
        if (next !== undefined && next === cursor)
            throw new AnalysisProtocolError("JEB MCP repeated a tool catalog cursor");
        deadline.signal.throwIfAborted();
        if (names.size === RELEVANT_ENGINE_TOOLS.size)
            return [...names];
        cursor = next;
    } while (cursor !== undefined);
    return [...names];
};
const physicalFailure = (phase, cause) => cause instanceof AnalysisError
    ? cause
    : new JebMcpPhysicalFailure(phase, cause);
