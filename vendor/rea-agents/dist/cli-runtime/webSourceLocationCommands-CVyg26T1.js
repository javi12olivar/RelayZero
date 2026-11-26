import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, ArtifactOperationError, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_artifactOperationError, init_errorMessage, init_jsonSerialization, init_runtimeVersion, init_sha256Hex, javaScriptRuntime, jsonParts, primaryAnalysisError, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactResourceScope, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { RuntimeControlUnavailableError, init_runtimeControlUnavailableError, runtimeControlCapabilityError } from "./WindowsNativeLoader-CCqowxwW.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, deliverCliAnalysisEvidence, init_analysisEvidenceDelivery, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { WEB_SOURCE_MAP_LIMITS, init_sourceMapLimits, localSourceMapLimitsSchema, selectedSourceMapLimits, sourceMapLimitRecovery, sourceMapLimitSelection } from "./elfNotes-CjzNcaIN.js";
import { DEFAULT_WEB_SOURCE_MAP_DECODE_TIMEOUT_MS, init_webScriptArtifacts, init_webSourceLocation, selectedWebScriptArtifactsSchema, webArtifactFileSchema, webSourceLocationInputSchema, webSourceLocationResultSchema, webSourceMapDecodeTimeoutRecovery, webSourceMapReportSchema, webSourcePositionSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader, init_ProcessInspectionCancellation, init_ProcessOwnershipObservation, isProcessOwnershipInspectionCancellation, prepareProcessOwnershipInspection } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { AnalysisCleanupRelease, init_analysisCleanupRelease } from "./analysisCleanupRelease-ME3hxZPc.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { cleanupOwnedProcessGroup, init_ProcessOwnership } from "./ProcessOwnership-CezAYpow.js";
import { ProviderStartupDeadline, init_ProviderDeadline } from "./ProviderDeadline-BXAnhNBa.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { init_JavaScriptWorkerMemoryLimit, javaScriptWorkerMemoryLimitBytes } from "./JavaScriptWorkerMemoryLimit-DlffZ_vK.js";
import { WEB_SCRIPT_TOOL_CONTRACTS, init_webScriptToolContracts } from "./webScriptToolContracts-BcU3Uy4d.js";
import { LocalWebScriptArtifacts, WEB_SOURCE_LOCATION_PROVIDER, WebArtifactAcquisition, WebArtifactCleanup, capturedWebManifestIdentity, closeOwnedWebResources, decodeWebArtifact, init_LocalWebScriptArtifacts, init_ValidateSelectedWebScript, init_WebArtifactCleanup, init_WebArtifactReads, init_closeOwnedWebResources, init_webTraceProviders, validateSelectedWebScript, webArtifactReadError } from "./WebArtifactCleanup-BlFUijiq.js";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";

//#region dist/domain/webSourcePosition.js
var resolveWebSourcePosition, column, webSourceOffset;
function init_webSourcePosition() {
	return (init_webSourcePosition = __esmMin((() => {
		resolveWebSourcePosition = (text, position) => {
			if (!Number.isSafeInteger(position.line) || position.line < 1 || !Number.isSafeInteger(position.column) || position.column < 0) return undefined;
			let line = 1;
			let start = 0;
			for (const boundary of text.matchAll(/\r\n?|\n|\u2028|\u2029/gu)) {
				if (line === position.line) return column(start, boundary.index, position);
				line += 1;
				start = boundary.index + boundary[0].length;
			}
			return line === position.line ? column(start, text.length, position) : {
				field: "line",
				maximum: line
			};
		};
		column = (start, end, position) => position.column <= end - start ? { offset: start + position.column } : {
			field: "column",
			maximum: end - start
		};
		webSourceOffset = (text, position) => {
			const resolved = resolveWebSourcePosition(text, position);
			return resolved !== undefined && "offset" in resolved ? resolved.offset : undefined;
		};
	})))();
}

