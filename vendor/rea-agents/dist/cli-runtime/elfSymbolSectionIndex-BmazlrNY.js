import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/elfSymbolSectionIndex.js
var ELF_SHN_XINDEX, ElfSymbolSectionIndexTables, readElfExtendedSymbolSectionIndex, readElfSymbolSectionReference;
function init_elfSymbolSectionIndex() {
	return (init_elfSymbolSectionIndex = __esmMin((() => {
		init_result();
		init_binaryContainer();
		ELF_SHN_XINDEX = 65535;
		ElfSymbolSectionIndexTables = class {
			#tables = new Map();
			constructor(sections) {
				for (const section of sections) {
					if (section.type !== 18) continue;
					this.#tables.set(section.link, this.#tables.has(section.link) ? null : section);
				}
			}
			/** A companion has one 32-bit entry for every symbol, including symbol zero. */
			tableFor(symbolTable, symbolCount) {
				const section = this.#tables.get(symbolTable);
				if (section === undefined || section === null) return err({
					kind: "malformed",
					message: section === null ? "multiple extended symbol section-index tables link to the symbol table" : "extended symbol section-index table is unavailable"
				});
				if (section.compressed) return err({
					kind: "unsupported",
					message: "extended symbol section-index table is compressed"
				});
				if (!section.file_backed || section.entry_size !== 4n || section.size !== symbolCount * 4n) return err({
					kind: "malformed",
					message: "extended symbol section-index table has an invalid extent"
				});
				return ok(section);
			}
		};
		readElfExtendedSymbolSectionIndex = (bytes, symbolIndex, sectionCount, little) => {
			const offset = symbolIndex * 4;
			if (!Number.isSafeInteger(symbolIndex) || symbolIndex < 0 || offset > bytes.byteLength - 4) return err({
				kind: "malformed",
				message: "extended symbol section-index entry is truncated"
			});
			const index = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), little, "elf").u32(offset);
			if (index === 0 || index >= sectionCount) return err({
				kind: "malformed",
				message: "extended symbol section index does not name an existing section"
			});
			return ok(index);
		};
		readElfSymbolSectionReference = (rawIndex, symbolIndex, sectionCount, little, extended) => {
			if (rawIndex === 0) return ok({ kind: "undefined" });
			if (rawIndex === 65521) return ok({ kind: "absolute" });
			if (rawIndex === 65522) return ok({ kind: "common" });
			if (rawIndex === 65535) {
				if (extended === undefined) return err({
					kind: "malformed",
					message: "extended symbol section-index table is unavailable"
				});
				const resolved = readElfExtendedSymbolSectionIndex(extended, symbolIndex, sectionCount, little);
				return resolved.ok ? ok({
					kind: "section",
					index: resolved.value
				}) : resolved;
			}
			if (rawIndex >= 65280) return ok({
				kind: "reserved",
				index: rawIndex
			});
			if (rawIndex >= sectionCount) return err({
				kind: "malformed",
				message: "symbol section index does not name an existing section"
			});
			return ok({
				kind: "section",
				index: rawIndex
			});
		};
	})))();
}

//#endregion
export { ELF_SHN_XINDEX, ElfSymbolSectionIndexTables, init_elfSymbolSectionIndex, readElfSymbolSectionReference };