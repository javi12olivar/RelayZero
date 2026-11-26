import { MAX_DWARF_ULEB_BYTES } from "../../domain/native/dwarfUnits.js";
/** Bounded cursor over one DWARF section or unit payload. */
export class DwarfCursor {
    bytes;
    little;
    offset = 0;
    constructor(bytes, little) {
        this.bytes = bytes;
        this.little = little;
    }
    remaining() {
        return this.bytes.length - this.offset;
    }
    u8() {
        if (this.remaining() < 1)
            return null;
        const value = this.bytes[this.offset];
        this.offset += 1;
        return value;
    }
    u16() {
        return this.#readInt(2);
    }
    u32() {
        return this.#readInt(4);
    }
    u64() {
        return this.fixed(8);
    }
    /** Read `size` bytes as an unsigned integer. Null when the cursor is short. */
    fixed(size) {
        if (size < 0 || this.remaining() < size)
            return null;
        let value = 0n;
        if (this.little) {
            for (let index = 0; index < size; index += 1)
                value |= BigInt(this.bytes[this.offset + index]) << BigInt(8 * index);
        }
        else {
            for (let index = 0; index < size; index += 1)
                value = (value << 8n) | BigInt(this.bytes[this.offset + index]);
        }
        this.offset += size;
        return value;
    }
    skip(size) {
        if (size < 0 || this.remaining() < size)
            return false;
        this.offset += size;
        return true;
    }
    uleb() {
        return this.#leb(false);
    }
    sleb() {
        return this.#leb(true);
    }
    #readInt(size) {
        const value = this.fixed(size);
        return value === null ? null : Number(value);
    }
    #leb(signed) {
        let result = 0n;
        let shift = 0n;
        let byte = 0;
        for (let index = 0; index < MAX_DWARF_ULEB_BYTES; index += 1) {
            if (this.remaining() < 1)
                return { ok: false, reason: "truncated" };
            byte = this.bytes[this.offset];
            this.offset += 1;
            result |= BigInt(byte & 0x7f) << shift;
            shift += 7n;
            if ((byte & 0x80) === 0) {
                if (signed && (byte & 0x40) !== 0)
                    result |= -1n << shift;
                return { ok: true, value: result };
            }
        }
        return { ok: false, reason: "overlong" };
    }
}
const asSafeLength = (value) => value < 0n || value > BigInt(Number.MAX_SAFE_INTEGER) ? null : Number(value);
/**
 * Read a DWARF initial length. Advances past the length field only.
 * The caller frames the payload from the returned length.
 */
export const readInitialLength = (cursor) => {
    const first = cursor.u32();
    if (first === null)
        return { ok: false, reason: "truncated" };
    if (first >= 0xfffffff0 && first <= 0xfffffffe)
        return { ok: false, reason: "reserved" };
    if (first !== 0xffffffff) {
        return {
            ok: true,
            offsetSize: 4,
            payloadLength: first,
            totalLength: 4 + first,
        };
    }
    const wide = cursor.u64();
    if (wide === null)
        return { ok: false, reason: "truncated" };
    const payloadLength = asSafeLength(wide);
    if (payloadLength === null)
        return { ok: false, reason: "overflow" };
    const totalLength = asSafeLength(12n + wide);
    if (totalLength === null)
        return { ok: false, reason: "overflow" };
    return { ok: true, offsetSize: 8, payloadLength, totalLength };
};
