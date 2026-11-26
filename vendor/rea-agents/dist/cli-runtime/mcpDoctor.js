import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, errorMessage, init_analysisErrorBase, init_errorMessage, init_isRecord, init_sha256Hex, isRecord, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { CLI_DOCUMENT_OUTPUT_FORMATS, init_cliOutput, init_jsonLines, jsonLinesErrorRecord, missingCliOutputValueMessage, renderCliDocument } from "./cliOutput-B7h8Duho.js";
import { MCP_DOCTOR_ALIAS, MCP_DOCTOR_OPTIONS, formatCommandHelp, init_help, init_mcpDoctorOptions } from "./mcpDoctorOptions-msGS6RGq.js";
import { init_mcpOutputSchemaProfile, init_mcpSchemaPresentation, init_mcpStartupBudgets, init_mcpToolCatalogProfile, init_mcpToolFamilies, parseMcpOutputSchemaProfile, parseMcpStartupBudgets, parseMcpToolCatalogProfile, parseMcpToolFamilies, resolveMcpOutputSchemaProfile } from "./mcpToolFamilies-Cjva4yr_.js";
import { MCP_STARTUP_POLICY, init_mcpStartupPolicy, mcpDoctorDeadlineRecovery } from "./mcpStartupPolicy-Qi-BUxK7.js";
import { OwnedMcpClient, init_OwnedMcpClient } from "./OwnedMcpClient-OmwCR7CK.js";
import { OwnedMcpStdioTransport, init_OwnedMcpStdioTransport } from "./OwnedMcpStdioTransport-Bgf2cvdE.js";
import { DISCOVER_TOOLS, HOT_TOOL_NAMES, init_catalogDiscovery, progressiveCatalogIdentity } from "./catalogDiscovery-DRfzYms0.js";
import { RECORDED_CATALOG_DIGEST_PROFILES, init_recordedCatalogDigests } from "./recordedCatalogDigests-CmASFVov.js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { Client, SdkError, SdkErrorCode } from "@modelcontextprotocol/client";
import { StringDecoder } from "node:string_decoder";

//#region dist/recordedMcpCatalog.js
var RECORDED_MCP_CATALOG_SHA256;
function init_recordedMcpCatalog() {
	return (init_recordedMcpCatalog = __esmMin((() => {
		RECORDED_MCP_CATALOG_SHA256 = "933fc6d9ca0c972fde2d79daf9fa169ed403483a50cd710e371b699829e0010b";
	})))();
}

