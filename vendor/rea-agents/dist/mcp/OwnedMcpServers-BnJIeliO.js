import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { i as providerStartupTimeoutSchema, r as init_providerStartupTimeout } from "./providerStartupTimeout-D-0ufAK2.js";
import { i as projectAnalysisError, n as init_analysisErrorProjection } from "./analysisErrorProjection-B0_t_nHz.js";
import { B as parseEnvironment, a as retainedDebuggerProcessIds, dt as init_analysisSettings, ft as inspectAnalysisSettingSeeds, i as retainedDebuggerDiagnostics, o as retainedDebuggerRemediation, pt as launchAnalysisSetting, r as init_ownedDebuggerCleanupError, t as OwnedDebuggerCleanupError, z as init_environment } from "./ownedDebuggerCleanupError-DgWKG4Gj.js";
import { i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { i as init_configurationErrors, n as ConfigurationError } from "./configurationErrors-DgUy2JKH.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { $t as init_analysisResourceLimits, ht as DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS, vt as DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS, yt as DEFAULT_HOPPER_STARTUP_TIMEOUT_MS } from "./jsonValue-BIEmjG1z.js";
import { A as DEFAULT_REGEX_MATCHING_DEADLINE, C as DEFAULT_REGEX_WORKER_HEAP_REQUEST, M as init_regexMatchingDeadline, T as init_regexWorkerHeapRequest, h as DEFAULT_BRIDGE_MAX_REQUEST, l as DEFAULT_BRIDGE_MAX_REPLY, p as init_bridgeMaxReplyBytes, x as init_bridgeMaxRequestBytes } from "./logger-BQPBN7o1.js";
import { i as init_hopperCallerScanBudget, n as hopperCallerScanBudgetFromEnvironment } from "./hopperCallerScanBudget-BV5N1mFm.js";
import { n as StreamableHttpListenError, r as init_streamableHttpListenError } from "./streamableHttpListenError-CvpFB10c.js";
import { z } from "zod";

//#region dist/config/parseConfig.js
var nativeAnalysisEnvironment, inspectNativeAnalysisConfiguration, parseConfig;
function init_parseConfig() {
	return (init_parseConfig = __esmMin((() => {
		init_configurationErrors();
		init_result();
		init_analysisSettings();
		init_environment();
		init_providerStartupTimeout();
		init_analysisResourceLimits();
		init_bridgeMaxRequestBytes();
		init_bridgeMaxReplyBytes();
		init_hopperCallerScanBudget();
		init_regexMatchingDeadline();
		init_regexWorkerHeapRequest();
		nativeAnalysisEnvironment = (environment) => {
			const { REA_JEB_MCP_TIMEOUT_MS: _jebTimeout, REA_JEB_MCP_URL: _jebUrl, ...appEnvironment } = environment;
			return appEnvironment;
		};
		inspectNativeAnalysisConfiguration = (environment) => {
			const parsed = parseEnvironment(nativeAnalysisEnvironment(environment));
			const issues = [...parsed.ok ? [] : parsed.error.settings, ...inspectAnalysisSettingSeeds(nativeAnalysisEnvironment(environment))];
			const configuredTimeout = environment.REA_HOPPER_STARTUP_TIMEOUT_MS;
			if (configuredTimeout === undefined) return { issues };
			const admitted = launchAnalysisSetting("hopper.startup_timeout_ms", environment);
			if (parsed.ok && admitted.ok && admitted.value.value !== null) return {
				issues,
				configuredHopperStartupTimeout: ok(admitted.value.value)
			};
			const timeout = providerStartupTimeoutSchema.safeParse(configuredTimeout);
			return {
				issues,
				configuredHopperStartupTimeout: timeout.success ? ok(timeout.data) : err(new ConfigurationError("Invalid REA environment configuration", {
					cause: timeout.error,
					settings: timeout.error.issues.map(({ message }) => ({
						setting: "REA_HOPPER_STARTUP_TIMEOUT_MS",
						constraint: message
					}))
				}))
			};
		};
		parseConfig = (environment) => {
			const parsed = parseEnvironment(nativeAnalysisEnvironment(environment));
			if (!parsed.ok) return parsed;
			const env = parsed.value;
			const invalidRuntimeSeeds = {};
			const admitted = (id) => {
				const result = launchAnalysisSetting(id, environment);
				if (result.ok) return result.value.value;
				invalidRuntimeSeeds[id] = result.error;
				return undefined;
			};
			const ghidraStartup = admitted("ghidra.startup_timeout_ms");
			const hopperStartup = admitted("hopper.startup_timeout_ms");
			const decompileTimeout = admitted("ghidra.decompile_timeout_seconds");
			const decompilePayload = admitted("ghidra.decompile_max_payload_mib");
			const valueFlowOperations = admitted("ghidra.value_flow_max_operations");
			const valueFlowInputs = admitted("ghidra.value_flow_max_inputs_per_operation");
			const valueFlowEdges = admitted("ghidra.value_flow_max_edges");
			const callerScan = admitted("hopper.caller_scan_budget_ms");
			const bridgeBytes = admitted("bridge.max_request_bytes");
			const bridgeReplyBytes = admitted("bridge.max_reply_bytes");
			const regexDeadline = admitted("regex.matching_deadline_ms");
			const regexHeap = admitted("regex.worker_heap_request_mib");
			return ok({
				...env.REA_MCP_TOOL_FAMILIES === undefined ? {} : { mcpToolFamilies: env.REA_MCP_TOOL_FAMILIES },
				...env.REA_MCP_MAX_RESPONSE_BYTES === undefined ? {} : { mcpMaxResponseBytes: env.REA_MCP_MAX_RESPONSE_BYTES },
				...env.REA_MCP_MAX_INPUT_ELEMENTS === undefined ? {} : { mcpMaxInputElements: env.REA_MCP_MAX_INPUT_ELEMENTS },
				...env.REA_MCP_OUTPUT_SCHEMA_PROFILE === undefined ? {} : { mcpOutputSchemaProfile: env.REA_MCP_OUTPUT_SCHEMA_PROFILE },
				...env.REA_MCP_TOOL_CATALOG_PROFILE === undefined ? {} : { mcpToolCatalogProfile: env.REA_MCP_TOOL_CATALOG_PROFILE },
				analysisProvider: env.REA_ANALYSIS_PROVIDER,
				...env.REA_IDA_MCP_CONFIG === undefined ? {} : { idaMcpConfigPath: env.REA_IDA_MCP_CONFIG },
				...env.REA_GHIDRA_PROJECT_PATH === undefined ? {} : { ghidraExistingProject: {
					path: env.REA_GHIDRA_PROJECT_PATH,
					...env.REA_GHIDRA_PROGRAM_NAME === undefined ? {} : { programName: env.REA_GHIDRA_PROGRAM_NAME }
				} },
				ghidraInstallDir: env.GHIDRA_INSTALL_DIR,
				...env.REA_GHIDRA_CHECKPOINT_DIR === undefined ? {} : { ghidraCheckpointDirectory: env.REA_GHIDRA_CHECKPOINT_DIR },
				ghidraJavaHome: env.JAVA_HOME,
				ghidraStartupTimeoutMs: ghidraStartup ?? 33e4,
				...decompilePayload === undefined || decompilePayload === null ? {} : { ghidraDecompileMaxPayloadMiB: decompilePayload },
				...valueFlowOperations === undefined || valueFlowOperations === null ? {} : { ghidraValueFlowMaxOperations: valueFlowOperations },
				...valueFlowInputs === undefined || valueFlowInputs === null ? {} : { ghidraValueFlowMaxInputsPerOperation: valueFlowInputs },
				...valueFlowEdges === undefined || valueFlowEdges === null ? {} : { ghidraValueFlowMaxEdges: valueFlowEdges },
				...decompileTimeout === undefined || decompileTimeout === null ? {} : { ghidraDecompileTimeoutSeconds: decompileTimeout },
				...env.REA_GHIDRA_LANGUAGE_ID === undefined ? {} : { ghidraLanguageOverride: {
					languageId: env.REA_GHIDRA_LANGUAGE_ID,
					...env.REA_GHIDRA_COMPILER_SPEC_ID === undefined ? {} : { compilerSpecId: env.REA_GHIDRA_COMPILER_SPEC_ID }
				} },
				...env.REA_GHIDRA_SEED_FILE === undefined ? {} : { ghidraSeedFile: env.REA_GHIDRA_SEED_FILE },
				...env.REA_GHIDRA_DISABLED_ANALYZERS === undefined ? {} : { ghidraDisabledAnalyzers: env.REA_GHIDRA_DISABLED_ANALYZERS },
				...env.REA_GHIDRA_NATIVEAOT_JAR === undefined ? {} : { ghidraNativeAotJar: env.REA_GHIDRA_NATIVEAOT_JAR },
				ilspyCmdPath: env.REA_ILSPY_CMD_PATH,
				hopperLauncherPath: env.HOPPER_LAUNCHER_PATH,
				hopperStartupTimeoutMs: hopperStartup ?? 12e4,
				hopperStartupTimeoutSource: environment.REA_HOPPER_STARTUP_TIMEOUT_MS === undefined || hopperStartup === undefined ? "default" : "setting",
				hopperCallerScanBudget: hopperCallerScanBudgetFromEnvironment(callerScan === undefined || environment.REA_HOPPER_CALLER_SCAN_BUDGET_MS === undefined ? undefined : environment.REA_HOPPER_CALLER_SCAN_BUDGET_MS, callerScan ?? 2e3),
				hopperTargetPath: env.HOPPER_TARGET_PATH,
				hopperTargetKind: env.HOPPER_TARGET_KIND,
				hopperLoaderArgs: env.loaderArgs,
				logLevel: env.REA_LOG_LEVEL,
				referenceSourcePolicy: { secretPatterns: env.referenceSecretPatterns },
				bridgeMaxRequestBytes: bridgeBytes === undefined || bridgeBytes === null || environment.REA_BRIDGE_MAX_REQUEST_BYTES === undefined ? DEFAULT_BRIDGE_MAX_REQUEST : {
					maximumBytes: bridgeBytes,
					source: "setting"
				},
				bridgeMaxReplyBytes: bridgeReplyBytes === undefined || bridgeReplyBytes === null || environment.REA_BRIDGE_MAX_REPLY_BYTES === undefined ? DEFAULT_BRIDGE_MAX_REPLY : {
					maximumBytes: bridgeReplyBytes,
					source: "setting"
				},
				regexMatchingDeadline: regexDeadline === undefined || regexDeadline === null || environment.REA_REGEX_MATCHING_DEADLINE_MS === undefined ? DEFAULT_REGEX_MATCHING_DEADLINE : {
					deadlineMs: regexDeadline,
					source: "setting"
				},
				regexWorkerHeapRequest: regexHeap === undefined || regexHeap === null || environment.REA_REGEX_WORKER_HEAP_REQUEST_MIB === undefined ? DEFAULT_REGEX_WORKER_HEAP_REQUEST : {
					heapMiB: regexHeap,
					source: "setting"
				},
				invalidRuntimeSeeds
			});
		};
	})))();
}

//#endregion
//#region dist/main/messages.js
var MCP_CONNECTION_LOST, MCP_VALIDATION_FAILED, MCP_TRANSPORT_ERROR, MCP_CONNECTION_START_FAILED, MCP_SHUTDOWN_FAILED, SERVER_START_FAILED, mcpHttpListenFailed;
function init_messages() {
	return (init_messages = __esmMin((() => {
		MCP_CONNECTION_LOST = "Retry the tool call once only when it is safe to repeat or known not to have started. If it may already have changed the target, or it fails again, tell the user REA lost its MCP client connection and ask them to restart the MCP client.";
		MCP_VALIDATION_FAILED = "MCP message validation failed. Check the protocol fields before retrying a message that is safe to repeat. Continue using the connection while it remains responsive.";
		MCP_TRANSPORT_ERROR = "MCP reported an error with unknown connection state. Check whether the client is still connected before following connection-loss recovery.";
		MCP_CONNECTION_START_FAILED = "Retry once. If it fails again, tell the user REA could not start its MCP connection and ask them to restart the MCP client, then run `rea doctor`.";
		MCP_SHUTDOWN_FAILED = "REA could not close cleanly. End the REA process before starting it again.";
		SERVER_START_FAILED = "Do not repeat this startup. Tell the user REA could not start and ask them to restart the MCP client, then run `rea doctor`.";
		mcpHttpListenFailed = (remediation) => `REA could not listen for MCP HTTP connections. ${remediation}`;
	})))();
}

//#endregion
//#region dist/main/shutdown.js
var createShutdown, reportMcpShutdownFailure, describeShutdownFailure, describeShutdownFailureNode;
function init_shutdown() {
	return (init_shutdown = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorProjection();
		init_ownedDebuggerCleanupError();
		init_messages();
		createShutdown = (input) => {
			const { handle, session, dependencies, serverLogger } = input;
			let shutdownAttempt;
			const cleanupOwners = [
				{
					close: () => handle.close(),
					closed: false
				},
				...input.closeAndroid === undefined ? [] : [{
					close: input.closeAndroid,
					closed: false
				}],
				...input.closeOptionalProviders === undefined ? [] : [{
					close: input.closeOptionalProviders,
					closed: false
				}],
				{
					close: async () => {
						const closed = await session.close({ retainProviderDocuments: true });
						if (!closed.ok) throw closed.error;
					},
					closed: false
				}
			];
			let shutdownUnregistered = false;
			let unregisterShutdown = () => undefined;
			const shutdown = async () => {
				if (shutdownAttempt !== undefined) return shutdownAttempt;
				const pending = cleanupOwners.filter(({ closed }) => !closed);
				const attempt = (async () => {
					session.beginShutdown();
					await handle.prepareShutdown?.();
					const results = await Promise.allSettled(pending.map(async (owner) => {
						await owner.close();
						owner.closed = true;
					}));
					const failures = [];
					for (const result of results) if (result.status === "rejected") failures.push(result.reason);
					if (failures.length === 1) throw failures[0];
					if (failures.length > 1) throw new AggregateError(failures, "Multiple MCP cleanup operations failed");
					const disposed = await session.dispose({ retainProviderDocuments: true });
					if (!disposed.ok) throw disposed.error;
					if (!shutdownUnregistered) {
						unregisterShutdown();
						shutdownUnregistered = true;
					}
				})();
				shutdownAttempt = attempt;
				void attempt.catch(() => {
					if (shutdownAttempt === attempt) shutdownAttempt = undefined;
				});
				return attempt;
			};
			const requestShutdown = () => {
				shutdown().catch((cause) => {
					reportMcpShutdownFailure(cause, dependencies, serverLogger);
				});
			};
			unregisterShutdown = dependencies.registerShutdown(requestShutdown);
			return {
				shutdown,
				request: requestShutdown
			};
		};
		reportMcpShutdownFailure = (cause, dependencies, serverLogger) => {
			serverLogger.debug({ failure_cause: describeShutdownFailure(cause) }, "MCP shutdown rejected");
			dependencies.setExitCode(1);
			serverLogger.error(retainedDebuggerDiagnostics(cause), MCP_SHUTDOWN_FAILED);
			dependencies.writeStderr(`${MCP_SHUTDOWN_FAILED}\n`);
			if (cause instanceof AnalysisError) dependencies.writeStderr(`${projectAnalysisError(cause).message}\n`);
			const retainedPids = retainedDebuggerProcessIds(cause);
			if (retainedPids.length > 0) dependencies.writeStderr(`${retainedDebuggerRemediation(retainedPids)}\n`);
		};
		describeShutdownFailure = (cause) => describeShutdownFailureNode(cause, new WeakSet());
		describeShutdownFailureNode = (cause, active) => {
			if (typeof cause === "object" && cause !== null) {
				if (active.has(cause)) return { type: "cyclic_error" };
				active.add(cause);
			}
			try {
				if (cause instanceof AnalysisError) return { analysis_error: projectAnalysisError(cause) };
				if (cause instanceof Error) {
					const code = "code" in cause ? cause.code : undefined;
					return {
						name: cause.name,
						message: cause.message,
						...typeof code === "string" || typeof code === "number" && Number.isFinite(code) ? { code } : {},
						...cause instanceof OwnedDebuggerCleanupError ? { retained_debugger_pids: [...cause.retainedProcessIds] } : {},
						...cause instanceof AggregateError ? { errors: cause.errors.map((error) => describeShutdownFailureNode(error, active)) } : {}
					};
				}
				if (cause === null || typeof cause === "string" || typeof cause === "boolean" || typeof cause === "number" && Number.isFinite(cause)) return {
					type: cause === null ? "null" : typeof cause,
					value: cause
				};
				return { type: typeof cause };
			} finally {
				if (typeof cause === "object" && cause !== null) active.delete(cause);
			}
		};
	})))();
}

