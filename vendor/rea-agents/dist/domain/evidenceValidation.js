import { z } from "zod";
import { parseEvidence, immutableEvidence } from "./evidence.js";
import { EvidenceIntegrityError } from "./evidenceErrors.js";
import { isUnsupportedEvidenceFormat, } from "./evidenceFormat.js";
import { describeValidationFailure, firstValidationIssue, } from "./validationFailure.js";
import { err, ok } from "./result.js";
/** Expected authentication failures, independent of a caller's error contract. */
export const safeParseEvidence = (input) => authenticateEvidence(input, parseEvidence);
/** Authenticate and seal source records while retaining typed validation failures. */
export const safeParseImmutableEvidence = (input) => authenticateEvidence(input, immutableEvidence);
/**
 * Recognize Evidence in a union of partial observations. Input that names no
 * `evidence_id` is not an Evidence record. A record that names one but fails
 * authentication, or was written in another format revision, is a refusal,
 * never absent: callers must not read it as "no Evidence".
 */
export const recognizeEvidence = (input) => typeof input === "object" && input !== null && "evidence_id" in input
    ? readEvidence(input)
    : ok(undefined);
/**
 * The single refusal of Evidence from another format revision: an integrity
 * mismatch whose message carries the recreate guidance, as for bundles.
 */
export const unsupportedEvidenceFormatError = (cause, side) => new EvidenceIntegrityError(cause.message, {
    cause,
    userMessage: cause.message,
    ...(side === undefined ? {} : { side }),
});
/** Authenticate one source record, preserving unexpected implementation failures. */
export const readEvidence = (input, location) => {
    const parsed = safeParseEvidence(input);
    return parsed.ok
        ? parsed
        : err(integrityFailure(parsed.error, { ...location, within: [] }));
};
/** Authenticate and seal source records retained independently of mutable input. */
export const readImmutableEvidence = (input) => {
    const parsed = safeParseImmutableEvidence(input);
    return parsed.ok
        ? parsed
        : err(integrityFailure(parsed.error, { within: [] }));
};
const authenticateEvidence = (input, parse) => {
    try {
        return ok(parse(input));
    }
    catch (cause) {
        if (cause instanceof z.ZodError || isUnsupportedEvidenceFormat(cause))
            return err(cause);
        throw cause;
    }
};
/** Validate an authenticated source payload, separately from generated output. */
export const readEvidencePayload = (schema, input, location) => {
    const parsed = schema.safeParse(input);
    return parsed.success
        ? ok(parsed.data)
        : err(integrityFailure(parsed.error, location));
};
/**
 * Schema issue facts for an integrity failure. The issue path is reported
 * only when its position in the record (`within`) is known.
 */
export const validationIssueOptions = (cause, within) => {
    const issue = firstValidationIssue(cause);
    if (issue === undefined)
        return {};
    return {
        ...(within === undefined ? {} : { issuePath: [...within, ...issue.path] }),
        ...(issue.constraint === undefined ? {} : { constraint: issue.constraint }),
        remainingIssueCount: issue.remainingIssueCount,
    };
};
const integrityFailure = (cause, location) => {
    if (isUnsupportedEvidenceFormat(cause))
        return unsupportedEvidenceFormatError(cause, location?.side);
    const message = `Evidence validation failed ${describeValidationFailure(cause)}`;
    return new EvidenceIntegrityError(message, {
        cause,
        userMessage: message,
        ...(location?.side === undefined ? {} : { side: location.side }),
        ...validationIssueOptions(cause, location?.within),
    });
};
