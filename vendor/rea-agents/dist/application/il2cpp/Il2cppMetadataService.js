import { parseAnalysisInput } from "../AnalysisInput.js";
import { analysisErrorWithCleanupDependencies } from "../../domain/analysisErrorCleanup.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
import { requireAnalysisViewRetention, summarizeRetainedAnalysis, } from "../analysisView/AnalysisViewService.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { AnalysisInputError, AnalysisOutputError, cancelledBy, isAborted, } from "../../domain/analysisErrorCore.js";
import { createEvidence } from "../../domain/evidence.js";
import { il2cppMetadataSchema, inspectIl2cppMetadataInputSchema, } from "../../domain/il2cpp/il2cppMetadata.js";
import { err, ok } from "../../domain/result.js";
import { errorMessage } from "../../kernel/errorMessage.js";
const OPERATION = "inspect_il2cpp_metadata";
const NO_RETENTION = {
    evidenceById: undefined,
    recordEvidence: undefined,
};
/** Shared exact input validation, artifact-bound Evidence and summary delivery for CLI and MCP. */
export class Il2cppMetadataService {
    provider;
    seeds;
    constructor(provider, seeds) {
        this.provider = provider;
        this.seeds = seeds;
    }
    async close() {
        let failure;
        for (const close of [
            () => this.provider.close(),
            () => this.seeds?.close(),
        ]) {
            try {
                await close();
            }
            catch (cause) {
                const next = cause instanceof AnalysisError
                    ? cause
                    : new ProviderCleanupError(this.provider.identity.id, [], {
                        reason: errorMessage(cause),
                    }, { cause, operation: OPERATION });
                failure =
                    failure === undefined
                        ? next
                        : analysisErrorWithCleanupDependencies(failure, next, OPERATION);
            }
        }
        if (failure !== undefined)
            throw failure;
    }
    inspect(rawInput, options, retention = NO_RETENTION) {
        return this.#inspect(rawInput, options, retention);
    }
    /** Explicit output workflow for CLI/SDK callers; ordinary inspection stays read-only. */
    inspectWithGhidraSeeds(rawInput, output, options) {
        return this.#inspect(rawInput, options, NO_RETENTION, output);
    }
    /** Inspect one explicitly selected file; detail changes delivery, not decoded coverage. */
    async #inspect(rawInput, options, retention, output) {
        const input = parseAnalysisInput(OPERATION, rawInput, inspectIl2cppMetadataInputSchema, options?.signal);
        if (!input.ok)
            return input;
        if (output !== undefined) {
            if (input.value.binary_path === undefined)
                return err(new AnalysisInputError(OPERATION, undefined, [
                    {
                        path: ["ghidra_seeds"],
                        reason: "invalid_value",
                        message: "Ghidra seed output links method addresses in binary_path.",
                    },
                ]));
            if (this.seeds === undefined)
                return err(new AnalysisOutputError(OPERATION, "No seed output adapter is configured."));
            const ready = await this.seeds.check(output, options);
            if (!ready.ok)
                return ready;
        }
        const { detail, ...providerInput } = input.value;
        if (detail === "summary") {
            const ready = requireAnalysisViewRetention(OPERATION, retention);
            if (!ready.ok)
                return ready;
        }
        const inspected = await this.provider.inspect(providerInput, options);
        if (!inspected.ok)
            return inspected;
        const report = il2cppMetadataSchema.safeParse(inspected.value);
        if (!report.success ||
            report.data.artifact.path !== providerInput.path ||
            (report.data.binary?.artifact.path ?? undefined) !==
                providerInput.binary_path ||
            (providerInput.binary_architecture !== undefined &&
                report.data.binary?.architecture !== providerInput.binary_architecture))
            return err(new AnalysisOutputError(OPERATION, "IL2CPP metadata reader returned malformed metadata or changed the selected artifact identity."));
        const value = report.data;
        const evidence = this.#evidence(value, providerInput, output);
        let seedReceipt;
        const cancelled = (signal) => err(cancelledBy(OPERATION, signal, {
            partialObservation: evidence,
            ...(seedReceipt === undefined
                ? {}
                : { diagnostics: { published_seed_output: { ...seedReceipt } } }),
        }));
        if (isAborted(options?.signal))
            return cancelled(options.signal);
        if (output !== undefined && this.seeds !== undefined) {
            const written = await this.seeds.write(value, output, options);
            if (!written.ok) {
                written.error.retainPartialObservation(evidence);
                return written;
            }
            seedReceipt = written.value;
        }
        if (isAborted(options?.signal))
            return cancelled(options.signal);
        return detail === "summary"
            ? summarizeRetainedAnalysis(evidence, retention)
            : ok(evidence);
    }
    #evidence(value, providerInput, output) {
        return createEvidence({
            path: value.artifact.path,
            sha256: value.artifact.sha256,
            format: "file",
        }, this.provider.identity, {
            operation: OPERATION,
            parameters: {
                ...Object.fromEntries(Object.entries(providerInput).filter(([, value]) => value !== undefined)),
                ...(output === undefined
                    ? {}
                    : {
                        ghidra_seeds: output.path,
                        ...(output.base === undefined
                            ? {}
                            : { seed_base: output.base }),
                    }),
            },
            result: value,
            confidence: value.binary === null
                ? "observed"
                : value.binary.code_gen_modules_field === null ||
                    value.binary.types_field === null
                    ? "inferred"
                    : "derived",
            limitations: value.limitations,
            locations: [
                { kind: "artifact-path", path: value.artifact.path },
                ...(value.binary === null
                    ? []
                    : [
                        {
                            kind: "artifact-path",
                            path: value.binary.artifact.path,
                        },
                    ]),
                ...value.sections
                    .filter(({ name, size }) => size > 0 &&
                    (name === "images" ||
                        name === "typeDefinitions" ||
                        name === "methods" ||
                        name === "nestedTypes" ||
                        name === "strings" ||
                        name === "fields" ||
                        name === "properties" ||
                        name === "events" ||
                        name === "parameters" ||
                        name === "stringLiterals" ||
                        name === "stringLiteralData"))
                    .map(({ offset, size }) => ({
                    kind: "file-offset-range",
                    start: offset,
                    end: offset + size,
                })),
            ],
        });
    }
}
