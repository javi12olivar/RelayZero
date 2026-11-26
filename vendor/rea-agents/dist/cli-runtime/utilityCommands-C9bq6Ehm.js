import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisInputError, AnalysisOutputError, cancelledBy, carriedReason, errorMessage, init_analysisErrorCore, init_errorMessage, init_localPath, init_schemaConstraints, init_sha256Hex, isAborted as isAborted$1, isPathWithinRoot, localPathStringSchema, requirePresence, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_safeJson, init_strictUtf8, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, appendCallerPath, compareUnicodeCodePoints, init_callerPath, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { init_inputIssueProjection, projectInputIssues } from "./inputIssueProjection-W-zXU1iH.js";
import { CLI_COMMANDS, cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliLogging, isCliOperationFailure, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { ArtifactReaderFailure, ArtifactResourceScope, NonRegularFileReadError, OwnedDirectoryHandle, OwnedFileHandle, RegularFileAdmissionFailure, RegularFileCleanupFailure, decodeDirectoryEntryName, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedDirectoryHandle, init_OwnedFileHandle, init_OwnedRegularFile, init_RegularFile, init_decodeDirectoryEntryName, init_resources, openRegularFile, regularFileCancellation } from "./resources-B3P64jvH.js";
import { init_artifactIdentity, logicalPathEscapesRoot } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { RegularFileReadFailure, init_RegularFileRead, readRegularFile, readRegularFileText, retryRegularFileCleanup } from "./RegularFileRead-CRu2Ia6l.js";
import { init_javascriptSemanticWorkAllowance, isJavaScriptMemberMutationRefusal } from "./urlComponents-DJm-wtqY.js";
import { init_javascriptMemberMutationAllowance, resolveJavaScriptMemberMutationAllowance } from "./javascriptMemberMutationAllowance-Buy1-9LU.js";
import { init_parseConfig, parseConfig } from "./parseConfig-Bllp42MT.js";
import { init_javascriptArtifactFiles, isJavaScriptSourcePath } from "./javascriptArtifactFiles-DG1s4eez.js";
import { admittedContractInput, contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand, registerContractDocumentCommand, runOnSessionTarget } from "./contractCommand-Di2ugplH.js";
import { createHistoricalSourceGraph, createHistoricalSourceManifest, createReferenceSourcePathLookup, decodeReferenceSourceModuleUrlPath, historicalSourceInventoryHasPartialFacts, historicalSourceLanguages, historicalSourceManifests, historicalSourceParseFailureKey, historicalSourceRelationshipKey, init_referenceSourceGraph, init_referenceSourcePathIdentity, isPortableAbsoluteReferenceTarget, rebaseReferenceSourceTarget } from "./referenceSourceGraph-Bt5EfEba.js";
import { appendAll, init_appendAll } from "./appendAll-DYoV9cyW.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { cliDecimalField, init_options } from "./options-BYpy7iiK.js";
import { JavaScriptLoaderSyntaxError, completeSemanticSteps, init_javascriptAstValues, init_javascriptSemanticTraversal, init_javascriptSourceParser, javaScriptRuntimeContext, javaScriptSourceLoaderCondition, parseRecoveredJavaScript, readExactJavaScriptLiteral, semanticMemberChain, semanticStaticPropertyKey, traverseJavaScriptAst, unwrapJavaScriptExpression } from "./javascriptSourceParser-DNZsD0XO.js";
import { init_javascriptSemanticGlobalReference, init_javascriptSemanticRequireOrigin, isUnmodifiedGlobalReference, semanticRequireCallAt, semanticRequireLoaderAt, semanticSelectedMemberMayHaveChanged } from "./javascriptSemanticProjection-BqYDHF-_.js";
import { indexJavaScriptBindingsWithReceiversSteps, init_javascriptSemanticAnalysis } from "./javascriptSemanticAnalysis--51Xux_e.js";
import { init_TypeScriptEmittedSourceCandidates, init_javascriptModuleSpecifier, isRelativeJavaScriptModuleSpecifier, typescriptEmittedSourceCandidates } from "./TypeScriptEmittedSourceCandidates-BUE3Wvs3.js";
import { NATIVE_TOOL_CONTRACTS, init_nativeToolContracts } from "./nativeToolContracts-CqgzCixq.js";
import fs, { constants } from "node:fs";
import { basename, dirname, join, posix, relative, sep } from "node:path";
import { z } from "zod";
import { lstat, opendir, readlink, realpath, stat } from "node:fs/promises";
import * as t from "@babel/types";
import { isCallExpression, isExportAllDeclaration, isExportNamedDeclaration, isImportDeclaration, isImportExpression, isNewExpression, isOptionalCallExpression, isStringLiteral, isTSExternalModuleReference, isTSImportEqualsDeclaration, isTSImportType, isTSModuleDeclaration } from "@babel/types";
import ignore from "ignore";

//#region dist/domain/referenceSourceSummary.js
var outlineEntry, createHistoricalSourceSummary;
function init_referenceSourceSummary() {
	return (init_referenceSourceSummary = __esmMin((() => {
		init_referenceSourceGraph();
		outlineEntry = (entry) => {
			if (entry.kind !== "file") return entry;
			return {
				path: entry.path,
				kind: entry.kind,
				language: entry.language,
				size: entry.size,
				content_state: entry.content_state,
				classifications: entry.classifications,
				limitations: entry.limitations,
				...entry.local_diagnostics === undefined ? {} : { local_diagnostics: entry.local_diagnostics }
			};
		};
		createHistoricalSourceSummary = (graph, outlineDepth) => {
			const manifest = createHistoricalSourceManifest(graph);
			const counts = {
				entries: graph.entries.length,
				files: 0,
				directories: 0,
				symlinks: 0,
				unknown: 0,
				relationships: graph.relationships.length,
				parse_failures: graph.parse_failures.length,
				exclusions: graph.exclusions.length
			};
			const contentStates = {
				hashed: 0,
				"redacted-secret": 0,
				excluded: 0,
				unreadable: 0,
				unknown: 0
			};
			const treeStates = {
				enumerated: 0,
				partial: 0,
				excluded: 0,
				unreadable: 0,
				unknown: 0
			};
			let knownBytes = 0n;
			let unknownSizeFiles = 0;
			const outline = [];
			for (const entry of graph.entries) {
				if (entry.kind === "file") {
					counts.files += 1;
					contentStates[entry.content_state] += 1;
					if (entry.size === null) unknownSizeFiles += 1;
					else knownBytes += BigInt(entry.size);
				} else if (entry.kind === "directory") {
					counts.directories += 1;
					treeStates[entry.tree_state] += 1;
				} else if (entry.kind === "symlink") counts.symlinks += 1;
				else counts.unknown += 1;
				if (entry.path.split("/").length <= outlineDepth) outline.push(outlineEntry(entry));
			}
			return {
				schema: "HistoricalSourceSummary",
				authority: graph.authority,
				root_alias: graph.root_alias,
				manifest,
				inventory_state: graph.inventory_state,
				provenance: graph.provenance,
				vcs: graph.vcs,
				languages: graph.languages,
				manifests: graph.manifests,
				counts,
				file_content_states: contentStates,
				directory_tree_states: treeStates,
				file_sizes: {
					known_bytes: knownBytes.toString(),
					unknown_file_count: unknownSizeFiles
				},
				exclusions: graph.exclusions,
				limitations: graph.limitations,
				outline: {
					depth: outlineDepth,
					entries: outline,
					omitted_entry_count: graph.entries.length - outline.length
				}
			};
		};
	})))();
}

//#endregion
//#region dist/reference/ReferenceSourceReaderErrors.js
var failure$2, cancelled$1, safeSize, FILESYSTEM_ERROR_CODES, filesystemFailureDetail, entryFailure;
function init_ReferenceSourceReaderErrors() {
	return (init_ReferenceSourceReaderErrors = __esmMin((() => {
		failure$2 = (code, message) => ({
			tag: "reference-source-reader",
			code,
			message
		});
		cancelled$1 = (signal) => ({
			...failure$2("cancelled", "Reference source traversal cancelled"),
			...signal?.aborted === true ? { cause: signal.reason } : {}
		});
		safeSize = (size) => {
			const value = Number(size);
			return Number.isSafeInteger(value) && value >= 0 ? value : undefined;
		};
		FILESYSTEM_ERROR_CODES = new Set([
			"EACCES",
			"EBADF",
			"EEXIST",
			"EIO",
			"EISDIR",
			"ELOOP",
			"EMFILE",
			"ENAMETOOLONG",
			"ENFILE",
			"ENOENT",
			"ENOTDIR",
			"ENOSPC",
			"EPERM",
			"EROFS"
		]);
		filesystemFailureDetail = (cause, operation) => {
			if (!(cause instanceof Error)) return undefined;
			const code = Reflect.get(cause, "code");
			if (typeof code !== "string" || !FILESYSTEM_ERROR_CODES.has(code)) return undefined;
			const message = code === "ENAMETOOLONG" ? `${operation}: ENAMETOOLONG (entry path exceeds the operating system path limit)` : `${operation}: ${code}`;
			const localDiagnostic = `${operation}: ${cause.message}`;
			return {
				message,
				...localDiagnostic === message ? {} : { localDiagnostic }
			};
		};
		entryFailure = (...[path, kind, code, message, size, localDiagnostic]) => ({
			status: "failed",
			kind,
			path,
			code,
			message,
			...size === undefined ? {} : { size },
			...localDiagnostic === undefined ? {} : { localDiagnostic }
		});
	})))();
}

//#endregion
//#region dist/reference/ReferenceSourceReaderPaths.js
var pathFromRoot;
function init_ReferenceSourceReaderPaths() {
	return (init_ReferenceSourceReaderPaths = __esmMin((() => {
		init_localPath();
		pathFromRoot = (root, path) => {
			const value = relative(root, path);
			return isPathWithinRoot(root, path) ? value.split(sep).join("/") || "." : "<outside-root>";
		};
	})))();
}

//#endregion
//#region dist/reference/ReferenceSourceFailureBuilders.js
var referenceSourceResourceFailure, rootFilesystemFailure;
function init_ReferenceSourceFailureBuilders() {
	return (init_ReferenceSourceFailureBuilders = __esmMin((() => {
		init_ReferenceSourceReaderErrors();
		referenceSourceResourceFailure = (cause) => ({
			tag: "reference-source-reader",
			code: cause.reason === "cancelled" ? "cancelled" : "io",
			message: cause.message,
			...cause.cleanup === undefined ? {} : { cleanup: cause.cleanup },
			cause
		});
		rootFilesystemFailure = (cause, operation) => {
			if (!(cause instanceof Error)) return undefined;
			const code = Reflect.get(cause, "code");
			if (typeof code !== "string" || !FILESYSTEM_ERROR_CODES.has(code)) return undefined;
			return {
				code: [
					"ENOENT",
					"ENOTDIR",
					"ELOOP",
					"ENAMETOOLONG"
				].includes(code) ? "invalid-root" : "io",
				message: `${operation}: ${cause.message}`,
				...code === "ELOOP" ? { remediationAction: "Repair the symbolic-link chain or select another reference source directory." } : code === "ENAMETOOLONG" ? { remediationAction: "Select a reference source path within the operating system's path-length limits." } : {}
			};
		};
	})))();
}

//#endregion
//#region dist/reference/ReferenceSourceReaderValidate.js
var bigLstat, sameFile, isAborted, noFollowOpenSupported, validateDirectory, prepareRoot;
function init_ReferenceSourceReaderValidate() {
	return (init_ReferenceSourceReaderValidate = __esmMin((() => {
		init_result();
		init_ReferenceSourceReaderErrors();
		init_localPath();
		init_ReferenceSourceFailureBuilders();
		bigLstat = (path) => lstat(path, { bigint: true });
		sameFile = (left, right) => left.dev === right.dev && left.ino === right.ino && left.size === right.size && left.mtimeNs === right.mtimeNs && left.ctimeNs === right.ctimeNs;
		isAborted = (signal) => signal?.aborted === true;
		noFollowOpenSupported = () => Number.isSafeInteger(constants.O_NOFOLLOW) && constants.O_NOFOLLOW !== 0;
		validateDirectory = async (root, rootIdentity, path, signal) => {
			if (isAborted(signal)) return {
				ok: false,
				code: "cancelled",
				message: "Reference source traversal cancelled"
			};
			try {
				const rootNow = await bigLstat(root);
				if (!sameFile(rootIdentity, rootNow)) return {
					ok: false,
					code: "changed",
					message: "Reference root changed"
				};
				const stats = path === root ? rootNow : await bigLstat(path);
				if (stats.isSymbolicLink()) return {
					ok: false,
					code: "symlink",
					message: "Symbolic links are not followed"
				};
				if (!stats.isDirectory()) return {
					ok: false,
					code: "changed",
					message: "Directory identity changed"
				};
				const canonical = await realpath(path);
				if (canonical !== path || !isPathWithinRoot(root, canonical)) return {
					ok: false,
					code: "changed",
					message: "Directory escaped the reference root"
				};
				return {
					ok: true,
					stats
				};
			} catch (cause) {
				const detail = filesystemFailureDetail(cause, "Directory identity could not be verified");
				if (detail === undefined) throw cause;
				return {
					ok: false,
					code: "io",
					...detail
				};
			}
		};
		prepareRoot = async (root, signal) => {
			if (isAborted(signal)) return err(cancelled$1(signal));
			try {
				const metadata = await bigLstat(root);
				if (metadata.isSymbolicLink() || !metadata.isDirectory()) return err(failure$2("invalid-root", `Reference source root is not a directory: ${root}`));
				const canonicalRoot = await realpath(root);
				if (isAborted(signal)) return err(cancelled$1(signal));
				const canonicalMetadata = await bigLstat(canonicalRoot);
				if (!sameFile(metadata, canonicalMetadata)) return err(failure$2("invalid-root", `Reference source root changed during resolution: ${root}`));
				return ok({
					canonicalRoot,
					rootIdentity: canonicalMetadata
				});
			} catch (cause) {
				const rootFailure = rootFilesystemFailure(cause, "Reference source root could not be resolved");
				if (rootFailure === undefined) throw cause;
				return err({
					...failure$2(rootFailure.code, `${rootFailure.message}: ${root}`),
					...rootFailure.remediationAction === undefined ? {} : { remediationAction: rootFailure.remediationAction },
					cause
				});
			}
		};
	})))();
}

//#endregion
//#region dist/reference/ReferenceSourceReaderFile.js
var READ_CHUNK_BYTES, prepareFileRead, readFileContents, finalizeFileRead, readStableFile, readStableFileEntry;
function init_ReferenceSourceReaderFile() {
	return (init_ReferenceSourceReaderFile = __esmMin((() => {
		init_OwnedRegularFile();
		init_RegularFile();
		init_OwnedFileHandle();
		init_resources();
		init_ReferenceSourceReaderErrors();
		init_ReferenceSourceReaderValidate();
		READ_CHUNK_BYTES = 64 * 1024;
		prepareFileRead = async (request, handle) => {
			const { path, expected, signal } = request;
			if (isAborted(signal)) {
				return {
					status: "failed",
					entry: entryFailure(path, "file", "cancelled", "File read cancelled", safeSize(expected.size))
				};
			}
			const before = await handle.stat({ bigint: true });
			if (!sameFile(expected, before)) {
				return {
					status: "failed",
					entry: entryFailure(path, "file", "changed", "File changed before it was read", safeSize(before.size))
				};
			}
			return {
				status: "ready",
				before
			};
		};
		readFileContents = async (request) => {
			const { handle, path, signal } = request;
			const chunks = [];
			let total = 0;
			for (;;) {
				if (isAborted(signal)) return {
					status: "failed",
					entry: entryFailure(path, "file", "cancelled", "File read cancelled", total)
				};
				const remaining = request.expectedSize - BigInt(total);
				const chunkBytes = remaining >= BigInt(READ_CHUNK_BYTES) ? READ_CHUNK_BYTES : Number(remaining) + 1;
				const chunk = Buffer.allocUnsafe(chunkBytes);
				const read = await handle.read(chunk, 0, chunk.byteLength, null);
				if (isAborted(signal)) return {
					status: "failed",
					entry: entryFailure(path, "file", "cancelled", "File read cancelled", total)
				};
				if (read.bytesRead === 0) break;
				total += read.bytesRead;
				if (BigInt(total) > request.expectedSize) return {
					status: "failed",
					entry: entryFailure(path, "file", "changed", "File grew while it was read", total)
				};
				chunks.push(chunk.subarray(0, read.bytesRead));
			}
			return {
				status: "ok",
				chunks,
				total
			};
		};
		finalizeFileRead = async (request) => {
			const { root, rootIdentity, absolute, path, handle, before, parentBefore, chunks, total } = request;
			const after = await handle.stat({ bigint: true });
			const parentAfter = await validateDirectory(root, rootIdentity, dirname(absolute), request.signal);
			if (!parentAfter.ok) return entryFailure(path, "file", parentAfter.code, parentAfter.message, total, parentAfter.localDiagnostic);
			if (!sameFile(parentBefore.stats, parentAfter.stats)) return entryFailure(path, "file", "changed", "Parent directory changed while file was read", total);
			if (!sameFile(before, after) || BigInt(total) !== after.size) return entryFailure(path, "file", "changed", "File changed while it was read", total);
			return {
				status: "read",
				kind: "file",
				path,
				bytes: Buffer.concat(chunks, total),
				size: total
			};
		};
		readStableFile = async (request) => {
			let owner;
			let cleanup;
			let entry;
			try {
				entry = await readStableFileEntry(request, (admitted) => {
					owner = admitted;
				});
			} finally {
				if (owner !== undefined) {
					const result = await request.resources.release({
						kind: "file-handle",
						handle: owner,
						resource: request.absolute
					});
					if (result.kind === "failed") cleanup = ArtifactReaderFailure.cleanupObservation(result.cause, request.absolute);
				}
			}
			return {
				entry,
				...cleanup === undefined ? {} : { cleanup }
			};
		};
		readStableFileEntry = async (request, retain) => {
			const { root, rootIdentity, absolute, path, expected, signal } = request;
			try {
				const parentBefore = await validateDirectory(root, rootIdentity, dirname(absolute), signal);
				if (!parentBefore.ok) return entryFailure(path, "file", parentBefore.code, parentBefore.message, safeSize(expected.size));
				const { handle } = await openRegularFile(absolute, {
					symlinks: "reject",
					signal
				});
				retain(new OwnedFileHandle(handle));
				const prepared = await prepareFileRead(request, handle);
				if (prepared.status === "failed") return prepared.entry;
				const contents = await readFileContents({
					handle,
					path,
					expectedSize: prepared.before.size,
					...signal === undefined ? {} : { signal }
				});
				if (contents.status === "failed") return contents.entry;
				return await finalizeFileRead({
					root,
					rootIdentity,
					absolute,
					path,
					handle,
					before: prepared.before,
					parentBefore,
					chunks: contents.chunks,
					total: contents.total,
					...signal === undefined ? {} : { signal }
				});
			} catch (caught) {
				let cause = caught;
				if (cause instanceof RegularFileAdmissionFailure) {
					retain(cause.owner);
					cause = cause.cause;
				}
				if (regularFileCancellation(cause) !== undefined) return entryFailure(path, "file", "cancelled", "File read cancelled", safeSize(expected.size));
				if (cause instanceof NonRegularFileReadError) return entryFailure(path, "file", "changed", "File is no longer a regular file", safeSize(expected.size));
				const detail = filesystemFailureDetail(cause, "File could not be read safely");
				if (detail === undefined) throw cause;
				return entryFailure(path, "file", "io", detail.message, safeSize(expected.size), detail.localDiagnostic);
			}
		};
	})))();
}

//#endregion
//#region dist/reference/ReferenceSourceReaderEntries.js
var recordDirectoryFailure, OBSERVATION_WINDOW, ahead, prefetchDirectoryValidations, traverseDirectory, settleDirectoryAdmissions, scheduleObservedDirectories, directoryReadFailure, readMetadata, processEntry, processFileEntry, readStableSymlinkTarget, cancelledSymlink, changedSymlink, readSymlinkTarget, missingSymlinkPath, applyExclusion;
function init_ReferenceSourceReaderEntries() {
	return (init_ReferenceSourceReaderEntries = __esmMin((() => {
		init_strictUtf8();
		init_resources();
		init_OwnedDirectoryHandle();
		init_callerPath();
		init_result();
		init_ReferenceSourceReaderErrors();
		init_localPath();
		init_ReferenceSourceReaderPaths();
		init_ReferenceSourceReaderFile();
		init_decodeDirectoryEntryName();
		init_ReferenceSourceReaderValidate();
		recordDirectoryFailure = (state, absolute, code, message, localDiagnostic) => {
			if (absolute === state.root) state.rootFailure = {
				code,
				message: localDiagnostic ?? message
			};
			else state.entries.push(entryFailure(pathFromRoot(state.root, absolute), "directory", code, message, undefined, localDiagnostic));
		};
		OBSERVATION_WINDOW = 4;
		ahead = (observation) => {
			observation.catch(() => undefined);
			return observation;
		};
		prefetchDirectoryValidations = (state) => {
			const { pending } = state;
			for (let index = pending.length - 1; index >= Math.max(0, pending.length - OBSERVATION_WINDOW) && state.openingLookups < OBSERVATION_WINDOW; index -= 1) {
				const directory = pending[index];
				if (directory.validation !== undefined) continue;
				state.openingLookups += 1;
				directory.validation = ahead(validateDirectory(state.root, state.rootIdentity, directory.path, state.signal).finally(() => {
					state.openingLookups -= 1;
				}));
			}
		};
		traverseDirectory = async (state, current) => {
			const before = await (current.validation ?? validateDirectory(state.root, state.rootIdentity, current.path, state.signal));
			if (!before.ok) {
				recordDirectoryFailure(state, current.path, before.code, before.message, before.localDiagnostic);
				return isAborted(state.signal) ? err(cancelled$1(state.signal)) : ok(undefined);
			}
			if (isAborted(state.signal)) return err(cancelled$1(state.signal));
			const directories = [];
			let readFailure;
			let readFailureCause;
			const recordReadFailure = (detail) => {
				recordDirectoryFailure(state, current.path, "io", detail.message, detail.localDiagnostic);
				return detail;
			};
			let unrepresentableNameCount = 0;
			let firstUnrepresentableNameHex;
			let handle;
			try {
				handle = await opendir(current.path, { encoding: "buffer" });
			} catch (cause) {
				readFailureCause = { value: cause };
				if (current.path === state.root) state.rootFailureCause = readFailureCause;
				readFailure = recordReadFailure(directoryReadFailure(cause));
			}
			if (handle !== undefined) {
				const owner = new OwnedDirectoryHandle(handle);
				let result = ok(undefined);
				let cleanup;
				const listed = [];
				let listingComplete = false;
				let listingFailure;
				try {
					result = isAborted(state.signal) ? err(cancelled$1(state.signal)) : await state.beforeDirectory?.(pathFromRoot(state.root, current.path)) ?? ok(undefined);
					if (result.ok && isAborted(state.signal)) result = err(cancelled$1(state.signal));
					while (result.ok) {
						while (!listingComplete && listed.length < OBSERVATION_WINDOW) {
							let child;
							try {
								child = await handle.read();
							} catch (cause) {
								listingFailure = {
									detail: directoryReadFailure(cause),
									cause: { value: cause }
								};
								listingComplete = true;
								break;
							}
							if (child === null) {
								listingComplete = true;
								break;
							}
							if (!Buffer.isBuffer(child.name)) {
								listingFailure = { detail: { message: "Directory entry name was not returned as raw bytes" } };
								listingComplete = true;
								break;
							}
							const decoded = decodeDirectoryEntryName(child.name);
							if (decoded.kind === "unrepresentable") {
								unrepresentableNameCount += 1;
								firstUnrepresentableNameHex ??= decoded.rawHex;
								continue;
							}
							listed.push({
								name: decoded.name,
								metadata: ahead(readMetadata(join(current.path, decoded.name)))
							});
						}
						const next = listed.shift();
						if (next === undefined) break;
						result = await processEntry(state, current, next.name, next.metadata, directories);
					}
					if (result.ok && listingFailure !== undefined) {
						readFailureCause = listingFailure.cause;
						if (current.path === state.root && readFailureCause !== undefined) state.rootFailureCause = readFailureCause;
						readFailure = recordReadFailure(listingFailure.detail);
					}
				} finally {
					await Promise.allSettled(listed.map(({ metadata }) => metadata));
					cleanup = await state.resources.release({
						kind: "directory-handle",
						handle: owner,
						resource: current.path
					});
				}
				if (cleanup.kind === "failed") {
					const observation = ArtifactReaderFailure.cleanupObservation(cleanup.cause, current.path);
					const previous = result.ok ? undefined : result.error.cleanup;
					const primary = result.ok ? readFailure !== undefined ? {
						...failure$2("io", readFailure.localDiagnostic ?? readFailure.message),
						...readFailureCause === undefined ? {} : { cause: readFailureCause.value }
					} : isAborted(state.signal) ? cancelled$1(state.signal) : failure$2("io", `Reference directory cleanup failed: ${current.path}`) : result.error;
					return err({
						...primary,
						cleanup: previous === undefined ? observation : {
							reason: `${previous.reason}; ${observation.reason}`,
							resources: [...new Set([...previous.resources, ...observation.resources])]
						},
						cause: Object.hasOwn(primary, "cause") ? primary.cause : cleanup.cause
					});
				}
				if (!result.ok) return result;
			}
			if (readFailure !== undefined) {
				scheduleObservedDirectories(state, directories);
				return isAborted(state.signal) ? err({
					...failure$2("io", readFailure.localDiagnostic ?? readFailure.message),
					...readFailureCause === undefined ? {} : { cause: readFailureCause.value }
				}) : ok(undefined);
			}
			if (isAborted(state.signal)) return err(cancelled$1(state.signal));
			const settled = validateDirectory(state.root, state.rootIdentity, current.path, state.signal).then((after) => {
				if (!after.ok || !sameFile(before.stats, after.stats)) recordDirectoryFailure(state, current.path, after.ok ? "changed" : after.code, after.ok ? "Directory changed while it was read" : after.message, after.ok ? undefined : after.localDiagnostic);
				else if (isAborted(state.signal)) return;
				else if (unrepresentableNameCount > 0) recordDirectoryFailure(state, current.path, "unsupported", `Directory contains ${String(unrepresentableNameCount)} entry name(s) that are not valid UTF-8; no filesystem operations were performed for them. First raw basename bytes: ${firstUnrepresentableNameHex ?? "unknown"}.`);
				else if (current.path !== state.root) state.entries.push({
					status: "read",
					kind: "directory",
					path: pathFromRoot(state.root, current.path)
				});
			});
			scheduleObservedDirectories(state, directories);
			state.settling.push(ahead(settled));
			if (state.settling.length > OBSERVATION_WINDOW) await state.settling.shift();
			return ok(undefined);
		};
		settleDirectoryAdmissions = async (state) => {
			const settled = await Promise.allSettled(state.settling.splice(0));
			const thrown = settled.find((outcome) => outcome.status === "rejected");
			if (thrown !== undefined) throw thrown.reason;
		};
		scheduleObservedDirectories = (state, directories) => {
			for (const directory of directories.reverse()) state.pending.push(directory);
		};
		directoryReadFailure = (cause) => {
			const detail = filesystemFailureDetail(cause, "Directory could not be read");
			if (detail === undefined) throw cause;
			return detail;
		};
		readMetadata = async (path) => {
			try {
				return {
					ok: true,
					value: await bigLstat(path)
				};
			} catch (cause) {
				const detail = filesystemFailureDetail(cause, "Entry metadata could not be read");
				if (detail === undefined) throw cause;
				return {
					ok: false,
					...detail
				};
			}
		};
		processEntry = async (state, current, name, metadataLookup, directories) => {
			const absolute = join(current.path, name);
			const path = pathFromRoot(state.root, absolute);
			const metadata = await metadataLookup;
			if (!metadata.ok) {
				const excluded = applyExclusion(state.shouldExclude, path, "unknown");
				if (!excluded.ok) return {
					ok: false,
					error: failure$2("io", "Reference source exclusion check failed")
				};
				if (excluded.value) {
					state.exclusions.push({
						path,
						kind: "unknown"
					});
					return {
						ok: true,
						value: undefined
					};
				}
				state.entries.push(entryFailure(path, "unknown", "io", metadata.message, undefined, metadata.localDiagnostic));
				return isAborted(state.signal) ? err(cancelled$1(state.signal)) : ok(undefined);
			}
			if (isAborted(state.signal)) return err(cancelled$1(state.signal));
			const kind = metadata.value.isSymbolicLink() ? "symlink" : metadata.value.isDirectory() ? "directory" : metadata.value.isFile() ? "file" : "other";
			const excluded = applyExclusion(state.shouldExclude, path, kind);
			if (!excluded.ok) return {
				ok: false,
				error: {
					tag: "reference-source-reader",
					code: "io",
					message: "Reference source exclusion check failed"
				}
			};
			if (excluded.value) {
				state.exclusions.push({
					path,
					kind
				});
				return {
					ok: true,
					value: undefined
				};
			}
			if (isAborted(state.signal)) return {
				ok: false,
				error: cancelled$1(state.signal)
			};
			if (kind === "symlink") state.entries.push(await readStableSymlinkTarget(absolute, path, metadata.value, state.signal, () => readSymlinkTarget(state.root, absolute, path)));
			else if (kind === "directory") {
				directories.push({ path: absolute });
			} else if (kind !== "file") state.entries.push(entryFailure(path, "other", "unsupported", "Entry is not a regular file", safeSize(metadata.value.size)));
			else return processFileEntry(state, absolute, path, metadata.value);
			return {
				ok: true,
				value: undefined
			};
		};
		processFileEntry = async (state, absolute, path, metadata) => {
			const result = await readStableFile({
				resources: state.resources,
				root: state.root,
				rootIdentity: state.rootIdentity,
				absolute,
				path,
				expected: metadata,
				...state.signal === undefined ? {} : { signal: state.signal }
			});
			const { entry } = result;
			if (entry.status === "read" && entry.kind === "file") state.bytesRead += entry.bytes.byteLength;
			state.entries.push(entry);
			if (result.cleanup !== undefined) return err({
				tag: "reference-source-reader",
				code: entry.status === "failed" && entry.code === "cancelled" ? "cancelled" : "io",
				message: entry.status === "failed" ? entry.message : `Reference file cleanup failed: ${path}`,
				cleanup: result.cleanup,
				...entry.status === "failed" && entry.code === "cancelled" && state.signal?.aborted === true ? { cause: state.signal.reason } : {}
			});
			return ok(undefined);
		};
		readStableSymlinkTarget = async (absolute, path, expected, signal, readTarget) => {
			try {
				const before = await bigLstat(absolute);
				if (isAborted(signal)) return cancelledSymlink(path);
				if (!before.isSymbolicLink() || !sameFile(expected, before)) return changedSymlink(path);
				const observed = await readTarget();
				if (observed.status === "failed") return observed;
				if (isAborted(signal)) return cancelledSymlink(path);
				const after = await bigLstat(absolute);
				if (isAborted(signal)) return cancelledSymlink(path);
				if (!after.isSymbolicLink() || !sameFile(expected, after)) return changedSymlink(path);
				return observed;
			} catch (cause) {
				const code = cause instanceof Error ? Reflect.get(cause, "code") : undefined;
				if (code === "ENOENT" || code === "ENOTDIR") return changedSymlink(path);
				const detail = filesystemFailureDetail(cause, "Symbolic link target could not be read safely");
				if (detail === undefined) throw cause;
				return entryFailure(path, "symlink", "io", detail.message, undefined, detail.localDiagnostic);
			}
		};
		cancelledSymlink = (path) => entryFailure(path, "symlink", "cancelled", "Symlink inspection cancelled");
		changedSymlink = (path) => entryFailure(path, "symlink", "changed", "Symbolic link changed while its target was read");
		readSymlinkTarget = async (root, absolute, path) => {
			let rawTarget;
			try {
				rawTarget = await readlink(absolute, { encoding: "buffer" });
			} catch (cause) {
				if (cause instanceof Error && Reflect.get(cause, "code") === "EINVAL") return changedSymlink(path);
				throw cause;
			}
			let target;
			try {
				target = decodeStrictUtf8(rawTarget, "preserve");
			} catch {
				return entryFailure(path, "symlink", "unsupported", `Symlink target is not valid UTF-8 (raw target bytes: ${rawTarget.toString("hex")})`);
			}
			const nativeTarget = absoluteCallerPath(target, { cwd: dirname(absolute) });
			let canonicalTarget;
			try {
				await stat(nativeTarget);
				canonicalTarget = await realpath(nativeTarget);
			} catch (cause) {
				const code = cause instanceof Error ? Reflect.get(cause, "code") : undefined;
				if (code !== "ENOENT" && code !== "ENOTDIR") throw cause;
				return {
					status: "read",
					kind: "symlink",
					path,
					target: await missingSymlinkPath(root, nativeTarget, code === "ENOENT"),
					targetState: "missing"
				};
			}
			const internal = isPathWithinRoot(root, canonicalTarget);
			return {
				status: "read",
				kind: "symlink",
				path,
				target: internal ? pathFromRoot(root, canonicalTarget) : canonicalTarget,
				targetState: internal ? "internal" : "external"
			};
		};
		missingSymlinkPath = async (root, target, missingFinalComponent) => {
			if (basename(target) === "..") return target;
			let parent;
			try {
				await stat(dirname(target));
				parent = await realpath(dirname(target));
			} catch (cause) {
				const code = cause instanceof Error ? Reflect.get(cause, "code") : undefined;
				if (code === "ENOENT" || code === "ENOTDIR") return target;
				throw cause;
			}
			const candidate = appendCallerPath(parent, basename(target));
			const directoryRequired = target.endsWith(sep);
			if (directoryRequired && !missingFinalComponent) return `${candidate}${sep}`;
			const internal = isPathWithinRoot(root, candidate);
			const scoped = internal ? pathFromRoot(root, candidate) : candidate;
			return directoryRequired ? `${scoped}${internal ? "/" : sep}` : scoped;
		};
		applyExclusion = (shouldExclude, path, kind) => {
			try {
				return {
					ok: true,
					value: shouldExclude?.(path, kind) === true
				};
			} catch (cause) {
				void cause;
				return { ok: false };
			}
		};
	})))();
}

//#endregion
//#region dist/reference/ReferenceSourceSymlinkTargets.js
var reconcileUnobservedSymlinkTargets, nearestFailedAncestor;
function init_ReferenceSourceSymlinkTargets() {
	return (init_ReferenceSourceSymlinkTargets = __esmMin((() => {
		init_referenceSourcePathIdentity();
		init_ReferenceSourceReaderValidate();
		reconcileUnobservedSymlinkTargets = (entries, exclusions = [], signal, rootFailure) => {
			const failedDirectories = new Map(entries.flatMap((entry) => entry.status === "failed" && entry.kind === "directory" && entry.code !== "cancelled" ? [[entry.path, entry]] : []));
			if (failedDirectories.size === 0 && rootFailure === undefined || isAborted(signal)) return;
			const directoryEntries = entries.filter((entry) => entry.kind === "directory");
			const directoryPaths = createReferenceSourcePathLookup(directoryEntries.map(({ path }) => path));
			const observedPaths = createReferenceSourcePathLookup(entries.map(({ path }) => path));
			const excludedPaths = createReferenceSourcePathLookup(exclusions.map(({ path }) => path));
			for (const [index, entry] of entries.entries()) {
				if (isAborted(signal)) return;
				if (entry.status !== "read" || entry.kind !== "symlink" || entry.targetState !== "internal" || observedPaths.resolve(entry.target) !== undefined || excludedPaths.resolve(entry.target) !== undefined) continue;
				const ancestor = nearestFailedAncestor(entry.target, directoryPaths, failedDirectories, excludedPaths, signal, rootFailure);
				if (ancestor === undefined) continue;
				entries[index] = {
					status: "failed",
					kind: "symlink",
					path: entry.path,
					code: ancestor.code,
					message: `Symbolic link target ${JSON.stringify(entry.target)} was not inventoried because directory ${JSON.stringify(ancestor.path)} could not be enumerated: ${ancestor.message}`
				};
			}
		};
		nearestFailedAncestor = (target, directoryPaths, failedDirectories, excludedPaths, signal, rootFailure) => {
			for (let candidate = posix.dirname(target); candidate !== "." && candidate !== "/"; candidate = posix.dirname(candidate)) {
				if (isAborted(signal)) return undefined;
				if (excludedPaths.resolve(candidate) !== undefined) return undefined;
				const observedDirectory = directoryPaths.resolve(candidate);
				if (observedDirectory !== undefined) return failedDirectories.get(observedDirectory);
			}
			if (isAborted(signal)) return undefined;
			if (excludedPaths.resolve(".") !== undefined) return undefined;
			return rootFailure === undefined ? undefined : {
				path: ".",
				...rootFailure
			};
		};
	})))();
}

//#endregion
//#region dist/reference/ReferenceSourceReader.js
var PATH_RACE_LIMITATION, readReferenceSource, readSource, traverse;
function init_ReferenceSourceReader() {
	return (init_ReferenceSourceReader = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_result();
		init_resources();
		init_ReferenceSourceReaderEntries();
		init_ReferenceSourceReaderValidate();
		init_ReferenceSourceReaderErrors();
		init_ReferenceSourceFailureBuilders();
		init_ReferenceSourceSymlinkTargets();
		PATH_RACE_LIMITATION = "Path identity is revalidated around operations; Node lacks portable descriptor-relative openat traversal, so a syscall-boundary pathname race remains.";
		readReferenceSource = async (root, resources, options = {}) => {
			let result;
			try {
				result = await resources.run(() => readSource(root, resources, options));
			} catch (cause) {
				if (!(cause instanceof ArtifactReaderFailure)) throw cause;
				result = err(referenceSourceResourceFailure(cause));
			}
			if (!result.ok && result.error.code !== "cancelled" && options.signal?.aborted) return err({
				...result.error,
				secondaryCancellation: { cause: options.signal.reason }
			});
			return result;
		};
		readSource = async (root, resources, options) => {
			if (!noFollowOpenSupported()) return err({
				tag: "reference-source-reader",
				code: "unsupported",
				message: "Safe no-follow file opens are unavailable"
			});
			const prepared = await prepareRoot(root, options.signal);
			if (!prepared.ok) return prepared;
			const { canonicalRoot, rootIdentity } = prepared.value;
			const state = {
				resources,
				root: canonicalRoot,
				rootIdentity,
				...options.signal === undefined ? {} : { signal: options.signal },
				...options.shouldExclude === undefined ? {} : { shouldExclude: options.shouldExclude },
				...options.beforeDirectory === undefined ? {} : { beforeDirectory: options.beforeDirectory },
				entries: [],
				exclusions: [],
				pending: [{ path: canonicalRoot }],
				settling: [],
				openingLookups: 0,
				bytesRead: 0
			};
			const traversal = await traverse(state);
			if (!isAborted(state.signal) && (traversal.ok || traversal.error.code !== "cancelled")) reconcileUnobservedSymlinkTargets(state.entries, state.exclusions, state.signal, state.rootFailure);
			state.entries.sort((left, right) => compareUnicodeCodePoints(left.path, right.path));
			const read = {
				root: canonicalRoot,
				...state.rootFailure === undefined ? {} : { rootFailure: state.rootFailure },
				entries: state.entries,
				bytesRead: state.bytesRead,
				limitations: [PATH_RACE_LIMITATION]
			};
			if (traversal.ok && state.rootFailure?.code === "io") return err({
				tag: "reference-source-reader",
				code: "io",
				message: state.rootFailure.message,
				...state.rootFailureCause === undefined ? {} : { cause: state.rootFailureCause.value },
				partial: read
			});
			return traversal.ok ? ok(read) : err({
				...traversal.error,
				partial: read
			});
		};
		traverse = async (state) => {
			try {
				while (state.pending.length > 0) {
					if (isAborted(state.signal)) {
						await settleDirectoryAdmissions(state);
						return err(cancelled$1(state.signal));
					}
					prefetchDirectoryValidations(state);
					const current = state.pending.pop();
					if (current === undefined) break;
					const result = await traverseDirectory(state, current);
					if (!result.ok) {
						await settleDirectoryAdmissions(state);
						return result;
					}
				}
				await settleDirectoryAdmissions(state);
				return isAborted(state.signal) ? err(cancelled$1(state.signal)) : ok(undefined);
			} finally {
				await Promise.allSettled([...state.settling, ...state.pending.flatMap(({ validation }) => validation ?? [])]);
			}
		};
	})))();
}

