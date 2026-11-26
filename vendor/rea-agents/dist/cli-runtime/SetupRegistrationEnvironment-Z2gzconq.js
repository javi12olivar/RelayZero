import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { CURRENT_ENTRYPOINT_PATH, init_CurrentEntrypointPath } from "./CurrentEntrypointPath-CMyQTNb_.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { init_ClientRegistrationIdentity, inspectClientRegistrationCommand } from "./ClientRegistrationIdentity-DNGzp3ks.js";
import { RegularFileCleanupFailure, init_OwnedRegularFile } from "./resources-B3P64jvH.js";
import { clientEvidencePaths, clientOwnershipEvidencePaths, clientServerForcedEnabled, clientServerListedDisabled, dshDocument, effectiveClientServer, init_ClientConfigurationDocument, init_DshCordisPatch, init_SupportedClients, manualRegistrationRemediation, resolveSupportedClients } from "./SupportedClients-C1oeYZNH.js";
import { clientRegistrationEnvironmentDetailsWithBudget, clientRegistrationOwnershipRemediation, init_ClientConfigurationFiles, init_ClientRegistration, init_ClientRegistrationEnvironment, inlineRegistrationOrigins, parseClientRegistrationLauncher, parseClientRegistrationPolicy, readEffectiveClientRegistrationConfiguration, recordedProviderSettings, setupPreservesDisabledActivation } from "./ClientRegistration-BAglyiA5.js";
import { MCP_STARTUP_POLICY, init_mcpStartupPolicy, mcpProviderDeadlineAllowanceMs, recommendedMcpToolTimeoutMs, recommendedMcpToolTimeoutSeconds } from "./mcpStartupPolicy-Qi-BUxK7.js";
import { admitClientStdioConnection, init_ClientRegistrationConnection, init_GeminiClientSettings, readClientPolicyBlock } from "./ClientRegistrationConnection-PXU3N0EM.js";
import { lstat, stat } from "node:fs/promises";

