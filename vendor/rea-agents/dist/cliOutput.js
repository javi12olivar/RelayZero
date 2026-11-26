import { declaredSensitiveValues, parseCliGlobalArguments, VALUED_OUTPUT_FLAGS, } from "./cliBuiltinArguments.js";
import { redactExplicitText } from "./domain/explicitSensitiveValues.js";
import { formatCliOutput } from "./cli/cliOutputFormatter.js";
import { parseOutputFilter, } from "./cli/outputFilter.js";
import { jsonOutputParts } from "./cli/jsonOutput.js";
import { jsonLinesErrorRecord } from "./cli/jsonLines.js";
import { versionReport, } from "./domain/versionReport.js";
// The launcher and compiled CLI drivers share this lightweight entrypoint.
export { cliConfigurationError } from "./cliConfiguration.js";
const UNSUPPORTED_OUTPUT_COMBINATION_MESSAGE = "Token windows cannot preserve structured output. Remove --token-limit/--token-offset and use --filter-output or command pagination.";
/** Formats that render a complete document, including target-free commands. */
export const CLI_DOCUMENT_OUTPUT_FORMATS = [
    "toon",
    "json",
    "yaml",
    "md",
    "jsonl",
];
/** Delimited formats require an explicitly selected row collection. */
export const CLI_OUTPUT_FORMATS = [
    ...CLI_DOCUMENT_OUTPUT_FORMATS,
    "csv",
    "tsv",
];
const CLI_OUTPUT_FORMAT_SET = new Set(CLI_OUTPUT_FORMATS);
const isCliOutputFormat = (value) => CLI_OUTPUT_FORMAT_SET.has(value);
/**
 * Render a document REA writes outside Incur's command pipeline. JSON follows
 * the CLI contract: indented for a terminal, compact when piped or redirected.
 */
export const renderCliDocument = (value, format, stdoutIsTerminal) => format === "json" || format === "jsonl"
    ? [...jsonOutputParts(value, format, stdoutIsTerminal)].join("")
    : `${formatCliOutput(value, format)}\n`;
/**
 * Validate a spaced output-flag value before Incur dispatch. REA narrows token
 * coordinates to nonnegative safe integers so slice metadata remains coherent.
 */
export const cliOutputValueRejection = (flag, value) => {
    if (flag === "--format")
        return CLI_OUTPUT_FORMAT_SET.has(value)
            ? undefined
            : `Invalid format: "${value}". Expected one of: ${[...CLI_OUTPUT_FORMAT_SET].join(", ")}`;
    if (flag === "--columns") {
        const columns = value.split(",").map((column) => column.trim());
        return columns.length > 0 &&
            columns.every((column) => column.length > 0) &&
            new Set(columns).size === columns.length
            ? undefined
            : `Invalid value for --columns: "${value}". Expected unique, nonempty comma-separated column names.`;
    }
    if ((flag === "--token-limit" || flag === "--token-offset") &&
        (!/^[0-9]+$/u.test(value) || !Number.isSafeInteger(Number(value))))
        return `Invalid value for ${flag}: "${value}". Expected a nonnegative safe integer.`;
    return undefined;
};
/** Read effective output controls from the caller's argv. */
export const parseCliOutputArguments = (arguments_) => readCliOutputArguments(parseCliGlobalArguments(arguments_));
/**
 * Read effective output controls from one invocation's global arguments. The
 * global split decides which tokens are flag values; this reader interprets
 * them, and a valued flag left among the command tokens is missing its value.
 */
