/** Effects with every possibility off except idempotence, plus the overrides. */
export const toolEffects = (overrides = {}) => ({
    mutatesTarget: false,
    mutatesSession: false,
    writesFilesystem: false,
    launchesProcess: false,
    accessesNetwork: false,
    changesUiState: false,
    mayDiscardData: false,
    executesForeignCode: false,
    mutatesDevice: false,
    idempotent: true,
    ...overrides,
});
/** Records Evidence in the session and nothing else. */
export const evidenceEffects = toolEffects({ mutatesSession: true });
/** Records Evidence and launches a pinned native helper. */
export const nativeEvidenceEffects = toolEffects({
    mutatesSession: true,
    launchesProcess: true,
});
/** Records Evidence and reaches the network through a browser. */
export const browserEvidenceEffects = toolEffects({
    mutatesSession: true,
    accessesNetwork: true,
});
/** Keep provider-neutral effects with the additions possible across profiles. */
export const providerEffects = (session, global) => ({ session, global });
/** Global possibility across supported provider paths; sessions compose their selected descriptor. */
export const providerRemoteEffects = {
    launchesProcess: true,
    writesFilesystem: true,
    accessesNetwork: true,
};
export const providerNetworkEvidenceEffects = providerEffects(evidenceEffects, providerRemoteEffects);
export const providerUiNetworkEvidenceEffects = providerEffects(evidenceEffects, {
    ...providerRemoteEffects,
    changesUiState: true,
});
/** Derive MCP annotations without tool-name or tool-family heuristics. */
export const annotationsFromEffects = (value) => ({
    readOnlyHint: !(value.mutatesTarget ||
        value.mutatesSession ||
        value.writesFilesystem ||
        value.launchesProcess ||
        value.accessesNetwork ||
        value.changesUiState ||
        value.mayDiscardData ||
        value.executesForeignCode ||
        value.mutatesDevice),
    // MCP defines destructive as possibly non-additive changes to the
    // environment. Running foreign code or changing a device cannot be bounded
    // to additive effects, so either one is destructive even without data loss.
    destructiveHint: value.mayDiscardData || value.executesForeignCode || value.mutatesDevice,
    idempotentHint: value.idempotent,
    openWorldHint: value.launchesProcess || value.accessesNetwork,
});
/**
 * Tools whose results, successful or failed, carry only REA-authored session
 * state or caller-supplied values, never text originating from an analysis
 * target, a provider, a launcher or a device. Every other tool can return
 * such text (strings, symbols, code, page text, scripts, captures, logs, file
 * listings, provider diagnostics or captured process output), so a newly
 * added tool is marked untrusted until it is audited into this set. A tool
 * stays out when any error path can project external process output, as
 * close_binary (provider cleanup diagnostics), binary_session (provider
 * failure reasons and availability diagnostics) and the adb and apktool
 * client probes (version output and stderr excerpts) can.
 */
const TARGET_CONTENT_FREE_TOOLS = new Set([
    "inspect_analysis_settings",
    "update_analysis_settings",
    "export_evidence_bundle",
    "search_guidance",
    "read_guidance_section",
    "guided_workflows",
    "record_unknown",
]);
/**
 * Whether results of the named tool, successful or failed, can carry text that
 * originates from the analysis target. Unknown names are treated as target
 * content so an unaudited path never loses the untrusted marker.
 */
export const toolReturnsTargetContent = (name) => !TARGET_CONTENT_FREE_TOOLS.has(name);
/**
 * Resolve the metadata for one public tool from the effect audit its contract
 * declares. `effects` covers every supported provider profile; `sessionEffects`
 * are the effects the tool owns before composing the selected provider.
 */
export const toolContractMetadata = (name, audit) => {
    const sessionEffects = "session" in audit ? audit.session : audit;
    const effects = "session" in audit
        ? toolEffects({ ...audit.session, ...audit.global })
        : audit;
    return {
        title: name
            .split("_")
            .map((word) => word[0]?.toUpperCase() + word.slice(1))
            .join(" "),
        effects,
        sessionEffects,
        annotations: annotationsFromEffects(effects),
        returnsTargetContent: toolReturnsTargetContent(name),
    };
};
