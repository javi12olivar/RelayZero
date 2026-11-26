import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisError, AnalysisInputError, AnalysisOutputError, cancelledBy, carriedReason, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation, init_localPath, isPathWithinRoot } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, decodeStrictUtf8, init_HostPlatform, init_parseFailureAnalysisError, init_strictUtf8, parseFailureAnalysisError, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactFileCleanupFailure, ArtifactReaderFailure, ArtifactResourceScope, NonRegularFileReadError, RegularFileChangedError, artifactFileCancellationCause, artifactFileCompletion, assertArtifactReadActive, bindArtifactFileCleanup, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedRegularFile, init_RegularFile, init_resources, regularFileCancellation } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { BINARY_ARCHITECTURES, init_binaryTargetTypes } from "./binaryTargetTypes-CrE-Muhh.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { describeElectronFuseFindings, electronFuseReportSchema, init_electronFuses as init_electronFuses$1, inspectElectronFusesInputSchema } from "./sessionToolContracts-D9XcfL6p.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { ElectronFuseResourceFailure, electronFuseReadLimitation, init_ElectronFuseReader, readElectronFuseImage } from "./ElectronFuseReader-CJ3jIKlX.js";
import { basename, dirname, isAbsolute, sep } from "node:path";
import { ZodError } from "zod";
import { lstat, readlink } from "node:fs/promises";

//#region dist/domain/electron/electronFuseEvidence.js
var createElectronFuseEvidence, subjectArchitecture, locationsFor;
function init_electronFuseEvidence() {
	return (init_electronFuseEvidence = __esmMin((() => {
		init_binaryTargetTypes();
		init_evidence();
		createElectronFuseEvidence = (input, value, provider) => {
			const architecture = subjectArchitecture(value);
			return createEvidence({
				path: value.artifact.resolved_path,
				sha256: value.artifact.sha256,
				format: value.artifact.format,
				...architecture === undefined ? {} : { architecture }
			}, provider, {
				operation: "inspect_electron_fuses",
				parameters: input,
				result: value,
				confidence: "observed",
				limitations: value.limitations,
				locations: locationsFor(value)
			});
		};
		subjectArchitecture = (report) => {
			if (report.artifact.format === "mach-o-universal") return undefined;
			if (report.slices.length !== 1) return undefined;
			const name = report.slices[0]?.architecture;
			return BINARY_ARCHITECTURES.find((supported) => supported === name);
		};
		locationsFor = (report) => [
			{
				kind: "artifact-path",
				path: report.artifact.selected_path
			},
			...report.artifact.resolved_path === report.artifact.selected_path ? [] : [{
				kind: "artifact-path",
				path: report.artifact.resolved_path
			}],
			...report.slices.flatMap((slice) => slice.sentinels.map((sentinel) => ({
				kind: "file-offset",
				offset: sentinel.sentinel_offset
			})))
		];
	})))();
}

