import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisArtifactChangedError, AnalysisCapabilityUnavailableError, AnalysisOutputError, cancelledBy, decodeLimit, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation, init_parseFailure } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_parseFailureAnalysisError, isParseLimit, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactReaderFailure, init_ArtifactReader, init_StableArtifactFailure, init_readStableArtifact, init_resources, readStableArtifact, readerIntegrityFailure } from "./resources-B3P64jvH.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { capturePacketJsonExpansionError, init_capturePacketJsonExpansion, resolveCapturePacketJsonExpansion } from "./capturePacketJsonExpansion-gtEDmQip.js";
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
import { CAPTURE_TOOL_CONTRACTS, init_captureToolContracts, init_packetCapture, init_packetFields, inspectPacketCaptureInputSchema, inspectPacketFieldsInputSchema, packetCaptureSchema, packetFieldsCatalogSchema, packetFieldsSchema } from "./captureToolContracts-sg1Etrtd.js";
import { init_LinuxResourceLimits, prlimitArgumentVector, readLinuxResourceLimits } from "./LinuxResourceLimits-vLyr_vuV.js";
import { TSHARK_COMMAND_ENV, assertWiresharkExecutableIdentity, init_PcapConfiguration, init_tsharkJsonPackets, locateWiresharkTool, parseWiresharkVersion, readTsharkJsonPackets, selectWiresharkTool, wiresharkExecutableIdentity } from "./PcapConfiguration-C68Uls6W.js";
import { ARTIFACT_PRODUCER_LIMITATION, artifactResourceDialect, createArtifactAnalysisResources, init_ArtifactAnalysisResources, init_artifactResourceFailure } from "./artifactResourceFailure-B1kDUAIH.js";
import { init_privateWorkspaceFailure, privateWorkspaceFailure } from "./privateWorkspaceFailure-CaX68g9s.js";
import { constants } from "node:fs";
import { isAbsolute, join } from "node:path";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { access, mkdir, writeFile } from "node:fs/promises";