//#endregion
//#region dist/application/WebSourceLocationService.js
var OPERATION$3, artifactsSchema, LIMITATIONS, codecBudget, codecBudgetLimitation, WebSourceLocationService, invalidOutput, invalid, admitGeneratedOffset, admitContext, verifyPairing, verifyReport, matchesSelectedReport;
function init_WebSourceLocationService() {
	return (init_WebSourceLocationService = __esmMin((() => {
		init_sourceMapLimits();
		init_webTraceProviders();
		init_closeOwnedWebResources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_evidence();
		init_result();
		init_webScriptArtifacts();
		init_webSourceLocation();
		init_webSourcePosition();
		init_ValidateSelectedWebScript();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		init_sha256Hex();
		OPERATION$3 = "trace_web_source_location";
		artifactsSchema = selectedWebScriptArtifactsSchema.extend({ sourceMap: z.strictObject({
			file: webArtifactFileSchema,
			url: z.string().min(1),
			text: z.string()
		}) });
		LIMITATIONS = [
			"The source/map pairing and source-map URL context are caller-selected. Deployment authenticity and execution remain unknown.",
			"Capture metadata and its Evidence reference are historical context; this trace independently verifies only the selected manifest, script and map bytes.",
			"Source names and sourceRoot are reported declarations. REA derives resolved URLs using WHATWG URL resolution; the pinned upstream codec decodes mappings. No original source is fetched or executed.",
			"Embedded source hashes identify the UTF-8 encoding of decoded sourcesContent text, not an independently retained original file. Missing or out-of-range original content positions remain explicit.",
			"Lookup returns all segments at the greatest generated position not greater than the selected point, including earlier lines and generated-only segments. A mapped point does not establish an executed range or UI causality.",
			"Regular maps and inline indexed sections are supported. External section URLs are unsupported; unknown extensions are retained in raw map text and are not interpreted."
		];
		codecBudget = (timeoutMs, limits) => `Complete evidence has a ${String(limits.mapBytes)}-byte map, ${String(limits.outputBytes)}-byte reply and a ${String(limits.decodedRecords)}-record shared decoder budget for generated rows, mapping segments, leaf maps, source and name declarations, sourcesContent entries, and indexed sections. Generated rows and mapping segments have separate ${String(limits.decodedRows)} and ${String(limits.decodedSegments)} limits, and indexed maps have a ${String(limits.sectionDepth)}-level section budget. The owned codec has a ${String(timeoutMs)} ms decode_timeout_ms deadline`;
		codecBudgetLimitation = (runtime, timeoutMs, limits) => {
			const budget = codecBudget(timeoutMs, limits);
			if (runtime.id === "node-v8") return `${budget}, ${String(limits.codecHeapMiB)} MiB old-generation heap and one V8 worker; cleanup may extend the deadline. V8 heap limits do not establish aggregate RSS limits.`;
			return runtime.process_memory_limit_bytes === null ? `${budget}; cleanup may extend the deadline. The codec ran on Bun, which does not enforce REA's V8 heap flags, so no codec heap limit is established.` : `${budget}; cleanup may extend the deadline. The codec ran on Bun, which does not enforce REA's V8 heap flags; a Windows Job Object limited its committed memory to ${String(runtime.process_memory_limit_bytes)} bytes, which is not a heap or RSS limit.`;
		};
		WebSourceLocationService = class {
			artifacts;
			decoder;
			constructor(artifacts, decoder) {
				this.artifacts = artifacts;
				this.decoder = decoder;
			}
			close() {
				return closeOwnedWebResources([this.artifacts.close?.bind(this.artifacts), this.decoder.close?.bind(this.decoder)], "Web source-location cleanup failed");
			}
			/** Shared CLI/MCP workflow preserves raw declarations and every equal-position match. */
			async trace(rawInput, options) {
				const parsed = parseAnalysisInput(OPERATION$3, rawInput, webSourceLocationInputSchema, options?.signal);
				if (!parsed.ok) return parsed;
				const input = parsed.value;
				const admitted = admitContext(input);
				if (!admitted.ok) return admitted;
				const loaded = await this.artifacts.load(input, options);
				if (!loaded.ok) return loaded;
				const verified = artifactsSchema.safeParse(loaded.value);
				if (!verified.success) return invalidOutput("Artifact port returned malformed source/map evidence.");
				const data = verified.data;
				const bound = validateSelectedWebScript(input, data, OPERATION$3);
				if (!bound.ok) return bound;
				const map = data.sourceMap;
				const observation = {
					kind: "web-trace-observation",
					analysis: "incomplete",
					manifest: data.manifestFile,
					source: data.sourceFile
				};
				const incomplete = (error) => {
					const retained = webSourceMapReportSchema.safeParse(error.partialObservation);
					error.partialObservation = {
						...observation,
						...retained.success ? { source_map_observation: {
							association: observation.source_map !== undefined && matchesSelectedReport(input, map.file.sha256, retained.data) ? "selected" : "independent",
							report: retained.data
						} } : {}
					};
					primaryAnalysisError(error).partialObservation = error.partialObservation;
					return err(error);
				};
				const pairing = verifyPairing(input, data);
				if (!pairing.ok) return incomplete(pairing.error);
				observation.source_map = map.file;
				const generated = admitGeneratedOffset(input, data.source);
				if (!generated.ok) return incomplete(generated.error);
				const generatedOffset = generated.value;
				if (options?.signal?.aborted) return incomplete(cancelledBy(OPERATION$3, options.signal));
				const traced = await this.decoder.trace({
					text: map.text,
					path: map.file.path,
					url: map.url,
					position: input.generated_position,
					...input.source_map_limits === undefined ? {} : { limits: input.source_map_limits },
					...input.decode_timeout_ms === undefined ? {} : { decodeTimeoutMs: input.decode_timeout_ms }
				}, options);
				if (!traced.ok) return incomplete(traced.error);
				const report = verifyReport(input, map.file.sha256, traced.value);
				if (!report.ok) return incomplete(report.error);
				const decodeTimeoutMs = input.decode_timeout_ms ?? DEFAULT_WEB_SOURCE_MAP_DECODE_TIMEOUT_MS;
				const limitations = [...LIMITATIONS, codecBudgetLimitation(report.value.runtime, decodeTimeoutMs, selectedSourceMapLimits(input.source_map_limits))];
				const normalized = webSourceLocationResultSchema.safeParse({
					...report.value,
					manifest: capturedWebManifestIdentity(data),
					source: {
						...data.sourceFile,
						script_index: input.script_index,
						script: bound.value
					},
					source_map: {
						...map.file,
						url: map.url,
						association: "caller-selected"
					},
					generated_offset: generatedOffset,
					source_authenticity: "unknown",
					execution: "unknown",
					limitations
				});
				if (!normalized.success) return incomplete(new AnalysisOutputError(OPERATION$3, normalized.error.message));
				return completeProviderEvidence(createEvidence({
					path: data.sourceFile.path,
					sha256: data.sourceFile.sha256,
					format: "file"
				}, WEB_SOURCE_LOCATION_PROVIDER, {
					operation: OPERATION$3,
					parameters: input,
					result: normalized.data,
					rawResult: { source_map_text: map.text },
					confidence: "derived",
					authority: "historical-reference",
					limitations,
					locations: [
						data.sourceFile.path,
						data.manifestFile.path,
						map.file.path
					].map((path) => ({
						kind: "artifact-path",
						path
					})),
					evidenceLinks: data.manifest.source_evidence_id === null ? [] : [data.manifest.source_evidence_id]
				}), options?.signal);
			}
		};
		invalidOutput = (message) => err(new AnalysisOutputError(OPERATION$3, message));
		invalid = (path, message) => err(new AnalysisInputError(OPERATION$3, undefined, [{
			path,
			reason: "invalid_format",
			message
		}]));
		admitGeneratedOffset = (input, source) => {
			const resolved = resolveWebSourcePosition(source, input.generated_position);
			if (resolved === undefined) return invalid(["generated_position"], "Selected generated position is outside the retained script text (one-based lines; zero-based UTF-16 columns).");
			if ("offset" in resolved) return ok(resolved.offset);
			const { line, column } = input.generated_position;
			return err(new AnalysisInputError(OPERATION$3, undefined, [{
				path: ["generated_position", resolved.field],
				reason: "out_of_range",
				minimum: resolved.field === "line" ? 1 : 0,
				maximum: resolved.maximum,
				message: resolved.field === "line" ? `No line ${String(line)}; the retained script ends at line ${String(resolved.maximum)} (one-based lines).` : `No column ${String(column)} on line ${String(line)}; it ends at column ${String(resolved.maximum)} (zero-based UTF-16 columns).`
			}]));
		};
		admitContext = (input) => {
			if (!URL.canParse(input.source_map.url)) return invalid(["source_map", "url"], "Expected an absolute source-map URL context. Select its deployment context explicitly; no URL is fetched.");
			return ok(null);
		};
		verifyPairing = (input, data) => {
			const map = data.sourceMap;
			if (map.file.path !== input.source_map.path || map.url !== input.source_map.url || Buffer.byteLength(map.text) !== map.file.bytes || sha256Hex(map.text) !== map.file.sha256 || map.file.bytes > selectedSourceMapLimits(input.source_map_limits).mapBytes) return invalidOutput("Artifact port changed the selected source-map byte identity or URL context.");
			return ok(null);
		};
		verifyReport = (input, sha256, value) => {
			const report = webSourceMapReportSchema.safeParse(value);
			if (!report.success) return invalidOutput("Codec port returned malformed source-map point evidence.");
			if (!matchesSelectedReport(input, sha256, report.data)) return err(new AnalysisOutputError(OPERATION$3, "Codec port changed the selected map, URL context or generated point.", { partialObservation: report.data }));
			return ok(report.data);
		};
		matchesSelectedReport = (input, sha256, report) => report.source_map_sha256 === sha256 && report.url_context === input.source_map.url && report.lookup.requested.line === input.generated_position.line && report.lookup.requested.column === input.generated_position.column;
	})))();
}

