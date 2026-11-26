import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryFormatFailure, BinaryReader, BinaryResourceFailure, init_binaryContainer, isBinaryFormatOrStringLimitFailure, mappedFileOffset, readMappedCString } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { MAX_NATIVE_EXPORT_ROWS, decodeElfExportName, init_nativeExports } from "./analysisViewResult-vDCF9Pxo.js";
import { architectureForElfMachine, init_elfImage, init_peImage, peDeclaredFileMappings, readPeImage } from "./elfImage-cCQspBBH.js";
import { allKeyed, init_keyedCollection, keyedBy, uniqueKeyed } from "./keyedCollection-BoRfT2aE.js";
import { elfSymbolSize, init_elfSymbol, readElfSymbol } from "./elfSymbol-BFeMfDna.js";
import { init_nativeSectionDirectory, readElfDirectoryFromBuffer, readElfDirectoryFromBufferCooperative } from "./nativeSectionDirectory-FUNOhzEu.js";
import { init_elfStringBytes, readElfStringBytes } from "./elfStringBytes-DXkwW9pI.js";

//#region dist/domain/native/nativeExportParser.js
function* readVersionNames(reader, sections, issues) {
	const namesByIndex = new Map();
	const readName = createVersionNameReader();
	let textBytes = 0;
	const addName = (index, decoded) => {
		const previous = namesByIndex.get(index);
		if (previous === decoded) return;
		const nextTextBytes = textBytes - retainedTextBytes(previous?.name ?? null, previous?.name_bytes_base64 ?? null) + retainedTextBytes(decoded?.name ?? null, decoded?.name_bytes_base64 ?? null);
		checkRetainedText(nextTextBytes);
		namesByIndex.set(index, decoded);
		textBytes = nextTextBytes;
	};
	const byType = keyedBy(sections, ({ type }) => type);
	const verneed = versionSection(byType, SHT_GNU_VERNEED, "Version requirements", issues);
	if (verneed !== undefined && verneed !== null && verneed.info !== 0) {
		try {
			const { table, names } = versionSectionData(reader, sections, verneed, "Version requirements");
			const visit = versionRecordStep(table.size, 16);
			let offset = 0;
			for (let record = 0; record < verneed.info; record++) {
				if (offset + 16 > table.size) throw new BinaryFormatFailure("malformed", "Version requirement chain leaves its section");
				if (visit()) yield;
				const at = table.offset + offset;
				const auxiliaryCount = reader.u16(at + 2);
				const auxiliaryOffset = reader.u32(at + 8);
				const next = reader.u32(at + 12);
				if (auxiliaryCount > 0 && auxiliaryOffset < 16) throw new BinaryFormatFailure("malformed", "Version requirement auxiliary chain starts inside its header");
				let auxiliary = offset + auxiliaryOffset;
				for (let item = 0; item < auxiliaryCount; item++) {
					if (auxiliary + 16 > table.size) throw new BinaryFormatFailure("malformed", "Version requirement auxiliary chain leaves its section");
					if (visit()) yield;
					const auxAt = table.offset + auxiliary;
					const versionIndex = reader.u16(auxAt + 6) & 32767;
					const auxiliaryNext = reader.u32(auxAt + 12);
					try {
						addName(versionIndex, readName(names, reader.u32(auxAt + 8)));
					} catch (cause) {
						if (cause instanceof ElfVersionWorkFailure) throw cause;
						issues.push({
							code: "version_unresolved",
							location: hex(verneed.offset + BigInt(auxiliary)),
							message: `Version requirement name: ${failureMessage(cause)}`
						});
					}
					if (item + 1 < auxiliaryCount) {
						if (auxiliaryNext < 16) throw new BinaryFormatFailure("malformed", "Version requirement auxiliary chain ends before its declared count");
						auxiliary += auxiliaryNext;
					}
				}
				if (record + 1 < verneed.info) {
					if (next < 16) throw new BinaryFormatFailure("malformed", "Version requirement chain ends before its declared count");
					offset += next;
				}
			}
		} catch (cause) {
			if (cause instanceof ElfVersionWorkFailure) namesByIndex.clear();
			issues.push({
				code: "version_unresolved",
				location: hex(verneed.offset),
				message: `Version requirements: ${cause instanceof ElfVersionWorkFailure ? cause.message : failureMessage(cause)}`
			});
		}
	}
	const verdef = versionSection(byType, SHT_GNU_VERDEF, "Version definitions", issues);
	if (verdef === null) namesByIndex.clear();
	if (verdef !== undefined && verdef !== null && verdef.info !== 0) {
		try {
			const { table, names } = versionSectionData(reader, sections, verdef, "Version definitions");
			const visit = versionRecordStep(table.size, 8);
			let offset = 0;
			for (let index = 0; index < verdef.info; index++) {
				if (offset + 20 > table.size) throw new BinaryFormatFailure("malformed", "Version definition chain leaves its section");
				if (visit()) yield;
				const at = table.offset + offset;
				const versionIndex = reader.u16(at + 4) & 32767;
				const aux = reader.u32(at + 12);
				const next = reader.u32(at + 16);
				const auxiliaryCount = reader.u16(at + 6);
				if (auxiliaryCount === 0 || aux < 20 || offset + aux + 8 > table.size) throw new BinaryFormatFailure("malformed", "Version definition name entry leaves its section");
				let auxiliary = offset + aux;
				const versionName = readName(names, reader.u32(table.offset + auxiliary));
				addName(versionIndex, versionName);
				for (let item = 0; item < auxiliaryCount; item++) {
					if (auxiliary + 8 > table.size) throw new BinaryFormatFailure("malformed", "Version definition auxiliary chain leaves its section");
					if (visit()) yield;
					if (item + 1 < auxiliaryCount) {
						const auxiliaryNext = reader.u32(table.offset + auxiliary + 4);
						if (auxiliaryNext < 8) throw new BinaryFormatFailure("malformed", "Version definition auxiliary chain ends before its declared count");
						auxiliary += auxiliaryNext;
					}
				}
				if (index + 1 < verdef.info) {
					if (next < 20) throw new BinaryFormatFailure("malformed", "Version definition chain ends before its declared count");
					offset += next;
				}
			}
		} catch (cause) {
			if (cause instanceof ElfVersionWorkFailure || cause instanceof BinaryFormatFailure && cause.kind === "unsupported") namesByIndex.clear();
			issues.push({
				code: "version_unresolved",
				location: hex(verdef.offset),
				message: `Version definitions: ${cause instanceof ElfVersionWorkFailure ? cause.message : failureMessage(cause)}`
			});
		}
	}
	return namesByIndex;
}
/** Read ELF exports and versions from an already-admitted directory for these bytes. */
function* parseElfExportsFromDirectorySteps(bytes, artifact, directory) {
	const reader = new BinaryReader(bytes, directory.little, "elf");
	const result = {
		artifact,
		format: "elf",
		architecture: architectureForElfMachine(directory.machine),
		bits: directory.bits,
		byte_order: directory.little ? "little" : "big"
	};
	const { sections } = directory;
	const byType = keyedBy(sections, ({ type }) => type);
	const selectedDynsym = uniqueKeyed(byType, SHT_DYNSYM);
	if (!selectedDynsym.ok) throw new BinaryFormatFailure("malformed", "ELF image has more than one SHT_DYNSYM");
	const dynsym = selectedDynsym.value;
	if (sections.length === 0 || dynsym === undefined && directory.programs.some(({ type }) => type === 2)) return {
		...result,
		exports: [],
		coverage: {
			status: "unsupported",
			reason: sections.length === 0 ? "The ELF has no section headers; enumerating dynamic symbols from the dynamic segment is not implemented" : "The ELF declares a dynamic segment but has no dynamic symbol section; enumerating dynamic symbols from the dynamic segment is not implemented",
			examined_entries: 0,
			exports: 0
		},
		issues: [],
		limitations: ELF_LIMITATIONS
	};
	if (dynsym === undefined) return {
		...result,
		exports: [],
		coverage: coverage([], 0, 0),
		issues: [],
		limitations: ["The ELF has no dynamic symbol table, so it exports no dynamic symbols.", ...ELF_LIMITATIONS]
	};
	const width = elfSymbolSize(directory.bits);
	const strings = sections[dynsym.link];
	const compressed = dynsym.compressed ? dynsym : strings?.type === SHT_STRTAB && strings.compressed ? strings : null;
	if (compressed !== null) {
		const reason = `The ELF ${compressed === dynsym ? "dynamic symbol table" : "dynamic string table"} is SHF_COMPRESSED and was not decompressed; export identities remain unknown`;
		return {
			...result,
			exports: [],
			coverage: {
				status: "unsupported",
				reason,
				examined_entries: 0,
				exports: 0
			},
			issues: [{
				code: "table_unavailable",
				location: hex(compressed.offset),
				message: reason
			}],
			limitations: ELF_LIMITATIONS
		};
	}
	if (dynsym.entry_size !== BigInt(width) || dynsym.size % BigInt(width) !== 0n || dynsym.size < BigInt(width) || strings?.type !== SHT_STRTAB) throw new BinaryFormatFailure("malformed", "ELF dynamic symbol table entry size, length, null entry or string-table link is invalid");
	const { offset: table, size } = reader.fileRange(dynsym.offset, dynsym.size, "ELF dynamic symbols");
	const count = size / width;
	rowBudget(count, "ELF dynamic symbol table");
	const nullSymbolNote = reservedElfDynamicSymbolNote(bytes.subarray(table, table + width), directory.bits, directory.little, table);
	const nameRange = reader.fileRange(strings.offset, strings.size, "ELF dynamic strings");
	const names = bytes.subarray(nameRange.offset, nameRange.offset + nameRange.size);
	const issues = [];
	const linkedVersym = allKeyed(byType, SHT_GNU_VERSYM).filter(({ link }) => link === dynsym.index);
	const versym = linkedVersym[0];
	let versions = null;
	if (versym !== undefined) {
		try {
			if (linkedVersym.length > 1) throw new BinaryFormatFailure("malformed", `${String(linkedVersym.length)} symbol version tables link to the dynamic symbol table`);
			if (versym.compressed) throw new BinaryFormatFailure("unsupported", "ELF symbol versions are SHF_COMPRESSED and were not decompressed");
			if (versym.size !== BigInt(count * 2)) throw new BinaryFormatFailure("malformed", `Symbol version table has ${String(versym.size)} bytes for ${String(count)} symbols`);
			versions = reader.table(versym.offset, count, 2, "ELF symbol versions");
		} catch (cause) {
			issues.push({
				code: "version_unresolved",
				location: hex(versym.offset),
				message: failureMessage(cause)
			});
		}
	}
	const versionNames = yield* readVersionNames(reader, sections, issues);
	const unresolvedVersions = new Set();
	const retain = createRetention();
	const exports = [];
	for (let index = 1; index < count; index++) {
		if (index % 1024 === 0) yield;
		const at = table + index * width;
		const parsedSymbol = readElfSymbol(bytes.subarray(at, at + width), directory.bits, directory.little);
		if (!parsedSymbol.ok) throw new BinaryFormatFailure(parsedSymbol.error.kind, parsedSymbol.error.message);
		const symbol = parsedSymbol.value;
		const binding = ELF_BINDINGS[symbol.binding];
		const visibility = ELF_VISIBILITIES[symbol.other & 3];
		if (binding === undefined || symbol.section_index === 0 || visibility === undefined) continue;
		let version = null;
		if (versym !== undefined && versions === null) version = "unknown";
		else if (versions !== null) {
			const raw = reader.u16(versions + index * 2);
			const versionIndex = raw & 32767;
			if (versionIndex >= 2) {
				const decodedName = versionNames.get(versionIndex) ?? null;
				if (decodedName === null && !unresolvedVersions.has(versionIndex)) {
					unresolvedVersions.add(versionIndex);
					issues.push({
						code: "version_unresolved",
						location: hex(symbol.value),
						message: `Version index ${String(versionIndex)}, first used by symbol ${String(index)}, has no unambiguous version name`
					});
				}
				version = {
					index: versionIndex,
					name: decodedName?.name ?? null,
					name_bytes_base64: decodedName?.name_bytes_base64 ?? null,
					name_utf8_decodable: decodedName?.name_utf8_decodable ?? null,
					hidden: (raw & 32768) !== 0
				};
			}
		}
		let name;
		let nameUtf8Decodable;
		let rawNameBase64;
		try {
			const rawName = readElfStringBytes(names, symbol.name_offset);
			const decodedName = decodeElfExportName(rawName);
			nameUtf8Decodable = decodedName.name_utf8_decodable;
			name = decodedName.name;
			rawNameBase64 = decodedName.name_bytes_base64;
		} catch (cause) {
			issues.push({
				code: "name_unreadable",
				location: hex(symbol.value),
				message: `Dynamic symbol ${String(index)}: ${failureMessage(cause)}`
			});
			continue;
		}
		if (name === "") {
			issues.push({
				code: "name_unreadable",
				location: hex(symbol.value),
				message: `Defined global dynamic symbol ${String(index)} has an empty name`
			});
			continue;
		}
		retain.row(name, typeof version === "object" ? version?.name ?? null : null, rawNameBase64, typeof version === "object" ? version?.name_bytes_base64 ?? null : null);
		exports.push({
			name,
			name_bytes_base64: rawNameBase64,
			name_utf8_decodable: nameUtf8Decodable,
			value: hex(symbol.value),
			size: symbol.size.toString(),
			type: ELF_TYPES[symbol.type] ?? "other",
			binding,
			visibility,
			version
		});
	}
	return {
		...result,
		exports,
		coverage: coverage(issues, count - 1, exports.length),
		issues,
		limitations: [...ELF_LIMITATIONS, ...nullSymbolNote === null ? [] : [nullSymbolNote]]
	};
}
/** Shared bounded checkpoints; consumers may yield/cancel without another parser. */
function* parseNativeExportsSteps(bytes, artifact) {
	yield;
	if (hasElfMagic(bytes)) return yield* parseElfExportsFromDirectorySteps(bytes, artifact, readElfDirectoryFromBuffer(bytes, OPERATION));
	if (bytes.subarray(0, 2).equals(Buffer.from("MZ"))) return parsePeExports(bytes, artifact);
	throw new BinaryFormatFailure("unsupported", "Only PE and ELF images are supported; inspect Mach-O exports with inspect_macho");
}
var ELF_MAGIC, hasElfMagic, OPERATION, SHT_STRTAB, SHT_DYNSYM, SHT_GNU_VERDEF, SHT_GNU_VERNEED, SHT_GNU_VERSYM, PE_EXPORT_DIRECTORY, PE_EXPORT_DIRECTORY_BYTES, MAXIMUM_NAME_BYTES, MAXIMUM_RETAINED_TEXT_BYTES, retainedTextBytes, NATIVE_EXPORT_LIMITS, nativeExportLimit, checkRetainedText, createRetention, hex, rowBudget, coverage, failureMessage, reservedElfDynamicSymbolNote, PE_LIMITATIONS, parsePeExports, ELF_LIMITATIONS, ELF_TYPES, ELF_BINDINGS, ELF_VISIBILITIES, versionSectionData, ElfVersionWorkFailure, versionRecordStep, createVersionNameReader, versionSection, parseNativeExports, parseNativeExportsCooperative, finishExports;
function init_nativeExportParser() {
	return (init_nativeExportParser = __esmMin((() => {
		init_binaryContainer();
		init_elfImage();
		init_elfStringBytes();
		init_elfSymbol();
		init_nativeSectionDirectory();
		init_peImage();
		init_keyedCollection();
		init_nativeExports();
		ELF_MAGIC = Buffer.from([
			127,
			69,
			76,
			70
		]);
		hasElfMagic = (bytes) => bytes.subarray(0, ELF_MAGIC.length).equals(ELF_MAGIC);
		OPERATION = "inspect_native_exports";
		SHT_STRTAB = 3;
		SHT_DYNSYM = 11;
		SHT_GNU_VERDEF = 1879048189;
		SHT_GNU_VERNEED = 1879048190;
		SHT_GNU_VERSYM = 1879048191;
		PE_EXPORT_DIRECTORY = 0;
		PE_EXPORT_DIRECTORY_BYTES = 40;
		MAXIMUM_NAME_BYTES = 4096;
		MAXIMUM_RETAINED_TEXT_BYTES = 16 * 1024 * 1024;
		retainedTextBytes = (...strings) => strings.reduce((bytes, value) => bytes + (value === null ? 0 : Buffer.byteLength(value, "utf8")), 0);
		NATIVE_EXPORT_LIMITS = ["rows", "retained_text"];
		nativeExportLimit = (limit, allowance, message) => new BinaryResourceFailure("structure", allowance, message, limit);
		checkRetainedText = (bytes) => {
			if (bytes > MAXIMUM_RETAINED_TEXT_BYTES) throw nativeExportLimit("retained_text", MAXIMUM_RETAINED_TEXT_BYTES, `Export names exceed the ${String(MAXIMUM_RETAINED_TEXT_BYTES)}-byte retained-text allowance`);
		};
		createRetention = () => {
			let rows = 0;
			let text = 0;
			const retainText = (...strings) => {
				text += retainedTextBytes(...strings);
				checkRetainedText(text);
			};
			return {
				text: retainText,
				row: (...strings) => {
					rows++;
					rowBudget(rows, "Export inventory");
					retainText(...strings);
				}
			};
		};
		hex = (value) => `0x${value.toString(16)}`;
		rowBudget = (count, label) => {
			if (count > 262144) throw nativeExportLimit("rows", MAX_NATIVE_EXPORT_ROWS, `${label} declares ${String(count)} entries, above the ${String(MAX_NATIVE_EXPORT_ROWS)}-entry export inventory allowance`);
		};
		coverage = (issues, examined, exports) => issues.length === 0 ? {
			status: "complete",
			reason: null,
			examined_entries: examined,
			exports
		} : {
			status: "partial",
			reason: `${String(issues.length)} export table issue(s) affect reported rows or metadata; see issues`,
			examined_entries: examined,
			exports
		};
		failureMessage = (cause) => {
			if (isBinaryFormatOrStringLimitFailure(cause)) return cause.message;
			throw cause;
		};
		reservedElfDynamicSymbolNote = (bytes, bits, littleEndian, fileOffset) => {
			const parsed = readElfSymbol(bytes, bits, littleEndian);
			if (!parsed.ok) throw new BinaryFormatFailure(parsed.error.kind, parsed.error.message);
			const symbol = parsed.value;
			if (symbol.binding !== 0 || symbol.type !== 0 || symbol.other !== 0 || symbol.section_index !== 0 || symbol.value !== 0n || symbol.size !== 0n) throw new BinaryFormatFailure("malformed", "ELF dynamic symbol table null entry has nonzero fields");
			if (symbol.name_offset === 0) return null;
			return `ELF dynamic symbol 0 at file offset ${hex(fileOffset)} has nonzero st_name ${hex(symbol.name_offset)}. st_info, st_other, st_shndx, st_value and st_size are zero, so the entry was skipped and was not reported as an export.`;
		};
		PE_LIMITATIONS = ["Rows reproduce the PE export directory; they do not establish that an export is reachable, safe to call or loaded at runtime.", "Forwarded exports resolve in another DLL, which is not opened; ordinal-only exports have no name in this image."];
		parsePeExports = (bytes, artifact) => {
			const image = readPeImage(bytes);
			const base = image.image_base ?? 0n;
			const directory = image.pe_data_directories?.[PE_EXPORT_DIRECTORY];
			const result = {
				artifact,
				format: "pe",
				architecture: image.architecture,
				bits: image.bits
			};
			if (directory === undefined || directory.address === 0) return {
				...result,
				export_directory: null,
				exports: [],
				coverage: coverage([], 0, 0),
				issues: [],
				limitations: ["The image declares no export directory, so it exports nothing by name or ordinal.", ...PE_LIMITATIONS]
			};
			const reader = new BinaryReader(bytes, true, "pe");
			const mappings = peDeclaredFileMappings(image);
			const map = (rva, size) => mappedFileOffset(mappings, base + BigInt(rva), size, image.zero_fills);
			const cStringBytes = (rva, maximumBytes = MAXIMUM_NAME_BYTES) => {
				const value = readMappedCString(bytes, mappings, base + BigInt(rva), maximumBytes, image.zero_fills);
				if (value.length === 0) throw new BinaryFormatFailure("malformed", `Export name at RVA ${hex(rva)} is empty`);
				return value;
			};
			const header = map(directory.address, PE_EXPORT_DIRECTORY_BYTES);
			const ordinalBase = reader.u32(header + 16);
			const functionCount = reader.u32(header + 20);
			const nameCount = reader.u32(header + 24);
			rowBudget(functionCount, "PE export address table");
			rowBudget(nameCount, "PE export name table");
			const functions = functionCount === 0 ? 0 : map(reader.u32(header + 28), functionCount * 4);
			const names = nameCount === 0 ? 0 : map(reader.u32(header + 32), nameCount * 4);
			const ordinals = nameCount === 0 ? 0 : map(reader.u32(header + 36), nameCount * 2);
			const issues = [];
			let dllName = null;
			try {
				dllName = cStringBytes(reader.u32(header + 12)).toString("latin1");
			} catch (cause) {
				issues.push({
					code: "name_unreadable",
					location: hex(reader.u32(header + 12)),
					message: `Export directory DLL name: ${failureMessage(cause)}`
				});
			}
			const retain = createRetention();
			const namesByFunction = new Map();
			const namedFunctions = new Set();
			for (let index = 0; index < nameCount; index++) {
				const functionIndex = reader.u16(ordinals + index * 2);
				const nameRva = reader.u32(names + index * 4);
				if (functionIndex >= functionCount) {
					issues.push({
						code: "malformed_entry",
						location: hex(nameRva),
						message: `Export name ${String(index)} selects address-table slot ${String(functionIndex)}, outside its ${String(functionCount)} slots`
					});
					continue;
				}
				namedFunctions.add(functionIndex);
				try {
					const nameBytes = cStringBytes(nameRva);
					if (reader.u32(functions + functionIndex * 4) === 0) continue;
					const name = nameBytes.toString("latin1");
					retain.text(name);
					const list = namesByFunction.get(functionIndex) ?? [];
					list.push(name);
					namesByFunction.set(functionIndex, list);
				} catch (cause) {
					issues.push({
						code: "name_unreadable",
						location: hex(nameRva),
						message: failureMessage(cause)
					});
				}
			}
			const forwarderEnd = directory.address + directory.size;
			const exports = [];
			for (let index = 0; index < functionCount; index++) {
				const rva = reader.u32(functions + index * 4);
				if (rva === 0) continue;
				const ordinal = ordinalBase + index;
				let target;
				if (rva >= directory.address && rva < forwarderEnd) {
					try {
						target = {
							address: null,
							forwarder: cStringBytes(rva, Math.min(MAXIMUM_NAME_BYTES, forwarderEnd - rva - 1)).toString("latin1")
						};
					} catch (cause) {
						issues.push({
							code: "malformed_entry",
							location: hex(rva),
							message: `Forwarder of ordinal ${String(ordinal)}: ${failureMessage(cause)}`
						});
						continue;
					}
				} else target = {
					address: hex(base + BigInt(rva)),
					forwarder: null
				};
				const exportNames = namesByFunction.get(index);
				if (exportNames !== undefined) for (const name of exportNames) {
					retain.row(target.forwarder);
					exports.push({
						name,
						ordinal,
						...target
					});
				}
				else if (!namedFunctions.has(index)) {
					retain.row(target.forwarder);
					exports.push({
						name: null,
						ordinal,
						...target
					});
				}
			}
			return {
				...result,
				export_directory: {
					rva: directory.address,
					size: directory.size,
					dll_name: dllName,
					ordinal_base: ordinalBase,
					timestamp: reader.u32(header + 4)
				},
				exports,
				coverage: coverage(issues, functionCount, exports.length),
				issues,
				limitations: PE_LIMITATIONS
			};
		};
		ELF_LIMITATIONS = [
			"Rows list defined default- or protected-visibility global, weak and unique dynamic symbols; local, hidden, internal and undefined symbols are not exports.",
			"A hidden symbol version is not the default version that a by-name dlsym lookup selects.",
			"Rows reproduce the dynamic symbol table; they do not establish that a symbol is reachable, safe to call or loaded at runtime."
		];
		ELF_TYPES = {
			1: "object",
			2: "function",
			6: "tls",
			10: "ifunc"
		};
		ELF_BINDINGS = {
			1: "global",
			2: "weak",
			10: "unique"
		};
		ELF_VISIBILITIES = {
			0: "default",
			3: "protected"
		};
		versionSectionData = (reader, sections, section, label) => {
			if (section.compressed) throw new BinaryFormatFailure("unsupported", `${label} are SHF_COMPRESSED and were not decompressed`);
			const strings = sections[section.link];
			if (strings?.type !== SHT_STRTAB) throw new BinaryFormatFailure("malformed", `${label} do not link to a string table`);
			if (strings.compressed) throw new BinaryFormatFailure("unsupported", `${label} strings are SHF_COMPRESSED and were not decompressed`);
			const stringRange = reader.fileRange(strings.offset, strings.size, `${label} strings`);
			const table = reader.fileRange(section.offset, section.size, label);
			return {
				table,
				names: reader.bytes.subarray(stringRange.offset, stringRange.offset + stringRange.size)
			};
		};
		ElfVersionWorkFailure = class extends BinaryResourceFailure {};
		versionRecordStep = (size, width) => {
			const allowance = Math.min(Math.floor(size / width), MAX_NATIVE_EXPORT_ROWS);
			let visited = 0;
			return () => {
				if (++visited > allowance) throw new ElfVersionWorkFailure("structure", size, `ELF version traversal work allowance of ${String(allowance)} record visits was exhausted; remaining version names are unknown`);
				return visited % 1024 === 0;
			};
		};
		createVersionNameReader = () => {
			const decodedNames = new Map();
			let cacheBytes = 0;
			const chargeCache = (bytes) => {
				if (cacheBytes + bytes > MAXIMUM_RETAINED_TEXT_BYTES) throw new ElfVersionWorkFailure("structure", MAXIMUM_RETAINED_TEXT_BYTES, "ELF version name decoding exceeds its 16 MiB cache allowance; remaining version names are unknown");
				cacheBytes += bytes;
			};
			const readName = (names, offset) => {
				const key = `${String(names.byteOffset)}:${String(names.length)}:${String(offset)}`;
				const cached = decodedNames.get(key);
				if (cached !== undefined) {
					if ("failure" in cached) throw cached.failure;
					return cached.value;
				}
				let raw;
				try {
					raw = readElfStringBytes(names, offset);
				} catch (cause) {
					if (!isBinaryFormatOrStringLimitFailure(cause)) throw cause;
					chargeCache(4096);
					decodedNames.set(key, { failure: cause });
					throw cause;
				}
				chargeCache(512 + raw.length * 6);
				const value = raw.length === 0 ? null : decodeElfExportName(raw);
				decodedNames.set(key, { value });
				return value;
			};
			return readName;
		};
		versionSection = (byType, type, label, issues) => {
			const selected = uniqueKeyed(byType, type);
			if (selected.ok) return selected.value;
			const [first] = allKeyed(byType, type);
			issues.push({
				code: "version_unresolved",
				location: hex(first.offset),
				message: `${label}: the ELF declares ${String(selected.error.ordinals.length)} sections of this type, so none was read`
			});
			return null;
		};
		parseNativeExports = (bytes, artifact) => finishExports(parseNativeExportsSteps(bytes, artifact));
		parseNativeExportsCooperative = async (bytes, artifact, pause) => {
			if (!hasElfMagic(bytes)) return parseNativeExports(bytes, artifact);
			const directory = await readElfDirectoryFromBufferCooperative(bytes, pause, OPERATION);
			const steps = parseElfExportsFromDirectorySteps(bytes, artifact, directory);
			let step = steps.next();
			while (!step.done) {
				await pause();
				step = steps.next();
			}
			return step.value;
		};
		finishExports = (steps) => {
			let step = steps.next();
			while (!step.done) step = steps.next();
			return step.value;
		};
	})))();
}

//#endregion
export { NATIVE_EXPORT_LIMITS, init_nativeExportParser, parseElfExportsFromDirectorySteps, parseNativeExports, parseNativeExportsCooperative };