import { isStrictUtf8 } from "./strictUtf8.js";
/** Preserve stored bytes; undecodable targets have no invented text spelling. */
export const observedSymlinkTarget = (raw) => {
    return {
        text: isStrictUtf8(raw) ? raw.toString("utf8") : null,
        hex: raw.toString("hex"),
    };
};
