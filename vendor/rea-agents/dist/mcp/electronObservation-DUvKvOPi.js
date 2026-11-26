import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { Dt as init_asarHeaderAdmission, S as BrowserObservationError, Tt as DEFAULT_ASAR_HEADER_ADMISSION, w as init_browserObservationError } from "./analysisErrorProjection-B0_t_nHz.js";
import { i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { n as digestCanonicalValue, r as init_canonicalDigest } from "./canonicalDigest-DUQN3Yyz.js";
import { i as runtimeAsarHeaderAdmission, t as init_runtimeAnalysisSettings } from "./runtimeAnalysisSettings-BhPVC9xk.js";
import { _ as init_analysisErrorCore, m as cancelledBy } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_errorMessage, t as errorMessage } from "./errorMessage-rfGn5D1_.js";
import { r as init_providerAdapterError, t as ProviderAdapterError } from "./providerAdapterError-CdFzW4Ag.js";
import { Dr as init_electronObservation$1, Er as electronTargetListSchema, Ft as init_providerIdentities, Mt as CDP_ELECTRON_PROVIDER_IDENTITY, Tr as electronPageInspectionSchema } from "./createServer-Brv7NMx6.js";
import { n as compositeKey, r as init_unicodeCodePointOrder, t as compareUnicodeCodePoints } from "./unicodeCodePointOrder-BezCbTpg.js";
import { a as init_providerCleanupError, i as ProviderCleanupError } from "./SignalAbort-CPFWtyzs.js";
import { Kr as providerCleanupErrorFromFailures, Vr as analysisErrorWithCleanupFailure, Wr as init_analysisErrorCleanup } from "./resources-C5FMDwcC.js";
import { n as jsonValueByteLength, t as init_jsonValueByteLength } from "./jsonValueByteLength-BNI69N2O.js";
import { f as init_browserDeadline, g as selectedCdpCommandTimeoutMs } from "./browserDeadline-CtCyBFlP.js";
import { E as init_CdpDiscoveryTargets, G as init_CdpCaptureDocuments, K as snapshotDocuments, M as init_CdpCommands, N as init_CdpFrameTree, O as selectCdpDiscoveryTarget, P as observedFrameUrl, S as init_CdpEndpoint, at as snapshotNodeAt, b as discoverCdpEndpoint, c as init_CdpEvents, d as init_CdpScriptContextFacts, dt as init_CdpCaptureValues, f as selectCdpScriptFrame, it as snapshotDocumentNodes, k as CdpMalformedReply, lt as cdpStringValue, n as bindCdpTransportCleanup, ot as cdpSnapshotString, r as init_CdpTargetSessionOwner, rt as init_CdpSnapshotNodes, s as cdpFrameEvent, st as init_CdpSnapshotStrings, t as CdpTargetSessionOwner, ut as delayWithCancellation, x as hasCdpTargetWebSocket } from "./CdpTargetSessionOwner-x5phC2Yq.js";
import { i as closeCdpTargetSession, l as openCdpTargetSession, s as init_CdpTargetSession } from "./CdpTargetSession-CAK7F0Xx.js";
import { a as init_CdpScriptSourceCapture, c as init_CdpOptionalCommand, d as init_CdpCaptureEventTypes, f as CdpCaptureCompleteness, i as capturePassiveCdpScriptSource, l as optionalCdpCommand, n as parseCdpWorkerTarget, o as CdpScriptSourceBudget, p as init_CdpCaptureCompleteness, r as workerTargetOwnership, s as init_CdpScriptSourceBudget, t as init_CdpWorkerTarget, u as CDP_CAPTURE_SCRIPT_METADATA_LIMITS } from "./CdpWorkerTarget-CbXASKtW.js";
import { a as retryElectronFileCleanup, i as mapElectronFileAuthorizationFailure, n as authorizedElectronFile, r as init_ElectronFileScope } from "./ElectronFileScope-B58cTgp8.js";

//#region dist/browser/CdpElectronScriptEvents.js
var ingestElectronScriptEvent;
function init_CdpElectronScriptEvents() {
	return (init_CdpElectronScriptEvents = __esmMin((() => {
		init_CdpScriptContextFacts();
		init_jsonValueByteLength();
		init_CdpCaptureEventTypes();
		init_CdpCaptureCompleteness();
		ingestElectronScriptEvent = (input) => {
			const registered = input.event.registered;
			if (registered?.method === "Runtime.executionContextsCleared") {
				input.executionContextFrames.clear();
				return;
			}
			if (registered?.method === "Runtime.executionContextDestroyed") {
				const key = registered.payload.contextKey;
				if (key !== null) input.executionContextFrames.delete(key);
				return;
			}
			if (registered?.method === "Runtime.executionContextCreated") {
				const { facts } = registered.payload;
				if (facts.contextKey !== null) input.executionContextFrames.set(facts.contextKey, facts.frameClaim);
				return;
			}
			if (registered?.method !== "Debugger.scriptParsed") return;
			const { facts } = registered.payload;
			const scriptId = facts.scriptId;
			const rawUrl = facts.url;
			if (scriptId === undefined || scriptId === "") {
				input.completeness.exclude("scripts", "invalid_protocol_value");
				return;
			}
			if (rawUrl === undefined || rawUrl === "") {
				input.completeness.exclude("scripts", "unattributed_origin");
				return;
			}
			const contextFrame = facts.contextKey === null ? undefined : input.executionContextFrames.get(facts.contextKey);
			const attribution = selectCdpScriptFrame(facts.frameClaim, contextFrame);
			if (attribution.invalid || attribution.conflicting || facts.invalidHasSourceUrl) input.completeness.exclude("scripts", "invalid_protocol_value");
			const reportedFrame = facts.frameClaim.frameId;
			const script = {
				scriptId,
				rawUrl,
				...facts.metadata,
				frameId: attribution.frameId,
				frameClaims: {
					...reportedFrame === undefined ? {} : { script_event_frame_id: reportedFrame },
					...contextFrame?.frameId === undefined ? {} : { execution_context_frame_id: contextFrame.frameId }
				},
				hasSourceUrl: facts.hasSourceUrl
			};
			const remaining = CDP_CAPTURE_SCRIPT_METADATA_LIMITS.retainedBytes - input.retention.bytes;
			const bytes = jsonValueByteLength({ ...script }, remaining) + (input.scripts.length > 0 ? 1 : 0);
			if (bytes > remaining) {
				input.completeness.exclude("scripts", "resource_budget_exhausted");
				return;
			}
			input.retention.bytes += bytes;
			input.scripts.push(script);
		};
	})))();
}

