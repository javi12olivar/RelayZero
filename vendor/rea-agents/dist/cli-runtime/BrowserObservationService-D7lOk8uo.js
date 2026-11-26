import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisOutputError, cancelledBy, init_analysisErrorCore, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { browserUrlTargetIdentity, init_browserObservation, sanitizeBrowserUrl } from "./browserObservation-BVcDYwHI.js";
import { browserTargetListSchema, init_browserObservationSchemas, webPageInspectionSchema } from "./browserObservationSchemas-D0tzRJhs.js";
import { init_webScreenshot, webScreenshotDiffSchema, webScreenshotSchema } from "./browserNetworkMediaType-CbMlNDyh.js";
import { init_webBundleAnalysis, webBundleAcquisitionPartialObservationSchema, webBundleAnalysisSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { completeProviderEvidence, init_ProviderOperationExecution, keepIncompleteObservation } from "./ProviderOperationExecution-DJuOJe_5.js";
import { browserCaptureComparisonSchema, commitBrowserScenarioNormalization, init_browserCaptureComparison, init_browserScenarioNormalization, init_browserSession, init_webMcpDiscovery, webMcpDiscoverySchema, webObservationSessionSchema } from "./browserCaptureComparison-CENSP7Ut.js";
import { isDeepStrictEqual } from "node:util";

//#region dist/application/BrowserEvidence.js
var isBundleAcquisition, createBrowserEvidence, browserSubject, browserParameters, browserResultTargetOrigin, isScreenshotComparison, browserPredicate;
function init_BrowserEvidence() {
	return (init_BrowserEvidence = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		init_browserObservation();
		init_browserScenarioNormalization();
		init_canonicalDigest();
		isBundleAcquisition = (result) => "kind" in result && result.kind === "web-bundle-acquisition";
		createBrowserEvidence = (operation, input, report, provider) => {
			const result = report.facts;
			const acquisition = isBundleAcquisition(result);
			const observed = acquisition ? result.inspection : result;
			const comparison = operation === "compare_web_captures" || operation === "compare_web_screenshots";
			return createEvidence(browserSubject(operation, observed), provider, {
				predicateType: browserPredicate(operation),
				operation,
				parameters: {
					...browserParameters(input, result),
					...comparison ? { comparison_input_sha256: digestCanonicalValue(input, "Browser comparison input") } : {}
				},
				result,
				rawResult: isDeepStrictEqual(report.source, result) ? null : report.source,
				confidence: comparison ? "derived" : "observed",
				authority: comparison ? "analyst-inference" : "external-service",
				environment: "browser" in observed ? {
					id: `${observed.browser.product}@${observed.browser.revision}`,
					platform: "unknown",
					architecture: "unknown",
					isolation: "none"
				} : null,
				limitations: [
					...observed.limitations,
					...acquisition && result.source_maps.limitation !== undefined ? [result.source_maps.limitation] : [],
					..."browser" in observed ? ["Browser host platform and architecture were not observed."] : []
				]
			});
		};
		browserSubject = (operation, observed) => {
			switch (operation) {
				case "list_browser_targets":
				case "compare_web_captures":
				case "compare_web_screenshots": return unknownTarget("not-observed");
				case "analyze_web_bundle":
					if ("capture" in observed && "target_url" in observed.capture) return browserUrlTargetIdentity(observed.capture.target_url);
					if ("target" in observed && "url" in observed.target) return browserUrlTargetIdentity(observed.target.url);
					break;
				case "observe_web_session":
					if ("target" in observed && "initial_url" in observed.target) return browserUrlTargetIdentity(observed.target.initial_url);
					break;
				case "inspect_web_page":
				case "discover_webmcp_tools":
				case "capture_web_screenshot":
					if ("target" in observed && "url" in observed.target) return browserUrlTargetIdentity(observed.target.url);
					break;
			}
			throw new Error(`Browser ${operation} result does not report its document`);
		};
		browserParameters = (input, result) => {
			if (!("cdp_endpoint" in input)) {
				if ("before_scenario" in input) return {
					comparison_kind: "browser_scenario",
					before_browser: input.before_scenario.browser,
					after_browser: input.after_scenario.browser,
					before_start_origin: input.before_scenario.scenario.start_origin,
					after_start_origin: input.after_scenario.scenario.start_origin,
					normalization_sha256: commitBrowserScenarioNormalization(input.normalization).sha256
				};
				if ("inspection" in input.before && "inspection" in input.after) return {
					before_target_id: input.before.inspection.target.target_id,
					before_capture_ended_at: input.before.inspection.capture_window.ended_at,
					after_target_id: input.after.inspection.target.target_id,
					after_capture_ended_at: input.after.inspection.capture_window.ended_at
				};
				if (isScreenshotComparison(input)) return {
					before_artifact_sha256: input.before.sha256,
					after_artifact_sha256: input.after.sha256,
					channel_threshold: input.channel_threshold
				};
				throw new Error("Browser comparison input did not match a comparison type");
			}
			const observedOrigin = browserResultTargetOrigin(result);
			const scope = {
				cdp_endpoint: input.cdp_endpoint.recorded,
				allowed_origins: input.allowed_origins.length > 0 ? input.allowed_origins : "target_id" in input && observedOrigin !== undefined ? [observedOrigin] : [],
				..."discovery_timeout_ms" in input && input.discovery_timeout_ms !== undefined ? { discovery_timeout_ms: input.discovery_timeout_ms } : {},
				..."command_timeout_ms" in input && input.command_timeout_ms !== undefined ? { command_timeout_ms: input.command_timeout_ms } : {}
			};
			if (!("target_id" in input)) return scope;
			return {
				...scope,
				target_id: input.target_id,
				..."observation_ms" in input ? { observation_ms: input.observation_ms } : {},
				..."include_accessibility_text" in input ? {
					include_accessibility_text: input.include_accessibility_text,
					include_console_text: input.include_console_text,
					include_json_body_shapes: input.include_json_body_shapes,
					include_websocket_shapes: input.include_websocket_shapes,
					include_storage_keys: input.include_storage_keys,
					include_storage_fingerprints: input.include_storage_fingerprints,
					..."include_script_sources" in input ? { include_script_sources: input.include_script_sources } : {}
				} : {},
				..."fetch_source_maps" in input ? {
					fetch_source_maps: input.fetch_source_maps,
					...input.source_map_limits === undefined ? {} : { source_map_limits: input.source_map_limits },
					...input.semantic_precision === undefined ? {} : { semantic_precision: input.semantic_precision },
					...input.max_heap_mb === undefined ? {} : { max_heap_mb: input.max_heap_mb },
					...input.analysis_timeout_ms === undefined ? {} : { analysis_timeout_ms: input.analysis_timeout_ms },
					...input.total_analysis_timeout_ms === undefined ? {} : { total_analysis_timeout_ms: input.total_analysis_timeout_ms },
					...input.source_map_fetch_timeout_ms === undefined ? {} : { source_map_fetch_timeout_ms: input.source_map_fetch_timeout_ms }
				} : {}
			};
		};
		browserResultTargetOrigin = (result) => {
			if ("inspection" in result && typeof result.inspection === "object" && result.inspection !== null && "target" in result.inspection && typeof result.inspection.target === "object" && result.inspection.target !== null && "origin" in result.inspection.target && typeof result.inspection.target.origin === "string") return result.inspection.target.origin;
			if ("capture" in result) return result.capture.target_origin ?? undefined;
			if (!("target" in result)) return undefined;
			if ("origin" in result.target) return result.target.origin;
			if ("initial_url" in result.target) return sanitizeBrowserUrl(result.target.initial_url).origin ?? undefined;
			return undefined;
		};
		isScreenshotComparison = (input) => "channel_threshold" in input;
		browserPredicate = (operation) => {
			switch (operation) {
				case "list_browser_targets": return "rea.browser-target-list";
				case "inspect_web_page": return "rea.web-page-inspection";
				case "analyze_web_bundle": return "rea.web-bundle-analysis";
				case "observe_web_session": return "rea.web-observation-session";
				case "discover_webmcp_tools": return "rea.webmcp-discovery";
				case "compare_web_captures": return "rea.web-capture-diff";
				case "capture_web_screenshot": return "rea.web-screenshot";
				case "compare_web_screenshots": return "rea.web-screenshot-diff";
			}
		};
	})))();
}

