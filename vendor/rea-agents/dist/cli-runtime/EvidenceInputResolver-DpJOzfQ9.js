import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, AnalysisResourceConstraintError, EvidenceFileError, EvidenceIntegrityError, EvidenceReferenceError, bufferedJsonParts, cancelledBy, canonicalJsonParts, freezeJsonSnapshot, init_analysisErrorCore, init_evidenceErrors, init_immutableJson, init_isRecord, init_jsonSerialization, init_jsonValue, init_sha256Hex, isRecord, jsonObjectSchema, jsonStringCodeUnits, jsonValueSchema, jsonValueValidationIssue, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { absoluteCallerPath, compareUnicodeCodePoints, compositeKey, init_callerPath, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection, projectInputIssuesBounded } from "./inputIssueProjection-W-zXU1iH.js";
import { init_TextFileWrite, init_resources, writeTextParts } from "./resources-B3P64jvH.js";
import { analysisErrorWithCleanupDependencies, init_analysisErrorCleanup } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_relationshipCoverage, relationshipCoverageSchema } from "./relationshipCoverage-2rn3-vch.js";
import { INSPECT_ANALYSIS_VIEW_OPERATION, analysisProfileSchema, analysisProfilesEqual, canonicalJsonDigestSteps, committedProviderSchema, committedProvidersEqual, describeValidationFailure, evidenceFileTarget, evidenceLocationSchema, evidenceSubjectSchema, getEvidenceInputContract, init_analysisProfile, init_analysisViewErrors, init_canonicalJsonDigestSteps, init_evidence, init_evidenceFormat, init_evidenceInputContract, init_evidenceReference, init_evidenceValidation, init_processCaptureParsing, init_validationFailure, isUnsupportedEvidenceFormat, rebindEvidenceToTargetPath, retainedEvidenceReferenceSchema, safeParseImmutableEvidence, safeParseProcessCapture, unsupportedEvidenceFormatError } from "./nativeValueFlow-13oOEkkJ.js";
import { BINARY_ARCHITECTURES, RAW_ONLY_ARCHITECTURES, init_binaryTargetTypes } from "./binaryTargetTypes-CrE-Muhh.js";
import { BINARY_TARGET_FORMATS, BINARY_TARGET_FORMAT_KINDS, init_targetFormats } from "./targetFormats-BjyLMHym.js";
import { binaryTargetIdentity, fileTargetIdentitySchema, init_digests, init_targetIdentity, prefixedDigestSchema, sameTargetIdentity } from "./targetIdentity-rKLLVwEj.js";
import { evidenceBundleForTarget, evidenceBundleSchema, init_evidenceBundle, isImmutableEvidenceBundle, parseEvidenceBundle, parseImmutableEvidenceBundle, safeParseEvidenceBundle, safeParseImmutableEvidenceBundle } from "./evidenceBundle-CWOVHJ6o.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_JsonFiles, readJsonFile } from "./JsonFiles-CvkLtuRa.js";
import { z } from "zod";
import canonicalize from "canonicalize";
import { getHeapStatistics } from "node:v8";

//#region dist/application/JsonAuthenticationHeadroom.js
var AUTHENTICATION_COPIES, estimateJsonArrayScalarEntry, estimateJsonStorage, requireAuthenticationHeadroom;
function init_JsonAuthenticationHeadroom() {
	return (init_JsonAuthenticationHeadroom = __esmMin((() => {
		init_jsonSerialization();
		init_analysisErrorCore();
		init_result();
		AUTHENTICATION_COPIES = 2;
		estimateJsonArrayScalarEntry = (value, hasPrevious) => ({
			valueBytes: 16 + (value === null ? 16 : 64 + value.length * 2),
			serializedUtf16Bytes: ((value === null ? 4 : jsonStringCodeUnits(value)) + (hasPrevious ? 1 : 0)) * 2
		});
		estimateJsonStorage = (value, options = {}) => {
			const maximum = options.maximumValueBytes ?? Number.POSITIVE_INFINITY;
			const serialized = options.includeSerialized !== false;
			let valueBytes = 0;
			let serializedCharacters = 0;
			const stack = [[value][Symbol.iterator]()];
			while (stack.length > 0) {
				if (valueBytes > maximum) break;
				const next = stack[stack.length - 1].next();
				if (next.done) {
					stack.pop();
					continue;
				}
				const item = next.value;
				if (typeof item === "string") {
					valueBytes += 64 + item.length * 2;
					if (serialized && valueBytes <= maximum) serializedCharacters += jsonStringCodeUnits(item);
				} else if (Array.isArray(item)) {
					valueBytes += 128 + item.length * 16;
					serializedCharacters += 2 + Math.max(0, item.length - 1);
					stack.push(item.values());
				} else if (typeof item === "object" && item !== null) {
					valueBytes += 128;
					serializedCharacters += 2;
					stack.push((function* () {
						let count = 0;
						for (const key in item) {
							if (!Object.hasOwn(item, key)) continue;
							valueBytes += 64 + key.length * 2;
							if (serialized && valueBytes <= maximum) serializedCharacters += jsonStringCodeUnits(key) + 1 + (count++ === 0 ? 0 : 1);
							yield item[key];
						}
					})());
				} else {
					valueBytes += 16;
					serializedCharacters += typeof item === "number" ? String(item).length : item === true ? 4 : item === false ? 5 : 4;
				}
			}
			return {
				valueBytes,
				serializedUtf16Bytes: serializedCharacters * 2
			};
		};
		requireAuthenticationHeadroom = (value, options) => {
			const availableBytes = options.availableBytes ?? getHeapStatistics().total_available_size;
			const estimate = estimateJsonStorage(value);
			const valueBytes = estimate.valueBytes + (options.additional?.valueBytes ?? 0);
			const serializedUtf16Bytes = estimate.serializedUtf16Bytes + (options.additional?.serializedUtf16Bytes ?? 0);
			const serializedCodeUnits = serializedUtf16Bytes / 2;
			if (options.serializedCodeUnitLimit !== undefined && serializedCodeUnits > options.serializedCodeUnitLimit) return err(new AnalysisResourceConstraintError(options.operation, "memory", `${options.description}: expanded JSON exceeds the single-string serialization limit.`, {
				input_path: options.path,
				serialized_json_code_units: serializedCodeUnits,
				maximum_serialized_json_code_units: options.serializedCodeUnitLimit
			}, {
				retryable: false,
				remediationAction: "Reduce the selected facts before serialization. If the question requires the complete representation above this ceiling, report this unsupported size instead of repeating the unchanged request. Increasing heap or command-output admission does not raise the serialization ceiling. A delivery summary cannot repair an Evidence record that could not be assembled."
			}));
			const requiredBytes = (valueBytes + serializedUtf16Bytes) * AUTHENTICATION_COPIES;
			if (requiredBytes <= availableBytes) return ok(undefined);
			return err(new AnalysisResourceConstraintError(options.operation, "memory", options.description, {
				input_path: options.path,
				projected_value_bytes: valueBytes,
				serialized_json_utf16_bytes: serializedUtf16Bytes,
				authentication_bytes: requiredBytes,
				available_heap_bytes: availableBytes
			}, { measuredExhaustion: true }));
		};
	})))();
}

