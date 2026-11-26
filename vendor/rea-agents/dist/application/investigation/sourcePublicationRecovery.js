import { ZodError } from "zod";
import { createAnalysisExecutionEvidence } from "../../domain/analysisObservation.js";
import { isDigest } from "../../domain/digests.js";
import { evidenceDisplayMetadataAgree, evidenceSchema, isImmutableEvidence, } from "../../domain/evidence.js";
import { safeParseImmutableEvidence } from "../../domain/evidenceValidation.js";
import { freezeJsonSnapshot } from "../../domain/immutableJson.js";
import { jsonObjectSchema } from "../../domain/jsonValue.js";
import { estimateJsonArrayScalarEntry, estimateJsonStorage, } from "../JsonAuthenticationHeadroom.js";
import { admitInvestigationAuthentication } from "./InvestigationRetention.js";
/** Preserve a completed result only after authenticating it and checking its actual owner. */
export const preserveCompletedSourceEvidence = (error, evidence, evidenceForAnalysis) => {
    if (!isImmutableEvidence(evidence)) {
        const headroom = admitInvestigationAuthentication(evidence, evidence.operation, {});
        if (!headroom.ok) {
            error.retainSourcePublication({
                kind: "omitted",
                reason: headroom.error._tag === "AnalysisResourceConstraintError"
                    ? "insufficient-authentication-headroom"
                    : "primary-authentication-failed",
                source_closure: "not-established",
            });
            return;
        }
    }
    const authenticated = safeParseImmutableEvidence(evidence);
    if (!authenticated.ok) {
        error.retainSourcePublication({
            kind: "omitted",
            reason: "primary-authentication-failed",
            source_closure: "not-established",
        });
        return;
    }
    const valid = authenticated.value;
    const retained = evidenceForAnalysis?.(valid.evidence_id);
    error.retainSourcePublication(freezeJsonSnapshot(evidenceForAnalysis === undefined
        ? {
            kind: "inline-evidence",
            retention: "unknown",
            source_closure: "not-established",
            evidence: valid,
        }
        : retained !== undefined &&
            evidenceDisplayMetadataAgree(retained, valid)
            ? {
                kind: "retained-evidence",
                source_closure: "not-established",
                evidence_id: valid.evidence_id,
            }
            : {
                kind: "unretained-evidence",
                source_closure: "not-established",
                evidence: valid,
            }));
};
/** Materialize a provider result only after source recording failed and admission succeeds. */
export const recoverProviderSourceFailure = (input) => {
    const { error, operation, parameters, execution, admit, evidenceForAnalysis, } = input;
    const { sourceEvidence, ...primaryExecution } = execution;
    // The schema owns the envelope shape. Measure its generated fields and then
    // account for source IDs incrementally, before allocating the ID array.
    const shell = Object.fromEntries(Object.keys(evidenceSchema.shape).map((key) => [key, null]));
    shell.evidence_id = `ev_${"0".repeat(64)}`;
    shell.predicate_type = "rea.analysis";
    shell.confidence = "observed";
    shell.authority = "shipped-artifact";
    shell.evidence_links = [];
    const base = estimateJsonStorage(shell);
    let sourceValueBytes = base.valueBytes;
    let sourceSerializedUtf16Bytes = base.serializedUtf16Bytes;
    let validSourceIds = true;
    for (const [index, source] of sourceEvidence.entries()) {
        const id = recoverySourceId(source);
        const entry = estimateJsonArrayScalarEntry(id, index > 0);
        sourceValueBytes += entry.valueBytes;
        sourceSerializedUtf16Bytes += entry.serializedUtf16Bytes;
        validSourceIds &&=
            id !== null &&
                id.length === 67 &&
                id.startsWith("ev_") &&
                isDigest(id.slice(3));
    }
    const headroom = admit({
        operation,
        parameters,
        execution: primaryExecution,
        subject: execution.subject,
    }, operation, {
        valueBytes: sourceValueBytes,
        serializedUtf16Bytes: sourceSerializedUtf16Bytes,
    });
    if (!headroom.ok) {
        error.retainSourcePublication({
            kind: "omitted",
            reason: headroom.error._tag === "AnalysisResourceConstraintError"
                ? "insufficient-authentication-headroom"
                : "recovery-input-invalid",
            source_closure: "not-established",
        });
        return;
    }
    let evidence;
    if (validSourceIds) {
        try {
            evidence = createAnalysisExecutionEvidence(operation, parameters, execution, "observed", { immutable: true });
        }
        catch (cause) {
            if (!(cause instanceof ZodError))
                throw cause;
        }
    }
    if (evidence !== undefined) {
        preserveCompletedSourceEvidence(error, evidence, evidenceForAnalysis);
        return;
    }
    const observation = jsonObjectSchema.parse({
        operation,
        parameters,
        result: execution.result,
        raw_result: execution.rawResult,
        provider: execution.provider,
        analysis_profile: execution.analysisProfile ?? null,
        subject: execution.subject ?? null,
        limitations: execution.limitations,
        locations: execution.locations,
        relationship_coverage: execution.relationshipCoverage ?? null,
        source_evidence_ids: sourceEvidence.map(recoverySourceId),
    });
    error.retainSourcePublication(freezeJsonSnapshot({
        kind: "unretained-observation",
        source_closure: "not-established",
        observation,
    }));
};
/** Read only an ordinary data property; source payloads may have failed validation. */
const recoverySourceId = (source) => {
    if (typeof source !== "object" || source === null)
        return null;
    const property = Object.getOwnPropertyDescriptor(source, "evidence_id");
    return property !== undefined &&
        "value" in property &&
        typeof property.value === "string"
        ? property.value
        : null;
};
