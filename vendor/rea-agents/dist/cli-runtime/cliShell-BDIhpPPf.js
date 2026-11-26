import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, ConfigurationError, cancelledBy, errorMessage, init_analysisErrorCore, init_configurationErrors, init_errorMessage, init_explicitSensitiveValues, init_processStart, parseLogLevel, redactExplicitText } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { CLI_BUILTIN_FLAGS, CLI_COMPLETION_SHELLS, OUTPUT_SWITCHES, VALUED_OUTPUT_FLAGS, classifyMcpAddDiscovery, cliCompletionShell, declaredSensitiveValues, err, init_cliBuiltinArguments, init_result, ok, parseCliGlobalArguments, readMcpAddArguments } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { currentClientRegistrationCommand, init_ClientRegistrationIdentity } from "./ClientRegistrationIdentity-DNGzp3ks.js";
import { init_processArgument, processArgumentSchema } from "./processArgument-lxWEHCsa.js";
import { createLogger, init_logger } from "./logger-CYsWF45U.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { CLI_DOCUMENT_OUTPUT_FORMATS, CLI_OUTPUT_FORMATS, formatCliOutput, init_cliOutput, init_cliOutputFormatter, init_jsonLines, jsonLinesErrorRecord, readCliOutputArguments, renderCliDocument, renderCliOutputArgumentError } from "./cliOutput-B7h8Duho.js";
import { init_inputIssueProjection, projectInputIssues } from "./inputIssueProjection-W-zXU1iH.js";
import { declaredOptionType, init_optionFields, isCountOption, optionFlagName } from "./optionFields-BX4HP9xw.js";
import { MCP_DOCTOR_ALIAS, MCP_DOCTOR_OPTIONS, formatCommandHelp, formatCommandListHelp, init_help, init_mcpDoctorOptions } from "./mcpDoctorOptions-msGS6RGq.js";
import { createCliResultOutput, init_cliResultOutput, init_outputEnvelope, init_tokenWindow, renderFailure, sliceTextByTokenWindow } from "./cliResultOutput-BEg_2wkm.js";
import { cliCommand, cliCommands, init_commandRegistry } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliEvidencePublication, withCliEvidencePublication } from "./cliEvidencePublication-B9BG22X_.js";
import { init_cliLogging, rebindLoggedCliFailure } from "./cliLogging-DAqnc-c2.js";
import { init_projectCliAnalysisResult, projectCliCommandOutput } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { cliResultControls, init_cliResultControls, withCliResultControls } from "./cliResultControls-DJQjaQRr.js";
import { AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, RegularFileChangedError, init_AnalysisCleanupLease, init_ArtifactReader, init_ArtifactResourceScope, init_RegularFile, init_resources, sameRegularFileState } from "./resources-B3P64jvH.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { init_cliResources, ownCliProcessResource } from "./cliResources-Bw83MG-j.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { init_RegularFileRead, readRegularFileText, readRegularFileTextSnapshot } from "./RegularFileRead-CRu2Ia6l.js";
import { ClientConfigurationPublication, ClientConfigurationPublicationFailure, init_ClientConfigPath, init_ClientConfigurationCleanup, init_ClientConfigurationPublication, init_ClientRegistrationBackup, isClientConfigurationCleanupFailure, resolveClientConfigTransactionPath, retryClientConfigurationCleanup, writeClientRegistrationBackup } from "./ClientConfigurationPublication-DlZOzFmt.js";
import { PRIVATE_PROFILE_MODES, init_ClientConfigurationTransaction, init_ClientPrivateProfile, privateProfilePermissions, securePrivateDirectory, withClientConfigurationTransaction } from "./ClientConfigurationTransaction-BiZTqZZt.js";
import { appDataRedirection, clientConfigurationValuesEqual, clientEvidencePaths, clientServerForEdit, clientServerPath, effectiveClientServer, fixedProjectLocation, init_ClientConfigurationDocument, init_McpRegistrationLocations, init_MsixPackageStorage, init_SupportedClients, legacyClientServerPath, parseClientConfiguration, present, redirectedWriteBlocker, registrationWriteBlocker, resolveSupportedClients, runningClientRewriteNotice, selectedPath, serializeClientConfiguration, supportedClientDefinition, withClientServers } from "./SupportedClients-C1oeYZNH.js";
import { admitClientConfigurationCandidate, clientConfigurationForWrite, init_ClientConfigurationFiles, init_ClientRegistration, mergeClientConfigurationDocuments, readClientConfigurationFiles, replaceClientRegistrationLauncher } from "./ClientRegistration-BAglyiA5.js";
import { admitClientStdioConnection, init_ClientRegistrationConnection, init_GeminiClientSettings, readClientPolicyBlock } from "./ClientRegistrationConnection-PXU3N0EM.js";
import { homeDirectoryFromEnvironment, init_homeDirectory } from "./homeDirectory-DC_DeJIg.js";
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { z } from "zod";
import { Writable } from "node:stream";
import { estimateTokenCount } from "tokenx";
import { RECORDED_CLI_COMMAND_REGISTRATIONS } from "../recordedCliCommandRegistrations.js";
import { mkdir } from "node:fs/promises";
import { userInfo } from "node:os";
import { spawn } from "node:child_process";

//#region dist/domain/clientRegistrationCommand.js
var parseClientRegistrationCommand, registrationWords;
function init_clientRegistrationCommand() {
	return (init_clientRegistrationCommand = __esmMin((() => {
		init_result();
		init_processArgument();
		parseClientRegistrationCommand = (input) => {
			let words;
			if (typeof input === "string") {
				const parsed = registrationWords(input);
				if (!parsed.ok) return parsed;
				words = parsed.value;
			} else if (Array.isArray(input) && input.every((word) => typeof word === "string")) {
				words = input;
			} else return err({
				kind: "invalid_type",
				message: "The registration command must be command text or string arguments."
			});
			const [command, ...args] = words;
			if (command === undefined || command === "") return err({
				kind: "empty_command",
				message: "The registration command needs a nonempty executable."
			});
			if (words.some((word) => !processArgumentSchema.safeParse(word).success)) return err({
				kind: "invalid_argument",
				message: "The registration executable and arguments cannot contain NUL characters. Remove them before registering the client."
			});
			const source = URL.parse(command);
			if (source?.protocol === "http:" || source?.protocol === "https:") return err({
				kind: "unsupported_transport",
				message: "This command registers stdio launchers. HTTP(S) URLs are not executable commands; configure the remote MCP server in the client's settings instead."
			});
			return ok({
				command,
				args
			});
		};
		registrationWords = (text) => {
			const words = [];
			let word;
			let quote;
			for (const character of text) {
				if (quote !== undefined) {
					if (character === quote) quote = undefined;
					else word = `${word ?? ""}${character}`;
				} else if (character === "'" || character === "\"") {
					quote = character;
					word ??= "";
				} else if (character === " ") {
					if (word !== undefined) words.push(word);
					word = undefined;
				} else word = `${word ?? ""}${character}`;
			}
			if (quote !== undefined) return err({
				kind: "unterminated_quote",
				message: "The registration command has an unclosed quote."
			});
			if (word !== undefined) words.push(word);
			return ok(words);
		};
	})))();
}

//#endregion
//#region dist/cli/argumentErrors.js
var ARGUMENT_GUIDANCE, adbPackageCommands, isAdbSelector, cliArgumentFailure, redactCliCommandFailure, validationUsage, renderCliCommandFailure;
function init_argumentErrors() {
	return (init_argumentErrors = __esmMin((() => {
		init_inputIssueProjection();
		init_explicitSensitiveValues();
		init_cliOutput();
		init_cliOutputFormatter();
		init_help();
		init_optionFields();
		init_outputEnvelope();
		ARGUMENT_GUIDANCE = "REA could not read the command arguments. Check the named argument and its expected type, then try again.";
		adbPackageCommands = new Set([
			"pull-adb-package",
			"inspect-adb-package",
			"uninstall-adb-package",
			"start-adb-app",
			"stop-adb-app"
		]);
		isAdbSelector = (command, field) => command.includes("-adb-") && field === "serial" || adbPackageCommands.has(command) && field === "package" || command === "list-adb-directory" && field === "device-path" || command === "resolve-adb-packages" && field === "query" || ["pull-adb-file", "push-adb-file"].includes(command) && field === "device-path" || command === "start-adb-activity" && [
			"action",
			"component",
			"data-uri"
		].includes(field) || command === "read-adb-setting" && field === "key";
		cliArgumentFailure = (cli, command, failure) => {
			if (failure.kind === "dry_run") return {
				code: "PARSE_ERROR",
				message: failure.message,
				retryable: false
			};
			if (failure.kind !== "validation") return {
				code: "UNKNOWN",
				message: failure.message + (failure.kind === "surplus" ? ` Use '${cli} ${command} --help' for the declared argument shape.` : "")
			};
			return {
				code: "VALIDATION_ERROR",
				message: ARGUMENT_GUIDANCE,
				fieldErrors: failure.fieldErrors.map((field, index) => {
					const issue = failure.issues[index];
					if (!command.includes("-adb-") || issue === undefined || issue.path.length !== 1 || issue.path[0] !== field.path || issue.code !== field.code || !isAdbSelector(command, field.path) || issue.code !== "too_big" && issue.code !== "invalid_format") return field;
					const projected = projectInputIssues([issue], undefined)[0];
					if (projected?.maximum !== undefined) return {
						...field,
						maximum: projected.maximum
					};
					return projected?.expected === "regex" ? {
						...field,
						expected: "regex"
					} : field;
				})
			};
		};
		redactCliCommandFailure = (failure, values) => ({
			...failure,
			message: redactExplicitText(failure.message, values),
			...failure.fieldErrors === undefined ? {} : { fieldErrors: failure.fieldErrors.map((field) => ({
				...field,
				received: redactExplicitText(field.received, values),
				message: redactExplicitText(field.message, values)
			})) }
		});
		validationUsage = (cli, entry, fields) => {
			const lines = fields.map((field) => {
				const [head, ...tail] = field.path.split(".");
				const option = head !== undefined && entry.definition.options?.shape[head] !== undefined;
				const label = option ? `--${optionFlagName(head)}${tail.length === 0 ? "" : `.${tail.join(".")}`}` : `<${field.path}>`;
				return field.missing ? `Error: missing required ${option ? "option" : "argument"} ${label}` : `Error: invalid value for ${label}: ${field.message}`;
			});
			return [
				...lines,
				"See below for usage.",
				"",
				formatCommandHelp(`${cli} ${entry.name}`, {
					...entry.definition,
					globalOptions: { formats: CLI_DOCUMENT_OUTPUT_FORMATS }
				})
			].join("\n");
		};
		renderCliCommandFailure = (failure, input) => {
			const { controls, stdoutIsTerminal, cta } = input;
			const human = stdoutIsTerminal && !controls.formatExplicit;
			if (human && failure.fieldErrors !== undefined) return `${validationUsage(input.cli, input.entry, failure.fieldErrors)}\n`;
			const format = controls.format === "csv" || controls.format === "tsv" ? "json" : controls.format;
			if (controls.tokenCount && format !== "jsonl") return `${estimateTokenCount(formatCliOutput(failure, format))}\n`;
			return renderFailure(failure, {
				command: input.entry.name,
				duration: input.duration
			}, cta, {
				format,
				human,
				fullOutput: controls.fullOutput,
				tokenCount: false,
				tokenLimit: controls.tokenLimit,
				tokenOffset: controls.tokenOffset
			});
		};
	})))();
}

