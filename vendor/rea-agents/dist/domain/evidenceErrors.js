import { AnalysisError, } from "./analysisErrorBase.js";
/** Evidence identity, schema, or bundle manifests failed integrity checks. */
export class EvidenceIntegrityError extends AnalysisError {
    _tag = "EvidenceIntegrityError";
    userMessage;
    /** For a two-sided comparison input, the side whose Evidence failed. */
    side;
    /** The first failing location inside that Evidence or its result, when schema-located. */
    issuePath;
    /** The constraint a schema refinement named on that first issue. */
    constraint;
    /** Schema issues after the first, which the message only summarizes. */
    remainingIssueCount;
    constructor(message, options) {
        super(message, options);
        this.userMessage = options?.userMessage;
        this.side = options?.side;
        this.issuePath = options?.issuePath;
        this.constraint = options?.constraint;
        this.remainingIssueCount = options?.remainingIssueCount;
    }
}
/** A valid snapshot belongs to a different target, provider, or analysis profile. */
export class AnalysisSnapshotMismatchError extends EvidenceIntegrityError {
    bindingMismatch;
    constructor(message, bindingMismatch) {
        super(message);
        this.bindingMismatch = bindingMismatch;
    }
}
/** A resource session cannot import or export a binary analysis snapshot. */
export class ResourceSnapshotMismatchError extends AnalysisSnapshotMismatchError {
    operation;
    constructor(operation) {
        super("Analysis snapshots do not apply to a resource-only app session because it has no executable identity or replay binding.");
        this.operation = operation;
    }
}
/** A session Evidence reference is missing or has the wrong semantic identity. */
export class EvidenceReferenceError extends EvidenceIntegrityError {
    evidenceId;
    reason;
    expected;
    actual;
    /** Set when the consuming workflow requires retained closure. */
    referenceScope;
    constructor(evidenceId, reason, options) {
        super(`Evidence reference ${reason}: ${evidenceId}`, options);
        this.evidenceId = evidenceId;
        this.reason = reason;
        this.expected = options.expected;
        this.actual = options.actual;
        this.referenceScope = options.referenceScope;
    }
}
export class EvidenceFileError extends AnalysisError {
    operation;
    reason;
    _tag = "EvidenceFileError";
    userMessage;
    /** Caller-selected path that failed, resolved against the working directory. */
    path;
    /** Present only when a write committed before cleanup failed. */
    published;
    /** Schema issues relative to the selected file's JSON root, never the request envelope. */
    contentIssues;
    systemCode;
    /** For `wrong-kind`: the recognized kind the file holds instead, when known. */
    detectedKind;
    constructor(operation, reason, options) {
        super(`Evidence bundle ${operation} failed: ${reason}`, options);
        this.operation = operation;
        this.reason = reason;
        this.path = options?.path;
        this.published = options?.published;
        this.userMessage = options?.userMessage;
        this.contentIssues = options?.contentIssues;
        this.systemCode = options?.systemCode;
        this.detectedKind = options?.detectedKind;
    }
}
