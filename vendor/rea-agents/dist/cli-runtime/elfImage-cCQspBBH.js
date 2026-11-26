import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryFormatFailure, BinaryReader, declaredFileRange, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { init_dosMz, init_peCoffHeader, mzWindowsHeaderLayoutLimitation, parseMzHeaderEvidence, readPeCoffHeader } from "./peOptionalHeader-DrZ2zQO-.js";
import { init_peMachine, readPeOptionalHeader } from "./machoLoadCommands-DCQgk7s-.js";
import { init_peSectionHeader, peSectionTableExtent, readPeSectionHeader } from "./peSectionHeader-CdESy7pO.js";
import { elfArchitecture, init_elfFixedHeader } from "./elfFixedHeader-D38fsdBg.js";
import { admitElfLoadSegment, elfLoadSpans, init_elfProgramHeader } from "./elfRawTableDeclarations-Cgbp6HKT.js";
import { init_nativeSectionDirectory, readElfDirectoryFromBuffer, readElfDirectoryFromBufferCooperative } from "./nativeSectionDirectory-FUNOhzEu.js";

//#region dist/domain/native/peImage.js
var peHeaderOffset, peDeclaredFileMappings, readPeImage, peImageSection;
function init_peImage() {
	return (init_peImage = __esmMin((() => {
		init_peCoffHeader();
		init_peMachine();
		init_peSectionHeader();
		init_dosMz();
		init_binaryContainer();
		peHeaderOffset = (reader) => {
			const evidence = parseMzHeaderEvidence(reader.bytes);
			if (!evidence.declarations.ok) throw new BinaryFormatFailure("malformed", evidence.declarations.error);
			const { windowsHeader } = evidence;
			if (windowsHeader.state === "candidate") throw new BinaryFormatFailure("unsupported", "MZ Windows new-header candidate is unresolved");
			if (windowsHeader.state !== "declared") {
				const dos = evidence.dos;
				if (!dos.ok) throw new BinaryFormatFailure("malformed", dos.error);
				throw new BinaryFormatFailure("unsupported", "DOS MZ images are outside the supported ELF, PE and thin Mach-O formats");
			}
			const { offset: pe } = windowsHeader;
			const limitation = mzWindowsHeaderLayoutLimitation(windowsHeader);
			if (limitation !== undefined) throw new BinaryFormatFailure("unsupported", limitation);
			if ([
				"NE",
				"LE",
				"LX"
			].includes(windowsHeader.signature)) throw new BinaryFormatFailure("unsupported", `${windowsHeader.signature} images are outside the supported ELF, PE and thin Mach-O formats`);
			if (windowsHeader.signature !== "PE") throw new BinaryFormatFailure("malformed", "PE signature is invalid or overlaps the DOS header");
			reader.range(pe, 24, "PE signature and COFF header");
			return pe;
		};
		peDeclaredFileMappings = (image) => {
			const mappings = [image.pe_header_mapping];
			for (const section of image.sections) {
				if (!section.file_backed) continue;
				mappings.push({
					address: image.image_base + BigInt(section.virtual_address),
					offset: section.offset,
					size: section.size
				});
			}
			return mappings;
		};
		readPeImage = (bytes) => {
			const reader = new BinaryReader(bytes, true, "pe");
			const pe = peHeaderOffset(reader);
			const optional = pe + 24;
			const coff = readPeCoffHeader(bytes.subarray(pe + 4, pe + 24));
			if (!coff.ok) throw new BinaryFormatFailure(coff.error.kind, coff.error.message);
			const { machine, sectionCount: count, optionalHeaderSize: optionalSize } = coff.value;
			const optionalBytes = reader.range(optional, optionalSize, "PE optional header");
			const facts = readPeOptionalHeader(optionalBytes, machine);
			if (!facts.ok) throw new BinaryFormatFailure(facts.error.kind, facts.error.message);
			const dllCharacteristics = facts.value.dllCharacteristics;
			const { bits, dataDirectories, sizeOfHeaders, imageBase, sectionAlignment, fileAlignment } = facts.value;
			const headerMapping = {
				address: imageBase,
				offset: 0,
				size: Math.min(sizeOfHeaders, bytes.length)
			};
			const { sectionTableOffset, sectionTableBytes } = peSectionTableExtent(optional, optionalSize, count);
			const { offset: tableAt, size: tableSize } = reader.fileRange(BigInt(sectionTableOffset), BigInt(sectionTableBytes), "PE sections");
			const sectionTable = bytes.subarray(tableAt, tableAt + tableSize);
			const mappings = [];
			const executableMappings = [];
			const zeroFills = [];
			const sections = [];
			for (let index = 0; index < count; index++) {
				const entry = index * 40;
				const section = readPeSectionHeader(sectionTable.subarray(entry, entry + 40));
				if (!section.ok) throw new BinaryFormatFailure(section.error.kind, section.error.message);
				const { name: sectionName, virtual_size: virtualSize, virtual_address: virtualAddress, raw_size: size, offset, characteristics, size: contentSize } = section.value;
				sections.push(peImageSection({
					reader,
					name: sectionName,
					size: contentSize,
					offset,
					characteristics,
					virtualAddress,
					virtualSize,
					rawSize: size,
					fileAlignment
				}));
				const address = imageBase + BigInt(virtualAddress);
				if (address + BigInt(Math.max(size, virtualSize)) > 1n << BigInt(bits)) throw new BinaryFormatFailure("malformed", "PE section virtual address overflows its address width");
				const mapping = {
					...size === 0 ? {
						offset: 0,
						size: 0
					} : reader.fileRange(BigInt(offset), BigInt(size), "PE section"),
					address
				};
				if (size !== 0) {
					mappings.push(mapping);
					if ((characteristics & 536870912) !== 0) executableMappings.push({
						...mapping,
						size: contentSize
					});
				}
				if (virtualSize > size) zeroFills.push({
					address: address + BigInt(size),
					size: BigInt(virtualSize - size)
				});
			}
			const architecture = facts.value.machine?.architecture;
			return {
				format: "pe",
				image_base: imageBase,
				pe_machine: machine,
				pe_section_alignment: sectionAlignment,
				pe_file_alignment: fileAlignment,
				pe_data_directories: dataDirectories,
				pe_optional_header_file_offset: optional,
				dll_characteristics: dllCharacteristics,
				dll_characteristics_file_offset: optional + 70,
				pe_header_mapping: headerMapping,
				architecture: architecture === "x86" ? "386" : architecture === "x86_64" ? "amd64" : architecture ?? `pe-machine-${machine}`,
				bits,
				byte_order: "little",
				mappings,
				executable_mappings: executableMappings,
				zero_fills: zeroFills,
				sections
			};
		};
		peImageSection = ({ reader, name, size, offset, characteristics, virtualAddress, virtualSize, rawSize, fileAlignment }) => {
			const range = declaredFileRange(reader.bytes.length, BigInt(offset), BigInt(size));
			const readOnly = range.file_backed && (characteristics & 1073741824) !== 0 && (characteristics & 2147483648) === 0 && (characteristics & 536870912) === 0 && (characteristics & 64) !== 0;
			return {
				format: "pe",
				name,
				virtual_address: virtualAddress,
				virtual_size: virtualSize,
				raw_size: rawSize,
				raw_offset: offset,
				file_alignment: fileAlignment,
				characteristics,
				...range,
				read_only: readOnly,
				compressed: false
			};
		};
	})))();
}

