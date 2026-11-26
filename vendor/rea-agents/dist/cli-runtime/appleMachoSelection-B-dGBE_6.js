import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage, init_parseFailure, isHostLimitFailure, malformedInput, truncatedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { BinaryFormatFailure, BinaryReader, createFileMappingIndex, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { LC, MachoLoadCommandCursor, init_machoLoadCommandCodes, init_machoLoadCommands, machoCommandTableIssue, readMachoDyldInfoCommand, readMachoLinkeditDataCommand, readMachoLoadCommandDeclarations } from "./machoLoadCommands-DCQgk7s-.js";
import { admitMachoSegmentMapping, init_machoSectionHeader, init_machoSegmentHeader, machoSectionHeaderSize, machoSegmentSectionTableFits, readMachoSectionHeader, readMachoSegmentHeader } from "./machoSegmentHeader-Bvz3C4rO.js";
import { decodeMachoFixedName, decodeMachoName, init_appleMachoNames } from "./appleMachoNames-ncedG8hm.js";
import { init_machoDylibCommand, machoDependencyCommand, readMachoDylibCommandFacts } from "./machoDylibCommand-C6HbGdA1.js";
import { init_leb128, readLeb128 } from "./leb128-QVew1RrX.js";

//#region dist/domain/apple/appleDispatchDecodeFacts.js
var issue;
function init_appleDispatchDecodeFacts() {
	return (init_appleDispatchDecodeFacts = __esmMin((() => {
		issue = (facet, code, message, location) => ({
			facet,
			code,
			message,
			...location === undefined ? {} : { location }
		});
	})))();
}

//#endregion
//#region dist/domain/apple/appleMachoFixups.js
/** Interpret one bounded LC_DYLD_INFO rebase stream into file-backed membership. */
function* readRebaseStreamSteps(image, range, index) {
	const { bytes, segments } = image;
	const end = range.offset + range.size;
	if (!Number.isSafeInteger(range.offset) || !Number.isSafeInteger(range.size) || range.offset < 0 || range.size < 0 || !Number.isSafeInteger(end) || end > bytes.length) throw malformedInput("macho", "Rebase opcodes exceed the target");
	const cursor = { at: range.offset };
	let segmentIndex = -1;
	let segmentOffset = 0n;
	let type = 0;
	let visits = 0;
	const advance = (delta) => {
		segmentOffset = segmentOffset + delta & 18446744073709551615n;
	};
	function* addRun(count, skip) {
		if (count === 0n) return;
		if (type === 0 || type > 3) throw unsupportedInput("macho", `Unsupported legacy rebase type ${type}`);
		const segment = segments[segmentIndex];
		if (segment === undefined) throw malformedInput("macho", "Rebase location has no selected segment");
		const stride = REBASE_POINTER_SIZE + skip;
		const lastOffset = segmentOffset + (count - 1n) * stride;
		if (segmentOffset < 0n || lastOffset + REBASE_POINTER_SIZE > segment.size) throw malformedInput("macho", "Rebase expansion leaves its file-backed segment");
		if (!Number.isSafeInteger(segment.offset) || segment.offset < 0) throw malformedInput("macho", "Rebase segment file offset is invalid");
		const firstFileOffset = BigInt(segment.offset) + segmentOffset;
		if (firstFileOffset < 0n || lastOffset + BigInt(segment.offset) + REBASE_POINTER_SIZE > BigInt(bytes.length)) throw malformedInput("macho", "Rebase location exceeds the source file");
		const fact = type === 1 ? REBASE_POINTER : REBASE_NON_POINTER;
		const admitted = count < BigInt(index.workRemaining) ? count : BigInt(index.workRemaining);
		for (let indexOffset = 0n; indexOffset < admitted; indexOffset++) {
			const fileOffset = Number(firstFileOffset + indexOffset * stride);
			markRebaseLocation(index, fileOffset, fact, bytes.length);
			if (++visits % 4096 === 0) yield;
		}
		index.workRemaining -= Number(admitted);
		if (admitted < count) throw malformedInput("macho", "Legacy rebase opcode and expansion work exceeded the source-derived budget");
		advance(count * stride);
	}
	let opcodes = 0;
	while (cursor.at < end) {
		if (++opcodes % 4096 === 0) yield;
		if (index.workRemaining === 0) throw malformedInput("macho", "Legacy rebase parsing exceeded the source-derived work budget");
		index.workRemaining--;
		const byte = bytes[cursor.at++] ?? 0;
		const immediate = byte & 15;
		switch (byte & 240) {
			case 0:
				if (end - cursor.at > 15) throw malformedInput("macho", "Rebase opcodes terminated before the stream end");
				cursor.at = end;
				break;
			case 16:
				type = immediate;
				break;
			case 32: {
				if (segments[immediate] === undefined) throw malformedInput("macho", "Rebase segment index is out of range");
				segmentIndex = immediate;
				segmentOffset = uleb(bytes, cursor, end, "rebase", index);
				break;
			}
			case 48:
				advance(uleb(bytes, cursor, end, "rebase", index));
				break;
			case 64:
				advance(BigInt(immediate) * REBASE_POINTER_SIZE);
				break;
			case 80:
				yield* addRun(BigInt(immediate), 0n);
				break;
			case 96: {
				const count = uleb(bytes, cursor, end, "rebase", index);
				yield* addRun(count, 0n);
				break;
			}
			case 112: {
				yield* addRun(1n, 0n);
				advance(uleb(bytes, cursor, end, "rebase", index));
				break;
			}
			case 128: {
				const count = uleb(bytes, cursor, end, "rebase", index);
				const skip = uleb(bytes, cursor, end, "rebase", index);
				yield* addRun(count, skip);
				break;
			}
			default: throw unsupportedInput("macho", `Unsupported rebase opcode 0x${byte.toString(16)}`);
		}
	}
}
function* parseLegacyRebasesSteps(image, streams) {
	const workBudget = Math.min(Number.MAX_SAFE_INTEGER, image.bytes.length * 2);
	const index = {
		bitmap: null,
		workRemaining: workBudget
	};
	const failures = [];
	let decoded = 0;
	let unreadBytes = 0;
	for (const stream of streams) {
		try {
			yield* readRebaseStreamSteps(image, stream, index);
			decoded++;
		} catch (cause) {
			if (isHostLimitFailure(cause)) throw cause;
			failures.push(`rebase opcodes: ${errorMessage(cause)}`);
			unreadBytes += stream.size;
		}
	}
	return {
		membership: index.bitmap,
		failures,
		issues: failures.map((message) => issue("pointer_fixups", "rebase_stream_decode_failed", message)),
		examined: streams.length,
		decoded,
		unreadBytes,
		complete: failures.length === 0
	};
}
/** Interpret one `LC_DYLD_INFO` bind opcode stream into address -> import. */
function* readBindStreamSteps(image, range, binds) {
	const { bytes } = image;
	const end = range.offset + range.size;
	if (end > bytes.length) throw malformedInput("macho", "Bind opcodes exceed the target");
	const cursor = { at: range.offset };
	const state = {
		type: range.stream === "lazy" ? 1 : 0,
		ordinal: 0,
		ordinalFailure: null,
		segmentIndex: -1,
		symbol: { symbol: "" },
		weak: false,
		addend: 0n,
		address: 0n
	};
	const preflightRun = (count, skip) => {
		if (count === 0n) return;
		if (state.type < 1 || state.type > 3) throw unsupportedInput("macho", `Unsupported legacy bind type ${state.type}`);
		const segment = image.segments[state.segmentIndex];
		if (segment === undefined) throw malformedInput("macho", "Bind location has no selected segment");
		const stride = 8n + skip;
		const width = state.type === 1 ? 8n : 4n;
		const end = state.address + (count - 1n) * stride + width;
		if (state.address < segment.address || end > segment.address + segment.size) throw malformedInput("macho", "Bind expansion leaves its file-backed segment");
	};
	const bind = (count, skip) => {
		if (count === 0n) return;
		preflightRun(count, skip);
		const stride = 8n + skip;
		const width = state.type === 1 ? 8 : 4;
		let binding;
		try {
			if (state.ordinalFailure !== null) throw malformedInput("macho", state.ordinalFailure);
			const resolvedLibrary = libraryFacts(state.ordinal, image.dylibs);
			const imported = {
				...state.symbol,
				binding_source: range.stream,
				library_ordinal: state.ordinal,
				...range.stream === "weak" ? { library: null } : resolvedLibrary,
				weak: state.weak,
				addend: state.addend
			};
			const decoded = state.type === 1 ? resolvedBind(imported, 0n) : {
				kind: "unsupported",
				reason: "Legacy non-pointer bind is not a 64-bit metadata pointer",
				binding: imported
			};
			binding = decoded.kind === "bind" ? {
				kind: "bind",
				value: decoded
			} : decoded;
		} catch (cause) {
			if (isHostLimitFailure(cause)) throw cause;
			binding = {
				kind: "unsupported",
				reason: errorMessage(cause)
			};
		}
		const previous = binds.at(-1);
		const sameBinding = (left, right) => left.kind === "unsupported" && right.kind === "unsupported" ? left.reason === right.reason && (left.binding === undefined || right.binding === undefined ? left.binding === right.binding : sameImport(left.binding, right.binding)) : left.kind === "bind" && right.kind === "bind" ? sameImport(left.value, right.value) : false;
		if (previous !== undefined && previous.type === state.type && previous.stride === stride && previous.start + previous.count * stride === state.address && sameBinding(previous.binding, binding)) {
			previous.count += count;
		} else {
			binds.push({
				start: state.address,
				count,
				stride,
				type: state.type,
				width,
				binding
			});
		}
		state.address = state.address + count * stride & 18446744073709551615n;
	};
	let opcodes = 0;
	while (cursor.at < end) {
		if (++opcodes % 4096 === 0) yield;
		const byte = bytes[cursor.at++] ?? 0;
		if (setBindRegister(image, {
			cursor,
			end
		}, state, byte)) continue;
		switch (byte & 240) {
			case 0:
				if (range.stream !== "lazy") return;
				break;
			case 144:
				bind(1n, 0n);
				break;
			case 160:
				bind(1n, uleb(bytes, cursor, end));
				break;
			case 176:
				bind(1n, BigInt(byte & 15) * 8n);
				break;
			case 192: {
				if (range.stream === "lazy") throw malformedInput("macho", "Lazy bind streams do not support repeated bind opcodes");
				const count = uleb(bytes, cursor, end);
				const skip = uleb(bytes, cursor, end);
				bind(count, skip);
				break;
			}
			default: throw unsupportedInput("macho", `Unsupported bind opcode 0x${byte.toString(16)}`);
		}
	}
}
/** Visit runs with a bind start in the inclusive interval, without expanding runs. */
function* bindRunsIn(index, low, high) {
	let left = 0;
	let right = index.runs.length;
	while (left < right) {
		const middle = left + right >>> 1;
		if (index.runs[middle].start <= high) left = middle + 1;
		else right = middle;
	}
	let candidates = 0;
	for (let at = left - 1; at >= 0 && index.prefixEnd[at] >= low; at -= 1) {
		if (index.exhausted || index.remaining === 0 || candidates === BIND_QUERY_CANDIDATES) {
			index.exhausted = true;
			return;
		}
		index.remaining--;
		candidates++;
		const run = index.runs[at];
		if (firstBindIn(run, low, high) !== undefined) yield run;
	}
}
function* parseLegacyBindsSteps(image, streams) {
	const runs = [];
	const failures = [];
	let decoded = 0;
	for (const stream of streams) {
		try {
			yield* readBindStreamSteps(image, stream, runs);
			decoded++;
		} catch (cause) {
			if (isHostLimitFailure(cause)) throw cause;
			failures.push(`${stream.stream} bind opcodes: ${errorMessage(cause)}`);
		}
	}
	const complete = failures.length === 0;
	const issues = failures.map((message) => issue("pointer_fixups", "bind_stream_decode_failed", message));
	for (const run of runs) {
		if (run.binding.kind !== "unsupported" || run.binding.binding === undefined) continue;
		issues.push(issue("pointer_fixups", run.type !== 1 ? "non_pointer_bind" : run.binding.binding.symbol === null ? "bind_symbol_text_unavailable" : "bind_library_text_unavailable", run.binding.reason, `0x${run.start.toString(16)}`));
		failures.push(run.binding.reason);
	}
	return {
		index: indexBindRuns(runs, image.bytes.length),
		failures,
		issues,
		examined: streams.length,
		decoded,
		complete
	};
}
/** Build pointer decoding for one slice from its fixup load commands. */
function* parsePointerFixupsSteps(bytes, commands, segments, baseAddress) {
	if ((commands.chained !== null || commands.rebases.length > 0 || commands.binds.length > 0) && segments.some(({ declaredAddress }) => declaredAddress !== undefined)) throw unsupportedInput("macho", "Mach-O pointer fixups with leading segment zero-fill are unsupported");
	const image = {
		bytes,
		segments,
		dylibs: commands.dylibs,
		baseAddress
	};
	const rebases = yield* parseLegacyRebasesSteps(image, commands.rebases);
	const binds = yield* parseLegacyBindsSteps(image, commands.binds);
	if (commands.chained !== null) {
		return chainedFixups(image, commands.chained, rebases, binds);
	}
	const applicabilityFailures = [...rebases.failures, ...binds.failures];
	const applicabilityComplete = rebases.complete && binds.complete;
	const rawPointer = (raw) => applicabilityComplete ? {
		kind: "raw",
		target: raw
	} : {
		kind: "unknown",
		raw,
		reason: `LC_DYLD_INFO pointer-fixup applicability was not completely decoded: ${applicabilityFailures.join("; ")}`
	};
	if (commands.binds.length === 0 && commands.rebases.length === 0) return {
		kind: "none",
		formats: [],
		failures: [],
		issues: [],
		examined: 0,
		decoded: 0,
		legacyRebaseStreams: 0,
		legacyBindStreams: 0,
		unreadRebaseBytes: 0,
		hasUnresolvedLegacyBytes: () => false,
		decode: (_address, raw) => rawPointer(raw)
	};
	const failures = [...rebases.failures, ...binds.failures];
	const issues = [...rebases.issues, ...binds.issues];
	return {
		kind: "dyld-info",
		formats: [],
		failures,
		issues,
		examined: binds.examined + rebases.examined,
		decoded: binds.decoded + rebases.decoded,
		legacyRebaseStreams: rebases.examined,
		legacyBindStreams: binds.examined,
		unreadRebaseBytes: rebases.unreadBytes,
		hasUnresolvedLegacyBytes: (address, size) => hasUnresolvedLegacyBytes(segments, rebases, binds, address, size),
		decode(address, raw) {
			const match = resolveLegacyBind(binds.index, address);
			const rebase = resolveLegacyRebase(segments, rebases.membership, address, raw);
			if (match?.kind === "unsupported") return match;
			if (rebase?.kind === "unsupported") return rebase;
			if (rebases.complete && binds.complete && hasPartialLegacyPointerWrite(segments, rebases, binds, address)) return {
				kind: "unsupported",
				reason: binds.index.exhausted ? BIND_QUERY_LIMITATION : "A legacy fixup partially overlaps the pointer slot"
			};
			if (match !== undefined && rebase !== undefined) return {
				kind: "unsupported",
				reason: `Both bind and rebase records target pointer location 0x${address.toString(16)}`
			};
			if (match !== undefined && !rebases.complete) return {
				kind: "unknown",
				raw,
				reason: `Legacy rebase opcodes could overlap this bind location: ${rebases.failures.join("; ")}`
			};
			if (match !== undefined) return match;
			if (rebase !== undefined && !binds.complete) return {
				kind: "unknown",
				raw,
				reason: `Legacy bind opcodes could overlap this rebase location: ${binds.failures.join("; ")}`
			};
			return rebase ?? rawPointer(raw);
		}
	};
}
var POINTER_FORMATS, bits, signed, BIND_QUERY_CANDIDATES, BIND_QUERY_LIMITATION, libraryFacts, symbolName, cString, resolvedBind, sameImport, chainedImportEntry, readImport, decodeChainedPointer, readChainedPage, chainedFixupsHeader, chainedImportNames, hasPartialChainedPointer, chainedFixups, MACHO_ULEB, MACHO_SLEB, consumedEnd, uleb, REBASE_POINTER_SIZE, REBASE_POINTER, REBASE_NON_POINTER, REBASE_CONFLICT, markRebaseLocation, legacyRebaseState, resolveLegacyRebase, sleb, setBindRegister, indexBindRuns, firstBindIn, resolveLegacyBind, hasUnresolvedLegacyBytes, hasPartialLegacyPointerWrite;
function init_appleMachoFixups() {
	return (init_appleMachoFixups = __esmMin((() => {
		init_binaryContainer();
		init_parseFailure();
		init_leb128();
		init_appleDispatchDecodeFacts();
		init_appleMachoNames();
		init_errorMessage();
		POINTER_FORMATS = {
			1: "DYLD_CHAINED_PTR_ARM64E",
			2: "DYLD_CHAINED_PTR_64",
			6: "DYLD_CHAINED_PTR_64_OFFSET",
			9: "DYLD_CHAINED_PTR_ARM64E_USERLAND",
			12: "DYLD_CHAINED_PTR_ARM64E_USERLAND24"
		};
		bits = (value, from, width) => value >> BigInt(from) & (1n << BigInt(width)) - 1n;
		signed = (value, width) => value >= 1n << BigInt(width - 1) ? value - (1n << BigInt(width)) : value;
		BIND_QUERY_CANDIDATES = 4096;
		BIND_QUERY_LIMITATION = "Legacy bind lookup candidate allowance exhausted; pointer applicability is unknown";
		libraryFacts = (ordinal, dylibs) => {
			if (!Number.isSafeInteger(ordinal) || ordinal < -3) throw unsupportedInput("macho", `Unsupported dylib ordinal ${String(ordinal)}`);
			if (ordinal > 0) {
				const name = dylibs[ordinal - 1];
				if (name === undefined) throw malformedInput("macho", `Dylib ordinal ${ordinal} exceeds the ${dylibs.length} declared dependencies`);
				return typeof name === "string" ? { library: name } : {
					library: null,
					library_bytes_base64: name.bytes_base64
				};
			}
			return { library: null };
		};
		symbolName = (bytes) => {
			const name = decodeMachoName(bytes);
			return typeof name === "string" ? { symbol: name } : {
				symbol: null,
				symbol_bytes_base64: name.bytes_base64
			};
		};
		cString = (bytes, offset, end) => {
			const stop = bytes.indexOf(0, offset);
			if (offset < 0 || offset >= end || stop < 0 || stop >= end) throw malformedInput("macho", "Fixup symbol name is outside the symbol pool");
			return symbolName(bytes.subarray(offset, stop));
		};
		resolvedBind = (imported, addend) => imported.symbol === null || imported.library_bytes_base64 !== undefined ? {
			kind: "unsupported",
			reason: imported.symbol === null ? "Fixup symbol bytes cannot be represented losslessly as UTF-8 text" : "Dylib install-name bytes cannot be represented losslessly as UTF-8 text",
			binding: {
				...imported,
				addend: imported.addend + addend
			}
		} : {
			kind: "bind",
			...imported,
			addend: imported.addend + addend
		};
		sameImport = (left, right) => left.symbol === right.symbol && (left.symbol !== null || right.symbol !== null || left.symbol_bytes_base64 === right.symbol_bytes_base64) && left.binding_source === right.binding_source && left.library_ordinal === right.library_ordinal && left.library === right.library && left.library_bytes_base64 === right.library_bytes_base64 && left.weak === right.weak && left.addend === right.addend;
		chainedImportEntry = (reader, base, end, header, index) => {
			const size = header.format === 3 ? 16 : header.format === 2 ? 8 : 4;
			if (header.format < 1 || header.format > 3) throw unsupportedInput("macho", `Unsupported chained import format ${header.format}`);
			if (!Number.isSafeInteger(header.count) || base + header.offset + header.count * size > end) throw malformedInput("macho", "Chained import table exceeds the fixup data");
			if (index < 0 || index >= header.count) throw malformedInput("macho", "Chained import index is outside the table");
			const at = base + header.offset + index * size;
			if (header.format === 3) {
				const word = reader.word(at, 64);
				const encodedOrdinal = Number(bits(word, 0, 16));
				return {
					nameOffset: Number(bits(word, 32, 32)),
					ordinal: encodedOrdinal > 65520 ? encodedOrdinal - 65536 : encodedOrdinal,
					weak: bits(word, 16, 1) === 1n,
					addend: reader.i64(at + 8)
				};
			}
			const word = reader.u32(at);
			const encodedOrdinal = word & 255;
			return {
				nameOffset: word >>> 9,
				ordinal: encodedOrdinal > 240 ? encodedOrdinal - 256 : encodedOrdinal,
				weak: (word >>> 8 & 1) === 1,
				addend: header.format === 2 ? BigInt(reader.i32(at + 4)) : 0n
			};
		};
		readImport = (data, header, index) => {
			const { reader, base, end, dylibs } = data;
			const entry = chainedImportEntry(reader, base, end, header, index);
			return {
				...cString(reader.bytes, base + header.symbols + entry.nameOffset, end),
				binding_source: "chained",
				library_ordinal: entry.ordinal,
				...libraryFacts(entry.ordinal, dylibs),
				weak: entry.weak,
				addend: entry.addend
			};
		};
		decodeChainedPointer = (raw, format, baseAddress, imports) => {
			const bind = (ordinal, addend) => {
				const target = typeof imports === "function" ? imports(Number(ordinal)) : imports[Number(ordinal)];
				if (target === undefined) throw malformedInput("macho", `Chained bind ordinal ${ordinal} has no import`);
				return resolvedBind(target, addend);
			};
			if (format === 2 || format === 6) {
				if (bits(raw, 63, 1) === 1n) return bind(bits(raw, 0, 24), bits(raw, 24, 8));
				const target = bits(raw, 0, 36) | bits(raw, 36, 8) << 56n;
				return {
					kind: "rebase",
					target: format === 6 ? target + baseAddress : target
				};
			}
			if (format === 1 || format === 9 || format === 12) {
				const auth = bits(raw, 63, 1) === 1n;
				if (bits(raw, 62, 1) === 1n) return bind(bits(raw, 0, format === 12 ? 24 : 16), auth ? 0n : signed(bits(raw, 32, 19), 19));
				if (auth) return {
					kind: "rebase",
					target: bits(raw, 0, 32) + baseAddress
				};
				const target = bits(raw, 0, 43) | bits(raw, 43, 8) << 56n;
				return {
					kind: "rebase",
					target: format === 1 ? target : target + baseAddress
				};
			}
			throw unsupportedInput("macho", `Unsupported chained pointer format ${format}`);
		};
		readChainedPage = (reader, source) => {
			let locations = new Uint8Array(0);
			let lastOffset;
			let failure;
			try {
				if ((source.start & 32768) !== 0) throw malformedInput("macho", "Multiple chained starts are not valid for 64-bit pointers");
				if (source.start + 8 > source.size) throw malformedInput("macho", "Chained pointer leaves its file-backed page");
				locations = new Uint8Array(Math.ceil(source.size / 8));
				const generic = source.format === 2 || source.format === 6;
				let at = source.start;
				while (true) {
					locations[at >>> 3] = (locations[at >>> 3] ?? 0) | 1 << (at & 7);
					lastOffset = at;
					const raw = reader.word(source.offset + at, 64);
					const next = Number(bits(raw, 51, generic ? 12 : 11)) * (generic ? 4 : 8);
					if (next === 0) break;
					if (at + next + 8 > source.size) throw malformedInput("macho", "Chained pointer link leaves its file-backed page");
					at += next;
				}
			} catch (cause) {
				if (isHostLimitFailure(cause)) throw cause;
				failure = errorMessage(cause);
			}
			return {
				locations,
				lastOffset,
				failure
			};
		};
		chainedFixupsHeader = (reader, base, size) => {
			const end = base + size;
			if (!Number.isSafeInteger(base) || base < 0 || !Number.isSafeInteger(size) || size < 28 || end > reader.bytes.length) throw malformedInput("macho", "Chained fixup header exceeds the target");
			if (reader.u32(base) !== 0) throw unsupportedInput("macho", "Unsupported chained fixup header version");
			const imports = {
				offset: reader.u32(base + 8),
				symbols: reader.u32(base + 12),
				count: reader.u32(base + 16),
				format: reader.u32(base + 20)
			};
			const importSize = imports.format === 3 ? 16 : imports.format === 2 ? 8 : 4;
			const importTableEnd = base + imports.offset + imports.count * importSize;
			if (imports.format < 1 || imports.format > 3) throw unsupportedInput("macho", `Unsupported chained import format ${imports.format}`);
			if (imports.offset < 28 || imports.symbols < imports.offset || importTableEnd > base + imports.symbols || base + imports.symbols > end) throw malformedInput("macho", "Chained import table exceeds the fixup data");
			if (reader.u32(base + 24) !== 0) throw unsupportedInput("macho", "Compressed chained-fixup symbol names are not supported");
			return {
				startsOffset: reader.u32(base + 4),
				imports
			};
		};
		chainedImportNames = (fixups) => {
			const reader = new BinaryReader(fixups, true, "macho");
			const { imports } = chainedFixupsHeader(reader, 0, fixups.length);
			const names = [];
			for (let index = 0; index < imports.count; index++) {
				const entry = chainedImportEntry(reader, 0, fixups.length, imports, index);
				const { symbol } = cString(fixups, imports.symbols + entry.nameOffset, fixups.length);
				names.push(symbol);
			}
			return names;
		};
		hasPartialChainedPointer = (chain, within, readPage) => {
			let page = -1;
			let facts = null;
			for (let at = Math.max(0, within - 7); at <= within + 7; at++) {
				if (at === within || BigInt(at) >= chain.segment.size) continue;
				const candidatePage = Math.floor(at / chain.pageSize);
				if (candidatePage !== page) {
					page = candidatePage;
					facts = readPage(page);
				}
				const offset = at % chain.pageSize;
				if (((facts?.locations[offset >>> 3] ?? 0) & 1 << (offset & 7)) !== 0) return true;
			}
			return false;
		};
		chainedFixups = (image, range, rebases, binds) => {
			const { bytes, segments, dylibs, baseAddress } = image;
			const reader = new BinaryReader(bytes, true, "macho");
			const base = range.offset;
			const end = range.offset + range.size;
			const { startsOffset, imports: importHeader } = chainedFixupsHeader(reader, base, range.size);
			const imports = (index) => readImport({
				reader,
				base,
				end,
				dylibs
			}, importHeader, index);
			const starts = base + startsOffset;
			const startsEnd = base + importHeader.offset;
			const requireStartsRange = (at, size) => {
				if (at < base + 28 || at > startsEnd - size) throw malformedInput("macho", "Chained starts table exceeds its fixup data");
			};
			requireStartsRange(starts, 4);
			const segmentCount = reader.u32(starts);
			if (segmentCount > segments.length) throw malformedInput("macho", "Chained starts segment count exceeds the Mach-O layout");
			requireStartsRange(starts, 4 + segmentCount * 4);
			const ranges = [];
			const maximumCachedPages = Math.ceil(bytes.length / 4096) + 2 * segmentCount;
			let remainingLocationBytes = Math.ceil(bytes.length / 8);
			const cachedPages = new Map();
			const pageFacts = (chain, page, start) => {
				const pageOffset = page * chain.pageSize;
				const source = {
					offset: chain.segment.offset + pageOffset,
					size: Math.min(chain.pageSize, Number(chain.segment.size) - pageOffset, bytes.length - chain.segment.offset - pageOffset),
					format: chain.format,
					start
				};
				const key = `${source.offset}:${source.size}:${source.format}:${source.start}`;
				const cached = cachedPages.get(key);
				if (cached !== undefined) return cached;
				const retain = cachedPages.size < maximumCachedPages && Math.ceil(Math.max(source.size, 0) / 8) <= remainingLocationBytes;
				const facts = readChainedPage(reader, source);
				if (retain) {
					remainingLocationBytes -= facts.locations.byteLength;
					cachedPages.set(key, facts);
				}
				return facts;
			};
			for (let index = 0; index < segmentCount; index++) {
				const infoOffset = reader.u32(starts + 4 + index * 4);
				if (infoOffset === 0) continue;
				const segment = segments[index];
				if (segment === undefined) throw malformedInput("macho", "Chained fixup segment table is out of range");
				const info = starts + infoOffset;
				requireStartsRange(info, 22);
				const infoSize = reader.u32(info);
				const pageSize = reader.u16(info + 4);
				const pageCount = reader.u16(info + 20);
				if (infoSize < 22 + pageCount * 2) throw malformedInput("macho", "Chained page starts exceed the segment table size");
				requireStartsRange(info, infoSize);
				if (pageSize !== 4096 && pageSize !== 16384) throw malformedInput("macho", "Chained page size must be 4096 or 16384 bytes");
				if (reader.word(info + 8, 64) !== segment.address - baseAddress) throw malformedInput("macho", "Chained segment offset disagrees with its Mach-O layout");
				ranges.push({
					segment,
					format: reader.u16(info + 6),
					pageSize,
					pageCount,
					pageStarts: info + 22
				});
			}
			const formats = [...new Set(ranges.map(({ format }) => POINTER_FORMATS[format] ?? `format-${format}`))];
			const issues = [
				...rebases.issues,
				...binds.issues,
				...ranges.flatMap(({ format, segment }) => POINTER_FORMATS[format] === undefined ? [issue("pointer_fixups", "unsupported_pointer_format", `Unsupported chained pointer format ${format}`, `0x${segment.address.toString(16)}`)] : [])
			];
			const examinedViews = new Map();
			const decodedRanges = new Set();
			for (const [chainIndex, chain] of ranges.entries()) {
				if (POINTER_FORMATS[chain.format] === undefined) continue;
				const view = `${chain.pageStarts}:${chain.segment.offset}:${chain.segment.size}:${chain.segment.address}:${chain.format}:${chain.pageSize}:${chain.pageCount}`;
				const prior = examinedViews.get(view);
				if (prior !== undefined) {
					if (prior) decodedRanges.add(chainIndex);
					continue;
				}
				let complete = true;
				for (let page = 0; page < chain.pageCount; page++) {
					const start = reader.u16(chain.pageStarts + page * 2);
					if (start === 65535) continue;
					const facts = pageFacts(chain, page, start);
					if (facts.failure !== undefined) {
						complete = false;
						issues.push(issue("pointer_fixups", "chained_pointer_walk_failed", facts.failure, `0x${(chain.segment.address + BigInt(page * chain.pageSize)).toString(16)}`));
						break;
					}
				}
				examinedViews.set(view, complete);
				if (complete) decodedRanges.add(chainIndex);
			}
			const failures = issues.map(({ message }) => message);
			const applicabilityFailures = [...rebases.failures, ...binds.failures];
			const applicabilityComplete = rebases.complete && binds.complete;
			const recordPointerFailure = (reason, address, chainIndex) => {
				const location = `0x${address.toString(16)}`;
				if (!issues.some((entry) => entry.code === "chained_pointer_decode_failed" && entry.location === location)) {
					issues.push(issue("pointer_fixups", "chained_pointer_decode_failed", reason, location));
					failures.push(reason);
				}
				decodedRanges.delete(chainIndex);
			};
			return {
				kind: "chained",
				formats,
				failures,
				issues,
				examined: Math.max(ranges.length, 1) + rebases.examined + binds.examined,
				get decoded() {
					return (ranges.length === 0 ? 1 : decodedRanges.size) + rebases.decoded + binds.decoded;
				},
				legacyRebaseStreams: rebases.examined,
				legacyBindStreams: binds.examined,
				unreadRebaseBytes: rebases.unreadBytes,
				hasUnresolvedLegacyBytes: (address, size) => hasUnresolvedLegacyBytes(segments, rebases, binds, address, size),
				decode(address, raw) {
					const rawPointer = () => applicabilityComplete ? {
						kind: "raw",
						target: raw
					} : {
						kind: "unknown",
						raw,
						reason: `LC_DYLD_INFO pointer-fixup applicability was not completely decoded: ${applicabilityFailures.join("; ")}`
					};
					const legacyBind = resolveLegacyBind(binds.index, address);
					const legacyRebase = resolveLegacyRebase(segments, rebases.membership, address, raw);
					if (legacyBind?.kind === "unsupported") return legacyBind;
					if (legacyRebase?.kind === "unsupported") return legacyRebase;
					if (rebases.complete && binds.complete && hasPartialLegacyPointerWrite(segments, rebases, binds, address)) return {
						kind: "unsupported",
						reason: binds.index.exhausted ? BIND_QUERY_LIMITATION : "A legacy fixup partially overlaps the pointer slot"
					};
					if (legacyBind !== undefined && legacyRebase !== undefined) return {
						kind: "unsupported",
						reason: `Both bind and rebase records target pointer location 0x${address.toString(16)}`
					};
					if (legacyBind !== undefined && !rebases.complete) return {
						kind: "unknown",
						raw,
						reason: `Legacy rebase opcodes could overlap this bind location: ${rebases.failures.join("; ")}`
					};
					if (legacyRebase !== undefined && !binds.complete) return {
						kind: "unknown",
						raw,
						reason: `Legacy bind opcodes could overlap this rebase location: ${binds.failures.join("; ")}`
					};
					let queried;
					const queryPageFacts = (chain, page, start) => {
						if (queried?.chain === chain && queried.page === page) return queried.facts;
						const facts = pageFacts(chain, page, start);
						queried = {
							chain,
							page,
							facts
						};
						return facts;
					};
					if (ranges.some((chain) => POINTER_FORMATS[chain.format] !== undefined && address + 8n > chain.segment.address && address < chain.segment.address + chain.segment.size && hasPartialChainedPointer(chain, Number(address - chain.segment.address), (page) => {
						if (page >= chain.pageCount) return null;
						const start = reader.u16(chain.pageStarts + page * 2);
						return start === 65535 ? null : queryPageFacts(chain, page, start);
					}))) return {
						kind: "unsupported",
						reason: "A chained fixup partially overlaps the pointer slot"
					};
					const chainIndex = ranges.findIndex(({ segment }) => address >= segment.address && address < segment.address + segment.size);
					const chain = ranges[chainIndex];
					if (chain === undefined) return legacyBind ?? legacyRebase ?? rawPointer();
					const within = Number(address - chain.segment.address);
					const page = Math.floor(within / chain.pageSize);
					if (page >= chain.pageCount) return legacyBind ?? legacyRebase ?? rawPointer();
					const start = reader.u16(chain.pageStarts + page * 2);
					if (start === 65535) return legacyBind ?? legacyRebase ?? rawPointer();
					if (POINTER_FORMATS[chain.format] === undefined) return {
						kind: "unsupported",
						reason: `Unsupported chained pointer format ${chain.format}`
					};
					try {
						const facts = queryPageFacts(chain, page, start);
						const at = within % chain.pageSize;
						const locations = facts.locations;
						if (((locations[at >>> 3] ?? 0) & 1 << (at & 7)) !== 0) {
							if (legacyBind !== undefined || legacyRebase !== undefined || !applicabilityComplete) {
								if (legacyBind !== undefined || legacyRebase !== undefined) return {
									kind: "unsupported",
									reason: `Both chained and legacy fixup records target pointer location 0x${address.toString(16)}`
								};
								return {
									kind: "unknown",
									raw,
									reason: `Incomplete legacy fixup streams could overlap chained pointer location 0x${address.toString(16)}: ${applicabilityFailures.join("; ")}`
								};
							}
							const decoded = decodeChainedPointer(raw, chain.format, baseAddress, imports);
							if (decoded.kind === "unsupported") recordPointerFailure(decoded.reason, address, chainIndex);
							return decoded;
						}
						if (facts.failure !== undefined && (facts.lastOffset === undefined || at > facts.lastOffset)) throw malformedInput("macho", facts.failure);
						return legacyBind ?? legacyRebase ?? rawPointer();
					} catch (cause) {
						if (isHostLimitFailure(cause)) throw cause;
						const reason = errorMessage(cause);
						recordPointerFailure(reason, address, chainIndex);
						return {
							kind: "unsupported",
							reason
						};
					}
				}
			};
		};
		MACHO_ULEB = {
			signed: false,
			bits: 64,
			padding: true
		};
		MACHO_SLEB = {
			signed: true,
			bits: 64,
			padding: true
		};
		consumedEnd = (read) => "failure" in read ? read.at + (read.failure === "overflow" ? 1 : 0) : read.next;
		uleb = (bytes, cursor, end, stream = "bind", rebaseWork) => {
			const start = cursor.at;
			const bound = rebaseWork === undefined ? end : Math.min(end, start + rebaseWork.workRemaining);
			const read = readLeb128(bytes, start, bound, MACHO_ULEB);
			cursor.at = consumedEnd(read);
			if (rebaseWork !== undefined) {
				rebaseWork.workRemaining -= cursor.at - start;
				if ("failure" in read && read.failure === "truncated" && read.at < end) throw malformedInput("macho", "Legacy rebase parsing exceeded the source-derived work budget");
			}
			if ("failure" in read) throw read.failure === "truncated" ? truncatedInput("macho", `Truncated ${stream} opcode operand`) : malformedInput("macho", `Oversized ${stream} opcode operand`);
			return read.value;
		};
		REBASE_POINTER_SIZE = 8n;
		REBASE_POINTER = 1;
		REBASE_NON_POINTER = 2;
		REBASE_CONFLICT = 3;
		markRebaseLocation = (index, fileOffset, type, fileBytes) => {
			index.bitmap ??= new Uint8Array(Math.ceil(fileBytes / 4));
			const at = Math.floor(fileOffset / 4);
			const shift = fileOffset % 4 * 2;
			const previous = (index.bitmap[at] ?? 0) >> shift & 3;
			const next = previous === 0 || previous === type ? type : REBASE_CONFLICT;
			index.bitmap[at] = (index.bitmap[at] ?? 0) & ~(3 << shift) | next << shift;
		};
		legacyRebaseState = (segments, membership, address) => {
			if (membership === null) return 0;
			let fileOffset;
			for (const segment of segments) {
				const relative = address - segment.address;
				if (relative < 0n || relative + REBASE_POINTER_SIZE > segment.size) continue;
				if (fileOffset !== undefined) return {
					kind: "unsupported",
					reason: `Ambiguous segments map legacy rebase pointer location 0x${address.toString(16)}`
				};
				const mapped = BigInt(segment.offset) + relative;
				if (mapped < 0n || mapped > BigInt(Number.MAX_SAFE_INTEGER)) return {
					kind: "unsupported",
					reason: "Legacy rebase file offset exceeds the safe integer range"
				};
				fileOffset = Number(mapped);
			}
			if (fileOffset === undefined) return 0;
			const at = Math.floor(fileOffset / 4);
			const shift = fileOffset % 4 * 2;
			return (membership[at] ?? 0) >> shift & 3;
		};
		resolveLegacyRebase = (segments, membership, address, raw) => {
			const state = legacyRebaseState(segments, membership, address);
			if (typeof state !== "number") return state;
			if (state === 0) return undefined;
			if (state === REBASE_POINTER) return {
				kind: "rebase",
				target: raw
			};
			return {
				kind: "unsupported",
				reason: state === REBASE_CONFLICT ? `Conflicting legacy rebase kinds target pointer location 0x${address.toString(16)}` : "Legacy non-pointer rebase is not a 64-bit metadata pointer"
			};
		};
		sleb = (bytes, cursor, end) => {
			const read = readLeb128(bytes, cursor.at, end, MACHO_SLEB);
			cursor.at = consumedEnd(read);
			if ("failure" in read) throw read.failure === "truncated" ? truncatedInput("macho", "Truncated bind opcode operand") : malformedInput("macho", "Oversized bind opcode operand");
			return read.value;
		};
		setBindRegister = (image, stream, state, byte) => {
			const { bytes } = image;
			const { cursor, end } = stream;
			const immediate = byte & 15;
			switch (byte & 240) {
				case 16:
					state.ordinal = immediate;
					state.ordinalFailure = null;
					return true;
				case 32:
					{
						const ordinal = uleb(bytes, cursor, end);
						if (ordinal > BigInt(Number.MAX_SAFE_INTEGER)) {
							state.ordinal = 0;
							state.ordinalFailure = `Dylib ordinal ${ordinal} exceeds the safe integer range`;
						} else {
							state.ordinal = Number(ordinal);
							state.ordinalFailure = null;
						}
					}
					return true;
				case 48:
					state.ordinal = immediate === 0 ? 0 : immediate - 16;
					state.ordinalFailure = null;
					return true;
				case 64: {
					const stop = bytes.indexOf(0, cursor.at);
					if (stop < 0 || stop >= end) throw truncatedInput("macho", "Unterminated bind symbol");
					state.symbol = symbolName(bytes.subarray(cursor.at, stop));
					state.weak = (immediate & 1) !== 0;
					cursor.at = stop + 1;
					return true;
				}
				case 80:
					state.type = immediate;
					return true;
				case 96:
					state.addend = sleb(bytes, cursor, end);
					return true;
				case 112: {
					const segment = image.segments[immediate];
					if (segment === undefined) throw malformedInput("macho", "Bind segment index is out of range");
					state.segmentIndex = immediate;
					state.address = segment.address + uleb(bytes, cursor, end);
					return true;
				}
				case 128:
					state.address = state.address + uleb(bytes, cursor, end) & 18446744073709551615n;
					return true;
				default: return false;
			}
		};
		indexBindRuns = (runs, fileBytes) => {
			const sorted = [...runs].sort((a, b) => a.start < b.start ? -1 : a.start > b.start ? 1 : 0);
			const prefixEnd = [];
			let last = -1n;
			for (const run of sorted) {
				const end = run.start + (run.count - 1n) * run.stride;
				if (end > last) last = end;
				prefixEnd.push(last);
			}
			return {
				runs: sorted,
				prefixEnd,
				remaining: fileBytes * 2,
				exhausted: false
			};
		};
		firstBindIn = (run, low, high) => {
			const index = low <= run.start ? 0n : (low - run.start + run.stride - 1n) / run.stride;
			const address = run.start + index * run.stride;
			return index < run.count && address <= high ? address : undefined;
		};
		resolveLegacyBind = (index, address) => {
			let match;
			for (const run of bindRunsIn(index, address, address)) {
				if (match !== undefined) return {
					kind: "unsupported",
					reason: `Ambiguous bind records target pointer location 0x${address.toString(16)}`
				};
				match = run;
			}
			if (index.exhausted) return {
				kind: "unsupported",
				reason: BIND_QUERY_LIMITATION
			};
			return match === undefined ? undefined : match.binding.kind === "unsupported" ? match.binding : {
				kind: "bind",
				...match.binding.value
			};
		};
		hasUnresolvedLegacyBytes = (segments, rebases, binds, address, size) => {
			if (size <= 0) return false;
			if (!rebases.complete || !binds.complete || binds.index.exhausted) return true;
			const first = address - 7n;
			const end = address + BigInt(size);
			for (const run of bindRunsIn(binds.index, first, end - 1n)) if (firstBindIn(run, address - BigInt(run.width) + 1n, end - 1n) !== undefined) return true;
			if (binds.index.exhausted) return true;
			if (rebases.membership !== null) for (let slot = first; slot < end; slot++) {
				const state = legacyRebaseState(segments, rebases.membership, slot);
				if (typeof state !== "number" || state === REBASE_CONFLICT || state === REBASE_NON_POINTER && slot + 4n > address) return true;
			}
			return false;
		};
		hasPartialLegacyPointerWrite = (segments, rebases, binds, address) => {
			const low = address - 7n;
			const high = address + 7n;
			for (const run of bindRunsIn(binds.index, low, high)) {
				const at = firstBindIn(run, address - BigInt(run.width) + 1n, high);
				if (at === undefined) continue;
				if (run.width !== 8 || at !== address || firstBindIn(run, at + 1n, high) !== undefined) return true;
			}
			if (binds.index.exhausted) return true;
			if (rebases.membership !== null) for (let at = low; at <= high; at += 1n) {
				const state = legacyRebaseState(segments, rebases.membership, at);
				if (typeof state !== "number" || state === REBASE_CONFLICT) return true;
				if (state === REBASE_NON_POINTER && at + 4n > address) return true;
				if (state === REBASE_POINTER && at !== address && at + 8n > address) return true;
			}
			return false;
		};
	})))();
}

//#endregion
//#region dist/domain/apple/appleMachoSelection.js
var hex, parseMachoLayout, collectSegment, collectFixupCommand;
function init_appleMachoSelection() {
	return (init_appleMachoSelection = __esmMin((() => {
		init_parseFailure();
		init_machoLoadCommandCodes();
		init_machoDylibCommand();
		init_machoSectionHeader();
		init_machoSegmentHeader();
		init_machoLoadCommands();
		init_binaryContainer();
		init_appleMachoNames();
		hex = (value) => `0x${value.toString(16)}`;
		parseMachoLayout = (bytes, selected) => {
			if (bytes.length < 4) throw truncatedInput("macho", "Truncated Mach-O header");
			const slice = selected.fileOffset;
			const sliceEnd = slice + selected.bytes.length;
			if (slice + 4 > sliceEnd) throw truncatedInput("macho", "Truncated Mach-O header");
			const selectedBytes = bytes.subarray(slice, sliceEnd);
			const declarations = readMachoLoadCommandDeclarations(selectedBytes, selectedBytes.length);
			if (!declarations.ok) throw truncatedInput("macho", "Truncated Mach-O header");
			if (declarations.value === null) {
				if (selectedBytes.length < 32) throw truncatedInput("macho", "Truncated Mach-O header");
				throw unsupportedInput("macho", "Only little-endian 64-bit Mach-O metadata is supported");
			}
			const table = declarations.value;
			const { cpuType, cpuSubtype } = table.identity;
			const fat = selected.selection;
			if (table.wide && !table.littleEndian) {
				if (cpuType !== 16777234) throw new BinaryFormatFailure("unsupported", "Unsupported big-endian Mach-O CPU type");
				throw new BinaryFormatFailure("unsupported", "Unsupported big-endian 64-bit PowerPC Mach-O metadata", {
					format: "macho",
					undecodedContent: true
				});
			}
			if (!table.wide) throw new BinaryFormatFailure("unsupported", "Unsupported 32-bit Mach-O metadata", {
				format: "macho",
				undecodedContent: true
			});
			const issue = machoCommandTableIssue(table, selectedBytes.length);
			if (issue !== null) throw malformedInput("macho", issue.kind === "extent" ? "Malformed Mach-O command bounds" : issue.message);
			const state = {
				slice,
				sliceEnd,
				segments: [],
				mappings: [],
				zeroFills: [],
				sections: [],
				dylibs: [],
				binds: [],
				rebases: [],
				chained: null,
				dyldInfo: false,
				baseAddress: undefined
			};
			const framing = new MachoLoadCommandCursor(table);
			while (framing.nextOffset !== null) {
				const cursor = slice + table.headerSize + framing.nextOffset;
				const frame = framing.read(bytes.subarray(cursor, cursor + 8));
				if (!frame.ok) throw malformedInput("macho", frame.error);
				const command = {
					cursor,
					kind: frame.value.command,
					size: frame.value.size
				};
				if (command.kind === LC.SEGMENT) throw malformedInput("macho", "Mach-O segment command does not match the header width");
				if (command.kind === LC.SEGMENT_64) collectSegment(bytes, command, state);
				else collectFixupCommand(bytes, command, state);
			}
			const complete = framing.finish();
			if (!complete.ok) throw malformedInput("macho", complete.error);
			const { segments, sections, chained, binds, rebases, dylibs } = state;
			const mappings = createFileMappingIndex(state.mappings, state.zeroFills);
			const offset = (address, size = 1) => {
				try {
					return mappings.offset(address, size);
				} catch (cause) {
					if (!(cause instanceof BinaryFormatFailure)) throw cause;
					throw malformedInput("macho", `Unmapped or ambiguous metadata pointer ${hex(address)}`, { cause });
				}
			};
			return {
				segments,
				sections,
				selectedImage: {
					container: fat === null ? "thin" : "fat",
					offset: slice,
					byteLength: sliceEnd - slice,
					cpuType,
					cpuSubtype,
					containerTableSha256: fat?.container_table_sha256 ?? null
				},
				offset,
				fixups: {
					chained,
					binds,
					rebases,
					dylibs
				},
				baseAddress: state.baseAddress ?? 0n
			};
		};
		collectSegment = (bytes, { cursor, size }, state) => {
			const parsed = readMachoSegmentHeader(bytes.subarray(cursor, cursor + size), true, true);
			if (!parsed.ok) throw truncatedInput("macho", "Truncated segment command");
			const { address, nameBytes, fileSize, fileOffset, protection, sectionCount: count, headerSize } = parsed.value;
			const admitted = admitMachoSegmentMapping(parsed.value, 64);
			if (!admitted.ok) throw malformedInput("macho", admitted.error.message);
			const { unmapped, fileAddress, zeroFill } = admitted.value;
			if (fileOffset + fileSize > BigInt(state.sliceEnd - state.slice)) throw malformedInput("macho", "Segment file range exceeds target bytes");
			const name = decodeMachoFixedName(nameBytes);
			state.segments.push({
				address: fileAddress,
				...fileAddress === address ? {} : { declaredAddress: address },
				size: fileSize,
				offset: state.slice + Number(fileOffset),
				executable: (protection & 4) !== 0
			});
			if (!unmapped && name !== "__PAGEZERO") state.mappings.push({
				address: fileAddress,
				size: Number(fileSize),
				offset: state.slice + Number(fileOffset)
			});
			if (zeroFill !== null && name !== "__PAGEZERO") state.zeroFills.push(zeroFill);
			if (!unmapped && name !== "__PAGEZERO" && fileOffset === 0n && fileSize > 0n) state.baseAddress ??= fileAddress;
			if (!machoSegmentSectionTableFits(parsed.value, size, true)) throw truncatedInput("macho", "Truncated section table");
			const sectionWidth = machoSectionHeaderSize(true);
			for (let section = 0; section < count; section++) {
				const position = cursor + headerSize + section * sectionWidth;
				const parsedSection = readMachoSectionHeader(bytes.subarray(position, position + sectionWidth), true, true);
				if (!parsedSection.ok) throw truncatedInput("macho", "Truncated section table");
				const { nameBytes, address, size: sectionSize } = parsedSection.value;
				if (sectionSize > BigInt(Number.MAX_SAFE_INTEGER)) throw malformedInput("macho", "Section size exceeds exact numeric range");
				state.sections.push({
					name: decodeMachoFixedName(nameBytes),
					address,
					size: Number(sectionSize)
				});
			}
		};
		collectFixupCommand = (bytes, { cursor, kind, size }, state) => {
			const range = (relativeOffset, length) => {
				const offset = state.slice + relativeOffset;
				if (offset + length > state.sliceEnd) throw malformedInput("macho", "Fixup data exceeds the Mach-O slice");
				return {
					offset,
					size: length
				};
			};
			if (kind === LC.DYLD_CHAINED_FIXUPS) {
				const data = readMachoLinkeditDataCommand(kind, bytes.subarray(cursor, cursor + size), true);
				if (data === null) throw truncatedInput("macho", "Truncated chained-fixups command");
				if (state.chained !== null) throw malformedInput("macho", "Mach-O slice declares more than one LC_DYLD_CHAINED_FIXUPS command");
				state.chained = range(data.dataOffset, data.dataSize);
			} else if (kind === LC.DYLD_INFO || kind === LC.DYLD_INFO_ONLY) {
				const fields = readMachoDyldInfoCommand(bytes.subarray(cursor, cursor + size), true);
				if (fields === null) throw truncatedInput("macho", "Truncated dyld-info command");
				if (state.dyldInfo) throw malformedInput("macho", "Mach-O slice declares more than one LC_DYLD_INFO or LC_DYLD_INFO_ONLY command");
				state.dyldInfo = true;
				const rebase = range(fields.rebase_off, fields.rebase_size);
				if (rebase.size > 0) state.rebases.push(rebase);
				for (const [stream, offset, length] of [
					[
						"bind",
						fields.bind_off,
						fields.bind_size
					],
					[
						"weak",
						fields.weak_bind_off,
						fields.weak_bind_size
					],
					[
						"lazy",
						fields.lazy_bind_off,
						fields.lazy_bind_size
					]
				]) {
					const bound = range(offset, length);
					if (bound.size > 0) state.binds.push({
						...bound,
						stream
					});
				}
			} else if (machoDependencyCommand(kind) !== null) {
				const parsed = readMachoDylibCommandFacts(bytes.subarray(cursor, cursor + size), kind, true);
				if (!parsed.ok) {
					if (parsed.error._tag === "InvalidMachoDylibCommand") throw truncatedInput("macho", "Truncated dylib command");
					if (parsed.error.reason === "unterminated") throw truncatedInput("macho", "Unterminated dylib install name");
					throw malformedInput("macho", "Dylib install name is outside its load command");
				}
				const { nameBytes } = parsed.value;
				state.dylibs.push(decodeMachoName(Buffer.from(nameBytes.buffer, nameBytes.byteOffset, nameBytes.byteLength)));
			}
		};
	})))();
}

//#endregion
export { chainedImportNames, init_appleDispatchDecodeFacts, init_appleMachoFixups, init_appleMachoSelection, issue, parseMachoLayout, parsePointerFixupsSteps };