import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, errorMessage, init_configurationErrors, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { currentClientRegistrationCommand, init_ClientRegistrationIdentity } from "./ClientRegistrationIdentity-DNGzp3ks.js";
import { init_processArgument, processArgumentSchema } from "./processArgument-lxWEHCsa.js";
import { clientConfigurationRecordSchema, clientConfigurationValuesEqual, clientRegistrationEntry, geminiServerPolicyBlock, init_ClientConfigurationDocument, parseGeminiMcpPolicy } from "./SupportedClients-C1oeYZNH.js";
import { clientRegistrationSource, clientRegistrationSourceFacts, init_ClientConfigurationFiles, init_ClientRegistration, init_ClientRegistrationSource, launchedRegistrationEntry, parseClientRegistrationLauncher, readConfigurationFile, readConfigurationText } from "./ClientRegistration-BAglyiA5.js";
import { init_jsonRecord, jsonRecordSchema } from "./jsonRecord-Cuy_NNu4.js";
import { dirname, resolve } from "node:path";
import { z } from "zod";
import { realpath, stat } from "node:fs/promises";
import { stripComments } from "jsonc-parser";

//#region dist/application/JunieClientSettings.js
var readJunieLocationBlock;
function init_JunieClientSettings() {
	return (init_JunieClientSettings = __esmMin((() => {
		init_result();
		init_ClientConfigurationDocument();
		init_ClientConfigurationFiles();
		init_errorMessage();
		readJunieLocationBlock = async (settings, resources) => {
			if (settings.mcpDefaultLocations?.toLowerCase() === "false") return ok("Junie's default MCP locations are disabled by JUNIE_MCP_DEFAULT_LOCATIONS, so Junie does not load this registration.");
			if (settings.configLocation) return ok("Cannot determine Junie's MCP location selection while JUNIE_CONFIG_LOCATION is set. Inspect the additional Junie configuration before registering.");
			if (settings.configDefaultLocations?.toLowerCase() === "false") return ok(undefined);
			const read = await readConfigurationText(settings.userConfigPath, resources);
			if (!read.ok) return err({
				...read.error,
				detail: `Cannot inspect Junie's user configuration to determine its MCP locations. ${read.error.detail}`
			});
			if (read.value === undefined) return ok(undefined);
			let parsed;
			try {
				parsed = JSON.parse(read.value);
			} catch (cause) {
				return err({
					kind: "malformed",
					path: settings.userConfigPath,
					detail: `Cannot parse Junie's user configuration as JSON to determine its MCP locations: ${errorMessage(cause)}`
				});
			}
			const record = clientConfigurationRecordSchema.safeParse(parsed);
			const value = record.success ? record.data["mcp-default-locations"] : undefined;
			if (record.success && value === undefined) return ok(undefined);
			if (typeof value !== "boolean") return err({
				kind: "malformed",
				path: settings.userConfigPath,
				detail: "Junie's user configuration does not establish whether default MCP locations are enabled: mcp-default-locations is not a boolean."
			});
			return ok(value ? undefined : "Junie's user configuration disables its default MCP locations, so Junie does not load this registration.");
		};
	})))();
}

