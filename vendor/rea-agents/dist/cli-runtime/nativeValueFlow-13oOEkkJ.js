import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, EvidenceIntegrityError, MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS, ParseFailureError, absoluteLocalPathStringSchema, canBorrowParsedJsonSnapshot, errorMessage, freezeJsonSnapshot, freezeOwnedJsonTreeSnapshot, immutableJsonSnapshotMember, init_analysisErrorCore, init_analysisResourceLimits, init_errorMessage, init_evidenceErrors, init_immutableJson, init_isRecord, init_jsonValue, init_localPath, init_parseFailure, init_sha256Hex, isImmutableJsonSnapshot, isRecord, jsonObjectSchema, jsonValueSchema, jsonValueValidationIssue, jsonValueValidationSteps, nulFreeStringSchema, sha256Hex, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_strictUtf8, isStrictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { CanonicalDigestError, digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_jsonRecord, jsonRecordSchema } from "./jsonRecord-Cuy_NNu4.js";
import { init_relationshipCoverage, relationshipCoverageSchema } from "./relationshipCoverage-2rn3-vch.js";
import { BINARY_ARCHITECTURES, RAW_ONLY_ARCHITECTURES, init_binaryTargetTypes } from "./binaryTargetTypes-CrE-Muhh.js";
import { BINARY_TARGET_FORMATS, BINARY_TARGET_FORMAT_KINDS, init_targetFormats, targetFormatsOfKind } from "./targetFormats-BjyLMHym.js";
import { binaryTargetIdentity, digestSchema, fileTargetSelectionSchema, init_digests, init_targetIdentity, nonFileTargetIdentitySchema, prefixedDigestSchema, sameTargetIdentity, sessionTargetIdentitySchema, unknownTargetIdentitySchema } from "./targetIdentity-rKLLVwEj.js";
import { basename } from "node:path";
import { z } from "zod";
import { isDeepStrictEqual } from "node:util";
import { createHash } from "node:crypto";
import canonicalize from "canonicalize";

//#region dist/domain/evidenceFormat.js
var EVIDENCE_FORMAT_REVISION, RECREATE_EVIDENCE_GUIDANCE, evidenceFormatSchema, EVIDENCE_BUNDLE_FORMAT, EVIDENCE_RECORD_FORMAT, isUnsupportedEvidenceFormat, admitFormat, RECORD_MEMBERS, admitEvidenceRecordFormat, admitEvidenceBundleFormat;
function init_evidenceFormat() {
	return (init_evidenceFormat = __esmMin((() => {
		init_parseFailure();
		EVIDENCE_FORMAT_REVISION = 2;
		RECREATE_EVIDENCE_GUIDANCE = "Recreate observations with the current REA release; re-exporting an earlier bundle does not update its format or identities.";
		evidenceFormatSchema = z.literal(2, { error: `evidence_format must be ${String(2)}. ${RECREATE_EVIDENCE_GUIDANCE}` });
		EVIDENCE_BUNDLE_FORMAT = "evidence-bundle";
		EVIDENCE_RECORD_FORMAT = "evidence-record";
		isUnsupportedEvidenceFormat = (cause) => cause instanceof ParseFailureError && cause.kind === "unsupported" && (cause.failure.format === EVIDENCE_BUNDLE_FORMAT || cause.failure.format === EVIDENCE_RECORD_FORMAT);
		admitFormat = (input, format, noun) => {
			const found = Reflect.get(input, "evidence_format");
			if (found === 2) return;
			throw unsupportedInput(format, `${found === undefined ? `This ${noun} predates format revision ${String(2)}` : `${noun} format ${JSON.stringify(found)} is not format ${String(2)}`}, which this REA release reads. ${RECREATE_EVIDENCE_GUIDANCE}`, {
				field: "evidence_format",
				undecodedContent: true
			});
		};
		RECORD_MEMBERS = [
			"evidence_id",
			"provider",
			"predicate_type",
			"operation",
			"normalized_result"
		];
		admitEvidenceRecordFormat = (input) => {
			if (!isRecord(input) || !Object.hasOwn(input, "evidence_id")) return;
			if (Object.hasOwn(input, "evidence_format") || RECORD_MEMBERS.every((member) => Object.hasOwn(input, member))) admitFormat(input, EVIDENCE_RECORD_FORMAT, "Evidence record");
		};
		admitEvidenceBundleFormat = (input) => {
			if (!isRecord(input) || !Object.hasOwn(input, "records")) return;
			admitFormat(input, EVIDENCE_BUNDLE_FORMAT, "Evidence bundle");
			if (Array.isArray(input.records)) for (const record of input.records) admitEvidenceRecordFormat(record);
		};
	})))();
}

//#endregion
//#region dist/domain/evidenceSubject.js
var nonArtifactTargetFormats, trailingArchiveIndex, evidenceSubjectFormatSchema, detectedEvidenceSubjectDeclaration, rawEvidenceSubjectDeclaration, gamecubeEvidenceSubjectDeclaration, withEvidenceSubjectDeclaration;
function init_evidenceSubject() {
	return (init_evidenceSubject = __esmMin((() => {
		init_binaryTargetTypes();
		init_targetFormats();
		nonArtifactTargetFormats = BINARY_TARGET_FORMATS.filter((format) => format !== "mach-o-universal" && BINARY_TARGET_FORMAT_KINDS[format] !== "artifact");
		trailingArchiveIndex = nonArtifactTargetFormats.indexOf("intel-hex");
		evidenceSubjectFormatSchema = z.enum([
			"hopper",
			...nonArtifactTargetFormats.slice(0, trailingArchiveIndex),
			...targetFormatsOfKind("artifact"),
			"directory",
			"file",
			"unknown",
			"mach-o-universal",
			"javascript-bundle",
			"entitlements",
			"pyinstaller",
			"node-sea",
			"dotnet-bundle",
			"bun-standalone",
			"deno-standalone",
			...nonArtifactTargetFormats.slice(trailingArchiveIndex)
		]);
		detectedEvidenceSubjectDeclaration = {
			format: evidenceSubjectFormatSchema.exclude(["raw-binary", "gamecube-dol"]),
			architecture: z.enum(BINARY_ARCHITECTURES).exclude([...RAW_ONLY_ARCHITECTURES]).nullable()
		};
		rawEvidenceSubjectDeclaration = {
			format: z.literal("raw-binary"),
			architecture: z.enum(BINARY_ARCHITECTURES).nullable()
		};
		gamecubeEvidenceSubjectDeclaration = {
			format: z.literal("gamecube-dol"),
			architecture: z.literal("powerpc")
		};
		withEvidenceSubjectDeclaration = (base) => z.discriminatedUnion("format", [
			base.extend(detectedEvidenceSubjectDeclaration),
			base.extend(rawEvidenceSubjectDeclaration),
			base.extend(gamecubeEvidenceSubjectDeclaration)
		]);
	})))();
}

//#endregion
//#region dist/domain/canonicalJsonDigestSteps.js
/** Hash owned, validated JSON in bounded steps without a document-sized string. */
function* canonicalJsonDigestSteps(value) {
	const hash = createHash("sha256");
	const ancestors = new Set();
	const stack = [{
		kind: "value",
		value
	}];
	const encodedKeys = new Map();
	let remainingKeyCodeUnits = 8192;
	let buffered = "";
	let flushed = false;
	const emit = (part) => {
		buffered += part;
		if (buffered.length >= 8192) {
			hash.update(buffered);
			buffered = "";
			flushed = true;
		}
	};
	try {
		while (stack.length > 0) {
			if (flushed) {
				flushed = false;
				yield;
			}
			const frame = stack.pop();
			if (frame === undefined) break;
			if (frame.kind === "separator") {
				emit(":");
				continue;
			}
			if (frame.kind === "string") {
				if (frame.index === frame.value.length) {
					emit("\"");
					continue;
				}
				let end = Math.min(frame.index + 8192, frame.value.length);
				const last = frame.value.charCodeAt(end - 1);
				const next = frame.value.charCodeAt(end);
				if (end < frame.value.length && last >= 55296 && last <= 56319 && next >= 56320 && next <= 57343) end -= 1;
				emit(JSON.stringify(frame.value.slice(frame.index, end)).slice(1, -1));
				frame.index = end;
				stack.push(frame);
				continue;
			}
			let item;
			if (frame.kind === "array") {
				if (frame.index === frame.length) {
					emit("]");
					ancestors.delete(frame.value);
					continue;
				}
				const element = frame.value[frame.index];
				if (element === undefined) throw new TypeError("Canonical JSON digest requires dense JSON arrays");
				if (frame.index++ > 0) emit(",");
				stack.push(frame);
				item = element;
			} else if (frame.kind === "object") {
				if (frame.index === frame.keys.length) {
					emit("}");
					ancestors.delete(frame.value);
					continue;
				}
				const key = frame.keys[frame.index++];
				if (key === undefined) throw new TypeError("Canonical JSON object changed during hashing");
				const property = frame.value[key];
				if (property === undefined) {
					stack.push(frame);
					continue;
				}
				if (frame.written++ > 0) emit(",");
				if (key.length > 8192) {
					emit("\"");
					stack.push(frame, {
						kind: "value",
						value: property
					}, { kind: "separator" }, {
						kind: "string",
						value: key,
						index: 0
					});
					continue;
				}
				let encodedKey = encodedKeys.get(key);
				if (encodedKey === undefined) {
					encodedKey = JSON.stringify(key);
					if (encodedKey.length <= remainingKeyCodeUnits) {
						encodedKeys.set(key, encodedKey);
						remainingKeyCodeUnits -= encodedKey.length;
					}
				}
				emit(encodedKey);
				emit(":");
				stack.push(frame);
				item = property;
			} else {
				item = frame.value;
			}
			if (flushed) {
				flushed = false;
				yield;
			}
			if (typeof item === "string" && item.length > 8192) {
				emit("\"");
				stack.push({
					kind: "string",
					value: item,
					index: 0
				});
			} else if (item === null || typeof item !== "object") {
				if (typeof item === "number" && !Number.isFinite(item)) throw new CanonicalDigestError(Number.isNaN(item) ? "nan" : "infinity");
				emit(JSON.stringify(item));
			} else {
				if (ancestors.has(item)) throw new CanonicalDigestError("circular");
				ancestors.add(item);
				if (Array.isArray(item)) {
					emit("[");
					stack.push({
						kind: "array",
						value: item,
						length: item.length,
						index: 0
					});
				} else {
					emit("{");
					stack.push({
						kind: "object",
						value: item,
						keys: Object.keys(item).sort(),
						index: 0,
						written: 0
					});
				}
			}
		}
		if (buffered !== "") hash.update(buffered);
		return hash.digest("hex");
	} finally {
		stack.length = 0;
		ancestors.clear();
		encodedKeys.clear();
		buffered = "";
	}
}
function init_canonicalJsonDigestSteps() {
	return (init_canonicalJsonDigestSteps = __esmMin((() => {
		init_canonicalDigest();
	})))();
}

//#endregion
//#region dist/domain/analysisProfile.js
var committedProviderSchema, unsignedAnalysisProfileSchema, analysisProfileSchema, createAnalysisProfile, committedProvidersEqual, analysisProfilesEqual, profileDigest;
function init_analysisProfile() {
	return (init_analysisProfile = __esmMin((() => {
		init_canonicalDigest();
		init_jsonValue();
		init_digests();
		committedProviderSchema = z.strictObject({
			id: z.string().min(1),
			name: z.string().min(1),
			version: z.string().min(1)
		});
		unsignedAnalysisProfileSchema = z.strictObject({
			provider: committedProviderSchema,
			parameters: jsonObjectSchema
		});
		analysisProfileSchema = unsignedAnalysisProfileSchema.extend({ digest: digestSchema }).superRefine((profile, context) => {
			const { digest: _digest, ...unsigned } = profile;
			if (profileDigest(unsigned) !== profile.digest) context.addIssue({
				code: "custom",
				path: ["digest"],
				message: "Analysis profile digest does not match its parameters"
			});
		});
		createAnalysisProfile = (provider, parameters) => {
			const unsigned = unsignedAnalysisProfileSchema.parse({
				provider: {
					id: provider.id,
					name: provider.name,
					version: provider.version
				},
				parameters
			});
			return analysisProfileSchema.parse({
				...unsigned,
				digest: profileDigest(unsigned)
			});
		};
		committedProvidersEqual = (left, right) => left.id === right.id && left.name === right.name && left.version === right.version;
		analysisProfilesEqual = (left, right) => left.digest === right.digest && committedProvidersEqual(left.provider, right.provider);
		profileDigest = (profile) => digestCanonicalValue(profile, "Analysis profile");
	})))();
}

