import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { C as init_parseFailure, T as malformedInput, b as ParseFailureError, k as unsupportedInput } from "./jsonValue-BIEmjG1z.js";
import { A as init_binaryContainer, S as BinaryReader } from "./canonicalDigest-DUQN3Yyz.js";
import { i as strictUtf8Decoder, n as init_strictUtf8 } from "./strictUtf8-Cx_KgW8Z.js";
import { a as init_machoCpuIdentity, s as machoArchitectureName } from "./machoCpuIdentity-BfL0-CNI.js";

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
//#region dist/domain/apple/machoDylibCommand.js
var DEPENDENCY_COMMANDS, machoDependencyCommand, MACHO_DYLIB_FIELDS_OFFSET, MACHO_DYLIB_NAME_MIN, MACHO_DYLIB_USE_NAME_OFFSET, DYLIB_USE_MARKER, canUseDylibFlags, machoDylibFieldsSize, readMachoDylibFields, readMachoDylibCommandFacts;
function init_machoDylibCommand() {
	return (init_machoDylibCommand = __esmMin((() => {
		init_binaryContainer();
		init_machoLoadCommandCodes();
		init_result();
		init_machoLoadCommands();
		DEPENDENCY_COMMANDS = new Map([
			[LC.LOAD_DYLIB, "LC_LOAD_DYLIB"],
			[LC.LOAD_WEAK_DYLIB, "LC_LOAD_WEAK_DYLIB"],
			[LC.REEXPORT_DYLIB, "LC_REEXPORT_DYLIB"],
			[LC.LAZY_LOAD_DYLIB, "LC_LAZY_LOAD_DYLIB"],
			[LC.LOAD_UPWARD_DYLIB, "LC_LOAD_UPWARD_DYLIB"]
		]);
		machoDependencyCommand = (code) => DEPENDENCY_COMMANDS.get(code) ?? null;
		MACHO_DYLIB_FIELDS_OFFSET = 12;
		MACHO_DYLIB_NAME_MIN = 24;
		MACHO_DYLIB_USE_NAME_OFFSET = 28;
		DYLIB_USE_MARKER = 443815936;
		canUseDylibFlags = (command, nameOffset) => nameOffset === MACHO_DYLIB_USE_NAME_OFFSET && (command === LC.LOAD_DYLIB || command === LC.LOAD_WEAK_DYLIB || command === LC.REEXPORT_DYLIB || command === LC.LOAD_UPWARD_DYLIB);
		machoDylibFieldsSize = (command, nameOffset) => (canUseDylibFlags(command, nameOffset) ? MACHO_DYLIB_USE_NAME_OFFSET : 24) - 12;
		readMachoDylibFields = (bytes, command, nameOffset, littleEndian) => {
			const reader = new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "macho");
			const timestamp = reader.u32(0);
			return {
				nameOffset,
				currentVersion: reader.u32(4),
				compatibilityVersion: reader.u32(8),
				encoding: canUseDylibFlags(command, nameOffset) && timestamp === DYLIB_USE_MARKER ? {
					kind: "use",
					flags: reader.u32(12)
				} : {
					kind: "timestamp",
					timestamp
				}
			};
		};
		readMachoDylibCommandFacts = (body, command, littleEndian) => {
			if (body.byteLength < 24) return err({
				_tag: "InvalidMachoDylibCommand",
				reason: "truncated-header"
			});
			const name = readMachoCommandStringBytes(body, 24, littleEndian);
			if (!name.ok) return name;
			const offset = name.value.offset;
			const { encoding, currentVersion, compatibilityVersion } = readMachoDylibFields(body.subarray(12, 12 + machoDylibFieldsSize(command, offset)), command, offset, littleEndian);
			return ok({
				encoding: encoding.kind === "use" ? "dylib_use_command" : "dylib_command",
				flags: encoding.kind === "use" ? encoding.flags : null,
				currentVersion,
				compatibilityVersion,
				nameOffset: offset,
				nameBytes: name.value.bytes
			});
		};
	})))();
}

