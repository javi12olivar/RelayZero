import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { cancelledBy, carriedReason, errorMessage, init_analysisErrorCore, init_errorMessage, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, RegularFileCancelled, RegularFileCleanupFailure, RegularFileOperationCancelled, assertRegularFileActive, init_AnalysisCleanupLease, init_ArtifactReader, init_OwnedRegularFile, init_RegularFile, init_resources, regularFileCancellation } from "./resources-B3P64jvH.js";
import { OwnedCommandFailure, init_OwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_OwnedCommandCleanup, retainOwnedCommandCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { hashStableFile, init_StableFileHash, observeStableFile, stableFileHashCause } from "./StableFileHash-BELT4STG.js";
import { assertArtifactCommandPath, init_ArtifactCommandPath } from "./ArtifactCommandPath-B5Zuhaxu.js";
import { KUNA_COMMAND_REMEDIATION, KUNA_VERIFIED_VERSION, KUNA_VERSION_PROBE_REMEDIATION, admitKunaCommand, init_KunaAdmission, init_KunaConfiguration, init_KunaRelease } from "./KunaAdmission-B_Q9expM.js";
import { constants } from "node:fs";
import { randomUUID } from "node:crypto";
import { realpath } from "node:fs/promises";

//#region dist/kuna/KunaInstallation.js
var KunaInstallation_exports = /* @__PURE__ */ __exportAll({
	createKunaResourceScope: () => createKunaResourceScope,
	inspectKunaInstallation: () => inspectKunaInstallation
});
var VERSION_PROBE_TIMEOUT_MS, VERSION_PROBE_MAX_OUTPUT_BYTES, VERSION_LINE, versionProbeOutput, versionProbeOutputDiagnostics, installationFailureDiagnostics, kunaInstallationFailureDiagnostics, kunaInstallationCancellation, createKunaResourceScope, kunaChildEnvironment, failure, recordPartialInstallationFileOperation, inspectKunaInstallation;
function init_KunaInstallation() {
	return (init_KunaInstallation = __esmMin((() => {
		init_RegularFile();
		init_callerPath();
		init_jsonValue();
		init_analysisErrorCore();
		init_result();
		init_resources();
		init_StableFileHash();
		init_OwnedRegularFile();
		init_OwnedCommand();
		init_OwnedCommandCleanup();
		init_ArtifactCommandPath();
		init_KunaAdmission();
		init_KunaConfiguration();
		init_KunaRelease();
		init_errorMessage();
		VERSION_PROBE_TIMEOUT_MS = 1e4;
		VERSION_PROBE_MAX_OUTPUT_BYTES = 64 * 1024;
		VERSION_LINE = /^kuna (\d+\.\d+(?:\.\d+)?)\r?\n?$/u;
		versionProbeOutput = (snapshot) => ({
			stdout: snapshot?.stdout.text ?? "",
			stderr: snapshot?.stderr.text ?? "",
			exitCode: snapshot?.exitCode ?? null,
			signal: snapshot?.signal ?? null,
			stdoutBytes: snapshot?.stdout.bytes ?? 0,
			stdoutObservedBytes: snapshot?.stdout.observedBytes ?? 0,
			stderrBytes: snapshot?.stderr.bytes ?? 0,
			stderrObservedBytes: snapshot?.stderr.observedBytes ?? 0,
			stdoutInvalidUtf8: snapshot?.stdout.invalidUtf8 === true,
			stderrInvalidUtf8: snapshot?.stderr.invalidUtf8 === true,
			diagnosticTruncated: snapshot?.diagnosticTruncated === true,
			outputIncomplete: snapshot?.outputIncomplete === true,
			truncated: snapshot?.diagnosticTruncated === true || snapshot?.outputIncomplete === true || snapshot !== null && snapshot !== undefined && snapshot.stdout.bytes < snapshot.stdout.observedBytes
		});
		versionProbeOutputDiagnostics = (output) => ({
			stdout: output.stdout,
			stderr: output.stderr,
			exit_code: output.exitCode,
			signal: output.signal,
			stdout_bytes: output.stdoutBytes,
			stdout_observed_bytes: output.stdoutObservedBytes,
			stderr_bytes: output.stderrBytes,
			stderr_observed_bytes: output.stderrObservedBytes,
			...output.stdoutInvalidUtf8 ? { stdout_invalid_utf8: true } : {},
			...output.stderrInvalidUtf8 ? { stderr_invalid_utf8: true } : {},
			diagnostic_truncated: output.diagnosticTruncated,
			output_incomplete: output.outputIncomplete,
			output_truncated: output.truncated
		});
		installationFailureDiagnostics = new WeakMap();
		kunaInstallationFailureDiagnostics = (cause) => cause instanceof Error ? installationFailureDiagnostics.get(cause) : undefined;
		kunaInstallationCancellation = (cause) => {
			const cancellation = regularFileCancellation(cause);
			if (cancellation === undefined) return undefined;
			const diagnostics = kunaInstallationFailureDiagnostics(cause);
			return {
				reason: cancellation.reason,
				...diagnostics === undefined ? {} : { diagnostics }
			};
		};
		createKunaResourceScope = (parent) => {
			const leases = new Map();
			const pendingLeases = () => [...leases.values()].filter((lease) => !lease.released);
			const bindPendingFailure = (error) => {
				const retained = pendingLeases();
				if (retained.length > 0) new AnalysisCleanupLeaseGroup(error, retained);
			};
			const cleanupResources = (pending = pendingLeases()) => {
				if (pending.some((lease) => lease.cleanupResources === undefined)) return undefined;
				return [...new Set(pending.flatMap((lease) => lease.cleanupResources ?? []))];
			};
			return {
				get hasPending() {
					return pendingLeases().length > 0;
				},
				get cleanupResources() {
					return cleanupResources();
				},
				installationCancellationError: (cause, operation) => {
					const cancellation = kunaInstallationCancellation(cause);
					if (cancellation === undefined) return undefined;
					const pending = pendingLeases();
					const error = cancelledBy(operation, carriedReason(cancellation.reason), {
						diagnostics: cancellation.diagnostics,
						...pending.length === 0 ? {} : { cleanup: {
							reason: "Kuna version-probe process cleanup is unconfirmed.",
							resources: cleanupResources(pending) ?? []
						} }
					});
					bindPendingFailure(error);
					return error;
				},
				owner: {
					retain: (owner, resource) => {
						const lease = AnalysisCleanupLease.forCloseOwner(owner, resource);
						leases.set(owner, lease);
						parent.retain({
							close: () => lease.release(),
							get cleanupResources() {
								return lease.cleanupResources;
							}
						}, resource);
					},
					run: (operation) => parent.run(operation)
				},
				bindFailure: (failure, error) => {
					if (leases.has(failure.owner)) bindPendingFailure(error);
				},
				bindRetainedFailure: bindPendingFailure
			};
		};
		kunaChildEnvironment = (configuration) => {
			const home = appendCallerPath(configuration.cacheRoot, "home");
			return {
				HOME: home,
				XDG_CACHE_HOME: appendCallerPath(home, ".cache"),
				NO_COLOR: "1"
			};
		};
		failure = (code, reason, diagnostics) => err({
			code,
			reason,
			diagnostics
		});
		recordPartialInstallationFileOperation = (cause, facts) => {
			const cancellation = regularFileCancellation(cause);
			if (!(cause instanceof Error) || !(cause instanceof RegularFileCleanupFailure) && cancellation === undefined) return false;
			const outcome = cause instanceof RegularFileCancelled || cause instanceof RegularFileCleanupFailure ? cause.outcome : undefined;
			const completed = outcome?.kind === "completed" ? outcome.value : undefined;
			const completedRecord = completed !== null && typeof completed === "object" && !Array.isArray(completed) ? completed : undefined;
			const completedFingerprint = facts.observed.phase === "fingerprint" ? completed : completedRecord === undefined ? undefined : {
				sha256: completedRecord["sha256"],
				bytes: completedRecord["bytes"]
			};
			const completedHash = facts.observed.completedHash ?? (outcome?.kind === "completed" && completedFingerprint !== undefined ? jsonValueSchema.parse(completedFingerprint) : undefined);
			const completedScript = facts.observed.script ?? (facts.observed.phase === "identity" && Buffer.isBuffer(completedRecord?.["prefix"]) ? completedRecord["prefix"].toString("latin1") === "#!" : undefined);
			installationFailureDiagnostics.set(cause, {
				kuna_installation: {
					status: "partial",
					command: facts.command,
					executable: facts.executable,
					...facts.version === undefined ? {} : {
						version: facts.version,
						verified: facts.version === KUNA_VERIFIED_VERSION
					},
					...completedHash === undefined ? {} : { completed_hash: completedHash },
					...completedScript === undefined ? {} : { script: completedScript },
					...facts.observed.beforeProbeFingerprint === undefined ? {} : {
						before_probe_sha256: facts.observed.beforeProbeFingerprint.sha256,
						before_probe_bytes: facts.observed.beforeProbeFingerprint.bytes
					}
				},
				...facts.observed.probe === undefined ? {} : { kuna_version_probe: {
					status: "completed",
					deadline_ms: facts.observed.probe.deadlineMs,
					...versionProbeOutputDiagnostics(facts.observed.probe.output)
				} }
			});
			return true;
		};
		inspectKunaInstallation = async (environment, options) => {
			assertRegularFileActive(options.signal);
			const admission = admitKunaCommand(environment, options.platform);
			if (!admission.ok) {
				const { code, reason, remediation, diagnostics } = admission.error;
				return err(code === "executable_missing" ? {
					code,
					reason,
					diagnostics
				} : {
					code,
					reason,
					remediation,
					diagnostics
				});
			}
			const configuration = admission;
			const { command } = configuration.value;
			let executable;
			try {
				executable = await realpath(command);
			} catch (cause) {
				return failure("executable_missing", `Cannot execute REA_KUNA_COMMAND ${command}: ${errorMessage(cause)}. ${KUNA_COMMAND_REMEDIATION}`, { command });
			}
			assertRegularFileActive(options.signal);
			let beforeProbeFingerprint;
			const beforeProbeObservation = { phase: "fingerprint" };
			try {
				await assertArtifactCommandPath({
					invocationPath: command,
					resolvedPath: executable
				}, "kuna:installation");
				beforeProbeFingerprint = await options.resourceScope.run(() => hashStableFile(command, {
					...options.signal === undefined ? {} : { signal: options.signal },
					retainFailedClose: (owner) => options.resourceScope.retain(owner, command)
				}));
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				if (recordPartialInstallationFileOperation(cause, {
					command,
					executable,
					observed: beforeProbeObservation
				})) throw cause;
				return failure("executable_missing", `Cannot fingerprint ${executable}: ${errorMessage(stableFileHashCause(cause))}`, {
					command,
					executable
				});
			}
			const deadline = options.probeTimeoutMs ?? VERSION_PROBE_TIMEOUT_MS;
			let snapshot;
			try {
				snapshot = await options.resourceScope.run(() => runOwnedCommand({
					command,
					arguments: ["--version"],
					runId: `rea-kuna-version-${randomUUID()}`,
					expectedCommand: null,
					hostEnvironment: kunaChildEnvironment(configuration.value)
				}, {
					timeoutMs: deadline,
					diagnosticBytes: VERSION_PROBE_MAX_OUTPUT_BYTES
				}, {
					...options.signal === undefined ? {} : { signal: options.signal },
					...options.processLauncher === undefined ? {} : { launcher: options.processLauncher }
				}));
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				const retainedCleanup = retainOwnedCommandCleanup(cause, options.resourceScope, "kuna", "kuna:installation");
				const cleanupIncomplete = retainedCleanup.length > 0;
				if (cause instanceof OwnedCommandFailure) {
					const output = versionProbeOutput(cause.snapshot);
					if (cause.reason === "cancelled") {
						const cancellation = new RegularFileOperationCancelled(cause.cancellation?.reason);
						installationFailureDiagnostics.set(cancellation, { kuna_version_probe: {
							status: "partial",
							command,
							executable,
							deadline_ms: deadline,
							...versionProbeOutputDiagnostics(output),
							probe_failure_reason: cause.reason,
							cleanup_incomplete: cleanupIncomplete
						} });
						throw cancellation;
					}
					return failure("version_unresolved", `${executable} --version failed: ${output.stderr.trim() || cause.message}. ${KUNA_VERSION_PROBE_REMEDIATION}`, {
						command,
						executable,
						probe_failure_reason: cause.reason,
						cleanup_incomplete: cleanupIncomplete,
						deadline_ms: deadline,
						...versionProbeOutputDiagnostics(output)
					});
				}
				return failure("version_unresolved", `${executable} --version failed: ${errorMessage(cause)}. ${KUNA_VERSION_PROBE_REMEDIATION}`, {
					command,
					executable,
					exit_code: null,
					signal: null,
					cleanup_incomplete: cleanupIncomplete,
					deadline_ms: deadline
				});
			}
			const probeOutput = versionProbeOutput(snapshot);
			if (probeOutput.truncated) return failure("version_unresolved", `${executable} --version output was incomplete. ${KUNA_VERSION_PROBE_REMEDIATION}`, {
				command,
				executable,
				deadline_ms: deadline,
				output_truncated: true,
				stdout: probeOutput.stdout.slice(0, 256)
			});
			const version = VERSION_LINE.exec(probeOutput.stdout)?.[1];
			if (version === undefined) return failure("version_unresolved", `${executable} --version printed no recognizable Kuna version. ${KUNA_VERSION_PROBE_REMEDIATION}`, {
				command,
				executable,
				stdout: probeOutput.stdout.slice(0, 256)
			});
			let fingerprint;
			let script;
			const observed = {
				phase: "fingerprint",
				beforeProbeFingerprint,
				probe: {
					deadlineMs: deadline,
					output: probeOutput
				}
			};
			try {
				({fingerprint, script} = await options.resourceScope.run(async () => {
					observed.phase = "identity";
					await assertArtifactCommandPath({
						invocationPath: command,
						resolvedPath: executable
					}, "kuna:installation");
					const observation = await observeStableFile(command, {
						...options.signal === undefined ? {} : { signal: options.signal },
						retainFailedClose: (owner) => options.resourceScope.retain(owner, command)
					});
					const fingerprint = {
						sha256: observation.sha256,
						bytes: observation.bytes
					};
					const script = observation.prefix.length === 2 && observation.prefix.toString("latin1") === "#!";
					observed.completedHash = fingerprint;
					observed.script = script;
					assertRegularFileActive(options.signal);
					return {
						fingerprint,
						script
					};
				}));
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				if (recordPartialInstallationFileOperation(cause, {
					command,
					executable,
					version,
					observed
				})) {
					throw cause;
				}
				return failure("executable_missing", `Cannot observe ${executable} after its --version probe: ${errorMessage(stableFileHashCause(cause))}`, {
					command,
					executable,
					version,
					verified: version === KUNA_VERIFIED_VERSION,
					identity_observation_phase: "post_probe",
					identity_observation_failure: errorMessage(stableFileHashCause(cause)),
					before_probe_sha256: beforeProbeFingerprint.sha256,
					before_probe_bytes: beforeProbeFingerprint.bytes,
					deadline_ms: deadline,
					...versionProbeOutputDiagnostics(probeOutput)
				});
			}
			if (beforeProbeFingerprint.sha256 !== fingerprint.sha256 || beforeProbeFingerprint.bytes !== fingerprint.bytes) return failure("version_unresolved", `${executable} changed during the --version probe. ${KUNA_VERSION_PROBE_REMEDIATION}`, {
				command,
				executable,
				version,
				verified: version === KUNA_VERIFIED_VERSION,
				installation_identity_changed: true,
				before_sha256: beforeProbeFingerprint.sha256,
				before_bytes: beforeProbeFingerprint.bytes,
				after_sha256: fingerprint.sha256,
				after_bytes: fingerprint.bytes,
				deadline_ms: deadline,
				...versionProbeOutputDiagnostics(probeOutput)
			});
			return ok({
				configuration: configuration.value,
				executable,
				version,
				verified: version === KUNA_VERIFIED_VERSION,
				...fingerprint,
				script
			});
		};
	})))();
}

//#endregion
export { KunaInstallation_exports, createKunaResourceScope, init_KunaInstallation, inspectKunaInstallation, kunaChildEnvironment, kunaInstallationFailureDiagnostics };