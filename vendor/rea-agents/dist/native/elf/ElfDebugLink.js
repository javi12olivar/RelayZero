import { crc32 } from "node:zlib";
import { isParseLimit } from "../../domain/parseFailureAnalysisError.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { ArtifactReaderFailure, assertArtifactReadActive, yieldArtifactRead, } from "../../resources/index.js";
import { readElfFixedHeader } from "../../domain/elfFixedHeader.js";
import { elfObjectTypeName } from "../../domain/native/elfNotes.js";
import { zstandardFrameAllowanceCause, } from "../../domain/compression/zstandardFrameAllowance.js";
import { debugFileNameIsSingleSegment, deriveDebugFileLookupPaths, ELF_DEBUG_LINK_CANDIDATE_BUDGET_LIMITATION, ELF_DEBUG_LINK_CANDIDATE_PREFIX_LIMITATION, ELF_DEBUG_LINK_CANDIDATE_UNREADABLE_LIMITATION, ELF_DEBUG_LINK_CANNOT_VERIFY_LIMITATION, ELF_DEBUG_LINK_LIMITATIONS, ELF_DEBUG_LINK_MULTIPLE_BUILD_IDS_LIMITATION, ELF_DEBUG_LINK_NAME_SEGMENT_LIMITATION, ELF_DEBUG_LINK_UNAVAILABLE_CHECK_LIMITATION, MAX_ELF_DEBUG_ALT_BUILD_ID_BYTES, MAX_ELF_DEBUG_LINK_NAME_BYTES, } from "../../domain/native/elfDebugLink.js";
import { BinaryReader, BinaryFormatFailure, BinaryResourceFailure, } from "../../domain/binaryContainer.js";
import { readElfImage, readElfImageCooperative, } from "../../domain/native/elfImage.js";
import { ElfNoteStorageFailure, parseElfNotes, parseElfNotesCooperative, } from "./ElfNoteParser.js";
import { sharedElfSectionNameDecoder, } from "../../domain/native/elfSectionNameTable.js";
import { err, ok } from "../../domain/result.js";
const DEBUG_SECTION_NAMES = [
    ".gnu_debuglink",
    ".gnu_debugaltlink",
    ".gnu_debugdata",
];
const XZ_MAGIC = Buffer.from([0xfd, 0x37, 0x7a, 0x58, 0x5a, 0x00]);
const GNU_BUILD_ID_NOTE_TYPE = 3;
const fits = (offset, size, fileLength) => offset >= 0n &&
    size >= 0n &&
    offset <= BigInt(fileLength) &&
    size <= BigInt(fileLength) - offset;
const locationOf = (section) => {
    if (!fits(section.declared_range.offset, section.declared_range.size, Number.MAX_SAFE_INTEGER))
        return null;
    return {
        offset: Number(section.declared_range.offset),
        bytes: Number(section.declared_range.size),
    };
};
const inFile = (section, fileLength) => fits(section.declared_range.offset, section.declared_range.size, fileLength);
const untrustedName = (text) => ({
    text,
    encoding: "latin1",
    trust: "observed-untrusted",
});
const crc32Hex = (value) => (value >>> 0).toString(16).padStart(8, "0");
/** Continue a GNU debuglink CRC32 over the next streamed chunk. */
export const continueGnuDebuglinkCrc32 = (value, chunk) => crc32(chunk, value) >>> 0;
const isRethrownBudget = (cause) => isParseLimit(cause, "elf") ||
    isParseLimit(cause, "elf-notes") ||
    cause instanceof BinaryResourceFailure;
