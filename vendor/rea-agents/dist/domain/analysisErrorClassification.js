import { AnalysisCapabilityUnavailableError } from "./analysisErrorCore.js";
import { domainErrorTag, } from "./analysisErrorBase.js";
import { ArtifactOperationError } from "./artifactOperationError.js";
import { BrowserObservationError } from "./browserObservationError.js";
import { BinaryTargetError, } from "./configurationErrors.js";
import { EvidenceFileError } from "./evidenceErrors.js";
import { ProviderSelectionError, } from "./providerSelectionError.js";
import { UnknownRegistryError } from "./unknownRegistryError.js";
/** Codes whose failures may succeed when the unchanged request is repeated. */
export const RETRYABLE_CODES = new Set([
    "artifact_changed",
    "provider_timeout",
    "cancelled",
    "revision_conflict",
    "provider_unavailable",
]);
const classified = (code, category) => ({ code, category });
const STATIC_ERROR_CLASSIFICATIONS = {
    AnalysisProtocolError: classified("unreadable_output", "execution_failure"),
    AnalysisOutputError: classified("unreadable_output", "execution_failure"),
    AnalysisInputError: classified("invalid_request", "invalid_input"),
    AnalysisAccessDeniedError: classified("access_denied", "unavailable"),
    AnalysisArtifactChangedError: classified("artifact_changed", "integrity_mismatch"),
    AnalysisCapabilityUnavailableError: classified("capability_unavailable", "unsupported_provider"),
    AnalysisUnsupportedTargetError: classified("unsupported_target", "unsupported_target"),
    AnalysisCancelledError: classified("cancelled", "cancelled"),
    AnalysisTimeoutError: classified("provider_timeout", "timeout"),
    AnalysisResourceConstraintError: classified("resource_constraint", "resource_constraint"),
    ConfigurationError: classified("configuration_invalid", "invalid_input"),
    NoBinaryOpenError: classified("target_unavailable", "unavailable"),
    EvidenceIntegrityError: classified("evidence_integrity_mismatch", "integrity_mismatch"),
    ProviderAdapterError: classified("execution_failure", "execution_failure"),
};
/** A capability the caller may wait for is unavailable, not unsupported. */
const RETRYABLE_CAPABILITY_UNAVAILABLE = classified("capability_unavailable", "unavailable");
const ARTIFACT_OPERATION_CLASSIFICATIONS = {
    cancelled: classified("cancelled", "cancelled"),
    malformed: classified("invalid_request", "invalid_input"),
    truncated: classified("truncated", "truncated"),
    unsupported: classified("unsupported_target", "unsupported_target"),
    format: classified("artifact_operation_failed", "execution_failure"),
    integrity: classified("artifact_operation_failed", "integrity_mismatch"),
    limit: classified("truncated", "truncated"),
    path: classified("artifact_operation_failed", "execution_failure"),
    unavailable: classified("artifact_operation_failed", "unavailable"),
    io: classified("artifact_operation_failed", "execution_failure"),
};
/** An integrity failure that names the artifact's expected and observed identity. */
const ARTIFACT_IDENTITY_MISMATCH = classified("artifact_integrity_mismatch", "integrity_mismatch");
const EVIDENCE_FILE_CLASSIFICATIONS = {
    // A missing, non-file or already-existing path is the caller's selection.
    "not-file": classified("invalid_request", "invalid_input"),
    exists: classified("invalid_request", "invalid_input"),
    "wrong-kind": classified("invalid_request", "invalid_input"),
    missing: classified("invalid_request", "invalid_input"),
    "symlink-traversal": classified("invalid_request", "invalid_input"),
    "invalid-json": classified("evidence_integrity_mismatch", "execution_failure"),
    "path-limit": classified("resource_constraint", "resource_constraint"),
    "storage-limit": classified("resource_constraint", "resource_constraint"),
    io: classified("execution_failure", "execution_failure"),
};
const UNKNOWN_REGISTRY_CLASSIFICATIONS = {
    "not-found": classified("execution_failure", "execution_failure"),
    "already-exists": classified("invalid_request", "invalid_input"),
    "revision-conflict": classified("revision_conflict", "execution_failure"),
    "invalid-transition": classified("execution_failure", "execution_failure"),
    integrity: classified("evidence_integrity_mismatch", "execution_failure"),
    limit: classified("truncated", "execution_failure"),
    constraint: classified("invalid_request", "invalid_input"),
};
const PROVIDER_SELECTION_CLASSIFICATIONS = {
    unknown_provider: classified("capability_unavailable", "unsupported_provider"),
    provider_unavailable: classified("provider_unavailable", "unavailable"),
    target_unsupported: classified("capability_unavailable", "unsupported_provider"),
    ambiguous: classified("capability_unavailable", "unsupported_provider"),
    invalid_options: classified("capability_unavailable", "unsupported_provider"),
};
const BINARY_TARGET_CLASSIFICATIONS = {
    unconstrained: classified("target_unavailable", "unavailable"),
    directory_requires_file: classified("target_unavailable", "unavailable"),
    wasm_requires_static_inspection: classified("target_unavailable", "unsupported_target"),
    file_format_rejected: classified("target_unavailable", "unsupported_target"),
    load_selection_rejected: classified("invalid_request", "invalid_input"),
    bundle_type_unsupported: classified("target_unavailable", "unsupported_target"),
    bundle_info_plist_decode_budget_exceeded: classified("target_unavailable", "unavailable"),
    bundle_info_plist_missing: classified("target_unavailable", "unavailable"),
    bundle_layout_ambiguous: classified("target_unavailable", "unavailable"),
    bundle_executable_undeclared: classified("target_unavailable", "unavailable"),
    bundle_program_missing: classified("target_unavailable", "unavailable"),
    bundle_current_version_missing: classified("target_unavailable", "unavailable"),
    bundle_path_escapes: classified("target_unavailable", "unavailable"),
};
/** A target the host refused to read keeps its constraint's category. */
const binaryTargetClassification = (constraint, readPermissionDenied) => {
    const base = BINARY_TARGET_CLASSIFICATIONS[constraint];
    return readPermissionDenied && constraint !== "load_selection_rejected"
        ? { ...base, code: "access_denied" }
        : base;
};
const BROWSER_OBSERVATION_CLASSIFICATIONS = {
    endpoint_unreachable: classified("provider_unavailable", "unavailable"),
    invalid_endpoint_response: classified("unreadable_output", "execution_failure"),
    target_not_found: classified("target_unavailable", "unavailable"),
    target_not_allowed: classified("target_unavailable", "unavailable"),
    application_already_running: classified("target_unavailable", "unavailable"),
    service_worker_blocked: classified("target_unavailable", "unavailable"),
    target_changed: classified("target_unavailable", "unavailable"),
    target_session_detached: classified("target_unavailable", "unavailable"),
    protocol_error: classified("unreadable_output", "execution_failure"),
    disconnected: classified("provider_unavailable", "unavailable"),
    payload_limit: classified("truncated", "truncated"),
    window_not_found: classified("unreadable_output", "execution_failure"),
    window_metadata_missing: classified("unreadable_output", "execution_failure"),
    process_ownership_unavailable: classified("unreadable_output", "execution_failure"),
    cleanup_failed: classified("execution_failure", "execution_failure"),
    cancelled: classified("cancelled", "cancelled"),
    timeout: classified("provider_timeout", "timeout"),
};
/** Any error the caller's cancellation caused reports as that cancellation. */
const CANCELLED = classified("cancelled", "cancelled");
const PROCESS_CAPTURE_FAILED = classified("process_capture_failed", "execution_failure");
/** A tag whose code and category do not depend on the error's facts. */
const staticClassification = (error) => {
    const tag = domainErrorTag(error);
    if (tag === undefined)
        throw new TypeError(`Unpresented provider error: ${error._tag}`);
    switch (tag) {
        case "ArtifactOperationError":
        case "BinaryTargetError":
        case "BrowserObservationError":
        case "EvidenceFileError":
        case "ProcessCaptureError":
        case "ProviderSelectionError":
        case "UnknownRegistryError":
            throw new TypeError(`Unhandled specialized analysis error: ${tag}`);
        default:
            return STATIC_ERROR_CLASSIFICATIONS[tag];
    }
};
/**
 * The code and category of a domain-presented error. A provider-owned error
 * supplies its own through `ownPresentation()`. Cleanup state is applied by
 * the projection, which reports `cleanup_incomplete` above this code.
 */