//#endregion
//#region dist/main/reportMcpTransportError.js
var transportSystemCode, CONNECTION_LOST_CODES, reportMcpTransportError;
function init_reportMcpTransportError() {
	return (init_reportMcpTransportError = __esmMin((() => {
		init_streamableHttpListenError();
		init_messages();
		transportSystemCode = (error) => {
			if (error instanceof StreamableHttpListenError) {
				const failure = error.classification.ok ? error.classification.value : error.classification.error;
				return "systemCode" in failure ? failure.systemCode : undefined;
			}
			if (!(error instanceof Error) || !("code" in error)) return undefined;
			return typeof error.code === "string" ? error.code : undefined;
		};
		CONNECTION_LOST_CODES = new Set([
			"EPIPE",
			"ECONNRESET",
			"ENOTCONN"
		]);
		reportMcpTransportError = (error, logger, writeStderr) => {
			const code = transportSystemCode(error);
			const diagnostic = error instanceof z.ZodError ? {
				kind: "validation_error",
				message: MCP_VALIDATION_FAILED
			} : code !== undefined && CONNECTION_LOST_CODES.has(code) ? {
				kind: "connection_lost",
				message: MCP_CONNECTION_LOST
			} : {
				kind: "unknown",
				message: MCP_TRANSPORT_ERROR
			};
			logger.error({ kind: diagnostic.kind }, diagnostic.message);
			writeStderr(`${diagnostic.message}\n`);
		};
	})))();
}

//#endregion
//#region dist/main/OwnedMcpServers.js
var OwnedMcpServers;
function init_OwnedMcpServers() {
	return (init_OwnedMcpServers = __esmMin((() => {
		OwnedMcpServers = class {
			servers = new Map();
			accepting = true;
			create(factory) {
				if (!this.accepting) throw new Error("MCP connection is closed");
				const server = factory();
				const close = server.close.bind(server);
				const ownedClose = async () => {
					await close();
					this.servers.delete(server);
				};
				this.servers.set(server, ownedClose);
				server.close = ownedClose;
				return server;
			}
			/** Seal publication before snapshotting; failed close capabilities stay owned. */
			closeAll() {
				this.accepting = false;
				return Promise.allSettled([...this.servers.values()].map((close) => Promise.resolve().then(close)));
			}
		};
	})))();
}

//#endregion
export { createShutdown as a, MCP_CONNECTION_START_FAILED as c, mcpHttpListenFailed as d, init_parseConfig as f, reportMcpTransportError as i, SERVER_START_FAILED as l, init_OwnedMcpServers as n, init_shutdown as o, parseConfig as p, init_reportMcpTransportError as r, reportMcpShutdownFailure as s, OwnedMcpServers as t, init_messages as u };