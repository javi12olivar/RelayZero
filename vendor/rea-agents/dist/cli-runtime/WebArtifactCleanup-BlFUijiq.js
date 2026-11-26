import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, ArtifactOperationError, ParseFailureError, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_artifactOperationError, init_errorMessage, init_localPath, init_parseFailure, init_sha256Hex, isPathWithinRoot, malformedInput, primaryAnalysisError, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, decodeStrictUtf8, init_HostPlatform, init_safeJson, init_strictUtf8, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, artifactFileCancellationCause, artifactFilePrimaryFacts, bindArtifactFileCleanup, completedStableArtifact, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactPaths, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_readStableArtifact, init_resources, normalizeArtifactPath, readStableArtifact, stableArtifactInputRecovery } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError, providerCleanupErrorFromCloseRejections } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { init_webScriptExport, webScriptExportManifestSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { dirname, join } from "node:path";
import { z } from "zod";
import { lstat, realpath } from "node:fs/promises";

//#region dist/domain/webTraceProviders.js
var WEB_SOURCE_LOCATION_PROVIDER, WEB_MODULE_TRACE_PROVIDER;
function init_webTraceProviders() {
	return (init_webTraceProviders = __esmMin((() => {
		WEB_SOURCE_LOCATION_PROVIDER = {
			id: "rea-web-source-location",
			name: "REA captured source-map point trace",
			version: "1"
		};
		WEB_MODULE_TRACE_PROVIDER = {
			id: "rea-web-module-trace",
			name: "REA captured module relationship trace",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/application/closeOwnedWebResources.js
var closeOwnedWebResources;
function init_closeOwnedWebResources() {
	return (init_closeOwnedWebResources = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_analysisErrorProjection();
		init_errorMessage();
		closeOwnedWebResources = async (close, message) => {
			const results = await Promise.allSettled(close.flatMap((owner) => owner === undefined ? [] : [Promise.resolve().then(owner)]));
			const failures = results.flatMap((result) => result.status === "rejected" ? [result.reason] : []);
			if (failures.length === 1) {
				const [failure] = failures;
				if (failure instanceof AnalysisError) throw failure;
				throw new ProviderCleanupError("web-workflow", [], { reason: errorMessage(failure) }, {
					cause: failure,
					operation: "close_web_workflow"
				});
			}
			if (failures.length > 1) {
				const normalized = failures.map((cause) => ({
					cause,
					cleanupOwner: cause instanceof AnalysisError && (cause.cleanupIncomplete || cause.hasCleanupOwner) ? cause : undefined,
					projection: cause instanceof AnalysisError ? projectAnalysisError(cause) : undefined
				}));
				const recoveryActions = [...new Set(normalized.flatMap(({ projection }) => projection === undefined ? [] : [projection.remediation.action]))];
				throw providerCleanupErrorFromCloseRejections("web-workflow", normalized, { failures: normalized.map(({ cause, projection }) => projection ?? { message: errorMessage(cause) }) }, {
					operation: "close_web_workflow",
					message,
					...recoveryActions.length === 0 ? {} : { remediationAction: recoveryActions.join("; ") }
				});
			}
		};
	})))();
}

//#endregion
//#region dist/application/ValidateSelectedWebScript.js
var validateSelectedWebScript, capturedWebManifestIdentity;
function init_ValidateSelectedWebScript() {
	return (init_ValidateSelectedWebScript = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		init_sha256Hex();
		validateSelectedWebScript = (input, data, operation) => {
			const selected = data.manifest.scripts[input.script_index];
			if (selected === undefined || selected.content.state !== "exported" || selected.content.sha256 !== data.sourceFile.sha256 || selected.content.bytes !== data.sourceFile.bytes || Buffer.byteLength(data.source) !== data.sourceFile.bytes || sha256Hex(data.source) !== data.sourceFile.sha256 || data.manifestFile.path !== input.manifest_path) return err(new AnalysisOutputError(operation, "Artifact port changed the selected script/source identity."));
			return ok(selected);
		};
		capturedWebManifestIdentity = (data) => ({
			...data.manifestFile,
			reported_output_directory: data.manifest.output_directory,
			capture_sha256: data.manifest.capture_sha256,
			capture_path: data.manifest.capture_path,
			capture_kind: data.manifest.capture_kind,
			capture_completeness: data.manifest.capture_completeness,
			source_evidence_id: data.manifest.source_evidence_id
		});
	})))();
}

//#endregion
//#region dist/browser/assets/WebArtifactReads.js
var WEB_ARTIFACT_FORMAT, decodeWebArtifact, WebArtifactAcquisition, webArtifactReadError, webArtifactPrimaryError, selectedFileError;
function init_WebArtifactReads() {
	return (init_WebArtifactReads = __esmMin((() => {
		init_strictUtf8();
		init_SignalAbort();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_providerAdapterError();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_safeJson();
		init_parseFailure();
		init_errorMessage();
		WEB_ARTIFACT_FORMAT = "captured-web-artifact";
		decodeWebArtifact = (bytes) => {
			try {
				return decodeStrictUtf8(bytes, "preserve");
			} catch (cause) {
				throw malformedInput(WEB_ARTIFACT_FORMAT, "Selected artifact is not valid UTF-8.", { cause });
			}
		};
		WebArtifactAcquisition = class {
			files = [];
			record(role, file, admission = "read") {
				const previous = this.files.findIndex((entry) => entry.role === role);
				const receipt = {
					role,
					file,
					admission
				};
				if (previous < 0) this.files.push(receipt);
				else this.files[previous] = receipt;
			}
			async read(role, path, maximumBytes, signal, scope) {
				try {
					const data = await readStableArtifact(path, maximumBytes, signal, undefined, scope);
					this.record(role, {
						path,
						sha256: data.sha256,
						bytes: data.bytes.length
					});
					return data;
				} catch (cause) {
					const completed = completedStableArtifact(cause);
					if (completed !== undefined) this.record(role, {
						path,
						sha256: completed.sha256,
						bytes: completed.bytes.length
					});
					throw cause;
				}
			}
			async readJson(role, path, maximumBytes, signal, scope) {
				const data = await this.read(role, path, maximumBytes, signal, scope);
				const value = safeParseJson(decodeWebArtifact(data.bytes));
				if (!value.ok) throw malformedInput(WEB_ARTIFACT_FORMAT, value.error);
				return {
					...data,
					value: value.value
				};
			}
			retain(error) {
				if (this.files.length > 0) {
					const observation = {
						kind: "web-artifact-acquisition",
						analysis: "not-performed",
						files: this.files.map((entry) => ({
							...entry,
							file: { ...entry.file }
						}))
					};
					error.partialObservation = observation;
					primaryAnalysisError(error).partialObservation = observation;
				}
				return error;
			}
		};
		webArtifactReadError = (cause, context, signal) => {
			const primary = webArtifactPrimaryError(artifactFilePrimaryFacts(cause), context, signal);
			if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
				const cleanup = new ProviderCleanupError("captured-web-artifacts", cause.cleanup.resources, { reason: cause.cleanup.reason }, {
					cause,
					operation: context.operation
				});
				bindArtifactFileCleanup(cause, cleanup);
				return analysisErrorWithCleanupDependencies(primary, cleanup, context.operation);
			}
			return primary;
		};
		webArtifactPrimaryError = ({ cause, origin }, context, signal) => {
			if (origin === "owned-or-classified" && cause instanceof AnalysisError) return cause;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") return cancelledBy(context.operation, carriedReason(artifactFileCancellationCause(cause)));
			if (origin === "owned-or-classified" && isAbortOf(cause, signal)) return cancelledBy(context.operation, signal);
			const selection = context.callerSelected ? selectedFileError({
				cause,
				origin
			}, context) : undefined;
			if (selection !== undefined) return selection;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) return new ArtifactOperationError(context.operation, cause.reason, cause.details, cause.reason === "limit" && context.limitRecovery !== undefined ? `${cause.message} ${context.limitRecovery}` : cause.message, {
				cause,
				...cause.reason === "limit" && context.limitRecovery !== undefined ? { remediationAction: context.limitRecovery } : {},
				...cause.integrityCheck === undefined ? {} : { integrityCheck: cause.integrityCheck }
			});
			if (cause instanceof Error && "code" in cause && typeof cause.code === "string" && "syscall" in cause && typeof cause.syscall === "string") return new ArtifactOperationError(context.operation, "io", undefined, `${context.targetPath}: ${cause.code}: ${cause.message}`, { cause });
			const malformed = cause instanceof ParseFailureError && cause.kind === "malformed" ? cause : undefined;
			if (!context.callerSelected && malformed !== undefined) return new ArtifactOperationError(context.operation, "format", undefined, `${context.targetPath}: ${malformed.message}`, { cause });
			const invalid = malformed ?? (cause instanceof z.ZodError ? cause : undefined);
			if (invalid !== undefined) return new AnalysisInputError(context.operation, { cause }, [{
				path: context.field,
				reason: "invalid_format",
				message: `${context.targetPath}: ${invalid.message}`
			}]);
			return new ProviderAdapterError("captured-web-artifacts", context.operation, {
				cause,
				diagnostics: {
					target_path: context.targetPath,
					field: context.field.join("."),
					error_message: errorMessage(cause)
				}
			});
		};
		selectedFileError = ({ cause, origin }, context) => {
			const selected = (message) => new AnalysisInputError(context.operation, {
				cause,
				...cause instanceof ArtifactReaderFailure ? stableArtifactInputRecovery(cause) : {}
			}, [{
				path: context.field,
				reason: "invalid_value",
				message
			}]);
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) return cause.reason === "path" ? selected(cause.message) : undefined;
			const code = cause instanceof Error && "code" in cause ? String(cause.code) : "";
			if (code === "EACCES" || code === "EPERM") return new AnalysisAccessDeniedError(context.operation, context.targetPath, code, { cause });
			if (code === "ENOENT" || code === "ENOTDIR") return selected(`Selected file could not be read (${code}): ${context.targetPath}`);
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/browser/assets/LocalWebScriptArtifacts.js
var LocalWebScriptArtifacts, assertContained;
function init_LocalWebScriptArtifacts() {
	return (init_LocalWebScriptArtifacts = __esmMin((() => {
		init_HostPlatform();
		init_resources();
		init_analysisErrorCore();
		init_localPath();
		init_result();
		init_webScriptExport();
		init_WebArtifactReads();
		LocalWebScriptArtifacts = class {
			operation;
			resources;
			platform;
			constructor(operation, resources = new ArtifactResourceScope(), platform = HOST_PLATFORM.platform) {
				this.operation = operation;
				this.resources = resources;
				this.platform = platform;
			}
			close() {
				return this.resources.close();
			}
			/** Read the selected source; relocated exports retain their reported original root. */
			async load(input, options) {
				try {
					return await this.resources.run(() => this.#load(input, options));
				} catch (cause) {
					return err(webArtifactReadError(cause, {
						operation: this.operation,
						field: ["manifest_path"],
						targetPath: input.manifest_path,
						callerSelected: true
					}, options?.signal));
				}
			}
			async #load(input, options) {
				const acquisition = new WebArtifactAcquisition();
				let field = ["manifest_path"];
				let targetPath = input.manifest_path;
				let callerSelected = true;
				try {
					const manifestBytes = await acquisition.readJson("manifest", input.manifest_path, 32 * 1024 * 1024, options?.signal, this.resources);
					const manifest = webScriptExportManifestSchema.parse(manifestBytes.value);
					acquisition.record("manifest", {
						path: input.manifest_path,
						sha256: manifestBytes.sha256,
						bytes: manifestBytes.bytes.length
					}, "manifest-validated");
					field = ["script_index"];
					const selected = manifest.scripts[input.script_index];
					if (selected === undefined) return err(acquisition.retain(new AnalysisInputError(this.operation, undefined, [manifest.scripts.length === 0 ? {
						path: ["script_index"],
						reason: "invalid_value",
						message: "The selected manifest contains no scripts."
					} : {
						path: ["script_index"],
						reason: "out_of_range",
						minimum: 0,
						maximum: manifest.scripts.length - 1,
						message: `No script at index ${String(input.script_index)}; the manifest contains ${String(manifest.scripts.length)} scripts.`
					}])));
					if (selected.content.state !== "exported") return err(acquisition.retain(new AnalysisCapabilityUnavailableError("web-module-artifacts", this.operation, "selected_source_unavailable", { userMessage: `Selected script ${String(input.script_index)} has unavailable source bytes (${selected.content.reason}): ${selected.content.message} Capture source bytes before tracing this script.` })));
					callerSelected = false;
					const portable = normalizeArtifactPath(selected.content.relative_path);
					if (portable !== selected.content.relative_path) throw new ArtifactReaderFailure("path", `Selected source path changes during normalization: ${selected.content.relative_path}`);
					if (this.platform === "win32" && portable.includes("\\")) throw new ArtifactReaderFailure("path", `Windows source path cannot contain backslashes as literal name characters: ${JSON.stringify(portable)}`);
					const selectedParent = dirname(input.manifest_path);
					targetPath = selectedParent;
					const root = await realpath(selectedParent);
					const sourcePath = join(root, "files", portable);
					targetPath = sourcePath;
					await assertContained(root, sourcePath);
					const sourceBytes = await acquisition.read("source", sourcePath, 16 * 1024 * 1024, options?.signal, this.resources);
					await assertContained(root, sourcePath);
					if (sourceBytes.sha256 !== selected.content.sha256 || sourceBytes.bytes.length !== selected.content.bytes) throw new ArtifactReaderFailure("integrity", `Selected source identity mismatch: ${sourcePath}; expected sha256=${selected.content.sha256}, bytes=${String(selected.content.bytes)}; observed sha256=${sourceBytes.sha256}, bytes=${String(sourceBytes.bytes.length)}.`, { integrityCheck: "member-identity" }, {
						logicalPath: selected.content.relative_path,
						declaredSha256: selected.content.sha256,
						calculatedSha256: sourceBytes.sha256,
						unpacked: false
					});
					acquisition.record("source", {
						path: sourcePath,
						sha256: sourceBytes.sha256,
						bytes: sourceBytes.bytes.length
					}, "source-verified");
					const source = decodeWebArtifact(sourceBytes.bytes);
					return ok({
						manifest,
						manifestFile: {
							path: input.manifest_path,
							sha256: manifestBytes.sha256,
							bytes: manifestBytes.bytes.length
						},
						sourceFile: {
							path: sourcePath,
							sha256: sourceBytes.sha256,
							bytes: sourceBytes.bytes.length
						},
						source
					});
				} catch (cause) {
					return err(acquisition.retain(webArtifactReadError(cause, {
						operation: this.operation,
						field,
						targetPath,
						callerSelected
					}, options?.signal)));
				}
			}
		};
		assertContained = async (root, path) => {
			const canonicalFile = await realpath(path);
			if (!isPathWithinRoot(root, canonicalFile)) throw new ArtifactReaderFailure("path", `Selected source escapes its manifest directory: ${path}`);
			let directory = dirname(path);
			while (directory !== root) {
				const stat = await lstat(directory);
				if (!stat.isDirectory() || stat.isSymbolicLink()) throw new ArtifactReaderFailure("path", `Selected source directory is a symlink or not a directory: ${directory}`);
				const parent = dirname(directory);
				if (parent === directory) throw new ArtifactReaderFailure("path", "Selected source has no containing manifest directory.");
				directory = parent;
			}
		};
	})))();
}

//#endregion
//#region dist/browser/WebArtifactCleanup.js
var cleanupOwner, WebArtifactCleanup, webArtifactCleanupFailures;
function init_WebArtifactCleanup() {
	return (init_WebArtifactCleanup = __esmMin((() => {
		init_resources();
		init_LocalWebScriptArtifacts();
		init_analysisErrorBase();
		init_analysisErrorProjection();
		init_providerCleanupError();
		init_errorMessage();
		cleanupOwner = (resource, close) => {
			let retained = [resource];
			const lease = new AnalysisCleanupLease(async () => {
				try {
					await close();
				} catch (cause) {
					if (cause instanceof AnalysisError) lease.bindCleanupError(cause);
					retained = cause instanceof AnalysisError && cause.cleanupResources.length > 0 ? cause.cleanupResources : ArtifactReaderFailure.cleanupObservation(cause, resource).resources;
					throw cause;
				}
			}, { get cleanupResources() {
				return retained;
			} });
			return {
				resource,
				lease
			};
		};
		WebArtifactCleanup = class {
			owner;
			#owners;
			#operation;
			constructor(owner, resources, scripts) {
				this.owner = owner;
				const sourceLocation = owner === "web-source-location-artifacts";
				this.#operation = sourceLocation ? "trace_web_source_location" : "trace_web_module_imports";
				const resource = sourceLocation ? "web source-location artifacts" : "web module artifacts";
				const closeScript = scripts instanceof LocalWebScriptArtifacts && scripts.resources === resources ? undefined : scripts.close?.bind(scripts);
				this.#owners = [cleanupOwner(resource, () => resources.close()), ...closeScript === undefined ? [] : [cleanupOwner("web scripts", closeScript)]];
			}
			async close() {
				const pending = this.#owners.filter(({ lease }) => !lease.released);
				const results = await Promise.allSettled(pending.map(({ lease }) => lease.release()));
				const failures = results.flatMap((result, index) => result.status === "rejected" ? [{
					cause: result.reason,
					...pending[index]
				}] : []);
				const error = webArtifactCleanupFailures(this.owner, this.#operation, failures);
				if (error !== undefined) {
					new AnalysisCleanupLeaseGroup(error, failures.map(({ lease }) => lease));
					throw error;
				}
			}
		};
		webArtifactCleanupFailures = (owner, operation, failures) => {
			if (failures.length === 0) return undefined;
			const normalized = failures.map(({ resource, cause }) => {
				if (cause instanceof AnalysisError) {
					const projection = projectAnalysisError(cause);
					return {
						cause,
						projection,
						observation: {
							reason: projection.message,
							resources: cause.cleanupResources.length === 0 ? [resource] : cause.cleanupResources
						}
					};
				}
				return {
					cause,
					projection: undefined,
					observation: ArtifactReaderFailure.cleanupObservation(cause, resource)
				};
			});
			const recoveryActions = [...new Set(normalized.flatMap(({ projection }) => projection === undefined ? [] : [projection.remediation.action]))];
			return new ProviderCleanupError(owner, [...new Set(normalized.flatMap(({ observation }) => observation.resources))], {
				reason: normalized.map(({ observation }) => observation.reason).join("; "),
				failures: normalized.map(({ cause, projection, observation }) => projection !== undefined ? projection : {
					name: cause instanceof Error ? cause.name : "UnknownError",
					message: errorMessage(cause),
					resource: [...observation.resources]
				})
			}, {
				cause: normalized.length === 1 ? normalized[0].cause : new AggregateError(normalized.map(({ cause }) => cause), `${owner} cleanup failed`),
				operation,
				...recoveryActions.length === 0 ? {} : { remediationAction: recoveryActions.join("; ") }
			});
		};
	})))();
}

//#endregion
export { LocalWebScriptArtifacts, WEB_MODULE_TRACE_PROVIDER, WEB_SOURCE_LOCATION_PROVIDER, WebArtifactAcquisition, WebArtifactCleanup, capturedWebManifestIdentity, closeOwnedWebResources, decodeWebArtifact, init_LocalWebScriptArtifacts, init_ValidateSelectedWebScript, init_WebArtifactCleanup, init_WebArtifactReads, init_closeOwnedWebResources, init_webTraceProviders, validateSelectedWebScript, webArtifactReadError };