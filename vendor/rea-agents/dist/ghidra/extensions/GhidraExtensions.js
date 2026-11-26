import { GhidraAdmissionError } from "../GhidraAdmissionError.js";
import { classifyProviderFailure } from "../../providers/classifyProviderFailure.js";
import { realpath, mkdir } from "node:fs/promises";
import { isAbsolute, join } from "node:path";
import { z } from "zod";
import { knownCoverageStatusSchema } from "../../domain/coverage.js";
import { AnalysisCapabilityUnavailableError, AnalysisUnsupportedTargetError, cancelledBy, } from "../../domain/analysisErrorCore.js";
import { assertArtifactReadActive, } from "../../resources/index.js";
import { readGhidraProfileArtifact, writeGhidraProfileArtifact, ghidraFileDialect, } from "../GhidraFileArtifacts.js";
import { jsonObjectSchema } from "../../domain/jsonValue.js";
import { err, ok } from "../../domain/result.js";
import { nativeAotAdapter } from "./nativeaot/NativeAotAdapter.js";
import { sha256Hex } from "../../kernel/sha256Hex.js";
import { BinaryReader } from "../../domain/binaryContainer.js";
import { ZIP_LOCAL_HEADER_SIGNATURE } from "../../domain/zip/zipLocalHeader.js";
const digest = z.string().regex(/^[a-f0-9]{64}$/u);
/** Exact executable extension artifact committed before the session starts. */
export const ghidraExtensionSchema = z.strictObject({
    id: z.string().regex(/^[a-z][a-z0-9\x2d]*$/u),
    path: z.string().refine(isAbsolute, "Extension path must be absolute"),
    configured_path: z
        .string()
        .refine(isAbsolute, "Extension path must be absolute"),
    sha256: digest,
    entry_class: z.string().min(1),
    integration_api: z.literal(1),
});
/** Shared extension envelope; each adapter validates its own producer result. */
export const ghidraExtensionResultSchema = z.strictObject({
    id: z.string().min(1),
    sha256: digest,
    status: z.enum([
        ...knownCoverageStatusSchema.options,
        "not_applicable",
        "unsupported",
        "failed",
    ]),
    reason: z.string().nullable(),
    result: jsonObjectSchema,
});
const adapters = [nativeAotAdapter];
const MAX_EXTENSION_BYTES = 8 * 1024 * 1024;
/** JAR framing belongs to the extension adapter; file lifecycle is shared. */
const readJar = (path, resources, signal) => readGhidraProfileArtifact(path, MAX_EXTENSION_BYTES, resources, signal, (bytes) => {
    if (bytes.length < 4 ||
        new BinaryReader(bytes, true, "jar").u32(0) !==
            ZIP_LOCAL_HEADER_SIGNATURE)
        throw new GhidraAdmissionError("not_jar", { path });
    return bytes;
});
/** Resolve explicitly configured optional extensions into the immutable analysis profile. */
export const resolveGhidraExtensions = async (config, target, platform, resources, signal) => resources
    .run(async () => {
    const extensions = [];
    for (const adapter of adapters) {
        if (signal?.aborted)
            return err(cancelledBy("open_binary", signal));
        const configured = adapter.configuredPath(config);
        if (configured === undefined)
            continue;
        const refusal = adapter.unsupportedReason(target, platform);
        if (refusal !== null)
            return err(extensionRefusalError(refusal, target));
        try {
            const path = await realpath(configured);
            const bytes = await readJar(path, resources, signal);
            extensions.push({
                id: adapter.id,
                path,
                configured_path: configured,
                sha256: sha256Hex(bytes),
                entry_class: adapter.entryClass,
                integration_api: 1,
            });
        }
        catch (cause) {
            return err(classifyProviderFailure(cause, ghidraFileDialect("resolve_analysis_profile", {
                extension: adapter.id,
                path: configured,
            })));
        }
    }
    if (signal?.aborted)
        return err(cancelledBy("open_binary", signal));
    return ok(extensions);
})
    .catch((cause) => err(classifyProviderFailure(cause, ghidraFileDialect("resolve_analysis_profile"))));
