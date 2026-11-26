import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, decodeLimit, init_parseFailure } from "./jsonSerialization-DAF9DVXC.js";
import { ZstandardFrameAllowanceError, init_zstandardFrameAllowance, projectZstandardFrameAllowance, zstandardWorkLimitFacts } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryFormatFailure, BinaryReader, BinaryResourceFailure, declaredFileRange, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { PE_COFF_FRAME_BYTES, init_dosMz, init_peCoffHeader, init_peOptionalHeader, mzWindowsHeaderLayoutLimitation, observePeCoffFrame, parseMzHeaderEvidence, readPeOptionalHeaderStructure } from "./peOptionalHeader-DrZ2zQO-.js";
import { init_peSectionHeader, peSectionTableExtent, readPeSectionHeader } from "./peSectionHeader-CdESy7pO.js";
import { elfFixedHeaderWidth, init_elfFixedHeader } from "./elfFixedHeader-D38fsdBg.js";
import { init_elfProgramHeader, readElfProgramHeader } from "./elfRawTableDeclarations-Cgbp6HKT.js";
import { elfStringTableText, init_elfStringTable, observeElfStringTableEntry } from "./elfStringTable-tJEHn-H2.js";
import { init_elfDeclaredRanges, init_elfSectionHeader, readElfSectionHeader, readElfTableDeclarations, validateElfDeclaredRanges } from "./elfDeclaredRanges-BSLGQklL.js";
import { init_nodeCodecResult, nodeCodecResult } from "./nodeCodecResult-Ky56xTop.js";
import { decodeZstandardFrames, decodeZstandardFramesCooperative, init_zstandardExactFrame } from "./zstandardExactFrame-DU_U6T0l.js";
import { inflateSync } from "node:zlib";