//#endregion
//#region dist/domain/analysisSnapshot.js
var architectureSchema, formatSchema, kindSchema, SNAPSHOT_SELECTION_KINDS, RAW_ONLY, snapshotArchitectureAllowed, targetSchema, bindingSchema, entrySchema, workflowEntrySchema, analysisSnapshotSchema, resemblesAnalysisSnapshot, preparedEntryBrand, preparedEntries, prepareSnapshotEntry, snapshotFileHeaderSchema, parseSnapshotBundle, parsePreparedAnalysisSnapshot, contentDigest, snapshotContentDigest, subjectContent, evidenceContentDigest, snapshotExecutionProjection, canonicalJson, snapshotTarget, snapshotBinding, snapshotMatchesTarget, snapshotMatchesProfile, snapshotBindingMismatch, snapshotEvidenceForQuery, createAnalysisSnapshotWorkflowEntry, evidenceMatchesEntry, analysisQueryId, createAnalysisSnapshotEntry, validatedSnapshots, parseAnalysisSnapshot, authenticateSnapshot, immutableAnalysisSnapshot, sealSnapshot, restoreSnapshot, hasCanonicalQueryOrder, subjectNamesSnapshotTarget, isCorrespondingEvidence, evidenceQueryKey, entryQueryKey, entryEvidenceKey, workflowEntryQueryKey, workflowEntryEvidenceKey, isWorkflowEvidence, evidenceMatchesWorkflowEntry, evidenceContentMetadata, serializeAnalysisSnapshot;
function init_analysisSnapshot() {
	return (init_analysisSnapshot = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_targetIdentity();
		init_analysisProfile();
		init_binaryTargetTypes();
		init_evidenceBundle();
		init_evidence();
		init_jsonValue();
		init_digests();
		init_canonicalJsonDigestSteps();
		init_immutableJson();
		init_relationshipCoverage();
		init_sha256Hex();
		init_targetFormats();
		architectureSchema = z.enum(BINARY_ARCHITECTURES);
		formatSchema = z.enum(BINARY_TARGET_FORMATS);
		kindSchema = z.enum([
			"executable",
			"database",
			"archive",
			"artifact"
		]);
		SNAPSHOT_SELECTION_KINDS = {
			"raw-binary": "entry-point",
			"gamecube-dol": "entry-point",
			"esp-flash-image": "esp-flash",
			"mach-o-universal": "universal-slice"
		};
		RAW_ONLY = new Set(RAW_ONLY_ARCHITECTURES);
		snapshotArchitectureAllowed = (format, architecture) => format === "raw-binary" ? architecture !== null : format === "gamecube-dol" ? architecture === "powerpc" : format === "esp-flash-image" ? architecture === null : architecture === null || !RAW_ONLY.has(architecture);
		targetSchema = z.strictObject({
			kind: kindSchema,
			identity: fileTargetIdentitySchema.extend({
				format: formatSchema,
				architecture: architectureSchema.nullable()
			})
		}).superRefine(({ kind, identity }, context) => {
			if (kind !== BINARY_TARGET_FORMAT_KINDS[identity.format]) context.addIssue({
				code: "custom",
				path: ["kind"],
				message: `Snapshot target kind ${kind} does not match format ${identity.format}`
			});
			if (!snapshotArchitectureAllowed(identity.format, identity.architecture)) context.addIssue({
				code: "custom",
				path: ["identity", "architecture"],
				message: `Snapshot target architecture ${String(identity.architecture)} does not apply to format ${identity.format}`
			});
			const expected = SNAPSHOT_SELECTION_KINDS[identity.format] ?? null;
			if ((identity.selection?.kind ?? null) !== expected) context.addIssue({
				code: "custom",
				path: ["identity", "selection"],
				message: expected === null ? `Snapshot target format ${identity.format} makes no selection` : `Snapshot target format ${identity.format} requires a ${expected} selection`
			});
		});
		bindingSchema = z.object({
			provider: committedProviderSchema,
			analysis_profile: analysisProfileSchema
		}).superRefine((binding, context) => {
			if (!committedProvidersEqual(binding.provider, binding.analysis_profile.provider)) context.addIssue({
				code: "custom",
				path: ["provider"],
				message: "Snapshot binding provider does not match analysis profile"
			});
		});
		entrySchema = z.object({
			query_id: prefixedDigestSchema("query"),
			operation: z.string().min(1),
			parameters: jsonObjectSchema,
			execution: z.object({
				result: jsonValueSchema,
				raw_result: jsonValueSchema.nullable(),
				provider: committedProviderSchema,
				limitations: z.array(z.string()),
				relationship_coverage: relationshipCoverageSchema.nullable(),
				locations: z.array(evidenceLocationSchema),
				subject: evidenceSubjectSchema
			})
		});
		workflowEntrySchema = entrySchema.extend({ execution: entrySchema.shape.execution.extend({ analysis_profile: analysisProfileSchema }) });
		analysisSnapshotSchema = z.object({
			target: targetSchema,
			binding: bindingSchema,
			entries: z.array(entrySchema),
			workflow_entries: z.array(workflowEntrySchema),
			evidence_bundle: evidenceBundleSchema
		});
		resemblesAnalysisSnapshot = (value) => {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
			const record = value;
			const objectMember = (key) => Object.hasOwn(record, key) && typeof record[key] === "object" && record[key] !== null && !Array.isArray(record[key]);
			return objectMember("target") && objectMember("binding") && objectMember("evidence_bundle") && Object.hasOwn(record, "entries") && Array.isArray(record.entries) && Object.hasOwn(record, "workflow_entries") && Array.isArray(record.workflow_entries);
		};
		preparedEntryBrand = Symbol("prepared-snapshot-entry");
		preparedEntries = new WeakMap();
		prepareSnapshotEntry = (input, kind) => {
			const handle = Object.freeze({ [preparedEntryBrand]: true });
			if (kind === "provider") {
				const entry = entrySchema.parse(input);
				const { result, raw_result, ...execution } = entry.execution;
				preparedEntries.set(handle, {
					kind,
					entry: {
						...entry,
						execution
					},
					digest: snapshotContentDigest(result, raw_result, execution)
				});
			} else {
				const entry = workflowEntrySchema.parse(input);
				const { result, raw_result, ...execution } = entry.execution;
				preparedEntries.set(handle, {
					kind,
					entry: {
						...entry,
						execution
					},
					digest: snapshotContentDigest(result, raw_result, execution)
				});
			}
			return handle;
		};
		snapshotFileHeaderSchema = z.object({
			target: targetSchema,
			binding: bindingSchema,
			evidence_bundle: z.unknown()
		});
		parseSnapshotBundle = (value, parse) => {
			try {
				return parse(value);
			} catch (cause) {
				if (!(cause instanceof z.ZodError)) throw cause;
				throw new z.ZodError(cause.issues.map((issue) => ({
					...issue,
					path: ["evidence_bundle", ...issue.path]
				})));
			}
		};
		parsePreparedAnalysisSnapshot = (input, entries, workflowEntries) => {
			const header = snapshotFileHeaderSchema.parse(input);
			const bundle = parseSnapshotBundle(header.evidence_bundle, parseImmutableEvidenceBundle);
			const providerRows = entries.map((handle) => {
				const row = preparedEntries.get(handle);
				if (row?.kind !== "provider") throw new TypeError("Analysis snapshot entry was not parsed in this realm");
				return row;
			});
			const workflowRows = workflowEntries.map((handle) => {
				const row = preparedEntries.get(handle);
				if (row?.kind !== "workflow") throw new TypeError("Analysis snapshot workflow entry was not parsed in this realm");
				return row;
			});
			const restored = sealSnapshot(restoreSnapshot(header, bundle, providerRows, workflowRows));
			for (const handle of [...entries, ...workflowEntries]) preparedEntries.delete(handle);
			return restored;
		};
		contentDigest = (value) => {
			const steps = canonicalJsonDigestSteps(value);
			let step = steps.next();
			while (!step.done) step = steps.next();
			return step.value;
		};
		snapshotContentDigest = (result, rawResult, execution) => {
			const metadata = jsonObjectSchema.parse({
				limitations: execution.limitations,
				locations: execution.locations,
				subject: subjectContent(execution.subject),
				relationship_coverage: execution.relationship_coverage
			});
			return contentDigest({
				...metadata,
				normalized_result: result,
				raw_result: rawResult
			});
		};
		subjectContent = (subject) => ({
			identity: subject.identity,
			local_path: subject.local_path
		});
		evidenceContentDigest = (evidence) => {
			return contentDigest({
				...jsonObjectSchema.parse(evidenceContentMetadata(evidence)),
				normalized_result: evidence.normalized_result,
				raw_result: evidence.raw_result
			});
		};
		snapshotExecutionProjection = (execution, provider) => entrySchema.shape.execution.parse({
			result: execution.result,
			raw_result: execution.rawResult,
			provider,
			limitations: execution.limitations,
			relationship_coverage: execution.relationshipCoverage ?? null,
			locations: execution.locations,
			subject: execution.subject
		});
		canonicalJson = (value) => {
			const json = jsonValueSchema.parse(value);
			const encoded = canonicalize(json);
			if (encoded === undefined) throw new TypeError("RFC 8785 canonicalization rejected snapshot data");
			return encoded;
		};
		snapshotTarget = (target) => targetSchema.parse({
			kind: target.kind,
			identity: binaryTargetIdentity(target)
		});
		snapshotBinding = (profile) => bindingSchema.parse({
			provider: profile.provider,
			analysis_profile: profile
		});
		snapshotMatchesTarget = (snapshot, target) => sameTargetIdentity(snapshot.identity, binaryTargetIdentity(target));
		snapshotMatchesProfile = (binding, profile) => committedProvidersEqual(binding.provider, profile.provider) && analysisProfilesEqual(binding.analysis_profile, profile);
		snapshotBindingMismatch = (snapshot, target, profile) => {
			const targetMatches = snapshotMatchesTarget(snapshot.target, target);
			const profileMatches = profile !== undefined && snapshotMatchesProfile(snapshot.binding, profile);
			if (targetMatches && profileMatches) return undefined;
			return {
				...targetMatches ? {} : { target: {
					snapshot: { ...snapshot.target },
					selected: snapshotTarget(target)
				} },
				...profile === undefined ? { profile_comparison: "not_compared" } : {
					...committedProvidersEqual(snapshot.binding.provider, profile.provider) ? {} : { provider: {
						snapshot: { ...snapshot.binding.provider },
						selected: { ...profile.provider }
					} },
					...profileMatches ? {} : { profile_digest: {
						snapshot: snapshot.binding.analysis_profile.digest,
						selected: profile.digest
					} }
				}
			};
		};
		snapshotEvidenceForQuery = (snapshot, query) => {
			const { target, bindingProfile, operation, parameters, provider, evidenceProfile } = query;
			if (snapshotBindingMismatch(snapshot, target, bindingProfile) !== undefined) return undefined;
			const encodedParameters = canonicalJson(parameters);
			const queryId = analysisQueryId(snapshot.target, snapshot.binding, operation, parameters);
			const entry = snapshot.entries.find((candidate) => candidate.query_id === queryId);
			const workflowEntry = snapshot.workflow_entries.find((candidate) => candidate.query_id === queryId);
			if (entry === undefined && workflowEntry === undefined) return undefined;
			let evidence;
			for (const record of snapshot.evidence_bundle.records) {
				if (!(evidenceFileTarget(record)?.sha256 === target.sha256 && record.operation === operation && committedProvidersEqual(record.provider, provider) && record.analysis_profile !== null && analysisProfilesEqual(record.analysis_profile, evidenceProfile) && canonicalJson(record.parameters) === encodedParameters && (entry !== undefined && evidenceMatchesEntry(record, entry, snapshot) || workflowEntry !== undefined && evidenceMatchesWorkflowEntry(record, workflowEntry, snapshot)))) continue;
				if (evidence !== undefined && evidence.evidence_id !== record.evidence_id) return undefined;
				evidence = record;
			}
			return evidence === undefined ? undefined : rebindEvidenceToTargetPath(evidence, target);
		};
		createAnalysisSnapshotWorkflowEntry = (input) => {
			const { target, binding, operation, parameters, execution } = input;
			if (!committedProvidersEqual(execution.provider, execution.analysisProfile.provider)) throw new TypeError("Workflow snapshot execution provider does not match its profile");
			return {
				query_id: analysisQueryId(target, binding, operation, parameters),
				operation,
				parameters: jsonObjectSchema.parse(parameters),
				execution: {
					...snapshotExecutionProjection(execution, execution.analysisProfile.provider),
					analysis_profile: analysisProfileSchema.parse(execution.analysisProfile)
				}
			};
		};
		evidenceMatchesEntry = (evidence, entry, snapshot) => isCorrespondingEvidence(evidence, snapshot) && compositeKey([evidenceQueryKey(evidence), evidenceContentDigest(evidence)]) === entryEvidenceKey(entry, snapshot.binding);
		analysisQueryId = (target, binding, operation, parameters) => `query_${sha256Hex(canonicalJson({
			target,
			binding,
			operation,
			parameters
		}))}`;
		createAnalysisSnapshotEntry = (input) => {
			const { target, binding, operation, parameters, execution } = input;
			if (execution.analysisProfile === undefined || !snapshotMatchesProfile(binding, execution.analysisProfile) || !committedProvidersEqual(execution.provider, binding.provider)) throw new TypeError("Snapshot execution does not match its provider/profile binding");
			return {
				query_id: analysisQueryId(target, binding, operation, parameters),
				operation,
				parameters: jsonObjectSchema.parse(parameters),
				execution: snapshotExecutionProjection(execution, binding.provider)
			};
		};
		validatedSnapshots = new WeakMap();
		parseAnalysisSnapshot = (input) => authenticateSnapshot(input).parsed;
		authenticateSnapshot = (input) => {
			if (typeof input === "object" && input !== null) {
				const owned = validatedSnapshots.get(input);
				if (owned !== undefined) return {
					parsed: owned,
					restored: owned
				};
			}
			const parsed = analysisSnapshotSchema.parse(input);
			const restored = restoreSnapshot(parsed, parseSnapshotBundle(parsed.evidence_bundle, parseEvidenceBundle), parsed.entries.map((entry) => ({
				kind: "provider",
				entry,
				digest: snapshotContentDigest(entry.execution.result, entry.execution.raw_result, entry.execution)
			})), parsed.workflow_entries.map((entry) => ({
				kind: "workflow",
				entry,
				digest: snapshotContentDigest(entry.execution.result, entry.execution.raw_result, entry.execution)
			})));
			return {
				parsed,
				restored
			};
		};
		immutableAnalysisSnapshot = (input) => sealSnapshot(authenticateSnapshot(input).restored);
		sealSnapshot = (snapshot) => {
			for (const entry of [...snapshot.entries, ...snapshot.workflow_entries]) {
				freezeJsonSnapshot(entry.execution.result);
				freezeJsonSnapshot(entry.execution.raw_result);
			}
			freezeJsonSnapshot(snapshot);
			validatedSnapshots.set(snapshot, snapshot);
			return snapshot;
		};
		restoreSnapshot = (header, bundle, providerRows, workflowRows) => {
			const scopedEvidence = evidenceBundleForTarget(bundle, header.target.identity.sha256);
			if (scopedEvidence.records.length !== bundle.records.length || scopedEvidence.unknowns.length !== bundle.unknowns.length) throw new TypeError("Analysis snapshot evidence contains records unrelated to the selected target and its linked sources");
			if (!hasCanonicalQueryOrder(providerRows.map(({ entry }) => entry))) throw new TypeError("Analysis snapshot entries are not canonical");
			if (!hasCanonicalQueryOrder(workflowRows.map(({ entry }) => entry))) throw new TypeError("Analysis snapshot workflow entries are not canonical");
			const ids = new Set();
			const corresponding = new Set();
			const matching = new Map();
			for (const evidence of bundle.records) {
				if (evidence.predicate_type !== "rea.analysis" || evidence.authority !== "shipped-artifact" || evidenceFileTarget(evidence)?.sha256 !== header.target.identity.sha256 || evidence.analysis_profile === null || evidence.confidence !== "observed" && evidence.confidence !== "derived") continue;
				if (evidence.confidence === "observed" && !isCorrespondingEvidence(evidence, header)) continue;
				const query = compositeKey([evidence.confidence, evidenceQueryKey(evidence)]);
				corresponding.add(query);
				matching.set(compositeKey([query, evidenceContentDigest(evidence)]), evidence);
			}
			const find = (query, digest, label, operation) => {
				const evidence = matching.get(compositeKey([query, digest]));
				if (evidence !== undefined) return evidence;
				throw new TypeError(corresponding.has(query) ? `Analysis snapshot ${label} ${operation} differs from its Evidence record` : `Analysis snapshot ${label} ${operation} has no profile-bound Evidence record`);
			};
			const checkId = (entry, workflow) => {
				const expected = analysisQueryId(header.target, header.binding, entry.operation, entry.parameters);
				if (entry.query_id !== expected) throw new TypeError(workflow ? "Analysis snapshot workflow query identifier does not match" : "Analysis snapshot query identifier does not match");
				if (ids.has(entry.query_id)) throw new TypeError("Analysis snapshot contains duplicate queries");
				ids.add(entry.query_id);
			};
			const entries = providerRows.map(({ entry, digest }) => {
				if (!committedProvidersEqual(entry.execution.provider, header.binding.provider)) throw new TypeError("Analysis snapshot entry provider does not match");
				checkId(entry, false);
				const evidence = find(compositeKey(["observed", entryQueryKey(entry, header.binding)]), digest, "entry", entry.operation);
				return {
					...entry,
					execution: {
						...entry.execution,
						result: evidence.normalized_result,
						raw_result: evidence.raw_result
					}
				};
			});
			const workflow_entries = workflowRows.map(({ entry, digest }) => {
				const provider = entry.execution.analysis_profile.provider;
				if (!committedProvidersEqual(entry.execution.provider, provider)) throw new TypeError("Analysis snapshot workflow entry provider does not match its profile");
				checkId(entry, true);
				const evidence = find(compositeKey(["derived", workflowEntryQueryKey(entry)]), digest, "workflow entry", entry.operation);
				return {
					...entry,
					execution: {
						...entry.execution,
						result: evidence.normalized_result,
						raw_result: evidence.raw_result
					}
				};
			});
			return {
				target: header.target,
				binding: header.binding,
				entries,
				workflow_entries,
				evidence_bundle: bundle
			};
		};
		hasCanonicalQueryOrder = (entries) => {
			let previous;
			for (const { query_id: queryId } of entries) {
				if (previous !== undefined && compareUnicodeCodePoints(previous, queryId) > 0) return false;
				previous = queryId;
			}
			return true;
		};
		subjectNamesSnapshotTarget = (evidence, target) => {
			const file = evidenceFileTarget(evidence);
			const expected = target.identity;
			if (file === undefined || file.sha256 !== expected.sha256) return false;
			return file.format !== expected.format || sameTargetIdentity(file, expected);
		};
		isCorrespondingEvidence = (evidence, snapshot) => evidence.predicate_type === "rea.analysis" && evidence.confidence === "observed" && evidence.authority === "shipped-artifact" && subjectNamesSnapshotTarget(evidence, snapshot.target) && evidence.analysis_profile !== null && analysisProfilesEqual(evidence.analysis_profile, snapshot.binding.analysis_profile);
		evidenceQueryKey = (evidence) => contentDigest({
			operation: evidence.operation,
			parameters: evidence.parameters,
			provider: evidence.provider,
			analysis_profile: evidence.analysis_profile
		});
		entryQueryKey = (entry, binding) => contentDigest({
			operation: entry.operation,
			parameters: entry.parameters,
			provider: entry.execution.provider,
			analysis_profile: binding.analysis_profile
		});
		entryEvidenceKey = (entry, binding) => compositeKey([entryQueryKey(entry, binding), snapshotContentDigest(entry.execution.result, entry.execution.raw_result, entry.execution)]);
		workflowEntryQueryKey = (entry) => contentDigest({
			operation: entry.operation,
			parameters: entry.parameters,
			provider: entry.execution.provider,
			analysis_profile: entry.execution.analysis_profile
		});
		workflowEntryEvidenceKey = (entry) => compositeKey([workflowEntryQueryKey(entry), snapshotContentDigest(entry.execution.result, entry.execution.raw_result, entry.execution)]);
		isWorkflowEvidence = (evidence, snapshot, entry) => evidence.predicate_type === "rea.analysis" && evidence.confidence === "derived" && evidence.authority === "shipped-artifact" && subjectNamesSnapshotTarget(evidence, snapshot.target) && evidence.analysis_profile !== null && analysisProfilesEqual(evidence.analysis_profile, entry.execution.analysis_profile) && committedProvidersEqual(evidence.provider, entry.execution.provider);
		evidenceMatchesWorkflowEntry = (evidence, entry, snapshot) => isWorkflowEvidence(evidence, snapshot, entry) && compositeKey([evidenceQueryKey(evidence), evidenceContentDigest(evidence)]) === workflowEntryEvidenceKey(entry);
		evidenceContentMetadata = (evidence) => {
			return {
				limitations: evidence.limitations,
				relationship_coverage: evidence.relationship_coverage,
				locations: evidence.locations,
				subject: subjectContent(evidence.subject)
			};
		};
		serializeAnalysisSnapshot = (snapshot) => `${canonicalJson(parseAnalysisSnapshot(snapshot))}\n`;
	})))();
}

