import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, ConfigurationError, init_analysisErrorCore, init_configurationErrors, init_localPath, init_processStart, nulFreeStringSchema, processStartConfigurationSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_safeJson, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS, init_providerStartupTimeout, providerStartupTimeoutSchema } from "./providerStartupTimeout-DNZGsNYA.js";
import { init_positiveDecimalInteger, positiveDecimalIntegerSchema } from "./positiveDecimalInteger-BhPy7XMJ.js";
import { analysisProviderSelectorSchema, init_providerSelection, init_urlComponents, urlDeclaresQueryOrFragment } from "./urlComponents-DJm-wtqY.js";
import { debuggerSessionLimitEnvironmentShape, init_debuggerSessionLimits } from "./debuggerSessionLimits-C0Btgiac.js";
import { init_mcpOutputSchemaProfile, init_mcpStartupBudgets, init_mcpToolCatalogProfile, init_mcpToolFamilies, mcpDoctorDeadlineMsSchema, mcpFirstCatalogBudgetMsSchema, mcpInitializeBudgetMsSchema, mcpOutputSchemaProfileSchema, mcpToolCatalogProfileSchema, mcpToolFamiliesSchema, mcpToolsListBudgetMsSchema } from "./mcpToolFamilies-Cjva4yr_.js";
import { basename, isAbsolute } from "node:path";
import { z } from "zod";

//#region dist/config/ghidraExistingProject.js
var GHIDRA_PACKED_PROGRAM_RECOVERY, ghidraProjectPathSchema, ghidraProgramNameSchema;
function init_ghidraExistingProject() {
	return (init_ghidraExistingProject = __esmMin((() => {
		GHIDRA_PACKED_PROGRAM_RECOVERY = "A .gzf is a packed program, not a .gpr project. Import it into a new project with Ghidra analyzeHeadless <project-directory> <project-name> -import <file.gzf> -noanalysis; select its .gpr and, if needed, set REA_GHIDRA_PROGRAM_NAME to the imported program name.";
		ghidraProjectPathSchema = z.string().min(1).refine(isAbsolute, "Ghidra project path must be absolute").superRefine((path, context) => {
			if (path.endsWith(".gpr") && basename(path).length > 4) return;
			context.addIssue({
				code: "custom",
				message: path.toLowerCase().endsWith(".gzf") ? GHIDRA_PACKED_PROGRAM_RECOVERY : "Select an expanded .gpr project marker; restore .grez archives first"
			});
		});
		ghidraProgramNameSchema = z.string().min(1).refine((name) => name.trim().length > 0 && !name.startsWith("-") && !/[\\/\0*?]/u.test(name), "Select one exact program name in the project root, without paths, flags or wildcards");
	})))();
}

//#endregion
//#region dist/config/mcpInputBudget.js
var DEFAULT_MCP_MAX_INPUT_ELEMENTS, MINIMUM_MCP_MAX_INPUT_ELEMENTS, MAXIMUM_MCP_MAX_INPUT_ELEMENTS, setting, constraint, mcpInputBudgetSchema, parseMcpInputBudget;
function init_mcpInputBudget() {
	return (init_mcpInputBudget = __esmMin((() => {
		init_positiveDecimalInteger();
		init_configurationErrors();
		init_result();
		DEFAULT_MCP_MAX_INPUT_ELEMENTS = 1024;
		MINIMUM_MCP_MAX_INPUT_ELEMENTS = 1;
		MAXIMUM_MCP_MAX_INPUT_ELEMENTS = Number.MAX_SAFE_INTEGER;
		setting = "REA_MCP_MAX_INPUT_ELEMENTS";
		constraint = `${setting} must be a positive decimal safe integer counting combined array elements and object members; the default is ${String(DEFAULT_MCP_MAX_INPUT_ELEMENTS)}.`;
		mcpInputBudgetSchema = positiveDecimalIntegerSchema(1, MAXIMUM_MCP_MAX_INPUT_ELEMENTS, constraint);
		parseMcpInputBudget = (value) => {
			if (value === undefined) return ok(DEFAULT_MCP_MAX_INPUT_ELEMENTS);
			const parsed = mcpInputBudgetSchema.safeParse(value);
			return parsed.success ? ok(parsed.data) : err(new ConfigurationError(constraint, { settings: [{
				setting,
				constraint
			}] }));
		};
	})))();
}