export const readCliOutputArguments = (global) => {
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
        // The global split has already consumed output values and timing flags.
        if (values.has(index) || timing.has(index))
            continue;
        // Only these flags can accompany a formatted root version request.
        if (argument !== "--version" &&
            argument !== "--json" &&
            argument !== "--format")
            versionEligible = false;
        if (argument === "--json") {
            format = "json";
            formatExplicit = true;
            continue;
        }
        if (argument === "--full-output")
            fullOutput = true;
        if (argument === "--token-count")
            tokenCount = true;
        if (!VALUED_OUTPUT_FLAGS.has(argument))
            continue;
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
        }
        else if (argument === "--filter-output")
            filterOutput = value;
        else if (argument === "--columns")
            columns = value.split(",").map((column) => column.trim());
        else if (argument === "--token-limit")
            tokenLimit = Number(value);
        else if (argument === "--token-offset")
            tokenOffset = Number(value);
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
        invalidValue: invalidValue === undefined
            ? undefined
            : redactExplicitText(invalidValue, declaredSensitiveValues(global.command)),
        tokenCount,
        tokenWindow: !parseError && (tokenLimit !== undefined || tokenOffset !== undefined),
        tokenLimit: parseError ? undefined : tokenLimit,
        tokenOffset: parseError ? undefined : tokenOffset,
    };
    return {
        ...controls,
        validation: validateCliOutputControls(controls, rootVersion, global),
        versionReportFormat: rootVersion &&
            versionEligible &&
            formatExplicit &&
            !parseError &&
            missingValue === undefined &&
            format !== "csv" &&
            format !== "tsv" &&
            isCliOutputFormat(format)
            ? format
            : undefined,
    };
};
/** Name a valued output flag that was given without a value. */
export const missingCliOutputValueMessage = (flag) => `${flag} requires a value, as in ${flag} <value> or ${flag}=<value>.`;
const discoveryRowFormatFlag = (global) => {
    const { command, flags } = global;
    const help = flags.has("--help") || flags.has("-h");
    if ((flags.has("--update") && !help) || flags.has("--mcp"))
        return undefined;
    if (flags.has("--llms-full"))
        return "--llms-full";
    if (flags.has("--llms"))
        return "--llms";
    if (flags.has("--version") && !help)
        return undefined;
    if (command.length === 0 || help)
        return undefined;
    if (flags.has("--schema"))
        return "--schema";
    return undefined;
};
/** Reject output controls that cannot safely produce a complete result. */
const validateCliOutputControls = ({ filterOutput, filterPaths, columns, format, missingValue, invalidValue, tokenWindow, tokenCount, }, rootVersion, global) => {
    if (invalidValue !== undefined)
        return {
            ok: false,
            format: format === "yaml" || format === "jsonl" ? format : "json",
            code: "INVALID_OUTPUT_VALUE",
            message: invalidValue,
        };
    if (filterPaths?.ok === false)
        return {
            ok: false,
            format: format === "yaml" || format === "jsonl" ? format : "json",
            code: "INVALID_OUTPUT_FILTER",
            message: filterPaths.error.kind === "unclosed_slice"
                ? "The --filter-output expression has a slice without a closing ]. Close the slice or remove --filter-output."
                : "The --filter-output expression has a slice with more than two bounds. Use [start,end].",
        };
    const delimited = format === "csv" || format === "tsv";
    // Name missing delimited controls before their combination checks; preserve
    // existing precedence for Incur's other output flags.
    if (missingValue !== undefined && (delimited || missingValue === "--columns"))
        return {
            ok: false,
            format: format === "yaml" || format === "jsonl" ? format : "json",
            code: "MISSING_OUTPUT_VALUE",
            message: missingCliOutputValueMessage(missingValue),
        };
    const discoveryFlag = delimited ? discoveryRowFormatFlag(global) : undefined;
    if (delimited && discoveryFlag !== undefined)
        return {
            ok: false,
            format: "json",
            code: "UNSUPPORTED_OUTPUT_COMBINATION",
            message: `${discoveryFlag} returns a complete document and does not support --format ${format}. Use --format json, yaml, md, toon, or jsonl; CSV/TSV output is available only for selected row collections.`,
        };
    if (delimited && rootVersion)
        return {
            ok: false,
            format: "json",
            code: "UNSUPPORTED_OUTPUT_COMBINATION",
            message: "CSV/TSV output is available only for selected row collections, not --version.",
        };
    if (delimited && (filterOutput === undefined || columns === undefined))
        return {
            ok: false,
            format: "json",
            code: "UNSUPPORTED_OUTPUT_COMBINATION",
            message: "CSV/TSV output requires --filter-output <row-array-path> and --columns <column,...>; nested Evidence is not flattened.",
        };
    if (!delimited && columns !== undefined)
        return {
            ok: false,
            format: format === "yaml" || format === "jsonl" ? format : "json",
            code: "UNSUPPORTED_OUTPUT_COMBINATION",
            message: "--columns is available only with --format csv or --format tsv.",
        };
    if (delimited && (tokenWindow || tokenCount))
        return {
            ok: false,
            format: "json",
            code: "UNSUPPORTED_OUTPUT_COMBINATION",
            message: "Token counting and token windows cannot preserve CSV/TSV records or metadata. Remove --token-count/--token-limit/--token-offset.",
        };
    if (tokenWindow &&
        (format === "json" || format === "jsonl" || format === "yaml"))
        return {
            ok: false,
            format,
            code: "UNSUPPORTED_OUTPUT_COMBINATION",
            message: UNSUPPORTED_OUTPUT_COMBINATION_MESSAGE,
        };
    // Incur skips a valued flag without a value and then reports the flag
    // itself as unknown. Name the missing value instead.
    if (missingValue !== undefined)
        return {
            ok: false,
            format: format === "yaml" || format === "jsonl" ? format : "json",
            code: "MISSING_OUTPUT_VALUE",
            message: missingCliOutputValueMessage(missingValue),
        };
    return { ok: true };
};
/** Preserve a complete document when Incur filters the entire result away. */
export const renderEmptyFilteredCliOutput = ({ filterOutput, format, validation, }) => {
    if (!validation.ok)
        return undefined;
    if (filterOutput &&
        (format === "json" || format === "jsonl" || format === "yaml"))
        return "{}\n";
    return undefined;
};
/** Render one complete structured error before command execution. */
export const renderCliOutputArgumentError = (error) => {
    const value = {
        ok: false,
        error: { code: error.code, message: error.message },
    };
    if (error.format === "yaml")
        return `ok: false\nerror:\n  code: ${error.code}\n  message: ${JSON.stringify(error.message)}\n`;
    return `${JSON.stringify(error.format === "jsonl" ? jsonLinesErrorRecord(value) : value)}\n`;
};
/**
 * Render the version report for a formatted root `--version` request, or
 * return undefined so Incur prints the bare version or handles the request.
 */
export const renderVersionReport = ({ versionReportFormat: format }, host, stdoutIsTerminal) => {
    return format === undefined
        ? undefined
        : renderCliDocument(versionReport(host), format, stdoutIsTerminal);
};