/** Require explicit local configuration before admitting executable code from a profile. */
export const validateGhidraExtensionProfile = (extensions, config, target, platform) => {
    const enabled = adapters.filter((adapter) => adapter.configuredPath(config) !== undefined);
    if (enabled.length !== extensions.length ||
        new Set(extensions.map((extension) => extension.id)).size !==
            extensions.length)
        return "Configured Ghidra extension inventory differs from the resolved analysis profile.";
    for (const extension of extensions) {
        const adapter = enabled.find((value) => value.id === extension.id);
        if (adapter === undefined ||
            adapter.entryClass !== extension.entry_class ||
            adapter.configuredPath(config) !== extension.configured_path)
            return `Ghidra extension profile lacks matching explicit local configuration: ${extension.id}`;
        const refusal = adapter.unsupportedReason(target, platform);
        if (refusal !== null)
            return refusal.reason;
    }
    return null;
};
/**
 * A deliberate host or target refusal is not an execution failure: retrying
 * cannot change it, and its reason already names the remedy.
 */
const extensionRefusalError = (refusal, target) => refusal.constraint === "host"
    ? new AnalysisCapabilityUnavailableError("ghidra", "resolve_analysis_profile", refusal.reason, { userMessage: refusal.reason })
    : new AnalysisUnsupportedTargetError("resolve_analysis_profile", target.path, refusal.reason, 
    // The reason names the workflows that remain available.
    { remediationAction: refusal.reason });
/** Snapshot committed extension bytes into the private runtime before Java loads them. */
export const snapshotGhidraExtensions = async (extensions, runtimeRoot, resources, signal) => resources
    .run(async () => {
    assertArtifactReadActive(signal);
    if (extensions.length === 0)
        return [];
    for (const extension of extensions) {
        ghidraExtensionSchema.parse(extension);
        const adapter = adapters.find((value) => value.id === extension.id);
        if (adapter === undefined ||
            adapter.entryClass !== extension.entry_class)
            throw new GhidraAdmissionError("unregistered", {
                id: extension.id,
            });
        if ((await realpath(extension.configured_path)) !== extension.path)
            throw new GhidraAdmissionError("path_differs", {
                id: extension.id,
            });
    }
    const directory = join(runtimeRoot, "extensions");
    await mkdir(directory, { mode: 0o700 });
    const result = [];
    for (const extension of extensions) {
        const bytes = await readJar(extension.path, resources, signal);
        if (sha256Hex(bytes) !== extension.sha256)
            throw new GhidraAdmissionError("digest_differs", {
                id: extension.id,
                path: extension.path,
            });
        const path = join(directory, `${extension.id}.jar`);
        await writeGhidraProfileArtifact(path, bytes, resources, signal);
        result.push({ ...extension, path });
    }
    return result;
})
    .catch((cause) => {
    throw classifyProviderFailure(cause, ghidraFileDialect("open_binary"));
});
/** Require every configured producer result to match its artifact and registered ABI. */
export const validateGhidraExtensionResults = (expected, results) => {
    if (results.length !== expected.length ||
        new Set(results.map((result) => result.id)).size !== results.length)
        return "Ghidra extension result inventory differs from its committed profile.";
    for (const extension of expected) {
        const result = results.find((value) => value.id === extension.id);
        const adapter = adapters.find((value) => value.id === extension.id);
        if (result === undefined ||
            adapter === undefined ||
            result.sha256 !== extension.sha256)
            return `Ghidra extension identity mismatch: ${extension.id}`;
        const invalid = adapter.validate(result);
        if (invalid !== null)
            return invalid;
    }
    return null;
};
/** Exact adapter limitations for explicitly configured session extensions. */
export const ghidraExtensionLimitations = (extensions) => adapters
    .filter((adapter) => extensions.some((extension) => extension.id === adapter.id))
    .flatMap((adapter) => adapter.limitations);