//#endregion
//#region dist/domain/referenceSourceClassification.js
var SOURCE_CLASSIFICATIONS, CODE_EXTENSIONS, LANGUAGE_BY_EXTENSION, MANIFEST_FILENAMES, CONFIG_FILENAMES, DOCUMENTATION_EXTENSIONS, DOCUMENTATION_FILENAMES, GENERATED_DIRECTORY_NAMES, GENERATED_DIRECTORY_PATHS, VENDOR_DIRECTORY_NAMES, SOURCE_DIRECTORY_NAMES, TEST_DIRECTORY_NAMES, DOCUMENTATION_DIRECTORY_NAMES, filenameIsTest, filenameIsGenerated, basenameParts, sourceExtension, basenameMatch, isPathUnderAny, containsDirectoryPath, detectReferenceSourceLanguage, classifyReferenceSourcePath, addDirectoryClassifications, addFilenameClassifications;
function init_referenceSourceClassification() {
	return (init_referenceSourceClassification = __esmMin((() => {
		init_javascriptArtifactFiles();
		SOURCE_CLASSIFICATIONS = [
			"source",
			"test",
			"config",
			"manifest",
			"generated",
			"vendor",
			"documentation",
			"unknown"
		];
		CODE_EXTENSIONS = new Set([
			"js",
			"mjs",
			"cjs",
			"jsx",
			"ts",
			"tsx",
			"mts",
			"cts",
			"py",
			"rs",
			"go",
			"java",
			"kt",
			"kts",
			"c",
			"h",
			"cpp",
			"hpp",
			"cc",
			"cxx",
			"swift",
			"m",
			"mm",
			"sh",
			"cs",
			"php"
		]);
		LANGUAGE_BY_EXTENSION = new Map([
			["js", "JavaScript"],
			["mjs", "JavaScript"],
			["cjs", "JavaScript"],
			["jsx", "JSX"],
			["ts", "TypeScript"],
			["tsx", "TSX"],
			["mts", "TypeScript"],
			["cts", "TypeScript"],
			["py", "Python"],
			["rs", "Rust"],
			["go", "Go"],
			["java", "Java"],
			["kt", "Kotlin"],
			["kts", "Kotlin"],
			["c", "C"],
			["h", "C"],
			["cpp", "C++"],
			["hpp", "C++"],
			["cc", "C++"],
			["cxx", "C++"],
			["swift", "Swift"],
			["cs", "C#"],
			["php", "PHP"],
			["m", "Objective-C"],
			["mm", "Objective-C++"],
			["sh", "Shell"],
			["json", "JSON"],
			["jsonc", "JSON"],
			["yaml", "YAML"],
			["yml", "YAML"],
			["toml", "TOML"],
			["ini", "INI"],
			["cfg", "INI"],
			["conf", "INI"],
			["md", "Markdown"],
			["markdown", "Markdown"],
			["txt", "Text"],
			["html", "HTML"],
			["htm", "HTML"],
			["css", "CSS"],
			["scss", "SCSS"],
			["sass", "Sass"],
			["less", "Less"],
			["xml", "XML"],
			["svg", "SVG"]
		]);
		MANIFEST_FILENAMES = new Set([
			"package.json",
			"package-lock.json",
			"yarn.lock",
			"pnpm-lock.yaml",
			"npm-shrinkwrap.json",
			"composer.json",
			"composer.lock",
			"gemfile",
			"gemfile.lock",
			"cargo.toml",
			"cargo.lock",
			"go.mod",
			"go.sum",
			"pom.xml",
			"build.gradle",
			"build.gradle.kts",
			"settings.gradle",
			"requirements.txt",
			"setup.py",
			"pyproject.toml",
			"pipfile",
			"pipfile.lock",
			"setup.cfg",
			"manifest.in",
			"cmakelists.txt",
			"meson.build",
			"configure",
			"configure.ac",
			"makefile",
			"makefile.am",
			"dockerfile",
			"docker-compose.yml",
			"docker-compose.yaml",
			"kubernetes.yml",
			"kubernetes.yaml",
			"kustomization.yml",
			"kustomization.yaml",
			".releaserc",
			".releaserc.json",
			".releaserc.yml",
			".releaserc.yaml",
			"release-please-config.json",
			"release-please-manifest.json"
		]);
		CONFIG_FILENAMES = new Set([
			".gitignore",
			".gitattributes",
			".gitmodules",
			".editorconfig",
			".npmrc",
			".nvmrc",
			".yarnrc",
			".yarnrc.yml",
			"eslint.config.js",
			"eslint.config.mjs",
			"eslint.config.ts",
			".prettierignore",
			".prettierrc",
			".prettierrc.json",
			".oxlintrc.json",
			"tsconfig.json",
			"tsconfig.build.json",
			"jsconfig.json",
			"vitest.config.ts",
			"wrangler.json",
			"wrangler.jsonc",
			"dependabot.yml",
			".github",
			".husky"
		]);
		DOCUMENTATION_EXTENSIONS = new Set([
			"md",
			"markdown",
			"mdx",
			"rst",
			"txt",
			"adoc",
			"asciidoc"
		]);
		DOCUMENTATION_FILENAMES = new Set([
			"readme",
			"readme.md",
			"readme.markdown",
			"readme.txt",
			"changelog",
			"changelog.md",
			"changes.md",
			"history.md",
			"news.md",
			"license",
			"license.md",
			"license.txt",
			"copying",
			"copying.md",
			"authors",
			"authors.md",
			"contributing",
			"contributing.md",
			"code_of_conduct",
			"code_of_conduct.md",
			"security",
			"security.md",
			"support",
			"support.md",
			"faq",
			"faq.md"
		]);
		GENERATED_DIRECTORY_NAMES = new Set([
			"dist",
			"build",
			"out",
			"target",
			"coverage",
			"htmlcov",
			"site",
			"public",
			".next",
			".nuxt",
			".svelte-kit",
			".astro",
			"storybook-static",
			".codex",
			".devin",
			".factory",
			"__pycache__",
			".pytest_cache",
			".mypy_cache",
			".ruff_cache",
			".tox",
			".nyc_output"
		]);
		GENERATED_DIRECTORY_PATHS = [["docs", "api"]];
		VENDOR_DIRECTORY_NAMES = new Set([
			"node_modules",
			"vendor",
			"bower_components",
			"third_party",
			"third-party",
			"thirdparty",
			"libs",
			"external"
		]);
		SOURCE_DIRECTORY_NAMES = new Set([
			"src",
			"source",
			"sources",
			"lib",
			"libs",
			"packages",
			"pkg",
			"app",
			"apps",
			"bin",
			"scripts",
			"bridge",
			"components",
			"domain",
			"application",
			"server",
			"contracts",
			"hopper",
			"tests",
			"test",
			"__tests__",
			"spec",
			"specs",
			"testing",
			"fixtures"
		]);
		TEST_DIRECTORY_NAMES = new Set([
			"tests",
			"test",
			"__tests__",
			"spec",
			"specs",
			"testing"
		]);
		DOCUMENTATION_DIRECTORY_NAMES = new Set([
			"docs",
			"doc",
			"documentation",
			"guides",
			"examples",
			"tutorials",
			"wiki",
			"man"
		]);
		filenameIsTest = (filename) => {
			const lower = filename.toLowerCase();
			if (lower.includes(".test.") || lower.includes(".spec.")) return true;
			if (lower.startsWith("test_") || lower.startsWith("spec_")) return true;
			if (lower.endsWith("_test") || lower.endsWith("_spec")) return true;
			const stem = basenameParts(lower).base;
			return stem.endsWith("_test") || stem.endsWith("_spec");
		};
		filenameIsGenerated = (filename) => {
			const lower = filename.toLowerCase();
			if (lower.endsWith(".min.js") || lower.endsWith(".min.css")) return true;
			if (lower.endsWith(".map")) return true;
			if (lower.endsWith(".lock")) return true;
			if (lower.endsWith(".d.ts") || lower.endsWith(".d.ts.map")) return true;
			if (lower.endsWith(".d.mts") || lower.endsWith(".d.mts.map")) return true;
			if (lower.endsWith(".d.cts") || lower.endsWith(".d.cts.map")) return true;
			return false;
		};
		basenameParts = (filename) => {
			const lastDot = filename.lastIndexOf(".");
			if (lastDot <= 0) return {
				base: filename,
				ext: ""
			};
			return {
				base: filename.slice(0, lastDot),
				ext: filename.slice(lastDot + 1)
			};
		};
		sourceExtension = (filename) => {
			const { ext } = basenameParts(filename);
			return ext === "" && filename.startsWith(".") && isJavaScriptSourcePath(filename) ? filename.slice(1) : ext;
		};
		basenameMatch = (filename, set) => {
			const lower = filename.toLowerCase();
			return set.has(lower);
		};
		isPathUnderAny = (parts, names) => parts.some((segment) => names.has(segment));
		containsDirectoryPath = (parts, directory) => parts.some((_, start) => directory.every((segment, offset) => parts[start + offset] === segment));
		detectReferenceSourceLanguage = (path) => {
			const filename = posix.basename(path);
			const lower = filename.toLowerCase();
			if (lower === "dockerfile" || lower.startsWith("dockerfile.")) return "Dockerfile";
			if (lower.endsWith(".d.ts")) return "TypeScript";
			if (lower.endsWith(".d.mts")) return "TypeScript";
			if (lower.endsWith(".d.cts")) return "TypeScript";
			const extension = sourceExtension(filename);
			if (extension === "C") return "C++";
			if (extension === "M") return "Objective-C++";
			return LANGUAGE_BY_EXTENSION.get(extension.toLowerCase()) ?? null;
		};
		classifyReferenceSourcePath = (path) => {
			const classifications = new Set();
			const parts = path.toLowerCase().split("/").filter((segment) => segment !== "");
			const filename = parts[parts.length - 1] ?? "";
			if (parts.length === 0) {
				classifications.add("source");
				return [...classifications].sort();
			}
			addDirectoryClassifications(parts, classifications);
			addFilenameClassifications(filename, classifications);
			if (filename.endsWith(".json") || filename.endsWith(".yaml") || filename.endsWith(".yml")) {
				if (!classifications.has("manifest") && !classifications.has("config")) classifications.add("config");
			}
			if (isPathUnderAny(parts, SOURCE_DIRECTORY_NAMES)) {
				if (!classifications.has("vendor") && !classifications.has("generated")) classifications.add("source");
			}
			if (classifications.size === 0) {
				if (filename === "license" || filename === "copying") classifications.add("documentation");
				else classifications.add("unknown");
			}
			return [...classifications].sort();
		};
		addDirectoryClassifications = (parts, classifications) => {
			if (isPathUnderAny(parts, TEST_DIRECTORY_NAMES)) classifications.add("test");
			if (isPathUnderAny(parts, DOCUMENTATION_DIRECTORY_NAMES)) classifications.add("documentation");
			if (isPathUnderAny(parts, VENDOR_DIRECTORY_NAMES)) classifications.add("vendor");
			if (isPathUnderAny(parts, GENERATED_DIRECTORY_NAMES) || GENERATED_DIRECTORY_PATHS.some((directory) => containsDirectoryPath(parts, directory))) classifications.add("generated");
		};
		addFilenameClassifications = (filename, classifications) => {
			const extension = sourceExtension(filename).toLowerCase();
			if (filenameIsTest(filename)) classifications.add("test");
			if (filenameIsGenerated(filename)) classifications.add("generated");
			if (basenameMatch(filename, MANIFEST_FILENAMES)) classifications.add("manifest");
			if (basenameMatch(filename, CONFIG_FILENAMES)) classifications.add("config");
			if (DOCUMENTATION_EXTENSIONS.has(extension)) classifications.add("documentation");
			if (DOCUMENTATION_FILENAMES.has(filename.toLowerCase())) classifications.add("documentation");
			if (CODE_EXTENSIONS.has(extension)) classifications.add("source");
		};
	})))();
}

