import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCancelledError, AnalysisError, AnalysisInputError, AnalysisOutputError, ArtifactOperationError, ConfigurationError, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_artifactOperationError, init_configurationErrors, init_errorMessage, init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_safeJson, init_strictUtf8, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, DestinationCaseCollisionFailure, DestinationPathUnrepresentableFailure, NonRegularFileReadError, RegularFileChangedError, RegularFileCleanupFailure, RegularFileOperationCancelled, SafeOutputTree, SafeOutputTreeCreationFailure, bindArtifactFileCleanup, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactPaths, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedRegularFile, init_RegularFile, init_SafeOutputTree, init_SafeOutputTreeAdmission, init_SafeOutputTreeCreationFailure, init_resources, outputDirectoryAdmissionRefusal, regularFileCancellation } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { RegularFileReadFailure, init_RegularFileRead, readRegularFile, retryRegularFileCleanup } from "./RegularFileRead-CRu2Ia6l.js";
import { init_urlComponents, urlDeclaresQueryOrFragment } from "./urlComponents-DJm-wtqY.js";
import { createEvidence, init_evidence, parseEvidence } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { WEB_SCRIPT_EXPORT_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { init_browserObservationSchemas, webPageInspectionSchema } from "./browserObservationSchemas-D0tzRJhs.js";
import { PLAYWRIGHT_RESPONSE_BODY_PROVENANCE_LIMITATION, init_browserNetworkEvidence, init_browserNetworkMediaType, init_browserScenarioCapture, retainedBrowserScenarioCaptureSchema, retainedNetworkMediaType } from "./browserNetworkMediaType-CbMlNDyh.js";
import { exportWebScriptsInputSchema, indexBrowserScenarioTransactions, init_browserScenarioTransactions, init_webScriptExport, webScriptExportManifestSchema, webScriptExportResultSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { WEB_SCRIPT_TOOL_CONTRACTS, init_webScriptToolContracts } from "./webScriptToolContracts-BcU3Uy4d.js";
import { join } from "node:path";
import { z } from "zod";
import { Readable } from "node:stream";

//#region dist/domain/webScriptExportPlan.js
var PORTABLE_SEGMENT, RESERVED_SEGMENT, isolatedWebScriptPath, planWebScriptExport, candidatePath, conflictingPaths;
function init_webScriptExportPlan() {
	return (init_webScriptExportPlan = __esmMin((() => {
		init_urlComponents();
		init_sha256Hex();
		PORTABLE_SEGMENT = /^[A-Za-z0-9_~.!$&'()+,;=@-]+$/u;
		RESERVED_SEGMENT = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/iu;
		isolatedWebScriptPath = (source, index) => `isolated/source-${index + 1}-${sha256Hex(JSON.stringify(source))}.js`;
		planWebScriptExport = (scripts) => {
			const candidates = scripts.map(candidatePath);
			const conflicts = conflictingPaths(candidates);
			return scripts.map((script, index) => {
				if (script.content.state === "unavailable") return {
					script,
					record: {
						source: script.source,
						url: script.url,
						content: script.content
					}
				};
				const candidate = candidates[index];
				const reason = conflicts.has(index) ? "Captured paths collide by content version or file/directory prefix." : candidate?.reason ?? null;
				const path = reason === null ? candidate?.path : undefined;
				return {
					script,
					record: {
						source: script.source,
						url: script.url,
						content: {
							state: "exported",
							relative_path: path ?? isolatedWebScriptPath(script.source, index),
							layout: path === undefined ? "isolated" : "url-path",
							layout_reason: reason,
							sha256: script.content.sha256,
							bytes: script.content.bytes.length,
							media_type: script.content.media_type,
							redacted: script.content.redacted,
							representation: script.content.representation
						}
					}
				};
			});
		};
		candidatePath = (script) => {
			let url;
			try {
				url = new URL(script.url);
			} catch {
				return { reason: "Source has no absolute HTTP URL (for example an inline script)." };
			}
			if (url.protocol !== "http:" && url.protocol !== "https:") return { reason: "Source URL scheme has no local module layout mapping." };
			const parts = url.pathname.slice(1).split("/");
			if (!/\.(?:js|mjs|cjs)$/u.test(url.pathname) || parts.some((part) => !PORTABLE_SEGMENT.test(part) || part === "." || part === ".." || part.endsWith(".") || RESERVED_SEGMENT.test(part))) return { reason: "URL path is not an ordinary portable JavaScript module path." };
			return {
				path: `origins/${sha256Hex(url.origin)}/${parts.join("/")}`,
				reason: urlDeclaresQueryOrFragment(url) || url.username !== "" || url.password !== "" ? "URL query, fragment, or credentials cannot select a canonical local module." : null
			};
		};
		conflictingPaths = (candidates) => {
			const sorted = candidates.flatMap(({ path }, index) => path === undefined ? [] : [{
				key: path.replaceAll("/", "\0"),
				index
			}]);
			sorted.sort((left, right) => left.key < right.key ? -1 : left.key > right.key ? 1 : 0);
			const conflicts = new Set();
			let root;
			for (const candidate of sorted) {
				if (root !== undefined && (candidate.key === root.key || candidate.key.charCodeAt(root.key.length) === 0 && candidate.key.startsWith(root.key))) {
					conflicts.add(root.index);
					conflicts.add(candidate.index);
				} else {
					root = candidate;
				}
			}
			return conflicts;
		};
	})))();
}

//#endregion
//#region dist/domain/webScriptExportError.js
var WebScriptExportError;
function init_webScriptExportError() {
	return (init_webScriptExportError = __esmMin((() => {
		init_artifactOperationError();
		WebScriptExportError = class extends ArtifactOperationError {
			userMessage;
			constructor(reason, target, diagnostic, options = {}) {
				super("export_web_scripts", reason, undefined, undefined, options);
				this.userMessage = `Script export failed for ${target}: ${diagnostic}`;
				this.setCleanupResources([...new Set([...options.cleanup?.resources ?? [], ...options.residualPaths ?? []])]);
				this.markCleanupIncomplete(options.cleanup !== undefined || (options.residualPaths?.length ?? 0) > 0);
			}
		};
	})))();
}

//#endregion
//#region dist/application/PublishWebScripts.js
var LIMITATIONS, OPERATION$1, publishWebScripts, publishPlannedScript, message;
function init_PublishWebScripts() {
	return (init_PublishWebScripts = __esmMin((() => {
		init_resources();
		init_browserNetworkEvidence();
		init_analysisErrorCore();
		init_webScriptExport();
		init_webScriptExportPlan();
		init_webScriptExportError();
		init_sha256Hex();
		LIMITATIONS = [
			"Only script bytes retained in this capture are exported. Sources are not refetched or executed, and a response or Debugger source does not prove execution.",
			"Ordinary unambiguous URL paths preserve relative module layouts by origin, including case-distinct spellings. Query variants, exact path collisions, file/directory prefixes, inline sources, and unrepresentable paths are isolated. A case-distinct pair is isolated only when the destination filesystem cannot store both spellings; the record names that pair. Browser module relationships of isolated paths remain unknown.",
			"Local JavaScript analysis does not implement browser import maps, root-relative URL resolution, remote URL loading, or browser runtime behavior. It may strip import queries and fragments; isolated variants are not canonical targets.",
			"Source-map declarations are retained as metadata. No source maps or missing dependencies are fetched or reconstructed.",
			"Scenario response bytes preserve the output of Playwright's Response.body() API; any source-body provenance caveat from the capture is retained in this manifest. Debugger sources are the exposed text encoded as UTF-8. Redacted bytes are exported exactly as retained, and may no longer parse as JavaScript."
		];
		OPERATION$1 = "export_web_scripts";
		publishWebScripts = async (input, capture, captureSha256, options) => options.resources.run(async () => {
			const assertActive = () => {
				if (options.signal?.aborted) throw cancelledBy(OPERATION$1, options.signal);
			};
			const planned = planWebScriptExport(capture.scripts);
			const scenarioResponseBodyCaptured = capture.kind === "browser-scenario" && capture.scripts.some((script) => script.source.kind === "scenario-response" && script.content.state === "captured" && (script.content.representation === "playwright-response-body-bytes" || script.content.representation === "browser-decoded-response-bytes"));
			const responseBodyProvenanceLimitations = scenarioResponseBodyCaptured && !capture.limitations.includes("Captured response-body bytes are the result of Playwright's Response.body() API. Playwright may satisfy that API with a credentialed follow-up load of the request URL when CDP has no body, so transaction and event links do not verify that retained bytes came from the original network transaction.") ? [PLAYWRIGHT_RESPONSE_BODY_PROVENANCE_LIMITATION] : [];
			let tree;
			let result;
			try {
				tree = await SafeOutputTree.create(input.output_directory);
				assertActive();
				const records = [];
				for (const [index, item] of planned.entries()) {
					assertActive();
					records.push(await publishPlannedScript(tree, item, index, options.signal));
				}
				const manifest = webScriptExportManifestSchema.parse({
					capture_path: input.capture_path,
					capture_sha256: captureSha256,
					capture_kind: capture.kind,
					source_evidence_id: capture.sourceEvidenceId,
					capture_completeness: capture.completeness,
					output_directory: tree.outputRoot,
					analysis_input: records.some(({ content }) => content.state === "exported") ? {
						input_path: join(tree.outputRoot, "files"),
						format: "directory"
					} : null,
					scripts: records,
					limitations: [
						...capture.limitations,
						...responseBodyProvenanceLimitations,
						...LIMITATIONS,
						...records.some(({ content }) => content.state === "exported") ? [] : ["No script bytes were exportable. Include script sources in inspect_web_page or select response_body in capture_browser_scenario, then capture again."]
					]
				});
				const bytes = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
				const digest = sha256Hex(bytes);
				result = webScriptExportResultSchema.parse({
					...manifest,
					manifest: {
						path: join(tree.outputRoot, "manifest.json"),
						sha256: digest,
						bytes: bytes.length
					}
				});
				await tree.write("manifest.json", Readable.from([bytes]), {
					sha256: digest,
					bytes: bytes.byteLength
				}, options.signal);
				assertActive();
				await tree.commit(options.signal);
				return result;
			} catch (cause) {
				const cancellation = cause instanceof AnalysisCancelledError ? cause : cause instanceof ArtifactReaderFailure && cause.cancellation !== undefined ? cancelledBy(OPERATION$1, carriedReason(cause.cancellation.reason)) : undefined;
				if (cause instanceof SafeOutputTreeCreationFailure) tree = cause.tree;
				if (tree !== undefined) {
					const cleanup = await options.resources.release({
						kind: "output-tree",
						resource: tree.outputRoot,
						tree
					});
					if (cleanup.kind === "failed") {
						const cleanupCause = cleanup.cause;
						const diagnostic = tree.published ? `Publication completed, but descriptor cleanup failed (${message(cleanupCause)}). The published output remains available.` : `Publication failed (${message(cause)}); rollback failed (${message(cleanupCause)}). Remove the residual output directory before retrying.`;
						const partialObservation = tree.published && result !== undefined ? {
							kind: "web-script-export",
							result
						} : undefined;
						if (cancellation !== undefined) {
							const cancelled = cancelledBy(OPERATION$1, carriedReason(cancellation.cause), {
								cleanup: {
									reason: diagnostic,
									resources: [tree.outputRoot]
								},
								...partialObservation === undefined ? {} : { partialObservation }
							});
							cleanup.lease.bindCleanupError(cancelled);
							throw cancelled;
						}
						const error = new WebScriptExportError(cause instanceof ArtifactReaderFailure ? cause.reason : "io", tree.outputRoot, diagnostic, {
							cause,
							residualPaths: [tree.outputRoot]
						});
						if (partialObservation !== undefined) error.retainPartialObservation(partialObservation);
						cleanup.lease.bindCleanupError(error);
						throw error;
					}
					if (tree.published && result !== undefined) return result;
				}
				if (cancellation !== undefined) throw cancellation;
				throw outputDirectoryAdmissionRefusal(OPERATION$1, "output_directory", cause);
			}
		});
		publishPlannedScript = async (tree, item, index, signal) => {
			const { script, record } = item;
			const content = script.content;
			if (content.state !== "captured" || record.content.state !== "exported") return record;
			const write = (relativePath) => tree.write(`files/${relativePath}`, Readable.from([content.bytes]), {
				sha256: content.sha256,
				bytes: content.bytes.byteLength
			}, signal);
			try {
				await write(record.content.relative_path);
				return record;
			} catch (cause) {
				if (!(cause instanceof DestinationCaseCollisionFailure || cause instanceof DestinationPathUnrepresentableFailure) || record.content.layout !== "url-path") throw cause;
				const relativePath = isolatedWebScriptPath(script.source, index);
				await write(relativePath);
				return {
					...record,
					content: {
						...record.content,
						relative_path: relativePath,
						layout: "isolated",
						layout_reason: cause.message
					}
				};
			}
		};
		message = (cause) => cause instanceof Error ? cause.message : "Unknown publication failure";
	})))();
}

//#endregion
//#region dist/domain/pageScriptCapture.js
var pageScripts;
function init_pageScriptCapture() {
	return (init_pageScriptCapture = __esmMin((() => {
		pageScripts = (capture) => capture.scripts.items.map((script) => ({
			source: {
				kind: "page-script",
				script_key: script.script_key,
				frame_id: script.frame_id,
				is_module: script.is_module,
				language: script.language,
				source_map_url: script.source_map_url
			},
			url: script.url,
			content: !script.source.included ? {
				state: "unavailable",
				reason: "source-not-included",
				message: script.source.reason || "Debugger source was not included."
			} : script.language !== null && script.language !== "JavaScript" ? {
				state: "unavailable",
				reason: "unsupported-language",
				message: `Debugger reported language ${script.language}; JavaScript export was not inferred.`
			} : {
				state: "captured",
				bytes: Buffer.from(script.source.artifact.text, "utf8"),
				sha256: script.source.artifact.sha256,
				media_type: script.source.artifact.media_type,
				redacted: null,
				representation: "debugger-source-utf8"
			}
		}));
	})))();
}

//#endregion
//#region dist/domain/scenarioScriptCapture.js
var scenarioScripts, projectRequest, unavailable, projectBody;
function init_scenarioScriptCapture() {
	return (init_scenarioScriptCapture = __esmMin((() => {
		init_browserNetworkMediaType();
		init_browserScenarioTransactions();
		scenarioScripts = (capture) => {
			const index = indexBrowserScenarioTransactions(capture.events.items);
			return capture.events.items.flatMap((request) => {
				if (request.kind !== "request" || request.resource_type !== "script") return [];
				return [projectRequest(request, index)];
			});
		};
		projectRequest = (request, index) => {
			const id = request.transaction_id;
			const matches = index.responses.get(id) ?? [];
			const response = matches.length === 1 ? matches[0] : undefined;
			const bodies = response === undefined ? [] : (index.contents.get(response.sequence) ?? []).filter(({ phase }) => phase === "response");
			const content = bodies.length === 1 ? bodies[0] : undefined;
			const ambiguous = index.requestCounts.get(id) !== 1 || matches.length > 1 || bodies.length > 1;
			return {
				source: {
					kind: "scenario-response",
					transaction_id: id,
					request_sequence: request.sequence,
					response_sequence: ambiguous ? null : response?.sequence ?? null,
					status: ambiguous ? null : response?.status ?? null
				},
				url: request.url.url,
				content: projectBody(content, ambiguous)
			};
		};
		unavailable = (reason, message) => ({
			state: "unavailable",
			reason,
			message
		});
		projectBody = (content, ambiguous) => {
			if (ambiguous) return unavailable("ambiguous-transaction", "The capture does not identify one request, response, and content record for this transaction.");
			if (content === undefined) return unavailable("response-content-not-retained", "No selected, completed script response bytes were retained for this request.");
			const { body, headers } = content;
			if (body.state === "unavailable") return unavailable(body.reason, body.message);
			if (body.state !== "captured") return unavailable(body.state, "No selected, completed script response bytes were retained for this request.");
			if (body.representation !== "playwright-response-body-bytes" && body.representation !== "browser-decoded-response-bytes") return unavailable("unsupported-body-representation", `Captured representation ${body.representation} is not script response bytes.`);
			return {
				state: "captured",
				bytes: Buffer.from(body.content, "base64"),
				sha256: body.sha256,
				media_type: retainedNetworkMediaType(body, headers) ?? null,
				redacted: body.redacted,
				representation: body.representation
			};
		};
	})))();
}

//#endregion
//#region dist/domain/webScriptCaptureAdapters.js
var SCRIPT_CAPTURE_ADAPTERS, selectScriptCapture;
function init_webScriptCaptureAdapters() {
	return (init_webScriptCaptureAdapters = __esmMin((() => {
		init_browserObservationSchemas();
		init_browserScenarioCapture();
		init_evidence();
		init_pageScriptCapture();
		init_scenarioScriptCapture();
		SCRIPT_CAPTURE_ADAPTERS = [{
			operation: "inspect_web_page",
			parse: (input) => {
				const parsed = webPageInspectionSchema.safeParse(input);
				return parsed.success ? {
					kind: "page-inspection",
					completeness: parsed.data.completeness,
					scripts: pageScripts(parsed.data),
					limitations: parsed.data.limitations
				} : undefined;
			}
		}, {
			operation: "capture_browser_scenario",
			parse: (input) => {
				const parsed = retainedBrowserScenarioCaptureSchema.safeParse(input);
				return parsed.success ? {
					kind: "browser-scenario",
					completeness: parsed.data.completeness,
					scripts: scenarioScripts(parsed.data),
					limitations: parsed.data.limitations
				} : undefined;
			}
		}];
		selectScriptCapture = (raw, adapters = SCRIPT_CAPTURE_ADAPTERS) => {
			if (typeof raw === "object" && raw !== null && ("normalized_result" in raw || "evidence_id" in raw)) {
				const evidence = parseEvidence(raw);
				const selected = adapters.find(({ operation }) => operation === evidence.operation)?.parse(evidence.normalized_result);
				if (selected !== undefined) return {
					...selected,
					sourceEvidenceId: evidence.evidence_id
				};
			} else {
				for (const adapter of adapters) {
					const selected = adapter.parse(raw);
					if (selected !== undefined) return {
						...selected,
						sourceEvidenceId: null
					};
				}
			}
			throw new TypeError("Expected a valid inspect_web_page or capture_browser_scenario capture, with retained script sources or response bytes. Evidence envelopes must have a matching operation and semantic identifier.");
		};
	})))();
}

//#endregion
//#region dist/application/WebScriptExportService.js
var OPERATION, exportWebScripts, exportWebScriptsValidated, prepareCapture, mapExportFailure, readCapture, captureReadErrorWithCancellation, captureReadFailure, incompleteCaptureCleanup, parseCapture;
function init_WebScriptExportService() {
	return (init_WebScriptExportService = __esmMin((() => {
		init_strictUtf8();
		init_resources();
		init_PublishWebScripts();
		init_webScriptCaptureAdapters();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_analysisErrorCancellation();
		init_configurationErrors();
		init_evidence();
		init_analysisErrorCleanup();
		init_inputIssueProjection();
		init_providerAdapterError();
		init_providerCleanupError();
		init_result();
		init_safeJson();
		init_webScriptExport();
		init_webScriptExportError();
		init_investigationProviders();
		init_RegularFileRead();
		init_RegularFile();
		init_OwnedRegularFile();
		init_errorMessage();
		init_sha256Hex();
		OPERATION = "export_web_scripts";
		exportWebScripts = async (rawInput, resources, options = {}) => {
			const input = exportWebScriptsInputSchema.safeParse(rawInput);
			return input.success ? exportWebScriptsValidated(input.data, resources, options) : err(analysisInputErrorFromIssues(OPERATION, input.error.issues, rawInput));
		};
		exportWebScriptsValidated = async (input, resources, options = {}) => {
			try {
				if (options.signal?.aborted) return err(cancelledBy(OPERATION, options.signal));
				const prepared = await prepareCapture(input.capture_path, resources, options.signal);
				if (!prepared.ok) return prepared;
				const { bytes, loaded } = prepared.value;
				if (options.signal?.aborted) return err(cancelledBy(OPERATION, options.signal));
				const sha256 = sha256Hex(bytes);
				const result = await publishWebScripts(input, loaded, sha256, {
					resources,
					...options.signal === undefined ? {} : { signal: options.signal }
				});
				if (options.signal?.aborted === true) return err(cancelledBy(OPERATION, options.signal, { partialObservation: {
					kind: "web-script-export",
					result
				} }));
				return ok(createEvidence({
					path: input.capture_path,
					sha256,
					format: "file"
				}, WEB_SCRIPT_EXPORT_PROVIDER, {
					predicateType: "rea.web-script-export",
					operation: OPERATION,
					parameters: {
						capture_path: input.capture_path,
						output_directory: input.output_directory
					},
					result,
					rawResult: null,
					confidence: "derived",
					authority: "historical-reference",
					limitations: result.limitations,
					locations: [{
						kind: "artifact-path",
						path: result.manifest.path
					}],
					evidenceLinks: loaded.sourceEvidenceId === null ? [] : [loaded.sourceEvidenceId]
				}));
			} catch (cause) {
				return err(mapExportFailure(cause, input));
			}
		};
		prepareCapture = async (path, resources, signal) => {
			const read = await resources.run(() => readCapture(path, resources, signal));
			if (!read.ok) return read;
			const cleanup = read.value.cleanup;
			const loaded = parseCapture(read.value.bytes, cleanup === undefined || cleanup.incomplete ? undefined : { cause: cleanup.cause });
			if (!loaded.ok) return err(cleanup?.incomplete === true ? incompleteCaptureCleanup(loaded.error, path, cleanup) : loaded.error);
			if (cleanup !== undefined) {
				const primary = new WebScriptExportError("io", path, `Capture handle close failed: ${cleanup.reason}`, { cause: cleanup.cause });
				return err(cleanup.incomplete ? incompleteCaptureCleanup(primary, path, cleanup) : primary);
			}
			return ok({
				bytes: read.value.bytes,
				loaded: loaded.value
			});
		};
		mapExportFailure = (cause, input) => {
			if (cause instanceof AnalysisError) return cause;
			if (cause instanceof ArtifactReaderFailure) {
				const primary = cause.cancellation === undefined ? new WebScriptExportError(cause.reason, input.output_directory, cause.message, {
					cause,
					partialObservation: cause.partialObservation
				}) : cancelledBy(OPERATION, carriedReason(cause.cancellation.reason), { partialObservation: cause.partialObservation });
				if (cause.cleanup === undefined) return primary;
				const error = analysisErrorWithCleanupFailure(primary, new ProviderCleanupError(WEB_SCRIPT_EXPORT_PROVIDER.id, cause.cleanup.resources, { reason: cause.cleanup.reason }, {
					cause,
					operation: OPERATION
				}), OPERATION);
				bindArtifactFileCleanup(cause, error);
				return error;
			}
			if (cause instanceof z.ZodError) return new AnalysisOutputError(OPERATION, cause.message, { cause });
			if (cause instanceof Error && "code" in cause && typeof cause.code === "string") return new WebScriptExportError("io", `${input.capture_path} → ${input.output_directory}`, cause.message, { cause });
			return new ProviderAdapterError(WEB_SCRIPT_EXPORT_PROVIDER.id, OPERATION, {
				cause,
				diagnostics: {
					capture_path: input.capture_path,
					output_directory: input.output_directory,
					error_name: cause instanceof Error ? cause.name : "UnknownError",
					error_message: cause instanceof Error ? cause.message : typeof cause === "string" ? cause : "Unknown script export failure"
				}
			});
		};
		readCapture = async (path, resources, signal) => {
			try {
				return ok({ bytes: await readRegularFile(path, {
					signal,
					cancellationFailure: (reason) => new RegularFileOperationCancelled(reason)
				}) });
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) {
					const retry = await retryRegularFileCleanup(cause, resources, signal);
					const cleanup = {
						reason: retry.cleanup?.reason ?? errorMessage(cause.cleanupCause),
						incomplete: retry.cleanup !== undefined,
						cause: cause.cleanupCause,
						...retry.cleanupLease === undefined ? {} : { lease: retry.cleanupLease }
					};
					if (cause.outcome.kind === "completed") {
						const cancellation = regularFileCancellation(cause) ?? (signal?.aborted === true ? { reason: signal.reason } : undefined);
						if (cancellation !== undefined) {
							const primary = cancelledBy(OPERATION, carriedReason(cancellation.reason));
							return err(retry.cleanup === undefined ? primary : incompleteCaptureCleanup(primary, path, cleanup));
						}
						return ok({
							bytes: cause.outcome.value,
							cleanup
						});
					}
					const primary = captureReadErrorWithCancellation(captureReadFailure(path, cause, retry.cleanup === undefined ? { cause: cause.cleanupCause } : undefined), signal);
					return err(retry.cleanup === undefined ? primary : incompleteCaptureCleanup(primary, path, cleanup));
				}
				return err(captureReadErrorWithCancellation(captureReadFailure(path, cause), signal));
			}
		};
		captureReadErrorWithCancellation = (error, signal) => signal?.aborted === true ? analysisErrorWithCancellation(error, cancelledBy(OPERATION, signal)) : error;
		captureReadFailure = (path, failure, closeFailure) => {
			const cancellation = regularFileCancellation(failure);
			if (cancellation !== undefined) return cancelledBy(OPERATION, carriedReason(cancellation.reason));
			const primary = failure instanceof RegularFileCleanupFailure && failure.outcome.kind === "failed" ? failure.operationFailure ?? failure.outcome.cause : failure;
			const cause = primary instanceof RegularFileReadFailure ? primary.operationCause : primary;
			const causeWithClose = closeFailure === undefined ? cause : new AggregateError([cause, closeFailure.cause], "Capture read and file-handle close both failed", { cause });
			if (cause instanceof ConfigurationError) {
				if (closeFailure === undefined) return cause;
				return new ConfigurationError(cause.message, {
					cause: causeWithClose,
					settings: cause.settings,
					...cause.remediationAction === undefined ? {} : { remediationAction: cause.remediationAction }
				});
			}
			const code = cause instanceof Error && "code" in cause ? String(cause.code) : "";
			if (code === "EACCES" || code === "EPERM") return new AnalysisAccessDeniedError(OPERATION, path, code, { cause: causeWithClose });
			if (cause instanceof NonRegularFileReadError || cause instanceof RegularFileChangedError || code === "ENOENT" || code === "ENOTDIR" || code === "EISDIR" || code === "ENXIO") return new AnalysisInputError(OPERATION, { cause: causeWithClose }, [{
				path: ["capture_path"],
				reason: "invalid_value",
				message: cause instanceof NonRegularFileReadError && code !== "EISDIR" ? cause.message : code === "EISDIR" ? `Selected capture is a directory, not a file: ${path}` : `Selected capture could not be read (${code}): ${path}`
			}]);
			if (code !== "") return new WebScriptExportError("io", path, errorMessage(cause), { cause: causeWithClose });
			return new ProviderAdapterError(WEB_SCRIPT_EXPORT_PROVIDER.id, OPERATION, {
				cause: causeWithClose,
				diagnostics: {
					capture_path: path,
					error_name: cause instanceof Error ? cause.name : "UnknownError",
					error_message: errorMessage(cause)
				}
			});
		};
		incompleteCaptureCleanup = (primary, path, cleanup) => {
			const error = analysisErrorWithCleanupFailure(primary, new ProviderCleanupError(WEB_SCRIPT_EXPORT_PROVIDER.id, [path], { reason: cleanup.reason }, {
				cause: cleanup.cause,
				operation: OPERATION
			}), OPERATION);
			if (cleanup.lease !== undefined) new AnalysisCleanupLeaseGroup(error, [cleanup.lease]);
			return error;
		};
		parseCapture = (bytes, closeFailure) => {
			try {
				const text = decodeStrictUtf8(bytes, "preserve");
				const json = safeParseJson(text);
				if (!json.ok) throw new TypeError(json.error);
				return ok(selectScriptCapture(json.value));
			} catch (cause) {
				const causeWithClose = closeFailure === undefined ? cause : new AggregateError([cause, closeFailure.cause], "Capture parse and file-handle close both failed", { cause });
				return err(new AnalysisInputError(OPERATION, { cause: causeWithClose }, [{
					path: ["capture_path"],
					reason: "invalid_format",
					message: cause instanceof Error ? cause.message : "Capture is not valid UTF-8 JSON evidence."
				}]));
			}
		};
	})))();
}

//#endregion
//#region dist/cli/webScriptCommands.js
var webScriptCommands_exports = /* @__PURE__ */ __exportAll({ registerWebScriptCommands: () => registerWebScriptCommands });
var registerWebScriptCommands;
function init_webScriptCommands() {
	return (init_webScriptCommands = __esmMin((() => {
		init_WebScriptExportService();
		init_resources();
		init_webScriptToolContracts();
		init_investigationProviders();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		registerWebScriptCommands = (cli, logger) => registerContractCommand(cli, logger, contractNamed(WEB_SCRIPT_TOOL_CONTRACTS, "export_web_scripts"), {
			description: "Export retained website scripts into an absent directory for static JavaScript analysis",
			positionals: ["capture_path", "output_directory"],
			callerPaths: ["capture_path", "output_directory"],
			fields: {
				capture_path: { description: "Saved inspect_web_page or capture_browser_scenario JSON, normalized result or complete Evidence; a relative path resolves against the current directory" },
				output_directory: { description: "Absent directory for verified scripts and manifest; its parent must exist. A relative path resolves against the current directory" }
			}
		}, async (input, { operation, signal }) => {
			const resources = new ArtifactResourceScope();
			const result = await finishAnalysisCommand(() => exportWebScripts(input, resources, { signal }), resources, WEB_SCRIPT_EXPORT_PROVIDER.id, operation, signal, "Web script export resources");
			return result.ok ? result.value : {
				error: "Script export failed",
				...result.error
			};
		});
	})))();
}

//#endregion
export { init_webScriptCommands, webScriptCommands_exports };