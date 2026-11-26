import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_peOptionalHeader, readPeOptionalHeaderStructure } from "./peOptionalHeader-DrZ2zQO-.js";

//#region dist/domain/peMachine.js
var architectureForMachine, peOptionalHeaderMagic, NATIVE_OS_OVERRIDES, decodePeMachine, peSubjectArchitecture, readPeOptionalHeader;
function init_peMachine() {
	return (init_peMachine = __esmMin((() => {
		init_peOptionalHeader();
		init_result();
		architectureForMachine = (machine) => {
			switch (machine) {
				case 332: return "x86";
				case 34404: return "x86_64";
				case 448:
				case 450:
				case 452: return "arm";
				case 43620: return "arm64";
			}
			return undefined;
		};
		peOptionalHeaderMagic = (architecture) => architecture === "x86_64" || architecture === "arm64" ? 523 : 267;
		NATIVE_OS_OVERRIDES = [
			17988,
			44484,
			44485,
			31609,
			6547,
			6546
		];
		decodePeMachine = (machine) => {
			const direct = architectureForMachine(machine);
			if (direct !== undefined) return {
				architecture: direct,
				nativeOsOverride: false
			};
			for (const override of NATIVE_OS_OVERRIDES) {
				const architecture = architectureForMachine(machine ^ override);
				if (architecture !== undefined) return {
					architecture,
					nativeOsOverride: true
				};
			}
			return undefined;
		};
		peSubjectArchitecture = (machineType, format) => {
			const machine = decodePeMachine(machineType);
			if (machine === undefined || machine.nativeOsOverride) return undefined;
			const magic = format === "pe32-plus" ? 523 : 267;
			return magic === peOptionalHeaderMagic(machine.architecture) ? machine.architecture : undefined;
		};
		readPeOptionalHeader = (optionalHeader, machineType) => {
			const parsed = readPeOptionalHeaderStructure(optionalHeader);
			if (!parsed.ok) return err({
				kind: parsed.error.kind,
				message: parsed.error.message
			});
			const facts = parsed.value;
			const cli = facts.dataDirectories[14];
			const managed = cli !== undefined && (cli.address !== 0 || cli.size !== 0);
			const decoded = decodePeMachine(machineType);
			const machine = decoded?.nativeOsOverride && !managed ? null : decoded ?? null;
			if (machine !== null && facts.magic !== peOptionalHeaderMagic(machine.architecture)) return err({
				kind: "malformed",
				message: "PE optional-header magic does not match its architecture"
			});
			return ok({
				...facts,
				machine,
				managed
			});
		};
	})))();
}

//#endregion
//#region dist/domain/apple/machoLoadCommandCodes.js
var LC_REQ_DYLD, LC, NAMES, machoLoadCommandName;
function init_machoLoadCommandCodes() {
	return (init_machoLoadCommandCodes = __esmMin((() => {
		LC_REQ_DYLD = 2147483648;
		LC = {
			SEGMENT: 1,
			SYMTAB: 2,
			SYMSEG: 3,
			THREAD: 4,
			UNIXTHREAD: 5,
			LOADFVMLIB: 6,
			IDFVMLIB: 7,
			IDENT: 8,
			FVMFILE: 9,
			PREPAGE: 10,
			DYSYMTAB: 11,
			LOAD_DYLIB: 12,
			ID_DYLIB: 13,
			LOAD_DYLINKER: 14,
			ID_DYLINKER: 15,
			PREBOUND_DYLIB: 16,
			ROUTINES: 17,
			SUB_FRAMEWORK: 18,
			SUB_UMBRELLA: 19,
			SUB_CLIENT: 20,
			SUB_LIBRARY: 21,
			TWOLEVEL_HINTS: 22,
			PREBIND_CKSUM: 23,
			LOAD_WEAK_DYLIB: 2147483672,
			SEGMENT_64: 25,
			ROUTINES_64: 26,
			UUID: 27,
			RPATH: 2147483676,
			CODE_SIGNATURE: 29,
			SEGMENT_SPLIT_INFO: 30,
			REEXPORT_DYLIB: 2147483679,
			LAZY_LOAD_DYLIB: 32,
			ENCRYPTION_INFO: 33,
			DYLD_INFO: 34,
			DYLD_INFO_ONLY: 2147483682,
			LOAD_UPWARD_DYLIB: 2147483683,
			VERSION_MIN_MACOSX: 36,
			VERSION_MIN_IPHONEOS: 37,
			FUNCTION_STARTS: 38,
			DYLD_ENVIRONMENT: 39,
			MAIN: 2147483688,
			DATA_IN_CODE: 41,
			SOURCE_VERSION: 42,
			DYLIB_CODE_SIGN_DRS: 43,
			ENCRYPTION_INFO_64: 44,
			LINKER_OPTION: 45,
			LINKER_OPTIMIZATION_HINT: 46,
			VERSION_MIN_TVOS: 47,
			VERSION_MIN_WATCHOS: 48,
			NOTE: 49,
			BUILD_VERSION: 50,
			DYLD_EXPORTS_TRIE: 2147483699,
			DYLD_CHAINED_FIXUPS: 2147483700,
			FILESET_ENTRY: 2147483701,
			ATOM_INFO: 54,
			FUNCTION_VARIANTS: 55,
			FUNCTION_VARIANT_FIXUPS: 56,
			TARGET_TRIPLE: 57,
			LAZY_LOAD_DYLIB_INFO: 58
		};
		NAMES = new Map(Object.entries(LC).map(([name, code]) => [code, `LC_${name}`]));
		machoLoadCommandName = (code) => NAMES.get(code);
	})))();
}

