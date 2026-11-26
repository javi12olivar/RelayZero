import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisProtocolError, AnalysisResourceConstraintError, AnalysisTimeoutError, ConfigurationError, DEFAULT_JEB_MCP_TIMEOUT_MS, OwnerCancellation, analysisSettingLimit, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_analysisSettingDefinitions, init_configurationErrors, init_errorMessage, init_isRecord, init_jsonValue, isRecord, jsonObjectSchema, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { currentAnalysisOperationSnapshot, init_analysisOperationSnapshot } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, analysisErrorRemediationAction, init_analysisErrorPresentation, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, init_AnalysisCleanupLease, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { DEFAULT_JEB_MCP_ENDPOINT, init_environment, init_jebMcpEndpoint, parseJebMcpEndpoint, parseJebMcpTimeoutMs } from "./environment-BysPqLj9.js";
import { analyzeWithService, contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { finishCliEvidenceCommand, init_cliEvidenceCallerPath } from "./cliEvidenceCallerPath-BMrJ1VvW.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { executeProviderOperation, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { RUNTIME_EXHAUSTION_TOKENS, externalJvmExhaustionRecovery, init_RuntimeExhaustion, jvmExhaustionArea } from "./ProviderProcess-OkgijDXB.js";
import { ProviderStartupDeadline, init_ProviderDeadline } from "./ProviderDeadline-BXAnhNBa.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { JEB_TOOL_CONTRACTS, init_jebAnalysis, init_jebToolContracts, jebRequestSchema, jebResultSchemas } from "./jebToolContracts-BwzdffZj.js";
import { SharedStartupAttempt, StructuredContentMcpClient, decodeMcpJsonText, init_McpToolResult, init_SharedStartupAttempt, init_StructuredContentMcpClient, init_Utf8McpResponse, mcpTextBlocks, mcpToolResultSchema, validateMcpHttpResponse } from "./McpToolResult-BnX2JkDL.js";
import { z } from "zod";
import { SdkError, SdkErrorCode, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";

//#region dist/application/jeb/JebAnalysisService.js
var JebAnalysisService;
function init_JebAnalysisService() {
	return (init_JebAnalysisService = __esmMin((() => {
		init_jebAnalysis();
		init_ProviderOperationExecution();
		JebAnalysisService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			/** Run one caller-selected JEB request and retain engine provenance inline. */
			async execute(operation, input, options) {
				return executeProviderOperation(operation, input, options, jebRequestSchema, this.provider, operation === "decompile_jeb_item" ? "derived" : "observed");
			}
		};
	})))();
}

//#endregion
//#region dist/jeb/JebProviderIdentity.js
var JEB_PROVIDER_IDENTITY;
function init_JebProviderIdentity() {
	return (init_JebProviderIdentity = __esmMin((() => {
		JEB_PROVIDER_IDENTITY = {
			id: "jeb",
			name: "JEB",
			version: null
		};
	})))();
}

//#endregion
//#region dist/jeb/JebMcpConnectionOwner.js
var JebMcpPhysicalFailure, JebMcpCleanupFailure, JebMcpConnectionOwner;
function init_JebMcpConnectionOwner() {
	return (init_JebMcpConnectionOwner = __esmMin((() => {
		init_StructuredContentMcpClient();
		init_resources();
		init_providerCleanupError();
		init_SharedStartupAttempt();
		init_Utf8McpResponse();
		init_errorMessage();
		JebMcpPhysicalFailure = class extends Error {
			phase;
			cause;
			constructor(phase, cause) {
				super(`JEB MCP ${phase} failed`, { cause });
				this.phase = phase;
				this.cause = cause;
				this.name = "JebMcpPhysicalFailure";
			}
		};
		JebMcpCleanupFailure = class extends ProviderCleanupError {
			primaryFailure;
			cleanupFailure;
			constructor(primaryFailure, cleanupFailure, operation) {
				super("jeb", cleanupFailure.cleanupResources, { reason: "JEB MCP operation and cleanup failed" }, {
					operation,
					cause: new AggregateError([primaryFailure, cleanupFailure], "JEB MCP operation and cleanup failed", { cause: primaryFailure })
				});
				this.primaryFailure = primaryFailure;
				this.cleanupFailure = cleanupFailure;
				this.bindCleanupDependencies([cleanupFailure]).bindCleanupResourceOwner(cleanupFailure);
			}
		};
		JebMcpConnectionOwner = class {
			client = new StructuredContentMcpClient({
				name: "rea-jeb",
				version: "0.0.0"
			});
			transport;
			signal = new AbortController();
			tools;
			acquisition;
			acquisitionFailure;
			invalidation;
			#clientResource;
			#transportResource;
			#lease;
			#clientClosed = false;
			#transportClosed = false;
			#disposal;
			#httpUtf8Failure;
			constructor(endpoint) {
				this.transport = new StreamableHTTPClientTransport(endpoint, {
					requestInit: { redirect: "error" },
					fetch: async (input, init) => validateMcpHttpResponse(await fetch(input, init), (failure) => {
						this.#httpUtf8Failure ??= failure;
						this.tools = undefined;
						void this.transport.close().catch(() => undefined);
					})
				});
				this.#clientResource = `${endpoint} (JEB MCP client)`;
				this.#transportResource = `${endpoint} (JEB MCP transport)`;
				this.#lease = new AnalysisCleanupLease(() => this.#dispose(), [this.#clientResource, this.#transportResource]);
			}
			get disposing() {
				return this.#disposal !== undefined;
			}
			/** Attribute only the actual transport close caused by malformed response bytes. */
			responseFailure(cause) {
				return this.#httpUtf8Failure !== undefined && cause instanceof SdkError && cause.code === SdkErrorCode.ConnectionClosed ? this.#httpUtf8Failure : cause;
			}
			get cleanupResources() {
				return [...this.#clientClosed ? [] : [this.#clientResource], ...this.#transportClosed ? [] : [this.#transportResource]];
			}
			close() {
				return this.#lease.release();
			}
			async #dispose() {
				if (this.#disposal !== undefined) return this.#disposal;
				const disposal = this.#closeResources();
				this.#disposal = disposal;
				try {
					await disposal;
				} catch (cause) {
					this.#disposal = undefined;
					throw cause;
				}
			}
			async #closeResources() {
				const failures = [];
				if (!this.#clientClosed) {
					const attached = this.client.transport === this.transport;
					try {
						await this.client.close();
						this.#clientClosed = true;
						if (attached) this.#transportClosed = true;
					} catch (cause) {
						failures.push(cause);
					}
				}
				if (!this.#transportClosed) {
					try {
						await this.transport.close();
						this.#transportClosed = true;
					} catch (cause) {
						failures.push(cause);
					}
				}
				if (failures.length === 0) return;
				const failure = new ProviderCleanupError("jeb", this.cleanupResources, { reason: failures.map((cause) => errorMessage(cause)).join("; ") }, {
					operation: "close_jeb_connection",
					cause: new AggregateError(failures, "JEB MCP connection cleanup failed")
				}).bindCleanupResourceOwner(this);
				this.#lease.bindCleanupError(failure);
				throw failure;
			}
		};
	})))();
}

//#endregion
//#region dist/jeb/JebMcpDeadline.js
var selectedJebMcpTimeout, jebMcpTimeoutGuidance, JebMcpDeadline;
function init_JebMcpDeadline() {
	return (init_JebMcpDeadline = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisSettingDefinitions();
		init_analysisOperationSnapshot();
		init_analysisResourceLimits();
		init_ProviderDeadline();
		selectedJebMcpTimeout = (launchMs) => {
			const override = currentAnalysisOperationSnapshot()?.overrides["jeb.mcp_timeout_ms"];
			if (override !== undefined) return {
				ms: override,
				source: "runtime"
			};
			if (launchMs !== undefined) return {
				ms: launchMs,
				source: "setting"
			};
			return {
				ms: DEFAULT_JEB_MCP_TIMEOUT_MS,
				source: "default"
			};
		};
		jebMcpTimeoutGuidance = (phase, timeoutMs, source) => {
			const limit = analysisSettingLimit("jeb.mcp_timeout_ms", timeoutMs, source);
			return {
				userMessage: `This request reached REA's configured JEB ${phase === "discovery" ? "catalog discovery" : phase} deadline of ${String(timeoutMs)} ms (deadlineExpired).`,
				remediationAction: `jeb.mcp_timeout_ms is ${String(timeoutMs)} ms (source ${source}; default ${String(DEFAULT_JEB_MCP_TIMEOUT_MS)} ms, floor ${String(limit.minimum)} ms, maximum ${String(limit.maximum)} ms). It can be changed at runtime with update_analysis_settings. The launch seed is REA_JEB_MCP_TIMEOUT_MS. The same setting raises catalog discovery and each tools/call. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`,
				limit
			};
		};
		JebMcpDeadline = class {
			phase;
			operation;
			#deadline;
			#controller = new AbortController();
			#interruption = new SdkError(SdkErrorCode.RequestTimeout, "JEB MCP interrupted");
			#caller;
			#reported;
			#cancelledBy;
			#onAbort = () => {
				if (this.#deadline.interruption === "timeout") this.#reported = this.#timeout(this.#deadline.signal.reason);
				else {
					this.#cancelledBy = this.#caller?.aborted === true ? "caller" : "owner";
					this.#reported = cancelledBy(this.operation, this.#deadline.signal);
				}
				this.#controller.abort(this.#interruption);
			};
			timeoutMs;
			source;
			constructor(selected, phase, operation, signals) {
				this.phase = phase;
				this.operation = operation;
				this.timeoutMs = selected.ms;
				this.source = selected.source;
				this.#caller = signals.caller;
				this.#deadline = new ProviderStartupDeadline(selected.ms, signals.caller === undefined ? signals.owner : AbortSignal.any([signals.caller, signals.owner]));
				if (this.#deadline.signal.aborted) this.#onAbort();
				else this.#deadline.signal.addEventListener("abort", this.#onAbort, { once: true });
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
					...jebMcpTimeoutGuidance(this.phase, this.timeoutMs, this.source)
				});
			}
			/**
			* This deadline's own report for an SDK rejection it caused: its recorded
			* interruption, or the SDK's request timeout under this deadline's budget.
			* Undefined for any other SDK failure.
			*/
			interruption(rejection) {
				if (rejection === this.#interruption) return this.#reported;
				if (rejection.code === SdkErrorCode.RequestTimeout) return this.#timeout(rejection);
				return undefined;
			}
			dispose() {
				this.#deadline.signal.removeEventListener("abort", this.#onAbort);
				this.#deadline.dispose();
			}
		};
	})))();
}