//#region dist/domain/native/elfCompressedSection.js
var SHF_COMPRESSED, ELFCOMPRESS_ZLIB, ELFCOMPRESS_ZSTD, readElfCompressedSectionHeader, prepareElfCompressedSection, zstdDecodeOptions, finishInflated, decodeElfCompressedSection, decodeElfCompressedSectionCooperative, decodeElfGnuZlibSection, zstdSectionFailure, inflateDeclared;
function init_elfCompressedSection() {
	return (init_elfCompressedSection = __esmMin((() => {
		init_binaryContainer();
		init_nodeCodecResult();
		init_zstandardExactFrame();
		init_zstandardFrameAllowance();
		SHF_COMPRESSED = 2048n;
		ELFCOMPRESS_ZLIB = 1;
		ELFCOMPRESS_ZSTD = 2;
		readElfCompressedSectionHeader = (bytes, flags, bits, little, subject) => {
			if ((flags & SHF_COMPRESSED) === 0n) return { state: "uncompressed" };
			const headerBytes = bits === 64 ? 24 : 12;
			if (bytes.length < headerBytes) return {
				state: "malformed",
				message: `${subject} header is truncated`
			};
			const reader = new BinaryReader(bytes, little, "elf");
			const compressionType = reader.u32(0);
			if (compressionType !== ELFCOMPRESS_ZLIB && compressionType !== ELFCOMPRESS_ZSTD) return {
				state: "unsupported",
				compressionType
			};
			const declaredSize = reader.word(bits === 64 ? 8 : 4, bits);
			const alignment = reader.word(bits === 64 ? 16 : 8, bits);
			if ((alignment & alignment - 1n) !== 0n) return {
				state: "malformed",
				message: `${subject} has an invalid decoded alignment`
			};
			return {
				state: "compressed",
				compressionType,
				declaredSize,
				headerBytes
			};
		};
		prepareElfCompressedSection = (bytes, flags, bits, little, maximumDecodedBytes, subject) => {
			const header = readElfCompressedSectionHeader(bytes, flags, bits, little, subject);
			if (header.state === "uncompressed") return {
				state: "available",
				bytes,
				compressed: false,
				compression: "none",
				inflatedBytes: 0
			};
			if (header.state === "malformed") return {
				...header,
				inflatedBytes: 0
			};
			if (header.state === "unsupported") return header;
			const { compressionType, declaredSize, headerBytes } = header;
			if (declaredSize > BigInt(maximumDecodedBytes)) return {
				state: "limit",
				requiredBytes: declaredSize,
				maximumBytes: maximumDecodedBytes
			};
			return {
				state: "payload",
				payload: bytes.subarray(headerBytes),
				declaredSize,
				compression: compressionType === ELFCOMPRESS_ZSTD ? "zstd" : "zlib"
			};
		};
		zstdDecodeOptions = (expected) => ({
			maxOutputLength: Math.max(1, expected),
			windowLogMax: 27
		});
		finishInflated = (decoded, expected, compression, subject, inflatedBytes) => {
			if (decoded.length !== expected) return {
				state: "malformed",
				message: `${subject} size is inconsistent`,
				inflatedBytes
			};
			return {
				state: "available",
				bytes: decoded,
				compressed: true,
				compression,
				inflatedBytes
			};
		};
		decodeElfCompressedSection = (bytes, flags, bits, little, maximumDecodedBytes, subject) => {
			const prepared = prepareElfCompressedSection(bytes, flags, bits, little, maximumDecodedBytes, subject);
			if (prepared.state !== "payload") return prepared;
			return inflateDeclared(prepared.payload, prepared.declaredSize, prepared.compression, subject);
		};
		decodeElfCompressedSectionCooperative = async (bytes, flags, bits, little, maximumDecodedBytes, subject, pause) => {
			const prepared = prepareElfCompressedSection(bytes, flags, bits, little, maximumDecodedBytes, subject);
			if (prepared.state !== "payload") return prepared;
			if (prepared.compression !== "zstd") return inflateDeclared(prepared.payload, prepared.declaredSize, prepared.compression, subject);
			const expected = Number(prepared.declaredSize);
			const inflatedBytes = Math.max(expected, prepared.payload.length);
			const result = await decodeZstandardFramesCooperative(prepared.payload, zstdDecodeOptions(expected), pause);
			if (!result.ok) return zstdSectionFailure(result, subject, inflatedBytes);
			return finishInflated(result.bytes, expected, "zstd", subject, inflatedBytes);
		};
		decodeElfGnuZlibSection = (bytes, maximumDecodedBytes, subject) => {
			if (bytes.length < 12 || bytes.subarray(0, 4).toString("latin1") !== "ZLIB") return {
				state: "malformed",
				message: `${subject} is not a GNU ZLIB compressed section`,
				inflatedBytes: 0
			};
			const declaredSize = new BinaryReader(bytes, false, "elf").word(4, 64);
			if (declaredSize > BigInt(maximumDecodedBytes)) return {
				state: "limit",
				requiredBytes: declaredSize,
				maximumBytes: maximumDecodedBytes
			};
			return inflateDeclared(bytes.subarray(12), declaredSize, "zlib", subject);
		};
		zstdSectionFailure = (result, subject, inflatedBytes) => {
			if (result.reason === "invalid_allowance" && result.configuration) return {
				state: "configuration",
				error: result.configuration,
				inflatedBytes
			};
			if (result.reason === "work_limit") return {
				state: "work_limit",
				...zstandardWorkLimitFacts({
					maxFrames: result.value ?? 0,
					source: result.source ?? "default"
				}),
				offset: result.offset,
				inflatedBytes
			};
			if (result.reason === "output_limit") return {
				state: "malformed",
				reason: "output_limit",
				offset: result.offset,
				message: `${subject} size is inconsistent`,
				inflatedBytes
			};
			return {
				state: "malformed",
				reason: result.reason,
				offset: result.offset,
				...result.code === undefined ? {} : { code: result.code },
				message: `${subject} could not be decompressed: ${result.detail ?? result.code ?? result.reason}`,
				inflatedBytes
			};
		};
		inflateDeclared = (payload, declaredSize, compression, subject) => {
			const expected = Number(declaredSize);
			const inflatedBytes = Math.max(expected, payload.length);
			let decoded;
			try {
				const maxOutputLength = Math.max(1, expected);
				if (compression === "zstd") {
					const result = decodeZstandardFrames(payload, zstdDecodeOptions(expected));
					if (!result.ok) return zstdSectionFailure(result, subject, inflatedBytes);
					decoded = result.bytes;
				} else {
					const result = nodeCodecResult(inflateSync(payload, {
						info: true,
						maxOutputLength
					}));
					if (result.consumedBytes !== payload.length) return {
						state: "malformed",
						message: `${subject} has bytes after its zlib stream`,
						inflatedBytes
					};
					decoded = result.buffer;
				}
			} catch (cause) {
				return {
					state: "malformed",
					inflatedBytes,
					message: `${subject} could not be decompressed: ${cause instanceof Error ? cause.message : "invalid compressed data"}`
				};
			}
			return finishInflated(decoded, expected, compression, subject, inflatedBytes);
		};
	})))();
}

