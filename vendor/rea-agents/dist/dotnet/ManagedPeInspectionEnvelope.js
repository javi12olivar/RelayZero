import { managedTableRowCounts, unresolvedModuleMetadata, } from "../domain/managed/managedMetadataInventory.js";
import { managedModuleRow } from "../domain/managed/managedModuleIdentity.js";
/** Shared artifact and token identity facts for successful managed PE projections. */
export const managedPeInspectionEnvelope = (target, byteLength, layout, identity, issues) => {
    const { module } = identity;
    const metadata = {
        status: issues.length === 0 ? "complete" : "partial",
        version: layout.version,
        table_row_counts: managedTableRowCounts(layout),
        ...unresolvedModuleMetadata(identity),
    };
    return {
        artifact: {
            path: target.path,
            sha256: target.sha256,
            byte_length: byteLength,
            format: "pe",
        },
        module,
        metadata,
        identity_scope: {
            token_identity: "build-local",
            requires_artifact_sha256: target.sha256,
            requires_mvid: managedModuleRow({ module, metadata })?.mvid ?? null,
        },
    };
};
