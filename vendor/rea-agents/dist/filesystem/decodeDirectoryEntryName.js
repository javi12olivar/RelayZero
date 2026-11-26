import { isStrictUtf8 } from "../domain/strictUtf8.js";
/** Decode POSIX directory-entry bytes without allowing replacement-character aliases. */
export const decodeDirectoryEntryName = (raw) => {
    if (typeof raw === "string")
        return { kind: "decoded", name: raw };
    return isStrictUtf8(raw)
        ? { kind: "decoded", name: raw.toString("utf8") }
        : { kind: "unrepresentable", rawHex: raw.toString("hex") };
};
