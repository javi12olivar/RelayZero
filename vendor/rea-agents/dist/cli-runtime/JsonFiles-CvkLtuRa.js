import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisResourceConstraintError, EvidenceFileError, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_evidenceErrors } from "./jsonSerialization-DAF9DVXC.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { childFailureDiagnostics, init_analysisErrorProjection } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactReaderFailure, NonRegularFileReadError, RegularFileCleanupFailure, fileAccessFailureReason, init_ArtifactReader, init_OwnedRegularFile, init_RegularFile, init_TextFileWrite, init_resources, regularFileCancellation } from "./resources-B3P64jvH.js";
import { bindRegularFileCleanup, init_RegularFileRead, regularFileCleanupLeases } from "./RegularFileRead-CRu2Ia6l.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { JsonInputCancellationFailure, JsonInputPhysicalReadFailure, init_JsonInputFile, readJsonInputFile, readJsonObjectFile } from "./JsonInputFile-DOw6KI2x.js";

//#region dist/application/JsonFiles.js
var jsonReadLeases, jsonFileReadCleanupLeases, rememberJsonReadCleanup, readJsonFile, readJsonFileWithSource, readJsonObjectMembersFile, readJsonFileInput, decodedJsonFileResult, jsonFileReadFailure, jsonFileCleanupError;
function init_JsonFiles() {
	return (init_JsonFiles = __esmMin((() => {
		init_evidenceErrors();
		init_SignalAbort();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_analysisErrorProjection();
		init_result();
		init_JsonInputFile();
		init_RegularFile();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_resources();
		init_callerPath();
		init_errorMessage();
		jsonReadLeases = new WeakMap();
		jsonFileReadCleanupLeases = (error) => jsonReadLeases.get(error);
		rememberJsonReadCleanup = (error, cause) => {
			const leases = regularFileCleanupLeases(cause);
			if (leases !== undefined) jsonReadLeases.set(error, leases);
		};
		readJsonFile = async (path, signal, resources, operation = "read_evidence_file") => {
			const read = await readJsonFileWithSource(path, signal, resources, operation);
			return read.ok ? ok(read.value.data) : read;
		};
		readJsonFileWithSource = (path, signal, resources, operation = "read_evidence_file") => readJsonFileInput(path, async (selected) => {
			const read = await readJsonInputFile(selected, operation, signal, resources);
			return read.ok ? ok({
				data: read.value,
				path: selected
			}) : read;
		}, signal, operation);
		readJsonObjectMembersFile = (path, scans, signal, resources, operation = "read_evidence_file") => readJsonFileInput(path, (selected) => readJsonObjectFile(selected, operation, scans, signal, resources), signal, operation);
		readJsonFileInput = async (path, read, signal, operation = "read_evidence_file") => {
			const requestedPath = absoluteCallerPath(path);
			try {
				return decodedJsonFileResult(await read(requestedPath), requestedPath);
			} catch (cause) {
				if (signal?.aborted === true && cause === signal.reason) return err(cancelledBy(operation, carriedReason(cause)));
				if (cause instanceof RegularFileCleanupFailure) return err(jsonFileCleanupError(cause, requestedPath, operation, signal));
				if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
					const primary = cause.reason === "cancelled" ? cancelledBy(operation, carriedReason(cause.cancellation === undefined ? cause.cause : cause.cancellation.reason), { partialObservation: cause.partialObservation }) : undefined;
					const error = new EvidenceFileError("read", "io", {
						cause,
						path: requestedPath,
						cleanup: cause.cleanup,
						partialObservation: cause.partialObservation,
						cleanupPrimary: primary,
						...primary === undefined ? {} : childFailureDiagnostics({ primary_error: { error: primary } })
					});
					bindRegularFileCleanup(cause, error);
					rememberJsonReadCleanup(error, cause);
					return err(error);
				}
				return err(jsonFileReadFailure(cause, requestedPath, operation, signal));
			}
		};
		decodedJsonFileResult = (decoded, path) => {
			if (decoded.ok) return decoded;
			if (decoded.error instanceof AnalysisResourceConstraintError) return err(decoded.error);
			return err(new EvidenceFileError("read", "invalid-json", {
				cause: decoded.error.cause ?? new SyntaxError(decoded.error.issues[0]?.message ?? decoded.error.message),
				path,
				...decoded.error.userMessage === undefined ? {} : { userMessage: decoded.error.userMessage },
				contentIssues: decoded.error.issues
			}));
		};
		jsonFileReadFailure = (cause, path, operation, signal) => {
			if (cause instanceof AnalysisResourceConstraintError) return cause;
			if (cause instanceof JsonInputCancellationFailure) return cancelledBy(operation, carriedReason(cause.reason));
			if (cause instanceof JsonInputPhysicalReadFailure) return new EvidenceFileError("read", "io", {
				cause: cause.physicalCause,
				path
			});
			if (isAbortOf(cause, signal)) return cancelledBy(operation, signal);
			return new EvidenceFileError("read", cause instanceof NonRegularFileReadError ? "not-file" : fileAccessFailureReason(cause), {
				cause,
				path
			});
		};
		jsonFileCleanupError = (failure, path, operation, signal) => {
			const cleanup = new EvidenceFileError("read", "io", {
				cause: failure,
				path,
				cleanup: {
					reason: errorMessage(failure.cleanupCause),
					resources: [failure.path]
				}
			});
			bindRegularFileCleanup(failure, cleanup);
			rememberJsonReadCleanup(cleanup, failure);
			const cancellation = regularFileCancellation(failure);
			let primary;
			if (failure.outcome.kind === "failed") {
				primary = cancellation === undefined ? jsonFileReadFailure(failure.outcome.cause, path, operation, signal) : cancelledBy(operation, carriedReason(cancellation.reason));
			} else {
				const decoded = decodedJsonFileResult(failure.outcome.value, path);
				if (!decoded.ok) primary = decoded.error;
				else if (cancellation !== undefined) primary = cancelledBy(operation, carriedReason(cancellation.reason));
			}
			if (primary === undefined) return cleanup;
			const combined = new EvidenceFileError("read", "io", {
				path,
				cause: new AggregateError([primary, cleanup], "JSON read and cleanup failures", { cause: primary }),
				cleanupPrimary: primary,
				cleanup: cleanup.cleanup,
				...childFailureDiagnostics({ primary_error: { error: primary } })
			}).bindCleanupDependencies([primary, cleanup]);
			if (!primary.cleanupIncomplete) rememberJsonReadCleanup(combined, failure);
			return combined;
		};
	})))();
}

//#endregion
export { init_JsonFiles, jsonFileReadCleanupLeases, readJsonFile, readJsonFileWithSource, readJsonObjectMembersFile };