//#endregion
//#region dist/browser/CdpElectronScripts.js
var captureElectronScripts, throwIfCallerCancelled;
function init_CdpElectronScripts() {
	return (init_CdpElectronScripts = __esmMin((() => {
		init_canonicalDigest();
		init_CdpCaptureCompleteness();
		init_CdpScriptSourceCapture();
		init_jsonValueByteLength();
		init_CdpCaptureEventTypes();
		init_ElectronFileScope();
		init_unicodeCodePointOrder();
		init_analysisErrorCore();
		init_browserDeadline();
		init_CdpScriptSourceBudget();
		captureElectronScripts = async (input) => {
			let total = 0;
			const items = [];
			const seen = new Set();
			let metadataBytes = 2;
			const commandTimeoutMs = selectedCdpCommandTimeoutMs(input.request.command_timeout_ms);
			const sourceBudget = input.request.include_script_sources && input.scripts.length > 0 ? new CdpScriptSourceBudget(input.signal, commandTimeoutMs) : undefined;
			try {
				for (const script of input.scripts) {
					throwIfCallerCancelled(input.signal);
					const frame = input.frameScopeForScript(script);
					if (frame.state === "excluded") {
						input.completeness.exclude("scripts", "out_of_target_scope");
						continue;
					}
					const path = await authorizedElectronFile(script.rawUrl, input.signal, "inspect_electron_page", input.asarHeaderAdmission);
					if (path === undefined) {
						input.completeness.exclude("scripts", "out_of_target_scope");
						continue;
					}
					if (frame.state === "unknown") input.completeness.attachLimited("scripts");
					const identity = {
						frame_id: frame.frameId,
						frame_scope: frame.state,
						frame_claims: script.frameClaims,
						file_path: path,
						reported_url: script.rawUrl,
						has_source_url: script.hasSourceUrl,
						cdp_hash: script.hash,
						length: script.length,
						is_module: script.isModule,
						language: script.language
					};
					const remaining = CDP_CAPTURE_SCRIPT_METADATA_LIMITS.retainedBytes - metadataBytes;
					const retainedBytes = jsonValueByteLength({
						script_key: `electron_script_${"0".repeat(64)}`,
						...identity
					}, remaining) + (items.length > 0 ? 1 : 0);
					if (retainedBytes > remaining) {
						input.completeness.exclude("scripts", "resource_budget_exhausted");
						continue;
					}
					const scriptKey = `electron_script_${digestCanonicalValue(identity, "CDP capture")}`;
					if (seen.has(scriptKey)) continue;
					seen.add(scriptKey);
					metadataBytes += retainedBytes;
					total += 1;
					const source = sourceBudget === undefined ? {
						included: false,
						reason: "source capture was not selected"
					} : await capturePassiveCdpScriptSource({
						connection: input.connection,
						sessionId: input.sessionId,
						signal: input.signal,
						operation: "inspect_electron_page",
						scriptId: script.scriptId,
						sourceBudget,
						completeness: input.completeness
					});
					items.push({
						script_key: scriptKey,
						...identity,
						source
					});
				}
			} finally {
				sourceBudget?.dispose();
			}
			if (!input.request.include_script_sources) input.completeness.exclude("script_sources", "not_approved", total);
			return {
				total,
				items: items.sort((left, right) => compareUnicodeCodePoints(left.script_key, right.script_key))
			};
		};
		throwIfCallerCancelled = (signal) => {
			if (signal?.aborted === true) throw cancelledBy("inspect_electron_page", signal);
		};
	})))();
}

//#endregion
//#region dist/browser/CdpElectronWorkers.js
var captureElectronWorkers, throwIfElectronWorkerCaptureCancelled;
function init_CdpElectronWorkers() {
	return (init_CdpElectronWorkers = __esmMin((() => {
		init_CdpCaptureCompleteness();
		init_CdpOptionalCommand();
		init_ElectronFileScope();
		init_unicodeCodePointOrder();
		init_analysisErrorCore();
		init_CdpWorkerTarget();
		captureElectronWorkers = async (input) => {
			const result = await optionalCdpCommand({
				connection: input.connection,
				sessionId: undefined,
				...input.signal === undefined ? {} : { signal: input.signal }
			}, "Target.getTargets", {}, input.limitations);
			if (!result.ok) {
				if (result.error._tag === "CdpMalformedReply") input.completeness.exclude("workers", "invalid_protocol_value", null);
				else input.completeness.unavailable("workers");
				return [];
			}
			const workers = [];
			const { targetInfos } = result.value;
			for (const entry of targetInfos) {
				throwIfElectronWorkerCaptureCancelled(input.signal);
				const parsed = parseCdpWorkerTarget(entry);
				if (!parsed.ok) {
					input.completeness.exclude("workers", "invalid_protocol_value");
					continue;
				}
				const target = parsed.value;
				if (target.kind === "non_worker") continue;
				const ownership = workerTargetOwnership(target, input.target.id, input.frameIds);
				if (ownership !== "selected") {
					input.completeness.exclude("workers", ownership === "unknown" ? "unattributed_target" : "out_of_target_scope");
					continue;
				}
				const path = await authorizedElectronFile(target.url, input.signal, "inspect_electron_page", input.asarHeaderAdmission);
				if (path === undefined) {
					input.completeness.exclude("workers", "out_of_target_scope");
					continue;
				}
				workers.push({
					target_id: target.targetId,
					type: target.type,
					file_path: path,
					attached: target.attached,
					opener_target_id: target.openerTargetId,
					parent_frame_id: target.parentFrameId
				});
			}
			return workers.sort((left, right) => compareUnicodeCodePoints(left.target_id, right.target_id));
		};
		throwIfElectronWorkerCaptureCancelled = (signal) => {
			if (signal?.aborted === true) throw cancelledBy("inspect_electron_page", signal);
		};
	})))();
}