//#endregion
//#region dist/domain/native/elfSectionNameTable.js
var SUBJECT, SECTION_NAME_BUDGET_LIMIT, elfSectionNameBudgetFailure, elfSectionNameBudget, decodeElfSectionNameTable, decodeElfSectionNameTableCooperative, decodeElfSectionNameRequest, decodeElfSectionNameRequestCooperative, sharedElfSectionNameDecoder;
function init_elfSectionNameTable() {
	return (init_elfSectionNameTable = __esmMin((() => {
		init_parseFailure();
		init_elfCompressedSection();
		SUBJECT = "ELF compressed section-name table";
		SECTION_NAME_BUDGET_LIMIT = "max_file_bytes";
		elfSectionNameBudgetFailure = (required, selected) => decodeLimit("elf", `ELF source and decoded section names require ${String(required)} bytes, above the selected max_file_bytes (${String(selected)}).`, {
			name: SECTION_NAME_BUDGET_LIMIT,
			maximum: selected,
			required
		});
		elfSectionNameBudget = (cause) => {
			if (!(cause instanceof ParseFailureError) || cause.failure.kind !== "limit" || cause.failure.format !== "elf" || cause.failure.limit.name !== SECTION_NAME_BUDGET_LIMIT) return undefined;
			const { maximum, required } = cause.failure.limit;
			return required === undefined ? undefined : {
				selected: maximum,
				required: BigInt(required),
				detail: cause.failure.detail
			};
		};
		decodeElfSectionNameTable = (bytes, flags, bits, little, maximumDecodedBytes) => decodeElfCompressedSection(bytes, flags, bits, little, maximumDecodedBytes, SUBJECT);
		decodeElfSectionNameTableCooperative = (bytes, flags, bits, little, maximumDecodedBytes, pause) => decodeElfCompressedSectionCooperative(bytes, flags, bits, little, maximumDecodedBytes, SUBJECT, pause);
		decodeElfSectionNameRequest = (request) => decodeElfSectionNameTable(request.raw, request.flags, request.bits, request.little, request.maximumDecodedBytes);
		decodeElfSectionNameRequestCooperative = (request, pause) => decodeElfSectionNameTableCooperative(request.raw, request.flags, request.bits, request.little, request.maximumDecodedBytes, pause);
		sharedElfSectionNameDecoder = (pause) => {
			let admitted;
			return async (request) => {
				if (admitted !== undefined) {
					const { request: previous, decoded } = admitted;
					if (request.raw.buffer === previous.raw.buffer && request.raw.byteOffset === previous.raw.byteOffset && request.raw.byteLength === previous.raw.byteLength && request.bits === previous.bits && request.little === previous.little && request.flags === previous.flags && (decoded.state === "unsupported" || !decoded.compressed || decoded.bytes.length <= request.maximumDecodedBytes)) return decoded;
				}
				const decoded = await decodeElfSectionNameRequestCooperative(request, pause);
				if (decoded.state === "available" || decoded.state === "unsupported") admitted = {
					request,
					decoded
				};
				return decoded;
			};
		};
	})))();
}

