import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_isRecord, init_jsonValue, init_sha256Hex, isRecord, jsonValueSchema, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { compositeKey, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { escapeJsonPointerToken, init_jsonPointer, unescapeJsonPointerToken } from "./jsonPointer-aolC6MvJ.js";
import { init_jsonRecord, jsonRecordSchema } from "./jsonRecord-Cuy_NNu4.js";
import { describeValidationFailure, init_validationFailure } from "./nativeValueFlow-13oOEkkJ.js";
import { boundedList, init_boundedList } from "./boundedList-D6JdQAuV.js";
import { DESKTOP_VIEW_DEFAULTS, desktopViewByteDisplay, detectStateFormat, init_desktopViewPolicy, init_stateFormats, textualView } from "./x11Windows-Cx5-JOUb.js";
import { init_portableBundleName, isPortableBundleName } from "./portableBundleName-DrrdjNIx.js";
import { z } from "zod";
import { gunzipSync, gzipSync, inflateRawSync } from "node:zlib";

//#region dist/domain/desktop/gzipDocument.js
var UNKNOWN_OS, FHCRC, FEXTRA, FNAME, FCOMMENT, NOT_READ_INSIDE, UNREADABLE_GZIP, isGzip, gunzip, pastZero, hasExtraField, readLimit, gzipAt, gzipDeterministic, tooLarge, openStateDocument, compressionOf;
function init_gzipDocument() {
	return (init_gzipDocument = __esmMin((() => {
		init_result();
		init_stateFormats();
		init_desktopViewPolicy();
		UNKNOWN_OS = 255;
		FHCRC = 2;
		FEXTRA = 4;
		FNAME = 8;
		FCOMMENT = 16;
		NOT_READ_INSIDE = {
			sqlite: "a SQLite database",
			dconf: "a dconf database"
		};
		UNREADABLE_GZIP = "not a readable gzip stream";
		isGzip = (bytes) => bytes[0] === 31 && bytes[1] === 139 && bytes[2] === 8;
		gunzip = (bytes, limit) => {
			try {
				return ok(gunzipSync(bytes, { maxOutputLength: limit }));
			} catch (error) {
				return err(error.code === "ERR_BUFFER_TOO_LARGE" ? "too_large" : "unreadable");
			}
		};
		pastZero = (bytes, start) => {
			const zero = bytes.indexOf(0, start);
			return zero === -1 ? bytes.length : zero + 1;
		};
		hasExtraField = (bytes) => {
			for (let start = 0; isGzip(bytes.subarray(start));) {
				const flags = bytes[start + 3] ?? 0;
				if ((flags & FEXTRA) !== 0) return true;
				let data = start + 10;
				if ((flags & FNAME) !== 0) data = pastZero(bytes, data);
				if ((flags & FCOMMENT) !== 0) data = pastZero(bytes, data);
				if ((flags & FHCRC) !== 0) data += 2;
				const { engine } = inflateRawSync(bytes.subarray(data), { info: true });
				start = data + engine.bytesWritten + 8;
			}
			return false;
		};
		readLimit = (size, policy = DESKTOP_VIEW_DEFAULTS) => Math.min(policy.zip_entry_bytes, policy.zip_ratio * size);
		gzipAt = (bytes, level) => {
			const compressed = gzipSync(bytes, { level });
			compressed[9] = UNKNOWN_OS;
			return compressed;
		};
		gzipDeterministic = (document) => {
			const deflated = gzipAt(document, 1);
			return document.length > readLimit(deflated.length) && document.length <= DESKTOP_VIEW_DEFAULTS.zip_entry_bytes ? gzipAt(document, 0) : deflated;
		};
		tooLarge = (size, policy) => policy.zip_ratio * size < policy.zip_entry_bytes ? `expands more than ${String(policy.zip_ratio)} times, so it is not read` : `larger than the ${desktopViewByteDisplay(policy.zip_entry_bytes)} a compressed document's view reads`;
		openStateDocument = (path, bytes, policy = DESKTOP_VIEW_DEFAULTS) => {
			if (!isGzip(bytes)) return {
				format: detectStateFormat(path, bytes, policy),
				bytes
			};
			const inner = gunzip(bytes, readLimit(bytes.length, policy));
			if (!inner.ok) return {
				format: null,
				compression: "gzip",
				error: inner.error === "too_large" ? tooLarge(bytes.length, policy) : UNREADABLE_GZIP
			};
			const format = detectStateFormat(path, inner.value, policy);
			const inside = NOT_READ_INSIDE[format];
			return inside === undefined ? {
				format,
				bytes: inner.value,
				compression: "gzip"
			} : {
				format,
				compression: "gzip",
				error: `${inside} inside a gzip file is not read`
			};
		};
		compressionOf = (document) => document.compression === undefined ? {} : { compression: document.compression };
	})))();
}

//#endregion
//#region dist/domain/desktop/viewSelector.js
var MAX_INSIDE_STEPS, insideSteps, spellCondition, bracketed, selectorOf;
function init_viewSelector() {
	return (init_viewSelector = __esmMin((() => {
		MAX_INSIDE_STEPS = 3;
		insideSteps = (key) => {
			const steps = key.split("/");
			return steps.length <= 3 && !steps.includes("") ? steps : undefined;
		};
		spellCondition = ({ prefix, key, value }) => `[${prefix}${key}=${value}]`;
		bracketed = (segment) => segment.length >= 2 && segment.startsWith("[") && segment.endsWith("]");
		selectorOf = (segment) => {
			if (!bracketed(segment)) return undefined;
			const conditions = [];
			for (const part of segment.slice(1, -1).split("][")) {
				const equals = part.indexOf("=");
				const key = equals < 0 ? "" : part.slice(0, equals);
				const prefix = key.startsWith("@") ? "@" : key.startsWith(">") ? ">" : "";
				const name = key.slice(prefix.length);
				if (name === "" || prefix === ">" && insideSteps(name) === undefined) return undefined;
				conditions.push({
					prefix,
					key: name,
					value: part.slice(equals + 1)
				});
			}
			return conditions;
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTask.js
var DRAFT_PROMPT, line, lines, count, where, comparison, table, wholeText, collapseWhitespace, kind, READER_FILE_PLACEHOLDER, readerField, checkSchema, READER_TIMEOUT_S, readerSchema, desktopTaskSchema, READER_KINDS, countComparison, isPointerCheck, isHomePath, ISO_TIMESTAMP, ASCTIME_TIMESTAMP, isTimestamp, expectedValues, pointerProblem, checkProblem, readerProblem, readersProblem, screenProblem, parseDesktopTask;
function init_appTask() {
	return (init_appTask = __esmMin((() => {
		init_portableBundleName();
		init_jsonRecord();
		init_jsonValue();
		init_result();
		init_validationFailure();
		init_viewSelector();
		DRAFT_PROMPT = "REPLACE: what the user asks to have done in the app, in their own words.";
		line = z.string().refine((value) => !value.includes("\n"), "a line cannot hold a line break");
		lines = z.array(line).min(1).max(100);
		count = z.int().min(0);
		where = jsonRecordSchema(jsonValueSchema, z.string().min(1)).refine((columns) => Object.keys(columns).length > 0, "name at least one column");
		comparison = {
			equals: count.optional(),
			at_least: count.optional(),
			at_most: count.optional()
		};
		table = z.string().min(1);
		wholeText = {
			pointer: z.string(),
			value: z.string(),
			normalize_whitespace: z.boolean().optional(),
			text_attribute: z.string().min(1).optional().describe("Read the element's text from this attribute's values on it and its descendants, in document order, instead of from its text nodes.")
		};
		collapseWhitespace = (text) => text.replace(/[ \t\r\n]+/gu, " ").replace(/^ | $/gu, "");
		kind = (name, shape) => z.strictObject({
			id: z.string().min(1).max(64).optional(),
			kind: z.literal(name),
			file: z.string().min(1),
			...shape
		});
		READER_FILE_PLACEHOLDER = "{file}";
		readerField = { reader: z.string().min(1).optional().describe("The id of one of the task's readers: the check reads that reader's view of its file instead of the file's own. Give the reader's file as file.") };
		checkSchema = z.discriminatedUnion("kind", [
			kind("file_present", {}),
			kind("file_absent", {}),
			kind("lines_present", {
				lines,
				...readerField
			}),
			kind("lines_absent", {
				lines,
				...readerField
			}),
			kind("line_count", {
				exact: line.optional(),
				contains: line.optional(),
				...comparison,
				...readerField
			}),
			kind("value_equals", {
				pointer: z.string(),
				value: jsonValueSchema,
				tolerance: z.number().min(0).optional(),
				...readerField
			}),
			kind("value_absent", {
				pointer: z.string(),
				...readerField
			}),
			kind("text_equals", wholeText),
			kind("text_contains", {
				...wholeText,
				value: z.string().min(1)
			}),
			kind("row_present", {
				table,
				where
			}),
			kind("row_absent", {
				table,
				where
			}),
			kind("row_count", {
				table,
				where: where.optional(),
				...comparison
			}),
			kind("member_count", {
				pointer: z.string(),
				matching: z.string().optional().describe("A selector of one or more [KEY=VALUE], [@KEY=VALUE] or [>PATH=VALUE] conditions that a member must meet to count, where PATH is up to three /-separated steps inside the member. For XML, [>text()=VALUE] compares the member's whole text with whitespace collapsed. Every member counts without a selector, text nodes of an XML element's children included."),
				...comparison,
				...readerField
			}),
			z.strictObject({
				id: z.string().min(1).max(64).optional(),
				kind: z.literal("screen_judge"),
				question: z.string().trim().min(1).max(2e3).describe("A yes-or-no question about the app's screen that the task done makes true and the seed makes false, such as Does the display show 8.568?; a model judges it on a screenshot, for state no file shows.")
			})
		]);
		READER_TIMEOUT_S = {
			default: 60,
			max: 300
		};
		readerSchema = z.strictObject({
			id: z.string().regex(/^[a-z0-9][a-z0-9\x2d]{0,63}$/u).describe("Lowercase letters, digits and hyphens; a check names the reader by it."),
			file: z.string().min(1).describe("The file the reader reads, a path under the home such as Documents/poster.xcf."),
			argv: z.array(z.string().min(1)).min(1).max(64).describe(`The app's own headless command, run in the computer on a private copy of the file that ${READER_FILE_PLACEHOLDER} names, in a fresh home without the display; each line it prints starting with "REA " is a line of its view.`),
			stdin: z.string().max(64 * 1024).optional().describe(`Text sent to the command's stdin, where ${READER_FILE_PLACEHOLDER} also names the copy.`),
			output: z.enum(["json", "lines"]).describe("json: the marked lines, joined, are one JSON value that value_equals, value_absent and member_count point into; lines: they are the lines lines_present, lines_absent and line_count read."),
			timeout_s: z.int().min(1).max(READER_TIMEOUT_S.max).optional().describe(`Seconds the command may run, ${String(READER_TIMEOUT_S.default)} when omitted.`),
			display: z.boolean().optional().describe("Run the command with the desktop's display, for an app without a headless mode; off when omitted.")
		});
		desktopTaskSchema = z.strictObject({
			name: z.string().min(1),
			prompt: z.string().trim().min(1),
			checks: z.array(checkSchema).min(1).max(32),
			readers: z.array(readerSchema).min(1).max(8).optional().describe("Commands that read a file REA cannot read itself, such as a binary document, with the app's own headless mode; a check reads one's view by naming it in reader.")
		});
		READER_KINDS = {
			json: [
				"value_equals",
				"value_absent",
				"member_count"
			],
			lines: [
				"lines_present",
				"lines_absent",
				"line_count"
			]
		};
		countComparison = (check) => {
			const given = [
				"equals",
				"at_least",
				"at_most"
			].flatMap((operator) => check[operator] === undefined ? [] : [{
				operator,
				n: check[operator]
			}]);
			return given.length === 1 ? given[0] : undefined;
		};
		isPointerCheck = (check) => check.kind === "value_equals" || check.kind === "value_absent" || check.kind === "text_equals" || check.kind === "text_contains" || check.kind === "member_count";
		isHomePath = (path) => path.split("/").every((segment) => segment !== "" && segment !== "." && segment !== "..");
		ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:[.,]\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?$/u;
		ASCTIME_TIMESTAMP = /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [ 0-3]?\d \d{2}:\d{2}:\d{2} \d{4}$/u;
		isTimestamp = (value) => {
			if (typeof value !== "string") return false;
			const trimmed = value.trim();
			return ISO_TIMESTAMP.test(trimmed) || ASCTIME_TIMESTAMP.test(trimmed);
		};
		expectedValues = (check) => {
			switch (check.kind) {
				case "value_equals":
				case "text_equals":
				case "text_contains": return [check.value];
				case "row_present":
				case "row_absent":
				case "row_count": return Object.values(check.where ?? {});
				default: return [];
			}
		};
		pointerProblem = (check) => {
			if (check.pointer === "") return check.kind === "member_count" ? undefined : "the empty pointer names the whole file; point at the value that changed";
			if (!check.pointer.startsWith("/")) return `pointer ${JSON.stringify(check.pointer)} must start with /`;
			return check.kind === "text_contains" && check.normalize_whitespace === true && collapseWhitespace(check.value) === "" ? "text_contains needs a value with more than whitespace in it" : undefined;
		};
		checkProblem = (check) => {
			if (!isHomePath(check.file)) return `file ${JSON.stringify(check.file)} must be a path under the home, such as Documents/todo.txt, without a leading slash, . or .. segments`;
			if (check.kind === "line_count" && check.exact === undefined === (check.contains === undefined)) return "line_count takes exactly one of exact and contains";
			if ((check.kind === "line_count" || check.kind === "row_count" || check.kind === "member_count") && countComparison(check) === undefined) return `${check.kind} takes exactly one of equals, at_least and at_most`;
			const pointed = isPointerCheck(check) ? pointerProblem(check) : undefined;
			if (pointed !== undefined) return pointed;
			if (check.kind === "member_count" && check.matching !== undefined && selectorOf(check.matching) === undefined) return `matching ${JSON.stringify(check.matching)} is not a selector of one or more [KEY=VALUE], [@KEY=VALUE] or [>PATH=VALUE], a PATH of one to three steps`;
			if ((check.kind === "lines_present" || check.kind === "lines_absent") && new Set(check.lines).size !== check.lines.length) return "it lists a line twice";
			if (check.kind === "value_equals" && check.tolerance !== undefined && typeof check.value !== "number") return "tolerance compares numbers, so value must be a number";
			const stamped = expectedValues(check).find(isTimestamp);
			return stamped === undefined ? undefined : `${JSON.stringify(stamped)} looks like a time the app stamps; leave volatile values out of checks`;
		};
		readerProblem = (reader) => {
			if (!isHomePath(reader.file)) return `file ${JSON.stringify(reader.file)} must be a path under the home, such as Documents/poster.xcf, without a leading slash, . or .. segments`;
			return [...reader.argv, reader.stdin ?? ""].some((part) => part.includes("{file}")) ? undefined : `its argv and stdin name no ${READER_FILE_PLACEHOLDER}, the copy of ${reader.file} it reads`;
		};
		readersProblem = (readers, checks) => {
			const ids = readers.map((reader) => reader.id);
			const repeated = ids.find((id, index) => ids.indexOf(id) !== index);
			if (repeated !== undefined) return `two readers have the id ${JSON.stringify(repeated)}.`;
			for (const reader of readers) {
				const problem = readerProblem(reader);
				if (problem !== undefined) return `reader ${JSON.stringify(reader.id)}: ${problem}.`;
			}
			for (const check of checks) {
				if (!("reader" in check) || check.reader === undefined) continue;
				const reader = readers.find(({ id }) => id === check.reader);
				if (reader === undefined) return `check ${JSON.stringify(check.id)} names reader ${JSON.stringify(check.reader)}, which the task does not define in readers.`;
				if (check.file !== reader.file) return `check ${JSON.stringify(check.id)} reads ${reader.id}, so its file is ${reader.file}, not ${check.file}.`;
				const kinds = READER_KINDS[reader.output];
				if (!kinds.includes(check.kind)) return `check ${JSON.stringify(check.id)} is ${check.kind}, but reader ${reader.id} reads ${reader.output}, which ${kinds.join(", ").replace(/, (?=[^,]*$)/u, " and ")} check.`;
			}
			const unread = readers.find((reader) => !checks.some((check) => "reader" in check && check.reader === reader.id));
			return unread === undefined ? undefined : `reader ${JSON.stringify(unread.id)} is read by no check; remove it or name it in a check's reader.`;
		};
		screenProblem = (checks, readers) => {
			if (!checks.some(({ kind }) => kind === "screen_judge")) return undefined;
			if (checks.some(({ kind }) => kind !== "screen_judge")) return "a task with screen_judge checks holds only screen_judge checks: they judge state no file shows, so a change a file shows is checked in that file instead.";
			return readers === undefined ? undefined : "a task with screen_judge checks takes no readers.";
		};
		parseDesktopTask = (value) => {
			const parsed = desktopTaskSchema.safeParse(value);
			if (!parsed.success) return err(describeValidationFailure(parsed.error));
			const { name, prompt, checks, readers } = parsed.data;
			if (!isPortableBundleName(name) || name === "smoke") return err(`name ${JSON.stringify(name)} must be a portable bundle name other than smoke: lowercase letters, digits and hyphens.`);
			if (prompt.trim() === "REPLACE: what the user asks to have done in the app, in their own words.") return err("prompt is still the draft's placeholder; write the user's request.");
			const settled = checks.map((check, index) => ({
				...check,
				id: check.id ?? `check-${String(index + 1)}`
			}));
			const ids = settled.map((check) => check.id);
			const repeated = ids.find((id, index) => ids.indexOf(id) !== index);
			if (repeated !== undefined) return err(`two checks have the id ${JSON.stringify(repeated)}.`);
			for (const check of settled) {
				const problem = check.kind === "screen_judge" ? undefined : checkProblem(check);
				if (problem !== undefined) return err(`check ${JSON.stringify(check.id)}: ${problem}.`);
			}
			const problem = screenProblem(settled, readers) ?? readersProblem(readers ?? [], settled);
			if (problem !== undefined) return err(problem);
			return ok({
				name,
				prompt: prompt.trim(),
				checks: settled,
				...readers === undefined ? {} : { readers }
			});
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/attributeRank.js
var isIdentifyingAttribute, VIEW_STATE, isViewStateName, localName, NAME_LIKE, STYLE_NAME, HEX_TOKEN, LONG_TOKEN, isPlaceholder, isRandomCaseId, isGuid, isGeneratedToken, isGeneratedId, isSaveNumberedId, isNameLikeKey, MEASURE, isAutomaticStyle, attributeTier, rankAttributes;
function init_attributeRank() {
	return (init_attributeRank = __esmMin((() => {
		isIdentifyingAttribute = (key) => /^(?:name|id|xid|.+:id)$/iu.test(key);
		VIEW_STATE = /cursor|^select$|selection|selected|current[-_]?(?:layer|frame|view|colou?r|page|tab|tool|index|item|row|column|cell|sheet|slide|object|scene|track)|scroll|zoom|viewport|window|splitter|toplevel|topleft|uidata|namedview|view-?settings|(?:list|tree)-?view|config(?:uration)?-?settings|printer|history|edit(?:ing)?-?(?:time|duration|cycles?)|last-?saved|generator|document-?statistic|preview|thumbnail/iu;
		isViewStateName = (name) => VIEW_STATE.test(name);
		localName = (key) => (key.split(":").at(-1) ?? key).toLowerCase();
		NAME_LIKE = /(?:name|title|label|caption)$/u;
		STYLE_NAME = /(?:style|font|family|class|type)-?name$/u;
		HEX_TOKEN = /^[0-9a-f-]{8,}$/iu;
		LONG_TOKEN = /^(?=.*\d)[A-Za-z0-9+/=_-]{16,}$/u;
		isPlaceholder = (value) => /^\(?(?:null|nil|none|undefined)\)?$/iu.test(value.trim());
		isRandomCaseId = (value) => /^u(?=[^]*[A-Z])(?=[^]*[a-z])[A-Za-z\d]{12}$/u.test(value) && (/\d/u.test(value) || (value.match(/\p{Ll}(?=\p{Lu})|\p{Lu}(?=\p{Ll})/gu)?.length ?? 0) >= 4);
		isGuid = (value) => /^\{?[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\}?$/iu.test(value);
		isGeneratedToken = (value) => HEX_TOKEN.test(value) || isGuid(value) || LONG_TOKEN.test(value) || isRandomCaseId(value);
		isGeneratedId = (value) => /^[A-Za-z]*[_-]?\d{6,}$/u.test(value) || isGeneratedToken(value);
		isSaveNumberedId = (key, value) => /^(?:xml|draw):id$/iu.test(key) && /^id\d+$/u.test(value);
		isNameLikeKey = (key) => {
			const local = localName(key);
			return NAME_LIKE.test(local) && !STYLE_NAME.test(local);
		};
		MEASURE = /^-?\d+(?:\.\d+)?(?:cm|mm|in|pt|pc|px|em|%)$/u;
		isAutomaticStyle = (key, value) => /style-name$/iu.test(key) && /^[A-Za-z]{1,4}\d+$/u.test(value);
		attributeTier = (key, value) => {
			if (isViewStateName(key) || isAutomaticStyle(key, value) || MEASURE.test(value)) return 3;
			if (isNameLikeKey(key)) return 0;
			if (/\p{L}/u.test(value) && !isGeneratedToken(value)) return 1;
			return /^-?\d{1,5}$/u.test(value) ? 2 : 3;
		};
		rankAttributes = (entries) => entries.map((entry) => ({
			...entry,
			tier: attributeTier(entry.key, entry.value)
		})).toSorted((left, right) => left.tier - right.tier);
	})))();
}

//#endregion
//#region dist/domain/desktop/viewPointer.js
var INDEX, own$2, isXmlElement, elementText, fieldOf, textWithoutStamps, conditionText, elementHolds, holdsInside, selects, selectorTest, arrayStep, locatePointer, readsChild, SHARED, normalSelector, selectorGroups, selectedMembers, memberLookup, resolvePointer;
function init_viewPointer() {
	return (init_viewPointer = __esmMin((() => {
		init_jsonPointer();
		init_appTask();
		init_viewSelector();
		INDEX = /^(?:0|[1-9][0-9]*)$/u;
		own$2 = (record, key) => Object.hasOwn(record, key) ? record[key] : undefined;
		isXmlElement = (value) => isRecord(value) && typeof value.name === "string" && isRecord(value.attributes) && Array.isArray(value.children);
		elementText = (element, attribute) => {
			const parts = [];
			const pending = [element];
			for (let node = pending.pop(); node !== undefined; node = pending.pop()) if (typeof node === "string") {
				if (attribute === undefined) parts.push(node);
			} else if (isXmlElement(node)) {
				const value = attribute === undefined ? undefined : own$2(node.attributes, attribute);
				if (typeof value === "string") parts.push(value);
				for (let index = node.children.length - 1; index >= 0; index -= 1) pending.push(node.children[index] ?? null);
			}
			return parts.join("");
		};
		fieldOf = (member, { prefix, key }) => {
			if (!isRecord(member) || prefix === ">") return undefined;
			const fields = prefix === "@" ? own$2(member, "attributes") : member;
			const value = isRecord(fields) ? own$2(fields, key) : undefined;
			return typeof value === "string" ? value : undefined;
		};
		textWithoutStamps = (node) => {
			if (typeof node === "string") return isTimestamp(node) ? "" : node;
			if (!isRecord(node) || !Array.isArray(node.children)) return "";
			return node.children.map((child) => textWithoutStamps(child)).join("");
		};
		conditionText = (child) => {
			const plain = collapseWhitespace(textWithoutStamps(child));
			return plain === "" ? collapseWhitespace(elementText(child)) : plain;
		};
		elementHolds = (element, steps, value) => {
			const [step = "", ...rest] = steps;
			const at = rest.length === 0 ? step.indexOf("@") : -1;
			const name = at < 0 ? step : step.slice(0, at);
			return element.children.some((child) => isXmlElement(child) && child.name === name && (rest.length > 0 ? elementHolds(child, rest, value) : at < 0 ? conditionText(child) === value : own$2(child.attributes, step.slice(at + 1)) === value));
		};
		holdsInside = (member, { key, value }, format) => {
			const steps = insideSteps(key) ?? [];
			if (format === "xml") return isXmlElement(member) && (steps.length === 1 && steps[0] === "text()" ? collapseWhitespace(elementText(member)) === value : elementHolds(member, steps, value));
			let found = member;
			for (const step of steps) found = isRecord(found) ? own$2(found, step) : undefined;
			return found === value;
		};
		selects = (member, conditions, format) => isRecord(member) && conditions.every((condition) => condition.prefix === ">" ? holdsInside(member, condition, format) : fieldOf(member, condition) === condition.value);
		selectorTest = (selector, format) => {
			const conditions = selectorOf(selector);
			return conditions === undefined ? undefined : (member) => selects(member, conditions, format);
		};
		arrayStep = (items, token, last, format) => {
			if (INDEX.test(token)) {
				const index = Number(token);
				return index < items.length ? { member: items[index] ?? null } : { kind: "none" };
			}
			const conditions = selectorOf(token);
			if (conditions === undefined) return bracketed(token) ? {
				kind: "unresolved",
				problem: `${token} is not a selector of the form [KEY=VALUE]`
			} : { kind: "none" };
			const matched = items.filter((item) => selects(item, conditions, format));
			if (matched.length === 1) return { member: matched[0] ?? null };
			if (matched.length > 1) return {
				kind: "unresolved",
				problem: `${token} matches ${String(matched.length)} members, not one`
			};
			const reason = `${token} matches no member`;
			return last ? {
				kind: "none",
				reason
			} : {
				kind: "unresolved",
				problem: reason
			};
		};
		locatePointer = (view, pointer, format) => {
			if (pointer === "") return {
				kind: "value",
				value: view,
				searched: [],
				byPosition: []
			};
			let current = view;
			let currentFormat = format;
			const segments = pointer.slice(1).split("/");
			const steps = {
				searched: [],
				byPosition: []
			};
			for (const [position, segment] of segments.entries()) {
				const token = unescapeJsonPointerToken(segment);
				if (Array.isArray(current)) {
					const array = segments.slice(0, position).map((part) => `/${part}`).join("");
					const indexed = INDEX.test(token);
					if (!indexed && selectorOf(token) !== undefined) steps.searched.push(array);
					const step = arrayStep(current, token, position === segments.length - 1, currentFormat);
					if ("kind" in step) return {
						...step,
						...steps
					};
					if (indexed && typeof step.member === "object" && step.member !== null) steps.byPosition.push(array);
					current = step.member;
				} else if (isRecord(current) && Object.hasOwn(current, token)) {
					if (format === "zip" && position === 2 && segments[0] === "entries" && token === "view") currentFormat = typeof current.format === "string" ? current.format : undefined;
					current = current[token] ?? null;
				} else return {
					kind: "none",
					...steps
				};
			}
			return {
				kind: "value",
				value: current,
				...steps
			};
		};
		readsChild = ({ prefix }) => prefix === ">";
		SHARED = Symbol("shared");
		normalSelector = (token) => {
			const conditions = selectorOf(token);
			if (conditions === undefined) return undefined;
			const byField = new Map();
			for (const condition of conditions) {
				const field = `${condition.prefix}${condition.key}`;
				const seen = byField.get(field);
				if (seen !== undefined && seen.value !== condition.value) return undefined;
				byField.set(field, condition);
			}
			return [...byField.keys()].sort().flatMap((field) => byField.get(field) ?? []);
		};
		selectorGroups = (tokens) => {
			const groups = new Map();
			for (const token of tokens) {
				if (INDEX.test(token)) continue;
				const conditions = normalSelector(token);
				if (conditions === undefined || conditions.some(readsChild)) continue;
				const fields = JSON.stringify(conditions.map(({ prefix, key }) => [prefix, key]));
				const values = JSON.stringify(conditions.map(({ value }) => value));
				const group = groups.get(fields) ?? {
					conditions,
					wanted: new Map()
				};
				groups.set(fields, group);
				const spellings = group.wanted.get(values);
				if (spellings === undefined) group.wanted.set(values, [token]);
				else spellings.push(token);
			}
			return groups.values();
		};
		selectedMembers = (items, tokens, format) => {
			const selected = new Map();
			const listed = [...tokens];
			for (const token of listed) {
				const meets = selectorOf(token)?.some(readsChild) ? selectorTest(token, format) : undefined;
				const matched = meets === undefined ? [] : items.filter(meets);
				if (matched.length === 1) selected.set(token, matched[0] ?? null);
			}
			for (const { conditions, wanted } of selectorGroups(listed)) {
				const found = new Map();
				for (const item of items) {
					const values = conditions.map((condition) => fieldOf(item, condition));
					if (values.some((value) => value === undefined)) continue;
					const key = JSON.stringify(values);
					if (wanted.has(key)) found.set(key, found.has(key) ? SHARED : item);
				}
				for (const [key, member] of found) if (member !== SHARED) for (const token of wanted.get(key) ?? []) selected.set(token, member);
			}
			return selected;
		};
		memberLookup = (value, tokens, format) => {
			if (!Array.isArray(value)) return (token) => isRecord(value) && Object.hasOwn(value, token) ? value[token] : undefined;
			const selected = selectedMembers(value, tokens, format);
			return (token) => INDEX.test(token) ? value[Number(token)] : selected.get(token);
		};
		resolvePointer = (view, pointer, format) => {
			const located = locatePointer(view, pointer, format);
			return located.kind === "value" ? located.value : undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/zipView.js
var UNREADABLE_ZIP, DAMAGED_ZIP_ENTRY, zipEntryRefusal, unreadZipEntry, entryView, zipEntry, zipView, entryLeavesOut, zipLeavesOut, zipEntryAt, VIEW_FORMATS, entryWithoutView, viewlessEntryAt, zipLeavesOutAt, zipArrayLeavesOut;
function init_zipView() {
	return (init_zipView = __esmMin((() => {
		init_result();
		init_stateFormats();
		init_viewPointer();
		init_desktopViewPolicy();
		init_sha256Hex();
		UNREADABLE_ZIP = "not a readable zip archive";
		DAMAGED_ZIP_ENTRY = "its compressed data is damaged";
		zipEntryRefusal = (header, spent, policy = DESKTOP_VIEW_DEFAULTS) => {
			if (header.encrypted) return "encrypted, so it is not read";
			if (header.method !== 0 && header.method !== 8) return `compressed with method ${String(header.method)}, which the view does not read`;
			if (header.size > policy.zip_entry_bytes) return `larger than the ${desktopViewByteDisplay(policy.zip_entry_bytes)} an entry's view reads`;
			if (header.size > policy.zip_ratio * header.compressedSize) return `expands more than ${String(policy.zip_ratio)} times, so it is not read`;
			if (spent + header.size > policy.zip_bytes) return `past the ${desktopViewByteDisplay(policy.zip_bytes)} read from one archive`;
			return undefined;
		};
		unreadZipEntry = (header, error) => ({
			name: header.name,
			size: header.size,
			sha256: null,
			format: null,
			view: null,
			view_error: error
		});
		entryView = (format, bytes, policy) => {
			switch (format) {
				case "text":
				case "json":
				case "keyfile":
				case "xml": return textualView(format, bytes, policy);
				case "sqlite": return err("a SQLite database inside an archive is not read");
				case "dconf": return err("a dconf database inside an archive is not read");
				case "zip": return err("an archive inside an archive is not read");
				case "binary": return ok(null);
			}
		};
		zipEntry = (header, bytes, policy = DESKTOP_VIEW_DEFAULTS) => {
			const format = detectStateFormat(header.name, bytes, policy);
			const read = entryView(format, bytes, policy);
			return {
				name: header.name,
				size: header.size,
				sha256: sha256Hex(bytes),
				format,
				view: read.ok ? read.value : null,
				view_error: read.ok ? null : read.error
			};
		};
		zipView = (entries, count) => ({
			entries: [...entries],
			entry_count: count,
			truncated: count > entries.length
		});
		entryLeavesOut = (entry) => isRecord(entry) && (typeof entry.view_error === "string" || (entry.format === "text" || entry.format === "xml") && isRecord(entry.view) && entry.view.truncated === true);
		zipLeavesOut = (view) => isRecord(view) && (view.truncated === true || Array.isArray(view.entries) && view.entries.some(entryLeavesOut));
		zipEntryAt = (view, pointer) => {
			const [first, second] = pointer.slice(1).split("/");
			if (first !== "entries" || second === undefined) return undefined;
			const entry = locatePointer(view, `/entries/${second}`, "zip");
			if (entry.kind !== "value") return "none";
			return isRecord(entry.value) ? entry.value : undefined;
		};
		VIEW_FORMATS = new Set([
			"text",
			"json",
			"keyfile",
			"xml"
		]);
		entryWithoutView = (entry) => {
			if (typeof entry.view_error === "string") return `has no view: ${entry.view_error}`;
			if (entry.format === "binary") return "is binary and has no view";
			return VIEW_FORMATS.has(entry.format ?? null) ? undefined : "has no view";
		};
		viewlessEntryAt = (view, pointer) => {
			const entry = zipEntryAt(view, pointer);
			if (typeof entry !== "object" || pointer.split("/")[3] !== "view") return undefined;
			const reason = entryWithoutView(entry);
			return reason === undefined ? undefined : {
				name: typeof entry.name === "string" ? entry.name : "",
				reason,
				unread: typeof entry.view_error === "string"
			};
		};
		zipLeavesOutAt = (view, pointer) => {
			const entry = zipEntryAt(view, pointer);
			if (entry === undefined) return zipLeavesOut(view);
			return entry === "none" ? isRecord(view) && view.truncated === true : entryLeavesOut(entry);
		};
		zipArrayLeavesOut = (view, array) => array === "/entries" ? isRecord(view) && view.truncated === true : zipLeavesOutAt(view, array);
	})))();
}

//#endregion
//#region dist/domain/desktop/positionalKeys.js
var tagKey, attributesByTag, sequenceKeys, aloneBy, shifted, positionalKeys, savePositionKeys, isPositionalKey, numberedInOrder;
function init_positionalKeys() {
	return (init_positionalKeys = __esmMin((() => {
		init_attributeRank();
		tagKey = (tag, key) => `${tag}\u0000${key}`;
		attributesByTag = (items) => {
			const byTag = new Map();
			for (const item of items) {
				if (!isRecord(item) || typeof item.name !== "string") continue;
				const attributes = isRecord(item.attributes) ? item.attributes : {};
				const strings = Object.fromEntries(Object.entries(attributes).filter((entry) => typeof entry[1] === "string"));
				const members = byTag.get(item.name);
				if (members === undefined) byTag.set(item.name, [strings]);
				else members.push(strings);
			}
			return byTag;
		};
		sequenceKeys = (members) => {
			const [first] = members;
			return Object.keys(first ?? {}).filter((key) => isIdentifyingAttribute(key) && [0, 1].some((start) => members.every((member, index) => member[key] === String(start + index))));
		};
		aloneBy = (members, other) => {
			const counts = new Map();
			for (const member of members) {
				const value = member[other];
				if (value !== undefined) counts.set(value, (counts.get(value) ?? 0) + 1);
			}
			return new Map(members.flatMap((member, index) => {
				const value = member[other];
				return value !== undefined && counts.get(value) === 1 ? [[value, index]] : [];
			}));
		};
		shifted = (newer, older, key) => {
			const change = newer.length - older.length;
			if (change === 0) return false;
			const others = new Set([...newer, ...older].flatMap((member) => Object.keys(member)));
			others.delete(key);
			const moves = new Map();
			for (const other of others) {
				const before = aloneBy(older, other);
				for (const [value, index] of aloneBy(newer, other)) {
					const old = before.get(value);
					if (old === undefined) continue;
					const move = Number(newer[index]?.[key]) - Number(older[old]?.[key]);
					if ((moves.get(old) ?? move) !== move) return false;
					moves.set(old, move);
				}
			}
			let reached = 0;
			for (const [, move] of [...moves].toSorted(([left], [right]) => left - right)) {
				const size = Math.sign(change) * move;
				if (size < reached || size > Math.abs(change)) return false;
				reached = size;
			}
			return reached > 0;
		};
		positionalKeys = (newer, older) => {
			const before = attributesByTag(older);
			const keys = new Set();
			for (const [tag, members] of attributesByTag(newer)) {
				const old = before.get(tag) ?? [];
				const sequenced = new Set(sequenceKeys(old));
				for (const key of sequenceKeys(members)) if (sequenced.has(key) && shifted(members, old, key)) keys.add(tagKey(tag, key));
			}
			return keys;
		};
		savePositionKeys = (newer, older) => {
			const before = attributesByTag(older);
			const fromZero = (members) => Object.keys(members[0] ?? {}).filter((key) => isIdentifyingAttribute(key) && members.every((member, index) => member[key] === String(index)));
			const keys = new Set();
			for (const [tag, members] of attributesByTag(newer)) {
				const old = before.get(tag) ?? [];
				if (old.length === members.length) continue;
				const numbered = new Set(fromZero(old));
				for (const key of fromZero(members)) if (numbered.has(key)) keys.add(tagKey(tag, key));
			}
			return keys;
		};
		isPositionalKey = (keys, tag, key) => keys.has(tagKey(tag, key));
		numberedInOrder = (members, tag, key) => {
			const numbers = (attributesByTag(members).get(tag) ?? []).map((attributes) => Number(/(?<n>\d+)\D*$/u.exec(attributes[key] ?? "")?.groups?.n ?? Number.NaN));
			const [first, second] = numbers;
			if (first === undefined || second === undefined) return false;
			const step = second - first;
			return Math.abs(step) === 1 && numbers.every((number, index) => number === first + step * index);
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/selectorCandidates.js
var own$1, MAX_PAIRED, condition, pairSuffix, MAX_CHILD_TEXT, shortText, stepTag, elementsOf, childTexts, spelledInside, childConditions, childIdConditions, childCandidates, partnersOf, unspelledPairs, countUnspelledPairs, keptIdentifier, holdsElements, isContainer, holdingCondition;
function init_selectorCandidates() {
	return (init_selectorCandidates = __esmMin((() => {
		init_appTask();
		init_attributeRank();
		init_viewSelector();
		own$1 = (record, key) => Object.hasOwn(record, key) ? record[key] : undefined;
		MAX_PAIRED = 6;
		condition = ({ key, value }) => spellCondition({
			prefix: "@",
			key,
			value
		});
		pairSuffix = (first, second) => first.key < second.key ? `${condition(first)}${condition(second)}` : `${condition(second)}${condition(first)}`;
		MAX_CHILD_TEXT = 64;
		shortText = (element) => {
			let text = "";
			let space = false;
			/** Add a text node's characters, collapsed; false once the text is past the limit, read no further. */
			const append = (node) => {
				for (const character of node) if (" 	\r\n".includes(character)) space = text !== "";
				else {
					text += `${space ? " " : ""}${character}`;
					space = false;
					if (text.length > MAX_CHILD_TEXT) return false;
				}
				return true;
			};
			const pending = [element];
			for (let node = pending.pop(); node !== undefined; node = pending.pop()) if (typeof node === "string") {
				if (isTimestamp(node)) continue;
				if (!append(node)) return undefined;
			} else if (isRecord(node) && Array.isArray(node.children)) for (let index = node.children.length - 1; index >= 0; index -= 1) pending.push(node.children[index] ?? null);
			return text;
		};
		stepTag = (tag) => typeof tag === "string" && tag !== "" && !/[=[\]/@]/u.test(tag);
		elementsOf = (member) => {
			const children = isRecord(member) ? own$1(member, "children") : undefined;
			return (Array.isArray(children) ? children : []).filter((child) => isRecord(child));
		};
		childTexts = (member) => elementsOf(member).flatMap((child) => {
			const key = own$1(child, "name");
			const value = stepTag(key) ? shortText(child) : undefined;
			return stepTag(key) && value !== undefined && /[\p{L}\d]/u.test(value) && !value.includes("][") && !isTimestamp(value) && !isGeneratedId(value) && !isPlaceholder(value) && !/\d{10}/u.test(value) ? [{
				key,
				value,
				joined: elementsOf(child).length > 0
			}] : [];
		});
		spelledInside = (found) => rankAttributes(found).map(({ key, value }) => spellCondition({
			prefix: ">",
			key,
			value
		}));
		childConditions = (member) => [...new Set(spelledInside(childTexts(member)))];
		childIdConditions = (member) => elementsOf(member).flatMap((child) => {
			const tag = own$1(child, "name");
			const attributes = own$1(child, "attributes");
			return stepTag(tag) && isRecord(attributes) ? Object.entries(attributes).flatMap(([key, value]) => typeof value === "string" && isIdentifyingAttribute(key) && !/[=[\]/@]/u.test(key) && /[\p{L}\d]/u.test(value) && !value.includes("][") && !isTimestamp(value) && !isPlaceholder(value) && !isGeneratedId(value) && !isGuid(value) && !isSaveNumberedId(key, value) ? [spellCondition({
				prefix: ">",
				key: `${tag}@${key}`,
				value
			})] : []) : [];
		});
		childCandidates = (member) => {
			const texts = childTexts(member);
			return [...new Set([
				...spelledInside(texts.filter(({ joined }) => !joined)),
				...childIdConditions(member),
				...spelledInside(texts.filter(({ joined }) => joined))
			])];
		};
		partnersOf = (versions) => {
			const unpaired = new Map();
			for (const { candidates } of versions) for (const member of candidates) {
				if (member === undefined || member.pairable.length <= 6) continue;
				const keys = unpaired.get(member.number) ?? new Set();
				unpaired.set(member.number, keys);
				for (const key of member.pairable.slice(6)) keys.add(key);
			}
			const partners = new Map();
			for (const { candidates } of versions) for (const member of candidates) {
				const keys = member && unpaired.get(member.number);
				if (member === undefined || keys === undefined) continue;
				const paired = member.pairable.slice(0, 6);
				for (const key of paired.filter((pairs) => keys.has(pairs))) {
					const byKey = partners.get(member.number) ?? new Map();
					partners.set(member.number, byKey);
					const others = byKey.get(key) ?? new Set();
					byKey.set(key, others);
					for (const other of paired.filter((other) => other !== key)) others.add(other);
				}
			}
			return partners;
		};
		unspelledPairs = (member, attributes, byKey) => {
			const unpaired = member.pairable.slice(6);
			const past = new Set(unpaired);
			const ids = [];
			for (const key of unpaired) for (const other of byKey.get(key) ?? []) {
				const [left, right] = [own$1(attributes, key), own$1(attributes, other)];
				if (typeof left === "string" && typeof right === "string" && !(past.has(other) && other < key)) ids.push(`${String(member.number)}${pairSuffix({
					key,
					value: left
				}, {
					key: other,
					value: right
				})}`);
			}
			return ids;
		};
		countUnspelledPairs = (versions) => {
			const partners = partnersOf(versions);
			if (partners.size === 0) return;
			const spelled = (id) => versions.some(({ counts }) => counts.has(id));
			for (const { members, candidates, counts } of versions) candidates.forEach((member, index) => {
				const item = members[index];
				const attributes = isRecord(item) ? own$1(item, "attributes") : undefined;
				const byKey = member && partners.get(member.number);
				if (member === undefined || byKey === undefined || !isRecord(attributes)) return;
				for (const id of unspelledPairs(member, attributes, byKey)) if (spelled(id)) counts.set(id, (counts.get(id) ?? 0) + 1);
			});
		};
		keptIdentifier = (after, before, name) => {
			const value = after[name];
			return typeof value === "string" && value === before[name] && !/[=[\]]/u.test(name) && !value.includes("][") && !isTimestamp(value) ? condition({
				key: name,
				value
			}) : undefined;
		};
		holdsElements = (member) => {
			const children = isRecord(member) ? own$1(member, "children") : undefined;
			const all = Array.isArray(children) ? children : [];
			return all.some((child) => isRecord(child)) && all.every((child) => typeof child !== "string" || child.trim() === "");
		};
		isContainer = (member) => {
			const children = isRecord(member) ? own$1(member, "children") : undefined;
			const all = Array.isArray(children) ? children : [];
			const tags = all.flatMap((child) => {
				const tag = isRecord(child) ? own$1(child, "name") : undefined;
				return typeof tag === "string" ? [tag] : [];
			});
			return new Set(tags).size < tags.length && all.every((child) => typeof child !== "string" || child.trim() === "");
		};
		holdingCondition = (newer, older, nested = false) => {
			const attributesOf = (member) => {
				const attributes = isRecord(member) ? own$1(member, "attributes") : undefined;
				return isRecord(attributes) ? attributes : {};
			};
			const [after, before] = [attributesOf(newer), attributesOf(older)];
			const identifiers = (nested ? holdsElements : isContainer)(newer) ? Object.keys(after).filter(isIdentifyingAttribute) : [];
			const named = (key) => key.toLowerCase() === "name";
			const theirs = new Set(childConditions(older));
			const children = childConditions(newer).filter((spelled) => theirs.has(spelled) && (!nested || isNameLikeKey(selectorOf(spelled)?.[0]?.key ?? "")));
			const kept = (keys) => keys.flatMap((key) => keptIdentifier(after, before, key) ?? [])[0];
			return identifiers.length === 0 && !(nested && holdsElements(newer)) ? undefined : kept(identifiers.filter((key) => !named(key))) ?? children[0] ?? kept(identifiers.filter(named));
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/jsonRecordPairing.js
var ID_FIELD, isRecordIdField, OWN_ID, KIND_FIELD, MAX_NAME, MAX_TALLIES, namesEach, stringAt, isName, namePath, kindOf, tally, spellName, nameOf, keptNameOf, pairRecordsById;
function init_jsonRecordPairing() {
	return (init_jsonRecordPairing = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_appTask();
		init_attributeRank();
		init_viewSelector();
		ID_FIELD = /^(?:_?id|uid|uuid|guid|key)$|[_-]id$|[a-z]Id$/u;
		isRecordIdField = (field) => ID_FIELD.test(field) && !/^[@>]|[=[\]]/u.test(field);
		OWN_ID = [
			"uid",
			"uuid",
			"guid",
			"id",
			"key"
		];
		KIND_FIELD = /^(?:type|kind|format|category)$/iu;
		MAX_NAME = 64;
		MAX_TALLIES = 64;
		namesEach = (members, key) => {
			const values = members.map((member) => isRecord(member) ? member[key] : undefined);
			return values.every((value) => typeof value === "string" && value !== "" && !value.includes("][")) && new Set(values).size === values.length;
		};
		stringAt = (record, path) => {
			let found = record;
			for (const key of path) found = isRecord(found) && Object.hasOwn(found, key) ? found[key] : undefined;
			return typeof found === "string" ? found : undefined;
		};
		isName = (value) => value.length <= MAX_NAME && /[\p{L}\d]/u.test(value) && !value.includes("][") && !isTimestamp(value) && !isGeneratedId(value) && !isPlaceholder(value);
		namePath = (record, names) => {
			let level = [{
				path: [],
				fields: record
			}];
			for (let depth = 0; depth < 3; depth += 1) {
				const next = [];
				for (const { path, fields } of level) for (const [key, value] of Object.entries(fields)) if (key === "" || /[=[\]/]/u.test(key)) continue;
				else if (isRecord(value)) next.push({
					path: [...path, key],
					fields: value
				});
				else if (typeof value === "string" && isNameLikeKey(key) && isName(value) && names([...path, key])) return [...path, key];
				level = next;
			}
			return undefined;
		};
		kindOf = (record) => Object.keys(record).find((key) => {
			const value = record[key];
			return KIND_FIELD.test(key) && typeof value === "string" && !value.includes("][");
		});
		tally = (members) => {
			const counted = new Map();
			return (kind, path, of) => {
				const held = (member) => {
					const name = stringAt(member, path);
					const sort = kind === undefined ? "" : stringAt(member, [kind]);
					return name === undefined || sort === undefined ? undefined : compositeKey([sort, name]);
				};
				const id = JSON.stringify([kind ?? null, path]);
				let counts = counted.get(id);
				if (counts === undefined) {
					if (counted.size >= MAX_TALLIES) return undefined;
					counts = new Map();
					for (const member of members) {
						const at = held(member);
						if (at !== undefined) counts.set(at, (counts.get(at) ?? 0) + 1);
					}
					counted.set(id, counts);
				}
				const at = held(of);
				return at === undefined ? 0 : counts.get(at) ?? 0;
			};
		};
		spellName = (record, kind, path) => {
			const value = stringAt(record, path);
			if (value === undefined) return undefined;
			const key = path.join("/");
			const prefix = path.length === 1 && !/^[@>]/u.test(key) ? "" : ">";
			const sort = kind === undefined ? "" : spellCondition({
				prefix: "",
				key: kind,
				value: stringAt(record, [kind]) ?? ""
			});
			return `${sort}${spellCondition({
				prefix,
				key,
				value
			})}`;
		};
		nameOf = (record, here, there) => {
			if (!isRecord(record)) return undefined;
			const kind = kindOf(record);
			const path = namePath(record, (at) => here(kind, at, record) === 1 && there(kind, at, record) === 0);
			return path === undefined ? undefined : spellName(record, kind, path);
		};
		keptNameOf = (newer, older, counts) => {
			if (!isRecord(newer) || !isRecord(older)) return undefined;
			const kind = kindOf(newer);
			const same = (path) => stringAt(newer, path) === stringAt(older, path);
			const path = namePath(newer, (at) => (kind === undefined || same([kind])) && same(at) && counts.newer(kind, at, newer) === 1 && counts.older(kind, at, older) === 1);
			return path === undefined ? undefined : spellName(newer, kind, path);
		};
		pairRecordsById = (newer, older) => {
			const [first] = [...newer, ...older];
			if (!isRecord(first) || ![...newer, ...older].every(isRecord)) return undefined;
			const key = Object.keys(first ?? {}).filter((field) => isRecordIdField(field) && namesEach(newer, field) && namesEach(older, field)).toSorted((left, right) => {
				const rank = (field) => {
					const own = OWN_ID.indexOf(field.toLowerCase());
					return own < 0 ? OWN_ID.length : own;
				};
				return rank(left) - rank(right);
			})[0];
			if (key === undefined) return undefined;
			const idOf = (member) => isRecord(member) ? String(member[key]) : "";
			const counts = {
				newer: tally(newer),
				older: tally(older)
			};
			const partnersOf = (members, others) => {
				const where = new Map(others.map((other, index) => [idOf(other), index]));
				return members.map((member) => where.get(idOf(member)));
			};
			const partners = {
				newer: partnersOf(newer, older),
				older: partnersOf(older, newer)
			};
			const idKey = (member) => `[${key}=${idOf(member)}]`;
			const newerKeys = newer.map((member, index) => {
				const partner = partners.newer[index];
				if (!isGeneratedId(idOf(member))) return idKey(member);
				return partner === undefined ? nameOf(member, counts.newer, counts.older) ?? String(index) : keptNameOf(member, older[partner] ?? null, counts) ?? idKey(member);
			});
			const olderKeys = older.map((member, index) => {
				const partner = partners.older[index];
				if (partner !== undefined) return newerKeys[partner] ?? idKey(member);
				return isGeneratedId(idOf(member)) ? nameOf(member, counts.older, counts.newer) ?? String(index) : idKey(member);
			});
			return {
				newer: {
					keys: newerKeys,
					partners: partners.newer
				},
				older: {
					keys: olderKeys,
					partners: partners.older
				},
				idField: key,
				generated: newer.map((member, index) => partners.newer[index] === undefined && isGeneratedId(idOf(member)))
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/memberPairing.js
var own, selectable, attributeName, pairsOf, candidatesOf, pairingOrder, selectorAt, countIds, placesOf, renamed, attributesOf, renameKeys, pairRenamed, holdsTagOnly, pluralOf, holdTagOnly, pairElements, pairMembers, pairedAtSeed;
function init_memberPairing() {
	return (init_memberPairing = __esmMin((() => {
		init_jsonPointer();
		init_appTask();
		init_attributeRank();
		init_positionalKeys();
		init_selectorCandidates();
		init_jsonRecordPairing();
		init_viewPointer();
		init_viewSelector();
		own = (record, key) => Object.hasOwn(record, key) ? record[key] : undefined;
		selectable = (value) => !value.includes("][") && !isTimestamp(value) && !isPlaceholder(value);
		attributeName = (key) => key !== "" && !/[=[\]]/u.test(key);
		pairsOf = (paired) => paired.flatMap((first, index) => paired.slice(index + 1).map((second) => ({
			tier: first.tier + second.tier,
			suffix: pairSuffix(first, second)
		}))).toSorted((left, right) => left.tier - right.tier).map(({ suffix }) => suffix);
		candidatesOf = (member, names, positional, saved, json = false) => {
			if (!isRecord(member)) return undefined;
			const name = own(member, "name");
			if (typeof name !== "string" || !selectable(name)) return undefined;
			const attributes = json ? undefined : own(member, "attributes");
			const usable = (isRecord(attributes) ? Object.entries(attributes) : []).flatMap(([key, value]) => typeof value === "string" && attributeName(key) && selectable(value) && !isPositionalKey(positional, name, key) ? [{
				key,
				value
			}] : []);
			const children = json ? [] : childCandidates(member);
			const placed = children.length === 0 ? [] : usable.filter(({ key }) => isIdentifyingAttribute(key) && isPositionalKey(saved, name, key));
			const numbered = usable.filter(({ key, value }) => isSaveNumberedId(key, value));
			const generated = usable.filter((field) => !placed.includes(field) && !numbered.includes(field) && (isIdentifyingAttribute(field.key) && isGeneratedId(field.value) || isGuid(field.value)));
			const identities = usable.filter((field) => isIdentifyingAttribute(field.key) && !generated.includes(field) && !numbered.includes(field) && !placed.includes(field));
			const named = (key) => key.toLowerCase() === "name";
			const ranked = [...rankAttributes(usable.filter((field) => !isIdentifyingAttribute(field.key) && !generated.includes(field))), ...numbered.map((field) => ({
				...field,
				tier: 3
			}))];
			const pairable = ranked.filter(({ tier }) => tier < 3);
			const suffixes = [
				"",
				...[
					...identities.filter(({ key }) => named(key)),
					...identities.filter(({ key }) => !named(key)),
					...pairable
				].map(condition),
				...pairsOf(pairable.slice(0, 6)),
				...ranked.filter(({ tier }) => tier === 3).map(condition)
			];
			suffixes.push(...children, ...placed.map(condition), ...generated.map(condition));
			const number = names.get(name) ?? names.size;
			names.set(name, number);
			const ids = suffixes.map((suffix) => `${String(number)}${suffix}`);
			const choosable = identities.length > 0 ? identities.length + 1 : suffixes.length;
			return {
				name,
				number,
				ids,
				choosable,
				byChild: suffixes.length - children.length - placed.length - generated.length,
				identified: identities.length + 1,
				generated: generated.length,
				pairable: pairable.map(({ key }) => key)
			};
		};
		pairingOrder = ({ ids, choosable, identified, generated }) => {
			const last = ids.length - generated;
			const ranks = Array.from({ length: ids.length }, (_, at) => at);
			return [
				...ranks.slice(0, Math.min(identified, choosable)),
				...ranks.slice(last),
				...ranks.slice(Math.min(identified, choosable), Math.min(choosable, last))
			];
		};
		selectorAt = ({ name, number, ids }, index) => `[name=${name}]${(ids[index] ?? "").slice(String(number).length)}`;
		countIds = (members) => {
			const counts = new Map();
			for (const candidates of members) for (const id of candidates?.ids ?? []) counts.set(id, (counts.get(id) ?? 0) + 1);
			return counts;
		};
		placesOf = (members) => {
			const seen = new Map();
			return members.map((member) => {
				const name = isRecord(member) ? own(member, "name") : undefined;
				if (typeof name !== "string") return undefined;
				const before = seen.get(name) ?? 0;
				seen.set(name, before + 1);
				return `${String(before)}\u0000${name}`;
			});
		};
		renamed = (newer, older) => {
			if (!isRecord(newer) || !isRecord(older)) return false;
			const [after, before] = [own(newer, "attributes"), own(older, "attributes")];
			if (own(newer, "name") !== own(older, "name") || !isRecord(after) || !isRecord(before)) return false;
			const keys = Object.keys(after);
			const changed = keys.filter((key) => own(before, key) !== after[key]);
			const [key] = changed;
			return keys.length === Object.keys(before).length && changed.length === 1 && key !== undefined && Object.hasOwn(before, key) && isIdentifyingAttribute(key) && JSON.stringify(own(newer, "children")) === JSON.stringify(own(older, "children"));
		};
		attributesOf = (member) => {
			const attributes = isRecord(member) ? own(member, "attributes") : undefined;
			return isRecord(attributes) ? attributes : {};
		};
		renameKeys = (sides, at) => {
			const { newer, older } = sides;
			const candidates = newer.candidates[at.index];
			const [after, before] = [attributesOf(newer.members[at.index] ?? null), attributesOf(older.members[at.match] ?? null)];
			const paired = candidates === undefined ? undefined : selectorOf(at.id.slice(String(candidates.number).length))?.[0]?.key;
			const key = Object.keys(after).find((name) => after[name] !== before[name]);
			if (candidates === undefined || paired === undefined || key === undefined || !numberedInOrder(newer.members, candidates.name, paired) || !numberedInOrder(older.members, candidates.name, paired)) return undefined;
			const spelled = (side, value) => {
				const suffix = typeof value === "string" ? condition({
					key,
					value
				}) : "";
				return suffix !== "" && side.counts.get(`${String(candidates.number)}${suffix}`) === 1 ? `[name=${candidates.name}]${suffix}` : undefined;
			};
			const [mine, theirs] = [spelled(newer, after[key]), spelled(older, before[key])];
			return mine === undefined || theirs === undefined ? undefined : {
				newer: mine,
				older: theirs
			};
		};
		pairRenamed = (newer, older) => {
			const unpaired = new Map();
			placesOf(older.members).forEach((place, index) => {
				if (place !== undefined && older.partners[index] === undefined) unpaired.set(place, index);
			});
			placesOf(newer.members).forEach((place, index) => {
				const match = place === undefined ? undefined : unpaired.get(place);
				const candidates = newer.candidates[index];
				const theirs = match === undefined ? undefined : older.candidates[match];
				if (match === undefined || candidates === undefined || theirs === undefined || newer.partners[index] !== undefined || !renamed(newer.members[index] ?? null, older.members[match] ?? null)) return;
				const at = candidates.ids.findIndex((id, position) => position >= candidates.choosable && newer.counts.get(id) === 1 && older.counts.get(id) === 1 && theirs.ids.includes(id));
				if (at < 0) return;
				const keys = renameKeys({
					newer,
					older
				}, {
					index,
					match,
					id: candidates.ids[at] ?? ""
				});
				newer.keys[index] = keys?.newer ?? selectorAt(candidates, at);
				older.keys[match] = keys?.older ?? selectorAt(candidates, at);
				newer.partners[index] = match;
				older.partners[match] = index;
			});
		};
		holdsTagOnly = (list) => {
			const owner = selectorOf(unescapeJsonPointerToken(list.split("/").at(-2) ?? ""))?.find(({ prefix, key }) => prefix === "" && key === "name")?.value;
			return {
				root: /(?:^|\/)root\/children$/u.test(list),
				...owner === undefined ? {} : { owner }
			};
		};
		pluralOf = (owner, tag) => {
			const [list, one] = [owner?.toLowerCase() ?? "", tag.toLowerCase()];
			return list === `${one}s` || list === `${one}es` || one.endsWith("y") && list === `${one.slice(0, -1)}ies`;
		};
		holdTagOnly = (newer, older, place) => {
			newer.partners.forEach((match, index) => {
				const candidates = newer.candidates[index];
				const deep = candidates !== undefined && pluralOf(place.owner, candidates.name);
				if (match === undefined || candidates === undefined || newer.keys[index] !== `[name=${candidates.name}]` || !place.root && !deep) return;
				const held = holdingCondition(newer.members[index] ?? null, older.members[match] ?? null, !place.root);
				if (held !== undefined) newer.keys[index] = older.keys[match] = `[name=${candidates.name}]${held}`;
			});
		};
		pairElements = (newer, older, place, json = false) => {
			const names = new Map();
			const positional = positionalKeys(newer, older);
			const saved = savePositionKeys(newer, older);
			const newCandidates = newer.map((member) => candidatesOf(member, names, positional, saved, json));
			const oldCandidates = older.map((member) => candidatesOf(member, names, positional, saved, json));
			const newCounts = countIds(newCandidates);
			const oldCounts = countIds(oldCandidates);
			countUnspelledPairs([{
				members: newer,
				candidates: newCandidates,
				counts: newCounts
			}, {
				members: older,
				candidates: oldCandidates,
				counts: oldCounts
			}]);
			const count = (counts, id) => counts.get(id) ?? 0;
			const oldById = new Map();
			oldCandidates.forEach((candidates, index) => {
				for (const at of candidates === undefined ? [] : pairingOrder(candidates)) {
					const id = candidates?.ids[at] ?? "";
					if (count(oldCounts, id) === 1) oldById.set(id, index);
				}
			});
			const newKeys = newer.map(() => undefined);
			const oldKeys = older.map(() => undefined);
			const newPartners = newer.map(() => undefined);
			const oldPartners = older.map(() => undefined);
			newCandidates.forEach((candidates, index) => {
				if (candidates === undefined) return;
				for (const at of pairingOrder(candidates)) {
					const id = candidates.ids[at] ?? "";
					const match = count(newCounts, id) === 1 ? oldById.get(id) : undefined;
					if (match === undefined || oldPartners[match] !== undefined) continue;
					newKeys[index] = oldKeys[match] = selectorAt(candidates, at);
					newPartners[index] = match;
					oldPartners[match] = index;
					return;
				}
			});
			const sides = [{
				members: newer,
				candidates: newCandidates,
				counts: newCounts,
				keys: newKeys,
				partners: newPartners
			}, {
				members: older,
				candidates: oldCandidates,
				counts: oldCounts,
				keys: oldKeys,
				partners: oldPartners
			}];
			pairRenamed(...sides);
			if (place !== undefined) holdTagOnly(...sides, place);
			/**
			* The first selector naming a member alone in its version and nothing in
			* the other; by a child's text only where the list's length changed, since
			* otherwise a member whose naming child an edit changed is that member.
			*/
			const unmatched = (candidates, here, there) => {
				if (candidates === undefined) return undefined;
				const last = newer.length === older.length ? candidates.byChild : candidates.choosable;
				const at = candidates.ids.slice(0, Math.min(candidates.choosable, last)).findIndex((id) => count(here, id) === 1 && count(there, id) === 0);
				return at < 0 ? undefined : selectorAt(candidates, at);
			};
			newCandidates.forEach((candidates, index) => {
				newKeys[index] ??= unmatched(candidates, newCounts, oldCounts);
			});
			oldCandidates.forEach((candidates, index) => {
				oldKeys[index] ??= unmatched(candidates, oldCounts, newCounts);
			});
			for (let index = 0; index < Math.min(newer.length, older.length); index += 1) if (newKeys[index] === undefined && oldKeys[index] === undefined) {
				newPartners[index] = index;
				oldPartners[index] = index;
			}
			const side = (keys, partners) => ({
				keys: keys.map((key, index) => key ?? String(index)),
				partners
			});
			return {
				newer: side(newKeys, newPartners),
				older: side(oldKeys, oldPartners)
			};
		};
		pairMembers = (newer, older, place, format) => (format === "xml" ? undefined : pairRecordsById(newer, older)) ?? pairElements(newer, older, place, format !== "xml");
		pairedAtSeed = (ends, member) => {
			const list = /^(?<list>.*\/children)\/[^/]+$/u.exec(member)?.groups?.list;
			const newer = list === undefined ? undefined : resolvePointer(ends.final, list, "xml");
			const older = list === undefined ? undefined : resolvePointer(ends.baseline, list, "xml");
			const element = resolvePointer(ends.final, member, "xml");
			if (list === undefined || !Array.isArray(newer) || !Array.isArray(older)) return undefined;
			const index = newer.indexOf(element ?? null);
			const partner = index < 0 ? undefined : pairMembers(newer, older, holdsTagOnly(list), "xml").newer.partners[index];
			return partner === undefined ? undefined : older[partner];
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/stateChanges.js
var MAX_LISTED, MAX_LISTED_POINTER, found, note, ownEntry, keyedMembers, walk, compareTrees, listed, compareMaps, lineDifference, keyEntries, tablesOf, unreadTables, sqliteRowIdentity, rowEntries, truncatedView, diffStateViews, namedOrPositional, compareViews, diffNamedMembers, archiveFormat;
function init_stateChanges() {
	return (init_stateChanges = __esmMin((() => {
		init_jsonPointer();
		init_memberPairing();
		init_viewPointer();
		init_zipView();
		init_boundedList();
		MAX_LISTED = 100;
		MAX_LISTED_POINTER = 4096;
		found = () => ({
			listed: [],
			count: 0
		});
		note = (into, path) => {
			into.count += 1;
			if (into.listed.length < MAX_LISTED && path.length <= MAX_LISTED_POINTER) into.listed.push(path.segments.map((segment) => `/${segment}`).join(""));
		};
		ownEntry = (value) => {
			if (Array.isArray(value)) return "[]";
			return isRecord(value) ? "{}" : JSON.stringify(value);
		};
		keyedMembers = (from, other, at) => {
			const others = Array.isArray(other) ? other : [];
			if (Array.isArray(other) && at.format !== at.otherFormat && at.format != null && at.otherFormat != null) return from.map((_item, index) => ({
				key: String(index),
				counterpart: others[index]
			}));
			const hold = holdsTagOnly(at.list);
			const pairing = at.older ? pairMembers(others, from, hold, at.format) : pairMembers(from, others, hold, at.format);
			const older = at.older;
			const side = older ? pairing.older : pairing.newer;
			const lookup = memberLookup(other, [], at.otherFormat);
			return side.keys.map((key, index) => {
				const partner = side.partners[index];
				if (!Array.isArray(other)) return {
					key,
					counterpart: lookup(key)
				};
				return {
					key,
					counterpart: partner === undefined ? undefined : others[partner]
				};
			});
		};
		walk = (from, other, path, into) => {
			if (other === undefined) {
				note(into.missing, path);
				if (into.outermost === true) return;
			} else if (into.changed !== undefined && ownEntry(from) !== ownEntry(other)) note(into.changed, path);
			const visit = (key, item, counterpart) => {
				const segment = escapeJsonPointerToken(key);
				path.segments.push(segment);
				path.length += segment.length + 1;
				walk(item, counterpart, path, into);
				path.segments.pop();
				path.length -= segment.length + 1;
			};
			if (Array.isArray(from) && into.keyed === true) {
				const members = keyedMembers(from, other, {
					older: into.older === true,
					list: path.segments.map((segment) => `/${segment}`).join(""),
					format: into.format?.(path.segments.map((segment) => `/${segment}`).join(""), into.older === true),
					otherFormat: into.format?.(path.segments.map((segment) => `/${segment}`).join(""), into.older !== true)
				});
				from.forEach((item, index) => {
					const member = members[index];
					if (member !== undefined) visit(member.key, item, member.counterpart);
				});
			} else if (Array.isArray(from)) {
				const lookup = memberLookup(other, [], into.format?.(path.segments.map((segment) => `/${segment}`).join(""), into.older !== true));
				from.forEach((item, index) => visit(String(index), item, lookup(String(index))));
			} else if (isRecord(from)) {
				const lookup = memberLookup(other, Object.keys(from), into.format?.(path.segments.map((segment) => `/${segment}`).join(""), into.older !== true));
				for (const [key, item] of Object.entries(from)) visit(key, item, lookup(key));
			}
		};
		compareTrees = (before, after, options = {}) => {
			const [added, removed, changed] = [
				found(),
				found(),
				found()
			];
			const start = () => ({
				segments: [],
				length: 0
			});
			walk(after, before, start(), {
				...options,
				missing: added,
				changed
			});
			walk(before, after, start(), {
				...options,
				missing: removed,
				older: true
			});
			return {
				kind: "values",
				added: added.listed,
				removed: removed.listed,
				changed: changed.listed,
				added_count: added.count,
				removed_count: removed.count,
				changed_count: changed.count,
				complete: true
			};
		};
		listed = (added, removed, changed) => {
			const total = ({ items, omitted }) => items.length + omitted;
			const a = boundedList(added, MAX_LISTED);
			const r = boundedList(removed, MAX_LISTED);
			const c = boundedList(changed, MAX_LISTED);
			return {
				added: a.items,
				removed: r.items,
				changed: c.items,
				added_count: total(a),
				removed_count: total(r),
				changed_count: total(c)
			};
		};
		compareMaps = (kind, before, after) => {
			const added = [];
			const removed = [];
			const changed = [];
			for (const [key, value] of after) {
				const previous = before.get(key);
				if (previous === undefined) added.push(key);
				else if (previous !== value) changed.push(key);
			}
			for (const key of before.keys()) if (!after.has(key)) removed.push(key);
			return {
				kind,
				...listed(added, removed, changed),
				complete: true
			};
		};
		lineDifference = (before, after) => {
			const lines = (view) => isRecord(view) && Array.isArray(view.lines) ? view.lines.filter((line) => typeof line === "string") : [];
			const counts = new Map();
			for (const line of lines(before)) counts.set(line, (counts.get(line) ?? 0) - 1);
			for (const line of lines(after)) counts.set(line, (counts.get(line) ?? 0) + 1);
			const added = [];
			const removed = [];
			for (const [line, count] of counts) {
				for (let index = 0; index < count; index += 1) added.push(line);
				for (let index = 0; index > count; index -= 1) removed.push(line);
			}
			return {
				kind: "lines",
				...listed(added, removed, []),
				complete: true
			};
		};
		keyEntries = (view) => {
			const entries = new Map();
			const groups = isRecord(view) && isRecord(view.groups) ? view.groups : {};
			for (const [group, keys] of Object.entries(groups)) if (isRecord(keys)) for (const [key, value] of Object.entries(keys)) entries.set(`${group}/${escapeJsonPointerToken(key)}`, JSON.stringify(value));
			return entries;
		};
		tablesOf = (view) => isRecord(view) && isRecord(view.tables) ? view.tables : {};
		unreadTables = (view) => Object.entries(tablesOf(view)).filter(([, table]) => isRecord(table) && typeof table.error === "string").map(([name]) => name);
		sqliteRowIdentity = (columns, key, row) => {
			const indexes = key.map((column) => columns.indexOf(column));
			const keyed = indexes.length > 0 && indexes.every((index) => index >= 0 && row[index] !== null && row[index] !== undefined);
			return {
				value: JSON.stringify(keyed ? indexes.map((index) => row[index]) : row),
				keyed
			};
		};
		rowEntries = (view, skipped) => {
			const entries = new Map();
			for (const [name, table] of Object.entries(tablesOf(view))) {
				if (skipped.has(name) || !isRecord(table) || !Array.isArray(table.rows)) continue;
				const columns = Array.isArray(table.columns) ? table.columns : [];
				const keyColumns = Array.isArray(table.primary_key) ? table.primary_key : [];
				const seen = new Map();
				for (const row of table.rows) {
					if (!Array.isArray(row)) continue;
					const identity = sqliteRowIdentity(columns, keyColumns, row).value;
					const occurrence = seen.get(identity) ?? 0;
					seen.set(identity, occurrence + 1);
					entries.set(`${name}:${identity}${occurrence === 0 ? "" : `#${String(occurrence)}`}`, JSON.stringify(row));
				}
			}
			return entries;
		};
		truncatedView = (view) => {
			if (!isRecord(view)) return false;
			if (view.truncated === true || view.tables_truncated === true) return true;
			return unreadTables(view).length > 0 || Object.values(tablesOf(view)).some((table) => isRecord(table) && table.truncated === true);
		};
		diffStateViews = (format, before, after, options = {}) => {
			const difference = (format === "xml" || format === "json") && options.named === true ? namedOrPositional(before, after, format) : compareViews(format, before, after);
			const flagged = format === "text" || format === "xml" || format === "sqlite";
			const partial = format === "zip" ? zipLeavesOut(before) || zipLeavesOut(after) : flagged && (truncatedView(before) || truncatedView(after));
			return partial ? {
				...difference,
				complete: false
			} : difference;
		};
		namedOrPositional = (before, after, format) => {
			const named = compareTrees(before, after, {
				keyed: true,
				format: () => format
			});
			return named.added_count + named.removed_count + named.changed_count > 0 ? named : compareTrees(before, after);
		};
		compareViews = (format, before, after) => {
			switch (format) {
				case "text": return lineDifference(before, after);
				case "json":
				case "xml": return compareTrees(before, after);
				case "zip": return compareTrees(before, after, {
					keyed: true,
					format: archiveFormat(after, before)
				});
				case "keyfile":
				case "dconf": return compareMaps("keys", keyEntries(before), keyEntries(after));
				case "sqlite": {
					const unread = new Set([...unreadTables(before), ...unreadTables(after)]);
					return compareMaps("rows", rowEntries(before, unread), rowEntries(after, unread));
				}
				case "binary": return compareMaps("content", new Map(), new Map());
			}
		};
		diffNamedMembers = (before, after, format = "xml") => compareTrees(before, after, {
			keyed: true,
			outermost: true,
			format: format === "zip" ? archiveFormat(after, before) : () => format
		});
		archiveFormat = (after, before) => (pointer, older) => {
			const entry = zipEntryAt(older ? before : after, pointer);
			return typeof entry === "object" && entry !== null && typeof entry.format === "string" ? entry.format : undefined;
		};
	})))();
}

//#endregion
export { DAMAGED_ZIP_ENTRY, DRAFT_PROMPT, KIND_FIELD, READER_TIMEOUT_S, UNREADABLE_ZIP, VIEW_STATE, attributeTier, childConditions, collapseWhitespace, compressionOf, countComparison, desktopTaskSchema, diffNamedMembers, diffStateViews, elementText, entryWithoutView, gunzip, gzipDeterministic, hasExtraField, holdsTagOnly, init_appTask, init_attributeRank, init_gzipDocument, init_jsonRecordPairing, init_memberPairing, init_positionalKeys, init_selectorCandidates, init_stateChanges, init_viewPointer, init_viewSelector, init_zipView, isAutomaticStyle, isGeneratedId, isGzip, isIdentifyingAttribute, isNameLikeKey, isPlaceholder, isPointerCheck, isPositionalKey, isRecordIdField, isSaveNumberedId, isTimestamp, isViewStateName, isXmlElement, locatePointer, numberedInOrder, openStateDocument, pairMembers, pairRecordsById, pairedAtSeed, parseDesktopTask, positionalKeys, rankAttributes, resolvePointer, selectorOf, selectorTest, spellCondition, sqliteRowIdentity, unreadZipEntry, viewlessEntryAt, zipArrayLeavesOut, zipEntry, zipEntryAt, zipEntryRefusal, zipLeavesOutAt, zipView };