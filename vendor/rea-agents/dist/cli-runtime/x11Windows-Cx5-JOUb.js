import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { MAX_JSON_DEPTH, init_jsonValue, jsonValueExceedsDepth, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_safeJson, init_strictUtf8, isStrictUtf8, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_exactJsonNumber, init_zipEndOfCentralDirectory, isExactJsonNumber } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { hasZipLocalHeader, hasZipSignature, init_zipPackageFormat } from "./canonicalOrdering-C7Yzy62j.js";
import { boundedList, describeBoundedList, init_boundedList } from "./boundedList-D6JdQAuV.js";
import { declaredDocumentType, init_xmlDocument, isWellFormedXml, opensLikeXml, parseXmlDocument } from "./xmlDocument-DuM0TF5n.js";
import { byteToHex, init_byteToHex } from "./byteToHex-N4MIskWf.js";
import { SQLITE_DATABASE_OUTPUT_BYTES, init_sqliteDatabase } from "./sqliteDatabase-bbzobPkZ.js";
import { z } from "zod";

//#region dist/domain/desktop/desktopViewPolicy.js
var VIEW_ENVELOPE_DEPTH, MAX_DESKTOP_JSON_VIEW_DEPTH, MAX_DESKTOP_XML_VIEW_DEPTH, DESKTOP_VIEW_DEFAULTS, positive, desktopViewPolicyInputSchema, desktopViewPolicy, desktopViewByteDisplay, desktopViewFileLimitMessage, desktopSqliteViewLimitMessage, pythonDesktopViewPolicy;
function init_desktopViewPolicy() {
	return (init_desktopViewPolicy = __esmMin((() => {
		init_jsonValue();
		init_sqliteDatabase();
		VIEW_ENVELOPE_DEPTH = [
			"normalized_result",
			"paths",
			0,
			"versions",
			0,
			"view",
			"entries",
			0,
			"view"
		].length;
		MAX_DESKTOP_JSON_VIEW_DEPTH = MAX_JSON_DEPTH - VIEW_ENVELOPE_DEPTH;
		MAX_DESKTOP_XML_VIEW_DEPTH = Math.floor((MAX_JSON_DEPTH - VIEW_ENVELOPE_DEPTH - 3) / 2);
		DESKTOP_VIEW_DEFAULTS = {
			file_bytes: 64 * 1024 * 1024,
			sqlite_tables: 64,
			sqlite_rows: 500,
			sqlite_view_bytes: SQLITE_DATABASE_OUTPUT_BYTES,
			text_lines: 5e3,
			xml_nodes: 5e3,
			xml_depth: 64,
			parsed_bytes: 4 * 1024 * 1024,
			json_depth: MAX_JSON_DEPTH / 2,
			zip_entries: 1e3,
			zip_entry_bytes: 16 * 1024 * 1024,
			zip_bytes: 64 * 1024 * 1024,
			zip_ratio: 100
		};
		positive = z.int().positive();
		desktopViewPolicyInputSchema = z.strictObject({
			file_bytes: positive.optional(),
			sqlite_tables: positive.optional(),
			sqlite_rows: positive.optional(),
			sqlite_view_bytes: positive.optional().describe(`Compact UTF-8 JSON bytes retained per projected SQLite table, default ${String(SQLITE_DATABASE_OUTPUT_BYTES)}. Applies on this call and in exported readers. Each reader counts its native numeric spelling, so float thresholds can differ. Independent native value/record and worker reply limits remain fixed and may refuse earlier.`),
			text_lines: positive.optional(),
			xml_nodes: positive.optional(),
			xml_depth: positive.max(MAX_DESKTOP_XML_VIEW_DEPTH).optional(),
			parsed_bytes: positive.optional(),
			json_depth: positive.max(MAX_DESKTOP_JSON_VIEW_DEPTH).optional(),
			zip_entries: positive.optional(),
			zip_entry_bytes: positive.optional(),
			zip_bytes: positive.optional(),
			zip_ratio: positive.optional()
		});
		desktopViewPolicy = (input = {}) => {
			const policy = { ...DESKTOP_VIEW_DEFAULTS };
			for (const key of Object.keys(policy)) {
				const value = input[key];
				if (value !== undefined) policy[key] = value;
			}
			return policy;
		};
		desktopViewByteDisplay = (bytes) => bytes % (1024 * 1024) === 0 ? `${String(bytes / (1024 * 1024))} MiB` : `${String(bytes)} bytes`;
		desktopViewFileLimitMessage = (policy) => `larger than ${desktopViewByteDisplay(policy.file_bytes)}, the most the view reads`;
		desktopSqliteViewLimitMessage = (policy) => `SQLite table view exceeds sqlite_view_bytes=${String(policy.sqlite_view_bytes)} UTF-8 JSON bytes. Increase sqlite_view_bytes in --view-policy on the next call; no restart is needed. The separate SQLite value/record and worker reply limits remain fixed at ${String(SQLITE_DATABASE_OUTPUT_BYTES)} bytes and may refuse earlier.`;
		pythonDesktopViewPolicy = (policy) => {
			const names = {
				file_bytes: "MAX_VIEW_BYTES",
				sqlite_tables: "MAX_TABLES",
				sqlite_rows: "MAX_ROWS",
				sqlite_view_bytes: "MAX_SQLITE_VIEW_BYTES",
				text_lines: "MAX_LINES",
				xml_nodes: "MAX_XML_NODES",
				xml_depth: "MAX_XML_DEPTH",
				parsed_bytes: "MAX_PARSED_BYTES",
				json_depth: "MAX_JSON_VIEW_DEPTH",
				zip_entries: "MAX_ZIP_ENTRIES",
				zip_entry_bytes: "MAX_ZIP_ENTRY_BYTES",
				zip_bytes: "MAX_ZIP_BYTES",
				zip_ratio: "MAX_ZIP_RATIO"
			};
			return [
				...Object.keys(names).map((key) => `${names[key]} = ${String(policy[key])}`),
				`VIEW_TOO_LARGE = ${JSON.stringify(desktopViewFileLimitMessage(policy))}`,
				`SQLITE_VIEW_TOO_LARGE = ${JSON.stringify(desktopSqliteViewLimitMessage(policy))}`,
				`SQLITE_VALUE_BYTES = ${String(SQLITE_DATABASE_OUTPUT_BYTES)}`
			].join("\n");
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/runtimeFiles.js
var LOCK_NAMES, DOCUMENT_LOCK, SIBLING_LOCKS, siblingLockTargets, isLockName, WEB_STORAGE_FOLDERS, WEB_STORAGE_FILES, runtimeFile;
function init_runtimeFiles() {
	return (init_runtimeFiles = __esmMin((() => {
		LOCK_NAMES = new Set([
			"lockfile",
			"lock",
			".lock",
			".parentlock",
			"parent.lock",
			"singletonlock",
			"write.lock"
		]);
		DOCUMENT_LOCK = /^\.~lock\..+#$/su;
		SIBLING_LOCKS = [
			/^(.+)\.lck$/isu,
			/^\.(.+)\.(?:lock|lck)$/isu,
			/^([^.].*\.[^.]+)\.lock$/isu
		];
		siblingLockTargets = (file) => {
			const name = file.split("/").at(-1) ?? "";
			return SIBLING_LOCKS.flatMap((lock) => {
				const locked = lock.exec(name)?.[1];
				return locked === undefined ? [] : [locked];
			});
		};
		isLockName = (file) => {
			const name = file.split("/").at(-1) ?? "";
			return LOCK_NAMES.has(name.toLowerCase()) || DOCUMENT_LOCK.test(name);
		};
		WEB_STORAGE_FOLDERS = new Set([
			"qtwebengine",
			"platform notifications",
			"local storage",
			"session storage",
			"indexeddb",
			"service worker",
			"blob_storage",
			"localstorage",
			"mediakeys",
			"deviceidhashsalts",
			"cachestorage",
			"shared dictionary",
			"shared_proto_db",
			"webstorage"
		]);
		WEB_STORAGE_FILES = new Set([
			"hsts-storage.sqlite",
			"cookies",
			"cookies-journal",
			"network persistent state",
			"transportsecurity",
			"trust tokens",
			"trust tokens-journal",
			"visited links",
			"user_prefs.json"
		]);
		runtimeFile = (file) => {
			const segments = file.split("/");
			const name = (segments.at(-1) ?? "").toLowerCase();
			const folders = segments.slice(0, -1);
			const upTo = (index) => segments.slice(0, index + 1).join("/");
			const storage = folders.findIndex((folder) => WEB_STORAGE_FOLDERS.has(folder.toLowerCase()) || folder === "storage" && (name === "salt" || name === "origin"));
			if (storage >= 0) return {
				kind: "web_storage",
				path: upTo(storage)
			};
			if (WEB_STORAGE_FILES.has(name)) return {
				kind: "web_storage",
				path: file
			};
			const cache = folders.findIndex((folder) => /(?:cache|^caches)$/iu.test(folder));
			return cache < 0 ? undefined : {
				kind: "cache",
				path: upTo(cache)
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/desktopStateDiff.js
var sameContentIdentity, parentOf, covers, diffDesktopStates, isWithinAny;
function init_desktopStateDiff() {
	return (init_desktopStateDiff = __esmMin((() => {
		init_unicodeCodePointOrder();
		sameContentIdentity = (before, after) => before.type === "directory" || before.size === after.size && before.mtime_ns === after.mtime_ns && before.inode === after.inode && before.mode === after.mode;
		parentOf = (path) => path.slice(0, Math.max(1, path.lastIndexOf("/")));
		covers = (walk, path) => {
			if (walk.roots.has(path)) return true;
			for (let directory = parentOf(path);; directory = parentOf(directory)) {
				const ancestor = walk.entries.get(directory);
				if (ancestor !== undefined) return ancestor.type !== "directory" || walk.listed.has(directory);
				if (walk.roots.has(directory)) return true;
				if (directory === "/") return false;
			}
		};
		diffDesktopStates = (before, after) => {
			const differences = [];
			let unconfirmed = 0;
			for (const [path, previous] of before.entries) {
				const next = after.entries.get(path);
				if (next === undefined) {
					if (covers(after, path)) differences.push({
						path,
						kind: "deleted",
						before: previous,
						after: null
					});
					else unconfirmed += 1;
				} else if (next.type !== previous.type) differences.push({
					path,
					kind: "type_changed",
					before: previous,
					after: next
				});
				else if (!sameContentIdentity(previous, next)) differences.push({
					path,
					kind: "modified",
					before: previous,
					after: next
				});
			}
			for (const [path, next] of after.entries) if (!before.entries.has(path)) {
				if (covers(before, path)) differences.push({
					path,
					kind: "created",
					before: null,
					after: next
				});
				else unconfirmed += 1;
			}
			return {
				differences: differences.sort((left, right) => compareUnicodeCodePoints(left.path, right.path)),
				unconfirmed
			};
		};
		isWithinAny = (path, roots) => roots.some((root) => path === root || path.startsWith(root.endsWith("/") ? root : `${root}/`));
	})))();
}

//#endregion
//#region dist/domain/desktop/expatXmlNames.js
var START, MORE, NAME, expatXmlName;
function init_expatXmlNames() {
	return (init_expatXmlNames = __esmMin((() => {
		START = String.raw`\u003A\u0041-\u005A\u005F\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u0131\u0134-\u013E\u0141-\u0148\u014A-\u017E\u0180-\u01C3\u01CD-\u01F0\u01F4-\u01F5\u01FA-\u0217\u0250-\u02A8\u02BB-\u02C1\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03CE\u03D0-\u03D6\u03DA\u03DC\u03DE\u03E0\u03E2-\u03F3\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E-\u0481\u0490-\u04C4\u04C7-\u04C8\u04CB-\u04CC\u04D0-\u04EB\u04EE-\u04F5\u04F8-\u04F9\u0531-\u0556\u0559\u0561-\u0586\u05D0-\u05EA\u05F0-\u05F2\u0621-\u063A\u0641-\u064A\u0671-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D3\u06D5\u06E5-\u06E6\u0905-\u0939\u093D\u0958-\u0961\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8B\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AE0\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B36-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CDE\u0CE0-\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D60-\u0D61\u0E01-\u0E2E\u0E30\u0E32-\u0E33\u0E40-\u0E45\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EAE\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0F40-\u0F47\u0F49-\u0F69\u10A0-\u10C5\u10D0-\u10F6\u1100\u1102-\u1103\u1105-\u1107\u1109\u110B-\u110C\u110E-\u1112\u113C\u113E\u1140\u114C\u114E\u1150\u1154-\u1155\u1159\u115F-\u1161\u1163\u1165\u1167\u1169\u116D-\u116E\u1172-\u1173\u1175\u119E\u11A8\u11AB\u11AE-\u11AF\u11B7-\u11B8\u11BA\u11BC-\u11C2\u11EB\u11F0\u11F9\u1E00-\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A-\u212B\u212E\u2180-\u2182\u3007\u3021-\u3029\u3041-\u3094\u30A1-\u30FA\u3105-\u312C\u4E00-\u9FA5\uAC00-\uD7A3`;
		MORE = String.raw`\u002D-\u002E\u0030-\u0039\u00B7\u02D0-\u02D1\u0300-\u0345\u0360-\u0361\u0387\u0483-\u0486\u0591-\u05A1\u05A3-\u05B9\u05BB-\u05BD\u05BF\u05C1-\u05C2\u05C4\u0640\u064B-\u0652\u0660-\u0669\u0670\u06D6-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962-\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7-\u09C8\u09CB-\u09CD\u09D7\u09E2-\u09E3\u09E6-\u09EF\u0A02\u0A3C\u0A3E-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A66-\u0A71\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B43\u0B47-\u0B48\u0B4B-\u0B4D\u0B56-\u0B57\u0B66-\u0B6F\u0B82-\u0B83\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE7-\u0BEF\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56\u0C66-\u0C6F\u0C82-\u0C83\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5-\u0CD6\u0CE6-\u0CEF\u0D02-\u0D03\u0D3E-\u0D43\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D66-\u0D6F\u0E31\u0E34-\u0E3A\u0E46-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB-\u0EBC\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18-\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F3F\u0F71-\u0F84\u0F86-\u0F8B\u0F90-\u0F95\u0F97\u0F99-\u0FAD\u0FB1-\u0FB7\u0FB9\u20D0-\u20DC\u20E1\u3005\u302A-\u302F\u3031-\u3035\u3099-\u309A\u309D-\u309E\u30FC-\u30FE`;
		NAME = new RegExp(`^[${START}][${START}${MORE}]*$`, "u");
		expatXmlName = (name) => NAME.test(name);
	})))();
}

//#endregion
//#region dist/domain/desktop/desktopTextSyntax.js
/** Read keyfile lines lazily so a plain text file can be rejected immediately. */
function* keyfileLines(text) {
	let start = 0;
	for (const delimiter of text.matchAll(desktopLineBreak)) {
		yield keyfileLine(text.slice(start, delimiter.index));
		start = delimiter.index + delimiter[0].length;
	}
	yield keyfileLine(text.slice(start));
}
var DESKTOP_LINE_BREAK, desktopLineBreak, PYTHON_ECMASCRIPT_TRIM_CHARACTERS, KEYFILE_CONTROL_LINE, KEYFILE_ENTRY_LINE, keyfileControlLine, keyfileEntryLine, keyfileLine, isKeyfile;
function init_desktopTextSyntax() {
	return (init_desktopTextSyntax = __esmMin((() => {
		DESKTOP_LINE_BREAK = String.raw`\r?\n`;
		desktopLineBreak = new RegExp(DESKTOP_LINE_BREAK, "gu");
		PYTHON_ECMASCRIPT_TRIM_CHARACTERS = String.raw`"\t\n\v\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff"`;
		KEYFILE_CONTROL_LINE = String.raw`^(?:[#;][\s\S]*)?$|^\[([^\]]+)\]$`;
		KEYFILE_ENTRY_LINE = String.raw`^([^=]*)=[ \t]*([\s\S]*)$`;
		keyfileControlLine = new RegExp(KEYFILE_CONTROL_LINE, "u");
		keyfileEntryLine = new RegExp(KEYFILE_ENTRY_LINE, "u");
		keyfileLine = (raw) => {
			const control = keyfileControlLine.exec(raw.trim());
			if (control !== null) {
				const name = control[1];
				return name === undefined ? { kind: "skip" } : {
					kind: "group",
					name
				};
			}
			const entry = keyfileEntryLine.exec(raw);
			const key = entry?.[1]?.trim();
			const value = entry?.[2];
			return key === undefined || key === "" || value === undefined ? { kind: "other" } : {
				kind: "entry",
				key,
				value
			};
		};
		isKeyfile = (text) => {
			let group = false;
			for (const { kind } of keyfileLines(text)) {
				if (kind === "other") return false;
				if (kind === "group") group = true;
			}
			return group;
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/stateTextEncoding.js
var UTF16, decodeStateUtf16;
function init_stateTextEncoding() {
	return (init_stateTextEncoding = __esmMin((() => {
		UTF16 = {
			le: new TextDecoder("utf-16le", {
				fatal: true,
				ignoreBOM: true
			}),
			be: new TextDecoder("utf-16be", {
				fatal: true,
				ignoreBOM: true
			})
		};
		decodeStateUtf16 = (bytes) => {
			const order = bytes[0] === 255 && bytes[1] === 254 ? "le" : bytes[0] === 254 && bytes[1] === 255 ? "be" : undefined;
			if (order === undefined) return undefined;
			try {
				return {
					order,
					text: UTF16[order].decode(bytes.subarray(2))
				};
			} catch {
				return undefined;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/stateFormats.js
/** Decode JSON string tokens in bounded chunks without constructing the document. */
function* jsonStringChunks(text, chunkSize = 8192) {
	if (!isJsonText(text)) return;
	for (let at = 0; at < text.length;) {
		if (text.charAt(at) !== "\"") {
			at += 1;
			continue;
		}
		const end = jsonStringEnd(text, at);
		if (end < 0) return;
		let start = at + 1;
		let first = true;
		while (start < end - 1) {
			let next = start;
			while (next < end - 1 && next - start < chunkSize) {
				if (text.charAt(next) === "\\") next += text.charAt(next + 1) === "u" ? 6 : 2;
				else next += 1;
			}
			yield {
				text: JSON.parse(`"${text.slice(start, next)}"`),
				first
			};
			first = false;
			start = next;
		}
		at = end;
	}
}
var SQLITE_HEADER, SQLITE_SIDECARS, GVDB_HEADER, XML_EXTENSIONS, XML_POLICY, decodeStateText, JSON_NUMBER, JSON_HEX4, JSON_ESCAPES, jsonStringEnd, jsonScalarEnd, openJson, jsonPunctuation, jsonScalar, isJsonText, namedJson, namedXml, doctypeOpensSubset, opensElement, doctypeHasInternalSubset, textSyntaxFormat, detectStateFormat, jsonView, textView, plainRecord, keyfileView, XML_WHITESPACE, isTextNode, holdsElementContent, xmlNode, xmlView, isTextualFormat, textualView;
function init_stateFormats() {
	return (init_stateFormats = __esmMin((() => {
		init_exactJsonNumber();
		init_jsonValue();
		init_desktopViewPolicy();
		init_result();
		init_safeJson();
		init_zipPackageFormat();
		init_zipEndOfCentralDirectory();
		init_xmlDocument();
		init_expatXmlNames();
		init_desktopTextSyntax();
		init_stateTextEncoding();
		init_strictUtf8();
		SQLITE_HEADER = "SQLite format 3\0";
		SQLITE_SIDECARS = [{
			suffix: "-wal",
			label: "write-ahead log"
		}, {
			suffix: "-journal",
			label: "rollback journal"
		}];
		GVDB_HEADER = "GVariant";
		XML_EXTENSIONS = /\.(?:xml|xbel|plist|svg|ui)$/iu;
		XML_POLICY = {
			doctype: "external",
			lineEndings: "normalize",
			nameSupported: expatXmlName
		};
		decodeStateText = (bytes) => {
			const utf16 = decodeStateUtf16(bytes);
			if (utf16 !== undefined) return utf16.text.includes("\0") ? undefined : utf16.text;
			if (bytes.subarray(0, 8192).includes(0)) return undefined;
			try {
				return decodeStrictUtf8(bytes, "strip-signature");
			} catch {
				return undefined;
			}
		};
		JSON_NUMBER = /-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/uy;
		JSON_HEX4 = /[0-9a-fA-F]{4}/uy;
		JSON_ESCAPES = new Set([
			"\"",
			"\\",
			"/",
			"b",
			"f",
			"n",
			"r",
			"t"
		]);
		jsonStringEnd = (text, start) => {
			for (let at = start + 1; at < text.length; at += 1) {
				const code = text.charCodeAt(at);
				if (code === 34) return at + 1;
				if (code < 32) return -1;
				if (code === 92) {
					const escape = text.charAt(at + 1);
					JSON_HEX4.lastIndex = at + 2;
					if (escape === "u" && JSON_HEX4.test(text)) at += 5;
					else if (JSON_ESCAPES.has(escape)) at += 1;
					else return -1;
				}
			}
			return -1;
		};
		jsonScalarEnd = (text, start) => {
			if (text.charCodeAt(start) === 34) return jsonStringEnd(text, start);
			for (const literal of [
				"true",
				"false",
				"null"
			]) if (text.startsWith(literal, start)) return start + literal.length;
			JSON_NUMBER.lastIndex = start;
			return JSON_NUMBER.test(text) ? JSON_NUMBER.lastIndex : -1;
		};
		openJson = (scan, bracket) => {
			if (scan.depth === scan.open.length) {
				const grown = new Uint8Array(scan.open.length * 2);
				grown.set(scan.open);
				scan.open = grown;
			}
			scan.open[scan.depth] = bracket;
			scan.depth += 1;
			scan.expect = bracket === 91 ? "value" : "key";
			scan.empty = true;
		};
		jsonPunctuation = (scan, char) => {
			const code = char.charCodeAt(0);
			const inner = scan.depth > 0 ? scan.open[scan.depth - 1] : undefined;
			switch (char) {
				case "[":
				case "{":
					if (scan.expect !== "value") return false;
					openJson(scan, code);
					return true;
				case "]":
				case "}":
					if (scan.expect !== "after" && !scan.empty || inner !== code - 2) return false;
					scan.depth -= 1;
					break;
				case ",":
					if (scan.expect !== "after" || inner === undefined) return false;
					scan.expect = inner === 91 ? "value" : "key";
					return true;
				default:
					if (scan.expect !== "colon") return false;
					scan.expect = "value";
					return true;
			}
			scan.expect = "after";
			scan.empty = false;
			return true;
		};
		jsonScalar = (scan, string) => {
			if (scan.expect === "value") scan.expect = "after";
			else if (string && scan.expect === "key") scan.expect = "colon";
			else return false;
			scan.empty = false;
			return true;
		};
		isJsonText = (text) => {
			const scan = {
				expect: "value",
				empty: false,
				open: new Uint8Array(64),
				depth: 0
			};
			for (let at = 0; at < text.length;) {
				const char = text.charAt(at);
				if (" 	\n\r".includes(char)) at += 1;
				else if ("[]{},:".includes(char)) {
					if (!jsonPunctuation(scan, char)) return false;
					at += 1;
				} else {
					at = jsonScalarEnd(text, at);
					if (at < 0 || !jsonScalar(scan, char === "\"")) return false;
				}
			}
			return scan.expect === "after" && scan.depth === 0;
		};
		namedJson = (path, trimmed) => path.toLowerCase().endsWith(".json") || /^[[{]/u.test(trimmed);
		namedXml = (path, trimmed) => XML_EXTENSIONS.test(path) || trimmed.startsWith("<?xml");
		doctypeOpensSubset = (text, from) => {
			let quote = "";
			for (let index = from; index < text.length; index += 1) {
				const character = text[index] ?? "";
				if (quote !== "") {
					if (character === quote) quote = "";
					continue;
				}
				if (character === "\"" || character === "'") quote = character;
				else if (character === "[") return true;
				else if (character === ">") return false;
			}
			return false;
		};
		opensElement = (trimmed) => {
			if (!trimmed.startsWith("<!DOCTYPE") && opensLikeXml(trimmed)) return true;
			const declared = /^(?:<\?xml[^>]*>\s*)?<!DOCTYPE\b/u.exec(trimmed);
			if (declared === null) return false;
			let quote = "";
			for (let index = declared[0].length; index < trimmed.length; index += 1) {
				const character = trimmed[index] ?? "";
				if (quote !== "") {
					if (character === quote) quote = "";
					continue;
				}
				if (character === "\"" || character === "'") quote = character;
				else if (character === "[") return false;
				else if (character === ">") {
					const rest = trimmed.slice(index + 1).trimStart();
					return opensLikeXml(rest);
				}
			}
			return false;
		};
		doctypeHasInternalSubset = (opening) => {
			const declared = /^(?:<\?xml[^>]*>\s*)?<!DOCTYPE\b/u.exec(opening);
			return declared !== null && doctypeOpensSubset(opening, declared[0].length);
		};
		textSyntaxFormat = (path, text) => {
			const trimmed = text.trimStart();
			if (namedJson(path, trimmed) && isJsonText(text)) return "json";
			if ((namedXml(path, trimmed) || opensElement(trimmed)) && isWellFormedXml(text, { doctype: "external" })) return "xml";
			return "text";
		};
		detectStateFormat = (path, bytes, policy = DESKTOP_VIEW_DEFAULTS) => {
			const header = new TextDecoder("latin1").decode(bytes.subarray(0, 16));
			if (header === SQLITE_HEADER) return "sqlite";
			if (header.startsWith(GVDB_HEADER)) return "dconf";
			if (hasZipLocalHeader(bytes) || bytes.length >= 22 && hasZipSignature(bytes)) return "zip";
			const text = decodeStateText(bytes);
			if (text === undefined) return "binary";
			const trimmed = text.trimStart();
			if (namedJson(path, trimmed) && (bytes.length > policy.parsed_bytes ? isJsonText(text) : safeParseJson(text).ok)) return "json";
			if (namedXml(path, trimmed) || opensElement(trimmed)) return isWellFormedXml(text, XML_POLICY) ? "xml" : "text";
			return isKeyfile(text) ? "keyfile" : "text";
		};
		jsonView = (text, policy) => {
			let rounded = false;
			const parsed = safeParseJson(text, (_key, value, context) => {
				if (typeof value === "number" && !isExactJsonNumber(value, context?.source)) rounded = true;
				return value;
			});
			if (!parsed.ok) return parsed;
			if (rounded) return err("a number in it cannot be read exactly, such as an integer above 2^53");
			const value = parsed.value;
			return jsonValueExceedsDepth(value, policy.json_depth) ? err(`nested deeper than the ${String(policy.json_depth)} levels a JSON view keeps`) : ok(value);
		};
		textView = (text, policy = DESKTOP_VIEW_DEFAULTS) => {
			const lines = text.split(desktopLineBreak);
			if (lines.at(-1) === "") lines.pop();
			return {
				lines: lines.slice(0, policy.text_lines),
				line_count: lines.length,
				truncated: lines.length > policy.text_lines
			};
		};
		plainRecord = () => Object.create(null);
		keyfileView = (text) => {
			const groups = plainRecord();
			let group = "";
			for (const line of keyfileLines(text)) {
				if (line.kind === "group") {
					group = line.name;
					groups[group] ??= plainRecord();
				} else if (line.kind === "entry") (groups[group] ??= plainRecord())[line.key] = line.value;
			}
			return groups;
		};
		XML_WHITESPACE = /^[ \t\r\n]*$/u;
		isTextNode = (node) => node.nodeType === node.TEXT_NODE || node.nodeType === node.CDATA_SECTION_NODE;
		holdsElementContent = (element) => {
			let elements = false;
			for (let child = element.firstChild; child !== null; child = child.nextSibling) if (child.nodeType === child.ELEMENT_NODE) elements = true;
			else if (isTextNode(child) && !XML_WHITESPACE.test(child.nodeValue ?? "")) return false;
			return elements;
		};
		xmlNode = (node, depth, budget, scope, policy) => {
			if (budget.remaining <= 0 || depth > policy.xml_depth) {
				budget.truncated = true;
				return undefined;
			}
			budget.remaining -= 1;
			if (isTextNode(node)) {
				const text = node.nodeValue ?? "";
				return XML_WHITESPACE.test(text) && scope.elementContent && !scope.preserve ? undefined : text;
			}
			if (node.nodeType !== node.ELEMENT_NODE) return undefined;
			const element = node;
			const attributes = plainRecord();
			for (let index = 0; index < element.attributes.length; index += 1) {
				const attribute = element.attributes.item(index);
				if (attribute !== null) attributes[attribute.name] = attribute.value;
			}
			const space = element.getAttribute("xml:space");
			const inner = {
				preserve: space === null || space === "" ? scope.preserve : space === "preserve",
				elementContent: holdsElementContent(element)
			};
			const children = [];
			for (let child = element.firstChild; child !== null; child = child.nextSibling) {
				const value = xmlNode(child, depth + 1, budget, inner, policy);
				if (value !== undefined) children.push(value);
			}
			return {
				name: element.tagName,
				attributes,
				children
			};
		};
		xmlView = (text, policy = DESKTOP_VIEW_DEFAULTS) => {
			const parsed = parseXmlDocument(text, XML_POLICY);
			const root = parsed.ok ? parsed.value.documentElement : null;
			if (!parsed.ok || root === null) return undefined;
			const budget = {
				remaining: policy.xml_nodes,
				truncated: false
			};
			const tree = xmlNode(root, 0, budget, {
				preserve: false,
				elementContent: false
			}, policy);
			if (tree === undefined) return undefined;
			const doctype = declaredDocumentType(parsed.value);
			return {
				...doctype === undefined ? {} : { doctype: {
					name: doctype.name,
					public_id: doctype.publicId,
					system_id: doctype.systemId
				} },
				root: tree,
				truncated: budget.truncated
			};
		};
		isTextualFormat = (format) => format === "text" || format === "json" || format === "keyfile" || format === "xml";
		textualView = (format, bytes, policy = DESKTOP_VIEW_DEFAULTS) => {
			if ((format === "json" || format === "keyfile") && bytes.length > policy.parsed_bytes) return err(`larger than the ${desktopViewByteDisplay(policy.parsed_bytes)} limit for JSON and key file views`);
			const text = decodeStateText(bytes) ?? "";
			switch (format) {
				case "text": return ok(textView(text, policy));
				case "json": return jsonView(text, policy);
				case "keyfile": return ok({ groups: keyfileView(text) });
				case "xml": {
					const tree = xmlView(text, policy);
					return tree === undefined ? err("not well-formed XML, or its DOCTYPE has an internal subset") : ok(tree);
				}
			}
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/stateRoles.js
var SHARED_DESKTOP_PATHS, DESKTOP_TRASH, applicationNames, isApplicationDconfGroup, homePath, hiddenTail, stateDirectoryOf, sqliteSidecarRoots, roleFacts, FILENAME_CHARACTER, NEVER_NAMED, spelledIn, namedInTitles, stateReasons, selectedHomePath, stateRole;
function init_stateRoles() {
	return (init_stateRoles = __esmMin((() => {
		init_desktopStateDiff();
		init_runtimeFiles();
		init_stateFormats();
		SHARED_DESKTOP_PATHS = [
			".cache",
			".config/dconf",
			".config/xfce4",
			".config/gtk-3.0",
			".config/gtk-4.0",
			".config/pulse",
			".local/share/recently-used.xbel",
			".local/share/gvfs-metadata",
			".Xauthority",
			".ICEauthority"
		];
		DESKTOP_TRASH = ".local/share/Trash";
		applicationNames = (capture) => {
			const { application, session } = capture;
			const entryId = application.desktop_entry?.id ?? null;
			return new Set([
				application.package.name?.split(":")[0],
				application.executable.path.split("/").at(-1),
				entryId?.split(".").at(-1),
				application.desktop_entry?.startup_wm_class,
				session.window_match?.class,
				session.window_match?.instance
			].filter((name) => typeof name === "string" && name.length > 0).map((name) => name.toLowerCase()));
		};
		isApplicationDconfGroup = (group, names) => group.toLowerCase().split("/").some((segment) => names.has(segment));
		homePath = (path, home) => path.startsWith(`${home}/`) ? path.slice(home.length + 1) : null;
		hiddenTail = (path) => {
			const index = path.indexOf("/.");
			return index < 0 ? null : path.slice(index + 1);
		};
		stateDirectoryOf = (path, directories) => {
			for (const directory of directories) {
				const parent = directory.slice(0, directory.lastIndexOf("/") + 1);
				if (!path.startsWith(parent)) continue;
				const folder = path.slice(parent.length).split("/")[0] ?? "";
				const name = directory.slice(parent.length).toLowerCase();
				const own = folder.toLowerCase();
				if (folder.length > 0 && (own === name || own.startsWith(name) && /^-?\d+(?:\.\d+)*$/u.test(own.slice(name.length)))) return `${parent}${folder}`;
			}
			return undefined;
		};
		sqliteSidecarRoots = (roots, selected) => {
			const present = new Set(roots);
			return new Set(roots.filter((root) => !selected.has(root) && SQLITE_SIDECARS.some(({ suffix }) => root.endsWith(suffix) && present.has(root.slice(0, -suffix.length)))));
		};
		roleFacts = (capture) => {
			const { application, session, state, host } = capture;
			const named = application.state_directories.map((entry) => entry.path);
			const stateDirectories = [...new Set([...named, ...state.state_directories ?? []])];
			const stateTails = named.map(hiddenTail).filter((tail) => tail !== null);
			const selected = new Set((state.selected_paths ?? []).flatMap((entry) => [entry.path, entry.physical]));
			const sqliteSidecars = sqliteSidecarRoots(state.content_roots, selected);
			return {
				home: host.home,
				stateDirectories,
				stateTails,
				sqliteSidecars,
				selectedRoots: state.content_roots.filter((root) => {
					const relative = homePath(root, host.home);
					const chosen = (state.selected_paths ?? []).some((entry) => entry.path === root || entry.physical === root);
					return !sqliteSidecars.has(root) && (chosen || !stateDirectories.includes(root) && (relative === null || !stateTails.includes(relative)));
				}),
				selections: [...state.selected_paths ?? []].sort((left, right) => right.physical.length - left.physical.length),
				titles: session.windows.filter((window) => window.application).flatMap((window) => window.titles),
				openedFiles: new Set(session.opened_files.map((file) => file.path))
			};
		};
		FILENAME_CHARACTER = /[\p{L}\p{M}\p{N}._~-]/u;
		NEVER_NAMED = [".cache", ".config/dconf"];
		spelledIn = (title, spelling, bare = false) => {
			for (let at = title.indexOf(spelling); at >= 0; at = title.indexOf(spelling, at + 1)) {
				const before = title[at - 1];
				const after = title[at + spelling.length];
				if ((before === undefined || !FILENAME_CHARACTER.test(before)) && (after === undefined || !FILENAME_CHARACTER.test(after)) && after !== "/" && !(bare && before === "/")) return true;
			}
			return false;
		};
		namedInTitles = (path, home, titles) => {
			const name = path.split("/").at(-1) ?? "";
			const relative = homePath(path, home);
			if (relative !== null && isWithinAny(relative, NEVER_NAMED)) return false;
			const bare = name.lastIndexOf(".") <= 0;
			return titles.some((title) => name.length >= 3 && spelledIn(title, name, bare) || relative !== null && spelledIn(title, `~/${relative}`) || spelledIn(title, path));
		};
		stateReasons = (facts, path, changes, dconfApplicationKeys) => {
			const relative = homePath(path, facts.home);
			const reasons = [];
			if (changes.some((change) => change.in_state_directory) || stateDirectoryOf(path, facts.stateDirectories) !== undefined || relative !== null && stateDirectoryOf(relative, facts.stateTails) !== undefined) reasons.push("state_directory");
			if (changes.some((change) => change.opened_by_application) || facts.openedFiles.has(path)) reasons.push("opened_by_application");
			if (namedInTitles(path, facts.home, facts.titles) || facts.selections.some(({ path: selected, physical }) => isWithinAny(path, [physical]) && namedInTitles(`${selected}${path.slice(physical.length)}`, facts.home, facts.titles))) reasons.push("named_in_window_title");
			if (isWithinAny(path, facts.selectedRoots)) reasons.push("selected_path");
			if (dconfApplicationKeys) reasons.push("dconf_application_keys");
			if (relative !== null && isWithinAny(relative, SHARED_DESKTOP_PATHS)) reasons.push("desktop_service");
			if (relative !== null && isWithinAny(relative, [DESKTOP_TRASH])) reasons.push("desktop_trash");
			return reasons;
		};
		selectedHomePath = (facts, path) => {
			const selection = facts.selections.find(({ physical }) => isWithinAny(path, [physical]));
			return (selection === undefined ? null : homePath(`${selection.path}${path.slice(selection.physical.length)}`, facts.home)) ?? homePath(path, facts.home);
		};
		stateRole = (reasons, selectedAs = null) => {
			if (reasons.includes("desktop_trash")) return "shared_desktop";
			const shared = reasons.includes("desktop_service");
			if (reasons.includes("dconf_application_keys") || reasons.includes("state_directory") && !shared) return "application_state";
			if (reasons.includes("named_in_window_title")) return "document";
			if (reasons.includes("selected_path")) return selectedAs !== null && (selectedAs.startsWith(".") || isLockName(selectedAs)) ? "application_state" : "document";
			if (reasons.includes("opened_by_application") && !shared) return "application_state";
			if (shared) return "shared_desktop";
			return "unrelated";
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/desktopCapture.js
var sha256$1, milliseconds, desktopFileFactsSchema, desktopStateChangeSchema, desktopRetainedFileSchema, desktopCheckpointSchema, MAX_ACKNOWLEDGED_FILES, desktopCaptureEventSchema, desktopCaptureProgressSchema, captureProgressEvent, checkpointTaken, desktopEntrySchema, aptSigningKeySchema, aptRepositorySchema, packageFileSchema, packageSchema, desktopApplicationInventorySchema, windowSchema, processSchema, desktopSessionSchema, desktopApplicationCaptureSchema, RESERVED_CHECKPOINT_NAMES, checkpointNameRefusal, DESKTOP_CAPTURE_DEFAULTS;
function init_desktopCapture() {
	return (init_desktopCapture = __esmMin((() => {
		init_boundedList();
		init_runtimeFiles();
		init_stateRoles();
		sha256$1 = z.string().regex(/^[0-9a-f]{64}$/u);
		milliseconds = z.int().min(0);
		desktopFileFactsSchema = z.strictObject({
			type: z.enum([
				"file",
				"directory",
				"symlink",
				"other"
			]),
			size: z.int().min(0),
			mode: z.int().min(0),
			mtime_ns: z.string().regex(/^-?\d+$/u),
			sha256: sha256$1.nullable()
		});
		desktopStateChangeSchema = z.strictObject({
			path: z.string().min(1),
			kind: z.enum([
				"created",
				"modified",
				"deleted",
				"type_changed"
			]),
			before: desktopFileFactsSchema.nullable(),
			after: desktopFileFactsSchema.nullable(),
			in_state_directory: z.boolean(),
			opened_by_application: z.boolean()
		});
		desktopRetainedFileSchema = z.strictObject({
			path: z.string().min(1),
			sha256: sha256$1,
			size: z.int().min(0)
		});
		desktopCheckpointSchema = z.strictObject({
			name: z.string().min(1),
			trigger: z.enum([
				"baseline",
				"request",
				"stop",
				"exit"
			]),
			at_ms: milliseconds,
			entries: z.int().min(0),
			truncated: z.boolean(),
			unreadable_directories: z.int().min(0),
			/** Paths whose state could not be read, and directories on another device not entered; absent from captures written before it was recorded. */
			unchecked_paths: z.int().min(0).optional(),
			/** Differences left out because a walk did not list the parent directory. */
			unconfirmed_changes: z.int().min(0),
			changes: z.array(desktopStateChangeSchema),
			retained: z.array(desktopRetainedFileSchema)
		});
		MAX_ACKNOWLEDGED_FILES = 10;
		desktopCaptureEventSchema = z.discriminatedUnion("kind", [
			z.strictObject({ kind: z.literal("window_open") }),
			z.strictObject({
				kind: z.literal("checkpoint"),
				name: z.string().min(1),
				trigger: desktopCheckpointSchema.shape.trigger,
				at_ms: milliseconds,
				entries: z.int().min(0),
				changes: z.int().min(0),
				retained_files: z.int().min(0),
				retained_bytes: z.int().min(0),
				/**
				* Files, not folders, changed since the checkpoint before: those under a
				* selected path, those the app held open, those in its state
				* directories, the rest, then caches and browser-engine storage, each by
				* path; home-relative under the home. Absent from the acknowledgement of
				* a REA that predates it, such as an older one in a build computer.
				*/
				changed_files: z.array(z.string().min(1)).max(10).optional(),
				/** How many more changed files there are than `changed_files` names; absent with it. */
				more_changed_files: z.int().min(0).optional()
			}),
			z.strictObject({
				kind: z.literal("checkpoint_refused"),
				name: z.string(),
				reason: z.string().min(1)
			})
		]);
		desktopCaptureProgressSchema = z.strictObject({ rea_progress: z.strictObject({
			phase: z.literal("desktop_capture"),
			message: z.string(),
			event: desktopCaptureEventSchema.optional()
		}) });
		captureProgressEvent = (line) => desktopCaptureProgressSchema.parse(JSON.parse(line)).rea_progress.event;
		checkpointTaken = (checkpoint, home, selectedPaths = [], titles = []) => {
			const relative = (path) => path.startsWith(`${home}/`) ? path.slice(home.length + 1) : path;
			const rank = (change) => {
				if (namedInTitles(change.path, home, titles)) return 0;
				if (selectedPaths.includes(change.path)) return 1;
				if (runtimeFile(relative(change.path)) !== undefined) return 6;
				if (change.opened_by_application) return 2;
				if (selectedPaths.some((root) => change.path.startsWith(`${root}/`))) return 3;
				return change.in_state_directory ? 4 : 5;
			};
			const files = checkpoint.changes.filter((change) => (change.after ?? change.before)?.type !== "directory").map((change) => ({
				path: change.path,
				rank: rank(change)
			})).sort((left, right) => left.rank - right.rank || (left.path < right.path ? -1 : left.path > right.path ? 1 : 0)).map(({ path }) => relative(path));
			const changedFiles = boundedList(files, 10);
			return {
				kind: "checkpoint",
				name: checkpoint.name,
				trigger: checkpoint.trigger,
				at_ms: checkpoint.at_ms,
				entries: checkpoint.entries,
				changes: checkpoint.changes.length,
				retained_files: checkpoint.retained.length,
				retained_bytes: checkpoint.retained.reduce((sum, file) => sum + file.size, 0),
				changed_files: [...changedFiles.items],
				more_changed_files: changedFiles.omitted
			};
		};
		desktopEntrySchema = z.strictObject({
			id: z.string().nullable(),
			path: z.string().min(1),
			name: z.string().nullable(),
			exec: z.string().nullable(),
			icon: z.string().nullable(),
			startup_wm_class: z.string().nullable(),
			categories: z.array(z.string()),
			mime_types: z.array(z.string()),
			terminal: z.boolean()
		});
		aptSigningKeySchema = z.strictObject({
			path: z.string().min(1),
			sha256: sha256$1,
			format: z.enum(["binary", "armored"]),
			/** Primary key fingerprint from gpgv's VALIDSIG status. */
			fingerprint: z.string().min(1)
		});
		aptRepositorySchema = z.strictObject({
			/** The source as `apt-cache policy` lists it. */
			source: z.string().min(1),
			/** Null when no sources file entry matches the source. */
			sources_file: z.string().nullable(),
			/** Without the user name and password the entry may hold. */
			uri: z.string().nullable(),
			/** The index Repo-URI observed by apt, without credentials. Older captures omit it. */
			repo_uri: z.string().min(1).optional(),
			/** Whether the entry or index URI held credentials, which REA does not record. */
			uri_credentials_removed: z.boolean().optional(),
			suite: z.string().nullable(),
			/** The index's selected source suite, recorded when it differs from the authored suite. */
			repo_suite: z.string().min(1).optional(),
			/** Empty for a flat repository. */
			components: z.array(z.string()),
			/** Configured component words after one-line decoding, when their spelling differs. */
			repo_components: z.array(z.string()).optional(),
			/** The entry's architecture restriction. `all` allows architecture-independent packages. An empty list depends on the host's APT defaults. Older captures omit this field. */
			architectures: z.array(z.string()).optional(),
			/** The release's Suite (apt's `a=`), or else its Codename, which `<package>/<release>` selects; null when unknown, absent from captures written before it was recorded. */
			release: z.string().nullable().optional(),
			/** The verified key; the key file itself, or the one key of it that verified. */
			signing_key: aptSigningKeySchema.nullable(),
			/** Why no signing key was verified, or why the repository was not checked. */
			signing_key_reason: z.string().optional(),
			/** Installable library packages, and the executable's package, that the Ubuntu 24.04 archive does not offer and this repository's package files list; absent from captures written before it was recorded. */
			supplies: z.array(z.string()).optional()
		});
		packageFileSchema = z.strictObject({
			/** The file's name, without its folder. */
			name: z.string().regex(/^(?!\.\.?$)[^/\0]+$/u),
			sha256: sha256$1,
			size: z.int().min(0),
			package: z.string().min(1),
			version: z.string().min(1),
			architecture: z.string().min(1),
			/** Each Depends entry as the file declares it, alternatives and version constraints included. */
			depends: z.array(z.string()),
			pre_depends: z.array(z.string())
		});
		packageSchema = z.strictObject({
			kind: z.enum([
				"deb",
				"snap",
				"flatpak",
				"appimage",
				"unknown"
			]),
			/** A Debian package is the launched desktop entry's owner, or else the executable's. */
			name: z.string().nullable(),
			/** The executable's Debian package when another package owns the desktop entry; absent otherwise. */
			executable_package: z.string().optional(),
			/** Why the computer cannot install the program the desktop entry runs: `executable_package` is not offered, or, without it, no package owns the program; absent when it can. */
			executable_package_reason: z.string().optional(),
			version: z.string().nullable(),
			architecture: z.string().nullable(),
			/** Package sources listing the installed version; empty for local installs. */
			sources: z.array(z.string()),
			/** The `o=` origin apt reports for each entry of `sources`, by index; null when it reports none. */
			source_origins: z.array(z.string().nullable()).optional(),
			package_lists_present: z.boolean().nullable(),
			/** Sources whose origin is not Ubuntu; absent from captures written before they were recorded. */
			apt_repositories: z.array(aptRepositorySchema).optional(),
			/** Packages owning the shared libraries the executable loads, without the application's own package. */
			library_packages: z.array(z.string()).optional(),
			/** Library packages neither the Ubuntu 24.04 archive nor a declarable vendor repository offers, left out of `library_packages`. */
			uninstallable_library_packages: z.array(z.string()).optional(),
			/** Sonames the executable needs that the host's dynamic linker cache does not list. */
			missing_libraries: z.array(z.string()).optional(),
			/** Libraries found on the host that no package owns. */
			unpackaged_libraries: z.array(z.string()).optional(),
			/** Why the library lists are incomplete; absent when they are complete. */
			library_packages_reason: z.string().optional(),
			/** The `--package-file` the capture named, when it holds the installed name, version and architecture. */
			package_file: packageFileSchema.optional(),
			/** Why the `--package-file` the capture named was not recorded. */
			package_file_reason: z.string().optional()
		});
		desktopApplicationInventorySchema = z.strictObject({
			desktop_entry: desktopEntrySchema.nullable(),
			argv: z.array(z.string()).min(1),
			/** Directory in which the recorded argv is invoked. */
			working_directory: z.string().min(1),
			/** Physical directory selected by an env chdir option, when present. */
			application_working_directory: z.string().min(1).optional(),
			executable: z.strictObject({
				path: z.string().min(1),
				resolved_path: z.string().nullable(),
				electron_markers: z.array(z.enum(["fuse-sentinel", "app-asar"]))
			}),
			package: packageSchema,
			state_directories: z.array(z.strictObject({
				path: z.string().min(1),
				/** Null when the filesystem probe could not establish presence or absence. */
				exists_at_start: z.boolean().nullable(),
				/** The failed existence probe's reason; absent for confirmed presence or absence. */
				existence_error: z.string().optional()
			}))
		});
		windowSchema = z.strictObject({
			id: z.string().regex(/^0x[0-9a-f]+$/u),
			instance: z.string().nullable(),
			class: z.string().nullable(),
			titles: z.array(z.string()),
			pid: z.int().positive().nullable(),
			window_type: z.string().nullable(),
			application: z.boolean(),
			first_seen_ms: milliseconds,
			last_seen_ms: milliseconds
		});
		processSchema = z.strictObject({
			pid: z.int().positive(),
			parent_pid: z.int().min(0),
			command: z.string(),
			/** False for a process found only as the owner of a matching window. */
			started_by_capture: z.boolean(),
			first_seen_ms: milliseconds,
			last_seen_ms: milliseconds
		});
		desktopSessionSchema = z.strictObject({
			started_at: z.iso.datetime(),
			duration_ms: milliseconds,
			end_reason: z.enum([
				"application_exited",
				"stop_requested",
				"time_limit",
				"cancelled"
			]),
			launch_pid: z.int().positive(),
			exit: z.strictObject({
				code: z.int().nullable(),
				signal: z.string().nullable()
			}).nullable(),
			first_window_ms: milliseconds.nullable(),
			window_match: z.strictObject({
				class: z.string(),
				instance: z.string()
			}).nullable(),
			processes: z.array(processSchema),
			windows: z.array(windowSchema),
			opened_files: z.array(z.strictObject({
				path: z.string().min(1),
				first_seen_ms: milliseconds
			})),
			/** The last bytes the launched process wrote to stderr, up to 8 KiB. */
			stderr: z.string(),
			/** Whether earlier stderr was dropped to keep the last bytes. */
			stderr_truncated: z.boolean(),
			/** Whether the run-token sweep confirmed every launched process is gone. */
			cleanup: z.strictObject({
				verified: z.boolean(),
				reason: z.string().nullable()
			})
		});
		desktopApplicationCaptureSchema = z.strictObject({
			host: z.strictObject({
				platform: z.literal("linux"),
				architecture: z.string().min(1),
				display: z.string().min(1),
				home: z.string().min(1),
				/** The host's name and the user's, which captured state can hold; absent from captures written before they were recorded, or when the system could not say. */
				hostname: z.string().min(1).optional(),
				user: z.string().min(1).optional()
			}),
			application: desktopApplicationInventorySchema,
			session: desktopSessionSchema,
			state: z.strictObject({
				roots: z.array(z.string().min(1)).min(1),
				content_roots: z.array(z.string().min(1)),
				/** Non-file entries observed by the baseline walk, without following links. */
				baseline_non_files: z.array(z.strictObject({
					path: z.string().min(1),
					type: z.enum([
						"directory",
						"symlink",
						"other"
					])
				})),
				/**
				* The application's state directories as walked, in their physical
				* spelling; absent from captures written before it was recorded.
				*/
				state_directories: z.array(z.string().min(1)).optional(),
				/**
				* Each `--state-path` and absolute `--argument` among the content roots,
				* absolute as the caller named it, beside the physical spelling walked,
				* so a link keeps what its name means; absent from captures written
				* before it was recorded.
				*/
				selected_paths: z.array(z.strictObject({
					path: z.string().min(1),
					physical: z.string().min(1),
					/** Whether the walked path is a directory; absent from captures written before it was recorded. */
					kind: z.enum(["file", "directory"]).optional()
				})).optional(),
				/** Paths every walk left out; absent from captures written before it was recorded. */
				excluded: z.array(z.string().min(1)).optional(),
				/** At least the baseline; a cancelled capture can stop there. */
				checkpoints: z.array(desktopCheckpointSchema).min(1),
				content_files: z.int().min(0),
				content_bytes: z.int().min(0),
				omitted_content: z.array(z.strictObject({
					path: z.string().min(1),
					reason: z.enum([
						"too_large",
						"budget_exhausted",
						"changed_since_walk",
						"changed_during_read",
						"unreadable"
					])
				})),
				/** Directories the application held files open in whose start state was not retained. */
				unretained_opened_directories: z.array(z.string().min(1))
			}),
			limitations: z.array(z.string())
		});
		RESERVED_CHECKPOINT_NAMES = new Set([
			"baseline",
			"stop",
			"time-limit",
			"exit"
		]);
		checkpointNameRefusal = (name, taken) => {
			if (name === undefined) return undefined;
			if (name.length === 0) return "A checkpoint name cannot be empty.";
			if (RESERVED_CHECKPOINT_NAMES.has(name)) return `The checkpoint name ${name} is reserved for the capture's own checkpoints.`;
			if (taken.has(name)) return `A checkpoint named ${name} was already recorded.`;
			return undefined;
		};
		DESKTOP_CAPTURE_DEFAULTS = {
			maxDurationSeconds: 3600,
			maxEntries: 25e4,
			maxFileBytes: 64 * 1024 * 1024,
			maxContentBytes: 1024 * 1024 * 1024
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/buildCapture.js
var SEED_CHECKPOINT, END_CHECKPOINT, buildCheckpointNameSchema, MAX_BUILD_STATE_PATHS, STATE_PATH_INPUTS, STATE_PATH_INPUTS_MARKDOWN, underHomeSpelling, buildStatePathSchema;
function init_buildCapture() {
	return (init_buildCapture = __esmMin((() => {
		init_desktopCapture();
		SEED_CHECKPOINT = "seed";
		END_CHECKPOINT = "end";
		buildCheckpointNameSchema = z.string().regex(/^[a-z0-9][a-z0-9._\-]{0,62}$/u).refine((name) => !RESERVED_CHECKPOINT_NAMES.has(name), { message: "baseline, stop, time-limit and exit are the capture's own checkpoints" }).describe(`Lowercase letters, digits, dot, dash and underscore. Name the seed ${SEED_CHECKPOINT} and the end ${"end"}: the draft and the export read them.`);
		MAX_BUILD_STATE_PATHS = 16;
		STATE_PATH_INPUTS = "state_paths on start_build_capture, or --state-path on capture-desktop-application";
		STATE_PATH_INPUTS_MARKDOWN = "`state_paths` on `start_build_capture`, or `--state-path` on `capture-desktop-application`";
		underHomeSpelling = (path) => {
			const relative = path.startsWith("~/") ? path.slice(2) : path;
			const segments = relative.split("/");
			return !relative.startsWith("~") && !segments.includes("..") && segments.some((segment) => segment !== "" && segment !== ".");
		};
		buildStatePathSchema = z.string().min(1).max(4096).refine((path) => !path.includes("\0"), { message: "A state path holds no NUL character." }).refine(underHomeSpelling, { message: "Name a file or folder under the home, relative to it, after ~/ or absolute, without '..'." });
	})))();
}

//#endregion
//#region dist/domain/desktop/desktopState.js
var sha256, format, index, DCONF_VIEW_FAILURE_KINDS, dconfViewFailureSchema, versionSchema, changeSchema, desktopStatePathSchema, versionAt, desktopApplicationStateSchema;
function init_desktopState() {
	return (init_desktopState = __esmMin((() => {
		init_jsonValue();
		init_desktopCapture();
		init_desktopViewPolicy();
		sha256 = z.string().regex(/^[0-9a-f]{64}$/u);
		format = z.enum([
			"text",
			"json",
			"keyfile",
			"xml",
			"sqlite",
			"dconf",
			"zip",
			"binary"
		]);
		index = z.int().min(0);
		DCONF_VIEW_FAILURE_KINDS = [
			"not-installed",
			"launch-failed",
			"exited",
			"descriptor-unavailable",
			"profile-write",
			"read-failed",
			"timeout",
			"output-limit",
			"memory-limit",
			"protocol",
			"runtime-exhausted",
			"resource-signal"
		];
		dconfViewFailureSchema = z.strictObject({
			kind: z.enum(DCONF_VIEW_FAILURE_KINDS),
			/** Host errno name, such as `EACCES`, or null when the failure was not an errno. */
			code: z.string().nullable(),
			/** Child status when `kind` is `exited` or `runtime-exhausted`. */
			exit_code: z.int().nullable(),
			/** Executable that was selected, or null before one was chosen. */
			command: z.string().nullable(),
			/** Trimmed child stderr, or null when the child wrote none. */
			stderr: z.string().nullable()
		});
		versionSchema = z.strictObject({
			/** Position of the checkpoint in the capture; names can repeat. */
			checkpoint_index: index,
			checkpoint: z.string().min(1),
			present: z.boolean(),
			/** Null when the file is absent or its bytes were not retained. */
			sha256: sha256.nullable(),
			/** Detected for each version, since a file can change format; a gzip file's is its document's. */
			format: format.nullable(),
			/** Present when the view is of the document inside a gzip file. */
			compression: z.literal("gzip").optional(),
			/** The read value; JSON `null` is a valid view, so check `view_error`. */
			view: jsonValueSchema.nullable(),
			/** Why no view was read, or null when the view (possibly `null`) was read. */
			view_error: z.string().nullable(),
			/** Present when a dconf reader classified the failure. */
			view_failure: dconfViewFailureSchema.optional()
		});
		changeSchema = z.strictObject({
			from_index: index,
			to_index: index,
			from: z.string().min(1),
			to: z.string().min(1),
			kind: z.enum([
				"created",
				"deleted",
				"lines",
				"values",
				"keys",
				"rows",
				"content",
				"format",
				"unreadable"
			]),
			added: z.array(z.string()),
			removed: z.array(z.string()),
			changed: z.array(z.string()),
			added_count: z.int().min(0),
			removed_count: z.int().min(0),
			changed_count: z.int().min(0),
			/** False when a view was truncated, so absences may lie outside the sample. */
			complete: z.boolean()
		});
		desktopStatePathSchema = z.strictObject({
			path: z.string().min(1),
			/** The path relative to the home directory, or null outside it. */
			home_path: z.string().nullable(),
			role: z.enum([
				"application_state",
				"document",
				"shared_desktop",
				"unrelated"
			]),
			reasons: z.array(z.enum([
				"state_directory",
				"opened_by_application",
				"named_in_window_title",
				"selected_path",
				"dconf_application_keys",
				"desktop_service",
				"desktop_trash"
			])),
			/** The latest readable version's format. */
			format: format.nullable(),
			versions: z.array(versionSchema).min(1),
			changes: z.array(changeSchema)
		});
		versionAt = (path, checkpoint) => path.versions.findLast((version) => version.checkpoint_index <= checkpoint);
		desktopApplicationStateSchema = z.strictObject({
			/** Policy actually used to produce these views. */
			effective_view_policy: desktopViewPolicyInputSchema.required(),
			capture: z.strictObject({
				evidence_id: z.string().min(1),
				home: z.string().min(1),
				checkpoints: z.array(z.string().min(1)).min(1),
				/** The capture's own limitations and omitted content, carried forward. */
				limitations: z.array(z.string()),
				omitted_content: desktopApplicationCaptureSchema.shape.state.shape.omitted_content
			}),
			application_names: z.array(z.string()),
			paths: z.array(desktopStatePathSchema),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/desktop/appExportUnowned.js
var MAX_LISTED, SHARED_PARENTS, folderOf, ancestorsOf, topFolder, unownedChangedFolders, isLockFile, KINDS, KIND_LABELS, runtimeSeeds, counted, listed, underHome, fromHome, unretainedOpenedDirectories, unretainedOpenedLimitation, heldOpenLimitation, leftOutLocksLimitation, unreadDconfLimitation, trashedFiles, leftOutFiles, unownedFoldersLimitation, runtimeSeedsLimitation, unownedReadmeNotes;
function init_appExportUnowned() {
	return (init_appExportUnowned = __esmMin((() => {
		init_boundedList();
		init_buildCapture();
		init_desktopState();
		init_desktopStateDiff();
		init_runtimeFiles();
		init_stateRoles();
		MAX_LISTED = 8;
		SHARED_PARENTS = [
			".local/share",
			".local/state",
			".config",
			".cache",
			".local"
		];
		folderOf = (path) => path.split("/").slice(0, -1).join("/");
		ancestorsOf = (path) => {
			const ancestors = [];
			for (let at = path.indexOf("/"); at >= 0; at = path.indexOf("/", at + 1)) ancestors.push(path.slice(0, at));
			return ancestors;
		};
		topFolder = (file) => {
			const shared = SHARED_PARENTS.find((parent) => file.startsWith(`${parent}/`));
			const rest = (shared === undefined ? file : file.slice(shared.length + 1)).split("/");
			const [first = file] = rest;
			if (rest.length === 1) return file;
			if (shared !== undefined) return `${shared}/${first}`;
			return first.startsWith(".") ? first : folderOf(file);
		};
		unownedChangedFolders = (files, owned, leftOut = () => false) => {
			const ownedPaths = new Set(owned);
			const holdingOwned = new Set(owned.flatMap((path) => [path, ...ancestorsOf(path)]));
			const isOwned = (home) => ownedPaths.has(home) || ancestorsOf(home).some((folder) => ownedPaths.has(folder));
			const folders = new Set();
			for (const [home, path] of files) {
				if (path.changes.length === 0 || path.role === "shared_desktop" || isOwned(home) || leftOut(home)) continue;
				folders.add([topFolder(home), folderOf(home)].find((folder) => folder.length > 0 && !holdingOwned.has(folder)) ?? home);
			}
			return [...folders].filter((folder) => !ancestorsOf(folder).some((other) => folders.has(other))).sort();
		};
		isLockFile = (file, stateDirectories, recorded = new Set()) => {
			if (isLockName(file)) return true;
			const name = file.split("/").at(-1) ?? "";
			const folder = folderOf(file);
			const besideItsFile = siblingLockTargets(file).some((locked) => recorded.has(folder.length === 0 ? locked : `${folder}/${locked}`));
			if (besideItsFile) return true;
			return /\.(?:lock|lck)$/iu.test(name) && (folder.length === 0 || stateDirectories.some((directory) => stateDirectoryOf(file, [directory]) === folder));
		};
		KINDS = ["web_storage", "cache"];
		KIND_LABELS = {
			web_storage: "WebKit or Chromium storage",
			cache: "caches"
		};
		runtimeSeeds = (seedFiles) => {
			const byKind = new Map();
			for (const file of seedFiles) {
				const found = runtimeFile(file);
				if (found === undefined) continue;
				const paths = byKind.get(found.kind) ?? new Set();
				paths.add(found.path);
				byKind.set(found.kind, paths);
			}
			return KINDS.flatMap((kind) => {
				const paths = byKind.get(kind);
				return paths === undefined ? [] : [{
					kind,
					paths: [...paths].sort()
				}];
			});
		};
		counted = (names) => describeBoundedList(boundedList(names, MAX_LISTED), ", ");
		listed = (paths, markdown) => counted(paths.map((path) => markdown ? `\`~/${path}\`` : `~/${path}`));
		underHome = (path, home) => path === home ? "" : path.startsWith(`${home}/`) ? path.slice(home.length + 1) : undefined;
		fromHome = (path, home) => {
			const relative = underHome(path, home);
			return relative === undefined ? path : relative === "" ? "~" : `~/${relative}`;
		};
		unretainedOpenedDirectories = (opened, { home, contentRoots, stateDirectories }) => {
			const homeRelative = (path) => path.startsWith(`${home}/`) ? path.slice(home.length + 1) : undefined;
			const relativeStates = stateDirectories.map(homeRelative).filter((path) => path !== undefined);
			const isLock = (path) => {
				const relative = homeRelative(path);
				return relative !== undefined && isLockFile(relative, relativeStates);
			};
			return [...new Set(opened.filter((path) => !isLock(path)).map((path) => path.slice(0, path.lastIndexOf("/")) || "/").filter((folder) => !isWithinAny(folder, contentRoots)))];
		};
		unretainedOpenedLimitation = (directories, home) => directories.length === 0 ? undefined : `The application held files open in ${counted(directories.map((directory) => fromHome(directory, home)))}, whose starting content was not retained; name them with ${STATE_PATH_INPUTS} to retain it.`;
		heldOpenLimitation = (directories, home, seedFiles) => {
			if (directories.length === 0) return undefined;
			const there = seedFiles.filter((file) => directories.some((folder) => isWithinAny(file.source, [folder]))).map((file) => file.seed);
			return `The application held files open in ${counted(directories.map((directory) => fromHome(directory, home)))}, whose content from before the capture was not retained: a file there is seeded only when the capture retained it, such as one written during the capture; the seed holds ${there.length === 0 ? "none" : listed(there, false)} from there.`;
		};
		leftOutLocksLimitation = (locks) => locks.length === 0 ? undefined : `Left out of the seed: lock files the app holds while it runs, since a copied one makes the app find its profile or document in use and can keep it from starting: ${listed(locks, false)}. data/reset restores the seed without them.`;
		unreadDconfLimitation = (databases, seed) => {
			const unread = [...databases].flatMap(([home, path]) => {
				const version = versionAt(path, seed);
				return version?.present === true && version.checkpoint_index > 0 && version.view_error !== null ? [{
					home,
					error: version.view_error
				}] : [];
			});
			if (unread.length === 0) return undefined;
			const names = listed(unread.map(({ home }) => home), false);
			const errors = [...new Set(unread.map(({ error }) => error))].join("; ");
			return `${names} changed by the seed checkpoint but could not be read (${errors}), so the app's settings stored in dconf, if any, are not seeded. Export where dconf-cli is installed, or with REA_DCONF_COMMAND naming dconf; a build computer installs it, so capture again on a new one.`;
		};
		trashedFiles = (files, seed) => [...files].filter(([, path]) => path.reasons.includes("desktop_trash") && versionAt(path, seed)?.present === true).map(([home]) => home).sort();
		leftOutFiles = (files, stateDirectories, selectedFiles = []) => {
			const recorded = new Set(files.keys());
			const besideRecordedFile = (home) => {
				const folder = folderOf(home);
				return siblingLockTargets(home).some((locked) => recorded.has(folder.length === 0 ? locked : `${folder}/${locked}`));
			};
			const isLeftOut = (home) => {
				if (!isLockFile(home, stateDirectories, recorded) || selectedFiles.includes(home)) return false;
				return besideRecordedFile(home) || files.get(home)?.role !== "document";
			};
			return isLeftOut;
		};
		unownedFoldersLimitation = (folders) => folders.length === 0 ? undefined : `${String(folders.length)} file(s) or folder(s) under the home changed during the capture, which the bundle neither owns nor seeds, so the app starts without what it saved there, such as settings a first-run dialog writes: ${listed(folders, false)}. To own them, capture again naming them with ${STATE_PATH_INPUTS}.`;
		runtimeSeedsLimitation = (seeds) => seeds.length === 0 ? undefined : `The seed holds files the app keeps for its own running, seeded as captured: ${seeds.map(({ kind, paths }) => `${KIND_LABELS[kind]} ${listed(paths, false)}`).join("; ")}. A stale one can change how the app starts.`;
		unownedReadmeNotes = (folders, seeds, locks) => [
			...folders.length === 0 ? [] : [`- Neither owned nor seeded, so the app starts without what it saved there: these files or folders, which changed
  during the capture, ${listed(folders, true)}.
  To own them, capture again naming them with ${STATE_PATH_INPUTS_MARKDOWN}.`],
			...seeds.length === 0 ? [] : [`- Seeded as captured, though the app keeps them for its own running, so a stale one can change how it starts:
  ${seeds.map(({ kind, paths }) => `${KIND_LABELS[kind]} ${listed(paths, true)}`).join("; ")}.`],
			...locks.length === 0 ? [] : [`- Left out of the seed: lock files the app holds while it runs, since a copied one can make it find its profile or document
  in use and keep it from starting: ${listed(locks, true)}.`]
		].map((line) => `\n${line}`).join("");
	})))();
}

//#endregion
//#region dist/domain/desktop/desktopLaunchSyntax.js
var DESKTOP_VALUE_ESCAPES, escapeKeys, DESKTOP_VALUE_ESCAPE, DESKTOP_KEY, DESKTOP_KEY_SEPARATOR, DESKTOP_GROUP, DESKTOP_ENTRY_GROUP, QUOTABLE, QUOTED_ESCAPE, QUOTED_PART, EXEC_LEXEME, ENV_UNSET_NAME, envOperandRules, ENV_WRAPPER, ENV_PREFIX;
function init_desktopLaunchSyntax() {
	return (init_desktopLaunchSyntax = __esmMin((() => {
		DESKTOP_VALUE_ESCAPES = {
			s: " ",
			n: "\n",
			t: "	",
			r: "\r",
			"\\": "\\"
		};
		escapeKeys = Object.keys(DESKTOP_VALUE_ESCAPES).join("").replaceAll("\\", "\\\\");
		DESKTOP_VALUE_ESCAPE = String.raw`\\([${escapeKeys}])`;
		DESKTOP_KEY = String.raw`[A-Za-z0-9-]+`;
		DESKTOP_KEY_SEPARATOR = String.raw`[ \t]*=[ \t]*`;
		DESKTOP_GROUP = String.raw`\[([^\]]+)\]`;
		DESKTOP_ENTRY_GROUP = "Desktop Entry";
		QUOTABLE = String.raw`["\x60$\\]`;
		QUOTED_ESCAPE = String.raw`\\(${QUOTABLE})`;
		QUOTED_PART = String.raw`"((?:\\${QUOTABLE}|\\(?!${QUOTABLE})|[^"\\])*)"`;
		EXEC_LEXEME = String.raw`${QUOTED_PART}|([^" \t]+)|([ \t]+)`;
		ENV_UNSET_NAME = String.raw`[^=\x00]+`;
		envOperandRules = (kind, shortOption) => [
			{
				kind,
				pattern: `--${kind}`
			},
			{
				kind,
				pattern: String.raw`--${kind}=([\s\S]*)`,
				operand: 1
			},
			{
				kind,
				pattern: String.raw`-(i*)${shortOption}([\s\S]+)?`,
				operand: 2,
				clear: 1
			}
		];
		ENV_WRAPPER = String.raw`(?:[\s\S]*/)?env`;
		ENV_PREFIX = [
			{
				repeat: true,
				rules: [
					{
						kind: "clear",
						pattern: "-i+|--ignore-environment"
					},
					...envOperandRules("chdir", "C"),
					...envOperandRules("unset", "u")
				]
			},
			{
				repeat: false,
				rules: [{
					kind: "separator",
					pattern: "--"
				}]
			},
			{
				repeat: false,
				rules: [{
					kind: "clear",
					pattern: "-"
				}]
			},
			{
				repeat: true,
				rules: [{
					kind: "assignment",
					pattern: String.raw`[A-Za-z_][A-Za-z0-9_]*=[\s\S]*`
				}]
			}
		];
	})))();
}

//#endregion
//#region dist/domain/desktop/desktopEntry.js
var GROUP, GLIB_GROUP_LEADING_SPACE, GLIB_GROUP_TRAILING_SPACE, INVALID_GROUP_NAME_CHARACTER, LINE_WITH_SEPARATOR, ENTRY, valueEscape, BOOLEAN_TRUE, unescapeValue, escapeDesktopEntryValue, listValue, readDesktopEntryFields, parseDesktopEntry, execLexeme, quotedEscape, tokenizeDesktopExec, EXEC_RESERVED, quotable, formatDesktopExec, replaceDesktopExec, FILE_FIELD_CODES, execTakesFiles, expandDesktopExec, FLATPAK_RUN_VALUE_OPTIONS, flatpakApplication, envUnsetName, envWrapper, envPhases, envMatch, desktopEnvironment, unwrapDesktopCommand;
function init_desktopEntry() {
	return (init_desktopEntry = __esmMin((() => {
		init_result();
		init_desktopLaunchSyntax();
		init_desktopTextSyntax();
		GROUP = new RegExp(String.raw`^(\s*)${DESKTOP_GROUP}(\s*)$`, "u");
		GLIB_GROUP_LEADING_SPACE = /^[ \t\f\r]*$/u;
		GLIB_GROUP_TRAILING_SPACE = /^[ \t]*$/u;
		INVALID_GROUP_NAME_CHARACTER = /[[\]\u0000-\u001f\u007f]/u;
		LINE_WITH_SEPARATOR = new RegExp(`(${DESKTOP_LINE_BREAK})`, "u");
		ENTRY = new RegExp(`^(?<key>${DESKTOP_KEY})(?<locale>\\[[A-Za-z0-9_.@-]+\\])?${DESKTOP_KEY_SEPARATOR}(?<value>.*)$`, "su");
		valueEscape = new RegExp(DESKTOP_VALUE_ESCAPE, "gu");
		BOOLEAN_TRUE = /^[ \t\f\r]*(?:true|1)[ \t\f\r]*$/u;
		unescapeValue = (value) => value.replace(valueEscape, (match, next) => DESKTOP_VALUE_ESCAPES[next] ?? match);
		escapeDesktopEntryValue = (value) => {
			let escaped = "";
			let leading = true;
			for (const character of value) {
				switch (character) {
					case " ":
						escaped += leading ? "\\s" : " ";
						break;
					case "	":
						escaped += leading ? "\\t" : "	";
						break;
					case "\n":
						escaped += "\\n";
						break;
					case "\r":
						escaped += "\\r";
						break;
					case "\\":
						escaped += "\\\\";
						leading = false;
						break;
					default:
						escaped += character;
						leading = false;
						break;
				}
			}
			return escaped;
		};
		listValue = (value) => {
			if (value === undefined) return [];
			const entries = [];
			let entry = "";
			for (let index = 0; index < value.length; index += 1) {
				const character = value.charAt(index);
				const next = value.charAt(index + 1);
				if (character === "\\" && next.length > 0) {
					entry += next === ";" ? ";" : DESKTOP_VALUE_ESCAPES[next] ?? `\\${next}`;
					index += 1;
				} else if (character === ";") {
					entries.push(entry);
					entry = "";
				} else entry += character;
			}
			if (entry.length > 0) entries.push(entry);
			return entries;
		};
		readDesktopEntryFields = (text) => {
			const parts = text.split(LINE_WITH_SEPARATOR);
			const fields = new Map();
			let group;
			let found = false;
			let malformedLine;
			for (let index = 0; index < parts.length; index += 2) {
				const raw = parts[index];
				const line = raw.trim();
				if (line.length === 0 || line.startsWith("#")) continue;
				const [, leading = "", header, trailing = ""] = GROUP.exec(raw) ?? [];
				if (header !== undefined) {
					if (group === undefined && header !== "Desktop Entry" || INVALID_GROUP_NAME_CHARACTER.test(header) || !GLIB_GROUP_LEADING_SPACE.test(leading) || !GLIB_GROUP_TRAILING_SPACE.test(trailing)) malformedLine ??= index / 2 + 1;
					group = header;
					found ||= group === DESKTOP_ENTRY_GROUP;
					continue;
				}
				const entry = ENTRY.exec(raw.trimStart());
				if (group === undefined || entry?.groups === undefined) {
					malformedLine ??= index / 2 + 1;
					continue;
				}
				if (group !== "Desktop Entry" || entry.groups.locale !== undefined) continue;
				const { key, value } = entry.groups;
				if (key !== undefined && value !== undefined) fields.set(key, {
					value: key === "Type" ? value.trimEnd() : value,
					part: index
				});
			}
			return {
				parts,
				fields,
				found,
				malformedLine
			};
		};
		parseDesktopEntry = (text) => {
			const { fields, found, malformedLine } = readDesktopEntryFields(text);
			if (!found) return err("missing_desktop_entry_group");
			const rawField = (key) => fields.get(key)?.value;
			const field = (key) => {
				const value = rawField(key);
				return value === undefined ? null : unescapeValue(value);
			};
			return ok({
				type: field("Type"),
				name: field("Name"),
				exec: field("Exec"),
				try_exec: field("TryExec"),
				path: field("Path"),
				icon: field("Icon"),
				startup_wm_class: field("StartupWMClass"),
				categories: listValue(rawField("Categories")),
				mime_types: listValue(rawField("MimeType")),
				terminal: BOOLEAN_TRUE.test(rawField("Terminal") ?? ""),
				hidden: BOOLEAN_TRUE.test(rawField("Hidden") ?? ""),
				...malformedLine === undefined ? {} : { malformed_line: malformedLine }
			});
		};
		execLexeme = new RegExp(EXEC_LEXEME, "uy");
		quotedEscape = new RegExp(QUOTED_ESCAPE, "gu");
		tokenizeDesktopExec = (exec) => {
			const tokens = [];
			let current;
			execLexeme.lastIndex = 0;
			while (execLexeme.lastIndex < exec.length) {
				const part = execLexeme.exec(exec);
				if (part === null) return err("unterminated_quote");
				const [, quoted, unquoted, separator] = part;
				if (separator !== undefined) {
					if (current !== undefined) tokens.push(current);
					current = undefined;
				} else current = (current ?? "") + (quoted?.replace(quotedEscape, "$1") ?? unquoted);
			}
			if (current !== undefined) tokens.push(current);
			return tokens.length === 0 ? err("empty_command") : ok(tokens);
		};
		EXEC_RESERVED = /[\t\n\r "'\\><~|&;$*?#()`]/u;
		quotable = new RegExp(QUOTABLE, "gu");
		formatDesktopExec = (argv) => argv.map((argument) => argument.length > 0 && !EXEC_RESERVED.test(argument) ? argument : `"${argument.replace(quotable, (character) => `\\${character}`)}"`).join(" ");
		replaceDesktopExec = (text, exec) => {
			const { parts, fields } = readDesktopEntryFields(text);
			const execField = fields.get("Exec");
			if (execField === undefined) return err("missing_exec_line");
			parts[execField.part] = `Exec=${escapeDesktopEntryValue(exec)}`;
			return ok(parts.join(""));
		};
		FILE_FIELD_CODES = new Set([
			"%f",
			"%F",
			"%u",
			"%U"
		]);
		execTakesFiles = (exec) => {
			const tokens = tokenizeDesktopExec(exec);
			return tokens.ok && tokens.value.some((token) => FILE_FIELD_CODES.has(token));
		};
		expandDesktopExec = (tokens, context, arguments_) => {
			const expanded = [];
			for (const token of tokens) {
				if (FILE_FIELD_CODES.has(token)) continue;
				if (token === "%i") {
					if (context.icon !== null) expanded.push("--icon", context.icon);
					continue;
				}
				expanded.push(token.replace(/%(.)/gu, (match, code) => {
					if (code === "%") return "%";
					if (code === "c") return context.name ?? "";
					if (code === "k") return context.location ?? "";
					return /[fFuUidDnNvm]/u.test(code) ? "" : match;
				}));
			}
			return [...expanded, ...arguments_];
		};
		FLATPAK_RUN_VALUE_OPTIONS = new Set([
			"--arch",
			"--command",
			"--cwd",
			"--branch",
			"--runtime",
			"--runtime-version",
			"--commit",
			"--runtime-commit",
			"--parent-pid",
			"--instance-id-fd",
			"--app-path",
			"--usr-path",
			"--installation",
			"--share",
			"--unshare",
			"--socket",
			"--nosocket",
			"--device",
			"--nodevice",
			"--allow",
			"--disallow",
			"--filesystem",
			"--nofilesystem",
			"--env",
			"--env-fd",
			"--unset-env",
			"--own-name",
			"--talk-name",
			"--no-talk-name",
			"--system-own-name",
			"--system-talk-name",
			"--system-no-talk-name",
			"--add-policy",
			"--remove-policy",
			"--persist",
			"--usb",
			"--nousb",
			"--usb-list",
			"--usb-list-file"
		]);
		flatpakApplication = (argv, start) => {
			for (let index = start; index < argv.length; index += 1) {
				const token = argv[index] ?? "";
				if (token === "--") return {
					application_id: argv[index + 1]?.split("/")[0] || null,
					argumentIndex: Math.min(index + 2, argv.length)
				};
				if (!token.startsWith("-")) return {
					application_id: token.split("/")[0] || null,
					argumentIndex: index + 1
				};
				if (FLATPAK_RUN_VALUE_OPTIONS.has(token)) index += 1;
			}
			return {
				application_id: null,
				argumentIndex: argv.length
			};
		};
		envUnsetName = new RegExp(`^(?:${ENV_UNSET_NAME})$`, "u");
		envWrapper = new RegExp(`^${ENV_WRAPPER}$`, "u");
		envPhases = ENV_PREFIX.map(({ repeat, rules }) => ({
			repeat,
			rules: rules.map((rule) => ({
				rule,
				pattern: new RegExp(`^(?:${rule.pattern})$`, "u")
			}))
		}));
		envMatch = (phase, token) => {
			for (const { rule, pattern } of phase.rules) {
				const captures = pattern.exec(token);
				if (captures !== null) return {
					rule,
					captures
				};
			}
			return undefined;
		};
		desktopEnvironment = (argv) => {
			let index = 1;
			let clearEnvironment = false;
			let chdir;
			const unsetEnvironment = [];
			const environment = Object.create(null);
			for (const phase of envPhases) {
				while (index < argv.length) {
					const token = argv[index];
					const match = envMatch(phase, token);
					if (match === undefined) break;
					const { rule, captures } = match;
					const start = index;
					index += 1;
					if (rule.kind === "clear") clearEnvironment = true;
					if (rule.kind === "assignment") {
						const split = token.indexOf("=");
						environment[token.slice(0, split)] = token.slice(split + 1);
					}
					if (rule.kind === "chdir" || rule.kind === "unset") {
						const attached = rule.operand === undefined ? undefined : captures[rule.operand];
						const separate = attached === undefined;
						const value = separate ? argv[index] ?? "" : attached;
						if (separate) index += 1;
						const combined = rule.clear !== undefined && Boolean(captures[rule.clear]);
						clearEnvironment ||= combined;
						if (rule.kind === "unset") unsetEnvironment.push(value);
						else chdir = {
							path: value,
							start,
							end: index,
							...combined ? { includesClearEnvironment: true } : {}
						};
					}
					if (!phase.repeat) break;
				}
			}
			return {
				index,
				chdir,
				clearEnvironment,
				environment,
				unsetEnvironment
			};
		};
		unwrapDesktopCommand = (argv) => {
			const { index, chdir, clearEnvironment, environment, unsetEnvironment } = envWrapper.test(argv[0] ?? "") ? desktopEnvironment(argv) : {
				index: 0,
				chdir: undefined,
				clearEnvironment: false,
				unsetEnvironment: [],
				environment: Object.create(null)
			};
			const program = argv[index] ?? "";
			const wrapperOptions = {
				...chdir === undefined ? {} : { chdir },
				...clearEnvironment ? { clearEnvironment: true } : {},
				...unsetEnvironment.length === 0 ? {} : { unsetEnvironment },
				...!clearEnvironment && unsetEnvironment.some((name) => !envUnsetName.test(name)) ? { invalidUnset: true } : {}
			};
			if (program.split("/").at(-1) === "flatpak" && argv[index + 1] === "run") return {
				kind: "flatpak",
				program,
				index,
				environment,
				...flatpakApplication(argv, index + 2),
				...wrapperOptions
			};
			return {
				kind: "direct",
				program,
				environment,
				index,
				argumentIndex: index + 1,
				...wrapperOptions
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/aptRepositories.js
/** Keep the position of undecodable lines without inserting replacement text. */
function* sourceLines(text) {
	if (typeof text === "string") {
		yield* text.split("\n");
		return;
	}
	for (let start = 0; start <= text.length;) {
		const end = text.indexOf(10, start);
		const line = text.subarray(start, end === -1 ? text.length : end);
		if (line[0] === 35) yield "#";
		else yield isStrictUtf8(line) ? line.toString("utf8") : undefined;
		if (end === -1) break;
		start = end + 1;
	}
}
var ARMOR_BEGIN, ARMOR_END, fieldValues, optionValues, sourceArchitectures, withoutOptionalTrailingSlash, ONE_LINE_ESCAPED_USER_INFO, USER_INFO, withoutCredentials, withoutCredentialsIn, withTrailingSlash, SCHEME_PREFIX, LONG_MAX, LONG_MIN, PORT_MAGNITUDE_LIMIT, isAsciiSpace, aptPort, authorityEnd, debracketHost, renderHostUri, aptAuthorityUri, deb822RepoUri, inlineKeyBlock, expandAptArchitecture, aptIndexSourceSuite, isRelease, stanza, ONE_LINE_PREFIX, withoutOneLineComment, hexDigit, decodeAptListWord, readAptListWord, aptListWords, readAptListOptions, parseOneLineSources, trimDeb822Line, deb822Paragraphs, APT_DISABLED, parseDeb822Sources, SOURCES_ENTRY, parseAptIndexTargets, entryForTarget, oneLineSource, legacyAptListToken, aptRepositoryHoldsCredentials, httpSourceUri, isDeb822ReplayToken, replayUri, aptRepositoryReplay, declaredPackageFiles, repositorySupplies, parseAptConfigShell, QUOTED, aptListFileName, isUbuntuProRepository, UNTRUSTED_SIGNATURE, validSignature, isArmoredKey, dearmorPublicKeys;
function init_aptRepositories() {
	return (init_aptRepositories = __esmMin((() => {
		init_byteToHex();
		init_result();
		init_strictUtf8();
		ARMOR_BEGIN = "-----BEGIN PGP PUBLIC KEY BLOCK-----";
		ARMOR_END = "-----END PGP PUBLIC KEY BLOCK-----";
		fieldValues = (value) => (value ?? "").split(/[ \t\n\v\f\r]+/u).filter((part) => part.length > 0);
		optionValues = (value) => (value ?? "").split(/[\s,]+/u).filter((part) => part.length > 0);
		sourceArchitectures = (options) => {
			const base = optionValues(options.get("arch"));
			if (base.length === 0) return [];
			const selected = new Set([...base, ...optionValues(options.get("arch+"))]);
			for (const removed of optionValues(options.get("arch-"))) selected.delete(removed);
			return selected.size === 0 ? ["all"] : [...selected];
		};
		withoutOptionalTrailingSlash = (uri) => uri.replace(/(?<!\/)\/$/u, "");
		ONE_LINE_ESCAPED_USER_INFO = /^[a-z][a-z0-9+.-]*:\/\/(?:(?!%2f)[^/])*%40/iu;
		USER_INFO = /^(?<scheme>[a-z][a-z0-9+.-]*:\/\/)[^/]*@/iu;
		withoutCredentials = (uri) => uri.replace(USER_INFO, "$<scheme>");
		withoutCredentialsIn = (text) => text.replace(/(?<scheme>[a-z][a-z0-9+.-]*:\/\/)[^\s/]*@/giu, "$<scheme>");
		withTrailingSlash = (uri) => uri.endsWith("/") ? uri : `${uri}/`;
		SCHEME_PREFIX = /^([a-z][a-z0-9+.-]*):/iu;
		LONG_MAX = (1n << 63n) - 1n;
		LONG_MIN = -(1n << 63n);
		PORT_MAGNITUDE_LIMIT = LONG_MAX + 1n;
		isAsciiSpace = (character) => character === " " || character === "	" || character === "\n" || character === "\v" || character === "\f" || character === "\r";
		aptPort = (suffix) => {
			let index = 0;
			while (index < suffix.length && isAsciiSpace(suffix[index] ?? "")) index += 1;
			const sign = suffix[index];
			const negative = sign === "-";
			if (sign === "+" || sign === "-") index += 1;
			let magnitude = 0n;
			let overflow = false;
			while (index < suffix.length) {
				const code = suffix.charCodeAt(index);
				if (code < 48 || code > 57) break;
				index += 1;
				if (overflow) continue;
				const digit = BigInt(code - 48);
				if (magnitude > (PORT_MAGNITUDE_LIMIT - digit) / 10n) {
					overflow = true;
					continue;
				}
				magnitude = magnitude * 10n + digit;
			}
			const value = overflow ? negative ? LONG_MIN : LONG_MAX : negative ? -magnitude : magnitude > LONG_MAX ? LONG_MAX : magnitude;
			return Number(BigInt.asUintN(32, BigInt.asIntN(32, value)));
		};
		authorityEnd = (value) => {
			let inBracket = false;
			for (let index = 0; index < value.length; index += 1) {
				const character = value[index];
				if (character === "[") inBracket = true;
				else if (character === "]" && inBracket) inBracket = false;
				else if (character === "/" && !inBracket) return index;
			}
			return value.length;
		};
		debracketHost = (host) => {
			const pieces = [];
			let start = 0;
			let length = 0;
			let portEnd = 0;
			let inBracket = false;
			for (let index = 0; index < host.length; index += 1) {
				const character = host[index];
				const opening = character === "[";
				const closing = inBracket && character === "]";
				if (!opening && !closing) continue;
				if (index > start) {
					pieces.push(host.slice(start, index));
					length += index - start;
				}
				start = index + 1;
				if (opening) inBracket = true;
				else {
					inBracket = false;
					portEnd = length;
				}
			}
			if (start < host.length) pieces.push(host.slice(start));
			return {
				text: pieces.join(""),
				portEnd,
				open: inBracket
			};
		};
		renderHostUri = (schemeText, authority, path, sawSlashes) => {
			if (authority.length === 0) return sawSlashes && path.length === 0 ? `${schemeText}://` : `${schemeText}:${path}`;
			const at = authority.lastIndexOf("@");
			const userinfo = at === -1 ? "" : authority.slice(0, at + 1);
			const separated = debracketHost(at === -1 ? authority : authority.slice(at + 1));
			if (separated.open) return `${schemeText}:${path}`;
			let host = separated.text;
			const colon = host.lastIndexOf(":");
			let port = 0;
			if (colon !== -1 && colon >= separated.portEnd) {
				port = aptPort(host.slice(colon + 1));
				host = host.slice(0, colon);
			}
			if (host.length === 0) return `${schemeText}:${path}`;
			const rendered = host.includes(":") || host.includes("/") ? `[${host}]` : host;
			const renderedPort = port === 0 ? "" : `:${String(port)}`;
			return `${schemeText}://${userinfo}${rendered}${renderedPort}${path}`;
		};
		aptAuthorityUri = (uri) => {
			const scheme = SCHEME_PREFIX.exec(uri);
			if (scheme === null) return uri;
			const schemeText = scheme[1] ?? "";
			const after = uri.slice(scheme[0].length);
			if (after.startsWith("//")) {
				const rest = after.slice(2);
				const end = authorityEnd(rest);
				return renderHostUri(schemeText, rest.slice(0, end), rest.slice(end), true);
			}
			if (after.startsWith("/")) return `${schemeText}:${after}`;
			const end = authorityEnd(after);
			return renderHostUri(schemeText, after.slice(0, end), after.slice(end), false);
		};
		deb822RepoUri = (uri) => withTrailingSlash(aptAuthorityUri(uri));
		inlineKeyBlock = (value) => {
			if (!value.includes(ARMOR_BEGIN)) return null;
			const lines = value.split("\n").map((line) => {
				const stripped = line.trim();
				return stripped === "." ? "" : stripped;
			});
			const begin = Math.max(lines.indexOf(ARMOR_BEGIN), 0);
			const end = lines.lastIndexOf(ARMOR_END);
			return `${lines.slice(begin, end < begin ? lines.length : end + 1).join("\n")}\n`;
		};
		expandAptArchitecture = (value, architecture) => {
			const variable = "$(ARCH)";
			if (!value.includes(variable)) return value;
			return architecture === undefined ? undefined : value.replaceAll(variable, architecture);
		};
		aptIndexSourceSuite = (target) => target.release || "/";
		isRelease = (suite, target) => expandAptArchitecture(suite, target.configuredArchitecture) === aptIndexSourceSuite(target);
		stanza = (at, fields) => {
			const signedBy = fields.options.get("signed-by") ?? "";
			const inlineKey = inlineKeyBlock(signedBy);
			return {
				...at,
				format: fields.oneLine === undefined ? "deb822" : "one-line",
				...fields.oneLine !== undefined && (fields.oneLine.suite !== fields.suites[0] || fields.oneLine.components.some((value, index) => value !== fields.components[index])) ? { oneLine: {
					suite: fields.oneLine.suite,
					components: fields.oneLine.components
				} } : {},
				uris: fields.uris.map((source) => {
					const uri = withoutCredentials(source);
					const effective = fields.oneLine?.uri;
					const ambiguous = effective !== undefined && (ONE_LINE_ESCAPED_USER_INFO.test(uri) || withoutCredentials(effective) !== effective && source === uri);
					return ambiguous ? {
						uri: null,
						credentials: true
					} : {
						uri,
						credentials: source !== uri
					};
				}),
				suites: fields.suites,
				components: fields.components,
				architectures: sourceArchitectures(fields.options),
				signedBy: inlineKey === null ? optionValues(signedBy) : [],
				inlineKey
			};
		};
		ONE_LINE_PREFIX = /^[ \t\r]*deb[ \t\v][ \t\v\f\r]*/u;
		withoutOneLineComment = (line) => {
			if (!line.includes("#")) return line;
			let brackets = 0;
			for (let index = 0; index < line.length; index += 1) {
				const character = line[index];
				if (character === "[") brackets += 1;
				else if (character === "]") brackets -= 1;
				else if (character === "#" && brackets <= 0) return line.slice(0, index);
			}
			return line;
		};
		hexDigit = (byte) => {
			if (byte >= 48 && byte <= 57) return byte - 48;
			if (byte >= 65 && byte <= 70) return byte - 65 + 10;
			if (byte >= 97 && byte <= 102) return byte - 97 + 10;
			return -1;
		};
		decodeAptListWord = (word) => {
			if (!/["%]/u.test(word)) return word;
			const input = Buffer.from(word);
			const output = Buffer.allocUnsafe(input.length);
			let written = 0;
			for (let offset = 0; offset < input.length; offset += 1) {
				const byte = input[offset];
				if (byte === 34) continue;
				if (byte === 37) {
					const high = hexDigit(input[offset + 1] ?? 0);
					const low = hexDigit(input[offset + 2] ?? 0);
					if (high !== -1 && low !== -1) {
						output[written++] = 16 * high + low;
						offset += 2;
						continue;
					}
				}
				output[written++] = byte ?? 0;
			}
			const bytes = output.subarray(0, written);
			return isStrictUtf8(bytes) ? bytes.toString("utf8") : undefined;
		};
		readAptListWord = (text, start, inOptions = false) => {
			let end = start;
			while (end < text.length && !isAsciiSpace(text[end] ?? "")) {
				const character = text[end];
				if (inOptions && character === "]" && (end + 1 === text.length || isAsciiSpace(text[end + 1] ?? ""))) break;
				if (character === "\"" || character === "[") {
					const closing = text.indexOf(character === "\"" ? "\"" : "]", end + 1);
					if (closing === -1) return undefined;
					end = closing + 1;
				} else end += 1;
			}
			const authored = text.slice(start, end);
			const effective = decodeAptListWord(authored);
			if (effective === undefined || effective.includes("\0")) return undefined;
			return {
				authored,
				effective,
				end
			};
		};
		aptListWords = (text) => {
			const words = [];
			let offset = 0;
			while (offset < text.length) {
				while (isAsciiSpace(text[offset] ?? "")) offset += 1;
				if (offset === text.length) break;
				const word = readAptListWord(text, offset);
				if (word === undefined) return undefined;
				const { authored, effective, end } = word;
				words.push({
					authored,
					effective
				});
				offset = end;
			}
			return words;
		};
		readAptListOptions = (text, start) => {
			const options = new Map();
			if (text[start] !== "[") return {
				options,
				end: start
			};
			let offset = start + 1;
			while (offset < text.length) {
				while (isAsciiSpace(text[offset] ?? "")) offset += 1;
				if (text[offset] === "]") return {
					options,
					end: offset + 1
				};
				const word = readAptListWord(text, offset, true);
				if (word === undefined) return undefined;
				const { effective, end } = word;
				const equals = effective.indexOf("=");
				if (equals <= 0 || equals === effective.length - 1) return undefined;
				options.set(effective.slice(0, equals), effective.slice(equals + 1));
				offset = end;
			}
			return undefined;
		};
		parseOneLineSources = (text, file) => [...sourceLines(text)].flatMap((line, index) => {
			if (line === undefined) return [];
			const source = withoutOneLineComment(line);
			const prefix = ONE_LINE_PREFIX.exec(source)?.[0];
			if (prefix === undefined) return [];
			const parsed = readAptListOptions(source, prefix.length);
			if (parsed === undefined) return [];
			const words = aptListWords(source.slice(parsed.end));
			if (words === undefined) return [];
			const [uri, suite, ...components] = words;
			if (uri === undefined || uri.authored.startsWith("[") || uri.effective === "" || suite === undefined || suite.effective === "") return [];
			return [stanza({
				file,
				position: index + 1
			}, {
				uris: [uri.authored],
				suites: [suite.authored],
				components: components.map(({ authored }) => authored),
				options: parsed.options,
				oneLine: {
					uri: uri.effective,
					suite: suite.effective,
					components: components.map(({ effective }) => effective)
				}
			})];
		});
		trimDeb822Line = (value) => value.replace(/^[ \t\v\f\r]+|[ \t\v\f\r]+$/gu, "");
		deb822Paragraphs = (text) => {
			const found = [];
			let current = new Map();
			let last;
			let readable = true;
			const finish = () => {
				if (!readable) found.push(new Map());
				else if (current.size > 0) {
					for (const [name, value] of current) {
						let end = value.length;
						while (end > 0 && value.charCodeAt(end - 1) === 10) end--;
						if (end !== value.length) current.set(name, value.slice(0, end));
					}
					found.push(current);
				}
				current = new Map();
				last = undefined;
				readable = true;
			};
			for (const line of sourceLines(text)) {
				if (line === undefined) {
					readable = false;
					continue;
				}
				const afterLeadingCr = line.replace(/^\r+/u, "");
				if (afterLeadingCr.length === 0) {
					finish();
				} else if (line.startsWith("#")) continue;
				else if (/^[ \t\v\f]/u.test(afterLeadingCr) && last !== undefined) {
					const content = trimDeb822Line(line);
					const previous = current.get(last) ?? "";
					current.set(last, previous === "" && line.startsWith(" ") ? content : `${previous}\n${content}`);
				} else {
					const colon = line.indexOf(":");
					if (colon <= 0) continue;
					last = trimDeb822Line(line.slice(0, colon)).toLowerCase();
					current.set(last, trimDeb822Line(line.slice(colon + 1)));
				}
			}
			finish();
			return found;
		};
		APT_DISABLED = /^(?:no|false|without|off|disable|\n*[+-]?(?:0+|0x0+))$/u;
		parseDeb822Sources = (text, file) => deb822Paragraphs(text).flatMap((fields, index) => {
			if (!fieldValues(fields.get("types")).includes("deb") || APT_DISABLED.test(fields.get("enabled")?.toLowerCase() ?? "")) return [];
			return [stanza({
				file,
				position: index + 1
			}, {
				uris: fieldValues(fields.get("uris")),
				suites: fieldValues(fields.get("suites")),
				components: fieldValues(fields.get("components")),
				options: new Map([
					["signed-by", fields.get("signed-by") ?? ""],
					["arch", fields.get("architectures") ?? ""],
					["arch+", fields.get("architectures-add") ?? ""],
					["arch-", fields.get("architectures-remove") ?? ""]
				])
			})];
		});
		SOURCES_ENTRY = /^(?<file>\/.*):(?<position>[1-9]\d*)$/u;
		parseAptIndexTargets = (output, configuredArchitecture) => deb822Paragraphs(output).flatMap((fields) => {
			const at = SOURCES_ENTRY.exec(fields.get("sourcesentry") ?? "")?.groups;
			const description = fields.get("description");
			const repoUri = fields.get("repo-uri");
			const baseUri = fields.get("base-uri");
			const filename = fields.get("filename");
			if (at?.file === undefined || at.position === undefined || description === undefined || !repoUri || baseUri === undefined || filename?.startsWith("/") !== true) return [];
			const optional = (name) => fields.get(name) || null;
			const sanitizedRepoUri = withoutCredentials(repoUri);
			return [{
				description: withoutCredentialsIn(description),
				sourcesFile: at.file,
				position: Number(at.position),
				repoUri: sanitizedRepoUri,
				...sanitizedRepoUri === repoUri ? {} : { repoUriCredentialsRemoved: true },
				release: fields.get("release") ?? "",
				...configuredArchitecture === undefined ? {} : { configuredArchitecture },
				component: optional("component"),
				baseUri: withoutCredentials(baseUri),
				filename,
				origin: optional("origin"),
				suite: optional("suite"),
				codename: optional("codename")
			}];
		});
		entryForTarget = (target, stanzas) => {
			const at = stanzas.find((candidate) => candidate.file === target.sourcesFile && candidate.position === target.position);
			if (at === undefined) return undefined;
			const { uris, suites, format, oneLine, ...entry } = at;
			const single = format === "one-line";
			const matches = single ? uris : uris.filter(({ uri }) => {
				if (uri === null) return false;
				const selected = expandAptArchitecture(uri, target.configuredArchitecture);
				return selected !== undefined && deb822RepoUri(selected) === target.repoUri;
			});
			const first = matches[0];
			if (first === undefined) return undefined;
			const uri = first.uri === null ? null : withoutOptionalTrailingSlash(first.uri);
			const suite = single ? suites[0] : suites.find((listed) => isRelease(listed, target));
			if (suite === undefined || matches.some(({ uri: listed }) => listed === null ? uri !== null : withoutOptionalTrailingSlash(listed) !== uri)) return undefined;
			const effectiveSuite = oneLine?.suite ?? suite;
			const effectiveComponents = oneLine?.components ?? entry.components;
			const componentSpellingChanged = effectiveComponents.some((value, index) => value !== entry.components[index]);
			if (effectiveSuite !== suite && effectiveSuite !== aptIndexSourceSuite(target) && (!effectiveSuite.endsWith("/") || !isRelease(effectiveSuite, target)) || componentSpellingChanged && (target.component === null || !effectiveComponents.includes(target.component))) return undefined;
			return {
				...entry,
				uri,
				credentials: matches.some((listed) => listed.credentials),
				suite,
				components: effectiveSuite.endsWith("/") ? [] : entry.components,
				...componentSpellingChanged ? { repoComponents: effectiveComponents } : {}
			};
		};
		oneLineSource = (repository) => repository.sources_file?.endsWith(".sources") !== true;
		legacyAptListToken = (value) => {
			const words = aptListWords(value);
			const first = words?.[0];
			return words?.length === 1 && first?.authored === value ? first.effective : undefined;
		};
		aptRepositoryHoldsCredentials = (repository) => {
			const { uri, repo_uri } = repository;
			const effective = uri !== null && oneLineSource(repository) ? decodeAptListWord(uri) : undefined;
			return uri !== null && (withoutCredentials(uri) !== uri || oneLineSource(repository) && ONE_LINE_ESCAPED_USER_INFO.test(uri)) || effective !== undefined && withoutCredentials(effective) !== effective || repo_uri !== undefined && withoutCredentials(repo_uri) !== repo_uri;
		};
		httpSourceUri = (uri) => /^https?:\/\/[^/]+/u.test(uri);
		isDeb822ReplayToken = (value) => value.length !== 0 && !/[\s\p{Cc}]/u.test(value) && !value.includes("$(ARCH)");
		replayUri = (repository) => {
			if (repository.uri_credentials_removed === true || aptRepositoryHoldsCredentials(repository)) return err({
				kind: "credentials",
				reason: "its sources entry's URI held a user name or password, which REA neither records nor exports"
			});
			const { uri, repo_uri: observed } = repository;
			if (uri === null) return err({
				kind: "uri",
				reason: "no apt sources entry configures it"
			});
			const oneLine = oneLineSource(repository);
			const effective = oneLine ? legacyAptListToken(uri) : uri;
			if (effective === undefined) return err({
				kind: "uri",
				reason: "its one-line URI is not a complete APT word. Capture the application again"
			});
			if (!httpSourceUri(oneLine ? uri.replaceAll("\"", "") : uri) || !httpSourceUri(effective) || observed !== undefined && !httpSourceUri(observed)) return err({
				kind: "uri",
				reason: "agentenv installs apt repositories over http or https only"
			});
			if (oneLine && /%(?:0[0-9a-f]|1[0-9a-f]|7f)/iu.test(uri)) return err({
				kind: "uri",
				reason: "its one-line URI contains an escaped control byte, so apt's index URI cannot be established"
			});
			if (observed === undefined && oneLine && /%[0-9a-f]{2}/iu.test(uri)) return err({
				kind: "uri",
				reason: "its one-line URI has percent escapes and the capture does not record apt's Repo-URI. Capture the application again"
			});
			const repoUri = observed ?? deb822RepoUri(effective);
			const declaration = deb822RepoUri(effective) === repoUri && isDeb822ReplayToken(effective) ? effective : withoutOptionalTrailingSlash(repoUri);
			if (!isDeb822ReplayToken(declaration) || deb822RepoUri(declaration) !== repoUri) return err({
				kind: "uri",
				reason: "apt's repository URI cannot be represented as one AgentEnv deb822 URI token"
			});
			return ok({
				uri: declaration,
				repoUri
			});
		};
		aptRepositoryReplay = (repository) => {
			const uri = replayUri(repository);
			if (!uri.ok) return uri;
			const authored = repository.suite;
			if (authored === null) return err({
				kind: "suite",
				reason: "no apt sources entry configures it"
			});
			const oneLine = oneLineSource(repository);
			const suite = repository.repo_suite ?? (oneLine ? legacyAptListToken(authored) : authored);
			if (suite === undefined) return err({
				kind: "suite",
				reason: "its one-line suite is not a complete APT word. Capture the application again"
			});
			if (repository.repo_suite === undefined && suite.includes("$(ARCH)")) return err({
				kind: "suite",
				reason: "its sources entry templates the suite and the capture does not record apt's selected suite. Capture the application again"
			});
			if (!isDeb822ReplayToken(suite)) return err({
				kind: "suite",
				reason: "apt's selected suite cannot be represented as one AgentEnv deb822 suite token"
			});
			const components = repository.repo_components ?? (oneLine ? repository.components.map(legacyAptListToken) : repository.components);
			if (!components.every((component) => component !== undefined)) return err({
				kind: "components",
				reason: "its one-line components are not complete APT words. Capture the application again"
			});
			if (oneLine && !components.every(isDeb822ReplayToken)) return err({
				kind: "components",
				reason: "apt's selected component cannot be represented as one AgentEnv deb822 component token"
			});
			return ok({
				...uri.value,
				suite,
				components
			});
		};
		declaredPackageFiles = (repositories, targets) => {
			const declarations = repositories.flatMap((repository) => {
				const observed = targets.get(repository.source);
				const replay = aptRepositoryReplay(repository);
				return !replay.ok || observed === undefined || observed.repoUri !== replay.value.repoUri || aptIndexSourceSuite(observed) !== replay.value.suite ? [] : [{
					...repository,
					repoUri: replay.value.repoUri,
					suite: replay.value.suite,
					components: replay.value.components
				}];
			});
			const files = new Set();
			for (const target of targets.values()) {
				if (declarations.some(({ repoUri, suite, components }) => repoUri === target.repoUri && suite === aptIndexSourceSuite(target) && (target.component === null ? components.length === 0 : components.includes(target.component)))) files.add(target.description);
			}
			return files;
		};
		repositorySupplies = (repository, supplied, targets) => {
			const files = declaredPackageFiles([repository], targets);
			return [...supplied].filter(([, sources]) => sources.some((source) => files.has(source))).map(([name]) => name).sort();
		};
		parseAptConfigShell = (output) => {
			const values = new Map();
			const prefix = /([A-Za-z_]\w*)='/uy;
			let offset = 0;
			while (offset < output.length) {
				prefix.lastIndex = offset;
				const match = prefix.exec(output);
				if (match === null) {
					const newline = output.indexOf("\n", offset);
					if (newline < 0) break;
					offset = newline + 1;
					continue;
				}
				const start = prefix.lastIndex;
				let end = output.indexOf("'", start);
				while (end >= 0 && output.startsWith(`'\\''`, end)) end = output.indexOf("'", end + 4);
				if (end < 0) break;
				const after = end + 1;
				if (after === output.length || output[after] === "\n") values.set(match[1], output.slice(start, end).replaceAll(`'\\''`, "'"));
				const newline = output.indexOf("\n", after);
				if (newline < 0) break;
				offset = newline + 1;
			}
			return values;
		};
		QUOTED = new Set("\\|{}[]<>\"^~_=!@#$%^&*");
		aptListFileName = (uri) => {
			const path = uri.replace(/^[a-z][a-z0-9+.-]*:(?:\/\/)?/iu, "").replace(/^[^/@]*@/u, "").replace(/^\[([^\]]+)\](?=[:/]|$)/u, "$1");
			let quoted = "";
			for (const character of path) {
				const code = character.codePointAt(0) ?? 0;
				quoted += QUOTED.has(character) || code <= 32 || code >= 127 ? [...Buffer.from(character, "utf8")].map((byte) => `%${byteToHex(byte)}`).join("") : character;
			}
			return quoted.replaceAll("/", "_");
		};
		isUbuntuProRepository = (origin, uri) => (origin ?? "").startsWith("UbuntuESM") || /^https?:\/\/esm\.ubuntu\.com(?:[/:]|$)/iu.test(uri ?? "");
		UNTRUSTED_SIGNATURE = /^\[GNUPG:\] (?:BADSIG|EXPSIG|EXPKEYSIG|REVKEYSIG|ERRSIG) (?<key>[0-9A-Fa-f]+)(?: |$)/u;
		validSignature = (status) => {
			const lines = status.split("\n").map((line) => line.trim());
			const untrusted = lines.flatMap((line) => {
				const key = UNTRUSTED_SIGNATURE.exec(line)?.groups?.key;
				return key === undefined ? [] : [key.toUpperCase()];
			});
			const names = (fingerprint, key) => fingerprint.startsWith(key) || fingerprint.endsWith(key);
			for (const line of lines) {
				const fields = /^\[GNUPG:\] VALIDSIG (?<fields>.+)$/u.exec(line)?.groups?.fields?.split(" ");
				const signing = fields?.[0]?.toUpperCase();
				if (signing === undefined) continue;
				const primary = (fields?.[9] ?? signing).toUpperCase();
				if (!untrusted.some((key) => names(signing, key) || names(primary, key))) return {
					signing,
					primary
				};
			}
			return undefined;
		};
		isArmoredKey = (bytes) => Buffer.from(bytes).toString("latin1").trimStart().startsWith(ARMOR_BEGIN);
		dearmorPublicKeys = (bytes) => {
			const blocks = [];
			let state = "outside";
			let body = "";
			for (const raw of Buffer.from(bytes).toString("latin1").split("\n")) {
				const line = raw.trim();
				if (state === "outside") {
					if (line === ARMOR_BEGIN) [state, body] = ["headers", ""];
				} else if (line === ARMOR_END) {
					blocks.push(Buffer.from(body, "base64"));
					state = "outside";
				} else if (state === "headers") {
					if (line.length === 0 || !line.includes(":")) state = "body";
					if (!line.includes(":")) body += line;
				} else if (!/^=[A-Za-z0-9+/]{4}$/u.test(line)) body += line;
			}
			const keyring = Buffer.concat(blocks);
			return keyring.length === 0 ? undefined : keyring;
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/debianPackageFile.js
var PACKAGE_FILE_FIELDS, DEBIAN_PACKAGE_NAME, relationEntries, parseDpkgDebFields, packageFileMismatch, dependencyPackages;
function init_debianPackageFile() {
	return (init_debianPackageFile = __esmMin((() => {
		init_aptRepositories();
		PACKAGE_FILE_FIELDS = [
			"Package",
			"Version",
			"Architecture",
			"Depends",
			"Pre-Depends"
		];
		DEBIAN_PACKAGE_NAME = /^[a-z0-9][a-z0-9+.\x2d]+$/u;
		relationEntries = (value) => (value ?? "").split(",").map((entry) => entry.replace(/\s+/gu, " ").trim()).filter((entry) => entry.length > 0);
		parseDpkgDebFields = (output) => {
			const fields = deb822Paragraphs(output)[0];
			const name = fields?.get("package") ?? "";
			const version = fields?.get("version") ?? "";
			const architecture = fields?.get("architecture") ?? "";
			if (name.length === 0 || version.length === 0 || architecture.length === 0) return undefined;
			return {
				package: name,
				version,
				architecture,
				depends: relationEntries(fields?.get("depends")),
				pre_depends: relationEntries(fields?.get("pre-depends"))
			};
		};
		packageFileMismatch = (fields, installed) => {
			const name = installed.name?.split(":")[0] ?? null;
			if (fields.package === name && fields.version === installed.version && fields.architecture === installed.architecture) return undefined;
			return `holds ${fields.package} ${fields.version} (${fields.architecture}), not the installed ${name ?? "package"} ${installed.version ?? "of unknown version"} (${installed.architecture ?? "unknown architecture"})`;
		};
		dependencyPackages = (file) => {
			const names = new Set();
			const unread = [];
			for (const entry of [...file.depends, ...file.pre_depends]) {
				const [name = ""] = (entry.split("|")[0] ?? "").trim().split(/[\s(:[<]/u);
				if (DEBIAN_PACKAGE_NAME.test(name)) names.add(name);
				else unread.push(entry);
			}
			return {
				names: [...names],
				unread
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appExportInstall.js
var NOBLE_SUITE, CANONICAL_ARCHIVE, COMPUTER_ARCHITECTURES, computerArchitecture, fromUbuntuNobleArchive, INSTALL_SCRIPT, CAPTURE_REMEDIATION, refusal, describe, repositoryReplay, repositoryRefusal, architectureRefusal, declaredSources, suppliedLibraries, describePackage, localInstallRefusal, vendorInstall, packageUrlRefusal, packageFileInstall, aptInstall, installsFromPackageFile, packageInstall, exportInstall, withExtraPackages, electronLaunchArguments, adjustInstalledDesktopText;
function init_appExportInstall() {
	return (init_appExportInstall = __esmMin((() => {
		init_result();
		init_aptRepositories();
		init_debianPackageFile();
		init_desktopEntry();
		NOBLE_SUITE = / noble(?:-updates|-security|-backports)?\/(?:main|restricted|universe|multiverse) /u;
		CANONICAL_ARCHIVE = /^https?:\/\/(?:[a-z]{2}\.)?(?:archive|ports|security)\.ubuntu\.com\//u;
		COMPUTER_ARCHITECTURES = new Map([["x64", "amd64"], ["arm64", "arm64"]]);
		computerArchitecture = (hostArchitecture) => COMPUTER_ARCHITECTURES.get(hostArchitecture);
		fromUbuntuNobleArchive = (sources, origins) => sources.some((source, index) => NOBLE_SUITE.test(source) && (origins === undefined ? CANONICAL_ARCHIVE.test(source) : origins[index] === "Ubuntu"));
		INSTALL_SCRIPT = "install-package.sh";
		CAPTURE_REMEDIATION = "Capture an application installed with apt from the Ubuntu 24.04 archive, or from a vendor repository reached over http or https on an amd64 or arm64 host where apt trusts its key and gpgv is installed. For one installed from a downloaded .deb file, capture it with --package-file and export it with --package-url.";
		refusal = (reason, field = "capture", remediation = CAPTURE_REMEDIATION) => ({
			field,
			reason,
			remediation
		});
		describe = (repository) => repository.uri === null ? withoutCredentialsIn(repository.source) : `${withoutCredentials(repository.uri)} ${[repository.suite, ...repository.components].join(" ")}`;
		repositoryReplay = (repository) => {
			const replay = aptRepositoryReplay(repository);
			if (!replay.ok && replay.error.kind === "credentials") return err(replay.error.reason);
			if (repository.signing_key === null) return err(repository.signing_key_reason ?? "its signing key was not verified");
			return replay.ok ? replay : err(replay.error.reason);
		};
		repositoryRefusal = (repository) => {
			const replay = repositoryReplay(repository);
			return replay.ok ? undefined : replay.error;
		};
		architectureRefusal = (repository, architecture, packageArchitecture) => {
			const served = repository.architectures ?? [];
			return served.length === 0 || served.includes(architecture) || packageArchitecture === "all" && served.includes("all") ? undefined : `it serves only ${served.join(", ")}, not the capture host's ${architecture}`;
		};
		declaredSources = (repositories, environment, architecture, packageArchitecture) => {
			const declared = new Map();
			const keyFiles = new Map();
			const refused = [];
			const kept = [];
			for (const repository of repositories) {
				const { signing_key: key } = repository;
				const replay = repositoryReplay(repository);
				const reason = replay.ok ? architectureRefusal(repository, architecture, packageArchitecture) : replay.error;
				if (!replay.ok || reason !== undefined || key === null) {
					refused.push(`${describe(repository)}: ${reason ?? "it is unusable"}`);
					continue;
				}
				const { uri, repoUri, suite, components } = replay.value;
				const id = `${repoUri}\n${suite}`;
				const existing = declared.get(id);
				if (existing !== undefined && existing.keySha256 !== key.sha256) {
					refused.push(`${describe(repository)}: apt takes one key per URI and suite, and ${existing.keyFile} is declared for them`);
					continue;
				}
				const keyFile = keyFiles.get(key.sha256) ?? `apt-keys/${environment}${keyFiles.size === 0 ? "" : `-${String(keyFiles.size + 1)}`}.${key.format === "armored" ? "asc" : "gpg"}`;
				keyFiles.set(key.sha256, keyFile);
				declared.set(id, {
					uri: existing?.uri ?? uri,
					suite,
					components: [...new Set([...existing?.components ?? [], ...components])],
					keyFile,
					keySha256: key.sha256
				});
				kept.push(repository);
			}
			return {
				sources: [...declared.values()],
				refused,
				release: kept[0]?.release ?? null,
				kept
			};
		};
		suppliedLibraries = (installed, kept) => {
			const repositories = installed.apt_repositories ?? [];
			const supplied = new Set(kept.flatMap((repository) => repository.supplies ?? []));
			const stranded = [...new Set(repositories.filter((repository) => !kept.includes(repository)).flatMap((repository) => repository.supplies ?? []))].filter((name) => !supplied.has(name)).sort();
			return {
				libraryPackages: (installed.library_packages ?? []).filter((name) => !stranded.includes(name)),
				...stranded.length === 0 ? {} : { strandedPackages: stranded }
			};
		};
		describePackage = (installed) => `${installed.kind}${installed.name === null ? "" : ` ${installed.name}`}; sources: ${installed.sources.map(withoutCredentialsIn).join(", ") || "none"}; apt origins: ${installed.source_origins === undefined ? "not recorded" : installed.source_origins.map((origin) => origin ?? "none").join(", ") || "none"}`;
		localInstallRefusal = (installed) => {
			const file = installed.package_file;
			if (file !== undefined) return refusal(`The application was installed from ${file.name}, which no apt repository the capture recorded lists (${describePackage(installed)}), so the computer can install it only from a copy of that file.`, "package_url", `Pass --package-url with an http or https URL the computer may download ${file.name} from, byte for byte the captured file.`);
			const reason = installed.package_file_reason;
			return refusal(`The application is not installed from the Ubuntu 24.04 package archive or a vendor apt repository the capture recorded (${describePackage(installed)}), so the computer cannot install it by name. An application installed from a downloaded .deb file is exported with --package-url once it was captured with --package-file${reason === undefined ? "" : `, which this capture could not record: ${reason}`}.`, "capture", "Capture again with --package-file naming the .deb file the application was installed from, then export with --package-url naming where the computer may download that file.");
		};
		vendorInstall = (installed, aptPackage, environment, hostArchitecture) => {
			const repositories = installed.apt_repositories ?? [];
			if (repositories.length === 0) return err({
				refusal: localInstallRefusal(installed),
				skipped: []
			});
			if (repositories.some(aptRepositoryHoldsCredentials)) return err({
				refusal: refusal("The capture recorded a user name or password in an apt repository's URI, from before REA removed them, so it cannot tell which library packages only that repository offers.", "capture", "Capture the application again."),
				skipped: []
			});
			const architecture = COMPUTER_ARCHITECTURES.get(hostArchitecture);
			if (architecture === undefined) return err({
				refusal: refusal(`The capture host's architecture ${hostArchitecture} is not one an agentenv computer runs (${[...COMPUTER_ARCHITECTURES.keys()].join(", ")}), so its vendor packages may not suit the computer.`),
				skipped: []
			});
			const { sources, refused, release, kept } = declaredSources(repositories, environment, architecture, installed.architecture);
			if (sources.length === 0) return err({
				refusal: refusal(`The application comes from apt repositories the computer cannot use (${refused.join("; ")}).`),
				skipped: refused
			});
			return ok({
				aptPackage,
				release,
				...suppliedLibraries(installed, kept),
				sources,
				skipped: refused,
				architectures: [architecture],
				packageFile: null
			});
		};
		packageUrlRefusal = (url) => {
			let parsed;
			try {
				parsed = new URL(url);
			} catch {
				return "--package-url is not a URL";
			}
			if (parsed.username !== "" || parsed.password !== "") return "--package-url holds a user name or password, which the bundle would keep in plain text";
			return /^https?:\/\//u.test(url) && (parsed.protocol === "http:" || parsed.protocol === "https:") ? undefined : "--package-url does not start with http:// or https:// in lowercase, the only URLs the computer downloads";
		};
		packageFileInstall = (installed, named, packageUrl, hostArchitecture) => {
			const file = installed.package_file;
			const recordFile = "Capture again with --package-file naming the .deb file the installed version came from.";
			if (file === undefined) return err(refusal(installed.package_file_reason === undefined ? `--package-url was given, but the capture recorded no package file for ${named.aptPackage}.` : `--package-url was given, but the capture did not record its package file: ${installed.package_file_reason}.`, "capture", recordFile));
			const url = packageUrlRefusal(packageUrl);
			if (url !== undefined) return err(refusal(url, "package_url", "Pass --package-url with an http:// or https:// URL that holds no user name or password."));
			const architecture = file.architecture === "all" ? COMPUTER_ARCHITECTURES.get(hostArchitecture) : [...COMPUTER_ARCHITECTURES.values()].find((name) => name === file.architecture);
			if (architecture === undefined) return err(refusal(`${file.name} is built for ${file.architecture === "all" ? `all architectures, and the capture host's is ${hostArchitecture}` : file.architecture}, which an agentenv computer does not run (amd64, arm64).`));
			const { names, unread } = dependencyPackages(file);
			return ok({
				...named,
				release: null,
				...suppliedLibraries(installed, []),
				sources: [],
				architectures: [architecture],
				packageFile: {
					url: packageUrl,
					sha256: file.sha256,
					path: `vendor/${file.name}`,
					architecture,
					dependencies: names,
					unreadDependencies: unread
				}
			});
		};
		aptInstall = (installed, aptPackage, environment, hostArchitecture) => fromUbuntuNobleArchive(installed.sources, installed.source_origins) ? ok({
			aptPackage,
			release: null,
			...suppliedLibraries(installed, []),
			libraryPackages: [],
			sources: [],
			skipped: [],
			architectures: [...COMPUTER_ARCHITECTURES.values()],
			packageFile: null
		}) : vendorInstall(installed, aptPackage, environment, hostArchitecture);
		installsFromPackageFile = (installed, hostArchitecture) => installed.kind === "deb" && installed.name !== null && !aptInstall(installed, installed.name.split(":")[0] ?? installed.name, "app", hostArchitecture).ok;
		packageInstall = (installed, environment, hostArchitecture, packageUrl) => {
			if (installed.kind !== "deb" || installed.name === null) return err(refusal(`The application is not an apt package (${describePackage(installed)}), so the computer cannot install it.`));
			const aptPackage = installed.name.split(":")[0] ?? installed.name;
			const named = aptInstall(installed, aptPackage, environment, hostArchitecture);
			if (named.ok) return packageUrl === undefined ? named : err(refusal(`--package-url is not needed: the computer installs ${aptPackage} from ${named.value.sources.length === 0 ? "the Ubuntu 24.04 archive by name" : `the vendor apt repository ${named.value.sources.map((source) => source.uri).join(", ")}`}.`, "package_url", "Export without --package-url."));
			if (packageUrl === undefined) return err(named.error.refusal);
			return packageFileInstall(installed, {
				aptPackage,
				skipped: named.error.skipped
			}, packageUrl, hostArchitecture);
		};
		exportInstall = (...request) => {
			const install = packageInstall(...request);
			const [{ executable_package: program, executable_package_reason: found }] = request;
			if (!install.ok) return install;
			if (program === undefined) return found === undefined ? install : err(refusal(`The desktop entry belongs to ${install.value.aptPackage}, but the computer cannot install the program it runs: ${found}.`, "capture", "Capture again with the packaged program first on PATH, or with --executable naming it."));
			const reason = found ?? (install.value.strandedPackages?.includes(program) === true ? "only apt repositories the export leaves out offer it" : undefined);
			return reason === undefined ? ok({
				...install.value,
				executablePackage: program
			}) : err(refusal(`The desktop entry belongs to ${install.value.aptPackage}, but the program it runs belongs to ${program}, which the computer cannot install: ${reason}.`));
		};
		withExtraPackages = (install, extraPackages) => {
			const unnamed = extraPackages.find((name) => !DEBIAN_PACKAGE_NAME.test(name));
			if (unnamed !== undefined) return err(refusal(`--extra-package ${JSON.stringify(unnamed)} is not a Debian package name.`, "extra_package", "Pass --extra-package with a package name of the Ubuntu 24.04 archive: lowercase letters, digits, +, - and ., at least two long."));
			const declared = new Set([install.aptPackage, ...install.packageFile?.dependencies ?? []]);
			const extra = [...new Set(extraPackages)].filter((name) => !declared.has(name));
			return ok(extra.length === 0 ? install : {
				...install,
				extraPackages: extra
			});
		};
		electronLaunchArguments = (argv, electron) => {
			if (!electron || argv.includes("--no-sandbox")) return argv;
			const wrapper = unwrapDesktopCommand(argv);
			const at = wrapper.kind === "direct" ? wrapper.index + 1 : 1;
			return [
				...argv.slice(0, at),
				"--no-sandbox",
				...argv.slice(at)
			];
		};
		adjustInstalledDesktopText = (text, electron) => {
			if (!electron) return ok(text);
			const parsed = parseDesktopEntry(text);
			if (!parsed.ok) return parsed;
			const exec = parsed.value.exec;
			if (exec === null) return err("missing_exec");
			const tokens = tokenizeDesktopExec(exec);
			if (!tokens.ok) return tokens;
			const adjusted = electronLaunchArguments(tokens.value, true);
			if (adjusted === tokens.value) return ok(text);
			return replaceDesktopExec(text, formatDesktopExec(adjusted));
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/x11Windows.js
var TITLE_BYTES_KEY, TITLE_BYTES_PREFIX, X11_WINDOW_PROPERTY_ARGUMENTS, PROPERTY_LINE, WINDOW_ID, QUOTED_STRING, SINGLE_QUOTED_STRING, OCTAL_BYTE, STRING_ESCAPE, UTF8_STRING_ESCAPE, MAX_OCTAL_BYTE, CLASS_INDEX, UNSET, propertyValues, XPROP_STRING_ESCAPES, octalText, decodeQuotedString, quotedStrings, legacyTitle, parseX11ClientList, parseX11WindowProperties, PYTHON_X11_PROPERTIES;
function init_x11Windows() {
	return (init_x11Windows = __esmMin((() => {
		init_strictUtf8();
		TITLE_BYTES_KEY = "WM_NAME bytes";
		TITLE_BYTES_PREFIX = " bytes = ";
		X11_WINDOW_PROPERTY_ARGUMENTS = [
			"WM_CLASS",
			"_NET_WM_NAME",
			"WM_NAME",
			"8s",
			`:${TITLE_BYTES_PREFIX}$0\\n`,
			"WM_NAME",
			"_NET_WM_PID",
			"_NET_WM_WINDOW_TYPE"
		];
		PROPERTY_LINE = /^([A-Z_]+)(?:\(([A-Z0-9_]+)\))?(:| =)([^\r\n]*)$/u;
		WINDOW_ID = /0[xX][0-9a-fA-F]+/gu;
		QUOTED_STRING = /"((?:[^"\\]|\\[^\r\n])*)"/gu;
		SINGLE_QUOTED_STRING = new RegExp(`^${QUOTED_STRING.source}$`, "u");
		OCTAL_BYTE = /[0-7]{3}/u;
		STRING_ESCAPE = new RegExp(String.raw`\\(${OCTAL_BYTE.source}|[^\r\n])`, "gu");
		UTF8_STRING_ESCAPE = new RegExp(String.raw`\\(${OCTAL_BYTE.source}(?:\\${OCTAL_BYTE.source})*|[^\r\n])`, "gu");
		MAX_OCTAL_BYTE = 255;
		CLASS_INDEX = 1;
		UNSET = new Set(["not found.", "no such atom on any window."]);
		propertyValues = (output) => {
			const values = new Map();
			for (const line of output.split("\n")) {
				const match = PROPERTY_LINE.exec(line);
				if (match === null) continue;
				const [, name, type, rest, value] = match;
				if (name === undefined || value === undefined) continue;
				const text = value.trim();
				if (rest === ":" && UNSET.has(text)) continue;
				if (name === "WM_NAME" && rest === ":" && value.startsWith(TITLE_BYTES_PREFIX)) values.set(TITLE_BYTES_KEY, {
					type,
					text: value.slice(TITLE_BYTES_PREFIX.length).trim()
				});
				else values.set(name, {
					type,
					text
				});
			}
			return values;
		};
		XPROP_STRING_ESCAPES = {
			n: "\n",
			t: "	",
			"\\": "\\",
			"\"": "\""
		};
		octalText = (run, encoding) => {
			const bytes = Buffer.allocUnsafe((run.length + 1) / 4);
			for (let index = 0; index < bytes.length; index += 1) {
				const offset = index * 4;
				const byte = Number.parseInt(run.slice(offset, offset + 3), 8);
				if (byte > MAX_OCTAL_BYTE) return null;
				bytes[index] = byte;
			}
			if (encoding === "utf8" && !isStrictUtf8(bytes)) return null;
			return bytes.toString(encoding);
		};
		decodeQuotedString = (source, encoding) => {
			let valid = true;
			const decoded = source.replace(encoding === "utf8" ? UTF8_STRING_ESCAPE : STRING_ESCAPE, (_match, escape) => {
				const text = escape.length >= 3 ? octalText(escape, encoding) : XPROP_STRING_ESCAPES[escape];
				if (text != null) return text;
				valid = false;
				return "";
			});
			return valid ? decoded : null;
		};
		quotedStrings = (value, encoding) => {
			const strings = [];
			for (const match of value.matchAll(QUOTED_STRING)) strings.push(decodeQuotedString(match[1] ?? "", encoding));
			return strings;
		};
		legacyTitle = (properties) => {
			const bytes = properties.get(TITLE_BYTES_KEY);
			if (bytes?.type === "STRING" || bytes?.type === "UTF8_STRING") {
				const value = SINGLE_QUOTED_STRING.exec(bytes.text)?.[1];
				return value === undefined ? null : decodeQuotedString(value, bytes.type === "STRING" ? "latin1" : "utf8");
			}
			const display = properties.get("WM_NAME");
			if (display === undefined || bytes !== undefined && bytes.type !== display.type || display.type !== undefined && display.type !== "COMPOUND_TEXT") return null;
			const value = /^"([^\r\n]*)"$/u.exec(display.text)?.[1];
			return value === undefined || /\\(?:[0-7]{3}|[\\"nt])/u.test(value) ? null : value;
		};
		parseX11ClientList = (output) => {
			const values = propertyValues(output);
			const value = values.get("_NET_CLIENT_LIST")?.text;
			if (value === undefined) return (values.get("_NET_SUPPORTED")?.text ?? "").split(",").some((atom) => atom.trim() === "_NET_CLIENT_LIST") ? [] : undefined;
			return [...value.matchAll(WINDOW_ID)].map((match) => match[0].toLowerCase());
		};
		parseX11WindowProperties = (output) => {
			const values = propertyValues(output);
			const classes = quotedStrings(values.get("WM_CLASS")?.text ?? "", "latin1");
			const netName = values.get("_NET_WM_NAME")?.text;
			const title = (netName?.startsWith("\"") ? quotedStrings(netName, "utf8")[0] : null) ?? legacyTitle(values);
			const pid = Number(values.get("_NET_WM_PID")?.text);
			const windowType = values.get("_NET_WM_WINDOW_TYPE")?.text.split(",")[0]?.trim();
			return {
				instance: classes[0] ?? null,
				class: classes[CLASS_INDEX] ?? null,
				title,
				pid: Number.isSafeInteger(pid) && pid > 0 ? pid : null,
				window_type: windowType === undefined || windowType.length === 0 ? null : windowType.replace(/^_NET_WM_WINDOW_TYPE_/u, "").toLowerCase()
			};
		};
		PYTHON_X11_PROPERTIES = String.raw`
XPROP_PROPERTY_LINE = re.compile(${JSON.stringify(PROPERTY_LINE.source)})
XPROP_WINDOW_ID = re.compile(${JSON.stringify(WINDOW_ID.source)})
XPROP_QUOTED_STRING = re.compile(${JSON.stringify(QUOTED_STRING.source)})
XPROP_STRING_ESCAPE = re.compile(${JSON.stringify(STRING_ESCAPE.source)})
XPROP_OCTAL_BYTE = re.compile(${JSON.stringify(OCTAL_BYTE.source)})
XPROP_STRING_ESCAPES = ${JSON.stringify(XPROP_STRING_ESCAPES)}
XPROP_UNSET = ${JSON.stringify([...UNSET])}


def _x11_properties(output: str) -> dict[str, str]:
    properties = {}
    for line in output.split("\n"):
        match = XPROP_PROPERTY_LINE.fullmatch(line)
        if match is None:
            continue
        name, _, delimiter, value = match.groups()
        value = value.strip(ECMASCRIPT_TRIM_CHARACTERS)
        if delimiter != ":" or value not in XPROP_UNSET:
            properties[name] = value
    return properties


def _x11_client_ids(properties: dict[str, str]) -> list[str]:
    return [match.group().lower() for match in XPROP_WINDOW_ID.finditer(properties.get("_NET_CLIENT_LIST", ""))]


def _x11_window_class(properties: dict[str, str]) -> str | None:
    def decode(escape_match):
        escape = escape_match.group(1)
        if XPROP_OCTAL_BYTE.fullmatch(escape):
            byte = int(escape, 8)
            if byte <= ${String(MAX_OCTAL_BYTE)}:
                return chr(byte)
        elif escape in XPROP_STRING_ESCAPES:
            return XPROP_STRING_ESCAPES[escape]
        raise ValueError("unknown xprop string escape")

    for index, match in enumerate(XPROP_QUOTED_STRING.finditer(properties.get("WM_CLASS", ""))):
        if index == ${String(CLASS_INDEX)}:
            try:
                return XPROP_STRING_ESCAPE.sub(decode, match.group(1))
            except ValueError:
                return None
    return None
`;
	})))();
}

//#endregion
export { DEBIAN_PACKAGE_NAME, DESKTOP_CAPTURE_DEFAULTS, DESKTOP_ENTRY_GROUP, DESKTOP_GROUP, DESKTOP_KEY, DESKTOP_KEY_SEPARATOR, DESKTOP_LINE_BREAK, DESKTOP_VALUE_ESCAPE, DESKTOP_VALUE_ESCAPES, DESKTOP_VIEW_DEFAULTS, ENV_PREFIX, ENV_UNSET_NAME, ENV_WRAPPER, EXEC_LEXEME, INSTALL_SCRIPT, KEYFILE_CONTROL_LINE, KEYFILE_ENTRY_LINE, PACKAGE_FILE_FIELDS, PYTHON_ECMASCRIPT_TRIM_CHARACTERS, PYTHON_X11_PROPERTIES, QUOTED_ESCAPE, SEED_CHECKPOINT, SQLITE_SIDECARS, STATE_PATH_INPUTS, X11_WINDOW_PROPERTY_ARGUMENTS, XML_POLICY, applicationNames, aptIndexSourceSuite, aptListFileName, buildCheckpointNameSchema, buildStatePathSchema, checkpointNameRefusal, checkpointTaken, computerArchitecture, dearmorPublicKeys, declaredPackageFiles, decodeStateText, decodeStateUtf16, desktopApplicationCaptureSchema, desktopApplicationStateSchema, desktopCheckpointSchema, desktopSqliteViewLimitMessage, desktopViewByteDisplay, desktopViewFileLimitMessage, desktopViewPolicy, desktopViewPolicyInputSchema, detectStateFormat, diffDesktopStates, doctypeHasInternalSubset, electronLaunchArguments, entryForTarget, execTakesFiles, expandDesktopExec, exportInstall, fromUbuntuNobleArchive, heldOpenLimitation, init_appExportInstall, init_appExportUnowned, init_aptRepositories, init_buildCapture, init_debianPackageFile, init_desktopCapture, init_desktopEntry, init_desktopLaunchSyntax, init_desktopState, init_desktopStateDiff, init_desktopTextSyntax, init_desktopViewPolicy, init_stateFormats, init_stateRoles, init_stateTextEncoding, init_x11Windows, isApplicationDconfGroup, isArmoredKey, isTextualFormat, isUbuntuProRepository, isWithinAny, jsonStringChunks, keyfileView, leftOutFiles, leftOutLocksLimitation, packageFileMismatch, parseAptConfigShell, parseAptIndexTargets, parseDeb822Sources, parseDesktopEntry, parseDpkgDebFields, parseOneLineSources, parseX11ClientList, parseX11WindowProperties, plainRecord, pythonDesktopViewPolicy, repositoryRefusal, repositorySupplies, roleFacts, runtimeSeeds, runtimeSeedsLimitation, selectedHomePath, stateDirectoryOf, stateReasons, stateRole, textSyntaxFormat, textualView, tokenizeDesktopExec, trashedFiles, unownedChangedFolders, unownedFoldersLimitation, unownedReadmeNotes, unreadDconfLimitation, unretainedOpenedDirectories, unretainedOpenedLimitation, unwrapDesktopCommand, validSignature, versionAt, withExtraPackages, withoutCredentialsIn };