//#endregion
//#region dist/browser/assets/WebSourceLocationArtifacts.js
var LocalWebSourceLocationArtifacts;
function init_WebSourceLocationArtifacts() {
	return (init_WebSourceLocationArtifacts = __esmMin((() => {
		init_sourceMapLimits();
		init_resources();
		init_result();
		init_WebArtifactCleanup();
		init_LocalWebScriptArtifacts();
		init_WebArtifactReads();
		LocalWebSourceLocationArtifacts = class {
			scripts;
			#resources;
			#cleanup;
			constructor(scripts, resources = scripts instanceof LocalWebScriptArtifacts ? scripts.resources : new ArtifactResourceScope()) {
				this.#resources = resources;
				this.scripts = scripts ?? new LocalWebScriptArtifacts("trace_web_source_location", resources);
				this.#cleanup = new WebArtifactCleanup("web-source-location-artifacts", resources, this.scripts);
			}
			async close() {
				return this.#cleanup.close();
			}
			/** Preserve actual map identity separately from the selected deployment URL. */
			async load(input, options) {
				const acquisition = new WebArtifactAcquisition();
				try {
					return await this.#resources.run(() => this.#load(input, acquisition, options));
				} catch (cause) {
					return err(acquisition.retain(webArtifactReadError(cause, {
						operation: "trace_web_source_location",
						field: ["source_map", "path"],
						targetPath: input.source_map.path,
						callerSelected: true,
						limitRecovery: sourceMapLimitRecovery("map_bytes", selectedSourceMapLimits(input.source_map_limits).mapBytes)
					}, options?.signal)));
				}
			}
			async #load(input, acquisition, options) {
				const loaded = await this.scripts.load(input, options);
				if (!loaded.ok) return loaded;
				acquisition.record("manifest", loaded.value.manifestFile, "manifest-validated");
				acquisition.record("source", loaded.value.sourceFile, "source-verified");
				const data = await acquisition.read("source-map", input.source_map.path, selectedSourceMapLimits(input.source_map_limits).mapBytes, options?.signal, this.#resources);
				return ok({
					...loaded.value,
					sourceMap: {
						file: {
							path: input.source_map.path,
							sha256: data.sha256,
							bytes: data.bytes.length
						},
						url: input.source_map.url,
						text: decodeWebArtifact(data.bytes)
					}
				});
			}
		};
	})))();
}