//#endregion
//#region dist/application/GeminiClientSettings.js
var folderTrustSchema, trustRulesSchema, sourceFailure, normalizedPath, physicalPath, workspaceTrusted, readClientPolicyBlock;
function init_GeminiClientSettings() {
	return (init_GeminiClientSettings = __esmMin((() => {
		init_jsonRecord();
		init_result();
		init_identity();
		init_ClientRegistrationIdentity();
		init_ClientConfigurationDocument();
		init_ClientConfigurationFiles();
		init_JunieClientSettings();
		init_errorMessage();
		folderTrustSchema = z.object({ security: z.object({ folderTrust: z.object({ enabled: z.boolean().optional() }).passthrough().optional() }).passthrough().optional() }).passthrough();
		trustRulesSchema = jsonRecordSchema(z.enum([
			"TRUST_FOLDER",
			"TRUST_PARENT",
			"DO_NOT_TRUST"
		]));
		sourceFailure = (path, cause) => ({
			kind: "malformed",
			path,
			detail: `Gemini settings in ${path} are malformed: ${errorMessage(cause)}`
		});
		normalizedPath = (path, platform) => {
			const absolute = resolve(path).replaceAll("\\", "/");
			return platform === "win32" || platform === "darwin" ? absolute.toLowerCase() : absolute;
		};
		physicalPath = async (path, platform) => normalizedPath(await realpath(path).catch(() => path), platform);
		workspaceTrusted = async (settings, sources, resources) => {
			let enabled = true;
			for (const { path, document } of sources) {
				const parsed = folderTrustSchema.safeParse(document.document);
				if (!parsed.success) return err(sourceFailure(path, parsed.error));
				enabled = parsed.data.security?.folderTrust?.enabled ?? enabled;
			}
			if (settings.trustOverride !== undefined) return ok(settings.trustOverride);
			if (!enabled) return ok(true);
			const text = await readConfigurationText(settings.trustedFoldersPath, resources);
			if (!text.ok) return text;
			if (text.value === undefined) return ok(false);
			let rules;
			try {
				const parsed = trustRulesSchema.parse(JSON.parse(stripComments(text.value)));
				rules = new Map(Object.entries(parsed).map(([path, level]) => [normalizedPath(path, settings.platform), level]));
			} catch (cause) {
				return err(sourceFailure(settings.trustedFoldersPath, cause));
			}
			const workspace = await physicalPath(settings.workspaceDirectory, settings.platform);
			let longest = -1;
			let trusted = false;
			for (const [path, level] of rules) {
				const effective = await physicalPath(level === "TRUST_PARENT" ? dirname(path) : path, settings.platform);
				if ((workspace === effective || workspace.startsWith(effective.endsWith("/") ? effective : `${effective}/`)) && path.length > longest) {
					longest = path.length;
					trusted = level !== "DO_NOT_TRUST";
				}
			}
			return ok(trusted);
		};
		readClientPolicyBlock = async (client, userDocument, desiredRegistration, resources) => {
			if (client.junieSettings !== undefined) return readJunieLocationBlock(client.junieSettings, resources);
			if (client.name !== "gemini_cli" || client.geminiSettings === undefined) return ok(undefined);
			const settings = client.geminiSettings;
			const sources = [];
			const higher = [];
			for (const path of [
				settings.defaultsPath,
				client.configPath,
				settings.systemPath
			]) {
				const parsed = path === client.configPath ? ok(userDocument) : await readConfigurationFile(path, "json", resources);
				if (!parsed.ok) return parsed;
				if (parsed.value !== undefined) sources.push({
					path,
					document: parsed.value
				});
			}
			const workspace = await physicalPath(settings.workspaceDirectory, settings.platform);
			const home = await physicalPath(dirname(dirname(client.configPath)), settings.platform);
			if (workspace !== home) {
				const path = resolve(settings.workspaceDirectory, ".gemini", "settings.json");
				const present = await stat(path).then(() => ok(true), (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT" ? ok(false) : err({
					kind: "unreadable",
					path,
					detail: `Configuration ${path} could not be read: ${errorMessage(cause)}`
				}));
				if (!present.ok) return present;
				const includeWorkspace = present.value ? await workspaceTrusted(settings, sources, resources) : ok(false);
				if (!includeWorkspace.ok) return includeWorkspace;
				if (includeWorkspace.value) {
					const document = await readConfigurationFile(path, "json", resources);
					if (!document.ok) return document;
					if (document.value !== undefined) {
						const source = {
							path,
							document: document.value
						};
						const systemIndex = sources.findIndex((item) => item.path === settings.systemPath);
						sources.splice(systemIndex < 0 ? sources.length : systemIndex, 0, source);
						higher.push(source);
					}
				}
			}
			const system = sources.find(({ path }) => path === settings.systemPath);
			if (system !== undefined) higher.push(system);
			const policies = [];
			for (const { path, document } of sources) {
				try {
					policies.push(parseGeminiMcpPolicy(document));
				} catch (cause) {
					return err(sourceFailure(path, cause));
				}
			}
			const policy = geminiServerPolicyBlock(policies, PRODUCT_IDENTITY.mcpServerKey);
			if (policy !== undefined) return ok(`${policy} Settings sources: ${sources.map(({ path }) => path).join(", ")}.`);
			const override = higher.findLast(({ document }) => Object.hasOwn(document.servers, PRODUCT_IDENTITY.mcpServerKey));
			const desired = desiredRegistration ?? userDocument?.servers[PRODUCT_IDENTITY.mcpServerKey] ?? clientRegistrationEntry("json", currentClientRegistrationCommand(), {});
			if (override !== undefined && !clientConfigurationValuesEqual(launchedRegistrationEntry(override.document.servers[PRODUCT_IDENTITY.mcpServerKey], override.document.environmentKey, settings.platform), launchedRegistrationEntry(desired, override.document.environmentKey, settings.platform))) return ok(`Gemini mcpServers.${PRODUCT_IDENTITY.mcpServerKey} in ${override.path} overrides the user registration. Review that settings file before rerunning setup; REA does not modify system or workspace settings.`);
			return ok(undefined);
		};
	})))();
}

