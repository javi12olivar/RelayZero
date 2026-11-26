import { decodeMarshalUtf8 } from "./marshalUtf8.js";
import { BinaryReader } from "../binaryContainer.js";
import { Budget } from "../budget.js";
import { ParseFailureError } from "../parseFailure.js";
const FLAG_REF = 0x80;
const TYPE_INT = 0x69;
const TYPE_LONG = 0x6c;
const TYPE_BYTES = 0x73;
const TYPE_INTERNED = 0x74;
const TYPE_REF = 0x72;
const TYPE_TUPLE = 0x28;
const TYPE_LIST = 0x5b;
const TYPE_UNICODE = 0x75;
const TYPE_ASCII = 0x61;
const TYPE_ASCII_INTERNED = 0x41;
const TYPE_SMALL_TUPLE = 0x29;
const TYPE_SHORT_ASCII = 0x7a;
const TYPE_SHORT_ASCII_INTERNED = 0x5a;
/** A malformed marshal stream, naming its defect for each reader's wording. */
export class MarshalDefectError extends ParseFailureError {
    defect;
    constructor(defect, format, message) {
        super({ kind: "malformed", format, detail: message, field: defect });
        this.defect = defect;
    }
}
/**
 * One CPython marshal value reader. It owns the cursor, the reference table,
 * the walk budgets, and the integer, string, bytes, tuple and list types.
 * A subclass adds the other types through {@link readExtended}; without it,
 * every other type is refused, which is the PyInstaller table subset.
 */
