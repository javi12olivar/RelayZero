import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_localPath, init_sha256Hex, localPathStringSchema, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, decodeStrictUtf8, init_HostPlatform, init_safeJson, init_strictUtf8, isStrictUtf8, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, appendCallerPath, compositeKey, init_callerPath, init_unicodeCodePointOrder, init_virtualFileMapping, resolveMappedFileOffset } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { CLI_COMMANDS, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliLogging, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactFileCancelled, ArtifactFileCleanupFailure, ArtifactReaderFailure, ArtifactResourceRetryFailure, ArtifactResourceScope, NonRegularFileReadError, OwnedFileHandle, RegularFileCancelled, RegularFileChangedError, RegularFileCleanupFailure, abortIfNeeded, artifactFileCancellationCause, artifactOperationCause, artifactPrimaryCleanupLeases, assertArtifactReadActive, bindArtifactFileCleanup, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedFileHandle, init_OwnedRegularFile, init_RegularFile, init_StreamDigest, init_readFileHandleRange, init_resources, isSelectedRegularFileError, readFileHandleRange, regularFileCancellation, sameRegularFileState, withOwnedFileHandle, withOwnedRegularFile } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, analysisErrorWithCleanupFailure, ellipsisExcerpt, init_analysisErrorCleanup, init_excerpt, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { RetainedRegularFileCleanupFailure, bindRegularFileCleanup, init_RegularFileRead } from "./RegularFileRead-CRu2Ia6l.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { ExecFileOutputCancelledError, execFileBytes, execFileOutput, execFileOutputFailure, init_ExecFileOutput } from "./ExecFileOutput-YDVPmL3I.js";
import { createEvidence, describeValidationFailure, init_evidence, init_validationFailure } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { cliDecimalField, init_options } from "./options-BYpy7iiK.js";
import { init_cliProgress, writeCliProgressLine } from "./cliProgress-BqujgRoY.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { assertProcessOwnershipInspectionActive, init_ProcessInspectionCancellation, init_ProcessInspectionCleanup, init_ProcessLifecycle, init_ProcessOwnershipObservation, init_ProcessRunTokenObservations, isProcessOwnershipInspectionCancellation, processIdentityHasExited, processInspectionCancellations, processInspectionCleanupFailures, readNativeProcessIdentityMap, readProcessOwnershipFacts, readRunTokenCarriers, systemProcessOwnershipHost, waitForProcessOwnershipInspection } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { RegularFileCapacityError, init_readStableFileBytes, readStableFileBytes, readStableFilePrefix } from "./readStableFileBytes-DcvIhp5d.js";
import { ProviderProcessSupervisor, init_ProviderProcess, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { cleanupOwnedProcessGroup, init_ProcessOwnership, readProcessRunId } from "./ProcessOwnership-CezAYpow.js";
import { init_OwnedCommand, ownedCommandResources, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { bindProcessInspectionCancellations, init_OwnedCommandCleanup, processInspectionCancellationError, retainProcessInspectionCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { StableFileHashFailure, init_StableFileHash, observeStableFile, stableFileHashCause } from "./StableFileHash-BELT4STG.js";
import { allKeyed, init_keyedCollection, keyedBy, uniqueKeyed } from "./keyedCollection-BoRfT2aE.js";
import { DT_NEEDED, DT_RPATH, DT_RUNPATH, DT_STRSZ, DT_STRTAB, init_elfDynamicEntry, walkElfDynamicTable } from "./elfDynamicEntry-DMv_AN_D.js";
import { admitElfFixedHeaderFacts, init_elfFixedHeader, readElfHeaderFacts } from "./elfFixedHeader-D38fsdBg.js";
import { admitElfLoadSegment, elfLoadSpans, elfProgramHeaderWidth, init_elfProgramHeader, init_elfRawTableDeclarations, readElfProgramHeader, readElfRawTableDeclarations } from "./elfRawTableDeclarations-Cgbp6HKT.js";
import { init_elfStringTable, observeElfStringTableEntry } from "./elfStringTable-tJEHn-H2.js";
import { init_ElectronFuseReader, readElectronFuseImage } from "./ElectronFuseReader-CJ3jIKlX.js";
import { SamplingReadBatchFailure, init_LinuxProcessSampling, init_ProcessSamplingObservation, readLinuxChildren, readLinuxCommand, readLinuxOpenFiles, readLinuxProcessStat, readStableLinuxProcessDetails, samplingInspectionFailures, samplingObservation } from "./LinuxProcessSampling-DWLmVfVi.js";
import { DEBIAN_PACKAGE_NAME, DESKTOP_CAPTURE_DEFAULTS, PACKAGE_FILE_FIELDS, SQLITE_SIDECARS, X11_WINDOW_PROPERTY_ARGUMENTS, aptIndexSourceSuite, aptListFileName, checkpointNameRefusal, checkpointTaken, dearmorPublicKeys, declaredPackageFiles, desktopViewPolicyInputSchema, diffDesktopStates, entryForTarget, expandDesktopExec, fromUbuntuNobleArchive, init_appExportInstall, init_appExportUnowned, init_aptRepositories, init_debianPackageFile, init_desktopCapture, init_desktopEntry, init_desktopStateDiff, init_desktopViewPolicy, init_stateFormats, init_x11Windows, isArmoredKey, isUbuntuProRepository, isWithinAny, packageFileMismatch, parseAptConfigShell, parseAptIndexTargets, parseDeb822Sources, parseDesktopEntry, parseDpkgDebFields, parseOneLineSources, parseX11ClientList, parseX11WindowProperties, repositoryRefusal, repositorySupplies, tokenizeDesktopExec, unretainedOpenedDirectories, unretainedOpenedLimitation, unwrapDesktopCommand, validSignature, withoutCredentialsIn } from "./x11Windows-Cx5-JOUb.js";
import { init_ProgramLookup, resolveProgram } from "./ProgramLookup-4Ei2ENwn.js";
import { basename, dirname, isAbsolute, join, posix } from "node:path";
import { z } from "zod";
import { createHash, randomUUID } from "node:crypto";
import { chmod, lstat, mkdir, open, readdir, readlink, realpath, rename, rm, rmdir, stat, writeFile } from "node:fs/promises";
import { hostname, userInfo } from "node:os";
import { setTimeout } from "node:timers/promises";
import { performance as performance$1 } from "node:perf_hooks";
import { createInterface } from "node:readline";

//#region dist/domain/desktop/libraryPolicy.js
var DESKTOP_LIBRARY_DEFAULTS, desktopLibraryPolicyInputSchema, desktopLibraryPolicy, desktopLibraryLimit;
function init_libraryPolicy() {
	return (init_libraryPolicy = __esmMin((() => {
		DESKTOP_LIBRARY_DEFAULTS = {
			libraries: 512,
			search_path_entries: 16,
			string_bytes: 4096,
			table_bytes: 1024 * 1024
		};
		desktopLibraryPolicyInputSchema = z.strictObject({
			libraries: z.int().positive().optional(),
			search_path_entries: z.int().positive().optional(),
			string_bytes: z.int().positive().optional(),
			table_bytes: z.int().positive().optional()
		});
		desktopLibraryPolicy = (input) => {
			const selected = desktopLibraryPolicyInputSchema.parse(input ?? {});
			return {
				libraries: selected.libraries ?? DESKTOP_LIBRARY_DEFAULTS.libraries,
				search_path_entries: selected.search_path_entries ?? DESKTOP_LIBRARY_DEFAULTS.search_path_entries,
				string_bytes: selected.string_bytes ?? DESKTOP_LIBRARY_DEFAULTS.string_bytes,
				table_bytes: selected.table_bytes ?? DESKTOP_LIBRARY_DEFAULTS.table_bytes
			};
		};
		desktopLibraryLimit = (policy, key, boundary) => `${boundary} reached library-policy.${key}=${String(policy[key])}${key.endsWith("bytes") ? " bytes" : " entries"}. For a new capture, increase ${key} in --library-policy JSON; no REA restart is required. Capture content limits and worker heaps do not raise this allowance.`;
	})))();
}

//#endregion
//#region dist/ports/DesktopApplicationSession.js
var XpropUnavailableError, DesktopSessionCleanupError;
function init_DesktopApplicationSession() {
	return (init_DesktopApplicationSession = __esmMin((() => {
		XpropUnavailableError = class extends Error {
			command;
			constructor(command) {
				super(`${command} could not be started`);
				this.command = command;
				this.name = "XpropUnavailableError";
			}
		};
		DesktopSessionCleanupError = class extends Error {
			primary;
			cleanup;
			constructor(primary, cleanup) {
				super(`desktop session cleanup is incomplete: ${cleanup.reason}`, { cause: primary });
				this.primary = primary;
				this.cleanup = cleanup;
				this.name = "DesktopSessionCleanupError";
			}
		};
	})))();
}

//#endregion
//#region dist/filesystem/canonicalCallerPath.js
var canonicalCallerPath;
function init_canonicalCallerPath() {
	return (init_canonicalCallerPath = __esmMin((() => {
		init_callerPath();
		canonicalCallerPath = async (path) => {
			const remaining = [];
			let current = absoluteCallerPath(path);
			for (;;) {
				try {
					const found = await stat(current);
					if (remaining.length > 0 && !found.isDirectory()) throw Object.assign(new Error(`Path parent is not a directory: ${current}`), { code: "ENOTDIR" });
					return join(await realpath(current), ...remaining);
				} catch (cause) {
					if (cause.code !== "ENOENT") throw cause;
					const existing = await lstat(current).then(() => true, (error) => {
						if (error.code === "ENOENT") return false;
						throw error;
					});
					if (existing || basename(current) === ".." || dirname(current) === current) throw cause;
					remaining.unshift(basename(current));
					current = dirname(current);
				}
			}
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopCaptureRefusals.js
var DESKTOP_OPERATION, DESKTOP_PROVIDER, inputError, unavailable, applicationRefusal, alreadyOpen, windowsUnreadable, clientListMissing, outputRefusal, checkDesktopCaptureHost, desktopOperationFailure;
function init_DesktopCaptureRefusals() {
	return (init_DesktopCaptureRefusals = __esmMin((() => {
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCancellation();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_validationFailure();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_OwnedCommandCleanup();
		DESKTOP_OPERATION = "capture_desktop_application";
		DESKTOP_PROVIDER = {
			id: "rea-desktop",
			name: "REA desktop application capture",
			version: "1"
		};
		inputError = (userMessage, path, remediationAction) => new AnalysisInputError(DESKTOP_OPERATION, {
			userMessage,
			remediationAction,
			conformsToInputContract: true
		}, [{
			path,
			reason: "invalid_value",
			message: userMessage
		}]);
		unavailable = (reason, userMessage, remediationAction) => new AnalysisCapabilityUnavailableError(DESKTOP_PROVIDER.id, DESKTOP_OPERATION, reason, {
			userMessage,
			remediationAction
		});
		applicationRefusal = (refusal) => {
			switch (refusal.reason) {
				case "desktop_entry_not_found": return inputError(`No desktop entry with that id was found in ${refusal.searched.join(", ")}.`, ["desktop_entry"], "Pass an installed entry's id (for example org.xfce.mousepad) or its absolute path, or name the program with --executable.");
				case "desktop_entry_search_incomplete": return inputError(`The search for a desktop entry with that id under ${refusal.searched.join(", ")} stopped before it could tell whether one is installed.`, ["desktop_entry"], "Pass the entry's absolute path, or narrow the installed entries under those folders.");
				case "desktop_entry_invalid": return inputError(`The desktop entry cannot be launched: ${refusal.detail}.`, ["desktop_entry"], "Choose an Application entry with an Exec key, or name the program with --executable.");
				case "executable_not_found": return inputError(`${refusal.program} is not an executable file or a program on PATH.`, ["executable"], "Install the application, or pass the executable's path.");
				case "executable_on_relative_path": return inputError(`${refusal.program} was found through a relative or empty PATH entry, which the exported computer would not have, so its launch could run another program.`, ["executable"], "Pass the executable's absolute path, or capture with a PATH of absolute directories.");
			}
		};
		alreadyOpen = (launchedBy, running) => {
			const windows = running.map((window) => `"${window.title ?? window.id}"${window.pid === null ? "" : ` (pid ${String(window.pid)})`}`);
			return inputError(`The application is already open: ${windows.join(", ")}.`, [launchedBy], "Close the application, then run the capture again so it launches the application and records its starting state.");
		};
		windowsUnreadable = () => unavailable("display_unreadable", "The X11 client list could not be read with xprop, so REA cannot tell whether the application is already open.", "Check that DISPLAY names the running X11 session and that this user may connect to it (XAUTHORITY), then retry.");
		clientListMissing = () => unavailable("window_manager_unsupported", "The window manager does not publish _NET_CLIENT_LIST, so REA cannot list the application's windows. Desktop capture requires an EWMH-compliant window manager.", "Run the capture in a desktop session whose window manager supports EWMH, such as xfwm4, Mutter, KWin or Openbox.");
		outputRefusal = (output, refusal) => {
			const reasons = {
				not_a_directory: `${output} is not a directory.`,
				foreign_owner: `${output} belongs to another user, so the capture could not be kept private.`,
				not_empty: `The output directory ${output} is not empty.`
			};
			return inputError(reasons[refusal], ["output"], "Pass a new directory, or an empty one you own, with --output.");
		};
		checkDesktopCaptureHost = async (request, host) => {
			if (host.platform !== "linux") throw unavailable("unsupported_host", "Desktop application capture runs on Linux only.", "Run the command on the Linux desktop where the application is installed.");
			const display = host.environment.DISPLAY;
			if (display === undefined || display.length === 0) throw unavailable("display_unavailable", "DISPLAY is not set, so there is no X11 display to launch the application on.", "Run the command from a terminal in the X11 desktop session, or set DISPLAY.");
			const xprop = host.environment.REA_XPROP_COMMAND ?? "xprop";
			if (await host.desktop.resolveProgram(xprop, host.environment, process.cwd()) === undefined) throw unavailable("executable_missing", `${xprop} was not found, so windows cannot be observed.`, "Install x11-utils (it provides xprop), or set REA_XPROP_COMMAND to an xprop executable.");
			const home = host.environment.HOME;
			if (home === undefined || !isAbsolute(home)) throw inputError("HOME must be an absolute path.", ["environment", "HOME"], "Run the command as the desktop user, with HOME set to their home directory.");
			if (request.desktopEntry === undefined === (request.executable === undefined)) throw inputError("Name the application with exactly one of --desktop-entry or --executable.", ["desktop_entry"], "Pass either --desktop-entry or --executable, not both and not neither.");
			const existing = await readdir(request.output).catch((cause) => {
				if (cause.code === "ENOENT") return [];
				if (cause.code === "ENOTDIR") throw outputRefusal(request.output, "not_a_directory");
				throw cause;
			});
			if (existing.length > 0) throw outputRefusal(request.output, "not_empty");
			return {
				display,
				xprop,
				home
			};
		};
		desktopOperationFailure = (cause, signal, operation, label) => {
			let failure;
			const inspectionCancellation = processInspectionCancellationError(cause, operation);
			if (cause instanceof AnalysisError) failure = cause;
			else if (inspectionCancellation !== undefined) failure = inspectionCancellation;
			else if (cause instanceof RetainedRegularFileCleanupFailure) {
				const cancellation = regularFileCancellation(cause);
				const primary = cause.outcome.kind === "failed" && cause.outcome.cause instanceof AnalysisError ? cause.outcome.cause : cancellation === undefined ? undefined : cancelledBy(operation, carriedReason(cancellation.reason));
				const error = new ProviderAdapterError(DESKTOP_PROVIDER.id, operation, {
					cause,
					...primary === undefined ? {} : { cleanupPrimary: primary },
					cleanup: {
						reason: describeValidationFailure(cause.cleanupCause),
						resources: [cause.path]
					},
					userMessage: `${label} could not close an input file.`
				});
				bindRegularFileCleanup(cause, error);
				failure = error;
			} else if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
				const primary = cause.reason === "cancelled" ? cancelledBy(operation, carriedReason(artifactFileCancellationCause(cause))) : undefined;
				const error = new ProviderAdapterError(DESKTOP_PROVIDER.id, operation, {
					cause,
					...primary === undefined ? {} : { cleanupPrimary: primary },
					cleanup: cause.cleanup,
					diagnostics: { phase: operation },
					userMessage: `${label} could not release a resource it used: ${describeValidationFailure(cause)}`
				});
				bindArtifactFileCleanup(cause, error);
				failure = error;
			} else if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") {
				failure = cancelledBy(operation, carriedReason(artifactFileCancellationCause(cause)));
			} else failure = new ProviderAdapterError(DESKTOP_PROVIDER.id, operation, {
				cause,
				diagnostics: { phase: operation },
				userMessage: `${label} could not complete: ${describeValidationFailure(cause)}`
			});
			return signal?.aborted === true ? analysisErrorWithCancellation(failure, cancelledBy(operation, signal)) : failure;
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopCaptureFailure.js
var HANDLES_UNCLOSED, CAPTURE_FILE_UNCLOSED, PROCESS_REMEDIATION, closeHandles, closeStoreHandles, DesktopCaptureInspectionCleanupContext, cleanupError, nonEmpty, publishedCaptureCleanup, discardFailedCapture, describe, failedCaptureError, projectFailure;
function init_DesktopCaptureFailure() {
	return (init_DesktopCaptureFailure = __esmMin((() => {
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_providerAdapterError();
		init_validationFailure();
		init_DesktopApplicationSession();
		init_DesktopCaptureRefusals();
		HANDLES_UNCLOSED = "a retained file's handle could not be closed after a retry";
		CAPTURE_FILE_UNCLOSED = "the unpublished capture file's handle could not be closed after a retry";
		PROCESS_REMEDIATION = "Check for processes still carrying the listed run token and stop them before capturing again.";
		closeHandles = async (owner, resource, reason) => owner.close().then(() => [], (cause) => [{
			reason,
			leases: cause instanceof ArtifactResourceRetryFailure ? cause.cleanupLeases : [AnalysisCleanupLease.forCloseOwner(owner, resource)]
		}]);
		closeStoreHandles = (store) => closeHandles(store, store.directory, HANDLES_UNCLOSED);
		DesktopCaptureInspectionCleanupContext = class extends AggregateError {
			inspectionCleanup;
			constructor(inspectionCleanup, options) {
				super(inspectionCleanup.flatMap((snapshot) => snapshot.causes), "Desktop process inspection cleanup facts", options);
				this.inspectionCleanup = inspectionCleanup;
				this.name = "DesktopCaptureInspectionCleanupContext";
			}
		};
		cleanupError = (unresolved, options) => {
			const leases = unresolved.flatMap((entry) => entry.leases);
			const cleanup = {
				reason: unresolved.map((entry) => entry.reason).join("; "),
				resources: [...new Set(leases.flatMap((lease) => lease.cleanupResources ?? []))]
			};
			const errorOptions = options(cleanup.reason);
			const inspectionCleanup = [...new Set(unresolved.flatMap((entry) => entry.inspectionCleanup === undefined ? [] : [entry.inspectionCleanup]))];
			const error = new ProviderAdapterError(DESKTOP_PROVIDER.id, DESKTOP_OPERATION, {
				...errorOptions,
				...inspectionCleanup.length === 0 ? {} : { cause: new DesktopCaptureInspectionCleanupContext(inspectionCleanup, Object.hasOwn(errorOptions, "cause") ? { cause: errorOptions.cause } : undefined) },
				cleanup
			});
			new AnalysisCleanupLeaseGroup(error, leases);
			return error;
		};
		nonEmpty = (items) => items.length > 0;
		publishedCaptureCleanup = async (published, store, processes) => {
			const unresolved = [...processes === undefined ? [] : [processes], ...await closeStoreHandles(store)];
			if (!nonEmpty(unresolved)) return undefined;
			return cleanupError(unresolved, (reason) => ({
				userMessage: `The capture was written to ${published}, but cleanup is incomplete: ${reason}.`,
				remediationAction: processes === undefined ? "Retry the command in a new capture folder; the written capture is complete." : PROCESS_REMEDIATION,
				diagnostics: { capture_file: published }
			}));
		};
		discardFailedCapture = async (store, captureFile) => {
			const resources = new ArtifactResourceScope();
			const removals = [{
				reason: "the content the failed capture retained could not be removed",
				attempt: await resources.release({
					kind: "lease",
					resource: store.directory,
					lease: { release: () => store.discard() }
				})
			}, {
				reason: "the unpublished capture file could not be removed",
				attempt: await resources.release({
					kind: "lease",
					resource: captureFile.partial,
					lease: { release: () => captureFile.discard() }
				})
			}];
			return [
				...removals.flatMap(({ reason, attempt }) => attempt.kind === "failed" ? [{
					reason,
					leases: [attempt.lease]
				}] : []),
				...await closeHandles(captureFile, captureFile.partial, CAPTURE_FILE_UNCLOSED),
				...await closeStoreHandles(store)
			];
		};
		describe = (cause) => cause instanceof AnalysisError ? cause.userMessage ?? cause.message : describeValidationFailure(cause);
		failedCaptureError = (cause, discarded) => {
			const session = cause instanceof DesktopSessionCleanupError ? cause.cleanup : undefined;
			const unresolved = [...session === undefined ? [] : [session], ...discarded];
			if (!nonEmpty(unresolved)) return cause;
			const primary = cause instanceof DesktopSessionCleanupError ? cause.primary : cause;
			const failure = cleanupError(unresolved, (reason) => ({
				cause: primary,
				...primary instanceof AnalysisError ? { cleanupPrimary: primary } : {},
				userMessage: `Desktop capture could not complete: ${describe(primary)}; cleanup is incomplete: ${reason}.`,
				remediationAction: session === undefined ? "Remove the listed paths, then retry the command in a new capture folder." : PROCESS_REMEDIATION,
				diagnostics: { phase: "desktop_capture" }
			}));
			return primary instanceof AnalysisError && primary.cleanupIncomplete ? analysisErrorWithCleanupDependencies(primary, failure, DESKTOP_OPERATION) : failure;
		};
		projectFailure = (cause, signal) => {
			return desktopOperationFailure(cause instanceof XpropUnavailableError ? unavailable("executable_missing", cause.message, "Install x11-utils, or set REA_XPROP_COMMAND to an xprop executable.") : cause, signal, DESKTOP_OPERATION, "Desktop capture");
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopCaptureOutput.js
var prepareOutputDirectory, CaptureFile;
function init_DesktopCaptureOutput() {
	return (init_DesktopCaptureOutput = __esmMin((() => {
		init_resources();
		init_OwnedFileHandle();
		prepareOutputDirectory = async (output) => {
			try {
				await mkdir(output, {
					recursive: true,
					mode: 448
				});
			} catch (cause) {
				const code = cause.code;
				if (code === "EEXIST" || code === "ENOTDIR") return { refusal: "not_a_directory" };
				throw cause;
			}
			const stats = await lstat(output);
			if (!stats.isDirectory()) return { refusal: "not_a_directory" };
			const uid = process.getuid?.();
			if (uid !== undefined && stats.uid !== uid) return { refusal: "foreign_owner" };
			if ((await readdir(output)).length > 0) return { refusal: "not_empty" };
			if ((stats.mode & 63) !== 0) await chmod(output, 448);
			return { path: await realpath(output) };
		};
		CaptureFile = class {
			partial;
			#target;
			/** Whether this run created the partial file and has not published or removed it. */
			#created = false;
			/** The partial file's handle when its close failed; kept owned so `close` can retry it. */
			#unclosed = new ArtifactResourceScope();
			constructor(output) {
				this.partial = join(output, "capture.json.partial");
				this.#target = join(output, "capture.json");
			}
			/**
			* Write the evidence and rename it into place; returns the published path.
			* A failed write is reported ahead of a failed close, and a handle whose
			* close failed stays owned until `close` releases it.
			*/
			async publish(evidence) {
				const text = `${JSON.stringify(evidence, null, 2)}\n`;
				const handle = new OwnedFileHandle(await open(this.partial, "wx", 384));
				this.#created = true;
				const written = await handle.handle.writeFile(text).then(() => undefined, (cause) => ({ cause }));
				const closed = await this.#unclosed.release({
					kind: "file-handle",
					resource: this.partial,
					handle
				});
				if (written !== undefined) throw written.cause;
				if (closed.kind === "failed") throw closed.cause;
				await rename(this.partial, this.#target);
				this.#created = false;
				return this.#target;
			}
			/**
			* Retry the partial file's failed close. A handle that fails again stays
			* owned, and the rejection carries its exact cleanup lease.
			*/
			close() {
				return this.#unclosed.retryCleanup();
			}
			/** Remove the partial file, only when this run created it. */
			async discard() {
				if (!this.#created) return;
				await rm(this.partial, { force: true });
				this.#created = false;
			}
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopCaptureScope.js
var unique, unresolvedStateDirectory, canonicalStateDirectory, pathKind, captureScope, applicationWindowMatching;
function init_DesktopCaptureScope() {
	return (init_DesktopCaptureScope = __esmMin((() => {
		init_desktopStateDiff();
		init_stateFormats();
		init_callerPath();
		init_canonicalCallerPath();
		unique = (paths) => [...new Set(paths)];
		unresolvedStateDirectory = (cause) => {
			const code = cause.code;
			return code === "ENOENT" || code === "EACCES" || code === "EPERM" || code === "ENOTDIR" || code === "ELOOP";
		};
		canonicalStateDirectory = async (path) => {
			try {
				return await canonicalCallerPath(path);
			} catch (cause) {
				if (!unresolvedStateDirectory(cause)) throw cause;
				return absoluteCallerPath(path);
			}
		};
		pathKind = async (path) => await lstat(path).then((stats) => stats.isDirectory(), (cause) => {
			if (cause.code === "ENOENT") return false;
			throw cause;
		}) ? "directory" : "file";
		captureScope = async (request, inventory, home, output) => {
			const canonical = (paths) => Promise.all(paths.map((path) => canonicalCallerPath(path)));
			const named = (paths) => Promise.all(paths.map(async (path) => ({
				path: absoluteCallerPath(path),
				physical: await canonicalCallerPath(path)
			})));
			const stateDirectories = await Promise.all(inventory.state_directories.map((entry) => canonicalStateDirectory(entry.path)));
			const argumentPaths = await named(request.arguments.filter((value) => isAbsolute(value)));
			const broadArguments = unique(argumentPaths.map(({ physical }) => physical).filter((path) => isWithinAny(home, [path])));
			const selectedPaths = await Promise.all([...new Map([...await named(request.statePaths), ...argumentPaths.filter(({ physical }) => !broadArguments.includes(physical))].map((entry) => [entry.path, entry])).values()].map(async (entry) => ({
				...entry,
				kind: await pathKind(entry.physical)
			})));
			const selected = unique(selectedPaths.map(({ physical }) => physical));
			const contentRoots = unique([
				...stateDirectories,
				...selected,
				...selectedPaths.flatMap(({ physical, kind }) => kind === "directory" ? [] : SQLITE_SIDECARS.map(({ suffix }) => `${physical}${suffix}`))
			]);
			return {
				scope: {
					roots: unique([home, ...contentRoots.filter((path) => !isWithinAny(path, [home]))]),
					contentRoots,
					stateDirectories,
					excluded: unique([output, ...await canonical(request.excludes)]),
					maxEntries: request.maxEntries
				},
				selectedPaths,
				broadArguments
			};
		};
		applicationWindowMatching = (inventory) => {
			const flatpak = inventory.package.kind === "flatpak";
			const executable = basename(inventory.executable.path);
			return {
				names: new Set([
					inventory.desktop_entry?.startup_wm_class,
					flatpak && executable === "flatpak" ? null : executable,
					inventory.desktop_entry?.id,
					inventory.desktop_entry?.id?.split(".").at(-1),
					flatpak ? inventory.package.name : null
				].filter((name) => typeof name === "string" && name.length > 0).map((name) => name.toLowerCase())),
				byPid: !flatpak
			};
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopCheckpointRecorder.js
var EMPTY_WALK, fileFacts, sameVersion, CheckpointRecorder;
function init_DesktopCheckpointRecorder() {
	return (init_DesktopCheckpointRecorder = __esmMin((() => {
		init_desktopStateDiff();
		EMPTY_WALK = {
			entries: new Map(),
			listed: new Set(),
			roots: new Set()
		};
		fileFacts = (state, sha256) => ({
			type: state.type,
			size: state.size,
			mode: state.mode,
			mtime_ns: state.mtime_ns,
			sha256
		});
		sameVersion = (left, right) => left.size === right.size && left.mtime_ns === right.mtime_ns && left.inode === right.inode;
		CheckpointRecorder = class {
			scope;
			store;
			walkHome;
			checkpoints = [];
			baselineNonFiles = [];
			/** Mount points any walk recorded without entering. */
			mountPoints = new Set();
			#previous = EMPTY_WALK;
			/** Digests keyed by path, valid only for the file version they were read from. */
			#hashes = new Map();
			openedFiles = new Set();
			constructor(scope, store, walkHome) {
				this.scope = scope;
				this.store = store;
				this.walkHome = walkHome;
			}
			async #retain(path, state, retained, signal) {
				const outcome = await this.store.retain(path, state, signal);
				if (outcome.kind === "omitted") return null;
				retained.push({
					path,
					sha256: outcome.sha256,
					size: outcome.size
				});
				this.#hashes.set(path, {
					sha256: outcome.sha256,
					state
				});
				return outcome.sha256;
			}
			async #changes(walk, retained, signal) {
				const { differences, unconfirmed } = diffDesktopStates(this.#previous, walk);
				const changes = [];
				for (const { path, kind, before, after } of differences) {
					const known = this.#hashes.get(path);
					const beforeHash = known !== undefined && before !== null && sameVersion(known.state, before) ? known.sha256 : null;
					this.#hashes.delete(path);
					const afterHash = after?.type === "file" ? await this.#retain(path, after, retained, signal) : null;
					changes.push({
						path,
						kind,
						before: before === null ? null : fileFacts(before, beforeHash),
						after: after === null ? null : fileFacts(after, afterHash),
						in_state_directory: isWithinAny(path, this.scope.stateDirectories),
						opened_by_application: this.openedFiles.has(path)
					});
				}
				return {
					changes,
					unconfirmed
				};
			}
			/** Walk the roots and record one checkpoint; the first one is the baseline. */
			async record(name, trigger, atMs, signal) {
				const { roots, excluded, maxEntries, contentRoots } = this.scope;
				const walk = await this.walkHome(roots, excluded, maxEntries, signal);
				for (const mountPoint of walk.mountPoints) this.mountPoints.add(mountPoint);
				const retained = [];
				let changes = [];
				let unconfirmed = 0;
				if (trigger === "baseline") {
					for (const [path, state] of walk.entries) {
						if (state.type !== "file") this.baselineNonFiles.push({
							path,
							type: state.type
						});
						if (state.type === "file" && isWithinAny(path, contentRoots)) await this.#retain(path, state, retained, signal);
					}
				} else ({changes, unconfirmed} = await this.#changes(walk, retained, signal));
				this.#previous = walk;
				this.checkpoints.push({
					name,
					trigger,
					at_ms: atMs,
					entries: walk.entries.size,
					truncated: walk.truncated,
					unreadable_directories: walk.unreadableDirectories,
					unchecked_paths: walk.uncheckedPaths,
					unconfirmed_changes: unconfirmed,
					changes,
					retained
				});
			}
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopSigningKeys.js
var OMITTED, retainSigningKeys;
function init_DesktopSigningKeys() {
	return (init_DesktopSigningKeys = __esmMin((() => {
		OMITTED = {
			too_large: "is larger than the capture's per-file limit (--max-file-bytes)",
			budget_exhausted: "did not fit the capture's content budget",
			changed_since_walk: "changed before it was stored",
			changed_during_read: "changed before it was stored",
			unreadable: "could not be stored"
		};
		retainSigningKeys = async (inventory, keys, store) => {
			const omitted = new Map();
			for (const [sha256, bytes] of keys) {
				const stored = await store.retainBytes(bytes);
				if (stored.kind === "omitted") omitted.set(sha256, OMITTED[stored.reason]);
			}
			const repositories = inventory.package.apt_repositories;
			if (omitted.size === 0 || repositories === undefined) return inventory;
			return {
				...inventory,
				package: {
					...inventory.package,
					apt_repositories: repositories.map((repository) => {
						const key = repository.signing_key;
						const reason = key === null ? undefined : omitted.get(key.sha256);
						if (key === null || reason === undefined) return repository;
						return {
							...repository,
							signing_key: null,
							signing_key_reason: `the verified key ${key.path} ${reason}, so it was not retained`
						};
					})
				}
			};
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopApplicationCapture.js
var POLL_INTERVAL_MS, hostIdentity, limitationsFor, captureEvidence, admit, recordCapture, runCapture, captureDesktopApplication;
function init_DesktopApplicationCapture() {
	return (init_DesktopApplicationCapture = __esmMin((() => {
		init_targetIdentity();
		init_ProcessInspectionCleanup();
		init_ProcessSamplingObservation();
		init_HostPlatform();
		init_analysisErrorCore();
		init_OwnedCommandCleanup();
		init_analysisErrorProjection();
		init_appExportUnowned();
		init_desktopCapture();
		init_evidence();
		init_DesktopApplicationSession();
		init_canonicalCallerPath();
		init_DesktopCaptureFailure();
		init_DesktopCaptureOutput();
		init_DesktopCaptureRefusals();
		init_DesktopCaptureScope();
		init_DesktopCheckpointRecorder();
		init_DesktopSigningKeys();
		POLL_INTERVAL_MS = 500;
		hostIdentity = () => {
			const name = hostname();
			let user;
			try {
				user = userInfo().username;
			} catch {
				user = undefined;
			}
			return {
				...name.length === 0 ? {} : { hostname: name },
				...user === undefined || user.length === 0 ? {} : { user }
			};
		};
		limitationsFor = (session, recorder, facts) => {
			const limitations = ["File changes are compared by size, modification time, inode and mode at each checkpoint, so a change undone between two checkpoints is not seen.", "Changes are not attributed to a writer: a path is marked when it lies in one of the application's state directories or an application process held it open during a sample."];
			const checkpoints = recorder.checkpoints;
			const mountPoints = [...recorder.mountPoints];
			const add = (condition, text) => {
				if (condition) limitations.push(text);
			};
			add(session.end_reason === "cancelled", `The capture was cancelled after checkpoint ${checkpoints.at(-1)?.name ?? "baseline"}; the application was closed without a final checkpoint.`);
			add(!session.cleanup.verified, `REA could not verify that every process it launched has exited: ${session.cleanup.reason ?? "unknown reason"}.`);
			add(checkpoints.some((checkpoint) => checkpoint.truncated), "At least one checkpoint stopped walking at the entry limit, so changes beyond it are missing.");
			add(checkpoints.some((checkpoint) => checkpoint.unconfirmed_changes > 0), "Some paths appeared or disappeared under directories a walk could not list completely; they are counted as unconfirmed, not reported.");
			add(mountPoints.length > 0, `Walks did not enter directories on another filesystem, so changes inside them are not recorded: ${mountPoints.join(", ")}.`);
			add(facts.broadArguments.length > 0, `The argument ${facts.broadArguments.join(", ")} is / or contains the home directory, so it was not walked or retained as a content root.`);
			add(session.first_window_ms === null, "No application window was seen.");
			add(facts.unreadableWindowSamples > 0, `The window list could not be read in ${String(facts.unreadableWindowSamples)} sample(s); windows open only then are missing, and those samples were not taken as the application having exited.`);
			add(session.processes.some((process) => !process.started_by_capture), "An application window belonged to a process the capture did not start; that process was left running.");
			const unretained = unretainedOpenedLimitation(facts.unretained, facts.home);
			if (unretained !== undefined) limitations.push(unretained);
			return limitations;
		};
		captureEvidence = (request, capture) => createEvidence(unknownTarget("not-observed"), DESKTOP_PROVIDER, {
			predicateType: "rea.desktop-application-capture",
			operation: DESKTOP_OPERATION,
			parameters: {
				launch: request.desktopEntry === undefined ? "executable" : "desktop_entry",
				argument_count: request.arguments.length,
				state_path_count: request.statePaths.length,
				exclude_count: request.excludes.length,
				package_file: request.packageFile !== undefined,
				...request.libraryPolicy === undefined ? {} : { library_policy: request.libraryPolicy }
			},
			result: capture,
			confidence: "observed",
			authority: "controlled-replay",
			environment: {
				id: `linux-${HOST_PLATFORM.architecture}`,
				platform: "linux",
				architecture: HOST_PLATFORM.architecture,
				isolation: "none"
			},
			limitations: capture.limitations
		});
		admit = async (request, host, signal) => {
			const { display, xprop, home } = await checkDesktopCaptureHost(request, host);
			const inspected = await host.desktop.inspectApplication({
				...request,
				environment: host.environment,
				home,
				callerDirectory: host.callerDirectory
			}, signal);
			if (!inspected.ok) throw applicationRefusal(inspected.error);
			const { inventory, envProgramIndex, limitations, signingKeys } = inspected.value;
			const windows = host.desktop.observeWindows(xprop, host.environment);
			const windowMatching = applicationWindowMatching(inventory);
			const running = await host.desktop.runningApplicationWindows(windows, windowMatching.names, signal);
			if (running.state === "no_client_list") throw clientListMissing();
			if (running.state === "display_unreadable") throw windowsUnreadable();
			if (running.windows.length > 0) throw alreadyOpen(request.desktopEntry === undefined ? "executable" : "desktop_entry", running.windows);
			if (signal?.aborted === true) throw cancelledBy(DESKTOP_OPERATION, signal);
			const prepared = await prepareOutputDirectory(request.output);
			if ("refusal" in prepared) throw outputRefusal(request.output, prepared.refusal);
			return {
				display,
				home: await canonicalCallerPath(home),
				output: prepared.path,
				inventory,
				envProgramIndex,
				limitations,
				signingKeys,
				windows,
				windowMatching
			};
		};
		recordCapture = async (request, host, context, signal) => {
			const { admitted, store } = context;
			const { scope } = context.scope;
			const { inventory, home } = admitted;
			const application = await retainSigningKeys(inventory, admitted.signingKeys, store);
			const recorder = new CheckpointRecorder(scope, store, host.desktop.walkHome);
			const acknowledge = async (titles = []) => {
				const taken = recorder.checkpoints.at(-1);
				if (taken === undefined) return;
				const event = checkpointTaken(taken, home, context.scope.selectedPaths.map(({ physical }) => physical), titles);
				await host.report(`Recorded checkpoint ${taken.name}: ${String(event.changes)} change(s), ${String(event.retained_files)} file(s) retained.`, event);
			};
			await host.report("Recording the starting state.");
			await recorder.record("baseline", "baseline", 0, signal);
			await acknowledge();
			await host.report(`Launching ${inventory.argv.join(" ")}.`);
			const outcome = await host.desktop.runSession({
				argv: inventory.argv,
				...admitted.envProgramIndex === undefined ? {} : { envProgramIndex: admitted.envProgramIndex },
				workingDirectory: inventory.working_directory,
				environment: host.environment,
				windows: admitted.windows,
				windowMatching: admitted.windowMatching,
				roots: scope.roots,
				maxDurationMs: request.maxDurationSeconds * 1e3,
				pollIntervalMs: POLL_INTERVAL_MS,
				nextRequest: host.nextRequest,
				checkpoint: async (name, trigger, atMs, seen) => {
					await host.report(`Recording checkpoint ${name}.`);
					recorder.openedFiles = seen.openedFiles;
					await recorder.record(name, trigger, atMs, signal);
					await acknowledge(seen.titles);
				},
				report: host.report,
				signal
			});
			const { session, unreleased } = outcome;
			const unretained = unretainedOpenedDirectories(session.opened_files.map((file) => file.path), {
				...scope,
				home
			});
			const capture = {
				host: {
					platform: "linux",
					architecture: HOST_PLATFORM.architecture,
					display: admitted.display,
					home,
					...hostIdentity()
				},
				application,
				session,
				state: {
					roots: [...scope.roots],
					content_roots: [...scope.contentRoots],
					baseline_non_files: recorder.baselineNonFiles,
					state_directories: [...scope.stateDirectories],
					selected_paths: [...context.scope.selectedPaths],
					excluded: [...scope.excluded],
					checkpoints: recorder.checkpoints,
					content_files: store.files,
					content_bytes: store.bytes,
					omitted_content: [...store.omissions],
					unretained_opened_directories: [...unretained]
				},
				limitations: [...admitted.limitations, ...limitationsFor(session, recorder, {
					unretained,
					home,
					broadArguments: context.scope.broadArguments,
					unreadableWindowSamples: outcome.unreadableWindowSamples
				})]
			};
			const evidence = captureEvidence(request, capture);
			return {
				evidence,
				session,
				unreleased
			};
		};
		runCapture = async (request, host, signal) => {
			const admitted = await admit(request, host, signal);
			const { inventory, output, home } = admitted;
			const scope = await captureScope(request, inventory, home, output);
			const store = await host.desktop.openContentStore(output, request.maxFileBytes, request.maxContentBytes);
			const captureFile = new CaptureFile(output);
			let recorded;
			let published;
			try {
				recorded = await recordCapture(request, host, {
					admitted,
					scope,
					store
				}, signal);
				published = await captureFile.publish(recorded.evidence);
			} catch (cause) {
				const primary = cause instanceof DesktopSessionCleanupError ? cause.primary : cause;
				const projected = projectFailure(primary, undefined);
				const inspections = samplingInspectionFailures(primary);
				const cleanupInspections = inspections.filter((inspection) => processInspectionCleanupFailures(inspection).length > 0);
				const sessionOwnsInspection = cause instanceof DesktopSessionCleanupError && cleanupInspections.length > 0 && cleanupInspections.every((inspection) => cause.cleanup.inspectionCleanup?.causes.includes(inspection) === true);
				let failure = projected;
				for (const inspection of inspections.length === 0 ? [primary] : inspections) failure = sessionOwnsInspection ? bindProcessInspectionCancellations(inspection, failure, DESKTOP_OPERATION) : retainProcessInspectionCleanup(inspection, failure, store.resourceScope, DESKTOP_OPERATION);
				const sessionCleanup = cause instanceof DesktopSessionCleanupError ? cause.cleanup : recorded?.unreleased;
				throw failedCaptureError(sessionCleanup === undefined ? failure : new DesktopSessionCleanupError(failure, sessionCleanup), await discardFailedCapture(store, captureFile));
			}
			const { evidence, session, unreleased } = recorded;
			const cleanup = await publishedCaptureCleanup(published, store, unreleased);
			if (cleanup !== undefined) throw cleanup;
			if (signal?.aborted === true && session.end_reason !== "cancelled") throw cancelledBy(DESKTOP_OPERATION, signal, { partialObservation: evidence });
			return evidence;
		};
		captureDesktopApplication = async (request, host, signal) => {
			try {
				return await runCapture(request, host, signal);
			} catch (cause) {
				return {
					error: "Desktop capture failed",
					...projectAnalysisError(projectFailure(cause, signal))
				};
			}
		};
	})))();
}

//#endregion
//#region dist/process/TokenOwnedTermination.js
var EXIT_POLL_INTERVAL_MS, systemTerminationHost, tokenOwnedFacts, processGroupOf, identityOf, awaitExit, send, TokenOwnedTerminationFailure, terminateTokenOwnedProcesses;
function init_TokenOwnedTermination() {
	return (init_TokenOwnedTermination = __esmMin((() => {
		init_result();
		init_ProcessLifecycle();
		init_ProcessOwnershipObservation();
		init_ProcessRunTokenObservations();
		EXIT_POLL_INTERVAL_MS = 100;
		systemTerminationHost = {
			ownership: systemProcessOwnershipHost,
			signalProcess: (pid, signal) => {
				process.kill(pid, signal);
			}
		};
		tokenOwnedFacts = async (runId, host) => (await readProcessOwnershipFacts(await readRunTokenCarriers(host, runId), host)).filter((fact) => fact.state === "same-generation" && fact.token.state === "readable" && fact.token.runId === runId && !processIdentityHasExited(fact.identityAfter));
		processGroupOf = ({ identityAfter }) => identityAfter.state === "readable" && identityAfter.relation?.state === "observed" ? identityAfter.relation.processGroupId : undefined;
		identityOf = ({ identityAfter }) => identityAfter.state === "readable" ? identityAfter.identity : undefined;
		awaitExit = async (signalled, deadline, host) => {
			let pending = signalled;
			while (pending.length > 0) {
				const remaining = deadline - performance$1.now();
				if (remaining <= 0) return;
				await setTimeout(Math.min(EXIT_POLL_INTERVAL_MS, remaining));
				const current = await readNativeProcessIdentityMap(pending.map(({ process }) => process), host);
				pending = pending.filter((fact) => {
					const now = current.get(fact.process.pid);
					return !processIdentityHasExited(now) && !(now?.state === "readable" && now.identity !== identityOf(fact));
				});
			}
		};
		send = (deliver) => {
			try {
				deliver();
				return true;
			} catch {
				return false;
			}
		};
		TokenOwnedTerminationFailure = class extends Error {
			launchGroupSignalled;
			_tag = "TokenOwnedTerminationFailure";
			constructor(cause, launchGroupSignalled) {
				super("Token-owned process termination inspection failed", { cause });
				this.launchGroupSignalled = launchGroupSignalled;
				this.name = this._tag;
			}
		};
		terminateTokenOwnedProcesses = async (ownership, graceMs, host = systemTerminationHost) => {
			const deadline = performance$1.now() + graceMs;
			let launchGroupSignalled = false;
			try {
				const owned = await tokenOwnedFacts(ownership.runId, host.ownership);
				const inGroup = (fact) => processGroupOf(fact) === ownership.processGroupId;
				launchGroupSignalled = owned.some(inGroup) && send(() => {
					host.ownership.signalGroup(ownership.processGroupId, "SIGTERM");
				});
				const signalled = launchGroupSignalled ? owned.filter(inGroup) : [];
				for (const fact of owned) if (!inGroup(fact) && send(() => {
					host.signalProcess(fact.process.pid, "SIGTERM");
				})) signalled.push(fact);
				await awaitExit(signalled, deadline, host.ownership);
				return ok({ launchGroupSignalled });
			} catch (cause) {
				return err(new TokenOwnedTerminationFailure(cause, launchGroupSignalled));
			}
		};
	})))();
}

//#endregion
//#region dist/desktop/DesktopSessionObservations.js
var COMMAND_TEXT_LIMIT, ANCESTOR_LIMIT, running, optionalInspectionFailure, systemProcfs, matchesWindowNames, SessionObservations, startedByAncestor, trackProcess, sampleProcesses, sampleTokenCarriers, sampleOpenFiles, recordWindows, windowMatch, observedSession;
function init_DesktopSessionObservations() {
	return (init_DesktopSessionObservations = __esmMin((() => {
		init_desktopStateDiff();
		init_excerpt();
		init_LinuxProcessSampling();
		init_ProcessSamplingObservation();
		init_ProcessInspectionCancellation();
		init_ProcessInspectionCleanup();
		init_ProcessOwnership();
		init_ProcessOwnershipObservation();
		init_ProcessRunTokenObservations();
		COMMAND_TEXT_LIMIT = 512;
		ANCESTOR_LIMIT = 64;
		running = (stat) => stat !== undefined && stat.lifecycle !== "zombie" && stat.lifecycle !== "dead";
		optionalInspectionFailure = (cause) => {
			if (processInspectionCleanupFailures(cause).length > 0 || processInspectionCancellations(cause).length > 0) throw cause;
			return undefined;
		};
		systemProcfs = {
			stat: (pid, signal) => readLinuxProcessStat(pid, signal),
			async children(pid, signal) {
				return (await readLinuxChildren(pid, signal)).value ?? [];
			},
			runId: (pid, signal) => readProcessRunId(pid, undefined, signal).catch(optionalInspectionFailure),
			command: (pid, signal) => readLinuxCommand(pid, signal),
			tokenCarriers: (runId, signal) => readRunTokenCarriers(systemProcessOwnershipHost, runId, signal).then((carriers) => carriers.map(({ pid }) => pid), optionalInspectionFailure)
		};
		matchesWindowNames = (window, names) => window.class !== null && names.has(window.class.toLowerCase()) || window.instance !== null && names.has(window.instance.toLowerCase());
		SessionObservations = class {
			startedAt;
			run;
			matching;
			procfs;
			/** Every process generation seen, in discovery order. */
			#processes = [];
			/** The latest generation seen under each pid. */
			#byPid = new Map();
			windows = new Map();
			openedFiles = new Map();
			firstWindowMs = null;
			announced = false;
			/** Samples whose window list could not be read, so their windows are unknown. */
			unreadableWindowSamples = 0;
			constructor(startedAt, run, matching, procfs = systemProcfs) {
				this.startedAt = startedAt;
				this.run = run;
				this.matching = matching;
				this.procfs = procfs;
			}
			now() {
				return Math.max(0, Math.round(performance.now() - this.startedAt));
			}
			get processes() {
				return this.#processes;
			}
			/** The latest generation recorded under a pid. */
			tracked(pid) {
				return this.#byPid.get(pid);
			}
			record(entry) {
				this.#processes.push(entry);
				this.#byPid.set(entry.pid, entry);
			}
			/** Live processes; with `startedOnly`, only those the capture started. */
			liveProcessIds(startedOnly = false) {
				return [...this.#byPid.values()].filter((entry) => entry.alive && (entry.started || !startedOnly)).map((entry) => entry.pid);
			}
			/** A window is the application's by live owner pid or by class name. */
			belongs(window) {
				return this.matching.byPid && window.pid !== null && this.tracked(window.pid)?.alive === true || matchesWindowNames(window, this.matching.names);
			}
		};
		startedByAncestor = async (observations, parentPid, signal) => {
			let pid = parentPid;
			for (let depth = 0; depth < ANCESTOR_LIMIT && pid > 1; depth += 1) {
				const { value: stat } = await observations.procfs.stat(pid, signal);
				if (stat === undefined) return false;
				const known = observations.tracked(pid);
				if (known?.alive === true && known.started && known.startTime === stat.startTime) return true;
				pid = stat.parent_pid;
			}
			return false;
		};
		trackProcess = async (observations, pid, signal) => {
			const { procfs } = observations;
			const initial = await procfs.stat(pid, signal);
			assertProcessOwnershipInspectionActive(signal);
			const stat = initial.value;
			const known = observations.tracked(pid);
			if (known !== undefined && stat?.startTime === known.startTime) {
				known.alive = running(stat);
				return;
			}
			if (known !== undefined) known.alive = false;
			const launched = pid === observations.run.launchPid && known === undefined;
			if (stat === undefined && !launched) return;
			const at = observations.now();
			const { value: observed } = await readStableLinuxProcessDetails(initial, () => procfs.stat(pid, signal), async (row) => {
				const runId = await procfs.runId(pid, signal);
				const command = await procfs.command(pid, signal);
				const started = launched || runId === observations.run.runId || await startedByAncestor(observations, row.parent_pid, signal);
				return samplingObservation({
					command: command.value,
					started
				}, command.diagnostics);
			});
			assertProcessOwnershipInspectionActive(signal);
			if (observed === undefined && !launched) return;
			observations.record({
				pid,
				parent_pid: observed?.row.parent_pid ?? process.pid,
				command: ellipsisExcerpt(observed?.details.command ?? "", COMMAND_TEXT_LIMIT),
				first_seen_ms: at,
				last_seen_ms: at,
				alive: running(observed?.row),
				started: observed?.details.started ?? launched,
				startTime: observed?.row.startTime
			});
		};
		sampleProcesses = async (observations, signal) => {
			for (const pid of observations.liveProcessIds()) {
				const entry = observations.tracked(pid);
				if (entry === undefined) continue;
				const { value: stat } = await observations.procfs.stat(pid, signal);
				if (!running(stat) || stat.startTime !== entry.startTime) {
					entry.alive = false;
					continue;
				}
				entry.last_seen_ms = observations.now();
				for (const child of await observations.procfs.children(pid, signal)) await trackProcess(observations, child, signal);
			}
		};
		sampleTokenCarriers = async (observations, signal) => {
			const carriers = await observations.procfs.tokenCarriers(observations.run.runId, signal);
			if (carriers === undefined) return false;
			for (const pid of carriers) await trackProcess(observations, pid, signal);
			return true;
		};
		sampleOpenFiles = async (observations, roots, signal) => {
			if (roots.length === 0) return;
			for (const pid of observations.liveProcessIds()) {
				const readStat = () => observations.procfs.stat(pid, signal);
				const initial = await readStat();
				assertProcessOwnershipInspectionActive(signal);
				if (!running(initial.value) || initial.value.startTime !== observations.tracked(pid)?.startTime) continue;
				const { value: observed } = await readStableLinuxProcessDetails(initial, readStat, () => readLinuxOpenFiles(pid, signal));
				assertProcessOwnershipInspectionActive(signal);
				if (observed === undefined) continue;
				for (const path of observed.details) {
					if (isWithinAny(path, roots) && !observations.openedFiles.has(path)) observations.openedFiles.set(path, observations.now());
				}
			}
		};
		recordWindows = async (observations, windows, signal) => {
			let application = 0;
			const at = observations.now();
			for (const window of windows) {
				const nameMatches = matchesWindowNames(window, observations.matching.names);
				let belongs = nameMatches;
				if (window.pid !== null && observations.matching.byPid) {
					if (nameMatches) {
						await trackProcess(observations, window.pid, signal);
					} else {
						const known = observations.tracked(window.pid);
						if (known?.alive === true) {
							const { value: stat } = await observations.procfs.stat(window.pid, signal);
							known.alive = running(stat) && stat.startTime === known.startTime;
							belongs = known.alive;
						}
					}
				}
				const record = observations.windows.get(window.id) ?? {
					id: window.id,
					instance: window.instance,
					class: window.class,
					titles: [],
					pid: window.pid,
					window_type: window.window_type,
					application: false,
					first_seen_ms: at,
					last_seen_ms: at
				};
				observations.windows.set(window.id, record);
				Object.assign(record, {
					instance: window.instance,
					class: window.class,
					pid: window.pid,
					window_type: window.window_type,
					application: record.application || belongs,
					last_seen_ms: at
				});
				if (window.title !== null && record.titles.at(-1) !== window.title) record.titles.push(window.title);
				if (!belongs) continue;
				application += 1;
				if (observations.firstWindowMs === null || record.first_seen_ms < observations.firstWindowMs) observations.firstWindowMs = record.first_seen_ms;
			}
			return application;
		};
		windowMatch = (windows) => {
			const counts = new Map();
			for (const window of windows) if (window.application && window.class !== null && window.instance !== null) {
				const key = JSON.stringify([window.class, window.instance]);
				counts.set(key, (counts.get(key) ?? 0) + 1);
			}
			const [best] = [...counts.entries()].sort((left, right) => right[1] - left[1]);
			if (best === undefined) return null;
			const [class_, instance] = JSON.parse(best[0]);
			return {
				class: class_,
				instance
			};
		};
		observedSession = (observations) => {
			const windows = [...observations.windows.values()];
			return {
				first_window_ms: observations.firstWindowMs,
				window_match: windowMatch(windows),
				processes: observations.processes.map(({ alive: _alive, started, startTime: _startTime, ...entry }) => ({
					...entry,
					started_by_capture: started
				})),
				windows,
				opened_files: [...observations.openedFiles].map(([path, first_seen_ms]) => ({
					path,
					first_seen_ms
				}))
			};
		};
	})))();
}

//#endregion
//#region dist/desktop/DesktopApplicationSession.js
var STDERR_BYTES, TERMINATION_GRACE_MS, runningApplicationWindows, sampleSession, checkpointNow, requestCheckpoint, noStartedProcessLeft, watch, release$1, unreleased, applicationEnvironment, launch, runDesktopSession;
function init_DesktopApplicationSession$1() {
	return (init_DesktopApplicationSession$1 = __esmMin((() => {
		init_ProcessSamplingObservation();
		init_resources();
		init_analysisErrorCore();
		init_ProcessInspectionCancellation();
		init_desktopCapture();
		init_OwnedCommand();
		init_ProcessOwnership();
		init_ProviderProcess();
		init_TokenOwnedTermination();
		init_DesktopSessionObservations();
		init_DesktopApplicationSession();
		STDERR_BYTES = 8 * 1024;
		TERMINATION_GRACE_MS = 5e3;
		runningApplicationWindows = async (windows, names, signal) => {
			const sample = await windows.sample(() => false, signal);
			return sample.state === "listed" ? {
				state: "listed",
				windows: sample.windows.filter((window) => matchesWindowNames(window, names))
			} : sample;
		};
		sampleSession = async (plan, observations, signal) => {
			await sampleProcesses(observations, signal);
			const sample = await plan.windows.sample((window) => observations.belongs(window), signal);
			let applicationWindows;
			if (sample.state === "listed") applicationWindows = await recordWindows(observations, sample.windows, signal);
			else observations.unreadableWindowSamples += 1;
			await sampleOpenFiles(observations, plan.roots, signal);
			if (!observations.announced && observations.firstWindowMs !== null) {
				observations.announced = true;
				await plan.report("The application window is open. Send an empty line or `checkpoint <name>` to record its state, or `stop` to finish.", { kind: "window_open" });
			}
			return applicationWindows;
		};
		checkpointNow = (plan, observations, name, trigger) => plan.checkpoint(name, trigger, observations.now(), {
			openedFiles: new Set(observations.openedFiles.keys()),
			titles: [...observations.windows.values()].filter((window) => window.application).flatMap((window) => window.titles)
		});
		requestCheckpoint = async (plan, observations, name, taken) => {
			const refusal = checkpointNameRefusal(name, taken);
			if (refusal !== undefined) {
				await plan.report(`${refusal} No checkpoint was recorded.`, {
					kind: "checkpoint_refused",
					name: name ?? "",
					reason: refusal
				});
				return;
			}
			const chosen = name ?? `checkpoint-${String(observations.now())}`;
			taken.add(chosen);
			await checkpointNow(plan, observations, chosen, "request");
		};
		noStartedProcessLeft = async (observations, signal) => observations.liveProcessIds(true).length === 0 && await sampleTokenCarriers(observations, signal) && observations.liveProcessIds(true).length === 0;
		watch = async (plan, observations, supervisor, signal) => {
			let quietSamples = 0;
			const taken = new Set();
			for (;;) {
				assertProcessOwnershipInspectionActive(signal);
				if (observations.now() >= plan.maxDurationMs) return "time_limit";
				const request = plan.nextRequest();
				if (request?.kind === "stop") return "stop_requested";
				if (request !== undefined) await requestCheckpoint(plan, observations, request.name, taken);
				const applicationWindows = await sampleSession(plan, observations, signal);
				const quiet = supervisor.observedExit() !== undefined && applicationWindows === 0 && await noStartedProcessLeft(observations, signal);
				quietSamples = quiet ? quietSamples + 1 : 0;
				if (quietSamples >= 2) return "application_exited";
				await waitForProcessOwnershipInspection(plan.pollIntervalMs, signal);
			}
		};
		release$1 = async (spawned, supervisor) => {
			const inspected = await supervisor.retryInspectionCleanup();
			let launchGroupSignalled = false;
			if (inspected.ok) {
				const termination = await terminateTokenOwnedProcesses(spawned.ownership, TERMINATION_GRACE_MS);
				launchGroupSignalled = termination.ok ? termination.value.launchGroupSignalled : termination.error.launchGroupSignalled;
				if (!termination.ok) supervisor.retainInspectionFailure(termination.error.cause);
			}
			if (!launchGroupSignalled && supervisor.observedExit() === undefined) {
				spawned.process.kill("SIGTERM");
				await supervisor.waitForExit(TERMINATION_GRACE_MS);
			}
			let stopped = await supervisor.stop();
			let inspectionCleanup = inspected.ok ? stopped.status === "incomplete" ? stopped.inspectionCleanup : undefined : inspected.error;
			if (stopped.status === "incomplete") {
				stopped = await supervisor.stop();
				if (inspectionCleanup === undefined && stopped.status === "incomplete") inspectionCleanup = stopped.inspectionCleanup;
			}
			return {
				cleanup: stopped.status === "incomplete" ? {
					verified: false,
					reason: stopped.reason
				} : {
					verified: true,
					reason: null
				},
				...inspectionCleanup === undefined ? {} : { inspectionCleanup }
			};
		};
		unreleased = (spawned, supervisor, result) => result.cleanup.verified ? undefined : {
			reason: result.cleanup.reason ?? "cleanup was not verified",
			...result.inspectionCleanup === undefined ? {} : { inspectionCleanup: result.inspectionCleanup },
			leases: [new AnalysisCleanupLease(async () => {
				const stopped = await supervisor.stop();
				if (stopped.status === "incomplete") throw new Error(stopped.reason);
			}, ownedCommandResources(spawned.ownership))]
		};
		applicationEnvironment = (environment) => ({
			...Object.fromEntries(Object.entries(environment).filter(([name]) => !name.startsWith("AGENTENV_"))),
			LIBC_FATAL_STDERR_: "1"
		});
		launch = async (plan, runId, signal) => {
			const argv = plan.envProgramIndex === undefined ? plan.argv : plan.argv.toSpliced(plan.envProgramIndex, 0, `REA_PROCESS_RUN_ID=${runId}`);
			const [command, ...arguments_] = argv;
			const spawned = await spawnOwnedProviderProcess({
				command: command ?? "",
				arguments: arguments_,
				runId,
				expectedCommand: null,
				cwd: plan.workingDirectory,
				hostEnvironment: applicationEnvironment(plan.environment),
				sweepTokenOwnedProcesses: true,
				signal
			});
			const supervisor = new ProviderProcessSupervisor({
				...spawned,
				ownsProcessLifetime: true,
				cleanup: spawned.cleanup ?? (() => cleanupOwnedProcessGroup(spawned.ownership))
			}, {
				maxDiagnosticBytes: {
					stdout: 0,
					stderr: STDERR_BYTES
				},
				diagnosticRetention: "tail"
			});
			return {
				spawned,
				supervisor
			};
		};
		runDesktopSession = async (plan) => {
			const signal = plan.signal ?? new AbortController().signal;
			const runId = randomUUID();
			const startedAt = new Date();
			const startedMs = performance.now();
			const { spawned, supervisor } = await launch(plan, runId, signal);
			const observations = new SessionObservations(startedMs, {
				runId,
				launchPid: spawned.ownership.leaderPid
			}, plan.windowMatching);
			let endReason;
			let releaseResult;
			let released;
			const releaseOnce = () => released ??= release$1(spawned, supervisor);
			try {
				await trackProcess(observations, spawned.ownership.leaderPid, signal);
				endReason = await watch(plan, observations, supervisor, signal);
				if (endReason !== "application_exited") await checkpointNow(plan, observations, endReason === "stop_requested" ? "stop" : "time-limit", "stop");
				releaseResult = await releaseOnce();
				assertProcessOwnershipInspectionActive(signal);
				await checkpointNow(plan, observations, "exit", "exit");
				assertProcessOwnershipInspectionActive(signal);
			} catch (cause) {
				const inspections = samplingInspectionFailures(cause);
				for (const inspection of inspections) supervisor.retainInspectionFailure(inspection);
				const cancelled = cause instanceof AnalysisCancelledError || cause instanceof ArtifactReaderFailure && cause.reason === "cancelled" || isProcessOwnershipInspectionCancellation(cause) || cause instanceof SamplingReadBatchFailure && cause.otherFailures.length === 0 && inspections.length > 0 && inspections.every(isProcessOwnershipInspectionCancellation);
				releaseResult = await releaseOnce();
				if (!cancelled) {
					const left = unreleased(spawned, supervisor, releaseResult);
					if (left === undefined) throw cause;
					throw new DesktopSessionCleanupError(cause, left);
				}
				endReason = "cancelled";
			}
			const snapshot = supervisor.snapshot();
			const exit = supervisor.observedExit();
			const session = {
				started_at: startedAt.toISOString(),
				duration_ms: observations.now(),
				end_reason: endReason,
				launch_pid: spawned.ownership.leaderPid,
				exit: exit === undefined ? null : {
					code: exit.code,
					signal: exit.signal
				},
				...observedSession(observations),
				stderr: snapshot.stderr.text,
				stderr_truncated: snapshot.stderr.bytes < snapshot.stderr.observedBytes,
				cleanup: releaseResult.cleanup
			};
			return {
				session,
				unreleased: unreleased(spawned, supervisor, releaseResult),
				unreadableWindowSamples: observations.unreadableWindowSamples
			};
		};
	})))();
}

//#endregion
//#region dist/desktop/DesktopContentStore.js
var ChangedSinceWalk, DENIED_CODES$1, DesktopContentStore;
function init_DesktopContentStore() {
	return (init_DesktopContentStore = __esmMin((() => {
		init_resources();
		init_budget();
		init_OwnedFileHandle();
		init_OwnedRegularFile();
		init_RegularFile();
		init_readStableFileBytes();
		init_sha256Hex();
		ChangedSinceWalk = class extends Error {};
		DENIED_CODES$1 = new Set([
			"EACCES",
			"EPERM",
			"ENXIO"
		]);
		DesktopContentStore = class {
			#directory;
			#maxFileBytes;
			#stored = new Map();
			#storedSizes = new Set();
			#omissions = [];
			/** Handles whose close failed; kept owned so `close` can retry them. */
			#unclosed = new ArtifactResourceScope();
			/** Every partial file this store created but has not published or removed. */
			#unpublished = new Set();
			#bytes;
			constructor(captureDirectory, maxFileBytes, maxBytes) {
				this.#directory = join(captureDirectory, "content");
				this.#maxFileBytes = maxFileBytes;
				this.#bytes = new Budget(maxBytes);
			}
			/** Create the private content directory; it must not exist yet. */
			async prepare() {
				await mkdir(this.#directory, { mode: 448 });
			}
			get files() {
				return this.#stored.size;
			}
			get bytes() {
				return [...this.#stored.values()].reduce((sum, size) => sum + size, 0);
			}
			get omissions() {
				return this.#omissions;
			}
			/** Where retained content is stored. */
			get directory() {
				return this.#directory;
			}
			/** The existing capture cleanup owner also retains failed inspection resources. */
			get resourceScope() {
				return this.#unclosed;
			}
			/**
			* Retry every handle whose close failed during a read. A handle that fails
			* again stays owned, and the rejection carries its exact cleanup lease.
			*/
			close() {
				return this.#unclosed.retryCleanup();
			}
			/**
			* Remove every file this store wrote, then its content directory. Rejects
			* when the directory holds anything else or a removal fails.
			*/
			async discard() {
				for (const path of this.#unpublished) {
					await rm(path, { force: true });
					this.#unpublished.delete(path);
				}
				for (const sha256 of this.#stored.keys()) {
					await rm(join(this.#directory, sha256), { force: true });
					this.#stored.delete(sha256);
				}
				this.#storedSizes.clear();
				await rmdir(this.#directory).catch((cause) => {
					if (cause.code !== "ENOENT") throw cause;
				});
			}
			/**
			* Copy one regular file if it is still the version the walk recorded and it
			* holds still while read. Content already stored costs no budget; a file
			* larger than the remaining budget is read only when stored content of the
			* same size could make it a duplicate.
			*/
			async retain(path, expected, signal) {
				const read = await this.#read(path, expected, signal);
				if (read.kind === "omitted") {
					this.#omissions.push({
						path,
						reason: read.reason
					});
					return read;
				}
				const stored = await this.retainBytes(read.bytes);
				if (stored.kind === "omitted") this.#omissions.push({
					path,
					reason: stored.reason
				});
				return stored;
			}
			/** Store bytes already read, such as a verified apt key; over the per-file limit or the remaining budget they are omitted. */
			async retainBytes(bytes) {
				const sha256 = sha256Hex(bytes);
				const size = bytes.byteLength;
				if (size > this.#maxFileBytes) return {
					kind: "omitted",
					reason: "too_large"
				};
				if (this.#stored.has(sha256)) return {
					kind: "retained",
					sha256,
					size
				};
				if (!this.#bytes.tryCharge(size)) return {
					kind: "omitted",
					reason: "budget_exhausted"
				};
				try {
					await this.#publish(sha256, bytes);
				} catch (error) {
					this.#bytes.refund(size);
					throw error;
				}
				this.#stored.set(sha256, size);
				this.#storedSizes.add(size);
				return {
					kind: "retained",
					sha256,
					size
				};
			}
			async #publish(sha256, bytes) {
				const target = join(this.#directory, sha256);
				const partial = `${target}.partial`;
				const owner = new OwnedFileHandle(await open(partial, "wx", 384));
				this.#unpublished.add(partial);
				await withOwnedFileHandle(partial, owner, { retainFailedClose: (handle) => {
					this.#unclosed.retain({
						kind: "file-handle",
						resource: partial,
						handle
					});
				} }, (file) => file.writeFile(bytes));
				await rename(partial, target);
				this.#unpublished.delete(partial);
			}
			async #read(path, expected, signal) {
				if (expected.type !== "file") return {
					kind: "omitted",
					reason: "unreadable"
				};
				if (expected.size > this.#maxFileBytes) return {
					kind: "omitted",
					reason: "too_large"
				};
				if (expected.size > this.#bytes.remaining && !this.#storedSizes.has(expected.size)) return {
					kind: "omitted",
					reason: "budget_exhausted"
				};
				const options = {
					symlinks: "reject",
					retainFailedClose: (handle) => {
						this.#unclosed.retain({
							kind: "file-handle",
							resource: path,
							handle
						});
					},
					...signal === undefined ? {} : { signal }
				};
				try {
					const bytes = await withOwnedRegularFile(path, options, async ({ handle }) => {
						const stats = await handle.stat({ bigint: true });
						if (Number(stats.size) !== expected.size || stats.mtimeNs.toString() !== expected.mtime_ns || `${stats.dev.toString()}:${stats.ino.toString()}` !== expected.inode) throw new ChangedSinceWalk();
						return readStableFileBytes(handle, path, this.#maxFileBytes, options);
					});
					return {
						kind: "read",
						bytes
					};
				} catch (cause) {
					const cancellation = regularFileCancellation(cause);
					if (cancellation !== undefined) throw new ArtifactReaderFailure("cancelled", "Desktop content read cancelled", {
						cause: cancellation.reason,
						cancellation
					});
					if (cause instanceof ChangedSinceWalk) return {
						kind: "omitted",
						reason: "changed_since_walk"
					};
					if (cause instanceof RegularFileCleanupFailure) return {
						kind: "omitted",
						reason: "unreadable"
					};
					if (cause instanceof RegularFileChangedError) return {
						kind: "omitted",
						reason: "changed_during_read"
					};
					if (isSelectedRegularFileError(cause)) return {
						kind: "omitted",
						reason: "changed_since_walk"
					};
					if (cause instanceof RegularFileCapacityError) return {
						kind: "omitted",
						reason: "too_large"
					};
					if (cause instanceof NonRegularFileReadError || DENIED_CODES$1.has(cause.code ?? "")) return {
						kind: "omitted",
						reason: "unreadable"
					};
					throw cause;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/desktop/HomeStateWalker.js
var LSTAT_CONCURRENCY, pathState, statPath, listDirectory, walkHomeState;
function init_HomeStateWalker() {
	return (init_HomeStateWalker = __esmMin((() => {
		init_resources();
		init_desktopStateDiff();
		LSTAT_CONCURRENCY = 64;
		pathState = (stats) => ({
			type: stats.isFile() ? "file" : stats.isDirectory() ? "directory" : stats.isSymbolicLink() ? "symlink" : "other",
			size: Number(stats.size),
			mode: Number(stats.mode & 4095n),
			mtime_ns: stats.mtimeNs.toString(),
			inode: `${stats.dev.toString()}:${stats.ino.toString()}`
		});
		statPath = async (path) => {
			try {
				return await lstat(path, { bigint: true });
			} catch (cause) {
				return cause.code === "ENOENT" ? null : undefined;
			}
		};
		listDirectory = async (directory, names, excluded, progress) => {
			const paths = names.map((name) => join(directory.path, name)).filter((path) => !isWithinAny(path, excluded));
			let complete = true;
			for (let offset = 0; offset < paths.length; offset += LSTAT_CONCURRENCY) {
				const batch = paths.slice(offset, offset + LSTAT_CONCURRENCY);
				const stats = await Promise.all(batch.map(statPath));
				for (const [index, stat] of stats.entries()) {
					const path = batch[index];
					if (path === undefined || stat === null) continue;
					if (stat === undefined) {
						progress.unreadablePaths += 1;
						complete = false;
						continue;
					}
					if (progress.entries.size >= progress.maxEntries) {
						progress.truncated = true;
						return false;
					}
					progress.entries.set(path, pathState(stat));
					if (!stat.isDirectory()) continue;
					if (stat.dev === directory.device) progress.pending.push({
						path,
						device: directory.device
					});
					else progress.mountPoints.push(path);
				}
			}
			return complete;
		};
		walkHomeState = async (roots, excluded, maxEntries, signal) => {
			const progress = {
				entries: new Map(),
				pending: [],
				mountPoints: [],
				maxEntries,
				truncated: false,
				unreadablePaths: 0
			};
			const listed = new Set();
			const checkedRoots = new Set();
			let unreadableDirectories = 0;
			for (const root of roots) {
				if (isWithinAny(root, excluded)) continue;
				const stats = await statPath(root);
				if (stats === undefined) {
					progress.unreadablePaths += 1;
					continue;
				}
				if (stats !== null) {
					if (progress.entries.size >= maxEntries) {
						progress.truncated = true;
						continue;
					}
					progress.entries.set(root, pathState(stats));
					if (stats.isDirectory()) progress.pending.push({
						path: root,
						device: stats.dev
					});
				}
				checkedRoots.add(root);
			}
			while (progress.pending.length > 0 && !progress.truncated) {
				assertArtifactReadActive(signal);
				const directory = progress.pending.pop();
				if (directory === undefined) break;
				let names;
				try {
					names = await readdir(directory.path);
				} catch {
					unreadableDirectories += 1;
					continue;
				}
				if (await listDirectory(directory, names, excluded, progress)) listed.add(directory.path);
			}
			return {
				entries: progress.entries,
				listed,
				roots: checkedRoots,
				truncated: progress.truncated,
				unreadableDirectories,
				uncheckedPaths: progress.unreadablePaths + progress.mountPoints.length,
				mountPoints: progress.mountPoints
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/linuxPackages.js
/** Decode each ownership row separately so malformed bytes cannot hide valid siblings. */
function* dpkgOwnershipRows(output) {
	if (typeof output === "string") {
		yield* output.split("\n");
		return;
	}
	for (let start = 0; start < output.length;) {
		const end = output.indexOf(10, start);
		const row = output.subarray(start, end < 0 ? output.length : end);
		yield isStrictUtf8(row) ? row.toString("utf8") : undefined;
		if (end < 0) break;
		start = end + 1;
	}
}
/** Frame apt's `%4i %s` rows and protect the configured status path from line splitting. */
function* policyRows(output, statusFile, sourceIndent) {
	let start = 0;
	while (start < output.length) {
		const end = output.indexOf("\n", start);
		const lineEnd = end < 0 ? output.length : end;
		const line = output.slice(start, lineEnd);
		const prefix = POLICY_PRIORITY.exec(line);
		const padding = prefix?.[1];
		const priority = prefix?.[2];
		if (prefix !== null && padding !== undefined && priority !== undefined && padding.length === sourceIndent + Math.max(0, POLICY_PRIORITY_WIDTH - priority.length)) {
			const sourceStart = start + prefix[0].length;
			const statusEnd = sourceStart + statusFile.length;
			if (output.startsWith(statusFile, sourceStart) && (statusEnd === output.length || output[statusEnd] === "\n")) {
				yield {
					kind: "status",
					source: statusFile
				};
				start = statusEnd + 1;
				continue;
			}
			if (sourceStart < lineEnd) yield {
				kind: "source",
				source: withoutCredentialsIn(output.slice(sourceStart, lineEnd))
			};
		} else {
			yield {
				kind: "line",
				line
			};
		}
		start = lineEnd + 1;
	}
}
var DPKG_STATUS_FORMAT, literalDpkgOwnershipPath, dpkgOwnerName, parseDpkgOwners, ownershipCandidates, parseDpkgStatus, POLICY_VERSION, POLICY_PRIORITY, POLICY_PRIORITY_WIDTH, POLICY_VERSION_SOURCE_INDENT, DEFAULT_DPKG_STATUS_SOURCE, parseAptPolicySources, POLICY_PACKAGE, parseAptPolicyPackageSources, GLOBAL_POLICY_RELEASE, parseAptPolicyOrigins, packageFromPath, isAppImageHeader;
function init_linuxPackages() {
	return (init_linuxPackages = __esmMin((() => {
		init_strictUtf8();
		init_aptRepositories();
		init_debianPackageFile();
		DPKG_STATUS_FORMAT = "${Package}\\t${Version}\\t${Architecture}\\t${db:Status-Status}\\n";
		literalDpkgOwnershipPath = (path) => path.startsWith("/") && !/[\0\n*?[\\]/u.test(path);
		dpkgOwnerName = (owner) => {
			const colon = owner.indexOf(":");
			return colon < 0 ? DEBIAN_PACKAGE_NAME.test(owner) : DEBIAN_PACKAGE_NAME.test(owner.slice(0, colon)) && /^[a-z0-9][a-z0-9-]*$/u.test(owner.slice(colon + 1));
		};
		parseDpkgOwners = (output, paths) => {
			const requested = new Set(paths);
			const matched = new Map();
			let complete = true;
			for (const row of dpkgOwnershipRows(output)) {
				if (row === undefined) {
					complete = false;
					continue;
				}
				if (row === "" || /^(?:local )?diversion /u.test(row)) continue;
				const separator = row.indexOf(": ");
				const path = row.slice(separator + 2);
				const names = row.slice(0, separator).split(", ");
				if (separator < 0 || !path.startsWith("/") || !names.every(dpkgOwnerName)) {
					complete = false;
					continue;
				}
				if (!requested.has(path)) continue;
				const owners = matched.get(path) ?? new Set();
				matched.set(path, owners);
				for (const name of names) owners.add(name);
			}
			const owners = new Map();
			for (const path of requested) {
				const found = matched.get(path);
				if (found !== undefined || complete) owners.set(path, [...found ?? []]);
			}
			return {
				owners,
				complete
			};
		};
		ownershipCandidates = (paths) => [...new Set(paths.flatMap((path) => {
			if (!/^\/(?:usr\/)?(?:bin|sbin|lib(?:32|64|o32|x32)?)\//u.test(path)) return [path];
			return path.startsWith("/usr/") ? [path, path.slice(4)] : [path, `/usr${path}`];
		}))];
		parseDpkgStatus = (output) => {
			const [name, version, architecture, status] = (output.split("\n")[0] ?? "").split("	");
			if (name === undefined || version === undefined || architecture === undefined || status === undefined || name.length === 0) return undefined;
			return {
				name,
				version,
				architecture,
				status
			};
		};
		POLICY_VERSION = /^ (?<marker>\*\*\*| {3}) \S+ -?\d+(?: \(.+ \d+%\))?$/u;
		POLICY_PRIORITY = /^( *)(-?\d+) /u;
		POLICY_PRIORITY_WIDTH = 4;
		POLICY_VERSION_SOURCE_INDENT = 7;
		DEFAULT_DPKG_STATUS_SOURCE = "/var/lib/dpkg/status";
		parseAptPolicySources = (output, statusFile = DEFAULT_DPKG_STATUS_SOURCE) => {
			const sources = [];
			let installed = false;
			for (const row of policyRows(output, statusFile, POLICY_VERSION_SOURCE_INDENT)) {
				if (row.kind === "line") {
					const version = POLICY_VERSION.exec(row.line);
					if (version !== null) installed = version.groups?.marker === "***";
				} else if (row.kind === "source" && installed) {
					sources.push(row.source);
				}
			}
			return sources;
		};
		POLICY_PACKAGE = /^(?<name>\S+):$/u;
		parseAptPolicyPackageSources = (output, statusFile = DEFAULT_DPKG_STATUS_SOURCE) => {
			const packages = new Map();
			let current;
			for (const row of policyRows(output, statusFile, POLICY_VERSION_SOURCE_INDENT)) {
				if (row.kind === "line") {
					const name = POLICY_PACKAGE.exec(row.line)?.groups?.name;
					if (name !== undefined) {
						current = [];
						packages.set(name, current);
					}
				} else if (row.kind === "source" && current && !current.includes(row.source)) {
					current.push(row.source);
				}
			}
			return packages;
		};
		GLOBAL_POLICY_RELEASE = /^ +release (?<fields>.*)$/u;
		parseAptPolicyOrigins = (output, statusFile = DEFAULT_DPKG_STATUS_SOURCE) => {
			const origins = new Map();
			let source;
			for (const row of policyRows(output, statusFile, 0)) {
				if (row.kind !== "line") {
					source = row.source;
					if (!origins.has(source)) origins.set(source, null);
					continue;
				}
				if (row.line.startsWith("Pinned packages:")) break;
				const fields = GLOBAL_POLICY_RELEASE.exec(row.line)?.groups?.fields;
				if (fields === undefined || source === undefined) continue;
				const origin = fields.split(",").find((field) => field.startsWith("o="))?.slice(2);
				if (origin !== undefined && origin.length > 0 && origins.get(source) === null) origins.set(source, origin);
			}
			return origins;
		};
		packageFromPath = (path) => {
			const snap = /^\/snap\/(?<name>[^/]+)\/(?<revision>[^/]+)\//u.exec(path);
			if (snap?.groups?.name !== undefined && snap.groups.name !== "bin") return {
				kind: "snap",
				name: snap.groups.name,
				revision: snap.groups.revision ?? null
			};
			const snapBin = /^\/snap\/bin\/(?<name>[^/.]+)/u.exec(path);
			if (snapBin?.groups?.name !== undefined) return {
				kind: "snap",
				name: snapBin.groups.name,
				revision: null
			};
			const flatpak = /\/flatpak\/(?:app\/(?<app>[^/]+)\/|exports\/bin\/(?<bin>[^/]+)$)/u.exec(path);
			const flatpakName = flatpak?.groups?.app ?? flatpak?.groups?.bin;
			if (flatpakName !== undefined) return {
				kind: "flatpak",
				name: flatpakName
			};
			if (/\.appimage$/iu.test(path)) return { kind: "appimage" };
			return undefined;
		};
		isAppImageHeader = (header) => header.length >= 11 && header[0] === 127 && header[1] === 69 && header[2] === 76 && header[3] === 70 && header[8] === 65 && header[9] === 73 && (header[10] === 1 || header[10] === 2);
	})))();
}

//#endregion
//#region dist/desktop/XdgBase.js
var xdgBase;
function init_XdgBase() {
	return (init_XdgBase = __esmMin((() => {
		xdgBase = (value, fallback) => value !== undefined && isAbsolute(value) ? value : typeof fallback === "function" ? fallback() : fallback;
	})))();
}

//#endregion
//#region dist/desktop/ApplicationStateDirectories.js
var stateNames, appNamedDotfile, recasedEntries, stateDirectories;
function init_ApplicationStateDirectories() {
	return (init_ApplicationStateDirectories = __esmMin((() => {
		init_callerPath();
		init_XdgBase();
		init_errorMessage();
		stateNames = (package_, executable, entry) => [
			package_.kind === "deb" ? package_.name?.split(":")[0] ?? null : package_.name,
			executable === null ? null : basename(executable),
			entry?.id ?? null,
			entry?.id?.split(".").at(-1) ?? null,
			entry?.startup_wm_class ?? null,
			entry?.name ?? null
		];
		appNamedDotfile = (entry, names) => [...names].some((name) => {
			if (name.length < 3 || !entry.startsWith(`.${name}`)) return false;
			const rest = entry.slice(name.length + 1);
			return rest === "rc" || /^[-._]./u.test(rest);
		});
		recasedEntries = async (folder, prefix, names) => (await readdir(folder).catch(() => [])).filter((entry) => entry.startsWith(prefix) && names.has(entry.slice(prefix.length).toLowerCase())).map((entry) => appendCallerPath(folder, entry));
		stateDirectories = async (names, { environment, home }, extra) => {
			const homeChild = (path) => home === undefined ? undefined : appendCallerPath(home, path);
			const config = xdgBase(environment.XDG_CONFIG_HOME, homeChild(".config"));
			const bases = [
				config,
				xdgBase(environment.XDG_DATA_HOME, homeChild(".local/share")),
				xdgBase(environment.XDG_STATE_HOME, homeChild(".local/state")),
				xdgBase(environment.XDG_CACHE_HOME, homeChild(".cache"))
			].filter((base) => base !== undefined);
			const variants = new Set(names.filter((name) => name !== null && /^[^/\0]+$/u.test(name) && name !== "." && name !== "..").flatMap((name) => [name, name.toLowerCase()]));
			const lowered = new Set([...variants].map((name) => name.toLowerCase()));
			const dotfiles = home === undefined ? [] : (await readdir(home).catch(() => [])).filter((entry) => appNamedDotfile(entry, variants)).map((entry) => appendCallerPath(home, entry));
			const recased = await Promise.all([...bases.map((base) => recasedEntries(base, "", lowered)), ...home === undefined ? [] : [recasedEntries(home, ".", lowered)]]);
			const paths = new Set([
				...[...variants].flatMap((name) => [
					...bases.map((base) => appendCallerPath(base, name)),
					...home === undefined ? [] : [appendCallerPath(home, `.${name}`)],
					...config === undefined || name.length < 3 ? [] : [appendCallerPath(config, `${name}rc`)]
				]),
				...recased.flat(),
				...dotfiles,
				...extra
			]);
			return Promise.all([...paths].map(async (path) => {
				try {
					await lstat(path);
					return {
						path,
						exists_at_start: true
					};
				} catch (cause) {
					const code = cause.code;
					return code === "ENOENT" || code === "ENOTDIR" ? {
						path,
						exists_at_start: false
					} : {
						path,
						exists_at_start: null,
						existence_error: errorMessage(cause)
					};
				}
			}));
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/openPgpKeys.js
var PUBLIC_KEY_TAG, packetHeader, fingerprintOf, transferablePublicKeys, verifyingKey;
function init_openPgpKeys() {
	return (init_openPgpKeys = __esmMin((() => {
		init_result();
		init_aptRepositories();
		PUBLIC_KEY_TAG = 6;
		packetHeader = (bytes, at) => {
			const first = bytes[at] ?? 0;
			if ((first & 128) === 0) return undefined;
			if ((first & 64) === 0) {
				const width = [
					1,
					2,
					4
				][first & 3];
				if (width === undefined || at + 1 + width > bytes.length) return undefined;
				return {
					tag: first >> 2 & 15,
					header: 1 + width,
					body: bytes.readUIntBE(at + 1, width)
				};
			}
			const tag = first & 63;
			const length = bytes[at + 1];
			if (length === undefined) return undefined;
			if (length < 192) return {
				tag,
				header: 2,
				body: length
			};
			if (length < 224) {
				const next = bytes[at + 2];
				return next === undefined ? undefined : {
					tag,
					header: 3,
					body: (length - 192 << 8) + next + 192
				};
			}
			if (length !== 255 || at + 6 > bytes.length) return undefined;
			return {
				tag,
				header: 6,
				body: bytes.readUInt32BE(at + 2)
			};
		};
		fingerprintOf = (body) => {
			const version = body[0];
			if (version === 4 && body.length <= 65535) {
				const prefix = Buffer.from([
					153,
					body.length >> 8,
					body.length & 255
				]);
				return createHash("sha1").update(prefix).update(body).digest("hex").toUpperCase();
			}
			if (version !== 5 && version !== 6) return undefined;
			const prefix = Buffer.alloc(5);
			prefix[0] = version === 5 ? 154 : 155;
			prefix.writeUInt32BE(body.length, 1);
			return createHash("sha256").update(prefix).update(body).digest("hex").toUpperCase();
		};
		transferablePublicKeys = (keyring) => {
			const starts = [];
			for (let at = 0; at < keyring.length;) {
				const packet = packetHeader(keyring, at);
				const end = packet === undefined ? Infinity : at + packet.header + packet.body;
				if (packet === undefined || end > keyring.length) return undefined;
				if (packet.tag === PUBLIC_KEY_TAG) starts.push({
					at,
					fingerprint: fingerprintOf(keyring.subarray(at + packet.header, end))
				});
				else if (starts.length === 0) return undefined;
				at = end;
			}
			return starts.map(({ at, fingerprint }, index) => ({
				bytes: keyring.subarray(at, starts[index + 1]?.at ?? keyring.length),
				fingerprint
			}));
		};
		verifyingKey = (file, primaryFingerprint) => {
			const armored = isArmoredKey(file);
			const keyring = armored ? dearmorPublicKeys(file) : file;
			const keys = keyring === undefined ? undefined : transferablePublicKeys(keyring);
			if (keys === undefined) return err("REA could not split the key file into OpenPGP keys");
			if (keys.length === 1) return ok({
				bytes: file,
				format: armored ? "armored" : "binary"
			});
			const matching = keys.filter((each) => each.fingerprint === primaryFingerprint);
			return matching.length === 0 ? err(`the key file holds ${String(keys.length)} keys and REA found none with the verifying fingerprint ${primaryFingerprint}`) : ok({
				bytes: Buffer.concat(matching.map((key) => key.bytes)),
				format: "binary"
			});
		};
	})))();
}

//#endregion
//#region dist/desktop/HostFileRead.js
var DENIED_CODES, isRefusedRead, hostReadFailure, readHostFile, UNREACHABLE_CODES, probeHostFile, hostFileKind;
function init_HostFileRead() {
	return (init_HostFileRead = __esmMin((() => {
		init_resources();
		init_OwnedRegularFile();
		init_RegularFile();
		init_readStableFileBytes();
		DENIED_CODES = new Set(["EACCES", "EPERM"]);
		isRefusedRead = (cause) => cause instanceof RegularFileCapacityError || cause instanceof RegularFileChangedError || cause instanceof NonRegularFileReadError || isSelectedRegularFileError(cause) || DENIED_CODES.has(cause.code ?? "");
		hostReadFailure = (cause, cancellationFailure) => {
			if (cause instanceof RegularFileCleanupFailure) return new ArtifactFileCleanupFailure(cause, new AnalysisCleanupLease(() => cause.owner.close(), [cause.path]));
			const cancellation = regularFileCancellation(cause);
			if (cancellation !== undefined && cancellationFailure !== undefined) return cancellationFailure(cancellation.reason);
			if (cause instanceof RegularFileCancelled) return new ArtifactFileCancelled(cause);
			return artifactOperationCause(cause);
		};
		readHostFile = async (path, maximumBytes, signal, preserveCapacity = false, cancellationFailure) => {
			const options = {
				symlinks: "follow",
				...signal === undefined ? {} : { signal }
			};
			try {
				return await withOwnedRegularFile(path, options, ({ handle }) => readStableFileBytes(handle, path, maximumBytes, options));
			} catch (cause) {
				const failure = hostReadFailure(cause, cancellationFailure);
				if (failure !== cause) throw failure;
				if (preserveCapacity && cause instanceof RegularFileCapacityError) throw cause;
				if (cancellationFailure !== undefined && signal?.aborted === true) throw cause;
				if (!isRefusedRead(cause)) throw cause;
				return cause.code === "ENOENT" ? "missing" : "unreadable";
			}
		};
		UNREACHABLE_CODES = new Set(["EACCES"]);
		probeHostFile = async (path) => {
			try {
				return {
					kind: "file",
					isFile: (await stat(path)).isFile()
				};
			} catch (cause) {
				const code = cause.code ?? "";
				return code === "ENOENT" || code === "ENOTDIR" ? {
					kind: "file",
					isFile: false
				} : {
					kind: "unknown",
					unreachable: UNREACHABLE_CODES.has(code)
				};
			}
		};
		hostFileKind = async (path) => {
			const probe = await probeHostFile(path);
			return probe.kind === "file" ? probe.isFile : null;
		};
	})))();
}

//#endregion
//#region dist/desktop/GpgvKeyCheck.js
var FILE_MAX_BYTES$1, released, GpgvKeyCheck, withGpgvKeyCheck;
function init_GpgvKeyCheck() {
	return (init_GpgvKeyCheck = __esmMin((() => {
		init_resources();
		init_aptRepositories();
		init_openPgpKeys();
		init_PrivateRuntimeRoot();
		init_HostFileRead();
		init_sha256Hex();
		FILE_MAX_BYTES$1 = 1024 * 1024;
		released = (release) => release[0] ?? "its release file";
		GpgvKeyCheck = class {
			runQuery;
			signal;
			#root;
			#keyrings = 0;
			#reads = new Map();
			constructor(runQuery, signal) {
				this.runQuery = runQuery;
				this.signal = signal;
			}
			/** The private folder, once a keyring was written into it. */
			get root() {
				return this.#root;
			}
			async #read(path) {
				const read = this.#reads.get(path) ?? await readHostFile(path, FILE_MAX_BYTES$1, this.signal);
				this.#reads.set(path, read);
				return read;
			}
			/** The first candidate key that verifies the release, or why none did. */
			async firstVerifying(candidates, release) {
				const unreadable = [];
				for (const path of candidates) {
					const bytes = await this.#read(path);
					if (bytes === "unreadable") unreadable.push(path);
					if (typeof bytes === "string") continue;
					const verified = await this.#verifying({
						path,
						bytes
					}, release);
					if (verified !== undefined) return verified;
				}
				return { reason: `no candidate key (${candidates.join(", ")}) verifies ${released(release)}${unreadable.length === 0 ? "" : `; unreadable: ${unreadable.join(", ")}`}` };
			}
			/** The key a sources entry holds when it verifies the release, or why not. */
			async heldVerifying(key, release) {
				return await this.#verifying(key, release) ?? { reason: `the key the Signed-By field of ${key.path} holds does not verify ${released(release)}` };
			}
			/** The key with the bytes to retain when it verifies the release, why it cannot count, or undefined when it does not verify. */
			async #verifying(key, release) {
				const signature = await this.#verify(key.bytes, release);
				if (signature === "missing") return { reason: "gpgv is not installed, so no key could be checked against the repository's signature" };
				if (signature === undefined) return undefined;
				const kept = verifyingKey(key.bytes, signature.primary);
				if (!kept.ok) return { reason: `${key.path} verifies ${released(release)}, but ${kept.error}` };
				return {
					path: key.path,
					...kept.value,
					sha256: sha256Hex(kept.value.bytes),
					fingerprint: signature.primary
				};
			}
			/** The good signature gpgv reports with the key, whatever its exit status; `missing` without gpgv. */
			async #verify(key, release) {
				const keyring = isArmoredKey(key) ? dearmorPublicKeys(key) : key;
				if (keyring === undefined) return undefined;
				this.#root ??= await PrivateRuntimeRoot.create({ prefix: "rea-apt-keys-" });
				const path = join(this.#root.path, `keyring-${String(this.#keyrings)}.gpg`);
				this.#keyrings += 1;
				await writeFile(path, keyring, {
					mode: 384,
					flag: "wx"
				});
				const outcome = await this.runQuery("gpgv", [
					"--homedir",
					this.#root.path,
					"--status-fd",
					"1",
					"--keyring",
					path,
					...release
				], this.signal);
				if (outcome === "missing") return "missing";
				return typeof outcome === "object" ? validSignature(outcome.stdout) : undefined;
			}
		};
		withGpgvKeyCheck = async (runQuery, signal, use) => {
			const check = new GpgvKeyCheck(runQuery, signal);
			let outcome;
			try {
				outcome = {
					kind: "completed",
					value: await use(check)
				};
			} catch (cause) {
				outcome = {
					kind: "failed",
					cause
				};
			}
			const root = check.root;
			if (root !== undefined) {
				const resources = new ArtifactResourceScope();
				const removed = await resources.release({
					kind: "private-runtime-root",
					resource: root.path,
					root
				});
				if (removed.kind === "failed") throw resources.cleanupFailure(outcome, [removed]);
			}
			if (outcome.kind === "failed") throw outcome.cause;
			assertArtifactReadActive(signal);
			return outcome.value;
		};
	})))();
}

//#endregion
//#region dist/desktop/HostQuery.js
var COMMAND_TIMEOUT_MS, COMMAND_MAX_BUFFER, runHostQuery, succeeded, queryUtf8Text;
function init_HostQuery() {
	return (init_HostQuery = __esmMin((() => {
		init_strictUtf8();
		init_resources();
		init_ExecFileOutput();
		COMMAND_TIMEOUT_MS = 3e4;
		COMMAND_MAX_BUFFER = 4 * 1024 * 1024;
		runHostQuery = async (command, arguments_, signal, options) => {
			try {
				const { stdout } = await execFileBytes(command, arguments_, {
					timeout: COMMAND_TIMEOUT_MS,
					maxBuffer: COMMAND_MAX_BUFFER,
					...options?.locale === undefined ? {} : { env: {
						...process.env,
						LC_ALL: options.locale
					} },
					...options?.preserveStdoutBytes ? { preserveFailedStdout: true } : {},
					...signal === undefined ? {} : { signal }
				});
				return {
					stdout: stdout.toString("utf8"),
					...options?.preserveStdoutBytes === true ? { stdoutBuffer: stdout } : {},
					exitCode: 0
				};
			} catch (cause) {
				if (cause instanceof ExecFileOutputCancelledError) throw new ArtifactReaderFailure("cancelled", "Host query cancelled", {
					cause: cause.cause,
					cancellation: { reason: cause.cause }
				});
				const failure = execFileOutputFailure(cause);
				if (failure?.code === "ENOENT") return "missing";
				return typeof failure?.code === "number" && !failure.killed && !failure.outputTruncated ? {
					stdout: failure.stdout,
					...failure.stdoutBuffer === undefined ? {} : { stdoutBuffer: failure.stdoutBuffer },
					exitCode: failure.code
				} : "failed";
			}
		};
		succeeded = (outcome) => typeof outcome === "object" && outcome.exitCode === 0 ? outcome.stdout : undefined;
		queryUtf8Text = async (runQuery, command, args, signal) => {
			const outcome = await runQuery(command, args, signal, { preserveStdoutBytes: true });
			if (outcome === "missing") return { kind: "missing" };
			if (typeof outcome !== "object" || outcome.exitCode !== 0) return { kind: "unavailable" };
			if (outcome.stdoutBuffer !== undefined && !isStrictUtf8(outcome.stdoutBuffer)) return { kind: "undecodable" };
			return {
				kind: "read",
				text: outcome.stdoutBuffer?.toString("utf8") ?? outcome.stdout
			};
		};
	})))();
}

//#endregion
//#region dist/desktop/AptRepositoryInventory.js
var APT_LOCATIONS, resolveAptLocations, FILE_MAX_BYTES, MAX_CANDIDATE_KEYS, UBUNTU_PRO, indexTargets, sourcesFiles, fileNames, candidateKeys, signedRelease, keyCheck, repositoryBase, repositoryFacts, inspectAptRepositories;
function init_AptRepositoryInventory() {
	return (init_AptRepositoryInventory = __esmMin((() => {
		init_aptRepositories();
		init_linuxPackages();
		init_strictUtf8();
		init_GpgvKeyCheck();
		init_HostFileRead();
		init_HostQuery();
		APT_LOCATIONS = {
			trustedParts: "/etc/apt/trusted.gpg.d",
			trusted: "/etc/apt/trusted.gpg",
			lists: "/var/lib/apt/lists",
			status: DEFAULT_DPKG_STATUS_SOURCE
		};
		resolveAptLocations = async (runQuery, signal, fallback = APT_LOCATIONS) => {
			const output = await queryUtf8Text(runQuery, "apt-config", [
				"shell",
				"LISTS",
				"Dir::State::Lists/d",
				"PARTS",
				"Dir::Etc::TrustedParts/d",
				"TRUSTED",
				"Dir::Etc::Trusted/f",
				"STATUS",
				"Dir::State::status/f",
				"ARCH",
				"APT::Architecture"
			], signal);
			const values = parseAptConfigShell(output.kind === "read" ? output.text : "");
			const architecture = values.get("ARCH");
			const value = (name) => {
				const found = values.get(name);
				return found?.startsWith("/") === true ? found : undefined;
			};
			return {
				lists: value("LISTS") ?? fallback.lists,
				trustedParts: value("PARTS") ?? fallback.trustedParts,
				trusted: value("TRUSTED") ?? fallback.trusted,
				status: value("STATUS") ?? fallback.status ?? "/var/lib/dpkg/status",
				...architecture !== undefined && /^[a-z0-9][a-z0-9_-]*$/u.test(architecture) ? { configuredArchitecture: architecture } : {}
			};
		};
		FILE_MAX_BYTES = 1024 * 1024;
		MAX_CANDIDATE_KEYS = 64;
		UBUNTU_PRO = "not checked: it is an Ubuntu Pro (ESM) repository, which apt reaches only with the host's Ubuntu Pro credentials, and the computer has none";
		indexTargets = async (runQuery, signal, configuredArchitecture) => {
			const query = await runQuery("apt-get", ["indextargets", "Created-By: Packages"], signal, { preserveStdoutBytes: true });
			if (typeof query !== "object" || query.exitCode !== 0) return undefined;
			const output = query.stdoutBuffer ?? query.stdout;
			const targets = new Map();
			for (const target of parseAptIndexTargets(output, configuredArchitecture)) if (!targets.has(target.description)) targets.set(target.description, target);
			return {
				entries: targets,
				incomplete: typeof output !== "string" && !isStrictUtf8(output)
			};
		};
		sourcesFiles = (signal) => {
			const parsed = new Map();
			const unreadable = [];
			const incomplete = [];
			const read = async (file) => {
				const cached = parsed.get(file);
				if (cached !== undefined) return cached;
				const bytes = await readHostFile(file, FILE_MAX_BYTES, signal);
				if (bytes === "unreadable") unreadable.push(file);
				if (typeof bytes !== "string" && !isStrictUtf8(bytes)) incomplete.push(file);
				const stanzas = typeof bytes === "string" ? [] : (file.endsWith(".sources") ? parseDeb822Sources : parseOneLineSources)(bytes, file);
				parsed.set(file, stanzas);
				return stanzas;
			};
			return {
				read,
				unreadable,
				incomplete
			};
		};
		fileNames = async (directory) => (await readdir(directory).catch(() => [])).sort();
		candidateKeys = async (entry, apt) => {
			if (entry.signedBy.length > 0) return entry.signedBy;
			return [...(await fileNames(apt.trustedParts)).filter((name) => name.endsWith(".gpg") || name.endsWith(".asc")).map((name) => join(apt.trustedParts, name)), apt.trusted];
		};
		signedRelease = async (target) => {
			const prefix = join(dirname(target.filename), aptListFileName(target.baseUri));
			const inRelease = await hostFileKind(`${prefix}InRelease`);
			if (inRelease) return [`${prefix}InRelease`];
			const noSignedRelease = () => inRelease === false ? undefined : null;
			const signed = await hostFileKind(`${prefix}Release.gpg`);
			if (!signed && signed !== null) return noSignedRelease();
			const release = await hostFileKind(`${prefix}Release`);
			if (release === false) return noSignedRelease();
			if (signed === null || release === null) return null;
			return [`${prefix}Release.gpg`, `${prefix}Release`];
		};
		keyCheck = async (target, entry, context) => {
			if (target === undefined) return { reason: context.targets === undefined ? "apt-get indextargets did not list apt's indexes" : context.targets.incomplete ? "apt-get indextargets contained unreadable UTF-8 and did not establish an index for this source" : "apt-get indextargets lists no index with this source" };
			if (entry === undefined) return { reason: `no sources entry at ${target.sourcesFile}:${String(target.position)} configures it` };
			const selectors = entry.signedBy.filter((value) => !value.startsWith("/"));
			if (selectors.length > 0) return { reason: `Signed-By selectors ${selectors.map((value) => JSON.stringify(value)).join(", ")} are not supported; REA cannot verify this repository's fingerprint restrictions, so no signing key is retained` };
			const release = await signedRelease(target);
			if (release === null) return { reason: `apt's release files for it in ${dirname(target.filename)} could not be checked` };
			if (release === undefined) return { reason: `apt holds no signed release file for it in ${dirname(target.filename)}` };
			if (entry.inlineKey !== null) return {
				release,
				candidates: {
					path: entry.file,
					bytes: Buffer.from(entry.inlineKey)
				}
			};
			const candidates = await candidateKeys(entry, context.apt);
			return candidates.length > MAX_CANDIDATE_KEYS ? { reason: `more than ${String(MAX_CANDIDATE_KEYS)} candidate keys` } : {
				release,
				candidates
			};
		};
		repositoryBase = (source, target, entry) => ({
			source,
			sources_file: entry?.file ?? null,
			uri: target?.repoUriCredentialsRemoved === true && entry?.credentials !== true ? null : entry?.uri ?? null,
			...target === undefined ? {} : { repo_uri: target.repoUri },
			uri_credentials_removed: entry?.credentials === true || target?.repoUriCredentialsRemoved === true,
			suite: entry?.suite ?? null,
			...target === undefined || entry === undefined || entry.suite === aptIndexSourceSuite(target) ? {} : { repo_suite: aptIndexSourceSuite(target) },
			components: [...entry?.components ?? []],
			...entry?.repoComponents === undefined ? {} : { repo_components: [...entry.repoComponents] },
			architectures: [...entry?.architectures ?? []],
			release: target?.suite ?? target?.codename ?? null
		});
		repositoryFacts = async (vendor, context) => {
			const target = context.targets?.entries.get(vendor.source);
			const entry = target === undefined ? undefined : entryForTarget(target, await context.sources(target.sourcesFile));
			const base = repositoryBase(vendor.source, target, entry);
			const unverified = (reason) => ({
				repository: {
					...base,
					signing_key: null,
					signing_key_reason: reason
				},
				key: undefined
			});
			const origin = vendor.origin ?? target?.origin ?? null;
			if (isUbuntuProRepository(origin, base.repo_uri ?? base.uri)) return unverified(UBUNTU_PRO);
			const check = await keyCheck(target, entry, context);
			if ("reason" in check) return unverified(check.reason);
			const verified = await context.verify(check.candidates, check.release);
			if ("reason" in verified) return unverified(verified.reason);
			const { path, sha256, format, fingerprint } = verified;
			return {
				repository: {
					...base,
					signing_key: {
						path,
						sha256,
						format,
						fingerprint
					}
				},
				key: verified
			};
		};
		inspectAptRepositories = async (installed, host, signal) => {
			const vendor = installed.sources.flatMap((source, index) => {
				const origin = installed.origins?.[index] ?? null;
				return origin === "Ubuntu" ? [] : [{
					source,
					origin
				}];
			});
			if (vendor.length === 0) return {
				repositories: [],
				keys: new Map(),
				indexTargets: new Map(),
				limitations: []
			};
			const targets = await indexTargets(host.runQuery, signal, host.apt.configuredArchitecture);
			const files = sourcesFiles(signal);
			return withGpgvKeyCheck(host.runQuery, signal, async (check) => {
				const context = {
					apt: host.apt,
					targets,
					sources: files.read,
					verify: (candidates, release) => "bytes" in candidates ? check.heldVerifying(candidates, release) : check.firstVerifying(candidates, release)
				};
				const keys = new Map();
				const repositories = [];
				for (const source of vendor) {
					const facts = await repositoryFacts(source, context);
					repositories.push(facts.repository);
					if (facts.key !== undefined) keys.set(facts.key.sha256, facts.key.bytes);
				}
				return {
					repositories,
					keys,
					indexTargets: targets?.entries ?? new Map(),
					limitations: [
						...files.unreadable.map((file) => `The apt sources file ${file} could not be read, so repositories it lists are not matched.`),
						...files.incomplete.map((file) => `The apt sources file ${file} contains unreadable UTF-8. Any affected source entries were withheld.`),
						...targets?.incomplete !== true ? [] : ["apt-get indextargets contained unreadable UTF-8. Any affected index paragraphs were withheld."]
					]
				};
			});
		};
	})))();
}

//#endregion
//#region dist/desktop/DebianPackageFile.js
var hashPackageFile, inspectPackageFile;
function init_DebianPackageFile() {
	return (init_DebianPackageFile = __esmMin((() => {
		init_resources();
		init_debianPackageFile();
		init_OwnedRegularFile();
		init_RegularFile();
		init_StableFileHash();
		init_HostFileRead();
		init_HostQuery();
		init_errorMessage();
		hashPackageFile = async (path, signal) => {
			let lease;
			try {
				return await observeStableFile(path, {
					...signal === undefined ? {} : { signal },
					retainFailedClose: (owner) => {
						lease = new AnalysisCleanupLease(() => owner.close(), [path]);
					}
				});
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure && lease !== undefined) throw new ArtifactFileCleanupFailure(cause, lease);
				const failure = hostReadFailure(cause);
				if (failure !== cause) throw failure;
				const read = stableFileHashCause(cause);
				if (!(cause instanceof StableFileHashFailure) || !isRefusedRead(read)) throw cause;
				return `${path} could not be read: ${errorMessage(read)}`;
			}
		};
		inspectPackageFile = async (path, installed, runQuery, signal) => {
			const refused = (reason) => ({ package_file_reason: reason });
			if (installed.kind !== "deb" || installed.version === null || installed.architecture === null) return refused(`dpkg reports no installed version of the application (${installed.kind}${installed.name === null ? "" : ` ${installed.name}`}), so ${path} was not matched against it`);
			const regularFile = await hostFileKind(path);
			if (regularFile === null) return refused(`${path} could not be checked, so it was not read as a file`);
			if (!regularFile) return refused(`${path} is not a regular file`);
			const before = await stat(path).catch(() => undefined);
			if (before === undefined) return refused(`${path} could not be read`);
			const outcome = await queryUtf8Text(runQuery, "dpkg-deb", [
				"--field",
				path,
				...PACKAGE_FILE_FIELDS
			], signal);
			if (outcome.kind === "missing") return refused(`dpkg-deb is not installed, so the control fields of ${path} were not read`);
			if (outcome.kind === "undecodable") return refused(`dpkg-deb returned invalid UTF-8 in the control fields of ${path}`);
			if (outcome.kind !== "read") return refused(`dpkg-deb could not read ${path} as a Debian package`);
			const fields = parseDpkgDebFields(outcome.text);
			if (fields === undefined) return refused(`dpkg-deb did not report the Package, Version and Architecture of ${path}`);
			const mismatch = packageFileMismatch(fields, installed);
			if (mismatch !== undefined) return refused(`${path} ${mismatch}`);
			const hashed = await hashPackageFile(path, signal);
			if (typeof hashed === "string") return refused(hashed);
			if (!sameRegularFileState(hashed.state, before)) return refused(`${path} changed while it was read, so its control fields and its hash could describe different files`);
			return { package_file: {
				name: basename(path),
				sha256: hashed.sha256,
				size: hashed.bytes,
				...fields
			} };
		};
	})))();
}

//#endregion
//#region dist/desktop/DpkgOwnershipQuery.js
var queryDpkgOwnership;
function init_DpkgOwnershipQuery() {
	return (init_DpkgOwnershipQuery = __esmMin((() => {
		init_linuxPackages();
		queryDpkgOwnership = async (runQuery, paths, signal) => {
			const outcome = await runQuery("dpkg-query", ["-S", ...paths], signal, {
				preserveStdoutBytes: true,
				locale: "C.UTF-8"
			});
			if (typeof outcome === "string") return { kind: outcome };
			if (outcome.exitCode !== 0 && outcome.exitCode !== 1) return { kind: "unavailable" };
			return {
				kind: "read",
				...parseDpkgOwners(outcome.stdoutBuffer ?? outcome.stdout, paths)
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/elfDependencies.js
var elfLibraryIdentityMatches, PT_LOAD, PT_DYNAMIC, DEPENDENCY_SINGLETONS, readBoundedExtent, programHeaders, dynamicTags, dynamicStrings, directories, readElfDependencies, readDependencyTables;
function init_elfDependencies() {
	return (init_elfDependencies = __esmMin((() => {
		init_libraryPolicy();
		init_elfDynamicEntry();
		init_elfFixedHeader();
		init_elfProgramHeader();
		init_elfRawTableDeclarations();
		init_elfStringTable();
		init_keyedCollection();
		init_result();
		init_strictUtf8();
		init_virtualFileMapping();
		elfLibraryIdentityMatches = (expected, observed) => expected.machine === observed.machine && expected.bits === observed.bits && expected.byte_order === observed.byte_order;
		PT_LOAD = 1;
		PT_DYNAMIC = 2;
		DEPENDENCY_SINGLETONS = new Set([
			DT_STRTAB,
			DT_STRSZ,
			DT_RPATH,
			DT_RUNPATH
		]);
		readBoundedExtent = async (read, { offset, length, fileSize }, label, tablePolicy) => {
			if (offset + length > BigInt(fileSize)) return err(`${label} is truncated`);
			if (tablePolicy !== undefined && length > BigInt(tablePolicy.table_bytes)) return err(desktopLibraryLimit(tablePolicy, "table_bytes", label));
			const bytes = await read(Number(offset), Number(length));
			return bytes.byteLength === Number(length) ? ok(Buffer.from(bytes)) : err(`${label} is truncated`);
		};
		programHeaders = async (read, header, size, { bits, byte_order: byteOrder }, policy) => {
			const little = byteOrder === "little";
			const declaration = readElfRawTableDeclarations(header, {
				elfClass: bits,
				byteOrder
			});
			if (!declaration.ok) return err(declaration.error.message);
			const { offset, width: entrySize, count } = declaration.value.programs;
			if (entrySize < elfProgramHeaderWidth(bits) || count === 65535) return err("unsupported ELF program header table");
			const table = await readBoundedExtent(read, {
				offset,
				length: BigInt(entrySize * count),
				fileSize: size
			}, "ELF program header table", policy);
			if (!table.ok) return table;
			const headers = [];
			for (let index = 0; index < count; index += 1) {
				const parsed = readElfProgramHeader(table.value.subarray(index * entrySize, (index + 1) * entrySize), bits, little);
				if (!parsed.ok) return err(parsed.error.message);
				if (parsed.value.type === PT_LOAD) {
					const admitted = admitElfLoadSegment(parsed.value, bits);
					if (!admitted.ok) return err(admitted.error.message);
					if (parsed.value.fileSize > 0n && parsed.value.offset + parsed.value.fileSize > BigInt(size)) return err("ELF load segment is truncated");
				}
				headers.push(parsed.value);
			}
			return ok(headers);
		};
		dynamicTags = (table, bits, little, policy) => {
			const found = {
				needed: new Set(),
				runpath: new Set(),
				rpath: new Set(),
				strtab: undefined,
				strsz: undefined
			};
			const lists = new Map([
				[DT_NEEDED, {
					offsets: found.needed,
					limit: policy.libraries,
					key: "libraries"
				}],
				[DT_RUNPATH, {
					offsets: found.runpath,
					limit: policy.search_path_entries,
					key: "search_path_entries"
				}],
				[DT_RPATH, {
					offsets: found.rpath,
					limit: policy.search_path_entries,
					key: "search_path_entries"
				}]
			]);
			const walked = walkElfDynamicTable(table, {
				bits,
				littleEndian: little
			}, DEPENDENCY_SINGLETONS, ({ tag, value }) => {
				const list = lists.get(tag);
				if (list !== undefined) {
					list.offsets.add(value);
					if (list.offsets.size > list.limit) return err(desktopLibraryLimit(policy, list.key, `ELF dynamic table ${tag === 1n ? "needed libraries" : "search path entries"}`));
				} else if (tag === 5n) found.strtab = value;
				else if (tag === 10n) found.strsz = value;
				return undefined;
			});
			if (!walked.ok) return err(walked.error.kind === "visitor" ? walked.error.error : `Duplicate dynamic tag 0x${walked.error.tag.toString(16)}`);
			if (walked.value.trailingBytes !== 0) return err("ELF PT_DYNAMIC size is not a whole number of entries");
			return walked.value.terminatorOffset === null ? err("ELF dynamic table has no DT_NULL terminator") : ok(found);
		};
		dynamicStrings = async (read, file, offsets, policy) => {
			const values = [];
			for (const offset of offsets) {
				if (offset >= file.bytes) return err("ELF dynamic string lies outside its table");
				const length = BigInt(policy.string_bytes) < file.bytes - offset ? BigInt(policy.string_bytes) : file.bytes - offset;
				const window = await readBoundedExtent(read, {
					offset: file.at + offset,
					length,
					fileSize: file.size
				}, "ELF dynamic string");
				if (!window.ok) return window;
				const observed = observeElfStringTableEntry(window.value, 0, policy.string_bytes);
				if (observed.state !== "terminated") return err(length < file.bytes - offset ? desktopLibraryLimit(policy, "string_bytes", "ELF dynamic string read") : "ELF dynamic string is truncated");
				try {
					values.push(decodeStrictUtf8(observed.bytes, "preserve"));
				} catch (error) {
					if (!(error instanceof TypeError)) throw error;
					return err("ELF dynamic lookup string is not valid UTF-8; its filesystem identity is unresolved");
				}
			}
			return ok(values);
		};
		directories = (paths) => [...new Set(paths.flatMap((path) => path.split(":")).filter((path) => path.length > 0))];
		readElfDependencies = async (read, size, policy = desktopLibraryPolicy(), expected) => {
			const header = Buffer.from(await read(0, 64));
			const facts = readElfHeaderFacts(header, size);
			if (!facts.ok) return err({
				kind: "unreadable",
				identity: null,
				reason: facts.error
			});
			const identity = {
				machine: facts.value.machine,
				bits: facts.value.elfClass,
				byte_order: facts.value.byteOrder
			};
			if (expected !== undefined && !elfLibraryIdentityMatches(expected, identity)) return err({
				kind: "incompatible",
				identity,
				reason: `Incompatible ELF library: expected machine ${expected.machine}, ELF${expected.bits}, ${expected.byte_order}-endian; observed machine ${identity.machine}, ELF${identity.bits}, ${identity.byte_order}-endian`
			});
			const fixed = admitElfFixedHeaderFacts(facts.value, size);
			if (!fixed.ok) return err({
				kind: "unreadable",
				identity,
				reason: fixed.error
			});
			const dependencies = await readDependencyTables(read, header, size, identity, policy);
			return dependencies.ok ? ok({
				...identity,
				...dependencies.value
			}) : err({
				kind: "unreadable",
				identity,
				reason: dependencies.error
			});
		};
		readDependencyTables = async (read, header, size, identity, policy) => {
			const { bits } = identity;
			const little = identity.byte_order === "little";
			const headers = await programHeaders(read, header, size, identity, policy);
			if (!headers.ok) return headers;
			const none = {
				needed: [],
				runpath: undefined,
				rpath: []
			};
			const programs = keyedBy(headers.value, ({ type }) => type);
			const dynamicProgram = uniqueKeyed(programs, PT_DYNAMIC);
			if (!dynamicProgram.ok) return err(`ELF image declares ${String(dynamicProgram.error.ordinals.length)} PT_DYNAMIC program headers`);
			const dynamic = dynamicProgram.value;
			if (dynamic === undefined) return ok(none);
			const table = await readBoundedExtent(read, {
				offset: dynamic.offset,
				length: dynamic.fileSize,
				fileSize: size
			}, "ELF dynamic table", policy);
			if (!table.ok) return table;
			const tags = dynamicTags(table.value, bits, little, policy);
			if (!tags.ok) return tags;
			const { strtab, strsz, needed, runpath, rpath } = tags.value;
			if (needed.size + runpath.size + rpath.size === 0) return ok(none);
			if (strtab === undefined || strsz === undefined) return err("ELF dynamic string table is not mapped from the file");
			if (strsz > BigInt(size)) return err("ELF dynamic string table is not mapped from the file");
			const fileBacked = [];
			const zeroFills = [];
			for (const load of allKeyed(programs, PT_LOAD)) {
				const span = elfLoadSpans(load);
				if (span.fileBacked !== undefined) fileBacked.push(span.fileBacked);
				if (span.zeroFill !== undefined) zeroFills.push(span.zeroFill);
			}
			const stringsAt = resolveMappedFileOffset(fileBacked, strtab, Number(strsz), zeroFills);
			if (!stringsAt.ok) return err(stringsAt.error.reason === "ambiguous" ? "ELF dynamic string table has ambiguous file mappings" : "ELF dynamic string table is not mapped from the file");
			const strings = {
				size,
				at: BigInt(stringsAt.value),
				bytes: strsz
			};
			const names = await dynamicStrings(read, strings, needed, policy);
			if (!names.ok) return names;
			const search = await dynamicStrings(read, strings, runpath.size > 0 ? runpath : rpath, policy);
			if (!search.ok) return search;
			return ok({
				needed: [...new Set(names.value)],
				runpath: runpath.size > 0 ? directories(search.value) : undefined,
				rpath: runpath.size > 0 ? [] : directories(search.value)
			});
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/libraryPackages.js
/** Preserve filesystem lookup spelling until the host resolves its target. */
async function* libraryCandidates(request, directories, machine, cache, host) {
	if (request.startsWith("/")) {
		yield {
			path: request,
			unprobed: false
		};
		return;
	}
	const unprobed = [];
	if (!request.includes("/")) for (const directory of directories) {
		const candidate = `${directory}/${request}`;
		const probe = await host.isFile(candidate);
		if (probe.kind === "file") {
			if (probe.isFile) yield {
				path: candidate,
				unprobed: false
			};
		} else if (probe.unreachable) unprobed.push(candidate);
		else yield {
			path: candidate,
			unprobed: false
		};
	}
	for (const path of cachedPaths(cache, request, machine)) yield {
		path,
		unprobed: false
	};
	for (const path of unprobed) yield {
		path,
		unprobed: true
	};
}
var CACHE_LINE, parseLinkerCache, CACHE_FLAGS, MACHINE_FLAGS, cachedPaths, ORIGIN_TOKEN, expandOrigin, expanded, searchDirectories, libraryClosure, libraryPackageNames, installableLibraryPackages;
function init_libraryPackages() {
	return (init_libraryPackages = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_appExportInstall();
		init_desktopStateDiff();
		CACHE_LINE = /^\s+(?<soname>\S+) \((?<flags>[^)]*)\) => (?<path>\/.+)$/u;
		parseLinkerCache = (output) => output.split("\n").flatMap((line) => {
			const groups = CACHE_LINE.exec(line)?.groups;
			return groups?.soname === undefined || groups.path === undefined ? [] : [{
				soname: groups.soname,
				flags: (groups.flags ?? "").split(",").map((flag) => flag.trim()),
				path: groups.path
			}];
		});
		CACHE_FLAGS = new Map([[62, "x86-64"], [183, "AArch64"]]);
		MACHINE_FLAGS = new Set(CACHE_FLAGS.values());
		cachedPaths = (cache, soname, machine) => {
			const matching = cache.filter((entry) => entry.soname === soname);
			const flag = CACHE_FLAGS.get(machine);
			if (flag !== undefined) return matching.filter((entry) => entry.flags.includes(flag)).map((entry) => entry.path);
			const unclassified = matching.filter((entry) => !entry.flags.some((name) => MACHINE_FLAGS.has(name)));
			return (unclassified.length > 0 ? unclassified : matching).map((entry) => entry.path);
		};
		ORIGIN_TOKEN = /\$(?:ORIGIN(?![A-Za-z0-9_])|\{ORIGIN\})/gu;
		expandOrigin = (owner, declaration) => declaration.replace(ORIGIN_TOKEN, () => posix.dirname(owner));
		expanded = (owner, directories) => directories.filter((path) => !path.replace(ORIGIN_TOKEN, "").includes("$")).map((path) => expandOrigin(owner, path)).filter((path) => path.startsWith("/"));
		searchDirectories = (object) => {
			const rpaths = [];
			if (object.dependencies.runpath === undefined) for (let at = object; at; at = at.loader) rpaths.push(...expanded(at.path, at.dependencies.rpath));
			return [...new Set([...rpaths, ...expanded(object.path, object.dependencies.runpath ?? [])])];
		};
		libraryClosure = async (executable, cache, host, limit) => {
			const resolvedLookups = new Map();
			const seen = new Set();
			const closure = {
				requiredAliases: [],
				libraries: [],
				missing: [],
				unreadable: [],
				truncated: false
			};
			const rootPath = await host.resolvePath(executable.path);
			if (rootPath === undefined) {
				closure.unreadable.push({
					path: executable.path,
					reason: "the executable's filesystem path could not be resolved"
				});
				return closure;
			}
			const root = {
				...executable,
				path: rootPath.resolvedPath
			};
			const ownFolder = posix.dirname(root.path);
			const queue = [{
				...root,
				loader: undefined
			}];
			const walkedObjects = new Set([rootPath.fileIdentity]);
			const retainedAliases = new Set();
			for (const object of queue) {
				const directories = searchDirectories(object);
				for (const soname of object.dependencies.needed) {
					const expandedRequest = expandOrigin(object.path, soname);
					const unsupported = expandedRequest !== soname && soname.replace(ORIGIN_TOKEN, "").includes("$");
					const direct = !unsupported && expandedRequest.startsWith("/");
					let directPath = direct ? resolvedLookups.get(expandedRequest) : undefined;
					if (direct && directPath === undefined) {
						if (seen.size >= limit) return {
							...closure,
							truncated: true
						};
						directPath = await host.resolvePath(expandedRequest);
						if (directPath !== undefined && resolvedLookups.size < limit) resolvedLookups.set(expandedRequest, directPath);
					}
					const request = directPath?.path ?? expandedRequest;
					const key = unsupported || direct && directPath === undefined ? compositeKey([
						"unresolved",
						object.path,
						soname
					]) : compositeKey([
						"lookup",
						request,
						directPath?.ownershipPath ?? request,
						...directPath?.requiredAliases.flatMap((alias) => [alias.path, alias.ownershipPath]) ?? []
					]);
					if (seen.has(key)) continue;
					if (seen.size >= limit) return {
						...closure,
						truncated: true
					};
					seen.add(key);
					if (unsupported) {
						closure.unreadable.push({
							path: object.path,
							reason: `DT_NEEDED ${JSON.stringify(soname)} contains an unsupported dynamic token or dollar expression alongside $ORIGIN`
						});
						continue;
					}
					if (direct && directPath === undefined) {
						closure.unreadable.push({
							path: expandedRequest,
							reason: "the library's filesystem path could not be resolved"
						});
						continue;
					}
					let selected;
					let unresolved = false;
					let unprobed;
					for await (const { path: candidate, unprobed: couldNotProbe } of libraryCandidates(request, directories, object.dependencies.machine, cache, host)) {
						const resolved = request.startsWith("/") ? directPath : await host.resolvePath(candidate);
						if (resolved === undefined) {
							if (couldNotProbe) {
								unprobed ??= {
									path: candidate,
									reason: "the library's filesystem path could not be resolved"
								};
								continue;
							}
							closure.unreadable.push({
								path: candidate,
								reason: "the library's filesystem path could not be resolved"
							});
							unresolved = true;
							break;
						}
						const { path, resolvedPath } = resolved;
						const dependencies = await host.dependencies(resolvedPath, object.dependencies);
						if (!dependencies.ok && dependencies.error.identity === null) {
							if (couldNotProbe) {
								unprobed ??= {
									path,
									reason: dependencies.error.reason
								};
								continue;
							}
							closure.unreadable.push({
								path,
								reason: dependencies.error.reason
							});
							unresolved = true;
							break;
						}
						if (!dependencies.ok && dependencies.error.kind === "incompatible") {
							if (request.startsWith("/")) {
								closure.unreadable.push({
									path,
									reason: dependencies.error.reason
								});
								unresolved = true;
								break;
							}
							continue;
						}
						selected = {
							path,
							resolvedPath,
							fileIdentity: resolved.fileIdentity,
							lookupPath: request.startsWith("/") ? expandedRequest : candidate,
							ownershipPath: resolved.ownershipPath,
							requiredAliases: resolved.requiredAliases,
							dependencies
						};
						break;
					}
					if (selected === undefined) {
						if (unprobed !== undefined) closure.unreadable.push(unprobed);
						else if (!unresolved) closure.missing.push(soname);
						continue;
					}
					const { path, resolvedPath, fileIdentity, lookupPath, dependencies } = selected;
					for (const alias of selected.requiredAliases) {
						const key = compositeKey([alias.path, alias.ownershipPath]);
						if (isWithinAny(alias.path, [ownFolder]) || retainedAliases.has(key)) continue;
						retainedAliases.add(key);
						closure.requiredAliases.push(alias);
					}
					if (!isWithinAny(path, [ownFolder]) || !isWithinAny(resolvedPath, [ownFolder])) closure.libraries.push({
						soname,
						ownershipPath: selected.ownershipPath,
						path,
						resolvedPath
					});
					if (dependencies.ok) {
						if (!walkedObjects.has(fileIdentity)) {
							walkedObjects.add(fileIdentity);
							queue.push({
								path: lookupPath,
								dependencies: dependencies.value,
								loader: object
							});
						}
					} else closure.unreadable.push({
						path,
						reason: dependencies.error.reason
					});
				}
			}
			return closure;
		};
		libraryPackageNames = (owners, ownPackage) => [...new Set(owners.map((owner) => owner.split(":")[0] ?? owner).filter((name) => name !== ownPackage.split(":")[0]))].sort();
		installableLibraryPackages = (names, available) => {
			const installable = [];
			const uninstallable = [];
			const supplied = new Map();
			for (const name of names) {
				const sources = available.sources.get(name) ?? [];
				const declared = sources.filter((source) => available.declared.has(source));
				const archive = fromUbuntuNobleArchive(sources, available.origins === undefined ? undefined : sources.map((source) => available.origins?.get(source) ?? null));
				if (archive || declared.length > 0) installable.push(name);
				else uninstallable.push(name);
				if (!archive && declared.length > 0) supplied.set(name, declared);
			}
			return {
				installable,
				uninstallable,
				supplied
			};
		};
	})))();
}

//#endregion
//#region dist/desktop/LibraryPackageInventory.js
var QUERY_BATCH, suppliedByComputerBase, lookupRead, probeLibraryFile, ownershipSpelling, requiredAliases, elfDependencies, linkerCache, packageOwners, incompleteReason, libraryOwnership, inspectLibraryPackages, packageSources, installablePackages, installableLibraries;
function init_LibraryPackageInventory() {
	return (init_LibraryPackageInventory = __esmMin((() => {
		init_libraryPolicy();
		init_elfDependencies();
		init_libraryPackages();
		init_linuxPackages();
		init_result();
		init_resources();
		init_unicodeCodePointOrder();
		init_OwnedRegularFile();
		init_readFileHandleRange();
		init_HostFileRead();
		init_DpkgOwnershipQuery();
		init_HostQuery();
		QUERY_BATCH = 200;
		suppliedByComputerBase = (path, target, machine) => (machine === 62 || machine === 183) && (path === "/bin" || path === "/sbin" || path === "/lib" || machine === 62 && path === "/lib64") && (target === `usr${path}` || target === `/usr${path}`);
		lookupRead = async (signal, read) => {
			abortIfNeeded(signal);
			const value = await read();
			abortIfNeeded(signal);
			return value;
		};
		probeLibraryFile = async (path, signal) => {
			try {
				const facts = await lookupRead(signal, () => stat(path));
				return {
					kind: "file",
					isFile: facts.isFile()
				};
			} catch (cause) {
				const code = cause.code;
				if (code === "ENOENT" || code === "ENOTDIR") {
					abortIfNeeded(signal);
					return {
						kind: "file",
						isFile: false
					};
				}
				if (isRefusedRead(cause)) {
					abortIfNeeded(signal);
					return {
						kind: "unknown",
						unreachable: code === "EACCES"
					};
				}
				throw hostReadFailure(cause);
			}
		};
		ownershipSpelling = async (path, signal) => {
			let traversed = "";
			let spelling = "/";
			for (const part of path.split("/")) {
				abortIfNeeded(signal);
				if (part === "" || part === ".") continue;
				traversed += `/${part}`;
				spelling = part === ".." ? await lookupRead(signal, () => realpath(traversed)) : posix.join(spelling, part);
			}
			return spelling;
		};
		requiredAliases = async (path, machine, signal) => {
			const aliases = new Map();
			const visitedTargets = new Set();
			const activeLinks = new Set();
			const visit = async (lookup, directoryLeaf, fileLeaf = false) => {
				abortIfNeeded(signal);
				const ends = [];
				for (let end = lookup.indexOf("/", lookup.startsWith("/") ? 1 : 0); end !== -1; end = lookup.indexOf("/", end + 1)) ends.push(end);
				ends.push(lookup.length);
				for (const end of ends) {
					const prefix = lookup.slice(0, end);
					if (!(await lookupRead(signal, () => lstat(prefix))).isSymbolicLink()) continue;
					const alias = posix.join(await lookupRead(signal, () => realpath(posix.dirname(prefix))), posix.basename(prefix));
					const target = await lookupRead(signal, () => readlink(prefix));
					const directory = end !== lookup.length || directoryLeaf;
					if ((directory || fileLeaf) && !suppliedByComputerBase(alias, target, machine)) aliases.set(prefix, {
						path: alias,
						ownershipPath: await ownershipSpelling(prefix, signal)
					});
					const targetLookup = posix.isAbsolute(target) ? target : `${posix.dirname(prefix)}/${target}`;
					const targetKey = compositeKey([targetLookup, directory ? "directory" : "file"]);
					if (activeLinks.has(alias) || visitedTargets.has(targetKey)) continue;
					visitedTargets.add(targetKey);
					activeLinks.add(alias);
					try {
						abortIfNeeded(signal);
						await visit(targetLookup, directory, true);
					} finally {
						activeLinks.delete(alias);
					}
				}
			};
			await visit(path, false);
			abortIfNeeded(signal);
			return [...aliases.values()];
		};
		elfDependencies = async (path, signal, policy, expected) => {
			const options = {
				symlinks: "follow",
				...signal === undefined ? {} : { signal }
			};
			try {
				return await withOwnedRegularFile(path, options, ({ handle, initial }) => readElfDependencies((offset, length) => readFileHandleRange(handle, offset, length), initial.size, policy, expected));
			} catch (cause) {
				const failure = hostReadFailure(cause);
				if (failure !== cause) throw failure;
				if (!isRefusedRead(cause)) throw cause;
				return err({
					kind: "unreadable",
					identity: null,
					reason: "the file could not be read"
				});
			}
		};
		linkerCache = async (runQuery, signal) => {
			for (const command of ["ldconfig", "/sbin/ldconfig"]) {
				const outcome = await runQuery(command, ["-p"], signal);
				if (outcome !== "missing") return succeeded(outcome);
			}
			return undefined;
		};
		packageOwners = async (paths, runQuery, signal) => {
			const unique = [...new Set(paths)];
			const literal = unique.filter(literalDpkgOwnershipPath);
			const owners = new Map();
			const incomplete = (reason) => err({
				owners,
				reason
			});
			let unreadable = false;
			for (let start = 0; start < literal.length; start += QUERY_BATCH) {
				const batch = literal.slice(start, start + QUERY_BATCH);
				const outcome = await queryDpkgOwnership(runQuery, batch, signal);
				if (outcome.kind === "missing") return incomplete("dpkg-query is not installed");
				if (outcome.kind === "failed") return incomplete("dpkg-query -S did not finish");
				if (outcome.kind !== "read") return incomplete("dpkg-query could not say which packages own the libraries");
				for (const [path, names] of outcome.owners) owners.set(path, names);
				unreadable ||= !outcome.complete;
			}
			if (unreadable) return incomplete("dpkg-query returned unreadable ownership records");
			return literal.length === unique.length ? ok(owners) : incomplete("dpkg-query cannot safely query library paths containing pattern characters or invalid path delimiters");
		};
		incompleteReason = (closure, policy) => {
			const [first] = closure.unreadable;
			const reasons = [...closure.truncated ? [desktopLibraryLimit(policy, "libraries", "REA dependency closure")] : [], ...first === undefined ? [] : [`the dependencies of ${String(closure.unreadable.length)} libraries could not be read, such as ${first.path}: ${first.reason}`]];
			return reasons.length === 0 ? undefined : reasons.join("; ");
		};
		libraryOwnership = (located, knownOwners) => {
			const names = [];
			const dispositions = new Map();
			for (const library of located) {
				const key = compositeKey([library.kind, library.path]);
				let disposition = dispositions.get(key);
				if (disposition === undefined) {
					disposition = {
						path: library.path,
						owned: false,
						unknown: false
					};
					dispositions.set(key, disposition);
				}
				const found = library.candidates.map((candidate) => knownOwners.get(candidate)).find((owner) => owner !== undefined && owner.length > 0);
				if (found !== undefined) {
					names.push(...found);
					disposition.owned = true;
				} else if (!library.candidates.every((candidate) => knownOwners.has(candidate))) disposition.unknown = true;
			}
			const unowned = [...dispositions.values()].filter(({ owned }) => !owned);
			const unpackaged = unowned.filter(({ unknown }) => !unknown).map(({ path }) => path);
			const unresolved = unowned.some(({ unknown }) => unknown);
			return {
				names,
				unpackaged,
				unresolved
			};
		};
		inspectLibraryPackages = async (executable, ownPackage, runQuery, signal, policy = desktopLibraryPolicy()) => {
			const none = (reason) => ({
				library_packages: [],
				missing_libraries: [],
				unpackaged_libraries: [],
				library_packages_reason: reason
			});
			const root = await elfDependencies(executable, signal, policy);
			if (!root.ok) return none(`the libraries of ${executable} were not read: ${root.error.reason}`);
			const cache = await linkerCache(runQuery, signal);
			if (cache === undefined) return none("ldconfig -p did not list the dynamic linker cache");
			const closure = await libraryClosure({
				path: executable,
				dependencies: root.value
			}, parseLinkerCache(cache), {
				resolvePath: async (path) => {
					try {
						const probe = await probeLibraryFile(path, signal);
						if (probe.kind !== "file" || !probe.isFile) return undefined;
						const resolvedPath = await lookupRead(signal, () => realpath(path));
						const directory = await lookupRead(signal, () => realpath(posix.dirname(path)));
						const selected = posix.join(directory, posix.basename(path));
						const identity = await lookupRead(signal, () => stat(resolvedPath, { bigint: true }));
						return {
							path: selected,
							ownershipPath: await ownershipSpelling(path, signal),
							resolvedPath,
							fileIdentity: `${identity.dev}:${identity.ino}`,
							requiredAliases: await requiredAliases(path, root.value.machine, signal)
						};
					} catch (cause) {
						if (isRefusedRead(cause)) {
							abortIfNeeded(signal);
							return undefined;
						}
						throw hostReadFailure(cause);
					}
				},
				dependencies: (path, expected) => elfDependencies(path, signal, policy, expected),
				isFile: (path) => probeLibraryFile(path, signal)
			}, policy.libraries);
			const located = [...closure.libraries.map(({ path, resolvedPath, ownershipPath }) => ({
				kind: "leaf",
				path,
				candidates: ownershipCandidates([
					ownershipPath,
					path,
					resolvedPath
				])
			})), ...closure.requiredAliases.map(({ path, ownershipPath }) => ({
				kind: "alias",
				path,
				candidates: ownershipCandidates([ownershipPath, path])
			}))];
			const owners = await packageOwners(located.flatMap((library) => library.candidates), runQuery, signal);
			const knownOwners = owners.ok ? owners.value : owners.error.owners;
			const { names, unpackaged, unresolved: ownershipUnresolved } = libraryOwnership(located, knownOwners);
			const reason = [incompleteReason(closure, policy), owners.ok || !ownershipUnresolved ? undefined : owners.error.reason].filter((value) => value !== undefined).join("; ");
			return {
				library_packages: [...libraryPackageNames(names, ownPackage)],
				missing_libraries: [...closure.missing].sort(),
				unpackaged_libraries: [...new Set(unpackaged)].sort(),
				...reason.length === 0 ? {} : { library_packages_reason: reason }
			};
		};
		packageSources = async (names, runQuery, signal, statusFile) => {
			const sources = new Map();
			for (let start = 0; start < names.length; start += QUERY_BATCH) {
				const output = await queryUtf8Text(runQuery, "apt-cache", ["policy", ...names.slice(start, start + QUERY_BATCH)], signal);
				if (output.kind !== "read") return undefined;
				for (const [name, listed] of parseAptPolicyPackageSources(output.text, statusFile)) sources.set(name, listed);
			}
			return sources;
		};
		installablePackages = async (names, available, runQuery, signal) => {
			const sources = names.length === 0 ? new Map() : await packageSources(names, runQuery, signal, available.statusFile);
			return sources === undefined ? undefined : installableLibraryPackages(names, {
				...available,
				sources
			});
		};
		installableLibraries = (libraries, split) => {
			const names = libraries.library_packages;
			if (split === undefined && names.length > 0) return {
				...libraries,
				library_packages: [],
				uninstallable_library_packages: [],
				library_packages_reason: [libraries.library_packages_reason, `apt-cache policy did not say where ${names.join(", ")} come from, so none of them is installed`].filter((reason) => reason !== undefined).join("; ")
			};
			const installable = (name) => split?.installable.includes(name) === true;
			return {
				...libraries,
				library_packages: names.filter(installable),
				uninstallable_library_packages: names.filter((name) => !installable(name))
			};
		};
	})))();
}

//#endregion
//#region dist/desktop/DebianPackageInventory.js
var policyOrigins, bothFailed, settled, installFacts, executablePackageFacts, dpkgOwner, unqualified, debianPackage;
function init_DebianPackageInventory() {
	return (init_DebianPackageInventory = __esmMin((() => {
		init_validationFailure();
		init_resources();
		init_appExportInstall();
		init_aptRepositories();
		init_linuxPackages();
		init_AptRepositoryInventory();
		init_DpkgOwnershipQuery();
		init_HostQuery();
		init_LibraryPackageInventory();
		init_errorMessage();
		policyOrigins = async (context, statusFile) => {
			const policy = await queryUtf8Text(context.host.runQuery, "apt-cache", ["policy"], context.signal);
			if (policy.kind === "undecodable") {
				context.limitations.push("apt-cache policy contained unreadable UTF-8, so the origins of repository sources are unknown.");
				return new Map();
			}
			return policy.kind === "read" ? parseAptPolicyOrigins(policy.text, statusFile) : undefined;
		};
		bothFailed = (first, second) => {
			if (Object.is(first, second)) return first;
			const causes = [first, second];
			const both = new AggregateError(causes, causes.map((cause) => errorMessage(cause)).join("; "));
			const cleanups = causes.flatMap((cause) => cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined ? [cause.cleanup] : []);
			if (cleanups.length === 0) return both;
			const leases = causes.map(artifactPrimaryCleanupLeases);
			return ArtifactReaderFailure.withCleanup(both, {
				reason: cleanups.map(({ reason }) => reason).join("; "),
				resources: [...new Set(cleanups.flatMap(({ resources }) => resources))]
			}, undefined, leases.includes(undefined) ? undefined : [...new Set(leases.flatMap((owned) => owned ?? []))]);
		};
		settled = async (first, second) => {
			const [one, two] = await Promise.allSettled([first, second]);
			if (one.status === "rejected" && two.status === "rejected") throw bothFailed(one.reason, two.reason);
			if (one.status === "rejected") throw one.reason;
			if (two.status === "rejected") throw two.reason;
			return [one.value, two.value];
		};
		installFacts = async (installed, executable, context, origins) => {
			const { runQuery } = context.host;
			const [vendor, libraries] = await settled(inspectAptRepositories({
				sources: installed.sources,
				origins: installed.source_origins
			}, context.host, context.signal), fromUbuntuNobleArchive(installed.sources, installed.source_origins) ? Promise.resolve(undefined) : inspectLibraryPackages(executable, installed.name ?? "", runQuery, context.signal, context.libraryPolicy));
			context.limitations.push(...vendor.limitations);
			for (const [sha256, bytes] of vendor.keys) context.signingKeys.set(sha256, bytes);
			const usable = (repository) => repositoryRefusal(repository) === undefined;
			const declared = declaredPackageFiles(vendor.repositories.filter(usable), vendor.indexTargets);
			const program = installed.executable_package;
			const split = await installablePackages([...libraries?.library_packages ?? [], ...program === undefined ? [] : [program]], {
				origins,
				declared,
				statusFile: context.host.apt.status
			}, runQuery, context.signal);
			const supplies = (repository) => split === undefined || !usable(repository) ? [] : repositorySupplies(repository, split.supplied, vendor.indexTargets);
			return {
				apt_repositories: vendor.repositories.map((repository) => ({
					...repository,
					supplies: [...supplies(repository)]
				})),
				...libraries === undefined ? {} : installableLibraries(libraries, split),
				...program === undefined ? {} : executablePackageFacts(program, split)
			};
		};
		executablePackageFacts = (name, split) => {
			if (split?.installable.includes(name) === true) return {};
			return { executable_package_reason: split === undefined ? `apt-cache policy did not say where ${name} comes from` : `neither the Ubuntu 24.04 archive nor a vendor repository the export declares offers ${name}` };
		};
		dpkgOwner = async (paths, { host, signal }) => {
			for (const path of ownershipCandidates(paths)) {
				if (!literalDpkgOwnershipPath(path)) return {
					kind: "unknown",
					reason: `dpkg-query cannot safely query ${path} containing pattern characters or invalid path delimiters`
				};
				const outcome = await queryDpkgOwnership(host.runQuery, [path], signal);
				if (outcome.kind === "missing") return {
					kind: "unknown",
					reason: "dpkg-query is not installed"
				};
				if (outcome.kind !== "read") return {
					kind: "unknown",
					reason: `dpkg-query could not say which package owns ${path}`
				};
				const owners = outcome.owners.get(path);
				if (owners === undefined) return {
					kind: "unknown",
					reason: `dpkg-query returned unreadable ownership records for ${path}`
				};
				const [name] = owners;
				if (name !== undefined) return {
					kind: "owned",
					name
				};
			}
			return { kind: "unowned" };
		};
		unqualified = (name) => name.split(":")[0] ?? name;
		debianPackage = async ({ program, executable, entry }, context) => {
			const { host, signal, limitations } = context;
			const unknown = {
				kind: "unknown",
				name: null,
				version: null,
				architecture: null,
				sources: [],
				package_lists_present: null
			};
			const executableOwner = await dpkgOwner(program, context);
			if (executableOwner.kind === "unknown") {
				limitations.push(`${executableOwner.reason}, so the package that owns the executable is unknown.`);
				return unknown;
			}
			const entryOwner = entry.length === 0 ? { kind: "unowned" } : await dpkgOwner(entry, context);
			if (entryOwner.kind === "unknown") {
				limitations.push(`${entryOwner.reason}, so the package that owns the desktop entry, which installs the application, is unknown.`);
				return unknown;
			}
			const owner = executableOwner.kind === "owned" ? executableOwner.name : null;
			const name = entryOwner.kind === "owned" ? entryOwner.name : owner;
			if (name === null) return unknown;
			const status = succeeded(await host.runQuery("dpkg-query", [
				"-W",
				`-f=${DPKG_STATUS_FORMAT}`,
				name
			], signal));
			const parsed = status === undefined ? undefined : parseDpkgStatus(status);
			const policy = await queryUtf8Text(host.runQuery, "apt-cache", ["policy", name], signal);
			if (policy.kind === "undecodable") limitations.push("apt-cache policy contained unreadable UTF-8, so the installed version's repository sources are unknown.");
			const apt = await resolveAptLocations(host.runQuery, signal, host.apt);
			const listsPresent = await readdir(apt.lists).then((lists) => lists.some((list) => /_Packages(?:\.[a-z0-9]+)?$/u.test(list)), (cause) => {
				if (cause.code === "ENOENT") return false;
				limitations.push(`The apt package lists directory ${apt.lists} could not be read, so whether package lists are present is unknown: ${describeValidationFailure(cause)}`);
				return null;
			});
			if (listsPresent === false) limitations.push("No apt package lists are present, so whether the installed version comes from a package archive is unknown.");
			const sources = policy.kind === "read" ? [...parseAptPolicySources(policy.text, apt.status)] : [];
			const origins = await policyOrigins(context, apt.status);
			const installed = {
				kind: "deb",
				name: parsed?.name ?? name,
				...owner === null || unqualified(owner) === unqualified(name) ? {} : { executable_package: unqualified(owner) },
				...owner === null ? { executable_package_reason: `no package owns ${executable}` } : {},
				version: parsed?.version ?? null,
				architecture: parsed?.architecture ?? null,
				sources,
				...origins === undefined ? {} : { source_origins: sources.map((source) => origins.get(source) ?? null) },
				package_lists_present: listsPresent
			};
			return {
				...installed,
				...await installFacts(installed, executable, {
					...context,
					host: {
						...host,
						apt
					}
				}, origins)
			};
		};
	})))();
}

//#endregion
//#region dist/desktop/LinuxApplicationInventory.js
var DESKTOP_ENTRY_MAX_BYTES, LINUX_INVENTORY_HOST, desktopEntryDirectories, NESTED_SEARCH_MAX_DEPTH, NESTED_SEARCH_MAX_ENTRIES, desktopPathKind, findNestedDesktopEntry, locateDesktopEntry, readDesktopEntry, readHeader, launchEnvironment, identifyPackage, electronMarkers, launchCommand, envApplicationDirectory, directLaunchStateHome, inspectLinuxApplication;
function init_LinuxApplicationInventory() {
	return (init_LinuxApplicationInventory = __esmMin((() => {
		init_strictUtf8();
		init_libraryPolicy();
		init_desktopEntry();
		init_linuxPackages();
		init_result();
		init_ElectronFuseReader();
		init_resources();
		init_OwnedRegularFile();
		init_callerPath();
		init_readStableFileBytes();
		init_ApplicationStateDirectories();
		init_AptRepositoryInventory();
		init_XdgBase();
		init_DebianPackageFile();
		init_DebianPackageInventory();
		init_HostFileRead();
		init_HostQuery();
		init_ProgramLookup();
		DESKTOP_ENTRY_MAX_BYTES = 1024 * 1024;
		LINUX_INVENTORY_HOST = {
			runQuery: runHostQuery,
			apt: APT_LOCATIONS
		};
		desktopEntryDirectories = (environment, home) => {
			const dataHome = xdgBase(environment.XDG_DATA_HOME, join(home, ".local/share"));
			const dataDirectories = (environment.XDG_DATA_DIRS || "/usr/local/share:/usr/share").split(":").filter((directory) => isAbsolute(directory));
			return [dataHome, ...dataDirectories].map((directory) => join(directory, "applications"));
		};
		NESTED_SEARCH_MAX_DEPTH = 4;
		NESTED_SEARCH_MAX_ENTRIES = 4096;
		desktopPathKind = async (path) => {
			try {
				const facts = await stat(path);
				return ok(facts.isFile() ? "file" : facts.isDirectory() ? "directory" : "other");
			} catch (cause) {
				const code = cause.code;
				return code === "ENOENT" || code === "ENOTDIR" ? ok("absent") : err(cause);
			}
		};
		findNestedDesktopEntry = async (applicationsDirectory, id, signal) => {
			const pending = [{
				path: applicationsDirectory,
				remaining: id,
				depth: 1
			}];
			let examined = 0;
			let incomplete = false;
			while (pending.length > 0) {
				assertArtifactReadActive(signal);
				const directory = pending.pop();
				if (directory.depth > 1) {
					if (examined >= NESTED_SEARCH_MAX_ENTRIES) return { truncated: true };
					examined++;
					const path = join(directory.path, directory.remaining);
					const kind = await desktopPathKind(path);
					assertArtifactReadActive(signal);
					if (!kind.ok) incomplete = true;
					else if (kind.value === "file") return { path };
				}
				for (let split = directory.remaining.indexOf("-"); split !== -1; split = directory.remaining.indexOf("-", split + 1)) {
					const prefix = directory.remaining.slice(0, split);
					if (prefix === "" || prefix === "." || prefix === "..") continue;
					if (examined >= NESTED_SEARCH_MAX_ENTRIES) return { truncated: true };
					examined++;
					const path = join(directory.path, prefix);
					const kind = await desktopPathKind(path);
					assertArtifactReadActive(signal);
					if (!kind.ok) {
						incomplete = true;
						continue;
					}
					if (kind.value !== "directory") continue;
					if (directory.depth >= NESTED_SEARCH_MAX_DEPTH) {
						incomplete = true;
						continue;
					}
					pending.push({
						path,
						remaining: directory.remaining.slice(split + 1),
						depth: directory.depth + 1
					});
				}
			}
			return incomplete ? { truncated: true } : undefined;
		};
		locateDesktopEntry = async (request, selector, signal) => {
			if (isAbsolute(selector)) return readDesktopEntry(selector, null, signal);
			const id = selector.endsWith(".desktop") ? selector : `${selector}.desktop`;
			const searched = desktopEntryDirectories(request.environment, request.home);
			for (const directory of searched) {
				assertArtifactReadActive(signal);
				const path = join(directory, id);
				const kind = await desktopPathKind(path);
				assertArtifactReadActive(signal);
				if (!kind.ok) return err({
					reason: "desktop_entry_search_incomplete",
					searched
				});
				let candidate = path;
				if (kind.value !== "file") {
					const nested = await findNestedDesktopEntry(directory, id, signal);
					assertArtifactReadActive(signal);
					if (nested === undefined) continue;
					if (!("path" in nested)) return err({
						reason: "desktop_entry_search_incomplete",
						searched
					});
					candidate = nested.path;
				}
				const located = await readDesktopEntry(candidate, id.slice(0, -".desktop".length), signal);
				if (!located.ok || !located.value.entry.hidden) return located;
				const { type, malformed_line } = located.value.entry;
				if (type !== "Application") continue;
				if (malformed_line !== undefined) return err({
					reason: "desktop_entry_invalid",
					detail: `malformed desktop entry structure at line ${String(malformed_line)}`
				});
				break;
			}
			return err({
				reason: "desktop_entry_not_found",
				searched
			});
		};
		readDesktopEntry = async (path, id, signal) => {
			const options = {
				symlinks: "follow",
				...signal === undefined ? {} : { signal }
			};
			let bytes;
			try {
				bytes = await withOwnedRegularFile(path, options, ({ handle }) => readStableFileBytes(handle, path, DESKTOP_ENTRY_MAX_BYTES, options));
			} catch (cause) {
				const failure = hostReadFailure(cause);
				if (failure !== cause) throw failure;
				if (!isRefusedRead(cause)) throw cause;
				return err({
					reason: "desktop_entry_invalid",
					detail: cause instanceof RegularFileCapacityError ? "larger than 1 MiB" : "unreadable"
				});
			}
			let text;
			try {
				text = decodeStrictUtf8(bytes, "preserve");
			} catch {
				return err({
					reason: "desktop_entry_invalid",
					detail: "not valid UTF-8"
				});
			}
			const parsed = parseDesktopEntry(text);
			if (!parsed.ok) return err({
				reason: "desktop_entry_invalid",
				detail: parsed.error
			});
			return ok({
				path,
				id,
				entry: parsed.value
			});
		};
		readHeader = async (path, signal) => {
			const options = {
				symlinks: "follow",
				...signal === undefined ? {} : { signal }
			};
			try {
				return await withOwnedRegularFile(path, options, async ({ handle }) => (await readStableFilePrefix(handle, path, 16, options)).bytes);
			} catch (cause) {
				const failure = hostReadFailure(cause);
				if (failure !== cause) throw failure;
				if (!isRefusedRead(cause)) throw cause;
				return new Uint8Array();
			}
		};
		launchEnvironment = (wrapper, inherited) => {
			const inheritedEnvironment = wrapper.clearEnvironment ? {} : { ...inherited };
			for (const name of wrapper.unsetEnvironment ?? []) delete inheritedEnvironment[name];
			const environment = {
				...inheritedEnvironment,
				...wrapper.environment
			};
			const pathRemoved = wrapper.clearEnvironment || wrapper.unsetEnvironment?.includes("PATH");
			const lookupEnvironment = pathRemoved && environment.PATH === undefined ? {
				...environment,
				PATH: "/bin:/usr/bin"
			} : environment;
			return {
				environment,
				lookupEnvironment
			};
		};
		identifyPackage = async ({ program, resolved, flatpak, entry }, context) => {
			const base = {
				version: null,
				architecture: null,
				sources: [],
				package_lists_present: null
			};
			if (flatpak !== null) return {
				kind: "flatpak",
				name: flatpak,
				...base
			};
			const fromPath = packageFromPath(resolved ?? program) ?? packageFromPath(program);
			if (fromPath?.kind === "snap") return {
				kind: "snap",
				name: fromPath.name,
				...base
			};
			if (fromPath?.kind === "flatpak") return {
				kind: "flatpak",
				name: fromPath.name,
				...base
			};
			if (fromPath?.kind === "appimage" || isAppImageHeader(await readHeader(resolved ?? program, context.signal))) return {
				kind: "appimage",
				name: basename(resolved ?? program),
				...base
			};
			return debianPackage({
				program: [program, ...resolved === null ? [] : [resolved]],
				executable: resolved ?? program,
				entry
			}, context);
		};
		electronMarkers = async (resolved, signal) => {
			if (resolved === null) return [];
			const markers = [];
			try {
				const image = await readElectronFuseImage(resolved, signal === undefined ? {} : { signal });
				if (image.slices.some((slice) => slice.sentinel_count > 0)) markers.push("fuse-sentinel");
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure && (cause.cleanup !== undefined || cause.reason === "cancelled")) throw cause;
			}
			const asar = join(dirname(resolved), "resources/app.asar");
			if (await lstat(asar).catch(() => undefined) !== undefined) markers.push("app-asar");
			return markers;
		};
		launchCommand = async (request, signal) => {
			if (request.desktopEntry === undefined) {
				const executable = request.executable ?? "";
				return ok({
					argv: [executable.includes("/") ? absoluteCallerPath(executable, { cwd: request.callerDirectory }) : executable, ...request.arguments],
					workingDirectory: request.callerDirectory,
					entry: null
				});
			}
			const located = await locateDesktopEntry(request, request.desktopEntry, signal);
			if (!located.ok) return located;
			const { entry } = located.value;
			if (entry.type !== "Application" || entry.exec === null) return err({
				reason: "desktop_entry_invalid",
				detail: "not an Application entry with an Exec key"
			});
			const tokens = tokenizeDesktopExec(entry.exec);
			if (!tokens.ok) return err({
				reason: "desktop_entry_invalid",
				detail: tokens.error
			});
			const { type: _type, try_exec: _tryExec, hidden: _hidden, malformed_line: _malformedLine, path: workingDirectory, ...fields } = entry;
			return ok({
				argv: expandDesktopExec(tokens.value, {
					icon: entry.icon,
					name: entry.name,
					location: located.value.path
				}, request.arguments),
				workingDirectory: workingDirectory || request.home,
				entry: {
					id: located.value.id,
					path: located.value.path,
					...fields,
					categories: [...fields.categories],
					mime_types: [...fields.mime_types]
				}
			});
		};
		envApplicationDirectory = async (path, workingDirectory, signal) => {
			if (path === undefined) return ok(undefined);
			const invalidDirectory = {
				reason: "desktop_entry_invalid",
				detail: "env chdir does not name a directory"
			};
			if (path === "") return err(invalidDirectory);
			const selected = absoluteCallerPath(path, { cwd: workingDirectory });
			try {
				assertArtifactReadActive(signal);
				const physical = await realpath(selected);
				assertArtifactReadActive(signal);
				const directory = await stat(physical);
				assertArtifactReadActive(signal);
				return directory.isDirectory() ? ok(physical) : err(invalidDirectory);
			} catch (cause) {
				if (!isRefusedRead(cause) || signal?.aborted === true) throw cause;
				return err(invalidDirectory);
			}
		};
		directLaunchStateHome = (wrapper, packageKind, hostHome) => {
			if (wrapper.kind !== "direct" || packageKind === "snap") return hostHome;
			const launchHome = wrapper.environment.HOME;
			if (launchHome !== undefined && isAbsolute(launchHome)) return launchHome;
			if (wrapper.clearEnvironment || wrapper.unsetEnvironment?.includes("HOME")) return undefined;
			return hostHome;
		};
		inspectLinuxApplication = async (request, signal, host = LINUX_INVENTORY_HOST) => {
			const command = await launchCommand(request, signal);
			if (!command.ok) return command;
			const { argv, workingDirectory, entry } = command.value;
			const wrapper = unwrapDesktopCommand(argv);
			if (wrapper.invalidUnset) return err({
				reason: "desktop_entry_invalid",
				detail: "env unset does not name a variable"
			});
			const directory = await envApplicationDirectory(wrapper.chdir?.path, workingDirectory, signal);
			if (!directory.ok) return directory;
			const applicationDirectory = directory.value;
			const { environment, lookupEnvironment } = launchEnvironment(wrapper, request.environment);
			const found = await resolveProgram(wrapper.program, lookupEnvironment, applicationDirectory ?? workingDirectory);
			if (found === undefined) return err({
				reason: "executable_not_found",
				program: wrapper.program
			});
			if (found.fromRelativeEntry && wrapper.environment.PATH === undefined) return err({
				reason: "executable_on_relative_path",
				program: wrapper.program
			});
			const { path } = found;
			const resolved = await realpath(path).catch(() => null);
			const context = {
				libraryPolicy: desktopLibraryPolicy(request.libraryPolicy),
				host,
				signal,
				limitations: [],
				signingKeys: new Map()
			};
			const { limitations, signingKeys } = context;
			const flatpak = wrapper.kind === "flatpak" ? wrapper.application_id : null;
			const entryFiles = entry === null ? [] : [entry.path, await realpath(entry.path).catch(() => entry.path)];
			const identified = await identifyPackage({
				program: path,
				resolved,
				flatpak,
				entry: entryFiles
			}, context);
			const package_ = request.packageFile === undefined ? identified : {
				...identified,
				...await inspectPackageFile(request.packageFile, identified, host.runQuery, signal)
			};
			const sandboxDirectories = [...package_.kind === "snap" && package_.name !== null ? [join(request.home, "snap", package_.name)] : [], ...package_.kind === "flatpak" && package_.name !== null ? [join(request.home, ".var/app", package_.name)] : []];
			const names = stateNames(package_, wrapper.kind === "flatpak" ? null : path, entry);
			const stateHome = directLaunchStateHome(wrapper, package_.kind, request.home);
			if (stateHome === undefined) limitations.push("The launch prefix provides no absolute HOME after removing the inherited value. The application's default home state paths are unknown. Select known locations with --state-path.");
			return ok({
				inventory: {
					desktop_entry: entry,
					argv: [...argv],
					working_directory: workingDirectory,
					...applicationDirectory === undefined ? {} : { application_working_directory: applicationDirectory },
					executable: {
						path,
						resolved_path: resolved,
						electron_markers: await electronMarkers(resolved, signal)
					},
					package: package_,
					state_directories: await stateDirectories(names, {
						environment,
						home: stateHome
					}, sandboxDirectories)
				},
				...wrapper.index === 0 ? {} : { envProgramIndex: wrapper.index },
				limitations,
				signingKeys
			});
		};
	})))();
}

//#endregion
//#region dist/desktop/TaskReaderProcess.js
var RUNNER_OUTPUT_BYTES, runReaderHere;
function init_TaskReaderProcess() {
	return (init_TaskReaderProcess = __esmMin((() => {
		init_capturedProviderOutput();
		init_OwnedCommand();
		RUNNER_OUTPUT_BYTES = 2 * 1024 * 1024;
		runReaderHere = async (argv, timeoutS, signal) => {
			const [command = "", ...rest] = argv;
			const snapshot = await runOwnedCommand({
				command,
				arguments: rest,
				runId: randomUUID(),
				expectedCommand: null,
				sweepTokenOwnedProcesses: true
			}, {
				timeoutMs: timeoutS * 1e3,
				diagnosticBytes: RUNNER_OUTPUT_BYTES,
				acceptNonZeroExit: true
			}, signal === undefined ? {} : { signal });
			const { exit_code, stdout, stderr } = capturedProviderOutput(snapshot);
			return {
				exit_code: exit_code ?? null,
				stdout,
				stderr,
				timed_out: false
			};
		};
	})))();
}

//#endregion
//#region dist/desktop/X11WindowObserver.js
var XPROP_TIMEOUT_MS, XPROP_MAX_BUFFER, INCOMPLETE_READS, X11WindowObserver;
function init_X11WindowObserver() {
	return (init_X11WindowObserver = __esmMin((() => {
		init_resources();
		init_x11Windows();
		init_DesktopApplicationSession();
		init_ExecFileOutput();
		XPROP_TIMEOUT_MS = 5e3;
		XPROP_MAX_BUFFER = 1024 * 1024;
		INCOMPLETE_READS = 4;
		X11WindowObserver = class {
			#command;
			#environment;
			#known = new Map();
			constructor(command, environment) {
				this.#command = command;
				this.#environment = environment;
			}
			async #xprop(arguments_, signal) {
				try {
					const { stdout } = await execFileOutput(this.#command, arguments_, {
						env: this.#environment,
						timeout: XPROP_TIMEOUT_MS,
						maxBuffer: XPROP_MAX_BUFFER,
						...signal === undefined ? {} : { signal }
					});
					return stdout;
				} catch (cause) {
					if (cause instanceof ExecFileOutputCancelledError) throw new ArtifactReaderFailure("cancelled", "X11 window query cancelled", {
						cause: cause.cause,
						cancellation: { reason: cause.cause }
					});
					if (execFileOutputFailure(cause)?.code === "ENOENT") throw new XpropUnavailableError(this.#command);
					return undefined;
				}
			}
			/** The current client list, or why it cannot be read. */
			async sample(refresh, signal) {
				const root = await this.#xprop([
					"-root",
					"-notype",
					"_NET_CLIENT_LIST",
					"_NET_SUPPORTED"
				], signal);
				if (root === undefined) return { state: "display_unreadable" };
				const ids = parseX11ClientList(root);
				if (ids === undefined) return { state: "no_client_list" };
				const windows = [];
				for (const id of this.#known.keys()) if (!ids.includes(id)) this.#known.delete(id);
				for (const id of ids) {
					const cached = this.#known.get(id);
					const incomplete = cached !== undefined && (cached.properties.class === null || cached.properties.pid === null) && cached.reads < INCOMPLETE_READS;
					if (cached !== undefined && !incomplete && !refresh({
						id,
						...cached.properties
					})) {
						windows.push({
							id,
							...cached.properties
						});
						continue;
					}
					const output = await this.#xprop([
						"-id",
						id,
						...X11_WINDOW_PROPERTY_ARGUMENTS
					], signal);
					if (output === undefined) continue;
					const properties = parseX11WindowProperties(output);
					this.#known.set(id, {
						properties,
						reads: (cached?.reads ?? 0) + 1
					});
					windows.push({
						id,
						...properties
					});
				}
				return {
					state: "listed",
					windows
				};
			}
		};
	})))();
}

//#endregion
//#region dist/desktop/DesktopCaptureProvider.js
var runDesktopTaskReader, createDesktopCaptureProvider;
function init_DesktopCaptureProvider() {
	return (init_DesktopCaptureProvider = __esmMin((() => {
		init_DesktopApplicationSession$1();
		init_DesktopContentStore();
		init_HomeStateWalker();
		init_LinuxApplicationInventory();
		init_ProgramLookup();
		init_TaskReaderProcess();
		init_X11WindowObserver();
		runDesktopTaskReader = runReaderHere;
		createDesktopCaptureProvider = () => ({
			resolveProgram,
			inspectApplication: (request, signal) => inspectLinuxApplication(request, signal),
			observeWindows: (xprop, environment) => new X11WindowObserver(xprop, environment),
			runningApplicationWindows,
			runSession: runDesktopSession,
			walkHome: walkHomeState,
			openContentStore: async (directory, maxFileBytes, maxContentBytes) => {
				const store = new DesktopContentStore(directory, maxFileBytes, maxContentBytes);
				await store.prepare();
				return store;
			}
		});
	})))();
}

//#endregion
//#region dist/desktop/DesktopSessionRequests.js
var QUEUE_PAUSE, QUEUE_RESUME, parseSessionRequest, SessionRequestQueue;
function init_DesktopSessionRequests() {
	return (init_DesktopSessionRequests = __esmMin((() => {
		QUEUE_PAUSE = 16;
		QUEUE_RESUME = 4;
		parseSessionRequest = (line) => {
			const text = line.trim();
			if (text === "stop") return { kind: "stop" };
			const name = text.replace(/^checkpoint(?:\s+|$)/u, "");
			return {
				kind: "checkpoint",
				name: name.length === 0 ? undefined : name
			};
		};
		SessionRequestQueue = class {
			lines;
			#requests = [];
			#paused = false;
			constructor(lines) {
				this.lines = lines;
				lines.on("line", (line) => {
					this.#requests.push(parseSessionRequest(line));
					if (!this.#paused && this.#requests.length >= QUEUE_PAUSE) {
						this.#paused = true;
						lines.pause();
					}
				});
				lines.once("close", () => {
					this.#requests.push({ kind: "stop" });
				});
			}
			next() {
				const request = this.#requests.shift();
				if (this.#paused && this.#requests.length <= QUEUE_RESUME) {
					this.#paused = false;
					this.lines.resume();
				}
				return request;
			}
			close() {
				this.lines.close();
			}
		};
	})))();
}

//#endregion
//#region dist/cli/desktopCaptureCommands.js
var desktopCaptureCommands_exports = /* @__PURE__ */ __exportAll({ registerDesktopCaptureCommands: () => registerDesktopCaptureCommands });
var viewPolicyOption, libraryPolicyOption, positive, captureOptions, checkpointOptions, withholdOf, withStateReaders, withheldExportOptions, withheldRequestOf, registerDesktopExportCommand, registerDesktopTaskCommand, registerDesktopStateCommand, registerDesktopCaptureCommands;
function init_desktopCaptureCommands() {
	return (init_desktopCaptureCommands = __esmMin((() => {
		init_HostPlatform();
		init_libraryPolicy();
		init_desktopViewPolicy();
		init_safeJson();
		init_DesktopApplicationCapture();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_resources();
		init_localPath();
		init_result();
		init_finishAnalysisCommand();
		init_projectCliAnalysisResult();
		init_callerPath();
		init_options();
		init_cliCommandNames();
		init_cliLogging();
		init_desktopCapture();
		init_DesktopCaptureProvider();
		init_DesktopSessionRequests();
		init_commandCancellation();
		init_commandRegistry();
		init_cliProgress();
		init_errorMessage();
		viewPolicyOption = z.string().transform((text, context) => {
			const parsed = safeParseJson(text);
			if (!parsed.ok) {
				context.addIssue({
					code: "custom",
					message: "view-policy must be a JSON object"
				});
				return z.NEVER;
			}
			return parsed.value;
		}).pipe(desktopViewPolicyInputSchema).optional().describe("JSON budget overrides: file_bytes, sqlite_tables, sqlite_rows, sqlite_view_bytes, text_lines, xml_nodes, xml_depth, parsed_bytes, json_depth, zip_entries, zip_entry_bytes, zip_bytes, zip_ratio. Positive safe integers. Applies on this call and to exported readers; no restart. Does not recover bytes the capture never retained or raise Evidence/worker limits.");
		libraryPolicyOption = z.string().transform((text, context) => {
			const parsed = safeParseJson(text);
			if (!parsed.ok) {
				context.addIssue({
					code: "custom",
					message: "library-policy must be a JSON object"
				});
				return z.NEVER;
			}
			return parsed.value;
		}).pipe(desktopLibraryPolicyInputSchema).optional().describe("JSON dependency inventory budgets: libraries (default 512, also per-image DT_NEEDED entries), search_path_entries (16 distinct offsets per DT_RUNPATH/DT_RPATH kind), string_bytes (4096 per string including NUL), table_bytes (1048576 per ELF program/dynamic table). Positive safe integers; applies to this capture without restart. Does not raise content or query-output budgets.");
		positive = (fallback) => cliDecimalField(z.int().positive().default(fallback));
		captureOptions = z.object({
			libraryPolicy: libraryPolicyOption,
			desktopEntry: z.string().min(1).optional().describe("Desktop entry id (org.xfce.mousepad) or absolute .desktop path"),
			executable: z.string().min(1).optional().describe("Executable path or program name on PATH, instead of a desktop entry"),
			argument: z.array(z.string()).optional().describe("Argument appended to the launch command (repeatable)"),
			output: localPathStringSchema.describe("New or empty directory for capture.json and retained content"),
			statePath: z.array(localPathStringSchema).optional().describe("File or directory whose starting content is retained in addition to the application's state directories; a file brings its SQLite write-ahead log and rollback journal (repeatable)"),
			exclude: z.array(localPathStringSchema).optional().describe("Path left out of every checkpoint walk (repeatable)"),
			maxDurationSeconds: positive(DESKTOP_CAPTURE_DEFAULTS.maxDurationSeconds).describe("Stop the session after this many seconds"),
			maxEntries: positive(DESKTOP_CAPTURE_DEFAULTS.maxEntries).describe("Maximum paths recorded per checkpoint walk"),
			maxFileBytes: positive(DESKTOP_CAPTURE_DEFAULTS.maxFileBytes).describe("Largest file whose content is retained"),
			maxContentBytes: positive(DESKTOP_CAPTURE_DEFAULTS.maxContentBytes).describe("Total retained content"),
			packageFile: localPathStringSchema.optional().describe("The .deb file the application was installed from; its control fields, SHA-256 and size are recorded, never the file")
		});
		checkpointOptions = {
			seedCheckpoint: z.string().optional().describe("Checkpoint whose state seeds the bundle; the baseline by default"),
			endCheckpoint: z.string().optional().describe("Checkpoint whose state a task must pass on; the capture's last by default"),
			withholdFrom: z.string().optional().describe("Checkpoint marked before a sign-in or licence activation; files under the owned paths that changed after it, up to --withhold-to, are withheld from the seed and the draft"),
			withholdTo: z.string().optional().describe("Checkpoint marked after the sign-in or licence activation"),
			withholdPath: z.array(z.string()).optional().describe("Home-relative file under the owned paths to withhold as sign-in or licence state, such as one written at first launch; repeat for more")
		};
		withholdOf = (options) => ({
			from: options.withholdFrom,
			to: options.withholdTo,
			paths: options.withholdPath ?? []
		});
		withStateReaders = async (environment, signal, operation, run) => {
			const [{ createSqliteDatabaseService }, { readSqliteStateView }, { dumpDconfDatabase }] = await Promise.all([
				import("./sqlite-BpLyNhmr.js").then((n) => (n.init_sqlite(), n.sqlite_exports)),
				import("./application__desktop__DesktopSqliteState-qsbnLfbF.js"),
				import("./desktop__DconfDatabaseReader-DlqiH36K.js")
			]);
			const sqlite = createSqliteDatabaseService(environment);
			const resources = new ArtifactResourceScope();
			return finishAnalysisCommand(async () => {
				const result = await run({
					resources,
					sqlite: (database, readSignal, policy) => readSqliteStateView(sqlite, database, readSignal, policy),
					dconf: (database, readSignal) => dumpDconfDatabase(database, environment, readSignal)
				});
				return result instanceof AnalysisError ? err(result) : ok(result);
			}, { close: async () => {
				const failures = [];
				try {
					await resources.close();
				} catch (cause) {
					failures.push(cause);
				}
				try {
					await sqlite.close();
				} catch (cause) {
					failures.push(cause);
				}
				if (operation === "export_desktop_application") {
					try {
						const { OwnedWorkerRuntime } = await import("./OwnedWorkerRuntime-_ZkKBS_4.js").then((n) => (n.init_OwnedWorkerRuntime(), n.OwnedWorkerRuntime_exports));
						await OwnedWorkerRuntime.retryPending();
					} catch (cause) {
						failures.push(cause);
					}
				}
				if (failures.length === 1) throw failures[0];
				if (failures.length > 1) {
					const typed = failures.map((cause) => {
						if (cause instanceof AnalysisError) return cause;
						const observation = cause instanceof ArtifactReaderFailure ? ArtifactReaderFailure.cleanupObservation(cause, []) : {
							resources: [],
							reason: errorMessage(cause)
						};
						const failure = new ProviderCleanupError("rea-desktop", observation.resources, { reason: observation.reason }, {
							operation,
							cause
						});
						bindArtifactFileCleanup(cause, failure);
						return failure;
					});
					const combined = analysisErrorWithCleanupFailure(typed[0], typed[1], operation);
					combined.bindCleanupDependencies(typed);
					throw combined;
				}
			} }, "rea-desktop", operation, signal).then(projectCliAnalysisResult);
		};
		withheldExportOptions = {
			seedWithheld: z.boolean().default(false).describe("Seed the withheld files after all, which needs a seed_sign_in consent in --consent"),
			consent: localPathStringSchema.optional().describe("consent.json holding the person's consents, which the bundle ships"),
			withheldCopy: localPathStringSchema.optional().describe("New or empty folder outside the bundle the withheld files are copied into, for whoever supplies them at run time")
		};
		withheldRequestOf = (options) => ({
			withhold: withholdOf(options),
			seedWithheld: options.seedWithheld,
			consent: options.consent === undefined ? undefined : absoluteCallerPath(options.consent),
			withheldCopy: options.withheldCopy === undefined ? undefined : absoluteCallerPath(options.withheldCopy)
		});
		registerDesktopExportCommand = (cli, logger, environment) => {
			registerCliCommand(cli, CLI_COMMANDS.exportDesktopApplication, {
				description: "Export a desktop application capture folder as an agentenv computer app bundle: class, env.toml, skill and seed",
				args: z.object({
					capture: localPathStringSchema.describe("Folder written by capture-desktop-application"),
					directory: localPathStringSchema.describe("New or empty bundle directory")
				}),
				options: z.object({
					viewPolicy: viewPolicyOption,
					name: z.string().optional().describe("Environment name; defaults to one derived from the application"),
					task: z.array(localPathStringSchema).optional().describe("Task file to validate against the capture and add with its verifier and eval; repeat for several tasks, each checked at its own end"),
					taskEnd: z.array(z.string()).optional().describe("NAME=CHECKPOINT: the checkpoint task NAME's end state is read at, instead of --end-checkpoint; a checkpoint near-NAME, when taken, must fail one of its checks"),
					packageUrl: z.string().optional().describe("http or https URL the computer downloads the captured --package-file from when the bundle is put, for an application installed from a .deb file"),
					downloadInstall: localPathStringSchema.optional().describe("JSON file naming the AppImage or tarball a build computer unpacked the application from: kind, desktop_entry, url, sha256, architecture, and a tarball's program and name"),
					extraPackage: z.array(z.string()).optional().describe("Ubuntu 24.04 archive package installed beside the application, such as a runtime piece its package does not install; repeat for more"),
					syntheticSeed: z.boolean().default(false).describe("The seed was made for the task, as in a build computer, not taken from the user's own data; the README says so instead of keeping the bundle local"),
					screens: localPathStringSchema.optional().describe("Folder holding checkpoint screenshots for screen-judge examples."),
					...withheldExportOptions,
					...checkpointOptions
				}),
				run: ({ args, options }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.exportDesktopApplication, async () => {
					const { exportDesktopApplication } = await import("./application__desktop__DesktopApplicationExport-DTgpAlMq.js");
					return withStateReaders(environment, signal, "export_desktop_application", (readers) => exportDesktopApplication({
						capture: absoluteCallerPath(args.capture),
						directory: absoluteCallerPath(args.directory),
						name: options.name,
						tasks: (options.task ?? []).map((path) => absoluteCallerPath(path)),
						taskEnds: options.taskEnd,
						packageUrl: options.packageUrl,
						downloadInstall: options.downloadInstall === undefined ? undefined : absoluteCallerPath(options.downloadInstall),
						extraPackages: options.extraPackage,
						seedCheckpoint: options.seedCheckpoint,
						endCheckpoint: options.endCheckpoint,
						syntheticSeed: options.syntheticSeed,
						screens: options.screens === undefined ? undefined : absoluteCallerPath(options.screens),
						...withheldRequestOf(options),
						viewPolicy: options.viewPolicy
					}, {
						...readers,
						taskReader: runDesktopTaskReader
					}, signal));
				}))
			});
		};
		registerDesktopTaskCommand = (cli, logger, environment) => {
			registerCliCommand(cli, CLI_COMMANDS.describeDesktopApplicationTask, {
				description: "Describe how a desktop application capture's files changed from the seed checkpoint to the end, with suggested checks and a task draft to complete for export-desktop-application --task",
				args: z.object({ capture: localPathStringSchema.describe("Folder written by capture-desktop-application") }),
				options: z.object({
					...checkpointOptions,
					viewPolicy: viewPolicyOption
				}),
				run: ({ args, options }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.describeDesktopApplicationTask, async () => {
					const { draftDesktopApplicationTask } = await import("./application__desktop__DesktopTaskDraft-61dJ7DXu.js");
					return withStateReaders(environment, signal, "describe_desktop_application_task", (readers) => draftDesktopApplicationTask(absoluteCallerPath(args.capture), readers, signal, {
						seed: options.seedCheckpoint,
						end: options.endCheckpoint,
						withhold: withholdOf(options)
					}, options.viewPolicy));
				}))
			});
		};
		registerDesktopStateCommand = (cli, logger, environment) => {
			registerCliCommand(cli, CLI_COMMANDS.inspectDesktopApplicationState, {
				description: "Read a desktop application capture folder into the application's state: roles, typed JSON views of each version and kinds of change",
				args: z.object({ capture: localPathStringSchema.describe("Folder written by capture-desktop-application") }),
				options: z.object({
					viewPolicy: viewPolicyOption,
					statePath: z.array(z.string().min(1)).optional().describe("Exact original captured path to inspect (repeatable); omission examines every path")
				}),
				run: ({ args, options }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.inspectDesktopApplicationState, async () => {
					const { inspectDesktopApplicationState } = await import("./DesktopApplicationState-DwjkVBfu.js").then((n) => (n.init_DesktopApplicationState(), n.DesktopApplicationState_exports));
					return withStateReaders(environment, signal, "inspect_desktop_application_state", (readers) => inspectDesktopApplicationState(absoluteCallerPath(args.capture), readers, signal, {
						viewPolicy: options.viewPolicy,
						paths: options.statePath
					}));
				}))
			});
		};
		registerDesktopCaptureCommands = (cli, logger, environment) => {
			registerDesktopStateCommand(cli, logger, environment);
			registerDesktopExportCommand(cli, logger, environment);
			registerDesktopTaskCommand(cli, logger, environment);
			registerCliCommand(cli, CLI_COMMANDS.captureDesktopApplication, {
				description: "Launch a Linux desktop application, watch it while it is used and record its windows and state at checkpoints read from stdin",
				options: captureOptions,
				run: ({ options }) => withCommandCancellation((signal) => logCliCommand(logger, CLI_COMMANDS.captureDesktopApplication, async () => {
					const requests = new SessionRequestQueue(createInterface({
						input: process.stdin,
						terminal: false
					}));
					try {
						return await captureDesktopApplication({
							desktopEntry: options.desktopEntry,
							executable: options.executable,
							arguments: options.argument ?? [],
							output: options.output,
							statePaths: options.statePath ?? [],
							excludes: options.exclude ?? [],
							...options.libraryPolicy === undefined ? {} : { libraryPolicy: options.libraryPolicy },
							maxDurationSeconds: options.maxDurationSeconds,
							maxEntries: options.maxEntries,
							maxFileBytes: options.maxFileBytes,
							maxContentBytes: options.maxContentBytes,
							packageFile: options.packageFile === undefined ? undefined : absoluteCallerPath(options.packageFile)
						}, {
							platform: HOST_PLATFORM.platform,
							environment,
							callerDirectory: process.cwd(),
							desktop: createDesktopCaptureProvider(),
							nextRequest: () => requests.next(),
							report: async (message, event) => {
								const progress = { rea_progress: {
									phase: "desktop_capture",
									message,
									...event === undefined ? {} : { event }
								} };
								writeCliProgressLine(progress.rea_progress);
							}
						}, signal);
					} finally {
						requests.close();
					}
				}))
			});
		};
	})))();
}

//#endregion
export { DESKTOP_OPERATION, DESKTOP_PROVIDER, canonicalCallerPath, desktopCaptureCommands_exports, desktopOperationFailure, init_DesktopCaptureRefusals, init_canonicalCallerPath, init_desktopCaptureCommands };