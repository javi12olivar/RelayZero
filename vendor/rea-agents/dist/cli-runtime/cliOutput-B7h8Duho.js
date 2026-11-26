import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, SUPPORTED_NODE_VERSION_RANGE, bufferedJsonParts, init_analysisErrorCore, init_explicitSensitiveValues, init_isRecord, init_jsonSerialization, init_processStart, init_runtimeVersion, isRecord, javaScriptRuntime, jsonParts, parseLogLevel, redactExplicitText, supportsJavaScriptRuntime } from "./jsonSerialization-DAF9DVXC.js";
import { VALUED_OUTPUT_FLAGS, declaredSensitiveValues, err, init_cliBuiltinArguments, init_result, ok, parseCliGlobalArguments } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { createRequire } from "node:module";
import { z } from "zod";
import { encode } from "@toon-format/toon";

//#region dist/cli/cliOutputFormatter.js
function* outputValues(value) {
	if (Array.isArray(value)) {
		yield* value;
		return;
	}
	for (const key of Object.keys(value)) {
		yield key;
		yield value[key];
	}
}
/** Stream a page after its rows and cells have been validated and snapshotted. */
function* formatDelimitedOutputParts({ encodedHeaders, rows, metadata, delimiter, lineEnding, format }) {
	yield `# rea-delimited-v1 ${JSON.stringify(metadata)}${lineEnding}`;
	yield `${encodedHeaders.join(delimiter)}${lineEnding}`;
	for (const row of rows) yield `${row.map((value) => encodeDelimitedScalar(value, format)).join(delimiter)}${lineEnding}`;
}
var hasUnpairedSurrogate, containsUnpairedSurrogate, containsUnrepresentableMarkdown, containsText, formatCliOutput, stringifyJson, yaml, loadYaml, formatJson, formatDocument, prepareDelimitedOutput, delimitedOutputInputError, encodeDelimitedScalar, encodeDelimitedText, isSpreadsheetFormula, isPlainObjectArray, isScalar, isFlatObject, isObjectArray, isWordCharacter, escapeInlineSyntax, escapeTableCell, encodeMarkdownWhitespace, escapeMarkdownText, markdownHeading, markdownEdgeWhitespace, encodeMarkdownTableCell, renderTable, markdownCell, formatKeyValueTable, formatObjectTable, formatMarkdown;
function init_cliOutputFormatter() {
	return (init_cliOutputFormatter = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_result();
		hasUnpairedSurrogate = (value) => /[\ud800-\udfff]/u.test(value);
		containsUnpairedSurrogate = (value) => {
			return containsText(value, hasUnpairedSurrogate);
		};
		containsUnrepresentableMarkdown = (value) => containsText(value, (text) => text.includes("\0") || hasUnpairedSurrogate(text));
		containsText = (value, predicate) => {
			const pending = [[value][Symbol.iterator]()];
			const seen = new WeakSet();
			while (pending.length > 0) {
				const next = pending.at(-1).next();
				if (next.done === true) {
					pending.pop();
					continue;
				}
				const current = next.value;
				if (typeof current === "string") {
					if (predicate(current)) return true;
					continue;
				}
				if (typeof current !== "object" || current === null || seen.has(current)) continue;
				seen.add(current);
				pending.push(outputValues(current));
			}
			return false;
		};
		formatCliOutput = (value, format, delimited) => {
			if (format === "csv" || format === "tsv") {
				const prepared = prepareDelimitedOutput(value, format, delimited ?? {
					fields: [],
					metadata: {}
				});
				return prepared.ok ? [...formatDelimitedOutputParts(prepared.value)].join("") : formatDocument(projectAnalysisError(prepared.error), "json");
			}
			return format === "md" ? formatMarkdown(value) : formatDocument(value, format);
		};
		stringifyJson = (value, indent) => JSON.stringify(value, (_key, child) => typeof child === "bigint" ? child.toString() : child, indent);
		;
		loadYaml = () => yaml ??= createRequire(new URL("../cli/cliOutputFormatter.js", import.meta.url).href)("yaml");
		formatJson = (value) => {
			if (typeof value === "string") {
				const trimmed = value.trim();
				if (trimmed.startsWith("{") || trimmed.startsWith("[")) try {
					return JSON.stringify(JSON.parse(value), null, 2);
				} catch {}
			}
			return stringifyJson(value, 2);
		};
		formatDocument = (value, format) => {
			if (value === null || value === undefined) return "";
			switch (format) {
				case "json": return formatJson(value);
				case "yaml": return loadYaml().stringify(value);
				case "jsonl": return Array.isArray(value) ? value.map((item) => stringifyJson(item)).join("\n") : stringifyJson(value);
				case "toon": return isScalar(value) ? String(value) : encode(value);
			}
		};
		prepareDelimitedOutput = (rows, format, { fields, metadata }) => {
			const operation = typeof metadata.command === "string" ? metadata.command : "render-cli-delimited-output";
			if (!isPlainObjectArray(rows)) return err(delimitedOutputInputError(["--filter-output"], Array.isArray(rows) ? "CSV/TSV output requires every selected row to be a plain object." : "The selected output path does not contain a row array.", operation));
			if (fields.length === 0) return err(delimitedOutputInputError(["--columns"], "CSV/TSV output requires at least one explicitly selected field.", operation));
			const encodedHeaders = [];
			for (const field of fields) {
				if (hasUnpairedSurrogate(field)) return err(delimitedOutputInputError(["--columns"], "CSV/TSV cannot preserve unpaired UTF-16 surrogates in UTF-8 output; use JSON.", operation));
				if (isSpreadsheetFormula(field)) return err(delimitedOutputInputError(["--columns", field], "CSV/TSV output refuses spreadsheet formula-leading text; JSON retains the exact value.", operation));
				encodedHeaders.push(encodeDelimitedText(field, format));
			}
			const preparedRows = [];
			for (const record of rows) {
				const preparedRow = [];
				for (const field of fields) {
					const value = Object.hasOwn(record, field) ? record[field] : undefined;
					if (value !== null && value !== undefined && typeof value !== "string" && typeof value !== "boolean" && !(typeof value === "number" && Number.isFinite(value))) return err(delimitedOutputInputError(["--columns", field], "CSV/TSV cells must be scalar values; nested objects and arrays are not flattened.", operation));
					if (typeof value === "string" && isSpreadsheetFormula(value)) return err(delimitedOutputInputError(["--columns", field], "CSV/TSV output refuses spreadsheet formula-leading text; JSON retains the exact value.", operation));
					if (typeof value === "string" && hasUnpairedSurrogate(value)) return err(delimitedOutputInputError(["--columns", field], "CSV/TSV cannot preserve unpaired UTF-16 surrogates in UTF-8 output; use JSON.", operation));
					preparedRow.push(value);
				}
				preparedRows.push(preparedRow);
			}
			return ok({
				encodedHeaders,
				rows: preparedRows,
				metadata,
				delimiter: format === "csv" ? "," : "	",
				lineEnding: format === "csv" ? "\r\n" : "\n",
				format
			});
		};
		delimitedOutputInputError = (path, message, operation = "render-cli-delimited-output") => new AnalysisInputError(operation, { userMessage: message }, [{
			path,
			reason: "invalid_value",
			message
		}]);
		encodeDelimitedScalar = (value, format) => {
			if (value === null || value === undefined) return "";
			const text = String(value);
			return encodeDelimitedText(text, format);
		};
		encodeDelimitedText = (text, format) => {
			const needsQuotes = format === "csv" ? /[",\r\n]/u.test(text) : /["\t\r\n]/u.test(text);
			return needsQuotes ? `"${text.replace(/"/gu, "\"\"")}"` : text;
		};
		isSpreadsheetFormula = (value) => /^[\u0000-\u0020]*[=+\-@]/u.test(value) || /^[\t\r]/u.test(value);
		isPlainObjectArray = (value) => Array.isArray(value) && value.every((row) => isRecord(row) && (Object.getPrototypeOf(row) === Object.prototype || Object.getPrototypeOf(row) === null));
		isScalar = (value) => value === null || value === undefined || typeof value !== "object";
		isFlatObject = (value) => Object.values(value).every(isScalar);
		isObjectArray = (value) => Array.isArray(value) && value.length > 0 && value.every((item) => isRecord(item)) && value.some((item) => Object.keys(item).length > 0);
		isWordCharacter = (character) => character !== undefined && /[\p{L}\p{N}]/u.test(character);
		escapeInlineSyntax = (match, offset, text) => match.startsWith("_") && isWordCharacter(text[offset - 1]) && isWordCharacter(text[offset + match.length]) ? match : match.replace(/./g, "\\$&");
		escapeTableCell = (value) => value.replace(/\u0000|[\ud800-\udfff]/gu, (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`).replace(/[\\|`*[\]~{}#]|_+/g, escapeInlineSyntax).replace(/[&<>:]|;(?=-?[)(])/g, (character) => {
			switch (character) {
				case "&": return "&amp;";
				case "<": return "&lt;";
				case ">": return "&gt;";
				case ":": return "&#58;";
				default: return "&#59;";
			}
		}).replace(/([xXB8]-)\)/g, "$1&#41;").replace(/\r\n|\r|\n/g, "<br>");
		encodeMarkdownWhitespace = (whitespace) => whitespace.replace(/\s/g, (character) => `&#${character.charCodeAt(0)};`);
		escapeMarkdownText = (value) => escapeTableCell(value).replace(/^(\s*)([-+=])/, "$1\\$2").replace(/^(\s*\d{1,9})([.)])(?=\s|$)/, "$1\\$2").replace(/^[ \t]+/, encodeMarkdownWhitespace).replace(/[ \t]+$/u, encodeMarkdownWhitespace);
		markdownHeading = (path) => `## ${escapeMarkdownText(path.join("."))}\n\n`;
		markdownEdgeWhitespace = /[\t \p{Z}\ufeff]/u;
		encodeMarkdownTableCell = (value) => {
			const escaped = escapeTableCell(value);
			let start = 0;
			let end = escaped.length;
			while (start < end && markdownEdgeWhitespace.test(escaped[start])) start += 1;
			while (end > start && markdownEdgeWhitespace.test(escaped[end - 1])) end -= 1;
			return encodeMarkdownWhitespace(escaped.slice(0, start)) + escaped.slice(start, end) + encodeMarkdownWhitespace(escaped.slice(end));
		};
		renderTable = (headers, rows) => {
			if (headers.length === 0) return "";
			const escapedHeaders = headers.map(encodeMarkdownTableCell);
			const widths = escapedHeaders.map((header) => header.length);
			for (const row of rows) {
				for (let index = 0; index < escapedHeaders.length; index += 1) {
					const width = encodeMarkdownTableCell(row[index] ?? "").length;
					if (width > widths[index]) widths[index] = width;
				}
			}
			const pad = (value, index) => value.padEnd(widths[index]);
			const lines = [`| ${escapedHeaders.map(pad).join(" | ")} |`, `|${widths.map((width) => "-".repeat(width + 2)).join("|")}|`];
			for (const row of rows) {
				lines.push(`| ${escapedHeaders.map((_, index) => pad(encodeMarkdownTableCell(row[index] ?? ""), index)).join(" | ")} |`);
			}
			return lines.join("\n");
		};
		markdownCell = (value) => value !== null && typeof value === "object" ? JSON.stringify(value) : value === undefined ? "" : String(value);
		formatKeyValueTable = (value) => renderTable(["Key", "Value"], Object.entries(value).map(([key, child]) => [key, markdownCell(child)]));
		formatObjectTable = (items) => {
			const headers = [];
			const seen = new Set();
			for (const item of items) for (const key of Object.keys(item)) if (!seen.has(key)) {
				seen.add(key);
				headers.push(key);
			}
			if (headers.length === 0) return markdownCell(items);
			return renderTable(headers, items.map((item) => headers.map((key) => markdownCell(Object.hasOwn(item, key) ? item[key] : undefined))));
		};
		formatMarkdown = (value, path = []) => {
			if (value == null && path.length === 0) return "";
			if (isScalar(value)) {
				if (path.length === 0) return escapeMarkdownText(String(value));
				return `${markdownHeading(path)}${escapeMarkdownText(String(value))}`;
			}
			if (Array.isArray(value)) {
				if (isObjectArray(value)) {
					const table = formatObjectTable(value);
					return path.length === 0 ? table : `${markdownHeading(path)}${table}`;
				}
				return formatMarkdown(markdownCell(value), path);
			}
			const object = value;
			const entries = Object.entries(object);
			if (path.length === 0 && isFlatObject(object)) return formatKeyValueTable(object);
			const needsHeadings = path.length > 0 || entries.length > 1 || entries.some(([, child]) => !isScalar(child));
			if (!needsHeadings) return formatKeyValueTable(object);
			return entries.map(([key, child]) => {
				const childPath = [...path, key];
				const heading = markdownHeading(childPath);
				if (isScalar(child)) return `${heading}${escapeMarkdownText(String(child))}`;
				if (isObjectArray(child)) return `${heading}${formatObjectTable(child)}`;
				if (isRecord(child)) {
					const nested = child;
					return isFlatObject(nested) ? `${heading}${formatKeyValueTable(nested)}` : formatMarkdown(nested, childPath);
				}
				return `${heading}${escapeMarkdownText(markdownCell(child))}`;
			}).join("\n\n");
		};
	})))();
}