//#endregion
//#region dist/domain/referenceSourceRequireBindings.js
var referenceSourceRequireCalls, requireResolveSearchBase, hasPriorMemberMutation, hasMemberCallee, hasIdentifierReceiver;
function init_referenceSourceRequireBindings() {
	return (init_referenceSourceRequireBindings = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticGlobalReference();
		init_javascriptSemanticAnalysis();
		init_javascriptSemanticRequireOrigin();
		init_javascriptSemanticTraversal();
		init_javascriptSourceParser();
		referenceSourceRequireCalls = (file, path, memberMutationAllowance) => {
			const runtimeContext = javaScriptRuntimeContext(file.program);
			const index = completeSemanticSteps(indexJavaScriptBindingsWithReceiversSteps(file.program, runtimeContext === "module" ? undefined : "commonjs-wrapper", undefined, memberMutationAllowance));
			const factoryBindings = new Set();
			const candidates = [];
			traverseJavaScriptAst(file.program, { enter: (node) => {
				if (!t.isCallExpression(node) && !t.isOptionalCallExpression(node) && !t.isNewExpression(node)) return;
				const callee = unwrapJavaScriptExpression(node.callee).node;
				if (!t.isCallExpression(callee) && !t.isOptionalCallExpression(callee) && !hasIdentifierReceiver(callee)) return;
				if (t.isCallExpression(callee) || t.isOptionalCallExpression(callee)) completeSemanticSteps(index.indexMemberMutationFactsSteps());
				let fact = semanticRequireLoaderAt(node, index.bindings, factoryBindings);
				if (fact === "create-require" || (t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) && [
					"call",
					"apply",
					"resolve"
				].includes(semanticStaticPropertyKey(callee.property, callee.computed) ?? "")) {
					completeSemanticSteps(index.indexMemberMutationFactsSteps());
					fact = semanticRequireLoaderAt(node, index.bindings, factoryBindings);
				}
				const callFact = semanticRequireCallAt(node, index.bindings, factoryBindings, index);
				if (callFact === undefined || callFact.loader === "local") return;
				if (fact !== "create-require" && fact !== "commonjs-loader" && callFact.loader !== "create-require" && callFact.loader !== "commonjs-loader") return;
				const sourceRelativePath = callFact.sourceRelativePath;
				const normalizedSourceRelativePath = sourceRelativePath === undefined ? undefined : posix.normalize(posix.join(posix.dirname(path), sourceRelativePath));
				const base = runtimeContext === "unknown" ? "unknown" : callFact.loader === "create-require" ? sourceRelativePath === undefined ? callFact.sourceRelative === true ? "source-file" : "unknown" : normalizedSourceRelativePath === undefined || normalizedSourceRelativePath === ".." || normalizedSourceRelativePath.startsWith("../") ? "unknown" : normalizedSourceRelativePath === path ? "source-file" : {
					kind: "source-relative-file",
					path: normalizedSourceRelativePath
				} : callFact.loader === "commonjs-loader" && runtimeContext === "commonjs" ? "source-file" : "unknown";
				const searchBase = requireResolveSearchBase(callFact.operation, callFact.arguments, index.bindings, base, runtimeContext === "commonjs");
				candidates.push({
					call: node,
					arguments: callFact.arguments,
					resolutionBase: searchBase,
					...runtimeContext === "unknown" ? { limitation: `Module context is unknown in ${path}; the requested dependency was retained without a proven loader base.` } : {}
				});
			} });
			if (candidates.some(({ call }) => hasMemberCallee(call))) completeSemanticSteps(index.indexMemberMutationFactsSteps());
			return new Map(candidates.map(({ call, arguments: callArguments, resolutionBase, limitation }) => [call, {
				arguments: callArguments,
				...limitation === undefined ? {} : { limitation },
				resolutionBase: hasMemberCallee(call) && hasPriorMemberMutation(index, call) ? "unknown" : resolutionBase
			}]));
		};
		requireResolveSearchBase = (operation, callArguments, bindings, loaderBase, hasCommonJsWrapper) => {
			const arguments_ = callArguments ?? [];
			if (operation !== "resolve" || arguments_.length < 2) return loaderBase;
			if (arguments_.length !== 2) return "unknown";
			const options = t.isExpression(arguments_[1]) ? arguments_[1] : undefined;
			if (options === undefined || !t.isObjectExpression(options)) return "unknown";
			if (options.properties.length === 0) return loaderBase;
			if (options.properties.length !== 1) return "unknown";
			const property = options.properties[0];
			if (!t.isObjectProperty(property)) return "unknown";
			if (semanticStaticPropertyKey(property.key, property.computed) !== "paths") return "unknown";
			const value = t.isExpression(property.value) ? property.value : undefined;
			if (!t.isArrayExpression(value) || value.elements.length !== 1) return "unknown";
			const directory = value.elements[0];
			return hasCommonJsWrapper && t.isIdentifier(directory, { name: "__dirname" }) && isUnmodifiedGlobalReference(directory, bindings, "__dirname") ? "source-file" : "unknown";
		};
		hasPriorMemberMutation = (index, site) => {
			const callee = unwrapJavaScriptExpression(site.callee).node;
			return semanticMemberChain(callee) === undefined || semanticSelectedMemberMayHaveChanged(index, site, callee);
		};
		hasMemberCallee = (call) => {
			const callee = unwrapJavaScriptExpression(call.callee).node;
			return t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee);
		};
		hasIdentifierReceiver = (callee) => {
			let expression = callee;
			while (t.isMemberExpression(expression) || t.isOptionalMemberExpression(expression)) expression = unwrapJavaScriptExpression(expression.object).node;
			return t.isIdentifier(expression);
		};
	})))();
}

