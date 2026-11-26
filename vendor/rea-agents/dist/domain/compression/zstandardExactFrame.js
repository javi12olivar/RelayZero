import { constants as bufferConstants } from "node:buffer";
import { promisify } from "node:util";
import { constants, zstdCompressSync, zstdDecompress, zstdDecompressSync, } from "node:zlib";
import { nodeCodecResult } from "../../kernel/nodeCodecResult.js";
import { hostRangeErrorKind } from "../parseFailure.js";
import { currentZstandardFrameAllowance, zstandardWorkLimitFacts, } from "./zstandardFrameAllowance.js";
import { ZSTANDARD_MAGIC_BYTES, zstandardFrameKind, zstandardFrameReads, } from "./zstandardFrameWire.js";
/** Zstandard's default maximum decoder window, 2^27 bytes (128 MiB). */
export const ZSTANDARD_WINDOW_LOG_MAX = 27;
/**
 * Structural framing failures. `work_limit` is a decoder-work refusal, not
 * evidence that the bytes are malformed.
 */
export const ZSTANDARD_FRAME_REASONS = [
    "truncated_frame_header",
    "truncated_block",
    "truncated_checksum",
    "trailing_bytes",
    "work_limit",
    "malformed",
    "output_limit",
    "invalid_allowance",
];
// Bound structural work between cooperative pauses, including across frames.
const READS_PER_PAUSE = 64;
const needsFrameWalkPause = (progress) => ++progress.reads % READS_PER_PAUSE === 0;
const failure = (reason, offset, code, detail) => ({
    ok: false,
    reason,
    offset,
    ...(code === undefined ? {} : { code }),
    ...(detail === undefined ? {} : { detail }),
});
const workLimit = (allowance, offset) => ({
    ok: false,
    offset,
    ...zstandardWorkLimitFacts(allowance),
});
const unreadBytes = new Uint8Array(0);
function* frameAt(bytes, offset, kind, progress) {
    let cursor = offset + ZSTANDARD_MAGIC_BYTES;
    const reads = zstandardFrameReads(kind, offset);
    let step = reads.next();
    while (!step.done) {
        if (needsFrameWalkPause(progress))
            yield;
        const read = step.value;
        const end = cursor + read.length;
        if (end > bytes.length)
            return failure(read.eof, read.failureOffset);
        step = reads.next(read.inspect ? bytes.subarray(cursor, end) : unreadBytes);
        cursor = end;
    }
    if (step.value !== undefined)
        return failure("malformed", step.value.offset, step.value.code);
    return { offset, length: cursor - offset, kind };
}
/**
 * Exact frame boundaries for one buffer. The walk does not ask the decoder
 * how many bytes it consumed.
 */
function* walkFrames(bytes, allowance, mode) {
    const frames = [];
    const progress = { reads: 0 };
    let offset = 0;
    while (offset < bytes.length) {
        const kind = zstandardFrameKind(bytes, offset);
        if (frames.length === allowance.maxFrames) {
            if (kind !== undefined)
                return workLimit(allowance, offset);
            if (mode === "exact")
                return failure("trailing_bytes", offset);
            break;
        }
        if (offset + ZSTANDARD_MAGIC_BYTES > bytes.length) {
            if (frames.length === 0)
                return failure("truncated_frame_header", offset);
            if (mode === "exact")
                return failure("trailing_bytes", offset);
            break;
        }
        if (kind === undefined) {
            if (frames.length === 0)
                return failure("malformed", offset, "magic");
            if (mode === "exact")
                return failure("trailing_bytes", offset);
            break;
        }
        const next = yield* frameAt(bytes, offset, kind, progress);
        if ("ok" in next)
            return next;
        frames.push(next);
        offset += next.length;
    }
    if (frames.length === 0)
        return failure("truncated_frame_header", 0);
    return { ok: true, frames, consumed: offset };
}
const decoderCode = (cause) => {
    if (typeof cause !== "object" || cause === null || !("code" in cause))
        return undefined;
    const code = cause.code;
    return typeof code === "string" ? code : undefined;
};
const decoderFailure = (cause, offset) => {
    if (hostRangeErrorKind(cause) === "host-capacity")
        return failure("output_limit", offset);
    const code = decoderCode(cause);
    const detail = cause instanceof Error ? cause.message : undefined;
    if (code === "ZSTD_error_dstSize_tooSmall" || code === "ERR_BUFFER_TOO_LARGE")
        return failure("output_limit", offset, code, detail);
    return failure("malformed", offset, code, detail);
};
const isFrameFailure = (value) => "reason" in value;
/**
 * Node 22 stops after the first frame and ignores `rejectGarbageAfterEnd`.
 * Node 24.19+ and Node 26 decode a whole sequence and reject a suffix with
 * that option. Probe once; do not trust a major-version check alone.
 */
