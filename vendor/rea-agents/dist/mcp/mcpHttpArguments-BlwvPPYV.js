import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { a as mcpHttpListenerPortSchema, i as mcpAllowedHostsTextSchema, n as MCP_HTTP_PORT_CONSTRAINT, o as mcpHttpPortSchema, r as init_mcpHttpEndpoint, t as MCP_ALLOWED_HOSTS_FLAG_CONSTRAINT } from "./mcpHttpEndpoint-C7hLYhFC.js";
import { z } from "zod";

//#region dist/cli/optionFields.js
var optionFlagName, declaredOptionType, isCountOption;
function init_optionFields() {
	return (init_optionFields = __esmMin((() => {
		optionFlagName = (key) => key.replaceAll(/[A-Z]/gu, (letter) => `-${letter.toLowerCase()}`);
		declaredOptionType = (field) => {
			let current = field;
			for (let inner = Reflect.get(current.def, "innerType"); inner instanceof z.ZodType; inner = Reflect.get(current.def, "innerType")) current = inner;
			return current;
		};
		isCountOption = (field) => field.meta()?.count === true;
	})))();
}

//#endregion
//#region dist/cli/help.js
var alignedRows, typeName, shownDefault, fieldDescription, optionRows, commandRows, synopsis, globalOptionRows, globalOptionsLines, title, formatCommandHelp, formatCommandListHelp;
function init_help() {
	return (init_help = __esmMin((() => {
		init_optionFields();
		alignedRows = (rows) => {
			const width = Math.max(...rows.map((row) => row.label.length));
			return rows.map((row) => `  ${row.label}${" ".repeat(width - row.label.length)}  ${row.description}`);
		};
		typeName = (field) => {
			const type = declaredOptionType(field);
			if (type instanceof z.ZodString) return "string";
			if (type instanceof z.ZodNumber) return "number";
			if (type instanceof z.ZodBoolean) return "boolean";
			if (type instanceof z.ZodArray) return "array";
			if (type instanceof z.ZodEnum) return type.options.map((value) => String(value)).join("|");
			if (type instanceof z.ZodUnion && type.options.every((option) => option instanceof z.ZodLiteral)) return type.options.map((option) => String(option.value)).join("|");
			return "value";
		};
		shownDefault = (field, type) => {
			const metadata = field.meta();
			const value = metadata !== undefined && Object.hasOwn(metadata, "default") ? metadata.default : field instanceof z.ZodDefault ? field.def.defaultValue : field instanceof z.ZodOptional ? shownDefault(field.unwrap(), type) : undefined;
			if (Array.isArray(value) && value.length === 0) return undefined;
			if (type === "boolean" && value === false) return undefined;
			return value;
		};
		fieldDescription = (field, type = typeName(field)) => {
			const defaultValue = shownDefault(field, type);
			const description = field.description ?? "";
			return defaultValue === undefined ? description : `${description} (default: ${String(defaultValue)})`;
		};
		optionRows = (options, alias) => Object.entries(options.shape).map(([key, field]) => {
			const type = typeName(field);
			const short = alias?.[key];
			const value = type === "boolean" ? "" : ` <${type}>`;
			const label = `--${optionFlagName(key)}${short === undefined ? "" : `, -${short}`}${value}`;
			return {
				label,
				description: fieldDescription(field, type)
			};
		});
		commandRows = (commands) => {
			const width = Math.max(...commands.map((command) => command.name.length));
			return commands.map((command) => command.description === undefined || command.description === "" ? `  ${command.name}` : `  ${command.name}${" ".repeat(width - command.name.length)}  ${command.description}`);
		};
		synopsis = (name, args) => [name, ...Object.entries(args?.shape ?? {}).map(([key, field]) => {
			const type = typeName(field);
			const label = (type.includes("|") ? type : key) + (type === "array" ? "..." : "");
			return field._zod.optout === "optional" ? `[${label}]` : `<${label}>`;
		})].join(" ");
		globalOptionRows = ({ formats, root }) => [
			{
				label: "--filter-output <keys>",
				description: "Filter output by key paths (e.g. foo,bar.baz,a[0,3])"
			},
			{
				label: `--format <${formats.join("|")}>`,
				description: "Output format"
			},
			{
				label: "--help",
				description: "Show help"
			},
			{
				label: "--json",
				description: "Shorthand for --format json"
			},
			{
				label: "--llms, --llms-full",
				description: "Print LLM-readable manifest"
			},
			{
				label: "--schema",
				description: "Show JSON Schema for command"
			},
			{
				label: "--token-count",
				description: "Print token count of output (instead of output)"
			},
			{
				label: "--token-limit <n>",
				description: "Limit output to n tokens"
			},
			{
				label: "--token-offset <n>",
				description: "Skip first n tokens of output"
			},
			{
				label: "--full-output",
				description: "Show full output envelope"
			},
			...root === undefined ? [] : [
				{
					label: "--mcp",
					description: "Start as MCP stdio server"
				},
				{
					label: "--update",
					description: "Update to latest version"
				},
				{
					label: "--version",
					description: "Show version"
				}
			]
		].sort((left, right) => left.label.localeCompare(right.label));
		globalOptionsLines = (help) => {
			if (help === undefined) return [];
			const lines = [];
			if (help.root !== undefined) lines.push("", "Integrations:", ...commandRows(help.root.integrations));
			const custom = help.custom === undefined ? [] : optionRows(help.custom, undefined);
			if (custom.length > 0) lines.push("", "Custom Global Options:", ...alignedRows(custom));
			lines.push("", "Global Options:", ...alignedRows(globalOptionRows(help)));
			return lines;
		};
		title = (name, help) => {
			const heading = help.version === undefined ? name : `${name}@${help.version}`;
			return help.description === undefined ? heading : `${heading} — ${help.description}`;
		};
		formatCommandHelp = (name, help) => {
			const lines = [
				title(name, help),
				"",
				`Usage: ${synopsis(name, help.args)}${help.options === undefined ? "" : " [options]"}`
			];
			const args = Object.entries(help.args?.shape ?? {}).map(([key, field]) => ({
				label: key,
				description: fieldDescription(field)
			}));
			if (args.length > 0) lines.push("", "Arguments:", ...alignedRows(args));
			const options = help.options === undefined ? [] : optionRows(help.options, help.alias);
			if (options.length > 0) lines.push("", "Options:", ...alignedRows(options));
			if (help.hint !== undefined) lines.push("", help.hint);
			lines.push(...globalOptionsLines(help.globalOptions));
			return lines.join("\n");
		};
		formatCommandListHelp = (name, help) => {
			const lines = [
				title(name, help),
				"",
				`Usage: ${name} <command>`
			];
			if (help.commands.length > 0) lines.push("", "Commands:", ...commandRows(help.commands));
			lines.push(...globalOptionsLines(help.globalOptions));
			return lines.join("\n");
		};
	})))();
}

