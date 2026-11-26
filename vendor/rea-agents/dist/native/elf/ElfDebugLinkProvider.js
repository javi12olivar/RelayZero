import { isParseLimit, parseFailureAnalysisError, parseLimitConstraint, } from "../../domain/parseFailureAnalysisError.js";
import { decodeLimit } from "../../domain/parseFailure.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { projectArtifactCloseFailure, projectOwnedArtifactIdentityFailure, projectSelectedArtifactFileFailure, projectStableArtifactFailure, stableArtifactInputFailure, ArtifactReaderFailure, completedStableArtifactStream, readStableArtifact, streamStableArtifact, artifactFilePrimaryFacts, ArtifactResourceScope, } from "../../resources/index.js";
import { ArtifactOperationError } from "../../domain/artifactOperationError.js";
import { fixedAllowanceOptions } from "../../domain/fixedAllowanceRemediation.js";
import { ELF_DEBUG_LINK_CANDIDATE_INCOMPLETE_LIMITATION, MAX_ELF_DEBUG_CANDIDATE_BYTES, MAX_INSPECT_ELF_DEBUG_LINK_ENTRIES, MAX_INSPECT_ELF_DEBUG_LINK_FILE_BYTES, } from "../../domain/native/elfDebugLink.js";
import { err, ok } from "../../domain/result.js";
import { ELF_DEBUG_LINK_PROVIDER } from "../../domain/investigationProviders.js";
import { binaryResourceCeiling, BinaryResourceFailure, } from "../../domain/binaryContainer.js";
import { continueGnuDebuglinkCrc32, parseElfDebugLinkCooperative, unreadableElfDebugCandidate, verifyElfDebugCandidate, verifyElfDebugCandidateCooperative, } from "./ElfDebugLink.js";
import { ELF_NOTE_TEXT_ALLOWANCE } from "./ElfNoteParser.js";
import { elfSectionNameBudget } from "../../domain/native/elfSectionNameTable.js";
const OPERATION = "inspect_elf_debug_link";
/** Portable parser over one bounded ELF and an optional caller-selected candidate. */
export class ElfDebugLinkProvider {
    identity = ELF_DEBUG_LINK_PROVIDER;
    #resources = new ArtifactResourceScope();
    async close() {
        try {
            await this.#resources.close();
        }
        catch (cause) {
            throw projectArtifactCloseFailure(cause, ELF_DEBUG_LINK_PROVIDER.id, OPERATION);
        }
    }
    async inspect(input, options) {
        let field = "path";
        let candidatePhase;
        let candidate;
        let crc32 = 0;
        let snapshot;
        try {
            return await this.#resources.run(async () => {
                field = "path";
                snapshot = await readStableArtifact(input.path, input.max_file_bytes, options?.signal, undefined, this.#resources);
                const image = await parseElfDebugLinkCooperative(snapshot.bytes, {
                    path: input.path,
                    sha256: snapshot.sha256,
                    bytes: snapshot.bytes.length,
                }, input, options?.signal);
                if (input.candidate_path === undefined)
                    return ok(image);
                field = "candidate_path";
                candidatePhase = { report: image, path: input.candidate_path };
                try {
                    // Stream the whole candidate for the debuglink CRC32 and SHA-256.
                    // Only a file within max_file_bytes is retained for ELF decoding;
                    // a larger one keeps just its ELF header.
                    candidate = await streamStableArtifact(input.candidate_path, MAX_ELF_DEBUG_CANDIDATE_BYTES, {
                        retainBytes: (size) => size <= input.max_file_bytes ? size : ELF_HEADER_PREFIX_BYTES,
                        onChunk: (chunk) => {
                            crc32 = continueGnuDebuglinkCrc32(crc32, chunk);
                        },
                        signal: options?.signal,
                        resourceScope: this.#resources,
                    });
                }
                catch (cause) {
                    if (!candidateUnreadable(cause))
                        throw cause;
                    return ok(unreadableElfDebugCandidate(image));
                }
                return ok(await verifiedCandidate(candidatePhase, candidate, crc32, input, options?.signal));
            });
        }
        catch (cause) {
            return err(elfDebugLinkFailure(cause, input, field, candidatePhase === undefined
                ? { imageSnapshot: snapshot }
                : {
                    retained: candidatePhaseObservation(candidatePhase, cause, crc32, input, candidate),
                }));
        }
    }
}
const candidateFile = (phase, candidate, crc32) => ({
    path: phase.path,
    sha256: candidate.sha256,
    bytes: candidate.size,
    crc32,
    prefix: candidate.prefix,
});
const verifiedCandidate = (phase, candidate, crc32, input, signal) => verifyElfDebugCandidateCooperative(phase.report, candidateFile(phase, candidate, crc32), input, signal);
const unverifiedCandidateObservation = (report, candidate) => ({
    ...report,
    candidate: {
        path: candidate.path,
        sha256: candidate.sha256,
        bytes: candidate.bytes,
        format: null,
        byte_order: null,
        debug_info: "unknown",
        symtab: "unknown",
    },
    limitations: [
        ...report.limitations,
        "The candidate read completed. Its ELF comparison did not complete.",
    ],
});
/** Retain the completed stream without restarting an interrupted comparison. */
const candidatePhaseObservation = (phase, cause, crc32, input, candidate) => {
    if (candidate !== undefined)
        return unverifiedCandidateObservation(phase.report, candidateFile(phase, candidate, crc32));
    const completed = completedStableArtifactStream(cause);
    if (completed === undefined)
        return {
            ...phase.report,
            limitations: [
                ...phase.report.limitations,
                ELF_DEBUG_LINK_CANDIDATE_INCOMPLETE_LIMITATION,
            ],
        };
    const file = candidateFile(phase, completed, crc32);
    // A stream whose close failed can still supply a complete comparison.
    try {
        return verifyElfDebugCandidate(phase.report, file, input);
    }
    catch {
        return unverifiedCandidateObservation(phase.report, file);
    }
};
/** Enough retained bytes for an ELF32 or ELF64 fixed header. */
const ELF_HEADER_PREFIX_BYTES = 64;
/**
 * A candidate that is missing, unreadable, fails a data read, changed while
 * streamed, or is above the whole-file ceiling cannot be compared. Path-shape refusals, cancellation,
 * and descriptor close failures, including a close that failed after an
 * integrity or limit refusal, still fail the call.
 */
