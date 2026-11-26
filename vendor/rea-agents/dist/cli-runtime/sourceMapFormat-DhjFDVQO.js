import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, init_isRecord, init_parseFailure, isRecord, malformedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_strictUtf8, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { WEB_SOURCE_MAP_LIMITS, init_sourceMapLimits, sourceMapLimitRecovery } from "./elfNotes-CjzNcaIN.js";
import { z } from "zod";

//#region dist/domain/sourceMapEnvelope.js
var sourceMapJsonText, classifySourceMapSection, classifySourceMapSections, isVersion3Map;
function init_sourceMapEnvelope() {
	return (init_sourceMapEnvelope = __esmMin((() => {
		sourceMapJsonText = (text) => {
			const withoutBom = text.replace(/^\uFEFF/u, "");
			if (!withoutBom.startsWith(")]}'")) return withoutBom;
			const newline = withoutBom.search(/[\r\n]/u);
			return newline === -1 ? "" : withoutBom.slice(newline);
		};
		classifySourceMapSection = (section) => {
			if (!isRecord(section)) return {
				kind: "invalid",
				reason: "Indexed source-map section must be an object."
			};
			if (Object.prototype.hasOwnProperty.call(section, "url")) return typeof section.url === "string" ? {
				kind: "external",
				url: section.url
			} : {
				kind: "invalid",
				reason: "External source-map section URL must be a string."
			};
			if (!isRecord(section.map)) return {
				kind: "invalid",
				reason: "Indexed source-map section requires an embedded map or external URL."
			};
			if (!isVersion3Map(section.map)) return {
				kind: "invalid",
				reason: "Indexed source-map section map is not a version 3 map."
			};
			return {
				kind: "embedded",
				map: section.map
			};
		};
		classifySourceMapSections = (map) => {
			if (!isRecord(map)) return {
				kind: "invalid",
				reason: "Source map must be an object."
			};
			if (!Object.prototype.hasOwnProperty.call(map, "sections")) return { kind: "regular" };
			return Array.isArray(map.sections) ? {
				kind: "indexed",
				sections: map.sections
			} : {
				kind: "invalid",
				reason: "Indexed source-map sections must be an array."
			};
		};
		isVersion3Map = (value) => isRecord(value) && value.version === 3;
	})))();
}

