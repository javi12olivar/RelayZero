/**
 * Package URL encoding for one type. Slashes separate Go module path segments
 * and stay literal. Every other octet outside the URL unreserved set is
 * percent-encoded as uppercase hex. A Go namespace and name are lowercased.
 */
const isUnreserved = (code) => (code >= 0x41 && code <= 0x5a) ||
    (code >= 0x61 && code <= 0x7a) ||
    (code >= 0x30 && code <= 0x39) ||
    code === 0x2d ||
    code === 0x2e ||
    code === 0x5f ||
    code === 0x7e;
/** Percent-encode one Package URL name, namespace segment, or version. */
export const encodePackageUrlComponent = (value) => {
    let encoded = "";
    for (const character of value) {
        if (character.length === 1 && isUnreserved(character.charCodeAt(0))) {
            encoded += character;
            continue;
        }
        for (const byte of Buffer.from(character, "utf8"))
            encoded += `%${byte.toString(16).toUpperCase().padStart(2, "0")}`;
    }
    return encoded;
};
/** Encode a slash-separated namespace, leaving the separators in place. */
export const encodePackageUrlNamespace = (value) => value.split("/").map(encodePackageUrlComponent).join("/");
/** Length of the encoded text, counted without building it. */
const encodedBytes = (value, keepSlashes) => {
    let bytes = 0;
    for (const character of value) {
        const code = character.codePointAt(0) ?? 0;
        bytes +=
            isUnreserved(code) || (keepSlashes && code === 0x2f)
                ? 1
                : 3 * Buffer.byteLength(character, "utf8");
    }
    return bytes;
};
/** Length of `formatPackageUrl`, so a caller can bound it before building it. */
export const packageUrlBytes = (type, name, version) => {
    const golang = type === "golang";
    return (`pkg:${type}/`.length +
        encodedBytes(golang ? name.toLowerCase() : name, golang) +
        (version.length === 0 ? 0 : 1 + encodedBytes(version, false)));
};
/** `pkg:<type>/<name>@<version>`, omitting `@` when the version is empty. */
export const formatPackageUrl = (type, name, version) => {
    if (name.length === 0)
        throw new TypeError("A Package URL requires a name.");
    const encoded = type === "golang"
        ? encodePackageUrlNamespace(name.toLowerCase())
        : encodePackageUrlComponent(name);
    const versionSuffix = version.length === 0 ? "" : `@${encodePackageUrlComponent(version)}`;
    return `pkg:${type}/${encoded}${versionSuffix}`;
};
/** Go module Package URL. The namespace and name are lowercased. */
export const golangPackageUrl = (modulePath, version) => formatPackageUrl("golang", modulePath, version);
/** Package URL for one Cargo crate name and version. `/` is not a separator. */
export const cargoPackageUrl = (name, version) => formatPackageUrl("cargo", name, version);