//#endregion
//#region dist/cli/outputFilter.js
var splitPaths, keySegments, parsePath, parseOutputFilter;
function init_outputFilter() {
	return (init_outputFilter = __esmMin((() => {
		init_result();
		splitPaths = (expression) => {
			const paths = [];
			let current = "";
			let depth = 0;
			for (const character of expression) {
				if (character === "[") depth += 1;
				else if (character === "]") depth -= 1;
				if (character === "," && depth === 0) {
					paths.push(current);
					current = "";
				} else current += character;
			}
			if (current !== "") paths.push(current);
			return paths;
		};
		keySegments = (text) => text.split(".").filter((key) => key !== "").map((key) => ({ key }));
		parsePath = (text) => {
			const segments = [];
			let remaining = text;
			while (remaining.length > 0) {
				const open = remaining.indexOf("[");
				if (open === -1) {
					segments.push(...keySegments(remaining));
					break;
				}
				const close = remaining.indexOf("]", open);
				if (close === -1) return err({ kind: "unclosed_slice" });
				segments.push(...keySegments(remaining.slice(0, open)));
				const bounds = remaining.slice(open + 1, close).split(",");
				if (bounds.length > 2) return err({ kind: "extra_slice_bounds" });
				const [start, end] = bounds;
				segments.push({
					start: Number(start),
					end: Number(end)
				});
				remaining = remaining.slice(close + 1);
				if (remaining.startsWith(".")) remaining = remaining.slice(1);
			}
			return ok(segments);
		};
		parseOutputFilter = (expression) => {
			const paths = [];
			for (const text of splitPaths(expression)) {
				const path = parsePath(text);
				if (!path.ok) return path;
				paths.push(path.value);
			}
			return ok(paths);
		};
	})))();
}

