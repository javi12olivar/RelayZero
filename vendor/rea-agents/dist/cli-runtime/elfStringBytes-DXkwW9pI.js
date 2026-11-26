import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryFormatFailure, binaryStringReadLimit, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { init_elfStringTable, observeElfStringTableEntry } from "./elfStringTable-tJEHn-H2.js";

//#region dist/domain/native/elfStringBytes.js
var readElfStringBytes;
function init_elfStringBytes() {
	return (init_elfStringBytes = __esmMin((() => {
		init_elfStringTable();
		init_binaryContainer();
		readElfStringBytes = (bytes, offset) => {
			const observed = observeElfStringTableEntry(bytes, offset, 65536);
			if (observed.state === "outside") throw new BinaryFormatFailure("malformed", "ELF string offset is outside its string table");
			if (observed.state === "truncated") {
				if (offset + observed.examinedBytes < bytes.length) throw binaryStringReadLimit(observed.examinedBytes);
				throw new BinaryFormatFailure("malformed", "ELF string is unterminated inside its string table");
			}
			return observed.bytes;
		};
	})))();
}

//#endregion
export { init_elfStringBytes, readElfStringBytes };