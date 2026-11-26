import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { admittedContractInput, contractNamed, init_contractCliDescription, init_contractCommand, inspectWithService, registerContractCommand, registerContractDocumentCommand } from "./contractCommand-Di2ugplH.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { init_javascriptApplicationAnalysis, javaScriptApplicationCliProjection, runJavaScriptApplicationCommand } from "./javascriptApplicationAnalysis-CTeOsq5n.js";
import { ELECTRON_TOOL_CONTRACTS, init_electronToolContracts } from "./electronToolContracts-BJB7T-ib.js";
import { evidenceBundleOption, init_evidenceInputCommand, runEvidenceInputCommand } from "./evidenceInputCommand-CWa4Fz9G.js";
import { ELECTRON_FUSE_PROVIDER_IDENTITY, createElectronFuseService, init_ElectronFuseProviderIdentity, init_electronFuses } from "./electronFuses-BhZum8n1.js";
import { z } from "zod";

//#region dist/cli/electronCommands.js
var electronCommands_exports = /* @__PURE__ */ __exportAll({ registerElectronCommands: () => registerElectronCommands });
var registerElectronCommands, registerElectronFuseCommand, registerElectronActiveCommand, registerJavaScriptRuntimeReconciliationCommand, registerElectronObservationCommands, registerElectronTargetList, registerElectronPageInspection, electronEndpoint, observeElectron, registerJavaScriptApplicationCommand, createCliElectronObservationProvider, cliError;
function init_electronCommands() {
	return (init_electronCommands = __esmMin((() => {
		init_projectCliAnalysisResult();
		init_electronToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_analysisErrorProjection();
		init_electronFuses();
		init_ElectronFuseProviderIdentity();
		init_javascriptApplicationAnalysis();
		init_finishAnalysisCommand();
		init_evidenceInputCommand();
		registerElectronCommands = (cli, logger, environment, options = {}) => {
			registerElectronObservationCommands(cli, logger, environment);
			registerElectronFuseCommand(cli, logger);
			registerElectronActiveCommand(cli, logger, environment, options);
			registerJavaScriptApplicationCommand(cli, logger, environment);
			registerJavaScriptRuntimeReconciliationCommand(cli, logger);
		};
		registerElectronFuseCommand = (cli, logger) => registerContractCommand(cli, logger, contractNamed(ELECTRON_TOOL_CONTRACTS, "inspect_electron_fuses"), {
			description: "Inspect packaged Electron fuse bytes without launching the application",
			positionals: ["path"],
			callerPaths: ["path"],
			fields: { path: { description: "Local Electron .app, Electron Framework binary, PE executable, or ELF executable" } }
		}, inspectWithService(createElectronFuseService, ELECTRON_FUSE_PROVIDER_IDENTITY.id));
		registerElectronActiveCommand = (cli, logger, environment, options) => {
			registerContractDocumentCommand(cli, logger, contractNamed(ELECTRON_TOOL_CONTRACTS, "capture_electron_scenario"), {
				description: "Run one owned Electron scenario with cancellable actions",
				document: "Inline JSON or a JSON file matching capture_electron_scenario",
				callerPaths: [
					["executable_path"],
					["application_path"],
					["application_root"]
				]
			}, async (_document, context) => {
				const { signal, operation } = context;
				const parsed = admittedContractInput(context);
				if (!parsed.ok) return cliError(parsed.error);
				const { captureElectronScenario } = await import("./application__javascript__ElectronActiveObservationService-Ba6v2mHB.js");
				const provider = options.createActiveProvider === undefined ? await import("./composition__electronScenario-CL1OfZn9.js").then(({ createElectronScenarioProvider }) => createElectronScenarioProvider(environment)) : options.createActiveProvider(environment);
				const result = await finishAnalysisCommand(() => captureElectronScenario(provider, parsed.value, { signal }), { close: async () => {
					await provider.close?.();
				} }, provider.identity().id, operation, signal);
				return result.ok ? result.value : {
					error: "Electron analysis failed",
					...result.error
				};
			});
		};
		registerJavaScriptRuntimeReconciliationCommand = (cli, logger) => registerContractDocumentCommand(cli, logger, contractNamed(ELECTRON_TOOL_CONTRACTS, "reconcile_javascript_runtime"), {
			description: "Reconcile static application and passive runtime Evidence JSON",
			document: "Inline JSON or a JSON file path matching reconcile_javascript_runtime",
			cliOptions: { evidenceBundle: evidenceBundleOption }
		}, async (document, { signal, operation, frame, cliOptions }) => {
			const { reconcileJavaScriptRuntimeEvidence } = await import("./application__javascript__JavaScriptRuntimeReconciliationService-BRBJVfvr.js");
			const result = await runEvidenceInputCommand(document, {
				operation,
				signal,
				frame,
				cliOptions
			}, async (lookup) => {
				const reconciled = reconcileJavaScriptRuntimeEvidence(document, lookup, { signal });
				return reconciled.ok ? {
					ok: true,
					value: reconciled.value.evidence
				} : reconciled;
			});
			return result.ok ? result.value : {
				error: "Application workflow failed",
				...result.error
			};
		});
		registerElectronObservationCommands = (cli, logger, environment) => {
			registerElectronTargetList(cli, logger, environment);
			registerElectronPageInspection(cli, logger, environment);
		};
		registerElectronTargetList = (cli, logger, environment) => {
			const contract = contractNamed(ELECTRON_TOOL_CONTRACTS, "list_electron_targets");
			registerContractCommand(cli, logger, contract, {
				description: "List local file pages exposed by the selected Electron CDP endpoint",
				positionals: ["cdp_endpoint"],
				fields: { cdp_endpoint: electronEndpoint }
			}, observeElectron(environment, contract, async (provider, input, signal) => {
				const { listElectronTargets } = await import("./application__javascript__ElectronObservationService-DUtA78ox.js");
				return listElectronTargets(provider, input, { signal });
			}));
		};
		registerElectronPageInspection = (cli, logger, environment) => {
			const contract = contractNamed(ELECTRON_TOOL_CONTRACTS, "inspect_electron_page");
			registerContractCommand(cli, logger, contract, {
				description: "Passively inspect one Electron file page",
				positionals: ["cdp_endpoint", "target_id"],
				fields: {
					cdp_endpoint: electronEndpoint,
					target_id: { description: "Target ID from list-electron-targets" },
					observation_ms: { description: "Observation duration in milliseconds" },
					include_script_sources: { description: "Include JavaScript source text" }
				}
			}, observeElectron(environment, contract, async (provider, input, signal) => {
				const { inspectElectronPage } = await import("./application__javascript__ElectronObservationService-DUtA78ox.js");
				return inspectElectronPage(provider, input, { signal });
			}));
		};
		electronEndpoint = {
			name: "endpoint",
			description: "Literal-loopback Electron CDP endpoint"
		};
		observeElectron = (environment, contract, run) => async (_input, context) => {
			const admitted = admittedContractInput(context);
			if (!admitted.ok) return cliError(admitted.error);
			const input = admitted.value;
			const provider = await createCliElectronObservationProvider(environment);
			return finishAnalysisCommand(() => run(provider, input, context.signal), { close: async () => {
				await provider.close?.();
			} }, provider.identity().id, contract.name, context.signal).then(projectCliAnalysisResult);
		};
		registerJavaScriptApplicationCommand = (cli, logger, environment) => {
			registerContractCommand(cli, logger, contractNamed(ELECTRON_TOOL_CONTRACTS, "analyze_javascript_application"), {
				description: "Statically reconstruct a local JavaScript/Electron application",
				...javaScriptApplicationCliProjection("ASAR or extracted application path"),
				evidenceDelivery: true,
				viewDelivery: { invalidJson: "view must be valid JSON" }
			}, runJavaScriptApplicationCommand(environment));
		};
		createCliElectronObservationProvider = async (environment) => {
			const { createElectronObservationProvider } = await import("./composition__electronObservation-KhkltTeZ.js");
			return createElectronObservationProvider(environment);
		};
		cliError = (error, label = "Electron analysis failed") => ({
			error: label,
			...projectAnalysisError(error)
		});
	})))();
}

//#endregion
export { electronCommands_exports, init_electronCommands };