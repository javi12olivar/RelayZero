import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/elfDynamicEntry.js
var DT_NEEDED, DT_HASH, DT_STRTAB, DT_SYMTAB, DT_STRSZ, DT_SYMENT, DT_RPATH, DT_RUNPATH, DT_FLAGS, DT_GNU_HASH, DT_FLAGS_1, elfDynamicEntryWidth, elfDynamicTableGeometry, admitElfDynamicDirectory, dynamicReader, readDynamicWords, readElfDynamicEntry, walkElfDynamicTable;
function init_elfDynamicEntry() {
	return (init_elfDynamicEntry = __esmMin((() => {
		init_binaryContainer();
		init_result();
		DT_NEEDED = 1n;
		DT_HASH = 4n;
		DT_STRTAB = 5n;
		DT_SYMTAB = 6n;
		DT_STRSZ = 10n;
		DT_SYMENT = 11n;
		DT_RPATH = 15n;
		DT_RUNPATH = 29n;
		DT_FLAGS = 30n;
		DT_GNU_HASH = 1879047925n;
		DT_FLAGS_1 = 1879048187n;
		elfDynamicEntryWidth = (bits) => bits === 64 ? 16 : 8;
		elfDynamicTableGeometry = (bytes, bits) => {
			const width = elfDynamicEntryWidth(bits);
			const trailingBytes = bytes % width;
			return {
				width,
				completeBytes: bytes - trailingBytes,
				trailingBytes
			};
		};
		admitElfDynamicDirectory = (fileBytes, span, bits) => {
			const malformed = () => err({
				kind: "malformed",
				message: "PT_DYNAMIC is truncated or outside the file"
			});
			if (span.offset < 0n || span.size < 0n || span.offset + span.size > BigInt(fileBytes)) return malformed();
			const size = Number(span.size);
			const { width, trailingBytes } = elfDynamicTableGeometry(size, bits);
			if (trailingBytes !== 0) return malformed();
			const maximum = 16 * 1024 * 1024;
			if (size > maximum) return err({
				kind: "capacity",
				message: "ELF dynamic directory exceeds the 16 MiB structural allowance",
				maximum
			});
			return ok({
				offset: Number(span.offset),
				size,
				width
			});
		};
		dynamicReader = (bytes, littleEndian) => new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "elf");
		readDynamicWords = (reader, offset, bits) => ({
			tag: bits === 64 ? reader.i64(offset) : BigInt(reader.i32(offset)),
			value: reader.word(offset + bits / 8, bits)
		});
		readElfDynamicEntry = (bytes, bits, littleEndian) => {
			const width = elfDynamicEntryWidth(bits);
			if (bytes.byteLength < width) return err({
				kind: "malformed",
				message: "ELF dynamic entry is truncated"
			});
			const reader = dynamicReader(bytes, littleEndian);
			return ok(readDynamicWords(reader, 0, bits));
		};
		walkElfDynamicTable = (bytes, { bits, littleEndian }, singletonTags, visit) => {
			const { width, completeBytes, trailingBytes } = elfDynamicTableGeometry(bytes.byteLength, bits);
			const reader = dynamicReader(bytes, littleEndian);
			const firstOffsets = new Map();
			for (let offset = 0; offset < completeBytes; offset += width) {
				const { tag, value } = readDynamicWords(reader, offset, bits);
				if (tag === 0n) return ok({
					terminatorOffset: offset,
					trailingBytes
				});
				const singleton = singletonTags.has(tag);
				if (singleton) {
					const firstOffset = firstOffsets.get(tag);
					if (firstOffset !== undefined) return err({
						kind: "duplicate-singleton",
						tag,
						firstOffset,
						offset
					});
					firstOffsets.set(tag, offset);
				}
				const visited = visit({
					tag,
					value,
					offset,
					singleton
				});
				if (visited !== undefined && !visited.ok) return err({
					kind: "visitor",
					error: visited.error
				});
			}
			return ok({
				terminatorOffset: null,
				trailingBytes
			});
		};
	})))();
}

//#endregion
export { DT_FLAGS, DT_FLAGS_1, DT_GNU_HASH, DT_HASH, DT_NEEDED, DT_RPATH, DT_RUNPATH, DT_STRSZ, DT_STRTAB, DT_SYMENT, DT_SYMTAB, admitElfDynamicDirectory, elfDynamicTableGeometry, init_elfDynamicEntry, readElfDynamicEntry, walkElfDynamicTable };