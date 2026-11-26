import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, OwnerCancellation, cancelledBy, carriedReason, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation, init_isRecord, init_jsonValue, isRecord, jsonObjectSchema } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { BrowserObservationError, ProviderAdapterError, init_browserObservationError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { ProviderCleanupError, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { browserUrlTargetIdentity, cdpCleanupGraceExpired, cdpCommandDeadlineRecovery, init_browserDeadline, init_browserObservation, sanitizeBrowserUrl, selectedCdpCommandTimeoutMs } from "./browserObservation-BVcDYwHI.js";
import { cdpResourceColumnSchema, init_cdpObservationSchemas, init_webContentArtifact, webTextFacts } from "./browserObservationSchemas-D0tzRJhs.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { completeProviderEvidence, init_ProviderOperationExecution, keepIncompleteObservation } from "./ProviderOperationExecution-DJuOJe_5.js";
import { cliProgressReporter, init_cliProgress } from "./cliProgress-BqujgRoY.js";
import { CdpTargetDocument, authorizeCdpTarget, authorizedMainFrame, browserTargetProjection, cdpOriginScopeRefusal, init_CdpAuthorizedMainFrame, init_CdpAuthorizedTarget, init_CdpOriginScopeError, init_CdpTargetDocument, init_CdpTargetEvents, init_browserContractCommands, onCdpTargetEvent } from "./browserContractCommands-CwIJaahw.js";
import { WEB_RUNTIME_LIMITS, init_webRuntime as init_webRuntime$1 } from "./webRuntime-Bw6nb4fS.js";
import { CdpCommandRejection, CdpTargetSessionOwner, cdpContextFrameClaim, cdpFrameEvent, classifyCdpFrameUrl, discoverCdpEndpoint, init_CdpCaptureDocuments, init_CdpCommandRejection, init_CdpEndpoint, init_CdpEvents, init_CdpFrameTree, init_CdpScriptContextFacts, init_CdpTargetSessionOwner, observedFrameUrl, selectCdpScriptFrame } from "./CdpTargetSessionOwner-Duza6lqo.js";
import { init_CdpTargetSession, openCdpTargetSession } from "./CdpTargetSession-DZuwX6NM.js";
import { CDP_BROWSER_PROVIDER_IDENTITY, init_providerIdentities } from "./providerIdentities-Ao1XTvwx.js";
import { WEB_RUNTIME_TOOL_CONTRACTS, init_webEventListeners, init_webExecution, init_webRuntimeToolContracts, inspectWebEventListenersInputSchema, observeWebExecutionInputSchema, webEventListenersObservationSchema, webEventListenersSchema, webExecutionObservationSchema, webExecutionSchema } from "./webRuntimeToolContracts-C663caIT.js";
import { z } from "zod";
import { randomUUID } from "node:crypto";

//#region dist/application/WebRuntimeService.js
var WebRuntimeService;
function init_WebRuntimeService() {
	return (init_WebRuntimeService = __esmMin((() => {
		init_browserObservation();
		init_analysisErrorCore();
		init_evidence();
		init_result();
		init_webExecution();
		init_webEventListeners();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		WebRuntimeService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			/** Observe externally triggered execution; selection authorizes the declared instrumentation. */
			async observe(rawInput, options) {
				const operation = "observe_web_execution";
				const parsed = parseAnalysisInput(operation, rawInput, observeWebExecutionInputSchema, options?.signal);
				if (!parsed.ok) return parsed;
				const result = await this.provider.observeExecution(parsed.value, options);
				if (!result.ok) return this.retainRuntimePartial(result.error, operation, "Provider retained a non-JSON incomplete execution observation.", (partial) => {
					if (!("instrumentation" in partial) || !("window" in partial)) return undefined;
					const verified = webExecutionObservationSchema.safeParse(partial);
					if (!verified.success) return undefined;
					return this.evidence(operation, parsed.value, verified.data);
				});
				const verified = webExecutionSchema.safeParse(result.value);
				if (!verified.success) return err(new AnalysisOutputError(operation, verified.error.message));
				return this.evidence(operation, parsed.value, verified.data, options);
			}
			/** Inspect one selected node's listener declarations without dispatching an event. */
			async inspect(rawInput, options) {
				const operation = "inspect_web_event_listeners";
				const parsed = parseAnalysisInput(operation, rawInput, inspectWebEventListenersInputSchema, options?.signal);
				if (!parsed.ok) return parsed;
				const result = await this.provider.inspectEventListeners(parsed.value, options);
				if (!result.ok) return this.retainRuntimePartial(result.error, operation, "Provider retained a non-JSON incomplete event-listener observation.", (partial) => {
					if (!("selected_node" in partial) || !("listeners" in partial)) return undefined;
					const verified = webEventListenersObservationSchema.safeParse(partial);
					if (!verified.success) return undefined;
					return this.evidence(operation, parsed.value, verified.data);
				});
				const verified = webEventListenersSchema.safeParse(result.value);
				if (!verified.success) return err(new AnalysisOutputError(operation, verified.error.message));
				return this.evidence(operation, parsed.value, verified.data, options);
			}
			/** Promote a schema-valid partial, or keep a JSON snapshot of an incomplete one. */
			retainRuntimePartial(error, operation, nonJsonReason, promote) {
				const partial = error.partialObservation;
				if (partial !== undefined && !("evidence_id" in partial)) {
					const evidence = promote(partial);
					if (evidence !== undefined) {
						if (evidence.ok) {
							error.partialObservation = evidence.value;
							return err(error);
						}
					}
				}
				return err(keepIncompleteObservation(error, operation, nonJsonReason));
			}
			evidence(operation, input, result, options) {
				if (result.target.target_id !== input.target_id || "observation_ms" in input && (!("window" in result) || result.window.requested_ms !== input.observation_ms) || "selector" in input && (!("selected_node" in result) || result.selected_node.selector !== input.selector)) return err(new AnalysisOutputError(operation, "observation_ms" in input ? "Provider changed the selected target or requested window." : "Provider changed the selected target or node selector."));
				if (input.allowed_origins.length > 0 && !input.allowed_origins.includes(result.target.origin)) return err(new AnalysisOutputError(operation, "Provider returned a document outside the selected origin scope."));
				return completeProviderEvidence(createEvidence(browserUrlTargetIdentity(result.target.initial_url), this.provider.identity(), {
					predicateType: `rea.${operation.replaceAll("_", "-")}`,
					operation,
					parameters: input,
					result,
					confidence: "observed",
					authority: "external-service",
					limitations: result.limitations
				}), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpRuntimeSession.js
var CdpRuntimeSession, runtimeMainFrame, runtimeFrameUrl, runtimeDeadline;
function init_CdpRuntimeSession() {
	return (init_CdpRuntimeSession = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_browserObservationError();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_browserDeadline();
		init_CdpTargetSessionOwner();
		init_CdpCaptureDocuments();
		init_CdpFrameTree();
		init_webRuntime$1();
		init_CdpAuthorizedTarget();
		init_CdpAuthorizedMainFrame();
		init_CdpOriginScopeError();
		init_CdpEndpoint();
		init_CdpTargetSession();
		init_CdpTargetDocument();
		init_errorMessage();
		CdpRuntimeSession = class CdpRuntimeSession {
			transport;
			discovery;
			target;
			allowedOrigins;
			operation;
			options;
			owner;
			commandTimeoutMs;
			document;
			enabledDomains = [];
			preciseCoverageMayBeActive = false;
			#completion;
			#completionTimer;
			constructor(transport, discovery, target, allowedOrigins, operation, options, owner, commandTimeoutMs, document) {
				this.transport = transport;
				this.discovery = discovery;
				this.target = target;
				this.allowedOrigins = allowedOrigins;
				this.operation = operation;
				this.options = options;
				this.owner = owner;
				this.commandTimeoutMs = commandTimeoutMs;
				this.document = document;
			}
			/** Acquire a validated target; failed setup releases its owned socket. */
			static async open(input, operation, options, owner) {
				const commandTimeoutMs = selectedCdpCommandTimeoutMs(input.command_timeout_ms);
				const discovery = await discoverCdpEndpoint(input.cdp_endpoint, operation, options.signal);
				const { target, allowedOrigins } = authorizeCdpTarget(discovery, input, operation);
				const transport = await openCdpTargetSession(discovery, target, operation, options.signal, {
					maxPayloadBytes: WEB_RUNTIME_LIMITS.protocolBytes,
					commandTimeoutMs
				}, owner);
				try {
					const frame = runtimeMainFrame(await runtimeDeadline(operation, options.signal, (signal) => authorizedMainFrame({
						...transport,
						allowedOrigins,
						signal,
						operation
					}), commandTimeoutMs, "command", "Page.getFrameTree"), allowedOrigins, operation);
					const url = runtimeFrameUrl(frame, operation);
					return new CdpRuntimeSession(transport, discovery, {
						target_id: target.id,
						initial_url: url.url,
						origin: url.origin,
						frame_id: frame.id,
						loader_id: frame.loaderId ?? null
					}, allowedOrigins, operation, options, owner, commandTimeoutMs, CdpTargetDocument.watch(transport, frame.document));
				} catch (cause) {
					try {
						await owner.finish(transport.connection);
					} catch (cleanupCause) {
						if (cause instanceof AnalysisError && cleanupCause instanceof AnalysisError) throw analysisErrorWithCleanupFailure(cause, cleanupCause, operation);
						throw new AggregateError([cause, cleanupCause], `CDP runtime setup ${operation} failed and cleanup remains incomplete.`, { cause });
					}
					throw cause;
				}
			}
			/** Bound each command separately from the caller-selected observation duration. */
			async command(method, params) {
				const signals = [this.options.signal, this.#completion?.signal].filter((signal) => signal !== undefined);
				try {
					return await runtimeDeadline(this.operation, signals.length === 0 ? undefined : AbortSignal.any(signals), (signal) => this.transport.connection.send(method, params, this.transport.sessionId, signal), this.commandTimeoutMs, "command", method);
				} catch (cause) {
					if (this.#completion?.signal.aborted && !this.options.signal?.aborted) {
						const recovery = cdpCommandDeadlineRecovery(this.commandTimeoutMs, "source-join");
						throw new AnalysisTimeoutError(this.operation, this.commandTimeoutMs, recovery);
					}
					throw cause;
				}
			}
			/** Bound the complete inspection/source-join phase as well as each individual command. */
			beginCompletion() {
				if (this.#completion !== undefined) return;
				this.#completion = new AbortController();
				this.#completionTimer = setTimeout(() => this.#completion?.abort(OwnerCancellation.deadlineElapsed), this.commandTimeoutMs);
			}
			/** Register cleanup before sending: cancellation can occur after producer acceptance. */
			async enable(domain) {
				this.enabledDomains.push(domain);
				await this.command(`${domain}.enable`);
			}
			/**
			* Check document identity before joining any live node or final coverage
			* evidence. A changed document is reported before scope; scope applies to
			* the current document. Runtime evidence cannot carry limited coverage, so
			* an unprovable document that moved or gained a loader stays a change.
			*/
			async assertDocument() {
				this.#assertObservedDocument();
				const frame = runtimeMainFrame(await this.command("Page.getFrameTree"), this.allowedOrigins, this.operation);
				this.document.observe(frame.document);
				this.#assertObservedDocument();
				runtimeFrameUrl(frame, this.operation, `Selected target ${this.target.target_id} moved to an unselected origin during ${this.operation}.`);
				const selected = this.document.selected;
				if (this.document.compareSelected(frame.document) === "unknown" && (frame.document.url !== selected.url || frame.document.loaderId !== selected.loaderId)) throw this.#documentChanged();
			}
			#assertObservedDocument() {
				if (this.document.changed) throw this.#documentChanged();
				if (this.document.unidentified) throw new BrowserObservationError(this.operation, "protocol_error", { detail: `CDP reported a navigation of selected target ${this.target.target_id} without readable frame identity.` });
			}
			#documentChanged() {
				return new BrowserObservationError(this.operation, "target_changed", { detail: `Selected target ${this.target.target_id} changed document during ${this.operation}.` });
			}
			/** Cleanup uses its own deadline after caller cancellation, then closes REA's transport. */
			async close(previousError, objectGroup) {
				if (this.#completionTimer !== undefined) clearTimeout(this.#completionTimer);
				this.document.close();
				const controller = new AbortController();
				const timer = setTimeout(() => controller.abort(OwnerCancellation.deadlineElapsed), WEB_RUNTIME_LIMITS.cleanupTimeoutMs);
				this.transport.connection.beginCleanupGrace(WEB_RUNTIME_LIMITS.cleanupTimeoutMs);
				const failures = [];
				let transportFailure;
				const send = async (method, params = {}) => {
					try {
						await this.transport.connection.send(method, params, this.transport.sessionId, controller.signal);
					} catch (cause) {
						failures.push(`${method}: ${cause instanceof AnalysisError ? cause.userMessage ?? cause.message : errorMessage(cause)}`);
					}
				};
				try {
					if (this.preciseCoverageMayBeActive) await send("Profiler.stopPreciseCoverage");
					if (objectGroup !== undefined) await send("Runtime.releaseObjectGroup", { objectGroup });
					for (const domain of [...this.enabledDomains].reverse()) await send(`${domain}.disable`);
					if (this.transport.sessionId !== undefined) {
						try {
							await this.transport.connection.send("Target.detachFromTarget", { sessionId: this.transport.sessionId }, undefined, controller.signal);
						} catch (cause) {
							failures.push(`Target.detachFromTarget: ${cause instanceof AnalysisError ? cause.userMessage ?? cause.message : errorMessage(cause)}`);
						}
					}
				} finally {
					clearTimeout(timer);
					if (controller.signal.aborted) failures.push(cdpCleanupGraceExpired());
					try {
						await this.owner.finish(this.transport.connection);
					} catch (cause) {
						transportFailure = cause instanceof AnalysisError ? cause : new ProviderCleanupError("rea-cdp-browser", [this.target.target_id], { reason: errorMessage(cause) }, {
							operation: this.operation,
							cause
						});
						failures.push(`CDP WebSocket close: ${transportFailure.userMessage ?? transportFailure.message}`);
					}
				}
				return failures.length === 0 ? undefined : new ProviderCleanupError("rea-cdp-browser", [this.target.target_id, "runtime-instrumentation"], {
					target_id: this.target.target_id,
					cleanup_failures: failures,
					previous_error: previousError?.userMessage ?? previousError?.message ?? null
				}, {
					operation: this.operation,
					...transportFailure === undefined ? {} : { cause: transportFailure }
				});
			}
		};
		runtimeMainFrame = (tree, allowedOrigins, operation) => {
			const { frameId, loaderId, loaderIssue } = tree.root.facts;
			if (frameId === null || loaderIssue !== null) throw new BrowserObservationError(operation, "protocol_error", { detail: "CDP Page.getFrameTree did not identify the selected main frame's document." });
			return {
				id: frameId,
				loaderId,
				document: {
					frameId,
					loaderId,
					url: observedFrameUrl(tree.root.url)
				},
				...classifyCdpFrameUrl(tree.root.url, allowedOrigins)
			};
		};
		runtimeFrameUrl = (frame, operation, detail) => {
			if (frame.scope === "outside_policy" || frame.scope === "unsupported") throw cdpOriginScopeRefusal(operation, detail === undefined ? {} : { detail });
			if (frame.url === undefined || frame.origin === null) throw new BrowserObservationError(operation, "protocol_error");
			return {
				url: frame.url,
				origin: frame.origin
			};
		};
		runtimeDeadline = async (operation, signal, run, timeoutMs = selectedCdpCommandTimeoutMs(undefined), phase = "command", method) => {
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(OwnerCancellation.deadlineElapsed), timeoutMs);
			try {
				return await run(signal === undefined ? controller.signal : AbortSignal.any([signal, controller.signal]));
			} catch (cause) {
				if (controller.signal.aborted && signal?.aborted !== true) {
					if (cause instanceof AnalysisError && cause.userMessage !== undefined) throw cause;
					const recovery = cdpCommandDeadlineRecovery(timeoutMs, phase, method ?? (phase === "handshake" ? undefined : "session setup"));
					throw new AnalysisTimeoutError(operation, timeoutMs, recovery);
				}
				throw cause;
			} finally {
				clearTimeout(timer);
			}
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpRuntimeRetention.js
var retentionLimit, retentionExceeded, assertRuntimeRetention, RuntimeRetention;
function init_CdpRuntimeRetention() {
	return (init_CdpRuntimeRetention = __esmMin((() => {
		init_analysisErrorCore();
		init_budget();
		init_fixedAllowanceRemediation();
		init_webRuntime$1();
		retentionLimit = (kind) => kind === "sources" ? WEB_RUNTIME_LIMITS.sourceBytes : WEB_RUNTIME_LIMITS.retainedEventBytes;
		retentionExceeded = (operation, kind, retainedBytes) => {
			const limit = retentionLimit(kind);
			const allowance = `Complete browser runtime ${kind} retention`;
			return new AnalysisResourceConstraintError(operation, "capacity", `${allowance} (${String(limit)} bytes) exceeded; no partial runtime result is returned.`, {
				boundary: "browser-runtime-retention",
				kind,
				retained_bytes: retainedBytes,
				limit_bytes: limit
			}, fixedAllowanceOptions(allowance, "live", {
				limit,
				unit: "bytes"
			}));
		};
		assertRuntimeRetention = (operation, kind, retainedBytes) => {
			if (retainedBytes > retentionLimit(kind)) throw retentionExceeded(operation, kind, retainedBytes);
		};
		RuntimeRetention = class {
			operation;
			kind;
			#bytes;
			constructor(operation, kind) {
				this.operation = operation;
				this.kind = kind;
				this.#bytes = new Budget(retentionLimit(kind));
			}
			/** Charge `bytes` before retaining them, or throw the retention failure. */
			charge(bytes) {
				this.#bytes.charge(bytes, () => retentionExceeded(this.operation, this.kind, this.#bytes.used + bytes));
			}
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpRuntimeSources.js
var CdpRuntimeSources;
function init_CdpRuntimeSources() {
	return (init_CdpRuntimeSources = __esmMin((() => {
		init_webContentArtifact();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_browserObservation();
		init_jsonValue();
		init_CdpScriptContextFacts();
		init_CdpRuntimeRetention();
		init_errorMessage();
		CdpRuntimeSources = class {
			session;
			scripts = new Map();
			#contexts = new Map();
			#changed = new Set();
			#changedContexts = new Set();
			#sources = new Map();
			#metadata;
			#sourceText;
			#failure;
			constructor(session) {
				this.session = session;
				this.#metadata = new RuntimeRetention(session.operation, "metadata");
				this.#sourceText = new RuntimeRetention(session.operation, "sources");
			}
			/** Subscribe before enabling Debugger; existing uncollected scripts are replayed by the producer. */
			ingest(event, retainNewMetadata = true) {
				if (this.#failure !== undefined) return;
				const registered = event.registered;
				try {
					if (registered?.method === "Runtime.executionContextCreated") {
						const bytes = registered.payload.declarationBytes;
						if (!bytes.ok) throw bytes.error;
						this.#metadata.charge(bytes.value);
						const declaration = registered.payload.runtime;
						if (!declaration.success) throw declaration.error;
						const context = declaration.data.context;
						const previous = this.#contexts.get(context.id);
						if (previous !== undefined && JSON.stringify(previous) !== JSON.stringify(context)) {
							this.#changedContexts.add(context.id);
							for (const item of this.#sources.values()) if (item.execution_context_id === context.id) this.revalidate(item);
						}
						if (retainNewMetadata) this.#contexts.set(context.id, context);
					} else if (registered?.method === "Debugger.scriptParsed") {
						const bytes = registered.payload.declarationBytes;
						if (!bytes.ok) throw bytes.error;
						this.#metadata.charge(bytes.value);
						const declaration = registered.payload.runtime;
						if (!declaration.success) throw declaration.error;
						const script = declaration.data;
						const previous = this.scripts.get(script.scriptId);
						if (previous !== undefined && JSON.stringify(previous) !== JSON.stringify(script)) {
							this.#changed.add(script.scriptId);
							const retained = this.#sources.get(script.scriptId);
							if (retained !== undefined) this.revalidate(retained);
						}
						if (retainNewMetadata) this.scripts.set(script.scriptId, script);
					}
				} catch (cause) {
					this.#failure = cause instanceof AnalysisError ? cause : new AnalysisOutputError(this.session.operation, errorMessage(cause));
				}
			}
			/** Producer parse/resource failures are surfaced outside the transport event callback. */
			check() {
				if (this.#failure !== undefined) throw this.#failure;
			}
			/** Frozen inventories still monitor known identities through asynchronous source reads. */
			verifyKnownIdentity(event) {
				const registered = event.registered;
				if (registered?.method === "Debugger.scriptParsed") {
					const { scriptId } = registered.payload.facts;
					if (scriptId !== undefined && this.scripts.has(scriptId)) this.ingest(event, false);
				} else if (registered?.method === "Runtime.executionContextCreated") {
					const { id } = registered.payload.facts;
					if (id !== undefined && this.#contexts.has(id)) this.ingest(event, false);
				}
			}
			/** Only proven default worlds of the selected main frame establish website source ownership. */
			belongsToDocument(scriptId) {
				const script = this.scripts.get(scriptId);
				if (script === undefined || this.#changed.has(scriptId) || this.#changedContexts.has(script.executionContextId)) return false;
				const scriptContext = script.executionContextAuxData;
				const context = this.#contexts.get(script.executionContextId)?.auxData;
				const worlds = [scriptContext, context];
				if (worlds.some((world) => world?.isDefault === false || world?.type !== undefined && world.type !== "default") || !worlds.some((world) => world?.isDefault === true || world?.type === "default")) return false;
				const frame = selectCdpScriptFrame(cdpContextFrameClaim(scriptContext), cdpContextFrameClaim(context));
				return !frame.invalid && !frame.conflicting && frame.frameId === this.session.target.frame_id;
			}
			/** Retain complete script text and compute a digest distinct from the producer hash. */
			async read(scriptIds) {
				this.check();
				for (const scriptId of new Set(scriptIds)) {
					if (this.#sources.has(scriptId)) continue;
					const script = this.scripts.get(scriptId);
					const owned = this.belongsToDocument(scriptId);
					const context = script === undefined ? undefined : this.#contexts.get(script.executionContextId);
					const item = {
						script_id: scriptId,
						url: this.sourceUrl(scriptId, script?.url ?? ""),
						execution_context_id: script?.executionContextId ?? null,
						reported_execution_context: context === undefined ? null : jsonObjectSchema.parse(context),
						reported_script_context_aux_data: script?.executionContextAuxData === undefined ? null : jsonObjectSchema.parse(script.executionContextAuxData),
						frame_id: owned ? this.session.target.frame_id : null,
						producer_hash: script?.hash ?? null,
						source_map_url: script?.sourceMapURL ?? null,
						has_source_url: script?.hasSourceURL ?? null,
						language: script?.scriptLanguage ?? null,
						resource_start: script !== undefined ? {
							line_number: script.startLine,
							column_number: script.startColumn
						} : null,
						source: {
							state: "excluded",
							reason: this.#changed.has(scriptId) ? "The script changed identity during observation; source attribution is unknown." : "Selected main-document default-world ownership was not established."
						}
					};
					if (owned && script?.scriptLanguage !== "WebAssembly") item.source = await this.capture(scriptId);
					else if (owned) item.source = {
						state: "excluded",
						reason: "WebAssembly bytecode is outside this JavaScript source operation."
					};
					this.revalidate(item);
					this.#sources.set(scriptId, item);
				}
				this.check();
				return [...this.#sources.values()];
			}
			/** Resolve an exact producer script ID; URL equality is never an identity fallback. */
			location(scriptId, url, line, column, functionName = null) {
				return {
					script_id: scriptId,
					url: url === null ? null : this.sourceUrl(scriptId, url),
					line_number: line,
					column_number: column,
					function_name: functionName,
					source_association: this.belongsToDocument(scriptId) ? "script_id" : "unknown"
				};
			}
			/** Declared script names are inert evidence; known resource URLs omit transport userinfo. */
			sourceUrl(scriptId, url) {
				return !this.#changed.has(scriptId) && this.scripts.get(scriptId)?.hasSourceURL === false ? sanitizeBrowserUrl(url).url : url;
			}
			revalidate(item) {
				if (item.frame_id === null || this.belongsToDocument(item.script_id)) return;
				const previous = item.source.state === "unavailable" ? ` Previous source read failure: ${item.source.reason}` : "";
				item.frame_id = null;
				item.source = {
					state: "excluded",
					reason: `The script or context changed identity during source collection; attribution is unknown.${previous}`
				};
			}
			async capture(scriptId) {
				let text;
				try {
					({scriptSource: text} = await this.session.command("Debugger.getScriptSource", { scriptId }));
				} catch (cause) {
					if (this.session.options.signal?.aborted || !(cause instanceof AnalysisError)) throw cause;
					return {
						state: "unavailable",
						reason: cause.userMessage ?? cause.message
					};
				}
				this.#sourceText.charge(Buffer.byteLength(text));
				const facts = webTextFacts(text);
				return {
					state: "captured",
					text,
					sha256: facts.sha256,
					utf8_bytes: facts.utf8Bytes,
					utf16_units: facts.utf16Units
				};
			}
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpExecutionWindow.js
var CdpExecutionWindow;
function init_CdpExecutionWindow() {
	return (init_CdpExecutionWindow = __esmMin((() => {
		init_analysisErrorCore();
		init_browserObservationError();
		init_CdpEvents();
		CdpExecutionWindow = class {
			session;
			armedAt;
			endedAt;
			reason;
			#timer;
			#resolve;
			#reject;
			#failure;
			#removeAbort;
			#removeNavigation;
			constructor(session) {
				this.session = session;
				this.#removeNavigation = session.document.onNavigation((navigation) => this.#rootNavigation(navigation));
			}
			/**
			* Collection ends when the target session's document owner reports another
			* document, never follows source URLs into another context. A same-document
			* navigation keeps the window; unreadable frame identity fails it.
			*/
			#rootNavigation(navigation) {
				if (!this.active) return;
				if (navigation.kind === "unidentified" || navigation.kind === "unreadable_child") {
					this.fail(new BrowserObservationError(this.session.operation, "protocol_error"));
					return;
				}
				if (navigation.kind === "navigated" && navigation.comparison !== "same") this.end("document_changed");
			}
			/** Lifecycle facts other than navigation that end the document's window. */
			ingest(event) {
				const method = event.registered?.method;
				if (method === "Target.detachedFromTarget") {
					this.end("session_detached");
					return;
				}
				if (method === "Inspector.targetCrashed") {
					this.end("target_terminated");
					return;
				}
				if (!this.active) return;
				if (method === "Runtime.executionContextsCleared") this.end("document_changed");
				const frame = cdpFrameEvent(event)?.facts;
				if (frame?.kind === "detached" && frame.frameId === this.session.target.frame_id) this.end("document_changed");
			}
			/** Metadata before arming is inventory; request events outside the window are excluded. */
			get active() {
				return this.armedAt !== undefined && this.reason === undefined && this.endedAt === undefined;
			}
			/** The timer starts at arming, before progress delivery can delay the external action. */
			start(duration) {
				if (this.#failure !== undefined) return Promise.reject(this.#failure);
				if (this.reason !== undefined) return Promise.resolve(this.reason);
				this.armedAt = new Date().toISOString();
				return new Promise((resolve, reject) => {
					this.#resolve = resolve;
					this.#reject = reject;
					this.#timer = setTimeout(() => this.end("window_elapsed"), duration);
					const signal = this.session.options.signal;
					const abort = () => {
						this.fail(cancelledBy(this.session.operation, carriedReason(signal?.reason)));
					};
					this.#removeAbort = () => signal?.removeEventListener("abort", abort);
					signal?.addEventListener("abort", abort, { once: true });
					if (signal?.aborted) abort();
				});
			}
			/** A producer lifecycle fact ends the window; instrumentation cleanup still requires confirmation. */
			end(reason) {
				if (this.reason !== undefined || this.#failure !== undefined) return;
				this.reason = reason;
				this.endedAt = new Date().toISOString();
				this.dispose();
				this.#resolve?.(reason);
			}
			/** Invalid producer data ends instrumentation immediately with its original failure. */
			fail(error) {
				if (this.reason !== undefined || this.#failure !== undefined) return;
				this.#failure = error;
				this.endedAt = new Date().toISOString();
				this.dispose();
				this.#reject?.(error);
			}
			/** Surface a failure recorded before local arming without emitting misleading progress. */
			check() {
				if (this.#failure !== undefined) throw this.#failure;
			}
			/** Release local timer and abort listener on every setup/failure path. */
			dispose() {
				if (this.#timer !== undefined) clearTimeout(this.#timer);
				this.#removeAbort?.();
				this.#removeNavigation();
			}
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpRuntimeProtocol.js
var integer, runtimeStackSchema;
function init_CdpRuntimeProtocol() {
	return (init_CdpRuntimeProtocol = __esmMin((() => {
		init_cdpObservationSchemas();
		integer = z.int().min(0);
		runtimeStackSchema = z.object({
			callFrames: z.array(z.object({
				scriptId: z.string(),
				url: z.string(),
				lineNumber: integer,
				columnNumber: cdpResourceColumnSchema,
				functionName: z.string()
			})),
			parent: z.unknown().optional(),
			parentId: z.object({
				id: z.string(),
				debuggerId: z.string().optional()
			}).optional()
		});
	})))();
}

//#endregion
//#region dist/browser/execution/CdpRuntimeInitiator.js
var isObject, sanitizeRuntimeInitiator;
function init_CdpRuntimeInitiator() {
	return (init_CdpRuntimeInitiator = __esmMin((() => {
		init_browserObservation();
		isObject = (value) => isRecord(value);
		sanitizeRuntimeInitiator = (initiator, sources) => {
			if (typeof initiator.url === "string") initiator.url = sanitizeBrowserUrl(initiator.url).url;
			let stack = initiator.stack;
			while (isObject(stack)) {
				if (Array.isArray(stack.callFrames)) {
					for (const frame of stack.callFrames) if (isObject(frame) && typeof frame.url === "string" && typeof frame.scriptId === "string") frame.url = sources.sourceUrl(frame.scriptId, frame.url);
				}
				stack = stack.parent;
			}
			return initiator;
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpRuntimeRequests.js
var CdpRuntimeRequests;
function init_CdpRuntimeRequests() {
	return (init_CdpRuntimeRequests = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_browserObservation();
		init_jsonValue();
		init_CdpRuntimeProtocol();
		init_CdpRuntimeInitiator();
		init_CdpRuntimeRetention();
		init_errorMessage();
		CdpRuntimeRequests = class {
			sources;
			items = [];
			excluded = 0;
			#retention;
			#failure;
			constructor(sources) {
				this.sources = sources;
				this.#retention = new RuntimeRetention(sources.session.operation, "requests");
			}
			/** Retain only armed-window requests from the selected main frame and selected origins. */
			ingest(event) {
				const registered = event.registered;
				if (registered?.method !== "Network.requestWillBeSent" || this.#failure !== undefined) return;
				try {
					const declaration = registered.payload.runtime;
					if (!declaration.success) throw declaration.error;
					const request = declaration.data;
					const url = sanitizeBrowserUrl(request.request.url);
					if (request.frameId !== this.sources.session.target.frame_id || url.origin === null || !this.sources.session.allowedOrigins.has(url.origin)) {
						this.excluded += 1;
						return;
					}
					const callsites = [];
					const parents = [];
					let current = request.initiator.stack;
					while (current !== undefined) {
						const stack = runtimeStackSchema.parse(current);
						for (const frame of stack.callFrames) callsites.push(this.sources.location(frame.scriptId, frame.url, frame.lineNumber, frame.columnNumber, frame.functionName));
						if (stack.parentId !== undefined) parents.push({
							id: stack.parentId.id,
							debugger_id: stack.parentId.debuggerId ?? null
						});
						current = stack.parent;
					}
					if (request.initiator.url !== undefined && request.initiator.lineNumber !== undefined) callsites.push(this.sources.location("", sanitizeBrowserUrl(request.initiator.url).url, request.initiator.lineNumber, request.initiator.columnNumber ?? null));
					const retained = {
						request_id: request.requestId,
						url: url.url,
						method: request.request.method,
						timestamp_seconds: request.timestamp,
						initiator_type: request.initiator.type,
						reported_initiator: sanitizeRuntimeInitiator(jsonObjectSchema.parse(request.initiator), this.sources),
						callsites,
						async_parent_ids: parents,
						causal_attribution: "unknown"
					};
					this.#retention.charge(Buffer.byteLength(JSON.stringify(retained)));
					this.items.push(retained);
				} catch (cause) {
					this.#failure = cause instanceof AnalysisError ? cause : new AnalysisOutputError(this.sources.session.operation, errorMessage(cause));
				}
			}
			/** Preserve all repeated/redirect requests and bind callsites after metadata collection ends. */
			result() {
				this.check();
				const result = this.items.map((request) => ({
					...request,
					reported_initiator: sanitizeRuntimeInitiator(jsonObjectSchema.parse(request.reported_initiator), this.sources),
					callsites: request.callsites.map((site) => this.sources.location(site.script_id, site.url, site.line_number, site.column_number, site.function_name))
				}));
				assertRuntimeRetention(this.sources.session.operation, "requests", Buffer.byteLength(JSON.stringify(result)));
				return result;
			}
			/** Report malformed or oversized producer evidence without partial success. */
			check() {
				if (this.#failure !== undefined) throw this.#failure;
			}
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpExecutionCollection.js
var CdpExecutionCollection;
function init_CdpExecutionCollection() {
	return (init_CdpExecutionCollection = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_CdpTargetEvents();
		init_CdpExecutionWindow();
		init_CdpRuntimeRequests();
		CdpExecutionCollection = class {
			sources;
			window;
			requests;
			#unsubscribers;
			#metadataOpen = true;
			constructor(sources) {
				this.sources = sources;
				const session = sources.session;
				this.window = new CdpExecutionWindow(session);
				this.requests = new CdpRuntimeRequests(sources);
				this.#unsubscribers = [
					onCdpTargetEvent(session.transport.connection, session.transport.sessionId, (event) => {
						try {
							if (this.#metadataOpen && (this.window.reason === undefined || this.window.reason === "window_elapsed")) sources.ingest(event);
							else if (this.window.reason === "window_elapsed") sources.verifyKnownIdentity(event);
							if (this.window.active) this.requests.ingest(event);
							sources.check();
							this.requests.check();
						} catch (cause) {
							this.window.fail(cause instanceof AnalysisError ? cause : new AnalysisOutputError(session.operation, String(cause)));
						}
						this.window.ingest(event);
					}),
					session.transport.connection.onDisconnect((error) => this.window.fail(error)),
					session.transport.connection.onProtocolFailure((error) => this.window.fail(error))
				];
			}
			/** Freeze metadata after receiving the final sample so source joins use one fixed inventory. */
			freezeMetadata() {
				this.#metadataOpen = false;
				this.sources.check();
			}
			/** Remove every owned subscription and local timer on success, cancellation or failure. */
			close() {
				this.#metadataOpen = false;
				this.window.dispose();
				for (const unsubscribe of this.#unsubscribers) unsubscribe();
			}
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpPreciseCoverage.js
var normalizePreciseCoverage;
function init_CdpPreciseCoverage() {
	return (init_CdpPreciseCoverage = __esmMin((() => {
		init_analysisErrorCore();
		normalizePreciseCoverage = (parsed, sources, retained) => {
			const retainedSources = new Map(retained.map(({ script_id, source }) => [script_id, source]));
			const scripts = [];
			let excluded = 0;
			for (const script of parsed.result) {
				if (!sources.belongsToDocument(script.scriptId)) {
					excluded += 1;
					continue;
				}
				const source = retainedSources.get(script.scriptId);
				scripts.push({
					script_id: script.scriptId,
					reported_url: sources.sourceUrl(script.scriptId, script.url),
					functions: script.functions.map((fn) => ({
						name: fn.functionName,
						is_block_coverage: fn.isBlockCoverage,
						ranges: fn.ranges.map((range) => {
							if (range.endOffset < range.startOffset || source?.state === "captured" && range.endOffset > source.utf16_units) throw new AnalysisOutputError(sources.session.operation, `Script ${script.scriptId} coverage range ${range.startOffset}:${range.endOffset} is outside retained source bounds.`);
							return {
								start_offset: range.startOffset,
								end_offset: range.endOffset,
								count: range.count,
								source_bounds: source?.state === "captured" ? "verified" : "unknown"
							};
						})
					}))
				});
			}
			return {
				timestamp: parsed.timestamp,
				coverage: {
					state: "captured",
					reason: null,
					offset_units: "utf16-code-units",
					end_offset: "exclusive",
					scripts,
					excluded_scripts: excluded
				}
			};
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpExecutionCapture.js
var captureWebExecution, stopPreciseCoverage, executionWindowEndDetail;
function init_CdpExecutionCapture() {
	return (init_CdpExecutionCapture = __esmMin((() => {
		init_analysisErrorBase();
		init_browserObservationError();
		init_analysisErrorCore();
		init_CdpExecutionCollection();
		init_CdpPreciseCoverage();
		captureWebExecution = async (input, sources) => {
			const session = sources.session;
			const collection = new CdpExecutionCollection(sources);
			const { window, requests } = collection;
			try {
				for (const domain of [
					"Page",
					"Runtime",
					"Debugger",
					"Network",
					"Profiler"
				]) await session.enable(domain);
				await session.assertDocument();
				sources.check();
				session.preciseCoverageMayBeActive = true;
				const started = await session.command("Profiler.startPreciseCoverage", {
					callCount: true,
					detailed: true,
					allowTriggeredUpdates: false
				});
				sources.check();
				window.check();
				if (window.reason !== undefined) throw new BrowserObservationError(session.operation, window.reason === "session_detached" ? "target_session_detached" : "target_changed", { detail: executionWindowEndDetail(session.target.target_id, window.reason) });
				const waiting = window.start(input.observation_ms);
				void waiting.catch(() => undefined);
				await session.options.progress?.report({
					phase: "browser_execution",
					completed: 1,
					total: 2,
					message: "Browser execution observation armed; perform the requested action now"
				});
				const reason = await waiting;
				session.beginCompletion();
				if (session.options.signal?.aborted) throw cancelledBy(session.operation, session.options.signal);
				sources.check();
				requests.check();
				let sampled;
				if (reason === "window_elapsed") {
					await session.assertDocument();
					sampled = await session.command("Profiler.takePreciseCoverage");
				}
				collection.freezeMetadata();
				await stopPreciseCoverage(session, reason);
				session.preciseCoverageMayBeActive = false;
				const requestItems = requests.result();
				const mainScripts = [...sources.scripts.keys()].filter((id) => sources.belongsToDocument(id));
				const reportedIds = new Set(sampled?.result.map((script) => script.scriptId) ?? []);
				const ids = [...mainScripts, ...requestItems.flatMap((request) => request.callsites.map((site) => site.script_id)).filter((id) => id.length > 0)];
				const retained = await sources.read(ids);
				if (reason === "window_elapsed") await session.assertDocument();
				sources.check();
				const verifiedRequests = requests.result();
				const verifiedMainScripts = mainScripts.filter((id) => sources.belongsToDocument(id));
				const sample = sampled === undefined ? undefined : normalizePreciseCoverage(sampled, sources, retained);
				await session.options.progress?.report({
					phase: "browser_execution",
					completed: 2,
					total: 2,
					message: "Browser execution observation ended",
					terminal: true
				});
				return {
					browser: session.discovery.version,
					target: session.target,
					window: {
						armed_at: window.armedAt ?? new Date().toISOString(),
						ended_at: window.endedAt ?? new Date().toISOString(),
						requested_ms: input.observation_ms,
						end_reason: reason,
						producer_started_seconds: started.timestamp,
						producer_sampled_seconds: sample?.timestamp ?? null
					},
					coverage: sample?.coverage ?? {
						state: "unavailable",
						reason: `The observation ended with ${reason}; no complete final precise-coverage sample was retained.`,
						offset_units: "utf16-code-units",
						end_offset: "exclusive",
						scripts: [],
						excluded_scripts: 0
					},
					requests: verifiedRequests,
					excluded_requests: requests.excluded,
					script_inventory: {
						main_document_scripts: verifiedMainScripts.length,
						not_reported_script_ids: verifiedMainScripts.filter((id) => !reportedIds.has(id)),
						coverage_absence: "unknown"
					},
					sources: retained,
					instrumentation: {
						resets_execution_counters: true,
						disables_optimized_execution: true,
						takes_one_resetting_sample: sample !== undefined,
						executes_selected_code: false,
						cleanup: "unconfirmed",
						page_ownership: "external"
					},
					limitations: [
						...session.discovery.limitations ?? [],
						"Website source ownership requires the selected main frame and a proven default execution world. Isolated, worker and unknown worlds are excluded from coverage/source joins; referenced producer context metadata is retained.",
						"Precise coverage resets counters, retains execution records and prevents optimized execution until stopped. Timing and JIT behavior are affected.",
						"Only the selected main document's proven frame/context scripts are attributed. Child frames, workers, service workers, WebAssembly and scripts without ownership metadata remain outside this operation.",
						"V8 reports nested function/block ranges and counts, not a chronological trace. Counts must not be summed across overlapping ranges; zero counts concern this instrumented window only.",
						"Previously parsed scripts may be absent from a precise sample. Their source inventory is retained, but missing coverage never means zero execution or an unexecuted function.",
						"A detailed-coverage request does not guarantee block granularity for already compiled functions. When is_block_coverage is false, branch execution is unknown; REA preserves the function-only producer ranges.",
						"The local armed/end clock and backend coverage timestamps are distinct clocks. Counters start when the backend accepts instrumentation, before the armed receipt, and end at the resetting sample after the requested window. Counts may include execution during those command intervals; requests are restricted to the locally armed window.",
						"Source metadata is collected through the final resetting sample, then frozen for source joins. Known identities remain checked during asynchronous source completion; newly parsed scripts after that cutoff are outside this evidence.",
						"Request callsites are producer-reported initiators associated by session script ID; they do not establish UI causality. Unresolved asynchronous parent IDs are retained without fetching their stacks.",
						"Producer hashes and UTF-8 digests of retained text are distinct identities. Inline script locations use reported resource offsets; anonymous/eval/sourceURL names are declarations.",
						"Metadata has an 8 MiB script budget and 8 MiB request budget; complete retained sources have a 32 MiB budget. Resource failures return no partial success. The externally owned browser's CPU and memory are not controlled by REA."
					]
				};
			} finally {
				collection.close();
			}
		};
		stopPreciseCoverage = async (session, reason) => {
			try {
				await session.command("Profiler.stopPreciseCoverage");
			} catch (cause) {
				if (reason !== "target_terminated" && reason !== "session_detached" || !(cause instanceof AnalysisError)) throw cause;
				cause.retainDiagnostics({ observed_window: {
					target_id: session.target.target_id,
					end_reason: reason
				} });
				throw cause;
			}
		};
		executionWindowEndDetail = (targetId, reason) => {
			if (reason === "session_detached") return `The debugging session for selected target ${targetId} detached before execution observation could be armed; the target may still exist.`;
			if (reason === "target_terminated") return `Selected target ${targetId} crashed before execution observation could be armed.`;
			return `Selected target ${targetId} changed documents before execution observation could be armed.`;
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpListenerSelector.js
var queryListenerSelector;
function init_CdpListenerSelector() {
	return (init_CdpListenerSelector = __esmMin((() => {
		init_analysisErrorCore();
		init_CdpCommandRejection();
		queryListenerSelector = async (session, nodeId, selector) => {
			try {
				return await session.command("DOM.querySelector", {
					nodeId,
					selector
				});
			} catch (cause) {
				if (cause instanceof CdpCommandRejection && cause.command === "DOM.querySelector" && cause.code === -32e3 && cause.reportedMessage === "DOM Error while querying") throw new AnalysisInputError(session.operation, { cause }, [{
					path: ["selector"],
					reason: "invalid_format",
					message: `Chromium rejected the CSS selector syntax for target ${session.target.target_id}: ${selector}. ${cause.userMessage ?? cause.message}`
				}]);
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/browser/execution/CdpEventListeners.js
var captureWebEventListeners, eventListenerObjectGroup;
function init_CdpEventListeners() {
	return (init_CdpEventListeners = __esmMin((() => {
		init_CdpListenerSelector();
		init_CdpTargetEvents();
		captureWebEventListeners = async (input, sources, group) => {
			const session = sources.session;
			session.beginCompletion();
			const unsubscribe = onCdpTargetEvent(session.transport.connection, session.transport.sessionId, (event) => sources.ingest(event));
			try {
				for (const domain of [
					"Page",
					"Runtime",
					"Debugger",
					"DOM"
				]) await session.enable(domain);
				await session.assertDocument();
				const document = await session.command("DOM.getDocument", { depth: 0 });
				const selected = await queryListenerSelector(session, document.root.nodeId, input.selector);
				let backendNodeId = null;
				let descriptors = [];
				if (selected.nodeId !== 0) {
					const described = await session.command("DOM.describeNode", { nodeId: selected.nodeId });
					backendNodeId = described.node.backendNodeId;
					const resolved = await session.command("DOM.resolveNode", {
						nodeId: selected.nodeId,
						objectGroup: group
					});
					({listeners: descriptors} = await session.command("DOMDebugger.getEventListeners", {
						objectId: resolved.object.objectId,
						depth: 0,
						pierce: false
					}));
				}
				const retained = await sources.read(descriptors.map((listener) => listener.scriptId).filter((id) => id.length > 0));
				await session.assertDocument();
				sources.check();
				return {
					browser: session.discovery.version,
					target: session.target,
					inspected_at: new Date().toISOString(),
					selected_node: {
						selector: input.selector,
						match: selected.nodeId === 0 ? "not_found" : "found",
						backend_node_id: backendNodeId
					},
					listeners: descriptors.map((listener) => ({
						type: listener.type,
						use_capture: listener.useCapture,
						passive: listener.passive,
						once: listener.once,
						location: sources.location(listener.scriptId, sources.scripts.get(listener.scriptId)?.url ?? null, listener.lineNumber, listener.columnNumber),
						execution: "unknown"
					})),
					sources: retained,
					cleanup: "unconfirmed",
					limitations: [
						...session.discovery.limitations ?? [],
						"Inspects listeners registered directly on the first native CSS match in the selected main document. Delegated ancestor listeners, descendants, closed shadow roots and framework registries are not enumerated.",
						"Native CDP listener descriptors report callback locations; registration time, dispatch history and UI causality remain unknown. REA does not dispatch an event, evaluate JavaScript or invoke a handler.",
						"Source identity uses this session's script ID and proven main-frame default-world metadata. Isolated or unknown worlds cannot establish website callback/source joins. A URL or sourceURL declaration never establishes identity or execution.",
						"Source text is retained inline with its independently computed UTF-8 digest; the producer hash is preserved separately. Missing source ownership or collected scripts remain explicit.",
						"REA releases its remote object group, disables enabled domains and detaches its transport; the externally owned page remains open."
					]
				};
			} finally {
				unsubscribe();
			}
		};
		eventListenerObjectGroup = () => `rea-listeners-${randomUUID()}`;
	})))();
}

//#endregion
//#region dist/browser/execution/CdpWebRuntimeProvider.js
var CdpWebRuntimeProvider;
function init_CdpWebRuntimeProvider() {
	return (init_CdpWebRuntimeProvider = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_analysisErrorCleanup();
		init_result();
		init_webExecution();
		init_webEventListeners();
		init_providerIdentities();
		init_CdpTargetSessionOwner();
		init_CdpRuntimeSession();
		init_CdpRuntimeSources();
		init_CdpExecutionCapture();
		init_CdpEventListeners();
		CdpWebRuntimeProvider = class {
			#owner = new CdpTargetSessionOwner();
			close() {
				return this.#owner.close();
			}
			/** Identify this adapter independently of the captured browser version. */
			identity() {
				return CDP_BROWSER_PROVIDER_IDENTITY;
			}
			/** Observe one instrumented window while preserving the externally owned page. */
			observeExecution(input, options = {}) {
				return this.run(input, "observe_web_execution", options, webExecutionObservationSchema, (sources) => captureWebExecution(input, sources), (observation) => ({
					...observation,
					instrumentation: {
						...observation.instrumentation,
						cleanup: "confirmed"
					}
				}));
			}
			/** Inspect one selected node's registered callback locations. */
			inspectEventListeners(input, options = {}) {
				const group = eventListenerObjectGroup();
				return this.run(input, "inspect_web_event_listeners", options, webEventListenersObservationSchema, (sources) => captureWebEventListeners(input, sources, group), (observation) => ({
					...observation,
					cleanup: "confirmed"
				}), group);
			}
			async run(input, operation, options, schema, capture, confirmCleanup, group) {
				let session;
				let result;
				try {
					session = await CdpRuntimeSession.open(input, operation, options, this.#owner);
					result = ok(schema.parse(await capture(new CdpRuntimeSources(session))));
				} catch (cause) {
					result = err(cause instanceof AnalysisError ? cause : cause instanceof z.ZodError ? new AnalysisOutputError(operation, cause.message) : new ProviderAdapterError(this.identity().id, operation, { cause }));
				}
				if (session !== undefined) {
					const failure = await session.close(result.ok ? undefined : result.error, group);
					if (failure !== undefined) return err(result.ok ? options.signal?.aborted === true ? analysisErrorWithCleanupFailure(cancelledBy(operation, options.signal, { partialObservation: result.value }), failure, operation) : failure.retainPartialObservation(result.value) : analysisErrorWithCleanupFailure(result.error, failure, operation));
				}
				const completed = result.ok ? ok(confirmCleanup(result.value)) : result;
				if (completed.ok && options.signal?.aborted === true) return err(cancelledBy(operation, options.signal, { partialObservation: completed.value }));
				return completed;
			}
		};
	})))();
}

//#endregion
//#region dist/composition/webRuntime.js
var createWebRuntimeService;
function init_webRuntime() {
	return (init_webRuntime = __esmMin((() => {
		init_WebRuntimeService();
		init_CdpWebRuntimeProvider();
		createWebRuntimeService = () => new WebRuntimeService(new CdpWebRuntimeProvider());
	})))();
}

//#endregion
//#region dist/cli/webRuntimeCommands.js
var webRuntimeCommands_exports = /* @__PURE__ */ __exportAll({ registerWebRuntimeCommands: () => registerWebRuntimeCommands });
var targetFields, registerWebRuntimeCommands, throughWebRuntime;
function init_webRuntimeCommands() {
	return (init_webRuntimeCommands = __esmMin((() => {
		init_webRuntime();
		init_webRuntimeToolContracts();
		init_browserContractCommands();
		init_cliProgress();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		init_projectCliAnalysisResult();
		targetFields = {
			...browserTargetProjection.fields,
			cdp_endpoint: {
				name: "endpoint",
				description: "Existing loopback browser CDP endpoint"
			},
			target_id: { description: "Selected page target ID from list-browser-targets" }
		};
		registerWebRuntimeCommands = (cli, logger) => {
			registerContractCommand(cli, logger, contractNamed(WEB_RUNTIME_TOOL_CONTRACTS, "observe_web_execution"), {
				description: "Observe precise page execution; resets counters and temporarily disables optimization",
				positionals: browserTargetProjection.positionals,
				fields: {
					...targetFields,
					observation_ms: { description: "Observation duration in milliseconds" }
				}
			}, throughWebRuntime((service, input, options) => service.observe(input, {
				...options,
				progress: cliProgressReporter
			})));
			registerContractCommand(cli, logger, contractNamed(WEB_RUNTIME_TOOL_CONTRACTS, "inspect_web_event_listeners"), {
				description: "Inspect native listener source locations on the first main-document CSS match",
				positionals: [...browserTargetProjection.positionals, "selector"],
				fields: {
					...targetFields,
					selector: { description: "Native CSS selector; inspect the first main-document match" }
				}
			}, throughWebRuntime((service, input, options) => service.inspect(input, options)));
		};
		throughWebRuntime = (run) => async (input, { operation, signal }) => {
			const service = createWebRuntimeService();
			return finishAnalysisCommand(() => run(service, input, { signal }), { close: async () => {
				await service.provider.close?.();
			} }, service.provider.identity().id, operation, signal).then(projectCliAnalysisResult);
		};
	})))();
}

//#endregion
export { init_webRuntimeCommands, webRuntimeCommands_exports };