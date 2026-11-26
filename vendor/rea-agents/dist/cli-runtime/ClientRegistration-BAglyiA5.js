import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS, DEFAULT_HOPPER_STARTUP_TIMEOUT_MS, errorMessage, init_analysisResourceLimits, init_configurationErrors, init_errorMessage, init_isRecord, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { CURRENT_ENTRYPOINT_PATH, init_CurrentEntrypointPath } from "./CurrentEntrypointPath-CMyQTNb_.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, mergeEnvironmentOverrides, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { classifyClientRegistrationCommand, equivalentClientRegistrationCommands, init_ClientRegistrationIdentity } from "./ClientRegistrationIdentity-DNGzp3ks.js";
import { RegularFileCleanupFailure, init_OwnedRegularFile } from "./resources-B3P64jvH.js";
import { init_RegularFileRead, readRegularFileText } from "./RegularFileRead-CRu2Ia6l.js";
import { clientConfigurationRecordSchema, clientConfigurationValuesEqual, clientRegistrationEntry, clientRegistrationLauncherEntry, dshDocument, dshToolCallTimeout, effectiveClientServer, init_ClientConfigurationDocument, init_DshCordisPatch, init_RegistrationEnvironmentValidation, parseClientConfiguration, validateRegistrationEnvironment } from "./SupportedClients-C1oeYZNH.js";
import { init_analysisSettings, launchAnalysisSetting } from "./analysisSettings-MZ1xRfTM.js";
import { init_jsonRecord, jsonRecordSchema } from "./jsonRecord-Cuy_NNu4.js";
import { MCP_STARTUP_POLICY, init_mcpStartupPolicy, recommendedMcpToolTimeoutMs, recommendedMcpToolTimeoutSeconds } from "./mcpStartupPolicy-Qi-BUxK7.js";
import { z } from "zod";

//#region dist/application/ClientRegistrationSource.js
var clientRegistrationSource, gooseEnvironmentField;
function init_ClientRegistrationSource() {
	return (init_ClientRegistrationSource = __esmMin((() => {
		init_configurationErrors();
		init_result();
		init_ClientConfigurationDocument();
		clientRegistrationSource = (value, profile) => {
			const parsed = clientConfigurationRecordSchema.safeParse(value);
			if (!parsed.success) return {
				source: undefined,
				connection: undefined,
				nested: false
			};
			if (profile?.connection.kind === "cline") {
				const transport = clientConfigurationRecordSchema.safeParse(parsed.data.transport);
				if (transport.success) return {
					source: parsed.data,
					connection: transport.data,
					nested: true
				};
			}
			return {
				source: parsed.data,
				connection: parsed.data,
				nested: false
			};
		};
		gooseEnvironmentField = (connection) => {
			if (connection === undefined || !Object.hasOwn(connection, "env")) return ok("envs");
			if (Object.hasOwn(connection, "envs")) return err(new ConfigurationError("Goose environment is ambiguous: keep only envs or its env alias, not both.", { settings: [{
				setting: "envs",
				constraint: "env and envs declare the same native field"
			}] }));
			return ok("env");
		};
	})))();
}

