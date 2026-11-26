import { admitEvidenceRecordFormat, EVIDENCE_FORMAT_REVISION, evidenceFormatSchema, } from "./evidenceFormat.js";
import { isDeepStrictEqual } from "node:util";
import { basename } from "node:path";
import { z } from "zod";
import { withEvidenceSubjectDeclaration } from "./evidenceSubject.js";
import { digestCanonicalValue } from "./canonicalDigest.js";
import { canonicalJsonDigestSteps } from "./canonicalJsonDigestSteps.js";
import { nulFreeStringSchema } from "./localPath.js";
import { binaryTargetIdentity, fileTargetSelectionSchema, nonFileTargetIdentitySchema, sessionTargetIdentitySchema, unknownTargetIdentitySchema, sameTargetIdentity, } from "./targetIdentity.js";
import { analysisProfileSchema, } from "./analysisProfile.js";
import { jsonObjectSchema, jsonValueSchema, jsonValueValidationIssue, jsonValueValidationSteps, } from "./jsonValue.js";
import { freezeJsonSnapshot, freezeOwnedJsonTreeSnapshot, canBorrowParsedJsonSnapshot, immutableJsonSnapshotMember, isImmutableJsonSnapshot, } from "./immutableJson.js";
import { digestSchema, prefixedDigestSchema } from "./../domain/digests.js";
import { relationshipCoverageSchema, } from "./relationshipCoverage.js";
/** Predicate shared by ordinary provider analysis observations. */
export const ANALYSIS_EVIDENCE_PREDICATE = "rea.analysis";
/** Provider identity schema shared by evidence-bearing persistence formats. */
export const providerSchema = z.strictObject({
    id: z.string().min(1),
    name: z.string().min(1),
    version: z.string().nullable(),
});
/** Formats whose identity carries each selection kind. */
const SELECTION_FORMATS = {
    "entry-point": ["raw-binary", "gamecube-dol"],
    "esp-flash": ["esp-flash-image"],
    "universal-slice": ["mach-o-universal"],
};
/** The file identity an Evidence subject commits to, with its format-owned declaration. */
const subjectIdentitySchema = withEvidenceSubjectDeclaration(z.strictObject({
    kind: z.literal("file"),
    sha256: digestSchema,
    selection: fileTargetSelectionSchema.nullable(),
})).superRefine((identity, context) => {
    if (identity.selection !== null &&
        !SELECTION_FORMATS[identity.selection.kind].includes(identity.format))
        context.addIssue({
            code: "custom",
            path: ["selection"],
            message: `A ${identity.selection.kind} selection does not apply to format ${identity.format}`,
        });
});
const fileSubjectSchema = z.strictObject({
    /** The committed target identity; the remaining members are display facts. */
    identity: subjectIdentitySchema,
    name: z.string().min(1),
    local_path: nulFreeStringSchema,
});
/** A debugger session whose launch file is validated like a file subject. */
const sessionSubjectIdentitySchema = sessionTargetIdentitySchema.extend({
    target: z.union([subjectIdentitySchema, unknownTargetIdentitySchema]),
});
/** A subject that names no file (a URL, process, session, or unknown target) has no file display facts. */
const nonFileSubjectSchema = z.strictObject({
    identity: z.union([
        nonFileTargetIdentitySchema,
        sessionSubjectIdentitySchema,
    ]),
    name: z.null(),
    local_path: z.null(),
});
const subjectSchema = z.union([fileSubjectSchema, nonFileSubjectSchema]);
/** The Evidence subject, for persistence formats that embed one. */
export const evidenceSubjectSchema = subjectSchema;
/** Source location attached to an evidence observation. */
/** Source-location schema shared by evidence-bearing persistence formats. */
export const evidenceLocationSchema = z.discriminatedUnion("kind", [
    z.strictObject({ kind: z.literal("address"), address: z.string().min(1) }),
    z.strictObject({
        kind: z.literal("address-range"),
        start: z.string().min(1),
        end: z.string().min(1),
    }),
    z.strictObject({ kind: z.literal("artifact-path"), path: z.string().min(1) }),
    z.strictObject({
        kind: z.literal("file-offset"),
        offset: z.int().min(0),
    }),
    z.strictObject({
        kind: z.literal("file-offset-range"),
        start: z.int().min(0),
        end: z.int().min(0),
    }),
]);
/** Source authority vocabulary owned by Evidence and reused by its consumers. */
export const evidenceAuthoritySchema = z.enum([
    "shipped-artifact",
    "controlled-replay",
    "historical-reference",
    "external-service",
    "analyst-inference",
]);
const executionEnvironmentSchema = z.strictObject({
    id: z.string().min(1),
    platform: z.string().min(1),
    architecture: z.string().min(1),
    isolation: z.enum(["none", "process", "container", "virtual-machine"]),
});
const callerInputPathsSchema = z.record(nulFreeStringSchema, z.union([nulFreeStringSchema, z.array(nulFreeStringSchema)]));
const evidenceBaseSchema = z
    .object({
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
    caller_input_path: nulFreeStringSchema
        .exactOptional()
        .describe("Verbatim direct-request path; not part of semantic identity."),
    caller_input_paths: callerInputPathsSchema
        .exactOptional()
        .describe("Verbatim auxiliary input paths keyed by argument name; repeated selections retain their order. Caller assertions are outside semantic identity."),
    raw_result: jsonValueSchema.nullable(),
    normalized_result: jsonValueSchema,
    confidence: z.enum(["observed", "derived", "inferred"]),
    authority: evidenceAuthoritySchema,
    environment: executionEnvironmentSchema.nullable(),
    limitations: z.array(z.string()),
    relationship_coverage: relationshipCoverageSchema.nullable(),
    locations: z.array(evidenceLocationSchema),
    evidence_links: z.array(prefixedDigestSchema("ev")),
})
    .strict();
