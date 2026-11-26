import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/apple/machoSectionHeader.js
var machoSectionHeaderSize, readMachoSectionHeader, isMachoZeroFillSection, extentContains, machoSectionBacking, admitMachoSectionPayload;
function init_machoSectionHeader() {
	return (init_machoSectionHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		machoSectionHeaderSize = (wide) => wide ? 80 : 68;
		readMachoSectionHeader = (bytes, wide, littleEndian) => {
			if (bytes.byteLength < machoSectionHeaderSize(wide)) return err({
				kind: "malformed",
				message: "Mach-O section header is truncated"
			});
			const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "macho");
			const bits = wide ? 64 : 32;
			return ok({
				nameBytes: Buffer.from(reader.range(0, 16, "Mach-O section name")),
				segmentNameBytes: Buffer.from(reader.range(16, 16, "Mach-O section segment name")),
				address: reader.word(32, bits),
				size: reader.word(wide ? 40 : 36, bits),
				offset: reader.u32(wide ? 48 : 40),
				alignmentExponent: reader.u32(wide ? 52 : 44),
				relocationOffset: reader.u32(wide ? 56 : 48),
				relocationCount: reader.u32(wide ? 60 : 52),
				flags: reader.u32(wide ? 64 : 56),
				reserved1: reader.u32(wide ? 68 : 60),
				reserved2: reader.u32(wide ? 72 : 64),
				...wide ? { reserved3: reader.u32(76) } : {}
			});
		};
		isMachoZeroFillSection = (flags) => [
			1,
			12,
			18
		].includes(flags & 255);
		extentContains = (size, extentSize, delta) => delta >= 0n && delta <= extentSize && size <= extentSize - delta;
		machoSectionBacking = (section, segment) => {
			const { size } = section;
			const zeroFill = isMachoZeroFillSection(section.flags);
			const inSegmentFile = extentContains(size, segment.fileSize, BigInt(section.offset) - segment.fileOffset);
			const inSegmentMemory = extentContains(size, segment.memorySize, section.address - segment.address);
			return {
				onDisk: !zeroFill && inSegmentFile,
				issue: zeroFill ? "is zero-fill" : !inSegmentMemory ? "exceeds its segment's virtual extent" : !inSegmentFile ? "exceeds its segment's file extent" : null
			};
		};
		admitMachoSectionPayload = (section, imageBytes) => section.size === 0n || isMachoZeroFillSection(section.flags) || section.offset <= imageBytes && section.size <= BigInt(imageBytes - section.offset) ? ok(null) : err({
			kind: "malformed",
			message: "Mach-O section payload is outside the file"
		});
	})))();
}

//#endregion
//#region dist/domain/apple/machoSegmentHeader.js
var SG_HIGHVM, machoSegmentHeaderSize, readMachoSegmentHeader, admitMachoSegmentMapping, machoSegmentSectionTableFits, admitMachoSegmentCommand;
function init_machoSegmentHeader() {
	return (init_machoSegmentHeader = __esmMin((() => {
		init_binaryContainer();
		init_machoSectionHeader();
		init_result();
		SG_HIGHVM = 1;
		machoSegmentHeaderSize = (wide) => wide ? 72 : 56;
		readMachoSegmentHeader = (bytes, wide, littleEndian) => {
			const headerSize = machoSegmentHeaderSize(wide);
			if (bytes.byteLength < headerSize) return err({
				kind: "malformed",
				message: "Mach-O segment header is truncated"
			});
			const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "macho");
			const bits = wide ? 64 : 32;
			return ok({
				headerSize,
				nameBytes: Buffer.from(reader.range(8, 16, "Mach-O segment name")),
				address: reader.word(24, bits),
				memorySize: reader.word(wide ? 32 : 28, bits),
				fileOffset: reader.word(wide ? 40 : 32, bits),
				fileSize: reader.word(wide ? 48 : 36, bits),
				maxProtection: reader.u32(wide ? 56 : 40),
				protection: reader.u32(wide ? 60 : 44),
				sectionCount: reader.u32(wide ? 64 : 48),
				flags: reader.u32(wide ? 68 : 52)
			});
		};
		admitMachoSegmentMapping = (segment, bits) => {
			const { address, memorySize, fileSize, protection, flags } = segment;
			const unmapped = memorySize === 0n && protection === 0;
			if (!unmapped && fileSize > memorySize || address + memorySize > 1n << BigInt(bits)) return err({
				kind: "malformed",
				message: "Mach-O segment addresses or sizes are invalid"
			});
			const zeroFillSize = memorySize - fileSize;
			const leadingZeroFill = fileSize > 0n && zeroFillSize > 0n && (flags & SG_HIGHVM) !== 0;
			return ok({
				unmapped,
				fileAddress: leadingZeroFill ? address + zeroFillSize : address,
				zeroFill: zeroFillSize > 0n ? {
					address: leadingZeroFill ? address : address + fileSize,
					size: zeroFillSize
				} : null
			});
		};
		machoSegmentSectionTableFits = (segment, commandBytes, wide) => segment.sectionCount <= Math.floor((commandBytes - segment.headerSize) / machoSectionHeaderSize(wide));
		admitMachoSegmentCommand = (segment, commandBytes, bits, imageBytes) => {
			const mapping = admitMachoSegmentMapping(segment, bits);
			if (!mapping.ok) return mapping;
			if (!machoSegmentSectionTableFits(segment, commandBytes, bits === 64)) return err({
				kind: "malformed",
				message: "Mach-O section table exceeds its segment command"
			});
			const image = BigInt(imageBytes);
			if (segment.fileSize !== 0n && (segment.fileOffset > image || segment.fileSize > image - segment.fileOffset)) return err({
				kind: "malformed",
				message: "Mach-O segment range is outside the file"
			});
			return mapping;
		};
	})))();
}

//#endregion
export { admitMachoSectionPayload, admitMachoSegmentCommand, admitMachoSegmentMapping, init_machoSectionHeader, init_machoSegmentHeader, isMachoZeroFillSection, machoSectionBacking, machoSectionHeaderSize, machoSegmentHeaderSize, machoSegmentSectionTableFits, readMachoSectionHeader, readMachoSegmentHeader };