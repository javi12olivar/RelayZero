import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/elfSymbol.js
var elfSymbolSize, readElfSymbol;
function init_elfSymbol() {
	return (init_elfSymbol = __esmMin((() => {
		init_binaryContainer();
		init_result();
		elfSymbolSize = (bits) => bits === 64 ? 24 : 16;
		readElfSymbol = (bytes, bits, littleEndian) => {
			const wide = bits === 64;
			if (bytes.byteLength < elfSymbolSize(bits)) return err({
				kind: "malformed",
				message: "ELF symbol record is truncated"
			});
			const reader = new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "elf");
			const info = reader.u8(wide ? 4 : 12);
			return ok({
				name_offset: reader.u32(0),
				binding: info >>> 4,
				type: info & 15,
				other: reader.u8(wide ? 5 : 13),
				section_index: reader.u16(wide ? 6 : 14),
				value: reader.word(wide ? 8 : 4, bits),
				size: reader.word(wide ? 16 : 8, bits)
			});
		};
	})))();
}

//#endregion
export { elfSymbolSize, init_elfSymbol, readElfSymbol };