//#endregion
//#region dist/config/ghidraLanguageOverride.js
var ghidraLanguageIdSchema, ghidraCompilerSpecIdSchema;
function init_ghidraLanguageOverride() {
	return (init_ghidraLanguageOverride = __esmMin((() => {
		ghidraLanguageIdSchema = z.string().regex(/^[A-Za-z0-9_.+-]+(?:\/[A-Za-z0-9_.+-]+)*:(?:LE|BE|LEBE):[1-9]\d*:[A-Za-z0-9_.+-](?:[A-Za-z0-9_.+ -]*[A-Za-z0-9_.+-])?$/u, "must be a Ghidra language ID such as x86:LE:32:default");
		ghidraCompilerSpecIdSchema = z.string().regex(/^[A-Za-z0-9_.+-]+$/u, "must be a Ghidra compiler-spec ID such as default or borlandcpp");
	})))();
}

//#endregion
//#region dist/config/ghidraDisabledAnalyzers.js
var MAX_GHIDRA_DISABLED_ANALYZER_NAMES, MAX_GHIDRA_DISABLED_ANALYZER_NAME_LENGTH, ghidraAnalyzerNamePattern, ghidraDisabledAnalyzersSchema;
function init_ghidraDisabledAnalyzers() {
	return (init_ghidraDisabledAnalyzers = __esmMin((() => {
		MAX_GHIDRA_DISABLED_ANALYZER_NAMES = 32;
		MAX_GHIDRA_DISABLED_ANALYZER_NAME_LENGTH = 120;
		ghidraAnalyzerNamePattern = /^[A-Za-z0-9][A-Za-z0-9 ._-]*$/u;
		ghidraDisabledAnalyzersSchema = z.string().transform((value) => value.split(",").map((name) => name.trim()).filter((name) => name.length > 0)).refine((names) => names.length <= 32, `must list at most ${32} analyzer names`).refine((names) => names.every((name) => name.length <= 120), `must keep every analyzer name at most ${120} characters`).refine((names) => names.every((name) => ghidraAnalyzerNamePattern.test(name)), "must be Ghidra analyzer names starting with a letter or digit and containing only letters, digits, spaces, periods, underscores, and hyphens").transform((names) => names.length === 0 ? undefined : names);
	})))();
}

//#endregion
//#region dist/config/mcpInputSchemaProfile.js
var profileConstraint, mcpInputSchemaProfileSchema, parseMcpInputSchemaProfile;
function init_mcpInputSchemaProfile() {
	return (init_mcpInputSchemaProfile = __esmMin((() => {
		init_configurationErrors();
		init_result();
		profileConstraint = "REA_MCP_INPUT_SCHEMA_PROFILE accepts only \"compact\", the default. The \"full\" input profile was removed: remove the setting from the client registration, or set it to \"compact\". Canonical server-side validation still checks every call.";
		mcpInputSchemaProfileSchema = z.enum(["compact"], { error: profileConstraint });
		parseMcpInputSchemaProfile = (value) => {
			if (value === undefined) return ok(undefined);
			const parsed = mcpInputSchemaProfileSchema.safeParse(value);
			return parsed.success ? ok(parsed.data) : err(new ConfigurationError(profileConstraint, { settings: [{
				setting: "REA_MCP_INPUT_SCHEMA_PROFILE",
				constraint: profileConstraint
			}] }));
		};
	})))();
}

