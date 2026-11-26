import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisProtocolError, AnalysisResourceConstraintError, AnalysisTimeoutError, AnalysisUnsupportedTargetError, MAX_NODE_TIMER_DELAY_MS, OwnerCancellation, cancelledBy, carriedReason, deadlineParameterLimit, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_fixedAllowanceRemediation, init_jsonValue, init_parseFailure, jsonValueSchema, malformedInput } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_strictUtf8, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { init_callerPath, isQualifiedCallerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactFileCleanupFailure, ArtifactReaderFailure, ArtifactResourceRetryFailure, ArtifactResourceScope, DirectoryArtifactReader, DirectoryArtifactTraversalLimit, NonRegularFileReadError, RegularFileCleanupFailure, artifactFileCancellationCause, artifactFilePrimaryFacts, artifactSelectedPathErrno, assertArtifactReadActive, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_DirectoryArtifactReader, init_OwnedRegularFile, init_RegularFile, init_readArtifactFileChunks, init_resources, mapArtifactFileFailure, readArtifactFileChunks, sameRegularFileState, withArtifactFileHandle, withArtifactRegularFile } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, ellipsisExcerpt, init_analysisErrorCleanup, init_excerpt, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { init_launchFailure, launcherFailureOf } from "./ExecFileOutput-YDVPmL3I.js";
import { describeValidationFailure, init_validationFailure } from "./nativeValueFlow-13oOEkkJ.js";
import { analyzeWithService, contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { finalizedResult, init_runOwned, runOwned } from "./runOwned-BkKv5e_3.js";
import { finishCliEvidenceCommand, init_cliEvidenceCallerPath } from "./cliEvidenceCallerPath-BMrJ1VvW.js";
import { init_xmlDocument, isUnqualifiedXmlElement, parseXmlDocument } from "./xmlDocument-DuM0TF5n.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { executeProviderOperation, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader, init_ProcessInspectionCleanup, processInspectionCleanupFailures } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { externalJvmExhaustionRecovery, init_RuntimeExhaustion } from "./ProviderProcess-OkgijDXB.js";
import { ProviderStartupDeadline, init_ProviderDeadline } from "./ProviderDeadline-BXAnhNBa.js";
import { OwnedCommandFailure, init_OwnedCommand, preparationHostCapacityFailure, prepareOwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { bindProcessInspectionCancellations, init_OwnedCommandCleanup, processInspectionCancellationError, processInspectionFailure } from "./OwnedCommandCleanup-CmeE0187.js";
import { classifyLaunchFailure, classifyProviderOutcome, init_classifyProviderOutcome } from "./classifyProviderOutcome-BMRoGrMs.js";
import { init_ProviderOutcome, providerOutcomeOf } from "./ProviderOutcome-iJMiaLYK.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { analysisClientFailureForOperation, init_AnalysisClientFailure } from "./AnalysisClientFailure-DEt-O8Hp.js";
import { init_ownedProcessAvailability, ownedProcessPrerequisiteAvailability } from "./ownedProcessAvailability-DkUuARAb.js";
import { init_decodedAndroidManifest, parseDecodedAndroidManifest } from "./decodedAndroidManifest-DkoJmQjR.js";
import { WindowsBatchCommandError, init_WindowsBatchCommand, isWindowsBatchFile, windowsBatchCommand } from "./WindowsBatchCommand-UPai11E3.js";
import { APKTOOL_TOOL_CONTRACTS, DEFAULT_APKTOOL_DECODE_TIMEOUT_MS, DEFAULT_APKTOOL_STRING_LIMIT, DEFAULT_APKTOOL_STRING_TABLE_BYTES, DEFAULT_APKTOOL_TOTAL_STRINGS, DEFAULT_APKTOOL_TOTAL_STRING_TABLE_BYTES, androidLocaleDirectorySuffix, apktoolRequestSchema, apktoolResultSchemas, apktoolStringTablesRequested, classifyAndroidStringsTable, init_apktoolResourceAnalysis, init_apktoolToolContracts } from "./apktoolToolContracts-DcTEGIda.js";
import { init_providerConfigurationRefusal, providerConfigurationRefusal } from "./providerConfigurationRefusal-C9XQsrHG.js";
import { findWindowsExecutable, init_WindowsExecutable } from "./WindowsExecutable-CNcRot2V.js";
import { join } from "node:path";
import { parse } from "semver";
import { createHash, randomUUID } from "node:crypto";
import { chmod, mkdir, open } from "node:fs/promises";
import { isMap, isScalar, parseDocument } from "yaml";

//#region dist/application/apktool/ApktoolResourceAnalysisService.js
var ApktoolResourceAnalysisService;
function init_ApktoolResourceAnalysisService() {
	return (init_ApktoolResourceAnalysisService = __esmMin((() => {
		init_apktoolResourceAnalysis();
		init_ProviderOperationExecution();
		ApktoolResourceAnalysisService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			/** Run one caller-selected Apktool request and retain target identity inline. */
			async execute(operation, input, options) {
				return executeProviderOperation(operation, input, options, apktoolRequestSchema, this.provider, "observed");
			}
		};
	})))();
}

//#endregion
//#region dist/apktool/ApktoolProviderIdentity.js
var APKTOOL_PROVIDER_IDENTITY;
function init_ApktoolProviderIdentity() {
	return (init_ApktoolProviderIdentity = __esmMin((() => {
		APKTOOL_PROVIDER_IDENTITY = {
			id: "apktool",
			name: "Apktool",
			version: null
		};
	})))();
}

//#endregion
//#region dist/apktool/ApktoolDecodedInventory.js
var countDecodedFiles;
function init_ApktoolDecodedInventory() {
	return (init_ApktoolDecodedInventory = __esmMin((() => {
		init_result();
		init_resources();
		init_apktoolResourceAnalysis();
		countDecodedFiles = async (workspace, root, signal, maximumEntries) => {
			let count = 0;
			let capped = false;
			const locales = [];
			const otherStringsTables = [];
			const unreadableStringsTables = [];
			const observeTable = (path, kind) => {
				const match = /^res\/(values(?:-([^/]*))?)\/strings\.xml$/u.exec(path);
				if (match === null) return;
				if (kind !== "file") {
					unreadableStringsTables.push({
						path,
						kind
					});
					return;
				}
				const suffix = match[2];
				if (suffix === undefined) return;
				const table = classifyAndroidStringsTable(suffix);
				if (table.kind === "locale") locales.push(table.locale);
				else otherStringsTables.push(match[1]);
			};
			const observation = () => {
				return {
					count,
					capped,
					locales: locales.sort(),
					otherStringsTables: otherStringsTables.sort(),
					unreadableStringsTables: unreadableStringsTables.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0)
				};
			};
			try {
				for await (const entry of workspace.entries(root, signal, maximumEntries, (omission) => observeTable(omission.path, omission.kind))) {
					assertArtifactReadActive(signal);
					observeTable(entry.path, entry.kind);
					if (entry.kind === "file") count += 1;
				}
			} catch (cause) {
				if (!(cause instanceof DirectoryArtifactTraversalLimit)) return err({
					cause,
					partial: observation()
				});
				capped = true;
			}
			return ok(observation());
		};
	})))();
}

