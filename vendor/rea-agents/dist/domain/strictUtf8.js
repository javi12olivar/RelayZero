import { isUtf8 } from "node:buffer";
/**
 * A fatal UTF-8 decoder with an explicit BOM policy. It throws a TypeError on
 * malformed bytes. Callers that pass `{ stream: true }` need their own
 * instance, so this returns a new decoder each call.
 */
export const strictUtf8Decoder = (bom) => new TextDecoder("utf-8", { fatal: true, ignoreBOM: bom === "preserve" });
const preserving = strictUtf8Decoder("preserve");
const stripping = strictUtf8Decoder("strip-signature");
/** Decode complete UTF-8 bytes; malformed input throws a TypeError. */
export const decodeStrictUtf8 = (bytes, bom) => (bom === "preserve" ? preserving : stripping).decode(bytes);
/** Whether the bytes are well-formed UTF-8, without building the string. */
export const isStrictUtf8 = (bytes) => isUtf8(bytes);