//#endregion
//#region dist/domain/referenceSourceImportParsing.js
var PARSEABLE_REFERENCE_SOURCE_LANGUAGES, safeModuleName, exactStringModuleName, resolveSpecifier, appendRelationship, appendImportEquals, extractImports, parseWithBabel, requireCallsOrRefusal, parseReferenceSourceImports;
function init_referenceSourceImportParsing() {
	return (init_referenceSourceImportParsing = __esmMin((() => {
		init_javascriptSemanticWorkAllowance();
		init_javascriptSemanticTraversal();
		init_javascriptAstValues();
		init_javascriptSourceParser();
		init_referenceSourceRequireBindings();
		init_javascriptModuleSpecifier();
		init_strictUtf8();
		PARSEABLE_REFERENCE_SOURCE_LANGUAGES = new Set([
			"JavaScript",
			"TypeScript",
			"JSX",
			"TSX"
		]);
		safeModuleName = (node) => {
			if (isStringLiteral(node)) return node.value;
			return undefined;
		};
		exactStringModuleName = (node) => {
			if (node === null || node === undefined) return undefined;
			const literal = readExactJavaScriptLiteral(node);
			return literal.found && typeof literal.value === "string" ? literal.value : undefined;
		};
		resolveSpecifier = (specifier) => {
			if (isRelativeJavaScriptModuleSpecifier(specifier) || specifier.startsWith("/")) return "internal";
			return "external";
		};
		appendRelationship = (relationships, limitations, input) => {
			if (input.to === undefined) return;
			if (input.to.length === 0) {
				limitations.push(`Empty module specifier in ${input.fromPath} was not recorded as a relationship.`);
				return;
			}
			relationships.push({
				from_path: input.fromPath,
				to: input.to,
				kind: input.kind,
				resolution: input.resolution ?? resolveSpecifier(input.to),
				parse_state: input.parseState,
				...input.resolutionStrategy === undefined ? {} : { resolutionStrategy: input.resolutionStrategy },
				...input.resolutionBasePath === undefined ? {} : { resolutionBasePath: input.resolutionBasePath }
			});
		};
		appendImportEquals = (statement, from_path, relationships, limitations) => {
			if (!isTSImportEqualsDeclaration(statement)) return;
			const reference = statement.moduleReference;
			if (!isTSExternalModuleReference(reference)) return;
			appendRelationship(relationships, limitations, {
				fromPath: from_path,
				to: safeModuleName(reference.expression),
				kind: "requires",
				parseState: "parsed"
			});
		};
		extractImports = (ast, from_path, relationships, limitations, requireCalls) => {
			let unresolvedRequireTarget = false;
			traverseJavaScriptAst(ast.program, { enter: (node) => {
				if (isImportDeclaration(node) || isExportAllDeclaration(node) || isExportNamedDeclaration(node) && node.source != null) {
					appendRelationship(relationships, limitations, {
						fromPath: from_path,
						to: safeModuleName(node.source),
						kind: "imports",
						parseState: "parsed"
					});
				} else if (isTSImportEqualsDeclaration(node)) {
					appendImportEquals(node, from_path, relationships, limitations);
				} else if (isTSModuleDeclaration(node)) {
					if (node.declare === true && isStringLiteral(node.id)) appendRelationship(relationships, limitations, {
						fromPath: from_path,
						to: node.id.value,
						kind: "declares-module",
						parseState: "parsed",
						resolution: "unknown"
					});
				} else if (isImportExpression(node) || isTSImportType(node)) {
					const specifier = exactStringModuleName(node.source);
					appendRelationship(relationships, limitations, {
						fromPath: from_path,
						to: specifier ?? "<dynamic-import>",
						kind: "imports",
						parseState: specifier === undefined ? "partial" : "parsed",
						...specifier === undefined ? { resolution: "unknown" } : {}
					});
				} else if (isCallExpression(node) || isOptionalCallExpression(node) || isNewExpression(node)) {
					const requireCall = requireCalls.get(node);
					if (requireCall === undefined) return;
					if (requireCall.arguments === undefined) {
						unresolvedRequireTarget = true;
						return;
					}
					const target = requireCall.arguments[0];
					if (target === undefined) return;
					const literal = readExactJavaScriptLiteral(target);
					if (!literal.found) {
						unresolvedRequireTarget = true;
						return;
					}
					if (typeof literal.value !== "string") return;
					if (requireCall.limitation !== undefined && !limitations.includes(requireCall.limitation)) limitations.push(requireCall.limitation);
					const uncertainResolution = requireCall.resolutionBase === "unknown";
					appendRelationship(relationships, limitations, {
						fromPath: from_path,
						to: literal.value,
						kind: "requires",
						parseState: uncertainResolution ? "partial" : "parsed",
						...uncertainResolution ? { resolution: "unknown" } : {},
						...uncertainResolution ? {} : { resolutionStrategy: "runtime-require" },
						...typeof requireCall.resolutionBase === "object" ? { resolutionBasePath: requireCall.resolutionBase.path } : {}
					});
				}
			} });
			if (unresolvedRequireTarget) limitations.push(`A CommonJS module target in ${from_path} could not be determined statically.`);
		};
		parseWithBabel = (path, source, packageType) => {
			try {
				const { file: ast, moduleOnlyErrors } = parseRecoveredJavaScript(source, path, {
					allowImportExportEverywhere: false,
					allowReturnOutsideFunction: true,
					allowUndeclaredExports: true
				}, packageType);
				return {
					ast,
					reasons: ast.errors.map((error) => ({
						parser: error instanceof JavaScriptLoaderSyntaxError ? "rea-node-loader" : "babel",
						reason: error.message
					})),
					moduleOnlyErrors
				};
			} catch (cause) {
				return {
					ast: undefined,
					reasons: [{
						parser: "babel",
						reason: cause instanceof Error ? cause.message : "Parse failed"
					}],
					moduleOnlyErrors: []
				};
			}
		};
		requireCallsOrRefusal = (ast, path, limitations, memberMutationAllowance) => {
			try {
				return referenceSourceRequireCalls(ast, path, memberMutationAllowance);
			} catch (cause) {
				if (!isJavaScriptMemberMutationRefusal(cause)) throw cause;
				limitations.push(`CommonJS require calls in ${path} were not examined because the member-mutation phase was refused (${cause.reason}). ${cause.remediationAction ?? ""}`.trimEnd());
				return new Map();
			}
		};
		parseReferenceSourceImports = (path, bytes, language, packageType, memberMutationAllowance) => {
			if (language !== null && !PARSEABLE_REFERENCE_SOURCE_LANGUAGES.has(language)) return {
				relationships: [],
				parse_failures: [],
				limitations: []
			};
			let source;
			try {
				source = decodeStrictUtf8(bytes, "preserve");
			} catch {
				return {
					relationships: [],
					parse_failures: [{
						path,
						parser: "utf-8",
						reason: "Source bytes are not valid UTF-8; import targets were not parsed."
					}],
					limitations: []
				};
			}
			const { ast, reasons, moduleOnlyErrors } = parseWithBabel(path, source, packageType);
			const loaderCondition = ast === undefined ? undefined : javaScriptSourceLoaderCondition(ast.program);
			const limitations = moduleOnlyErrors.length === 0 ? [] : [`Strict-mode errors apply only if this file is an ES module: ${moduleOnlyErrors.join("; ")}`];
			if (loaderCondition !== undefined) limitations.push(loaderCondition);
			const parseFailures = reasons.map((reason) => ({
				path,
				...reason
			}));
			if (ast === undefined) {
				return {
					relationships: [],
					parse_failures: parseFailures,
					limitations
				};
			}
			const relationships = [];
			extractImports(ast, path, relationships, limitations, requireCallsOrRefusal(ast, path, limitations, memberMutationAllowance));
			return {
				relationships: relationships.map((relationship) => ({
					...relationship,
					parse_state: (parseFailures.length > 0 || loaderCondition !== undefined) && relationship.parse_state === "parsed" ? "partial" : relationship.parse_state
				})),
				parse_failures: parseFailures,
				limitations
			};
		};
	})))();
}