export const classifyAnalysisError = (error) => {
    const owned = error.ownPresentation();
    if (owned !== undefined)
        return { code: owned.code, category: owned.category };
    if (error instanceof AnalysisCapabilityUnavailableError && error.retryable)
        return RETRYABLE_CAPABILITY_UNAVAILABLE;
    if (error instanceof ProviderSelectionError)
        return PROVIDER_SELECTION_CLASSIFICATIONS[error.reason];
    if (error instanceof BrowserObservationError)
        return error.userCategory === "cancelled"
            ? CANCELLED
            : BROWSER_OBSERVATION_CLASSIFICATIONS[error.reason];
    if (error instanceof ArtifactOperationError)
        return error.reason === "integrity" && error.artifactDetails !== undefined
            ? ARTIFACT_IDENTITY_MISMATCH
            : ARTIFACT_OPERATION_CLASSIFICATIONS[error.reason];
    if (error instanceof BinaryTargetError)
        return binaryTargetClassification(error.constraint ?? "unconstrained", error.systemCode !== undefined);
    if (error instanceof EvidenceFileError)
        return EVIDENCE_FILE_CLASSIFICATIONS[error.reason];
    if (error instanceof UnknownRegistryError)
        return UNKNOWN_REGISTRY_CLASSIFICATIONS[error.reason];
    if (error._tag === "ProcessCaptureError")
        return error.userCategory === "cancelled"
            ? CANCELLED
            : PROCESS_CAPTURE_FAILED;
    return staticClassification(error);
};
/**
 * One catalogue row. A provider that presents its own errors lists them
 * through this, so its rows read like the domain's.
 */