//#endregion
//#region dist/application/EvidenceFileEnvelope.js
var evidenceFileEnvelopeKind, snapshotWrongEvidenceKind;
function init_EvidenceFileEnvelope() {
	return (init_EvidenceFileEnvelope = __esmMin((() => {
		init_analysisSnapshot();
		init_evidenceErrors();
		init_callerPath();
		evidenceFileEnvelopeKind = (value) => {
			if (isRecord(value) && Object.hasOwn(value, "records")) return "evidence-bundle";
			return resemblesAnalysisSnapshot(value) ? "analysis-snapshot" : "other";
		};
		snapshotWrongEvidenceKind = (path, operation, expected) => {
			const importing = operation === "import_evidence_bundle";
			const explanation = "This JSON appears to be an analysis snapshot. Its snapshot content has not been validated.";
			return new EvidenceFileError("read", "wrong-kind", {
				path: absoluteCallerPath(path),
				detectedKind: "analysis-snapshot",
				related: { operations: importing ? ["open_binary", "export_evidence_bundle"] : ["export_evidence_bundle"] },
				userMessage: importing ? `${explanation} To restore it, use a matching target, provider and analysis profile: call open_binary with snapshot_path set to this file to load the snapshot, and close_binary with snapshot_path to save updated state. Alternatively, supply a bundle from export_evidence_bundle.` : expected === "bundle" ? `${explanation} Supply a standalone Evidence bundle from export_evidence_bundle for this input.` : `${explanation} Supply a standalone Evidence record or bundle for this input. Use export_evidence_bundle to export a bundle from a session.`
			});
		};
	})))();
}

