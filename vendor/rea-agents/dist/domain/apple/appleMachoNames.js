import { decodeStrictUtf8 } from "../strictUtf8.js";
/** NUL terminators and source bounds are validated by the owning format reader. */
export const decodeMachoName = (bytes) => {
    try {
        return decodeStrictUtf8(bytes, "preserve");
    }
    catch {
        return { bytes_base64: bytes.toString("base64") };
    }
};
/** Fixed-width Mach-O names end at the first NUL; retain every preceding byte. */
export const decodeMachoFixedName = (bytes) => {
    const nul = bytes.indexOf(0);
    // Latin-1 preserves high bits instead of fabricating ASCII metadata names.
    return bytes.subarray(0, nul < 0 ? bytes.length : nul).toString("latin1");
};
