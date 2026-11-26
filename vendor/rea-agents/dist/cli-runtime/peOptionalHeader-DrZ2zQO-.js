import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/dosMz.js
var hasDosMzMagic, fixedDosMzDeclarations, readDosMzDeclarations, dosMzDeclaredImageByteLength, mzWindowsHeaderLayoutLimitation, observeMzWindowsHeader, observeWindowsHeader, windowsHeaderSignature, parseDeclaredDosMzHeader, parseMzHeaderEvidence, parseDeclaredMzHeaderEvidence, withMzWindowsHeaderSignature, readRelocations;
function init_dosMz() {
	return (init_dosMz = __esmMin((() => {
		init_binaryContainer();
		init_result();
		hasDosMzMagic = (bytes) => bytes[0] === 77 && bytes[1] === 90;
		fixedDosMzDeclarations = (reader) => {
			const relocationCount = reader.u16(6);
			const relocationTableOffset = reader.u16(24);
			return {
				lastPageBytes: reader.u16(2),
				pages: reader.u16(4),
				headerBytes: reader.u16(8) * 16,
				relocationCount,
				relocationTableOffset,
				relocationTableEnd: relocationTableOffset + relocationCount * 4,
				entrySegment: reader.u16(22),
				entryOffset: reader.u16(20)
			};
		};
		readDosMzDeclarations = (bytes) => bytes.length < 28 || !hasDosMzMagic(bytes) ? err("invalid or truncated DOS MZ header") : ok(fixedDosMzDeclarations(new BinaryReader(bytes, true, "dos-mz")));
		dosMzDeclaredImageByteLength = ({ pages, lastPageBytes }) => {
			if (pages === 0 || lastPageBytes > 511) return err("invalid DOS MZ page count or final-page size");
			return ok((pages - 1) * 512 + (lastPageBytes === 0 ? 512 : lastPageBytes));
		};
		mzWindowsHeaderLayoutLimitation = (header) => header.offset < 64 ? `Unsupported overlapping ${header.signature} header at file offset ${String(header.offset)}; this reader requires the Windows header outside the 64-byte DOS header` : undefined;
		observeMzWindowsHeader = (bytes, fileSize = bytes.length, signatureEvidence) => observeWindowsHeader(bytes, fileSize, signatureEvidence);
		observeWindowsHeader = (bytes, fileSize, signatureEvidence, declarations) => {
			if (bytes.length >= 2 && !hasDosMzMagic(bytes)) return { state: "absent" };
			if (bytes.length < 64) return fileSize >= 64 ? { state: "header-needed" } : { state: "absent" };
			const reader = new BinaryReader(bytes, true, "dos-mz");
			const { headerBytes, relocationCount, relocationTableOffset: tableStart, relocationTableEnd: tableEnd } = declarations ?? fixedDosMzDeclarations(reader);
			if (headerBytes !== 0 && relocationCount > 0 && tableStart < 64 && tableEnd > 60) return { state: "absent" };
			const offset = reader.u32(60);
			if (offset === 0) return { state: "absent" };
			const inlineSignature = offset < bytes.length ? bytes.subarray(offset, Math.min(offset + 4, bytes.length)) : undefined;
			const available = signatureEvidence?.offset === offset ? signatureEvidence.bytes : inlineSignature;
			const signature = windowsHeaderSignature(available);
			if (signature !== "other" && signature !== "unobserved") return {
				state: "declared",
				offset,
				signature
			};
			if (headerBytes >= 64 && relocationCount > 0 && tableEnd <= 60 && (signature === "other" || fileSize - offset < 2)) return { state: "absent" };
			if (headerBytes === 0 || headerBytes >= 64) {
				const remaining = fileSize - offset;
				const needsMore = available === undefined && remaining >= 2 || available !== undefined && available.length < 2 && remaining >= 2 || available !== undefined && available.length >= 2 && available.toString("latin1", 0, 2) === "PE" && available.length < 4 && remaining >= 4;
				if (needsMore && signatureEvidence?.offset !== offset) return {
					state: "signature-needed",
					offset
				};
				return {
					state: "candidate",
					offset,
					signature
				};
			}
			if (signature === "other") return { state: "absent" };
			const observedPePrefix = available !== undefined && available.length >= 2 && available.toString("latin1", 0, 2) === "PE";
			if (fileSize - offset < (observedPePrefix ? 4 : 2)) return { state: "absent" };
			return {
				state: "signature-needed",
				offset
			};
		};
		windowsHeaderSignature = (bytes) => {
			if (bytes === undefined || bytes.length < 2) return "unobserved";
			const first = bytes[0];
			const second = bytes[1];
			if (first === 78 && second === 69) return "NE";
			if (first === 76 && second === 69) return "LE";
			if (first === 76 && second === 88) return "LX";
			if (first !== 80 || second !== 69) return "other";
			if (bytes.length < 4) return "unobserved";
			return bytes[2] === 0 && bytes[3] === 0 ? "PE" : "other";
		};
		parseDeclaredDosMzHeader = (bytes, fileSize, declarations) => {
			if (!declarations.ok) return declarations;
			if (!Number.isSafeInteger(fileSize) || fileSize < bytes.length) return err("invalid DOS MZ file length");
			const extent = dosMzDeclaredImageByteLength(declarations.value);
			if (!extent.ok) return extent;
			const imageBytes = extent.value;
			const { headerBytes, relocationCount, relocationTableOffset, relocationTableEnd: tableEnd, entryOffset, entrySegment } = declarations.value;
			if (headerBytes < 28 || headerBytes >= imageBytes) return err("invalid DOS MZ header size or empty load module");
			if (imageBytes > fileSize) return err("truncated DOS MZ load module");
			if (relocationCount > 0 && (relocationTableOffset < 28 || tableEnd > headerBytes)) return err("DOS MZ relocation table lies outside its header");
			if (relocationCount > 0 && tableEnd > bytes.length) return err("truncated DOS MZ relocation table");
			const moduleBytes = imageBytes - headerBytes;
			const relocations = readRelocations(bytes, relocationTableOffset, relocationCount, headerBytes, moduleBytes);
			if (!relocations.ok) return relocations;
			if (entrySegment * 16 + entryOffset >= moduleBytes) return err("DOS MZ entry point lies outside its initialized load module");
			return ok({
				headerBytes,
				imageBytes,
				moduleBytes,
				overlayBytes: fileSize - imageBytes,
				relocationCount,
				relocationTableOffset,
				relocations: relocations.value,
				entrySegment,
				entryOffset
			});
		};
		parseMzHeaderEvidence = (bytes, fileSize = bytes.length, signatureEvidence) => parseDeclaredMzHeaderEvidence(bytes, fileSize, readDosMzDeclarations(bytes), signatureEvidence);
		parseDeclaredMzHeaderEvidence = (bytes, fileSize, declarations, signatureEvidence) => {
			const fields = declarations.ok ? declarations.value : undefined;
			const needed = fields !== undefined && Number.isSafeInteger(fileSize) && fileSize >= bytes.length && fields.relocationCount > 0 && fields.relocationTableEnd > bytes.length && fields.relocationTableEnd <= fields.headerBytes && fields.relocationTableEnd <= fileSize;
			return {
				declarations,
				...needed ? { relocationTableRead: {
					offset: 0,
					byteLength: fields.relocationTableEnd
				} } : {},
				dos: parseDeclaredDosMzHeader(bytes, fileSize, declarations),
				windowsHeader: observeWindowsHeader(bytes, fileSize, signatureEvidence, fields)
			};
		};
		withMzWindowsHeaderSignature = (bytes, fileSize, evidence, signature) => ({
			...evidence,
			windowsHeader: observeWindowsHeader(bytes, fileSize, signature, evidence.declarations.ok ? evidence.declarations.value : undefined)
		});
		readRelocations = (bytes, relocationTableOffset, relocationCount, headerBytes, moduleBytes) => {
			const reader = new BinaryReader(bytes, true, "dos-mz");
			const relocations = [];
			for (let index = 0; index < relocationCount; index += 1) {
				const record = relocationTableOffset + index * 4;
				const offset = reader.u16(record);
				const segment = reader.u16(record + 2);
				const moduleOffset = segment * 16 + offset;
				if (moduleOffset + 2 > moduleBytes) return err(`DOS MZ relocation ${index} points outside its load module`);
				relocations.push({
					segment,
					offset,
					moduleOffset,
					fileOffset: headerBytes + moduleOffset
				});
			}
			return ok(relocations);
		};
	})))();
}

