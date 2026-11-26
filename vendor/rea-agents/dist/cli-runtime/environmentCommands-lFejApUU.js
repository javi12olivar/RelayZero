import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisInputError, AnalysisResourceConstraintError, ConfigurationError, cancelledBy, init_analysisErrorBase, init_analysisErrorCore, init_configurationErrors, init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { createLogger, init_logger } from "./logger-CYsWF45U.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { CLI_COMMANDS, DEFAULT_INFO_LOGGING_COMMANDS, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliLogging, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { analysisErrorWithCleanupDependencies, init_analysisErrorCleanup } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { TEMPLATE_RULES, init_environmentManifestRules } from "./analysisViewResult-vDCF9Pxo.js";
import { init_webNetworkCapture, inspectWebNetworkCaptureInputSchema } from "./webNetworkCapture-DzOKad85.js";
import { finishCliEvidenceCommand, init_cliEvidenceCallerPath } from "./cliEvidenceCallerPath-BMrJ1VvW.js";
import { init_cliJsonInput, parseCliJsonInput } from "./cliJsonInput-DxRb6ijM.js";
import { cliDecimalField, init_options, publishArgvInput } from "./options-BYpy7iiK.js";
import { httpHostnameSchema, init_httpHostname } from "./httpHostname-CSn_t4iH.js";
import { basename } from "node:path";
import { z } from "zod";

//#region dist/config/environmentName.js
var ENVIRONMENT_NAME_CONSTRAINT, environmentNameSchema, parseEnvironmentName;
function init_environmentName() {
	return (init_environmentName = __esmMin((() => {
		init_configurationErrors();
		init_result();
		ENVIRONMENT_NAME_CONSTRAINT = "ENVIRONMENT_NAME must be a non-empty name when set.";
		environmentNameSchema = z.string().trim().min(1);
		parseEnvironmentName = (environment) => {
			const value = environment.ENVIRONMENT_NAME;
			if (value === undefined) return ok(undefined);
			const parsed = environmentNameSchema.safeParse(value);
			return parsed.success ? ok(parsed.data) : err(new ConfigurationError(ENVIRONMENT_NAME_CONSTRAINT, { settings: [{
				setting: "ENVIRONMENT_NAME",
				constraint: ENVIRONMENT_NAME_CONSTRAINT
			}] }));
		};
	})))();
}