//#endregion
//#region dist/application/EvidenceBundleFiles.js
var EvidenceBundleFiles_exports = /* @__PURE__ */ __exportAll({ readImmutableEvidenceBundle: () => readImmutableEvidenceBundle });
var evidenceBundleExportReceipt, readEvidenceBundle, readImmutableEvidenceBundle, readComparisonEvidenceBundles, readBundle, authenticateEvidenceBundleValue, validateBundlePayloads, writeEvidenceBundle;
function init_EvidenceBundleFiles() {
	return (init_EvidenceBundleFiles = __esmMin((() => {
		init_jsonValue();
		init_analysisErrorCleanup();
		init_JsonAuthenticationHeadroom();
		init_callerPath();
		init_validationFailure();
		init_evidenceBundle();
		init_evidenceErrors();
		init_result();
		init_analysisErrorCore();
		init_processCaptureParsing();
		init_jsonSerialization();
		init_EvidenceFileEnvelope();
		init_JsonFiles();
		init_resources();
		evidenceBundleExportReceipt = (bundle, published) => ({
			path: published.path,
			bytes: published.bytes,
			records: bundle.records.length,
			unknowns: bundle.unknowns.length
		});
		readEvidenceBundle = (path, signal, resources, operation = "import_evidence_bundle") => readBundle(path, false, signal, resources, operation);
		readImmutableEvidenceBundle = (path, signal, resources, operation = "import_evidence_bundle") => readBundle(path, true, signal, resources, operation);
		readComparisonEvidenceBundles = async (leftPath, rightPath, signal, resources, operation = "compare_bundles") => {
			const [left, right] = await Promise.all([readImmutableEvidenceBundle(leftPath, signal, resources, operation), readImmutableEvidenceBundle(rightPath, signal, resources, operation)]);
			if (!left.ok) {
				if (!right.ok && right.error.cleanupIncomplete) return err(analysisErrorWithCleanupDependencies(left.error, right.error, operation));
				return left;
			}
			if (!right.ok) return right;
			return ok({
				left: left.value,
				right: right.value
			});
		};
		readBundle = async (path, immutable, signal, resources, operation = "import_evidence_bundle") => {
			if (signal?.aborted) return err(cancelledBy(operation, signal));
			const loaded = await readJsonFile(path, signal, resources, operation);
			if (!loaded.ok) return loaded;
			if (signal?.aborted) return err(cancelledBy(operation, signal));
			if (evidenceFileEnvelopeKind(loaded.value) === "analysis-snapshot") return err(snapshotWrongEvidenceKind(path, operation, "bundle"));
			return authenticateEvidenceBundleValue(loaded.value, path, {
				operation,
				immutable
			});
		};
		authenticateEvidenceBundleValue = (value, path, options) => {
			const { operation } = options;
			const headroom = requireAuthenticationHeadroom(value, {
				operation,
				path: absoluteCallerPath(path),
				description: "Insufficient heap headroom to authenticate the Evidence bundle"
			});
			if (!headroom.ok) return headroom;
			const parsed = options.immutable === true ? safeParseImmutableEvidenceBundle(value) : safeParseEvidenceBundle(value);
			if (!parsed.ok) {
				const failure = parsed.error;
				if (failure.kind === "single-record") return err(new EvidenceFileError("read", "wrong-kind", {
					path: absoluteCallerPath(path),
					cause: failure.cause,
					detectedKind: "evidence-record",
					userMessage: failure.message
				}));
				return err(new EvidenceIntegrityError("Evidence bundle validation failed", {
					cause: failure.cause,
					userMessage: failure.message
				}));
			}
			return validateBundlePayloads(parsed.value, path, operation);
		};
		validateBundlePayloads = (bundle, path, operation) => {
			for (const record of bundle.records) {
				if (record.predicate_type !== "rea.process-capture") continue;
				const headroom = requireAuthenticationHeadroom(record.normalized_result, {
					operation,
					path: absoluteCallerPath(path),
					description: `Insufficient heap headroom to validate process capture ${record.evidence_id} in the Evidence bundle`
				});
				if (!headroom.ok) return headroom;
				const parsedCapture = safeParseProcessCapture(record.normalized_result);
				if (!parsedCapture.success) {
					return err(new EvidenceIntegrityError("Evidence bundle validation failed", {
						cause: parsedCapture.error,
						userMessage: `Process capture record ${record.evidence_id} has an invalid normalized_result (${describeValidationFailure(parsedCapture.error)}). Recreate or re-export the bundle, then try again.`
					}));
				}
			}
			return ok(bundle);
		};
		writeEvidenceBundle = async (bundle, path, overwrite, resources, signal, operation = "export_evidence_bundle") => {
			if (signal?.aborted === true) return err(cancelledBy(operation, signal));
			if (!isImmutableEvidenceBundle(bundle)) {
				const issue = jsonValueValidationIssue(bundle);
				if (issue !== undefined) return err(new EvidenceIntegrityError("Evidence checkpoint is not ordinary JSON", { userMessage: issue }));
				const headroom = requireAuthenticationHeadroom(bundle, {
					operation,
					path: absoluteCallerPath(path),
					description: "Insufficient heap headroom to authenticate the Evidence checkpoint"
				});
				if (!headroom.ok) return headroom;
			}
			const checked = safeParseEvidenceBundle(bundle);
			if (!checked.ok) {
				return err(new EvidenceIntegrityError("Evidence bundle validation failed", { cause: checked.error.cause }));
			}
			const validated = validateBundlePayloads(checked.value, path, operation);
			if (!validated.ok) return validated;
			return writeTextParts(bufferedJsonParts(canonicalJsonParts(validated.value)), path, overwrite, resources, signal === undefined ? undefined : {
				signal,
				operation
			});
		};
	})))();
}