/** Require a reported analysis profile to identify the observation provider. */
export const validateAnalysisProfileProvider = (evidence, context) => {
    const profile = evidence.analysis_profile;
    if (profile !== null &&
        (profile.provider.id !== evidence.provider.id ||
            profile.provider.name !== evidence.provider.name ||
            profile.provider.version !== evidence.provider.version))
        context.addIssue({
            code: "custom",
            path: ["analysis_profile", "provider"],
            message: "Analysis profile provider does not match Evidence provider",
        });
};
/** Strict, provider-neutral record for one successful public observation. */
export const evidenceSchema = evidenceBaseSchema.superRefine(validateAnalysisProfileProvider);
const authenticatedEvidenceSchema = evidenceSchema.superRefine((evidence, context) => {
    const { evidence_id: evidenceId, ...withoutId } = evidence;
    if (computeEvidenceId(withoutId) !== evidenceId)
        context.addIssue({
            code: "custom",
            path: ["evidence_id"],
            message: "Evidence semantic identifier does not match its record",
        });
});
const immutableEvidenceSnapshots = new WeakMap();
const immutableResultSchema = z
    .custom(isImmutableJsonSnapshot)
    .superRefine((value, context) => {
    const issue = jsonValueValidationIssue(value);
    if (issue !== undefined)
        context.addIssue({ code: "custom", message: issue });
});
/** Whether a subject names a file; only a file subject has display facts. */
const isFileSubject = (subject) => subject?.identity.kind === "file";
/** Preserve the complete file subject when deriving a new Evidence observation. */
export const evidenceSubjectTarget = (subject) => !isFileSubject(subject)
    ? undefined
    : {
        path: subject.local_path,
        sha256: subject.identity.sha256,
        format: subject.identity.format,
        name: subject.name,
        ...(subject.identity.architecture === null
            ? {}
            : { architecture: subject.identity.architecture }),
        ...(subject.identity.selection === null
            ? {}
            : { selection: subject.identity.selection }),
    };
/** Name the same subject in a derived observation: the file target, or the same non-file identity. */
export const evidenceSubjectInput = (subject) => isFileSubject(subject)
    ? evidenceSubjectTarget(subject)
    : subject.identity;
/** The one projection of a producer's subject input into its target identity. */
export const evidenceSubjectTargetIdentity = (target) => "kind" in target
    ? binaryTargetIdentity(target)
    : {
        kind: "file",
        sha256: target.sha256,
        format: target.format,
        architecture: target.architecture ?? null,
        selection: target.selection ?? null,
    };
/** Rebind a matching immutable artifact subject to the caller's selected path. */
export const rebindEvidenceSubjectTargetPath = (subject, target) => sameTargetIdentity(evidenceSubjectTargetIdentity(subject), evidenceSubjectTargetIdentity(target))
    ? { ...subject, path: target.path }
    : subject;
/** The one builder of a persisted Evidence subject from a producer's target. */
export const evidenceSubject = (target) => subjectSchema.parse("path" in target
    ? {
        identity: evidenceSubjectTargetIdentity(target),
        name: ("name" in target ? target.name : undefined) ??
            (basename(target.path) || "artifact"),
        local_path: target.path,
    }
    : { identity: target, name: null, local_path: null });
