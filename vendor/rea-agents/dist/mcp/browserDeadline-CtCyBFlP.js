import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { $t as init_analysisResourceLimits, Jt as MAX_NODE_TIMER_DELAY_MS, Qt as deadlineParameterLimit, en as timerDurationMsSchema } from "./jsonValue-BIEmjG1z.js";

//#region dist/domain/browserDeadline.js
var DEFAULT_CDP_COMMAND_TIMEOUT_MS, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS, CDP_CLEANUP_GRACE_MS, optionalBrowserDeadlineMs, selectedBrowserDeadlineMs, browserDeadlineIncrease, browserDeadlineRetry, noRuntimeOverrideSentence, webRuntimeCommandTimeoutSchema, browserDiscoveryTimeoutSchema, DISCOVERY_TIMEOUT_OPERATIONS, cdpDiscoveryTimeoutIsSelectable, COMMAND_TIMEOUT_OPERATIONS, cdpCommandTimeoutIsSelectable, cdpCommandTimeoutUnrelatedControl, cdpDeadlineSubject, cdpCommandDeadlineRecovery, cdpDiscoveryTimeoutRecovery, cdpCleanupGraceExpired, selectedCdpCommandTimeoutMs, selectedCdpDiscoveryTimeoutMs;
function init_browserDeadline() {
	return (init_browserDeadline = __esmMin((() => {
		init_analysisResourceLimits();
		DEFAULT_CDP_COMMAND_TIMEOUT_MS = 2e4;
		CDP_DISCOVERY_RESPONSE_TIMEOUT_MS = 1e4;
		CDP_CLEANUP_GRACE_MS = 5e3;
		optionalBrowserDeadlineMs = (description) => timerDurationMsSchema.optional().describe(description);
		selectedBrowserDeadlineMs = (selected, defaultMs) => selected ?? defaultMs;
		browserDeadlineIncrease = (key, timeoutMs, defaultMs) => timeoutMs < 2147483647 ? `Increase ${key} above ${String(timeoutMs)} (integer milliseconds from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}; omitted means ${String(defaultMs)}).` : `${key} is already at the maximum ${String(MAX_NODE_TIMER_DELAY_MS)} ms; do not increase it further.`;
		browserDeadlineRetry = "Applies on the next call. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.";
		noRuntimeOverrideSentence = (allowance, unrelatedControl) => `${allowance} This release has no runtime override.${unrelatedControl === undefined ? "" : ` ${unrelatedControl} does not raise it.`}`;
		webRuntimeCommandTimeoutSchema = optionalBrowserDeadlineMs(`CDP WebSocket handshake and per-command response deadline in milliseconds (default ${String(DEFAULT_CDP_COMMAND_TIMEOUT_MS)}). Omitted means ${String(DEFAULT_CDP_COMMAND_TIMEOUT_MS)} and applies on the next call. deadlineExpired for a handshake or command is not the caller observation window, not the CDP discovery deadline (default ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ms, or discovery_timeout_ms where supported), and not the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace. It also bounds passive script-source collection and the inspection/source-join phase that share this deadline. Does not raise the fixed protocol, retained-event, or source byte budgets, or the cleanup grace, which have no runtime override.`);
		browserDiscoveryTimeoutSchema = optionalBrowserDeadlineMs(`Loopback CDP HTTP discovery per-response deadline and browser-socket handshake plus discovery (Browser.getVersion, Target.getTargets) deadline in milliseconds (default ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)}). Omitted means ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} and applies on the next call. Separate from command_timeout_ms, the caller observation window, and the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace. Does not raise the fixed HTTP discovery document or WebSocket protocol byte budgets, which have no runtime override.`);
		DISCOVERY_TIMEOUT_OPERATIONS = new Set([
			"list_browser_targets",
			"inspect_web_page",
			"analyze_web_bundle",
			"observe_web_session",
			"discover_webmcp_tools",
			"capture_web_screenshot"
		]);
		cdpDiscoveryTimeoutIsSelectable = (operation) => DISCOVERY_TIMEOUT_OPERATIONS.has(operation);
		COMMAND_TIMEOUT_OPERATIONS = new Set([
			"inspect_web_page",
			"analyze_web_bundle",
			"observe_web_session",
			"observe_web_execution",
			"inspect_web_event_listeners",
			"discover_webmcp_tools",
			"capture_web_screenshot",
			"inspect_electron_page",
			"capture_browser_scenario"
		]);
		cdpCommandTimeoutIsSelectable = (operation) => COMMAND_TIMEOUT_OPERATIONS.has(operation);
		cdpCommandTimeoutUnrelatedControl = (operation) => cdpCommandTimeoutIsSelectable(operation) ? "command_timeout_ms" : undefined;
		cdpDeadlineSubject = (timeoutMs, phase, method, selectable) => {
			const budget = selectable ? `${String(timeoutMs)} ms command_timeout_ms` : `fixed ${String(timeoutMs)} ms`;
			if (phase === "handshake") return `CDP WebSocket handshake exceeded its ${budget} deadline (deadlineExpired).`;
			if (phase === "source-join") return `The inspection/source-join phase exceeded its ${budget} deadline (deadlineExpired).`;
			return `CDP command ${method ?? "request"} exceeded its ${budget} response deadline (deadlineExpired).`;
		};
		cdpCommandDeadlineRecovery = (timeoutMs, phase, method, selectable = true) => {
			const subject = cdpDeadlineSubject(timeoutMs, phase, method, selectable);
			if (!selectable) {
				const fixed = noRuntimeOverrideSentence(`${subject} This is not the caller observation window and not the ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ms CDP discovery deadline.`);
				return {
					userMessage: fixed,
					remediationAction: fixed
				};
			}
			return {
				userMessage: `${subject} This is not the caller observation window, not the ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ms CDP discovery deadline, and not the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace.`,
				limit: deadlineParameterLimit("command_timeout_ms", timeoutMs, DEFAULT_CDP_COMMAND_TIMEOUT_MS),
				remediationAction: `${browserDeadlineIncrease("command_timeout_ms", timeoutMs, DEFAULT_CDP_COMMAND_TIMEOUT_MS)} ${browserDeadlineRetry} command_timeout_ms does not raise the CDP discovery deadline (default ${String(CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ms, or discovery_timeout_ms where supported), nor the fixed protocol, retained-event, or source byte budgets or the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace, which have no runtime override.`
			};
		};
		cdpDiscoveryTimeoutRecovery = (operation, timeoutMs, phase, budgetDescription) => {
			const unrelatedCommand = cdpCommandTimeoutUnrelatedControl(operation);
			if (!cdpDiscoveryTimeoutIsSelectable(operation)) {
				const subject = phase === "response" ? `CDP discovery response exceeded its ${String(timeoutMs)} ms deadline.` : `CDP browser-socket discovery exceeded its ${String(timeoutMs)} ms deadline.`;
				const fixed = noRuntimeOverrideSentence(`${budgetDescription} and the ${String(timeoutMs)} ms discovery deadline stay fixed.`, unrelatedCommand);
				return {
					userMessage: `${subject} ${fixed}`,
					remediationAction: fixed
				};
			}
			const subject = phase === "response" ? `CDP discovery response exceeded its ${String(timeoutMs)} ms discovery_timeout_ms deadline (deadlineExpired).` : `CDP browser-socket discovery exceeded its ${String(timeoutMs)} ms discovery_timeout_ms deadline (deadlineExpired).`;
			const fixedBudget = noRuntimeOverrideSentence(`${budgetDescription} stays fixed.`, unrelatedCommand);
			return {
				userMessage: `${subject} This is not the caller observation window and not the ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace. ${fixedBudget}`,
				remediationAction: `${browserDeadlineIncrease("discovery_timeout_ms", timeoutMs, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)} ${browserDeadlineRetry} ${fixedBudget}`,
				limit: deadlineParameterLimit("discovery_timeout_ms", timeoutMs, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS)
			};
		};
		cdpCleanupGraceExpired = () => noRuntimeOverrideSentence(`CDP runtime cleanup exceeded its ${String(CDP_CLEANUP_GRACE_MS)} ms cleanup grace.`, "command_timeout_ms");
		selectedCdpCommandTimeoutMs = (selected) => selectedBrowserDeadlineMs(selected, DEFAULT_CDP_COMMAND_TIMEOUT_MS);
		selectedCdpDiscoveryTimeoutMs = (selected) => selectedBrowserDeadlineMs(selected, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS);
	})))();
}

//#endregion
export { selectedCdpDiscoveryTimeoutMs as _, browserDeadlineRetry as a, cdpCommandDeadlineRecovery as c, cdpDiscoveryTimeoutRecovery as d, init_browserDeadline as f, selectedCdpCommandTimeoutMs as g, selectedBrowserDeadlineMs as h, browserDeadlineIncrease as i, cdpCommandTimeoutIsSelectable as l, optionalBrowserDeadlineMs as m, CDP_DISCOVERY_RESPONSE_TIMEOUT_MS as n, browserDiscoveryTimeoutSchema as o, noRuntimeOverrideSentence as p, DEFAULT_CDP_COMMAND_TIMEOUT_MS as r, cdpCleanupGraceExpired as s, CDP_CLEANUP_GRACE_MS as t, cdpCommandTimeoutUnrelatedControl as u, webRuntimeCommandTimeoutSchema as v };