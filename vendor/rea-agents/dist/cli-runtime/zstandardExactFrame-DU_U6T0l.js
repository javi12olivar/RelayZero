import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { hostRangeErrorKind, init_parseFailure } from "./jsonSerialization-DAF9DVXC.js";
import { currentZstandardFrameAllowance, init_zstandardFrameAllowance, zstandardWorkLimitFacts } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { init_zstandardFrameWire, zstandardFrameKind, zstandardFrameReads } from "./resources-B3P64jvH.js";
import { init_nodeCodecResult, nodeCodecResult } from "./nodeCodecResult-Ky56xTop.js";
import { promisify } from "node:util";
import { constants } from "node:buffer";
import { constants as constants$1, zstdCompressSync, zstdDecompress, zstdDecompressSync } from "node:zlib";

//#region dist/domain/compression/zstandardExactFrame.js
function* frameAt(bytes, offset, kind, progress) {
	let cursor = offset + 4;
	const reads = zstandardFrameReads(kind, offset);
	let step = reads.next();
	while (!step.done) {
		if (needsFrameWalkPause(progress)) yield;
		const read = step.value;
		const end = cursor + read.length;
		if (end > bytes.length) return failure(read.eof, read.failureOffset);
		step = reads.next(read.inspect ? bytes.subarray(cursor, end) : unreadBytes);
		cursor = end;
	}
	if (step.value !== undefined) return failure("malformed", step.value.offset, step.value.code);
	return {
		offset,
		length: cursor - offset,
		kind
	};
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
			if (kind !== undefined) return workLimit(allowance, offset);
			if (mode === "exact") return failure("trailing_bytes", offset);
			break;
		}
		if (offset + 4 > bytes.length) {
			if (frames.length === 0) return failure("truncated_frame_header", offset);
			if (mode === "exact") return failure("trailing_bytes", offset);
			break;
		}
		if (kind === undefined) {
			if (frames.length === 0) return failure("malformed", offset, "magic");
			if (mode === "exact") return failure("trailing_bytes", offset);
			break;
		}
		const next = yield* frameAt(bytes, offset, kind, progress);
		if ("ok" in next) return next;
		frames.push(next);
		offset += next.length;
	}
	if (frames.length === 0) return failure("truncated_frame_header", 0);
	return {
		ok: true,
		frames,
		consumed: offset
	};
}
function* prepareDecode(bytes, options) {
	const resolved = options.allowance === undefined ? currentZstandardFrameAllowance() : {
		ok: true,
		value: options.allowance
	};
	if (!resolved.ok) return {
		ok: false,
		reason: "invalid_allowance",
		offset: 0,
		configuration: resolved.error
	};
	const mode = options.mode ?? "exact";
	const walked = yield* walkFrames(bytes, resolved.value, mode);
	if ("reason" in walked) return walked;
	return {
		frames: walked.frames,
		consumed: walked.consumed,
		options: {
			maxOutputLength: options.maxOutputLength ?? constants.MAX_LENGTH,
			windowLogMax: options.windowLogMax ?? 27,
			...options.dictionary === undefined ? {} : { dictionary: options.dictionary },
			rejectTrailing: nodeDecodesStrictSequence()
		}
	};
}
var ZSTANDARD_WINDOW_LOG_MAX, ZSTANDARD_FRAME_REASONS, READS_PER_PAUSE, needsFrameWalkPause, failure, workLimit, unreadBytes, decoderCode, decoderFailure, isFrameFailure, strictSequence, nodeDecodesStrictSequence, unzstd, decompress, decompressSequence, ownedZstandardBytes, withinOutput, decodeDataFrame, finishFrames, decodeFrames, decodeZstandardFrames, decodeZstandardFramesCooperative;
function init_zstandardExactFrame() {
	return (init_zstandardExactFrame = __esmMin((() => {
		init_nodeCodecResult();
		init_parseFailure();
		init_zstandardFrameAllowance();
		init_zstandardFrameWire();
		ZSTANDARD_WINDOW_LOG_MAX = 27;
		ZSTANDARD_FRAME_REASONS = [
			"truncated_frame_header",
			"truncated_block",
			"truncated_checksum",
			"trailing_bytes",
			"work_limit",
			"malformed",
			"output_limit",
			"invalid_allowance"
		];
		READS_PER_PAUSE = 64;
		needsFrameWalkPause = (progress) => ++progress.reads % READS_PER_PAUSE === 0;
		failure = (reason, offset, code, detail) => ({
			ok: false,
			reason,
			offset,
			...code === undefined ? {} : { code },
			...detail === undefined ? {} : { detail }
		});
		workLimit = (allowance, offset) => ({
			ok: false,
			offset,
			...zstandardWorkLimitFacts(allowance)
		});
		unreadBytes = new Uint8Array(0);
		decoderCode = (cause) => {
			if (typeof cause !== "object" || cause === null || !("code" in cause)) return undefined;
			const code = cause.code;
			return typeof code === "string" ? code : undefined;
		};
		decoderFailure = (cause, offset) => {
			if (hostRangeErrorKind(cause) === "host-capacity") return failure("output_limit", offset);
			const code = decoderCode(cause);
			const detail = cause instanceof Error ? cause.message : undefined;
			if (code === "ZSTD_error_dstSize_tooSmall" || code === "ERR_BUFFER_TOO_LARGE") return failure("output_limit", offset, code, detail);
			return failure("malformed", offset, code, detail);
		};
		isFrameFailure = (value) => "reason" in value;
		;
		nodeDecodesStrictSequence = () => {
			if (strictSequence !== undefined) return strictSequence;
			const frame = zstdCompressSync(Buffer.from([97]));
			const pair = Buffer.concat([frame, frame]);
			let concatenated = false;
			try {
				concatenated = zstdDecompressSync(pair).length === 2;
			} catch {
				concatenated = false;
			}
			let strict = false;
			if (concatenated) {
				try {
					zstdDecompressSync(Buffer.concat([frame, Buffer.of(0)]), { rejectGarbageAfterEnd: true });
				} catch {
					strict = true;
				}
			}
			strictSequence = strict;
			return strictSequence;
		};
		unzstd = promisify(zstdDecompress);
		decompress = (input, offset, options) => {
			try {
				const result = nodeCodecResult(zstdDecompressSync(input, {
					info: true,
					maxOutputLength: Math.max(1, options.maxOutputLength),
					...options.rejectTrailing ? { rejectGarbageAfterEnd: true } : {},
					...options.dictionary === undefined ? {} : { dictionary: options.dictionary },
					params: { [constants$1.ZSTD_d_windowLogMax]: options.windowLogMax }
				}));
				if (result.consumedBytes !== input.length) return failure("malformed", offset, "unconsumed_input");
				return { bytes: result.buffer };
			} catch (cause) {
				return decoderFailure(cause, offset);
			}
		};
		decompressSequence = async (input, offset, options) => {
			try {
				const result = nodeCodecResult(await unzstd(input, {
					info: true,
					rejectGarbageAfterEnd: true,
					maxOutputLength: Math.max(1, options.maxOutputLength),
					...options.dictionary === undefined ? {} : { dictionary: options.dictionary },
					params: { [constants$1.ZSTD_d_windowLogMax]: options.windowLogMax }
				}));
				if (result.consumedBytes !== input.length) return failure("malformed", offset, "unconsumed_input");
				return { bytes: ownedZstandardBytes(result.buffer) };
			} catch (cause) {
				return decoderFailure(cause, offset);
			}
		};
		ownedZstandardBytes = (bytes) => {
			if (bytes.byteOffset === 0 && bytes.buffer.byteLength === bytes.byteLength) return bytes;
			const owned = Buffer.allocUnsafe(bytes.byteLength);
			bytes.copy(owned);
			return owned;
		};
		withinOutput = (bytes, remaining, offset) => bytes.length > remaining ? failure("output_limit", offset) : { bytes };
		decodeDataFrame = (bytes, frame, total, options) => {
			const remaining = options.maxOutputLength - total;
			const decoded = decompress(bytes.subarray(frame.offset, frame.offset + frame.length), frame.offset, {
				...options,
				maxOutputLength: Math.max(1, remaining)
			});
			if (isFrameFailure(decoded)) return decoded;
			const bounded = withinOutput(decoded.bytes, remaining, frame.offset);
			if (isFrameFailure(bounded)) return bounded;
			return { bytes: ownedZstandardBytes(bounded.bytes) };
		};
		finishFrames = (chunks, consumed, frames) => {
			const only = chunks.length === 1 ? chunks[0] : undefined;
			return {
				ok: true,
				bytes: only !== undefined ? only : chunks.length === 0 ? Buffer.alloc(0) : Buffer.concat(chunks),
				consumedBytes: consumed,
				frames
			};
		};
		decodeFrames = (bytes, frames, consumed, options) => {
			if (options.rejectTrailing) {
				const decoded = decompress(bytes.subarray(0, consumed), 0, options);
				if (isFrameFailure(decoded)) return decoded;
				const bounded = withinOutput(decoded.bytes, options.maxOutputLength, 0);
				if (isFrameFailure(bounded)) return bounded;
				return { ...finishFrames([ownedZstandardBytes(bounded.bytes)], consumed, frames.length) };
			}
			const chunks = [];
			let total = 0;
			for (const frame of frames) {
				if (frame.kind === "skippable") continue;
				const step = decodeDataFrame(bytes, frame, total, options);
				if (isFrameFailure(step)) return step;
				total += step.bytes.length;
				chunks.push(step.bytes);
			}
			return finishFrames(chunks, consumed, frames.length);
		};
		decodeZstandardFrames = (bytes, options = {}) => {
			const steps = prepareDecode(bytes, options);
			let next = steps.next();
			while (!next.done) next = steps.next();
			const prepared = next.value;
			if ("reason" in prepared) return prepared;
			return decodeFrames(bytes, prepared.frames, prepared.consumed, prepared.options);
		};
		decodeZstandardFramesCooperative = async (bytes, options, pause) => {
			const steps = prepareDecode(bytes, options);
			let next = steps.next();
			while (!next.done) {
				await pause();
				next = steps.next();
			}
			const prepared = next.value;
			if ("reason" in prepared) return prepared;
			if (prepared.options.rejectTrailing) {
				await pause();
				const decoded = await decompressSequence(bytes.subarray(0, prepared.consumed), 0, prepared.options);
				if (isFrameFailure(decoded)) return decoded;
				const bounded = withinOutput(decoded.bytes, prepared.options.maxOutputLength, 0);
				if (isFrameFailure(bounded)) return bounded;
				await pause();
				return finishFrames([bounded.bytes], prepared.consumed, prepared.frames.length);
			}
			const chunks = [];
			let total = 0;
			for (const frame of prepared.frames) {
				if (frame.kind === "skippable") continue;
				await pause();
				const step = decodeDataFrame(bytes, frame, total, prepared.options);
				if (isFrameFailure(step)) return step;
				total += step.bytes.length;
				chunks.push(step.bytes);
			}
			await pause();
			return finishFrames(chunks, prepared.consumed, prepared.frames.length);
		};
	})))();
}

//#endregion
export { decodeZstandardFrames, decodeZstandardFramesCooperative, init_zstandardExactFrame };