export class MarshalReader {
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
    sequenceItem(_item) { }
    /** Note that a tuple or list starts or finishes reading its items. */
    sequenceReading(_value, _reading) { }
    malformed(defect, message) {
        throw new MarshalDefectError(defect, this.options.format, message);
    }
    readObject(depth) {
        const { limits } = this.options;
        if (!this.#objects.tryCharge(1))
            this.limitExceeded({ limit: "objects" });
        if (depth > limits.maxDepth)
            this.limitExceeded({ limit: "depth" });
        this.depthReached = Math.max(this.depthReached, depth);
        const raw = this.u8();
        const flagged = (raw & FLAG_REF) !== 0;
        const type = raw & ~FLAG_REF;
        // CPython masks FLAG_REF before dispatch; TYPE_REF returns its existing
        // slot directly, and singleton tags bypass reference registration.
        if (type === TYPE_REF)
            return this.readRef();
        const slot = flagged && this.reservesReference(type) ? this.#refs.length : undefined;
        if (slot !== undefined)
            this.#refs.push(undefined);
        const value = this.readTyped(type, depth, slot);
        if (slot !== undefined &&
            this.#refs[slot] === undefined &&
            !this.isAbsent(value))
            this.#refs[slot] = value;
        return value;
    }
    readTyped(type, depth, slot) {
        switch (type) {
            case TYPE_INT: {
                const value = BigInt(this.i32());
                return this.wrap({ kind: "int", value, bits: smallBitLength(value) });
            }
            case TYPE_LONG:
                return this.wrap({ kind: "int", ...this.long() });
            case TYPE_BYTES:
                return this.wrap({
                    kind: "bytes",
                    value: this.blob(this.stringLength()),
                });
            case TYPE_INTERNED:
            case TYPE_UNICODE:
                return this.wrap(this.string(this.stringLength(), "utf8"));
            case TYPE_ASCII:
            case TYPE_ASCII_INTERNED:
                return this.wrap(this.string(this.stringLength(), "latin1"));
            case TYPE_SHORT_ASCII:
            case TYPE_SHORT_ASCII_INTERNED:
                return this.wrap(this.string(this.u8(), "latin1"));
            case TYPE_TUPLE:
                return this.sequenceValue("tuple", this.nonNegativeInt32("Marshal tuple length", "negative-sequence-length"), depth, slot);
            case TYPE_SMALL_TUPLE:
                return this.sequenceValue("tuple", this.u8(), depth, slot);
            case TYPE_LIST:
                return this.sequenceValue("list", this.nonNegativeInt32("Marshal list length", "negative-sequence-length"), depth, slot);
            default:
                return this.readExtended(type, depth, slot);
        }
    }
    readRef() {
        const index = this.u32();
        const value = this.#refs[index];
        if (value === undefined)
            return this.malformed("unresolved-reference", `TYPE_REF index ${index} is missing or still being constructed.`);
        return value;
    }
    /** Fill a reserved reference slot with the value it stands for. */
    publish(slot, value) {
        if (slot !== undefined)
            this.#refs[slot] = value;
    }
    sequenceValue(kind, count, depth, slot) {
        const { maxSequence } = this.options.limits;
        if (maxSequence !== undefined && count > maxSequence)
            this.limitExceeded({ limit: "sequence", amount: count });
        const items = [];
        const value = this.wrap(kind === "tuple" ? { kind: "tuple", items } : { kind: "list", items });
        if (this.options.publishContainers === "before-items")
            this.publish(slot, value);
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
        if (maxLongDigits !== undefined && size > maxLongDigits)
            this.limitExceeded({ limit: "long-digits", amount: size });
        if (size * 2 > maxStringBytes)
            this.limitExceeded({ limit: "long-bytes", amount: size * 2 });
        if (this.offset > this.bytes.length - size * 2)
            this.malformed("truncated", "Marshal long overruns the selected file.");
        const nibbles = [];
        let carry = 0;
        let carryBits = 0;
        let digit = 0;
        for (let index = 0; index < size; index += 1) {
            digit = this.u16();
            if (digit >= 0x8000)
                this.malformed("long-digit-range", "Marshal long digit is out of range.");
            carry |= digit << carryBits;
            carryBits += 15;
            while (carryBits >= 4) {
                nibbles.push(carry & 0xf);
                carry >>>= 4;
                carryBits -= 4;
            }
        }
        if (size > 0 && digit === 0)
            this.malformed("long-not-normalized", "Marshal long is not normalized.");
        if (carryBits > 0)
            nibbles.push(carry);
        let bits = 0;
        if (size > 0) {
            let top = digit;
            while (top > 0) {
                top >>>= 1;
                bits += 1;
            }
            bits += (size - 1) * 15;
        }
        if (nibbles.length === 0)
            return { value: 0n, bits: 0 };
        const magnitude = BigInt(`0x${nibbles
            .reverse()
            .map((nibble) => nibble.toString(16))
            .join("")}`);
        return { value: count < 0 ? -magnitude : magnitude, bits };
    }
    string(length, encoding) {
        const bytes = this.blob(length);
        const previewLimit = this.options.previewLimit ?? Infinity;
        if (encoding === "latin1") {
            // CPython reads the ASCII-tagged forms as one-byte Unicode, even when
            // high bytes appear. Identity must agree with the UTF-8 string form.
            const value = bytes.toString("latin1");
            return {
                kind: "str",
                value,
                previewEnd: Math.min(length, previewLimit),
                bytes: length,
                raw: bytes.some((byte) => byte > 0x7f)
                    ? Buffer.from(value, "utf8")
                    : bytes,
            };
        }
        const decoded = decodeMarshalUtf8(bytes, previewLimit);
        if (!decoded.ok)
            return this.malformed("invalid-utf8", "Marshal string is not valid UTF-8.");
        return {
            kind: "str",
            value: decoded.value.text,
            previewEnd: decoded.value.prefixEnd,
            bytes: length,
            raw: bytes,
        };
    }
    /** A string or bytes length, which CPython requires non-negative. */
    stringLength() {
        return this.nonNegativeInt32("Marshal string length", "negative-string-length");
    }
    blob(length) {
        if (length > this.options.limits.maxStringBytes)
            this.limitExceeded({ limit: "string-bytes", amount: length });
        if (this.offset > this.bytes.length - length)
            this.malformed("truncated", "Marshal string overruns the selected file.");
        const value = this.bytes.subarray(this.offset, this.offset + length);
        this.offset += length;
        return Buffer.from(value);
    }
    u8() {
        const value = this.bytes[this.offset];
        if (value === undefined)
            return this.malformed("truncated", "Marshal stream ended inside an object.");
        this.offset += 1;
        return value;
    }
    u16() {
        if (this.offset > this.bytes.length - 2)
            this.malformed("truncated", "Marshal stream ended inside a 16-bit field.");
        const value = this.#reader.u16(this.offset);
        this.offset += 2;
        return value;
    }
    u32() {
        return this.i32() >>> 0;
    }
    i32() {
        if (this.offset > this.bytes.length - 4)
            this.malformed("truncated", "Marshal stream ended inside a 32-bit field.");
        const value = this.#reader.i32(this.offset);
        this.offset += 4;
        return value;
    }
    /** CPython `TYPE_INT64`: a signed little-endian 64-bit integer. */
    i64() {
        if (this.offset > this.bytes.length - 8)
            this.malformed("truncated", "Marshal stream ended inside a 64-bit integer.");
        const value = this.#reader.i64(this.offset);
        this.offset += 8;
        return value;
    }
    /** CPython `TYPE_BINARY_FLOAT`: a little-endian IEEE 754 double. */
    f64() {
        if (this.offset > this.bytes.length - 8)
            this.malformed("truncated", "Marshal stream ended inside a float.");
        const value = this.#reader.f64(this.offset);
        this.offset += 8;
        return value;
    }
    /** CPython `r_long` count fields that its constructors require non-negative. */
    nonNegativeInt32(field, defect = "negative-field") {
        const value = this.i32();
        if (value < 0)
            this.malformed(defect, `${field} is negative.`);
        return value;
    }
}
/** Bit length of an integer's magnitude, as CPython's `int.bit_length`. */
export const smallBitLength = (value) => {
    if (value === 0n)
        return 0;
    const magnitude = value < 0n ? -value : value;
    return magnitude.toString(2).length;
};