//#endregion
//#region dist/domain/apple/jvmClassFile.js
var MAX_JVM_CLASS_IDENTITY_BYTES, JVM_CLASS_IDENTITY_LIMIT_REASON, ClassFileCursor, readMajorVersion, hasJvmClassHeader, readConstantPool, readConstant, poolHasTag, hasValidPoolReferences, validMethodHandle, readAttributes, readMembers, isJvmClassFile;
function init_jvmClassFile() {
	return (init_jvmClassFile = __esmMin((() => {
		init_binaryContainer();
		MAX_JVM_CLASS_IDENTITY_BYTES = 16 * 1024 * 1024;
		JVM_CLASS_IDENTITY_LIMIT_REASON = "FAT/JVM identity is unresolved because the class identity scan exceeds the 16 MiB limit";
		ClassFileCursor = class {
			offset = 0;
			reader;
			constructor(bytes) {
				const view = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
				this.reader = new BinaryReader(view, false, "JVM class");
			}
			get remaining() {
				return this.reader.bytes.length - this.offset;
			}
			u1() {
				if (!this.has(1)) return null;
				return this.reader.u8(this.offset++);
			}
			u2() {
				if (!this.has(2)) return null;
				const value = this.reader.u16(this.offset);
				this.offset += 2;
				return value;
			}
			u4() {
				if (!this.has(4)) return null;
				const value = this.reader.u32(this.offset);
				this.offset += 4;
				return value;
			}
			skip(length) {
				if (!Number.isSafeInteger(length) || length < 0 || !this.has(length)) return false;
				this.offset += length;
				return true;
			}
			has(length) {
				return length <= this.remaining;
			}
		};
		readMajorVersion = (cursor) => {
			if (cursor.u4() !== 3405691582) return null;
			const minor = cursor.u2();
			const major = cursor.u2();
			if (minor === null || major === null || major < 45) return null;
			return major < 56 || minor === 0 || minor === 65535 ? major : null;
		};
		hasJvmClassHeader = (bytes) => readMajorVersion(new ClassFileCursor(bytes)) !== null;
		readConstantPool = (cursor, count) => {
			if ((count - 1) * 3 + 14 > cursor.remaining) return null;
			const pool = {
				tags: Array.from({ length: count }, () => null),
				first: Array.from({ length: count }, () => null),
				second: Array.from({ length: count }, () => null)
			};
			for (let index = 1; index < count; index += 1) {
				const tag = cursor.u1();
				if (tag === null) return null;
				if (!readConstant(cursor, tag, index, pool)) return null;
				if (tag === 5 || tag === 6) index += 1;
			}
			return pool;
		};
		readConstant = (cursor, tag, index, pool) => {
			switch (tag) {
				case 1: {
					const length = cursor.u2();
					if (length === null || !cursor.skip(length)) return false;
					break;
				}
				case 3:
				case 4:
					if (cursor.u4() === null) return false;
					break;
				case 5:
				case 6:
					if (index + 1 >= pool.tags.length || !cursor.skip(8)) return false;
					break;
				case 7:
				case 8:
				case 16:
				case 19:
				case 20:
					pool.first[index] = cursor.u2();
					if (pool.first[index] === null) return false;
					break;
				case 9:
				case 10:
				case 11:
				case 12:
				case 17:
				case 18:
					pool.first[index] = cursor.u2();
					pool.second[index] = cursor.u2();
					if (pool.first[index] === null || pool.second[index] === null) return false;
					break;
				case 15:
					pool.first[index] = cursor.u1();
					pool.second[index] = cursor.u2();
					if (pool.first[index] === null || pool.second[index] === null) return false;
					break;
				default: return false;
			}
			pool.tags[index] = tag;
			return true;
		};
		poolHasTag = (pool, index, ...tags) => Number.isInteger(index) && index > 0 && tags.includes(pool.tags[index] ?? -1);
		hasValidPoolReferences = (pool, major) => {
			for (let index = 1; index < pool.tags.length; index += 1) {
				const tag = pool.tags[index] ?? null;
				const first = pool.first[index] ?? null;
				const second = pool.second[index] ?? null;
				if ([
					7,
					8,
					16,
					19,
					20
				].includes(tag ?? -1)) {
					if (first === null || !poolHasTag(pool, first, 1)) return false;
					if (tag === 16 && major < 51 || (tag === 19 || tag === 20) && major < 53) return false;
				} else if ([
					9,
					10,
					11
				].includes(tag ?? -1)) {
					if (first === null || second === null || !poolHasTag(pool, first, 7) || !poolHasTag(pool, second, 12)) return false;
				} else if (tag === 12) {
					if (first === null || second === null || !poolHasTag(pool, first, 1) || !poolHasTag(pool, second, 1)) return false;
				} else if (tag === 15 && !validMethodHandle(pool, first, second, major)) {
					return false;
				} else if (tag === 17 || tag === 18) {
					if (second === null || !poolHasTag(pool, second, 12) || major < (tag === 17 ? 55 : 51)) return false;
				}
			}
			return true;
		};
		validMethodHandle = (pool, kind, reference, major) => {
			if (kind === null || reference === null || kind < 1 || kind > 9 || major < 51) return false;
			if (kind <= 4) return poolHasTag(pool, reference, 9);
			if (kind === 5 || kind === 8) return poolHasTag(pool, reference, 10);
			if (kind === 6 || kind === 7) return poolHasTag(pool, reference, ...major >= 52 ? [10, 11] : [10]);
			return poolHasTag(pool, reference, 11);
		};
		readAttributes = (cursor, pool, count) => {
			for (let index = 0; index < count; index += 1) {
				const name = cursor.u2();
				const length = cursor.u4();
				if (name === null || !poolHasTag(pool, name, 1) || length === null || !cursor.skip(length)) return false;
			}
			return true;
		};
		readMembers = (cursor, pool) => {
			const count = cursor.u2();
			if (count === null) return false;
			for (let index = 0; index < count; index += 1) {
				if (cursor.u2() === null) return false;
				const name = cursor.u2();
				const descriptor = cursor.u2();
				const attributes = cursor.u2();
				if (name === null || descriptor === null || !poolHasTag(pool, name, 1) || !poolHasTag(pool, descriptor, 1) || attributes === null || !readAttributes(cursor, pool, attributes)) return false;
			}
			return true;
		};
		isJvmClassFile = (bytes) => {
			const cursor = new ClassFileCursor(bytes);
			const major = readMajorVersion(cursor);
			if (major === null) return false;
			const poolCount = cursor.u2();
			if (poolCount === null || poolCount === 0) return false;
			const pool = readConstantPool(cursor, poolCount);
			if (pool === null || !hasValidPoolReferences(pool, major)) return false;
			if (cursor.u2() === null) return false;
			const thisClass = cursor.u2();
			const superClass = cursor.u2();
			if (thisClass === null || !poolHasTag(pool, thisClass, 7) || superClass === null || superClass !== 0 && !poolHasTag(pool, superClass, 7)) return false;
			const interfaces = cursor.u2();
			if (interfaces === null) return false;
			for (let index = 0; index < interfaces; index += 1) {
				const reference = cursor.u2();
				if (reference === null || !poolHasTag(pool, reference, 7)) return false;
			}
			if (!readMembers(cursor, pool) || !readMembers(cursor, pool)) return false;
			const attributes = cursor.u2();
			return attributes !== null && readAttributes(cursor, pool, attributes) && cursor.remaining === 0;
		};
	})))();
}

