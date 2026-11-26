import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, init_parseFailure, malformedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_strictUtf8, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { init_machoCpuIdentity, machoArchitectureName } from "./machoCpuIdentity-B0Mlm3Ly.js";
import { LC, MAX_JVM_CLASS_IDENTITY_BYTES, MachoLoadCommandCursor, classifyFatContainerIdentity, fatSliceOverlapReason, findOverlappingFatSlices, hasJvmClassHeader, hasMachoMagic, init_jvmClassFile, init_machoContainer, init_machoLoadCommandCodes, init_machoLoadCommands, machoCommandTableIssue, machoWordReader, readFatContainerHeader, readFatJvmIdentityLimitIssue, readFatSliceDeclarations, readMachoCommandStringBytes, readMachoHeaderDeclarations, readMachoHeaderPrefixFacts, readMachoLinkeditDataCommand, validateFatSlice, validateFatSliceIdentity } from "./machoLoadCommands-DCQgk7s-.js";
import { init_machoSegmentHeader, readMachoSegmentHeader } from "./machoSegmentHeader-Bvz3C4rO.js";
import { init_machoDylibCommand, machoDependencyCommand, readMachoDylibCommandFacts } from "./machoDylibCommand-C6HbGdA1.js";

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
export { MAX_LOAD_COMMAND_BYTES, classifyMachoVersionMinCommand, frameLoadCommands, init_machoLoadCommandReader, init_machoPlatform, legacyMachoPlatform, readMachoContainer, readMachoImage, readSliceCommandTable };