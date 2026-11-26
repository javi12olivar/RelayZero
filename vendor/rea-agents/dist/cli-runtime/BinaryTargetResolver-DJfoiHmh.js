import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, BinaryTargetError, OPENABLE_APPLE_BUNDLE_TYPES_TEXT, cancelledBy, carriedReason, errorMessage, init_analysisErrorCore, init_appleBundleTypes, init_configurationErrors, init_errorMessage, init_jsonValue, init_localPath, isUnopenedAppleBundleExtension, jsonValueSchema, localPathStringSchema, openableAppleBundleExtension } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, absoluteCallerPath, init_binaryContainer, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { childFailureDiagnostics, init_analysisErrorProjection } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactReaderFailure, OwnedRegularFileOperationFailure, RegularFileCancelled, RegularFileChangedError, RegularFileCleanupFailure, RegularFileOperationCancelled, assertStableRegularFileIdentity, init_ArtifactReader, init_OwnedRegularFile, init_RegularFile, init_readFileHandleRange, init_resources, readFileHandleRange, regularFileCancellation, withOwnedRegularFile } from "./resources-B3P64jvH.js";
import { init_dosMz, init_peCoffHeader, mzWindowsHeaderLayoutLimitation, parseMzHeaderEvidence, readPeCoffHeader, withMzWindowsHeaderSignature } from "./peOptionalHeader-DrZ2zQO-.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { RetainedRegularFileCleanupFailure, bindRegularFileCleanup, init_RegularFileRead, retryRegularFileCleanup } from "./RegularFileRead-CRu2Ia6l.js";
import { PE_CODEVIEW_PREFIX_BYTES, init_binaryTargetTypes } from "./binaryTargetTypes-CrE-Muhh.js";
import { hasTrailingZipArchive, init_zipPackageFormat, zipRootPackageFormat } from "./canonicalOrdering-C7Yzy62j.js";
import { BINARY_TARGET_FORMAT_KINDS, init_targetFormats } from "./targetFormats-BjyLMHym.js";
import { admitRawBinary, init_rawBinary, parseRawBinaryEntryPoint, rawBinarySelectionError } from "./targetIdentity-rKLLVwEj.js";
import { espFlashSelectionError, init_espFlashSelection } from "./espFlashSelection-DrhknbQ_.js";
import { MAX_XML_PLIST_PROBE_BYTES, createXmlPlistSignatureProbe, init_appleArchiveFormat } from "./appleArchiveFormat-B-JoSBSY.js";
import { init_AppBundleExecutable, resolveAppleBundleExecutable } from "./AppBundleExecutable-BZSToRs7.js";
import { hashStableRegularFileDescriptor, init_StableFileHash } from "./StableFileHash-BELT4STG.js";
import { MAX_JVM_CLASS_IDENTITY_BYTES, MachoLoadCommandCursor, classifyFatContainerIdentity, hasJvmClassHeader, init_jvmClassFile, init_machoContainer, init_machoLoadCommands, isJvmClassFile, readFatContainerHeader, readFatJvmIdentityLimitIssue, readMachoHeaderPrefixFacts, readMachoLoadCommandTableHeader } from "./machoLoadCommands-DCQgk7s-.js";
import { init_elfDynamicEntry, readElfDynamicEntry } from "./elfDynamicEntry-DMv_AN_D.js";
import { elfFixedHeaderWidth, init_elfFixedHeader, readElfFixedHeader } from "./elfFixedHeader-D38fsdBg.js";
import { elfProgramHeaderWidth, init_elfProgramHeader, init_elfRawTableDeclarations, readElfProgramHeader, readElfRawTableDeclarations } from "./elfRawTableDeclarations-Cgbp6HKT.js";
import { elfSectionHeaderWidth, init_elfDeclaredRanges, init_elfSectionHeader, readElfSectionHeader, readElfTableDeclarations, validateElfDeclaredRanges } from "./elfDeclaredRanges-BSLGQklL.js";
import { claimsExecutableHeader, init_binaryTarget, parseCodeViewData, parseExecutableHeader, parseMzExecutableMetadata, parsePeRecordFacts, peCodeViewDirectoryEntries, peDebugDirectoryEntry, peRvaToFileOffset } from "./binaryTarget-BWcJ62i0.js";
import { ELF_RELR_DYNAMIC_TAGS, init_elfRelocation, isElfAndroidRelocationDynamicTag, isElfRelocationSectionType, readElfRelocationEntry } from "./elfRelocation-K3YDpyDM.js";
import { ULEB32, init_leb128, readLeb128 } from "./leb128-QVew1RrX.js";
import { artifactNameForClassification, hasDiskImageSignature, init_UefiFormatProbe, init_artifactFormatRecognition, init_artifactNameSelection, init_dfuse, init_diskImageFormat, init_espFlashLocation, locateEspFlashLayout, namedArtifactFormat, probeUefiFlashImage, recognizeArtifactFormat } from "./diskImageFormat-BtaIuHzH.js";
import { classifyTargetFilesystemFailure, init_binaryTargetFilesystemFailure } from "./binaryTargetFilesystemFailure-Jtx2RF9Z.js";
import { constants } from "node:fs";
import { extname } from "node:path";
import { access, realpath, stat } from "node:fs/promises";

//#region dist/application/MipsElfSharedLoad.js
var readMipsElfSharedLoad;
function init_MipsElfSharedLoad() {
	return (init_MipsElfSharedLoad = __esmMin((() => {
		init_elfRelocation();
		init_elfDynamicEntry();
		init_binaryContainer();
		init_result();
		readMipsElfSharedLoad = async (programHeaders, little, fileSize, read, checkCancelled, sections) => {
			const loads = [];
			let dynamic;
			for (const [index, program] of programHeaders.entries()) {
				checkCancelled();
				const { type } = program;
				const offset = Number(program.offset);
				const size = Number(program.fileSize);
				if (type === 1) {
					const address = Number(program.virtualAddress);
					const memorySize = Number(program.memorySize);
					if (offset > fileSize - size || size > memorySize || address + memorySize > 4294967296) return err("invalid or incomplete MIPS PT_LOAD range");
					loads.push({
						index,
						offset,
						address,
						size,
						memorySize
					});
				}
				if (type === 2) {
					if (dynamic !== undefined) return err("duplicate MIPS PT_DYNAMIC tables");
					dynamic = {
						offset,
						address: Number(program.virtualAddress),
						size
					};
				}
			}
			if (dynamic === undefined) return err("MIPS shared image has no PT_DYNAMIC table");
			if (dynamic.size === 0 || dynamic.size % 8 !== 0) return err("invalid MIPS ELF32 dynamic table size");
			if (dynamic.offset > fileSize - dynamic.size) return err("MIPS PT_DYNAMIC range extends beyond the file");
			const loadAddresses = loads.map((load) => ({
				headerIndex: load.index,
				virtualAddress: load.address
			}));
			let prelinkBase = null;
			if (fileSize >= 8) {
				const trailer = await read(fileSize - 8, 8, "MIPS prelink trailer");
				if (!trailer.ok) return err(trailer.error);
				const tag = trailer.value.subarray(4).toString("latin1");
				if (tag.replace(/^[\u0000-\u0020]+|[\u0000-\u0020]+$/gu, "") === "PRE") prelinkBase = new BinaryReader(trailer.value, little, "elf").u32(0);
			}
			const ranges = loads.filter((load) => load.memorySize > 0).sort((left, right) => left.address - right.address);
			for (let i = 1; i < ranges.length; i += 1) {
				checkCancelled();
				const previous = ranges[i - 1];
				if (ranges[i].address < previous.address + previous.memorySize) return err("overlapping MIPS PT_LOAD memory ranges require separate mapping verification");
			}
			const mapped = (address, length, fileBacked) => {
				let low = 0;
				let high = ranges.length;
				while (low < high) {
					const middle = Math.floor((low + high) / 2);
					if (ranges[middle].address <= address) low = middle + 1;
					else high = middle;
				}
				const range = ranges[low - 1];
				return range !== undefined && address - range.address <= (fileBacked ? range.size : range.memorySize) - length ? range : undefined;
			};
			const dynamicMapping = mapped(dynamic.address, dynamic.size, true);
			if (dynamicMapping === undefined || dynamicMapping.offset + dynamic.address - dynamicMapping.address !== dynamic.offset) return err("MIPS PT_DYNAMIC has no unique matching file-backed PT_LOAD range");
			const chunkBytes = 64 * 1024;
			const DT_FLAGS_1 = 1879048187;
			const relrTags = Object.values(ELF_RELR_DYNAMIC_TAGS.standard).map(Number);
			const relevant = new Set([
				2,
				7,
				8,
				9,
				17,
				18,
				19,
				20,
				23,
				...relrTags,
				DT_FLAGS_1
			]);
			const tags = new Map();
			let terminated = false;
			let declaresAndroidRelocations = false;
			for (let offset = 0; offset < dynamic.size && !terminated; offset += chunkBytes) {
				const chunk = await read(dynamic.offset + offset, Math.min(chunkBytes, dynamic.size - offset), "dynamic table");
				if (!chunk.ok) return chunk;
				for (let position = 0; position < chunk.value.length; position += 8) {
					checkCancelled();
					const parsedEntry = readElfDynamicEntry(chunk.value.subarray(position, position + 8), 32, little);
					if (!parsedEntry.ok) return err(parsedEntry.error.message);
					const tag = Number(BigInt.asUintN(32, parsedEntry.value.tag));
					if (tag === 0) {
						terminated = true;
						break;
					}
					if (isElfAndroidRelocationDynamicTag(parsedEntry.value.tag)) declaresAndroidRelocations = true;
					if (!relevant.has(tag)) continue;
					if (tags.has(tag)) return err(`duplicate MIPS dynamic tag ${tag}`);
					tags.set(tag, Number(parsedEntry.value.value));
				}
			}
			if (!terminated) return err("MIPS dynamic table has no DT_NULL terminator");
			const DF_1_PIE = 134217728;
			const imageFacts = {
				loadAddresses,
				prelinkBase,
				...((tags.get(DT_FLAGS_1) ?? 0) & DF_1_PIE) === 0 ? {} : { declaresPie: true }
			};
			if (relrTags.some((tag) => tags.has(tag))) return err("MIPS shared RELR relocation declarations require separate verification");
			if (declaresAndroidRelocations) return err("MIPS shared Android relocation declarations require separate verification");
			if ([
				2,
				7,
				8,
				9,
				23
			].some((tag) => (tags.get(tag) ?? 0) !== 0)) return err("MIPS shared RELA or PLT relocation declarations require separate verification");
			const address = tags.get(17);
			const size = tags.get(18);
			const stride = tags.get(19);
			const checkSections = (offset, length) => {
				let observed = 0;
				for (const section of sections) {
					checkCancelled();
					if (section.compressed) return `MIPS section relocation declarations at file offset ${section.offset} use compressed storage; decoded relocation coverage is unavailable`;
					if (section.size === 0) continue;
					if (section.type !== 9 || section.entrySize !== 8 || section.offset !== offset || section.size !== length) return "MIPS section relocation declarations outside the dynamic REL table require separate verification";
					observed += 1;
				}
				return observed > 1 ? "duplicate MIPS section relocation declarations require separate verification" : undefined;
			};
			const emptyRelocations = () => {
				const reason = checkSections(0, 0);
				return reason === undefined ? ok({
					status: "complete",
					relocationCount: 0,
					relocationTypes: [],
					symbolRelativeCount: 0,
					...imageFacts
				}) : err(reason);
			};
			if (address === undefined && size === undefined && stride === undefined) return emptyRelocations();
			if (address === undefined || size === undefined || stride !== 8 || size % 8 !== 0) return err("incomplete or invalid MIPS DT_REL/DT_RELSZ/DT_RELENT declaration");
			if (size === 0) return emptyRelocations();
			const mapping = mapped(address, size, true);
			if (mapping === undefined) return err("MIPS DT_REL range has no unique complete file-backed PT_LOAD mapping");
			const fileOffset = mapping.offset + address - mapping.address;
			const sectionReason = checkSections(fileOffset, size);
			if (sectionReason !== undefined) return err(sectionReason);
			let symbolRelativeCount = 0;
			const types = new Set();
			for (let offset = 0; offset < size; offset += chunkBytes) {
				const chunk = await read(fileOffset + offset, Math.min(chunkBytes, size - offset), "dynamic REL records");
				if (!chunk.ok) return chunk;
				for (let position = 0; position < chunk.value.length; position += 8) {
					checkCancelled();
					const parsedEntry = readElfRelocationEntry(chunk.value.subarray(position, position + 8), 32, little, "rel");
					if (!parsedEntry.ok) return err(parsedEntry.error.message);
					const { type, symbolIndex, offset: rawAddress } = parsedEntry.value;
					const relocationAddress = Number(rawAddress);
					if (type === 3 && mapped(relocationAddress, 4, false) === undefined) return err("MIPS REL32 destination has no unique complete PT_LOAD memory range");
					types.add(type);
					if (type === 3 && symbolIndex !== 0) symbolRelativeCount += 1;
				}
			}
			return ok({
				status: "complete",
				relocationCount: size / 8,
				relocationTypes: [...types].sort((left, right) => left - right),
				symbolRelativeCount,
				...imageFacts
			});
		};
	})))();
}

