import { FILESYSTEM_ERROR_CODES } from "./ReferenceSourceReaderErrors.js";
/** Project resource failures into the reference-source error contract. */
export const referenceSourceResourceFailure = (cause) => ({
    tag: "reference-source-reader",
    code: cause.reason === "cancelled" ? "cancelled" : "io",
    message: cause.message,
    ...(cause.cleanup === undefined ? {} : { cleanup: cause.cleanup }),
    cause,
});
/** Preserve root I/O detail while separating bad selections from access failures. */
export const rootFilesystemFailure = (cause, operation) => {
    if (!(cause instanceof Error))
        return undefined;
    const code = Reflect.get(cause, "code");
    if (typeof code !== "string" || !FILESYSTEM_ERROR_CODES.has(code))
        return undefined;
    return {
        code: ["ENOENT", "ENOTDIR", "ELOOP", "ENAMETOOLONG"].includes(code)
            ? "invalid-root"
            : "io",
        message: `${operation}: ${cause.message}`,
        ...(code === "ELOOP"
            ? {
                remediationAction: "Repair the symbolic-link chain or select another reference source directory.",
            }
            : code === "ENAMETOOLONG"
                ? {
                    remediationAction: "Select a reference source path within the operating system's path-length limits.",
                }
                : {}),
    };
};