//#endregion
//#region dist/cli/argvParser.js
var parseFailure, fieldOf, isBoolean, isCount, isArray, coerce, hasPath, validateCliInputs, stringField, parseCliArgv;
function init_argvParser() {
	return (init_argvParser = __esmMin((() => {
		init_result();
		init_optionFields();
		parseFailure = (message) => err({
			kind: "parse",
			message
		});
		fieldOf = (schema, name) => schema === undefined ? undefined : schema.shape[name];
		isBoolean = (schema, name) => {
			const field = fieldOf(schema, name);
			return field !== undefined && declaredOptionType(field) instanceof z.ZodBoolean;
		};
		isCount = (schema, name) => {
			const field = fieldOf(schema, name);
			return field !== undefined && isCountOption(field);
		};
		isArray = (schema, name) => {
			const field = fieldOf(schema, name);
			return field !== undefined && declaredOptionType(field) instanceof z.ZodArray;
		};
		coerce = (value, schema, name) => {
			const field = fieldOf(schema, name);
			if (field === undefined || typeof value !== "string") return value;
			const type = declaredOptionType(field);
			if (type instanceof z.ZodNumber) return Number(value);
			if (type instanceof z.ZodBoolean) return value === "true";
			return value;
		};
		hasPath = (data, path) => {
			let current = data;
			for (const part of path) {
				if (typeof current !== "object" || current === null) return false;
				if (!(part in current)) return false;
				current = current[part];
			}
			return true;
		};
		validateCliInputs = (schema, data) => {
			const parsed = schema.safeParse(data);
			if (parsed.success) return ok(parsed.data);
			const { issues } = parsed.error;
			return err({
				kind: "validation",
				issues,
				message: issues.map(({ message }) => message).join("; ") || "Validation failed",
				fieldErrors: issues.map((issue) => ({
					code: issue.code,
					missing: !hasPath(data, issue.path),
					path: issue.path.join("."),
					expected: stringField(issue, "expected"),
					received: stringField(issue, "received"),
					message: issue.message
				}))
			});
		};
		stringField = (issue, key) => Reflect.get(issue, key) ?? "";
		parseCliArgv = (argv, schemas) => {
			const { args: argsSchema, options: optionsSchema, alias } = schemas;
			const known = new Set(optionsSchema === undefined ? [] : Object.keys(optionsSchema.shape));
			const camelOf = new Map([...known].flatMap((name) => optionFlagName(name) === name ? [] : [[optionFlagName(name), name]]));
			const optionName = (raw) => {
				const name = camelOf.get(raw) ?? raw;
				return known.has(name) ? name : undefined;
			};
			const aliasName = new Map(Object.entries(alias ?? {}).map(([name, short]) => [short, name]));
			const positionals = [];
			const options = {};
			let invalidDryRun = false;
			const set = (name, value) => {
				if (name === "dryRun" && isBoolean(optionsSchema, name)) invalidDryRun ||= value !== "true" && value !== "false";
				if (!isArray(optionsSchema, name)) {
					options[name] = value;
					return;
				}
				const existing = options[name];
				if (Array.isArray(existing)) existing.push(value);
				else options[name] = [value];
			};
			for (let index = 0; index < argv.length; index += 1) {
				const token = argv[index];
				if (token.startsWith("--no-") && token.length > 5) {
					const name = optionName(token.slice(5));
					if (name === undefined) return parseFailure(`Unknown flag: ${token}`);
					options[name] = false;
				} else if (token.startsWith("--")) {
					const equals = token.indexOf("=");
					if (equals !== -1) {
						const raw = token.slice(2, equals);
						const name = optionName(raw);
						if (name === undefined) return parseFailure(`Unknown flag: --${raw}`);
						set(name, token.slice(equals + 1));
						continue;
					}
					const name = optionName(token.slice(2));
					if (name === undefined) return parseFailure(`Unknown flag: ${token}`);
					if (isCount(optionsSchema, name)) {
						options[name] = (options[name] ?? 0) + 1;
						continue;
					}
					if (isBoolean(optionsSchema, name)) {
						options[name] = true;
						continue;
					}
					const value = argv[index + 1];
					if (value === undefined) return parseFailure(`Missing value for flag: ${token}`);
					set(name, value);
					index += 1;
				} else if (token.startsWith("-") && token.length >= 2) {
					const shorts = token.slice(1);
					for (const [position, short] of [...shorts].entries()) {
						const name = aliasName.get(short);
						if (name === undefined) return parseFailure(`Unknown flag: -${short}`);
						if (isCount(optionsSchema, name)) {
							options[name] = (options[name] ?? 0) + 1;
							continue;
						}
						if (isBoolean(optionsSchema, name)) {
							options[name] = true;
							continue;
						}
						if (position !== shorts.length - 1) return parseFailure(`Non-boolean flag -${short} must be last in a stacked alias`);
						const value = argv[index + 1];
						if (value === undefined) return parseFailure(`Missing value for flag: -${short}`);
						set(name, value);
						index += 1;
					}
				} else {
					positionals.push(token);
				}
			}
			if (invalidDryRun) return err({
				kind: "dry_run",
				message: "Invalid --dry-run value; use true or false."
			});
			const keys = Object.keys(argsSchema?.shape ?? {});
			const last = keys.at(-1);
			const variadic = last !== undefined && isArray(argsSchema, last);
			if (!variadic && positionals.length > keys.length) return err({
				kind: "surplus",
				message: `Unexpected positional arguments: ${positionals.slice(keys.length).map((value) => JSON.stringify(value)).join(" ")}.`
			});
			const rawArgs = {};
			if (argsSchema !== undefined) {
				for (const [position, key] of keys.entries()) {
					if (isArray(argsSchema, key)) {
						if (position !== keys.length - 1) throw new Error(`Variadic arg "${key}" must be the last key in the args schema`);
						const rest = positionals.slice(position);
						if (rest.length > 0) rawArgs[key] = rest;
					} else if (positionals[position] !== undefined) rawArgs[key] = positionals[position];
				}
			}
			const parsedArgs = argsSchema === undefined ? ok({}) : validateCliInputs(argsSchema, rawArgs);
			if (!parsedArgs.ok) return parsedArgs;
			if (optionsSchema === undefined) return ok({
				args: parsedArgs.value,
				options: {}
			});
			for (const [name, value] of Object.entries(options)) options[name] = coerce(value, optionsSchema, name);
			const parsedOptions = validateCliInputs(optionsSchema, options);
			return parsedOptions.ok ? ok({
				args: parsedArgs.value,
				options: parsedOptions.value
			}) : parsedOptions;
		};
	})))();
}

//#endregion
//#region dist/cli/updateNotice.js
var UPDATE_CHECK_FLAG, REFRESH_INTERVAL_MS, REGISTRY_TIMEOUT_MS, variable, SEMVER, parseVersion, isNewerVersion, notificationsDisabled, isPackageName, providesCli, runningPackage, updatePackage, cacheFile, readCache, writeCache, scheduleRefresh, availableUpdate, updateNoticeCta, refreshUpdateCache;
function init_updateNotice() {
	return (init_updateNotice = __esmMin((() => {
		UPDATE_CHECK_FLAG = "--incur-update-check";
		REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1e3;
		REGISTRY_TIMEOUT_MS = 1e4;
		variable = (environment, name) => environment.variables[environment.platform === "win32" ? name.toUpperCase() : name];
		SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/u;
		parseVersion = (version) => {
			const match = SEMVER.exec(version);
			if (match === null) return undefined;
			const prerelease = [];
			for (const identifier of match[4]?.split(".") ?? []) {
				if (!/^\d+$/u.test(identifier)) prerelease.push(identifier);
				else if (identifier.length > 1 && identifier.startsWith("0")) return undefined;
				else prerelease.push(BigInt(identifier));
			}
			return {
				core: [
					BigInt(match[1]),
					BigInt(match[2]),
					BigInt(match[3])
				],
				prerelease
			};
		};
		isNewerVersion = (candidate, current) => {
			const next = parseVersion(candidate);
			const now = parseVersion(current);
			if (next === undefined || now === undefined) return false;
			for (let index = 0; index < 3; index += 1) {
				if (next.core[index] > now.core[index]) return true;
				if (next.core[index] < now.core[index]) return false;
			}
			if (next.prerelease.length === 0) return now.prerelease.length > 0;
			if (now.prerelease.length === 0) return false;
			const length = Math.max(next.prerelease.length, now.prerelease.length);
			for (let index = 0; index < length; index += 1) {
				const left = next.prerelease[index];
				const right = now.prerelease[index];
				if (left === undefined) return false;
				if (right === undefined) return true;
				if (left === right) continue;
				if (typeof left === "bigint" && typeof right === "string") return false;
				if (typeof left === "string" && typeof right === "bigint") return true;
				return left > right;
			}
			return false;
		};
		notificationsDisabled = (environment) => {
			const ci = variable(environment, "CI");
			return Boolean(variable(environment, "NO_UPDATE_NOTIFIER")) || variable(environment, "npm_config_update_notifier") === "false" || Boolean(ci && ci !== "false");
		};
		isPackageName = (name) => /^(?:@[A-Za-z0-9][A-Za-z0-9._~-]*\/)?[A-Za-z0-9][A-Za-z0-9._~-]*$/u.test(name);
		providesCli = (metadata, cli) => {
			if (metadata.name === cli) return true;
			const { bin, name } = metadata;
			if (typeof bin === "object" && bin !== null && cli in bin) return true;
			return typeof bin === "string" && typeof name === "string" && name.split("/").pop() === cli;
		};
		runningPackage = (cli) => {
			const script = process.argv[1];
			if (!script) return undefined;
			let directory;
			try {
				directory = dirname(realpathSync(script));
			} catch {
				return undefined;
			}
			for (;;) {
				try {
					const metadata = JSON.parse(readFileSync(join(directory, "package.json"), "utf8"));
					if (typeof metadata.name === "string" && typeof metadata.version === "string" && providesCli(metadata, cli)) return {
						name: metadata.name,
						version: metadata.version
					};
				} catch {}
				const parent = dirname(directory);
				if (parent === directory) return undefined;
				directory = parent;
			}
		};
		updatePackage = (cli, version) => {
			const running = runningPackage(cli);
			return running === undefined || !isPackageName(running.name) ? undefined : {
				name: running.name,
				current: version
			};
		};
		cacheFile = (environment, packageName) => {
			let root = variable(environment, "XDG_CACHE_HOME");
			if (!root) {
				let home = variable(environment, environment.platform === "win32" ? "USERPROFILE" : "HOME");
				if (home === undefined) {
					try {
						home = userInfo().homedir;
					} catch {
						return undefined;
					}
				}
				root = join(home, ".cache");
			}
			return join(root, "incur", "updates", `${encodeURIComponent(packageName)}.json`);
		};
		readCache = (file) => {
			try {
				const value = JSON.parse(readFileSync(file, "utf8"));
				if (typeof value.checkedAt !== "number") return undefined;
				if (value.latest !== undefined && typeof value.latest !== "string") return undefined;
				return value;
			} catch {
				return undefined;
			}
		};
		writeCache = (file, cache) => {
			mkdirSync(dirname(file), { recursive: true });
			writeFileSync(file, `${JSON.stringify(cache)}\n`);
		};
		scheduleRefresh = (file, checkedAt, latest, environment) => {
			const script = process.argv[1];
			if (!script) return;
			let selfExecutable = script.startsWith("/$bunfs/");
			try {
				selfExecutable ||= realpathSync(script) === realpathSync(process.execPath);
			} catch {}
			const args = selfExecutable ? [UPDATE_CHECK_FLAG] : [
				...process.execArgv,
				script,
				UPDATE_CHECK_FLAG
			];
			try {
				writeCache(file, {
					checkedAt,
					...latest ? { latest } : {}
				});
				const child = spawn(process.execPath, args, {
					detached: true,
					stdio: "ignore",
					env: environment.variables
				});
				child.once("error", () => {});
				child.unref();
			} catch {}
		};
		availableUpdate = (cli, version, environment) => {
			if (notificationsDisabled(environment)) return undefined;
			const target = updatePackage(cli, version);
			if (target === undefined) return undefined;
			const file = cacheFile(environment, target.name);
			if (file === undefined) return undefined;
			const cached = readCache(file);
			const checkedAt = Date.now();
			if (cached === undefined || checkedAt - cached.checkedAt >= REFRESH_INTERVAL_MS) scheduleRefresh(file, checkedAt, cached?.latest, environment);
			if (!cached?.latest || !isNewerVersion(cached.latest, target.current)) return undefined;
			return {
				name: target.name,
				current: target.current,
				latest: cached.latest
			};
		};
		updateNoticeCta = (cli, update) => ({
			description: `Update available for ${update.name}:`,
			commands: [{
				command: `${cli} --update`,
				description: `upgrade from ${update.current} to ${update.latest}`
			}]
		});
		refreshUpdateCache = async (cli, version, environment) => {
			try {
				const target = updatePackage(cli, version);
				if (target === undefined) return;
				const file = cacheFile(environment, target.name);
				if (file === undefined) return;
				const registry = variable(environment, "npm_config_registry") || "https://registry.npmjs.org";
				const response = await fetch(new URL(encodeURIComponent(target.name), registry.endsWith("/") ? registry : `${registry}/`), {
					headers: { accept: "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*" },
					signal: AbortSignal.timeout(REGISTRY_TIMEOUT_MS)
				});
				if (!response.ok) return;
				const metadata = await response.json();
				const latest = metadata["dist-tags"]?.latest;
				if (typeof latest !== "string" || parseVersion(latest) === undefined) return;
				writeCache(file, {
					checkedAt: Date.now(),
					latest
				});
			} catch {}
		};
	})))();
}

