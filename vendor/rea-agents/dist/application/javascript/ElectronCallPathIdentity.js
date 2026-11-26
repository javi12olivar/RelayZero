import { digestCanonicalValue } from "../../domain/canonicalDigest.js";
/** Keep wrapper-path identity source-scoped across both graph projections. */
export const electronCallPathId = (filePath, path) => digestCanonicalValue([filePath, path], "Electron call path");