//#endregion
//#region dist/jeb/JebMcpConnection.js
var JEB_ENGINE_TOOLS, RELEVANT_ENGINE_TOOLS, toolResultSchema, decodeJebToolResult, isJebFailureEnvelope, createStreamableHttpJebMcpConnection, readToolNames, physicalFailure;
function init_JebMcpConnection() {
	return (init_JebMcpConnection = __esmMin((() => {
		init_McpToolResult();
		init_jsonValue();
		init_analysisErrorCore();
		init_JebMcpConnectionOwner();
		init_providerCleanupError();
		init_analysisErrorBase();
		init_SharedStartupAttempt();
		init_result();
		init_JebMcpDeadline();
		JEB_ENGINE_TOOLS = {
			inspect_jeb_client: "get_client_information",
			open_jeb_project: "open_project",
			list_jeb_units: "list_units",
			decompile_jeb_item: "decompile_code_item"
		};
		RELEVANT_ENGINE_TOOLS = new Set(Object.values(JEB_ENGINE_TOOLS));
		toolResultSchema = mcpToolResultSchema.extend({ content: mcpToolResultSchema.shape.content.default([]) });
		decodeJebToolResult = (input) => {
			const result = toolResultSchema.parse(input);
			const blocks = mcpTextBlocks(result.content);
			let decoded;
			if (result.structuredContent !== undefined) {
				decoded = jsonObjectSchema.parse(result.structuredContent);
			} else {
				if (blocks.length !== 1) throw new AnalysisProtocolError("JEB MCP omitted a single structured or text result; unsupported content cannot establish an empty observation.");
				const text = decodeMcpJsonText(blocks[0]);
				if (!text.ok && result.isError !== true) throw new AnalysisProtocolError("JEB MCP returned malformed JSON text", {
					cause: text.error.cause,
					diagnostics: { upstream_response: blocks[0] }
				});
				decoded = text.ok ? text.value : blocks[0];
			}
			if (result.isError === true && !isJebFailureEnvelope(decoded)) throw new AnalysisProtocolError(`JEB MCP tool failed: ${blocks[0] ?? "error-marked result without a JEB failure envelope"}`, { cause: decoded });
			return decoded;
		};
		isJebFailureEnvelope = (value) => isRecord(value) && value.success === false;
		createStreamableHttpJebMcpConnection = (endpoint, timeouts) => {
			const discoveryTimeout = () => selectedJebMcpTimeout(timeouts?.discoveryTimeoutMs);
			const requestTimeout = () => selectedJebMcpTimeout(timeouts?.requestTimeoutMs);
			let state;
			let sessionGeneration = 0;
			let closing;
			let closed = false;
			const waitForAcquisition = async (owner, attempt, signal) => {
				const waited = await attempt.wait(signal);
				const outcome = waited.status === "cancelled" ? owner.acquisitionFailure === undefined ? undefined : await attempt.promise : waited.value;
				if (outcome !== undefined && !outcome.ok) throw outcome.error;
				if (outcome === undefined || signal?.aborted === true) throw cancelledBy("jeb_mcp_catalog", carriedReason(signal?.reason));
				return outcome.value;
			};
			const dispose = async (owner) => {
				await owner.close();
				if (state === owner) state = undefined;
			};
			const invalidate = async (owner, cause, operation) => {
				if (owner.invalidation === undefined) {
					owner.tools = undefined;
					const failure = (async () => {
						owner.signal.abort(cause);
						try {
							await dispose(owner);
						} catch (cleanupCause) {
							if (!(cleanupCause instanceof ProviderCleanupError)) return new AggregateError([cause, cleanupCause], "JEB MCP operation and cleanup failed", { cause });
							return new JebMcpCleanupFailure(cause, cleanupCause, operation);
						}
						return cause;
					})();
					const invalidation = {
						failure,
						settled: false
					};
					owner.invalidation = invalidation;
					void failure.then(() => {
						invalidation.settled = true;
					});
				}
				throw await owner.invalidation.failure;
			};
			const requestFailure = (owner, deadline, phase, cause) => {
				const interruption = cause instanceof SdkError ? deadline.interruption(cause) : undefined;
				if (interruption instanceof AnalysisCancelledError && (closed || deadline.cancelledBy === "caller")) return Promise.reject(interruption);
				return invalidate(owner, interruption ?? physicalFailure(phase, owner.responseFailure(cause)), deadline.operation);
			};
			const connect = async (signal) => {
				if (signal?.aborted === true) throw cancelledBy("jeb_mcp_catalog", signal);
				if (closing !== undefined) await closing;
				if (closed) {
					if (state !== undefined) await dispose(state);
					throw new AnalysisProtocolError("JEB MCP connection is closed");
				}
				if (state?.invalidation !== undefined && !state.invalidation.settled) throw await state.invalidation.failure;
				if (state?.tools !== undefined && !state.disposing) return state.tools;
				if (state?.acquisition !== undefined) return waitForAcquisition(state, state.acquisition, signal);
				if (state !== undefined) {
					await dispose(state);
					if (state !== undefined || closing !== undefined) return connect(signal);
				}
				const owner = new JebMcpConnectionOwner(endpoint);
				state = owner;
				const acquisition = new SharedStartupAttempt(async (startupSignal) => {
					const selected = discoveryTimeout();
					const deadline = new JebMcpDeadline(selected, "discovery", "jeb_mcp_catalog", { owner: startupSignal });
					try {
						await owner.client.connect(owner.transport, {
							signal: deadline.signal,
							timeout: deadline.remainingMs()
						});
						const tools = await readToolNames(owner.client, deadline);
						deadline.signal.throwIfAborted();
						owner.tools = tools;
						sessionGeneration += 1;
						return ok(tools);
					} catch (cause) {
						const failure = (cause instanceof SdkError ? deadline.interruption(cause) : undefined) ?? physicalFailure("catalog", owner.responseFailure(cause));
						owner.acquisitionFailure = { cause: failure };
						owner.signal.abort(failure);
						try {
							await dispose(owner);
						} catch (cleanupCause) {
							if (!(cleanupCause instanceof ProviderCleanupError)) throw cleanupCause;
							return err(new JebMcpCleanupFailure(failure, cleanupCause, "jeb_mcp_catalog"));
						}
						return err(failure);
					} finally {
						deadline.dispose();
					}
				}, owner.signal.signal);
				owner.acquisition = acquisition;
				const clearAcquisition = () => {
					if (owner.acquisition === acquisition) owner.acquisition = undefined;
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
					const tools = await connect(signal);
					if (!existing) return tools;
					const owner = state;
					if (owner === undefined) throw new AnalysisProtocolError("JEB MCP client failed to connect");
					const selected = discoveryTimeout();
					const deadline = new JebMcpDeadline(selected, "discovery", "jeb_mcp_catalog", {
						caller: signal,
						owner: owner.signal.signal
					});
					try {
						const refreshed = await readToolNames(owner.client, deadline);
						owner.tools = refreshed;
						return refreshed;
					} catch (cause) {
						return await requestFailure(owner, deadline, "catalog", cause);
					} finally {
						deadline.dispose();
					}
				},
				async call(name, args, signal) {
					await connect(signal);
					const owner = state;
					if (owner === undefined || owner.tools === undefined) throw new AnalysisProtocolError("JEB MCP client failed to connect");
					const selected = requestTimeout();
					const deadline = new JebMcpDeadline(selected, "tools/call", name, {
						caller: signal,
						owner: owner.signal.signal
					});
					let result;
					try {
						result = await owner.client.callTool({
							name,
							arguments: args
						}, {
							timeout: deadline.remainingMs(),
							signal: deadline.signal
						});
					} catch (cause) {
						return await requestFailure(owner, deadline, "tool", cause);
					} finally {
						deadline.dispose();
					}
					return decodeJebToolResult(result);
				},
				async close() {
					closed = true;
					if (closing !== undefined) return closing;
					const operation = (async () => {
						const owner = state;
						if (owner === undefined) return;
						owner.tools = undefined;
						owner.signal.abort(OwnerCancellation.ownerClosed);
						if (owner.acquisition !== undefined) await owner.acquisition.promise.catch(() => undefined);
						if (state === owner) await dispose(owner);
					})();
					closing = operation;
					try {
						await operation;
					} finally {
						if (closing === operation) closing = undefined;
					}
				}
			};
		};
		readToolNames = async (client, deadline) => {
			const names = new Set();
			let cursor;
			do {
				deadline.signal.throwIfAborted();
				const page = await client.request({
					method: "tools/list",
					...cursor === undefined ? {} : { params: { cursor } }
				}, {
					signal: deadline.signal,
					timeout: deadline.remainingMs()
				});
				for (const tool of page.tools) if (RELEVANT_ENGINE_TOOLS.has(tool.name)) names.add(tool.name);
				const next = page.nextCursor;
				if (next !== undefined && next === cursor) throw new AnalysisProtocolError("JEB MCP repeated a tool catalog cursor");
				deadline.signal.throwIfAborted();
				if (names.size === RELEVANT_ENGINE_TOOLS.size) return [...names];
				cursor = next;
			} while (cursor !== undefined);
			return [...names];
		};
		physicalFailure = (phase, cause) => cause instanceof AnalysisError ? cause : new JebMcpPhysicalFailure(phase, cause);
	})))();
}