const candidateUnreadable = (cause) => {
    // A failed close keeps the original reason beside the cleanup observation;
    // it must stay a failure so the pending handle remains visible.
    if (cause instanceof ArtifactReaderFailure)
        return (cause.cleanup === undefined &&
            (cause.reason === "integrity" || cause.reason === "limit"));
    if (!(cause instanceof Error) || !("code" in cause))
        return false;
    return (cause.code === "ENOENT" ||
        cause.code === "ENOTDIR" ||
        cause.code === "EACCES" ||
        cause.code === "EPERM" ||
        cause.code === "EIO");
};
const inputLabel = (field) => field === "candidate_path" ? "candidate" : "image";
const inputBudgetRemediation = (boundary, input, field) => {
    const label = inputLabel(field);
    return boundary === "file-size"
        ? input.max_file_bytes >= MAX_INSPECT_ELF_DEBUG_LINK_FILE_BYTES
            ? `The ${label} exceeds the ${String(MAX_INSPECT_ELF_DEBUG_LINK_FILE_BYTES)}-byte input ceiling this operation accepts; select a smaller ${label}.`
            : `Raise max_file_bytes above ${String(input.max_file_bytes)} bytes or select a smaller ${label}; the limit is the caller-selected input read budget.`
        : input.max_entries >= MAX_INSPECT_ELF_DEBUG_LINK_ENTRIES
            ? `The ${label} exceeds the ${String(MAX_INSPECT_ELF_DEBUG_LINK_ENTRIES)}-entry note-table ceiling this operation accepts; select a smaller ${label}.`
            : `Raise max_entries above ${String(input.max_entries)} or select a smaller ${label}; the limit is the caller-selected note entry budget.`;
};
const sectionNameBudgetRemediation = (required, field) => {
    const label = inputLabel(field);
    return required <= BigInt(MAX_INSPECT_ELF_DEBUG_LINK_FILE_BYTES)
        ? `Raise max_file_bytes to at least ${String(required)} bytes to admit the ${label} and its decoded ELF section names.`
        : `The ${label} and its decoded ELF section names require ${String(required)} bytes, above this operation's ${String(MAX_INSPECT_ELF_DEBUG_LINK_FILE_BYTES)}-byte maximum; select a ${label} with a smaller section-name table.`;
};
const selectedPath = (input, field) => field === "candidate_path"
    ? (input.candidate_path ?? input.path)
    : input.path;