//#endregion
//#region dist/application/electron/ElectronFuseService.js
var OPERATION$2, ElectronFuseService;
function init_ElectronFuseService() {
	return (init_ElectronFuseService = __esmMin((() => {
		init_analysisErrorCore();
		init_electronFuses$1();
		init_electronFuseEvidence();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		OPERATION$2 = "inspect_electron_fuses";
		ElectronFuseService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			/** Await and retry the reader's exact retained descriptor owners. */
			async close() {
				await this.provider.close();
			}
			/** Read fuse wires for one explicitly selected path without launching it. */
			async inspect(rawInput, options) {
				const input = parseAnalysisInput(OPERATION$2, rawInput, inspectElectronFusesInputSchema, options?.signal);
				if (!input.ok) return input;
				const inspected = await this.provider.inspect(input.value, options);
				if (!inspected.ok) return inspected;
				const report = electronFuseReportSchema.safeParse(inspected.value);
				if (!report.success || report.data.artifact.selected_path !== input.value.path) return err(new AnalysisOutputError(OPERATION$2, "Electron fuse reader returned a malformed report or changed the selected artifact identity."));
				return completeProviderEvidence(createElectronFuseEvidence(input.value, report.data, this.provider.identity), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/electron/ElectronFusePath.js
var FRAMEWORK_NAME, BINARY_NAME, MAX_SYMLINK_HOPS, ElectronFusePathFailure, resolveElectronFuseTarget, resolveFrameworkSymlink, resolveBundleBinary, resolveDirectorySuffix, resolveKnownBinary, resolveInside, requireFrameworkRoot, requireRealDirectories, requireFile, pathWalkFailure, frameworkRootOf, relativeInside, appendPath, isMissing, symlinkTargetSegments;
function init_ElectronFusePath() {
	return (init_ElectronFusePath = __esmMin((() => {
		init_HostPlatform();
		init_strictUtf8();
		init_resources();
		init_localPath();
		FRAMEWORK_NAME = "Electron Framework.framework";
		BINARY_NAME = "Electron Framework";
		MAX_SYMLINK_HOPS = 32;
		ElectronFusePathFailure = class extends Error {
			reason;
			constructor(reason, message) {
				super(message);
				this.reason = reason;
				this.name = "ElectronFusePathFailure";
			}
		};
		resolveElectronFuseTarget = async (selectedPath, signal) => {
			assertArtifactReadActive(signal);
			const metadata = await lstat(selectedPath, { bigint: true });
			let file;
			if (metadata.isSymbolicLink()) file = await resolveFrameworkSymlink(selectedPath, signal);
			else if (metadata.isFile()) file = frameworkRootOf(selectedPath) === null ? {
				path: selectedPath,
				metadata,
				nodes: []
			} : await resolveFrameworkSymlink(selectedPath, signal);
			else if (metadata.isDirectory()) {
				file = await resolveBundleBinary(selectedPath, signal);
				file = {
					...file,
					nodes: [{
						path: selectedPath,
						metadata
					}, ...file.nodes]
				};
			} else throw new ElectronFusePathFailure("invalid_format", `Expected a regular file or Electron app bundle: ${selectedPath}`);
			return {
				selectedPath,
				file
			};
		};
		resolveFrameworkSymlink = async (selectedPath, signal) => {
			const root = frameworkRootOf(selectedPath);
			if (root === null) throw new ElectronFusePathFailure("invalid_format", `Expected a regular file without a symlink: ${selectedPath}`);
			const nodes = await requireFrameworkRoot(root, selectedPath);
			const relativePath = relativeInside(root, selectedPath);
			if (relativePath === null) throw new ElectronFusePathFailure("invalid_value", `Framework symlink escapes ${FRAMEWORK_NAME}: ${selectedPath}`);
			return requireFile(await resolveInside(root, relativePath, signal), selectedPath, nodes);
		};
		resolveBundleBinary = async (selectedPath, signal) => {
			const directory = await resolveDirectorySuffix(selectedPath, signal);
			const name = basename(directory.path);
			let file;
			if (name === FRAMEWORK_NAME) file = await resolveKnownBinary(directory.path, selectedPath, signal);
			else if (name.endsWith(".app")) file = await resolveKnownBinary(appendPath(directory.path, "Contents", "Frameworks", FRAMEWORK_NAME), selectedPath, signal);
			else throw new ElectronFusePathFailure("invalid_format", `Expected an Electron .app bundle, ${FRAMEWORK_NAME} directory, or executable file: ${selectedPath}`);
			return {
				...file,
				nodes: [...directory.nodes, ...file.nodes]
			};
		};
		resolveDirectorySuffix = async (selectedPath, signal) => {
			let path = selectedPath;
			const pending = [];
			const nodes = [];
			while (true) {
				assertArtifactReadActive(signal);
				const name = basename(path);
				if (name !== "") while (path.endsWith(sep)) path = path.slice(0, -1);
				if (name === "." || name === "..") {
					pending.push(name);
					path = dirname(path);
					continue;
				}
				const component = pending.pop();
				if (component === undefined) return {
					path,
					nodes
				};
				if (component === ".") continue;
				const metadata = await lstat(path, { bigint: true });
				if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new ElectronFusePathFailure("invalid_value", `A bundle path ending in '..' requires a real directory before each parent segment: ${selectedPath}`);
				nodes.push({
					path,
					metadata
				});
				path = dirname(path);
			}
		};
		resolveKnownBinary = async (root, bundle, signal) => {
			const nodes = await requireFrameworkRoot(root, bundle);
			for (const candidate of [
				BINARY_NAME,
				`Versions/Current/${BINARY_NAME}`,
				`Versions/A/${BINARY_NAME}`
			]) {
				const selected = await resolveInside(root, candidate, signal);
				if (selected.kind === "file") return requireFile(selected, bundle, nodes);
				if (selected.kind !== "absent") throw pathWalkFailure(selected.kind, bundle);
			}
			throw new ElectronFusePathFailure("invalid_value", `Electron Framework binary was not found inside ${bundle}.`);
		};
		resolveInside = async (root, relativePath, signal) => {
			const pending = relativePath.split("/").filter((segment) => segment !== "");
			const resolved = [];
			const nodes = [];
			let fileMetadata;
			let hops = 0;
			let last;
			while (pending.length > 0) {
				assertArtifactReadActive(signal);
				const segment = pending.shift() ?? "";
				if (segment === ".") continue;
				if (segment === "..") {
					if (resolved.length === 0) return { kind: "escapes" };
					resolved.pop();
					last = "directory";
					continue;
				}
				const absolute = appendPath(root, ...resolved, segment);
				if (!isPathWithinRoot(root, absolute)) return { kind: "escapes" };
				let metadata;
				try {
					metadata = await lstat(absolute, { bigint: true });
				} catch (cause) {
					if (isMissing(cause)) return { kind: "absent" };
					throw cause;
				}
				if (metadata.isSymbolicLink()) {
					nodes.push({
						path: absolute,
						metadata
					});
					hops += 1;
					if (hops > MAX_SYMLINK_HOPS) return { kind: "loop" };
					const rawTarget = await readlink(absolute, { encoding: "buffer" });
					let target;
					try {
						target = decodeStrictUtf8(rawTarget, "preserve");
					} catch {
						throw new ElectronFusePathFailure("invalid_value", `Framework symlink target is not valid UTF-8 (raw target bytes: ${rawTarget.toString("hex")}): ${absolute}`);
					}
					const absoluteTarget = isAbsolute(target);
					const relativeTarget = absoluteTarget ? relativeInside(root, target) : target;
					if (relativeTarget === null) return { kind: "escapes" };
					if (absoluteTarget) resolved.length = 0;
					pending.unshift(...symlinkTargetSegments(relativeTarget));
					continue;
				}
				if (metadata.isDirectory()) {
					nodes.push({
						path: absolute,
						metadata
					});
					resolved.push(segment);
					last = "directory";
					continue;
				}
				if (!metadata.isFile() || pending.length > 0) return { kind: "not-file" };
				resolved.push(segment);
				fileMetadata = metadata;
				last = "file";
			}
			if (last !== "file" || fileMetadata === undefined) return { kind: "not-file" };
			const path = appendPath(root, ...resolved);
			return isPathWithinRoot(root, path) ? {
				kind: "file",
				path,
				metadata: fileMetadata,
				nodes
			} : { kind: "escapes" };
		};
		requireFrameworkRoot = async (root, selectedPath) => {
			const frameworks = dirname(root);
			const contents = dirname(frameworks);
			const app = dirname(contents);
			if (basename(frameworks) === "Frameworks" && basename(contents) === "Contents" && basename(app).endsWith(".app")) return requireRealDirectories(dirname(app), [
				basename(app),
				"Contents",
				"Frameworks",
				FRAMEWORK_NAME
			], selectedPath);
			else return requireRealDirectories(dirname(root), [basename(root)], selectedPath);
		};
		requireRealDirectories = async (anchor, segments, selectedPath) => {
			let current = anchor;
			const nodes = [];
			for (const segment of segments) {
				current = appendPath(current, segment);
				let metadata;
				try {
					metadata = await lstat(current, { bigint: true });
				} catch (cause) {
					if (isMissing(cause)) throw new ElectronFusePathFailure("invalid_value", `Electron Framework binary was not found inside ${selectedPath}.`);
					throw cause;
				}
				nodes.push({
					path: current,
					metadata
				});
				if (metadata.isSymbolicLink()) throw pathWalkFailure("escapes", selectedPath);
				if (!metadata.isDirectory()) throw pathWalkFailure("not-file", selectedPath);
			}
			return nodes;
		};
		requireFile = (walk, selectedPath, nodes) => {
			if (walk.kind === "file") return {
				path: walk.path,
				metadata: walk.metadata,
				nodes: [...nodes, ...walk.nodes]
			};
			if (walk.kind === "absent") throw new ElectronFusePathFailure("invalid_value", `Electron Framework symlink target was not found: ${selectedPath}`);
			throw pathWalkFailure(walk.kind, selectedPath);
		};
		pathWalkFailure = (kind, path) => new ElectronFusePathFailure("invalid_value", kind === "escapes" ? `Framework symlink escapes ${FRAMEWORK_NAME}: ${path}` : kind === "loop" ? `Framework symlink hop limit exceeded: ${path}` : `Electron Framework path is not a regular file: ${path}`);
		frameworkRootOf = (path) => {
			let current = dirname(path);
			while (basename(current) !== FRAMEWORK_NAME) {
				const parent = dirname(current);
				if (parent === current) return null;
				current = parent;
			}
			return current;
		};
		relativeInside = (root, path) => {
			const prefix = root.endsWith(sep) ? root : `${root}${sep}`;
			if (!path.startsWith(prefix)) return null;
			const value = path.slice(prefix.length);
			return value === "" ? null : value.split(sep).join("/");
		};
		appendPath = (parent, ...segments) => `${parent}${parent.endsWith(sep) ? "" : sep}${segments.join(sep)}`;
		isMissing = (cause) => cause instanceof Error && "code" in cause && ["ENOENT", "ENOTDIR"].includes(String(cause.code));
		symlinkTargetSegments = (target) => {
			const separator = HOST_PLATFORM.platform === "win32" ? /[\\/]/u : /\//u;
			const parts = target.split(separator).filter((part) => part !== "");
			if (separator.test(target.slice(-1))) parts.push(".");
			return parts;
		};
	})))();
}

//#endregion
//#region dist/electron/ElectronFuseProviderIdentity.js
var ELECTRON_FUSE_PROVIDER_IDENTITY;
function init_ElectronFuseProviderIdentity() {
	return (init_ElectronFuseProviderIdentity = __esmMin((() => {
		ELECTRON_FUSE_PROVIDER_IDENTITY = {
			id: "electron-fuses",
			name: "REA Electron fuse reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/electron/ElectronFuseFailures.js
var OPERATION$1, electronFuseFailure;
function init_ElectronFuseFailures() {
	return (init_ElectronFuseFailures = __esmMin((() => {
		init_parseFailureAnalysisError();
		init_ElectronFuseProviderIdentity();
		init_resources();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_OwnedRegularFile();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_fixedAllowanceRemediation();
		init_providerAdapterError();
		init_RegularFile();
		init_ElectronFusePath();
		init_ElectronFuseReader();
		init_errorMessage();
		OPERATION$1 = "inspect_electron_fuses";
		electronFuseFailure = (cause, path, operation = OPERATION$1) => {
			if (cause instanceof AnalysisError) return cause;
			if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
				const cleanup = new ProviderCleanupError(ELECTRON_FUSE_PROVIDER_IDENTITY.id, cause.cleanup.resources, { reason: cause.cleanup.reason }, {
					operation,
					cause
				});
				bindArtifactFileCleanup(cause, cleanup);
				if (cause instanceof ArtifactFileCleanupFailure) {
					const outcome = cause.fileCleanupFailure.outcome;
					const cancellation = artifactFileCompletion(cause)?.cancellation;
					const primary = outcome.kind === "failed" ? electronFuseFailure(outcome.cause, path, operation) : cancellation === undefined ? undefined : cancelledBy(operation, carriedReason(cancellation.reason));
					if (primary !== undefined) return analysisErrorWithCleanupDependencies(primary, cleanup, operation);
				}
				return cleanup;
			}
			if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") return cancelledBy(operation, carriedReason(artifactFileCancellationCause(cause)));
			const cancellation = regularFileCancellation(cause);
			if (cancellation !== undefined) return cancelledBy(operation, carriedReason(cancellation.reason));
			if (cause instanceof ElectronFusePathFailure) return new AnalysisInputError(operation, { cause }, [{
				path: ["path"],
				reason: cause.reason,
				message: cause.message
			}]);
			if (cause instanceof ElectronFuseResourceFailure) {
				const { name, maximum } = cause.limit;
				const fileSize = name === "maximum_input_bytes";
				return parseLimitConstraint(operation, fileSize ? "file-size" : "capacity", cause, {
					legacyMaximumKey: name,
					...fixedAllowanceOptions(fileSize ? "the Electron fuse input allowance" : "The Electron fuse sentinel inventory", fileSize ? "input" : "count", {
						limit: maximum,
						unit: fileSize ? "bytes" : "sentinels per slice"
					})
				});
			}
			const formatFailure = parseFailureAnalysisError(operation, path, cause);
			if (formatFailure !== undefined) return formatFailure;
			if (cause instanceof RegularFileChangedError) return new AnalysisArtifactChangedError(operation, path, cause.message, { cause });
			if (cause instanceof NonRegularFileReadError) return new AnalysisInputError(operation, { cause }, [{
				path: ["path"],
				reason: "invalid_format",
				message: cause.message
			}]);
			if (cause instanceof ZodError) return new AnalysisOutputError(operation, "Electron fuse reader produced a report outside its schema.", { cause });
			if (cause instanceof Error && "code" in cause) {
				if (cause.code === "EACCES" || cause.code === "EPERM") return new AnalysisAccessDeniedError(operation, path, cause.code, { cause });
				if ([
					"ENOENT",
					"ENOTDIR",
					"ELOOP",
					"ENAMETOOLONG"
				].includes(String(cause.code))) return new AnalysisInputError(operation, { cause }, [{
					path: ["path"],
					reason: "invalid_value",
					message: `Selected artifact could not be read (${String(cause.code)}): ${path}.`
				}]);
			}
			return new ProviderAdapterError(ELECTRON_FUSE_PROVIDER_IDENTITY.id, operation, {
				cause,
				diagnostics: {
					path,
					reason: errorMessage(cause)
				}
			});
		};
	})))();
}

//#endregion
//#region dist/electron/ElectronFuseProvider.js
var OPERATION, ElectronFuseProvider, reportFor;
function init_ElectronFuseProvider() {
	return (init_ElectronFuseProvider = __esmMin((() => {
		init_electronFuseEvidence();
		init_resources();
		init_analysisErrorCore();
		init_electronFuses$1();
		init_result();
		init_ElectronFusePath();
		init_ElectronFuseReader();
		init_ElectronFuseFailures();
		init_ElectronFuseProviderIdentity();
		OPERATION = "inspect_electron_fuses";
		ElectronFuseProvider = class {
			identity = ELECTRON_FUSE_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			/** Retry the same failed descriptor owners, awaiting active reads first. */
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					throw electronFuseFailure(cause, "artifact-resources");
				}
			}
			async inspect(input, options) {
				try {
					return await this.#resources.run(() => this.#inspectFile(input, options));
				} catch (cause) {
					return err(electronFuseFailure(cause, input.path));
				}
			}
			async #inspectFile(input, options) {
				let resolvedPath = input.path;
				let completed;
				try {
					assertArtifactReadActive(options?.signal);
					const located = await resolveElectronFuseTarget(input.path, options?.signal);
					assertArtifactReadActive(options?.signal);
					resolvedPath = located.file.path;
					const image = await readElectronFuseImage(located.file.path, {
						resources: this.#resources,
						selection: located.file,
						...options?.signal === undefined ? {} : { signal: options.signal }
					});
					completed = reportFor(image, located.selectedPath, resolvedPath);
					assertArtifactReadActive(options?.signal);
					return ok(completed);
				} catch (cause) {
					const failure = electronFuseFailure(cause, input.path);
					const completion = artifactFileCompletion(cause);
					const report = completed ?? (completion === undefined ? undefined : reportFor(completion.value, input.path, resolvedPath));
					if (report !== undefined) {
						failure.retainPartialObservation(createElectronFuseEvidence(input, report, this.identity));
					}
					return err(failure);
				}
			}
		};
		reportFor = (image, selectedPath, resolvedPath) => {
			const findings = describeElectronFuseFindings(image.slices, image.format);
			const parsed = electronFuseReportSchema.safeParse({
				artifact: {
					selected_path: selectedPath,
					resolved_path: resolvedPath,
					sha256: image.sha256,
					bytes: image.bytes,
					format: image.format
				},
				slices: image.slices,
				runtime_implications: findings.runtime_implications,
				limitations: [...findings.limitations, electronFuseReadLimitation()]
			});
			if (!parsed.success) throw new AnalysisOutputError(OPERATION, "Electron fuse reader produced a report outside its schema.", { cause: parsed.error });
			return parsed.data;
		};
	})))();
}

//#endregion
//#region dist/composition/electronFuses.js
var createElectronFuseService;
function init_electronFuses() {
	return (init_electronFuses = __esmMin((() => {
		init_ElectronFuseService();
		init_ElectronFuseProvider();
		createElectronFuseService = () => new ElectronFuseService(new ElectronFuseProvider());
	})))();
}

//#endregion
export { ELECTRON_FUSE_PROVIDER_IDENTITY, createElectronFuseService, electronFuseFailure, init_ElectronFuseFailures, init_ElectronFusePath, init_ElectronFuseProviderIdentity, init_electronFuses, resolveElectronFuseTarget };