import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/native/elfNoteLayout.js
var ELF_NOTE_HEADER_BYTES, elfNoteSectionStorage, elfNoteAlignment, readElfNoteHeader, readElfNoteFrame, isElfNotePadding, sortElfNoteSpans, elfNoteSpanOverlapIndex;
function init_elfNoteLayout() {
	return (init_elfNoteLayout = __esmMin((() => {
		init_binaryContainer();
		init_result();
		ELF_NOTE_HEADER_BYTES = 12;
		elfNoteSectionStorage = (section) => section.type !== 7 ? "not-note" : section.compressed ? "compressed" : "uncompressed";
		elfNoteAlignment = (declared) => declared === 8 || declared === 8n ? 8 : 4;
		readElfNoteHeader = (bytes, littleEndian) => {
			if (bytes.byteLength < 12) return err({
				kind: "malformed",
				message: "ELF note header is truncated"
			});
			const prefix = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
			const reader = new BinaryReader(prefix, littleEndian, "ELF note");
			return ok({
				namesz: reader.u32(0),
				descsz: reader.u32(4),
				type: reader.u32(8)
			});
		};
		readElfNoteFrame = (bytes, littleEndian, alignment, remaining) => {
			const header = readElfNoteHeader(bytes, littleEndian);
			if (!header.ok) return header;
			const { namesz, descsz, type } = header.value;
			const endOfName = 12 + namesz;
			const descriptor = Math.ceil(endOfName / alignment) * alignment;
			const endOfDescriptor = descriptor + descsz;
			const next = Math.ceil(endOfDescriptor / alignment) * alignment;
			const framing = endOfName > remaining ? "truncated-name" : endOfDescriptor > remaining ? "truncated-descriptor" : next > remaining ? "truncated-padding" : "complete";
			return ok({
				namesz,
				descsz,
				type,
				descriptor,
				next,
				framing
			});
		};
		isElfNotePadding = (bytes) => bytes.every((byte) => byte === 0);
		sortElfNoteSpans = (spans) => spans.filter(({ size }) => size > 0).toSorted((a, b) => a.offset - b.offset);
		elfNoteSpanOverlapIndex = (spans) => {
			const sorted = [];
			for (const span of sortElfNoteSpans(spans)) {
				const previous = sorted.at(-1);
				if (previous !== undefined && span.offset <= previous.offset + previous.size) sorted[sorted.length - 1] = {
					offset: previous.offset,
					size: Math.max(previous.size, span.offset + span.size - previous.offset)
				};
				else sorted.push(span);
			}
			return ({ offset, size }) => {
				if (size <= 0) return "none";
				let low = 0;
				let high = sorted.length;
				while (low < high) {
					const middle = low + high >>> 1;
					if ((sorted[middle]?.offset ?? 0) < offset + size) low = middle + 1;
					else high = middle;
				}
				const span = sorted[low - 1];
				if (span === undefined || span.offset + span.size <= offset) return "none";
				return span.offset <= offset && span.offset + span.size >= offset + size ? "covered" : "partial";
			};
		};
	})))();
}

//#endregion
export { elfNoteAlignment, elfNoteSectionStorage, elfNoteSpanOverlapIndex, init_elfNoteLayout, isElfNotePadding, readElfNoteFrame, readElfNoteHeader, sortElfNoteSpans };