const locate = (bytes, found, namesComplete) => {
    const section = found[0];
    if (section === undefined)
        return {
            status: namesComplete ? "absent" : "unknown",
            location: null,
            body: null,
            reason: null,
        };
    if (found.length > 1)
        return {
            status: "malformed",
            location: null,
            body: null,
            reason: "duplicate",
        };
    const location = locationOf(section);
    if (section.type === 8 || location === null || !inFile(section, bytes.length))
        return {
            status: "malformed",
            location: null,
            body: null,
            reason: "not_file_backed",
        };
    if (section.compressed)
        return {
            status: "unsupported",
            location,
            body: null,
            reason: "compressed",
        };
    return {
        status: "present",
        location,
        body: bytes.subarray(location.offset, location.offset + location.bytes),
        reason: null,
    };
};
const closedDebuglink = (status, reason, location = null) => ({
    status,
    location,
    filename: null,
    crc32_hex: null,
    reason,
});
const parseDebuglink = (bytes, found, namesComplete, little) => {
    const located = locate(bytes, found, namesComplete);
    if (located.reason === "duplicate")
        return closedDebuglink("malformed", "debuglink_duplicate_section");
    if (located.reason === "not_file_backed")
        return closedDebuglink("malformed", "debuglink_not_file_backed");
    if (located.reason === "compressed")
        return closedDebuglink("unsupported", "debuglink_section_compressed", located.location);
    if (located.status !== "present" || located.body === null)
        return closedDebuglink(located.status, null);
    const body = located.body;
    const nul = body.indexOf(0);
    if (nul < 0)
        return closedDebuglink("malformed", "debuglink_unterminated_name", located.location);
    const crcOffset = (nul + 1 + 3) & ~3;
    if (crcOffset + 4 > body.length)
        return closedDebuglink("malformed", "debuglink_truncated", located.location);
    const crc = new BinaryReader(body, little, "elf").u32(crcOffset);
    const crcHex = crc32Hex(crc);
    if (nul === 0)
        return {
            status: "malformed",
            location: located.location,
            filename: null,
            crc32_hex: crcHex,
            reason: "debuglink_empty_name",
        };
    if (nul > MAX_ELF_DEBUG_LINK_NAME_BYTES)
        return {
            status: "malformed",
            location: located.location,
            filename: null,
            crc32_hex: crcHex,
            reason: "debuglink_name_exceeds_limit",
        };
    return {
        status: "present",
        location: located.location,
        filename: untrustedName(body.toString("latin1", 0, nul)),
        crc32_hex: crcHex,
        reason: null,
    };
};
const closedAlt = (status, reason, location = null) => ({
    status,
    location,
    filename: null,
    build_id_hex: null,
    reason,
});
const parseDebugaltlink = (bytes, found, namesComplete) => {
    const located = locate(bytes, found, namesComplete);
    if (located.reason === "duplicate")
        return closedAlt("malformed", "debugaltlink_duplicate_section");
    if (located.reason === "not_file_backed")
        return closedAlt("malformed", "debugaltlink_not_file_backed");
    if (located.reason === "compressed")
        return closedAlt("unsupported", "debugaltlink_section_compressed", located.location);
    if (located.status !== "present" || located.body === null)
        return closedAlt(located.status, null);
    const body = located.body;
    const nul = body.indexOf(0);
    if (nul < 0)
        return closedAlt("malformed", "debugaltlink_unterminated_name", located.location);
    const build = body.subarray(nul + 1);
    const nameOk = nul > 0 && nul <= MAX_ELF_DEBUG_LINK_NAME_BYTES;
    const nameTooLong = nul > MAX_ELF_DEBUG_LINK_NAME_BYTES;
    const buildOk = build.length > 0 && build.length <= MAX_ELF_DEBUG_ALT_BUILD_ID_BYTES;
    const buildTooLong = build.length > MAX_ELF_DEBUG_ALT_BUILD_ID_BYTES;
    const filename = nameOk
        ? untrustedName(body.toString("latin1", 0, nul))
        : null;
    const buildHex = buildOk ? build.toString("hex") : null;
    if (build.length === 0)
        return {
            status: "malformed",
            location: located.location,
            filename,
            build_id_hex: null,
            reason: "debugaltlink_missing_build_id",
        };
    if (nul === 0)
        return {
            status: "malformed",
            location: located.location,
            filename: null,
            build_id_hex: buildHex,
            reason: "debugaltlink_empty_name",
        };
    if (nameTooLong)
        return {
            status: "malformed",
            location: located.location,
            filename: null,
            build_id_hex: buildTooLong ? null : buildHex,
            reason: "debugaltlink_name_exceeds_limit",
        };
    if (buildTooLong)
        return {
            status: "malformed",
            location: located.location,
            filename,
            build_id_hex: null,
            reason: "debugaltlink_build_id_exceeds_limit",
        };
    return {
        status: "present",
        location: located.location,
        filename,
        build_id_hex: buildHex,
        reason: null,
    };
};
const parseDebugdata = (bytes, found, namesComplete) => {
    const located = locate(bytes, found, namesComplete);
    if (located.reason === "duplicate")
        return {
            status: "malformed",
            location: null,
            xz_magic: null,
            reason: "debugdata_duplicate_section",
        };
    if (located.reason === "not_file_backed")
        return {
            status: "malformed",
            location: null,
            xz_magic: null,
            reason: "debugdata_not_file_backed",
        };
    if (located.reason === "compressed")
        return {
            status: "unsupported",
            location: located.location,
            xz_magic: null,
            reason: "debugdata_section_compressed",
        };
    if (located.status !== "present" || located.body === null)
        return {
            status: located.status,
            location: null,
            xz_magic: null,
            reason: null,
        };
    const body = located.body;
    if (body.length < XZ_MAGIC.length)
        return {
            status: "malformed",
            location: located.location,
            xz_magic: false,
            reason: "debugdata_truncated",
        };
    const magic = body.subarray(0, XZ_MAGIC.length).equals(XZ_MAGIC);
    return {
        status: magic ? "present" : "malformed",
        location: located.location,
        xz_magic: magic,
        reason: magic ? null : "debugdata_not_xz",
    };
};
const unknownBuildId = (reason, limitation) => ({
    buildId: { status: "unknown", hex: null, ids: [], sources: [], reason },
    limitation,
});
const observeBuildId = (bytes, artifact, input, preparedNotes) => {
    let entries;
    let unsupportedStorage;
    try {
        if (preparedNotes !== undefined && !preparedNotes.ok)
            throw preparedNotes.error;
        entries = (preparedNotes?.value ??
            parseElfNotes(bytes, artifact, buildIdNoteInput(artifact, input), BUILD_ID_NOTE_OPTIONS)).entries;
    }
    catch (cause) {
        if (isRethrownBudget(cause) ||
            zstandardFrameAllowanceCause(cause) !== undefined)
            throw cause;
        if (cause instanceof ArtifactReaderFailure && cause.reason === "format")
            return unknownBuildId("note_tables_malformed", `ELF note tables could not be decoded: ${cause.message}`);
        if (cause instanceof ElfNoteStorageFailure) {
            unsupportedStorage = cause;
            entries = cause.readableEntries;
        }
        else if (cause instanceof BinaryFormatFailure) {
            return unknownBuildId(cause.kind === "unsupported"
                ? "note_tables_unsupported"
                : "note_tables_malformed", `ELF note tables could not be decoded: ${cause.message}`);
        }
        else {
            throw cause;
        }
    }
    const ids = [];
    const sources = [];
    let oversized = false;
    for (const entry of entries) {
        if (entry.owner !== "GNU" || entry.type !== GNU_BUILD_ID_NOTE_TYPE)
            continue;
        // The parser leaves oversized descriptors undecoded, so judge the raw size.
        if (entry.descsz > MAX_ELF_DEBUG_ALT_BUILD_ID_BYTES) {
            oversized = true;
            continue;
        }
        const hex = entry.gnu?.build_id_hex;
        if (hex === null || hex === undefined || hex.length === 0)
            continue;
        if (!ids.includes(hex))
            ids.push(hex);
        sources.push({
            hex,
            table_kind: entry.table_kind,
            table_index: entry.table_index,
            note: entry.location,
            descriptor: entry.descriptor.location,
        });
    }
    // Retain readable ids and their note locations when identity is incomplete.
    if (unsupportedStorage !== undefined || oversized)
        return {
            buildId: {
                status: "unknown",
                hex: null,
                ids,
                sources,
                reason: unsupportedStorage === undefined
                    ? "build_id_exceeds_limit"
                    : "note_tables_unsupported",
            },
            limitation: unsupportedStorage === undefined
                ? "A GNU build-id exceeds 256 bytes and was not copied."
                : unsupportedStorage.message,
        };
    if (ids.length === 0)
        return {
            buildId: {
                status: "absent",
                hex: null,
                ids: [],
                sources: [],
                reason: null,
            },
            limitation: null,
        };
    if (ids.length > 1)
        return {
            buildId: {
                status: "conflict",
                hex: null,
                ids,
                sources,
                reason: "multiple_build_ids",
            },
            limitation: ELF_DEBUG_LINK_MULTIPLE_BUILD_IDS_LIMITATION,
        };
    const hex = ids[0] ?? null;
    return {
        buildId: { status: "observed", hex, ids, sources, reason: null },
        limitation: null,
    };
};
const sectionsNamed = (sections, name) => sections.filter((section) => section.name === name);
const BUILD_ID_NOTE_OPTIONS = {
    maxGnuBuildIdBytes: MAX_ELF_DEBUG_ALT_BUILD_ID_BYTES,
    retainReadableNotes: true,
};
const buildIdNoteInput = (artifact, input) => ({
    path: artifact.path,
    max_file_bytes: input.max_file_bytes,
    max_entries: input.max_entries,
});
/** Decode separate-debug linkage from one in-memory ELF image. */
const ELF_DEBUG_LINK_OPERATION = "inspect_elf_debug_link";
export const parseElfDebugLink = (bytes, artifact, input, image, preparedNotes) => {
    // The directory admits section names before either decoder inflates them.
    image =
        image ??
            readElfImage(bytes, ELF_DEBUG_LINK_OPERATION, input.max_file_bytes);
    const sections = image.sections.filter((section) => section.format === "elf");
    const namesComplete = image.section_names_limitation === undefined &&
        sections.every((section) => section.name !== null);
    const little = image.byte_order === "little";
    const debuglink = parseDebuglink(bytes, sectionsNamed(sections, ".gnu_debuglink"), namesComplete, little);
    const debugaltlink = parseDebugaltlink(bytes, sectionsNamed(sections, ".gnu_debugaltlink"), namesComplete);
    const debugdata = parseDebugdata(bytes, sectionsNamed(sections, ".gnu_debugdata"), namesComplete);
    const observed = observeBuildId(bytes, artifact, input, preparedNotes);
    const limitations = [...ELF_DEBUG_LINK_LIMITATIONS];
    if (image.section_names_limitation !== undefined)
        limitations.push(image.section_names_limitation);
    if (observed.limitation !== null)
        limitations.push(observed.limitation);
    const filename = debuglink.filename?.text ?? null;
    if (filename !== null && !debugFileNameIsSingleSegment(filename))
        limitations.push(ELF_DEBUG_LINK_NAME_SEGMENT_LIMITATION);
    const lookup_paths = deriveDebugFileLookupPaths({
        binaryPath: artifact.path,
        debuglinkName: filename,
        buildIdHex: observed.buildId.status === "observed" ? observed.buildId.hex : null,
        altBuildIdHex: debugaltlink.build_id_hex,
    });
    const examined_sections = sections.filter((section) => section.name !== null &&
        DEBUG_SECTION_NAMES.some((name) => name === section.name)).length;
    const coverageIncomplete = !namesComplete || observed.buildId.status === "unknown";
    return {
        artifact,
        format: image.bits === 64 ? "elf64" : "elf32",
        byte_order: image.byte_order,
        machine: image.elf.machine,
        type: image.elf.type,
        type_name: elfObjectTypeName(image.elf.type),
        debuglink,
        debugaltlink,
        debugdata,
        build_id: observed.buildId,
        lookup_paths,
        candidate: null,
        verification: null,
        coverage: {
            status: coverageIncomplete ? "partial" : "complete",
            examined_sections,
        },
        limitations,
    };
};
const candidateSections = (image) => {
    if (image === null)
        return { debug_info: "unknown", symtab: "unknown" };
    const sections = image.sections.filter((section) => section.format === "elf");
    const namesComplete = image.section_names_limitation === undefined &&
        sections.every((section) => section.name !== null);
    const status = (names) => {
        const named = sections.filter((section) => names.some((name) => name === section.name));
        // A declaration whose range is not inside the file does not supply that
        // content, so its presence stays unknown rather than present.
        if (named.some((section) => section.file_backed))
            return "present";
        if (named.length > 0)
            return "unknown";
        return namesComplete ? "absent" : "unknown";
    };
    // `.zdebug_info` is the zlib-gnu name for compressed `.debug_info`.
    return {
        debug_info: status([".debug_info", ".zdebug_info"]),
        symtab: status([".symtab"]),
    };
};
const hasElfMagic = (bytes) => bytes.length >= 4 && bytes.toString("hex", 0, 4) === "7f454c46";
const readCandidateIdentity = (content, totalBytes, artifact, input, preparedImage, preparedNotes) => {
    const complete = content.length === totalBytes;
    const header = readElfFixedHeader(content, totalBytes);
    if (!header.ok && hasElfMagic(content))
        // ELF magic with an unusable fixed header is a malformed ELF, not another format.
        return {
            format: null,
            byte_order: null,
            sections: { debug_info: "unknown", symtab: "unknown" },
            identity: {
                notElf: false,
                elfMalformed: true,
                buildId: {
                    status: "unknown",
                    hex: null,
                    ids: [],
                    sources: [],
                    reason: null,
                },
                candidateHex: null,
            },
            budgetExceeded: false,
        };
    if (!header.ok)
        return {
            format: null,
            byte_order: null,
            sections: { debug_info: "not_elf", symtab: "not_elf" },
            identity: {
                notElf: true,
                elfMalformed: false,
                buildId: {
                    status: "absent",
                    hex: null,
                    ids: [],
                    sources: [],
                    reason: null,
                },
                candidateHex: null,
            },
            budgetExceeded: false,
        };
    if (!complete)
        // Only a bounded prefix was retained, so sections and notes stay unread.
        return {
            format: header.value.elfClass === 64 ? "elf64" : "elf32",
            byte_order: header.value.byteOrder,
            sections: { debug_info: "unknown", symtab: "unknown" },
            identity: {
                notElf: false,
                elfMalformed: false,
                buildId: {
                    status: "unknown",
                    hex: null,
                    ids: [],
                    sources: [],
                    reason: null,
                },
                candidateHex: null,
            },
            budgetExceeded: false,
        };
    let image = null;
    let imageMalformed = false;
    let imageBudgetExceeded = false;
    let frameAllowance;
    try {
        if (preparedImage !== undefined && !preparedImage.ok)
            throw preparedImage.error;
        image =
            preparedImage?.value ??
                readElfImage(content, ELF_DEBUG_LINK_OPERATION, input.max_file_bytes);
    }
    catch (cause) {
        frameAllowance = zstandardFrameAllowanceCause(cause);
        if (frameAllowance === undefined) {
            if (cause instanceof AnalysisError)
                throw cause;
            if (isRethrownBudget(cause))
                imageBudgetExceeded = true;
            else
                imageMalformed = true;
        }
    }
    // The candidate may lose named evidence without losing its file identity
    // or CRC. If its section names already exceeded the frame allowance, the
    // note reader cannot decode that same table either.
    let observed = null;
    if (frameAllowance === undefined) {
        try {
            observed = observeBuildId(content, artifact, input, preparedNotes);
        }
        catch (cause) {
            frameAllowance = zstandardFrameAllowanceCause(cause);
            if (frameAllowance === undefined && !isRethrownBudget(cause))
                throw cause;
        }
    }
    const buildId = observed?.buildId ?? {
        status: "unknown",
        hex: null,
        ids: [],
        sources: [],
        reason: null,
    };
    return {
        format: header.value.elfClass === 64 ? "elf64" : "elf32",
        byte_order: header.value.byteOrder,
        sections: candidateSections(image),
        identity: {
            notElf: false,
            elfMalformed: imageMalformed && observed !== null && buildId.status === "unknown",
            buildId,
            candidateHex: buildId.status === "observed" ? buildId.hex : null,
        },
        budgetExceeded: imageBudgetExceeded ||
            (frameAllowance === undefined && observed === null),
        ...(frameAllowance === undefined ? {} : { frameAllowance }),
    };
};
const crcCheck = (expected, candidateCrc32) => {
    const observed = crc32Hex(candidateCrc32);
    if (expected === null)
        return {
            status: "unavailable",
            expected_hex: null,
            observed_hex: observed,
            reason: "debuglink_crc_absent",
        };
    return {
        status: expected === observed ? "match" : "mismatch",
        expected_hex: expected,
        observed_hex: observed,
        reason: null,
    };
};
const buildIdCheck = (binary, identity) => {
    const candidateHex = identity.candidateHex;
    if (binary.status === "unknown")
        return {
            status: "unavailable",
            binary_hex: null,
            candidate_hex: candidateHex,
            reason: "binary_build_id_unknown",
        };
    if (binary.status === "conflict")
        return {
            status: "unavailable",
            binary_hex: null,
            candidate_hex: candidateHex,
            reason: "binary_build_id_conflict",
        };
    if (binary.status !== "observed" || binary.hex === null)
        return {
            status: "unavailable",
            binary_hex: null,
            candidate_hex: candidateHex,
            reason: "binary_build_id_absent",
        };
    const binaryHex = binary.hex;
    if (identity.notElf)
        return {
            status: "unavailable",
            binary_hex: binaryHex,
            candidate_hex: null,
            reason: "candidate_not_elf",
        };
    if (identity.elfMalformed)
        return {
            status: "unavailable",
            binary_hex: binaryHex,
            candidate_hex: null,
            reason: "candidate_elf_malformed",
        };
    if (identity.buildId.status === "unknown")
        return {
            status: "unavailable",
            binary_hex: binaryHex,
            candidate_hex: null,
            reason: "candidate_build_id_unknown",
        };
    if (identity.buildId.status === "conflict")
        return {
            status: "unavailable",
            binary_hex: binaryHex,
            candidate_hex: null,
            reason: "candidate_build_id_conflict",
        };
    if (identity.buildId.status !== "observed" || candidateHex === null)
        return {
            status: "unavailable",
            binary_hex: binaryHex,
            candidate_hex: null,
            reason: "candidate_build_id_absent",
        };
    return {
        status: binaryHex === candidateHex ? "match" : "mismatch",
        binary_hex: binaryHex,
        candidate_hex: candidateHex,
        reason: null,
    };
};
const verificationOf = (crc, build) => {
    const crcMismatch = crc.status === "mismatch";
    const idMismatch = build.status === "mismatch";
    if (crcMismatch || idMismatch) {
        const reason = crcMismatch && idMismatch
            ? "crc32_and_build_id_mismatch"
            : crcMismatch
                ? "crc32_mismatch"
                : "build_id_mismatch";
        return { status: "does_not_match", reason, crc32: crc, build_id: build };
    }
    if (crc.status === "match" || build.status === "match")
        return { status: "matches", reason: null, crc32: crc, build_id: build };
    return {
        status: "cannot_verify",
        reason: "no_comparable_identity",
        crc32: crc,
        build_id: build,
    };
};
/** Compare one caller-selected file with an already decoded debug-link report. */
export const verifyElfDebugCandidate = (report, candidate, input, preparedImage, preparedNotes) => {
    const read = readCandidateIdentity(candidate.prefix, candidate.bytes, candidateArtifact(candidate), input, preparedImage, preparedNotes);
    const crc = crcCheck(report.debuglink.crc32_hex, candidate.crc32);
    const build = buildIdCheck(report.build_id, read.identity);
    const verification = verificationOf(crc, build);
    const limitations = [...report.limitations];
    if (candidate.prefix.length !== candidate.bytes)
        limitations.push(ELF_DEBUG_LINK_CANDIDATE_PREFIX_LIMITATION);
    if (read.budgetExceeded)
        limitations.push(ELF_DEBUG_LINK_CANDIDATE_BUDGET_LIMITATION);
    if (read.frameAllowance !== undefined)
        limitations.push(`Candidate ELF section names could not be decoded because ${read.frameAllowance.failure.detail}.`);
    if (verification.status === "matches" &&
        (crc.status === "unavailable" || build.status === "unavailable"))
        limitations.push(ELF_DEBUG_LINK_UNAVAILABLE_CHECK_LIMITATION);
    if (verification.status === "cannot_verify")
        limitations.push(ELF_DEBUG_LINK_CANNOT_VERIFY_LIMITATION);
    return {
        ...report,
        candidate: {
            path: candidate.path,
            sha256: candidate.sha256,
            bytes: candidate.bytes,
            format: read.format,
            byte_order: read.byte_order,
            ...read.sections,
        },
        verification,
        limitations,
    };
};
const debugLinkPause = (signal) => () => yieldArtifactRead(signal);
const candidateArtifact = (candidate) => ({
    path: candidate.path,
    sha256: candidate.sha256,
    bytes: candidate.bytes,
});
const prepareBuildIdNotes = async (bytes, artifact, input, pause, decode, signal) => {
    assertArtifactReadActive(signal);
    try {
        return ok(await parseElfNotesCooperative(bytes, artifact, buildIdNoteInput(artifact, input), pause, BUILD_ID_NOTE_OPTIONS, decode));
    }
    catch (cause) {
        assertArtifactReadActive(signal);
        return err(cause);
    }
};
/** Same linkage as {@link parseElfDebugLink}. Section names yield for `signal`. */
export const parseElfDebugLinkCooperative = async (bytes, artifact, input, signal) => {
    const pause = debugLinkPause(signal);
    const decode = sharedElfSectionNameDecoder(pause);
    const image = await readElfImageCooperative(bytes, ELF_DEBUG_LINK_OPERATION, pause, input.max_file_bytes, decode);
    const notes = await prepareBuildIdNotes(bytes, artifact, input, pause, decode, signal);
    assertArtifactReadActive(signal);
    return parseElfDebugLink(bytes, artifact, input, image, notes);
};
/** Same comparison as {@link verifyElfDebugCandidate}. Section names yield for `signal`. */
export const verifyElfDebugCandidateCooperative = async (report, candidate, input, signal) => {
    assertArtifactReadActive(signal);
    if (candidate.prefix.length !== candidate.bytes ||
        !hasElfMagic(candidate.prefix))
        return verifyElfDebugCandidate(report, candidate, input);
    const pause = debugLinkPause(signal);
    const decode = sharedElfSectionNameDecoder(pause);
    let preparedImage;
    try {
        preparedImage = ok(await readElfImageCooperative(candidate.prefix, ELF_DEBUG_LINK_OPERATION, pause, input.max_file_bytes, decode));
    }
    catch (cause) {
        assertArtifactReadActive(signal);
        preparedImage = err(cause);
    }
    // A typed image error already determines the candidate outcome.
    if (!preparedImage.ok &&
        (preparedImage.error instanceof AnalysisError ||
            zstandardFrameAllowanceCause(preparedImage.error) !== undefined))
        return verifyElfDebugCandidate(report, candidate, input, preparedImage);
    const notes = await prepareBuildIdNotes(candidate.prefix, candidateArtifact(candidate), input, pause, decode, signal);
    assertArtifactReadActive(signal);
    return verifyElfDebugCandidate(report, candidate, input, preparedImage, notes);
};
/** Keep the decoded image linkage when the selected candidate cannot be read. */
export const unreadableElfDebugCandidate = (report) => ({
    ...report,
    candidate: null,
    verification: {
        status: "cannot_verify",
        reason: "candidate_unreadable",
        crc32: {
            status: "unavailable",
            expected_hex: report.debuglink.crc32_hex,
            observed_hex: null,
            reason: "candidate_unreadable",
        },
        build_id: {
            status: "unavailable",
            binary_hex: report.build_id.status === "observed" ? report.build_id.hex : null,
            candidate_hex: null,
            reason: "candidate_unreadable",
        },
    },
    limitations: [
        ...report.limitations,
        ELF_DEBUG_LINK_CANDIDATE_UNREADABLE_LIMITATION,
        ELF_DEBUG_LINK_CANNOT_VERIFY_LIMITATION,
    ],
});
