import { err, ok } from "../result.js";
import { DESKTOP_ENTRY_GROUP, DESKTOP_GROUP, DESKTOP_KEY, DESKTOP_KEY_SEPARATOR, DESKTOP_VALUE_ESCAPE, DESKTOP_VALUE_ESCAPES, ENV_PREFIX, ENV_UNSET_NAME, ENV_WRAPPER, EXEC_LEXEME, QUOTABLE, QUOTED_ESCAPE, } from "./desktopLaunchSyntax.js";
import { DESKTOP_LINE_BREAK } from "./desktopTextSyntax.js";
// Capture tolerant padding separately so it stays available for validation.
const GROUP = new RegExp(String.raw `^(\s*)${DESKTOP_GROUP}(\s*)$`, "u");
const GLIB_GROUP_LEADING_SPACE = /^[ \t\f\r]*$/u;
const GLIB_GROUP_TRAILING_SPACE = /^[ \t]*$/u;
const INVALID_GROUP_NAME_CHARACTER = /[[\]\u0000-\u001f\u007f]/u;
const LINE_WITH_SEPARATOR = new RegExp(`(${DESKTOP_LINE_BREAK})`, "u");
// Only LF separates records; Unicode line/paragraph separators are value data.
const ENTRY = new RegExp(`^(?<key>${DESKTOP_KEY})(?<locale>\\[[A-Za-z0-9_.@-]+\\])?${DESKTOP_KEY_SEPARATOR}(?<value>.*)$`, "su");
const valueEscape = new RegExp(DESKTOP_VALUE_ESCAPE, "gu");
// GLib strips its ASCII whitespace from the raw boolean. LF ends the record.
const BOOLEAN_TRUE = /^[ \t\f\r]*(?:true|1)[ \t\f\r]*$/u;
/** Undo the escapes the desktop entry format allows in string values. */
const unescapeValue = (value) => value.replace(valueEscape, (match, next) => DESKTOP_VALUE_ESCAPES[next] ?? match);
/**
 * Escape a string for a desktop-entry value. This is the inverse of the
 * escapes `parseDesktopEntry` removes, and the same rules GLib uses when it
 * writes a string: `\\`, `\n`, `\r`, a leading `\s` or `\t`. A backslash that
 * is only command-quoted would otherwise be eaten before `Exec` is tokenized,
 * and `gio launch` rejects the resulting entry.
 */