//#endregion
//#region dist/application/BrowserObservationService.js
var browserResultSchemas, listBrowserTargets, inspectWebPage, analyzeWebBundle, observeWebSession, discoverWebMcpTools, compareWebCaptureEvidence, captureWebScreenshot, compareWebScreenshotEvidence, requireBrowser, browserEvidence, NON_JSON_BROWSER_OBSERVATION, retainBrowserObservation, promoteBrowserObservation;
function init_BrowserObservationService() {
	return (init_BrowserObservationService = __esmMin((() => {
		init_webBundleAnalysis();
		init_browserSession();
		init_webMcpDiscovery();
		init_browserCaptureComparison();
		init_webScreenshot();
		init_analysisErrorCore();
		init_result();
		init_BrowserEvidence();
		init_jsonValue();
		init_ProviderOperationExecution();
		init_browserObservationSchemas();
		browserResultSchemas = {
			list_browser_targets: browserTargetListSchema,
			inspect_web_page: webPageInspectionSchema,
			analyze_web_bundle: webBundleAnalysisSchema,
			observe_web_session: webObservationSessionSchema,
			discover_webmcp_tools: webMcpDiscoverySchema,
			capture_web_screenshot: webScreenshotSchema,
			compare_web_captures: browserCaptureComparisonSchema,
			compare_web_screenshots: webScreenshotDiffSchema
		};
		listBrowserTargets = async (browser, input, options = {}) => {
			const ready = requireBrowser(browser, "list_browser_targets");
			if (!ready.ok) return ready;
			if (options.signal?.aborted) return err(cancelledBy("list_browser_targets", options.signal));
			const result = await ready.value.listTargets(input, options);
			return result.ok ? browserEvidence("list_browser_targets", input, result.value, ready.value.identity(), options) : result;
		};
		inspectWebPage = async (browser, input, options = {}) => {
			const ready = requireBrowser(browser, "inspect_web_page");
			if (!ready.ok) return ready;
			if (options.signal?.aborted) return err(cancelledBy("inspect_web_page", options.signal));
			const result = await ready.value.inspectPage(input, options);
			if (!result.ok) return retainBrowserObservation(result.error, input, ready.value, "inspect_web_page");
			return result.ok ? browserEvidence("inspect_web_page", input, result.value, ready.value.identity(), options) : result;
		};
		analyzeWebBundle = async (browser, input, options = {}) => {
			const ready = requireBrowser(browser, "analyze_web_bundle");
			if (!ready.ok) return ready;
			if (options.signal?.aborted) return err(cancelledBy("analyze_web_bundle", options.signal));
			const analyzed = await ready.value.analyzeBundle(input, options);
			if (!analyzed.ok) return retainBrowserObservation(analyzed.error, input, ready.value, "analyze_web_bundle");
			return browserEvidence("analyze_web_bundle", input, analyzed.value, ready.value.identity(), options);
		};
		observeWebSession = async (browser, input, options = {}) => {
			const ready = requireBrowser(browser, "observe_web_session");
			if (!ready.ok) return ready;
			if (options.signal?.aborted) return err(cancelledBy("observe_web_session", options.signal));
			const observed = await ready.value.observeSession(input, options);
			return observed.ok ? browserEvidence("observe_web_session", input, observed.value, ready.value.identity(), options) : observed;
		};
		discoverWebMcpTools = async (browser, input, options = {}) => {
			const ready = requireBrowser(browser, "discover_webmcp_tools");
			if (!ready.ok) return ready;
			if (options.signal?.aborted) return err(cancelledBy("discover_webmcp_tools", options.signal));
			const discovered = await ready.value.discoverWebMcpTools(input, options);
			return discovered.ok ? browserEvidence("discover_webmcp_tools", input, discovered.value, ready.value.identity(), options) : discovered;
		};
		compareWebCaptureEvidence = async (browser, input) => {
			const ready = requireBrowser(browser, "compare_web_captures");
			if (!ready.ok) return ready;
			const compared = await ready.value.compareCaptures(input);
			return compared.ok ? browserEvidence("compare_web_captures", input, compared.value, ready.value.identity(), {}) : compared;
		};
		captureWebScreenshot = async (browser, input, options = {}) => {
			const ready = requireBrowser(browser, "capture_web_screenshot");
			if (!ready.ok) return ready;
			if (options.signal?.aborted) return err(cancelledBy("capture_web_screenshot", options.signal));
			const captured = await ready.value.captureScreenshot(input, options);
			return captured.ok ? browserEvidence("capture_web_screenshot", input, captured.value, ready.value.identity(), options) : captured;
		};
		compareWebScreenshotEvidence = async (browser, input) => {
			const ready = requireBrowser(browser, "compare_web_screenshots");
			if (!ready.ok) return ready;
			const compared = await ready.value.compareScreenshots(input);
			return compared.ok ? browserEvidence("compare_web_screenshots", input, compared.value, ready.value.identity(), {}) : compared;
		};
		requireBrowser = (browser, operation) => browser === undefined ? err(new AnalysisCapabilityUnavailableError("rea-cdp-browser", operation, "browser observation provider is not configured")) : ok(browser);
		browserEvidence = (operation, input, result, provider, options) => {
			const json = jsonValueSchema.safeParse(result);
			if (!json.success) return err(new AnalysisOutputError(operation, "Browser provider returned non-JSON observation data.", { cause: json.error }));
			const report = browserResultSchemas[operation].safeParse(json.data);
			if (!report.success) return err(new AnalysisOutputError(operation, "Browser provider returned a malformed completed observation.", { cause: report.error }));
			return completeProviderEvidence(createBrowserEvidence(operation, input, {
				source: json.data,
				facts: report.data
			}, provider), options.signal);
		};
		NON_JSON_BROWSER_OBSERVATION = "Browser provider retained a non-JSON incomplete observation.";
		retainBrowserObservation = (error, input, provider, errorOperation) => {
			keepIncompleteObservation(error, errorOperation, NON_JSON_BROWSER_OBSERVATION);
			const seen = new Set();
			const promoted = new Map();
			let current = error;
			while (current !== undefined && !seen.has(current)) {
				seen.add(current);
				const partial = current.partialObservation;
				if (partial !== undefined) {
					const evidence = promoted.get(partial) ?? promoteBrowserObservation(partial, input, provider, errorOperation);
					if (evidence !== undefined) {
						promoted.set(partial, evidence);
						current.partialObservation = evidence;
					}
				}
				current = current.cleanupPrimary;
			}
			return err(error);
		};
		promoteBrowserObservation = (partial, input, provider, errorOperation) => {
			if (errorOperation === "analyze_web_bundle" && "kind" in partial && partial.kind === "web-bundle-acquisition") {
				const acquisition = webBundleAcquisitionPartialObservationSchema.safeParse(partial);
				if (acquisition.success) {
					return createBrowserEvidence("analyze_web_bundle", input, {
						source: jsonValueSchema.parse(partial),
						facts: acquisition.data
					}, provider.identity());
				}
			}
			if (errorOperation === "analyze_web_bundle" && !("evidence_id" in partial) && "observations" in partial && "capture" in partial) {
				const bundle = webBundleAnalysisSchema.safeParse(partial);
				if (bundle.success) {
					return createBrowserEvidence("analyze_web_bundle", input, {
						source: jsonValueSchema.parse(partial),
						facts: bundle.data
					}, provider.identity());
				}
			} else if (!("evidence_id" in partial) && "target" in partial && "network" in partial && "capture_window" in partial) {
				const inspection = webPageInspectionSchema.safeParse(partial);
				if (inspection.success) {
					const pageInput = "fetch_source_maps" in input ? (({ fetch_source_maps: _fetchSourceMaps, ...page }) => page)(input) : input;
					return createBrowserEvidence("inspect_web_page", pageInput, {
						source: jsonValueSchema.parse(partial),
						facts: inspection.data
					}, provider.identity());
				}
			}
			return undefined;
		};
	})))();
}

//#endregion
export { analyzeWebBundle, captureWebScreenshot, compareWebCaptureEvidence, compareWebScreenshotEvidence, discoverWebMcpTools, init_BrowserObservationService, inspectWebPage, listBrowserTargets, observeWebSession };