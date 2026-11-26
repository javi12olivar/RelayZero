import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, AnalysisInputError, AnalysisResourceConstraintError, bufferedJsonParts, cancelledBy, hostRangeErrorKind, init_analysisErrorCore, init_jsonSerialization, init_parseFailure } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { containsUnpairedSurrogate, containsUnrepresentableMarkdown, delimitedOutputInputError, formatCliOutput, formatDelimitedOutputParts, hasUnpairedSurrogate, init_cliOutput, init_cliOutputFormatter, init_jsonLines, init_jsonOutput, isTerminalOutput, jsonLineParts, jsonLinesErrorRecord, jsonLinesParts, jsonLinesRecords, jsonOutputParts, prepareDelimitedOutput, prepareJsonLines, renderCliDocument, writeJsonOutput, writeOutputParts, writeOutputText } from "./cliOutput-B7h8Duho.js";
import { cliEvidencePublicationReceipt, init_cliEvidencePublication, retainCliPublicationOnError } from "./cliEvidencePublication-B9BG22X_.js";
import { analysisErrorProjectionSchema, init_analysisErrorProjectionSchema } from "./analysisErrorProjectionSchema-BLLVQLxu.js";
import { cliOperationFailureIdentity, cliOperationFailurePayload, init_cliLogging } from "./cliLogging-DAqnc-c2.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactResourceScope, OwnedFileHandle, init_AnalysisCleanupLease, init_ArtifactResourceScope, init_OwnedFileHandle, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { CommandCancellationScope, init_commandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { init_cliResources, ownCliProcessResource } from "./cliResources-Bw83MG-j.js";
import { join } from "node:path";
import { encodeLines } from "@toon-format/toon";
import { constants } from "node:buffer";
import { estimateTokenCount } from "tokenx";
import { open } from "node:fs/promises";

