import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { ArtifactResourceScope, ArtifactResourceRetryFailure, bindArtifactFileCleanup, } from "../../resources/index.js";
import { AnalysisInputError, cancelledBy, } from "../../domain/analysisErrorCore.js";
import { buildSecretHandleSchema, isScannableSecret, MAX_SETTING_CHARACTERS, redactSecrets, redactSecretsInJson, } from "../../domain/desktop/buildSecrets.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { err, ok } from "../../domain/result.js";
import { compositeKey } from "../../domain/unicodeCodePointOrder.js";
import { AGENTENV_PROVIDER } from "../../desktop/AgentEnvProviderIdentity.js";
import { listBuildSecretHandles, readBuildSecretFile, writeBuildSecretFile, } from "../../desktop/BuildSecretFiles.js";
const ACT = "act_on_build_computer";
/** How many handles a withheld file may take, its own and those numbered after it, each within a handle's 63 characters. */
const MAX_KEPT_HANDLES = 99;
/** The secrets one REA server types, kept only in memory so results, logs and records can show their handles instead. */
export class DesktopBuildSecrets {
    directory;
    /** Every value each handle named while this server ran, an earlier one still held by the app after the person changed it. */
    #seen = new Map();
    #resources = new ArtifactResourceScope();
    #hasDeclaredSecret = false;
    constructor(directory) {
        this.directory = directory;
    }
    #cleanupFailure(cause) {
        const error = new ProviderAdapterError(AGENTENV_PROVIDER, "build_secret_file", {
            userMessage: "Could not clean up retained build secret files.",
            cleanup: {
                reason: "Secret file cleanup failed.",
                resources: cause.cleanup?.resources ?? [],
            },
        });
        bindArtifactFileCleanup(cause, error);
        return error;
    }
    async #run(operation) {
        try {
            return await this.#resources.run(operation);
        }
        catch (cause) {
            if (cause instanceof ArtifactResourceRetryFailure)
                throw this.#cleanupFailure(cause);
            throw cause;
        }
    }
    /** A handle's value, read afresh from its file, a setting's up to a withheld file's size, even empty; a refusal names the file, never its text. */
    async resolve(handle, use = "typed") {
        let read;
        try {
            read = await this.#run(() => readBuildSecretFile(this.directory, handle, {
                ...(use === "setting"
                    ? { maxCharacters: MAX_SETTING_CHARACTERS, minCharacters: 0 }
                    : {}),
                resources: this.#resources,
                onCloseFailureValue: (value) => this.#remember(handle, value),
            }));
        }
        catch (cause) {
            if (cause instanceof AnalysisError)
                return err(cause);
            throw cause;
        }
        if (read.ok)
            this.#remember(handle, read.value);
        return read;
    }
    /** Keep a withheld file's bytes, in base64, for a witness to supply, as a secret of their own: `handle`, or the first `handle-<n>` that holds no other value, never replacing one; the handle that keeps them. */
    async keep(handle, bytes) {
        const value = bytes.toString("base64");
        for (let count = 1; count <= MAX_KEPT_HANDLES; count += 1) {
            const candidate = count === 1 ? handle : `${handle}-${String(count)}`;
            if (!buildSecretHandleSchema.safeParse(candidate).success)
                break;
            let written;
            try {
                written = await this.#run(() => writeBuildSecretFile(this.directory, candidate, value, this.#resources));
            }
            catch (cause) {
                this.#remember(candidate, value);
                throw cause;
            }
            if (written) {
                this.#remember(candidate, value);
                return candidate;
            }
            const held = await this.resolve(candidate, "setting");
            if (!held.ok && held.error instanceof AnalysisError)
                throw held.error;
            if (held.ok && held.value === value)
                return candidate;
        }
        throw new ProviderAdapterError(AGENTENV_PROVIDER, "build_secret_file", {
            userMessage: `REA has no handle free to keep a withheld file as, from ${handle} on, in ${this.directory}.`,
            remediationAction: "Ask the person to delete the secret files of builds they no longer witness, then export again.",
        });
    }
    async close() {
        try {
            await this.#resources.close();
        }
        catch (cause) {
            if (cause instanceof ArtifactResourceRetryFailure)
                throw this.#cleanupFailure(cause);
            throw cause;
        }
    }
    #remember(handle, value) {
        this.#hasDeclaredSecret = true;
        if (!isScannableSecret(value))
            return;
        const values = this.#seen.get(handle) ?? new Set();
        values.add(value);
        this.#seen.set(handle, values);
    }
    /** Whether this server has used or kept any explicitly declared secret. */
    get hasDeclaredSecret() {
        return this.#hasDeclaredSecret;
    }
    #known() {
        return [...this.#seen].flatMap(([handle, values]) => [...values].map((value) => ({ handle, value })));
    }
    /** Text with each known secret's value replaced by its handle. */
    redact = (text) => this.#seen.size === 0 ? text : redactSecrets(text, this.#known());
    /** A JSON value redacted as `redact` redacts text. */
    redactJson = (value) => redactSecretsInJson(value, this.#known());
    /** Every secret no bundle may hold: each value typed or kept here, then each the folder holds now, readable by others or not. */
    async all(signal) {
        if (signal?.aborted)
            throw cancelledBy("export_build_environment", signal);
        let handles;
        try {
            handles = await listBuildSecretHandles(this.directory);
        }
        catch (cause) {
            throw new AnalysisInputError("export_build_environment", {
                userMessage: `REA cannot check the declared secrets in ${this.directory}.`,
                remediationAction: "Make the secrets folder readable and retry the export.",
                cause,
            });
        }
        const read = [];
        for (const handle of handles)
            read.push({
                handle,
                file: await this.#run(() => readBuildSecretFile(this.directory, handle, {
                    searchOnly: true,
                    maxCharacters: MAX_SETTING_CHARACTERS,
                    minCharacters: 0,
                    resources: this.#resources,
                    ...(signal === undefined ? {} : { signal }),
                    onCloseFailureValue: (value) => this.#remember(handle, value),
                })),
            });
        if (signal?.aborted)
            throw cancelledBy("export_build_environment", signal);
        const refused = read.find(({ file }) => !file.ok);
        if (refused !== undefined && !refused.file.ok)
            throw new AnalysisInputError("export_build_environment", {
                userMessage: `REA cannot check the declared secret ${refused.handle}: ${refused.file.error}`,
                remediationAction: "Repair or remove the secret file, then retry the export.",
            });
        const known = this.#known();
        const held = new Set(known.map(({ handle, value }) => compositeKey([handle, value])));
        return [
            ...known,
            ...read.flatMap(({ handle, file }) => file.ok &&
                isScannableSecret(file.value) &&
                !held.has(compositeKey([handle, file.value]))
                ? [{ handle, value: file.value }]
                : []),
        ];
    }
}
/** Why a secret was not typed, in REA's words and without its cause: the computer's own could quote the secret. */
const notTyped = (handle, signal) => signal.aborted
    ? cancelledBy(ACT, signal)
    : new ProviderAdapterError(AGENTENV_PROVIDER, ACT, {
        userMessage: `The computer did not type the secret ${handle}; REA does not show its answer, which could quote the secret.`,
        remediationAction: "Take a screenshot to see where the focus is, click into the field, and type the secret again; if it fails again, ask the person to check that the secret's file holds only characters a keyboard types.",
    });