//#endregion
//#region dist/application/ReferenceSourceImportEntries.js
var projectReferenceSourceEntryFailure, entryRecoveryGuidance, failedEntry, UNKNOWN_PACKAGE, readPackageMetadata, RESOLUTION_SUFFIXES, REQUIRE_RESOLUTION_SUFFIXES, NODE_REQUIRE_SUFFIXES, resolutionSuffixes, nodeRequireFileCandidates, nodeRequireIndexCandidates, selectObservedCandidate, unobservedReferencePath, packageMainForDirectory, selectPackageMain, importLookupPath, resolveInternalSpecifier, packageTypeForFile, appendFile, appendReadEntry, parseReferenceSourceEntries;
function init_ReferenceSourceImportEntries() {
	return (init_ReferenceSourceImportEntries = __esmMin((() => {
		init_result();
		init_artifactIdentity();
		init_referenceSourcePathIdentity();
		init_referenceSourceClassification();
		init_referenceSourceImportParsing();
		init_TypeScriptEmittedSourceCandidates();
		init_appendAll();
		init_strictUtf8();
		init_sha256Hex();
		projectReferenceSourceEntryFailure = (entry) => `${entry.message} ${entryRecoveryGuidance(entry)}`;
		entryRecoveryGuidance = (entry) => {
			if (entry.code === "cancelled") return "This entry was not read because the import was cancelled. Start the import again when ready.";
			if (entry.code === "unsupported") return "Exclude this entry or replace it with a regular file.";
			if (entry.kind === "directory") return "This directory could not be read. Check its permissions, then try again.";
			if (entry.kind === "symlink") return "This symbolic link could not be read safely. Check the link and its permissions, then try again.";
			if (entry.kind === "unknown") return "This entry's type could not be determined. Check the parent directory and try again.";
			return "This file could not be read. Check its permissions, then try again.";
		};
		failedEntry = (entry) => {
			const classifications = classifyReferenceSourcePath(entry.path);
			const limitation = projectReferenceSourceEntryFailure(entry);
			const local = entry.localDiagnostic === undefined ? {} : { local_diagnostics: [entry.localDiagnostic] };
			if (entry.kind === "directory") return {
				path: entry.path,
				kind: "directory",
				classifications,
				tree_state: "unreadable",
				limitations: [limitation],
				...local
			};
			if (entry.kind === "symlink") return {
				path: entry.path,
				kind: "symlink",
				target: null,
				target_state: "unreadable",
				classifications,
				limitations: [limitation],
				...local
			};
			if (entry.kind === "unknown" || entry.kind === "other") return {
				path: entry.path,
				kind: "unknown",
				classifications: ["unknown"],
				limitations: [limitation],
				...local
			};
			return {
				path: entry.path,
				kind: "file",
				sha256: null,
				size: entry.size ?? null,
				language: null,
				classifications: entry.kind === "file" ? classifications : ["unknown"],
				content_state: "unreadable",
				limitations: [limitation],
				...local
			};
		};
		UNKNOWN_PACKAGE = {
			main: { state: "unknown" },
			type: "unknown"
		};
		readPackageMetadata = (read, exclusions, unobservedPath) => {
			const packages = new Map();
			const manifestPaths = [];
			for (const exclusion of exclusions) {
				if (posix.basename(exclusion.path) !== "package.json") continue;
				manifestPaths.push(exclusion.path);
				packages.set(posix.dirname(exclusion.path), UNKNOWN_PACKAGE);
			}
			for (const entry of read.entries) {
				if (posix.basename(entry.path) !== "package.json") continue;
				manifestPaths.push(entry.path);
				const directory = posix.dirname(entry.path);
				if (packages.has(directory) || entry.status !== "read" || entry.kind !== "file") {
					packages.set(directory, UNKNOWN_PACKAGE);
					continue;
				}
				try {
					const manifest = JSON.parse(decodeStrictUtf8(entry.bytes, "strip-signature"));
					if (typeof manifest !== "object" || manifest === null || Array.isArray(manifest)) {
						packages.set(directory, UNKNOWN_PACKAGE);
						continue;
					}
					const type = Object.hasOwn(manifest, "type") ? Reflect.get(manifest, "type") : undefined;
					const main = Object.hasOwn(manifest, "main") ? Reflect.get(manifest, "main") : undefined;
					packages.set(directory, {
						type: type === "module" || type === "commonjs" ? type : "unspecified",
						main: typeof main === "string" && main !== "" ? {
							state: "declared",
							main
						} : { state: "none" }
					});
				} catch {
					packages.set(directory, UNKNOWN_PACKAGE);
				}
			}
			const uncertainDirectories = [...read.rootFailure === undefined ? [] : ["."], ...read.entries.filter((entry) => entry.kind === "directory" && entry.status === "failed").map(({ path }) => path)];
			for (const directory of uncertainDirectories) {
				const path = posix.join(directory, "package.json");
				if (!packages.has(directory) && unobservedPath(path)) {
					manifestPaths.push(path);
					packages.set(directory, UNKNOWN_PACKAGE);
				}
			}
			return {
				packages,
				pathLookup: createReferenceSourcePathLookup(manifestPaths)
			};
		};
		RESOLUTION_SUFFIXES = [
			[""],
			[".ts"],
			[".mts"],
			[".cts"],
			[".js"],
			[".mjs"],
			[".cjs"],
			[".tsx"],
			[".jsx"]
		];
		REQUIRE_RESOLUTION_SUFFIXES = RESOLUTION_SUFFIXES.map((slot) => slot.includes(".js") ? [...slot, ".json"] : slot);
		NODE_REQUIRE_SUFFIXES = [
			"",
			".js",
			".json",
			".node"
		];
		resolutionSuffixes = (mode) => mode === "source-require" ? REQUIRE_RESOLUTION_SUFFIXES : RESOLUTION_SUFFIXES;
		nodeRequireFileCandidates = (path) => NODE_REQUIRE_SUFFIXES.map((suffix) => `${path}${suffix}`);
		nodeRequireIndexCandidates = (directory) => NODE_REQUIRE_SUFFIXES.filter((suffix) => suffix !== "").map((suffix) => posix.join(directory, `index${suffix}`));
		selectObservedCandidate = (candidates, context) => {
			const selected = context.lookupPath.resolveCandidates(candidates);
			for (const candidate of candidates) {
				const resolved = context.lookupPath.resolve(candidate);
				if (resolved === selected && selected !== undefined) break;
				if (context.lookupPath.has(candidate) && resolved === undefined || context.unobservedPath(candidate)) return err(undefined);
			}
			return ok(selected);
		};
		unobservedReferencePath = (read, exclusions) => {
			const observed = createReferenceSourcePathLookup(read.entries.map(({ path }) => path));
			const unavailable = createReferenceSourcePathLookup([...read.entries.filter((entry) => entry.kind !== "directory" && (entry.status === "failed" || entry.kind === "symlink")).map(({ path }) => path), ...exclusions.filter((entry) => entry.entry_kind !== "directory").map(({ path }) => path)]);
			const excludedDirectories = createReferenceSourcePathLookup(exclusions.filter((entry) => entry.entry_kind === "directory").map(({ path }) => path));
			const directories = new Map(read.entries.filter((entry) => entry.kind === "directory").map((entry) => [entry.path, entry.status]));
			const directoryLookup = createReferenceSourcePathLookup(directories.keys());
			return (path) => {
				if (unavailable.has(path)) return true;
				if (observed.has(path)) return false;
				for (let parent = posix.dirname(path); parent !== "." && parent !== "/"; parent = posix.dirname(parent)) {
					if (excludedDirectories.has(parent)) return true;
					const directory = directoryLookup.resolve(parent);
					if (directory !== undefined) return directories.get(directory) === "failed";
					if (directoryLookup.has(parent)) return true;
				}
				return read.rootFailure !== undefined;
			};
		};
		packageMainForDirectory = (directory, context) => {
			const manifestPath = context.packageManifestPathLookup.resolve(posix.join(directory, "package.json"));
			if (manifestPath !== undefined) {
				const manifestDirectory = posix.dirname(manifestPath);
				const main = context.packages.get(manifestDirectory)?.main;
				return main === undefined ? undefined : {
					directory: manifestDirectory,
					main
				};
			}
			return context.packageManifestPathLookup.has(posix.join(directory, "package.json")) ? {
				directory,
				main: { state: "unknown" }
			} : undefined;
		};
		selectPackageMain = (directory, indexFallback, context, mode) => {
			const packageSelection = packageMainForDirectory(directory, context);
			const packageDirectory = packageSelection?.directory ?? directory;
			const manifest = packageSelection?.main;
			if (manifest === undefined || manifest.state === "none") return indexFallback === undefined ? {
				to: directory,
				resolution: "unresolved"
			} : {
				to: indexFallback,
				resolution: "internal"
			};
			if (manifest.state === "unknown") return {
				to: packageDirectory,
				resolution: "unresolved"
			};
			if (posix.isAbsolute(manifest.main)) return {
				to: posix.normalize(manifest.main),
				resolution: "unresolved"
			};
			const target = posix.join(posix.join(packageDirectory, manifest.main), ".");
			if (logicalPathEscapesRoot(target)) return {
				to: target,
				resolution: "unresolved"
			};
			const slots = resolutionSuffixes(mode);
			const candidates = mode === "runtime-require" ? [...nodeRequireFileCandidates(target), ...nodeRequireIndexCandidates(target)] : [...slots.flatMap((slot) => slot.map((suffix) => `${target}${suffix}`)), ...slots.flat().filter((suffix) => suffix !== "").map((suffix) => posix.join(target, `index${suffix}`))];
			const selection = selectObservedCandidate(candidates, context);
			if (!selection.ok) return {
				to: packageDirectory,
				resolution: "unresolved"
			};
			const selected = selection.value;
			return selected === undefined ? indexFallback === undefined ? {
				to: packageDirectory,
				resolution: "unresolved"
			} : {
				to: indexFallback,
				resolution: "internal"
			} : {
				to: selected,
				resolution: "internal"
			};
		};
		importLookupPath = (fromPath, specifier) => {
			let source;
			try {
				source = new URL(fromPath.split("/").map(encodeURIComponent).join("/"), "file:///rea-reference/");
			} catch (cause) {
				if (!(cause instanceof URIError)) throw cause;
				return err("The source path cannot be represented as a module URL.");
			}
			const target = URL.parse(specifier, source);
			if (target === null || target.protocol !== "file:" || target.host !== "") return err("The module URL cannot be resolved within the source inventory.");
			if (!target.pathname.startsWith("/rea-reference/")) return err("The module URL escapes the selected source inventory.");
			const decoded = decodeReferenceSourceModuleUrlPath(target.pathname.slice("/rea-reference/".length));
			return decoded.ok ? ok({
				path: decoded.value,
				directory: target.pathname.endsWith("/")
			}) : decoded;
		};
		resolveInternalSpecifier = (fromPath, specifier, context, mode) => {
			if (posix.isAbsolute(specifier)) return {
				to: specifier,
				resolution: "unresolved"
			};
			const imported = mode === "source-import" ? importLookupPath(fromPath, specifier) : undefined;
			if (imported !== undefined && !imported.ok) return {
				to: specifier,
				resolution: "unresolved",
				limitation: imported.error
			};
			const normalizedPath = imported?.ok === true ? imported.value.path : posix.normalize(posix.join(posix.dirname(fromPath), specifier));
			const normalized = normalizedPath.replace(/(?<=.)\/+$/u, "") || ".";
			if (logicalPathEscapesRoot(normalized)) return {
				to: normalized,
				resolution: "unresolved"
			};
			const directoryReference = imported?.ok === true ? imported.value.directory : specifier.endsWith("/") || [".", ".."].includes(posix.basename(specifier));
			const slots = resolutionSuffixes(mode);
			const candidates = mode === "runtime-require" ? [...directoryReference ? [] : nodeRequireFileCandidates(normalized), ...nodeRequireIndexCandidates(normalized)] : slots.flatMap((slot) => [...directoryReference ? [] : slot.map((suffix) => `${normalized}${suffix}`), ...slot.filter((suffix) => suffix !== "").map((suffix) => posix.join(normalized, `index${suffix}`))]);
			if (!directoryReference) candidates.push(...typescriptEmittedSourceCandidates(fromPath, normalized).map(({ path }) => path));
			const selection = selectObservedCandidate(candidates, context);
			if (!selection.ok) {
				if (mode === "runtime-require" && packageMainForDirectory(normalized, context)?.main.state === "declared") {
					const files = directoryReference ? ok(undefined) : selectObservedCandidate(nodeRequireFileCandidates(normalized), context);
					if (files.ok && files.value === undefined) return selectPackageMain(normalized, undefined, context, mode);
				}
				return {
					to: normalized,
					resolution: "unresolved"
				};
			}
			const match = selection.value;
			if (match === undefined) return packageMainForDirectory(normalized, context) !== undefined ? selectPackageMain(normalized, undefined, context, mode) : {
				to: normalized,
				resolution: "unresolved"
			};
			const directory = posix.join(normalized, ".");
			const resolvedThroughIndex = posix.basename(match).startsWith("index.") && posix.dirname(match).normalize("NFC") === directory.normalize("NFC");
			return resolvedThroughIndex ? selectPackageMain(posix.dirname(match), match, context, mode) : {
				to: match,
				resolution: "internal"
			};
		};
		packageTypeForFile = (path, context) => {
			let directory = posix.dirname(path);
			while (true) {
				const manifest = packageMainForDirectory(directory, context);
				if (manifest !== undefined) return context.packages.get(manifest.directory)?.type ?? "unknown";
				if (directory === "." || directory === "/" || posix.basename(directory) === "node_modules") return "unknown";
				directory = posix.dirname(directory);
			}
		};
		appendFile = (entry, context, output) => {
			const language = detectReferenceSourceLanguage(entry.path);
			const parsed = language === null || !PARSEABLE_REFERENCE_SOURCE_LANGUAGES.has(language) ? undefined : parseReferenceSourceImports(entry.path, entry.bytes, language, packageTypeForFile(entry.path, context), context.memberMutationAllowance);
			output.entries.push({
				path: entry.path,
				kind: "file",
				sha256: sha256Hex(entry.bytes),
				size: entry.size,
				language,
				classifications: classifyReferenceSourcePath(entry.path),
				content_state: "hashed",
				limitations: [...parsed?.limitations ?? []]
			});
			if (parsed === undefined) return;
			appendAll(output.limitations, parsed.limitations);
			for (const relationship of parsed.relationships) {
				const { resolutionStrategy, resolutionBasePath, ...graphRelationship } = relationship;
				if (graphRelationship.resolution !== "internal") {
					output.relationships.push(graphRelationship);
					continue;
				}
				const mode = resolutionStrategy === "runtime-require" ? "runtime-require" : graphRelationship.kind === "requires" ? "source-require" : "source-import";
				const resolved = resolveInternalSpecifier(resolutionBasePath ?? graphRelationship.from_path, graphRelationship.to, context, mode);
				if (resolved.limitation !== undefined) {
					const limitation = `${entry.path}: ${JSON.stringify(graphRelationship.to)}: ${resolved.limitation}`;
					output.limitations.push(limitation);
					output.entries.at(-1)?.limitations.push(limitation);
				}
				output.relationships.push({
					...graphRelationship,
					...mode === "source-import" && /[?%#]/u.test(graphRelationship.to) ? { source_specifier: graphRelationship.to } : {},
					to: resolved.to,
					resolution: resolved.resolution
				});
			}
			appendAll(output.parseFailures, parsed.parse_failures);
		};
		appendReadEntry = (entry, context, output) => {
			if (entry.kind === "file") {
				appendFile(entry, context, output);
				return;
			}
			const classifications = classifyReferenceSourcePath(entry.path);
			if (entry.kind === "directory") {
				output.entries.push({
					path: entry.path,
					kind: "directory",
					classifications,
					tree_state: "enumerated",
					limitations: []
				});
				return;
			}
			output.entries.push({
				path: entry.path,
				kind: "symlink",
				target: entry.targetState === "internal" || entry.targetState === "missing" && !isPortableAbsoluteReferenceTarget(entry.target) ? rebaseReferenceSourceTarget(entry.path, entry.target) : entry.target,
				target_state: entry.targetState,
				classifications,
				limitations: []
			});
		};
		parseReferenceSourceEntries = (read, exclusions, signal, memberMutationAllowance) => {
			const output = {
				entries: [],
				relationships: [],
				parseFailures: [],
				limitations: [...read.limitations]
			};
			if (read.rootFailure !== undefined) output.limitations.push(`Reference root enumeration is incomplete: ${read.rootFailure.message}`);
			const unobservedPath = unobservedReferencePath(read, exclusions);
			const packageInventory = readPackageMetadata(read, exclusions, unobservedPath);
			const context = {
				lookupPath: createReferenceSourcePathLookup(read.entries.filter((entry) => entry.status === "read" && entry.kind === "file").map((entry) => entry.path)),
				unobservedPath,
				packages: packageInventory.packages,
				packageManifestPathLookup: packageInventory.pathLookup,
				...memberMutationAllowance === undefined ? {} : { memberMutationAllowance }
			};
			for (const entry of read.entries) {
				if (signal?.aborted === true) break;
				if (entry.status === "failed") output.entries.push(failedEntry(entry));
				else appendReadEntry(entry, context, output);
			}
			return output;
		};
	})))();
}

//#endregion
//#region dist/application/ReferenceSourceGitDirectory.js
var ReferenceSourceGitDirectoryCancelled, locateReferenceSourceGitDirectory, resolveGitDirectory, hasCode;
function init_ReferenceSourceGitDirectory() {
	return (init_ReferenceSourceGitDirectory = __esmMin((() => {
		init_callerPath();
		ReferenceSourceGitDirectoryCancelled = class extends Error {
			reason;
			constructor(reason) {
				super("Git directory lookup cancelled", { cause: reason });
				this.reason = reason;
			}
		};
		locateReferenceSourceGitDirectory = async (root, readText, signal) => {
			let repository = root;
			for (;;) {
				if (signal?.aborted === true) throw new ReferenceSourceGitDirectoryCancelled(signal.reason);
				const dotgit = join(repository, ".git");
				let metadata;
				try {
					metadata = await lstat(dotgit);
				} catch (cause) {
					if (!hasCode(cause, "ENOENT")) throw cause;
					const parent = dirname(repository);
					if (parent === repository) return undefined;
					repository = parent;
					continue;
				}
				let selectedGitDirectory = dotgit;
				if (metadata.isFile()) {
					const pointer = (await readText(dotgit)).replace(/\r?\n$/u, "");
					if (!pointer.startsWith("gitdir: ") || pointer.length === 8) throw new Error("Invalid Git directory pointer");
					selectedGitDirectory = absoluteCallerPath(pointer.slice(8), { cwd: repository });
				}
				const gitDirectory = await resolveGitDirectory(selectedGitDirectory);
				let common;
				try {
					common = (await readText(join(gitDirectory, "commondir"))).replace(/\r?\n$/u, "");
				} catch (cause) {
					if (!hasCode(cause, "ENOENT")) throw cause;
				}
				if (common === "") throw new Error("Invalid Git common-directory pointer");
				const commonDirectory = common === undefined ? gitDirectory : await resolveGitDirectory(absoluteCallerPath(common, { cwd: gitDirectory }));
				return {
					repository,
					gitDirectory,
					commonDirectory
				};
			}
		};
		resolveGitDirectory = async (path) => {
			if (!(await stat(path)).isDirectory()) throw Object.assign(new Error(`Git metadata path is not a directory: ${path}`), {
				code: "ENOTDIR",
				path
			});
			return realpath(path);
		};
		hasCode = (cause, code) => typeof cause === "object" && cause !== null && "code" in cause && cause.code === code;
	})))();
}

//#endregion
//#region dist/application/ReferenceSourceVcsAdapter.js
var readReferenceSourceVcs, unknownVcs, resolveSourceVcs, errorCode;
function init_ReferenceSourceVcsAdapter() {
	return (init_ReferenceSourceVcsAdapter = __esmMin((() => {
		init_strictUtf8();
		init_analysisErrorCore();
		init_ReferenceSourceGitDirectory();
		init_result();
		init_resources();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_errorMessage();
		init_ReferenceSourceFailureBuilders();
		readReferenceSourceVcs = async (root, resources, signal) => {
			try {
				return await resources.run(async () => {
					try {
						return ok(await resolveSourceVcs(root, resources, signal));
					} catch (cause) {
						if (cause instanceof ArtifactReaderFailure) throw cause;
						return ok(unknownVcs());
					}
				});
			} catch (cause) {
				if (!(cause instanceof ArtifactReaderFailure)) throw cause;
				return err({
					...referenceSourceResourceFailure(cause),
					...cause.reason !== "cancelled" && signal?.aborted === true ? { secondaryCancellation: { cause: signal.reason } } : {}
				});
			}
		};
		unknownVcs = () => ({
			kind: "unknown",
			head: null,
			dirty: null
		});
		resolveSourceVcs = async (root, resources, signal) => {
			const { resolveRef } = await import("isomorphic-git");
			let failedRead;
			const cleanupFailures = [];
			const readMetadataBytes = async (path) => {
				try {
					return await readRegularFile(path, {
						signal,
						cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", "Git metadata read cancelled", { cause: reason })
					});
				} catch (cause) {
					if (cause instanceof ArtifactReaderFailure) throw cause;
					if (!(cause instanceof RegularFileCleanupFailure)) {
						if (signal?.aborted === true && regularFileCancellation(cause) === undefined) {
							const physical = cause instanceof RegularFileReadFailure ? cause.operationCause : cause;
							if (errorCode(physical) === "ENOENT") throw physical;
							throw new ArtifactReaderFailure("io", `Git metadata could not be read safely: ${errorMessage(physical)}`, { cause: physical });
						}
						throw cause instanceof RegularFileReadFailure ? cause.operationCause : cause;
					}
					const cancellation = regularFileCancellation(cause);
					const retry = await retryRegularFileCleanup(cause, resources, signal);
					if (retry.outcome.kind === "failed" && cancellation === undefined && errorCode(retry.outcome.cause) !== "ENOENT") failedRead ??= { cause: retry.outcome.cause };
					if (retry.cleanup === undefined && retry.outcome.kind === "failed" && !isAborted$1(signal)) throw retry.outcome.cause;
					const primary = retry.outcome.kind === "failed" ? retry.outcome.cause : cause.cleanupCause;
					throw new ArtifactReaderFailure(cancellation === undefined ? "io" : "cancelled", `Git metadata could not be read safely: ${errorMessage(primary)}`, {
						cause: cancellation === undefined ? primary : cancellation.reason,
						...retry.cleanup === undefined ? {} : { cleanup: retry.cleanup }
					});
				}
			};
			const readMetadataText = async (path) => decodeStrictUtf8(await readMetadataBytes(path), "preserve");
			const throwCleanupFailures = (primary) => {
				const observations = cleanupFailures.flatMap((failure) => failure.cleanup === undefined ? [] : [failure.cleanup]);
				throw new ArtifactReaderFailure(primary instanceof ArtifactReaderFailure && primary.reason === "cancelled" ? "cancelled" : "io", `Git metadata could not be read safely: ${errorMessage(primary)}`, {
					cause: new AggregateError([primary, ...cleanupFailures], "Git metadata reads and cleanup failed", { cause: primary }),
					...observations.length === 0 ? {} : { cleanup: {
						reason: observations.map(({ reason }) => reason).join("; "),
						resources: [...new Set(observations.flatMap(({ resources }) => resources))]
					} }
				});
			};
			const referenceFs = {
				...fs,
				promises: {
					...fs.promises,
					readFile: async (path, options = null) => {
						if (path === undefined) throw new TypeError("Git metadata path is required");
						try {
							const bytes = await readMetadataBytes(path);
							const encoding = typeof options === "string" ? options : typeof options === "object" && options !== null && "encoding" in options ? options.encoding : undefined;
							if (encoding === undefined || encoding === null) return bytes;
							if (typeof encoding !== "string" || !Buffer.isEncoding(encoding)) throw new TypeError("Unsupported Git metadata text encoding");
							return bytes.toString(encoding);
						} catch (cause) {
							if (cause instanceof ArtifactReaderFailure) {
								cleanupFailures.push(cause);
								if (cause.reason !== "cancelled") failedRead ??= { cause: cause.cause ?? cause };
							} else if (errorCode(cause) !== "ENOENT") failedRead ??= { cause };
							throw cause;
						}
					}
				}
			};
			const readRef = async (options) => {
				let head;
				try {
					head = await resolveRef({
						fs: referenceFs,
						dir: root,
						...options
					});
				} catch (cause) {
					if (cleanupFailures.length > 0) throwCleanupFailures(failedRead?.cause ?? cleanupFailures[0] ?? cause);
					if (failedRead !== undefined) throw failedRead.cause;
					throw cause;
				}
				if (cleanupFailures.length > 0) throwCleanupFailures(failedRead?.cause ?? cleanupFailures[0]);
				signal?.throwIfAborted();
				if (failedRead !== undefined) throw failedRead.cause;
				return head;
			};
			let locations;
			try {
				locations = await locateReferenceSourceGitDirectory(root, readMetadataText, signal);
			} catch (cause) {
				if (signal?.aborted === true && !(cause instanceof ReferenceSourceGitDirectoryCancelled) && !(cause instanceof ArtifactReaderFailure)) throw new ArtifactReaderFailure("io", `Git directory could not be resolved: ${errorMessage(cause)}`, { cause });
				throw cause;
			}
			if (locations === undefined) return {
				kind: "none",
				head: null,
				dirty: null
			};
			if (isAborted$1(signal)) return unknownVcs();
			const { gitDirectory, commonDirectory } = locations;
			if (gitDirectory === commonDirectory) {
				const head = await readRef({
					gitdir: gitDirectory,
					ref: "HEAD"
				});
				return isAborted$1(signal) ? unknownVcs() : {
					kind: "git",
					head,
					dirty: null
				};
			}
			const headText = (await readMetadataText(join(gitDirectory, "HEAD"))).trim();
			const ref = headText.startsWith("ref: ") ? headText.slice(5) : "HEAD";
			const privateRef = ref === "HEAD" || [
				"refs/bisect/",
				"refs/rewritten/",
				"refs/worktree/"
			].some((prefix) => ref.startsWith(prefix));
			const head = await readRef({
				gitdir: privateRef ? gitDirectory : commonDirectory,
				ref
			});
			if (isAborted$1(signal)) return unknownVcs();
			return {
				kind: "git",
				head,
				dirty: null
			};
		};
		errorCode = (cause) => typeof cause === "object" && cause !== null && "code" in cause ? String(cause.code) : undefined;
	})))();
}

//#endregion
//#region dist/application/ReferenceSourceImportTypes.js
var IMPORT_FAILURE_GUIDANCE, referenceSourceImportAnalysisError, DEFAULT_REFERENCE_SOURCE_IGNORE_PATTERNS;
function init_ReferenceSourceImportTypes() {
	return (init_ReferenceSourceImportTypes = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		IMPORT_FAILURE_GUIDANCE = {
			cancelled: "Reference source import was cancelled. Start it again when ready.",
			"invalid-root": "Reference source directory could not be opened. Check that the path exists, is readable, and points to a directory.",
			unsupported: "Safe no-follow file opens are unavailable on this host. Import the source tree with REA on Linux (including WSL) or macOS.",
			io: "Reference source files could not be read. Check directory permissions and try again.",
			parse: "Reference source could not be indexed. Check that the source tree is readable, then try again."
		};
		referenceSourceImportAnalysisError = (error) => {
			const guidance = error.remediationAction ?? IMPORT_FAILURE_GUIDANCE[error.code];
			const message = `${error.message} ${guidance}`;
			const partial = error.partial;
			const options = {
				cause: error.cause,
				...error.cleanup === undefined ? {} : { cleanup: error.cleanup },
				diagnostics: {
					reference_source_code: error.code,
					...partial === undefined ? {} : { partial: {
						root: partial.root,
						...partial.rootFailure === undefined ? {} : { rootFailure: { ...partial.rootFailure } },
						entries: partial.entries.map((entry) => entry.status === "read" && entry.kind === "file" ? {
							...entry,
							bytes: Array.from(entry.bytes)
						} : { ...entry }),
						bytesRead: partial.bytesRead,
						limitations: [...partial.limitations]
					} }
				}
			};
			let primary;
			switch (error.code) {
				case "cancelled": {
					const { cause: reason, ...rest } = options;
					primary = cancelledBy("import_reference_source", carriedReason(reason), {
						...rest,
						userMessage: message
					});
					break;
				}
				case "invalid-root":
					primary = new AnalysisInputError("import_reference_source", {
						...options,
						userMessage: message,
						...error.remediationAction === undefined ? {} : { remediationAction: error.remediationAction }
					}, [{
						path: ["root"],
						reason: "invalid_value",
						message: error.message
					}]);
					break;
				case "unsupported":
					primary = new AnalysisCapabilityUnavailableError("filesystem", "import_reference_source", error.message, {
						...options,
						userMessage: message,
						remediationAction: guidance
					});
					break;
				case "io":
				case "parse":
					primary = new AnalysisOutputError("import_reference_source", error.message, {
						...options,
						userMessage: message,
						remediationAction: guidance
					});
					break;
			}
			return error.secondaryCancellation === undefined ? primary : analysisErrorWithCancellation(primary, cancelledBy("import_reference_source", carriedReason(error.secondaryCancellation.cause)));
		};
		DEFAULT_REFERENCE_SOURCE_IGNORE_PATTERNS = [
			".git/",
			".git/hooks/",
			".git",
			"node_modules/",
			"dist/",
			"build/",
			"coverage/",
			"htmlcov/",
			".coverage",
			"*.log"
		];
	})))();
}

