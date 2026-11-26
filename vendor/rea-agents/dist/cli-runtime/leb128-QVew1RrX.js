import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/leb128.js
var ULEB32, ULEB64, SLEB64, readLeb128;
function init_leb128() {
	return (init_leb128 = __esmMin((() => {
		ULEB32 = {
			signed: false,
			bits: 32
		};
		ULEB64 = {
			signed: false,
			bits: 64
		};
		SLEB64 = {
			signed: true,
			bits: 64
		};
		readLeb128 = (bytes, offset, end, encoding) => {
			const { signed, bits } = encoding;
			const limit = Math.min(end, bytes.length);
			const maximumBytes = encoding.padding === true ? Number.POSITIVE_INFINITY : Math.ceil(bits / 7);
			let value = 0n;
			let shift = 0;
			let negative = false;
			for (let index = offset, count = 0;; index++, count++) {
				if (count >= maximumBytes) return {
					failure: "overflow",
					at: index
				};
				if (index < 0 || index >= limit) return {
					failure: "truncated",
					at: index
				};
				const byte = bytes[index];
				const payload = byte & 127;
				if (shift >= bits) {
					if (payload !== (negative ? 127 : 0)) return {
						failure: "overflow",
						at: index
					};
				} else if (shift + 7 > bits) {
					const kept = bits - shift;
					const high = payload >> kept;
					if (signed) {
						negative = (payload >> kept - 1 & 1) === 1;
						if (high !== (negative ? 127 >> kept : 0)) return {
							failure: "overflow",
							at: index
						};
					} else if (high !== 0) return {
						failure: "overflow",
						at: index
					};
					value |= BigInt(payload & (1 << kept) - 1) << BigInt(shift);
				} else value |= BigInt(payload) << BigInt(shift);
				shift += 7;
				if ((byte & 128) === 0) {
					if (signed) {
						if (shift < bits) {
							if ((payload & 64) !== 0) value -= 1n << BigInt(shift);
						} else if (negative) value -= 1n << BigInt(bits);
					}
					return {
						value,
						next: index + 1
					};
				}
			}
		};
	})))();
}

//#endregion
export { SLEB64, ULEB32, ULEB64, init_leb128, readLeb128 };