//#endregion
//#region dist/domain/elfAttributeUleb.js
var readElfAttributeUleb;
function init_elfAttributeUleb() {
	return (init_elfAttributeUleb = __esmMin((() => {
		init_leb128();
		readElfAttributeUleb = (bytes, offset, end) => {
			const read = readLeb128(bytes, offset, end, ULEB32);
			return "failure" in read ? undefined : {
				value: Number(read.value),
				next: read.next
			};
		};
	})))();
}

//#endregion
//#region dist/application/MipsGnuAttributes.js
var FORMAT_VERSION$1, TAG_FILE$1, TAG_GNU_MIPS_ABI_FP, TAG_GNU_MIPS_ABI_MSA, parseMipsGnuAttributes;
function init_MipsGnuAttributes() {
	return (init_MipsGnuAttributes = __esmMin((() => {
		init_binaryContainer();
		init_elfAttributeUleb();
		init_result();
		FORMAT_VERSION$1 = 65;
		TAG_FILE$1 = 1;
		TAG_GNU_MIPS_ABI_FP = 4;
		TAG_GNU_MIPS_ABI_MSA = 8;
		parseMipsGnuAttributes = (bytes, littleEndian) => {
			if (bytes.length === 0 || bytes[0] !== FORMAT_VERSION$1) return err("unsupported MIPS GNU attribute section format version");
			const reader = new BinaryReader(bytes, littleEndian, "mips-gnu-attributes");
			let fpAbi = null;
			let msa = null;
			let vendorSeen = false;
			let position = 1;
			while (position < bytes.length) {
				if (bytes.length - position < 4) return err("truncated MIPS GNU attribute subsection length");
				const length = reader.u32(position);
				if (length < 4 || length > bytes.length - position) return err("MIPS GNU attribute subsection length does not fit the section");
				const end = position + length;
				const vendorEnd = bytes.subarray(0, end).indexOf(0, position + 4);
				if (vendorEnd < 0) return err("unterminated MIPS GNU attribute vendor name");
				if (bytes.toString("latin1", position + 4, vendorEnd) !== "gnu") return err("MIPS ELF declares non-GNU vendor attributes that REA does not inspect");
				if (vendorSeen) return err("duplicate MIPS GNU attribute vendor subsections");
				vendorSeen = true;
				let cursor = vendorEnd + 1;
				while (cursor < end) {
					const scopeStart = cursor;
					const scope = readElfAttributeUleb(bytes, cursor, end);
					if (scope === undefined) return err("malformed MIPS GNU attribute scope tag");
					if (scope.value !== TAG_FILE$1) return err("MIPS GNU attributes scoped to sections or symbols are not inspected by REA");
					if (end - scope.next < 4) return err("truncated MIPS GNU attribute scope length");
					const scopeLength = reader.u32(scope.next);
					if (scopeLength < scope.next + 4 - scopeStart || scopeLength > end - scopeStart) return err("MIPS GNU attribute scope length does not fit its subsection");
					const scopeEnd = scopeStart + scopeLength;
					cursor = scope.next + 4;
					while (cursor < scopeEnd) {
						const tag = readElfAttributeUleb(bytes, cursor, scopeEnd);
						if (tag === undefined) return err("malformed MIPS GNU attribute tag");
						if (tag.value !== TAG_GNU_MIPS_ABI_FP && tag.value !== TAG_GNU_MIPS_ABI_MSA) return err(`MIPS ELF declares GNU attribute tag ${tag.value}, which REA does not inspect`);
						const value = readElfAttributeUleb(bytes, tag.next, scopeEnd);
						if (value === undefined) return err("malformed MIPS GNU attribute value");
						if (tag.value === TAG_GNU_MIPS_ABI_FP) {
							if (fpAbi !== null) return err("duplicate MIPS GNU floating-point ABI attributes");
							fpAbi = value.value;
						} else {
							if (msa !== null) return err("duplicate MIPS GNU MSA ABI attributes");
							msa = value.value;
						}
						cursor = value.next;
					}
					cursor = scopeEnd;
				}
				position = end;
			}
			return ok({
				fpAbi,
				msa
			});
		};
	})))();
}

