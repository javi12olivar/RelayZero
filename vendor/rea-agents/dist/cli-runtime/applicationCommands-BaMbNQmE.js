import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { ArtifactResourceScope, init_ArtifactResourceScope, init_StableArtifactFailure, init_resources, projectArtifactCloseFailure } from "./resources-B3P64jvH.js";
import { contractNamed, deliverWithService, init_analysisEvidenceDelivery, init_contractCliDescription, init_contractCommand, inspectWithService, publishCliAnalysisEvidence, registerContractCommand, registerContractDocumentCommand } from "./contractCommand-Di2ugplH.js";
import { API_CONTRACT_OPERATION, API_CONTRACT_PROVIDER, init_apiContract } from "./graphqlContract-CtyDSGFM.js";
import { PLAYWRIGHT_TRACE_OPERATION, PLAYWRIGHT_TRACE_PROVIDER, init_playwrightTrace } from "./playwrightTrace-CY5VynIY.js";
import { evidenceBundleOption, init_evidenceInputCommand, runEvidenceInputCommand } from "./evidenceInputCommand-CWa4Fz9G.js";
import { API_CONTRACT_TOOL_CONTRACTS, APPLICATION_TOOL_CONTRACTS, NTFS_JOURNAL_OPERATION, NTFS_JOURNAL_PROVIDER, NTFS_JOURNAL_TOOL_CONTRACTS, PLAYWRIGHT_TRACE_TOOL_CONTRACTS, init_apiContractToolContracts, init_applicationToolContracts, init_ntfsJournalQuery, init_ntfsJournalToolContracts, init_playwrightTraceToolContracts } from "./applicationToolContracts-BF58W5cg.js";

//#region dist/cli/playwrightTraceCommand.js
var registerPlaywrightTraceCommand, createPlaywrightTraceService;
function init_playwrightTraceCommand() {
	return (init_playwrightTraceCommand = __esmMin((() => {
		init_resources();
		init_playwrightTraceToolContracts();
		init_playwrightTrace();
		init_contractCliDescription();
		init_contractCommand();
		registerPlaywrightTraceCommand = (cli, logger) => registerContractCommand(cli, logger, contractNamed(PLAYWRIGHT_TRACE_TOOL_CONTRACTS, PLAYWRIGHT_TRACE_OPERATION), {
			description: "Inventory local saved Playwright v10 trace ZIP events offline without launching a browser",
			positionals: ["path"],
			callerPaths: ["path"],
			evidenceDelivery: true,
			viewDelivery: { invalidJson: "view must be valid JSON" },
			fields: {
				path: { description: "Local Playwright trace ZIP path" },
				view: { description: "JSON playwright-trace page; requires --detail summary and --evidence_output" }
			}
		}, deliverWithService(createPlaywrightTraceService, PLAYWRIGHT_TRACE_PROVIDER.id));
		createPlaywrightTraceService = () => {
			const resources = new ArtifactResourceScope();
			return {
				inspect: async (input, { signal }) => {
					const { PlaywrightTraceService } = await import("./application__playwrightTrace__PlaywrightTraceService-Cj-hPX9G.js");
					const { PlaywrightTraceDecoder } = await import("./browser__history__playwrightTrace__PlaywrightTraceDecoder-kMsUu5v-.js");
					return new PlaywrightTraceService(new PlaywrightTraceDecoder(resources)).inspect(input, signal);
				},
				close: () => resources.close().catch((cause) => {
					throw projectArtifactCloseFailure(cause, PLAYWRIGHT_TRACE_PROVIDER.id, PLAYWRIGHT_TRACE_OPERATION);
				})
			};
		};
	})))();
}

//#endregion
//#region dist/cli/apiContractCommand.js
var registerApiContractCommand, createApiContractService;
function init_apiContractCommand() {
	return (init_apiContractCommand = __esmMin((() => {
		init_resources();
		init_apiContractToolContracts();
		init_apiContract();
		init_contractCliDescription();
		init_contractCommand();
		registerApiContractCommand = (cli, logger) => registerContractCommand(cli, logger, contractNamed(API_CONTRACT_TOOL_CONTRACTS, API_CONTRACT_OPERATION), {
			description: "Inspect local OpenAPI JSON or GraphQL SDL declarations and field bindings offline",
			positionals: ["path"],
			callerPaths: ["path", "operations_path"],
			evidenceDelivery: true,
			viewDelivery: { invalidJson: "view must be valid JSON" },
			fields: {
				path: { description: "Local OpenAPI JSON or GraphQL SDL path" },
				format: {
					name: "contractFormat",
					description: "Input API contract syntax: OpenAPI JSON or GraphQL SDL"
				},
				operations_path: { description: "Local operation/fragment document, only with --contractFormat graphql-sdl" },
				view: { description: "JSON api-contract or graphql-contract page; requires --detail summary and --evidence_output" }
			}
		}, deliverWithService(createApiContractService, API_CONTRACT_PROVIDER.id));
		createApiContractService = () => {
			const resources = new ArtifactResourceScope();
			return {
				inspect: async (input, { signal }) => {
					const { inspectApiContractEvidence } = await import("./ApiContractService-DHBvW_oi.js").then((n) => (n.init_ApiContractService(), n.ApiContractService_exports));
					return inspectApiContractEvidence(input, resources, { signal });
				},
				close: () => resources.close().catch((cause) => {
					throw projectArtifactCloseFailure(cause, API_CONTRACT_PROVIDER.id, API_CONTRACT_OPERATION);
				})
			};
		};
	})))();
}