//#endregion
//#region dist/application/ReferenceSourceImportPolicy.js
var failure$1, IgnorePolicyReadCancelled, isIgnorePolicyCancellation, ignorePolicyCause, addMarkedPatterns, resolveRoot, readPolicyFile, readIgnoreCase, buildIgnored, prepareReferenceSourceImport;
function init_ReferenceSourceImportPolicy() {
	return (init_ReferenceSourceImportPolicy = __esmMin((() => {
		init_analysisErrorCore();
		init_ReferenceSourceGitDirectory();
		init_RegularFileRead();
		init_result();
		init_resources();
		init_ReferenceSourceImportTypes();
		init_OwnedRegularFile();
		init_errorMessage();
		init_ReferenceSourceFailureBuilders();
		failure$1 = (code, message) => ({
			tag: "reference-source-import",
			code,
			message
		});
		IgnorePolicyReadCancelled = class extends Error {
			reason;
			constructor(reason) {
				super("Reference source ignore policy read was cancelled", { cause: reason });
				this.reason = reason;
				this.name = "IgnorePolicyReadCancelled";
			}
		};
		isIgnorePolicyCancellation = (cause) => cause instanceof IgnorePolicyReadCancelled;
		ignorePolicyCause = (cause) => cause instanceof IgnorePolicyReadCancelled ? cause.reason : cause instanceof RegularFileReadFailure ? cause.operationCause : cause;
		addMarkedPatterns = (matcher, patterns, mark) => {
			for (const pattern of patterns) for (const line of pattern.split(/\r?\n/u)) matcher.add({
				pattern: line,
				mark
			});
		};
		resolveRoot = async (requestedRoot, signal) => {
			if (isAborted$1(signal)) return err({
				...failure$1("cancelled", "Reference source import cancelled"),
				cause: signal?.reason
			});
			try {
				const metadata = await stat(requestedRoot);
				if (isAborted$1(signal)) return err({
					...failure$1("cancelled", "Reference source import cancelled"),
					cause: signal?.reason
				});
				if (!metadata.isDirectory()) return err(failure$1("invalid-root", `Reference source root is not a directory: ${requestedRoot}`));
				const canonicalRoot = await realpath(requestedRoot);
				if (isAborted$1(signal)) return err({
					...failure$1("cancelled", "Reference source import cancelled"),
					cause: signal?.reason
				});
				return ok(canonicalRoot);
			} catch (cause) {
				const rootFailure = rootFilesystemFailure(cause, "Reference source root could not be resolved");
				if (rootFailure === undefined) throw cause;
				return err({
					...failure$1(rootFailure.code, rootFailure.message),
					...rootFailure.remediationAction === undefined ? {} : { remediationAction: rootFailure.remediationAction },
					cause,
					...signal?.aborted === true ? { secondaryCancellation: { cause: signal.reason } } : {}
				});
			}
		};
		readPolicyFile = async (policyPath, resources, signal) => {
			try {
				let present = true;
				try {
					await lstat(policyPath);
				} catch (cause) {
					if (!(typeof cause === "object" && cause !== null && "code" in cause && cause.code === "ENOENT")) throw cause;
					present = false;
				}
				if (signal?.aborted === true) throw new IgnorePolicyReadCancelled(signal.reason);
				if (present) {
					let text;
					try {
						text = await readRegularFileText(policyPath, {
							signal,
							cancellationFailure: (reason) => new IgnorePolicyReadCancelled(reason)
						});
					} catch (cause) {
						if (!(cause instanceof RegularFileCleanupFailure)) throw cause;
						const cancellation = regularFileCancellation(cause);
						const retry = await retryRegularFileCleanup(cause, resources, signal);
						const cancellationFailure = cancellation === undefined ? undefined : new IgnorePolicyReadCancelled(cancellation.reason);
						if (retry.cleanup !== undefined) {
							const primary = cancellationFailure ?? (retry.outcome.kind === "failed" ? retry.outcome.cause : cause.cleanupCause);
							const primaryCause = ignorePolicyCause(primary);
							return err({
								...failure$1(isIgnorePolicyCancellation(primary) ? "cancelled" : "io", `Reference source ignore policy could not be read at ${policyPath}: ${errorMessage(primaryCause)}`),
								cleanup: retry.cleanup,
								cause: primaryCause,
								...signal !== undefined && isAborted$1(signal) && !isIgnorePolicyCancellation(primary) ? { secondaryCancellation: { cause: signal.reason } } : {}
							});
						}
						if (cancellationFailure !== undefined) throw cancellationFailure;
						if (retry.outcome.kind === "failed") throw retry.outcome.cause;
						text = retry.outcome.value;
					}
					return ok(text);
				}
				return ok(undefined);
			} catch (cause) {
				const causeValue = ignorePolicyCause(cause);
				return err({
					...failure$1(isIgnorePolicyCancellation(cause) ? "cancelled" : "io", `Reference source policy could not be read at ${policyPath}: ${errorMessage(causeValue)}`),
					cause: causeValue,
					...signal?.aborted === true && !isIgnorePolicyCancellation(cause) ? { secondaryCancellation: { cause: signal.reason } } : {}
				});
			}
		};
		readIgnoreCase = async (root, resources, signal) => {
			let readFailure;
			const readText = async (path) => {
				if (path === undefined) throw new TypeError("Git metadata path is required");
				const read = await readPolicyFile(path, resources, signal);
				if (!read.ok) {
					readFailure = read.error;
					throw read.error;
				}
				if (read.value === undefined) {
					const absent = new Error(`Git metadata file is absent: ${path}`);
					Object.assign(absent, { code: "ENOENT" });
					throw absent;
				}
				return read.value;
			};
			try {
				const location = await locateReferenceSourceGitDirectory(root, readText, signal);
				if (location === undefined) return ok(false);
				const { getConfig } = await import("isomorphic-git");
				const value = await getConfig({
					fs: {
						...fs,
						promises: {
							...fs.promises,
							readFile: readText
						}
					},
					gitdir: location.commonDirectory,
					path: "core.ignorecase"
				});
				if (readFailure !== undefined) return err(readFailure);
				if (value === undefined) return ok(false);
				if (typeof value === "boolean") return ok(value);
				return err(failure$1("io", `Invalid core.ignorecase in ${location.commonDirectory}/config`));
			} catch (cause) {
				if (readFailure !== undefined) return err(readFailure);
				if (isIgnorePolicyCancellation(cause) || cause instanceof ReferenceSourceGitDirectoryCancelled) return err({
					...failure$1("cancelled", "Reference source import cancelled"),
					cause: cause instanceof ReferenceSourceGitDirectoryCancelled ? cause.reason : ignorePolicyCause(cause)
				});
				return err({
					...failure$1("io", `Reference source Git policy could not be read: ${errorMessage(cause)}`),
					cause,
					...signal?.aborted === true ? { secondaryCancellation: { cause: signal.reason } } : {}
				});
			}
		};
		buildIgnored = async (root, excludePaths, resources, signal) => {
			const ignoreCase = await readIgnoreCase(root, resources, signal);
			if (!ignoreCase.ok) return ignoreCase;
			const mandatory = ignore();
			addMarkedPatterns(mandatory, DEFAULT_REFERENCE_SOURCE_IGNORE_PATTERNS, "default-ignored");
			for (const path of excludePaths) addMarkedPatterns(mandatory, [path, `${path}/`], "caller-excluded");
			const scopes = new Map();
			const loadDirectory = async (path) => {
				if (scopes.has(path)) return ok(undefined);
				const policyPath = path === "." ? join(root, ".gitignore") : join(root, path, ".gitignore");
				const read = await readPolicyFile(policyPath, resources, signal);
				if (!read.ok) return read;
				const matcher = ignore({ ignoreCase: ignoreCase.value });
				if (read.value !== undefined) addMarkedPatterns(matcher, [read.value], "project-ignored");
				scopes.set(path, matcher);
				return ok(undefined);
			};
			const rootPolicy = await loadDirectory(".");
			if (!rootPolicy.ok) return rootPolicy;
			return ok({
				ignored: { test: (path) => {
					const mandatoryMatch = mandatory.test(path);
					if (mandatoryMatch.ignored || mandatoryMatch.unignored) return mandatoryMatch;
					let result = mandatoryMatch;
					const pieces = path.replace(/\/$/u, "").split("/");
					for (let depth = 0; depth < pieces.length; depth += 1) {
						const scope = depth === 0 ? "." : pieces.slice(0, depth).join("/");
						const matcher = scopes.get(scope);
						if (matcher === undefined) continue;
						const scopedPath = pieces.slice(depth).join("/") + (path.endsWith("/") ? "/" : "");
						const match = matcher.test(scopedPath);
						if (match.ignored || match.unignored) result = match;
					}
					return result;
				} },
				beforeDirectory: async (path) => {
					const loaded = await loadDirectory(path);
					return loaded.ok ? loaded : err({
						...loaded.error,
						tag: "reference-source-reader",
						code: loaded.error.code === "cancelled" ? "cancelled" : "io"
					});
				}
			});
		};
		prepareReferenceSourceImport = async (options, resources) => {
			try {
				return await resources.run(async () => {
					const root = await resolveRoot(options.root, options.signal);
					if (!root.ok) return root;
					try {
						const ignored = await buildIgnored(root.value, options.excludePaths ?? [], resources, options.signal);
						if (!ignored.ok) return ignored;
						return ok({
							root: root.value,
							...ignored.value,
							secrets: ignore().add([...options.policy.secretPatterns])
						});
					} catch (cause) {
						const causeValue = ignorePolicyCause(cause);
						return err({
							...failure$1(isIgnorePolicyCancellation(cause) ? "cancelled" : "io", `Reference source ignore policy could not be read at ${join(root.value, ".gitignore")}: ${errorMessage(causeValue)}`),
							cause: causeValue
						});
					}
				});
			} catch (cause) {
				if (!(cause instanceof ArtifactReaderFailure)) throw cause;
				return err({
					...failure$1(cause.reason === "cancelled" ? "cancelled" : "io", cause.message),
					...cause.cleanup === undefined ? {} : { cleanup: cause.cleanup },
					cause
				});
			}
		};
	})))();
}