//#endregion
//#region dist/application/MipsElfMetadata.js
var SHT_GNU_ATTRIBUTES, MIPS_GNU_ATTRIBUTES_MAX_BYTES, readMipsElfMetadata;
function init_MipsElfMetadata() {
	return (init_MipsElfMetadata = __esmMin((() => {
		init_elfSectionHeader();
		init_elfProgramHeader();
		init_elfRawTableDeclarations();
		init_elfRelocation();
		init_binaryContainer();
		init_elfFixedHeader();
		init_result();
		init_MipsElfSharedLoad();
		init_MipsGnuAttributes();
		SHT_GNU_ATTRIBUTES = 1879048181;
		MIPS_GNU_ATTRIBUTES_MAX_BYTES = 4096;
		readMipsElfMetadata = async (handle, metadata, checkCancelled) => {
			checkCancelled();
			if (metadata.elfClass !== 32) return err("MIPS ABI record inspection currently supports ELF32 only");
			const fileSize = (await handle.stat()).size;
			checkCancelled();
			const read = async (offset, length, label, maxBytes) => {
				checkCancelled();
				if (!Number.isSafeInteger(fileSize) || offset < 0 || length < 0 || offset > fileSize - length) return err(`MIPS ${label} lies outside the file`);
				if (maxBytes !== undefined && (length === 0 || length > maxBytes)) return err(`MIPS ${label} size ${length} is outside REA's inspected bound of ${maxBytes} bytes`);
				const bytes = Buffer.alloc(length);
				let total = 0;
				while (total < length) {
					checkCancelled();
					const observed = await handle.read(bytes, total, length - total, offset + total);
					checkCancelled();
					if (observed.bytesRead === 0) return err(`truncated MIPS ${label}`);
					total += observed.bytesRead;
				}
				return ok(bytes);
			};
			const header = await read(0, 52, "ELF32 header");
			if (!header.ok) return header;
			const bytes = header.value;
			const fixedHeader = readElfFixedHeader(bytes, fileSize);
			if (!fixedHeader.ok) return fixedHeader;
			const little = metadata.byteOrder === "little";
			if (fixedHeader.value.elfClass !== 32 || fixedHeader.value.byteOrder !== metadata.byteOrder || fixedHeader.value.machine !== 8 || fixedHeader.value.type !== metadata.type || fixedHeader.value.flags !== metadata.flags) return err("MIPS ELF header no longer matches the resolved identity");
			const headerWidth = elfFixedHeaderWidth(32);
			if (fixedHeader.value.headerSize !== headerWidth) return err("invalid MIPS ELF32 version or header size");
			const raw = readElfRawTableDeclarations(bytes, fixedHeader.value);
			if (!raw.ok) return err(raw.error.message);
			const { programs, sections } = raw.value;
			const tables = [{
				label: "program header table",
				offset: Number(programs.offset),
				count: programs.count,
				stride: programs.width,
				entrySize: elfProgramHeaderWidth(32),
				recordType: 1879048195,
				optional: false
			}, {
				label: "section header table",
				offset: Number(sections.offset),
				count: sections.count,
				stride: sections.width,
				entrySize: elfSectionHeaderWidth(32),
				recordType: 1879048234,
				optional: true
			}];
			if (programs.count === 65535 || sections.count >= 65280) return err("extended or reserved MIPS ELF table numbering is unsupported");
			let record;
			let sharedLoad;
			let programHeaders;
			const relocationSections = [];
			const limitations = [];
			let gnuAttributes = null;
			for (const table of tables) {
				if (table.count === 0) {
					if (table.offset !== 0) return err(`unsupported extended or inconsistent MIPS ${table.label}`);
					continue;
				}
				if (table.offset < headerWidth || table.stride !== table.entrySize) return err(`invalid MIPS ${table.label} offset or entry size`);
				const count = table.optional ? Math.min(table.count, Math.max(0, Math.floor((fileSize - table.offset) / table.entrySize))) : table.count;
				if (count < table.count) limitations.push(`MIPS ${table.label} at file offset ${table.offset} extends beyond the captured file: examined ${count} of ${table.count} complete headers. ABI declarations in unavailable headers remain unknown.`);
				if (count === 0) continue;
				const contents = await read(table.offset, count * table.entrySize, table.label);
				if (!contents.ok) return contents;
				if (!table.optional && metadata.type === 3) programHeaders = [];
				let found = false;
				for (let i = 0; i < count; i += 1) {
					checkCancelled();
					const position = i * table.entrySize;
					const parsedRecord = table.optional ? readElfSectionHeader(contents.value.subarray(position, position + table.entrySize), 32, little) : readElfProgramHeader(contents.value.subarray(position, position + table.entrySize), 32, little);
					if (!parsedRecord.ok) return err(parsedRecord.error.message);
					const declaration = parsedRecord.value;
					if ("fileSize" in declaration) programHeaders?.push(declaration);
					const { type } = declaration;
					const declaredOffset = Number(declaration.offset);
					const declaredSize = Number("fileSize" in declaration ? declaration.fileSize : declaration.size);
					if ("compressed" in declaration && declaration.compressed && (type === table.recordType || type === SHT_GNU_ATTRIBUTES)) return err(`MIPS section header ${i} declares compressed ${type === SHT_GNU_ATTRIBUTES ? "GNU attributes" : "ABI flags"} at file offset ${declaredOffset}; decoded declarations are unavailable`);
					if (table.optional && type === SHT_GNU_ATTRIBUTES) {
						if (gnuAttributes !== null) return err("duplicate MIPS GNU attribute sections");
						const section = await read(declaredOffset, declaredSize, "GNU attribute section", MIPS_GNU_ATTRIBUTES_MAX_BYTES);
						if (!section.ok) return section;
						const parsed = parseMipsGnuAttributes(section.value, little);
						if (!parsed.ok) return parsed;
						gnuAttributes = parsed.value;
						continue;
					}
					if (metadata.type === 3 && "entrySize" in declaration && isElfRelocationSectionType(type)) relocationSections.push({
						type,
						offset: declaredOffset,
						size: declaredSize,
						entrySize: Number(declaration.entrySize),
						compressed: declaration.compressed
					});
					if (type !== table.recordType) continue;
					if (found) return err(`duplicate MIPS ABI records in ${table.label}`);
					found = true;
					const offset = declaredOffset;
					const size = declaredSize;
					if (size !== 24) return err("unsupported MIPS ABI record size; expected 24 bytes");
					const candidate = await read(offset, 24, "ABI record");
					if (!candidate.ok) return candidate;
					if (record !== undefined && !record.equals(candidate.value)) return err("conflicting MIPS program/section ABI declarations");
					record = candidate.value;
				}
			}
			if (metadata.type === 3 && programHeaders !== undefined) {
				if (limitations.length > 0) sharedLoad = {
					status: "unavailable",
					reason: `MIPS shared-image relocation declaration sources are incomplete. ${limitations.join(" ")}`
				};
				else {
					const shared = await readMipsElfSharedLoad(programHeaders, little, fileSize, read, checkCancelled, relocationSections);
					sharedLoad = shared.ok ? shared.value : {
						status: "unavailable",
						reason: shared.error
					};
				}
			}
			const shared = metadata.type === 3 ? { sharedLoad: sharedLoad ?? {
				status: "unavailable",
				reason: "MIPS shared image has no inspected program header table"
			} } : {};
			if (record === undefined) return ok({
				abiFlags: null,
				gnuAttributes,
				limitations,
				...shared
			});
			const reader = new BinaryReader(record, little, "mips-abi-flags");
			const abiFlags = {
				version: reader.u16(0),
				isaLevel: reader.u8(2),
				isaRevision: reader.u8(3),
				gprSize: reader.u8(4),
				cpr1Size: reader.u8(5),
				cpr2Size: reader.u8(6),
				fpAbi: reader.u8(7),
				isaExtension: reader.u32(8),
				ases: reader.u32(12),
				flags1: reader.u32(16),
				flags2: reader.u32(20)
			};
			if (gnuAttributes !== null && gnuAttributes.fpAbi !== null && gnuAttributes.fpAbi !== 0 && gnuAttributes.fpAbi !== abiFlags.fpAbi) return err("conflicting MIPS ABI flags and GNU floating-point ABI declarations");
			return ok({
				abiFlags,
				gnuAttributes,
				limitations,
				...shared
			});
		};
	})))();
}

