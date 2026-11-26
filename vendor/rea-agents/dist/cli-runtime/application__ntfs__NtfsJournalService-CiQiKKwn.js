import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCancelledError, AnalysisInputError, AnalysisResourceConstraintError, ArtifactOperationError, cancelledBy, carriedReason, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_artifactOperationError, init_fixedAllowanceRemediation, primaryAnalysisError } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactReaderFailure, artifactFileCancellationCause, artifactFilePrimaryFacts, assertStableArtifactState, init_ArtifactFileOperation, init_ArtifactReader, init_RegularFile, init_StableArtifactFailure, init_readStableArtifact, init_resources, isSelectedRegularFileError, projectStableArtifactFailure, readStableArtifact, readerIntegrityFailure, stableArtifactInputRecovery } from "./resources-B3P64jvH.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { hasVerifiedMftRecordIdentity, init_ntfsMft, parseMftIndex, selectMftMetadata } from "./espFlashSelection-DrhknbQ_.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { NTFS_JOURNAL_FILE_BYTES, NTFS_JOURNAL_OPERATION, NTFS_JOURNAL_PROVIDER, init_ntfsJournalQuery, init_ntfsUsnJournal, ntfsJournalInputSchema, ntfsJournalResultSchema, readUsnJournal } from "./applicationToolContracts-BF58W5cg.js";

//#region dist/domain/windows/ntfsJournalCorrelation.js
var createUsnMftCorrelator;
function init_ntfsJournalCorrelation() {
	return (init_ntfsJournalCorrelation = __esmMin((() => {
		init_ntfsMft();
		createUsnMftCorrelator = (records) => {
			const byReference = new Map();
			for (const record of records) {
				if (record.baseRecordReference !== null || !hasVerifiedMftRecordIdentity(record)) continue;
				const reference = BigInt(record.sequenceNumber) << 48n | BigInt(record.index);
				byReference.set(reference, byReference.has(reference) ? null : {
					index: record.index,
					sequenceNumber: record.sequenceNumber,
					fileOffset: record.fileOffset
				});
			}
			const lookup = (reference) => {
				const record = byReference.get(reference);
				if (record === undefined) return { kind: "unresolved" };
				if (record === null) return { kind: "ambiguous" };
				return {
					kind: "matched",
					record
				};
			};
			return (entry) => entry.referenceBytes === 16 ? {
				file: { kind: "unresolved" },
				parent: { kind: "unresolved" }
			} : {
				file: lookup(entry.fileReference),
				parent: lookup(entry.parentReference)
			};
		};
	})))();
}