//#endregion
//#region dist/config/mcpResponseBudget.js
var MINIMUM_RESPONSE_BYTES, MAXIMUM_RESPONSE_BYTES, stdioResponseBudgetRecovery, nodeStringCeilingRecovery, mcpResponseBudgetSchema, budgetConstraint, parseMcpResponseBudget;
function init_mcpResponseBudget() {
	return (init_mcpResponseBudget = __esmMin((() => {
		init_configurationErrors();
		init_result();
		MINIMUM_RESPONSE_BYTES = 10 * 1024 * 1024;
		MAXIMUM_RESPONSE_BYTES = Number.MAX_SAFE_INTEGER;
		stdioResponseBudgetRecovery = (effectiveResponseBytes, reservedStringCodeUnits, nodeStringCeilingCodeUnits) => `The effective REA_MCP_MAX_RESPONSE_BYTES value is ${String(effectiveResponseBytes)} bytes (floor ${String(MINIMUM_RESPONSE_BYTES)} bytes, 10 MiB). A change requires restarting the REA process and a matching client receive buffer. It does not raise REA's reserved single-string limit of ${String(reservedStringCodeUnits)} UTF-16 code units or Node's single-string ceiling of ${String(nodeStringCeilingCodeUnits)} UTF-16 code units. This release has no runtime override for either limit.`;
		nodeStringCeilingRecovery = (reservedStringCodeUnits, nodeStringCeilingCodeUnits) => `REA's reserved single-string limit is ${String(reservedStringCodeUnits)} UTF-16 code units, below Node's single-string ceiling of ${String(nodeStringCeilingCodeUnits)} UTF-16 code units. This release has no runtime override for either limit, and REA_MCP_MAX_RESPONSE_BYTES does not raise them.`;
		mcpResponseBudgetSchema = z.string().regex(/^[1-9]\d*$/u).transform(Number).pipe(z.int().safe().min(MINIMUM_RESPONSE_BYTES).max(MAXIMUM_RESPONSE_BYTES));
		budgetConstraint = `REA_MCP_MAX_RESPONSE_BYTES must be a decimal safe integer at least ${String(MINIMUM_RESPONSE_BYTES)} bytes, the default stdio receive-buffer size.`;
		parseMcpResponseBudget = (value) => {
			if (value === undefined) return ok(undefined);
			const parsed = mcpResponseBudgetSchema.safeParse(value);
			return parsed.success ? ok(parsed.data) : err(new ConfigurationError(budgetConstraint, { settings: [{
				setting: "REA_MCP_MAX_RESPONSE_BYTES",
				constraint: budgetConstraint
			}] }));
		};
	})))();
}

//#endregion
//#region dist/config/parsers.js
var parseStringArray, parseLoaderArgs, parseConfiguredStringArray, configuredArrayError;
function init_parsers() {
	return (init_parsers = __esmMin((() => {
		init_configurationErrors();
		init_localPath();
		init_result();
		init_safeJson();
		parseStringArray = (encoded, name) => {
			return parseConfiguredStringArray(encoded, name, z.string().min(1));
		};
		parseLoaderArgs = (encoded) => {
			if (encoded === undefined) return ok([]);
			return parseConfiguredStringArray(encoded, "HOPPER_LOADER_ARGS_JSON", nulFreeStringSchema, "must encode an array of strings without NUL bytes");
		};
		parseConfiguredStringArray = (encoded, setting, itemSchema, requirement = "must encode an array of strings") => {
			const decoded = safeParseJson(encoded);
			if (!decoded.ok) return err(configuredArrayError(setting, "must be valid JSON", decoded.cause));
			const parsed = z.array(itemSchema).safeParse(decoded.value);
			return parsed.success ? ok(parsed.data) : err(configuredArrayError(setting, requirement, parsed.error));
		};
		configuredArrayError = (setting, requirement, cause) => {
			const constraint = `${setting} ${requirement}`;
			return new ConfigurationError(constraint, {
				cause,
				settings: [{
					setting,
					constraint
				}]
			});
		};
	})))();
}

