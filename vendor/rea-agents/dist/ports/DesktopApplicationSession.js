/** `xprop` could not be started at all. */
export class XpropUnavailableError extends Error {
    command;
    constructor(command) {
        super(`${command} could not be started`);
        this.command = command;
        this.name = "XpropUnavailableError";
    }
}
/** A session failed, and the processes it launched could not all be removed. */
export class DesktopSessionCleanupError extends Error {
    primary;
    cleanup;
    constructor(primary, cleanup) {
        super(`desktop session cleanup is incomplete: ${cleanup.reason}`, {
            cause: primary,
        });
        this.primary = primary;
        this.cleanup = cleanup;
        this.name = "DesktopSessionCleanupError";
    }
}
