import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, init_parseFailure } from "./jsonSerialization-DAF9DVXC.js";
import { init_internalInvariant, init_strictUtf8, invariantViolation, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";

//#region dist/domain/python/pythonBytecodeIdentity.js
var identities, range, PYTHON_BYTECODE_IDENTITIES, pythonBytecodeIdentity, observePythonBytecodePrefix;
function init_pythonBytecodeIdentity() {
	return (init_pythonBytecodeIdentity = __esmMin((() => {
		init_binaryContainer();
		identities = (values, pythonVersion, headerBytes = 16) => values.map((magic) => [magic, {
			pythonVersion,
			headerBytes
		}]);
		range = (start, end) => Array.from({ length: end - start + 1 }, (_, offset) => start + offset);
		PYTHON_BYTECODE_IDENTITIES = new Map([
			...identities([3390, 3391], "3.7", 12),
			...identities([
				3392,
				3393,
				3394
			], "3.7"),
			...identities([
				3400,
				3401,
				3410,
				3411,
				3412,
				3413
			], "3.8"),
			...identities(range(3420, 3425), "3.9"),
			...identities(range(3430, 3439), "3.10"),
			...identities([3494, 3495], "3.11"),
			...identities(range(3500, 3531), "3.12"),
			...identities(range(3550, 3571), "3.13"),
			...identities([3627], "3.14"),
			...identities([3666], "3.15")
		]);
		pythonBytecodeIdentity = (magic) => PYTHON_BYTECODE_IDENTITIES.get(magic) ?? null;
		observePythonBytecodePrefix = (bytes) => {
			const prefix = bytes.subarray(0, 4);
			const magic = prefix.byteLength < 2 ? null : new BinaryReader(Buffer.from(prefix.buffer, prefix.byteOffset, prefix.byteLength), true, "python-bytecode").u16(0);
			if (prefix.byteLength < 4 || magic === null) return {
				state: "incomplete",
				prefix,
				magic,
				identity: null
			};
			if (prefix[2] !== 13 || prefix[3] !== 10) return {
				state: "invalid-crlf",
				prefix,
				magic,
				identity: null
			};
			return {
				state: "framed",
				prefix,
				magic,
				identity: pythonBytecodeIdentity(magic)
			};
		};
	})))();
}

//#endregion
//#region dist/domain/python/marshalUtf8.js
var UTF8, spanPrefixEnd, decodeMarshalUtf8;
function init_marshalUtf8() {
	return (init_marshalUtf8 = __esmMin((() => {
		init_result();
		init_strictUtf8();
		init_internalInvariant();
		UTF8 = strictUtf8Decoder("preserve");
		spanPrefixEnd = (text, limit) => {
			const end = Math.min(text.length, limit);
			return end > 0 && end < text.length && text.charCodeAt(end - 1) >= 55296 && text.charCodeAt(end - 1) <= 56319 && text.charCodeAt(end) >= 56320 && text.charCodeAt(end) <= 57343 ? end - 1 : end;
		};
		decodeMarshalUtf8 = (bytes, maximumPrefixUnits = Infinity) => {
			if (maximumPrefixUnits !== Infinity && (!Number.isSafeInteger(maximumPrefixUnits) || maximumPrefixUnits < 0)) throw invariantViolation("Marshal prefix limit must be a nonnegative safe integer.");
			const chunks = [];
			let start = 0;
			let prefixEnd = 0;
			let prefixOpen = true;
			const append = (text) => {
				if (text.length !== 0) chunks.push(text);
				if (!prefixOpen) return;
				const end = spanPrefixEnd(text, maximumPrefixUnits - prefixEnd);
				prefixEnd += end;
				prefixOpen = end === text.length && prefixEnd < maximumPrefixUnits;
			};
			try {
				for (let offset = bytes.indexOf(237); offset !== -1; offset = bytes.indexOf(237, offset + 1)) {
					const second = bytes[offset + 1];
					const third = bytes[offset + 2];
					if (second === undefined || second < 160 || second > 191 || third === undefined || third < 128 || third > 191) continue;
					append(UTF8.decode(bytes.subarray(start, offset)));
					append(String.fromCharCode(53248 | (second & 63) << 6 | third & 63));
					start = offset + 3;
					offset += 2;
				}
				if (start === 0) {
					const text = UTF8.decode(bytes);
					return ok({
						text,
						prefixEnd: spanPrefixEnd(text, maximumPrefixUnits)
					});
				}
				append(UTF8.decode(bytes.subarray(start)));
				return ok({
					text: chunks.join(""),
					prefixEnd
				});
			} catch (cause) {
				if (cause instanceof TypeError) return err({ kind: "invalid-marshal-utf8" });
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/python/marshalReader.js
var FLAG_REF, TYPE_INT, TYPE_LONG, TYPE_BYTES, TYPE_INTERNED, TYPE_REF, TYPE_TUPLE, TYPE_LIST, TYPE_UNICODE, TYPE_ASCII, TYPE_ASCII_INTERNED, TYPE_SMALL_TUPLE, TYPE_SHORT_ASCII, TYPE_SHORT_ASCII_INTERNED, MarshalDefectError, MarshalReader, smallBitLength;
function init_marshalReader() {
	return (init_marshalReader = __esmMin((() => {
		init_marshalUtf8();
		init_binaryContainer();
		init_budget();
		init_parseFailure();
		FLAG_REF = 128;
		TYPE_INT = 105;
		TYPE_LONG = 108;
		TYPE_BYTES = 115;
		TYPE_INTERNED = 116;
		TYPE_REF = 114;
		TYPE_TUPLE = 40;
		TYPE_LIST = 91;
		TYPE_UNICODE = 117;
		TYPE_ASCII = 97;
		TYPE_ASCII_INTERNED = 65;
		TYPE_SMALL_TUPLE = 41;
		TYPE_SHORT_ASCII = 122;
		TYPE_SHORT_ASCII_INTERNED = 90;
		MarshalDefectError = class extends ParseFailureError {
			defect;
			constructor(defect, format, message) {
				super({
					kind: "malformed",
					format,
					detail: message,
					field: defect
				});
				this.defect = defect;
			}
		};
		MarshalReader = class {
			bytes;
			options;
			offset = 0;
			depthReached = 0;
			#refs = [];
			#objects;
			#reader;
			constructor(bytes, options) {
				this.bytes = bytes;
				this.options = options;
				this.#objects = new Budget(options.limits.maxObjects);
				this.#reader = new BinaryReader(bytes, true, "python-marshal");
			}
			/** Objects read so far, within `maxObjects`. */
			get objects() {
				return this.#objects.used;
			}
			/** Read a type outside the core set. The default refuses it. */
			readExtended(type, _depth, _slot) {
				return this.malformed("unsupported-type", `Unsupported marshal type 0x${type.toString(16)}.`);
			}
			/** Whether a flagged type reserves a reference slot. */
			reservesReference(_type) {
				return true;
			}
			/** Whether a decoded value is no object at all, such as TYPE_NULL. */
			isAbsent(_value) {
				return false;
			}
			/** Check one decoded tuple or list item. */
			sequenceItem(_item) {}
			/** Note that a tuple or list starts or finishes reading its items. */
			sequenceReading(_value, _reading) {}
			malformed(defect, message) {
				throw new MarshalDefectError(defect, this.options.format, message);
			}
			readObject(depth) {
				const { limits } = this.options;
				if (!this.#objects.tryCharge(1)) this.limitExceeded({ limit: "objects" });
				if (depth > limits.maxDepth) this.limitExceeded({ limit: "depth" });
				this.depthReached = Math.max(this.depthReached, depth);
				const raw = this.u8();
				const flagged = (raw & FLAG_REF) !== 0;
				const type = raw & ~FLAG_REF;
				if (type === TYPE_REF) return this.readRef();
				const slot = flagged && this.reservesReference(type) ? this.#refs.length : undefined;
				if (slot !== undefined) this.#refs.push(undefined);
				const value = this.readTyped(type, depth, slot);
				if (slot !== undefined && this.#refs[slot] === undefined && !this.isAbsent(value)) this.#refs[slot] = value;
				return value;
			}
			readTyped(type, depth, slot) {
				switch (type) {
					case TYPE_INT: {
						const value = BigInt(this.i32());
						return this.wrap({
							kind: "int",
							value,
							bits: smallBitLength(value)
						});
					}
					case TYPE_LONG: return this.wrap({
						kind: "int",
						...this.long()
					});
					case TYPE_BYTES: return this.wrap({
						kind: "bytes",
						value: this.blob(this.stringLength())
					});
					case TYPE_INTERNED:
					case TYPE_UNICODE: return this.wrap(this.string(this.stringLength(), "utf8"));
					case TYPE_ASCII:
					case TYPE_ASCII_INTERNED: return this.wrap(this.string(this.stringLength(), "latin1"));
					case TYPE_SHORT_ASCII:
					case TYPE_SHORT_ASCII_INTERNED: return this.wrap(this.string(this.u8(), "latin1"));
					case TYPE_TUPLE: return this.sequenceValue("tuple", this.nonNegativeInt32("Marshal tuple length", "negative-sequence-length"), depth, slot);
					case TYPE_SMALL_TUPLE: return this.sequenceValue("tuple", this.u8(), depth, slot);
					case TYPE_LIST: return this.sequenceValue("list", this.nonNegativeInt32("Marshal list length", "negative-sequence-length"), depth, slot);
					default: return this.readExtended(type, depth, slot);
				}
			}
			readRef() {
				const index = this.u32();
				const value = this.#refs[index];
				if (value === undefined) return this.malformed("unresolved-reference", `TYPE_REF index ${index} is missing or still being constructed.`);
				return value;
			}
			/** Fill a reserved reference slot with the value it stands for. */
			publish(slot, value) {
				if (slot !== undefined) this.#refs[slot] = value;
			}
			sequenceValue(kind, count, depth, slot) {
				const { maxSequence } = this.options.limits;
				if (maxSequence !== undefined && count > maxSequence) this.limitExceeded({
					limit: "sequence",
					amount: count
				});
				const items = [];
				const value = this.wrap(kind === "tuple" ? {
					kind: "tuple",
					items
				} : {
					kind: "list",
					items
				});
				if (this.options.publishContainers === "before-items") this.publish(slot, value);
				this.sequenceReading(value, true);
				for (let index = 0; index < count; index += 1) {
					const item = this.readObject(depth + 1);
					this.sequenceItem(item);
					items.push(item);
				}
				this.sequenceReading(value, false);
				return value;
			}
			long() {
				const count = this.i32();
				const size = Math.abs(count);
				const { maxLongDigits, maxStringBytes } = this.options.limits;
				if (maxLongDigits !== undefined && size > maxLongDigits) this.limitExceeded({
					limit: "long-digits",
					amount: size
				});
				if (size * 2 > maxStringBytes) this.limitExceeded({
					limit: "long-bytes",
					amount: size * 2
				});
				if (this.offset > this.bytes.length - size * 2) this.malformed("truncated", "Marshal long overruns the selected file.");
				const nibbles = [];
				let carry = 0;
				let carryBits = 0;
				let digit = 0;
				for (let index = 0; index < size; index += 1) {
					digit = this.u16();
					if (digit >= 32768) this.malformed("long-digit-range", "Marshal long digit is out of range.");
					carry |= digit << carryBits;
					carryBits += 15;
					while (carryBits >= 4) {
						nibbles.push(carry & 15);
						carry >>>= 4;
						carryBits -= 4;
					}
				}
				if (size > 0 && digit === 0) this.malformed("long-not-normalized", "Marshal long is not normalized.");
				if (carryBits > 0) nibbles.push(carry);
				let bits = 0;
				if (size > 0) {
					let top = digit;
					while (top > 0) {
						top >>>= 1;
						bits += 1;
					}
					bits += (size - 1) * 15;
				}
				if (nibbles.length === 0) return {
					value: 0n,
					bits: 0
				};
				const magnitude = BigInt(`0x${nibbles.reverse().map((nibble) => nibble.toString(16)).join("")}`);
				return {
					value: count < 0 ? -magnitude : magnitude,
					bits
				};
			}
			string(length, encoding) {
				const bytes = this.blob(length);
				const previewLimit = this.options.previewLimit ?? Infinity;
				if (encoding === "latin1") {
					const value = bytes.toString("latin1");
					return {
						kind: "str",
						value,
						previewEnd: Math.min(length, previewLimit),
						bytes: length,
						raw: bytes.some((byte) => byte > 127) ? Buffer.from(value, "utf8") : bytes
					};
				}
				const decoded = decodeMarshalUtf8(bytes, previewLimit);
				if (!decoded.ok) return this.malformed("invalid-utf8", "Marshal string is not valid UTF-8.");
				return {
					kind: "str",
					value: decoded.value.text,
					previewEnd: decoded.value.prefixEnd,
					bytes: length,
					raw: bytes
				};
			}
			/** A string or bytes length, which CPython requires non-negative. */
			stringLength() {
				return this.nonNegativeInt32("Marshal string length", "negative-string-length");
			}
			blob(length) {
				if (length > this.options.limits.maxStringBytes) this.limitExceeded({
					limit: "string-bytes",
					amount: length
				});
				if (this.offset > this.bytes.length - length) this.malformed("truncated", "Marshal string overruns the selected file.");
				const value = this.bytes.subarray(this.offset, this.offset + length);
				this.offset += length;
				return Buffer.from(value);
			}
			u8() {
				const value = this.bytes[this.offset];
				if (value === undefined) return this.malformed("truncated", "Marshal stream ended inside an object.");
				this.offset += 1;
				return value;
			}
			u16() {
				if (this.offset > this.bytes.length - 2) this.malformed("truncated", "Marshal stream ended inside a 16-bit field.");
				const value = this.#reader.u16(this.offset);
				this.offset += 2;
				return value;
			}
			u32() {
				return this.i32() >>> 0;
			}
			i32() {
				if (this.offset > this.bytes.length - 4) this.malformed("truncated", "Marshal stream ended inside a 32-bit field.");
				const value = this.#reader.i32(this.offset);
				this.offset += 4;
				return value;
			}
			/** CPython `TYPE_INT64`: a signed little-endian 64-bit integer. */
			i64() {
				if (this.offset > this.bytes.length - 8) this.malformed("truncated", "Marshal stream ended inside a 64-bit integer.");
				const value = this.#reader.i64(this.offset);
				this.offset += 8;
				return value;
			}
			/** CPython `TYPE_BINARY_FLOAT`: a little-endian IEEE 754 double. */
			f64() {
				if (this.offset > this.bytes.length - 8) this.malformed("truncated", "Marshal stream ended inside a float.");
				const value = this.#reader.f64(this.offset);
				this.offset += 8;
				return value;
			}
			/** CPython `r_long` count fields that its constructors require non-negative. */
			nonNegativeInt32(field, defect = "negative-field") {
				const value = this.i32();
				if (value < 0) this.malformed(defect, `${field} is negative.`);
				return value;
			}
		};
		smallBitLength = (value) => {
			if (value === 0n) return 0;
			const magnitude = value < 0n ? -value : value;
			return magnitude.toString(2).length;
		};
	})))();
}

//#endregion
export { MarshalDefectError, MarshalReader, init_marshalReader, init_pythonBytecodeIdentity, observePythonBytecodePrefix, smallBitLength };