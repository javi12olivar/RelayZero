import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisInputError, cancelledBy, carriedReason, init_analysisErrorBase, init_analysisErrorCore, init_isRecord, init_sha256Hex, isAborted, isRecord, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { init_strictUtf8, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { ArtifactReaderFailure, ArtifactResourceScope, RegularFileCleanupFailure, ZIP_READER_OPTIONS, artifactPrimaryCleanupLeases, assertArtifactReadActive, bindArtifactFileCleanup, decodeZipEntryText, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedRegularFile, init_ZipArtifactReader, init_resources, regularFileCancellation, withOwnedRegularFile, zipEntryPath } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, ZIP64_END, ZIP64_LOCATOR, ZIP_CLASSIC_DIRECTORY_LIMITS, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError, init_zipEndOfCentralDirectory, readZip64DirectoryRecord, readZip64Locator, zip64EndUsesSingleVolume, zip64LocatorUsesSingleVolume, zipEndOfCentralDirectoryCandidates, zipEndUsesSingleVolume } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { createEvidence, describeValidationFailure, init_evidence, init_evidenceFormat, init_evidenceValidation, init_validationFailure, isUnsupportedEvidenceFormat, safeParseEvidence, unsupportedEvidenceFormatError } from "./nativeValueFlow-13oOEkkJ.js";
import { init_zipCentralHeader, readZipCentralExtent } from "./canonicalOrdering-C7Yzy62j.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_JsonFiles, readJsonFile } from "./JsonFiles-CvkLtuRa.js";
import { RegularFileCapacityError, init_readStableFileBytes, readStableFileBytes } from "./readStableFileBytes-DcvIhp5d.js";
import { DESKTOP_OPERATION, DESKTOP_PROVIDER, desktopOperationFailure, init_DesktopCaptureRefusals } from "./desktopCaptureCommands-MBIrn49f.js";
import { DESKTOP_VIEW_DEFAULTS, SQLITE_SIDECARS, applicationNames, desktopApplicationCaptureSchema, desktopViewPolicy, desktopViewPolicyInputSchema, init_desktopCapture, init_desktopStateDiff, init_desktopViewPolicy, init_stateFormats, init_stateRoles, isApplicationDconfGroup, isWithinAny, keyfileView, plainRecord, roleFacts, selectedHomePath, stateReasons, stateRole, textualView } from "./x11Windows-Cx5-JOUb.js";
import { DAMAGED_ZIP_ENTRY, UNREADABLE_ZIP, diffStateViews, init_gzipDocument, init_stateChanges, init_zipView, openStateDocument, unreadZipEntry, zipEntry, zipEntryRefusal, zipView } from "./stateChanges-DKaIbxqq.js";
import { ZIP_EXTRA_FIELD, init_zipExtraFields, lastZipExtraField } from "./zipExtraFields-D62NWuZt.js";
import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { crc32 } from "node:zlib";
import { Reader, Uint8ArrayWriter, ZipReader } from "@zip.js/zip.js";

