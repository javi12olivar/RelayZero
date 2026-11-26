import { ParseFailureError } from "../../domain/parseFailure.js";
/** Resource boundary exceeded while walking a Shell Link file. */
export class WindowsShortcutResourceFailure extends ParseFailureError {
    constructor(boundary, maximum, detail) {
        super({
            kind: "limit",
            format: "windows-shortcut",
            detail,
            limit: { name: boundary, maximum },
        });
        this.name = "WindowsShortcutResourceFailure";
    }
}
