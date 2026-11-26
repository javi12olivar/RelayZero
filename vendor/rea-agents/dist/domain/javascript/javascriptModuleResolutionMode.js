import { posix } from "node:path";
/** JSON dispatch uses the exact loader filename, not the inventory's folded kind. */
export const isJsonModuleTarget = (path, kind) => posix.extname(path) === ".json" &&
    (kind === "json" || kind === "package-json");
/** Native-addon dispatch likewise needs the exact `.node` loader suffix. */
export const isNativeAddonModuleTarget = (path, kind) => posix.extname(path) === ".node" && kind === "native-addon";
/** Exact loader suffixes are separate from case-folded artifact grammar. */
export const explicitJavaScriptLoaderMode = (path) => {
    switch (path === undefined ? undefined : posix.extname(path)) {
        case ".mjs":
        case ".mts":
            return "module";
        case ".cjs":
        case ".cts":
            return "commonjs";
        default:
            return undefined;
    }
};
/** Case variants are artifact syntax hints, not recognized loader suffixes. */
export const hasCaseVariantJavaScriptLoaderSuffix = (path) => {
    if (path === undefined)
        return false;
    const suffix = /\.(?:js|ts|mjs|cjs|mts|cts)$/iu.exec(path)?.[0];
    return suffix !== undefined && suffix !== suffix.toLowerCase();
};
/** Derive source mode only when syntax or an explicit source format owns it. */
export const moduleResolutionModeForJavaScriptReference = (sourcePath, referenceKind, explicitMode) => {
    if (explicitMode !== undefined)
        return explicitMode;
    if (referenceKind === "require")
        return "require";
    if (referenceKind === "dynamic-import")
        return "import";
    const loaderMode = explicitJavaScriptLoaderMode(sourcePath);
    if (loaderMode !== undefined)
        return loaderMode === "commonjs" ? "require" : "import";
    const extension = posix.extname(sourcePath).toLowerCase();
    if (extension === ".ts" || extension === ".tsx")
        return "compiler-dependent";
    return "import";
};
