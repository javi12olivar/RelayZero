import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_elfFixedHeader, readElfFixedHeader } from "./elfFixedHeader-D38fsdBg.js";
import { elfProgramHeaderWidth, init_elfProgramHeader, init_elfRawTableDeclarations, readElfProgramHeader, readElfRawTableDeclarations } from "./elfRawTableDeclarations-Cgbp6HKT.js";

//#region dist/domain/elfSectionHeader.js
var elfSectionHeaderWidth, readElfSectionHeader;
function init_elfSectionHeader() {
	return (init_elfSectionHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		elfSectionHeaderWidth = (bits) => bits === 64 ? 64 : 40;
		readElfSectionHeader = (bytes, bits, littleEndian) => {
			const wide = bits === 64;
			if (bytes.byteLength < elfSectionHeaderWidth(bits)) return err({
				kind: "malformed",
				message: "ELF section header is truncated"
			});
			const reader = new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "elf");
			const flags = reader.word(8, bits);
			return ok({
				nameOffset: reader.u32(0),
				type: reader.u32(4),
				flags,
				compressed: (flags & 2048n) !== 0n,
				address: reader.word(wide ? 16 : 12, bits),
				offset: reader.word(wide ? 24 : 16, bits),
				size: reader.word(wide ? 32 : 20, bits),
				link: reader.u32(wide ? 40 : 24),
				info: reader.u32(wide ? 44 : 28),
				alignment: reader.word(wide ? 48 : 32, bits),
				entrySize: reader.word(wide ? 56 : 36, bits)
			});
		};
	})))();
}

