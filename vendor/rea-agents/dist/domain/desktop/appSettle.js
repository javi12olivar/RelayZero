import { sha256Hex } from "../../kernel/sha256Hex.js";
/**
 * Grading waits for the app's own save: Gnote saves a note 4 s after the
 * last key, so a read right after the agent stops sees the text unsaved. A
 * save that lands more than the window after the first read is still
 * missed, and an app whose files never change pays the window.
 */
export const SETTLE_TIMING = {
    intervalMs: 500,
    windowMs: 3_000,
    boundMs: 15_000,
};
/** Where a data/get file part names its path in the home. */
const DATA_OBJECTS = "urn:agentenv:data-objects/v1";
const textField = (value, key) => {
    const field = typeof value === "object" && value !== null
        ? value[key]
        : undefined;
    return typeof field === "string" ? field : undefined;
};
/**
 * The files an app's data/get answer holds, each by its home path, or its
 * place among the parts, with the SHA-256 of its bytes as sent: what
 * changes when the app saves, compared between reads.
 */
export const appFileDigests = (parts) => JSON.stringify(parts
    .flatMap((part, index) => {
    if (textField(part, "kind") !== "file")
        return [];
    const { file, metadata } = part;
    const content = textField(file, "bytes") ?? textField(file, "uri");
    return [
        [
            textField(metadata?.[DATA_OBJECTS], "path") ?? `#${String(index)}`,
            sha256Hex(content ?? ""),
        ],
    ];
})
    .sort(([left = ""], [right = ""]) => left < right ? -1 : left > right ? 1 : 0));
