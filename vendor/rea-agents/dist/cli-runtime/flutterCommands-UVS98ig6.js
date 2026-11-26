import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisError, AnalysisInputError, AnalysisProtocolError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, cancelledBy, carriedReason, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation } from "./jsonSerialization-DAF9DVXC.js";
import { BinaryReader, compareUnicodeCodePoints, init_binaryContainer, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, NonRegularFileReadError, OwnedFileHandle, RegularFileAdmissionFailure, ZipArtifactReader, artifactFileCancellationCause, assertArtifactReadActive, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedFileHandle, init_OwnedRegularFile, init_RegularFile, init_ZipArtifactReader, init_resources, openRegularFile, regularFileCancellation, sameRegularFileState } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError, providerCleanupErrorFromFailures } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { init_SignalAbort, isAbortWithReason } from "./SignalAbort-Cf4OmA08.js";
import { init_evidence, init_evidenceValidation, recognizeEvidence, withEvidenceCallerInputPath } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { MAX_FLUTTER_LIBRARY_PATH_BYTES, dartPoolBudgetLimit, dartPoolPolicy, flutterRequestSchema, init_flutterBuildAnalysis } from "./analysisViewResult-vDCF9Pxo.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { bindCliEvidenceCallerPath, init_cliEvidenceCallerPath } from "./cliEvidenceCallerPath-BMrJ1VvW.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { executeProviderOperation, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { init_elfDynamicEntry, readElfDynamicEntry } from "./elfDynamicEntry-DMv_AN_D.js";
import { init_elfFixedHeader, readElfFixedHeader } from "./elfFixedHeader-D38fsdBg.js";
import { init_elfProgramHeader, init_elfRawTableDeclarations, readElfProgramHeader, readElfRawTableDeclarations } from "./elfRawTableDeclarations-Cgbp6HKT.js";
import { elfSymbolSize, init_elfSymbol, readElfSymbol } from "./elfSymbol-BFeMfDna.js";
import { init_elfHashSymbolCount, readElfGnuHashSymbolCount, readElfHashSymbolCount } from "./elfHashSymbolCount-bhtCXT5A.js";
import { elfNoteAlignment, elfNoteSectionStorage, init_elfNoteLayout, isElfNotePadding, readElfNoteFrame } from "./elfNoteLayout-MbAzXIGv.js";
import { elfStringTableText, init_elfStringTable, observeElfStringTableEntry } from "./elfStringTable-tJEHn-H2.js";
import { init_elfDeclaredRanges, init_elfSectionHeader, readElfSectionHeader, validateElfSectionTableFields } from "./elfDeclaredRanges-BSLGQklL.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { init_privateWorkspaceFailure, privateWorkspaceFailure } from "./privateWorkspaceFailure-CaX68g9s.js";
import { FLUTTER_TOOL_CONTRACTS, init_flutterToolContracts } from "./flutterToolContracts-DTNxBYQa.js";
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { Buffer as Buffer$1 } from "node:buffer";
import { createHash } from "node:crypto";
import { chmod, mkdtemp, open, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { setImmediate } from "node:timers/promises";

//#region dist/application/flutter/FlutterBuildAnalysisService.js
var FlutterBuildAnalysisService;
function init_FlutterBuildAnalysisService() {
	return (init_FlutterBuildAnalysisService = __esmMin((() => {
		init_flutterBuildAnalysis();
		init_ProviderOperationExecution();
		FlutterBuildAnalysisService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			/** Run one caller-selected Flutter request and retain target identity inline. */
			execute(operation, input, options) {
				return executeProviderOperation(operation, input, options, flutterRequestSchema, this.provider, "observed");
			}
		};
	})))();
}

//#endregion
//#region dist/flutter/FlutterProviderIdentity.js
var FLUTTER_PROVIDER_IDENTITY;
function init_FlutterProviderIdentity() {
	return (init_FlutterProviderIdentity = __esmMin((() => {
		FLUTTER_PROVIDER_IDENTITY = {
			id: "flutter",
			name: "Flutter build identification",
			version: null
		};
	})))();
}

//#endregion
//#region dist/flutter/FlutterPayloadScan.js
var findBytes, DART_SNAPSHOT_MAGIC, SNAPSHOT_HASH_OFFSET, SNAPSHOT_HASH_LENGTH, SNAPSHOT_HASH_PATTERN, readDartSnapshotHash, MAX_SNAPSHOT_HASH_CANDIDATES, SnapshotHashScanner, DART_VERSION_PATTERN, DART_EMBEDDED_VERSION_PATTERN, TOOLCHAIN_PATTERN, MAX_TOOLCHAIN_LINES, CARRY_BYTES, LabeledStringScanner;
function init_FlutterPayloadScan() {
	return (init_FlutterPayloadScan = __esmMin((() => {
		findBytes = (haystack, needle, from) => {
			if (needle.length === 0) return from;
			const last = haystack.length - needle.length;
			for (let index = from; index <= last; index += 1) {
				let matched = true;
				for (let probe = 0; probe < needle.length; probe += 1) {
					if (haystack[index + probe] !== needle[probe]) {
						matched = false;
						break;
					}
				}
				if (matched) return index;
			}
			return -1;
		};
		DART_SNAPSHOT_MAGIC = Uint8Array.from([
			245,
			245,
			220,
			220
		]);
		SNAPSHOT_HASH_OFFSET = 20;
		SNAPSHOT_HASH_LENGTH = 32;
		SNAPSHOT_HASH_PATTERN = /^[0-9a-f]{32}$/u;
		readDartSnapshotHash = (bytes, snapshotOffset) => {
			const start = snapshotOffset + 20;
			const candidate = Buffer$1.from(bytes.subarray(start, start + 32)).toString("latin1");
			return SNAPSHOT_HASH_PATTERN.test(candidate) ? candidate : null;
		};
		MAX_SNAPSHOT_HASH_CANDIDATES = 64;
		SnapshotHashScanner = class {
			#sources = 0;
			#capped = false;
			candidates = [];
			candidateSet = new Set();
			#buffer = new Uint8Array(0);
			push(chunk) {
				const joined = new Uint8Array(this.#buffer.length + chunk.length);
				joined.set(this.#buffer, 0);
				joined.set(chunk, this.#buffer.length);
				let offset = 0;
				let pendingMagic = null;
				for (;;) {
					const magic = findBytes(joined, DART_SNAPSHOT_MAGIC, offset);
					if (magic === -1) break;
					if (magic + 20 + 32 > joined.length) {
						pendingMagic = magic;
						break;
					}
					const candidate = readDartSnapshotHash(joined, magic);
					if (candidate !== null && !this.candidateSet.has(candidate)) {
						if (this.candidates.length === 64) this.#capped = true;
						else {
							this.candidateSet.add(candidate);
							this.candidates.push(candidate);
						}
					}
					if (candidate !== null) this.#sources += 1;
					offset = magic + DART_SNAPSHOT_MAGIC.length;
				}
				const keepFrom = pendingMagic ?? Math.max(0, joined.length - (DART_SNAPSHOT_MAGIC.length - 1));
				this.#buffer = joined.slice(keepFrom);
			}
			result() {
				return {
					sources: this.#sources,
					candidates: [...this.candidates],
					capped: this.#capped
				};
			}
		};
		DART_VERSION_PATTERN = /^Dart VM version:[^\x00\n]{0,200}$/u;
		DART_EMBEDDED_VERSION_PATTERN = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)? \((?:stable|beta|dev|main)\) \([^)\x00\n]{1,80}\)(?: on "[a-z0-9._-]+")?$/u;
		TOOLCHAIN_PATTERN = /^(?:Android \([^)\x00\n]{0,80}\) clang version [^\x00\n]{0,500}|based on LLVM \d[^\x00\n]{0,80})$/u;
		MAX_TOOLCHAIN_LINES = 4;
		CARRY_BYTES = 640;
		LabeledStringScanner = class {
			#dartVersion = null;
			#dartVersionCapped = false;
			toolchainLines = [];
			carry = "";
			overflowed = false;
			#ended = false;
			#toolchainCapped = false;
			push(chunk) {
				for (const byte of chunk) {
					if (byte >= 32 && byte < 127) {
						if (this.carry.length < CARRY_BYTES) this.carry += String.fromCharCode(byte);
						else this.overflowed = true;
					} else {
						this.#consider(this.carry);
						this.carry = "";
						this.overflowed = false;
					}
				}
			}
			/** Commit any retained tail, e.g. when the stream ends mid-string. */
			end() {
				if (this.#ended) return;
				this.#ended = true;
				this.#consider(this.carry);
				this.carry = "";
				this.overflowed = false;
			}
			#recordDartVersion(text, accepted) {
				if (!accepted) {
					this.#dartVersionCapped = true;
					return;
				}
				if (this.#dartVersion === null) this.#dartVersion = text;
				else if (this.#dartVersion !== text) this.#dartVersionCapped = true;
			}
			#consider(text) {
				if (text.startsWith("Dart VM version:")) {
					this.#recordDartVersion(text, !this.overflowed && DART_VERSION_PATTERN.test(text));
					return;
				}
				if (DART_EMBEDDED_VERSION_PATTERN.test(text)) {
					this.#recordDartVersion(text, !this.overflowed);
					return;
				}
				if (!text.startsWith("Android (") && !text.startsWith("based on LLVM ")) return;
				if (this.overflowed || !TOOLCHAIN_PATTERN.test(text)) {
					this.#toolchainCapped = true;
					return;
				}
				const line = text;
				if (this.toolchainLines.includes(line)) return;
				if (this.toolchainLines.length < MAX_TOOLCHAIN_LINES) this.toolchainLines.push(line);
				else this.#toolchainCapped = true;
			}
			result() {
				if (!this.#ended) this.end();
				return {
					dartVersion: this.#dartVersion,
					dartVersionCapped: this.#dartVersionCapped,
					toolchainLines: [...this.toolchainLines],
					toolchainCapped: this.#toolchainCapped
				};
			}
		};
	})))();
}

//#endregion
//#region dist/flutter/ElfLoadMap.js
var createElfLoadMap;
function init_ElfLoadMap() {
	return (init_ElfLoadMap = __esmMin((() => {
		init_resources();
		init_result();
		createElfLoadMap = async (segments, signal) => {
			const events = segments.filter((segment) => segment.filesz > 0).flatMap((segment) => [{
				at: segment.vaddr,
				delta: segment.offset - segment.vaddr,
				change: 1
			}, {
				at: segment.vaddr + segment.filesz,
				delta: segment.offset - segment.vaddr,
				change: -1
			}]).sort((left, right) => left.at - right.at);
			const active = new Map();
			const spans = [];
			let previous = 0;
			for (let index = 0; index < events.length; index += 1) {
				if (index % 4096 === 0) {
					await setImmediate();
					assertArtifactReadActive(signal);
				}
				const event = events[index];
				if (event.at > previous && active.size > 0) {
					const delta = active.size === 1 ? active.keys().next().value : null;
					const last = spans.at(-1);
					if (last?.end === previous && last.delta === delta) last.end = event.at;
					else spans.push({
						start: previous,
						end: event.at,
						delta
					});
				}
				const count = (active.get(event.delta) ?? 0) + event.change;
				if (count === 0) active.delete(event.delta);
				else active.set(event.delta, count);
				previous = event.at;
			}
			const conflicts = [0];
			for (const span of spans) conflicts.push(conflicts.at(-1) + Number(span.delta === null));
			const locate = (address) => {
				let low = 0, high = spans.length;
				while (low < high) {
					const middle = Math.floor((low + high) / 2);
					if (spans[middle].start <= address) low = middle + 1;
					else high = middle;
				}
				return low - 1;
			};
			assertArtifactReadActive(signal);
			return (address, size) => {
				const missing = () => err({ reason: "has no contiguous file-backed PT_LOAD range" });
				const ambiguous = () => err({ reason: "has conflicting PT_LOAD mappings" });
				if (!Number.isSafeInteger(address) || !Number.isSafeInteger(size) || address < 0 || size < 0 || !Number.isSafeInteger(address + size)) return missing();
				const first = locate(address);
				const span = spans[first];
				if (span === undefined || size > 0 && address >= span.end) return missing();
				if (size === 0) {
					if (address > span.end) return missing();
					const left = spans[first - 1];
					if (span.delta === null || span.start === address && left?.end === address && left.delta !== span.delta) return ambiguous();
					return ok(address + span.delta);
				}
				const last = locate(address + size - 1);
				if (conflicts[last + 1] !== conflicts[first]) return ambiguous();
				return span.delta !== null && address < span.end && size <= span.end - address ? ok(address + span.delta) : missing();
			};
		};
	})))();
}

//#endregion
//#region dist/flutter/DartElf.js
var finishGnuHashCount, SHT_DYNSYM, SHF_ALLOC, PT_LOAD, PT_DYNAMIC, ET_DYN, DT_NULL, DT_HASH, DT_STRTAB, DT_SYMTAB, DT_STRSZ, DT_SYMENT, DT_GNU_HASH, ELF_HEADER_MAX_BYTES, readElfHeader, readElfSymbols, readSnapshotHeader;
function init_DartElf() {
	return (init_DartElf = __esmMin((() => {
		init_resources();
		init_elfStringTable();
		init_binaryContainer();
		init_result();
		init_elfDynamicEntry();
		init_elfHashSymbolCount();
		init_elfSectionHeader();
		init_elfProgramHeader();
		init_elfSymbol();
		init_elfRawTableDeclarations();
		init_elfDeclaredRanges();
		init_ElfLoadMap();
		init_FlutterPayloadScan();
		init_elfFixedHeader();
		finishGnuHashCount = async (walk, signal) => {
			for (let step = walk.next();; step = walk.next()) {
				if (step.done === true) return step.value;
				await setImmediate();
				assertArtifactReadActive(signal);
			}
		};
		SHT_DYNSYM = 11;
		SHF_ALLOC = 2;
		PT_LOAD = 1;
		PT_DYNAMIC = 2;
		ET_DYN = 3;
		DT_NULL = 0;
		DT_HASH = 4;
		DT_STRTAB = 5;
		DT_SYMTAB = 6;
		DT_STRSZ = 10;
		DT_SYMENT = 11;
		DT_GNU_HASH = 1879047925;
		ELF_HEADER_MAX_BYTES = 64;
		readElfHeader = (bytes, totalBytes = bytes.length) => {
			const fixedHeader = readElfFixedHeader(bytes, totalBytes);
			if (!fixedHeader.ok) return { failure: { reason: fixedHeader.error } };
			const is64 = fixedHeader.value.elfClass === 64;
			const headerBytes = is64 ? 64 : 52;
			if (fixedHeader.value.byteOrder !== "little") return { failure: { reason: "unsupported ELF byte order" } };
			if (fixedHeader.value.headerSize !== headerBytes) return { failure: { reason: "unsupported ELF header size" } };
			const e_type = fixedHeader.value.type;
			if (e_type !== 1 && e_type !== 2 && e_type !== ET_DYN) return { failure: { reason: "unsupported ELF type" } };
			const raw = readElfRawTableDeclarations(bytes, fixedHeader.value);
			if (!raw.ok) return { failure: { reason: raw.error.message } };
			const sectionTable = validateElfSectionTableFields(raw.value);
			if (!sectionTable.ok) return { failure: { reason: sectionTable.error } };
			const { programs, sections } = raw.value;
			const e_shoff = sections.offset <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(sections.offset) : null;
			const e_shentsize = sections.width;
			const e_shnum = sections.count;
			const e_phoff = programs.offset <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(programs.offset) : null;
			const e_phentsize = programs.width;
			const e_phnum = programs.count;
			const tableFits = (offset, width, count, minimumWidth) => offset !== null && offset >= headerBytes && offset <= totalBytes && width >= minimumWidth && count > 0 && count <= Math.floor((totalBytes - offset) / width);
			const MIN_SHENT = is64 ? 64 : 40;
			const sectionTableAbsent = e_type === ET_DYN && e_shoff === 0 && e_shnum === 0;
			if (e_shoff === null || !sectionTableAbsent && !tableFits(e_shoff, e_shentsize, e_shnum, MIN_SHENT)) return { failure: { reason: "ELF section header table is missing or out of bounds" } };
			const MIN_PHENT = is64 ? 56 : 32;
			if (e_phoff === null || e_phnum === 65535 || !tableFits(e_phoff, e_phentsize, e_phnum, MIN_PHENT)) return { failure: { reason: "ELF program header table is missing or out of bounds" } };
			return { header: {
				is64,
				sectionTableAbsent,
				e_shoff,
				e_shentsize,
				e_shnum,
				e_phoff,
				e_phentsize,
				e_phnum
			} };
		};
		readElfSymbols = async (bytes, symbolNames, signal) => {
			assertArtifactReadActive(signal);
			const failure = (reason) => ({
				symbols: [],
				failures: [{ reason }]
			});
			const parsed = readElfHeader(bytes);
			if (parsed.failure !== undefined) return failure(parsed.failure.reason);
			const { is64, sectionTableAbsent, e_shoff, e_shentsize, e_shnum, e_phoff, e_phentsize, e_phnum } = parsed.header;
			const reader = new BinaryReader(bytes, true, "ELF");
			const entrySize = elfSymbolSize(is64 ? 64 : 32);
			const segments = [];
			let dynamicSegment = null;
			for (let index = 0; index < e_phnum; index += 1) {
				if (index % 4096 === 0) {
					await setImmediate();
					assertArtifactReadActive(signal);
				}
				const base = e_phoff + index * e_phentsize;
				const parsedProgram = readElfProgramHeader(bytes.subarray(base, base + e_phentsize), is64 ? 64 : 32, true);
				if (!parsedProgram.ok) return failure(parsedProgram.error.message);
				const program = parsedProgram.value;
				const { type } = program;
				if (type !== PT_LOAD && type !== PT_DYNAMIC) continue;
				if (program.virtualAddress > BigInt(Number.MAX_SAFE_INTEGER) || program.offset > BigInt(Number.MAX_SAFE_INTEGER) || program.fileSize > BigInt(Number.MAX_SAFE_INTEGER)) return failure(`ELF segment ${String(index)} is not file-backed`);
				const vaddr = Number(program.virtualAddress);
				const offset = Number(program.offset);
				const filesz = Number(program.fileSize);
				if (!Number.isSafeInteger(vaddr + filesz) || offset > bytes.length || filesz > bytes.length - offset) return failure(`ELF segment ${String(index)} is not file-backed`);
				if (type === PT_LOAD) segments.push({
					vaddr,
					offset,
					filesz
				});
				else if (dynamicSegment !== null) return failure("Multiple PT_DYNAMIC segments are ambiguous");
				else dynamicSegment = {
					offset,
					filesz
				};
			}
			const toOffset = await createElfLoadMap(segments, signal);
			if (segments.length === 0) return failure("ELF image has no PT_LOAD segments");
			const tables = [];
			/**
			* The loader reads an allocated section through PT_LOAD, so its section
			* offset must be the single file interpretation of its address range.
			*/
			const sectionMappingFailure = (section, offset, size) => {
				const flags = Number(section.flags);
				const address = Number(section.address);
				if (!Number.isSafeInteger(flags) || !Number.isSafeInteger(address)) return "has an unrepresentable section header";
				if ((flags & SHF_ALLOC) === 0) return undefined;
				const mapped = toOffset(address, size);
				if (!mapped.ok) return mapped.error.reason;
				return mapped.value === offset ? undefined : "section offset disagrees with its PT_LOAD mapping";
			};
			if (!sectionTableAbsent) {
				for (let index = 0; index < e_shnum; index += 1) {
					if (index % 4096 === 0) {
						await setImmediate();
						assertArtifactReadActive(signal);
					}
					const header = e_shoff + index * e_shentsize;
					const parsedSection = readElfSectionHeader(bytes.subarray(header, header + e_shentsize), is64 ? 64 : 32, true);
					if (!parsedSection.ok) return failure(parsedSection.error.message);
					const section = parsedSection.value;
					if (section.type !== SHT_DYNSYM) continue;
					const offset = Number(section.offset);
					const size = Number(section.size);
					const link = section.link;
					if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || section.entrySize !== BigInt(entrySize) || offset > bytes.length || size > bytes.length - offset || size % entrySize !== 0) return failure("Dynamic symbol table is malformed");
					if (link >= e_shnum) return failure("Dynamic symbol string section link is invalid");
					const stringHeader = e_shoff + link * e_shentsize;
					const parsedStrings = readElfSectionHeader(bytes.subarray(stringHeader, stringHeader + e_shentsize), is64 ? 64 : 32, true);
					if (!parsedStrings.ok) return failure(parsedStrings.error.message);
					const strings = parsedStrings.value;
					const stringOffset = Number(strings.offset);
					const stringSize = Number(strings.size);
					if (strings.type !== 3 || !Number.isSafeInteger(stringOffset) || !Number.isSafeInteger(stringSize) || stringOffset > bytes.length || stringSize > bytes.length - stringOffset) return failure("Dynamic symbol strings are out of bounds or not a string table");
					const symbolMapping = sectionMappingFailure(section, offset, size);
					if (symbolMapping !== undefined) return failure(`Dynamic symbol table ${symbolMapping}`);
					const stringMapping = sectionMappingFailure(strings, stringOffset, stringSize);
					if (stringMapping !== undefined) return failure(`Dynamic symbol string table ${stringMapping}`);
					tables.push({
						source: "section",
						offset,
						count: size / entrySize,
						stringOffset,
						stringSize
					});
				}
			}
			if (tables.length === 0 && dynamicSegment !== null) {
				const tags = new Map();
				const dynamicEntrySize = is64 ? 16 : 8;
				let terminated = false;
				for (let base = dynamicSegment.offset; base + dynamicEntrySize <= dynamicSegment.offset + dynamicSegment.filesz; base += dynamicEntrySize) {
					if ((base - dynamicSegment.offset) % (4096 * dynamicEntrySize) === 0) {
						await setImmediate();
						assertArtifactReadActive(signal);
					}
					const parsedEntry = readElfDynamicEntry(bytes.subarray(base, base + dynamicEntrySize), is64 ? 64 : 32, true);
					if (!parsedEntry.ok) return failure(parsedEntry.error.message);
					const tagBits = BigInt.asUintN(is64 ? 64 : 32, parsedEntry.value.tag);
					if (tagBits > BigInt(Number.MAX_SAFE_INTEGER)) return failure("Dynamic entry is not representable");
					const tag = Number(tagBits);
					if (tag === DT_NULL) {
						terminated = true;
						break;
					}
					if (![
						DT_SYMTAB,
						DT_STRTAB,
						DT_STRSZ,
						DT_SYMENT,
						DT_HASH,
						DT_GNU_HASH
					].includes(tag)) continue;
					if (parsedEntry.value.value > BigInt(Number.MAX_SAFE_INTEGER)) return failure("Dynamic entry is not representable");
					const value = Number(parsedEntry.value.value);
					if (tags.has(tag) && tags.get(tag) !== value) return failure("Conflicting dynamic table tags");
					tags.set(tag, value);
				}
				const sym = tags.get(DT_SYMTAB);
				const str = tags.get(DT_STRTAB);
				const stringSize = tags.get(DT_STRSZ);
				if (!terminated || sym === undefined || str === undefined || stringSize === undefined || tags.get(DT_SYMENT) !== entrySize) return failure("Stripped ELF lacks a complete dynamic symbol-table description");
				const sysv = tags.get(DT_HASH);
				const gnu = tags.get(DT_GNU_HASH);
				const hashWords = (address) => (offset) => {
					const mapped = toOffset(address, offset + 4);
					return mapped.ok ? ok(reader.u32(mapped.value + offset)) : err(mapped.error.reason);
				};
				if (sysv === undefined && gnu === undefined) return failure("Stripped ELF has no DT_HASH or DT_GNU_HASH symbol count");
				const counted = sysv !== undefined ? readElfHashSymbolCount(hashWords(sysv)) : await finishGnuHashCount(readElfGnuHashSymbolCount(hashWords(gnu), is64 ? 8 : 4), signal);
				if (!counted.ok) return failure(counted.error.kind === "malformed" ? counted.error.message : counted.error.label);
				const count = counted.value;
				if (count === null) return failure("Stripped ELF has an indeterminate DT_GNU_HASH symbol count");
				const offset = toOffset(sym, count * entrySize);
				const stringOffset = toOffset(str, stringSize);
				if (!offset.ok) return failure(`Dynamic symbol table ${offset.error.reason}`);
				if (!stringOffset.ok) return failure(`Dynamic string table ${stringOffset.error.reason}`);
				tables.push({
					source: "dynamic-segment",
					offset: offset.value,
					count,
					stringOffset: stringOffset.value,
					stringSize
				});
			}
			const wanted = new Set(symbolNames);
			const symbols = new Map();
			const ambiguous = new Set();
			const unresolved = new Set();
			const failures = new Set();
			for (const table of tables) {
				const strings = bytes.subarray(table.stringOffset, table.stringOffset + table.stringSize);
				for (let index = 0; index < table.count; index += 1) {
					if (index % 4096 === 0) {
						await setImmediate();
						assertArtifactReadActive(signal);
					}
					const base = table.offset + index * entrySize;
					const parsedSymbol = readElfSymbol(bytes.subarray(base, base + entrySize), is64 ? 64 : 32, true);
					if (!parsedSymbol.ok) return failure(parsedSymbol.error.message);
					const symbol = parsedSymbol.value;
					const nameOffset = symbol.name_offset;
					const sectionIndex = symbol.section_index;
					const defined = sectionIndex === 65521 || sectionIndex > 0 && sectionIndex < 65280 && (table.source === "dynamic-segment" || sectionIndex < e_shnum);
					if (!defined || nameOffset >= table.stringSize) continue;
					const name = elfStringTableText(observeElfStringTableEntry(strings, nameOffset, 257));
					if (name === null || !wanted.has(name)) continue;
					if (symbol.value > BigInt(Number.MAX_SAFE_INTEGER) || symbol.size > BigInt(Number.MAX_SAFE_INTEGER)) {
						failures.add(`Symbol ${name} has unrepresentable bounds`);
						unresolved.add(name);
						continue;
					}
					const value = Number(symbol.value);
					const size = Number(symbol.size);
					const offset = toOffset(value, size);
					if (!offset.ok) {
						failures.add(`Symbol ${name} ${offset.error.reason}`);
						unresolved.add(name);
						continue;
					}
					const previous = symbols.get(name);
					if (previous !== undefined && (previous.offset !== offset.value || previous.size !== size)) ambiguous.add(name);
					else symbols.set(name, {
						name,
						offset: offset.value,
						size
					});
				}
			}
			for (const name of ambiguous) {
				symbols.delete(name);
				failures.add(`Symbol ${name} has conflicting definitions`);
			}
			for (const name of unresolved) symbols.delete(name);
			return {
				symbols: [...symbols.values()],
				failures: [...[...failures].map((reason) => ({ reason })), ...[...wanted].filter((name) => !symbols.has(name) && !ambiguous.has(name) && !unresolved.has(name)).map((name) => ({
					reason: `symbol ${name} is not in the dynamic symbol table`,
					missingSymbol: name
				}))]
			};
		};
		readSnapshotHeader = (bytes, offset) => {
			const magicSize = DART_SNAPSHOT_MAGIC.length;
			if (!Number.isSafeInteger(offset) || offset < 0 || offset > bytes.length - magicSize || !bytes.subarray(offset, offset + magicSize).equals(DART_SNAPSHOT_MAGIC)) return {
				magicValid: false,
				kind: null,
				headerLength: null,
				hash: null,
				complete: false
			};
			const reader = new BinaryReader(bytes, true, "Dart snapshot");
			const readSnapshotField = (fieldOffset) => {
				if (fieldOffset > bytes.length - 8) return null;
				const value = reader.i64(fieldOffset);
				return value >= 0n && value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : null;
			};
			const headerLength = readSnapshotField(offset + magicSize);
			const kind = readSnapshotField(offset + magicSize + 8);
			const hash = readDartSnapshotHash(bytes, offset);
			const complete = headerLength !== null && headerLength >= 20 + 32 - magicSize && headerLength <= bytes.length - offset - magicSize && kind !== null && hash !== null;
			return {
				magicValid: true,
				kind,
				headerLength,
				hash,
				complete
			};
		};
	})))();
}

//#endregion
//#region dist/flutter/DartSnapshotProfile.js
var LEGACY, UNIFIED, ALL_SYMBOLS, DATA_SYMBOLS, overlap, sameRange, profileFacts, observeDartSnapshot;
function init_DartSnapshotProfile() {
	return (init_DartSnapshotProfile = __esmMin((() => {
		init_DartElf();
		LEGACY = {
			name: "legacy-split",
			data: ["_kDartVmSnapshotData", "_kDartIsolateSnapshotData"],
			text: ["_kDartVmSnapshotInstructions", "_kDartIsolateSnapshotInstructions"],
			pool: "_kDartIsolateSnapshotData",
			kind: 3
		};
		UNIFIED = {
			name: "unified",
			data: ["_kDartSnapshotData"],
			text: ["_kDartSnapshotText"],
			pool: "_kDartSnapshotData",
			kind: 2
		};
		ALL_SYMBOLS = [
			...LEGACY.data,
			...LEGACY.text,
			...UNIFIED.data,
			...UNIFIED.text
		];
		DATA_SYMBOLS = new Set([...LEGACY.data, ...UNIFIED.data]);
		overlap = (a, b) => a.offset < b.offset + b.size && b.offset < a.offset + a.size;
		sameRange = (alias, canonical) => canonical !== undefined && alias.offset === canonical.offset && alias.size === canonical.size;
		profileFacts = (profile, symbols, headers) => {
			const names = [...profile.data, ...profile.text];
			const present = names.flatMap((name) => symbols.get(name) ?? []);
			const data = profile.data.flatMap((name) => {
				const symbol = symbols.get(name);
				const header = headers.get(name);
				return symbol !== undefined && header !== undefined ? [{
					symbol,
					header
				}] : [];
			});
			const validData = data.filter(({ header }) => header.complete && header.kind === profile.kind);
			const text = profile.text.map((name) => symbols.get(name));
			const aliased = data.some(({ symbol }, index) => data.slice(0, index).some((previous) => previous.symbol.offset === symbol.offset));
			const overlapping = data.some(({ symbol }, index) => data.slice(0, index).some((previous) => overlap(previous.symbol, symbol)));
			const textOverlapsData = profile === UNIFIED && text.some((symbol) => symbol !== undefined && data.some((entry) => overlap(entry.symbol, symbol)));
			return {
				profile,
				names,
				present,
				data,
				qualified: validData.length > 0,
				poolUsable: validData.some(({ symbol }) => symbol.name === profile.pool),
				complete: validData.length === profile.data.length && text.every((symbol) => symbol !== undefined && symbol.size > 0) && !overlapping && !textOverlapsData,
				aliased,
				overlapping,
				textOverlapsData
			};
		};
		observeDartSnapshot = async (bytes, signal) => {
			const inventory = await readElfSymbols(bytes, ALL_SYMBOLS, signal);
			if (inventory.symbols.length === 0) return {
				observed: false,
				reasons: inventory.failures.map(({ reason }) => reason)
			};
			const symbols = new Map(inventory.symbols.map((symbol) => [symbol.name, symbol]));
			const headers = new Map();
			const physicalHeaders = new Map();
			const hashes = new Map();
			const sections = inventory.symbols.map(({ name, offset, size }) => {
				let header;
				if (DATA_SYMBOLS.has(name)) {
					const range = `${offset}:${size}`;
					header = physicalHeaders.get(range) ?? readSnapshotHeader(bytes.subarray(offset, offset + size), 0);
					physicalHeaders.set(range, header);
					headers.set(name, header);
					if (header.hash !== null) hashes.set(offset, header.hash);
				}
				return {
					name,
					offset,
					size,
					magic_valid: header?.magicValid ?? false,
					kind: header?.kind ?? null,
					header_length: header?.headerLength ?? null
				};
			});
			const candidates = [...new Set(hashes.values())];
			const legacy = profileFacts(LEGACY, symbols, headers);
			const unified = profileFacts(UNIFIED, symbols, headers);
			const mixed = legacy.present.length > 0 && unified.present.length > 0;
			const aliases = mixed && unified.qualified && legacy.present.every((symbol) => sameRange(symbol, symbols.get(DATA_SYMBOLS.has(symbol.name) ? UNIFIED.data[0] : UNIFIED.text[0])));
			let selected = null;
			if (!mixed) selected = legacy.present.length > 0 ? legacy : unified;
			else if (aliases) selected = unified;
			else if (legacy.poolUsable && !unified.qualified) selected = legacy;
			else if (unified.poolUsable && !legacy.qualified) selected = unified;
			const failures = inventory.failures.filter(({ missingSymbol }) => missingSymbol === undefined || selected?.names.includes(missingSymbol) === true);
			const limitations = failures.map(({ reason }) => reason);
			if (mixed && !aliases) limitations.push(selected === null ? "The legacy and unified exports do not establish one snapshot profile or string-pool source." : "Additional snapshot exports have no verified alias to the selected profile.");
			if (aliases) limitations.push("Legacy exports alias the unified text or data ranges. Each physical header counts once.");
			if (selected !== null) {
				const { present, names, aliased, overlapping, textOverlapsData } = selected;
				if (present.length < names.length) limitations.push(`Only ${present.length} of ${names.length} snapshot symbols were present`);
				if (aliased) limitations.push("Two or more snapshot data symbols share one header offset; its hash counts as one source instead of two agreeing ones");
				else if (overlapping) limitations.push("Snapshot data symbol ranges overlap; independent VM/isolate coverage is not established");
				if (textOverlapsData) limitations.push("Unified snapshot text and data symbol ranges overlap.");
			}
			for (const { profile, data } of aliases ? [unified] : [legacy, unified]) for (const { symbol, header } of data) if (!header.complete || header.kind !== profile.kind) limitations.push(`${symbol.name} has an incomplete or invalid snapshot header: kind ${String(header.kind)} (AOT app requires ${profile.kind}), declared length ${String(header.headerLength)} excludes the four magic bytes, symbol size ${symbol.size}, valid hash ${String(header.hash !== null)}`);
			const pool = selected === null ? undefined : symbols.get(selected.profile.pool);
			return {
				observed: true,
				profile: selected?.qualified === true ? selected.profile.name : null,
				pool: pool === undefined ? null : bytes.subarray(pool.offset, pool.offset + pool.size),
				complete: selected?.complete === true && (!mixed || aliases) && failures.length === 0 && candidates.length === 1 && hashes.size === selected.profile.data.length,
				sections,
				hashes: {
					candidates,
					sources: hashes.size
				},
				limitations
			};
		};
	})))();
}

//#endregion
//#region dist/flutter/ElfBuildId.js
var MAX_METADATA_BYTES, MAX_BUILD_IDS, MAX_NOTE_RANGES, readElfBuildIds;
function init_ElfBuildId() {
	return (init_ElfBuildId = __esmMin((() => {
		init_resources();
		init_elfSectionHeader();
		init_elfProgramHeader();
		init_flutterBuildAnalysis();
		init_elfNoteLayout();
		init_DartElf();
		MAX_METADATA_BYTES = 8 * 1024 * 1024;
		MAX_BUILD_IDS = 64;
		MAX_NOTE_RANGES = 1024;
		readElfBuildIds = async (file, totalBytes, signal) => {
			const candidates = new Set();
			const failures = [];
			const failure = (reason) => ({
				candidates: [...candidates],
				failures: [...failures, { reason }]
			});
			let examined = 0;
			const read = async (offset, size) => {
				assertArtifactReadActive(signal);
				if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || offset < 0 || size < 0 || size > totalBytes - offset || size > MAX_METADATA_BYTES - examined) return null;
				examined += size;
				const bytes = Buffer.alloc(size);
				let copied = 0;
				while (copied < size) {
					const result = await file.read(bytes, copied, size - copied, offset + copied);
					assertArtifactReadActive(signal);
					if (result.bytesRead === 0) return null;
					copied += result.bytesRead;
				}
				return bytes;
			};
			const prefix = await read(0, Math.min(totalBytes, 64));
			if (prefix === null) return failure("ELF header could not be read");
			const parsed = readElfHeader(prefix, totalBytes);
			if (parsed.failure !== undefined) return failure(parsed.failure.reason);
			const h = parsed.header;
			const ranges = new Map();
			let compressedNotes = false;
			tables: for (const table of [{
				offset: h.e_phoff,
				width: h.e_phentsize,
				count: h.e_phnum,
				program: true
			}, {
				offset: h.e_shoff,
				width: h.e_shentsize,
				count: h.e_shnum,
				program: false
			}]) {
				const bytes = await read(table.offset, table.width * table.count);
				if (bytes === null) return failure("ELF note tables exceed the 8 MiB metadata budget or are truncated");
				for (let index = 0; index < table.count; index += 1) {
					if (index % 4096 === 0) {
						await setImmediate();
						assertArtifactReadActive(signal);
					}
					const base = index * table.width;
					const parsedRecord = table.program ? readElfProgramHeader(bytes.subarray(base, base + table.width), h.is64 ? 64 : 32, true) : readElfSectionHeader(bytes.subarray(base, base + table.width), h.is64 ? 64 : 32, true);
					if (!parsedRecord.ok) return failure(parsedRecord.error.message);
					const record = parsedRecord.value;
					const storage = "size" in record ? elfNoteSectionStorage(record) : record.type === 4 ? "uncompressed" : "not-note";
					if (storage === "not-note") continue;
					const offset = Number(record.offset);
					const size = Number("fileSize" in record ? record.fileSize : record.size);
					if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || size > totalBytes - offset) return failure("ELF note range is not file-backed");
					if (storage === "compressed") {
						if (!compressedNotes) {
							failures.push({ reason: "Compressed ELF note sections are unsupported" });
							compressedNotes = true;
						}
						continue;
					}
					if (size === 0) continue;
					const alignment = elfNoteAlignment(record.alignment);
					const key = `${offset}:${size}:${alignment}`;
					if (ranges.has(key)) continue;
					if (ranges.size === MAX_NOTE_RANGES) {
						failures.push({ reason: "ELF notes exceed the 1024-range note-range inventory/read budget" });
						break tables;
					}
					ranges.set(key, {
						offset,
						size,
						alignment
					});
				}
			}
			for (const range of ranges.values()) {
				const notes = await read(range.offset, range.size);
				if (notes === null) return failure("ELF notes exceed the 8 MiB metadata budget or are truncated");
				let yieldedAt = 0;
				for (let at = 0; at < notes.length;) {
					if (at - yieldedAt >= 64 * 1024) {
						await setImmediate();
						assertArtifactReadActive(signal);
						yieldedAt = at;
					}
					if (notes.length - at < 12) {
						if (!isElfNotePadding(notes.subarray(at))) return failure("ELF note header is truncated");
						break;
					}
					const frame = readElfNoteFrame(notes.subarray(at, at + 12), true, range.alignment, notes.length - at);
					if (!frame.ok) return failure(frame.error.message);
					const { namesz, descsz, type, descriptor, next, framing } = frame.value;
					if (framing !== "complete") return failure("ELF note entry exceeds its declared note range");
					const nameOffset = at + 12;
					if (namesz === 4 && type === 3 && notes.subarray(nameOffset, nameOffset + namesz).equals(Buffer.from("GNU\0"))) {
						if (descsz < 1 || descsz > 64) return failure(`GNU build-id descriptor is outside the 1–${64} byte projection`);
						const start = at + descriptor;
						const candidate = notes.subarray(start, start + descsz).toString("hex");
						if (!candidates.has(candidate) && candidates.size === MAX_BUILD_IDS) return failure("ELF build-id candidates exceed the 64-value evidence budget");
						candidates.add(candidate);
					}
					at += next;
				}
			}
			assertArtifactReadActive(signal);
			return {
				candidates: [...candidates],
				failures
			};
		};
	})))();
}

