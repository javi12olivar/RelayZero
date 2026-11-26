import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/asn1Oid.js
var decodeAsn1Oid;
function init_asn1Oid() {
	return (init_asn1Oid = __esmMin((() => {
		init_result();
		decodeAsn1Oid = (content, limits) => {
			if (content.length === 0) return err({ kind: "empty" });
			if (content.length > limits.bytes) return err({
				kind: "byte-limit",
				limit: limits.bytes
			});
			const arcs = [];
			let value = 0n;
			let arcBytes = 0;
			for (const byte of content) {
				arcBytes += 1;
				if (arcBytes > limits.arcBytes) return err({
					kind: "arc-limit",
					limit: limits.arcBytes
				});
				if (arcBytes === 1 && byte === 128) return err({ kind: "non-minimal" });
				value = value << 7n | BigInt(byte & 127);
				if ((byte & 128) !== 0) continue;
				if (arcs.length === 0) {
					const first = value < 80n ? value / 40n : 2n;
					arcs.push(first, value - first * 40n);
				} else arcs.push(value);
				value = 0n;
				arcBytes = 0;
			}
			return arcBytes === 0 ? ok(arcs.join(".")) : err({ kind: "truncated" });
		};
	})))();
}

//#endregion
//#region dist/domain/asn1Ber.js
var Asn1BerFailure, fail, Asn1BerReader;
function init_asn1Ber() {
	return (init_asn1Ber = __esmMin((() => {
		Asn1BerFailure = class extends Error {
			constraint;
			constructor(message, constraint = null) {
				super(message);
				this.constraint = constraint;
				this.name = "Asn1BerFailure";
			}
		};
		fail = (message, constraint = null) => {
			throw new Asn1BerFailure(message, constraint);
		};
		Asn1BerReader = class {
			bytes;
			maxNodes;
			maxDepth;
			#budget;
			constructor(bytes, maxNodes, maxDepth = 32) {
				this.bytes = bytes;
				this.maxNodes = maxNodes;
				this.maxDepth = maxDepth;
				this.#budget = { remaining: maxNodes };
			}
			read(offset = 0, end = this.bytes.length, depth = 0) {
				if (depth > this.maxDepth) return fail(`ASN.1 nesting exceeds ${String(this.maxDepth)} levels.`, {
					resource: "depth",
					limit: this.maxDepth
				});
				if (this.#budget.remaining <= 0) return fail(`ASN.1 value count exceeds the ${String(this.maxNodes)}-node budget.`, {
					resource: "nodes",
					limit: this.maxNodes
				});
				this.#budget.remaining -= 1;
				if (offset >= end || offset + 2 > end) return fail("Truncated ASN.1 tag or length.");
				const tag = this.bytes[offset];
				if (tag === undefined) return fail("Truncated ASN.1 tag.");
				if ((tag & 31) === 31) return fail(`High-tag-number form at byte ${String(offset)} is unsupported.`);
				if (tag === 0) return fail("Unexpected end-of-contents marker outside an indefinite value.");
				const constructed = (tag & 32) !== 0;
				let cursor = offset + 1;
				const lengthByte = this.bytes[cursor];
				if (lengthByte === undefined) return fail("Truncated ASN.1 length.");
				cursor += 1;
				let length = 0;
				const indefinite = lengthByte === 128;
				if (indefinite) {
					if (!constructed) return fail("Primitive ASN.1 values cannot use indefinite length.");
				} else if ((lengthByte & 128) === 0) length = lengthByte;
				else {
					const width = lengthByte & 127;
					if (width > 4) return fail("Unsupported ASN.1 long-form length width.");
					if (cursor + width > end) return fail("Truncated ASN.1 long length.");
					length = 0;
					for (let index = 0; index < width; index += 1) {
						const byte = this.bytes[cursor];
						if (byte === undefined) return fail("Truncated ASN.1 length.");
						length = length * 256 + byte;
						cursor += 1;
					}
				}
				const contentStart = cursor;
				const children = [];
				let contentEnd = cursor;
				let encodedEnd = cursor;
				if (indefinite) {
					let at = cursor;
					let terminated = false;
					while (at < end) {
						if (at + 1 < end && this.bytes[at] === 0 && this.bytes[at + 1] === 0) {
							contentEnd = at;
							encodedEnd = at + 2;
							terminated = true;
							break;
						}
						const child = this.read(at, end, depth + 1);
						children.push(child);
						at = child.end;
					}
					if (!terminated) return fail("Indefinite ASN.1 value has no end-of-contents marker.");
				} else {
					contentEnd = cursor + length;
					if (contentEnd > end) return fail("ASN.1 value exceeds its parent.");
					encodedEnd = contentEnd;
				}
				if (constructed && !indefinite) {
					let at = cursor;
					while (at < contentEnd) {
						const child = this.read(at, contentEnd, depth + 1);
						children.push(child);
						at = child.end;
					}
				}
				return {
					tag,
					constructed,
					lengthForm: indefinite ? "indefinite" : "definite",
					start: offset,
					contentStart,
					contentEnd,
					end: encodedEnd,
					content: this.bytes.subarray(contentStart, contentEnd),
					children
				};
			}
		};
	})))();
}

//#endregion
export { Asn1BerFailure, Asn1BerReader, decodeAsn1Oid, init_asn1Ber, init_asn1Oid };