//#endregion
//#region dist/cli/ntfsJournalCommand.js
var registerNtfsJournalCommand, createNtfsJournalService;
function init_ntfsJournalCommand() {
	return (init_ntfsJournalCommand = __esmMin((() => {
		init_resources();
		init_ntfsJournalToolContracts();
		init_ntfsJournalQuery();
		init_contractCliDescription();
		init_contractCommand();
		registerNtfsJournalCommand = (cli, logger) => registerContractCommand(cli, logger, contractNamed(NTFS_JOURNAL_TOOL_CONTRACTS, NTFS_JOURNAL_OPERATION), {
			description: "Inspect paired offline NTFS MFT and USN journal acquisitions",
			positionals: ["mft_path", "journal_path"],
			callerPaths: ["mft_path", "journal_path"],
			fields: {
				mft_path: { description: "Acquired NTFS Master File Table stream" },
				journal_path: { description: "Acquired NTFS change journal data stream" }
			}
		}, inspectWithService(createNtfsJournalService, NTFS_JOURNAL_PROVIDER.id, "journal_path"));
		createNtfsJournalService = () => {
			const resources = new ArtifactResourceScope();
			return {
				inspect: async (input, { signal }) => {
					const { inspectNtfsJournalEvidence } = await import("./application__ntfs__NtfsJournalService-CiQiKKwn.js");
					return inspectNtfsJournalEvidence(input, resources, signal);
				},
				close: () => resources.close().catch((cause) => {
					throw projectArtifactCloseFailure(cause, NTFS_JOURNAL_PROVIDER.id, NTFS_JOURNAL_OPERATION);
				})
			};
		};
	})))();
}

//#endregion
//#region dist/cli/sourceToBundleCommand.js
var spelledReferencePath, registerSourceToBundleCommand;
function init_sourceToBundleCommand() {
	return (init_sourceToBundleCommand = __esmMin((() => {
		init_applicationToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_evidenceInputCommand();
		spelledReferencePath = (document) => {
			if (typeof document !== "object" || document === null) return undefined;
			const reference = document.reference;
			if (typeof reference !== "object" || reference === null) return undefined;
			const path = reference.path;
			return typeof path === "string" ? path : undefined;
		};
		registerSourceToBundleCommand = (cli, logger) => registerContractDocumentCommand(cli, logger, contractNamed(APPLICATION_TOOL_CONTRACTS, "compare_source_to_bundle"), {
			description: "Compare historical source (inline graph or reference {kind:file,path}) with authenticated application Evidence. Save the complete JSON to query with inspect-analysis-view.",
			document: "Inline workflow JSON or JSON file path",
			callerPaths: [["reference", "path"]],
			omit: { view: "A one-shot command retains no session Evidence for a selected view; save the complete comparison and query it with inspect-analysis-view" },
			cliOptions: { evidenceBundle: evidenceBundleOption }
		}, async (document, { signal, operation, spelled, frame, cliOptions }) => {
			const requestedReferencePath = spelledReferencePath(spelled);
			const result = await runEvidenceInputCommand(document, {
				operation,
				signal,
				frame,
				cliOptions
			}, async (lookup, resources) => {
				const { executeSourceToBundleComparison } = await import("./application__javascript__JavaScriptApplicationWorkflowService-IayTkPaW.js");
				const compared = await executeSourceToBundleComparison(document, lookup, resources, {
					signal,
					...requestedReferencePath === undefined ? {} : { requestedReferencePath }
				});
				return compared.ok ? {
					ok: true,
					value: compared.value.evidence
				} : compared;
			});
			return result.ok ? result.value : {
				error: "Application workflow failed",
				...result.error
			};
		});
	})))();
}

