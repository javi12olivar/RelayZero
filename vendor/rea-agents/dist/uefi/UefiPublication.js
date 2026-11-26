import { sha256Hex } from "../kernel/sha256Hex.js";
import { join } from "node:path";
import { Readable } from "node:stream";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, SafeOutputTree, SafeOutputTreeCreationFailure, } from "../resources/index.js";
import { analysisErrorWithCleanupDependencies } from "../domain/analysisErrorCleanup.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { uefiFailureDialect } from "./UefiFailures.js";
import { classifyProviderFailure } from "../providers/classifyProviderFailure.js";
import { UEFI_PROVIDER_IDENTITY } from "./UefiProviderIdentity.js";
/**
 * Publish extraction payloads through the SafeOutputTree contract: absent
 * output directory, exclusive creation, digest-verified writes, commit or
 * rollback. No executable bits are ever set by the tree.
 */
export const publishUefiFiles = async (context) => {
    let tree;
    let result;
    const files = [];
    try {
        context.checkpoint();
        tree = await SafeOutputTree.create(context.outputDirectory);
        for (const entry of context.entries) {
            context.checkpoint();
            const sha256 = sha256Hex(entry.bytes);
            const written = await tree.write(entry.relativePath, Readable.from([entry.bytes]), { sha256, bytes: entry.bytes.length }, context.signal);
            files.push({
                ...entry.facts,
                relative_path: written.relativePath,
                path: join(tree.outputRoot, written.relativePath),
                size: written.bytesWritten,
                sha256: written.sha256,
            });
        }
        result = context.buildResult(tree.outputRoot, files);
        context.checkpoint();
        await tree.commit(context.signal);
        return { result };
    }
    catch (cause) {
        if (cause instanceof SafeOutputTreeCreationFailure)
            tree = cause.tree;
        const primary = classifyProviderFailure(cause, uefiFailureDialect(context.operation, context.outputDirectory));
        if (tree === undefined)
            throw primary;
        const ownedTree = tree;
        const lease = new AnalysisCleanupLease(async () => {
            await ownedTree.rollback();
        }, [ownedTree.outputRoot]);
        if (primary.cleanupIncomplete)
            lease.bindCleanupError(primary);
        const released = await context.resources.release({
            kind: "lease",
            resource: ownedTree.outputRoot,
            lease,
        });
        if (released.kind === "released") {
            if (tree.published && result !== undefined)
                return { result };
            throw primary;
        }
        const cleanup = new ProviderCleanupError(UEFI_PROVIDER_IDENTITY.id, [tree.outputRoot], { reason: String(released.cause) }, { cause: released.cause, operation: context.operation });
        new AnalysisCleanupLeaseGroup(cleanup, [released.lease]);
        const failure = analysisErrorWithCleanupDependencies(primary, cleanup, context.operation);
        if (tree.published && result !== undefined)
            return { result, failure };
        throw failure;
    }
};