let strictSequence;
const nodeDecodesStrictSequence = () => {
    if (strictSequence !== undefined)
        return strictSequence;
    const frame = zstdCompressSync(Buffer.from([0x61]));
    const pair = Buffer.concat([frame, frame]);
    let concatenated = false;
    try {
        concatenated = zstdDecompressSync(pair).length === 2;
    }
    catch {
        concatenated = false;
    }
    let strict = false;
    if (concatenated) {
        try {
            zstdDecompressSync(Buffer.concat([frame, Buffer.of(0)]), {
                rejectGarbageAfterEnd: true,
            });
        }
        catch {
            strict = true;
        }
    }
    strictSequence = strict;
    return strictSequence;
};
const unzstd = promisify(zstdDecompress);
const decompress = (input, offset, options) => {
    try {
        const result = nodeCodecResult(zstdDecompressSync(input, {
            info: true,
            maxOutputLength: Math.max(1, options.maxOutputLength),
            ...(options.rejectTrailing ? { rejectGarbageAfterEnd: true } : {}),
            ...(options.dictionary === undefined
                ? {}
                : { dictionary: options.dictionary }),
            params: { [constants.ZSTD_d_windowLogMax]: options.windowLogMax },
        }));
        // The walk already fixed the input extent. A short read means the
        // decoder did not accept that extent, so the bytes are not returned.
        if (result.consumedBytes !== input.length)
            return failure("malformed", offset, "unconsumed_input");
        return { bytes: result.buffer };
    }
    catch (cause) {
        return decoderFailure(cause, offset);
    }
};
/** Async strict decode so a large sequence does not block the event loop. */
const decompressSequence = async (input, offset, options) => {
    try {
        const result = nodeCodecResult(await unzstd(input, {
            info: true,
            rejectGarbageAfterEnd: true,
            maxOutputLength: Math.max(1, options.maxOutputLength),
            ...(options.dictionary === undefined
                ? {}
                : { dictionary: options.dictionary }),
            params: { [constants.ZSTD_d_windowLogMax]: options.windowLogMax },
        }));
        if (result.consumedBytes !== input.length)
            return failure("malformed", offset, "unconsumed_input");
        return { bytes: ownedZstandardBytes(result.buffer) };
    }
    catch (cause) {
        return decoderFailure(cause, offset);
    }
};
/**
 * Node's synchronous decoder returns a view onto a larger chunk allocation.
 * Retaining that view keeps the whole chunk. One byte from a 16 KiB chunk,
 * repeated for every frame, retains mebibytes for a few kibibytes of output.
 * Copy only when the backing store is larger than the bytes in use.
 */
