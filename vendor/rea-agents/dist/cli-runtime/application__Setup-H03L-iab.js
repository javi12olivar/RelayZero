import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, AnalysisError, cancelledBy, init_analysisErrorBase, init_analysisErrorCore, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { DESKTOP_BUILD_PROVIDER_ID, init_doctorProviderIds } from "./analysisErrorProjection-bycI20-L.js";
import { analysisErrorWithCleanupDependencies, init_analysisErrorCleanup } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_SupportedClients, manualRegistrationRemediation } from "./SupportedClients-C1oeYZNH.js";
import { DESKTOP_EXPORT_FRAMEWORK_VERSION, init_appExport } from "./appExport-CjCA74-5.js";
import { AGENTENV_INSTALL_COMMAND, init_DesktopBuildDoctor } from "./Doctor-CrZFfEIG.js";
import { assertSetupActive, configureDetectedClients, discoverSetupState, filterClientsNeedingConfigure, hopperInstallRefusal, hostRemediation, init_SetupCleanupOwner, init_SetupClients, init_SetupHost, init_SetupPlan, init_setupCancellation, planSetupActions, setupCleanupError, setupCleanupReason, systemSetupHost } from "./SetupHost-B9sDo5bi.js";

//#region dist/application/SetupDesktopBuild.js
var inert, planDesktopBuild, agentenvRemediation, applyActions, installAction, packAction;
function init_SetupDesktopBuild() {
	return (init_SetupDesktopBuild = __esmMin((() => {
		init_appExport();
		init_DesktopBuildDoctor();
		init_doctorProviderIds();
		init_setupCancellation();
		inert = (blocker) => ({
			selected: blocker !== undefined,
			...blocker === undefined ? {} : { blocker },
			actions: [],
			clientEnvironments: {},
			apply: () => Promise.resolve(undefined),
			readinessRemediation: () => undefined
		});
		planDesktopBuild = async (host, options, clientIds) => {
			if (options.desktopBuild !== true) return inert();
			if (host === undefined) return inert("This setup host cannot set up desktop builds.");
			const facts = await host.facts(clientIds);
			const pinned = facts.agentEnvVersion === DESKTOP_EXPORT_FRAMEWORK_VERSION;
			const install = options.installAgentenv === true && !pinned;
			const uv = install ? facts.uv : undefined;
			const actions = [];
			if (uv !== undefined) actions.push(installAction(uv.agentEnv));
			if (!facts.archivePacked && !facts.selected.includes("REA_BUILD_COMPUTER_REA_ARCHIVE")) {
				if (facts.packBlocker !== undefined) return inert(facts.packBlocker);
				actions.push(packAction(facts.archive));
			}
			const settings = {
				...facts.settings,
				...uv !== undefined && !facts.selected.includes("REA_AGENT_ENV_COMMAND") ? { REA_AGENT_ENV_COMMAND: uv.agentEnv } : {}
			};
			const remediation = agentenvRemediation(pinned, install, uv);
			const failed = new Set();
			return {
				selected: true,
				actions,
				get clientEnvironments() {
					return Object.fromEntries(clientIds.map((client) => [client, Object.fromEntries(Object.entries(settings).filter(([name]) => !failed.has(name) && (facts.selected.includes(name) || !(facts.recorded[client] ?? []).includes(name))))]));
				},
				...remediation === undefined ? {} : { remediation },
				apply: (appliedActions, onProgress, signal) => applyActions(host, actions, uv?.path, {
					appliedActions,
					onProgress,
					signal,
					failed: (kind) => {
						if (kind === "pack_build_runtime") failed.add("REA_BUILD_COMPUTER_REA_ARCHIVE");
						else if (!facts.selected.includes("REA_AGENT_ENV_COMMAND")) failed.add("REA_AGENT_ENV_COMMAND");
					}
				}),
				readinessRemediation: (healthy) => healthy ? undefined : `Run rea doctor --provider ${DESKTOP_BUILD_PROVIDER_ID} and apply each reported fix.`
			};
		};
		agentenvRemediation = (pinned, install, uv) => pinned || uv !== undefined ? undefined : install ? `uv is not on PATH. Install agentenv with ${AGENTENV_INSTALL_COMMAND}, then rerun setup.` : `Desktop builds need agentenv-framework ${DESKTOP_EXPORT_FRAMEWORK_VERSION}: ${AGENTENV_INSTALL_COMMAND}, or rerun setup with --install-agentenv.`;
		applyActions = async (host, actions, uv, progress) => {
			const failures = [];
			for (const { id, kind, label, target } of actions) {
				assertSetupActive(progress.signal);
				progress.onProgress?.({
					actionId: id,
					label,
					state: "started"
				});
				const failure = kind === "install_agentenv" ? await host.installAgentenv(uv ?? "uv", progress.signal) : await host.packRuntime(target, progress.signal);
				progress.onProgress?.({
					actionId: id,
					label,
					state: failure === undefined ? "completed" : "failed",
					...failure === undefined ? {} : { detail: failure }
				});
				if (failure === undefined) progress.appliedActions.push(id);
				assertSetupActive(progress.signal, failure);
				if (failure === undefined) continue;
				progress.failed(kind);
				failures.push(kind === "install_agentenv" ? `Installing agentenv failed: ${failure} Run ${AGENTENV_INSTALL_COMMAND} yourself, then rerun setup.` : `Packing REA's build-computer runtime failed: ${failure} Fix the reported problem, then rerun setup with --desktop-build.`);
			}
			return failures.length === 0 ? undefined : failures.join(" ");
		};
		installAction = (agentEnv) => ({
			id: "install_agentenv",
			kind: "install_agentenv",
			label: `agentenv-framework ${DESKTOP_EXPORT_FRAMEWORK_VERSION}`,
			target: agentEnv,
			detail: "Install the agentenv-framework release that desktop bundles target as a uv tool; REA runs its agent-env program for build computers.",
			external: true,
			operation: "install",
			networkOrigins: ["https://pypi.org", "https://files.pythonhosted.org"],
			commands: [AGENTENV_INSTALL_COMMAND]
		});
		packAction = (archive) => ({
			id: "pack_build_runtime",
			kind: "pack_build_runtime",
			label: "REA build-computer runtime",
			target: archive,
			detail: "Pack this REA checkout as the runtime a build computer installs: npm pack, its production dependencies from npm ci --omit=dev --omit=optional, then a .tar.xz named by this REA version, packed again when the version changes.",
			external: true,
			operation: "create",
			networkOrigins: ["https://registry.npmjs.org"],
			commands: [`npm run pack:build-computer-runtime -- ${archive}`]
		});
	})))();
}

