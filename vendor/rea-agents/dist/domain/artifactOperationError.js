import { projectArtifactIntegrityDetails, } from "./artifactIntegrity.js";
import { AnalysisError, } from "./analysisErrorBase.js";
/**
 * Which consistency check an `integrity` failure tripped, so consumers need
 * not read the message: a member the reader did not produce, member metadata
 * that differs from inventory, a container or unpacked file whose identity
 * changed, a directory or archive member whose file identity or bytes
 * changed since inventory, short read coverage, bytes disagreeing with the
 * declared size, a disk image whose stored checksum does not verify, a read
 * stream over a handle the reader does not own, a format-declared digest or
 * checksum that disagrees with content or cannot be checked, layout sources
 * (structural index, tool listing, region table) that are malformed, disagree
 * or place an entry outside the artifact, entries that do not reassemble into
 * the source, an inventory node or verified state a later read relies on
 * that is missing, output bytes that do not read back as written, or an
 * output tree used after commit or whose cleanup could not be verified,
 * or a verification traversal that did not reproduce every inventoried entry.
 */
export const ARTIFACT_INTEGRITY_CHECKS = [
    "foreign-entry",
    "entry-metadata",
    "container-identity",
    "unpacked-entry-identity",
    "member-identity",
    "image-checksum",
    "read-coverage",
    "declared-size",
    "reader-ownership",
    "declared-digest",
    "layout-consistency",
    "reconstruction",
    "inventory-node",
    "output-readback",
    "output-lifecycle",
    "traversal-coverage",
];
/** Artifact inventory or extraction failed a typed safety boundary. */
export class ArtifactOperationError extends AnalysisError {
    operation;
    reason;
    artifactDetails;
    detail;
    _tag = "ArtifactOperationError";
    userMessage;
    remediationAction;
    admission;
    boundary;
    readerLimit;
    parserLimit;
    /** For a `limit` reason, the release-fixed allowance that refused the input. */
    fixedAllowance;
    /** For an `integrity` reason, the check the producing reader named. */
    integrityCheck;
    constructor(operation, reason, artifactDetails, 
    /** The specific constraint that failed, such as the colliding path. */
    detail, options) {
        super(artifactDetails === undefined
            ? `Artifact ${operation} failed: ${reason}`
            : artifactDetailsMessage(operation, reason, artifactDetails), options);
        this.operation = operation;
        this.reason = reason;
        this.artifactDetails = artifactDetails;
        this.detail = detail;
        this.admission = options?.admission;
        this.boundary = options?.boundary;
        this.readerLimit = options?.readerLimit;
        this.parserLimit = options?.parserLimit;
        this.fixedAllowance = options?.fixedAllowance;
        this.integrityCheck = options?.integrityCheck;
        this.remediationAction = options?.remediationAction;
        this.userMessage =
            options?.userMessage ??
                (options?.admission === undefined ? undefined : detail);
    }
}
const artifactDetailsMessage = (operation, reason, details) => {
    const { logical_path, ...facts } = projectArtifactIntegrityDetails(details);
    const description = Object.entries(facts)
        .map(([key, value]) => `${key}=${String(value ?? "unavailable")}`)
        .join(", ");
    return `Artifact ${operation} failed: ${reason} at ${logical_path} (${description})`;
};
