import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryFormatFailure, BinaryReader, declaredFileRange, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { LC, MachoLoadCommandCursor, init_machoLoadCommandCodes, init_machoLoadCommands, machoCommandTableIssue, readMachoLoadCommandDeclarations } from "./machoLoadCommands-DCQgk7s-.js";
import { admitMachoSegmentCommand, init_machoSectionHeader, init_machoSegmentHeader, machoSectionBacking, machoSectionHeaderSize, readMachoSectionHeader, readMachoSegmentHeader } from "./machoSegmentHeader-Bvz3C4rO.js";
import { decodeMachoFixedName, init_appleMachoNames } from "./appleMachoNames-ncedG8hm.js";

//#region dist/domain/apple/machoImage.js
var readMachoImage, machoImageSection;
function init_machoImage() {
	return (init_machoImage = __esmMin((() => {
		init_machoLoadCommandCodes();
		init_appleMachoNames();
		init_machoSectionHeader();
		init_machoSegmentHeader();
		init_binaryContainer();
		init_machoLoadCommands();
		readMachoImage = (bytes) => {
			const parsed = readMachoLoadCommandDeclarations(bytes, bytes.length);
			if (!parsed.ok) throw new BinaryFormatFailure("malformed", parsed.error);
			if (parsed.value === null) throw new BinaryFormatFailure("malformed", "Unrecognized Mach-O header");
			const table = parsed.value;
			const issue = machoCommandTableIssue(table, bytes.length);
			if (issue !== null) throw new BinaryFormatFailure(issue.kind === "extent" ? "truncated" : "malformed", issue.message, {
				format: "macho",
				field: "Mach-O load commands",
				offset: table.headerSize
			});
			const { headerSize, commandBytes, littleEndian: little } = table;
			const bits = table.wide ? 64 : 32;
			const reader = new BinaryReader(bytes, little, "macho");
			const commandStart = reader.table(BigInt(headerSize), commandBytes, 1, "Mach-O load commands");
			const mappings = [];
			const loadRegions = [];
			const executableMappings = [];
			const zeroFills = [];
			const sections = [];
			let chainedFixups = false;
			const commands = new MachoLoadCommandCursor(table);
			while (commands.nextOffset !== null) {
				const offset = commandStart + commands.nextOffset;
				const frame = commands.read(bytes.subarray(offset, offset + 8));
				if (!frame.ok) throw new BinaryFormatFailure("malformed", frame.error);
				const { command, size } = frame.value;
				if (command === LC.DYLD_CHAINED_FIXUPS) chainedFixups = true;
				if (command === LC.SEGMENT || command === LC.SEGMENT_64) {
					const wide = command === LC.SEGMENT_64;
					if (wide !== (bits === 64)) throw new BinaryFormatFailure("malformed", "Mach-O segment command does not match the header width");
					const sectionWidth = machoSectionHeaderSize(wide);
					const parsedSegment = readMachoSegmentHeader(bytes.subarray(offset, offset + size), wide, little);
					if (!parsedSegment.ok) throw new BinaryFormatFailure(parsedSegment.error.kind, parsedSegment.error.message);
					const { headerSize: segmentHeader, memorySize, fileOffset, fileSize, maxProtection, protection, sectionCount, nameBytes } = parsedSegment.value;
					const admitted = admitMachoSegmentCommand(parsedSegment.value, size, bits, bytes.length);
					if (!admitted.ok) throw new BinaryFormatFailure(admitted.error.kind, admitted.error.message);
					const { unmapped, fileAddress, zeroFill } = admitted.value;
					const fileRange = fileSize === 0n ? undefined : reader.fileRange(fileOffset, fileSize, "Mach-O segment");
					const mapping = unmapped || fileRange === undefined ? undefined : {
						...fileRange,
						address: fileAddress
					};
					const name = decodeMachoFixedName(nameBytes);
					if (mapping !== undefined && name !== "__PAGEZERO") {
						mappings.push(mapping);
						loadRegions.push({
							mapping,
							memory_size: memorySize,
							read: (protection & 1) !== 0,
							write: (protection & 2) !== 0,
							execute: (protection & 4) !== 0,
							protection_masks: {
								current: protection,
								maximum: maxProtection
							}
						});
						if ((protection & 4) !== 0) executableMappings.push(mapping);
					}
					if (zeroFill !== null && name !== "__PAGEZERO") zeroFills.push(zeroFill);
					for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex++) {
						const section = offset + segmentHeader + sectionIndex * sectionWidth;
						const parsedSection = readMachoSectionHeader(bytes.subarray(section, section + sectionWidth), wide, little);
						if (!parsedSection.ok) throw new BinaryFormatFailure(parsedSection.error.kind, parsedSection.error.message);
						sections.push(machoImageSection({
							fileBytes: bytes.length,
							section: parsedSection.value,
							protection,
							segmentMapping: mapping ?? null,
							segmentUnmapped: unmapped,
							unmapped: unmapped || mapping === undefined,
							segment: parsedSegment.value
						}));
					}
				}
			}
			const complete = commands.finish();
			if (!complete.ok) throw new BinaryFormatFailure("malformed", complete.error);
			const cpu = table.identity.cpuType;
			const names = new Map([
				[7, "386"],
				[16777223, "amd64"],
				[12, "arm"],
				[16777228, "arm64"],
				[33554444, "arm64_32"],
				[18, "ppc"],
				[16777234, "ppc64"]
			]);
			return {
				format: "macho",
				macho_cpu_type: table.identity.cpuType,
				macho_chained_fixups: chainedFixups,
				architecture: names.get(cpu) ?? `macho-cpu-${cpu}`,
				bits,
				byte_order: little ? "little" : "big",
				mappings,
				load_regions: loadRegions,
				executable_mappings: executableMappings,
				zero_fills: zeroFills,
				sections
			};
		};
		machoImageSection = ({ fileBytes, section, protection, segmentMapping, segmentUnmapped, unmapped, segment }) => {
			const { flags, address: sectionAddress, size: sectionSize } = section;
			const sectionOffset = BigInt(section.offset);
			const sectionName = decodeMachoFixedName(section.nameBytes);
			const name = `${decodeMachoFixedName(section.segmentNameBytes)},${sectionName}`;
			const backing = machoSectionBacking(section, segment);
			const declaredRange = declaredFileRange(fileBytes, sectionOffset, sectionSize);
			const range = unmapped ? {
				offset: 0,
				size: 0,
				file_backed: false
			} : declaredRange;
			const fileBacked = range.file_backed && backing.issue === null;
			const readOnly = fileBacked && (protection & 1) !== 0 && (protection & 2) === 0 && (flags & 2147484672) === 0;
			return {
				format: "macho",
				name,
				section_name: sectionName,
				type: flags & 255,
				flags,
				address: sectionAddress,
				declared_range: {
					offset: sectionOffset,
					size: sectionSize
				},
				segment_mapping: segmentMapping,
				segment_unmapped: segmentUnmapped,
				relocations: {
					offset: section.relocationOffset,
					count: section.relocationCount
				},
				...range,
				file_backed: fileBacked,
				on_disk: declaredRange.file_backed && backing.onDisk,
				read_only: readOnly,
				compressed: false
			};
		};
	})))();
}

//#endregion
export { init_machoImage, readMachoImage };