//#endregion
//#region dist/cli/runCliCommand.js
var writer, exit, destinationFor, runCliCommand;
function init_runCliCommand() {
	return (init_runCliCommand = __esmMin((() => {
		init_cliBuiltinArguments();
		init_cliOutput();
		init_identity();
		init_errorMessage();
		init_argumentErrors();
		init_argvParser();
		init_commandRegistry();
		init_cliEvidencePublication();
		init_cliLogging();
		init_projectCliAnalysisResult();
		init_cliResultControls();
		init_cliResultOutput();
		init_updateNotice();
		writer = (options) => options.stdout ?? ((text) => {
			process.stdout.write(text);
		});
		exit = (options, code) => {
			if (options.exit !== undefined) options.exit(code);
			else process.exitCode = code;
		};
		destinationFor = (options) => {
			if (options.stdout === undefined) return process.stdout;
			const destination = new Writable({ write(chunk, _encoding, done) {
				try {
					options.stdout(chunk.toString("utf8"));
					done();
				} catch (cause) {
					done(cause instanceof Error ? cause : new Error(String(cause)));
				}
			} });
			Object.defineProperty(destination, "isTTY", { value: process.stdout.isTTY === true });
			return destination;
		};
		runCliCommand = async (cli, global, options, environment, providedOutput) => {
			const controls = readCliOutputArguments(global);
			if (!controls.validation.ok) {
				writer(options)(renderCliOutputArgumentError(controls.validation));
				exit(options, 1);
				return;
			}
			const entry = cliCommand(cli, global.command[0] ?? "");
			if (entry === undefined) {
				writer(options)("Start REA's MCP server with 'rea mcp' through the public executable.\n");
				exit(options, 1);
				return;
			}
			const output = providedOutput ?? createCliResultOutput(controls, destinationFor(options));
			if (output === undefined) throw new Error("Admitted CLI output has no output owner");
			output.begin(controls);
			const started = performance.now();
			const human = process.stdout.isTTY === true && !controls.formatExplicit;
			const update = human ? availableUpdate(cli.name, PRODUCT_IDENTITY.packageVersion, environment) : undefined;
			const cta = update === undefined ? undefined : updateNoticeCta(cli.name, update);
			const sensitive = entry.definition.options?.shape.sensitiveValue === undefined ? [] : declaredSensitiveValues(global.command);
			const report = (failure) => {
				writer(options)(renderCliCommandFailure(redactCliCommandFailure(failure, sensitive), {
					cli: cli.name,
					entry,
					duration: `${Math.round(performance.now() - started)}ms`,
					stdoutIsTerminal: process.stdout.isTTY === true,
					controls,
					cta
				}));
				exit(options, 1);
			};
			try {
				const parsed = parseCliArgv(global.command.slice(1), entry.definition);
				if (!parsed.ok) {
					report(cliArgumentFailure(cli.name, entry.name, parsed.error));
					return;
				}
				await withCliEvidencePublication(() => withCliResultControls(async () => {
					const rawValue = await entry.definition.run({
						...parsed.value,
						formatExplicit: controls.formatExplicit
					});
					const value = projectCliCommandOutput(rawValue, {
						operations: entry.operations,
						commands: cliCommands(cli),
						cliName: cli.name,
						recordedCommands: RECORDED_CLI_COMMAND_REGISTRATIONS
					});
					rebindLoggedCliFailure(rawValue, value);
					if (!output.handled) await output.write(value, {
						command: entry.name,
						duration: `${Math.round(performance.now() - started)}ms`,
						renderOutput: !human || entry.definition.outputPolicy !== "agent-only",
						collectCliControls: cliResultControls,
						cta
					});
				}));
				if (output.error !== undefined) exit(options, 1);
			} catch (cause) {
				if (output.handled) throw cause;
				report({
					code: "UNKNOWN",
					message: errorMessage(cause)
				});
			} finally {
				if (providedOutput === undefined) await output.finish();
				if (global.timings) process.stderr.write(`${JSON.stringify({ rea_timings: {
					version: 1,
					command_ms: Math.round(performance.now() - started)
				} })}\n`);
			}
		};
	})))();
}

//#endregion
//#region dist/cli/completionProtocol.js
var identifier, bashCompletionScript, zshCompletionScript, fishCompletionScript, nushellCompletionScript, completionScript, isFlagOption, enumValues, optionKey, flagCandidates, valueCandidates, completeWords, formatCompletions;
function init_completionProtocol() {
	return (init_completionProtocol = __esmMin((() => {
		init_optionFields();
		identifier = (name) => name.replace(/[^a-zA-Z0-9_]/gu, "_");
		bashCompletionScript = (name) => {
			const id = identifier(name);
			const command = `'${name.replaceAll("'", "'\\''")}'`;
			return `_incur_complete_${id}() {
    local IFS=$'\\013'
    local _COMPLETE_INDEX=\${COMP_CWORD}
    local _completions _output
    if ! _output=$(
        export COMPLETE="bash"
        export _COMPLETE_INDEX="$_COMPLETE_INDEX"
        ${command} -- "\${COMP_WORDS[@]}"
    ); then
        unset COMPREPLY
        return
    fi
    # Split the protocol records without expanding pathname patterns.
    read -r -d '' -a _completions < <(printf '%s\\0' "$_output")
    local _nospace=false
    local _nospace_marker=$'\\001'
    local _c
    COMPREPLY=()
    for _c in "\${_completions[@]}"; do
        if [[ "$_c" == *"$_nospace_marker" ]]; then
            _nospace=true
            COMPREPLY+=("\${_c%"$_nospace_marker"}")
        else
            COMPREPLY+=("$_c")
        fi
    done
    if [[ $_nospace == true ]] && type compopt >/dev/null 2>&1; then
        compopt -o nospace
    fi
    return 0
}
complete -o default -o bashdefault -o nosort -F _incur_complete_${id} ${command} 2>/dev/null ||
    complete -o default -o bashdefault -F _incur_complete_${id} ${command}`;
		};
		zshCompletionScript = (name) => {
			const id = identifier(name);
			return `#compdef ${name}
_incur_complete_${id}() {
    local completions=("\${(@f)$(
        export _COMPLETE_INDEX=$(( CURRENT - 1 ))
        export COMPLETE="zsh"
        "${name}" -- "\${words[@]}" 2>/dev/null
    )}")
    if [[ -n $completions ]]; then
        _describe 'values' completions -S ''
    fi
}
compdef _incur_complete_${id} ${name}`;
		};
		fishCompletionScript = (name) => `complete --keep-order --exclusive --command ${name} \\
    --arguments "(COMPLETE=fish ${name} -- (commandline --current-process --tokenize --cut-at-cursor) (commandline --current-token))"`;
		nushellCompletionScript = (name) => {
			const id = identifier(name);
			return `# External completer for ${name}
# Add to $env.config.completions.external.completer or use in a dispatch completer.
let _incur_complete_${id} = {|spans|
    COMPLETE=nushell ${name} -- ...$spans | from json
}`;
		};
		completionScript = (shell, name) => {
			switch (shell) {
				case "bash": return bashCompletionScript(name);
				case "zsh": return zshCompletionScript(name);
				case "fish": return fishCompletionScript(name);
				case "nushell": return nushellCompletionScript(name);
			}
		};
		isFlagOption = (field) => isCountOption(field) || declaredOptionType(field) instanceof z.ZodBoolean;
		enumValues = (field) => {
			const type = declaredOptionType(field);
			return type instanceof z.ZodEnum ? type.options.map((value) => String(value)) : undefined;
		};
		optionKey = (token, options, alias) => {
			const keys = Object.keys(options.shape);
			if (token.startsWith("--")) {
				const raw = token.slice(2);
				return keys.find((key) => optionFlagName(key) === raw) ?? (keys.includes(raw) ? raw : undefined);
			}
			if (token.length === 2 && alias !== undefined) return Object.entries(alias).find(([, short]) => short === token[1])?.[0];
			return undefined;
		};
		flagCandidates = (current, options, alias, candidates) => {
			const shape = options.shape;
			const add = (value, key) => {
				if (value.startsWith(current) && !candidates.some((candidate) => candidate.value === value)) candidates.push({
					value,
					description: shape[key]?.description
				});
			};
			for (const key of Object.keys(shape)) add(`--${optionFlagName(key)}`, key);
			for (const [key, short] of Object.entries(alias ?? {})) add(`-${short}`, key);
		};
		valueCandidates = (previous, current, options, alias) => {
			const key = optionKey(previous, options, alias);
			if (key === undefined) return undefined;
			const field = options.shape[key];
			const values = enumValues(field);
			if (values !== undefined) return values.filter((value) => value.startsWith(current)).map((value) => ({ value }));
			return isFlagOption(field) ? undefined : [];
		};
		completeWords = (commands, words, index, globals) => {
			const current = words[index] ?? "";
			let scope = {
				commands,
				leaf: undefined
			};
			for (const token of words.slice(0, index)) {
				if (token.startsWith("-")) continue;
				let entry = scope.commands.get(token);
				if (entry?._alias === true && entry.target !== undefined) entry = scope.commands.get(entry.target);
				if (entry === undefined) continue;
				if (entry._group === true && entry.commands !== undefined) scope = {
					commands: entry.commands,
					leaf: entry.root
				};
				else {
					scope = {
						commands: new Map(),
						leaf: entry
					};
					break;
				}
			}
			const { leaf } = scope;
			const candidates = [];
			if (current.startsWith("-")) {
				if (leaf?.options !== undefined) flagCandidates(current, leaf.options, leaf.alias, candidates);
				flagCandidates(current, globals.schema, globals.alias, candidates);
				return candidates;
			}
			const previous = index > 0 ? words[index - 1] : "";
			if (previous.startsWith("-")) {
				const values = (leaf?.options === undefined ? undefined : valueCandidates(previous, current, leaf.options, leaf.alias)) ?? valueCandidates(previous, current, globals.schema, globals.alias);
				if (values !== undefined) return values;
			}
			for (const [name, entry] of scope.commands) if (entry._alias !== true && name.startsWith(current)) candidates.push({
				value: name,
				description: entry.description,
				...entry._group === true ? { noSpace: true } : {}
			});
			return candidates;
		};
		formatCompletions = (shell, candidates) => {
			switch (shell) {
				case "bash": return candidates.map(({ value, noSpace }) => noSpace ? `${value}\x01` : value).join("\v");
				case "zsh": return candidates.map(({ value, description }) => {
					const escaped = value.replaceAll(":", "\\:");
					return description ? `${escaped}:${description}` : escaped;
				}).join("\n");
				case "fish": return candidates.map(({ value, description }) => description ? `${value}\t${description}` : value).join("\n");
				case "nushell": return JSON.stringify(candidates.map(({ value, description }) => description ? {
					value,
					description
				} : { value }));
			}
		};
	})))();
}