//#endregion
//#region dist/browser/CdpElectronInspection.js
var inspectCdpElectronPage, runElectronInspection, frameInventoryIdentity, frameGenerationKey, authorizeFrameGenerations, unprovenFrameIds, advanceFrameGeneration, sameFrameDocument, retainFrameDocument, invalidateFrameGenerations, frameDocument, seedFrameDocuments, authorizeInitialFrames, readCurrentFrames, markUnstableFrameRead, enableElectronCapture, captureElectronContent, assertStableMainFrame, captureFrames, captureResources, captureDom, selectedMainFrame, throwIfElectronInspectionCancelled, report;
function init_CdpElectronInspection() {
	return (init_CdpElectronInspection = __esmMin((() => {
		init_canonicalDigest();
		init_browserObservationError();
		init_analysisErrorCore();
		init_CdpCaptureCompleteness();
		init_CdpCaptureValues();
		init_CdpCommands();
		init_CdpCaptureDocuments();
		init_CdpEvents();
		init_CdpFrameTree();
		init_CdpSnapshotNodes();
		init_CdpSnapshotStrings();
		init_CdpElectronScriptEvents();
		init_CdpElectronScripts();
		init_CdpElectronWorkers();
		init_ElectronFileScope();
		init_unicodeCodePointOrder();
		inspectCdpElectronPage = async (context) => {
			const state = {
				completeness: new CdpCaptureCompleteness(),
				scripts: [],
				scriptMetadataRetention: { bytes: 2 },
				executionContextFrames: new Map(),
				frameGenerations: new Map(),
				frameParents: new Map(),
				frameDocuments: new Map(),
				unknownDocumentFrames: new Set(),
				authorizedFrameGenerations: new Set(),
				excludedFrameGenerations: new Set(),
				scriptGenerations: new WeakMap(),
				limitations: [
					...context.discovery.limitations ?? [],
					"Local file paths exposed by the selected CDP target are retained in the observation.",
					"REA does not evaluate renderer JavaScript, invoke Electron APIs, navigate, click, or close the page.",
					"Select include_script_sources to retain script contents.",
					"Script file_path is the admitted local-file URL or sourceURL label, not a verification that disk bytes supplied the runtime code. has_source_url retains CDP's sourceURL declaration flag; null or an omitted historical field is unknown.",
					"Known script frame identity is retained independently from frame_scope authorization. Unknown frame scope is attach-limited; scripts from known excluded document generations are omitted before source reads.",
					...context.target.attached === null ? ["CDP discovery could not establish the target's debugger attachment state."] : []
				],
				mainFrameId: undefined,
				lastProvenMainDocument: undefined,
				navigationDuringCapture: false
			};
			const removeListener = context.connection.onEvent((event) => {
				if (event.sessionId !== context.sessionId) return;
				advanceFrameGeneration(event, state);
				const priorScripts = state.scripts.length;
				ingestElectronScriptEvent({
					event,
					scripts: state.scripts,
					executionContextFrames: state.executionContextFrames,
					completeness: state.completeness,
					retention: state.scriptMetadataRetention
				});
				const script = state.scripts[priorScripts];
				if (script?.frameId != null) state.scriptGenerations.set(script, state.frameGenerations.get(script.frameId) ?? 0);
			});
			try {
				return await runElectronInspection(context, state, new Date().toISOString());
			} finally {
				removeListener();
			}
		};
		runElectronInspection = async (context, state, startedAt) => {
			const initialRead = await authorizeInitialFrames(context, state);
			const initialFrames = initialRead.frames;
			const main = initialFrames.at(0);
			if (main === undefined) throw new BrowserObservationError("inspect_web_page", "target_not_allowed");
			if (!initialRead.unprovenDocuments.has(main.frame_id) && unprovenFrameIds(initialRead, state).has(main.frame_id)) throw new BrowserObservationError("inspect_web_page", "target_changed");
			state.mainFrameId = main.frame_id;
			state.lastProvenMainDocument = state.frameDocuments.get(main.frame_id);
			authorizeFrameGenerations(initialRead, state);
			await enableElectronCapture(context);
			await delayWithCancellation(context.input.observation_ms, "inspect_electron_page", context.signal);
			const currentRead = await readCurrentFrames(context, state, state.completeness);
			const frames = currentRead.frames;
			authorizeFrameGenerations(currentRead, state);
			if (frameInventoryIdentity(initialFrames) !== frameInventoryIdentity(frames)) {
				state.limitations.push("The frame inventory changed during observation. Returned frames describe the current inventory; retained script frame IDs can identify earlier authorized frames.");
			}
			const captured = await captureElectronContent(context, state, frames);
			const finalFrames = await assertStableMainFrame(context, state, main.file_path);
			if (frameInventoryIdentity(frames) !== frameInventoryIdentity(finalFrames)) {
				for (const section of [
					"frames",
					"scripts",
					"workers"
				]) state.completeness.attachLimited(section);
				state.limitations.push("The frame inventory changed during content capture; frame membership and dependent attribution are incomplete.");
			}
			await report(context.progress, 3, "Electron inspection complete");
			if (state.navigationDuringCapture) throw new BrowserObservationError("inspect_web_page", "target_changed");
			return {
				browser: context.discovery.version,
				target: {
					target_id: context.target.id,
					type: context.target.type,
					title: context.target.title,
					file_path: main.file_path,
					attached: context.target.attached
				},
				capture_window: {
					started_at: startedAt,
					ended_at: new Date().toISOString(),
					observation_ms: context.input.observation_ms
				},
				completeness: state.completeness.snapshot(),
				frames,
				...captured,
				limitations: state.limitations
			};
		};
		frameInventoryIdentity = (frames) => digestCanonicalValue(frames.map((frame) => compositeKey([
			frame.frame_id,
			frame.parent_frame_id,
			frame.file_path
		])).sort(compareUnicodeCodePoints));
		frameGenerationKey = (frameId, generation) => compositeKey([frameId, generation]);
		authorizeFrameGenerations = (read, state) => {
			const unproven = markUnstableFrameRead(read, state);
			for (const id of unproven) {
				const generation = state.frameGenerations.get(id) ?? 0;
				if ((read.generations.get(id) ?? 0) === generation) state.frameGenerations.set(id, generation + 1);
			}
			for (const [id, parent] of read.parents) if (!unproven.has(id)) state.frameParents.set(id, parent);
			for (const frame of read.frames) {
				const generation = read.generations.get(frame.frame_id) ?? 0;
				if (unproven.has(frame.frame_id)) continue;
				state.authorizedFrameGenerations.add(frameGenerationKey(frame.frame_id, generation));
			}
			for (const id of read.excludedFrameIds) if (!unproven.has(id)) state.excludedFrameGenerations.add(frameGenerationKey(id, read.generations.get(id) ?? 0));
		};
		unprovenFrameIds = (read, state) => {
			const children = new Map();
			const unproven = new Set(read.unprovenDocuments);
			for (const [id, parent] of read.parents) {
				if ((read.generations.get(id) ?? 0) !== (state.frameGenerations.get(id) ?? 0)) unproven.add(id);
				if (parent === null) continue;
				if (!read.parents.has(parent)) unproven.add(id);
				const siblings = children.get(parent) ?? [];
				siblings.push(id);
				children.set(parent, siblings);
			}
			const pending = [...unproven];
			while (pending.length > 0) {
				const parent = pending.pop();
				if (parent === undefined) continue;
				for (const child of children.get(parent) ?? []) {
					if (unproven.has(child)) continue;
					unproven.add(child);
					pending.push(child);
				}
			}
			return unproven;
		};
		advanceFrameGeneration = (event, state) => {
			const frame = cdpFrameEvent(event);
			if (frame === undefined) return;
			const { facts, url: observation } = frame;
			if (facts.kind === "within_document") {
				const id = facts.frameId;
				if (id === null) return;
				if (id === state.mainFrameId) state.navigationDuringCapture = true;
				const previous = state.frameDocuments.get(id);
				if (previous === undefined) return;
				const url = observedFrameUrl(observation);
				if (url === undefined || url === "") state.frameDocuments.delete(id);
				else state.frameDocuments.set(id, {
					...previous,
					url
				});
				return;
			}
			if (facts.kind === "requested") return;
			const id = facts.frameId;
			if (id === null) return;
			const document = facts.kind === "navigated" ? frameDocument(facts, observation) : undefined;
			const previous = state.frameDocuments.get(id);
			if (document !== undefined && previous !== undefined && sameFrameDocument(document, previous) && document.url === previous.url) return;
			invalidateFrameGenerations(id, state);
			const parent = facts.parentId;
			if (facts.parentRelation === "child" && parent !== null) state.frameParents.set(id, parent);
			else state.frameParents.delete(id);
			if (document !== undefined) retainFrameDocument(id, document, state);
		};
		sameFrameDocument = (left, right) => left.loaderId === right.loaderId && left.parentId === right.parentId;
		retainFrameDocument = (id, document, state) => {
			const previous = state.frameDocuments.get(id) ?? (id === state.mainFrameId ? state.lastProvenMainDocument : undefined);
			if (previous !== undefined && sameFrameDocument(previous, document) && previous.url === document.url) {
				state.frameDocuments.set(id, document);
				return;
			}
			if (id === state.mainFrameId && previous !== undefined && previous.url !== document.url) state.navigationDuringCapture = true;
			state.frameDocuments.set(id, document);
			if (id === state.mainFrameId) state.lastProvenMainDocument = document;
		};
		invalidateFrameGenerations = (id, state, identity = "changed") => {
			const pending = [id];
			const changed = new Set();
			while (pending.length > 0) {
				const current = pending.pop();
				if (current === undefined || changed.has(current)) continue;
				changed.add(current);
				if (identity === "changed" && current === state.mainFrameId) state.navigationDuringCapture = true;
				state.frameGenerations.set(current, (state.frameGenerations.get(current) ?? 0) + 1);
				state.frameDocuments.delete(current);
				for (const [child, parent] of state.frameParents) if (parent === current) pending.push(child);
			}
		};
		frameDocument = (facts, observation) => {
			const url = observedFrameUrl(observation);
			if (url === undefined || url === "" || facts.loaderId === undefined || facts.loaderId === "" || facts.loaderIssue !== null || facts.parentRelation !== "root" && facts.parentRelation !== "child") return undefined;
			return {
				url,
				loaderId: facts.loaderId,
				parentId: facts.parentId
			};
		};
		seedFrameDocuments = (tree, generations, documents, state) => {
			const unproven = new Set();
			for (const { facts, url } of tree.frames) {
				const id = facts.frameId;
				const document = frameDocument(facts, url);
				if (id !== null && document === undefined && state.frameDocuments.get(id) === documents.get(id) && (generations.get(id) ?? 0) === (state.frameGenerations.get(id) ?? 0)) {
					unproven.add(id);
					state.unknownDocumentFrames.add(id);
					if (documents.has(id)) invalidateFrameGenerations(id, state, "unproven");
				}
				if (id !== null && document !== undefined && state.unknownDocumentFrames.has(id) && state.frameDocuments.get(id) === documents.get(id) && (generations.get(id) ?? 0) === (state.frameGenerations.get(id) ?? 0)) {
					state.unknownDocumentFrames.delete(id);
					const previous = id === state.mainFrameId ? state.lastProvenMainDocument : undefined;
					const changed = previous !== undefined && !sameFrameDocument(previous, document);
					invalidateFrameGenerations(id, state, changed ? "changed" : "unproven");
					unproven.add(id);
					retainFrameDocument(id, document, state);
					continue;
				}
				if (id !== null && document !== undefined && state.frameDocuments.get(id) === documents.get(id) && (generations.get(id) ?? 0) === (state.frameGenerations.get(id) ?? 0)) {
					const previous = documents.get(id) ?? (id === state.mainFrameId ? state.lastProvenMainDocument : undefined);
					if (previous !== undefined && !sameFrameDocument(previous, document)) invalidateFrameGenerations(id, state);
					retainFrameDocument(id, document, state);
				}
			}
			return unproven;
		};
		authorizeInitialFrames = async (context, state) => {
			await report(context.progress, 1, "Authorizing Electron file frames");
			await context.connection.send("Page.enable", {}, context.sessionId, context.signal);
			return await readCurrentFrames(context, state, new CdpCaptureCompleteness());
		};
		readCurrentFrames = async (context, state, completeness) => {
			const generations = new Map(state.frameGenerations);
			const documents = new Map(state.frameDocuments);
			const result = await context.connection.send("Page.getFrameTree", {}, context.sessionId, context.signal);
			const unprovenDocuments = seedFrameDocuments(result, generations, documents, state);
			const inventory = await captureFrames(result, completeness, context.asarHeaderAdmission, context.signal);
			selectedMainFrame(inventory, state.mainFrameId);
			return {
				...inventory,
				generations,
				unprovenDocuments
			};
		};
		markUnstableFrameRead = (read, state) => {
			const unproven = unprovenFrameIds(read, state);
			if (unproven.size === 0) return unproven;
			for (const section of [
				"frames",
				"scripts",
				"workers"
			]) state.completeness.attachLimited(section);
			state.limitations.push("A frame or its ancestry could not be verified across the tree read and local file checks; this read cannot authorize an unchecked document.");
			return unproven;
		};
		enableElectronCapture = async (context) => {
			await context.connection.send("Runtime.enable", {}, context.sessionId, context.signal);
			await context.connection.send("Debugger.enable", {}, context.sessionId, context.signal);
		};
		captureElectronContent = async (context, state, frames) => {
			await report(context.progress, 2, "Capturing Electron structure");
			const frameIds = new Set(frames.map((frame) => frame.frame_id));
			const resources = await captureResources(context, state.completeness);
			const dom = await captureDom(context, state.completeness);
			const scripts = await captureElectronScripts({
				connection: context.connection,
				sessionId: context.sessionId,
				...context.signal === undefined ? {} : { signal: context.signal },
				request: context.input,
				scripts: state.scripts,
				frameScopeForScript: (script) => {
					const generation = state.scriptGenerations.get(script);
					if (script.frameId !== null && generation !== undefined) {
						const key = frameGenerationKey(script.frameId, generation);
						if (state.excludedFrameGenerations.has(key)) return { state: "excluded" };
						if (state.authorizedFrameGenerations.has(key)) return {
							state: "authorized",
							frameId: script.frameId
						};
					}
					return {
						state: "unknown",
						frameId: script.frameId
					};
				},
				completeness: state.completeness,
				asarHeaderAdmission: context.asarHeaderAdmission
			});
			const workers = await captureElectronWorkers({
				connection: context.connection,
				...context.signal === undefined ? {} : { signal: context.signal },
				target: context.target,
				request: context.input,
				frameIds,
				completeness: state.completeness,
				limitations: state.limitations,
				asarHeaderAdmission: context.asarHeaderAdmission
			});
			return {
				dom,
				scripts,
				resources,
				workers
			};
		};
		assertStableMainFrame = async (context, state, expectedPath) => {
			const generations = new Map(state.frameGenerations);
			const documents = new Map(state.frameDocuments);
			const result = await context.connection.send("Page.getFrameTree", {}, context.sessionId, context.signal);
			const unprovenDocuments = seedFrameDocuments(result, generations, documents, state);
			const completeness = new CdpCaptureCompleteness();
			const inventory = await captureFrames(result, completeness, context.asarHeaderAdmission, context.signal);
			const { frames } = inventory;
			const main = selectedMainFrame(inventory, state.mainFrameId);
			if (main.file_path !== expectedPath || state.navigationDuringCapture || state.mainFrameId !== undefined && !unprovenDocuments.has(state.mainFrameId) && (generations.get(state.mainFrameId) ?? 0) !== (state.frameGenerations.get(state.mainFrameId) ?? 0)) throw new BrowserObservationError("inspect_web_page", "target_changed");
			markUnstableFrameRead({
				...inventory,
				generations,
				unprovenDocuments
			}, state);
			if (completeness.snapshot().conditions.some((condition) => condition !== "complete_within_window")) {
				for (const section of [
					"frames",
					"scripts",
					"workers"
				]) state.completeness.attachLimited(section);
				state.limitations.push("The final frame inventory was incomplete; frame stability could not be fully verified.");
			}
			return frames;
		};
		captureFrames = async (tree, completeness, asarHeaderAdmission, signal) => {
			if (tree.omittedFrames) completeness.exclude("frames", "invalid_protocol_value", null);
			const frames = [];
			const provedFrames = new Set();
			const parents = new Map();
			const excludedFrameIds = new Set();
			for (const node of tree.frames) {
				throwIfElectronInspectionCancelled(signal);
				const { facts, enclosing } = node;
				const frameId = facts.frameId;
				const parentId = facts.parentId;
				const ancestryKnown = enclosing === undefined ? facts.parentRelation === "root" : facts.parentRelation === "child" && parentId !== null && provedFrames.has(enclosing) && parentId === enclosing.facts.frameId;
				if (frameId === null || !ancestryKnown) {
					completeness.exclude("frames", "invalid_protocol_value");
					continue;
				}
				parents.set(frameId, parentId ?? null);
				provedFrames.add(node);
				const path = await authorizedElectronFile(node.url.kind === "missing" ? "" : node.url.scopeUrl, signal, "inspect_electron_page", asarHeaderAdmission);
				if (path === undefined) {
					completeness.exclude("frames", "out_of_target_scope");
					excludedFrameIds.add(frameId);
					continue;
				}
				frames.push({
					frame_id: frameId,
					parent_frame_id: parentId ?? null,
					file_path: path
				});
			}
			return {
				frames,
				parents,
				excludedFrameIds
			};
		};
		captureResources = async (context, completeness) => {
			const tree = await context.connection.send("Page.getResourceTree", {}, context.sessionId, context.signal);
			if (tree.omittedResources) completeness.exclude("resources", "invalid_protocol_value", null);
			if (tree.malformedResources > 0) completeness.exclude("resources", "invalid_protocol_value", tree.malformedResources);
			const resources = [];
			const seen = new Set();
			for (const resource of tree.resources) {
				throwIfElectronInspectionCancelled(context.signal);
				const path = await authorizedElectronFile(resource.url ?? "", context.signal, "inspect_electron_page", context.asarHeaderAdmission);
				if (path === undefined) {
					completeness.exclude("resources", "out_of_target_scope");
					continue;
				}
				const { contentSize } = resource;
				if (!contentSize.ok) completeness.exclude("resources", "invalid_protocol_value");
				const item = {
					file_path: path,
					type: resource.type ?? "Other",
					mime_type: resource.mimeType ?? "",
					content_size: contentSize.ok ? contentSize.value : null
				};
				const resourceKey = `electron_resource_${digestCanonicalValue(item, "CDP capture")}`;
				if (seen.has(resourceKey)) continue;
				seen.add(resourceKey);
				resources.push({
					resource_key: resourceKey,
					...item
				});
			}
			return resources.sort((left, right) => compareUnicodeCodePoints(left.resource_key, right.resource_key));
		};
		captureDom = async (context, completeness) => {
			const nodeValueLengthUnit = "utf8-bytes";
			const invalid = (count) => completeness.exclude("dom", "invalid_protocol_value", count);
			let result;
			try {
				result = await context.connection.send("DOMSnapshot.captureSnapshot", {
					computedStyles: [],
					includePaintOrder: false,
					includeDOMRects: false
				}, context.sessionId, context.signal);
			} catch (cause) {
				if (!(cause instanceof CdpMalformedReply)) throw cause;
				invalid(null);
				return {
					total_nodes: 0,
					node_value_length_unit: nodeValueLengthUnit,
					nodes: []
				};
			}
			const strings = result.strings.map(cdpStringValue);
			const nodes = [];
			let total = 0;
			for (const document of snapshotDocuments(result.documents, invalid)) {
				throwIfElectronInspectionCancelled(context.signal);
				const documentUrl = cdpSnapshotString(strings, document.documentURL);
				if (documentUrl === undefined) {
					invalid(1);
					continue;
				}
				if (await authorizedElectronFile(documentUrl, context.signal, "inspect_electron_page", context.asarHeaderAdmission) === undefined) {
					completeness.exclude("dom", "out_of_target_scope");
					continue;
				}
				const documentNodes = snapshotDocumentNodes(document.nodes, strings);
				if (documentNodes === undefined) {
					invalid(1);
					continue;
				}
				if (documentNodes.excessAttributes > 0) invalid(documentNodes.excessAttributes);
				const baseIndex = total;
				total += documentNodes.nodeTypes.length;
				for (let index = 0; index < documentNodes.nodeTypes.length; index += 1) {
					const admitted = snapshotNodeAt(documentNodes, index);
					if (!admitted.ok) {
						invalid(1);
						continue;
					}
					const { nodeType, nodeName, nodeValue, parent, attributes } = admitted.value;
					nodes.push({
						index: baseIndex + index,
						parent_index: parent < 0 ? -1 : baseIndex + parent,
						node_type: nodeType,
						node_name: nodeName,
						node_value_length: Buffer.byteLength(nodeValue),
						attribute_names: attributes.map(([name]) => name)
					});
				}
			}
			return {
				total_nodes: total,
				node_value_length_unit: nodeValueLengthUnit,
				nodes
			};
		};
		selectedMainFrame = (inventory, selectedId) => {
			const main = inventory.frames[0];
			if (main === undefined || inventory.parents.get(main.frame_id) !== null) throw new BrowserObservationError("inspect_web_page", "target_not_allowed");
			if (selectedId !== undefined && main.frame_id !== selectedId) throw new BrowserObservationError("inspect_web_page", "target_changed");
			return main;
		};
		throwIfElectronInspectionCancelled = (signal) => {
			if (signal?.aborted === true) throw cancelledBy("inspect_electron_page", signal);
		};
		report = async (progress, completed, message) => await progress?.report({
			phase: "browser_observation",
			completed,
			total: 3,
			message,
			...completed === 3 ? { terminal: true } : {}
		});
	})))();
}

