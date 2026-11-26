import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/binaryTargetTypes.js
var BINARY_ARCHITECTURES, RAW_ONLY_ARCHITECTURES, PE_CODEVIEW_PREFIX_BYTES, ELF_METADATA_ARCHITECTURES, HEADER_ARCHITECTURE_EXCLUSIONS, isMachOFormat, artifactTargetSelectedPath;
function init_binaryTargetTypes() {
	return (init_binaryTargetTypes = __esmMin((() => {
		BINARY_ARCHITECTURES = [
			"x86",
			"x86_64",
			"arm",
			"arm64",
			"arm64_32",
			"mips",
			"6502",
			"riscv",
			"powerpc",
			"m68k",
			"hexagon",
			"xtensa"
		];
		RAW_ONLY_ARCHITECTURES = ["6502", "m68k"];
		PE_CODEVIEW_PREFIX_BYTES = 4096;
		ELF_METADATA_ARCHITECTURES = [
			"mips",
			"riscv",
			"powerpc"
		];
		HEADER_ARCHITECTURE_EXCLUSIONS = [
			...ELF_METADATA_ARCHITECTURES,
			...RAW_ONLY_ARCHITECTURES,
			"hexagon",
			"xtensa",
			"arm64_32"
		];
		isMachOFormat = (format) => format === "mach-o" || format === "mach-o-universal";
		artifactTargetSelectedPath = (target) => target.kind === "archive" || target.kind === "artifact" ? target.artifactSelectedPath ?? target.sourcePath ?? target.path : target.sourcePath ?? target.path;
	})))();
}

//#endregion
export { BINARY_ARCHITECTURES, HEADER_ARCHITECTURE_EXCLUSIONS, PE_CODEVIEW_PREFIX_BYTES, RAW_ONLY_ARCHITECTURES, artifactTargetSelectedPath, init_binaryTargetTypes, isMachOFormat };