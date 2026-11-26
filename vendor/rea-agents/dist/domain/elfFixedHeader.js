import { BinaryReader } from "./binaryContainer.js";
import { err, ok } from "./result.js";
export const elfFixedHeaderWidth = (bits) => bits === 32 ? 52 : 64;
/**
 * Decode common ELF framing and fixed fields; version and declared-size admission belong to consumers.
 *
 * `bytes` may be a bounded prefix. `totalBytes` is the containing file size;
 * common framing requires a complete fixed header in both. The declared
 * headerSize is retained without requiring or admitting that entire extent.
 */
export const readElfHeaderFacts = (bytes, totalBytes = bytes.length) => {
    if (bytes.length >= 4 && bytes.toString("hex", 0, 4) !== "7f454c46")
        return err("not an ELF image");
    if (bytes.length < 16)
        return err("ELF identification is truncated");
    const classByte = bytes[4];
    if (classByte !== 1 && classByte !== 2)
        return err("unsupported ELF class");
    const dataByte = bytes[5];
    if (dataByte !== 1 && dataByte !== 2)
        return err("unsupported ELF endianness");
    if (bytes[6] !== 1)
        return err("unsupported ELF identification version");
    const elfClass = classByte === 1 ? 32 : 64;
    const minimumSize = elfFixedHeaderWidth(elfClass);
    if (!Number.isSafeInteger(totalBytes) ||
        totalBytes < bytes.length ||
        totalBytes < minimumSize ||
        bytes.length < minimumSize)
        return err(`truncated ELF header: an ELF${elfClass} header needs ${minimumSize} bytes; the file has ${totalBytes}`);
    const littleEndian = dataByte === 1;
    const reader = new BinaryReader(bytes, littleEndian, "elf");
    const machine = reader.u16(18);
    const headerSize = reader.u16(elfClass === 32 ? 40 : 52);
    return ok({
        elfClass,
        byteOrder: littleEndian ? "little" : "big",
        headerSize,
        machine,
        type: reader.u16(16),
        flags: reader.u32(elfClass === 32 ? 36 : 48),
        osAbi: bytes[7],
        version: reader.u32(20),
        abiVersion: bytes[8],
    });
};
/** Admit the ELF version and declared header extent for general analysis. */
export const readElfFixedHeader = (bytes, totalBytes = bytes.length) => {
    const parsed = readElfHeaderFacts(bytes, totalBytes);
    return parsed.ok
        ? admitElfFixedHeaderFacts(parsed.value, totalBytes)
        : parsed;
};
/** Admit decoded facts without rereading or discarding their identity on failure. */
export const admitElfFixedHeaderFacts = (facts, totalBytes) => {
    // NVIDIA CUBIN uses ELFOSABI_CUDA and a vendor ABI version in e_version.
    if (facts.version !== 1 && !(facts.machine === 190 && facts.osAbi === 0x33))
        return err("unsupported ELF header version");
    const minimumSize = elfFixedHeaderWidth(facts.elfClass);
    if (facts.headerSize < minimumSize || facts.headerSize > totalBytes)
        return err("invalid ELF header size");
    return ok({
        elfClass: facts.elfClass,
        byteOrder: facts.byteOrder,
        headerSize: facts.headerSize,
        machine: facts.machine,
        type: facts.type,
        flags: facts.flags,
        osAbi: facts.osAbi,
        abiVersion: facts.abiVersion,
        architecture: elfArchitecture(facts.machine, facts.elfClass) ?? null,
    });
};
/**
 * The CPU family an ELF machine names, with class checks where required.
 * Callers that read only the machine retain their historical inventory labels.
 */
export const elfArchitecture = (machine, elfClass) => {
    switch (machine) {
        case 3:
            return "x86";
        case 62:
            return "x86_64";
        case 8: // EM_MIPS: ISA, ABI and byte order remain separate ELF facts.
            return "mips";
        case 20: // EM_PPC is the 32-bit machine. Preserve machine-only inventory labels.
            return elfClass === 64 ? undefined : "powerpc";
        case 21:
            // EM_PPC64 objects are ELF64. An ELF32 header that claims it would pass
            // for EM_PPC downstream, where only class and byte order remain.
            return elfClass === 64 ? "powerpc" : undefined;
        case 40:
            return "arm";
        case 164: // EM_HEXAGON: Qualcomm Hexagon DSP (QDSP6).
            return "hexagon";
        case 94: // EM_XTENSA: Tensilica Xtensa.
            return "xtensa";
        case 183:
            return "arm64";
        case 243: // EM_RISCV: XLEN, byte order and e_flags remain separate ELF facts.
            return "riscv";
    }
    return undefined;
};
