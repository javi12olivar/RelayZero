import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { $t as init_analysisResourceLimits, Jt as MAX_NODE_TIMER_DELAY_MS } from "./jsonValue-BIEmjG1z.js";
import { _ as init_analysisErrorCore, i as AnalysisCancelledError, p as OwnerCancellation } from "./analysisErrorCore-CrdY4k0A.js";
import { Vr as analysisErrorWithCleanupFailure, Wr as init_analysisErrorCleanup } from "./resources-C5FMDwcC.js";
import { f as init_browserDeadline, n as CDP_DISCOVERY_RESPONSE_TIMEOUT_MS, r as DEFAULT_CDP_COMMAND_TIMEOUT_MS } from "./browserDeadline-CtCyBFlP.js";
import { N as init_CdpFrameTree, P as observedFrameUrl, S as init_CdpEndpoint, T as withCdpDiscoveryDeadline, _ as isCdpSessionGoneRejection, a as init_CdpConnection, b as discoverCdpEndpoint, g as init_CdpCommandRejection, i as CdpConnection, n as bindCdpTransportCleanup, r as init_CdpTargetSessionOwner, v as cdpTargetWebSocket, y as discoverCdpBrowserSocket } from "./CdpTargetSessionOwner-x5phC2Yq.js";

//#region dist/browser/CdpTargetSession.js
var knownLoader, compareCdpDocuments, cdpRootDocument, unverifiedDocumentLimitation, CdpDocumentTracker, openCdpEndpoint, openCdpTargetSession, attachCdpTargetSession, failCdpOpenAfterCleanup, combineOpenFailure, closeCdpTargetSession, cleanupCdpTargetCommands;
function init_CdpTargetSession() {
	return (init_CdpTargetSession = __esmMin((() => {
		init_analysisResourceLimits();
		init_browserDeadline();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_analysisErrorCore();
		init_CdpCommandRejection();
		init_CdpConnection();
		init_CdpFrameTree();
		init_CdpTargetSessionOwner();
		init_CdpEndpoint();
		knownLoader = (loaderId) => loaderId === "" ? undefined : loaderId;
		compareCdpDocuments = (selected, observed) => {
			if (selected.frameId !== observed.frameId) return "changed";
			const before = knownLoader(selected.loaderId);
			const after = knownLoader(observed.loaderId);
			if (before === undefined || after === undefined) return "unknown";
			if (before !== after) return "changed";
			return selected.url === observed.url ? "same" : "same_document_navigation";
		};
		cdpRootDocument = (tree) => {
			const { frameId, identityIssue, parentRelation, loaderId, loaderIssue } = tree.root.facts;
			if (frameId === null || identityIssue !== null || parentRelation !== "root" || loaderIssue !== null) return undefined;
			return {
				frameId,
				loaderId,
				url: observedFrameUrl(tree.root.url)
			};
		};
		unverifiedDocumentLimitation = (selected) => `The ${knownLoader(selected.loaderId) === undefined ? "initial" : "final"} document loader identity was unavailable, so document stability could not be verified. Retry after the page finishes loading.`;
		CdpDocumentTracker = class {
			selected;
			#current;
			#changed = false;
			#unknown = false;
			constructor(selected) {
				this.selected = selected;
				this.#current = selected;
			}
			get current() {
				return this.#current;
			}
			/** Another root frame or loader was observed since selection. */
			get changed() {
				return this.#changed;
			}
			/** Some observation lacked the loader needed to prove the document. */
			get unknown() {
				return this.#unknown;
			}
			observe(observed) {
				const comparison = compareCdpDocuments(this.#current, observed);
				if (comparison === "changed") this.#changed = true;
				if (comparison === "unknown") this.#unknown = true;
				this.#current = {
					...observed,
					loaderId: knownLoader(observed.loaderId) ?? (comparison === "changed" ? undefined : this.#current.loaderId)
				};
				return comparison;
			}
		};
		openCdpEndpoint = async (endpoint, operation, signal, timeoutMs, owner, commandTimeoutMs, options) => {
			const discoveryTimeoutMs = timeoutMs ?? 1e4;
			if (endpoint.transport === "http_discovery") return {
				discovery: await discoverCdpEndpoint(endpoint.url, operation, signal, discoveryTimeoutMs),
				connection: undefined
			};
			const reuseBrowserSocket = owner !== undefined && options?.reuseBrowserSocket === true;
			const discoveryGuardTimeoutMs = Math.min(MAX_NODE_TIMER_DELAY_MS, discoveryTimeoutMs + 1e3);
			const discoveryLimits = {
				commandTimeoutMs: discoveryGuardTimeoutMs,
				handshakeTimeoutMs: discoveryGuardTimeoutMs
			};
			return await withCdpDiscoveryDeadline(operation, signal, async (deadlineSignal) => {
				const acquired = reuseBrowserSocket ? await owner.acquireBrowserSocket(endpoint.url, operation, { signal: deadlineSignal }, discoveryLimits) : {
					connection: owner === undefined ? await CdpConnection.connect(endpoint.url, operation, deadlineSignal, discoveryLimits) : await owner.connect(endpoint.url, operation, { signal: deadlineSignal }, "browser-endpoint", discoveryLimits),
					reused: false
				};
				try {
					const discovery = await discoverCdpBrowserSocket(acquired.connection, endpoint.url, operation, deadlineSignal);
					const selectedTimeout = commandTimeoutMs ?? 2e4;
					if (reuseBrowserSocket) {
						owner.admitBrowserSocket(endpoint.url, acquired.connection);
						return {
							discovery,
							connection: acquired.connection.withOperation(operation, selectedTimeout),
							reusableBrowserSocket: true
						};
					}
					acquired.connection.selectCommandTimeout(selectedTimeout);
					return {
						discovery,
						connection: acquired.connection
					};
				} catch (cause) {
					const releaseLeaseOnly = reuseBrowserSocket && deadlineSignal.aborted && cause instanceof AnalysisCancelledError && acquired.connection.isReusable();
					return await failCdpOpenAfterCleanup(acquired.connection, cause, operation, owner, reuseBrowserSocket ? releaseLeaseOnly ? "release" : "evict" : "finish");
				}
			}, discoveryTimeoutMs);
		};
		openCdpTargetSession = async (discovery, target, operation, signal, limits, owner) => {
			const webSocket = cdpTargetWebSocket(discovery, target, operation);
			const connection = owner === undefined ? await CdpConnection.connect(webSocket.url, operation, signal, limits) : await owner.connect(webSocket.url, operation, signal === undefined ? {} : { signal }, target.id, limits);
			if (webSocket.scope === "page") return {
				connection,
				sessionId: undefined
			};
			try {
				return await attachCdpTargetSession(connection, target, operation, signal, owner);
			} catch (cause) {
				if (owner === undefined) throw cause;
				return await failCdpOpenAfterCleanup(connection, cause, operation, owner);
			}
		};
		attachCdpTargetSession = async (connection, target, operation, signal, owner) => {
			try {
				const { sessionId } = await connection.send("Target.attachToTarget", {
					targetId: target.id,
					flatten: true
				}, undefined, signal);
				return {
					connection,
					sessionId
				};
			} catch (cause) {
				if (owner === undefined) return await failCdpOpenAfterCleanup(connection, cause, operation);
				throw cause;
			}
		};
		failCdpOpenAfterCleanup = async (connection, primary, operation, owner, ownerDisposition = "finish") => {
			try {
				if (owner === undefined) await connection.close();
				else if (ownerDisposition === "release") await owner.releaseBrowserSocket(connection);
				else if (ownerDisposition === "evict") await owner.evictBrowserSocket(connection);
				else await owner.finish(connection);
			} catch (cleanup) {
				throw combineOpenFailure(primary, cleanup, operation);
			}
			throw primary;
		};
		combineOpenFailure = (primary, cleanup, operation) => primary instanceof AnalysisError && cleanup instanceof AnalysisError ? bindCdpTransportCleanup(cleanup, analysisErrorWithCleanupFailure(primary, cleanup, operation)) : new AggregateError([primary, cleanup], `CDP operation ${operation} failed and its transport cleanup is incomplete.`, { cause: primary });
		closeCdpTargetSession = async (targetSession, enabledDomains, signal, owner, reuseBrowserSocket = false) => {
			if (owner !== undefined) {
				if (reuseBrowserSocket) {
					await owner.releaseBrowserSocket(targetSession.connection, () => cleanupCdpTargetCommands(targetSession, enabledDomains, signal));
					return;
				}
				await owner.finish(targetSession.connection, async () => {
					await cleanupCdpTargetCommands(targetSession, enabledDomains, signal);
				});
				return;
			}
			await cleanupCdpTargetCommands(targetSession, enabledDomains, signal);
			await targetSession.connection.close();
		};
		cleanupCdpTargetCommands = async (targetSession, enabledDomains, signal) => {
			const { connection, sessionId } = targetSession;
			const cleanup = new AbortController();
			const domainSignal = signal === undefined ? cleanup.signal : AbortSignal.any([cleanup.signal, signal]);
			const timeout = setTimeout(() => cleanup.abort(OwnerCancellation.deadlineElapsed), 1e3);
			timeout.unref();
			try {
				if (signal?.aborted !== true) {
					for (const domain of enabledDomains) {
						if (domainSignal.aborted) break;
						try {
							await connection.send(`${domain}.disable`, {}, sessionId, domainSignal);
						} catch {}
					}
				}
				if (sessionId === undefined) return true;
				if (cleanup.signal.aborted) return false;
				try {
					await connection.send("Target.detachFromTarget", { sessionId }, undefined, cleanup.signal);
					return true;
				} catch (cause) {
					if (isCdpSessionGoneRejection(cause)) return true;
					return false;
				}
			} finally {
				clearTimeout(timeout);
				cleanup.abort(OwnerCancellation.noLongerNeeded);
			}
		};
	})))();
}

//#endregion
export { compareCdpDocuments as a, openCdpEndpoint as c, closeCdpTargetSession as i, openCdpTargetSession as l, attachCdpTargetSession as n, failCdpOpenAfterCleanup as o, cdpRootDocument as r, init_CdpTargetSession as s, CdpDocumentTracker as t, unverifiedDocumentLimitation as u };