//#endregion
//#region dist/application/ClientRegistrationConnection.js
var incompatible, admitClientStdioConnection;
function init_ClientRegistrationConnection() {
	return (init_ClientRegistrationConnection = __esmMin((() => {
		init_ClientRegistrationSource();
		init_configurationErrors();
		init_result();
		init_processArgument();
		init_ClientConfigurationDocument();
		init_ClientRegistration();
		incompatible = (condition, source) => {
			if (condition.kind === "all") return condition.conditions.every((item) => incompatible(item, source));
			const value = Object.hasOwn(source, condition.field) ? source[condition.field] : undefined;
			switch (condition.kind) {
				case "truthy": return Boolean(value);
				case "non-nullish": return value !== undefined && value !== null;
				case "present": return Object.hasOwn(source, condition.field);
				case "missing": return value === undefined;
				case "nullish": return value === undefined || value === null;
				case "string": return typeof value === "string";
				case "invalid-string": return value !== undefined && typeof value !== "string";
				case "equals": return value === condition.value;
				case "required-enum": return typeof value !== "string" || !condition.values.includes(value);
				case "optional-enum": return value !== undefined && (typeof value !== "string" || !condition.values.includes(value));
			}
		};
		admitClientStdioConnection = (value, target) => {
			const parsed = clientConfigurationRecordSchema.safeParse(value);
			if (!parsed.success) return err({
				kind: "invalid",
				cause: new ConfigurationError("The native client connection is not an admitted server mapping.")
			});
			const source = parsed.data;
			const connection = target.profile.connection;
			if (connection.kind === "unavailable") return err({
				kind: "unknown",
				cause: new ConfigurationError(connection.reason)
			});
			if (connection.kind === "commandcode") {
				const selector = source.transport ?? source.type ?? "";
				if (typeof selector !== "string") return err({
					kind: "invalid",
					cause: new ConfigurationError("The selected native CommandCode transport tag must be text.")
				});
				const transport = selector.toLowerCase();
				if (transport === "http" || transport === "sse" || transport !== "stdio" && source.url && !source.command) return err({
					kind: "unknown",
					cause: new ConfigurationError("The native CommandCode configuration selects a remote connection rather than the retained stdio launcher.")
				});
			}
			if (connection.kind === "flat") {
				const conflict = connection.stdio.find((item) => incompatible(item, source));
				if (conflict !== undefined) return err({
					kind: conflict.kind === "required-enum" || conflict.kind === "optional-enum" ? "invalid" : "unknown",
					cause: new ConfigurationError(`The native ${target.profile.nativeClient} connection does not establish the retained stdio launcher as selected. Repair its native transport selectors before treating the registration as aligned.`, { settings: [{
						setting: conflict.kind === "all" ? "native transport" : conflict.field,
						constraint: "Native connection selection does not establish stdio"
					}] })
				});
			}
			if (connection.kind === "cline") {
				const selected = clientRegistrationSource(source, target.profile);
				const type = selected.nested ? selected.connection?.type : source.type ?? source.transportType;
				if (type !== undefined && type !== "stdio") return err({
					kind: "unknown",
					cause: new ConfigurationError("The native Cline transport does not select stdio.")
				});
			}
			const launcher = parseClientRegistrationLauncher(value, target);
			if (!launcher.ok) return err({
				kind: "invalid",
				cause: launcher.error
			});
			if ([launcher.value.command, ...launcher.value.args].some((word) => !processArgumentSchema.safeParse(word).success)) return err({
				kind: "invalid",
				cause: new ConfigurationError("The stored stdio executable or arguments contain NUL and cannot be launched. The existing registration was retained; correct its process arguments in the client settings.")
			});
			if (connection.kind === "stdio-only") {
				const applicability = clientRegistrationSourceFacts(target, [launcher.value.command, ...launcher.value.args], value);
				if (!applicability.ok) return err({
					kind: "unknown",
					cause: applicability.error
				});
			}
			return ok(launcher.value);
		};
	})))();
}

//#endregion
export { admitClientStdioConnection, init_ClientRegistrationConnection, init_GeminiClientSettings, readClientPolicyBlock };