//#endregion
//#region dist/application/analysisView/evidenceFileSource.js
var ANALYSIS_VIEW_SOURCE, selectionError, RECORD_REFERENCE_PREVIEW_BYTES, selectBundleRecord, listRecordIds, EVIDENCE_CONTENT_ISSUE_BUDGET_BYTES, boundedContentIssues, readEvidenceFileSource;
function init_evidenceFileSource() {
	return (init_evidenceFileSource = __esmMin((() => {
		init_JsonAuthenticationHeadroom();
		init_EvidenceBundleFiles();
		init_analysisErrorCore();
		init_analysisViewErrors();
		init_result();
		init_evidenceValidation();
		init_evidenceFormat();
		init_evidenceErrors();
		init_inputIssueProjection();
		init_JsonFiles();
		init_EvidenceFileEnvelope();
		ANALYSIS_VIEW_SOURCE = {
			operation: INSPECT_ANALYSIS_VIEW_OPERATION,
			path: ["source"]
		};
		selectionError = (site, message) => new AnalysisInputError(site.operation, { userMessage: message }, [{
			path: [...site.path, "evidence_id"],
			reason: "invalid_value",
			message
		}]);
		RECORD_REFERENCE_PREVIEW_BYTES = 2048;
		selectBundleRecord = (records, path, evidenceId, site) => {
			if (evidenceId !== undefined) {
				const selected = records.find((record) => record.evidence_id === evidenceId);
				return selected === undefined ? err(selectionError(site, `Evidence bundle ${path} holds no record ${evidenceId}. It holds ${listRecordIds(records)}.`)) : ok(selected);
			}
			const only = records[0];
			if (only === undefined) return err(selectionError(site, `Evidence bundle ${path} holds no records.`));
			if (records.length > 1) return err(selectionError(site, `Evidence bundle ${path} holds ${String(records.length)} records; select one with ${[...site.path, "evidence_id"].join(".")}. It holds ${listRecordIds(records)}.`));
			return ok(only);
		};
		listRecordIds = (records) => {
			const labels = [];
			let bytes = 0;
			for (const record of records) {
				const separator = labels.length === 0 ? "" : ", ";
				const remaining = RECORD_REFERENCE_PREVIEW_BYTES - bytes;
				let label = `${record.evidence_id} (operation omitted)`;
				if (record.operation.length <= remaining) {
					const complete = `${record.evidence_id} (${record.operation})`;
					if (Buffer.byteLength(JSON.stringify(separator + complete), "utf8") <= remaining) label = complete;
				}
				const encodedBytes = Buffer.byteLength(JSON.stringify(separator + label), "utf8");
				if (encodedBytes > remaining) break;
				labels.push(label);
				bytes += encodedBytes;
			}
			const omitted = records.length - labels.length;
			const listed = labels.join(", ");
			return omitted > 0 ? `${listed} and ${String(omitted)} more` : listed;
		};
		EVIDENCE_CONTENT_ISSUE_BUDGET_BYTES = 65536;
		boundedContentIssues = (issues, input) => {
			const bounded = projectInputIssuesBounded(issues, input, EVIDENCE_CONTENT_ISSUE_BUDGET_BYTES);
			if (bounded.omittedIssueCount === 0) return bounded.issues;
			return [...bounded.issues, {
				path: [],
				reason: "invalid_value",
				message: `${String(bounded.omittedIssueCount)} of ${String(issues.length)} validator issues were omitted because they do not fit the response budget; repair the reported fields and retry.`
			}];
		};
		readEvidenceFileSource = async (path, options = {}, evidenceId, site = ANALYSIS_VIEW_SOURCE) => {
			const { signal, resources } = options;
			const { operation } = site;
			const resolveSelected = site.resolveSelected ?? ((selected) => ok(selected));
			if (signal?.aborted) return err(cancelledBy(operation, signal));
			const loaded = await readJsonFile(path, signal, resources, operation);
			if (!loaded.ok) return loaded;
			if (signal?.aborted) return err(cancelledBy(operation, signal));
			const value = loaded.value;
			const kind = evidenceFileEnvelopeKind(value);
			if (kind === "analysis-snapshot") return err(snapshotWrongEvidenceKind(path, operation, "record-or-bundle"));
			if (kind === "evidence-bundle") {
				const bundle = authenticateEvidenceBundleValue(value, path, {
					operation,
					immutable: true
				});
				if (!bundle.ok) return bundle;
				const selected = selectBundleRecord(bundle.value.records, path, evidenceId, site);
				return selected.ok ? resolveSelected(selected.value, (id) => bundle.value.records.find((record) => record.evidence_id === id)) : selected;
			}
			const headroom = requireAuthenticationHeadroom(value, {
				operation,
				path,
				description: "Insufficient heap headroom to authenticate the Evidence file"
			});
			if (!headroom.ok) return headroom;
			const parsed = safeParseImmutableEvidence(value);
			if (!parsed.ok) return err(isUnsupportedEvidenceFormat(parsed.error) ? unsupportedEvidenceFormatError(parsed.error) : new EvidenceFileError("read", "wrong-kind", {
				path,
				cause: parsed.error,
				contentIssues: boundedContentIssues(parsed.error.issues, value),
				userMessage: "The selected file does not contain valid Evidence. Repair or recreate the file and try again."
			}));
			if (evidenceId !== undefined && parsed.value.evidence_id !== evidenceId) return err(selectionError(site, `Evidence file ${path} holds ${parsed.value.evidence_id}, not selected record ${evidenceId}.`));
			return resolveSelected(parsed.value, (id) => parsed.value.evidence_id === id ? parsed.value : undefined);
		};
	})))();
}