export const escapeDesktopEntryValue = (value) => {
    let escaped = "";
    let leading = true;
    for (const character of value) {
        switch (character) {
            case " ":
                escaped += leading ? "\\s" : " ";
                break;
            case "\t":
                escaped += leading ? "\\t" : "\t";
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
/** Decode list separators and escapes together, before either loses its meaning. */
const listValue = (value) => {
    if (value === undefined)
        return [];
    const entries = [];
    let entry = "";
    for (let index = 0; index < value.length; index += 1) {
        const character = value.charAt(index);
        const next = value.charAt(index + 1);
        if (character === "\\" && next.length > 0) {
            entry +=
                next === ";" ? ";" : (DESKTOP_VALUE_ESCAPES[next] ?? `\\${next}`);
            index += 1;
        }
        else if (character === ";") {
            entries.push(entry);
            entry = "";
        }
        else
            entry += character;
    }
    if (entry.length > 0)
        entries.push(entry);
    return entries;
};
/** GLib merges repeated groups and gives the last occurrence of a key precedence. */
const readDesktopEntryFields = (text) => {
    const parts = text.split(LINE_WITH_SEPARATOR);
    const fields = new Map();
    let group;
    let found = false;
    let malformedLine;
    for (let index = 0; index < parts.length; index += 2) {
        const raw = parts[index];
        const line = raw.trim();
        if (line.length === 0 || line.startsWith("#"))
            continue;
        const [, leading = "", header, trailing = ""] = GROUP.exec(raw) ?? [];
        if (header !== undefined) {
            if ((group === undefined && header !== DESKTOP_ENTRY_GROUP) ||
                INVALID_GROUP_NAME_CHARACTER.test(header) ||
                !GLIB_GROUP_LEADING_SPACE.test(leading) ||
                !GLIB_GROUP_TRAILING_SPACE.test(trailing))
                malformedLine ??= index / 2 + 1;
            // Preserve the group boundary for tolerant field and rewrite consumers.
            group = header;
            found ||= group === DESKTOP_ENTRY_GROUP;
            continue;
        }
        // Full-line trimming is syntax-only: string-value suffixes are data.
        const entry = ENTRY.exec(raw.trimStart());
        if (group === undefined || entry?.groups === undefined) {
            malformedLine ??= index / 2 + 1;
            continue;
        }
        if (group !== DESKTOP_ENTRY_GROUP || entry.groups.locale !== undefined)
            continue;
        const { key, value } = entry.groups;
        if (key !== undefined && value !== undefined)
            fields.set(key, {
                value: key === "Type" ? value.trimEnd() : value,
                part: index,
            });
    }
    return { parts, fields, found, malformedLine };
};
/** Read the effective main-group keys, ignoring localized keys and action groups. */
export const parseDesktopEntry = (text) => {
    const { fields, found, malformedLine } = readDesktopEntryFields(text);
    if (!found)
        return err("missing_desktop_entry_group");
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
        ...(malformedLine === undefined ? {} : { malformed_line: malformedLine }),
    });
};
const execLexeme = new RegExp(EXEC_LEXEME, "uy");
const quotedEscape = new RegExp(QUOTED_ESCAPE, "gu");
/** Split an `Exec` value into arguments with the specification's quoting rules. */
export const tokenizeDesktopExec = (exec) => {
    const tokens = [];
    let current;
    execLexeme.lastIndex = 0;
    while (execLexeme.lastIndex < exec.length) {
        const part = execLexeme.exec(exec);
        if (part === null)
            return err("unterminated_quote");
        const [, quoted, unquoted, separator] = part;
        if (separator !== undefined) {
            if (current !== undefined)
                tokens.push(current);
            current = undefined;
        }
        else
            current =
                (current ?? "") + (quoted?.replace(quotedEscape, "$1") ?? unquoted);
    }
    if (current !== undefined)
        tokens.push(current);
    return tokens.length === 0 ? err("empty_command") : ok(tokens);
};
/** Reserved characters an unquoted `Exec` argument must not contain. */
const EXEC_RESERVED = /[\t\n\r "'\\><~|&;$*?#()`]/u;
const quotable = new RegExp(QUOTABLE, "gu");
/**
 * Quote `Exec` arguments so `tokenizeDesktopExec` reads them back. The
 * desktop-entry value escapes around that command are applied when the line
 * is written.
 */
export const formatDesktopExec = (argv) => argv
    .map((argument) => argument.length > 0 && !EXEC_RESERVED.test(argument)
    ? argument
    : `"${argument.replace(quotable, (character) => `\\${character}`)}"`)
    .join(" ");
/**
 * Replace the effective main-group `Exec`, using the same record owner as
 * parsing. Overridden keys and action groups stay unchanged. `exec` is escaped
 * for the desktop-entry value layer before it is written.
 */
export const replaceDesktopExec = (text, exec) => {
    const { parts, fields } = readDesktopEntryFields(text);
    const execField = fields.get("Exec");
    if (execField === undefined)
        return err("missing_exec_line");
    parts[execField.part] = `Exec=${escapeDesktopEntryValue(exec)}`;
    return ok(parts.join(""));
};
const FILE_FIELD_CODES = new Set(["%f", "%F", "%u", "%U"]);
/** Whether an `Exec` value takes files: it holds a `%f`, `%F`, `%u` or `%U` field code. */
export const execTakesFiles = (exec) => {
    const tokens = tokenizeDesktopExec(exec);
    return tokens.ok && tokens.value.some((token) => FILE_FIELD_CODES.has(token));
};
/**
 * Expand field codes for a launch with no files, then append caller arguments.
 * File and URL codes are dropped, so the caller's arguments take their place.
 */
export const expandDesktopExec = (tokens, context, arguments_) => {
    const expanded = [];
    for (const token of tokens) {
        if (FILE_FIELD_CODES.has(token))
            continue;
        if (token === "%i") {
            if (context.icon !== null)
                expanded.push("--icon", context.icon);
            continue;
        }
        expanded.push(token.replace(/%(.)/gu, (match, code) => {
            if (code === "%")
                return "%";
            if (code === "c")
                return context.name ?? "";
            if (code === "k")
                return context.location ?? "";
            return /[fFuUidDnNvm]/u.test(code) ? "" : match;
        }));
    }
    return [...expanded, ...arguments_];
};
/**
 * `flatpak run` options that take a value. GOption also accepts the value as
 * the next argument (`--branch stable`), so it must be skipped with its option.
 */
const FLATPAK_RUN_VALUE_OPTIONS = new Set([
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
    // Sandbox permissions, shared with `flatpak override`.
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
    "--usb-list-file",
]);
/**
 * The application id a `flatpak run` argument list names: its first operand,
 * after options and their values, without a `/arch/branch` ref suffix.
 */
const flatpakApplication = (argv, start) => {
    for (let index = start; index < argv.length; index += 1) {
        const token = argv[index] ?? "";
        if (token === "--")
            return {
                application_id: argv[index + 1]?.split("/")[0] || null,
                argumentIndex: Math.min(index + 2, argv.length),
            };
        if (!token.startsWith("-"))
            return {
                application_id: token.split("/")[0] || null,
                argumentIndex: index + 1,
            };
        if (FLATPAK_RUN_VALUE_OPTIONS.has(token))
            index += 1;
    }
    return { application_id: null, argumentIndex: argv.length };
};
const envUnsetName = new RegExp(`^(?:${ENV_UNSET_NAME})$`, "u");
const envWrapper = new RegExp(`^${ENV_WRAPPER}$`, "u");
const envPhases = ENV_PREFIX.map(({ repeat, rules }) => ({
    repeat,
    rules: rules.map((rule) => ({
        rule,
        pattern: new RegExp(`^(?:${rule.pattern})$`, "u"),
    })),
}));
const envMatch = (phase, token) => {
    for (const { rule, pattern } of phase.rules) {
        const captures = pattern.exec(token);
        if (captures !== null)
            return { rule, captures };
    }
    return undefined;
};
const desktopEnvironment = (argv) => {
    let index = 1;
    let clearEnvironment = false;
    let chdir;
    const unsetEnvironment = [];
    // No prototype, so an assignment such as `__proto__=x` stays a variable.
    const environment = Object.create(null);
    for (const phase of envPhases) {
        while (index < argv.length) {
            const token = argv[index];
            const match = envMatch(phase, token);
            if (match === undefined)
                break;
            const { rule, captures } = match;
            const start = index;
            index += 1;
            if (rule.kind === "clear")
                clearEnvironment = true;
            if (rule.kind === "assignment") {
                const split = token.indexOf("=");
                environment[token.slice(0, split)] = token.slice(split + 1);
            }
            if (rule.kind === "chdir" || rule.kind === "unset") {
                const attached = rule.operand === undefined ? undefined : captures[rule.operand];
                const separate = attached === undefined;
                const value = separate ? (argv[index] ?? "") : attached;
                if (separate)
                    index += 1;
                const combined = rule.clear !== undefined && Boolean(captures[rule.clear]);
                clearEnvironment ||= combined;
                if (rule.kind === "unset")
                    unsetEnvironment.push(value);
                else
                    chdir = {
                        path: value,
                        start,
                        end: index,
                        ...(combined ? { includesClearEnvironment: true } : {}),
                    };
            }
            if (!phase.repeat)
                break;
        }
    }
    return { index, chdir, clearEnvironment, environment, unsetEnvironment };
};
/** Apply env prefixes and recognise flatpak run launchers. */
export const unwrapDesktopCommand = (argv) => {
    const { index, chdir, clearEnvironment, environment, unsetEnvironment } = envWrapper.test(argv[0] ?? "")
        ? desktopEnvironment(argv)
        : {
            index: 0,
            chdir: undefined,
            clearEnvironment: false,
            unsetEnvironment: [],
            environment: Object.create(null),
        };
    const program = argv[index] ?? "";
    const wrapperOptions = {
        ...(chdir === undefined ? {} : { chdir }),
        ...(clearEnvironment ? { clearEnvironment: true } : {}),
        ...(unsetEnvironment.length === 0 ? {} : { unsetEnvironment }),
        ...(!clearEnvironment &&
            unsetEnvironment.some((name) => !envUnsetName.test(name))
            ? { invalidUnset: true }
            : {}),
    };
    if (program.split("/").at(-1) === "flatpak" && argv[index + 1] === "run")
        return {
            kind: "flatpak",
            program,
            index,
            environment,
            ...flatpakApplication(argv, index + 2),
            ...wrapperOptions,
        };
    return {
        kind: "direct",
        program,
        environment,
        index,
        argumentIndex: index + 1,
        ...wrapperOptions,
    };
};
