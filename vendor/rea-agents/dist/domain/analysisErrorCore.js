import { AnalysisError, } from "./analysisErrorBase.js";
/** A readable supplied artifact lies outside this operation's supported target formats. */
export class AnalysisUnsupportedTargetError extends AnalysisError {
    operation;
    path;
    reason;
    _tag = "AnalysisUnsupportedTargetError";
    /** Refusal-specific recovery, when the producer knows an available workflow. */
    remediationAction;
    /** The target holds the content, so unsupported does not make it inapplicable. */
    undecodedContent;
    constructor(operation, path, reason, options) {
        super(`Unsupported target for ${operation} at ${path}: ${reason}`, options);
        this.operation = operation;
        this.path = path;
        this.reason = reason;
        this.remediationAction = options?.remediationAction;
        this.undecodedContent = options?.undecodedContent ?? false;
    }
}
/** An analysis or transport resource failure, distinct from malformed input or unsupported coverage. */
export const ANALYSIS_RESOURCE_KINDS = [
    "memory",
    "cpu",
    "file-size",
    "transport",
    "capacity",
];
/** A measured resource constraint or bounded admission refusal. */
export class AnalysisResourceConstraintError extends AnalysisError {
    operation;
    resource;
    reason;
    reportedLimits;
    _tag = "AnalysisResourceConstraintError";
    /**
     * The one recovery this refusal carries. A fixed allowance and a separate
     * remediation sentence do not co-occur; retryability belongs to that same
     * object.
     */
    recovery;
    /**
     * Whether the refused request reached its peer: false when it was refused
     * before anything was sent, true when the peer received it and may have
     * acted on it. Undefined when the producer does not know.
     */
    requestSent;
    constructor(operation, resource, reason, reportedLimits, options) {
        super(`Resource constraint during ${operation}: ${reason}`, options);
        this.operation = operation;
        this.resource = resource;
        this.reason = reason;
        this.reportedLimits = reportedLimits;
        this.recovery = resourceConstraintRecoveryFrom(options);
        this.requestSent = options?.requestSent;
    }
    /** Projection of `recovery`. Absent when recovery names a fixed allowance. */
    get remediationAction() {
        return this.recovery.remediationAction;
    }
    /**
     * Projection of `recovery`. The fixed format, decoder, or capture allowance
     * that refused the request. Worker limits and host resources do not raise
     * it, so recovery derives from this allowance rather than from `resource`.
     */
    get fixedAllowance() {
        return this.recovery.fixedAllowance;
    }
    /**
     * Projection of `recovery`. Whether retrying the same request can succeed.
     * A caller-selected bound is deterministic for the same input, so it is not
     * retryable even when its resource kind would otherwise be treated as
     * admission capacity.
     */
    get retryable() {
        return this.recovery.retryable;
    }
}
const resourceConstraintRecoveryFrom = (options) => {
    if (options?.fixedAllowance !== undefined)
        return {
            fixedAllowance: options.fixedAllowance,
            ...(options.retryable === undefined
                ? {}
                : { retryable: options.retryable }),
        };
    return {
        ...(options?.remediationAction === undefined
            ? {}
            : { remediationAction: options.remediationAction }),
        ...(options?.measuredExhaustion === undefined
            ? {}
            : { measuredExhaustion: options.measuredExhaustion }),
        ...(options?.retryable === undefined
            ? {}
            : { retryable: options.retryable }),
    };
};
/**
 * Re-attribute a resource refusal to another operation. Recovery and the
 * structured setting limit travel with it; a new error that keeps only the
 * sentence drops the setting, source, and effective value.
 */
export const reattributedResourceConstraint = (operation, error, options) => new AnalysisResourceConstraintError(operation, error.resource, error.reason, error.reportedLimits, {
    ...options,
    ...resourceConstraintRecovery(error),
    ...(error.limit === undefined ? {} : { limit: error.limit }),
    ...(error.related === undefined ? {} : { related: error.related }),
    ...(error.requestSent === undefined
        ? {}
        : { requestSent: error.requestSent }),
});
/**
 * Refuse at a fixed ceiling that its producer named. The ceiling carries its
 * own value and recovery, so no other limit is reported beside it, and the
 * unchanged request is not retryable.
 */