//#endregion
//#region dist/javascript/sourceMaps/SourceMapCodecProtocol.js
var sourceMapCodecInputSchema, sourceMapCodecReplySchema;
function init_SourceMapCodecProtocol() {
	return (init_SourceMapCodecProtocol = __esmMin((() => {
		init_webSourceLocation();
		sourceMapCodecInputSchema = z.strictObject({
			text: z.string(),
			url: z.string().min(1),
			position: webSourcePositionSchema
		});
		sourceMapCodecReplySchema = z.discriminatedUnion("state", [z.strictObject({
			state: z.literal("success"),
			report: webSourceMapReportSchema
		}), z.strictObject({
			state: z.literal("failure"),
			reason: z.enum([
				"format",
				"unsupported",
				"limit"
			]),
			message: z.string()
		})]);
	})))();
}

//#endregion
//#region dist/javascript/sourceMaps/SourceMapReply.js
var OPERATION$2, parseSourceMapReply, codecRuntimeFailure, codecFailure;
function init_SourceMapReply() {
	return (init_SourceMapReply = __esmMin((() => {
		init_sourceMapLimits();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_result();
		init_runtimeVersion();
		init_SourceMapCodecProtocol();
		init_errorMessage();
		OPERATION$2 = "trace_web_source_location";
		parseSourceMapReply = (text, path, processMemoryLimitBytes, heapMiB = WEB_SOURCE_MAP_LIMITS.codecHeapMiB) => {
			let value;
			try {
				value = JSON.parse(text);
			} catch (cause) {
				return err(new AnalysisOutputError(OPERATION$2, `Malformed codec JSON reply: ${errorMessage(cause)}`));
			}
			const reply = sourceMapCodecReplySchema.safeParse(value);
			if (!reply.success) return err(new AnalysisOutputError(OPERATION$2, `Malformed codec reply: ${reply.error.message}`));
			if (reply.data.state === "failure") return codecFailure(path, reply.data.reason, reply.data.message);
			const runtimeFailure = codecRuntimeFailure(reply.data.report.runtime, processMemoryLimitBytes, heapMiB);
			return runtimeFailure === undefined ? ok(reply.data.report) : err(new AnalysisOutputError(OPERATION$2, runtimeFailure));
		};
		codecRuntimeFailure = (runtime, processMemoryLimitBytes, heapMiB) => {
			if (runtime.id !== (javaScriptRuntime(process.versions).id === "bun" ? "bun" : "node-v8")) return `Codec reported runtime ${runtime.id}, not the runtime that launched it.`;
			if (runtime.id === "node-v8" && runtime.v8_heap_limit_bytes > (heapMiB + 64) * 1024 * 1024) return "Codec reported a V8 heap limit exceeding its independent process budget.";
			if (runtime.id === "bun" && runtime.process_memory_limit_bytes !== processMemoryLimitBytes) return "Codec reported a process memory limit other than the one its launcher enforced.";
			return undefined;
		};
		codecFailure = (path, reason, detail) => err(reason === "limit" ? new ArtifactOperationError(OPERATION$2, "limit", undefined, `${path}: ${detail}`, { remediationAction: detail }) : reason === "unsupported" ? new AnalysisCapabilityUnavailableError("source-map-decoder", OPERATION$2, "unsupported_source_map_profile", { userMessage: `${path}: ${detail}` }) : new AnalysisInputError(OPERATION$2, undefined, [{
			path: ["source_map", "path"],
			reason: "invalid_format",
			message: `${path}: ${detail}`
		}]));
	})))();
}

