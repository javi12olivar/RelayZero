import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisOutputError, AnalysisResourceConstraintError, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_parseFailureAnalysisError, init_strictUtf8, parseFailureAnalysisError, parseLimitConstraint, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryFormatFailure, BinaryMappingFailure, BinaryReader, BinaryResourceFailure, binaryResourceCeiling, createFileMappingIndex, imageFileMappings, init_binaryContainer, isZeroFilledSpan, mappedFileOffset } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactReaderFailure, ArtifactResourceScope, artifactFilePrimaryFacts, assertArtifactReadActive, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_readStableArtifact, init_resources, projectArtifactCloseFailure, projectOwnedArtifactIdentityFailure, projectSelectedArtifactFileFailure, projectStableArtifactFailure, readStableArtifact, stableArtifactInputFailure, yieldArtifactRead } from "./resources-B3P64jvH.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_machoTargetSelection, machoSelectionAnswersArchitecture, metadataReportSubjectFormat } from "./nativeValueTrace-B4vmCxtN.js";
import { GO_ANALYSIS_BUDGET_DEFAULTS, GO_ANALYSIS_BUDGET_MAXIMA, binaryMetadataArchitecture, goAnalysisBudgets, goBinarySchema, init_binaryMetadataArchitecture, init_goBinary, inspectGoBinaryInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { init_AnalysisViewService, requireAnalysisViewRetention, summarizeRetainedAnalysis } from "./AnalysisViewService-D_M3W3PD.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { firstKeyed, init_keyedCollection, keyedBy, uniqueKeyed } from "./keyedCollection-BoRfT2aE.js";
import { init_machoSliceSelection, requireSelectedNativeImage } from "./machoSliceSelection-DdTVvVl5.js";
import { ULEB64, init_leb128, readLeb128 } from "./leb128-QVew1RrX.js";
import { init_readBinaryContainer, readBinaryContainer, readBinaryContainerCooperative } from "./readBinaryContainer-inCoG62k.js";
import { basename } from "node:path";
import { isUtf8 } from "node:buffer";

//#region dist/application/go/GoBinaryService.js
var OPERATION$1, NO_RETENTION, GoBinaryService;
function init_GoBinaryService() {
	return (init_GoBinaryService = __esmMin((() => {
		init_binaryMetadataArchitecture();
		init_machoTargetSelection();
		init_analysisErrorCore();
		init_evidence();
		init_goBinary();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		init_AnalysisViewService();
		OPERATION$1 = "inspect_go_binary";
		NO_RETENTION = {
			recordEvidence: undefined,
			evidenceById: undefined
		};
		GoBinaryService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			/** Inspect one explicitly selected file without acquiring a binary session. */
			async inspect(rawInput, options, retention = NO_RETENTION) {
				const input = parseAnalysisInput(OPERATION$1, rawInput, inspectGoBinaryInputSchema, options?.signal);
				if (!input.ok) return input;
				const { detail, ...providerInput } = input.value;
				if (detail === "summary") {
					const ready = requireAnalysisViewRetention(OPERATION$1, retention);
					if (!ready.ok) return ready;
				}
				const inspected = await this.provider.inspect(providerInput, options);
				if (!inspected.ok) return inspected;
				const report = goBinarySchema.safeParse(inspected.value);
				if (!report.success || report.data.artifact.path !== input.value.path || !machoSelectionAnswersArchitecture(report.data.selected_slice, input.value.architecture)) return err(new AnalysisOutputError(OPERATION$1, "Go build-information reader returned malformed metadata or changed the selected artifact or slice identity."));
				const value = report.data;
				const architecture = binaryMetadataArchitecture(value.architecture);
				const completed = completeProviderEvidence(createEvidence({
					path: value.artifact.path,
					sha256: value.artifact.sha256,
					format: metadataReportSubjectFormat(value),
					...architecture === undefined ? {} : { architecture }
				}, this.provider.identity, {
					operation: OPERATION$1,
					parameters: providerInput,
					result: value,
					confidence: "observed",
					limitations: value.limitations,
					locations: [{
						kind: "artifact-path",
						path: value.artifact.path
					}, ...value.build_info === null ? [] : [{
						kind: "file-offset-range",
						start: value.build_info.header_offset,
						end: value.build_info.header_offset + 32
					}]]
				}), options?.signal);
				if (!completed.ok) return completed;
				return detail === "summary" ? summarizeRetainedAnalysis(completed.value, retention) : completed;
			}
		};
	})))();
}

