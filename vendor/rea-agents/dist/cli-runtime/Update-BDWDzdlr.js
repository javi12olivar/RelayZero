import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { currentClientRegistrationCommand, init_ClientRegistrationIdentity } from "./ClientRegistrationIdentity-DNGzp3ks.js";
import { RegularFileCleanupFailure, init_OwnedRegularFile } from "./resources-B3P64jvH.js";
import { existingSkillDestinations, init_SetupSkill } from "./SetupSkill-C0Ili3Va.js";
import { explicitSetupRegistrationEnvironment, init_ClientRegistrationStatus, init_SetupRegistrationEnvironment, readClientRegistrationInspections } from "./SetupRegistrationEnvironment-Z2gzconq.js";
import { clientRefreshRefusal, init_SetupClientConfiguration } from "./SetupClientConfiguration-BUsisgiN.js";
import { gt, valid } from "semver";
import { z } from "zod";

//#region dist/application/UpdateMaintenance.js
var setupPlanSchema, unresolvedRegistrationDetail, unresolvedMaintenanceClients, unresolvedMaintenanceRemediation, unavailableMaintenance, existingMaintenanceScope, planIntegrationMaintenance;
function init_UpdateMaintenance() {
	return (init_UpdateMaintenance = __esmMin((() => {
		init_OwnedRegularFile();
		init_ClientRegistrationIdentity();
		init_ClientRegistrationStatus();
		init_SetupClientConfiguration();
		init_SetupRegistrationEnvironment();
		init_SetupSkill();
		init_errorMessage();
		setupPlanSchema = z.object({
			status: z.literal("planned"),
			plannedActions: z.array(z.object({
				id: z.string(),
				kind: z.enum(["configure_client", "install_skill"]),
				label: z.string(),
				target: z.string(),
				detail: z.string(),
				external: z.literal(false),
				operation: z.enum([
					"create",
					"update",
					"install"
				]),
				backupPath: z.string().optional(),
				commands: z.array(z.string()).optional()
			}))
		});
		unresolvedRegistrationDetail = ({ client, config_path, remediation }) => `${client} (${config_path}): ${remediation}`;
		unresolvedMaintenanceClients = (maintenance) => (maintenance.status === "current" ? maintenance.unresolved : maintenance.scope?.unresolved) ?? [];
		unresolvedMaintenanceRemediation = (unresolved) => `REA did not maintain ${unresolved.length === 1 ? "one client" : `${String(unresolved.length)} clients`} whose registration it cannot update: ${unresolved.map(unresolvedRegistrationDetail).join(" ")}`;
		unavailableMaintenance = (remediation, scope) => {
			const unresolved = scope?.unresolved ?? [];
			return {
				status: "unavailable",
				remediation: unresolved.length === 0 ? remediation : `${remediation} ${unresolvedMaintenanceRemediation(unresolved)}`,
				...scope === undefined ? {} : { scope }
			};
		};
		existingMaintenanceScope = async (home, entryPoint, environment, { platform, resources, systemPaths }) => {
			const registrations = await readClientRegistrationInspections(home, entryPoint, {
				platform,
				environment,
				evidence: "ownership",
				...resources === undefined ? {} : { resources },
				...systemPaths === undefined ? {} : { systemPaths }
			});
			const clients = [];
			const unresolved = [];
			const command = currentClientRegistrationCommand({
				entrypointPath: entryPoint,
				environment
			});
			const settings = explicitSetupRegistrationEnvironment(environment);
			for (const { status: registration, activation, client } of registrations) {
				if (registration.state === "unknown" || registration.state === "invalid") {
					unresolved.push(registration);
					continue;
				}
				if (activation !== "enabled" || registration.state !== "aligned" && registration.state !== "stale" || registration.command_identity !== "owned") continue;
				const refusal = await clientRefreshRefusal(client, settings, command, {
					platform,
					currentCommandPath: entryPoint,
					...resources === undefined ? {} : { resources }
				});
				if (refusal !== undefined) {
					unresolved.push({
						...registration,
						...refusal.alignment === "unknown" ? { state: "unknown" } : {},
						remediation: refusal.remediation
					});
					continue;
				}
				clients.push(registration.client);
			}
			const skills = await existingSkillDestinations(home, environment, platform, resources);
			return {
				clients,
				skill: skills.destinations.length > 0,
				skillDestinations: skills.destinations,
				...skills.issues.length === 0 ? {} : { skillIssues: skills.issues },
				...unresolved.length === 0 ? {} : { unresolved }
			};
		};
		planIntegrationMaintenance = async (home, entryPoint, environment, execute, inputs) => {
			const { resources } = inputs;
			let scope;
			try {
				scope = await existingMaintenanceScope(home, entryPoint, environment, inputs);
				if ((scope.skillIssues?.length ?? 0) > 0) return unavailableMaintenance(`Integration maintenance is unresolved: ${(scope.skillIssues ?? []).map(({ client, path, detail }) => `${client ?? "skill"} (${path}): ${detail}`).join(" ")}`, scope);
				const current = {
					status: "current",
					plannedActions: [],
					...scope.unresolved === undefined ? {} : { unresolved: scope.unresolved }
				};
				const skillDestinations = scope.skillDestinations ?? [];
				if (scope.clients.length === 0 && !scope.skill) return current;
				const command = [
					process.execPath,
					entryPoint,
					"setup",
					...scope.clients.flatMap((client) => ["--client", client]),
					...skillDestinations.flatMap(({ client }) => ["--skill-client", client]),
					`--skill=${String(scope.skill)}`
				];
				const execution = await execute([
					...command,
					"--dry-run",
					"--json"
				]);
				if (!execution.ok) return unavailableMaintenance(execution.error, scope);
				const plan = setupPlanSchema.safeParse(JSON.parse(execution.value));
				if (!plan.success) return unavailableMaintenance(`The updated setup executable returned an invalid maintenance plan: ${plan.error.message}`, scope);
				if (plan.data.plannedActions.length === 0) return current;
				const allowedIds = new Set(scope.clients.map((client) => `configure_client:${client}`));
				const skillTargets = new Set(skillDestinations.map(({ path }) => path));
				if (plan.data.plannedActions.some((action) => action.kind === "install_skill" ? !skillTargets.has(action.target) : !allowedIds.has(action.id))) return unavailableMaintenance("The updated setup plan included an integration outside the existing REA maintenance scope.", scope);
				return {
					status: "planned",
					scope,
					command,
					plannedActions: plan.data.plannedActions.map(({ backupPath, commands, ...action }) => ({
						...action,
						...backupPath === undefined ? {} : { backupPath },
						...commands === undefined ? {} : { commands }
					}))
				};
			} catch (cause) {
				if (resources === undefined && cause instanceof RegularFileCleanupFailure) throw cause;
				return unavailableMaintenance(errorMessage(cause), scope);
			}
		};
	})))();
}