//#endregion
//#region dist/config/mcpHttpEndpoint.js
var DEFAULT_MCP_HTTP_HOST, DEFAULT_MCP_HTTP_PORT, mcpHttpListenerPortSchema, mcpHttpPortSchema, mcpHttpHostSchema, MCP_HTTP_PORT_CONSTRAINT, MCP_HTTP_HOST_CONSTRAINT, MCP_ALLOWED_HOSTS_CONSTRAINT, MCP_ALLOWED_HOSTS_FLAG_CONSTRAINT, mcpAllowedHostsTextSchema, parseMcpHttpEndpoint;
function init_mcpHttpEndpoint() {
	return (init_mcpHttpEndpoint = __esmMin((() => {
		init_httpHostname();
		init_configurationErrors();
		init_result();
		DEFAULT_MCP_HTTP_HOST = "127.0.0.1";
		DEFAULT_MCP_HTTP_PORT = 0;
		mcpHttpListenerPortSchema = z.number().int().min(0).max(65535);
		mcpHttpPortSchema = z.string().regex(/^(?:0|[1-9]\d*)$/u).transform(Number).pipe(mcpHttpListenerPortSchema);
		mcpHttpHostSchema = z.string().trim().min(1);
		MCP_HTTP_PORT_CONSTRAINT = "MCP_PORT must be a decimal integer between 0 and 65535.";
		MCP_HTTP_HOST_CONSTRAINT = "MCP_HOST must be a non-empty host name or IP address.";
		MCP_ALLOWED_HOSTS_CONSTRAINT = "MCP_ALLOWED_HOSTS must list at least one host name or IP address, separated by commas, without URL components or ports.";
		MCP_ALLOWED_HOSTS_FLAG_CONSTRAINT = "must list at least one host name or IP address, separated by commas, without URL components or ports.";
		mcpAllowedHostsTextSchema = z.string().transform((text, context) => {
			const entries = text.split(",").map((entry) => entry.trim());
			if (entries.some((entry) => entry.length === 0)) {
				context.addIssue({
					code: "custom",
					message: MCP_ALLOWED_HOSTS_CONSTRAINT
				});
				return z.NEVER;
			}
			return entries;
		}).pipe(z.array(httpHostnameSchema)).transform((names) => [...new Set(names)]);
		parseMcpHttpEndpoint = (environment, overrides = {}) => {
			const issues = [];
			let host = overrides.host ?? "127.0.0.1";
			let port = overrides.port ?? 0;
			let allowedHosts = overrides.allowedHosts;
			if (overrides.host === undefined && environment.MCP_HOST !== undefined) {
				const parsed = mcpHttpHostSchema.safeParse(environment.MCP_HOST);
				if (parsed.success) host = parsed.data;
				else issues.push({
					setting: "MCP_HOST",
					constraint: MCP_HTTP_HOST_CONSTRAINT
				});
			}
			if (overrides.port === undefined && environment.MCP_PORT !== undefined) {
				const parsed = mcpHttpPortSchema.safeParse(environment.MCP_PORT);
				if (parsed.success) port = parsed.data;
				else issues.push({
					setting: "MCP_PORT",
					constraint: MCP_HTTP_PORT_CONSTRAINT
				});
			}
			if (overrides.allowedHosts === undefined && environment.MCP_ALLOWED_HOSTS !== undefined) {
				const parsed = mcpAllowedHostsTextSchema.safeParse(environment.MCP_ALLOWED_HOSTS);
				if (parsed.success) allowedHosts = parsed.data;
				else issues.push({
					setting: "MCP_ALLOWED_HOSTS",
					constraint: MCP_ALLOWED_HOSTS_CONSTRAINT
				});
			}
			if (issues.length > 0) return err(new ConfigurationError(issues.map(({ constraint }) => constraint).join(" "), { settings: issues }));
			return ok({
				host,
				port,
				...allowedHosts === undefined ? {} : { allowedHosts }
			});
		};
	})))();
}