//#endregion
//#region dist/jeb/JebProvider.js
var JEB_CONNECTION_REMEDIATION, failure, clientInformation, unitEntry, openProject, listUnits, decompiledItem, envelope, JEB_JVM, refusalExhaustion, parseJebEnvelope, JebProvider;
function init_JebProvider() {
	return (init_JebProvider = __esmMin((() => {
		init_JebProviderIdentity();
		init_JebMcpConnectionOwner();
		init_analysisObservation();
		init_jsonValue();
		init_analysisErrorCleanup();
		init_AnalysisProvider();
		init_jebAnalysis();
		init_analysisErrorCore();
		init_RuntimeExhaustion();
		init_classifyProviderFailure();
		init_analysisErrorBase();
		init_providerAdapterError();
		init_analysisErrorProjection();
		init_result();
		init_jebMcpEndpoint();
		init_JebMcpConnection();
		init_errorMessage();
		JEB_CONNECTION_REMEDIATION = `Start a JEB client serving MCP (default ${DEFAULT_JEB_MCP_ENDPOINT}) or set REA_JEB_MCP_URL to the running endpoint.`;
		failure = z.object({
			success: z.literal(false),
			message: z.string().optional(),
			error: z.object({
				code: z.string().optional(),
				message: z.string().optional(),
				recovery_tool: z.string().optional(),
				recovery_required_before_retry: z.boolean().optional()
			}).optional()
		}).passthrough();
		clientInformation = z.object({
			success: z.literal(true),
			version: z.string().optional(),
			gui_client: z.boolean().optional(),
			startup_ts: z.int().nonnegative().optional(),
			message: z.string().nullish()
		}).passthrough();
		unitEntry = z.object({
			unit_path: z.string(),
			unit_type: z.string()
		});
		openProject = z.object({
			success: z.literal(true),
			name: z.string().nullish(),
			creation_datetime: z.string().nullish(),
			input_files: z.array(z.object({
				file_name: z.string(),
				file_size: z.int().nonnegative(),
				contents_sha256_hash: z.string()
			})),
			units: z.array(unitEntry)
		}).passthrough();
		listUnits = z.object({
			success: z.literal(true),
			units: z.array(unitEntry)
		}).passthrough();
		decompiledItem = z.object({
			success: z.literal(true),
			text: z.string()
		}).passthrough();
		envelope = z.discriminatedUnion("success", [z.object({ success: z.literal(true) }).passthrough(), failure]);
		JEB_JVM = {
			program: "JEB's",
			role: "engine",
			raise: (option) => `Restart the JEB client with a larger ${option}`,
			settings: "the JEB client's JVM memory settings",
			threads: "Reduce concurrent work in the JEB client or review the engine host's thread and process limits",
			smaller: "select a smaller input"
		};
		refusalExhaustion = (operation, refusal, diagnostics) => {
			const line = [refusal.error?.message, refusal.message].find((value) => value?.includes(RUNTIME_EXHAUSTION_TOKENS.jvm) === true);
			if (line === undefined) return undefined;
			const area = jvmExhaustionArea(line);
			const threads = area === "native-thread";
			return new AnalysisResourceConstraintError(operation, threads ? "capacity" : "memory", `JEB reported that its Java virtual machine ran out of memory${threads ? " (unable to create a native thread)" : ""}. This is the engine's report and does not prove the exact allocation failure.`, null, {
				diagnostics: {
					...diagnostics,
					jvm_exhaustion_area: area ?? null
				},
				remediationAction: externalJvmExhaustionRecovery(area, JEB_JVM)
			});
		};
		parseJebEnvelope = (payload, operation, endpoint, input) => {
			const diagnostics = {
				endpoint,
				upstream_response: payload,
				...input === undefined ? {} : { input: Object.fromEntries(Object.entries(input).filter((entry) => entry[1] !== undefined)) }
			};
			const parsed = envelope.safeParse(payload);
			if (!parsed.success) return err(new AnalysisProtocolError("JEB MCP omitted or malformed its observation envelope", {
				cause: parsed.error,
				diagnostics
			}));
			if (parsed.data.success) return ok(payload);
			const refusal = parsed.data;
			const exhausted = refusalExhaustion(operation, refusal, diagnostics);
			if (exhausted !== undefined) return err(exhausted);
			const reason = [
				refusal.error?.message,
				refusal.message,
				refusal.error?.code
			].find((value) => value !== undefined && value.trim().length > 0);
			return err(new ProviderAdapterError("jeb", operation, {
				userMessage: reason ?? "The engine refused the request",
				diagnostics
			}));
		};
		JebProvider = class {
			#connection;
			#endpoint;
			/** Caller-selected spelling, retained only after endpoint admission succeeds. */
			#selectedEndpoint;
			#clientInformation;
			#informationGeneration;
			#identity(version) {
				return {
					...JEB_PROVIDER_IDENTITY,
					version: version ?? null
				};
			}
			constructor(options = {}) {
				const environment = options.environment ?? {};
				const endpoint = parseJebMcpEndpoint(environment.REA_JEB_MCP_URL);
				if (!endpoint.ok) throw endpoint.error;
				this.#endpoint = endpoint.value;
				this.#selectedEndpoint = environment.REA_JEB_MCP_URL || "http://127.0.0.1:8425/mcp";
				const createConnection = options.connectionFactory ?? createStreamableHttpJebMcpConnection;
				const timeouts = {
					...options.discoveryTimeoutMs === undefined ? {} : { discoveryTimeoutMs: options.discoveryTimeoutMs },
					...options.requestTimeoutMs === undefined ? {} : { requestTimeoutMs: options.requestTimeoutMs }
				};
				this.#connection = Object.keys(timeouts).length === 0 ? createConnection(this.#endpoint) : createConnection(this.#endpoint, timeouts);
			}
			async inspectAvailability(signal) {
				try {
					const tools = new Set(await this.#connection.listTools(signal));
					const { information } = await this.#refreshClientInformation("inspect_jeb_client", signal);
					return {
						status: "available",
						code: null,
						reason: null,
						supportedOperations: Object.keys(JEB_ENGINE_TOOLS).filter((operation) => tools.has(JEB_ENGINE_TOOLS[operation])),
						diagnostics: {
							endpoint: this.#selectedEndpoint,
							engine_version: information.version ?? null
						}
					};
				} catch (cause) {
					if (signal?.aborted === true) throw cause;
					if (cause instanceof AnalysisError) {
						if (cause.cleanupIncomplete) throw this.#attributed("inspect_jeb_client", cause);
						const projected = projectAnalysisError(cause);
						return {
							status: "unavailable",
							code: "runtime_unavailable",
							reason: projected.message,
							remediation: projected.remediation.action,
							diagnostics: {
								...cause.diagnostics,
								endpoint: this.#selectedEndpoint
							}
						};
					}
					return {
						status: "unavailable",
						code: "not_configured",
						reason: `${cause instanceof Error ? cause.message : "The JEB MCP endpoint did not respond"}.`,
						remediation: JEB_CONNECTION_REMEDIATION,
						diagnostics: { endpoint: this.#selectedEndpoint }
					};
				}
			}
			async close() {
				await this.#connection.close();
			}
			async execute(request, options) {
				if (options?.signal?.aborted === true) return err(cancelledBy(request.operation, options.signal, { diagnostics: { endpoint: this.#selectedEndpoint } }));
				try {
					const execution = await this.#dispatch(request, options?.signal);
					return execution;
				} catch (cause) {
					return err(this.#attributed(request.operation, classifyProviderFailure(cause, this.#dialect(request.operation))));
				}
			}
			async #dispatch(request, signal) {
				const cancelled = (operation) => {
					if (signal?.aborted === true) throw cancelledBy(operation, signal);
				};
				switch (request.operation) {
					case "inspect_jeb_client": {
						cancelled(request.operation);
						return this.#inspectClient(signal);
					}
					case "open_jeb_project": {
						cancelled(request.operation);
						return this.#openProject(request, signal);
					}
					case "list_jeb_units": {
						cancelled(request.operation);
						return this.#listUnits(request, signal);
					}
					case "decompile_jeb_item": {
						cancelled(request.operation);
						return this.#decompileItem(request, signal);
					}
				}
			}
			async #engine(operation, signal) {
				const information = this.#informationGeneration === this.#connection.sessionGeneration && this.#clientInformation !== undefined ? this.#clientInformation : (await this.#refreshClientInformation(operation, signal)).information;
				return {
					name: "jeb",
					version: information.version ?? null,
					endpoint: this.#selectedEndpoint,
					gui_client: information.gui_client ?? null
				};
			}
			async #engineForObservation(request, payload, observation, signal) {
				try {
					return await this.#engine(request.operation, signal);
				} catch (cause) {
					throw this.#attributed(request.operation, classifyProviderFailure(cause, this.#dialect(request.operation))).retainPartialObservation(createAnalysisExecutionEvidence(request.operation, request.input, createAnalysisExecution({
						status: "partial",
						observation: jsonValueSchema.parse(observation),
						engine_metadata: null
					}, JEB_PROVIDER_IDENTITY, {
						rawResult: payload,
						limitations: ["The primary engine reply completed; client metadata was not obtained, so the full operation result could not be assembled."]
					}), "observed"));
				}
			}
			async #refreshClientInformation(operation, signal) {
				if (signal?.aborted === true) throw cancelledBy(operation, signal);
				const payload = await this.#connection.call("get_client_information", {}, signal);
				const information = clientInformation.parse(this.#requireSuccess(payload, operation, operation === "inspect_jeb_client" ? {} : undefined));
				this.#clientInformation = {
					version: information.version,
					gui_client: information.gui_client
				};
				this.#informationGeneration = this.#connection.sessionGeneration;
				return {
					information,
					payload
				};
			}
			async #inspectClient(signal) {
				const { information, payload } = await this.#refreshClientInformation("inspect_jeb_client", signal);
				const result = jebResultSchemas.inspect_jeb_client.parse({
					engine: {
						name: "jeb",
						version: information.version ?? null,
						endpoint: this.#selectedEndpoint,
						gui_client: information.gui_client ?? null
					},
					startup_ts: information.startup_ts ?? null,
					message: information.message ?? null
				});
				return ok(createAnalysisExecution(result, this.#identity(information.version), {
					rawResult: payload,
					limitations: information.version === undefined ? ["The engine did not report its version."] : []
				}));
			}
			async #openProject(request, signal) {
				const payload = await this.#connection.call("open_project", { file_path: request.input.path }, signal);
				const opened = openProject.parse(this.#requireSuccess(payload, request.operation, request.input));
				const engine = await this.#engineForObservation(request, payload, opened, signal);
				const result = jebResultSchemas.open_jeb_project.parse({
					engine,
					project_name: opened.name ?? null,
					creation_datetime: opened.creation_datetime ?? null,
					input_files: opened.input_files,
					units: opened.units
				});
				return ok(createAnalysisExecution(result, this.#identity(engine.version), {
					rawResult: payload,
					limitations: ["JEB resolves and analyzes the artifact on the engine host; REA did not open the target itself."]
				}));
			}
			async #listUnits(request, signal) {
				const { count, index, filter, parent_unit_path } = request.input;
				const payload = await this.#connection.call("list_units", {
					count,
					index,
					...filter === undefined ? {} : { filter },
					...parent_unit_path === undefined ? {} : { parent_unit_path }
				}, signal);
				const listed = listUnits.parse(this.#requireSuccess(payload, request.operation, request.input));
				const units = listed.units;
				const engine = await this.#engineForObservation(request, payload, listed, signal);
				const result = jebResultSchemas.list_jeb_units.parse({
					engine,
					filter: filter ?? null,
					parent_unit_path: parent_unit_path ?? null,
					index,
					count,
					units,
					coverage: units.length < count ? "complete" : "partial"
				});
				return ok(createAnalysisExecution(result, this.#identity(engine.version), {
					rawResult: payload,
					limitations: ["The engine caps unit pages at 100; a full page means more units may exist."]
				}));
			}
			async #decompileItem(request, signal) {
				const { item_address, item_kind, unit_path } = request.input;
				const payload = await this.#connection.call("decompile_code_item", {
					item_address,
					item_kind,
					...unit_path === undefined ? {} : { unit_path }
				}, signal);
				const decompiled = decompiledItem.parse(this.#requireSuccess(payload, request.operation, request.input));
				const engine = await this.#engineForObservation(request, payload, decompiled, signal);
				const result = jebResultSchemas.decompile_jeb_item.parse({
					engine,
					unit_path: unit_path ?? null,
					item_address,
					item_kind,
					text: decompiled.text
				});
				return ok(createAnalysisExecution(result, this.#identity(engine.version), {
					rawResult: payload,
					limitations: unit_path === undefined ? ["The engine selected the project's first code unit implicitly; the effective unit identity is unknown."] : []
				}));
			}
			#requireSuccess(payload, operation, input) {
				const parsed = parseJebEnvelope(payload, operation, this.#selectedEndpoint, input);
				if (!parsed.ok) throw parsed.error;
				return parsed.value;
			}
			/** How JEB's raw MCP failures are reported for one operation. */
			#dialect(operation) {
				const diagnostics = { endpoint: this.#selectedEndpoint };
				return {
					providerId: "jeb",
					operation,
					recognise: (cause) => cause instanceof z.ZodError ? new AnalysisProtocolError("JEB omitted or malformed required observation fields", {
						cause,
						diagnostics
					}) : undefined,
					unclassified: (cause) => {
						const physical = cause instanceof JebMcpPhysicalFailure ? cause.cause : cause;
						return new AnalysisCapabilityUnavailableError("jeb", operation, errorMessage(physical), {
							cause,
							diagnostics,
							userMessage: JEB_CONNECTION_REMEDIATION
						});
					}
				};
			}
			/**
			* Report a classified failure under the REA operation that observed it. A
			* shared MCP phase, such as catalog discovery or a tools/call, reports its
			* own interruption under that phase; the operation and endpoint are added
			* here, keeping the phase's cleanup ownership.
			*/
			#attributed(operation, failure) {
				if (failure instanceof JebMcpCleanupFailure) return analysisErrorWithCleanupDependencies(this.#attributed(operation, classifyProviderFailure(failure.primaryFailure, this.#dialect(operation))), failure.cleanupFailure, operation).bindCleanupResourceOwner(failure.cleanupFailure);
				if (failure instanceof AnalysisCancelledError || failure instanceof AnalysisTimeoutError) {
					const options = {
						diagnostics: {
							...failure.diagnostics,
							endpoint: this.#selectedEndpoint
						},
						capturedOutput: failure.capturedOutput,
						cleanup: failure.cleanup,
						partialObservation: failure.partialObservation
					};
					const attributed = failure instanceof AnalysisTimeoutError ? new AnalysisTimeoutError(operation, failure.timeoutMs, {
						...options,
						cause: failure.cause,
						...failure.userMessage === undefined ? {} : { userMessage: failure.userMessage },
						...failure.remediationAction === undefined ? {} : { remediationAction: failure.remediationAction },
						...failure.limit === undefined ? {} : { limit: failure.limit }
					}) : cancelledBy(operation, failure, options);
					return attributed.bindCleanupDependencies([failure]).bindCleanupResourceOwner(failure);
				}
				return failure.retainDiagnostics({ endpoint: this.#selectedEndpoint });
			}
		};
	})))();
}