//#endregion
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
//#region dist/domain/apple/machoPlatform.js
var MACHO_VERSION_MIN_PLATFORMS, classifyMachoVersionMinCommand, legacyMachoPlatform;
function init_machoPlatform() {
	return (init_machoPlatform = __esmMin((() => {
		init_machoLoadCommandCodes();
		MACHO_VERSION_MIN_PLATFORMS = new Map([
			[LC.VERSION_MIN_MACOSX, 1],
			[LC.VERSION_MIN_IPHONEOS, 2],
			[LC.VERSION_MIN_TVOS, 3],
			[LC.VERSION_MIN_WATCHOS, 4]
		]);
		classifyMachoVersionMinCommand = (command, size) => {
			const platform = MACHO_VERSION_MIN_PLATFORMS.get(command);
			if (platform === undefined) return null;
			if (size === 16) return {
				kind: "exact",
				platform
			};
			return { kind: size < 16 ? "truncated" : "oversized" };
		};
		legacyMachoPlatform = (platform, cpuType) => {
			if (platform === 3) return cpuType === 16777223 ? 8 : 3;
			if (cpuType === 7 || cpuType === 16777223) {
				if (platform === 2) return 7;
				if (platform === 4) return 9;
			}
			return platform;
		};
	})))();
}

//#endregion
//#region dist/domain/apple/machoLoadCommandReader.js
var MAX_LOAD_COMMAND_BYTES, MAX_LAZY_INFO_DEPENDENCIES, MAX_LAZY_INFO_SYMBOL_REFERENCES, CPU_TYPE_ARM64, LAZY_INFO_HEADER_BYTES, LAZY_INFO_MAY_BE_MISSING, LAZY_INFO_MIN_VM_OFFSET, DYLIB_USE_WEAK_LINK, DYLIB_USE_REEXPORT, DYLIB_USE_UPWARD, DYLIB_USE_DELAYED_INIT, MACHO_FORMAT, machoIssue, machoIssueOf, readMachoContainer, readSliceMagic, readMachoImage, rangeValidSlices, readAppleHiddenArm64Row, readHiddenSlice, readFatSlices, readSliceCommandTable, failed, frameLoadCommands, readSlice, maximumVmOffset, readSegmentSpan, containedPayload, appendDependencies, decodeCommand, decodeLazyLoadDylibInfoCommand, readLazyPayloadBytes, readLazyLoadDylibInfo, decodeLazyLoadDylibInfoPayload, chargeLazyString, payloadString, decodeDependency, commandString, throwCommandStringIssue, decodeCommandString, readExact, fileTypeName, version, viewOf;
function init_machoLoadCommandReader() {
	return (init_machoLoadCommandReader = __esmMin((() => {
		init_machoLoadCommandCodes();
		init_parseFailure();
		init_machoDylibCommand();
		init_machoSegmentHeader();
		init_machoLoadCommands();
		init_jvmClassFile();
		init_machoCpuIdentity();
		init_machoPlatform();
		init_machoContainer();
		init_strictUtf8();
		MAX_LOAD_COMMAND_BYTES = 16 * 1024 * 1024;
		MAX_LAZY_INFO_DEPENDENCIES = 1024;
		MAX_LAZY_INFO_SYMBOL_REFERENCES = 64 * 1024;
		CPU_TYPE_ARM64 = 16777228;
		LAZY_INFO_HEADER_BYTES = 24;
		LAZY_INFO_MAY_BE_MISSING = 1;
		LAZY_INFO_MIN_VM_OFFSET = 16384n;
		DYLIB_USE_WEAK_LINK = 1;
		DYLIB_USE_REEXPORT = 2;
		DYLIB_USE_UPWARD = 4;
		DYLIB_USE_DELAYED_INIT = 8;
		MACHO_FORMAT = "mach-o";
		machoIssue = (status, reason) => status === "malformed" ? malformedInput(MACHO_FORMAT, reason) : unsupportedInput(MACHO_FORMAT, reason);
		machoIssueOf = (cause) => cause instanceof ParseFailureError && cause.failure.format === MACHO_FORMAT && (cause.kind === "malformed" || cause.kind === "unsupported") ? {
			status: cause.kind,
			reason: cause.message
		} : undefined;
		readMachoContainer = async (readAt, size) => {
			const head = await readAt(0, Math.min(size, 8));
			if (head.byteLength < 8) return hasMachoMagic(head) ? {
				kind: "issue",
				status: "malformed",
				reason: "Mach-O header is truncated"
			} : { kind: "not-mach-o" };
			const mayBeJvmClass = hasJvmClassHeader(head);
			let header;
			if (mayBeJvmClass && size <= 16777216) {
				const complete = await readAt(0, size);
				header = complete.byteLength === size ? readFatContainerHeader(complete, size) : readFatContainerHeader(head, size);
			} else header = readFatContainerHeader(head, size);
			if (header.state !== "not-fat") {
				if (header.state === "needs-data") {
					header = readFatContainerHeader(await readAt(0, header.requiredBytes), size);
				}
				if (header.state === "not-fat") return { kind: "not-mach-o" };
				if (header.state === "needs-data") return {
					kind: "issue",
					status: "malformed",
					reason: "FAT table is truncated"
				};
				if (header.state === "malformed") return {
					kind: "issue",
					status: "malformed",
					reason: header.reason
				};
				let identity = classifyFatContainerIdentity(header, () => undefined);
				if (identity.state === "needs-slice-header") {
					const sliceHeaders = new Map();
					for (const offset of identity.offsets) sliceHeaders.set(offset, await readSliceMagic(readAt, offset));
					identity = classifyFatContainerIdentity(header, (offset) => sliceHeaders.get(offset));
				}
				if (identity.state === "not-mach-o" || identity.state === "needs-slice-header") return { kind: "not-mach-o" };
				if (mayBeJvmClass && size > 16777216) {
					const limitIssue = await readFatJvmIdentityLimitIssue(header, identity, readAt);
					if (limitIssue !== null) return {
						kind: "issue",
						status: "unsupported",
						reason: limitIssue
					};
				}
				const overlap = findOverlappingFatSlices(rangeValidSlices(header));
				if (overlap !== null) return {
					kind: "issue",
					status: "malformed",
					reason: fatSliceOverlapReason(overlap)
				};
				return {
					kind: "fat",
					header,
					hidden: await readAppleHiddenArm64Row(readAt, size, header)
				};
			}
			const thin = readMachoHeaderPrefixFacts(head).format;
			if (thin?.littleEndian === true) return {
				kind: "thin",
				size
			};
			if (thin !== null) return {
				kind: "issue",
				status: "unsupported",
				reason: "big-endian Mach-O images are not supported"
			};
			return { kind: "not-mach-o" };
		};
		readSliceMagic = async (readAt, offset) => {
			const bytes = await readAt(offset, 4);
			return readMachoHeaderPrefixFacts(bytes).magic;
		};
		readMachoImage = async (readAt, size) => {
			try {
				const container = await readMachoContainer(readAt, size);
				if (container.kind === "not-mach-o") return { status: "not-mach-o" };
				if (container.kind === "issue") return {
					status: container.status,
					reason: container.reason
				};
				if (container.kind === "thin") return {
					status: "parsed",
					slices: [await readSlice(readAt, 0, size)]
				};
				const { header } = container;
				const rangeIssue = header.rangeIssues.find((issue) => issue !== null);
				if (rangeIssue !== undefined) return {
					status: rangeIssue.category,
					reason: rangeIssue.reason
				};
				const hiddenSlice = await readHiddenSlice(readAt, container.hidden);
				return {
					status: "parsed",
					slices: await readFatSlices(readAt, header.slices),
					...hiddenSlice === null ? {} : { hiddenSlices: [hiddenSlice] }
				};
			} catch (cause) {
				const issue = machoIssueOf(cause);
				if (issue !== undefined) return issue;
				throw cause;
			}
		};
		rangeValidSlices = (header) => header.slices.filter((_, index) => header.rangeIssues[index] === null);
		readAppleHiddenArm64Row = async (readAt, fileSize, header) => {
			if (header.wide) return null;
			const firstOffset = Math.min(...header.slices.map(({ offset }) => offset));
			const end = header.tableEnd + 20;
			if (end > fileSize || end > firstOffset) return null;
			const bytes = await readAt(header.tableEnd, 20);
			if (bytes.byteLength < 20) return {
				status: "malformed",
				reason: "Hidden ARM64 FAT row is truncated"
			};
			const row = readFatSliceDeclarations(bytes, {
				count: 1,
				wide: false,
				littleEndian: header.littleEndian
			});
			if (row.status !== "parsed") return {
				status: "malformed",
				reason: row.reason
			};
			const declaration = {
				...row.slices[0],
				index: header.count
			};
			if (declaration.cpuType !== CPU_TYPE_ARM64) return null;
			const overlap = findOverlappingFatSlices([...rangeValidSlices(header), declaration]);
			return {
				status: "declared",
				declaration,
				rangeIssue: overlap === null ? validateFatSlice(declaration, fileSize, end) : fatSliceOverlapReason(overlap)
			};
		};
		readHiddenSlice = async (readAt, row) => {
			if (row === null) return null;
			if (row.status !== "declared") throw machoIssue(row.status, row.reason);
			const { declaration, rangeIssue } = row;
			if (rangeIssue !== null) throw machoIssue("malformed", rangeIssue);
			const slice = await readSlice(readAt, declaration.offset, declaration.size, {
				fatCpuType: declaration.cpuType,
				fatCpuSubtype: declaration.cpuSubtype,
				alignmentExponent: declaration.alignmentExponent
			});
			const identityIssue = validateFatSliceIdentity(declaration, {
				cpuType: slice.cpu_type,
				cpuSubtype: slice.cpu_subtype
			});
			if (identityIssue !== null) throw machoIssue("malformed", identityIssue);
			return {
				...slice,
				hidden: true
			};
		};
		readFatSlices = async (readAt, declarations) => {
			const slices = [];
			let unsupported;
			for (const declaration of declarations) {
				const { offset, size: length, cpuType, cpuSubtype } = declaration;
				let slice;
				try {
					slice = await readSlice(readAt, offset, length, {
						fatCpuType: cpuType,
						fatCpuSubtype: cpuSubtype,
						alignmentExponent: declaration.alignmentExponent
					});
				} catch (cause) {
					const issue = machoIssueOf(cause);
					if (issue?.status !== "unsupported") throw cause;
					unsupported ??= issue;
					continue;
				}
				const identityIssue = validateFatSliceIdentity(declaration, {
					cpuType: slice.cpu_type,
					cpuSubtype: slice.cpu_subtype
				});
				if (identityIssue !== null) throw machoIssue("malformed", identityIssue);
				slices.push(slice);
			}
			if (unsupported !== undefined) throw machoIssue(unsupported.status, unsupported.reason);
			return slices;
		};
		readSliceCommandTable = async (readAt, base, length) => {
			const headerBytes = await readAt(base, 28);
			const parsed = readMachoHeaderDeclarations(headerBytes, length);
			if (!parsed.ok) return failed("malformed", "Mach-O header is truncated", null);
			if (parsed.value === null) return failed("malformed", `slice at offset ${base} has no Mach-O header`, null);
			if (!parsed.value.littleEndian) return failed("unsupported", "big-endian Mach-O slices are not supported", null);
			const { wide, headerSize, commandCount, commandBytes, fileType, flags, identity } = parsed.value;
			const header = {
				wide,
				headerSize,
				cpuType: identity.cpuType,
				cpuSubtype: identity.cpuSubtype,
				fileType,
				flags,
				commandCount,
				commandBytes
			};
			const issue = machoCommandTableIssue(parsed.value, length);
			if (issue !== null) return failed("malformed", issue.kind === "extent" ? "load commands extend beyond the Mach-O slice" : issue.message, header);
			if (header.commandBytes > 16777216) return failed("unsupported", `load commands occupy ${header.commandBytes} bytes, above the ${MAX_LOAD_COMMAND_BYTES}-byte limit`, header);
			const bytes = await readAt(base + header.headerSize, header.commandBytes);
			if (bytes.byteLength < header.commandBytes) return failed("malformed", "load commands is truncated", header);
			return {
				status: "read",
				header,
				bytes
			};
		};
		failed = (status, reason, header) => ({
			status,
			reason,
			header
		});
		frameLoadCommands = ({ header, bytes }, visit) => {
			const cursor = new MachoLoadCommandCursor({
				wide: header.wide,
				littleEndian: true,
				commandCount: header.commandCount,
				commandBytes: bytes.byteLength
			});
			while (cursor.nextOffset !== null) {
				const frame = cursor.read(bytes.subarray(cursor.nextOffset, cursor.nextOffset + 8));
				if (!frame.ok) return {
					status: "malformed",
					reason: frame.error
				};
				const { index, command, offset, size } = frame.value;
				visit({
					index,
					command,
					offset,
					body: bytes.subarray(offset, offset + size)
				});
			}
			const complete = cursor.finish();
			if (!complete.ok) return {
				status: "malformed",
				reason: complete.error
			};
			return { status: "framed" };
		};
		readSlice = async (readAt, base, length, fat = null) => {
			const table = await readSliceCommandTable(readAt, base, length);
			if (table.status !== "read") throw machoIssue(table.status, table.reason);
			const { header } = table;
			const slice = {
				architecture: machoArchitectureName(header.cpuType, header.cpuSubtype),
				slice_offset: base,
				slice_size: length,
				cpu_type: header.cpuType,
				cpu_subtype: header.cpuSubtype,
				fat_cpu_type: fat?.fatCpuType ?? null,
				fat_cpu_subtype: fat?.fatCpuSubtype ?? null,
				fat_alignment_exponent: fat?.alignmentExponent ?? null,
				file_type: fileTypeName(header.fileType),
				file_type_code: header.fileType,
				platform: null,
				platforms: [],
				install_name: null,
				dependencies: [],
				rpaths: [],
				dyld_environment: [],
				code_signature_present: false
			};
			const dependencies = [];
			const segments = [];
			let unreadableSegment;
			let lazyInfoCount = 0;
			const framed = frameLoadCommands(table, ({ command, body, index }) => {
				if (command === LC.SEGMENT || command === LC.SEGMENT_64) {
					const span = readSegmentSpan(body, command === LC.SEGMENT_64);
					if (span === undefined) unreadableSegment ??= index;
					else segments.push(span);
				}
				if (command === LC.LAZY_LOAD_DYLIB_INFO) {
					lazyInfoCount += 1;
					if (lazyInfoCount > MAX_LAZY_INFO_DEPENDENCIES) throw machoIssue("unsupported", `LC_LAZY_LOAD_DYLIB_INFO commands exceed the ${MAX_LAZY_INFO_DEPENDENCIES}-dependency limit`);
				}
				const decoded = decodeCommand(command, body, index, slice);
				if (decoded !== undefined) dependencies.push(decoded);
			});
			if (framed.status !== "framed") throw machoIssue(framed.status, framed.reason);
			if (lazyInfoCount > 0 && unreadableSegment !== undefined) throw machoIssue("malformed", `load command ${unreadableSegment} is too short to establish the slice VM range for LC_LAZY_LOAD_DYLIB_INFO`);
			await appendDependencies(slice, dependencies, readAt, base, length, maximumVmOffset(segments));
			const distinctPlatforms = [...new Set(slice.platforms)];
			slice.platform = distinctPlatforms.length === 1 ? distinctPlatforms[0] ?? null : null;
			return slice;
		};
		maximumVmOffset = (segments) => {
			let textVmAddr = 0n;
			for (const segment of segments) {
				if (segment.name === "__TEXT") {
					textVmAddr = segment.vmaddr;
					break;
				}
			}
			let max = LAZY_INFO_MIN_VM_OFFSET;
			for (const segment of segments) {
				if (segment.name === "__LINKEDIT") continue;
				const end = segment.vmaddr - textVmAddr + segment.vmsize;
				if (end > max) max = end;
			}
			return max;
		};
		readSegmentSpan = (body, wide) => {
			const parsed = readMachoSegmentHeader(body, wide, true);
			if (!parsed.ok) return undefined;
			const { nameBytes, address: vmaddr, memorySize: vmsize } = parsed.value;
			const end = nameBytes.indexOf(0);
			return {
				name: new TextDecoder("utf-8", {
					fatal: false,
					ignoreBOM: true
				}).decode(end < 0 ? nameBytes : nameBytes.subarray(0, end)),
				vmaddr,
				vmsize
			};
		};
		containedPayload = (reads, fileOffset, size, work) => {
			for (const read of reads) {
				work.rangeChecks += 1;
				if (work.rangeChecks > 16777216) throw machoIssue("unsupported", `LC_LAZY_LOAD_DYLIB_INFO payload range lookup exceeds the ${MAX_LOAD_COMMAND_BYTES}-check limit`);
				const start = fileOffset - read.fileOffset;
				if (start >= 0 && Number.isSafeInteger(start) && start + size <= read.bytes.byteLength) return read.bytes.subarray(start, start + size);
			}
			return undefined;
		};
		appendDependencies = async (slice, dependencies, readAt, base, length, maxVmOffset) => {
			const work = {
				dependencies: new Map(),
				reads: [],
				strings: new Map(),
				payloadBytes: 0,
				stringBytes: 0,
				symbolReferences: 0,
				rangeChecks: 0
			};
			for (const dependency of dependencies) {
				if (dependency.kind === "parsed") {
					slice.dependencies.push(dependency.value);
					continue;
				}
				const key = `${dependency.dataOffset}:${dependency.dataSize}`;
				const cached = work.dependencies.get(key);
				if (cached !== undefined) {
					slice.dependencies.push(cached);
					continue;
				}
				const value = await readLazyLoadDylibInfo(readAt, base, length, dependency, maxVmOffset, work);
				work.dependencies.set(key, value);
				slice.dependencies.push(value);
			}
		};
		decodeCommand = (command, body, index, slice) => {
			if (command === LC.ID_DYLIB) {
				slice.install_name = commandString(body, 24, index);
				return;
			}
			if (command === LC.RPATH) {
				slice.rpaths.push(commandString(body, 12, index));
				return;
			}
			if (command === LC.DYLD_ENVIRONMENT) {
				slice.dyld_environment.push(commandString(body, 12, index));
				return;
			}
			if (command === LC.CODE_SIGNATURE) {
				if (readMachoLinkeditDataCommand(LC.CODE_SIGNATURE, body, true) === null) throw machoIssue("malformed", `load command ${index} is too short for LC_CODE_SIGNATURE`);
				slice.code_signature_present = true;
				return;
			}
			if (command === LC.BUILD_VERSION) {
				if (body.byteLength < 24) throw machoIssue("malformed", `load command ${index} is too short for LC_BUILD_VERSION`);
				const view = viewOf(body);
				const toolCount = view.getUint32(20, true);
				if (toolCount > Math.floor((body.byteLength - 24) / 8)) throw machoIssue("malformed", `load command ${index} LC_BUILD_VERSION tool records exceed cmdsize`);
				const platform = view.getUint32(8, true);
				slice.platforms.push(platform);
				return;
			}
			const versionMin = classifyMachoVersionMinCommand(command, body.byteLength);
			if (versionMin !== null) {
				if (versionMin.kind !== "exact") throw machoIssue("malformed", versionMin.kind === "truncated" ? `load command ${index} is too short for a version-min command` : `load command ${index} is too long for a version-min command`);
				slice.platforms.push(legacyMachoPlatform(versionMin.platform, slice.cpu_type));
				return;
			}
			if (command === LC.LAZY_LOAD_DYLIB_INFO) return decodeLazyLoadDylibInfoCommand(body, index);
			const name = machoDependencyCommand(command);
			if (name !== null) return {
				kind: "parsed",
				value: decodeDependency(name, command, body, index)
			};
			return undefined;
		};
		decodeLazyLoadDylibInfoCommand = (body, index) => {
			const data = readMachoLinkeditDataCommand(LC.LAZY_LOAD_DYLIB_INFO, body, true);
			if (data === null) throw machoIssue("malformed", `load command ${index} is too short for LC_LAZY_LOAD_DYLIB_INFO`);
			const { dataOffset, dataSize } = data;
			if (dataSize < LAZY_INFO_HEADER_BYTES) throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO payload is shorter than its 24-byte header`);
			if (dataSize > 16777216) throw machoIssue("unsupported", `LC_LAZY_LOAD_DYLIB_INFO payload occupies ${dataSize} bytes, above the ${MAX_LOAD_COMMAND_BYTES}-byte limit`);
			return {
				kind: "lazy-info",
				index,
				dataOffset,
				dataSize
			};
		};
		readLazyPayloadBytes = async (readAt, fileOffset, size, index, work) => {
			const covered = containedPayload(work.reads, fileOffset, size, work);
			if (covered !== undefined) return covered;
			work.payloadBytes += size;
			if (work.payloadBytes > 16777216) throw machoIssue("unsupported", `LC_LAZY_LOAD_DYLIB_INFO payloads occupy ${work.payloadBytes} bytes, above the ${MAX_LOAD_COMMAND_BYTES}-byte aggregate limit`);
			const payload = await readExact(readAt, fileOffset, size, `load command ${index} LC_LAZY_LOAD_DYLIB_INFO payload`);
			work.reads.push({
				fileOffset,
				bytes: payload
			});
			return payload;
		};
		readLazyLoadDylibInfo = async (readAt, base, length, command, maxVmOffset, work) => {
			if (command.dataOffset > length || command.dataSize > length - command.dataOffset) throw machoIssue("malformed", `load command ${command.index} LC_LAZY_LOAD_DYLIB_INFO payload extends beyond the Mach-O slice`);
			const fileOffset = base + command.dataOffset;
			if (!Number.isSafeInteger(fileOffset)) throw machoIssue("malformed", `load command ${command.index} LC_LAZY_LOAD_DYLIB_INFO payload offset is not a safe integer`);
			const payload = await readLazyPayloadBytes(readAt, fileOffset, command.dataSize, command.index, work);
			return decodeLazyLoadDylibInfoPayload(payload, command.index, fileOffset, maxVmOffset, work);
		};
		decodeLazyLoadDylibInfoPayload = (payload, index, fileOffset, maxVmOffset, work) => {
			const reader = machoWordReader(payload, true);
			const pathOffset = reader.u32(0);
			const flagImageOffset = reader.u32(4);
			const flags = reader.u16(8);
			const chainStartImageOffset = reader.u32(12);
			const symbolCount = reader.u32(16);
			const symbolArrayOffset = reader.u32(20);
			if (BigInt(flagImageOffset) > maxVmOffset) throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO flag image offset 0x${flagImageOffset.toString(16)} is beyond the slice VM range 0x${maxVmOffset.toString(16)}`);
			if (BigInt(chainStartImageOffset) > maxVmOffset) throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO chain start image offset 0x${chainStartImageOffset.toString(16)} is beyond the slice VM range 0x${maxVmOffset.toString(16)}`);
			if ((flags & ~LAZY_INFO_MAY_BE_MISSING) !== 0) throw machoIssue("unsupported", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO flags 0x${flags.toString(16)} include unrecognized bits`);
			if (symbolArrayOffset > payload.byteLength || symbolCount > (payload.byteLength - symbolArrayOffset) / 4) throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO symbol table extends beyond the payload`);
			const installName = payloadString(payload, pathOffset, fileOffset, index, "load path", work, true);
			const symbolReferences = work.symbolReferences + symbolCount;
			if (symbolReferences > MAX_LAZY_INFO_SYMBOL_REFERENCES) throw machoIssue("unsupported", `LC_LAZY_LOAD_DYLIB_INFO symbol validation exceeds the ${MAX_LAZY_INFO_SYMBOL_REFERENCES}-reference limit`);
			work.symbolReferences = symbolReferences;
			for (let symbol = 0; symbol < symbolCount; symbol += 1) {
				const offset = reader.u32(symbolArrayOffset + symbol * 4);
				payloadString(payload, offset, fileOffset, index, `symbol ${symbol}`, work, false);
			}
			return {
				command: "LC_LAZY_LOAD_DYLIB_INFO",
				encoding: "lazy_load_dylib_info",
				install_name: installName,
				weak: (flags & LAZY_INFO_MAY_BE_MISSING) !== 0,
				upward: false,
				reexport: false,
				delayed_init: false,
				current_version: null,
				compatibility_version: null
			};
		};
		chargeLazyString = (work, examined) => {
			const occupied = work.stringBytes + examined;
			if (occupied > 16777216) throw machoIssue("unsupported", `LC_LAZY_LOAD_DYLIB_INFO string validation occupies ${occupied} bytes, above the ${MAX_LOAD_COMMAND_BYTES}-byte limit`);
			work.stringBytes = occupied;
		};
		payloadString = (payload, offset, fileOffset, index, label, work, excludeFinalByte) => {
			if (offset < LAZY_INFO_HEADER_BYTES) throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO ${label} offset ${offset} is inside the payload header`);
			if (offset >= payload.byteLength) throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO ${label} offset ${offset} is outside the payload`);
			const absolute = Number.isSafeInteger(fileOffset + offset) ? fileOffset + offset : undefined;
			const cached = absolute === undefined ? undefined : work.strings.get(absolute);
			const terminatorLimit = excludeFinalByte ? payload.byteLength - 1 : payload.byteLength;
			if (cached !== undefined && absolute !== undefined) {
				const end = cached.end - fileOffset;
				if (end < offset || end >= terminatorLimit) throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO ${label} is unterminated`);
				chargeLazyString(work, cached.end - absolute + 1);
				return cached.text;
			}
			if (offset >= terminatorLimit) throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO ${label} is unterminated`);
			const remaining = MAX_LOAD_COMMAND_BYTES - work.stringBytes;
			const windowEnd = Math.min(terminatorLimit, offset + remaining);
			const end = payload.subarray(0, windowEnd).indexOf(0, offset);
			if (end < 0) {
				if (windowEnd < terminatorLimit) throw machoIssue("unsupported", `LC_LAZY_LOAD_DYLIB_INFO string validation occupies ${work.stringBytes + (windowEnd - offset) + 1} bytes, above the ${MAX_LOAD_COMMAND_BYTES}-byte limit`);
				throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO ${label} is unterminated`);
			}
			chargeLazyString(work, end - offset + 1);
			let text;
			try {
				text = strictUtf8Decoder("preserve").decode(payload.subarray(offset, end));
			} catch {
				throw machoIssue("malformed", `load command ${index} LC_LAZY_LOAD_DYLIB_INFO ${label} is not UTF-8`);
			}
			if (absolute !== undefined && Number.isSafeInteger(fileOffset + end)) work.strings.set(absolute, {
				text,
				end: fileOffset + end
			});
			return text;
		};
		decodeDependency = (command, code, body, index) => {
			const parsed = readMachoDylibCommandFacts(body, code, true);
			if (!parsed.ok) {
				if (parsed.error._tag === "InvalidMachoDylibCommand") throw machoIssue("malformed", `load command ${index} is too short for a dylib command`);
				return throwCommandStringIssue(parsed.error, index);
			}
			const facts = parsed.value;
			const flags = facts.flags ?? 0;
			return {
				command,
				encoding: facts.encoding,
				install_name: decodeCommandString(facts.nameBytes, index),
				weak: command === "LC_LOAD_WEAK_DYLIB" || (flags & DYLIB_USE_WEAK_LINK) !== 0,
				upward: command === "LC_LOAD_UPWARD_DYLIB" || (flags & DYLIB_USE_UPWARD) !== 0,
				reexport: command === "LC_REEXPORT_DYLIB" || (flags & DYLIB_USE_REEXPORT) !== 0,
				delayed_init: (flags & DYLIB_USE_DELAYED_INIT) !== 0,
				current_version: version(facts.currentVersion),
				compatibility_version: version(facts.compatibilityVersion)
			};
		};
		commandString = (body, minimumOffset, index) => {
			const parsed = readMachoCommandStringBytes(body, minimumOffset, true);
			if (!parsed.ok) return throwCommandStringIssue(parsed.error, index);
			return decodeCommandString(parsed.value.bytes, index);
		};
		throwCommandStringIssue = (failure, index) => {
			const reason = failure.reason === "truncated-offset" ? `load command ${index} is too short to hold a string offset` : failure.reason === "invalid-offset" ? `load command ${index} has string offset ${failure.offset} outside the command` : `load command ${index} has an unterminated string`;
			throw machoIssue("malformed", reason);
		};
		decodeCommandString = (bytes, index) => {
			try {
				return strictUtf8Decoder("preserve").decode(bytes);
			} catch {
				throw machoIssue("malformed", `load command ${index} has a string that is not UTF-8`);
			}
		};
		readExact = async (readAt, offset, length, label) => {
			const bytes = await readAt(offset, length);
			if (bytes.byteLength < length) throw machoIssue("malformed", `${label} is truncated`);
			return bytes;
		};
		fileTypeName = (fileType) => fileType === 2 ? "execute" : fileType === 6 ? "dylib" : fileType === 8 ? "bundle" : "other";
		version = (value) => `${value >>> 16}.${value >>> 8 & 255}.${value & 255}`;
		viewOf = (bytes) => new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	})))();
}

