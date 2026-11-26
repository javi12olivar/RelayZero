import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { _ as init_analysisErrorCore, m as cancelledBy } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_budget, t as Budget } from "./budget-CGAFFXhi.js";
import { n as init_ProviderDeadline, t as ProviderStartupDeadline } from "./ProviderDeadline-DNC6uvib.js";
import { d as classifyBrowserCompleteness, f as init_browserCompleteness } from "./browserObservationSchemas-C2xdVg3B.js";
import { f as init_browserDeadline, g as selectedCdpCommandTimeoutMs, p as noRuntimeOverrideSentence } from "./browserDeadline-CtCyBFlP.js";
import { n as init_webRuntime, t as WEB_RUNTIME_LIMITS } from "./webRuntime-CkS0qD76.js";
import { M as init_CdpCommands, _t as sourceResult, a as init_CdpConnection, dt as init_CdpCaptureValues, g as init_CdpCommandRejection, gt as sourceExcluded, h as CdpCommandRejection, k as CdpMalformedReply, lt as cdpStringValue, mt as recordValue } from "./CdpTargetSessionOwner-x5phC2Yq.js";

//#region dist/browser/CdpCaptureCompleteness.js
var EVENT_SECTIONS, POLICY_REASONS, CdpCaptureCompleteness, emptyDropped;
function init_CdpCaptureCompleteness() {
	return (init_CdpCaptureCompleteness = __esmMin((() => {
		init_browserCompleteness();
		EVENT_SECTIONS = {
			scripts: "scripts",
			network_requests: "network_requests",
			console_events: "console_events",
			websocket_connections: "websocket_connections",
			websocket_frames: "websocket_frames",
			webmcp_tools: "webmcp_tools",
			timeline_events: "timeline"
		};
		POLICY_REASONS = new Set([
			"disallowed_origin",
			"unsupported_url",
			"unattributed_origin",
			"not_approved",
			"out_of_target_scope"
		]);
		CdpCaptureCompleteness = class {
			#initialAttachLimited;
			#policyFiltered = new Set();
			#attachLimited = new Set();
			#truncated = new Set();
			#unavailable = new Set();
			#excluded = new Map();
			#dropped = emptyDropped();
			constructor(initialAttachLimited = []) {
				this.#initialAttachLimited = [...initialAttachLimited];
				this.reset();
			}
			reset() {
				this.#policyFiltered.clear();
				this.#attachLimited.clear();
				this.#truncated.clear();
				this.#unavailable.clear();
				this.#excluded.clear();
				Object.assign(this.#dropped, emptyDropped());
				for (const section of this.#initialAttachLimited) this.#attachLimited.add(section);
			}
			exclude(section, reason, count = 1) {
				if (POLICY_REASONS.has(reason)) this.#policyFiltered.add(section);
				if (reason === "provider_unavailable" || reason === "unattributed_target" || reason === "invalid_protocol_value" || reason === "unknown_target_relationship") this.#unavailable.add(section);
				if (reason === "resource_budget_exhausted") this.#truncated.add(section);
				const key = `${section}\0${reason}`;
				const existing = this.#excluded.get(key);
				const combined = count === null || existing?.count === null ? null : (existing?.count ?? 0) + count;
				this.#excluded.set(key, {
					section,
					reason,
					count: combined
				});
			}
			attachLimited(section) {
				this.#attachLimited.add(section);
			}
			unavailable(section) {
				this.#unavailable.add(section);
				this.exclude(section, "provider_unavailable", null);
			}
			truncate(section) {
				this.#truncated.add(section);
			}
			drop(kind, count = 1) {
				this.#dropped[kind] += count;
				this.#truncated.add(EVENT_SECTIONS[kind]);
			}
			get droppedTotal() {
				return Object.values(this.#dropped).reduce((sum, count) => sum + count, 0);
			}
			snapshot() {
				return classifyBrowserCompleteness({
					policyFilteredSections: this.#policyFiltered,
					attachLimitedSections: this.#attachLimited,
					truncatedSections: this.#truncated,
					unavailableSections: this.#unavailable,
					excluded: [...this.#excluded.values()],
					droppedEvents: this.#dropped
				});
			}
		};
		emptyDropped = () => ({
			scripts: 0,
			network_requests: 0,
			console_events: 0,
			websocket_connections: 0,
			websocket_frames: 0,
			webmcp_tools: 0,
			timeline_events: 0
		});
	})))();
}

//#endregion
//#region dist/browser/CdpCaptureEventTypes.js
var CDP_CAPTURE_SCRIPT_METADATA_LIMITS;
function init_CdpCaptureEventTypes() {
	return (init_CdpCaptureEventTypes = __esmMin((() => {
		CDP_CAPTURE_SCRIPT_METADATA_LIMITS = {
			retainedBytes: 8 * 1024 * 1024,
			scripts: 5e4
		};
	})))();
}

//#endregion
//#region dist/browser/CdpOptionalCommand.js
var optionalCdpCommand;
function init_CdpOptionalCommand() {
	return (init_CdpOptionalCommand = __esmMin((() => {
		init_result();
		init_CdpCommands();
		init_CdpCommandRejection();
		init_CdpConnection();
		optionalCdpCommand = async (context, method, parameters, limitations) => {
			try {
				return ok(await context.connection.send(method, parameters, context.sessionId, context.signal));
			} catch (cause) {
				if (cause instanceof CdpMalformedReply) {
					const limitation = `${method} returned a malformed result; the section that reads it is incomplete.`;
					if (!limitations.includes(limitation)) limitations.push(limitation);
					return err({
						_tag: "CdpMalformedReply",
						reply: cause
					});
				}
				if (!(cause instanceof CdpCommandRejection) || cause.code !== -32601) throw cause;
				limitations.push(`${method} was unavailable from this browser target.`);
				return err({ _tag: "CdpCommandUnavailable" });
			}
		};
	})))();
}

//#endregion
//#region dist/browser/CdpScriptSourceBudget.js
var MIB, CDP_SCRIPT_SOURCE_BYTES_OMISSION_REASON, cdpScriptSourceDeadlineOmissionReason, CdpScriptSourceBudget;
function init_CdpScriptSourceBudget() {
	return (init_CdpScriptSourceBudget = __esmMin((() => {
		init_budget();
		init_browserDeadline();
		init_webRuntime();
		init_ProviderDeadline();
		MIB = 1024 * 1024;
		CDP_SCRIPT_SOURCE_BYTES_OMISSION_REASON = `script source was omitted because the aggregate ${String(WEB_RUNTIME_LIMITS.sourceBytes)}-byte (${String(WEB_RUNTIME_LIMITS.sourceBytes / MIB)} MiB) source budget was exhausted. ${noRuntimeOverrideSentence("That source budget stays fixed.", "command_timeout_ms")}`;
		cdpScriptSourceDeadlineOmissionReason = (timeoutMs) => `script source was omitted because the ${String(timeoutMs)} ms command_timeout_ms source collection deadline elapsed (deadlineExpired). This is not the caller observation window. ${noRuntimeOverrideSentence(`The ${String(WEB_RUNTIME_LIMITS.sourceBytes)}-byte source budget stays fixed.`, "command_timeout_ms")}`;
		CdpScriptSourceBudget = class {
			#deadline;
			commandTimeoutMs;
			#retained = new Budget(WEB_RUNTIME_LIMITS.sourceBytes);
			constructor(signal, commandTimeoutMs = selectedCdpCommandTimeoutMs(undefined)) {
				this.commandTimeoutMs = commandTimeoutMs;
				this.#deadline = new ProviderStartupDeadline(commandTimeoutMs, signal);
			}
			get signal() {
				return this.#deadline.signal;
			}
			get timedOut() {
				return this.#deadline.interruption === "timeout";
			}
			/** Admit exact UTF-8 source bytes before building or retaining its artifact. */
			admit(text) {
				return this.#retained.tryCharge(Buffer.byteLength(text, "utf8"));
			}
			dispose() {
				this.#deadline.dispose();
			}
		};
	})))();
}

//#endregion
//#region dist/browser/CdpScriptSourceCapture.js
var capturePassiveCdpScriptSource;
function init_CdpScriptSourceCapture() {
	return (init_CdpScriptSourceCapture = __esmMin((() => {
		init_analysisErrorCore();
		init_CdpCaptureValues();
		init_CdpScriptSourceBudget();
		capturePassiveCdpScriptSource = async (input) => {
			const omitForBudget = () => {
				input.completeness.exclude("script_sources", "resource_budget_exhausted");
				return sourceExcluded(input.sourceBudget.timedOut ? cdpScriptSourceDeadlineOmissionReason(input.sourceBudget.commandTimeoutMs) : CDP_SCRIPT_SOURCE_BYTES_OMISSION_REASON);
			};
			const throwIfCancelled = () => {
				if (input.signal?.aborted === true) throw cancelledBy(input.operation, input.signal);
			};
			throwIfCancelled();
			if (input.sourceBudget.timedOut) return omitForBudget();
			try {
				const { scriptSource: text } = await input.connection.send("Debugger.getScriptSource", { scriptId: input.scriptId }, input.sessionId, input.sourceBudget.signal);
				throwIfCancelled();
				if (input.sourceBudget.timedOut || !input.sourceBudget.admit(text)) return omitForBudget();
				return sourceResult(text);
			} catch (cause) {
				throwIfCancelled();
				if (input.sourceBudget.timedOut) return omitForBudget();
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/browser/CdpWorkerTarget.js
var parseCdpWorkerTarget, workerTargetOwnership;
function init_CdpWorkerTarget() {
	return (init_CdpWorkerTarget = __esmMin((() => {
		init_result();
		init_CdpCaptureValues();
		parseCdpWorkerTarget = (input) => {
			const target = recordValue(input);
			const type = cdpStringValue(target?.type);
			if (target === undefined || type === undefined || type === "") return err({ _tag: "InvalidWorkerTarget" });
			if (!type.includes("worker")) return ok({ kind: "non_worker" });
			const targetId = cdpStringValue(target.targetId);
			const url = cdpStringValue(target.url);
			const openerTargetId = cdpStringValue(target.openerId);
			const parentFrameId = cdpStringValue(target.parentFrameId);
			if (targetId === undefined || targetId === "" || url === undefined || typeof target.attached !== "boolean" || target.openerId !== undefined && (openerTargetId === undefined || openerTargetId === "") || target.parentFrameId !== undefined && (parentFrameId === undefined || parentFrameId === "")) return err({ _tag: "InvalidWorkerTarget" });
			return ok({
				kind: "worker",
				targetId,
				type,
				url,
				attached: target.attached,
				openerTargetId: openerTargetId ?? null,
				parentFrameId: parentFrameId ?? null
			});
		};
		workerTargetOwnership = (relationships, selectedTargetId, frameIds) => {
			const { openerTargetId, parentFrameId } = relationships;
			if (openerTargetId === selectedTargetId || parentFrameId !== null && frameIds.has(parentFrameId)) return "selected";
			return openerTargetId === null && parentFrameId === null ? "unknown" : "foreign";
		};
	})))();
}

//#endregion
export { init_CdpScriptSourceCapture as a, init_CdpOptionalCommand as c, init_CdpCaptureEventTypes as d, CdpCaptureCompleteness as f, capturePassiveCdpScriptSource as i, optionalCdpCommand as l, parseCdpWorkerTarget as n, CdpScriptSourceBudget as o, init_CdpCaptureCompleteness as p, workerTargetOwnership as r, init_CdpScriptSourceBudget as s, init_CdpWorkerTarget as t, CDP_CAPTURE_SCRIPT_METADATA_LIMITS as u };