import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ZIP_PACKAGE_FORMATS, init_zipPackageFormat } from "./canonicalOrdering-C7Yzy62j.js";

//#region dist/domain/targetFormats.js
var BINARY_TARGET_FORMAT_KINDS, BINARY_TARGET_FORMATS, targetFormatsOfKind, TARGET_FORMAT_HINTS;
function init_targetFormats() {
	return (init_targetFormats = __esmMin((() => {
		init_zipPackageFormat();
		BINARY_TARGET_FORMAT_KINDS = {
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
			"source-map": "artifact"
		};
		BINARY_TARGET_FORMATS = Object.keys(BINARY_TARGET_FORMAT_KINDS);
		targetFormatsOfKind = (kind) => BINARY_TARGET_FORMATS.filter((format) => BINARY_TARGET_FORMAT_KINDS[format] === kind);
		TARGET_FORMAT_HINTS = [
			"dos-com",
			"raw-binary",
			"gamecube-dol",
			"esp-flash-image"
		];
	})))();
}

//#endregion
export { BINARY_TARGET_FORMATS, BINARY_TARGET_FORMAT_KINDS, TARGET_FORMAT_HINTS, init_targetFormats, targetFormatsOfKind };