//#endregion
//#region dist/application/Update.js
var Update_exports = /* @__PURE__ */ __exportAll({
	runUpdate: () => runUpdate,
	updateInstallCommand: () => updateInstallCommand
});
var updateInstallCommand, versionCheckRemediation, runUpdate, runUpdateWorkflow;
function init_Update() {
	return (init_Update = __esmMin((() => {
		init_identity();
		init_UpdateMaintenance();
		init_errorMessage();
		updateInstallCommand = (installation, version) => {
			const release = `${PRODUCT_IDENTITY.packageName}@${version}`;
			const manager = installation.manager;
			switch (manager) {
				case "npm": return [
					"npm",
					"install",
					"--global",
					"--ignore-scripts",
					"--prefix",
					installation.prefix,
					release
				];
				case "bun": return [
					"bun",
					"add",
					"--global",
					"--ignore-scripts",
					release
				];
				default: {
					const exhaustive = manager;
					throw new TypeError(`Unhandled installation manager: ${String(exhaustive)}`);
				}
			}
		};
		versionCheckRemediation = (release) => {
			if (release.ok) {
				return "REA received invalid version metadata. Check the installed version and npm registry, then rerun rea update.";
			}
			const failure = release.error;
			const kind = failure.kind;
			const detail = `${failure.detail}${failure.detail.endsWith(".") ? "" : "."}`;
			switch (kind) {
				case "unsupported-package-manager": return failure.detail;
				case "package-manager-unavailable": return `REA's local ${failure.manager} command failed: ${detail} Make ${failure.manager} available on PATH or repair its launcher, then rerun rea update.`;
				case "unavailable": return `REA could not resolve the latest release: ${detail} Check the package-manager diagnostic and registry access, then rerun rea update.`;
				case "invalid-metadata": return `REA could not resolve the latest release: ${detail} Check the npm release metadata, then rerun rea update.`;
				default: {
					const exhaustive = kind;
					throw new TypeError(`Unhandled release lookup failure: ${String(exhaustive)}`);
				}
			}
		};
		runUpdate = async (currentVersion, host, output = "human") => {
			let result;
			let primaryFailure;
			let failed = false;
			try {
				result = await runUpdateWorkflow(currentVersion, host, output);
			} catch (cause) {
				failed = true;
				primaryFailure = cause;
			}
			let cleanupFailure;
			try {
				cleanupFailure = await host.close?.();
			} catch (cause) {
				cleanupFailure = `Update resource cleanup failed: ${errorMessage(cause)}`;
			}
			if (failed) {
				if (cleanupFailure !== undefined) throw new AggregateError([primaryFailure, new Error(cleanupFailure)], "Update failed and its resource cleanup remains incomplete.", { cause: primaryFailure });
				throw primaryFailure;
			}
			if (result === undefined) throw new Error("Update result was not produced.");
			return cleanupFailure === undefined ? result : {
				...result,
				cleanupFailure
			};
		};
		runUpdateWorkflow = async (currentVersion, host, output) => {
			const installation = await host.installation();
			const release = await host.latestVersion(installation);
			const latestVersion = release.ok ? release.value : null;
			const targetVersion = release.ok ? valid(release.value) : null;
			if (!release.ok || valid(currentVersion) === null || targetVersion === null) return {
				status: "failed",
				currentVersion,
				latestVersion,
				reason: "version-check",
				remediation: versionCheckRemediation(release)
			};
			if (!gt(targetVersion, currentVersion)) return {
				status: "current",
				currentVersion,
				latestVersion: targetVersion,
				installMethod: installation?.manager ?? "unknown"
			};
			if (installation === undefined) return {
				status: "failed",
				currentVersion,
				latestVersion: targetVersion,
				reason: "unknown-install-method",
				remediation: "Update this installation with the package manager or source checkout that owns it. For a one-off latest invocation, use npx rea-agents@latest."
			};
			const installed = await host.installVersion(installation, targetVersion, output);
			if (!installed.ok) return {
				status: "failed",
				currentVersion,
				latestVersion: targetVersion,
				reason: "install",
				remediation: `REA could not install ${targetVersion} in ${installation.manager === "npm" ? installation.prefix : installation.globalDirectory}: ${installed.error}. Repair this ${installation.manager} installation, then rerun rea update.`
			};
			const verified = await host.installedVersion(installation);
			if (!verified.ok || verified.value !== targetVersion) return {
				status: "failed",
				currentVersion,
				latestVersion: targetVersion,
				reason: "verification",
				...verified.ok ? { installedVersion: verified.value } : {},
				remediation: `${installation.manager} completed, but REA could not verify ${targetVersion} in ${installation.packageRoot}: ${verified.ok ? `the executable reported ${verified.value}` : verified.error}. The installation may have changed; repair it before retrying.`
			};
			const maintenance = await host.planMaintenance(installation);
			const unresolved = unresolvedMaintenanceClients(maintenance);
			const unresolvedNotice = maintenance.status === "unavailable" || unresolved.length === 0 ? "" : ` ${unresolvedMaintenanceRemediation(unresolved)}`;
			return {
				status: "updated",
				previousVersion: currentVersion,
				latestVersion: targetVersion,
				installedVersion: verified.value,
				installMethod: installation.manager,
				command: updateInstallCommand(installation, targetVersion),
				maintenance,
				remediation: `${maintenance.status === "planned" ? "REA is updated. Run the maintenance command to review and approve changes to existing REA integrations, then restart affected agents." : maintenance.status === "unavailable" ? "REA is updated. Integration maintenance could not be planned; inspect the maintenance diagnostic before changing configuration." : "REA is updated. Restart agents running this installation to load the new version."}${unresolvedNotice}`
			};
		};
	})))();
}

//#endregion
export { Update_exports, init_Update, init_UpdateMaintenance, planIntegrationMaintenance, updateInstallCommand };