//#endregion
//#region dist/domain/elfDeclaredRanges.js
/** Canonical table declarations, including extended counts in inactive section zero. */
function* readElfTableDeclarations(bytes, fileSize) {
	const fixed = readElfFixedHeader(bytes, fileSize);
	if (!fixed.ok) return fixed;
	const header = fixed.value;
	const raw = readElfRawTableDeclarations(bytes, header);
	if (!raw.ok) return err(raw.error.message);
	const { programs, sections } = raw.value;
	const programOffset = programs.offset;
	const sectionOffset = sections.offset;
	const programWidth = programs.width;
	const sectionWidth = sections.width;
	let programCount = BigInt(programs.count);
	let sectionCount = BigInt(sections.count);
	let namesIndex = sections.namesIndex;
	const sectionTable = validateElfSectionTableFields(raw.value);
	if (!sectionTable.ok) return sectionTable;
	if (sectionOffset !== 0n && (sectionCount === 0n || namesIndex === 65535 || programCount === 65535n)) {
		const failure = tableFailure("section", {
			offset: sectionOffset,
			count: 1n,
			width: sectionWidth
		}, header, fileSize);
		if (failure !== undefined) return err(failure);
		const first = yield {
			offset: Number(sectionOffset),
			size: elfSectionHeaderWidth(header.elfClass)
		};
		const counts = extendedCounts(first, header, {
			programCount,
			sectionCount,
			namesIndex
		});
		if (!counts.ok) return counts;
		({programCount, sectionCount, namesIndex} = counts.value);
	}
	for (const [kind, offset, count, width] of [[
		"program",
		programOffset,
		programCount,
		programWidth
	], [
		"section",
		sectionOffset,
		sectionCount,
		sectionWidth
	]]) {
		const failure = tableFailure(kind, {
			offset,
			count,
			width
		}, header, fileSize);
		if (failure !== undefined) return err(failure);
	}
	if (sectionCount !== 0n && BigInt(namesIndex) >= sectionCount) return err("ELF section-name index lies outside the declared section table");
	return ok({
		header,
		programs: {
			offset: programOffset,
			count: Number(programCount),
			width: programWidth
		},
		sections: {
			offset: sectionOffset,
			count: Number(sectionCount),
			width: sectionWidth,
			namesIndex
		}
	});
}
/** Examine only header records; referenced payloads are range-checked, never copied. */
function* inspectTableRanges(kind, table, header, fileSize) {
	let hasInterpreter = false;
	const perRead = Math.max(1, Math.floor(64 * 1024 / table.width));
	for (let index = 0; index < table.count; index += perRead) {
		const count = Math.min(perRead, table.count - index);
		const size = count * table.width;
		const bytes = yield {
			offset: Number(table.offset) + index * table.width,
			size
		};
		if (bytes.length !== size) return err(`truncated ELF ${kind} header table`);
		for (let item = 0; item < count; item++) {
			const at = item * table.width;
			const parsed = kind === "program" ? readElfProgramHeader(bytes.subarray(at, at + table.width), header.elfClass, header.byteOrder === "little") : readElfSectionHeader(bytes.subarray(at, at + table.width), header.elfClass, header.byteOrder === "little");
			if (!parsed.ok) return err(parsed.error.message);
			const facts = parsed.value;
			if (facts.type === 0 || kind === "section" && facts.type === 8) continue;
			const offset = facts.offset;
			const length = "fileSize" in facts ? facts.fileSize : facts.size;
			const failure = rangeFailure(`${kind} ${String(index + item)}`, offset, length, fileSize);
			if (failure !== undefined) return err(failure);
			if (kind === "program" && facts.type === 3) {
				if (length < 2n) return err("invalid ELF PT_INTERP file size");
				hasInterpreter = true;
			}
		}
	}
	return ok({ hasInterpreter });
}
/** Physical extent admission, independent of section names, CPU lanes and decoder budgets. */
function* validateElfDeclaredRanges(prefix, fileSize) {
	const declarations = yield* readElfTableDeclarations(prefix, fileSize);
	if (!declarations.ok) return declarations;
	const { header, programs, sections } = declarations.value;
	let hasInterpreter = false;
	for (const [kind, table] of [["program", programs], ["section", sections]]) {
		if (table.count === 0) continue;
		const inspected = yield* inspectTableRanges(kind, table, header, fileSize);
		if (!inspected.ok) return inspected;
		if (kind === "program") {
			hasInterpreter = inspected.value.hasInterpreter;
		}
	}
	return ok({ hasInterpreter });
}
var SHN_LORESERVE, rangeFailure, tableFailure, extendedCounts, validateElfSectionTableFields;
function init_elfDeclaredRanges() {
	return (init_elfDeclaredRanges = __esmMin((() => {
		init_elfSectionHeader();
		init_elfProgramHeader();
		init_elfRawTableDeclarations();
		init_elfFixedHeader();
		init_result();
		SHN_LORESERVE = 65280;
		rangeFailure = (label, offset, size, fileSize) => size !== 0n && (offset > BigInt(fileSize) || size > BigInt(fileSize) - offset) ? `truncated ELF ${label}: declared file range ${String(offset)}..${String(offset + size)} exceeds the ${String(fileSize)}-byte file` : undefined;
		tableFailure = (kind, table, header, fileSize) => {
			if (table.count === 0n) return undefined;
			const minimumWidth = kind === "program" ? elfProgramHeaderWidth(header.elfClass) : elfSectionHeaderWidth(header.elfClass);
			const label = `${kind} header table`;
			if (table.width < minimumWidth) return `invalid ELF ${label} entry width`;
			if (table.offset < BigInt(header.headerSize)) return `ELF ${label} overlaps the fixed header`;
			return rangeFailure(label, table.offset, table.count * BigInt(table.width), fileSize);
		};
		extendedCounts = (first, header, initial) => {
			if (first.length !== elfSectionHeaderWidth(header.elfClass)) return err("truncated ELF extended section-zero header");
			const parsed = readElfSectionHeader(first, header.elfClass, header.byteOrder === "little");
			if (!parsed.ok) return err(parsed.error.message);
			const zero = parsed.value;
			if (zero.type !== 0) return err("ELF extended numbering requires an inactive SHT_NULL section zero");
			const counts = { ...initial };
			if (counts.sectionCount === 0n) {
				counts.sectionCount = zero.size;
				if (counts.sectionCount < BigInt(SHN_LORESERVE)) return err("invalid ELF extended section count");
			}
			if (counts.namesIndex === 65535) {
				counts.namesIndex = zero.link;
				if (counts.namesIndex < SHN_LORESERVE) return err("invalid ELF extended section-name index");
			}
			if (counts.programCount === 65535n) {
				counts.programCount = BigInt(zero.info);
				if (counts.programCount < 65535n) return err("invalid ELF extended program count");
			}
			return ok(counts);
		};
		validateElfSectionTableFields = (tables) => {
			if (tables.sections.count >= SHN_LORESERVE) return err("ELF e_shnum uses a reserved direct section count");
			if (tables.sections.offset === 0n && (tables.sections.count !== 0 || tables.sections.namesIndex !== 0 || tables.programs.count === 65535)) return err("ELF section table is missing");
			return ok(null);
		};
	})))();
}

//#endregion
export { elfSectionHeaderWidth, init_elfDeclaredRanges, init_elfSectionHeader, readElfSectionHeader, readElfTableDeclarations, validateElfDeclaredRanges, validateElfSectionTableFields };