export const fixedCeilingConstraint = (operation, resource, reason, ceiling, options) => new AnalysisResourceConstraintError(operation, resource, reason, null, {
    ...options,
    retryable: false,
    fixedAllowance: ceiling,
});
/** Carry one refusal's recovery to an error re-attributed or redacted elsewhere. */
export const resourceConstraintRecovery = (error, text = (value) => value) => {
    const recovery = error.recovery;
    return recovery.fixedAllowance !== undefined
        ? {
            fixedAllowance: {
                ...recovery.fixedAllowance,
                name: text(recovery.fixedAllowance.name),
                ...(recovery.fixedAllowance.narrowing === undefined
                    ? {}
                    : { narrowing: text(recovery.fixedAllowance.narrowing) }),
            },
            ...(recovery.retryable === undefined
                ? {}
                : { retryable: recovery.retryable }),
        }
        : {
            ...(recovery.remediationAction === undefined
                ? {}
                : { remediationAction: text(recovery.remediationAction) }),
            ...(recovery.measuredExhaustion === undefined
                ? {}
                : { measuredExhaustion: recovery.measuredExhaustion }),
            ...(recovery.retryable === undefined
                ? {}
                : { retryable: recovery.retryable }),
        };
};
/** Provider-neutral invalid analysis input or output at an application boundary. */
export class AnalysisProtocolError extends AnalysisError {
    _tag = "AnalysisProtocolError";
}
/** Caller input failed provider-neutral application parsing. */
export class AnalysisInputError extends AnalysisError {
    operation;
    issues;
    _tag = "AnalysisInputError";
    userMessage;
    /** Refusal-specific correction, when the generic input-contract advice cannot fix it. */
    remediationAction;
    /**
     * The refused values satisfy the advertised input contract; the selected
     * target lacks the requested fact for them. Re-reading the schema cannot
     * correct such a refusal, so it carries no input-contract recovery.
     */
    conformsToInputContract;
    /** A schema-valid selector that matched several candidates. */
    ambiguousSelector;
    constructor(operation, options, issues = []) {
        super(`Invalid analysis input for ${operation}`, options);
        this.operation = operation;
        this.issues = issues;
        this.userMessage = options?.userMessage;
        this.remediationAction = options?.remediationAction;
        this.ambiguousSelector = options?.ambiguousSelector;
        // An ambiguous selection conforms to the schema; the contract is not at fault.
        this.conformsToInputContract =
            options?.conformsToInputContract ??
                options?.ambiguousSelector !== undefined;
    }
}
/** Provider output failed provider-neutral application parsing. */
export class AnalysisOutputError extends AnalysisError {
    operation;
    reason;
    _tag = "AnalysisOutputError";
    userMessage;
    remediationAction;
    cleanupOnly;
    constructor(operation, reason, options) {
        super(`Invalid analysis output for ${operation}: ${reason}`, options);
        this.operation = operation;
        this.reason = reason;
        this.userMessage = options?.userMessage;
        this.remediationAction = options?.remediationAction;
        this.cleanupOnly = options?.cleanupOnly ?? false;
    }
}
/** Selected provider cannot execute a declared analysis operation. */
export class AnalysisCapabilityUnavailableError extends AnalysisError {
    providerId;
    operation;
    reason;
    _tag = "AnalysisCapabilityUnavailableError";
    userMessage;
    remediationAction;
    /** General recovery used only when a consumer has no more specific action. */
    fallbackRemediationAction;
    siblingOperations;
    siblingReasons;
    /** Incomplete cleanup must settle before the operation can be retried. */
    retryable;
    /**
     * Operations the caller can run now that observe part of what this one
     * would answer; the remediation states what they do not establish.
     */
    alternatives;
    constructor(providerId, operation, reason, options) {
        super(`Provider ${providerId} cannot execute ${operation}: ${reason}`, options);
        this.providerId = providerId;
        this.operation = operation;
        this.reason = reason;
        this.userMessage = options?.userMessage;
        this.remediationAction = options?.remediationAction;
        this.fallbackRemediationAction = options?.fallbackRemediationAction;
        this.siblingOperations = options?.siblingOperations;
        this.siblingReasons = options?.siblingReasons;
        this.retryable = options?.retryable === true && !this.cleanupIncomplete;
        this.alternatives = Object.freeze([...(options?.alternatives ?? [])]);
    }
}
/**
 * Cancellation, by the caller or by REA closing the work's owner, won before
 * provider-neutral work completed. Build it with `cancelledBy`, which requires
 * the reason; `cause` holds that reason.
 */
export class AnalysisCancelledError extends AnalysisError {
    operation;
    _tag = "AnalysisCancelledError";
    userMessage;
    constructor(operation, options) {
        super(`Analysis operation was cancelled: ${operation}`, options);
        this.operation = operation;
        this.userMessage = options?.userMessage;
    }
}
const OWNER_CANCELLATION_MESSAGES = {
    "owner-closed": "REA closed the owner of this operation before it completed",
    "startup-owner-closed": "REA closed the owner of this operation before it completed",
    "deadline-elapsed": "An internal REA bound on this operation elapsed",
    "no-longer-needed": "REA stopped work whose result is no longer needed",
};
/**
 * A cancellation REA initiated itself, such as a provider closing. It stands
 * in for a caller abort reason, so it is never mistaken for one.
 */
