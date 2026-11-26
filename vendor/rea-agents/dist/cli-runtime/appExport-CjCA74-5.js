import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ZIP64_END, ZIP64_LOCATOR, ZIP_CLASSIC_DIRECTORY_LIMITS, ZIP_CLASSIC_DISK_OFFSETS, ZIP_SINGLE_VOLUME, init_zipEndOfCentralDirectory } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { ZIP_CENTRAL_HEADER, ZIP_SIGNATURES, init_zipCentralHeader, init_zipPackageFormat } from "./canonicalOrdering-C7Yzy62j.js";
import { XML_ELEMENT_OPENING, init_xmlDocument } from "./xmlDocument-DuM0TF5n.js";
import { DESKTOP_ENTRY_GROUP, DESKTOP_GROUP, DESKTOP_KEY, DESKTOP_KEY_SEPARATOR, DESKTOP_LINE_BREAK, DESKTOP_VALUE_ESCAPE, DESKTOP_VALUE_ESCAPES, DESKTOP_VIEW_DEFAULTS, ENV_PREFIX, ENV_UNSET_NAME, ENV_WRAPPER, EXEC_LEXEME, INSTALL_SCRIPT, KEYFILE_CONTROL_LINE, KEYFILE_ENTRY_LINE, PYTHON_ECMASCRIPT_TRIM_CHARACTERS, PYTHON_X11_PROPERTIES, QUOTED_ESCAPE, SQLITE_SIDECARS, desktopViewPolicy, execTakesFiles, init_appExportInstall, init_appExportUnowned, init_desktopEntry, init_desktopLaunchSyntax, init_desktopStateDiff, init_desktopTextSyntax, init_desktopViewPolicy, init_stateFormats, init_stateRoles, init_x11Windows, isWithinAny, leftOutFiles, pythonDesktopViewPolicy, roleFacts, stateDirectoryOf, unownedReadmeNotes, unwrapDesktopCommand } from "./x11Windows-Cx5-JOUb.js";
import { ZIP_EXTRA_FIELD, init_zipExtraFields } from "./zipExtraFields-D62NWuZt.js";
import { posix } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { z } from "zod";

//#region dist/domain/desktop/appDownloadDesktop.js
var pythonJson, rewriteAppImageDesktop;
function init_appDownloadDesktop() {
	return (init_appDownloadDesktop = __esmMin((() => {
		init_desktopLaunchSyntax();
		init_desktopTextSyntax();
		pythonJson = (value) => `json.loads(${JSON.stringify(JSON.stringify(value))})`;
		rewriteAppImageDesktop = String.raw`import json
import re
import sys
from pathlib import Path
from shutil import copyfile

source, destination, app_run, svg_icons, pixmaps = sys.argv[1:]
value_escapes = ${pythonJson(DESKTOP_VALUE_ESCAPES)}
value_lexeme = re.compile(${pythonJson(String.raw`${DESKTOP_VALUE_ESCAPE}|([\s\S])`)})
exec_lexeme = re.compile(${pythonJson(EXEC_LEXEME)})
quoted_escape = re.compile(${pythonJson(QUOTED_ESCAPE)})
env_wrapper = re.compile(${pythonJson(ENV_WRAPPER)})
env_unset_name = re.compile(${pythonJson(ENV_UNSET_NAME)})
env_phases = ${pythonJson(ENV_PREFIX)}
group_header = re.compile(${pythonJson(DESKTOP_GROUP)})
entry_key = re.compile(${pythonJson(`(${DESKTOP_KEY})${DESKTOP_KEY_SEPARATOR}`)})
desktop_entry_group = ${pythonJson(DESKTOP_ENTRY_GROUP)}
action_group = re.compile(${pythonJson(`Desktop Action ${DESKTOP_KEY}`)})
trim_characters = ${PYTHON_ECMASCRIPT_TRIM_CHARACTERS}

def desktop_value_characters(raw):
    for part in value_lexeme.finditer(raw):
        escaped, character = part.groups()
        yield character if escaped is None else value_escapes[escaped], part.end()

def exec_tokens(raw):
    # Decode the value layer while recording where its characters came from.
    value, offsets = [], [0]
    for character, end in desktop_value_characters(raw):
        value.append(character)
        offsets.append(end)
    value = "".join(value)

    tokens, parts = [], []
    cursor = 0
    while cursor < len(value):
        part = exec_lexeme.match(value, cursor)
        if part is None:
            raise ValueError("unterminated quote in desktop Exec")
        quoted, unquoted, separator = part.groups()
        if separator is not None:
            if parts:
                tokens.append(("".join(parts), offsets[start], offsets[cursor]))
                parts = []
        else:
            if not parts:
                start = cursor
            parts.append(unquoted if quoted is None else quoted_escape.sub(r"\1", quoted))
        cursor = part.end()
    if parts:
        tokens.append(("".join(parts), offsets[start], offsets[cursor]))
    return tokens

def program_span(raw):
    tokens = exec_tokens(raw)
    index = 0
    if tokens and env_wrapper.fullmatch(tokens[0][0]):
        index = 1
        directory, clear_environment, unsets = None, False, []
        for phase in env_phases:
            while index < len(tokens):
                for rule in phase["rules"]:
                    matched = re.fullmatch(rule["pattern"], tokens[index][0])
                    if matched is None:
                        continue
                    index += 1
                    kind = rule["kind"]
                    if kind == "clear" or ("clear" in rule and matched[rule["clear"]]):
                        clear_environment = True
                    if kind in ("chdir", "unset"):
                        value = matched[rule["operand"]] if "operand" in rule else None
                        if value is None:
                            value = tokens[index][0] if index < len(tokens) else ""
                            index += 1
                        if kind == "chdir":
                            directory = value
                        else:
                            unsets.append(value)
                    break
                else:
                    break
                if not phase["repeat"]:
                    break
        if not clear_environment and any(env_unset_name.fullmatch(name) is None for name in unsets):
            raise ValueError("invalid env unset name in desktop Exec")
        if directory == "":
            raise ValueError("missing env chdir directory in desktop Exec")
    if index >= len(tokens) or not tokens[index][0]:
        raise ValueError("missing program in desktop Exec")
    return tokens[index][1:]

def line_end(line):
    if line.endswith("\r\n"):
        return len(line) - 2
    if line.endswith("\n"):
        return len(line) - 1
    return len(line)

# GLib merges repeated groups and selects the last declaration of each key.
# Only effective launch commands need to be parsed or rewritten.
with open(source, encoding="utf-8", newline="\n") as f:
    lines = f.readlines()
group = ""
execs = {}
icon = ""
for index, line in enumerate(lines):
    header = group_header.fullmatch(line.strip(trim_characters))
    if header:
        group = header[1]
        continue
    if group != desktop_entry_group and not action_group.fullmatch(group):
        continue
    indent = len(line) - len(line.lstrip(trim_characters))
    key = entry_key.match(line, indent)
    if not key:
        continue
    if key[1] == "Exec":
        execs[group] = index, key.end()
    elif group == desktop_entry_group:
        if key[1] == "TryExec":
            # Remove every declaration so an earlier one cannot become effective.
            lines[index] = ""
        elif key[1] == "Icon":
            icon = line[key.end():line_end(line)]

for index, value_start in sorted(execs.values()):
    line = lines[index]
    value_end = line_end(line)
    raw = line[value_start:value_end]
    start, end = program_span(raw)
    lines[index] = line[:value_start] + raw[:start] + app_run + raw[end:] + line[value_end:]
with open(destination, "w", encoding="utf-8", newline="") as f:
    f.writelines(lines)

icon = "".join(character for character, _ in desktop_value_characters(icon))
if icon and "/" not in icon and "\x00" not in icon:
    root = Path(source).parent
    for suffix, folder in ((".svg", svg_icons), (".png", pixmaps)):
        name = icon + suffix
        if (root / name).is_file():
            target = Path(folder)
            target.mkdir(parents=True, exist_ok=True)
            copyfile(root / name, target / name)
            break
`;
	})))();
}

//#endregion
//#region dist/domain/desktop/appDownloadInstall.js
var COMPUTER_ARCHITECTURES, downloadUrlSchema, sha256Schema, archivePathSchema, downloadFields, tarballFields, desktopEntryId, downloadInstallSchema, DOWNLOAD_INSTALL_SCRIPT, APPLICATIONS, downloadPrefix, downloadedFile, downloadedProgram, word, scriptHead, appImageScript, tarballEntryFile, tarballScript, tarballEntry, downloadInstallFiles;
function init_appDownloadInstall() {
	return (init_appDownloadInstall = __esmMin((() => {
		init_appDownloadDesktop();
		COMPUTER_ARCHITECTURES = ["amd64", "arm64"];
		downloadUrlSchema = z.url({
			protocol: /^https?$/u,
			abort: true
		}).regex(/^https?:\/\//u).refine((url) => {
			const parsed = new URL(url);
			return parsed.username === "" && parsed.password === "";
		}, { message: "The URL must not hold a user name or password." });
		sha256Schema = z.string().regex(/^[0-9a-f]{64}$/u);
		archivePathSchema = z.string().max(255).regex(/^[A-Za-z0-9_+@\x2d][A-Za-z0-9._+@\x2d]*(?:\/[A-Za-z0-9_+@\x2d][A-Za-z0-9._+@\x2d]*)*$/u);
		downloadFields = {
			url: downloadUrlSchema.describe("Where the computer downloads the file when the bundle is put: a release URL that keeps serving these bytes."),
			sha256: sha256Schema.describe("The file's SHA-256, as its project publishes it; agentenv refuses any other bytes."),
			architecture: z.enum(COMPUTER_ARCHITECTURES).describe("The architecture the file is built for.")
		};
		tarballFields = {
			...downloadFields,
			program: archivePathSchema.describe("The program to run, by its path inside the archive, such as firefox/firefox."),
			name: z.string().min(1).max(128).refine((name) => [...name].every((character) => {
				const code = character.codePointAt(0) ?? 0;
				return code >= 32 && code !== 127;
			}), { message: "The name must be one line without control characters." }).optional().describe("The name the menu entry REA writes shows; the desktop entry's last part when omitted.")
		};
		desktopEntryId = z.string().regex(/^[A-Za-z0-9][A-Za-z0-9._\x2d]*$/u).max(255).transform((id) => id.replace(/\.desktop$/u, ""));
		downloadInstallSchema = z.discriminatedUnion("kind", [z.strictObject({
			kind: z.literal("appimage"),
			desktop_entry: desktopEntryId,
			...downloadFields
		}), z.strictObject({
			kind: z.literal("tarball"),
			desktop_entry: desktopEntryId,
			...tarballFields
		})]);
		DOWNLOAD_INSTALL_SCRIPT = "install-download.sh";
		APPLICATIONS = "/usr/local/share/applications";
		downloadPrefix = (install) => `/opt/rea-apps/${install.desktop_entry}`;
		downloadedFile = (install) => install.kind === "appimage" ? "vendor/app.AppImage" : "vendor/app.tar";
		downloadedProgram = (install) => install.kind === "appimage" ? `${downloadPrefix(install)}/squashfs-root/AppRun` : `${downloadPrefix(install)}/${install.program}`;
		word = (value) => {
			if (!/^[A-Za-z0-9._/+@-]+$/u.test(value)) throw new TypeError(`${JSON.stringify(value)} is not a download path.`);
			return `'${value}'`;
		};
		scriptHead = (install, purpose) => [
			"#!/bin/sh",
			`# Runs as root with the network off: ${purpose}`,
			"set -eu",
			`download="$PWD"/${word(downloadedFile(install))}`,
			`entry=${word(install.desktop_entry)}`,
			`prefix=${word(downloadPrefix(install))}`,
			"rm -rf \"$prefix\"",
			`mkdir -p "$prefix" ${APPLICATIONS}`
		];
		appImageScript = (install) => [
			...scriptHead(install, "extract the AppImage under its folder and install its own desktop entry and icon."),
			"cd \"$prefix\"",
			"[ -x \"$download\" ] || chmod 755 \"$download\"",
			"\"$download\" --appimage-extract > /dev/null",
			"rm -f \"$download\"",
			"desktop=\"squashfs-root/$entry.desktop\"",
			"if [ ! -f \"$desktop\" ]; then",
			`  echo "The AppImage has no desktop entry $entry.desktop at its top; it has: $(cd squashfs-root && ls -- *.desktop 2>/dev/null | tr '\\n' ' ')" >&2`,
			"  exit 1",
			"fi",
			"chmod -R a+rX \"$prefix\"",
			`python3 - "$desktop" "${APPLICATIONS}/$entry.desktop" "$prefix/squashfs-root/AppRun" /usr/local/share/icons/hicolor/scalable/apps /usr/local/share/pixmaps <<'PY'`,
			rewriteAppImageDesktop,
			"PY",
			""
		].join("\n");
		tarballEntryFile = (install) => `applications/${install.desktop_entry}.desktop`;
		tarballScript = (install) => [
			...scriptHead(install, "unpack the archive under its folder and install the desktop entry REA wrote for its program."),
			`program=${word(install.program)}`,
			"python3 - \"$download\" \"$prefix\" <<'PY'",
			"import sys",
			"import tarfile",
			"",
			"with tarfile.open(sys.argv[1]) as archive:",
			"    archive.extractall(sys.argv[2], filter=\"data\")",
			"PY",
			"rm -f \"$download\"",
			"if [ ! -f \"$prefix/$program\" ] || [ ! -x \"$prefix/$program\" ]; then",
			`  echo "The archive has no executable $program; its top holds: $(ls "$prefix" | tr '\\n' ' ')" >&2`,
			"  exit 1",
			"fi",
			"chmod -R a+rX \"$prefix\"",
			`cp "$PWD"/${word(tarballEntryFile(install))} "${APPLICATIONS}/$entry.desktop"`,
			`chmod 644 "${APPLICATIONS}/$entry.desktop"`,
			""
		].join("\n");
		tarballEntry = (install) => {
			const name = install.name ?? install.desktop_entry.split(".").at(-1) ?? "app";
			return [
				"[Desktop Entry]",
				"Type=Application",
				`Name=${name.replaceAll("\\", "\\\\")}`,
				`Exec=${downloadedProgram(install)} %F`,
				"Terminal=false",
				""
			].join("\n");
		};
		downloadInstallFiles = (install) => install.kind === "appimage" ? [{
			path: DOWNLOAD_INSTALL_SCRIPT,
			content: appImageScript(install)
		}] : [{
			path: DOWNLOAD_INSTALL_SCRIPT,
			content: tarballScript(install)
		}, {
			path: tarballEntryFile(install),
			content: tarballEntry(install)
		}];
	})))();
}

