import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisOutputError, cancelledBy, init_analysisErrorCore, init_jsonValue, jsonObjectSchema, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { CLI_COMMANDS, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { contractNamed, init_analysisEvidenceDelivery, init_contractCliDescription, init_contractCommand, publishCliAnalysisEvidence, registerContractDocumentCommand } from "./contractCommand-Di2ugplH.js";
import { browserScenarioCaptureSchema, init_browserScenarioCapture } from "./browserNetworkMediaType-CbMlNDyh.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { completeProviderEvidence, init_ProviderOperationExecution, keepIncompleteObservation } from "./ProviderOperationExecution-DJuOJe_5.js";
import { BROWSER_SCENARIO_TOOL_CONTRACTS, browserScenarioSchema, init_browserScenario, init_browserScenarioToolContracts } from "./browserScenarioToolContracts-BUcxF_38.js";
import { isDeepStrictEqual } from "node:util";

//#region dist/application/BrowserScenarioEvidence.js
var browserScenarioParameters, createBrowserScenarioEvidence;
function init_BrowserScenarioEvidence() {
	return (init_BrowserScenarioEvidence = __esmMin((() => {
		init_targetIdentity();
		init_canonicalDigest();
		init_evidence();
		init_jsonValue();
		browserScenarioParameters = (scenario) => {
			return {
				...jsonObjectSchema.parse(scenario),
				scenario_sha256: digestCanonicalValue(scenario, "Browser scenario")
			};
		};
		createBrowserScenarioEvidence = (scenario, report, provider) => {
			const capture = report.facts;
			return createEvidence(unknownTarget("not-observed"), provider, {
				predicateType: "rea.browser-scenario-capture",
				operation: "capture_browser_scenario",
				parameters: browserScenarioParameters(scenario),
				result: capture,
				rawResult: isDeepStrictEqual(report.source, capture) ? null : report.source,
				confidence: "observed",
				authority: "controlled-replay",
				environment: {
					id: `${capture.browser.product}@${capture.browser.version}`,
					platform: "unknown",
					architecture: "unknown",
					isolation: capture.browser.process_ownership === "provider-owned" ? "process" : "none"
				},
				limitations: [...capture.limitations, "Browser host platform and architecture were not observed."]
			});
		};
	})))();
}

//#endregion
//#region dist/application/BrowserScenarioCaptureService.js
var OPERATION, PROVIDER_ID$1, captureBrowserScenario;
function init_BrowserScenarioCaptureService() {
	return (init_BrowserScenarioCaptureService = __esmMin((() => {
		init_BrowserScenarioEvidence();
		init_analysisErrorCore();
		init_result();
		init_browserScenarioCapture();
		init_ProviderOperationExecution();
		init_jsonValue();
		OPERATION = "capture_browser_scenario";
		PROVIDER_ID$1 = "rea-playwright-browser-scenario";
		captureBrowserScenario = async (provider, scenario, options = {}) => {
			if (provider === undefined) return err(new AnalysisCapabilityUnavailableError(PROVIDER_ID$1, OPERATION, "browser scenario provider is not configured"));
			if (options.signal?.aborted) return err(cancelledBy(OPERATION, options.signal));
			const captured = await provider.captureScenario(scenario, options);
			if (!captured.ok) {
				keepIncompleteObservation(captured.error, OPERATION, "Browser scenario provider retained a non-JSON incomplete observation.");
				const seen = new Set();
				const promoted = new Map();
				let owner = captured.error;
				while (owner !== undefined && !seen.has(owner)) {
					seen.add(owner);
					const partial = owner.partialObservation;
					if (partial !== undefined && "kind" in partial && partial.kind === "browser-scenario-observation") {
						const report = browserScenarioCaptureSchema.safeParse(partial.capture);
						if (report.success && report.data.steps.every(({ status }) => status === "completed")) {
							const evidence = promoted.get(partial) ?? createBrowserScenarioEvidence(scenario, {
								source: jsonValueSchema.parse(partial.capture),
								facts: report.data
							}, provider.identity());
							promoted.set(partial, evidence);
							owner.partialObservation = evidence;
						}
					}
					owner = owner.cleanupPrimary;
				}
				return captured;
			}
			const json = jsonValueSchema.safeParse(captured.value);
			if (!json.success) return err(new AnalysisOutputError(OPERATION, "Browser scenario provider returned non-JSON capture data.", { cause: json.error }));
			const report = browserScenarioCaptureSchema.safeParse(json.data);
			if (!report.success) return err(new AnalysisOutputError(OPERATION, "Browser scenario provider returned a malformed completed capture.", { cause: report.error }));
			return completeProviderEvidence(createBrowserScenarioEvidence(scenario, {
				source: json.data,
				facts: report.data
			}, provider.identity()), options.signal);
		};
	})))();
}

//#endregion
//#region dist/cliBrowserScenarioCommands.js
var cliBrowserScenarioCommands_exports = /* @__PURE__ */ __exportAll({ registerBrowserScenarioCommands: () => registerBrowserScenarioCommands });
var contract, PROVIDER_ID, document, callerPaths, registerBrowserScenarioCommands, parseBrowserScenario;
function init_cliBrowserScenarioCommands() {
	return (init_cliBrowserScenarioCommands = __esmMin((() => {
		init_BrowserScenarioCaptureService();
		init_analysisEvidenceDelivery();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		init_cliCommandNames();
		init_browserScenarioToolContracts();
		init_analysisErrorProjection();
		init_browserScenario();
		init_inputIssueProjection();
		init_result();
		contract = contractNamed(BROWSER_SCENARIO_TOOL_CONTRACTS, "capture_browser_scenario");
		PROVIDER_ID = "rea-playwright-browser-scenario";
		document = "Inline browser scenario JSON, JSON file path, or '-' for stdin";
		callerPaths = [["browser", "executable_path"]];
		registerBrowserScenarioCommands = (cli, logger, environment, options = {}) => {
			registerContractDocumentCommand(cli, logger, contract, {
				description: "Run one bounded Playwright browser scenario and return Evidence",
				document,
				callerPaths,
				evidenceDelivery: true
			}, async (input, { signal, operation, delivery, spelled }) => {
				if (delivery === undefined) throw new Error(`${operation} declares evidenceDelivery`);
				const scenario = parseBrowserScenario(input, spelled, "Browser scenario capture failed");
				if (!scenario.ok) return scenario.error;
				const provider = options.createProvider === undefined ? await import("./composition__browserScenario-nQp4-IxL.js").then(({ createBrowserScenarioProvider }) => createBrowserScenarioProvider(environment)) : options.createProvider(environment);
				const result = await finishAnalysisCommand(() => captureBrowserScenario(provider, scenario.value, { signal }), { close: async () => {
					await provider?.close?.();
				} }, PROVIDER_ID, operation, signal, undefined, { failureProjection: "initial" });
				if (!result.ok) return {
					error: "Browser scenario capture failed",
					...result.error
				};
				return publishCliAnalysisEvidence(result, {
					operation,
					signal,
					detail: delivery.detail,
					evidenceOutput: delivery.evidenceOutput
				});
			});
			registerContractDocumentCommand(cli, logger, contract, {
				command: CLI_COMMANDS.validateBrowserScenario,
				description: "Validate one browser scenario without launching or attaching to a browser",
				document,
				callerPaths,
				omit: { detail: "validation runs no browser and delivers no Evidence; pass --detail to capture-browser-scenario" }
			}, async (input, { spelled }) => {
				const scenario = parseBrowserScenario(input, spelled, "Browser scenario validation failed");
				if (!scenario.ok) return scenario.error;
				return {
					valid: true,
					actions: scenario.value.actions.length,
					secrets: scenario.value.secrets.length
				};
			});
		};
		parseBrowserScenario = (input, spelled, headline) => {
			const scenario = browserScenarioSchema.safeParse(input);
			return scenario.success ? ok(scenario.data) : err({
				error: headline,
				...projectAnalysisError(analysisInputErrorFromIssues(contract.name, scenario.error.issues, spelled, { cause: scenario.error }))
			});
		};
	})))();
}

//#endregion
export { cliBrowserScenarioCommands_exports, init_cliBrowserScenarioCommands };