//#region dist/domain/desktop/zipDirectory.js
var UTF8_NAME, UNIX_TYPE, UNIX_DIRECTORY, MSDOS_DIRECTORY, STRICT_UTF8, directoryEnd, unicodePath, endsInSlash, scanZipDirectory, boundedDirectoryTail;
function init_zipDirectory() {
	return (init_zipDirectory = __esmMin((() => {
		init_binaryContainer();
		init_zipEndOfCentralDirectory();
		init_strictUtf8();
		init_zipCentralHeader();
		init_zipExtraFields();
		UTF8_NAME = 2048;
		UNIX_TYPE = 61440;
		UNIX_DIRECTORY = 16384;
		MSDOS_DIRECTORY = 16;
		STRICT_UTF8 = strictUtf8Decoder("preserve");
		directoryEnd = (reader) => {
			const found = zipEndOfCentralDirectoryCandidates(reader.bytes).next();
			if (found.done === true) return undefined;
			const eocd = found.value;
			const end = eocd.offset;
			const { totalEntries, directorySize, directoryOffset } = eocd;
			const classic = zipEndUsesSingleVolume(eocd) && eocd.entriesOnDisk === totalEntries ? {
				end,
				size: directorySize,
				declaredOffset: directoryOffset,
				entries: BigInt(totalEntries)
			} : undefined;
			const locatorOffset = end - ZIP64_LOCATOR.bytes;
			const locator = readZip64Locator(reader, locatorOffset);
			if (locator === undefined) return classic;
			const declared = locator.recordOffset;
			const fallback = locatorOffset - ZIP64_END.fixedBytes;
			for (const at of [declared <= BigInt(fallback) ? Number(declared) : -1, fallback]) {
				const record = readZip64DirectoryRecord(reader, at, locatorOffset);
				if (!record.ok || record.value.end !== locatorOffset) continue;
				if (!zipEndUsesSingleVolume(eocd, "zip64Classic") || !zip64LocatorUsesSingleVolume(locator) || !zip64EndUsesSingleVolume(record.value) || record.value.entriesOnDisk !== record.value.totalEntries) return undefined;
				return {
					end: at,
					size: Number(record.value.directorySize),
					declaredOffset: Number(record.value.directoryOffset),
					entries: record.value.totalEntries
				};
			}
			const limits = ZIP_CLASSIC_DIRECTORY_LIMITS;
			const deferred = totalEntries === limits.count || directorySize === limits.size || directoryOffset === limits.offset;
			return deferred ? undefined : classic;
		};
		unicodePath = (reader, { name, extra, comment, flags }) => {
			const selected = lastZipExtraField(reader, extra, comment, ZIP_EXTRA_FIELD.unicodePath);
			if (!selected.ok) return null;
			if (selected.value === undefined) return undefined;
			const { start, end } = selected.value;
			const { bytes } = reader;
			return end - start >= 5 && bytes[start] === 1 && (flags & UTF8_NAME) === 0 && reader.u32(start + 1) === crc32(bytes.subarray(name, extra)) ? bytes.subarray(start + 5, end) : undefined;
		};
		endsInSlash = (reader, record) => {
			const unicode = record.comment > record.extra ? unicodePath(reader, record) : undefined;
			if (unicode === null) return undefined;
			const { bytes } = reader;
			const utf8 = unicode ?? ((record.flags & UTF8_NAME) === 0 ? undefined : bytes.subarray(record.name, record.extra));
			if (utf8 === undefined) return record.extra > record.name && bytes[record.extra - 1] === 47;
			try {
				return STRICT_UTF8.decode(utf8).endsWith("/");
			} catch {
				return undefined;
			}
		};
		scanZipDirectory = (bytes, keep) => {
			const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "zip");
			const located = directoryEnd(reader);
			if (located === undefined) return undefined;
			const start = located.end - located.size;
			if (start < 0) return undefined;
			const records = [];
			let count = 0;
			let seen = 0;
			for (let at = start; at < located.end;) {
				const extent = readZipCentralExtent(reader, at, located.end);
				if (!extent.ok) return undefined;
				const { name, extra, comment, next } = extent.value;
				const slash = endsInSlash(reader, {
					name,
					extra,
					comment,
					flags: reader.u16(at + 8)
				});
				if (slash === undefined) return undefined;
				const external = reader.u32(at + 38);
				const directory = slash || (external >>> 16 & UNIX_TYPE) === UNIX_DIRECTORY || reader.u16(at + 4) >> 8 === 0 && (external & MSDOS_DIRECTORY) !== 0;
				if (!directory) {
					count += 1;
					if (records.length < keep) records.push(bytes.subarray(at, next));
				}
				seen += 1;
				at = next;
			}
			if (BigInt(seen) !== located.entries) return undefined;
			return {
				start,
				declaredOffset: located.declaredOffset,
				records,
				count
			};
		};
		boundedDirectoryTail = (directory) => {
			const size = directory.records.reduce((total, record) => total + record.length, 0);
			const { count: maxCount, size: maxSize, offset: maxOffset } = ZIP_CLASSIC_DIRECTORY_LIMITS;
			const count = directory.records.length;
			const offset = directory.declaredOffset <= maxOffset ? directory.declaredOffset : directory.start;
			const wide = count >= maxCount || size >= maxSize || offset >= maxOffset;
			const wideBytes = wide ? ZIP64_END.fixedBytes + ZIP64_LOCATOR.bytes : 0;
			const tail = new Uint8Array(size + wideBytes + 22);
			let at = 0;
			for (const record of directory.records) {
				tail.set(record, at);
				at += record.length;
			}
			if (wide) {
				const record = new DataView(tail.buffer, size, ZIP64_END.fixedBytes);
				record.setUint32(0, ZIP64_END.signature, true);
				record.setBigUint64(ZIP64_END.sizeOffset, BigInt(ZIP64_END.fixedBytes - ZIP64_END.sizePrefixBytes), true);
				record.setUint16(12, 45, true);
				record.setUint16(14, 45, true);
				record.setBigUint64(ZIP64_END.entriesOnDiskOffset, BigInt(count), true);
				record.setBigUint64(ZIP64_END.totalEntriesOffset, BigInt(count), true);
				record.setBigUint64(ZIP64_END.directorySizeOffset, BigInt(size), true);
				record.setBigUint64(ZIP64_END.directoryOffset, BigInt(offset), true);
				const locator = new DataView(tail.buffer, size + ZIP64_END.fixedBytes, ZIP64_LOCATOR.bytes);
				locator.setUint32(0, ZIP64_LOCATOR.signature, true);
				locator.setBigUint64(ZIP64_LOCATOR.recordOffset, BigInt(offset) + BigInt(size), true);
				locator.setUint32(ZIP64_LOCATOR.totalDisksOffset, 1, true);
			}
			const end = new DataView(tail.buffer, size + wideBytes, 22);
			end.setUint32(0, 101010256, true);
			end.setUint16(8, Math.min(count, maxCount), true);
			end.setUint16(10, Math.min(count, maxCount), true);
			end.setUint32(12, Math.min(size, maxSize), true);
			end.setUint32(16, Math.min(offset, maxOffset), true);
			return tail;
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopZipView.js
var BoundedArchiveReader, readEntry, readZipView;
function init_DesktopZipView() {
	return (init_DesktopZipView = __esmMin((() => {
		init_desktopViewPolicy();
		init_resources();
		init_zipView();
		init_zipDirectory();
		init_result();
		BoundedArchiveReader = class extends Reader {
			#entries;
			#tail;
			constructor(entries, tail) {
				super(entries);
				this.#entries = entries;
				this.#tail = tail;
				this.size = entries.length + tail.length;
			}
			readUint8Array(index, length) {
				const end = Math.min(index + length, this.size);
				const split = this.#entries.length;
				const read = new Uint8Array(Math.max(0, end - index));
				if (index < split) read.set(this.#entries.subarray(index, Math.min(end, split)));
				if (end > split) read.set(this.#tail.subarray(Math.max(0, index - split), end - split), Math.max(0, split - index));
				return Promise.resolve(read);
			}
		};
		readEntry = async (entry, header, signal, policy) => {
			let bytes;
			try {
				bytes = await entry.getData(new Uint8ArrayWriter(), {
					checkSignature: true,
					...signal === undefined ? {} : { signal }
				});
			} catch {
				assertArtifactReadActive(signal);
				return unreadZipEntry(header, DAMAGED_ZIP_ENTRY);
			}
			return zipEntry(header, bytes, policy);
		};
		readZipView = async (bytes, signal, policy = DESKTOP_VIEW_DEFAULTS) => {
			const directory = scanZipDirectory(bytes, policy.zip_entries);
			if (directory === undefined) return err(UNREADABLE_ZIP);
			const reader = new ZipReader(new BoundedArchiveReader(bytes.subarray(0, directory.start), boundedDirectoryTail(directory)), ZIP_READER_OPTIONS);
			const entries = [];
			let spent = 0;
			try {
				for await (const entry of reader.getEntriesGenerator({ decodeText: decodeZipEntryText })) {
					assertArtifactReadActive(signal);
					if (entry.directory) continue;
					const name = zipEntryPath(entry);
					const header = {
						name,
						size: entry.uncompressedSize,
						compressedSize: entry.compressedSize,
						method: entry.compressionMethod,
						encrypted: entry.encrypted
					};
					const refusal = zipEntryRefusal(header, spent, policy);
					if (refusal === undefined) spent += header.size;
					entries.push(refusal === undefined ? await readEntry(entry, header, signal, policy) : unreadZipEntry(header, refusal));
				}
			} catch {
				assertArtifactReadActive(signal);
				return err(UNREADABLE_ZIP);
			} finally {
				await reader.close();
			}
			return ok(zipView(entries, directory.count));
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopRetainedContent.js
var MIB, DEFAULT_MAX_BYTES, RetainedContent, withRetainedContent;
function init_DesktopRetainedContent() {
	return (init_DesktopRetainedContent = __esmMin((() => {
		init_desktopViewPolicy();
		init_resources();
		init_result();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_OwnedRegularFile();
		init_readStableFileBytes();
		init_sha256Hex();
		MIB = 1024 * 1024;
		DEFAULT_MAX_BYTES = DESKTOP_VIEW_DEFAULTS.file_bytes;
		RetainedContent = class {
			folder;
			maxBytes;
			#unclosed = [];
			constructor(folder, maxBytes = DEFAULT_MAX_BYTES) {
				this.folder = folder;
				this.maxBytes = maxBytes;
			}
			/**
			* The bytes stored under a digest, or why they cannot be used, worded to
			* follow the name of what was read.
			*/
			async read(sha256, signal) {
				const path = join(this.folder, "content", sha256);
				const options = {
					symlinks: "reject",
					retainFailedClose: (owner) => {
						this.#unclosed.push({
							path,
							owner
						});
					},
					...signal === undefined ? {} : { signal }
				};
				let bytes;
				try {
					bytes = await withOwnedRegularFile(path, options, ({ handle }) => readStableFileBytes(handle, path, this.maxBytes, options));
				} catch (cause) {
					const cancellation = regularFileCancellation(cause);
					if (cancellation !== undefined) throw new ArtifactReaderFailure("cancelled", "Retained content read cancelled", {
						cause: cancellation.reason,
						cancellation
					});
					const outcome = cause instanceof RegularFileCleanupFailure ? cause.outcome : undefined;
					if (outcome?.kind === "completed" && Buffer.isBuffer(outcome.value)) bytes = outcome.value;
					else if ((outcome?.kind === "failed" ? outcome.cause : cause) instanceof RegularFileCapacityError) return err(`is larger than the ${String(this.maxBytes / MIB)} MiB read limit`);
					else if (cause instanceof Error) return err("is missing or unreadable");
					else throw cause;
				}
				return sha256Hex(bytes) === sha256 ? ok(bytes) : err("does not match its digest");
			}
			/** Close every kept handle; each close that fails again keeps its owner. */
			async release(resources) {
				const failures = [];
				for (const { path, owner } of this.#unclosed.splice(0)) {
					const attempt = await resources.release({
						kind: "file-handle",
						resource: path,
						handle: owner
					});
					if (attempt.kind === "failed") failures.push(attempt);
				}
				return failures;
			}
		};
		withRetainedContent = async (folder, run, maxBytes) => {
			const content = new RetainedContent(folder, maxBytes);
			let outcome;
			try {
				outcome = {
					kind: "completed",
					value: await run(content)
				};
			} catch (cause) {
				outcome = {
					kind: "failed",
					cause
				};
			}
			const resources = new ArtifactResourceScope();
			const [first, ...rest] = await content.release(resources);
			if (first !== undefined) {
				const failures = [first, ...rest];
				if (outcome.kind === "failed" && outcome.cause instanceof ProviderCleanupError) {
					const fileFailure = resources.cleanupFailure({ kind: "completed" }, failures);
					const fileCleanup = new ProviderCleanupError("rea-desktop", fileFailure.cleanup?.resources ?? [], { reason: fileFailure.cleanup?.reason ?? fileFailure.message }, {
						operation: outcome.cause.operation,
						cause: fileFailure
					});
					bindArtifactFileCleanup(fileFailure, fileCleanup);
					throw analysisErrorWithCleanupDependencies(outcome.cause, fileCleanup, outcome.cause.operation);
				}
				throw resources.cleanupFailure(outcome, failures);
			}
			if (outcome.kind === "failed") throw outcome.cause;
			return outcome.value;
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopStateVersions.js
var selectStateEnds, indexState, digestsAt, baselinePresence, presenceAt, observedFileAt, pathVersions, statePaths;
function init_DesktopStateVersions() {
	return (init_DesktopStateVersions = __esmMin((() => {
		init_analysisErrorCore();
		init_desktopStateDiff();
		init_stateFormats();
		selectStateEnds = (checkpoints, selection, operation) => {
			const refuse = (field, userMessage) => new AnalysisInputError(operation, {
				userMessage,
				remediationAction: "Name a checkpoint inspect-desktop-application-state lists, with the end at or after the seed.",
				conformsToInputContract: true
			}, [{
				path: [field],
				reason: "invalid_value",
				message: userMessage
			}]);
			const position = (field, name, fallback) => {
				if (name === undefined) return fallback;
				const found = checkpoints.flatMap((candidate, index) => candidate === name ? [index] : []);
				if (found.length === 1) return found[0] ?? fallback;
				const count = found.length === 0 ? "no checkpoint" : `${String(found.length)} checkpoints`;
				throw refuse(field, `The capture has ${count} named ${JSON.stringify(name)}; its checkpoints are ${checkpoints.join(", ")}.`);
			};
			const seed = position("seed_checkpoint", selection.seed, 0);
			const end = position("end_checkpoint", selection.end, checkpoints.length - 1);
			if (end < seed) throw refuse("end_checkpoint", `The end checkpoint ${checkpoints[end] ?? ""} was taken before the seed checkpoint ${checkpoints[seed] ?? ""}.`);
			return {
				seed,
				end
			};
		};
		indexState = (capture) => {
			const changes = new Map();
			capture.state.checkpoints.forEach((checkpoint, position) => {
				for (const change of checkpoint.changes) {
					const entries = changes.get(change.path) ?? [];
					entries.push({
						index: position,
						change
					});
					changes.set(change.path, entries);
				}
			});
			const first = capture.state.checkpoints[0];
			const complete = first !== undefined && !first.truncated && first.unreadable_directories === 0 && first.unchecked_paths === 0 && capture.state.excluded !== undefined;
			return {
				changes,
				baseline: new Map((first?.retained ?? []).map((file) => [file.path, file.sha256])),
				baselineNonFiles: new Map(capture.state.baseline_non_files.map(({ path, type }) => [path, type])),
				omitted: new Set(capture.state.omitted_content.map((entry) => entry.path)),
				contentRoots: complete ? capture.state.content_roots : [],
				excluded: capture.state.excluded ?? [],
				checkpoints: capture.state.checkpoints.length,
				incomplete: capture.state.checkpoints.map((checkpoint) => checkpoint.truncated || checkpoint.unreadable_directories > 0 || checkpoint.unchecked_paths !== 0 || checkpoint.unconfirmed_changes > 0)
			};
		};
		digestsAt = (path, index) => {
			const digests = [index.baseline.get(path) ?? null];
			const byIndex = new Map((index.changes.get(path) ?? []).map((entry) => [entry.index, entry.change]));
			for (let position = 1; position < index.checkpoints; position += 1) {
				const change = byIndex.get(position);
				digests.push(change === undefined ? digests[position - 1] ?? null : change.after?.type === "file" ? change.after.sha256 ?? null : null);
			}
			return digests;
		};
		baselinePresence = (path, first, index) => {
			if (index.baseline.has(path)) return true;
			if (first !== undefined) return first.before?.type === "file";
			if (index.omitted.has(path)) return true;
			return isWithinAny(path, index.contentRoots) && !isWithinAny(path, index.excluded) ? false : null;
		};
		presenceAt = (path, index) => {
			const own = index.changes.get(path) ?? [];
			const byIndex = new Map(own.map((entry) => [entry.index, entry.change]));
			const presence = [baselinePresence(path, own[0]?.change, index)];
			for (let position = 1; position < index.checkpoints; position += 1) {
				const change = byIndex.get(position);
				presence.push(change === undefined ? presence[position - 1] ?? null : change.after?.type === "file");
			}
			return presence;
		};
		observedFileAt = (path, position, index) => {
			const changes = index.changes.get(path) ?? [];
			const first = changes[0];
			const baselineChange = first !== undefined && !index.incomplete.slice(0, first.index).some(Boolean) ? first.change : undefined;
			const hasNonFile = (candidate) => {
				let current = candidate;
				while (true) {
					const type = index.baselineNonFiles.get(current);
					if (type !== undefined && (current === candidate || type !== "directory")) return true;
					const parent = current.slice(0, Math.max(1, current.lastIndexOf("/")));
					if (parent === current) return false;
					current = parent;
				}
			};
			let present = hasNonFile(path) ? null : baselineChange?.before !== undefined && baselineChange.before !== null && baselineChange.before.type !== "file" ? null : baselinePresence(path, baselineChange, index);
			let sha256 = index.baseline.get(path) ?? null;
			const byIndex = new Map(changes.map((entry) => [entry.index, entry.change]));
			for (let checkpoint = 1; checkpoint <= position; checkpoint += 1) {
				if (index.incomplete[checkpoint]) {
					present = null;
					sha256 = null;
				}
				const change = byIndex.get(checkpoint);
				if (change !== undefined) {
					present = change.after === null ? false : change.after.type === "file" ? true : null;
					sha256 = present ? change.after?.sha256 ?? null : null;
				}
			}
			return {
				present,
				sha256
			};
		};
		pathVersions = (capture, path, index) => {
			const checkpoints = capture.state.checkpoints;
			const presence = presenceAt(path, index);
			const digests = digestsAt(path, index);
			const positions = [...new Set([path, ...SQLITE_SIDECARS.map(({ suffix }) => `${path}${suffix}`)].flatMap((name) => (index.changes.get(name) ?? []).map((entry) => entry.index)))].filter((position) => position > 0).sort((left, right) => left - right);
			const versions = [];
			for (const position of [0, ...positions]) {
				const present = presence[position] === true;
				if (!present && versions.at(-1)?.present === false) continue;
				versions.push({
					checkpoint_index: position,
					checkpoint: checkpoints[position]?.name ?? (position === 0 ? "baseline" : String(position)),
					present,
					sha256: present ? digests[position] ?? null : null,
					format: null,
					view: null,
					view_error: null
				});
			}
			return versions;
		};
		statePaths = (index) => {
			const paths = new Set(index.baseline.keys());
			for (const [path, entries] of index.changes) if (entries.some(({ change }) => change.before?.type === "file" || change.after?.type === "file")) paths.add(path);
			return [...paths].sort();
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopApplicationState.js
var DesktopApplicationState_exports = /* @__PURE__ */ __exportAll({ inspectDesktopApplicationState: () => inspectDesktopApplicationState });
var OPERATION, inputError, readDesktopCapture, dconfGroups, withStaged, failed, dconfViewFailure, sidecarBytes, sqliteView, dconfView, outcomeOf, viewOf, EMPTY_CHANGE, changeBetween, readVersion, hasDconfGroups, describePath, stateLimitations, inspectState, inspectDesktopApplicationState;
function init_DesktopApplicationState() {
	return (init_DesktopApplicationState = __esmMin((() => {
		init_targetIdentity();
		init_desktopViewPolicy();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_analysisErrorCleanup();
		init_inputIssueProjection();
		init_desktopCapture();
		init_gzipDocument();
		init_stateChanges();
		init_stateFormats();
		init_stateRoles();
		init_evidence();
		init_evidenceValidation();
		init_evidenceFormat();
		init_result();
		init_validationFailure();
		init_PrivateRuntimeRoot();
		init_JsonFiles();
		init_DesktopZipView();
		init_DesktopRetainedContent();
		init_DesktopStateVersions();
		init_DesktopCaptureRefusals();
		OPERATION = "inspect_desktop_application_state";
		inputError = (userMessage, remediationAction) => new AnalysisInputError(OPERATION, {
			userMessage,
			remediationAction
		}, [{
			path: ["capture"],
			reason: "invalid_value",
			message: userMessage
		}]);
		readDesktopCapture = async (folder, signal) => {
			const resources = new ArtifactResourceScope();
			const outcome = await resources.run(async () => {
				const loaded = await readJsonFile(join(folder, "capture.json"), signal, resources, OPERATION);
				if (!loaded.ok) {
					if (loaded.error instanceof AnalysisError) throw loaded.error;
					throw inputError(`${join(folder, "capture.json")} could not be read as JSON.`, "Pass a folder written by capture-desktop-application.");
				}
				const evidence = safeParseEvidence(loaded.value);
				if (!evidence.ok && isUnsupportedEvidenceFormat(evidence.error)) throw unsupportedEvidenceFormatError(evidence.error);
				if (!evidence.ok || evidence.value.operation !== "capture_desktop_application" || evidence.value.predicate_type !== "rea.desktop-application-capture" || evidence.value.provider.id !== DESKTOP_PROVIDER.id || evidence.value.provider.version !== DESKTOP_PROVIDER.version) throw inputError("capture.json is not desktop application capture Evidence.", "Pass a folder written by capture-desktop-application.");
				const capture = desktopApplicationCaptureSchema.safeParse(evidence.value.normalized_result);
				if (!capture.success) throw inputError(`The capture result is malformed (${describeValidationFailure(capture.error)}).`, "Capture the application again.");
				return {
					evidence: evidence.value,
					capture: capture.data
				};
			}).then(ok, (cause) => err(cause));
			try {
				await resources.close();
			} catch (cause) {
				const cleanup = desktopOperationFailure(cause, signal, OPERATION, "Desktop capture input");
				if (outcome.ok && !isAborted(signal)) throw cleanup.retainPartialObservation(outcome.value.evidence);
				const primary = outcome.ok ? cancelledBy(OPERATION, carriedReason(signal?.reason)).retainPartialObservation(outcome.value.evidence) : desktopOperationFailure(outcome.error, undefined, OPERATION, "Desktop capture input");
				if (!outcome.ok && signal?.aborted) analysisErrorWithCancellation(primary, cancelledBy(OPERATION, signal));
				throw analysisErrorWithCleanupDependencies(primary, cleanup, OPERATION);
			}
			if (!outcome.ok) {
				if (!signal?.aborted) throw outcome.error;
				throw analysisErrorWithCancellation(desktopOperationFailure(outcome.error, undefined, OPERATION, "Desktop capture input"), cancelledBy(OPERATION, signal));
			}
			if (signal?.aborted) throw cancelledBy(OPERATION, signal).retainPartialObservation(outcome.value.evidence);
			return outcome.value;
		};
		dconfGroups = (text, names) => {
			const groups = keyfileView(text);
			const application = plainRecord();
			const others = [];
			for (const [group, keys] of Object.entries(groups)) if (isApplicationDconfGroup(group, names)) application[group] = keys;
			else others.push(group);
			return {
				groups: application,
				other_groups: others
			};
		};
		withStaged = async (files, read, resources = new ArtifactResourceScope()) => {
			const root = await PrivateRuntimeRoot.create({ prefix: "rea-desktop-state-" });
			let outcome;
			try {
				const paths = [];
				for (const file of files) {
					const path = join(root.path, file.name);
					await writeFile(path, file.bytes, {
						mode: 384,
						flag: "wx"
					});
					paths.push(path);
				}
				outcome = {
					kind: "completed",
					value: await read(paths)
				};
			} catch (cause) {
				outcome = {
					kind: "failed",
					cause
				};
			}
			const leases = outcome.kind === "failed" ? artifactPrimaryCleanupLeases(outcome.cause) : [];
			const removed = await resources.release({
				kind: "private-runtime-root",
				resource: root.path,
				root: {
					path: root.path,
					close: async () => {
						for (const lease of leases ?? []) await lease.release();
						await root.close();
					}
				}
			});
			if (removed.kind === "failed") throw resources.cleanupFailure(outcome, [removed]);
			if (outcome.kind === "failed") throw outcome.cause;
			return outcome.value;
		};
		failed = (error) => ({
			view: null,
			error,
			failure: null
		});
		dconfViewFailure = (dump) => ({
			kind: dump.kind,
			code: dump.code,
			exit_code: dump.exitCode,
			command: dump.command,
			stderr: dump.stderr
		});
		sidecarBytes = async ({ path, version }, sidecar, context) => {
			const { present, sha256 } = observedFileAt(`${path}${sidecar.suffix}`, version.checkpoint_index, context.index);
			if (present === null) return err(`the capture did not record whether the database's ${sidecar.label} existed`);
			if (present && sha256 === null) return err(`the database's ${sidecar.label} was not retained`);
			if (sha256 === null) return ok(undefined);
			const bytes = await context.content.read(sha256, context.signal);
			return bytes.ok ? ok(bytes.value) : err(`the database's ${sidecar.label} ${bytes.error}`);
		};
		sqliteView = async (input, context) => {
			const database = observedFileAt(input.path, input.version.checkpoint_index, context.index);
			if (database.present !== true || database.sha256 !== input.version.sha256) return failed("the capture did not confirm the database's retained version at this checkpoint");
			const staged = [{
				name: "state.db",
				bytes: input.bytes
			}];
			for (const sidecar of SQLITE_SIDECARS) {
				const bytes = await sidecarBytes(input, sidecar, context);
				if (!bytes.ok) return failed(bytes.error);
				if (bytes.value !== undefined) staged.push({
					name: `state.db${sidecar.suffix}`,
					bytes: bytes.value
				});
			}
			return withStaged(staged, async ([database]) => {
				const read = await context.readers.sqlite(database ?? "", context.signal, context.policy);
				return read.ok ? {
					view: read.view,
					error: null
				} : failed(read.error);
			}, context.readers.resources);
		};
		dconfView = async ({ bytes }, context) => withStaged([{
			name: "user",
			bytes
		}], async ([database]) => {
			const dump = await context.readers.dconf(database ?? "", context.signal);
			return dump.ok ? {
				view: dconfGroups(dump.text, context.names),
				error: null
			} : {
				view: null,
				error: dump.error,
				failure: dconfViewFailure(dump)
			};
		}, context.readers.resources);
		outcomeOf = (read) => read.ok ? {
			view: read.value,
			error: null
		} : failed(read.error);
		viewOf = async (input, context) => {
			const format = input.version.format ?? "binary";
			switch (format) {
				case "text":
				case "json":
				case "keyfile":
				case "xml": return outcomeOf(textualView(format, input.bytes, context.policy));
				case "zip": return outcomeOf(await readZipView(input.bytes, context.signal, context.policy));
				case "dconf": return dconfView(input, context);
				case "sqlite": return sqliteView(input, context);
				case "binary": return {
					view: null,
					error: null
				};
			}
		};
		EMPTY_CHANGE = {
			added: [],
			removed: [],
			changed: [],
			added_count: 0,
			removed_count: 0,
			changed_count: 0,
			complete: true
		};
		changeBetween = (before, after) => {
			const ends = {
				from_index: before.checkpoint_index,
				to_index: after.checkpoint_index,
				from: before.checkpoint,
				to: after.checkpoint
			};
			if (!before.present) return {
				...ends,
				kind: "created",
				...EMPTY_CHANGE
			};
			if (!after.present) return {
				...ends,
				kind: "deleted",
				...EMPTY_CHANGE
			};
			if (before.view_error !== null || after.view_error !== null || before.format === null || after.format === null) return {
				...ends,
				kind: "unreadable",
				...EMPTY_CHANGE
			};
			if (before.format !== after.format) return {
				...ends,
				kind: "format",
				...EMPTY_CHANGE
			};
			if (before.format === "binary") return {
				...ends,
				kind: "content",
				...EMPTY_CHANGE
			};
			const difference = diffStateViews(before.format, before.view, after.view);
			return {
				...ends,
				...difference,
				added: [...difference.added],
				removed: [...difference.removed],
				changed: [...difference.changed]
			};
		};
		readVersion = async (version, path, context) => {
			if (context.signal?.aborted === true) throw cancelledBy(OPERATION, context.signal);
			if (!version.present) return;
			if (version.sha256 === null) {
				version.view_error = "content not retained";
				return;
			}
			const bytes = await context.content.read(version.sha256, context.signal);
			if (!bytes.ok) {
				version.view_error = `retained content ${bytes.error}`;
				return;
			}
			const document = openStateDocument(path, bytes.value, context.policy);
			version.format = document.format;
			if (document.compression !== undefined) version.compression = document.compression;
			const outcome = "error" in document ? failed(document.error) : await viewOf({
				path,
				bytes: document.bytes,
				version
			}, context);
			version.view = outcome.view;
			version.view_error = outcome.error;
			if (outcome.error !== null && outcome.failure !== null) version.view_failure = outcome.failure;
		};
		hasDconfGroups = (version) => {
			const view = version.view;
			return version.format === "dconf" && isRecord(view) && typeof view.groups === "object" && view.groups !== null && Object.keys(view.groups).length > 0;
		};
		describePath = async (capture, path, facts, context) => {
			const versions = pathVersions(capture, path, context.index);
			for (const version of versions) await readVersion(version, path, context);
			const reasons = [...stateReasons(facts, path, (context.index.changes.get(path) ?? []).map((entry) => entry.change), versions.some(hasDconfGroups))];
			const home = capture.host.home;
			const role = stateRole(reasons, selectedHomePath(facts, path));
			return {
				path,
				home_path: path.startsWith(`${home}/`) ? path.slice(home.length + 1) : null,
				role: facts.sqliteSidecars?.has(path) === true && role === "unrelated" ? "application_state" : role,
				reasons,
				format: versions.findLast((version) => version.format !== null)?.format ?? null,
				versions,
				changes: versions.slice(1).map((version, index) => changeBetween(versions[index] ?? version, version))
			};
		};
		stateLimitations = (policy) => [
			"Roles are inferred from state directories, open files, window titles, selected paths and dconf key names; a path can be misattributed.",
			"Views cover retained content only; a file that existed before the capture but outside the content roots has no starting view.",
			`SQLite views list at most ${String(policy.sqlite_rows)} rows of ${String(policy.sqlite_tables)} ordinary tables, text views ${String(policy.text_lines)} lines and XML views ${String(policy.xml_nodes)} nodes; changes between truncated views, or views with an unread table, are marked incomplete. Increase the corresponding --view-policy budget and retry the same capture; no restart is needed.`,
			`Each projected SQLite table view is bounded at sqlite_view_bytes=${String(policy.sqlite_view_bytes)} UTF-8 JSON bytes. A refused table keeps its error; other tables remain readable. Raise sqlite_view_bytes in --view-policy on the next call for that refusal. The separate SQLite worker reply and value/record limits may refuse earlier and are not raised by view policy.`,
			`JSON and key file views read files of at most ${String(policy.parsed_bytes)} bytes and JSON nested at most ${String(policy.json_depth)} levels; only numbers JavaScript holds exactly are admitted. Increase parsed_bytes or json_depth in --view-policy for a budget refusal; byte budgets do not change numeric exactness or Evidence nesting.`,
			"dconf views keep only groups whose path names the application.",
			`Zip views list at most ${String(policy.zip_entries)} entries and read an entry only when unencrypted, stored or deflated, at most ${String(policy.zip_entry_bytes)} bytes and ${String(policy.zip_ratio)} times its compressed size, up to ${String(policy.zip_bytes)} bytes per archive. Increase the corresponding --view-policy budget for a resource refusal; databases and archives inside an archive are not read.`,
			`A gzip file's view is its document's, read only when it is at most ${String(policy.zip_entry_bytes)} bytes and at most ${String(policy.zip_ratio)} times the file's size; a database inside one is not read, nor a gzip file inside an archive.`
		];
		inspectState = async (folder, readers, signal, options) => {
			const policy = desktopViewPolicy(options.viewPolicy);
			const { evidence, capture } = await readDesktopCapture(folder, signal);
			const names = applicationNames(capture);
			const facts = roleFacts(capture);
			const index = indexState(capture);
			const candidates = statePaths(index);
			for (const selected of options.paths ?? []) if (!candidates.includes(selected)) throw new AnalysisInputError(OPERATION, {
				userMessage: `Captured path ${JSON.stringify(selected)} was not found.`,
				remediationAction: "Use an exact path from this capture's state view; no current filesystem path is substituted."
			}, [{
				path: ["paths"],
				reason: "invalid_value"
			}]);
			const paths = await withRetainedContent(folder, async (content) => {
				const context = {
					content,
					readers,
					names,
					signal,
					index,
					policy
				};
				const described = [];
				for (const path of candidates) if (options.paths === undefined || options.paths.includes(path)) described.push(await describePath(capture, path, facts, context));
				return described;
			}, policy.file_bytes);
			const limitations = [...stateLimitations(policy), ...capture.state.state_directories === undefined ? ["The capture does not record its state directories as walked, so files in a symlinked state directory may be classed as documents."] : []];
			const result = {
				effective_view_policy: policy,
				capture: {
					evidence_id: evidence.evidence_id,
					home: capture.host.home,
					checkpoints: capture.state.checkpoints.map((checkpoint) => checkpoint.name),
					limitations: capture.limitations,
					omitted_content: capture.state.omitted_content
				},
				application_names: [...names],
				paths,
				limitations
			};
			if (signal?.aborted === true) throw cancelledBy(OPERATION, signal);
			return createEvidence(unknownTarget("not-observed"), DESKTOP_PROVIDER, {
				predicateType: "rea.desktop-application-state",
				operation: OPERATION,
				parameters: {
					capture_evidence_id: evidence.evidence_id,
					...options.viewPolicy === undefined ? {} : { view_policy: { ...options.viewPolicy } },
					...options.paths === undefined ? {} : { paths: [...options.paths] }
				},
				result,
				confidence: "inferred",
				authority: "analyst-inference",
				limitations: [...limitations, ...capture.limitations]
			});
		};
		inspectDesktopApplicationState = async (folder, readers, signal, options = {}) => {
			try {
				const admitted = desktopViewPolicyInputSchema.safeParse(options.viewPolicy === undefined ? {} : options.viewPolicy);
				if (!admitted.success) return analysisInputErrorFromIssues(OPERATION, admitted.error.issues, options.viewPolicy);
				return await inspectState(folder, readers, signal, {
					...options,
					...options.viewPolicy === undefined ? {} : { viewPolicy: admitted.data }
				});
			} catch (cause) {
				return desktopOperationFailure(cause, signal, OPERATION, "Desktop state view");
			}
		};
	})))();
}

//#endregion
export { DesktopApplicationState_exports, init_DesktopApplicationState, init_DesktopRetainedContent, init_DesktopStateVersions, init_DesktopZipView, inspectDesktopApplicationState, readDesktopCapture, readZipView, selectStateEnds, withRetainedContent };