//#endregion
//#region dist/domain/peCoffHeader.js
/**
* Borrow the signature and its COFF record in one bounded observation. A
* short frame may still identify an NE/LE/LX signature or a truncated PE.
* Drivers own exact-read behavior and consumers own format admission.
*/
function* observePeCoffFrame(prefix, fileSize, evidence) {
	const pending = evidence.windowsHeader;
	if (pending.state !== "signature-needed" && !(pending.state === "declared" && pending.signature === "PE")) return {
		kind: "other",
		observation: pending
	};
	const { offset } = pending;
	const size = Math.min(PE_COFF_FRAME_BYTES, Math.max(0, fileSize - offset));
	const cached = offset + size <= prefix.length;
	const frame = cached ? prefix.subarray(offset, offset + size) : yield {
		offset,
		size
	};
	const observation = cached && pending.state === "declared" ? pending : withMzWindowsHeaderSignature(prefix, fileSize, evidence, {
		offset,
		bytes: frame
	}).windowsHeader;
	return observation.state === "declared" && observation.signature === "PE" ? {
		kind: "pe",
		observation,
		coff: readPeCoffHeader(frame.subarray(PE_SIGNATURE_BYTES))
	} : {
		kind: "other",
		observation
	};
}
var PE_SIGNATURE_BYTES, PE_COFF_HEADER_BYTES, PE_COFF_FRAME_BYTES, readPeCoffHeader;
function init_peCoffHeader() {
	return (init_peCoffHeader = __esmMin((() => {
		init_binaryContainer();
		init_dosMz();
		init_result();
		PE_SIGNATURE_BYTES = 4;
		PE_COFF_HEADER_BYTES = 20;
		PE_COFF_FRAME_BYTES = PE_SIGNATURE_BYTES + PE_COFF_HEADER_BYTES;
		readPeCoffHeader = (bytes) => {
			if (bytes.length < PE_COFF_HEADER_BYTES) return err({
				kind: "malformed",
				message: "PE COFF header is truncated"
			});
			const record = new BinaryReader(bytes, true, "pe");
			return ok({
				machine: record.u16(0),
				sectionCount: record.u16(2),
				symbolTableOffset: record.u32(8),
				symbolCount: record.u32(12),
				optionalHeaderSize: record.u16(16),
				characteristics: record.u16(18)
			});
		};
	})))();
}