//#endregion
//#region dist/apktool/ApktoolWorkspace.js
var ApktoolWorkspace;
function init_ApktoolWorkspace() {
	return (init_ApktoolWorkspace = __esmMin((() => {
		init_resources();
		init_analysisErrorCore();
		init_RegularFile();
		init_PrivateRuntimeRoot();
		init_strictUtf8();
		ApktoolWorkspace = class {
			root;
			commands;
			removeWorkspace;
			#files = new ArtifactResourceScope();
			#snapshot;
			constructor(root, commands, removeWorkspace) {
				this.root = root;
				this.commands = commands;
				this.removeWorkspace = removeWorkspace;
			}
			get snapshot() {
				return this.#snapshot;
			}
			get path() {
				return this.root.path;
			}
			async close() {
				await this.#files.close();
				if (this.commands.pendingFor(this.path)) throw new Error("The decode workspace remains owned until its Apktool command stops");
				if (this.removeWorkspace !== undefined) await this.removeWorkspace(this.path);
				await this.root.close();
			}
			/** Stream one admitted input into a separately owned immutable snapshot. */
			async snapshotInput(path, operation, signal) {
				let admitted = false;
				try {
					return await withArtifactRegularFile(path, this.#files, signal, async ({ handle: source, initial }) => {
						admitted = true;
						const output = join(this.path, "input.apk");
						const file = await open(output, "wx", 384);
						await withArtifactFileHandle(output, file, this.#files, signal, async (destination) => {
							let copied = 0;
							const hash = createHash("sha256");
							for await (const value of readArtifactFileChunks(source, {
								start: 0,
								end: initial.size,
								signal
							})) {
								assertArtifactReadActive(signal);
								if (!Buffer.isBuffer(value)) throw new AnalysisProtocolError("APK snapshot stream returned non-byte data");
								copied += value.length;
								if (copied > initial.size) throw new AnalysisArtifactChangedError(operation, path, "APK size exceeded the observed size during snapshot copying");
								hash.update(value);
								let offset = 0;
								while (offset < value.length) {
									assertArtifactReadActive(signal);
									const written = await destination.write(value, offset, value.length - offset);
									if (written.bytesWritten === 0) throw new AnalysisProtocolError("APK snapshot write made no progress");
									offset += written.bytesWritten;
								}
							}
							const final = await source.stat();
							if (copied !== initial.size || !sameRegularFileState(initial, final)) throw new AnalysisArtifactChangedError(operation, path, "APK size or file state changed during snapshot copying");
							this.#snapshot = {
								path,
								bytes: copied,
								sha256: hash.digest("hex")
							};
						});
						await chmod(output, 256);
						return this.#snapshot;
					}, "follow");
				} catch (cause) {
					throw mapArtifactFileFailure(cause, (physical) => {
						if (admitted) return physical;
						if (physical instanceof Error && "code" in physical && (physical.code === "EACCES" || physical.code === "EPERM")) return new AnalysisAccessDeniedError(operation, path, physical.code, { cause: physical });
						if (physical instanceof NonRegularFileReadError || artifactSelectedPathErrno(physical) !== undefined) return new AnalysisInputError(operation, { cause: physical }, [{
							path: ["path"],
							reason: "invalid_value",
							message: "APK input must resolve to an accessible regular file"
						}]);
						return physical;
					});
				}
			}
			/** Reject non-regular output before reading; every failed close retains its owner. */
			async readText(path, budget, signal) {
				let admitted = false;
				try {
					return await withArtifactRegularFile(path, this.#files, signal, async ({ handle: file, initial }) => {
						admitted = true;
						const bytes = Buffer.alloc(Math.min(initial.size, budget) + 1);
						let length = 0;
						while (length < bytes.length) {
							assertArtifactReadActive(signal);
							const result = await file.read(bytes, length, bytes.length - length, null);
							if (result.bytesRead === 0) break;
							length += result.bytesRead;
						}
						const final = await file.stat();
						if (!sameRegularFileState(initial, final)) throw new AnalysisProtocolError(`Apktool output changed while being read: ${path}`);
						const truncated = length > budget;
						const sourceBytes = Math.min(length, budget);
						try {
							return {
								text: strictUtf8Decoder("strip-signature").decode(bytes.subarray(0, sourceBytes), { stream: truncated }),
								truncated,
								sourceBytes
							};
						} catch (cause) {
							throw new AnalysisProtocolError(`apktool produced invalid UTF-8 in ${path}`, { cause });
						}
					});
				} catch (cause) {
					if (!admitted && cause instanceof Error && "code" in cause && cause.code === "ENOENT") return {
						text: null,
						truncated: false,
						sourceBytes: 0
					};
					throw cause;
				}
			}
			async *entries(path, signal, maximumEntries, onOmission) {
				const reader = new DirectoryArtifactReader(path);
				const owner = {
					kind: "reader",
					resource: path,
					reader
				};
				this.#files.retain(owner);
				let failed;
				try {
					yield* reader.entries(signal, {
						...maximumEntries === undefined ? {} : { maximumEntries },
						...onOmission === undefined ? {} : { onOmission }
					});
				} catch (cause) {
					failed = { cause };
					throw cause;
				} finally {
					const released = await this.#files.release(owner);
					if (released.kind === "failed") throw failed === undefined ? released.cause : ArtifactReaderFailure.withCleanup(failed.cause, ArtifactReaderFailure.cleanupObservation(released.cause, path));
				}
			}
		};
	})))();
}

//#endregion
//#region dist/apktool/ApktoolCommandOutput.js
var capturedApktoolFailureOutput;
function init_ApktoolCommandOutput() {
	return (init_ApktoolCommandOutput = __esmMin((() => {
		init_capturedProviderOutput();
		init_OwnedCommand();
		init_DarwinProcessRunTokenReader();
		capturedApktoolFailureOutput = (cause) => {
			if (cause instanceof OwnedCommandFailure) return cause.snapshot === null ? cause.preparationFailure instanceof DarwinProcessOwnershipInspectionError ? cause.preparationFailure.capturedOutput : undefined : capturedProviderOutput(cause.snapshot);
			return cause instanceof DarwinProcessOwnershipInspectionError ? cause.capturedOutput : undefined;
		};
	})))();
}

//#endregion
//#region dist/apktool/ApktoolCommandCleanup.js
var ApktoolCommandCleanup;
function init_ApktoolCommandCleanup() {
	return (init_ApktoolCommandCleanup = __esmMin((() => {
		init_OwnedCommandCleanup();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_OwnedRegularFile();
		init_ProcessInspectionCleanup();
		init_validationFailure();
		init_OwnedCommand();
		ApktoolCommandCleanup = class {
			#scope = new ArtifactResourceScope();
			#owners = new Set();
			async run(operation, name) {
				try {
					return await this.#scope.run(() => {
						this.#prune();
						return operation();
					});
				} catch (cause) {
					throw this.#retryFailure(cause, name);
				}
			}
			async close() {
				try {
					await this.#scope.close();
				} catch (cause) {
					throw this.#retryFailure(cause, "close");
				} finally {
					this.#prune();
				}
			}
			pendingFor(root) {
				this.#prune();
				return [...this.#owners].some((owner) => owner.root === root);
			}
			retainFailure(cause, primary, operation, root) {
				const retained = [];
				const command = cause instanceof OwnedCommandFailure ? cause : undefined;
				for (const preparation of processInspectionCleanupFailures(processInspectionFailure(cause))) {
					if (preparation instanceof RegularFileCleanupFailure) {
						const cleanup = new ProviderCleanupError("apktool", [preparation.path], { reason: describeValidationFailure(preparation.cleanupCause) }, {
							operation,
							cause: preparation
						});
						const retainedOwner = this.#retain(cleanup, () => preparation.owner.close(), root);
						cleanup.bindCleanupResourceOwner(retainedOwner.lease);
						retainedOwner.lease.bindCleanupError(cleanup);
						retained.push(retainedOwner);
					} else {
						const cleanup = preparation.cleanupFailure ?? new ProviderCleanupError("apktool", ["process ownership inspection"], { reason: preparation.message }, {
							operation,
							cause: preparation
						});
						const owner = preparation.cleanupOwner;
						const retainedOwner = this.#retain(cleanup, async () => {
							if (owner === undefined) throw cleanup;
							await owner.close();
						}, root);
						retainedOwner.lease.bindCleanupError(cleanup);
						retained.push(retainedOwner);
					}
				}
				if (command !== undefined && (command.cleanupOwner !== undefined || command.cleanupFailure !== null)) {
					const owner = command.cleanupOwner;
					const cleanup = new ProviderCleanupError("apktool", command.resources, { reason: command.cleanupFailure ?? "Command cleanup remains incomplete" }, {
						operation,
						cause
					});
					const retainedOwner = this.#retain(cleanup, async () => {
						if (owner === undefined) throw cleanup;
						const result = await owner.stop();
						if (result.status === "incomplete") throw new Error(result.reason);
					}, root);
					retainedOwner.lease.bindCleanupError(cleanup);
					retained.push(retainedOwner);
				}
				if (retained.length === 0) return bindProcessInspectionCancellations(cause, primary, operation);
				const cleanup = new ProviderCleanupError("apktool", retained.flatMap((owner) => owner.cleanup.cleanupResources), {}, {
					operation,
					cause
				});
				this.#bind(cleanup, retained);
				return bindProcessInspectionCancellations(cause, analysisErrorWithCleanupDependencies(primary, cleanup, operation), operation);
			}
			#retain(cleanup, release, root) {
				const lease = new AnalysisCleanupLease(async () => {
					try {
						await release();
					} catch (cause) {
						throw new ArtifactReaderFailure("unavailable", cleanup.message, {
							cause,
							cleanup: {
								reason: cleanup.message,
								resources: cleanup.cleanupResources
							}
						});
					}
				}, cleanup.cleanupResources);
				const owner = {
					lease,
					cleanup,
					root
				};
				this.#owners.add(owner);
				this.#scope.retain({
					kind: "lease",
					resource: cleanup.cleanupResources[0] ?? "apktool command",
					lease
				});
				return owner;
			}
			#bind(error, owners) {
				new AnalysisCleanupLeaseGroup(error, owners.map((owner) => owner.lease));
				error.bindCleanupResourceOwner({ get cleanupResources() {
					return [...new Set(owners.filter((owner) => !owner.lease.released).flatMap((owner) => owner.cleanup.cleanupResources))];
				} });
			}
			#retryFailure(cause, operation) {
				if (!(cause instanceof ArtifactResourceRetryFailure) || cause.cleanup === undefined || !cause.failedOwners.every((failed) => failed.kind === "lease" && [...this.#owners].some((owner) => owner.lease === failed.lease))) return cause;
				const owners = [...this.#owners].filter((owner) => !owner.lease.released);
				const failure = new ProviderCleanupError("apktool", owners.flatMap((owner) => owner.cleanup.cleanupResources), { reason: cause.cleanup.reason }, {
					operation,
					cause
				});
				this.#bind(failure, owners);
				return failure;
			}
			#prune() {
				for (const owner of this.#owners) if (owner.lease.released) this.#owners.delete(owner);
			}
		};
	})))();
}