//#endregion
//#region dist/domain/evidence.js
/** Create Evidence from owned immutable JSON while exposing cooperative computation steps. */
function* createImmutableEvidenceSteps(target, provider, observation) {
	if (!isImmutableJsonSnapshot(observation.result)) throw new TypeError("Cooperative Evidence requires an authenticated immutable result");
	yield* jsonValueValidationSteps(observation.result);
	const { normalized } = normalizeEvidenceObservation(target, provider, observation);
	const digest = yield* canonicalJsonDigestSteps(evidenceSemanticContent(normalized));
	return rememberImmutableEvidence({
		...normalized,
		evidence_id: `ev_${digest}`
	});
}
var ANALYSIS_EVIDENCE_PREDICATE, providerSchema, SELECTION_FORMATS, subjectIdentitySchema, fileSubjectSchema, sessionSubjectIdentitySchema, nonFileSubjectSchema, subjectSchema, evidenceSubjectSchema, evidenceLocationSchema, evidenceAuthoritySchema, executionEnvironmentSchema, callerInputPathsSchema, evidenceBaseSchema, validateAnalysisProfileProvider, evidenceSchema, authenticatedEvidenceSchema, immutableEvidenceSnapshots, immutableResultSchema, isFileSubject, evidenceSubjectTarget, evidenceSubjectInput, evidenceSubjectTargetIdentity, rebindEvidenceSubjectTargetPath, evidenceSubject, evidenceTargetIdentity, evidenceFileTarget, evidenceSubjectDisplay, evidenceSemanticContent, computeEvidenceId, parseEvidence, evidenceDisplayMetadataAgree, immutableEvidence, rebindEvidenceToTargetPath, withEvidenceCallerInputPath, rememberReboundEvidence, isImmutableEvidence, rememberImmutableEvidence, createEvidence, evidenceEnvelopeForAdmission, normalizeEvidenceObservation;
function init_evidence() {
	return (init_evidence = __esmMin((() => {
		init_evidenceFormat();
		init_evidenceSubject();
		init_canonicalDigest();
		init_canonicalJsonDigestSteps();
		init_localPath();
		init_targetIdentity();
		init_analysisProfile();
		init_jsonValue();
		init_immutableJson();
		init_digests();
		init_relationshipCoverage();
		ANALYSIS_EVIDENCE_PREDICATE = "rea.analysis";
		providerSchema = z.strictObject({
			id: z.string().min(1),
			name: z.string().min(1),
			version: z.string().nullable()
		});
		SELECTION_FORMATS = {
			"entry-point": ["raw-binary", "gamecube-dol"],
			"esp-flash": ["esp-flash-image"],
			"universal-slice": ["mach-o-universal"]
		};
		subjectIdentitySchema = withEvidenceSubjectDeclaration(z.strictObject({
			kind: z.literal("file"),
			sha256: digestSchema,
			selection: fileTargetSelectionSchema.nullable()
		})).superRefine((identity, context) => {
			if (identity.selection !== null && !SELECTION_FORMATS[identity.selection.kind].includes(identity.format)) context.addIssue({
				code: "custom",
				path: ["selection"],
				message: `A ${identity.selection.kind} selection does not apply to format ${identity.format}`
			});
		});
		fileSubjectSchema = z.strictObject({
			/** The committed target identity; the remaining members are display facts. */
			identity: subjectIdentitySchema,
			name: z.string().min(1),
			local_path: nulFreeStringSchema
		});
		sessionSubjectIdentitySchema = sessionTargetIdentitySchema.extend({ target: z.union([subjectIdentitySchema, unknownTargetIdentitySchema]) });
		nonFileSubjectSchema = z.strictObject({
			identity: z.union([nonFileTargetIdentitySchema, sessionSubjectIdentitySchema]),
			name: z.null(),
			local_path: z.null()
		});
		subjectSchema = z.union([fileSubjectSchema, nonFileSubjectSchema]);
		evidenceSubjectSchema = subjectSchema;
		evidenceLocationSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("address"),
				address: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("address-range"),
				start: z.string().min(1),
				end: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("artifact-path"),
				path: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("file-offset"),
				offset: z.int().min(0)
			}),
			z.strictObject({
				kind: z.literal("file-offset-range"),
				start: z.int().min(0),
				end: z.int().min(0)
			})
		]);
		evidenceAuthoritySchema = z.enum([
			"shipped-artifact",
			"controlled-replay",
			"historical-reference",
			"external-service",
			"analyst-inference"
		]);
		executionEnvironmentSchema = z.strictObject({
			id: z.string().min(1),
			platform: z.string().min(1),
			architecture: z.string().min(1),
			isolation: z.enum([
				"none",
				"process",
				"container",
				"virtual-machine"
			])
		});
		callerInputPathsSchema = z.record(nulFreeStringSchema, z.union([nulFreeStringSchema, z.array(nulFreeStringSchema)]));
		evidenceBaseSchema = z.object({
			evidence_id: prefixedDigestSchema("ev"),
			/** Selects the reader; not part of the committed content. */
			evidence_format: evidenceFormatSchema,
			subject: subjectSchema,
			provider: providerSchema,
			analysis_profile: analysisProfileSchema.nullable(),
			predicate_type: z.string().min(1),
			operation: z.string().min(1),
			parameters: jsonObjectSchema,
			/** Verbatim selected path; present only when the request selected one directly. */
			caller_input_path: nulFreeStringSchema.exactOptional().describe("Verbatim direct-request path; not part of semantic identity."),
			caller_input_paths: callerInputPathsSchema.exactOptional().describe("Verbatim auxiliary input paths keyed by argument name; repeated selections retain their order. Caller assertions are outside semantic identity."),
			raw_result: jsonValueSchema.nullable(),
			normalized_result: jsonValueSchema,
			confidence: z.enum([
				"observed",
				"derived",
				"inferred"
			]),
			authority: evidenceAuthoritySchema,
			environment: executionEnvironmentSchema.nullable(),
			limitations: z.array(z.string()),
			relationship_coverage: relationshipCoverageSchema.nullable(),
			locations: z.array(evidenceLocationSchema),
			evidence_links: z.array(prefixedDigestSchema("ev"))
		}).strict();
		validateAnalysisProfileProvider = (evidence, context) => {
			const profile = evidence.analysis_profile;
			if (profile !== null && (profile.provider.id !== evidence.provider.id || profile.provider.name !== evidence.provider.name || profile.provider.version !== evidence.provider.version)) context.addIssue({
				code: "custom",
				path: ["analysis_profile", "provider"],
				message: "Analysis profile provider does not match Evidence provider"
			});
		};
		evidenceSchema = evidenceBaseSchema.superRefine(validateAnalysisProfileProvider);
		authenticatedEvidenceSchema = evidenceSchema.superRefine((evidence, context) => {
			const { evidence_id: evidenceId, ...withoutId } = evidence;
			if (computeEvidenceId(withoutId) !== evidenceId) context.addIssue({
				code: "custom",
				path: ["evidence_id"],
				message: "Evidence semantic identifier does not match its record"
			});
		});
		immutableEvidenceSnapshots = new WeakMap();
		immutableResultSchema = z.custom(isImmutableJsonSnapshot).superRefine((value, context) => {
			const issue = jsonValueValidationIssue(value);
			if (issue !== undefined) context.addIssue({
				code: "custom",
				message: issue
			});
		});
		isFileSubject = (subject) => subject?.identity.kind === "file";
		evidenceSubjectTarget = (subject) => !isFileSubject(subject) ? undefined : {
			path: subject.local_path,
			sha256: subject.identity.sha256,
			format: subject.identity.format,
			name: subject.name,
			...subject.identity.architecture === null ? {} : { architecture: subject.identity.architecture },
			...subject.identity.selection === null ? {} : { selection: subject.identity.selection }
		};
		evidenceSubjectInput = (subject) => isFileSubject(subject) ? evidenceSubjectTarget(subject) : subject.identity;
		evidenceSubjectTargetIdentity = (target) => "kind" in target ? binaryTargetIdentity(target) : {
			kind: "file",
			sha256: target.sha256,
			format: target.format,
			architecture: target.architecture ?? null,
			selection: target.selection ?? null
		};
		rebindEvidenceSubjectTargetPath = (subject, target) => sameTargetIdentity(evidenceSubjectTargetIdentity(subject), evidenceSubjectTargetIdentity(target)) ? {
			...subject,
			path: target.path
		} : subject;
		evidenceSubject = (target) => subjectSchema.parse("path" in target ? {
			identity: evidenceSubjectTargetIdentity(target),
			name: ("name" in target ? target.name : undefined) ?? (basename(target.path) || "artifact"),
			local_path: target.path
		} : {
			identity: target,
			name: null,
			local_path: null
		});
		evidenceTargetIdentity = (evidence) => evidence.subject?.identity ?? null;
		evidenceFileTarget = (evidence) => {
			const identity = evidenceTargetIdentity(evidence);
			return identity?.kind === "file" ? identity : undefined;
		};
		evidenceSubjectDisplay = (evidence) => {
			const subject = evidence.subject;
			return isFileSubject(subject) ? {
				name: subject.name,
				local_path: subject.local_path
			} : undefined;
		};
		evidenceSemanticContent = (evidence) => ({
			subject: evidence.subject.identity,
			provider: evidence.provider,
			analysis_profile: evidence.analysis_profile,
			predicate_type: evidence.predicate_type,
			operation: evidence.operation,
			parameters: evidence.parameters,
			raw_result: evidence.raw_result,
			normalized_result: evidence.normalized_result,
			confidence: evidence.confidence,
			authority: evidence.authority,
			environment: evidence.environment,
			limitations: evidence.limitations,
			relationship_coverage: evidence.relationship_coverage,
			locations: evidence.locations,
			evidence_links: evidence.evidence_links
		});
		computeEvidenceId = (evidence) => `ev_${digestCanonicalValue(evidenceSemanticContent(evidence), "Evidence")}`;
		parseEvidence = (input) => {
			const immutable = typeof input === "object" && input !== null ? immutableEvidenceSnapshots.get(input) : undefined;
			if (immutable !== undefined) return immutable;
			admitEvidenceRecordFormat(input);
			return authenticatedEvidenceSchema.parse(input);
		};
		evidenceDisplayMetadataAgree = (left, right) => left.subject?.name === right.subject?.name && left.subject?.local_path === right.subject?.local_path && left.caller_input_path === right.caller_input_path && isDeepStrictEqual(left.caller_input_paths, right.caller_input_paths);
		immutableEvidence = (input) => {
			const parsed = parseEvidence(input);
			return rememberImmutableEvidence(canBorrowParsedJsonSnapshot(input, parsed) ? input : parsed);
		};
		rebindEvidenceToTargetPath = (evidence, target) => {
			const subject = evidence.subject;
			if (!isFileSubject(subject)) return evidence;
			if (!sameTargetIdentity(subject.identity, evidenceSubjectTargetIdentity(target))) return evidence;
			if (target.path === subject.local_path && (target.name === undefined || target.name === subject.name)) return evidence;
			const reboundSubject = subjectSchema.parse({
				...subject,
				name: target.name ?? (basename(target.path) || "artifact"),
				local_path: target.path
			});
			const reboundEvidence = {
				...evidence,
				subject: reboundSubject
			};
			if (!isImmutableEvidence(evidence)) return immutableEvidence(reboundEvidence);
			return rememberReboundEvidence(evidence, reboundEvidence);
		};
		withEvidenceCallerInputPath = (evidence, rawPath, additionalPaths) => {
			const callerInputPath = rawPath === undefined ? undefined : nulFreeStringSchema.parse(rawPath);
			const owned = immutableEvidence(evidence);
			const paths = additionalPaths === undefined ? undefined : callerInputPathsSchema.parse(additionalPaths);
			const samePaths = paths === undefined || isDeepStrictEqual(owned.caller_input_paths, paths);
			if ((callerInputPath === undefined || owned.caller_input_path === callerInputPath) && samePaths) return owned;
			const rebound = {
				...owned,
				...callerInputPath === undefined ? {} : { caller_input_path: callerInputPath },
				...paths === undefined ? {} : { caller_input_paths: paths }
			};
			return rememberReboundEvidence(owned, rebound);
		};
		rememberReboundEvidence = (source, rebound) => {
			for (const key of Object.keys(source)) immutableJsonSnapshotMember(source, key);
			return rememberImmutableEvidence(rebound);
		};
		isImmutableEvidence = (evidence) => immutableEvidenceSnapshots.has(evidence);
		rememberImmutableEvidence = (evidence) => {
			freezeJsonSnapshot(evidence);
			immutableEvidenceSnapshots.set(evidence, evidence);
			return evidence;
		};
		createEvidence = (target, provider, observation, options) => {
			const { normalized, sharedResult } = normalizeEvidenceObservation(target, provider, observation, options?.callerTarget);
			const evidence = {
				...normalized,
				evidence_id: computeEvidenceId(normalized)
			};
			if (sharedResult || options?.immutable === true) {
				freezeOwnedJsonTreeSnapshot(evidence);
				immutableEvidenceSnapshots.set(evidence, evidence);
			}
			return evidence;
		};
		evidenceEnvelopeForAdmission = (target, provider, observation, callerTarget) => {
			const subject = evidenceSubject(target);
			const callerInputPath = callerTarget?.callerInputPath !== undefined && isFileSubject(subject) && subject.local_path === callerTarget.path && sameTargetIdentity(subject.identity, binaryTargetIdentity(callerTarget)) ? callerTarget.callerInputPath : undefined;
			return {
				...callerInputPath === undefined ? {} : { caller_input_path: callerInputPath },
				evidence_id: `ev_${"0".repeat(64)}`,
				evidence_format: 2,
				subject,
				provider: {
					id: provider.id,
					name: provider.name,
					version: provider.version
				},
				analysis_profile: observation.analysisProfile ?? null,
				predicate_type: observation.predicateType ?? "rea.analysis",
				operation: observation.operation,
				parameters: observation.parameters,
				raw_result: observation.rawResult ?? null,
				normalized_result: observation.result,
				confidence: observation.confidence ?? "observed",
				authority: observation.authority ?? (subject.identity.kind === "unknown" ? "analyst-inference" : "shipped-artifact"),
				environment: observation.environment ?? null,
				limitations: observation.limitations ?? [],
				...observation.relationshipCoverage === undefined ? { relationship_coverage: null } : { relationship_coverage: observation.relationshipCoverage },
				locations: observation.locations ?? [],
				evidence_links: observation.evidenceLinks ?? []
			};
		};
		normalizeEvidenceObservation = (target, provider, observation, callerTarget) => {
			const envelope = evidenceEnvelopeForAdmission(target, provider, observation, callerTarget);
			const sharedResult = typeof observation.result === "object" && observation.result !== null && isImmutableJsonSnapshot(observation.result);
			const selectedSchema = sharedResult ? evidenceSchema.safeExtend({ normalized_result: immutableResultSchema }) : evidenceSchema;
			const normalized = selectedSchema.parse(envelope);
			return {
				normalized,
				sharedResult
			};
		};
	})))();
}