//#region dist/cli/tokenWindow.js
var TOKEN_SPLIT_PATTERN, codePointSafeBoundary, segmentBoundary, sliceTextByTokenWindow;
function init_tokenWindow() {
	return (init_tokenWindow = __esmMin((() => {
		TOKEN_SPLIT_PATTERN = /(\s+|[.,!?;(){}[\]<>:/\\|@#$%^&*+=`~_-]+)/;
		codePointSafeBoundary = (text, offset) => offset > 0 && offset < text.length && text.charCodeAt(offset - 1) >= 55296 && text.charCodeAt(offset - 1) <= 56319 && text.charCodeAt(offset) >= 56320 && text.charCodeAt(offset) <= 57343 ? offset - 1 : offset;
		segmentBoundary = (segment, tokenOffset, tokenCount) => codePointSafeBoundary(segment, Math.floor(tokenOffset / tokenCount * segment.length));
		sliceTextByTokenWindow = (text, offset, limit) => {
			const total = estimateTokenCount(text);
			const end = limit === undefined ? total : offset + limit;
			if (offset === 0 && end >= total) return {
				text,
				total,
				start: 0,
				end: total,
				truncated: false
			};
			const actualEnd = Math.min(end, total);
			if (offset >= actualEnd) return {
				text: "",
				total,
				start: actualEnd,
				end: actualEnd,
				truncated: true
			};
			const parts = [];
			let tokenPosition = 0;
			for (const segment of text.split(TOKEN_SPLIT_PATTERN).filter(Boolean)) {
				if (tokenPosition >= actualEnd && actualEnd < total) break;
				const tokenCount = estimateTokenCount(segment);
				if (tokenCount === 0) {
					if (tokenPosition >= offset && (tokenPosition < actualEnd || actualEnd === total)) parts.push(segment);
					continue;
				}
				const segmentEnd = tokenPosition + tokenCount;
				if (tokenPosition < actualEnd && segmentEnd > offset) {
					const localStart = Math.max(0, offset - tokenPosition);
					const localEnd = Math.min(tokenCount, actualEnd - tokenPosition);
					const charStart = segmentBoundary(segment, localStart, tokenCount);
					const charEnd = segmentBoundary(segment, localEnd, tokenCount);
					parts.push(segment.slice(charStart, charEnd));
				}
				tokenPosition = segmentEnd;
			}
			return {
				text: parts.join(""),
				total,
				start: offset,
				end: actualEnd,
				truncated: true
			};
		};
	})))();
}

//#endregion
//#region dist/cli/outputEnvelope.js
var humanError, formatCliCallToAction, line, tokenWindow, renderFailure;
function init_outputEnvelope() {
	return (init_outputEnvelope = __esmMin((() => {
		init_cliOutput();
		init_jsonLines();
		init_tokenWindow();
		humanError = ({ code, message }) => `${code === "UNKNOWN" || code === "COMMAND_NOT_FOUND" ? "Error" : `Error (${code})`}: ${message}`;
		formatCliCallToAction = ({ description, commands }) => {
			const width = Math.max(...commands.map(({ command }) => command.length));
			return [
				"",
				description,
				...commands.map(({ command, description: comment }) => `  ${command}${comment === undefined ? "" : `  ${"".padEnd(width - command.length)}# ${comment}`}`)
			].join("\n");
		};
		line = (text) => text.endsWith("\n") ? text : `${text}\n`;
		tokenWindow = (text, { tokenLimit, tokenOffset }) => {
			if (tokenLimit === undefined && tokenOffset === undefined) return {
				truncated: false,
				text
			};
			const window = sliceTextByTokenWindow(text, tokenOffset ?? 0, tokenLimit);
			if (!window.truncated) return {
				truncated: false,
				text: window.text
			};
			return {
				truncated: true,
				text: `${window.text}\n[truncated: showing tokens ${window.start}–${window.end} of ${window.total}]`,
				nextOffset: window.end < window.total ? window.end : undefined
			};
		};
		renderFailure = (failure, { command, duration }, cta, presentation) => {
			const { format } = presentation;
			const encode = (value) => renderCliDocument(value, format, process.stdout.isTTY === true).replace(/\n$/u, "");
			const meta = {
				command,
				...cta === undefined ? {} : { cta },
				duration
			};
			const bare = cta === undefined ? failure : {
				...failure,
				cta
			};
			if (format === "jsonl") return renderCliDocument(jsonLinesErrorRecord(presentation.fullOutput ? {
				ok: false,
				error: failure,
				meta
			} : bare), "jsonl", false);
			if (presentation.tokenCount) {
				const document = presentation.fullOutput ? {
					ok: false,
					error: failure,
					meta
				} : bare;
				return line(String(estimateTokenCount(encode(document))));
			}
			if (presentation.human && !presentation.fullOutput && presentation.tokenLimit === undefined && presentation.tokenOffset === undefined) return line(humanError(failure)) + (cta === undefined ? "" : line(formatCliCallToAction(cta)));
			if (presentation.fullOutput) {
				const window = tokenWindow(encode(failure), presentation);
				return line(encode(window.truncated ? {
					ok: false,
					error: window.text,
					meta: {
						...meta,
						...window.nextOffset === undefined ? {} : { nextOffset: window.nextOffset }
					}
				} : {
					ok: false,
					error: failure,
					meta
				}));
			}
			return line(tokenWindow(encode(bare), presentation).text);
		};
	})))();
}

//#endregion
//#region dist/cli/jsonLinesOutput.js
var writeCliJsonLines;
function init_jsonLinesOutput() {
	return (init_jsonLinesOutput = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_jsonLines();
		init_jsonOutput();
		init_cliEvidencePublication();
		writeCliJsonLines = async (options, destination) => {
			const { source, selected, operationFailure } = options;
			let error;
			const meta = {
				command: options.command,
				duration: options.duration,
				...options.cliControls === undefined ? {} : { cli_controls: { ...options.cliControls } }
			};
			const envelope = (data) => options.fullOutput ? {
				ok: true,
				data,
				meta
			} : data;
			let failureRecord = operationFailure === undefined ? undefined : jsonLinesErrorRecord(options.fullOutput ? {
				ok: false,
				error: operationFailure,
				meta
			} : operationFailure);
			const plan = failureRecord === undefined ? prepareJsonLines(envelope(selected), {
				command: options.command,
				source: envelope(source),
				...options.filterOutput === undefined ? {} : { filter: options.filterOutput },
				...options.filterPaths === undefined ? {} : { filterPaths: options.filterPaths },
				fullOutput: options.fullOutput
			}) : undefined;
			if (plan?.ok === false) {
				error = projectAnalysisError(retainCliPublicationOnError(plan.error));
				failureRecord = jsonLinesErrorRecord(options.fullOutput ? {
					ok: false,
					error,
					meta
				} : error);
			}
			if (failureRecord !== undefined) {
				await writeJsonOutput(failureRecord, destination, "jsonl");
			} else if (plan?.ok === true) {
				if (options.tokenCount) {
					let count = 0;
					for (const record of jsonLinesRecords(plan.value)) {
						let characters = 0;
						for (const part of jsonLineParts(record)) characters += part.length;
						if (characters > constants.MAX_STRING_LENGTH) {
							error = projectAnalysisError(retainCliPublicationOnError(new AnalysisResourceConstraintError(options.command, "memory", "A JSON Lines record exceeds the token estimator's runtime string limit.", {
								formatted_characters: characters,
								max_string_characters: constants.MAX_STRING_LENGTH
							}, { remediationAction: "Remove --token-count to stream the records, or select smaller fields with --filter-output." })));
							break;
						}
						count += estimateTokenCount([...jsonLineParts(record)].join(""));
					}
					if (error !== undefined) await writeJsonOutput(jsonLinesErrorRecord(options.fullOutput ? {
						ok: false,
						error,
						meta
					} : error), destination, "jsonl");
					else await writeOutputText(destination, `${count}\n`);
				} else await writeOutputParts(destination, jsonLinesParts(plan.value));
			}
			return error;
		};
	})))();
}