//#endregion
//#region dist/cli/jsonOutput.js
/** The exact formatted document, including its final newline. */
function* jsonOutputParts(value, format, pretty = true) {
	if (format === "jsonl" && Array.isArray(value)) {
		for (const item of value) {
			yield* jsonParts(item);
			yield "\n";
		}
		return;
	}
	yield* jsonParts(value, pretty && format === "json");
	yield "\n";
}
var writeJsonOutput, writeOutputParts, isTerminalOutput, writeOutputText;
function init_jsonOutput() {
	return (init_jsonOutput = __esmMin((() => {
		init_jsonSerialization();
		writeJsonOutput = async (value, destination, format = "json") => {
			await writeOutputParts(destination, jsonOutputParts(value, format, isTerminalOutput(destination)));
		};
		writeOutputParts = async (destination, parts) => {
			for (const part of bufferedJsonParts(parts)) await writeOutputText(destination, part);
		};
		isTerminalOutput = (destination) => "isTTY" in destination && destination.isTTY === true;
		writeOutputText = (destination, part) => new Promise((resolve, reject) => {
			const onError = (cause) => reject(cause);
			destination.once("error", onError);
			try {
				destination.write(part, (cause) => {
					if (cause) {
						setImmediate(() => destination.off("error", onError));
						reject(cause);
					} else {
						destination.off("error", onError);
						resolve();
					}
				});
			} catch (cause) {
				destination.off("error", onError);
				reject(cause);
			}
		});
	})))();
}