//#endregion
//#region dist/application/ClientRegistrationEnvironment.js
var TIMEOUT_INPUT_SETTINGS, environmentSchema, VAR_EXPANDING_CLIENTS, expressionSettings, clientRegistrationEnvironment, clientRegistrationEnvironmentDetails, recordedProviderSettings, clientRegistrationEnvironmentDetailsWithBudget, validatedDetails, admittedTimeout, registrationTimeoutInputs, environmentDetails, validatedBudget;
function init_ClientRegistrationEnvironment() {
	return (init_ClientRegistrationEnvironment = __esmMin((() => {
		init_RegistrationEnvironmentValidation();
		init_ClientRegistrationSource();
		init_analysisSettings();
		init_analysisResourceLimits();
		init_configurationErrors();
		init_result();
		init_ClientConfigurationDocument();
		init_identity();
		init_unicodeCodePointOrder();
		init_snapshotEnvironment();
		init_DshCordisPatch();
		TIMEOUT_INPUT_SETTINGS = new Set([
			"REA_ANALYSIS_PROVIDER",
			"REA_GHIDRA_DECOMPILE_TIMEOUT_SECONDS",
			"REA_GHIDRA_STARTUP_TIMEOUT_MS",
			"REA_HOPPER_STARTUP_TIMEOUT_MS",
			"REA_JEB_MCP_TIMEOUT_MS"
		]);
		environmentSchema = clientConfigurationRecordSchema.transform((values, context) => {
			const entries = [];
			for (const [key, value] of Object.entries(values)) {
				if (typeof value === "string") entries.push([key, value]);
				else context.addIssue({
					code: "custom",
					path: [key],
					message: "Environment values must be strings"
				});
			}
			return Object.fromEntries(entries);
		});
		VAR_EXPANDING_CLIENTS = new Set(["qwen_code"]);
		expressionSettings = (clientName, values) => clientName !== undefined && VAR_EXPANDING_CLIENTS.has(clientName) ? new Set(Object.entries(values).filter(([, value]) => /\$(?:[A-Za-z_][A-Za-z0-9_]*|\{[A-Za-z_][A-Za-z0-9_]*\})/u.test(value)).map(([name]) => name)) : new Set();
		clientRegistrationEnvironment = (parsed, client, platform, overrides = {}, validation = "effective") => {
			const details = clientRegistrationEnvironmentDetails(parsed, client, platform, overrides, validation);
			return details.ok ? ok(details.value.values) : details;
		};
		clientRegistrationEnvironmentDetails = (parsed, client, platform, overrides = {}, validation = "effective") => {
			if (parsed?.dialect === "dsh") {
				const environment = dshDocument(parsed.document).environment(overrides, validation, platform);
				if (!environment.ok) return environment;
				return ok(environmentDetails(environment.value.values, environment.value.configuration, environment.value.unresolvedSettings));
			}
			const key = parsed?.environmentKey ?? "env";
			const registration = parsed === undefined ? undefined : effectiveClientServer(parsed, PRODUCT_IDENTITY.mcpServerKey);
			const source = clientRegistrationSource(registration, client?.registrationProfile);
			const field = key === "envs" ? gooseEnvironmentField(source.connection) : ok(key);
			if (!field.ok) return field;
			const raw = source.connection?.[field.value];
			const existing = environmentSchema.safeParse(raw === undefined ? {} : raw);
			if (!existing.success) return err(new ConfigurationError("Invalid REA server environment", { settings: existing.error.issues.map((issue) => ({
				setting: [
					...source.nested ? ["transport"] : [],
					field.value,
					...issue.path
				].join("."),
				constraint: "Server environment must be an object containing only string values"
			})) }));
			const environment = mergeEnvironmentOverrides(existing.data, overrides, platform);
			return validatedDetails(environment, validation, platform, expressionSettings(client?.name, environment));
		};
		recordedProviderSettings = (parsed, client, selected, platform, owns, observe) => {
			const selection = mergeEnvironmentOverrides({}, selected, platform);
			const names = Object.keys(selection).sort(compareUnicodeCodePoints);
			const identity = (name) => platform === "win32" ? name.toUpperCase() : name;
			if (names.length === 0) return undefined;
			const details = clientRegistrationEnvironmentDetails(parsed, client, platform, {}, "fragment");
			if (!details.ok) return {
				unrecorded: [],
				differing: [],
				unresolved: names
			};
			const recorded = snapshotEnvironment(details.value.values, platform);
			const expressions = snapshotEnvironment(Object.fromEntries([...details.value.unresolvedSettings].map((name) => [name, ""])), platform);
			for (const name of names) {
				const value = recorded[identity(name)];
				if (value !== undefined && expressions[identity(name)] === undefined) observe?.(name, value);
			}
			const facts = {
				unrecorded: names.filter((name) => recorded[identity(name)] === undefined && expressions[identity(name)] === undefined),
				differing: names.filter((name) => expressions[identity(name)] === undefined && recorded[identity(name)] !== undefined && recorded[identity(name)] !== selection[name]),
				unresolved: names.filter((name) => expressions[identity(name)] !== undefined)
			};
			const owned = names.filter((name) => {
				const value = recorded[identity(name)];
				return value !== undefined && owns?.(name, value) === true;
			});
			return facts.unrecorded.length + facts.differing.length + facts.unresolved.length + owned.length === 0 ? undefined : {
				...facts,
				...owned.length === 0 ? {} : { owned }
			};
		};
		clientRegistrationEnvironmentDetailsWithBudget = async (parsed, client, overrides, validation, resolveProviderRequestBudget, platform) => {
			const details = clientRegistrationEnvironmentDetails(parsed, client, platform, overrides, validation);
			if (!details.ok) return details;
			const budgetSettings = resolveProviderRequestBudget?.budgetSettings;
			const unresolved = [...details.value.unresolvedSettings].filter((setting) => resolveProviderRequestBudget !== undefined && (budgetSettings === undefined || budgetSettings.has(setting)) || TIMEOUT_INPUT_SETTINGS.has(setting));
			if (details.value.timeoutInputs === undefined || unresolved.length > 0) return err(new ConfigurationError("Cannot derive a provider request budget from expression-backed settings", { settings: unresolved.map((setting) => ({
				setting,
				constraint: "Resolve this setting to a literal before deriving a request budget"
			})) }));
			const resolved = {
				...details.value,
				timeoutInputs: details.value.timeoutInputs
			};
			if (resolveProviderRequestBudget === undefined) return ok(resolved);
			return validatedBudget(resolved, resolveProviderRequestBudget, platform);
		};
		validatedDetails = (environment, validation, platform, expressionSettings) => {
			const validated = validateRegistrationEnvironment(environment, expressionSettings, validation, platform);
			return validated.ok ? ok(environmentDetails(environment, validated.value.configuration, validated.value.unresolvedSettings)) : validated;
		};
		admittedTimeout = (id, environment, fallback) => {
			const parsed = launchAnalysisSetting(id, environment);
			return parsed.ok && parsed.value.value !== null ? parsed.value.value : fallback;
		};
		registrationTimeoutInputs = (environment) => {
			const decompile = launchAnalysisSetting("ghidra.decompile_timeout_seconds", environment);
			const jeb = launchAnalysisSetting("jeb.mcp_timeout_ms", environment);
			return {
				ghidraStartupTimeoutMs: admittedTimeout("ghidra.startup_timeout_ms", environment, DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS),
				hopperStartupTimeoutMs: admittedTimeout("hopper.startup_timeout_ms", environment, DEFAULT_HOPPER_STARTUP_TIMEOUT_MS),
				...decompile.ok && decompile.value.source === "setting" && decompile.value.value !== null ? { ghidraDecompileTimeoutMs: decompile.value.value * 1e3 } : {},
				...jeb.ok && jeb.value.source === "setting" && jeb.value.value !== null && environment.REA_JEB_MCP_TIMEOUT_MS !== undefined ? { jebMcpTimeoutMs: jeb.value.value } : {}
			};
		};
		environmentDetails = (environment, configuration, unresolvedSettings) => ({
			values: Object.fromEntries(Object.entries(environment).sort(([left], [right]) => compareUnicodeCodePoints(left, right))),
			unresolvedSettings,
			timeoutInputs: [...unresolvedSettings].some((setting) => TIMEOUT_INPUT_SETTINGS.has(setting)) ? undefined : {
				analysisProvider: configuration.REA_ANALYSIS_PROVIDER,
				...registrationTimeoutInputs(environment)
			}
		});
		validatedBudget = async (details, resolveProviderRequestBudget, platform) => {
			const providerBudget = await resolveProviderRequestBudget(details.timeoutInputs.analysisProvider, snapshotEnvironment(details.values, platform));
			if (!providerBudget.ok) return providerBudget;
			return ok({
				...details,
				timeoutInputs: {
					...details.timeoutInputs,
					...providerBudget.value === undefined ? {} : { providerRequestTimeoutMs: providerBudget.value }
				}
			});
		};
	})))();
}

