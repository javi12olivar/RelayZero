import { AsyncLocalStorage } from "node:async_hooks";
import { cancelledBy, } from "../domain/analysisErrorCore.js";
import { err, ok } from "../domain/result.js";
import { callerAnalysisParameters } from "../application/AnalysisInput.js";
const currentRequest = new AsyncLocalStorage();
/** One SDK request owns validation, cancellation and its publication boundary. */
export class McpToolRequest {
    id;
    tool;
    cancellation = new AbortController();
    #parameterSelections = new WeakMap();
    validation;
    #handlerStarted = false;
    #finishHandler = () => undefined;
    #handlerDone = new Promise((resolve) => {
        this.#finishHandler = resolve;
    });
    #publicationStarted = false;
    #finishPublication = () => undefined;
    #publicationDone = new Promise((resolve) => {
        this.#finishPublication = resolve;
    });
    #admissions = new Map();
    constructor(id, tool) {
        this.id = id;
        this.tool = tool;
    }
    /** Capture only selected names at canonical validation, not the raw input tree. */
    captureCallerParameters(tool, input, parsed) {
        if (parsed !== null && typeof parsed === "object")
            this.#parameterSelections.set(parsed, {
                tool,
                select: callerAnalysisParameters(input),
            });
    }
    /** The exact parsed object identifies its validation, including nested tool calls. */
    callerParameters(tool, parsed, parameters) {
        const selection = parsed !== null && typeof parsed === "object"
            ? this.#parameterSelections.get(parsed)
            : undefined;
        // Dropping properties from a validated JSON object preserves its value type.
        return (selection?.tool === tool ? selection.select(parameters) : parameters);
    }
    beginHandler() {
        this.#handlerStarted = true;
    }
    finishHandler() {
        this.#finishHandler();
    }
    beginPublication() {
        this.#publicationStarted = true;
    }
    finishPublication() {
        this.#finishPublication();
    }
    /** A suppressed SDK reply releases admission after the handler's cleanup. */
    cancel(reason) {
        this.cancellation.abort(reason);
        if (!this.#publicationStarted)
            this.#finishPublication();
    }
    get holdsAdmission() {
        return this.#admissions.size > 0;
    }
    /**
     * Return the application's result to the SDK while retaining its original
     * session admission through publication. Later work on this same request
     * reuses that binding, including when reset has already queued behind it.
     */
    admit(session, operationName, signal, operation) {
        const existing = this.#admissions.get(session);
        if (existing !== undefined)
            return existing.then(async (binding) => {
                if (!binding.ok)
                    return binding;
                const cancellation = signal?.aborted === true ? signal : this.cancellation.signal;
                if (cancellation.aborted)
                    return err(cancelledBy(operationName, cancellation));
                return ok(await operation(binding.value));
            });
        let resolveBinding;
        let rejectBinding;
        const binding = new Promise((resolve, reject) => {
            resolveBinding = resolve;
            rejectBinding = reject;
        });
        // The first operation does not consume binding; a thrown pre-admission
        // failure still has an owner even when there is no second operation.
        void binding.catch(() => undefined);
        this.#admissions.set(session, binding);
        let resolveResult;
        let rejectResult;
        const result = new Promise((resolve, reject) => {
            resolveResult = resolve;
            rejectResult = reject;
        });
        const failed = (cause) => {
            this.#admissions.delete(session);
            rejectBinding(cause);
            rejectResult(cause);
        };
        let held;
        try {
            held = session.withAdmittedAnalysis(operationName, signal === undefined
                ? this.cancellation.signal
                : AbortSignal.any([signal, this.cancellation.signal]), async (analysis) => {
                resolveBinding(ok(analysis));
                try {
                    const value = await operation(analysis);
                    resolveResult(ok(value));
                    await this.#settlePublication();
                    return value;
                }
                catch (cause) {
                    rejectResult(cause);
                    await this.#settlePublication();
                    throw cause;
                }
            });
        }
        catch (cause) {
            failed(cause);
            return result;
        }
        void held.then((completed) => {
            this.#admissions.delete(session);
            if (!completed.ok) {
                resolveBinding(completed);
                resolveResult(completed);
            }
        }, failed);
        return result;
    }
    async #settlePublication() {
        if (this.#handlerStarted)
            await this.#handlerDone;
        await this.#publicationDone;
    }
}
export const currentMcpToolRequest = () => currentRequest.getStore();
export const runMcpToolRequest = (request, operation) => currentRequest.run(request, operation);