//#endregion
//#region dist/application/ReferenceSourceImport.js
var failure, cancelled, deduplicateRelationships, normalizeHistoricalSourceParseFailures, buildProvenance, sortExclusions, createShouldExclude, importReferenceSource, combineReadFailures, mergeCleanup;
function init_ReferenceSourceImport() {
	return (init_ReferenceSourceImport = __esmMin((() => {
		init_analysisErrorCore();
		init_unicodeCodePointOrder();
		init_referenceSourceGraph();
		init_result();
		init_ReferenceSourceReader();
		init_ReferenceSourceImportEntries();
		init_ReferenceSourceVcsAdapter();
		init_ReferenceSourceImportPolicy();
		failure = (code, message) => ({
			tag: "reference-source-import",
			code,
			message
		});
		cancelled = (signal, partial) => ({
			...failure("cancelled", "Reference source import cancelled"),
			...signal?.aborted === true ? { cause: signal.reason } : {},
			...partial === undefined ? {} : { partial }
		});
		deduplicateRelationships = (relationships) => {
			const seen = new Set();
			const result = [];
			for (const relationship of relationships) {
				const key = historicalSourceRelationshipKey(relationship);
				if (seen.has(key)) continue;
				seen.add(key);
				result.push(relationship);
			}
			return result;
		};
		normalizeHistoricalSourceParseFailures = (failures) => [...failures].sort((left, right) => compareUnicodeCodePoints(historicalSourceParseFailureKey(left), historicalSourceParseFailureKey(right))).filter((value, index, array) => {
			if (index === 0) return true;
			const previous = array[index - 1];
			return previous === undefined || historicalSourceParseFailureKey(value) !== historicalSourceParseFailureKey(previous);
		});
		buildProvenance = (options) => ({
			importer: options.importer ?? "rea-reference-source-import",
			importer_version: options.importerVersion ?? null,
			caller: options.caller
		});
		sortExclusions = (exclusions) => [...exclusions].sort((left, right) => {
			const byPath = compareUnicodeCodePoints(left.path, right.path);
			if (byPath !== 0) return byPath;
			const byReason = compareUnicodeCodePoints(left.reason, right.reason);
			if (byReason !== 0) return byReason;
			return compareUnicodeCodePoints("pattern" in left ? left.pattern : "", "pattern" in right ? right.pattern : "");
		});
		createShouldExclude = (exclusions, secrets, ignored) => (path, kind) => {
			const patternPaths = kind === "directory" ? [`${path}/`] : kind === "unknown" ? [path, `${path}/`] : [path];
			const firstMatch = (matcher) => {
				const results = patternPaths.map((patternPath) => matcher.test(patternPath));
				return results.find(({ ignored }) => ignored) ?? results[0];
			};
			const secretMatch = firstMatch(secrets);
			if (secretMatch?.ignored === true) {
				if (!secretMatch.rule) throw new Error(`Ignored secret path has no matching rule: ${path}`);
				exclusions.push({
					path,
					entry_kind: kind,
					reason: "configured-secret",
					pattern: secretMatch.rule.pattern
				});
				return true;
			}
			const match = firstMatch(ignored);
			if (match?.ignored !== true) return false;
			if (!match.rule) throw new Error(`Ignored path has no matching rule: ${path}`);
			const reason = match.rule.mark;
			if (reason !== "project-ignored" && reason !== "default-ignored" && reason !== "caller-excluded") throw new Error(`Ignored path has unknown rule origin: ${path}`);
			exclusions.push({
				path,
				entry_kind: kind,
				reason,
				pattern: match.rule.pattern
			});
			return true;
		};
		importReferenceSource = async (options, resources) => {
			if (isAborted$1(options.signal)) return err(cancelled(options.signal));
			const prepared = await prepareReferenceSourceImport(options, resources);
			if (!prepared.ok) return prepared;
			const { ignored, root, secrets } = prepared.value;
			if (isAborted$1(options.signal)) return err(cancelled(options.signal));
			const exclusions = [];
			const shouldExclude = createShouldExclude(exclusions, secrets, ignored);
			const [readResult, vcsResult] = await Promise.all([readReferenceSource(root, resources, {
				...options.signal === undefined ? {} : { signal: options.signal },
				shouldExclude,
				beforeDirectory: prepared.value.beforeDirectory
			}), readReferenceSourceVcs(root, resources, options.signal)]);
			if (!readResult.ok) return err(combineReadFailures(readResult.error, vcsResult.ok ? undefined : vcsResult.error, readResult.error.partial));
			if (!vcsResult.ok) return err(combineReadFailures(vcsResult.error, undefined, readResult.value));
			const vcs = vcsResult.value;
			if (isAborted$1(options.signal)) return err(cancelled(options.signal, readResult.value));
			const read = readResult.value;
			const { entries, relationships, parseFailures, limitations } = parseReferenceSourceEntries(read, exclusions, options.signal, options.memberMutationAllowance);
			if (isAborted$1(options.signal)) return err(cancelled(options.signal, read));
			const uniqueRelationships = deduplicateRelationships(relationships);
			const uniqueFailures = normalizeHistoricalSourceParseFailures(parseFailures);
			const sortedEntries = [...entries].sort((left, right) => compareUnicodeCodePoints(left.path, right.path));
			const sortedExclusions = sortExclusions(exclusions);
			const sortedLimitations = [...limitations].sort(compareUnicodeCodePoints);
			const input = {
				schema: "HistoricalSourceGraph",
				authority: "historical-reference",
				root_alias: "$REFERENCE_ROOT",
				inventory_state: historicalSourceInventoryHasPartialFacts({
					entries: sortedEntries,
					relationships: uniqueRelationships,
					parse_failures: uniqueFailures,
					exclusions: sortedExclusions,
					limitations: sortedLimitations
				}) ? "partial" : "complete",
				entries: sortedEntries,
				relationships: uniqueRelationships.sort((left, right) => compareUnicodeCodePoints(historicalSourceRelationshipKey(left), historicalSourceRelationshipKey(right))),
				parse_failures: uniqueFailures,
				exclusions: sortedExclusions,
				languages: historicalSourceLanguages(sortedEntries),
				manifests: historicalSourceManifests(sortedEntries),
				vcs,
				provenance: buildProvenance(options),
				limitations: sortedLimitations
			};
			try {
				return ok(createHistoricalSourceGraph(input));
			} catch (cause) {
				return err(failure("parse", cause instanceof Error ? cause.message : "Graph failed validation"));
			}
		};
		combineReadFailures = (inventory, metadata, partial) => {
			const primary = inventory.code === "cancelled" && metadata !== undefined && metadata.code !== "cancelled" ? metadata : inventory;
			const other = primary === inventory ? metadata : inventory;
			const cleanup = mergeCleanup(primary.cleanup, other?.cleanup);
			const message = other === undefined || other.code === "cancelled" ? primary.message : `${primary.message}; additional reference failure: ${other.message}`;
			const cause = other === undefined || other.code === "cancelled" ? primary.cause : new AggregateError([primary, other], "Reference source inventory and metadata both failed", { cause: primary });
			const secondaryCancellation = primary.secondaryCancellation ?? other?.secondaryCancellation ?? (other?.code === "cancelled" && primary.code !== "cancelled" ? { cause: other.cause } : undefined);
			return {
				...failure(primary.code, message),
				...primary.remediationAction === undefined ? {} : { remediationAction: primary.remediationAction },
				...cleanup === undefined ? {} : { cleanup },
				...secondaryCancellation === undefined ? {} : { secondaryCancellation },
				...partial === undefined ? {} : { partial },
				...cause === undefined ? {} : { cause }
			};
		};
		mergeCleanup = (first, second) => {
			if (first === undefined) return second;
			if (second === undefined) return first;
			return {
				reason: `${first.reason}; ${second.reason}`,
				resources: [...new Set([...first.resources, ...second.resources])]
			};
		};
	})))();
}

