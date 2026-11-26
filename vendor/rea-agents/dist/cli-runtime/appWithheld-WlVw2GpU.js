import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { equalJsonValues, init_isRecord, init_jsonValue, init_sha256Hex, isRecord, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ellipsisExcerpt, init_excerpt } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_desktopStateDiff, isWithinAny } from "./x11Windows-Cx5-JOUb.js";
import { BUILD_COMPUTER_SETTINGS, init_buildComputerSettings } from "./buildComputerSettings-CBkm3nxB.js";
import { collapseWhitespace, countComparison, elementText, init_appTask, init_viewPointer, init_zipView, isXmlElement, locatePointer, selectorTest, viewlessEntryAt, zipArrayLeavesOut, zipEntryAt, zipLeavesOutAt } from "./stateChanges-DKaIbxqq.js";
import { posix } from "node:path";
import { z } from "zod";

//#region dist/domain/desktop/valueCuts.js
var DRAFT_VIEW_CHARS, CHECK_VALUE_CHARS;
function init_valueCuts() {
	return (init_valueCuts = __esmMin((() => {
		DRAFT_VIEW_CHARS = 2e3;
		CHECK_VALUE_CHARS = 200;
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskChecks.js
var selectorFormat, pass, fail, unread, undecided, notFound, NUMERAL, numberOf, versionView, truncatedView, viewOf, compared, lineVerdict, joinsElementText, nearVerdict, unreadOrPartial, NOTHING, noValue, valueVerdict, isTextAt, notXmlEntry, comparedText, textVerdict, memberVerdict, tableOf, countTaskRows, rowVerdict, verdict, evaluateTaskChecks;
function init_appTaskChecks() {
	return (init_appTaskChecks = __esmMin((() => {
		init_excerpt();
		init_valueCuts();
		init_jsonValue();
		init_appTask();
		init_viewPointer();
		init_zipView();
		selectorFormat = (entry, pointer) => {
			if (entry?.format !== "zip") return entry?.format;
			const member = zipEntryAt(entry.view, pointer);
			return typeof member === "object" && member !== null && typeof member.format === "string" ? member.format : "zip";
		};
		pass = (description) => ({
			passed: true,
			description
		});
		fail = (description) => ({
			passed: false,
			description
		});
		unread = (description) => ({
			...fail(description),
			undecided: true
		});
		undecided = (file) => unread(`the view of ${file} is truncated, so what it leaves out is unknown`);
		notFound = (description, cut) => cut ? unread(description) : fail(description);
		NUMERAL = /^[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/u;
		numberOf = (value) => {
			if (typeof value === "number") return value;
			if (typeof value !== "string") return undefined;
			const text = value.trim();
			if (!NUMERAL.test(text)) return undefined;
			const number = Number(text);
			return Number.isFinite(number) ? number : undefined;
		};
		versionView = (version) => !version.present ? undefined : version.view_error === null ? {
			format: version.format,
			view: version.view
		} : {
			format: version.format,
			view: null,
			error: version.view_error
		};
		truncatedView = (format, view) => {
			if (!isRecord(view)) return false;
			if (format === "text" || format === "xml") return view.truncated === true;
			if (format !== "sqlite") return false;
			const tables = isRecord(view.tables) ? Object.values(view.tables) : [];
			return view.tables_truncated === true || tables.some((table) => isRecord(table) && (table.truncated === true || typeof table.error === "string"));
		};
		viewOf = (check, entry, format) => {
			if (entry === undefined) return {
				view: null,
				truncated: false
			};
			if (typeof entry.error === "string") return unread(`${check.file} has no view: ${entry.error}`);
			if (entry.format === null || entry.format === "binary") return fail(`${check.file} is binary and has no view`);
			if (format !== undefined && entry.format !== format) return fail(`${check.file} is read as ${entry.format}, not ${format}`);
			return {
				view: entry.view,
				truncated: truncatedView(entry.format, entry.view)
			};
		};
		compared = (check, n, what) => {
			const { operator, n: expected } = countComparison(check) ?? {
				operator: "equals",
				n: Number.NaN
			};
			const met = operator === "equals" ? n === expected : operator === "at_least" ? n >= expected : n <= expected;
			const description = `${String(n)} ${what}, expected ${operator.replace("_", " ")} ${String(expected)}`;
			return met ? pass(description) : fail(description);
		};
		lineVerdict = (check, entry, shown) => {
			const read = viewOf(check, entry, "text");
			if ("passed" in read) return read;
			const lines = isRecord(read.view) && Array.isArray(read.view.lines) ? read.view.lines.filter((line) => typeof line === "string") : [];
			const file = check.file;
			if (check.kind === "lines_present") {
				const missing = check.lines.find((line) => !lines.includes(line));
				return missing === undefined ? pass(`${file} has the line(s) ${shown(check.lines)}`) : notFound(`${file} has no line ${shown(missing)}`, read.truncated);
			}
			if (read.truncated) return undecided(file);
			if (check.kind === "lines_absent") {
				const found = check.lines.find((line) => lines.includes(line));
				return found === undefined ? pass(`${file} has none of the lines ${shown(check.lines)}`) : fail(`${file} still has the line ${shown(found)}`);
			}
			const { exact, contains } = check;
			const n = lines.filter((line) => contains === undefined ? line === exact : line.includes(contains)).length;
			return compared(check, n, contains === undefined ? `line(s) of ${file} match ${shown(exact ?? "")}` : `line(s) of ${file} contain ${shown(contains)}`);
		};
		joinsElementText = (format, view, pointer, value) => {
			if (!isXmlElement(value)) return false;
			if (format === "xml") return true;
			if (format !== "zip") return false;
			const entry = zipEntryAt(view, pointer);
			return typeof entry === "object" && entry.format === "xml";
		};
		nearVerdict = (at, found, expected, tolerance, join, shown) => {
			const read = join ? elementText(found) : found;
			const number = numberOf(read);
			const within = `within ${shown(tolerance)} of ${shown(expected)}`;
			if (number === undefined) return fail(`${at} is ${shown(found)}, not a number`);
			return Math.abs(number - expected) <= tolerance ? pass(`${at} is ${shown(found)}, ${within}`) : fail(`${at} is ${shown(found)}, not ${within}`);
		};
		unreadOrPartial = (check, format, read, located) => {
			const zip = format === "zip";
			const viewless = zip ? viewlessEntryAt(read.view, check.pointer) : undefined;
			if (viewless !== undefined) {
				const description = `${check.file} entry ${viewless.name} ${viewless.reason}`;
				return viewless.unread ? unread(description) : fail(description);
			}
			const partial = (array) => zip ? zipArrayLeavesOut(read.view, array) : read.truncated;
			return located.searched.some(partial) ? undecided(check.file) : undefined;
		};
		NOTHING = {
			kind: "none",
			searched: [],
			byPosition: []
		};
		noValue = (at, located, cut) => notFound(located.reason === undefined ? `${at} has no value` : `${at}: ${located.reason}`, cut);
		valueVerdict = (check, entry, shown) => {
			const read = viewOf(check, entry, undefined);
			if ("passed" in read) return read;
			const located = entry === undefined ? NOTHING : locatePointer(read.view, check.pointer, entry.format);
			const at = `${check.file} at ${check.pointer}`;
			const unknown = unreadOrPartial(check, entry?.format, read, located);
			if (unknown !== undefined) return unknown;
			if (located.kind === "unresolved") return fail(`${at}: ${located.problem}`);
			const truncated = entry?.format === "zip" ? zipLeavesOutAt(read.view, check.pointer) : read.truncated;
			const whole = check.kind === "value_equals" && typeof check.value === "object" && check.value !== null;
			if (whole && truncated) return undecided(check.file);
			if (check.kind === "value_equals") {
				if (located.kind === "none") return noValue(at, located, truncated);
				if (check.tolerance !== undefined && typeof check.value === "number") {
					const join = joinsElementText(entry?.format, read.view, check.pointer, located.value);
					if (join && truncated) return undecided(check.file);
					return nearVerdict(at, located.value, check.value, check.tolerance, join, shown);
				}
				return equalJsonValues(located.value, check.value) ? pass(`${at} is ${shown(check.value)}`) : fail(`${at} is ${shown(located.value)}, not ${shown(check.value)}`);
			}
			if (truncated) return undecided(check.file);
			return located.kind === "none" ? pass(`${at} has no value`) : fail(`${at} is ${shown(located.value)}`);
		};
		isTextAt = (view, pointer, format) => {
			const segments = pointer.split("/");
			const field = segments.at(-2);
			if (field !== "children" && field !== "attributes") return false;
			const owner = locatePointer(view, segments.slice(0, -2).join("/"), format);
			return owner.kind === "value" && isXmlElement(owner.value);
		};
		notXmlEntry = (check, view) => {
			if (check.pointer.split("/")[3] !== "view") return `${check.file} at ${check.pointer} does not point into an entry's view`;
			const entry = zipEntryAt(view, check.pointer);
			if (typeof entry !== "object" || entry.format === "xml") return undefined;
			const text = (value) => typeof value === "string" ? value : "";
			return `${check.file} entry ${text(entry.name)} is read as ${text(entry.format)}, not xml`;
		};
		comparedText = (check, at, found, shown) => {
			const collapse = check.normalize_whitespace === true;
			const text = collapse ? collapseWhitespace(found) : found;
			const value = collapse ? collapseWhitespace(check.value) : check.value;
			const read = check.text_attribute === undefined ? "" : ` in its ${check.text_attribute} values`;
			const how = `${read}${collapse ? " with whitespace collapsed" : ""}`;
			if (check.kind === "text_equals") return text === value ? pass(`${at} has the text ${shown(value)}${how}`) : fail(`${at} has the text ${shown(text)}${how}, not ${shown(value)}`);
			return text.includes(value) ? pass(`${at} has text containing ${shown(value)}${how}`) : fail(`${at} has the text ${shown(text)}${how}, without ${shown(value)}`);
		};
		textVerdict = (check, entry, shown) => {
			const read = viewOf(check, entry, undefined);
			if ("passed" in read) return read;
			const at = `${check.file} at ${check.pointer}`;
			if (entry === undefined) return fail(`${at} has no value`);
			const zip = entry.format === "zip";
			if (!zip && entry.format !== "xml") return fail(`${check.file} is read as ${String(entry.format)}, not xml`);
			const located = locatePointer(read.view, check.pointer, entry.format);
			const unknown = unreadOrPartial(check, entry.format, read, located);
			if (unknown !== undefined) return unknown;
			const problem = zip ? notXmlEntry(check, read.view) : undefined;
			if (problem !== undefined) return fail(problem);
			if (located.kind === "unresolved") return fail(`${at}: ${located.problem}`);
			const truncated = zip ? zipLeavesOutAt(read.view, check.pointer) : read.truncated;
			if (located.kind === "none") return truncated ? unread(`the view of ${check.file} is truncated, so what it leaves out is unknown (${check.pointer})`) : noValue(at, located, false);
			const found = located.value;
			const attribute = check.text_attribute;
			if (typeof found === "string" ? attribute !== undefined || !isTextAt(read.view, check.pointer, entry.format) : !isXmlElement(found)) return fail(`${at} is ${shown(found)}, not ${attribute === undefined ? "an element, a text node or an attribute value" : "an element"}`);
			if (typeof found !== "string" && truncated) return undecided(check.file);
			return comparedText(check, at, elementText(found, attribute), shown);
		};
		memberVerdict = (check, entry, shown) => {
			const { matching, pointer } = check;
			const read = viewOf(check, entry, undefined);
			if ("passed" in read) return read;
			const located = entry === undefined ? NOTHING : locatePointer(read.view, pointer, entry.format);
			const at = pointer === "" ? check.file : `${check.file} at ${pointer}`;
			const unknown = unreadOrPartial(check, entry?.format, read, located);
			if (unknown !== undefined) return unknown;
			if (located.kind === "unresolved") return fail(`${at}: ${located.problem}`);
			const cut = entry?.format === "zip" ? zipArrayLeavesOut(read.view, pointer) : read.truncated;
			if (located.kind === "none") return cut ? undecided(check.file) : noValue(at, located, false);
			const items = located.value;
			if (!Array.isArray(items)) return fail(`${at} is ${shown(items)}, not an array`);
			if (cut) return undecided(check.file);
			const meets = matching === undefined ? () => true : selectorTest(matching, selectorFormat(entry, pointer)) ?? (() => false);
			return compared(check, items.filter(meets).length, `member(s) of ${at}${matching === undefined ? "" : ` matching ${matching}`}`);
		};
		tableOf = (check, view) => {
			const sqlite = isRecord(view) ? view : {};
			const tables = isRecord(sqlite.tables) ? sqlite.tables : {};
			const table = Object.hasOwn(tables, check.table) ? tables[check.table] : undefined;
			if (table === undefined && sqlite.tables_truncated === true) return undecided(check.file);
			const read = isRecord(table) ? table : {};
			if (typeof read.error === "string") return unread(`${check.file} table ${check.table} could not be read: ${read.error}`);
			return {
				columns: Array.isArray(read.columns) ? read.columns : [],
				rows: Array.isArray(read.rows) ? read.rows : [],
				truncated: read.truncated === true
			};
		};
		countTaskRows = (columns, rows, where) => {
			const conditions = Object.entries(where).map(([column, value]) => [columns.indexOf(column), value]);
			let count = 0;
			for (const row of rows) if (conditions.every(([index, value]) => index >= 0 && equalJsonValues(row[index], value))) count += 1;
			return count;
		};
		rowVerdict = (check, entry, shown) => {
			const read = viewOf(check, entry, "sqlite");
			if ("passed" in read) return read;
			const table = tableOf(check, read.view);
			if ("passed" in table) return table;
			const { columns, rows } = table;
			const name = `${check.file} table ${check.table}`;
			const n = countTaskRows(columns, rows.filter(Array.isArray), check.where ?? {});
			if (check.kind === "row_present") return n > 0 ? pass(`${name} has a row with ${shown(check.where)}`) : notFound(`${name} has no row with ${shown(check.where)}`, table.truncated);
			if (table.truncated) return undecided(check.file);
			if (check.kind === "row_absent") return n === 0 ? pass(`${name} has no row with ${shown(check.where)}`) : fail(`${name} has ${String(n)} row(s) with ${shown(check.where)}`);
			return compared(check, n, `row(s) of ${name}${check.where === undefined ? "" : ` with ${shown(check.where)}`}`);
		};
		verdict = (check, entry, shown) => {
			switch (check.kind) {
				case "file_present": return entry === undefined ? fail(`${check.file} does not exist`) : pass(`${check.file} exists`);
				case "file_absent": return entry === undefined ? pass(`${check.file} does not exist`) : fail(`${check.file} exists`);
				case "lines_present":
				case "lines_absent":
				case "line_count": return lineVerdict(check, entry, shown);
				case "value_equals":
				case "value_absent": return valueVerdict(check, entry, shown);
				case "text_equals":
				case "text_contains": return textVerdict(check, entry, shown);
				case "row_present":
				case "row_absent":
				case "row_count": return rowVerdict(check, entry, shown);
				case "member_count": return memberVerdict(check, entry, shown);
			}
		};
		evaluateTaskChecks = (checks, views, readers = new Map(), redact = (value) => value) => {
			const shown = (value) => ellipsisExcerpt(JSON.stringify(redact(value)), 200);
			return checks.map((check) => ({
				id: check.id,
				...check.kind === "screen_judge" ? unread("a screen judge's question is answered from the computer's screen by the bundle's judge, which REA's evaluator does not run") : verdict(check, "reader" in check && check.reader !== undefined ? readers.get(check.reader) : views.get(check.file), shown)
			}));
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appWithheld.js
var SIGN_IN_START, SIGN_IN_END, MAX_WITHHELD_BYTES, buildConsentSchema, consentFileSchema, homeRelative, namedWithheldPaths, walkGaps, withheldFiles, upper, MAX_VARIABLE, PYTHON_KEYWORDS, PYDANTIC_RESERVED_FIELDS, distinctSetting, withheldSettings;
function init_appWithheld() {
	return (init_appWithheld = __esmMin((() => {
		init_result();
		init_desktopStateDiff();
		init_buildComputerSettings();
		init_sha256Hex();
		SIGN_IN_START = "pre-sign-in";
		SIGN_IN_END = "post-sign-in";
		MAX_WITHHELD_BYTES = 48 * 1024;
		buildConsentSchema = z.strictObject({
			kind: z.enum(["licence", "seed_sign_in"]),
			subject: z.string().min(1),
			url: z.string().optional(),
			words: z.string().min(1),
			recorded_at: z.string().min(1),
			source: z.literal("relayed")
		});
		consentFileSchema = z.strictObject({ consents: z.array(buildConsentSchema) });
		homeRelative = (path, homePath) => {
			const relative = path.startsWith("/") ? homePath(posix.normalize(path)) : path.replace(/^~(?:\/|$)/u, "");
			if (relative === null) return undefined;
			const normalized = posix.normalize(relative).replace(/\/+$/u, "");
			return normalized === "." || normalized === ".." || normalized.startsWith("../") || normalized.startsWith("/") ? undefined : normalized;
		};
		namedWithheldPaths = (paths, homePath, owned) => {
			const named = paths.map((path) => ({
				path,
				home: homeRelative(path, homePath)
			}));
			const outsideHome = named.filter(({ home }) => home === undefined);
			if (outsideHome.length > 0) return err(`${outsideHome.map(({ path }) => path).join(", ")} names no path inside the home; name a file or folder under it, as .config/app/settings.ini`);
			const outside = named.map(({ home }) => home ?? "").filter((home) => !isWithinAny(home, owned));
			if (outside.length > 0) return err(`${outside.join(", ")} lies under none of the paths the bundle owns (${owned.join(", ") || "none"}), so it is not seeded and needs no withholding`);
			return ok([...new Set(named.map(({ home }) => home ?? ""))]);
		};
		walkGaps = (point, diffed) => [
			...point.truncated ? ["stopped at its entry limit"] : [],
			...point.unreadable_directories > 0 ? [`could not list ${String(point.unreadable_directories)} directories`] : [],
			...point.unchecked_paths === 0 ? [] : [`could not check ${String(point.unchecked_paths ?? "an unrecorded number of")} paths`],
			...diffed && point.unconfirmed_changes > 0 ? [`could not confirm ${String(point.unconfirmed_changes)} changes, which it left out`] : []
		];
		withheldFiles = (checkpoints, homePath, owned, { from, to, paths = [] }) => {
			const normalized = namedWithheldPaths(paths, homePath, owned);
			if (!normalized.ok) return normalized;
			const named = normalized.value;
			if (from === undefined && to === undefined) return ok([...new Set(named)].sort());
			if (from === undefined || to === undefined) return err(`A sign-in window needs both ${SIGN_IN_START} and ${SIGN_IN_END}; mark the one missing, around the sign-in`);
			const position = (name) => checkpoints.findIndex((checkpoint) => checkpoint.name === name);
			const start = position(from);
			const end = position(to);
			if (start === -1 || end === -1) return err(`The capture has no checkpoint ${start === -1 ? from : to}; its checkpoints are ${checkpoints.map(({ name }) => name).join(", ")}`);
			if (end <= start) return err(`${to} was marked before ${from}; mark ${from} first`);
			const gaps = checkpoints.slice(start, end + 1).flatMap((point, offset) => {
				const missed = walkGaps(point, offset > 0);
				return missed.length === 0 ? [] : [`at ${point.name} the walk ${missed.join(" and ")}`];
			});
			if (gaps.length > 0) return err(`The walks from ${from} to ${to} may have missed a file the sign-in wrote: ${gaps.join("; ")}. Capture again on a new build computer, or mark no sign-in window and name the files the sign-in writes in withhold`);
			const changed = checkpoints.slice(start + 1, end + 1).flatMap(({ changes }) => changes).filter(({ kind, after }) => kind !== "deleted" && after?.type !== "directory").map(({ path }) => homePath(path)).filter((home) => home !== null && isWithinAny(home, owned));
			return ok([...new Set([...changed, ...named])].sort());
		};
		upper = (text) => text.toUpperCase().replace(/[^A-Z0-9]+/gu, "_").replace(/^_+|_+$/gu, "");
		MAX_VARIABLE = 60;
		PYTHON_KEYWORDS = new Set("and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" "));
		PYDANTIC_RESERVED_FIELDS = new Set([
			"model_config",
			"model_extra",
			"model_fields_set",
			"model_post_init",
			"model_dump",
			"model_dump_json",
			"model_validate",
			"model_validate_json",
			"model_validate_strings"
		]);
		distinctSetting = (named, settings) => {
			const valid = /^[a-z]/u.test(named) && !PYTHON_KEYWORDS.has(named) && !PYDANTIC_RESERVED_FIELDS.has(named) ? named : `file_${named}`;
			let setting = valid;
			for (let count = 2; settings.has(setting); count += 1) setting = `${valid}_${String(count)}`;
			settings.add(setting);
			return setting;
		};
		withheldSettings = (app, files) => {
			const prefix = `REA_${upper(app).slice(0, 20)}_`;
			const taken = new Set(BUILD_COMPUTER_SETTINGS);
			const settings = new Set();
			return files.map((file) => {
				const hash = sha256Hex(file).slice(0, 8).toUpperCase();
				const plain = `${prefix}${upper(file) || "FILE"}`;
				const variable = plain.length <= MAX_VARIABLE && !taken.has(plain) ? plain : `${prefix}${upper(file).slice(-(MAX_VARIABLE - prefix.length - 9))}_${hash}`.replace(/_+(?=_)/gu, "");
				taken.add(variable);
				return {
					file,
					setting: distinctSetting(variable.slice(prefix.length).toLowerCase(), settings),
					variable,
					handle: variable.toLowerCase().replaceAll("_", "-")
				};
			});
		};
	})))();
}

//#endregion
export { DRAFT_VIEW_CHARS, MAX_WITHHELD_BYTES, SIGN_IN_END, SIGN_IN_START, consentFileSchema, countTaskRows, evaluateTaskChecks, init_appTaskChecks, init_appWithheld, init_valueCuts, namedWithheldPaths, numberOf, versionView, withheldFiles, withheldSettings };