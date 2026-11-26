import { spawn } from "node:child_process";
import { lstat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { win32 } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { invariantViolation } from "../domain/internalInvariant.js";
import { parseJsonWithDuplicatePolicy } from "../domain/jsonDuplicateMember.js";
import { decodeLimit, malformedInput, truncatedInput, } from "../domain/parseFailure.js";
import { PrivateRuntimeRoot } from "../process/PrivateRuntimeRoot.js";
import { Utf8NdjsonLineBuffer } from "../process/Utf8NdjsonLineBuffer.js";
/** Match the native owner's ordinary spelling only for extended local drive paths. */
const localDrivePath = (path) => path.replace(/^\\\\\?\\(?=[A-Za-z]:\\)/u, "");
const guardianSource = fileURLToPath(new URL("../../scripts/rea-android-workspace-guardian.mjs", import.meta.url));
const readySchema = z.strictObject({
    path: z.string(),
    volumeSerial: z.string().regex(/^[a-f0-9]{16}$/u),
    fileId: z.string().regex(/^[a-f0-9]{32}$/u),
    privateDacl: z.literal(true),
});
const GUARDIAN_READINESS_BYTES = 4096;
const readGuardianReadiness = async (stdout) => {
    const format = "android-workspace-guardian";
    // The guardian's byte limit includes the LF that completes the record.
    const frames = new Utf8NdjsonLineBuffer(() => GUARDIAN_READINESS_BYTES - 1);
    for await (const chunk of stdout.iterator({ destroyOnReturn: false })) {
        if (!Buffer.isBuffer(chunk))
            throw invariantViolation("Android workspace guardian stdout did not provide bytes");
        for (const line of frames.pushRaw(chunk)) {
            if (line.ok)
                return line.value;
            if (line.error.failure.kind === "limit")
                throw decodeLimit(format, "Android workspace guardian readiness exceeded 4 KiB", {
                    name: "guardian-readiness-bytes",
                    maximum: GUARDIAN_READINESS_BYTES,
                }, { cause: line.error });
            throw malformedInput(format, "Android workspace guardian readiness is not valid UTF-8", { cause: line.error });
        }
    }
    throw truncatedInput(format, "Android workspace guardian stdout ended before readiness");
};
const boundedWait = async (promise, milliseconds, label) => {
    let timer;
    try {
        return await Promise.race([
            promise,
            new Promise((_resolve, reject) => {
                timer = setTimeout(() => reject(new Error(label)), milliseconds);
            }),
        ]);
    }
    finally {
        clearTimeout(timer);
    }
};
/** A detached guardian retains native cleanup ownership without keeping its caller alive. */
const releaseGuardianReferences = (child) => {
    child.stdin.destroy();
    child.stdout.destroy();
    child.stderr.destroy();
    child.unref();
};
class WindowsJadxWorkspaceRoot {
    path;
    #failure = new AbortController();
    failureSignal = this.#failure.signal;
    #child;
    #exit;
    #diagnostics;
    #closing = false;
    #closePromise;
    constructor(path, child, exit, diagnostics) {
        this.path = path;
        this.#child = child;
        this.#exit = exit;
        this.#diagnostics = diagnostics;
        void this.#exit.then((result) => {
            if (!this.#closing)
                this.#failure.abort(new Error(`Android workspace guardian exited before cleanup: ${result.error?.message ?? result.code ?? result.signal ?? "unknown"}`));
        });
    }
    static async create() {
        const parent = tmpdir();
        const child = spawn(process.execPath, [guardianSource, parent], {
            detached: true,
            windowsHide: true,
            stdio: ["pipe", "pipe", "pipe"],
            env: {
                SystemRoot: process.env.SystemRoot,
                WINDIR: process.env.WINDIR,
                TEMP: parent,
                TMP: parent,
            },
        });
        let diagnostics = "";
        child.stderr.setEncoding("utf8");
        child.stderr.on("data", (chunk) => {
            diagnostics = (diagnostics + chunk).slice(-8192);
        });
        const exit = new Promise((resolve) => {
            child.once("error", (error) => resolve({ code: null, signal: null, error }));
            child.once("close", (code, signal) => resolve({ code, signal }));
        });
        // The readiness iterator observes errors during startup. Keep the pipe's
        // error handler after readiness, while child exit owns lifetime failure.
        child.stdout.on("error", () => undefined);
        const ready = readGuardianReadiness(child.stdout);
        try {
            const line = await boundedWait(Promise.race([
                ready,
                exit.then((result) => {
                    throw new Error(`Android workspace guardian exited during startup: ${result.error?.message ?? result.code ?? result.signal ?? "unknown"}; ${diagnostics}`);
                }),
            ]), 15000, "Android workspace guardian startup timed out");
            const decoded = parseJsonWithDuplicatePolicy(line, "reject");
            const observation = readySchema.parse(decoded.ok ? decoded.value : null);
            if (win32.dirname(localDrivePath(observation.path)).toLowerCase() !==
                localDrivePath(win32.resolve(parent)).toLowerCase() ||
                !/^rea-android-[a-f0-9]{32}$/u.test(win32.basename(observation.path)))
                throw new Error("Android workspace guardian returned an unexpected root");
            child.stdout.resume();
            return new WindowsJadxWorkspaceRoot(observation.path, child, exit, () => diagnostics);
        }
        catch (cause) {
            if (!child.stdin.destroyed)
                child.stdin.end();
            try {
                await boundedWait(exit, 30000, "Android workspace guardian did not settle after startup failure");
            }
            catch (cleanupFailure) {
                throw new AggregateError([cause, cleanupFailure], "Android workspace guardian startup and cleanup failed");
            }
            finally {
                releaseGuardianReferences(child);
            }
            throw cause;
        }
    }
    close() {
        this.#closing = true;
        this.#closePromise ??= this.#finish().catch((cause) => {
            this.#closePromise = undefined;
            throw cause;
        });
        return this.#closePromise;
    }
    async #finish() {
        if (!this.#child.stdin.destroyed)
            this.#child.stdin.end();
        let result;
        try {
            result = await boundedWait(this.#exit, 120000, `Android workspace guardian cleanup timed out for ${this.path}`);
        }
        catch (cause) {
            releaseGuardianReferences(this.#child);
            throw cause;
        }
        if (result.error !== undefined || result.code !== 0)
            throw new Error(`Android workspace guardian cleanup failed for ${this.path}: ${result.error?.message ?? result.code ?? result.signal ?? "unknown"}; ${this.#diagnostics()}`);
        try {
            await lstat(this.path);
        }
        catch (cause) {
            if (cause instanceof Error && "code" in cause && cause.code === "ENOENT")
                return;
            throw cause;
        }
        throw new Error(`Android workspace guardian exited but retained ${this.path}`);
    }
}
/** POSIX retains its in-process root; Windows keeps a detached native owner. */
export const createJadxWorkspaceRoot = (platform) => platform === "win32"
    ? WindowsJadxWorkspaceRoot.create()
    : PrivateRuntimeRoot.create({ prefix: "rea-android-" });