//#endregion
//#region dist/cli/jsonLines.js
function* jsonLinesParts(plan) {
	for (const record of jsonLinesRecords(plan)) {
		yield* jsonLineParts(record);
	}
}
/** One record stays one line even when the record itself is an array. */
function* jsonLineParts(record) {
	yield* jsonParts(record);
	yield "\n";
}
/** Newline-separated records also bound the token estimator's working set. */
function* jsonLinesRecords(plan) {
	yield* plan.records;
	if (plan.context !== undefined || plan.path.length > 0) {
		const metadata = {
			$rea: JSON_LINES_PROTOCOL,
			type: "metadata",
			records: {
				path: plan.path,
				emitted: plan.records.length,
				source: plan.sourceRecords,
				...plan.filter === undefined ? {} : { filter: plan.filter }
			},
			context: plan.context ?? null
		};
		yield metadata;
	}
}
var JSON_LINES_PROTOCOL, COLLECTION_KEYS, RECORD_BOUNDARIES, RECORD_BOUNDARY_PATHS, JSON_LINES_SELECTION_REMEDIATION, atPath, examineBoundaries, shapeOf, observe, describe, selectionPaths, withoutRecords, selectCollection, prepareJsonLines, jsonLinesErrorRecord;
function init_jsonLines() {
	return (init_jsonLines = __esmMin((() => {
		init_result();
		init_analysisErrorCore();
		init_jsonSerialization();
		JSON_LINES_PROTOCOL = "jsonl/v1";
		COLLECTION_KEYS = [
			"rows",
			"items",
			"records",
			"occurrences"
		];
		RECORD_BOUNDARIES = "JSON Lines needs a top-level array, or exactly one rows, items, records, or occurrences array directly in the result, under page, or under normalized_result.";
		RECORD_BOUNDARY_PATHS = [
			[],
			["page"],
			["normalized_result"],
			["normalized_result", "page"]
		];
		JSON_LINES_SELECTION_REMEDIATION = "Use --format json for the complete document, or select one record collection with --filter-output.";
		atPath = (value, path) => {
			for (const key of path) {
				if (!isRecord(value) || !Object.hasOwn(value, key)) return undefined;
				value = value[key];
			}
			return value;
		};
		examineBoundaries = (value, fullOutput) => {
			const prefix = fullOutput ? ["data"] : [];
			const data = atPath(value, prefix);
			const found = [];
			const rejected = [];
			for (const boundary of RECORD_BOUNDARY_PATHS) {
				const object = atPath(data, boundary);
				const path = [...prefix, ...boundary];
				if (Array.isArray(object) && boundary.at(-1) !== "page") found.push({
					records: object,
					path
				});
				if (!isRecord(object)) continue;
				for (const key of COLLECTION_KEYS) {
					if (!Object.hasOwn(object, key)) continue;
					const records = object[key];
					if (Array.isArray(records)) found.push({
						records,
						path: [...path, key]
					});
					else rejected.push(observe([...path, key], records));
				}
			}
			return {
				found,
				rejected
			};
		};
		shapeOf = (value) => {
			if (value === null) return "null";
			if (Array.isArray(value)) return "array";
			switch (typeof value) {
				case "object": return "object";
				case "string": return "string";
				case "boolean": return "boolean";
				case "number":
				case "bigint": return "number";
				default: return "absent";
			}
		};
		observe = (path, value) => ({
			path,
			shape: shapeOf(value)
		});
		describe = ({ path, shape }) => `${path.length === 0 ? "the result" : path.join(".")} is ${shape === "absent" || shape === "null" ? shape : shape === "array" || shape === "object" ? `an ${shape}` : `a ${shape}`}`;
		selectionPaths = (paths) => {
			const selected = new Map();
			for (const path of paths ?? []) {
				const keys = [];
				for (const segment of path) {
					if (!("key" in segment)) break;
					keys.push(segment.key);
				}
				selected.set(JSON.stringify(keys), keys);
			}
			return [...selected.values()];
		};
		withoutRecords = (source, selected, path, filtered) => {
			if (path.length === 0 || !isRecord(source)) return undefined;
			const context = { ...source };
			const selectedObject = isRecord(selected) ? selected : undefined;
			if (filtered && Object.hasOwn(source, "evidence_id") && typeof source.evidence_id === "string" && Object.hasOwn(source, "normalized_result")) {
				if (selectedObject && Object.hasOwn(selectedObject, "raw_result")) context.raw_result = selectedObject.raw_result;
				else delete context.raw_result;
			}
			const [key, ...rest] = path;
			if (key === undefined) return context;
			if (rest.length === 0) delete context[key];
			else context[key] = withoutRecords(source[key], selectedObject?.[key], rest, filtered);
			return context;
		};
		selectCollection = (selected, source, options, { found, rejected }) => {
			const prefix = options.fullOutput === true ? ["data"] : [];
			const filtered = options.filter !== undefined;
			const selections = selectionPaths(options.filterPaths).filter((path) => path.length > 0);
			const subject = filtered && selections.length > 0 ? `The --filter-output selection ${selections.map((path) => path.join(".")).join(", ")}` : "The command result";
			const refuse = (statement, observed, rule) => {
				const observation = `${subject} ${statement}: ${observed.map(describe).join("; ")}.`;
				return err(new AnalysisInputError(options.command, {
					userMessage: `${observation} ${rule}`,
					remediationAction: JSON_LINES_SELECTION_REMEDIATION
				}, [{
					path: [filtered ? "filter-output" : "format"],
					reason: "invalid_value",
					message: observation,
					observed: observed.map(({ path, shape }) => ({
						path: [...path],
						shape
					}))
				}]));
			};
			if (found.length > 1) return refuse("is not one JSON Lines record collection", found.map(({ path }) => observe(path, [])), "Select one with --filter-output.");
			const [collection] = found;
			if (collection === undefined) {
				const [selection] = selections;
				const observed = rejected.length > 0 ? rejected : [selections.length === 1 && selection !== undefined ? observe([...prefix, ...selection], atPath(atPath(source, prefix), selection)) : observe(prefix, atPath(selected, prefix))];
				return refuse("is not a JSON Lines record collection", observed, RECORD_BOUNDARIES);
			}
			for (const [index, record] of collection.records.entries()) {
				if (isRecord(record) && Object.hasOwn(record, "$rea")) return refuse("uses the field JSON Lines reserves for control records", [observe([
					...collection.path,
					index,
					"$rea"
				], record.$rea)], "Nested $rea values are ordinary data.");
			}
			return ok(collection);
		};
		prepareJsonLines = (selected, options) => {
			const fullOutput = options.fullOutput === true;
			const examination = examineBoundaries(selected, fullOutput);
			const source = Object.hasOwn(options, "source") ? options.source : selected;
			const chosen = selectCollection(selected, source, options, examination);
			if (!chosen.ok) return chosen;
			const collection = chosen.value;
			const originalRecords = atPath(source, collection.path);
			const sourceMatches = Array.isArray(originalRecords);
			let context = withoutRecords(sourceMatches ? source : selected, selected, collection.path, options.filter !== undefined);
			if (options.filter !== undefined && sourceMatches) {
				for (const peer of examineBoundaries(source, fullOutput).found) {
					if (peer.path.join(".") !== collection.path.join(".")) context = withoutRecords(context, selected, peer.path, true);
				}
			}
			return ok({
				...collection,
				context,
				sourceRecords: sourceMatches ? originalRecords.length : null,
				filter: options.filter
			});
		};
		jsonLinesErrorRecord = (result) => ({
			$rea: JSON_LINES_PROTOCOL,
			type: "error",
			ok: false,
			result
		});
	})))();
}