//#endregion
//#region dist/application/ntfs/NtfsJournalCache.js
var NtfsJournalCache, scopedCaches, ntfsJournalCacheFor;
function init_NtfsJournalCache() {
	return (init_NtfsJournalCache = __esmMin((() => {
		init_ntfsJournalCorrelation();
		NtfsJournalCache = class {
			#pair;
			#active = false;
			begin() {
				if (this.#active) return false;
				this.#active = true;
				return true;
			}
			end() {
				this.#active = false;
			}
			clear() {
				this.#pair = undefined;
			}
			select(mftPath, journalPath) {
				if (this.#pair?.mft.path !== mftPath || this.#pair.journal.path !== journalPath) this.clear();
				return this.#pair;
			}
			retain(mft, journal, image) {
				const pair = {
					mft,
					journal,
					image,
					correlate: createUsnMftCorrelator(image.records)
				};
				this.#pair = pair;
				return pair;
			}
		};
		scopedCaches = new WeakMap();
		ntfsJournalCacheFor = (resources) => {
			let cache = scopedCaches.get(resources);
			if (cache === undefined) {
				cache = new NtfsJournalCache();
				const owned = cache;
				resources.addCloseHook(async () => {
					owned.clear();
				});
				scopedCaches.set(resources, cache);
			}
			return cache;
		};
	})))();
}

//#endregion
//#region dist/domain/windows/ntfsJournalTimeline.js
var composeNtfsJournalTimeline;
function init_ntfsJournalTimeline() {
	return (init_ntfsJournalTimeline = __esmMin((() => {
		init_ntfsJournalCorrelation();
		init_ntfsUsnJournal();
		composeNtfsJournalTimeline = (mft, journal, window, correlate = createUsnMftCorrelator(mft.records)) => {
			const rows = [];
			let nextFileOffset = null;
			for (const result of readUsnJournal(journal, window.startFileOffset)) {
				const fileOffset = result.ok ? result.value.fileOffset : result.error.fileOffset;
				if (rows.length >= window.maxRows) {
					nextFileOffset = fileOffset;
					break;
				}
				if (!result.ok) {
					rows.push({
						kind: "coverage",
						issue: result.error
					});
					continue;
				}
				const entry = result.value;
				const { extentSample, ...fields } = entry;
				rows.push({
					kind: "event",
					event: {
						...fields,
						fileReference: entry.fileReference.toString(),
						parentReference: entry.parentReference.toString(),
						usn: entry.usn.toString(),
						timestampFileTime: entry.timestampFileTime?.toString() ?? null,
						...extentSample === undefined ? {} : { extentSample: extentSample.map((extent) => ({
							fileOffset: extent.fileOffset,
							offset: extent.offset.toString(),
							length: extent.length.toString()
						})) },
						mft: correlate(entry)
					}
				});
			}
			return {
				rows,
				historyCompleteness: "unknown",
				nextFileOffset,
				mftLimitations: mft.limitations
			};
		};
	})))();
}

//#endregion
//#region dist/application/ntfs/NtfsJournalService.js
var inputFailure, readFailure, readAcquisition, retainCompletedMft, inspectNtfsJournalEvidence, inspectAdmittedJournal;
function init_NtfsJournalService() {
	return (init_NtfsJournalService = __esmMin((() => {
		init_fixedAllowanceRemediation();
		init_NtfsJournalCache();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_RegularFile();
		init_evidence();
		init_result();
		init_ntfsJournalQuery();
		init_ntfsJournalTimeline();
		init_ntfsMft();
		init_AnalysisInput();
		init_ProviderOperationExecution();
		inputFailure = (parameter, message, cause) => new AnalysisInputError(NTFS_JOURNAL_OPERATION, {
			cause,
			...cause instanceof ArtifactReaderFailure ? stableArtifactInputRecovery(cause) : {}
		}, [{
			path: [parameter],
			reason: "invalid_format",
			message
		}]);
		readFailure = (failure, path, parameter) => {
			const { cause } = artifactFilePrimaryFacts(failure);
			if (cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "cancelled") return cancelledBy(NTFS_JOURNAL_OPERATION, carriedReason(artifactFileCancellationCause(cause)));
				if (cause.reason === "integrity") return readerIntegrityFailure(NTFS_JOURNAL_OPERATION, path, cause);
				if (cause.reason === "limit") return new AnalysisResourceConstraintError(NTFS_JOURNAL_OPERATION, "file-size", cause.message, { maximum_file_bytes: NTFS_JOURNAL_FILE_BYTES }, {
					cause,
					...fixedAllowanceOptions("The NTFS journal file allowance", "input", {
						limit: NTFS_JOURNAL_FILE_BYTES,
						unit: "bytes"
					})
				});
			}
			if (cause instanceof ArtifactReaderFailure && (cause.reason === "path" || cause.reason === "format")) return inputFailure(parameter, cause.message, cause);
			if (cause instanceof Error && "code" in cause) {
				if (cause.code === "EACCES" || cause.code === "EPERM") return new AnalysisAccessDeniedError(NTFS_JOURNAL_OPERATION, path, cause.code, { cause });
				if (isSelectedRegularFileError(cause)) return inputFailure(parameter, `Could not read the selected acquisition at ${path}`, cause);
			}
			return new ArtifactOperationError(NTFS_JOURNAL_OPERATION, "io", undefined, "NTFS acquisition read failed.", { cause });
		};
		readAcquisition = async (path, parameter, resources, signal, cached) => {
			try {
				if (cached !== undefined) {
					await assertStableArtifactState(path, cached.state, signal);
					return ok(cached);
				}
				let state;
				const snapshot = await readStableArtifact(path, NTFS_JOURNAL_FILE_BYTES, signal, undefined, resources, (observed) => {
					state = observed;
				});
				if (state === undefined) throw new ArtifactReaderFailure("unavailable", "NTFS acquisition source state was not retained");
				return ok({
					path,
					snapshot,
					state
				});
			} catch (cause) {
				return err(projectStableArtifactFailure(cause, readFailure(cause, path, parameter), path, NTFS_JOURNAL_PROVIDER.id, NTFS_JOURNAL_OPERATION, cached?.snapshot));
			}
		};
		retainCompletedMft = (input, mft, image, failure, metadata) => {
			const prior = failure.partialObservation ?? primaryAnalysisError(failure).partialObservation;
			const observation = createEvidence({
				path: input.mft_path,
				format: "ntfs-mft",
				sha256: mft.snapshot.sha256
			}, NTFS_JOURNAL_PROVIDER, {
				operation: NTFS_JOURNAL_OPERATION,
				predicateType: "rea.ntfs-journal-partial",
				parameters: input,
				result: {
					kind: "ntfs-journal-partial",
					mft: {
						path: input.mft_path,
						sha256: mft.snapshot.sha256,
						bytes: mft.snapshot.bytes.length,
						metadata
					},
					journal_observation: prior ?? null
				},
				confidence: "derived",
				limitations: [...image.limitations, "Journal acquisition did not complete."],
				locations: [{
					kind: "artifact-path",
					path: input.mft_path
				}]
			});
			let current = failure;
			while (current !== undefined) {
				if (current.partialObservation === prior || current.partialObservation === undefined) current.partialObservation = observation;
				current = current.cleanupPrimary;
			}
			return err(failure);
		};
		inspectNtfsJournalEvidence = async (rawInput, resources, signal) => {
			const admitted = parseAnalysisInput(NTFS_JOURNAL_OPERATION, rawInput, ntfsJournalInputSchema, signal);
			if (!admitted.ok) return admitted;
			const input = admitted.value;
			const cache = ntfsJournalCacheFor(resources);
			if (!cache.begin()) return err(new AnalysisResourceConstraintError(NTFS_JOURNAL_OPERATION, "capacity", "One NTFS inspection is already active in this scope; retry after it completes.", { maximum_concurrent_inspections: 1 }, {
				retryable: true,
				measuredExhaustion: true
			}));
			try {
				return await resources.run(() => inspectAdmittedJournal(input, resources, cache, signal));
			} catch (cause) {
				return err(projectStableArtifactFailure(cause, readFailure(cause, input.mft_path, "mft_path"), input.mft_path, NTFS_JOURNAL_PROVIDER.id, NTFS_JOURNAL_OPERATION));
			} finally {
				cache.end();
			}
		};
		inspectAdmittedJournal = async (input, resources, cache, signal) => {
			const retained = cache.select(input.mft_path, input.journal_path);
			const mft = await readAcquisition(input.mft_path, "mft_path", resources, signal, retained?.mft);
			if (!mft.ok) {
				if (!(mft.error instanceof AnalysisCancelledError)) cache.clear();
				return mft;
			}
			const parsed = retained === undefined ? parseMftIndex(mft.value.snapshot.bytes, 0, 0) : ok(retained.image);
			if (!parsed.ok) return err(inputFailure("mft_path", parsed.error.message).retainPartialObservation({
				kind: "file-snapshot-hash",
				path: input.mft_path,
				sha256: mft.value.snapshot.sha256,
				bytes: mft.value.snapshot.bytes.length
			}));
			const mftMetadata = selectMftMetadata(mft.value.snapshot.bytes, parsed.value, input.mft_record_start, input.mft_record_limit);
			const journal = await readAcquisition(input.journal_path, "journal_path", resources, signal, retained?.journal);
			if (!journal.ok) {
				if (!(journal.error instanceof AnalysisCancelledError)) cache.clear();
				return retainCompletedMft(input, mft.value, parsed.value, journal.error, mftMetadata);
			}
			const prepared = retained ?? cache.retain(mft.value, journal.value, parsed.value);
			const result = ntfsJournalResultSchema.parse({
				mftMetadata,
				mft: {
					path: input.mft_path,
					bytes: mft.value.snapshot.bytes.length,
					sha256: mft.value.snapshot.sha256
				},
				journal: {
					path: input.journal_path,
					bytes: journal.value.snapshot.bytes.length,
					sha256: journal.value.snapshot.sha256
				},
				...composeNtfsJournalTimeline(prepared.image, journal.value.snapshot.bytes, {
					startFileOffset: input.start_file_offset,
					maxRows: input.max_rows
				}, prepared.correlate)
			});
			return completeProviderEvidence(createEvidence({
				path: input.journal_path,
				format: "file",
				sha256: journal.value.snapshot.sha256
			}, NTFS_JOURNAL_PROVIDER, {
				operation: NTFS_JOURNAL_OPERATION,
				predicateType: "rea.ntfs-journal",
				parameters: input,
				result,
				confidence: "derived",
				limitations: [...result.mftLimitations, "Journal bytes alone do not establish the acquisition's historical completeness."],
				locations: [{
					kind: "artifact-path",
					path: input.mft_path
				}, {
					kind: "artifact-path",
					path: input.journal_path
				}]
			}), signal);
		};
	})))();
}

//#endregion
init_NtfsJournalService();
export { inspectNtfsJournalEvidence };