//#endregion
//#region dist/cli/staticObservedEndpointsCommand.js
var registerStaticObservedEndpointsCommand;
function init_staticObservedEndpointsCommand() {
	return (init_staticObservedEndpointsCommand = __esmMin((() => {
		init_applicationToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_evidenceInputCommand();
		init_analysisEvidenceDelivery();
		registerStaticObservedEndpointsCommand = (cli, logger) => registerContractDocumentCommand(cli, logger, contractNamed(APPLICATION_TOOL_CONTRACTS, "compare_static_and_observed_endpoints"), {
			description: "Compare static JavaScript endpoints and HAR Evidence JSON offline; --detail summary with --evidence_output saves full facts for selected inspect-analysis-view pages",
			document: "Inline JSON or file containing application, capture and optional origin",
			evidenceDelivery: true,
			viewDelivery: { invalidJson: "view must be valid JSON" },
			cliOptions: { evidenceBundle: evidenceBundleOption }
		}, async (document, { signal, operation, delivery, cliOptions, frame }) => {
			if (delivery === undefined) throw new Error(`${operation} declares evidenceDelivery`);
			let sources = [];
			const result = await runEvidenceInputCommand(document, {
				operation,
				signal,
				frame,
				cliOptions
			}, async (lookup) => {
				const { compareStaticAndObservedEndpointsEvidence } = await import("./application__javascript__StaticObservedEndpointComparisonService-CavrxgdA.js");
				const compared = await compareStaticAndObservedEndpointsEvidence(document, lookup, { signal });
				if (!compared.ok) return compared;
				sources = compared.value.sources;
				return {
					ok: true,
					value: compared.value.evidence
				};
			});
			return publishCliAnalysisEvidence(result, {
				operation,
				signal,
				detail: delivery.detail,
				evidenceOutput: delivery.evidenceOutput,
				...delivery.view === undefined ? {} : { view: delivery.view },
				sourceEvidence: sources
			});
		});
	})))();
}

