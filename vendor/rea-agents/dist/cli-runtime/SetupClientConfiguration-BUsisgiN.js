import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, errorMessage, init_configurationErrors, init_errorMessage, init_isRecord, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { currentClientRegistrationCommand, init_ClientRegistrationIdentity } from "./ClientRegistrationIdentity-DNGzp3ks.js";
import { RegularFileChangedError, RegularFileCleanupFailure, init_OwnedRegularFile, init_RegularFile } from "./resources-B3P64jvH.js";
import { InvalidUtf8FileError, init_RegularFileRead, readRegularFileText, readRegularFileTextSnapshot } from "./RegularFileRead-CRu2Ia6l.js";
import { init_SetupRecoveryBackup, preserveCurrentRecoveryBackup, selectCurrentRecoveryBackup } from "./fileHandleMatchesBytes-D-nLHXBv.js";
import { ClientConfigurationPublication, ClientConfigurationWriteError, init_ClientConfigPath, init_ClientConfigurationCleanup, init_ClientConfigurationPublication, init_ClientRegistrationBackup, isClientConfigurationCleanupFailure, preservePrivateRecoveryBackup, resolveClientConfigTransactionPath } from "./ClientConfigurationPublication-DlZOzFmt.js";
import { PRIVATE_PROFILE_MODES, init_ClientConfigurationTransaction, init_ClientPrivateProfile, privateProfileModesCurrent, securePrivateDirectory, withClientConfigurationTransaction } from "./ClientConfigurationTransaction-BiZTqZZt.js";
import { DshCordisDocument, OMP_DISABLED_SERVERS_KEY, clientConfigurationValuesEqual, clientServerListedDisabled, clientServerPath, dshDocument, effectiveClientServer, init_ClientConfigurationDocument, init_DshCordisPatch, init_MsixPackageStorage, init_SupportedClients, legacyClientServerPath, packageReadTargetChanged, parseClientConfiguration, parseZcodeFallbackConfiguration, registrationWriteBlocker, serializeClientConfiguration, shadowedClientServers, withClientServers } from "./SupportedClients-C1oeYZNH.js";
import { clientConfigurationForWrite, clientRegistrationEnvironment, clientRegistrationEnvironmentDetailsWithBudget, clientRegistrationOwnership, clientRegistrationOwnershipRemediation, clientWriteDialect, effectiveClientConfiguration, init_ClientConfigurationFiles, init_ClientRegistration, init_ClientRegistrationEnvironment, inlineRegistrationEnvironment, inlineRegistrationOrigins, inlineRegistrationOverride, readClientConfigurationFiles, readConfigurationText, refreshClientRegistration } from "./ClientRegistration-BAglyiA5.js";
import { init_mcpStartupPolicy, recommendedMcpToolTimeoutMs } from "./mcpStartupPolicy-Qi-BUxK7.js";
import { init_GeminiClientSettings, readClientPolicyBlock } from "./ClientRegistrationConnection-PXU3N0EM.js";
import { DISCOVERED_REGISTRATION_SETTINGS, init_SetupRegistrationEnvironment } from "./SetupRegistrationEnvironment-Z2gzconq.js";
import { dirname } from "node:path";
import { mkdir } from "node:fs/promises";

