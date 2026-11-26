import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_strictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, OwnedRegularFileOperationFailure, RegularFileCancelled, RegularFileChangedError, RegularFileCleanupFailure, RegularFileOperationCancelled, assertRegularFileActive, assertStableRegularFileIdentity, init_AnalysisCleanupLease, init_ArtifactReader, init_OwnedRegularFile, init_RegularFile, init_resources, regularFileCancellation, withOwnedRegularFile } from "./resources-B3P64jvH.js";

//#region dist/process/BoundedFileBytes.js
var readBoundedFileBytes;
function init_BoundedFileBytes() {
	return (init_BoundedFileBytes = __esmMin((() => {
		readBoundedFileBytes = async (handle, maxBytes, options = {}) => {
			const { signal, expectedSize, cancellationFailure, operationFailure } = options;
			const read = async (buffer, offset, length) => {
				try {
					return await handle.read(buffer, offset, length, null);
				} catch (cause) {
					if (operationFailure !== undefined) throw operationFailure(cause);
					throw cause;
				}
			};
			const assertActive = () => {
				if (signal?.aborted && cancellationFailure !== undefined) throw cancellationFailure(signal.reason);
				signal?.throwIfAborted();
			};
			if (!Number.isSafeInteger(maxBytes) || maxBytes < 0) throw new RangeError("File byte limit must be a nonnegative safe integer");
			if (expectedSize !== undefined && (!Number.isSafeInteger(expectedSize) || expectedSize < 0 || expectedSize > maxBytes)) throw new RangeError("Expected file size must fit the byte limit");
			assertActive();
			if (expectedSize === undefined) {
				const chunks = [];
				const buffer = Buffer.allocUnsafe(Math.min(64 * 1024, maxBytes + 1));
				let total = 0;
				for (;;) {
					assertActive();
					const { bytesRead } = await read(buffer, 0, Math.min(buffer.length, maxBytes - total + 1));
					assertActive();
					if (bytesRead === 0) return Buffer.concat(chunks, total);
					total += bytesRead;
					if (total > maxBytes) return undefined;
					chunks.push(Buffer.from(buffer.subarray(0, bytesRead)));
				}
			}
			const buffer = Buffer.allocUnsafe(expectedSize);
			if (expectedSize === 0) return buffer;
			let total = 0;
			for (;;) {
				assertActive();
				const { bytesRead } = await read(buffer, total, expectedSize - total);
				assertActive();
				if (bytesRead === 0) return buffer.subarray(0, total);
				total += bytesRead;
				if (total > maxBytes) return undefined;
				if (total === expectedSize) return buffer;
			}
		};
	})))();
}