//#endregion
//#region dist/cli/commandManifests.js
var MANIFEST_VERSION, commandInputJsonSchema, tableType, shape, signature, formatLlmsIndex, commandBody, formatLlmsFull, llmsIndexManifest, llmsFullManifest, commandSchemaDocument;
function init_commandManifests() {
	return (init_commandManifests = __esmMin((() => {
		init_optionFields();
		MANIFEST_VERSION = "incur.v1";
		commandInputJsonSchema = (schema) => {
			const result = z.toJSONSchema(schema, {
				unrepresentable: "any",
				override: (context) => {
					const type = context.zodSchema._zod.def.type;
					if (type === "bigint" || type === "date") context.jsonSchema.type = "string";
				}
			});
			delete result.$schema;
			return result;
		};
		tableType = (property) => {
			const type = property?.type;
			if (typeof type !== "string") return "unknown";
			return type === "integer" ? "number" : type;
		};
		shape = (schema) => schema.shape;
		signature = (cli, { name, definition }) => {
			const base = `${cli} ${name}`;
			if (definition.args === undefined) return base;
			const json = commandInputJsonSchema(definition.args);
			const required = new Set(json.required ?? []);
			const names = Object.keys(shape(definition.args)).map((key) => {
				const label = json.properties?.[key]?.type === "array" ? `${key}...` : key;
				return required.has(key) ? `<${label}>` : `[${label}]`;
			});
			return `${base} ${names.join(" ")}`;
		};
		formatLlmsIndex = (cli, commands, description) => [
			`# ${cli}`,
			"",
			description,
			"",
			"| Command | Description |",
			"|---------|-------------|",
			...commands.map((command) => `| \`${signature(cli, command)}\` | ${command.definition.description ?? ""} |`),
			"",
			`Run \`${cli} --llms-full\` for full manifest. Run \`${cli} <command> --schema\` for argument details.`
		].join("\n");
		commandBody = (cli, { name, definition }) => {
			const heading = definition.description === undefined || definition.description === "" ? `# ${cli} ${name}` : `# ${cli} ${name}\n\n${definition.description}`;
			const sections = [heading];
			if (definition.args !== undefined) {
				const json = commandInputJsonSchema(definition.args);
				const required = new Set(json.required ?? []);
				const rows = Object.entries(shape(definition.args)).map(([key, field]) => `| \`${key}\` | \`${tableType(json.properties?.[key])}\` | ${required.has(key) ? "yes" : "no"} | ${field.description ?? ""} |`);
				sections.push(`## Arguments\n\n| Name | Type | Required | Description |\n|------|------|----------|-------------|\n${rows.join("\n")}`);
			}
			if (definition.options !== undefined) {
				const json = commandInputJsonSchema(definition.options);
				const rows = Object.entries(shape(definition.options)).map(([key, field]) => {
					const property = json.properties?.[key];
					const fallback = property?.default === undefined ? "" : String(property.default);
					const text = field.description ?? "";
					const description = property?.deprecated === true ? `**Deprecated.** ${text}` : text;
					return `| \`--${optionFlagName(key)}\` | \`${tableType(property)}\` | ${fallback === "" ? "" : `\`${fallback}\``} | ${description} |`;
				});
				sections.push(`## Options\n\n| Flag | Type | Default | Description |\n|------|------|---------|-------------|\n${rows.join("\n")}`);
			}
			return sections.join("\n\n");
		};
		formatLlmsFull = (cli, commands) => commands.map((command) => commandBody(cli, command)).join("\n\n");
		llmsIndexManifest = (commands, globals) => ({
			version: MANIFEST_VERSION,
			commands: commands.map(({ name, definition }) => ({
				name,
				...definition.description ? { description: definition.description } : {}
			})),
			globals: commandInputJsonSchema(globals)
		});
		llmsFullManifest = (commands, globals) => ({
			version: MANIFEST_VERSION,
			commands: commands.map(({ name, definition }) => ({
				name,
				...definition.description ? { description: definition.description } : {},
				...definition.args === undefined && definition.options === undefined ? {} : { schema: {
					...definition.args === undefined ? {} : { args: commandInputJsonSchema(definition.args) },
					...definition.options === undefined ? {} : { options: commandInputJsonSchema(definition.options) }
				} }
			})),
			globals: commandInputJsonSchema(globals)
		});
		commandSchemaDocument = ({ definition }, globals) => ({
			...definition.args === undefined ? {} : { args: commandInputJsonSchema(definition.args) },
			...definition.options === undefined ? {} : { options: commandInputJsonSchema(definition.options) },
			globals: commandInputJsonSchema(globals)
		});
	})))();
}

//#endregion
//#region dist/cli/commandSuggestion.js
var editDistance, suggestCommand;
function init_commandSuggestion() {
	return (init_commandSuggestion = __esmMin((() => {
		editDistance = (left, right) => {
			const row = Array.from({ length: right.length + 1 }, (_, index) => index);
			for (let i = 1; i <= left.length; i += 1) {
				let diagonal = row[0];
				row[0] = i;
				for (let j = 1; j <= right.length; j += 1) {
					const above = row[j];
					row[j] = left[i - 1] === right[j - 1] ? diagonal : 1 + Math.min(diagonal, above, row[j - 1]);
					diagonal = above;
				}
			}
			return row[right.length];
		};
		suggestCommand = (input, candidates) => {
			const threshold = input.length <= 4 ? 2 : Math.floor(input.length / 2);
			const lower = input.toLowerCase();
			let best;
			let bestScore = Infinity;
			for (const candidate of candidates) {
				const name = candidate.toLowerCase();
				const distance = editDistance(lower, name);
				const score = name.startsWith(lower) && name !== lower ? distance : name.includes(lower) ? 100 + distance : distance <= threshold ? 200 + distance : undefined;
				if (score !== undefined && score < bestScore) {
					bestScore = score;
					best = candidate;
				}
			}
			return best;
		};
	})))();
}

//#endregion
//#region dist/cli/unknownCommandReply.js
var PLAIN_SHELL_WORD, unknownCommandReply;
function init_unknownCommandReply() {
	return (init_unknownCommandReply = __esmMin((() => {
		init_cliBuiltinArguments();
		init_explicitSensitiveValues();
		PLAIN_SHELL_WORD = /^(?!=)[\w./+=:,-]+$/u;
		unknownCommandReply = ({ name, scope = [], global, commandIndex, suggestion, additionalCommands = [] }) => {
			const sensitive = declaredSensitiveValues(global.command);
			const text = (value) => redactExplicitText(value, sensitive);
			const parent = [name, ...scope].join(" ");
			const unknown = global.command[commandIndex];
			const corrected = [name, ...global.arguments.map((token, index) => index === global.commandIndices[commandIndex] ? suggestion : token)];
			const replayable = suggestion !== undefined && corrected.every((token) => token !== undefined && PLAIN_SHELL_WORD.test(token) && text(token) === token);
			const commands = [...replayable ? [{ command: corrected.join(" ") }] : [], {
				command: `${parent} --help`,
				description: "see all available commands"
			}];
			return {
				command: text(unknown),
				failure: {
					code: "COMMAND_NOT_FOUND",
					message: text(`'${unknown}' is not a command for '${parent}'.${suggestion === undefined ? "" : ` Did you mean '${suggestion}'?`}`)
				},
				cta: {
					description: text(commands.length === 1 ? "Suggested command:" : "Suggested commands:"),
					commands: [...commands, ...additionalCommands].map(({ command, description }) => ({
						command: text(command),
						...description === undefined ? {} : { description: text(description) }
					}))
				}
			};
		};
	})))();
}

//#endregion
//#region dist/contracts/mcpRegistration.js
var mcpRegistrationOptionsSchema, permissionsSchema, labels, clientOutcomeSchema, mcpRegistrationReportSchema;
function init_mcpRegistration() {
	return (init_mcpRegistration = __esmMin((() => {
		init_processArgument();
		mcpRegistrationOptionsSchema = z.object({
			agent: z.array(z.string()).optional().describe("Select client IDs or documented aliases; repeat --agent to select more than one."),
			command: processArgumentSchema.min(1).optional().describe("Stdio launcher text: space-separated words, single/double quote fragments, literal backslashes. Empty quoted arguments are preserved; NUL is rejected. HTTP(S) URL sources are unsupported; configure remote transports in client settings."),
			noGlobal: z.boolean().optional().describe("Write only project-scoped client settings; reject selections requiring global writes.")
		});
		permissionsSchema = z.discriminatedUnion("kind", [z.object({
			kind: z.literal("verified_posix_modes"),
			directoryMode: z.literal(448),
			fileMode: z.literal(384)
		}), z.object({
			kind: z.literal("requested_windows_modes"),
			requestedDirectoryMode: z.literal(448),
			requestedFileMode: z.literal(384),
			aclVerification: z.literal("unavailable")
		})]);
		labels = {
			client: z.string(),
			config_path: z.string(),
			scope: z.enum(["global", "project"]),
			permissions: permissionsSchema.optional()
		};
		clientOutcomeSchema = z.discriminatedUnion("status", [
			z.object({
				...labels,
				status: z.literal("configured"),
				backup_path: z.string().optional()
			}),
			z.object({
				...labels,
				status: z.literal("unchanged")
			}),
			z.object({
				...labels,
				status: z.literal("failed"),
				error: z.looseObject({
					code: z.string(),
					message: z.string(),
					reason: z.string()
				})
			}),
			z.object({
				...labels,
				status: z.literal("not_started")
			})
		]);
		mcpRegistrationReportSchema = z.object({
			name: z.literal("rea"),
			command: z.string().min(1),
			args: z.array(z.string()),
			ok: z.boolean(),
			clients: z.array(clientOutcomeSchema)
		});
	})))();
}

//#endregion
//#region dist/cli/mcpBuiltinCommands.js
var MCP_SUBCOMMANDS, PRECEDING_BUILTIN_FLAGS, reportUnknownMcpSubcommand;
function init_mcpBuiltinCommands() {
	return (init_mcpBuiltinCommands = __esmMin((() => {
		init_mcpRegistration();
		init_cliOutput();
		init_jsonLines();
		init_outputEnvelope();
		init_commandSuggestion();
		init_unknownCommandReply();
		MCP_SUBCOMMANDS = new Map([["add", {
			description: "Register as MCP server",
			alias: { command: "c" },
			options: mcpRegistrationOptionsSchema
		}], ["doctor", { description: "Validate MCP server startup and tool listing" }]]);
		PRECEDING_BUILTIN_FLAGS = new Set([
			"--incur-update-check",
			"--update",
			"--llms",
			"--llms-full",
			"--mcp"
		]);
		reportUnknownMcpSubcommand = (name, global, options) => {
			const started = performance.now();
			const { arguments: arguments_, command } = global;
			const [entry, subcommand] = command;
			const outputValues = new Set(global.outputValues.map(({ index }) => index));
			if (entry !== "mcp" || !subcommand || MCP_SUBCOMMANDS.has(subcommand) || arguments_.some((token, index) => !outputValues.has(index) && PRECEDING_BUILTIN_FLAGS.has(token))) return false;
			const output = readCliOutputArguments(global);
			if (!output.validation.ok) return false;
			const suggestion = output.formatExplicit ? [...MCP_SUBCOMMANDS.keys()].find((candidate) => candidate.startsWith(subcommand.toLowerCase())) : suggestCommand(subcommand, MCP_SUBCOMMANDS.keys());
			const { command: displayCommand, cta, failure } = unknownCommandReply({
				name,
				scope: ["mcp"],
				global,
				commandIndex: 1,
				suggestion
			});
			const diagnostic = {
				...failure,
				cta
			};
			const format = output.format === "csv" || output.format === "tsv" ? "json" : output.format;
			(options.stdout ?? ((value) => process.stdout.write(value)))(output.formatExplicit ? renderCliDocument(format === "jsonl" ? jsonLinesErrorRecord(diagnostic) : diagnostic, format, process.stdout.isTTY === true) : renderFailure(failure, {
				command: displayCommand,
				duration: `${Math.round(performance.now() - started)}ms`
			}, cta, {
				format: "toon",
				human: process.stdout.isTTY === true,
				fullOutput: false,
				tokenCount: false,
				tokenLimit: undefined,
				tokenOffset: undefined
			}));
			(options.exit ?? ((code) => process.exit(code)))(1);
			return true;
		};
	})))();
}

//#endregion
//#region dist/cli/discovery.js
var CLI_DESCRIPTION, CLI_CUSTOM_GLOBAL_OPTIONS, MCP_GROUP_DESCRIPTION, COMPLETIONS_DESCRIPTION, CLI_UPDATE_REFUSAL, HELP_SHELLS, completionsHint, commandGlobalOptions, rootPage, integrationIndex, answer, renderedAnswer, markupAnswer, documentAnswer, presentDiscoveryAnswer, sortedCommands, llmsAnswer, schemaAnswer, updateRefusalAnswer, retiredMcpAnswer, unknownCommandAnswer, discoveryAnswer, serveDiscovery;
function init_discovery() {
	return (init_discovery = __esmMin((() => {
		init_cliBuiltinArguments();
		init_explicitSensitiveValues();
		init_cliOutput();
		init_cliOutputFormatter();
		init_jsonLines();
		init_tokenWindow();
		init_identity();
		init_commandManifests();
		init_commandRegistry();
		init_commandSuggestion();
		init_unknownCommandReply();
		init_outputEnvelope();
		init_updateNotice();
		init_help();
		init_mcpBuiltinCommands();
		CLI_DESCRIPTION = "Reverse engineer anything from your terminal or agent.";
		CLI_CUSTOM_GLOBAL_OPTIONS = z.object({ timings: z.boolean().default(false).describe("Write measured command timing to stderr.") });
		MCP_GROUP_DESCRIPTION = "Register as MCP server";
		COMPLETIONS_DESCRIPTION = "Generate shell completion script";
		CLI_UPDATE_REFUSAL = {
			code: "UPDATE_FAILED",
			message: "Use 'rea update' to update the identified installation. The '--update' alias accepts only global output flags."
		};
		HELP_SHELLS = [...CLI_COMPLETION_SHELLS].sort();
		completionsHint = (name) => {
			const rows = [
				[
					"bash",
					`eval "$(${name} completions bash)"`,
					"# add to ~/.bashrc"
				],
				[
					"fish",
					`${name} completions fish | source`,
					"# add to ~/.config/fish/config.fish"
				],
				[
					"nushell",
					`see \`${name} completions nushell\``,
					"# add to config.nu"
				],
				[
					"zsh",
					`eval "$(${name} completions zsh)"`,
					"# add to ~/.zshrc"
				]
			];
			const shellWidth = Math.max(...rows.map(([shell]) => shell.length));
			const commandWidth = Math.max(...rows.map(([, command]) => command.length));
			return `Setup:\n${rows.map(([shell, command, comment]) => `  ${shell.padEnd(shellWidth)}  ${command.padEnd(commandWidth)}  ${comment}`).join("\n")}`;
		};
		commandGlobalOptions = {
			formats: CLI_OUTPUT_FORMATS,
			custom: CLI_CUSTOM_GLOBAL_OPTIONS
		};
		rootPage = (cli) => formatCommandListHelp(cli.name, {
			version: PRODUCT_IDENTITY.packageVersion,
			description: CLI_DESCRIPTION,
			commands: cliCommands(cli).map(({ name, definition }) => ({
				name,
				description: definition.description
			})).sort((left, right) => left.name.localeCompare(right.name)),
			globalOptions: {
				...commandGlobalOptions,
				root: { integrations: [{
					name: "completions",
					description: COMPLETIONS_DESCRIPTION
				}, {
					name: "mcp",
					description: `${MCP_GROUP_DESCRIPTION} (${[...MCP_SUBCOMMANDS.keys()].join(", ")})`
				}] }
			}
		});
		integrationIndex = (command, name, integration) => command[0] === integration ? 0 : command[0] === name && command[1] === integration ? 1 : -1;
		answer = (text, exitCode = 0) => ({
			kind: "text",
			text: text.endsWith("\n") ? text : `${text}\n`,
			exitCode
		});
		renderedAnswer = (text, exitCode = 0) => ({
			kind: "rendered",
			text,
			exitCode
		});
		markupAnswer = (text) => ({
			kind: "markup",
			text,
			exitCode: 0
		});
		documentAnswer = (value, format, tokens = true, exitCode = 0) => ({
			kind: "document",
			value,
			format,
			tokens,
			exitCode
		});
		presentDiscoveryAnswer = (result, global) => {
			if (result.kind === "rendered") return result.text;
			const controls = readCliOutputArguments(global);
			if (result.kind === "text") return result.exitCode !== 0 && controls.format === "jsonl" ? renderCliDocument(jsonLinesErrorRecord(result.text), "jsonl", false) : result.text;
			let encoded;
			if (result.kind === "markup") encoded = result.text;
			else {
				const value = result.format === "jsonl" && result.exitCode !== 0 ? jsonLinesErrorRecord(result.value) : result.value;
				encoded = result.format === "json" || result.format === "jsonl" ? renderCliDocument(value, result.format, process.stdout.isTTY === true) : formatCliOutput(value, result.format);
			}
			const text = encoded.endsWith("\n") ? encoded : `${encoded}\n`;
			if (result.kind === "document" && !result.tokens || result.exitCode !== 0) return text;
			if (controls.tokenCount) return `${estimateTokenCount(text)}\n`;
			if (!controls.tokenWindow) return text;
			const window = sliceTextByTokenWindow(text, controls.tokenOffset ?? 0, controls.tokenLimit);
			return window.truncated ? `${window.text}\n[truncated: showing tokens ${window.start}–${window.end} of ${window.total}]\n` : text;
		};
		sortedCommands = (cli) => [...cliCommands(cli)].sort((left, right) => left.name.localeCompare(right.name));
		llmsAnswer = (cli, global, full) => {
			const { format, formatExplicit, validation } = readCliOutputArguments(global);
			if (!validation.ok) return renderedAnswer(renderCliOutputArgumentError(validation), 1);
			const scoped = cliCommands(cli).find(({ name }) => name === global.command[0]);
			const commands = scoped === undefined ? sortedCommands(cli) : [scoped];
			if (!formatExplicit || format === "md") return markupAnswer(full ? formatLlmsFull(cli.name, commands) : formatLlmsIndex(cli.name, commands, CLI_DESCRIPTION));
			return documentAnswer(full ? llmsFullManifest(commands, CLI_CUSTOM_GLOBAL_OPTIONS) : llmsIndexManifest(commands, CLI_CUSTOM_GLOBAL_OPTIONS), format);
		};
		schemaAnswer = (cli, global) => {
			const name = global.command[0];
			const entry = cliCommands(cli).find((command) => command.name === name);
			if (entry === undefined) {
				const suggestion = suggestCommand(name, cliCommands(cli).map((command) => command.name));
				const { failure } = unknownCommandReply({
					name: cli.name,
					global,
					commandIndex: 0,
					suggestion
				});
				return answer(`Error: ${failure.message}`, 1);
			}
			const { format, formatExplicit, validation } = readCliOutputArguments(global);
			if (!validation.ok) return renderedAnswer(renderCliOutputArgumentError(validation), 1);
			return documentAnswer(commandSchemaDocument(entry, CLI_CUSTOM_GLOBAL_OPTIONS), formatExplicit ? format : "toon");
		};
		updateRefusalAnswer = (global, invocation) => {
			const controls = readCliOutputArguments(global);
			const failure = {
				...CLI_UPDATE_REFUSAL,
				message: redactExplicitText(CLI_UPDATE_REFUSAL.message, declaredSensitiveValues(global.command))
			};
			return invocation.stdoutIsTerminal && !controls.formatExplicit ? answer(`Error (${failure.code}): ${failure.message}`, 1) : documentAnswer(failure, controls.format, false, 1);
		};
		retiredMcpAnswer = (cli, global, invocation) => {
			const controls = readCliOutputArguments(global);
			const sensitive = declaredSensitiveValues(global.command);
			const text = (value) => redactExplicitText(value, sensitive);
			return renderedAnswer(renderFailure({
				code: "MCP_MODE_REMOVED",
				message: text(`Per-command --mcp has been removed. Use '${cli.name} mcp' to start REA's MCP server.`)
			}, {
				command: text(global.command[0] ?? cli.name),
				duration: `${Math.round(performance.now() - invocation.started)}ms`
			}, {
				description: text("Suggested command:"),
				commands: [{ command: text(`${cli.name} mcp`) }]
			}, {
				format: controls.format === "csv" || controls.format === "tsv" ? "json" : controls.format,
				human: invocation.stdoutIsTerminal && !controls.formatExplicit,
				fullOutput: controls.fullOutput,
				tokenCount: controls.tokenCount,
				tokenLimit: controls.tokenLimit,
				tokenOffset: controls.tokenOffset
			}), 1);
		};
		unknownCommandAnswer = (cli, global, { environment, stdoutIsTerminal, started }) => {
			const controls = readCliOutputArguments(global);
			const selectedFormat = controls.formatExplicit ? controls.format : "toon";
			const format = selectedFormat === "csv" || selectedFormat === "tsv" ? "json" : selectedFormat;
			const human = stdoutIsTerminal && !controls.formatExplicit;
			const unknown = global.command[0];
			const suggestion = suggestCommand(unknown, [
				...cliCommands(cli).map(({ name }) => name),
				"completions",
				"mcp"
			]);
			const update = human ? availableUpdate(cli.name, PRODUCT_IDENTITY.packageVersion, environment) : undefined;
			const notice = update === undefined ? [] : updateNoticeCta(cli.name, update).commands;
			const { command, cta, failure } = unknownCommandReply({
				name: cli.name,
				global,
				commandIndex: 0,
				suggestion,
				additionalCommands: notice
			});
			return renderedAnswer(renderFailure(failure, {
				command,
				duration: `${Math.round(performance.now() - started)}ms`
			}, cta, {
				format,
				human,
				fullOutput: controls.fullOutput,
				tokenCount: controls.tokenCount,
				tokenLimit: controls.tokenLimit,
				tokenOffset: controls.tokenOffset
			}), 1);
		};
		discoveryAnswer = (cli, global, invocation) => {
			const { command, flags } = global;
			const help = flags.has("--help") || flags.has("-h");
			if (flags.has("--update") && !help) return updateRefusalAnswer(global, invocation);
			if (flags.has("--mcp")) return command.length === 0 ? undefined : retiredMcpAnswer(cli, global, invocation);
			if (flags.has("--llms") || flags.has("--llms-full")) return llmsAnswer(cli, global, flags.has("--llms-full"));
			const completions = integrationIndex(command, cli.name, "completions");
			if (completions >= 0) {
				const shell = command[completions + 1];
				if (!help && shell !== undefined && !HELP_SHELLS.includes(shell)) return answer(redactExplicitText(`Error (INVALID_SHELL): Unknown shell '${shell}'. Supported: ${HELP_SHELLS.join(", ")}`, declaredSensitiveValues(global.command)), 1);
				if (!help && command.length > completions + 2) return answer("Error (PARSE_ERROR): completions expects exactly one shell. Use 'rea completions --help' for usage.", 1);
				return help || shell === undefined ? answer(formatCommandHelp(`${cli.name} completions`, {
					description: COMPLETIONS_DESCRIPTION,
					args: z.object({ shell: z.enum(HELP_SHELLS).describe("Shell to generate completions for") }),
					hint: completionsHint(cli.name)
				})) : undefined;
			}
			const mcp = integrationIndex(command, cli.name, "mcp");
			if (mcp >= 0) {
				const subcommand = command[mcp + 1];
				if (!subcommand) return answer(formatCommandListHelp(`${cli.name} mcp`, {
					description: MCP_GROUP_DESCRIPTION,
					commands: [...MCP_SUBCOMMANDS].map(([name, { description }]) => ({
						name,
						description
					})),
					globalOptions: { formats: CLI_DOCUMENT_OUTPUT_FORMATS }
				}));
				return help && subcommand === "doctor" ? answer(formatCommandHelp(`${cli.name} mcp doctor`, { description: MCP_SUBCOMMANDS.get("doctor").description })) : undefined;
			}
			if (flags.has("--version") && !help) return answer(PRODUCT_IDENTITY.packageVersion);
			if (command.length === 0) return answer(rootPage(cli));
			if (help) {
				const entry = cliCommands(cli).find(({ name }) => name === command[0]);
				if (entry === undefined) return answer(rootPage(cli));
				const { definition } = entry;
				return answer(formatCommandHelp(`${cli.name} ${entry.name}`, {
					description: definition.description,
					args: definition.args,
					options: definition.options,
					alias: definition.alias,
					globalOptions: commandGlobalOptions
				}));
			}
			if (flags.has("--schema")) return schemaAnswer(cli, global);
			if (cliCommands(cli).some(({ name }) => name === command[0])) return undefined;
			return unknownCommandAnswer(cli, global, invocation);
		};
		serveDiscovery = (cli, arguments_, options, environment, parsed) => {
			const global = parsed ?? parseCliGlobalArguments(arguments_);
			if (global.flags.has("--incur-update-check")) return refreshUpdateCache(cli.name, PRODUCT_IDENTITY.packageVersion, environment);
			const result = discoveryAnswer(cli, global, {
				environment,
				stdoutIsTerminal: process.stdout.isTTY === true,
				started: performance.now()
			});
			if (result === undefined) return undefined;
			(options.stdout ?? ((text) => process.stdout.write(text)))(presentDiscoveryAnswer(result, global));
			if (result.exitCode !== 0) (options.exit ?? ((code) => process.exit(code)))(result.exitCode);
			return Promise.resolve();
		};
	})))();
}

//#endregion
//#region dist/cli/completions.js
var ROOT_FLAGS, completionHelpNote, standardGlobals, completionCommands, createCliCompletions;
function init_completions() {
	return (init_completions = __esmMin((() => {
		init_cliBuiltinArguments();
		init_cliOutput();
		init_completionProtocol();
		init_commandRegistry();
		init_discovery();
		init_mcpBuiltinCommands();
		init_mcpDoctorOptions();
		ROOT_FLAGS = new Set([
			"--mcp",
			"--update",
			"--version"
		]);
		completionHelpNote = (global) => {
			const words = global.command[0] === "rea" ? global.command.slice(1) : global.command;
			if (words[0] !== "completions") return undefined;
			const rest = words.slice(1);
			if (rest.length > 1 || rest.length === 1 && !CLI_COMPLETION_SHELLS.includes(rest[0])) return undefined;
			const values = new Set(global.outputValues.map(({ index }) => index));
			const flags = global.arguments.filter((_, index) => !values.has(index));
			if (flags.some((word) => [
				"--schema",
				"--llms",
				"--llms-full",
				"--mcp",
				"--update",
				"--version"
			].includes(word))) return undefined;
			if (rest.length > 0 && !flags.includes("--help") && !flags.includes("-h")) return undefined;
			return "Zsh: initialize completion with `autoload -Uz compinit; compinit` before evaluating the zsh hook. If your shell already runs compinit, place the hook after it.\n";
		};
		standardGlobals = (root) => z.object(Object.fromEntries([
			...[...VALUED_OUTPUT_FLAGS].map((flag) => [flag.slice(2), flag === "--format" ? z.enum(CLI_OUTPUT_FORMATS).optional() : z.string().optional()]),
			...[...CLI_BUILTIN_FLAGS].filter((flag) => flag.startsWith("--") && flag !== "--incur-update-check" && (root || !ROOT_FLAGS.has(flag))).map((flag) => [flag.slice(2), z.boolean().optional()]),
			...root ? [["version", z.boolean().optional()]] : []
		]));
		completionCommands = (cli) => {
			const commands = new Map(cliCommands(cli).map(({ name, definition }) => [name, {
				description: definition.description,
				options: definition.options,
				alias: definition.alias
			}]));
			commands.set("mcp", {
				_group: true,
				description: MCP_GROUP_DESCRIPTION,
				commands: MCP_SUBCOMMANDS
			});
			commands.set("completions", {
				_group: true,
				description: COMPLETIONS_DESCRIPTION,
				commands: new Map(CLI_COMPLETION_SHELLS.map((shell) => [shell, {}]))
			});
			return commands;
		};
		createCliCompletions = (cli, environment) => {
			const script = (shell) => completionScript(shell, cli.name);
			const writer = (options) => options.stdout ?? ((text) => process.stdout.write(text));
			const complete = (arguments_, options) => {
				const shell = cliCompletionShell(environment);
				if (shell === undefined) return false;
				const write = writer(options);
				const separator = arguments_.indexOf("--");
				const words = separator < 0 ? arguments_ : arguments_.slice(separator + 1);
				if (words.length === 0) {
					write(script(shell));
					return true;
				}
				const index = Number(environment._COMPLETE_INDEX ?? words.length - 1);
				if (!Number.isSafeInteger(index) || index < 0 || index > words.length) return true;
				const before = parseCliGlobalArguments(words.slice(1, index)).command;
				if (before.includes("--")) return true;
				const input = [
					cli.name,
					...before,
					words[index] ?? ""
				];
				const doctor = before[0] === "mcp" && before[1] === "doctor";
				const candidates = completeWords(completionCommands(cli), input, input.length - 1, {
					schema: doctor ? MCP_DOCTOR_OPTIONS.extend({ timings: z.boolean().optional() }) : standardGlobals(before.length === 0),
					alias: doctor ? MCP_DOCTOR_ALIAS : { help: "h" }
				});
				const result = formatCompletions(shell, candidates);
				if (result !== "") write(result);
				return true;
			};
			const writeScript = (global, options) => {
				const { command } = global;
				const offset = command[0] === cli.name ? 1 : 0;
				const selected = CLI_COMPLETION_SHELLS.find((value) => value === command[offset + 1]);
				if (command[offset] !== "completions" || selected === undefined || command.length !== offset + 2) return false;
				const values = new Set(global.outputValues.map(({ index }) => index));
				if (global.arguments.some((token, index) => !values.has(index) && CLI_BUILTIN_FLAGS.has(token) && token !== "--schema" && !OUTPUT_SWITCHES.has(token))) return false;
				if (!readCliOutputArguments(global).validation.ok) return false;
				writer(options)(`${script(selected)}\n`);
				return true;
			};
			return {
				complete,
				writeScript
			};
		};
	})))();
}

//#endregion
//#region dist/application/McpRegistrationConfiguration.js
var isMissing$1, registrationLocation, requireAdmittedConfiguration, prepareRegistration, assertEffectiveLauncher, verifyEffectiveRegistration;
function init_McpRegistrationConfiguration() {
	return (init_McpRegistrationConfiguration = __esmMin((() => {
		init_configurationErrors();
		init_identity();
		init_ClientConfigurationDocument();
		init_ClientConfigurationFiles();
		init_ClientRegistration();
		init_GeminiClientSettings();
		init_ClientRegistrationConnection();
		init_RegularFileRead();
		isMissing$1 = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
		registrationLocation = (client) => ({
			...client.setupClient,
			...client,
			name: client.setupClient?.name ?? client.id
		});
		requireAdmittedConfiguration = (result) => {
			if (!result.ok) throw result.error.cleanupFailure ?? new ConfigurationError(result.error.detail);
			return result.value;
		};
		prepareRegistration = async (path, client, launcher, platform) => {
			const snapshot = await readRegularFileTextSnapshot(path, { symlinks: "reject" }).catch((cause) => {
				if (isMissing$1(cause)) return undefined;
				throw cause;
			});
			const original = snapshot?.text;
			const empty = serializeClientConfiguration({}, client.format);
			if (!empty.ok) throw new ConfigurationError("An empty client configuration could not be serialized.");
			const target = parseClientConfiguration(original ?? empty.value, client.format);
			const location = registrationLocation(client);
			const layers = requireAdmittedConfiguration(await readClientConfigurationFiles(location, undefined, platform, { targetDocument: target }));
			const parsed = clientConfigurationForWrite(target, layers);
			const targetIndex = layers.findLastIndex(({ sourcePath }) => sourcePath === client.configPath);
			const inherited = mergeClientConfigurationDocuments(layers.slice(0, targetIndex), platform);
			const desired = replaceClientRegistrationLauncher({
				dialect: parsed.dialect,
				profile: client.registrationProfile
			}, [launcher.command, ...launcher.args], clientServerForEdit(parsed, PRODUCT_IDENTITY.mcpServerKey), inherited === undefined ? undefined : effectiveClientServer(inherited, PRODUCT_IDENTITY.mcpServerKey));
			if (!desired.ok) throw desired.error;
			if (client.setupClient !== undefined) {
				const policy = await readClientPolicyBlock(client.setupClient, parsed, desired.value);
				if (!policy.ok) throw policy.error.cleanupFailure ?? new ConfigurationError(policy.error.detail);
				if (policy.value !== undefined) throw new ConfigurationError(`${policy.value} No settings were written.`);
			}
			const updated = withClientServers(parsed, {
				...parsed.servers,
				[PRODUCT_IDENTITY.mcpServerKey]: desired.value
			}, platform, PRODUCT_IDENTITY.mcpServerKey);
			const legacy = legacyClientServerPath(parsed, PRODUCT_IDENTITY.mcpServerKey);
			const serialized = serializeClientConfiguration(updated, client.format, original, [clientServerPath(parsed, PRODUCT_IDENTITY.mcpServerKey), ...legacy === undefined ? [] : [legacy]], { removeShadowedMembersAt: legacy === undefined ? [] : [legacy] });
			if (!serialized.ok) throw new ConfigurationError(`Client configuration member is shadowed at ${serialized.error.path.join(".")}.`);
			const candidate = parseClientConfiguration(serialized.value, client.format);
			const effective = requireAdmittedConfiguration(admitClientConfigurationCandidate(location, layers, candidate, platform));
			assertEffectiveLauncher(client, effective, launcher);
			return {
				path,
				client,
				launcher,
				platform,
				snapshot,
				original,
				parsed,
				updated,
				contents: serialized.value
			};
		};
		assertEffectiveLauncher = (client, effective, launcher) => {
			const admitted = admitClientStdioConnection(effective === undefined ? undefined : effectiveClientServer(effective, PRODUCT_IDENTITY.mcpServerKey), {
				dialect: effective?.dialect ?? client.format,
				profile: client.registrationProfile
			});
			if (!admitted.ok || admitted.value.command !== launcher.command || !clientConfigurationValuesEqual(admitted.value.args, launcher.args)) throw new ConfigurationError(admitted.ok ? "A higher-priority configuration overrides the selected stdio launcher. Update that source before registering this command." : admitted.error.cause.message, {
				...admitted.ok ? {} : { cause: admitted.error.cause },
				diagnostics: {
					settings_path: client.configPath,
					...client.inlineConfiguration === undefined ? {} : { inline_origin: client.inlineConfiguration.origin }
				}
			});
		};
		verifyEffectiveRegistration = async (prepared, targetText) => {
			const { client, launcher, platform } = prepared;
			const layers = requireAdmittedConfiguration(await readClientConfigurationFiles(registrationLocation(client), undefined, platform, { targetDocument: parseClientConfiguration(targetText, client.format) }));
			assertEffectiveLauncher(client, mergeClientConfigurationDocuments(layers, platform), launcher);
		};
	})))();
}

//#endregion
//#region dist/application/McpClientRegistration.js
var mcpClientRegistrationWritten, registerMcpClients, isMissing, registerMcpClient, registrationFailure, unchangedRegistration, verifyRegistration;
function init_McpClientRegistration() {
	return (init_McpClientRegistration = __esmMin((() => {
		init_HostPlatform();
		init_resources();
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_configurationErrors();
		init_result();
		init_RegularFile();
		init_ClientRegistrationBackup();
		init_ClientConfigPath();
		init_ClientPrivateProfile();
		init_ClientConfigurationCleanup();
		init_ClientConfigurationDocument();
		init_ClientConfigurationPublication();
		init_ClientConfigurationTransaction();
		init_McpRegistrationConfiguration();
		init_RegularFileRead();
		init_errorMessage();
		mcpClientRegistrationWritten = (result) => result.ok ? result.value.status === "configured" : result.error.diagnostics?.["configured"] === true;
		registerMcpClients = async (clients, launcher, signal, resources, platform) => {
			const outcomes = [];
			let cancelled = false;
			for (const client of clients) {
				const labels = {
					client: client.id,
					configPath: client.configPath,
					scope: client.scope
				};
				if (cancelled) {
					outcomes.push({
						...labels,
						status: "not_started"
					});
					continue;
				}
				const result = await registerMcpClient(client, launcher, signal, resources, platform);
				outcomes.push({
					...labels,
					status: "completed",
					result
				});
				cancelled = signal?.aborted === true || !result.ok && result.error instanceof AnalysisCancelledError;
			}
			return outcomes;
		};
		isMissing = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
		registerMcpClient = async (client, launcher, signal, resources, platform) => {
			const settingsPath = client.configPath;
			let backupPath;
			let configured = false;
			const checkCancellation = () => {
				if (signal?.aborted === true) throw cancelledBy("MCP registration", signal, { diagnostics: {
					client: client.id,
					settings_path: settingsPath,
					configured,
					...backupPath === undefined ? {} : { backup_path: backupPath }
				} });
			};
			try {
				checkCancellation();
				if (launcher.command.length === 0) throw new ConfigurationError("The registration needs a nonempty executable.");
				const path = await resolveClientConfigTransactionPath(settingsPath);
				if (path === undefined) throw new ConfigurationError(`Client settings path could not be verified: ${settingsPath}`);
				return await withClientConfigurationTransaction(path, async () => {
					checkCancellation();
					const prepared = await prepareRegistration(path, client, launcher, platform);
					const { snapshot, original, contents } = prepared;
					checkCancellation();
					const unchanged = await unchangedRegistration(prepared, checkCancellation, resources);
					checkCancellation();
					if (unchanged !== undefined) return ok(unchanged);
					if (original !== undefined) {
						const backup = await writeClientRegistrationBackup(path, original);
						if (!backup.ok) throw new ConfigurationError(backup.error.detail, { diagnostics: {
							settings_path: settingsPath,
							backup_path: backup.error.path
						} });
						backupPath = backup.value;
					}
					checkCancellation();
					await mkdir(dirname(path), {
						recursive: true,
						...client.privateProfile !== undefined ? { mode: PRIVATE_PROFILE_MODES.directory } : {}
					});
					checkCancellation();
					if (client.privateProfile !== undefined && HOST_PLATFORM.platform !== "win32") await securePrivateDirectory(dirname(path), client.privateProfile.home, checkCancellation, resources);
					checkCancellation();
					const publication = await ClientConfigurationPublication.write(path, contents, original, {
						requestedPath: settingsPath,
						state: snapshot?.state,
						...client.privateProfile !== undefined ? { requiredMode: PRIVATE_PROFILE_MODES.file } : {}
					});
					await verifyRegistration(publication, prepared, backupPath, resources);
					configured = true;
					checkCancellation();
					return ok({
						status: "configured",
						...backupPath === undefined ? {} : { backupPath },
						...client.privateProfile !== undefined ? { permissions: privateProfilePermissions(HOST_PLATFORM.platform) } : {}
					});
				});
			} catch (cause) {
				if (cause instanceof AnalysisCancelledError) return err(cause);
				configured ||= cause instanceof ClientConfigurationPublicationFailure && cause.outcome.kind === "completed";
				const failure = await registrationFailure(cause, settingsPath, resources, {
					backupPath,
					configured
				});
				if (signal?.aborted === true) analysisErrorWithCancellation(failure, cancelledBy("MCP registration", signal));
				return err(failure);
			}
		};
		registrationFailure = async (cause, path, resources, progress) => {
			const { backupPath, configured } = progress;
			if (cause instanceof ConfigurationError) return cause;
			const cleanup = isClientConfigurationCleanupFailure(cause) ? await retryClientConfigurationCleanup(cause, resources) : undefined;
			const primary = cleanup?.primary ?? cause;
			const detail = errorMessage(primary);
			const error = new ConfigurationError(`Could not register MCP settings at ${path}: ${detail}`, {
				cause,
				...cleanup?.cleanup === undefined ? {} : { cleanup: cleanup.cleanup },
				diagnostics: {
					settings_path: path,
					configured,
					...backupPath === undefined ? {} : { backup_path: backupPath }
				}
			});
			if (cleanup !== undefined) new AnalysisCleanupLeaseGroup(error, cleanup.cleanupLeases);
			return error;
		};
		unchangedRegistration = async (prepared, checkCancellation, resources) => {
			const { client, path, snapshot, parsed, updated } = prepared;
			if (parsed.requiresRewrite === true || !clientConfigurationValuesEqual(parsed.document, updated) || client.privateProfile !== undefined && HOST_PLATFORM.platform !== "win32" && ((snapshot?.state.mode ?? 0) & 511) !== PRIVATE_PROFILE_MODES.file) return undefined;
			const current = await readRegularFileTextSnapshot(path, { symlinks: "reject" });
			if (snapshot === undefined || current.text !== snapshot.text || !sameRegularFileState(snapshot.state, current.state)) throw new RegularFileChangedError(path);
			checkCancellation();
			await verifyEffectiveRegistration(prepared, current.text);
			const permissionsChanged = client.privateProfile !== undefined && HOST_PLATFORM.platform !== "win32" ? await securePrivateDirectory(dirname(path), client.privateProfile.home, checkCancellation, resources) : false;
			return {
				status: permissionsChanged ? "configured" : "unchanged",
				...client.privateProfile !== undefined ? { permissions: privateProfilePermissions(HOST_PLATFORM.platform) } : {}
			};
		};
		verifyRegistration = async (publication, prepared, backupPath, resources) => {
			const { original, client } = prepared;
			const settingsPath = client.configPath;
			await publication.verify(async () => {
				try {
					const readback = await readRegularFileText(publication.path, { symlinks: "reject" });
					await publication.assertCurrent(readback);
					await verifyEffectiveRegistration(prepared, readback);
				} catch (cause) {
					if (cause instanceof RegularFileChangedError || isMissing(cause)) throw cause;
					const failure = await registrationFailure(cause, settingsPath, resources, {
						backupPath,
						configured: false
					});
					try {
						await publication.restore(original);
					} catch (rollbackCause) {
						throw new ConfigurationError("Client settings verification failed and restoration could not be verified", {
							cause: rollbackCause,
							cleanupPrimary: failure,
							diagnostics: {
								settings_path: settingsPath,
								...backupPath === undefined ? {} : { backup_path: backupPath }
							}
						});
					}
					throw failure;
				}
			});
		};
	})))();
}

//#endregion
//#region dist/application/McpRegistrationCatalog.js
var MCP_REGISTRATION_CLIENTS, isClientId, clientDescriptor, resolveMcpRegistrationClientId, checkCancellation, selectedIds, mcpClientRegistrationProfile, projectTarget, globalTarget, msixWriteBlocker, admitGlobalTargets, resolveMcpRegistrationClients;
function init_McpRegistrationCatalog() {
	return (init_McpRegistrationCatalog = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_configurationErrors();
		init_result();
		init_SupportedClients();
		init_MsixPackageStorage();
		init_McpRegistrationLocations();
		MCP_REGISTRATION_CLIENTS = {
			antigravity: "antigravity",
			cline: "cline_vscode",
			"cline-cli": "cline",
			"claude-code": "claude_code",
			"claude-desktop": "claude_desktop",
			codex: "codex",
			cursor: "cursor",
			"factory-droid": "droid",
			fx: "fx",
			"gemini-cli": "gemini_cli",
			goose: "goose",
			"github-copilot-cli": "copilot_cli",
			"grok-build": "grok_build",
			hermes: "hermes",
			junie: "junie",
			"kilo-code": "kilo",
			"kimi-code": "kimi",
			"kiro-cli": "kiro",
			mastracode: "mastracode",
			mcporter: "mcporter",
			opencode: "opencode",
			pi: "pi",
			vscode: "vscode",
			windsurf: "windsurf",
			zed: "zed",
			amp: "amp"
		};
		isClientId = (value) => Object.hasOwn(MCP_REGISTRATION_CLIENTS, value);
		clientDescriptor = (id) => {
			const name = MCP_REGISTRATION_CLIENTS[id];
			const row = supportedClientDefinition(name);
			if (row.format === "unsupported") throw new Error(`${row.name} has no registration format`);
			const projectPaths = row.mcpAdd?.projectPaths;
			const projectLocation = row.mcpAdd?.projectLocation ?? (projectPaths === undefined ? undefined : fixedProjectLocation(projectPaths));
			return {
				displayName: row.displayName,
				format: row.format,
				aliases: row.mcpAdd?.aliases ?? [],
				...projectLocation === undefined ? {} : { projectLocation },
				...row.mcpAdd?.projectFormat === undefined ? {} : { projectFormat: row.mcpAdd.projectFormat },
				registrationProfile: row.registrationProfile,
				setupName: name
			};
		};
		resolveMcpRegistrationClientId = (input) => {
			const lower = input.toLowerCase();
			if (isClientId(lower)) return lower;
			return Object.keys(MCP_REGISTRATION_CLIENTS).filter(isClientId).find((id) => clientDescriptor(id).aliases.includes(lower));
		};
		checkCancellation = (signal) => {
			if (signal?.aborted) throw cancelledBy("MCP registration selection", signal);
		};
		selectedIds = (agents) => {
			const ids = [];
			for (const agent of agents) {
				const id = resolveMcpRegistrationClientId(agent);
				if (id === undefined) throw new ConfigurationError(`Unknown MCP client ${agent}. Select a supported --agent value.`);
				if (!ids.includes(id)) ids.push(id);
			}
			return ids;
		};
		mcpClientRegistrationProfile = (id) => clientDescriptor(id).registrationProfile;
		projectTarget = async (id, context) => {
			const descriptor = clientDescriptor(id);
			if (descriptor.projectLocation === undefined) throw new ConfigurationError(`${descriptor.displayName} has no project-scoped registration. Remove --no-global or select a project-capable client; no settings were written.`);
			const resolved = await descriptor.projectLocation(context);
			return {
				id,
				displayName: descriptor.displayName,
				registrationProfile: mcpClientRegistrationProfile(id),
				...resolved,
				scope: "project",
				format: descriptor.projectFormat ?? descriptor.format
			};
		};
		globalTarget = (id, context) => {
			const descriptor = clientDescriptor(id);
			const setupClient = context.setup.find(({ name }) => name === descriptor.setupName);
			if (setupClient === undefined) throw new ConfigurationError(`The registration catalog has no path owner for ${descriptor.setupName}.`);
			if (setupClient.configPathError !== undefined) throw setupClient.configPathFailure ?? new ConfigurationError(setupClient.configPathError);
			return {
				client: {
					id,
					displayName: descriptor.displayName,
					registrationProfile: mcpClientRegistrationProfile(id),
					configPath: selectedPath(setupClient.configPath, context),
					...setupClient.configPaths === undefined ? {} : { configPaths: setupClient.configPaths.map((path) => selectedPath(path, context)) },
					scope: "global",
					format: descriptor.format,
					...setupClient.inlineConfiguration === undefined ? {} : { inlineConfiguration: setupClient.inlineConfiguration },
					...setupClient.privateProfile === undefined ? {} : { privateProfile: setupClient.privateProfile },
					setupClient
				},
				markers: clientEvidencePaths(setupClient).map((path) => selectedPath(path, context))
			};
		};
		msixWriteBlocker = (clients, context) => {
			for (const { setupClient } of clients) {
				const blocker = setupClient === undefined ? undefined : registrationWriteBlocker(setupClient, "mcp add");
				if (blocker !== undefined) return blocker;
			}
			return redirectedWriteBlocker(appDataRedirection(context.setup), clients.map(({ configPath }) => configPath), "mcp add");
		};
		admitGlobalTargets = async (clients, context) => {
			const blocker = msixWriteBlocker(clients, context);
			if (blocker !== undefined) throw new ConfigurationError(`${blocker} No settings were written.`);
		};
		resolveMcpRegistrationClients = async (selection, resources) => {
			try {
				checkCancellation(selection.signal);
				const ids = selectedIds(selection.agents);
				const context = {
					...selection,
					resources,
					setup: selection.global ? await resolveSupportedClients(selection.home, selection.platform, selection.environment, selection.systemPaths) : []
				};
				if (!selection.global && ids.length === 0) throw new ConfigurationError("Default MCP registration includes global-only Amp. Select project-capable --agent values or remove --no-global; no settings were written.");
				if (ids.length > 0) {
					const clients = [];
					for (const id of ids) {
						if (selection.global) clients.push(globalTarget(id, context).client);
						checkCancellation(selection.signal);
						if (!selection.global) clients.push(await projectTarget(id, context));
					}
					if (selection.global) await admitGlobalTargets(clients, context);
					checkCancellation(selection.signal);
					return ok(clients);
				}
				const all = [];
				const detected = [];
				for (const id of Object.keys(MCP_REGISTRATION_CLIENTS).filter(isClientId)) {
					checkCancellation(selection.signal);
					if (id === "amp") continue;
					const { client, markers } = globalTarget(id, context);
					all.push(client);
					const statuses = [];
					for (const marker of markers) statuses.push(await present(marker));
					if (statuses.some(Boolean)) detected.push(client);
				}
				const amp = globalTarget("amp", context).client;
				checkCancellation(selection.signal);
				const selected = [...detected.length === 0 ? all : detected, amp];
				await admitGlobalTargets(selected, context);
				return ok(selected);
			} catch (cause) {
				const failure = cause instanceof ConfigurationError || cause instanceof AnalysisCancelledError ? cause : new ConfigurationError("Could not resolve MCP registration locations.", { cause });
				if (selection.signal?.aborted === true) analysisErrorWithCancellation(failure, cancelledBy("MCP registration selection", selection.signal));
				return err(failure);
			}
		};
	})))();
}