//#endregion
//#region dist/domain/validationFailure.js
var firstValidationIssue, describeValidationFailure;
function init_validationFailure() {
	return (init_validationFailure = __esmMin((() => {
		init_errorMessage();
		firstValidationIssue = (cause) => {
			if (!(cause instanceof z.ZodError)) return undefined;
			const [first, ...rest] = cause.issues;
			if (first === undefined) return undefined;
			const constraint = first.code === "custom" ? first.params?.["constraint"] : undefined;
			return {
				path: first.path.map((key) => typeof key === "number" ? key : String(key)),
				constraint: typeof constraint === "string" ? constraint : undefined,
				remainingIssueCount: rest.length
			};
		};
		describeValidationFailure = (cause) => {
			if (!(cause instanceof z.ZodError)) return errorMessage(cause);
			const [first, ...rest] = cause.issues;
			const location = first === undefined || first.path.length === 0 ? "the document root" : first.path.map(String).join(".");
			return `at ${location}: ${first?.message ?? "invalid value"}${rest.length === 0 ? "" : ` (${String(rest.length)} more issues)`}`;
		};
	})))();
}

//#endregion
//#region dist/domain/evidenceValidation.js
var safeParseEvidence, safeParseImmutableEvidence, recognizeEvidence, unsupportedEvidenceFormatError, readEvidence, readImmutableEvidence, authenticateEvidence, readEvidencePayload, validationIssueOptions, integrityFailure;
function init_evidenceValidation() {
	return (init_evidenceValidation = __esmMin((() => {
		init_evidence();
		init_evidenceErrors();
		init_evidenceFormat();
		init_validationFailure();
		init_result();
		safeParseEvidence = (input) => authenticateEvidence(input, parseEvidence);
		safeParseImmutableEvidence = (input) => authenticateEvidence(input, immutableEvidence);
		recognizeEvidence = (input) => typeof input === "object" && input !== null && "evidence_id" in input ? readEvidence(input) : ok(undefined);
		unsupportedEvidenceFormatError = (cause, side) => new EvidenceIntegrityError(cause.message, {
			cause,
			userMessage: cause.message,
			...side === undefined ? {} : { side }
		});
		readEvidence = (input, location) => {
			const parsed = safeParseEvidence(input);
			return parsed.ok ? parsed : err(integrityFailure(parsed.error, {
				...location,
				within: []
			}));
		};
		readImmutableEvidence = (input) => {
			const parsed = safeParseImmutableEvidence(input);
			return parsed.ok ? parsed : err(integrityFailure(parsed.error, { within: [] }));
		};
		authenticateEvidence = (input, parse) => {
			try {
				return ok(parse(input));
			} catch (cause) {
				if (cause instanceof z.ZodError || isUnsupportedEvidenceFormat(cause)) return err(cause);
				throw cause;
			}
		};
		readEvidencePayload = (schema, input, location) => {
			const parsed = schema.safeParse(input);
			return parsed.success ? ok(parsed.data) : err(integrityFailure(parsed.error, location));
		};
		validationIssueOptions = (cause, within) => {
			const issue = firstValidationIssue(cause);
			if (issue === undefined) return {};
			return {
				...within === undefined ? {} : { issuePath: [...within, ...issue.path] },
				...issue.constraint === undefined ? {} : { constraint: issue.constraint },
				remainingIssueCount: issue.remainingIssueCount
			};
		};
		integrityFailure = (cause, location) => {
			if (isUnsupportedEvidenceFormat(cause)) return unsupportedEvidenceFormatError(cause, location?.side);
			const message = `Evidence validation failed ${describeValidationFailure(cause)}`;
			return new EvidenceIntegrityError(message, {
				cause,
				userMessage: message,
				...location?.side === undefined ? {} : { side: location.side },
				...validationIssueOptions(cause, location?.within)
			});
		};
	})))();
}

//#endregion
//#region dist/domain/comparisonSemantics.js
var absenceClaimable, canonicalJson;
function init_comparisonSemantics() {
	return (init_comparisonSemantics = __esmMin((() => {
		absenceClaimable = (coverage) => coverage.status === "complete" && coverage.truncated !== true && (coverage.omitted_count === undefined || coverage.omitted_count === 0);
		canonicalJson = (value, context = "Comparison") => {
			const encoded = canonicalize(value);
			if (encoded === undefined) throw new TypeError(`${context} could not canonicalize data`);
			return encoded;
		};
	})))();
}

//#endregion
//#region dist/domain/evidenceInputContract.js
var declarations, referenceAlternatives, borrowedDeclarations, isDeclaredEvidenceInput, declareEvidenceInput, declareEvidenceReferenceAlternative, declareBorrowedEvidenceInput, contracts, identity, getEvidenceInputContract, compile, replaceWrappedSchema, objectContract, arrayContract, unionContract;
function init_evidenceInputContract() {
	return (init_evidenceInputContract = __esmMin((() => {
		init_result();
		declarations = z.registry();
		referenceAlternatives = z.registry();
		borrowedDeclarations = new WeakMap();
		isDeclaredEvidenceInput = (schema) => declarations.get(schema) !== undefined;
		declareEvidenceInput = (schema) => {
			declarations.add(schema, { kind: "evidence" });
			return schema;
		};
		declareEvidenceReferenceAlternative = (schema) => {
			referenceAlternatives.add(schema, { retained: true });
			return schema;
		};
		declareBorrowedEvidenceInput = (schema, declaration) => {
			const owner = {};
			borrowedDeclarations.set(owner, declaration);
			declarations.add(schema, {
				kind: "borrowed",
				owner
			});
			return schema;
		};
		contracts = new WeakMap();
		identity = (schema, hasEvidenceReferenceAlternative = false) => ({
			frameSchema: schema,
			hasEvidence: false,
			hasEvidenceReferenceAlternative,
			resolve: (input) => ok(input)
		});
		getEvidenceInputContract = (schema) => {
			const existing = contracts.get(schema);
			if (existing !== undefined) return existing;
			const result = compile(schema);
			contracts.set(schema, result);
			return result;
		};
		compile = (schema) => {
			if (referenceAlternatives.get(schema) !== undefined) return identity(schema, true);
			const declared = declarations.get(schema);
			if (declared?.kind === "evidence") return {
				frameSchema: z.unknown().nonoptional(),
				hasEvidence: true,
				hasEvidenceReferenceAlternative: true,
				resolve: (input, visit, path = []) => visit(input, path)
			};
			if (declared?.kind === "borrowed") {
				const declaration = borrowedDeclarations.get(declared.owner);
				if (declaration === undefined) throw new TypeError("Borrowed Evidence schema has no owning declaration");
				const source = getEvidenceInputContract(declaration);
				return {
					...source,
					frameSchema: schema
				};
			}
			if (schema instanceof z.ZodObject) return objectContract(schema);
			if (schema instanceof z.ZodArray) return arrayContract(schema);
			if (schema instanceof z.ZodUnion) return unionContract(schema);
			if (schema instanceof z.ZodOptional || schema instanceof z.ZodExactOptional || schema instanceof z.ZodNullable || schema instanceof z.ZodDefault || schema instanceof z.ZodPrefault || schema instanceof z.ZodNonOptional || schema instanceof z.ZodReadonly) {
				const child = getEvidenceInputContract(schema.unwrap());
				if (!child.hasEvidence) return identity(schema, child.hasEvidenceReferenceAlternative);
				return {
					hasEvidence: true,
					hasEvidenceReferenceAlternative: child.hasEvidenceReferenceAlternative,
					frameSchema: replaceWrappedSchema(schema, child.frameSchema),
					resolve: (input, visit, path = []) => input === undefined || input === null && schema instanceof z.ZodNullable ? ok(input) : child.resolve(input, visit, path)
				};
			}
			return identity(schema);
		};
		replaceWrappedSchema = (schema, innerType) => {
			const definition = {
				...schema.def,
				innerType
			};
			return z.clone(schema, definition, { parent: true });
		};
		objectContract = (schema) => {
			const children = Object.entries(schema.shape).map(([key, child]) => [key, getEvidenceInputContract(child)]);
			const selected = children.filter(([, child]) => child.hasEvidence);
			const hasEvidenceReferenceAlternative = children.some(([, child]) => child.hasEvidenceReferenceAlternative);
			if (selected.length === 0) return identity(schema, hasEvidenceReferenceAlternative);
			return {
				hasEvidence: true,
				hasEvidenceReferenceAlternative,
				frameSchema: schema.clone({
					...schema.def,
					shape: Object.fromEntries(children.map(([key, child]) => [key, child.frameSchema]))
				}, { parent: true }),
				resolve: (input, visit, path = []) => {
					if (typeof input !== "object" || input === null || Array.isArray(input)) return ok(input);
					let result = input;
					for (const [key, child] of selected) {
						if (!Object.hasOwn(result, key)) continue;
						const value = child.resolve(result[key], visit, [...path, key]);
						if (!value.ok) return value;
						if (value.value !== result[key]) result = {
							...result,
							[key]: value.value
						};
					}
					return ok(result);
				}
			};
		};
		arrayContract = (schema) => {
			const child = getEvidenceInputContract(schema.element);
			if (!child.hasEvidence) return identity(schema, child.hasEvidenceReferenceAlternative);
			return {
				hasEvidence: true,
				hasEvidenceReferenceAlternative: child.hasEvidenceReferenceAlternative,
				frameSchema: schema.clone({
					...schema.def,
					element: child.frameSchema
				}, { parent: true }),
				resolve: (input, visit, path = []) => {
					if (!Array.isArray(input)) return ok(input);
					let result = input;
					for (const [index, item] of input.entries()) {
						const value = child.resolve(item, visit, [...path, index]);
						if (!value.ok) return value;
						if (value.value !== item) {
							if (result === input) result = input.slice();
							result[index] = value.value;
						}
					}
					return ok(result);
				}
			};
		};
		unionContract = (schema) => {
			const options = schema.options.map((option) => getEvidenceInputContract(option));
			const hasEvidenceReferenceAlternative = options.some((option) => option.hasEvidenceReferenceAlternative);
			if (!options.some((option) => option.hasEvidence)) return identity(schema, hasEvidenceReferenceAlternative);
			const branches = new WeakMap();
			const frame = z.union(options.map((option) => option.frameSchema.transform((value) => {
				if (typeof value === "object" && value !== null) branches.set(value, option);
				return value;
			})));
			return {
				hasEvidence: true,
				hasEvidenceReferenceAlternative,
				frameSchema: frame.clone({
					...frame.def,
					...schema.def.error === undefined ? {} : { error: schema.def.error },
					...schema.def.checks === undefined ? {} : { checks: schema.def.checks }
				}),
				resolve: (input, visit, path = []) => {
					const selected = typeof input === "object" && input !== null ? branches.get(input) : undefined;
					return selected?.resolve(input, visit, path) ?? ok(input);
				}
			};
		};
	})))();
}

//#endregion
//#region dist/domain/evidenceReference.js
var retainedEvidenceReferenceSchema, evidenceFileReferenceSchema, evidenceInputSchema, advertisedAs, borrowEvidenceInput, borrowEvidenceArray, evidenceSourceInputSchema;
function init_evidenceReference() {
	return (init_evidenceReference = __esmMin((() => {
		init_digests();
		init_localPath();
		init_evidenceInputContract();
		init_evidence();
		retainedEvidenceReferenceSchema = z.strictObject({
			kind: z.literal("retained-evidence"),
			evidence_id: prefixedDigestSchema("ev")
		});
		evidenceFileReferenceSchema = z.strictObject({
			kind: z.literal("evidence-file"),
			path: absoluteLocalPathStringSchema.describe("Absolute local path of one completed Evidence JSON file, or of an Evidence bundle written by --evidence_output or export_evidence_bundle. REA reads and authenticates it, then uses it like retained Evidence, so large records are not charged as inline input."),
			evidence_id: prefixedDigestSchema("ev").exactOptional().describe("The record to select when the file is an Evidence bundle, such as a summary's normalized_result.parent_evidence_id. A bundle holding exactly one record needs no selection.")
		});
		evidenceInputSchema = declareEvidenceInput(z.union([evidenceSchema, retainedEvidenceReferenceSchema]));
		advertisedAs = (schema, declaration) => {
			const base = schema._zod.constr;
			const Borrowed = z.core.$constructor(`BorrowedEvidence${schema._zod.def.type}`, (instance, definition) => {
				base.init(instance, definition);
				instance._zod.processJSONSchema = (context, json, params) => declaration._zod.processJSONSchema(context, json, params);
			});
			return new Borrowed(schema._zod.def);
		};
		borrowEvidenceInput = () => declareBorrowedEvidenceInput(advertisedAs(z.unknown().nonoptional(), evidenceInputSchema), evidenceInputSchema);
		borrowEvidenceArray = () => {
			const declaration = z.array(evidenceInputSchema);
			return declareBorrowedEvidenceInput(advertisedAs(z.custom(Array.isArray), declaration), declaration);
		};
		evidenceSourceInputSchema = declareEvidenceReferenceAlternative(z.union([...evidenceInputSchema.options, evidenceFileReferenceSchema]));
	})))();
}