//#endregion
//#region dist/domain/peOptionalHeader.js
var PE_SIZE_OF_HEADERS_OFFSET, optionalHeaderReader, readPeOptionalHeaderIdentity, readIdentity, readPeOptionalHeaderFixedFields, readFixedFields, readDirectory, readPeOptionalHeaderDirectory, readPeOptionalHeaderStructure;
function init_peOptionalHeader() {
	return (init_peOptionalHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		PE_SIZE_OF_HEADERS_OFFSET = 60;
		optionalHeaderReader = (bytes) => new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "pe");
		readPeOptionalHeaderIdentity = (bytes) => readIdentity(optionalHeaderReader(bytes));
		readIdentity = (reader) => {
			if (reader.bytes.length < 2) return err({
				kind: "malformed",
				reason: "truncated-magic",
				message: "truncated PE optional header"
			});
			const magic = reader.u16(0);
			if (magic !== 267 && magic !== 523) return err({
				kind: "unsupported",
				reason: "unsupported-magic",
				message: "Only PE32 and PE32+ image optional headers are supported"
			});
			const bits = magic === 523 ? 64 : 32;
			return ok({
				magic,
				bits,
				format: bits === 64 ? "pe32-plus" : "pe32"
			});
		};
		readPeOptionalHeaderFixedFields = (bytes) => readFixedFields(optionalHeaderReader(bytes));
		readFixedFields = (reader) => {
			const identity = readIdentity(reader);
			if (!identity.ok) return identity;
			const { bits } = identity.value;
			const directoryOffset = bits === 64 ? 112 : 96;
			if (reader.bytes.length < 60 + 4) return err({
				kind: "malformed",
				reason: "truncated-fixed-fields",
				message: "truncated PE optional header"
			});
			return ok({
				...identity.value,
				imageBase: reader.word(bits === 64 ? 24 : 28, bits),
				sectionAlignment: reader.u32(32),
				fileAlignment: reader.u32(36),
				sizeOfImage: reader.u32(56),
				sizeOfHeaders: reader.u32(60),
				dllCharacteristics: reader.bytes.length >= 72 ? reader.u16(70) : null,
				directoryOffset,
				directoryCountOffset: directoryOffset - 4
			});
		};
		readDirectory = (reader, offset) => ({
			address: reader.u32(offset),
			size: reader.u32(offset + 4),
			offset
		});
		readPeOptionalHeaderDirectory = (bytes, fixed, index) => {
			if (bytes.byteLength < fixed.directoryOffset) return { state: "count-unavailable" };
			const reader = optionalHeaderReader(bytes);
			const count = reader.u32(fixed.directoryCountOffset);
			if (index >= count) return {
				state: "absent",
				count
			};
			const offset = fixed.directoryOffset + index * 8;
			if (offset > bytes.byteLength - 8) return {
				state: "truncated",
				count
			};
			return {
				state: "present",
				count,
				directory: readDirectory(reader, offset)
			};
		};
		readPeOptionalHeaderStructure = (bytes) => {
			const reader = optionalHeaderReader(bytes);
			const parsed = readFixedFields(reader);
			if (!parsed.ok) return parsed;
			const fixed = parsed.value;
			if (bytes.byteLength < fixed.directoryOffset) return err({
				kind: "malformed",
				reason: "truncated-fixed-fields",
				message: "truncated PE optional header"
			});
			const directoryCount = reader.u32(fixed.directoryCountOffset);
			if (directoryCount > Math.floor((bytes.byteLength - fixed.directoryOffset) / 8)) return err({
				kind: "malformed",
				reason: "truncated-directory-table",
				message: "truncated PE data-directory table"
			});
			const dataDirectories = Array.from({ length: directoryCount }, (_, index) => readDirectory(reader, fixed.directoryOffset + index * 8));
			const dllCharacteristics = fixed.dllCharacteristics;
			if (dllCharacteristics === null) return err({
				kind: "malformed",
				reason: "truncated-fixed-fields",
				message: "truncated PE optional header"
			});
			return ok({
				...fixed,
				dllCharacteristics,
				directoryCount,
				dataDirectories
			});
		};
	})))();
}

//#endregion
export { PE_COFF_FRAME_BYTES, dosMzDeclaredImageByteLength, hasDosMzMagic, init_dosMz, init_peCoffHeader, init_peOptionalHeader, mzWindowsHeaderLayoutLimitation, observeMzWindowsHeader, observePeCoffFrame, parseDeclaredMzHeaderEvidence, parseMzHeaderEvidence, readDosMzDeclarations, readPeCoffHeader, readPeOptionalHeaderDirectory, readPeOptionalHeaderFixedFields, readPeOptionalHeaderIdentity, readPeOptionalHeaderStructure, withMzWindowsHeaderSignature };