//#region dist/application/ClientRegistrationStatus.js
var readClientRegistrationStatuses, readClientRegistrationInspections, sharedEnableFlagBinds, sharedDisabledActivationRemediation, ignoresDisabledKey, ignoresEnabledKey, registrationActivation, registrationAligned, remediation, inlineRegistrationRemediation, unknownEntryPointRemediation, configuredStatus, timeoutAdvisory, packageVersionRemediation, unavailableStatus, clientEvidencePresent, isMissing;
function init_ClientRegistrationStatus() {
	return (init_ClientRegistrationStatus = __esmMin((() => {
		init_OwnedRegularFile();
		init_GeminiClientSettings();
		init_ClientConfigurationFiles();
		init_ClientConfigurationDocument();
		init_result();
		init_identity();
		init_CurrentEntrypointPath();
		init_mcpStartupPolicy();
		init_ClientRegistrationIdentity();
		init_SupportedClients();
		init_unicodeCodePointOrder();
		init_DshCordisPatch();
		init_ClientRegistrationEnvironment();
		init_ClientRegistration();
		init_ClientRegistrationConnection();
		init_errorMessage();
		readClientRegistrationStatuses = async (home, currentCommandPath = CURRENT_ENTRYPOINT_PATH, options) => (await readClientRegistrationInspections(home, currentCommandPath, options)).map(({ status }) => status);
		readClientRegistrationInspections = async (home, currentCommandPath = CURRENT_ENTRYPOINT_PATH, options) => {
			const inspections = [];
			for (const client of await resolveSupportedClients(home, options.platform, options.environment, options.systemPaths)) {
				const record = (status, activation = "unknown") => {
					inspections.push({
						status,
						activation,
						client
					});
				};
				const selected = options.selectedClientIds?.includes(client.name) === true;
				if (client.configPathError !== undefined) {
					record({
						client: client.name,
						config_path: client.configPath,
						command: [],
						command_identity: "unknown",
						state: "unknown",
						remediation: client.configPathError
					});
					continue;
				}
				const presence = await clientEvidencePresent(client, {
					selected,
					ownership: options.evidence === "ownership"
				});
				if (!presence.ok) {
					record({
						client: client.name,
						config_path: presence.error.path,
						command: [],
						command_identity: "unknown",
						state: "invalid",
						remediation: presence.error.detail
					});
					continue;
				}
				if (!presence.value) continue;
				const manualRemediation = manualRegistrationRemediation(client.name);
				if (client.format === "unsupported") {
					if (manualRemediation !== undefined) record({
						client: client.name,
						config_path: client.markerPath ?? client.configPath,
						command: [],
						command_identity: "unknown",
						state: "manual",
						remediation: manualRemediation
					});
					continue;
				}
				let selectedConfigPath = client.configPath;
				try {
					const configuration = await readEffectiveClientRegistrationConfiguration(client, options.resources, options.platform);
					if (!configuration.ok) {
						if (options.resources === undefined && configuration.error.cleanupFailure !== undefined) throw configuration.error.cleanupFailure;
						record({
							client: client.name,
							config_path: configuration.error.path,
							command: [],
							command_identity: "unknown",
							state: "invalid",
							remediation: configuration.error.detail
						});
						continue;
					}
					const { document: parsed, configPath } = configuration.value;
					selectedConfigPath = configPath;
					const reportsAbsence = selected || client.registrationApplicability !== true;
					if (parsed === undefined) {
						if (reportsAbsence) record(unavailableStatus(client, "missing", configPath));
						continue;
					}
					const policy = await readClientPolicyBlock(client, parsed, undefined, options.resources);
					if (!policy.ok) {
						if (options.resources === undefined && policy.error.cleanupFailure !== undefined) throw policy.error.cleanupFailure;
						record({
							client: client.name,
							config_path: configPath,
							command: [],
							command_identity: "unknown",
							state: "invalid",
							remediation: policy.error.detail
						});
						continue;
					}
					const policyBlock = policy.value;
					const raw = effectiveClientServer(parsed, PRODUCT_IDENTITY.mcpServerKey);
					if (raw === undefined) {
						const editabilityError = parsed.dialect === "dsh" ? dshDocument(parsed.document).editabilityError : undefined;
						if (editabilityError !== undefined) {
							record({
								client: client.name,
								config_path: configPath,
								command: [],
								command_identity: "unknown",
								state: "invalid",
								remediation: editabilityError.message
							});
							continue;
						}
						if (reportsAbsence) record(unavailableStatus(client, "missing", configPath));
						continue;
					}
					const effectiveClient = parsed.dialect === "zcode_fallback" ? {
						...client,
						configPath,
						configPaths: [configPath],
						format: "zcode_fallback"
					} : client;
					const parsedRegistration = parseClientRegistrationPolicy(raw, effectiveClient);
					if (!parsedRegistration.ok) {
						const launcher = parseClientRegistrationLauncher(raw, {
							dialect: parsed.dialect,
							profile: client.registrationProfile
						});
						const commandIdentity = launcher.ok ? inspectClientRegistrationCommand([launcher.value.command, ...launcher.value.args], currentCommandPath).identity : "unknown";
						record({
							client: client.name,
							config_path: configPath,
							command: [],
							command_identity: commandIdentity,
							state: "invalid",
							remediation: `${parsedRegistration.error.message}: ${parsedRegistration.error.settings.map(({ setting, constraint }) => `${setting}: ${constraint}`).join("; ")}`
						});
						continue;
					}
					const registration = parsedRegistration.value;
					const command = [registration.command, ...registration.args];
					const commandFacts = inspectClientRegistrationCommand(command, currentCommandPath);
					const nativeApplicability = admitClientStdioConnection(raw, {
						dialect: parsed.dialect,
						profile: client.registrationProfile
					});
					if (!nativeApplicability.ok && nativeApplicability.error.kind === "invalid") {
						record({
							client: client.name,
							config_path: configPath,
							command: [],
							command_identity: commandFacts.identity,
							state: "invalid",
							remediation: nativeApplicability.error.cause.message
						});
						continue;
					}
					const registrationEnvironment = client.name === "kimi" || client.name === "codex" || client.name === "lm_studio" || client.name === "dsh" ? await clientRegistrationEnvironmentDetailsWithBudget(parsed, client, {}, "effective", client.name === "lm_studio" ? undefined : options.resolveProviderRequestBudget, options.platform) : undefined;
					if (registrationEnvironment !== undefined && !registrationEnvironment.ok) {
						record({
							client: client.name,
							config_path: configPath,
							command: [],
							command_identity: commandFacts.identity,
							state: "invalid",
							remediation: registrationEnvironment.error.message
						});
						continue;
					}
					const packageReference = commandFacts.package?.reference;
					const activation = registrationActivation(registration, client, parsed);
					const packageVersion = commandFacts.package?.exactVersion;
					const packageVersionDrift = packageVersion !== undefined && packageVersion !== PRODUCT_IDENTITY.packageVersion;
					const sharedDisabledConflict = activation === "disabled" && registration.enable === false && setupPreservesDisabledActivation(effectiveClient, effectiveClient.format);
					const alignment = !nativeApplicability.ok ? "unknown" : registrationAligned({
						registration,
						client: effectiveClient,
						commandFacts
					});
					const status = configuredStatus(effectiveClient, command, commandFacts.identity, alignment === "unknown" ? "unknown" : activation === "enabled" && !packageVersionDrift && alignment === "aligned" && (parsed.dialect !== "dsh" || dshDocument(parsed.document).ready) && policyBlock === undefined ? "aligned" : "stale", (parsed.dialect !== "dsh" && commandFacts.identity !== "owned" ? clientRegistrationOwnershipRemediation(commandFacts.identity, [configPath, ...inlineRegistrationOrigins(client)]) : undefined) ?? (!nativeApplicability.ok ? nativeApplicability.error.cause.message : undefined) ?? policyBlock ?? (packageVersionDrift ? packageVersionRemediation(packageReference ?? "", client) : alignment === "unknown" ? unknownEntryPointRemediation() : undefined) ?? (sharedDisabledConflict ? sharedDisabledActivationRemediation() : undefined), packageReference, registrationEnvironment?.ok === true ? timeoutAdvisory(client, registration, registrationEnvironment.value.timeoutInputs) : undefined, options.providerSettings === undefined ? undefined : recordedProviderSettings(parsed, client, options.providerSettings, options.platform, options.ownedProviderSetting, options.observeProviderSetting === undefined ? undefined : (name, value) => options.observeProviderSetting(client.name, name, value)));
					record(sharedDisabledConflict && status.state !== "aligned" ? {
						...status,
						manual_conflict: "shared_disabled_activation"
					} : status, activation);
				} catch (cause) {
					if (options.resources === undefined && cause instanceof RegularFileCleanupFailure) throw cause;
					record(unavailableStatus(client, isMissing(cause) ? "missing" : "invalid", selectedConfigPath));
				}
			}
			return inspections.sort((left, right) => compareUnicodeCodePoints(left.status.client, right.status.client));
		};
		sharedEnableFlagBinds = (registration, client, parsed) => (parsed.dialect === "zcode" || parsed.dialect === "zcode_fallback" || client.sharedRegistration === true) && registration.enable === false;
		sharedDisabledActivationRemediation = () => "This shared registration row carries enable: false, which binds every reader of the shared storage, including ZCode's fallback view. REA preserves that flag, so rea setup will not change this row. Re-enable it with the product that disabled it, or remove enable: false manually, then rerun rea doctor.";
		ignoresDisabledKey = new Set(["codex", "kimi"]);
		ignoresEnabledKey = new Set(["devin"]);
		registrationActivation = (registration, client, parsed) => client.format !== "grok" && !ignoresDisabledKey.has(client.name) && registration.disabled === true || registration.enabled === false && !ignoresEnabledKey.has(client.name) && !clientServerForcedEnabled(parsed, PRODUCT_IDENTITY.mcpServerKey) || sharedEnableFlagBinds(registration, client, parsed) || clientServerListedDisabled(parsed, PRODUCT_IDENTITY.mcpServerKey) ? "disabled" : "enabled";
		registrationAligned = ({ registration, client, commandFacts }) => {
			const { identity } = commandFacts;
			if (identity === "unknown") return "unknown";
			if (identity === "foreign") return "stale";
			if (client.name === "grok_build" && registration.startup_timeout_sec === undefined) return "stale";
			if (client.name === "codex" && (registration.startup_timeout_sec === undefined || registration.tool_timeout_sec === undefined)) return "stale";
			if (client.name === "kimi" && (registration.startupTimeoutMs === undefined || registration.toolTimeoutMs === undefined)) return "stale";
			if (client.format === "dsh" && registration.serverName !== "rea") return "stale";
			if (client.format === "dsh" && registration.toolCallTimeoutMs === undefined) return "stale";
			if (commandFacts.package !== undefined) return "stale";
			return commandFacts.launch === "runtime_script" ? "aligned" : "stale";
		};
		remediation = (client) => {
			const inline = inlineRegistrationRemediation(client);
			if (client.quitBeforeSetup !== true) return `Run rea setup to refresh this registration, then restart the client.${inline}`;
			const name = client.displayName ?? client.name;
			return `Quit ${name} fully, run rea setup to refresh this registration, then start ${name} again. A running ${name} can rewrite its configuration from memory and drop the registration.${inline}`;
		};
		inlineRegistrationRemediation = (client) => {
			const origins = inlineRegistrationOrigins(client);
			const name = PRODUCT_IDENTITY.mcpServerKey;
			return origins.length === 0 ? "" : ` ${origins.join(", ")} also sets the ${name} entry and overrides the client's files; REA does not edit it, so change or remove ${name} there if setup reports that it overrides the registration.`;
		};
		unknownEntryPointRemediation = () => "The existing registration was retained because its executable identity cannot be verified. Check the registered launcher path, symlink targets and access permissions. Run the installed REA CLI or a supported package runner, then rerun rea doctor; no registration was changed.";
		configuredStatus = (client, command, commandIdentity, state, policyRemediation, packageReference, advisory, providerSettings) => state === "aligned" ? {
			client: client.name,
			config_path: client.configPath,
			command,
			command_identity: commandIdentity,
			...packageReference === undefined ? {} : { package_reference: packageReference },
			state,
			remediation: null,
			...advisory === undefined ? {} : { advisory },
			...providerSettings === undefined ? {} : { provider_settings: providerSettings }
		} : {
			client: client.name,
			config_path: client.configPath,
			command,
			command_identity: commandIdentity,
			...packageReference === undefined ? {} : { package_reference: packageReference },
			state,
			remediation: policyRemediation ?? remediation(client),
			...providerSettings === undefined ? {} : { provider_settings: providerSettings }
		};
		timeoutAdvisory = (client, registration, timeoutInputs) => {
			const toolTimeout = client.name === "kimi" ? registration.toolTimeoutMs : client.name === "codex" ? registration.tool_timeout_sec : client.name === "dsh" ? registration.toolCallTimeoutMs : undefined;
			if (toolTimeout === undefined) return undefined;
			if (client.name === "dsh" && toolTimeout === null) return "The effective timeout is unknown because toolCallTimeoutMs is a caller-owned Cordis expression.";
			const providerAllowance = mcpProviderDeadlineAllowanceMs(timeoutInputs);
			const inMilliseconds = client.name === "kimi" || client.name === "dsh";
			const toolTimeoutMs = Number(toolTimeout) * (inMilliseconds ? 1 : 1e3);
			const batchScope = timeoutInputs.ghidraDecompileTimeoutMs !== undefined && (timeoutInputs.analysisProvider === "ghidra" || timeoutInputs.analysisProvider === "auto") ? "The derived Ghidra deadline is a single-decompile estimate. For multi-function workflows such as batch_decompile, decompile_all or trace_native_values, allow startup plus every attempted function's limit and other work; split calls, reduce trace_native_values max_functions, or select a larger client deadline when needed. Explicit caller deadlines remain unchanged." : undefined;
			if (toolTimeoutMs >= providerAllowance) return batchScope;
			const setting = client.name === "kimi" ? "toolTimeoutMs" : client.name === "dsh" ? "toolCallTimeoutMs" : "tool_timeout_sec";
			const currentValue = inMilliseconds ? `${String(toolTimeout)} ms` : `${String(toolTimeout)} seconds`;
			const recommendedValue = inMilliseconds ? `${String(recommendedMcpToolTimeoutMs(timeoutInputs))} ms` : `${String(recommendedMcpToolTimeoutSeconds(timeoutInputs))} seconds`;
			const headroom = inMilliseconds ? `${String(MCP_STARTUP_POLICY.toolOperationHeadroomMs)} ms` : `${String(MCP_STARTUP_POLICY.toolOperationHeadroomMs / 1e3)} seconds`;
			const recommendation = `The configured ${setting} (${currentValue}) is shorter than REA's known provider allowance (${String(providerAllowance)} ms), so provider startup or an upstream request may exceed this client deadline. REA recommends ${setting} = ${recommendedValue} to cover that allowance plus ${headroom} of operation headroom; this additional headroom is a recommendation, not a guarantee for every analysis.`;
			return batchScope === undefined ? recommendation : `${recommendation} ${batchScope}`;
		};
		packageVersionRemediation = (packageReference, client) => `This registration requests ${packageReference}, while the current REA CLI package is ${PRODUCT_IDENTITY.packageVersion}. REA does not resolve package-runner requests during doctor; update the registration with rea setup --client ${client.name}, then restart the client.`;
		unavailableStatus = (client, state, configPath) => ({
			client: client.name,
			config_path: configPath,
			command: [],
			command_identity: "unknown",
			state,
			remediation: remediation(client)
		});
		clientEvidencePresent = async (client, evidence) => {
			if (evidence.selected) return ok(true);
			if (inlineRegistrationOrigins(client).length > 0) return ok(true);
			const discoveryPaths = new Set(client.discoveryPaths ?? []);
			const paths = [...client.registrationApplicability === true ? [client.configPath, ...client.configPaths ?? []] : clientEvidencePaths(client), ...evidence.ownership ? clientOwnershipEvidencePaths(client) : []];
			let unavailable;
			for (const path of paths) {
				try {
					await (discoveryPaths.has(path) ? stat(path) : lstat(path));
					return ok(true);
				} catch (cause) {
					if (!isMissing(cause)) unavailable ??= {
						path,
						detail: `Client configuration evidence at ${path} could not be inspected: ${errorMessage(cause)}. Check file permissions and rerun rea doctor.`
					};
				}
			}
			return unavailable === undefined ? ok(false) : err(unavailable);
		};
		isMissing = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
	})))();
}

