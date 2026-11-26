import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, init_parseFailure, malformedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_strictUtf8, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/process/Utf8NdjsonLineBuffer.js
var Utf8NdjsonOversizeError, Utf8NdjsonLineBuffer;
function init_Utf8NdjsonLineBuffer() {
	return (init_Utf8NdjsonLineBuffer = __esmMin((() => {
		init_strictUtf8();
		init_parseFailure();
		init_result();
		Utf8NdjsonOversizeError = class extends ParseFailureError {
			maximumBytes;
			observedBytes;
			boundary;
			constructor(maximumBytes, observedBytes, boundary = "line") {
				super({
					kind: "limit",
					format: "ndjson",
					detail: `NDJSON line reached ${String(observedBytes)} bytes, above the ${String(maximumBytes)}-byte line limit`,
					limit: {
						name: "ndjson-line-bytes",
						maximum: maximumBytes
					}
				});
				this.maximumBytes = maximumBytes;
				this.observedBytes = observedBytes;
				this.boundary = boundary;
				this.name = "Utf8NdjsonOversizeError";
			}
		};
		Utf8NdjsonLineBuffer = class {
			#buffer = Buffer.alloc(0);
			#fragments = [];
			#fragmentBytes = 0;
			#nextNewline = -1;
			#maxLineBytes;
			#decoder = strictUtf8Decoder("preserve");
			constructor(maxLineBytes) {
				this.#maxLineBytes = maxLineBytes;
			}
			/**
			* Yield each complete trimmed nonblank line; preserve unconsumed lines on
			* early return. A line that is not UTF-8 is yielded as a failure and ends
			* the iteration. A line or the tail still waiting for its LF above the
			* ceiling is yielded as `Utf8NdjsonOversizeError`, after discarding every
			* buffered byte, and ends the iteration.
			* This bridge projection trims U+FEFF and other ECMAScript whitespace.
			* Exact JSON parsers use `pushRaw` to keep the decoded line intact.
			*/
			*push(chunk) {
				for (const line of this.pushRaw(chunk)) {
					if (!line.ok) {
						yield line;
						return;
					}
					const trimmed = line.value.trim();
					if (trimmed.length > 0) yield ok(trimmed);
				}
			}
			/** Deliver exact decoded lines, including blanks and leading U+FEFF. */
			*pushRaw(chunk) {
				const maximumBytes = this.#maxLineBytes();
				this.#fragments.push(chunk);
				this.#fragmentBytes += chunk.length;
				if (!chunk.includes(10) && this.#nextNewline < 0) {
					const refused = this.#refuseTail(maximumBytes);
					if (refused !== undefined) yield err(refused);
					return;
				}
				this.#buffer = Buffer.concat([this.#buffer, ...this.#fragments]);
				this.#fragments = [];
				this.#fragmentBytes = 0;
				if (this.#nextNewline < 0) this.#nextNewline = this.#buffer.indexOf(10);
				while (this.#nextNewline >= 0) {
					if (this.#nextNewline > maximumBytes) {
						const observedBytes = this.#nextNewline;
						this.reset();
						yield err(new Utf8NdjsonOversizeError(maximumBytes, observedBytes));
						return;
					}
					const encodedLine = this.#buffer.subarray(0, this.#nextNewline);
					const rest = this.#buffer.subarray(this.#nextNewline + 1);
					this.#buffer = rest.length === 0 ? Buffer.alloc(0) : rest;
					this.#nextNewline = this.#buffer.indexOf(10);
					const line = this.#decode(encodedLine);
					yield line;
					if (!line.ok) return;
				}
				const refused = this.#refuseTail(maximumBytes);
				if (refused !== undefined) {
					yield err(refused);
					return;
				}
				if (this.#buffer.buffer.byteLength > Math.max(Buffer.poolSize, 2 * this.#buffer.length)) {
					const tail = Buffer.allocUnsafeSlow(this.#buffer.length);
					this.#buffer.copy(tail);
					this.#buffer = tail;
				}
			}
			/** Validate the unfinished tail at EOF without treating it as a complete response. */
			finish() {
				const tail = this.#decode(Buffer.concat([this.#buffer, ...this.#fragments]));
				return tail.ok ? ok(null) : tail;
			}
			#refuseTail(maximumBytes) {
				const pendingBytes = this.pendingBytes;
				if (this.#nextNewline >= 0 || pendingBytes <= maximumBytes) return undefined;
				this.reset();
				return new Utf8NdjsonOversizeError(maximumBytes, pendingBytes, "tail");
			}
			#decode(bytes) {
				try {
					return ok(this.#decoder.decode(bytes));
				} catch (cause) {
					if (!(cause instanceof TypeError)) throw cause;
					return err(malformedInput("ndjson", "NDJSON frame is not valid UTF-8", { cause }));
				}
			}
			reset() {
				this.#buffer = Buffer.alloc(0);
				this.#fragments = [];
				this.#fragmentBytes = 0;
				this.#nextNewline = -1;
			}
			get pendingBytes() {
				return this.#buffer.length + this.#fragmentBytes;
			}
			/** Bytes still held after complete lines are removed. An empty tail keeps no drained frame. */
			retainedTail() {
				const pendingBytes = this.pendingBytes;
				const backingBytes = this.#buffer.buffer.byteLength + this.#fragments.reduce((sum, fragment) => sum + fragment.buffer.byteLength, 0);
				return {
					pendingBytes,
					backingBytes
				};
			}
		};
	})))();
}

//#endregion
export { Utf8NdjsonLineBuffer, Utf8NdjsonOversizeError, init_Utf8NdjsonLineBuffer };