//#endregion
//#region dist/domain/native/nativeSectionDirectory.js
/** One ELF interpretation for in-memory images and bounded descriptor-backed inspections. */
function* readElfSectionDirectory(fileSize, maximumSourceAndDecodedNamesBytes) {
	const prefix = yield request(fileSize, 0n, 16n);
	const headerSize = elfFixedHeaderWidth(prefix[4] === 1 ? 32 : 64);
	const bytes = yield request(fileSize, 0n, BigInt(headerSize));
	const parsed = yield* readElfTableDeclarations(bytes, fileSize);
	if (!parsed.ok) return reject(parsed.error);
	const { header, programs, sections: sectionTable } = parsed.value;
	const { elfClass: bits, byteOrder, machine } = header;
	const little = byteOrder === "little";
	const { offset: program_offset, width: program_width, count: program_count } = programs;
	const { offset: sectionOffset, width: sectionWidth, count, namesIndex } = sectionTable;
	const programDeclarations = [];
	if (program_count !== 0) {
		const programBytes = yield request(fileSize, program_offset, BigInt(program_count) * BigInt(program_width));
		for (let index = 0; index < program_count; index++) {
			const at = index * program_width;
			const parsedProgram = readElfProgramHeader(programBytes.subarray(at, at + program_width), bits, little);
			if (!parsedProgram.ok) return reject(parsedProgram.error.message);
			const program = parsedProgram.value;
			const { type } = program;
			const header_offset = exact(program_offset) + at;
			const span = {
				header_offset,
				flags: program.flags,
				file_offset: program.offset,
				virtual_address: program.virtualAddress,
				file_size: program.fileSize,
				memory_size: program.memorySize,
				alignment: program.alignment
			};
			if (type === 1) programDeclarations.push({
				type,
				...span
			});
			else if (type === 2) programDeclarations.push({
				type,
				header_offset,
				offset: program.offset,
				size: program.fileSize
			});
			else if (type === 4) programDeclarations.push({
				type: 4,
				...span
			});
			else if (type === 3) programDeclarations.push({
				type: 3,
				...span
			});
			else if (type === 1685382480) programDeclarations.push({
				type: ELF_PT_GNU_EH_FRAME,
				...span
			});
			else if (type === 1685382481) programDeclarations.push({
				type: ELF_PT_GNU_STACK,
				...span
			});
			else if (type === 1685382482) programDeclarations.push({
				type: ELF_PT_GNU_RELRO,
				...span
			});
			else if (type === 1685382483) programDeclarations.push({
				type: ELF_PT_GNU_PROPERTY,
				...span
			});
		}
	}
	const sections = [];
	let section_names_limitation;
	if (count !== 0) {
		const table = yield request(fileSize, sectionOffset, BigInt(count) * BigInt(sectionWidth));
		let names = null;
		if (namesIndex !== 0) {
			const h = namesIndex * sectionWidth;
			const parsedNames = readElfSectionHeader(table.subarray(h, h + sectionWidth), bits, little);
			if (!parsedNames.ok) return reject(parsedNames.error.message);
			const namesSection = parsedNames.value;
			if (namesSection.type !== 3) reject("ELF section name table is not a string table");
			const rawNames = yield request(fileSize, namesSection.offset, namesSection.size);
			const structuralRemaining = Math.max(0, STRUCTURE_BYTES - rawNames.length);
			const callerRemaining = maximumSourceAndDecodedNamesBytes === undefined ? structuralRemaining : Math.max(0, maximumSourceAndDecodedNamesBytes - fileSize);
			let decoded;
			const sectionNames = {
				raw: rawNames,
				flags: namesSection.flags,
				bits,
				little,
				maximumDecodedBytes: Math.min(structuralRemaining, callerRemaining)
			};
			yield {
				offset: 0,
				size: 0,
				sectionNames,
				fulfillSectionNames: (result) => {
					decoded = result;
				}
			};
			const admitted = requireSectionNames(decoded);
			if (admitted.state === "malformed") return reject(admitted.message);
			if (admitted.state === "configuration") throw admitted.error;
			if (admitted.state === "work_limit") throw new ZstandardFrameAllowanceError({
				maxFrames: admitted.value,
				source: admitted.source
			}, admitted.offset);
			if (admitted.state === "limit" && maximumSourceAndDecodedNamesBytes !== undefined && admitted.requiredBytes > BigInt(callerRemaining)) throw elfSectionNameBudgetFailure(BigInt(fileSize) + admitted.requiredBytes, maximumSourceAndDecodedNamesBytes);
			if (admitted.state === "limit") throw new BinaryResourceFailure("structure", STRUCTURE_BYTES, `Decoded ELF section names require ${String(admitted.requiredBytes)} bytes, above the ${String(structuralRemaining)}-byte remaining structural budget`, "structure", "bytes");
			if (admitted.state === "unsupported") section_names_limitation = `ELF section names are unavailable because compression type ${String(admitted.compressionType)} is unsupported`;
			else names = admitted.bytes;
		} else if (count > 1) {
			section_names_limitation = "ELF section names are unavailable because no section-name string table is declared";
		}
		const decodedNames = new Map();
		let nameBytes = 0;
		for (let index = 0; index < count; index++) {
			const h = index * sectionWidth;
			const parsedSection = readElfSectionHeader(table.subarray(h, h + sectionWidth), bits, little);
			if (!parsedSection.ok) return reject(parsedSection.error.message);
			const section = parsedSection.value;
			const nameOffset = section.nameOffset;
			let name = null;
			let name_state = "unavailable";
			if (names !== null) {
				let decoded = decodedNames.get(nameOffset);
				if (decoded === undefined) {
					const observed = observeElfStringTableEntry(names, nameOffset, 65536);
					nameBytes += observed.examinedBytes;
					if (nameBytes > STRUCTURE_BYTES) throw new BinaryResourceFailure("structure", STRUCTURE_BYTES, "Decoded ELF section names exceed the 16 MiB structural budget", "structure", "bytes");
					decoded = {
						name: elfStringTableText(observed),
						state: observed.state === "terminated" ? "known" : observed.state === "outside" ? "unavailable" : "truncated"
					};
					if (observed.state === "outside") section_names_limitation ??= "ELF section names are incomplete because a name offset is outside its string table";
					else if (observed.state === "truncated") section_names_limitation ??= "ELF section names are unavailable because a name is not NUL-terminated";
					if (observed.state !== "outside") decodedNames.set(nameOffset, decoded);
				}
				name_state = decoded.state;
				name = decoded.name;
			}
			const { type, offset, size } = section;
			sections.push({
				index,
				name,
				name_state,
				header_offset: exact(sectionOffset) + h,
				offset,
				size,
				address: section.address,
				type,
				flags: section.flags,
				link: section.link,
				info: section.info,
				entry_size: section.entrySize,
				alignment: section.alignment,
				file_backed: type !== 8 && declaredFileRange(fileSize, offset, size).file_backed,
				compressed: section.compressed
			});
		}
	}
	return {
		format: "elf",
		elf_os_abi: header.osAbi,
		elf_type: header.type,
		bits,
		little,
		machine,
		flags: header.flags,
		...section_names_limitation === undefined ? {} : { section_names_limitation },
		programs: programDeclarations,
		sections
	};
}
function* readPeSectionDirectory(fileSize) {
	const dos = new BinaryReader(yield request(fileSize, 0n, 64n), true, "pe");
	if (dos.u16(0) !== 23117) reject("Missing DOS MZ header");
	const evidence = parseMzHeaderEvidence(dos.bytes, fileSize);
	const observed = evidence.windowsHeader;
	if (observed.state === "absent" || observed.state === "header-needed") return reject("MZ header does not declare a PE image");
	if (observed.state === "declared" && observed.signature === "PE") {
		const limitation = mzWindowsHeaderLayoutLimitation(observed);
		if (limitation !== undefined) throw new BinaryFormatFailure("unsupported", limitation);
	}
	const pe = observed.offset;
	request(fileSize, BigInt(pe), BigInt(PE_COFF_FRAME_BYTES));
	const frame = yield* observePeCoffFrame(dos.bytes, fileSize, evidence);
	if (frame.kind !== "pe") return reject("PE signature is invalid");
	const limitation = mzWindowsHeaderLayoutLimitation(frame.observation);
	if (limitation !== undefined) throw new BinaryFormatFailure("unsupported", limitation);
	const { coff: parsedCoff } = frame;
	if (!parsedCoff.ok) return reject(parsedCoff.error.message);
	const { sectionCount: count, optionalHeaderSize: optionalSize, machine, characteristics, symbolTableOffset, symbolCount } = parsedCoff.value;
	const optional = readPeOptionalHeaderStructure(yield request(fileSize, BigInt(pe + PE_COFF_FRAME_BYTES), BigInt(optionalSize)));
	if (!optional.ok) {
		switch (optional.error.reason) {
			case "truncated-magic": return reject("16-bit field range is truncated or outside the file");
			case "unsupported-magic": throw new BinaryFormatFailure("unsupported", "Only PE32/PE32+ images are supported");
			case "truncated-fixed-fields":
			case "truncated-directory-table": return reject("PE optional header or data directories are truncated");
		}
	}
	const { bits } = optional.value;
	const { sectionTableOffset, sectionTableBytes } = peSectionTableExtent(pe + PE_COFF_FRAME_BYTES, optionalSize, count);
	const table = yield request(fileSize, BigInt(sectionTableOffset), BigInt(sectionTableBytes));
	const sections = [];
	for (let index = 0; index < count; index++) {
		const at = index * 40;
		const parsed = readPeSectionHeader(table.subarray(at, at + 40));
		if (!parsed.ok) return reject(parsed.error.message);
		const row = parsed.value;
		sections.push({
			index,
			name: row.name,
			name_state: "known",
			header_offset: sectionTableOffset + at,
			offset: BigInt(row.offset),
			size: BigInt(row.size),
			address: BigInt(row.virtual_address),
			type: 0,
			flags: BigInt(row.characteristics),
			link: 0,
			info: 0,
			entry_size: 0n,
			alignment: 1n,
			file_backed: declaredFileRange(fileSize, BigInt(row.offset), BigInt(row.size)).file_backed,
			compressed: false
		});
	}
	return {
		format: "pe",
		pe_symbol_table: {
			offset: symbolTableOffset,
			count: symbolCount
		},
		elf_os_abi: null,
		bits,
		little: true,
		machine,
		flags: characteristics,
		programs: [],
		sections
	};
}
var ELF_PT_NOTE, ELF_PT_INTERP, ELF_PT_GNU_EH_FRAME, ELF_PT_GNU_STACK, ELF_PT_GNU_RELRO, ELF_PT_GNU_PROPERTY, STRUCTURE_BYTES, reject, requireSectionNames, exact, request, resumeDirectoryStep, driveFromBuffer, driveElfDirectoryCooperative, projectDirectoryFrameAllowance, readElfDirectoryFromBuffer, readElfDirectoryFromBufferCooperative, assertElfDeclaredRangesFromBuffer;
function init_nativeSectionDirectory() {
	return (init_nativeSectionDirectory = __esmMin((() => {
		init_elfStringTable();
		init_dosMz();
		init_elfFixedHeader();
		init_elfSectionHeader();
		init_elfProgramHeader();
		init_peCoffHeader();
		init_peSectionHeader();
		init_elfDeclaredRanges();
		init_peOptionalHeader();
		init_binaryContainer();
		init_elfSectionNameTable();
		init_zstandardFrameAllowance();
		ELF_PT_NOTE = 4;
		ELF_PT_INTERP = 3;
		ELF_PT_GNU_EH_FRAME = 1685382480;
		ELF_PT_GNU_STACK = 1685382481;
		ELF_PT_GNU_RELRO = 1685382482;
		ELF_PT_GNU_PROPERTY = 1685382483;
		STRUCTURE_BYTES = 16 * 1024 * 1024;
		reject = (message) => {
			throw new BinaryFormatFailure("malformed", message);
		};
		requireSectionNames = (result) => {
			if (result === undefined) return reject("ELF section-name decode was not satisfied");
			return result;
		};
		exact = (value) => {
			if (value < 0n || value > BigInt(Number.MAX_SAFE_INTEGER)) reject("Native offset exceeds exact host precision");
			return Number(value);
		};
		request = (fileSize, offset, size) => {
			if (offset < 0n || size < 0n || offset > BigInt(fileSize) || size > BigInt(fileSize) - offset) reject("Native directory range is truncated or outside the file");
			if (size > BigInt(STRUCTURE_BYTES)) throw new BinaryResourceFailure("structure", STRUCTURE_BYTES, "Native directory exceeds the 16777216-byte (16 MiB) structural decoding budget. This release has no runtime override.", "structure", "bytes");
			return {
				offset: exact(offset),
				size: exact(size)
			};
		};
		resumeDirectoryStep = (bytes, step, names) => {
			if (step.sectionNames !== undefined && step.fulfillSectionNames !== undefined) {
				step.fulfillSectionNames(names(step.sectionNames));
				return Buffer.alloc(0);
			}
			return bytes.subarray(step.offset, step.offset + step.size);
		};
		driveFromBuffer = (bytes, steps) => {
			let next = steps.next();
			while (!next.done) {
				next = steps.next(resumeDirectoryStep(bytes, next.value, decodeElfSectionNameRequest));
			}
			return next.value;
		};
		driveElfDirectoryCooperative = async (bytes, decode, maximumSourceAndDecodedNamesBytes) => {
			const steps = readElfSectionDirectory(bytes.length, maximumSourceAndDecodedNamesBytes);
			let next = steps.next();
			while (!next.done) {
				const step = next.value;
				if (step.sectionNames !== undefined && step.fulfillSectionNames !== undefined) {
					step.fulfillSectionNames(await decode(step.sectionNames));
					next = steps.next(Buffer.alloc(0));
					continue;
				}
				next = steps.next(bytes.subarray(step.offset, step.offset + step.size));
			}
			return next.value;
		};
		projectDirectoryFrameAllowance = (operation, cause) => {
			if (cause instanceof ZstandardFrameAllowanceError) throw projectZstandardFrameAllowance(operation, cause);
			throw cause;
		};
		readElfDirectoryFromBuffer = (bytes, operation, maximumSourceAndDecodedNamesBytes) => {
			try {
				return driveFromBuffer(bytes, readElfSectionDirectory(bytes.length, maximumSourceAndDecodedNamesBytes));
			} catch (cause) {
				return projectDirectoryFrameAllowance(operation, cause);
			}
		};
		readElfDirectoryFromBufferCooperative = async (bytes, pause, operation, maximumSourceAndDecodedNamesBytes, decode = (request) => decodeElfSectionNameRequestCooperative(request, pause)) => {
			try {
				return await driveElfDirectoryCooperative(bytes, decode, maximumSourceAndDecodedNamesBytes);
			} catch (cause) {
				return projectDirectoryFrameAllowance(operation, cause);
			}
		};
		assertElfDeclaredRangesFromBuffer = (bytes) => {
			const checked = driveFromBuffer(bytes, validateElfDeclaredRanges(bytes.subarray(0, 64), bytes.length));
			if (!checked.ok) reject(checked.error);
		};
	})))();
}

//#endregion
export { ELF_PT_GNU_EH_FRAME, ELF_PT_GNU_PROPERTY, ELF_PT_GNU_RELRO, ELF_PT_GNU_STACK, assertElfDeclaredRangesFromBuffer, decodeElfCompressedSection, decodeElfCompressedSectionCooperative, decodeElfGnuZlibSection, decodeElfSectionNameRequest, decodeElfSectionNameRequestCooperative, elfSectionNameBudget, elfSectionNameBudgetFailure, init_elfCompressedSection, init_elfSectionNameTable, init_nativeSectionDirectory, readElfDirectoryFromBuffer, readElfDirectoryFromBufferCooperative, readElfSectionDirectory, readPeSectionDirectory, sharedElfSectionNameDecoder };