//#endregion
//#region dist/application/SetupRegistrationEnvironment.js
var SELECTED_REGISTRATION_SETTINGS, DISCOVERED_REGISTRATION_SETTINGS, explicitSetupRegistrationEnvironment, providerRegistrationEnvironment, registrationSpelledSettings;
function init_SetupRegistrationEnvironment() {
	return (init_SetupRegistrationEnvironment = __esmMin((() => {
		init_unicodeCodePointOrder();
		SELECTED_REGISTRATION_SETTINGS = [
			"GHIDRA_INSTALL_DIR",
			"GHIDRA_HEADLESS_MAXMEM",
			"GHIDRA_MAXMEM",
			"JAVA_HOME",
			"HOPPER_LAUNCHER_PATH",
			"HOPPER_LOADER_ARGS_JSON",
			"REA_ILSPY_CMD_PATH",
			"REA_ADB_PATH",
			"REA_APKTOOL_COMMAND",
			"REA_TSHARK_COMMAND",
			"REA_CAPINFOS_COMMAND",
			"REA_TSHARK_PRLIMIT_COMMAND",
			"REA_OBJDUMP_COMMAND",
			"REA_GDB_COMMAND",
			"REA_RIZIN_COMMAND",
			"REA_CUTTER_BRIDGE_DIR",
			"REA_WABT_BIN_DIRECTORY",
			"REA_WAKARU_COMMAND",
			"REA_JAVASCRIPT_PRLIMIT_COMMAND",
			"REA_BINWALK_COMMAND",
			"REA_UNBLOB_COMMAND",
			"REA_FIRMWARE_PRLIMIT_COMMAND",
			"REA_EVM_PRLIMIT_COMMAND",
			"REA_SIGROK_COMMAND",
			"REA_SIGROK_PRLIMIT_COMMAND",
			"REA_MITMDUMP_COMMAND",
			"REA_BROWSER_EXECUTABLE",
			"REA_BROWSER_NO_SANDBOX",
			"REA_PWNTOOLS_PYTHON",
			"REA_PWNTOOLS_MAX_INPUT_BYTES",
			"REA_PWNDBG_GDB",
			"REA_PWNDBG_GDBINIT",
			"REA_PWNDBG_VENV_PATH",
			"REA_DARWIN_SWIFTC_PATH",
			"REA_DARWIN_MODULE_CACHE_PATH",
			"SDKROOT",
			"REA_SWIFTC_COMPILE_TIMEOUT_MS",
			"REA_LOG_LEVEL",
			"REA_REFERENCE_SECRET_PATTERNS_JSON",
			"REA_IDA_MCP_CONFIG",
			"REA_JADX_MCP_JAR",
			"REA_JADX_HEAP_MIB",
			"REA_JADX_ACTIVE_PROCESSOR_COUNT",
			"REA_JADX_OPERATION_TIMEOUT_MS",
			"REA_KUNA_COMMAND",
			"REA_KUNA_CACHE_DIR",
			"REA_KUNA_CACHE_MAX_BYTES",
			"REA_KUNA_PROJECT_TIMEOUT_MS",
			"REA_KUNA_TIMEOUT_MS",
			"REA_KUNA_JOBS",
			"REA_ANALYSIS_PROVIDER",
			"REA_ASAR_MAX_HEADER_BYTES",
			"REA_ASAR_MAX_LISTING_BYTES",
			"REA_GHIDRA_VALUE_FLOW_MAX_OPERATIONS",
			"REA_GHIDRA_VALUE_FLOW_MAX_INPUTS_PER_OPERATION",
			"REA_GHIDRA_VALUE_FLOW_MAX_EDGES",
			"REA_GHIDRA_DECOMPILE_MAX_PAYLOAD_MIB",
			"REA_BRIDGE_MAX_REQUEST_BYTES",
			"REA_BRIDGE_MAX_REPLY_BYTES",
			"REA_CAPTURE_DECODER_OLD_GENERATION_MIB",
			"REA_CAPTURE_PACKET_JSON_EXPANSION_BYTES",
			"REA_GHIDRA_DECOMPILE_TIMEOUT_SECONDS",
			"REA_GHIDRA_STARTUP_TIMEOUT_MS",
			"REA_GHIDRA_LANGUAGE_ID",
			"REA_GHIDRA_COMPILER_SPEC_ID",
			"REA_GHIDRA_DISABLED_ANALYZERS",
			"REA_GHIDRA_SEED_FILE",
			"REA_GHIDRA_PROJECT_PATH",
			"REA_GHIDRA_CHECKPOINT_DIR",
			"REA_GHIDRA_PROGRAM_NAME",
			"REA_GHIDRA_NATIVEAOT_JAR",
			"REA_HOPPER_CALLER_SCAN_BUDGET_MS",
			"REA_HOPPER_STARTUP_TIMEOUT_MS",
			"REA_JEB_MCP_URL",
			"REA_JEB_MCP_TIMEOUT_MS",
			"REA_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES",
			"REA_MCP_INPUT_SCHEMA_PROFILE",
			"REA_MCP_TOOL_FAMILIES",
			"REA_MCP_OUTPUT_SCHEMA_PROFILE",
			"REA_MCP_TOOL_CATALOG_PROFILE",
			"REA_MCP_MAX_RESPONSE_BYTES",
			"REA_MCP_MAX_INPUT_ELEMENTS",
			"REA_NATIVE_MATCHING_REPRESENTATION_BYTES",
			"REA_REGEX_MATCHING_DEADLINE_MS",
			"REA_REGEX_WORKER_HEAP_REQUEST_MIB",
			"REA_WINDOWS_CHANGE_TIME_DRIFT_MS",
			"REA_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS",
			"REA_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS",
			"REA_MCP_INITIALIZE_BUDGET_MS",
			"REA_MCP_TOOLS_LIST_BUDGET_MS",
			"REA_MCP_FIRST_CATALOG_BUDGET_MS",
			"REA_MCP_DOCTOR_DEADLINE_MS"
		];
		DISCOVERED_REGISTRATION_SETTINGS = [
			"HOPPER_LAUNCHER_PATH",
			"GHIDRA_INSTALL_DIR",
			"JAVA_HOME"
		];
		explicitSetupRegistrationEnvironment = (environment) => Object.fromEntries(SELECTED_REGISTRATION_SETTINGS.flatMap((key) => {
			const value = environment[key];
			return value === undefined ? [] : [[key, value]];
		}));
		providerRegistrationEnvironment = (inspections) => Object.fromEntries(inspections.flatMap(({ registrationEnvironment }) => Object.entries(registrationEnvironment)).sort(([left], [right]) => compareUnicodeCodePoints(left, right)));
		registrationSpelledSettings = (settings, environment) => {
			const explicit = explicitSetupRegistrationEnvironment(environment);
			return Object.fromEntries(Object.entries(settings).map(([key, value]) => [key, explicit[key] ?? value]));
		};
	})))();
}

//#endregion
export { DISCOVERED_REGISTRATION_SETTINGS, explicitSetupRegistrationEnvironment, init_ClientRegistrationStatus, init_SetupRegistrationEnvironment, providerRegistrationEnvironment, readClientRegistrationInspections, readClientRegistrationStatuses, registrationSpelledSettings };