//#region dist/application/SetupClientConfiguration.js
var ClientConfigurationCleanupRollbackFailure, configureClientConfiguration, cleanupIncomplete, configureClientDocument, persistClientConfiguration, readClientRefresh, clientConfigurationAligned, clientRefreshRefusal, discoveredInlineSettings, inspectClientConfiguration, inspectClientDocument, isMissing, throwCleanupFailure, inlineOverrideBlocker, inlineOverrideRemediation, dshEditabilityBlocker, writeTargetOwnershipBlocker, registrationOwnershipBlocker, readZcodeFallbackServers, restoreConfig, rollbackOrReadbackFailure, rollbackFailure, isConfigurationConflict, conflictFailure, registrationCurrent, privateProfileCurrent, clientConfigurationDesired, GOOSE_INHERITABLE_SETTINGS, withInheritedGooseSettings;
function init_SetupClientConfiguration() {
	return (init_SetupClientConfiguration = __esmMin((() => {
		init_HostPlatform();
		init_GeminiClientSettings();
		init_ClientConfigurationFiles();
		init_result();
		init_configurationErrors();
		init_ClientConfigurationDocument();
		init_SetupRegistrationEnvironment();
		init_snapshotEnvironment();
		init_DshCordisPatch();
		init_ClientPrivateProfile();
		init_RegularFile();
		init_ClientConfigurationTransaction();
		init_ClientConfigurationCleanup();
		init_ClientConfigurationPublication();
		init_ClientRegistrationEnvironment();
		init_ClientRegistration();
		init_mcpStartupPolicy();
		init_identity();
		init_ClientRegistrationIdentity();
		init_ClientConfigPath();
		init_MsixPackageStorage();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_SetupRecoveryBackup();
		init_ClientRegistrationBackup();
		init_SupportedClients();
		init_errorMessage();
		ClientConfigurationCleanupRollbackFailure = class extends RegularFileCleanupFailure {
			configurationFailure;
			constructor(failure, configurationFailure) {
				super({
					...failure,
					cleanupCause: new AggregateError([failure.cleanupCause, configurationFailure], `Configuration readback cleanup and rollback failed: ${failure.path}`)
				});
				this.configurationFailure = configurationFailure;
			}
		};
		configureClientConfiguration = async (client, environment = {}, command = currentClientRegistrationCommand(), resolveProviderRequestBudget, platform = HOST_PLATFORM.platform) => {
			if (command.length === 0) return {
				status: "failed",
				reason: "registration_ownership",
				detail: "The running REA entrypoint could not be identified; run setup from an installed REA command."
			};
			if (client.configPathError !== undefined) return {
				status: "failed",
				reason: "path"
			};
			const transactionPath = await resolveClientConfigTransactionPath(client.configPath);
			if (transactionPath === undefined) return {
				status: "failed",
				reason: "path"
			};
			try {
				return await withClientConfigurationTransaction(transactionPath, () => configureClientDocument({
					client,
					transactionPath,
					platform
				}, environment, command, resolveProviderRequestBudget));
			} catch (cause) {
				if (cause instanceof ConfigurationError && !cause.cleanupIncomplete) return {
					status: "failed",
					reason: "readback"
				};
				throw cause;
			}
		};
		cleanupIncomplete = (cause) => cause instanceof ConfigurationError && cause.cleanupIncomplete;
		configureClientDocument = async ({ client, transactionPath, platform }, environment, command, resolveProviderRequestBudget) => {
			const format = client.format;
			if (format === undefined || format === "unsupported") return {
				status: "failed",
				reason: "readback"
			};
			const files = await readClientConfigurationFiles(client, undefined, platform, { writeOverrides: environment });
			if (!files.ok) {
				throwCleanupFailure(files.error);
				return {
					status: "failed",
					reason: "readback"
				};
			}
			const existing = files.value.find(({ sourcePath }) => sourcePath === client.configPath);
			const editabilityError = existing?.dialect === "dsh" ? dshDocument(existing.document).editabilityError : undefined;
			if (editabilityError !== undefined) return {
				status: "failed",
				reason: "readback"
			};
			let snapshot;
			try {
				snapshot = await readRegularFileTextSnapshot(transactionPath, { symlinks: "reject" });
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) throw cause;
				if (!isMissing(cause)) return {
					status: "failed",
					reason: "readback"
				};
			}
			const original = snapshot?.text;
			let parsed;
			try {
				parsed = parseClientConfiguration(original ?? (format === "toml" || format === "grok" || format === "dsh" ? "" : "{}"), format);
				parsed = clientConfigurationForWrite(parsed, files.value);
				const ownershipBlocker = registrationOwnershipBlocker(client, parsed, original ?? "", files.value, platform);
				if (ownershipBlocker !== undefined) return {
					status: "failed",
					reason: "registration_ownership",
					detail: ownershipBlocker
				};
				const policy = await readClientPolicyBlock(client, parsed, await clientConfigurationDesired(client, environment, command, parsed, files.value, platform, resolveProviderRequestBudget));
				if (!policy.ok) {
					throwCleanupFailure(policy.error);
					return {
						status: "failed",
						reason: "readback"
					};
				}
				if (policy.value !== undefined) return {
					status: "failed",
					reason: "readback"
				};
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) throw cause;
				void cause;
				return {
					status: "failed",
					reason: "readback"
				};
			}
			const fallback = await readZcodeFallbackServers(client, platform, parsed);
			if (!fallback.ok) {
				if (fallback.error.kind !== "registration_ownership") throwCleanupFailure(fallback.error);
				return fallback.error.kind === "registration_ownership" ? {
					status: "failed",
					reason: "registration_ownership",
					detail: fallback.error.detail
				} : {
					status: "failed",
					reason: "readback"
				};
			}
			const desired = await clientConfigurationDesired(client, environment, command, {
				...parsed,
				servers: {
					...fallback.value,
					...parsed.servers
				}
			}, files.value, platform, resolveProviderRequestBudget);
			const override = inlineOverrideBlocker(client, files.value, desired, platform);
			if (override !== undefined) return {
				status: "failed",
				reason: "read_only_override",
				detail: override
			};
			if (registrationCurrent(parsed, desired) && await privateProfileCurrent(client, original)) return { status: "unchanged" };
			return persistClientConfiguration({
				client,
				transactionPath,
				snapshot,
				format,
				original,
				parsed,
				desired,
				fallbackServers: fallback.value,
				platform
			});
		};
		persistClientConfiguration = async ({ client, transactionPath, snapshot, format, original, parsed, desired, fallbackServers, platform }) => {
			if (client.msixPackage !== undefined) {
				const target = await packageReadTargetChanged(client.msixPackage, client.configPath);
				if (!target.ok) return {
					status: "failed",
					reason: "target_unavailable",
					failure: {
						kind: "inspect",
						path: target.error.path,
						detail: target.error.detail
					}
				};
				if (target.value) return {
					status: "failed",
					reason: "target_changed"
				};
			}
			const legacyPath = legacyClientServerPath(parsed, PRODUCT_IDENTITY.mcpServerKey);
			const registered = withClientServers(parsed, {
				...fallbackServers,
				...parsed.servers,
				[PRODUCT_IDENTITY.mcpServerKey]: desired
			}, platform, PRODUCT_IDENTITY.mcpServerKey);
			const ompDisabled = parsed.dialect === "omp" ? parsed.document[OMP_DISABLED_SERVERS_KEY] : undefined;
			const enableOmp = Array.isArray(ompDisabled) && ompDisabled.includes(PRODUCT_IDENTITY.mcpServerKey);
			const document = enableOmp && Array.isArray(ompDisabled) ? {
				...registered,
				[OMP_DISABLED_SERVERS_KEY]: ompDisabled.filter((name) => name !== PRODUCT_IDENTITY.mcpServerKey)
			} : registered;
			let serialized;
			try {
				serialized = serializeClientConfiguration(document, format, original, [
					...Object.keys(fallbackServers).filter((name) => name !== PRODUCT_IDENTITY.mcpServerKey).map((name) => clientServerPath(parsed, name)),
					clientServerPath(parsed, PRODUCT_IDENTITY.mcpServerKey),
					...legacyPath === undefined ? [] : [legacyPath],
					...enableOmp ? [[OMP_DISABLED_SERVERS_KEY]] : []
				], { removeShadowedMembersAt: legacyPath === undefined ? [] : [legacyPath] });
			} catch (cause) {
				return {
					status: "failed",
					reason: "write",
					failure: new ClientConfigurationWriteError(client.configPath, "serialize", cause).problem
				};
			}
			if (!serialized.ok) return {
				status: "failed",
				reason: "shadowed_member",
				path: serialized.error.path
			};
			let recoveryBackupPath;
			if (original !== undefined) {
				const preserved = await (client.privateProfile === undefined ? preserveCurrentRecoveryBackup : preservePrivateRecoveryBackup)(`${client.configPath}.rea.backup`, transactionPath, original);
				if (!preserved.ok) return {
					status: "failed",
					reason: "backup"
				};
				recoveryBackupPath = preserved.value;
			}
			let publication;
			try {
				await mkdir(dirname(client.configPath), {
					recursive: true,
					...client.privateProfile !== undefined ? { mode: PRIVATE_PROFILE_MODES.directory } : {}
				});
				if (client.privateProfile !== undefined && HOST_PLATFORM.platform !== "win32") await securePrivateDirectory(dirname(transactionPath), client.privateProfile.home, () => {}, undefined);
				publication = await ClientConfigurationPublication.write(transactionPath, serialized.value, original, {
					requestedPath: client.configPath,
					state: snapshot?.state,
					...client.privateProfile !== undefined ? { requiredMode: PRIVATE_PROFILE_MODES.file } : {}
				});
			} catch (cause) {
				if (isClientConfigurationCleanupFailure(cause) || cleanupIncomplete(cause)) throw cause;
				if (isConfigurationConflict(cause)) return conflictFailure(recoveryBackupPath);
				return {
					status: "failed",
					reason: "write",
					failure: (cause instanceof ClientConfigurationWriteError ? cause : new ClientConfigurationWriteError(client.configPath, "publish", cause)).problem,
					...recoveryBackupPath === undefined ? {} : { backupPath: recoveryBackupPath }
				};
			}
			return publication.verify(async () => {
				try {
					const text = await readRegularFileText(publication.path);
					await publication.assertCurrent(text);
					const readback = parseClientConfiguration(text, format);
					if (!registrationCurrent(readback, desired) || Object.entries(fallbackServers).some(([name, entry]) => name !== PRODUCT_IDENTITY.mcpServerKey && !clientConfigurationValuesEqual(readback.servers[name], entry))) {
						return await rollbackOrReadbackFailure(publication, original, recoveryBackupPath);
					}
				} catch (cause) {
					if (isConfigurationConflict(cause) || isMissing(cause)) return conflictFailure(recoveryBackupPath);
					if (cause instanceof RegularFileCleanupFailure) {
						const rollback = await restoreConfig(publication, original);
						if (!rollback.ok) throw new ClientConfigurationCleanupRollbackFailure(cause, rollbackFailure(rollback.error, recoveryBackupPath));
						throw cause;
					}
					void cause;
					return rollbackOrReadbackFailure(publication, original, recoveryBackupPath);
				}
				return {
					status: "configured",
					...recoveryBackupPath === undefined ? {} : { backupPath: recoveryBackupPath }
				};
			});
		};
		readClientRefresh = async (client, providerEnvironment, command, { platform, resolveProviderRequestBudget, resources, currentCommandPath }) => {
			const files = await readClientConfigurationFiles(client, resources, platform, { writeOverrides: providerEnvironment });
			if (!files.ok) {
				throwCleanupFailure(files.error);
				return files;
			}
			let original;
			try {
				original = await readRegularFileText(client.configPath, resources === undefined ? {} : { resources });
			} catch (cause) {
				if (!isMissing(cause)) throw cause;
			}
			const parsed = original === undefined ? undefined : clientConfigurationForWrite(parseClientConfiguration(original, client.format), files.value);
			const desired = await clientConfigurationDesired(client, providerEnvironment, command, parsed, files.value, platform, resolveProviderRequestBudget);
			const target = dshEditabilityBlocker(client, files.value) ?? writeTargetOwnershipBlocker(client, files.value, parsed, original, platform, currentCommandPath);
			if (target !== undefined) return ok({
				original,
				parsed,
				desired,
				sources: files.value,
				refusal: target
			});
			const overrideOrigin = inlineRegistrationOverride(client, files.value, desired, platform);
			if (overrideOrigin !== undefined) return ok({
				original,
				parsed,
				desired,
				sources: files.value,
				overrideOrigin,
				refusal: inlineOverrideRemediation(client, overrideOrigin)
			});
			const policy = await readClientPolicyBlock(client, parsed, desired, resources);
			if (!policy.ok) {
				throwCleanupFailure(policy.error);
				return ok({
					original,
					parsed,
					desired,
					sources: files.value,
					refusal: policy.error.detail
				});
			}
			return ok({
				original,
				parsed,
				desired,
				sources: files.value,
				refusal: policy.value
			});
		};
		clientConfigurationAligned = async (client, providerEnvironment, command, resolveProviderRequestBudget, platform = HOST_PLATFORM.platform) => {
			if (client.configPathError !== undefined) return false;
			try {
				const refresh = await readClientRefresh(client, providerEnvironment, command, resolveProviderRequestBudget === undefined ? { platform } : {
					platform,
					resolveProviderRequestBudget
				});
				return refresh.ok && refresh.value.original !== undefined && refresh.value.parsed !== undefined && refresh.value.refusal === undefined && registrationCurrent(refresh.value.parsed, refresh.value.desired) && await privateProfileCurrent(client, refresh.value.original);
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) throw cause;
				void cause;
				return false;
			}
		};
		clientRefreshRefusal = async (client, providerEnvironment, command, { platform, currentCommandPath, resources }) => {
			const refused = (remediation) => ({
				alignment: "refused",
				remediation
			});
			if (client.configPathError !== undefined) return refused(client.configPathError);
			try {
				const refresh = await readClientRefresh(client, providerEnvironment, command, {
					platform,
					currentCommandPath,
					...resources === undefined ? {} : { resources }
				});
				if (!refresh.ok) return refused(refresh.error.detail);
				const discovered = await discoveredInlineSettings(client, providerEnvironment, command, refresh.value, platform);
				if (discovered !== undefined) return {
					alignment: "unknown",
					remediation: `${discovered.origin} sets ${discovered.settings.join(", ")} in REA's ${PRODUCT_IDENTITY.mcpServerKey} registration for ${client.configPath}; setup discovers ${discovered.settings.length === 1 ? "that setting" : "those settings"} from the installed providers and update does not, so REA cannot tell whether this registration is current. Run ${PRODUCT_IDENTITY.cliBinary} setup to check and refresh it.`
				};
				return refresh.value.refusal === undefined ? undefined : refused(refresh.value.refusal);
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) throw cause;
				if (cause instanceof ConfigurationError) return refused(`${cause.message}: ${cause.settings.map(({ setting, constraint }) => `${setting}: ${constraint}`).join("; ")}`);
				return refused(`The configuration could not be read. Check its permissions before rerunning setup. ${errorMessage(cause)}`);
			}
		};
		discoveredInlineSettings = async (client, providerEnvironment, command, refresh, platform) => {
			const [origin] = inlineRegistrationOrigins(client);
			if (origin === undefined) return undefined;
			if (refresh.refusal !== undefined && refresh.overrideOrigin === undefined) return undefined;
			const declared = snapshotEnvironment(inlineRegistrationEnvironment(refresh.sources), platform);
			const selected = snapshotEnvironment(providerEnvironment, platform);
			const adopted = Object.fromEntries(DISCOVERED_REGISTRATION_SETTINGS.flatMap((setting) => {
				const value = declared[setting];
				return Object.hasOwn(selected, setting) || value === undefined ? [] : [[setting, value]];
			}));
			const settings = Object.keys(adopted);
			if (settings.length === 0) return undefined;
			if (refresh.overrideOrigin === undefined) return {
				origin,
				settings
			};
			const desired = await clientConfigurationDesired(client, {
				...providerEnvironment,
				...adopted
			}, command, refresh.parsed, refresh.sources, platform);
			return inlineRegistrationOverride(client, refresh.sources, desired, platform) === undefined ? {
				origin,
				settings
			} : undefined;
		};
		inspectClientConfiguration = async (client, providerEnvironment, command, resolveProviderRequestBudget, platform = HOST_PLATFORM.platform) => {
			let inspection;
			try {
				inspection = await inspectClientDocument(client, providerEnvironment, command, platform, resolveProviderRequestBudget);
			} catch (cause) {
				if (!(cause instanceof ConfigurationError)) throw cause;
				return {
					status: "invalid",
					remediation: `${cause.message}: ${cause.settings.map(({ setting, constraint }) => `${setting}: ${constraint}`).join("; ")}`
				};
			}
			if (inspection.status !== "create" && inspection.status !== "update") return inspection;
			const blocker = registrationWriteBlocker(client, "setup");
			return blocker === undefined ? inspection : {
				status: "invalid",
				remediation: blocker
			};
		};
		inspectClientDocument = async (client, providerEnvironment, command, platform, resolveProviderRequestBudget) => {
			if (client.configPathError !== undefined) return {
				status: "invalid",
				remediation: client.configPathError
			};
			if (client.format === "unsupported") return { status: "already_current" };
			const files = await readClientConfigurationFiles(client, undefined, platform, { writeOverrides: providerEnvironment });
			if (!files.ok) {
				throwCleanupFailure(files.error);
				return {
					status: "invalid",
					remediation: files.error.detail
				};
			}
			const editabilityError = dshEditabilityBlocker(client, files.value);
			if (editabilityError !== undefined) return {
				status: "invalid",
				remediation: editabilityError
			};
			const transactionPath = await resolveClientConfigTransactionPath(client.configPath);
			if (transactionPath === undefined) return {
				status: "invalid",
				remediation: "The configuration path is unsafe or unresolved. Check ownership and symbolic links before rerunning setup."
			};
			let original;
			try {
				original = await readRegularFileText(transactionPath);
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) throw cause;
				if (isMissing(cause)) {
					const ownershipBlocker = writeTargetOwnershipBlocker(client, files.value, undefined, undefined, platform);
					if (ownershipBlocker !== undefined) return {
						status: "invalid",
						remediation: ownershipBlocker
					};
					const desired = await clientConfigurationDesired(client, providerEnvironment, command, undefined, files.value, platform, resolveProviderRequestBudget);
					const override = inlineOverrideBlocker(client, files.value, desired, platform);
					if (override !== undefined) return {
						status: "invalid",
						remediation: override
					};
					const policy = await readClientPolicyBlock(client, undefined, desired);
					if (!policy.ok) {
						throwCleanupFailure(policy.error);
						return {
							status: "invalid",
							remediation: policy.error.detail
						};
					}
					if (policy.value !== undefined) return {
						status: "invalid",
						remediation: policy.value
					};
					const fallback = await readZcodeFallbackServers(client, platform);
					if (!fallback.ok) {
						if (fallback.error.kind !== "registration_ownership") throwCleanupFailure(fallback.error);
						return {
							status: "invalid",
							remediation: fallback.error.detail
						};
					}
					return { status: "create" };
				}
				return {
					status: "invalid",
					remediation: `The configuration file could not be read. Check its permissions before rerunning setup. ${errorMessage(cause)}`
				};
			}
			try {
				const parsed = clientConfigurationForWrite(parseClientConfiguration(original, client.format), files.value);
				const ownershipBlocker = writeTargetOwnershipBlocker(client, files.value, parsed, original, platform);
				if (ownershipBlocker !== undefined) return {
					status: "invalid",
					remediation: ownershipBlocker
				};
				const desired = await clientConfigurationDesired(client, providerEnvironment, command, parsed, files.value, platform, resolveProviderRequestBudget);
				const override = inlineOverrideBlocker(client, files.value, desired, platform);
				if (override !== undefined) return {
					status: "invalid",
					remediation: override
				};
				const policy = await readClientPolicyBlock(client, parsed, desired);
				if (!policy.ok) {
					throwCleanupFailure(policy.error);
					return {
						status: "invalid",
						remediation: policy.error.detail
					};
				}
				if (policy.value !== undefined) return {
					status: "invalid",
					remediation: policy.value
				};
				if (registrationCurrent(parsed, desired) && await privateProfileCurrent(client, original)) return { status: "already_current" };
				const fallback = await readZcodeFallbackServers(client, platform, parsed);
				if (!fallback.ok) {
					if (fallback.error.kind !== "registration_ownership") throwCleanupFailure(fallback.error);
					return {
						status: "invalid",
						remediation: fallback.error.detail
					};
				}
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure || cause instanceof ConfigurationError) throw cause;
				void cause;
				return {
					status: "invalid",
					remediation: "The existing configuration is malformed. Repair it before setup applies any other changes."
				};
			}
			const backupSelection = await selectCurrentRecoveryBackup(`${client.configPath}.rea.backup`, original);
			if (!backupSelection.ok) return {
				status: "invalid",
				remediation: backupSelection.error.detail
			};
			return {
				status: "update",
				backupPath: backupSelection.value.backupPath
			};
		};
		isMissing = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
		throwCleanupFailure = (error) => {
			if (error.cleanupFailure !== undefined) throw error.cleanupFailure;
		};
		inlineOverrideBlocker = (client, sources, desired, platform) => {
			const origin = inlineRegistrationOverride(client, sources, desired, platform);
			return origin === undefined ? undefined : inlineOverrideRemediation(client, origin);
		};
		inlineOverrideRemediation = (client, origin) => `${origin} overrides REA's ${PRODUCT_IDENTITY.mcpServerKey} registration in ${client.configPath}, and REA does not edit it. Remove the ${PRODUCT_IDENTITY.mcpServerKey} server from ${origin} or make it match, then rerun setup.`;
		dshEditabilityBlocker = (client, sources) => {
			const existing = sources.find(({ sourcePath }) => sourcePath === client.configPath);
			return existing?.dialect === "dsh" ? dshDocument(existing.document).editabilityError?.message : undefined;
		};
		writeTargetOwnershipBlocker = (client, sources, parsed, original, platform, currentCommandPath) => {
			if (parsed !== undefined) return registrationOwnershipBlocker(client, parsed, original ?? "", sources, platform, currentCommandPath);
			const inherited = effectiveClientConfiguration(sources, {
				client,
				document: undefined
			}, platform);
			return inherited === undefined ? undefined : registrationOwnershipBlocker(client, inherited, "", sources, platform, currentCommandPath);
		};
		registrationOwnershipBlocker = (client, parsed, original, sources, platform, currentCommandPath) => {
			if (parsed.dialect === "dsh") return undefined;
			const name = PRODUCT_IDENTITY.mcpServerKey;
			const entries = [];
			const effective = effectiveClientConfiguration(sources, {
				client,
				document: parsed
			}, platform);
			if (effective !== undefined && Object.hasOwn(effective.servers, name)) entries.push({
				value: effective.servers[name],
				paths: [...client.configPaths ?? [client.configPath], ...inlineRegistrationOrigins(client)]
			});
			const fragment = parsed.servers[name];
			const inheritsLauncher = effective !== undefined && effective !== parsed && isRecord(fragment) && !Object.hasOwn(fragment, "command");
			if (Object.hasOwn(parsed.servers, name) && !inheritsLauncher) entries.push({
				value: parsed.servers[name],
				paths: [client.configPath]
			});
			if (legacyClientServerPath(parsed, name) !== undefined) {
				entries.push({
					value: parsed.legacyServers[name],
					paths: [client.configPath]
				});
				entries.push(...shadowedClientServers(original, parsed, name).legacyServers.map((value) => ({
					value,
					paths: [client.configPath]
				})));
			}
			for (const entry of entries) {
				const ownership = currentCommandPath === undefined ? clientRegistrationOwnership(entry.value, client) : clientRegistrationOwnership(entry.value, client, currentCommandPath);
				if (ownership !== "owned") return clientRegistrationOwnershipRemediation(ownership, entry.paths);
			}
			return undefined;
		};
		readZcodeFallbackServers = async (client, platform, parsed) => {
			if (client.format !== "zcode" || parsed !== undefined && Object.keys(parsed.servers).length > 0) return ok({});
			const path = client.zcodeFallbackPath;
			const detail = `The ZCode fallback configuration ${path ?? "path"} is unresolved, malformed or unreadable. Repair it before rerunning setup: the first native server would suppress that fallback.`;
			if (path === undefined) return err({
				kind: "unreadable",
				path: client.configPath,
				detail
			});
			const transactionPath = await resolveClientConfigTransactionPath(path);
			if (transactionPath === undefined) return err({
				kind: "unreadable",
				path,
				detail
			});
			const source = await readConfigurationText(transactionPath);
			if (!source.ok) return err({
				...source.error,
				detail: `${detail} ${source.error.detail}`
			});
			if (source.value === undefined) return ok({});
			try {
				const parsed = parseZcodeFallbackConfiguration(source.value);
				const ownershipBlocker = registrationOwnershipBlocker({
					...client,
					configPath: path,
					format: "zcode_fallback"
				}, parsed, source.value, [], platform);
				if (ownershipBlocker !== undefined) return err({
					kind: "registration_ownership",
					path,
					detail: ownershipBlocker
				});
				const environment = clientRegistrationEnvironment(parsed, client, platform);
				if (!environment.ok) return err({
					kind: "malformed",
					path,
					detail: `${detail} ${environment.error.settings.map(({ setting, constraint }) => `${setting}: ${constraint}`).join("; ")}`
				});
				return ok(parsed.servers);
			} catch (cause) {
				return err({
					kind: "malformed",
					path,
					detail: `${detail} ${errorMessage(cause)}`
				});
			}
		};
		restoreConfig = async (publication, original) => {
			try {
				await publication.restore(original);
				return ok(undefined);
			} catch (cause) {
				if (isConfigurationConflict(cause) || isMissing(cause)) return err({ kind: "conflict" });
				return err({
					kind: "restore",
					path: publication.path,
					detail: errorMessage(cause)
				});
			}
		};
		rollbackOrReadbackFailure = async (publication, original, backupPath) => {
			const rollback = await restoreConfig(publication, original);
			return rollback.ok ? {
				status: "failed",
				reason: "readback",
				...backupPath === undefined ? {} : { backupPath }
			} : rollbackFailure(rollback.error, backupPath);
		};
		rollbackFailure = (failure, backupPath) => failure.kind === "conflict" ? conflictFailure(backupPath) : {
			status: "failed",
			reason: "rollback",
			failure,
			...backupPath === undefined ? {} : { backupPath }
		};
		isConfigurationConflict = (cause) => cause instanceof RegularFileChangedError || cause instanceof InvalidUtf8FileError;
		conflictFailure = (backupPath) => ({
			status: "failed",
			reason: "conflict",
			...backupPath === undefined ? {} : { backupPath }
		});
		registrationCurrent = (parsed, desired) => parsed.requiresRewrite !== true && (parsed.dialect !== "dsh" || dshDocument(parsed.document).ready) && clientConfigurationValuesEqual(parsed.servers[PRODUCT_IDENTITY.mcpServerKey], desired) && !Object.hasOwn(parsed.legacyServers, PRODUCT_IDENTITY.mcpServerKey) && !clientServerListedDisabled(parsed, PRODUCT_IDENTITY.mcpServerKey);
		privateProfileCurrent = async (client, original) => client.privateProfile === undefined || original !== undefined && await privateProfileModesCurrent(client.configPath, HOST_PLATFORM.platform);
		clientConfigurationDesired = async (client, providerEnvironment, command, parsed, sources, platform, resolveProviderRequestBudget) => {
			const effective = effectiveClientConfiguration(sources, {
				client,
				document: parsed
			}, platform);
			const format = clientWriteDialect(parsed?.dialect ?? client.format ?? "json", sources);
			const launcher = command.length === 0 ? [PRODUCT_IDENTITY.cliBinary, "mcp"] : command;
			if (format === "dsh") {
				const validated = await clientRegistrationEnvironmentDetailsWithBudget(effective, client, providerEnvironment, "effective", resolveProviderRequestBudget, platform);
				if (!validated.ok) throw validated.error;
				const desired = (parsed === undefined ? new DshCordisDocument("") : dshDocument(parsed.document)).desired(launcher, providerEnvironment, platform, recommendedMcpToolTimeoutMs(validated.value.timeoutInputs));
				if (!desired.ok) throw desired.error;
				return desired.value;
			}
			const validated = await clientRegistrationEnvironmentDetailsWithBudget(effective, client, providerEnvironment, "effective", client.name === "codex" || client.name === "kimi" ? resolveProviderRequestBudget : undefined, platform);
			if (!validated.ok) throw validated.error;
			const environment = clientRegistrationEnvironment(parsed, client, platform, providerEnvironment, "fragment");
			if (!environment.ok) throw environment.error;
			const registration = refreshClientRegistration(client, format, launcher, environment.value, parsed === undefined ? undefined : effectiveClientServer(parsed, PRODUCT_IDENTITY.mcpServerKey), validated.value.timeoutInputs);
			if (!registration.ok) throw registration.error;
			return withInheritedGooseSettings(registration.value, format, client, parsed, sources, effective, providerEnvironment, platform);
		};
		GOOSE_INHERITABLE_SETTINGS = [
			"name",
			"description",
			"enabled",
			"timeout"
		];
		withInheritedGooseSettings = (withoutInherited, format, client, parsed, sources, effective, providerEnvironment, platform) => {
			if (format !== "goose") return withoutInherited;
			const lower = effectiveClientConfiguration(sources, {
				client,
				document: undefined
			}, platform);
			const declares = (document, keys) => {
				const entry = document === undefined ? undefined : effectiveClientServer(document, PRODUCT_IDENTITY.mcpServerKey);
				return typeof entry === "object" && entry !== null && keys.some((key) => Object.hasOwn(entry, key));
			};
			const spelled = (registration) => {
				if (!declares(lower, ["env"]) || !Object.hasOwn(registration, "envs")) return registration;
				const { envs, ...rest } = registration;
				return {
					...rest,
					env: envs
				};
			};
			const userDeclares = (keys) => declares(parsed, keys);
			const registration = Object.fromEntries(Object.entries(withoutInherited).filter(([key]) => !GOOSE_INHERITABLE_SETTINGS.includes(key) || userDeclares([key]) || !declares(lower, [key])));
			const environmentKeys = ["envs", "env"];
			if (userDeclares(environmentKeys) || !declares(lower, environmentKeys)) return spelled(registration);
			const { envs: _generated, ...rest } = registration;
			if (Object.keys(providerEnvironment).length === 0) return rest;
			const inherited = clientRegistrationEnvironment(effective, client, platform, providerEnvironment, "fragment");
			if (!inherited.ok) throw inherited.error;
			return spelled({
				...rest,
				envs: { ...inherited.value }
			});
		};
	})))();
}

//#endregion
export { ClientConfigurationCleanupRollbackFailure, clientConfigurationAligned, clientRefreshRefusal, configureClientConfiguration, init_SetupClientConfiguration, inspectClientConfiguration };