//#endregion
//#region dist/javascript/sourceMaps/SourceMapCommand.js
var OPERATION$1, PROVIDER, SourceMapCleanupFailure, runSourceMapCommand, PreparationCleanup, OwnedCodec;
function init_SourceMapCommand() {
	return (init_SourceMapCommand = __esmMin((() => {
		init_sourceMapLimits();
		init_analysisErrorBase();
		init_analysisCleanupRelease();
		init_analysisErrorCleanup();
		init_analysisErrorCancellation();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_providerCleanupError();
		init_result();
		init_webSourceLocation();
		init_SourceMapReply();
		init_PrivateRuntimeRoot();
		init_DarwinProcessRunTokenReader();
		init_ProcessInspectionCancellation();
		init_runtimeControlUnavailableError();
		init_ProviderDeadline();
		init_JavaScriptWorkerMemoryLimit();
		init_ProcessOwnership();
		init_ProviderProcess();
		init_ProcessOwnershipObservation();
		init_capturedProviderOutput();
		init_classifyProviderFailure();
		init_errorMessage();
		OPERATION$1 = "trace_web_source_location";
		PROVIDER = "source-map-decoder";
		SourceMapCleanupFailure = class extends ProviderCleanupError {
			constructor(resources, diagnostics) {
				super(PROVIDER, resources, diagnostics, { operation: OPERATION$1 });
			}
		};
		runSourceMapCommand = async (request, path, options, dependencies, retainedCleanup, decodeTimeoutMs = DEFAULT_WEB_SOURCE_MAP_DECODE_TIMEOUT_MS, limits = WEB_SOURCE_MAP_LIMITS) => {
			try {
				await (dependencies.prepareOwnership ?? prepareProcessOwnershipInspection)(options?.signal);
			} catch (cause) {
				const signal = options?.signal;
				const preparation = cause instanceof DarwinProcessOwnershipInspectionError ? cause : undefined;
				const cancellation = isProcessOwnershipInspectionCancellation(cause) ? cause : preparation?.cancellation;
				const failure = cancellation !== undefined ? cancelledBy(OPERATION$1, carriedReason(cancellation.reason)) : cause instanceof AnalysisError ? cause : new ProviderAdapterError(PROVIDER, OPERATION$1, {
					cause,
					...preparation?.capturedOutput === undefined ? {} : { capturedOutput: preparation.capturedOutput },
					diagnostics: {
						map_path: path,
						error_message: errorMessage(cause),
						phase: "process_ownership_preparation"
					}
				});
				const primary = signal?.aborted ? analysisErrorWithCancellation(failure, cancelledBy(OPERATION$1, signal)) : failure;
				if (preparation?.cleanupFailure === undefined) return err(primary);
				const owner = new PreparationCleanup(preparation, path);
				retainedCleanup.owner = owner;
				return err(analysisErrorWithCleanupFailure(primary, preparation.cleanupFailure, OPERATION$1).bindCleanupDependencies([preparation.cleanupFailure], owner));
			}
			const deadline = new ProviderStartupDeadline(decodeTimeoutMs, options?.signal);
			const command = new OwnedCodec(path, dependencies, deadline, decodeTimeoutMs, limits);
			let result;
			try {
				const started = await command.start(request);
				result = started.ok ? parseSourceMapReply(await command.collect(), path, javaScriptWorkerMemoryLimitBytes(limits.codecHeapMiB), limits.codecHeapMiB) : started;
			} catch (cause) {
				result = err(command.failure(cause));
			} finally {
				command.dispose();
				deadline.dispose();
			}
			const cleanup = await command.close();
			const observation = result.ok ? result.value : undefined;
			const completed = options?.signal?.aborted ? err(analysisErrorWithCancellation(result.ok ? undefined : result.error, cancelledBy(OPERATION$1, options.signal, { partialObservation: observation }))) : result;
			if (cleanup === undefined) return completed;
			if (observation !== undefined) cleanup.retainPartialObservation(observation);
			retainedCleanup.owner = command;
			return completed.ok ? err(cleanup) : err(analysisErrorWithCleanupFailure(completed.error, cleanup, OPERATION$1).bindCleanupDependencies([cleanup], command));
		};
		PreparationCleanup = class {
			preparation;
			path;
			constructor(preparation, path) {
				this.preparation = preparation;
				this.path = path;
			}
			get cleanupResources() {
				return this.preparation.cleanupFailure?.cleanupResources ?? [];
			}
			async close() {
				const cleanup = this.preparation.cleanupFailure;
				if (cleanup === undefined || !cleanup.cleanupIncomplete) return undefined;
				try {
					if (this.preparation.cleanupOwner !== undefined) await this.preparation.cleanupOwner.close();
				} catch (cause) {
					return new SourceMapCleanupFailure(cleanup.cleanupResources, {
						map_path: this.path,
						cleanup_failures: [errorMessage(cause)]
					}).bindCleanupDependencies([cleanup], this);
				}
				return cleanup.cleanupIncomplete ? new SourceMapCleanupFailure(cleanup.cleanupResources, {
					map_path: this.path,
					cleanup_failures: ["Ownership preparation cleanup remains incomplete"]
				}).bindCleanupDependencies([cleanup], this) : undefined;
			}
		};
		OwnedCodec = class {
			path;
			dependencies;
			deadline;
			decodeTimeoutMs;
			limits;
			#runId = `rea-source-map-${randomUUID()}`;
			#runtime;
			#supervisor;
			/** Reported by every close failure until a later close releases the codec. */
			#cleanupRelease;
			#outcome;
			#drainStop;
			#onInterruption;
			constructor(path, dependencies, deadline, decodeTimeoutMs, limits) {
				this.path = path;
				this.dependencies = dependencies;
				this.deadline = deadline;
				this.decodeTimeoutMs = decodeTimeoutMs;
				this.limits = limits;
				this.#onInterruption = () => this.#observeInterruption();
				if (deadline.signal.aborted) this.#observeInterruption();
				else deadline.signal.addEventListener("abort", this.#onInterruption, { once: true });
			}
			/** Stop recording event order after an outcome has been selected. */
			dispose() {
				this.deadline.signal.removeEventListener("abort", this.#onInterruption);
			}
			async start(request) {
				this.check();
				this.#runtime = await (this.dependencies.createRuntime ?? (() => PrivateRuntimeRoot.create({ prefix: "rea-source-map-" })))();
				this.check();
				const requestPath = join(this.#runtime.path, "request.json");
				await writeFile(requestPath, request, {
					flag: "wx",
					mode: 384,
					signal: this.deadline.signal
				});
				this.check();
				const environment = {
					...this.dependencies.environment ?? process.env,
					UV_THREADPOOL_SIZE: "1"
				};
				delete environment.NODE_OPTIONS;
				const launchOptions = {
					command: process.execPath,
					arguments: [
						`--max-old-space-size=${String(this.limits.codecHeapMiB)}`,
						"--max-semi-space-size=8",
						"--v8-pool-size=1",
						"--single-threaded",
						"--stack_size=2048",
						fileURLToPath(new URL("./SourceMapCodecProcess.js", new URL("../javascript/sourceMaps/SourceMapCommand.js", import.meta.url).href)),
						requestPath,
						JSON.stringify(sourceMapLimitSelection(this.limits))
					],
					runId: this.#runId,
					cwd: this.#runtime.path,
					hostEnvironment: environment,
					...javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB) === null ? {} : { memoryLimitBytes: javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB) },
					signal: this.deadline.signal
				};
				let spawned;
				try {
					spawned = await (this.dependencies.launcher ?? spawnOwnedProviderProcess)(launchOptions);
				} catch (cause) {
					this.#observeInterruption();
					if (this.#outcome?.kind === "timeout") return err(this.failure(cause));
					return err(isProcessOwnershipInspectionCancellation(cause) ? cancelledBy(OPERATION$1, carriedReason(cause.reason)) : classifyProviderFailure(cause, this.#failureDialect()));
				}
				this.#supervisor = new ProviderProcessSupervisor({
					...spawned,
					ownsProcessLifetime: true,
					cleanup: spawned.cleanup ?? (() => cleanupOwnedProcessGroup(spawned.ownership))
				}, {
					maxDiagnosticBytes: this.limits.outputBytes + 1024 * 1024,
					onDiagnostic: (event) => {
						if (event.type === "exit" && (event.code !== 0 || event.signal !== null)) this.#recordPhysicalFailure({
							kind: "exit",
							exit: {
								code: event.code,
								signal: event.signal
							}
						});
						if (event.type === "error") {
							this.#recordPhysicalFailure({
								kind: "process-error",
								message: event.message,
								cause: event.cause ?? new Error(event.message)
							});
						}
						if (event.type === "output" && (event.truncated === true || event.totalBytes > (event.stream === "stdout" ? this.limits.outputBytes : 1024 * 1024))) {
							this.#recordPhysicalFailure({
								kind: "output-limit",
								stream: event.stream
							});
						}
					}
				});
				return ok(undefined);
			}
			async collect() {
				const supervisor = this.#supervisor;
				if (supervisor === undefined) throw new Error("Codec process was not acquired");
				while (!await supervisor.waitForOutputClose(50)) {
					const outcome = this.#outcome;
					if (outcome?.kind !== "physical" || outcome.observation.kind !== "exit" || this.deadline.signal.aborted || this.#drainStop !== undefined) this.check();
				}
				this.check();
				const snapshot = supervisor.snapshot();
				if (snapshot.memoryLimitReached === true) throw this.#memoryLimitFailure(snapshot);
				return snapshot.stdout.text;
			}
			check() {
				this.#observeInterruption();
				const outcome = this.#outcome;
				if (outcome?.kind === "physical") throw this.#physicalFailure(outcome.observation);
				if (outcome?.kind === "cancelled") throw cancelledBy(OPERATION$1, carriedReason(outcome.callerReason));
				if (outcome?.kind === "timeout") throw new AnalysisTimeoutError(OPERATION$1, this.decodeTimeoutMs, webSourceMapDecodeTimeoutRecovery(this.decodeTimeoutMs));
			}
			failure(cause) {
				this.#observeInterruption();
				const outcome = this.#outcome;
				if (outcome?.kind === "physical") return this.#physicalFailure(outcome.observation);
				if (outcome?.kind === "cancelled") return cancelledBy(OPERATION$1, carriedReason(outcome.callerReason));
				if (outcome?.kind === "timeout") return new AnalysisTimeoutError(OPERATION$1, this.decodeTimeoutMs, webSourceMapDecodeTimeoutRecovery(this.decodeTimeoutMs));
				return classifyProviderFailure(cause, this.#failureDialect());
			}
			#failureDialect() {
				return {
					providerId: PROVIDER,
					operation: OPERATION$1,
					recognise: (cause) => cause instanceof RuntimeControlUnavailableError ? runtimeControlCapabilityError(PROVIDER, OPERATION$1, cause) : undefined,
					unclassified: (cause, details) => new ProviderAdapterError(PROVIDER, OPERATION$1, {
						...details,
						cause,
						diagnostics: {
							map_path: this.path,
							error_message: errorMessage(cause)
						}
					})
				};
			}
			#observeInterruption() {
				if (this.#outcome !== undefined) return;
				if (!this.deadline.signal.aborted) return;
				const interruption = this.deadline.interruption;
				if (interruption === undefined) return;
				this.#outcome = interruption === "cancelled" ? {
					kind: "cancelled",
					callerReason: this.deadline.signal.reason
				} : { kind: "timeout" };
			}
			#recordPhysicalFailure(observation) {
				this.#observeInterruption();
				if (this.#outcome === undefined) this.#outcome = {
					kind: "physical",
					observation
				};
				else if (observation.kind !== "exit" && this.#drainStop === undefined) this.#drainStop = observation;
			}
			#physicalFailure(observation) {
				const snapshot = this.#supervisor?.snapshot();
				if (observation.kind === "exit") {
					if (snapshot?.memoryLimitReached === true) return this.#memoryLimitFailure(snapshot);
					return this.#exitFailure(observation.exit, snapshot);
				}
				if (observation.kind === "process-error") return this.#processErrorFailure(observation, snapshot);
				return this.#outputLimitFailure(snapshot, observation.stream);
			}
			#exitFailure(exit, snapshot) {
				const outputComplete = this.#supervisor?.observedOutputClose() ?? false;
				const capturedOutput = this.#capturedOutput(snapshot, exit, outputComplete);
				return new ProviderAdapterError(PROVIDER, OPERATION$1, {
					diagnostics: {
						map_path: this.path,
						exit_code: exit.code,
						signal: exit.signal,
						output_complete: outputComplete,
						stderr: snapshot?.stderr.text ?? "",
						...this.#drainStop?.kind === "output-limit" ? { output_limit_reached: true } : {},
						...this.#drainStop?.kind === "process-error" ? { drain_error_message: this.#drainStop.message } : {}
					},
					...capturedOutput === undefined ? {} : { capturedOutput }
				});
			}
			#processErrorFailure(observation, snapshot) {
				const outputComplete = this.#supervisor?.observedOutputClose() ?? false;
				const capturedOutput = this.#capturedOutput(snapshot, undefined, outputComplete);
				return new ProviderAdapterError(PROVIDER, OPERATION$1, {
					cause: observation.cause,
					diagnostics: {
						map_path: this.path,
						error_message: observation.message,
						output_complete: outputComplete
					},
					...capturedOutput === undefined ? {} : { capturedOutput }
				});
			}
			#outputLimitFailure(snapshot, stream) {
				const outputComplete = this.#supervisor?.observedOutputClose() ?? false;
				const capturedOutput = this.#capturedOutput(snapshot, undefined, outputComplete);
				return new AnalysisOutputError(OPERATION$1, stream === "stdout" ? "Codec output exceeds its complete-evidence budget." : "Codec diagnostic output exceeds its 1048576-byte allowance.", {
					remediationAction: stream === "stdout" ? sourceMapLimitRecovery("output_bytes", this.limits.outputBytes) : "The codec stderr diagnostic allowance is fixed at 1048576 bytes; no source_map_limits field raises it. Inspect retained diagnostics before another call.",
					capturedOutput: {
						stdout: capturedOutput?.stdout ?? "",
						stderr: capturedOutput?.stderr ?? "",
						stdout_bytes: capturedOutput?.stdout_bytes ?? 0,
						stderr_bytes: capturedOutput?.stderr_bytes ?? 0,
						truncated: true
					}
				});
			}
			#capturedOutput(snapshot, exit, outputComplete) {
				if (snapshot === undefined) return undefined;
				const captured = capturedProviderOutput(exit === undefined ? snapshot : {
					...snapshot,
					exitCode: exit.code,
					signal: exit.signal
				});
				return {
					...captured,
					truncated: captured.truncated || !outputComplete
				};
			}
			#memoryLimitFailure(snapshot) {
				return new AnalysisResourceConstraintError(OPERATION$1, "memory", `Source-map codec reached its ${javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB) === null ? "" : `${String(javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB))}-byte `}process memory limit for ${this.path}; no partial evidence was returned. ${sourceMapLimitRecovery("codec_heap_mib", this.limits.codecHeapMiB)}`, { codec_process_memory_limit_bytes: javaScriptWorkerMemoryLimitBytes(this.limits.codecHeapMiB) }, {
					capturedOutput: {
						stdout: "",
						stderr: snapshot.stderr.text,
						truncated: snapshot.diagnosticTruncated === true || !(this.#supervisor?.observedOutputClose() ?? false)
					},
					remediationAction: sourceMapLimitRecovery("codec_heap_mib", this.limits.codecHeapMiB)
				});
			}
			/** Current ownership, independent of historical cleanup diagnostics. */
			get cleanupResources() {
				return [...this.#supervisor === undefined ? [] : [this.#runId], ...this.#runtime === undefined ? [] : [this.#runtime.path]];
			}
			async close() {
				const failures = [];
				let processReleased = this.#supervisor === undefined;
				if (this.#supervisor !== undefined) {
					const stopped = await this.#supervisor.stop();
					if (stopped.status === "incomplete") failures.push(stopped.reason);
					else {
						processReleased = true;
						this.#supervisor = undefined;
					}
				}
				if (processReleased && this.#runtime !== undefined) {
					try {
						await this.#runtime.close();
						this.#runtime = undefined;
					} catch (cause) {
						failures.push(errorMessage(cause));
					}
				}
				if (failures.length === 0) {
					this.#cleanupRelease?.confirm();
					this.#cleanupRelease = undefined;
					return undefined;
				}
				const failure = new SourceMapCleanupFailure(this.cleanupResources, {
					map_path: this.path,
					cleanup_failures: failures,
					codec_pid: this.#supervisor?.launch.process.pid ?? null
				}).bindCleanupResourceOwner(this);
				return (this.#cleanupRelease ??= new AnalysisCleanupRelease()).bind(failure);
			}
		};
	})))();
}

