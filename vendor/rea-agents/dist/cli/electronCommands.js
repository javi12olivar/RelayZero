import { projectCliAnalysisResult } from "./projectCliAnalysisResult.js";
import { z } from "zod";
import { ELECTRON_TOOL_CONTRACTS } from "../contracts/javascript/electronToolContracts.js";
import { contractNamed } from "./contractCliDescription.js";
import { admittedContractInput, inspectWithService, registerContractCommand, registerContractDocumentCommand, } from "./contractCommand.js";
import { projectAnalysisError } from "../domain/analysisErrorProjection.js";
import { createElectronFuseService } from "../composition/electronFuses.js";
import { ELECTRON_FUSE_PROVIDER_IDENTITY } from "../electron/ElectronFuseProviderIdentity.js";
import { javaScriptApplicationCliProjection, runJavaScriptApplicationCommand, } from "./javascriptApplicationAnalysis.js";
import { finishAnalysisCommand } from "./finishAnalysisCommand.js";
import { evidenceBundleOption, runEvidenceInputCommand, } from "./evidenceInputCommand.js";
/** Register CLI equivalents of the Electron MCP tools. */
export const registerElectronCommands = (cli, logger, environment, options = {}) => {
    registerElectronObservationCommands(cli, logger, environment);
    registerElectronFuseCommand(cli, logger);
    registerElectronActiveCommand(cli, logger, environment, options);
    registerJavaScriptApplicationCommand(cli, logger, environment);
    registerJavaScriptRuntimeReconciliationCommand(cli, logger);
};
const registerElectronFuseCommand = (cli, logger) => registerContractCommand(cli, logger, contractNamed(ELECTRON_TOOL_CONTRACTS, "inspect_electron_fuses"), {
    description: "Inspect packaged Electron fuse bytes without launching the application",
    positionals: ["path"],
    callerPaths: ["path"],
    fields: {
        path: {
            description: "Local Electron .app, Electron Framework binary, PE executable, or ELF executable",
        },
    },
}, inspectWithService(createElectronFuseService, ELECTRON_FUSE_PROVIDER_IDENTITY.id));
const registerElectronActiveCommand = (cli, logger, environment, options) => {
    registerContractDocumentCommand(cli, logger, contractNamed(ELECTRON_TOOL_CONTRACTS, "capture_electron_scenario"), {
        description: "Run one owned Electron scenario with cancellable actions",
        document: "Inline JSON or a JSON file matching capture_electron_scenario",
        callerPaths: [
            ["executable_path"],
            ["application_path"],
            ["application_root"],
        ],
    }, async (_document, context) => {
        const { signal, operation } = context;
        const parsed = admittedContractInput(context);
        if (!parsed.ok)
            return cliError(parsed.error);
        const { captureElectronScenario } = await import("../application/javascript/ElectronActiveObservationService.js");
        const provider = options.createActiveProvider === undefined
            ? await import("../composition/electronScenario.js").then(({ createElectronScenarioProvider }) => createElectronScenarioProvider(environment))
            : options.createActiveProvider(environment);
        const result = await finishAnalysisCommand(() => captureElectronScenario(provider, parsed.value, { signal }), {
            close: async () => {
                await provider.close?.();
            },
        }, provider.identity().id, operation, signal);
        return result.ok
            ? result.value
            : { error: "Electron analysis failed", ...result.error };
    });
};
const registerJavaScriptRuntimeReconciliationCommand = (cli, logger) => registerContractDocumentCommand(cli, logger, contractNamed(ELECTRON_TOOL_CONTRACTS, "reconcile_javascript_runtime"), {
    description: "Reconcile static application and passive runtime Evidence JSON",
    document: "Inline JSON or a JSON file path matching reconcile_javascript_runtime",
    cliOptions: { evidenceBundle: evidenceBundleOption },
}, async (document, { signal, operation, frame, cliOptions }) => {
    const { reconcileJavaScriptRuntimeEvidence } = await import("../application/javascript/JavaScriptRuntimeReconciliationService.js");
    const result = await runEvidenceInputCommand(document, { operation, signal, frame, cliOptions }, async (lookup) => {
        const reconciled = reconcileJavaScriptRuntimeEvidence(document, lookup, { signal });
        return reconciled.ok
            ? { ok: true, value: reconciled.value.evidence }
            : reconciled;
    });
    return result.ok
        ? result.value
        : { error: "Application workflow failed", ...result.error };
});
const registerElectronObservationCommands = (cli, logger, environment) => {
    registerElectronTargetList(cli, logger, environment);
    registerElectronPageInspection(cli, logger, environment);
};
const registerElectronTargetList = (cli, logger, environment) => {
    const contract = contractNamed(ELECTRON_TOOL_CONTRACTS, "list_electron_targets");
    registerContractCommand(cli, logger, contract, {
        description: "List local file pages exposed by the selected Electron CDP endpoint",
        positionals: ["cdp_endpoint"],
        fields: { cdp_endpoint: electronEndpoint },
    }, observeElectron(environment, contract, async (provider, input, signal) => {
        const { listElectronTargets } = await import("../application/javascript/ElectronObservationService.js");
        return listElectronTargets(provider, input, { signal });
    }));
};
const registerElectronPageInspection = (cli, logger, environment) => {
    const contract = contractNamed(ELECTRON_TOOL_CONTRACTS, "inspect_electron_page");
    registerContractCommand(cli, logger, contract, {
        description: "Passively inspect one Electron file page",
        positionals: ["cdp_endpoint", "target_id"],
        fields: {
            cdp_endpoint: electronEndpoint,
            target_id: { description: "Target ID from list-electron-targets" },
            observation_ms: {
                description: "Observation duration in milliseconds",
            },
            include_script_sources: {
                description: "Include JavaScript source text",
            },
        },
    }, observeElectron(environment, contract, async (provider, input, signal) => {
        const { inspectElectronPage } = await import("../application/javascript/ElectronObservationService.js");
        return inspectElectronPage(provider, input, { signal });
    }));
};
const electronEndpoint = {
    name: "endpoint",
    description: "Literal-loopback Electron CDP endpoint",
};
/**
 * Admit the contract input, then observe through a disposable Electron
 * provider whose close the command awaits.
 */
const observeElectron = (environment, contract, run) => async (_input, context) => {
    const admitted = admittedContractInput(context);
    if (!admitted.ok)
        return cliError(admitted.error);
    const input = admitted.value;
    const provider = await createCliElectronObservationProvider(environment);
    return finishAnalysisCommand(() => run(provider, input, context.signal), {
        close: async () => {
            await provider.close?.();
        },
    }, provider.identity().id, contract.name, context.signal).then(projectCliAnalysisResult);
};
const registerJavaScriptApplicationCommand = (cli, logger, environment) => {
    registerContractCommand(cli, logger, contractNamed(ELECTRON_TOOL_CONTRACTS, "analyze_javascript_application"), {
        description: "Statically reconstruct a local JavaScript/Electron application",
        ...javaScriptApplicationCliProjection("ASAR or extracted application path"),
        evidenceDelivery: true,
        viewDelivery: { invalidJson: "view must be valid JSON" },
    }, runJavaScriptApplicationCommand(environment));
};
const createCliElectronObservationProvider = async (environment) => {
    const { createElectronObservationProvider } = await import("../composition/electronObservation.js");
    return createElectronObservationProvider(environment);
};
const cliError = (error, label = "Electron analysis failed") => ({
    error: label,
    ...projectAnalysisError(error),
});