//#endregion
//#region dist/domain/riscvIsaDeclaration.js
/**
* Find and interpret the image's `SHT_RISCV_ATTRIBUTES` section. Every section
* header is examined, so an absent declaration is observed, not assumed; two
* attribute sections leave the declaration unavailable. The caller satisfies
* each read from its own descriptor.
*/
function* readRiscvIsaDeclaration(prefix, fileSize) {
	const unavailable = (reason) => ({
		status: "unavailable",
		reason
	});
	const declarations = yield* readElfTableDeclarations(prefix, fileSize);
	if (!declarations.ok) return unavailable(declarations.error);
	const { header, sections } = declarations.value;
	const little = header.byteOrder === "little";
	let attributes;
	const perRead = Math.max(1, Math.floor(64 * 1024 / sections.width));
	for (let index = 0; index < sections.count; index += perRead) {
		const count = Math.min(perRead, sections.count - index);
		const size = count * sections.width;
		const bytes = yield {
			offset: Number(sections.offset) + index * sections.width,
			size
		};
		if (bytes.length !== size) return unavailable("truncated ELF section header table");
		for (let item = 0; item < count; item += 1) {
			const at = item * sections.width;
			const parsed = readElfSectionHeader(bytes.subarray(at, at + sections.width), header.elfClass, little);
			if (!parsed.ok) return unavailable(parsed.error.message);
			if (parsed.value.type !== 1879048195) continue;
			if (attributes !== undefined) return unavailable("the image has more than one RISC-V attribute section");
			attributes = {
				offset: parsed.value.offset,
				size: parsed.value.size
			};
		}
	}
	if (attributes === undefined) return { status: "absent" };
	if (attributes.size === 0n || attributes.size > BigInt(4096)) return unavailable(`RISC-V attribute section size ${String(attributes.size)} is outside REA's inspected bound of ${RISCV_ATTRIBUTES_MAX_BYTES} bytes`);
	if (attributes.offset > BigInt(fileSize) - attributes.size) return unavailable("RISC-V attribute section lies outside the file");
	const size = Number(attributes.size);
	const bytes = yield {
		offset: Number(attributes.offset),
		size
	};
	if (bytes.length !== size) return unavailable("truncated RISC-V attribute section");
	const arch = parseRiscvAttributes(bytes, little);
	if (!arch.ok) return unavailable(arch.error);
	return arch.value === null ? { status: "absent" } : riscvIsaDeclaration(arch.value);
}
var RISCV_FLOAT_ABIS, EF_RISCV_FLOAT_ABI, riscvFloatAbi, riscvAbiName, SHT_RISCV_ATTRIBUTES, RISCV_ATTRIBUTES_MAX_BYTES, FORMAT_VERSION, TAG_FILE, TAG_SECTION, TAG_SYMBOL, TAG_RISCV_ARCH, KNOWN_RISCV_ATTRIBUTE_TAGS, parseRiscvAttributes, ISA_BASE, ISA_EXTENSION, riscvIsaDeclaration;
function init_riscvIsaDeclaration() {
	return (init_riscvIsaDeclaration = __esmMin((() => {
		init_binaryContainer();
		init_elfAttributeUleb();
		init_elfDeclaredRanges();
		init_elfSectionHeader();
		init_result();
		RISCV_FLOAT_ABIS = [
			"soft",
			"single",
			"double",
			"quad"
		];
		EF_RISCV_FLOAT_ABI = 6;
		riscvFloatAbi = (flags) => RISCV_FLOAT_ABIS[(flags & EF_RISCV_FLOAT_ABI) >>> 1];
		riscvAbiName = (elfClass, floatAbi) => elfClass === 32 && floatAbi === "quad" ? null : `${elfClass === 32 ? "ilp32" : "lp64"}${{
			soft: "",
			single: "f",
			double: "d",
			quad: "q"
		}[floatAbi]}`;
		SHT_RISCV_ATTRIBUTES = 1879048195;
		RISCV_ATTRIBUTES_MAX_BYTES = 4096;
		FORMAT_VERSION = 65;
		TAG_FILE = 1;
		TAG_SECTION = 2;
		TAG_SYMBOL = 3;
		TAG_RISCV_ARCH = 5;
		KNOWN_RISCV_ATTRIBUTE_TAGS = new Set([
			4,
			TAG_RISCV_ARCH,
			6,
			8,
			10,
			12,
			14,
			16
		]);
		parseRiscvAttributes = (bytes, littleEndian) => {
			if (bytes.length === 0 || bytes[0] !== FORMAT_VERSION) return err("unsupported RISC-V attribute section format version");
			const section = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
			const reader = new BinaryReader(section, littleEndian, "RISC-V attributes");
			const readString = (offset, end) => {
				const field = section.subarray(offset, end);
				const stop = field.indexOf(0);
				return stop < 0 ? undefined : {
					value: field.toString("latin1", 0, stop),
					next: offset + stop + 1
				};
			};
			let arch = null;
			let vendorSeen = false;
			let position = 1;
			while (position < bytes.length) {
				if (bytes.length - position < 4) return err("truncated RISC-V attribute subsection length");
				const length = reader.u32(position);
				if (length < 4 || length > bytes.length - position) return err("RISC-V attribute subsection length does not fit the section");
				const end = position + length;
				const vendor = readString(position + 4, end);
				if (vendor === undefined) return err("unterminated RISC-V attribute vendor name");
				if (vendor.value !== "riscv") return err("RISC-V ELF declares non-riscv vendor attributes that REA does not inspect");
				if (vendorSeen) return err("duplicate riscv vendor attribute subsections");
				vendorSeen = true;
				let cursor = vendor.next;
				while (cursor < end) {
					const scopeStart = cursor;
					const scope = readElfAttributeUleb(bytes, cursor, end);
					if (scope === undefined) return err("malformed RISC-V attribute scope tag");
					if (scope.value !== TAG_FILE) return err(scope.value === TAG_SECTION || scope.value === TAG_SYMBOL ? "RISC-V attributes scoped to sections or symbols are not inspected by REA" : `unknown RISC-V attribute scope tag ${scope.value}`);
					if (end - scope.next < 4) return err("truncated RISC-V attribute scope length");
					const scopeLength = reader.u32(scope.next);
					if (scopeLength < scope.next + 4 - scopeStart || scopeLength > end - scopeStart) return err("RISC-V attribute scope length does not fit its subsection");
					const scopeEnd = scopeStart + scopeLength;
					cursor = scope.next + 4;
					while (cursor < scopeEnd) {
						const tag = readElfAttributeUleb(bytes, cursor, scopeEnd);
						if (tag === undefined) return err("malformed RISC-V attribute tag");
						if (tag.value % 2 === 1) {
							const value = readString(tag.next, scopeEnd);
							if (value === undefined) return err(`unterminated string value for RISC-V attribute tag ${tag.value}`);
							if (tag.value === TAG_RISCV_ARCH) {
								if (arch !== null) return err("duplicate RISC-V Tag_RISCV_arch attributes");
								arch = value.value;
							}
							cursor = value.next;
						} else {
							const value = readElfAttributeUleb(bytes, tag.next, scopeEnd);
							if (value === undefined) return err(`malformed integer value for RISC-V attribute tag ${tag.value}`);
							cursor = value.next;
						}
						if (tag.value % 128 < 64 && !KNOWN_RISCV_ATTRIBUTE_TAGS.has(tag.value)) return err(`unknown mandatory RISC-V attribute tag ${tag.value}`);
					}
				}
				position = end;
			}
			return ok(arch);
		};
		ISA_BASE = /^rv(32|64)([ie])(?:\d+p\d+)?$/u;
		ISA_EXTENSION = /^([a-z][a-z0-9]*?)(?:\d+p\d+)?$/u;
		riscvIsaDeclaration = (arch) => {
			const unavailable = (reason) => ({
				status: "unavailable",
				reason,
				arch
			});
			const [first = "", ...rest] = arch.split("_");
			const base = ISA_BASE.exec(first);
			if (base === null) return unavailable("Tag_RISCV_arch does not begin with a canonical rv32/rv64 I or E base");
			const extensions = [];
			for (const token of rest) {
				const name = ISA_EXTENSION.exec(token)?.[1];
				if (name === undefined) return unavailable(`Tag_RISCV_arch contains a non-canonical extension token "${token}"`);
				if (extensions.includes(name)) return unavailable(`Tag_RISCV_arch declares extension ${name} twice`);
				extensions.push(name);
			}
			return {
				status: "declared",
				arch,
				xlen: base[1] === "32" ? 32 : 64,
				base: base[2] === "e" ? "e" : "i",
				extensions
			};
		};
	})))();
}

//#endregion
//#region dist/domain/dosCom.js
var validateDosComLength;
function init_dosCom() {
	return (init_dosCom = __esmMin((() => {
		init_result();
		validateDosComLength = (length) => Number.isSafeInteger(length) && length >= 1 && length <= 65280 ? ok(null) : err("DOS COM requires 1..65280 file bytes (64 KiB segment minus the 256-byte PSP prefix)");
	})))();
}

//#endregion
//#region dist/domain/gamecubeDol.js
var DOL_HEADER_SIZE, DOL_TEXT_SECTION_COUNT, DOL_DATA_SECTION_COUNT, DOL_MEMORY_START, DOL_RAM_END, TEXT_FILE_OFFSET_TABLE, DATA_FILE_OFFSET_TABLE, TEXT_ADDRESS_TABLE, DATA_ADDRESS_TABLE, TEXT_SIZE_TABLE, DATA_SIZE_TABLE, BSS_ADDRESS_FIELD, BSS_SIZE_FIELD, ENTRY_POINT_FIELD, hex, readSlots, rangesOverlap, parseDolHeader;
function init_gamecubeDol() {
	return (init_gamecubeDol = __esmMin((() => {
		init_binaryContainer();
		init_result();
		DOL_HEADER_SIZE = 256;
		DOL_TEXT_SECTION_COUNT = 7;
		DOL_DATA_SECTION_COUNT = 11;
		DOL_MEMORY_START = 2147483648;
		DOL_RAM_END = 2172649472;
		TEXT_FILE_OFFSET_TABLE = 0;
		DATA_FILE_OFFSET_TABLE = 28;
		TEXT_ADDRESS_TABLE = 72;
		DATA_ADDRESS_TABLE = 100;
		TEXT_SIZE_TABLE = 144;
		DATA_SIZE_TABLE = 172;
		BSS_ADDRESS_FIELD = 216;
		BSS_SIZE_FIELD = 220;
		ENTRY_POINT_FIELD = 224;
		hex = (value) => `0x${value.toString(16)}`;
		readSlots = (reader, kind, count, tables) => Array.from({ length: count }, (_, index) => ({
			kind,
			index,
			fileOffset: reader.u32(tables.fileOffset + index * 4),
			address: reader.u32(tables.address + index * 4),
			size: reader.u32(tables.size + index * 4)
		}));
		rangesOverlap = (startA, sizeA, startB, sizeB) => startA < startB + sizeB && startB < startA + sizeA;
		parseDolHeader = (bytes, fileSize = bytes.length) => {
			if (!Number.isSafeInteger(fileSize) || fileSize < 0) return err("invalid DOL file extent: expected a nonnegative safe integer");
			if (fileSize < 256) return err(`DOL header is truncated: needs ${256} bytes; the file has ${fileSize}`);
			if (bytes.length < 256) return err(`DOL header bytes are incomplete: needs ${256} bytes; ${bytes.length} were supplied`);
			const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, 256), false, "gamecube-dol");
			const slots = [...readSlots(reader, "text", 7, {
				fileOffset: TEXT_FILE_OFFSET_TABLE,
				address: TEXT_ADDRESS_TABLE,
				size: TEXT_SIZE_TABLE
			}), ...readSlots(reader, "data", 11, {
				fileOffset: DATA_FILE_OFFSET_TABLE,
				address: DATA_ADDRESS_TABLE,
				size: DATA_SIZE_TABLE
			})];
			const used = slots.filter((slot) => slot.size > 0);
			const label = (slot) => `${slot.kind} ${slot.index}`;
			for (const slot of used) {
				const name = label(slot);
				const fileEnd = slot.fileOffset + slot.size;
				const addressEnd = slot.address + slot.size;
				if (slot.fileOffset < 256) return err(`${name}: file offset ${hex(slot.fileOffset)} overlaps the ${256}-byte DOL header`);
				if (fileEnd > fileSize) return err(`${name}: file range ${hex(slot.fileOffset)}..${hex(fileEnd)} exceeds the ${fileSize}-byte file`);
				if (slot.address < 2147483648) return err(`${name}: load address ${hex(slot.address)} is below ${hex(DOL_MEMORY_START)}`);
				if (addressEnd > 2172649472) return err(`${name}: load range ${hex(slot.address)}..${hex(addressEnd)} exceeds ${hex(DOL_RAM_END)}`);
			}
			for (const slot of used) {
				if (slot.kind !== "text") continue;
				for (const [field, value] of [
					["file offset", slot.fileOffset],
					["load address", slot.address],
					["size", slot.size]
				]) if (value % 4 !== 0) return err(`${label(slot)}: ${field} ${hex(value)} must be 4-byte aligned`);
			}
			const text = used.filter((slot) => slot.kind === "text");
			if (text.length === 0) return err("DOL has no used text section");
			for (const [i, a] of used.entries()) {
				for (const b of used.slice(i + 1)) {
					if (rangesOverlap(a.address, a.size, b.address, b.size)) return err(`${label(a)} and ${label(b)} overlap in load address range`);
					if (rangesOverlap(a.fileOffset, a.size, b.fileOffset, b.size)) return err(`${label(a)} and ${label(b)} overlap in file range`);
				}
			}
			const entryPoint = reader.u32(ENTRY_POINT_FIELD);
			if (entryPoint % 4 !== 0) return err(`entry point ${hex(entryPoint)} must be 4-byte aligned`);
			const inText = text.some((slot) => entryPoint >= slot.address && entryPoint < slot.address + slot.size);
			if (!inText) return err(`entry point ${hex(entryPoint)} is outside every used text section`);
			const bssAddress = reader.u32(BSS_ADDRESS_FIELD);
			const bssSize = reader.u32(BSS_SIZE_FIELD);
			const bssOverlaps = [];
			const bssData = [];
			if (bssSize > 0) {
				if (bssAddress < 2147483648) return err(`bss: load address ${hex(bssAddress)} is below ${hex(DOL_MEMORY_START)}`);
				if (bssAddress + bssSize > 2172649472) return err(`bss: load range ${hex(bssAddress)}..${hex(bssAddress + bssSize)} exceeds ${hex(DOL_RAM_END)}`);
				for (const slot of used) {
					if (!rangesOverlap(bssAddress, bssSize, slot.address, slot.size)) continue;
					if (slot.kind === "text") return err(`bss and ${label(slot)} overlap in load address range`);
					bssOverlaps.push(slot.index);
					bssData.push(slot);
				}
			}
			const bssGaps = [];
			const bssEnd = bssAddress + bssSize;
			let cursor = bssAddress;
			for (const slot of bssData.sort((left, right) => left.address - right.address)) {
				if (cursor < slot.address) bssGaps.push({
					address: cursor,
					size: slot.address - cursor
				});
				cursor = Math.min(bssEnd, slot.address + slot.size);
			}
			if (cursor < bssEnd) bssGaps.push({
				address: cursor,
				size: bssEnd - cursor
			});
			return ok({
				sections: used.map(({ kind, index, fileOffset, address, size }) => ({
					kind,
					index,
					fileOffset,
					address,
					size
				})),
				bss: {
					address: bssAddress,
					size: bssSize
				},
				bssGaps,
				bssOverlaps,
				entryPoint
			});
		};
	})))();
}