export class OwnerCancellation extends Error {
    kind;
    name = "OwnerCancellation";
    constructor(kind) {
        super(OWNER_CANCELLATION_MESSAGES[kind]);
        this.kind = kind;
    }
    /**
     * One shared reason per kind, so repeated owner cancellations compare equal
     * the way repeated observations of one caller abort do.
     */
    static ownerClosed = new OwnerCancellation("owner-closed");
    /** Reserved for the owner of a `SharedStartupAttempt`; see its kind. */
    static startupOwnerClosed = new OwnerCancellation("startup-owner-closed");
    /** An internal bound elapsed; see its kind. */
    static deadlineElapsed = new OwnerCancellation("deadline-elapsed");
    /** Work nobody will consume was stopped; see its kind. */
    static noLongerNeeded = new OwnerCancellation("no-longer-needed");
}
const CALLER_ABORT_MESSAGES = {
    interrupt: "The caller interrupted this operation (SIGINT)",
    terminate: "The caller terminated this operation (SIGTERM)",
    "request-cancelled": "The MCP client cancelled this request",
    "client-disconnected": "The client disconnected before this request settled",
};
/**
 * The abort reason an adapter gives when its caller ends work. It is the
 * platform's `AbortError` shape, so consumers that recognize a platform abort
 * keep recognizing it, and it records which adapter observed the abort and any
 * reason the client supplied. Like any caller reason it is opaque: its kind
 * never establishes failure origin or cleanup authority.
 */
export class CallerAbort extends DOMException {
    kind;
    clientReason;
    constructor(kind, 
    /** The client's own stated reason, such as an MCP cancellation's `reason`. */
    clientReason) {
        super(CALLER_ABORT_MESSAGES[kind], "AbortError");
        this.kind = kind;
        this.clientReason = clientReason;
    }
    /** The reason for a process signal delivered to a one-shot command. */
    static forProcessSignal(signal) {
        return new CallerAbort(signal === "SIGINT" ? "interrupt" : "terminate");
    }
}
/** Mark a reason already observed from the caller's abort, such as an inner failure's recorded reason. */
export const carriedReason = (reason) => ({
    carried: reason,
});
/** Whether an optional signal has aborted; narrows it to pass to `cancelledBy`. */
export const isAborted = (signal) => signal?.aborted === true;
// Signals are matched structurally last: callers and tests may pass an
// AbortSignal implementation from another realm or a signal-shaped fake.
const cancellationCause = (reason) => {
    if (reason instanceof AnalysisCancelledError)
        return reason.cause;
    if (reason instanceof OwnerCancellation)
        return reason;
    if ("carried" in reason)
        return reason.carried;
    return reason.reason;
};
/** The one constructor for a cancellation: its reason is required. */
export const cancelledBy = (operation, reason, options) => new AnalysisCancelledError(operation, {
    ...options,
    cause: cancellationCause(reason),
});
/** Provider-neutral operation exceeded its declared execution deadline. */
export class AnalysisTimeoutError extends AnalysisError {
    operation;
    timeoutMs;
    _tag = "AnalysisTimeoutError";
    userMessage;
    remediationAction;
    constructor(operation, timeoutMs, options) {
        super(`Analysis operation timed out after ${String(timeoutMs)}ms: ${operation}`, options);
        this.operation = operation;
        this.timeoutMs = timeoutMs;
        this.userMessage = options?.userMessage;
        this.remediationAction = options?.remediationAction;
    }
}
/** Host filesystem permissions denied the selected read; this is not malformed caller input. */
export class AnalysisAccessDeniedError extends AnalysisError {
    operation;
    path;
    systemCode;
    _tag = "AnalysisAccessDeniedError";
    constructor(operation, path, systemCode, options) {
        super(`Host filesystem read access denied (${systemCode}) for ${path} during ${operation}`, options);
        this.operation = operation;
        this.path = path;
        this.systemCode = systemCode;
    }
}
/** Selected artifact acquisition observed a change, so no stable identity can be reported. */
export class AnalysisArtifactChangedError extends AnalysisError {
    operation;
    path;
    reason;
    _tag = "AnalysisArtifactChangedError";
    /** The consistency check the producing reader named, when it named one. */
    integrityCheck;
    constructor(operation, path, reason, options) {
        super(`Selected artifact changed during acquisition: ${reason}`, options);
        this.operation = operation;
        this.path = path;
        this.reason = reason;
        this.integrityCheck = options?.integrityCheck;
    }
}