export const catalogueRow = (tag, discriminant, classification, retryableByDefault = RETRYABLE_CODES.has(classification.code)) => ({
    tag,
    discriminant,
    ...classification,
    retryableByDefault,
});
const reasonRows = (tag, table) => Object.entries(table).map(([reason, classification]) => catalogueRow(tag, `reason=${reason}`, classification));
/**
 * Every domain error case and its caller-facing code and category. A
 * provider-owned error presents itself, and its provider lists its rows.
 * Cleanup that did not complete reports `cleanup_incomplete` above any row.
 */
export const analysisErrorCatalogue = () => [
    ...Object.entries(STATIC_ERROR_CLASSIFICATIONS).map(([tag, classification]) => catalogueRow(tag, "", classification)),
    catalogueRow("AnalysisCapabilityUnavailableError", "retryable=true", RETRYABLE_CAPABILITY_UNAVAILABLE, true),
    ...reasonRows("ArtifactOperationError", ARTIFACT_OPERATION_CLASSIFICATIONS),
    catalogueRow("ArtifactOperationError", "reason=integrity; artifact identity reported", ARTIFACT_IDENTITY_MISMATCH),
    ...Object.keys(BINARY_TARGET_CLASSIFICATIONS).flatMap((key) => {
        const constraint = key;
        const allowed = binaryTargetClassification(constraint, false);
        const denied = binaryTargetClassification(constraint, true);
        return [
            catalogueRow("BinaryTargetError", `constraint=${constraint}`, allowed),
            ...(denied.code === allowed.code
                ? []
                : [
                    catalogueRow("BinaryTargetError", `constraint=${constraint}; read permission denied`, denied),
                ]),
        ];
    }),
    ...reasonRows("BrowserObservationError", BROWSER_OBSERVATION_CLASSIFICATIONS),
    catalogueRow("BrowserObservationError", "caused by cancellation", CANCELLED),
    ...reasonRows("EvidenceFileError", EVIDENCE_FILE_CLASSIFICATIONS),
    catalogueRow("ProcessCaptureError", "", PROCESS_CAPTURE_FAILED),
    catalogueRow("ProcessCaptureError", "caused by cancellation", CANCELLED),
    ...reasonRows("ProviderSelectionError", PROVIDER_SELECTION_CLASSIFICATIONS),
    ...reasonRows("UnknownRegistryError", UNKNOWN_REGISTRY_CLASSIFICATIONS),
];
