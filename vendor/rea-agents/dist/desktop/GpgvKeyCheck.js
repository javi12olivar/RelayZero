import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ArtifactResourceScope, assertArtifactReadActive, } from "../resources/index.js";
import { dearmorPublicKeys, isArmoredKey, validSignature, } from "../domain/desktop/aptRepositories.js";
import { verifyingKey } from "../domain/desktop/openPgpKeys.js";
import { PrivateRuntimeRoot } from "../process/PrivateRuntimeRoot.js";
import { readHostFile } from "./HostFileRead.js";
import { sha256Hex } from "../kernel/sha256Hex.js";
const FILE_MAX_BYTES = 1024 * 1024;
const released = (release) => release[0] ?? "its release file";
/** Runs gpgv on one candidate keyring at a time, written into a private folder it owns. */
class GpgvKeyCheck {
    runQuery;
    signal;
    #root;
    #keyrings = 0;
    #reads = new Map();
    constructor(runQuery, signal) {
        this.runQuery = runQuery;
        this.signal = signal;
    }
    /** The private folder, once a keyring was written into it. */
    get root() {
        return this.#root;
    }
    async #read(path) {
        const read = this.#reads.get(path) ??
            (await readHostFile(path, FILE_MAX_BYTES, this.signal));
        this.#reads.set(path, read);
        return read;
    }
    /** The first candidate key that verifies the release, or why none did. */
    async firstVerifying(candidates, release) {
        const unreadable = [];
        for (const path of candidates) {
            const bytes = await this.#read(path);
            if (bytes === "unreadable")
                unreadable.push(path);
            if (typeof bytes === "string")
                continue;
            const verified = await this.#verifying({ path, bytes }, release);
            if (verified !== undefined)
                return verified;
        }
        return {
            reason: `no candidate key (${candidates.join(", ")}) verifies ${released(release)}${unreadable.length === 0 ? "" : `; unreadable: ${unreadable.join(", ")}`}`,
        };
    }
    /** The key a sources entry holds when it verifies the release, or why not. */
    async heldVerifying(key, release) {
        return ((await this.#verifying(key, release)) ?? {
            reason: `the key the Signed-By field of ${key.path} holds does not verify ${released(release)}`,
        });
    }
    /** The key with the bytes to retain when it verifies the release, why it cannot count, or undefined when it does not verify. */
    async #verifying(key, release) {
        const signature = await this.#verify(key.bytes, release);
        if (signature === "missing")
            return {
                reason: "gpgv is not installed, so no key could be checked against the repository's signature",
            };
        if (signature === undefined)
            return undefined;
        const kept = verifyingKey(key.bytes, signature.primary);
        if (!kept.ok)
            return {
                reason: `${key.path} verifies ${released(release)}, but ${kept.error}`,
            };
        return {
            path: key.path,
            ...kept.value,
            sha256: sha256Hex(kept.value.bytes),
            fingerprint: signature.primary,
        };
    }
    /** The good signature gpgv reports with the key, whatever its exit status; `missing` without gpgv. */
    async #verify(key, release) {
        const keyring = isArmoredKey(key) ? dearmorPublicKeys(key) : key;
        if (keyring === undefined)
            return undefined;
        this.#root ??= await PrivateRuntimeRoot.create({ prefix: "rea-apt-keys-" });
        const path = join(this.#root.path, `keyring-${String(this.#keyrings)}.gpg`);
        this.#keyrings += 1;
        await writeFile(path, keyring, { mode: 0o600, flag: "wx" });
        const outcome = await this.runQuery("gpgv", [
            "--homedir",
            this.#root.path,
            "--status-fd",
            "1",
            "--keyring",
            path,
            ...release,
        ], this.signal);
        if (outcome === "missing")
            return "missing";
        return typeof outcome === "object"
            ? validSignature(outcome.stdout)
            : undefined;
    }
}
/** Use a gpgv key check, then remove its private folder; a failed removal keeps the folder's owner in the thrown cleanup failure. */
export const withGpgvKeyCheck = async (runQuery, signal, use) => {
    const check = new GpgvKeyCheck(runQuery, signal);
    let outcome;
    try {
        outcome = { kind: "completed", value: await use(check) };
    }
    catch (cause) {
        outcome = { kind: "failed", cause };
    }
    const root = check.root;
    if (root !== undefined) {
        const resources = new ArtifactResourceScope();
        const removed = await resources.release({
            kind: "private-runtime-root",
            resource: root.path,
            root,
        });
        if (removed.kind === "failed")
            throw resources.cleanupFailure(outcome, [removed]);
    }
    if (outcome.kind === "failed")
        throw outcome.cause;
    assertArtifactReadActive(signal);
    return outcome.value;
};
