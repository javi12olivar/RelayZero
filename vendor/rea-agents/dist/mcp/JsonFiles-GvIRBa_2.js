import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { Sn as init_callerPath, bn as absoluteCallerPath, n as init_analysisErrorProjection, t as childFailureDiagnostics } from "./analysisErrorProjection-B0_t_nHz.js";
import { i as init_analysisErrorBase } from "./analysisErrorBase-C0hMa0_b.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { G as EvidenceFileError, Y as init_evidenceErrors } from "./canonicalDigest-DUQN3Yyz.js";
import { _ as init_analysisErrorCore, h as carriedReason, l as AnalysisResourceConstraintError, m as cancelledBy } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_errorMessage, t as errorMessage } from "./errorMessage-rfGn5D1_.js";
import { n as isAbortOf, t as init_SignalAbort } from "./SignalAbort-CPFWtyzs.js";
import { Gn as ArtifactReaderFailure, Xn as init_ArtifactReader, et as fileAccessFailureReason, fr as init_RegularFile, nr as init_OwnedRegularFile, or as NonRegularFileReadError, rr as regularFileCancellation, t as init_resources, tr as RegularFileCleanupFailure, tt as init_TextFileWrite } from "./resources-C5FMDwcC.js";
import { a as readJsonInputFile, n as JsonInputPhysicalReadFailure, o as readJsonObjectFile, r as init_JsonInputFile, t as JsonInputCancellationFailure } from "./JsonInputFile-CxJ82MAo.js";
import { i as init_RegularFileRead, o as regularFileCleanupLeases, r as bindRegularFileCleanup } from "./RegularFileRead-D5TIjSyD.js";

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
export { readJsonObjectMembersFile as i, readJsonFile as n, readJsonFileWithSource as r, init_JsonFiles as t };