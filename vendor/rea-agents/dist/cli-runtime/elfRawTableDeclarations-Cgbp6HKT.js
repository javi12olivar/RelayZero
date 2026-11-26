import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { elfFixedHeaderWidth, init_elfFixedHeader } from "./elfFixedHeader-D38fsdBg.js";

//#region dist/domain/elfProgramHeader.js
var PT_INTERP, elfProgramHeaderWidth, readElfProgramHeader, admitElfLoadSegment, elfLoadSpans;
function init_elfProgramHeader() {
	return (init_elfProgramHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		PT_INTERP = 3;
		elfProgramHeaderWidth = (bits) => bits === 64 ? 56 : 32;
		readElfProgramHeader = (bytes, bits, littleEndian) => {
			const wide = bits === 64;
			if (bytes.byteLength < elfProgramHeaderWidth(bits)) return err({
				kind: "malformed",
				message: "ELF program header is truncated"
			});
			const reader = new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "elf");
			return ok({
				type: reader.u32(0),
				flags: reader.u32(wide ? 4 : 24),
				offset: reader.word(wide ? 8 : 4, bits),
				virtualAddress: reader.word(wide ? 16 : 8, bits),
				physicalAddress: reader.word(wide ? 24 : 12, bits),
				fileSize: reader.word(wide ? 32 : 16, bits),
				memorySize: reader.word(wide ? 40 : 20, bits),
				alignment: reader.word(wide ? 48 : 28, bits)
			});
		};
		admitElfLoadSegment = (segment, bits) => segment.fileSize > segment.memorySize || segment.virtualAddress + segment.memorySize > 1n << BigInt(bits) ? err({
			kind: "malformed",
			message: "ELF load segment sizes or addresses are invalid"
		}) : ok(null);
		elfLoadSpans = ({ virtualAddress, offset, fileSize, memorySize }) => ({
			fileBacked: fileSize === 0n ? undefined : {
				address: virtualAddress,
				offset: Number(offset),
				size: Number(fileSize)
			},
			zeroFill: memorySize > fileSize ? {
				address: virtualAddress + fileSize,
				size: memorySize - fileSize
			} : undefined
		});
	})))();
}

//#endregion
//#region dist/domain/elfRawTableDeclarations.js
var readElfRawTableDeclarations;
function init_elfRawTableDeclarations() {
	return (init_elfRawTableDeclarations = __esmMin((() => {
		init_binaryContainer();
		init_elfFixedHeader();
		init_result();
		readElfRawTableDeclarations = (bytes, format) => {
			const { elfClass, byteOrder } = format;
			const wide = elfClass === 64;
			if (bytes.byteLength < elfFixedHeaderWidth(elfClass)) return err({
				kind: "malformed",
				message: "ELF table declarations are truncated"
			});
			const reader = new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), byteOrder === "little", "elf");
			return ok({
				programs: {
					offset: reader.word(wide ? 32 : 28, elfClass),
					width: reader.u16(wide ? 54 : 42),
					count: reader.u16(wide ? 56 : 44)
				},
				sections: {
					offset: reader.word(wide ? 40 : 32, elfClass),
					width: reader.u16(wide ? 58 : 46),
					count: reader.u16(wide ? 60 : 48),
					namesIndex: reader.u16(wide ? 62 : 50)
				}
			});
		};
	})))();
}

//#endregion
export { admitElfLoadSegment, elfLoadSpans, elfProgramHeaderWidth, init_elfProgramHeader, init_elfRawTableDeclarations, readElfProgramHeader, readElfRawTableDeclarations };