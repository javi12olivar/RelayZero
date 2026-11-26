import { decodeLimit, ParseFailureError } from "../parseFailure.js";
import { decodeElfCompressedSection, decodeElfCompressedSectionCooperative, } from "./elfCompressedSection.js";
const SUBJECT = "ELF compressed section-name table";
/** Limit name of the caller's file budget, which also bounds decoded section names. */
const SECTION_NAME_BUDGET_LIMIT = "max_file_bytes";
/** Caller can raise max_file_bytes to admit the decoded section-name table. */
export const elfSectionNameBudgetFailure = (required, selected) => decodeLimit("elf", `ELF source and decoded section names require ${String(required)} bytes, above the selected max_file_bytes (${String(selected)}).`, { name: SECTION_NAME_BUDGET_LIMIT, maximum: selected, required });
/**
 * The section-name budget stop's limit: the selected max_file_bytes and the
 * size the source plus decoded names require.
 */
export const elfSectionNameBudget = (cause) => {
    if (!(cause instanceof ParseFailureError) ||
        cause.failure.kind !== "limit" ||
        cause.failure.format !== "elf" ||
        cause.failure.limit.name !== SECTION_NAME_BUDGET_LIMIT)
        return undefined;
    const { maximum, required } = cause.failure.limit;
    return required === undefined
        ? undefined
        : {
            selected: maximum,
            required: BigInt(required),
            detail: cause.failure.detail,
        };
};
/** Decode section names through the shared ELF compressed-section owner. */
export const decodeElfSectionNameTable = (bytes, flags, bits, little, maximumDecodedBytes) => decodeElfCompressedSection(bytes, flags, bits, little, maximumDecodedBytes, SUBJECT);
/** Cooperative section-name decode. `pause` observes the caller's abort signal. */
export const decodeElfSectionNameTableCooperative = (bytes, flags, bits, little, maximumDecodedBytes, pause) => decodeElfCompressedSectionCooperative(bytes, flags, bits, little, maximumDecodedBytes, SUBJECT, pause);
export const decodeElfSectionNameRequest = (request) => decodeElfSectionNameTable(request.raw, request.flags, request.bits, request.little, request.maximumDecodedBytes);
export const decodeElfSectionNameRequestCooperative = (request, pause) => decodeElfSectionNameTableCooperative(request.raw, request.flags, request.bits, request.little, request.maximumDecodedBytes, pause);
/** Reuse a decoded table across readers of one borrowed immutable artifact. */
export const sharedElfSectionNameDecoder = (pause) => {
    let admitted;
    return async (request) => {
        if (admitted !== undefined) {
            const { request: previous, decoded } = admitted;
            if (request.raw.buffer === previous.raw.buffer &&
                request.raw.byteOffset === previous.raw.byteOffset &&
                request.raw.byteLength === previous.raw.byteLength &&
                request.bits === previous.bits &&
                request.little === previous.little &&
                request.flags === previous.flags &&
                (decoded.state === "unsupported" ||
                    !decoded.compressed ||
                    decoded.bytes.length <= request.maximumDecodedBytes))
                return decoded;
        }
        const decoded = await decodeElfSectionNameRequestCooperative(request, pause);
        if (decoded.state === "available" || decoded.state === "unsupported")
            admitted = { request, decoded };
        return decoded;
    };
};