//#endregion
//#region dist/config/jebMcpEndpoint.js
var DEFAULT_JEB_MCP_ENDPOINT, parseJebMcpEndpoint;
function init_jebMcpEndpoint() {
	return (init_jebMcpEndpoint = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		init_urlComponents();
		DEFAULT_JEB_MCP_ENDPOINT = "http://127.0.0.1:8425/mcp";
		parseJebMcpEndpoint = (value) => {
			const raw = value === undefined || value.length === 0 ? null : value;
			let url;
			try {
				url = new URL(raw ?? "http://127.0.0.1:8425/mcp");
			} catch {
				return err(new AnalysisInputError("jeb_mcp_endpoint", { cause: "Expected an absolute http(s) URL" }));
			}
			if (url.protocol !== "http:" && url.protocol !== "https:") return err(new AnalysisInputError("jeb_mcp_endpoint", { cause: "Only http and https JEB MCP endpoints are supported" }));
			if (url.hostname !== "127.0.0.1" && url.hostname !== "[::1]") return err(new AnalysisInputError("jeb_mcp_endpoint", { cause: "JEB MCP endpoint must use a literal loopback host (127.0.0.1 or ::1)" }));
			if (url.username !== "" || url.password !== "") return err(new AnalysisInputError("jeb_mcp_endpoint", { cause: "Embedding credentials in the JEB MCP endpoint is not supported; configure authentication with the engine" }));
			if (url.pathname !== "/mcp" && url.pathname !== "/mcp/") return err(new AnalysisInputError("jeb_mcp_endpoint", { cause: "JEB MCP endpoint must use the /mcp route" }));
			if (urlDeclaresQueryOrFragment(url)) return err(new AnalysisInputError("jeb_mcp_endpoint", { cause: "JEB MCP endpoint query strings and fragments are not supported" }));
			return ok(url);
		};
	})))();
}