//#endregion
//#region dist/process/RegularFileRead.js
var RetainedRegularFileCleanupFailure, regularFileCleanupLeases, bindRegularFileCleanup, RegularFileReadFailure, InvalidUtf8FileError, retryRegularFileCleanup, retryRegularFileCleanupFailures, withRegularFileCompletion, withRegularFile, readRegularFile, readRegularFileText, readRegularFileTextSnapshot, decodeFileText, readRegularFileContent;
function init_RegularFileRead() {
	return (init_RegularFileRead = __esmMin((() => {
		init_strictUtf8();
		init_RegularFile();
		init_OwnedRegularFile();
		init_BoundedFileBytes();
		init_resources();
		init_errorMessage();
		RetainedRegularFileCleanupFailure = class RetainedRegularFileCleanupFailure extends RegularFileCleanupFailure {
			cleanupOwner;
			cleanupLease;
			constructor(failure) {
				super(failure);
				this.cleanupLease = failure instanceof RetainedRegularFileCleanupFailure ? failure.cleanupLease : new AnalysisCleanupLease(() => failure.owner.close(), [failure.path]);
				this.cleanupOwner = failure instanceof RetainedRegularFileCleanupFailure ? failure.cleanupOwner : {
					kind: "lease",
					resource: failure.path,
					lease: this.cleanupLease
				};
			}
		};
		regularFileCleanupLeases = (cause) => cause instanceof RetainedRegularFileCleanupFailure ? [cause.cleanupLease] : cause instanceof ArtifactReaderFailure ? cause.cleanupLeases : undefined;
		bindRegularFileCleanup = (cause, error) => {
			const leases = regularFileCleanupLeases(cause);
			if (leases !== undefined) new AnalysisCleanupLeaseGroup(error, leases);
		};
		RegularFileReadFailure = class extends OwnedRegularFileOperationFailure {
			_tag = "RegularFileReadFailure";
			constructor(operationCause) {
				super(operationCause);
				this.name = this._tag;
			}
		};
		InvalidUtf8FileError = class extends TypeError {
			path;
			_tag = "InvalidUtf8FileError";
			constructor(path, cause) {
				super(`File is not valid UTF-8: ${path}`, { cause });
				this.path = path;
				this.name = this._tag;
			}
		};
		retryRegularFileCleanup = async (failure, resources, signal) => {
			const outcome = failure.outcome.kind === "failed" && failure.operationFailure === undefined && failure.outcome.cause instanceof RegularFileOperationCancelled && !(signal?.aborted === true && failure.outcome.cause === signal.reason) ? {
				kind: "failed",
				cause: failure.outcome.cause.reason
			} : failure.outcome;
			const retained = failure instanceof RetainedRegularFileCleanupFailure ? failure : new RetainedRegularFileCleanupFailure(failure);
			const released = await resources.release(retained.cleanupOwner);
			if (released.kind === "released") return { outcome };
			return {
				outcome,
				cleanupLease: released.lease,
				failure: retained,
				cleanup: {
					reason: `${errorMessage(failure.cleanupCause)}; retry: ${errorMessage(released.cause)}`,
					resources: [failure.path]
				}
			};
		};
		retryRegularFileCleanupFailures = async (failure, resources) => {
			const failures = [];
			const cleanupLeases = new Set();
			const observations = [];
			let current = failure;
			let primary;
			for (;;) {
				const retried = await retryRegularFileCleanup(current, resources);
				if (retried.cleanupLease !== undefined) cleanupLeases.add(retried.cleanupLease);
				failures.push(retried.failure ?? current);
				if (retried.cleanup !== undefined) observations.push(retried.cleanup);
				primary = retried.outcome.kind === "failed" ? retried.outcome.cause : current.cleanupCause;
				const nested = current.operationFailure === undefined && current.outcome.kind === "failed" ? current.outcome.cause : undefined;
				if (!(nested instanceof RegularFileCleanupFailure)) break;
				current = nested;
			}
			return {
				primary,
				failures,
				cleanupLeases: [...cleanupLeases],
				...observations.length === 0 ? {} : { cleanup: {
					reason: observations.map(({ reason }) => reason).join("; "),
					resources: observations.flatMap(({ resources }) => resources)
				} }
			};
		};
		withRegularFileCompletion = async (path, read, options = {}) => {
			const { signal, resources } = options;
			let admitted;
			const operation = async () => {
				try {
					const value = await withOwnedRegularFile(path, {
						...signal === undefined ? {} : { signal },
						symlinks: options.symlinks ?? "follow"
					}, async ({ handle, initial: stats }) => {
						admitted = handle;
						assertRegularFileActive(signal);
						const value = await read(handle, stats);
						assertRegularFileActive(signal);
						await assertStableRegularFileIdentity(handle, path, stats, {
							symlinks: options.symlinks ?? "follow",
							...signal === undefined ? {} : { signal }
						});
						assertRegularFileActive(signal);
						return value;
					});
					return { value };
				} catch (cause) {
					if (signal?.aborted === true && cause === signal.reason) throw cause;
					if (cause instanceof RegularFileReadFailure) throw cause;
					if (cause instanceof RegularFileCancelled && cause.owner.handle !== admitted) throw cause;
					if (cause instanceof RegularFileCleanupFailure) {
						if (resources === undefined) throw new RetainedRegularFileCleanupFailure(cause);
						const retry = await retryRegularFileCleanup(cause, resources, signal);
						if (retry.failure !== undefined) throw retry.failure;
						if (retry.outcome.kind === "failed") {
							if (cause.operationFailure === undefined && signal?.aborted === true && retry.outcome.cause === signal.reason) throw signal.reason;
							const cancellation = cause.operationFailure === undefined ? regularFileCancellation(retry.outcome.cause) ?? regularFileCancellation(cause) : undefined;
							if (cancellation !== undefined) {
								if (options.cancellationFailure !== undefined) throw options.cancellationFailure(cancellation.reason);
								throw cancellation.reason;
							}
							if (cause.operationFailure !== undefined && options.cancellationFailure !== undefined) throw cause.operationFailure;
							throw retry.outcome.cause;
						}
						return {
							value: retry.outcome.value,
							cancellation: regularFileCancellation(cause)
						};
					}
					if (cause instanceof RegularFileCancelled) return {
						value: cause.outcome.value,
						cancellation: { reason: cause.reason }
					};
					const cancellation = regularFileCancellation(cause);
					if (cancellation !== undefined) {
						if (options.cancellationFailure !== undefined) throw options.cancellationFailure(cancellation.reason);
						throw cancellation.reason;
					}
					if (options.cancellationFailure !== undefined) throw new RegularFileReadFailure(cause);
					throw cause;
				}
			};
			const completion = await (resources === undefined ? operation() : resources.run(operation));
			return completion.cancellation !== undefined || signal?.aborted !== true ? completion : {
				...completion,
				cancellation: { reason: signal.reason }
			};
		};
		withRegularFile = async (path, read, options = {}) => {
			const completion = await withRegularFileCompletion(path, read, options);
			const cancellation = completion.cancellation ?? (options.signal?.aborted === true ? { reason: options.signal.reason } : undefined);
			if (cancellation !== undefined) {
				const { reason } = cancellation;
				if (options.cancellationFailure !== undefined) throw options.cancellationFailure(reason);
				throw reason;
			}
			return completion.value;
		};
		readRegularFile = (path, options = {}) => readRegularFileContent(path, (bytes) => bytes, options);
		readRegularFileText = (path, options = {}) => readRegularFileContent(path, (bytes) => decodeFileText(path, bytes), options);
		readRegularFileTextSnapshot = (path, options = {}) => readRegularFileContent(path, (bytes, state) => ({
			text: decodeFileText(path, bytes),
			state
		}), options);
		decodeFileText = (path, bytes) => {
			try {
				return decodeStrictUtf8(bytes, "preserve");
			} catch (cause) {
				if (!(cause instanceof TypeError)) throw cause;
				throw new InvalidUtf8FileError(path, cause);
			}
		};
		readRegularFileContent = (path, decode, options) => {
			const operation = withRegularFile(path, async (handle, stats) => {
				try {
					options.admit?.(stats);
					const bytes = await readBoundedFileBytes(handle, stats.size, {
						...options.signal === undefined ? {} : { signal: options.signal },
						cancellationFailure: (reason) => new RegularFileOperationCancelled(reason),
						operationFailure: (cause) => new RegularFileReadFailure(cause)
					});
					if (bytes === undefined || bytes.length !== stats.size) throw new RegularFileChangedError(path);
					return decode(bytes, stats);
				} catch (cause) {
					if (options.cancellationFailure !== undefined && !(cause instanceof RegularFileOperationCancelled) && !(cause instanceof RegularFileReadFailure)) throw new RegularFileReadFailure(cause);
					throw cause;
				}
			}, options);
			if (options.cancellationFailure !== undefined) return operation;
			return operation.catch((cause) => {
				if (cause instanceof RegularFileReadFailure) throw cause.operationCause;
				throw cause;
			});
		};
	})))();
}

//#endregion
export { InvalidUtf8FileError, RegularFileReadFailure, RetainedRegularFileCleanupFailure, bindRegularFileCleanup, init_BoundedFileBytes, init_RegularFileRead, readBoundedFileBytes, readRegularFile, readRegularFileText, readRegularFileTextSnapshot, regularFileCleanupLeases, retryRegularFileCleanup, retryRegularFileCleanupFailures, withRegularFile, withRegularFileCompletion };