//#region dist/application/captures/PacketCaptureService.js
var PacketCaptureService;
function init_PacketCaptureService() {
	return (init_PacketCaptureService = __esmMin((() => {
		init_packetFields();
		init_analysisObservation();
		init_analysisErrorCore();
		init_packetCapture();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		PacketCaptureService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			async inspect(raw, options) {
				const operation = "inspect_packet_capture";
				const input = parseAnalysisInput(operation, raw, inspectPacketCaptureInputSchema, options?.signal);
				if (!input.ok) return input;
				const decoded = await this.provider.inspect(input.value, options);
				if (!decoded.ok) return decoded;
				const execution = decoded.value;
				const report = packetCaptureSchema.safeParse(execution.result);
				if (!report.success || report.data.artifact.path !== input.value.path || execution.subject?.path !== input.value.path || execution.subject.sha256 !== report.data.artifact.sha256 || JSON.stringify(report.data.selection) !== JSON.stringify(input.value)) return err(new AnalysisOutputError(operation, "Capture analyzer returned malformed data or changed the selected artifact identity/options."));
				return completeProviderEvidence(createAnalysisExecutionEvidence(operation, input.value, execution, "observed"), options?.signal);
			}
			async inspectFields(raw, options) {
				const operation = "inspect_packet_fields";
				const input = parseAnalysisInput(operation, raw, inspectPacketFieldsInputSchema, options?.signal);
				if (!input.ok) return input;
				const decoded = await this.provider.inspectFields(input.value, options);
				if (!decoded.ok) return decoded;
				const execution = decoded.value;
				const report = packetFieldsCatalogSchema.safeParse(execution.result);
				if (!report.success || JSON.stringify(report.data.selection) !== JSON.stringify(input.value) || execution.subject?.path !== report.data.tool.path || execution.subject.sha256 !== report.data.tool.sha256) return err(new AnalysisOutputError(operation, "Field discovery returned malformed data or changed the selected installation/options."));
				return completeProviderEvidence(createAnalysisExecutionEvidence(operation, input.value, execution, "observed"), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/captures/TsharkProviderIdentity.js
var TSHARK_PROVIDER_IDENTITY;
function init_TsharkProviderIdentity() {
	return (init_TsharkProviderIdentity = __esmMin((() => {
		TSHARK_PROVIDER_IDENTITY = {
			id: "tshark-capture",
			name: "REA TShark capture adapter",
			version: "tshark@4"
		};
	})))();
}

//#endregion
//#region dist/captures/parseFieldDiscovery.js
var FIELD_GLOSSARY_FORMAT, FIELD_RECORD_BUDGET, parseFieldDiscovery;
function init_parseFieldDiscovery() {
	return (init_parseFieldDiscovery = __esmMin((() => {
		init_analysisSearch();
		init_parseFailure();
		FIELD_GLOSSARY_FORMAT = "tshark-field-glossary";
		FIELD_RECORD_BUDGET = 8 * 1024 * 1024;
		parseFieldDiscovery = (text, input) => {
			const copy = (value) => Buffer.from(value, "utf16le").toString("utf16le");
			const matches = literalSubstringPredicate(input.query, false);
			const records = [];
			let examined = 0, matching = 0, sourceLine = 0, budget = 0;
			for (let start = 0; start < text.length;) {
				const end = text.indexOf("\n", start);
				let line = text.slice(start, end < 0 ? text.length : end);
				start = end < 0 ? text.length : end + 1;
				sourceLine++;
				if (line.endsWith("\r")) line = line.slice(0, -1);
				const columns = line.split("	", 9);
				const [tag, name, abbreviation] = columns;
				if (!(tag === "P" && columns.length === 3 || tag === "F" && columns.length === 8) || name === undefined || abbreviation === undefined || abbreviation === "") throw new Error(`Malformed TShark field glossary record at line ${sourceLine}`);
				if (input.kind === "protocols" !== (tag === "P")) continue;
				examined++;
				if (input.protocol !== null && (tag === "P" ? abbreviation : columns[4]) !== input.protocol) continue;
				if (![
					name,
					abbreviation,
					...tag === "F" ? [columns[7] ?? ""] : []
				].some(matches)) continue;
				matching++;
				if (matching <= input.offset || records.length >= (input.limit ?? Number.MAX_SAFE_INTEGER)) continue;
				budget += Buffer.byteLength(line, "utf8") * 6 + 512;
				if (budget > 8388608) throw decodeLimit(FIELD_GLOSSARY_FORMAT, "Selected glossary records exceed the 8 MiB representation budget; narrow the query or page size", {
					name: "record_budget_bytes",
					maximum: FIELD_RECORD_BUDGET
				});
				records.push({
					source_line: sourceLine,
					kind: tag === "P" ? "protocol" : "field",
					name: copy(name),
					abbreviation: copy(abbreviation),
					field_type: tag === "F" ? copy(columns[3] ?? "") : null,
					parent_protocol: tag === "F" ? copy(columns[4] ?? "") : null,
					display_base: tag === "F" ? copy(columns[5] ?? "") : null,
					bitmask: tag === "F" ? copy(columns[6] ?? "") : null,
					description: tag === "F" ? copy(columns[7] ?? "") : null
				});
			}
			if (sourceLine === 0) throw new Error("TShark returned an empty field glossary");
			return {
				records,
				output_window: {
					examined,
					matching,
					returned: records.length,
					has_more: Math.max(0, matching - input.offset) > records.length
				}
			};
		};
	})))();
}

//#endregion
//#region dist/captures/parsePacketOutput.js
var packetsSchema, parsePacketOutput;
function init_parsePacketOutput() {
	return (init_parsePacketOutput = __esmMin((() => {
		init_packetCapture();
		init_result();
		init_tsharkJsonPackets();
		packetsSchema = z.array(packetFieldsSchema);
		parsePacketOutput = async (text, packetLimit, budget) => {
			const read = await readTsharkJsonPackets(text, {
				maxBytes: budget.outputBytes,
				maxDecodedBytes: budget.expansionBytes,
				decodedBytes: 0
			});
			if (!read.ok) switch (read.error.kind) {
				case "json-expansion": return err({ kind: "expansion" });
				case "json-bytes": return err({
					kind: "output",
					reason: "TShark output exceeds the selected producer output budget."
				});
				case "malformed-json": return err({
					kind: "output",
					reason: "TShark emitted malformed JSON.",
					cause: read.error.cause
				});
				case "malformed-packet": return err({
					kind: "output",
					reason: `TShark ${read.error.reason}.`
				});
				case "cancelled": throw new Error("Packet output read observed no signal.");
			}
			const parsed = packetsSchema.safeParse(read.value);
			if (!parsed.success) return err({
				kind: "output",
				reason: "TShark packet fields do not match the selected-field shape.",
				cause: parsed.error
			});
			let previous = 0n;
			for (const packet of parsed.data) {
				const frame = BigInt(packet["frame.number"][0]);
				if (frame <= previous) return err({
					kind: "output",
					reason: "TShark returned unordered frames."
				});
				if (packetLimit !== null && frame > BigInt(packetLimit)) return err({
					kind: "output",
					reason: "TShark returned a frame beyond the selected input packet limit."
				});
				previous = frame;
			}
			return ok(parsed.data);
		};
	})))();
}

//#endregion
//#region dist/captures/TsharkCaptureProvider.js
var OPERATION, tsharkHostSupported, TsharkCaptureProvider;
function init_TsharkCaptureProvider() {
	return (init_TsharkCaptureProvider = __esmMin((() => {
		init_HostPlatform();
		init_capturedProviderOutput();
		init_resources();
		init_classifyProviderFailure();
		init_classifyProviderOutcome();
		init_producerResourceLimits();
		init_TsharkProviderIdentity();
		init_packetFields();
		init_parseFailureAnalysisError();
		init_parseFieldDiscovery();
		init_LinuxResourceLimits();
		init_parsePacketOutput();
		init_capturePacketJsonExpansion();
		init_AnalysisProvider();
		init_ArtifactAnalysisResources();
		init_artifactResourceFailure();
		init_ArtifactCommandPath();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_analysisObservation();
		init_fixedAllowanceRemediation();
		init_providerAdapterError();
		init_packetCapture();
		init_result();
		init_runOwned();
		init_OwnedCommand();
		init_PrivateRuntimeRoot();
		init_PcapConfiguration();
		init_privateWorkspaceFailure();
		init_errorMessage();
		OPERATION = "inspect_packet_capture";
		tsharkHostSupported = (platform) => platform === "linux";
		TsharkCaptureProvider = class {
			environment;
			launcher;
			createRuntime;
			platform;
			readArtifact;
			readLimits;
			#resources;
			constructor(environment = process.env, launcher, createRuntime = () => PrivateRuntimeRoot.create({ prefix: "rea-tshark-" }), platform = HOST_PLATFORM.platform, readArtifact = readStableArtifact, readLimits = readLinuxResourceLimits) {
				this.environment = environment;
				this.launcher = launcher;
				this.createRuntime = createRuntime;
				this.platform = platform;
				this.readArtifact = readArtifact;
				this.readLimits = readLimits;
				this.#resources = createArtifactAnalysisResources(TSHARK_PROVIDER_IDENTITY.id, OPERATION, readArtifact, readLimits, {
					message: "A packet inspection is already active; retry after it completes.",
					details: { max_concurrent_inspections: 1 }
				});
			}
			inspect(input, options) {
				return this.#resources.run(() => this.#executeRequest(input, options), options?.signal);
			}
			inspectFields(input, options) {
				return this.#resources.run(() => this.#executeRequest(input, options), options?.signal, "inspect_packet_fields");
			}
			close() {
				return this.#resources.close();
			}
			async #executeRequest(input, options) {
				const operation = "path" in input ? OPERATION : "inspect_packet_fields";
				const limits = resolveProducerLimits("path" in input ? BOUNDED_PRODUCER_LIMITS : {
					...BOUNDED_PRODUCER_LIMITS,
					output_bytes: 32 * 1024 * 1024
				}, input.producer_limits);
				let phase = "configuration";
				let capturedOutput;
				let resourcePath = "path" in input ? input.path : "TShark field glossary";
				let effectiveLimits;
				let root;
				let result;
				try {
					if (options?.signal?.aborted) throw cancelledBy(operation, options.signal);
					await this.#resources.release();
					if (!tsharkHostSupported(this.platform)) throw new Error("Packet inspection requires Linux with util-linux prlimit and TShark 4.x (on PATH or through absolute REA_TSHARK_COMMAND) so expanded captures are processed under an enforced address-space limit.");
					const selection = selectWiresharkTool(this.environment, "tshark");
					const configured = locateWiresharkTool(selection, this.environment);
					if (configured === undefined) throw new Error(`TShark 4.x was not found on PATH; add it to PATH or set absolute ${TSHARK_COMMAND_ENV}.`);
					const selectedCommand = await selectArtifactCommandPath(configured, options?.signal);
					const command = selectedCommand.resolvedPath;
					await access(command, constants.X_OK);
					const toolSnapshot = await this.#resources.read(command, 64 * 1024 * 1024, options?.signal);
					const tool = wiresharkExecutableIdentity(toolSnapshot);
					const configuredLimiter = this.environment.REA_TSHARK_PRLIMIT_COMMAND ?? "/usr/bin/prlimit";
					if (!isAbsolute(configuredLimiter)) throw new Error("REA_TSHARK_PRLIMIT_COMMAND must be absolute.");
					const selectedLimiter = await selectArtifactCommandPath(configuredLimiter, options?.signal);
					const limiter = selectedLimiter.resolvedPath;
					await access(limiter, constants.X_OK);
					const limiterIdentity = await this.#resources.read(limiter, 64 * 1024 * 1024, options?.signal);
					effectiveLimits = await this.#resources.readLimits(limits);
					const limitArguments = prlimitArgumentVector(effectiveLimits, selectedCommand.invocationPath);
					phase = "workspace";
					root = await this.createRuntime();
					this.#resources.retain(root, undefined);
					const snapshotPath = join(root.path, "capture");
					const configurationPath = join(root.path, "configuration");
					await mkdir(configurationPath, { mode: 448 });
					const execute = async (args) => {
						capturedOutput = undefined;
						await assertArtifactCommandPath(selectedCommand, operation, { signal: options?.signal });
						await assertArtifactCommandPath(selectedLimiter, operation, { signal: options?.signal });
						const output = await runOwnedCommand({
							command: selectedLimiter.invocationPath,
							arguments: [...limitArguments, ...args],
							...root === undefined ? {} : { cwd: root.path },
							expectedCommand: null,
							runId: `rea-tshark-${randomUUID()}`,
							hostEnvironment: {
								...this.environment,
								WIRESHARK_CONFIG_DIR: configurationPath
							}
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
						assertWiresharkExecutableIdentity(operation, command, tool, wiresharkExecutableIdentity(current), { capturedOutput });
						resourcePath = "path" in input ? input.path : command;
						if (output.exitCode !== 0) throw new ProviderAdapterError(TSHARK_PROVIDER_IDENTITY.id, operation, { diagnostics: {
							exit_code: capturedOutput.exit_code ?? null,
							stdout: capturedOutput.stdout,
							stderr: capturedOutput.stderr
						} });
						const invalidUtf8Streams = [...output.stdout.invalidUtf8 ? ["stdout"] : [], ...output.stderr.invalidUtf8 ? ["stderr"] : []];
						if (invalidUtf8Streams.length > 0) throw new AnalysisOutputError(operation, "TShark output is not valid UTF-8; retained text contains replacement characters.", {
							capturedOutput,
							diagnostics: {
								stage: phase,
								invalid_utf8_streams: invalidUtf8Streams
							}
						});
						return output;
					};
					phase = "configuration";
					const version = await execute(["--version"]);
					if (parseWiresharkVersion(version.stdout.text, "tshark") === null) throw new Error("Expected TShark 4.x; inspect the selected installation.");
					const metadata = (args, diagnostics) => ({
						diagnostics,
						tool: {
							configured_path: configured,
							selection_source: selection.source,
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
						const args = ["-G", "fields"];
						const output = await execute(args);
						const report = packetFieldsCatalogSchema.parse({
							selection: input,
							...parseFieldDiscovery(output.stdout.text, input),
							...metadata(args, output.stderr.text),
							limits: {
								...limits,
								...effectiveLimits,
								record_budget_bytes: FIELD_RECORD_BUDGET
							},
							configuration: "private-empty-personal-profile"
						});
						result = ok(createAnalysisExecution(report, TSHARK_PROVIDER_IDENTITY, {
							subject: {
								path: command,
								sha256: tool.sha256,
								format: "file"
							},
							limitations: [
								"Protocol and field registrations describe the selected installation, not traffic observed in a capture. Duplicate abbreviations remain distinct producer records with source line numbers.",
								"Each request probes again without caching. The private empty personal profile does not fingerprint or isolate installed libraries, global configuration or plugins; they remain trusted.",
								"No capture file, interface or device is opened. Resource ceilings do not constitute an OS sandbox. Selected producer output budget is reported in limits.output_bytes and can be changed with producer_limits.output_bytes. Selected record representation remains independently capped at 8 MiB before expansion."
							]
						}));
					} else {
						const expansion = resolveCapturePacketJsonExpansion(this.environment);
						if (!expansion.ok) throw expansion.error;
						const selected = await this.#resources.readSelectedArtifact({
							path: input.path,
							maximumBytes: limits.input_bytes,
							allowanceName: "the packet-capture input allowance",
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
							"-n",
							"-r",
							"capture",
							"-T",
							"json",
							"--no-duplicate-keys",
							"--temp-dir=.",
							...input.two_pass ? ["-2"] : [],
							...input.packet_limit === null ? [] : ["-c", String(input.packet_limit)],
							...input.display_filter === null ? [] : ["-Y", input.display_filter],
							...input.decode_as.flatMap((value) => ["-d", value]),
							...[...new Set(["frame.number", ...input.fields])].flatMap((field) => ["-e", field])
						];
						const output = await execute(args);
						phase = "integrity";
						resourcePath = snapshotPath;
						if ((await this.#resources.read(snapshotPath, limits.input_bytes)).sha256 !== selected.sha256) throw new AnalysisArtifactChangedError(operation, snapshotPath, "TShark changed the private capture copy.", capturedOutput === undefined ? {} : { capturedOutput });
						phase = "producer";
						resourcePath = "path" in input ? input.path : command;
						const parsedPackets = await parsePacketOutput(output.stdout.text, input.packet_limit, {
							outputBytes: limits.output_bytes,
							expansionBytes: expansion.value.maximumBytes
						});
						if (!parsedPackets.ok) {
							const failure = parsedPackets.error;
							if (failure.kind === "expansion") throw capturePacketJsonExpansionError(operation, expansion.value, capturedOutput);
							throw new AnalysisOutputError(operation, failure.reason, {
								...failure.cause === undefined ? {} : { cause: failure.cause },
								...capturedOutput === undefined ? {} : { capturedOutput }
							});
						}
						const matchingPackets = parsedPackets.value;
						const start = Math.min(input.match_offset, matchingPackets.length);
						const end = input.match_limit === null ? matchingPackets.length : start + Math.min(input.match_limit, matchingPackets.length - start);
						const packets = matchingPackets.slice(start, end);
						const report = packetCaptureSchema.parse({
							artifact: {
								path: input.path,
								sha256: selected.sha256,
								bytes: selected.bytes.length
							},
							selection: input,
							packets,
							output_window: {
								matching_packets: matchingPackets.length,
								returned_packets: packets.length,
								has_more: end < matchingPackets.length
							},
							read_scope: input.packet_limit === null ? "to-eof" : "up-to-input-packet-limit",
							configuration: "private-empty-personal-profile",
							...metadata(args, output.stderr.text)
						});
						result = ok(createAnalysisExecution(report, TSHARK_PROVIDER_IDENTITY, {
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
								"Fields are TShark dissector observations under the selected filter/decode-as/pass settings, not independently verified protocol semantics. Missing fields are absent from the producer output, not known zero or empty values.",
								"Packet limits count input packets before display filtering. Filtered results do not establish whole-capture or device traffic absence. Two-pass reassembly cannot recover bytes missing from the recording or beyond the read limit.",
								"Repeated field values remain ordered string arrays; raw packet bytes are included only when explicitly selected as a supported field. Export index/score metadata are omitted. All stderr, including warnings on exit zero, is retained.",
								"A private empty personal configuration is used. Installed libraries, global configuration and dissector plugins are trusted and not fully fingerprinted. File-only analysis and disabled name resolution do not constitute an OS sandbox.",
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
					providerId: TSHARK_PROVIDER_IDENTITY.id,
					operation,
					recognise: (cause) => isParseLimit(cause, "tshark-field-glossary") ? parseLimitConstraint(operation, "memory", cause, {
						...observedOutput === undefined ? {} : { capturedOutput: observedOutput },
						...fixedAllowanceOptions("The packet-field discovery record allowance", "capture", {
							limit: cause.failure.limit.maximum,
							unit: "bytes"
						})
					}) : undefined,
					command: () => command,
					commandCleanup: (_failure, _primary, outcome) => classifyProviderOutcome(outcome, command),
					readCleanup: (read, primary) => this.#resources.readCleanupFailure(read, primary, observedOutput, operation),
					observedOutput,
					unclassified: (cause) => {
						const reason = errorMessage(cause);
						if (phase === "workspace") return privateWorkspaceFailure(TSHARK_PROVIDER_IDENTITY.id, operation, cause, workspacePath);
						if (phase === "configuration") return new AnalysisCapabilityUnavailableError(TSHARK_PROVIDER_IDENTITY.id, operation, reason, {
							cause,
							...observedOutput === undefined ? {} : { capturedOutput: observedOutput },
							userMessage: `${reason} On Linux, supply TShark 4.x on PATH or through absolute REA_TSHARK_COMMAND, and util-linux prlimit through REA_TSHARK_PRLIMIT_COMMAND (default /usr/bin/prlimit).`
						});
						if (cause instanceof ArtifactReaderFailure && cause.reason === "integrity") return readerIntegrityFailure(operation, path, cause);
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
//#region dist/composition/captures.js
var createPacketCaptureService;
function init_captures() {
	return (init_captures = __esmMin((() => {
		init_PacketCaptureService();
		init_TsharkCaptureProvider();
		init_HostPlatform();
		createPacketCaptureService = (environment = process.env, platform = HOST_PLATFORM.platform) => new PacketCaptureService(new TsharkCaptureProvider(environment, undefined, undefined, platform));
	})))();
}

//#endregion
//#region dist/cli/captureCommands.js
var captureCommands_exports = /* @__PURE__ */ __exportAll({ registerCaptureCommands: () => registerCaptureCommands });
var registerCaptureCommands;
function init_captureCommands() {
	return (init_captureCommands = __esmMin((() => {
		init_captures();
		init_captureToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_producerLimitsOption();
		registerCaptureCommands = (cli, logger, environment, service = createPacketCaptureService(environment)) => {
			const close = () => service.close();
			registerContractCommand(cli, logger, contractNamed(CAPTURE_TOOL_CONTRACTS, "inspect_packet_fields"), {
				description: "Search installed TShark protocol and field definitions",
				jsonText: ["producer_limits"],
				nullFlags: { limit: {
					key: "all",
					description: "Return all remaining matches within resource limits"
				} },
				fields: {
					producer_limits: { description: PRODUCER_LIMITS_HELP },
					limit: { description: "Maximum matching records to return; defaults to 50" }
				}
			}, analyzeWithService(() => ({
				inspect: (input, options) => service.inspectFields(input, options),
				close
			}), "tshark-capture"));
			registerContractCommand(cli, logger, contractNamed(CAPTURE_TOOL_CONTRACTS, "inspect_packet_capture"), {
				description: "Inspect an existing packet capture with caller-supplied TShark",
				positionals: ["path"],
				callerPaths: ["path"],
				jsonText: ["producer_limits"],
				nullFlags: { match_limit: {
					key: "all_matches",
					description: "Return all remaining matching frames instead of a bounded page"
				} },
				crossFieldRules: "argv",
				fields: {
					path: { description: "Local packet capture" },
					producer_limits: { description: PRODUCER_LIMITS_HELP },
					display_filter: { name: "display_filter" },
					decode_as: { name: "decode_as" },
					packet_limit: { name: "packet_limit" },
					two_pass: { name: "two_pass" },
					match_offset: { name: "match_offset" },
					match_limit: {
						name: "match_limit",
						description: "Returned matching frames per page; default 50"
					}
				}
			}, inspectWithService(() => ({
				inspect: (input, options) => service.inspect(input, options),
				close
			}), "tshark-capture"));
		};
	})))();
}

//#endregion
export { captureCommands_exports, init_captureCommands };