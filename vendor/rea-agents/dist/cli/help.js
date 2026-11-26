import { z } from "zod";
import { declaredOptionType, optionFlagName } from "./optionFields.js";
/** Two-column rows with the descriptions aligned after the longest label. */
const alignedRows = (rows) => {
    const width = Math.max(...rows.map((row) => row.label.length));
    return rows.map((row) => `  ${row.label}${" ".repeat(width - row.label.length)}  ${row.description}`);
};
/** The placeholder shown after a value-taking flag. */
const typeName = (field) => {
    const type = declaredOptionType(field);
    if (type instanceof z.ZodString)
        return "string";
    if (type instanceof z.ZodNumber)
        return "number";
    if (type instanceof z.ZodBoolean)
        return "boolean";
    if (type instanceof z.ZodArray)
        return "array";
    if (type instanceof z.ZodEnum)
        return type.options.map((value) => String(value)).join("|");
    if (type instanceof z.ZodUnion &&
        type.options.every((option) => option instanceof z.ZodLiteral))
        return type.options.map((option) => String(option.value)).join("|");
    return "value";
};
/** A shown default; empty arrays and a `false` boolean default are not shown. */
const shownDefault = (field, type) => {
    const metadata = field.meta();
    const value = metadata !== undefined && Object.hasOwn(metadata, "default")
        ? metadata.default
        : field instanceof z.ZodDefault
            ? field.def.defaultValue
            : field instanceof z.ZodOptional
                ? shownDefault(field.unwrap(), type)
                : undefined;
    if (Array.isArray(value) && value.length === 0)
        return undefined;
    if (type === "boolean" && value === false)
        return undefined;
    return value;
};
const fieldDescription = (field, type = typeName(field)) => {
    const defaultValue = shownDefault(field, type);
    const description = field.description ?? "";
    return defaultValue === undefined
        ? description
        : `${description} (default: ${String(defaultValue)})`;
};
const optionRows = (options, alias) => Object.entries(options.shape).map(([key, field]) => {
    const type = typeName(field);
    const short = alias?.[key];
    const value = type === "boolean" ? "" : ` <${type}>`;
    const label = `--${optionFlagName(key)}${short === undefined ? "" : `, -${short}`}${value}`;
    return { label, description: fieldDescription(field, type) };
});
/** A command list's rows, in the order given. */
const commandRows = (commands) => {
    const width = Math.max(...commands.map((command) => command.name.length));
    return commands.map((command) => command.description === undefined || command.description === ""
        ? `  ${command.name}`
        : `  ${command.name}${" ".repeat(width - command.name.length)}  ${command.description}`);
};
/** `<required>`, `[optional]` and `<variadic...>` placeholders, in argv order. */
const synopsis = (name, args) => [
    name,
    ...Object.entries((args?.shape ?? {})).map(([key, field]) => {
        const type = typeName(field);
        const label = (type.includes("|") ? type : key) + (type === "array" ? "..." : "");
        return field._zod.optout === "optional" ? `[${label}]` : `<${label}>`;
    }),
].join(" ");
/** The global options an entry accepts, sorted by flag. */
const globalOptionRows = ({ formats, root }) => [
    {
        label: "--filter-output <keys>",
        description: "Filter output by key paths (e.g. foo,bar.baz,a[0,3])",
    },
    { label: `--format <${formats.join("|")}>`, description: "Output format" },
    { label: "--help", description: "Show help" },
    { label: "--json", description: "Shorthand for --format json" },
    {
        label: "--llms, --llms-full",
        description: "Print LLM-readable manifest",
    },
    { label: "--schema", description: "Show JSON Schema for command" },
    {
        label: "--token-count",
        description: "Print token count of output (instead of output)",
    },
    { label: "--token-limit <n>", description: "Limit output to n tokens" },
    {
        label: "--token-offset <n>",
        description: "Skip first n tokens of output",
    },
    { label: "--full-output", description: "Show full output envelope" },
    ...(root === undefined
        ? []
        : [
            { label: "--mcp", description: "Start as MCP stdio server" },
            { label: "--update", description: "Update to latest version" },
            { label: "--version", description: "Show version" },
        ]),
].sort((left, right) => left.label.localeCompare(right.label));
/** Integrations, custom global options and global options, in that order. */
const globalOptionsLines = (help) => {
    if (help === undefined)
        return [];
    const lines = [];
    if (help.root !== undefined)
        lines.push("", "Integrations:", ...commandRows(help.root.integrations));
    const custom = help.custom === undefined ? [] : optionRows(help.custom, undefined);
    if (custom.length > 0)
        lines.push("", "Custom Global Options:", ...alignedRows(custom));
    lines.push("", "Global Options:", ...alignedRows(globalOptionRows(help)));
    return lines;
};
const title = (name, help) => {
    const heading = help.version === undefined ? name : `${name}@${help.version}`;
    return help.description === undefined
        ? heading
        : `${heading} — ${help.description}`;
};
/** Render one command's help, without a trailing newline. */
export const formatCommandHelp = (name, help) => {
    const lines = [
        title(name, help),
        "",
        `Usage: ${synopsis(name, help.args)}${help.options === undefined ? "" : " [options]"}`,
    ];
    const args = Object.entries((help.args?.shape ?? {})).map(([key, field]) => ({
        label: key,
        description: fieldDescription(field),
    }));
    if (args.length > 0)
        lines.push("", "Arguments:", ...alignedRows(args));
    const options = help.options === undefined ? [] : optionRows(help.options, help.alias);
    if (options.length > 0)
        lines.push("", "Options:", ...alignedRows(options));
    if (help.hint !== undefined)
        lines.push("", help.hint);
    lines.push(...globalOptionsLines(help.globalOptions));
    return lines.join("\n");
};
/** Render a page that lists commands (the root or a group), without a trailing newline. */
export const formatCommandListHelp = (name, help) => {
    const lines = [title(name, help), "", `Usage: ${name} <command>`];
    if (help.commands.length > 0)
        lines.push("", "Commands:", ...commandRows(help.commands));
    lines.push(...globalOptionsLines(help.globalOptions));
    return lines.join("\n");
};
