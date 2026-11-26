import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, analysisSettingLimit, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisSettingDefinitions, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactReaderFailure, RegularFileCleanupFailure, artifactFileCompletion, artifactFilePrimaryFacts, assertArtifactReadActive, bindArtifactFileCleanup, init_ArtifactFileOperation, init_ArtifactReader, init_OwnedRegularFile, init_resources, regularFileCancellation, withArtifactFileHandle } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { OwnedCommandFailure, init_OwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { hashStableFile, init_StableFileHash } from "./StableFileHash-BELT4STG.js";
import { assertArtifactCommandPath, init_ArtifactCommandPath } from "./ArtifactCommandPath-B5Zuhaxu.js";
import { KUNA_PROVIDER_ID, init_KunaRelease } from "./KunaAdmission-B_Q9expM.js";
import { init_KunaInstallation, kunaChildEnvironment, kunaInstallationFailureDiagnostics } from "./KunaInstallation-BxLSfF5v.js";
import { createHash, randomUUID } from "node:crypto";
import { open, stat } from "node:fs/promises";

//#region dist/kuna/KunaCommand.js
var KunaCommand_exports = /* @__PURE__ */ __exportAll({ kunaInstallationDialect: () => kunaInstallationDialect });
var KUNA_INVENTORY_OUTPUT_BYTES, kunaFileCleanupError, kunaRetainedResourceCleanupError, kunaInstallationDialect, verifiedExecutables, verifyExecutable, runKunaCommand, kunaCopyFailureFacts, copyIO, copyAndHash, capturedKunaOutput, commandFailure;
function init_KunaCommand() {
	return (init_KunaCommand = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisSettingDefinitions();
		init_analysisErrorCleanup();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_providerCleanupError();
		init_resources();
		init_OwnedCommand();
		init_StableFileHash();
		init_ArtifactCommandPath();
		init_OwnedRegularFile();
		init_KunaInstallation();
		init_KunaRelease();
		init_errorMessage();
		KUNA_INVENTORY_OUTPUT_BYTES = 128 * 1024 * 1024;
		kunaFileCleanupError = (failure, operation) => {
			const diagnostics = kunaInstallationFailureDiagnostics(failure);
			const cancellation = regularFileCancellation(failure);
			if (cancellation !== undefined) return cancelledBy(operation, carriedReason(cancellation.reason), {
				diagnostics,
				cleanup: {
					reason: errorMessage(failure.cleanupCause),
					resources: [failure.path]
				}
			});
			const cleanup = new ProviderCleanupError(KUNA_PROVIDER_ID, [failure.path], {
				reason: errorMessage(failure.cleanupCause),
				...diagnostics
			}, {
				cause: failure,
				operation
			});
			if (failure.outcome.kind === "completed") return cleanup;
			const primaryCause = failure.outcome.cause;
			const primary = primaryCause instanceof AnalysisError ? primaryCause : new ProviderAdapterError(KUNA_PROVIDER_ID, operation, {
				cause: primaryCause,
				diagnostics,
				userMessage: `Kuna ${operation} failed: ${errorMessage(primaryCause)}`
			});
			const composed = analysisErrorWithCleanupFailure(primary, cleanup, operation);
			return diagnostics === undefined ? composed : composed.retainDiagnostics(diagnostics);
		};
		kunaRetainedResourceCleanupError = (cause, operation) => {
			if (cause.cleanupLeases === undefined || cause.cleanupLeases.length === 0) return undefined;
			const cleanup = new ProviderCleanupError(KUNA_PROVIDER_ID, cause.cleanup?.resources ?? [], { reason: errorMessage(cause) }, {
				cause,
				operation
			});
			bindArtifactFileCleanup(cause, cleanup);
			return cleanup;
		};
		kunaInstallationDialect = (operation, resources, unclassified) => ({
			providerId: KUNA_PROVIDER_ID,
			operation,
			recognise: (cause) => {
				if (cause instanceof ArtifactReaderFailure) {
					const retained = kunaRetainedResourceCleanupError(cause, operation);
					if (retained !== undefined) return retained;
				}
				if (!(cause instanceof RegularFileCleanupFailure)) return resources.installationCancellationError(cause, operation);
				const error = kunaFileCleanupError(cause, operation);
				resources.bindFailure(cause, error);
				return error;
			},
			unclassified
		});
		verifiedExecutables = new Map();
		verifyExecutable = async (installation, signal, operation, retainFailedFileClose) => {
			const invocationPath = installation.configuration.command;
			await assertArtifactCommandPath({
				invocationPath,
				resolvedPath: installation.executable
			}, operation);
			const status = await stat(invocationPath, { bigint: true });
			const identity = [
				status.dev,
				status.ino,
				status.size,
				status.mtimeNs,
				status.ctimeNs
			].join(":");
			const known = verifiedExecutables.get(invocationPath);
			let sha256 = known?.identity === identity ? known.sha256 : undefined;
			if (sha256 === undefined) {
				sha256 = (await hashStableFile(invocationPath, {
					signal,
					retainFailedClose: (owner) => retainFailedFileClose(owner, invocationPath)
				})).sha256;
				verifiedExecutables.set(invocationPath, {
					identity,
					sha256
				});
			}
			return sha256 === installation.sha256 ? undefined : sha256;
		};
		runKunaCommand = async (request) => {
			const { installation } = request;
			try {
				const changed = await verifyExecutable(installation, request.signal, request.operation, request.retainFailedFileClose);
				if (changed !== undefined) return {
					kind: "failed",
					error: new ProviderAdapterError(KUNA_PROVIDER_ID, request.operation, {
						userMessage: `${installation.executable} changed after this target was opened; reopen the target so REA probes the current Kuna executable.`,
						diagnostics: {
							expected_sha256: installation.sha256,
							observed_sha256: changed
						}
					})
				};
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) {
					return {
						kind: "failed",
						error: kunaFileCleanupError(cause, request.operation),
						fileCleanupFailure: cause
					};
				}
				const cancellation = regularFileCancellation(cause);
				return {
					kind: "failed",
					error: cause instanceof AnalysisError ? cause : cancellation !== undefined ? cancelledBy(request.operation, carriedReason(cancellation.reason)) : new ProviderAdapterError(KUNA_PROVIDER_ID, request.operation, {
						cause,
						userMessage: `Cannot verify ${installation.executable}: ${errorMessage(cause)}`
					})
				};
			}
			try {
				const snapshot = await runOwnedCommand({
					command: installation.configuration.command,
					arguments: request.arguments,
					runId: `rea-kuna-${randomUUID()}`,
					...installation.script ? { expectedCommand: null } : {},
					cwd: request.workspace,
					hostEnvironment: kunaChildEnvironment(installation.configuration),
					env: { TMPDIR: request.workspace }
				}, {
					timeoutMs: Math.max(1, request.timeoutMs),
					diagnosticBytes: request.outputBytes,
					...request.stdout === undefined ? {} : { stdout: request.stdout }
				}, {
					signal: request.signal,
					...request.launcher === undefined ? {} : { launcher: request.launcher }
				});
				if (request.stdout === undefined && snapshot.stdout.invalidUtf8 === true) return {
					kind: "failed",
					error: new AnalysisOutputError(request.operation, "Kuna stdout is not valid UTF-8", {
						diagnostics: { stdout_invalid_utf8: true },
						capturedOutput: capturedKunaOutput(snapshot)
					})
				};
				return {
					kind: "ok",
					snapshot
				};
			} catch (cause) {
				return commandFailure(cause, request);
			}
		};
		kunaCopyFailureFacts = (cause) => {
			const primary = artifactFilePrimaryFacts(cause);
			return {
				...primary,
				completion: primary.origin === "owned-or-classified" ? artifactFileCompletion(primary.cause) : undefined
			};
		};
		copyIO = async (operation) => {
			try {
				return await operation();
			} catch (cause) {
				throw new ArtifactReaderFailure("io", errorMessage(cause), { cause });
			}
		};
		copyAndHash = async (source, destination, options) => options.resources.run(async () => {
			const { signal, resources, keep } = options;
			assertArtifactReadActive(signal);
			const input = await copyIO(() => open(source, "r"));
			return withArtifactFileHandle(source, input, resources, signal, async (input) => {
				assertArtifactReadActive(signal);
				const output = await copyIO(() => open(destination, "wx", 384));
				return withArtifactFileHandle(destination, output, resources, signal, async (output) => {
					const hash = createHash("sha256");
					let bytes = 0;
					const kept = [];
					let keptBytes = 0;
					let wanted = keep === undefined ? 0 : undefined;
					const decide = (prefix) => {
						wanted = Math.max(0, prefix.length(Buffer.concat(kept, keptBytes)));
					};
					const scratch = Buffer.allocUnsafe(64 * 1024);
					while (true) {
						assertArtifactReadActive(signal);
						const { bytesRead } = await copyIO(() => input.read(scratch, 0, scratch.length, null));
						assertArtifactReadActive(signal);
						if (bytesRead === 0) break;
						const chunk = scratch.subarray(0, bytesRead);
						let written = 0;
						while (written < bytesRead) {
							assertArtifactReadActive(signal);
							const { bytesWritten } = await copyIO(() => output.write(chunk, written, bytesRead - written, null));
							if (bytesWritten === 0) throw new ArtifactReaderFailure("io", "File copy made no write progress");
							written += bytesWritten;
							assertArtifactReadActive(signal);
						}
						hash.update(chunk);
						bytes += bytesRead;
						if (keep !== undefined && (wanted === undefined || keptBytes < wanted)) {
							const take = wanted === undefined ? bytesRead : Math.min(bytesRead, wanted - keptBytes);
							kept.push(Buffer.from(chunk.subarray(0, take)));
							keptBytes += take;
							if (wanted === undefined && keptBytes >= keep.probeBytes) decide(keep);
						}
					}
					if (keep !== undefined && wanted === undefined) decide(keep);
					assertArtifactReadActive(signal);
					return {
						sha256: hash.digest("hex"),
						bytes,
						prefix: Buffer.concat(kept, Math.min(wanted ?? 0, keptBytes))
					};
				});
			});
		});
		capturedKunaOutput = (snapshot, failureReason) => {
			if (snapshot === null) return undefined;
			const text = snapshot.stdout.text;
			let start = Math.max(0, text.length - 4096);
			if (start > 0 && (text.codePointAt(start - 1) ?? 0) > 65535) start += 1;
			return {
				stdout: failureReason === "output-limit" ? "" : text.slice(start),
				stderr: snapshot.stderr.text,
				truncated: snapshot.diagnosticTruncated === true || snapshot.outputIncomplete === true || start > 0,
				stdout_bytes: snapshot.stdout.observedBytes,
				stderr_bytes: snapshot.stderr.observedBytes,
				exit_code: snapshot.exitCode ?? null,
				signal: snapshot.signal ?? null
			};
		};
		commandFailure = (cause, request) => {
			const { operation } = request;
			const subcommand = request.arguments[0] ?? "";
			if (!(cause instanceof OwnedCommandFailure)) return {
				kind: "failed",
				error: new ProviderAdapterError(KUNA_PROVIDER_ID, operation, {
					cause,
					userMessage: `Cannot run ${request.installation.executable}: ${errorMessage(cause)}`
				})
			};
			const capturedOutput = capturedKunaOutput(cause.snapshot, cause.reason);
			const details = {
				cause,
				...capturedOutput === undefined ? {} : { capturedOutput }
			};
			let primary;
			if (cause.reason === "cancelled") primary = cancelledBy(operation, carriedReason(cause.cancellation?.reason), capturedOutput === undefined ? undefined : { capturedOutput });
			else if (cause.reason === "timeout") {
				const { setting, ms } = request.deadline;
				const analysisSetting = setting === "REA_KUNA_TIMEOUT_MS" ? "kuna.function_timeout_ms" : "kuna.project_timeout_ms";
				primary = new AnalysisTimeoutError(operation, ms, {
					...details,
					limit: analysisSettingLimit(analysisSetting, ms, request.deadline.source),
					userMessage: `kuna ${subcommand} did not finish within ${analysisSetting} (${String(ms)} ms).`,
					remediationAction: `${analysisSetting} is ${String(ms)} ms. It can be changed at runtime with update_analysis_settings. The launch seed is ${setting}.`
				});
			} else if (cause.reason === "output-limit") primary = new AnalysisResourceConstraintError(operation, "memory", `kuna ${subcommand} wrote more than ${String(request.outputBytes)} bytes of output.`, { output_limit_bytes: request.outputBytes }, {
				...details,
				remediationAction: `REA buffers at most ${String(request.outputBytes)} bytes of kuna ${subcommand} output, so repeating this request for this target fails the same way. Use another provider for it.`
			});
			else {
				const exitCode = capturedOutput?.exit_code;
				primary = new ProviderAdapterError(KUNA_PROVIDER_ID, operation, {
					...details,
					userMessage: `kuna ${subcommand} failed${exitCode === undefined || exitCode === null ? "" : ` with exit code ${String(exitCode)}`}: ${capturedOutput?.stderr.trim().split("\n").at(-1) || cause.message}`
				});
			}
			if (cause.cleanupFailure !== null) return {
				kind: "retained",
				processResources: cause.resources,
				error: new ProviderCleanupError(KUNA_PROVIDER_ID, [...cause.resources, request.workspace], { reason: cause.cleanupFailure }, {
					...details,
					operation,
					cleanupPrimary: primary
				}),
				owner: cause.cleanupOwner
			};
			return {
				kind: "failed",
				error: primary
			};
		};
	})))();
}

//#endregion
export { KUNA_INVENTORY_OUTPUT_BYTES, KunaCommand_exports, copyAndHash, init_KunaCommand, kunaCopyFailureFacts, kunaFileCleanupError, kunaInstallationDialect, runKunaCommand };