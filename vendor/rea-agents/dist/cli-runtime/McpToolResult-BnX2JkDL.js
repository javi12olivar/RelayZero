import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisProtocolError, OwnerCancellation, init_analysisErrorCore, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_safeJson, init_strictUtf8, safeParseJson, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { AbortedWait, init_AbortablePromise, waitForAbortable } from "./AbortablePromise-CvIbazUz.js";
import { OwnedMcpClient, init_OwnedMcpClient } from "./OwnedMcpClient-OmwCR7CK.js";
import { z } from "zod";

//#region dist/providers/StructuredContentMcpClient.js
var isSchema, StructuredContentMcpClient;
function init_StructuredContentMcpClient() {
	return (init_StructuredContentMcpClient = __esmMin((() => {
		init_OwnedMcpClient();
		isSchema = (value) => typeof value === "object" && value !== null && "~standard" in value;
		StructuredContentMcpClient = class extends OwnedMcpClient {
			#toolResult = { "~standard": {
				version: 1,
				vendor: "rea-mcp-structured-content",
				validate: (input) => {
					const parsed = this._wireCodec().validateResult("tools/call", input);
					if (!parsed.ok) return { issues: [{ message: parsed.reason === "invalid" ? parsed.message : "not-in-era: tools/call" }] };
					if (typeof input === "object" && input !== null && Object.hasOwn(input, "structuredContent")) return { value: {
						...parsed.value,
						structuredContent: input.structuredContent
					} };
					return { value: parsed.value };
				}
			} };
			request(request, schemaOrOptions, options) {
				if (isSchema(schemaOrOptions)) return super.request(request, schemaOrOptions, options);
				if (request.method === "tools/call") return super.request(request, this.#toolResult, schemaOrOptions);
				return super.request(request, schemaOrOptions);
			}
		};
	})))();
}

//#endregion
//#region dist/process/SharedStartupAttempt.js
var SharedStartupAttempt;
function init_SharedStartupAttempt() {
	return (init_SharedStartupAttempt = __esmMin((() => {
		init_analysisErrorCore();
		init_AbortablePromise();
		SharedStartupAttempt = class {
			#controller = new AbortController();
			promise;
			#signal;
			#waiters = 0;
			#settlement = { status: "pending" };
			constructor(start, ownerSignal) {
				this.#signal = ownerSignal === undefined ? this.#controller.signal : AbortSignal.any([ownerSignal, this.#controller.signal]);
				this.promise = start(this.#signal);
				void this.promise.then((value) => {
					this.#settlement = {
						status: "completed",
						value
					};
				}, () => {
					this.#settlement = { status: "rejected" };
				});
			}
			/** Signal consumed by the startup producer, never by an individual waiter. */
			get signal() {
				return this.#signal;
			}
			/** Completion includes the producer's final cleanup, not just its abort. */
			get settled() {
				return this.#settlement.status !== "pending";
			}
			/** Parsed completion facts are owned here, rather than copied into adapters. */
			get settlement() {
				return this.#settlement;
			}
			/**
			* Stop startup when its owning provider closes, regardless of active waits.
			* The reason is distinct from a caller's cancelling its wait.
			*/
			close() {
				if (!this.settled) this.#controller.abort(OwnerCancellation.startupOwnerClosed);
			}
			/** A peer's departure leaves the producer running; final departure joins cleanup. */
			async wait(signal) {
				this.#waiters += 1;
				try {
					const waited = await waitForAbortable(this.promise, signal);
					if (!(waited instanceof AbortedWait)) return {
						status: "completed",
						value: waited
					};
					if (this.#waiters > 1) return {
						status: "cancelled",
						reason: waited.carried
					};
					if (!this.settled) this.#controller.abort(waited.carried);
					return {
						status: "stopped",
						value: await this.promise
					};
				} finally {
					this.#waiters -= 1;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/providers/Utf8McpResponse.js
var McpHttpUtf8Error, validateMcpHttpResponse;
function init_Utf8McpResponse() {
	return (init_Utf8McpResponse = __esmMin((() => {
		init_strictUtf8();
		init_analysisErrorCore();
		McpHttpUtf8Error = class extends AnalysisProtocolError {
			constructor(cause) {
				super("MCP HTTP response body omitted: not valid UTF-8.", { cause });
			}
		};
		validateMcpHttpResponse = (response, rejectTransport) => {
			if (!response.ok || response.body === null) return response;
			const decoder = strictUtf8Decoder("preserve");
			const validate = (bytes) => {
				try {
					decoder.decode(bytes, { stream: bytes !== undefined });
				} catch (cause) {
					const failure = new McpHttpUtf8Error(cause);
					rejectTransport(failure);
					throw failure;
				}
			};
			const body = response.body.pipeThrough(new TransformStream({
				transform(bytes, controller) {
					validate(bytes);
					controller.enqueue(bytes);
				},
				flush() {
					validate();
				}
			}));
			const validated = new Response(body, {
				status: response.status,
				statusText: response.statusText,
				headers: response.headers
			});
			Object.defineProperties(validated, {
				url: { value: response.url },
				redirected: { value: response.redirected },
				type: { value: response.type }
			});
			return validated;
		};
	})))();
}

//#endregion
//#region dist/providers/McpToolResult.js
var structuredContentSchema, mcpToolResultSchema, mcpTextBlocks, decodeMcpJsonText;
function init_McpToolResult() {
	return (init_McpToolResult = __esmMin((() => {
		init_jsonValue();
		init_result();
		init_safeJson();
		structuredContentSchema = z.custom((value) => {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
			const prototype = Object.getPrototypeOf(value);
			return prototype === Object.prototype || prototype === null;
		});
		mcpToolResultSchema = z.object({
			isError: z.boolean().optional(),
			structuredContent: structuredContentSchema.optional(),
			content: z.array(z.object({
				type: z.string(),
				text: z.string().optional()
			}).passthrough())
		});
		mcpTextBlocks = (content) => content.flatMap((block) => block.type === "text" && block.text !== undefined ? [block.text] : []);
		decodeMcpJsonText = (text) => {
			const parsed = safeParseJson(text);
			if (!parsed.ok) return err({
				reason: "malformed_json",
				cause: parsed.cause
			});
			return ok(jsonValueSchema.parse(parsed.value));
		};
	})))();
}

//#endregion
export { McpHttpUtf8Error, SharedStartupAttempt, StructuredContentMcpClient, decodeMcpJsonText, init_McpToolResult, init_SharedStartupAttempt, init_StructuredContentMcpClient, init_Utf8McpResponse, mcpTextBlocks, mcpToolResultSchema, validateMcpHttpResponse };