//#endregion
//#region dist/domain/desktop/appExportInstallText.js
var installName, downloadDeclarations, installedFrom, downloadKind, installs, packageFileNotes, downloadNotes, installNotes;
function init_appExportInstallText() {
	return (init_appExportInstallText = __esmMin((() => {
		init_appDownloadInstall();
		init_appExportInstall();
		installName = (plan) => plan.aptRelease === null ? plan.aptPackage : `${plan.aptPackage}/${plan.aptRelease}`;
		downloadDeclarations = ({ download }) => download === undefined ? "" : `\n    downloads=[Download(url=${JSON.stringify(download.url)}, sha256=${JSON.stringify(download.sha256)}, to=${JSON.stringify(downloadedFile(download))}, arch=${JSON.stringify(download.architecture)})],\n    run=[RunScript(script=${JSON.stringify(DOWNLOAD_INSTALL_SCRIPT)})],`;
		installedFrom = (plan) => plan.aptSources.length === 0 ? "the distribution archive" : plan.aptSources.map((source) => `the apt repository \`${source.uri}\` (suite \`${source.suite}\`${source.components.length === 0 ? "" : `, components \`${source.components.join(" ")}\``}), trusting \`${source.keyFile}\`, the key that verified its release on the capture host`).join(" and ");
		downloadKind = (download) => download.kind === "appimage" ? "AppImage" : "tarball";
		installs = (plan) => plan.download !== undefined ? `\`${plan.download.desktop_entry}\` from its ${downloadKind(plan.download)}, downloaded from
  \`${plan.download.url}\` when the bundle is put, refused unless its SHA-256 is \`${plan.download.sha256}\`, and unpacked
  under \`${downloadPrefix(plan.download)}\`` : plan.packageFile === null ? `\`${installName(plan)}\` from ${installedFrom(plan)}` : `\`${plan.aptPackage}\`${plan.packageVersion === null ? "" : ` ${plan.packageVersion}`} from its package file, downloaded from
  \`${plan.packageFile.url}\` when the bundle is put and refused unless its SHA-256 is \`${plan.packageFile.sha256}\``;
		packageFileNotes = ({ packageFile: file }) => file === null ? [] : [`- The bundle does not contain the package: \`${INSTALL_SCRIPT}\` installs \`${file.path}\` with dpkg once the apt packages
  it depends on are in${file.dependencies.length === 0 ? "" : ` (${file.dependencies.map((name) => `\`${name}\``).join(", ")})`}, so the computer runs exactly the captured version, on \`${file.architecture}\` only.`, "- Vendor sites may refuse automated downloads, so the URL must point at a copy of the file the operator may use.\n  The package's licence, such as a trial's terms, is the operator's to check."];
		downloadNotes = ({ download }) => download === undefined ? [] : [`- The bundle does not contain the application: \`${DOWNLOAD_INSTALL_SCRIPT}\` unpacks the download and installs the desktop entry
  \`${download.desktop_entry}\` with the network off, so the computer runs exactly those bytes, on \`${download.architecture}\` only.`, "- The URL must keep serving those bytes, or point at a copy of them the operator may use, and the application's licence is\n  the operator's to check."];
		installNotes = (plan) => [
			...packageFileNotes(plan),
			...downloadNotes(plan),
			...plan.extraPackages === undefined ? [] : [`- Installed beside the app because the export was asked for them with \`--extra-package\`, as a build computer asks
  for the packages its request named: ${plan.extraPackages.map((name) => `\`${name}\``).join(", ")}.`],
			...plan.executablePackage === undefined ? [] : [`- \`${plan.executablePackage}\`, which owns the program the desktop entry runs, is installed with it.`],
			...plan.libraryPackages.length === 0 ? [] : [`- Library packages, which own the shared libraries the executable loaded on the capture host, are installed with it:
  ${plan.libraryPackages.map((name) => `\`${name}\``).join(", ")}.`],
			...plan.electron ? ["- Chromium's sandbox is off (`--no-sandbox`): it needs user namespaces the computer's container does not grant,\n  and Electron exits without them."] : []
		].map((line) => `\n${line}`).join("");
	})))();
}

//#endregion
//#region dist/domain/desktop/pythonExactJsonNumber.js
var PYTHON_EXACT_JSON_NUMBER;
function init_pythonExactJsonNumber() {
	return (init_pythonExactJsonNumber = __esmMin((() => {
		PYTHON_EXACT_JSON_NUMBER = String.raw`
class _Inexact(Exception):
    """A JSON number that REA's state view refuses, since reading it would change it."""


def _digits(text: str) -> str:
    return re.split(r"[eE]", text.lstrip("-"))[0].replace(".", "").strip("0") or "0"


def _js_string(value: float) -> str:
    """How JavaScript's String() writes a finite double: an integer below 1e21 in full, any other in shortest form."""
    return str(int(value)) if value.is_integer() and abs(value) < 1e21 else repr(value)


def _safe_number(text: str) -> bool:
    """lossless-json's isSafeNumber: an integer spelling within 2^53, or a float spelling that keeps its digits."""
    if re.fullmatch(r"-?[0-9]+", text):
        return len(text.lstrip("-")) <= 16 and abs(int(text)) <= MAX_SAFE_INTEGER
    value = float(text)
    if not math.isfinite(value):
        return False
    written = _js_string(value)
    return written == text or _digits(written) == _digits(text)


def _exact_number(text: str):
    """A JSON number read only when reading it changes nothing, as REA's state view rules: its spelling and its
    written-back form both safe, and not -0."""
    value = float(text)
    if (not _safe_number(text) or not math.isfinite(value) or not _safe_number(_js_string(value))
            or (value == 0 and math.copysign(1, value) < 0)):
        raise _Inexact(text)
    return int(text) if re.fullmatch(r"-?[0-9]+", text) else value


_INEXACT = object()
_LEVEL_END = object()


def _number_or_mark(spelling: str):
    """Retain an inexact-number mark until duplicate object keys have settled."""
    try:
        return _exact_number(spelling)
    except _Inexact:
        return _INEXACT


def _holds_inexact(value, summarized_inexact=_INEXACT) -> bool:
    """Inspect retained values with one iterator per level; bounded readers may also mark a summarized subtree."""
    levels = [iter((value,))]
    while levels:
        item = next(levels[-1], _LEVEL_END)
        if item is _LEVEL_END:
            levels.pop()
        elif item is _INEXACT or item is summarized_inexact:
            return True
        elif isinstance(item, dict):
            levels.append(iter(item.values()))
        elif isinstance(item, list):
            levels.append(iter(item))
    return False


`;
	})))();
}

//#endregion
//#region dist/domain/desktop/appExportPythonJson.js
var PYTHON_JSON_READER;
function init_appExportPythonJson() {
	return (init_appExportPythonJson = __esmMin((() => {
		init_pythonExactJsonNumber();
		PYTHON_JSON_READER = String.raw`
#: A JSON token after any whitespace, by group: an opening, a closing, a comma, a colon, a string's quote, or a number
#: or literal. Strings are read by json's scanner, since a pattern repeating per escape holds memory for each.
JSON_TOKEN = re.compile(r'[ \t\n\r]*(?:([\[{])|([\]}])|(,)|(:)|(")|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?'
                        r"|true|false|null))")
JSON_SPACE = re.compile(r"[ \t\n\r]*")


${PYTHON_EXACT_JSON_NUMBER}
_DEEP = object()
_DEEP_INEXACT = object()
_INVALID_JSON = object()
JSON_ATOMS = {"true": True, "false": False, "null": None}


def _deeper_than(root, limit: int) -> bool:
    """Whether a parsed JSON value nests deeper than a limit, as REA checks it: a value's depth is the number of
    iterators open above it, one per nesting level, so no child list is copied."""
    levels = [iter((root,))]
    while levels:
        item = next(levels[-1], _LEVEL_END)
        if item is _LEVEL_END:
            levels.pop()
        elif item is _DEEP or item is _DEEP_INEXACT:
            return True
        elif len(levels) - 1 > limit:
            return True
        elif isinstance(item, dict):
            levels.append(iter(item.values()))
        elif isinstance(item, list):
            levels.append(iter(item))
    return False


def _read_json(text: str, build: bool = True):
    """One JSON value, or _INVALID_JSON, read without recursion so duplicate keys settle before depth is checked.
    Deep containers are summarized rather than built; exact-number marks still follow last-key-wins semantics.
    With build=False, only syntax is checked: one byte per open container and one decoded string at a time."""
    containers, expect, empty, at = bytearray(), "value", False, 0
    values, keys, root = [], [], _INVALID_JSON
    deep_bad, deep_key_at, bad_keys = bytearray(), array("I"), {}

    def keep(value) -> None:
        nonlocal root
        if not values:
            root = value
        elif containers[-1] == ord("["):
            values[-1].append(value)
        else:
            values[-1][keys[-1]] = value

    def record_deep(bad: bool) -> None:
        """Summarize a finished child; keep only object keys with live inexact values."""
        depth = len(deep_bad) - 1
        if containers[-1] == ord("["):
            deep_bad[-1] |= 2 | bad
            return
        marked = bad_keys.get(depth)
        if bad or marked is not None:
            key, _ = json.decoder.scanstring(text, deep_key_at[-1])
            if bad:
                if marked is None:
                    marked = key
                elif isinstance(marked, str):
                    if marked != key:
                        marked = {marked, key}
                else:
                    marked.add(key)
            else:
                if isinstance(marked, str):
                    if marked == key:
                        marked = None
                else:
                    marked.discard(key)
                    if len(marked) == 1:
                        marked = next(iter(marked))
            if marked is None:
                bad_keys.pop(depth, None)
            else:
                bad_keys[depth] = marked
            deep_bad[-1] = 2 | (marked is not None)
        else:
            deep_bad[-1] |= 2

    while True:
        token = JSON_TOKEN.match(text, at)
        if token is None:
            break
        kind, at = token.lastindex, token.end()
        if kind == 5:
            string_at = at
            try:
                value, at = json.decoder.scanstring(text, at)
            except ValueError:
                return _INVALID_JSON
        if kind == 1 and expect == "value":
            if build:
                if deep_bad or len(containers) >= MAX_JSON_VIEW_DEPTH:
                    deep_bad.append(0)
                    deep_key_at.append(0)
                else:
                    value = [] if text[at - 1] == "[" else {}
                    keep(value)
                    values.append(value)
                    keys.append(None)
            containers.append(ord(text[at - 1]))
            expect, empty = ("value" if text[at - 1] == "[" else "key"), True
        # A closing bracket's code is its opening's plus two.
        elif kind == 2 and (expect == "after" or empty) and containers and containers[-1] == ord(text[at - 1]) - 2:
            opening = containers.pop()
            if build:
                if deep_bad:
                    state = deep_bad.pop()
                    bad = bool(state & 1)
                    deep_key_at.pop()
                    bad_keys.pop(len(deep_bad), None)
                    if deep_bad:
                        record_deep(bad)
                    else:
                        keep((_DEEP_INEXACT if bad else _DEEP) if state & 2 else ([] if opening == ord("[") else {}))
                else:
                    values.pop()
                    keys.pop()
            expect, empty = "after", False
        elif kind == 3 and expect == "after" and containers:
            expect = "value" if containers[-1] == ord("[") else "key"
        elif kind == 4 and expect == "colon":
            expect = "value"
        elif kind >= 5 and (expect == "value" or (kind == 5 and expect == "key")):
            if build:
                if expect == "key":
                    if deep_bad:
                        deep_key_at[-1] = string_at
                    else:
                        keys[-1] = value
                else:
                    if kind == 6:
                        value = JSON_ATOMS.get(token[6], _INVALID_JSON)
                        if value is _INVALID_JSON:
                            value = _number_or_mark(token[6])
                    if deep_bad:
                        record_deep(value is _INEXACT)
                    else:
                        keep(value)
            expect, empty = ("colon" if expect == "key" else "after"), False
        else:
            return _INVALID_JSON
    if expect != "after" or containers or JSON_SPACE.fullmatch(text, at) is None:
        return _INVALID_JSON
    return root if build else True


def _json_view(text: str, size: int):
    """A JSON text's format and view, or why it has none, as REA reads it; None when it is not JSON. Text over the
    parsed-view limit is told apart without building its value."""
    if size > MAX_PARSED_BYTES:
        valid = _read_json(text, build=False) is not _INVALID_JSON
        return {"format": "json", "view": None, "error": PARSED_TOO_LARGE} if valid else None
    # The whole text must parse, and duplicate keys settle, before an inexact number makes it JSON with an error.
    view = _read_json(text)
    if view is _INVALID_JSON:
        return None
    if _holds_inexact(view, _DEEP_INEXACT):
        return {"format": "json", "view": None,
                "error": "a number in it cannot be read exactly, such as an integer above 2^53"}
    if _deeper_than(view, MAX_JSON_VIEW_DEPTH):
        return {"format": "json", "view": None, "error": JSON_TOO_DEEP}
    return {"format": "json", "view": view, "truncated": False}

`;
	})))();
}

//#endregion
//#region dist/domain/desktop/appExportPythonXml.js
var PYTHON_XML_READER;
function init_appExportPythonXml() {
	return (init_appExportPythonXml = __esmMin((() => {
		PYTHON_XML_READER = String.raw`#: XML's whitespace, which alone can be formatting between elements; Unicode's wider set is text.
XML_WHITESPACE = " \t\r\n"
PREDEFINED_ENTITIES = ("amp", "lt", "gt", "apos", "quot")
ENTITY_REFERENCE = re.compile(r"&([^#;][^;]*);")
#: A line ending as XML normalizes it before parsing; expat leaves a DOCTYPE's system literal as written.
XML_LINE_ENDING = re.compile(r"\r\n?")


def _expat(namespaces: bool, doctype=None):
    """An expat parser that reads a DOCTYPE as REA does: one with an internal subset, which could declare entities,
    is refused, the DTD it names is never read, and a reference to an entity other than XML's five is refused where
    expat would skip it. With namespaces it also enforces their rules, as REA's parser does, and without them it
    reports names as the document spells them. doctype, when given, receives the declared name and identifiers."""
    parser = expat.ParserCreate(namespace_separator=" " if namespaces else None)
    parser.SetParamEntityParsing(expat.XML_PARAM_ENTITY_PARSING_NEVER)

    def declared(name: str, system_id, public_id, internal_subset: bool) -> None:
        if internal_subset:
            raise ValueError("the document's DOCTYPE has an internal subset")
        if doctype is not None:
            if system_id is not None:
                system_id = XML_LINE_ENDING.sub("\n", system_id)
            doctype({"name": name, "public_id": public_id, "system_id": system_id})

    def undeclared(name: str, _parameter: bool) -> None:
        raise ValueError(f"the document refers to the undeclared entity {name}")

    def external(*_) -> None:
        raise ValueError("the document refers to an external entity")

    parser.StartDoctypeDeclHandler = declared
    parser.SkippedEntityHandler = undeclared
    parser.ExternalEntityRefHandler = external
    return parser


def _check_tag(markup: str) -> None:
    """expat leaves an undeclared entity out of an attribute value without a word when a DOCTYPE names a DTD; REA's
    parser refuses it. With text taken by its own handler, a start tag is the only markup expat passes here that
    starts with < and a name, and it passes it whole."""
    if markup[:1] == "<" and markup[1:2] not in ("!", "?", "/"):
        for name in ENTITY_REFERENCE.findall(markup):
            if name not in PREDEFINED_ENTITIES:
                raise ValueError(f"the document refers to the undeclared entity {name}")


def _ignore_text(_text: str) -> None:
    pass


class _XmlReader:
    """REA's XML view built as expat reads: names as spelled, declarations as attributes, text split where REA's DOM
    splits it (an empty CDATA section joins the text around it), and each node counted against REA's limits."""

    def __init__(self) -> None:
        self.remaining, self.truncated, self.root, self.doctype = MAX_XML_NODES, False, None, None
        #: Per open element: its view or None when left out, whether xml:space="preserve" applies inside it, whether
        #: it holds an element, and whether it holds text other than whitespace: whitespace-only text is formatting
        #: only in an element that holds elements and no such text.
        self.open = []
        self.text, self.cdata = [], None

    def read(self, text: str) -> None:
        parser = _expat(False, self._doctype)
        parser.buffer_text = True
        parser.StartElementHandler, parser.EndElementHandler = self._start, self._end
        parser.CharacterDataHandler = self._data
        parser.StartCdataSectionHandler, parser.EndCdataSectionHandler = self._cdata_start, self._cdata_end
        parser.CommentHandler = parser.ProcessingInstructionHandler = self._other
        parser.Parse(text, True)

    def _doctype(self, declared: dict) -> None:
        self.doctype = declared

    def _admit(self) -> bool:
        """Whether the next node inside a kept element is kept, within the node and depth limits; one past them
        marks the view truncated."""
        if self.open and self.open[-1][0] is None:
            return False
        if self.remaining <= 0 or len(self.open) > MAX_XML_DEPTH:
            self.truncated = True
            return False
        self.remaining -= 1
        return True

    def _text_node(self, text: str) -> None:
        if self.open and text.strip(XML_WHITESPACE):
            self.open[-1][3] = True
        if self._admit():
            self.open[-1][0]["children"].append(text)

    def _flush(self) -> None:
        if self.text:
            text, self.text = "".join(self.text), []
            self._text_node(text)

    def _data(self, text: str) -> None:
        (self.text if self.cdata is None else self.cdata).append(text)

    def _cdata_start(self) -> None:
        self.cdata = []

    def _cdata_end(self) -> None:
        text, self.cdata = "".join(self.cdata), None
        if text:
            self._flush()
            self._text_node(text)

    def _other(self, *_) -> None:
        """A comment or processing instruction, counted like any node and never kept."""
        self._flush()
        if self.open:
            self._admit()

    def _start(self, name: str, attributes: dict) -> None:
        self._flush()
        parent = self.open[-1] if self.open else [None, False, False, False]
        parent[2] = True
        view = {"name": name, "attributes": attributes, "children": []} if self._admit() else None
        if view is not None and parent[0] is not None:
            parent[0]["children"].append(view)
        space = attributes.get(XML_SPACE)
        self.open.append([view, space == "preserve" if space else parent[1], False, False])

    def _end(self, _name: str) -> None:
        self._flush()
        view, preserve, holds_element, holds_text = self.open.pop()
        if view is not None and holds_element and not holds_text and not preserve:
            view["children"] = [child for child in view["children"]
                                if not isinstance(child, str) or child.strip(XML_WHITESPACE)]
        if not self.open:
            self.root = view


def _xml_view(text: str):
    """REA's XML view, or None for a document REA's parser refuses: a pass with namespaces checks the document as REA's
    parser does, then a pass without them reads names as spelled, as REA's view keeps them, and the DOCTYPE."""
    reader = _XmlReader()
    try:
        check = _expat(True)
        check.CharacterDataHandler, check.DefaultHandler = _ignore_text, _check_tag
        check.Parse(text, True)
        reader.read(text)
    except (expat.ExpatError, ValueError):
        return None
    view = {"root": reader.root, "truncated": reader.truncated}
    return view if reader.doctype is None else {"doctype": reader.doctype, **view}
`;
	})))();
}

//#endregion
//#region dist/domain/desktop/appExportPythonZip.js
var PYTHON_ZIP_HELPERS;
function init_appExportPythonZip() {
	return (init_appExportPythonZip = __esmMin((() => {
		init_zipEndOfCentralDirectory();
		init_zipCentralHeader();
		init_zipExtraFields();
		PYTHON_ZIP_HELPERS = String.raw`
ZIP_READ_CHUNK = 64 * 1024
#: Small, since the end of each gzip member copies what is left of the piece it was read from.
GZIP_READ_CHUNK = 4 * 1024
ZIP_END = b"PK\x05\x06"
ZIP_CENTRAL_LAYOUT = ${JSON.stringify(ZIP_CENTRAL_HEADER)}
ZIP_CENTRAL = ZIP_CENTRAL_LAYOUT["signature"].to_bytes(4, "little")
ZIP64_LOCATOR = b"PK\x06\x07"
ZIP64_END = b"PK\x06\x06"
ZIP64_END_LAYOUT = ${JSON.stringify(ZIP64_END)}
ZIP64_LOCATOR_LAYOUT = ${JSON.stringify(ZIP64_LOCATOR)}
ZIP_CLASSIC_DIRECTORY_LIMITS = ${JSON.stringify(ZIP_CLASSIC_DIRECTORY_LIMITS)}
ZIP_CLASSIC_DISK_OFFSETS = ${JSON.stringify(Object.values(ZIP_CLASSIC_DISK_OFFSETS))}
ZIP_SINGLE_VOLUME = ${JSON.stringify(ZIP_SINGLE_VOLUME)}
ZIP_EXTRA_FIELD = ${JSON.stringify(ZIP_EXTRA_FIELD)}
#: Formats an archive entry may have whose reader needs a tool, a worker or another archive opened.
NOT_READ_INSIDE = ((SQLITE_HEADER, "sqlite", "a SQLite database"), (GVDB_HEADER, "dconf", "a dconf database"))


def _entry_view(name: str, data: bytes) -> dict:
    """An archive entry's format and view by the rules a file's follow; a database or an archive inside is not
    read."""
    for header, form, inside in NOT_READ_INSIDE:
        if data.startswith(header):
            return {"format": form, "view": None, "error": f"{inside} inside an archive is not read"}
    if _is_zip(data):
        return {"format": "zip", "view": None, "error": "an archive inside an archive is not read"}
    return _bytes_view(name, data)


def _zip_refusal(info, spent: int):
    """Why an entry is not read, checked in REA's order, or None; spent is the archive's bytes read so far."""
    if info.flag_bits & 0x1:
        return "encrypted, so it is not read"
    if info.compress_type not in (zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED):
        return f"compressed with method {info.compress_type}, which the view does not read"
    if info.file_size > MAX_ZIP_ENTRY_BYTES:
        return f"larger than the {_view_byte_limit(MAX_ZIP_ENTRY_BYTES)} an entry's view reads"
    if info.file_size > MAX_ZIP_RATIO * info.compress_size:
        return f"expands more than {MAX_ZIP_RATIO} times, so it is not read"
    if spent + info.file_size > MAX_ZIP_BYTES:
        return f"past the {_view_byte_limit(MAX_ZIP_BYTES)} read from one archive"
    return None


def _entry_bytes(archive, info):
    """An entry's uncompressed bytes, or None when they fail its CRC-32 or are not exactly its declared size. Reading
    stops one byte past that size, which data past a short declared size fills, and asks for a bounded chunk at a
    time, which bounds what the decompressor expands per call, so a forged small size holds no more than that."""
    probe = copy.copy(info)
    probe.file_size = info.file_size + 1
    data = bytearray()
    try:
        with archive.open(probe) as member:
            while len(data) <= info.file_size:
                chunk = member.read(min(probe.file_size - len(data), ZIP_READ_CHUNK))
                if not chunk:
                    break
                data += chunk
    except (zipfile.BadZipFile, zlib.error, EOFError, OSError, ValueError):
        return None
    return data if len(data) == info.file_size else None


def _zip_entry(archive, info, refusal, name):
    """One entry of a zip view: its name, size and digest, and its own format and view, or why it was not read."""
    entry = {"name": name, "size": info.file_size, "sha256": None, "format": None, "view": None,
             "view_error": refusal}
    if refusal is not None:
        return entry
    data = _entry_bytes(archive, info)
    if data is None:
        return {**entry, "view_error": "its compressed data is damaged"}
    view = _entry_view(name, data)
    return {**entry, "sha256": hashlib.sha256(data).hexdigest(), "format": view["format"],
            "view": view.get("view"), "view_error": view.get("error")}


def _zip64_directory_record(file, record: int, locator: int):
    """Read the fixed fields only, after the entire declared record fits before the locator."""
    fixed = ZIP64_END_LAYOUT["fixedBytes"]
    prefix = ZIP64_END_LAYOUT["sizePrefixBytes"]
    if record < 0 or record + fixed > locator:
        return None
    file.seek(record)
    header = file.read(fixed)
    if len(header) != fixed or header[:4] != ZIP64_END:
        return None
    body = struct.unpack_from("<Q", header, ZIP64_END_LAYOUT["sizeOffset"])[0]
    if body < fixed - prefix or record + prefix + body != locator:
        return None
    return header


def _zip_end(file, size: int):
    """Read the classic end and any declared Zip64 frame from the single supplied volume."""
    window = min(size, 22 + 0xFFFF)
    file.seek(size - window)
    tail = file.read(window)
    at = tail.rfind(ZIP_END, 0, len(tail) - 18)
    while at >= 0 and at + 22 + int.from_bytes(tail[at + 20:at + 22], "little") != len(tail):
        at = tail.rfind(ZIP_END, 0, at + 3)
    if at < 0:
        return None
    entries_on_disk, total, length, offset = struct.unpack_from("<HHII", tail, at + 8)
    classic_disks = [struct.unpack_from("<H", tail, at + field)[0] for field in ZIP_CLASSIC_DISK_OFFSETS]
    end = size - window + at
    classic = ((end, length, offset, total)
               if entries_on_disk == total and all(disk in ZIP_SINGLE_VOLUME["classic"] for disk in classic_disks)
               else None)
    locator_at = end - ZIP64_LOCATOR_LAYOUT["bytes"]
    if locator_at < 0:
        return classic
    file.seek(locator_at)
    locator = file.read(ZIP64_LOCATOR_LAYOUT["bytes"])
    if len(locator) != ZIP64_LOCATOR_LAYOUT["bytes"] or locator[:4] != ZIP64_LOCATOR:
        return classic
    declared = struct.unpack_from("<Q", locator, ZIP64_LOCATOR_LAYOUT["recordOffset"])[0]
    fallback = locator_at - ZIP64_END_LAYOUT["fixedBytes"]
    # The fixed fallback preserves archives whose offsets omit prepended bytes.
    for record in (declared, fallback):
        zip64 = _zip64_directory_record(file, record, locator_at)
        if zip64 is None:
            continue
        if (any(disk not in ZIP_SINGLE_VOLUME["zip64Classic"] for disk in classic_disks)
                or any(struct.unpack_from("<I", locator, field)[0] != value
                       for field, value in ZIP_SINGLE_VOLUME["zip64Locator"])
                or any(struct.unpack_from("<I", zip64, field)[0] != value
                       for field, value in ZIP_SINGLE_VOLUME["zip64End"])):
            return None
        length = struct.unpack_from("<Q", zip64, ZIP64_END_LAYOUT["directorySizeOffset"])[0]
        offset = struct.unpack_from("<Q", zip64, ZIP64_END_LAYOUT["directoryOffset"])[0]
        entries_on_disk = struct.unpack_from("<Q", zip64, ZIP64_END_LAYOUT["entriesOnDiskOffset"])[0]
        total = struct.unpack_from("<Q", zip64, ZIP64_END_LAYOUT["totalEntriesOffset"])[0]
        return (record, length, offset, total) if entries_on_disk == total else None
    limits = ZIP_CLASSIC_DIRECTORY_LIMITS
    if total == limits["count"] or length == limits["size"] or offset == limits["offset"]:
        return None
    return classic


def _zip_extras(extra: bytes):
    """Check all framed fields before selection and return the last Unicode Path and the other original bytes."""
    at, copied, selected, kept = 0, 0, None, None
    header = ZIP_EXTRA_FIELD["headerBytes"]
    while at + header <= len(extra):
        payload = at + header
        size = struct.unpack_from("<H", extra, at + ZIP_EXTRA_FIELD["sizeOffset"])[0]
        end = payload + size
        if end > len(extra):
            raise zipfile.BadZipFile("Corrupt extra field")
        kind = struct.unpack_from("<H", extra, at + ZIP_EXTRA_FIELD["idOffset"])[0]
        if kind == ZIP_EXTRA_FIELD["unicodePath"]:
            selected = (payload, end)
            if kept is None:
                kept = bytearray()
            kept += extra[copied:at]
            copied = end
        at = end
    if selected is None:
        return None, extra
    kept += extra[copied:]
    return extra[selected[0]:selected[1]], kept


def _zip_unicode_path(raw: bytes, flags: int, data):
    """Use the last Info-ZIP Unicode Path only when it binds to the stored name, as zip.js does."""
    usable = (data is not None and len(data) >= 5 and data[0] == 1 and not flags & 0x800
              and int.from_bytes(data[1:5], "little") == zlib.crc32(raw))
    return data[5:] if usable else None


def _zip_name(raw: bytes, flags: int, unicode_path):
    """The exact REA name, shared by directory classification and the retained entry view."""
    if flags & 0x800:
        return raw.decode("utf-8")
    return raw.decode("cp437") if unicode_path is None else unicode_path.decode("utf-8")


def _zip_kept_record(fixed: bytes, raw: bytes, extra, comment: bytes):
    """Remove already-interpreted Unicode claims from the bounded decoder copy. zipfile otherwise interprets each
    occurrence, retaining an earlier valid name or rejecting invalid UTF-8 that zip.js already superseded.
    All other fields, comments and the original artifact bytes remain unchanged."""
    header = bytearray(fixed)
    struct.pack_into("<H", header, ZIP_CENTRAL_LAYOUT["extraBytesOffset"], len(extra))
    return header + raw + extra + comment


def _zip_directory(file, size: int, keep: int):
    """An archive's central directory read a record at a time, keeping the first file entries' records, as many as keep allows, and
    counting the rest, as REA reads it: (start, declared offset, records, count, names), or None when it cannot be read.
    Directories are told apart as zip.js tells them: a final slash, a Unix directory mode, or the MS-DOS attribute."""
    located = _zip_end(file, size)
    if located is None:
        return None
    end, length, declared, total = located
    start = end - length
    if start < 0:
        return None
    file.seek(start)
    records, names, count, seen, at = [], [], 0, 0, start
    fixed_bytes = ZIP_CENTRAL_LAYOUT["bytes"]
    while at < end:
        if at + fixed_bytes > end:
            return None
        fixed = file.read(fixed_bytes)
        if len(fixed) < fixed_bytes or fixed[:4] != ZIP_CENTRAL:
            return None
        made_by, flags = struct.unpack_from("<H2xH", fixed, 4)
        name_length, extra_length, comment_length = struct.unpack_from("<HHH", fixed, ZIP_CENTRAL_LAYOUT["nameBytesOffset"])
        external = struct.unpack_from("<I", fixed, 38)[0]
        variable_bytes = name_length + extra_length + comment_length
        at += fixed_bytes + variable_bytes
        if at > end:
            return None
        rest = file.read(variable_bytes)
        if len(rest) < variable_bytes:
            return None
        seen += 1
        extra_end = name_length + extra_length
        raw = rest[:name_length]
        selected, extra = _zip_extras(rest[name_length:extra_end])
        name = _zip_name(raw, flags, _zip_unicode_path(raw, flags, selected))
        if not (name.endswith("/") or (external >> 16) & 0o170000 == 0o040000 or (made_by >> 8 == 0 and external & 0x10)):
            count += 1
            if len(records) < keep:
                records.append(_zip_kept_record(fixed, raw, extra, rest[extra_end:]))
                names.append(name)
    return (start, declared, records, count, names) if seen == total else None


class _BoundedArchive(io.RawIOBase):
    """An archive as zipfile reads it: its entries in place, then a directory of the kept records alone and end
    records for them, so zipfile parses no more records than the view lists."""

    def __init__(self, file, start: int, tail: bytes) -> None:
        super().__init__()
        self._file, self._start, self._tail, self._at = file, start, tail, 0

    def readable(self) -> bool:
        return True

    def seekable(self) -> bool:
        return True

    def tell(self) -> int:
        return self._at

    def seek(self, offset: int, whence: int = 0) -> int:
        self._at = offset + (0, self._at, self._start + len(self._tail))[whence]
        return self._at

    def readinto(self, buffer) -> int:
        view = memoryview(buffer)
        if self._at < self._start:
            self._file.seek(self._at)
            count = self._file.readinto(view[:self._start - self._at])
        else:
            chunk = self._tail[self._at - self._start:self._at - self._start + len(view)]
            count = len(chunk)
            view[:count] = chunk
        self._at += count
        return count


def _zip(file, size: int) -> dict:
    """A zip archive's file entries in archive order, up to REA's entry, size, ratio and archive limits; nothing is
    extracted to disk, no archive inside is opened, and zipfile is shown only the directory records listed."""
    entries, spent = [], 0
    try:
        directory = _zip_directory(file, size, MAX_ZIP_ENTRIES)
        if directory is None:
            raise zipfile.BadZipFile("no readable central directory")
        start, declared, records, count, names = directory
        kept, retained = b"".join(records), len(records)
        limit = ZIP_CLASSIC_DIRECTORY_LIMITS
        offset = declared if declared <= limit["offset"] else start
        classic_count = min(retained, limit["count"])
        # zipfile follows a Zip64 locator signature wherever one sits before the end record, including in
        # a kept record's comment. Give it real Zip64 records with the exact selected directory facts.
        tail = (kept
                + struct.pack("<4sQ2H2I4Q", ZIP64_END, 44, 45, 45, 0, 0, retained, retained, len(kept), offset)
                + struct.pack("<4sIQI", ZIP64_LOCATOR, 0, offset + len(kept), 1)
                + struct.pack("<4s4H2IH", ZIP_END, 0, 0, classic_count, classic_count,
                              min(len(kept), limit["size"]), min(offset, limit["offset"]), 0))
        with zipfile.ZipFile(_BoundedArchive(file, start, tail)) as archive:
            infos = archive.infolist()
            if len(infos) != len(names):
                raise zipfile.BadZipFile("retained member count differs from decoded member count")
            for info, name in zip(infos, names):
                refusal = _zip_refusal(info, spent)
                spent += info.file_size if refusal is None else 0
                entries.append(_zip_entry(archive, info, refusal, name))
    except (zipfile.BadZipFile, zlib.error, EOFError, NotImplementedError, OSError, ValueError, struct.error):
        return {"format": "zip", "view": None, "error": "not a readable zip archive"}
    view = {"entries": entries, "entry_count": count, "truncated": count > len(entries)}
    return {"format": "zip", "view": view, "truncated": view["truncated"]}


def _gunzip(data: bytes, limit: int):
    """A gzip stream's document, its members joined as REA joins them, or None once it passes limit bytes, where
    decompressing stops: data after a member that starts with a zero byte is padding and ends the stream. It is read
    a piece at a time, so a member's end carries over only the rest of its piece. Raises zlib.error or EOFError when
    the stream is damaged or cut short."""
    document, member, rest, at = bytearray(), zlib.decompressobj(16 + zlib.MAX_WBITS), b"", 0
    while True:
        if not rest:
            if at >= len(data):
                raise EOFError("the gzip stream is cut short")
            rest, at = data[at:at + GZIP_READ_CHUNK], at + GZIP_READ_CHUNK
        document += member.decompress(rest, limit + 1 - len(document))
        if len(document) > limit:
            return None
        if not member.eof:
            rest = member.unconsumed_tail
            continue
        rest = member.unused_data
        if not rest and at < len(data):
            rest, at = data[at:at + GZIP_READ_CHUNK], at + GZIP_READ_CHUNK
        if not rest or rest[0] == 0:
            return bytes(document)
        member = zlib.decompressobj(16 + zlib.MAX_WBITS)


def _gzip(name: str, data: bytes) -> dict:
    """A gzip file's view: its document's, decompressed within an archive entry's size and ratio limits and read by
    the rules a file's follow; a database inside is not read."""
    compressed = {"format": None, "compression": "gzip", "view": None}
    try:
        document = _gunzip(data, min(MAX_ZIP_ENTRY_BYTES, MAX_ZIP_RATIO * len(data)))
    except (zlib.error, EOFError):
        return {**compressed, "error": "not a readable gzip stream"}
    if document is None:
        return {**compressed, "error": f"expands more than {MAX_ZIP_RATIO} times, so it is not read"
                if MAX_ZIP_RATIO * len(data) < MAX_ZIP_ENTRY_BYTES
                else f"larger than the {_view_byte_limit(MAX_ZIP_ENTRY_BYTES)} a compressed document's view reads"}
    for header, form, inside in NOT_READ_INSIDE:
        if document.startswith(header):
            return {**compressed, "format": form, "error": f"{inside} inside a gzip file is not read"}
    view = _zip(io.BytesIO(document), len(document)) if _is_zip(document) else _bytes_view(name, document)
    return {**view, "compression": "gzip"}
`;
	})))();
}

//#endregion
//#region dist/domain/desktop/appExportPython.js
var PYTHON_READY_CHECK, PYTHON_IMPORTS, PYTHON_XML_ELEMENT_OPENING, PYTHON_HELPER_BODY, renderPythonHelpers, PYTHON_HELPERS, PYTHON_CONSTANTS, boundNames, PYTHON_MODULE_NAMES, ownlessBody, PYTHON_WITHHELD_DATA_HOOKS, PYTHON_DATA_HOOKS;
function init_appExportPython() {
	return (init_appExportPython = __esmMin((() => {
		init_zipEndOfCentralDirectory();
		init_zipPackageFormat();
		init_xmlDocument();
		init_desktopViewPolicy();
		init_appExportPythonJson();
		init_appExportPythonXml();
		init_appExportPythonZip();
		init_desktopTextSyntax();
		init_x11Windows();
		PYTHON_READY_CHECK = `
    @ready_check
    def main_window_shown(self) -> bool:
        """A window of the app's class that the taskbar lists is shown, not only a splash screen or a dialog."""
        return _taskbar_window(WINDOW_CLASS)
`;
		PYTHON_IMPORTS = `from __future__ import annotations

from array import array
import binascii
import contextlib
import copy
import hashlib
import io
import json
import math
import os
import errno
import re
import sqlite3
import struct
import subprocess
import sys
import tempfile
import zipfile
import zlib
from pathlib import Path
from xml.parsers import expat

from agentenv_protocol import add_data, get_data, reset_data
from agentenv_protocol.computer import AptSource, ComputerAppEnvironment, Download, Launch, Packages, Ready, RunScript, computer_app, linux, ready_check
from agentenv_protocol.computer.app_data import INITIAL, add, get, in_thread, keep_initial, reset
from agentenv_protocol.computer.dataplane import file_parts
from agentenv_protocol.types import DataPart
`;
		PYTHON_XML_ELEMENT_OPENING = XML_ELEMENT_OPENING.replaceAll(/\\u\{([0-9a-f]+)\}/giu, (_, code) => `\\U${code.padStart(8, "0")}`);
		PYTHON_HELPER_BODY = String.raw`
XML_SUFFIXES = (".xml", ".xbel", ".plist", ".svg", ".ui")
XML_ELEMENT_OPENING = re.compile(r"${PYTHON_XML_ELEMENT_OPENING}")
def _opens_element(text: str) -> bool:
    """Whether text opens with an element, after a DOCTYPE with no internal subset or none. A '[' inside a quoted id is not a subset."""
    if XML_ELEMENT_OPENING.match(text):
        return True
    declared = re.match(r"(?:<\?xml[^>]*>\s*)?<!DOCTYPE\b", text)
    if declared is None:
        return False
    quote = ""
    for index in range(declared.end(), len(text)):
        character = text[index]
        if quote:
            if character == quote:
                quote = ""
            continue
        if character in ('"', "'"):
            quote = character
        elif character == "[":
            return False
        elif character == ">":
            return XML_ELEMENT_OPENING.match(text[index + 1:].lstrip()) is not None
    return False
KEYFILE_CONTROL_LINE = re.compile(${JSON.stringify(KEYFILE_CONTROL_LINE)})
KEYFILE_ENTRY_LINE = re.compile(${JSON.stringify(KEYFILE_ENTRY_LINE)})
LINE_BREAK = re.compile(${JSON.stringify(DESKTOP_LINE_BREAK)})
ECMASCRIPT_TRIM_CHARACTERS = ${PYTHON_ECMASCRIPT_TRIM_CHARACTERS}
SQLITE_HEADER = b"SQLite format 3\x00"
GVDB_HEADER = b"GVariant"
ZIP_SIGNATURES = (${ZIP_SIGNATURES.map((signature) => `bytes(${JSON.stringify(signature)})`).join(", ")})
ZIP_HEADER = ZIP_SIGNATURES[0]
ZIP_EOCD_BYTES = ${String(22)}
GZIP_HEADER = b"\x1f\x8b\x08"
XML_SPACE = "xml:space"
MAX_SAFE_INTEGER = 2**53 - 1
SQLITE_BUSY_S = 0.25
def _view_byte_limit(value: int) -> str:
    return f"{value // (1024 * 1024)} MiB" if value % (1024 * 1024) == 0 else f"{value} bytes"


PARSED_TOO_LARGE = f"larger than the {_view_byte_limit(MAX_PARSED_BYTES)} limit for JSON and key file views"
JSON_TOO_DEEP = f"nested deeper than the {MAX_JSON_VIEW_DEPTH} levels a JSON view keeps"


def _respelled(text: str, home: Path) -> str:
    """The seed's home path respelled to this computer's home, only where a whole path segment ends after it."""
    return re.sub(re.escape(SEED_HOME) + r"(?![\w.@+~-])", lambda _: str(home), text)


UTF16_CODECS = {b"\xff\xfe": "utf-16-le", b"\xfe\xff": "utf-16-be"}


def _respelled_utf16(data: bytes, home: Path) -> bytes:
    """A UTF-16 text file with a byte-order mark respelled like a text seed, its mark kept; any other bytes as given."""
    mark = data[:2]
    codec = UTF16_CODECS.get(mark)
    if codec is None:
        return data
    try:
        text = data[2:].decode(codec)
    except UnicodeDecodeError:
        return data
    return mark + _respelled(text, home).encode(codec) if SEED_HOME in text else data


${PYTHON_X11_PROPERTIES}


def _taskbar_window(window_class: str) -> bool:
    """Whether a top-level window of the given class that the taskbar lists is shown; a splash screen or a dialog
    skips the taskbar."""
    def xprop(*args: str) -> str:
        done = subprocess.run(["xprop", *args], capture_output=True, text=True)
        return done.stdout if done.returncode == 0 else ""

    root = _x11_properties(xprop("-root", "_NET_CLIENT_LIST"))
    for window in _x11_client_ids(root):
        props = _x11_properties(xprop("-id", window, "WM_CLASS", "_NET_WM_STATE", "_NET_WM_WINDOW_TYPE"))
        if _x11_window_class(props) != window_class:
            continue
        states = [atom.strip(ECMASCRIPT_TRIM_CHARACTERS) for atom in props.get("_NET_WM_STATE", "").split(",")]
        types = [atom.strip(ECMASCRIPT_TRIM_CHARACTERS) for atom in props.get("_NET_WM_WINDOW_TYPE", "").split(",")]
        if "_NET_WM_STATE_SKIP_TASKBAR" not in states and "_NET_WM_WINDOW_TYPE_SPLASH" not in types:
            return True
    return False


def _seed_home(home: Path) -> None:
    """Copy the captured files into this computer's home; text files, UTF-16 ones too, have the seed's home path
    respelled."""
    seed = HERE / "seed"
    for source in sorted(seed.rglob("*")) if seed.is_dir() else []:
        if not source.is_file():
            continue
        relative = source.relative_to(seed).as_posix()
        target = home / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        data = source.read_bytes()
        if data[:2] in UTF16_CODECS:
            data = _respelled_utf16(data, home)
        elif relative in TEXT_SEEDS:
            data = _respelled(data.decode("utf-8"), home).encode("utf-8")
        target.write_bytes(data)
        mode = SEED_MODES.get(relative)
        if mode is not None:
            target.chmod(mode)


def _ensure_state_aliases(home: Path) -> None:
    """Restore selected aliases without replacing any existing user data."""
    aliases = sorted(STATE_ALIASES, key=lambda pair: len(Path(pair[0]).parts))
    for alias, target, kind in aliases:
        link = home / alias
        destination = home / target
        # A recorded directory is created. A legacy alias with no kind is
        # created only when another alias is inside it, which proves it is a
        # directory. A legacy leaf stays unclassified so a missing file is not
        # turned into a directory.
        has_children = any(Path(alias) in Path(child).parents for child, *_ in aliases)
        if kind == "directory" or (kind == "unknown" and has_children):
            destination.mkdir(parents=True, exist_ok=True)
        elif kind == "file":
            # The file itself stays absent so the app can create it. Its parent
            # has to exist or that write fails with ENOENT.
            destination.parent.mkdir(parents=True, exist_ok=True)
        if link.is_symlink() and link.resolve() == destination.resolve():
            continue
        if os.path.lexists(link):
            raise FileExistsError(f"Cannot restore selected state alias; path already exists: {link}")
        link.parent.mkdir(parents=True, exist_ok=True)
        link.symlink_to(destination)


def _dconf(arguments: list, environment: dict) -> str:
    child_environment = {**os.environ, **environment}
    refusal = None
    missing = None
    for directory in os.get_exec_path(child_environment):
        command = os.path.join(directory, "dconf")
        if not os.path.isabs(command):
            command = os.path.join(os.getcwd(), command)
        try:
            child = subprocess.Popen([command, *arguments], env=child_environment,
                                     stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        except OSError as error:
            # Popen identifies an exec failure with the executable filename;
            # parent capacity, pipe setup and cwd failures are not PATH misses.
            if error.filename != command:
                raise
            # Match Python's executable search: retain the first non-missing
            # spawn error, but never retry a child that actually started.
            if error.errno in (errno.ENOENT, errno.ENOTDIR):
                missing = error
            elif refusal is None:
                refusal = error
            continue
        break
    else:
        if refusal is not None:
            raise refusal
        if missing is not None:
            raise missing
        raise FileNotFoundError(errno.ENOENT, "dconf is not installed (dconf-cli)", "dconf")
    with child:
        try:
            stdout, stderr = child.communicate()
        except BaseException:
            child.kill()
            raise
        result = subprocess.CompletedProcess(child.args, child.returncode, stdout, stderr)
        result.check_returncode()
        return result.stdout


def _load_dconf(home: Path) -> None:
    """Compile the captured dconf keys into the user database without D-Bus, which is not up yet. Keys already there
    stay unless captured: dconf compile reads the key files in name order and a later file wins. A failure is
    reported and the app starts without them."""
    if not DCONF:
        return
    database = home / ".config" / "dconf" / "user"
    try:
        database.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(dir=database.parent) as scratch:
            keyfiles = Path(scratch, "keyfiles")
            keyfiles.mkdir()
            if database.is_file():
                profile = Path(scratch, "profile")
                with database.open("rb") as source:
                    # Parent ownership survives wrappers replacing stdin or closing child fds.
                    source_path = f"/proc/{os.getpid()}/fd/{source.fileno()}"
                    # Missing descriptor paths must not become a successful empty dump.
                    os.stat(source_path)
                    profile.write_text(f"file-db:{source_path}\n")
                    existing = _dconf(["dump", "/"], {"DCONF_PROFILE": str(profile.resolve())})
                (keyfiles / "00-existing").write_text(existing)
            (keyfiles / "01-captured").write_text(_respelled(DCONF, home))
            _dconf(["compile", str(Path(scratch, "user")), str(keyfiles)], {})
            os.replace(Path(scratch, "user"), database)
    except (OSError, subprocess.CalledProcessError) as error:
        detail = (getattr(error, "stderr", None) or "").strip().splitlines()
        print(f"warning: the captured dconf settings were not loaded: {detail[-1] if detail else error}",
              file=sys.stderr)


def _sqlite_text(data: bytes, encoding: str):
    text = data.decode(encoding, "replace")
    return {"text": text, "bytes_hex": data.hex()} if "�" in text else text


def _cell(value, encoding: str):
    if isinstance(value, str):
        data = bytes.fromhex(value[1:])
        return _sqlite_text(data, encoding) if value[0] == "t" else {"blob_hex": data.hex()}
    if isinstance(value, int) and abs(value) > MAX_SAFE_INTEGER:
        return {"integer": str(value)}
    # Keep JSON's missing REAL values distinct from literal TEXT spellings.
    if isinstance(value, float) and (math.isinf(value) or (value == 0 and math.copysign(1, value) < 0)):
        return {"real": "Infinity" if value == math.inf else "-Infinity" if value == -math.inf else "-0"}
    return value


def _view_json_bytes(value, budget: int) -> int:
    """Size the table/row JSON shapes without quoting a whole large cell.

    Above budget the count establishes overflow only. Numeric spelling follows
    Python's compact JSON encoder, rather than assuming JavaScript's spelling.
    """
    if isinstance(value, str):
        total = 2
        for offset in range(0, len(value), 8192):
            if total > budget:
                break
            # Public JSON quoting preserves escapes; remove each chunk's two
            # quotes. A control-filled native cell never becomes one huge part.
            total += len(json.dumps(value[offset:offset + 8192], ensure_ascii=False).encode("utf-8")) - 2
        return total
    if isinstance(value, list):
        total = 2 + max(0, len(value) - 1)
        for member in value:
            if total > budget:
                break
            total += _view_json_bytes(member, budget - total)
        return total
    if isinstance(value, dict):
        total = 2 + max(0, len(value) - 1)
        for key, member in value.items():
            if total > budget:
                break
            total += _view_json_bytes(key, budget - total) + 1
            if total <= budget:
                total += _view_json_bytes(member, budget - total)
        return total
    return len(json.dumps(value, ensure_ascii=False, separators=(",", ":")).encode("utf-8"))


def _table(db, name: str, primary_key: list, encoding: str) -> dict:
    quoted = '"' + name.replace('"', '""') + '"'
    columns = [column[0] for column in db.execute(f"select * from main.{quoted} limit 0").description]
    # SQLite owns TEXT-to-BLOB conversion, so hex retains the database's original encoding.
    projected = []
    for name in columns:
        column = '"' + name.replace('"', '""') + '"'
        projected.append(f"CASE typeof({column}) WHEN 'text' THEN 't' || hex(CAST({column} AS BLOB)) "
                         f"WHEN 'blob' THEN 'b' || hex({column}) ELSE {column} END")
    cursor = db.execute(f"select {', '.join(projected)} from main.{quoted} not indexed limit {MAX_ROWS + 1}")
    view = {"columns": columns, "primary_key": primary_key, "rows": [], "truncated": True}
    spent = _view_json_bytes(view, MAX_SQLITE_VIEW_BYTES)
    if spent > MAX_SQLITE_VIEW_BYTES:
        return {"error": SQLITE_VIEW_TOO_LARGE}
    for index, row in enumerate(cursor):
        if index == MAX_ROWS:
            break
        projected = [_cell(value, encoding) for value in row]
        spent += (1 if view["rows"] else 0) + _view_json_bytes(projected, MAX_SQLITE_VIEW_BYTES - spent)
        if spent > MAX_SQLITE_VIEW_BYTES:
            return {"error": SQLITE_VIEW_TOO_LARGE}
        view["rows"].append(projected)
    else:
        view["truncated"] = False
        # JSON false takes one byte more than true, reserved only when known.
        spent += 1
    return {"error": SQLITE_VIEW_TOO_LARGE} if spent > MAX_SQLITE_VIEW_BYTES else view


def _sqlite(path: Path) -> dict:
    """The database's ordinary tables, in schema order, up to REA's table and row limits."""
    with contextlib.closing(sqlite3.connect(path.resolve().as_uri() + "?mode=ro", uri=True, timeout=SQLITE_BUSY_S)) as db:
        # Match the independent native value/record boundary before SQL hex
        # expansion; the selected projected-view allowance is separate.
        db.setlimit(sqlite3.SQLITE_LIMIT_LENGTH, SQLITE_VALUE_BYTES)
        kinds = dict(db.execute("select name, type from temp.pragma_table_list where schema = 'main'"))
        names = [name for (name,) in db.execute("select name from sqlite_schema where type = 'table'")
                 if kinds.get(name) == "table"]
        keys = {name: [key for (key,) in db.execute(
            "select name from temp.pragma_table_info(?, 'main') where pk > 0 order by pk", (name,))]
            for name in names[:MAX_TABLES]}
        encoding = {"UTF-8": "utf-8", "UTF-16le": "utf-16-le", "UTF-16be": "utf-16-be"}[
            db.execute("PRAGMA encoding").fetchone()[0]]
        tables = {}
        for name in names[:MAX_TABLES]:
            try:
                tables[name] = _table(db, name, keys[name], encoding)
            except sqlite3.Error as error:
                reason = str(error)
                if getattr(error, "sqlite_errorcode", None) == sqlite3.SQLITE_TOOBIG:
                    reason += (f". SQLite value/record exceeds the fixed {SQLITE_VALUE_BYTES}-byte native limit, including SQL hex expansion. "
                               "Increasing sqlite_view_bytes does not raise this boundary. Keep the complete database; "
                               "use a narrower REA SQLite table/column projection only if it preserves the required facts, "
                               "or use a format-specific reader.")
                tables[name] = {"error": reason}
    cut = len(names) > MAX_TABLES
    return {"format": "sqlite", "view": {"tables": tables, "tables_truncated": cut},
            "truncated": cut or any(table.get("truncated", "error" in table) for table in tables.values())}


def _text(text: str) -> dict:
    lines = LINE_BREAK.split(text)
    if lines[-1] == "":
        lines.pop()
    view = {"lines": lines[:MAX_LINES], "line_count": len(lines), "truncated": len(lines) > MAX_LINES}
    return {"format": "text", "view": view, "truncated": view["truncated"]}


def _keyfile_line(raw: str) -> tuple:
    """A key file line as REA reads it: skip (blank or comment), group, entry or other."""
    control = KEYFILE_CONTROL_LINE.fullmatch(raw.strip(ECMASCRIPT_TRIM_CHARACTERS))
    if control is not None:
        name = control.group(1)
        return ("skip",) if name is None else ("group", name)
    entry = KEYFILE_ENTRY_LINE.fullmatch(raw)
    if entry is not None:
        key = entry.group(1).strip(ECMASCRIPT_TRIM_CHARACTERS)
        if key:
            return ("entry", key, entry.group(2))
    return ("other",)


def _each_line(text: str):
    """Each line of text as REA splits them, one at a time."""
    start = 0
    for line_break in LINE_BREAK.finditer(text):
        yield text[start:line_break.start()]
        start = line_break.end()
    yield text[start:]


def _is_keyfile(text: str) -> bool:
    """REA's rule: at least one group, and nothing a key file view would drop. Lines are read one at a time, stopping
    at the first it would drop."""
    group = False
    for line in _each_line(text):
        kind = _keyfile_line(line)[0]
        if kind == "other":
            return False
        group = group or kind == "group"
    return group


def _keyfile(text: str) -> dict:
    groups, group = {}, ""
    for line in map(_keyfile_line, _each_line(text)):
        if line[0] == "group":
            group = line[1]
            groups.setdefault(group, {})
        elif line[0] == "entry":
            groups.setdefault(group, {})[line[1]] = line[2]
    return groups


${PYTHON_XML_READER}

${PYTHON_JSON_READER}

def _text_view(name: str, text: str, size: int) -> dict:
    """The format REA's state view detects for decoded text of size bytes, and its view; a JSON or key file over the
    parsed-view limit is refused before its value is built."""
    trimmed = text.lstrip(ECMASCRIPT_TRIM_CHARACTERS)
    if name.lower().endswith(".json") or trimmed[:1] in ("[", "{"):
        view = _json_view(text, size)
        if view is not None:
            return view
    lowered = name.lower()
    # Text that opens with an element, after a DOCTYPE with no internal subset or none, is XML if it parses, whatever
    # the file is called, as a Freeplane map or KmPlot's <!DOCTYPE kmpdoc> plot.
    if lowered.endswith(XML_SUFFIXES) or trimmed.startswith("<?xml") or _opens_element(trimmed):
        view = _xml_view(text)
        return _text(text) if view is None else {"format": "xml", "view": view, "truncated": view["truncated"]}
    if _is_keyfile(text):
        if size > MAX_PARSED_BYTES:
            return {"format": "keyfile", "view": None, "error": PARSED_TOO_LARGE}
        return {"format": "keyfile", "view": {"groups": _keyfile(text)}, "truncated": False}
    return _text(text)


def _bytes_view(name: str, data: bytes) -> dict:
    """The view of a document that is no database or archive: its text's, or none when it is binary."""
    try:
        codec = UTF16_CODECS.get(bytes(data[:2]))
        if codec is not None:
            text = data[2:].decode(codec)
        else:
            text = data.decode("utf-8-sig") if b"\x00" not in data[:8192] else None
    except UnicodeDecodeError:
        text = None
    if text is None or (codec is not None and "\x00" in text):
        return {"format": "binary", "view": None, "truncated": False}
    return _text_view(name, text, len(data))


def _is_zip(data: bytes) -> bool:
    """Recognize storage signatures before the directory reader checks validity."""
    return data.startswith(ZIP_HEADER) or (len(data) >= ZIP_EOCD_BYTES and data.startswith(ZIP_SIGNATURES))


def _view(path: Path) -> dict:
    """A typed JSON view of one file in the shapes of REA's state view; truncated says the view is partial."""
    too_large = {"format": None, "view": None, "error": VIEW_TOO_LARGE}
    if path.stat().st_size > MAX_VIEW_BYTES:
        return too_large
    with path.open("rb") as file:
        data = file.read(min(8192, MAX_VIEW_BYTES + 1))
        if len(data) > MAX_VIEW_BYTES:
            return too_large
        whole = (data.startswith(GZIP_HEADER) or data[:2] in UTF16_CODECS
                 or (not data.startswith(SQLITE_HEADER) and b"\x00" not in data))
        remaining = MAX_VIEW_BYTES + 1 - len(data)
        if whole and remaining > 0:
            data += file.read(remaining)
    if len(data) > MAX_VIEW_BYTES:
        return too_large
    if data.startswith(SQLITE_HEADER):
        return _sqlite(path)
    if _is_zip(data):
        with path.open("rb") as file:
            return _zip(file, os.fstat(file.fileno()).st_size)
    if data.startswith(GZIP_HEADER):
        return _gzip(path.name, data)
    return _bytes_view(path.name, data)


def _write_withheld(home: Path, settings, withheld: dict) -> None:
    """Write each withheld file from its secret setting, its bytes in base64, readable by its owner alone."""
    for name, relative in withheld.items():
        target = home / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(binascii.a2b_base64(getattr(settings, name).get_secret_value(), strict_mode=True))
        target.chmod(0o600)


def _views(home: Path, paths: list, leaving_out=()) -> dict:
    """A view of every file under the app's paths but those it leaves out, keyed by its home-relative path."""
    files = {}
    for owned in paths:
        root = home / owned
        candidates = [root] if root.is_file() else sorted(root.rglob("*")) if root.is_dir() else []
        for path in candidates:
            if path.is_file() and not path.is_symlink():
                key = path.relative_to(home).as_posix()
                if key in leaving_out:
                    continue
                try:
                    files[key] = _view(path)
                except (OSError, ValueError, sqlite3.Error, RecursionError) as error:
                    files[key] = {"format": None, "view": None, "error": str(error)}
    return files
`.concat(PYTHON_ZIP_HELPERS);
		renderPythonHelpers = (policy) => `\n${pythonDesktopViewPolicy(policy)}\n${PYTHON_HELPER_BODY}`;
		PYTHON_HELPERS = renderPythonHelpers(DESKTOP_VIEW_DEFAULTS);
		PYTHON_CONSTANTS = [
			"HERE",
			"SEED_HOME",
			"PATHS",
			"DCONF",
			"TEXT_SEEDS",
			"SEED_MODES",
			"STATE_ALIASES",
			"WINDOW_CLASS",
			"WITHHELD"
		];
		boundNames = (source) => [...[...source.matchAll(/^(?:from \S+ )?import (?<names>.+)$/gmu)].flatMap((match) => (match.groups?.names ?? "").split(",").map((name) => name.trim().split(/\s+as\s+/u).at(-1) ?? "").map((name) => name.split(".")[0] ?? "")), ...[...source.matchAll(/^(?:def |class )?(?<name>[A-Za-z_]\w*)(?: =|\()/gmu)].map((match) => match.groups?.name ?? "")];
		PYTHON_MODULE_NAMES = new Set([
			...boundNames(PYTHON_IMPORTS),
			...boundNames(PYTHON_HELPERS),
			...PYTHON_CONSTANTS
		]);
		ownlessBody = (title, dconf, relaunch, aliases = false) => {
			const reset = relaunch ? `
    @reset_data
    async def relaunch(self) -> None:
        """Nothing to restore: the app is stopped before this and relaunched after it, back to its first screen."""
` : "";
			const serves = relaunch ? "and keeps its task's state on screen, so its reset only relaunches it" : "so it serves no data operations";
			const restore = aliases ? "\n        _ensure_state_aliases(Path.home())" : "";
			if (dconf) return `    """${title}, launched at boot with its captured settings. It owns no files, ${serves}."""

    def __init__(self) -> None:
        super().__init__()
        _load_dconf(Path.home())${restore}
${reset}${PYTHON_READY_CHECK}`;
			if (!aliases) return `    """${title}, launched at boot. No state was observed, ${serves}."""\n${reset}${PYTHON_READY_CHECK}`;
			return `    """${title}, launched at boot. No state was observed, ${serves}."""

    def __init__(self) -> None:
        super().__init__()
        _ensure_state_aliases(Path.home())
${reset}${PYTHON_READY_CHECK}`;
		};
		PYTHON_WITHHELD_DATA_HOOKS = `
    @add_data
    async def add_files(self, parts: list) -> None:
        await add(parts, self.paths)

    @get_data
    async def get_files(self, write_namespace=None) -> list:
        files = await file_parts(Path.home(), self.paths, write_namespace, list(WITHHELD.values()))
        views = await in_thread(_views, Path.home(), self.paths, list(WITHHELD.values()))
        return [*files, DataPart(data={"state": views})]

    @reset_data
    async def reset_files(self) -> None:
        await reset(self.paths)
`;
		PYTHON_DATA_HOOKS = `
    @add_data
    async def add_files(self, parts: list) -> None:
        await add(parts, self.paths)

    @get_data
    async def get_files(self, write_namespace=None) -> list:
        files = await get(self.paths, write_namespace)
        views = await in_thread(_views, Path.home(), self.paths)
        return [*files, DataPart(data={"state": views})]

    @reset_data
    async def reset_files(self) -> None:
        await reset(self.paths)
`;
	})))();
}

//#endregion
//#region dist/domain/desktop/shellQuote.js
var shellQuote;
function init_shellQuote() {
	return (init_shellQuote = __esmMin((() => {
		shellQuote = (value) => `'${value.replaceAll("'", `'"'"'`)}'`;
	})))();
}