//#endregion
//#region dist/cli/mcpRegistration.js
var retainedResources, closeCliMcpRegistrationResources, precedingFlags, serveMcpRegistration, createRegistrationPresentation, serveRegistrationDiscovery, readRegistrationRequest, executeRegistration, clientReport, presentRegistration;
function init_mcpRegistration$1() {
	return (init_mcpRegistration$1 = __esmMin((() => {
		init_HostPlatform();
		init_McpClientRegistration();
		init_McpRegistrationCatalog();
		init_SupportedClients();
		init_resources();
		init_cliBuiltinArguments();
		init_cliOutput();
		init_homeDirectory();
		init_mcpRegistration();
		init_analysisErrorProjection();
		init_clientRegistrationCommand();
		init_configurationErrors();
		init_explicitSensitiveValues();
		init_result();
		init_identity();
		init_cliResultOutput();
		init_help();
		init_commandCancellation();
		init_cliResources();
		;
		closeCliMcpRegistrationResources = async () => {
			const resources = retainedResources;
			if (resources === undefined) return;
			await resources.close();
			if (retainedResources === resources) retainedResources = undefined;
		};
		ownCliProcessResource("mcp-registration", closeCliMcpRegistrationResources);
		precedingFlags = [
			"--llms",
			"--llms-full",
			"--mcp",
			"--update",
			"--incur-update-check"
		];
		serveMcpRegistration = (global, environment, defaultCommand, options) => {
			const offset = global.command[0] === PRODUCT_IDENTITY.cliBinary ? 1 : 0;
			if (global.command[offset] !== "mcp" || global.command[offset + 1] !== "add" || precedingFlags.some((flag) => global.flags.has(flag))) return undefined;
			return (async () => {
				const presentation = createRegistrationPresentation(global, options);
				if (presentation === undefined || await serveRegistrationDiscovery(global.flags, presentation)) return Promise.resolve();
				const request = readRegistrationRequest(global.command.slice(offset + 2), defaultCommand);
				if (!request.ok) {
					await presentation.validation(request.error.message, request.error.field, undefined, request.error.code);
					return Promise.resolve();
				}
				return withCommandCancellation((signal) => executeRegistration(request.value, environment, signal, presentation));
			})();
		};
		createRegistrationPresentation = (global, options) => {
			const write = options.stdout ?? ((text) => process.stdout.write(text));
			const fail = () => {
				if (options.exit !== undefined) options.exit(1);
				else process.exitCode = 1;
			};
			const output = readCliOutputArguments(global);
			const validation = output.validation.ok && (output.format === "csv" || output.format === "tsv") ? {
				ok: false,
				format: "json",
				code: "UNSUPPORTED_OUTPUT_COMBINATION",
				message: "MCP registration returns a complete document. Use --format json, yaml, md, toon, or jsonl; CSV/TSV requires a selected row collection."
			} : output.validation;
			if (!validation.ok) {
				write(renderCliOutputArgumentError(validation));
				fail();
				return undefined;
			}
			const destination = options.stdout === undefined ? process.stdout : new Writable({ write(chunk, _encoding, callback) {
				try {
					write(chunk.toString());
					callback();
				} catch (error) {
					callback(error instanceof Error ? error : new Error(String(error)));
				}
			} });
			const result = createCliResultOutput(output, destination);
			const document = async (value, failure = false) => {
				const handled = await result?.write(value, {
					command: "mcp add",
					duration: "0ms",
					failure
				});
				if (!handled) write(renderCliDocument(value, output.format, process.stdout.isTTY === true));
				if (result?.error !== undefined) fail();
			};
			return {
				write,
				document,
				fail,
				async validation(message, field, error, code = "invalid_value") {
					const retained = redactExplicitText(message, declaredSensitiveValues(global.command));
					await document({
						code: "VALIDATION_ERROR",
						message: retained,
						...error === undefined ? {} : { error: projectAnalysisError(error) },
						fieldErrors: [{
							code,
							missing: false,
							path: field,
							message: retained
						}]
					}, true);
					fail();
				}
			};
		};
		serveRegistrationDiscovery = async (flags, presentation) => {
			if (flags.has("--help") || flags.has("-h")) {
				presentation.write(`${formatCommandHelp("rea mcp add", {
					description: "Register exact stdio launcher arguments in selected client settings, with backups and verified publication.",
					options: mcpRegistrationOptionsSchema,
					alias: { command: "c" },
					hint: "No package acquisition or server execution. --no-global never writes global settings.",
					globalOptions: { formats: CLI_DOCUMENT_OUTPUT_FORMATS }
				})}\n`);
				return true;
			}
			const discovery = classifyMcpAddDiscovery(flags);
			if (discovery === "version") {
				presentation.write(`${PRODUCT_IDENTITY.packageVersion}\n`);
				return true;
			}
			if (discovery !== "schema") return false;
			await presentation.document({
				inputSchema: z.toJSONSchema(mcpRegistrationOptionsSchema),
				outputSchema: z.toJSONSchema(mcpRegistrationReportSchema)
			});
			return true;
		};
		readRegistrationRequest = (arguments_, defaultCommand) => {
			const request = readMcpAddArguments(arguments_);
			if (!request.validation.ok) {
				const issue = request.validation.error;
				return err({
					code: "invalid_value",
					message: issue.kind === "missing_value" ? `Missing value for flag: ${issue.flag}` : `Unexpected argument: ${issue.token}`,
					field: issue.kind === "missing_value" ? issue.field : "arguments"
				});
			}
			const launcher = request.commandText === undefined ? defaultCommand : parseClientRegistrationCommand(request.commandText);
			return launcher.ok ? ok({
				agents: request.agents,
				global: request.global,
				launcher: launcher.value
			}) : err({
				code: launcher.error.kind === "unsupported_transport" ? "unsupported_transport" : "invalid_value",
				message: launcher.error.message,
				field: "command"
			});
		};
		executeRegistration = async (request, environment, signal, presentation) => {
			const resources = retainedResources ??= new ArtifactResourceScope();
			const outcomes = await resources.run(async () => {
				const { platform } = HOST_PLATFORM;
				const targets = await resolveMcpRegistrationClients({
					agents: request.agents,
					global: request.global,
					cwd: process.cwd(),
					home: homeDirectoryFromEnvironment(environment, platform),
					platform,
					environment,
					signal
				}, resources);
				if (!targets.ok) {
					await presentation.validation(targets.error.message, "agent", targets.error);
					return undefined;
				}
				return {
					targets: targets.value,
					outcomes: await registerMcpClients(targets.value, request.launcher, signal, resources, platform)
				};
			}).catch(async (cause) => {
				if (!(cause instanceof ArtifactReaderFailure)) throw cause;
				const error = new ConfigurationError("Registration cannot continue until retained resource cleanup completes.", {
					cause,
					cleanup: ArtifactReaderFailure.cleanupObservation(cause, resources.cleanupResources)
				});
				await presentation.validation(error.message, "registration", error);
				return undefined;
			});
			if (outcomes !== undefined) await presentRegistration(outcomes.outcomes, outcomes.targets, request.launcher, presentation);
		};
		clientReport = (outcome) => {
			const labels = {
				client: outcome.client,
				config_path: outcome.configPath,
				scope: outcome.scope
			};
			if (outcome.status === "not_started") return {
				...labels,
				status: "not_started"
			};
			if (!outcome.result.ok) return {
				...labels,
				status: "failed",
				error: {
					...projectAnalysisError(outcome.result.error),
					reason: outcome.result.error.message
				}
			};
			const receipt = outcome.result.value;
			const permissions = receipt.permissions === undefined ? {} : { permissions: receipt.permissions };
			return receipt.status === "unchanged" ? {
				...labels,
				...permissions,
				status: "unchanged"
			} : {
				...labels,
				...permissions,
				status: "configured",
				...receipt.backupPath === undefined ? {} : { backup_path: receipt.backupPath }
			};
		};
		presentRegistration = async (outcomes, targets, launcher, presentation) => {
			const clients = outcomes.map(clientReport);
			const report = {
				name: "rea",
				command: launcher.command,
				args: [...launcher.args],
				ok: clients.every((client) => client.status === "configured" || client.status === "unchanged"),
				clients
			};
			await presentation.document(report, !report.ok);
			for (const outcome of outcomes) {
				if (outcome.status !== "completed") continue;
				const target = targets.find(({ id, configPath }) => id === outcome.client && configPath === outcome.configPath);
				const name = target?.displayName ?? outcome.client;
				const { result } = outcome;
				if (result.ok && result.value.backupPath !== undefined) process.stderr.write(`${name} MCP registration backup retained at ${result.value.backupPath}\n`);
				const notice = mcpClientRegistrationWritten(result) && target?.setupClient !== undefined ? runningClientRewriteNotice(target.setupClient) : undefined;
				if (notice !== undefined) process.stderr.write(`${notice}\n`);
			}
			if (!report.ok) presentation.fail();
		};
	})))();
}