//#endregion
//#region dist/domain/native/elfImage.js
var readElfImageFromDirectory, architectureForElfMachine, readElfImage, readElfImageCooperative;
function init_elfImage() {
	return (init_elfImage = __esmMin((() => {
		init_elfProgramHeader();
		init_binaryContainer();
		init_elfFixedHeader();
		init_nativeSectionDirectory();
		readElfImageFromDirectory = (bytes, directory) => {
			const { bits } = directory;
			const reader = new BinaryReader(bytes, directory.little, "elf");
			const mappings = [];
			const loadRegions = [];
			const executableMappings = [];
			const zeroFills = [];
			const sections = [];
			const dynamicSegments = [];
			for (const program of directory.programs) {
				if (program.type === 2) {
					dynamicSegments.push(program);
					continue;
				}
				if (program.type !== 1) continue;
				const { flags, file_offset: fileOffset, virtual_address: address, file_size: size, memory_size: memorySize } = program;
				const span = {
					virtualAddress: address,
					offset: fileOffset,
					memorySize,
					fileSize: size
				};
				const admitted = admitElfLoadSegment(span, bits);
				if (!admitted.ok) throw new BinaryFormatFailure("malformed", admitted.error.message);
				if (size !== 0n) reader.fileRange(fileOffset, size, "ELF load segment");
				const { fileBacked: mapping, zeroFill } = elfLoadSpans(span);
				if (mapping !== undefined) {
					mappings.push(mapping);
					loadRegions.push({
						mapping,
						memory_size: memorySize,
						read: (flags & 4) !== 0,
						write: (flags & 2) !== 0,
						execute: (flags & 1) !== 0
					});
					if ((flags & 1) !== 0) executableMappings.push(mapping);
				}
				if (zeroFill !== undefined) zeroFills.push(zeroFill);
			}
			for (const section of directory.sections) {
				const range = declaredFileRange(bytes.length, section.offset, section.size);
				const { file_backed, compressed } = section;
				const read_only = section.type === 1 && file_backed && !compressed && (section.flags & 1n) === 0n && (section.flags & 4n) === 0n && (section.flags & 2n) !== 0n;
				if ((section.name === null || section.name === "") && !read_only) continue;
				sections.push({
					format: "elf",
					name: section.name,
					type: section.type,
					flags: section.flags,
					address: section.address,
					declared_range: {
						offset: section.offset,
						size: section.size
					},
					...range,
					file_backed,
					compressed,
					read_only
				});
			}
			return {
				format: "elf",
				elf: {
					machine: directory.machine,
					type: directory.elf_type,
					dynamicSegments
				},
				architecture: architectureForElfMachine(directory.machine),
				bits,
				byte_order: reader.little ? "little" : "big",
				mappings,
				load_regions: loadRegions,
				executable_mappings: executableMappings,
				zero_fills: zeroFills,
				sections,
				...directory.section_names_limitation === undefined ? {} : { section_names_limitation: directory.section_names_limitation }
			};
		};
		architectureForElfMachine = (machine) => {
			const architecture = elfArchitecture(machine);
			if (architecture !== undefined) {
				switch (architecture) {
					case "x86": return "386";
					case "x86_64": return "amd64";
					case "powerpc": return "ppc";
					default: return architecture;
				}
			}
			switch (machine) {
				case 21: return "ppc64";
				case 22: return "s390";
				case 258: return "loongarch";
				default: return `elf-machine-${machine}`;
			}
		};
		readElfImage = (bytes, operation, maximumSourceAndDecodedNamesBytes) => readElfImageFromDirectory(bytes, readElfDirectoryFromBuffer(bytes, operation, maximumSourceAndDecodedNamesBytes));
		readElfImageCooperative = async (bytes, operation, pause, maximumSourceAndDecodedNamesBytes, decode) => readElfImageFromDirectory(bytes, await readElfDirectoryFromBufferCooperative(bytes, pause, operation, maximumSourceAndDecodedNamesBytes, decode));
	})))();
}

//#endregion
export { architectureForElfMachine, init_elfImage, init_peImage, peDeclaredFileMappings, readElfImage, readElfImageCooperative, readElfImageFromDirectory, readPeImage };