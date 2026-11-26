import { catalogIdentityForToolFamilies, } from "../contracts/catalog/catalogIdentity.js";
import { toolFamilyId } from "../contracts/toolFamilies.js";
import { isToolFamilyAdvertised } from "../contracts/toolFamilyIds.js";
import { EvidenceMcpServerCore } from "./EvidenceMcpServerCore.js";
import { resolveMcpOutputSchemaProfile, COMPACT_INPUT_SCHEMA_PRESENTATION, } from "../contracts/mcpSchemaPresentation.js";
/** Canonical composition retains the constructor's existing identity defaults. */
export class EvidenceMcpServer extends EvidenceMcpServerCore {
    constructor(info, options, recordEvidence, delivery, compactPresentation = COMPACT_INPUT_SCHEMA_PRESENTATION, outputSchemaProfile = resolveMcpOutputSchemaProfile(undefined), identity, advertisedToolFamilies = undefined) {
        super(info, options, recordEvidence, delivery, compactPresentation, outputSchemaProfile, identity ??
            catalogIdentityForToolFamilies(compactPresentation, outputSchemaProfile, advertisedToolFamilies), advertisedToolFamilies);
    }
    /**
     * Out-of-scope tools stay registered but disabled: `tools/list` omits them
     * and calls fail with the SDK's disabled-tool error, so status reports
     * cannot direct agents to calls that always fail.
     */
    advertisesTool(name) {
        return isToolFamilyAdvertised(this.advertisedToolFamilies, toolFamilyId(name));
    }
}