//#endregion
//#region dist/composition/jeb.js
var createJebAnalysisProvider, unconfiguredJebProvider;
function init_jeb() {
	return (init_jeb = __esmMin((() => {
		init_environment();
		init_configurationErrors();
		init_analysisErrorCore();
		init_analysisErrorPresentation();
		init_analysisOperationSnapshot();
		init_result();
		init_JebProvider();
		createJebAnalysisProvider = (environment = process.env, connectionFactory) => {
			const requestTimeout = parseJebMcpTimeoutMs(environment.REA_JEB_MCP_TIMEOUT_MS);
			const build = () => {
				try {
					return new JebProvider({
						environment,
						...requestTimeout.ok && requestTimeout.value !== undefined ? {
							requestTimeoutMs: requestTimeout.value,
							discoveryTimeoutMs: requestTimeout.value
						} : {},
						...connectionFactory === undefined ? {} : { connectionFactory }
					});
				} catch (cause) {
					if (!(cause instanceof AnalysisInputError)) throw cause;
					const constraint = typeof cause.cause === "string" ? cause.cause : cause.message;
					return unconfiguredJebProvider(new ConfigurationError("Invalid REA environment configuration", {
						cause,
						settings: [{
							setting: "REA_JEB_MCP_URL",
							constraint
						}]
					}));
				}
			};
			if (requestTimeout.ok) return build();
			const rejected = unconfiguredJebProvider(requestTimeout.error);
			let provider;
			const live = () => provider ??= build();
			const overrideActive = () => currentAnalysisOperationSnapshot()?.overrides["jeb.mcp_timeout_ms"] !== undefined;
			return {
				inspectAvailability: (signal) => overrideActive() ? live().inspectAvailability(signal) : rejected.inspectAvailability(signal),
				close: () => provider === undefined ? Promise.resolve() : provider.close(),
				execute: (request, options) => overrideActive() ? live().execute(request, options) : rejected.execute(request, options)
			};
		};
		unconfiguredJebProvider = (error) => {
			const setting = error.settings[0]?.setting ?? "REA_JEB_MCP_URL";
			return {
				inspectAvailability: () => Promise.resolve({
					status: "unavailable",
					code: "not_configured",
					reason: `${setting} is invalid: ${error.settings[0]?.constraint ?? error.message}`,
					remediation: analysisErrorRemediationAction(error),
					diagnostics: { setting }
				}),
				close: () => Promise.resolve(),
				execute: () => Promise.resolve(err(error))
			};
		};
	})))();
}

