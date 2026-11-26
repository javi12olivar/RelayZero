import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/peSectionHeader.js
var PE_SECTION_HEADER_BYTES, peSectionVirtualExtent, peSectionTableExtent, observePeHeaderExtent, readPeSectionHeader;
function init_peSectionHeader() {
	return (init_peSectionHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		PE_SECTION_HEADER_BYTES = 40;
		peSectionVirtualExtent = (virtualSize, rawSize) => virtualSize === 0 ? rawSize : virtualSize;
		peSectionTableExtent = (optionalHeaderOffset, optionalHeaderSize, sectionCount) => ({
			sectionTableOffset: optionalHeaderOffset + optionalHeaderSize,
			sectionTableBytes: sectionCount * 40
		});
		observePeHeaderExtent = ({ optionalHeaderOffset, optionalHeaderSize, sectionCount, sizeOfHeaders, fileSize }) => {
			const { sectionTableOffset, sectionTableBytes } = peSectionTableExtent(optionalHeaderOffset, optionalHeaderSize, sectionCount);
			const sizeOfHeadersState = sizeOfHeaders < sectionTableOffset + sectionTableBytes ? "before-section-table-end" : sizeOfHeaders > fileSize ? "past-file-end" : "valid";
			return {
				sectionTableOffset,
				sectionTableBytes,
				sizeOfHeadersState
			};
		};
		readPeSectionHeader = (bytes) => {
			if (bytes.length < 40) return err({
				kind: "malformed",
				message: "PE section header is truncated"
			});
			const reader = new BinaryReader(bytes, true, "pe");
			const name = bytes.subarray(0, 8);
			const nul = name.indexOf(0);
			const virtual_size = reader.u32(8);
			const raw_size = reader.u32(16);
			return ok({
				name: name.toString("latin1", 0, nul < 0 ? name.length : nul),
				virtual_size,
				virtual_address: reader.u32(12),
				raw_size,
				offset: reader.u32(20),
				characteristics: reader.u32(36),
				size: Math.min(peSectionVirtualExtent(virtual_size, raw_size), raw_size)
			});
		};
	})))();
}

//#endregion
export { init_peSectionHeader, observePeHeaderExtent, peSectionTableExtent, peSectionVirtualExtent, readPeSectionHeader };