//#endregion
//#region dist/cli/toonOutput.js
function* toonParts(value) {
	for (const line of encodeLines(value)) {
		yield line;
		yield "\n";
	}
}
var retainedStages, ToonOutputCleanupFailure, cancellationStatuses, toonOutputCancellationStatus, writeToonOutput;
function init_toonOutput() {
	return (init_toonOutput = __esmMin((() => {
		init_analysisErrorCore();
		init_PrivateRuntimeRoot();
		init_commandCancellation();
		init_jsonSerialization();
		init_OwnedFileHandle();
		init_providerCleanupError();
		init_resources();
		init_cliResources();
		init_cliOutputFormatter();
		init_jsonOutput();
		retainedStages = new Set();
		ownCliProcessResource("toon-output", async () => {
			const failures = [];
			for (const resources of retainedStages) {
				try {
					await resources.close();
					retainedStages.delete(resources);
				} catch (cause) {
					failures.push(cause);
				}
			}
			if (failures.length === 1) throw failures[0];
			if (failures.length > 1) throw new AggregateError(failures, "TOON staging cleanup failed");
		});
		ToonOutputCleanupFailure = class extends ProviderCleanupError {
			outputFailure;
			constructor(outputFailure, operation, resources, cleanupCause) {
				super("cli-toon-output", resources, { reason: cleanupCause instanceof Error ? cleanupCause.message : "Stage cleanup failed" }, {
					operation,
					cause: new AggregateError([...outputFailure === undefined ? [] : [outputFailure.cause], cleanupCause], "TOON output and cleanup failures")
				});
				this.outputFailure = outputFailure;
			}
		};
		cancellationStatuses = new WeakMap();
		toonOutputCancellationStatus = (cause) => {
			const failure = cause instanceof ToonOutputCleanupFailure ? cause.outputFailure?.cause : cause;
			return failure instanceof AnalysisCancelledError ? cancellationStatuses.get(failure) : undefined;
		};
		writeToonOutput = async (value, destination, beginOutput, operation) => {
			if (typeof value !== "object" || value === null) {
				const text = `${formatCliOutput(value, "toon")}\n`;
				beginOutput();
				await writeOutputText(destination, text);
				return;
			}
			const parts = bufferedJsonParts(toonParts(value));
			try {
				const buffered = [];
				let characters = 0;
				let next = parts.next();
				while (!next.done && characters + next.value.length <= 1024 * 1024) {
					buffered.push(next.value);
					characters += next.value.length;
					next = parts.next();
				}
				if (next.done) {
					beginOutput();
					await writeOutputParts(destination, buffered.length === 0 ? ["\n"] : buffered);
					return;
				}
				const firstStagedPart = next.value;
				const cancellation = new CommandCancellationScope();
				let retained = false;
				const cancelled = () => {
					const status = cancellation.exitStatus;
					if (status === undefined) return undefined;
					const failure = cancelledBy(operation, cancellation.signal);
					cancellationStatuses.set(failure, status);
					return failure;
				};
				const checkCancellation = () => {
					const failure = cancelled();
					if (failure !== undefined) throw failure;
				};
				try {
					const root = await PrivateRuntimeRoot.create({ prefix: "rea-toon-" });
					const directory = root.path;
					const path = join(directory, "output");
					const resources = new ArtifactResourceScope();
					let owner;
					const lease = new AnalysisCleanupLease(async () => {
						await owner?.close();
						owner = undefined;
						await root.close();
						cancellation.close();
					}, { get cleanupResources() {
						return owner === undefined ? [directory] : [path, directory];
					} });
					let failure;
					try {
						checkCancellation();
						owner = new OwnedFileHandle(await open(path, "wx+", 384));
						const file = owner.handle;
						const stage = async (part) => {
							checkCancellation();
							await file.writeFile(part);
							checkCancellation();
						};
						for (const part of buffered) await stage(part);
						await stage(firstStagedPart);
						for (const part of parts) await stage(part);
						checkCancellation();
						beginOutput();
						const chunks = file.createReadStream({
							start: 0,
							autoClose: false,
							encoding: "utf8"
						}).iterator({ destroyOnReturn: false });
						for await (const chunk of chunks) {
							checkCancellation();
							await writeOutputText(destination, chunk);
							checkCancellation();
						}
					} catch (cause) {
						failure = { cause };
					}
					const cleanup = await resources.release({
						kind: "lease",
						resource: directory,
						lease
					});
					const lateCancellation = cancelled();
					if (failure === undefined && lateCancellation !== undefined) failure = { cause: lateCancellation };
					if (cleanup.kind === "failed") {
						retainedStages.add(resources);
						retained = true;
						const error = new ToonOutputCleanupFailure(failure, operation, lease.cleanupResources ?? [directory], cleanup.cause);
						new AnalysisCleanupLeaseGroup(error, [lease]);
						throw error;
					}
					if (failure !== undefined) throw failure.cause;
				} finally {
					cancellation.finish();
					if (!retained) cancellation.close();
				}
			} finally {
				parts.return(undefined);
			}
		};
	})))();
}

