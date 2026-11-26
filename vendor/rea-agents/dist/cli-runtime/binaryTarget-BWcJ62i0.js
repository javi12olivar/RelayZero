import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_strictUtf8, isStrictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer, init_virtualFileMapping, resolveMappedFileOffset } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_dosMz, init_peCoffHeader, init_peOptionalHeader, mzWindowsHeaderLayoutLimitation, parseMzHeaderEvidence, readPeCoffHeader, readPeOptionalHeaderDirectory, readPeOptionalHeaderFixedFields, readPeOptionalHeaderStructure } from "./peOptionalHeader-DrZ2zQO-.js";
import { PE_CODEVIEW_PREFIX_BYTES, init_binaryTargetTypes } from "./binaryTargetTypes-CrE-Muhh.js";
import { init_machoCpuIdentity, machoCpuSubtypeBase, machoHostSubtypeRank } from "./machoCpuIdentity-B0Mlm3Ly.js";
import { MachoLoadCommandCursor, classifyFatContainerEvidence, decodePeMachine, init_machoContainer, init_machoLoadCommands, init_peMachine, readFatContainerHeader, readMachoHeaderPrefixFacts, readMachoLoadCommandTableHeader, readPeOptionalHeader, validateFatSliceIdentity } from "./machoLoadCommands-DCQgk7s-.js";
import { init_peSectionHeader, readPeSectionHeader } from "./peSectionHeader-CdESy7pO.js";
import { init_elfFixedHeader, readElfFixedHeader } from "./elfFixedHeader-D38fsdBg.js";