//#endregion
//#region dist/apktool/ApktoolDecodeOutput.js
var metaInfoTag, parseApktoolYml, apktool3Fields, parseApktool3Metadata, apktool3String, parseManifestPackage, parseDecodedStrings, yamlScalar, childNodes, sourceLineOffsets, sourceOffset;
function init_ApktoolDecodeOutput() {
	return (init_ApktoolDecodeOutput = __esmMin((() => {
		init_decodedAndroidManifest();
		init_xmlDocument();
		init_result();
		init_parseFailure();
		metaInfoTag = {
			tag: "tag:yaml.org,2002:brut.androlib.meta.MetaInfo",
			collection: "map",
			resolve: (map) => map
		};
		parseApktoolYml = (yml) => {
			const source = yml.replace(/^\uFEFF/u, "");
			const header = source.split(/\r\n?|\n/u, 1)[0] ?? "";
			if (/^version: (?:2\.(?:9|[1-9]\d)|3\.\d+)\.\d+(?:[-+][0-9A-Za-z.+-]+)?$/u.test(header)) return parseApktool3Metadata(source);
			const document = parseDocument(yml, {
				schema: "core",
				customTags: [metaInfoTag],
				strict: true,
				uniqueKeys: true
			});
			if (document.errors.length > 0) throw new TypeError(`apktool.yml is not valid Apktool metadata: ${document.errors[0]?.message ?? "YAML parse error"}`);
			if (!isMap(document.contents)) throw new TypeError("apktool.yml root must be an Apktool metadata mapping");
			return {
				versionName: yamlScalar(document, ["versionInfo", "versionName"], yml),
				versionCode: yamlScalar(document, ["versionInfo", "versionCode"], yml),
				minSdkVersion: yamlScalar(document, ["sdkInfo", "minSdkVersion"], yml),
				targetSdkVersion: yamlScalar(document, ["sdkInfo", "targetSdkVersion"], yml)
			};
		};
		apktool3Fields = new Map([
			["versionInfo.versionName", "versionName"],
			["versionInfo.versionCode", "versionCode"],
			["sdkInfo.minSdkVersion", "minSdkVersion"],
			["sdkInfo.targetSdkVersion", "targetSdkVersion"]
		]);
		parseApktool3Metadata = (source) => {
			const values = new Map();
			const sections = new Set();
			let section;
			for (const line of source.split(/\r\n?|\n/u)) {
				if (line.trim() === "" || /^[#!]/u.test(line)) continue;
				if (!line.startsWith(" ")) {
					const separator = line.indexOf(":");
					section = separator === -1 ? undefined : line.slice(0, separator);
					if (section === "version") {
						if (sections.has(section)) throw new TypeError("apktool.yml has a duplicate producer version");
						sections.add(section);
						continue;
					}
					if (section !== "versionInfo" && section !== "sdkInfo") continue;
					if (line.slice(separator + 1).trim() !== "" || sections.has(section)) throw new TypeError(`apktool.yml has an invalid ${section} mapping`);
					sections.add(section);
					continue;
				}
				const record = /^  ([^ :]+):(?: (.*))?$/su.exec(line);
				if (record === null) continue;
				const path = `${section ?? ""}.${record[1] ?? ""}`;
				const field = apktool3Fields.get(path);
				if (field === undefined) continue;
				if (values.has(field)) throw new TypeError(`apktool.yml has a duplicate ${path} field`);
				const value = record[2] ?? "";
				values.set(field, field === "versionCode" ? value : apktool3String(value));
			}
			return {
				versionName: values.get("versionName") ?? null,
				versionCode: values.get("versionCode") ?? null,
				minSdkVersion: values.get("minSdkVersion") ?? null,
				targetSdkVersion: values.get("targetSdkVersion") ?? null
			};
		};
		apktool3String = (source) => {
			if (source.startsWith("\"")) {
				const document = parseDocument(source, {
					schema: "core",
					strict: true
				});
				if (document.errors.length === 0 && isScalar(document.contents) && typeof document.contents.value === "string") return document.contents.value;
				throw new TypeError("apktool.yml has an invalid quoted string");
			}
			const decoded = JSON.parse(`"${source}"`);
			if (typeof decoded !== "string") throw new TypeError("apktool.yml has an invalid Apktool 3 string");
			return decoded;
		};
		parseManifestPackage = (manifest) => {
			const parsed = parseDecodedAndroidManifest(manifest, "allow");
			if (parsed.ok) return parsed.value.packageName;
			if (parsed.error.kind === "unexpected-root") throw new TypeError("AndroidManifest.xml root must be <manifest>");
			throw new TypeError(`AndroidManifest.xml is not well-formed XML: ${parsed.error.message}`, { cause: parsed.error });
		};
		parseDecodedStrings = (stringsXml) => {
			const parsed = parseXmlDocument(stringsXml, {
				doctype: "allow",
				lineEndings: "preserve"
			});
			if (!parsed.ok) return err(parsed.error);
			const root = parsed.value.documentElement;
			if (!isUnqualifiedXmlElement(root) || root.localName !== "resources") return err(malformedInput("android-string-resources", "String resource document root must be <resources>", { field: "documentElement" }));
			const entries = [];
			let unparsedCount = 0;
			const offsets = sourceLineOffsets(stringsXml);
			for (const child of childNodes(root)) {
				if (!isUnqualifiedXmlElement(child) || child.localName !== "string") continue;
				const name = child.getAttributeNS(null, "name");
				if (name === null || name.length === 0) {
					unparsedCount += 1;
					continue;
				}
				const content = childNodes(child);
				if (content.some((node) => node.nodeType !== 3 && node.nodeType !== 8)) {
					unparsedCount += 1;
					continue;
				}
				if (content.every((node) => node.nodeType === 8)) {
					entries.push({
						name,
						value: ""
					});
					continue;
				}
				const value = content.filter((node) => node.nodeType === 3).map((node) => {
					const start = sourceOffset(node, offsets);
					if (start === undefined) return null;
					const end = stringsXml.indexOf("<", start);
					if (end < start) return null;
					return stringsXml.slice(start, end);
				});
				if (value.some((part) => part === null)) {
					unparsedCount += 1;
					continue;
				}
				entries.push({
					name,
					value: value.join("")
				});
			}
			return ok({
				entries,
				unparsedCount
			});
		};
		yamlScalar = (document, path, source) => {
			const node = document.getIn(path, true);
			if (!isScalar(node) || node.value === null) return null;
			if (typeof node.value === "string") return node.value;
			const range = node.range;
			return range === null || range === undefined ? String(node.value) : source.slice(range[0], range[1]);
		};
		childNodes = (node) => {
			const children = [];
			for (let child = node.firstChild; child !== null; child = child.nextSibling) children.push(child);
			return children;
		};
		sourceLineOffsets = (source) => {
			const offsets = [0];
			for (const match of source.matchAll(/\r\n?|\n/gu)) {
				const index = match.index;
				offsets.push(index + match[0].length);
			}
			return offsets;
		};
		sourceOffset = (node, lineOffsets) => {
			const line = node.lineNumber;
			const column = node.columnNumber;
			if (line === undefined || column === undefined) return undefined;
			const lineStart = lineOffsets[line - 1];
			return lineStart === undefined ? undefined : lineStart + column - 1;
		};
	})))();
}

//#endregion
//#region dist/apktool/ApktoolStringTables.js
var readTable, unavailableTableLimitation, projectApktoolStringTables;
function init_ApktoolStringTables() {
	return (init_ApktoolStringTables = __esmMin((() => {
		init_result();
		init_apktoolResourceAnalysis();
		init_analysisErrorCore();
		init_ApktoolDecodeOutput();
		readTable = async (resources, path, budget, offset, limit, signal) => {
			const source = await resources.readText(path, budget, signal);
			if (source.text === null) return {
				bytes: 0,
				fact: {
					status: "missing",
					totalCount: 0,
					unparsedCount: 0
				}
			};
			if (source.truncated) return {
				bytes: source.sourceBytes,
				fact: {
					status: "oversized",
					totalCount: null,
					unparsedCount: null,
					byteBudget: budget
				}
			};
			const bytes = source.sourceBytes;
			const parsed = parseDecodedStrings(source.text);
			if (!parsed.ok) return {
				bytes,
				fact: {
					status: "malformed",
					totalCount: null,
					unparsedCount: null,
					message: parsed.error.message
				}
			};
			return {
				bytes,
				fact: {
					status: "present",
					entries: parsed.value.entries.slice(offset, offset + Math.min(limit, Math.max(0, parsed.value.entries.length - offset))),
					totalCount: parsed.value.entries.length,
					unparsedCount: parsed.value.unparsedCount
				}
			};
		};
		unavailableTableLimitation = (fact, directory, locale, input) => {
			if (fact.status === "missing") return locale === null ? "No default res/values/strings.xml was found in the decoded workspace" : `No strings.xml was found for locale ${locale}`;
			if (fact.status === "oversized") return (input.locales === undefined || locale === null ? `strings.xml exceeds the ${String(fact.byteBudget)}-byte projection budget` : `strings.xml for locale ${locale} exceeds the ${String(fact.byteBudget)}-byte projection budget`) + "; raise max_string_table_bytes and max_total_string_table_bytes as needed on the next decode, or select fewer locales. No REA restart is required; decode_timeout_ms does not raise these read budgets.";
			return `String table ${JSON.stringify(`res/${directory}/strings.xml`)} could not be projected: ${fact.message}; entry counts are unknown`;
		};
		projectApktoolStringTables = async (resources, workspace, input, signal) => {
			if (!input.include_strings) return ok({
				strings: [],
				tables: [],
				limitations: [],
				coverage: "complete"
			});
			const primary = input.locale ?? null;
			const offset = input.string_offset ?? 0;
			const limit = input.string_limit ?? 2e3;
			const maxTotalStrings = input.max_total_strings ?? 1e4;
			const tableBytes = input.max_string_table_bytes ?? 8388608;
			const totalTableBytes = input.max_total_string_table_bytes ?? 33554432;
			const includeTables = apktoolStringTablesRequested(input);
			const includePage = input.string_offset !== undefined || input.string_limit !== undefined || input.max_total_strings !== undefined || input.max_string_table_bytes !== undefined || input.max_total_string_table_bytes !== undefined;
			const locales = [...new Set([primary, ...input.locales ?? []])];
			const physical = new Map();
			const tables = [];
			const limitations = new Set();
			let xmlBytes = 0;
			let outputEntries = 0;
			const exhausted = new Set();
			const projection = () => {
				for (const setting of exhausted) {
					const value = setting === "max_total_strings" ? maxTotalStrings : totalTableBytes;
					const unit = setting === "max_total_strings" ? "returned string copies" : "XML source bytes";
					const source = input[setting] === undefined ? "default" : "request";
					limitations.add(`Aggregate string table projection reached ${setting}=${String(value)} ${unit} (source ${source}). Raise ${setting} or select fewer locales for the next decode. ${setting === "max_total_strings" ? "string_tables_only avoids a duplicate primary copy. " : "max_string_table_bytes independently bounds each XML source read. "}No REA restart is required.`);
				}
				return {
					strings: input.string_tables_only === true ? [] : tables[0]?.strings ?? [],
					tables,
					limitations: [...limitations],
					coverage: tables.some((table) => table.coverage === "partial") ? "partial" : "complete"
				};
			};
			let pendingIndex = 0;
			try {
				for (const [index, locale] of locales.entries()) {
					pendingIndex = index;
					if (signal?.aborted) throw cancelledBy("decode_android_resources", signal);
					const directory = locale === null ? "values" : `values-${androidLocaleDirectorySuffix(locale)}`;
					const label = locale === null ? "default res/values/strings.xml" : `res/${directory}/strings.xml`;
					let fact = physical.get(directory);
					if (fact === undefined) {
						const budget = Math.min(tableBytes, totalTableBytes - xmlBytes);
						if (budget <= 0 || outputEntries >= maxTotalStrings) {
							tables.push({
								locale,
								status: "skipped",
								strings: [],
								total_count: null,
								unparsed_count: null,
								coverage: "partial"
							});
							limitations.add(`Projection for ${label} skipped: aggregate resource limit reached`);
							if (budget <= 0) exhausted.add("max_total_string_table_bytes");
							if (outputEntries >= maxTotalStrings) exhausted.add("max_total_strings");
							continue;
						}
						const read = await readTable(resources, join(workspace, "res", directory, "strings.xml"), budget, offset, limit, signal);
						fact = read.fact;
						xmlBytes += read.bytes;
						if (fact.status === "oversized" && budget < tableBytes) exhausted.add("max_total_string_table_bytes");
						physical.set(directory, fact);
					}
					if (fact.status !== "present") {
						tables.push({
							locale,
							status: fact.status,
							strings: [],
							total_count: fact.totalCount,
							unparsed_count: fact.unparsedCount,
							coverage: fact.status === "missing" ? "complete" : "partial"
						});
						limitations.add(unavailableTableLimitation(fact, directory, locale, input));
						continue;
					}
					const copies = index === 0 && includeTables && input.string_tables_only !== true ? 2 : 1;
					const remaining = Math.max(0, maxTotalStrings - outputEntries);
					const selected = fact.entries.slice(0, Math.floor(remaining / copies));
					outputEntries += selected.length * copies;
					const skipped = selected.length === 0 && fact.entries.length > 0;
					const limited = selected.length < fact.entries.length;
					if (limited) exhausted.add("max_total_strings");
					tables.push({
						locale,
						status: skipped ? "skipped" : "present",
						strings: selected,
						total_count: fact.totalCount,
						unparsed_count: fact.unparsedCount,
						...includePage ? { page: {
							offset,
							limit,
							returned_count: selected.length,
							next_offset: offset < fact.totalCount && selected.length < fact.totalCount - offset ? offset + selected.length : null
						} } : {},
						coverage: selected.length < fact.totalCount || fact.unparsedCount > 0 ? "partial" : "complete"
					});
					if (skipped) limitations.add(`Projection for ${label} skipped: aggregate resource limit reached`);
					if (fact.unparsedCount > 0) limitations.add(input.locales === undefined || locale === null ? `String entries omitted due to unsupported markup or missing names: ${String(fact.unparsedCount)}` : `String entries omitted in locale ${locale} due to unsupported markup or missing names: ${String(fact.unparsedCount)}`);
					if (limited && !skipped) limitations.add(`Locale ${locale ?? "default"} strings reports ${String(selected.length)} entries due to aggregate strings limit`);
					else if (fact.totalCount > limit && offset === 0 && !skipped) limitations.add(input.locales === undefined || locale === null ? `strings reports the first ${String(selected.length)} of ${String(fact.totalCount)} entries` : `Locale ${locale} strings reports the first ${String(selected.length)} of ${String(fact.totalCount)} entries`);
					if (selected.length < fact.totalCount && !skipped) limitations.add(`String page for ${label} starts at string_offset=${String(offset)} and returns ${String(selected.length)} of ${String(fact.totalCount)} valid entries. ${offset + selected.length < fact.totalCount ? `Continue with string_offset=${String(offset + selected.length)} and the same APK digest and locale;` : "This page reaches the end of the table;"} string_limit=${String(limit)} controls each page and max_total_strings=${String(maxTotalStrings)} controls returned copies. Table coverage describes the entire source table.`);
				}
			} catch (cause) {
				limitations.add(`String projection stopped at locale ${JSON.stringify(locales[pendingIndex])}; this selection and ${String(locales.length - pendingIndex - 1)} remaining selections were not projected`);
				return err({
					cause,
					partial: {
						...projection(),
						coverage: "partial"
					}
				});
			}
			return ok(projection());
		};
	})))();
}

//#endregion
//#region dist/apktool/ApktoolConfiguration.js
var APKTOOL_COMMAND_ENV, VERSION_TIMEOUT_MS, VERSION_MAX_OUTPUT_BYTES, apktoolVersionProbeTimeoutGuidance, APKTOOL_VERSION_REMEDIATION, APKTOOL_MISSING_REMEDIATION, APKTOOL_NOT_EXECUTABLE_REMEDIATION, resolveApktoolCommand, ApktoolConfigurationFailure, apktoolInvocation, parseApktoolVersionOutput, inspectApktoolClient, interpretApktoolVersion, rejectionCodeOf, apktoolConfigurationAvailability, versionProbeFailure;
function init_ApktoolConfiguration() {
	return (init_ApktoolConfiguration = __esmMin((() => {
		init_OwnedCommandCleanup();
		init_fixedAllowanceRemediation();
		init_ApktoolCommandOutput();
		init_jsonValue();
		init_result();
		init_ApktoolCommandCleanup();
		init_analysisErrorBase();
		init_providerAdapterError();
		init_DarwinProcessRunTokenReader();
		init_launchFailure();
		init_classifyProviderOutcome();
		init_analysisErrorCore();
		init_callerPath();
		init_snapshotEnvironment();
		init_WindowsExecutable();
		init_ProviderDeadline();
		init_OwnedCommand();
		init_WindowsBatchCommand();
		APKTOOL_COMMAND_ENV = "REA_APKTOOL_COMMAND";
		VERSION_TIMEOUT_MS = 2e4;
		VERSION_MAX_OUTPUT_BYTES = 64 * 1024;
		apktoolVersionProbeTimeoutGuidance = () => ({
			userMessage: `apktool version probe reached its ${String(VERSION_TIMEOUT_MS)} ms deadline (deadlineExpired). This release has no runtime override.`,
			remediationAction: `This ${String(VERSION_TIMEOUT_MS)} ms apktool version probe has no runtime override. decode_timeout_ms does not raise it. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`
		});
		APKTOOL_VERSION_REMEDIATION = `Set ${APKTOOL_COMMAND_ENV} to an Apktool 2.7.0 or newer launcher whose --version prints its version, or put one on PATH.`;
		APKTOOL_MISSING_REMEDIATION = `Set ${APKTOOL_COMMAND_ENV} to an absolute apktool launcher (the upstream wrapper or a java -jar script).`;
		APKTOOL_NOT_EXECUTABLE_REMEDIATION = `Check file type and execute permission for ${APKTOOL_COMMAND_ENV} or select an executable apktool launcher.`;
		resolveApktoolCommand = async (environment, platform, signal) => {
			if (signal?.aborted === true) throw cancelledBy("inspect_apktool_client", signal);
			const selectedEnvironment = snapshotEnvironment(environment, platform);
			const configured = selectedEnvironment[APKTOOL_COMMAND_ENV];
			if (configured !== undefined && configured.trim() !== "") {
				if (!isQualifiedCallerPath(configured, platform)) throw new ApktoolConfigurationFailure("not_absolute", `${APKTOOL_COMMAND_ENV} must be an absolute path to the apktool launcher`, `Set ${APKTOOL_COMMAND_ENV} to an absolute apktool launcher path, or unset it to use apktool from PATH.`, { configured_command: configured });
				return {
					command: configured,
					commandSource: "environment"
				};
			}
			if (platform !== "win32") return {
				command: "apktool",
				commandSource: "path"
			};
			const deadline = new ProviderStartupDeadline(VERSION_TIMEOUT_MS, signal);
			const lookupInterruption = () => deadline.interruption === "cancelled" ? cancelledBy("inspect_apktool_client", carriedReason(signal?.reason)) : new AnalysisTimeoutError("inspect_apktool_client", VERSION_TIMEOUT_MS, {
				diagnostics: { phase: "windows_path_lookup" },
				...apktoolVersionProbeTimeoutGuidance()
			});
			try {
				const found = await findWindowsExecutable("apktool", selectedEnvironment, {
					signal: deadline.signal,
					allowBatch: true
				});
				if (found.ok) return {
					command: found.value,
					commandSource: "path"
				};
				const failure = found.error;
				if (failure.kind === "interrupted") throw lookupInterruption();
				if (failure.kind === "invalid_extension") throw new ApktoolConfigurationFailure("command_unresolved", "Windows PATHEXT must contain filename extensions, not paths", `Correct PATHEXT so it lists filename extensions only, or set ${APKTOOL_COMMAND_ENV} to an absolute apktool launcher.`, {
					selected_command: "apktool",
					command_source: "path",
					invalid_extension: failure.extension
				});
				if (failure.kind === "inspection") throw new ApktoolConfigurationFailure("command_unresolved", `The PATH-selected apktool launcher could not be inspected: ${failure.path}`, `Make the PATH-selected apktool launcher readable, or set ${APKTOOL_COMMAND_ENV} to an absolute apktool launcher.`, {
					selected_command: "apktool",
					command_source: "path",
					candidate_path: failure.path,
					...failure.code === null ? {} : { filesystem_error: failure.code }
				}, { cause: failure.cause });
			} finally {
				deadline.dispose();
			}
			throw new ApktoolConfigurationFailure("command_missing", "The apktool launcher was not found on the selected Windows PATH/PATHEXT", `Set ${APKTOOL_COMMAND_ENV} to an absolute apktool launcher, or add its directory and extension to PATH and PATHEXT.`, {
				selected_command: "apktool",
				command_source: "path"
			});
		};
		ApktoolConfigurationFailure = class extends Error {
			code;
			remediation;
			diagnostics;
			constructor(code, message, remediation, diagnostics = {}, options) {
				super(message, options);
				this.code = code;
				this.remediation = remediation;
				this.diagnostics = diagnostics;
			}
		};
		apktoolInvocation = (selection, arguments_, environment, platform) => platform === "win32" && isWindowsBatchFile(selection.command) ? {
			...windowsBatchCommand({
				environment,
				batchPath: selection.command,
				arguments: arguments_
			}),
			windowsVerbatimArguments: true
		} : {
			command: selection.command,
			arguments: arguments_,
			windowsVerbatimArguments: false
		};
		parseApktoolVersionOutput = (stdout, platform) => {
			const line = stdout.split(/\r?\n/u).map((entry) => entry.trim()).find((entry) => entry !== "");
			const parsed = line === undefined ? null : parse(line);
			if (line === undefined || parsed === null) return {
				version: null,
				reportedVersion: line ?? null
			};
			const downstreamRelease = parsed.prerelease.length === 1 && parsed.prerelease[0] === "dirty" && parsed.build.length === 0;
			const atLeast = (release) => (downstreamRelease ? parsed.compareMain(release) : parsed.compare(release)) >= 0;
			const limitations = [];
			const discloseAdvisory = (fix, advisory, slug) => `Reported apktool version ${JSON.stringify(line)} predates the upstream ${fix} fix for ${advisory} (decoded resource paths could escape the output directory). Verify the selected decoder's patches before decoding untrusted APKs; launcher version alone does not establish engine contents or downstream backports. https://github.com/iBotPeaches/Apktool/security/advisories/${slug}`;
			if (!atLeast("2.9.2")) limitations.push(discloseAdvisory("2.9.2", "CVE-2024-21633", "GHSA-2hqv-2xv4-5h5w"));
			if (platform === "win32" && !atLeast("2.9.3")) limitations.push(discloseAdvisory("2.9.3", "GHSA-vgwr-4w3p-xmjv on Windows", "GHSA-vgwr-4w3p-xmjv"));
			if (parsed.major === 3 && parsed.minor === 0 && !atLeast("3.0.2")) limitations.push(discloseAdvisory("3.0.2", "CVE-2026-39973", "GHSA-m8mh-x359-vm8m") + (parsed.patch === 0 ? " Inclusion of the 3.0.0 release line is source-derived; the advisory lists 3.0.1." : ""));
			return {
				version: line,
				supportsDocumentedVersion: atLeast("2.7.0"),
				limitations
			};
		};
		inspectApktoolClient = async (selection, cleanup, options) => {
			const { signal, environment = process.env, platform } = options;
			const hostEnvironment = snapshotEnvironment(environment, platform);
			let invocation;
			try {
				invocation = apktoolInvocation(selection, ["--version"], hostEnvironment, platform);
			} catch (cause) {
				if (!(cause instanceof WindowsBatchCommandError)) throw cause;
				throw new ApktoolConfigurationFailure("launcher_unsupported", `The selected apktool launcher cannot be run through cmd.exe: ${cause.message}`, `Set ${APKTOOL_COMMAND_ENV} to a launcher path without cmd.exe metacharacters (" % ^ ! & | < >), or to a native apktool executable.`, {
					selected_command: selection.command,
					command_source: selection.commandSource
				}, { cause });
			}
			let interpreted;
			try {
				await prepareOwnedCommand(signal);
				await runOwnedCommand({
					command: invocation.command,
					arguments: invocation.arguments,
					windowsVerbatimArguments: invocation.windowsVerbatimArguments,
					expectedCommand: null,
					runId: randomUUID(),
					hostEnvironment
				}, {
					timeoutMs: VERSION_TIMEOUT_MS,
					diagnosticBytes: VERSION_MAX_OUTPUT_BYTES,
					observeCompleted: (snapshot) => {
						try {
							interpreted = ok(interpretApktoolVersion(snapshot.stdout.text, snapshot.stderr.text, selection, platform));
						} catch (cause) {
							if (!(cause instanceof ApktoolConfigurationFailure)) throw cause;
							interpreted = err(cause);
						}
					}
				}, signal === undefined ? {} : { signal });
			} catch (cause) {
				const recordedFailure = interpreted?.ok === false ? interpreted.error : undefined;
				const cancellation = cause instanceof OwnedCommandFailure ? cause.cancellation : undefined;
				const failure = recordedFailure === undefined ? versionProbeFailure(cause, selection, interpreted?.ok === true ? interpreted.value : undefined) : new ApktoolConfigurationFailure(recordedFailure.code, recordedFailure.message, recordedFailure.remediation, {
					...recordedFailure.diagnostics,
					...cancellation === undefined ? {} : { cancellation_observed: true }
				}, { cause });
				const primary = failure instanceof AnalysisError ? failure : new ProviderAdapterError("apktool", "inspect_apktool_client", {
					cause: failure,
					userMessage: failure.message,
					diagnostics: failure.diagnostics
				});
				const retained = cleanup.retainFailure(cause, primary, "inspect_apktool_client");
				throw retained === primary ? failure : retained;
			}
			if (interpreted === undefined) throw new ApktoolConfigurationFailure("version_unresolved", "The owned version command completed without an output observation", APKTOOL_VERSION_REMEDIATION, { selected_command: selection.command });
			if (!interpreted.ok) throw interpreted.error;
			return interpreted.value;
		};
		interpretApktoolVersion = (stdout, stderr, selection, platform) => {
			const identity = parseApktoolVersionOutput(stdout, platform);
			if (identity.version === null) throw new ApktoolConfigurationFailure("version_unresolved", "The selected apktool launcher exited successfully but did not report a recognizable version", APKTOOL_VERSION_REMEDIATION, {
				selected_command: selection.command,
				command_source: selection.commandSource,
				version_probe: "unrecognized_output",
				reported_version: identity.reportedVersion,
				stdout,
				stderr
			});
			if (!identity.supportsDocumentedVersion) throw new ApktoolConfigurationFailure("unsupported_version", `The selected Apktool version ${identity.version} is older than the supported minimum 2.7.0`, `Use Apktool 2.7.0 or newer; see docs/guides/android/apktool-resource-analysis.md.`, {
				selected_command: selection.command,
				command_source: selection.commandSource,
				reported_version: identity.version,
				minimum_version: "2.7.0"
			});
			return identity;
		};
		rejectionCodeOf = (code) => code === "command_missing" ? "executable_missing" : code === "command_not_executable" || code === "not_absolute" || code === "launcher_unsupported" || code === "command_unresolved" ? "not_configured" : code === "unsupported_version" ? "unsupported_version" : "version_unresolved";
		apktoolConfigurationAvailability = (cause) => ({
			status: "unavailable",
			code: rejectionCodeOf(cause.code),
			reason: cause.message,
			remediation: cause.remediation,
			diagnostics: { ...cause.diagnostics }
		});
		versionProbeFailure = (cause, selection, observed) => {
			if (cause instanceof AnalysisError) return cause;
			const preparation = processInspectionFailure(cause);
			const output = capturedApktoolFailureOutput(cause);
			const inspectionCancellation = !(cause instanceof OwnedCommandFailure) || cause.preparationFailure !== undefined ? processInspectionCancellationError(cause, "inspect_apktool_client") : undefined;
			if (cause instanceof OwnedCommandFailure && cause.reason === "cancelled" && cause.cancellation !== undefined) return inspectionCancellation ?? cancelledBy("inspect_apktool_client", carriedReason(cause.cancellation.reason), {
				...output === undefined ? {} : { capturedOutput: output },
				...observed === undefined ? {} : { diagnostics: { client: { version: observed.version } } }
			});
			if (inspectionCancellation !== undefined) return inspectionCancellation;
			if (cause instanceof OwnedCommandFailure && cause.reason === "timeout") return new AnalysisTimeoutError("inspect_apktool_client", VERSION_TIMEOUT_MS, {
				cause,
				...output === undefined ? {} : { capturedOutput: output },
				...apktoolVersionProbeTimeoutGuidance()
			});
			const launch = preparationHostCapacityFailure(cause) ?? launcherFailureOf(cause);
			if (launch?.kind === "host-exhausted" || launch?.kind === "argument-list") return classifyLaunchFailure(launch, {
				providerId: "apktool",
				operation: "inspect_apktool_client",
				command: selection.command,
				fixedArguments: true,
				selection: APKTOOL_COMMAND_ENV,
				details: {
					cause,
					diagnostics: {
						selected_command: selection.command,
						command_source: selection.commandSource
					}
				}
			});
			if (preparation !== undefined) return new ProviderAdapterError("apktool", "inspect_apktool_client", {
				cause,
				diagnostics: {
					stage: "ownership_preparation",
					...!(preparation instanceof DarwinProcessOwnershipInspectionError) || preparation.compilerOutcome === undefined ? {} : { compiler_outcome: jsonValueSchema.parse(preparation.compilerOutcome) }
				},
				...!(preparation instanceof DarwinProcessOwnershipInspectionError) || preparation.capturedOutput === undefined ? {} : { capturedOutput: preparation.capturedOutput }
			});
			if (launch?.kind === "missing" || launch?.kind === "not_executable") {
				const execDenied = launch.kind === "not_executable";
				return new ApktoolConfigurationFailure(execDenied ? "command_not_executable" : "command_missing", execDenied ? `Execution of the selected apktool launcher was denied: ${selection.command}` : `The selected apktool launcher was not found: ${selection.command}`, execDenied ? APKTOOL_NOT_EXECUTABLE_REMEDIATION : APKTOOL_MISSING_REMEDIATION, {
					filesystem_error: launch.code,
					selected_command: selection.command,
					command_source: selection.commandSource
				}, { cause });
			}
			const snapshot = cause instanceof OwnedCommandFailure ? cause.snapshot : null;
			if (cause instanceof OwnedCommandFailure && cause.reason === "output-limit") return new AnalysisResourceConstraintError("inspect_apktool_client", "memory", `apktool version output exceeded the ${String(VERSION_MAX_OUTPUT_BYTES)}-byte capture budget`, { max_output_bytes: VERSION_MAX_OUTPUT_BYTES }, {
				cause,
				diagnostics: {
					selected_command: selection.command,
					command_source: selection.commandSource
				},
				...output === undefined ? {} : { capturedOutput: output },
				...fixedAllowanceOptions("The apktool version-output capture allowance (decode_timeout_ms does not raise it)", "capture", {
					limit: VERSION_MAX_OUTPUT_BYTES,
					unit: "bytes"
				})
			});
			return new ApktoolConfigurationFailure("version_unresolved", "The selected apktool launcher did not report a usable version", APKTOOL_VERSION_REMEDIATION, {
				selected_command: selection.command,
				...observed === undefined ? {} : { client: { version: observed.version } },
				...snapshot === null ? {} : {
					exit_code: snapshot.exitCode ?? null,
					stderr_excerpt: snapshot.stderr.text.slice(0, 512)
				}
			}, { cause });
		};
	})))();
}

//#endregion
//#region dist/apktool/ApktoolProvider.js
var DECODE_MAX_OUTPUT_BYTES, MANIFEST_MAX_BYTES, MAX_DECODED_ENTRIES_VISITED, APKTOOL_JVM, STDERR_EXCERPT_CHARACTERS, apktoolDecodeTimeoutGuidance, throwIfCancelled, runApktool, apktoolCommandFailure, ApktoolProvider;
function init_ApktoolProvider() {
	return (init_ApktoolProvider = __esmMin((() => {
		init_analysisResourceLimits();
		init_capturedProviderOutput();
		init_HostPlatform();
		init_OwnedCommandCleanup();
		init_ApktoolProviderIdentity();
		init_ApktoolDecodedInventory();
		init_ApktoolWorkspace();
		init_resources();
		init_PrivateRuntimeRoot();
		init_ApktoolCommandOutput();
		init_ProviderOutcome();
		init_classifyProviderOutcome();
		init_ApktoolCommandCleanup();
		init_analysisErrorBase();
		init_excerpt();
		init_AnalysisClientFailure();
		init_AnalysisProvider();
		init_providerConfigurationRefusal();
		init_analysisObservation();
		init_apktoolResourceAnalysis();
		init_ApktoolStringTables();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_fixedAllowanceRemediation();
		init_result();
		init_runOwned();
		init_providerAdapterError();
		init_providerCleanupError();
		init_OwnedCommand();
		init_RuntimeExhaustion();
		init_snapshotEnvironment();
		init_WindowsBatchCommand();
		init_ownedProcessAvailability();
		init_ApktoolConfiguration();
		init_ApktoolDecodeOutput();
		DECODE_MAX_OUTPUT_BYTES = 4 * 1024 * 1024;
		MANIFEST_MAX_BYTES = 512 * 1024;
		MAX_DECODED_ENTRIES_VISITED = 1e5;
		APKTOOL_JVM = {
			program: "Apktool's",
			role: "decoder",
			raise: (option) => `Raise the ${option} of the selected Apktool launcher's JVM`,
			settings: "the selected Apktool launcher's JVM memory settings",
			threads: "Check host thread/process limits and available native memory for the selected Apktool launcher",
			smaller: "decode a smaller APK"
		};
		STDERR_EXCERPT_CHARACTERS = 512;
		apktoolDecodeTimeoutGuidance = (timeoutMs) => ({
			userMessage: `apktool decode reached its ${String(timeoutMs)} ms wall-clock deadline (deadlineExpired).`,
			limit: deadlineParameterLimit("decode_timeout_ms", timeoutMs, DEFAULT_APKTOOL_DECODE_TIMEOUT_MS),
			remediationAction: `${timeoutMs < 2147483647 ? `Increase decode_timeout_ms above ${String(timeoutMs)} (integer milliseconds from 1 to ${String(MAX_NODE_TIMER_DELAY_MS)}; omitted means ${String(DEFAULT_APKTOOL_DECODE_TIMEOUT_MS)}).` : `decode_timeout_ms is already at the maximum ${String(MAX_NODE_TIMER_DELAY_MS)} ms; do not increase it further.`} A change applies on the next decode. It does not raise the ${String(DECODE_MAX_OUTPUT_BYTES)}-byte output capture allowance or the version probe; both have no runtime override. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`
		});
		throwIfCancelled = (operation, signal) => {
			if (signal?.aborted === true) throw cancelledBy(operation, signal);
		};
		runApktool = async (operation, targetPath, selection, arguments_, limits, signal, environment, commands, root, platform) => {
			if (signal?.aborted === true) return err(cancelledBy(operation, signal));
			let invocation;
			try {
				invocation = apktoolInvocation(selection, arguments_, environment, platform);
			} catch (cause) {
				if (!(cause instanceof WindowsBatchCommandError)) throw cause;
				const reason = `The apktool batch launcher cannot receive REA's decode paths through cmd.exe: ${cause.message}`;
				return err(new AnalysisCapabilityUnavailableError(APKTOOL_PROVIDER_IDENTITY.id, operation, reason, {
					cause,
					userMessage: reason
				}));
			}
			try {
				const output = await runOwnedCommand({
					command: invocation.command,
					arguments: invocation.arguments,
					windowsVerbatimArguments: invocation.windowsVerbatimArguments,
					expectedCommand: null,
					runId: randomUUID(),
					hostEnvironment: environment
				}, {
					timeoutMs: limits.timeoutMs,
					diagnosticBytes: limits.maxOutputBytes,
					runtime: "jvm"
				}, signal === undefined ? {} : { signal });
				const { stdout, stderr } = capturedProviderOutput(output);
				return ok({
					stdout,
					stderr
				});
			} catch (cause) {
				return err(commands.retainFailure(cause, apktoolCommandFailure(cause, operation, targetPath, selection, limits), operation, root));
			}
		};
		apktoolCommandFailure = (failure, operation, targetPath, selection, limits) => {
			const capturedOutput = capturedApktoolFailureOutput(failure);
			const inspectionCancellation = !(failure instanceof OwnedCommandFailure) || failure.preparationFailure !== undefined ? processInspectionCancellationError(failure, operation) : undefined;
			if (inspectionCancellation !== undefined) return inspectionCancellation;
			const userMessage = `The selected Apktool command failed while decoding ${targetPath}`;
			const diagnostics = {
				selected_command: selection.command,
				target_path: targetPath
			};
			const outcome = providerOutcomeOf(failure);
			if (outcome === undefined) return new ProviderAdapterError("apktool", operation, {
				...failure instanceof OwnedCommandFailure ? { userMessage } : {},
				cause: failure,
				...capturedOutput === undefined ? {} : { capturedOutput },
				diagnostics
			});
			return classifyProviderOutcome(outcome, {
				providerId: APKTOOL_PROVIDER_IDENTITY.id,
				operation,
				capturedOutput: capturedProviderOutput,
				details: capturedOutput === undefined ? {} : { capturedOutput },
				timeout: {
					ms: limits.timeoutMs,
					...apktoolDecodeTimeoutGuidance(limits.timeoutMs)
				},
				outputLimit: {
					limits: { max_output_bytes: limits.maxOutputBytes },
					recovery: fixedAllowanceOptions("The apktool output capture allowance (decode_timeout_ms does not raise it)", "capture", {
						limit: limits.maxOutputBytes,
						unit: "bytes"
					})
				},
				runtimeExhaustion: ({ area }) => ({
					limits: null,
					recovery: {
						retryable: false,
						remediationAction: `${externalJvmExhaustionRecovery(area, APKTOOL_JVM)} Repeating the unchanged request is expected to fail the same way.`
					}
				}),
				dialect: (exit, details, unclassified) => {
					if (exit.kind !== "exited" || !(failure instanceof OwnedCommandFailure) || failure.processError !== undefined || failure.preparationFailure !== undefined || exit.exitCode === null || exit.exitCode === 0 || exit.signal !== null || exit.output?.truncated !== false) return unclassified({
						userMessage,
						diagnostics
					});
					return new AnalysisUnsupportedTargetError(operation, targetPath, ellipsisExcerpt(exit.output.snapshot.stderr.text.trim(), STDERR_EXCERPT_CHARACTERS) || `apktool exited with code ${String(exit.exitCode)} for ${operation}`, details);
				}
			});
		};
		ApktoolProvider = class {
			platform;
			selectedEnvironment;
			#artifacts = new ArtifactResourceScope();
			removeWorkspace;
			#commands = new ApktoolCommandCleanup();
			#shutdown = new AbortController();
			#active = new Set();
			#closing = false;
			#closePromise;
			constructor(options = {}) {
				this.platform = options.platform ?? HOST_PLATFORM.platform;
				this.selectedEnvironment = options.environment === undefined ? undefined : snapshotEnvironment(options.environment, this.platform);
				this.removeWorkspace = options.removeWorkspace;
			}
			operationEnvironment() {
				return this.selectedEnvironment ?? snapshotEnvironment(process.env, this.platform);
			}
			/** Probe the selected apktool launcher; decodes nothing. */
			inspectAvailability(signal) {
				if (this.#closing) return Promise.reject(cancelledBy("inspect_apktool_client", OwnerCancellation.ownerClosed));
				const operationSignal = signal === undefined ? this.#shutdown.signal : AbortSignal.any([signal, this.#shutdown.signal]);
				return this.#track(this.#commands.run(() => this.#artifacts.run(() => this.#inspectAvailability(operationSignal)), "inspect_apktool_client").catch((cause) => {
					throw analysisClientFailureForOperation(cause, "apktool", "inspect_apktool_client");
				}));
			}
			async #inspectAvailability(signal) {
				const environment = this.operationEnvironment();
				try {
					const selection = await resolveApktoolCommand(environment, this.platform, signal);
					await inspectApktoolClient(selection, this.#commands, {
						signal,
						environment,
						platform: this.platform
					});
					throwIfCancelled("inspect_apktool_client", signal);
					return {
						status: "available",
						code: null,
						reason: null,
						diagnostics: {
							selected_command: selection.command,
							command_source: selection.commandSource
						}
					};
				} catch (cause) {
					if (cause instanceof ApktoolConfigurationFailure) {
						return apktoolConfigurationAvailability(cause);
					}
					const prerequisite = ownedProcessPrerequisiteAvailability(cause);
					if (prerequisite !== undefined) return prerequisite;
					throw cause;
				}
			}
			/** Retain failed cleanup ownership and retry it on close. */
			async close() {
				this.#closing = true;
				this.#shutdown.abort(OwnerCancellation.ownerClosed);
				this.#closePromise ??= this.#drainAndClean().catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			execute(request, options) {
				if (this.#closing) return Promise.resolve(err(cancelledBy(request.operation, OwnerCancellation.ownerClosed)));
				const signal = options?.signal === undefined ? this.#shutdown.signal : AbortSignal.any([options.signal, this.#shutdown.signal]);
				return this.#track(this.#commands.run(() => this.#artifacts.run(() => this.#execute(request, signal)), request.operation).catch((cause) => err(analysisClientFailureForOperation(cause, "apktool", request.operation))));
			}
			async #execute(request, signal) {
				if (signal?.aborted === true) return err(cancelledBy(request.operation, signal));
				const environment = this.operationEnvironment();
				let selection;
				let identity;
				try {
					selection = await resolveApktoolCommand(environment, this.platform, signal);
					identity = await inspectApktoolClient(selection, this.#commands, {
						signal,
						environment,
						platform: this.platform
					});
				} catch (cause) {
					if (cause instanceof AnalysisError) return err(analysisClientFailureForOperation(cause, "apktool", request.operation));
					if (cause instanceof ApktoolConfigurationFailure) {
						return err(providerConfigurationRefusal(APKTOOL_PROVIDER_IDENTITY.id, request.operation, cause));
					}
					return err(new AnalysisProtocolError(`apktool version probe failed for ${request.operation}`, { cause }));
				}
				if (signal.aborted) return err(cancelledBy(request.operation, signal));
				const client = {
					command: selection.command,
					command_source: selection.commandSource,
					apktool_version: identity.version
				};
				const provider = {
					...APKTOOL_PROVIDER_IDENTITY,
					version: identity.version
				};
				if (request.operation === "inspect_apktool_client") return ok(createAnalysisExecution({ client }, provider, { limitations: identity.limitations }));
				return this.decodeResources(request.operation, selection, environment, client, provider, request.input, identity.limitations, signal);
			}
			#track(operation) {
				const settled = operation.then(() => undefined, () => undefined);
				this.#active.add(settled);
				void settled.then(() => this.#active.delete(settled));
				return operation;
			}
			async #drainAndClean() {
				await Promise.all(this.#active);
				const failures = [];
				for (const close of [() => this.#commands.close(), () => this.#artifacts.close()]) {
					try {
						await close();
					} catch (cause) {
						failures.push(analysisClientFailureForOperation(cause, "apktool", "close"));
					}
				}
				const first = failures.shift();
				if (first === undefined) return;
				throw failures.reduce((primary, cleanup) => analysisErrorWithCleanupDependencies(primary, cleanup, "close"), first);
			}
			async decodeResources(operation, selection, environment, client, provider, input, clientLimitations, signal) {
				const runtime = await PrivateRuntimeRoot.create({ prefix: "rea-apktool-" });
				const resources = new ApktoolWorkspace(runtime, this.#commands, this.removeWorkspace);
				const root = resources.path;
				const workspace = join(root, "decoded");
				const snapshot = join(root, "input.apk");
				const framework = join(root, "framework");
				const lease = new AnalysisCleanupLease(() => resources.close(), [root]);
				const owner = {
					kind: "lease",
					resource: root,
					lease
				};
				this.#artifacts.retain(owner);
				let result;
				let completedDecode;
				let stoppedAt = "metadata";
				const limitations = [...clientLimitations, "Decoding skips smali (--no-src); Java-source recovery belongs to the JADX family"];
				try {
					const identity = await resources.snapshotInput(input.path, operation, signal);
					const sha256 = identity.sha256;
					await mkdir(workspace);
					await mkdir(framework);
					const decoded = await runApktool(operation, input.path, selection, [
						"d",
						"--no-src",
						"-f",
						"-o",
						workspace,
						"--frame-path",
						framework,
						snapshot
					], {
						timeoutMs: input.decode_timeout_ms ?? 6e5,
						maxOutputBytes: DECODE_MAX_OUTPUT_BYTES
					}, signal, environment, this.#commands, root, this.platform);
					if (!decoded.ok) {
						throw decoded.error;
					}
					completedDecode = {
						client,
						target: {
							path: input.path,
							bytes: identity.bytes,
							sha256
						},
						locale: input.locale ?? null,
						coverage: "partial"
					};
					throwIfCancelled(operation, signal);
					const yml = await resources.readText(join(workspace, "apktool.yml"), MANIFEST_MAX_BYTES, signal);
					if (yml.text === null || yml.truncated) {
						throw new AnalysisProtocolError(`apktool produced missing or oversized apktool.yml: ${input.path}`);
					}
					const metadata = parseApktoolYml(yml.text);
					completedDecode.metadata = {
						version_name: metadata.versionName,
						version_code: metadata.versionCode,
						min_sdk_version: metadata.minSdkVersion,
						target_sdk_version: metadata.targetSdkVersion
					};
					stoppedAt = "manifest";
					const manifestRead = await resources.readText(join(workspace, "AndroidManifest.xml"), MANIFEST_MAX_BYTES, signal);
					const manifest = manifestRead.text;
					completedDecode.manifest = manifest;
					if (manifestRead.truncated) {
						limitations.push(`manifest is truncated at ${String(MANIFEST_MAX_BYTES)} bytes`);
					}
					const packageName = manifest === null || manifestRead.truncated ? null : parseManifestPackage(manifest);
					completedDecode.metadata.package_name = packageName;
					stoppedAt = "inventory";
					const inventory = await countDecodedFiles(resources, workspace, signal, MAX_DECODED_ENTRIES_VISITED);
					const files = inventory.ok ? inventory.value : inventory.error.partial;
					completedDecode.locales = [...files.locales];
					completedDecode.decoded_file_count = files.count;
					if (files.unreadableStringsTables.length > 0) {
						limitations.push(`String tables omitted because they are not regular files: ${files.unreadableStringsTables.map((table) => `${JSON.stringify(table.path)} (${table.kind})`).join(", ")}`);
					}
					if (files.otherStringsTables.length > 0) {
						limitations.push(`Other strings tables are not selected by locale; their resource configuration suffixes are preserved without inferring Android runtime matching: ${files.otherStringsTables.map((table) => JSON.stringify(table)).join(", ")}`);
					}
					if (files.capped) {
						limitations.push(`Decoded workspace enumeration stopped after ${String(MAX_DECODED_ENTRIES_VISITED)} entries; decoded_file_count and locales may be partial`);
					}
					if (!inventory.ok) throw inventory.error.cause;
					throwIfCancelled(operation, signal);
					stoppedAt = "string projection";
					const projection = await projectApktoolStringTables(resources, workspace, input, signal);
					const projectedStrings = projection.ok ? projection.value : projection.error.partial;
					limitations.push(...projectedStrings.limitations);
					const coverage = projectedStrings.coverage === "partial" || manifestRead.truncated || files.capped || files.unreadableStringsTables.length > 0 ? "partial" : "complete";
					completedDecode.strings = [...projectedStrings.strings];
					if (apktoolStringTablesRequested(input)) completedDecode.string_tables = [...projectedStrings.tables];
					completedDecode.coverage = coverage;
					if (!projection.ok) throw projection.error.cause;
					result = ok(createAnalysisExecution(apktoolResultSchemas.decode_android_resources.parse(completedDecode), provider, {
						subject: {
							path: input.path,
							sha256,
							format: "apk"
						},
						limitations
					}));
				} catch (cause) {
					const { cause: physical, origin } = artifactFilePrimaryFacts(cause);
					const primary = origin === "owned-or-classified" && physical instanceof AnalysisError ? physical : origin === "owned-or-classified" && physical instanceof ArtifactReaderFailure && physical.reason === "cancelled" ? cancelledBy(operation, carriedReason(artifactFileCancellationCause(physical))) : new AnalysisProtocolError("Apktool resource projection failed", { cause: physical });
					const failure = analysisClientFailureForOperation(cause, "apktool", operation);
					if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined && !(cause instanceof ArtifactFileCleanupFailure)) new AnalysisCleanupLeaseGroup(failure, [lease]);
					const retained = physical === cause && cause instanceof AnalysisError ? cause : failure.cleanupIncomplete ? analysisErrorWithCleanupDependencies(primary, failure, operation) : primary;
					if (completedDecode !== undefined && retained.partialObservation === undefined) {
						limitations.push(`Decode observation stopped during ${stoppedAt}; fields not yet observed are omitted`);
						const partialExecution = createAnalysisExecution({
							...completedDecode,
							coverage: "partial"
						}, provider, {
							subject: {
								path: input.path,
								sha256: completedDecode.target.sha256,
								format: "apk"
							},
							limitations
						});
						retained.retainPartialObservation(createAnalysisExecutionEvidence(operation, input, partialExecution, "observed"));
					}
					if (resources.snapshot !== undefined && retained.partialObservation === undefined) retained.retainPartialObservation({
						kind: "file-snapshot-hash",
						...resources.snapshot
					});
					result = err(retained);
				}
				const completed = result;
				return finalizedResult(await runOwned(async () => completed, {
					providerId: "apktool",
					operation,
					signal,
					close: async () => {
						const released = await this.#artifacts.release(owner);
						if (released.kind === "failed") throw new ProviderCleanupError("apktool", [root], {}, {
							operation,
							cause: released.cause
						});
					},
					cleanupLeases: [lease],
					partial: (execution) => createAnalysisExecutionEvidence(operation, input, execution, "observed")
				}));
			}
		};
	})))();
}