//#endregion
//#region dist/domain/apple/machoContainer.js
var machoLoadCommandAlignment, machoReader, readMachoHeaderPrefixFacts, FAT_MAGIC, FAT_MAGIC_64, FAT_CIGAM, FAT_CIGAM_64, MAX_FAT_ARCHITECTURES, KNOWN_MACHO_CPU_TYPES, thinMachoFormat, hasMachoMagic, readFatMagicFormat, machoContainerKindFromMagic, readFatHeaderPrefix, readFatContainerHeader, readFatContainerTable, decodeFatContainerTable, classifyFatContainerIdentity, classifyFatContainerEvidence, readFatJvmIdentityLimitIssue, readFatSliceDeclarations, findOverlappingFatSlices, fatSliceOverlapReason, validateFatSlice, inspectFatSliceRange, validateFatSliceIdentity, safeNumber;
function init_machoContainer() {
	return (init_machoContainer = __esmMin((() => {
		init_binaryContainer();
		init_jvmClassFile();
		machoLoadCommandAlignment = (wide) => wide ? 8 : 4;
		machoReader = (bytes, littleEndian) => new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "Mach-O");
		readMachoHeaderPrefixFacts = (bytes) => {
			if (bytes.byteLength < 4) return {
				magic: null,
				format: null,
				identity: null
			};
			const magic = machoReader(bytes, false).u32(0);
			const format = thinMachoFormat(magic);
			if (format === null) return {
				magic,
				format: null,
				identity: null
			};
			if (bytes.byteLength < 12) return {
				magic,
				format,
				identity: null
			};
			const fields = machoReader(bytes, format.littleEndian);
			return {
				magic,
				format,
				identity: {
					cpuType: fields.u32(4),
					cpuSubtype: fields.u32(8)
				}
			};
		};
		FAT_MAGIC = 3405691582;
		FAT_MAGIC_64 = 3405691583;
		FAT_CIGAM = 3199925962;
		FAT_CIGAM_64 = 3216703178;
		MAX_FAT_ARCHITECTURES = 128;
		KNOWN_MACHO_CPU_TYPES = [
			7,
			16777223,
			12,
			16777228,
			33554444,
			18,
			16777234
		];
		thinMachoFormat = (magic) => {
			if (![
				4277009102,
				4277009103,
				3472551422,
				3489328638
			].includes(magic)) return null;
			const wide = magic === 4277009103 || magic === 3489328638;
			return {
				wide,
				littleEndian: magic === 3472551422 || magic === 3489328638,
				headerSize: wide ? 32 : 28
			};
		};
		hasMachoMagic = (bytes) => {
			if (readMachoHeaderPrefixFacts(bytes).format !== null) return true;
			const fat = readFatHeaderPrefix(bytes);
			return fat.state !== "unknown" && fat.state !== "not-fat";
		};
		readFatMagicFormat = (magic) => {
			if (![
				FAT_MAGIC,
				FAT_MAGIC_64,
				FAT_CIGAM,
				FAT_CIGAM_64
			].includes(magic)) return null;
			return {
				magic,
				wide: magic === FAT_MAGIC_64 || magic === FAT_CIGAM_64,
				littleEndian: magic === FAT_CIGAM || magic === FAT_CIGAM_64
			};
		};
		machoContainerKindFromMagic = (magic) => {
			if (thinMachoFormat(magic) !== null) return "thin";
			const fat = readFatMagicFormat(magic);
			return fat === null ? null : fat.wide ? "fat64" : "fat32";
		};
		readFatHeaderPrefix = (bytes) => {
			if (bytes.byteLength < 4) return {
				state: "unknown",
				requiredBytes: 4
			};
			const magic = machoReader(bytes, false).u32(0);
			const format = readFatMagicFormat(magic);
			if (format === null) return {
				state: "not-fat",
				magic
			};
			if (bytes.byteLength < 8) return {
				state: "incomplete",
				...format,
				requiredBytes: 8
			};
			const count = machoReader(bytes, format.littleEndian).u32(4);
			return {
				state: "parsed",
				...format,
				count,
				tableEnd: 8 + count * (format.wide ? 32 : 20)
			};
		};
		readFatContainerHeader = (bytes, fileSize) => {
			const prefix = readFatHeaderPrefix(bytes);
			if (prefix.state === "unknown" || prefix.state === "not-fat") return { state: "not-fat" };
			if (!Number.isSafeInteger(fileSize) || fileSize < bytes.byteLength) return {
				state: "malformed",
				reason: "FAT file size is invalid or contradicts retained bytes"
			};
			const table = decodeFatContainerTable(bytes, prefix);
			if (table.state !== "parsed") {
				if (table.state === "needs-data" && table.requiredBytes > fileSize) {
					return table.requiredBytes === 8 && fileSize < 8 ? {
						state: "malformed",
						reason: "FAT header is truncated"
					} : { state: "not-fat" };
				}
				return table;
			}
			if (bytes.byteLength === fileSize && isJvmClassFile(bytes)) return { state: "not-fat" };
			if (table.tableEnd > fileSize) return { state: "not-fat" };
			return {
				...table,
				rangeIssues: table.slices.map((slice) => inspectFatSliceRange(slice, fileSize, table.tableEnd))
			};
		};
		readFatContainerTable = (bytes) => decodeFatContainerTable(bytes, readFatHeaderPrefix(bytes));
		decodeFatContainerTable = (bytes, prefix) => {
			if (prefix.state === "unknown" || prefix.state === "not-fat") return { state: "not-fat" };
			if (prefix.state === "incomplete") return {
				state: "needs-data",
				requiredBytes: prefix.requiredBytes
			};
			const { magic, littleEndian, wide, count, tableEnd } = prefix;
			if (count === 0) return {
				state: "malformed",
				reason: "FAT header declares no architectures"
			};
			if (count > MAX_FAT_ARCHITECTURES) return { state: "not-fat" };
			if (tableEnd > bytes.byteLength) return {
				state: "needs-data",
				requiredBytes: tableEnd
			};
			const declarations = readFatSliceDeclarations(bytes.subarray(8, tableEnd), {
				count,
				wide,
				littleEndian
			});
			return declarations.status === "parsed" ? {
				state: "parsed",
				magic,
				count,
				wide,
				littleEndian,
				tableEnd,
				slices: declarations.slices
			} : {
				state: "malformed",
				reason: declarations.reason
			};
		};
		classifyFatContainerIdentity = (header, sliceHeaderAt) => {
			const hasKnownCpu = header.slices.some(({ cpuType }) => KNOWN_MACHO_CPU_TYPES.includes(cpuType));
			const invalidRange = header.rangeIssues.find((issue) => issue !== null);
			if (hasKnownCpu && invalidRange !== undefined) return {
				state: "malformed",
				...invalidRange
			};
			const validRanges = header.slices.filter((_slice, index) => header.rangeIssues[index] === null);
			const missingHeaders = [];
			let observedMachO = false;
			let observedNonMachO = false;
			for (const slice of validRanges) {
				if (slice.size < 4) {
					observedNonMachO = true;
					continue;
				}
				const magic = sliceHeaderAt(slice.offset);
				if (magic === undefined || magic === null) missingHeaders.push(slice.offset);
				else if (thinMachoFormat(magic) !== null) observedMachO = true;
				else observedNonMachO = true;
			}
			if (observedNonMachO) return { state: "not-mach-o" };
			if (missingHeaders.length > 0) return {
				state: "needs-slice-header",
				offsets: missingHeaders
			};
			if (observedMachO) return invalidRange === undefined ? { state: "mach-o" } : {
				state: "malformed",
				...invalidRange
			};
			return { state: "not-mach-o" };
		};
		classifyFatContainerEvidence = (header, prefix, sliceHeadersByOffset) => classifyFatContainerIdentity(header, (offset) => {
			if (sliceHeadersByOffset?.has(offset)) return sliceHeadersByOffset.get(offset)?.magic;
			const slice = header.slices.find((candidate) => candidate.offset === offset);
			if (slice === undefined || offset >= prefix.byteLength) return undefined;
			const available = Math.max(0, Math.min(slice.size, prefix.byteLength - offset, 12));
			return readMachoHeaderPrefixFacts(prefix.subarray(offset, offset + available)).magic;
		});
		readFatJvmIdentityLimitIssue = async (header, identity, readAt) => {
			if (identity.state !== "malformed") return null;
			for (const [index, slice] of header.slices.entries()) {
				if (header.rangeIssues[index] !== null || slice.size < 28) continue;
				const requested = Math.min(32, slice.size);
				const observed = await readAt(slice.offset, requested);
				const { format, identity: embedded } = readMachoHeaderPrefixFacts(observed);
				if (format !== null && embedded !== null && format.headerSize <= requested && format.headerSize <= observed.byteLength && validateFatSliceIdentity(slice, embedded) === null) return null;
			}
			return JVM_CLASS_IDENTITY_LIMIT_REASON;
		};
		readFatSliceDeclarations = (tableBytes, options) => {
			const { count, wide, littleEndian } = options;
			const entrySize = wide ? 32 : 20;
			if (tableBytes.byteLength < count * entrySize) return {
				status: "malformed",
				reason: "FAT table is truncated"
			};
			const fields = machoReader(tableBytes, littleEndian);
			const slices = [];
			for (let index = 0; index < count; index++) {
				const base = index * entrySize;
				const offset = wide ? safeNumber(fields.word(base + 8, 64)) : fields.u32(base + 8);
				const size = wide ? safeNumber(fields.word(base + 16, 64)) : fields.u32(base + 12);
				if (offset === null || size === null) return {
					status: "malformed",
					reason: "FAT offset or size exceeds the safe range"
				};
				slices.push({
					index,
					offset,
					size,
					alignmentExponent: fields.u32(base + (wide ? 24 : 16)),
					cpuType: fields.u32(base),
					cpuSubtype: fields.u32(base + 4),
					reserved: wide ? fields.u32(base + 28) : null
				});
			}
			return {
				status: "parsed",
				slices
			};
		};
		findOverlappingFatSlices = (declarations) => {
			const ranges = [...declarations].sort((a, b) => a.offset - b.offset);
			for (let index = 1; index < ranges.length; index++) {
				const previous = ranges[index - 1];
				const current = ranges[index];
				if (previous !== undefined && current !== undefined && current.offset < previous.offset + previous.size) return [previous, current];
			}
			return null;
		};
		fatSliceOverlapReason = (overlap) => `Mach-O slices ${overlap[0].index} and ${overlap[1].index} overlap.`;
		validateFatSlice = (declaration, containerSize, tableEnd, embedded) => {
			const rangeIssue = inspectFatSliceRange(declaration, containerSize, tableEnd);
			if (rangeIssue !== null) return rangeIssue.reason;
			return embedded === undefined ? null : validateFatSliceIdentity(declaration, embedded);
		};
		inspectFatSliceRange = (declaration, containerSize, tableEnd) => {
			const { index, offset, size, alignmentExponent } = declaration;
			if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || size <= 0 || offset < tableEnd) return {
				category: "malformed",
				reason: `FAT architecture ${index} has an invalid slice range`
			};
			if (offset > containerSize || size > containerSize - offset) return {
				category: "malformed",
				reason: `FAT architecture ${index} slice range extends beyond the file`
			};
			if (!Number.isInteger(alignmentExponent) || alignmentExponent < 0 || alignmentExponent > 52) return {
				category: "unsupported",
				reason: `FAT architecture ${index} alignment exponent ${alignmentExponent} is unsupported`
			};
			if (offset % 2 ** alignmentExponent !== 0) return {
				category: "malformed",
				reason: `FAT architecture ${index} offset is not aligned to 2^${alignmentExponent}`
			};
			return null;
		};
		validateFatSliceIdentity = (declaration, embedded) => embedded.cpuType === declaration.cpuType && embedded.cpuSubtype === declaration.cpuSubtype ? null : `FAT architecture ${declaration.index} CPU type/subtype disagrees with its Mach-O header`;
		safeNumber = (value) => value > BigInt(Number.MAX_SAFE_INTEGER) ? null : Number(value);
	})))();
}