//#endregion
//#region dist/cli/environmentCommands.js
var environmentCommands_exports = /* @__PURE__ */ __exportAll({
	registerEnvironmentCommands: () => registerEnvironmentCommands,
	transportError: () => transportError
});
var cliError, infoLogger, untilAborted, transportError, cancelledServe, REPLAY_ONLY, loadServeInputs, serveEnvironmentCommand, exportDocument, exportEnvironmentCommand, conflictingRules, inspectBuildHar, buildEnvironmentCommand, registerBuildCommand, manifestArgument, evidenceOption, compareEnvironmentCommand, registerCompareCommand, registerExportCommand, registerEnvironmentCommands;
function init_environmentCommands() {
	return (init_environmentCommands = __esmMin((() => {
		init_localPath();
		init_callerPath();
		init_cliCommandNames();
		init_cliJsonInput();
		init_cliLogging();
		init_environmentName();
		init_mcpHttpEndpoint();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_result();
		init_logger();
		init_environmentManifestRules();
		init_webNetworkCapture();
		init_commandCancellation();
		init_cliEvidenceCallerPath();
		init_commandRegistry();
		init_options();
		cliError = (error) => ({
			error: "Application workflow failed",
			...projectAnalysisError(error)
		});
		infoLogger = (command, environment, logger) => environment.REA_LOG_LEVEL === undefined && DEFAULT_INFO_LOGGING_COMMANDS.has(command) ? createLogger("cli", "info") : logger;
		untilAborted = (signal) => new Promise((resolve) => {
			if (signal.aborted) resolve(undefined);
			else signal.addEventListener("abort", () => resolve(undefined), { once: true });
		});
		transportError = (endpoint, cause) => {
			const failure = cause.classification.ok ? cause.classification.value : cause.classification.error;
			return new AnalysisResourceConstraintError(CLI_COMMANDS.environmentServe, "transport", cause.message, {
				host: endpoint.host,
				port: endpoint.port
			}, {
				cause,
				retryable: false,
				diagnostics: {
					listener_failure: {
						kind: failure.kind,
						..."systemCode" in failure && failure.systemCode !== undefined ? { system_code: failure.systemCode } : {},
						...failure.kind === "host_allowlist" ? { reason: failure.reason } : {}
					},
					listener_phase: cause.phase
				},
				remediationAction: cause.remediationAction
			});
		};
		cancelledServe = (signal) => cliError(cancelledBy(CLI_COMMANDS.environmentServe, signal));
		REPLAY_ONLY = {
			state: undefined,
			report: {
				served: false,
				reason: "replay-only"
			}
		};
		loadServeInputs = async (input, environmentName, signal) => {
			const read = (path) => parseCliJsonInput(path, CLI_COMMANDS.environmentServe, signal, { snapshot: true });
			const manifest = await read(input.manifest);
			if (!manifest.ok) return manifest;
			const evidence = await read(input.evidence);
			if (!evidence.ok) return evidence;
			const { loadEnvironmentSource } = await import("./environmentSource-DB8Dg2zx.js").then((n) => (n.init_environmentSource(), n.environmentSource_exports));
			if (signal.aborted) return err(cancelledServe(signal));
			const source = loadEnvironmentSource(manifest.value, evidence.value);
			if (!source.ok) return err(cliError(source.error));
			if (input.replayOnly) return ok({
				source: source.value,
				served: REPLAY_ONLY
			});
			const { prepareServedState } = await import("./environmentState-CB2jw8yQ.js").then((n) => (n.init_environmentState(), n.environmentState_exports));
			if (signal.aborted) return err(cancelledServe(signal));
			return ok({
				source: source.value,
				served: prepareServedState(source.value, evidence.value, { name: environmentName })
			});
		};
		serveEnvironmentCommand = async (input, environment, logger, signal) => {
			if (signal.aborted) return cancelledServe(signal);
			const endpoint = parseMcpHttpEndpoint(environment, {
				...input.host === undefined ? {} : { host: input.host },
				...input.port === undefined ? {} : { port: input.port }
			});
			if (!endpoint.ok) return cliError(endpoint.error);
			const environmentName = parseEnvironmentName(environment);
			if (!environmentName.ok) return cliError(environmentName.error);
			const inputs = await loadServeInputs(input, environmentName.value, signal);
			if (!inputs.ok) return inputs.error;
			const { source, served: { state, report } } = inputs.value;
			const commandLogger = infoLogger(CLI_COMMANDS.environmentServe, environment, logger);
			if (!report.served && report.reason === "unavailable") commandLogger.warn({
				code: report.code,
				error: report.message
			}, "Environment state unavailable; serving recorded replay");
			if (signal.aborted) return cancelledServe(signal);
			const { serveEnvironment } = await import("./server__environment__serveEnvironment-CW18wZwH.js");
			const { StreamableHttpListenError } = await import("./streamableHttpListenError-JZuwwX5o.js").then((n) => (n.init_streamableHttpListenError(), n.streamableHttpListenError_exports));
			if (signal.aborted) return cancelledServe(signal);
			let failListener = () => undefined;
			const listenerFailed = new Promise((resolve) => {
				failListener = resolve;
			});
			let served;
			try {
				const started = await serveEnvironment({
					source,
					...state === undefined ? {} : { state },
					signal,
					...endpoint.value,
					...environmentName.value === undefined ? {} : { environmentName: environmentName.value },
					logger: commandLogger,
					onerror: failListener
				});
				if (!started.ok) return cliError(started.error);
				served = started.value;
			} catch (cause) {
				if (signal.aborted && cause === signal.reason) return cancelledServe(signal);
				if (!(cause instanceof StreamableHttpListenError)) throw cause;
				return cliError(transportError(endpoint.value, cause));
			}
			const failure = await Promise.race([untilAborted(signal), listenerFailed]);
			const listenerError = failure === undefined ? undefined : transportError(endpoint.value, failure);
			const observation = {
				url: served.url,
				environment: served.card.name,
				tools: served.card.capabilities.tools.length,
				evidence_id: source.evidenceId,
				manifest_evidence_id: source.manifestEvidenceId,
				state: report
			};
			try {
				await served.close();
			} catch (cause) {
				if (!(cause instanceof AnalysisError)) throw cause;
				if (listenerError !== undefined) return cliError(analysisErrorWithCleanupDependencies(listenerError, cause, CLI_COMMANDS.environmentServe));
				cause.retainDiagnostics({ shutdown_observation: {
					status: "shutdown_requested",
					...observation
				} });
				return cliError(cause);
			}
			if (listenerError !== undefined) return cliError(listenerError);
			return {
				status: "stopped",
				...observation
			};
		};
		exportDocument = (result) => ({
			status: result.status,
			directory: result.directory,
			name: result.name,
			tool_count: result.tool_count,
			evidence_id: result.evidence_id,
			manifest_evidence_id: result.manifest_evidence_id,
			state: result.state,
			package_source: result.package_source,
			files: result.files.map(({ path, bytes }) => ({
				path,
				bytes
			}))
		});
		exportEnvironmentCommand = async (input) => {
			const { readEnvironmentExportInputs, exportEnvironmentBundle } = await import("./environmentExport-CHRFON4m.js").then((n) => (n.init_environmentExport(), n.environmentExport_exports));
			const inputs = await readEnvironmentExportInputs(input.manifest, input.evidence);
			if (!inputs.ok) return cliError(inputs.error);
			const { loadEnvironmentSource } = await import("./environmentSource-DB8Dg2zx.js").then((n) => (n.init_environmentSource(), n.environmentSource_exports));
			const source = loadEnvironmentSource(inputs.value.manifest.value, inputs.value.evidence.value, CLI_COMMANDS.environmentExport);
			if (!source.ok) return cliError(source.error);
			const exported = await exportEnvironmentBundle({
				...inputs.value,
				source: source.value,
				directory: absoluteCallerPath(input.directory),
				name: input.name,
				packageTarball: input.packageTarball === undefined ? undefined : absoluteCallerPath(input.packageTarball)
			});
			return exported.ok ? exportDocument(exported.value) : cliError(exported.error);
		};
		conflictingRules = () => cliError(new AnalysisInputError(CLI_COMMANDS.environmentBuild, undefined, [{
			path: ["format_rules_only"],
			reason: "invalid_value",
			message: "--format-rules-only applies no opt-in template rules; it cannot be combined with --template-rule."
		}]));
		inspectBuildHar = async (capturePath, callerInputPath, captureTimeoutMs, environment, signal) => {
			const { createWebNetworkCaptureService } = await import("./webNetworkCaptures-BBa8pLB1.js").then((n) => (n.init_webNetworkCaptures(), n.webNetworkCaptures_exports));
			const { environmentExportEvidenceFile } = await import("./environmentExport-CHRFON4m.js").then((n) => (n.init_environmentExport(), n.environmentExport_exports));
			const { ENVIRONMENT_BUILD_OPERATION } = await import("./application__environment__environmentBuild-CMOae9Ej.js");
			const service = createWebNetworkCaptureService(environment);
			const inspected = await finishCliEvidenceCommand(callerInputPath, () => service.inspect({
				capture_path: capturePath,
				format: "har",
				...captureTimeoutMs === undefined ? {} : { capture_timeout_ms: captureTimeoutMs }
			}, { signal }), service, "web-network-capture", "inspect_web_network_capture", signal);
			if (!inspected.ok) return err({
				error: "Application workflow failed",
				...inspected.error
			});
			const file = await environmentExportEvidenceFile("evidence", capturePath, inspected.value, ENVIRONMENT_BUILD_OPERATION);
			return file.ok ? file : err(cliError(file.error));
		};
		buildEnvironmentCommand = async (input, environment, logger, signal) => {
			if (input.formatRulesOnly && input.templateRule !== undefined) return conflictingRules();
			const { buildEnvironment, classifyBuildCapture, DEFAULT_BUILD_TEMPLATE_RULES, ENVIRONMENT_BUILD_OPERATION } = await import("./application__environment__environmentBuild-CMOae9Ej.js");
			const capturePath = absoluteCallerPath(input.capture);
			const kind = classifyBuildCapture(capturePath);
			if (!kind.ok) return cliError(kind.error);
			if (input.directory === undefined && !input.dryRun) return cliError(new AnalysisInputError(CLI_COMMANDS.environmentBuild, { userMessage: "Name the bundle directory, or pass --dry-run." }, [{
				path: ["directory"],
				reason: "invalid_value",
				message: "The bundle directory may be omitted only with --dry-run."
			}]));
			const commandLogger = infoLogger(CLI_COMMANDS.environmentBuild, environment, logger);
			const progress = (stage) => {
				commandLogger.info({ stage }, "Building environment");
			};
			let capture;
			if (kind.value === "har") {
				progress("inspect");
				const inspected = await inspectBuildHar(capturePath, input.capture, input.captureTimeoutMs, environment, signal);
				if (!inspected.ok) return inspected.error;
				capture = inspected.value;
			} else {
				const { readEnvironmentExportFile } = await import("./environmentExport-CHRFON4m.js").then((n) => (n.init_environmentExport(), n.environmentExport_exports));
				const read = await readEnvironmentExportFile("evidence", capturePath, ENVIRONMENT_BUILD_OPERATION, ["capture"]);
				if (!read.ok) return cliError(read.error);
				capture = read.value;
			}
			if (signal.aborted) return cliError(cancelledBy(CLI_COMMANDS.environmentBuild, signal));
			const captureInput = kind.value;
			const built = await buildEnvironment({
				capture,
				captureInput,
				capturePath,
				templateRules: input.formatRulesOnly ? [] : input.templateRule ?? DEFAULT_BUILD_TEMPLATE_RULES,
				directory: input.directory === undefined ? undefined : absoluteCallerPath(input.directory),
				name: input.name,
				packageTarball: input.packageTarball === undefined ? undefined : absoluteCallerPath(input.packageTarball),
				dryRun: input.dryRun,
				progress,
				signal
			});
			return built.ok ? built.value : cliError(built.error);
		};
		registerBuildCommand = (cli, logger, environment) => {
			registerCliCommand(cli, CLI_COMMANDS.environmentBuild, {
				description: "Build an agent environment bundle from a recorded capture in one offline step: inspect a HAR (or read capture Evidence), project the environment manifest, derive the state, report which tools the environment answers from state, which replay and why each write is withheld, then write the bundle environment-export writes",
				args: z.object({
					capture: localPathStringSchema.describe("A .har file, or capture Evidence JSON from inspect-web-network-capture (HAR) or capture-browser-scenario"),
					directory: localPathStringSchema.optional().describe("Bundle directory to create; must be absent or empty, nothing is overwritten; omit only with --dry-run")
				}),
				options: z.object({
					name: z.string().optional().describe("Env folder and env id (kebab-case); default the manifest's name, or the capture file's name when the origin is a loopback or IP address"),
					templateRule: z.array(z.enum(TEMPLATE_RULES)).optional().describe("Opt-in template rule; repeat to select several. Replaces the default after-uid-literal, opaque-token, sibling-variance and prefix-variance"),
					formatRulesOnly: z.boolean().default(false).describe("Apply only the four format rules, the views' own default"),
					packageTarball: localPathStringSchema.optional().describe("Packed rea-agents tarball (npm pack) copied into the env folder and installed by the Dockerfile instead of the registry package pinned to this version"),
					dryRun: z.boolean().default(false).describe("Run every stage and report, but write nothing"),
					captureTimeoutMs: cliDecimalField(inspectWebNetworkCaptureInputSchema.shape.capture_timeout_ms)
				}),
				run: ({ args, options }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.environmentBuild, () => buildEnvironmentCommand({
					capture: args.capture,
					directory: args.directory,
					name: options.name,
					templateRule: options.templateRule,
					formatRulesOnly: options.formatRulesOnly,
					packageTarball: options.packageTarball,
					dryRun: options.dryRun,
					captureTimeoutMs: options.captureTimeoutMs
				}, environment, logger, signal)))
			}, { operations: [{
				name: "export_environment_bundle",
				flags: {
					name: "--name",
					template_rules: "--template-rule",
					package_tarball: "--package-tarball",
					dry_run: "--dry-run"
				}
			}, {
				name: "inspect_web_network_capture",
				flags: { capture_timeout_ms: "--capture-timeout-ms" }
			}] });
		};
		manifestArgument = z.string().describe("Environment manifest Evidence JSON path (inspect-analysis-view environment-manifest output)");
		evidenceOption = z.string().describe("Parent capture Evidence JSON path (inspect-web-network-capture or capture-browser-scenario output) the manifest cites");
		compareEnvironmentCommand = async (input) => {
			const read = (path) => parseCliJsonInput(path, CLI_COMMANDS.environmentCompare, undefined, { snapshot: true });
			const manifest = await read(input.manifest);
			if (!manifest.ok) return manifest.error;
			const evidence = await read(input.evidence);
			if (!evidence.ok) return evidence.error;
			const probes = [];
			for (const path of input.probes) {
				const probe = await read(path);
				if (!probe.ok) return probe.error;
				probes.push({
					label: basename(path),
					value: probe.value
				});
			}
			const { loadEnvironmentSource } = await import("./environmentSource-DB8Dg2zx.js").then((n) => (n.init_environmentSource(), n.environmentSource_exports));
			const source = loadEnvironmentSource(manifest.value, evidence.value, CLI_COMMANDS.environmentCompare);
			if (!source.ok) return cliError(source.error);
			const { compareEnvironment } = await import("./application__environment__environmentCompare-D1QXH64i.js");
			const report = compareEnvironment({
				source: source.value,
				captureValue: evidence.value,
				probes,
				operation: CLI_COMMANDS.environmentCompare
			});
			return report.ok ? report.value : cliError(report.error);
		};
		registerCompareCommand = (cli, logger) => {
			registerCliCommand(cli, CLI_COMMANDS.environmentCompare, {
				description: "Compare an environment with probe captures of the application it was captured from: each probe is one call sequence recorded against a freshly reset application, answered by the environment from a reset state, with agreement reported per step, tool and probe",
				args: z.object({ manifest: manifestArgument }),
				options: z.object({
					evidence: evidenceOption,
					probe: z.array(z.string()).min(1).describe("Probe capture Evidence JSON path (inspect-web-network-capture or capture-browser-scenario output) of one call sequence made against a freshly reset application; repeat once per sequence")
				}),
				run: ({ args, options }) => logCliCommand(logger, CLI_COMMANDS.environmentCompare, () => compareEnvironmentCommand({
					manifest: args.manifest,
					evidence: options.evidence,
					probes: options.probe
				}))
			});
		};
		registerExportCommand = (cli, logger) => {
			registerCliCommand(cli, CLI_COMMANDS.environmentExport, {
				description: "Export an environment manifest and its capture Evidence as an agent environment bundle folder the agentenv framework runs with agent-env run",
				args: z.object({
					manifest: manifestArgument,
					directory: localPathStringSchema.describe("Bundle directory to create; must be absent or empty, nothing is overwritten")
				}),
				options: z.object({
					evidence: evidenceOption,
					packageTarball: localPathStringSchema.optional().describe("Packed rea-agents tarball (npm pack) copied into the env folder and installed by the Dockerfile instead of the registry package pinned to this version"),
					name: z.string().optional().describe("Env folder and env id (kebab-case); default the manifest's name")
				}),
				run: ({ args, options }) => logCliCommand(logger, CLI_COMMANDS.environmentExport, () => exportEnvironmentCommand({
					manifest: args.manifest,
					evidence: options.evidence,
					directory: args.directory,
					packageTarball: options.packageTarball,
					name: options.name
				}))
			});
		};
		registerEnvironmentCommands = (cli, logger, environment) => {
			registerBuildCommand(cli, logger, environment);
			registerExportCommand(cli, logger);
			registerCompareCommand(cli, logger);
			registerCliCommand(cli, CLI_COMMANDS.environmentServe, {
				description: "Serve an environment manifest as an agent environment over streamable HTTP until SIGINT or SIGTERM: read tools, and write tools whose effect the capture confirmed, answer from the state the capture observed, derived at startup, or every tool replays retained capture records with --replay-only or when the state is unavailable",
				args: z.object({ manifest: manifestArgument }),
				options: z.object({
					evidence: evidenceOption,
					replayOnly: z.boolean().default(false).describe("Serve pure replay: derive no state, serve every manifest tool from its retained records and answer every /agentenv method as not found"),
					host: mcpHttpHostSchema.optional().describe("Listener address; default MCP_HOST, else 127.0.0.1"),
					port: publishArgvInput(mcpHttpPortSchema.optional().describe("Listener port; default MCP_PORT, else 0 for an ephemeral port"))
				}),
				run: ({ args, options }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.environmentServe, () => serveEnvironmentCommand({
					manifest: args.manifest,
					evidence: options.evidence,
					replayOnly: options.replayOnly,
					host: options.host,
					port: options.port
				}, environment, logger, signal)))
			});
		};
	})))();
}

//#endregion
export { environmentCommands_exports, init_environmentCommands };