//#endregion
//#region dist/flutter/FlutterBuildProvider.js
/** The generator owns iterator closure, including early extraction failures. */
async function* openEntrySafely(reader, entry, operation, path, signal) {
	try {
		yield* await reader.open(entry, signal);
	} catch (cause) {
		throw mapPackageFailure(operation, path, cause);
	}
}
var APK_METADATA_READ_MAX_BYTES, LIBRARY_MAX_BYTES, TOTAL_EXTRACTION_MAX_BYTES, APK_MAX_BYTES, MAX_FLUTTER_ABIS, IDENTIFIER_PATTERN, FLUTTER_ALLOWANCES, sha256File, emptyFacts, observedCancellation, mapInputFailure, readerLimitFailure, inputFailureMessage, mapOwnedIoFailure, mapPackageFailure, collectFlutterLibraries, checkApkSize, FlutterBuildProvider, projectStringPool;
function init_FlutterBuildProvider() {
	return (init_FlutterBuildProvider = __esmMin((() => {
		init_FlutterProviderIdentity();
		init_resources();
		init_analysisErrorCleanup();
		init_analysisErrorCancellation();
		init_OwnedRegularFile();
		init_AnalysisProvider();
		init_analysisObservation();
		init_flutterBuildAnalysis();
		init_analysisErrorCore();
		init_SignalAbort();
		init_unicodeCodePointOrder();
		init_fixedAllowanceRemediation();
		init_analysisErrorBase();
		init_providerCleanupError();
		init_result();
		init_OwnedFileHandle();
		init_RegularFile();
		init_FlutterPayloadScan();
		init_DartElf();
		init_DartSnapshotProfile();
		init_ElfBuildId();
		init_privateWorkspaceFailure();
		init_errorMessage();
		APK_METADATA_READ_MAX_BYTES = 8 * 1024 * 1024;
		LIBRARY_MAX_BYTES = 256 * 1024 * 1024;
		TOTAL_EXTRACTION_MAX_BYTES = 768 * 1024 * 1024;
		APK_MAX_BYTES = 2 * 1024 * 1024 * 1024;
		MAX_FLUTTER_ABIS = 32;
		IDENTIFIER_PATTERN = /^[A-Za-z_$][A-Za-z0-9_$]*$/u;
		FLUTTER_ALLOWANCES = {
			apkMetadataRead: fixedAllowanceOptions("The Flutter APK metadata read allowance", "parser", {
				limit: APK_METADATA_READ_MAX_BYTES,
				unit: "bytes"
			}),
			abiInventory: fixedAllowanceOptions("The Flutter ABI inventory allowance", "parser", {
				limit: MAX_FLUTTER_ABIS,
				unit: "ABIs"
			}),
			libraryPath: fixedAllowanceOptions("The Flutter library path allowance", "parser", {
				limit: MAX_FLUTTER_LIBRARY_PATH_BYTES,
				unit: "bytes"
			}),
			apkSnapshot: fixedAllowanceOptions("the Flutter APK snapshot allowance", "input", {
				limit: APK_MAX_BYTES,
				unit: "bytes"
			}),
			libraryRead: fixedAllowanceOptions("the Flutter library read allowance", "input", {
				limit: LIBRARY_MAX_BYTES,
				unit: "bytes"
			}),
			cumulativeExtraction: fixedAllowanceOptions("the Flutter cumulative extraction allowance", "input", {
				limit: TOTAL_EXTRACTION_MAX_BYTES,
				unit: "bytes"
			}),
			snapshotHashCandidates: fixedAllowanceOptions("The Flutter snapshot-hash candidate allowance", "parser", {
				limit: 64,
				unit: "candidates"
			})
		};
		sha256File = async (operation, path, signal) => {
			assertArtifactReadActive(signal);
			const hash = createHash("sha256");
			const owner = new AbortController();
			const marker = {};
			const abort = () => owner.abort(marker);
			signal?.addEventListener("abort", abort, { once: true });
			try {
				const stream = createReadStream(path, { signal: owner.signal });
				for await (const chunk of stream) {
					if (signal?.aborted === true) throw cancelledBy(operation, signal);
					hash.update(chunk);
				}
				return hash.digest("hex");
			} catch (cause) {
				if (isAbortWithReason(cause, marker)) throw cancelledBy(operation, carriedReason(signal?.reason));
				throw cause;
			} finally {
				signal?.removeEventListener("abort", abort);
			}
		};
		emptyFacts = () => ({
			libapp: {
				present: false,
				bytes: null,
				sha256: null,
				elfHeaderValid: null,
				sources: 0,
				candidates: []
			},
			libflutter: {
				present: false,
				bytes: null,
				sha256: null,
				buildId: null,
				buildIdCandidates: [],
				buildIdFailures: [],
				dartVersion: null,
				dartVersionCapped: false,
				toolchainLines: [],
				toolchainCapped: false
			}
		});
		observedCancellation = (cause) => {
			const file = regularFileCancellation(cause);
			if (file !== undefined) return file;
			if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") return { reason: artifactFileCancellationCause(cause) };
			return undefined;
		};
		mapInputFailure = (operation, path, cause) => {
			if (cause instanceof AnalysisError) return cause;
			const cancellation = observedCancellation(cause);
			if (cancellation !== undefined) return cancelledBy(operation, carriedReason(cancellation.reason));
			if (cause instanceof Error && "code" in cause && (cause.code === "EACCES" || cause.code === "EPERM")) return new AnalysisAccessDeniedError(operation, path, cause.code, { cause });
			if (cause instanceof ArtifactReaderFailure && cause.reason === "limit") return readerLimitFailure(operation, cause);
			return new AnalysisInputError(operation, { cause }, [{
				path: ["path"],
				reason: "invalid_format",
				message: inputFailureMessage(path, cause)
			}]);
		};
		readerLimitFailure = (operation, cause) => {
			if (cause.fixedAllowance !== undefined) return new AnalysisResourceConstraintError(operation, cause.boundary === "file-size" ? "file-size" : "memory", cause.message, null, {
				cause,
				retryable: false,
				fixedAllowance: cause.fixedAllowance
			});
			if (cause.readerLimit !== undefined) {
				const { effective_value: limit, required_value: required } = cause.readerLimit;
				return new AnalysisResourceConstraintError(operation, "memory", `The APK's declared member sizes${required === undefined ? "" : ` (${String(required)} bytes)`} exceed its ${String(limit)}-byte expansion allowance.`, { max_expanded_bytes: limit }, {
					cause,
					...fixedAllowanceOptions("The Flutter APK expansion allowance (derived from the APK size)", "parser", {
						limit,
						unit: cause.readerLimit.unit
					})
				});
			}
			return new AnalysisResourceConstraintError(operation, "memory", cause.message, { max_metadata_read_bytes: APK_METADATA_READ_MAX_BYTES }, {
				cause,
				...FLUTTER_ALLOWANCES.apkMetadataRead
			});
		};
		inputFailureMessage = (path, cause) => {
			if (cause instanceof Error && "code" in cause && (cause.code === "ENOENT" || cause.code === "ENOTDIR")) return `Selected APK does not exist: ${path}`;
			if (cause instanceof NonRegularFileReadError) return `Selected APK is not a regular file: ${path}`;
			const message = errorMessage(cause);
			return `The APK could not be read as a package: ${path}: ${message}`;
		};
		mapOwnedIoFailure = (operation, cause, workspacePath) => {
			if (cause instanceof AnalysisError) return cause;
			const cancellation = observedCancellation(cause);
			if (cancellation !== undefined) return cancelledBy(operation, carriedReason(cancellation.reason));
			if (cause instanceof Error && "code" in cause && typeof cause.code === "string") return privateWorkspaceFailure(FLUTTER_PROVIDER_IDENTITY.id, operation, cause, workspacePath);
			return new AnalysisProtocolError(operation, { cause });
		};
		mapPackageFailure = (operation, path, cause) => cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause : mapInputFailure(operation, path, cause);
		collectFlutterLibraries = async (reader, operation, path, signal) => {
			const libraries = [];
			const paths = new Set();
			const abis = new Set();
			try {
				for await (const entry of reader.entries(signal)) {
					if (entry.kind !== "file") continue;
					const match = /^lib\/([^/]+)\/(libapp|libflutter)\.so$/u.exec(entry.path);
					if (match === null) continue;
					if (paths.has(entry.path)) throw new AnalysisInputError(operation, undefined, [{
						path: ["path"],
						reason: "invalid_format",
						message: `The selected APK has duplicate Flutter library members: ${path}: ${entry.path}`
					}]);
					paths.add(entry.path);
					abis.add(match[1]);
					if (abis.size > MAX_FLUTTER_ABIS || Buffer.byteLength(entry.path) > 1024) throw new AnalysisResourceConstraintError(operation, "memory", "Flutter library inventory exceeds the bounded ABI projection budget", {
						max_flutter_abis: MAX_FLUTTER_ABIS,
						max_library_path_bytes: MAX_FLUTTER_LIBRARY_PATH_BYTES
					}, abis.size > MAX_FLUTTER_ABIS ? FLUTTER_ALLOWANCES.abiInventory : FLUTTER_ALLOWANCES.libraryPath);
					libraries.push({
						entry,
						abi: match[1],
						kind: match[2] === "libapp" ? "libapp" : "libflutter"
					});
				}
				return libraries;
			} catch (cause) {
				throw mapPackageFailure(operation, path, cause);
			}
		};
		checkApkSize = (operation, bytes) => {
			if (bytes > APK_MAX_BYTES) throw new AnalysisResourceConstraintError(operation, "file-size", `The selected APK exceeds the ${String(APK_MAX_BYTES)}-byte snapshot budget`, {
				max_apk_bytes: APK_MAX_BYTES,
				observed_bytes: bytes
			}, FLUTTER_ALLOWANCES.apkSnapshot);
		};
		FlutterBuildProvider = class {
			ownedRoots = new Map();
			cleanupFailures = new Map();
			rootLeases = new Map();
			operations = new ArtifactResourceScope();
			constructor() {
				this.operations.addCloseHook(() => this.closeRoots());
			}
			/**
			* Snapshot the admitted input into a provider-owned, read-only copy so a
			* concurrently modified original cannot mix into one observation. The
			* digest is taken from the snapshot, and every later read uses the
			* snapshot path.
			*/
			async ownSnapshot(operation, path, signal) {
				let root;
				try {
					root = await mkdtemp(join(tmpdir(), "rea-flutter-"));
				} catch (cause) {
					throw mapOwnedIoFailure(operation, cause, null);
				}
				this.ownedRoots.set(root, new Set());
				this.rootLeases.set(root, new AnalysisCleanupLease(async () => {
					if (!await this.cleanupRoot(root)) throw this.cleanupError(root, operation);
				}, [root]));
				const snapshotPath = join(root, "input.apk");
				const readSource = async (read) => {
					try {
						return await read();
					} catch (cause) {
						throw mapInputFailure(operation, path, cause);
					}
				};
				try {
					let source;
					try {
						const { handle } = await openRegularFile(path, {
							symlinks: "follow",
							signal
						});
						source = this.ownResource(root, new OwnedFileHandle(handle));
					} catch (cause) {
						if (cause instanceof RegularFileAdmissionFailure) {
							this.ownResource(root, cause.owner);
							throw mapInputFailure(operation, path, cause.cause);
						}
						throw mapInputFailure(operation, path, cause);
					}
					const before = await readSource(() => source.handle.stat({ bigint: true }));
					checkApkSize(operation, Number(before.size));
					const output = this.ownResource(root, new OwnedFileHandle(await open(snapshotPath, "wx")));
					const chunk = Buffer.alloc(64 * 1024);
					let copiedBytes = 0;
					while (copiedBytes <= Number(before.size)) {
						assertArtifactReadActive(signal);
						const { bytesRead } = await readSource(() => source.handle.read(chunk, 0, Math.min(chunk.length, Number(before.size) - copiedBytes + 1), copiedBytes));
						assertArtifactReadActive(signal);
						if (bytesRead === 0) break;
						copiedBytes += bytesRead;
						if (BigInt(copiedBytes) > before.size) throw new AnalysisArtifactChangedError(operation, path, "Selected file grew during snapshotting");
						await output.handle.writeFile(chunk.subarray(0, bytesRead));
					}
					await this.releaseResource(root, output);
					const [after, currentPath] = await Promise.all([readSource(() => source.handle.stat({ bigint: true })), stat(path, { bigint: true }).catch((cause) => {
						if (cause instanceof Error && "code" in cause && (cause.code === "EACCES" || cause.code === "EPERM")) throw mapInputFailure(operation, path, cause);
						throw new AnalysisArtifactChangedError(operation, path, "Selected path became unavailable during snapshotting", { cause });
					})]);
					if (BigInt(copiedBytes) !== before.size || !sameRegularFileState(before, after) || !sameRegularFileState(before, currentPath)) throw new AnalysisArtifactChangedError(operation, path, "Selected file identity or contents changed during snapshotting");
					await this.releaseResource(root, source);
					await chmod(snapshotPath, 256);
					const info = await stat(snapshotPath);
					const sha256 = await sha256File(operation, snapshotPath, signal);
					return {
						root,
						path: snapshotPath,
						bytes: info.size,
						sha256
					};
				} catch (cause) {
					const primary = mapOwnedIoFailure(operation, cause, root);
					const released = await this.discardRoot(root);
					if (!released) throw analysisErrorWithCleanupDependencies(primary, this.cleanupError(root, operation), operation);
					throw primary;
				}
			}
			readerFor(snapshot) {
				return this.ownResource(snapshot.root, new ZipArtifactReader(snapshot.path, "apk", APK_METADATA_READ_MAX_BYTES));
			}
			ownResource(root, resource) {
				this.ownedRoots.get(root).add(resource);
				return resource;
			}
			async releaseResource(root, resource) {
				await resource.close();
				this.ownedRoots.get(root)?.delete(resource);
			}
			/** Close every owned handle before removing its root; retain any failure. */
			async discardRoot(root) {
				const lease = this.rootLeases.get(root);
				if (lease === undefined) return true;
				try {
					await lease.release();
					this.rootLeases.delete(root);
					return true;
				} catch {
					return false;
				}
			}
			async cleanupRoot(root) {
				const resources = this.ownedRoots.get(root);
				if (resources === undefined) return true;
				const attempts = await Promise.allSettled([...resources].map((resource) => this.releaseResource(root, resource)));
				const failures = attempts.flatMap((attempt) => attempt.status === "rejected" ? [attempt.reason] : []);
				if (failures.length > 0) {
					this.cleanupFailures.set(root, failures);
					return false;
				}
				try {
					await rm(root, {
						recursive: true,
						force: true
					});
					this.ownedRoots.delete(root);
					this.cleanupFailures.delete(root);
					return true;
				} catch (cause) {
					this.cleanupFailures.set(root, [cause]);
					return false;
				}
			}
			/** Pure parsing; the provider is always available. */
			async inspectAvailability() {
				return {
					status: "available",
					code: null,
					reason: null,
					diagnostics: { engine: "static-apk-parsing" }
				};
			}
			cleanupError(root, operation, completedObservation) {
				const causes = this.cleanupFailures.get(root) ?? [];
				const error = new ProviderCleanupError(FLUTTER_PROVIDER_IDENTITY.id, [root], {
					reason: causes.map((cause) => errorMessage(cause)).join("; "),
					retained_roots: [{
						path: root,
						failures: causes.map((cause) => ({
							name: cause instanceof Error ? cause.name : "UnknownError",
							message: errorMessage(cause),
							...cause instanceof Error && "code" in cause && typeof cause.code === "string" ? { code: cause.code } : {}
						}))
					}]
				}, {
					cause: new AggregateError(causes, "Flutter snapshot cleanup failed"),
					operation,
					...completedObservation === undefined ? {} : { completedObservation }
				});
				const lease = this.rootLeases.get(root);
				if (lease !== undefined) new AnalysisCleanupLeaseGroup(error, [lease]);
				return error;
			}
			/** Stop admission and drain active snapshots before attempting retained cleanup. */
			async close() {
				await this.operations.close();
			}
			async closeRoots(roots = [...this.ownedRoots.keys()], operation = "close_flutter_build") {
				const failures = [];
				for (const root of roots) {
					if (!await this.discardRoot(root)) failures.push(this.cleanupError(root, operation));
				}
				if (failures.length === 1) throw failures[0];
				if (failures.length > 1) throw providerCleanupErrorFromFailures(FLUTTER_PROVIDER_IDENTITY.id, failures, {
					reason: failures.map((failure) => failure.diagnostics?.reason ?? failure.message).join("; "),
					retained_roots: failures.flatMap((failure) => {
						const roots = failure.diagnostics?.retained_roots;
						return Array.isArray(roots) ? roots : [];
					})
				}, { operation });
			}
			async execute(request, options) {
				try {
					return await this.operations.run(() => this.executeOwned(request, options));
				} catch (cause) {
					return err(mapOwnedIoFailure(request.operation, cause, null));
				}
			}
			async executeOwned(request, options) {
				const cancellation = () => options?.signal?.aborted === true ? cancelledBy(request.operation, options.signal) : undefined;
				const beforeCleanup = cancellation();
				if (beforeCleanup !== undefined) return err(beforeCleanup);
				try {
					await this.closeRoots([...this.cleanupFailures.keys()], request.operation);
				} catch (cause) {
					const failure = mapOwnedIoFailure(request.operation, cause, null);
					const interrupted = cancellation();
					return err(interrupted === undefined ? failure : analysisErrorWithCancellation(failure, interrupted));
				}
				const afterCleanup = cancellation();
				if (afterCleanup !== undefined) return err(afterCleanup);
				const { path } = request.input;
				const signal = options?.signal;
				let snapshot;
				let result;
				try {
					snapshot = await this.ownSnapshot(request.operation, path, signal);
					const reader = this.readerFor(snapshot);
					const libraries = await collectFlutterLibraries(reader, request.operation, path, signal);
					result = request.operation === "inspect_dart_aot" ? await this.inspectDartAot(path, request.input.abi, signal, snapshot, reader, libraries, dartPoolPolicy(request.input.pool_policy)) : await this.identifyFlutterBuild(path, signal, snapshot, reader, libraries);
				} catch (cause) {
					result = err(mapOwnedIoFailure(request.operation, cause, snapshot?.root ?? null));
				}
				const cleanup = snapshot !== undefined && !await this.discardRoot(snapshot.root) ? this.cleanupError(snapshot.root, request.operation, result.ok ? createAnalysisExecutionEvidence(request.operation, request.input, result.value, "observed") : undefined) : undefined;
				if (signal?.aborted === true && result.ok) {
					result = err(cancelledBy(request.operation, signal, { partialObservation: createAnalysisExecutionEvidence(request.operation, request.input, result.value, "observed") }));
				}
				if (signal?.aborted === true && !result.ok) result = err(analysisErrorWithCancellation(result.error, cancelledBy(request.operation, signal)));
				if (cleanup !== undefined) {
					if (!result.ok) return err(analysisErrorWithCleanupDependencies(result.error, cleanup, request.operation));
					cleanup.retainPartialObservation(createAnalysisExecutionEvidence(request.operation, request.input, result.value, "observed"));
					return err(cleanup);
				}
				return result;
			}
			async identifyFlutterBuild(path, signal, snapshot, reader, flutterEntries) {
				const operation = "identify_flutter_build";
				for (const { entry } of flutterEntries) {
					if (entry.declaredSize !== null && entry.declaredSize > LIBRARY_MAX_BYTES) return err(new AnalysisResourceConstraintError(operation, "file-size", `${entry.path} exceeds the library read budget`, {
						max_library_bytes: LIBRARY_MAX_BYTES,
						entry_path: entry.path
					}, FLUTTER_ALLOWANCES.libraryRead));
				}
				const declaredTotal = flutterEntries.reduce((total, { entry }) => total + (entry.declaredSize ?? 0), 0);
				if (declaredTotal > TOTAL_EXTRACTION_MAX_BYTES) return err(new AnalysisResourceConstraintError(operation, "file-size", `declared library sizes total ${String(declaredTotal)} bytes, exceeding the ${String(TOTAL_EXTRACTION_MAX_BYTES)}-byte cumulative budget before any extraction`, {
					max_total_bytes: TOTAL_EXTRACTION_MAX_BYTES,
					declared_total: declaredTotal
				}, FLUTTER_ALLOWANCES.cumulativeExtraction));
				const facts = new Map();
				let extractedTotal = 0;
				let libraryIndex = 0;
				for (const { entry, abi, kind } of flutterEntries) {
					const stream = openEntrySafely(reader, entry, operation, path, signal);
					const hash = createHash("sha256");
					const snapshotScanner = new SnapshotHashScanner();
					const labeledScanner = new LabeledStringScanner();
					const engineFile = kind === "libflutter" ? this.ownResource(snapshot.root, new OwnedFileHandle(await open(join(snapshot.root, `engine-${libraryIndex++}.so`), "wx+"))) : null;
					let bytes = 0;
					const headerPrefix = Buffer.alloc(64);
					let headerBytes = 0;
					for await (const chunk of stream) {
						if (signal?.aborted === true) return err(cancelledBy(operation, signal));
						const view = chunk;
						headerBytes += view.copy(headerPrefix, headerBytes, 0, Math.min(view.length, headerPrefix.length - headerBytes));
						bytes += view.byteLength;
						if (bytes > LIBRARY_MAX_BYTES) return err(new AnalysisResourceConstraintError(operation, "file-size", `${entry.path} exceeds the ${String(LIBRARY_MAX_BYTES)}-byte read budget while streaming`, {
							max_library_bytes: LIBRARY_MAX_BYTES,
							entry_path: entry.path
						}, FLUTTER_ALLOWANCES.libraryRead));
						hash.update(view);
						if (kind === "libapp") snapshotScanner.push(view);
						else {
							labeledScanner.push(view);
							await engineFile.handle.writeFile(view);
						}
						if (extractedTotal + bytes > TOTAL_EXTRACTION_MAX_BYTES) return err(new AnalysisResourceConstraintError(operation, "file-size", `cumulative library extraction across ${String(flutterEntries.length)} entries exceeds the ${String(TOTAL_EXTRACTION_MAX_BYTES)}-byte budget`, { max_total_bytes: TOTAL_EXTRACTION_MAX_BYTES }, FLUTTER_ALLOWANCES.cumulativeExtraction));
					}
					extractedTotal += bytes;
					const digest = hash.digest("hex");
					const current = facts.get(abi) ?? emptyFacts();
					if (kind === "libapp") {
						const scan = snapshotScanner.result();
						if (scan.capped) return err(new AnalysisResourceConstraintError(operation, "memory", "Snapshot hash candidates exceed the retained evidence budget", {
							max_snapshot_hash_candidates: 64,
							entry_path: entry.path
						}, FLUTTER_ALLOWANCES.snapshotHashCandidates));
						facts.set(abi, {
							...current,
							libapp: {
								present: true,
								bytes,
								sha256: digest,
								elfHeaderValid: readElfHeader(headerPrefix.subarray(0, headerBytes), bytes).header !== undefined,
								sources: scan.sources,
								candidates: scan.candidates
							}
						});
					} else {
						const labeled = labeledScanner.result();
						const buildIds = await readElfBuildIds(engineFile.handle, bytes, signal);
						await this.releaseResource(snapshot.root, engineFile);
						facts.set(abi, {
							...current,
							libflutter: {
								present: true,
								bytes,
								sha256: digest,
								buildId: buildIds.failures.length === 0 && buildIds.candidates.length === 1 ? buildIds.candidates[0] : null,
								buildIdCandidates: buildIds.candidates,
								buildIdFailures: buildIds.failures.map((failure) => failure.reason),
								...labeled
							}
						});
					}
				}
				const abis = [...facts.entries()].map(([abi, value]) => ({
					abi,
					libapp: {
						present: value.libapp.present,
						bytes: value.libapp.bytes,
						sha256: value.libapp.sha256,
						elf_header_valid: value.libapp.elfHeaderValid,
						snapshot_hash_sources: value.libapp.sources,
						snapshot_hash_candidates: [...value.libapp.candidates],
						snapshot_hash: value.libapp.candidates.length === 1 ? value.libapp.candidates[0] : null
					},
					libflutter: {
						present: value.libflutter.present,
						bytes: value.libflutter.bytes,
						sha256: value.libflutter.sha256,
						build_id: value.libflutter.buildId,
						build_id_candidates: [...value.libflutter.buildIdCandidates],
						dart_version: value.libflutter.dartVersion,
						dart_version_capped: value.libflutter.dartVersionCapped,
						toolchain_lines: [...value.libflutter.toolchainLines],
						toolchain_capped: value.libflutter.toolchainCapped
					}
				})).sort((left, right) => compareUnicodeCodePoints(left.abi, right.abi));
				const flutterDetected = abis.some((entry) => entry.libapp.present);
				const partial = abis.some((entry) => entry.libapp.present && (entry.libapp.snapshot_hash === null || entry.libapp.snapshot_hash_sources !== 2 || entry.libapp.elf_header_valid !== true) || entry.libflutter.toolchain_capped || entry.libflutter.dart_version_capped || entry.libapp.present !== entry.libflutter.present) || [...facts.values()].some((value) => value.libflutter.buildIdFailures.length > 0 || value.libflutter.buildIdCandidates.length > 1);
				return ok(createAnalysisExecution({
					target: {
						path,
						bytes: snapshot.bytes,
						sha256: snapshot.sha256
					},
					flutter_detected: flutterDetected,
					abis,
					coverage: partial ? "partial" : "complete"
				}, FLUTTER_PROVIDER_IDENTITY, {
					subject: {
						path,
						format: "apk",
						sha256: snapshot.sha256
					},
					locations: [{
						kind: "artifact-path",
						path
					}],
					limitations: [
						"The APK is read through an owned read-only snapshot; concurrent changes to the original cannot mix into this observation",
						"The snapshot hash identifies a Dart SDK build only against an external mapping dataset; REA performs no lookup",
						"Unlabeled Dart version values are identified by their printable-string shape, not a symbol or other source identity; a matching unrelated string may be reported and a null value means no supported pattern was found",
						"Engine build IDs come only from ELF-declared PT_NOTE/SHT_NOTE records; conflicting or incompletely examined notes preserve candidates and report partial coverage",
						...[...facts].flatMap(([abi, value]) => [...value.libflutter.buildIdFailures.map((reason) => `lib/${abi}/libflutter.so: ${reason}`), ...value.libflutter.buildIdCandidates.length > 1 ? [`lib/${abi}/libflutter.so has conflicting GNU build IDs`] : []]),
						...abis.filter((entry) => entry.libflutter.toolchain_capped).map((entry) => `lib/${entry.abi}/libflutter.so has toolchain labels omitted by the complete-label grammar or the 4-line projection`),
						...abis.filter((entry) => entry.libflutter.dart_version_capped).map((entry) => `lib/${entry.abi}/libflutter.so has Dart version labels omitted by the complete-label grammar or the single-version projection`),
						"The snapshot hash sits 20 bytes after each snapshot magic in the AOT payload; findings are observations of that layout",
						"ELF header validity checks the supported header layout and declared table extents; identification does not resolve symbols or validate table contents",
						...abis.filter((entry) => entry.libapp.present && entry.libapp.snapshot_hash_sources !== 2).map((entry) => `lib/${entry.abi}/libapp.so carries ${String(entry.libapp.snapshot_hash_sources)} observed snapshot header(s); complete coverage of the supported legacy split VM/isolate profile requires two independent sources. Unified and other layouts remain unverified`),
						...abis.filter((entry) => entry.libapp.present && entry.libapp.elf_header_valid !== true).map((entry) => `lib/${entry.abi}/libapp.so has a truncated, malformed, or unsupported ELF header or table extent; byte-scanned hashes remain observations only`),
						...flutterDetected ? [] : ["No lib/*/libapp.so was found; the target does not carry a Flutter AOT payload"]
					]
				}));
			}
			async inspectDartAot(path, abi, signal, snapshot, reader, libraries, poolPolicy) {
				const candidates = libraries.filter((library) => library.kind === "libapp");
				if (candidates.length === 0) return err(new AnalysisUnsupportedTargetError("inspect_dart_aot", path, "No lib/<abi>/libapp.so was found; the target carries no Dart AOT payload"));
				const preference = [
					"arm64-v8a",
					"x86_64",
					"x86",
					"armeabi-v7a"
				];
				const selected = abi === undefined ? [...candidates].sort((left, right) => (preference.indexOf(left.abi) + 1 || preference.length + 1) - (preference.indexOf(right.abi) + 1 || preference.length + 1) || compareUnicodeCodePoints(left.abi, right.abi))[0] : candidates.find((candidate) => candidate.abi === abi);
				if (selected === undefined) return err(new AnalysisUnsupportedTargetError("inspect_dart_aot", path, `No libapp.so was found for ABI ${abi ?? "(none)"}; available: ${candidates.map((candidate) => candidate.abi).join(", ")}`));
				const declared = selected.entry.declaredSize ?? LIBRARY_MAX_BYTES + 1;
				if (declared > LIBRARY_MAX_BYTES) return err(new AnalysisResourceConstraintError("inspect_dart_aot", "file-size", `lib/${selected.abi}/libapp.so declares ${String(declared)} bytes, exceeding the ${String(LIBRARY_MAX_BYTES)}-byte read budget`, { max_library_bytes: LIBRARY_MAX_BYTES }, FLUTTER_ALLOWANCES.libraryRead));
				const imagePath = join(snapshot.root, "libapp.so");
				const imageHash = createHash("sha256");
				const imageWriter = this.ownResource(snapshot.root, new OwnedFileHandle(await open(imagePath, "wx")));
				{
					const stream = openEntrySafely(reader, selected.entry, "inspect_dart_aot", path, signal);
					let total = 0;
					for await (const chunk of stream) {
						if (signal?.aborted === true) return err(cancelledBy("inspect_dart_aot", signal));
						const view = chunk;
						total += view.byteLength;
						if (total > LIBRARY_MAX_BYTES) return err(new AnalysisResourceConstraintError("inspect_dart_aot", "file-size", `lib/${selected.abi}/libapp.so exceeds the ${String(LIBRARY_MAX_BYTES)}-byte read budget while streaming`, { max_library_bytes: LIBRARY_MAX_BYTES }, FLUTTER_ALLOWANCES.libraryRead));
						imageHash.update(view);
						await imageWriter.handle.writeFile(view);
					}
				}
				await this.releaseResource(snapshot.root, imageWriter);
				const imageSha256 = imageHash.digest("hex");
				const image = Buffer.alloc(declared + 1);
				let imageLength = 0;
				{
					const file = this.ownResource(snapshot.root, new OwnedFileHandle(await open(imagePath, "r")));
					while (imageLength < image.length) {
						if (signal?.aborted === true) return err(cancelledBy("inspect_dart_aot", signal));
						const result = await file.handle.read(image, imageLength, image.length - imageLength, null);
						assertArtifactReadActive(signal);
						if (result.bytesRead === 0) break;
						imageLength += result.bytesRead;
					}
					await this.releaseResource(snapshot.root, file);
				}
				assertArtifactReadActive(signal);
				const bounded = image.subarray(0, imageLength);
				const snapshotFacts = await observeDartSnapshot(bounded, signal);
				if (!snapshotFacts.observed) return err(new AnalysisUnsupportedTargetError("inspect_dart_aot", path, `No recognizable Dart snapshot symbols were found: ${snapshotFacts.reasons.join("; ")}`));
				const pool = await projectStringPool(snapshotFacts.pool, signal, poolPolicy);
				const snapshotPartial = !snapshotFacts.complete;
				const poolBudgetsReached = new Set(pool.limitsReached);
				if (pool.packageUriCount > poolPolicy.uri_limit || pool.dartUriCount > poolPolicy.uri_limit) poolBudgetsReached.add("uri_limit");
				if (pool.classLikeTokenCount > poolPolicy.token_limit) poolBudgetsReached.add("token_limit");
				const poolPartial = snapshotFacts.pool === null || pool.collectionCapped || pool.packageUriCount > poolPolicy.uri_limit || pool.dartUriCount > poolPolicy.uri_limit || pool.classLikeTokenCount > poolPolicy.token_limit;
				return ok(createAnalysisExecution({
					target: {
						path,
						bytes: snapshot.bytes,
						sha256: snapshot.sha256
					},
					abi: selected.abi,
					libapp: {
						coverage: snapshotPartial ? "partial" : "complete",
						bytes: imageLength,
						sha256: imageSha256,
						snapshot_hash: snapshotFacts.hashes.candidates.length === 1 ? snapshotFacts.hashes.candidates[0] : null,
						snapshot_hash_candidates: snapshotFacts.hashes.candidates,
						snapshot_hash_sources: snapshotFacts.hashes.sources,
						snapshot_profile: snapshotFacts.profile,
						sections: snapshotFacts.sections
					},
					string_pool: {
						policy: { ...poolPolicy },
						coverage: poolPartial ? "partial" : "complete",
						package_uris: pool.packageUris.slice(0, poolPolicy.uri_limit),
						package_uri_count_at_least: pool.packageUriCount,
						dart_uris: pool.dartUris.slice(0, poolPolicy.uri_limit),
						dart_uri_count_at_least: pool.dartUriCount,
						class_like_tokens: pool.classLikeTokens.slice(0, poolPolicy.token_limit),
						class_like_token_count_at_least: pool.classLikeTokenCount,
						printable_run_count: pool.printableRunCount,
						...poolBudgetsReached.size === 0 ? {} : { limits: [...poolBudgetsReached].map((budget) => dartPoolBudgetLimit(budget, poolPolicy)) }
					},
					coverage: snapshotPartial || poolPartial ? "partial" : "complete"
				}, FLUTTER_PROVIDER_IDENTITY, {
					subject: {
						path,
						format: "apk",
						sha256: snapshot.sha256
					},
					locations: [{
						kind: "artifact-path",
						path
					}],
					limitations: [
						"The APK is read through an owned read-only snapshot; concurrent changes to the original cannot mix into this observation",
						"Snapshot sections are located through the ELF dynamic symbol table; a payload without exported snapshot symbols is refused rather than guessed",
						"Snapshot hash sources count distinct physical headers. FullAOT kind 3 supports the legacy split profile and kind 2 supports the unified profile when the corresponding exports and header extents agree",
						"String-pool entries are byte-pattern observations from the selected snapshot data symbol",
						"class_like_tokens are identifier-shaped runs and include incidental matches",
						"URI/token counts are lower bounds for runs matching pool_policy.contains: distinct collection stops at twice each selected projection bound. printable_run_count counts complete printable runs before filtering; overflowed runs are omitted, never fabricated as prefixes",
						...snapshotFacts.limitations,
						...pool.limitsReached.map((limit) => `String-pool admission reached pool_policy.${limit}=${String(poolPolicy[limit])}. Retry with a narrower pool_policy.contains or increase ${limit}; string_pool.limits records the control and no REA restart is required. Counts remain lower bounds and overflowed runs are omitted. APK, library and response limits are unchanged`),
						...pool.dartUriCount > poolPolicy.uri_limit ? [`dart_uris reports ${String(poolPolicy.uri_limit)} of at least ${String(pool.dartUriCount)} distinct URIs; narrow pool_policy.contains or raise pool_policy.uri_limit (recorded in string_pool.limits) on a new call, no restart required`] : [],
						...pool.packageUriCount > poolPolicy.uri_limit ? [`package_uris reports ${String(poolPolicy.uri_limit)} of at least ${String(pool.packageUriCount)} distinct URIs; narrow pool_policy.contains or raise pool_policy.uri_limit (recorded in string_pool.limits) on a new call, no restart required`] : [],
						...pool.classLikeTokenCount > poolPolicy.token_limit ? [`class_like_tokens reports ${String(poolPolicy.token_limit)} of at least ${String(pool.classLikeTokenCount)} distinct tokens; narrow pool_policy.contains or raise pool_policy.token_limit (recorded in string_pool.limits) on a new call, no restart required`] : []
					]
				}));
			}
		};
		projectStringPool = async (section, signal, poolPolicy) => {
			const packages = new Set();
			const darts = new Set();
			const tokens = new Set();
			let runCount = 0;
			const limitsReached = new Set();
			const COLLECTION_SLACK = 2;
			const packageBudget = Math.min(poolPolicy.uri_limit, section?.length ?? 0) * COLLECTION_SLACK;
			const dartBudget = packageBudget;
			const tokenBudget = Math.min(poolPolicy.token_limit, section?.length ?? 0) * COLLECTION_SLACK;
			if (section !== null) {
				let run = "";
				const consider = (text) => {
					if (text.length < 5) return;
					runCount += 1;
					if (poolPolicy.contains !== undefined && !text.includes(poolPolicy.contains)) return;
					if (text.startsWith("package:")) {
						if (!packages.has(text) && packages.size >= packageBudget) limitsReached.add("uri_limit");
						else packages.add(text);
					} else if (text.startsWith("dart:")) {
						if (!darts.has(text) && darts.size >= dartBudget) limitsReached.add("uri_limit");
						else darts.add(text);
					} else if (IDENTIFIER_PATTERN.test(text)) {
						if (text.length > poolPolicy.token_bytes) limitsReached.add("token_bytes");
						else if (!tokens.has(text) && tokens.size >= tokenBudget) limitsReached.add("token_limit");
						else tokens.add(text);
					}
				};
				let overflowed = false;
				for (let start = 0; start < section.length; start += 64 * 1024) {
					await setImmediate();
					assertArtifactReadActive(signal);
					for (const byte of section.subarray(start, start + 64 * 1024)) {
						if (byte >= 32 && byte < 127) {
							if (run.length < poolPolicy.run_bytes) run += String.fromCharCode(byte);
							else {
								overflowed = true;
								limitsReached.add("run_bytes");
							}
						} else {
							if (!overflowed) consider(run);
							overflowed = false;
							run = "";
						}
					}
				}
				if (!overflowed) consider(run);
			}
			assertArtifactReadActive(signal);
			return {
				packageUris: [...packages].sort(),
				packageUriCount: packages.size,
				dartUris: [...darts].sort(),
				dartUriCount: darts.size,
				classLikeTokens: [...tokens].sort(),
				classLikeTokenCount: tokens.size,
				printableRunCount: runCount,
				collectionCapped: limitsReached.size > 0,
				limitsReached: [...limitsReached]
			};
		};
	})))();
}