//#endregion
//#region dist/domain/artifactPathSyntax.js
var hasScheme, looksExternal, stripQueryAndFragment, admitsCanonicalPathSyntax, isUrlTrimmed, htmlUrlText, UTF8, hexNibble, percentDecodeUrlPath;
function init_artifactPathSyntax() {
	return (init_artifactPathSyntax = __esmMin((() => {
		init_strictUtf8();
		hasScheme = (value) => /^[A-Za-z][A-Za-z0-9+.-]*:/u.test(value);
		looksExternal = (value) => hasScheme(value) || value.startsWith("//");
		stripQueryAndFragment = (value) => value.split("#", 1)[0]?.split("?", 1)[0] ?? "";
		admitsCanonicalPathSyntax = (value) => !value.includes("\0") && !value.includes("\\") && !/%(?:2e|2f|5c)/iu.test(value);
		isUrlTrimmed = (code) => code <= 32;
		htmlUrlText = (value) => {
			let start = 0;
			let end = value.length;
			while (start < end && isUrlTrimmed(value.charCodeAt(start))) start += 1;
			while (end > start && isUrlTrimmed(value.charCodeAt(end - 1))) end -= 1;
			return value.slice(start, end).replace(/[\t\n\r]/gu, "");
		};
		UTF8 = strictUtf8Decoder("preserve");
		hexNibble = (byte) => {
			if (byte >= 48 && byte <= 57) return byte - 48;
			const lower = byte | 32;
			return lower >= 97 && lower <= 102 ? lower - 97 + 10 : -1;
		};
		percentDecodeUrlPath = (value) => {
			if (!/%[0-9a-f]{2}/iu.test(value)) return value;
			const bytes = Buffer.from(value, "utf8");
			let written = 0;
			for (let read = 0; read < bytes.length; read++) {
				const byte = bytes[read];
				if (byte === 37 && read + 2 < bytes.length) {
					const high = hexNibble(bytes[read + 1]);
					const low = hexNibble(bytes[read + 2]);
					if (high >= 0 && low >= 0) {
						bytes[written++] = high << 4 | low;
						read += 2;
						continue;
					}
				}
				bytes[written++] = byte;
			}
			try {
				const decoded = UTF8.decode(bytes.subarray(0, written));
				return decoded.includes("\0") ? null : decoded;
			} catch (cause) {
				void cause;
				return null;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/sourceMapFormat.js
var sourceNameSchema, sourceRootSchema, sourceContentsSchema, leafSchema, mapHeaderSchema, sectionOffsetSchema, SOURCE_MAP_FORMAT, SECTION_BOUNDARY, isSourceMapFailure, isSourceMapLimit, isSourceMapSectionOverlap, sourceMapSectionOverlap, sourceMapLimitFailure, parseStructure, codecLeaf, compare, addOffset, consumeRecords, recoverStructure, addSections, inspectMappingLayout, admitLeafFields, inspectLeaf, walkSourceMapStructure, observeSourceDeclarations, inspectSourceMap, inspectSourceMapValue, localFailureDetail, recoverSourceDeclarations, inspectLocalSourceMapDeclarations, inspectSourceMapSourceContent;
function init_sourceMapFormat() {
	return (init_sourceMapFormat = __esmMin((() => {
		init_sourceMapLimits();
		init_parseFailure();
		init_sourceMapEnvelope();
		sourceNameSchema = z.string().nullable();
		sourceRootSchema = sourceNameSchema.optional();
		sourceContentsSchema = z.array(sourceNameSchema).nullable().optional();
		leafSchema = z.object({
			version: z.literal(3),
			file: z.string().nullable().optional(),
			sourceRoot: sourceRootSchema,
			sources: z.array(sourceNameSchema),
			sourcesContent: sourceContentsSchema,
			names: z.array(z.string()).default([]),
			mappings: z.string().regex(/^[A-Za-z0-9+/,;]*$/u),
			ignoreList: z.array(z.int().min(0)).optional(),
			x_google_ignoreList: z.array(z.int().min(0)).optional()
		});
		mapHeaderSchema = z.object({
			version: z.literal(3),
			file: z.string().nullable().optional(),
			sections: z.unknown().optional()
		});
		sectionOffsetSchema = z.object({ offset: z.object({
			line: z.int().min(0),
			column: z.int().min(0)
		}) });
		SOURCE_MAP_FORMAT = "source-map";
		SECTION_BOUNDARY = "section-boundary";
		isSourceMapFailure = (cause) => cause instanceof ParseFailureError && cause.failure.format === "source-map";
		isSourceMapLimit = (cause) => isSourceMapFailure(cause) && cause.failure.kind === "limit";
		isSourceMapSectionOverlap = (cause) => isSourceMapFailure(cause) && cause.failure.field === SECTION_BOUNDARY;
		sourceMapSectionOverlap = (detail) => malformedInput(SOURCE_MAP_FORMAT, detail, { field: SECTION_BOUNDARY });
		sourceMapLimitFailure = (summary, name, maximum) => new ParseFailureError({
			kind: "limit",
			format: SOURCE_MAP_FORMAT,
			detail: `${summary} ${sourceMapLimitRecovery(name, maximum)}`,
			limit: {
				name,
				maximum
			}
		});
		parseStructure = (schema, value) => {
			const parsed = schema.safeParse(value);
			if (parsed.success) return parsed.data;
			throw malformedInput(SOURCE_MAP_FORMAT, parsed.error.message);
		};
		codecLeaf = (map) => ({
			version: 3,
			...map.file === undefined ? {} : { file: map.file },
			...typeof map.sourceRoot === "string" ? { sourceRoot: map.sourceRoot } : {},
			sources: map.sources,
			...map.sourcesContent == null ? {} : { sourcesContent: map.sourcesContent },
			names: map.names,
			mappings: map.mappings,
			...map.ignoreList === undefined ? {} : { ignoreList: map.ignoreList },
			...map.x_google_ignoreList === undefined ? {} : { x_google_ignoreList: map.x_google_ignoreList }
		});
		compare = (a, b) => a.line - b.line || a.column - b.column;
		addOffset = (base, offset, limits) => {
			const result = {
				line: base.line + offset.line,
				column: offset.column + (offset.line === 0 ? base.column : 0)
			};
			if (!Number.isSafeInteger(result.line) || !Number.isSafeInteger(result.column) || result.line >= limits.decodedRows) throw sourceMapLimitFailure(`Indexed offset exceeds the generated-row decoder budget.`, "decoded_rows", limits.decodedRows);
			return result;
		};
		consumeRecords = (budget, limits, count) => {
			if (count > limits.decodedRecords - budget.records) throw sourceMapLimitFailure(`Source-map structure exceeds the decoder budget.`, "decoded_records", limits.decodedRecords);
			budget.records += count;
		};
		recoverStructure = (read, path, partial) => {
			try {
				return read();
			} catch (failure) {
				if (partial === undefined || !isSourceMapFailure(failure)) throw failure;
				partial.invalid(path, failure.failure);
				return null;
			}
		};
		addSections = ({ node, pending, rawSections, budget, options, partial }) => {
			const limits = options.limits ?? WEB_SOURCE_MAP_LIMITS;
			options.check?.();
			if (recoverStructure(() => consumeRecords(budget, limits, rawSections.length), node.path, partial) === null) return;
			const offsets = rawSections.map((section, index) => {
				if ((index & 255) === 0) options.check?.();
				return recoverStructure(() => parseStructure(sectionOffsetSchema, section).offset, [...node.path, index], partial);
			});
			const maps = [];
			let previous = null;
			for (const [index, section] of rawSections.entries()) {
				if ((index & 255) === 0) options.check?.();
				const path = [...node.path, index];
				const offset = offsets[index] ?? null;
				if (offset !== null && previous !== null && compare(offset, previous) < 0) {
					const failure = malformedInput(SOURCE_MAP_FORMAT, "Indexed section offsets must be in nondecreasing order.");
					if (partial === undefined) throw failure;
					partial.invalid(path, failure.failure);
					offsets[index] = null;
				}
				if (offset !== null) previous = offset;
				const classification = classifySourceMapSection(section);
				if (classification.kind === "external") {
					if (partial === undefined) throw unsupportedInput(SOURCE_MAP_FORMAT, `External source-map section URL is not fetched: ${classification.url}`);
					partial.external({
						section_path: path,
						url: classification.url
					});
				} else if (classification.kind === "invalid") {
					if (partial === undefined) throw malformedInput(SOURCE_MAP_FORMAT, `${classification.reason} Section path: ${JSON.stringify(path)}.`);
					partial.invalid(path, malformedInput(SOURCE_MAP_FORMAT, classification.reason).failure);
				}
				maps.push(classification.kind === "embedded" ? classification.map : null);
			}
			let nextOffset = null;
			for (let index = maps.length - 1; index >= 0; index -= 1) {
				if ((index & 255) === 0) options.check?.();
				const path = [...node.path, index];
				const declared = offsets[index];
				const base = node.offset;
				const offset = declared == null || base === null ? null : recoverStructure(() => addOffset(base, declared, limits), path, partial);
				const stop = nextOffset === null ? node.stop : node.stop === null || compare(nextOffset, node.stop) < 0 ? nextOffset : node.stop;
				const map = maps[index];
				if (map != null) pending.push({
					value: map,
					path,
					offset,
					stop
				});
				nextOffset = offset;
			}
		};
		inspectMappingLayout = (mappings, limits, check) => {
			let lines = 1;
			let segments = 0;
			let components = 0;
			let inSegment = false;
			let afterComma = false;
			let continued = false;
			let digits = 0;
			const finish = (requiresSegment) => {
				if (requiresSegment && !inSegment) throw malformedInput(SOURCE_MAP_FORMAT, "Source-map mappings contain an empty mapping segment.");
				if (continued) throw malformedInput(SOURCE_MAP_FORMAT, "Source-map VLQ ends with an unfinished continuation.");
				if (inSegment && ![
					1,
					4,
					5
				].includes(components)) throw malformedInput(SOURCE_MAP_FORMAT, "Source-map segment requires one, four or five VLQ components.");
			};
			let index = 0;
			for (const character of mappings) {
				if ((index++ & 16383) === 0) check?.();
				if (character === "," || character === ";") {
					const isComma = character === ",";
					finish(isComma || afterComma);
					afterComma = isComma;
					inSegment = false;
					components = 0;
					if (character === ";") lines += 1;
				} else {
					digits += 1;
					if (digits === 7 && !/[A-Dg-j]/u.test(character) || digits > 7 && character !== "A" && character !== "g") throw malformedInput(SOURCE_MAP_FORMAT, "Source-map VLQ exceeds the format's 32-bit quantity representation.");
					if (!inSegment) segments += 1;
					inSegment = true;
					continued = /[g-z0-9+/]/u.test(character);
					if (!continued) {
						components += 1;
						digits = 0;
					}
				}
				if (segments > limits.decodedSegments || lines > limits.decodedRows) throw sourceMapLimitFailure(`Source-map layout exceeds decoder admission.`, segments > limits.decodedSegments ? "decoded_segments" : "decoded_rows", segments > limits.decodedSegments ? limits.decodedSegments : limits.decodedRows);
			}
			finish(afterComma);
			return {
				lines,
				segments
			};
		};
		admitLeafFields = (value, budget, options) => {
			const limits = options.limits ?? WEB_SOURCE_MAP_LIMITS;
			options.check?.();
			consumeRecords(budget, limits, 1);
			for (const field of [
				"sources",
				"names",
				"sourcesContent"
			]) {
				const raw = value[field];
				if (Array.isArray(raw)) consumeRecords(budget, limits, raw.length);
			}
			options.check?.();
		};
		inspectLeaf = (value, budget, options) => {
			const limits = options.limits ?? WEB_SOURCE_MAP_LIMITS;
			const map = parseStructure(leafSchema, value);
			const { lines, segments } = inspectMappingLayout(map.mappings, limits, options.check);
			consumeRecords(budget, limits, segments + lines);
			return {
				map,
				lines
			};
		};
		walkSourceMapStructure = (value, options, leaf, partial) => {
			const limits = options.limits ?? WEB_SOURCE_MAP_LIMITS;
			const pending = [{
				value,
				path: [],
				offset: {
					line: 0,
					column: 0
				},
				stop: null
			}];
			const budget = options.budget ?? { records: 0 };
			while (pending.length > 0) {
				options.check?.();
				const node = pending.pop();
				if (node === undefined) break;
				if (node.path.length > limits.sectionDepth) {
					const failure = sourceMapLimitFailure("Indexed source-map nesting exceeds decoder admission.", "section_depth", limits.sectionDepth);
					if (partial === undefined) throw failure;
					partial.invalid(node.path, failure.failure);
					continue;
				}
				const sections = classifySourceMapSections(node.value);
				if (sections.kind === "invalid") {
					const failure = malformedInput(SOURCE_MAP_FORMAT, sections.reason);
					if (partial === undefined) throw failure;
					partial.invalid(node.path, failure.failure);
				} else if (sections.kind === "indexed") {
					addSections({
						node,
						pending,
						rawSections: sections.sections,
						budget,
						options,
						partial
					});
				} else {
					if (recoverStructure(() => admitLeafFields(node.value, budget, options), node.path, partial) === null) continue;
					let admitted;
					try {
						admitted = inspectLeaf(node.value, budget, options);
					} catch (failure) {
						if (partial === undefined || !isSourceMapFailure(failure)) throw failure;
						partial.leaf(node, failure.failure);
						continue;
					}
					if (node.offset !== null && node.offset.line + admitted.lines > limits.decodedRows) {
						const failure = sourceMapLimitFailure("Source-map layout exceeds decoder admission.", "decoded_rows", limits.decodedRows);
						if (partial === undefined) throw failure;
						partial.leaf(node, failure.failure, admitted.map);
						continue;
					}
					leaf(node, admitted.map);
				}
			}
		};
		observeSourceDeclarations = (path, map, observe) => {
			const ignoredSources = new Set(map.ignoreList ?? map.x_google_ignoreList ?? []);
			for (const [sourceIndex, source] of map.sources.entries()) observe({
				sectionPath: path,
				sourceIndex,
				source,
				root: map.sourceRoot ?? null,
				content: map.sourcesContent?.[sourceIndex] ?? null,
				ignored: ignoredSources.has(sourceIndex)
			});
		};
		inspectSourceMap = (text, options = {}) => {
			const jsonText = sourceMapJsonText(text);
			const value = JSON.parse(jsonText);
			return inspectSourceMapValue(value, options);
		};
		inspectSourceMapValue = (value, options = {}) => {
			options.check?.();
			const root = parseStructure(mapHeaderSchema, value);
			const declarations = [];
			const leaves = [];
			if (!isVersion3Map(value)) throw new TypeError("Validated source map is unavailable");
			walkSourceMapStructure(value, options, (node, leaf) => {
				if (node.offset === null) throw new TypeError("Validated source-map offset is unavailable");
				leaves.push({
					map: leaf,
					codecMap: codecLeaf(leaf),
					offset: node.offset,
					stop: node.stop
				});
				if (options.profile !== "browser-collection") observeSourceDeclarations(node.path, leaf, (declaration) => declarations.push(declaration));
			});
			return {
				format: root.sections === undefined ? "regular" : "indexed",
				reportedFile: root.file ?? null,
				declarations,
				leaves
			};
		};
		localFailureDetail = (failure) => failure.kind === "limit" ? `Local source-map inspection exceeded ${failure.limit.name} (${String(failure.limit.maximum)}).` : failure.detail;
		recoverSourceDeclarations = (node, failure, declarations, limitations) => {
			const map = node.value;
			const start = limitations.length;
			const location = node.path.length === 0 ? "" : ` in section [${node.path.join(",")}]`;
			const names = map.sources;
			if (!Array.isArray(names)) {
				limitations.push(`Source map has no sources array${location}.`);
				return;
			}
			const contents = sourceContentsSchema.safeParse(map.sourcesContent);
			if (!contents.success) limitations.push(`Source map sourcesContent must be an array of strings or null entries${location}.`);
			const root = sourceRootSchema.safeParse(map.sourceRoot);
			if (!root.success) {
				limitations.push(`Source map sourceRoot must be a string or null${location}.`);
				return;
			}
			for (const [sourceIndex, value] of names.entries()) {
				const source = sourceNameSchema.safeParse(value);
				if (!source.success) {
					limitations.push(`Source map contains a non-string source name at index ${String(sourceIndex)}${location}.`);
					continue;
				}
				const content = Array.isArray(map.sourcesContent) ? sourceNameSchema.safeParse(map.sourcesContent[sourceIndex]) : undefined;
				declarations.push({
					sectionPath: node.path,
					sourceIndex,
					source: source.data,
					root: root.data ?? null,
					content: content?.success ? content.data : null
				});
			}
			if (typeof map.mappings !== "string") limitations.push(`Source map has no mappings string${location}.`);
			if (limitations.length === start) limitations.push(`Source map structure is invalid${location}: ${localFailureDetail(failure)}`);
		};
		inspectLocalSourceMapDeclarations = (text, options = {}) => {
			const declarations = [];
			const limitations = [];
			const external = [];
			const invalid = [];
			const unreadable = (limitation) => ({
				declarations,
				limitations: [limitation],
				external_sections: external,
				invalid_sections: invalid
			});
			options.check?.();
			let value;
			try {
				value = JSON.parse(sourceMapJsonText(text));
			} catch (cause) {
				if (!(cause instanceof SyntaxError)) throw cause;
				return unreadable("Source map is not valid JSON.");
			}
			if (!isVersion3Map(value)) return unreadable("Source map is not a version 3 map.");
			const root = mapHeaderSchema.safeParse(value);
			if (!root.success) limitations.push("Source map reported file must be a string or null.");
			walkSourceMapStructure(value, options, (node, map) => observeSourceDeclarations(node.path, map, (declaration) => declarations.push(declaration)), {
				invalid: (path, failure) => invalid.push({
					section_path: path,
					reason: localFailureDetail(failure)
				}),
				external: (section) => external.push(section),
				leaf: (node, failure) => recoverSourceDeclarations(node, failure, declarations, limitations)
			});
			const comparePaths = (left, right) => {
				for (const [index, segment] of left.section_path.entries()) {
					const other = right.section_path[index];
					if (other === undefined) return 1;
					if (segment !== other) return segment - other;
				}
				return left.section_path.length - right.section_path.length;
			};
			return {
				declarations,
				limitations,
				external_sections: external.sort(comparePaths),
				invalid_sections: invalid.sort(comparePaths)
			};
		};
		inspectSourceMapSourceContent = (text, options = {}) => {
			options.check?.();
			let value;
			try {
				value = JSON.parse(sourceMapJsonText(text));
			} catch (cause) {
				if (!(cause instanceof SyntaxError)) throw cause;
				return {
					embedded: false,
					complete: false,
					failure: new ParseFailureError({
						kind: "malformed",
						format: SOURCE_MAP_FORMAT,
						detail: cause.message
					})
				};
			}
			const hasObservedContent = options.hasObservedContent ?? ((content) => content.length > 0);
			const hasContent = (inspection) => inspection.declarations.some((declaration) => declaration.content !== null && hasObservedContent(declaration.content));
			try {
				return {
					embedded: hasContent(inspectSourceMapValue(value, options)),
					complete: true
				};
			} catch (failure) {
				if (!isSourceMapFailure(failure)) throw failure;
				let embedded = false;
				const observe = (leaf) => {
					embedded ||= leaf.sources.some((_source, index) => {
						const content = leaf.sourcesContent?.[index];
						return content != null && hasObservedContent(content);
					});
				};
				if (isVersion3Map(value)) walkSourceMapStructure(value, options, (_node, leaf) => observe(leaf), {
					invalid: () => {},
					external: () => {},
					leaf: (_node, _failure, unpositionedMap) => {
						if (unpositionedMap !== undefined) observe(unpositionedMap);
					}
				});
				return {
					embedded,
					complete: false,
					failure
				};
			}
		};
	})))();
}

//#endregion
export { SOURCE_MAP_FORMAT, admitsCanonicalPathSyntax, hasScheme, htmlUrlText, init_artifactPathSyntax, init_sourceMapEnvelope, init_sourceMapFormat, inspectLocalSourceMapDeclarations, inspectSourceMap, inspectSourceMapSourceContent, inspectSourceMapValue, isSourceMapLimit, isSourceMapSectionOverlap, looksExternal, percentDecodeUrlPath, sourceMapJsonText, sourceMapLimitFailure, sourceMapSectionOverlap, stripQueryAndFragment };