/** The target identity an Evidence record commits to; absent only for a partial record. */
export const evidenceTargetIdentity = (evidence) => evidence.subject?.identity ?? null;
/** The file identity an Evidence record names, when its subject is a file. */
export const evidenceFileTarget = (evidence) => {
    const identity = evidenceTargetIdentity(evidence);
    return identity?.kind === "file" ? identity : undefined;
};
/** Display facts beside the subject identity; never part of the Evidence ID. */
export const evidenceSubjectDisplay = (evidence) => {
    const subject = evidence.subject;
    return isFileSubject(subject)
        ? { name: subject.name, local_path: subject.local_path }
        : undefined;
};
/** Content committed by an Evidence ID, excluding local request/display metadata. */
export const evidenceSemanticContent = (evidence) => ({
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
    evidence_links: evidence.evidence_links,
});
/** Hash semantic content, including raw results and excluding local metadata. */
const computeEvidenceId = (evidence) => `ev_${digestCanonicalValue(evidenceSemanticContent(evidence), "Evidence")}`;
/** Parse evidence and reject a syntactically valid but tampered semantic ID. */
export const parseEvidence = (input) => {
    const immutable = typeof input === "object" && input !== null
        ? immutableEvidenceSnapshots.get(input)
        : undefined;
    if (immutable !== undefined)
        return immutable;
    admitEvidenceRecordFormat(input);
    return authenticatedEvidenceSchema.parse(input);
};
/** Evidence owns all presentation metadata excluded from its semantic identity. */
export const evidenceDisplayMetadataAgree = (left, right) => left.subject?.name === right.subject?.name &&
    left.subject?.local_path === right.subject?.local_path &&
    left.caller_input_path === right.caller_input_path &&
    isDeepStrictEqual(left.caller_input_paths, right.caller_input_paths);