//#region dist/domain/binaryTarget.js
/** A CodeView declaration remains observable even when its payload has no usable file range. */
function* peCodeViewDirectoryEntries(directory, sectionTable, numberOfSections, sizeOfHeaders) {
	const reader = new BinaryReader(directory, true, "pe");
	for (let offset = 0; offset + 28 <= directory.length; offset += 28) {
		if (reader.u32(offset + 12) !== 2) continue;
		const declaredSize = reader.u32(offset + 16);
		if (declaredSize < 16) {
			yield {
				fileOffset: undefined,
				declaredSize
			};
			continue;
		}
		const rawPointer = reader.u32(offset + 24);
		const fileOffset = rawPointer !== 0 ? rawPointer : peRvaToFileOffset(reader.u32(offset + 20), sectionTable, numberOfSections, sizeOfHeaders, Math.min(declaredSize, PE_CODEVIEW_PREFIX_BYTES));
		yield {
			fileOffset,
			declaredSize
		};
	}
}
var PE_RECORD_HEADER_BYTES, MAX_PE_OPTIONAL_HEADER_BYTES, claimsExecutableHeader, parseExecutableHeader, readNativeHeaderFormat, walkMachoCommandFraming, CPU_TYPE_ARM64_32, parseThinMachO, validatedFatDeclarations, declaredFamilies, readFatArchitectureFamilies, parseFatMachO, selectHostFatSlice, fatSliceIdentityError, fatHostArchitecture, fatIdentityError, parseElf, parseMzExecutableMetadata, parsePeRecordStructure, parsePeRecordFacts, parseCodeViewData, decodeCodeViewPath, peDebugDirectoryEntry, peRvaToFileOffset, parsePeCodeViewFromBuffer, inspectPeCodeViewFromBuffer, machoBinaryArchitecture, machArchitecture;
function init_binaryTarget() {
	return (init_binaryTarget = __esmMin((() => {
		init_binaryContainer();
		init_virtualFileMapping();
		init_binaryTargetTypes();
		init_result();
		init_peOptionalHeader();
		init_peCoffHeader();
		init_peSectionHeader();
		init_strictUtf8();
		init_elfFixedHeader();
		init_dosMz();
		init_peMachine();
		init_machoContainer();
		init_machoCpuIdentity();
		init_machoLoadCommands();
		PE_RECORD_HEADER_BYTES = 24;
		MAX_PE_OPTIONAL_HEADER_BYTES = 4096;
		claimsExecutableHeader = (bytes, fileSize = bytes.length) => bytes.length >= 4 && (bytes.subarray(0, 4).equals(Buffer.from([
			127,
			69,
			76,
			70
		])) || readMachoHeaderPrefixFacts(bytes).format !== null) || bytes.length >= 2 && bytes[0] === 77 && bytes[1] === 90 || readFatContainerHeader(bytes, fileSize).state !== "not-fat";
		parseExecutableHeader = (bytes, hostArchitecture, fileSize = bytes.length, mzWindowsHeaderSignature, fatEvidence) => {
			if (bytes.length >= 4 && bytes.subarray(0, 4).equals(Buffer.from([
				127,
				69,
				76,
				70
			]))) return parseElf(bytes, fileSize);
			if (bytes.length >= 2 && bytes[0] === 77 && bytes[1] === 90) return parseMzExecutableMetadata(bytes, parseMzHeaderEvidence(bytes, fileSize, mzWindowsHeaderSignature));
			if (bytes.length < 8) return err("truncated or unsupported binary header");
			if (readMachoHeaderPrefixFacts(bytes).format !== null) return parseThinMachO(bytes, fileSize);
			const fatHeader = fatEvidence?.header ?? readFatContainerHeader(bytes, fileSize);
			if (fatHeader.state !== "not-fat") return parseFatMachO(bytes, hostArchitecture, fatHeader, fatEvidence);
			return err("unsupported binary format");
		};
		readNativeHeaderFormat = (bytes, fileSize = bytes.length) => {
			if (bytes.length >= 4 && bytes.subarray(0, 4).equals(Buffer.from([
				127,
				69,
				76,
				70
			]))) {
				const header = readElfFixedHeader(bytes, fileSize);
				return header.ok ? ok("elf") : header;
			}
			if (readMachoHeaderPrefixFacts(bytes).format === null) return ok(null);
			const table = readMachoLoadCommandTableHeader(bytes, fileSize);
			if (!table.ok) return table;
			if (table.value === null) return err("unsupported Mach-O header");
			const framing = walkMachoCommandFraming(bytes, table.value);
			return framing.ok ? ok("mach-o") : framing;
		};
		walkMachoCommandFraming = (bytes, table) => {
			const commands = new MachoLoadCommandCursor(table);
			while (commands.nextOffset !== null) {
				const offset = table.headerSize + commands.nextOffset;
				if (offset + 8 > bytes.length && commands.nextOffset + 8 <= table.commandBytes) return ok(null);
				const frame = commands.read(bytes.subarray(offset, offset + 8));
				if (!frame.ok) return frame;
			}
			return commands.finish();
		};
		CPU_TYPE_ARM64_32 = 33554444;
		parseThinMachO = (bytes, fileSize) => {
			const table = readMachoLoadCommandTableHeader(bytes, fileSize);
			if (!table.ok) return table;
			if (table.value === null) return err("unsupported binary format");
			const { identity } = table.value;
			const architecture = machoBinaryArchitecture(identity.cpuType);
			if (architecture === undefined) return err("unsupported Mach-O architecture");
			const framing = walkMachoCommandFraming(bytes, table.value);
			if (!framing.ok) return framing;
			if (architecture === "arm64_32") return ok({
				format: "mach-o",
				architecture,
				availableArchitectures: [architecture]
			});
			return ok({
				format: "mach-o",
				architecture,
				availableArchitectures: [architecture]
			});
		};
		validatedFatDeclarations = (bytes, header, fatEvidence) => {
			if (header.state === "needs-data") return err("truncated or invalid FAT architecture table");
			if (header.state === "malformed") return err(header.reason);
			const identityError = fatIdentityError(bytes, header, fatEvidence?.sliceHeadersByOffset);
			if (identityError !== null) return err(identityError);
			const sliceIdentityError = fatSliceIdentityError(bytes, header, fatEvidence?.sliceHeadersByOffset);
			if (sliceIdentityError !== null) return err(sliceIdentityError);
			return ok(header.slices.flatMap((declaration) => {
				const architecture = machArchitecture(declaration.cpuType);
				return architecture === undefined ? [] : [{
					architecture,
					offset: declaration.offset,
					size: declaration.size,
					cpuType: declaration.cpuType,
					cpuSubtype: declaration.cpuSubtype
				}];
			}));
		};
		declaredFamilies = (declarations) => [...new Set(declarations.map(({ architecture }) => architecture))];
		readFatArchitectureFamilies = (bytes, fileSize = bytes.length) => {
			const header = readFatContainerHeader(bytes, fileSize);
			if (header.state === "not-fat") return null;
			const declarations = validatedFatDeclarations(bytes, header);
			return declarations.ok ? ok(declaredFamilies(declarations.value)) : declarations;
		};
		parseFatMachO = (bytes, host, header, fatEvidence) => {
			const validated = validatedFatDeclarations(bytes, header, fatEvidence);
			if (!validated.ok) return validated;
			const declarations = validated.value;
			const preferred = fatHostArchitecture(host);
			const hostChoice = selectHostFatSlice(declarations, preferred);
			if (hostChoice?.ambiguous === true) return err(`FAT binary declares several ${preferred} slices; no slice was selected`);
			const hostSlice = hostChoice?.slice;
			const unambiguous = declarations.filter(({ architecture }) => declarations.filter((other) => other.architecture === architecture).length === 1);
			const candidates = hostSlice === undefined ? unambiguous : [hostSlice];
			const selected = candidates.find(({ architecture, size }) => size >= (architecture === "arm64" || architecture === "x86_64" ? 32 : 28));
			if (selected === undefined) {
				const first = candidates[0];
				if (first !== undefined) return err(`FAT slice for ${first.architecture} is shorter than its Mach-O header`);
				return err(declarations.length === 0 ? "FAT binary declares no supported Mach-O architecture" : `FAT binary has no ${host} slice and no foreign architecture declared exactly once`);
			}
			return ok({
				format: "mach-o-universal",
				architecture: selected.architecture,
				availableArchitectures: declaredFamilies(declarations),
				universalSlice: {
					offset: selected.offset,
					size: selected.size
				},
				universalSlices: header.state === "parsed" ? header.slices.map(({ offset, size, cpuType, cpuSubtype }) => ({
					offset,
					size,
					cpuType,
					cpuSubtype
				})) : []
			});
		};
		selectHostFatSlice = (declarations, preferred) => {
			if (preferred === undefined) return undefined;
			const hostSlices = declarations.filter(({ architecture }) => architecture === preferred);
			const only = hostSlices[0];
			if (hostSlices.length === 0 || only === undefined) return undefined;
			if (hostSlices.length === 1) return {
				slice: only,
				ambiguous: false
			};
			let bestRank = Number.POSITIVE_INFINITY;
			const winners = [];
			for (const slice of hostSlices) {
				const rank = machoHostSubtypeRank(slice.cpuType, slice.cpuSubtype);
				if (rank < bestRank) {
					bestRank = rank;
					winners.length = 0;
					winners.push(slice);
				} else if (rank === bestRank) winners.push(slice);
			}
			const first = winners[0];
			if (first === undefined) return { ambiguous: true };
			if (winners.length === 1) return {
				slice: first,
				ambiguous: false
			};
			const base = machoCpuSubtypeBase(first.cpuSubtype);
			if (winners.some((slice) => machoCpuSubtypeBase(slice.cpuSubtype) !== base)) return { ambiguous: true };
			const subtypes = new Set();
			for (const slice of winners) {
				if (subtypes.has(slice.cpuSubtype)) return { ambiguous: true };
				subtypes.add(slice.cpuSubtype);
			}
			if (subtypes.size < 2) return { ambiguous: true };
			return {
				slice: first,
				ambiguous: false
			};
		};
		fatSliceIdentityError = (bytes, header, sliceHeadersByOffset) => {
			for (let index = 0; index < header.slices.length; index += 1) {
				const declaration = header.slices[index];
				if (declaration === undefined || header.rangeIssues[index] !== null) continue;
				let facts;
				if (sliceHeadersByOffset?.has(declaration.offset)) {
					facts = sliceHeadersByOffset.get(declaration.offset);
				} else if (declaration.size >= 12 && declaration.offset <= bytes.length - 12) {
					facts = readMachoHeaderPrefixFacts(bytes.subarray(declaration.offset, declaration.offset + 12));
				}
				const identity = facts?.identity;
				if (identity === null || identity === undefined) return `FAT architecture ${declaration.index} thin Mach-O CPU identity is outside the bounded header`;
				const identityError = validateFatSliceIdentity(declaration, identity);
				if (identityError !== null) return identityError;
			}
			return null;
		};
		fatHostArchitecture = (host) => {
			switch (host) {
				case "arm64": return "arm64";
				case "x64": return "x86_64";
				case "ia32": return "x86";
				case "arm": return "arm";
				default: return undefined;
			}
		};
		fatIdentityError = (bytes, header, sliceHeadersByOffset) => {
			const identity = classifyFatContainerEvidence(header, bytes, sliceHeadersByOffset);
			if (identity.state === "needs-slice-header") return "FAT slice identity is outside the bounded prefix";
			if (identity.state === "not-mach-o") return "unsupported binary format";
			if (identity.state === "malformed") return identity.reason;
			return null;
		};
		parseElf = (bytes, fileSize) => {
			const fixedHeader = readElfFixedHeader(bytes, fileSize);
			if (!fixedHeader.ok) return fixedHeader;
			const { elfClass, byteOrder, architecture, machine, type, flags } = fixedHeader.value;
			if (architecture === null) return err(`unsupported ELF architecture: e_machine ${String(machine)}`);
			if (architecture === "mips" || architecture === "riscv" || architecture === "powerpc") {
				const metadata = {
					elfClass,
					byteOrder,
					type,
					flags
				};
				if (architecture === "powerpc") return ok({
					format: "elf",
					architecture,
					availableArchitectures: [architecture],
					powerpc: metadata
				});
				return architecture === "mips" ? ok({
					format: "elf",
					architecture,
					availableArchitectures: [architecture],
					mips: metadata
				}) : ok({
					format: "elf",
					architecture,
					availableArchitectures: [architecture],
					riscv: metadata
				});
			}
			if (architecture === "hexagon") return ok({
				format: "elf",
				architecture,
				availableArchitectures: [architecture]
			});
			if (architecture === "xtensa") return ok({
				format: "elf",
				architecture,
				availableArchitectures: [architecture]
			});
			return ok({
				format: "elf",
				architecture,
				availableArchitectures: [architecture]
			});
		};
		parseMzExecutableMetadata = (bytes, evidence) => {
			const { windowsHeader } = evidence;
			if (windowsHeader.state === "header-needed" || windowsHeader.state === "signature-needed") return err("Windows new-header pointer or signature is outside the bounded prefix");
			if (windowsHeader.state === "candidate") return err("MZ Windows new-header candidate is unresolved");
			if (windowsHeader.state === "declared") {
				const { offset } = windowsHeader;
				const limitation = mzWindowsHeaderLayoutLimitation(windowsHeader);
				if (limitation !== undefined) return err(limitation);
				if (offset > bytes.length - 24) return err("invalid or truncated Windows executable header in MZ image");
				if ([
					"NE",
					"LE",
					"LX"
				].includes(windowsHeader.signature)) return err(`unsupported ${windowsHeader.signature} executable in MZ image`);
				if (windowsHeader.signature !== "PE") return err("invalid or truncated Windows executable header in MZ image");
				const codeView = parsePeCodeViewFromBuffer(bytes, offset);
				const parsed = parsePeRecordFacts(bytes.subarray(offset), codeView);
				return parsed.ok ? ok(parsed.value.metadata) : parsed;
			}
			const parsed = evidence.dos;
			return parsed.ok ? ok({
				format: "dos-mz",
				architecture: "x86",
				availableArchitectures: ["x86"]
			}) : parsed;
		};
		parsePeRecordStructure = (record) => {
			if (record.length < 24) return err({
				kind: "incomplete",
				requiredBytes: 24,
				message: "invalid or truncated PE header"
			});
			if (record.toString("binary", 0, 4) !== "PE\0\0") return err({
				kind: "malformed",
				message: "invalid or truncated PE header"
			});
			const coff = readPeCoffHeader(record.subarray(4, 24));
			if (!coff.ok) return err({
				kind: "malformed",
				message: "invalid or truncated PE header"
			});
			const { machine, optionalHeaderSize, characteristics } = coff.value;
			if (optionalHeaderSize > 4096) return err({
				kind: "malformed",
				message: "invalid or truncated PE optional header"
			});
			const declaredEnd = 24 + optionalHeaderSize;
			if (record.length < declaredEnd) return err({
				kind: "incomplete",
				requiredBytes: declaredEnd,
				message: "invalid or truncated PE optional header"
			});
			const optionalHeader = record.subarray(24, declaredEnd);
			const parsed = readPeOptionalHeaderStructure(optionalHeader);
			if (!parsed.ok) return err({
				kind: "malformed",
				message: parsed.error.message
			});
			return ok({
				machine,
				characteristics,
				optionalHeader
			});
		};
		parsePeRecordFacts = (record, codeView) => {
			const structure = parsePeRecordStructure(record);
			if (!structure.ok) return err(structure.error.message);
			const { machine: machineType, characteristics, optionalHeader } = structure.value;
			const machine = decodePeMachine(machineType);
			if (machine === undefined) return err(`unsupported PE architecture (COFF machine 0x${machineType.toString(16).padStart(4, "0")})`);
			const facts = readPeOptionalHeader(optionalHeader, machineType);
			if (!facts.ok) return err(facts.error.message);
			if (facts.value.machine === null) return err("unsupported PE architecture");
			const { architecture } = facts.value.machine;
			return ok({
				optionalHeader: facts.value,
				metadata: {
					format: "pe",
					peMachine: machineType,
					architecture,
					availableArchitectures: [architecture],
					executableRole: (characteristics & 2) === 0 ? "non-executable" : (characteristics & 8192) === 0 ? "application" : "shared-library",
					managed: facts.value.managed,
					...codeView !== undefined ? { codeView } : {}
				}
			});
		};
		parseCodeViewData = (buffer, sizeOfData) => {
			if (sizeOfData < 16 || buffer.length < 16) return undefined;
			const magic = buffer.subarray(0, 4).toString("binary");
			const pathOffset = magic === "RSDS" ? 24 : magic === "NB10" ? 16 : undefined;
			if (pathOffset === undefined || sizeOfData <= pathOffset || buffer.length <= pathOffset) return undefined;
			const end = buffer.subarray(0, Math.min(sizeOfData, PE_CODEVIEW_PREFIX_BYTES)).indexOf(0, pathOffset);
			if (end <= pathOffset) return undefined;
			const reader = new BinaryReader(buffer, true, "pe");
			const path = decodeCodeViewPath(buffer.subarray(pathOffset, end), magic);
			if (magic === "RSDS") {
				const part1 = reader.u32(4).toString(16).padStart(8, "0");
				const part2 = reader.u16(8).toString(16).padStart(4, "0");
				const part3 = reader.u16(10).toString(16).padStart(4, "0");
				const part4 = buffer.subarray(12, 14).toString("hex");
				const part5 = buffer.subarray(14, 20).toString("hex");
				const guid = `${part1}-${part2}-${part3}-${part4}-${part5}`;
				const age = reader.u32(20);
				return {
					...path,
					guid,
					age
				};
			}
			return {
				...path,
				guid: null,
				age: reader.u32(12)
			};
		};
		decodeCodeViewPath = (bytes, magic) => {
			const textAvailable = magic === "RSDS" ? isStrictUtf8(bytes) : bytes.every((byte) => byte < 128);
			if (!textAvailable) return {
				pdbPath: null,
				pdbFileName: null,
				pdbPathBytesHex: bytes.toString("hex")
			};
			const pdbPath = bytes.toString("utf8");
			return {
				pdbPath,
				pdbFileName: pdbPath.split(/[/\\]/u).at(-1) ?? pdbPath
			};
		};
		peDebugDirectoryEntry = (optionalHeader) => {
			const fixed = readPeOptionalHeaderFixedFields(optionalHeader);
			if (!fixed.ok) return undefined;
			const observed = readPeOptionalHeaderDirectory(optionalHeader, fixed.value, 6);
			if (observed.state !== "present") return undefined;
			const { address: debugRva, size: debugSize } = observed.directory;
			if (debugRva === 0 || debugSize < 28) return undefined;
			return {
				debugRva,
				debugSize,
				sizeOfHeaders: fixed.value.sizeOfHeaders
			};
		};
		peRvaToFileOffset = (rva, sectionTable, numberOfSections, sizeOfHeaders, size = 1) => {
			const mappings = [{
				address: 0n,
				offset: 0,
				size: sizeOfHeaders
			}];
			const zeroFills = [];
			for (let index = 0; index < numberOfSections; index += 1) {
				const offset = index * 40;
				const parsed = readPeSectionHeader(sectionTable.subarray(offset, offset + 40));
				if (!parsed.ok) return undefined;
				const section = parsed.value;
				const address = BigInt(section.virtual_address);
				if (section.raw_size > 0) mappings.push({
					address,
					offset: section.offset,
					size: section.raw_size
				});
				if (section.virtual_size > section.raw_size) zeroFills.push({
					address: address + BigInt(section.raw_size),
					size: BigInt(section.virtual_size - section.raw_size)
				});
			}
			const mapped = resolveMappedFileOffset(mappings, BigInt(rva), size, zeroFills);
			return mapped.ok ? mapped.value : undefined;
		};
		parsePeCodeViewFromBuffer = (fileBytes, peOffset) => {
			const result = inspectPeCodeViewFromBuffer(fileBytes, peOffset);
			return result.ok ? result.value : undefined;
		};
		inspectPeCodeViewFromBuffer = (fileBytes, peOffset) => {
			const incomplete = (message) => err({
				kind: "incomplete",
				message
			});
			if (fileBytes.length < peOffset + 24) return incomplete("Truncated PE header.");
			const coff = readPeCoffHeader(fileBytes.subarray(peOffset + 4, peOffset + 24));
			if (!coff.ok) return incomplete(coff.error.message);
			const { sectionCount: numberOfSections, optionalHeaderSize } = coff.value;
			if (optionalHeaderSize > 4096 || fileBytes.length < peOffset + 24 + optionalHeaderSize) return incomplete("PE optional header is truncated or exceeds the parsing allowance.");
			const optionalHeader = fileBytes.subarray(peOffset + 24, peOffset + 24 + optionalHeaderSize);
			const fixed = readPeOptionalHeaderFixedFields(optionalHeader);
			if (!fixed.ok) return incomplete(fixed.error.message);
			const observed = readPeOptionalHeaderDirectory(optionalHeader, fixed.value, 6);
			if (observed.state === "absent") return ok(undefined);
			if (observed.state !== "present") return incomplete("Truncated PE debug directory declaration.");
			const { address: debugRva, size: debugSize } = observed.directory;
			if (debugRva === 0 && debugSize === 0) return ok(undefined);
			if (debugRva === 0 || debugSize < 28 || debugSize % 28 !== 0) return incomplete("Invalid PE debug directory declaration.");
			const debugDir = {
				debugRva,
				debugSize,
				sizeOfHeaders: fixed.value.sizeOfHeaders
			};
			const sectionTableOffset = peOffset + 24 + optionalHeaderSize;
			const sectionTableSize = numberOfSections * 40;
			if (fileBytes.length < sectionTableOffset + sectionTableSize) return incomplete("Truncated PE section table.");
			const sectionTable = fileBytes.subarray(sectionTableOffset, sectionTableOffset + sectionTableSize);
			const debugFileOffset = peRvaToFileOffset(debugDir.debugRva, sectionTable, numberOfSections, debugDir.sizeOfHeaders, Math.min(debugDir.debugSize, 4096));
			if (debugFileOffset === undefined || fileBytes.length < debugFileOffset + debugDir.debugSize) return incomplete("PE debug directory is unmapped or truncated.");
			const maxDebugBytes = Math.min(debugDir.debugSize, fileBytes.length - debugFileOffset);
			const directory = fileBytes.subarray(debugFileOffset, debugFileOffset + maxDebugBytes);
			let sawCodeView = false;
			for (const { fileOffset: pointerToRawData, declaredSize: sizeOfData } of peCodeViewDirectoryEntries(directory, sectionTable, numberOfSections, debugDir.sizeOfHeaders)) {
				sawCodeView = true;
				if (pointerToRawData === undefined || fileBytes.length < pointerToRawData + Math.min(sizeOfData, 24)) continue;
				const codeViewData = fileBytes.subarray(pointerToRawData, pointerToRawData + Math.min(sizeOfData, PE_CODEVIEW_PREFIX_BYTES));
				const parsed = parseCodeViewData(codeViewData, sizeOfData);
				if (parsed !== undefined) return ok(parsed);
			}
			return sawCodeView ? incomplete("PE CodeView records could not be decoded completely.") : ok(undefined);
		};
		machoBinaryArchitecture = (cpu) => cpu === CPU_TYPE_ARM64_32 ? "arm64_32" : machArchitecture(cpu);
		machArchitecture = (cpu) => {
			switch (cpu) {
				case 7: return "x86";
				case 16777223: return "x86_64";
				case 12: return "arm";
				case 16777228: return "arm64";
			}
			return undefined;
		};
	})))();
}

//#endregion
export { MAX_PE_OPTIONAL_HEADER_BYTES, claimsExecutableHeader, init_binaryTarget, inspectPeCodeViewFromBuffer, machoBinaryArchitecture, parseCodeViewData, parseExecutableHeader, parseMzExecutableMetadata, parsePeRecordFacts, parsePeRecordStructure, peCodeViewDirectoryEntries, peDebugDirectoryEntry, peRvaToFileOffset, readFatArchitectureFamilies, readNativeHeaderFormat };