const elfDebugLinkFailurePrimary = (facts, input, field) => {
    const { cause, origin } = facts;
    if (origin === "owned-or-classified" && cause instanceof AnalysisError)
        return cause;
    const path = selectedPath(input, field);
    const sectionNameBudget = elfSectionNameBudget(cause);
    if (isParseLimit(cause, "elf") && sectionNameBudget !== undefined)
        return parseLimitConstraint(OPERATION, "memory", cause, {
            retryable: false,
            remediationAction: sectionNameBudgetRemediation(sectionNameBudget.required, field),
        });
    if (cause instanceof BinaryResourceFailure)
        return parseLimitConstraint(OPERATION, "memory", cause, fixedAllowanceOptions("The ELF structural decoding allowance", "parser", binaryResourceCeiling(cause)));
    if (isParseLimit(cause, "elf-notes")) {
        const entryBudget = cause.failure.limit.name === "max_entries";
        return parseLimitConstraint(OPERATION, entryBudget ? "capacity" : "memory", cause, entryBudget
            ? {
                retryable: false,
                remediationAction: inputBudgetRemediation("capacity", input, field),
            }
            : fixedAllowanceOptions(ELF_NOTE_TEXT_ALLOWANCE, "parser", {
                limit: cause.failure.limit.maximum,
                unit: "bytes",
            }));
    }
    const formatFailure = parseFailureAnalysisError(OPERATION, path, cause, field);
    if (formatFailure !== undefined)
        return formatFailure;
    const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, path);
    if (identityFailure !== undefined)
        return identityFailure;
    if (origin === "owned-or-classified" &&
        cause instanceof ArtifactReaderFailure) {
        if (cause.reason === "limit") {
            const candidate = field === "candidate_path";
            return parseLimitConstraint(OPERATION, "file-size", decodeLimit("elf-debug-link", cause.message, {
                name: candidate ? "candidate_bytes" : "max_file_bytes",
                maximum: candidate
                    ? MAX_ELF_DEBUG_CANDIDATE_BYTES
                    : input.max_file_bytes,
            }, { cause }), candidate
                ? fixedAllowanceOptions("The whole-file debug candidate read allowance", "input", {
                    limit: MAX_ELF_DEBUG_CANDIDATE_BYTES,
                    unit: "bytes",
                })
                : {
                    retryable: false,
                    remediationAction: inputBudgetRemediation("file-size", input, field),
                });
        }
        if (cause.reason === "path" || cause.reason === "format")
            return stableArtifactInputFailure(cause, OPERATION, field);
    }
    const fileFailure = projectSelectedArtifactFileFailure(cause, OPERATION, path, field === "candidate_path" ? "debug file candidate" : "ELF image", field);
    if (fileFailure !== undefined)
        return fileFailure;
    return new ArtifactOperationError(OPERATION, origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure
        ? cause.reason
        : "io", undefined, cause instanceof Error
        ? cause.message
        : "ELF debug-link inspection failed.", { cause });
};
const elfDebugLinkFailure = (cause, input, field, { retained, imageSnapshot, }) => {
    const primary = elfDebugLinkFailurePrimary(artifactFilePrimaryFacts(cause), input, field);
    // Retained before stable-read projection so the decoded report, which
    // already carries any completed candidate identity, takes precedence.
    if (retained !== undefined)
        primary.retainPartialObservation(retained);
    return projectStableArtifactFailure(cause, primary, selectedPath(input, field), ELF_DEBUG_LINK_PROVIDER.id, OPERATION, imageSnapshot);
};