//#endregion
//#region dist/domain/native/nativeAddress.js
var nativeAddressObservationSchema, nativeAddressSchema, nativeAddressCoordinateInputSchema, nativeAddressInputSchema;
function init_nativeAddress() {
	return (init_nativeAddress = __esmMin((() => {
		nativeAddressObservationSchema = z.string().regex(/^(?:(?:[A-Za-z0-9._~\x2d]|%[0-9A-F]{2})+:)?0x[0-9a-f]+$/u);
		nativeAddressSchema = z.string().regex(/^(?:(?:[A-Za-z0-9._~\x2d]|%[0-9A-F]{2})+:)?0x(?:0|[1-9a-f][0-9a-f]*)$/u);
		nativeAddressCoordinateInputSchema = z.string().regex(/^(?:(?:[A-Za-z0-9._~\x2d]|%[0-9a-fA-F]{2})+:)?0[xX][0-9a-fA-F]+$/u).transform((address) => {
			const separator = address.lastIndexOf(":") + 1;
			const space = separator === 0 ? null : address.slice(0, separator - 1).replace(/%[0-9a-fA-F]{2}/gu, (escape) => escape.toUpperCase());
			return {
				space,
				offset: BigInt(address.slice(separator))
			};
		});
		nativeAddressInputSchema = nativeAddressCoordinateInputSchema.transform(({ space, offset }) => `${space === null ? "" : `${space}:`}0x${offset.toString(16)}`);
	})))();
}

//#endregion
//#region dist/domain/symlinkTarget.js
var observedSymlinkTarget;
function init_symlinkTarget() {
	return (init_symlinkTarget = __esmMin((() => {
		init_strictUtf8();
		observedSymlinkTarget = (raw) => {
			return {
				text: isStrictUtf8(raw) ? raw.toString("utf8") : null,
				hex: raw.toString("hex")
			};
		};
	})))();
}

//#endregion
//#region dist/domain/offsetDateTime.js
var CALENDAR_DATE, CLOCK_TIME, UTC_OFFSET, offsetDateTimeSchema, utcDateTimeSchema, parseOffsetDateTimeInstant, inspectRecordedDateTime, readRecordedDateTime, readRecordedStart, offsetDateTimeInstantFromEpochMilliseconds, secondsFromMilliseconds, addOffsetDateTimeMilliseconds, compareOffsetDateTimeInstants;
function init_offsetDateTime() {
	return (init_offsetDateTime = __esmMin((() => {
		CALENDAR_DATE = String.raw`(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))`;
		CLOCK_TIME = String.raw`(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?`;
		UTC_OFFSET = String.raw`(?:Z|[+\x2d](?:[01]\d|2[0-3]):[0-5]\d)`;
		offsetDateTimeSchema = z.string().regex(new RegExp(`^${CALENDAR_DATE}T${CLOCK_TIME}${UTC_OFFSET}$`, "u"), "Use an ISO-8601 date-time with an explicit UTC offset");
		utcDateTimeSchema = z.string().regex(new RegExp(`^${CALENDAR_DATE}T${CLOCK_TIME}Z$`, "u"), "Use an ISO-8601 date-time in UTC");
		parseOffsetDateTimeInstant = (value) => {
			const match = /^(.*?)(?:\.(\d+))?(Z|[+\x2d]\d{2}:\d{2})$/u.exec(value);
			if (match === null) throw new TypeError("Expected a validated offset date-time.");
			const [, dateTime, fractionalDigits, offset] = match;
			if (dateTime === undefined || offset === undefined) throw new TypeError("Expected a validated offset date-time.");
			const wholeSecondMilliseconds = Date.parse(`${dateTime}${offset}`);
			if (!Number.isSafeInteger(wholeSecondMilliseconds) || wholeSecondMilliseconds % 1e3 !== 0) throw new TypeError("Offset date-time is outside the supported time range.");
			return {
				epochSecond: wholeSecondMilliseconds / 1e3,
				fraction: fractionalDigits?.replace(/0+$/u, "") ?? ""
			};
		};
		inspectRecordedDateTime = (value) => {
			const match = /^(\d{4}-\d{2}-\d{2})([T ])(\d{2}:\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|[+-]\d{2}:?\d{2})?$/u.exec(value);
			if (match === null) return { kind: "unrecognized" };
			const [, date, separator, time, seconds, fraction = "", zone = ""] = match;
			const offset = zone === "" ? "Z" : zone === "Z" || zone.includes(":") ? zone : `${zone.slice(0, 3)}:${zone.slice(3)}`;
			const normalized = offsetDateTimeSchema.safeParse(`${date}T${time}${seconds === undefined ? "" : `:${seconds}`}${fraction === "" ? "" : `.${fraction}`}${offset}`);
			if (!normalized.success) return { kind: "invalid" };
			return {
				kind: "valid",
				reading: {
					instant: parseOffsetDateTimeInstant(normalized.data),
					spelling: {
						separator,
						secondsPresent: seconds !== undefined,
						fractionDigits: fraction.length,
						zone
					}
				}
			};
		};
		readRecordedDateTime = (value) => {
			const inspected = inspectRecordedDateTime(value);
			return inspected.kind === "valid" ? inspected.reading : undefined;
		};
		readRecordedStart = (value) => {
			const inspected = inspectRecordedDateTime(value);
			if (inspected.kind === "valid") return {
				instant: inspected.reading.instant,
				interpretation: "recorded-iso"
			};
			if (inspected.kind === "invalid") return undefined;
			const milliseconds = Date.parse(value);
			return Number.isFinite(milliseconds) ? {
				instant: offsetDateTimeInstantFromEpochMilliseconds(milliseconds),
				interpretation: "native-date"
			} : undefined;
		};
		offsetDateTimeInstantFromEpochMilliseconds = (epochMilliseconds) => {
			if (!Number.isFinite(epochMilliseconds)) throw new TypeError("Expected finite epoch milliseconds.");
			if (Math.abs(epochMilliseconds) > Number.MAX_SAFE_INTEGER) return {
				epochSecond: epochMilliseconds / 1e3,
				fraction: ""
			};
			const epochSecond = Math.floor(epochMilliseconds / 1e3);
			const millisecondsWithinSecond = epochMilliseconds - epochSecond * 1e3;
			return {
				epochSecond,
				fraction: secondsFromMilliseconds(millisecondsWithinSecond).fraction
			};
		};
		secondsFromMilliseconds = (milliseconds) => {
			if (milliseconds === 0) return {
				seconds: 0,
				fraction: ""
			};
			const [coefficient = "", exponentText] = String(milliseconds).toLowerCase().split("e");
			const exponent = exponentText === undefined ? 0 : Number(exponentText);
			const point = coefficient.indexOf(".");
			const decimalPosition = (point < 0 ? coefficient.length : point) + exponent - 3;
			const digits = coefficient.replace(".", "");
			const fraction = decimalPosition <= 0 ? `0.${"0".repeat(-decimalPosition)}${digits}` : decimalPosition < digits.length ? `${digits.slice(0, decimalPosition)}.${digits.slice(decimalPosition)}` : `${digits}${"0".repeat(decimalPosition - digits.length)}`;
			const separator = fraction.indexOf(".");
			return {
				seconds: Number(separator < 0 ? fraction : fraction.slice(0, separator)),
				fraction: (separator < 0 ? "" : fraction.slice(separator + 1)).replace(/0+$/u, "")
			};
		};
		addOffsetDateTimeMilliseconds = (start, milliseconds) => {
			if (!Number.isFinite(milliseconds) || milliseconds < 0) return undefined;
			if (milliseconds === 0) return start;
			const duration = secondsFromMilliseconds(milliseconds);
			const wholeSeconds = start.epochSecond + duration.seconds;
			if (!Number.isSafeInteger(wholeSeconds)) return undefined;
			const length = Math.max(start.fraction.length, duration.fraction.length);
			const digits = [];
			let carry = 0;
			for (let index = length - 1; index >= 0; index--) {
				const sum = (start.fraction.charCodeAt(index) || 48) - 48 + (duration.fraction.charCodeAt(index) || 48) - 48 + carry;
				digits.push(String(sum % 10));
				carry = Math.floor(sum / 10);
			}
			const epochSecond = wholeSeconds + carry;
			return Number.isSafeInteger(epochSecond) ? {
				epochSecond,
				fraction: digits.reverse().join("").replace(/0+$/u, "")
			} : undefined;
		};
		compareOffsetDateTimeInstants = (left, right) => {
			if (left.epochSecond !== right.epochSecond) return left.epochSecond < right.epochSecond ? -1 : 1;
			const length = Math.max(left.fraction.length, right.fraction.length);
			for (let index = 0; index < length; index += 1) {
				const leftDigit = left.fraction.charCodeAt(index) || 48;
				const rightDigit = right.fraction.charCodeAt(index) || 48;
				if (leftDigit !== rightDigit) return leftDigit < rightDigit ? -1 : 1;
			}
			return 0;
		};
	})))();
}

