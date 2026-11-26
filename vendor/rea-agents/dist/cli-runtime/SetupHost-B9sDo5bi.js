import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisOutputError, ConfigurationError, SUPPORTED_NODE_VERSION_PROSE, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_configurationErrors, init_errorMessage, init_runtimeVersion, supportsNodeVersion } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, appendCallerPath, compareUnicodeCodePoints, init_callerPath, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { CURRENT_ENTRYPOINT_PATH, init_CurrentEntrypointPath } from "./CurrentEntrypointPath-CMyQTNb_.js";
import { currentClientRegistrationCommand, init_ClientRegistrationIdentity } from "./ClientRegistrationIdentity-DNGzp3ks.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, init_AnalysisCleanupLease, init_ArtifactReader, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { bindRegularFileCleanup, init_RegularFileRead, regularFileCleanupLeases } from "./RegularFileRead-CRu2Ia6l.js";
import { init_ClientConfigurationCleanup, isClientConfigurationCleanupFailure, retryClientConfigurationCleanup } from "./ClientConfigurationPublication-DlZOzFmt.js";
import { appDataRedirection, clientEvidencePaths, init_MsixPackageStorage, init_SupportedClients, msixPackagesDirectory, packagePrivateLauncherBlocker, redirectedWriteBlocker, registrationPersistenceDetail, resolveSupportedClients } from "./SupportedClients-C1oeYZNH.js";
import { analysisProviderSelectorSchema, init_providerSelection } from "./urlComponents-DJm-wtqY.js";
import { execFileOutput, execFileOutputFailure, init_ExecFileOutput } from "./ExecFileOutput-YDVPmL3I.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { decodeInfoPlistValue, init_AppBundleExecutable, init_infoPlist, readBundleInfoPlist } from "./AppBundleExecutable-BZSToRs7.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { OwnedCommandFailure, init_OwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_OwnedCommandCleanup, processInspectionCancellationError, retainProcessInspectionCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { SetupSkillInstallError, canonicalSkillNeedsInstall, init_SetupSkill, installCanonicalSkill, skillDestinations, validateCanonicalSkillDirectories } from "./SetupSkill-C0Ili3Va.js";
import { BUILD_COMPUTER_SETTINGS, init_buildComputerSettings } from "./buildComputerSettings-CBkm3nxB.js";
import { DESKTOP_EXPORT_FRAMEWORK_VERSION, init_appExport } from "./appExport-CjCA74-5.js";
import { init_Doctor, init_macosVersion, macosMajorVersion, macosVersionMeetsMinimum, runDoctor, systemDoctorHost } from "./Doctor-CrZFfEIG.js";
import { LINUX_HOPPER_SETUP_HOSTS, LinuxHopperTemporaryCleanupOwner, init_LinuxHopper, init_MacHopperPaths, installLinuxHopper, linuxHopperInstallDisclosure, macHopperUserApplicationPath, systemLinuxHopperInstallHost } from "./HopperLauncherDiscovery-CgQ1J_rv.js";
import { HOPPER_DOWNLOAD_PREFIX, HOPPER_LINUX_PRIMARY_FINGERPRINT, HOPPER_METADATA_TIMEOUT_MS, HOPPER_RELEASES_URL, describeHopperRequestFailure, downloadHopperPackage, hopperArchiveIntegrityMatches, hopperRequestRecovery, init_HopperDownload, init_HopperReleaseFeed, init_LinuxHopperCacheDirectory, linuxHopperReleaseCacheDirectory, macHopperReleaseMinimumSystemVersion, parseHopperReleaseJson, parseMacHopperReleases } from "./LinuxHopperCacheDirectory-CSy05laU.js";
import { explicitSetupRegistrationEnvironment, init_SetupRegistrationEnvironment, providerRegistrationEnvironment } from "./SetupRegistrationEnvironment-Z2gzconq.js";
import { HOPPER_PUBLISHER, init_MacCodeSignature, init_hopperPublisher, macDeveloperIdRequirement } from "./MacCodeSignature-MgYbRK_H.js";
import { ClientConfigurationCleanupRollbackFailure, clientConfigurationAligned, configureClientConfiguration, init_SetupClientConfiguration, inspectClientConfiguration } from "./SetupClientConfiguration-BUsisgiN.js";
import { agentEnvReportedVersion, buildComputerArchiveDirectory, defaultBuildComputerArchive, init_BuildComputerEnvironment, programOnPath } from "./BuildComputerEnvironment-V50CmKer.js";
import { basename, dirname, isAbsolute, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";
import { access, mkdir, mkdtemp, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { execFile } from "node:child_process";

//#region dist/application/MacHopper.js
var execFileAsync, HOPPER_PUBLISHER_REQUIREMENT, macHopperInstallDisclosure, installMacHopper, installMacHopperBundle, systemMacHopperInstallHost, macHopperHostVersionDetail, macHopperIncomparableMinimumDetail, minimumSystemVersionSchema, commandSucceeds, failureMessage, isMissingPath, pathExists;
function init_MacHopper() {
	return (init_MacHopper = __esmMin((() => {
		init_callerPath();
		init_hopperPublisher();
		init_MacCodeSignature();
		init_MacHopperPaths();
		init_HopperDownload();
		init_SignalAbort();
		init_HopperReleaseFeed();
		init_RegularFileRead();
		init_AppBundleExecutable();
		init_infoPlist();
		init_macosVersion();
		execFileAsync = promisify(execFile);
		HOPPER_PUBLISHER_REQUIREMENT = macDeveloperIdRequirement(HOPPER_PUBLISHER.bundleIdentifier, HOPPER_PUBLISHER.teamIdentifier);
		macHopperInstallDisclosure = {
			detail: "Download the official Hopper package, verify it, and install it. Before the download, and again from the signed app before copying, setup compares the release's minimum macOS version with this Mac's and stops if this Mac is older. Hopper may show its demo or license prompt when first opened.",
			networkOrigins: [HOPPER_RELEASES_URL, HOPPER_DOWNLOAD_PREFIX],
			commands: [
				"hdiutil attach -readonly -nobrowse -mountpoint <private-mount> <verified-hopper.dmg>",
				"codesign --verify --deep --strict <mounted-hopper.app>",
				`codesign --verify --strict '-R${HOPPER_PUBLISHER_REQUIREMENT}' <mounted-hopper.app>`,
				"ditto <mounted-hopper.app> <user-Applications-stage>",
				"open <installed-hopper.app>"
			]
		};
		installMacHopper = async (options, host) => {
			const cancellation = options.signal === undefined ? {} : { signal: options.signal };
			const hostVersion = await host.macosVersion();
			if (hostVersion === undefined || macosMajorVersion(hostVersion) === undefined) return {
				status: "failed",
				reason: "unsupported_host"
			};
			let temporary;
			let mounted = false;
			let bundleCleanupFailure;
			let installStage = "release_metadata";
			let result;
			try {
				result = await (async () => {
					const metadata = await host.download(HOPPER_RELEASES_URL, {
						timeoutMs: HOPPER_METADATA_TIMEOUT_MS,
						...cancellation
					});
					if (!metadata.ok) return {
						status: "failed",
						reason: "release_metadata",
						download: {
							request: "release_feed",
							...metadata.error
						}
					};
					const decoded = parseHopperReleaseJson(metadata.value);
					if (!decoded.ok) throw decoded.cause;
					const parsed = parseMacHopperReleases(decoded.value);
					if (!parsed.ok) return {
						status: "failed",
						reason: "release_metadata"
					};
					const release = parsed.value;
					const releaseMinimum = macHopperReleaseMinimumSystemVersion(release);
					if (releaseMinimum !== undefined && macosVersionMeetsMinimum(hostVersion, releaseMinimum) === false) return {
						status: "failed",
						reason: "incompatible_host_version",
						diagnostic: macHopperHostVersionDetail({
							source: "release_feed",
							packageUrl: release.filename,
							minimumVersion: releaseMinimum,
							hostVersion
						})
					};
					installStage = "download";
					const archive = await host.download(release.filename, cancellation);
					if (!archive.ok) return {
						status: "failed",
						reason: "download",
						download: {
							request: "package",
							...archive.error
						}
					};
					installStage = "integrity";
					if (!hopperArchiveIntegrityMatches(archive.value, release)) return {
						status: "failed",
						reason: "integrity"
					};
					installStage = "destination_inspection";
					const destination = host.destination();
					const destinationExists = await host.destinationExists(destination);
					if (destinationExists && options.replaceExisting !== true) return {
						status: "failed",
						reason: "destination_exists"
					};
					options.signal?.throwIfAborted();
					installStage = "mount";
					temporary = await host.createTemporaryDirectory();
					const packagePath = posix.join(temporary, "hopper.dmg");
					const mountPath = posix.join(temporary, "mounted");
					await host.createMountDirectory(mountPath);
					await host.writePackage(packagePath, archive.value);
					if (!await host.mount(packagePath, mountPath)) return {
						status: "failed",
						reason: "mount"
					};
					mounted = true;
					installStage = "bundle";
					const source = await host.appBundle(mountPath);
					if (source === undefined) return {
						status: "failed",
						reason: "bundle"
					};
					const verification = await host.validBundle(source);
					if (verification === "invalid_signature") return {
						status: "failed",
						reason: "bundle"
					};
					if (verification === "unverified_publisher") return {
						status: "failed",
						reason: "publisher_verification_failed"
					};
					const appMinimum = await host.minimumSystemVersion(source);
					if (appMinimum !== undefined) {
						const compatible = macosVersionMeetsMinimum(hostVersion, appMinimum);
						if (compatible === false) return {
							status: "failed",
							reason: "incompatible_host_version",
							diagnostic: macHopperHostVersionDetail({
								source: "signed_app",
								minimumVersion: appMinimum,
								hostVersion
							})
						};
						if (compatible === undefined) return {
							status: "failed",
							reason: "bundle",
							diagnostic: macHopperIncomparableMinimumDetail(appMinimum, hostVersion)
						};
					}
					options.signal?.throwIfAborted();
					installStage = "copy";
					const installation = await host.installBundle(source, destination, destinationExists);
					if (installation.status === "failed") return {
						status: "failed",
						reason: installation.reason,
						diagnostic: installation.diagnostic,
						...installation.cleanupFailure === undefined ? {} : { cleanupFailure: installation.cleanupFailure }
					};
					bundleCleanupFailure = installation.cleanupFailure;
					const launcherPath = appendCallerPath(destination, "Contents/MacOS/hopper", "darwin");
					let openFailure;
					if (options.signal?.aborted === true) openFailure = "Setup was cancelled before Hopper was opened";
					else try {
						await host.openApplication(destination);
					} catch (cause) {
						openFailure = failureMessage(cause);
					}
					return {
						status: "installed",
						launcherPath,
						...openFailure === undefined ? {} : { openFailure }
					};
				})();
			} catch (cause) {
				result = {
					status: "failed",
					reason: isAbortOf(cause, options.signal) ? "cancelled" : installStage,
					diagnostic: failureMessage(cause)
				};
			}
			let cleanupFailure;
			if (temporary !== undefined) {
				const temporaryPath = temporary;
				const mountPath = posix.join(temporary, "mounted");
				const cleanup = async () => {
					if (mounted) {
						await host.unmount(mountPath);
						mounted = false;
					}
					await host.cleanup(temporaryPath);
				};
				try {
					await cleanup();
				} catch (cause) {
					cleanupFailure = `Hopper DMG cleanup failed: ${failureMessage(cause)}`;
					host.retainCleanup?.(cleanup, [temporaryPath]);
				}
			}
			const retainedCleanupFailure = [
				bundleCleanupFailure,
				cleanupFailure,
				result.cleanupFailure
			].filter((failure) => failure !== undefined).join(" ");
			return retainedCleanupFailure === "" ? result : {
				...result,
				cleanupFailure: retainedCleanupFailure
			};
		};
		installMacHopperBundle = async (source, destination, replaceExisting, operations, retainCleanup) => {
			const stagingRoot = await operations.createStagingRoot(posix.dirname(destination));
			const stagedBundle = appendCallerPath(stagingRoot, "new.app", "darwin");
			const previousBundle = appendCallerPath(stagingRoot, "previous.app", "darwin");
			let originalBackedUp = false;
			let newCommitted = false;
			let failureReason = "copy";
			try {
				await operations.copyBundle(source, stagedBundle);
				failureReason = "launcher_missing";
				await operations.requireLauncher(appendCallerPath(stagedBundle, "Contents/MacOS/hopper", "darwin"));
				failureReason = "copy";
				if (replaceExisting) {
					await operations.rename(destination, previousBundle);
					originalBackedUp = true;
				}
				await operations.rename(stagedBundle, destination);
				newCommitted = true;
			} catch (cause) {
				const diagnostics = [failureMessage(cause)];
				if (originalBackedUp && !newCommitted) {
					try {
						if (await operations.pathExists(destination)) throw new Error("destination now contains another installation; preserving the previous bundle in its owned staging root");
						await operations.rename(previousBundle, destination);
						originalBackedUp = false;
					} catch (rollbackCause) {
						diagnostics.push(`rollback failed: ${failureMessage(rollbackCause)}`);
						const cleanupFailure = `The previous Hopper bundle remains owned at ${previousBundle}; cleanup will retry restoration only if the destination is empty.`;
						retainCleanup(async () => {
							if (originalBackedUp) {
								if (await operations.pathExists(destination)) throw new Error(`Hopper destination is occupied; preserving owned backup ${previousBundle}`);
								await operations.rename(previousBundle, destination);
								originalBackedUp = false;
							}
							await operations.removeStagingRoot(stagingRoot);
						}, [stagingRoot]);
						return {
							status: "failed",
							reason: failureReason,
							diagnostic: diagnostics.join("; "),
							cleanupFailure
						};
					}
				}
				try {
					await operations.removeStagingRoot(stagingRoot);
				} catch (cleanupCause) {
					const cleanupFailure = `Hopper staging root cleanup failed: ${failureMessage(cleanupCause)}`;
					retainCleanup(() => operations.removeStagingRoot(stagingRoot), [stagingRoot]);
					diagnostics.push(cleanupFailure);
					return {
						status: "failed",
						reason: failureReason,
						diagnostic: diagnostics.join("; "),
						cleanupFailure
					};
				}
				return {
					status: "failed",
					reason: failureReason,
					diagnostic: diagnostics.join("; ")
				};
			}
			try {
				await operations.removeStagingRoot(stagingRoot);
				return { status: "installed" };
			} catch (cause) {
				const cleanupFailure = `Hopper staging root cleanup failed after installation committed: ${failureMessage(cause)}`;
				retainCleanup(() => operations.removeStagingRoot(stagingRoot), [stagingRoot]);
				return {
					status: "installed",
					cleanupFailure
				};
			}
		};
		systemMacHopperInstallHost = (homeDirectory, environment, macosVersion) => {
			const pendingCleanup = new Map();
			return {
				download: downloadHopperPackage,
				createTemporaryDirectory: () => mkdtemp(join(tmpdir(), "rea-hopper-mac-")),
				createMountDirectory: (path) => mkdir(path),
				writePackage: (path, bytes) => writeFile(path, bytes, { mode: 384 }),
				async mount(packagePath, mountPath) {
					await execFileAsync("hdiutil", [
						"attach",
						"-readonly",
						"-nobrowse",
						"-mountpoint",
						mountPath,
						packagePath
					], { env: environment });
					return true;
				},
				async unmount(mountPath) {
					await execFileAsync("hdiutil", [
						"detach",
						mountPath,
						"-force"
					], { env: environment });
				},
				async appBundle(mountPath) {
					const entries = await readdir(mountPath, { withFileTypes: true });
					const app = entries.find((entry) => entry.isDirectory() && /^Hopper.*\.app$/iu.test(entry.name));
					return app === undefined ? undefined : posix.join(mountPath, app.name);
				},
				async validBundle(appPath) {
					if (!await commandSucceeds("codesign", [
						"--verify",
						"--deep",
						"--strict",
						appPath
					], environment)) return "invalid_signature";
					if (!await commandSucceeds("codesign", [
						"--verify",
						"--strict",
						`-R${HOPPER_PUBLISHER_REQUIREMENT}`,
						appPath
					], environment)) return "unverified_publisher";
					return "verified";
				},
				macosVersion,
				async minimumSystemVersion(appPath) {
					const plist = posix.join(appPath, "Contents", "Info.plist");
					let bytes;
					try {
						bytes = await readBundleInfoPlist(plist);
					} catch (cause) {
						for (const lease of regularFileCleanupLeases(cause) ?? []) pendingCleanup.set(() => lease.release(), lease.cleanupResources ?? [plist]);
						throw cause;
					}
					const declared = minimumSystemVersionSchema.safeParse(decodeInfoPlistValue(bytes, ["LSMinimumSystemVersion"]));
					if (!declared.success) throw new TypeError(`${plist} does not declare LSMinimumSystemVersion as text`);
					return declared.data.LSMinimumSystemVersion;
				},
				async destinationExists(path) {
					try {
						await access(path);
						return true;
					} catch (cause) {
						if (isMissingPath(cause)) return false;
						throw cause;
					}
				},
				installBundle: (source, destination, replaceExisting) => installMacHopperBundle(source, destination, replaceExisting, {
					async createStagingRoot(parent) {
						await mkdir(parent, { recursive: true });
						return mkdtemp(appendCallerPath(parent, ".rea-hopper-stage-", "darwin"));
					},
					copyBundle: async (bundle, staged) => {
						await execFileAsync("ditto", [bundle, staged], { env: environment });
					},
					requireLauncher: (path) => access(path).then(() => undefined),
					pathExists,
					rename,
					removeStagingRoot: (path) => rm(path, { recursive: true })
				}, (cleanup, resources) => pendingCleanup.set(cleanup, resources)),
				async openApplication(path) {
					await execFileAsync("open", [path], { env: environment });
				},
				cleanup: (path) => rm(path, {
					recursive: true,
					force: true
				}),
				retainCleanup: (cleanup, resources) => pendingCleanup.set(cleanup, resources),
				async close() {
					const failures = [];
					for (const cleanup of pendingCleanup.keys()) {
						try {
							await cleanup();
							pendingCleanup.delete(cleanup);
						} catch (cause) {
							failures.push(failureMessage(cause));
						}
					}
					return failures.length === 0 ? undefined : {
						reason: `Hopper installer cleanup remains incomplete: ${failures.join("; ")}`,
						resources: [...new Set([...pendingCleanup.values()].flat())]
					};
				},
				destination: () => macHopperUserApplicationPath(homeDirectory)
			};
		};
		macHopperHostVersionDetail = (refusal) => refusal.source === "release_feed" ? `The current Hopper release (${refusal.packageUrl}) declares deployment_target ${refusal.minimumVersion}; this Mac runs macOS ${refusal.hostVersion}. The package was not downloaded.` : `The signed Hopper application declares LSMinimumSystemVersion ${refusal.minimumVersion}; this Mac runs macOS ${refusal.hostVersion}. Nothing was copied.`;
		macHopperIncomparableMinimumDetail = (declared, hostVersion) => `The signed Hopper application declares LSMinimumSystemVersion ${JSON.stringify(declared)}, which REA cannot compare with macOS ${hostVersion}. Nothing was copied.`;
		minimumSystemVersionSchema = z.looseObject({ LSMinimumSystemVersion: z.string().optional() });
		commandSucceeds = async (command, args, environment) => {
			try {
				await execFileAsync(command, args, { env: environment });
				return true;
			} catch (cause) {
				if (typeof cause === "object" && cause !== null && "code" in cause && typeof cause.code === "number") return false;
				throw cause;
			}
		};
		failureMessage = (cause) => cause instanceof Error ? [cause.message, "stderr" in cause && typeof cause.stderr === "string" ? cause.stderr.trim() : ""].filter((value) => value !== "").join(": ") : String(cause);
		isMissingPath = (cause) => typeof cause === "object" && cause !== null && "code" in cause && cause.code === "ENOENT";
		pathExists = async (path) => {
			try {
				await access(path);
				return true;
			} catch (cause) {
				if (isMissingPath(cause)) return false;
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/application/SetupPlan.js
var discoverSetupState, planSetupActions, inspectSelectedClients, clientEnvironment, plannedClientWrites, setupPlan, linuxDisclosure, hopperInstallRefusal, hopperInstallEligibility, clientConfigurationDetail;
function init_SetupPlan() {
	return (init_SetupPlan = __esmMin((() => {
		init_SetupSkill();
		init_LinuxHopper();
		init_MacHopper();
		init_MacHopperPaths();
		init_SupportedClients();
		init_MsixPackageStorage();
		init_unicodeCodePointOrder();
		init_macosVersion();
		discoverSetupState = async (input) => {
			const { initialDoctor } = input;
			const linuxHopperRepairNeeded = input.hopperLauncherConfigured !== true && initialDoctor.checks.some(({ name, ok, detail }) => !ok && (name === "hopper-demo-runtime" || name === "hopper-version" && detail === "/opt/hopper/bin/Hopper"));
			const linuxDistribution = input.host.platform === "linux" ? await input.host.linuxDistribution() : undefined;
			const hopperInstall = hopperInstallEligibility(input.host.platform, input.host.platform === "darwin" ? await input.host.macosVersion() : undefined, linuxDistribution);
			const installHopper = input.forceHopperInstall || hopperInstall.supported !== false && input.proposeHopper && (!input.providerConfigured || linuxHopperRepairNeeded);
			const [clients, detectedClients] = await Promise.all([input.host.supportedClients(), input.host.detectedClients()]);
			const detectedIds = new Set(detectedClients.map(({ name }) => name));
			const registrations = initialDoctor.identity?.registrations ?? [];
			const registrationByClient = new Map(registrations.map((registration) => [registration.client, registration]));
			const clientStates = clients.map((client) => {
				const registration = registrationByClient.get(client.name);
				const commandIdentity = registration?.command_identity;
				const ownedRegistration = (registration?.state === "aligned" || registration?.state === "stale") && commandIdentity === "owned";
				const configured = ownedRegistration;
				const status = registration?.state === "invalid" ? "invalid" : registration?.state === "unknown" || (registration?.state === "aligned" || registration?.state === "stale") && commandIdentity === "unknown" ? "unknown" : ownedRegistration && registration.state === "aligned" ? "configured" : ownedRegistration && registration.state === "stale" ? "needs_configuration" : detectedIds.has(client.name) ? "needs_configuration" : "missing";
				return {
					client,
					detected: detectedIds.has(client.name),
					configured,
					status
				};
			});
			const defaultClientIds = registrations.filter((registration) => (registration.state === "aligned" || registration.state === "stale") && registration.command_identity === "owned").map(({ client }) => client);
			return {
				initialDoctor,
				installHopper,
				hopperInstall,
				clients,
				detectedClientIds: detectedClients.filter(({ format }) => format !== "unsupported").map(({ name }) => name),
				defaultClientIds,
				clientStates,
				...linuxDistribution?.packageFamily === undefined ? {} : { linuxPackageFamily: linuxDistribution.packageFamily }
			};
		};
		planSetupActions = async (input) => {
			const byId = new Map(input.discovery.clients.map((client) => [client.name, client]));
			const unknownClient = input.clientIds.find((id) => !byId.has(id));
			if (unknownClient !== undefined) {
				return {
					plannedActions: [],
					selectedClients: [],
					clientsToConfigure: [],
					blocker: `Unsupported setup client: ${unknownClient}.`
				};
			}
			const selectedClients = input.clientIds.flatMap((id) => {
				const client = byId.get(id);
				return client === undefined ? [] : [client];
			});
			const hopperCache = input.host.linuxHopperReleaseCache;
			if (input.discovery.installHopper && hopperCache?.ok === false) return {
				plannedActions: [],
				selectedClients,
				clientsToConfigure: [],
				blocker: hopperCache.error.message
			};
			if (selectedClients.length > 0 && input.host.registrationCommandBlocker !== undefined) return {
				plannedActions: [],
				selectedClients,
				clientsToConfigure: [],
				blocker: input.host.registrationCommandBlocker
			};
			const inspections = await inspectSelectedClients(input, selectedClients);
			if ("blocker" in inspections) return {
				plannedActions: [],
				selectedClients,
				clientsToConfigure: [],
				blocker: inspections.blocker
			};
			let skillDestinations = [];
			try {
				if (input.installSkill) skillDestinations = input.host.skillDestinations(input.skillClientIds);
			} catch (cause) {
				if (!(cause instanceof SetupSkillInstallError)) throw cause;
				return {
					plannedActions: [],
					selectedClients,
					clientsToConfigure: [],
					blocker: cause.remediation
				};
			}
			const clientPlans = plannedClientWrites(inspections, input.discovery.installHopper);
			const plannedActions = setupPlan({
				platform: input.host.platform,
				homeDirectory: input.host.homeDirectory,
				...hopperCache?.ok === true ? { hopperCacheDirectory: hopperCache.value } : {},
				installHopper: input.discovery.installHopper,
				installSkill: input.installSkill,
				skillClientIds: input.skillClientIds,
				skillDestinations,
				clients: clientPlans,
				providerEnvironment: input.providerEnvironment,
				clientEnvironments: input.clientEnvironments,
				...input.discovery.linuxPackageFamily === undefined ? {} : { linuxPackageFamily: input.discovery.linuxPackageFamily },
				command: input.command
			});
			const blocker = (clientPlans.length > 0 ? input.host.registrationCommandBlocker : undefined) ?? redirectedWriteBlocker(appDataRedirection(input.discovery.clients), plannedActions.filter(({ kind }) => kind !== "install_hopper").map(({ target }) => target), "setup");
			return {
				plannedActions,
				selectedClients,
				clientsToConfigure: selectedClients.filter((client) => clientPlans.some(({ client: planned }) => planned.name === client.name)),
				...blocker === undefined ? {} : { blocker }
			};
		};
		inspectSelectedClients = async (input, selectedClients) => {
			const inspections = await Promise.all(selectedClients.map(async (client) => ({
				client,
				inspection: await input.host.inspectClientConfiguration(client, clientEnvironment(input, client.name), input.command)
			})));
			const invalid = inspections.find(({ inspection }) => inspection.status === "invalid");
			return invalid?.inspection.status === "invalid" ? { blocker: `${invalid.client.displayName ?? invalid.client.name}: ${invalid.inspection.remediation}` } : inspections;
		};
		clientEnvironment = (input, client) => ({
			...input.providerEnvironment,
			...input.clientEnvironments?.[client]
		});
		plannedClientWrites = (inspections, installHopper) => inspections.flatMap(({ client, inspection }) => client.format !== "unsupported" && (inspection.status === "create" || inspection.status === "update" || installHopper && inspection.status === "already_current") ? [{
			client,
			operation: inspection.status === "already_current" ? "update" : inspection.status,
			...inspection.status !== "already_current" && inspection.backupPath !== undefined ? { backupPath: inspection.backupPath } : {}
		}] : []);
		setupPlan = (input) => [
			...input.installHopper ? [{
				id: "install_hopper",
				kind: "install_hopper",
				label: "Hopper deep-analysis provider",
				target: input.platform === "darwin" ? macHopperUserApplicationPath(input.homeDirectory) : "system package manager",
				detail: input.platform === "linux" ? `Download the current official Hopper demo, verify its PGP publisher and launcher bytes, and retain archive, public-key.asc and release.json under ${input.hopperCacheDirectory ?? `${input.homeDirectory}/.cache/rea/hopper-releases`}/<launcher-sha256> for offline verification. Preserve replaced damaged evidence beside it as <launcher-sha256>.backup-<id>. Install Hopper plus its Xvfb demo-session dependencies${input.linuxPackageFamily === "deb" ? ", including the shared library matching the distribution Python interpreter" : ""}. REA uses a private display and selects Hopper's offered demo mode for each analysis session.` : macHopperInstallDisclosure.detail,
				external: true,
				operation: "install",
				...input.platform === "linux" ? input.linuxPackageFamily === undefined ? {} : linuxDisclosure(input.linuxPackageFamily) : {
					networkOrigins: macHopperInstallDisclosure.networkOrigins,
					commands: macHopperInstallDisclosure.commands
				}
			}] : [],
			...input.clients.filter(({ client }) => client.format !== "unsupported").map(({ client, operation, backupPath }) => ({
				id: `configure_client:${client.name}`,
				kind: "configure_client",
				label: client.displayName ?? client.name,
				target: client.configPath,
				detail: clientConfigurationDetail(client, input.command, clientEnvironment(input, client.name), input.installHopper),
				external: false,
				operation,
				...backupPath === undefined ? {} : { backupPath }
			})),
			...input.installSkill ? input.skillDestinations.map(({ client, path }) => ({
				id: client === "shared" ? "install_skill" : `install_skill:${client}`,
				kind: "install_skill",
				label: client === "claude_code" ? "REA skill for Claude Code" : "REA reverse-engineering skill",
				target: path,
				detail: client === "claude_code" ? "Install or update the REA skill in Claude Code's personal skill directory." : "Install or update the bundled REA reverse-engineering skill and on-demand references.",
				external: false,
				operation: "install"
			})) : []
		];
		linuxDisclosure = (family) => {
			const disclosure = linuxHopperInstallDisclosure(family, process.getuid?.() === 0);
			return {
				networkOrigins: disclosure.networkOrigins,
				commands: disclosure.commands,
				integrity: disclosure.integrity
			};
		};
		hopperInstallRefusal = (discovery) => discovery.installHopper && discovery.hopperInstall.supported === false ? discovery.hopperInstall.remediation : undefined;
		hopperInstallEligibility = (platform, macosVersion, linuxDistribution) => {
			if (platform === "darwin") {
				const major = macosMajorVersion(macosVersion);
				return major !== undefined && major >= 12 ? { supported: "unknown" } : {
					supported: false,
					remediation: "Upgrade to macOS 12 or newer."
				};
			}
			if (platform === "linux") return linuxDistribution?.hopperSetupSupported === true ? { supported: true } : {
				supported: false,
				remediation: `Automated Hopper setup requires ${LINUX_HOPPER_SETUP_HOSTS}; configure an existing supported provider instead.`
			};
			return {
				supported: false,
				remediation: "REA supports Hopper on macOS and selected x86_64 Linux distributions."
			};
		};
		clientConfigurationDetail = (client, command, environment, installHopper) => {
			const entries = Object.entries(environment).sort(([left], [right]) => compareUnicodeCodePoints(left, right)).map(([name, value]) => `${name}=${value}`);
			const environmentDetail = entries.length === 0 ? " No additional provider environment variables. Existing server environment overrides are retained." : ` Detected provider environment: ${entries.join(", ")}. Existing server environment overrides are retained; detected values replace matching keys.`;
			const hopperDetail = installHopper ? environment.HOPPER_LAUNCHER_PATH === undefined ? " If this plan installs Hopper, REA will add HOPPER_LAUNCHER_PATH using the launcher path reported by that installation." : " The HOPPER_LAUNCHER_PATH value shown above is the current fallback; if this plan installs Hopper, REA will replace it with the launcher path reported by that installation." : "";
			const persistence = registrationPersistenceDetail(client);
			const privateProfile = client.privateProfile === undefined ? "" : ` The profile is private: REA sets its folder ${dirname(client.configPath)} to mode 0700 and the file to 0600.`;
			return `Add the REA MCP registration for ${client.displayName ?? client.name}; preserve unrelated configuration. The backup path reflects the configuration inspected for this plan; if that file changes before execution, setup will select a recovery path for its current contents. Command: ${command.map((part) => JSON.stringify(part)).join(" ")}.${environmentDetail}${hopperDetail}${privateProfile}${persistence === undefined ? "" : ` ${persistence}`}`;
		};
	})))();
}

//#endregion
//#region dist/domain/setupCancellation.js
var assertSetupActive;
function init_setupCancellation() {
	return (init_setupCancellation = __esmMin((() => {
		init_analysisErrorCore();
		assertSetupActive = (signal, failure) => {
			if (signal?.aborted) throw cancelledBy("setup", signal, failure === undefined ? {} : { diagnostics: { setup_failure: failure } });
		};
	})))();
}

//#endregion
//#region dist/application/SetupClients.js
var failedConfigurationMessage, configureDetectedClients;
function init_SetupClients() {
	return (init_SetupClients = __esmMin((() => {
		init_SetupPlan();
		init_setupCancellation();
		failedConfigurationMessage = (result) => {
			switch (result.reason) {
				case "registration_ownership":
				case "read_only_override": return result.detail;
				case "conflict": return "Agent configuration changed during setup. Review the current file and rerun setup.";
				case "target_changed": return "The client began reading a different configuration file after the plan was shown, so no change was made. Rerun setup to review the new target.";
				case "target_unavailable": return `The client configuration read target could not be established because ${result.failure.path} could not be inspected: ${result.failure.detail}. Repair access to that path, then rerun setup.`;
				case "path": return "Agent configuration path could not be safely verified. Check its permissions and, if it is a symbolic link, verify that the link resolves to a regular file owned by the current user, then rerun setup.";
				case "backup": return "Agent configuration could not be backed up, so no change was made. Check file permissions, then rerun setup.";
				case "write": {
					if (result.failure === undefined) return "Agent configuration could not be updated. Check file permissions, then rerun setup.";
					const failure = result.failure;
					const operation = failure.operation === "preserve_ownership" ? `preserve owner/group${failure.requestedOwnership === undefined ? "" : ` ${failure.requestedOwnership.uid}:${failure.requestedOwnership.gid}`}` : failure.operation.replaceAll("_", " ");
					const reason = failure.systemCode === undefined ? failure.detail : `${failure.systemCode}: ${failure.detail}`;
					const recovery = result.backupPath === undefined ? "" : ` The backup remains at ${result.backupPath}.`;
					return `Agent configuration could not ${operation} at ${failure.path}: ${reason}.${recovery} Review the reported operation and file ownership or permissions before rerunning setup.`;
				}
				case "shadowed_member": return `Agent configuration repeats the member at ${JSON.stringify(result.path)}; removing the member the client reads would activate an earlier duplicate, so no change was made. Remove the duplicate members, then rerun setup.`;
				case "rollback": return result.backupPath === undefined ? `Agent configuration rollback failed at ${result.failure.path}: ${result.failure.detail}; the failed first-run file may remain. Remove or repair it before rerunning setup.` : `Agent configuration rollback failed at ${result.failure.path}: ${result.failure.detail}. Inspect the preserved backup at ${result.backupPath} and restore the intended configuration, then rerun setup.`;
				case "readback": return result.backupPath === undefined ? "Agent configuration could not be verified. Repair the configuration file, then rerun setup." : `Agent configuration could not be verified after writing. The original was restored and its backup at ${result.backupPath} was retained. Repair the configuration file or restore that backup, then rerun setup.`;
			}
		};
		configureDetectedClients = async (options) => {
			let failure;
			for (const client of options.detectedClients) {
				assertSetupActive(options.signal);
				const actionId = `configure_client:${client.name}`;
				const label = client.displayName ?? client.name;
				options.onProgress?.({
					actionId,
					label,
					state: "started"
				});
				const result = await options.host.configureClient(client, clientEnvironment(options, client.name), options.command);
				options.clients[client.name] = result;
				if (result.status === "failed") {
					failure ??= failedConfigurationMessage(result);
					options.onProgress?.({
						actionId,
						label,
						state: "failed",
						detail: failedConfigurationMessage(result)
					});
				} else if (result.status === "configured") {
					options.appliedActions.push(`configured_${client.name}`);
					options.onProgress?.({
						actionId,
						label,
						state: "completed"
					});
				} else {
					options.onProgress?.({
						actionId,
						label,
						state: "warning",
						detail: result.status === "unchanged" ? "Already current" : "Manual configuration required"
					});
				}
				assertSetupActive(options.signal);
			}
			return failure;
		};
	})))();
}

//#endregion
//#region dist/application/SetupInstallFailure.js
var normalizePackageOutput, packageOutputExcerpt, packageManagerRemediation, setupInstallFailure, stageFailure;
function init_SetupInstallFailure() {
	return (init_SetupInstallFailure = __esmMin((() => {
		init_hopperPublisher();
		init_HopperDownload();
		init_HopperReleaseFeed();
		normalizePackageOutput = (output) => output.replace(/\u001b(?:\[[0-9;?]*[ -/]*[@-~]|\([0-9A-Za-z]|[@-Z\\^_])/gu, "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, "").replace(/\s+/gu, " ").trim();
		packageOutputExcerpt = (failure, limit = 400) => {
			const output = [failure.stderr, failure.stdout].map(normalizePackageOutput).filter((text) => text !== "").join(" ");
			const suffix = failure.outputTruncated ? " (output truncated)" : "";
			const bodyLimit = limit - suffix.length;
			if (output.length <= bodyLimit) return `${output}${suffix}`;
			const half = Math.floor((bodyLimit - 3) / 2);
			const head = output.slice(0, half).replace(/\s+\S*$/u, "").trimEnd();
			const tail = output.slice(-half).replace(/^\S*\s+/u, "").trimStart();
			return `${head} … ${tail}${suffix}`;
		};
		packageManagerRemediation = (failure) => {
			if (failure === undefined) return "Allow the system package-manager operation or install the planned Hopper package and Linux runtime dependencies, then rerun rea setup.";
			const status = failure.exitCode === null ? "no exit status" : `exit ${failure.exitCode}`;
			const excerpt = packageOutputExcerpt(failure);
			const observed = excerpt === "" ? "no output was captured." : `its output: ${excerpt}`;
			return `The system package-manager command failed (${failure.command}; ${status}); ${observed} Resolve the reported problem, grant the authorization the command needs, or install the planned Hopper package and Linux runtime dependencies manually, then rerun rea setup.`;
		};
		setupInstallFailure = (reason, context = {}) => {
			const failure = stageFailure(reason, context.packageFailure, context.platform ?? "darwin");
			return context.download === undefined ? failure : {
				...failure,
				remediation: `${describeHopperRequestFailure(context.download)} ${hopperRequestRecovery(context.download)}`,
				download: context.download
			};
		};
		stageFailure = (reason, packageFailure, platform) => {
			switch (reason) {
				case "unsupported_host": return {
					status: "failed",
					code: "unsupported_host",
					remediation: "Use a supported host, then rerun rea setup."
				};
				case "incompatible_host_version": return {
					status: "failed",
					code: "incompatible_host_version",
					remediation: "The current Hopper release requires a newer macOS version than this Mac runs, so REA did not install it. Update macOS to at least the version the installer detail names, or install a Hopper release that supports this macOS version yourself and set HOPPER_LAUNCHER_PATH to its launcher, then rerun rea setup."
				};
				case "integrity": return {
					status: "failed",
					code: "integrity_mismatch",
					remediation: "The Hopper download failed integrity verification. Retry setup; if it repeats, update REA before installing."
				};
				case "launcher_digest_mismatch": return {
					status: "failed",
					code: "integrity_mismatch",
					remediation: "The package signature verified, so the download is authentic, but the vendor release feed describes a different launcher build, so REA cannot identify this Hopper build and did not install it. Retrying setup or updating REA does not change the feed; report the mismatch to the Hopper vendor and rerun setup after the feed is corrected."
				};
				case "authorization_or_package_manager": return {
					status: "failed",
					code: "authorization_or_package_manager_failed",
					remediation: packageManagerRemediation(packageFailure)
				};
				case "launcher_missing": return {
					status: "failed",
					code: "launcher_missing",
					remediation: "The package operation completed but Hopper is not runnable. Run rea doctor and repair the reported launcher issue."
				};
				case "runtime_dependencies": return {
					status: "failed",
					code: "runtime_dependency_unavailable",
					remediation: "Hopper's required runtime could not be verified. Inspect rea doctor --provider hopper; on a supported system use rea setup --install-hopper to repair its dependencies."
				};
				case "unsupported_hopper_build": return {
					status: "failed",
					code: "unsupported_hopper_build",
					remediation: "The installed Hopper launcher does not match the authenticated vendor package. Check HOPPER_LAUNCHER_PATH and reinstall the official Hopper demo through rea setup."
				};
				case "cancelled": return {
					status: "failed",
					code: "setup_cancelled",
					remediation: "Setup was cancelled. Run rea doctor to inspect the current state before retrying."
				};
				case "destination_inspection": return {
					status: "failed",
					code: "destination_inspection_failed",
					remediation: "REA could not inspect the Hopper installation destination. Check access to the reported path before retrying; an existing installation has not been established."
				};
				case "archive_write": return {
					status: "failed",
					code: "archive_write_failed",
					remediation: "The Hopper download completed, but REA could not stage its local archive. Check the reported path, permissions and free space, then retry setup."
				};
				case "launcher_inspection": return {
					status: "failed",
					code: "launcher_inspection_failed",
					remediation: "REA could not verify the installed Hopper launcher. Repair the reported inspection failure before retrying; launcher absence has not been established."
				};
				case "destination_exists": return {
					status: "failed",
					code: "destination_exists",
					remediation: "The Hopper installation destination already exists and was not replaced. Reuse the existing installation or move it aside, then rerun rea setup."
				};
				case "mount": return {
					status: "failed",
					code: "mount_failed",
					remediation: "The verified Hopper disk image could not be mounted. Eject any stale Hopper image, check local disk access, then rerun rea setup."
				};
				case "bundle": return {
					status: "failed",
					code: "bundle_invalid",
					remediation: "The mounted package did not contain the expected Hopper application bundle. Retry setup; if it repeats, update REA before installing."
				};
				case "publisher_verification_failed": return {
					status: "failed",
					code: "publisher_verification_failed",
					remediation: platform === "linux" ? `The Hopper package signature did not verify under the pinned primary PGP fingerprint ${HOPPER_LINUX_PRIMARY_FINGERPRINT}; the package manager was not run. Download the official package and retry setup.` : `The mounted Hopper application is not signed by the publisher REA pins (${HOPPER_PUBLISHER.bundleIdentifier}, Apple team ${HOPPER_PUBLISHER.teamIdentifier}); nothing was copied or launched. Install Hopper yourself and set HOPPER_LAUNCHER_PATH to its launcher, then rerun rea setup.`
				};
				case "verification_unavailable": return {
					status: "failed",
					code: "publisher_verification_failed",
					remediation: "REA could not authenticate or retain the signed Hopper package. Check vendor access, native package inspection tools and caller-owned cache permissions, then retry setup."
				};
				case "cleanup_failed": return {
					status: "failed",
					code: "cleanup_failed",
					remediation: "Hopper publisher verification retained temporary cleanup ownership. Retry cleanup before running setup again."
				};
				case "copy": return {
					status: "failed",
					code: "copy_failed",
					remediation: "The verified Hopper application could not be copied to the installation destination. Check destination permissions and free space, then rerun rea setup."
				};
				default: return {
					status: "failed",
					code: "download_failed",
					remediation: "REA could not download or unpack the official Hopper package. Check network and filesystem access, then retry setup."
				};
			}
		};
	})))();
}

//#endregion
//#region dist/application/SetupCleanupOwner.js
var setupCleanupReport, setupCleanupError, setupCleanupReason, SetupCleanupChild, SetupCleanupOwner;
function init_SetupCleanupOwner() {
	return (init_SetupCleanupOwner = __esmMin((() => {
		init_resources();
		init_analysisErrorBase();
		init_providerCleanupError();
		init_RegularFileRead();
		setupCleanupReport = (cause, observation) => new ProviderCleanupError("setup", observation.resources, { reason: observation.reason }, {
			cause,
			cleanup: observation,
			operation: "setup"
		});
		setupCleanupError = (cause, observation = ArtifactReaderFailure.cleanupObservation(cause, [])) => {
			if (cause instanceof AnalysisError && cause.carriesCleanup) return cause;
			const error = setupCleanupReport(cause, observation);
			bindRegularFileCleanup(cause, error);
			return error;
		};
		setupCleanupReason = (error) => error.cleanup?.reason ?? (typeof error.diagnostics?.reason === "string" ? error.diagnostics.reason : error.message);
		SetupCleanupChild = class {
			task;
			#generation = {};
			#attempted;
			#completed;
			#failure;
			#reportedErrors = new WeakSet();
			#delegated;
			#reason = "";
			#resources = [];
			#attempt = Promise.resolve();
			#lease = this.#newLease();
			constructor(task) {
				this.task = task;
			}
			admit() {
				this.#generation = {};
			}
			get hasNewGeneration() {
				return this.#attempted !== this.#generation;
			}
			get failure() {
				if (this.#failure !== undefined && !this.#failure.owner.cleanupIncomplete) {
					this.#completed = this.#attempted;
					this.#failure = undefined;
					this.#reportedErrors = new WeakSet();
				}
				return this.#failure === undefined ? undefined : {
					...this.#failure,
					reason: this.#reason
				};
			}
			close() {
				void this.failure;
				if (this.#completed === this.#generation) return Promise.resolve();
				if (this.#lease.released || this.#completed !== undefined) {
					this.#lease = this.#newLease();
					this.#completed = undefined;
					this.#delegated = undefined;
				}
				const generation = this.#generation;
				this.#attempted = generation;
				try {
					this.#attempt = this.task.close();
				} catch (cause) {
					this.#attempt = Promise.reject(cause);
				}
				return this.#lease.release().then(() => {
					this.#completed = generation;
				});
			}
			#newLease() {
				return new AnalysisCleanupLease(() => this.#execute(), this);
			}
			get cleanupResources() {
				return this.#resources;
			}
			async #execute() {
				let failure;
				try {
					const report = await this.#attempt;
					if (report === undefined) return;
					failure = report instanceof AnalysisError ? setupCleanupError(report) : setupCleanupError(undefined, typeof report === "string" ? {
						reason: report,
						resources: []
					} : report);
					this.#reason = setupCleanupReason(failure);
				} catch (cause) {
					failure = setupCleanupError(cause);
					this.#reason = (this.task.rejectedPrefix === undefined ? "" : this.task.rejectedPrefix + ": ") + setupCleanupReason(failure);
				}
				if (this.#failure !== undefined) this.#failure.cause = failure;
				let dependency = failure;
				if (failure.cleanupIncomplete && !failure.hasCleanupOwner) {
					this.#resources = [...failure.cleanupResources];
					if (this.#delegated === undefined) {
						this.#delegated = setupCleanupReport(failure, {
							reason: this.#reason,
							resources: this.#resources
						});
						new AnalysisCleanupLeaseGroup(this.#delegated, [this.#lease]);
					}
					dependency = this.#delegated;
				}
				if (dependency !== undefined && dependency.cleanupIncomplete) {
					if (!this.#reportedErrors.has(dependency)) {
						if (this.#failure === undefined || !this.#failure.owner.cleanupIncomplete) {
							this.#failure = {
								owner: setupCleanupReport(new AggregateError([dependency], "Setup child cleanup authorities"), {
									reason: this.#reason,
									resources: []
								}),
								cause: failure
							};
							this.#reportedErrors = new WeakSet();
						} else this.#failure.owner.retainSecondaryFailure(dependency);
						this.#failure.owner.bindCleanupDependencies([dependency]);
						this.#reportedErrors.add(dependency);
					}
				}
				if (failure.cleanupIncomplete) throw failure;
				if (this.#delegated?.cleanupIncomplete) throw this.#delegated;
			}
		};
		SetupCleanupOwner = class {
			#children;
			#closing;
			constructor(tasks) {
				this.#children = new Map(tasks.map((task) => [task, new SetupCleanupChild(task)]));
			}
			/** Admit actual new cleanup work, never merely another retry of a failed peer. */
			admit(task) {
				const child = this.#children.get(task);
				if (child === undefined) throw new TypeError("Cleanup task is not owned by this setup host");
				child.admit();
			}
			close() {
				if (this.#closing !== undefined) return this.#closing;
				const attempt = this.#attempt().finally(() => {
					if (this.#closing === attempt) this.#closing = undefined;
				});
				this.#closing = attempt;
				return attempt;
			}
			async #attempt() {
				const children = [...this.#children.values()];
				do {
					await Promise.allSettled(children.map((child) => child.close()));
				} while (children.some((child) => child.hasNewGeneration));
				const failures = children.flatMap((child) => {
					const failure = child.failure;
					return failure === undefined ? [] : [failure];
				});
				if (failures.length === 0) return undefined;
				const observation = {
					reason: failures.map((failure) => failure.reason).join("; "),
					resources: [...new Set(failures.flatMap((failure) => failure.owner.cleanupResources))]
				};
				const error = setupCleanupReport(new AggregateError(failures.map((failure) => failure.cause), "Setup child cleanup failures", { cause: new AggregateError(failures.map((failure) => failure.owner), "Setup cleanup ownership reports") }), observation).bindCleanupDependencies(failures.map((failure) => failure.owner));
				return error.cleanupIncomplete ? error : undefined;
			}
		};
	})))();
}

//#endregion
//#region dist/desktop/DesktopBuildOwnedCommand.js
var runDesktopBuildOwnedCommand, desktopBuildOwnedCommandReason;
function init_DesktopBuildOwnedCommand() {
	return (init_DesktopBuildOwnedCommand = __esmMin((() => {
		init_capturedProviderOutput();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCancellation();
		init_OwnedCommandCleanup();
		init_OwnedCommand();
		init_DarwinProcessRunTokenReader();
		init_analysisErrorCore();
		init_errorMessage();
		runDesktopBuildOwnedCommand = async (input) => {
			let retained = false;
			let cleanupReason;
			const paths = [input.partialPath, input.workspace].filter((path) => path !== undefined);
			const remainingPaths = new Set(paths);
			const removeOwnedPaths = async () => {
				const attempted = [...remainingPaths];
				const outcomes = await Promise.allSettled(attempted.map((path) => rm(path, {
					recursive: path === input.workspace,
					force: true
				})));
				outcomes.forEach((outcome, index) => {
					if (outcome.status === "fulfilled") remainingPaths.delete(attempted[index]);
				});
				const failures = outcomes.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
				if (failures.length > 0) throw new AggregateError(failures, "Could not remove setup command outputs");
			};
			try {
				await runOwnedCommand({
					command: input.command,
					arguments: input.arguments,
					runId: randomUUID(),
					expectedCommand: null,
					hostEnvironment: input.environment,
					sweepTokenOwnedProcesses: true
				}, {
					timeoutMs: input.timeoutMs,
					diagnosticBytes: input.maxOutputBytes
				}, {
					signal: input.signal,
					retainCleanup: (owner, result) => {
						retained = true;
						cleanupReason = result.reason;
						const process = `setup process ${owner.launch.ownership?.runId ?? "unknown"}`;
						let processPending = true;
						input.resources.retain({
							kind: "lease",
							resource: input.partialPath ?? `setup process ${owner.launch.ownership?.runId ?? "unknown"}`,
							lease: new AnalysisCleanupLease(async () => {
								if (processPending) {
									const stopped = await owner.stop();
									if (stopped.status === "incomplete") throw new Error(stopped.reason);
									processPending = false;
								}
								await removeOwnedPaths();
							}, { get cleanupResources() {
								return [...remainingPaths, ...processPending ? [process] : []];
							} })
						});
					}
				});
				if (retained) throw new Error(`Setup command cleanup incomplete: ${cleanupReason ?? "unknown reason"}`);
			} catch (cause) {
				let failure = cause;
				if (!retained && paths.length > 0) {
					try {
						await removeOwnedPaths();
					} catch (cleanup) {
						input.resources.retain({
							kind: "lease",
							resource: paths[0],
							lease: new AnalysisCleanupLease(removeOwnedPaths, { get cleanupResources() {
								return [...remainingPaths];
							} })
						});
						failure = new AggregateError([cause, cleanup], "Setup command failed and its partial output could not be removed");
					}
				}
				if (retained) failure = new Error(`${desktopBuildOwnedCommandReason(cause)}; cleanup is incomplete: ${cleanupReason ?? "unknown reason"}`, { cause });
				const command = cause instanceof OwnedCommandFailure ? cause : undefined;
				const preparation = command?.preparationFailure ?? cause;
				const output = command?.snapshot == null ? preparation instanceof DarwinProcessOwnershipInspectionError ? preparation.capturedOutput : undefined : capturedProviderOutput(command.snapshot);
				const reason = desktopBuildOwnedCommandReason(failure);
				const physical = failure instanceof AnalysisError ? failure : new AnalysisOutputError("setup", reason, {
					cause: failure,
					...command === undefined ? {} : { diagnostics: { command_failure: command.reason } },
					...output === undefined ? {} : { capturedOutput: output }
				});
				const inspectionCancellation = command === undefined || command.preparationFailure !== undefined ? processInspectionCancellationError(cause, "setup") : undefined;
				let primary = physical;
				if (command?.reason === "cancelled" && command.cancellation !== undefined) {
					primary = inspectionCancellation ?? cancelledBy("setup", carriedReason(command.cancellation.reason), {
						diagnostics: {
							setup_failure: reason,
							command_failure: command.reason
						},
						...output === undefined ? {} : { capturedOutput: output }
					});
					if (failure !== cause) primary.retainSecondaryFailure(physical);
				} else if (inspectionCancellation !== undefined) {
					primary = inspectionCancellation;
				}
				primary = command === undefined || command.preparationFailure !== undefined ? retainProcessInspectionCleanup(command?.preparationFailure ?? cause, primary, input.resources, "setup") : command.cancellation === undefined ? primary : analysisErrorWithCancellation(primary, cancelledBy("setup", carriedReason(command.cancellation.reason)));
				if (input.signal?.aborted) primary = analysisErrorWithCancellation(primary, cancelledBy("setup", input.signal));
				throw primary;
			}
		};
		desktopBuildOwnedCommandReason = (cause) => {
			const command = cause instanceof OwnedCommandFailure ? cause : undefined;
			const preparation = command?.preparationFailure ?? cause;
			const stderr = command?.snapshot?.stderr.text.trim() ?? (preparation instanceof DarwinProcessOwnershipInspectionError ? preparation.capturedOutput?.stderr.trim() : undefined) ?? "";
			const message = errorMessage(cause);
			return stderr === "" ? message : `${message}: ${stderr.slice(-2e3)}`;
		};
	})))();
}

//#endregion
//#region dist/desktop/DesktopBuildSetupHost.js
var PACK_SCRIPT, CHECKOUT_LOCKFILE, PROBE, PACK, INSTALL, ARCHIVE, exists$1, failureReason, systemDesktopBuildSetupHost, readSetupFacts, absoluteSettings, recordedSettings;
function init_DesktopBuildSetupHost() {
	return (init_DesktopBuildSetupHost = __esmMin((() => {
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_setupCancellation();
		init_callerPath();
		init_appExport();
		init_ExecFileOutput();
		init_BuildComputerEnvironment();
		init_buildComputerSettings();
		init_DesktopBuildOwnedCommand();
		init_errorMessage();
		PACK_SCRIPT = fileURLToPath(new URL("../../scripts/pack-build-computer-runtime.mjs", new URL("../desktop/DesktopBuildSetupHost.js", import.meta.url).href));
		CHECKOUT_LOCKFILE = fileURLToPath(new URL("../../package-lock.json", new URL("../desktop/DesktopBuildSetupHost.js", import.meta.url).href));
		PROBE = {
			timeout: 1e4,
			maxBuffer: 64 * 1024
		};
		PACK = {
			timeout: 30 * 6e4,
			maxBuffer: 16 * 1024 * 1024
		};
		INSTALL = {
			timeout: 10 * 6e4,
			maxBuffer: 4 * 1024 * 1024
		};
		ARCHIVE = "REA_BUILD_COMPUTER_REA_ARCHIVE";
		exists$1 = (path) => access(path).then(() => true, () => false);
		failureReason = (cause) => {
			const stderr = execFileOutputFailure(cause)?.stderr.trim() ?? "";
			const message = errorMessage(cause);
			return stderr === "" ? message : `${message}: ${stderr.slice(-2e3)}`;
		};
		systemDesktopBuildSetupHost = (environment, platform, registrations, resources) => {
			const run = (command, arguments_, limits, env = environment) => execFileOutput(command, arguments_, {
				...limits,
				env,
				stopSignal: "SIGTERM"
			});
			return {
				facts: (clientIds) => readSetupFacts({
					environment,
					platform,
					registrations,
					probe: (command, arguments_) => run(command, arguments_, PROBE)
				}, clientIds),
				async packRuntime(archive, signal) {
					const partial = join(dirname(archive), `.rea-${randomUUID()}.tar.xz`);
					let commandFinished = false;
					return resources.run(async () => {
						try {
							assertSetupActive(signal);
							await mkdir(dirname(archive), { recursive: true });
							const workspace = await mkdtemp(join(tmpdir(), "rea-desktop-pack-"));
							await runDesktopBuildOwnedCommand({
								command: process.execPath,
								arguments: [PACK_SCRIPT, partial],
								timeoutMs: PACK.timeout,
								maxOutputBytes: PACK.maxBuffer,
								resources,
								partialPath: partial,
								workspace,
								...signal === undefined ? {} : { signal },
								environment: {
									...environment,
									TMPDIR: workspace,
									TMP: workspace,
									TEMP: workspace,
									npm_config_loglevel: "error",
									npm_config_progress: "false",
									npm_config_fund: "false",
									npm_config_audit: "false"
								}
							});
							commandFinished = true;
							try {
								await rm(workspace, {
									recursive: true,
									force: true
								});
							} catch (cause) {
								resources.retain({
									kind: "lease",
									resource: workspace,
									lease: { release: () => rm(workspace, {
										recursive: true,
										force: true
									}) }
								});
								throw cause;
							}
							assertSetupActive(signal);
							await rename(partial, archive);
							return undefined;
						} catch (cause) {
							if (commandFinished) {
								try {
									await rm(partial, { force: true });
								} catch (cleanup) {
									const lease = new AnalysisCleanupLease(() => rm(partial, { force: true }), [partial]);
									resources.retain({
										kind: "lease",
										resource: partial,
										lease
									});
									if (cause instanceof AnalysisError) {
										const cleanupFailure = new ProviderCleanupError("rea-desktop", [partial], { reason: failureReason(cleanup) }, {
											operation: "setup",
											cause: cleanup
										});
										cleanupFailure.bindCleanupResourceOwner(lease);
										lease.bindCleanupError(cleanupFailure);
										throw analysisErrorWithCleanupDependencies(cause, cleanupFailure, "setup");
									}
									return `${desktopBuildOwnedCommandReason(cause)}; partial archive cleanup failed: ${failureReason(cleanup)}`;
								}
							}
							if (cause instanceof AnalysisError) throw cause;
							return desktopBuildOwnedCommandReason(cause);
						}
					});
				},
				async installAgentenv(uv, signal) {
					return resources.run(async () => {
						try {
							assertSetupActive(signal);
							await runDesktopBuildOwnedCommand({
								command: uv,
								arguments: [
									"tool",
									"install",
									`agentenv-framework==${DESKTOP_EXPORT_FRAMEWORK_VERSION}`
								],
								timeoutMs: INSTALL.timeout,
								maxOutputBytes: INSTALL.maxBuffer,
								resources,
								environment,
								...signal === undefined ? {} : { signal }
							});
							return undefined;
						} catch (cause) {
							if (cause instanceof AnalysisError) throw cause;
							return desktopBuildOwnedCommandReason(cause);
						}
					});
				}
			};
		};
		readSetupFacts = async (context, clientIds) => {
			const { environment, platform, probe } = context;
			const archive = defaultBuildComputerArchive(environment, platform);
			const selected = BUILD_COMPUTER_SETTINGS.filter((name) => (environment[name] ?? "") !== "");
			const settings = await absoluteSettings(environment, archive, platform);
			const agentEnv = settings.REA_AGENT_ENV_COMMAND;
			const uv = await programOnPath("uv", environment);
			const uvBin = uv === undefined ? undefined : await probe(uv, [
				"tool",
				"dir",
				"--bin"
			]).then(({ stdout }) => stdout.trim(), () => undefined);
			return {
				settings,
				selected,
				archive,
				archivePacked: await stat(archive).then((entry) => entry.isFile(), () => false),
				...await exists$1(PACK_SCRIPT) && await exists$1(CHECKOUT_LOCKFILE) ? {} : { packBlocker: "Packing REA's build-computer runtime needs a REA checkout: run rea setup --desktop-build from one (see docs/getting-started/installation.md#run-rea-from-a-checkout), or pack an archive yourself and set REA_BUILD_COMPUTER_REA_ARCHIVE." },
				...agentEnv === undefined ? {} : await probe(agentEnv, ["--version"]).then(({ stdout }) => ({ agentEnvVersion: agentEnvReportedVersion(stdout) }), () => ({})),
				...uv === undefined || uvBin === undefined || uvBin === "" ? {} : { uv: {
					path: uv,
					agentEnv: join(uvBin, "agent-env")
				} },
				recorded: await recordedSettings(context, clientIds, settings)
			};
		};
		absoluteSettings = async (environment, archive, platform) => {
			const settings = {};
			for (const [name, program] of [["REA_AGENT_ENV_COMMAND", "agent-env"], ["REA_DOCKER_COMMAND", "docker"]]) {
				const value = environment[name] ?? "";
				const path = value === "" ? await programOnPath(program, environment) : isAbsolute(value) ? value : await programOnPath(value, environment);
				if (path !== undefined) settings[name] = path;
			}
			const selectedArchive = environment[ARCHIVE] ?? "";
			settings[ARCHIVE] = selectedArchive === "" ? archive : absoluteCallerPath(selectedArchive, { platform });
			return settings;
		};
		recordedSettings = async ({ environment, platform, registrations }, clientIds, settings) => {
			if (registrations === undefined || clientIds.length === 0) return {};
			const directory = buildComputerArchiveDirectory(environment, platform);
			const setupArchive = (name, value) => name === ARCHIVE && value !== settings[ARCHIVE] && dirname(resolve(value)) === directory && /^rea-.+\.tar\.xz$/u.test(basename(value));
			const compared = {
				...Object.fromEntries(BUILD_COMPUTER_SETTINGS.map((name) => [name, ""])),
				...settings
			};
			const statuses = await registrations(clientIds, compared, setupArchive);
			const recorded = {};
			for (const status of statuses) {
				if (!clientIds.includes(status.client) || status.command.length === 0) continue;
				const gaps = status.provider_settings;
				const replaced = [...gaps?.unrecorded ?? [], ...gaps?.owned ?? []];
				recorded[status.client] = BUILD_COMPUTER_SETTINGS.filter((name) => !replaced.includes(name));
			}
			return recorded;
		};
	})))();
}

//#endregion
//#region dist/application/SetupHost.js
var SetupHost_exports = /* @__PURE__ */ __exportAll({
	detectClients: () => detectClients,
	filterClientsNeedingConfigure: () => filterClientsNeedingConfigure,
	hostRemediation: () => hostRemediation,
	systemSetupHost: () => systemSetupHost
});
var setupRegistration, filterClientsNeedingConfigure, hostRemediation, systemSetupHost, desktopBuildHost, setupInstallerDiagnostic, clientConfigurationOperations, runClientConfigurationOperation, configurationCleanupError, detectClients, clientEvidencePresent, exists;
function init_SetupHost() {
	return (init_SetupHost = __esmMin((() => {
		init_HostPlatform();
		init_ClientConfigurationCleanup();
		init_resources();
		init_configurationErrors();
		init_ClientRegistrationIdentity();
		init_runtimeVersion();
		init_Doctor();
		init_LinuxHopper();
		init_MacHopper();
		init_LinuxHopperCacheDirectory();
		init_SupportedClients();
		init_SetupSkill();
		init_SetupClientConfiguration();
		init_SetupClients();
		init_SetupInstallFailure();
		init_SetupRegistrationEnvironment();
		init_MsixPackageStorage();
		init_SetupCleanupOwner();
		init_RegularFileRead();
		init_CurrentEntrypointPath();
		init_providerSelection();
		init_DesktopBuildSetupHost();
		init_SetupPlan();
		init_errorMessage();
		setupRegistration = (platform, homeDirectory, environment) => {
			const registrationCommand = currentClientRegistrationCommand({
				platform,
				entrypointPath: CURRENT_ENTRYPOINT_PATH,
				environment
			});
			const registrationCommandBlocker = registrationCommand.length === 0 ? "REA could not determine the current executable entrypoint. Run setup through the installed REA CLI or a supported package runner before configuring clients." : platform === "win32" ? packagePrivateLauncherBlocker(registrationCommand, msixPackagesDirectory(homeDirectory, environment)) : undefined;
			return registrationCommandBlocker === undefined ? { registrationCommand } : {
				registrationCommand,
				registrationCommandBlocker
			};
		};
		filterClientsNeedingConfigure = async (host, detectedClients, environment, command) => {
			const needs = await Promise.all(detectedClients.map((client) => host.clientNeedsConfigure(client, clientEnvironment(environment, client.name), command)));
			return detectedClients.filter((_, index) => needs[index]);
		};
		hostRemediation = (host) => supportsNodeVersion(host.nodeVersion) ? undefined : `Install ${SUPPORTED_NODE_VERSION_PROSE} and rerun setup.`;
		systemSetupHost = (selectedDoctorHost = undefined, environment = process.env) => {
			const doctorHost = selectedDoctorHost ?? systemDoctorHost({ environment });
			const platform = doctorHost.platform;
			const { homeDirectory } = doctorHost;
			const macHopperHost = platform === "darwin" ? systemMacHopperInstallHost(homeDirectory, environment, () => doctorHost.macosVersion()) : undefined;
			const resources = new ArtifactResourceScope();
			const linuxDistribution = () => doctorHost.linuxDistribution();
			const linuxHopperHost = systemLinuxHopperInstallHost(environment, linuxDistribution);
			const pendingLinuxHopperCleanup = new LinuxHopperTemporaryCleanupOwner();
			const macCleanup = {
				rejectedPrefix: "Hopper host cleanup failed",
				close: async () => macHopperHost?.close?.()
			};
			const temporaryCleanup = {
				rejectedPrefix: "Linux Hopper cleanup retry failed",
				close: () => pendingLinuxHopperCleanup.retry(linuxHopperHost.cleanup)
			};
			const publisherCleanup = {
				rejectedPrefix: "Linux Hopper publisher cleanup failed",
				close: async () => {
					await linuxHopperHost.close?.();
				}
			};
			const registration = setupRegistration(platform, homeDirectory, environment);
			const cleanup = new SetupCleanupOwner([
				macCleanup,
				{
					rejectedPrefix: "Doctor host cleanup failed",
					close: async () => doctorHost.close?.()
				},
				temporaryCleanup,
				publisherCleanup,
				{ close: () => resources.close() }
			]);
			return {
				platform,
				homeDirectory,
				...platform === "linux" ? { linuxHopperReleaseCache: linuxHopperReleaseCacheDirectory(environment) } : {},
				skillDestinations: (clientIds) => skillDestinations(homeDirectory, clientIds, environment, platform),
				...registration,
				nodeVersion: process.versions.node,
				macosVersion: () => doctorHost.macosVersion(),
				linuxDistribution,
				close: () => cleanup.close(),
				initialSetupState: async (scope) => {
					const diagnosis = await runDoctor(undefined, doctorHost, scope);
					const providerEnvironment = {
						...providerRegistrationEnvironment(diagnosis.providerInspections ?? []),
						...diagnosis.hopperPath === undefined ? {} : { HOPPER_LAUNCHER_PATH: diagnosis.hopperPath },
						...explicitSetupRegistrationEnvironment(environment)
					};
					const requestedProvider = analysisProviderSelectorSchema.safeParse(environment.REA_ANALYSIS_PROVIDER);
					return {
						...diagnosis.hopperPath === undefined ? {} : { hopperPath: diagnosis.hopperPath },
						...typeof environment.HOPPER_LAUNCHER_PATH === "string" && environment.HOPPER_LAUNCHER_PATH.trim() !== "" && diagnosis.hopperPath === environment.HOPPER_LAUNCHER_PATH ? { hopperLauncherConfigured: true } : {},
						providerConfigured: diagnosis.hopperPath !== undefined || diagnosis.providerInspections?.some(({ configured }) => configured) === true || providerEnvironment.REA_JEB_MCP_URL !== undefined || requestedProvider.success && requestedProvider.data !== "auto",
						providerEnvironment,
						doctor: diagnosis
					};
				},
				installHopper: (replaceExisting, signal) => resources.run(async () => {
					const publisher = platform === "linux" ? publisherCleanup : macCleanup;
					const cancellation = signal === undefined ? {} : { signal };
					cleanup.admit(publisher);
					try {
						if (platform === "linux") {
							const result = await installLinuxHopper(linuxHopperHost, cancellation);
							if (result.cleanupFailure !== undefined) {
								pendingLinuxHopperCleanup.retain(result.cleanupFailure);
								cleanup.admit(temporaryCleanup);
							}
							if (result.status === "installed") return {
								status: "installed",
								launcherPath: result.launcherPath
							};
							const failure = setupInstallFailure(result.reason, {
								packageFailure: result.packageFailure,
								platform: "linux",
								download: result.download
							});
							const detail = result.download !== undefined ? undefined : result.verificationFailure?.message ?? result.pythonRuntimeFailure?.message ?? (result.operationFailure === undefined ? undefined : `${result.operationFailure.operation}${result.operationFailure.path === undefined ? "" : ` at ${result.operationFailure.path}`}: ${result.operationFailure.systemCode === undefined ? "" : `${result.operationFailure.systemCode}: `}${result.operationFailure.detail}`);
							return detail !== undefined ? {
								...failure,
								remediation: `${detail} ${failure.remediation}`
							} : failure;
						}
						if (macHopperHost === undefined) return setupInstallFailure("unsupported_host");
						const result = await installMacHopper({
							replaceExisting,
							...cancellation
						}, macHopperHost);
						if (result.status === "installed") return {
							status: "installed",
							launcherPath: result.launcherPath,
							...result.openFailure === undefined ? {} : { warning: `Hopper was installed, but macOS could not open it: ${result.openFailure}. Open ${result.launcherPath} manually to complete first-run setup.` },
							...result.cleanupFailure === undefined ? {} : { cleanupFailure: result.cleanupFailure }
						};
						const failure = setupInstallFailure(result.reason, { download: result.download });
						const diagnostic = setupInstallerDiagnostic(result.diagnostic);
						return {
							...failure,
							remediation: [
								failure.remediation,
								...diagnostic === undefined ? [] : [`Installer detail: ${diagnostic}`],
								...result.cleanupFailure === undefined ? [] : [result.cleanupFailure]
							].join(" ")
						};
					} finally {
						cleanup.admit(publisher);
					}
				}),
				detectedClients: () => detectClients(homeDirectory, platform, environment),
				supportedClients: () => resolveSupportedClients(homeDirectory, platform, environment),
				...clientConfigurationOperations(resources, doctorHost.resolveProviderRequestBudget, platform),
				skillNeedsInstall: (clientIds) => canonicalSkillNeedsInstall(homeDirectory, clientIds, environment, platform, resources),
				validateSkillDirectories: (clientIds) => validateCanonicalSkillDirectories(homeDirectory, clientIds, environment, platform),
				installSkill: (clientIds) => installCanonicalSkill(homeDirectory, clientIds, environment, platform, undefined, resources),
				doctor: (scope) => runDoctor(undefined, doctorHost, scope),
				desktopBuild: desktopBuildHost(doctorHost, environment, resources)
			};
		};
		desktopBuildHost = (doctorHost, environment, resources) => systemDesktopBuildSetupHost(environment, doctorHost.platform, doctorHost.clientRegistrations, resources);
		setupInstallerDiagnostic = (value) => {
			if (value === undefined) return undefined;
			const normalized = value.replace(/\u001b(?:\[[0-9;?]*[ -/]*[@-~]|\([0-9A-Za-z]|[@-Z\\^_])/gu, "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, "").replace(/\s+/gu, " ").trim();
			if (normalized === "") return undefined;
			return normalized.length <= 400 ? normalized : `${normalized.slice(0, 397).trimEnd()}...`;
		};
		clientConfigurationOperations = (resources, resolveProviderRequestBudget, platform) => ({
			configureClient: (client, providerEnvironment, command) => runClientConfigurationOperation(resources, async () => client.format === "unsupported" ? { status: "skipped" } : configureClientConfiguration(client, providerEnvironment, command, resolveProviderRequestBudget, platform)),
			clientNeedsConfigure: (client, providerEnvironment, command) => runClientConfigurationOperation(resources, async () => client.format === "unsupported" ? false : !await clientConfigurationAligned(client, providerEnvironment, command, resolveProviderRequestBudget, platform)),
			inspectClientConfiguration: (client, providerEnvironment, command) => runClientConfigurationOperation(resources, () => inspectClientConfiguration(client, providerEnvironment, command, resolveProviderRequestBudget, platform))
		});
		runClientConfigurationOperation = async (resources, operation) => {
			try {
				return await resources.run(async () => {
					try {
						return await operation();
					} catch (cause) {
						if (!isClientConfigurationCleanupFailure(cause)) throw cause;
						const cleanup = await retryClientConfigurationCleanup(cause, resources);
						const rollback = cleanup.failures.find((failure) => failure instanceof ClientConfigurationCleanupRollbackFailure);
						const rollbackMessage = rollback instanceof ClientConfigurationCleanupRollbackFailure ? ` ${failedConfigurationMessage(rollback.configurationFailure)}` : "";
						throw configurationCleanupError(`Could not safely access client configuration at ${cause.path}: ${errorMessage(cleanup.primary)}.${rollbackMessage}`, cause, cleanup.cleanup, cleanup.cleanupLeases);
					}
				});
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw configurationCleanupError(cause.message, cause, cause.cleanup);
				throw cause;
			}
		};
		configurationCleanupError = (message, cause, cleanup, leases) => {
			const error = new ConfigurationError(message, {
				cause,
				settings: [{
					setting: "client configuration",
					constraint: message
				}],
				...cleanup === undefined ? {} : { cleanup }
			});
			if (leases !== undefined) new AnalysisCleanupLeaseGroup(error, leases);
			else bindRegularFileCleanup(cause, error);
			return error;
		};
		detectClients = async (home, platform = HOST_PLATFORM.platform, environment = process.env) => {
			const detected = [];
			for (const candidate of await resolveSupportedClients(home, platform, environment)) {
				if (candidate.configPathError !== undefined || candidate.registrationApplicability === true) continue;
				if (await clientEvidencePresent(candidate)) detected.push(candidate);
			}
			return detected;
		};
		clientEvidencePresent = async (client) => {
			for (const path of clientEvidencePaths(client)) if (await exists(path)) return true;
			return false;
		};
		exists = async (path) => {
			try {
				await access(path);
				return true;
			} catch (cause) {
				void cause;
				return false;
			}
		};
	})))();
}

//#endregion
export { SetupHost_exports, assertSetupActive, configureDetectedClients, discoverSetupState, filterClientsNeedingConfigure, hopperInstallRefusal, hostRemediation, init_SetupCleanupOwner, init_SetupClients, init_SetupHost, init_SetupPlan, init_setupCancellation, planSetupActions, setupCleanupError, setupCleanupReason, systemSetupHost };