//#endregion
//#region dist/cli/applicationCommands.js
var applicationCommands_exports = /* @__PURE__ */ __exportAll({ registerApplicationCommands: () => registerApplicationCommands });
var workflowJsonDescription, registerApplicationCommands, registerReconstructionDocumentCommand, registerObligationLedgerCommand, registerCoverageCommand, registerEvidenceJsonCommand;
function init_applicationCommands() {
	return (init_applicationCommands = __esmMin((() => {
		init_playwrightTraceCommand();
		init_apiContractCommand();
		init_ntfsJournalCommand();
		init_cliCommandNames();
		init_analysisErrorProjection();
		init_sourceToBundleCommand();
		init_staticObservedEndpointsCommand();
		init_applicationToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_evidenceInputCommand();
		workflowJsonDescription = "Inline workflow JSON or JSON file path";
		registerApplicationCommands = (cli, logger) => {
			registerEvidenceJsonCommand({
				cli,
				logger,
				name: cliCommandFor("trace_application_feature"),
				operation: "trace_application_feature",
				omit: { view: "A one-shot command retains no session Evidence for a selected view; save the complete trace and query it with inspect-analysis-view" },
				description: "Trace a typed seed through authenticated application Evidence JSON",
				workflow: async (input, lookup, signal) => {
					const { traceApplicationFeatureEvidence } = await import("./application__javascript__JavaScriptApplicationWorkflowService-IayTkPaW.js");
					const result = traceApplicationFeatureEvidence(input, lookup, { signal });
					return result.ok ? {
						ok: true,
						value: result.value.evidence
					} : result;
				}
			});
			registerEvidenceJsonCommand({
				cli,
				logger,
				name: cliCommandFor("trace_javascript_semantics"),
				operation: "trace_javascript_semantics",
				description: "Trace bounded static semantic relations through authenticated application Evidence",
				workflow: async (input, lookup, signal) => {
					const { traceJavaScriptSemanticsEvidence } = await import("./application__javascript__JavaScriptSemanticTraceService-BubNv9r-.js");
					const result = traceJavaScriptSemanticsEvidence(input, lookup, { signal });
					return result.ok ? {
						ok: true,
						value: result.value.evidence
					} : result;
				}
			});
			registerEvidenceJsonCommand({
				cli,
				logger,
				name: cliCommandFor("compare_application_versions"),
				operation: "compare_application_versions",
				description: "Compare two authenticated JavaScript Application Graph versions",
				workflow: async (input, lookup, signal) => {
					const { compareApplicationVersionsEvidence } = await import("./application__javascript__JavaScriptApplicationWorkflowService-IayTkPaW.js");
					const result = compareApplicationVersionsEvidence(input, lookup, { signal });
					return result.ok ? {
						ok: true,
						value: result.value.evidence
					} : result;
				}
			});
			registerSourceToBundleCommand(cli, logger);
			registerStaticObservedEndpointsCommand(cli, logger);
			registerApiContractCommand(cli, logger);
			registerNtfsJournalCommand(cli, logger);
			registerPlaywrightTraceCommand(cli, logger);
			registerEvidenceJsonCommand({
				cli,
				logger,
				name: cliCommandFor("compare_javascript_export_shapes"),
				operation: "compare_javascript_export_shapes",
				description: "Compare exact static JavaScript export return shapes without execution",
				workflow: async (input, lookup, signal) => {
					const { compareJavaScriptExportShapesEvidence } = await import("./application__javascript__JavaScriptApplicationWorkflowService-IayTkPaW.js");
					const result = compareJavaScriptExportShapesEvidence(input, lookup, { signal });
					return result.ok ? {
						ok: true,
						value: result.value.evidence
					} : result;
				}
			});
			registerObligationLedgerCommand(cli, logger);
			registerCoverageCommand(cli, logger);
			registerEvidenceJsonCommand({
				cli,
				logger,
				name: cliCommandFor("project_android_application_graph"),
				operation: "project_android_application_graph",
				description: "Project authenticated APK inventory Evidence into an Android application graph",
				workflow: async (input, lookup, signal) => {
					const { projectAndroidApplicationEvidence } = await import("./application__android__AndroidApplicationService-DI1767_8.js");
					const result = projectAndroidApplicationEvidence(input, lookup, { signal });
					return result.ok ? {
						ok: true,
						value: result.value.evidence
					} : result;
				}
			});
			registerEvidenceJsonCommand({
				cli,
				logger,
				name: cliCommandFor("project_apple_application_graph"),
				operation: "project_apple_application_graph",
				description: "Project authenticated IPA or macOS app inventory Evidence into an Apple application graph",
				workflow: async (input, lookup, signal) => {
					const { projectAppleApplicationEvidence } = await import("./application__apple__AppleApplicationService-BlNzFf81.js");
					const result = projectAppleApplicationEvidence(input, lookup, { signal });
					return result.ok ? {
						ok: true,
						value: result.value.evidence
					} : result;
				}
			});
			registerEvidenceJsonCommand({
				cli,
				logger,
				name: cliCommandFor("project_harmony_application_graph"),
				operation: "project_harmony_application_graph",
				description: "Project authenticated HarmonyOS HAP, HSP, or App Pack inventory Evidence into an application graph",
				workflow: async (input, lookup, signal) => {
					const { projectHarmonyApplicationEvidence } = await import("./application__harmony__HarmonyApplicationService-B12_nKRz.js");
					const result = projectHarmonyApplicationEvidence(input, lookup, { signal });
					return result.ok ? {
						ok: true,
						value: result.value.evidence
					} : result;
				}
			});
		};
		registerReconstructionDocumentCommand = (cli, logger, operation, command, description, workflow) => registerContractDocumentCommand(cli, logger, contractNamed(APPLICATION_TOOL_CONTRACTS, operation), {
			command,
			description,
			document: workflowJsonDescription
		}, async (input) => {
			const result = await workflow(input);
			return result.ok ? result.value : {
				error: "Application workflow failed",
				...projectAnalysisError(result.error, "invocation")
			};
		});
		registerObligationLedgerCommand = (cli, logger) => registerReconstructionDocumentCommand(cli, logger, "build_reconstruction_obligation_ledger", cliCommandFor("build_reconstruction_obligation_ledger"), "Generate a deterministic Evidence-backed reconstruction obligation ledger page", async (input) => {
			const { buildReconstructionObligationLedgerEvidence } = await import("./application__ReconstructionObligationLedgerService-BE7hJkXO.js");
			return buildReconstructionObligationLedgerEvidence(input);
		});
		registerCoverageCommand = (cli, logger) => registerReconstructionDocumentCommand(cli, logger, "evaluate_reconstruction_coverage", cliCommandFor("evaluate_reconstruction_coverage"), "Evaluate inline fail-closed reconstruction coverage", async (input) => {
			const { evaluateReconstructionCoverage } = await import("./application__ReconstructionCoverageService-DCMibNsz.js");
			return evaluateReconstructionCoverage(input);
		});
		registerEvidenceJsonCommand = ({ cli, logger, name, operation, description, omit, workflow }) => registerContractDocumentCommand(cli, logger, contractNamed(APPLICATION_TOOL_CONTRACTS, operation), {
			command: name,
			description,
			document: workflowJsonDescription,
			...omit === undefined ? {} : { omit },
			cliOptions: { evidenceBundle: evidenceBundleOption }
		}, async (input, { signal, frame, cliOptions }) => {
			const result = await runEvidenceInputCommand(input, {
				operation,
				signal,
				frame,
				cliOptions
			}, (lookup) => workflow(input, lookup, signal));
			return result.ok ? result.value : {
				error: "Application workflow failed",
				...result.error
			};
		});
	})))();
}

//#endregion
export { applicationCommands_exports, init_applicationCommands };