//#endregion
//#region dist/cli/jebCommands.js
var jebCommands_exports = /* @__PURE__ */ __exportAll({ registerJebCommands: () => registerJebCommands });
var registerJebCommands;
function init_jebCommands() {
	return (init_jebCommands = __esmMin((() => {
		init_JebAnalysisService();
		init_jeb();
		init_jebToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_cliEvidenceCallerPath();
		init_projectCliAnalysisResult();
		registerJebCommands = (cli, logger, environment, provider = createJebAnalysisProvider(environment)) => {
			const service = new JebAnalysisService(provider);
			const run = (operation) => () => ({
				inspect: (input, { signal }) => service.execute(operation, input, { signal }),
				close: () => provider.close()
			});
			const contract = (name) => contractNamed(JEB_TOOL_CONTRACTS, name);
			registerContractCommand(cli, logger, contract("inspect_jeb_client"), { description: "Inspect the running JEB MCP client without opening a target" }, analyzeWithService(run("inspect_jeb_client"), "jeb"));
			registerContractCommand(cli, logger, contract("open_jeb_project"), {
				description: "Open or create a JEB project from an artifact or .jdb2 database",
				positionals: ["path"]
			}, (input, { operation, signal }) => {
				const owned = run("open_jeb_project")();
				return finishCliEvidenceCommand(input.path, () => owned.inspect(input, { signal }), owned, "jeb", operation, signal).then(projectCliAnalysisResult);
			});
			registerContractCommand(cli, logger, contract("list_jeb_units"), { description: "List JEB project units by path and type with optional filter" }, analyzeWithService(run("list_jeb_units"), "jeb"));
			registerContractCommand(cli, logger, contract("decompile_jeb_item"), {
				description: "Decompile one JEB type or method to engine pseudo-code",
				positionals: ["item_address", "item_kind"]
			}, analyzeWithService(run("decompile_jeb_item"), "jeb"));
		};
	})))();
}

//#endregion
export { init_jebCommands, jebCommands_exports };