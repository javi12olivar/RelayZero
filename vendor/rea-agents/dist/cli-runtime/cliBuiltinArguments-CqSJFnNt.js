import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/result.js
var ok, err;
function init_result() {
	return (init_result = __esmMin((() => {
		ok = (value) => ({
			ok: true,
			value
		});
		err = (error) => ({
			ok: false,
			error
		});
	})))();
}

//#endregion
//#region dist/cliBuiltinArguments.js
var VALUED_OUTPUT_FLAGS, spacedOutputValue, OUTPUT_SWITCHES, CLI_BUILTIN_FLAGS, cliTimingFlagValue, normalizeCliArguments, parseCliGlobalArguments, readMcpAddArguments, classifyMcpAddDiscovery, isProjectScopedAmpRegistration, productionMcpDoctorArguments, FLAGS, declaredSensitiveValues, CLI_COMPLETION_SHELLS, cliCompletionShell, invalidMcpHttpCommand, MCP_HTTP_VALUED_FLAGS, MCP_HTTP_HELP_FLAGS, readMcpHttpOption, readMcpHttpCommand, classifyCliEntrypoint;
function init_cliBuiltinArguments() {
	return (init_cliBuiltinArguments = __esmMin((() => {
		init_result();
		VALUED_OUTPUT_FLAGS = new Set([
			"--format",
			"--filter-output",
			"--columns",
			"--token-limit",
			"--token-offset"
		]);
		spacedOutputValue = (flag, next) => VALUED_OUTPUT_FLAGS.has(flag) && next ? next : undefined;
		OUTPUT_SWITCHES = new Set([
			"--json",
			"--full-output",
			"--token-count",
			"--timings"
		]);
		CLI_BUILTIN_FLAGS = new Set([
			"--full-output",
			"--llms",
			"--llms-full",
			"--mcp",
			"--help",
			"-h",
			"--update",
			"--incur-update-check",
			"--schema",
			"--json",
			"--token-count",
			"--timings"
		]);
		cliTimingFlagValue = (token) => token === "--timings" ? true : token === "--no-timings" ? false : token.startsWith("--timings=") ? token.slice("--timings=".length) === "true" : undefined;
		normalizeCliArguments = (arguments_) => {
			const normalized = [];
			const updates = new Set();
			let rootUpdate = true;
			for (let index = 0; index < arguments_.length; index += 1) {
				const argument = arguments_[index];
				const outputValue = spacedOutputValue(argument, arguments_[index + 1]);
				if (outputValue !== undefined) {
					normalized.push(argument, outputValue);
					index += 1;
					continue;
				}
				const separator = argument.indexOf("=");
				const flag = argument.slice(0, separator);
				if (separator >= 0 && VALUED_OUTPUT_FLAGS.has(flag)) normalized.push(flag, argument.slice(separator + 1));
				else {
					if (argument === "--update") updates.add(normalized.length);
					else if (!OUTPUT_SWITCHES.has(argument) && cliTimingFlagValue(argument) === undefined) rootUpdate = false;
					normalized.push(argument);
				}
			}
			return rootUpdate && updates.size > 0 ? ["update", ...normalized.filter((_, index) => !updates.has(index))] : normalized;
		};
		parseCliGlobalArguments = (arguments_) => {
			const normalized = normalizeCliArguments(arguments_);
			const command = [];
			const commandIndices = [];
			const flags = new Set();
			const outputValues = [];
			for (let index = 0; index < normalized.length; index += 1) {
				const argument = normalized[index];
				const next = normalized[index + 1];
				if (CLI_BUILTIN_FLAGS.has(argument) && argument !== "--timings" || argument === "--version" && (next === undefined || next.startsWith("-"))) {
					flags.add(argument);
					continue;
				}
				if (spacedOutputValue(argument, next) !== undefined) {
					outputValues.push({
						flag: argument,
						index: index + 1
					});
					index += 1;
					continue;
				}
				command.push(argument);
				commandIndices.push(index);
			}
			let globalsEnded = false;
			let timings = false;
			const remaining = [];
			const remainingIndices = [];
			const timingIndices = [];
			command.forEach((token, position) => {
				if (token === "--") globalsEnded = true;
				const value = globalsEnded ? undefined : cliTimingFlagValue(token);
				if (value === undefined) {
					remaining.push(token);
					remainingIndices.push(commandIndices[position]);
					return;
				}
				flags.add(token);
				timings = value;
				timingIndices.push(commandIndices[position]);
			});
			return {
				arguments: normalized,
				command: remaining,
				commandIndices: remainingIndices,
				flags,
				outputValues,
				timingIndices,
				timings
			};
		};
		readMcpAddArguments = (command) => {
			const agents = [];
			let commandText;
			let global = true;
			let missing;
			let unexpected;
			for (let index = 0; index < command.length; index += 1) {
				const token = command[index];
				const flag = token.split("=", 1)[0];
				if (flag === "--agent" || flag === "--command" || flag === "-c") {
					const equals = token.indexOf("=");
					const value = equals < 0 ? command[++index] : token.slice(equals + 1);
					if (value === undefined || value === "" || equals < 0 && value.startsWith("-")) missing ??= {
						kind: "missing_value",
						flag,
						field: flag === "--agent" ? "agent" : "command"
					};
					if (flag === "--agent" && value) agents.push(value);
					if (flag === "--command" || flag === "-c") commandText = value;
				} else if (token === "--no-global") global = false;
				else unexpected ??= {
					kind: "unexpected_argument",
					token
				};
			}
			const failure = missing ?? unexpected;
			return {
				agents,
				commandText,
				global,
				validation: failure === undefined ? ok(undefined) : err(failure)
			};
		};
		classifyMcpAddDiscovery = (flags) => {
			if (flags.has("--help") || flags.has("-h") || flags.has("--llms") || flags.has("--llms-full") || flags.has("--mcp") || flags.has("--update") || flags.has("--incur-update-check")) return "bypass";
			if (flags.has("--version")) return "version";
			if (flags.has("--schema")) return "schema";
			return undefined;
		};
		isProjectScopedAmpRegistration = ({ command, flags }) => {
			if (command[0] !== "mcp" || command[1] !== "add") return false;
			if (classifyMcpAddDiscovery(flags) !== undefined) return false;
			const rest = command.slice(2);
			const { agents, global } = readMcpAddArguments(rest);
			return !global && (agents.length === 0 || agents.includes("amp"));
		};
		productionMcpDoctorArguments = (arguments_) => {
			const global = parseCliGlobalArguments(arguments_);
			if (global.command[0] !== "mcp" || global.command[1] !== "doctor" || global.flags.has("--mcp")) return undefined;
			const removed = new Set([
				global.commandIndices[0],
				global.commandIndices[1],
				...global.timingIndices
			]);
			return {
				arguments: global.arguments.filter((_, index) => !removed.has(index)),
				timings: global.timings
			};
		};
		FLAGS = ["--sensitive-value", "--sensitiveValue"];
		declaredSensitiveValues = (command) => {
			const values = new Set();
			for (let index = 0; index < command.length; index += 1) {
				const token = command[index];
				const flag = FLAGS.find((candidate) => token === candidate || token.startsWith(`${candidate}=`));
				if (flag === undefined) continue;
				if (token !== flag) values.add(token.slice(flag.length + 1));
				else if (index + 1 < command.length) {
					values.add(command[index + 1]);
					index += 1;
				}
			}
			values.delete("");
			return [...values];
		};
		CLI_COMPLETION_SHELLS = [
			"bash",
			"zsh",
			"fish",
			"nushell"
		];
		cliCompletionShell = (environment) => CLI_COMPLETION_SHELLS.find((shell) => shell === environment.COMPLETE);
		invalidMcpHttpCommand = (message) => ({
			kind: "invalid",
			message
		});
		MCP_HTTP_VALUED_FLAGS = new Set([
			"--host",
			"--port",
			"--allowed-hosts"
		]);
		MCP_HTTP_HELP_FLAGS = new Set(["--help", "-h"]);
		readMcpHttpOption = (argument, next) => {
			const separator = argument.indexOf("=");
			return separator === -1 ? {
				flag: argument,
				inline: false,
				value: next?.startsWith("-") ? undefined : next
			} : {
				flag: argument.slice(0, separator),
				inline: true,
				value: argument.slice(separator + 1)
			};
		};
		readMcpHttpCommand = (arguments_) => {
			let mode;
			const values = new Map();
			const allowedHosts = [];
			let problem;
			for (let index = 0; index < arguments_.length; index += 1) {
				const argument = arguments_[index];
				if (MCP_HTTP_HELP_FLAGS.has(argument)) {
					problem ??= { kind: "help" };
					continue;
				}
				if (argument === "--http") {
					mode = "explicit";
					continue;
				}
				const next = arguments_[index + 1];
				const { flag, inline, value } = readMcpHttpOption(argument, next);
				if (MCP_HTTP_VALUED_FLAGS.has(flag)) {
					mode ??= "required";
					if (value === undefined) {
						problem ??= invalidMcpHttpCommand(`Missing value for ${flag}`);
					} else {
						if (flag === "--allowed-hosts") allowedHosts.push(value);
						else values.set(flag, value);
						if (!inline) index += 1;
					}
					continue;
				}
				problem ??= invalidMcpHttpCommand(`Unknown mcp --http argument: ${argument}`);
				if (!argument.startsWith("-") || argument === "--") break;
				if (!inline && spacedOutputValue(flag, next) !== undefined) index += 1;
			}
			if (mode === undefined) return undefined;
			if (problem !== undefined) return problem;
			if (mode === "required") return invalidMcpHttpCommand("--host and --port require --http");
			return {
				kind: "listen",
				host: values.get("--host"),
				port: values.get("--port"),
				allowedHosts
			};
		};
		classifyCliEntrypoint = (arguments_, environment) => {
			if (cliCompletionShell(environment) !== undefined) return { kind: "cli" };
			const entry = arguments_[0];
			if (entry === "mcp" || entry === "--mcp") {
				if (arguments_.length === 1) return { kind: "mcp-stdio" };
				const command = readMcpHttpCommand(arguments_.slice(1));
				if (command !== undefined) return {
					kind: "mcp-http",
					command
				};
			}
			const doctor = productionMcpDoctorArguments(arguments_);
			return doctor === undefined ? { kind: "cli" } : {
				kind: "mcp-doctor",
				...doctor
			};
		};
	})))();
}

//#endregion
export { CLI_BUILTIN_FLAGS, CLI_COMPLETION_SHELLS, OUTPUT_SWITCHES, VALUED_OUTPUT_FLAGS, classifyCliEntrypoint, classifyMcpAddDiscovery, cliCompletionShell, declaredSensitiveValues, err, init_cliBuiltinArguments, init_result, isProjectScopedAmpRegistration, ok, parseCliGlobalArguments, readMcpAddArguments };