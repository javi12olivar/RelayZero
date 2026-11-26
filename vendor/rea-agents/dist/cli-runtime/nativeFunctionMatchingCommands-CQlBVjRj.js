import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisInputError, AnalysisResourceConstraintError, EvidenceIntegrityError, EvidenceReferenceError, analysisSettingLimit, cancelledBy, init_analysisErrorBase, init_analysisErrorCore, init_analysisSettingDefinitions, init_evidenceErrors, init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_internalInvariant, invariantViolation } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection, projectInputIssues } from "./inputIssueProjection-W-zXU1iH.js";
import { ArtifactResourceScope, RegularFileCleanupFailure, init_ArtifactResourceScope, init_OwnedRegularFile, init_resources } from "./resources-B3P64jvH.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { DEFAULT_NATIVE_MATCHING_ALLOWANCE, init_nativeMatchingAllowance, nativeMatchingAllowanceRecovery, nativeMatchingByteAllowance, parseNativeMatchingAllowance } from "./nativeMatchingAllowance-BFZWHqdM.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { ANALYSIS_EVIDENCE_PREDICATE, createEvidence, evidenceFileTarget, evidenceInputSchema, init_evidence, init_evidenceReference, init_evidenceValidation, init_nativeAddress, isImmutableEvidence, nativeAddressInputSchema, readEvidence, readEvidencePayload, readImmutableEvidence, retainedEvidenceReferenceSchema } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { admittedContractInput, cliEvidenceDeliveryInputError, contractNamed, init_analysisEvidenceDelivery, init_contractCliDescription, init_contractCommand, publishCliAnalysisEvidence, registerContractDocumentCommand } from "./contractCommand-Di2ugplH.js";
import { init_EvidenceBundleFiles, init_EvidenceInputResolver, readImmutableEvidenceBundle, resolveEvidenceInput } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { init_nativeOperationFacts, listNamesFact, listProceduresFact } from "./nativeValueTrace-B4vmCxtN.js";
import { addressCoordinate, availableFunctionBodySchema, functionBodyEntryAgrees, functionDossierSchema, hasStableNativeSymbol, init_addressCoordinate, init_functionBody, init_functionDossier, init_nativeFactAvailability, init_nativeSymbol, init_procedureInfo, nativeSymbolOrigin, procedureInfoSchema, unavailableNativeFactSchema } from "./functionDossier-Cff5XWxr.js";
import { NATIVE_FUNCTION_MATCHING_PREDICATE, init_functionMatching, nativeFunctionByteSourceGuidance, nativeFunctionMatchingSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { FUNCTION_COMPARISON_PROVIDER, SESSION_TOOL_CONTRACTS, assessFunctionCallCoverage, init_comparisonEvidenceIdentity, init_functionCallCoverage, init_functionComparisonNormalization, init_functionMatchingContracts, init_nativeByteRead, init_sessionToolContracts, matchNativeFunctionsInputSchema, nativeByteReadSchema, normalizeCfg } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";
import { createHash } from "node:crypto";
import { setImmediate } from "node:timers/promises";

//#region dist/application/native/NativeMatchingAdmission.js
var NativeMatchingAdmission;
function init_NativeMatchingAdmission() {
	return (init_NativeMatchingAdmission = __esmMin((() => {
		init_budget();
		init_analysisErrorCore();
		init_analysisSettingDefinitions();
		init_nativeMatchingAllowance();
		NativeMatchingAdmission = class {
			operation;
			signal;
			#maximum;
			#source;
			#bytes;
			#work = 0;
			#seen = new WeakSet();
			constructor(operation, signal, allowance = DEFAULT_NATIVE_MATCHING_ALLOWANCE) {
				this.operation = operation;
				this.signal = signal;
				this.#maximum = allowance.maximumBytes;
				this.#source = allowance.source;
				this.#bytes = new Budget(this.#maximum);
			}
			checkpoint = async (bytes = 0) => {
				this.#bytes.charge(bytes, () => this.#exhausted());
				this.signal?.throwIfAborted();
				if (++this.#work % 256 === 0) await setImmediate(undefined, this.signal === undefined ? {} : { signal: this.signal });
			};
			#exhausted() {
				return new AnalysisResourceConstraintError(this.operation, "capacity", `Native function matching exceeds its ${nativeMatchingByteAllowance(this.#maximum)} representation allowance (native.matching_representation_bytes).`, { maximum_bytes: this.#maximum }, {
					retryable: false,
					remediationAction: nativeMatchingAllowanceRecovery({
						maximumBytes: this.#maximum,
						source: this.#source
					}),
					limit: analysisSettingLimit("native.matching_representation_bytes", this.#maximum, this.#source)
				});
			}
			/**
			* Charge a borrowed record's envelope, which matching copies into its
			* limitations, digests and links. Its result payloads stay resident: the
			* caller charges what matching derives from them, or never parses them.
			*/
			async admitBorrowed(record) {
				await this.checkpoint(128);
				for (const [key, value] of Object.entries(record)) if (key !== "raw_result" && key !== "normalized_result") await this.admit(value);
			}
			async admit(root) {
				const pending = [[root][Symbol.iterator]()];
				while (pending.length) {
					const next = pending[pending.length - 1].next();
					if (next.done) {
						pending.pop();
						continue;
					}
					const value = next.value;
					if (typeof value === "object" && value !== null) {
						if (this.#seen.has(value)) continue;
						this.#seen.add(value);
						await this.checkpoint(128);
						pending.push((function* () {
							for (const key in value) if (Object.hasOwn(value, key)) {
								yield key;
								yield value[key];
							}
						})());
					} else await this.checkpoint(typeof value === "string" ? 64 + value.length * 4 : 128);
				}
			}
		};
	})))();
}

//#endregion
//#region dist/application/native/NativeMatchingInputError.js
var nativeMatchingInputError;
function init_NativeMatchingInputError() {
	return (init_NativeMatchingInputError = __esmMin((() => {
		init_evidenceReference();
		init_analysisErrorCore();
		init_evidenceErrors();
		init_inputIssueProjection();
		nativeMatchingInputError = (input, path, operation, failure) => {
			const shape = evidenceInputSchema.safeParse(input);
			if (shape.success) return failure;
			return new AnalysisInputError(operation, { cause: failure }, projectInputIssues(shape.error.issues, input).map((issue) => ({
				...issue,
				path: [...path, ...issue.path]
			})));
		};
	})))();
}

//#endregion
//#region dist/application/native/NativeMatchingBundleSources.js
var reference, ownId, recordSnapshot, loadNativeMatchingBundleSources;
function init_NativeMatchingBundleSources() {
	return (init_NativeMatchingBundleSources = __esmMin((() => {
		init_evidenceValidation();
		init_evidenceErrors();
		init_canonicalDigest();
		init_evidenceReference();
		init_EvidenceBundleFiles();
		init_NativeMatchingInputError();
		reference = (evidence_id) => ({
			kind: "retained-evidence",
			evidence_id
		});
		ownId = (value) => Buffer.from(value, "ascii").toString("ascii");
		recordSnapshot = async (bundle, admission) => {
			const hash = createHash("sha256");
			for (const record of bundle.records) {
				await admission.checkpoint();
				hash.update(record.evidence_id).update(digestCanonicalValue(record.subject));
			}
			return hash.digest("hex");
		};
		loadNativeMatchingBundleSources = async ({ input, paths, resources, admission }) => {
			const records = new Map(), index = new Map();
			const rootIds = [];
			const selected = [
				[input.left, ["left"]],
				[input.right, ["right"]],
				...input.left_observations.map((value, index) => [value, ["left_observations", index]]),
				...input.right_observations.map((value, index) => [value, ["right_observations", index]])
			];
			for (const [value, path] of selected) {
				const parsed = retainedEvidenceReferenceSchema.safeParse(value);
				if (parsed.success) rootIds.push(parsed.data.evidence_id);
				else {
					await admission.admit(value);
					const checked = readImmutableEvidence(value);
					if (!checked.ok) throw nativeMatchingInputError(value, path, admission.operation, checked.error);
					const record = checked.value;
					rootIds.push(record.evidence_id);
					records.set(record.evidence_id, record);
					index.set(record.evidence_id, {
						file: -1,
						links: record.evidence_links
					});
				}
			}
			const snapshots = [];
			let last;
			for (let file = 0; file < paths.length; file++) {
				last = undefined;
				const loaded = await readImmutableEvidenceBundle(paths[file], admission.signal, resources, admission.operation);
				if (!loaded.ok) throw loaded.error;
				snapshots.push(await recordSnapshot(loaded.value, admission));
				for (const record of loaded.value.records) {
					await admission.checkpoint(256 + 4 * (record.evidence_id.length + record.evidence_links.reduce((sum, id) => sum + id.length, 0)));
					if (!index.has(record.evidence_id)) index.set(ownId(record.evidence_id), {
						file,
						links: record.evidence_links.map(ownId)
					});
				}
				last = {
					file,
					bundle: loaded.value
				};
			}
			const needed = new Set(rootIds), files = new Set();
			for (const id of needed) {
				await admission.checkpoint(128);
				const entry = index.get(id);
				if (entry === undefined) throw new EvidenceReferenceError(id, "missing", {
					expected: "Complete Evidence closure in the supplied bundles or inline inputs",
					actual: null
				});
				if (entry.file >= 0) files.add(entry.file);
				for (const linked of entry.links) needed.add(linked);
			}
			const retain = async (bundle, file) => {
				for (const record of bundle.records) if (needed.has(record.evidence_id) && index.get(record.evidence_id)?.file === file) {
					await admission.admit(record);
					records.set(record.evidence_id, record);
				}
			};
			if (last !== undefined && files.has(last.file)) {
				await retain(last.bundle, last.file);
				files.delete(last.file);
			}
			last = undefined;
			for (const file of files) {
				const loaded = await readImmutableEvidenceBundle(paths[file], admission.signal, resources, admission.operation);
				if (!loaded.ok) throw loaded.error;
				if (await recordSnapshot(loaded.value, admission) !== snapshots[file]) throw new EvidenceIntegrityError(`Evidence bundle records changed during closure lookup: ${paths[file]}`);
				await retain(loaded.value, file);
			}
			const left = rootIds[0], right = rootIds[1];
			const split = 2 + input.left_observations.length;
			return {
				input: {
					...input,
					left: reference(left),
					right: reference(right),
					left_observations: rootIds.slice(2, split).map(reference),
					right_observations: rootIds.slice(split).map(reference)
				},
				lookup: (id) => records.get(id)
			};
		};
	})))();
}

//#endregion
//#region dist/domain/native/matchFunctionInventories.js
var index, InventoryMatcher, matchFunctionInventories;
function init_matchFunctionInventories() {
	return (init_matchFunctionInventories = __esmMin((() => {
		init_canonicalDigest();
		index = (items, key) => {
			const groups = new Map();
			for (const item of items) {
				const value = key(item);
				if (value === null) continue;
				let group = groups.get(value);
				if (group === undefined) groups.set(value, group = []);
				group.push(item);
			}
			return groups;
		};
		InventoryMatcher = class {
			checkpoint;
			consumed = new Set();
			matches = [];
			#parent = new Map();
			#ambiguous = new Set();
			constructor(checkpoint) {
				this.checkpoint = checkpoint;
			}
			add(input) {
				const left = input.left.map((x) => x.member), right = input.right.map((x) => x.member);
				const leftDossier = left[0]?.dossier_evidence_id, rightDossier = right[0]?.dossier_evidence_id;
				this.matches.push({
					match_id: `match_${digestCanonicalValue({
						state: input.state,
						basis: input.basis,
						left: left.map((x) => x.function_id),
						right: right.map((x) => x.function_id)
					})}`,
					state: input.state,
					basis: input.basis,
					left,
					right,
					reason: input.reason,
					compare_functions_input: input.state === "matched" && leftDossier != null && rightDossier != null ? {
						left: {
							kind: "retained-evidence",
							evidence_id: leftDossier
						},
						right: {
							kind: "retained-evidence",
							evidence_id: rightDossier
						}
					} : null
				});
				for (const item of [...input.left, ...input.right]) this.consumed.add(item);
			}
			async pairUnique(groups, basis) {
				for (const [key, left] of groups[0]) {
					await this.checkpoint();
					const right = groups[1].get(key);
					if (left.length !== 1 || right?.length !== 1 || this.consumed.has(left[0]) || this.consumed.has(right[0])) continue;
					this.add({
						state: "matched",
						basis,
						left,
						right,
						reason: basis === "exact-symbol" ? "Unique exact reported symbol; this does not establish unchanged code or semantic equivalence." : "Unique identical observed function bytes, total size and ordered range lengths; relocations are not normalized."
					});
				}
			}
			#find(item) {
				let root = item;
				while (this.#parent.has(root) && this.#parent.get(root) !== root) root = this.#parent.get(root);
				let current = item;
				while (this.#parent.has(current) && this.#parent.get(current) !== root) {
					const next = this.#parent.get(current);
					this.#parent.set(current, root);
					current = next;
				}
				return root;
			}
			async connectCandidates(indexes) {
				for (const groups of indexes) for (const [key, left] of groups[0]) {
					await this.checkpoint();
					const right = groups[1].get(key);
					if (right === undefined) continue;
					const pending = [...left, ...right].filter((item) => !this.consumed.has(item)), first = pending[0];
					if (first === undefined) continue;
					for (const item of pending) {
						this.#parent.set(this.#find(item), this.#find(first));
						this.#ambiguous.add(item);
					}
				}
			}
			async finish(left, right) {
				const groups = new Map();
				for (const [side, items] of [["left", left], ["right", right]]) for (const item of items) {
					await this.checkpoint();
					if (this.consumed.has(item)) continue;
					if (!this.#ambiguous.has(item)) {
						this.add({
							state: side === "left" ? "only_left" : "only_right",
							basis: null,
							left: side === "left" ? [item] : [],
							right: side === "right" ? [item] : [],
							reason: "No exact correspondence in the supplied observed inventories. This is not proof of source addition/removal: renaming, inlining, stripping, byte changes or omitted functions can explain it."
						});
						continue;
					}
					const root = this.#find(item);
					let group = groups.get(root);
					if (group === undefined) groups.set(root, group = {
						left: [],
						right: []
					});
					group[side].push(item);
				}
				for (const group of groups.values()) this.add({
					state: "unresolved",
					basis: null,
					...group,
					reason: "Repeated exact names/bytes, aliases or observed CFG/call/string fingerprints leave correspondence unresolved. Connected group membership does not imply pairwise equivalence. No candidate is forced into a pair."
				});
			}
		};
		matchFunctionInventories = async (left, right, options) => {
			const names = [index(left, (x) => x.symbol), index(right, (x) => x.symbol)];
			const bytes = [index(left, (x) => options.identicalBytesComparable ? x.fingerprint : null), index(right, (x) => options.identicalBytesComparable ? x.fingerprint : null)];
			const structural = [index(left, (x) => x.member.structural_candidate_sha256), index(right, (x) => x.member.structural_candidate_sha256)];
			const matcher = new InventoryMatcher(options.checkpoint);
			await matcher.pairUnique(names, "exact-symbol");
			await matcher.pairUnique(bytes, "identical-bytes");
			await matcher.connectCandidates([
				names,
				bytes,
				structural
			]);
			await matcher.finish(left, right);
			const summary = {
				matched: 0,
				only_left: 0,
				only_right: 0,
				unresolved: 0
			};
			for (const match of matcher.matches) summary[match.state]++;
			return {
				matches: matcher.matches,
				summary
			};
		};
	})))();
}

//#endregion
//#region dist/domain/native/functionStructuralCandidate.js
var functionStructuralCandidate;
function init_functionStructuralCandidate() {
	return (init_functionStructuralCandidate = __esmMin((() => {
		init_evidence();
		init_canonicalDigest();
		init_functionComparisonNormalization();
		init_nativeSymbol();
		init_functionCallCoverage();
		init_unicodeCodePointOrder();
		functionStructuralCandidate = (evidence, dossier) => {
			const architecture = evidenceFileTarget(evidence)?.architecture;
			if (architecture == null || dossier.facet_availability?.cfg?.available !== true || dossier.facet_availability?.callees?.available !== true || dossier.facet_availability?.strings_names?.available !== true || dossier.unresolved_calls === undefined || assessFunctionCallCoverage(evidence.relationship_coverage, dossier).blockers.length > 0 || (dossier.swift_string_literal_omissions?.length ?? 0) > 0 || evidence.analysis_profile === null) return null;
			const cfg = normalizeCfg(dossier.basic_blocks);
			if (cfg === null || cfg.length === 0 || dossier.callees.some((callee) => !hasStableNativeSymbol(callee.name, callee.symbol))) return null;
			const calls = dossier.callees.map((callee) => callee.name).sort(compareUnicodeCodePoints);
			const strings = [...dossier.referenced_strings.map((value) => value.value), ...(dossier.swift_string_literals ?? []).map((value) => value.value)].sort(compareUnicodeCodePoints);
			if (calls.length === 0 && strings.length === 0) return null;
			return digestCanonicalValue({
				algorithm: "observed-cfg-calls-strings-v1",
				profile: evidence.analysis_profile.digest,
				architecture,
				cfg,
				calls,
				strings
			});
		};
	})))();
}

//#endregion
//#region dist/domain/native/functionByteCoverage.js
var slice, firstOverlapping, mergeIntervals, excludeConflicts, FunctionByteCoverage;
function init_functionByteCoverage() {
	return (init_functionByteCoverage = __esmMin((() => {
		init_addressCoordinate();
		init_internalInvariant();
		slice = (piece, start, end) => ({
			...piece,
			start,
			end,
			hex: start === piece.start && end === piece.end ? piece.hex : piece.hex.slice(Number(start - piece.start) * 2, Number(end - piece.start) * 2)
		});
		firstOverlapping = (pieces, start) => {
			let lower = 0, upper = pieces.length;
			while (lower < upper) {
				const middle = lower + upper >>> 1;
				if (pieces[middle].end <= start) lower = middle + 1;
				else upper = middle;
			}
			return lower;
		};
		mergeIntervals = (intervals) => {
			intervals.sort((a, b) => a.start < b.start ? -1 : a.start > b.start ? 1 : 0);
			const merged = [];
			for (const interval of intervals) {
				const previous = merged.at(-1);
				if (previous !== undefined && interval.start <= previous.end) {
					if (interval.end > previous.end) previous.end = interval.end;
				} else merged.push({ ...interval });
			}
			return merged;
		};
		excludeConflicts = (pieces, conflicts) => {
			const safe = [];
			let first = 0;
			for (const piece of pieces) {
				while (first < conflicts.length && conflicts[first].end <= piece.start) first++;
				let cursor = piece.start;
				for (let index = first; index < conflicts.length && conflicts[index].start < piece.end; index++) {
					const conflict = conflicts[index];
					if (conflict.start > cursor) safe.push(slice(piece, cursor, conflict.start));
					if (conflict.end > cursor) cursor = conflict.end;
					if (cursor >= piece.end) break;
				}
				if (cursor < piece.end) safe.push(slice(piece, cursor, piece.end));
			}
			return safe;
		};
		FunctionByteCoverage = class {
			checkpoint;
			#pieces = new Map();
			#prepared = false;
			constructor(checkpoint) {
				this.checkpoint = checkpoint;
			}
			async add(read, evidenceId) {
				if (this.#prepared) throw invariantViolation("Cannot append byte observations after fingerprinting");
				if (read.returned_bytes === 0) return;
				const coordinate = addressCoordinate(read.address);
				let group = this.#pieces.get(coordinate.space);
				if (group === undefined) this.#pieces.set(coordinate.space, group = []);
				await this.checkpoint(192 + read.bytes_hex.length * 2);
				group.push({
					start: coordinate.offset,
					end: coordinate.offset + BigInt(read.returned_bytes),
					hex: read.bytes_hex,
					links: [evidenceId]
				});
			}
			async #conflict(left, right) {
				const start = left.start > right.start ? left.start : right.start;
				const end = left.end < right.end ? left.end : right.end;
				for (let cursor = start; cursor < end;) {
					const next = cursor + 65536n < end ? cursor + 65536n : end;
					await this.checkpoint();
					if (slice(left, cursor, next).hex !== slice(right, cursor, next).hex) return {
						start,
						end
					};
					cursor = next;
				}
				return undefined;
			}
			async #prepareSpace(source) {
				source.sort((a, b) => a.start < b.start ? -1 : a.start > b.start ? 1 : a.end > b.end ? -1 : a.end < b.end ? 1 : 0);
				const admitted = [], conflicts = [];
				for (const incoming of source) {
					await this.checkpoint();
					for (let index = firstOverlapping(admitted, incoming.start); index < admitted.length && admitted[index].start < incoming.end; index++) {
						const conflict = await this.#conflict(admitted[index], incoming);
						if (conflict !== undefined) conflicts.push(conflict);
					}
					const end = admitted.at(-1)?.end;
					if (end === undefined || incoming.start >= end) admitted.push(incoming);
					else if (incoming.end > end) admitted.push(slice(incoming, end, incoming.end));
				}
				return excludeConflicts(admitted, mergeIntervals(conflicts));
			}
			async fingerprint(body) {
				if (!body?.available || !body.contains_entry || body.total_bytes === 0) return null;
				if (!this.#prepared) {
					for (const [space, pieces] of this.#pieces) this.#pieces.set(space, await this.#prepareSpace(pieces));
					this.#prepared = true;
				}
				const hash = createHash("sha256"), lengths = [], links = new Set();
				for (const range of body.ranges) {
					const start = addressCoordinate(range.start), end = addressCoordinate(range.end);
					const pieces = this.#pieces.get(start.space) ?? [];
					lengths.push(String(end.offset - start.offset + 1n));
					let index = firstOverlapping(pieces, start.offset), cursor = start.offset;
					while (cursor <= end.offset) {
						const piece = pieces[index++];
						if (piece === undefined || piece.start > cursor || piece.end <= cursor) return null;
						const stop = piece.end < end.offset + 1n ? piece.end : end.offset + 1n;
						for (let chunk = cursor; chunk < stop;) {
							const next = chunk + 65536n < stop ? chunk + 65536n : stop;
							await this.checkpoint();
							hash.update(Buffer.from(slice(piece, chunk, next).hex, "hex"));
							chunk = next;
						}
						for (const link of piece.links) links.add(link);
						cursor = stop;
					}
				}
				const sha256 = hash.digest("hex");
				return {
					sha256,
					key: JSON.stringify([lengths, sha256]),
					links: [...links]
				};
			}
		};
	})))();
}

//#endregion
//#region dist/domain/native/functionInventory.js
var matchingBodySchema, matchingProcedureInfoSchema, matchingFunctionDossierSchema, sourcePayload, rowAddressesSchema, matchingRows, addBody, addSymbol, addNames, addBytes, reportedSymbol, functionFact, textLength, rowBytes, readFunctionInventory;
function init_functionInventory() {
	return (init_functionInventory = __esmMin((() => {
		init_functionStructuralCandidate();
		init_evidenceErrors();
		init_evidenceValidation();
		init_canonicalDigest();
		init_functionDossier();
		init_functionBody();
		init_nativeFactAvailability();
		init_nativeSymbol();
		init_nativeOperationFacts();
		init_nativeAddress();
		init_nativeByteRead();
		init_procedureInfo();
		init_functionByteCoverage();
		matchingBodySchema = z.discriminatedUnion("available", [unavailableNativeFactSchema, availableFunctionBodySchema.safeExtend({ ranges: availableFunctionBodySchema.shape.ranges.element.extend({
			start: nativeAddressInputSchema,
			end: nativeAddressInputSchema
		}).array() })]);
		matchingProcedureInfoSchema = procedureInfoSchema.safeExtend({
			entrypoint: nativeAddressInputSchema,
			body: matchingBodySchema
		}).transform(({ entrypoint, body, name, symbol }) => ({
			address: entrypoint,
			body,
			name,
			symbol
		}));
		matchingFunctionDossierSchema = functionDossierSchema.safeExtend({ procedure: functionDossierSchema.shape.procedure.safeExtend({
			address: nativeAddressInputSchema,
			body: matchingBodySchema
		}) });
		sourcePayload = (schema, input) => {
			const result = readEvidencePayload(schema, input);
			if (!result.ok) throw result.error;
			return result.value;
		};
		rowAddressesSchema = z.array(z.object({ address: nativeAddressInputSchema }));
		matchingRows = (contract, input) => {
			const rows = sourcePayload(contract.schema, input);
			const addresses = sourcePayload(rowAddressesSchema, rows);
			return rows.map((row, index) => ({
				...row,
				address: addresses[index].address
			}));
		};
		addBody = (observation, details, symbols) => {
			const dossier = observation.operation === "analyze_function" ? sourcePayload(matchingFunctionDossierSchema, observation.normalized_result) : undefined;
			const procedure = dossier?.procedure ?? sourcePayload(matchingProcedureInfoSchema, observation.normalized_result);
			const address = procedure.address;
			if (procedure.symbol != null) addSymbol({
				address,
				value: procedure.name,
				symbol: procedure.symbol
			}, observation.evidence_id, symbols);
			if (!functionBodyEntryAgrees(procedure.body, address)) throw new EvidenceIntegrityError("Procedure body entry membership contradicts its address");
			let detail = details.get(address);
			if (detail === undefined) {
				details.set(address, detail = {
					body: procedure.body,
					conflict: false,
					links: []
				});
			} else if (digestCanonicalValue(detail.body) !== digestCanonicalValue(procedure.body)) {
				detail.conflict = true;
			}
			detail.body = procedure.body;
			if (observation.operation === "analyze_function") {
				const candidate = functionStructuralCandidate(observation, dossier);
				if (detail.dossier === undefined) {
					detail.dossier = observation.evidence_id;
					detail.candidate = candidate;
				} else {
					if (detail.dossier !== observation.evidence_id) detail.dossier = null;
					if (detail.candidate !== candidate) detail.candidate = null;
				}
			}
			detail.links.push(observation.evidence_id);
		};
		addSymbol = (symbol, evidenceId, symbols) => {
			const address = symbol.address;
			let group = symbols.get(address);
			if (group === undefined) symbols.set(address, group = {
				values: [],
				links: new Set()
			});
			group.values.push(symbol);
			group.links.add(evidenceId);
		};
		addNames = async (observation, symbols, checkpoint) => {
			for (const symbol of matchingRows(listNamesFact, observation.normalized_result)) {
				await checkpoint(128 + symbol.value.length * 2);
				addSymbol(symbol, observation.evidence_id, symbols);
			}
		};
		addBytes = async (observation, bytes) => {
			const parsed = sourcePayload(nativeByteReadSchema, observation.normalized_result);
			const requestAddress = typeof observation.parameters.address === "string" ? sourcePayload(nativeAddressInputSchema, observation.parameters.address) : undefined;
			const read = {
				...parsed,
				address: requestAddress !== undefined || parsed.returned_bytes > 0 ? sourcePayload(nativeAddressInputSchema, parsed.address) : parsed.address
			};
			if (requestAddress !== undefined && requestAddress !== read.address || typeof observation.parameters.length === "number" && observation.parameters.length !== read.requested_bytes) throw new EvidenceIntegrityError("Read-byte coordinates contradict the selected request");
			await bytes.add(read, observation.evidence_id);
		};
		reportedSymbol = (row, known) => {
			const names = [...row.symbol === undefined ? [] : [row], ...known?.values.filter((symbol) => symbol.value === row.value) ?? []];
			const generated = names.some((symbol) => nativeSymbolOrigin(symbol.symbol) === "generated");
			const named = names.some((symbol) => nativeSymbolOrigin(symbol.symbol) === "named");
			return {
				value: row.value.length === 0 || generated || !named ? null : row.value,
				origin: generated && named ? "conflicting" : names.some((symbol) => symbol.symbol !== undefined) ? "known" : "unknown"
			};
		};
		functionFact = async ({ inventory, row, sourceIndex }, facts, checkpoint) => {
			const address = row.address, detail = facts.details.get(address), symbols = facts.symbols.get(address);
			for (const link of detail?.links ?? []) await checkpoint(256 + 8 * link.length);
			for (const link of symbols?.links ?? []) await checkpoint(256 + 8 * link.length);
			const links = new Set([inventory.evidence_id]);
			for (const link of detail?.links ?? []) links.add(link);
			for (const link of symbols?.links ?? []) links.add(link);
			const body = detail?.conflict ? undefined : detail?.body;
			const fingerprint = await facts.bytes.fingerprint(body);
			for (const link of fingerprint?.links ?? []) {
				await checkpoint(256 + 8 * link.length);
				links.add(link);
			}
			const limitations = [];
			const symbol = reportedSymbol(row, symbols);
			if (fingerprint === null) limitations.push(detail?.conflict ? "Conflicting procedure observations; body and dossier remain unknown." : "No complete unambiguous bytes for the observed function body.");
			if (symbol.origin === "unknown") limitations.push("Symbol origin unavailable; exact-name matching is unavailable. Independent complete body bytes remain eligible.");
			if (symbol.origin === "conflicting") limitations.push("Conflicting generated and named symbol-origin observations; exact-name matching is unavailable. Independent complete body bytes remain eligible.");
			if (detail?.dossier === null) limitations.push("Multiple supplied dossiers describe this address; no dossier is selected automatically. Agreed body bytes and structural facts remain usable.");
			return {
				member: {
					function_id: `${inventory.evidence_id}/${sourceIndex}`,
					inventory_evidence_id: inventory.evidence_id,
					source_index: sourceIndex,
					address,
					name: row.value,
					body_sha256: fingerprint?.sha256 ?? null,
					structural_candidate_sha256: detail?.conflict ? null : detail?.candidate ?? null,
					body_bytes: body?.available ? body.total_bytes : null,
					dossier_evidence_id: detail?.conflict ? null : detail?.dossier ?? null,
					evidence_links: [...links].sort(),
					limitations
				},
				symbol: symbol.value,
				fingerprint: fingerprint?.key ?? null
			};
		};
		textLength = (value) => typeof value === "string" ? value.length : 0;
		rowBytes = (row) => typeof row === "object" && row !== null ? 2048 + 4 * (textLength(row.address) + textLength(row.value)) : 2048;
		readFunctionInventory = async (inventory, observations, checkpoint) => {
			const source = inventory.normalized_result;
			if (Array.isArray(source)) for (const row of source) await checkpoint(rowBytes(row));
			await checkpoint(256 + 8 * inventory.evidence_id.length);
			const rows = matchingRows(listProceduresFact, source);
			const facts = {
				details: new Map(),
				symbols: new Map(),
				bytes: new FunctionByteCoverage(checkpoint)
			};
			for (const observation of observations) {
				await checkpoint();
				switch (observation.operation) {
					case "list_names":
						await addNames(observation, facts.symbols, checkpoint);
						break;
					case "read_bytes":
						await addBytes(observation, facts.bytes);
						break;
					case "procedure_info":
					case "analyze_function":
						addBody(observation, facts.details, facts.symbols);
						break;
				}
			}
			const functions = [];
			for (let sourceIndex = 0; sourceIndex < rows.length; sourceIndex++) {
				const row = rows[sourceIndex];
				await checkpoint();
				functions.push(await functionFact({
					inventory,
					row,
					sourceIndex
				}, facts, checkpoint));
			}
			return functions;
		};
	})))();
}

//#endregion
//#region dist/application/native/NativeMatchingSources.js
var INVENTORY_OPERATIONS, OBSERVATION_OPERATIONS, resolveNativeMatchingSources;
function init_NativeMatchingSources() {
	return (init_NativeMatchingSources = __esmMin((() => {
		init_canonicalDigest();
		init_analysisErrorCore();
		init_evidence();
		init_evidenceValidation();
		init_evidenceReference();
		init_EvidenceInputResolver();
		init_NativeMatchingInputError();
		INVENTORY_OPERATIONS = ["list_procedures"];
		OBSERVATION_OPERATIONS = [
			"list_names",
			"procedure_info",
			"read_bytes",
			"analyze_function"
		];
		resolveNativeMatchingSources = async (input, admission, lookup) => {
			const sources = new Map();
			/**
			* Charge only what matching copies. A retained immutable record is borrowed
			* without cloning. When matching never parses its result, or charges the
			* representation it derives from it (inventory rows), only its envelope is
			* charged; walking the result would charge resident memory as if matching
			* had allocated it.
			*/
			const resolve = async (input, path, borrowable = false) => {
				const reference = retainedEvidenceReferenceSchema.safeParse(input);
				let raw = input, borrowed;
				if (reference.success) {
					const found = resolveEvidenceInput(reference.data, lookup);
					if (!found.ok) throw found.error;
					raw = found.value;
					if (borrowable && isImmutableEvidence(found.value)) borrowed = found.value;
				}
				if (borrowed !== undefined) await admission.admitBorrowed(borrowed);
				else await admission.admit(raw);
				const checked = readEvidence(raw);
				if (!checked.ok) throw path !== undefined && !reference.success ? nativeMatchingInputError(input, path, admission.operation, checked.error) : checked.error;
				const evidence = checked.value;
				const cached = sources.get(evidence.evidence_id);
				if (cached !== undefined) return cached;
				sources.set(evidence.evidence_id, evidence);
				return evidence;
			};
			const select = async (raw, path, operations, borrowable = false) => {
				const evidence = await resolve(raw, path, borrowable);
				if (evidence.predicate_type !== "rea.analysis" || !operations.includes(evidence.operation) || evidenceFileTarget(evidence) === undefined) {
					const message = `Expected artifact-bound rea.analysis ${operations.join(" or ")} Evidence, received ${evidence.predicate_type} ${evidence.operation}`;
					throw new AnalysisInputError(admission.operation, { userMessage: message }, [{
						path,
						reason: "invalid_value",
						message
					}]);
				}
				return evidence;
			};
			const left = await select(input.left, ["left"], INVENTORY_OPERATIONS, true);
			const right = await select(input.right, ["right"], INVENTORY_OPERATIONS, true);
			const observations = async (inputs, field, inventory) => {
				const result = [];
				const seen = new Set();
				for (const [index, input] of inputs.entries()) {
					const record = await select(input, [field, index], OBSERVATION_OPERATIONS);
					if (digestCanonicalValue(record.subject) !== digestCanonicalValue(inventory.subject) || digestCanonicalValue(record.provider) !== digestCanonicalValue(inventory.provider) || digestCanonicalValue(record.analysis_profile) !== digestCanonicalValue(inventory.analysis_profile) || (record.parameters.document ?? null) !== (inventory.parameters.document ?? null)) {
						const message = "Select an observation from the inventory's exact target, provider, analysis profile and document context.";
						throw new AnalysisInputError(admission.operation, { userMessage: message }, [{
							path: [field, index],
							reason: "invalid_value",
							message
						}]);
					}
					if (!seen.has(record.evidence_id)) {
						seen.add(record.evidence_id);
						result.push(record);
					}
				}
				return result;
			};
			const leftObservations = await observations(input.left_observations, "left_observations", left);
			const rightObservations = await observations(input.right_observations, "right_observations", right);
			const directLinks = [...sources.keys()].sort();
			for (const source of sources.values()) for (const id of source.evidence_links) if (!sources.has(id)) await resolve({
				kind: "retained-evidence",
				evidence_id: id
			}, undefined, true);
			return {
				left,
				right,
				leftObservations,
				rightObservations,
				directLinks,
				sources: [...sources.values()]
			};
		};
	})))();
}

//#endregion
//#region dist/application/native/NativeFunctionMatchingService.js
var OPERATION, matchNativeFunctions, matchWithAdmission, matchingFailure, matchNativeFunctionsFromBundles;
function init_NativeFunctionMatchingService() {
	return (init_NativeFunctionMatchingService = __esmMin((() => {
		init_targetIdentity();
		init_NativeMatchingAdmission();
		init_NativeMatchingBundleSources();
		init_OwnedRegularFile();
		init_matchFunctionInventories();
		init_functionMatchingContracts();
		init_evidence();
		init_functionInventory();
		init_functionMatching();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_result();
		init_NativeMatchingSources();
		init_comparisonEvidenceIdentity();
		OPERATION = "match_native_functions";
		matchNativeFunctions = async (rawInput, options, lookup) => {
			const admission = new NativeMatchingAdmission(OPERATION, options?.signal, options?.representationAllowance);
			try {
				await setImmediate();
				await admission.checkpoint();
				await admission.admit(rawInput);
				const parsed = matchNativeFunctionsInputSchema.safeParse(rawInput);
				if (!parsed.success) return err(analysisInputErrorFromIssues(OPERATION, parsed.error.issues, rawInput));
				return ok(await matchWithAdmission(parsed.data, admission, lookup));
			} catch (cause) {
				return matchingFailure(cause, options);
			}
		};
		matchWithAdmission = async (input, admission, lookup) => {
			const checkpoint = admission.checkpoint;
			const { left, right, leftObservations, rightObservations, directLinks, sources } = await resolveNativeMatchingSources(input, admission, lookup);
			const leftFunctions = await readFunctionInventory(left, leftObservations, checkpoint);
			const rightFunctions = await readFunctionInventory(right, rightObservations, checkpoint);
			const leftTarget = evidenceFileTarget(left);
			const rightTarget = evidenceFileTarget(right);
			const compatible = leftTarget?.architecture != null && leftTarget.architecture === rightTarget?.architecture;
			const { matches, summary } = await matchFunctionInventories(leftFunctions, rightFunctions, {
				identicalBytesComparable: compatible,
				checkpoint
			});
			const byteSources = [];
			for (const [side, functions, observations] of [[
				"left",
				leftFunctions,
				leftObservations
			], [
				"right",
				rightFunctions,
				rightObservations
			]]) {
				const used = new Set();
				for (const item of functions) for (const id of item.member.evidence_links) {
					if (!used.has(id)) await checkpoint(128 + id.length * 4);
					used.add(id);
				}
				for (const observation of observations) {
					if (observation.operation !== "read_bytes" || !used.has(observation.evidence_id)) continue;
					used.delete(observation.evidence_id);
					await checkpoint(512 + observation.evidence_id.length * 8);
					for (const limitation of observation.limitations) await checkpoint(128 + limitation.length * 8);
					byteSources.push({
						side,
						evidence_id: observation.evidence_id,
						limitations: [...observation.limitations]
					});
				}
			}
			const limitations = [...new Set([
				...left.limitations.map((x) => `Left: ${x}`),
				...right.limitations.map((x) => `Right: ${x}`),
				"Coverage is restricted to the supplied provider-observed inventories; missing/truncated inventory facts never prove absence from either binary.",
				"Only unique exact symbols and bytes are paired. Compatible observed CFG/call/string fingerprints propose unresolved candidates, never identity or equivalence. Missing structural coverage stays unknown.",
				"Name or byte correspondence is not behavioral equivalence; use analyze_function for selected pairs, then compare_functions. Existing dossier pairs include directly usable retained-reference inputs.",
				...byteSources.length === 0 ? [] : [nativeFunctionByteSourceGuidance],
				...!compatible ? ["Identical-byte matching unavailable: input architectures are missing or differ."] : []
			])];
			const report = nativeFunctionMatchingSchema.parse({
				left: {
					evidence_id: left.evidence_id,
					sha256: leftTarget.sha256,
					functions: leftFunctions.length
				},
				right: {
					evidence_id: right.evidence_id,
					sha256: rightTarget.sha256,
					functions: rightFunctions.length
				},
				scope: "provider-observed-inputs",
				source_coverage: {
					status: summary.only_left + summary.only_right + summary.unresolved > 0 ? "partial" : "complete-within-inputs",
					left_inventory_completeness: "unknown",
					right_inventory_completeness: "unknown",
					left_byte_fingerprints: leftFunctions.filter((x) => x.fingerprint !== null).length,
					left_structural_candidates: leftFunctions.filter((x) => x.member.structural_candidate_sha256 !== null).length,
					right_structural_candidates: rightFunctions.filter((x) => x.member.structural_candidate_sha256 !== null).length,
					right_byte_fingerprints: rightFunctions.filter((x) => x.fingerprint !== null).length
				},
				summary,
				byte_sources_count: byteSources.length,
				byte_sources: byteSources,
				matches,
				limitations
			});
			await checkpoint();
			const evidence = createEvidence(unknownTarget("derived-from-linked-evidence"), FUNCTION_COMPARISON_PROVIDER, {
				operation: OPERATION,
				predicateType: NATIVE_FUNCTION_MATCHING_PREDICATE,
				confidence: "derived",
				authority: "analyst-inference",
				parameters: {
					left_evidence_id: left.evidence_id,
					right_evidence_id: right.evidence_id,
					left_observation_ids: leftObservations.map((x) => x.evidence_id),
					right_observation_ids: rightObservations.map((x) => x.evidence_id),
					algorithm: "exact-symbol-body-bytes-and-structural-candidates-v1"
				},
				result: report,
				limitations,
				evidenceLinks: directLinks
			});
			await checkpoint();
			return {
				evidence,
				sources,
				detail: input.detail
			};
		};
		matchingFailure = (cause, options) => {
			if (cause instanceof RegularFileCleanupFailure) throw cause;
			if (options?.signal?.aborted) return err(cancelledBy(OPERATION, options.signal));
			if (cause instanceof AnalysisError) return err(cause);
			throw cause;
		};
		matchNativeFunctionsFromBundles = async (input, paths, resources, options) => {
			try {
				const admission = new NativeMatchingAdmission(OPERATION, options?.signal, options?.representationAllowance);
				await admission.admit(input);
				const loaded = await loadNativeMatchingBundleSources({
					input,
					paths,
					resources,
					admission
				});
				await setImmediate();
				await admission.checkpoint();
				return ok(await matchWithAdmission(loaded.input, admission, loaded.lookup));
			} catch (cause) {
				return matchingFailure(cause, options);
			}
		};
	})))();
}

//#endregion
//#region dist/cli/nativeFunctionMatchingCommands.js
var nativeFunctionMatchingCommands_exports = /* @__PURE__ */ __exportAll({ registerNativeFunctionMatchingCommands: () => registerNativeFunctionMatchingCommands });
var registerNativeFunctionMatchingCommands;
function init_nativeFunctionMatchingCommands() {
	return (init_nativeFunctionMatchingCommands = __esmMin((() => {
		init_NativeFunctionMatchingService();
		init_resources();
		init_sessionToolContracts();
		init_comparisonEvidenceIdentity();
		init_analysisErrorProjection();
		init_analysisEvidenceDelivery();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		init_nativeMatchingAllowance();
		init_localPath();
		registerNativeFunctionMatchingCommands = (cli, logger, environment) => registerContractDocumentCommand(cli, logger, contractNamed(SESSION_TOOL_CONTRACTS, "match_native_functions"), {
			description: "Match two observed native function inventories without executing targets",
			document: "JSON or JSON file: left/right inventories, optional observations and detail",
			cliOptions: {
				source_bundle: z.array(localPathStringSchema).default([]).describe("Canonical source Evidence bundle for retained references; repeat for each input"),
				evidence_output: localPathStringSchema.optional().describe("Save full matching Evidence and selected sources; required for default summary; never overwrites")
			}
		}, async (_document, context) => {
			const { signal, operation, cliOptions } = context;
			const admitted = admittedContractInput(context);
			if (!admitted.ok) return projectAnalysisError(admitted.error);
			const input = admitted.value;
			const delivery = {
				providerId: FUNCTION_COMPARISON_PROVIDER.id,
				operation,
				signal,
				detail: input.detail,
				evidenceOutput: cliOptions.evidence_output
			};
			const invalid = cliEvidenceDeliveryInputError(delivery);
			if (invalid !== undefined) return projectAnalysisError(invalid);
			const allowance = parseNativeMatchingAllowance(environment);
			if (!allowance.ok) return projectAnalysisError(allowance.error);
			const resources = new ArtifactResourceScope();
			let sources = [];
			const complete = await finishAnalysisCommand(async () => {
				const result = await matchNativeFunctionsFromBundles(input, cliOptions.source_bundle, resources, {
					signal,
					representationAllowance: allowance.value
				});
				if (!result.ok) return result;
				sources = result.value.sources;
				return {
					ok: true,
					value: result.value.evidence
				};
			}, resources, delivery.providerId, delivery.operation, signal);
			return publishCliAnalysisEvidence(complete, {
				...delivery,
				sourceEvidence: sources
			});
		});
	})))();
}

//#endregion
export { init_nativeFunctionMatchingCommands, nativeFunctionMatchingCommands_exports };