//#endregion
//#region dist/application/Setup.js
var setupProgressFacts, runSetup, runSetupWorkflow, hopperDownload, installHopperAction, installSkillAction, setupFailure, emitProgress, manualClientsRemediation, combineRemediation, finalSetupRemediation, isSetupDecisionCancelled, setupCancelled, resolvedReadinessScope, summarizeDoctor;
function init_Setup() {
	return (init_Setup = __esmMin((() => {
		init_SupportedClients();
		init_SetupClients();
		init_SetupPlan();
		init_SetupHost();
		init_analysisErrorBase();
		init_SetupCleanupOwner();
		init_analysisErrorCleanup();
		init_analysisErrorCore();
		init_jsonValue();
		init_setupCancellation();
		init_SetupDesktopBuild();
		init_doctorProviderIds();
		setupProgressFacts = (progress) => {
			const skill = progress.skill;
			return jsonValueSchema.parse({
				plannedActions: progress.plannedActions,
				appliedActions: progress.appliedActions,
				clients: progress.clients,
				clientStates: progress.clientStates,
				...progress.desktopFailure === undefined ? {} : { desktopFailure: progress.desktopFailure },
				...progress.hopperOutcome === undefined ? {} : { hopperOutcome: progress.hopperOutcome },
				...skill === undefined ? {} : { skill: skill.ok ? { status: skill.value } : {
					status: "failed",
					path: skill.error.path,
					stage: skill.error.stage,
					reason: skill.error.reason,
					rollbackFailures: skill.error.rollbackFailures,
					recoveryBackupPaths: skill.error.recoveryBackupPaths,
					remediation: skill.error.remediation
				} }
			});
		};
		runSetup = async (options, host = systemSetupHost(), confirm) => {
			const progress = {
				plannedActions: [],
				appliedActions: [],
				clients: {},
				clientStates: []
			};
			let result;
			const pending = {};
			let primaryFailure;
			let threw = false;
			try {
				result = await runSetupWorkflow(options, host, progress, confirm, pending);
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError) cause.retainDiagnostics({ setup_progress: setupProgressFacts(progress) });
				threw = true;
				primaryFailure = cause;
			}
			let cleanup;
			try {
				const report = await host.close?.();
				cleanup = report === undefined ? undefined : setupCleanupError(report);
			} catch (cause) {
				cleanup = setupCleanupError(cause);
			}
			if (cleanup !== undefined && !cleanup.cleanupIncomplete) cleanup = undefined;
			if (threw) {
				if (cleanup === undefined) throw primaryFailure;
				if (primaryFailure instanceof AnalysisError) throw analysisErrorWithCleanupDependencies(primaryFailure, cleanup, "setup");
				throw new AggregateError([primaryFailure, cleanup], "Setup and resource cleanup failed.", { cause: primaryFailure });
			}
			if (result === undefined) throw new Error("Setup returned no result.");
			if (pending.skill !== undefined) {
				const settled = pending.skill.cleanupOwners.length > 0 && pending.skill.cleanupOwners.every(({ lease }) => lease.released);
				if (settled) emitProgress(options, {
					actionId: "install_skill",
					label: "REA reverse-engineering skill",
					state: "completed"
				});
				else result = {
					...result,
					status: "needs_human",
					code: result.code ?? "skill_install_failed",
					remediation: combineRemediation(pending.skill.remediation, result.remediation) ?? pending.skill.remediation
				};
			}
			if (options.signal?.aborted === true) {
				const cancelled = cancelledBy("setup", options.signal, { diagnostics: { setup_result: jsonValueSchema.parse(result) } });
				if (cleanup !== undefined) throw analysisErrorWithCleanupDependencies(cancelled, cleanup, "setup");
				throw cancelled;
			}
			if (cleanup === undefined) return result;
			const cleanupReason = setupCleanupReason(cleanup);
			const cleanupReport = {
				reason: cleanupReason,
				get resources() {
					return cleanup.cleanupResources;
				}
			};
			return {
				...result,
				status: "needs_human",
				code: result.code ?? "cleanup_failed",
				get cleanup() {
					return cleanup.cleanupIncomplete ? cleanupReport : undefined;
				},
				remediation: result.remediation ? `${result.remediation} ${cleanupReason}` : cleanupReason
			};
		};
		runSetupWorkflow = async (options, host, progress, confirm, pending) => {
			assertSetupActive(options.signal);
			const appliedActions = progress.appliedActions;
			let plannedActions = [];
			const clients = progress.clients;
			let clientStates = [];
			let readinessScope = options.readinessScope;
			const fail = (remediation) => setupFailure(remediation, [
				host,
				plannedActions,
				appliedActions,
				clients,
				clientStates
			], readinessScope);
			const failSkill = async (error) => ({
				...await fail(error.remediation),
				code: "skill_install_failed"
			});
			const unsupported = hostRemediation(host);
			if (unsupported !== undefined) return fail(unsupported);
			const initialState = await host.initialSetupState(options.readinessScope);
			let { hopperPath, providerEnvironment } = initialState;
			const discovery = await discoverSetupState({
				host,
				providerConfigured: initialState.providerConfigured,
				forceHopperInstall: options.installHopper,
				hopperLauncherConfigured: initialState.hopperLauncherConfigured === true,
				proposeHopper: options.proposeHopper ?? (confirm !== undefined && !options.structured),
				initialDoctor: initialState.doctor
			});
			if (options.toolFamilies !== undefined) providerEnvironment = {
				...providerEnvironment,
				REA_MCP_TOOL_FAMILIES: options.toolFamilies
			};
			if (options.toolCatalogProfile !== undefined) providerEnvironment = {
				...providerEnvironment,
				REA_MCP_TOOL_CATALOG_PROFILE: options.toolCatalogProfile
			};
			clientStates = discovery.clientStates;
			progress.clientStates = clientStates;
			const clientSelectionAllowed = options.clientIds === undefined && options.readinessScope?.clients === undefined && options.allDetectedClients !== true && options.installHopper !== true && options.skillClientIds === undefined && options.installSkill === undefined;
			const interactiveSelection = confirm !== undefined && !options.structured && clientSelectionAllowed;
			const requestedClientIds = options.clientIds ?? options.readinessScope?.clients;
			let selectedClientIds = [...new Set(options.allDetectedClients ? [...requestedClientIds ?? [], ...discovery.detectedClientIds] : requestedClientIds ?? discovery.defaultClientIds)];
			let selectedSkillClientIds = options.skillClientIds ?? options.readinessScope?.skillClients ?? selectedClientIds;
			let skillNeedsInstall = await host.skillNeedsInstall(selectedSkillClientIds);
			let skillSelected = options.installSkill === true || options.installSkill !== false && (selectedClientIds.length > 0 || selectedSkillClientIds.length > 0);
			let installSkill = skillSelected && skillNeedsInstall;
			let planDiscovery = discovery;
			if (interactiveSelection) {
				const selectionSkillClientIds = [];
				const offerSkillAction = options.installSkill !== false;
				const selectionActions = await planSetupActions({
					discovery,
					host,
					providerEnvironment,
					command: host.registrationCommand,
					clientIds: [],
					skillClientIds: selectionSkillClientIds,
					installSkill: offerSkillAction
				});
				const decision = await confirm(selectionActions.plannedActions, {
					stage: "select",
					clientStates,
					selectedClientIds: discovery.defaultClientIds,
					clientSelectionAllowed
				});
				assertSetupActive(options.signal);
				if (isSetupDecisionCancelled(decision)) return setupCancelled(selectionActions.plannedActions, clients, clientStates, discovery.initialDoctor);
				const selectedActionIds = new Set(typeof decision === "boolean" ? decision ? [...selectionActions.plannedActions.map(({ id }) => id), ...discovery.defaultClientIds.map((id) => `configure_client:${id}`)] : [] : decision.selectedActionIds);
				selectedClientIds = [...selectedActionIds].filter((id) => id.startsWith("configure_client:")).map((id) => id.slice("configure_client:".length));
				skillNeedsInstall = await host.skillNeedsInstall(selectedClientIds);
				const proposedInstallAction = selectionActions.plannedActions.some(({ id }) => id === "install_hopper");
				planDiscovery = {
					...discovery,
					installHopper: options.installHopper || proposedInstallAction && selectedActionIds.has("install_hopper")
				};
				const skillActionSelected = selectionActions.plannedActions.some(({ id, kind }) => kind === "install_skill" && selectedActionIds.has(id));
				skillSelected = options.installSkill === true || skillActionSelected && selectedClientIds.length === 0 || options.installSkill !== false && selectedClientIds.length > 0;
				installSkill = skillSelected && skillNeedsInstall;
				selectedSkillClientIds = selectedClientIds;
			}
			const desktop = await planDesktopBuild(host.desktopBuild, options, selectedClientIds);
			if (desktop.blocker !== undefined) return fail(desktop.blocker);
			const planned = await planSetupActions({
				discovery: planDiscovery,
				host,
				providerEnvironment,
				command: host.registrationCommand,
				clientIds: selectedClientIds,
				skillClientIds: selectedSkillClientIds,
				installSkill,
				clientEnvironments: desktop.clientEnvironments
			});
			plannedActions = [...desktop.actions, ...planned.plannedActions];
			progress.plannedActions = plannedActions;
			if (planned.blocker !== undefined) return fail(planned.blocker);
			const hopperRefusal = hopperInstallRefusal(planDiscovery);
			if (hopperRefusal !== undefined) return fail(hopperRefusal);
			const planSelection = {
				installHopper: planDiscovery.installHopper,
				installSkill,
				skillSelected,
				selectedSkillClientIds,
				selectedClients: planned.selectedClients,
				clientsToConfigure: planned.clientsToConfigure
			};
			readinessScope = resolvedReadinessScope(options.readinessScope, planSelection, desktop.selected);
			const manualRemediation = combineRemediation(manualClientsRemediation(planned.selectedClients), desktop.remediation);
			if (skillSelected) {
				const admission = await host.validateSkillDirectories(selectedSkillClientIds);
				if (!admission.ok) return failSkill(admission.error);
			}
			if (options.dryRun === true) return {
				status: "planned",
				plannedActions,
				appliedActions,
				clients,
				doctor: summarizeDoctor(discovery.initialDoctor),
				clientStates,
				...manualRemediation === undefined ? {} : { remediation: manualRemediation }
			};
			let approved = options.approved || plannedActions.length === 0;
			let interactiveApproval = false;
			if (!approved && confirm !== undefined && !options.structured) {
				const decision = await confirm?.(plannedActions, {
					stage: "confirm",
					...manualRemediation === undefined ? {} : { remediation: manualRemediation },
					clientStates,
					selectedClientIds,
					clientSelectionAllowed: false
				});
				assertSetupActive(options.signal);
				if (decision !== undefined) {
					if (isSetupDecisionCancelled(decision)) return setupCancelled(plannedActions, clients, clientStates, discovery.initialDoctor);
					approved = typeof decision === "boolean" ? decision : decision.approved;
					interactiveApproval = approved;
				}
			}
			if (!approved) return {
				status: confirm === undefined ? "needs_confirmation" : "cancelled",
				plannedActions,
				appliedActions,
				clients,
				doctor: summarizeDoctor(discovery.initialDoctor),
				clientStates,
				...confirm === undefined ? { remediation: "Review the setup plan, then rerun interactively or with --yes." } : {}
			};
			if (planSelection.skillSelected) {
				const admission = await host.validateSkillDirectories(selectedSkillClientIds);
				if (!admission.ok) return failSkill(admission.error);
			}
			assertSetupActive(options.signal);
			const desktopFailure = await desktop.apply(appliedActions, options.onProgress, options.signal);
			progress.desktopFailure = desktopFailure;
			assertSetupActive(options.signal);
			let selectedClients = planSelection.clientsToConfigure;
			let hopperWarning;
			let hopperFailure;
			if (planSelection.installHopper && (interactiveApproval || options.installHopper)) {
				const install = await installHopperAction({
					host,
					options,
					appliedActions,
					selectedClients,
					providerEnvironment,
					clientEnvironments: desktop.clientEnvironments,
					recordResult: (result) => {
						progress.hopperOutcome = result;
					}
				});
				if ("failure" in install) hopperFailure = install.failure;
				else ({hopperPath, providerEnvironment, selectedClients, warning: hopperWarning} = install);
			}
			assertSetupActive(options.signal);
			const clientFailure = await configureDetectedClients({
				host,
				detectedClients: selectedClients,
				providerEnvironment,
				clientEnvironments: desktop.clientEnvironments,
				command: host.registrationCommand,
				clients,
				appliedActions,
				signal: options.signal,
				...options.onProgress === undefined ? {} : { onProgress: options.onProgress }
			});
			assertSetupActive(options.signal);
			const withHopperFailure = (result) => hopperFailure === undefined ? result : {
				...result,
				code: result.code ?? hopperFailure.code,
				remediation: combineRemediation(hopperFailure.remediation, result.remediation) ?? hopperFailure.remediation,
				...hopperDownload(hopperFailure)
			};
			if (clientFailure !== undefined) return withHopperFailure(await fail(clientFailure));
			if (planSelection.installSkill) {
				const skill = await installSkillAction(host, options, appliedActions, selectedSkillClientIds);
				progress.skill = skill;
				if (!skill.ok && skill.error.completed) pending.skill = skill.error;
				assertSetupActive(options.signal);
				if (!skill.ok && !skill.error.completed) {
					return withHopperFailure(await failSkill(skill.error));
				}
			}
			const doctor = summarizeDoctor(await host.doctor(readinessScope));
			const remediation = combineRemediation(desktopFailure, hopperFailure?.remediation ?? desktop.readinessRemediation(doctor.healthy) ?? finalSetupRemediation(host.platform, appliedActions.includes("installed_hopper"), doctor.healthy, hopperPath === undefined && planDiscovery.hopperInstall.supported !== false), hopperWarning, manualRemediation);
			return {
				status: remediation === undefined ? "ready" : "needs_human",
				plannedActions,
				appliedActions,
				clients,
				doctor,
				clientStates,
				...remediation === undefined ? {} : { remediation },
				...hopperFailure === undefined ? {} : {
					code: hopperFailure.code,
					...hopperDownload(hopperFailure)
				}
			};
		};
		hopperDownload = (failure) => failure.download === undefined ? {} : { download: failure.download };
		installHopperAction = async (input) => {
			const label = "Hopper deep-analysis provider";
			emitProgress(input.options, {
				actionId: "install_hopper",
				label,
				state: "started"
			});
			const installed = await input.host.installHopper(input.options.installHopper, input.options.signal);
			input.recordResult(installed);
			if (installed.status === "failed") {
				emitProgress(input.options, {
					actionId: "install_hopper",
					label,
					state: "failed",
					detail: installed.remediation
				});
				return { failure: installed };
			}
			input.appliedActions.push("installed_hopper");
			const warning = [installed.warning, installed.cleanupFailure].filter((value) => value !== undefined).join(" ");
			emitProgress(input.options, {
				actionId: "install_hopper",
				label,
				state: warning === "" ? "completed" : "warning",
				detail: warning === "" ? installed.launcherPath : `${installed.launcherPath}; ${warning}`
			});
			const providerEnvironment = {
				...input.providerEnvironment,
				HOPPER_LAUNCHER_PATH: installed.launcherPath
			};
			return {
				hopperPath: installed.launcherPath,
				providerEnvironment,
				...warning === "" ? {} : { warning },
				selectedClients: await filterClientsNeedingConfigure(input.host, input.selectedClients, {
					providerEnvironment,
					clientEnvironments: input.clientEnvironments
				}, input.host.registrationCommand)
			};
		};
		installSkillAction = async (host, options, appliedActions, skillClientIds) => {
			const label = "REA reverse-engineering skill";
			emitProgress(options, {
				actionId: "install_skill",
				label,
				state: "started"
			});
			const skill = await host.installSkill(skillClientIds);
			if (!skill.ok) {
				if (skill.error.completed) appliedActions.push("installed_skill");
				emitProgress(options, {
					actionId: "install_skill",
					label,
					state: skill.error.completed ? "warning" : "failed",
					detail: skill.error.message
				});
				return skill;
			}
			if (skill.value === "installed") appliedActions.push("installed_skill");
			emitProgress(options, {
				actionId: "install_skill",
				label,
				state: skill.value === "installed" ? "completed" : "warning",
				...skill.value === "unchanged" ? { detail: "Already current" } : {}
			});
			return skill;
		};
		setupFailure = async (remediation, [host, plannedActions, appliedActions, clients, clientStates], scope) => {
			return {
				status: "needs_human",
				plannedActions,
				appliedActions,
				clients,
				doctor: summarizeDoctor(await host.doctor(scope)),
				clientStates,
				remediation
			};
		};
		emitProgress = (options, event) => options.onProgress?.(event);
		manualClientsRemediation = (clients) => clients.map((client) => manualRegistrationRemediation(client.name)).find((remediation) => remediation !== undefined);
		combineRemediation = (...parts) => {
			const present = parts.filter((part) => part !== undefined && part !== "");
			return present.length === 0 ? undefined : present.join(" ");
		};
		finalSetupRemediation = (platform, installedHopper, healthy, offerHopperInstall) => {
			if (platform === "darwin" && installedHopper) return "Open Hopper, choose its demo mode or activate a license, then rerun rea doctor --json.";
			if (healthy) return undefined;
			return offerHopperInstall ? "Hopper is optional for non-Hopper providers. Rerun with --yes --install-hopper for deep native analysis." : "Run rea doctor and apply each reported remediation.";
		};
		isSetupDecisionCancelled = (decision) => typeof decision === "boolean" ? !decision : decision.cancelled === true;
		setupCancelled = (plannedActions, clients, clientStates, doctor) => ({
			status: "cancelled",
			plannedActions,
			appliedActions: [],
			clients,
			doctor: summarizeDoctor(doctor),
			clientStates
		});
		resolvedReadinessScope = (requested, selection, desktopBuild) => ({
			clients: selection.selectedClients.map(({ name }) => name),
			providers: [...new Set([...selection.installHopper ? ["hopper"] : requested?.providers ?? [], ...desktopBuild ? [DESKTOP_BUILD_PROVIDER_ID] : []])],
			skill: selection.skillSelected === true || requested?.skill === true,
			...selection.skillSelected === true || requested?.skill === true ? { skillClients: selection.selectedSkillClientIds } : {}
		});
		summarizeDoctor = (report) => ({
			healthy: report.healthy,
			environment_healthy: report.environment_healthy,
			scope: report.scope,
			availableProviders: [...report.hopperPath !== undefined && report.checks.filter(({ name }) => name.startsWith("hopper")).every(({ ok }) => ok) ? ["hopper"] : [], ...(report.providerInspections ?? []).filter(({ available, checks }) => available && checks.every(({ ok }) => ok)).map(({ id }) => id)],
			...report.hopperPath === undefined ? {} : { hopperPath: report.hopperPath },
			...report.providerInspections === undefined ? {} : { providerInspections: report.providerInspections },
			...report.identity === undefined ? {} : { identity: {
				skill: report.identity.skill,
				registrations: report.identity.registrations
			} }
		});
	})))();
}

//#endregion
init_Setup();
export { runSetup };