export const ownedZstandardBytes = (bytes) => {
    if (bytes.byteOffset === 0 && bytes.buffer.byteLength === bytes.byteLength)
        return bytes;
    const owned = Buffer.allocUnsafe(bytes.byteLength);
    bytes.copy(owned);
    return owned;
};
const withinOutput = (bytes, remaining, offset) => bytes.length > remaining ? failure("output_limit", offset) : { bytes };
const decodeDataFrame = (bytes, frame, total, options) => {
    const remaining = options.maxOutputLength - total;
    const decoded = decompress(bytes.subarray(frame.offset, frame.offset + frame.length), frame.offset, { ...options, maxOutputLength: Math.max(1, remaining) });
    if (isFrameFailure(decoded))
        return decoded;
    const bounded = withinOutput(decoded.bytes, remaining, frame.offset);
    if (isFrameFailure(bounded))
        return bounded;
    return { bytes: ownedZstandardBytes(bounded.bytes) };
};
const finishFrames = (chunks, consumed, frames) => {
    const only = chunks.length === 1 ? chunks[0] : undefined;
    return {
        ok: true,
        bytes: only !== undefined
            ? only
            : chunks.length === 0
                ? Buffer.alloc(0)
                : Buffer.concat(chunks),
        consumedBytes: consumed,
        frames,
    };
};
const decodeFrames = (bytes, frames, consumed, options) => {
    if (options.rejectTrailing) {
        const decoded = decompress(bytes.subarray(0, consumed), 0, options);
        if (isFrameFailure(decoded))
            return decoded;
        const bounded = withinOutput(decoded.bytes, options.maxOutputLength, 0);
        if (isFrameFailure(bounded))
            return bounded;
        return {
            ...finishFrames([ownedZstandardBytes(bounded.bytes)], consumed, frames.length),
        };
    }
    const chunks = [];
    let total = 0;
    for (const frame of frames) {
        if (frame.kind === "skippable")
            continue;
        const step = decodeDataFrame(bytes, frame, total, options);
        if (isFrameFailure(step))
            return step;
        total += step.bytes.length;
        chunks.push(step.bytes);
    }
    return finishFrames(chunks, consumed, frames.length);
};
function* prepareDecode(bytes, options) {
    const resolved = options.allowance === undefined
        ? currentZstandardFrameAllowance()
        : { ok: true, value: options.allowance };
    if (!resolved.ok)
        return {
            ok: false,
            reason: "invalid_allowance",
            offset: 0,
            configuration: resolved.error,
        };
    const mode = options.mode ?? "exact";
    const walked = yield* walkFrames(bytes, resolved.value, mode);
    if ("reason" in walked)
        return walked;
    return {
        frames: walked.frames,
        consumed: walked.consumed,
        options: {
            maxOutputLength: options.maxOutputLength ?? bufferConstants.MAX_LENGTH,
            windowLogMax: options.windowLogMax ?? ZSTANDARD_WINDOW_LOG_MAX,
            ...(options.dictionary === undefined
                ? {}
                : { dictionary: options.dictionary }),
            rejectTrailing: nodeDecodesStrictSequence(),
        },
    };
}
/**
 * Decode one Zstandard buffer. Frame boundaries come from the structural
 * walk. Where Node's public strict decoder accepts a whole sequence, one
 * call decodes that sequence and checks its checksums. Otherwise each
 * walked frame is decoded on its own, which is what Node 22 requires.
 */
export const decodeZstandardFrames = (bytes, options = {}) => {
    const steps = prepareDecode(bytes, options);
    let next = steps.next();
    while (!next.done)
        next = steps.next();
    const prepared = next.value;
    if ("reason" in prepared)
        return prepared;
    return decodeFrames(bytes, prepared.frames, prepared.consumed, prepared.options);
};
/**
 * Pause during structural validation, before decoding, and before returning
 * successful output. The strict sequence uses the async decoder. The fallback
 * pauses before each synchronous data-frame decode.
 */
export const decodeZstandardFramesCooperative = async (bytes, options, pause) => {
    const steps = prepareDecode(bytes, options);
    let next = steps.next();
    while (!next.done) {
        await pause();
        next = steps.next();
    }
    const prepared = next.value;
    if ("reason" in prepared)
        return prepared;
    if (prepared.options.rejectTrailing) {
        await pause();
        const decoded = await decompressSequence(bytes.subarray(0, prepared.consumed), 0, prepared.options);
        if (isFrameFailure(decoded))
            return decoded;
        const bounded = withinOutput(decoded.bytes, prepared.options.maxOutputLength, 0);
        if (isFrameFailure(bounded))
            return bounded;
        await pause();
        return finishFrames([bounded.bytes], prepared.consumed, prepared.frames.length);
    }
    const chunks = [];
    let total = 0;
    for (const frame of prepared.frames) {
        if (frame.kind === "skippable")
            continue;
        await pause();
        const step = decodeDataFrame(bytes, frame, total, prepared.options);
        if (isFrameFailure(step))
            return step;
        total += step.bytes.length;
        chunks.push(step.bytes);
    }
    await pause();
    return finishFrames(chunks, prepared.consumed, prepared.frames.length);
};