//#endregion
//#region dist/javascript/sourceMaps/SourceMapDecoder.js
var OPERATION, SourceMapDecoder;
function init_SourceMapDecoder() {
	return (init_SourceMapDecoder = __esmMin((() => {
		init_sourceMapLimits();
		init_analysisErrorCancellation();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_result();
		init_webSourceLocation();
		init_SourceMapCodecProtocol();
		init_SourceMapCommand();
		init_jsonSerialization();
		OPERATION = "trace_web_source_location";
		SourceMapDecoder = class {
			dependencies;
			#tail = Promise.resolve();
			#closing = false;
			#closePromise;
			#pendingCleanup;
			constructor(dependencies = {}) {
				this.dependencies = dependencies;
			}
			/** Return complete point evidence after process and private-root cleanup. */
			trace(input, options) {
				if (this.#closing) return Promise.resolve(err(new AnalysisCapabilityUnavailableError("source-map-decoder", OPERATION, "Provider is closing")));
				const operation = this.#tail.then(() => this.#closing ? err(new AnalysisCapabilityUnavailableError("source-map-decoder", OPERATION, "Provider is closing")) : this.#trace(input, options));
				this.#tail = operation.then(() => undefined, () => undefined);
				return operation;
			}
			async #trace(input, options) {
				const cleanupFailure = await this.#retryCleanup();
				if (cleanupFailure !== undefined) return err(options?.signal?.aborted ? analysisErrorWithCancellation(cleanupFailure, cancelledBy(OPERATION, options.signal)) : cleanupFailure);
				if (options?.signal?.aborted) return err(cancelledBy(OPERATION, options.signal));
				const request = sourceMapCodecInputSchema.safeParse({
					text: input.text,
					url: input.url,
					position: input.position
				});
				if (!request.success) return err(new AnalysisInputError(OPERATION, { cause: request.error }));
				const selected = localSourceMapLimitsSchema.safeParse(input.limits ?? {});
				if (!selected.success) return err(new AnalysisInputError(OPERATION, { cause: selected.error }));
				const limits = selectedSourceMapLimits(selected.data);
				const capacityFailure = (field, value) => {
					const recovery = sourceMapLimitRecovery(field, value);
					return new ArtifactOperationError(OPERATION, "limit", undefined, `${input.path}: Source-map admission exhausted. ${recovery}`, { remediationAction: recovery });
				};
				if (Buffer.byteLength(input.text) > limits.mapBytes) return err(capacityFailure("map_bytes", limits.mapBytes));
				const encoded = [];
				let encodedBytes = 0;
				for (const part of jsonParts(request.data)) {
					const bytes = Buffer.byteLength(part);
					if (bytes > limits.outputBytes - encodedBytes) return err(capacityFailure("output_bytes", limits.outputBytes));
					encoded.push(part);
					encodedBytes += bytes;
				}
				if (options?.signal?.aborted) return err(cancelledBy(OPERATION, options.signal));
				const serialized = encoded.join("");
				const retainedCleanup = {};
				const response = await runSourceMapCommand(serialized, input.path, options, this.dependencies, retainedCleanup, input.decodeTimeoutMs ?? DEFAULT_WEB_SOURCE_MAP_DECODE_TIMEOUT_MS, limits);
				if (retainedCleanup.owner !== undefined) this.#pendingCleanup = retainedCleanup.owner;
				return response;
			}
			async close() {
				this.#closing = true;
				this.#closePromise ??= this.#tail.then(async () => {
					const failure = await this.#retryCleanup();
					if (failure !== undefined) throw failure;
				}).catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #retryCleanup() {
				const pending = this.#pendingCleanup;
				if (pending === undefined) return undefined;
				const failure = await pending.close();
				if (failure !== undefined) return failure;
				this.#pendingCleanup = undefined;
				return undefined;
			}
		};
	})))();
}