/** What a driver's answer to a typed secret may show: whether and how it was delivered, never its own words. */
const delivered = (handle, structured) => ({
    summary: `Typed the secret ${handle}`,
    ...Object.fromEntries(["applied", "delivery", "others_since_frame"].flatMap((field) => {
        const value = structured?.[field];
        return value === undefined ? [] : [[field, value]];
    })),
});
/** Type the secret `handle` names into the focused field; neither the result nor a refusal carries its value or the computer's words. */
export const typeSecret = async (secrets, computer, handle, signal) => {
    const refusal = (outcome, error) => ({
        outcome,
        answer: () => err(error),
    });
    const value = await secrets.resolve(handle);
    if (!value.ok)
        return refusal("refused", value.error instanceof AnalysisError
            ? value.error
            : new AnalysisInputError(ACT, {
                userMessage: `REA did not type the secret ${handle}: ${value.error}`,
                remediationAction: `Ask the person to write the secret, and nothing else, in ${secrets.directory}/${handle} on this host, readable only by them (chmod 600), then type it again. Never ask for the secret itself.`,
                conformsToInputContract: true,
            }));
    let answer;
    try {
        answer = await computer.callTool("computer_type", { text: value.value }, signal);
    }
    catch {
        return refusal("failed", notTyped(handle, signal));
    }
    if (answer.isError)
        return refusal("refused", notTyped(handle, signal));
    const result = delivered(handle, answer.structured);
    return {
        outcome: "applied",
        answer: (computerId, actionIndex) => ok({
            value: {
                computer_id: computerId,
                action: "type_secret",
                action_index: actionIndex,
                result,
            },
            content: [{ type: "text", text: `${String(result.summary)}.` }],
        }),
    };
};
/** Each variable a bundle's withheld settings read, from the secret its handle names; refused, naming the variable, when one cannot be read. */
export const settingsEnvironment = async (secrets, source) => {
    const values = {};
    const named = source.kind === "bundle" ? (source.settings ?? {}) : {};
    for (const [variable, handle] of Object.entries(named)) {
        const value = await secrets.resolve(handle, "setting");
        if (!value.ok)
            return err(value.error instanceof AnalysisError
                ? value.error
                : new AnalysisInputError("start_build_computer", {
                    userMessage: `REA cannot supply ${variable}: ${value.error}`,
                    remediationAction: "Name the handle the export's withheld_files gives, or ask the person to write the value, the file's bytes in base64, in that secret's file.",
                    conformsToInputContract: true,
                }));
        values[variable] = value.value;
    }
    return ok(values);
};