//#endregion
//#region dist/domain/apple/machoLoadCommands.js
var MACHO_LOAD_COMMAND_HEADER_BYTES, machoWordReader, MACHO_HEADER_FLAGS_OFFSET, readMachoHeaderDeclarations, readMachoLoadCommandDeclarations, machoCommandTableIssue, readMachoLoadCommandTableHeader, MachoLoadCommandCursor, DYLD_INFO_WORD_FIELDS, FIXED_WORD_FIELDS, machoFixedWordFieldNames, decodeMachoFixedWordFields, decodeMachoWordFields, readMachoDyldInfoCommand, readMachoSymtabCommand, admitMachoSymtabRanges, readMachoLinkeditDataCommand, readMachoCommandStringBytes;
function init_machoLoadCommands() {
	return (init_machoLoadCommands = __esmMin((() => {
		init_binaryContainer();
		init_machoLoadCommandCodes();
		init_result();
		init_machoContainer();
		MACHO_LOAD_COMMAND_HEADER_BYTES = 8;
		machoWordReader = (bytes, littleEndian) => new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "macho");
		MACHO_HEADER_FLAGS_OFFSET = 24;
		readMachoHeaderDeclarations = (bytes, fileSize) => {
			const prefix = readMachoHeaderPrefixFacts(bytes);
			if (prefix.format === null) return ok(null);
			const { wide, headerSize, littleEndian } = prefix.format;
			if (bytes.byteLength < 28 || prefix.identity === null) return err(`truncated Mach-O header: a ${wide ? 64 : 32}-bit header needs ${headerSize} bytes; the file has ${fileSize}`);
			const reader = machoWordReader(bytes, littleEndian);
			const commandBytes = reader.u32(20);
			return ok({
				headerSize,
				wide,
				littleEndian,
				commandCount: reader.u32(16),
				commandBytes,
				fileType: reader.u32(12),
				flags: reader.u32(24),
				identity: prefix.identity
			});
		};
		readMachoLoadCommandDeclarations = (bytes, fileSize) => {
			const parsed = readMachoHeaderDeclarations(bytes, fileSize);
			if (!parsed.ok || parsed.value === null) return parsed;
			const { wide, headerSize } = parsed.value;
			if (bytes.byteLength < headerSize) return err(`truncated Mach-O header: a ${wide ? 64 : 32}-bit header needs ${headerSize} bytes; the file has ${fileSize}`);
			return parsed;
		};
		machoCommandTableIssue = ({ commandBytes, commandCount, headerSize }, fileSize) => {
			if (commandBytes > fileSize - headerSize) return {
				kind: "extent",
				message: `truncated Mach-O load commands: the header declares ${commandBytes} bytes after its ${headerSize}-byte header; the file has ${fileSize}`
			};
			if (commandCount * MACHO_LOAD_COMMAND_HEADER_BYTES > commandBytes) return {
				kind: "count",
				message: `Mach-O load command count ${commandCount} cannot fit in its ${commandBytes}-byte command table`
			};
			return null;
		};
		readMachoLoadCommandTableHeader = (bytes, fileSize) => {
			const parsed = readMachoLoadCommandDeclarations(bytes, fileSize);
			if (!parsed.ok || parsed.value === null) return parsed;
			const issue = machoCommandTableIssue(parsed.value, fileSize);
			return issue === null ? parsed : err(issue.message);
		};
		MachoLoadCommandCursor = class {
			table;
			#index = 0;
			#offset = 0;
			constructor(table) {
				this.table = table;
			}
			/** Offset relative to the command table; null when every declared row was read. */
			get nextOffset() {
				return this.#index < this.table.commandCount ? this.#offset : null;
			}
			/** Consume exactly one command's eight-byte header, leaving its payload to callers. */
			read(bytes) {
				const { commandBytes, littleEndian, wide } = this.table;
				if (this.#offset + MACHO_LOAD_COMMAND_HEADER_BYTES > commandBytes || bytes.byteLength < MACHO_LOAD_COMMAND_HEADER_BYTES) return err(`load command ${this.#index} starts beyond sizeofcmds`);
				const reader = machoWordReader(bytes, littleEndian);
				const size = reader.u32(4);
				if (size < MACHO_LOAD_COMMAND_HEADER_BYTES || size % machoLoadCommandAlignment(wide) !== 0 || size > commandBytes - this.#offset) return err(`load command ${this.#index} at offset ${this.#offset} has invalid cmdsize ${size}`);
				const frame = {
					index: this.#index,
					offset: this.#offset,
					command: reader.u32(0),
					size
				};
				this.#index += 1;
				this.#offset += size;
				return ok(frame);
			}
			/** A successful walk must exhaust both ncmds and sizeofcmds. */
			finish() {
				return this.#index === this.table.commandCount && this.#offset === this.table.commandBytes ? ok(null) : err(`load commands declare ${this.table.commandCount} commands but sizeofcmds holds ${this.table.commandBytes} bytes`);
			}
		};
		DYLD_INFO_WORD_FIELDS = [
			"rebase_off",
			"rebase_size",
			"bind_off",
			"bind_size",
			"weak_bind_off",
			"weak_bind_size",
			"lazy_bind_off",
			"lazy_bind_size",
			"export_off",
			"export_size"
		];
		FIXED_WORD_FIELDS = new Map([
			[LC.SYMTAB, [
				"symoff",
				"nsyms",
				"stroff",
				"strsize"
			]],
			[LC.SYMSEG, ["offset", "size"]],
			[LC.DYSYMTAB, [
				"ilocalsym",
				"nlocalsym",
				"iextdefsym",
				"nextdefsym",
				"iundefsym",
				"nundefsym",
				"tocoff",
				"ntoc",
				"modtaboff",
				"nmodtab",
				"extrefsymoff",
				"nextrefsyms",
				"indirectsymoff",
				"nindirectsyms",
				"extreloff",
				"nextrel",
				"locreloff",
				"nlocrel"
			]],
			[LC.TWOLEVEL_HINTS, ["offset", "nhints"]],
			[LC.PREBIND_CKSUM, ["cksum"]],
			[LC.CODE_SIGNATURE, ["dataoff", "datasize"]],
			[LC.SEGMENT_SPLIT_INFO, ["dataoff", "datasize"]],
			[LC.ENCRYPTION_INFO, [
				"cryptoff",
				"cryptsize",
				"cryptid"
			]],
			[LC.DYLD_INFO, DYLD_INFO_WORD_FIELDS],
			[LC.DYLD_INFO_ONLY, DYLD_INFO_WORD_FIELDS],
			[LC.FUNCTION_STARTS, ["dataoff", "datasize"]],
			[LC.DATA_IN_CODE, ["dataoff", "datasize"]],
			[LC.DYLIB_CODE_SIGN_DRS, ["dataoff", "datasize"]],
			[LC.ENCRYPTION_INFO_64, [
				"cryptoff",
				"cryptsize",
				"cryptid",
				"pad"
			]],
			[LC.LINKER_OPTIMIZATION_HINT, ["dataoff", "datasize"]],
			[LC.DYLD_EXPORTS_TRIE, ["dataoff", "datasize"]],
			[LC.DYLD_CHAINED_FIXUPS, ["dataoff", "datasize"]],
			[LC.ATOM_INFO, ["dataoff", "datasize"]],
			[LC.FUNCTION_VARIANTS, ["dataoff", "datasize"]],
			[LC.FUNCTION_VARIANT_FIXUPS, ["dataoff", "datasize"]],
			[LC.LAZY_LOAD_DYLIB_INFO, ["dataoff", "datasize"]]
		]);
		machoFixedWordFieldNames = (command) => FIXED_WORD_FIELDS.get(command);
		decodeMachoFixedWordFields = (command, fieldBytes, littleEndian) => {
			const names = FIXED_WORD_FIELDS.get(command);
			return names === undefined ? undefined : decodeMachoWordFields(names, fieldBytes, littleEndian);
		};
		decodeMachoWordFields = (names, fieldBytes, littleEndian) => {
			if (fieldBytes.byteLength < names.length * 4) return null;
			const reader = machoWordReader(fieldBytes, littleEndian);
			return Object.fromEntries(names.map((name, index) => [name, reader.u32(index * 4)]));
		};
		readMachoDyldInfoCommand = (body, littleEndian) => decodeMachoWordFields(DYLD_INFO_WORD_FIELDS, body.subarray(8), littleEndian);
		readMachoSymtabCommand = (body, littleEndian) => {
			const fields = decodeMachoFixedWordFields(LC.SYMTAB, body.subarray(8), littleEndian);
			if (fields === null || fields === undefined) return null;
			const { symoff, nsyms, stroff, strsize } = fields;
			if (symoff === undefined || nsyms === undefined || stroff === undefined || strsize === undefined) return null;
			return {
				symoff,
				nsyms,
				stroff,
				strsize
			};
		};
		admitMachoSymtabRanges = ({ symoff, nsyms, stroff, strsize }, wide, sliceSize) => {
			const width = wide ? 16 : 12;
			const symbolsEnd = symoff + nsyms * width;
			const stringsEnd = stroff + strsize;
			return symbolsEnd <= sliceSize && stringsEnd <= sliceSize ? {
				width,
				symbolsEnd,
				stringsEnd
			} : null;
		};
		readMachoLinkeditDataCommand = (command, body, littleEndian) => {
			const fields = decodeMachoFixedWordFields(command, body.subarray(8), littleEndian);
			if (fields === null || fields === undefined) return null;
			const { dataoff, datasize } = fields;
			if (dataoff === undefined || datasize === undefined) return null;
			return {
				dataOffset: dataoff,
				dataSize: datasize
			};
		};
		readMachoCommandStringBytes = (body, minimumOffset, littleEndian) => {
			if (body.byteLength < 12) return err({
				_tag: "InvalidMachoCommandString",
				reason: "truncated-offset"
			});
			const reader = machoWordReader(body, littleEndian);
			const offset = reader.u32(8);
			if (offset < minimumOffset || offset >= body.byteLength) return err({
				_tag: "InvalidMachoCommandString",
				reason: "invalid-offset",
				offset
			});
			const end = body.indexOf(0, offset);
			if (end < 0) return err({
				_tag: "InvalidMachoCommandString",
				reason: "unterminated"
			});
			return ok({
				offset,
				bytes: body.subarray(offset, end)
			});
		};
	})))();
}

//#endregion
export { LC, LC_REQ_DYLD, MAX_JVM_CLASS_IDENTITY_BYTES, MachoLoadCommandCursor, admitMachoSymtabRanges, classifyFatContainerEvidence, classifyFatContainerIdentity, decodeMachoFixedWordFields, decodePeMachine, fatSliceOverlapReason, findOverlappingFatSlices, hasJvmClassHeader, hasMachoMagic, init_jvmClassFile, init_machoContainer, init_machoLoadCommandCodes, init_machoLoadCommands, init_peMachine, isJvmClassFile, machoCommandTableIssue, machoContainerKindFromMagic, machoFixedWordFieldNames, machoLoadCommandName, machoWordReader, peSubjectArchitecture, readFatContainerHeader, readFatContainerTable, readFatHeaderPrefix, readFatJvmIdentityLimitIssue, readFatSliceDeclarations, readMachoCommandStringBytes, readMachoDyldInfoCommand, readMachoHeaderDeclarations, readMachoHeaderPrefixFacts, readMachoLinkeditDataCommand, readMachoLoadCommandDeclarations, readMachoLoadCommandTableHeader, readMachoSymtabCommand, readPeOptionalHeader, validateFatSlice, validateFatSliceIdentity };