//#endregion
//#region dist/cli/omittableDefaults.js
var INPUT_GROUPS, presentOmittableDefaults, presentInputs, withOmittableDefaults, fillsOmission, optionalWithMetadata;
function init_omittableDefaults() {
	return (init_omittableDefaults = __esmMin((() => {
		init_commandRegistry();
		INPUT_GROUPS = ["args", "options"];
		presentOmittableDefaults = (cli) => {
			for (const { definition } of cliCommands(cli)) presentInputs(definition);
		};
		presentInputs = (command) => {
			for (const group of INPUT_GROUPS) {
				const schema = command[group];
				if (schema instanceof z.ZodObject) command[group] = withOmittableDefaults(schema);
			}
		};
		withOmittableDefaults = (schema) => {
			const omittable = Object.entries(schema.shape).filter(([, field]) => fillsOmission(field));
			if (omittable.length === 0) return schema;
			const metadata = schema.meta();
			const result = schema.safeExtend(Object.fromEntries(omittable.map(([key, field]) => [key, optionalWithMetadata(field)])));
			return metadata === undefined ? result : result.meta(metadata);
		};
		fillsOmission = (field) => field._zod.optout === undefined && z.object({ value: field }).safeParse({}).success;
		optionalWithMetadata = (field) => {
			const metadata = field.meta();
			return metadata === undefined ? field.optional() : field.optional().meta(metadata);
		};
	})))();
}