//#endregion
//#region dist/application/ClientConfigurationFiles.js
var invalidEnvironment, configurationEnvironmentFailure, readConfigurationText, readConfigurationFile, readClientConfigurationFiles, admitClientConfigurationCandidate, mergeConfigurationValue, clientWriteDialect, clientConfigurationForWrite, effectiveClientConfiguration, inlineRegistrationOrigins, inlineRegistrationOverride, inlineRegistrationEnvironment, launchedRegistrationEntry, mergeClientConfigurationDocuments, readEffectiveClientRegistrationConfiguration;
function init_ClientConfigurationFiles() {
	return (init_ClientConfigurationFiles = __esmMin((() => {
		init_result();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_ClientConfigurationDocument();
		init_ClientRegistrationEnvironment();
		init_snapshotEnvironment();
		init_identity();
		init_errorMessage();
		invalidEnvironment = (path, error, overrides, platform) => {
			const constraints = error.settings.map(({ setting, constraint }) => `${setting}: ${constraint}`).join("; ");
			const overrideNames = new Set(Object.keys(overrides ?? {}).map((name) => platform === "win32" ? name.toUpperCase() : name));
			const overrideSettings = error.settings.map(({ setting }) => setting).filter((setting) => overrideNames.has(platform === "win32" ? setting.toUpperCase() : setting));
			const location = overrideSettings.length > 0 ? `The proposed registration environment includes launch overrides (${overrideSettings.join(", ")}) that do not satisfy the effective REA configuration constraints` : overrideNames.size > 0 ? `The effective REA server environment for ${path} is invalid; check the client configuration and proposed launch overrides` : `Configuration ${path} has an invalid REA server environment`;
			return {
				kind: "malformed",
				path,
				detail: `${location}: ${constraints}${constraints.endsWith(".") ? "" : "."} ${overrideNames.size === 0 ? "Repair it" : "Check the launch environment and any existing registration settings"} before retrying.`
			};
		};
		configurationEnvironmentFailure = (client, platform, { path, document, validation, overrides }) => {
			const environment = clientRegistrationEnvironment(document, client, platform, overrides, validation);
			return environment.ok ? undefined : invalidEnvironment(path, environment.error, overrides, platform);
		};
		readConfigurationText = async (path, resources) => {
			try {
				return ok(await readRegularFileText(path, resources === undefined ? {} : { resources }));
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return ok(undefined);
				return err({
					kind: "unreadable",
					path,
					detail: `Configuration ${path} could not be read: ${errorMessage(cause)}`,
					...cause instanceof RegularFileCleanupFailure ? { cleanupFailure: cause } : {}
				});
			}
		};
		readConfigurationFile = async (path, format, resources) => {
			const source = await readConfigurationText(path, resources);
			if (!source.ok) return source;
			const content = source.value;
			if (content === undefined) return ok(undefined);
			try {
				return ok(parseClientConfiguration(content, format));
			} catch (cause) {
				return err({
					kind: "malformed",
					path,
					detail: `Configuration ${path} is malformed: ${errorMessage(cause)}`
				});
			}
		};
		readClientConfigurationFiles = async (client, resources, platform, { writeOverrides, targetDocument } = {}) => {
			if (client.configPathError !== undefined) return err({
				kind: "unreadable",
				path: client.configPath,
				detail: client.configPathError
			});
			const paths = client.configPaths ?? [client.configPath];
			if (targetDocument !== undefined && !paths.includes(client.configPath)) return err({
				kind: "unreadable",
				path: client.configPath,
				detail: "The selected configuration is missing from the native load order."
			});
			const documents = [];
			for (const path of paths) {
				const isTarget = path === client.configPath;
				const document = isTarget && targetDocument !== undefined ? ok(targetDocument) : await readConfigurationFile(path, client.format, resources);
				if (!document.ok) return document;
				if (document.value === undefined) continue;
				if (isTarget || client.readOnlyLowerLayers !== true) {
					const failure = configurationEnvironmentFailure(client, platform, {
						path,
						document: document.value,
						validation: "fragment",
						overrides: isTarget ? writeOverrides : undefined
					});
					if (failure !== undefined) return err(failure);
				}
				documents.push({
					...document.value,
					sourcePath: path
				});
			}
			if (client.inlineConfiguration !== undefined) documents.push({
				...client.inlineConfiguration.parsed,
				inlineOrigin: client.inlineConfiguration.origin
			});
			const failure = configurationEnvironmentFailure(client, platform, {
				path: client.configPath,
				document: mergeClientConfigurationDocuments(documents, platform),
				validation: "effective",
				overrides: writeOverrides
			});
			return failure === undefined ? ok(documents) : err(failure);
		};
		admitClientConfigurationCandidate = (client, sources, candidate, platform) => {
			const path = client.configPath;
			const fragment = configurationEnvironmentFailure(client, platform, {
				path,
				document: candidate,
				validation: "fragment"
			});
			if (fragment !== undefined) return err(fragment);
			const effective = mergeClientConfigurationDocuments(sources.map((source) => source.sourcePath === path ? candidate : source), platform);
			const failure = configurationEnvironmentFailure(client, platform, {
				path,
				document: effective,
				validation: "effective"
			});
			return failure === undefined ? ok(effective) : err(failure);
		};
		mergeConfigurationValue = (previous, next) => {
			if (!isRecord(previous) || !isRecord(next)) return next;
			return Object.fromEntries([...new Set([...Object.keys(previous), ...Object.keys(next)])].map((key) => [key, Object.hasOwn(next, key) ? mergeConfigurationValue(previous[key], next[key]) : previous[key]]));
		};
		clientWriteDialect = (dialect, sources) => dialect === "opencode" && sources.some(({ dialect }) => dialect === "opencode_v2") ? "opencode_v2" : dialect;
		clientConfigurationForWrite = (parsed, sources) => {
			if (parsed.dialect !== "opencode" || clientWriteDialect(parsed.dialect, sources) !== "opencode_v2") return parsed;
			if (Object.hasOwn(parsed.servers, "servers")) throw new TypeError("A legacy OpenCode server named servers conflicts with the effective native server table; repair this ambiguity before setup");
			return {
				...parsed,
				dialect: "opencode_v2",
				serversPath: ["mcp", "servers"],
				servers: {},
				legacyServers: parsed.servers
			};
		};
		effectiveClientConfiguration = (sources, target, platform) => {
			const documents = target === undefined ? sources : [...(target.client.configPaths ?? [target.client.configPath]).flatMap((path) => {
				const document = path === target.client.configPath ? target.document : sources.find(({ sourcePath }) => sourcePath === path);
				return document === undefined ? [] : [document];
			}), ...sources.filter(({ inlineOrigin }) => inlineOrigin !== undefined)];
			return mergeClientConfigurationDocuments(documents, platform);
		};
		inlineRegistrationOrigins = (client) => {
			const inline = client.inlineConfiguration;
			const name = PRODUCT_IDENTITY.mcpServerKey;
			return inline !== undefined && (Object.hasOwn(inline.parsed.servers, name) || Object.hasOwn(inline.parsed.legacyServers, name)) ? [inline.origin] : [];
		};
		inlineRegistrationOverride = (client, sources, desired, platform) => {
			const name = PRODUCT_IDENTITY.mcpServerKey;
			const inline = sources.filter(({ inlineOrigin }) => inlineOrigin !== undefined);
			const declaring = inline.find((layer) => Object.hasOwn(layer.servers, name) || Object.hasOwn(layer.legacyServers, name));
			if (declaring?.inlineOrigin === undefined) return undefined;
			const files = sources.filter(({ sourcePath }) => sourcePath !== undefined);
			const written = effectiveClientConfiguration(files, {
				client,
				document: {
					...declaring,
					servers: { [name]: desired },
					legacyServers: {}
				}
			}, platform);
			const effective = mergeClientConfigurationDocuments([...written === undefined ? [] : [written], ...inline], platform);
			const launched = (entry) => launchedRegistrationEntry(entry, declaring.environmentKey, platform);
			return clientConfigurationValuesEqual(launched(written?.servers[name]), launched(effective?.servers[name])) ? undefined : declaring.inlineOrigin;
		};
		inlineRegistrationEnvironment = (sources) => {
			const name = PRODUCT_IDENTITY.mcpServerKey;
			const declaring = sources.find((layer) => layer.inlineOrigin !== undefined && (Object.hasOwn(layer.servers, name) || Object.hasOwn(layer.legacyServers, name)));
			if (declaring === undefined) return {};
			const entry = Object.hasOwn(declaring.servers, name) ? declaring.servers[name] : declaring.legacyServers[name];
			const environment = isRecord(entry) ? entry[declaring.environmentKey] : undefined;
			return isRecord(environment) ? Object.fromEntries(Object.entries(environment).filter((setting) => typeof setting[1] === "string")) : {};
		};
		launchedRegistrationEntry = (entry, environmentKey, platform) => {
			if (platform !== "win32" || !isRecord(entry)) return entry;
			const environment = entry[environmentKey];
			if (!isRecord(environment)) return entry;
			return {
				...entry,
				[environmentKey]: Object.fromEntries(Object.entries(mergeEnvironmentOverrides({}, environment, platform)).map(([key, value]) => [key.toUpperCase(), value]))
			};
		};
		mergeClientConfigurationDocuments = (documents, platform) => {
			const last = documents.at(-1);
			if (last === undefined) return undefined;
			if (documents.length === 1) return last;
			const servers = Object.create(null);
			for (const document of documents) {
				const names = new Set([...Object.keys(document.legacyServers), ...Object.keys(document.servers)]);
				for (const name of names) {
					const previous = servers[name];
					const next = effectiveClientServer(document, name);
					const goose = document.dialect === "goose";
					const merged = goose ? isRecord(previous) && isRecord(next) ? {
						...previous,
						...next
					} : next : mergeConfigurationValue(previous, next);
					const key = document.environmentKey;
					if (!goose && name === PRODUCT_IDENTITY.mcpServerKey && isRecord(merged) && isRecord(merged[key])) {
						const before = isRecord(previous) && isRecord(previous[key]) ? previous[key] : {};
						const after = isRecord(next) && isRecord(next[key]) ? next[key] : {};
						servers[name] = {
							...merged,
							[key]: mergeEnvironmentOverrides(before, after, platform)
						};
					} else servers[name] = merged;
				}
			}
			return {
				...last,
				dialect: clientWriteDialect(last.dialect, documents),
				servers,
				legacyServers: {}
			};
		};
		readEffectiveClientRegistrationConfiguration = async (client, resources, platform) => {
			const nativeSources = await readClientConfigurationFiles(client, resources, platform);
			if (!nativeSources.ok) return nativeSources;
			const nativeDocument = effectiveClientConfiguration(nativeSources.value, undefined, platform);
			const fallbackPath = client.format === "zcode" ? client.zcodeFallbackPath : undefined;
			if (fallbackPath === undefined || nativeDocument !== undefined && Object.keys(nativeDocument.servers).length > 0) return ok({
				document: nativeDocument,
				configPath: client.configPath
			});
			const fallbackClient = {
				...client,
				configPath: fallbackPath,
				configPaths: [fallbackPath],
				format: "zcode_fallback"
			};
			const fallbackSources = await readClientConfigurationFiles(fallbackClient, resources, platform);
			if (!fallbackSources.ok) return fallbackSources;
			const fallbackDocument = effectiveClientConfiguration(fallbackSources.value, undefined, platform);
			return ok(fallbackDocument === undefined ? {
				document: nativeDocument,
				configPath: client.configPath
			} : {
				document: fallbackDocument,
				configPath: fallbackPath
			});
		};
	})))();
}

