/** Provider-neutral CPU families detected from headers or explicitly selected raw loads. */
export const BINARY_ARCHITECTURES = [
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
    "xtensa",
];
/**
 * Families admitted only by explicit raw-binary selection. Header detection
 * never yields them, so detected targets and Evidence subjects exclude them.
 */
export const RAW_ONLY_ARCHITECTURES = [
    "6502",
    "m68k",
];
/** Prefix shared by CodeView RVA mapping and both payload readers. */
export const PE_CODEVIEW_PREFIX_BYTES = 4096;
/** Families whose parsed target variant carries `ElfFamilyMetadata`. */
export const ELF_METADATA_ARCHITECTURES = [
    "mips",
    "riscv",
    "powerpc",
];
/** Families that require a specialized target variant instead of generic headers. */
export const HEADER_ARCHITECTURE_EXCLUSIONS = [
    ...ELF_METADATA_ARCHITECTURES,
    ...RAW_ONLY_ARCHITECTURES,
    "hexagon",
    "xtensa",
    "arm64_32",
];
/** Whether an executable target contains a thin or universal Mach-O image. */
export const isMachOFormat = (format) => format === "mach-o" || format === "mach-o-universal";
/** Result-affecting artifact selection; canonical packed identity remains target.path. */
export const artifactTargetSelectedPath = (target) => target.kind === "archive" || target.kind === "artifact"
    ? (target.artifactSelectedPath ?? target.sourcePath ?? target.path)
    : (target.sourcePath ?? target.path);