//#endregion
//#region dist/domain/process/processScenario.js
var positiveBudget, processScenarioOutputBudgetProjectionSchema, PROCESS_TERMINAL_CELL_BUDGET, PROCESS_TERMINAL_MIN_COLUMNS, timedEventBase, reservedRunIdEnvironmentName, ENVIRONMENT_NAME_CHARACTER, environmentNamePattern, environmentName, unsupportedPtyEnvironmentName, ptyEnvironmentName, childProcessString, processEnvironmentSchema, fitsProcessTerminalCellBudget, normalizationSchema, digestProcessCommitment, sensitiveProcessInputProjection, committedScenarioEvents, processScenarioCommitment, processComparisonContract, processScenarioSchema, scenarioRefinements, eventsOutOfOrder, processScenarioPlanProjection, processScenarioPlanEventSchema, _dryRun, _events, processScenarioPlanShape, processScenarioPlanSchema;
function init_processScenario() {
	return (init_processScenario = __esmMin((() => {
		init_jsonRecord();
		init_sha256Hex();
		positiveBudget = z.int().safe().positive();
		processScenarioOutputBudgetProjectionSchema = z.object({ output_bytes: positiveBudget }).passthrough();
		PROCESS_TERMINAL_CELL_BUDGET = 1e6;
		PROCESS_TERMINAL_MIN_COLUMNS = 2;
		timedEventBase = { at_ms: z.int().safe().nonnegative() };
		reservedRunIdEnvironmentName = "REA_PROCESS_RUN_ID";
		ENVIRONMENT_NAME_CHARACTER = "[^=\\x00]";
		environmentNamePattern = (reserved) => {
			let rest = `${ENVIRONMENT_NAME_CHARACTER}+`;
			for (let index = reserved.length - 1; index >= 0; index -= 1) {
				const character = reserved[index] ?? "";
				const choice = `[^=\\x00${character}]${ENVIRONMENT_NAME_CHARACTER}*|${character}${rest}`;
				rest = index === 0 ? choice : `(?:${choice})?`;
			}
			return new RegExp(`^(?:${rest})$`, "u");
		};
		environmentName = z.string().min(1, "Environment names must not be empty").regex(environmentNamePattern(reservedRunIdEnvironmentName), { error: (issue) => issue.input === reservedRunIdEnvironmentName ? `${reservedRunIdEnvironmentName} is reserved by the process adapter` : "Environment names cannot contain '=' or NUL" });
		unsupportedPtyEnvironmentName = "__proto__";
		ptyEnvironmentName = environmentName.regex(environmentNamePattern(unsupportedPtyEnvironmentName), { error: "The installed PTY backend cannot preserve the __proto__ environment name; pass it through /usr/bin/env instead." });
		childProcessString = z.string().regex(/^[^\x00]*$/u, "Values passed to operating-system APIs cannot contain NUL");
		processEnvironmentSchema = jsonRecordSchema(childProcessString, ptyEnvironmentName);
		fitsProcessTerminalCellBudget = (columns, rows, scrollback) => rows + scrollback <= Math.floor(PROCESS_TERMINAL_CELL_BUDGET / columns);
		normalizationSchema = z.object({
			paths: z.boolean(),
			pids: z.boolean(),
			ports: z.boolean(),
			time_bucket_ms: positiveBudget,
			patterns: z.array(z.object({
				pattern: z.string(),
				replacement: z.string()
			}))
		});
		digestProcessCommitment = (value) => {
			const serialized = canonicalize(value);
			if (serialized === undefined) throw new TypeError("Process capture commitment is not canonical JSON");
			return sha256Hex(serialized);
		};
		sensitiveProcessInputProjection = (data) => ({
			data: "",
			sensitive: true,
			input_bytes: Buffer.byteLength(data)
		});
		committedScenarioEvents = (events, includeSensitiveInputLength) => events.map((event) => event.type === "input" && event.sensitive ? {
			...event,
			...includeSensitiveInputLength ? sensitiveProcessInputProjection(event.data) : { data: "" }
		} : event);
		processScenarioCommitment = (scenario, executableSha256) => {
			const { dry_run: _dryRun, finalization_ms: finalizationMs, ...committed } = scenario;
			return {
				...committed,
				...finalizationMs > 0 ? { finalization_ms: finalizationMs } : {},
				events: committedScenarioEvents(scenario.events, true),
				executable_sha256: executableSha256 ?? null
			};
		};
		processComparisonContract = (scenario) => ({
			working_directory: scenario.working_directory,
			environment: scenario.environment,
			ambient_environment: "unknown",
			filesystem_observation_paths: scenario.filesystem_observation_paths,
			terminal: scenario.terminal,
			events: committedScenarioEvents(scenario.events, false),
			timeout_ms: scenario.timeout_ms,
			idle_timeout_ms: scenario.idle_timeout_ms,
			settle_ms: scenario.settle_ms,
			...scenario.finalization_ms > 0 ? { finalization_ms: scenario.finalization_ms } : {},
			limits: scenario.limits,
			normalization: scenario.normalization,
			terminal_observation_version: "deferred-rendered-journal-v1",
			...scenario.events.some((event) => event.type === "input" && event.sensitive) ? { sensitive_input_redaction_version: "literal-terminal-input-v1" } : {},
			...scenario.normalization.pids ? { pid_normalization_version: "sampled-identifiers-v2" } : {},
			...scenario.normalization.paths ? { path_normalization_version: "path-component-boundaries-v4" } : {},
			...scenario.normalization.ports ? { port_normalization_version: "contextual-endpoints-v3" } : {},
			...scenario.normalization.patterns.length > 0 ? { pattern_normalization_version: "literal-replacements-v1" } : {},
			rendered_line_format: "trailing-spaces-trimmed-v1"
		});
		processScenarioSchema = z.strictObject({
			executable: childProcessString.min(1),
			arguments: z.array(childProcessString).default([]),
			dry_run: z.boolean().default(false).describe("Validate and return the resolved scenario without launching it. A planned result is not capture Evidence and records no process observation."),
			working_directory: childProcessString.default("."),
			environment: processEnvironmentSchema.default({}),
			filesystem_observation_paths: z.array(childProcessString.min(1)).default([]),
			terminal: z.strictObject({
				columns: z.int().min(2).max(65535).default(80),
				rows: z.int().min(1).max(65535).default(24),
				scrollback: z.int().safe().nonnegative().default(1e3)
			}).describe("The renderer requires at least 2 columns. The visible terminal and scrollback together must use at most 1,000,000 xterm renderer cells: columns × (rows + scrollback). Resize events use the same minimum width, scrollback and limit. This release has no runtime override.").default({
				columns: 80,
				rows: 24,
				scrollback: 1e3
			}),
			events: z.array(z.discriminatedUnion("type", [
				z.strictObject({
					...timedEventBase,
					type: z.literal("input"),
					data: z.string(),
					sensitive: z.boolean().default(false)
				}),
				z.strictObject({
					...timedEventBase,
					type: z.literal("resize"),
					columns: z.int().min(2).max(65535),
					rows: z.int().min(1).max(65535)
				}),
				z.strictObject({
					...timedEventBase,
					type: z.literal("signal"),
					signal: z.enum([
						"SIGINT",
						"SIGTERM",
						"SIGKILL"
					])
				})
			])).default([]),
			timeout_ms: positiveBudget.default(3e4),
			idle_timeout_ms: positiveBudget.default(3e4),
			settle_ms: z.int().safe().nonnegative().default(100),
			finalization_ms: z.int().safe().nonnegative().default(0).describe("Milliseconds a target may keep running after SIGTERM when timeout_ms or idle_timeout_ms fires, before SIGKILL; 0 sends SIGKILL immediately. Both signals reach the captured root only while its launch-time start identity still matches; cancellation ends the run at once."),
			limits: z.strictObject({
				output_bytes: positiveBudget.default(1e6),
				files: positiveBudget.default(1e4),
				file_bytes: positiveBudget.default(1e7),
				processes: positiveBudget.default(1e3),
				filesystem_depth: z.int().safe().nonnegative().default(16)
			}).strict().default({
				output_bytes: 1e6,
				files: 1e4,
				file_bytes: 1e7,
				processes: 1e3,
				filesystem_depth: 16
			}),
			normalization: z.strictObject({
				paths: z.boolean().default(false),
				pids: z.boolean().default(true),
				ports: z.boolean().default(true),
				time_bucket_ms: positiveBudget.default(10),
				patterns: z.array(z.strictObject({
					pattern: z.string().describe("Literal text to replace in captured output; not a regular expression."),
					replacement: z.string()
				})).default([])
			}).default({
				paths: false,
				pids: true,
				ports: true,
				time_bucket_ms: 10,
				patterns: []
			})
		}).superRefine((scenario, context) => {
			scenarioRefinements(scenario, context);
		});
		scenarioRefinements = (scenario, context) => {
			const lifecycleBudget = BigInt(scenario.timeout_ms) + BigInt(scenario.finalization_ms) + BigInt(scenario.settle_ms);
			if (lifecycleBudget > BigInt(Number.MAX_SAFE_INTEGER)) context.addIssue({
				code: "custom",
				message: `timeout_ms + finalization_ms + settle_ms must stay at or below ${String(Number.MAX_SAFE_INTEGER)} ms, the largest total exactly representable as a JavaScript number`,
				path: ["timeout_ms"]
			});
			if (!fitsProcessTerminalCellBudget(scenario.terminal.columns, scenario.terminal.rows, scenario.terminal.scrollback)) context.addIssue({
				code: "custom",
				path: ["terminal"],
				message: `terminal columns × (rows + scrollback) must not exceed ${String(PROCESS_TERMINAL_CELL_BUDGET)} renderer cells. This release has no runtime override.`
			});
			for (let index = 1; index < scenario.events.length; index += 1) {
				const event = scenario.events[index];
				const previous = scenario.events[index - 1];
				if (eventsOutOfOrder(event, previous)) {
					context.addIssue({
						code: "custom",
						message: "events must be ordered by at_ms",
						path: ["events", index]
					});
				}
			}
			for (const [index, event] of scenario.events.entries()) {
				if (event.type === "resize" && !fitsProcessTerminalCellBudget(event.columns, event.rows, scenario.terminal.scrollback)) context.addIssue({
					code: "custom",
					path: ["events", index],
					message: `resize event at ${String(event.at_ms)} ms exceeds the ${String(PROCESS_TERMINAL_CELL_BUDGET)}-cell renderer budget with the selected scrollback. This release has no runtime override.`
				});
				if (event.at_ms > scenario.timeout_ms) {
					context.addIssue({
						code: "custom",
						message: `event at ${String(event.at_ms)} ms occurs after the ${String(scenario.timeout_ms)} ms scenario timeout`,
						path: ["events", index]
					});
				}
			}
		};
		eventsOutOfOrder = (event, previous) => event !== undefined && previous !== undefined && event.at_ms < previous.at_ms;
		processScenarioPlanProjection = (scenario) => {
			const { dry_run: _dryRun, ...rest } = scenario;
			return {
				...rest,
				events: committedScenarioEvents(rest.events, true)
			};
		};
		processScenarioPlanEventSchema = z.union([
			z.strictObject({
				...timedEventBase,
				type: z.literal("input"),
				data: z.string(),
				sensitive: z.literal(false).default(false),
				input_bytes: z.never().optional()
			}),
			z.strictObject({
				...timedEventBase,
				type: z.literal("input"),
				data: z.literal(""),
				sensitive: z.literal(true),
				input_bytes: z.int().safe().nonnegative()
			}),
			z.strictObject({
				...timedEventBase,
				type: z.literal("resize"),
				columns: z.int().min(2).max(65535),
				rows: z.int().min(1).max(65535)
			}),
			z.strictObject({
				...timedEventBase,
				type: z.literal("signal"),
				signal: z.enum([
					"SIGINT",
					"SIGTERM",
					"SIGKILL"
				])
			})
		]);
		({dry_run: _dryRun, events: _events, ...processScenarioPlanShape} = processScenarioSchema.shape);
		processScenarioPlanSchema = z.strictObject({
			status: z.literal("planned"),
			scenario: z.strictObject({
				...processScenarioPlanShape,
				events: z.array(processScenarioPlanEventSchema).default([])
			}).superRefine(scenarioRefinements),
			ambient_environment: z.literal("inherited-at-run")
		});
	})))();
}