//#endregion
//#region dist/cli/nativeCallCommands.js
var registerNativeCallCommands;
function init_nativeCallCommands() {
	return (init_nativeCallCommands = __esmMin((() => {
		init_projectCliAnalysisResult();
		init_nativeToolContracts();
		init_analysisErrorProjection();
		init_contractCliDescription();
		init_contractCommand();
		registerNativeCallCommands = (cli, logger, runProviderAnalysis) => {
			const contract = contractNamed(NATIVE_TOOL_CONTRACTS, "observe_native_calls");
			registerContractDocumentCommand(cli, logger, contract, {
				description: "Launch a Mach-O under LLDB and record entries into selected functions or Objective-C methods",
				sessionTarget: { description: "Mach-O or app path" },
				document: "Inline JSON or a JSON file path: breakpoints, arguments, environment, duration_ms, max_events, argument_registers, backtrace_frames, capture_limits"
			}, async (_document, context) => {
				const admitted = admittedContractInput(context);
				if (!admitted.ok) return {
					error: "Analysis failed",
					...projectAnalysisError(admitted.error)
				};
				return runProviderAnalysis(context.sessionTarget, contract.name, admitted.value, logger, context.signal).then((result) => projectCliAnalysisResult(result));
			});
		};
	})))();
}

//#endregion
//#region dist/cli/utilityCommands.js
var utilityCommands_exports = /* @__PURE__ */ __exportAll({ registerUtilityCommands: () => registerUtilityCommands });
var registerUtilityCommands, registerNativeUiCommands, registerCapabilityCommands, registerNativeCommands, referenceSourceExcludePathsSchema, EXCLUDE_PATHS_INPUT_MESSAGE, invalidReferenceSourceExcludePaths, parseReferenceSourceExcludePaths, registerReferenceSourceCommand, runReferenceSourceImport;
function init_utilityCommands() {
	return (init_utilityCommands = __esmMin((() => {
		init_contractCliDescription();
		init_javascriptMemberMutationAllowance();
		init_options();
		init_schemaConstraints();
		init_referenceSourceSummary();
		init_resources();
		init_ReferenceSourceImport();
		init_ReferenceSourceImportTypes();
		init_result();
		init_commandCancellation();
		init_finishAnalysisCommand();
		init_parseConfig();
		init_analysisErrorProjection();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_safeJson();
		init_identity();
		init_cliLogging();
		init_cliCommandNames();
		init_localPath();
		init_commandRegistry();
		init_nativeCallCommands();
		init_nativeToolContracts();
		init_contractCommand();
		registerUtilityCommands = (cli, logger, environment, analysis) => {
			const { runProviderAnalysis } = analysis;
			const run = runOnSessionTarget(runProviderAnalysis, logger);
			registerCapabilityCommands(cli, logger, analysis);
			registerNativeCommands(cli, logger, runProviderAnalysis);
			registerNativeCallCommands(cli, logger, runProviderAnalysis);
			registerNativeUiCommands(cli, logger, run);
			registerReferenceSourceCommand(cli, logger, environment);
		};
		registerNativeUiCommands = (cli, logger, run) => {
			const sessionTarget = { description: "Local native executable or app path" };
			const fields = {
				pid: { description: "Existing application PID" },
				window_id: { description: "Exact selected application window ID" },
				max_nodes: { description: "Maximum accessibility nodes per capture" }
			};
			registerContractCommand(cli, logger, contractNamed(NATIVE_TOOL_CONTRACTS, "observe_native_ui"), {
				description: "Observe one already-running native application window by PID and window ID",
				sessionTarget,
				fields
			}, run);
			registerContractCommand(cli, logger, contractNamed(NATIVE_TOOL_CONTRACTS, "capture_native_ui_scenario"), {
				description: "Run declarative AX actions or waits in one exact native application window",
				sessionTarget,
				runtimeJson: { steps: "steps must be valid JSON" },
				fields: {
					...fields,
					steps: { description: "Required JSON array of one or more declarative AX actions or waits" }
				}
			}, run);
		};
		registerCapabilityCommands = (cli, logger, { runSessionStatus }) => {
			for (const command of [CLI_COMMANDS.capabilities, CLI_COMMANDS.providers]) {
				registerCliCommand(cli, command, {
					description: command === "capabilities" ? "List provider capabilities and side effects" : "List configured analysis providers",
					run: () => logCliCommand(logger, command, () => runSessionStatus(logger))
				});
			}
		};
		registerNativeCommands = (cli, logger, runProviderAnalysis) => {
			const run = runOnSessionTarget(runProviderAnalysis, logger);
			const machoTarget = { description: "Mach-O or app path" };
			registerContractCommand(cli, logger, contractNamed(NATIVE_TOOL_CONTRACTS, "inspect_macho"), {
				description: "Run inspect_macho without launching Hopper",
				sessionTarget: machoTarget,
				evidenceDelivery: true
			}, run);
			for (const [command, tool] of [[cliCommandFor("inspect_signature"), "inspect_signature"], [cliCommandFor("list_architectures"), "list_architectures"]]) registerContractCommand(cli, logger, contractNamed(NATIVE_TOOL_CONTRACTS, tool), {
				command,
				description: `Run ${tool} without launching Hopper`,
				sessionTarget: machoTarget
			}, run);
			registerContractCommand(cli, logger, contractNamed(NATIVE_TOOL_CONTRACTS, "inspect_plist"), {
				description: "Parse app plist metadata without launching Hopper",
				sessionTarget: { description: "App, Mach-O or plist path" },
				fields: { path: {
					name: "relativePath",
					description: "Plist path relative to the app root, or an absolute path within the opened bundle (default: its Info.plist)"
				} }
			}, run);
			registerContractCommand(cli, logger, contractNamed(NATIVE_TOOL_CONTRACTS, "demangle_swift"), {
				description: "Demangle Swift symbols without Hopper",
				sessionTarget: { description: "Artifact path used for evidence identity" },
				positionals: ["symbols"],
				fields: { symbols: { description: "Swift mangled symbols to demangle" } }
			}, run);
		};
		referenceSourceExcludePathsSchema = z.object({ excludePaths: z.array(z.string().min(1)) });
		EXCLUDE_PATHS_INPUT_MESSAGE = "--exclude-paths must be a JSON array of nonempty Git-ignore rules. Each rule uses Git-ignore syntax, including wildcards, directory suffixes, and negations, rather than a literal path match.";
		invalidReferenceSourceExcludePaths = (issues) => ({
			error: "Import failed",
			...projectAnalysisError(new AnalysisInputError(CLI_COMMANDS.importReferenceSource, { userMessage: EXCLUDE_PATHS_INPUT_MESSAGE }, issues))
		});
		parseReferenceSourceExcludePaths = (encoded) => {
			if (encoded === undefined) return {
				ok: true,
				rules: undefined
			};
			const decoded = safeParseJson(encoded);
			if (!decoded.ok) return {
				ok: false,
				failure: invalidReferenceSourceExcludePaths([{
					path: ["excludePaths"],
					reason: "invalid_format",
					expected: "JSON"
				}])
			};
			const parsed = referenceSourceExcludePathsSchema.safeParse({ excludePaths: decoded.value });
			if (!parsed.success) return {
				ok: false,
				failure: invalidReferenceSourceExcludePaths(projectInputIssues(parsed.error.issues, { excludePaths: decoded.value }))
			};
			return {
				ok: true,
				rules: parsed.data.excludePaths
			};
		};
		registerReferenceSourceCommand = (cli, logger, environment) => {
			registerCliCommand(cli, CLI_COMMANDS.importReferenceSource, {
				description: "Import a source tree as historical reference only",
				args: z.object({ root: localPathStringSchema.describe("Local source directory to import as historical reference") }),
				options: requirePresence(z.object({
					excludePaths: z.string().optional().describe("JSON array of Git-ignore rules to exclude. Rules use Git-ignore syntax, including wildcards, directory suffixes, and negations; they are not literal path matches. An empty array adds no caller exclusions."),
					detail: z.enum(["full", "summary"]).default("full").describe("Complete committed graph or compact historical-source summary"),
					outlineDepth: cliDecimalField(z.int().min(0).optional().describe("Summary outline path depth (default: 2; 0 omits entries); requires --detail summary"))
				}), [{
					when: "outlineDepth",
					requires: "detail",
					requiresValue: "summary",
					message: "--outline-depth requires --detail summary"
				}]),
				run: ({ args, options }) => logCliCommand(logger, "import-reference-source", async () => {
					const excludePaths = parseReferenceSourceExcludePaths(options.excludePaths);
					if (!excludePaths.ok) return excludePaths.failure;
					const config = parseConfig(environment);
					if (!config.ok) return {
						error: "Import failed",
						...projectAnalysisError(config.error)
					};
					const memberMutationAllowance = resolveJavaScriptMemberMutationAllowance(environment);
					if (!memberMutationAllowance.ok) return {
						error: "Import failed",
						...projectAnalysisError(memberMutationAllowance.error)
					};
					return withCommandCancellation((signal) => runReferenceSourceImport({
						root: args.root,
						memberMutationAllowance: memberMutationAllowance.value,
						caller: "rea-cli",
						policy: config.value.referenceSourcePolicy,
						importer: PRODUCT_IDENTITY.packageName,
						importerVersion: PRODUCT_IDENTITY.packageVersion,
						signal,
						...excludePaths.rules === undefined ? {} : { excludePaths: excludePaths.rules }
					}, options.detail === "summary" ? options.outlineDepth ?? 2 : undefined));
				}, isCliOperationFailure)
			});
		};
		runReferenceSourceImport = async (options, outlineDepth) => {
			const resources = new ArtifactResourceScope();
			const result = await finishAnalysisCommand(async () => {
				const imported = await importReferenceSource(options, resources);
				return imported.ok ? imported : err(referenceSourceImportAnalysisError(imported.error));
			}, resources, "filesystem", "import_reference_source", options.signal, "reference source");
			if (!result.ok) return {
				error: "Import failed",
				...result.error
			};
			return outlineDepth === undefined ? result.value : createHistoricalSourceSummary(result.value, outlineDepth);
		};
	})))();
}

//#endregion
export { init_utilityCommands, utilityCommands_exports };