//#endregion
//#region dist/domain/gamecubeDolAdmission.js
var GAMECUBE_DOL_ARCHITECTURE, admitGamecubeDol;
function init_gamecubeDolAdmission() {
	return (init_gamecubeDolAdmission = __esmMin((() => {
		init_gamecubeDol();
		init_rawBinary();
		init_result();
		GAMECUBE_DOL_ARCHITECTURE = "powerpc";
		admitGamecubeDol = (input) => {
			const parsed = parseDolHeader(input.bytes, input.fileSize ?? input.bytes.length);
			if (!parsed.ok) return err({
				reason: `gamecube-dol header rejected: ${parsed.error}`,
				constraint: "file_format_rejected"
			});
			const header = parsed.value;
			const entryPoint = `0x${header.entryPoint.toString(16)}`;
			if (input.entryPoint !== undefined) {
				if (typeof input.entryPoint !== "string") return err({
					reason: "gamecube-dol entry_point must be a hexadecimal address of the form 0x…",
					constraint: "load_selection_rejected"
				});
				const requested = parseRawBinaryEntryPoint(input.entryPoint);
				if (!requested.ok) return err({
					reason: requested.error,
					constraint: "load_selection_rejected"
				});
				if (requested.value.value !== BigInt(header.entryPoint)) return err({
					reason: `gamecube-dol entry_point ${requested.value.canonical} conflicts with the DOL header entry ${entryPoint}`,
					constraint: "load_selection_rejected"
				});
			}
			return ok({
				architecture: GAMECUBE_DOL_ARCHITECTURE,
				entryPoint,
				entryPointSource: "dol-header",
				header
			});
		};
	})))();
}