//#endregion
//#region dist/domain/process/processCaptureCoverage.js
var byteRetentionSchema, enumerationOmissionReasonSchema, filesystemCoverageSchema, processCaptureTruncationDetailsSchema, omitted, filesystemTruncated, hasCaptureTruncation, processSourceTruncated;
function init_processCaptureCoverage() {
	return (init_processCaptureCoverage = __esmMin((() => {
		byteRetentionSchema = z.strictObject({
			budget_bytes: z.int().nonnegative(),
			observed_bytes: z.int().nonnegative(),
			retained_bytes: z.int().nonnegative(),
			observed_frames: z.int().nonnegative(),
			retained_frames: z.int().nonnegative(),
			unknown_size_frames: z.int().nonnegative().optional(),
			normalization_over_budget_frames: z.int().nonnegative().optional()
		});
		enumerationOmissionReasonSchema = z.enum([
			"identity_changed",
			"directory_unavailable",
			"entry_unavailable",
			"symlink_not_followed"
		]);
		filesystemCoverageSchema = z.strictObject({
			files_limit: z.int().nonnegative(),
			depth_limit: z.int().nonnegative(),
			enumeration_truncated: z.boolean(),
			enumeration_reasons: z.array(z.enum([
				"files_limit",
				"depth_limit",
				"unrepresentable_name",
				...enumerationOmissionReasonSchema.options
			])),
			enumeration_omissions: z.array(z.union([z.strictObject({
				path: z.string(),
				reason: enumerationOmissionReasonSchema,
				system_code: z.string().nullable()
			}), z.strictObject({
				path: z.string(),
				reason: z.literal("unrepresentable_name"),
				system_code: z.null(),
				raw_name_hex: z.string().regex(/^(?:[0-9a-f]{2})+$/u)
			})])),
			unobserved_subtrees: z.array(z.strictObject({
				path: z.string(),
				reason: z.enum(["symlink_not_followed", "observer_owned"])
			})).optional(),
			hash_budget_bytes: z.int().nonnegative(),
			hashed_bytes: z.int().nonnegative(),
			hash_omissions: z.array(z.strictObject({
				path: z.string(),
				size_bytes: z.int().nonnegative(),
				remaining_budget_bytes: z.int().nonnegative(),
				reason: z.enum([
					"file_bytes_budget",
					"file_changed_or_short_read",
					"file_unavailable"
				]),
				system_code: z.string().nullable()
			}))
		});
		processCaptureTruncationDetailsSchema = z.strictObject({
			raw_terminal: byteRetentionSchema.extend({ redacted_bytes: z.int().nonnegative().optional() }).describe("Original PTY UTF-8 admission accounting. retained_bytes counts the safe projection; redacted_bytes counts removed bytes from admitted chunks. Their sum consumes the original output budget. Whole chunks are otherwise retained or omitted."),
			rendered_terminal: byteRetentionSchema.describe("Cumulative UTF-8 bytes of serialized state plus visible lines, evaluated from retained PTY input; whole frames are retained or omitted. observed_bytes contains the exact total for size-known frames; unknown_size_frames counts frames whose complete size was not calculated. normalization_over_budget_frames identifies the subset stopped by an ordered normalization stage rather than final representation retention."),
			normalized_terminal: z.strictObject({
				budget_bytes: z.int().nonnegative(),
				retained_bytes: z.int().nonnegative(),
				omitted_frames: z.int().nonnegative()
			}).optional().describe("UTF-8 bytes of normalized raw-chunk text retained under output_bytes; omitted frames can have unknown final size when normalization exceeded an intermediate bound."),
			filesystem_before: filesystemCoverageSchema,
			filesystem_after: filesystemCoverageSchema,
			process: z.strictObject({
				sample_limit: z.int().nonnegative(),
				sampling_partial: z.boolean(),
				retained_samples: z.int().nonnegative(),
				sample_limit_reached: z.boolean(),
				sampling_failures: z.int().nonnegative(),
				first_sampling_failure: z.string().nullable(),
				coverage: z.literal("sampled")
			})
		});
		omitted = (retention) => retention.observed_frames > retention.retained_frames;
		filesystemTruncated = (coverage) => coverage.enumeration_truncated || coverage.enumeration_omissions.length > 0 || coverage.hash_omissions.length > 0;
		hasCaptureTruncation = (details) => omitted(details.raw_terminal) || omitted(details.rendered_terminal) || (details.normalized_terminal?.omitted_frames ?? 0) > 0 || (details.rendered_terminal.unknown_size_frames ?? 0) > 0 || filesystemTruncated(details.filesystem_before) || filesystemTruncated(details.filesystem_after) || details.process.sampling_partial;
		processSourceTruncated = (capture, source) => {
			const details = capture.truncation_details;
			switch (source) {
				case "terminal_raw": return omitted(details.raw_terminal);
				case "terminal_rendered": return omitted(details.raw_terminal) || omitted(details.rendered_terminal);
				case "filesystem": return filesystemTruncated(details.filesystem_before) || filesystemTruncated(details.filesystem_after);
				case "process": return details.process.sampling_partial;
				case "interaction":
				case "lifecycle": return false;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/process/processCaptureValidation.js
var sameJsonValue, orderedTimestamps, validateCommitments, validateOrdering, validateEventJournal, finalizationManifestIssue, finalizationAgreementIssue, finalizationConsistencyIssue, validateLifecycle, validateCoverage, collectProcessCaptureIssues;
function init_processCaptureValidation() {
	return (init_processCaptureValidation = __esmMin((() => {
		init_processScenario();
		init_processCaptureCoverage();
		sameJsonValue = (left, right) => {
			const encoded = canonicalize(left);
			return encoded !== undefined && encoded === canonicalize(right);
		};
		orderedTimestamps = (values) => values.every((value, index) => {
			const previous = values[index - 1];
			return previous === undefined || value >= previous;
		});
		validateCommitments = (capture, require) => {
			const { manifest } = capture;
			require(manifest.scenario.executable_sha256 === manifest.selected_executable_sha256, "manifest.selected_executable_sha256", "selected executable commitment does not match the scenario projection");
			require(manifest.executable_identity.state === "path_metadata_unchanged" ? manifest.executable_sha256 === manifest.selected_executable_sha256 && manifest.executable_identity.reason === null : manifest.executable_sha256 === null && manifest.executable_identity.reason !== null, "manifest.executable_identity", "launch identity and executable digest do not agree");
			require(manifest.root_process.state === "withheld-by-caller" === capture.normalization.pids, "manifest.root_process", "root process identity must be withheld exactly when PID normalization is selected");
			for (const [field, value] of [
				["full_scenario_sha256", manifest.scenario],
				["comparison_contract_sha256", manifest.comparison_contract],
				["normalization_sha256", capture.normalization]
			]) require(manifest[field] === digestProcessCommitment(value), `manifest.${field}`, "commitment does not match its canonical value");
		};
		validateOrdering = (capture, require) => {
			for (const [name, values] of [
				["frames", capture.frames],
				["rendered_frames", capture.rendered_frames],
				["interaction_events", capture.interaction_events]
			]) require(values.every(({ sequence }, index) => sequence === index), name, "sequence values must be contiguous from zero");
			for (const [name, values] of [
				["frames", capture.frames],
				["rendered_frames", capture.rendered_frames],
				["process_samples", capture.process_samples]
			]) require(orderedTimestamps(values.map(({ at_ms }) => at_ms)), name, "timestamps must be ordered");
			require(orderedTimestamps(capture.interaction_events.map(({ dispatched_at_ms }) => dispatched_at_ms)), "interaction_events", "dispatch timestamps must be ordered");
		};
		validateEventJournal = (capture, require) => {
			const journal = capture.event_journal;
			if (journal.length === 0) return;
			const sizes = {
				frames: capture.frames.length,
				rendered_frames: capture.rendered_frames.length,
				interaction_events: capture.interaction_events.length,
				lifecycle: 2,
				process_samples: capture.process_samples.length,
				filesystem_checkpoints: capture.filesystem_checkpoints.length
			};
			const references = new Set();
			for (const [position, entry] of journal.entries()) {
				require(entry.capture_order === position, `event_journal.${String(position)}.capture_order`, "capture order must be contiguous from zero");
				require(entry.index < sizes[entry.collection], `event_journal.${String(position)}.index`, "journal reference is outside its capture collection");
				const reference = `${entry.collection}:${String(entry.index)}`;
				require(!references.has(reference), `event_journal.${String(position)}`, "journal references must be unique");
				references.add(reference);
			}
			const expectedSize = Object.values(sizes).reduce((total, size) => total + size, 0);
			require(journal.length === expectedSize, "event_journal", "nonempty journal must reference every captured observation");
		};
		finalizationManifestIssue = (committedScenario, committedComparison) => committedScenario !== undefined && committedComparison !== undefined && committedScenario["finalization_ms"] !== committedComparison["finalization_ms"] ? "comparison_contract finalization_ms must match the committed scenario" : undefined;
		finalizationAgreementIssue = (exitFinalization, observedFinalization) => exitFinalization !== undefined && observedFinalization !== undefined && JSON.stringify(exitFinalization) !== JSON.stringify(observedFinalization) ? "exit finalization and finalization observation must agree" : undefined;
		finalizationConsistencyIssue = (exit, committedScenario, committedComparison, options) => {
			const manifestIssue = finalizationManifestIssue(committedScenario, committedComparison);
			if (manifestIssue !== undefined) return manifestIssue;
			const finalization = exit?.finalization ?? options?.finalization;
			if (finalization === undefined) {
				const committed = committedScenario?.["finalization_ms"];
				return (exit?.reason === "timeout" || exit?.reason === "idle_timeout") && typeof committed === "number" && committed > 0 ? "a deadline exit under a committed finalization_ms requires finalization evidence" : undefined;
			}
			if (exit?.reason === "exited") return "finalization requires a deadline exit reason";
			const first = finalization.signals[0];
			if (first?.signal !== "SIGTERM") return "finalization signals must start with SIGTERM";
			const killIndexes = finalization.signals.flatMap(({ signal }, index) => signal === "SIGKILL" ? [index] : []);
			if (killIndexes.length > 1 || killIndexes[0] !== undefined && killIndexes[0] !== finalization.signals.length - 1) return "finalization may contain at most one final SIGKILL";
			if (!finalization.signals.every(({ sent_at_ms }, index) => {
				const previous = finalization.signals[index - 1];
				return previous === undefined || sent_at_ms >= previous.sent_at_ms;
			})) return "finalization signal attempt times must not decrease";
			if (finalization.signals.filter(({ signal }) => signal === "SIGTERM").length !== 1) return "finalization must attempt SIGTERM exactly once";
			const kill = finalization.signals.find(({ signal }) => signal === "SIGKILL");
			if (kill !== undefined && kill.sent_at_ms < finalization.requested_ms && exit !== undefined && exit.reason !== "cancelled") return "finalization SIGKILL cannot precede the requested interval";
			if (finalization.elapsed_ms === null && options?.allowNullElapsedMs !== true) return "finalization requires an observed elapsed_ms";
			if (finalization.exit_code !== null && exit?.signal !== undefined && exit.signal !== null && exit.signal !== 0) return "finalization exit_code requires an exit not caused by a signal";
			if (finalization.elapsed_ms !== null && finalization.elapsed_ms < (finalization.signals.at(-1)?.sent_at_ms ?? first.sent_at_ms)) return "finalization elapsed_ms cannot precede the last signal attempt";
			if (committedScenario !== undefined && committedScenario["finalization_ms"] !== finalization.requested_ms) return "finalization must match the committed finalization_ms";
			return undefined;
		};
		validateLifecycle = (capture, require) => {
			require(capture.filesystem_checkpoints.map(({ name }) => name).join(",") === "before,after_settlement", "filesystem_checkpoints", "capture must include initial and final filesystem snapshots");
			require(orderedTimestamps(capture.filesystem_checkpoints.map(({ at_ms }) => at_ms)), "filesystem_checkpoints", "filesystem snapshot times must be ordered");
			require(!capture.filesystem_checkpoints.some(({ truncated }) => truncated) || capture.truncated, "truncated", "filesystem snapshot truncation must propagate to the capture");
			const [initial, final] = capture.filesystem_checkpoints;
			require(sameJsonValue(initial?.files, capture.files_before) && initial?.effects.length === 0 && sameJsonValue(final?.files, capture.files_after) && sameJsonValue(final?.effects, capture.filesystem_effects), "filesystem_checkpoints", "top-level filesystem snapshots and effects must match the initial and final checkpoints");
			require(capture.exit.reason === "exited" || capture.exit.code === null, "exit", "deadline termination cannot declare a normal exit code");
			const finalizationIssue = finalizationConsistencyIssue(capture.exit, capture.manifest.scenario, capture.manifest.comparison_contract);
			require(finalizationIssue === undefined, "exit", finalizationIssue ?? "");
		};
		validateCoverage = (capture, require) => {
			const details = capture.truncation_details;
			require(details.process.retained_samples === capture.process_samples.length && details.process.retained_samples <= details.process.sample_limit && details.process.sampling_partial === (details.process.sample_limit_reached || details.process.sampling_failures > 0) && details.process.sampling_failures === 0 === (details.process.first_sampling_failure === null), "truncation_details.process", "sampling coverage must agree with retained samples and observed failures");
			require(capture.truncated === hasCaptureTruncation(details), "truncation_details", "aggregate truncation must match producer coverage");
			require((details.rendered_terminal.normalization_over_budget_frames ?? 0) <= (details.rendered_terminal.unknown_size_frames ?? 0), "truncation_details.rendered_terminal.normalization_over_budget_frames", "normalization omissions must be a subset of unknown-size rendered frames");
			for (const [name, retention, count, bytes] of [[
				"raw_terminal",
				details.raw_terminal,
				capture.frames.length,
				capture.frames.reduce((total, frame) => total + Buffer.byteLength(frame.raw_data ?? frame.data), 0)
			], [
				"rendered_terminal",
				details.rendered_terminal,
				capture.rendered_frames.length,
				capture.rendered_frames.reduce((total, frame) => frame.lines.reduce((sum, line) => sum + Buffer.byteLength(line), total + Buffer.byteLength(frame.serialized_state)), 0)
			]]) {
				const accountedBytes = retention.retained_bytes + (name === "raw_terminal" ? details.raw_terminal.redacted_bytes ?? 0 : 0);
				require(retention.retained_frames === count && retention.observed_frames >= count && retention.retained_bytes === bytes && retention.observed_bytes >= accountedBytes && (retention.observed_frames > count || retention.observed_bytes === accountedBytes) && accountedBytes <= retention.budget_bytes && (retention.unknown_size_frames ?? 0) <= retention.observed_frames - retention.retained_frames, `truncation_details.${name}`, "retained observations and budget accounting do not agree");
			}
			const normalized = details.normalized_terminal;
			if (normalized !== undefined) {
				const committedOutputBudget = processScenarioOutputBudgetProjectionSchema.safeParse(capture.manifest.scenario["limits"]);
				require(committedOutputBudget.success, "manifest.scenario.limits.output_bytes", "committed process scenario must include an explicit valid output_bytes budget");
				const retainedBytes = capture.frames.reduce((total, frame) => total + Buffer.byteLength(frame.data), 0);
				if (committedOutputBudget.success) require(normalized.budget_bytes === committedOutputBudget.data.output_bytes && normalized.retained_bytes === retainedBytes && normalized.retained_bytes <= normalized.budget_bytes && normalized.omitted_frames <= details.raw_terminal.observed_frames - details.raw_terminal.retained_frames, "truncation_details.normalized_terminal", "normalized terminal retention must agree with the committed budget and retained frames");
			}
			for (const [name, coverage, files, checkpoint] of [[
				"filesystem_before",
				details.filesystem_before,
				capture.files_before,
				capture.filesystem_checkpoints[0]
			], [
				"filesystem_after",
				details.filesystem_after,
				capture.files_after,
				capture.filesystem_checkpoints[1]
			]]) {
				const unhashedFiles = new Map(files.filter((file) => file.type === "file" && file.sha256 === null).map((file) => [file.path, file]));
				const entryTypes = new Map(files.map(({ path, type }) => [path, type]));
				require(coverage.hash_omissions.length === unhashedFiles.size && new Set(coverage.hash_omissions.map(({ path }) => path)).size === unhashedFiles.size && coverage.hash_omissions.every((omission) => unhashedFiles.get(omission.path)?.size === omission.size_bytes && omission.remaining_budget_bytes <= coverage.hash_budget_bytes && (omission.reason === "file_unavailable" ? omission.system_code !== null : omission.system_code === null)), `truncation_details.${name}.hash_omissions`, "every retained regular file without a digest must have one matching omission reason");
				require(new Set(coverage.enumeration_omissions.map((omission) => omission.reason === "unrepresentable_name" ? JSON.stringify([
					omission.path,
					omission.reason,
					omission.raw_name_hex
				]) : JSON.stringify([omission.path]))).size === coverage.enumeration_omissions.length && (!coverage.enumeration_reasons.includes("entry_unavailable") || coverage.enumeration_omissions.some(({ reason }) => reason === "entry_unavailable")) && (!coverage.enumeration_reasons.includes("symlink_not_followed") || coverage.enumeration_omissions.some(({ reason }) => reason === "symlink_not_followed")) && (!coverage.enumeration_reasons.includes("unrepresentable_name") || coverage.enumeration_omissions.some(({ reason }) => reason === "unrepresentable_name")) && coverage.enumeration_omissions.every((omission) => {
					if (!coverage.enumeration_reasons.includes(omission.reason)) return false;
					const entryType = entryTypes.get(omission.path);
					if (omission.reason === "symlink_not_followed") return entryType === "symlink" && omission.system_code === null;
					if (omission.reason === "directory_unavailable") return entryType === "directory" && omission.system_code !== null;
					return (entryType === undefined || entryType === "directory") && (omission.reason === "entry_unavailable" ? omission.system_code !== null : omission.system_code === null);
				}), `truncation_details.${name}.enumeration_omissions`, "every enumeration omission must identify an unavailable entry, retained directory or unfollowed symlink, with a matching reason and system error only for unavailable reads");
				require(coverage.hashed_bytes === files.filter((file) => file.type === "file" && file.sha256 !== null).reduce((sum, file) => sum + file.size, 0) && coverage.hashed_bytes <= coverage.hash_budget_bytes && files.length <= coverage.files_limit, `truncation_details.${name}`, "filesystem budget accounting does not match retained observations");
				require(coverage.enumeration_truncated === coverage.enumeration_reasons.length > 0 && checkpoint?.truncated === (coverage.enumeration_truncated || coverage.enumeration_omissions.length > 0 || coverage.hash_omissions.length > 0), `truncation_details.${name}`, "filesystem checkpoint truncation must match enumeration and digest coverage");
			}
		};
		collectProcessCaptureIssues = (capture) => {
			const issues = [];
			const require = (condition, path, message) => {
				if (!condition) issues.push({
					path,
					message
				});
			};
			validateCommitments(capture, require);
			validateOrdering(capture, require);
			validateEventJournal(capture, require);
			validateLifecycle(capture, require);
			validateCoverage(capture, require);
			return issues;
		};
	})))();
}

//#endregion
//#region dist/domain/process/processCapture.js
var interactionEventSchema, PROCESS_CAPTURE_EVENT_COLLECTIONS, processCaptureRootProcessSchema, fileStateShape, fileStateSchema, processFilesystemSnapshotSchema, fileEffectSchema, processSettlementSchema, unverifiedCleanupProcessesSchema, processCaptureFinalizationSchema, processCaptureShapeSchema, processCleanupResourceSchema, partialObservationFieldSchema, incompleteProcessCaptureObservationsSchema, partialCleanupReportSchema, partialObservationMetadataSchema, completedCaptureObservationSchema, incompleteCaptureObservationSchema, partialProcessCaptureObservationSchema, processCaptureSchema;
function init_processCapture() {
	return (init_processCapture = __esmMin((() => {
		init_symlinkTarget();
		init_offsetDateTime();
		init_jsonValue();
		init_processScenario();
		init_processCaptureValidation();
		init_processCaptureCoverage();
		interactionEventSchema = z.object({
			sequence: z.int().nonnegative(),
			scheduled_at_ms: z.int().nonnegative(),
			dispatched_at_ms: z.int().nonnegative(),
			type: z.enum([
				"input",
				"resize",
				"signal"
			]),
			data: z.string(),
			sensitive: z.literal(true).optional(),
			input_bytes: z.int().nonnegative().optional(),
			outcome: z.enum([
				"dispatched",
				"target_exited",
				"failed"
			])
		}).superRefine((event, context) => {
			if (event.sensitive === true !== (event.input_bytes !== undefined) || event.sensitive === true && (event.type !== "input" || event.data !== "")) context.addIssue({
				code: "custom",
				message: "Private input facts require input type, empty data, sensitive: true and input_bytes together."
			});
		});
		PROCESS_CAPTURE_EVENT_COLLECTIONS = [
			"frames",
			"rendered_frames",
			"interaction_events",
			"lifecycle",
			"process_samples",
			"filesystem_checkpoints"
		];
		processCaptureRootProcessSchema = z.discriminatedUnion("state", [
			z.strictObject({
				state: z.literal("observed"),
				pid: z.int().positive(),
				start_time: z.string().min(1)
			}),
			z.strictObject({ state: z.literal("withheld-by-caller") }),
			z.strictObject({
				state: z.literal("unknown"),
				reason: z.string().min(1)
			})
		]);
		fileStateShape = {
			path: z.string(),
			mode: z.int().nonnegative(),
			size: z.int().nonnegative()
		};
		fileStateSchema = z.discriminatedUnion("type", [
			z.object({
				...fileStateShape,
				type: z.literal("file"),
				sha256: z.string().regex(/^[a-f0-9]{64}$/u).nullable(),
				symlink_target: z.null()
			}),
			z.object({
				...fileStateShape,
				type: z.literal("symlink"),
				sha256: z.null(),
				symlink_target: z.string().nullable(),
				symlink_target_hex: z.string().regex(/^(?:[a-f0-9]{2})+$/u)
			}).superRefine((file, context) => {
				const { text } = observedSymlinkTarget(Buffer.from(file.symlink_target_hex, "hex"));
				if (file.symlink_target !== text) context.addIssue({
					code: "custom",
					message: "Symlink target text contradicts its exact bytes"
				});
			}),
			z.object({
				...fileStateShape,
				type: z.enum(["directory", "other"]),
				sha256: z.null(),
				symlink_target: z.null()
			})
		]);
		processFilesystemSnapshotSchema = z.strictObject({
			files: z.array(fileStateSchema),
			truncated: z.boolean(),
			completeRoots: z.array(z.string()),
			coverage: filesystemCoverageSchema
		});
		fileEffectSchema = z.discriminatedUnion("status", [
			z.object({
				path: z.string(),
				status: z.literal("created"),
				before: z.null(),
				after: fileStateSchema
			}),
			z.object({
				path: z.string(),
				status: z.literal("deleted"),
				before: fileStateSchema,
				after: z.null()
			}),
			z.object({
				path: z.string(),
				status: z.enum(["modified", "unchanged"]),
				before: fileStateSchema,
				after: fileStateSchema
			}),
			z.object({
				path: z.string(),
				status: z.literal("unknown"),
				before: fileStateSchema.nullable(),
				after: fileStateSchema.nullable(),
				reason: z.string().min(1)
			})
		]);
		processSettlementSchema = z.discriminatedUnion("state", [z.object({
			state: z.literal("quiesced"),
			elapsed_ms: z.int().nonnegative(),
			cleanup_outcome: z.enum([
				"not_required",
				"cleaned",
				"failed"
			])
		}), z.object({
			state: z.enum(["alive_at_deadline", "unverifiable"]),
			elapsed_ms: z.int().nonnegative(),
			cleanup_outcome: z.enum(["cleaned", "failed"])
		})]);
		unverifiedCleanupProcessesSchema = z.array(z.strictObject({
			pid: z.int().positive(),
			reason: z.string()
		}));
		processCaptureFinalizationSchema = z.strictObject({
			requested_ms: z.int().safe().positive(),
			elapsed_ms: z.int().nonnegative().nullable(),
			exit_code: z.int().nonnegative().nullable(),
			signals: z.array(z.strictObject({
				signal: z.enum(["SIGTERM", "SIGKILL"]),
				sent_at_ms: z.int().nonnegative(),
				delivery: z.enum([
					"signaled",
					"gone",
					"identity-changed",
					"unverified"
				]),
				reason: z.string().min(1).optional()
			})).min(1)
		}).superRefine((finalization, context) => {
			if (finalization.exit_code !== null && finalization.elapsed_ms === null) context.addIssue({
				code: "custom",
				path: ["exit_code"],
				message: "finalization exit_code requires an observed exit"
			});
			for (const [index, attempt] of finalization.signals.entries()) if (attempt.reason !== undefined && attempt.delivery !== "unverified") context.addIssue({
				code: "custom",
				path: [
					"signals",
					index,
					"reason"
				],
				message: "finalization reason is only allowed for an unverified delivery"
			});
		});
		processCaptureShapeSchema = z.strictObject({
			manifest: z.strictObject({
				rea_version: z.string().min(1),
				provider_version: z.string().min(1),
				platform: z.string().min(1),
				architecture: z.string().min(1),
				pty_backend: z.literal("node-pty"),
				started_at: utcDateTimeSchema,
				completed_at: utcDateTimeSchema,
				scenario: z.record(z.string(), jsonValueSchema),
				comparison_contract: z.record(z.string(), jsonValueSchema),
				full_scenario_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
				comparison_contract_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
				selected_executable_sha256: z.string().regex(/^[a-f0-9]{64}$/u).nullable(),
				executable_sha256: z.string().regex(/^[a-f0-9]{64}$/u).nullable(),
				executable_identity: z.strictObject({
					state: z.enum(["path_metadata_unchanged", "unknown"]),
					reason: z.string().nullable()
				}),
				root_process: processCaptureRootProcessSchema,
				normalization_sha256: z.string().regex(/^[a-f0-9]{64}$/u)
			}),
			normalization: normalizationSchema,
			frames: z.array(z.object({
				sequence: z.int().nonnegative(),
				at_ms: z.int().nonnegative(),
				data: z.string(),
				raw_data: z.string().optional()
			})),
			rendered_frames: z.array(z.object({
				sequence: z.int().nonnegative(),
				at_ms: z.int().nonnegative(),
				columns: z.int().positive(),
				rows: z.int().positive(),
				cursor_x: z.int().nonnegative(),
				cursor_y: z.int().nonnegative(),
				active_buffer: z.enum(["normal", "alternate"]),
				lines: z.array(z.string()),
				serialized_state: z.string()
			})),
			interaction_events: z.array(interactionEventSchema),
			exit: z.object({
				code: z.int().nullable(),
				signal: z.int().nullable(),
				reason: z.enum([
					"exited",
					"timeout",
					"idle_timeout"
				]),
				finalization: processCaptureFinalizationSchema.optional()
			}),
			settlement: z.discriminatedUnion("state", [z.object({
				state: z.literal("quiesced"),
				elapsed_ms: z.int().nonnegative(),
				cleanup_outcome: z.enum(["not_required", "cleaned"])
			}), z.object({
				state: z.enum(["alive_at_deadline", "unverifiable"]),
				elapsed_ms: z.int().nonnegative(),
				cleanup_outcome: z.enum(["cleaned", "failed"])
			})]),
			process_samples: z.array(z.object({
				at_ms: z.int().nonnegative(),
				pid: z.int().positive(),
				parent_pid: z.int().nonnegative(),
				command: z.string(),
				process_group_id: z.int().positive().nullable(),
				session_id: z.int().nonnegative().nullable()
			})),
			filesystem_checkpoints: z.array(z.object({
				name: z.enum(["before", "after_settlement"]),
				at_ms: z.int().nonnegative(),
				files: z.array(fileStateSchema),
				effects: z.array(fileEffectSchema),
				truncated: z.boolean()
			})),
			event_journal: z.array(z.object({
				capture_order: z.int().nonnegative(),
				collection: z.enum(PROCESS_CAPTURE_EVENT_COLLECTIONS),
				index: z.int().nonnegative()
			})),
			files_before: z.array(fileStateSchema),
			files_after: z.array(fileStateSchema),
			filesystem_effects: z.array(fileEffectSchema),
			truncated: z.boolean(),
			truncation_details: processCaptureTruncationDetailsSchema,
			limitations: z.array(z.string()),
			residual_unknowns: z.array(z.object({
				scope: z.enum([
					"terminal",
					"interaction",
					"exit",
					"process",
					"filesystem",
					"cleanup",
					"network",
					"environment"
				]),
				reason: z.string()
			})),
			cleanup: z.object({
				owned_process_group: z.literal("verified"),
				temporary_root: z.literal("removed"),
				unverified_processes: unverifiedCleanupProcessesSchema.optional()
			})
		});
		processCleanupResourceSchema = z.strictObject({
			state: z.enum([
				"cleaned",
				"failed",
				"unverified",
				"not_required"
			]),
			reason: z.string().nullable(),
			unverified_processes: unverifiedCleanupProcessesSchema.optional()
		});
		partialObservationFieldSchema = (value) => z.discriminatedUnion("state", [z.strictObject({
			state: z.literal("available"),
			value
		}), z.strictObject({
			state: z.literal("unavailable"),
			reason: z.string()
		})]);
		incompleteProcessCaptureObservationsSchema = z.strictObject({
			target_pid: partialObservationFieldSchema(z.int().positive()),
			frames: partialObservationFieldSchema(processCaptureShapeSchema.shape.frames),
			rendered_frames: partialObservationFieldSchema(processCaptureShapeSchema.shape.rendered_frames),
			interaction_events: partialObservationFieldSchema(processCaptureShapeSchema.shape.interaction_events),
			exit: partialObservationFieldSchema(z.strictObject({
				code: z.int().nullable(),
				signal: z.int().nullable(),
				reason: z.enum([
					"exited",
					"timeout",
					"idle_timeout",
					"cancelled"
				]),
				finalization: processCaptureFinalizationSchema.optional()
			})),
			finalization: partialObservationFieldSchema(processCaptureFinalizationSchema).optional(),
			settlement: partialObservationFieldSchema(z.strictObject({
				state: z.enum([
					"quiesced",
					"alive_at_deadline",
					"unverifiable"
				]),
				elapsed_ms: z.int().nonnegative()
			})),
			process_samples: partialObservationFieldSchema(processCaptureShapeSchema.shape.process_samples),
			filesystem_snapshots: z.strictObject({
				before: partialObservationFieldSchema(processFilesystemSnapshotSchema),
				after: partialObservationFieldSchema(processFilesystemSnapshotSchema)
			}),
			event_journal: partialObservationFieldSchema(processCaptureShapeSchema.shape.event_journal),
			manifest: partialObservationFieldSchema(processCaptureShapeSchema.shape.manifest),
			residual_unknowns: processCaptureShapeSchema.shape.residual_unknowns.optional()
		});
		partialCleanupReportSchema = z.strictObject({
			owned_process_group: processCleanupResourceSchema,
			terminal_renderer: processCleanupResourceSchema,
			temporary_root: processCleanupResourceSchema
		});
		partialObservationMetadataSchema = z.strictObject({
			cleanup: partialCleanupReportSchema,
			execution_failure: z.string().nullable()
		});
		completedCaptureObservationSchema = z.strictObject({ capture: processCaptureShapeSchema.omit({ cleanup: true }).extend({ settlement: processSettlementSchema }) });
		incompleteCaptureObservationSchema = z.strictObject({ observations: incompleteProcessCaptureObservationsSchema });
		partialProcessCaptureObservationSchema = z.union([completedCaptureObservationSchema.extend(partialObservationMetadataSchema.shape), incompleteCaptureObservationSchema.extend(partialObservationMetadataSchema.shape)]).superRefine((partial, context) => {
			const cleanupIncomplete = Object.values(partial.cleanup).some(({ state }) => state === "failed" || state === "unverified");
			if (!cleanupIncomplete && partial.execution_failure === null) context.addIssue({
				code: "custom",
				path: ["execution_failure"],
				message: "partial observations require incomplete cleanup or an execution failure"
			});
			const observedExit = "capture" in partial ? partial.capture.exit : partial.observations.exit.state === "available" ? partial.observations.exit.value : undefined;
			const observedFinalization = "observations" in partial && partial.observations.finalization?.state === "available" ? partial.observations.finalization.value : undefined;
			const committedManifest = "capture" in partial ? partial.capture.manifest : partial.observations.manifest.state === "available" ? partial.observations.manifest.value : undefined;
			const manifestFinalizationIssue = finalizationManifestIssue(committedManifest?.scenario, committedManifest?.comparison_contract);
			const exitFinalizationIssue = manifestFinalizationIssue ?? (observedExit === undefined ? undefined : finalizationConsistencyIssue(observedExit, committedManifest?.scenario, committedManifest?.comparison_contract));
			const incompleteFinalizationIssue = manifestFinalizationIssue ?? (observedFinalization === undefined ? undefined : finalizationConsistencyIssue(observedExit === undefined ? undefined : {
				reason: observedExit.reason,
				signal: observedExit.signal
			}, committedManifest?.scenario, committedManifest?.comparison_contract, {
				finalization: observedFinalization,
				allowNullElapsedMs: true
			}));
			if (exitFinalizationIssue !== undefined) context.addIssue({
				code: "custom",
				path: ["exit"],
				message: exitFinalizationIssue
			});
			if (incompleteFinalizationIssue !== undefined) context.addIssue({
				code: "custom",
				path: ["finalization"],
				message: incompleteFinalizationIssue
			});
			const agreementIssue = finalizationAgreementIssue(observedExit?.finalization, observedFinalization);
			if (agreementIssue !== undefined) context.addIssue({
				code: "custom",
				path: ["finalization"],
				message: agreementIssue
			});
			if ("observations" in partial && partial.observations.exit.state === "unavailable" && observedFinalization !== undefined && observedFinalization?.elapsed_ms !== null) context.addIssue({
				code: "custom",
				path: ["finalization"],
				message: "finalization elapsed_ms must be null when the exit observation is unavailable"
			});
			if ("observations" in partial) {
				const { observations } = partial;
				if (![
					observations.frames,
					observations.interaction_events,
					observations.process_samples,
					observations.filesystem_snapshots.before,
					observations.event_journal
				].some(({ state }) => state === "available")) context.addIssue({
					code: "custom",
					path: ["observations"],
					message: "incomplete observations contain no collected evidence"
				});
				return;
			}
			const { capture } = partial;
			const settlement = capture.settlement.state === "quiesced" ? {
				...capture.settlement,
				cleanup_outcome: capture.settlement.cleanup_outcome === "cleaned" ? "cleaned" : "not_required"
			} : {
				...capture.settlement,
				cleanup_outcome: "cleaned"
			};
			const validationCapture = {
				...capture,
				settlement,
				cleanup: {
					owned_process_group: "verified",
					temporary_root: "removed"
				}
			};
			for (const issue of collectProcessCaptureIssues(validationCapture)) context.addIssue({
				code: "custom",
				path: ["capture", ...issue.path.split(".")],
				message: issue.message
			});
		});
		processCaptureSchema = processCaptureShapeSchema.superRefine((capture, context) => {
			if (capture.settlement.cleanup_outcome === "failed") context.addIssue({
				code: "custom",
				path: ["settlement", "cleanup_outcome"],
				message: "verified captures cannot contain failed cleanup"
			});
			for (const issue of collectProcessCaptureIssues(capture)) context.addIssue({
				code: "custom",
				path: issue.path.split("."),
				message: issue.message
			});
		}).describe("The capture must preserve its canonical scenario, comparison, and normalization SHA-256 commitments; ordered capture timestamps and contiguous sequence numbers; before and final filesystem snapshots with truncation propagated; and exit-code consistency with deadline termination. The event journal is required; empty journals are valid. A non-empty journal must reference every captured observation exactly once with unique in-range references. These cross-field invariants are checked by REA after capture.");
	})))();
}

//#endregion
//#region dist/domain/process/processCaptureParsing.js
var verifiedProcessCaptureSchema, safeParseProcessCapture, parseProcessCapture;
function init_processCaptureParsing() {
	return (init_processCaptureParsing = __esmMin((() => {
		init_processCapture();
		verifiedProcessCaptureSchema = processCaptureSchema.brand();
		safeParseProcessCapture = (input) => verifiedProcessCaptureSchema.safeParse(input);
		parseProcessCapture = (input) => verifiedProcessCaptureSchema.parse(input);
	})))();
}

//#endregion
//#region dist/domain/analysisView/analysisViewErrors.js
var INSPECT_ANALYSIS_VIEW_OPERATION, ANALYSIS_VIEW_PAGE_BUDGET_RECOVERY, analysisViewInputError;
function init_analysisViewErrors() {
	return (init_analysisViewErrors = __esmMin((() => {
		init_analysisErrorCore();
		INSPECT_ANALYSIS_VIEW_OPERATION = "inspect_analysis_view";
		ANALYSIS_VIEW_PAGE_BUDGET_RECOVERY = {
			retryable: false,
			remediationAction: "The 1,048,576-byte analysis-view page allowance is fixed and has no runtime override. For a pageable collection, select fewer fields or a smaller selection; one oversized field may not fit even in a one-row page. If the error includes details.partial_observation, use that complete parent Evidence. Otherwise, read the parent directly from the caller-supplied bundle, or retrieve/export the retained parent in the same MCP session. Reading the parent does not increase the page allowance."
		};
		analysisViewInputError = (issues) => new AnalysisInputError(INSPECT_ANALYSIS_VIEW_OPERATION, undefined, issues);
	})))();
}

//#endregion
//#region dist/domain/native/nativeValueFlow.js
var nativeVarnodeSchema, nativePcodeOperationSchema, nativePcodeDefUseSchema, nativePcodeEffectSchema, nativeValueFlowLimitsSchema, availableNativeValueFlowSchema, unavailableNativeValueFlowSchema, nativeValueFlowSchema, nativeValueFlowMetadataSchema;
function init_nativeValueFlow() {
	return (init_nativeValueFlow = __esmMin((() => {
		init_analysisResourceLimits();
		nativeVarnodeSchema = z.strictObject({
			kind: z.enum([
				"constant",
				"address",
				"register",
				"unique",
				"other"
			]),
			size_bytes: z.int().nonnegative(),
			location: z.string().nullable(),
			constant_hex: z.string().regex(/^[0-9a-f]+$/u).nullable()
		});
		nativePcodeOperationSchema = z.strictObject({
			id: z.string().min(1),
			address: z.string().min(1),
			sequence: z.int().nonnegative(),
			opcode: z.string().min(1),
			is_dead: z.boolean(),
			block_membership: z.enum([
				"member",
				"detached",
				"unavailable"
			]),
			inputs: z.array(nativeVarnodeSchema),
			output: nativeVarnodeSchema.nullable()
		});
		nativePcodeDefUseSchema = z.strictObject({
			definition: z.string().min(1),
			use: z.string().min(1),
			input_index: z.int().nonnegative()
		});
		nativePcodeEffectSchema = z.strictObject({
			operation: z.string().min(1),
			kind: z.enum([
				"memory_read",
				"memory_write",
				"conditional_branch",
				"indirect_branch",
				"direct_call",
				"indirect_call"
			]),
			operand_input: z.int().nonnegative().nullable(),
			value_input: z.int().nonnegative().nullable()
		});
		nativeValueFlowLimitsSchema = z.strictObject({
			max_operations: z.int().min(1).max(MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS),
			max_inputs_per_operation: z.int().min(1).max(MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS),
			max_edges: z.int().min(1).max(MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS)
		});
		availableNativeValueFlowSchema = z.strictObject({
			available: z.literal(true),
			provenance: z.literal("ghidra-high-pcode"),
			limits: nativeValueFlowLimitsSchema,
			limits_reached: z.array(z.enum([
				"max_operations",
				"max_inputs_per_operation",
				"max_edges"
			])),
			operations: z.array(nativePcodeOperationSchema),
			def_use: z.array(nativePcodeDefUseSchema),
			effects: z.array(nativePcodeEffectSchema).describe("Observed p-code effects. Memory reads and writes cover LOAD and STORE operations only; direct memory address varnodes in other operations are excluded. An empty list does not establish no memory access."),
			parameters: z.array(z.strictObject({
				ordinal: z.int().nonnegative(),
				name: z.string(),
				data_type: z.string()
			})),
			parameter_uses: z.array(z.strictObject({
				ordinal: z.int().nonnegative(),
				use: z.string(),
				input_index: z.int().nonnegative()
			})),
			truncated: z.boolean(),
			omitted_operations_lower_bound: z.int().nonnegative(),
			known_omitted_inputs: z.int().nonnegative(),
			known_omitted_edges: z.int().nonnegative(),
			limitations: z.array(z.string().min(1))
		});
		unavailableNativeValueFlowSchema = z.strictObject({
			available: z.literal(false),
			reason: z.string().min(1),
			limitations: z.array(z.string().min(1))
		});
		nativeValueFlowSchema = z.discriminatedUnion("available", [availableNativeValueFlowSchema, unavailableNativeValueFlowSchema]);
		nativeValueFlowMetadataSchema = z.union([availableNativeValueFlowSchema.pick({
			available: true,
			truncated: true,
			omitted_operations_lower_bound: true,
			known_omitted_inputs: true,
			known_omitted_edges: true
		}).strip(), unavailableNativeValueFlowSchema.pick({
			available: true,
			reason: true
		}).strip()]);
	})))();
}

//#endregion
export { ANALYSIS_EVIDENCE_PREDICATE, ANALYSIS_VIEW_PAGE_BUDGET_RECOVERY, INSPECT_ANALYSIS_VIEW_OPERATION, RECREATE_EVIDENCE_GUIDANCE, absenceClaimable, addOffsetDateTimeMilliseconds, admitEvidenceBundleFormat, analysisProfileSchema, analysisProfilesEqual, analysisViewInputError, availableNativeValueFlowSchema, borrowEvidenceArray, borrowEvidenceInput, canonicalJson, canonicalJsonDigestSteps, committedProviderSchema, committedProvidersEqual, compareOffsetDateTimeInstants, createAnalysisProfile, createEvidence, createImmutableEvidenceSteps, declareEvidenceReferenceAlternative, describeValidationFailure, digestProcessCommitment, evidenceAuthoritySchema, evidenceDisplayMetadataAgree, evidenceEnvelopeForAdmission, evidenceFileReferenceSchema, evidenceFileTarget, evidenceFormatSchema, evidenceInputSchema, evidenceLocationSchema, evidenceSchema, evidenceSourceInputSchema, evidenceSubject, evidenceSubjectDisplay, evidenceSubjectFormatSchema, evidenceSubjectInput, evidenceSubjectSchema, evidenceSubjectTarget, evidenceTargetIdentity, firstValidationIssue, getEvidenceInputContract, hasCaptureTruncation, immutableEvidence, init_analysisProfile, init_analysisViewErrors, init_canonicalJsonDigestSteps, init_comparisonSemantics, init_evidence, init_evidenceFormat, init_evidenceInputContract, init_evidenceReference, init_evidenceSubject, init_evidenceValidation, init_nativeAddress, init_nativeValueFlow, init_offsetDateTime, init_processCapture, init_processCaptureCoverage, init_processCaptureParsing, init_processScenario, init_symlinkTarget, init_validationFailure, isImmutableEvidence, isUnsupportedEvidenceFormat, nativeAddressCoordinateInputSchema, nativeAddressInputSchema, nativeAddressObservationSchema, nativeAddressSchema, nativePcodeOperationSchema, nativeValueFlowMetadataSchema, nativeValueFlowSchema, nativeVarnodeSchema, observedSymlinkTarget, offsetDateTimeInstantFromEpochMilliseconds, offsetDateTimeSchema, parseEvidence, parseOffsetDateTimeInstant, parseProcessCapture, partialProcessCaptureObservationSchema, processCaptureSchema, processComparisonContract, processScenarioCommitment, processScenarioPlanProjection, processScenarioPlanSchema, processScenarioSchema, processSourceTruncated, providerSchema, readEvidence, readEvidencePayload, readImmutableEvidence, readRecordedDateTime, readRecordedStart, rebindEvidenceSubjectTargetPath, rebindEvidenceToTargetPath, recognizeEvidence, retainedEvidenceReferenceSchema, safeParseEvidence, safeParseImmutableEvidence, safeParseProcessCapture, sensitiveProcessInputProjection, unavailableNativeValueFlowSchema, unsupportedEvidenceFormatError, utcDateTimeSchema, validateAnalysisProfileProvider, validationIssueOptions, withEvidenceCallerInputPath, withEvidenceSubjectDeclaration };