//#endregion
//#region dist/browser/CdpElectronProvider.js
var CdpElectronProvider, authorizeTarget, throwIfElectronOperationCancelled, providerError;
function init_CdpElectronProvider() {
	return (init_CdpElectronProvider = __esmMin((() => {
		init_CdpDiscoveryTargets();
		init_asarHeaderAdmission();
		init_electronObservation$1();
		init_browserDeadline();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_browserObservationError();
		init_providerAdapterError();
		init_result();
		init_CdpEndpoint();
		init_CdpTargetSession();
		init_CdpElectronInspection();
		init_ElectronFileScope();
		init_providerIdentities();
		init_unicodeCodePointOrder();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_CdpTargetSessionOwner();
		init_errorMessage();
		CdpElectronProvider = class {
			#owner = new CdpTargetSessionOwner();
			#asarHeaderAdmission;
			/** The admission comes from the composition root's environment; default otherwise. */
			constructor(asarHeaderAdmission = DEFAULT_ASAR_HEADER_ADMISSION) {
				this.#asarHeaderAdmission = asarHeaderAdmission;
			}
			#activeOperations = 0;
			#closing = false;
			#closePromise;
			#idleWaiters = new Set();
			async close() {
				if (this.#closePromise === undefined) {
					this.#closing = true;
					const attempt = this.#closeAfterOperations();
					let tracked;
					tracked = attempt.catch((cause) => {
						if (this.#closePromise === tracked) this.#closePromise = undefined;
						throw cause;
					});
					this.#closePromise = tracked;
				}
				await this.#closePromise;
			}
			async #closeAfterOperations() {
				while (this.#activeOperations > 0) await new Promise((resolve) => this.#idleWaiters.add(resolve));
				const outcomes = await Promise.allSettled([this.#owner.close(), retryElectronFileCleanup()]);
				const failures = outcomes.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
				const mapped = failures.map((failure) => mapElectronFileAuthorizationFailure(failure, CDP_ELECTRON_PROVIDER_IDENTITY.id, "inspect_electron_page") ?? failure);
				if (mapped.length === 1) throw mapped[0];
				if (mapped.length > 1) {
					const typed = mapped.filter((failure) => failure instanceof AnalysisError);
					throw providerCleanupErrorFromFailures(CDP_ELECTRON_PROVIDER_IDENTITY.id, typed, "Electron transport and file cleanup remain incomplete", {
						operation: "inspect_electron_page",
						causes: mapped
					});
				}
			}
			identity() {
				return CDP_ELECTRON_PROVIDER_IDENTITY;
			}
			async listTargets(input, options = {}) {
				return await this.#withAdmission("list_electron_targets", async () => await this.#listTargets(input, options));
			}
			async #listTargets(input, options) {
				const allowed = [];
				let discovery;
				let unsupportedUrl = 0;
				let nonPage = 0;
				let unconnectable = 0;
				let examined = 0;
				try {
					discovery = await discoverCdpEndpoint(input.cdp_endpoint, "list_electron_targets", options.signal);
					throwIfElectronOperationCancelled(options.signal, "list_electron_targets");
					for (const target of discovery.targets) {
						throwIfElectronOperationCancelled(options.signal, "list_electron_targets");
						if (target.type !== "page") {
							examined += 1;
							nonPage += 1;
							continue;
						}
						const path = await authorizedElectronFile(target.url, options.signal, "list_electron_targets", this.#asarHeaderAdmission);
						if (path === undefined) {
							examined += 1;
							unsupportedUrl += 1;
							continue;
						}
						if (!hasCdpTargetWebSocket(discovery, target)) {
							examined += 1;
							unconnectable += 1;
							continue;
						}
						examined += 1;
						allowed.push({
							target_id: target.id,
							type: target.type,
							title: target.title,
							file_path: path,
							attached: target.attached
						});
					}
					allowed.sort((left, right) => compareUnicodeCodePoints(left.target_id, right.target_id));
					throwIfElectronOperationCancelled(options.signal, "list_electron_targets");
					return ok(electronTargetListSchema.parse({
						browser: discovery.version,
						targets: allowed,
						excluded: {
							unsupported_url: unsupportedUrl,
							non_page: nonPage
						},
						limitations: [
							...discovery.limitations ?? [],
							"Every local file page exposed by the selected loopback CDP endpoint is eligible for listing.",
							...unconnectable === 0 ? [] : [`${String(unconnectable)} otherwise allowed page target(s) lacked a validated direct CDP WebSocket and were excluded.`],
							...allowed.some((target) => target.attached === null) ? ["CDP discovery could not establish debugger attachment state for one or more targets."] : []
						]
					}));
				} catch (cause) {
					const completedPrefix = {
						browser_version: discovery?.version ?? null,
						examined_targets: examined,
						discovered_targets: discovery?.targets.length ?? null,
						allowed_targets: allowed,
						excluded: {
							unsupported_url: unsupportedUrl,
							non_page: nonPage
						},
						unconnectable_targets: unconnectable,
						coverage: "partial: target authorization stopped; remaining targets are unknown"
					};
					const fileFailure = mapElectronFileAuthorizationFailure(cause, CDP_ELECTRON_PROVIDER_IDENTITY.id, "list_electron_targets", { completed_prefix: completedPrefix });
					if (fileFailure !== undefined) return err(fileFailure);
					return err(options.signal?.aborted === true ? cancelledBy("list_electron_targets", options.signal, { diagnostics: { completed_prefix: completedPrefix } }) : providerError(cause, "list_electron_targets"));
				}
			}
			async inspectPage(input, options = {}) {
				return await this.#withAdmission("inspect_electron_page", async () => await this.#inspectPage(input, options));
			}
			async #inspectPage(input, options) {
				let targetSession;
				let cleanupFailure;
				let result;
				try {
					const discovery = await discoverCdpEndpoint(input.cdp_endpoint, "inspect_electron_page", options.signal);
					const target = await authorizeTarget(discovery, input.target_id, this.#asarHeaderAdmission, options.signal);
					targetSession = await openCdpTargetSession(discovery, target, "inspect_electron_page", options.signal, { commandTimeoutMs: selectedCdpCommandTimeoutMs(input.command_timeout_ms) }, this.#owner);
					result = ok(electronPageInspectionSchema.parse(await inspectCdpElectronPage({
						connection: targetSession.connection,
						sessionId: targetSession.sessionId,
						discovery,
						target,
						input,
						asarHeaderAdmission: this.#asarHeaderAdmission,
						...options.signal === undefined ? {} : { signal: options.signal },
						...options.progress === undefined ? {} : { progress: options.progress }
					})));
				} catch (cause) {
					result = err(providerError(cause, "inspect_electron_page"));
				} finally {
					if (targetSession !== undefined) try {
						await closeCdpTargetSession(targetSession, [
							"Debugger",
							"Runtime",
							"Page"
						], options.signal, this.#owner);
					} catch (cause) {
						cleanupFailure = cause instanceof AnalysisError ? cause : new ProviderCleanupError(CDP_ELECTRON_PROVIDER_IDENTITY.id, [input.target_id], { reason: errorMessage(cause) }, {
							operation: "inspect_electron_page",
							cause
						});
					}
				}
				const finalCancellation = result.ok && options.signal?.aborted === true ? cancelledBy("inspect_electron_page", options.signal, { partialObservation: {
					kind: "electron-page-observation",
					inspection: result.value,
					cleanup: cleanupFailure === undefined ? "transport-closed" : "incomplete"
				} }) : undefined;
				if (cleanupFailure !== undefined) {
					if (finalCancellation !== undefined) return err(bindCdpTransportCleanup(cleanupFailure, analysisErrorWithCleanupFailure(finalCancellation, cleanupFailure, "inspect_electron_page")));
					if (!result.ok) return err(bindCdpTransportCleanup(cleanupFailure, analysisErrorWithCleanupFailure(result.error, cleanupFailure, "inspect_electron_page")));
					return err(bindCdpTransportCleanup(cleanupFailure, new ProviderCleanupError(CDP_ELECTRON_PROVIDER_IDENTITY.id, cleanupFailure.cleanupResources, { cleanup_error: cleanupFailure.message }, {
						operation: "inspect_electron_page",
						cause: cleanupFailure,
						partialObservation: {
							kind: "electron-page-observation",
							inspection: result.value,
							cleanup: "incomplete"
						}
					})));
				}
				if (!result.ok) return result;
				if (finalCancellation !== undefined) return err(finalCancellation);
				return result;
			}
			async #withAdmission(operation, work) {
				if (this.#closing) return err(new ProviderAdapterError(CDP_ELECTRON_PROVIDER_IDENTITY.id, operation, {
					diagnostics: { reason: "provider_closed" },
					userMessage: "Electron provider is closed to new observations."
				}));
				this.#activeOperations += 1;
				try {
					return await work();
				} catch (cause) {
					return err(providerError(cause, operation));
				} finally {
					this.#activeOperations -= 1;
					if (this.#activeOperations === 0) {
						for (const resolve of this.#idleWaiters) resolve();
						this.#idleWaiters.clear();
					}
				}
			}
		};
		authorizeTarget = async (discovery, targetId, asarHeaderAdmission, signal) => {
			throwIfElectronOperationCancelled(signal, "inspect_electron_page");
			const target = selectCdpDiscoveryTarget(discovery.targets, targetId, "inspect_electron_page", discovery.ambiguousTargetIds);
			if (target === undefined) throw new BrowserObservationError("inspect_web_page", "target_not_found");
			if (target.type !== "page") throw new BrowserObservationError("inspect_web_page", "target_not_allowed");
			const path = await authorizedElectronFile(target.url, signal, "inspect_electron_page", asarHeaderAdmission);
			throwIfElectronOperationCancelled(signal, "inspect_electron_page");
			if (path === undefined) throw new BrowserObservationError("inspect_web_page", "target_not_allowed");
			return target;
		};
		throwIfElectronOperationCancelled = (signal, operation) => {
			if (signal?.aborted === true) throw cancelledBy(operation, signal);
		};
		providerError = (cause, operation) => {
			const fileFailure = mapElectronFileAuthorizationFailure(cause, CDP_ELECTRON_PROVIDER_IDENTITY.id, operation);
			if (fileFailure !== undefined) return fileFailure;
			return cause instanceof BrowserObservationError ? cause.forOperation(operation) : cause instanceof AnalysisError ? cause : new ProviderAdapterError(CDP_ELECTRON_PROVIDER_IDENTITY.id, operation, { cause });
		};
	})))();
}

//#endregion
//#region dist/composition/electronObservation.js
var createElectronObservationProvider;
function init_electronObservation() {
	return (init_electronObservation = __esmMin((() => {
		init_runtimeAnalysisSettings();
		init_CdpElectronProvider();
		createElectronObservationProvider = (environment, settings) => new CdpElectronProvider(runtimeAsarHeaderAdmission(environment, settings));
	})))();
}

//#endregion
init_electronObservation();
export { createElectronObservationProvider };