//#endregion
//#region dist/application/BinaryTargetResolver.js
var BinaryTargetResolver_exports = /* @__PURE__ */ __exportAll({ parseBinaryTarget: () => parseBinaryTarget });
var XML_PLIST_PROBE_CHUNK_BYTES, parseBinaryTarget, readOpenedBinaryTarget, retainTargetCancellation, finalizedTargetResolution, targetFileCleanupError, targetResolutionFailure, throwIfTargetResolutionCancelled, detectArtifactFormat, isArchiveFormat, claimsLeadingExecutableHeader, readHandleRange, readLeadingBytes, sha256Handle, resolveAppBundle, readExecutableMetadata, readElfMetadata, readElfDeclarations, unresolvedMzHeaderFailure, readThinMachoMetadata, readMachoCommandFrames, readMachoSliceCommandFrames, readFatSliceHeaderEvidence, readPeMetadata, readPeCodeView;
function init_BinaryTargetResolver() {
	return (init_BinaryTargetResolver = __esmMin((() => {
		init_UefiFormatProbe();
		init_targetFormats();
		init_HostPlatform();
		init_artifactNameSelection();
		init_readFileHandleRange();
		init_peCoffHeader();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_resources();
		init_jsonValue();
		init_analysisErrorCancellation();
		init_analysisErrorProjection();
		init_configurationErrors();
		init_binaryTargetFilesystemFailure();
		init_RegularFile();
		init_StableFileHash();
		init_analysisErrorCore();
		init_binaryTargetTypes();
		init_result();
		init_MipsElfMetadata();
		init_elfDeclaredRanges();
		init_riscvIsaDeclaration();
		init_AppBundleExecutable();
		init_appleBundleTypes();
		init_dosCom();
		init_rawBinary();
		init_gamecubeDolAdmission();
		init_gamecubeDol();
		init_dosMz();
		init_appleArchiveFormat();
		init_diskImageFormat();
		init_artifactFormatRecognition();
		init_dfuse();
		init_espFlashLocation();
		init_espFlashSelection();
		init_zipPackageFormat();
		init_binaryTarget();
		init_machoContainer();
		init_jvmClassFile();
		init_machoLoadCommands();
		init_callerPath();
		init_localPath();
		init_errorMessage();
		XML_PLIST_PROBE_CHUNK_BYTES = 64 * 1024;
		parseBinaryTarget = async (input, options = {}) => {
			const { signal } = options;
			const admitted = localPathStringSchema.safeParse(input);
			if (!admitted.success) {
				if (signal?.aborted === true) return err(cancelledBy("resolve_binary_target", signal));
				return err(new BinaryTargetError(input, admitted.error.issues[0]?.message ?? "Invalid local path", { cause: admitted.error }));
			}
			const cwd = options.cwd ?? process.cwd();
			const candidate = absoluteCallerPath(admitted.data, { cwd });
			let stage = "resolve";
			const resolve = async () => {
				throwIfTargetResolutionCancelled(signal);
				await access(candidate, constants.R_OK);
				throwIfTargetResolutionCancelled(signal);
				const canonical = await realpath(candidate);
				stage = "read";
				const sourcePath = HOST_PLATFORM.platform === "win32" ? candidate : canonical;
				throwIfTargetResolutionCancelled(signal);
				const resolved = await resolveAppBundle(canonical, options);
				if (!resolved.ok) return resolved;
				throwIfTargetResolutionCancelled(signal);
				const { executable: path, infoPlist } = resolved.value;
				const bundle = infoPlist === undefined ? {} : { bundleInfoPlist: infoPlist };
				const classifiedAs = infoPlist === undefined ? candidate : path;
				return withOwnedRegularFile(path, {
					symlinks: "reject",
					...signal === undefined ? {} : { signal }
				}, async (source) => {
					try {
						return await readOpenedBinaryTarget(source, {
							path,
							sourcePath,
							callerInputPath: admitted.data,
							selectedPath: candidate,
							classifiedAs,
							...bundle
						}, options);
					} catch (cause) {
						throw new OwnedRegularFileOperationFailure(cause);
					}
				});
			};
			try {
				const resolved = await (options.resources === undefined ? resolve() : options.resources.run(resolve));
				return finalizedTargetResolution(resolved, signal);
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) {
					const fileFailure = cause;
					if (options.resources === undefined) return err(targetFileCleanupError(new RetainedRegularFileCleanupFailure(fileFailure), candidate, stage, signal));
					const retried = await retryRegularFileCleanup(fileFailure, options.resources, signal);
					if (retried.failure !== undefined) return err(targetFileCleanupError(retried.failure, candidate, stage, signal));
					const { operationFailure, outcome } = fileFailure;
					if (outcome.kind === "failed") return targetResolutionFailure(operationFailure ?? outcome.cause, candidate, stage, signal);
					return finalizedTargetResolution(outcome.value, signal);
				}
				if (cause instanceof RegularFileCancelled) return finalizedTargetResolution(cause.outcome.value, signal);
				if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
					const error = new BinaryTargetError(candidate, "A previous target file could not be closed", {
						cause,
						cleanup: cause.cleanup,
						partialObservation: cause.partialObservation
					});
					bindRegularFileCleanup(cause, error);
					return err(error);
				}
				return targetResolutionFailure(cause, candidate, stage, signal);
			}
		};
		readOpenedBinaryTarget = async (source, selected, options) => {
			const { handle, initial: metadata } = source;
			const { path, sourcePath, callerInputPath, selectedPath, classifiedAs, bundleInfoPlist } = selected;
			const bundle = bundleInfoPlist === undefined ? {} : { bundleInfoPlist };
			const identity = async () => ({
				path,
				sourcePath,
				...callerInputPath === path ? {} : { callerInputPath },
				...bundle,
				sha256: await sha256Handle(source, path, signal)
			});
			const hostArchitecture = options.hostArchitecture ?? HOST_PLATFORM.architecture;
			const { targetKind, formatHint, signal, architecture, entryPoint } = options;
			throwIfTargetResolutionCancelled(signal);
			const flashPairing = espFlashSelectionError({
				format: formatHint,
				flashOffset: options.espFlash?.flashOffset,
				partitionTableOffset: options.espFlash?.partitionTableOffset
			});
			if (flashPairing !== undefined) return err(new BinaryTargetError(path, flashPairing, { constraint: "load_selection_rejected" }));
			if (formatHint === "raw-binary") {
				if (targetKind !== undefined && targetKind !== "executable") return err(new BinaryTargetError(path, "raw-binary format requires an executable target kind", { constraint: "load_selection_rejected" }));
				const admitted = admitRawBinary({
					architecture,
					entryPoint,
					fileBytes: metadata.size
				});
				if (!admitted.ok) return err(new BinaryTargetError(path, admitted.error.reason, { constraint: admitted.error.constraint }));
				return ok({
					...await identity(),
					kind: "executable",
					format: "raw-binary",
					architecture: admitted.value.architecture,
					availableArchitectures: [admitted.value.architecture],
					entryPoint: admitted.value.entryPoint,
					entryPointSource: admitted.value.entryPointSource
				});
			}
			const pairing = rawBinarySelectionError({
				...formatHint === undefined ? {} : { format: formatHint },
				architecture,
				entryPoint
			});
			if (pairing !== undefined) return err(new BinaryTargetError(path, pairing, { constraint: "load_selection_rejected" }));
			if (formatHint === "gamecube-dol") {
				if (targetKind !== undefined && targetKind !== "executable") return err(new BinaryTargetError(path, "gamecube-dol format requires an executable target kind", { constraint: "load_selection_rejected" }));
				const headerBytes = await readLeadingBytes(handle, Math.min(metadata.size, 256), path, signal);
				const admitted = admitGamecubeDol({
					bytes: headerBytes,
					fileSize: metadata.size,
					entryPoint
				});
				if (!admitted.ok) return err(new BinaryTargetError(path, admitted.error.reason, { constraint: admitted.error.constraint }));
				return ok({
					...await identity(),
					kind: "executable",
					format: "gamecube-dol",
					architecture: admitted.value.architecture,
					availableArchitectures: [admitted.value.architecture],
					byteOrder: "big",
					bits: 32,
					entryPoint: admitted.value.entryPoint,
					entryPointSource: admitted.value.entryPointSource,
					dol: admitted.value.header
				});
			}
			if (formatHint === "esp-flash-image") {
				if (targetKind !== undefined && targetKind !== "archive") return err(new BinaryTargetError(path, "ESP flash image format requires an archive target kind", { constraint: "load_selection_rejected" }));
				const selection = options.espFlash ?? {};
				const located = await locateEspFlashLayout(metadata.size, (position, length) => readHandleRange(handle, position, length, signal), selection, {
					explicit: true,
					...signal === undefined ? {} : { signal }
				});
				if (!located.ok) return err(new BinaryTargetError(path, `ESP flash image layout is not recognized: ${located.error}`, { constraint: "file_format_rejected" }));
				return ok({
					...await identity(),
					artifactSelectedPath: selectedPath,
					kind: "archive",
					format: "esp-flash-image",
					espFlash: {
						selected: true,
						flashOffset: selection.flashOffset ?? null,
						partitionTableOffset: selection.partitionTableOffset ?? null
					}
				});
			}
			if (formatHint === "dos-com") {
				if (targetKind !== undefined && targetKind !== "executable") return err(new BinaryTargetError(path, "DOS COM format requires an executable target kind", { constraint: "load_selection_rejected" }));
				const length = validateDosComLength(metadata.size);
				if (!length.ok) return err(new BinaryTargetError(path, length.error, { constraint: "file_format_rejected" }));
				return ok({
					...await identity(),
					kind: "executable",
					format: "dos-com",
					architecture: "x86",
					availableArchitectures: ["x86"]
				});
			}
			const classificationPath = artifactNameForClassification(classifiedAs, path);
			const artifactFormat = targetKind === "database" ? undefined : await detectArtifactFormat(classificationPath, source, signal, path);
			const artifactIdentity = async () => ({
				...await identity(),
				artifactSelectedPath: selectedPath
			});
			if (targetKind === "database" || targetKind === undefined && artifactFormat !== "ines" && artifactFormat !== "uefi" && artifactFormat !== "plist" && path.toLowerCase().endsWith(".hop")) return ok({
				...await identity(),
				kind: "database",
				format: "analysis-database"
			});
			if (artifactFormat !== undefined) {
				const identity = await artifactIdentity();
				if (artifactFormat === "esp-flash-image") return ok({
					...identity,
					kind: "archive",
					format: artifactFormat,
					espFlash: {
						selected: false,
						flashOffset: null,
						partitionTableOffset: null
					}
				});
				return isArchiveFormat(artifactFormat) ? ok({
					...identity,
					kind: "archive",
					format: artifactFormat
				}) : ok({
					...identity,
					kind: "artifact",
					format: artifactFormat
				});
			}
			const detected = await readExecutableMetadata(source, hostArchitecture, signal);
			if (!detected.ok) {
				if (!await claimsLeadingExecutableHeader(handle, metadata.size, signal) && await hasTrailingZipArchive(metadata.size, (position, length) => readHandleRange(handle, position, length, signal))) return ok({
					...await artifactIdentity(),
					kind: "archive",
					format: zipRootPackageFormat(classificationPath)
				});
				const reason = typeof detected.error === "string" ? detected.error : detected.error.reason;
				const diagnostics = typeof detected.error === "string" ? undefined : detected.error.diagnostics;
				return err(new BinaryTargetError(path, reason, {
					constraint: "file_format_rejected",
					...diagnostics === undefined ? {} : { diagnostics }
				}));
			}
			return ok({
				...await identity(),
				kind: "executable",
				...detected.value
			});
		};
		retainTargetCancellation = (failure, signal) => {
			if (signal?.aborted === true) analysisErrorWithCancellation(failure, cancelledBy("resolve_binary_target", signal));
			return failure;
		};
		finalizedTargetResolution = (result, signal) => {
			if (!result.ok) return err(retainTargetCancellation(result.error, signal));
			if (signal?.aborted !== true) return result;
			return err(cancelledBy("resolve_binary_target", signal, { diagnostics: { completed_target: jsonValueSchema.parse(result.value) } }));
		};
		targetFileCleanupError = (failure, candidate, stage, signal) => {
			const cancellation = regularFileCancellation(failure);
			const completed = failure.outcome.kind === "completed" ? failure.outcome.value : undefined;
			const completedTarget = completed?.ok === true ? jsonValueSchema.parse(completed.value) : undefined;
			let primary;
			if (failure.outcome.kind === "failed") {
				const physical = failure.outcome.cause;
				primary = physical instanceof BinaryTargetError || physical instanceof AnalysisCancelledError ? physical : cancellation !== undefined ? cancelledBy("resolve_binary_target", carriedReason(cancellation.reason)) : classifyTargetFilesystemFailure(candidate, physical, stage) ?? new BinaryTargetError(failure.path, "Target read failed before file cleanup", { cause: physical });
			} else if (completed?.ok === false) primary = completed.error;
			else if (cancellation !== undefined) primary = cancelledBy("resolve_binary_target", carriedReason(cancellation.reason), completedTarget === undefined ? {} : { diagnostics: { completed_target: completedTarget } });
			if (primary instanceof BinaryTargetError) retainTargetCancellation(primary, signal);
			const error = new BinaryTargetError(failure.path, "The target file handle could not be closed", {
				cause: failure,
				cleanupPrimary: primary,
				cleanup: {
					reason: errorMessage(failure.cleanupCause),
					resources: [failure.path]
				},
				...childFailureDiagnostics(primary === undefined ? {} : { primary_error: { error: primary } }, completedTarget === undefined ? {} : { completed_target: completedTarget })
			});
			bindRegularFileCleanup(failure, error);
			return error;
		};
		targetResolutionFailure = (cause, candidate, stage, signal) => {
			const physical = cause instanceof OwnedRegularFileOperationFailure ? cause.operationCause : cause;
			if (physical instanceof AnalysisCancelledError || physical instanceof BinaryTargetError) return err(retainTargetCancellation(physical, signal));
			if (!(cause instanceof OwnedRegularFileOperationFailure)) {
				const cancellation = regularFileCancellation(cause);
				if (cancellation !== undefined) return err(cancelledBy("resolve_binary_target", carriedReason(cancellation.reason)));
			}
			const failure = classifyTargetFilesystemFailure(candidate, physical, stage);
			if (failure === undefined) throw physical;
			return err(retainTargetCancellation(failure, signal));
		};
		throwIfTargetResolutionCancelled = (signal) => {
			if (signal?.aborted === true) throw cancelledBy("resolve_binary_target", signal);
		};
		detectArtifactFormat = async (path, source, signal, sourcePath) => {
			const { handle, initial } = source;
			throwIfTargetResolutionCancelled(signal);
			const lower = path.toLowerCase();
			const magic = Buffer.from(await readHandleRange(handle, 0, 4096, signal));
			try {
				await assertStableRegularFileIdentity(handle, sourcePath, initial, {
					symlinks: "reject",
					...signal === undefined ? {} : { signal }
				});
			} catch (cause) {
				throwIfTargetResolutionCancelled(signal);
				throw cause;
			}
			throwIfTargetResolutionCancelled(signal);
			if (magic.length >= 8 && magic.subarray(0, 8).equals(Buffer.from([
				0,
				97,
				115,
				109,
				1,
				0,
				0,
				0
			]))) throw new BinaryTargetError(path, "WebAssembly v1 artifacts are not supported by the native opening route", { constraint: "wasm_requires_static_inspection" });
			let suffix;
			let espFlashLayout;
			const recognitionInput = () => ({
				prefix: magic,
				fileSize: initial.size,
				suffix,
				espFlashLayout
			});
			let recognition = recognizeArtifactFormat(recognitionInput());
			while (recognition !== undefined) {
				throwIfTargetResolutionCancelled(signal);
				if (recognition.state === "recognized") return recognition.format === "zip" ? zipRootPackageFormat(lower) : recognition.format;
				if (recognition.state === "refused") throw new BinaryTargetError(path, recognition.reason, { constraint: "file_format_rejected" });
				if (recognition.format === "dfuse") suffix = initial.size < 16 ? new Uint8Array(0) : await readHandleRange(handle, initial.size - 16, 16, signal);
				else espFlashLayout = (await locateEspFlashLayout(initial.size, (position, length) => readHandleRange(handle, position, length, signal), {}, {
					explicit: false,
					...signal === undefined ? {} : { signal }
				})).ok;
				recognition = recognizeArtifactFormat(recognitionInput(), recognition.index);
			}
			const named = namedArtifactFormat(lower);
			if (named !== undefined && !claimsExecutableHeader(magic, initial.size)) return named;
			if (lower.endsWith(".pkg") && magic.length >= 4 && magic.subarray(0, 4).equals(Buffer.from("xar!"))) return "pkg";
			if (lower.endsWith(".dmg") && await hasDiskImageSignature(initial.size, (position, length) => readHandleRange(handle, position, length, signal))) return "dmg";
			if (await probeUefiFlashImage(handle, signal)) return "uefi";
			const xmlProbe = createXmlPlistSignatureProbe();
			let xmlState = xmlProbe.write(magic);
			if (xmlState === "matched") return "plist";
			const chunk = Buffer.alloc(XML_PLIST_PROBE_CHUNK_BYTES);
			let bytesRead = magic.length;
			while (xmlState === "pending" && bytesRead < 1048576) {
				throwIfTargetResolutionCancelled(signal);
				const read = await handle.read(chunk, 0, Math.min(chunk.length, MAX_XML_PLIST_PROBE_BYTES - bytesRead), bytesRead);
				throwIfTargetResolutionCancelled(signal);
				if (read.bytesRead === 0) break;
				bytesRead += read.bytesRead;
				xmlState = xmlProbe.write(chunk.subarray(0, read.bytesRead));
				if (xmlState === "matched") return "plist";
			}
			if (bytesRead === 1048576) {
				const { size } = initial;
				throwIfTargetResolutionCancelled(signal);
				if (size > bytesRead) throw new BinaryTargetError(path, "XML plist prolog was not found within the 1 MiB format probe limit", { constraint: "file_format_rejected" });
			}
			return undefined;
		};
		isArchiveFormat = (format) => BINARY_TARGET_FORMAT_KINDS[format] === "archive";
		claimsLeadingExecutableHeader = async (handle, size, signal) => claimsExecutableHeader(Buffer.from(await readHandleRange(handle, 0, Math.min(size, 4096), signal)), size);
		readHandleRange = async (handle, position, length, signal) => {
			const bytes = await readFileHandleRange(handle, position, length, () => throwIfTargetResolutionCancelled(signal));
			throwIfTargetResolutionCancelled(signal);
			return bytes;
		};
		readLeadingBytes = async (handle, size, path, signal) => {
			const bytes = Buffer.allocUnsafe(size);
			let position = 0;
			while (position < size) {
				throwIfTargetResolutionCancelled(signal);
				const observed = await handle.read(bytes, position, size - position, position);
				if (observed.bytesRead === 0) throw new BinaryTargetError(path, "target changed while being read");
				position += observed.bytesRead;
			}
			return bytes;
		};
		sha256Handle = async (source, path, signal) => {
			try {
				return (await hashStableRegularFileDescriptor(source, path, {
					symlinks: "reject",
					...signal === undefined ? {} : { signal }
				})).sha256;
			} catch (cause) {
				if (cause instanceof RegularFileOperationCancelled) throw cancelledBy("resolve_binary_target", carriedReason(cause.reason));
				if (cause instanceof RegularFileChangedError) throw new BinaryTargetError(path, "target changed while being read", { cause });
				throw cause;
			}
		};
		resolveAppBundle = async (path, options) => {
			const metadata = await stat(path);
			if (!metadata.isDirectory()) return ok({ executable: path });
			if (openableAppleBundleExtension(extname(path)) !== undefined) return resolveAppleBundleExecutable(path, options);
			if (isUnopenedAppleBundleExtension(extname(path))) return err(new BinaryTargetError(path, `${extname(path)} bundle directories are not opened by this route; it opens ${OPENABLE_APPLE_BUNDLE_TYPES_TEXT} bundle directories`, { constraint: "bundle_type_unsupported" }));
			return err(new BinaryTargetError(path, "this opening route requires a file or a supported Apple bundle directory", { constraint: "directory_requires_file" }));
		};
		readExecutableMetadata = async (source, hostArchitecture, signal) => {
			const { handle, initial } = source;
			throwIfTargetResolutionCancelled(signal);
			const bytes = await readHandleRange(handle, 0, 4096, signal);
			const fileSize = initial.size;
			if (bytes.length >= 2 && bytes[0] === 77 && bytes[1] === 90) {
				let evidence = parseMzHeaderEvidence(bytes, fileSize);
				let signatureEvidence;
				if (evidence.windowsHeader.state === "signature-needed") {
					const { offset } = evidence.windowsHeader;
					signatureEvidence = {
						offset,
						bytes: await readHandleRange(handle, offset, Math.min(4, fileSize - offset), signal)
					};
					evidence = withMzWindowsHeaderSignature(bytes, fileSize, evidence, signatureEvidence);
				}
				const { windowsHeader } = evidence;
				if (windowsHeader.state === "declared") {
					const limitation = mzWindowsHeaderLayoutLimitation(windowsHeader);
					if (limitation !== undefined) return err({
						reason: limitation,
						diagnostics: {
							unsupported_layout: true,
							mz_windows_header: { ...windowsHeader }
						}
					});
					return readPeMetadata(handle, windowsHeader.offset, {
						mzPrefix: bytes,
						fileSize,
						mzEvidence: evidence,
						signal
					});
				}
				const { relocationTableRead } = evidence;
				if (relocationTableRead !== undefined) {
					const observedBytes = await readHandleRange(handle, relocationTableRead.offset, relocationTableRead.byteLength, signal);
					evidence = parseMzHeaderEvidence(observedBytes, fileSize, signatureEvidence);
					if (evidence.windowsHeader.state === "candidate") return err(unresolvedMzHeaderFailure(evidence.windowsHeader, evidence.dos));
					return parseMzExecutableMetadata(observedBytes, evidence);
				}
				if (windowsHeader.state === "candidate") return err(unresolvedMzHeaderFailure(windowsHeader, evidence.dos));
				return parseMzExecutableMetadata(bytes, evidence);
			}
			if (bytes.length >= 4 && bytes.toString("hex", 0, 4) === "7f454c46") return readElfMetadata(handle, bytes, {
				fileSize,
				hostArchitecture,
				signal
			});
			const thin = await readThinMachoMetadata(handle, bytes, {
				fileSize,
				hostArchitecture,
				signal
			});
			if (thin !== null) return thin;
			const mayBeJvmClass = hasJvmClassHeader(bytes);
			if (mayBeJvmClass && fileSize > bytes.length && fileSize <= 16777216) {
				const complete = await readHandleRange(handle, 0, fileSize, signal);
				if (complete.byteLength === fileSize && isJvmClassFile(complete)) return err("unsupported binary format");
			}
			const fatEvidence = await readFatSliceHeaderEvidence(handle, bytes, fileSize, signal);
			if (mayBeJvmClass && fileSize > 16777216 && fatEvidence !== undefined) {
				const { header, sliceHeadersByOffset } = fatEvidence;
				const identity = classifyFatContainerIdentity(header, (offset) => sliceHeadersByOffset.get(offset)?.magic);
				const limitIssue = await readFatJvmIdentityLimitIssue(header, identity, (offset, length) => readHandleRange(handle, offset, length, signal));
				if (limitIssue !== null) return err(limitIssue);
			}
			const parsed = parseExecutableHeader(bytes, hostArchitecture, fileSize, undefined, fatEvidence);
			if (parsed.ok && parsed.value.format === "mach-o-universal" && fatEvidence !== undefined) {
				for (const slice of fatEvidence.header.slices) {
					const framed = await readMachoSliceCommandFrames(handle, slice, signal);
					if (!framed.ok) return framed;
				}
			}
			return parsed;
		};
		readElfMetadata = async (handle, bytes, options) => {
			const { fileSize, hostArchitecture, signal } = options;
			const parsed = parseExecutableHeader(bytes, hostArchitecture, fileSize);
			if (!parsed.ok || parsed.value.format !== "elf") return parsed;
			const ranges = await readElfDeclarations(handle, bytes, validateElfDeclaredRanges(bytes, fileSize), signal);
			if (!ranges.ok) return ranges;
			if (parsed.value.architecture === "riscv") return ok({
				...parsed.value,
				riscv: {
					...parsed.value.riscv,
					...ranges.value.hasInterpreter ? { hasInterpreter: true } : {},
					isa: await readElfDeclarations(handle, bytes, readRiscvIsaDeclaration(bytes, fileSize), signal)
				}
			});
			if (parsed.value.architecture !== "mips" || parsed.value.mips.elfClass !== 32) return parsed;
			const declarations = await readMipsElfMetadata(handle, parsed.value.mips, () => throwIfTargetResolutionCancelled(signal));
			if (!declarations.ok) return declarations;
			return ok({
				...parsed.value,
				mips: {
					...parsed.value.mips,
					abiFlags: declarations.value.abiFlags,
					gnuAttributes: declarations.value.gnuAttributes,
					...ranges.value.hasInterpreter ? { hasInterpreter: true } : {},
					...declarations.value.sharedLoad === undefined ? {} : { sharedLoad: declarations.value.sharedLoad },
					...declarations.value.limitations.length === 0 ? {} : { limitations: declarations.value.limitations }
				}
			});
		};
		readElfDeclarations = async (handle, prefix, steps, signal) => {
			let next = steps.next();
			let window;
			while (!next.done) {
				throwIfTargetResolutionCancelled(signal);
				const { offset, size } = next.value;
				let bytes;
				if (offset + size <= prefix.length) bytes = prefix.subarray(offset, offset + size);
				else {
					window ??= Buffer.allocUnsafe(64 * 1024);
					bytes = window.subarray(0, size);
					let length = 0;
					while (length < size) {
						const read = await handle.read(bytes, length, size - length, offset + length);
						throwIfTargetResolutionCancelled(signal);
						if (read.bytesRead === 0) break;
						length += read.bytesRead;
					}
					bytes = bytes.subarray(0, length);
				}
				next = steps.next(bytes);
			}
			return next.value;
		};
		unresolvedMzHeaderFailure = (windowsHeader, dos) => {
			return {
				reason: "MZ Windows new-header candidate is unresolved",
				diagnostics: {
					mz_windows_header: {
						state: windowsHeader.state,
						offset: windowsHeader.offset,
						signature: windowsHeader.signature
					},
					mz_dos: dos.ok ? {
						state: "valid",
						header_bytes: dos.value.headerBytes,
						image_bytes: dos.value.imageBytes,
						module_bytes: dos.value.moduleBytes,
						overlay_bytes: dos.value.overlayBytes,
						relocation_count: dos.value.relocationCount,
						relocation_table_offset: dos.value.relocationTableOffset,
						entry_segment: dos.value.entrySegment,
						entry_offset: dos.value.entryOffset
					} : {
						state: "invalid",
						reason: dos.error
					}
				}
			};
		};
		readThinMachoMetadata = async (handle, prefix, input) => {
			const table = readMachoLoadCommandTableHeader(prefix, input.fileSize);
			if (!table.ok) return table;
			if (table.value === null) return null;
			const parsed = parseExecutableHeader(prefix.subarray(0, table.value.headerSize), input.hostArchitecture, input.fileSize);
			if (!parsed.ok) return parsed;
			const framed = await readMachoCommandFrames(handle, table.value, {
				prefix,
				fileSize: input.fileSize,
				signal: input.signal
			});
			return framed.ok ? parsed : framed;
		};
		readMachoCommandFrames = async (handle, table, input) => {
			const commands = new MachoLoadCommandCursor(table);
			let window = input.prefix;
			let windowOffset = 0;
			while (commands.nextOffset !== null) {
				const offset = table.headerSize + commands.nextOffset;
				if (offset + 8 <= input.fileSize && (offset < windowOffset || offset + 8 > windowOffset + window.length)) {
					windowOffset = offset;
					window = await readHandleRange(handle, (input.fileOffset ?? 0) + offset, Math.min(4096, input.fileSize - offset), input.signal);
				}
				const relative = offset - windowOffset;
				const frame = commands.read(relative >= 0 ? window.subarray(relative, relative + 8) : Buffer.alloc(0));
				if (!frame.ok) return frame;
			}
			return commands.finish();
		};
		readMachoSliceCommandFrames = async (handle, slice, signal) => {
			const bytes = await readHandleRange(handle, slice.offset, Math.min(4096, slice.size), signal);
			const table = readMachoLoadCommandTableHeader(bytes, slice.size);
			if (!table.ok) return table;
			if (table.value === null) return err("FAT slice does not identify a thin Mach-O image");
			return readMachoCommandFrames(handle, table.value, {
				prefix: bytes,
				fileSize: slice.size,
				fileOffset: slice.offset,
				signal
			});
		};
		readFatSliceHeaderEvidence = async (handle, prefix, fileSize, signal) => {
			let header = readFatContainerHeader(prefix, fileSize);
			if (header.state === "needs-data") {
				const table = await readHandleRange(handle, 0, header.requiredBytes, signal);
				header = readFatContainerHeader(table, fileSize);
			}
			if (header.state !== "parsed") return undefined;
			const sliceHeadersByOffset = new Map();
			for (let index = 0; index < header.slices.length; index += 1) {
				const slice = header.slices[index];
				if (slice === undefined) continue;
				if (header.rangeIssues[index] !== null) continue;
				const observedLength = Math.min(12, slice.size);
				const thinHeader = await readHandleRange(handle, slice.offset, observedLength, signal);
				sliceHeadersByOffset.set(slice.offset, readMachoHeaderPrefixFacts(thinHeader));
			}
			return {
				header,
				sliceHeadersByOffset
			};
		};
		readPeMetadata = async (handle, offset, { mzPrefix, fileSize, mzEvidence, signal }) => {
			throwIfTargetResolutionCancelled(signal);
			const fileHeader = await readHandleRange(handle, offset, 24, signal);
			if (fileHeader.length !== 24) return err("invalid or truncated PE header");
			const { windowsHeader } = withMzWindowsHeaderSignature(mzPrefix, fileSize, mzEvidence, {
				offset,
				bytes: fileHeader.subarray(0, 4)
			});
			if (windowsHeader.state !== "declared") return err("invalid Windows new-header signature in MZ image");
			if ([
				"NE",
				"LE",
				"LX"
			].includes(windowsHeader.signature)) return err(`unsupported ${windowsHeader.signature} executable in MZ image`);
			const coff = readPeCoffHeader(fileHeader.subarray(4));
			if (!coff.ok) return err("invalid or truncated PE header");
			const optionalHeaderSize = coff.value.optionalHeaderSize;
			if (optionalHeaderSize > 4096) return err("invalid PE optional header size");
			const numberOfSections = coff.value.sectionCount;
			const record = await readHandleRange(handle, offset, 24 + optionalHeaderSize, signal);
			if (record.length !== 24 + optionalHeaderSize) return err("invalid or truncated PE header");
			const codeView = await readPeCodeView(handle, offset, numberOfSections, record.subarray(24), optionalHeaderSize, signal);
			const parsed = parsePeRecordFacts(record, codeView);
			return parsed.ok ? ok(parsed.value.metadata) : parsed;
		};
		readPeCodeView = async (handle, peOffset, numberOfSections, optionalHeader, optionalHeaderSize, signal) => {
			throwIfTargetResolutionCancelled(signal);
			const debugDir = peDebugDirectoryEntry(optionalHeader);
			if (debugDir === undefined || numberOfSections > 96) return undefined;
			const sectionTableOffset = peOffset + 24 + optionalHeaderSize;
			const sectionTableSize = numberOfSections * 40;
			const sectionTable = await readHandleRange(handle, sectionTableOffset, sectionTableSize, signal);
			if (sectionTable.length !== sectionTableSize) return undefined;
			const debugFileOffset = peRvaToFileOffset(debugDir.debugRva, sectionTable, numberOfSections, debugDir.sizeOfHeaders, Math.min(debugDir.debugSize, 4096));
			if (debugFileOffset === undefined) return undefined;
			const maxDebugSize = Math.min(debugDir.debugSize, 4096);
			const debugDirectoryBuffer = await readHandleRange(handle, debugFileOffset, maxDebugSize, signal);
			for (const { fileOffset: pointerToRawData, declaredSize: sizeOfData } of peCodeViewDirectoryEntries(debugDirectoryBuffer, sectionTable, numberOfSections, debugDir.sizeOfHeaders)) {
				if (pointerToRawData === undefined) continue;
				const maxCodeViewRead = Math.min(sizeOfData, PE_CODEVIEW_PREFIX_BYTES);
				const codeViewBuffer = await readHandleRange(handle, pointerToRawData, maxCodeViewRead, signal);
				const parsed = parseCodeViewData(codeViewBuffer, sizeOfData);
				if (parsed !== undefined) return parsed;
			}
			return undefined;
		};
	})))();
}

//#endregion
export { BinaryTargetResolver_exports, init_BinaryTargetResolver, init_dosCom, init_riscvIsaDeclaration, parseBinaryTarget, riscvAbiName, riscvFloatAbi, validateDosComLength };