//#endregion
//#region dist/mcpDoctor.js
var OUTPUT_FORMATS, MCP_DOCTOR_COMMAND, MCP_DOCTOR_DESCRIPTION, MCP_DOCTOR_SCOPE, HELP_FLAGS, renderMcpDoctorHelp, runProductionMcpDoctor, DoctorStdioTransport, MCP_DOCTOR_SESSION_SCOPE_DETAIL, listPromptsWhenAdvertised, inspectProductionMcpSession, runProductionMcpDoctorCli, compareInventory, inventoryCheck, parseIdentityToolResult, parseOutputArguments, isOutputFormat, requestOptions, targetFreeEnvironment, cachedVerifiedCatalog, readVerifiedRecordedMcpCatalog, doctorExpectationForEnvironment, captureStderr, cleanupFailureDetail, doctorTransportDetail;
function init_mcpDoctor() {
	return (init_mcpDoctor = __esmMin((() => {
		init_OwnedMcpClient();
		init_help();
		init_jsonLines();
		init_cliOutput();
		init_mcpOutputSchemaProfile();
		init_mcpToolFamilies();
		init_mcpToolCatalogProfile();
		init_catalogDiscovery();
		init_recordedCatalogDigests();
		init_recordedMcpCatalog();
		init_result();
		init_analysisErrorBase();
		init_identity();
		init_mcpStartupBudgets();
		init_mcpStartupPolicy();
		init_mcpDoctorOptions();
		init_OwnedMcpStdioTransport();
		init_sha256Hex();
		init_mcpSchemaPresentation();
		init_errorMessage();
		OUTPUT_FORMATS = CLI_DOCUMENT_OUTPUT_FORMATS;
		MCP_DOCTOR_COMMAND = "rea mcp doctor";
		MCP_DOCTOR_DESCRIPTION = "Validate MCP adapter startup and tool listing";
		MCP_DOCTOR_SCOPE = "Checks this REA adapter using the current runtime; does not verify a client's registered command or launch environment.";
		HELP_FLAGS = new Set(["--help", "-h"]);
		renderMcpDoctorHelp = () => formatCommandHelp(MCP_DOCTOR_COMMAND, {
			description: MCP_DOCTOR_DESCRIPTION,
			options: MCP_DOCTOR_OPTIONS,
			alias: MCP_DOCTOR_ALIAS,
			hint: `${MCP_DOCTOR_SCOPE} This entry accepts only the options above.`
		});
		runProductionMcpDoctor = async (options) => {
			const parsedBudgets = parseMcpStartupBudgets(options.environment);
			if (!parsedBudgets.ok) return {
				healthy: false,
				adapter: "production-stdio",
				server: null,
				inventory: null,
				identity: null,
				request_flow: {
					tool: "binary_session",
					ok: false
				},
				checks: parsedBudgets.error.settings.map((issue) => ({
					name: issue.setting,
					ok: false,
					detail: issue.constraint
				})),
				diagnostics: {
					stderr: "",
					stderr_bytes: 0,
					stderr_truncated: false
				}
			};
			const expectation = await doctorExpectationForEnvironment(options.environment);
			const budget = parsedBudgets.value.doctor;
			const budgetMs = budget.milliseconds;
			const deadline = performance.now() + budgetMs;
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(new Error("Production MCP doctor deadline expired")), Math.max(1, Math.ceil(deadline - performance.now())));
			const stderr = captureStderr();
			const transport = new DoctorStdioTransport({
				command: options.command,
				arguments: [...options.args],
				...options.cwd === undefined ? {} : { cwd: options.cwd },
				hostEnvironment: targetFreeEnvironment(options.environment),
				sweepTokenOwnedProcesses: true
			}, stderr.append);
			const client = new OwnedMcpClient({
				name: "rea-mcp-doctor",
				version: "1"
			});
			let result;
			let cleanupFailure;
			try {
				await client.connect(transport, requestOptions(deadline, controller.signal));
				result = await inspectProductionMcpSession(client, deadline, controller.signal, expectation, budget);
			} catch (cause) {
				result = {
					healthy: false,
					adapter: "production-stdio",
					server: null,
					inventory: null,
					identity: null,
					request_flow: {
						tool: "binary_session",
						ok: false
					},
					checks: [{
						name: "transport",
						ok: false,
						detail: doctorTransportDetail(cause, budget, controller.signal)
					}]
				};
			} finally {
				clearTimeout(timer);
				try {
					await transport.close();
				} catch (cause) {
					cleanupFailure = { cause };
				}
			}
			if (cleanupFailure !== undefined) result = {
				...result,
				healthy: false,
				checks: [...result.checks, {
					name: "cleanup",
					ok: false,
					detail: cleanupFailureDetail(cleanupFailure.cause)
				}]
			};
			return {
				...result,
				diagnostics: stderr.value()
			};
		};
		DoctorStdioTransport = class extends OwnedMcpStdioTransport {
			constructor(options, onStderr) {
				super(options, {
					provider: "mcp-doctor",
					operation: "mcp_doctor",
					label: "MCP doctor",
					maxFrameBytes: 8 * 1024 * 1024,
					maxOperationBytes: 32 * 1024 * 1024,
					maxDiagnosticBytes: {
						stdout: 0,
						stderr: MCP_STARTUP_POLICY.doctorStderrBytes
					},
					onStderr
				});
			}
		};
		MCP_DOCTOR_SESSION_SCOPE_DETAIL = "binary_session is outside the selected tool families; include the session family for request-flow and identity checks";
		listPromptsWhenAdvertised = (client, request) => client.getServerCapabilities()?.prompts ? client.listPrompts(undefined, request) : Promise.resolve({ prompts: [] });
		inspectProductionMcpSession = async (client, deadline, signal, expectation, budget) => {
			const request = requestOptions(deadline, signal);
			const promptsRequest = listPromptsWhenAdvertised(client, request);
			const [tools, prompts] = await Promise.all([client.listTools(undefined, request), promptsRequest]);
			const sessionTool = tools.tools.find(({ name }) => name === "binary_session");
			const toolDefinition = {
				...sessionTool ?? {
					name: "binary_session",
					inputSchema: { type: "object" }
				},
				outputSchema: expectation.binarySessionOutputSchema
			};
			const requestFlow = expectation.expectedToolNames.includes("binary_session") ? await client.callTool({
				name: "binary_session",
				arguments: {}
			}, {
				...requestOptions(deadline, signal),
				toolDefinition
			}).then(ok, (cause) => err({
				kind: "request-flow",
				detail: doctorTransportDetail(cause, budget, signal)
			})) : err({
				kind: "request-flow",
				detail: MCP_DOCTOR_SESSION_SCOPE_DETAIL
			});
			const inventory = {
				tools: compareInventory(expectation.expectedToolNames, tools.tools.map(({ name }) => name)),
				prompts: compareInventory(expectation.expectedPromptNames, prompts.prompts.map(({ name }) => name))
			};
			const observedIdentity = parseIdentityToolResult(requestFlow.ok ? requestFlow.value.structuredContent : undefined);
			const { catalog } = expectation;
			const serverVersion = client.getServerVersion();
			const protocolVersion = client.getNegotiatedProtocolVersion();
			const checks = [
				{
					name: "initialize",
					ok: serverVersion?.name === PRODUCT_IDENTITY.mcpServerKey && serverVersion.version === PRODUCT_IDENTITY.packageVersion && protocolVersion !== undefined,
					detail: `${serverVersion?.name ?? "unknown"}@${serverVersion?.version ?? "unknown"}; protocol=${protocolVersion ?? "unknown"}`
				},
				...Object.entries(inventory).map(([name, comparison]) => inventoryCheck(name, comparison)),
				{
					name: "server-identity",
					ok: observedIdentity.packageVersion === PRODUCT_IDENTITY.packageVersion && observedIdentity.catalogDigest === catalog.digests.combined_sha256,
					detail: requestFlow.ok ? `package=${observedIdentity.packageVersion ?? "missing"}; catalog=${observedIdentity.catalogDigest ?? "missing"}` : `identity not observed: ${requestFlow.error.detail}`
				},
				{
					name: "request-flow",
					ok: requestFlow.ok && requestFlow.value.isError !== true,
					detail: requestFlow.ok ? "binary_session target-free request" : requestFlow.error.detail
				}
			];
			return {
				healthy: checks.every(({ ok }) => ok),
				adapter: "production-stdio",
				server: {
					name: serverVersion?.name ?? null,
					version: serverVersion?.version ?? null,
					protocol_version: protocolVersion ?? null
				},
				inventory,
				identity: {
					expected_package_version: PRODUCT_IDENTITY.packageVersion,
					observed_package_version: observedIdentity.packageVersion,
					expected_catalog_digest: catalog.digests.combined_sha256,
					observed_catalog_digest: observedIdentity.catalogDigest
				},
				request_flow: {
					tool: "binary_session",
					ok: requestFlow.ok && requestFlow.value.isError !== true
				},
				checks
			};
		};
		runProductionMcpDoctorCli = async (arguments_, input) => {
			const started = performance.now();
			const parsed = parseOutputArguments(arguments_);
			if (!parsed.ok) {
				if (parsed.help) return {
					output: `${renderMcpDoctorHelp()}\n`,
					exitCode: 0
				};
				const failure = parsed.fullOutput ? {
					ok: false,
					error: parsed.error
				} : parsed.error;
				return {
					output: renderCliDocument(parsed.format === "jsonl" ? jsonLinesErrorRecord(failure) : failure, parsed.format, input.stdoutIsTerminal),
					exitCode: 1
				};
			}
			const report = await runProductionMcpDoctor({
				command: process.execPath,
				args: [resolve(input.dispatcherPath), "mcp"],
				cwd: input.packageRoot,
				environment: process.env
			});
			const result = {
				...report,
				scope: MCP_DOCTOR_SCOPE
			};
			const outputValue = parsed.fullOutput ? {
				ok: result.healthy,
				...result.healthy ? { data: result } : { error: result },
				meta: {
					command: MCP_DOCTOR_COMMAND,
					duration: `${Math.round(performance.now() - started)}ms`
				}
			} : result;
			return {
				output: renderCliDocument(parsed.format === "jsonl" && !result.healthy ? jsonLinesErrorRecord(outputValue) : outputValue, parsed.format, input.stdoutIsTerminal),
				exitCode: result.healthy ? 0 : 1
			};
		};
		compareInventory = (expectedNames, observedNames) => {
			const expected = new Set(expectedNames);
			const observed = new Set(observedNames);
			return {
				expected: expectedNames.length,
				observed: observedNames.length,
				missing: [...expected].filter((name) => !observed.has(name)).sort(),
				unexpected: [...observed].filter((name) => !expected.has(name)).sort(),
				duplicates: [...observed].filter((name) => observedNames.filter((candidate) => candidate === name).length > 1).sort()
			};
		};
		inventoryCheck = (name, comparison) => ({
			name: `inventory:${name}`,
			ok: comparison.expected === comparison.observed && comparison.missing.length === 0 && comparison.unexpected.length === 0 && comparison.duplicates.length === 0,
			detail: `expected=${String(comparison.expected)} observed=${String(comparison.observed)} missing=${comparison.missing.join(",") || "none"} unexpected=${comparison.unexpected.join(",") || "none"} duplicates=${comparison.duplicates.join(",") || "none"}`
		});
		parseIdentityToolResult = (input) => {
			if (!isRecord(input) || !isRecord(input.result)) return {
				packageVersion: null,
				catalogDigest: null
			};
			const identity = input.result.server_identity;
			if (!isRecord(identity)) return {
				packageVersion: null,
				catalogDigest: null
			};
			const packageIdentity = identity.package;
			const catalog = identity.catalog;
			const digests = isRecord(catalog) ? catalog.digests : undefined;
			return {
				packageVersion: isRecord(packageIdentity) && typeof packageIdentity.version === "string" ? packageIdentity.version : null,
				catalogDigest: isRecord(digests) && typeof digests.combined_sha256 === "string" ? digests.combined_sha256 : null
			};
		};
		parseOutputArguments = (arguments_) => {
			let format = "toon";
			let fullOutput = false;
			let error;
			for (let index = 0; index < arguments_.length; index += 1) {
				const argument = arguments_[index];
				if (argument === "--json") {
					format = "json";
					continue;
				}
				const inline = argument.startsWith("--format=") ? argument.slice("--format=".length) : undefined;
				if (argument === "--format" || inline !== undefined) {
					const candidate = inline ?? arguments_[index + 1];
					if (inline === undefined) index += 1;
					if (candidate === undefined || candidate === "") error ??= {
						code: "MISSING_OUTPUT_VALUE",
						message: missingCliOutputValueMessage("--format")
					};
					else if (isOutputFormat(candidate)) format = candidate;
					else error ??= {
						code: "VALIDATION_ERROR",
						message: `Invalid output format: ${candidate}`
					};
					continue;
				}
				if (argument === "--full-output") {
					fullOutput = true;
					continue;
				}
				if (HELP_FLAGS.has(argument)) return {
					ok: false,
					help: true
				};
				error ??= {
					code: "VALIDATION_ERROR",
					message: `Unknown mcp doctor option: ${argument}`
				};
			}
			if (error !== undefined) return {
				ok: false,
				help: false,
				format,
				fullOutput,
				error
			};
			return {
				ok: true,
				format,
				fullOutput
			};
		};
		isOutputFormat = (value) => OUTPUT_FORMATS.some((candidate) => candidate === value);
		requestOptions = (deadline, signal) => ({
			signal,
			timeout: Math.max(1, Math.ceil(deadline - performance.now()))
		});
		targetFreeEnvironment = (environment) => {
			const result = Object.fromEntries(Object.entries(environment).filter((entry) => entry[1] !== undefined));
			for (const name of [
				"HOPPER_TARGET_PATH",
				"HOPPER_TARGET_KIND",
				"HOPPER_LOADER_ARGS_JSON"
			]) delete result[name];
			return result;
		};
		;
		readVerifiedRecordedMcpCatalog = () => {
			if (cachedVerifiedCatalog !== undefined) return cachedVerifiedCatalog ?? undefined;
			if ("933fc6d9ca0c972fde2d79daf9fa169ed403483a50cd710e371b699829e0010b" === undefined) {
				cachedVerifiedCatalog = null;
				return undefined;
			}
			try {
				const bytes = readFileSync(new URL("./mcp-catalog.json", new URL("../mcpDoctor.js", import.meta.url).href));
				if (sha256Hex(bytes) !== "933fc6d9ca0c972fde2d79daf9fa169ed403483a50cd710e371b699829e0010b") {
					cachedVerifiedCatalog = null;
					return undefined;
				}
				const parsed = JSON.parse(bytes.toString("utf8"));
				if (!isRecord(parsed) || parsed.version !== 1) {
					cachedVerifiedCatalog = null;
					return undefined;
				}
				cachedVerifiedCatalog = parsed;
				return cachedVerifiedCatalog;
			} catch {
				cachedVerifiedCatalog = null;
				return undefined;
			}
		};
		doctorExpectationForEnvironment = async (environment) => {
			const outputProfile = parseMcpOutputSchemaProfile(environment.REA_MCP_OUTPUT_SCHEMA_PROFILE);
			const resolvedOutputProfile = resolveMcpOutputSchemaProfile(outputProfile.ok ? outputProfile.value : undefined);
			const families = parseMcpToolFamilies(environment.REA_MCP_TOOL_FAMILIES);
			const selection = families.ok && families.value !== undefined ? new Set(families.value) : undefined;
			const catalogProfile = parseMcpToolCatalogProfile(environment.REA_MCP_TOOL_CATALOG_PROFILE);
			const progressive = catalogProfile.ok && catalogProfile.value === "hot-cold";
			if (selection === undefined && RECORDED_CATALOG_DIGEST_PROFILES !== undefined) {
				const recorded = readVerifiedRecordedMcpCatalog();
				const sessionTool = recorded?.tools.find(({ name }) => name === "binary_session");
				if (recorded !== undefined && sessionTool !== undefined && isRecord(sessionTool.outputSchema)) {
					const baseCatalog = {
						counts: recorded.identity.counts,
						digests: RECORDED_CATALOG_DIGEST_PROFILES[resolvedOutputProfile]
					};
					const toolNames = recorded.tools.map(({ name }) => name);
					return {
						catalog: progressive ? progressiveCatalogIdentity(baseCatalog) : baseCatalog,
						expectedToolNames: progressive ? [...toolNames.filter((name) => HOT_TOOL_NAMES.has(name)), DISCOVER_TOOLS.name] : toolNames,
						expectedPromptNames: recorded.prompts.map(({ name }) => name),
						binarySessionOutputSchema: sessionTool.outputSchema
					};
				}
			}
			const { buildLiveMcpDoctorExpectation } = await import("./contracts__catalog__mcpDoctorCatalog-DHE3Zrg9.js");
			return buildLiveMcpDoctorExpectation(selection, resolvedOutputProfile, progressive);
		};
		captureStderr = () => {
			const retained = Buffer.allocUnsafe(MCP_STARTUP_POLICY.doctorStderrBytes);
			let retainedBytes = 0;
			let bytes = 0;
			let truncated = false;
			return {
				append(chunk) {
					const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), "utf8");
					bytes += buffer.byteLength;
					const remaining = retained.byteLength - retainedBytes;
					const copied = Math.min(remaining, buffer.byteLength);
					if (copied > 0) {
						buffer.copy(retained, retainedBytes, 0, copied);
						retainedBytes += copied;
					}
					if (copied < buffer.byteLength) truncated = true;
				},
				value: () => ({
					stderr: truncated ? new StringDecoder("utf8").write(retained.subarray(0, retainedBytes)) : retained.toString("utf8", 0, retainedBytes),
					stderr_bytes: bytes,
					stderr_truncated: truncated
				})
			};
		};
		cleanupFailureDetail = (cause) => {
			const detail = `MCP stdio cleanup failed: ${errorMessage(cause)}`;
			if (!(cause instanceof AnalysisError) || !cause.cleanupIncomplete) return detail;
			const reason = cause.diagnostics?.reason;
			return [typeof reason === "string" ? `${detail} (${reason})` : detail, ...cause.cleanupResources.length === 0 ? [] : [`retained resources: ${cause.cleanupResources.join(", ")}`]].join("; ");
		};
		doctorTransportDetail = (cause, budget, signal) => {
			const message = errorMessage(cause);
			const timedOut = signal.aborted && cause === signal.reason || cause instanceof SdkError && cause.code === SdkErrorCode.RequestTimeout;
			return timedOut ? `${message} ${mcpDoctorDeadlineRecovery(budget)}` : message;
		};
	})))();
}

//#endregion
init_mcpDoctor();
export { runProductionMcpDoctor, runProductionMcpDoctorCli };