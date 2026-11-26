import { isRecord } from "../kernel/isRecord.js";
/**
 * Return the JSON parsing view of retained source-map text. ECMA-426 permits
 * HTTP responses to start with `)]}'`; the first line is transport framing.
 * Keep the original text for artifact identity and Evidence provenance.
 * https://tc39.es/ecma426/#sec-fetchsourcemap
 */
export const sourceMapJsonText = (text) => {
    const withoutBom = text.replace(/^\uFEFF/u, "");
    if (!withoutBom.startsWith(")]}'"))
        return withoutBom;
    const newline = withoutBom.search(/[\r\n]/u);
    return newline === -1 ? "" : withoutBom.slice(newline);
};
/** Classify section ownership once; an external URL takes precedence over map. */
export const classifySourceMapSection = (section) => {
    if (!isRecord(section))
        return {
            kind: "invalid",
            reason: "Indexed source-map section must be an object.",
        };
    if (Object.prototype.hasOwnProperty.call(section, "url"))
        return typeof section.url === "string"
            ? { kind: "external", url: section.url }
            : {
                kind: "invalid",
                reason: "External source-map section URL must be a string.",
            };
    if (!isRecord(section.map))
        return {
            kind: "invalid",
            reason: "Indexed source-map section requires an embedded map or external URL.",
        };
    if (!isVersion3Map(section.map))
        return {
            kind: "invalid",
            reason: "Indexed source-map section map is not a version 3 map.",
        };
    return { kind: "embedded", map: section.map };
};
/** A present `sections` member must be an array in every source-map consumer. */
export const classifySourceMapSections = (map) => {
    if (!isRecord(map))
        return { kind: "invalid", reason: "Source map must be an object." };
    if (!Object.prototype.hasOwnProperty.call(map, "sections"))
        return { kind: "regular" };
    return Array.isArray(map.sections)
        ? { kind: "indexed", sections: map.sections }
        : {
            kind: "invalid",
            reason: "Indexed source-map sections must be an array.",
        };
};
/** Whether a parsed value has the version-3 map shape. */
export const isVersion3Map = (value) => isRecord(value) && value.version === 3;
