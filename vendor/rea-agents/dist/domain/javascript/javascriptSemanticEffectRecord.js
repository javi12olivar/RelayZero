/**
 * Storage of the opaque effects (`eval`, `Function`) recorded for one source.
 * Only this module and the effect log (javascriptSemanticEffectLog.ts) read
 * the recorded sites; the timing producer, which the effect log builds on,
 * asks the accessors below
 * (docs/adr/javascript/pushed-effect-invalidation.md).
 */
export const createSemanticOpaqueEffects = () => ({
    mayReferenceGlobalCode: false,
    sites: new WeakSet(),
    sloppySites: new WeakSet(),
    byScope: new Map(),
    children: new Map(),
    globalSites: [],
});
/** Source evidence, collected with declarations, that global code may run. */
export const recordSemanticGlobalCodeReference = (state) => {
    state.opaqueEffects.mayReferenceGlobalCode = true;
};
/** Whether the source contains a direct `eval` that may rebind names. */
export const semanticDirectEvalRecorded = (state) => state.opaqueEffects.byScope.size > 0;
/** Whether `node` is a recorded direct `eval` call. */
export const isSemanticDirectEvalSite = (node, state) => state.opaqueEffects.sites.has(node);
/**
 * Global-code sites (`eval`, `Function`) observed so far, in observation
 * order. The ambient walk appends while timing queries run, so a consumer
 * may keep its position in the list and read only later entries.
 */
export const semanticGlobalCodeSites = (state) => state.opaqueEffects.globalSites;