//#endregion
//#region dist/domain/desktop/appExportWithheld.js
var homeList$1, withheldToml, withheldSettingsClass, withheldNotes;
function init_appExportWithheld() {
	return (init_appExportWithheld = __esmMin((() => {
		init_shellQuote();
		homeList$1 = (paths) => paths.map((path) => `\`~/${path}\``).join(", ");
		withheldToml = (withheld) => withheld.length === 0 ? [] : [
			"",
			"[settings]",
			...withheld.map(({ setting, variable }) => `${setting} = ${JSON.stringify(`env:${variable}`)}`)
		];
		withheldSettingsClass = (withheld) => withheld.length === 0 ? "" : `
    #: Files withheld from the seed as sign-in or licence state, each its bytes in base64, from the environment.
    Settings = create_model("Settings", __base__=ComputerAppEnvironment.Settings, ${withheld.map(({ setting }) => `${setting}=(SecretStr, ...)`).join(", ")})
`;
		withheldNotes = ({ withheld = [], consentedFiles = [] }) => [...withheld.length === 0 ? [] : [`\n- Withheld from the seed as sign-in or licence state: ${homeList$1(withheld.map(({ file }) => file))}. A deploy refuses to
  start until each is in its environment variable as the file's bytes in base64, taken from your own signed-in copy of
  the app; the computer writes it into its home before the app first starts, and \`data/get\` never serves it:${withheld.map(({ file, variable }) => `\n\n      export ${variable}="$(base64 -w0 < "$HOME"/${shellQuote(file)})"`).join("")}\n`], ...consentedFiles.length === 0 ? [] : [`\n- Seeded with the person's consent, as \`consent.json\` records, though it is sign-in or licence state:
  ${homeList$1(consentedFiles)}. Keep this bundle to those the person allowed.`]].join("");
	})))();
}