//#endregion
//#region dist/application/EvidenceInputResolver.js
/** Resolve only schema-declared Evidence fields, sharing one lookup per exact ID. */
function resolveEvidenceRequest(operation, rawInput, schema, lookup, options = {}) {
	const contract = getEvidenceInputContract(schema);
	const parsed = parseAnalysisInput(operation, rawInput, contract.frameSchema, options.signal);
	if (!parsed.ok) return parsed;
	const records = new Map();
	const read = (id) => {
		if (!records.has(id)) records.set(id, lookup?.(id));
		return records.get(id);
	};
	const sources = new Set();
	const result = contract.resolve(parsed.value, (input, path) => {
		if (options.signal?.aborted) return err(cancelledBy(operation, options.signal));
		let selected = input;
		if (typeof input === "object" && input !== null && "kind" in input) {
			const reference = retainedEvidenceReferenceSchema.safeParse(input);
			if (!reference.success) return err(analysisInputErrorFromIssues(operation, reference.error.issues.map((issue) => ({
				...issue,
				path: [...path, ...issue.path]
			})), rawInput, { cause: reference.error }));
			const found = resolveEvidenceInput(reference.data, read, options.referenceScope);
			if (!found.ok) return err(new EvidenceReferenceError(found.error.evidenceId, found.error.reason, {
				cause: found.error,
				expected: found.error.expected,
				actual: found.error.actual,
				referenceScope: found.error.referenceScope,
				diagnostics: { input_path: [...path] }
			}));
			selected = found.value;
		}
		if (options.readEvidence !== undefined) {
			const admitted = options.readEvidence(selected, path);
			if (!admitted.ok) {
				if (admitted.error.diagnostics?.input_path === undefined) admitted.error.retainDiagnostics({ input_path: [...path] });
				return admitted;
			}
			selected = admitted.value;
		}
		sources.add(selected);
		return ok(selected);
	});
	if (result.ok && options.signal?.aborted) return err(cancelledBy(operation, options.signal));
	return result.ok ? ok({
		input: result.value,
		sources: [...sources]
	}) : result;
}
var resolveEvidenceInput, resolvePairedEvidenceSources, resolveEvidenceSource;
function init_EvidenceInputResolver() {
	return (init_EvidenceInputResolver = __esmMin((() => {
		init_evidenceInputContract();
		init_evidenceReference();
		init_analysisErrorCore();
		init_evidenceErrors();
		init_result();
		init_inputIssueProjection();
		init_AnalysisInput();
		init_evidenceFileSource();
		resolveEvidenceInput = (input, lookup, referenceScope) => {
			if (!("kind" in input)) return ok(input);
			const record = lookup?.(input.evidence_id);
			if (record === undefined) return err(new EvidenceReferenceError(input.evidence_id, "missing", {
				expected: "Evidence available to the selected source",
				actual: null,
				referenceScope
			}));
			if (record.evidence_id !== input.evidence_id) return err(new EvidenceReferenceError(input.evidence_id, "identity_mismatch", {
				expected: input.evidence_id,
				actual: record.evidence_id
			}));
			return ok(record);
		};
		resolvePairedEvidenceSources = async (input, lookup, options) => {
			const left = await resolveEvidenceSource(input.left, "left", lookup, options);
			if (!left.ok) return left;
			const right = await resolveEvidenceSource(input.right, "right", lookup, options);
			if (!right.ok) return right;
			return ok({
				...input,
				left: left.value,
				right: right.value
			});
		};
		resolveEvidenceSource = async (input, side, lookup, options) => {
			if ("kind" in input && input.kind === "evidence-file") return readEvidenceFileSource(input.path, options, input.evidence_id, {
				operation: options.operation,
				path: [side],
				resolveSelected: (selected, fileLookup) => options.resolveEvidence?.(selected, (id) => fileLookup(id) ?? lookup?.(id), side) ?? ok(selected)
			});
			const selected = resolveEvidenceInput(input, lookup);
			return selected.ok ? options.resolveEvidence?.(selected.value, lookup, side) ?? selected : selected;
		};
	})))();
}

//#endregion
export { EvidenceBundleFiles_exports, analysisQueryId, createAnalysisSnapshotEntry, createAnalysisSnapshotWorkflowEntry, estimateJsonArrayScalarEntry, estimateJsonStorage, evidenceBundleExportReceipt, evidenceMatchesEntry, evidenceMatchesWorkflowEntry, immutableAnalysisSnapshot, init_EvidenceBundleFiles, init_EvidenceInputResolver, init_JsonAuthenticationHeadroom, init_analysisSnapshot, init_evidenceFileSource, parseAnalysisSnapshot, parsePreparedAnalysisSnapshot, prepareSnapshotEntry, readComparisonEvidenceBundles, readEvidenceBundle, readEvidenceFileSource, readImmutableEvidenceBundle, requireAuthenticationHeadroom, resolveEvidenceInput, resolveEvidenceRequest, resolvePairedEvidenceSources, serializeAnalysisSnapshot, snapshotBinding, snapshotBindingMismatch, snapshotEvidenceForQuery, snapshotMatchesProfile, snapshotMatchesTarget, snapshotTarget, writeEvidenceBundle };