//#endregion
//#region dist/cli/cliResultOutput.js
var resultMeta, createCliResultOutput, fullFailureEnvelope, resolveDelimitedRows, delimitedMetadata, applyCliOutputFilter, expandImplicitArrayPath, projectObjectPaths, projectChildPaths, projectArraySlices, normalizeSliceIndex, normalizeJsonArrayValues;
function init_cliResultOutput() {
	return (init_cliResultOutput = __esmMin((() => {
		init_analysisErrorProjectionSchema();
		init_cliLogging();
		init_analysisErrorCore();
		init_parseFailure();
		init_result();
		init_tokenWindow();
		init_analysisErrorProjection();
		init_cliOutputFormatter();
		init_cliEvidencePublication();
		init_outputEnvelope();
		init_jsonLines();
		init_jsonLinesOutput();
		init_toonOutput();
		init_analysisErrorCleanup();
		init_jsonOutput();
		resultMeta = (metadata) => ({
			command: metadata.command,
			duration: metadata.duration,
			...metadata.cta === undefined ? {} : { cta: metadata.cta },
			...metadata.cliControls === undefined ? {} : { cli_controls: { ...metadata.cliControls } }
		});
		createCliResultOutput = (initialOptions, destination) => {
			let options = initialOptions;
			if (!options.validation.ok) return undefined;
			let format = options.format;
			let handled = false;
			let failed = false;
			let interrupted = false;
			let error;
			let completed;
			const recoverFormattingFailure = async (cause) => {
				const formattingCause = cause instanceof ToonOutputCleanupFailure ? cause.outputFailure?.cause : cause;
				if (completed === undefined || handled || !(formattingCause instanceof Error)) return false;
				const stringCapacity = hostRangeErrorKind(formattingCause) === "host-capacity" && formattingCause.message === "Invalid string length";
				const systemCode = "code" in formattingCause ? formattingCause.code : undefined;
				const stagingCapacity = format === "toon" && (systemCode === "ENOSPC" || systemCode === "EDQUOT" || systemCode === "EFBIG") ? systemCode : undefined;
				if (!stringCapacity && stagingCapacity === undefined) return false;
				const { originalFailure } = completed;
				const refusal = retainCliPublicationOnError(new AnalysisResourceConstraintError(completed.metadata.command, stagingCapacity === undefined ? "memory" : "capacity", stagingCapacity === undefined ? `The ${format} result could not fit in a runtime string. The original result was not written.` : "The temporary storage could not stage the TOON result. The original result was not written.", {
					format,
					...stagingCapacity === undefined ? {
						formatted_characters: null,
						max_string_characters: constants.MAX_STRING_LENGTH
					} : { system_code: stagingCapacity },
					...originalFailure === undefined ? {} : { original_failure: originalFailure }
				}, {
					cause: formattingCause,
					retryable: false,
					remediationAction: stagingCapacity === undefined ? "Use --format json to stream the complete result, or narrow it with --filter-output. Token limits are applied after formatting and cannot avoid this constraint." : "Free space in the system temporary directory, use --format json, or narrow the result with --filter-output."
				}), completed.receipt);
				error = projectAnalysisError(cause instanceof ToonOutputCleanupFailure ? analysisErrorWithCleanupDependencies(refusal, cause, completed.metadata.command) : refusal);
				const document = options.fullOutput ? {
					ok: false,
					error,
					meta: {
						command: completed.metadata.command,
						duration: completed.metadata.duration
					}
				} : error;
				const recoveryFormat = format === "csv" || format === "tsv" ? "json" : format;
				const text = formatCliOutput(format === "jsonl" ? jsonLinesErrorRecord(document) : document, recoveryFormat);
				handled = true;
				try {
					await writeOutputText(destination, `${text}\n`);
				} catch (writeFailure) {
					failed = true;
					throw writeFailure;
				}
				return true;
			};
			const write = async (value, metadata) => {
				completed = undefined;
				const cliControls = options.fullOutput ? metadata.collectCliControls?.() : undefined;
				const selectedMetadata = cliControls === undefined ? metadata : {
					...metadata,
					cliControls
				};
				const filterPaths = options.filterPaths?.ok ? options.filterPaths.value : undefined;
				const operationFailure = metadata.failure ? value : format === "jsonl" || options.fullOutput || filterPaths !== undefined ? cliOperationFailurePayload(value) : undefined;
				const ownsDocument = operationFailure !== undefined || filterPaths !== undefined && filterPaths.length > 0 || options.tokenWindow && !options.tokenCount || options.fullOutput && (options.tokenCount || selectedMetadata.cliControls !== undefined);
				const presentedMetadata = ownsDocument && selectedMetadata.cta !== undefined ? {
					...selectedMetadata,
					cta: undefined
				} : selectedMetadata;
				try {
					const written = await writeResult(value, presentedMetadata, operationFailure);
					if (metadata.cta !== undefined && (!written || !ownsDocument) && error === undefined && !options.fullOutput && !options.tokenCount) {
						handled = true;
						await writeOutputText(destination, `${formatCliCallToAction(metadata.cta)}\n`);
						return true;
					}
					return written;
				} catch (cause) {
					if (toonOutputCancellationStatus(cause) !== undefined) {
						interrupted = true;
						handled = true;
						failed = true;
						throw cause;
					}
					if (await recoverFormattingFailure(cause)) return true;
					if (handled) failed = true;
					throw cause;
				}
			};
			return {
				get handled() {
					return handled;
				},
				get failed() {
					return failed;
				},
				get error() {
					return error;
				},
				begin(nextOptions) {
					options = nextOptions;
					format = options.format;
					handled = false;
					failed = false;
					interrupted = false;
					error = undefined;
					completed = undefined;
				},
				finish() {
					return interrupted ? Promise.resolve() : writeOutputText(destination, "");
				},
				write,
				recoverFormattingFailure
			};
			async function writeResult(value, metadata, operationFailure) {
				completed = {
					metadata,
					receipt: cliEvidencePublicationReceipt(),
					originalFailure: cliOperationFailureIdentity(value)
				};
				const filterPaths = options.filterPaths?.ok ? options.filterPaths.value : undefined;
				const failure = options.fullOutput ? operationFailure : undefined;
				const ownsFilteredOutput = operationFailure === undefined && filterPaths !== undefined && filterPaths.length > 0;
				if ((format === "toon" || format === "yaml") && value == null && !options.fullOutput && !options.tokenCount && !options.tokenWindow && !ownsFilteredOutput) return false;
				if (operationFailure === undefined && metadata.renderOutput === false && format !== "jsonl" && !options.fullOutput && !options.tokenCount) return false;
				if (format === "csv" || format === "tsv") {
					const meta = resultMeta(metadata);
					if (operationFailure !== undefined) {
						const parsedFailure = analysisErrorProjectionSchema.safeParse(operationFailure);
						error = parsedFailure.success ? parsedFailure.data : projectAnalysisError(delimitedOutputInputError(["--format"], "CSV/TSV output was not produced because the command did not return a successful row collection.", metadata.command));
						handled = true;
						try {
							await writeJsonOutput(options.fullOutput ? {
								ok: false,
								error: operationFailure,
								meta
							} : operationFailure, destination);
						} catch (cause) {
							failed = true;
							throw cause;
						}
						return true;
					}
					const selection = resolveDelimitedRows(value, filterPaths, metadata.command);
					const prepared = selection.ok ? prepareDelimitedOutput(selection.value.rows, format, {
						fields: options.columns ?? [],
						metadata: delimitedMetadata(selection.value, format, metadata)
					}) : selection;
					if (!prepared.ok) {
						error = projectAnalysisError(retainCliPublicationOnError(prepared.error));
						handled = true;
						try {
							await writeJsonOutput(options.fullOutput ? {
								ok: false,
								error,
								meta
							} : error, destination);
						} catch (writeFailure) {
							failed = true;
							throw writeFailure;
						}
					} else {
						handled = true;
						try {
							await writeOutputParts(destination, formatDelimitedOutputParts(prepared.value));
						} catch (cause) {
							failed = true;
							throw cause;
						}
					}
					return true;
				}
				const selection = operationFailure !== undefined || filterPaths === undefined ? ok(operationFailure ?? value) : applyCliOutputFilter(value, filterPaths);
				if (!selection.ok) {
					error = projectAnalysisError(retainCliPublicationOnError(new AnalysisInputError(metadata.command, {
						userMessage: selection.error,
						remediationAction: "Select array indices with slices, or request array properties in a separate --filter-output invocation."
					}, [{
						path: ["filter-output"],
						reason: "invalid_value",
						message: selection.error
					}])));
					const document = options.fullOutput ? {
						ok: false,
						error,
						meta: {
							command: metadata.command,
							duration: metadata.duration
						}
					} : error;
					handled = true;
					await writeOutputText(destination, `${formatCliOutput(format === "jsonl" ? jsonLinesErrorRecord(document) : document, format)}\n`);
					return true;
				}
				const selected = selection.value;
				const refuseUnrepresentableText = async () => {
					error = projectAnalysisError(retainCliPublicationOnError(new AnalysisInputError(metadata.command, {
						userMessage: format === "md" ? "Markdown cannot preserve NUL or unpaired UTF-16 surrogates in rendered output." : "TOON cannot preserve unpaired UTF-16 surrogates in UTF-8 output.",
						remediationAction: "Use --format json or --format yaml to retain the exact code units.",
						...completed?.originalFailure === undefined ? {} : { diagnostics: { original_failure: completed.originalFailure } }
					}, [{
						path: ["--format"],
						reason: "invalid_value",
						message: "The selected format cannot preserve this value."
					}])));
					const document = options.fullOutput ? {
						ok: false,
						error,
						meta: {
							command: metadata.command,
							duration: metadata.duration
						}
					} : error;
					handled = true;
					try {
						await writeOutputText(destination, `${formatCliOutput(document, format)}\n`);
					} catch (cause) {
						failed = true;
						throw cause;
					}
					return true;
				};
				if ((format === "toon" || format === "md") && !options.tokenCount && (!options.tokenWindow || format === "md" || operationFailure !== undefined) && (format === "md" ? containsUnrepresentableMarkdown(selected) : containsUnpairedSurrogate(selected))) return refuseUnrepresentableText();
				const filtered = (format === "json" || format === "jsonl") && ownsFilteredOutput && Array.isArray(selected) ? normalizeJsonArrayValues(selected) : selected;
				const ownsSuccessfulTokenWindow = operationFailure === undefined && options.tokenWindow && !options.tokenCount && format !== "json" && format !== "jsonl";
				if (format === "jsonl") {
					handled = true;
					try {
						error = await writeCliJsonLines({
							...options,
							source: value,
							selected: filtered,
							filterPaths,
							operationFailure,
							command: metadata.command,
							duration: metadata.duration,
							...metadata.cliControls === undefined ? {} : { cliControls: metadata.cliControls }
						}, destination);
					} catch (cause) {
						failed = true;
						throw cause;
					}
					return true;
				}
				const meta = resultMeta(metadata);
				const errorDocument = options.fullOutput && failure !== undefined ? fullFailureEnvelope(failure, meta, format, options.tokenLimit, options.tokenOffset) : undefined;
				const document = options.fullOutput ? failure !== undefined ? errorDocument : filtered === undefined ? {
					ok: true,
					meta
				} : {
					ok: true,
					data: filtered,
					meta
				} : filtered === undefined || typeof filtered === "function" || typeof filtered === "symbol" ? {} : filtered;
				if (options.tokenCount) {
					const tokenValue = document;
					let characters = 0;
					if (tokenValue !== undefined && tokenValue !== null && typeof tokenValue !== "function" && typeof tokenValue !== "symbol") {
						if (format === "json") {
							for (const part of jsonOutputParts(tokenValue, format, isTerminalOutput(destination))) characters += part.length;
						}
					}
					if (characters <= constants.MAX_STRING_LENGTH) {
						let formatted;
						if (format === "json") {
							formatted = "";
							for (const part of jsonOutputParts(tokenValue, format, isTerminalOutput(destination))) formatted += part;
						} else formatted = formatCliOutput(tokenValue, format);
						const count = estimateTokenCount(formatted);
						handled = true;
						try {
							await writeOutputText(destination, `${count}\n`);
							return true;
						} catch (cause) {
							failed = true;
							throw cause;
						}
					}
					error = projectAnalysisError(retainCliPublicationOnError(new AnalysisResourceConstraintError(metadata.command, "memory", "Token counting requires a formatted string larger than the runtime permits.", {
						formatted_characters: characters,
						max_string_characters: constants.MAX_STRING_LENGTH
					}, { remediationAction: "Remove --token-count to stream the complete JSON result, or narrow it with --filter-output." })));
				}
				if (ownsSuccessfulTokenWindow) {
					const formatted = formatCliOutput(format === "md" && !options.fullOutput ? document : filtered, format);
					const window = sliceTextByTokenWindow(formatted, options.tokenOffset ?? 0, options.tokenLimit);
					if (!window.truncated && !options.fullOutput && formatted === "") return false;
					const sliced = window.truncated ? `${window.text}\n[truncated: showing tokens ${window.start}–${window.end} of ${window.total}]` : formatted;
					const outputDocument = options.fullOutput ? formatCliOutput(window.truncated ? {
						ok: true,
						data: sliced,
						meta: {
							...resultMeta(metadata),
							...window.end < window.total ? { nextOffset: window.end } : {}
						}
					} : {
						ok: true,
						data: filtered,
						meta
					}, format) : sliced;
					if (format === "toon" && hasUnpairedSurrogate(outputDocument)) return refuseUnrepresentableText();
					handled = true;
					try {
						await writeOutputText(destination, outputDocument.endsWith("\n") ? outputDocument : `${outputDocument}\n`);
					} catch (cause) {
						failed = true;
						throw cause;
					}
					return true;
				}
				if (format === "toon") {
					await writeToonOutput(document, destination, () => {
						handled = true;
					}, metadata.command);
					return true;
				}
				const formattedText = format === "json" ? undefined : formatCliOutput(document, format);
				if (format === "md" && formattedText === "" && !options.fullOutput && !ownsFilteredOutput && operationFailure === undefined) return false;
				handled = true;
				try {
					if (formattedText !== undefined) {
						await writeOutputText(destination, `${formattedText}\n`);
					} else {
						await writeJsonOutput(error === undefined ? document : options.fullOutput ? {
							ok: false,
							error,
							meta
						} : error, destination, format);
					}
				} catch (cause) {
					failed = true;
					throw cause;
				}
				return true;
			}
		};
		fullFailureEnvelope = (failure, meta, format, tokenLimit, tokenOffset) => {
			if (tokenLimit === undefined && tokenOffset === undefined) return {
				ok: false,
				error: failure,
				meta
			};
			const formatted = formatCliOutput(failure, format);
			const offset = tokenOffset ?? 0;
			const window = sliceTextByTokenWindow(formatted, offset, tokenLimit);
			if (!window.truncated) return {
				ok: false,
				error: failure,
				meta
			};
			const nextOffset = window.end < window.total ? window.end : undefined;
			return {
				ok: false,
				error: `${window.text}\n[truncated: showing tokens ${window.start}–${window.end} of ${window.total}]`,
				meta: {
					...meta,
					...nextOffset === undefined ? {} : { nextOffset }
				}
			};
		};
		resolveDelimitedRows = (source, paths, operation) => {
			const invalidSelection = () => err(delimitedOutputInputError(["--filter-output"], "--filter-output must select exactly one row-array path using object-field segments only.", operation));
			if (paths === undefined || paths.length !== 1) return invalidSelection();
			const path = [];
			for (const segment of paths[0] ?? []) {
				if (!("key" in segment)) return invalidSelection();
				path.push(segment.key);
			}
			if (path.length === 0) return invalidSelection();
			let current = source;
			const ancestors = [];
			for (const key of path) {
				if (typeof current !== "object" || current === null || Array.isArray(current) || !Object.hasOwn(current, key)) return invalidSelection();
				const owner = current;
				ancestors.push(owner);
				current = owner[key];
			}
			return Array.isArray(current) ? ok({
				rows: current,
				path,
				ancestors
			}) : invalidSelection();
		};
		delimitedMetadata = (selection, format, metadata) => {
			const valueFromOwner = (key) => {
				for (let index = selection.ancestors.length - 1; index >= 0; index -= 1) {
					const owner = selection.ancestors[index];
					if (Object.hasOwn(owner, key)) return {
						found: true,
						value: owner[key]
					};
				}
				return {
					found: false,
					value: undefined
				};
			};
			const projectOwnFields = (keys) => Object.fromEntries(keys.flatMap((key) => {
				const found = valueFromOwner(key);
				return found.found ? [[key, found.value]] : [];
			}));
			const metadataValue = (key) => valueFromOwner(key).value;
			return {
				version: 1,
				format,
				command: metadata.command,
				duration: metadata.duration,
				selected_path: selection.path,
				coverage: metadataValue("coverage") ?? null,
				source_coverage: metadataValue("source_coverage") ?? null,
				source_complete: metadataValue("source_complete") ?? null,
				view: metadataValue("view") ?? null,
				limitations: metadataValue("limitations") ?? null,
				unknowns: metadataValue("unknowns") ?? null,
				provenance: projectOwnFields([
					"parent_evidence_id",
					"parent_operation",
					"parent_digest",
					"inventory_evidence_ids"
				]),
				pagination: projectOwnFields([
					"offset",
					"limit",
					"total",
					"next_offset",
					"truncated",
					"pagination"
				])
			};
		};
		applyCliOutputFilter = (value, paths) => {
			if (paths.length === 0) return ok(value);
			if (Array.isArray(value)) {
				if (paths.some((path) => path[0] !== undefined && "start" in path[0])) return projectArraySlices(value, paths.flatMap((path) => {
					const first = path[0];
					if (first === undefined || "start" in first) return [path];
					return expandImplicitArrayPath(value, path);
				}));
				const selected = [];
				for (const item of value) {
					const projection = applyCliOutputFilter(item, paths);
					if (!projection.ok) return projection;
					selected.push(projection.value);
				}
				return ok(selected);
			}
			if (paths.length === 1 && paths[0]?.length === 1 && paths[0][0] !== undefined && "key" in paths[0][0]) {
				const key = paths[0][0].key;
				if (typeof value !== "object" || value === null || !Object.hasOwn(value, key)) return ok(undefined);
				const selected = value[key];
				return ok(typeof selected !== "object" || selected === null ? selected : { [key]: selected });
			}
			return projectObjectPaths(value, paths);
		};
		expandImplicitArrayPath = (value, path) => {
			if (Array.isArray(value)) return value.flatMap((item, index) => expandImplicitArrayPath(item, path).map((tail) => [{
				start: index,
				end: index + 1
			}, ...tail]));
			const first = path[0];
			return typeof value === "object" && value !== null && first !== undefined && "key" in first && Object.hasOwn(value, first.key) ? [path] : [];
		};
		projectObjectPaths = (value, paths) => {
			if (typeof value !== "object" || value === null) return ok({});
			const byKey = new Map();
			for (const path of paths) {
				const [segment, ...tail] = path;
				if (segment === undefined || !("key" in segment)) continue;
				const siblings = byKey.get(segment.key) ?? [];
				siblings.push(tail);
				byKey.set(segment.key, siblings);
			}
			const result = new Map();
			for (const key of [...byKey.keys()].sort()) {
				const siblings = byKey.get(key);
				if (!Object.hasOwn(value, key)) continue;
				const child = value[key];
				if (child === undefined) continue;
				if (siblings.some((path) => path.length === 0)) {
					result.set(key, child);
					continue;
				}
				const projection = projectChildPaths(child, siblings);
				if (!projection.ok) return projection;
				if (projection.value !== undefined) result.set(key, projection.value);
			}
			return ok(Object.fromEntries(result));
		};
		projectChildPaths = (value, paths) => {
			if (typeof value !== "object" || value === null) return ok(undefined);
			return Array.isArray(value) && paths.some((path) => path[0] !== undefined && "start" in path[0]) ? projectArraySlices(value, paths) : projectObjectPaths(value, paths);
		};
		projectArraySlices = (source, paths) => {
			const selected = new Map();
			const select = (index, tail) => {
				const siblings = selected.get(index) ?? [];
				siblings.push(tail);
				selected.set(index, siblings);
			};
			for (const path of paths) {
				const [segment, ...tail] = path;
				if (segment === undefined) continue;
				if ("key" in segment) {
					if (!Object.hasOwn(source, segment.key)) continue;
					const index = Number(segment.key);
					if (!Number.isInteger(index) || index < 0 || index >= 4294967295 || String(index) !== segment.key) return err(`The --filter-output selection mixes array slices with the non-index property ${JSON.stringify(segment.key)}. These selections cannot share an array result.`);
					select(index, tail);
					continue;
				}
				const start = normalizeSliceIndex(segment.start, source.length);
				const end = normalizeSliceIndex(segment.end, source.length);
				for (let index = start; index < end; index += 1) select(index, tail);
			}
			const result = [];
			for (const index of [...selected.keys()].sort((left, right) => left - right)) {
				const siblings = selected.get(index);
				const item = source[index];
				if (siblings.some((path) => path.length === 0)) {
					result.push(item === undefined ? null : item);
					continue;
				}
				const projection = projectChildPaths(item, siblings);
				if (!projection.ok) return projection;
				result.push(projection.value ?? {});
			}
			return ok(result);
		};
		normalizeSliceIndex = (index, length) => {
			const integer = Number.isNaN(index) ? 0 : Math.trunc(index);
			return integer < 0 ? Math.max(length + integer, 0) : Math.min(integer, length);
		};
		normalizeJsonArrayValues = (source) => {
			let result;
			for (let index = 0; index < source.length; index += 1) {
				const value = source[index];
				const normalized = value === undefined || typeof value === "function" || typeof value === "symbol" ? null : Array.isArray(value) ? normalizeJsonArrayValues(value) : value;
				if (normalized !== value) {
					result ??= source.slice();
					result[index] = normalized;
				}
			}
			return result ?? source;
		};
	})))();
}

//#endregion
export { createCliResultOutput, init_cliResultOutput, init_outputEnvelope, init_tokenWindow, init_toonOutput, renderFailure, sliceTextByTokenWindow, toonOutputCancellationStatus };