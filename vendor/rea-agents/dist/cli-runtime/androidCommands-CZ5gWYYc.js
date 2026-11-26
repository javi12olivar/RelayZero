import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, OwnerCancellation, cancelledBy, carriedReason, decodeLimit, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation, init_jsonValue, init_parseFailure, init_sha256Hex, jsonObjectSchema, jsonValueSchema, malformedInput, sha256Hex, truncatedInput } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, decodeStrictUtf8, init_HostPlatform, init_internalInvariant, init_strictUtf8, init_zstandardFrameAllowance, invariantViolation, zstandardFrameAllowanceCause } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryFormatFailure, BinaryMappingFailure, BinaryResourceFailure, createFileMappingIndex, init_binaryContainer, isBinaryStringReadLimit } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisOperationInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, ArtifactReaderFailure, ArtifactResourceScope, OwnedFileHandle, RegularFileAdmissionFailure, RegularFileCancelled, RegularFileChangedError, RegularFileCleanupFailure, ZipArtifactReader, artifactFileCancellationCause, artifactFilePrimaryFacts, assertRegularFileActive, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedFileHandle, init_OwnedRegularFile, init_RegularFile, init_StableArtifactFailure, init_StreamBytes, init_ZipArtifactReader, init_readStableArtifact, init_resources, isSelectedRegularFileError, openRegularFile, projectStableArtifactFailure, readStableArtifact, readerIntegrityFailure, regularFileCancellation, sameRegularFileState, stableArtifactInputRecovery, streamChunkToBuffer, withOwnedFileHandle, yieldArtifactRead } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_jsonDuplicateMember, init_providerCleanupError, parseJsonWithDuplicatePolicy } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { createEvidence, evidenceSubjectInput, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { contractNamed, deliverCliAnalysisEvidence, init_analysisEvidenceDelivery, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { ANDROID_COMPONENT_KINDS, ANDROID_JNI_REPORT_BYTES, ANDROID_MAPPING_LIMITS, androidMappingLimitations, androidMethodSelectorSchema, androidNativeDeclarationsSchema, androidRequestSchema, androidResultSchemas, compileAndroidJniLibrarySelection, dexDescriptorSchema, dexStaticValueSchema, dexTypeSchema, init_androidAnalysis, init_androidJniBindings, init_androidManifestComponents, init_androidMapping, init_androidNativeDeclarations, init_dexTypes, init_proguardMapping, parseProguardMapping, projectAndroidJniBindings, projectAndroidMapping } from "./analysisViewResult-vDCF9Pxo.js";
import { finishCliEvidenceCommand, init_cliEvidenceCallerPath } from "./cliEvidenceCallerPath-BMrJ1VvW.js";
import { XML_LINE_ENDING, init_xmlDocument, isUnqualifiedXmlElement } from "./xmlDocument-DuM0TF5n.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { AnalysisCleanupRelease, init_analysisCleanupRelease } from "./analysisCleanupRelease-ME3hxZPc.js";
import { StableFileHashFailure, hashStableFile, init_StableFileHash, stableFileHashCause } from "./StableFileHash-BELT4STG.js";
import { init_elfImage, readElfImageFromDirectory } from "./elfImage-cCQspBBH.js";
import { init_nativeSectionDirectory, readElfDirectoryFromBuffer, readElfDirectoryFromBufferCooperative } from "./nativeSectionDirectory-FUNOhzEu.js";
import { ElfPointerRelocationFailure, init_elfPointerRelocations, readElfPointerRelocationsSteps } from "./elfPointerRelocations-mNe84IFG.js";
import { init_nativeExportParser, parseElfExportsFromDirectorySteps } from "./nativeExportParser-DHm2sf11.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { init_BinaryTargetResolver, parseBinaryTarget } from "./BinaryTargetResolver-DJfoiHmh.js";
import { analysisClientFailureForOperation, init_AnalysisClientFailure } from "./AnalysisClientFailure-DEt-O8Hp.js";
import { JADX_BRIDGE_SOURCE_URL, JADX_HEAP_REMEDIATION, JADX_LIMITATIONS, JADX_PROVIDER_IDENTITY, JADX_RELEASE, JadxInterruption, init_JadxConfiguration, init_JadxInterruption, init_JadxOperationTimeout, init_JadxRelease, inspectJadxAvailability, jadxBridgeIdentity, jadxOperationTimeoutGuidance, resolveJadxConfigurationInputs, resolveJadxOperationTimeout, throwIfJadxInterrupted, validateJadxConfiguration } from "./JadxConfiguration-D6Tl50Zm.js";
import { Utf8NdjsonLineBuffer, init_Utf8NdjsonLineBuffer } from "./Utf8NdjsonLineBuffer-BoHCe-8R.js";
import { OwnedMcpClient, init_OwnedMcpClient } from "./OwnedMcpClient-OmwCR7CK.js";
import { init_decodedAndroidManifest, parseDecodedAndroidManifest } from "./decodedAndroidManifest-DkoJmQjR.js";
import { OwnedMcpStdioTransport, init_OwnedMcpStdioTransport } from "./OwnedMcpStdioTransport-Bgf2cvdE.js";
import { ANDROID_TOOL_CONTRACTS, init_androidToolContracts } from "./androidToolContracts-LEcMJlru.js";
import { join, win32 } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { Transform } from "node:stream";
import { createHash } from "node:crypto";
import { chmod, copyFile, lstat, open, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { setImmediate } from "node:timers/promises";
import { spawn } from "node:child_process";
import { pipeline as pipeline$1 } from "node:stream/promises";

//#region dist/application/android/AndroidSearchEvidenceSummary.js
var summarizeRetainedAndroidSearch;
function init_AndroidSearchEvidenceSummary() {
	return (init_AndroidSearchEvidenceSummary = __esmMin((() => {
		init_evidence();
		init_result();
		summarizeRetainedAndroidSearch = (evidence, summary, recordEvidence) => {
			if (recordEvidence === undefined) return ok(evidence);
			const recorded = recordEvidence(evidence);
			if (!recorded.ok) return recorded;
			return ok(createEvidence(evidenceSubjectInput(evidence.subject), evidence.provider, {
				operation: evidence.operation,
				parameters: evidence.parameters,
				result: evidence.normalized_result,
				rawResult: {
					...summary,
					complete_evidence_id: evidence.evidence_id
				},
				confidence: evidence.confidence,
				...evidence.analysis_profile === null ? {} : { analysisProfile: evidence.analysis_profile },
				...evidence.relationship_coverage === null ? {} : { relationshipCoverage: evidence.relationship_coverage },
				limitations: evidence.limitations,
				locations: evidence.locations,
				evidenceLinks: [evidence.evidence_id]
			}));
		};
	})))();
}

//#endregion
//#region dist/application/android/AndroidAnalysisService.js
var AndroidAnalysisService;
function init_AndroidAnalysisService() {
	return (init_AndroidAnalysisService = __esmMin((() => {
		init_inputIssueProjection();
		init_AndroidSearchEvidenceSummary();
		init_BinaryTargetResolver();
		init_androidAnalysis();
		init_analysisErrorCore();
		init_analysisObservation();
		init_result();
		init_ProviderOperationExecution();
		AndroidAnalysisService = class {
			provider;
			recordEvidence;
			constructor(provider, recordEvidence) {
				this.provider = provider;
				this.recordEvidence = recordEvidence;
			}
			/** Inspect a caller-selected APK and retain producing-provider provenance inline. */
			async execute(operation, input, options) {
				if (options?.signal?.aborted === true) return err(cancelledBy(operation, options.signal));
				const request = androidRequestSchema.safeParse({
					operation,
					input
				});
				if (!request.success) return err(analysisOperationInputErrorFromIssues(operation, request.error.issues, input, request.error));
				const target = await parseBinaryTarget(request.data.input.path, options?.signal === undefined ? {} : { signal: options.signal });
				if (!target.ok) return target;
				const executed = await this.provider.execute(target.value, request.data, options);
				if (!executed.ok) return executed;
				const execution = executed.value;
				const completed = completeProviderEvidence(createAnalysisExecutionEvidence(operation, request.data.input, {
					...execution,
					subject: execution.subject === undefined ? target.value : execution.subject
				}, operation === "inspect_android_method" || operation === "inspect_android_jni_bindings" ? "derived" : "observed"), options?.signal);
				if (!completed.ok || operation !== "search_android_classes" || execution.searchRawSummary === undefined) return completed;
				return summarizeRetainedAndroidSearch(completed.value, execution.searchRawSummary, this.recordEvidence);
			}
		};
	})))();
}

//#endregion
//#region dist/android/AndroidMappingFile.js
var mappingInterruption, invalidMapping, readFailurePrimary, readFailure, readAndroidMapping;
function init_AndroidMappingFile() {
	return (init_AndroidMappingFile = __esmMin((() => {
		init_resources();
		init_androidMapping();
		init_proguardMapping();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_result();
		init_RegularFile();
		init_JadxOperationTimeout();
		init_strictUtf8();
		init_errorMessage();
		mappingInterruption = (read, cause) => read.deadline?.timeout.aborted === true && cause === read.deadline.timeout.reason ? new AnalysisTimeoutError(read.operation, read.deadline.timeoutMs, {
			cause,
			...jadxOperationTimeoutGuidance(read.deadline.timeoutMs)
		}) : cancelledBy(read.operation, carriedReason(cause));
		invalidMapping = (read, reason, message, options) => new AnalysisInputError(read.operation, options, [{
			path: ["mapping_path"],
			reason,
			message
		}]);
		readFailurePrimary = (cause, read) => {
			const facts = artifactFilePrimaryFacts(cause);
			const primary = facts.cause;
			const owned = facts.origin === "owned-or-classified" && primary instanceof ArtifactReaderFailure ? primary : undefined;
			if (owned?.reason === "cancelled") return mappingInterruption(read, artifactFileCancellationCause(owned));
			if (owned?.reason === "limit") return new AnalysisResourceConstraintError(read.operation, "file-size", owned.message, { maximum_bytes: ANDROID_MAPPING_LIMITS.fileBytes }, {
				cause: owned,
				retryable: false,
				remediationAction: "Select a mapping file within the fixed mapping byte limit."
			});
			if (owned?.reason === "integrity") return readerIntegrityFailure(read.operation, read.path, owned);
			if (owned?.reason === "path") return invalidMapping(read, "invalid_value", owned.message, {
				cause: owned,
				...stableArtifactInputRecovery(owned)
			});
			if (primary instanceof Error && "code" in primary) {
				if (primary.code === "EACCES" || primary.code === "EPERM") return new AnalysisAccessDeniedError(read.operation, read.path, primary.code, { cause: primary });
				if (isSelectedRegularFileError(primary)) return invalidMapping(read, "invalid_value", `Selected mapping file could not be read (${primary.code}): ${read.path}`, { cause: primary });
			}
			if (owned?.reason === "unavailable" && owned.cleanup === undefined && read.signal.aborted) return mappingInterruption(read, read.signal.reason);
			return new ProviderAdapterError("jadx", read.operation, {
				cause: primary,
				diagnostics: {
					mapping_path: read.path,
					reason: errorMessage(primary)
				}
			});
		};
		readFailure = (cause, read) => {
			const primary = readFailurePrimary(cause, read);
			if (read.signal.aborted && !(primary instanceof AnalysisCancelledError) && !(primary instanceof AnalysisTimeoutError)) primary.retainSecondaryFailure(mappingInterruption(read, read.signal.reason));
			return projectStableArtifactFailure(cause, primary, read.path, "jadx", read.operation);
		};
		readAndroidMapping = async (path, operation, resources, signal, cached, deadline) => {
			const read = {
				path,
				operation,
				signal,
				deadline
			};
			let snapshot;
			try {
				snapshot = await resources.run(() => readStableArtifact(path, ANDROID_MAPPING_LIMITS.fileBytes, signal, undefined, resources));
			} catch (cause) {
				return err(readFailure(cause, read));
			}
			const file = {
				path,
				sha256: snapshot.sha256,
				bytes: snapshot.bytes.length
			};
			if (cached?.file.sha256 === file.sha256 && cached.file.bytes === file.bytes) return ok({
				file,
				mapping: cached.mapping
			});
			const malformed = (message) => err(invalidMapping(read, "invalid_format", message, { diagnostics: { mapping_sha256: snapshot.sha256 } }));
			let text;
			try {
				text = decodeStrictUtf8(snapshot.bytes, "strip-signature");
			} catch {
				return malformed(`Mapping file is not valid UTF-8: ${path}`);
			}
			const mapping = parseProguardMapping(text, ANDROID_MAPPING_LIMITS);
			if (!mapping.ok) {
				if (mapping.error.kind === "capacity") {
					const { cause, line } = mapping.error;
					const { detail, limit } = cause.failure;
					return err(new AnalysisResourceConstraintError(operation, limit.name === "projection" ? "transport" : "memory", detail, {
						limit_bytes: limit.maximum,
						line
					}, {
						cause,
						retryable: false,
						diagnostics: {
							mapping_path: path,
							mapping_sha256: file.sha256
						},
						remediationAction: "Select a smaller mapping index or a mapping with a smaller per-class projection."
					}));
				}
				return malformed(`Mapping file has no R8/ProGuard class records: ${path}`);
			}
			return ok({
				file,
				mapping: mapping.value
			});
		};
	})))();
}

//#endregion
//#region dist/android/JadxWorkspaceRoot.js
var localDrivePath, guardianSource, readySchema, GUARDIAN_READINESS_BYTES, readGuardianReadiness, boundedWait, releaseGuardianReferences, WindowsJadxWorkspaceRoot, createJadxWorkspaceRoot;
function init_JadxWorkspaceRoot() {
	return (init_JadxWorkspaceRoot = __esmMin((() => {
		init_internalInvariant();
		init_jsonDuplicateMember();
		init_parseFailure();
		init_PrivateRuntimeRoot();
		init_Utf8NdjsonLineBuffer();
		localDrivePath = (path) => path.replace(/^\\\\\?\\(?=[A-Za-z]:\\)/u, "");
		guardianSource = fileURLToPath(new URL("../../scripts/rea-android-workspace-guardian.mjs", new URL("../android/JadxWorkspaceRoot.js", import.meta.url).href));
		readySchema = z.strictObject({
			path: z.string(),
			volumeSerial: z.string().regex(/^[a-f0-9]{16}$/u),
			fileId: z.string().regex(/^[a-f0-9]{32}$/u),
			privateDacl: z.literal(true)
		});
		GUARDIAN_READINESS_BYTES = 4096;
		readGuardianReadiness = async (stdout) => {
			const format = "android-workspace-guardian";
			const frames = new Utf8NdjsonLineBuffer(() => GUARDIAN_READINESS_BYTES - 1);
			for await (const chunk of stdout.iterator({ destroyOnReturn: false })) {
				if (!Buffer.isBuffer(chunk)) throw invariantViolation("Android workspace guardian stdout did not provide bytes");
				for (const line of frames.pushRaw(chunk)) {
					if (line.ok) return line.value;
					if (line.error.failure.kind === "limit") throw decodeLimit(format, "Android workspace guardian readiness exceeded 4 KiB", {
						name: "guardian-readiness-bytes",
						maximum: GUARDIAN_READINESS_BYTES
					}, { cause: line.error });
					throw malformedInput(format, "Android workspace guardian readiness is not valid UTF-8", { cause: line.error });
				}
			}
			throw truncatedInput(format, "Android workspace guardian stdout ended before readiness");
		};
		boundedWait = async (promise, milliseconds, label) => {
			let timer;
			try {
				return await Promise.race([promise, new Promise((_resolve, reject) => {
					timer = setTimeout(() => reject(new Error(label)), milliseconds);
				})]);
			} finally {
				clearTimeout(timer);
			}
		};
		releaseGuardianReferences = (child) => {
			child.stdin.destroy();
			child.stdout.destroy();
			child.stderr.destroy();
			child.unref();
		};
		WindowsJadxWorkspaceRoot = class WindowsJadxWorkspaceRoot {
			path;
			#failure = new AbortController();
			failureSignal = this.#failure.signal;
			#child;
			#exit;
			#diagnostics;
			#closing = false;
			#closePromise;
			constructor(path, child, exit, diagnostics) {
				this.path = path;
				this.#child = child;
				this.#exit = exit;
				this.#diagnostics = diagnostics;
				void this.#exit.then((result) => {
					if (!this.#closing) this.#failure.abort(new Error(`Android workspace guardian exited before cleanup: ${result.error?.message ?? result.code ?? result.signal ?? "unknown"}`));
				});
			}
			static async create() {
				const parent = tmpdir();
				const child = spawn(process.execPath, [guardianSource, parent], {
					detached: true,
					windowsHide: true,
					stdio: [
						"pipe",
						"pipe",
						"pipe"
					],
					env: {
						SystemRoot: process.env.SystemRoot,
						WINDIR: process.env.WINDIR,
						TEMP: parent,
						TMP: parent
					}
				});
				let diagnostics = "";
				child.stderr.setEncoding("utf8");
				child.stderr.on("data", (chunk) => {
					diagnostics = (diagnostics + chunk).slice(-8192);
				});
				const exit = new Promise((resolve) => {
					child.once("error", (error) => resolve({
						code: null,
						signal: null,
						error
					}));
					child.once("close", (code, signal) => resolve({
						code,
						signal
					}));
				});
				child.stdout.on("error", () => undefined);
				const ready = readGuardianReadiness(child.stdout);
				try {
					const line = await boundedWait(Promise.race([ready, exit.then((result) => {
						throw new Error(`Android workspace guardian exited during startup: ${result.error?.message ?? result.code ?? result.signal ?? "unknown"}; ${diagnostics}`);
					})]), 15e3, "Android workspace guardian startup timed out");
					const decoded = parseJsonWithDuplicatePolicy(line, "reject");
					const observation = readySchema.parse(decoded.ok ? decoded.value : null);
					if (win32.dirname(localDrivePath(observation.path)).toLowerCase() !== localDrivePath(win32.resolve(parent)).toLowerCase() || !/^rea-android-[a-f0-9]{32}$/u.test(win32.basename(observation.path))) throw new Error("Android workspace guardian returned an unexpected root");
					child.stdout.resume();
					return new WindowsJadxWorkspaceRoot(observation.path, child, exit, () => diagnostics);
				} catch (cause) {
					if (!child.stdin.destroyed) child.stdin.end();
					try {
						await boundedWait(exit, 3e4, "Android workspace guardian did not settle after startup failure");
					} catch (cleanupFailure) {
						throw new AggregateError([cause, cleanupFailure], "Android workspace guardian startup and cleanup failed");
					} finally {
						releaseGuardianReferences(child);
					}
					throw cause;
				}
			}
			close() {
				this.#closing = true;
				this.#closePromise ??= this.#finish().catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #finish() {
				if (!this.#child.stdin.destroyed) this.#child.stdin.end();
				let result;
				try {
					result = await boundedWait(this.#exit, 12e4, `Android workspace guardian cleanup timed out for ${this.path}`);
				} catch (cause) {
					releaseGuardianReferences(this.#child);
					throw cause;
				}
				if (result.error !== undefined || result.code !== 0) throw new Error(`Android workspace guardian cleanup failed for ${this.path}: ${result.error?.message ?? result.code ?? result.signal ?? "unknown"}; ${this.#diagnostics()}`);
				try {
					await lstat(this.path);
				} catch (cause) {
					if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return;
					throw cause;
				}
				throw new Error(`Android workspace guardian exited but retained ${this.path}`);
			}
		};
		createJadxWorkspaceRoot = (platform) => platform === "win32" ? WindowsJadxWorkspaceRoot.create() : PrivateRuntimeRoot.create({ prefix: "rea-android-" });
	})))();
}

//#endregion
//#region dist/android/AndroidTargetSnapshot.js
var androidSnapshotCopy, snapshotAndroidTarget, snapshotAndroidEngine, adoptSnapshotHandle, copyAndroidSnapshot, openSnapshotSource, retainAdmissionOwner, projectSnapshotFailure, verifySourceState, AndroidSnapshotChangedError;
function init_AndroidTargetSnapshot() {
	return (init_AndroidTargetSnapshot = __esmMin((() => {
		init_analysisErrorCore();
		init_OwnedFileHandle();
		init_OwnedRegularFile();
		init_RegularFile();
		androidSnapshotCopy = (value) => typeof value === "object" && value !== null && "kind" in value && value.kind === "android-snapshot-copy" && "sha256" in value && typeof value.sha256 === "string" && "sourcePath" in value && typeof value.sourcePath === "string" && "snapshotPath" in value && typeof value.snapshotPath === "string" && "bytes" in value && typeof value.bytes === "number" ? {
			kind: "android-snapshot-copy",
			sha256: value.sha256,
			sourcePath: value.sourcePath,
			snapshotPath: value.snapshotPath,
			bytes: value.bytes
		} : undefined;
		snapshotAndroidTarget = async (path, sha256, root, operation, signal, retainFailedClose) => {
			const snapshot = join(root, "target.apk");
			try {
				await copyAndroidSnapshot(path, snapshot, sha256, signal, retainFailedClose);
				assertRegularFileActive(signal);
				await chmod(snapshot, 256);
				return snapshot;
			} catch (cause) {
				throw projectSnapshotFailure(cause, (changed) => new AnalysisInputError(operation, { cause: changed }, [{
					path: ["path"],
					reason: "invalid_value",
					message: `APK bytes changed after admission at ${path}; retry against a stable file.`
				}]));
			}
		};
		snapshotAndroidEngine = async (source, sha256, root, operation, signal, retainFailedClose) => {
			const path = join(root, "engine.jar");
			try {
				const observed = await copyAndroidSnapshot(source, path, sha256, signal, retainFailedClose);
				assertRegularFileActive(signal);
				await chmod(path, 256);
				return {
					path,
					sha256: observed.sha256
				};
			} catch (cause) {
				throw projectSnapshotFailure(cause, (changed) => new AnalysisCapabilityUnavailableError("jadx", operation, `REA_JADX_MCP_JAR bytes changed during admission at ${source}; retry with a stable engine file.`, { cause: changed }));
			}
		};
		adoptSnapshotHandle = (handle) => {
			const close = handle.close.bind(handle);
			const owner = new OwnedFileHandle({
				get fd() {
					return handle.fd;
				},
				close
			});
			handle.close = () => owner.close();
			return {
				handle,
				owner
			};
		};
		copyAndroidSnapshot = async (sourcePath, snapshotPath, expectedSha256, signal, retainFailedClose) => {
			assertRegularFileActive(signal);
			let removeSnapshot = false;
			const retain = (path) => ({ retainFailedClose: (owner) => retainFailedClose(path, owner) });
			try {
				const { handle, initial } = await openSnapshotSource(sourcePath, signal, retain(sourcePath));
				const source = adoptSnapshotHandle(handle);
				return await withOwnedFileHandle(sourcePath, source.owner, {
					...signal === undefined ? {} : { signal },
					...retain(sourcePath)
				}, async () => {
					assertRegularFileActive(signal);
					let copiedBytes = 0;
					const hash = createHash("sha256");
					const digest = new Transform({ transform(chunk, _encoding, callback) {
						copiedBytes += chunk.length;
						if (copiedBytes > initial.size) {
							callback(new AndroidSnapshotChangedError(`Android input grew while being copied: ${sourcePath}`));
							return;
						}
						hash.update(chunk);
						callback(null, chunk);
					} });
					assertRegularFileActive(signal);
					const destination = adoptSnapshotHandle(await open(snapshotPath, "wx", 384));
					let copyCompleted = false;
					try {
						return await withOwnedFileHandle(snapshotPath, destination.owner, {
							...signal === undefined ? {} : { signal },
							...retain(snapshotPath)
						}, async () => {
							let inputStream;
							let outputStream;
							try {
								assertRegularFileActive(signal);
								inputStream = source.handle.createReadStream({
									start: 0,
									end: initial.size,
									autoClose: false
								});
								outputStream = destination.handle.createWriteStream({ autoClose: false });
								await pipeline$1(inputStream, digest, outputStream, { signal });
								assertRegularFileActive(signal);
								await verifySourceState(source.handle, sourcePath, initial, copiedBytes);
								const observedSha256 = hash.digest("hex");
								if (observedSha256 !== expectedSha256) throw new AndroidSnapshotChangedError(`Android snapshot digest mismatch for ${sourcePath}`);
								copyCompleted = true;
								return {
									kind: "android-snapshot-copy",
									sha256: observedSha256,
									sourcePath,
									snapshotPath,
									bytes: copiedBytes
								};
							} finally {
								for (const stream of [inputStream, outputStream]) {
									stream?.on("error", () => undefined);
									stream?.destroy();
								}
							}
						});
					} finally {
						if (!copyCompleted) removeSnapshot = true;
					}
				});
			} finally {
				if (removeSnapshot) await rm(snapshotPath, { force: true }).catch(() => undefined);
			}
		};
		openSnapshotSource = async (path, signal, retention) => {
			try {
				return await openRegularFile(path, {
					symlinks: "follow",
					signal
				});
			} catch (cause) {
				if (!(cause instanceof RegularFileAdmissionFailure)) throw cause;
				throw new RegularFileCleanupFailure({
					path,
					owner: cause.owner,
					outcome: {
						kind: "failed",
						cause: cause.cause
					},
					cleanupCause: cause.cleanupCause,
					retention: retainAdmissionOwner(retention.retainFailedClose, cause.owner)
				});
			}
		};
		retainAdmissionOwner = (retain, owner) => {
			try {
				retain(owner);
				return { kind: "callback_returned" };
			} catch (cause) {
				return {
					kind: "callback_threw",
					cause
				};
			}
		};
		projectSnapshotFailure = (cause, projectChanged) => {
			if (cause instanceof AndroidSnapshotChangedError) return projectChanged(cause);
			if (!(cause instanceof RegularFileCleanupFailure) || cause.outcome.kind !== "failed") return cause;
			const projected = projectSnapshotFailure(cause.outcome.cause, projectChanged);
			if (projected === cause.outcome.cause) return cause;
			return new RegularFileCleanupFailure({
				...cause,
				outcome: {
					kind: "failed",
					cause: projected
				}
			});
		};
		verifySourceState = async (handle, path, initial, observedBytes) => {
			const [opened, currentPath] = await Promise.all([handle.stat(), stat(path)]);
			if (observedBytes !== initial.size || !sameRegularFileState(initial, opened) || !sameRegularFileState(initial, currentPath)) throw new AndroidSnapshotChangedError(`Android input changed while being read: ${path}`);
		};
		AndroidSnapshotChangedError = class extends Error {
			constructor(message, options) {
				super(message, options);
			}
		};
	})))();
}

//#endregion
//#region dist/android/AndroidManifestXml.js
var ANDROID_NAMESPACE, childNodes, isAndroidAttribute, androidAttribute, createManifestLocationReader;
function init_AndroidManifestXml() {
	return (init_AndroidManifestXml = __esmMin((() => {
		init_xmlDocument();
		ANDROID_NAMESPACE = "http://schemas.android.com/apk/res/android";
		childNodes = (element) => Array.from(element.childNodes);
		isAndroidAttribute = (attribute) => attribute.namespaceURI === ANDROID_NAMESPACE || attribute.namespaceURI === null && attribute.prefix === "android";
		androidAttribute = (element, localName) => {
			for (let index = 0; index < element.attributes.length; index += 1) {
				const attribute = element.attributes.item(index);
				if (attribute === null || attribute.localName !== localName) continue;
				if (isAndroidAttribute(attribute)) return attribute.nodeValue;
			}
			return null;
		};
		createManifestLocationReader = (source) => {
			const starts = [0];
			for (const match of source.matchAll(XML_LINE_ENDING)) starts.push(match.index + match[0].length);
			return (element) => {
				const line = element.lineNumber;
				const column = element.columnNumber;
				if (line === undefined || column === undefined || line < 1 || column < 1) return null;
				const start = starts[line - 1];
				if (start === undefined) return null;
				const offset = start + column - 1;
				return source[offset] === "<" ? {
					line,
					column,
					offset
				} : null;
			};
		};
	})))();
}

//#endregion
//#region dist/android/AndroidManifestComponentDetails.js
var projectedDataAttributes, literalBoolean, declaresAction, createAndroidManifestDetailsReader;
function init_AndroidManifestComponentDetails() {
	return (init_AndroidManifestComponentDetails = __esmMin((() => {
		init_xmlDocument();
		init_AndroidManifestXml();
		projectedDataAttributes = new Set([
			"scheme",
			"host",
			"port",
			"path",
			"pathPrefix",
			"pathPattern",
			"pathAdvancedPattern",
			"pathSuffix",
			"mimeType"
		]);
		literalBoolean = (value) => value === "true" ? true : value === "false" ? false : null;
		declaresAction = (filter) => {
			for (let index = 0; index < filter.childNodes.length; index += 1) {
				const member = filter.childNodes.item(index);
				if (isUnqualifiedXmlElement(member) && member.nodeName === "action" && androidAttribute(member, "name") !== null) return true;
			}
			return false;
		};
		createAndroidManifestDetailsReader = (source, limits) => {
			const locationOf = createManifestLocationReader(source);
			let processRemaining = limits.processBytes;
			let detailsRemaining = limits.detailBytes;
			return (component, declarationIndex) => {
				let partial = false;
				let detailLimited = false;
				let processLimited = false;
				let unsupported = 0;
				let unnamedFilterMembers = 0;
				let remainingRecords = limits.intentValues;
				const take = (value) => {
					if (value === null) return null;
					const bytes = Buffer.byteLength(value);
					if (bytes > detailsRemaining) {
						partial = true;
						detailLimited = true;
						return null;
					}
					detailsRemaining -= bytes;
					return value;
				};
				const admit = () => {
					if (remainingRecords === 0) {
						partial = true;
						detailLimited = true;
						return false;
					}
					remainingRecords -= 1;
					return true;
				};
				const enabledDeclaration = androidAttribute(component, "enabled");
				const enabled = literalBoolean(enabledDeclaration);
				const grantDeclaration = component.nodeName === "provider" ? androidAttribute(component, "grantUriPermissions") : null;
				const grant = literalBoolean(grantDeclaration);
				const declaredProcess = androidAttribute(component, "process");
				let process = null;
				if (declaredProcess !== null) {
					const bytes = Buffer.byteLength(declaredProcess);
					if (bytes > processRemaining) {
						partial = true;
						processLimited = true;
					} else {
						process = declaredProcess;
						processRemaining -= bytes;
					}
				}
				const filters = [];
				const metadata = [];
				const actions = [];
				const categories = [];
				const actionNames = new Set();
				const categoryNames = new Set();
				let legacyValuesRemaining = limits.intentValues;
				let legacyTruncated = false;
				let filterCount = 0;
				let actionFilter = false;
				for (let index = 0; index < component.childNodes.length; index += 1) {
					const child = component.childNodes.item(index);
					if (!isUnqualifiedXmlElement(child)) continue;
					if (child.nodeName === "meta-data") {
						if (admit()) metadata.push({
							name: take(androidAttribute(child, "name")),
							location: locationOf(child)
						});
						continue;
					}
					if (child.nodeName !== "intent-filter") continue;
					const filterIndex = filterCount++;
					if (filterIndex >= limits.intentFilters) {
						actionFilter ||= declaresAction(child);
						partial = true;
						legacyTruncated = true;
						continue;
					}
					const filterActions = [];
					const filterCategories = [];
					const data = [];
					let filterPartial = false;
					const priority = take(androidAttribute(child, "priority"));
					for (let at = 0; at < child.childNodes.length; at += 1) {
						const member = child.childNodes.item(at);
						if (!isUnqualifiedXmlElement(member)) continue;
						if (member.nodeName === "action" || member.nodeName === "category") {
							const value = androidAttribute(member, "name");
							if (value === null) {
								unnamedFilterMembers += 1;
								filterPartial = true;
								partial = true;
								continue;
							}
							const isAction = member.nodeName === "action";
							actionFilter ||= isAction;
							const names = isAction ? actionNames : categoryNames;
							if (!names.has(value)) {
								if (legacyValuesRemaining === 0) legacyTruncated = true;
								else {
									legacyValuesRemaining -= 1;
									names.add(value);
									(isAction ? actions : categories).push(value);
								}
							}
							if (!admit()) {
								filterPartial = true;
								continue;
							}
							const copied = take(value);
							if (copied === null) {
								filterPartial = true;
								continue;
							}
							(isAction ? filterActions : filterCategories).push(copied);
						} else if (member.nodeName === "data") {
							if (!admit()) {
								filterPartial = true;
								continue;
							}
							for (let attributeIndex = 0; attributeIndex < member.attributes.length; attributeIndex += 1) {
								const attribute = member.attributes.item(attributeIndex);
								if (attribute !== null && isAndroidAttribute(attribute) && (attribute.localName === null || !projectedDataAttributes.has(attribute.localName))) {
									unsupported += 1;
									filterPartial = true;
									partial = true;
									break;
								}
							}
							data.push({
								location: locationOf(member),
								scheme: take(androidAttribute(member, "scheme")),
								host: take(androidAttribute(member, "host")),
								port: take(androidAttribute(member, "port")),
								path: take(androidAttribute(member, "path")),
								path_prefix: take(androidAttribute(member, "pathPrefix")),
								path_pattern: take(androidAttribute(member, "pathPattern")),
								path_advanced_pattern: take(androidAttribute(member, "pathAdvancedPattern")),
								path_suffix: take(androidAttribute(member, "pathSuffix")),
								mime_type: take(androidAttribute(member, "mimeType"))
							});
						} else {
							unsupported += 1;
							filterPartial = true;
							partial = true;
						}
					}
					filters.push({
						source_index: filterIndex,
						location: locationOf(child),
						priority,
						actions: filterActions,
						categories: filterCategories,
						data,
						coverage: filterPartial || detailLimited ? "partial" : "complete"
					});
				}
				const enabledRaw = take(enabledDeclaration);
				const grantRaw = take(grantDeclaration);
				const facts = {
					declaration_index: declarationIndex,
					location: locationOf(component),
					declaration_coverage: partial ? "partial" : "complete",
					enabled,
					enabled_declaration: enabledRaw,
					process,
					grant_uri_permissions: grant,
					grant_uri_permissions_declaration: grantRaw,
					intent_filters: filters,
					meta_data: metadata
				};
				return {
					facts,
					actions,
					categories,
					filterCount,
					actionFilter,
					legacyTruncated,
					partial,
					detailLimited,
					processLimited,
					unsupported,
					unnamedFilterMembers,
					nonliteralEnabled: enabledDeclaration !== null && enabled === null,
					nonliteralGrant: grantDeclaration !== null && grant === null
				};
			};
		};
	})))();
}

//#endregion
//#region dist/android/AndroidManifestComponents.js
var ANDROID_MANIFEST_LIMITS, PARTIAL_LIMITATION, unavailable, hasSupportedAndroidPackageNameSyntax, dexSimpleNameCharacter, hasSupportedDexBinaryClassNameSyntax, containsUnresolvedToken, resolveAndroidComponentName, isComponentKind, androidTargetSdkLevel, providerAuthorities, parseAndroidManifestComponents;
function init_AndroidManifestComponents() {
	return (init_AndroidManifestComponents = __esmMin((() => {
		init_decodedAndroidManifest();
		init_xmlDocument();
		init_AndroidManifestXml();
		init_AndroidManifestComponentDetails();
		init_androidManifestComponents();
		ANDROID_MANIFEST_LIMITS = {
			components: 512,
			intentFilters: 32,
			intentValues: 64,
			authorities: 64,
			/** Total bytes of resolved component names, bounding package amplification. */
			resolvedNameBytes: 1024 * 1024,
			authorityBytes: 1024 * 1024,
			/** Total copied permission-value bytes, including inherited defaults. */
			permissionBytes: 1024 * 1024,
			/** Total copied android:process bytes across projected declarations. */
			processBytes: 1024 * 1024,
			/** Copied nested declaration values; complete text remains retained. */
			detailBytes: 1024 * 1024
		};
		PARTIAL_LIMITATION = "The decoded manifest text is truncated, so its component inventory is not established; the retained manifest is partial.";
		unavailable = (limitation) => ({
			status: "unavailable",
			items: [],
			limitations: [limitation]
		});
		hasSupportedAndroidPackageNameSyntax = (name) => name === "android" || name.length <= 223 && /^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+$/u.test(name);
		dexSimpleNameCharacter = /^[A-Za-z0-9$_\- \u00a0-\u1fff\u2000-\u200a\u2010-\u2027\u202f-\ud7ff\ue000-\uffef\u{10000}-\u{10ffff}]$/u;
		hasSupportedDexBinaryClassNameSyntax = (name) => {
			let segmentStart = true;
			let first = true;
			for (const character of name) {
				if (first && character === ".") {
					first = false;
					continue;
				}
				first = false;
				if (character === ".") {
					if (segmentStart) return false;
					segmentStart = true;
				} else {
					if (!dexSimpleNameCharacter.test(character)) return false;
					segmentStart = false;
				}
			}
			return !segmentStart;
		};
		containsUnresolvedToken = (value) => value.includes("@") || value.includes("?") || value.includes("${");
		resolveAndroidComponentName = (packageName, declared) => {
			if (declared.startsWith(".")) return `${packageName ?? ""}${declared}`;
			if (!declared.includes(".") && packageName !== null) return `${packageName}.${declared}`;
			return declared;
		};
		isComponentKind = (tag) => ANDROID_COMPONENT_KINDS.includes(tag);
		androidTargetSdkLevel = (targetSdk) => {
			if (targetSdk === null || !/^(?:[0-9]+|0x[0-9a-f]+)$/iu.test(targetSdk)) return null;
			const level = Number(targetSdk);
			return Number.isInteger(level) && level >= 1 && level <= 2147483647 ? level : null;
		};
		providerAuthorities = (declared, byteLimit) => {
			const authorities = [];
			let truncated = false;
			let bytes = 0;
			let malformed = 0;
			let start = 0;
			while (start <= declared.length) {
				const separator = declared.indexOf(";", start);
				const end = separator < 0 ? declared.length : separator;
				const value = declared.slice(start, end);
				const valueBytes = Buffer.byteLength(value);
				if (authorities.length >= ANDROID_MANIFEST_LIMITS.authorities || valueBytes > byteLimit - bytes) {
					truncated = true;
					break;
				}
				if (value.length === 0 || value !== value.trim()) malformed += 1;
				authorities.push(value);
				bytes += valueBytes;
				if (separator < 0) break;
				start = separator + 1;
			}
			return {
				authorities,
				truncated,
				bytes,
				malformed
			};
		};
		parseAndroidManifestComponents = (manifestText, coverage, declaredTargetSdk = null, minimumSdk = null) => {
			if (coverage === "partial") return {
				status: "partial",
				items: [],
				limitations: [PARTIAL_LIMITATION]
			};
			const parsed = parseDecodedAndroidManifest(manifestText, "reject");
			if (!parsed.ok) return unavailable(parsed.error.kind === "unexpected-root" ? "The decoded manifest root is not <manifest>, so its component inventory is unavailable." : `The decoded manifest is not well-formed XML (${parsed.error.failure.field ?? parsed.error.kind}), so its component inventory is unavailable.`);
			const { root, packageName: rawPackageName } = parsed.value;
			const packageName = rawPackageName?.trim() || null;
			const packageHasInvalidWhitespace = rawPackageName !== null && rawPackageName !== rawPackageName.trim();
			const packageHasUnresolvedToken = packageName !== null && containsUnresolvedToken(packageName);
			const packageHasUnsupportedPackageSyntax = packageName !== null && !packageHasUnresolvedToken && !hasSupportedAndroidPackageNameSyntax(packageName);
			const packageNameBytes = packageName === null ? 0 : Buffer.byteLength(packageName);
			const limitations = [];
			const items = [];
			let truncated = false;
			let applicationSeen = false;
			let unnamed = 0;
			let providerDefaultsUnknown = 0;
			let nonliteralExported = 0;
			let unresolvedNames = 0;
			let unresolvedPackages = 0;
			let unresolvedTargetActivities = 0;
			let unresolvedTokens = 0;
			let invalidNames = 0;
			let malformedAuthoritySegments = 0;
			let providerPermissionOverridesUnknown = 0;
			let invalidExported = 0;
			let unknownFilteredExportDefaults = 0;
			let capacityTruncated = false;
			let permissionBudgetLimited = false;
			let unresolvedPermissionTokens = 0;
			let nonliteralEnabled = 0;
			let nonliteralGrantUriPermissions = 0;
			let processBudgetLimited = false;
			let nameBudget = ANDROID_MANIFEST_LIMITS.resolvedNameBytes;
			let authorityBudget = ANDROID_MANIFEST_LIMITS.authorityBytes;
			let permissionBudget = ANDROID_MANIFEST_LIMITS.permissionBytes;
			let detailBudgetLimited = false;
			let unsupportedFilterMembers = 0;
			let unnamedFilterMembers = 0;
			const readDetails = createAndroidManifestDetailsReader(manifestText, ANDROID_MANIFEST_LIMITS);
			const children = childNodes(root);
			let targetSdkDeclared = false;
			let minimumSdkDeclared = false;
			for (const child of children) {
				if (!isUnqualifiedXmlElement(child) || child.nodeName !== "uses-sdk") continue;
				targetSdkDeclared = androidAttribute(child, "targetSdkVersion") !== null;
				minimumSdkDeclared = androidAttribute(child, "minSdkVersion") !== null;
			}
			let effectiveTargetSdk = declaredTargetSdk;
			if (effectiveTargetSdk === null && !targetSdkDeclared) {
				effectiveTargetSdk = minimumSdk;
				if (effectiveTargetSdk === null && !minimumSdkDeclared) effectiveTargetSdk = "1";
			}
			const targetSdkLevel = androidTargetSdkLevel(effectiveTargetSdk);
			const providerDefault = targetSdkLevel === null ? null : targetSdkLevel <= 16;
			for (const node of children) {
				if (!isUnqualifiedXmlElement(node)) continue;
				const element = node;
				if (element.nodeName !== "application") continue;
				applicationSeen = true;
				const precedingActivityTargetNames = new Set();
				const declaredApplicationPermission = androidAttribute(element, "permission");
				const applicationPermission = declaredApplicationPermission === null || declaredApplicationPermission.length === 0 ? null : declaredApplicationPermission;
				const applicationPermissionHasUnresolvedToken = applicationPermission !== null && containsUnresolvedToken(applicationPermission);
				const applicationPermissionBytes = applicationPermission === null ? null : Buffer.byteLength(applicationPermission);
				for (const child of childNodes(element)) {
					if (!isUnqualifiedXmlElement(child)) continue;
					const component = child;
					if (!isComponentKind(component.nodeName)) continue;
					if (items.length + unnamed >= ANDROID_MANIFEST_LIMITS.components) {
						truncated = true;
						capacityTruncated = true;
						break;
					}
					const declared = androidAttribute(component, "name");
					if (declared === null) {
						unnamed += 1;
						continue;
					}
					const unresolvedName = containsUnresolvedToken(declared);
					const details = readDetails(component, items.length + unnamed);
					const collected = {
						actions: details.actions,
						categories: details.categories,
						truncated: details.legacyTruncated
					};
					if (details.partial) truncated = true;
					if (details.detailLimited) detailBudgetLimited = true;
					unsupportedFilterMembers += details.unsupported;
					unnamedFilterMembers += details.unnamedFilterMembers;
					if (details.processLimited) {
						processBudgetLimited = true;
						capacityTruncated = true;
					}
					if (details.nonliteralEnabled) nonliteralEnabled += 1;
					if (details.nonliteralGrant) nonliteralGrantUriPermissions += 1;
					if (collected.truncated) {
						truncated = true;
						capacityTruncated = true;
					}
					const invalidDeclaredName = declared.length === 0 || !unresolvedName && !hasSupportedDexBinaryClassNameSyntax(declared);
					const needsPackage = declared.startsWith(".") || !declared.includes(".");
					const packageKnown = !invalidDeclaredName && !unresolvedName && (!needsPackage || packageName !== null && !packageHasInvalidWhitespace && !packageHasUnresolvedToken && !packageHasUnsupportedPackageSyntax);
					const declaredBytes = Buffer.byteLength(declared);
					const resolvedBytes = needsPackage && packageKnown ? packageNameBytes + (declared.startsWith(".") ? 0 : 1) + declaredBytes : declaredBytes;
					const nameFits = packageKnown && resolvedBytes <= nameBudget;
					const name = nameFits ? resolveAndroidComponentName(packageName, declared) : declared;
					if (invalidDeclaredName) invalidNames += 1;
					if (!invalidDeclaredName) {
						if (unresolvedName) unresolvedTokens += 1;
						else if (!packageKnown) unresolvedPackages += 1;
						else if (!nameFits) unresolvedNames += 1;
						else nameBudget -= resolvedBytes;
					}
					if (component.nodeName === "activity" && nameFits) {
						precedingActivityTargetNames.add(name);
						precedingActivityTargetNames.add(declared);
						if (packageName !== null && !packageHasInvalidWhitespace && !packageHasUnresolvedToken && !packageHasUnsupportedPackageSyntax && name.length > packageName.length && name.startsWith(packageName) && name[packageName.length] === ".") {
							const relativeName = name.slice(packageName.length);
							precedingActivityTargetNames.add(relativeName);
							const bareName = relativeName.slice(1);
							if (!bareName.includes(".")) precedingActivityTargetNames.add(bareName);
						}
					}
					let authorities = null;
					if (component.nodeName === "provider") {
						if (androidAttribute(component, "readPermission") !== null || androidAttribute(component, "writePermission") !== null) providerPermissionOverridesUnknown += 1;
						const declaredAuthorities = androidAttribute(component, "authorities");
						if (declaredAuthorities !== null) {
							const split = providerAuthorities(declaredAuthorities, authorityBudget);
							malformedAuthoritySegments += split.malformed;
							if (split.truncated) {
								truncated = true;
								capacityTruncated = true;
							}
							authorityBudget -= split.bytes;
							if (authorityBudget < 0) authorityBudget = 0;
							authorities = split.authorities;
						}
					}
					const declaredPermission = androidAttribute(component, "permission");
					const permissionValue = declaredPermission === null ? component.nodeName === "activity-alias" ? null : applicationPermission : declaredPermission.length === 0 ? null : declaredPermission;
					const permissionSource = permissionValue === null ? "none" : declaredPermission === null ? "application" : "component";
					let permission = permissionValue;
					let effectivePermissionSource = permissionSource;
					if (permissionValue !== null) {
						const permissionHasUnresolvedToken = declaredPermission === null ? applicationPermissionHasUnresolvedToken : containsUnresolvedToken(permissionValue);
						if (permissionHasUnresolvedToken) {
							permission = null;
							effectivePermissionSource = "unknown";
							unresolvedPermissionTokens += 1;
						} else {
							const permissionBytes = declaredPermission === null ? applicationPermissionBytes ?? 0 : Buffer.byteLength(permissionValue);
							if (permissionBytes > permissionBudget) {
								permission = null;
								effectivePermissionSource = "unknown";
								truncated = true;
								capacityTruncated = true;
								permissionBudgetLimited = true;
							} else permissionBudget -= permissionBytes;
						}
					}
					const declaredExported = androidAttribute(component, "exported");
					const targetActivity = component.nodeName === "activity-alias" ? androidAttribute(component, "targetActivity") : null;
					if (component.nodeName === "activity-alias") {
						if (targetActivity === null) {
							unresolvedTargetActivities += 1;
						} else {
							const targetNeedsPackage = targetActivity.startsWith(".") || !targetActivity.includes(".");
							const targetUnresolved = containsUnresolvedToken(targetActivity);
							const targetInvalid = targetActivity.length === 0 || !targetUnresolved && !hasSupportedDexBinaryClassNameSyntax(targetActivity);
							const targetPackageKnown = packageName !== null && !packageHasInvalidWhitespace && !packageHasUnresolvedToken && !packageHasUnsupportedPackageSyntax;
							const targetResolved = !targetInvalid && !targetUnresolved && (!targetNeedsPackage || targetPackageKnown);
							if (!targetResolved || !precedingActivityTargetNames.has(targetActivity)) unresolvedTargetActivities += 1;
						}
					}
					const exportedLiteral = declaredExported === "true" ? true : declaredExported === "false" ? false : null;
					const exportedNonliteral = declaredExported !== null && exportedLiteral === null;
					const keptFilters = component.nodeName === "service" ? details.filterCount > 0 : details.actionFilter;
					const explicitExportRequired = declaredExported === null && targetSdkLevel !== null && targetSdkLevel >= 31 && keptFilters && (component.nodeName === "activity" || component.nodeName === "activity-alias" || component.nodeName === "service" || component.nodeName === "receiver");
					const filteredExportUnknown = declaredExported === null && targetSdkLevel === null && keptFilters && (component.nodeName === "activity" || component.nodeName === "activity-alias" || component.nodeName === "service" || component.nodeName === "receiver");
					if (component.nodeName === "provider" && providerDefault === null && declaredExported === null) providerDefaultsUnknown += 1;
					if (exportedNonliteral) nonliteralExported += 1;
					if (explicitExportRequired) invalidExported += 1;
					if (filteredExportUnknown) unknownFilteredExportDefaults += 1;
					items.push({
						kind: component.nodeName,
						declared_name: declared,
						name,
						exported: exportedLiteral,
						exported_default: exportedNonliteral || explicitExportRequired || filteredExportUnknown ? null : component.nodeName === "provider" ? providerDefault : keptFilters,
						permission,
						permission_source: effectivePermissionSource,
						intent_filter_count: details.filterCount,
						actions: collected.actions,
						categories: collected.categories,
						foreground_service_type: component.nodeName === "service" ? androidAttribute(component, "foregroundServiceType") : null,
						authorities,
						target_activity: targetActivity,
						...details.facts
					});
				}
			}
			if (!applicationSeen) limitations.push("The manifest declares no <application> element, so no components were projected.");
			if (unnamed > 0) {
				limitations.push(`${String(unnamed)} component declaration(s) without android:name are omitted from the inventory.`);
				truncated = true;
			}
			if (invalidNames > 0) {
				limitations.push(`${String(invalidNames)} component name value(s) are empty or do not fit DEX binary class-name syntax; the raw declaration is retained without resolving it as an identity.`);
				truncated = true;
			}
			if (packageHasInvalidWhitespace) {
				limitations.push("The manifest package has surrounding whitespace; relative component names were not resolved against it.");
				truncated = true;
			}
			if (packageHasUnsupportedPackageSyntax) {
				limitations.push("The manifest package does not fit the supported Java package-name syntax; package-relative component names were not resolved against it.");
				truncated = true;
			}
			if (providerPermissionOverridesUnknown > 0) {
				limitations.push(`${String(providerPermissionOverridesUnknown)} provider(s) declare android:readPermission or android:writePermission; operation-specific permission overrides are retained in the manifest text but are not projected.`);
				truncated = true;
			}
			if (malformedAuthoritySegments > 0) {
				limitations.push(`${String(malformedAuthoritySegments)} provider authority segment(s) are empty or have surrounding whitespace; exact segments are retained and their registration is not established.`);
				truncated = true;
			}
			if (providerDefaultsUnknown > 0) limitations.push(`${String(providerDefaultsUnknown)} provider(s) omit android:exported and the target SDK is unknown, so Android's export default for them is not established.`);
			if (nonliteralExported > 0) limitations.push(`${String(nonliteralExported)} component declaration(s) set android:exported to a value other than the literals true or false (for example a resource reference), so their effective export state is unknown and the Android default does not apply.`);
			if (nonliteralEnabled > 0) limitations.push(`${String(nonliteralEnabled)} component declaration(s) set android:enabled to a nonliteral boolean; the declared enabled state is unknown.`);
			if (nonliteralGrantUriPermissions > 0) limitations.push(`${String(nonliteralGrantUriPermissions)} provider(s) set android:grantUriPermissions to a nonliteral boolean; the declared URI-grant state is unknown.`);
			if (unresolvedPackages > 0) {
				limitations.push(`${String(unresolvedPackages)} package-relative component name(s) remain unresolved because the manifest package is absent or contains a resource/placeholder token, or its syntax is unsupported; the declared name is retained.`);
				truncated = true;
			}
			if (unresolvedTargetActivities > 0) {
				limitations.push(`${String(unresolvedTargetActivities)} activity-alias targetActivity value(s) are empty, malformed, unresolved against the manifest package, or do not match a preceding activity declaration; each exact declared value is retained.`);
				truncated = true;
			}
			if (unresolvedTokens > 0) {
				limitations.push(`${String(unresolvedTokens)} component name(s) contain an unresolved resource or manifest placeholder token; the declared name is retained without claiming a resolved identity.`);
				truncated = true;
			}
			if (permissionBudgetLimited) limitations.push(`Projected component permission values are capped at ${String(ANDROID_MANIFEST_LIMITS.permissionBytes)} total bytes; omitted copies have permission_source "unknown".`);
			if (detailBudgetLimited) limitations.push(`Nested component declarations reached the ${String(ANDROID_MANIFEST_LIMITS.intentValues)}-record per-component or ${String(ANDROID_MANIFEST_LIMITS.detailBytes)}-byte shared copy bound; affected declaration coverage is partial. Read the retained manifest at each source location for omitted facts.`);
			if (unsupportedFilterMembers > 0) limitations.push(`${String(unsupportedFilterMembers)} intent-filter child declaration(s) use unsupported constructs; affected filter coverage is partial and the declarations remain in the retained manifest.`);
			if (unnamedFilterMembers > 0) limitations.push(`${String(unnamedFilterMembers)} intent-filter action or category declaration(s) without android:name were omitted. Read the retained manifest at each affected filter's source location.`);
			if (processBudgetLimited) limitations.push(`Projected component process declarations are capped at ${String(ANDROID_MANIFEST_LIMITS.processBytes)} total bytes; omitted values are null.`);
			if (unresolvedPermissionTokens > 0) {
				limitations.push(`${String(unresolvedPermissionTokens)} permission value(s) contain unresolved resource or manifest-placeholder tokens; their effective values are unknown.`);
				truncated = true;
			}
			if (invalidExported > 0) {
				limitations.push(`${String(invalidExported)} component(s) with intent filters target API 31 or later and omit android:exported; Android requires an explicit value, so the inventory does not infer a default.`);
			}
			if (unknownFilteredExportDefaults > 0) limitations.push(`${String(unknownFilteredExportDefaults)} filtered component(s) omit android:exported and the target SDK is unknown, so the applicable export rule is not established.`);
			if (unresolvedNames > 0) {
				limitations.push(`${String(unresolvedNames)} component name(s) keep their declared form because the resolved-name byte budget (${String(ANDROID_MANIFEST_LIMITS.resolvedNameBytes)}) was exhausted.`);
				truncated = true;
			}
			if (capacityTruncated) limitations.push(`The component inventory reached a capacity limit: ${String(ANDROID_MANIFEST_LIMITS.components)} declarations, ${String(ANDROID_MANIFEST_LIMITS.intentFilters)} filters or ${String(ANDROID_MANIFEST_LIMITS.intentValues)} values per component, ${String(ANDROID_MANIFEST_LIMITS.authorities)} authorities per provider, ${String(ANDROID_MANIFEST_LIMITS.authorityBytes)} total authority bytes, or ${String(ANDROID_MANIFEST_LIMITS.permissionBytes)} total permission bytes, or ${String(ANDROID_MANIFEST_LIMITS.processBytes)} total process bytes.`);
			return {
				status: truncated ? "partial" : "complete",
				items,
				limitations
			};
		};
	})))();
}

//#endregion
//#region dist/android/JadxProtocol.js
var count, jadxMemoryFailureSchema, jadxInputFailureSchema, jadxReferenceLimitSchema, bridgeFailureSchema, JADX_HEAP_EXHAUSTION, jadxHeapExhausted, parseJadxFailure, jadxRuntimeSchema, jadxLoadSchema, jadxAppSchema, jadxClassPageSchema, parseJadxClassPage, jadxMethodMetadataSchema, jadxClassSchema, jadxExternalReferenceSummarySchema, jadxMethodIdentity, jadxMethodSchema, jadxXrefsSchema, toolResponse, parseJadxEnvelope, parseJadxJson, normalizeJadxText;
function init_JadxProtocol() {
	return (init_JadxProtocol = __esmMin((() => {
		init_analysisErrorCore();
		init_jsonDuplicateMember();
		init_jsonValue();
		init_androidAnalysis();
		init_dexTypes();
		count = z.int().nonnegative();
		jadxMemoryFailureSchema = z.strictObject({
			kind: z.literal("jvm-memory-failure"),
			memory_area: z.enum(["heap", "unknown"]),
			exception_type: z.literal("java.lang.OutOfMemoryError"),
			message: z.string().optional(),
			max_heap_bytes: z.int().positive().safe()
		});
		jadxInputFailureSchema = z.strictObject({
			kind: z.literal("invalid-input"),
			field: z.enum([
				"class_name",
				"method_name",
				"overload_index"
			]),
			message: z.string().min(1)
		});
		jadxReferenceLimitSchema = z.strictObject({
			kind: z.literal("reference-output-limit"),
			stage: z.enum(["method_inventory", "caller_inventory"]),
			limit_bytes: z.int().positive().safe()
		});
		bridgeFailureSchema = z.discriminatedUnion("kind", [
			jadxInputFailureSchema,
			jadxMemoryFailureSchema,
			jadxReferenceLimitSchema
		]);
		JADX_HEAP_EXHAUSTION = /java\.lang\.OutOfMemoryError: (?:Java heap space|GC overhead limit exceeded)/u;
		jadxHeapExhausted = (text) => JADX_HEAP_EXHAUSTION.test(text);
		parseJadxFailure = (text) => {
			const decoded = parseJsonWithDuplicatePolicy(text, "reject");
			if (!decoded.ok) return undefined;
			const parsed = bridgeFailureSchema.safeParse(decoded.value);
			return parsed.success ? parsed.data : undefined;
		};
		jadxRuntimeSchema = z.object({
			engine_reported_version: z.string().min(1),
			max_heap_bytes: z.int().positive().safe(),
			available_processors: z.int().positive(),
			java_version: z.string().min(1),
			metadata_scope: z.literal("parsed_members")
		});
		jadxLoadSchema = z.object({
			state: z.literal("LOADED"),
			apk_path: z.string(),
			class_count: count,
			resource_count: count,
			threads: z.literal(1),
			resources: z.literal("full")
		});
		jadxAppSchema = z.object({
			package: z.string(),
			version_name: z.string(),
			version_code: z.string(),
			min_sdk: z.string(),
			target_sdk: z.string(),
			permissions: z.array(z.string())
		});
		jadxClassPageSchema = z.object({
			scope: z.literal("top_level"),
			total_classes: count,
			next_offset: count,
			offset: count,
			limit: count,
			items: z.array(z.string())
		}).catchall(jsonValueSchema);
		parseJadxClassPage = (value) => {
			jadxClassPageSchema.parse(value);
			return value;
		};
		jadxMethodMetadataSchema = z.object({
			name: z.string(),
			raw_name: z.string().min(1),
			signature: z.string(),
			dex_descriptor: dexDescriptorSchema,
			is_constructor: z.boolean(),
			def_pos: z.int()
		});
		jadxClassSchema = z.object({
			full_name: z.string().min(1),
			raw_name: z.string().min(1),
			name: z.string(),
			method_count: count,
			field_count: count,
			inner_class_count: count,
			methods: z.array(jadxMethodMetadataSchema),
			fields: z.array(z.object({
				name: z.string(),
				raw_name: z.string().min(1),
				type: z.string(),
				dex_type: dexTypeSchema,
				def_pos: z.int(),
				dex_static_value: dexStaticValueSchema.optional()
			})),
			inner_classes: z.array(z.string()),
			/** Original binary names, index-aligned with the display names above. */
			inner_class_raw_names: z.array(z.string())
		});
		jadxExternalReferenceSummarySchema = z.object({
			reference_target: z.literal("external"),
			class_name: z.string().min(1),
			observed_method_count: count,
			prototypes: z.array(jadxMethodMetadataSchema).min(1)
		});
		jadxMethodIdentity = {
			class_name: z.string(),
			method_name: z.string(),
			full_name: z.string(),
			overload_index: count,
			overload_count: count,
			dex_descriptor: dexDescriptorSchema
		};
		jadxMethodSchema = z.discriminatedUnion("mode", [z.object({
			...jadxMethodIdentity,
			mode: z.enum(["java", "smali"]),
			fell_back: z.boolean(),
			markers: z.array(z.string()),
			body: z.string()
		}), z.strictObject({
			...jadxMethodIdentity,
			mode: z.literal("unavailable"),
			body_unavailable_reason: z.string().min(1)
		})]);
		jadxXrefsSchema = z.object({
			target: z.string(),
			reference_target: z.literal("external").optional(),
			reference_scope: z.literal("direct_dex_invokes").optional(),
			dex_descriptor: dexDescriptorSchema.optional(),
			overload_index: count.optional(),
			reported_signature: z.string().optional(),
			total: count,
			count,
			resolve_line: z.literal(false),
			items: z.array(z.object({
				kind: z.string(),
				name: z.string(),
				full_name: z.string(),
				containing_class: z.string(),
				top_class: z.string(),
				def_pos: z.int(),
				source_selector: androidMethodSelectorSchema.optional(),
				direct_invokes_exhaustive: z.boolean().optional(),
				direct_invokes: z.array(z.object({
					dex_entry: z.string().min(1),
					source_raw_method_id: z.string().min(1),
					dex_code_unit_offset: count,
					dex_method_index: count,
					opcode: z.string().regex(/^INVOKE_/u)
				})).optional()
			}).refine((item) => item.direct_invokes_exhaustive === undefined || item.direct_invokes !== undefined, {
				message: "Invoke coverage requires a direct invoke site list",
				path: ["direct_invokes_exhaustive"]
			}))
		});
		toolResponse = z.object({
			content: z.tuple([z.object({
				type: z.literal("text"),
				text: z.string()
			}).catchall(jsonValueSchema)]),
			isError: z.boolean().exactOptional()
		}).catchall(jsonValueSchema);
		parseJadxEnvelope = (response, operation) => {
			const parsed = toolResponse.safeParse(response);
			if (!parsed.success) throw new AnalysisOutputError(operation, "JADX returned an unsupported MCP content envelope");
			return response;
		};
		parseJadxJson = (text, operation) => {
			const decoded = parseJsonWithDuplicatePolicy(text, "reject");
			if (!decoded.ok) {
				if (decoded.duplicate !== undefined) throw new AnalysisOutputError(operation, `JADX returned JSON with duplicate member ${JSON.stringify(decoded.duplicate.name)}`);
				throw new AnalysisOutputError(operation, "JADX returned malformed JSON text", { cause: decoded.cause });
			}
			try {
				return jsonValueSchema.parse(decoded.value);
			} catch (cause) {
				throw new AnalysisOutputError(operation, "JADX returned malformed JSON text", { cause });
			}
		};
		normalizeJadxText = (text) => {
			const marker = /\n\n\.\.\. \[truncated: exceeds (\d+) bytes, total (\d+) bytes\]$/u.exec(text);
			const total = marker?.[2] === undefined ? null : Number(marker[2]);
			return {
				status: marker === null ? "complete" : "partial",
				text,
				reported_total_bytes: total !== null && Number.isSafeInteger(total) ? total : null
			};
		};
	})))();
}

//#endregion
//#region dist/android/JadxAnalysis.js
var methodsOf, classQuery, innerClassQueries, methodQueries, fieldQueries, mappingOf, inputFailure, parsedClassSummary, classSummary, referenceSummary, inspectPackage, searchClasses, matchingMethods, ambiguousOverload, inspectMethod, analyzeJadxRequest, traceReferences;
function init_JadxAnalysis() {
	return (init_JadxAnalysis = __esmMin((() => {
		init_androidAnalysis();
		init_androidMapping();
		init_AndroidManifestComponents();
		init_analysisErrorCore();
		init_androidJniBindings();
		init_JadxProtocol();
		methodsOf = (summary) => {
			const seen = new Map();
			return summary.methods.map((method) => {
				const index = seen.get(method.name) ?? 0;
				seen.set(method.name, index + 1);
				return {
					name: method.name,
					reported_signature: method.signature,
					overload_index: index,
					is_constructor: method.is_constructor,
					dex_descriptor: method.dex_descriptor
				};
			});
		};
		classQuery = (summary) => ({
			kind: "class",
			name: summary.full_name,
			raw_name: summary.raw_name
		});
		innerClassQueries = (summary) => summary.inner_classes.map((name, index) => ({
			kind: "class",
			name,
			raw_name: summary.inner_class_raw_names[index] ?? ""
		}));
		methodQueries = (summary) => methodsOf(summary).map((method, index) => ({
			kind: "method",
			class_raw_name: summary.raw_name,
			name: method.name,
			overload_index: method.overload_index,
			raw_name: summary.methods[index]?.raw_name ?? "",
			dex_descriptor: method.dex_descriptor
		}));
		fieldQueries = (summary) => summary.fields.map((field) => ({
			kind: "field",
			class_raw_name: summary.raw_name,
			name: field.name,
			raw_name: field.raw_name,
			dex_type: field.dex_type
		}));
		mappingOf = (mapping, queries) => mapping === undefined ? {} : { mapping: projectAndroidMapping(mapping, queries()) };
		inputFailure = (request, field, message) => {
			throw new AnalysisInputError(request.operation, undefined, [{
				path: [field],
				reason: "invalid_value",
				message
			}]);
		};
		parsedClassSummary = (raw, request) => {
			if (raw !== null && typeof raw === "object" && !Array.isArray(raw) && "reference_target" in raw) throw new AnalysisOutputError(request.operation, "External prototypes are not an APK class definition");
			if (raw !== null && typeof raw === "object" && !Array.isArray(raw) && typeof raw.error === "string") throw new AnalysisOutputError(request.operation, `JADX class summary failed: ${raw.error}`);
			const summary = jadxClassSchema.safeParse(raw);
			if (!summary.success) throw new AnalysisOutputError(request.operation, "JADX class summary failed or was malformed; negative counts are not an empty class", { cause: summary.error });
			const value = summary.data;
			if (value.full_name !== request.input.class_name && value.raw_name !== request.input.class_name) inputFailure(request, "class_name", `Exact class ${request.input.class_name} resolved to ${value.full_name}; use the fully qualified class name from search_android_classes.`);
			if (value.method_count !== value.methods.length || value.field_count !== value.fields.length || value.inner_class_count !== value.inner_classes.length || value.inner_class_raw_names.length !== value.inner_classes.length) throw new AnalysisOutputError(request.operation, "JADX class member counts do not match the returned inventory");
			return value;
		};
		classSummary = async (tools, request) => parsedClassSummary(await tools.json("get_class_summary", {
			class_name: request.input.class_name,
			...request.operation === "inspect_android_class" ? { dex_static_values: true } : {}
		}), request);
		referenceSummary = async (tools, request) => {
			if (request.input.method_name === undefined) return classSummary(tools, request);
			const raw = await tools.json("get_class_summary", {
				class_name: request.input.class_name,
				method_name: request.input.method_name,
				reference_target: true
			});
			if (raw === null || typeof raw !== "object" || Array.isArray(raw) || raw.reference_target !== "external") return parsedClassSummary(raw, request);
			const parsed = jadxExternalReferenceSummarySchema.safeParse(raw);
			if (!parsed.success) throw new AnalysisOutputError(request.operation, "JADX external prototype inventory is malformed", { cause: parsed.error });
			const value = parsed.data;
			if (value.class_name !== request.input.class_name || value.observed_method_count !== value.prototypes.length || value.prototypes.some((method) => method.name !== request.input.method_name || method.raw_name !== method.name) || new Set(value.prototypes.map((method) => method.dex_descriptor)).size !== value.prototypes.length) throw new AnalysisOutputError(request.operation, "JADX external prototypes do not match the selected method inventory");
			return {
				full_name: value.class_name,
				methods: value.prototypes,
				reference_target: "external"
			};
		};
		inspectPackage = async (tools, loaded, engine) => {
			const app = jadxAppSchema.parse(await tools.json("get_app_info", {}));
			const manifest = normalizeJadxText(await tools.text("get_android_manifest", {}));
			return androidResultSchemas.inspect_android_package.parse({
				engine,
				package_name: app.package || null,
				version_name: app.version_name || null,
				version_code: app.version_code || null,
				min_sdk: app.min_sdk || null,
				target_sdk: app.target_sdk || null,
				permissions: app.permissions,
				manifest,
				components: parseAndroidManifestComponents(manifest.text, manifest.status, app.target_sdk || null, app.min_sdk || null),
				class_count: loaded.class_count,
				resource_count: loaded.resource_count,
				signature_verification: "not_performed"
			});
		};
		searchClasses = async (tools, request, loaded, engine) => {
			const matches = [];
			const pageSize = 4096;
			let offset = 0;
			do {
				const page = await tools.listClasses({
					query: request.input.query,
					offset,
					limit: pageSize
				});
				if (page.total_classes !== loaded.class_count || page.offset !== offset || page.limit !== pageSize || page.next_offset < offset || page.next_offset > loaded.class_count || page.items.length > pageSize || page.items.length > page.next_offset - offset || request.input.query === "" && page.items.length !== page.next_offset - offset || page.items.some((name) => !name.includes(request.input.query))) throw new AnalysisOutputError(request.operation, "JADX class pagination changed identity or counts");
				if (offset < loaded.class_count && page.next_offset === offset || page.next_offset < loaded.class_count && page.items.length !== pageSize) throw new AnalysisOutputError(request.operation, "JADX class pagination is incomplete");
				matches.push(...page.items);
				offset = page.next_offset;
			} while (offset < loaded.class_count);
			const occurrences = new Map();
			for (const name of matches) occurrences.set(name, (occurrences.get(name) ?? 0) + 1);
			const duplicateNames = [...occurrences].filter(([, count]) => count > 1).map(([name, count]) => ({
				name,
				occurrences: count
			}));
			return androidResultSchemas.search_android_classes.parse({
				engine,
				query: request.input.query,
				total_classes: loaded.class_count,
				matches,
				duplicate_names: duplicateNames,
				coverage: "complete"
			});
		};
		matchingMethods = (summary, request) => {
			const candidates = methodsOf(summary).filter((method) => method.name === request.input.method_name);
			if (request.input.method_name !== undefined && candidates.length === 0) inputFailure(request, "method_name", `Method ${summary.full_name}.${request.input.method_name} was not found; inspect_android_class lists available methods.`);
			return candidates;
		};
		ambiguousOverload = (request, candidates, external = false) => {
			throw new AnalysisInputError(request.operation, { ambiguousSelector: {
				field: ["overload_index"],
				candidates: candidates.map((method) => ({
					overload_index: method.overload_index,
					reported_signature: method.reported_signature,
					dex_descriptor: method.dex_descriptor
				}))
			} }, [{
				path: ["overload_index"],
				reason: "invalid_value",
				message: `Select one of ${candidates.length} overloads: ${candidates.map((method) => `${method.overload_index}: ${method.reported_signature}${external ? ` [${method.dex_descriptor}]` : ""}`).join("; ")}`
			}]);
		};
		inspectMethod = async (tools, request, summary, { engine, mapping }) => {
			const candidates = matchingMethods(summary, request);
			if (candidates.length > 1 && request.input.overload_index === undefined) ambiguousOverload(request, candidates);
			const index = request.input.overload_index ?? 0;
			const selected = candidates[index] ?? inputFailure(request, "overload_index", `Index ${index} is outside the ${candidates.length} matching overloads.`);
			const body = jadxMethodSchema.parse(await tools.json("get_method_body", {
				class_name: request.input.class_name,
				method_name: request.input.method_name,
				overload_index: index,
				smali_fallback: true
			}));
			if (body.class_name !== summary.full_name || body.method_name !== request.input.method_name || body.overload_index !== index || body.overload_count !== candidates.length || body.dex_descriptor !== selected.dex_descriptor) throw new AnalysisOutputError(request.operation, "JADX returned a different method or overload inventory");
			return androidResultSchemas.inspect_android_method.parse({
				engine,
				class_name: summary.full_name,
				method: selected,
				overload_count: candidates.length,
				...body.mode === "unavailable" ? {
					representation: null,
					body_status: "not_available",
					body_unavailable_reason: body.body_unavailable_reason,
					fell_back: false,
					markers: ["disassembly_failed"],
					source: null
				} : {
					representation: body.mode,
					body_status: body.body.length === 0 ? "not_available" : "available",
					fell_back: body.fell_back,
					markers: body.markers,
					source: normalizeJadxText(body.body)
				},
				...mappingOf(mapping, () => [classQuery(summary), ...methodQueries(summary).filter((method) => method.name === selected.name && method.overload_index === selected.overload_index)])
			});
		};
		analyzeJadxRequest = async (tools, request, context) => {
			const { loaded, engine } = context;
			if (request.operation === "inspect_android_jni_bindings") {
				if (context.jni === undefined) throw new AnalysisOutputError(request.operation, "Native declaration and immutable APK library readers are unavailable.");
				const inventory = await context.jni.inventory();
				const libraries = await context.jni.libraries();
				const { path, ...selection } = request.input;
				const projected = projectAndroidJniBindings({
					apk: {
						path,
						sha256: context.jni.apkSha256
					},
					selection,
					inventory,
					libraries: libraries.libraries,
					libraryInventory: libraries.inventory
				});
				if (!projected.ok) throw new AnalysisResourceConstraintError(request.operation, "memory", "JNI relationship facts exceed the bounded retained report allowance.", { limit_bytes: ANDROID_JNI_REPORT_BYTES }, {
					retryable: false,
					remediationAction: "Select fewer ABI or library occurrences; raw declaration uniqueness remains global."
				});
				return androidResultSchemas.inspect_android_jni_bindings.parse({
					...projected.value,
					engine
				});
			}
			if (loaded === undefined) throw new AnalysisOutputError(request.operation, "Decompiler operation requires the admitted APK to be loaded.");
			if (request.operation === "inspect_android_package") return inspectPackage(tools, loaded, engine);
			if (request.operation === "search_android_classes") return searchClasses(tools, request, loaded, engine);
			if (request.operation === "trace_android_references") return traceReferences(tools, request, await referenceSummary(tools, request), engine);
			const summary = await classSummary(tools, request);
			if (request.operation === "inspect_android_class") return androidResultSchemas.inspect_android_class.parse({
				engine,
				class_name: summary.full_name,
				methods: methodsOf(summary),
				fields: summary.fields.map((field) => ({
					name: field.name,
					reported_type: field.type,
					dex_static_value: field.dex_static_value ?? null
				})),
				inner_classes: summary.inner_classes,
				...mappingOf(context.mapping, () => [
					classQuery(summary),
					...innerClassQueries(summary),
					...methodQueries(summary),
					...fieldQueries(summary)
				])
			});
			return inspectMethod(tools, request, summary, context);
		};
		traceReferences = async (tools, request, summary, engine) => {
			const methodName = request.input.method_name;
			const external = summary.reference_target === "external";
			const candidates = matchingMethods(summary, request);
			if (methodName === undefined && request.input.overload_index !== undefined) inputFailure(request, "overload_index", "Method name is required for an overload index.");
			if (candidates.length > 1 && request.input.overload_index === undefined) ambiguousOverload(request, candidates, external);
			const index = request.input.overload_index ?? 0;
			const selected = methodName === undefined ? undefined : candidates[index];
			if (methodName !== undefined && selected === undefined) inputFailure(request, "overload_index", `Index ${index} is outside the ${candidates.length} matching overloads.`);
			const expectedTarget = methodName === undefined ? summary.full_name : `${summary.full_name}.${methodName}`;
			const xrefs = jadxXrefsSchema.parse(await tools.json(methodName === undefined ? "get_xrefs_to_class" : "get_xrefs_to_method", {
				class_name: request.input.class_name,
				...external ? { reference_target: true } : {},
				...methodName === undefined ? {} : {
					method_name: methodName,
					overload_index: index
				},
				limit: 2147483647,
				resolve_line: false
			}));
			if (xrefs.target !== expectedTarget || external && (xrefs.reference_target !== "external" || xrefs.reference_scope !== "direct_dex_invokes" || xrefs.dex_descriptor !== selected?.dex_descriptor || xrefs.items.some((item) => item.kind !== "method" || item.source_selector === undefined || item.source_selector.class_name !== item.containing_class || item.source_selector.method_name !== item.name || item.direct_invokes === undefined || item.direct_invokes_exhaustive === undefined)) || !external && xrefs.reference_target === "external" || selected !== undefined && (xrefs.overload_index !== index || xrefs.reported_signature !== selected.reported_signature) || xrefs.total !== xrefs.count || xrefs.count !== xrefs.items.length) throw new AnalysisOutputError(request.operation, "JADX references are incomplete or refer to another target");
			const positions = {
				complete_using_nodes: 0,
				partial_using_nodes: 0,
				unknown_using_nodes: 0,
				recorded_sites: 0
			};
			const references = xrefs.items.map((reference) => {
				positions.recorded_sites += reference.direct_invokes?.length ?? 0;
				if (reference.direct_invokes === undefined || reference.direct_invokes_exhaustive === undefined) positions.unknown_using_nodes++;
				else if (reference.direct_invokes_exhaustive) positions.complete_using_nodes++;
				else positions.partial_using_nodes++;
				return {
					kind: reference.kind,
					name: reference.name,
					reported_full_name: reference.full_name,
					containing_class: reference.containing_class,
					top_class: reference.top_class,
					source_line: null,
					dex_offset: null,
					...reference.source_selector === undefined ? {} : { source_selector: reference.source_selector },
					direct_invokes: reference.direct_invokes ?? null,
					direct_invokes_exhaustive: reference.direct_invokes_exhaustive ?? null
				};
			});
			return androidResultSchemas.trace_android_references.parse({
				engine,
				target_definition: external ? "external" : "defined",
				...external ? { reference_scope: "direct_dex_invokes" } : {},
				class_name: summary.full_name,
				method_name: methodName ?? null,
				overload_index: selected?.overload_index ?? null,
				reported_signature: selected?.reported_signature ?? null,
				dex_descriptor: selected?.dex_descriptor ?? null,
				total: xrefs.total,
				direct_invokes_coverage: positions,
				references,
				coverage: "complete",
				reference_unit: "using_node"
			});
		};
	})))();
}

//#endregion
//#region dist/android/AndroidNativeInventory.js
var readAndroidNativeInventory;
function init_AndroidNativeInventory() {
	return (init_AndroidNativeInventory = __esmMin((() => {
		init_androidNativeDeclarations();
		init_analysisErrorCore();
		readAndroidNativeInventory = async (tools, snapshot) => {
			const raw = await tools.json("rea_native_declarations", { path: snapshot });
			const parsed = androidNativeDeclarationsSchema.safeParse(raw);
			if (!parsed.success) throw new AnalysisOutputError("inspect_android_jni_bindings", "JADX native declaration inventory was malformed", { cause: parsed.error });
			const inventory = parsed.data;
			const origins = new Map();
			const inconsistent = inventory.coverage.examined_dex_entries > inventory.coverage.dex_entries || inventory.methods.length > inventory.coverage.examined_methods || inventory.coverage.status === "complete" && (inventory.coverage.examined_dex_entries !== inventory.coverage.dex_entries || inventory.unknowns.length !== 0) || inventory.methods.some((method, index) => {
				const previous = origins.get(method.dex_entry_index);
				origins.set(method.dex_entry_index, method.dex_entry);
				return method.source_index !== index || previous !== undefined && previous !== method.dex_entry;
			});
			if (inconsistent) throw new AnalysisOutputError("inspect_android_jni_bindings", "JADX native declaration counts or source identities were inconsistent");
			return inventory;
		};
	})))();
}

//#endregion
//#region dist/domain/android/androidJniLibrary.js
var MAXIMUM_STRING_BYTES, MAXIMUM_STRING_WORK, MAXIMUM_RETAINED_BYTES, MAXIMUM_SCAN_BYTES, MAXIMUM_TABLE_ENTRIES, OPERATION, hex, decodeJniModifiedUtf8, methodName, methodDescriptor, inspectAndroidJniLibrary;
function init_androidJniLibrary() {
	return (init_androidJniLibrary = __esmMin((() => {
		init_result();
		init_dexTypes();
		init_nativeExportParser();
		init_nativeSectionDirectory();
		init_elfImage();
		init_binaryContainer();
		init_elfPointerRelocations();
		init_sha256Hex();
		init_zstandardFrameAllowance();
		MAXIMUM_STRING_BYTES = 65535;
		MAXIMUM_STRING_WORK = 64 * 1024 * 1024;
		MAXIMUM_RETAINED_BYTES = 16 * 1024 * 1024;
		MAXIMUM_SCAN_BYTES = 64 * 1024 * 1024;
		MAXIMUM_TABLE_ENTRIES = 65536;
		OPERATION = "inspect_android_jni_bindings";
		hex = (value) => `0x${value.toString(16)}`;
		decodeJniModifiedUtf8 = (bytes) => {
			const chunks = [];
			let units = [];
			for (let at = 0; at < bytes.length;) {
				const first = bytes[at++] ?? 0;
				let unit;
				if (first >= 1 && first <= 127) unit = first;
				else if (first >= 192 && first <= 223) {
					const second = bytes[at++];
					if (second === undefined || (second & 192) !== 128) return undefined;
					unit = (first & 31) << 6 | second & 63;
					if (unit < 128 && !(first === 192 && second === 128)) return undefined;
				} else if (first >= 224 && first <= 239) {
					const second = bytes[at++], third = bytes[at++];
					if (second === undefined || third === undefined || (second & 192) !== 128 || (third & 192) !== 128) return undefined;
					unit = (first & 15) << 12 | (second & 63) << 6 | third & 63;
					if (unit < 2048) return undefined;
				} else return undefined;
				units.push(unit);
				if (units.length === 4096) {
					chunks.push(String.fromCharCode(...units));
					units = [];
				}
			}
			if (units.length !== 0) chunks.push(String.fromCharCode(...units));
			return chunks.join("");
		};
		methodName = (name) => name !== "" && !/[.;[/<>\0]/u.test(name);
		methodDescriptor = (descriptor) => {
			if (!dexDescriptorSchema.safeParse(descriptor).success || /[.\s\0]/u.test(descriptor)) return false;
			for (const match of descriptor.matchAll(/L([^;]+);/gu)) {
				const name = match[1];
				if (name === undefined || name.includes("[") || name.split("/").some((part) => part === "")) return false;
			}
			return true;
		};
		inspectAndroidJniLibrary = async (bytes, options = {}) => {
			const active = () => {
				if (options.signal?.aborted === true) throw options.signal;
			};
			const pause = async () => {
				await setImmediate();
				active();
			};
			try {
				active();
				if (!bytes.subarray(0, 4).equals(Buffer.from([
					127,
					69,
					76,
					70
				]))) return err({
					kind: "unsupported",
					message: "JNI library inspection requires an ELF image"
				});
				const directory = options.pause === undefined && options.signal === undefined ? readElfDirectoryFromBuffer(bytes, OPERATION) : await readElfDirectoryFromBufferCooperative(bytes, options.pause ?? pause, OPERATION);
				active();
				const image = readElfImageFromDirectory(bytes, directory);
				const mappings = createFileMappingIndex(image.mappings, image.zero_fills);
				if (image.executable_mappings === undefined) return err({
					kind: "unsupported",
					message: "ELF executable PT_LOAD inventory is unavailable"
				});
				const executable = createFileMappingIndex(image.executable_mappings, image.zero_fills);
				const unknowns = new Set();
				let retained = 0, stringWork = 0;
				const retain = (amount) => {
					retained += amount;
					if (retained > MAXIMUM_RETAINED_BYTES) throw new BinaryResourceFailure("structure", MAXIMUM_RETAINED_BYTES, "JNI library facts exceed the 16 MiB retained representation allowance");
				};
				const exportSteps = parseElfExportsFromDirectorySteps(bytes, {
					path: "[admitted immutable ELF bytes]",
					sha256: sha256Hex(bytes),
					bytes: bytes.length
				}, directory);
				await pause();
				let exportStep = exportSteps.next();
				while (!exportStep.done) {
					await pause();
					exportStep = exportSteps.next();
				}
				const rawExports = exportStep.value;
				const exportRows = [];
				let exportsStatus = rawExports.coverage.status === "complete" ? "complete" : rawExports.coverage.status === "unsupported" ? "unknown" : "partial";
				if (exportsStatus !== "complete") unknowns.add(rawExports.coverage.reason ?? "Dynamic export inventory is incomplete");
				for (const [sourceIndex, row] of rawExports.exports.entries()) {
					if (row.name !== "JNI_OnLoad" && !row.name.startsWith("Java_")) continue;
					if (row.type !== "function") {
						exportsStatus = "partial";
						unknowns.add("JNI-named non-function or IFUNC exports are not direct implementation addresses");
						continue;
					}
					if (row.version !== null && row.version !== "unknown" && row.version.hidden) continue;
					if (row.version === "unknown") {
						exportsStatus = "partial";
						unknowns.add("JNI export version applicability is unknown; unresolved versions are not emitted as available bindings");
						continue;
					}
					const address = BigInt(row.value);
					const code = directory.machine === 40 ? address & ~1n : address;
					let offset = null;
					try {
						offset = executable.offset(code, 1);
					} catch (cause) {
						if (cause instanceof BinaryMappingFailure && cause.reason === "unmapped") {
							exportsStatus = "partial";
							unknowns.add("Some JNI function exports are outside executable file-backed PT_LOAD ranges");
							continue;
						} else throw cause;
					}
					retain(192 + row.name.length * 2);
					exportRows.push({
						source_index: sourceIndex,
						name: row.name,
						address: row.value,
						file_offset: offset
					});
				}
				await setImmediate();
				active();
				let overlay;
				try {
					const steps = readElfPointerRelocationsSteps(bytes, {
						bits: directory.bits,
						little: directory.little,
						machine: directory.machine,
						dynamicSegments: image.elf.dynamicSegments,
						mappings: image.mappings,
						zeroFills: image.zero_fills
					}, { unsupported: "record" });
					let next = steps.next();
					while (!next.done) {
						await setImmediate();
						active();
						next = steps.next();
					}
					overlay = next.value;
				} catch (cause) {
					if (!(cause instanceof ElfPointerRelocationFailure) || cause.reason !== "unsupported-container") throw cause;
					return ok({
						architecture: image.architecture,
						bits: directory.bits,
						byte_order: image.byte_order,
						exports: exportRows,
						jni_on_load: rawExports.exports.some((row) => row.name === "JNI_OnLoad"),
						tables: [],
						coverage: {
							status: "partial",
							exports_status: exportsStatus,
							tables_status: "unknown",
							relocations_status: "unknown",
							examined_sections: 0,
							examined_pointer_slots: 0
						},
						unknowns: [
							...unknowns,
							cause.message,
							"Runtime-built tables and obfuscated strings are not recovered; no loading or invocation is established"
						]
					});
				}
				for (const issue of overlay.issues) unknowns.add(issue);
				if (overlay.unresolved.size !== 0) unknowns.add(`${overlay.unresolved.size} unresolved, conflicting or indirect relocation destinations have unknown values`);
				const relocationStatus = !overlay.pointer_coverage_known ? "unknown" : overlay.unresolved.size !== 0 ? "partial" : "complete";
				let tablesStatus = !overlay.pointer_coverage_known ? "unknown" : "complete";
				const tables = [];
				const word = directory.bits / 8;
				const strings = new Map();
				const stringAt = (address) => {
					const cached = strings.get(address);
					if (cached !== undefined) return cached ?? undefined;
					let value;
					const remaining = MAXIMUM_STRING_WORK - stringWork;
					if (remaining <= 0) throw new BinaryResourceFailure("search", MAXIMUM_STRING_WORK, "JNI string decoding exceeds the 64 MiB work allowance");
					const allowance = Math.min(MAXIMUM_STRING_BYTES, remaining - 1);
					let scanned = false;
					try {
						mappings.offset(address, 1);
						scanned = true;
						const raw = mappings.readCString(bytes, address, allowance);
						stringWork += raw.length + 1;
						if (stringWork > MAXIMUM_STRING_WORK) throw new BinaryResourceFailure("search", MAXIMUM_STRING_WORK, "JNI string decoding exceeds the 64 MiB work allowance");
						if (overlay.hasWrites(address, raw.length + 1)) {
							tablesStatus = "partial";
							unknowns.add("Some candidate strings overlap relocation writes; their text is not established by stored bytes");
						} else value = decodeJniModifiedUtf8(raw);
					} catch (cause) {
						if (cause instanceof BinaryMappingFailure) {
							if (cause.reason !== "unmapped") throw cause;
							stringWork += scanned ? allowance + 1 : 1;
						} else if (isBinaryStringReadLimit(cause)) {
							stringWork += allowance + 1;
							tablesStatus = "partial";
							unknowns.add(`Some JNI candidate strings exceeded the ${String(cause.failure.limit.maximum)}-byte NUL-termination read allowance; omitted entries remain unknown`);
						} else if (cause instanceof BinaryFormatFailure) {
							stringWork += allowance + 1;
						} else throw cause;
					}
					if (strings.size >= MAXIMUM_TABLE_ENTRIES) throw new BinaryResourceFailure("structure", MAXIMUM_RETAINED_BYTES, "JNI string lookup index exceeds its 65536-entry allowance");
					retain(96 + (value?.length ?? 0) * 2);
					strings.set(address, value ?? null);
					return value;
				};
				let scannedBytes = 0, examinedSections = 0, examinedSlots = 0, entries = 0;
				if (overlay.pointer_coverage_known) {
					if (directory.sections.length === 0) {
						tablesStatus = "unknown";
						unknowns.add("ELF section inventory is unavailable; writable-section table coverage is unknown");
					}
					for (const section of directory.sections) {
						if ((section.flags & 3n) !== 3n || section.size === 0n) continue;
						active();
						if (section.compressed || !section.file_backed || section.type === 8) {
							tablesStatus = "partial";
							unknowns.add("Allocated writable sections without ordinary file bytes were not scanned; runtime-built tables remain unknown");
							continue;
						}
						if (section.size > BigInt(MAXIMUM_SCAN_BYTES - scannedBytes)) throw new BinaryResourceFailure("search", MAXIMUM_SCAN_BYTES, "JNI writable-section scan exceeds the 64 MiB work allowance");
						try {
							mappings.offset(section.address, Number(section.size));
						} catch (cause) {
							if (cause instanceof BinaryMappingFailure && cause.reason === "unmapped") {
								tablesStatus = "partial";
								unknowns.add("Some allocated writable section bytes are not file-backed in PT_LOAD; table coverage there is unknown");
								continue;
							}
							throw cause;
						}
						scannedBytes += Number(section.size);
						examinedSections++;
						let table;
						let previousEntry;
						const padding = (BigInt(word) - section.address % BigInt(word)) % BigInt(word);
						for (let offset = padding; offset + BigInt(3 * word) <= section.size; offset += BigInt(word)) {
							if (examinedSlots % 4096 === 0) {
								await setImmediate();
								active();
							}
							examinedSlots++;
							const address = section.address + offset;
							const fn = overlay.pointerAt(address + BigInt(2 * word));
							if (fn === undefined || fn.value === 0n) continue;
							const code = directory.machine === 40 ? fn.value & ~1n : fn.value;
							let codeOffset;
							try {
								codeOffset = executable.offset(code, 1);
							} catch (cause) {
								if (cause instanceof BinaryMappingFailure && cause.reason === "unmapped") continue;
								throw cause;
							}
							const name = overlay.pointerAt(address), signature = overlay.pointerAt(address + BigInt(word));
							if (name === undefined || signature === undefined || name.value === 0n || signature.value === 0n) continue;
							const decodedName = stringAt(name.value);
							if (decodedName === undefined || !methodName(decodedName)) continue;
							const descriptor = stringAt(signature.value);
							if (descriptor === undefined || !methodDescriptor(descriptor)) continue;
							if (++entries > MAXIMUM_TABLE_ENTRIES) throw new BinaryResourceFailure("structure", MAXIMUM_RETAINED_BYTES, "JNI table inventory exceeds its 65536-entry allowance");
							retain(1024 + 2 * (decodedName.length + descriptor.length));
							if (table === undefined || previousEntry === undefined || address !== previousEntry + BigInt(3 * word)) {
								table = {
									section_index: section.index,
									section_name: section.name,
									table_address: hex(address),
									entries: []
								};
								retain(256 + (section.name?.length ?? 0) * 2);
								tables.push(table);
							}
							const slots = [
								name,
								signature,
								fn
							].map((pointer, index) => ({
								role: index === 0 ? "name" : index === 1 ? "signature" : "function",
								address: hex(address + BigInt(index * word)),
								file_offset: mappings.offset(address + BigInt(index * word), word),
								value: hex(pointer.value),
								relocation: pointer.relocation
							}));
							const entry = {
								entry_index: table.entries.length,
								name: decodedName,
								descriptor,
								function_address: hex(fn.value),
								code_address: hex(code),
								function_file_offset: codeOffset,
								slots
							};
							table.entries.push(entry);
							previousEntry = address;
						}
					}
				}
				if (overlay.unresolved.size !== 0 && tablesStatus === "complete") tablesStatus = "partial";
				const onLoad = rawExports.exports.some((row) => row.name === "JNI_OnLoad");
				if (onLoad && tables.length === 0) unknowns.add("JNI_OnLoad is exported but no static JNINativeMethod candidate was decoded");
				unknowns.add("Runtime-built tables and obfuscated strings are not recovered; no loading, registration or invocation is established");
				active();
				return ok({
					architecture: image.architecture,
					bits: directory.bits,
					byte_order: image.byte_order,
					exports: exportRows,
					jni_on_load: onLoad,
					tables,
					coverage: {
						status: exportsStatus === "complete" && tablesStatus === "complete" && relocationStatus === "complete" ? "complete" : "partial",
						exports_status: exportsStatus,
						tables_status: tablesStatus,
						relocations_status: relocationStatus,
						examined_sections: examinedSections,
						examined_pointer_slots: examinedSlots
					},
					unknowns: [...unknowns]
				});
			} catch (cause) {
				if (cause === options.signal) return err({
					kind: "cancelled",
					message: "JNI library inspection was cancelled"
				});
				const frameAllowance = zstandardFrameAllowanceCause(cause);
				if (frameAllowance !== undefined) return err({
					kind: "capacity",
					message: frameAllowance.message
				});
				if (cause instanceof BinaryResourceFailure || cause instanceof ElfPointerRelocationFailure && cause.kind === "limit") return err({
					kind: "capacity",
					message: cause.message
				});
				if (cause instanceof BinaryFormatFailure) return err({
					kind: cause.kind === "unsupported" ? "unsupported" : "malformed",
					message: cause.message
				});
				if (cause instanceof ElfPointerRelocationFailure) return err({
					kind: cause.kind === "malformed" ? "malformed" : "unsupported",
					message: cause.message
				});
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/android/AndroidJniLibraries.js
var ANDROID_JNI_LIBRARY_LIMITS, jniReadFailure, readAndroidJniLibraries;
function init_AndroidJniLibraries() {
	return (init_AndroidJniLibraries = __esmMin((() => {
		init_resources();
		init_androidJniBindings();
		init_analysisErrorBase();
		init_jsonValueByteLength();
		init_androidJniLibrary();
		init_JadxInterruption();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_AnalysisClientFailure();
		init_errorMessage();
		init_sha256Hex();
		init_internalInvariant();
		ANDROID_JNI_LIBRARY_LIMITS = Object.freeze({
			libraryBytes: 64 * 1024 * 1024,
			totalBytes: 256 * 1024 * 1024,
			factsBytes: 16 * 1024 * 1024,
			entries: 1e5,
			libraries: 2048
		});
		jniReadFailure = (cause) => {
			if (cause instanceof AnalysisError) throw cause;
			const message = errorMessage(cause);
			if (!(cause instanceof ArtifactReaderFailure)) return {
				kind: "io",
				message
			};
			const narrowing = cause.fixedAllowance?.narrowing;
			if (cause.reason !== "integrity") return {
				kind: cause.reason,
				message: narrowing === undefined ? message : `${message} ${narrowing}`
			};
			if (cause.integrityCheck === undefined) throw invariantViolation("An integrity reader failure reached the JNI inventory without its check.", { cause });
			return {
				kind: "integrity",
				message,
				integrity_check: cause.integrityCheck
			};
		};
		readAndroidJniLibraries = async (input) => input.resources.run(async () => {
			const reader = new ZipArtifactReader(input.snapshot, "apk", ANDROID_JNI_LIBRARY_LIMITS.factsBytes);
			const owner = {
				kind: "reader",
				resource: input.snapshot,
				reader
			};
			const libraries = [];
			const inventory = {
				status: "complete",
				examined_entries: 0,
				selected_libraries: 0,
				unknowns: []
			};
			let totalBytes = 0;
			let factsBytes = 0;
			let primary;
			let failed = false;
			let inProgress;
			const selectLibrary = compileAndroidJniLibrarySelection(input.selection);
			try {
				for await (const entry of reader.entries(input.signal)) {
					throwIfJadxInterrupted(input.signal);
					const source_index = inventory.examined_entries++;
					if (inventory.examined_entries > ANDROID_JNI_LIBRARY_LIMITS.entries) {
						inventory.status = "partial";
						inventory.unknowns.push("APK entry inventory exceeded the bounded entry allowance; remaining libraries are unknown.");
						break;
					}
					const match = /^lib\/([^/]+)\/([^/]+\.so)$/u.exec(entry.path);
					if (match === null || entry.kind === "directory") continue;
					const abi = match[1];
					if (!selectLibrary({
						abi,
						path: entry.path
					})) continue;
					if (libraries.length >= ANDROID_JNI_LIBRARY_LIMITS.libraries) {
						inventory.status = "partial";
						inventory.unknowns.push("Selected native-library occurrence inventory exceeded its retained-state allowance.");
						break;
					}
					const identity = {
						library_id: `jni_library_${sha256Hex(JSON.stringify([input.apkSha256, entry.adapterKey]))}`,
						source_index,
						source_key: entry.adapterKey,
						path: entry.path,
						source_path: entry.sourcePath ?? entry.path,
						abi,
						sha256: null,
						size: null,
						declared_size: entry.declaredSize,
						compressed_size: entry.compressedSize
					};
					inProgress = {
						...identity,
						facts: null,
						failure: {
							kind: "incomplete",
							message: "Native-library inspection did not complete"
						}
					};
					let observation;
					const limit = entry.declaredSize === null || !Number.isSafeInteger(entry.declaredSize) || entry.declaredSize < 0 || entry.declaredSize > ANDROID_JNI_LIBRARY_LIMITS.libraryBytes || entry.declaredSize > ANDROID_JNI_LIBRARY_LIMITS.totalBytes - totalBytes;
					if (entry.kind !== "file" || entry.encrypted || limit) {
						observation = {
							...identity,
							facts: null,
							failure: {
								kind: entry.encrypted ? "encrypted" : entry.kind !== "file" ? "unsupported" : "capacity",
								message: entry.encrypted ? "Selected native library is encrypted." : entry.kind !== "file" ? "Selected native library is not a regular ZIP member." : "Selected native library exceeds the bounded library or cumulative scan-byte allowance."
							}
						};
					} else {
						totalBytes += entry.declaredSize;
						try {
							const bytes = Buffer.alloc(entry.declaredSize);
							let offset = 0;
							const stream = await reader.open(entry, input.signal);
							try {
								for await (const chunk of stream) {
									throwIfJadxInterrupted(input.signal);
									const data = streamChunkToBuffer(chunk);
									if (data.length > bytes.length - offset) throw new ArtifactReaderFailure("integrity", "Native library exceeds its declared ZIP size", { integrityCheck: "declared-size" });
									data.copy(bytes, offset);
									offset += data.length;
								}
							} finally {
								stream.destroy();
							}
							if (offset !== bytes.length) throw new ArtifactReaderFailure("integrity", "Native library is shorter than its declared ZIP size", { integrityCheck: "declared-size" });
							throwIfJadxInterrupted(input.signal);
							const sha256 = sha256Hex(bytes);
							inProgress = {
								...identity,
								sha256,
								size: bytes.length,
								facts: null,
								failure: {
									kind: "incomplete",
									message: "Native-library parsing did not complete"
								}
							};
							const parsed = await inspectAndroidJniLibrary(bytes, {
								signal: input.signal,
								pause: () => yieldArtifactRead(input.signal)
							});
							throwIfJadxInterrupted(input.signal);
							observation = {
								...identity,
								sha256,
								size: bytes.length,
								facts: parsed.ok ? parsed.value : null,
								failure: parsed.ok ? null : parsed.error
							};
						} catch (cause) {
							if (cause instanceof JadxInterruption) throw cause;
							if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") throw input.interruption(input.signal.reason);
							observation = {
								...identity,
								facts: null,
								failure: jniReadFailure(cause)
							};
						}
					}
					factsBytes += jsonValueByteLength(observation, ANDROID_JNI_LIBRARY_LIMITS.factsBytes);
					if (factsBytes > ANDROID_JNI_LIBRARY_LIMITS.factsBytes) {
						inventory.status = "partial";
						inventory.unknowns.push("Selected native-library facts exceed the retained-facts allowance; remaining occurrences are unknown.");
						break;
					}
					libraries.push(observation);
					inProgress = undefined;
				}
				inventory.selected_libraries = libraries.length;
				throwIfJadxInterrupted(input.signal);
			} catch (cause) {
				failed = true;
				primary = cause instanceof JadxInterruption ? input.interruption(cause.reason) : cause instanceof ArtifactReaderFailure && cause.reason === "cancelled" ? input.interruption(input.signal.reason) : cause;
			}
			if (failed) {
				inventory.status = "partial";
				inventory.unknowns.push("Native-library scan did not exhaust APK inventory; unexamined selected occurrences remain unknown.");
			}
			if (inProgress !== undefined) {
				libraries.push(inProgress);
			}
			inventory.selected_libraries = libraries.length;
			const checkpoint = {
				scan_state: failed || inventory.status !== "complete" ? "interrupted" : "completed",
				libraries: [...libraries],
				inventory: {
					...inventory,
					unknowns: [...inventory.unknowns]
				}
			};
			try {
				input.onObservation(checkpoint);
			} catch (cause) {
				if (!failed) {
					failed = true;
					primary = cause;
				}
			}
			const released = await input.resources.release(owner);
			if (released.kind === "failed") {
				const operation = "inspect_android_jni_bindings";
				const cleanup = new ProviderCleanupError("jadx", [owner.resource], { reason: errorMessage(released.cause) }, {
					operation,
					cause: released.cause
				});
				if (!failed && input.signal.aborted) {
					failed = true;
					primary = input.interruption(input.signal.reason);
				}
				const failure = failed ? analysisErrorWithCleanupFailure(primary instanceof AnalysisError ? primary : analysisClientFailureForOperation(primary, "jadx", operation), cleanup, operation) : cleanup;
				released.lease.bindCleanupError(failure);
				throw failure;
			}
			if (failed) throw primary;
			throwIfJadxInterrupted(input.signal);
			return {
				libraries,
				inventory
			};
		}).catch((cause) => {
			if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) throw analysisClientFailureForOperation(cause, "jadx", "inspect_android_jni_bindings");
			throw cause;
		});
	})))();
}

//#endregion
//#region dist/android/JadxMcpTransport.js
var JadxMcpTransport;
function init_JadxMcpTransport() {
	return (init_JadxMcpTransport = __esmMin((() => {
		init_OwnedMcpStdioTransport();
		JadxMcpTransport = class extends OwnedMcpStdioTransport {
			constructor(options, launcher) {
				super(options, {
					provider: "jadx",
					label: "JADX",
					maxFrameBytes: 8 * 1024 * 1024,
					maxOperationBytes: 32 * 1024 * 1024,
					notifyOnExit: true
				}, launcher);
			}
		};
	})))();
}

//#endregion
//#region dist/android/JadxSession.js
var JADX_REPORTED_FAILURE_REMEDIATION, JadxSession;
function init_JadxSession() {
	return (init_JadxSession = __esmMin((() => {
		init_JadxInterruption();
		init_OwnedMcpClient();
		init_AnalysisProvider();
		init_androidMapping();
		init_analysisErrorCore();
		init_jsonValue();
		init_providerAdapterError();
		init_fixedAllowanceRemediation();
		init_JadxAnalysis();
		init_AndroidNativeInventory();
		init_AndroidJniLibraries();
		init_JadxOperationTimeout();
		init_JadxMcpTransport();
		init_JadxProtocol();
		init_JadxRelease();
		JADX_REPORTED_FAILURE_REMEDIATION = "jadx is running and reported this failure for the selected input, so provider readiness checks cannot repair it. Review details.diagnostics.reason and adjust the input or request if applicable. Repeating the unchanged request is not expected to succeed.";
		JadxSession = class {
			transport;
			#client = new OwnedMcpClient({
				name: "rea-android-adapter",
				version: "1"
			});
			#loaded;
			#connected = false;
			#partialContext;
			#observedCalls = [];
			#serverName = null;
			#serverVersion = null;
			#engineVersion = null;
			#nativeInventory;
			#nativeLibraries;
			#jniObservation;
			constructor(options, launcher) {
				this.transport = new JadxMcpTransport(options, launcher);
			}
			/** Analyze one admitted immutable APK, checking producer identity and selectors. */
			async execute(context) {
				const { request, target, snapshot, jarHash, signal, timeoutMs, mapping } = context;
				this.#partialContext = {
					operation: request.operation,
					selectedPath: request.input.path,
					target,
					jarHash,
					bridgeHash: context.bridgeHash,
					bridgeIdentity: context.bridgeIdentity
				};
				this.#observedCalls = [];
				this.#jniObservation = undefined;
				if (request.operation === "inspect_android_jni_bindings") {
					const selected = request.input;
					this.#jniObservation = {
						selection: {
							...selected.class_name === undefined ? {} : { class_name: selected.class_name },
							...selected.method_names === undefined ? {} : { method_names: selected.method_names },
							...selected.descriptors === undefined ? {} : { descriptors: selected.descriptors },
							...selected.abis === undefined ? {} : { abis: selected.abis },
							...selected.library_paths === undefined ? {} : { library_paths: selected.library_paths }
						},
						native_inventory: null,
						libraries: null
					};
				}
				this.#serverName = null;
				this.#serverVersion = null;
				this.#engineVersion = null;
				const abort = () => {
					void this.transport.interrupt(signal.reason).catch(() => undefined);
				};
				signal.addEventListener("abort", abort, { once: true });
				try {
					if (signal.aborted) abort();
					throwIfJadxInterrupted(signal);
					this.transport.beginOperation();
					if (!this.#connected) {
						await this.#client.connect(this.transport, { timeout: 3e4 });
						this.#connected = true;
					}
					const server = this.#client.getServerVersion();
					this.#serverName = server?.name ?? null;
					this.#serverVersion = server?.version ?? null;
					const expected = context.bridgeIdentity;
					if (server?.name !== expected.name || server.version !== expected.version) throw new AnalysisCapabilityUnavailableError("jadx", request.operation, `Expected ${expected.name} ${expected.version}; server reported ${server?.name ?? "unknown"} ${server?.version ?? "unknown"}.`);
					const tools = this.#tools(request, target, signal, timeoutMs);
					const runtime = jadxRuntimeSchema.parse(await tools.json("rea_jvm_status", {}));
					this.#engineVersion = runtime.engine_reported_version;
					if (runtime.engine_reported_version !== JADX_RELEASE.version) throw new AnalysisCapabilityUnavailableError("jadx", request.operation, `Expected engine ${JADX_RELEASE.version}; JAR reported ${runtime.engine_reported_version}.`);
					const loaded = request.operation === "inspect_android_jni_bindings" ? undefined : this.#loaded ?? jadxLoadSchema.parse(await tools.json("load_apk", {
						path: snapshot,
						threads: 1,
						resources: "full"
					}));
					if (loaded !== undefined && loaded.apk_path !== snapshot) throw new AnalysisOutputError(request.operation, "JADX loaded a different APK path than the admitted snapshot");
					if (loaded !== undefined) this.#loaded = loaded;
					const engine = {
						name: "jadx-headless-mcp",
						version: runtime.engine_reported_version,
						artifact_sha256: jarHash,
						source_revision: jarHash === JADX_RELEASE.sha256 ? JADX_RELEASE.revision : null,
						worker_count: 1,
						heap_limit_mib: Math.floor(runtime.max_heap_bytes / (1024 * 1024)) || null
					};
					const result = await analyzeJadxRequest(tools, request, {
						loaded,
						engine,
						mapping,
						...request.operation !== "inspect_android_jni_bindings" ? {} : { jni: {
							apkSha256: target.sha256,
							inventory: async () => {
								const inventory = this.#nativeInventory ?? await readAndroidNativeInventory(tools, snapshot);
								if (this.#jniObservation !== undefined) this.#jniObservation.native_inventory = inventory;
								if (inventory.coverage.status === "complete") this.#nativeInventory = inventory;
								return inventory;
							},
							libraries: async () => {
								const key = JSON.stringify({
									abis: request.input.abis,
									library_paths: request.input.library_paths
								});
								if (this.#nativeLibraries?.key === key) {
									if (this.#jniObservation !== undefined) this.#jniObservation.libraries = {
										scan_state: "completed",
										libraries: [...this.#nativeLibraries.value.libraries],
										inventory: this.#nativeLibraries.value.inventory
									};
									return this.#nativeLibraries.value;
								}
								const value = await readAndroidJniLibraries({
									snapshot,
									apkSha256: target.sha256,
									selection: request.input,
									resources: context.resources,
									signal,
									onObservation: (checkpoint) => {
										if (this.#jniObservation !== undefined) this.#jniObservation.libraries = checkpoint;
									},
									interruption: (reason) => context.deadline.aborted && reason === context.deadline.reason ? new AnalysisTimeoutError(request.operation, timeoutMs, {
										cause: reason,
										...jadxOperationTimeoutGuidance(timeoutMs)
									}) : cancelledBy(request.operation, carriedReason(reason))
								});
								if (value.inventory.status === "complete" && value.libraries.every((library) => library.failure === null)) this.#nativeLibraries = {
									key,
									value
								};
								return value;
							}
						} }
					});
					const raw = jsonObjectSchema.parse({
						server,
						bridge_sha256: context.bridgeHash,
						jar_sha256: jarHash,
						...loaded === undefined ? {} : { loaded }
					});
					const execution = createAnalysisExecution(result, JADX_PROVIDER_IDENTITY, {
						rawResult: {
							...raw,
							calls: this.#observedCalls.map(({ complete }) => complete)
						},
						subject: target,
						limitations: request.operation === "inspect_android_jni_bindings" ? [] : [...JADX_LIMITATIONS, ...androidMappingLimitations(mapping)],
						locations: request.operation === "inspect_android_package" ? [{
							kind: "artifact-path",
							path: "AndroidManifest.xml"
						}] : []
					});
					return request.operation === "search_android_classes" ? {
						...execution,
						searchRawSummary: {
							...raw,
							calls: this.#observedCalls.map(({ complete, inline }) => inline ?? complete)
						}
					} : execution;
				} finally {
					signal.removeEventListener("abort", abort);
				}
			}
			/** Facts and upstream replies retained if a later request step fails. */
			partialObservation() {
				const context = this.#partialContext;
				if (context === undefined) return undefined;
				return {
					provider_id: "jadx",
					operation: context.operation,
					target: {
						selected_path: context.selectedPath,
						path: context.target.path,
						sha256: context.target.sha256,
						format: "apk"
					},
					provider_facts: {
						jar_sha256: context.jarHash,
						bridge_sha256: context.bridgeHash,
						bridge_name: context.bridgeIdentity.name,
						bridge_version: context.bridgeIdentity.version,
						server_name: this.#serverName,
						server_version: this.#serverVersion,
						engine_version: this.#engineVersion
					},
					calls: this.#observedCalls.map(({ complete }) => complete),
					...this.#jniObservation === undefined ? {} : { jni: this.#jniObservation }
				};
			}
			/** Whether the selected Java runtime established the REA bridge protocol. */
			initialized() {
				return this.#connected;
			}
			/** Join owned cleanup even if SDK connection teardown itself fails. */
			async close() {
				try {
					await this.#client.close();
				} finally {
					await this.transport.close();
				}
			}
			#tools(request, target, signal, timeoutMs) {
				const call = async (name, input) => {
					throwIfJadxInterrupted(signal);
					const response = await this.#client.callTool({
						name,
						arguments: input
					}, {
						timeout: timeoutMs,
						signal
					});
					const observedResponse = jsonValueSchema.parse(response);
					const call = {
						operation: name,
						input,
						response: observedResponse
					};
					const observation = { complete: call };
					this.#observedCalls.push(observation);
					const envelope = parseJadxEnvelope(observedResponse, request.operation);
					const text = envelope.content[0].text;
					if (envelope.isError === true) {
						const failure = parseJadxFailure(text);
						if (failure !== undefined) {
							if (failure.kind === "reference-output-limit") throw new AnalysisResourceConstraintError(request.operation, "memory", "External DEX reference metadata exceeds the bounded transport representation allowance.", {
								stage: failure.stage,
								limit_bytes: failure.limit_bytes
							}, fixedAllowanceOptions(`The external DEX ${failure.stage} representation allowance`, "report", {
								limit: failure.limit_bytes,
								unit: "bytes"
							}));
							if (name === "load_apk" && failure.kind === "jvm-memory-failure") throw new AnalysisResourceConstraintError(request.operation, "memory", `The JADX JVM could not allocate memory during ${name}${failure.message ? `: ${failure.message}` : ""}`, {
								observed_max_heap_bytes: failure.max_heap_bytes,
								memory_area: failure.memory_area
							}, {
								retryable: false,
								remediationAction: failure.memory_area === "heap" ? JADX_HEAP_REMEDIATION : "Review the JVM allocation failure and the host or container memory limits. The observed maximum heap does not establish which memory region was exhausted; increasing heap alone may not help.",
								diagnostics: {
									upstream_operation: name,
									reason: failure.message ?? null,
									exception_type: failure.exception_type,
									target_path: target.path,
									target_sha256: target.sha256
								}
							});
							if (failure.kind === "invalid-input") throw new AnalysisInputError(request.operation, undefined, [{
								path: [failure.field],
								reason: "invalid_value",
								message: failure.message
							}]);
						}
						throw new ProviderAdapterError("jadx", request.operation, {
							userMessage: `jadx reported an error for ${name} that REA did not classify; its reason is in details.diagnostics.reason.`,
							remediationAction: JADX_REPORTED_FAILURE_REMEDIATION,
							diagnostics: {
								upstream_operation: name,
								reason: text,
								target_path: target.path,
								target_sha256: target.sha256
							}
						});
					}
					return {
						text,
						envelope,
						observation
					};
				};
				return {
					text: async (name, input) => (await call(name, input)).text,
					json: async (name, input) => parseJadxJson((await call(name, input)).text, request.operation),
					listClasses: async (input) => {
						const reply = await call("list_classes", input);
						const page = parseJadxClassPage(parseJadxJson(reply.text, request.operation));
						const { items, ...audit } = page;
						reply.observation.inline = {
							...reply.observation.complete,
							inventory_elided: true,
							response: {
								...reply.envelope,
								content: reply.envelope.content.map((entry) => ({
									...entry,
									text: JSON.stringify({
										...audit,
										items_omitted: items.length
									})
								}))
							}
						};
						return page;
					}
				};
			}
		};
	})))();
}

//#endregion
//#region dist/android/JadxFailure.js
var captureJadxFailure, observeJadxFailure, completedSnapshotCopy, snapshotCloseFailures, nestedFileCancellation, nestedOperationCause, presentDiagnosticFailure;
function init_JadxFailure() {
	return (init_JadxFailure = __esmMin((() => {
		init_JadxOperationTimeout();
		init_JadxInterruption();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_StableFileHash();
		init_OwnedRegularFile();
		init_AndroidTargetSnapshot();
		init_JadxProtocol();
		init_JadxRelease();
		init_errorMessage();
		captureJadxFailure = (context) => {
			const observed = observeJadxFailure(context);
			const partial = context.session?.partialObservation();
			let projected;
			return () => {
				if (projected === undefined) {
					projected = observed instanceof AnalysisError ? observed : presentDiagnosticFailure(observed);
					if (partial !== undefined) projected.retainPartialObservation(partial);
				}
				return projected;
			};
		};
		observeJadxFailure = (context) => {
			const { cause, request, timeout, timeoutMs, signal, session } = context;
			const transport = session?.transport;
			const observed = transport?.observedFailure();
			const diagnostic = {
				operation: request.operation,
				transport,
				cause
			};
			const physicalFailure = (failureCause) => session !== undefined && !session.initialized() ? {
				...diagnostic,
				cause: failureCause,
				kind: "startup",
				command: session.transport.options.command
			} : {
				...diagnostic,
				cause: failureCause,
				kind: "execution"
			};
			const interruptionFailure = (reason) => {
				if (timeout.aborted && reason === timeout.reason) return {
					...diagnostic,
					cause: reason,
					kind: "timeout",
					timeoutMs
				};
				if (signal?.aborted === true && reason === signal.reason) return {
					...diagnostic,
					cause: reason,
					kind: "cancelled"
				};
				return physicalFailure(reason);
			};
			if (observed?.kind === "interrupted" && cause === observed.reason) return interruptionFailure(observed.reason);
			if (cause instanceof JadxInterruption && observed === undefined) return interruptionFailure(cause.reason);
			const cancellation = regularFileCancellation(cause);
			const cancellationError = cancellation === undefined ? undefined : timeout.aborted && cancellation.reason === timeout.reason ? new AnalysisTimeoutError(request.operation, timeoutMs, {
				cause: cancellation.reason,
				...jadxOperationTimeoutGuidance(timeoutMs)
			}) : cancelledBy(request.operation, carriedReason(cancellation.reason));
			if (cause instanceof RegularFileCleanupFailure) {
				const reason = errorMessage(cause.cleanupCause);
				const closeFailures = snapshotCloseFailures(cause);
				const descriptorPaths = [...new Set(closeFailures.map((failure) => failure.path))];
				const completed = completedSnapshotCopy(cause);
				const nestedCancellation = nestedFileCancellation(cause);
				const nestedCancellationError = nestedCancellation === undefined ? undefined : timeout.aborted && nestedCancellation.reason === timeout.reason ? new AnalysisTimeoutError(request.operation, timeoutMs, {
					cause: nestedCancellation.reason,
					...jadxOperationTimeoutGuidance(timeoutMs)
				}) : cancelledBy(request.operation, carriedReason(nestedCancellation.reason));
				const snapshotObservation = completed === undefined ? undefined : {
					kind: "file-snapshot-hash",
					path: completed.snapshotPath,
					sha256: completed.sha256,
					bytes: completed.bytes
				};
				if (completed !== undefined && nestedCancellationError === undefined) return new ProviderCleanupError("jadx", descriptorPaths, {
					reason,
					snapshot_copy: "completed",
					source_path: completed.sourcePath,
					snapshot_sha256: completed.sha256,
					snapshot_bytes: completed.bytes
				}, {
					operation: request.operation,
					cause,
					...snapshotObservation === undefined ? {} : { partialObservation: snapshotObservation }
				});
				const primaryCause = nestedOperationCause(cause);
				const primary = nestedCancellationError ?? (primaryCause instanceof AnalysisError ? primaryCause : new ProviderAdapterError("jadx", request.operation, {
					cause: primaryCause,
					userMessage: errorMessage(primaryCause)
				}));
				const cleanup = new ProviderCleanupError("jadx", descriptorPaths, {
					reason,
					...completed === undefined ? {} : {
						snapshot_copy: "completed",
						source_path: completed.sourcePath,
						snapshot_sha256: completed.sha256,
						snapshot_bytes: completed.bytes
					}
				}, {
					operation: request.operation,
					cause
				});
				const composed = analysisErrorWithCleanupFailure(primary, cleanup, request.operation);
				if (snapshotObservation !== undefined) composed.retainPartialObservation(snapshotObservation);
				return composed;
			}
			if (cancellationError !== undefined) {
				const completed = completedSnapshotCopy(cause);
				if (completed !== undefined) {
					cancellationError.retainPartialObservation({
						kind: "file-snapshot-hash",
						path: completed.snapshotPath,
						sha256: completed.sha256,
						bytes: completed.bytes
					});
					cancellationError.retainDiagnostics({
						snapshot_copy: "completed",
						source_path: completed.sourcePath,
						snapshot_sha256: completed.sha256,
						snapshot_bytes: completed.bytes
					});
				}
				return cancellationError;
			}
			if (cause instanceof StableFileHashFailure) return new ProviderAdapterError("jadx", request.operation, {
				cause: cause.cause,
				userMessage: cause.message
			});
			if (cause instanceof AnalysisError) return cause;
			if (cause instanceof z.ZodError) return {
				...diagnostic,
				kind: "output",
				reason: "JADX response violated the pinned upstream protocol"
			};
			if (observed?.kind === "output_limit") return {
				...diagnostic,
				cause: observed.cause,
				kind: "output_limit",
				limit: observed
			};
			if (observed?.kind === "protocol") return {
				...diagnostic,
				cause: observed.cause,
				kind: "output",
				reason: observed.cause.message
			};
			if (observed?.kind === "process") return physicalFailure(observed.cause);
			if (observed?.kind === "exit") return physicalFailure(cause);
			if (observed?.kind === "interrupted") return interruptionFailure(observed.reason);
			if (signal?.aborted === true) return {
				...diagnostic,
				cause: signal.reason,
				kind: "cancelled"
			};
			if (timeout.aborted) return {
				...diagnostic,
				cause: timeout.reason,
				kind: "timeout",
				timeoutMs
			};
			return physicalFailure(cause instanceof JadxInterruption ? cause.reason : cause);
		};
		completedSnapshotCopy = (cause) => {
			if (cause instanceof RegularFileCancelled) return androidSnapshotCopy(cause.outcome.value);
			if (!(cause instanceof RegularFileCleanupFailure)) return undefined;
			if (cause.outcome.kind === "completed") return androidSnapshotCopy(cause.outcome.value);
			return completedSnapshotCopy(cause.outcome.cause);
		};
		snapshotCloseFailures = (cause) => {
			const failures = [cause];
			if (cause.outcome.kind === "failed" && cause.outcome.cause instanceof RegularFileCleanupFailure) failures.push(...snapshotCloseFailures(cause.outcome.cause));
			return failures;
		};
		nestedFileCancellation = (cause) => {
			const direct = regularFileCancellation(cause);
			if (direct !== undefined) return direct;
			if (cause instanceof RegularFileCleanupFailure && cause.outcome.kind === "failed") return nestedFileCancellation(cause.outcome.cause);
			return undefined;
		};
		nestedOperationCause = (cause) => {
			if (cause instanceof RegularFileCleanupFailure && cause.outcome.kind === "failed") return nestedOperationCause(stableFileHashCause(cause.outcome.cause));
			return stableFileHashCause(cause);
		};
		presentDiagnosticFailure = (failure) => {
			const output = failure.transport?.diagnostics();
			const captured = output === undefined ? {} : { capturedOutput: output };
			const options = {
				cause: failure.cause,
				...captured
			};
			if (failure.kind === "cancelled") return cancelledBy(failure.operation, carriedReason(failure.cause), captured);
			if (failure.kind === "timeout") return new AnalysisTimeoutError(failure.operation, failure.timeoutMs, {
				...options,
				...jadxOperationTimeoutGuidance(failure.timeoutMs)
			});
			if (failure.kind === "output") return new AnalysisOutputError(failure.operation, failure.reason, options);
			if (failure.kind === "output_limit") {
				const { scope, ceiling } = failure.limit;
				return new AnalysisResourceConstraintError(failure.operation, "transport", `${failure.limit.cause.message}; no partial Evidence was returned.`, { [scope === "frame" ? "max_response_bytes" : "max_operation_bytes"]: ceiling.limit }, {
					...options,
					retryable: false,
					fixedAllowance: ceiling
				});
			}
			if (failure.kind === "startup") {
				if (jadxHeapExhausted(output?.stderr ?? "")) return new AnalysisResourceConstraintError(failure.operation, "memory", "The JADX worker JVM ran out of heap before REA's Android bridge answered", { observed_max_heap_bytes: null }, {
					...options,
					retryable: false,
					remediationAction: JADX_HEAP_REMEDIATION
				});
				const reason = `Java could not start REA's Android bridge using ${failure.command}: ${errorMessage(failure.cause)}. ${output === undefined || output.stderr.length === 0 ? "No launcher stderr was observed." : "Review the retained launcher diagnostics."}${output?.truncated === true ? " Diagnostics are incomplete." : ""} Review the selected Java/JADX configuration; for a JVM memory limit, review REA_JADX_HEAP_MIB and inherited JVM options such as JAVA_TOOL_OPTIONS.`;
				return new AnalysisCapabilityUnavailableError("jadx", failure.operation, reason, {
					...options,
					userMessage: reason
				});
			}
			return new ProviderAdapterError("jadx", failure.operation, {
				...options,
				diagnostics: { reason: errorMessage(failure.cause) }
			});
		};
	})))();
}

//#endregion
//#region dist/android/JadxProvider.js
var BRIDGE_SOURCE, waitForTurn, androidTargetChanged, androidSourceChanged, hashAndroidSource, retainedCleanupOwners, admissionDescriptorsOf, cleanupResources, cleanupFailure, cleanup, JadxProvider;
function init_JadxProvider() {
	return (init_JadxProvider = __esmMin((() => {
		init_snapshotEnvironment();
		init_HostPlatform();
		init_resources();
		init_AnalysisClientFailure();
		init_JadxInterruption();
		init_analysisErrorBase();
		init_analysisCleanupRelease();
		init_analysisErrorCore();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_AndroidMappingFile();
		init_result();
		init_JadxWorkspaceRoot();
		init_AndroidTargetSnapshot();
		init_StableFileHash();
		init_RegularFile();
		init_OwnedRegularFile();
		init_JadxConfiguration();
		init_JadxSession();
		init_JadxFailure();
		init_JadxRelease();
		init_errorMessage();
		BRIDGE_SOURCE = fileURLToPath(JADX_BRIDGE_SOURCE_URL);
		waitForTurn = (predecessor, request, signal) => new Promise((resolve, reject) => {
			const abort = () => reject(cancelledBy(request.operation, carriedReason(signal?.reason)));
			signal?.addEventListener("abort", abort, { once: true });
			if (signal?.aborted === true) abort();
			void predecessor.then(() => {
				signal?.removeEventListener("abort", abort);
				resolve();
			});
		});
		androidTargetChanged = (operation, path, cause) => new AnalysisInputError(operation, cause === undefined ? undefined : { cause }, [{
			path: ["path"],
			reason: "invalid_value",
			message: `APK bytes changed after admission at ${path}; retry against a stable file.`
		}]);
		androidSourceChanged = (operation, source, cause) => new AnalysisCapabilityUnavailableError("jadx", operation, `Selected JADX input bytes changed during admission at ${source}; retry with a stable installation.`, cause === undefined ? undefined : { cause });
		hashAndroidSource = async (path, operation, signal, retainFailedClose) => {
			try {
				return (await hashStableFile(path, {
					signal,
					retainFailedClose
				})).sha256;
			} catch (cause) {
				const physical = stableFileHashCause(cause);
				if (physical instanceof RegularFileChangedError) throw androidSourceChanged(operation, path, physical);
				throw cause;
			}
		};
		retainedCleanupOwners = (cause) => {
			const owners = new Set();
			const visit = (value, seen) => {
				if (typeof value !== "object" || value === null || seen.has(value)) return;
				seen.add(value);
				if (!(value instanceof RegularFileCleanupFailure)) return;
				owners.add(value.owner);
				if (value.outcome.kind === "failed") visit(value.outcome.cause, seen);
			};
			visit(cause, new Set());
			return owners;
		};
		admissionDescriptorsOf = (cause, fileHandles) => {
			const owners = new Set([...retainedCleanupOwners(cause)].filter((owner) => fileHandles.has(owner)));
			return owners.size === 0 ? undefined : {
				owners,
				release: new AnalysisCleanupRelease()
			};
		};
		cleanupResources = (resources) => [
			...resources.session === undefined ? [] : [resources.session.transport.runId],
			...resources.root === undefined ? [] : [resources.root.path],
			...resources.fileHandles.values()
		];
		cleanupFailure = (resources, cleanup) => resources.release.bind((resources.previousError === undefined ? cleanup : analysisErrorWithCleanupFailure(resources.previousError, cleanup, resources.operation)).bindCleanupResourceOwner({ get cleanupResources() {
			return cleanupResources(resources);
		} }));
		cleanup = async (resources) => {
			const { session, root } = resources;
			let sessionCloseFailed = false;
			let sessionCloseCause;
			try {
				await session?.close();
				resources.session = undefined;
			} catch (cause) {
				sessionCloseFailed = true;
				sessionCloseCause = cause;
			}
			const admission = resources.admissionDescriptors;
			const fileCloseCauses = [];
			for (const owner of resources.fileHandles.keys()) {
				try {
					await owner.close();
					resources.fileHandles.delete(owner);
					if (admission !== undefined && [...admission.owners].every((candidate) => !resources.fileHandles.has(candidate))) admission.release.confirm();
				} catch (cause) {
					fileCloseCauses.push(cause);
				}
			}
			if (sessionCloseFailed || fileCloseCauses.length > 0) {
				const cleanupCauses = [...sessionCloseFailed ? [sessionCloseCause] : [], ...fileCloseCauses];
				const cleanupError = new ProviderCleanupError("jadx", cleanupResources(resources), {
					reason: cleanupCauses.map((failure) => errorMessage(failure)).join("; "),
					cleanup_causes: cleanupCauses.map((failure) => errorMessage(failure)),
					provider_cleanup: cleanupCauses.map((failure) => failure instanceof ProviderCleanupError ? failure.diagnostics ?? null : null)
				}, {
					operation: resources.operation,
					cause: new AggregateError(cleanupCauses, "JADX resource cleanup failed")
				});
				return err(cleanupFailure(resources, cleanupError));
			}
			try {
				await root?.close();
				resources.root = undefined;
			} catch (cause) {
				const error = new ProviderCleanupError("jadx", cleanupResources(resources), { reason: errorMessage(cause) }, {
					operation: resources.operation,
					cause
				});
				return err(cleanupFailure(resources, error));
			}
			return ok(undefined);
		};
		JadxProvider = class {
			environment;
			launcher;
			settings;
			host;
			#tail = Promise.resolve();
			#pendingCleanup;
			#retained;
			#mappingCache;
			#idle;
			#shutdown = new AbortController();
			#prerequisites = new ArtifactResourceScope();
			#inspections = new Set();
			#prerequisiteOwner = {
				retain: (owner, resource) => this.#prerequisites.retain({
					kind: "lease",
					resource,
					lease: AnalysisCleanupLease.forCloseOwner(owner, resource)
				}),
				run: (operation) => this.#prerequisites.run(operation)
			};
			#closePromise;
			constructor(environment, launcher, settings, host = HOST_PLATFORM) {
				this.environment = environment;
				this.launcher = launcher;
				this.settings = settings;
				this.host = host;
			}
			/** Report actual local prerequisites without starting JADX or opening a target. */
			inspectAvailability(signal) {
				const environment = snapshotEnvironment(this.environment, this.host.platform);
				const pending = inspectJadxAvailability(environment, {
					host: this.host,
					operationTimeoutMs: this.settings?.().overrides["jadx.operation_timeout_ms"],
					resourceOwner: this.#prerequisiteOwner,
					signal: signal === undefined ? this.#shutdown.signal : AbortSignal.any([signal, this.#shutdown.signal])
				});
				this.#inspections.add(pending);
				const remove = () => {
					this.#inspections.delete(pending);
				};
				void pending.then(remove, remove);
				return pending;
			}
			/** Serialize expensive work and bind both raw and normalized results to the APK. */
			async execute(target, request, options) {
				if (this.#shutdown.signal.aborted) return err(cancelledBy(request.operation, this.#shutdown.signal));
				const signal = options?.signal === undefined ? this.#shutdown.signal : AbortSignal.any([options.signal, this.#shutdown.signal]);
				const predecessor = this.#tail;
				let release = () => {};
				this.#tail = new Promise((resolve) => {
					release = resolve;
				});
				try {
					await waitForTurn(predecessor, request, signal);
				} catch (cause) {
					void predecessor.then(release);
					return err(cause instanceof AnalysisError ? cause : cancelledBy(request.operation, carriedReason(cause)));
				}
				try {
					if (signal.aborted) return err(cancelledBy(request.operation, signal));
					clearTimeout(this.#idle);
					const retired = this.#pendingCleanup === undefined ? ok(undefined) : await this.#retire();
					const cleanup = await this.#retryPrerequisiteCleanup(request.operation);
					const outcome = !retired.ok && !cleanup.ok ? err(analysisErrorWithCleanupDependencies(retired.error, cleanup.error, request.operation)) : !retired.ok ? retired : !cleanup.ok ? cleanup : signal.aborted ? err(cancelledBy(request.operation, signal)) : await this.#execute(target, request, { signal });
					if (outcome.ok || this.#retained !== undefined || this.#mappingCache !== undefined || this.#prerequisites.hasPending || this.#pendingCleanup !== undefined) this.#scheduleIdle();
					return outcome;
				} finally {
					release();
				}
			}
			/** Cancel queued/active operations and join the owned engine and workspace cleanup. */
			close() {
				this.#shutdown.abort(OwnerCancellation.ownerClosed);
				clearTimeout(this.#idle);
				this.#closePromise ??= this.#tail.then(async () => {
					this.#mappingCache = undefined;
					await Promise.allSettled(this.#inspections);
					const retired = await this.#retire();
					try {
						await this.#prerequisites.close();
					} catch (cause) {
						const cleanup = analysisClientFailureForOperation(cause, "jadx", "close_binary");
						if (!retired.ok) throw analysisErrorWithCleanupDependencies(retired.error, cleanup, "close_binary");
						throw cleanup;
					}
					if (!retired.ok) throw retired.error;
				}).catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #retire() {
				if (this.#pendingCleanup === undefined && this.#retained !== undefined) {
					this.#pendingCleanup = {
						operation: "close_binary",
						session: this.#retained.session,
						root: this.#retained.root,
						fileHandles: new Map(),
						previousError: undefined,
						admissionDescriptors: undefined,
						release: new AnalysisCleanupRelease()
					};
					this.#retained = undefined;
				}
				if (this.#pendingCleanup === undefined) return ok(undefined);
				const pending = this.#pendingCleanup;
				const result = await cleanup(pending);
				if (result.ok) {
					pending.release.confirm();
					this.#pendingCleanup = undefined;
				}
				return result;
			}
			async #readMapping(request, signal, deadline) {
				if (!("mapping_path" in request.input) || request.input.mapping_path === undefined) return ok(undefined);
				const read = await readAndroidMapping(request.input.mapping_path, request.operation, this.#prerequisites, signal, this.#mappingCache, deadline);
				if (read.ok) this.#mappingCache = read.value;
				return read;
			}
			/** Every serialized request retries retained file owners before session reuse. */
			async #retryPrerequisiteCleanup(operation) {
				if (!this.#prerequisites.hasPending) return ok(undefined);
				try {
					await this.#prerequisites.retryCleanup();
					return ok(undefined);
				} catch (cause) {
					return err(analysisClientFailureForOperation(cause, "jadx", operation));
				}
			}
			#scheduleIdle() {
				this.#idle = setTimeout(() => {
					this.#tail = this.#tail.then(async () => {
						this.#mappingCache = undefined;
						await this.#retire();
						await this.#retryPrerequisiteCleanup("close_binary");
					});
				}, 6e4);
				this.#idle.unref();
			}
			async #execute(target, request, options) {
				const environment = snapshotEnvironment(this.environment, this.host.platform);
				const timeoutMs = resolveJadxOperationTimeout(environment, request.operation, this.settings?.().overrides["jadx.operation_timeout_ms"]);
				if (!timeoutMs.ok) return timeoutMs;
				const timeout = AbortSignal.timeout(timeoutMs.value);
				const signal = options.signal === undefined ? timeout : AbortSignal.any([options.signal, timeout]);
				const mapping = await this.#readMapping(request, signal, {
					timeout,
					timeoutMs: timeoutMs.value
				});
				if (!mapping.ok) return mapping;
				let root;
				let session;
				const fileHandles = new Map();
				const retainFailedClose = (path) => (owner) => {
					fileHandles.set(owner, path);
				};
				try {
					if (target.format !== "apk") throw new AnalysisCapabilityUnavailableError("jadx", request.operation, `Target ${target.path} is ${target.format}; provide one standalone APK.`);
					const configuration = await resolveJadxConfigurationInputs(environment, request.operation, this.host, signal);
					throwIfJadxInterrupted(signal);
					const jarHash = await hashAndroidSource(configuration.jar, request.operation, signal, retainFailedClose(configuration.jar));
					const bridgeHash = await hashAndroidSource(BRIDGE_SOURCE, request.operation, signal, retainFailedClose(BRIDGE_SOURCE));
					const identity = jadxBridgeIdentity();
					if (!identity.ok) throw new AnalysisCapabilityUnavailableError("jadx", request.operation, `${identity.error} (${BRIDGE_SOURCE}); reinstall REA to restore the packaged JADX bridge.`);
					const bridgeIdentity = identity.value;
					let targetHash;
					try {
						targetHash = (await hashStableFile(target.path, {
							signal,
							retainFailedClose: retainFailedClose(target.path)
						})).sha256;
					} catch (cause) {
						if (signal.aborted) throw cause;
						if (cause instanceof RegularFileChangedError) throw androidTargetChanged(request.operation, target.path, cause);
						throw cause;
					}
					if (targetHash !== target.sha256) throw androidTargetChanged(request.operation, target.path);
					const key = JSON.stringify({
						path: target.path,
						sha256: target.sha256,
						jar: configuration.jar,
						jarHash,
						bridgeHash,
						java: configuration.java,
						arguments: configuration.jvmArguments,
						options: [
							environment.JAVA_TOOL_OPTIONS,
							environment._JAVA_OPTIONS,
							environment.JDK_JAVA_OPTIONS,
							environment.PATH,
							environment.JAVA_HOME
						]
					});
					if (this.#retained !== undefined && this.#retained.key !== key) {
						const retired = await this.#retire();
						if (!retired.ok) return retired;
					}
					let retained = this.#retained;
					if (retained === undefined) {
						await validateJadxConfiguration(configuration, environment, request.operation, {
							resourceOwner: this.#prerequisiteOwner,
							signal,
							operationDeadline: {
								signal: timeout,
								timeoutMs: timeoutMs.value
							}
						});
						root = await createJadxWorkspaceRoot(this.host.platform);
						const workspaceSignal = root.failureSignal === undefined ? signal : AbortSignal.any([signal, root.failureSignal]);
						const retainSnapshot = (path, owner) => {
							fileHandles.set(owner, path);
						};
						const engine = await snapshotAndroidEngine(configuration.jar, jarHash, root.path, request.operation, workspaceSignal, retainSnapshot);
						const snapshot = await snapshotAndroidTarget(target.path, target.sha256, root.path, request.operation, workspaceSignal, retainSnapshot);
						const bridge = join(root.path, "ReaJadxBridge.java");
						await copyFile(BRIDGE_SOURCE, bridge);
						await chmod(bridge, 256);
						const copiedBridgeHash = await hashAndroidSource(bridge, request.operation, workspaceSignal, retainFailedClose(bridge));
						if (copiedBridgeHash !== bridgeHash) throw androidSourceChanged(request.operation, BRIDGE_SOURCE, undefined);
						throwIfJadxInterrupted(workspaceSignal);
						session = new JadxSession({
							command: configuration.java,
							expectedCommand: null,
							arguments: [
								...configuration.jvmArguments,
								"--class-path",
								engine.path,
								bridge
							],
							cwd: root.path,
							hostEnvironment: environment,
							signal: workspaceSignal
						}, this.launcher);
						retained = {
							key,
							root,
							session,
							snapshot,
							jarHash: engine.sha256,
							bridgeHash,
							bridgeIdentity
						};
					}
					root = retained.root;
					session = retained.session;
					const activeSignal = root.failureSignal === undefined ? signal : AbortSignal.any([signal, root.failureSignal]);
					const { snapshot } = retained;
					const outcome = ok(await session.execute({
						request,
						target,
						snapshot,
						jarHash: retained.jarHash,
						bridgeHash: retained.bridgeHash,
						bridgeIdentity: retained.bridgeIdentity,
						signal: activeSignal,
						timeoutMs: timeoutMs.value,
						mapping: mapping.value,
						resources: this.#prerequisites,
						deadline: timeout
					}));
					throwIfJadxInterrupted(activeSignal);
					this.#retained = retained;
					return outcome;
				} catch (cause) {
					const failure = captureJadxFailure({
						cause,
						request,
						timeout,
						timeoutMs: timeoutMs.value,
						signal: options.signal,
						session
					});
					root ??= this.#retained?.root;
					session ??= this.#retained?.session;
					this.#retained = undefined;
					const admissionDescriptors = admissionDescriptorsOf(cause, fileHandles);
					const admissionFailure = () => admissionDescriptors === undefined ? failure() : admissionDescriptors.release.bind(failure());
					this.#pendingCleanup = {
						operation: request.operation,
						session,
						root,
						fileHandles,
						get previousError() {
							return admissionFailure();
						},
						admissionDescriptors,
						release: new AnalysisCleanupRelease()
					};
					const retired = await this.#retire();
					return retired.ok ? err(admissionFailure()) : retired;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/composition/android.js
var createAndroidAnalysisProvider;
function init_android() {
	return (init_android = __esmMin((() => {
		init_JadxProvider();
		createAndroidAnalysisProvider = (environment = process.env, launcher, settings) => new JadxProvider(environment, launcher, settings);
	})))();
}

//#endregion
//#region dist/cli/androidCommands.js
var androidCommands_exports = /* @__PURE__ */ __exportAll({ registerAndroidCommands: () => registerAndroidCommands });
var registerAndroidCommands;
function init_androidCommands() {
	return (init_androidCommands = __esmMin((() => {
		init_projectCliAnalysisResult();
		init_AndroidAnalysisService();
		init_android();
		init_cliEvidenceCallerPath();
		init_contractCliDescription();
		init_contractCommand();
		init_androidToolContracts();
		init_analysisEvidenceDelivery();
		registerAndroidCommands = (cli, logger, environment) => {
			const provider = createAndroidAnalysisProvider(environment);
			const service = new AndroidAnalysisService(provider);
			const contract = (name) => contractNamed(ANDROID_TOOL_CONTRACTS, name);
			/**
			* Run one operation on the APK the caller selected and record that spelling
			* in Evidence. The contracts admit a relative APK path, which the provider
			* resolves from the working directory, so the CLI passes it on as spelled.
			* A command with Evidence delivery publishes complete Evidence or a summary
			* beside its bundle.
			*/
			const run = (operation) => (input, { signal, delivery }) => {
				const analyze = () => service.execute(operation, input, { signal });
				const cleanup = { close: () => provider.close() };
				if (delivery === undefined) return finishCliEvidenceCommand(input.path, analyze, cleanup, "jadx", operation, signal).then(projectCliAnalysisResult);
				return deliverCliAnalysisEvidence({
					callerInputPath: input.path,
					run: analyze,
					service: cleanup,
					providerId: "jadx",
					operation,
					signal,
					detail: delivery.detail,
					evidenceOutput: delivery.evidenceOutput,
					...delivery.view === undefined ? {} : { view: delivery.view }
				});
			};
			registerContractCommand(cli, logger, contract("inspect_android_jni_bindings"), {
				description: "Link raw DEX native declarations to static JNI export/table candidates without executing the APK",
				positionals: ["path"],
				fieldGroups: { query: {
					fields: [
						"class_name",
						"method_names",
						"descriptors",
						"abis",
						"library_paths"
					],
					description: "JSON selection: class_name, method_names, descriptors, abis, library_paths; arrays preserve exact names",
					invalidJson: "query must be a JSON selection object."
				} },
				fields: { view: { description: "JSON android-jni collection page; requires --detail summary and --evidence_output" } },
				evidenceDelivery: true,
				viewDelivery: { invalidJson: "view must be valid JSON" }
			}, run("inspect_android_jni_bindings"));
			registerContractCommand(cli, logger, contract("inspect_android_package"), {
				description: "Inspect APK declarations and decoded manifest without executing it",
				positionals: ["path"],
				fields: { view: { description: "JSON android manifest/components/component-summary view; requires --detail summary and --evidence_output" } },
				evidenceDelivery: true,
				viewDelivery: { invalidJson: "view must be valid JSON" }
			}, run("inspect_android_package"));
			registerContractCommand(cli, logger, contract("search_android_classes"), {
				description: "Search APK class names; empty query inventories all classes",
				positionals: ["path", "query"]
			}, run("search_android_classes"));
			registerContractCommand(cli, logger, contract("inspect_android_class"), {
				description: "Inspect one exact APK class's member inventory",
				positionals: ["path", "class_name"],
				evidenceDelivery: true
			}, run("inspect_android_class"));
			registerContractCommand(cli, logger, contract("inspect_android_method"), {
				description: "Decompile one APK method with explicit overload selection",
				positionals: [
					"path",
					"class_name",
					"method_name"
				],
				fields: {
					method_name: { description: "Exact declared method name" },
					overload_index: { description: "Explicit zero-based index among same-name methods; required when ambiguous" }
				},
				evidenceDelivery: true
			}, run("inspect_android_method"));
			registerContractCommand(cli, logger, contract("trace_android_references"), {
				description: "Trace APK using nodes for a defined class/method or an externally invoked DEX method",
				positionals: ["path", "class_name"],
				fields: { overload_index: { description: "Index among defined methods or observed external prototypes listed by an ambiguous query" } }
			}, run("trace_android_references"));
		};
	})))();
}

//#endregion
export { androidCommands_exports, init_androidCommands };