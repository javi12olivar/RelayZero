import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { init_ClientRegistrationIdentity, invokingPackageRunner } from "./ClientRegistrationIdentity-DNGzp3ks.js";
import { DESKTOP_BUILD_PROVIDER_ID, DOCTOR_PROVIDER_IDS, init_doctorProviderIds } from "./analysisErrorProjection-bycI20-L.js";
import { CLI_COMMANDS, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliLogging, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { SUPPORTED_CLIENT_DEFINITIONS, init_SupportedClients } from "./SupportedClients-C1oeYZNH.js";
import { init_mcpToolCatalogProfile, init_mcpToolFamilies, mcpToolCatalogProfileSchema, mcpToolFamiliesSchema, toolFamiliesConstraint } from "./mcpToolFamilies-Cjva4yr_.js";
import { homeDirectoryFromEnvironment, init_homeDirectory } from "./homeDirectory-DC_DeJIg.js";
import { z } from "zod";
import { cancel, confirm, intro, isCancel, multiselect, outro } from "@clack/prompts";

//#region dist/application/SetupTypes.js
var isSetupFailure;
function init_SetupTypes() {
	return (init_SetupTypes = __esmMin((() => {
		isSetupFailure = (result) => {
			const status = result.status;
			switch (status) {
				case "planned":
				case "cancelled":
				case "ready": return false;
				case "needs_confirmation":
				case "needs_human": return true;
				default: {
					const exhaustive = status;
					throw new TypeError(`Unhandled setup result status: ${String(exhaustive)}`);
				}
			}
		};
	})))();
}

//#endregion
//#region dist/application/UninstallFailure.js
var isUninstallFailure;
function init_UninstallFailure() {
	return (init_UninstallFailure = __esmMin((() => {
		isUninstallFailure = (result) => {
			const status = result.status;
			switch (status) {
				case "complete": return false;
				case "failed": return true;
				default: {
					const exhaustive = status;
					throw new TypeError(`Unhandled uninstall result status: ${String(exhaustive)}`);
				}
			}
		};
	})))();
}

//#endregion
//#region dist/application/UpdateFailure.js
var isUpdateFailure;
function init_UpdateFailure() {
	return (init_UpdateFailure = __esmMin((() => {
		isUpdateFailure = (result) => {
			if (result.cleanupFailure !== undefined) return true;
			const status = result.status;
			switch (status) {
				case "current":
				case "updated": return false;
				case "failed": return true;
				default: {
					const exhaustive = status;
					throw new TypeError(`Unhandled update result status: ${String(exhaustive)}`);
				}
			}
		};
	})))();
}

//#endregion
//#region dist/cli/interactiveSetup.js
var clientDisplayNames, promptStreams, confirmInteractiveSetup, renderSetupProgress, renderSetupDryRun, renderInteractiveSetupResult, selectSetupActions, clientHint, selectClients, selectClientsAccessibly, renderDetectedSummary, renderKeyboardHelp, cliInvocation, renderReadyCapabilities, readyAgentClients, readyProviders, PROVIDER_DISPLAY_NAMES, displayProviderId, humanList, renderPreflight, cancelledDecision, writeLine;
function init_interactiveSetup() {
	return (init_interactiveSetup = __esmMin((() => {
		init_HostPlatform();
		init_SupportedClients();
		init_ClientRegistrationIdentity();
		clientDisplayNames = new Map(SUPPORTED_CLIENT_DEFINITIONS.map(({ name, displayName }) => [name, displayName]));
		promptStreams = {
			input: process.stdin,
			output: process.stderr,
			withGuide: true
		};
		confirmInteractiveSetup = async (actions, accessible, context, signal) => {
			if (context?.stage === "select" || context === undefined) {
				intro("REA setup", promptStreams);
				writeLine("│  Understand local apps and binaries from your terminal or agent.");
				renderDetectedSummary(context?.clientStates ?? []);
				renderKeyboardHelp(accessible);
			}
			if (context?.stage === "select") {
				const selected = await selectSetupActions(actions, accessible, context, signal);
				return selected === undefined ? cancelledDecision() : {
					approved: false,
					selectedActionIds: selected
				};
			}
			if (actions.length === 0) return {
				approved: true,
				selectedActionIds: []
			};
			renderPreflight(actions);
			if (context?.remediation !== undefined) {
				writeLine("│");
				writeLine(`│  ${context.remediation}`);
			}
			const approved = await confirm({
				...promptStreams,
				...signal === undefined ? {} : { signal },
				message: actions.length === 1 ? "Apply this change?" : `Apply these ${String(actions.length)} changes?`,
				initialValue: true,
				active: "Yes, apply",
				inactive: "No, cancel",
				vertical: accessible
			});
			if (isCancel(approved) || !approved) return cancelledDecision();
			return {
				approved: true,
				selectedActionIds: actions.map(({ id }) => id)
			};
		};
		renderSetupProgress = (event) => {
			const symbol = event.state === "started" ? "◇" : event.state === "completed" ? "◆" : event.state === "warning" ? "!" : "✗";
			const suffix = event.detail === undefined ? "" : ` · ${event.detail}`;
			writeLine(`${symbol}  ${event.label}${suffix}`);
		};
		renderSetupDryRun = (actions, remediation) => {
			intro("REA setup plan", promptStreams);
			renderPreflight(actions);
			if (remediation !== undefined) {
				writeLine("│");
				writeLine(`│  ${remediation}`);
			}
			outro("Dry run complete. No changes were made.", promptStreams);
		};
		renderInteractiveSetupResult = (result, environment = process.env) => {
			if (result.status === "ready") {
				const changedClients = Object.entries(result.clients).filter(([, client]) => client.status === "configured").map(([client]) => clientDisplayNames.get(client) ?? client);
				const readyClients = readyAgentClients(result, changedClients);
				renderReadyCapabilities(result, readyClients, environment);
				outro(changedClients.length === 0 ? "REA is ready for local app analysis." : `Restart ${changedClients.join(", ")} to load REA.`, promptStreams);
				return;
			}
			if (result.status === "planned" || result.status === "cancelled") return;
			writeLine(`!  ${result.remediation ?? "Setup needs attention."}`);
			for (const resource of result.cleanup?.resources ?? []) writeLine(`   Pending cleanup: ${resource}`);
			outro(`Run \`${cliInvocation(environment)} doctor\` for the remaining checks.`, promptStreams);
		};
		selectSetupActions = async (actions, accessible, context, signal) => {
			const clientStates = context.clientStates.filter(({ client }) => client.format !== "unsupported");
			const initial = new Set(context.selectedClientIds);
			const selectedClientIds = accessible ? await selectClientsAccessibly(clientStates, initial, signal) : await selectClients(clientStates, initial, signal);
			if (selectedClientIds === undefined) return undefined;
			const selectedActionIds = selectedClientIds.map((id) => `configure_client:${id}`);
			const skill = actions.find(({ kind }) => kind === "install_skill");
			if (skill !== undefined) {
				if (selectedClientIds.length > 0) selectedActionIds.push(skill.id);
				else {
					const included = await confirm({
						...promptStreams,
						...signal === undefined ? {} : { signal },
						message: "Install the guided REA skill for CLI use?",
						initialValue: false,
						vertical: accessible
					});
					if (isCancel(included)) return undefined;
					if (included) selectedActionIds.push(skill.id);
				}
			}
			const hopper = actions.find(({ kind }) => kind === "install_hopper");
			if (hopper !== undefined) {
				const included = await confirm({
					...promptStreams,
					...signal === undefined ? {} : { signal },
					message: "Install Hopper for deep binary analysis?",
					initialValue: false,
					vertical: accessible
				});
				if (isCancel(included)) return undefined;
				if (included) selectedActionIds.push(hopper.id);
			}
			return selectedActionIds;
		};
		clientHint = (state) => state.configured ? "REA already configured · selected from existing configuration" : state.client.configPathError !== undefined ? state.client.configPathError : state.status === "invalid" ? "Existing configuration needs repair before setup" : state.detected ? "Detected · choose to configure" : "Not detected · configuration is still available";
		selectClients = async (states, initial, signal) => {
			if (states.length === 0) return [];
			const selection = await multiselect({
				...promptStreams,
				...signal === undefined ? {} : { signal },
				message: "Which agents should use REA?",
				options: states.map((state) => ({
					value: state.client.name,
					label: clientDisplayNames.get(state.client.name) ?? state.client.name,
					hint: clientHint(state)
				})),
				initialValues: states.filter(({ client }) => initial.has(client.name)).map(({ client }) => client.name),
				required: false,
				maxItems: Math.max(3, Math.min(states.length, (process.stderr.rows ?? 24) - 8)),
				showInstructions: true
			});
			return isCancel(selection) ? undefined : selection;
		};
		selectClientsAccessibly = async (states, initial, signal) => {
			const selected = [];
			for (const state of states) {
				const included = await confirm({
					...promptStreams,
					...signal === undefined ? {} : { signal },
					message: `Configure ${clientDisplayNames.get(state.client.name) ?? state.client.name}? ${clientHint(state)}`,
					initialValue: initial.has(state.client.name),
					vertical: true
				});
				if (isCancel(included)) return undefined;
				if (included) selected.push(state.client.name);
			}
			return selected;
		};
		renderDetectedSummary = (states) => {
			const detected = states.filter(({ detected }) => detected);
			writeLine("│");
			writeLine(detected.length === 0 ? "◆  No agents detected. Choose any supported agent below." : `◆  Detected: ${humanList(detected.map(({ client }) => clientDisplayNames.get(client.name) ?? client.name))}`);
		};
		renderKeyboardHelp = (accessible) => {
			writeLine("│");
			writeLine(accessible ? "│  Keys: Enter answer · Ctrl-C cancel" : "│  Keys: ↑/↓ navigate · Space toggle · Enter confirm · Ctrl-C cancel");
		};
		cliInvocation = (environment) => {
			const runner = invokingPackageRunner(environment, HOST_PLATFORM.platform);
			return runner === undefined ? "rea" : `${runner} rea-agents`;
		};
		renderReadyCapabilities = (result, readyClients, environment) => {
			writeLine("◆  What you can do now");
			const providers = readyProviders(result);
			if (providers.length > 0) writeLine(`│  Deep analysis: ${humanList(providers)}`);
			if (readyClients.length > 0) writeLine(`│  Agent access: ${humanList(readyClients)}`);
			if (result.doctor.identity?.skill.state === "aligned") writeLine("│  Guided reverse-engineering workflows: installed");
			writeLine(`│  CLI: ${cliInvocation(environment)} ${providers.length > 0 ? "analyze /path/to/app" : "capabilities"}`);
			const firstClient = readyClients[0];
			if (firstClient !== undefined) writeLine(`│  Try in ${firstClient}: "Explain how a feature works in /path/to/app and show the evidence."`);
		};
		readyAgentClients = (result, changedClients) => {
			const alignedClients = (result.doctor.identity?.registrations ?? []).filter(({ state }) => state === "aligned").map(({ client }) => clientDisplayNames.get(client) ?? client);
			return [...new Set([...alignedClients, ...changedClients])];
		};
		readyProviders = (result) => result.doctor.availableProviders.map(displayProviderId);
		PROVIDER_DISPLAY_NAMES = {
			ida: "IDA",
			jadx: "JADX"
		};
		displayProviderId = (id) => PROVIDER_DISPLAY_NAMES[id] ?? (id.length === 0 ? id : `${id[0]?.toUpperCase() ?? ""}${id.slice(1)}`);
		humanList = (values) => {
			if (values.length < 2) return values[0] ?? "";
			if (values.length === 2) return `${values[0]} and ${values[1]}`;
			return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`;
		};
		renderPreflight = (actions) => {
			writeLine("│");
			writeLine("◆  Ready to review");
			for (const action of actions) {
				writeLine("│");
				writeLine(`│  ${action.operation.toUpperCase()}  ${action.label}`);
				writeLine(`│          ${action.target}`);
				if (action.backupPath !== undefined) writeLine(`│          backup: ${action.backupPath}`);
				for (const origin of action.networkOrigins ?? []) writeLine(`│          network: ${origin}`);
				if (action.integrity !== undefined) writeLine(`│          integrity: ${action.integrity}`);
				for (const command of action.commands ?? []) writeLine(`│          command: ${command}`);
				writeLine(`│          ${action.detail}`);
				if (action.external) writeLine("│          external software");
			}
			writeLine("│");
			writeLine("│  REA will preserve unrelated configuration and will not install or upgrade Node.js, npm, Homebrew, Java, or Ghidra.");
		};
		cancelledDecision = () => {
			cancel("Setup cancelled. No changes were made.", promptStreams);
			return {
				approved: false,
				selectedActionIds: [],
				cancelled: true
			};
		};
		writeLine = (line) => {
			process.stderr.write(`${line}\n`);
		};
	})))();
}

//#endregion
//#region dist/cli/setupCommands.js
var setupCommands_exports = /* @__PURE__ */ __exportAll({ registerSetupCommands: () => registerSetupCommands });
var supportedClientIds, supportedClientSchema, skillClientSchema, registerSetupCommands, registerSetupCommand, registerDoctorCommand, registerMaintenanceCommands, runSetupCommand, setupRunOptions, desktopBuildSelected, desktopBuildOptions, setupProviders, setupIsInteractive, hasInteractiveTerminal, setupHasExplicitScope, doctorScope;
function init_setupCommands() {
	return (init_setupCommands = __esmMin((() => {
		init_HostPlatform();
		init_commandCancellation();
		init_doctorProviderIds();
		init_SetupTypes();
		init_UninstallFailure();
		init_homeDirectory();
		init_localPath();
		init_mcpToolFamilies();
		init_UpdateFailure();
		init_mcpToolCatalogProfile();
		init_interactiveSetup();
		init_identity();
		init_cliLogging();
		init_cliCommandNames();
		init_commandRegistry();
		init_SupportedClients();
		supportedClientIds = SUPPORTED_CLIENT_DEFINITIONS.map(({ name }) => name);
		supportedClientSchema = z.enum(supportedClientIds);
		skillClientSchema = z.union([z.literal("shared"), supportedClientSchema]);
		registerSetupCommands = (cli, logger, environment) => {
			registerSetupCommand(cli, logger, environment);
			registerDoctorCommand(cli, logger, environment);
			registerMaintenanceCommands(cli, logger, environment);
		};
		registerSetupCommand = (cli, logger, environment) => {
			registerCliCommand(cli, CLI_COMMANDS.setup, {
				description: "Configure agent integrations and optional analysis providers",
				outputPolicy: "agent-only",
				options: z.object({
					yes: z.boolean().default(false).describe("Approve user-owned setup actions without prompting"),
					installHopper: z.boolean().default(false).describe("Also approve Hopper installation with --yes"),
					desktopBuild: z.boolean().default(false).describe("Prepare this host for desktop builds: pack REA's build-computer runtime and record the build settings in the selected registrations"),
					installAgentenv: z.boolean().default(false).describe("With --desktop-build, also install the agentenv-framework release bundles target with uv"),
					client: z.array(supportedClientSchema).default([]).describe("Agent integration to configure; repeat for multiple agents"),
					skillClient: z.array(skillClientSchema).default([]).describe("Existing client skill destination to update; repeatable"),
					toolFamilies: z.string().optional().refine((value) => value === undefined || mcpToolFamiliesSchema.safeParse(value).success, { message: toolFamiliesConstraint }).describe("Comma-separated tool families this registration advertises; omit to preserve the saved selection, or advertise every tool if none is saved. To restore every tool, remove REA_MCP_TOOL_FAMILIES from the client's registration and restart the client."),
					toolCatalogProfile: mcpToolCatalogProfileSchema.optional().describe("MCP catalog: full advertises every in-scope tool; hot-cold loads tools on demand and requires client catalog refresh. Omit to preserve the saved profile, or use full if none is saved. Restart the client after changing it."),
					allDetected: z.boolean().default(false).describe("Configure every detected supported agent"),
					skill: z.boolean().optional().describe("Override the bundled skill included with agent integrations"),
					dryRun: z.boolean().default(false).describe("Print the resolved plan without applying it"),
					accessible: z.boolean().default(false).describe("Use sequential accessible setup prompts")
				}),
				alias: { yes: "y" },
				run: ({ options, formatExplicit }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.setup, () => runSetupCommand({
					options,
					formatExplicit
				}, environment, signal), isSetupFailure))
			});
		};
		registerDoctorCommand = (cli, logger, environment) => {
			registerCliCommand(cli, CLI_COMMANDS.doctor, {
				description: "Check whether REA is ready",
				options: z.object({
					target: localPathStringSchema.optional().describe("Optional app path to check"),
					client: z.array(supportedClientSchema).default([]).describe("Agent registration whose readiness is required; repeatable"),
					provider: z.array(z.enum(DOCTOR_PROVIDER_IDS)).default([]).describe("Deep-analysis provider, or desktop_build for a desktop build host, whose readiness is required"),
					skill: z.boolean().optional().describe("Require the installed REA skill identity to be aligned")
				}),
				run: ({ options }) => withCommandCancellation((signal) => logCliCommand(logger, "doctor", async () => {
					const [{ runDoctorOwned }, { createSystemDoctorHost }] = await Promise.all([import("./Doctor-CrZFfEIG.js").then((n) => (n.init_Doctor(), n.Doctor_exports)), import("./doctorRuntime-DjvJZfly.js")]);
					return runDoctorOwned(options.target, createSystemDoctorHost(environment, signal), doctorScope(options));
				}))
			});
		};
		registerMaintenanceCommands = (cli, logger, environment) => {
			registerCliCommand(cli, CLI_COMMANDS.uninstall, {
				description: "Remove REA-owned agent configuration and skill files",
				options: z.object({ purgeData: z.boolean().default(false).describe("Also remove REA caches and state") }),
				run: ({ options }) => logCliCommand(logger, "uninstall", async () => {
					const { runUninstall, systemUninstallHost } = await import("./application__Uninstall-DpuibQml.js");
					return runUninstall(options.purgeData, systemUninstallHost(homeDirectoryFromEnvironment(environment, HOST_PLATFORM.platform), undefined, environment, HOST_PLATFORM.platform));
				}, isUninstallFailure)
			});
			registerCliCommand(cli, CLI_COMMANDS.update, {
				description: "Update this REA installation and verify the installed release",
				run: ({ formatExplicit }) => logCliCommand(logger, CLI_COMMANDS.update, async () => {
					const [{ runUpdate }, { systemUpdateHost }] = await Promise.all([import("./Update-BDWDzdlr.js").then((n) => (n.init_Update(), n.Update_exports)), import("./application__UpdateRuntime-cCux017j.js")]);
					return runUpdate(PRODUCT_IDENTITY.packageVersion, systemUpdateHost(undefined, undefined, environment, HOST_PLATFORM.platform), formatExplicit ? "structured" : "human");
				}, isUpdateFailure)
			});
		};
		runSetupCommand = async (input, environment, signal) => {
			const { options } = input;
			const interactive = setupIsInteractive(options, input.formatExplicit);
			const hasExplicitScope = setupHasExplicitScope(options);
			const [{ runSetup }, { systemSetupHost }, { createSystemDoctorHost }] = await Promise.all([
				import("./application__Setup-H03L-iab.js"),
				import("./SetupHost-B9sDo5bi.js").then((n) => (n.init_SetupHost(), n.SetupHost_exports)),
				import("./doctorRuntime-DjvJZfly.js")
			]);
			const result = await runSetup({
				...setupRunOptions(input, interactive, hasExplicitScope),
				signal
			}, systemSetupHost(createSystemDoctorHost(environment, signal), environment), interactive ? (actions, context) => confirmInteractiveSetup(actions, options.accessible, context, signal) : undefined);
			if (interactive) renderInteractiveSetupResult(result, environment);
			else if (!input.formatExplicit && process.stdout.isTTY === true) {
				if (result.status === "planned") renderSetupDryRun(result.plannedActions, result.remediation);
				else renderInteractiveSetupResult(result, environment);
			}
			return result;
		};
		setupRunOptions = (input, interactive, hasExplicitScope) => {
			const { options } = input;
			const desktopBuild = desktopBuildSelected(options);
			const agentIntegrationSelected = options.allDetected || options.client.length > 0 || options.skillClient.length > 0 || desktopBuild;
			const hasSelectedClients = hasExplicitScope && (options.client.length > 0 || options.skillClient.length > 0);
			return {
				approved: options.yes && !options.dryRun,
				installHopper: options.installHopper,
				structured: input.formatExplicit || options.dryRun,
				dryRun: options.dryRun,
				allDetectedClients: options.allDetected,
				proposeHopper: interactive || options.installHopper,
				...desktopBuildOptions(options),
				...hasSelectedClients ? { clientIds: options.client } : {},
				...options.skillClient.length > 0 ? { skillClientIds: options.skillClient } : {},
				...hasExplicitScope ? { installSkill: options.skill ?? agentIntegrationSelected } : {},
				...options.toolFamilies === undefined ? {} : { toolFamilies: options.toolFamilies },
				...options.toolCatalogProfile === undefined ? {} : { toolCatalogProfile: options.toolCatalogProfile },
				...interactive ? { onProgress: renderSetupProgress } : {},
				...hasSelectedClients && !options.allDetected ? { readinessScope: {
					clients: options.client,
					...options.skillClient.length > 0 ? { skillClients: options.skillClient } : {},
					providers: setupProviders(options),
					skill: options.skill ?? agentIntegrationSelected
				} } : {}
			};
		};
		desktopBuildSelected = (options) => options.desktopBuild || options.installAgentenv;
		desktopBuildOptions = (options) => desktopBuildSelected(options) ? {
			desktopBuild: true,
			installAgentenv: options.installAgentenv
		} : {};
		setupProviders = (options) => [...options.installHopper ? ["hopper"] : [], ...desktopBuildSelected(options) ? [DESKTOP_BUILD_PROVIDER_ID] : []];
		setupIsInteractive = (options, formatExplicit) => !options.yes && !options.dryRun && !formatExplicit && hasInteractiveTerminal();
		hasInteractiveTerminal = () => process.stdin.isTTY === true && process.stdout.isTTY === true && process.stderr.isTTY === true;
		setupHasExplicitScope = (options) => options.allDetected || options.client.length > 0 || options.skillClient.length > 0 || options.skill !== undefined || options.installHopper || options.desktopBuild || options.installAgentenv;
		doctorScope = (options) => options.client.length === 0 && options.provider.length === 0 && options.skill === undefined ? undefined : {
			clients: options.client,
			providers: options.provider,
			skill: options.skill === true
		};
	})))();
}

//#endregion
export { init_setupCommands, setupCommands_exports };