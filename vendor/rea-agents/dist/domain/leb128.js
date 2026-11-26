export const ULEB32 = { signed: false, bits: 32 };
export const ULEB64 = { signed: false, bits: 64 };
export const SLEB64 = { signed: true, bits: 64 };
/**
 * Decode one LEB128 integer from `bytes[offset, end)`.
 *
 * Bits beyond `bits` must repeat the sign (signed) or be zero (unsigned);
 * otherwise the read fails as `overflow` and never wraps.
 */
export const readLeb128 = (bytes, offset, end, encoding) => {
    const { signed, bits } = encoding;
    const limit = Math.min(end, bytes.length);
    const maximumBytes = encoding.padding === true ? Number.POSITIVE_INFINITY : Math.ceil(bits / 7);
    let value = 0n;
    let shift = 0;
    let negative = false;
    for (let index = offset, count = 0;; index++, count++) {
        if (count >= maximumBytes)
            return { failure: "overflow", at: index };
        if (index < 0 || index >= limit)
            return { failure: "truncated", at: index };
        const byte = bytes[index];
        const payload = byte & 0x7f;
        if (shift >= bits) {
            // A padding byte carries no value bits; it can only repeat the sign.
            if (payload !== (negative ? 0x7f : 0))
                return { failure: "overflow", at: index };
        }
        else if (shift + 7 > bits) {
            const kept = bits - shift;
            const high = payload >> kept;
            if (signed) {
                negative = ((payload >> (kept - 1)) & 1) === 1;
                if (high !== (negative ? 0x7f >> kept : 0))
                    return { failure: "overflow", at: index };
            }
            else if (high !== 0)
                return { failure: "overflow", at: index };
            value |= BigInt(payload & ((1 << kept) - 1)) << BigInt(shift);
        }
        else
            value |= BigInt(payload) << BigInt(shift);
        shift += 7;
        if ((byte & 0x80) === 0) {
            if (signed) {
                if (shift < bits) {
                    if ((payload & 0x40) !== 0)
                        value -= 1n << BigInt(shift);
                }
                else if (negative)
                    value -= 1n << BigInt(bits);
            }
            return { value, next: index + 1 };
        }
    }
};
