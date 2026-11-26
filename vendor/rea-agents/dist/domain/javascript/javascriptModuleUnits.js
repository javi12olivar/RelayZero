/** Export declarations retain graph identity but are not independently loaded modules. */
export const isJavaScriptModuleUnit = (node) => (node.kind === "javascript-asset" ||
    node.kind === "javascript-module" ||
    node.kind === "source-module") &&
    !node.observations.some(({ properties }) => properties.semantic_role === "export-binding");
/** Historical source units can retain the javascript-module graph kind. */
export const isJavaScriptSourceModule = (node) => node.kind === "source-module" ||
    node.observations.some(({ properties }) => properties.semantic_role === "source-module");
