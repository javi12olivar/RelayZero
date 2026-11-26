import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisError, AnalysisInputError, AnalysisResourceConstraintError, cancelledBy, carriedReason, init_analysisErrorBase, init_analysisErrorCore, init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_safeJson, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactResourceScope, NonRegularFileReadError, RegularFileCleanupFailure, init_ArtifactResourceScope, init_OwnedRegularFile, init_RegularFile, init_resources, regularFileCancellation } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_cliResources, ownCliProcessResource } from "./cliResources-Bw83MG-j.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { JSON_INPUT_RESOURCE_REMEDIATION, JsonInputCancellationFailure, JsonInputPhysicalReadFailure, init_JsonInputFile, init_OwnedJsonInput, init_Utf8JsonInput, nativeJsonParseRequiredBytes, parseUtf8Json, readJsonInputFile, sealOwnedJsonInput } from "./JsonInputFile-DOw6KI2x.js";
import { addAbortListener } from "node:events";
import { getHeapStatistics } from "node:v8";

//#region dist/cli/cliJsonInput.js
var retainedJsonInputs, parseCliJsonInput, DEFAULT_MAX_STDIN_BYTES, readCliJsonStdin, accessDeniedSystemCode, URL_REFERENCE_SOURCE, URL_REFERENCE, cliJsonCallerPathSchema, resolveCliJsonPaths, resolveJsonPath, cannotBeAnExistingFile, hasExplicitJsonFileExtension, inputError, jsonFileCleanupError, jsonFileCleanupPrimary, jsonFileReadFailure, jsonFileReadError, readFailureIssue;
function init_cliJsonInput() {
	return (init_cliJsonInput = __esmMin((() => {
		init_SignalAbort();
		init_callerPath();
		init_localPath();
		init_OwnedJsonInput();
		init_JsonInputFile();
		init_RegularFile();
		init_OwnedRegularFile();
		init_cliResources();
		init_providerCleanupError();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_resources();
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_result();
		init_safeJson();
		init_Utf8JsonInput();
		retainedJsonInputs = new Set();
		ownCliProcessResource("json-input", async () => {
			const failures = [];
			for (const resources of retainedJsonInputs) try {
				await resources.close();
				retainedJsonInputs.delete(resources);
			} catch (cause) {
				failures.push(cause);
			}
			if (failures.length === 1) throw failures[0];
			if (failures.length > 1) throw new AggregateError(failures, "JSON input cleanup failed");
		});
		parseCliJsonInput = async (value, operation, signal, options) => {
			const cancelled = (cause) => ({
				ok: false,
				error: {
					error: "Application workflow failed",
					...projectAnalysisError(cancelledBy(operation, carriedReason(cause)))
				}
			});
			if (signal?.aborted) return cancelled(signal.reason);
			const resources = new ArtifactResourceScope();
			try {
				const inline = safeParseJson(value);
				if (inline.ok) {
					if (!options?.snapshot) return {
						ok: true,
						value: inline.value
					};
					const sealed = await sealOwnedJsonInput(inline.value, operation, signal);
					return sealed.ok ? {
						ok: true,
						value: sealed.value
					} : {
						ok: false,
						error: {
							error: "Application workflow failed",
							...projectAnalysisError(sealed.error)
						}
					};
				}
				const parsed = value === "-" ? await readCliJsonStdin(operation, signal, options) : await readJsonInputFile(value, operation, signal, resources, options?.snapshot ?? false);
				if (parsed.ok && signal?.aborted) return cancelled(signal.reason);
				return parsed.ok ? {
					ok: true,
					value: parsed.value
				} : {
					ok: false,
					error: {
						error: "Application workflow failed",
						...projectAnalysisError(parsed.error),
						input_path: value,
						input_reason: parsed.error._tag === "AnalysisInputError" ? "invalid-json" : "too-large"
					}
				};
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) {
					retainedJsonInputs.add(resources);
					return jsonFileCleanupError(value, operation, cause);
				}
				if (cause instanceof JsonInputCancellationFailure) return cancelled(cause.reason);
				if (cause instanceof JsonInputPhysicalReadFailure) return jsonFileReadError(value, operation, cause.physicalCause);
				if (isAbortOf(cause, signal)) return cancelled(signal.reason);
				if (accessDeniedSystemCode(cause) !== undefined) return jsonFileReadError(value, operation, cause);
				if (["{", "["].includes(value.trimStart()[0] ?? "") && cannotBeAnExistingFile(cause) && !hasExplicitJsonFileExtension(value)) return {
					ok: false,
					error: inputError(operation)
				};
				if (!(cause instanceof Error) || !("code" in cause) || typeof cause.code !== "string") throw cause;
				return jsonFileReadError(value, operation, cause);
			}
		};
		DEFAULT_MAX_STDIN_BYTES = 8 * 1024 * 1024;
		readCliJsonStdin = async (operation, signal, options) => {
			const stream = options?.stdin ?? process.stdin;
			const maxBytes = DEFAULT_MAX_STDIN_BYTES;
			const chunks = [];
			let totalBytes = 0;
			const requireHeadroom = () => {
				const heap = getHeapStatistics();
				const requiredBytes = nativeJsonParseRequiredBytes(totalBytes, options?.snapshot);
				if (requiredBytes > heap.total_available_size) throw new AnalysisResourceConstraintError(operation, "memory", "Insufficient heap headroom to read and parse the complete JSON stdin document", {
					input_path: "-",
					input_bytes: totalBytes,
					required_heap_bytes: requiredBytes,
					available_heap_bytes: heap.total_available_size,
					heap_size_limit_bytes: heap.heap_size_limit
				}, { remediationAction: JSON_INPUT_RESOURCE_REMEDIATION });
			};
			const abort = signal === undefined ? undefined : addAbortListener(signal, () => {
				stream.destroy(new JsonInputCancellationFailure(signal.reason));
			});
			try {
				try {
					for await (const chunk of stream) {
						signal?.throwIfAborted();
						totalBytes += typeof chunk === "string" ? Buffer.byteLength(chunk) : chunk.byteLength;
						if (totalBytes > maxBytes) return err(new AnalysisResourceConstraintError(operation, "memory", "JSON input exceeds the maximum allowed stdin size", {
							input_path: "-",
							input_bytes: totalBytes,
							max_stdin_bytes: maxBytes
						}, { remediationAction: JSON_INPUT_RESOURCE_REMEDIATION }));
						requireHeadroom();
						chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
					}
				} catch (cause) {
					if (cause instanceof JsonInputCancellationFailure || isAbortOf(cause, signal)) throw cause;
					if (cause instanceof AnalysisResourceConstraintError) return err(cause);
					throw new JsonInputPhysicalReadFailure(cause);
				} finally {
					abort?.[Symbol.dispose]();
				}
				signal?.throwIfAborted();
				requireHeadroom();
				const parsed = parseUtf8Json(Buffer.concat(chunks, totalBytes), operation, "-");
				if (!parsed.ok) return err(new AnalysisInputError(operation, {
					cause: parsed.cause,
					...parsed.userMessage === undefined ? {} : { userMessage: parsed.userMessage }
				}, [{
					path: [],
					reason: "invalid_format",
					expected: "JSON",
					...parsed.userMessage === undefined ? {} : { message: parsed.userMessage }
				}]));
				return options?.snapshot ? await sealOwnedJsonInput(parsed.value, operation, signal) : ok(parsed.value);
			} catch (cause) {
				if (cause instanceof AnalysisResourceConstraintError) return err(cause);
				throw cause;
			}
		};
		accessDeniedSystemCode = (cause) => {
			if (!(cause instanceof Error) || !("code" in cause)) return undefined;
			return cause.code === "EACCES" || cause.code === "EPERM" ? cause.code : undefined;
		};
		URL_REFERENCE_SOURCE = "(?:[Ff][Ii][Ll][Ee]:|[A-Za-z][A-Za-z0-9+.-]+://)";
		URL_REFERENCE = new RegExp(`^${URL_REFERENCE_SOURCE}`, "u");
		cliJsonCallerPathSchema = localPathStringSchema.regex(/\S/u, "must be a nonblank local path").regex(new RegExp(`^(?!${URL_REFERENCE_SOURCE})`, "u"), "must be a local path, not a URL");
		resolveCliJsonPaths = (value, paths) => {
			let resolved = value;
			for (const keys of paths) resolved = resolveJsonPath(resolved, keys);
			return resolved;
		};
		resolveJsonPath = (value, keys) => {
			const [head, ...tail] = keys;
			if (typeof value !== "object" || value === null || Array.isArray(value)) return value;
			const entries = Object.entries(value).map(([key, entry]) => {
				if (key !== head) return [key, entry];
				if (tail.length === 0) return [key, typeof entry === "string" && entry.trim().length > 0 && !URL_REFERENCE.test(entry) ? absoluteCallerPath(entry) : entry];
				return [key, resolveJsonPath(entry, tail)];
			});
			return Object.fromEntries(entries);
		};
		cannotBeAnExistingFile = (cause) => typeof cause === "object" && cause !== null && "code" in cause && (cause.code === "ENOENT" || cause.code === "ENAMETOOLONG" || cause.code === "ENOTDIR");
		hasExplicitJsonFileExtension = (value) => value.toLowerCase().endsWith(".json");
		inputError = (operation) => ({
			error: "Application workflow failed",
			...projectAnalysisError(new AnalysisInputError(operation, undefined, [{
				path: [],
				reason: "invalid_format",
				expected: "JSON"
			}]))
		});
		jsonFileCleanupError = (path, operation, failure) => {
			const cleanup = new ProviderCleanupError("json-input-file", [path], { reason: failure.cleanupCause instanceof Error ? failure.cleanupCause.message : "file close failed" }, {
				operation,
				cause: failure
			});
			const primary = jsonFileCleanupPrimary(path, operation, failure);
			return {
				ok: false,
				error: {
					error: "Application workflow failed",
					...projectAnalysisError(primary === undefined ? cleanup : analysisErrorWithCleanupFailure(primary, cleanup, operation), "invocation"),
					input_path: path
				}
			};
		};
		jsonFileCleanupPrimary = (path, operation, failure) => {
			const cancellation = regularFileCancellation(failure);
			const { outcome } = failure;
			if (outcome.kind === "failed") {
				const { cause } = outcome;
				if (cancellation !== undefined) return cancelledBy(operation, carriedReason(cancellation.reason));
				if (cause instanceof AnalysisError) return cause;
				if (cause instanceof JsonInputCancellationFailure) return cancelledBy(operation, carriedReason(cause.reason));
				return jsonFileReadFailure(path, operation, cause instanceof JsonInputPhysicalReadFailure ? cause.physicalCause : cause);
			}
			const decoded = outcome.value;
			if (decoded?.ok === false && decoded.error instanceof AnalysisError) return decoded.error;
			return cancellation === undefined ? undefined : cancelledBy(operation, carriedReason(cancellation.reason));
		};
		jsonFileReadFailure = (path, operation, cause) => {
			const systemCode = accessDeniedSystemCode(cause);
			return systemCode === undefined ? new AnalysisInputError(operation, { cause }, [readFailureIssue(path, cause)]) : new AnalysisAccessDeniedError(operation, path, systemCode, { cause });
		};
		jsonFileReadError = (path, operation, cause) => ({
			ok: false,
			error: {
				error: "Application workflow failed",
				...projectAnalysisError(jsonFileReadFailure(path, operation, cause)),
				input_path: path,
				input_reason: "read-failed"
			}
		});
		readFailureIssue = (path, cause) => {
			const code = typeof cause === "object" && cause !== null && "code" in cause && typeof cause.code === "string" ? ` (${cause.code})` : "";
			return {
				path: [],
				reason: "invalid_value",
				message: cause instanceof NonRegularFileReadError && cause.code === "ENOTFILE" ? `The JSON input must be a regular file${code}: ${path}` : `The JSON input file could not be read${code}: ${path}`
			};
		};
	})))();
}

//#endregion
export { cliJsonCallerPathSchema, init_cliJsonInput, parseCliJsonInput, resolveCliJsonPaths };