//#endregion
export { readFatHeaderPrefix as $, init_machoLoadCommands as A, LC as B, machoDependencyCommand as C, MachoLoadCommandCursor as D, readMachoDylibFields as E, readMachoHeaderDeclarations as F, classifyFatContainerIdentity as G, init_machoLoadCommandCodes as H, readMachoLinkeditDataCommand as I, hasMachoMagic as J, fatSliceOverlapReason as K, readMachoLoadCommandDeclarations as L, machoFixedWordFieldNames as M, machoWordReader as N, admitMachoSymtabRanges as O, readMachoDyldInfoCommand as P, readFatContainerTable as Q, readMachoLoadCommandTableHeader as R, init_machoDylibCommand as S, readMachoDylibCommandFacts as T, machoLoadCommandName as U, LC_REQ_DYLD as V, classifyFatContainerEvidence as W, machoContainerKindFromMagic as X, init_machoContainer as Y, readFatContainerHeader as Z, init_machoSectionHeader as _, readMachoImage as a, MAX_JVM_CLASS_IDENTITY_BYTES as at, machoSectionHeaderSize as b, init_machoPlatform as c, isJvmClassFile as ct, admitMachoSegmentMapping as d, readFatJvmIdentityLimitIssue as et, init_machoSegmentHeader as f, admitMachoSectionPayload as g, readMachoSegmentHeader as h, readMachoContainer as i, validateFatSliceIdentity as it, machoCommandTableIssue as j, decodeMachoFixedWordFields as k, legacyMachoPlatform as l, machoSegmentSectionTableFits as m, frameLoadCommands as n, readMachoHeaderPrefixFacts as nt, readSliceCommandTable as o, hasJvmClassHeader as ot, machoSegmentHeaderSize as p, findOverlappingFatSlices as q, init_machoLoadCommandReader as r, validateFatSlice as rt, classifyMachoVersionMinCommand as s, init_jvmClassFile as st, MAX_LOAD_COMMAND_BYTES as t, readFatSliceDeclarations as tt, admitMachoSegmentCommand as u, isMachoZeroFillSection as v, machoDylibFieldsSize as w, readMachoSectionHeader as x, machoSectionBacking as y, readMachoSymtabCommand as z };