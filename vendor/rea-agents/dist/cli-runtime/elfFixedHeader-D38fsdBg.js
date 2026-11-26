import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/elfFixedHeader.js
var elfFixedHeaderWidth, readElfHeaderFacts, readElfFixedHeader, admitElfFixedHeaderFacts, elfArchitecture;
function init_elfFixedHeader() {
	return (init_elfFixedHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		elfFixedHeaderWidth = (bits) => bits === 32 ? 52 : 64;
		readElfHeaderFacts = (bytes, totalBytes = bytes.length) => {
			if (bytes.length >= 4 && bytes.toString("hex", 0, 4) !== "7f454c46") return err("not an ELF image");
			if (bytes.length < 16) return err("ELF identification is truncated");
			const classByte = bytes[4];
			if (classByte !== 1 && classByte !== 2) return err("unsupported ELF class");
			const dataByte = bytes[5];
			if (dataByte !== 1 && dataByte !== 2) return err("unsupported ELF endianness");
			if (bytes[6] !== 1) return err("unsupported ELF identification version");
			const elfClass = classByte === 1 ? 32 : 64;
			const minimumSize = elfFixedHeaderWidth(elfClass);
			if (!Number.isSafeInteger(totalBytes) || totalBytes < bytes.length || totalBytes < minimumSize || bytes.length < minimumSize) return err(`truncated ELF header: an ELF${elfClass} header needs ${minimumSize} bytes; the file has ${totalBytes}`);
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
				abiVersion: bytes[8]
			});
		};
		readElfFixedHeader = (bytes, totalBytes = bytes.length) => {
			const parsed = readElfHeaderFacts(bytes, totalBytes);
			return parsed.ok ? admitElfFixedHeaderFacts(parsed.value, totalBytes) : parsed;
		};
		admitElfFixedHeaderFacts = (facts, totalBytes) => {
			if (facts.version !== 1 && !(facts.machine === 190 && facts.osAbi === 51)) return err("unsupported ELF header version");
			const minimumSize = elfFixedHeaderWidth(facts.elfClass);
			if (facts.headerSize < minimumSize || facts.headerSize > totalBytes) return err("invalid ELF header size");
			return ok({
				elfClass: facts.elfClass,
				byteOrder: facts.byteOrder,
				headerSize: facts.headerSize,
				machine: facts.machine,
				type: facts.type,
				flags: facts.flags,
				osAbi: facts.osAbi,
				abiVersion: facts.abiVersion,
				architecture: elfArchitecture(facts.machine, facts.elfClass) ?? null
			});
		};
		elfArchitecture = (machine, elfClass) => {
			switch (machine) {
				case 3: return "x86";
				case 62: return "x86_64";
				case 8: return "mips";
				case 20: return elfClass === 64 ? undefined : "powerpc";
				case 21: return elfClass === 64 ? "powerpc" : undefined;
				case 40: return "arm";
				case 164: return "hexagon";
				case 94: return "xtensa";
				case 183: return "arm64";
				case 243: return "riscv";
			}
			return undefined;
		};
	})))();
}

//#endregion
export { admitElfFixedHeaderFacts, elfArchitecture, elfFixedHeaderWidth, init_elfFixedHeader, readElfFixedHeader, readElfHeaderFacts };