//#endregion
//#region dist/composition/webSourceLocations.js
var createWebSourceLocationService;
function init_webSourceLocations() {
	return (init_webSourceLocations = __esmMin((() => {
		init_WebSourceLocationService();
		init_WebSourceLocationArtifacts();
		init_SourceMapDecoder();
		createWebSourceLocationService = (environment = process.env) => new WebSourceLocationService(new LocalWebSourceLocationArtifacts(), new SourceMapDecoder({ environment }));
	})))();
}

//#endregion
//#region dist/cli/webSourceLocationCommands.js
var webSourceLocationCommands_exports = /* @__PURE__ */ __exportAll({ registerWebSourceLocationCommands: () => registerWebSourceLocationCommands });
var registerWebSourceLocationCommands;
function init_webSourceLocationCommands() {
	return (init_webSourceLocationCommands = __esmMin((() => {
		init_webSourceLocations();
		init_webScriptToolContracts();
		init_analysisEvidenceDelivery();
		init_contractCliDescription();
		init_contractCommand();
		registerWebSourceLocationCommands = (cli, logger, environment) => {
			const service = createWebSourceLocationService(environment);
			registerContractCommand(cli, logger, contractNamed(WEB_SCRIPT_TOOL_CONTRACTS, "trace_web_source_location"), {
				description: "Trace one retained script position through an explicitly selected local source map",
				positionals: [
					"manifest_path",
					"script_index",
					"source_map",
					"generated_position"
				],
				callerPaths: ["manifest_path"],
				evidenceDelivery: true,
				viewDelivery: { invalidJson: "view must be valid JSON" },
				flatten: {
					source_map: {
						path: {
							name: "sourceMapPath",
							callerPath: true,
							description: "Local source-map path, not fetched; a relative path resolves against the current directory"
						},
						url: { name: "sourceMapUrl" }
					},
					generated_position: {
						line: { description: "One-based generated line" },
						column: { description: "Zero-based UTF-16 generated column" }
					},
					source_map_limits: {
						map_bytes: { name: "sourceMapBytes" },
						output_bytes: { name: "sourceMapOutputBytes" },
						decoded_rows: { name: "sourceMapDecodedRows" },
						decoded_segments: { name: "sourceMapDecodedSegments" },
						decoded_records: { name: "sourceMapDecodedRecords" },
						section_depth: { name: "sourceMapSectionDepth" },
						codec_heap_mib: { name: "sourceMapCodecHeapMib" }
					}
				},
				fields: {
					manifest_path: { description: "export_web_scripts manifest path; a relative path resolves against the current directory" },
					script_index: { description: "Zero-based manifest script index" },
					view: { description: "JSON source-location matches/source-text view; requires --detail summary and --evidence_output" }
				}
			}, (input, { signal, operation, delivery }) => {
				if (delivery === undefined) throw new Error(`${operation} delivers Evidence`);
				return deliverCliAnalysisEvidence({
					run: () => service.trace(input, { signal }),
					service,
					providerId: "web-source-location",
					operation,
					signal,
					detail: delivery.detail,
					evidenceOutput: delivery.evidenceOutput,
					...delivery.view === undefined ? {} : { view: delivery.view }
				});
			});
		};
	})))();
}

//#endregion
export { init_webSourceLocationCommands, webSourceLocationCommands_exports };