//#endregion
//#region dist/go/GoBinaryProviderIdentity.js
var GO_BINARY_PROVIDER_IDENTITY;
function init_GoBinaryProviderIdentity() {
	return (init_GoBinaryProviderIdentity = __esmMin((() => {
		GO_BINARY_PROVIDER_IDENTITY = {
			id: "go-build-info",
			name: "REA Go build-information reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/go/GoModuleText.js
function* moduleSourceLines(source) {
	let start = 0;
	while (start < source.length) {
		const newline = source.indexOf(10, start);
		const end = newline < 0 ? source.length : newline;
		let line;
		const bytes = source.subarray(start, end);
		try {
			line = utf8.decode(bytes);
		} catch {
			line = bytes;
		}
		yield {
			line,
			terminated: newline >= 0
		};
		if (newline < 0) return;
		start = newline + 1;
	}
}
var utf8, escapes, quoted, setting, moduleLine, modulePrefixes, parseGoModuleBytes;
function init_GoModuleText() {
	return (init_GoModuleText = __esmMin((() => {
		init_strictUtf8();
		utf8 = strictUtf8Decoder("preserve");
		escapes = new Map([
			["a", 7],
			["b", 8],
			["f", 12],
			["n", 10],
			["r", 13],
			["t", 9],
			["v", 11],
			["\\", 92],
			["\"", 34]
		]);
		quoted = (input) => {
			if (input.startsWith("`")) {
				const end = input.indexOf("`", 1);
				return end < 0 ? null : {
					value: input.slice(1, end).replace(/\r/g, ""),
					end: end + 1
				};
			}
			if (!input.startsWith("\"")) return null;
			const output = Buffer.alloc(input.length * 3);
			let length = 0;
			for (let index = 1; index < input.length;) {
				const character = input[index];
				if (character === "\"") {
					try {
						return {
							value: utf8.decode(output.subarray(0, length)),
							end: index + 1
						};
					} catch {
						return null;
					}
				}
				if (character === "\n") return null;
				if (character !== "\\") {
					const start = index;
					do {
						index += 1;
					} while (index < input.length && input[index] !== "\"" && input[index] !== "\n" && input[index] !== "\\");
					length += output.write(input.slice(start, index), length, "utf8");
					continue;
				}
				const escaped = input[index + 1];
				if (escaped === undefined) return null;
				const simple = escapes.get(escaped);
				if (simple !== undefined) {
					output[length++] = simple;
					index += 2;
					continue;
				}
				const digits = escaped === "x" ? 2 : escaped === "u" ? 4 : escaped === "U" ? 8 : 0;
				if (digits > 0) {
					const encoded = input.slice(index + 2, index + 2 + digits);
					if (encoded.length !== digits || !/^[a-f\d]+$/i.test(encoded)) return null;
					const point = Number.parseInt(encoded, 16);
					if (escaped === "x") output[length++] = point;
					else {
						if (point > 1114111 || point >= 55296 && point <= 57343) return null;
						length += output.write(String.fromCodePoint(point), length, "utf8");
					}
					index += 2 + digits;
					continue;
				}
				const octal = input.slice(index + 1, index + 4);
				if (!/^[0-7]{3}$/.test(octal)) return null;
				const byte = Number.parseInt(octal, 8);
				if (byte > 255) return null;
				output[length++] = byte;
				index += 4;
			}
			return null;
		};
		setting = (input) => {
			let key;
			let rawValue;
			if (input.startsWith("\"") || input.startsWith("`")) {
				const decoded = quoted(input);
				if (decoded === null || input[decoded.end] !== "=") return null;
				key = decoded.value;
				rawValue = input.slice(decoded.end + 1);
			} else {
				const separator = input.indexOf("=");
				if (separator < 1) return null;
				key = input.slice(0, separator);
				if (/[= \t\r\n"`]/.test(key)) return null;
				rawValue = input.slice(separator + 1);
			}
			if (rawValue.startsWith("\"") || rawValue.startsWith("`")) {
				const decoded = quoted(rawValue);
				return decoded !== null && decoded.end === rawValue.length ? {
					key,
					value: decoded.value
				} : null;
			}
			return /[ \t\r\n"`]/.test(rawValue) ? null : {
				key,
				value: rawValue
			};
		};
		moduleLine = (fields) => {
			const [path, version] = fields;
			if (fields.length !== 2 && fields.length !== 3 || path === undefined || version === undefined) return null;
			return {
				path,
				version,
				sum: fields[2] ?? null,
				replacement: null
			};
		};
		modulePrefixes = [
			"mod	",
			"dep	",
			"=>	"
		].map((prefix) => Buffer.from(prefix));
		parseGoModuleBytes = (source) => {
			let path = null;
			let main = null;
			const dependencies = [];
			const settings = [];
			const unparsed_lines = [];
			const unparsed_line_bytes_base64 = [];
			let last = null;
			for (const { line, terminated } of moduleSourceLines(source)) {
				if (typeof line !== "string") {
					unparsed_line_bytes_base64.push(line.toString("base64"));
					if (modulePrefixes.some((prefix) => line.subarray(0, prefix.length).equals(prefix))) last = null;
					continue;
				}
				if (line === "") continue;
				if (!terminated) {
					unparsed_lines.push(line);
					continue;
				}
				if (line.startsWith("path	") && path === null) {
					path = line.slice(5);
					continue;
				}
				if (line.startsWith("mod	") || line.startsWith("dep	")) {
					const value = moduleLine(line.slice(4).split("	"));
					last = null;
					if (value !== null && (!line.startsWith("mod	") || main === null)) {
						if (line.startsWith("mod	")) main = value;
						else dependencies.push(value);
						last = value;
						continue;
					}
				} else if (line.startsWith("=>	")) {
					const fields = line.slice(3).split("	");
					const value = moduleLine(fields);
					if (fields.length === 3 && value !== null && last !== null) {
						last.replacement = {
							path: value.path,
							version: value.version,
							sum: value.sum
						};
						last = null;
						continue;
					}
					last = null;
				} else if (line.startsWith("build	")) {
					const value = setting(line.slice(6));
					if (value !== null) {
						settings.push(value);
						continue;
					}
				}
				unparsed_lines.push(line);
			}
			return {
				path,
				main,
				dependencies,
				settings,
				unparsed_lines,
				unparsed_line_bytes_base64,
				complete: unparsed_lines.length + unparsed_line_bytes_base64.length === 0
			};
		};
	})))();
}

//#endregion
//#region dist/go/GoBuildInfoSearch.js
var fallbackSearchRanges, goBuildInfoSearch;
function init_GoBuildInfoSearch() {
	return (init_GoBuildInfoSearch = __esmMin((() => {
		init_binaryContainer();
		init_keyedCollection();
		fallbackSearchRanges = (container) => {
			if (container.format === "elf") return (container.load_regions ?? []).filter((region) => region.write && !region.execute).map((region) => region.mapping);
			if (container.format === "macho") return (container.load_regions ?? []).filter((region) => region.mapping.address !== 0n && region.protection_masks?.current === 3 && region.protection_masks.maximum === 3).slice(0, 1).map((region) => region.mapping);
			if (container.image_base === undefined) return [];
			const section = firstKeyed(keyedBy(container.sections, (candidate) => candidate.format === "pe" && candidate.virtual_address !== 0 && candidate.raw_size !== 0 && (candidate.characteristics & ~6291456) >>> 0 === 3221225536 ? "writable-initialized-data" : undefined), "writable-initialized-data", "Go's debug/buildinfo (peExe.DataStart) searches the first writable initialized-data section.");
			return section?.format === "pe" ? [{
				address: container.image_base + BigInt(section.virtual_address),
				offset: section.offset,
				size: section.size
			}] : [];
		};
		goBuildInfoSearch = (bytes, container) => {
			const reader = new BinaryReader(bytes, container.byte_order === "little", container.format);
			const named = [];
			const selected = uniqueKeyed(keyedBy(container.sections, (section) => section.format === "elf" ? section.name : section.format === "macho" ? section.section_name : undefined), container.format === "elf" ? ".go.buildinfo" : "__go_buildinfo");
			if (!selected.ok) throw new BinaryFormatFailure("malformed", container.format === "elf" ? "ELF contains ambiguous build-info sections" : "Mach-O has ambiguous build-info sections");
			const section = selected.value;
			if (section !== undefined) {
				if (section.format === "elf") {
					if (section.type !== 1) throw new BinaryFormatFailure("malformed", "ELF build-info section is not file-backed data");
					if (section.compressed) throw new BinaryFormatFailure("unsupported", "Compressed ELF build-info sections are unsupported", { undecodedContent: true });
					const search = {
						...reader.fileRange(section.declared_range.offset, section.declared_range.size, "ELF build-info section"),
						address: section.address
					};
					if (mappedFileOffset(container.mappings, search.address, search.size, container.zero_fills) !== search.offset) throw new BinaryFormatFailure("malformed", "ELF build-info section disagrees with its load mapping");
					named.push(search);
				} else if (section.format === "macho") {
					if (section.segment_unmapped) throw new BinaryFormatFailure("malformed", "Mach-O build-info section is in an unmapped segment");
					if (section.segment_mapping === null) throw new BinaryFormatFailure("malformed", "Mach-O build-info section is not file mapped");
					if ([
						1,
						12,
						18
					].includes(section.type)) throw new BinaryFormatFailure("malformed", "Mach-O build-info section is zero-fill data");
					const search = {
						...reader.fileRange(section.declared_range.offset, section.declared_range.size, "Mach-O build-info section"),
						address: section.address,
						inline_mapping: section.segment_mapping
					};
					if (mappedFileOffset([section.segment_mapping], search.address, search.size) !== search.offset) throw new BinaryFormatFailure("malformed", "Mach-O build-info section disagrees with its segment");
					named.push(search);
				}
			}
			return named.length > 0 ? named : fallbackSearchRanges(container);
		};
	})))();
}

//#endregion
//#region dist/go/GoStringLiterals.js
var MAX_REJECTED_SLICE_CACHE, PE_MEM_READ, PE_MEM_EXECUTE, PE_MEM_DISCARDABLE, PE_CNT_CODE, PE_CNT_INITIALIZED_DATA, MACHO_ATTR_INSTRUCTIONS, MACHO_ATTR_DEBUG, DISALLOWED_GO_STRING_CODE_POINT, recoverGoStringLiterals, isPrintableGoUtf8, admitMappedSpan, createReadableLoadRegionIndex, selectTargetSpans, selectHeaderScanSpans, normalizeHeaderScanSpans, lastBigIntAtOrBelow, lastSpanAtOrBelow;
function init_GoStringLiterals() {
	return (init_GoStringLiterals = __esmMin((() => {
		init_goBinary();
		init_binaryContainer();
		MAX_REJECTED_SLICE_CACHE = 4096;
		PE_MEM_READ = 1073741824;
		PE_MEM_EXECUTE = 536870912;
		PE_MEM_DISCARDABLE = 33554432;
		PE_CNT_CODE = 32;
		PE_CNT_INITIALIZED_DATA = 64;
		MACHO_ATTR_INSTRUCTIONS = 2147484672;
		MACHO_ATTR_DEBUG = 33554432;
		DISALLOWED_GO_STRING_CODE_POINT = /(?![\t\n\r\u200c\u200d])[\p{Cc}\p{Cf}\p{Cs}\p{Co}\p{Cn}]/u;
		recoverGoStringLiterals = (bytes, container, budgets = GO_ANALYSIS_BUDGET_DEFAULTS, checkActive) => {
			const limitsReached = new Set();
			const maxItems = budgets.max_string_literals;
			checkActive?.();
			const index = createFileMappingIndex(imageFileMappings(container), container.zero_fills);
			checkActive?.();
			const readableRegions = createReadableLoadRegionIndex(container.load_regions, checkActive);
			const targets = selectTargetSpans(bytes, container, index, readableRegions, checkActive);
			const headerSpans = selectHeaderScanSpans(bytes, container, index, readableRegions, checkActive);
			if (targets.length === 0 || headerSpans.length === 0) return {
				evidence_kind: "inferred",
				items: [],
				discovered_count: 0,
				aggregate_bytes: 0,
				max_items: maxItems,
				truncated: false
			};
			const { bits } = container;
			const reader = new BinaryReader(bytes, container.byte_order === "little", container.format);
			const wordBytes = bits === 64 ? 8 : 4;
			const firstTarget = targets[0];
			const lastTarget = targets[targets.length - 1];
			const minTargetAddr = firstTarget.address;
			const maxTargetEnd = lastTarget.address + BigInt(lastTarget.size);
			const accepted = new Map();
			const rejected = new Set();
			const candidates = [];
			let remainingBudget = budgets.max_string_header_scan_bytes;
			let budgetTruncated = false;
			let steps = 0;
			outer: for (const { startOffset, endOffset } of headerSpans) {
				if (remainingBudget < wordBytes * 2) {
					budgetTruncated = true;
					limitsReached.add("max_string_header_scan_bytes");
					break;
				}
				remainingBudget -= wordBytes;
				let word0 = reader.word(startOffset, bits);
				for (let headerOffset = startOffset; headerOffset + wordBytes * 2 <= endOffset; headerOffset += wordBytes) {
					if ((++steps & 65535) === 0) checkActive?.();
					if (remainingBudget < wordBytes) {
						budgetTruncated = true;
						limitsReached.add("max_string_header_scan_bytes");
						break outer;
					}
					remainingBudget -= wordBytes;
					const word1 = reader.word(headerOffset + wordBytes, bits);
					const ptr = word0;
					const rawLen = word1;
					word0 = word1;
					if (rawLen < 1n) continue;
					if (ptr < minTargetAddr || ptr >= maxTargetEnd) continue;
					const targetIndex = lastSpanAtOrBelow(targets, ptr);
					if (targetIndex < 0) continue;
					const target = targets[targetIndex];
					if (ptr + rawLen > target.address + BigInt(target.size)) continue;
					if (rawLen > BigInt(budgets.max_string_literal_bytes)) {
						limitsReached.add("max_string_literal_bytes");
						budgetTruncated = true;
						continue;
					}
					const byteLen = Number(rawLen);
					const sliceOffset = target.offset + Number(ptr - target.address);
					if (headerOffset < sliceOffset + byteLen && sliceOffset < headerOffset + wordBytes * 2) continue;
					const key = `${String(sliceOffset)}:${String(byteLen)}`;
					const existing = accepted.get(key);
					if (existing !== undefined) {
						existing.referenceCount += 1;
						if (headerOffset < existing.firstHeaderOffset) existing.firstHeaderOffset = headerOffset;
						continue;
					}
					if (rejected.has(key)) continue;
					if (candidates.length >= budgets.max_string_candidates) {
						limitsReached.add("max_string_candidates");
						budgetTruncated = true;
						break outer;
					}
					if (remainingBudget < byteLen) {
						limitsReached.add("max_string_header_scan_bytes");
						budgetTruncated = true;
						break outer;
					}
					remainingBudget -= byteLen;
					const slice = bytes.subarray(sliceOffset, sliceOffset + byteLen);
					if (!isPrintableGoUtf8(slice)) {
						if (rejected.size >= MAX_REJECTED_SLICE_CACHE) rejected.clear();
						rejected.add(key);
						continue;
					}
					const entry = {
						offset: sliceOffset,
						bytes: byteLen,
						firstHeaderOffset: headerOffset,
						referenceCount: 1
					};
					accepted.set(key, entry);
					candidates.push(entry);
				}
			}
			checkActive?.();
			candidates.sort((left, right) => left.offset - right.offset || left.bytes - right.bytes);
			const items = [];
			let aggregateBytes = 0;
			let outputTruncated = false;
			for (const candidate of candidates) {
				if (items.length >= maxItems || aggregateBytes + candidate.bytes > budgets.max_string_bytes) {
					limitsReached.add(items.length >= maxItems ? "max_string_literals" : "max_string_bytes");
					outputTruncated = true;
					break;
				}
				items.push({
					value: bytes.subarray(candidate.offset, candidate.offset + candidate.bytes).toString("utf8"),
					location: {
						offset: candidate.offset,
						bytes: candidate.bytes
					},
					first_header_offset: candidate.firstHeaderOffset,
					reference_count: candidate.referenceCount
				});
				aggregateBytes += candidate.bytes;
			}
			return {
				evidence_kind: "inferred",
				items,
				discovered_count: candidates.length,
				aggregate_bytes: aggregateBytes,
				max_items: maxItems,
				truncated: budgetTruncated || outputTruncated,
				...limitsReached.size === 0 ? {} : { limits_reached: [...limitsReached] }
			};
		};
		isPrintableGoUtf8 = (slice) => {
			let hasNonAscii = false;
			for (const byte of slice) {
				if (byte >= 128) {
					hasNonAscii = true;
					continue;
				}
				if (byte < 32 && byte !== 9 && byte !== 10 && byte !== 13 || byte === 127) return false;
			}
			if (!hasNonAscii) return true;
			if (!isUtf8(slice)) return false;
			return !DISALLOWED_GO_STRING_CODE_POINT.test(slice.toString("utf8"));
		};
		admitMappedSpan = (bytes, container, index, address, offset, size) => {
			if (size <= 0 || offset < 0 || offset > bytes.length || size > bytes.length - offset || address < 0n || address + BigInt(size) > 1n << BigInt(container.bits)) return null;
			try {
				return index.offset(address, size) === offset ? {
					address,
					offset,
					size
				} : null;
			} catch (cause) {
				if (cause instanceof BinaryMappingFailure) return null;
				throw cause;
			}
		};
		createReadableLoadRegionIndex = (loadRegions, checkActive) => {
			if (loadRegions === undefined || loadRegions.length === 0) return { contains: () => false };
			const raw = [];
			let steps = 0;
			for (const region of loadRegions) {
				if ((++steps & 1023) === 0) checkActive?.();
				if (!region.read || region.mapping.size <= 0) continue;
				raw.push({
					start: region.mapping.address,
					end: region.mapping.address + BigInt(region.mapping.size)
				});
			}
			if (raw.length === 0) return { contains: () => false };
			checkActive?.();
			raw.sort((left, right) => left.start < right.start ? -1 : left.start > right.start ? 1 : left.end < right.end ? -1 : left.end > right.end ? 1 : 0);
			const starts = [];
			const ends = [];
			let currentStart = raw[0].start;
			let currentEnd = raw[0].end;
			for (let index = 1; index < raw.length; index += 1) {
				if ((index & 1023) === 0) checkActive?.();
				const span = raw[index];
				if (span.start <= currentEnd) {
					if (span.end > currentEnd) currentEnd = span.end;
					continue;
				}
				starts.push(currentStart);
				ends.push(currentEnd);
				currentStart = span.start;
				currentEnd = span.end;
			}
			starts.push(currentStart);
			ends.push(currentEnd);
			return { contains: (address, size) => {
				if (size <= 0) return false;
				const index = lastBigIntAtOrBelow(starts, address);
				return index >= 0 && address + BigInt(size) <= ends[index];
			} };
		};
		selectTargetSpans = (bytes, container, index, readableRegions, checkActive) => {
			const raw = [];
			let steps = 0;
			if (container.sections.length > 0) {
				for (const section of container.sections) {
					if ((++steps & 1023) === 0) checkActive?.();
					if (!section.read_only) continue;
					if (section.format === "pe" && (section.characteristics & PE_MEM_DISCARDABLE) !== 0) continue;
					if (section.format === "macho" && (section.segment_unmapped || (section.flags & MACHO_ATTR_DEBUG) !== 0 || !readableRegions.contains(section.address, section.size))) continue;
					const address = section.format === "pe" ? (container.image_base ?? 0n) + BigInt(section.virtual_address) : section.address;
					const admitted = admitMappedSpan(bytes, container, index, address, section.offset, section.size);
					if (admitted !== null) raw.push(admitted);
				}
			} else {
				for (const region of container.load_regions ?? []) {
					if ((++steps & 1023) === 0) checkActive?.();
					if (!region.read || region.write || region.execute) continue;
					const admitted = admitMappedSpan(bytes, container, index, region.mapping.address, region.mapping.offset, region.mapping.size);
					if (admitted !== null) raw.push(admitted);
				}
			}
			raw.sort((left, right) => left.address < right.address ? -1 : left.address > right.address ? 1 : right.size - left.size);
			const nonContained = [];
			let maxEnd = -1n;
			for (const span of raw) {
				if ((++steps & 1023) === 0) checkActive?.();
				const end = span.address + BigInt(span.size);
				if (end <= maxEnd) continue;
				nonContained.push(span);
				maxEnd = end;
			}
			return nonContained;
		};
		selectHeaderScanSpans = (bytes, container, index, readableRegions, checkActive) => {
			const spans = [];
			let steps = 0;
			const push = (address, offset, size) => {
				const admitted = admitMappedSpan(bytes, container, index, address, offset, size);
				if (admitted !== null) spans.push(admitted);
			};
			for (const section of container.sections) {
				if ((++steps & 1023) === 0) checkActive?.();
				if (!section.file_backed || section.compressed) continue;
				if (section.format === "elf") {
					if (section.type !== 1 || (section.flags & 2n) === 0n || (section.flags & 4n) !== 0n) continue;
					push(section.address, section.offset, section.size);
					continue;
				}
				if (section.format === "macho") {
					if (section.segment_unmapped || (section.flags & MACHO_ATTR_INSTRUCTIONS) !== 0 || (section.flags & MACHO_ATTR_DEBUG) !== 0 || !readableRegions.contains(section.address, section.size)) continue;
					push(section.address, section.offset, section.size);
					continue;
				}
				if ((section.characteristics & PE_MEM_READ) === 0 || (section.characteristics & PE_MEM_EXECUTE) !== 0 || (section.characteristics & PE_CNT_CODE) !== 0 || (section.characteristics & PE_MEM_DISCARDABLE) !== 0 || (section.characteristics & PE_CNT_INITIALIZED_DATA) === 0 || container.image_base === undefined) continue;
				push(container.image_base + BigInt(section.virtual_address), section.offset, section.size);
			}
			if (container.sections.length === 0) {
				for (const region of container.load_regions ?? []) {
					if ((++steps & 1023) === 0) checkActive?.();
					if (!region.read || region.execute) continue;
					push(region.mapping.address, region.mapping.offset, region.mapping.size);
				}
			} else if (container.format === "elf" && container.section_names_limitation !== undefined) {
				for (const region of container.load_regions ?? []) {
					if ((++steps & 1023) === 0) checkActive?.();
					if (!region.read || !region.write || region.execute) continue;
					push(region.mapping.address, region.mapping.offset, region.mapping.size);
				}
			}
			return normalizeHeaderScanSpans(spans, container.bits === 64 ? 8 : 4, checkActive);
		};
		normalizeHeaderScanSpans = (spans, wordBytes, checkActive) => {
			const wordWidth = BigInt(wordBytes);
			const aligned = [];
			let steps = 0;
			for (const span of spans) {
				if ((++steps & 1023) === 0) checkActive?.();
				const misalign = Number((wordWidth - span.address % wordWidth) % wordWidth);
				const startOffset = span.offset + misalign;
				const spanEnd = span.offset + span.size;
				if (spanEnd - startOffset < wordBytes * 2) continue;
				const endOffset = startOffset + Math.floor((spanEnd - startOffset) / wordBytes) * wordBytes;
				aligned.push({
					startOffset,
					endOffset,
					phase: startOffset % wordBytes
				});
			}
			if (aligned.length === 0) return [];
			aligned.sort((left, right) => left.phase - right.phase || left.startOffset - right.startOffset || right.endOffset - left.endOffset);
			const merged = [];
			let current = aligned[0];
			for (let index = 1; index < aligned.length; index += 1) {
				if ((++steps & 1023) === 0) checkActive?.();
				const next = aligned[index];
				if (next.phase === current.phase && next.startOffset < current.endOffset) {
					if (next.endOffset > current.endOffset) current = {
						...current,
						endOffset: next.endOffset
					};
					continue;
				}
				merged.push({
					startOffset: current.startOffset,
					endOffset: current.endOffset
				});
				current = next;
			}
			merged.push({
				startOffset: current.startOffset,
				endOffset: current.endOffset
			});
			merged.sort((left, right) => left.startOffset - right.startOffset || left.endOffset - right.endOffset);
			return merged;
		};
		lastBigIntAtOrBelow = (sorted, value) => {
			let low = 0;
			let high = sorted.length;
			while (low < high) {
				const middle = low + high >>> 1;
				if (sorted[middle] <= value) low = middle + 1;
				else high = middle;
			}
			return low - 1;
		};
		lastSpanAtOrBelow = (sorted, address) => {
			let low = 0;
			let high = sorted.length;
			while (low < high) {
				const middle = low + high >>> 1;
				if (sorted[middle].address <= address) low = middle + 1;
				else high = middle;
			}
			return low - 1;
		};
	})))();
}

//#endregion
//#region dist/go/GoBinaryImage.js
var MAGIC, MODULE_START, MODULE_END, readGoBinaryImage, readGoBinaryImageCooperative, finishGoBinaryImage, inlineDataEnd, observedText, assertAggregateContentLimit, findHeader, readInlineExtent, readPointerString, readOptionalModuleString;
function init_GoBinaryImage() {
	return (init_GoBinaryImage = __esmMin((() => {
		init_strictUtf8();
		init_leb128();
		init_binaryContainer();
		init_readBinaryContainer();
		init_goBinary();
		init_GoModuleText();
		init_GoBuildInfoSearch();
		init_GoStringLiterals();
		MAGIC = Buffer.from("ff20476f206275696c64696e663a", "hex");
		MODULE_START = Buffer.from("3077af0c9274080241e1c107e6d618e6", "hex");
		MODULE_END = Buffer.from("f932433186182072008242104116d8f2", "hex");
		readGoBinaryImage = (bytes, options) => finishGoBinaryImage(bytes, options, readBinaryContainer(bytes, "inspect_go_binary"));
		readGoBinaryImageCooperative = async (bytes, options, pause) => finishGoBinaryImage(bytes, options, await readBinaryContainerCooperative(bytes, "inspect_go_binary", pause));
		finishGoBinaryImage = (bytes, options, container) => {
			const budgets = goAnalysisBudgets(options?.budgets);
			const { format, architecture, bits, byte_order } = container;
			const stringLiterals = options?.includeStringLiterals === true ? recoverGoStringLiterals(bytes, container, budgets, options.checkActive) : undefined;
			const stringMetadata = stringLiterals === undefined ? {} : {
				string_literals: stringLiterals,
				...container.macho_chained_fixups === true ? { macho_chained_fixups: true } : {}
			};
			let selected = null;
			const searched = new Set();
			let remainingSearchBytes = budgets.max_header_search_bytes;
			const sectionNamesLimitation = container.section_names_limitation;
			for (const search of goBuildInfoSearch(bytes, container)) {
				const identity = `${search.offset}:${search.size}:${search.address % 16n}`;
				if (searched.has(identity)) continue;
				searched.add(identity);
				if (search.size > remainingSearchBytes) throw new BinaryResourceFailure("search", budgets.max_header_search_bytes, `Go build-info discovery exceeds max_header_search_bytes=${String(budgets.max_header_search_bytes)}`);
				remainingSearchBytes -= search.size;
				const header = findHeader(bytes, search);
				if (header !== null) {
					selected = {
						search,
						header
					};
					break;
				}
			}
			if (selected === null) return {
				format,
				architecture,
				bits,
				byte_order,
				build_info: null,
				...stringMetadata,
				...sectionNamesLimitation === undefined ? {} : { section_names_limitation: sectionNamesLimitation }
			};
			const { search, header } = selected;
			const mappings = imageFileMappings(container);
			const verifyMapping = (size) => {
				const address = search.address + BigInt(header - search.offset);
				if (mappedFileOffset(mappings, address, size, container.zero_fills) !== header) throw new BinaryFormatFailure("malformed", "Go build-info bytes disagree with their virtual mapping");
			};
			verifyMapping(32);
			const reader = new BinaryReader(bytes, byte_order === "little", container.format);
			const ptrSize = bytes[header + 14];
			const flags = bytes[header + 15] ?? 0;
			if ((flags & ~3) !== 0) throw new BinaryFormatFailure("unsupported", "Go build-info flags contain an unsupported format bit", { undecodedContent: true });
			if ((flags & 2) === 0 && (flags & 1) !== (byte_order === "big" ? 1 : 0)) throw new BinaryFormatFailure("malformed", "Go build-info byte order disagrees with the image");
			const encoding = (flags & 2) !== 0 ? "inline" : "pointer";
			let version;
			let module;
			if (encoding === "inline") {
				const sourceEnd = inlineDataEnd(header, search, container);
				const versionExtent = readInlineExtent(reader, header + 32, sourceEnd - header - 32, budgets.max_build_info_bytes);
				const moduleExtent = readInlineExtent(reader, versionExtent.next, sourceEnd - versionExtent.next, budgets.max_build_info_bytes);
				verifyMapping(moduleExtent.next - header);
				assertAggregateContentLimit(versionExtent.location, moduleExtent.location, budgets.max_build_info_bytes);
				version = {
					location: versionExtent.location,
					bytes: reader.range(versionExtent.location.offset, versionExtent.location.bytes, "Go build-info string")
				};
				module = {
					location: moduleExtent.location,
					bytes: reader.range(moduleExtent.location.offset, moduleExtent.location.bytes, "Go build-info string")
				};
			} else {
				if (ptrSize !== 4 && ptrSize !== 8) throw new BinaryFormatFailure("malformed", "Go build-info pointer width must be 4 or 8");
				const pointerBits = ptrSize === 4 ? 32 : 64;
				const pointerStrings = {
					reader,
					mappings,
					zeroFills: container.zero_fills,
					maximumBytes: budgets.max_build_info_bytes
				};
				version = readPointerString(pointerStrings, reader.word(header + 16, pointerBits), pointerBits);
				const moduleField = header + 16 + ptrSize;
				module = readOptionalModuleString(pointerStrings, reader.word(moduleField, pointerBits), moduleField, pointerBits);
				assertAggregateContentLimit(version.location, module.location, budgets.max_build_info_bytes);
			}
			if (version.bytes.length === 0) throw new BinaryFormatFailure("malformed", "Go build-info compiler version is empty");
			const goVersion = observedText(version.bytes);
			let moduleText = "";
			let moduleBody = module.bytes;
			if (module.bytes.length !== 0) {
				if (module.bytes.length < 33 || !module.bytes.subarray(0, 16).equals(MODULE_START) || !module.bytes.subarray(-16).equals(MODULE_END) || module.bytes[module.bytes.length - 17] !== 10) throw new BinaryFormatFailure("malformed", "Go module string framing is invalid");
				moduleBody = module.bytes.subarray(16, -16);
				moduleText = observedText(moduleBody);
			}
			return {
				format,
				architecture,
				bits,
				byte_order,
				build_info: {
					header_offset: header,
					encoding,
					go_version: goVersion,
					go_version_bytes_base64: version.bytes.toString("base64"),
					module_text: moduleText,
					module_bytes_base64: module.bytes.toString("base64"),
					version_location: version.location,
					module_location: module.location,
					module: parseGoModuleBytes(moduleBody)
				},
				...stringMetadata,
				...sectionNamesLimitation === undefined ? {} : { section_names_limitation: sectionNamesLimitation }
			};
		};
		inlineDataEnd = (header, search, container) => {
			if (container.format === "pe") return search.offset + search.size;
			const address = search.address + BigInt(header - search.offset);
			let end = search.offset + search.size;
			if (search.inline_mapping !== undefined) {
				const delta = address - search.inline_mapping.address;
				if (delta >= 0n && delta < BigInt(search.inline_mapping.size) && search.inline_mapping.offset + Number(delta) === header) return Math.max(end, search.inline_mapping.offset + search.inline_mapping.size);
				return end;
			}
			for (const { mapping } of container.load_regions ?? []) {
				const delta = address - mapping.address;
				if (delta >= 0n && delta < BigInt(mapping.size) && mapping.offset + Number(delta) === header) end = Math.max(end, mapping.offset + mapping.size);
			}
			return end;
		};
		observedText = (bytes) => {
			try {
				return decodeStrictUtf8(bytes, "preserve");
			} catch (cause) {
				if (cause instanceof TypeError) return null;
				throw cause;
			}
		};
		assertAggregateContentLimit = (version, module, maximumBytes) => {
			if (version.bytes + module.bytes > maximumBytes) throw new BinaryResourceFailure("build-info", maximumBytes, `Go build-info strings exceed max_build_info_bytes=${String(maximumBytes)}`);
		};
		findHeader = (bytes, search) => {
			if (search.size === 0) return null;
			const end = search.offset + search.size;
			const selected = bytes.subarray(search.offset, end);
			let offset = Number((16n - search.address % 16n) % 16n);
			while (offset < selected.length) {
				const match = selected.indexOf(MAGIC, offset);
				if (match < 0) return null;
				const candidate = search.offset + match;
				const address = search.address + BigInt(candidate - search.offset);
				if (address % 16n === 0n) {
					if (end - candidate < 32) throw new BinaryFormatFailure("malformed", "Go build-info header is truncated");
					return candidate;
				}
				offset = match + 1;
			}
			return null;
		};
		readInlineExtent = (reader, offset, remaining, maximumBytes) => {
			const read = readLeb128(reader.bytes, offset, offset + Math.max(0, remaining), ULEB64);
			if ("failure" in read) throw new BinaryFormatFailure("malformed", read.failure === "truncated" ? "Go build-info varint is truncated" : "Go build-info varint overflows 64 bits");
			const start = read.next;
			const length = read.value;
			if (length > BigInt(remaining - (start - offset))) throw new BinaryFormatFailure("malformed", "Go build-info string range is truncated");
			if (length > BigInt(maximumBytes)) throw new BinaryResourceFailure("build-info", maximumBytes, `Go build-info string length exceeds max_build_info_bytes=${String(maximumBytes)}`);
			const size = Number(length);
			return {
				location: {
					offset: start,
					bytes: size
				},
				next: start + size
			};
		};
		readPointerString = ({ reader, mappings, zeroFills, maximumBytes }, address, pointerBits) => {
			const width = pointerBits / 8;
			const header = mappedFileOffset(mappings, address, width * 2, zeroFills);
			const valueAddress = reader.word(header, pointerBits);
			const length = reader.word(header + width, pointerBits);
			if (length > BigInt(reader.bytes.length)) throw new BinaryFormatFailure("malformed", "Go build-info pointer string length exceeds the file extent");
			const size = Number(length);
			const offset = size === 0 && valueAddress === 0n ? header : mappedFileOffset(mappings, valueAddress, size, zeroFills);
			if (length > BigInt(maximumBytes)) throw new BinaryResourceFailure("build-info", maximumBytes, `Go build-info pointer string length exceeds max_build_info_bytes=${String(maximumBytes)}`);
			return {
				bytes: reader.range(offset, size, "Go build-info pointer string"),
				location: {
					offset,
					bytes: size
				}
			};
		};
		readOptionalModuleString = (context, address, pointerField, pointerBits) => isZeroFilledSpan(context.mappings, context.zeroFills, address, pointerBits / 8 * 2) ? {
			bytes: Buffer.alloc(0),
			location: {
				offset: pointerField,
				bytes: 0
			}
		} : readPointerString(context, address, pointerBits);
	})))();
}

//#endregion
//#region dist/go/GoBinaryProvider.js
var OPERATION, budgetRecovery, budgetLimit, failureForPrimary, failureFor, outputLimit, limitationsFor, inFile, inFileStringLiterals, GoBinaryProvider;
function init_GoBinaryProvider() {
	return (init_GoBinaryProvider = __esmMin((() => {
		init_parseFailureAnalysisError();
		init_jsonValueByteLength();
		init_GoBinaryProviderIdentity();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_goBinary();
		init_providerAdapterError();
		init_fixedAllowanceRemediation();
		init_result();
		init_GoBinaryImage();
		init_machoSliceSelection();
		init_binaryContainer();
		init_errorMessage();
		OPERATION = "inspect_go_binary";
		budgetRecovery = (parameter, value) => value < GO_ANALYSIS_BUDGET_MAXIMA[parameter] ? `Increase ${parameter} above ${String(value)} (maximum ${String(GO_ANALYSIS_BUDGET_MAXIMA[parameter])}) on the next inspect_go_binary request; no restart is required.` : `${parameter} is at its runtime representation maximum ${String(value)}; no larger value is supported. Preserve the complete selected artifact and report this boundary rather than repeating the unchanged request.`;
		budgetLimit = (parameter, value) => value < GO_ANALYSIS_BUDGET_MAXIMA[parameter] ? { limit: {
			control_kind: "parameter",
			parameter,
			effective_value: value,
			unit: parameter.endsWith("_bytes") ? "bytes" : "count",
			minimum: 1,
			maximum: GO_ANALYSIS_BUDGET_MAXIMA[parameter],
			default_value: GO_ANALYSIS_BUDGET_DEFAULTS[parameter],
			applies_at: "next_call"
		} } : {};
		failureForPrimary = (facts, path, budgets) => {
			const { cause, origin } = facts;
			if (origin === "owned-or-classified" && cause instanceof AnalysisError) return cause;
			const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, path);
			if (identityFailure !== undefined) return identityFailure;
			if (cause instanceof BinaryResourceFailure) {
				const parameter = cause.boundary === "search" ? "max_header_search_bytes" : cause.boundary === "build-info" ? "max_build_info_bytes" : undefined;
				return parseLimitConstraint(OPERATION, cause.boundary === "search" ? "cpu" : "memory", cause, {
					path,
					...parameter === undefined ? fixedAllowanceOptions("The Go structural decoding allowance", "parser", binaryResourceCeiling(cause)) : {
						retryable: false,
						remediationAction: `${cause.boundary === "search" ? "The Go build-info header-search allowance" : "The Go build-info string allowance"} is ${String(budgets[parameter])} bytes. ${budgetRecovery(parameter, budgets[parameter])} Other byte and report budgets are independent. Repeating the unchanged request cannot raise this allowance.`,
						...budgetLimit(parameter, budgets[parameter])
					}
				});
			}
			const formatFailure = parseFailureAnalysisError(OPERATION, path, cause);
			if (formatFailure !== undefined) return formatFailure;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "limit") return new AnalysisResourceConstraintError(OPERATION, "file-size", cause.message, {
					maximum_input_bytes: budgets.max_input_bytes,
					parameter: "max_input_bytes",
					unit: "bytes"
				}, {
					cause,
					retryable: false,
					remediationAction: `${budgetRecovery("max_input_bytes", budgets.max_input_bytes)} Report, build-info and structural allowances remain independent. Preserve the complete artifact; do not truncate required bytes.`,
					...budgetLimit("max_input_bytes", budgets.max_input_bytes)
				});
				if (cause.reason === "path") return stableArtifactInputFailure(cause, OPERATION);
			}
			const fileFailure = projectSelectedArtifactFileFailure(cause, OPERATION, path, "artifact");
			if (fileFailure !== undefined) return fileFailure;
			return new ProviderAdapterError(GO_BINARY_PROVIDER_IDENTITY.id, OPERATION, {
				cause,
				diagnostics: {
					path,
					reason: errorMessage(cause)
				}
			});
		};
		failureFor = (cause, path, budgets, snapshot) => {
			const primary = failureForPrimary(artifactFilePrimaryFacts(cause), path, budgets);
			return projectStableArtifactFailure(cause, primary, path, GO_BINARY_PROVIDER_IDENTITY.id, OPERATION, snapshot);
		};
		outputLimit = (path, maximumBytes) => new AnalysisResourceConstraintError(OPERATION, "transport", `Complete Go metadata for ${path} exceeds the inline output budget; no partial success is returned.`, {
			maximum_output_bytes: maximumBytes,
			parameter: "max_report_bytes",
			unit: "bytes"
		}, {
			retryable: false,
			remediationAction: `The Go complete-report allowance is ${String(maximumBytes)} bytes. ${budgetRecovery("max_report_bytes", maximumBytes)} This did not produce complete Evidence to page. MCP delivery limits remain independent.`,
			...budgetLimit("max_report_bytes", maximumBytes)
		});
		limitationsFor = (image, stringLiterals, budgets) => {
			const { build_info: info, section_names_limitation: sectionNamesLimitation, macho_chained_fixups: machoChainedFixups } = image;
			return [
				"Embedded build metadata is observed file content, not proof of compiler identity, dependency authenticity or runtime behavior.",
				stringLiterals === undefined ? "Only Go build information is inspected; function names, source mappings, type metadata and decompiled code are not recovered." : "Only Go build information and inferred static (ptr, len) string-header candidates are inspected; function names, source mappings, type metadata and decompiled code are not recovered.",
				`Resource guards use max_input_bytes=${String(budgets.max_input_bytes)}, max_header_search_bytes=${String(budgets.max_header_search_bytes)}, max_build_info_bytes=${String(budgets.max_build_info_bytes)} and max_report_bytes=${String(budgets.max_report_bytes)}; increase the named per-call budget for the next inspection when needed. Native structural table decoding retains its separate 16 MiB bound. These are not operating-system memory or CPU limits.`,
				...info !== null && (info.go_version === null || info.module_text === null) ? ["Some embedded Go strings contain non-UTF8 bytes; undecodable text is null and exact source bytes are preserved as base64."] : [],
				...info === null ? ["No recognized Go build-info record was found in the inspected image; absent metadata does not establish that the binary is not Go."] : [],
				...sectionNamesLimitation === undefined ? [] : [sectionNamesLimitation],
				...info !== null && info.module.main === null ? ["Dependency coverage is unknown because no main-module record was decoded from the embedded module information, as in GOPATH-mode builds. Decoded dependency records remain visible; an empty list does not establish the absence of dependencies."] : [],
				...info?.module.complete === false ? ["Some embedded module-text records could not be parsed completely; their original lines are preserved and additional metadata remains unknown."] : [],
				...stringLiterals === undefined ? [] : [
					"Recovered string_literals are inferred from pointer-aligned (ptr, len) pairs in non-executable mapped data pointing to printable UTF-8 slices within single read-only spans; compiler-inlined or stack-constructed strings without static headers, unapplied relocation addends and runtime reachability are not established.",
					...machoChainedFixups === true ? ["This Mach-O declares LC_DYLD_CHAINED_FIXUPS; rebase-encoded pointer slots in writable data may not hold raw virtual addresses statically, so (ptr, len) recovery can miss writable-section string headers."] : [],
					...stringLiterals.truncated ? [`Recovered string_literals were truncated at ${stringLiterals.limits_reached?.map((parameter) => `${parameter}=${String(budgets[parameter])}`).join(", ") ?? "a configured recovery budget"}; increase the named per-call budget(s), then inspect the same complete artifact again. Additional static (ptr, len) candidates may exist. No restart is required.`] : []
				]
			];
		};
		inFile = (info, fileOffset) => info === null || fileOffset === 0 ? info : {
			...info,
			header_offset: info.header_offset + fileOffset,
			version_location: {
				...info.version_location,
				offset: info.version_location.offset + fileOffset
			},
			module_location: {
				...info.module_location,
				offset: info.module_location.offset + fileOffset
			}
		};
		inFileStringLiterals = (literals, fileOffset) => literals === undefined || fileOffset === 0 ? literals : {
			...literals,
			items: literals.items.map((item) => ({
				...item,
				location: {
					...item.location,
					offset: item.location.offset + fileOffset
				},
				first_header_offset: item.first_header_offset + fileOffset
			}))
		};
		GoBinaryProvider = class {
			identity = GO_BINARY_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					throw projectArtifactCloseFailure(cause, GO_BINARY_PROVIDER_IDENTITY.id, OPERATION);
				}
			}
			/** Read complete compiler/module metadata while preserving original byte identity and source ranges. */
			async inspect(input, options) {
				let snapshot;
				const budgets = goAnalysisBudgets(input);
				try {
					return await this.#resources.run(async () => {
						snapshot = await readStableArtifact(input.path, budgets.max_input_bytes, options?.signal, undefined, this.#resources);
						assertArtifactReadActive(options?.signal);
						const selected = requireSelectedNativeImage(OPERATION, input.path, snapshot.bytes, input.architecture);
						const imageOptions = {
							includeStringLiterals: input.include_string_literals === true,
							budgets,
							checkActive: () => assertArtifactReadActive(options?.signal)
						};
						const image = options?.signal === undefined ? readGoBinaryImage(selected.bytes, imageOptions) : await readGoBinaryImageCooperative(selected.bytes, imageOptions, () => yieldArtifactRead(options.signal));
						const { section_names_limitation: _sectionNamesLimitation, macho_chained_fixups: _machoChainedFixups, string_literals: rawStringLiterals, ...publicImage } = image;
						const info = inFile(image.build_info, selected.fileOffset);
						const stringLiterals = inFileStringLiterals(rawStringLiterals, selected.fileOffset);
						const report = {
							...publicImage,
							artifact: {
								path: input.path,
								file_name: basename(input.path),
								sha256: snapshot.sha256,
								bytes: snapshot.bytes.length
							},
							...selected.selection === null ? {} : { selected_slice: selected.selection },
							build_info: info,
							...stringLiterals === undefined ? {} : { string_literals: stringLiterals },
							limitations: [...limitationsFor(image, stringLiterals, budgets), ...selected.limitations]
						};
						if (jsonValueByteLength(report, budgets.max_report_bytes) > budgets.max_report_bytes) throw outputLimit(input.path, budgets.max_report_bytes);
						const parsed = goBinarySchema.safeParse(report);
						if (!parsed.success) throw new AnalysisOutputError(OPERATION, "Go reader produced invalid source ranges or report values.", { cause: parsed.error });
						assertArtifactReadActive(options?.signal);
						return ok(parsed.data);
					});
				} catch (cause) {
					return err(failureFor(cause, input.path, budgets, snapshot));
				}
			}
		};
	})))();
}

//#endregion
//#region dist/composition/go.js
var createGoBinaryService;
function init_go() {
	return (init_go = __esmMin((() => {
		init_GoBinaryService();
		init_GoBinaryProvider();
		createGoBinaryService = () => new GoBinaryService(new GoBinaryProvider());
	})))();
}

//#endregion
export { createGoBinaryService, init_go };