//#endregion
//#region dist/cli/cliShell.js
var cliShell_exports = /* @__PURE__ */ __exportAll({ createCliShell: () => createCliShell });
var registerCommands, createCliShell;
function init_cliShell() {
	return (init_cliShell = __esmMin((() => {
		init_HostPlatform();
		init_ClientRegistrationIdentity();
		init_cliBuiltinArguments();
		init_processStart();
		init_clientRegistrationCommand();
		init_identity();
		init_logger();
		init_snapshotEnvironment();
		init_runCliCommand();
		init_completions();
		init_discovery();
		init_mcpBuiltinCommands();
		init_mcpRegistration$1();
		init_omittableDefaults();
		registerCommands = (context, options) => {
			let analysis;
			for (const { registration, module } of options.registrations) {
				if (!registration.analysis) {
					registration.register(module, context);
					continue;
				}
				if (options.createAnalysis === undefined) throw new Error("A CLI registrar needs analysis that was not provided");
				analysis ??= options.createAnalysis(context.environment);
				registration.register(module, {
					...context,
					analysis
				});
			}
		};
		createCliShell = (options) => {
			const environment = snapshotEnvironment(options.selectedEnvironment, HOST_PLATFORM.platform);
			const defaultRegistration = parseClientRegistrationCommand(currentClientRegistrationCommand({ environment }));
			const level = environment.REA_LOG_LEVEL === undefined ? undefined : parseLogLevel(environment.REA_LOG_LEVEL);
			const logger = createLogger("cli", level?.ok === true ? level.value : "silent");
			const cli = {
				name: PRODUCT_IDENTITY.cliBinary,
				serve
			};
			registerCommands({
				cli,
				logger,
				environment,
				fridaInstrumentation: options.fridaInstrumentation
			}, options);
			presentOmittableDefaults(cli);
			const updateEnvironment = {
				variables: environment,
				platform: HOST_PLATFORM.platform
			};
			const completions = createCliCompletions(cli, environment);
			function serve(arguments_ = process.argv.slice(2), serveOptions) {
				if (completions.complete(arguments_, serveOptions ?? {})) return Promise.resolve();
				const global = parseCliGlobalArguments(arguments_);
				if (completions.writeScript(global, serveOptions ?? {})) return Promise.resolve();
				const registration = serveMcpRegistration(global, environment, defaultRegistration, serveOptions ?? {});
				if (registration !== undefined) return registration;
				const result = reportUnknownMcpSubcommand(cli.name, global, serveOptions ?? {}) ? Promise.resolve() : serveDiscovery(cli, global.arguments, serveOptions ?? {}, updateEnvironment, global) ?? runCliCommand(cli, global, serveOptions ?? {}, updateEnvironment, options.resultOutput);
				const note = completionHelpNote(global);
				if (note === undefined) return result;
				return result.then(() => {
					const write = serveOptions?.stdout ?? ((text) => process.stdout.write(text));
					write(`\n${note}`);
				});
			}
			return cli;
		};
	})))();
}

//#endregion
export { cliShell_exports, createCliShell, init_cliShell };