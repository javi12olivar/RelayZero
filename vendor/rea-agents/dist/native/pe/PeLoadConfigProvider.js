import { projectPeBinaryFailure } from "./PeBinaryFailure.js";
import { projectArtifactCloseFailure, imageFileSizeRemediation, readStableArtifact, assertArtifactReadActive, ArtifactResourceScope, } from "../../resources/index.js";
import { fixedAllowanceOptions, } from "../../domain/fixedAllowanceRemediation.js";
import { MAX_INSPECT_PE_LOAD_CONFIG_FILE_BYTES, MAX_INSPECT_PE_LOAD_CONFIG_CALLBACKS, } from "../../domain/native/peLoadConfig.js";
import { err, ok } from "../../domain/result.js";
import { PE_LOAD_CONFIG_PROVIDER } from "../../domain/investigationProviders.js";
import { parsePeLoadConfig, PE_LOAD_CONFIG_LIMITS, } from "./PeLoadConfigParser.js";
const OPERATION = "inspect_pe_load_config";
/** Portable TLS/load-config reader over one bounded, identity-checked regular file. */
export class PeLoadConfigProvider {
    identity = PE_LOAD_CONFIG_PROVIDER;
    #resources = new ArtifactResourceScope();
    async close() {
        try {
            await this.#resources.close();
        }
        catch (cause) {
            throw projectArtifactCloseFailure(cause, PE_LOAD_CONFIG_PROVIDER.id, OPERATION);
        }
    }
    async inspect(input, options) {
        let snapshot;
        try {
            return await this.#resources.run(async () => {
                snapshot = await readStableArtifact(input.path, input.max_file_bytes, options?.signal, undefined, this.#resources);
                assertArtifactReadActive(options?.signal);
                const report = await parsePeLoadConfig(snapshot.bytes, {
                    path: input.path,
                    sha256: snapshot.sha256,
                    bytes: snapshot.bytes.length,
                }, input, options?.signal);
                assertArtifactReadActive(options?.signal);
                return ok(report);
            });
        }
        catch (cause) {
            return err(peLoadConfigFailure(cause, input, snapshot));
        }
    }
}
const limitRecovery = (limit, input, ceiling) => limit === "callbacks"
    ? {
        retryable: false,
        remediationAction: input.max_callbacks >= MAX_INSPECT_PE_LOAD_CONFIG_CALLBACKS
            ? `The image exceeds the ${String(MAX_INSPECT_PE_LOAD_CONFIG_CALLBACKS)}-callback ceiling; select a smaller artifact.`
            : `Raise max_callbacks above ${String(input.max_callbacks)} or select a smaller artifact.`,
    }
    : fixedAllowanceOptions("The PE structural decoding allowance", "parser", ceiling);
const peLoadConfigFailure = (cause, input, snapshot) => projectPeBinaryFailure(cause, input, {
    operation: OPERATION,
    providerId: PE_LOAD_CONFIG_PROVIDER.id,
    fileSizeRemediation: () => imageFileSizeRemediation(input.max_file_bytes, MAX_INSPECT_PE_LOAD_CONFIG_FILE_BYTES),
    limits: PE_LOAD_CONFIG_LIMITS,
    limitRecovery: (limit, ceiling) => limitRecovery(limit, input, ceiling),
}, snapshot);
