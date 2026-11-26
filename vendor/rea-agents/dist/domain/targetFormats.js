import { ZIP_PACKAGE_FORMATS, } from "./zipPackageFormat.js";
/** Canonical classification of resolved binary targets. */
export const BINARY_TARGET_FORMAT_KINDS = {
    "analysis-database": "database",
    "mach-o": "executable",
    "mach-o-universal": "executable",
    elf: "executable",
    pe: "executable",
    "dos-mz": "executable",
    "dos-com": "executable",
    "raw-binary": "executable",
    "gamecube-dol": "executable",
    ...Object.fromEntries(ZIP_PACKAGE_FORMATS.map((format) => [format, "archive"])),
    asar: "archive",
    ines: "archive",
    "godot-pck": "archive",
    unityfs: "archive",
    wxapkg: "archive",
    uimage: "archive",
    "android-boot-image": "archive",
    "android-ota-payload": "archive",
    dmg: "archive",
    pkg: "archive",
    "intel-hex": "archive",
    srec: "archive",
    "esp-image": "archive",
    uf2: "archive",
    dfuse: "archive",
    "esp-flash-image": "archive",
    fit: "archive",
    "ntfs-mft": "archive",
    plist: "artifact",
    javascript: "artifact",
    uefi: "artifact",
    "source-map": "artifact",
};
export const BINARY_TARGET_FORMATS = Object.keys(BINARY_TARGET_FORMAT_KINDS);
export const targetFormatsOfKind = (kind) => BINARY_TARGET_FORMATS.filter((format) => BINARY_TARGET_FORMAT_KINDS[format] === kind);
/** Formats for which the caller may select the interpretation explicitly. */
export const TARGET_FORMAT_HINTS = [
    "dos-com",
    "raw-binary",
    "gamecube-dol",
    "esp-flash-image",
];