//#endregion
//#region dist/config/environment.js
var environmentSchema, configurationSettingFromIssue, parseJebMcpTimeoutMs, parseEnvironmentValues, parseEnvironment;
function init_environment() {
	return (init_environment = __esmMin((() => {
		init_ghidraExistingProject();
		init_mcpInputBudget();
		init_configurationErrors();
		init_result();
		init_providerSelection();
		init_ghidraLanguageOverride();
		init_ghidraDisabledAnalyzers();
		init_providerStartupTimeout();
		init_mcpInputSchemaProfile();
		init_mcpOutputSchemaProfile();
		init_mcpToolCatalogProfile();
		init_mcpResponseBudget();
		init_debuggerSessionLimits();
		init_mcpStartupBudgets();
		init_mcpToolFamilies();
		init_parsers();
		init_processStart();
		init_jebMcpEndpoint();
		environmentSchema = z.object({
			...debuggerSessionLimitEnvironmentShape,
			REA_ANALYSIS_PROVIDER: analysisProviderSelectorSchema.default("auto"),
			REA_MCP_MAX_RESPONSE_BYTES: mcpResponseBudgetSchema.optional(),
			REA_MCP_MAX_INPUT_ELEMENTS: mcpInputBudgetSchema.optional(),
			REA_MCP_INITIALIZE_BUDGET_MS: mcpInitializeBudgetMsSchema.optional(),
			REA_MCP_TOOLS_LIST_BUDGET_MS: mcpToolsListBudgetMsSchema.optional(),
			REA_MCP_FIRST_CATALOG_BUDGET_MS: mcpFirstCatalogBudgetMsSchema.optional(),
			REA_MCP_DOCTOR_DEADLINE_MS: mcpDoctorDeadlineMsSchema.optional(),
			REA_MCP_INPUT_SCHEMA_PROFILE: mcpInputSchemaProfileSchema.optional(),
			REA_MCP_TOOL_FAMILIES: mcpToolFamiliesSchema.optional(),
			REA_MCP_OUTPUT_SCHEMA_PROFILE: mcpOutputSchemaProfileSchema.optional(),
			REA_MCP_TOOL_CATALOG_PROFILE: mcpToolCatalogProfileSchema.optional(),
			REA_IDA_MCP_CONFIG: z.string().min(1).refine(isAbsolute, "REA_IDA_MCP_CONFIG must be absolute").optional(),
			REA_JEB_MCP_URL: z.string().superRefine((value, context) => {
				const parsed = parseJebMcpEndpoint(value);
				if (!parsed.ok) context.addIssue({
					code: "custom",
					message: typeof parsed.error.cause === "string" ? parsed.error.cause : parsed.error.message
				});
			}).optional(),
			GHIDRA_INSTALL_DIR: z.string().min(1).refine(isAbsolute, "GHIDRA_INSTALL_DIR must be absolute").optional(),
			JAVA_HOME: z.string().min(1).refine(isAbsolute, "JAVA_HOME must be absolute").optional(),
			REA_GHIDRA_NATIVEAOT_JAR: z.string().min(1).refine(isAbsolute, "REA_GHIDRA_NATIVEAOT_JAR must be absolute").optional(),
			REA_SWIFTC_COMPILE_TIMEOUT_MS: providerStartupTimeoutSchema.default(DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS),
			REA_GHIDRA_PROJECT_PATH: ghidraProjectPathSchema.optional(),
			REA_GHIDRA_CHECKPOINT_DIR: z.string().min(1).refine((value) => value.startsWith("/") && !value.includes("\0"), "must be an absolute POSIX directory path").optional(),
			REA_GHIDRA_PROGRAM_NAME: ghidraProgramNameSchema.optional(),
			REA_GHIDRA_LANGUAGE_ID: ghidraLanguageIdSchema.optional(),
			REA_GHIDRA_COMPILER_SPEC_ID: ghidraCompilerSpecIdSchema.optional(),
			REA_GHIDRA_DISABLED_ANALYZERS: ghidraDisabledAnalyzersSchema.optional(),
			REA_GHIDRA_SEED_FILE: z.string().min(1).refine(isAbsolute, "REA_GHIDRA_SEED_FILE must be absolute").optional(),
			REA_ILSPY_CMD_PATH: z.string().min(1).refine(isAbsolute, "REA_ILSPY_CMD_PATH must be absolute").optional(),
			HOPPER_LAUNCHER_PATH: z.string().min(1).optional(),
			HOPPER_TARGET_PATH: z.string().min(1).optional(),
			HOPPER_TARGET_KIND: z.enum(["executable", "database"]).default("executable"),
			HOPPER_LOADER_ARGS_JSON: z.string().optional(),
			REA_LOG_LEVEL: processStartConfigurationSchema.shape.REA_LOG_LEVEL,
			REA_REFERENCE_SECRET_PATTERNS_JSON: z.string().default("[]")
		});
		configurationSettingFromIssue = (issue) => {
			const setting = String(issue.path[0] ?? "environment");
			const constraint = issue.message;
			if (issue.code !== "custom" || issue.params === undefined) return {
				setting,
				constraint
			};
			const updateMode = issue.params.update_mode;
			const pendingRestart = issue.params.pending_restart;
			return {
				setting,
				constraint,
				...updateMode === "runtime" || updateMode === "restart" ? { update_mode: updateMode } : {},
				...typeof pendingRestart === "boolean" ? { pending_restart: pendingRestart } : {}
			};
		};
		parseJebMcpTimeoutMs = (value) => {
			if (value === undefined) return ok(undefined);
			const parsed = providerStartupTimeoutSchema.safeParse(value);
			if (parsed.success) return ok(parsed.data);
			return err(new ConfigurationError("Invalid REA environment configuration", {
				cause: parsed.error,
				settings: [{
					setting: "REA_JEB_MCP_TIMEOUT_MS",
					constraint: parsed.error.issues[0]?.message ?? "must be a valid timeout"
				}]
			}));
		};
		parseEnvironmentValues = (environment, unresolvedSettings = new Set()) => {
			const keys = new Set([...Object.keys(environment), ...unresolvedSettings]);
			const invalidEntries = [...keys].filter((key) => key.includes("=") || key.includes("\0") || Object.hasOwn(environment, key) && environment[key]?.includes("\0")).map((setting) => ({
				setting,
				constraint: setting.includes("=") ? "Environment variable names must not contain '='" : "Environment variable names and values must not contain NUL bytes"
			}));
			if (invalidEntries.length > 0) return err(new ConfigurationError("Invalid REA environment configuration", { settings: invalidEntries }));
			const literals = Object.fromEntries(Object.entries(environment).filter(([key]) => !unresolvedSettings.has(key)));
			const parsed = environmentSchema.safeParse(literals);
			if (!parsed.success) {
				const settings = parsed.error.issues.map((issue) => configurationSettingFromIssue(issue));
				return err(new ConfigurationError("Invalid REA environment configuration", {
					cause: parsed.error,
					settings
				}));
			}
			const { HOPPER_LOADER_ARGS_JSON: encodedLoaderArgs, REA_REFERENCE_SECRET_PATTERNS_JSON: encodedSecretPatterns, ...env } = parsed.data;
			const loaderArgs = parseLoaderArgs(encodedLoaderArgs);
			if (!loaderArgs.ok) return loaderArgs;
			const secretPatterns = parseStringArray(encodedSecretPatterns, "REA_REFERENCE_SECRET_PATTERNS_JSON");
			if (!secretPatterns.ok) return secretPatterns;
			return ok({
				...env,
				loaderArgs: loaderArgs.value,
				referenceSecretPatterns: secretPatterns.value
			});
		};
		parseEnvironment = (environment, unresolvedSettings = new Set()) => {
			const parsed = parseEnvironmentValues(environment, unresolvedSettings);
			if (!parsed.ok) return parsed;
			const env = parsed.value;
			if (env.REA_GHIDRA_CHECKPOINT_DIR !== undefined) {
				const conflicts = [
					"REA_GHIDRA_PROJECT_PATH",
					"REA_GHIDRA_SEED_FILE",
					"REA_GHIDRA_NATIVEAOT_JAR",
					"REA_GHIDRA_LANGUAGE_ID",
					"REA_GHIDRA_DISABLED_ANALYZERS"
				].filter((key) => Reflect.get(env, key) !== undefined);
				if (conflicts.length > 0) return err(new ConfigurationError("Ghidra checkpoints currently support stock fresh-import analysis only", { settings: conflicts.map((setting) => ({
					setting,
					constraint: "cannot be combined with REA_GHIDRA_CHECKPOINT_DIR"
				})) }));
			}
			const project = env.REA_GHIDRA_PROJECT_PATH;
			const incompatible = project === undefined ? env.REA_GHIDRA_PROGRAM_NAME === undefined || unresolvedSettings.has("REA_GHIDRA_PROJECT_PATH") ? [] : ["REA_GHIDRA_PROGRAM_NAME"] : [
				"REA_GHIDRA_LANGUAGE_ID",
				"REA_GHIDRA_COMPILER_SPEC_ID",
				"REA_GHIDRA_SEED_FILE",
				"REA_GHIDRA_DISABLED_ANALYZERS",
				"REA_GHIDRA_NATIVEAOT_JAR"
			].filter((setting) => (setting === "REA_GHIDRA_DISABLED_ANALYZERS" ? env[setting] : environment[setting]) !== undefined);
			if (incompatible.length > 0) return err(new ConfigurationError("Invalid existing Ghidra project configuration", { settings: incompatible.map((setting) => ({
				setting,
				constraint: project === undefined ? "requires REA_GHIDRA_PROJECT_PATH" : "Import and analysis overrides cannot be combined with an existing project"
			})) }));
			if (env.REA_GHIDRA_COMPILER_SPEC_ID !== undefined && env.REA_GHIDRA_LANGUAGE_ID === undefined && !unresolvedSettings.has("REA_GHIDRA_LANGUAGE_ID")) return err(new ConfigurationError("Invalid REA environment configuration", { settings: [{
				setting: "REA_GHIDRA_COMPILER_SPEC_ID",
				constraint: "requires REA_GHIDRA_LANGUAGE_ID"
			}] }));
			return parsed;
		};
	})))();
}

//#endregion
export { DEFAULT_JEB_MCP_ENDPOINT, ghidraProgramNameSchema, init_environment, init_ghidraDisabledAnalyzers, init_ghidraExistingProject, init_jebMcpEndpoint, parseEnvironment, parseEnvironmentValues, parseJebMcpEndpoint, parseJebMcpTimeoutMs };