//#endregion
//#region dist/domain/versionReport.js
var versionReportSchema, versionReport;
function init_versionReport() {
	return (init_versionReport = __esmMin((() => {
		init_runtimeVersion();
		versionReportSchema = z.strictObject({
			name: z.string(),
			version: z.string(),
			runtime: z.discriminatedUnion("id", [z.strictObject({
				id: z.literal("node"),
				version: z.string()
			}), z.strictObject({
				id: z.literal("bun"),
				version: z.string(),
				node_compatibility_version: z.string()
			})]),
			platform: z.string(),
			architecture: z.string(),
			supported_runtime: z.strictObject({
				range: z.string(),
				satisfied: z.boolean()
			})
		});
		versionReport = (host) => {
			const runtime = javaScriptRuntime(host.versions);
			return {
				name: host.packageName,
				version: host.packageVersion,
				runtime: runtime.id === "node" ? {
					id: "node",
					version: runtime.version
				} : {
					id: "bun",
					version: runtime.version,
					node_compatibility_version: runtime.nodeCompatibilityVersion
				},
				platform: host.platform,
				architecture: host.architecture,
				supported_runtime: {
					range: SUPPORTED_NODE_VERSION_RANGE,
					satisfied: supportsJavaScriptRuntime(runtime)
				}
			};
		};
	})))();
}