/** Authenticate and seal a ledger-owned snapshot; external mutable values are copied first. */
export const immutableEvidence = (input) => {
    const parsed = parseEvidence(input);
    return rememberImmutableEvidence(canBorrowParsedJsonSnapshot(input, parsed) ? input : parsed);
};
/** Rebind display path metadata when an authenticated record names this target. */
export const rebindEvidenceToTargetPath = (evidence, target) => {
    const subject = evidence.subject;
    if (!isFileSubject(subject))
        return evidence;
    if (!sameTargetIdentity(subject.identity, evidenceSubjectTargetIdentity(target)))
        return evidence;
    if (target.path === subject.local_path &&
        (target.name === undefined || target.name === subject.name))
        return evidence;
    const reboundSubject = subjectSchema.parse({
        ...subject,
        name: target.name ?? (basename(target.path) || "artifact"),
        local_path: target.path,
    });
    const reboundEvidence = { ...evidence, subject: reboundSubject };
    if (!isImmutableEvidence(evidence))
        return immutableEvidence(reboundEvidence);
    // The original authenticated Evidence owns immutable payloads. Only the
    // small display subject and envelope are new, so preserve those payloads
    // without reparsing a potentially large analysis result.
    return rememberReboundEvidence(evidence, reboundEvidence);
};
/** Bind the exact selected request path without changing semantic identity or stored history. */
export const withEvidenceCallerInputPath = (evidence, rawPath, additionalPaths) => {
    const callerInputPath = rawPath === undefined ? undefined : nulFreeStringSchema.parse(rawPath);
    const owned = immutableEvidence(evidence);
    const paths = additionalPaths === undefined
        ? undefined
        : callerInputPathsSchema.parse(additionalPaths);
    const samePaths = paths === undefined || isDeepStrictEqual(owned.caller_input_paths, paths);
    if ((callerInputPath === undefined ||
        owned.caller_input_path === callerInputPath) &&
        samePaths)
        return owned;
    // The authenticated source owns its immutable payloads. Only this small
    // envelope changes, so replay does not copy a document-sized result.
    const rebound = {
        ...owned,
        ...(callerInputPath === undefined
            ? {}
            : { caller_input_path: callerInputPath }),
        ...(paths === undefined ? {} : { caller_input_paths: paths }),
    };
    return rememberReboundEvidence(owned, rebound);
};
/** Carry the source's sealing proof before sealing only the changed envelope. */
const rememberReboundEvidence = (source, rebound) => {
    // Each own member belongs to an authenticated immutable source. Register
    // these shared roots so sealing the envelope never walks their payloads.
    for (const key of Object.keys(source))
        immutableJsonSnapshotMember(source, key);
    return rememberImmutableEvidence(rebound);
};
/** Recognize authenticated Evidence whose complete reachable JSON data is immutable. */
export const isImmutableEvidence = (evidence) => immutableEvidenceSnapshots.has(evidence);
const rememberImmutableEvidence = (evidence) => {
    freezeJsonSnapshot(evidence);
    immutableEvidenceSnapshots.set(evidence, evidence);
    return evidence;
};
/** Admit payloads into deterministic Evidence bound to an immutable artifact subject. */
export const createEvidence = (target, provider, observation, options) => {
    const { normalized, sharedResult } = normalizeEvidenceObservation(target, provider, observation, options?.callerTarget);
    const evidence = {
        ...normalized,
        evidence_id: computeEvidenceId(normalized),
    };
    // Seal this already parsed, exclusively owned snapshot without authenticating
    // or copying its payload again, including later partial-error delivery.
    if (sharedResult || options?.immutable === true) {
        // The normalizer's JSON parser clones mutable payloads into trees and only
        // borrows previously sealed roots. No graph-sized sealing scratch is needed.
        freezeOwnedJsonTreeSnapshot(evidence);
        immutableEvidenceSnapshots.set(evidence, evidence);
    }
    return evidence;
};
/** Create Evidence from owned immutable JSON while exposing cooperative computation steps. */
export function* createImmutableEvidenceSteps(target, provider, observation) {
    if (!isImmutableJsonSnapshot(observation.result))
        throw new TypeError("Cooperative Evidence requires an authenticated immutable result");
    // The envelope parser below retains its usual diagnostics, using the completed
    // immutable validation rather than traversing the payload synchronously again.
    yield* jsonValueValidationSteps(observation.result);
    const { normalized } = normalizeEvidenceObservation(target, provider, observation);
    const digest = yield* canonicalJsonDigestSteps(evidenceSemanticContent(normalized));
    return rememberImmutableEvidence({
        ...normalized,
        evidence_id: `ev_${digest}`,
    });
}
/** Borrow input collections for admission. */
export const evidenceEnvelopeForAdmission = (target, provider, observation, callerTarget) => {
    const subject = evidenceSubject(target);
    const callerInputPath = callerTarget?.callerInputPath !== undefined &&
        isFileSubject(subject) &&
        subject.local_path === callerTarget.path &&
        sameTargetIdentity(subject.identity, binaryTargetIdentity(callerTarget))
        ? callerTarget.callerInputPath
        : undefined;
    return {
        ...(callerInputPath === undefined
            ? {}
            : { caller_input_path: callerInputPath }),
        evidence_id: `ev_${"0".repeat(64)}`,
        evidence_format: EVIDENCE_FORMAT_REVISION,
        subject,
        provider: {
            id: provider.id,
            name: provider.name,
            version: provider.version,
        },
        analysis_profile: observation.analysisProfile ?? null,
        predicate_type: observation.predicateType ?? ANALYSIS_EVIDENCE_PREDICATE,
        operation: observation.operation,
        parameters: observation.parameters,
        raw_result: observation.rawResult ?? null,
        normalized_result: observation.result,
        confidence: observation.confidence ?? "observed",
        // Only a subject that names an identified target can support shipment
        // authority; an unknown target names no artifact and claims none.
        authority: observation.authority ??
            (subject.identity.kind === "unknown"
                ? "analyst-inference"
                : "shipped-artifact"),
        environment: observation.environment ?? null,
        limitations: observation.limitations ?? [],
        ...(observation.relationshipCoverage === undefined
            ? { relationship_coverage: null }
            : { relationship_coverage: observation.relationshipCoverage }),
        locations: observation.locations ?? [],
        evidence_links: observation.evidenceLinks ?? [],
    };
};
const normalizeEvidenceObservation = (target, provider, observation, callerTarget) => {
    const envelope = evidenceEnvelopeForAdmission(target, provider, observation, callerTarget);
    const sharedResult = typeof observation.result === "object" &&
        observation.result !== null &&
        isImmutableJsonSnapshot(observation.result);
    const selectedSchema = sharedResult
        ? evidenceSchema.safeExtend({ normalized_result: immutableResultSchema })
        : evidenceSchema;
    const normalized = selectedSchema.parse(envelope);
    // The envelope has already been parsed into an independent snapshot. Only
    // its derived identifier changes here; parsing again clones the full payload
    // and recomputes the same digest while the previous snapshot is still live.
    return { normalized, sharedResult };
};