//#endregion
//#region dist/application/ClientRegistrationProfile.js
var stdioSelectingFields;
function init_ClientRegistrationProfile() {
	return (init_ClientRegistrationProfile = __esmMin((() => {
		stdioSelectingFields = (source, connection) => new Set(connection.stdio.flatMap((condition) => {
			if (condition.kind !== "required-enum" && condition.kind !== "optional-enum") return [];
			const value = Object.hasOwn(source, condition.field) ? source[condition.field] : undefined;
			return typeof value === "string" && condition.values.includes(value) ? [condition.field] : [];
		}));
	})))();
}

//#endregion
//#region dist/application/ClientRegistration.js
var tomlTimeoutSchema, launcherSchema, arrayLauncherSchema, opencodeLauncherSchema, normalizeOpencodeLauncher, registrationSchema, codexApprovalModeSchema, codexToolPolicySchema, codexPolicySchema, registrationError, parseClientRegistrationLauncher, clientRegistrationOwnership, clientRegistrationOwnershipRemediation, validateClientPolicy, parseClientRegistrationPolicy, managedPolicyKeys, clientRegistrationSourceFacts, inheritsGooseEnvironmentAlias, replaceClientRegistrationLauncher, writeRegistrationConnection, setupPreservesDisabledActivation, refreshClientRegistration, positiveTimeout;
function init_ClientRegistration() {
	return (init_ClientRegistration = __esmMin((() => {
		init_ClientRegistrationSource();
		init_identity();
		init_jsonRecord();
		init_configurationErrors();
		init_result();
		init_mcpStartupPolicy();
		init_ClientConfigurationDocument();
		init_ClientRegistrationProfile();
		init_ClientRegistrationIdentity();
		init_CurrentEntrypointPath();
		init_DshCordisPatch();
		tomlTimeoutSchema = z.union([z.number().positive(), z.bigint().positive()]);
		launcherSchema = z.object({
			command: z.string().min(1),
			args: z.array(z.string()).default([])
		}).passthrough();
		arrayLauncherSchema = z.object({ command: z.array(z.string()).min(1) }).passthrough();
		opencodeLauncherSchema = arrayLauncherSchema.extend({ type: z.literal("local") });
		normalizeOpencodeLauncher = (entry) => {
			const [command = "", ...args] = entry.command;
			return {
				...entry,
				command,
				args
			};
		};
		registrationSchema = launcherSchema.extend({
			startup_timeout_sec: tomlTimeoutSchema.optional(),
			tool_timeout_sec: tomlTimeoutSchema.optional(),
			startupTimeoutMs: z.number().positive().optional(),
			toolTimeoutMs: z.number().positive().optional(),
			type: z.unknown().optional(),
			transport: z.unknown().optional(),
			serverName: z.string().optional(),
			disabled: z.boolean().optional(),
			enabled: z.boolean().optional()
		});
		codexApprovalModeSchema = z.enum([
			"auto",
			"prompt",
			"writes",
			"approve"
		]);
		codexToolPolicySchema = z.object({
			approval_mode: codexApprovalModeSchema.optional(),
			output_token_limit: z.union([z.number().int().positive(), z.bigint().positive()]).optional()
		}).passthrough();
		codexPolicySchema = z.object({
			default_tools_approval_mode: codexApprovalModeSchema.optional(),
			enabled_tools: z.array(z.string()).optional(),
			disabled_tools: z.array(z.string()).optional(),
			tools: clientConfigurationRecordSchema.superRefine((tools, context) => {
				for (const [name, value] of Object.entries(tools)) {
					const policy = codexToolPolicySchema.safeParse(value);
					if (!policy.success) for (const issue of policy.error.issues) context.addIssue({
						...issue,
						path: [name, ...issue.path]
					});
				}
			}).optional()
		}).passthrough();
		registrationError = (error) => new ConfigurationError("Invalid client registration settings", { settings: error.issues.map((issue) => ({
			setting: issue.path.join("."),
			constraint: issue.message
		})) });
		parseClientRegistrationLauncher = (value, target) => {
			const { dialect, profile } = target;
			if (profile.connection.kind === "unavailable") return err(new ConfigurationError(profile.connection.reason));
			value = clientRegistrationSource(value, profile).connection ?? value;
			const parsed = dialect === "opencode" || dialect === "opencode_v2" || dialect === "fx" || dialect === "kilo" ? arrayLauncherSchema.transform(normalizeOpencodeLauncher).safeParse(value) : dialect === "goose" ? z.object({
				cmd: z.string().min(1),
				args: z.array(z.string()).default([])
			}).passthrough().transform((entry) => ({
				command: entry.cmd,
				args: entry.args
			})).safeParse(value) : launcherSchema.safeParse(value);
			return parsed.success ? ok({
				command: parsed.data.command,
				args: parsed.data.args
			}) : err(registrationError(parsed.error));
		};
		clientRegistrationOwnership = (value, client, currentCommandPath = CURRENT_ENTRYPOINT_PATH) => {
			const parsed = parseClientRegistrationLauncher(value, {
				dialect: client.format ?? "json",
				profile: client.registrationProfile
			});
			return parsed.ok ? classifyClientRegistrationCommand([parsed.value.command, ...parsed.value.args], currentCommandPath) : "unknown";
		};
		clientRegistrationOwnershipRemediation = (ownership, paths) => `The existing "${PRODUCT_IDENTITY.mcpServerKey}" registration read from ${paths.join(", ")} has ${ownership} ownership and was not changed. Review its launcher and manually rename or remove that registration before rerunning setup. A different installation path does not prove REA ownership.`;
		validateClientPolicy = (value, client) => {
			const policy = client.name === "codex" ? codexPolicySchema.safeParse(value) : client.format === "copilot_cli" ? z.object({ tools: z.array(z.string()).optional() }).safeParse(value) : undefined;
			return policy === undefined || policy.success ? ok(undefined) : err(registrationError(policy.error));
		};
		parseClientRegistrationPolicy = (value, client) => {
			const policy = validateClientPolicy(value, client);
			if (!policy.ok) return policy;
			if (client.format === "dsh") {
				const parsed = registrationSchema.pick({
					command: true,
					args: true,
					serverName: true,
					transport: true
				}).extend({ toolCallTimeoutMs: z.unknown().transform(dshToolCallTimeout).optional() }).strip().safeParse(value);
				return parsed.success ? ok(parsed.data) : err(registrationError(parsed.error));
			}
			if (client.format === "opencode" || client.format === "kilo") {
				const entry = opencodeLauncherSchema.extend({ environment: jsonRecordSchema(z.string()).optional() }).transform(normalizeOpencodeLauncher).safeParse(value);
				if (!entry.success) return err(registrationError(entry.error));
				value = entry.data;
			} else if (client.format === "fx" || client.format === "goose") {
				const launcher = parseClientRegistrationLauncher(value, {
					dialect: client.format,
					profile: client.registrationProfile
				});
				if (!launcher.ok) return launcher;
				const entry = clientConfigurationRecordSchema.safeParse(value);
				value = {
					...entry.success ? entry.data : {},
					command: launcher.value.command,
					args: launcher.value.args
				};
			}
			const source = clientRegistrationSource(value, client.registrationProfile);
			if (source.nested) value = {
				...source.source,
				command: source.connection?.command,
				args: source.connection?.args
			};
			const parsed = registrationSchema.safeParse(value);
			if (!parsed.success) return err(registrationError(parsed.error));
			const registration = parsed.data;
			return ok(registration);
		};
		managedPolicyKeys = new Set([
			"env",
			"envs",
			"environment",
			"enabled",
			"disabled",
			"enable",
			"serverName"
		]);
		clientRegistrationSourceFacts = (target, command, previous) => {
			const { profile } = target;
			const connection = profile.connection;
			if (connection.kind === "unavailable") return err(new ConfigurationError(connection.reason));
			const parsed = clientRegistrationSource(previous, profile);
			const { source } = parsed;
			const fields = new Set(Object.keys(clientRegistrationLauncherEntry(target.dialect, command)));
			if (connection.kind === "stdio-only") {
				const admitted = new Set([...fields, ...connection.documentedFields]);
				const unknown = Object.keys(source ?? {}).filter((key) => !admitted.has(key));
				if (previous !== undefined && source === undefined || unknown.length > 0 || source !== undefined && Object.hasOwn(source, "type") && source.type !== "stdio") return err(new ConfigurationError(`Write applicability for ${profile.nativeClient} is unknown outside its documented stdio profile. Review the selected row in the client's native settings; no configuration was changed.`, { settings: [{
					setting: unknown[0] ?? "type",
					constraint: "Native interpretation is not established by the documented stdio profile"
				}] }));
			} else {
				const launcherFields = new Set(fields);
				for (const field of connection.kind === "cline" ? [
					"transport",
					"type",
					"transportType",
					"url"
				] : connection.kind === "commandcode" ? ["type", "url"] : connection.fields) fields.add(field);
				if (connection.kind === "flat") {
					for (const field of stdioSelectingFields(source ?? {}, connection)) if (!launcherFields.has(field)) fields.delete(field);
				}
			}
			return ok({
				...parsed,
				connectionFields: fields
			});
		};
		inheritsGooseEnvironmentAlias = (inherited) => typeof inherited === "object" && inherited !== null && Object.hasOwn(inherited, "env");
		replaceClientRegistrationLauncher = (target, command, previous, inherited) => {
			const { dialect } = target;
			const facts = clientRegistrationSourceFacts(target, command, previous);
			if (!facts.ok) return facts;
			const { source, connectionFields: launcherConnectionKeys } = facts.value;
			const retained = source === undefined ? {} : Object.fromEntries(Object.entries(source).filter(([key]) => !launcherConnectionKeys.has(key)));
			const gooseField = dialect === "goose" ? gooseEnvironmentField(retained) : ok("envs");
			if (!gooseField.ok) return gooseField;
			if (gooseField.value === "env") {
				const alias = jsonRecordSchema(z.string()).safeParse(retained.env);
				if (!alias.success) return err(new ConfigurationError("Invalid Goose env alias", {
					cause: alias.error,
					settings: [{
						setting: "env",
						constraint: "Expected a mapping of string environment values"
					}]
				}));
				if (inheritsGooseEnvironmentAlias(inherited)) retained.env = alias.data;
				else {
					retained.envs = alias.data;
					delete retained.env;
				}
			}
			const defaults = clientRegistrationEntry(dialect, command, {});
			const inheritedPolicy = clientConfigurationRecordSchema.safeParse(inherited);
			if (inheritedPolicy.success) {
				for (const key of Object.keys(defaults)) if (!launcherConnectionKeys.has(key) && (Object.hasOwn(inheritedPolicy.data, key) || dialect === "goose" && key === "envs" && inheritsGooseEnvironmentAlias(inherited) || dialect === "opencode" && key === "enabled" && Object.hasOwn(inheritedPolicy.data, "disabled"))) delete defaults[key];
			}
			if (dialect === "opencode" && source !== undefined && Object.hasOwn(source, "disabled")) delete defaults.enabled;
			const launcher = clientRegistrationLauncherEntry(dialect, command);
			if (facts.value.nested) for (const key of Object.keys(launcher)) delete defaults[key];
			return ok(writeRegistrationConnection(facts.value, {
				...defaults,
				...retained
			}, launcher));
		};
		writeRegistrationConnection = (facts, retained, fields) => facts.nested ? {
			...retained,
			transport: {
				...Object.fromEntries(Object.entries(facts.connection ?? {}).filter(([key]) => key !== "type" && key !== "url" && !Object.hasOwn(fields, key))),
				type: "stdio",
				...fields
			}
		} : {
			...retained,
			...fields
		};
		setupPreservesDisabledActivation = (client, format) => client.sharedRegistration === true || format === "zcode_fallback";
		refreshClientRegistration = (client, dialect, command, environment, previous, timeoutInputs) => {
			const target = {
				dialect,
				profile: client.registrationProfile
			};
			const facts = clientRegistrationSourceFacts(target, command, previous);
			if (!facts.ok) return facts;
			const existing = facts.value.source ?? {};
			const policy = validateClientPolicy(existing, client);
			if (!policy.ok) return policy;
			const prior = parseClientRegistrationLauncher(existing, target);
			const priorCommand = prior.ok ? [prior.value.command, ...prior.value.args] : undefined;
			const launcher = priorCommand !== undefined && equivalentClientRegistrationCommands(priorCommand, command) ? priorCommand : command;
			const defaults = clientRegistrationEntry(dialect, launcher, environment);
			const fields = facts.value.nested ? {
				...clientRegistrationLauncherEntry(dialect, launcher),
				...Object.keys(environment).length === 0 ? {} : { env: { ...environment } }
			} : clientRegistrationLauncherEntry(dialect, launcher);
			if (facts.value.nested) for (const key of Object.keys(fields)) delete defaults[key];
			const registration = writeRegistrationConnection(facts.value, {
				...defaults,
				...Object.fromEntries(Object.entries(existing).filter(([key]) => !facts.value.connectionFields.has(key) && (!managedPolicyKeys.has(key) || facts.value.nested && key === "env")))
			}, fields);
			if (setupPreservesDisabledActivation(client, dialect) && existing.enable === false) registration.enable = false;
			if (client.name === "codex" || client.name === "grok_build") registration.startup_timeout_sec = positiveTimeout(existing.startup_timeout_sec) ?? MCP_STARTUP_POLICY.codexStartupTimeoutSeconds;
			if (client.name === "codex") registration.tool_timeout_sec = positiveTimeout(existing.tool_timeout_sec) ?? recommendedMcpToolTimeoutSeconds(timeoutInputs);
			if (client.name === "kimi") {
				registration.startupTimeoutMs = positiveTimeout(existing.startupTimeoutMs) ?? MCP_STARTUP_POLICY.kimiStartupTimeoutMs;
				registration.toolTimeoutMs = positiveTimeout(existing.toolTimeoutMs) ?? recommendedMcpToolTimeoutMs(timeoutInputs);
			}
			return ok(registration);
		};
		positiveTimeout = (value) => {
			if (typeof value === "bigint") return value > 0n ? value : undefined;
			return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
		};
	})))();
}

//#endregion
export { admitClientConfigurationCandidate, clientConfigurationForWrite, clientRegistrationEnvironment, clientRegistrationEnvironmentDetails, clientRegistrationEnvironmentDetailsWithBudget, clientRegistrationOwnership, clientRegistrationOwnershipRemediation, clientRegistrationSource, clientRegistrationSourceFacts, clientWriteDialect, effectiveClientConfiguration, init_ClientConfigurationFiles, init_ClientRegistration, init_ClientRegistrationEnvironment, init_ClientRegistrationSource, inlineRegistrationEnvironment, inlineRegistrationOrigins, inlineRegistrationOverride, launchedRegistrationEntry, mergeClientConfigurationDocuments, parseClientRegistrationLauncher, parseClientRegistrationPolicy, readClientConfigurationFiles, readConfigurationFile, readConfigurationText, readEffectiveClientRegistrationConfiguration, recordedProviderSettings, refreshClientRegistration, replaceClientRegistrationLauncher, setupPreservesDisabledActivation };