//#endregion
//#region dist/cliConfiguration.js
var cliConfigurationError;
function init_cliConfiguration() {
	return (init_cliConfiguration = __esmMin((() => {
		init_processStart();
		init_analysisErrorProjection();
		cliConfigurationError = (selectedEnvironment) => {
			const value = selectedEnvironment.REA_LOG_LEVEL;
			if (value === undefined) return undefined;
			const level = parseLogLevel(value);
			return level.ok ? undefined : projectAnalysisError(level.error).message;
		};
	})))();
}

//#endregion
//#region dist/cliOutput.js
var UNSUPPORTED_OUTPUT_COMBINATION_MESSAGE, CLI_DOCUMENT_OUTPUT_FORMATS, CLI_OUTPUT_FORMATS, CLI_OUTPUT_FORMAT_SET, isCliOutputFormat, renderCliDocument, cliOutputValueRejection, parseCliOutputArguments, readCliOutputArguments, missingCliOutputValueMessage, discoveryRowFormatFlag, validateCliOutputControls, renderEmptyFilteredCliOutput, renderCliOutputArgumentError, renderVersionReport;
function init_cliOutput() {
	return (init_cliOutput = __esmMin((() => {
		init_cliBuiltinArguments();
		init_explicitSensitiveValues();
		init_cliOutputFormatter();
		init_outputFilter();
		init_jsonOutput();
		init_jsonLines();
		init_versionReport();
		init_cliConfiguration();
		UNSUPPORTED_OUTPUT_COMBINATION_MESSAGE = "Token windows cannot preserve structured output. Remove --token-limit/--token-offset and use --filter-output or command pagination.";
		CLI_DOCUMENT_OUTPUT_FORMATS = [
			"toon",
			"json",
			"yaml",
			"md",
			"jsonl"
		];
		CLI_OUTPUT_FORMATS = [
			...CLI_DOCUMENT_OUTPUT_FORMATS,
			"csv",
			"tsv"
		];
		CLI_OUTPUT_FORMAT_SET = new Set(CLI_OUTPUT_FORMATS);
		isCliOutputFormat = (value) => CLI_OUTPUT_FORMAT_SET.has(value);
		renderCliDocument = (value, format, stdoutIsTerminal) => format === "json" || format === "jsonl" ? [...jsonOutputParts(value, format, stdoutIsTerminal)].join("") : `${formatCliOutput(value, format)}\n`;
		cliOutputValueRejection = (flag, value) => {
			if (flag === "--format") return CLI_OUTPUT_FORMAT_SET.has(value) ? undefined : `Invalid format: "${value}". Expected one of: ${[...CLI_OUTPUT_FORMAT_SET].join(", ")}`;
			if (flag === "--columns") {
				const columns = value.split(",").map((column) => column.trim());
				return columns.length > 0 && columns.every((column) => column.length > 0) && new Set(columns).size === columns.length ? undefined : `Invalid value for --columns: "${value}". Expected unique, nonempty comma-separated column names.`;
			}
			if ((flag === "--token-limit" || flag === "--token-offset") && (!/^[0-9]+$/u.test(value) || !Number.isSafeInteger(Number(value)))) return `Invalid value for ${flag}: "${value}". Expected a nonnegative safe integer.`;
			return undefined;
		};
		parseCliOutputArguments = (arguments_) => readCliOutputArguments(parseCliGlobalArguments(arguments_));
		readCliOutputArguments = (global) => {
			const tokens = global.arguments;
			const values = new Set(global.outputValues.map(({ index }) => index));
			const timing = new Set(global.timingIndices);
			const rootVersion = global.flags.has("--version");
			let format = "toon";
			let versionEligible = true;
			let formatExplicit = false;
			let filterOutput;
			let columns;
			let fullOutput = false;
			let missingValue;
			let invalidValue;
			let tokenCount = false;
			let tokenLimit;
			let tokenOffset;
			for (let index = 0; index < tokens.length; index += 1) {
				const argument = tokens[index];
				if (values.has(index) || timing.has(index)) continue;
				if (argument !== "--version" && argument !== "--json" && argument !== "--format") versionEligible = false;
				if (argument === "--json") {
					format = "json";
					formatExplicit = true;
					continue;
				}
				if (argument === "--full-output") fullOutput = true;
				if (argument === "--token-count") tokenCount = true;
				if (!VALUED_OUTPUT_FLAGS.has(argument)) continue;
				const value = values.has(index + 1) ? tokens[index + 1] : undefined;
				if (value === undefined) {
					missingValue ??= argument;
					continue;
				}
				const rejection = cliOutputValueRejection(argument, value);
				if (rejection !== undefined) {
					invalidValue ??= rejection;
					continue;
				}
				if (argument === "--format" && isCliOutputFormat(value)) {
					format = value;
					formatExplicit = true;
				} else if (argument === "--filter-output") filterOutput = value;
				else if (argument === "--columns") columns = value.split(",").map((column) => column.trim());
				else if (argument === "--token-limit") tokenLimit = Number(value);
				else if (argument === "--token-offset") tokenOffset = Number(value);
			}
			const parseError = invalidValue !== undefined;
			const controls = {
				filterOutput,
				filterPaths: filterOutput === undefined ? undefined : parseOutputFilter(filterOutput),
				columns,
				format,
				formatExplicit,
				fullOutput,
				missingValue,
				invalidValue: invalidValue === undefined ? undefined : redactExplicitText(invalidValue, declaredSensitiveValues(global.command)),
				tokenCount,
				tokenWindow: !parseError && (tokenLimit !== undefined || tokenOffset !== undefined),
				tokenLimit: parseError ? undefined : tokenLimit,
				tokenOffset: parseError ? undefined : tokenOffset
			};
			return {
				...controls,
				validation: validateCliOutputControls(controls, rootVersion, global),
				versionReportFormat: rootVersion && versionEligible && formatExplicit && !parseError && missingValue === undefined && format !== "csv" && format !== "tsv" && isCliOutputFormat(format) ? format : undefined
			};
		};
		missingCliOutputValueMessage = (flag) => `${flag} requires a value, as in ${flag} <value> or ${flag}=<value>.`;
		discoveryRowFormatFlag = (global) => {
			const { command, flags } = global;
			const help = flags.has("--help") || flags.has("-h");
			if (flags.has("--update") && !help || flags.has("--mcp")) return undefined;
			if (flags.has("--llms-full")) return "--llms-full";
			if (flags.has("--llms")) return "--llms";
			if (flags.has("--version") && !help) return undefined;
			if (command.length === 0 || help) return undefined;
			if (flags.has("--schema")) return "--schema";
			return undefined;
		};
		validateCliOutputControls = ({ filterOutput, filterPaths, columns, format, missingValue, invalidValue, tokenWindow, tokenCount }, rootVersion, global) => {
			if (invalidValue !== undefined) return {
				ok: false,
				format: format === "yaml" || format === "jsonl" ? format : "json",
				code: "INVALID_OUTPUT_VALUE",
				message: invalidValue
			};
			if (filterPaths?.ok === false) return {
				ok: false,
				format: format === "yaml" || format === "jsonl" ? format : "json",
				code: "INVALID_OUTPUT_FILTER",
				message: filterPaths.error.kind === "unclosed_slice" ? "The --filter-output expression has a slice without a closing ]. Close the slice or remove --filter-output." : "The --filter-output expression has a slice with more than two bounds. Use [start,end]."
			};
			const delimited = format === "csv" || format === "tsv";
			if (missingValue !== undefined && (delimited || missingValue === "--columns")) return {
				ok: false,
				format: format === "yaml" || format === "jsonl" ? format : "json",
				code: "MISSING_OUTPUT_VALUE",
				message: missingCliOutputValueMessage(missingValue)
			};
			const discoveryFlag = delimited ? discoveryRowFormatFlag(global) : undefined;
			if (delimited && discoveryFlag !== undefined) return {
				ok: false,
				format: "json",
				code: "UNSUPPORTED_OUTPUT_COMBINATION",
				message: `${discoveryFlag} returns a complete document and does not support --format ${format}. Use --format json, yaml, md, toon, or jsonl; CSV/TSV output is available only for selected row collections.`
			};
			if (delimited && rootVersion) return {
				ok: false,
				format: "json",
				code: "UNSUPPORTED_OUTPUT_COMBINATION",
				message: "CSV/TSV output is available only for selected row collections, not --version."
			};
			if (delimited && (filterOutput === undefined || columns === undefined)) return {
				ok: false,
				format: "json",
				code: "UNSUPPORTED_OUTPUT_COMBINATION",
				message: "CSV/TSV output requires --filter-output <row-array-path> and --columns <column,...>; nested Evidence is not flattened."
			};
			if (!delimited && columns !== undefined) return {
				ok: false,
				format: format === "yaml" || format === "jsonl" ? format : "json",
				code: "UNSUPPORTED_OUTPUT_COMBINATION",
				message: "--columns is available only with --format csv or --format tsv."
			};
			if (delimited && (tokenWindow || tokenCount)) return {
				ok: false,
				format: "json",
				code: "UNSUPPORTED_OUTPUT_COMBINATION",
				message: "Token counting and token windows cannot preserve CSV/TSV records or metadata. Remove --token-count/--token-limit/--token-offset."
			};
			if (tokenWindow && (format === "json" || format === "jsonl" || format === "yaml")) return {
				ok: false,
				format,
				code: "UNSUPPORTED_OUTPUT_COMBINATION",
				message: UNSUPPORTED_OUTPUT_COMBINATION_MESSAGE
			};
			if (missingValue !== undefined) return {
				ok: false,
				format: format === "yaml" || format === "jsonl" ? format : "json",
				code: "MISSING_OUTPUT_VALUE",
				message: missingCliOutputValueMessage(missingValue)
			};
			return { ok: true };
		};
		renderEmptyFilteredCliOutput = ({ filterOutput, format, validation }) => {
			if (!validation.ok) return undefined;
			if (filterOutput && (format === "json" || format === "jsonl" || format === "yaml")) return "{}\n";
			return undefined;
		};
		renderCliOutputArgumentError = (error) => {
			const value = {
				ok: false,
				error: {
					code: error.code,
					message: error.message
				}
			};
			if (error.format === "yaml") return `ok: false\nerror:\n  code: ${error.code}\n  message: ${JSON.stringify(error.message)}\n`;
			return `${JSON.stringify(error.format === "jsonl" ? jsonLinesErrorRecord(value) : value)}\n`;
		};
		renderVersionReport = ({ versionReportFormat: format }, host, stdoutIsTerminal) => {
			return format === undefined ? undefined : renderCliDocument(versionReport(host), format, stdoutIsTerminal);
		};
	})))();
}

//#endregion
export { CLI_DOCUMENT_OUTPUT_FORMATS, CLI_OUTPUT_FORMATS, cliConfigurationError, containsUnpairedSurrogate, containsUnrepresentableMarkdown, delimitedOutputInputError, formatCliOutput, formatDelimitedOutputParts, hasUnpairedSurrogate, init_cliConfiguration, init_cliOutput, init_cliOutputFormatter, init_jsonLines, init_jsonOutput, isTerminalOutput, jsonLineParts, jsonLinesErrorRecord, jsonLinesParts, jsonLinesRecords, jsonOutputParts, missingCliOutputValueMessage, parseCliOutputArguments, prepareDelimitedOutput, prepareJsonLines, readCliOutputArguments, renderCliDocument, renderCliOutputArgumentError, renderEmptyFilteredCliOutput, renderVersionReport, writeJsonOutput, writeOutputParts, writeOutputText };