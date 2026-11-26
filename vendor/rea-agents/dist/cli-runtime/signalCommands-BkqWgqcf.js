import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisArtifactChangedError, AnalysisCapabilityUnavailableError, AnalysisInputError, AnalysisOutputError, cancelledBy, decodeLimit, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation, init_parseFailure } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_parseFailureAnalysisError, isParseLimit, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactReaderFailure, init_ArtifactReader, init_readStableArtifact, init_resources, readStableArtifact } from "./resources-B3P64jvH.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { BOUNDED_PRODUCER_LIMITS, init_producerResourceLimits, resolveProducerLimits } from "./urlComponents-DJm-wtqY.js";
import { analyzeWithService, contractNamed, init_contractCliDescription, init_contractCommand, inspectWithService, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { finalizedResult, init_runOwned, runOwned } from "./runOwned-BkKv5e_3.js";
import { init_analysisSearch, literalSubstringPredicate } from "./analysisViewResult-vDCF9Pxo.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { OwnedCommandFailure, init_OwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { classifyProviderOutcome, init_classifyProviderOutcome } from "./classifyProviderOutcome-BMRoGrMs.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { PRODUCER_LIMITS_HELP, init_producerLimitsOption } from "./producerLimitsOption-qOlmwAOk.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { assertArtifactCommandPath, init_ArtifactCommandPath, selectArtifactCommandPath } from "./ArtifactCommandPath-B5Zuhaxu.js";
import { init_LinuxResourceLimits, prlimitArgumentVector, readLinuxResourceLimits } from "./LinuxResourceLimits-vLyr_vuV.js";
import { ARTIFACT_PRODUCER_LIMITATION, artifactResourceDialect, createArtifactAnalysisResources, init_ArtifactAnalysisResources, init_artifactResourceFailure } from "./artifactResourceFailure-B1kDUAIH.js";
import { init_privateWorkspaceFailure, privateWorkspaceFailure } from "./privateWorkspaceFailure-CaX68g9s.js";
import { SIGNAL_TOOL_CONTRACTS, decodeSignalRecordingInputSchema, init_annotationTextWindow, init_signalDecoders, init_signalRecording, init_signalToolContracts, inspectSignalDecodersInputSchema, signalDecodersSchema, signalRecordingSchema, windowAnnotationText } from "./signalToolContracts-O7asDp-K.js";
import { constants } from "node:fs";
import { basename, isAbsolute, join } from "node:path";
import { randomUUID } from "node:crypto";
import { access, writeFile } from "node:fs/promises";

//#region dist/application/signals/SignalRecordingService.js
var SignalRecordingService;
function init_SignalRecordingService() {
	return (init_SignalRecordingService = __esmMin((() => {
		init_signalDecoders();
		init_analysisObservation();
		init_analysisErrorCore();
		init_signalRecording();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		SignalRecordingService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			async decode(raw, options) {
				const operation = "decode_signal_recording";
				const input = parseAnalysisInput(operation, raw, decodeSignalRecordingInputSchema, options?.signal);
				if (!input.ok) return input;
				const decoded = await this.provider.decode(input.value, options);
				if (!decoded.ok) return decoded;
				const execution = decoded.value;
				const report = signalRecordingSchema.safeParse(execution.result);
				if (!report.success || report.data.artifact.path !== input.value.path || execution.subject?.path !== input.value.path || execution.subject.sha256 !== report.data.artifact.sha256 || JSON.stringify(report.data.selection) !== JSON.stringify(input.value)) return err(new AnalysisOutputError(operation, "Decoder returned malformed data or changed the selected recording identity/options."));
				return completeProviderEvidence(createAnalysisExecutionEvidence(operation, input.value, execution, "observed"), options?.signal);
			}
			async inspectDecoders(raw, options) {
				const operation = "inspect_signal_decoders";
				const input = parseAnalysisInput(operation, raw, inspectSignalDecodersInputSchema, options?.signal);
				if (!input.ok) return input;
				const decoded = await this.provider.inspectDecoders(input.value, options);
				if (!decoded.ok) return decoded;
				const execution = decoded.value;
				const report = signalDecodersSchema.safeParse(execution.result);
				if (!report.success || JSON.stringify(report.data.selection) !== JSON.stringify(input.value) || execution.subject?.path !== report.data.tool.path || execution.subject.sha256 !== report.data.tool.sha256) return err(new AnalysisOutputError(operation, "Decoder discovery returned malformed data or changed the selected installation/options."));
				return completeProviderEvidence(createAnalysisExecutionEvidence(operation, input.value, execution, "observed"), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/signals/SigrokProviderIdentity.js
var SIGROK_PROVIDER_IDENTITY;
function init_SigrokProviderIdentity() {
	return (init_SigrokProviderIdentity = __esmMin((() => {
		SIGROK_PROVIDER_IDENTITY = {
			id: "sigrok-recording",
			name: "REA sigrok recording adapter",
			version: "sigrok-cli@0.7.2"
		};
	})))();
}

//#endregion
//#region dist/signals/parseDecoderDiscovery.js
function* discoveryLines(text) {
	let start = 0;
	while (start < text.length) {
		const newline = text.indexOf("\n", start);
		if (newline < 0) {
			yield text.slice(start);
			return;
		}
		const end = text.charCodeAt(newline - 1) === 13 ? newline - 1 : newline;
		yield text.slice(start, end);
		start = newline + 1;
	}
}
var DECODER_CATALOG_FORMAT, DECODER_CATALOG_LINES, copyText, assertDiscoveryLineBudget, parseDecoderDiscovery, findCatalogHeading;
function init_parseDecoderDiscovery() {
	return (init_parseDecoderDiscovery = __esmMin((() => {
		init_analysisSearch();
		init_parseFailure();
		DECODER_CATALOG_FORMAT = "sigrok-decoder-catalog";
		DECODER_CATALOG_LINES = 65536;
		copyText = (value) => Buffer.from(value, "utf16le").toString("utf16le");
		assertDiscoveryLineBudget = (text) => {
			let separators = 0;
			let end = text.indexOf("\n");
			while (end >= 0) {
				if (++separators >= DECODER_CATALOG_LINES) throw decodeLimit(DECODER_CATALOG_FORMAT, "Decoder discovery exceeds the 65,536-line representation budget", {
					name: "line_budget",
					maximum: DECODER_CATALOG_LINES
				});
				end = text.indexOf("\n", end + 1);
			}
		};
		parseDecoderDiscovery = (text, input) => {
			assertDiscoveryLineBudget(text);
			const matches = literalSubstringPredicate(input.query, false);
			const decoders = [];
			const help = [];
			let examined = 0;
			let matching = 0;
			const select = () => {
				const index = matching++ - input.offset;
				return index >= 0 && (input.limit === null || index < input.limit);
			};
			const lines = discoveryLines(text);
			const catalog = input.decoder === null;
			if (catalog) {
				const heading = findCatalogHeading(lines);
				if (!heading) throw new Error("sigrok decoder catalog heading is missing");
				const seen = new Set();
				for (let next = lines.next(); !next.done; next = lines.next()) {
					if (next.value === "") continue;
					const match = /^ {2}([a-zA-Z0-9_+-]+) +(.+)$/u.exec(next.value);
					const id = match?.[1];
					const name = match?.[2];
					if (id === undefined || name === undefined || seen.has(id)) throw new Error("Malformed or duplicate sigrok decoder catalog record");
					seen.add(id);
					examined += 1;
					if ((matches(id) || matches(name)) && select()) decoders.push({
						id: copyText(id),
						name: copyText(name)
					});
				}
				if (examined === 0) throw new Error("sigrok returned an empty decoder catalog");
			} else {
				const heading = lines.next();
				if (heading.done || heading.value !== `ID: ${input.decoder}`) throw new Error("Decoder help does not identify the selected decoder");
				for (let next = heading; !next.done; next = lines.next()) {
					examined += 1;
					if (matches(next.value) && select()) help.push({
						line_number: examined,
						text: copyText(next.value)
					});
				}
			}
			const returned = decoders.length + help.length;
			return {
				decoders,
				help_lines: help,
				output_window: {
					unit: catalog ? "decoders" : "help-lines",
					examined,
					matching,
					returned,
					has_more: matching - input.offset > returned
				}
			};
		};
		findCatalogHeading = (lines) => {
			for (let next = lines.next(); !next.done; next = lines.next()) if (next.value === "Supported protocol decoders:") return true;
			return false;
		};
	})))();
}

//#endregion
//#region dist/signals/sigrokSelectorRejection.js
var rejectedSelector, DECODE_RECOVERY, HELP_RECOVERY, CHANNEL_RECOVERY, INPUT_FORMAT_RECOVERY, INPUT_OPTION_RECOVERY, unknownDecoderRefusal, missingSelectedChannelRefusal, parseSigrokSelectorRejection;
function init_sigrokSelectorRejection() {
	return (init_sigrokSelectorRejection = __esmMin((() => {
		rejectedSelector = (field, producerMessage, recovery) => ({
			path: [field],
			reason: "invalid_value",
			message: `sigrok-cli rejected the ${field} selector: ${producerMessage} ${recovery}`
		});
		DECODE_RECOVERY = "Use inspect_signal_decoders to list installed decoder IDs, or pass a decoder ID to show its options and annotation classes.";
		HELP_RECOVERY = "Omit decoder to list installed decoder IDs, optionally filtered by query, then request help for one of those IDs.";
		CHANNEL_RECOVERY = "Set each decoder channel target to a channel present in the recording; inspect_signal_decoders shows the selected decoder's channel IDs.";
		INPUT_FORMAT_RECOVERY = "Use a supported sigrok input format name, or omit input_format to let sigrok-cli autodetect the recording.";
		INPUT_OPTION_RECOVERY = "Use options supported by the selected sigrok input format, or remove the rejected option.";
		unknownDecoderRefusal = (hasDiagnostic, id) => {
			const producerMessage = `Failed to load protocol decoder ${id}.`;
			return id !== "" && hasDiagnostic(producerMessage) && hasDiagnostic(`srd: ModuleNotFoundError: Failed to load decoder ${id}: import by name failed: No module named '${id}'`) ? producerMessage : undefined;
		};
		missingSelectedChannelRefusal = (hasDiagnostic, decoders) => {
			const selectedValues = new Set();
			for (const decoder of decoders.split(",")) {
				for (const assignment of decoder.split(":").slice(1)) {
					const separator = assignment.indexOf("=");
					if (separator < 0 && assignment !== "") {
						const producerMessage = `Channel name for "${assignment}" missing.`;
						if (hasDiagnostic(`cli: ${producerMessage}`)) return producerMessage;
					}
					if (separator > 0) selectedValues.add(assignment.slice(separator + 1));
				}
			}
			for (const channel of selectedValues) {
				const producerMessage = `No channel with name "${channel}" found.`;
				if (hasDiagnostic(`cli: ${producerMessage}`)) return producerMessage;
			}
			return undefined;
		};
		parseSigrokSelectorRejection = (stderr, selection) => {
			const hasDiagnostic = (message) => stderr === message || stderr.startsWith(`${message}\n`) || stderr.endsWith(`\n${message}`) || stderr.includes(`\n${message}\n`);
			if ("decoder" in selection) {
				const refusal = selection.decoder === null ? undefined : unknownDecoderRefusal(hasDiagnostic, selection.decoder);
				return refusal === undefined ? undefined : rejectedSelector("decoder", refusal, HELP_RECOVERY);
			}
			const [inputFormat = "", ...inputOptions] = selection.input_format?.split(":") ?? [];
			const inputFormatRefusal = `Error: unknown input module '${inputFormat}'.`;
			if (inputFormat !== "" && hasDiagnostic(`cli: ${inputFormatRefusal}`)) return rejectedSelector("input_format", inputFormatRefusal, INPUT_FORMAT_RECOVERY);
			for (const option of inputOptions) {
				const key = option.split("=", 1)[0] ?? "";
				const producerMessage = `Unknown keyword: ${key}.`;
				if (key !== "" && hasDiagnostic(producerMessage)) return rejectedSelector("input_format", producerMessage, INPUT_OPTION_RECOVERY);
			}
			for (const entry of selection.decoders.split(",")) {
				const refusal = unknownDecoderRefusal(hasDiagnostic, entry.split(":")[0] ?? "");
				if (refusal !== undefined) return rejectedSelector("decoders", refusal, DECODE_RECOVERY);
			}
			const missingChannel = missingSelectedChannelRefusal(hasDiagnostic, selection.decoders);
			if (missingChannel !== undefined) return rejectedSelector("decoders", missingChannel, CHANNEL_RECOVERY);
			for (const entry of selection.annotations?.split(",") ?? []) {
				const [decoder = "", classes, ...rest] = entry.split("=");
				if (decoder === "" || classes === undefined || rest.length > 0) continue;
				for (const annotation of classes.split(":")) {
					const producerMessage = `Annotation '${annotation}' not found for protocol decoder '${decoder}'.`;
					if (annotation !== "" && hasDiagnostic(producerMessage)) return rejectedSelector("annotations", producerMessage, DECODE_RECOVERY);
				}
			}
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/signals/SigrokRecordingProvider.js
var OPERATION, sigrokHostSupported, UnattributedVersionProbeFailure, SigrokRecordingProvider;
function init_SigrokRecordingProvider() {
	return (init_SigrokRecordingProvider = __esmMin((() => {
		init_capturedProviderOutput();
		init_classifyProviderFailure();
		init_classifyProviderOutcome();
		init_producerResourceLimits();
		init_SigrokProviderIdentity();
		init_snapshotEnvironment();
		init_HostPlatform();
		init_signalDecoders();
		init_parseFailureAnalysisError();
		init_parseDecoderDiscovery();
		init_sigrokSelectorRejection();
		init_LinuxResourceLimits();
		init_AnalysisProvider();
		init_resources();
		init_ArtifactAnalysisResources();
		init_artifactResourceFailure();
		init_ArtifactCommandPath();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_analysisObservation();
		init_fixedAllowanceRemediation();
		init_providerAdapterError();
		init_annotationTextWindow();
		init_signalRecording();
		init_result();
		init_runOwned();
		init_OwnedCommand();
		init_PrivateRuntimeRoot();
		init_privateWorkspaceFailure();
		init_errorMessage();
		OPERATION = "decode_signal_recording";
		sigrokHostSupported = (platform) => platform === "linux";
		UnattributedVersionProbeFailure = class extends Error {
			statusOwner = "limiter-or-tool";
			constructor() {
				super("The resource-limited sigrok-cli --version probe failed; the status may come from the limiter or from sigrok-cli, so inspect both selected installations and the captured output.");
				this.name = "UnattributedVersionProbeFailure";
			}
		};
		SigrokRecordingProvider = class {
			environment;
			launcher;
			createRuntime;
			platform;
			readArtifact;
			readLimits;
			#resources;
			constructor(environment = process.env, launcher, createRuntime = () => PrivateRuntimeRoot.create({ prefix: "rea-sigrok-" }), platform = HOST_PLATFORM.platform, readArtifact = readStableArtifact, readLimits = readLinuxResourceLimits) {
				this.environment = environment;
				this.launcher = launcher;
				this.createRuntime = createRuntime;
				this.platform = platform;
				this.readArtifact = readArtifact;
				this.readLimits = readLimits;
				this.#resources = createArtifactAnalysisResources(SIGROK_PROVIDER_IDENTITY.id, OPERATION, readArtifact, readLimits, {
					message: "A sigrok operation is already active; retry after it completes.",
					details: { max_concurrent_decodes: 1 }
				});
			}
			decode(input, options) {
				return this.#resources.run(() => this.#executeRequest(input, options), options?.signal);
			}
			inspectDecoders(input, options) {
				return this.#resources.run(() => this.#executeRequest(input, options), options?.signal, "inspect_signal_decoders");
			}
			close() {
				return this.#resources.close();
			}
			async #executeRequest(input, options) {
				const limits = resolveProducerLimits(BOUNDED_PRODUCER_LIMITS, input.producer_limits);
				const environment = snapshotEnvironment(this.environment, this.platform);
				const operation = "path" in input ? OPERATION : "inspect_signal_decoders";
				let phase = "configuration";
				let capturedOutput;
				let resourcePath = "path" in input ? input.path : "sigrok decoder catalog";
				let effectiveLimits;
				let root;
				let result;
				try {
					if (options?.signal?.aborted) throw cancelledBy(operation, options.signal);
					await this.#resources.release();
					if (!sigrokHostSupported(this.platform)) throw new Error("Signal decoding requires Linux with util-linux prlimit and REA_SIGROK_COMMAND so expanded recordings are processed under an enforced address-space limit.");
					const configured = environment.REA_SIGROK_COMMAND ?? "";
					if (!isAbsolute(configured)) throw new Error("Supply absolute REA_SIGROK_COMMAND for sigrok-cli 0.7.2 with libsigrokdecode.");
					const selectedCommand = await selectArtifactCommandPath(configured, options?.signal);
					const command = selectedCommand.resolvedPath;
					await access(command, constants.X_OK);
					const tool = await this.#resources.read(command, 64 * 1024 * 1024, options?.signal);
					const configuredLimiter = environment.REA_SIGROK_PRLIMIT_COMMAND ?? "/usr/bin/prlimit";
					if (!isAbsolute(configuredLimiter)) throw new Error("REA_SIGROK_PRLIMIT_COMMAND must be absolute.");
					const selectedLimiter = await selectArtifactCommandPath(configuredLimiter, options?.signal);
					const limiter = selectedLimiter.resolvedPath;
					await access(limiter, constants.X_OK);
					const limiterIdentity = await this.#resources.read(limiter, 64 * 1024 * 1024, options?.signal);
					effectiveLimits = await this.#resources.readLimits(limits);
					const limitArguments = prlimitArgumentVector(effectiveLimits, selectedCommand.invocationPath);
					phase = "workspace";
					root = await this.createRuntime();
					this.#resources.retain(root, undefined);
					const snapshotName = "path" in input ? basename(input.path) : "recording";
					const snapshotPath = join(root.path, snapshotName);
					const execute = async (args, selection) => {
						capturedOutput = undefined;
						await assertArtifactCommandPath(selectedCommand, operation, { signal: options?.signal });
						await assertArtifactCommandPath(selectedLimiter, operation, { signal: options?.signal });
						const output = await runOwnedCommand({
							command: selectedLimiter.invocationPath,
							arguments: [...limitArguments, ...args],
							...root === undefined ? {} : { cwd: root.path },
							expectedCommand: null,
							runId: `rea-sigrok-${randomUUID()}`,
							hostEnvironment: environment
						}, {
							timeoutMs: limits.command_timeout_ms,
							diagnosticBytes: limits.output_bytes,
							acceptNonZeroExit: true
						}, {
							...options?.signal === undefined ? {} : { signal: options.signal },
							...this.launcher === undefined ? {} : { launcher: this.launcher }
						});
						capturedOutput = capturedProviderOutput(output);
						await assertArtifactCommandPath(selectedCommand, operation, { capturedOutput });
						await assertArtifactCommandPath(selectedLimiter, operation, { capturedOutput });
						const current = await this.#resources.readCommandAfterRun(command, {
							path: limiter,
							sha256: limiterIdentity.sha256
						}, capturedOutput, operation);
						if (current.sha256 !== tool.sha256) throw new AnalysisArtifactChangedError(operation, command, "Configured decoder executable changed during analysis.", { capturedOutput });
						resourcePath = "path" in input ? input.path : command;
						const invalidUtf8Streams = [...output.stdout.invalidUtf8 ? ["stdout"] : [], ...output.stderr.invalidUtf8 ? ["stderr"] : []];
						if (invalidUtf8Streams.length > 0) throw new AnalysisOutputError(operation, "sigrok-cli output is not valid UTF-8; retained text contains replacement characters.", {
							capturedOutput,
							diagnostics: {
								stage: phase,
								invalid_utf8_streams: invalidUtf8Streams
							}
						});
						const rejection = selection === undefined ? undefined : parseSigrokSelectorRejection(output.stderr.text, selection);
						if (rejection !== undefined) throw new AnalysisInputError(operation, {
							capturedOutput,
							userMessage: rejection.message
						}, [rejection]);
						if (output.exitCode !== 0 && phase === "configuration") throw new UnattributedVersionProbeFailure();
						if (output.exitCode !== 0) throw new ProviderAdapterError(SIGROK_PROVIDER_IDENTITY.id, operation, { diagnostics: {
							exit_code: capturedOutput.exit_code ?? null,
							stdout: capturedOutput.stdout,
							stderr: capturedOutput.stderr
						} });
						return output;
					};
					phase = "configuration";
					const version = await execute(["--version"]);
					if (!/^sigrok-cli 0\.7\.2(?:\r?\n|$)/u.test(version.stdout.text) || !version.stdout.text.includes("libsigrokdecode")) throw new Error("Expected sigrok-cli 0.7.2 with libsigrokdecode; inspect the selected installation.");
					const metadata = (args, diagnostics) => ({
						diagnostics,
						tool: {
							configured_path: configured,
							path: command,
							sha256: tool.sha256,
							version_banner: version.stdout.text,
							version_diagnostics: version.stderr.text,
							arguments: [...args]
						},
						resource_limiter: {
							configured_path: configuredLimiter,
							path: limiter,
							sha256: limiterIdentity.sha256,
							arguments: limitArguments
						},
						limits: {
							...limits,
							...effectiveLimits
						},
						hardware_acquisition: "not-performed"
					});
					if (!("path" in input)) {
						phase = "producer";
						const args = input.decoder === null ? ["--dont-scan", "--list-supported"] : [
							"--dont-scan",
							`--protocol-decoders=${input.decoder}`,
							"--show"
						];
						const output = await execute(args, input);
						const report = signalDecodersSchema.parse({
							selection: input,
							...parseDecoderDiscovery(output.stdout.text, input),
							...metadata(args, output.stderr.text)
						});
						result = ok(createAnalysisExecution(report, SIGROK_PROVIDER_IDENTITY, {
							subject: {
								path: command,
								sha256: tool.sha256,
								format: "file"
							},
							limitations: [
								"Catalog and help are observed from the selected sigrok installation. Help lines preserve producer descriptions, not a separately validated parameter schema.",
								"Each request probes the installation again; pages do not share a frozen catalog. Decoder modules and libraries are trusted and not fully fingerprinted.",
								"Hardware discovery, recording reads and acquisition are not requested. Linux per-process limits and bounded output apply; this is not an OS sandbox."
							]
						}));
					} else {
						const selected = await this.#resources.readSelectedArtifact({
							path: input.path,
							maximumBytes: limits.input_bytes,
							allowanceName: "the sigrok input allowance",
							budgetParameter: "producer_limits.input_bytes",
							observedOutput: capturedOutput,
							signal: options?.signal
						});
						phase = "workspace";
						await writeFile(snapshotPath, selected.bytes, {
							flag: "wx",
							mode: 256
						});
						phase = "producer";
						const args = [
							"--dont-scan",
							`--input-file=./${snapshotName}`,
							`--protocol-decoders=${input.decoders}`,
							"--protocol-decoder-samplenum",
							...input.input_format === null ? [] : [`--input-format=${input.input_format}`],
							...input.annotations === null ? [] : [`--protocol-decoder-annotations=${input.annotations}`]
						];
						const output = await execute(args, input);
						phase = "integrity";
						resourcePath = snapshotPath;
						if ((await this.#resources.read(snapshotPath, limits.input_bytes)).sha256 !== selected.sha256) throw new AnalysisArtifactChangedError(operation, snapshotPath, "Decoder changed the private recording copy.", capturedOutput === undefined ? {} : { capturedOutput });
						phase = "producer";
						resourcePath = "path" in input ? input.path : command;
						const report = signalRecordingSchema.parse({
							artifact: {
								path: input.path,
								sha256: selected.sha256,
								bytes: selected.bytes.length
							},
							selection: input,
							...windowAnnotationText(output.stdout.text, input.line_offset, input.line_limit),
							...metadata(args, output.stderr.text)
						});
						result = ok(createAnalysisExecution(report, SIGROK_PROVIDER_IDENTITY, {
							subject: {
								path: input.path,
								sha256: selected.sha256,
								format: "file"
							},
							locations: [{
								kind: "artifact-path",
								path: input.path
							}],
							limitations: [
								"Annotations are the selected decoder's interpretation of the recorded samples and caller-selected settings, not independently verified protocol semantics. Empty output does not establish absence of traffic.",
								"Sample-number ranges and display text are preserved verbatim, not converted to timestamps or parsed as a lossless byte stream. All producer stderr is retained, including warnings on exit zero.",
								"Only a private copy of the selected file is decoded. Hardware discovery/acquisition and target execution are not requested. Caller-supplied tools, plugins and decoder modules are trusted; this is not an OS sandbox.",
								ARTIFACT_PRODUCER_LIMITATION
							]
						}));
					}
				} catch (cause) {
					if (root !== undefined && cause instanceof OwnedCommandFailure && cause.cleanupOwner !== undefined) this.#resources.retain(root, cause.cleanupOwner);
					result = err(classifyProviderFailure(cause, this.#failureDialect(phase, resourcePath, root?.path ?? null, effectiveLimits, capturedOutput, operation, limits)));
				}
				const completed = result;
				return finalizedResult(await runOwned(async () => completed, {
					providerId: this.#resources.providerId,
					operation,
					signal: options?.signal,
					close: () => this.#resources.release(),
					partial: (execution) => createAnalysisExecutionEvidence(operation, input, execution, "observed")
				}));
			}
			/** This provider's dialect for the shared provider failure classifier. */
			#failureDialect(phase, path, workspacePath, effectiveLimits, observedOutput, operation, limits) {
				const command = this.#resources.commandContext(limits, effectiveLimits, operation, "producer_limits");
				if (phase === "integrity") return artifactResourceDialect(this.#resources, {
					kind: "integrity",
					operation,
					path,
					capturedOutput: observedOutput
				});
				return {
					providerId: SIGROK_PROVIDER_IDENTITY.id,
					operation,
					recognise: (cause) => isParseLimit(cause, "sigrok-decoder-catalog") ? parseLimitConstraint(operation, "memory", cause, {
						...observedOutput === undefined ? {} : { capturedOutput: observedOutput },
						...fixedAllowanceOptions("The sigrok decoder-discovery line allowance", "capture", {
							limit: cause.failure.limit.maximum,
							unit: "lines"
						})
					}) : undefined,
					command: () => command,
					commandCleanup: (_failure, _primary, outcome) => classifyProviderOutcome(outcome, command),
					readCleanup: (read, primary) => this.#resources.readCleanupFailure(read, primary, observedOutput, operation),
					observedOutput,
					unclassified: (cause) => {
						const reason = errorMessage(cause);
						if (phase === "workspace") return privateWorkspaceFailure(SIGROK_PROVIDER_IDENTITY.id, operation, cause, workspacePath);
						if (phase === "configuration") return new AnalysisCapabilityUnavailableError(SIGROK_PROVIDER_IDENTITY.id, operation, reason, {
							cause,
							...observedOutput === undefined ? {} : { capturedOutput: observedOutput },
							...cause instanceof UnattributedVersionProbeFailure ? { diagnostics: { version_probe_status_owner: cause.statusOwner } } : {},
							userMessage: `${reason} On Linux, configure sigrok-cli 0.7.2 through REA_SIGROK_COMMAND and util-linux prlimit through REA_SIGROK_PRLIMIT_COMMAND (default /usr/bin/prlimit).`
						});
						if (cause instanceof ArtifactReaderFailure && cause.reason === "integrity") return new AnalysisArtifactChangedError(operation, path, reason, { cause });
						return new AnalysisOutputError(operation, reason, {
							cause,
							...observedOutput === undefined ? {} : { capturedOutput: observedOutput }
						});
					}
				};
			}
		};
	})))();
}

//#endregion
//#region dist/composition/signals.js
var createSignalRecordingService;
function init_signals() {
	return (init_signals = __esmMin((() => {
		init_SignalRecordingService();
		init_HostPlatform();
		init_SigrokRecordingProvider();
		createSignalRecordingService = (environment = process.env, platform = HOST_PLATFORM.platform) => new SignalRecordingService(new SigrokRecordingProvider(environment, undefined, undefined, platform));
	})))();
}

//#endregion
//#region dist/cli/signalCommands.js
var signalCommands_exports = /* @__PURE__ */ __exportAll({ registerSignalCommands: () => registerSignalCommands });
var registerSignalCommands;
function init_signalCommands() {
	return (init_signalCommands = __esmMin((() => {
		init_signals();
		init_signalToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_producerLimitsOption();
		registerSignalCommands = (cli, logger, environment, service = createSignalRecordingService(environment)) => {
			const close = () => service.close();
			registerContractCommand(cli, logger, contractNamed(SIGNAL_TOOL_CONTRACTS, "inspect_signal_decoders"), {
				description: "Search installed sigrok decoders or selected decoder help",
				jsonText: ["producer_limits"],
				nullFlags: { limit: {
					key: "all",
					description: "Return all remaining matches"
				} },
				fields: {
					producer_limits: { description: PRODUCER_LIMITS_HELP },
					limit: { description: "Maximum matching decoders or help lines to return; defaults to 50" }
				}
			}, analyzeWithService(() => ({
				inspect: (input, options) => service.inspectDecoders(input, options),
				close
			}), "sigrok-recording"));
			registerContractCommand(cli, logger, contractNamed(SIGNAL_TOOL_CONTRACTS, "decode_signal_recording"), {
				description: "Decode an existing signal recording with caller-supplied sigrok",
				positionals: ["path"],
				callerPaths: ["path"],
				jsonText: ["producer_limits"],
				nullFlags: { line_limit: {
					key: "all_lines",
					description: "Return all remaining output lines instead of a bounded page"
				} },
				crossFieldRules: "argv",
				fields: {
					path: { description: "Local signal recording" },
					producer_limits: { description: PRODUCER_LIMITS_HELP },
					input_format: { name: "input_format" },
					line_offset: { name: "line_offset" },
					line_limit: {
						name: "line_limit",
						description: "Returned output lines per page; default 50"
					}
				}
			}, inspectWithService(() => ({
				inspect: (input, options) => service.decode(input, options),
				close
			}), "sigrok-recording"));
		};
	})))();
}

//#endregion
export { init_signalCommands, signalCommands_exports };