//#endregion
//#region dist/domain/desktop/hostIdentity.js
var SEED_HOME, SEED_HOST, SEED_LOGIN, REPLACEMENTS, WORD, HOME_END, HOST_END, escaped, homeOf, loginOf, hostOf, identitySpellings, identityPattern, scrubHostIdentity, identityLeftIn;
function init_hostIdentity() {
	return (init_hostIdentity = __esmMin((() => {
		SEED_HOME = "/home/user";
		SEED_HOST = "localhost";
		SEED_LOGIN = `user@${SEED_HOST}`;
		REPLACEMENTS = [
			SEED_LOGIN,
			SEED_HOME,
			SEED_HOST
		];
		WORD = String.raw`\p{L}\p{N}_`;
		HOME_END = String.raw`(?![${WORD}.@+~-])`;
		HOST_END = String.raw`(?![${WORD}-]|\.[${WORD}])`;
		escaped = (text) => text.replace(/[\\^$.*+?()[\]{}|/]/gu, "\\$&");
		homeOf = ({ home }) => home.length > 1 && home !== "/home/user" ? home : undefined;
		loginOf = ({ hostname, user }) => hostname === null || user === null || `${user}@${hostname}` === SEED_LOGIN ? undefined : `${user}@${hostname}`;
		hostOf = ({ hostname }) => hostname === null || hostname === SEED_HOST ? undefined : hostname;
		identitySpellings = (identity) => [
			homeOf(identity),
			loginOf(identity),
			hostOf(identity)
		].filter((spelling) => spelling !== undefined);
		identityPattern = (identity) => {
			const home = homeOf(identity);
			const login = loginOf(identity);
			const host = hostOf(identity);
			const alternatives = [
				...home === undefined ? [] : [`(?<home>${escaped(home)})${HOME_END}`],
				...login === undefined ? [] : [`(?<![${WORD}.+-])(?<login>${escaped(login)})${HOST_END}`],
				...host === undefined ? [] : [`(?<![${WORD}.-])(?<host>${escaped(host)})${HOST_END}`]
			];
			return alternatives.length === 0 ? undefined : new RegExp(alternatives.join("|"), "gu");
		};
		scrubHostIdentity = (text, identity) => {
			const pattern = identityPattern(identity);
			return pattern === undefined ? text : text.replace(pattern, (...match) => {
				const groups = match.at(-1);
				if (groups.home !== undefined) return SEED_HOME;
				return groups.login === undefined ? SEED_HOST : SEED_LOGIN;
			});
		};
		identityLeftIn = (text, identity) => {
			const home = homeOf(identity);
			return identitySpellings(identity).find((spelling) => {
				const rest = REPLACEMENTS.filter((own) => own.includes(spelling)).reduce((remaining, own) => remaining.replaceAll(own, "\0"), text);
				return spelling === home ? new RegExp(`${escaped(home)}${HOME_END}`, "u").test(rest) : rest.includes(spelling);
			});
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/seedDocument.js
var capturedFileUrl, homePathOf, openSeedDocument;
function init_seedDocument() {
	return (init_seedDocument = __esmMin((() => {
		init_desktopEntry();
		capturedFileUrl = (value) => {
			if (!/^file:/iu.test(value)) return undefined;
			try {
				const url = new URL(value);
				if (url.protocol !== "file:") return undefined;
				const path = posix.normalize(fileURLToPath(url, { windows: false }));
				url.pathname = posix.normalize(url.pathname);
				return {
					url,
					path
				};
			} catch {
				return undefined;
			}
		};
		homePathOf = (argument, home, workingDirectory, known, knownSeed, mapOutside, mapTraversal) => {
			if (argument === "" || argument.startsWith("-")) return undefined;
			let input = argument;
			let parsedUrl;
			if (/^[A-Za-z][A-Za-z0-9+.-]*:/u.test(argument)) {
				const candidate = posix.resolve(workingDirectory, argument);
				if (candidate.startsWith(`${home}/`)) {
					const relative = candidate.slice(home.length + 1);
					if (known(relative)) return {
						homePath: relative,
						source: candidate,
						url: undefined
					};
				}
				const parsed = capturedFileUrl(argument);
				if (parsed === undefined) return undefined;
				input = parsed.path;
				parsedUrl = parsed.url;
			}
			if (parsedUrl === undefined && mapTraversal !== undefined) {
				const absolute = posix.isAbsolute(input);
				const raw = absolute ? input : `${workingDirectory}/${input}`;
				const replayed = mapTraversal(raw, absolute ? "explicit" : "inferred");
				if (replayed?.kind === "unobserved") return undefined;
				if (replayed?.kind === "mapped") return {
					seedPath: replayed.path,
					source: raw,
					url: undefined
				};
			}
			const path = posix.resolve(workingDirectory, input);
			if (path.startsWith(`${home}/`)) return {
				homePath: path.slice(home.length + 1),
				source: path,
				url: parsedUrl
			};
			const mapped = mapOutside?.(path);
			return mapped !== undefined && mapped !== null && knownSeed(mapped) ? {
				seedPath: mapped,
				source: path,
				url: parsedUrl
			} : undefined;
		};
		openSeedDocument = (argv, facts) => {
			const { home, exec, documents } = facts;
			const spelled = (path) => facts.spell?.(path) ?? path;
			const directoryMoved = facts.launchDirectory !== undefined && facts.launchDirectory !== facts.workingDirectory;
			const none = (reason) => ({
				argv: argvSpelled,
				opens: {
					kind: "none",
					reason
				}
			});
			const isCapturedSeed = (path) => facts.isDocument(path) || facts.isCaptured?.(path) === true;
			const namesCaptured = (path) => {
				const seedPath = spelled(path);
				return isCapturedSeed(path) || isCapturedSeed(seedPath);
			};
			const absoluteSeed = (path) => {
				if (!namesCaptured(path)) return undefined;
				const seedPath = spelled(path);
				return seedPath === path && !directoryMoved ? undefined : `${home}/${seedPath}`;
			};
			const retargetValue = (value) => {
				const parsed = homePathOf(value, home, facts.workingDirectory, namesCaptured, isCapturedSeed, facts.mapOutside, facts.mapTraversal);
				if (parsed === undefined) return value;
				const absolute = "seedPath" in parsed ? parsed.seedPath === "" ? home : `${home}/${parsed.seedPath}` : absoluteSeed(parsed.homePath);
				if (absolute === undefined) return value;
				if (parsed.url === undefined) return absolute;
				const encoded = pathToFileURL(absolute, { windows: false }).pathname.split("/");
				const original = posix.normalize(parsed.url.pathname).split("/");
				const oldParts = parsed.source.split("/");
				const newParts = absolute.split("/");
				let first = 0;
				while (first < oldParts.length && oldParts[first] === newParts[first]) {
					encoded[first] = original[first] ?? encoded[first];
					first += 1;
				}
				let oldEnd = oldParts.length - 1;
				let newEnd = newParts.length - 1;
				while (oldEnd >= first && newEnd >= first && oldParts[oldEnd] === newParts[newEnd]) {
					encoded[newEnd] = original[oldEnd] ?? encoded[newEnd];
					oldEnd -= 1;
					newEnd -= 1;
				}
				const prefix = /^file:(?:\/\/(?:localhost)?)?/iu.exec(value)?.[0] ?? "file://";
				const suffix = /[?#].*$/su.exec(value)?.[0] ?? "";
				return `${prefix}${encoded.join("/")}${suffix}`;
			};
			const retarget = (argument) => {
				const equals = argument.indexOf("=");
				if (argument.startsWith("-") && equals > 0) {
					const value = argument.slice(equals + 1);
					return `${argument.slice(0, equals + 1)}${retargetValue(value)}`;
				}
				return retargetValue(argument);
			};
			const command = unwrapDesktopCommand(argv);
			const firstArgument = command.argumentIndex;
			const retargetEnvValue = (argument) => {
				if (!/^[A-Za-z_][A-Za-z0-9_]*=/u.test(argument)) return argument;
				const split = argument.indexOf("=");
				const value = argument.slice(split + 1);
				return `${argument.slice(0, split + 1)}${retargetValue(value)}`;
			};
			const argvSpelled = argv.map((argument, index) => {
				if (index === 0 || command.kind === "direct" && index === command.index) return argument;
				return index < firstArgument ? retargetEnvValue(argument) : retarget(argument);
			});
			const named = argv.slice(firstArgument).map((argument) => {
				const equals = argument.indexOf("=");
				const value = argument.startsWith("-") && equals > 0 ? argument.slice(equals + 1) : argument;
				return homePathOf(value, home, facts.workingDirectory, namesCaptured, isCapturedSeed, facts.mapOutside, facts.mapTraversal);
			}).map((path) => path === undefined ? undefined : "seedPath" in path ? path.seedPath : spelled(path.homePath));
			if (named.some((path) => path !== undefined && facts.isDocument(path))) return {
				argv: argvSpelled,
				opens: { kind: "captured" }
			};
			const [document] = documents;
			if (document === undefined) return {
				argv: argvSpelled,
				opens: { kind: "empty" }
			};
			if (documents.length > 1) return none(`the seed holds ${String(documents.length)} documents (${documents.map((path) => `~/${path}`).join(", ")}) and the app opens one only when it holds exactly one`);
			if (exec === null) return none("the capture launched the program without a desktop entry, so whether it takes a file is unknown");
			if (!execTakesFiles(exec)) return none("its desktop entry's Exec takes no file (no %f, %F, %u or %U field code)");
			return {
				argv: [...argvSpelled, `${home}/${document}`],
				opens: {
					kind: "seed",
					document
				}
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appExport.js
var DESKTOP_EXPORT_FRAMEWORK_VERSION, REVERSE_DNS, TRAILING_VERSION, environmentName, TAKEN_NAMES, className, appModuleFile, SHARED_FOLDERS, ownedPaths, replaySegments, portableRelative, capturedHomePlan, capturedStateAliases, stateFilesByHomePath, exportedStateFiles, docText, launchCommand, py, pyList, renderEnvToml, classBody, aptPackages, aptSources, packageFileInstall, renderInstallScript, seedWording, renderAppClass, renderSkill, NO_LAUNCH_DOCUMENT, launchDocumentLimitation, launchDocumentNote, homeList, bundleList, scrubNotes, renderReadme, renderSmokeTask;
function init_appExport() {
	return (init_appExport = __esmMin((() => {
		init_desktopViewPolicy();
		init_appExportInstall();
		init_appExportInstallText();
		init_appExportPython();
		init_appExportWithheld();
		init_appExportUnowned();
		init_desktopStateDiff();
		init_stateFormats();
		init_hostIdentity();
		init_seedDocument();
		init_stateRoles();
		init_shellQuote();
		DESKTOP_EXPORT_FRAMEWORK_VERSION = "0.9.1485";
		REVERSE_DNS = /^[a-z][\w-]*(?:\.[a-z][\w-]*)+\.([^.]+)$/iu;
		TRAILING_VERSION = /(?<=.)[-_]\d+(?:\.\d+)*$/u;
		environmentName = (source, accepted) => {
			const name = (REVERSE_DNS.exec(source)?.[1] ?? source.replace(TRAILING_VERSION, "")).toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-+/u, "").slice(0, 48).replace(/-+$/u, "") || "app";
			return accepted(name) ? name : `app-${name}`;
		};
		TAKEN_NAMES = new Set([
			"None",
			"True",
			"False",
			...PYTHON_MODULE_NAMES
		]);
		className = (name) => {
			const candidate = name.split("-").map((part) => part.length === 0 ? "" : `${part[0]?.toUpperCase()}${part.slice(1)}`).join("").replace(/^(?=\d)/u, "App") || "App";
			return TAKEN_NAMES.has(candidate) ? `${candidate}App` : candidate;
		};
		appModuleFile = (name) => `${name.replaceAll("-", "_")}_app.py`;
		SHARED_FOLDERS = new Set([
			"",
			".config",
			".local",
			".local/share",
			".local/state",
			".cache"
		]);
		ownedPaths = (stateFiles, documents, stateDirectories) => {
			const folders = new Set();
			const owner = (file, folder) => SHARED_FOLDERS.has(folder) ? file : folder;
			const folderOf = (file) => file.split("/").slice(0, -1).join("/");
			for (const file of stateFiles) folders.add(owner(file, stateDirectoryOf(file, stateDirectories) ?? folderOf(file)));
			for (const file of documents) folders.add(owner(file, folderOf(file)));
			const sorted = [...folders].filter((folder) => folder.length > 0).sort();
			return sorted.filter((folder) => !sorted.some((other) => other !== folder && isWithinAny(folder, [other])));
		};
		replaySegments = (path) => path.split("/").filter((part) => part !== "" && part !== ".");
		portableRelative = (path) => {
			const parts = replaySegments(path);
			return parts.includes("..") ? null : parts.join("/");
		};
		capturedHomePlan = (capture) => {
			const { home } = capture.host;
			const relative = (path) => path === home ? "" : path.startsWith(`${home}/`) ? path.slice(home.length + 1) : null;
			const portable = (path) => {
				const name = relative(path);
				return name === null ? null : portableRelative(name);
			};
			const replayName = (logical, physical) => portable(logical) ?? (relative(logical) === null ? null : portable(physical));
			const logical = capture.application.state_directories;
			const walked = capture.state.state_directories ?? [];
			const renamed = (walked.length === logical.length ? walked : []).flatMap((physical, index) => {
				const path = logical[index]?.path;
				return path === undefined ? [] : [{
					physical,
					logical: path,
					target: replayName(path, physical)
				}];
			});
			const selections = [...capture.state.selected_paths ?? []];
			const stateTargets = new Map();
			for (const { physical, target } of renamed) if (target !== null && !stateTargets.has(physical)) stateTargets.set(physical, target);
			const stateAliases = capturedStateAliases(selections, stateTargets, portable);
			const aliasPaths = [...stateAliases].sort((left, right) => right.alias.length - left.alias.length);
			const selectedSpelling = (path) => {
				for (const { alias, target } of aliasPaths) {
					if (isWithinAny(path, [alias])) return `${target}${path.slice(alias.length)}`;
				}
				return path;
			};
			const recorded = [
				...capture.state.content_roots ?? [],
				...capture.state.state_directories ?? [],
				...logical.map((entry) => entry.path),
				...selections.flatMap(({ path, physical }) => [path, physical])
			];
			const directories = new Set();
			for (const selected of selections) if (selected.kind === "directory") {
				directories.add(selected.path);
				directories.add(selected.physical);
			}
			for (const checkpoint of capture.state.checkpoints ?? []) for (const change of checkpoint.changes) {
				const facts = change.after ?? change.before;
				if (facts?.type === "directory") directories.add(change.path);
			}
			const known = new Set(recorded);
			for (const path of known) {
				let parent = path;
				for (;;) {
					const slash = parent.lastIndexOf("/");
					if (slash <= 0) break;
					parent = parent.slice(0, slash);
					if (known.has(parent)) directories.add(parent);
				}
			}
			const isDirectory = (path) => directories.has(path);
			const spellings = [...renamed, ...selections.map(({ physical, path }) => {
				const target = replayName(path, physical);
				return {
					physical,
					logical: path,
					target: target === null ? null : selectedSpelling(target)
				};
			})].sort((left, right) => right.physical.length - left.physical.length);
			const spell = (path) => {
				for (const { physical, target } of spellings) {
					if (target === null || !isWithinAny(path, [physical])) continue;
					const suffix = portableRelative(path.slice(physical.length));
					if (suffix !== null) return {
						spelled: [target, suffix].filter(Boolean).join("/"),
						specificity: physical.length
					};
				}
				const plain = portable(path);
				return plain === null ? undefined : {
					spelled: plain,
					specificity: 0
				};
			};
			const homePath = (path) => {
				const own = spell(path);
				for (const { suffix } of SQLITE_SIDECARS) {
					if (!path.endsWith(suffix)) continue;
					const database = path.slice(0, -suffix.length);
					const base = spell(database);
					if (isDirectory(database) || base === undefined || base.specificity === 0 || own !== undefined && base.specificity <= own.specificity) continue;
					return `${base.spelled}${suffix}`;
				}
				return own?.spelled ?? null;
			};
			const traversed = spellings.flatMap(({ logical, physical, target }) => {
				const parts = replaySegments(logical);
				return parts.includes("..") && portableRelative(physical) !== null ? [{
					logical: parts.join("/"),
					physical,
					portable: target !== null
				}] : [];
			});
			const replayTree = (physical, retained) => {
				const mapped = homePath(physical);
				if (mapped === null) return null;
				for (const [file, seed] of retained) {
					if (!isWithinAny(file, [physical])) continue;
					const suffix = portableRelative(file.slice(physical.length));
					if (suffix === null || selectedSpelling([mapped, suffix].filter(Boolean).join("/")) !== seed) return null;
				}
				return mapped;
			};
			const agree = (paths) => paths.size === 0 ? undefined : paths.size === 1 ? paths.values().next().value ?? null : null;
			/**
			* Replay a path with parent traversal only when the capture establishes a
			* portable destination. Inferred arguments must name observed state before
			* its replay can fail. Undefined means no traversal match, while null means
			* the matched paths cannot share a replay location.
			*/
			const launchPath = (absolute, retained, inferredPathObserved) => {
				if (traversed.length === 0) return undefined;
				const parts = replaySegments(absolute);
				if (!parts.includes("..")) return undefined;
				const source = parts.join("/");
				const direct = new Set();
				const parents = new Set();
				let specificity = 0;
				for (const { logical, physical, portable } of traversed) {
					if (isWithinAny(source, [logical])) {
						const suffix = portableRelative(source.slice(logical.length));
						if (suffix === null || logical.length < specificity) continue;
						if (logical.length > specificity) direct.clear();
						specificity = logical.length;
						const file = suffix === "" ? physical : `${physical}/${suffix}`;
						if (inferredPathObserved !== undefined && !inferredPathObserved(file) && !recorded.some((path) => isWithinAny(path, [file]))) continue;
						direct.add(portable ? replayTree(file, retained) : null);
					} else if (isWithinAny(logical, [source])) {
						const suffix = logical.slice(source.length + 1);
						const target = portable ? replayTree(physical, retained) : null;
						parents.add(suffix === target ? "" : target?.endsWith(`/${suffix}`) === true ? target.slice(0, -(suffix.length + 1)) : null);
					}
				}
				if (specificity > 0 && direct.size === 0) return { kind: "unobserved" };
				const path = agree(specificity > 0 ? direct : parents);
				return typeof path === "string" ? {
					kind: "mapped",
					path
				} : path;
			};
			return {
				homePath,
				launchPath,
				stateAliases
			};
		};
		capturedStateAliases = (selections, stateTargets, portable) => {
			const aliases = selections.flatMap(({ path, physical, kind }) => {
				const alias = portable(path);
				const target = stateTargets.get(physical) ?? null;
				const recorded = kind === "directory" ? "directory" : kind === "file" ? "file" : "unknown";
				return alias === null || alias === "" || target === null || target === "" || alias === target ? [] : [{
					alias,
					target,
					kind: recorded
				}];
			});
			const retained = [];
			for (const entry of aliases.toSorted((left, right) => left.alias.length - right.alias.length)) {
				const parent = retained.findLast(({ alias }) => alias !== entry.alias && isWithinAny(entry.alias, [alias]));
				if (parent !== undefined && `${parent.target}${entry.alias.slice(parent.alias.length)}` === entry.target) continue;
				retained.push(entry);
			}
			return retained;
		};
		stateFilesByHomePath = (paths, homePath) => {
			const absent = (path) => path.versions[0]?.present === true ? 0 : 1;
			const files = new Map();
			const dconf = new Map();
			const collisions = [];
			for (const path of [...paths].sort((left, right) => absent(left) - absent(right))) {
				const home = homePath(path.path);
				if (home === null) continue;
				if (path.format === "dconf") {
					dconf.set(home, path);
					continue;
				}
				const kept = files.get(home);
				if (kept === undefined) files.set(home, path);
				else collisions.push({
					home,
					kept: kept.path,
					dropped: path.path
				});
			}
			return {
				files,
				dconf,
				collisions
			};
		};
		exportedStateFiles = (capture, state) => {
			const replay = capturedHomePlan(capture);
			const { homePath } = replay;
			const homePaths = (paths) => paths.map(homePath).filter((path) => path !== null);
			const { files, dconf, collisions } = stateFilesByHomePath(state.paths, homePath);
			const withRole = (role) => [...files].filter(([, path]) => path.role === role).map(([home]) => home);
			const stateDirectories = homePaths([...capture.application.state_directories.map((entry) => entry.path), ...capture.state.state_directories ?? []]);
			const selected = homePaths(roleFacts(capture).selectedRoots);
			const isLeftOut = leftOutFiles(files, stateDirectories, selected);
			const marksFolder = (home) => {
				const folder = home.split("/").slice(0, -1).join("/");
				return !SHARED_FOLDERS.has(folder);
			};
			const paths = ownedPaths(withRole("application_state").filter((home) => !isLeftOut(home) || marksFolder(home)), withRole("document"), stateDirectories);
			return {
				...replay,
				files,
				dconf,
				collisions,
				paths,
				selected,
				isLeftOut
			};
		};
		docText = (value) => value.replace(/["\\]/gu, "'");
		launchCommand = (argv, capturedHome, workingDirectory, envWorkingDirectory) => {
			const homeUrl = (value) => {
				const parsed = capturedFileUrl(value);
				if (parsed === undefined) return undefined;
				const { url, path } = parsed;
				const root = posix.normalize(capturedHome);
				if (path !== root && !(root === "/" ? path.startsWith("/") : path.startsWith(`${root}/`))) return undefined;
				const segments = url.pathname.split("/");
				const count = root.split("/").filter(Boolean).length;
				const encodedSuffix = segments.slice(count + 1).join("/");
				const suffix = (segments.length > count + 1 ? `/${encodedSuffix}` : "") + url.search + url.hash;
				const encodedHome = `"$(python3 -I -c 'import os,urllib.parse;print(urllib.parse.quote(os.environ["HOME"],safe="/"),end="")')"`;
				const prefix = /^file:\/\/(?:localhost)?(?=\/)/iu.exec(value)?.[0] ?? "file://";
				return `${shellQuote(prefix)}${encodedHome}${shellQuote(suffix)}`;
			};
			const underHome = (path) => homeUrl(path) ?? (path === capturedHome ? `"$HOME"` : path.startsWith(`${capturedHome}/`) ? `"$HOME"/${shellQuote(path.slice(capturedHome.length + 1))}` : undefined);
			const respell = (argument) => {
				const equals = argument.indexOf("=");
				const value = equals > 0 ? underHome(argument.slice(equals + 1)) : undefined;
				return underHome(argument) ?? (value === undefined ? undefined : `${shellQuote(argument.slice(0, equals + 1))}${value}`);
			};
			const respelled = argv.map(respell);
			const command = `exec ${argv.map((argument, index) => respelled[index] ?? shellQuote(argument)).join(" ")}`;
			const directory = underHome(workingDirectory) ?? shellQuote(workingDirectory);
			const requiredDirectory = envWorkingDirectory !== undefined && isWithinAny(posix.normalize(envWorkingDirectory), [capturedHome]) ? underHome(envWorkingDirectory) : undefined;
			const prepare = requiredDirectory === undefined ? "" : `mkdir -p -- ${requiredDirectory} && `;
			return [
				"sh",
				"-c",
				`cd ${directory} 2>/dev/null; ${prepare}${command}`
			];
		};
		py = (value) => JSON.stringify(value);
		pyList = (values) => `[${values.map(py).join(", ")}]`;
		renderEnvToml = (plan) => [
			`type = "computer_app"`,
			`module = ${py(`${appModuleFile(plan.name)}:${plan.className}`)}`,
			`computer = "ubuntu-24.04"`,
			`driver = "reference"`,
			...withheldToml(plan.withheld ?? []),
			""
		].join("\n");
		classBody = (plan) => {
			const title = docText(plan.title);
			const withheld = plan.withheld ?? [];
			if (plan.paths.length > 0) return `    """${title}, launched at boot with the captured state in its home.

    Declaring data hooks switches off agentenv's default data plane, so these call its helpers: the seed is kept as
    the initial state, reset restores it, add writes files under PATHS, and get returns those files plus a typed JSON
    view of each.
    """
${withheldSettingsClass(withheld)}
    def __init__(self) -> None:
        super().__init__()
        if not INITIAL.exists():
            _seed_home(Path.home())
            _load_dconf(Path.home())${withheld.length === 0 ? "" : "\n            _write_withheld(Path.home(), self.settings, WITHHELD)"}
        _ensure_state_aliases(Path.home())
        keep_initial(self.paths)
${withheld.length === 0 ? PYTHON_DATA_HOOKS : PYTHON_WITHHELD_DATA_HOOKS}${PYTHON_READY_CHECK}`;
			return ownlessBody(title, plan.dconf.length > 0, plan.relaunchOnReset === true, (plan.stateAliases ?? []).length > 0);
		};
		aptPackages = (plan) => [...new Set([
			...plan.packageFile?.dependencies ?? (plan.download === undefined ? [installName(plan)] : []),
			...plan.extraPackages ?? [],
			...plan.executablePackage === undefined ? [] : [plan.executablePackage],
			...plan.libraryPackages,
			...plan.dconf.length === 0 ? [] : ["dconf-cli"]
		])];
		aptSources = (plan) => plan.aptSources.length === 0 ? "" : `\n    sources=[${plan.aptSources.map((source) => `AptSource(apt=${py(source.uri)}, suite=${py(source.suite)}, components=${pyList(source.components)}, key=${py(source.keyFile)})`).join(", ")}],`;
		packageFileInstall = ({ packageFile: file }) => file === null ? "" : `\n    downloads=[Download(url=${py(file.url)}, sha256=${py(file.sha256)}, to=${py(file.path)}, arch=${py(file.architecture)})],\n    run=[RunScript(script=${py(INSTALL_SCRIPT)})],`;
		renderInstallScript = (file) => [
			"#!/bin/sh",
			"set -eu",
			`dpkg -i ${shellQuote(file.path)}`,
			`rm -f ${shellQuote(file.path)}`,
			""
		].join("\n");
		seedWording = ({ name, seedCheckpoint, syntheticSeed }) => syntheticSeed ? {
			docstring: `The seed was made for the task, as saved at checkpoint ${docText(seedCheckpoint)}.`,
			origin: `made for the task, as saved at checkpoint \`${seedCheckpoint}\``,
			notice: `The seed was made for this task, not taken from a user's own data; read \`envs/${name}/seed/\` before publishing the bundle.`
		} : {
			docstring: `The seed is the user's state at checkpoint ${docText(seedCheckpoint)}: keep this bundle local.`,
			origin: `from the user's home at checkpoint \`${seedCheckpoint}\``,
			notice: "The seed is the user's real data. Keep this bundle local; do not publish it."
		};
		renderAppClass = (plan) => {
			const hooks = classBody(plan);
			return `"""${docText(plan.title)} as an agentenv computer app, exported by REA from a desktop application capture.

${plan.download === undefined ? `Package: ${plan.aptPackage}${plan.packageVersion === null ? "" : ` (captured at ${plan.packageVersion})`}` : `Downloaded: ${docText(plan.download.url)}`}. Capture Evidence: ${plan.captureEvidenceId}.
${seedWording(plan).docstring}
"""

${PYTHON_IMPORTS}${(plan.withheld ?? []).length === 0 ? "" : "from pydantic import SecretStr, create_model\n"}
HERE = Path(__file__).resolve().parent
SEED_HOME = ${py(SEED_HOME)}
PATHS = ${pyList(plan.paths)}
DCONF = ${py(plan.dconf)}
TEXT_SEEDS = frozenset(${pyList(plan.textSeeds)})
SEED_MODES = {${Object.entries(plan.seedModes).map(([home, mode]) => `${py(home)}: 0o${mode.toString(8)}`).join(", ")}}
STATE_ALIASES = [${(plan.stateAliases ?? []).map(({ alias, target, kind }) => `(${py(alias)}, ${py(target)}, ${py(kind)})`).join(", ")}]
WINDOW_CLASS = ${py(plan.windowClass)}
WITHHELD = {${(plan.withheld ?? []).map(({ setting, file }) => `${py(setting)}: ${py(file)}`).join(", ")}}
${renderPythonHelpers(desktopViewPolicy(plan.viewPolicy))}

@computer_app(supports=[{"os": {"type": "linux", "display": ["x11"]}, "arch": ${pyList(plan.architectures)}}])
@linux(
    packages=Packages(apt=${pyList(aptPackages(plan))}),${aptSources(plan)}${packageFileInstall(plan)}${downloadDeclarations(plan)}
    launch=Launch(at="boot", command=${pyList(plan.command)}, window={"class": ${py(plan.windowClass)}}, ready=Ready(window=True)),
    paths=PATHS,
    skill="SKILL.md",
)
class ${plan.className}(ComputerAppEnvironment):
${hooks}`;
		};
		renderSkill = (plan) => `---
description: Use ${plan.title} on this Linux desktop; its window has class ${plan.windowClass}.
---

# ${plan.title}

${plan.title} is open on the desktop at boot. Its window's class is \`${plan.windowClass}\`.
${plan.paths.length === 0 ? "" : `
Its files live under ${plan.paths.map((path) => `\`~/${path}\``).join(", ")}. Work through the application's own
window and dialogs; the result is read from those files.
`}`;
		NO_LAUNCH_DOCUMENT = "The app opens no document at launch";
		launchDocumentLimitation = (opens) => opens.kind === "none" ? `${NO_LAUNCH_DOCUMENT}, since ${opens.reason}.` : undefined;
		launchDocumentNote = ({ opens }) => opens.kind === "seed" ? `\n- At launch the app opens \`~/${opens.document}\`, the seed's one document.` : opens.kind === "none" ? `\n- ${launchDocumentLimitation(opens)}` : "";
		homeList = (paths) => paths.map((path) => `\`~/${path}\``).join(", ");
		bundleList = (paths) => paths.map((path) => `\`${path}\``).join(", ");
		scrubNotes = ({ scrubbed, recompressed, unscrubbed, recovered = [] }) => [
			...scrubbed.length === 0 ? [] : [`\n  Rewritten: ${bundleList(scrubbed)}.`],
			...recompressed.length === 0 ? [] : [`\n  ${String(recompressed.length)} gzip file(s) were compressed again only to clear their headers, their content unchanged.`],
			...recovered.length === 0 ? [] : [`\n- LibreOffice's list of the documents it had open, which would start it into document recovery instead of
  its window, is left out of ${bundleList(recovered)}.`],
			...unscrubbed.length === 0 ? [] : [`\n- Still holding the capture host's name, user@host or home, in their name or in content REA does not rewrite:
  ${bundleList(unscrubbed)}. Read them before sharing the bundle.`]
		].join("");
		renderReadme = (plan, taskSection = "", scrub = {
			scrubbed: [],
			recompressed: [],
			unscrubbed: []
		}) => `# ${plan.title} computer app

Exported by REA's \`export-desktop-application\` from a capture of the \`${plan.aptPackage}\` ${plan.download === undefined ? "package" : downloadKind(plan.download)}
(capture Evidence \`${plan.captureEvidenceId}\`). It targets agentenv-framework
${DESKTOP_EXPORT_FRAMEWORK_VERSION}.

- \`envs/${plan.name}/\` is a computer app on the \`ubuntu-24.04\` base with the \`reference\` driver, for
  ${plan.architectures.map((architecture) => `\`${architecture}\``).join(" and ")}. It installs ${installs(plan)}, launches \`${plan.command.join(" ")}\` at boot and is ready
  when a window of class \`${plan.windowClass}\` appears.${installNotes(plan)}${launchDocumentNote(plan)}
- Owned paths: ${plan.paths.length === 0 ? "none" : plan.paths.map((path) => `\`~/${path}\``).join(", ")}.
  \`data/get\` returns their files and a typed JSON view of each; \`data/reset\` restores the seed.
- Seed: ${plan.seedFiles.length} file(s) ${seedWording(plan).origin}${plan.dconf.length === 0 ? "" : ", and the application's dconf keys"}.
  Text files and dconf keys spell the capture host's name as \`localhost\`, \`user@host\` as \`user@localhost\`
  and the home as \`${SEED_HOME}\`, which the computer respells to its own at boot.${scrubNotes(scrub)}${plan.unseededFiles.length === 0 ? "" : `
- Not seeded, because the capture did not retain their bytes at the seed: ${homeList(plan.unseededFiles)}.
  Capture again with \`--state-path\` naming them, or a larger \`--max-file-bytes\`, to include them.`}${withheldNotes(plan)}${unownedReadmeNotes(plan.unownedFolders, plan.runtimeSeeds, plan.leftOutLocks)}
- \`tasks/smoke.json\` deploys the app.

${taskSection.length === 0 ? "Run it with `agent-env run <this folder>`." : "Run the task with `agent-env run <this folder>`, or only the deploy with `--task smoke`."}

${seedWording(plan).notice}
${plan.dconf.length === 0 ? "" : "dconf keys are compiled into the user's dconf database, with `dconf-cli`, once when the app first starts; `data/reset` does not restore them.\n"}${taskSection}`;
		renderSmokeTask = (plan) => `${JSON.stringify([{
			id: "env",
			type: "deploy_env",
			env_id: plan.name
		}], null, 2)}\n`;
	})))();
}

//#endregion
export { COMPUTER_ARCHITECTURES, DESKTOP_EXPORT_FRAMEWORK_VERSION, DOWNLOAD_INSTALL_SCRIPT, PYTHON_EXACT_JSON_NUMBER, appModuleFile, aptSources, className, downloadFields, downloadInstallFiles, downloadInstallSchema, downloadPrefix, downloadUrlSchema, downloadedFile, environmentName, exportedStateFiles, identityLeftIn, identitySpellings, init_appDownloadInstall, init_appExport, init_hostIdentity, init_pythonExactJsonNumber, init_seedDocument, init_shellQuote, launchCommand, launchDocumentLimitation, openSeedDocument, py, pyList, renderAppClass, renderEnvToml, renderInstallScript, renderReadme, renderSkill, renderSmokeTask, scrubHostIdentity, sha256Schema, shellQuote, tarballFields };