//#endregion
//#region dist/composition/flutter.js
var createFlutterBuildAnalysisProvider;
function init_flutter() {
	return (init_flutter = __esmMin((() => {
		init_FlutterBuildProvider();
		createFlutterBuildAnalysisProvider = () => new FlutterBuildProvider();
	})))();
}

//#endregion
//#region dist/cli/flutterCommands.js
var flutterCommands_exports = /* @__PURE__ */ __exportAll({ registerFlutterCommands: () => registerFlutterCommands });
var registerFlutterCommands;
function init_flutterCommands() {
	return (init_flutterCommands = __esmMin((() => {
		init_projectCliAnalysisResult();
		init_evidence();
		init_evidenceValidation();
		init_FlutterBuildAnalysisService();
		init_flutter();
		init_flutterToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		init_cliEvidenceCallerPath();
		registerFlutterCommands = (cli, logger, provider = createFlutterBuildAnalysisProvider()) => {
			/**
			* Run one operation on the APK the caller selected, recording that spelling
			* in Evidence, including a result completed before cleanup failed. The
			* contract admits a relative path, resolved by the provider from the working
			* directory, so the CLI passes it on as spelled.
			*/
			const run = (operation) => (input, { signal }) => finishAnalysisCommand(bindCliEvidenceCallerPath(input.path, () => new FlutterBuildAnalysisService(provider).execute(operation, input, { signal })), { close: () => provider.close() }, "flutter", operation, signal, undefined, { recoverCompletedObservation: (observation) => {
				const parsed = recognizeEvidence(observation);
				return parsed.ok && parsed.value !== undefined ? withEvidenceCallerInputPath(parsed.value, input.path) : undefined;
			} }).then(projectCliAnalysisResult);
			registerContractCommand(cli, logger, contractNamed(FLUTTER_TOOL_CONTRACTS, "identify_flutter_build"), {
				description: "Identify a Flutter build's Dart snapshot hash and engine facts by pure APK parsing",
				positionals: ["path"]
			}, run("identify_flutter_build"));
			registerContractCommand(cli, logger, contractNamed(FLUTTER_TOOL_CONTRACTS, "inspect_dart_aot"), {
				description: "Inspect one ABI's Dart AOT snapshot: sections, headers, and the string pool",
				positionals: ["path"],
				jsonText: ["pool_policy"],
				omit: { detail: "The CLI returns complete Evidence; a summary needs a session that retains it for inspect_analysis_view" }
			}, run("inspect_dart_aot"));
		};
	})))();
}

//#endregion
export { flutterCommands_exports, init_flutterCommands };