//#endregion
//#region dist/composition/apktool.js
var createApktoolResourceAnalysisProvider;
function init_apktool() {
	return (init_apktool = __esmMin((() => {
		init_ApktoolProvider();
		init_HostPlatform();
		createApktoolResourceAnalysisProvider = (environment = process.env, platform = HOST_PLATFORM.platform) => new ApktoolProvider({
			environment,
			platform
		});
	})))();
}

//#endregion
//#region dist/cli/apktoolCommands.js
var apktoolCommands_exports = /* @__PURE__ */ __exportAll({ registerApktoolCommands: () => registerApktoolCommands });
var registerApktoolCommands;
function init_apktoolCommands() {
	return (init_apktoolCommands = __esmMin((() => {
		init_ApktoolResourceAnalysisService();
		init_apktool();
		init_apktoolToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_cliEvidenceCallerPath();
		init_projectCliAnalysisResult();
		registerApktoolCommands = (cli, logger, environment, provider = createApktoolResourceAnalysisProvider(environment)) => {
			const service = new ApktoolResourceAnalysisService(provider);
			const run = (operation) => () => ({
				inspect: (input, { signal }) => service.execute(operation, input, { signal }),
				close: () => provider.close()
			});
			registerContractCommand(cli, logger, contractNamed(APKTOOL_TOOL_CONTRACTS, "inspect_apktool_client"), { description: "Inspect the caller-selected apktool launcher without decoding anything" }, analyzeWithService(run("inspect_apktool_client"), "apktool"));
			registerContractCommand(cli, logger, contractNamed(APKTOOL_TOOL_CONTRACTS, "decode_android_resources"), {
				description: "Decode one APK's manifest, metadata, and string resources with apktool",
				positionals: ["path"],
				fields: {
					include_strings: {
						name: "strings",
						description: "Include string resources; use --no-strings to skip projecting them"
					},
					locales: { description: "Repeat to project multiple localized string tables, e.g. --locales de --locales pt-BR" }
				}
			}, (input, { operation, signal }) => {
				const owned = run("decode_android_resources")();
				return finishCliEvidenceCommand(input.path, () => owned.inspect(input, { signal }), owned, "apktool", operation, signal).then(projectCliAnalysisResult);
			});
		};
	})))();
}

//#endregion
export { apktoolCommands_exports, init_apktoolCommands };