//#endregion
//#region dist/main/mcpHttpArguments.js
var MCP_HTTP_OPTIONS, MCP_HTTP_ALIAS, MCP_HTTP_COMMAND, MCP_HTTP_DESCRIPTION, renderMcpHttpHelp, invalid, validateMcpHttpCommand;
function init_mcpHttpArguments() {
	return (init_mcpHttpArguments = __esmMin((() => {
		init_help();
		init_mcpHttpEndpoint();
		MCP_HTTP_OPTIONS = z.object({
			http: z.boolean().describe("Serve the MCP catalog over streamable HTTP at /mcp, not stdio"),
			host: z.string().min(1).optional().describe("Listener address; default MCP_HOST, else 127.0.0.1"),
			port: mcpHttpListenerPortSchema.optional().describe("Listener port; default MCP_PORT, else 0 for an ephemeral port"),
			allowedHosts: z.array(z.string()).optional().describe("Host/Origin names a non-loopback bind may serve; repeat or separate names with commas; default MCP_ALLOWED_HOSTS, else the bind is refused"),
			help: z.boolean().optional().describe("Show help")
		});
		MCP_HTTP_ALIAS = { help: "h" };
		MCP_HTTP_COMMAND = "rea mcp --http";
		MCP_HTTP_DESCRIPTION = "Serve the MCP server over streamable HTTP for one local client";
		renderMcpHttpHelp = () => formatCommandHelp(MCP_HTTP_COMMAND, {
			description: MCP_HTTP_DESCRIPTION,
			options: MCP_HTTP_OPTIONS,
			alias: MCP_HTTP_ALIAS,
			hint: "This entry accepts only the options above. The bound URL is logged as one JSON line on stderr."
		});
		invalid = (message) => ({
			ok: false,
			help: false,
			message
		});
		validateMcpHttpCommand = (command) => {
			if (command.kind === "help") return {
				ok: false,
				help: true
			};
			if (command.kind === "invalid") return invalid(command.message);
			const host = command.host?.trim();
			if (host !== undefined && host.length === 0) return invalid("--host must be a non-empty host name or IP address");
			const portText = command.port;
			const port = portText === undefined ? undefined : mcpHttpPortSchema.safeParse(portText);
			if (port !== undefined && !port.success) return invalid(`Invalid --port: ${MCP_HTTP_PORT_CONSTRAINT}`);
			const allowedHostsText = command.allowedHosts.length === 0 ? undefined : command.allowedHosts.join(",");
			const allowedHosts = allowedHostsText === undefined ? undefined : mcpAllowedHostsTextSchema.safeParse(allowedHostsText);
			if (allowedHosts !== undefined && !allowedHosts.success) return invalid(`Invalid --allowed-hosts: ${MCP_ALLOWED_HOSTS_FLAG_CONSTRAINT}`);
			return {
				ok: true,
				...host === undefined ? {} : { host },
				...port === undefined ? {} : { port: port.data },
				...allowedHosts === undefined ? {} : { allowedHosts: allowedHosts.data }
			};
		};
	})))();
}

//#endregion
init_mcpHttpArguments();
export { renderMcpHttpHelp, validateMcpHttpCommand };