import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisArtifactChangedError, AnalysisCancelledError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisProtocolError, AnalysisResourceConstraintError, AnalysisTimeoutError, AnalysisUnsupportedTargetError, OwnerCancellation, cancelledBy, carriedReason, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation, init_jsonValue, init_sha256Hex, isAborted, jsonObjectSchema, jsonValueSchema, primaryAnalysisError, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, appendCallerPath, init_callerPath, isQualifiedCallerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceRetryFailure, ArtifactResourceScope, OwnedFileHandle, RegularFileAdmissionFailure, RegularFileCancelled, RegularFileCleanupFailure, RegularFileOperationCancelled, init_AnalysisCleanupLease, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedFileHandle, init_OwnedRegularFile, init_RegularFile, init_resources, openRegularFile, regularFileCancellation, sameRegularFileState } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, analysisErrorWithCleanupFailure, ellipsisExcerpt, init_analysisErrorCleanup, init_excerpt, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { RuntimeControlUnavailableError, init_runtimeControlUnavailableError, runtimeControlCapabilityError } from "./WindowsNativeLoader-CCqowxwW.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { ExecFileOutputCancelledError, execFileFailureCapturedOutput, execFileOutput, execFileOutputFailure, init_ExecFileOutput, init_launchFailure, launcherFailureOf } from "./ExecFileOutput-YDVPmL3I.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { analyzeWithService, contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { finalizedResult, init_runOwned, runOwned } from "./runOwned-BkKv5e_3.js";
import { init_options, publishArgvInput } from "./options-BYpy7iiK.js";
import { init_pngHeader, readPngHeaderDimensions } from "./sessionToolContracts-D9XcfL6p.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { executeProviderOperation, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { ProviderStartupDeadline, init_ProviderDeadline } from "./ProviderDeadline-BXAnhNBa.js";
import { OwnedCommandFailure, OwnedCommandStdoutBytes, init_OwnedCommand, preparationHostCapacityFailure, prepareOwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { bindProcessInspectionCancellations, init_OwnedCommandCleanup, processInspectionCancellationError, processInspectionFailure, retainArtifactCommandCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { classifyLaunchFailure, init_classifyProviderOutcome } from "./classifyProviderOutcome-BMRoGrMs.js";
import { hashStableFile, init_StableFileHash, stableFileHashCause } from "./StableFileHash-BELT4STG.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { analysisClientFailureForOperation, init_AnalysisClientFailure } from "./AnalysisClientFailure-DEt-O8Hp.js";
import { init_providerConfigurationRefusal, providerConfigurationRefusal } from "./providerConfigurationRefusal-C9XQsrHG.js";
import { findWindowsExecutable, init_WindowsExecutable } from "./WindowsExecutable-CNcRot2V.js";
import { ADB_DEVICE_OBSERVATION_AUTHORITY, ADB_DEVICE_STATES, ADB_TOOL_CONTRACTS, activityExtraCliEntrySchema, adbDeviceListObservationSchema, adbDisplayPartialObservationSchema, adbRequestSchema, adbResultSchemas, init_adbDeviceAnalysis, init_adbToolContracts, init_adbTransportIdentity, parseAdbTransportIdentity } from "./adbToolContracts-Cu1lFp9U.js";
import { constants } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { z } from "zod";
import { isUtf8 } from "node:buffer";
import { createHash, randomUUID } from "node:crypto";
import { access, copyFile, link, lstat, mkdir, mkdtemp, open, rm, rmdir, stat, writeFile } from "node:fs/promises";

//#region dist/application/adb/AdbDeviceAnalysisService.js
var AdbDeviceAnalysisService, projectDeviceList;
function init_AdbDeviceAnalysisService() {
	return (init_AdbDeviceAnalysisService = __esmMin((() => {
		init_adbDeviceAnalysis();
		init_result();
		init_analysisErrorCore();
		init_jsonValue();
		init_ProviderOperationExecution();
		AdbDeviceAnalysisService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			/** Run one caller-selected ADB request and retain device provenance inline. */
			async execute(operation, input, options) {
				return executeProviderOperation(operation, input, options, adbRequestSchema, { execute: async (request, options) => {
					const result = await this.provider.execute(request, options);
					if (!result.ok) return result;
					const observed = {
						...result.value,
						authority: result.value.authority ?? "external-service"
					};
					return request.operation === "list_adb_devices" ? projectDeviceList(observed) : ok(observed);
				} }, "observed");
			}
		};
		projectDeviceList = (execution) => {
			const json = jsonValueSchema.safeParse(execution.result);
			const parsed = json.success ? adbDeviceListObservationSchema.safeParse(json.data) : json;
			if (!parsed.success) return err(new AnalysisOutputError("list_adb_devices", "ADB provider returned malformed device-list identity facts.", { cause: parsed.error }));
			let numericUnavailable = false;
			let invalidIdentity = false;
			const devices = parsed.data.devices.map(({ transport_identity, ...device }) => {
				const text = transport_identity.status === "reported" ? transport_identity.decimal : null;
				const safe = text !== null && (text.length < 16 || text.length === 16 && text <= "9007199254740991");
				if (text !== null && !safe) numericUnavailable = true;
				if (transport_identity.status === "invalid") invalidIdentity = true;
				return {
					...device,
					transport_id: safe ? Number(text) : null,
					transport_id_text: text,
					transport_id_status: transport_identity.status
				};
			});
			return ok({
				...execution,
				result: {
					...parsed.data,
					devices
				},
				rawResult: {
					...execution.rawResult === null ? {} : { provider_raw_result: execution.rawResult },
					transport_id_observations: parsed.data.devices.map(({ serial, transport_identity }, row) => ({
						row,
						serial,
						source_line: transport_identity.source_line,
						source_token: transport_identity.source_token,
						status: transport_identity.status,
						reason: transport_identity.status === "invalid" ? transport_identity.reason : transport_identity.status === "not_reported" ? "not_reported" : null
					}))
				},
				limitations: [
					...execution.limitations,
					...numericUnavailable ? ["A reported transport ID cannot be represented as a safe JSON integer. transport_id_text retains its exact identity; existing operations select the device by serial."] : [],
					...invalidIdentity ? ["Some transport ID fields were invalid. Known device facts remain available; raw_result.transport_id_observations retains source tokens and reasons."] : []
				]
			});
		};
	})))();
}

//#endregion
//#region dist/adb/AdbProviderIdentity.js
var ADB_PROVIDER_IDENTITY;
function init_AdbProviderIdentity() {
	return (init_AdbProviderIdentity = __esmMin((() => {
		ADB_PROVIDER_IDENTITY = {
			id: "adb",
			name: "Android Debug Bridge",
			version: null
		};
	})))();
}

//#endregion
//#region dist/adb/AdbUnparsedLines.js
var UNPARSED_LINE_SAMPLE_LIMIT, collectUnparsedLines;
function init_AdbUnparsedLines() {
	return (init_AdbUnparsedLines = __esmMin((() => {
		UNPARSED_LINE_SAMPLE_LIMIT = 10;
		collectUnparsedLines = () => {
			const sample = [];
			let total = 0;
			return {
				add: (line) => {
					total += 1;
					if (sample.length < 10) sample.push(line);
				},
				facts: () => ({
					sample,
					total
				})
			};
		};
	})))();
}

//#endregion
//#region dist/adb/AdbNumericIssues.js
var collectNumericIssues;
function init_AdbNumericIssues() {
	return (init_AdbNumericIssues = __esmMin((() => {
		init_AdbUnparsedLines();
		collectNumericIssues = () => {
			const sample = [];
			let total = 0;
			return {
				add: (issue) => {
					total += 1;
					if (sample.length < 10) sample.push(issue);
				},
				append: (issues) => {
					total += issues.total;
					for (const issue of issues.sample) {
						if (sample.length === 10) break;
						sample.push(issue);
					}
				},
				facts: () => ({
					sample,
					total
				})
			};
		};
	})))();
}

//#endregion
//#region dist/adb/AdbFilesystemAdmission.js
var adbFilesystemErrorCode, adbInputFileError;
function init_AdbFilesystemAdmission() {
	return (init_AdbFilesystemAdmission = __esmMin((() => {
		init_analysisErrorCore();
		adbFilesystemErrorCode = (cause) => cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
		adbInputFileError = async (operation, field, selectedPath, absolutePath) => {
			let info;
			try {
				info = await stat(absolutePath);
			} catch (cause) {
				const code = adbFilesystemErrorCode(cause);
				const message = code === "ENOENT" || code === "ENOTDIR" ? "The selected file does not exist or a parent is not a directory." : "The selected file could not be inspected.";
				return new AnalysisInputError(operation, { cause }, [{
					path: [field],
					reason: "invalid_value",
					message,
					observed: {
						path: selectedPath,
						...code === undefined ? {} : { code }
					}
				}]);
			}
			if (!info.isFile()) return new AnalysisInputError(operation, undefined, [{
				path: [field],
				reason: "invalid_value",
				message: "The selected path is not a regular file.",
				observed: { path: selectedPath }
			}]);
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/adb/AdbProcess.js
var ADB_TERMINATION, exitedRun, failureOutput, runAdbProcess, adbRunFailureError;
function init_AdbProcess() {
	return (init_AdbProcess = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCancellation();
		init_analysisErrorCleanup();
		init_analysisErrorCore();
		init_capturedProviderOutput();
		init_DarwinProcessRunTokenReader();
		init_launchFailure();
		init_OwnedCommand();
		init_OwnedCommandCleanup();
		ADB_TERMINATION = {
			signal: "SIGTERM",
			graceMs: 5e3
		};
		exitedRun = (snapshot, stdout, exitCode) => {
			let capturedOutput;
			return {
				stdout,
				stderr: snapshot.stderr.text,
				exitCode,
				get capturedOutput() {
					return capturedOutput ??= {
						stdout: stdout.toString("utf8"),
						stderr: snapshot.stderr.text,
						stdout_bytes: stdout.byteLength,
						stderr_bytes: snapshot.stderr.observedBytes,
						exit_code: exitCode,
						signal: null,
						truncated: false
					};
				}
			};
		};
		failureOutput = (command, cause, stdout) => {
			if (command?.snapshot == null) {
				const preparation = processInspectionFailure(cause);
				return preparation instanceof DarwinProcessOwnershipInspectionError ? preparation.capturedOutput : undefined;
			}
			const observed = capturedProviderOutput(command.snapshot);
			return {
				...observed,
				stdout: stdout.toString("utf8"),
				stdout_bytes: stdout.byteLength,
				truncated: observed.truncated || command.reason === "output-limit" || command.snapshot.outputIncomplete === true
			};
		};
		runAdbProcess = async (host, arguments_, limits, signal) => {
			const stdout = new OwnedCommandStdoutBytes();
			let exited;
			try {
				await prepareOwnedCommand(signal);
				await runOwnedCommand({
					command: host.binary,
					arguments: arguments_,
					runId: `rea-adb-${randomUUID()}`,
					hostEnvironment: host.environment
				}, {
					timeoutMs: limits.timeoutMs,
					diagnosticBytes: limits.maxOutputBytes,
					stdout,
					maxStdoutBytes: limits.maxOutputBytes,
					acceptNonZeroExit: true,
					termination: ADB_TERMINATION,
					observeCompleted: (snapshot) => {
						if (typeof snapshot.exitCode === "number") exited = exitedRun(snapshot, stdout.bytes, snapshot.exitCode);
					}
				}, {
					signal,
					...host.launcher === undefined ? {} : { launcher: host.launcher }
				});
				if (exited === undefined) throw new OwnedCommandFailure("process", "adb completed without an exit status");
				return {
					ok: true,
					run: exited
				};
			} catch (cause) {
				const command = cause instanceof OwnedCommandFailure ? cause : undefined;
				return {
					ok: false,
					failure: {
						cause,
						command,
						launch: launcherFailureOf(command?.processError ?? cause) ?? preparationHostCapacityFailure(cause),
						capturedOutput: exited === undefined ? failureOutput(command, cause, stdout.bytes) : exited.capturedOutput,
						exited
					}
				};
			}
		};
		adbRunFailureError = (operation, host, failure, classify) => {
			const { cause, command } = failure;
			const completed = failure.exited === undefined ? undefined : classify(failure);
			const cleanups = retainArtifactCommandCleanup(cause, host.resources, operation, failure.exited === undefined || completed !== undefined ? undefined : { capturedOutput: failure.exited.capturedOutput });
			const inspectionCancellation = command === undefined || command.preparationFailure !== undefined ? processInspectionCancellationError(cause, operation) : undefined;
			const commandCancellation = command?.reason === "cancelled" && command.cancellation !== undefined ? inspectionCancellation ?? cancelledBy(operation, carriedReason(command.cancellation.reason), failure.capturedOutput === undefined ? {} : { capturedOutput: failure.capturedOutput }) : inspectionCancellation;
			let primary;
			if (completed !== undefined) primary = commandCancellation === undefined ? completed : analysisErrorWithCancellation(completed, commandCancellation);
			else if (commandCancellation !== undefined) primary = commandCancellation;
			else if (command === undefined && cause instanceof AnalysisError) primary = cause;
			else if (cleanups[0] !== undefined) primary = cleanups[0];
			else primary = classify(failure) ?? new AnalysisProtocolError(`adb failed for ${operation}`, { cause });
			for (const cleanup of cleanups) if (cleanup !== primary) primary = analysisErrorWithCleanupDependencies(primary, cleanup, operation);
			return bindProcessInspectionCancellations(cause, primary, operation);
		};
	})))();
}

//#endregion
//#region dist/adb/AdbShellOutput.js
var PROCESS_LINE, safeInteger, parseProcessListOutput, FEATURE_LINE, parseFeatureListOutput, SERVICE_LINE, parseServiceListOutput, SIZE_DECLARATION, SIZE_VALUE, DENSITY_DECLARATION, DENSITY_VALUE, DENSITY_BARE, parseWmSizeOutput, parseWmDensityOutput, parseWindowFocusOutput, DETAIL_LINE, absentInstallerOrName, parseDumpsysPackageOutput, parseSettingsGetOutput, parseBugreportCopiedPath, parseSha256sumOutput, packageChangeFailureReason, parsePackageChangeOutput, parseResolveActivityOutput, parseAmStartOutput;
function init_AdbShellOutput() {
	return (init_AdbShellOutput = __esmMin((() => {
		init_AdbNumericIssues();
		init_AdbUnparsedLines();
		PROCESS_LINE = /^(\S+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(\S+)\s+(\S+) (.+)$/u;
		safeInteger = (text) => {
			const value = Number(text);
			return Number.isSafeInteger(value) ? value : null;
		};
		parseProcessListOutput = (stdout) => {
			const processes = [];
			const unparsed = collectUnparsedLines();
			let columns = null;
			for (const line of stdout.split(/\r?\n/u)) {
				if (line.trim() === "") continue;
				if (/^USER\s+PID\s+PPID\b/u.test(line)) {
					columns = line.trim();
					continue;
				}
				const match = PROCESS_LINE.exec(line);
				if (match === null) {
					unparsed.add(line);
					continue;
				}
				const pid = safeInteger(match[2]);
				const ppid = safeInteger(match[3]);
				const rss = safeInteger(match[5]);
				if (pid === null || ppid === null || rss === null) unparsed.add(line);
				if (pid === null) continue;
				processes.push({
					user: match[1],
					pid,
					ppid,
					rss,
					state: match[8],
					name: match[9]
				});
			}
			return {
				columns,
				processes,
				unparsedLines: unparsed.facts()
			};
		};
		FEATURE_LINE = /^feature:([^=\s]+)(?:=(0x[0-9a-fA-F]+|\d+))?$/u;
		parseFeatureListOutput = (stdout) => {
			const features = [];
			const unparsed = collectUnparsedLines();
			for (const rawLine of stdout.split(/\r?\n/u)) {
				const line = rawLine.trim();
				if (line === "") continue;
				const match = FEATURE_LINE.exec(line);
				if (match === null) {
					unparsed.add(rawLine);
					continue;
				}
				const version = match[2] === undefined ? null : safeInteger(match[2]);
				if (match[2] !== undefined && version === null) unparsed.add(rawLine);
				features.push({
					name: match[1],
					version
				});
			}
			return {
				features,
				unparsedLines: unparsed.facts()
			};
		};
		SERVICE_LINE = /^\s*(?:\d+\s+)?([A-Za-z0-9._$/-]+):\s*\[([^\]]*)\]\s*$/u;
		parseServiceListOutput = (stdout) => {
			const services = [];
			const unparsed = collectUnparsedLines();
			for (const rawLine of stdout.split(/\r?\n/u)) {
				const line = rawLine.trimEnd();
				if (line.trim() === "" || /^Found \d+ services:/u.test(line.trim())) continue;
				const match = SERVICE_LINE.exec(line);
				if (match === null) {
					if (line.trim() !== "") unparsed.add(line.trim());
					continue;
				}
				services.push({
					name: match[1],
					interface: match[2] === "" ? null : match[2]
				});
			}
			return {
				services,
				unparsedLines: unparsed.facts()
			};
		};
		SIZE_DECLARATION = /^(Physical|Override) size:(.*)$/u;
		SIZE_VALUE = /^\s+(\d+)x(\d+)$/u;
		DENSITY_DECLARATION = /^(Physical|Override) density:(.*)$/u;
		DENSITY_VALUE = /^\s+(\d+)$/u;
		DENSITY_BARE = /^(\d+)$/u;
		parseWmSizeOutput = (stdout) => {
			let physical = null;
			let override = null;
			let physicalDeclared = false;
			const issues = collectNumericIssues();
			for (const rawLine of stdout.split(/\r?\n/u)) {
				const declaration = SIZE_DECLARATION.exec(rawLine.trim());
				if (declaration === null) continue;
				const field = declaration[1] === "Physical" ? "physical_size" : "override_size";
				if (field === "physical_size") physicalDeclared = true;
				const match = SIZE_VALUE.exec(declaration[2]);
				const width = match === null ? null : safeInteger(match[1]);
				const height = match === null ? null : safeInteger(match[2]);
				const reason = match === null ? "invalid_format" : width === null || height === null ? "unsafe_integer" : width <= 0 || height <= 0 ? "nonpositive" : null;
				const value = reason === null && width !== null && height !== null ? {
					width,
					height
				} : null;
				if (reason !== null) issues.add({
					command: "wm size",
					field,
					reason,
					raw_line: rawLine
				});
				if (field === "physical_size") physical = value;
				else override = value;
			}
			return {
				physical,
				override,
				physicalDeclared,
				numericIssues: issues.facts()
			};
		};
		parseWmDensityOutput = (stdout) => {
			let physical = null;
			let override = null;
			let bare = null;
			let physicalDeclared = false;
			let bareDeclared = false;
			const issues = collectNumericIssues();
			for (const rawLine of stdout.split(/\r?\n/u)) {
				const trimmed = rawLine.trim();
				const declaration = DENSITY_DECLARATION.exec(trimmed);
				const bareMatch = declaration === null ? DENSITY_BARE.exec(trimmed) : null;
				if (declaration === null && (bareMatch === null || bareDeclared)) continue;
				const field = declaration?.[1] === "Override" ? "override_density" : "physical_density";
				const match = declaration === null ? bareMatch : DENSITY_VALUE.exec(declaration[2]);
				const value = match === null ? null : safeInteger(match[1]);
				const reason = match === null ? "invalid_format" : value === null ? "unsafe_integer" : value <= 0 ? "nonpositive" : null;
				const admitted = reason === null ? value : null;
				if (reason !== null) issues.add({
					command: "wm density",
					field,
					reason,
					raw_line: rawLine
				});
				if (declaration === null) {
					bareDeclared = true;
					bare = admitted;
				} else if (field === "physical_density") {
					physicalDeclared = true;
					physical = admitted;
				} else override = admitted;
			}
			return {
				physical: physicalDeclared ? physical : bare,
				override,
				numericIssues: issues.facts()
			};
		};
		parseWindowFocusOutput = (stdout) => {
			const contexts = [];
			const observedLines = [];
			let current;
			for (const line of stdout.split(/\r?\n/u)) {
				const trimmed = line.trim();
				if (trimmed.startsWith("Display:")) {
					current = {
						scope: "display",
						display_id: /^Display:\s+mDisplayId=(-?[0-9]+)(?:\s|$)/u.exec(trimmed)?.[1] ?? null,
						header_line: line,
						declarations: []
					};
					contexts.push(current);
					observedLines.push(line);
					continue;
				}
				const field = trimmed.startsWith("mCurrentFocus=") ? "mCurrentFocus" : trimmed.startsWith("mFocusedApp=") ? "mFocusedApp" : undefined;
				if (field === undefined) continue;
				if (current === undefined) {
					current = {
						scope: "unscoped",
						display_id: null,
						header_line: null,
						declarations: []
					};
					contexts.push(current);
				}
				const value = trimmed.slice(field.length + 1).trim();
				current.declarations.push({
					field,
					value: value === "null" ? null : value,
					raw_line: line
				});
				observedLines.push(line);
			}
			const windows = contexts.length === 1 ? contexts[0].declarations.filter(({ field }) => field === "mCurrentFocus") : [];
			const apps = contexts.length === 1 ? contexts[0].declarations.filter(({ field }) => field === "mFocusedApp") : [];
			const declared = contexts.some(({ declarations }) => declarations.length > 0);
			const summary = !declared ? "unavailable" : contexts.length === 1 && windows.length <= 1 && apps.length <= 1 ? "single_context" : "ambiguous";
			return {
				focused_window: summary === "single_context" ? windows[0]?.value ?? null : null,
				focused_app: summary === "single_context" ? apps[0]?.value ?? null : null,
				focus_summary: summary,
				focus_contexts: contexts,
				observed_lines: observedLines
			};
		};
		DETAIL_LINE = /^\s+([A-Za-z][A-Za-z0-9_]*)=(.*)$/u;
		absentInstallerOrName = (value) => value === "" || value === "null" ? null : value;
		parseDumpsysPackageOutput = (stdout) => {
			const details = {
				versionName: null,
				versionCode: null,
				firstInstallTime: null,
				lastUpdateTime: null,
				installerPackageName: null,
				userId: null,
				pkgFlags: null
			};
			const issues = collectNumericIssues();
			let permissionsIndent = null;
			let hasPermissionsSection = false;
			let permissions = 0;
			let parsedPackageAvailable = null;
			for (const line of stdout.split(/\r?\n/u)) {
				if (/^\s*Hidden system packages:\s*$/u.test(line)) break;
				const permissionsHeader = /^(\s*)requested permissions:\s*$/u.exec(line);
				if (permissionsHeader !== null) {
					hasPermissionsSection = true;
					permissionsIndent = permissionsHeader[1].length;
					continue;
				}
				if (permissionsIndent !== null) {
					const indentation = /^\s*/u.exec(line)[0].length;
					if (line.trim() !== "" && indentation > permissionsIndent) {
						permissions += 1;
						continue;
					}
					if (line.trim() === "" && indentation > permissionsIndent) continue;
					permissionsIndent = null;
				}
				const match = DETAIL_LINE.exec(line);
				if (match === null) continue;
				const key = match[1];
				const rawValue = match[2];
				const value = rawValue.trim();
				if (key === "pkg" && parsedPackageAvailable === null) {
					if (value === "null") parsedPackageAvailable = false;
					else if (value.startsWith("Package{") && value.endsWith("}")) parsedPackageAvailable = true;
				} else if (key === "versionName" && details.versionName === null) details.versionName = rawValue;
				else if (key === "versionCode") {
					const parsed = /^(-?\d+)(?=\s|$)/u.exec(value);
					if (parsed === null) issues.add({
						command: "dumpsys package",
						field: "version_code",
						reason: "invalid_format",
						raw_line: line
					});
					else if (details.versionCode === null) details.versionCode = parsed[1];
				} else if (key === "firstInstallTime" && details.firstInstallTime === null) details.firstInstallTime = value === "" ? null : value;
				else if (key === "lastUpdateTime" && details.lastUpdateTime === null) details.lastUpdateTime = value === "" ? null : value;
				else if (key === "installerPackageName" && details.installerPackageName === null) details.installerPackageName = absentInstallerOrName(value);
				else if (key === "userId" || key === "appId") {
					const parsed = /^(\d+)(?:\s|$)/u.exec(value);
					const admitted = parsed === null ? null : safeInteger(parsed[1]);
					if (admitted === null) issues.add({
						command: "dumpsys package",
						field: "user_id",
						reason: parsed === null ? "invalid_format" : "unsafe_integer",
						raw_line: line
					});
					else if (details.userId === null) details.userId = admitted;
				} else if (key === "pkgFlags" && details.pkgFlags === null) details.pkgFlags = value === "" ? null : value;
			}
			const requestedPermissions = parsedPackageAvailable === false ? null : hasPermissionsSection ? permissions : parsedPackageAvailable === true ? 0 : null;
			return {
				...details,
				requestedPermissions,
				numericIssues: issues.facts()
			};
		};
		parseSettingsGetOutput = (stdout) => {
			const trimmed = stdout.replace(/\r?\n$/u, "");
			if (trimmed === "null") return {
				value: null,
				deviceReportedNull: true
			};
			return {
				value: trimmed,
				deviceReportedNull: false
			};
		};
		parseBugreportCopiedPath = (stdout) => {
			const match = /^Bug report copied to (.+)\r?$/mu.exec(stdout.trim());
			return match === null ? null : match[1];
		};
		parseSha256sumOutput = (stdout) => /^\\?([a-f0-9]{64}) [ *]/u.exec(stdout)?.[1] ?? null;
		packageChangeFailureReason = (output) => /Failure \[([^\]]+)\]/u.exec(output)?.[1] ?? null;
		parsePackageChangeOutput = (stdout) => {
			const text = stdout.trim();
			const failure = packageChangeFailureReason(text);
			if (failure !== null) return {
				status: "failure",
				reason: failure
			};
			if (/^Success$/mu.test(text)) return {
				status: "success",
				reason: null
			};
			return {
				status: "unknown",
				reason: null
			};
		};
		parseResolveActivityOutput = (stdout) => {
			const lines = stdout.split(/\r?\n/u).map((line) => line.trim()).filter((line) => line !== "" && !/^No activity found$/iu.test(line));
			return lines.length === 0 ? null : lines[lines.length - 1];
		};
		parseAmStartOutput = (stdout, stderr = "") => {
			const normalizedStdout = stdout.replaceAll("\r\n", "\n");
			const starting = /^Starting:[ \t]+Intent[ \t]*\{(.*)\}[ \t]*$/mu.exec(normalizedStdout);
			const startedActivity = starting?.[1]?.trim() ?? null;
			const activityMatch = /^Activity:[ \t]*(.*)$/mu.exec(normalizedStdout);
			const activity = activityMatch?.[1]?.trim() || null;
			const statuses = [...normalizedStdout.matchAll(/^Status:[ \t]*(.*)$/gmu)].map((match) => match[1].trim());
			const nonOkStatus = statuses.find((status) => status.toLowerCase() !== "ok");
			const reportedStatus = nonOkStatus ?? statuses[0] ?? null;
			const errorLines = [normalizedStdout, stderr.replaceAll("\r\n", "\n")].flatMap((stream) => stream.split("\n")).map((line) => line.trim()).map((line) => ({
				line,
				prefixedMatch: /^(?:Error|Exception)(?::|\b)(.*)$/iu.exec(line),
				throwable: /^(?:(?:[A-Za-z_$][A-Za-z0-9_$]*\.)+(?:[A-Za-z_$][A-Za-z0-9_$]*(?:Exception|Error)|Exception|Error)|[A-Za-z_$][A-Za-z0-9_$]*(?:Exception|Error))(?::\s*.*)?$/u.test(line),
				genericHeader: /^(?:Error\s+type\s+\d+|Exception\s+occurred\s+while\s+executing\b.*)$/iu.test(line)
			}));
			const error = errorLines.find(({ throwable }) => throwable) ?? errorLines.find(({ prefixedMatch, genericHeader }) => prefixedMatch !== null && !genericHeader) ?? errorLines.find(({ prefixedMatch }) => prefixedMatch !== null);
			const errorReason = error === undefined ? null : error.throwable ? error.line : error.prefixedMatch?.[1]?.trim() || error.line;
			const statusReason = nonOkStatus === "" ? "am start reported an empty status" : nonOkStatus === undefined ? null : `am start reported status: ${nonOkStatus}`;
			const reason = errorReason ?? statusReason ?? (/^Warning:/mu.test(normalizedStdout.trim()) ? normalizedStdout.trim().slice(0, 512) : null);
			if (errorReason !== null || nonOkStatus !== undefined) return {
				status: "refused",
				startedActivity,
				activity,
				reportedStatus,
				reason: reason ?? "am start did not report a successful launch"
			};
			if (startedActivity !== null) return {
				status: "started",
				startedActivity,
				activity,
				reportedStatus,
				reason: null
			};
			const text = `${normalizedStdout}\n${stderr.replaceAll("\r\n", "\n")}`.trim();
			return {
				status: "refused",
				startedActivity,
				activity,
				reportedStatus,
				reason: reason ?? (text === "" ? "am start returned no activity" : text.slice(0, 512))
			};
		};
	})))();
}

//#endregion
//#region dist/adb/AdbHostFileName.js
var WINDOWS_RESERVED_BASENAME, adbHostFileName, hasWindowsControl;
function init_AdbHostFileName() {
	return (init_AdbHostFileName = __esmMin((() => {
		WINDOWS_RESERVED_BASENAME = /^(?:con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])(?:\.|$)/iu;
		adbHostFileName = (devicePath, platform) => {
			if (devicePath === "" || devicePath.endsWith("/")) return {
				ok: false,
				reason: "empty_file_name"
			};
			if (devicePath.includes("\0")) return {
				ok: false,
				reason: "unsupported_character"
			};
			if (!devicePath.startsWith("/")) return {
				ok: false,
				reason: "not_absolute_path"
			};
			const fileName = devicePath.slice(devicePath.lastIndexOf("/") + 1);
			if (fileName === "." || fileName === "..") return {
				ok: false,
				reason: "dot_segment"
			};
			if (platform === "win32") {
				if (/[\\:*?"<>|]/u.test(fileName) || hasWindowsControl(fileName)) return {
					ok: false,
					reason: "unsupported_character"
				};
				if (WINDOWS_RESERVED_BASENAME.test(fileName)) return {
					ok: false,
					reason: "reserved_name"
				};
				if (/[. ]$/u.test(fileName)) return {
					ok: false,
					reason: "trailing_dot_or_space"
				};
			}
			return {
				ok: true,
				fileName
			};
		};
		hasWindowsControl = (fileName) => {
			for (const character of fileName) {
				const code = character.codePointAt(0);
				if (code > 0 && code < 32) return true;
			}
			return false;
		};
	})))();
}

//#endregion
//#region dist/adb/AdbDeviceOutput.js
var DEVICE_LINE, isAdbMdnsTcpSerial, normalizeAdbOutputLine, isSuccessfulDaemonStartNotice, isDaemonStartingNotice, hasOnlySuccessfulAdbStartupNotices, metadataValue, parseAdbDevicesOutput, DEVICE_PROPERTY_WHITELIST, parseGetpropOutput, PACKAGE_LINE, parsePackageListOutput, displayDevicePath, parsePmPathOutput;
function init_AdbDeviceOutput() {
	return (init_AdbDeviceOutput = __esmMin((() => {
		init_AdbHostFileName();
		init_AdbUnparsedLines();
		init_adbDeviceAnalysis();
		init_adbTransportIdentity();
		DEVICE_LINE = /^(\S+)\s+(.*)$/u;
		isAdbMdnsTcpSerial = (serial) => serial.endsWith("._adb._tcp") || serial.endsWith("._adb-tls-connect._tcp");
		normalizeAdbOutputLine = (rawLine) => rawLine.trimEnd();
		isSuccessfulDaemonStartNotice = (line) => line === "* daemon started successfully" || line === "* daemon started successfully *";
		isDaemonStartingNotice = (line) => /^\* daemon not running(?:; starting now at [^\r\n]*|\. starting it now on port \d+ \*)$/u.test(line);
		hasOnlySuccessfulAdbStartupNotices = (output) => {
			let started = false;
			for (let offset = 0; offset < output.length;) {
				const newline = output.indexOf("\n", offset);
				const line = normalizeAdbOutputLine(output.slice(offset, newline === -1 ? output.length : newline));
				if (isSuccessfulDaemonStartNotice(line)) started = true;
				else if (isDaemonStartingNotice(line)) started = false;
				else return false;
				offset = newline === -1 ? output.length : newline + 1;
			}
			return started;
		};
		metadataValue = (remainder, key) => {
			const match = new RegExp(`(?:^|\\s)${key}:(\\S+)`, "u").exec(remainder);
			return match === null ? null : match[1];
		};
		parseAdbDevicesOutput = (stdout, stderr = "") => {
			const devices = [];
			const unparsed = collectUnparsedLines();
			let daemonStarted = false;
			for (const rawLine of stdout.split(/\r?\n/u)) {
				const line = normalizeAdbOutputLine(rawLine);
				if (isSuccessfulDaemonStartNotice(line)) {
					daemonStarted = true;
					continue;
				}
				if (line === "" || line.startsWith("List of devices attached")) continue;
				if (line.startsWith("* daemon")) continue;
				const match = DEVICE_LINE.exec(line);
				const state = ADB_DEVICE_STATES.find((candidate) => {
					const remainder = match?.[2];
					if (remainder === undefined || !remainder.startsWith(candidate)) return false;
					const next = remainder[candidate.length];
					return next === undefined || /\s/u.test(next) || candidate === "no permissions" && next === ";";
				});
				if (match === null || state === undefined) {
					if (rawLine.trim() !== "") unparsed.add(rawLine);
					continue;
				}
				const serial = match[1];
				const remainder = match[2].slice(state.length);
				const usb = metadataValue(remainder, "usb");
				const transportToken = /(?:^|\s)transport_id:(\S*)$/u.exec(remainder)?.[1] ?? null;
				const transportIdentity = parseAdbTransportIdentity(transportToken, rawLine);
				const isEmulator = /^emulator-\d+$/u.test(serial);
				const kind = isEmulator ? "emulator" : usb !== null ? "physical" : "unknown";
				devices.push({
					serial,
					state,
					transport: usb !== null ? "usb" : isEmulator || serial.includes(":") || isAdbMdnsTcpSerial(serial) ? "tcp" : "unknown",
					product: metadataValue(remainder, "product"),
					model: metadataValue(remainder, "model"),
					device: metadataValue(remainder, "device"),
					transport_identity: transportIdentity,
					kind,
					kind_basis: kind === "emulator" ? "emulator_serial_prefix" : kind === "physical" ? "usb_transport" : "none"
				});
			}
			if (!daemonStarted && stderr !== "") {
				for (const rawLine of stderr.split(/\r?\n/u)) {
					const line = normalizeAdbOutputLine(rawLine);
					if (isSuccessfulDaemonStartNotice(line)) {
						daemonStarted = true;
						break;
					}
				}
			}
			return {
				devices,
				unparsedLines: unparsed.facts(),
				daemonStarted
			};
		};
		DEVICE_PROPERTY_WHITELIST = [
			"ro.build.version.release",
			"ro.build.version.sdk",
			"ro.build.version.security_patch",
			"ro.build.id",
			"ro.build.fingerprint",
			"ro.build.characteristics",
			"ro.debuggable",
			"ro.kernel.qemu",
			"ro.product.brand",
			"ro.product.device",
			"ro.product.manufacturer",
			"ro.product.model",
			"ro.product.cpu.abilist"
		];
		parseGetpropOutput = (stdout) => {
			const values = new Map();
			for (const rawLine of stdout.split(/\r?\n/u)) {
				const match = /^\[([^\]]+)\]:\s*\[(.*)\]$/u.exec(rawLine.trim());
				if (match === null) continue;
				values.set(match[1], match[2]);
			}
			const properties = DEVICE_PROPERTY_WHITELIST.flatMap((name) => {
				const value = values.get(name);
				return value === undefined ? [] : [{
					name,
					value
				}];
			});
			const qemu = values.get("ro.kernel.qemu");
			return {
				properties,
				emulatorObserved: qemu === undefined ? null : qemu === "1"
			};
		};
		PACKAGE_LINE = /^package:(.+)=([^\s=]+)$/u;
		parsePackageListOutput = (stdout) => {
			const packages = [];
			const unparsed = collectUnparsedLines();
			for (const rawLine of stdout.split(/\r?\n/u)) {
				const line = rawLine.trim();
				if (line === "") continue;
				const match = PACKAGE_LINE.exec(line);
				if (match === null) {
					unparsed.add(rawLine);
					continue;
				}
				packages.push({
					package_name: match[2],
					base_apk_device_path: match[1]
				});
			}
			return {
				packages,
				unparsedLines: unparsed.facts()
			};
		};
		displayDevicePath = (devicePath) => {
			let excerpt = "";
			let count = 0;
			for (const character of devicePath) {
				if (count === 160) break;
				excerpt += character;
				count += 1;
			}
			const quoted = JSON.stringify(excerpt).replace(/[\p{C}\p{Z}\p{Default_Ignorable_Code_Point}\u2800]/gu, (character) => character === " " ? character : `\\u{${character.codePointAt(0).toString(16).toUpperCase()}}`);
			return excerpt.length === devicePath.length ? quoted : `${quoted} (excerpt)`;
		};
		parsePmPathOutput = (stdout, platform) => {
			const paths = [];
			const rejectedPaths = [];
			const unparsed = collectUnparsedLines();
			for (const rawLine of stdout.split(/\r?\n/u)) {
				if (rawLine === "") continue;
				const match = /^package:(.*)$/u.exec(rawLine);
				if (match === null) {
					unparsed.add(rawLine);
					continue;
				}
				const devicePath = match[1];
				const validated = adbHostFileName(devicePath, platform);
				if (!validated.ok) {
					rejectedPaths.push({
						device_path: devicePath,
						reason: validated.reason
					});
					continue;
				}
				const fileName = validated.fileName;
				paths.push({
					device_path: devicePath,
					file_name: fileName,
					role: fileName === "base.apk" ? "base" : fileName.startsWith("split_") && fileName.endsWith(".apk") ? "split" : "unknown"
				});
			}
			return {
				paths,
				rejectedPaths,
				unparsedLines: unparsed.facts()
			};
		};
	})))();
}

//#endregion
//#region dist/adb/AdbConfiguration.js
var ADB_BINARY_ENV, VERSION_TIMEOUT_MS, ADB_VERSION_REMEDIATION, ADB_MISSING_REMEDIATION, ADB_NOT_EXECUTABLE_REMEDIATION, VERSION_MAX_OUTPUT_BYTES, resolveAdbBinary, resolveWindowsAdb, AdbConfigurationFailure, parseAdbVersionOutput, inspectAdbClient, versionProbeFailure, adbLaunchRefusal, rejectionCodeOf, adbConfigurationAvailability;
function init_AdbConfiguration() {
	return (init_AdbConfiguration = __esmMin((() => {
		init_analysisErrorCore();
		init_callerPath();
		init_WindowsExecutable();
		init_ProviderDeadline();
		init_snapshotEnvironment();
		init_fixedAllowanceRemediation();
		init_errorMessage();
		init_AdbProcess();
		init_classifyProviderOutcome();
		ADB_BINARY_ENV = "REA_ADB_PATH";
		VERSION_TIMEOUT_MS = 1e4;
		ADB_VERSION_REMEDIATION = `Set ${ADB_BINARY_ENV} to an Android SDK Platform-Tools adb binary whose \`adb version\` reports its version, or put one on PATH.`;
		ADB_MISSING_REMEDIATION = `Set ${ADB_BINARY_ENV} to an absolute path to an existing adb binary.`;
		ADB_NOT_EXECUTABLE_REMEDIATION = `Set ${ADB_BINARY_ENV} to an absolute path to the adb executable file, not a directory, and check execute permission on it and search permission on its parent directories.`;
		VERSION_MAX_OUTPUT_BYTES = 64 * 1024;
		resolveAdbBinary = async (environment, platform, signal) => {
			const selectedEnvironment = snapshotEnvironment(environment, platform);
			const configured = selectedEnvironment[ADB_BINARY_ENV];
			if (configured === undefined || configured.trim() === "") return {
				binary: platform === "win32" ? await resolveWindowsAdb(selectedEnvironment, signal) : "adb",
				pathSource: "path",
				environment: selectedEnvironment
			};
			if (!isQualifiedCallerPath(configured, platform)) throw new AdbConfigurationFailure("not_absolute", `${ADB_BINARY_ENV} must be an absolute path to the adb binary`, `Set ${ADB_BINARY_ENV} to an absolute adb executable path, or unset it to use adb from PATH.`, { configured_path: configured });
			return {
				binary: configured,
				pathSource: "environment",
				environment: selectedEnvironment
			};
		};
		resolveWindowsAdb = async (environment, signal) => {
			const deadline = new ProviderStartupDeadline(VERSION_TIMEOUT_MS, signal);
			try {
				const found = await findWindowsExecutable("adb", environment, { signal: deadline.signal });
				if (found.ok) return found.value;
				const failure = found.error;
				if (failure.kind === "interrupted") {
					if (deadline.interruption === "cancelled") throw cancelledBy("inspect_adb_client", carriedReason(signal?.reason));
					throw new AnalysisTimeoutError("inspect_adb_client", VERSION_TIMEOUT_MS, { diagnostics: { phase: "windows_path_lookup" } });
				}
				throw new AdbConfigurationFailure(failure.kind === "missing" ? "binary_missing" : "binary_unresolved", "The adb binary could not be selected from the Windows PATH/PATHEXT", `Set ${ADB_BINARY_ENV} to an absolute adb executable, or add it to PATH/PATHEXT.`, {
					selected_binary: "adb",
					path_source: "path",
					...failure.kind === "invalid_extension" ? { invalid_extension: failure.extension } : {},
					...failure.kind === "inspection" ? {
						candidate_path: failure.path,
						...failure.code === null ? {} : { filesystem_error: failure.code }
					} : {}
				}, failure.kind === "inspection" ? { cause: failure.cause } : undefined);
			} finally {
				deadline.dispose();
			}
		};
		AdbConfigurationFailure = class extends Error {
			code;
			remediation;
			diagnostics;
			constructor(code, message, remediation, diagnostics = {}, options) {
				super(message, options);
				this.code = code;
				this.remediation = remediation;
				this.diagnostics = diagnostics;
			}
		};
		parseAdbVersionOutput = (stdout) => {
			const build = /^Version\s+(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)\s*$/mu.exec(stdout);
			const installed = /^Installed as ([^\n]*)$/mu.exec(stdout)?.[1]?.replace(/\r$/u, "");
			return {
				version: build === null ? null : build[1].trim(),
				installedPath: installed === undefined || installed === "" ? null : installed
			};
		};
		inspectAdbClient = async (host, signal) => {
			const outcome = await runAdbProcess(host, ["version"], {
				timeoutMs: VERSION_TIMEOUT_MS,
				maxOutputBytes: VERSION_MAX_OUTPUT_BYTES
			}, signal);
			if (!outcome.ok) {
				const failure = outcome.failure;
				const launch = failure.launch;
				if (failure.command === undefined && launch !== undefined && launch.kind !== "host-exhausted" && launch.kind !== "argument-list") throw adbLaunchRefusal(host, launch, failure.cause);
				throw adbRunFailureError("inspect_adb_client", host, failure, () => failure.exited === undefined ? versionProbeFailure(host, failure) : undefined);
			}
			const { run } = outcome;
			const stdout = run.stdout.toString("utf8");
			if (run.exitCode !== 0) throw new AdbConfigurationFailure("version_unresolved", `The selected adb binary did not report a usable version: ${host.binary}`, ADB_VERSION_REMEDIATION, {
				selected_binary: host.binary,
				path_source: host.pathSource,
				exit_code: run.exitCode,
				stderr_excerpt: run.stderr.slice(0, 512)
			});
			const identity = parseAdbVersionOutput(stdout);
			const hasRecognizedProtocolVersion = /^Android Debug Bridge version\s+\d+\.\d+\.\d+\s*$/mu.test(stdout);
			if (identity.version === null && !hasRecognizedProtocolVersion) throw new AdbConfigurationFailure("version_unresolved", "The selected adb binary exited successfully but did not report a recognizable protocol or build version", ADB_VERSION_REMEDIATION, {
				selected_binary: host.binary,
				path_source: host.pathSource,
				version_probe: "unrecognized_output",
				stdout,
				stderr: run.stderr
			});
			return identity;
		};
		versionProbeFailure = (host, failure) => {
			const facts = {
				selected_binary: host.binary,
				path_source: host.pathSource
			};
			const options = {
				cause: failure.cause,
				diagnostics: facts,
				...failure.capturedOutput === undefined ? {} : { capturedOutput: failure.capturedOutput }
			};
			if (failure.command?.reason === "output-limit") return new AnalysisResourceConstraintError("inspect_adb_client", "memory", `adb version output exceeded the ${String(VERSION_MAX_OUTPUT_BYTES)}-byte capture budget`, { max_output_bytes: VERSION_MAX_OUTPUT_BYTES }, {
				...options,
				...fixedAllowanceOptions(`The adb version-output capture allowance of ${String(VERSION_MAX_OUTPUT_BYTES)} bytes (this release has no runtime override)`, "capture", {
					limit: VERSION_MAX_OUTPUT_BYTES,
					unit: "bytes"
				})
			});
			if (failure.command?.reason === "timeout") return new AnalysisTimeoutError("inspect_adb_client", VERSION_TIMEOUT_MS, {
				...options,
				userMessage: `adb version probe reached its ${String(VERSION_TIMEOUT_MS)} ms deadline (deadlineExpired). This release has no runtime override.`,
				remediationAction: `This ${String(VERSION_TIMEOUT_MS)} ms adb version probe has no runtime override. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`
			});
			const launch = failure.launch;
			if (launch?.kind === "host-exhausted" || launch?.kind === "argument-list") return classifyLaunchFailure(launch, {
				providerId: "adb",
				operation: "inspect_adb_client",
				command: host.binary,
				fixedArguments: true,
				selection: ADB_BINARY_ENV,
				details: {
					cause: failure.cause,
					diagnostics: facts
				}
			});
			return new AnalysisProtocolError(`adb version probe failed: ${errorMessage(failure.cause)}`, options);
		};
		adbLaunchRefusal = (host, launch, cause) => {
			const code = launch.code ?? "no system code";
			const fromEnvironment = host.pathSource === "environment";
			const facts = {
				selected_binary: host.binary,
				path_source: host.pathSource,
				filesystem_error: code
			};
			if (launch.kind === "missing") return new AdbConfigurationFailure("binary_missing", `The selected adb binary was not found: ${host.binary}`, ADB_MISSING_REMEDIATION, facts, { cause });
			return new AdbConfigurationFailure("binary_not_executable", code === "EACCES" || code === "EPERM" ? `Execution of the selected adb binary was denied (${code}): ${host.binary}` : `The selected adb binary could not be started (${code}): ${host.binary}`, code === "EACCES" ? fromEnvironment ? ADB_NOT_EXECUTABLE_REMEDIATION : `Make sure the adb found on PATH is a file with execute permission, not a directory, and that its parent directories have search permission, or set ${ADB_BINARY_ENV} to an absolute path to an executable adb binary.` : code === "EPERM" ? `The host refused to run this adb binary, for example because of a security policy or file flags; allow it to run, or set ${ADB_BINARY_ENV} to an absolute path to an adb binary the host permits.` : `Select an adb executable this host can start directly: set ${ADB_BINARY_ENV} to its absolute path, or make it the adb found on PATH.`, facts, { cause });
		};
		rejectionCodeOf = (code) => code === "binary_missing" ? "executable_missing" : code === "not_absolute" || code === "binary_not_executable" || code === "binary_unresolved" ? "not_configured" : "version_unresolved";
		adbConfigurationAvailability = (cause) => ({
			status: "unavailable",
			code: rejectionCodeOf(cause.code),
			reason: cause.message,
			remediation: cause.remediation,
			diagnostics: { ...cause.diagnostics }
		});
	})))();
}

//#endregion
//#region dist/adb/AdbCommand.js
var STDERR_EXCERPT_CHARACTERS, LOCAL_FILE_DIAGNOSTICS, AdbProtocolError, adbExitedRunOf, quoteShellOperand, adbArguments, runAdbCapture, adbRunFailure, adbExitFailure, runAdb, packageChangeRefusal, completedAdbPathProbe, recognizedProbeStderr, probeAdbPathExistence, probeAdbPathDirectory, probeAdbPath;
function init_AdbCommand() {
	return (init_AdbCommand = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_excerpt();
		init_fixedAllowanceRemediation();
		init_result();
		init_errorMessage();
		init_AdbProcess();
		init_classifyProviderOutcome();
		init_AdbShellOutput();
		init_AdbDeviceOutput();
		init_AdbConfiguration();
		STDERR_EXCERPT_CHARACTERS = 512;
		LOCAL_FILE_DIAGNOSTICS = [
			["cannot create", ":"],
			["cannot create file/directory", ":"],
			["cannot stat", ":"],
			["cannot open", ":"],
			["cannot write", ":"],
			["failed to stat local file", ":"],
			["failed to read all of", ":"],
			["failed to access", ":"],
			["failed to stat", ":"],
			["failed to open", ":"],
			["opening", " locally failed:"],
			["reading", " locally failed:"]
		];
		AdbProtocolError = class extends AnalysisProtocolError {
			run;
			constructor(message, run) {
				super(message, { capturedOutput: run.capturedOutput });
				this.run = run;
			}
		};
		adbExitedRunOf = (error) => {
			const primary = primaryAnalysisError(error);
			return primary instanceof AdbProtocolError ? primary.run : undefined;
		};
		quoteShellOperand = (value) => /^[A-Za-z0-9_./:=@+,-]+$/u.test(value) ? value : "'" + value.replaceAll("'", "'\\''") + "'";
		adbArguments = (serial, arguments_) => {
			const operands = arguments_[0] === "shell" ? ["shell", ...arguments_.slice(1).map(quoteShellOperand)] : [...arguments_];
			return serial === undefined ? operands : [
				"-s",
				serial,
				...operands
			];
		};
		runAdbCapture = async (operation, target, host, arguments_, limits, signal, classifyExit = (run) => run.exitCode === 0 ? undefined : adbExitFailure(operation, target, run)) => {
			if (signal?.aborted === true) return err(cancelledBy(operation, signal));
			const started = await host.startServer?.();
			if (started !== undefined && !started.ok) return started;
			const outcome = await runAdbProcess(host, arguments_, limits, signal);
			if (!outcome.ok) return err(adbRunFailureError(operation, host, outcome.failure, (failure) => failure.exited === undefined ? adbRunFailure(operation, host, limits, failure) : classifyExit(failure.exited)));
			const { run } = outcome;
			const exitFailure = classifyExit(run);
			if (exitFailure === undefined) return ok({
				stdout: run.stdout,
				stderr: run.stderr
			});
			return err(exitFailure);
		};
		adbRunFailure = (operation, host, limits, failure) => {
			const detail = {
				cause: failure.cause,
				...failure.capturedOutput === undefined ? {} : { capturedOutput: failure.capturedOutput }
			};
			if (failure.command?.reason === "output-limit") {
				const name = `The adb output capture allowance of ${String(limits.maxOutputBytes)} bytes (this release has no runtime override)`;
				const facts = {
					limit: limits.maxOutputBytes,
					unit: "bytes"
				};
				const allowance = limits.volatileOutput === true ? {
					fixedAllowance: {
						name,
						kind: "live",
						...facts
					},
					retryable: true
				} : fixedAllowanceOptions(name, "capture", facts);
				return new AnalysisResourceConstraintError(operation, "memory", `adb output exceeded the ${String(limits.maxOutputBytes)}-byte capture budget`, { max_output_bytes: limits.maxOutputBytes }, {
					...detail,
					...allowance
				});
			}
			if (failure.command?.reason === "timeout") return new AnalysisTimeoutError(operation, limits.timeoutMs, {
				...detail,
				userMessage: `adb ${operation} reached its ${String(limits.timeoutMs)} ms deadline (deadlineExpired). This release has no runtime override.`,
				remediationAction: `This ${String(limits.timeoutMs)} ms adb deadline has no runtime override. Allow execution, cleanup and delivery headroom in the outer MCP client deadline. Confirm outstanding work and cleanup before retrying.`
			});
			const { launch } = failure;
			if (launch?.kind === "host-exhausted" || launch?.kind === "argument-list") return classifyLaunchFailure(launch, {
				providerId: "adb",
				operation,
				command: host.binary,
				selection: ADB_BINARY_ENV,
				details: detail
			});
			return new AnalysisProtocolError(launch !== undefined ? `adb could not be started (${String(launch.code ?? "no system code")}) for ${operation}` : `adb failed for ${operation}: ${errorMessage(failure.cause)}`, detail);
		};
		adbExitFailure = (operation, target, run) => {
			const detail = { capturedOutput: run.capturedOutput };
			const stderr = run.stderr.trim();
			const excerpt = ellipsisExcerpt(stderr, STDERR_EXCERPT_CHARACTERS);
			let diagnosticStart = 0;
			while (diagnosticStart < stderr.length) {
				const newline = stderr.indexOf("\n", diagnosticStart);
				const line = stderr.slice(diagnosticStart, newline === -1 ? stderr.length : newline).trimEnd();
				if (!isSuccessfulDaemonStartNotice(line) && !isDaemonStartingNotice(line)) break;
				diagnosticStart = newline === -1 ? stderr.length : newline + 1;
			}
			const diagnostic = stderr.slice(diagnosticStart).replace(/^(?:adb:\s*)?(?:error:\s*)?(?:(?:failed to get feature set|connect failed):\s*)?/iu, "");
			if (/^(?:unauthorized\b|device(?: '[^'\n]*')? (?:unauthorized\b|offline\b|not found\b|still authorizing\b)|still authorizing\b|more than one device\b)/iu.test(diagnostic)) return new AnalysisUnsupportedTargetError(operation, target.device, excerpt, detail);
			if (/No such file or directory|Permission denied|read: Permission denied/iu.test(diagnostic)) {
				const localPath = target.localPath;
				const path = localPath !== undefined && LOCAL_FILE_DIAGNOSTICS.some(([verb, suffix]) => [
					localPath,
					`'${localPath}'`,
					`"${localPath}"`
				].some((operand) => diagnostic.startsWith(`${verb} ${operand}${suffix}`))) ? localPath : target.path ?? target.device;
				return new AnalysisUnsupportedTargetError(operation, path, excerpt, detail);
			}
			const protocolError = new AdbProtocolError(excerpt === "" ? `adb exited with code ${String(run.exitCode)} for ${operation}` : excerpt, run);
			if (operation === "install_adb_package" || operation === "uninstall_adb_package") {
				const reason = packageChangeFailureReason(`${run.capturedOutput.stdout}\n${run.stderr}`);
				if (reason !== null) return new AnalysisUnsupportedTargetError(operation, target.device, reason, { cause: protocolError });
			}
			return protocolError;
		};
		runAdb = async (...arguments_) => {
			const captured = await runAdbCapture(...arguments_);
			if (!captured.ok) return captured;
			return ok({
				stdout: captured.value.stdout.toString("utf8"),
				stderr: captured.value.stderr,
				stdoutBytes: captured.value.stdout.byteLength
			});
		};
		packageChangeRefusal = (operation, serial, error) => {
			const run = adbExitedRunOf(error);
			if (run === undefined) return undefined;
			const reason = packageChangeFailureReason(`${run.capturedOutput.stdout}\n${run.stderr}`);
			return reason === null ? undefined : err(new AnalysisUnsupportedTargetError(operation, serial, reason, { cause: error }));
		};
		completedAdbPathProbe = (matches, stderr) => ({
			matches,
			capturedOutput: {
				stdout: "",
				stderr,
				stdout_bytes: 0,
				stderr_bytes: Buffer.byteLength(stderr),
				exit_code: matches ? 0 : 1,
				signal: null,
				truncated: false
			}
		});
		recognizedProbeStderr = (stderr) => stderr === "" || hasOnlySuccessfulAdbStartupNotices(stderr);
		probeAdbPathExistence = async (operation, serial, path, host, limits, signal) => {
			return probeAdbPath(operation, serial, path, host, limits, signal, "-e");
		};
		probeAdbPathDirectory = async (operation, serial, path, host, limits, signal) => probeAdbPath(operation, serial, path, host, limits, signal, "-d");
		probeAdbPath = async (operation, serial, path, host, limits, signal, predicate) => {
			const fact = predicate === "-d" ? "destination_directory" : "destination_existence";
			let exitCode = 0;
			const probed = await runAdbCapture(operation, {
				device: serial,
				path
			}, host, adbArguments(serial, [
				"shell",
				"test",
				predicate,
				path
			]), {
				...limits,
				volatileOutput: true
			}, signal, (run) => {
				exitCode = run.exitCode;
				if ((run.exitCode === 0 || run.exitCode === 1) && run.stdout.length === 0 && recognizedProbeStderr(run.stderr)) return undefined;
				if (run.exitCode === 0) return new AnalysisProtocolError(`The ADB path ${predicate === "-d" ? "directory" : "existence"} probe returned unexpected output; destination status is unknown`, {
					diagnostics: { [fact]: "unknown" },
					capturedOutput: run.capturedOutput
				});
				const failure = adbExitFailure(operation, {
					device: serial,
					path
				}, run);
				return !(failure instanceof AdbProtocolError) ? failure : new AnalysisProtocolError(failure.message, {
					cause: failure,
					diagnostics: { [fact]: "unknown" },
					capturedOutput: run.capturedOutput
				});
			});
			if (!probed.ok) return probed;
			return ok(completedAdbPathProbe(exitCode === 0, probed.value.stderr));
		};
	})))();
}

//#endregion
//#region dist/adb/AdbServer.js
var START_SERVER_TIMEOUT_MS, START_SERVER_MAX_OUTPUT_BYTES, hasSuccessfulDaemonStartNotice, startAdbServer;
function init_AdbServer() {
	return (init_AdbServer = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		init_classifyProviderOutcome();
		init_ExecFileOutput();
		init_launchFailure();
		init_AdbConfiguration();
		init_AdbDeviceOutput();
		START_SERVER_TIMEOUT_MS = 3e4;
		START_SERVER_MAX_OUTPUT_BYTES = 64 * 1024;
		hasSuccessfulDaemonStartNotice = (output) => output.split(/\r?\n/u).some((rawLine) => isSuccessfulDaemonStartNotice(rawLine.trimEnd()));
		startAdbServer = async (operation, selection, signal) => {
			try {
				const { stdout, stderr } = await execFileOutput(selection.binary, ["start-server"], {
					env: selection.environment,
					timeout: START_SERVER_TIMEOUT_MS,
					maxBuffer: START_SERVER_MAX_OUTPUT_BYTES,
					stopSignal: "SIGTERM",
					...signal === undefined ? {} : { signal }
				});
				return ok({ daemonStarted: hasSuccessfulDaemonStartNotice(stdout) || hasSuccessfulDaemonStartNotice(stderr) });
			} catch (cause) {
				const failure = execFileOutputFailure(cause);
				const observed = {
					diagnostics: { adb_step: "start-server" },
					...failure === undefined ? {} : { capturedOutput: execFileFailureCapturedOutput(failure) }
				};
				if (cause instanceof ExecFileOutputCancelledError) return err(cancelledBy(operation, carriedReason(cause.cause), observed));
				const detail = {
					cause,
					...observed
				};
				if (failure?.code === "ETIMEDOUT") return err(new AnalysisTimeoutError(operation, START_SERVER_TIMEOUT_MS, {
					...detail,
					userMessage: `adb start-server reached its ${String(START_SERVER_TIMEOUT_MS)} ms deadline (deadlineExpired). This release has no runtime override.`
				}));
				const launch = launcherFailureOf(cause);
				if (launch?.kind === "host-exhausted" || launch?.kind === "argument-list") return err(classifyLaunchFailure(launch, {
					providerId: "adb",
					operation,
					command: selection.binary,
					fixedArguments: true,
					selection: ADB_BINARY_ENV,
					details: detail
				}));
				const stderr = failure?.stderr.trim().slice(0, 512) ?? "";
				return err(new AnalysisProtocolError(stderr === "" ? `adb could not start the adb server for ${operation}` : `adb could not start the adb server for ${operation}: ${stderr}`, detail));
			}
		};
	})))();
}

//#endregion
//#region dist/adb/AdbInputSnapshot.js
var AdbInputSnapshotFailure, snapshotAdbInput;
function init_AdbInputSnapshot() {
	return (init_AdbInputSnapshot = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_RegularFile();
		init_OwnedFileHandle();
		AdbInputSnapshotFailure = class extends Error {
			operation;
			sourcePath;
			primaryCause;
			cleanupResources;
			cleanupCause;
			constructor(operation, sourcePath, primaryCause, cleanupResources, cleanupCause) {
				super(`ADB input snapshot failed for ${sourcePath}`, { cause: primaryCause ?? cleanupCause });
				this.operation = operation;
				this.sourcePath = sourcePath;
				this.primaryCause = primaryCause;
				this.cleanupResources = cleanupResources;
				this.cleanupCause = cleanupCause;
				this.name = "AdbInputSnapshotFailure";
			}
		};
		snapshotAdbInput = async (sourcePath, root, resources, operation, signal) => {
			let source;
			let destination;
			const cleanupResources = [];
			const cleanupCauses = [];
			let snapshot;
			let primaryCause;
			try {
				const { handle, initial } = await openRegularFile(sourcePath, {
					symlinks: "follow",
					signal
				});
				source = new OwnedFileHandle(handle);
				const destinationPath = join(root.path, basename(sourcePath));
				destination = new OwnedFileHandle(await open(destinationPath, "wx", 384));
				if (!Number.isSafeInteger(initial.size) || initial.size < 0) throw new RangeError(`Regular file size cannot be represented safely: ${sourcePath}`);
				const hash = createHash("sha256");
				const chunk = Buffer.allocUnsafe(64 * 1024);
				let position = 0;
				while (position < initial.size) {
					signal?.throwIfAborted();
					const read = await source.handle.read(chunk, 0, Math.min(chunk.length, initial.size - position), position);
					signal?.throwIfAborted();
					if (read.bytesRead === 0) throw new AnalysisArtifactChangedError(operation, sourcePath, "the file ended before its admitted size was copied");
					const bytes = chunk.subarray(0, read.bytesRead);
					let written = 0;
					while (written < bytes.length) {
						signal?.throwIfAborted();
						const result = await destination.handle.write(bytes, written, bytes.length - written, position + written);
						if (result.bytesWritten === 0) throw new Error("Private ADB input snapshot stopped accepting bytes");
						written += result.bytesWritten;
					}
					hash.update(bytes);
					position += read.bytesRead;
				}
				signal?.throwIfAborted();
				const [opened, named] = await Promise.all([source.handle.stat(), stat(sourcePath)]);
				signal?.throwIfAborted();
				if (!sameRegularFileState(initial, opened) || !sameRegularFileState(initial, named)) throw new AnalysisArtifactChangedError(operation, sourcePath, "the file changed while its private snapshot was copied");
				await destination.handle.sync();
				await destination.handle.chmod(256 | initial.mode & 73);
				snapshot = {
					path: destinationPath,
					bytes: position,
					sha256: hash.digest("hex")
				};
			} catch (cause) {
				if (cause instanceof RegularFileAdmissionFailure) {
					source = cause.owner;
					primaryCause = cause.cause;
				} else if (cause instanceof AnalysisError) {
					primaryCause = cause;
				} else {
					primaryCause = signal?.aborted === true ? cancelledBy(operation, carriedReason(cause)) : cause;
				}
			}
			for (const [owner, resource] of [[source, `${sourcePath} (ADB snapshot source handle)`], [destination, `${join(root.path, basename(sourcePath))} (ADB snapshot handle)`]]) {
				if (owner === undefined) continue;
				const result = await resources.release({
					kind: "file-handle",
					resource,
					handle: owner
				});
				if (result.kind === "failed") {
					cleanupResources.push(resource);
					cleanupCauses.push(result.cause);
				}
			}
			if (cleanupCauses.length > 0) throw new AdbInputSnapshotFailure(operation, sourcePath, primaryCause, cleanupResources, new AggregateError(cleanupCauses, "ADB snapshot handles remain open"));
			if (primaryCause instanceof AnalysisError) throw primaryCause;
			if (primaryCause !== undefined) throw new AnalysisOutputError(operation, `The caller input could not be staged for adb: ${sourcePath}`, { cause: primaryCause });
			if (snapshot === undefined) throw new Error("ADB input snapshot ended without a result");
			return snapshot;
		};
	})))();
}

//#endregion
//#region dist/adb/AdbDirectoryListing.js
var ADB_DIRECTORY_BATCH_SCRIPT, METADATA, parseEntry, parseAdbDirectoryListing, describeUnparsedRecord;
function init_AdbDirectoryListing() {
	return (init_AdbDirectoryListing = __esmMin((() => {
		init_AdbUnparsedLines();
		ADB_DIRECTORY_BATCH_SCRIPT = String.raw`metadata=$(stat -c '%A|%U|%G|%s|%y' "$@") || exit
printf '%s\n' "$metadata" | {
  while IFS= read -r metadata; do
    [ "$#" -gt 0 ] || exit 1
    path=$1
    shift
    printf '%s\000%s\000' "$metadata" "${"${path##*/}"}"
    case "$metadata" in
      l*) readlink -n "$path" || exit 1 ;;
    esac
    printf '\000'
  done
  [ "$#" -eq 0 ]
}`;
		METADATA = /^([bcdlps-][rwxstST-]{9})\|([^|\n]+)\|([^|\n]+)\|(\d+)\|([^|\n]+)$/u;
		parseEntry = (metadata, name, linkTarget) => {
			const match = METADATA.exec(metadata);
			if (match === null || name === "" || name.includes("/")) return null;
			const permissions = match[1];
			const bytes = Number(match[4]);
			if (!Number.isSafeInteger(bytes)) return null;
			const isSymlink = permissions.startsWith("l");
			if (isSymlink ? linkTarget === "" : linkTarget !== "") return null;
			return {
				name,
				kind: permissions.startsWith("d") ? "directory" : isSymlink ? "symlink" : permissions.startsWith("-") ? "file" : "other",
				permissions,
				owner: match[2],
				group: match[3],
				bytes,
				date: match[5],
				link_target: isSymlink ? linkTarget : null
			};
		};
		parseAdbDirectoryListing = (stdout) => {
			const entries = [];
			const unparsed = collectUnparsedLines();
			let offset = 0;
			while (offset < stdout.length) {
				const metadataEnd = stdout.indexOf(0, offset);
				const nameEnd = metadataEnd < 0 ? -1 : stdout.indexOf(0, metadataEnd + 1);
				const targetEnd = nameEnd < 0 ? -1 : stdout.indexOf(0, nameEnd + 1);
				if (targetEnd < 0) {
					unparsed.add(describeUnparsedRecord(stdout.subarray(offset)));
					break;
				}
				const rawRecord = stdout.subarray(offset, targetEnd + 1);
				if (!isUtf8(rawRecord)) {
					unparsed.add(describeUnparsedRecord(rawRecord));
				} else {
					const entry = parseEntry(stdout.toString("utf8", offset, metadataEnd), stdout.toString("utf8", metadataEnd + 1, nameEnd), stdout.toString("utf8", nameEnd + 1, targetEnd));
					if (entry === null) unparsed.add(rawRecord.toString("utf8"));
					else entries.push(entry);
				}
				offset = targetEnd + 1;
			}
			return {
				entries,
				unparsedLines: unparsed.facts()
			};
		};
		describeUnparsedRecord = (record) => isUtf8(record) ? record.toString("utf8") : `Invalid UTF-8 directory record (hex): ${record.toString("hex")}`;
	})))();
}

//#endregion
//#region dist/adb/AdbOperationResults.js
var clientIdentityResult, parsedListingExecution;
function init_AdbOperationResults() {
	return (init_AdbOperationResults = __esmMin((() => {
		init_AnalysisProvider();
		clientIdentityResult = (selection, identity) => ({
			binary_path: selection.binary,
			path_source: selection.pathSource,
			version: identity.version,
			installed_path: identity.installedPath
		});
		parsedListingExecution = (result, unparsed, provider, limitations = []) => createAnalysisExecution({
			...result,
			unparsed_lines: unparsed.sample,
			coverage: unparsed.total > 0 ? "partial" : "complete"
		}, provider, { limitations: [...limitations, ...unparsed.total > unparsed.sample.length ? [`unparsed_lines reports the first ${String(unparsed.sample.length)} of ${String(unparsed.total)} unrecognized lines`] : []] });
	})))();
}

//#endregion
//#region dist/adb/AdbDeviceOperations.js
var DEVICES_TIMEOUT_MS, DEVICES_MAX_OUTPUT_BYTES, SHELL_TIMEOUT_MS$1, GETPROP_MAX_OUTPUT_BYTES, inspectAdbClientOperation, listAdbDevicesOperation, inspectAdbDeviceOperation;
function init_AdbDeviceOperations() {
	return (init_AdbDeviceOperations = __esmMin((() => {
		init_AnalysisProvider();
		init_analysisErrorCore();
		init_result();
		init_AdbCommand();
		init_AdbDeviceOutput();
		DEVICES_TIMEOUT_MS = 2e4;
		DEVICES_MAX_OUTPUT_BYTES = 1024 * 1024;
		SHELL_TIMEOUT_MS$1 = 3e4;
		GETPROP_MAX_OUTPUT_BYTES = 2 * 1024 * 1024;
		inspectAdbClientOperation = (context) => ok(createAnalysisExecution({
			client: context.client,
			contacted_adb_server: false
		}, context.provider));
		listAdbDevicesOperation = async (context) => {
			const started = await context.selection.startServer?.();
			if (started !== undefined && !started.ok) return started;
			const ran = await runAdb(context.operation, { device: "adb-devices" }, context.selection, ["devices", "-l"], {
				timeoutMs: DEVICES_TIMEOUT_MS,
				maxOutputBytes: DEVICES_MAX_OUTPUT_BYTES,
				volatileOutput: true
			}, context.signal);
			if (!ran.ok) return ran;
			const { devices, unparsedLines, daemonStarted } = parseAdbDevicesOutput(ran.value.stdout, ran.value.stderr);
			if (unparsedLines.total > 0) return err(new AnalysisProtocolError(`adb devices reported an unrecognized line: ${unparsedLines.sample[0]}`));
			return ok(createAnalysisExecution({
				client: context.client,
				devices,
				may_have_started_adb_server: started?.value?.daemonStarted === true || daemonStarted
			}, context.provider, { limitations: ["Device kind is inferred from the emulator serial prefix and USB transport metadata, not from device attestation", "Kind stays unknown for TCP transports unless the serial is an emulator port"] }));
		};
		inspectAdbDeviceOperation = async (context) => {
			const { request } = context;
			if (request.operation !== "inspect_adb_device") return err(new AnalysisProtocolError(`adb device inspection does not accept ${request.operation}`));
			const serial = request.input.serial;
			const ran = await runAdb(context.operation, { device: serial }, context.selection, adbArguments(serial, ["shell", "getprop"]), {
				timeoutMs: SHELL_TIMEOUT_MS$1,
				maxOutputBytes: GETPROP_MAX_OUTPUT_BYTES,
				volatileOutput: true
			}, context.signal);
			if (!ran.ok) return ran;
			const { properties, emulatorObserved } = parseGetpropOutput(ran.value.stdout);
			return ok(createAnalysisExecution({
				client: context.client,
				serial,
				properties,
				property_count: properties.length,
				emulator_observed: emulatorObserved
			}, context.provider, { limitations: ["Properties are a fixed whitelist of build identity facts, not the full getprop dump", "emulator_observed is null when the build does not report ro.kernel.qemu"] }));
		};
	})))();
}

//#endregion
//#region dist/adb/AdbProvider.js
var SHELL_TIMEOUT_MS, PACKAGE_LIST_TIMEOUT_MS, PACKAGE_LIST_MAX_OUTPUT_BYTES, PM_PATH_TIMEOUT_MS, PM_PATH_MAX_OUTPUT_BYTES, PULL_TIMEOUT_MS, PULL_MAX_OUTPUT_BYTES, LOGCAT_TIMEOUT_MS, LOGCAT_MAX_OUTPUT_BYTES, DUMPSYS_PACKAGE_TIMEOUT_MS, DUMPSYS_PACKAGE_MAX_OUTPUT_BYTES, DUMPSYS_WINDOW_MAX_OUTPUT_BYTES, LISTING_TIMEOUT_MS, LISTING_MAX_OUTPUT_BYTES, SETTINGS_TIMEOUT_MS, SETTINGS_MAX_OUTPUT_BYTES, SCREEN_TIMEOUT_MS, SCREEN_MAX_OUTPUT_BYTES, BUGREPORT_TIMEOUT_MS, BUGREPORT_MAX_OUTPUT_BYTES, createObservationEvidence, observedExecution, AdbDigestFailure, hashAdbFile, adbDigestError, partialObservationWithDigest, syncStagedAdbFile, prepareOutputDirectory, refuseExistingTarget, hardLinksUnsupported, publishScreenExclusively, publishBugreport, runtimeRootLease, removeOwnedOutputDirectory, reservePackageDestinations, AdbProvider;
function init_AdbProvider() {
	return (init_AdbProvider = __esmMin((() => {
		init_targetIdentity();
		init_AdbProviderIdentity();
		init_HostPlatform();
		init_callerPath();
		init_AdbNumericIssues();
		init_AdbFilesystemAdmission();
		init_AnalysisClientFailure();
		init_AnalysisProvider();
		init_providerConfigurationRefusal();
		init_adbDeviceAnalysis();
		init_resources();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_analysisErrorCancellation();
		init_pngHeader();
		init_result();
		init_runOwned();
		init_jsonValue();
		init_StableFileHash();
		init_OwnedRegularFile();
		init_RegularFile();
		init_OwnedFileHandle();
		init_evidence();
		init_analysisObservation();
		init_PrivateRuntimeRoot();
		init_providerCleanupError();
		init_runtimeControlUnavailableError();
		init_AdbCommand();
		init_AdbServer();
		init_AdbConfiguration();
		init_snapshotEnvironment();
		init_AdbDeviceOutput();
		init_AdbHostFileName();
		init_AdbInputSnapshot();
		init_AdbDirectoryListing();
		init_AdbShellOutput();
		init_AdbOperationResults();
		init_AdbDeviceOperations();
		init_errorMessage();
		init_sha256Hex();
		SHELL_TIMEOUT_MS = 3e4;
		PACKAGE_LIST_TIMEOUT_MS = 6e4;
		PACKAGE_LIST_MAX_OUTPUT_BYTES = 8 * 1024 * 1024;
		PM_PATH_TIMEOUT_MS = 3e4;
		PM_PATH_MAX_OUTPUT_BYTES = 64 * 1024;
		PULL_TIMEOUT_MS = 6e5;
		PULL_MAX_OUTPUT_BYTES = 1024 * 1024;
		LOGCAT_TIMEOUT_MS = 6e4;
		LOGCAT_MAX_OUTPUT_BYTES = 4 * 1024 * 1024;
		DUMPSYS_PACKAGE_TIMEOUT_MS = 6e4;
		DUMPSYS_PACKAGE_MAX_OUTPUT_BYTES = 8 * 1024 * 1024;
		DUMPSYS_WINDOW_MAX_OUTPUT_BYTES = 8 * 1024 * 1024;
		LISTING_TIMEOUT_MS = 3e4;
		LISTING_MAX_OUTPUT_BYTES = 4 * 1024 * 1024;
		SETTINGS_TIMEOUT_MS = 2e4;
		SETTINGS_MAX_OUTPUT_BYTES = 1024 * 1024;
		SCREEN_TIMEOUT_MS = 6e4;
		SCREEN_MAX_OUTPUT_BYTES = 32 * 1024 * 1024;
		BUGREPORT_TIMEOUT_MS = 6e5;
		BUGREPORT_MAX_OUTPUT_BYTES = 1024 * 1024;
		createObservationEvidence = (operation, parameters, execution) => createAnalysisExecutionEvidence(operation, parameters, {
			...execution,
			authority: execution.authority ?? "external-service"
		}, "observed");
		observedExecution = (result) => result.ok ? ok({
			...result.value,
			authority: result.value.authority ?? "external-service"
		}) : result;
		AdbDigestFailure = class extends Error {
			fileFailure;
			bindCleanupError;
			constructor(fileFailure, bindCleanupError) {
				super(fileFailure.message, { cause: fileFailure });
				this.fileFailure = fileFailure;
				this.bindCleanupError = bindCleanupError;
			}
		};
		hashAdbFile = async (path, operation, signal, resources) => {
			let closeLease;
			try {
				return await hashStableFile(path, {
					...signal === undefined ? {} : { signal },
					retainFailedClose: (handle) => {
						closeLease = new AnalysisCleanupLease(() => handle.close(), [path]);
						resources.retain({
							kind: "lease",
							resource: `${path} (ADB digest handle)`,
							lease: closeLease
						});
					}
				});
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure || cause instanceof RegularFileCancelled) throw new AdbDigestFailure(cause, (error) => {
					closeLease?.bindCleanupError(error);
				});
				if (cause instanceof RegularFileOperationCancelled) throw cancelledBy(operation, carriedReason(cause.reason));
				throw cause;
			}
		};
		adbDigestError = (cause, operation, partialObservation) => {
			const digestFailure = cause.fileFailure;
			const digestOutcome = digestFailure.outcome;
			if (digestOutcome.kind === "completed") partialObservation = partialObservationWithDigest(partialObservation, digestOutcome.value);
			if (digestFailure instanceof RegularFileCancelled) return cancelledBy(operation, carriedReason(digestFailure.reason), { partialObservation });
			const resource = `${digestFailure.path} (ADB digest handle)`;
			const reason = errorMessage(digestFailure.cleanupCause);
			const cleanup = new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [resource], { reason }, {
				operation,
				cause: digestFailure,
				partialObservation
			});
			const primaryCause = digestOutcome.kind === "failed" ? digestOutcome.cause : undefined;
			const cancellation = regularFileCancellation(digestFailure);
			if (cancellation !== undefined) {
				const error = cancelledBy(operation, carriedReason(cancellation.reason), {
					cleanup: {
						reason,
						resources: [resource]
					},
					partialObservation
				});
				cause.bindCleanupError(error);
				return error;
			}
			const primary = primaryCause instanceof AnalysisError ? primaryCause : new AnalysisOutputError(operation, `The pulled file could not be fully digested or its handle could not be closed: ${digestFailure.path}`, {
				cause: digestOutcome.kind === "failed" ? primaryCause : digestFailure,
				partialObservation
			});
			primary.retainPartialObservation(partialObservation);
			const error = analysisErrorWithCleanupFailure(primary, cleanup, operation);
			cause.bindCleanupError(error);
			return error;
		};
		partialObservationWithDigest = (observation, digest) => {
			if (observation.operation === "pull_adb_file") {
				const { result } = observation;
				if (!("digest_status" in result)) return observation;
				return {
					...observation,
					result: {
						client: result.client,
						serial: result.serial,
						local_path: result.local_path,
						device_path: result.device_path,
						bytes: digest.bytes,
						sha256: digest.sha256
					}
				};
			}
			if (observation.operation === "collect_adb_bugreport") {
				const { result } = observation;
				if (!("digest_status" in result)) return observation;
				return {
					...observation,
					result: {
						client: result.client,
						serial: result.serial,
						local_path: result.local_path,
						adb_reported_path: result.adb_reported_path,
						bytes: digest.bytes,
						sha256: digest.sha256
					}
				};
			}
			return observation;
		};
		syncStagedAdbFile = async (path, resources, operation) => {
			let owner;
			let primary;
			try {
				owner = new OwnedFileHandle(await open(path, "r+"));
				await owner.handle.sync();
			} catch (cause) {
				primary = cause;
			}
			if (owner === undefined) {
				if (primary !== undefined) throw primary;
				return;
			}
			const resource = `${path} (ADB staged-output handle)`;
			const stagedOwner = owner;
			const closeLease = new AnalysisCleanupLease(() => stagedOwner.close(), [resource]);
			const released = await resources.release({
				kind: "lease",
				resource,
				lease: closeLease
			});
			if (released.kind === "failed") {
				const cleanup = new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [resource], { reason: errorMessage(released.cause) }, {
					operation,
					cause: released.cause
				});
				let reported;
				if (primary !== undefined) {
					const failure = new AnalysisOutputError(operation, `The staged ADB output could not be synchronized: ${path}`, { cause: primary });
					reported = analysisErrorWithCleanupFailure(failure, cleanup, operation);
				} else {
					reported = cleanup;
				}
				closeLease.bindCleanupError(reported);
				throw reported;
			}
			if (primary !== undefined) throw primary;
		};
		prepareOutputDirectory = async (operation, directory) => {
			const root = absoluteCallerPath(directory);
			try {
				await mkdir(root, { recursive: true });
				await access(root, constants.W_OK);
			} catch (cause) {
				const code = adbFilesystemErrorCode(cause);
				if (code === "EEXIST" || code === "ENOTDIR") return err(new AnalysisInputError(operation, { cause }, [{
					path: ["output_directory"],
					reason: "invalid_value",
					message: "The selected output path or a parent is not a directory.",
					observed: {
						path: directory,
						code
					}
				}]));
				return err(new AnalysisOutputError(operation, `The output directory is not writable or could not be created: ${root}`, { cause }));
			}
			return ok(root);
		};
		refuseExistingTarget = async (operation, path) => {
			if (await lstat(path).then(() => true, () => false)) return new AnalysisOutputError(operation, `The output file already exists: ${path}`);
			return undefined;
		};
		hardLinksUnsupported = (cause) => cause instanceof Error && "code" in cause && [
			"EPERM",
			"EOPNOTSUPP",
			"ENOTSUP",
			"ENOSYS",
			"EXDEV"
		].includes(String(cause.code));
		publishScreenExclusively = async (outputPath, bytes, resources, operation, signal) => {
			if (signal?.aborted === true) throw cancelledBy(operation, signal);
			const output = await open(outputPath, "wx", 384);
			const ownedOutput = new OwnedFileHandle(output);
			const handleResource = `${outputPath} (ADB publication handle)`;
			const closeOnly = new AnalysisCleanupLease(() => ownedOutput.close(), [handleResource]);
			const removeOutput = async (expected) => {
				let current;
				try {
					current = await lstat(outputPath);
				} catch (cause) {
					if (cause instanceof Error && Reflect.get(cause, "code") === "ENOENT") return;
					throw cause;
				}
				if (current.dev !== expected.dev || current.ino !== expected.ino || current.mode !== expected.mode) throw new Error(`The screen output changed before cleanup: ${outputPath}`);
				await rm(outputPath);
			};
			let rollbackIdentity;
			const inspectCloseAndRollback = new AnalysisCleanupLease(async () => {
				rollbackIdentity ??= await output.stat();
				await ownedOutput.close();
				await removeOutput(rollbackIdentity);
			});
			let identity;
			try {
				identity = await output.stat();
			} catch (cause) {
				resources.retain({
					kind: "lease",
					resource: `${outputPath} (screen output and descriptor)`,
					lease: inspectCloseAndRollback
				});
				const error = new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [handleResource, outputPath], { reason: "The newly created screen output identity could not be established; its descriptor remains owned for cleanup retry" }, {
					operation,
					cause
				});
				inspectCloseAndRollback.bindCleanupError(error);
				throw error;
			}
			let writeFailure;
			try {
				await output.writeFile(bytes);
				await output.sync();
			} catch (cause) {
				writeFailure = { cause };
			}
			if (writeFailure === undefined) {
				try {
					await ownedOutput.close();
					return undefined;
				} catch (cause) {
					resources.retain({
						kind: "lease",
						resource: handleResource,
						lease: closeOnly
					});
					return {
						cause,
						resource: handleResource,
						bindCleanupError(error) {
							closeOnly.bindCleanupError(error);
						}
					};
				}
			}
			const rollback = new AnalysisCleanupLease(async () => {
				await ownedOutput.close();
				await removeOutput(identity);
			});
			try {
				await ownedOutput.close();
			} catch (closeCause) {
				resources.retain({
					kind: "lease",
					resource: outputPath,
					lease: rollback
				});
				const error = new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [outputPath], { reason: errorMessage(closeCause) }, {
					operation,
					cause: new AggregateError([writeFailure.cause, closeCause], "Screen output write and descriptor cleanup failed", { cause: writeFailure.cause })
				});
				rollback.bindCleanupError(error);
				throw error;
			}
			const removed = await resources.release({
				kind: "lease",
				resource: outputPath,
				lease: rollback
			});
			if (removed.kind === "failed") {
				const error = new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [outputPath], { reason: errorMessage(removed.cause) }, {
					operation,
					cause: new AggregateError([writeFailure.cause, removed.cause], "Screen output write and rollback failed", { cause: writeFailure.cause })
				});
				rollback.bindCleanupError(error);
				throw error;
			}
			throw writeFailure.cause;
		};
		publishBugreport = async (source, directory) => {
			const fileName = basename(source);
			const extension = extname(fileName);
			const stem = extension === "" ? fileName : fileName.slice(0, -extension.length);
			for (let suffix = 0;; suffix += 1) {
				const destination = appendCallerPath(directory, suffix === 0 ? fileName : `${stem} (${String(suffix)})${extension}`);
				try {
					await copyFile(source, destination, constants.COPYFILE_EXCL);
					return destination;
				} catch (cause) {
					if (cause instanceof Error && "code" in cause && cause.code === "EEXIST") continue;
					throw cause;
				}
			}
		};
		runtimeRootLease = (root, children) => new AnalysisCleanupLease(async () => {
			await children.close();
			await root.close();
		}, { get cleanupResources() {
			return [root.path, ...children.cleanupResources];
		} });
		removeOwnedOutputDirectory = async (path, identity) => {
			if (identity === undefined) throw new Error(`Cannot verify the created output directory identity; refusing to remove ${path}`);
			let current;
			try {
				current = await lstat(path);
			} catch (cause) {
				if (cause instanceof Error && Reflect.get(cause, "code") === "ENOENT") return;
				throw cause;
			}
			if (!current.isDirectory() || current.isSymbolicLink() || current.dev !== identity.dev || current.ino !== identity.ino || current.mode !== identity.mode) throw new Error(`The created output directory was replaced or changed; refusing to remove ${path}`);
			await rm(path, {
				recursive: true,
				force: true
			});
		};
		reservePackageDestinations = async (operation, packageName, packageDirectory, entries, capturedOutput) => {
			const reservations = [];
			for (const entry of entries) {
				const path = appendCallerPath(packageDirectory, entry.file_name);
				try {
					await mkdir(path);
					const created = await lstat(path);
					if (!created.isDirectory() || created.isSymbolicLink()) throw new Error(`Could not reserve local filename ${entry.file_name}`);
					reservations.push({
						path,
						file_name: entry.file_name,
						device_path: entry.device_path,
						identity: {
							dev: created.dev,
							ino: created.ino,
							mode: created.mode
						}
					});
				} catch (cause) {
					const errorCode = cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause.code : null;
					return new AnalysisOutputError(operation, "local_destination_unavailable", {
						cause,
						capturedOutput,
						userMessage: `pm path for ${packageName} reported ${displayDevicePath(entry.device_path)}, whose file name ${displayDevicePath(entry.file_name)} cannot be written to a unique local destination (${errorCode ?? "unknown error"}). No APK was pulled.`,
						remediationAction: "Review details.diagnostics and details.captured_output for the refused destination. Correct the output filesystem conflict before retrying; REA does not rename APKs.",
						diagnostics: {
							package_name: packageName,
							device_path: entry.device_path,
							file_name: entry.file_name,
							error_code: errorCode
						}
					});
				}
			}
			for (const reservation of reservations) {
				try {
					const current = await lstat(reservation.path);
					if (!current.isDirectory() || current.isSymbolicLink() || current.dev !== reservation.identity.dev || current.ino !== reservation.identity.ino || current.mode !== reservation.identity.mode) throw new Error(`The local filename reservation changed before release: ${reservation.path}`);
					await rmdir(reservation.path);
				} catch (cause) {
					const errorCode = cause instanceof Error && "code" in cause && typeof cause.code === "string" ? cause.code : null;
					return new AnalysisOutputError(operation, "local_destination_unavailable", {
						cause,
						capturedOutput,
						userMessage: `Could not release the local filename reservation for ${displayDevicePath(reservation.device_path)} (${errorCode ?? "unknown error"}); no APK was pulled.`,
						remediationAction: "Review details.diagnostics and details.captured_output for the refused destination. Correct the output filesystem conflict before retrying; REA does not rename APKs.",
						diagnostics: {
							package_name: packageName,
							device_path: reservation.device_path,
							file_name: reservation.file_name,
							error_code: errorCode
						}
					});
				}
			}
			return undefined;
		};
		AdbProvider = class {
			environment;
			platform;
			#createRuntimeRoot;
			#resources = new ArtifactResourceScope();
			#outputDirectoryRetryLeases = new WeakMap();
			#pendingOutputDirectoryCleanup = new Set();
			#activeOperations = new Set();
			#closing = false;
			#closePromise;
			#outputCleanupPromise;
			constructor(options = {}) {
				this.platform = options.platform ?? HOST_PLATFORM.platform;
				this.environment = snapshotEnvironment(options.environment ?? process.env, this.platform);
				this.#createRuntimeRoot = options.createRuntimeRoot ?? ((rootOptions) => PrivateRuntimeRoot.create(rootOptions));
			}
			/** The selected adb binary, with this provider retaining its commands' unfinished cleanup. */
			async selection(signal) {
				return {
					...await resolveAdbBinary(this.environment, this.platform, signal),
					resources: this.#resources
				};
			}
			/** Probe the selected adb binary; never contacts devices or the server. */
			async inspectAvailability(signal) {
				if (this.#closing) throw cancelledBy("inspect_adb_client", isAborted(signal) ? signal : OwnerCancellation.ownerClosed);
				if (signal?.aborted === true) throw cancelledBy("inspect_adb_client", signal);
				const release = this.#beginOperation();
				try {
					const retried = await this.#retryPendingCleanup("inspect_adb_client", {});
					if (!retried.ok) throw retried.error;
					const selection = await this.selection(signal);
					await inspectAdbClient(selection, signal);
					return {
						status: "available",
						code: null,
						reason: null,
						diagnostics: {
							selected_binary: selection.binary,
							path_source: selection.pathSource
						}
					};
				} catch (cause) {
					if (cause instanceof AdbConfigurationFailure) return adbConfigurationAvailability(cause);
					throw cause;
				} finally {
					release();
				}
			}
			/** Keep admitted probes and requests owned until their final cleanup settles. */
			#beginOperation() {
				let release;
				const active = new Promise((resolve) => {
					release = resolve;
				});
				this.#activeOperations.add(active);
				return () => {
					this.#activeOperations.delete(active);
					release();
				};
			}
			/** Retry removal of owned output directories retained after failed cleanup. */
			close() {
				this.#closing = true;
				if (this.#closePromise !== undefined) return this.#closePromise;
				const closing = (async () => {
					await Promise.all(this.#activeOperations);
					const failures = [];
					const failedLeases = new Set();
					let allFailuresHaveExactLeaseOwners = true;
					for (const cleanup of [() => this.#resources.close(), () => this.#retryOutputDirectoryCleanup()]) {
						try {
							await cleanup();
						} catch (cause) {
							failures.push(cause);
							const leases = (cause instanceof AnalysisError ? this.#outputDirectoryRetryLeases.get(cause) : undefined) ?? (cause instanceof ArtifactResourceRetryFailure ? cause.cleanupLeases : undefined);
							if (leases === undefined) allFailuresHaveExactLeaseOwners = false;
							for (const lease of leases ?? []) failedLeases.add(lease);
						}
					}
					if (failures.length > 0) {
						const resources = failures.flatMap((cause) => this.#cleanupResources(cause, "ADB provider-owned resource"));
						const error = new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [...new Set(resources)], { reason: failures.map((cause) => errorMessage(cause)).join("; ") }, {
							operation: "close_binary",
							cause: new AggregateError(failures, "ADB cleanup remains incomplete")
						});
						if (allFailuresHaveExactLeaseOwners && failedLeases.size > 0) new AnalysisCleanupLeaseGroup(error, [...failedLeases]);
						throw error;
					}
				})().finally(() => {
					if (this.#closePromise === closing) this.#closePromise = undefined;
				});
				this.#closePromise = closing;
				return this.#closePromise;
			}
			#cleanupResources(cause, resource) {
				if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) return cause.cleanup.resources;
				if (cause instanceof AnalysisError && cause.cleanupResources.length > 0) return cause.cleanupResources;
				return [resource];
			}
			#cleanupError(operation, parameters, causes, resources, execution) {
				const partialObservation = execution === undefined ? undefined : createObservationEvidence(operation, parameters, execution);
				return new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, resources, { reason: causes.map((cause) => errorMessage(cause)).join("; ") }, {
					operation,
					cause: new AggregateError(causes, "ADB operation cleanup failed"),
					...partialObservation === undefined ? {} : { partialObservation }
				});
			}
			async #withRuntimeRoot(operation, parameters, options, signal, work) {
				let root;
				try {
					root = await this.#createRuntimeRoot(options);
				} catch (cause) {
					return err(cause instanceof AnalysisError ? cause : cause instanceof RuntimeControlUnavailableError ? runtimeControlCapabilityError(ADB_PROVIDER_IDENTITY.id, operation, cause) : new AnalysisOutputError(operation, "Could not create an ADB private workspace", { cause }));
				}
				const children = new ArtifactResourceScope();
				const rootLease = runtimeRootLease(root, children);
				return finalizedResult(await runOwned(async () => {
					try {
						return await work(root, children);
					} catch (cause) {
						if (!(cause instanceof AdbInputSnapshotFailure)) return err(cause instanceof AnalysisError ? cause : new AnalysisProtocolError(`ADB ${operation} failed`, { cause }));
						const primary = cause.primaryCause instanceof AnalysisError ? cause.primaryCause : new AnalysisOutputError(operation, `The caller input could not be staged for adb: ${cause.sourcePath}`, { cause: cause.primaryCause ?? cause });
						return err(primary.retainSecondaryFailure(new AnalysisOutputError(operation, `ADB input snapshot cleanup previously failed for ${cause.sourcePath}`, { cause }), {}));
					}
				}, {
					providerId: ADB_PROVIDER_IDENTITY.id,
					operation,
					signal,
					close: async () => {
						const released = await this.#resources.release({
							kind: "lease",
							resource: root.path,
							lease: rootLease
						});
						if (released.kind === "released") return;
						const cleanup = this.#cleanupError(operation, parameters, [released.cause], [root.path, ...released.cause instanceof ArtifactReaderFailure && released.cause.cleanup !== undefined ? released.cause.cleanup.resources : []]);
						rootLease.bindCleanupError(cleanup);
						cleanup.bindCleanupResourceOwner(rootLease);
						throw cleanup;
					},
					partial: (completed) => createObservationEvidence(operation, parameters, completed)
				}));
			}
			#retainOutputDirectoryCleanup(owner, cleanup) {
				const liveResources = () => [...new Set([
					owner.path,
					...owner.resources?.() ?? [],
					...owner.primary.cleanupIncomplete ? owner.primary.cleanupResources : []
				])];
				const lease = new AnalysisCleanupLease(async () => {
					await owner.remove();
					if (owner.primary.cleanupIncomplete) throw new Error("ADB output directory primary cleanup remains incomplete");
				}, { get cleanupResources() {
					return liveResources();
				} });
				const error = analysisErrorWithCleanupFailure(owner.primary, cleanup, owner.operation);
				lease.bindCleanupError(error);
				error.bindCleanupResourceOwner(lease);
				this.#pendingOutputDirectoryCleanup.add({
					...owner,
					lease
				});
				return error;
			}
			#retryOutputDirectoryCleanup() {
				if (this.#outputCleanupPromise !== undefined) return this.#outputCleanupPromise;
				const cleanup = this.#performOutputDirectoryCleanup().finally(() => {
					if (this.#outputCleanupPromise === cleanup) this.#outputCleanupPromise = undefined;
				});
				this.#outputCleanupPromise = cleanup;
				return cleanup;
			}
			async #performOutputDirectoryCleanup() {
				const failures = [];
				for (const owner of this.#pendingOutputDirectoryCleanup) {
					try {
						await owner.lease.release();
						this.#pendingOutputDirectoryCleanup.delete(owner);
					} catch (cause) {
						const cleanup = new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, owner.lease.cleanupResources ?? [owner.path], { reason: errorMessage(cause) }, {
							operation: owner.operation,
							cause
						});
						const error = analysisErrorWithCleanupFailure(owner.primary, cleanup, owner.operation);
						owner.lease.bindCleanupError(error);
						error.bindCleanupResourceOwner(owner.lease);
						failures.push(error);
					}
				}
				if (failures.length > 0) {
					const error = failures.length === 1 ? failures[0] : new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [...new Set(failures.flatMap((failure) => failure.cleanupResources))], {
						reason: "Failed ADB output directories remain after cleanup retry",
						operations: [...this.#pendingOutputDirectoryCleanup].map(({ operation }) => operation),
						failures: failures.map(({ message, cleanupResources }) => ({
							message,
							resources: [...cleanupResources]
						}))
					}, {
						operation: "close_binary",
						cause: new AggregateError(failures, "Multiple ADB output directory cleanups failed")
					});
					const leases = [...this.#pendingOutputDirectoryCleanup].map(({ lease }) => lease);
					this.#outputDirectoryRetryLeases.set(error, leases);
					if (failures.length > 1) new AnalysisCleanupLeaseGroup(error, leases);
					throw error;
				}
			}
			async execute(request, options) {
				if (this.#closing) return err(cancelledBy(request.operation, OwnerCancellation.ownerClosed));
				const release = this.#beginOperation();
				try {
					const retried = await this.#retryPendingCleanup(request.operation, jsonObjectSchema.parse(request.input));
					if (!retried.ok) return retried;
					return observedExecution(await this.#executeOperation(request, options));
				} finally {
					release();
				}
			}
			async #retryPendingCleanup(operation, input) {
				try {
					await this.#resources.retryCleanup();
				} catch (cause) {
					const error = this.#cleanupError(operation, input, [cause], this.#cleanupResources(cause, "ADB provider-owned resource"));
					const leases = cause instanceof ArtifactResourceRetryFailure ? cause.cleanupLeases : undefined;
					if (leases !== undefined) new AnalysisCleanupLeaseGroup(error, leases);
					return err(error);
				}
				if (this.#pendingOutputDirectoryCleanup.size > 0) {
					try {
						await this.#retryOutputDirectoryCleanup();
					} catch (cause) {
						return err(cause instanceof AnalysisError ? cause : new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [...this.#pendingOutputDirectoryCleanup].map(({ path }) => path), { reason: errorMessage(cause) }, {
							operation,
							cause
						}));
					}
				}
				return ok(null);
			}
			async #executeOperation(request, options) {
				const signal = options?.signal;
				if (signal?.aborted === true) return err(cancelledBy(request.operation, signal));
				let selection;
				let identity;
				try {
					selection = await this.selection(signal);
					identity = await inspectAdbClient(selection, signal);
				} catch (cause) {
					if (cause instanceof AnalysisError) return err(analysisClientFailureForOperation(cause, ADB_PROVIDER_IDENTITY.id, request.operation, { prerequisite_operation: "inspect_adb_client" }));
					if (cause instanceof AdbConfigurationFailure) return err(providerConfigurationRefusal(ADB_PROVIDER_IDENTITY.id, request.operation, cause));
					return err(new AnalysisProtocolError(`adb version probe failed for ${request.operation}`, { cause }));
				}
				let serverStarted;
				if (request.operation !== "inspect_adb_client") {
					const baseSelection = selection;
					selection = {
						...baseSelection,
						startServer: () => serverStarted ??= startAdbServer(request.operation, baseSelection, signal)
					};
				}
				const client = clientIdentityResult(selection, identity);
				const provider = {
					...ADB_PROVIDER_IDENTITY,
					version: identity.version
				};
				const { operation } = request;
				const shell = (arguments_, limits) => runAdb(operation, { device: "serial" in request.input ? request.input.serial : operation }, selection, adbArguments("serial" in request.input ? request.input.serial : undefined, ["shell", ...arguments_]), {
					...limits,
					volatileOutput: true
				}, signal);
				const context = {
					operation,
					request,
					selection,
					client,
					provider,
					signal,
					shell
				};
				switch (operation) {
					case "inspect_adb_client": return inspectAdbClientOperation(context);
					case "list_adb_devices": return listAdbDevicesOperation(context);
					case "inspect_adb_device": return inspectAdbDeviceOperation(context);
					case "list_adb_packages": {
						const scopeFlag = request.input.scope === "third_party" ? "-3" : request.input.scope === "system" ? "-s" : null;
						const ran = await shell([
							"pm",
							"list",
							"packages",
							"-f",
							...scopeFlag === null ? [] : [scopeFlag]
						], {
							timeoutMs: PACKAGE_LIST_TIMEOUT_MS,
							maxOutputBytes: PACKAGE_LIST_MAX_OUTPUT_BYTES
						});
						if (!ran.ok) return ran;
						const { packages, unparsedLines } = parsePackageListOutput(ran.value.stdout);
						return ok(parsedListingExecution({
							client,
							serial: request.input.serial,
							scope: request.input.scope,
							packages
						}, unparsedLines, provider, ["base_apk_device_path is a device filesystem path, not a host-local path"]));
					}
					case "pull_adb_package": return this.pullPackage(operation, selection, client, provider, request.input, signal);
					case "read_adb_logcat": {
						const ran = await shell([
							"logcat",
							"-d",
							"-b",
							request.input.buffer,
							"-t",
							String(request.input.count),
							...request.input.pid === undefined ? [] : ["--pid", String(request.input.pid)]
						], {
							timeoutMs: LOGCAT_TIMEOUT_MS,
							maxOutputBytes: LOGCAT_MAX_OUTPUT_BYTES
						});
						if (!ran.ok) return ran;
						const lines = ran.value.stdout.split(/\r?\n/u);
						if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
						const bounded = lines.slice(-request.input.count);
						return ok(createAnalysisExecution({
							client,
							serial: request.input.serial,
							count: request.input.count,
							buffer: request.input.buffer,
							pid: request.input.pid ?? null,
							lines: bounded,
							total_bytes: ran.value.stdoutBytes,
							coverage: bounded.length !== lines.length || bounded.length === request.input.count ? "partial" : "complete"
						}, provider, { limitations: ["Reads a bounded dump (logcat -d); the newest lines are kept when the count cap trims", "coverage is partial when the requested count or capture budget truncated the dump"] }));
					}
					case "inspect_adb_package": {
						const ran = await shell([
							"dumpsys",
							"package",
							request.input.package
						], {
							timeoutMs: DUMPSYS_PACKAGE_TIMEOUT_MS,
							maxOutputBytes: DUMPSYS_PACKAGE_MAX_OUTPUT_BYTES
						});
						if (!ran.ok) return ran;
						const stdout = ran.value.stdout;
						if (/Unable to find package:/u.test(stdout) || stdout.trim() === "") return err(new AnalysisUnsupportedTargetError(operation, request.input.serial, `Package Manager did not report details for ${request.input.package}; it may not be installed for user 0`));
						const details = parseDumpsysPackageOutput(stdout);
						return ok(createAnalysisExecution({
							client,
							serial: request.input.serial,
							package_name: request.input.package,
							version_name: details.versionName,
							version_code: details.versionCode,
							first_install_time: details.firstInstallTime,
							last_update_time: details.lastUpdateTime,
							installer_package_name: details.installerPackageName,
							user_id: details.userId,
							pkg_flags: details.pkgFlags,
							requested_permissions_count: details.requestedPermissions,
							numeric_issues: details.numericIssues,
							coverage: details.numericIssues.total > 0 || details.requestedPermissions === null || details.versionCode === null && details.versionName === null ? "partial" : "complete"
						}, provider, { limitations: [
							"Fields are a fixed projection of dumpsys package output; version-dependent sections are ignored rather than guessed",
							"requested_permissions_count counts the listed requested permissions section; an absent section is zero only when dumpsys confirms a loaded parsed package",
							"A null requested_permissions_count means dumpsys reported pkg=null or did not establish that an omitted permission section is an empty inventory"
						] }));
					}
					case "pull_adb_file": return this.pullFile(operation, selection, client, provider, request.input, signal);
					case "push_adb_file": return this.pushFile(operation, selection, client, provider, request.input, signal);
					case "capture_adb_screen": return this.captureScreen(operation, selection, client, provider, request.input, signal);
					case "collect_adb_bugreport": return this.collectBugreport(operation, selection, client, provider, request.input, signal);
					case "list_adb_processes": {
						const ran = await shell(["ps", "-A"], {
							timeoutMs: LISTING_TIMEOUT_MS,
							maxOutputBytes: LISTING_MAX_OUTPUT_BYTES
						});
						if (!ran.ok) return ran;
						const { columns, processes, unparsedLines } = parseProcessListOutput(ran.value.stdout);
						return ok(parsedListingExecution({
							client,
							serial: request.input.serial,
							columns,
							processes
						}, unparsedLines, provider));
					}
					case "list_adb_directory": {
						const ran = await runAdbCapture(operation, {
							device: request.input.serial,
							path: request.input.device_path
						}, selection, adbArguments(request.input.serial, [
							"shell",
							"sh",
							"-c",
							"cd \"$1\" || exit\nexec find . -mindepth 1 -maxdepth 1 -exec sh -c \"$2\" rea-list-directory {} +",
							"rea-list-directory",
							request.input.device_path,
							ADB_DIRECTORY_BATCH_SCRIPT
						]), {
							timeoutMs: LISTING_TIMEOUT_MS,
							maxOutputBytes: LISTING_MAX_OUTPUT_BYTES,
							volatileOutput: true
						}, signal);
						if (!ran.ok) return ran;
						const { entries, unparsedLines } = parseAdbDirectoryListing(ran.value.stdout);
						return ok(parsedListingExecution({
							client,
							serial: request.input.serial,
							device_path: request.input.device_path,
							entries
						}, unparsedLines, provider, ["Entry kinds derive from stat permission mode; directory contents and link targets may change during capture"]));
					}
					case "list_adb_features": {
						const ran = await shell([
							"pm",
							"list",
							"features"
						], {
							timeoutMs: LISTING_TIMEOUT_MS,
							maxOutputBytes: LISTING_MAX_OUTPUT_BYTES
						});
						if (!ran.ok) return ran;
						const { features, unparsedLines } = parseFeatureListOutput(ran.value.stdout);
						return ok(parsedListingExecution({
							client,
							serial: request.input.serial,
							features
						}, unparsedLines, provider));
					}
					case "list_adb_services": {
						const ran = await shell(["service", "list"], {
							timeoutMs: LISTING_TIMEOUT_MS,
							maxOutputBytes: LISTING_MAX_OUTPUT_BYTES
						});
						if (!ran.ok) return ran;
						const { services, unparsedLines } = parseServiceListOutput(ran.value.stdout);
						return ok(parsedListingExecution({
							client,
							serial: request.input.serial,
							services
						}, unparsedLines, provider));
					}
					case "inspect_adb_display": {
						const size = await shell(["wm", "size"], {
							timeoutMs: SETTINGS_TIMEOUT_MS,
							maxOutputBytes: SETTINGS_MAX_OUTPUT_BYTES
						});
						if (!size.ok) return size;
						const density = await shell(["wm", "density"], {
							timeoutMs: SETTINGS_TIMEOUT_MS,
							maxOutputBytes: SETTINGS_MAX_OUTPUT_BYTES
						});
						if (!density.ok) return density;
						const parsedSize = parseWmSizeOutput(size.value.stdout);
						const parsedDensity = parseWmDensityOutput(density.value.stdout);
						const issues = collectNumericIssues();
						issues.append(parsedSize.numericIssues);
						issues.append(parsedDensity.numericIssues);
						const numericIssues = issues.facts();
						const displayFacts = {
							client,
							serial: request.input.serial,
							override_size: parsedSize.override,
							physical_density: parsedDensity.physical,
							override_density: parsedDensity.override,
							numeric_issues: numericIssues
						};
						if (parsedSize.physical === null) {
							const reason = parsedSize.physicalDeclared ? "physical_size_malformed" : "physical_size_absent";
							const partialObservation = adbDisplayPartialObservationSchema.parse({
								provider_id: "adb",
								operation: "inspect_adb_display",
								reason,
								result: {
									...displayFacts,
									physical_size: null,
									coverage: "partial"
								}
							});
							return err(new AnalysisProtocolError(parsedSize.physicalDeclared ? "wm size reported a malformed physical size" : "wm size did not report a physical size; the build may use an unsupported format", { partialObservation }));
						}
						return ok(createAnalysisExecution({
							...displayFacts,
							physical_size: parsedSize.physical,
							coverage: numericIssues.total > 0 || parsedDensity.physical === null ? "partial" : "complete"
						}, provider, { limitations: ["Override fields are null when no declaration was reported or its value was malformed; numeric_issues retains malformed declarations"] }));
					}
					case "inspect_adb_window": {
						let section = "windows";
						const ran = await shell([
							"dumpsys",
							"window",
							section
						], {
							timeoutMs: SHELL_TIMEOUT_MS,
							maxOutputBytes: DUMPSYS_WINDOW_MAX_OUTPUT_BYTES
						});
						if (!ran.ok) return ran;
						let focus = parseWindowFocusOutput(ran.value.stdout);
						if (focus.focus_summary === "unavailable") {
							section = "displays";
							const fallback = await shell([
								"dumpsys",
								"window",
								section
							], {
								timeoutMs: SHELL_TIMEOUT_MS,
								maxOutputBytes: DUMPSYS_WINDOW_MAX_OUTPUT_BYTES
							});
							if (!fallback.ok) return fallback;
							focus = parseWindowFocusOutput(fallback.value.stdout);
						}
						const declared = focus.focus_summary !== "unavailable";
						return ok(createAnalysisExecution({
							client,
							serial: request.input.serial,
							source_section: section,
							...focus
						}, provider, { limitations: [
							"Focus values are the window manager's declarations at read time; no interaction occurred",
							declared ? `Focus declarations were read from \`dumpsys window ${section}\`` : "Neither `dumpsys window windows` nor `dumpsys window displays` declared mCurrentFocus or mFocusedApp; focus is unknown, not absent",
							...focus.focus_summary === "ambiguous" ? ["Multiple focus contexts or repeated declarations prevent a singular focus summary; inspect focus_contexts for every declaration"] : []
						] }));
					}
					case "read_adb_setting": {
						const ran = await shell([
							"settings",
							"get",
							request.input.namespace,
							request.input.key
						], {
							timeoutMs: SETTINGS_TIMEOUT_MS,
							maxOutputBytes: SETTINGS_MAX_OUTPUT_BYTES
						});
						if (!ran.ok) return ran;
						const { value, deviceReportedNull } = parseSettingsGetOutput(ran.value.stdout);
						return ok(createAnalysisExecution({
							client,
							serial: request.input.serial,
							namespace: request.input.namespace,
							key: request.input.key,
							value,
							device_reported_null: deviceReportedNull
						}, provider, { limitations: ["Android prints the literal string null for absent keys; that is reported as a device-side null observation"] }));
					}
					case "resolve_adb_packages": {
						const ran = await shell([
							"pm",
							"list",
							"packages",
							"-f"
						], {
							timeoutMs: PACKAGE_LIST_TIMEOUT_MS,
							maxOutputBytes: PACKAGE_LIST_MAX_OUTPUT_BYTES
						});
						if (!ran.ok) return ran;
						const { packages, unparsedLines } = parsePackageListOutput(ran.value.stdout);
						const needle = request.input.query.toLowerCase();
						const matches = packages.filter((entry) => entry.package_name.toLowerCase().includes(needle));
						return ok(parsedListingExecution({
							client,
							serial: request.input.serial,
							query: request.input.query,
							matches,
							exact_match: matches.length === 1 && matches[0].package_name.toLowerCase() === needle
						}, unparsedLines, provider, ["Matching is a case-insensitive substring over package names; application display labels are not part of pm output"]));
					}
					case "install_adb_package": return this.installPackage(operation, selection, client, provider, request.input, signal);
					case "uninstall_adb_package": return this.uninstallPackage(operation, selection, client, provider, request.input, signal);
					case "start_adb_app": return this.startApp(operation, selection, client, provider, request.input, signal);
					case "start_adb_activity": return this.startActivity(operation, selection, client, provider, request.input, signal);
					case "stop_adb_app": return this.stopApp(operation, selection, client, provider, request.input, signal);
				}
			}
			async pullPackage(operation, selection, client, provider, input, signal) {
				const { serial, package: packageName } = input;
				const paths = await runAdb(operation, { device: serial }, selection, adbArguments(serial, [
					"shell",
					"pm",
					"path",
					packageName
				]), {
					timeoutMs: PM_PATH_TIMEOUT_MS,
					maxOutputBytes: PM_PATH_MAX_OUTPUT_BYTES,
					volatileOutput: true
				}, signal);
				if (!paths.ok) return paths;
				const parsed = parsePmPathOutput(paths.value.stdout, this.platform);
				const capturedOutput = {
					stdout: paths.value.stdout,
					stderr: paths.value.stderr,
					truncated: false
				};
				if (parsed.rejectedPaths.length > 0) {
					const first = parsed.rejectedPaths[0];
					const otherCount = parsed.rejectedPaths.length - 1;
					return err(new AnalysisOutputError(operation, "unsafe_device_path", {
						capturedOutput,
						userMessage: `pm path for ${packageName} reported an APK path that cannot be written as a file on this host: ${displayDevicePath(first.device_path)} (${first.reason})${otherCount > 0 ? ` and ${String(otherCount)} other path(s)` : ""}. No APK was pulled.`,
						remediationAction: "Review details.diagnostics for the refused device paths and details.captured_output for the retained pm path output. REA does not rename device-reported APK paths; correct the device path policy before retrying.",
						diagnostics: {
							package_name: packageName,
							rejected_paths: parsed.rejectedPaths.map(({ device_path, reason }) => ({
								device_path,
								reason
							}))
						}
					}));
				}
				if (parsed.paths.length === 0 && parsed.unparsedLines.total === 0) return err(new AnalysisUnsupportedTargetError(operation, serial, `Package Manager reported no APK paths for ${packageName}; it may not be installed for user 0`));
				if (parsed.unparsedLines.total > 0) return err(new AnalysisProtocolError(`pm path reported an unrecognized line: ${parsed.unparsedLines.sample[0]}`, { capturedOutput }));
				const destinationNames = new Set();
				for (const entry of parsed.paths) {
					if (destinationNames.has(entry.file_name)) return err(new AnalysisOutputError(operation, "duplicate_local_destination", {
						capturedOutput,
						userMessage: `pm path for ${packageName} reported multiple APK paths with the same local file name ${displayDevicePath(entry.file_name)}; no APK was pulled.`,
						remediationAction: "Review details.diagnostics and details.captured_output for the conflicting device paths. REA does not rename device-reported paths; correct Package Manager's path response before retrying.",
						diagnostics: {
							package_name: packageName,
							file_name: entry.file_name,
							device_paths: parsed.paths.filter((candidate) => candidate.file_name === entry.file_name).map((candidate) => candidate.device_path)
						}
					}));
					destinationNames.add(entry.file_name);
				}
				const directory = await prepareOutputDirectory(operation, input.output_directory);
				if (!directory.ok) return directory;
				const packageDirectory = appendCallerPath(directory.value, packageName);
				let packageDirectoryCreated = false;
				let packageDirectoryIdentity;
				try {
					if (await lstat(packageDirectory).then(() => true, () => false)) throw new Error(`The package output directory already exists: ${packageDirectory}`);
					await mkdir(packageDirectory);
					packageDirectoryCreated = true;
					const created = await lstat(packageDirectory);
					if (!created.isDirectory() || created.isSymbolicLink()) throw new Error(`The created package output is not a regular directory: ${packageDirectory}`);
					packageDirectoryIdentity = {
						dev: created.dev,
						ino: created.ino,
						mode: created.mode
					};
				} catch (cause) {
					const primary = new AnalysisOutputError(operation, errorMessage(cause), { cause });
					if (!packageDirectoryCreated) return err(primary);
					const owner = {
						operation,
						path: packageDirectory,
						primary,
						remove: () => removeOwnedOutputDirectory(packageDirectory, packageDirectoryIdentity)
					};
					const cleanup = new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [packageDirectory], { reason: "Could not establish an owned package directory identity" }, {
						operation,
						cause
					});
					return err(this.#retainOutputDirectoryCleanup(owner, cleanup));
				}
				const failOwnedPackage = async (primary) => {
					const owner = {
						operation,
						path: packageDirectory,
						primary,
						remove: () => removeOwnedOutputDirectory(packageDirectory, packageDirectoryIdentity)
					};
					try {
						await owner.remove();
					} catch (cause) {
						const cleanup = new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [packageDirectory], { reason: errorMessage(cause) }, {
							operation,
							cause
						});
						return err(this.#retainOutputDirectoryCleanup(owner, cleanup));
					}
					return err(primary);
				};
				const destinationError = await reservePackageDestinations(operation, packageName, packageDirectory, parsed.paths, capturedOutput);
				if (destinationError !== undefined) return failOwnedPackage(destinationError);
				const artifacts = [];
				const failures = [];
				const observedFailures = () => failures.map(({ device_path, stage, message }) => ({
					device_path,
					stage,
					message
				}));
				const cancelledPackagePull = (error, localPath, devicePath, stage) => {
					error.retainPartialObservation({
						provider_id: "adb",
						operation,
						result: {
							client,
							serial,
							package_name: packageName,
							output_directory: directory.value,
							artifacts,
							failures: [...observedFailures(), {
								device_path: devicePath,
								stage,
								message: stage === "pull" ? `Pull cancelled; any incomplete file is retained at ${localPath}. Remaining APKs were not attempted.` : `Digesting the pulled file was cancelled; the file is retained at ${localPath}. Remaining APKs were not attempted.`
							}],
							coverage: "partial"
						}
					});
					return err(error);
				};
				for (const entry of parsed.paths) {
					const localPath = appendCallerPath(packageDirectory, entry.file_name);
					const pulled = await runAdb(operation, {
						device: serial,
						path: entry.device_path,
						localPath
					}, selection, adbArguments(serial, [
						"pull",
						entry.device_path,
						localPath
					]), {
						timeoutMs: PULL_TIMEOUT_MS,
						maxOutputBytes: PULL_MAX_OUTPUT_BYTES
					}, signal);
					if (!pulled.ok) {
						if (pulled.error.cleanupIncomplete) {
							pulled.error.retainPartialObservation({
								provider_id: "adb",
								operation,
								result: {
									client,
									serial,
									package_name: packageName,
									output_directory: directory.value,
									artifacts,
									failures: [...observedFailures(), {
										device_path: entry.device_path,
										stage: "pull",
										message: `Pull cleanup remains incomplete; any incomplete file is retained at ${localPath}. Remaining APKs were not attempted.`
									}],
									coverage: "partial"
								}
							});
							return err(pulled.error);
						}
						if (pulled.error instanceof AnalysisCancelledError) return cancelledPackagePull(pulled.error, localPath, entry.device_path, "pull");
						failures.push({
							device_path: entry.device_path,
							stage: "pull",
							message: pulled.error.message,
							cause: pulled.error
						});
						continue;
					}
					try {
						const digest = await hashAdbFile(localPath, operation, signal, this.#resources);
						artifacts.push({
							device_path: entry.device_path,
							file_name: entry.file_name,
							local_path: localPath,
							bytes: digest.bytes,
							sha256: digest.sha256,
							role: entry.role,
							role_basis: "file_name"
						});
					} catch (cause) {
						const digestFailure = cause instanceof AdbDigestFailure ? cause.fileFailure : undefined;
						const completedDigest = digestFailure?.outcome.kind === "completed" ? digestFailure.outcome.value : undefined;
						const partialObservation = {
							provider_id: "adb",
							operation,
							result: {
								client,
								serial,
								package_name: packageName,
								output_directory: directory.value,
								artifacts: completedDigest === undefined ? artifacts : [...artifacts, {
									device_path: entry.device_path,
									file_name: entry.file_name,
									local_path: localPath,
									bytes: completedDigest.bytes,
									sha256: completedDigest.sha256,
									role: entry.role,
									role_basis: "file_name"
								}],
								failures: [...observedFailures(), {
									device_path: entry.device_path,
									stage: "digest",
									message: completedDigest === undefined ? `The pulled file remains at ${localPath}, but its digest and descriptor cleanup are unconfirmed.` : digestFailure instanceof RegularFileCancelled ? `The pulled file digest and descriptor cleanup are confirmed; the request was cancelled: ${localPath}` : `The pulled file digest is known, but its descriptor cleanup is unconfirmed: ${localPath}`
								}],
								coverage: "partial"
							}
						};
						if (cause instanceof AdbDigestFailure) return err(adbDigestError(cause, operation, partialObservation));
						if (cause instanceof AnalysisCancelledError) return cancelledPackagePull(cause, localPath, entry.device_path, "digest");
						const physicalCause = stableFileHashCause(cause);
						failures.push({
							device_path: entry.device_path,
							stage: "digest",
							message: `The pulled file could not be read back after pulling: ${localPath}: ${errorMessage(physicalCause)}`,
							cause
						});
					}
				}
				if (artifacts.length === 0 && failures.length > 0) {
					const firstCause = failures[0].cause;
					const primary = firstCause instanceof AnalysisError ? firstCause : new AnalysisProtocolError(`Every APK pull failed for ${packageName} on ${serial}: ${failures[0].message}`, { cause: new AggregateError(failures.map(({ cause }) => cause), "APK pulls failed") });
					primary.retainPartialObservation({
						provider_id: "adb",
						operation,
						result: {
							client,
							serial,
							package_name: packageName,
							output_directory: directory.value,
							artifacts,
							failures: observedFailures(),
							coverage: "partial"
						}
					});
					return failOwnedPackage(primary);
				}
				return ok(createAnalysisExecution({
					client,
					serial,
					package_name: packageName,
					output_directory: directory.value,
					artifacts,
					failures: observedFailures(),
					coverage: failures.length === 0 ? "complete" : "partial"
				}, provider, { limitations: ["APK role names derive from the pulled file names (base.apk, split_*.apk)", "Pulled artifacts are host-local copies; the device retains the originals"] }));
			}
			async pullFile(operation, selection, client, provider, input, signal) {
				const derived = adbHostFileName(input.device_path, this.platform);
				if (!derived.ok) return err(new AnalysisInputError(operation, undefined, [{
					path: ["device_path"],
					reason: "invalid_value",
					message: `The device path ${JSON.stringify(input.device_path)} does not name a file that can be written on this host (${derived.reason}); REA never renames a device-reported file.`
				}]));
				const directory = await prepareOutputDirectory(operation, input.output_directory);
				if (!directory.ok) return directory;
				const localPath = appendCallerPath(directory.value, derived.fileName);
				const existing = await refuseExistingTarget(operation, localPath);
				if (existing !== undefined) return err(existing);
				const pulled = await runAdb(operation, {
					device: input.serial,
					path: input.device_path,
					localPath
				}, selection, adbArguments(input.serial, [
					"pull",
					input.device_path,
					localPath
				]), {
					timeoutMs: PULL_TIMEOUT_MS,
					maxOutputBytes: PULL_MAX_OUTPUT_BYTES
				}, signal);
				if (!pulled.ok) {
					const output = await lstat(localPath).catch(() => undefined);
					if (output?.isFile() === true && !output.isSymbolicLink()) pulled.error.retainPartialObservation({
						provider_id: "adb",
						operation,
						result: {
							client,
							serial: input.serial,
							local_path: localPath,
							device_path: input.device_path,
							digest_status: "unknown",
							transfer_status: "unconfirmed"
						}
					});
					return pulled;
				}
				try {
					const digest = await hashAdbFile(localPath, operation, signal, this.#resources);
					return ok(createAnalysisExecution({
						client,
						serial: input.serial,
						device_path: input.device_path,
						local_path: localPath,
						bytes: digest.bytes,
						sha256: digest.sha256
					}, provider, { limitations: ["The pulled file is a host-local copy; the device retains the original"] }));
				} catch (cause) {
					const partialObservation = {
						provider_id: "adb",
						operation,
						result: {
							client,
							serial: input.serial,
							local_path: localPath,
							device_path: input.device_path,
							digest_status: "unknown"
						}
					};
					if (cause instanceof AdbDigestFailure) return err(adbDigestError(cause, operation, partialObservation));
					if (cause instanceof AnalysisCancelledError) {
						cause.retainPartialObservation(partialObservation);
						return err(cause);
					}
					return err(new AnalysisOutputError(operation, `The pulled file could not be read back after pulling: ${localPath}`, {
						cause,
						partialObservation
					}));
				}
			}
			async pushFile(operation, selection, client, provider, input, signal) {
				const localPath = absoluteCallerPath(input.local_path);
				const invalid = await adbInputFileError(operation, "local_path", input.local_path, localPath);
				if (invalid !== undefined) return err(invalid);
				return this.#withRuntimeRoot(operation, {
					serial: input.serial,
					local_path: localPath,
					device_path: input.device_path,
					overwrite: input.overwrite
				}, { prefix: "rea-adb-input-" }, signal, async (root, resources) => {
					const digest = await snapshotAdbInput(localPath, root, resources, operation, signal);
					const scopedSelection = {
						...selection,
						resources
					};
					const directoryProbe = await probeAdbPathDirectory(operation, input.serial, input.device_path, scopedSelection, {
						timeoutMs: SETTINGS_TIMEOUT_MS,
						maxOutputBytes: 1024
					}, signal);
					if (!directoryProbe.ok) return directoryProbe;
					const devicePath = directoryProbe.value.matches ? `${input.device_path}${input.device_path.endsWith("/") ? "" : "/"}${basename(localPath)}` : input.device_path;
					const existsProbe = await probeAdbPathExistence(operation, input.serial, devicePath, scopedSelection, {
						timeoutMs: SETTINGS_TIMEOUT_MS,
						maxOutputBytes: 1024
					}, signal);
					if (!existsProbe.ok) return existsProbe;
					const deviceExists = existsProbe.value.matches;
					if (deviceExists && !input.overwrite) return err(new AnalysisOutputError(operation, `The device path already exists and overwrite was not requested: ${devicePath}`));
					const pushed = await runAdb(operation, {
						device: input.serial,
						path: input.device_path,
						localPath: digest.path
					}, scopedSelection, adbArguments(input.serial, [
						"push",
						digest.path,
						input.device_path
					]), {
						timeoutMs: PULL_TIMEOUT_MS,
						maxOutputBytes: PULL_MAX_OUTPUT_BYTES
					}, signal);
					if (!pushed.ok) return pushed;
					const observedProbeStartup = directoryProbe.value.capturedOutput.stderr !== "" || existsProbe.value.capturedOutput.stderr !== "";
					const probeOutput = observedProbeStartup ? { device_path_probes: {
						directory: { ...directoryProbe.value.capturedOutput },
						existence: { ...existsProbe.value.capturedOutput }
					} } : undefined;
					const receipt = (deviceDigest, rawResult) => createAnalysisExecution({
						client,
						serial: input.serial,
						local_path: localPath,
						device_path: devicePath,
						bytes: digest.bytes,
						sha256: digest.sha256,
						device_sha256: deviceDigest.device_sha256,
						overwritten: deviceExists,
						device_digest_source: deviceDigest.device_digest_source
					}, provider, {
						...rawResult === undefined && probeOutput === undefined ? {} : { rawResult: {
							...rawResult,
							...probeOutput
						} },
						limitations: ["Push writes a private snapshot of the caller's file to the device", ...deviceDigest.device_digest_source === "unavailable" ? [deviceDigest.reason] : []]
					});
					const deviceDigest = await runAdb(operation, {
						device: input.serial,
						path: devicePath
					}, scopedSelection, adbArguments(input.serial, [
						"shell",
						"sha256sum",
						devicePath
					]), {
						timeoutMs: SHELL_TIMEOUT_MS,
						maxOutputBytes: 1024 + 2 * Buffer.byteLength(devicePath)
					}, signal);
					if (!deviceDigest.ok) {
						const cancelled = deviceDigest.error instanceof AnalysisCancelledError;
						const cleanupIncomplete = deviceDigest.error.cleanupIncomplete;
						const hostCapacity = deviceDigest.error instanceof AnalysisResourceConstraintError && deviceDigest.error.resource === "capacity";
						const verificationFailed = cancelled || cleanupIncomplete || !hostCapacity && (deviceDigest.error instanceof AnalysisResourceConstraintError || deviceDigest.error instanceof AnalysisTimeoutError);
						const completed = receipt({
							device_sha256: null,
							device_digest_source: "unavailable",
							reason: cancelled ? "The device-side digest check was cancelled after push completed" : verificationFailed ? `Device-side digest verification failed after push completed: ${deviceDigest.error.message}` : hostCapacity ? `Push completed, but the transfer is not device-side verified: ${deviceDigest.error.reason}` : "The device did not answer sha256sum, so the transfer is not device-side verified"
						});
						if (verificationFailed) deviceDigest.error.retainPartialObservation(createEvidence(completed.subject ?? unknownTarget("not-observed"), completed.provider, {
							operation,
							parameters: input,
							result: completed.result,
							rawResult: completed.rawResult,
							limitations: completed.limitations,
							locations: completed.locations,
							confidence: "observed",
							authority: completed.authority ?? "external-service"
						}));
						return verificationFailed ? err(deviceDigest.error) : ok(completed);
					}
					const parsedDigest = parseSha256sumOutput(deviceDigest.value.stdout);
					const completed = parsedDigest === null ? receipt({
						device_sha256: null,
						device_digest_source: "unavailable",
						reason: "The device's sha256sum output contained no recognizable digest, so the transfer is not device-side verified"
					}, { device_sha256sum: {
						stdout: deviceDigest.value.stdout,
						stderr: deviceDigest.value.stderr
					} }) : receipt({
						device_sha256: parsedDigest,
						device_digest_source: "device_sha256sum"
					});
					if (parsedDigest !== null && parsedDigest !== digest.sha256) return err(new AnalysisArtifactChangedError(operation, devicePath, `The device-reported digest does not match the staged local file: ${localPath}`, { partialObservation: createEvidence(completed.subject ?? unknownTarget("not-observed"), completed.provider, {
						operation,
						parameters: input,
						result: completed.result,
						rawResult: completed.rawResult,
						limitations: completed.limitations,
						locations: completed.locations,
						confidence: "observed",
						authority: completed.authority ?? "external-service"
					}) }));
					return ok(completed);
				});
			}
			async installPackage(operation, selection, client, provider, input, signal) {
				const apkPath = absoluteCallerPath(input.apk_path);
				const invalid = await adbInputFileError(operation, "apk_path", input.apk_path, apkPath);
				if (invalid !== undefined) return err(invalid);
				return this.#withRuntimeRoot(operation, {
					serial: input.serial,
					apk_path: apkPath,
					replace: input.replace
				}, { prefix: "rea-adb-apk-" }, signal, async (root, resources) => {
					const digest = await snapshotAdbInput(apkPath, root, resources, operation, signal);
					const scopedSelection = {
						...selection,
						resources
					};
					const installed = await runAdb(operation, {
						device: input.serial,
						path: apkPath,
						localPath: digest.path
					}, scopedSelection, adbArguments(input.serial, [
						"install",
						...input.replace ? ["-r"] : [],
						digest.path
					]), {
						timeoutMs: PULL_TIMEOUT_MS,
						maxOutputBytes: PULL_MAX_OUTPUT_BYTES
					}, signal);
					if (!installed.ok) return packageChangeRefusal(operation, input.serial, installed.error) ?? installed;
					const verdict = parsePackageChangeOutput(installed.value.stdout);
					if (verdict.status === "unknown") return err(new AnalysisOutputError(operation, "ADB returned no installation verdict", { capturedOutput: {
						stdout: installed.value.stdout,
						stderr: installed.value.stderr,
						truncated: false
					} }));
					if (verdict.status === "failure") return err(new AnalysisUnsupportedTargetError(operation, input.serial, verdict.reason));
					return ok(createAnalysisExecution({
						client,
						serial: input.serial,
						apk_path: apkPath,
						bytes: digest.bytes,
						sha256: digest.sha256,
						replace_requested: input.replace,
						replaced: null
					}, provider, { limitations: ["Install changes device state; the installed APK's digest identifies the private host snapshot", "Whether an existing package was replaced is unknown; replace_requested records only the adb install mode"] }));
				});
			}
			async uninstallPackage(operation, selection, client, provider, input, signal) {
				const uninstalled = await runAdb(operation, { device: input.serial }, selection, adbArguments(input.serial, [
					"shell",
					"pm",
					"uninstall",
					"--user",
					"0",
					input.package
				]), {
					timeoutMs: PACKAGE_LIST_TIMEOUT_MS,
					maxOutputBytes: PULL_MAX_OUTPUT_BYTES
				}, signal);
				if (!uninstalled.ok) return packageChangeRefusal(operation, input.serial, uninstalled.error) ?? uninstalled;
				const verdict = parsePackageChangeOutput(uninstalled.value.stdout);
				if (verdict.status === "unknown") return err(new AnalysisOutputError(operation, "ADB returned no removal verdict", { capturedOutput: {
					stdout: uninstalled.value.stdout,
					stderr: uninstalled.value.stderr,
					truncated: false
				} }));
				if (verdict.status === "failure") return err(new AnalysisUnsupportedTargetError(operation, input.serial, verdict.reason));
				return ok(createAnalysisExecution({
					client,
					serial: input.serial,
					package_name: input.package
				}, provider, { limitations: ["Uninstall explicitly requests user 0 without data retention (-k); device enforcement is not independently verified"] }));
			}
			async startApp(operation, selection, client, provider, input, signal) {
				const resolved = await runAdb(operation, { device: input.serial }, selection, adbArguments(input.serial, [
					"shell",
					"cmd",
					"package",
					"resolve-activity",
					"--brief",
					"-c",
					"android.intent.category.LAUNCHER",
					input.package
				]), {
					timeoutMs: SHELL_TIMEOUT_MS,
					maxOutputBytes: PM_PATH_MAX_OUTPUT_BYTES,
					volatileOutput: true
				}, signal);
				if (!resolved.ok) return resolved;
				const component = parseResolveActivityOutput(resolved.value.stdout);
				if (component === null) return err(new AnalysisUnsupportedTargetError(operation, input.serial, `No launcher activity is declared for ${input.package}`));
				return this.runAmStart(operation, selection, client, provider, input.serial, ["-n", component], {
					client,
					serial: input.serial,
					package_name: input.package,
					component
				}, signal);
			}
			async startActivity(operation, selection, client, provider, input, signal) {
				const extraFlags = {
					string: "--es",
					boolean: "--ez",
					int: "--ei",
					long: "--el",
					float: "--ef"
				};
				const arguments_ = [
					"-a",
					input.action,
					...input.data_uri === undefined ? [] : ["-d", input.data_uri],
					...input.component === undefined ? [] : ["-n", input.component],
					...input.extras.flatMap((extra) => [
						extraFlags[extra.type],
						extra.key,
						extra.type === "int" ? extra.value.replace(/^(-?)0+(?=\d)/u, "$1") : extra.value
					])
				];
				return this.runAmStart(operation, selection, client, provider, input.serial, arguments_, {
					client,
					serial: input.serial,
					action: input.action,
					data_uri: input.data_uri ?? null,
					component: input.component ?? null,
					extras: input.extras.map((extra) => ({ ...extra }))
				}, signal);
			}
			async runAmStart(operation, selection, client, provider, serial, arguments_, resultFields, signal) {
				const buildActivityObservation = (verdict) => {
					const result = {
						...resultFields,
						started_activity: verdict.startedActivity,
						reported_activity: verdict.activity,
						reported_status: verdict.reportedStatus
					};
					return {
						result,
						partialObservation: operation === "start_adb_app" ? {
							provider_id: "adb",
							operation,
							result: adbResultSchemas.start_adb_app.parse(result)
						} : {
							provider_id: "adb",
							operation,
							result: adbResultSchemas.start_adb_activity.parse(result)
						}
					};
				};
				const started = await runAdb(operation, { device: serial }, selection, adbArguments(serial, [
					"shell",
					"am",
					"start",
					"-W",
					...arguments_
				]), {
					timeoutMs: SHELL_TIMEOUT_MS,
					maxOutputBytes: PM_PATH_MAX_OUTPUT_BYTES
				}, signal, (run) => {
					if (run.exitCode === 0) return undefined;
					const failure = adbExitFailure(operation, { device: serial }, run);
					if (adbExitedRunOf(failure) === undefined || run.exitCode !== 1) return failure;
					const verdict = parseAmStartOutput(run.capturedOutput.stdout);
					if (verdict.status !== "refused" || verdict.startedActivity === null) return failure;
					const { partialObservation } = buildActivityObservation(verdict);
					return new AnalysisUnsupportedTargetError(operation, serial, verdict.reason ?? "am start refused the intent", {
						capturedOutput: run.capturedOutput,
						partialObservation
					});
				});
				if (!started.ok) return started;
				const stdout = started.value.stdout;
				const stderr = started.value.stderr;
				const capturedOutput = {
					stdout,
					stderr,
					truncated: false
				};
				const verdict = parseAmStartOutput(stdout, stderr);
				const { result, partialObservation } = buildActivityObservation(verdict);
				if (verdict.status === "refused") {
					return err(new AnalysisUnsupportedTargetError(operation, serial, verdict.reason ?? "am start refused the intent", {
						capturedOutput,
						partialObservation
					}));
				}
				return ok(createAnalysisExecution(result, provider, {
					rawResult: {
						stdout,
						stderr
					},
					limitations: ["Starting an activity changes device state; am start -W waits for launch completion but no lifecycle observation is captured"]
				}));
			}
			async stopApp(operation, selection, client, provider, input, signal) {
				const stopped = await runAdb(operation, { device: input.serial }, selection, adbArguments(input.serial, [
					"shell",
					"am",
					"force-stop",
					input.package
				]), {
					timeoutMs: SHELL_TIMEOUT_MS,
					maxOutputBytes: PM_PATH_MAX_OUTPUT_BYTES
				}, signal);
				if (!stopped.ok) return stopped;
				return ok(createAnalysisExecution({
					client,
					serial: input.serial,
					package_name: input.package
				}, provider, { limitations: ["Force-stop succeeds even for packages with no running process; it reports completion, not prior state"] }));
			}
			async captureScreen(operation, selection, client, provider, input, signal) {
				const directory = await prepareOutputDirectory(operation, input.output_directory);
				if (!directory.ok) return directory;
				const localPath = appendCallerPath(directory.value, "screen.png");
				const existing = await refuseExistingTarget(operation, localPath);
				if (existing !== undefined) return err(existing);
				const captured = await runAdbCapture(operation, { device: input.serial }, selection, adbArguments(input.serial, [
					"exec-out",
					"screencap",
					"-p"
				]), {
					timeoutMs: SCREEN_TIMEOUT_MS,
					maxOutputBytes: SCREEN_MAX_OUTPUT_BYTES,
					volatileOutput: true
				}, signal);
				if (!captured.ok) return captured;
				if (signal?.aborted === true) return err(cancelledBy(operation, signal));
				const dimensions = readPngHeaderDimensions(captured.value.stdout);
				if (dimensions === undefined) return err(new AnalysisProtocolError("screencap returned an invalid PNG header; the device may not expose a display"));
				return this.#withRuntimeRoot(operation, {
					serial: input.serial,
					output_directory: directory.value
				}, {
					parent: directory.value,
					prefix: ".rea-screen-"
				}, signal, async (stage, resources) => {
					let publicationCloseFailure;
					let usedExclusiveFallback = false;
					try {
						const stagedPath = join(stage.path, "screen.png");
						await writeFile(stagedPath, captured.value.stdout, { flag: "wx" });
						await syncStagedAdbFile(stagedPath, resources, operation);
						if (signal?.aborted === true) return err(cancelledBy(operation, signal));
						try {
							await link(stagedPath, localPath);
						} catch (cause) {
							if (!hardLinksUnsupported(cause)) throw cause;
							usedExclusiveFallback = true;
							publicationCloseFailure = await publishScreenExclusively(localPath, captured.value.stdout, resources, operation, signal) ?? undefined;
						}
					} catch (cause) {
						if (cause instanceof AnalysisError) return err(cause);
						return err(new AnalysisOutputError(operation, `The screen output could not be published exclusively: ${localPath}`, { cause }));
					}
					const sha256 = sha256Hex(captured.value.stdout);
					const completed = createAnalysisExecution({
						client,
						serial: input.serial,
						local_path: localPath,
						bytes: captured.value.stdout.byteLength,
						sha256,
						width: dimensions.width,
						height: dimensions.height
					}, provider, { limitations: [
						"The capture is one frame at read time; no recording or interaction occurred",
						"PNG signature, IHDR framing, checksum, dimensions, and encoding fields are validated. Pixel data remains undecoded",
						...usedExclusiveFallback ? ["The exclusive-create fallback makes the output path visible while its bytes are being written"] : []
					] });
					if (publicationCloseFailure !== undefined) {
						const cleanupError = this.#cleanupError(operation, {
							serial: input.serial,
							output_directory: directory.value
						}, [publicationCloseFailure.cause], [publicationCloseFailure.resource], completed);
						publicationCloseFailure.bindCleanupError(cleanupError);
						return err(cleanupError);
					}
					return ok(completed);
				});
			}
			async collectBugreport(operation, selection, client, provider, input, signal) {
				const directory = await prepareOutputDirectory(operation, input.output_directory);
				if (!directory.ok) return directory;
				let stagingDirectory;
				let stagingIdentity;
				let retainedObservation;
				let publishedPath;
				try {
					stagingDirectory = await mkdtemp(appendCallerPath(directory.value, ".rea-bugreport-"));
				} catch (cause) {
					return err(new AnalysisOutputError(operation, "The bugreport staging directory could not be created", { cause }));
				}
				const commandResources = new ArtifactResourceScope();
				const collectedResult = await (async () => {
					let reportedPath = null;
					let commandFailure;
					try {
						const created = await lstat(stagingDirectory);
						if (!created.isDirectory() || created.isSymbolicLink()) throw new Error(`The created bugreport staging output is not a regular directory: ${stagingDirectory}`);
						stagingIdentity = {
							dev: created.dev,
							ino: created.ino,
							mode: created.mode
						};
						const collected = await runAdb(operation, { device: input.serial }, {
							...selection,
							resources: commandResources
						}, adbArguments(input.serial, ["bugreport", stagingDirectory]), {
							timeoutMs: BUGREPORT_TIMEOUT_MS,
							maxOutputBytes: BUGREPORT_MAX_OUTPUT_BYTES
						}, signal);
						if (!collected.ok) commandFailure = collected.error;
						const completedStdout = collected.ok ? collected.value.stdout : collected.error.capturedOutput?.exit_code === 0 && !collected.error.capturedOutput.truncated ? collected.error.capturedOutput.stdout : undefined;
						if (completedStdout === undefined) return collected;
						reportedPath = parseBugreportCopiedPath(completedStdout);
						if (reportedPath === null) return collected.ok ? err(new AnalysisProtocolError("adb bugreport did not report an archive path; the build may use an unsupported format")) : collected;
						const reportedParent = await stat(dirname(absoluteCallerPath(reportedPath)));
						if (!reportedParent.isDirectory() || reportedParent.dev !== stagingIdentity.dev || reportedParent.ino !== stagingIdentity.ino) return collected.ok ? err(new AnalysisProtocolError(`adb bugreport reported an archive outside its staging directory: ${reportedPath}`)) : collected;
						const archive = await lstat(reportedPath);
						if (!archive.isFile() || archive.isSymbolicLink()) return collected.ok ? err(new AnalysisProtocolError(`adb bugreport did not report a regular archive file: ${reportedPath}`)) : collected;
						retainedObservation = {
							provider_id: "adb",
							operation,
							result: {
								client,
								serial: input.serial,
								local_path: reportedPath,
								adb_reported_path: reportedPath,
								digest_status: "unknown"
							}
						};
						try {
							publishedPath = await publishBugreport(reportedPath, directory.value);
						} catch (cause) {
							const publishError = new AnalysisOutputError(operation, `The reported bugreport archive could not be published: ${reportedPath}`, {
								cause,
								partialObservation: retainedObservation
							});
							if (!collected.ok) {
								collected.error.retainPartialObservation(retainedObservation);
								return err(collected.error.retainSecondaryFailure(publishError, {}));
							}
							return err(publishError);
						}
						retainedObservation = {
							...retainedObservation,
							result: {
								...retainedObservation.result,
								local_path: publishedPath
							}
						};
						if (!collected.ok && collected.error instanceof AnalysisCancelledError) {
							collected.error.retainPartialObservation(retainedObservation);
							return collected;
						}
						const digest = await hashAdbFile(publishedPath, operation, signal, this.#resources);
						const report = {
							client,
							serial: input.serial,
							local_path: publishedPath,
							bytes: digest.bytes,
							sha256: digest.sha256,
							adb_reported_path: reportedPath
						};
						retainedObservation = {
							provider_id: "adb",
							operation,
							result: report
						};
						if (!collected.ok) {
							collected.error.retainPartialObservation(retainedObservation);
							return collected;
						}
						return ok(createAnalysisExecution(report, provider, { limitations: ["The archive is device-generated: dumpstate, dumpsys, and logcat content is the device's own report"] }));
					} catch (cause) {
						const readbackFailure = retainedObservation !== undefined && cause instanceof AdbDigestFailure ? adbDigestError(cause, operation, retainedObservation) : cause instanceof AnalysisCancelledError ? (() => {
							if (retainedObservation !== undefined) cause.retainPartialObservation(retainedObservation);
							return cause;
						})() : new AnalysisOutputError(operation, `The reported bugreport archive could not be read back: ${reportedPath ?? stagingDirectory}`, {
							cause,
							partialObservation: retainedObservation
						});
						if (readbackFailure.partialObservation !== undefined) retainedObservation = readbackFailure.partialObservation;
						if (commandFailure !== undefined) {
							if (retainedObservation !== undefined) commandFailure.retainPartialObservation(retainedObservation);
							return err(readbackFailure.cleanupIncomplete ? analysisErrorWithCleanupDependencies(commandFailure, readbackFailure, operation) : readbackFailure instanceof AnalysisCancelledError ? analysisErrorWithCancellation(commandFailure, readbackFailure) : commandFailure.retainSecondaryFailure(readbackFailure, {}));
						}
						return err(readbackFailure);
					}
				})();
				const retainCancellation = (failure) => signal?.aborted === true ? analysisErrorWithCancellation(failure, cancelledBy(operation, signal, { partialObservation: retainedObservation })) : failure;
				if (retainedObservation !== undefined && publishedPath === undefined) {
					if (commandResources.hasPending) this.#resources.retain({
						kind: "lease",
						resource: `${stagingDirectory} (ADB bugreport command)`,
						lease: AnalysisCleanupLease.forCloseOwner({
							close: () => commandResources.retryCleanup(),
							get cleanupResources() {
								return commandResources.cleanupResources;
							}
						}, `${stagingDirectory} (ADB bugreport command)`)
					});
					return collectedResult.ok ? collectedResult : err(retainCancellation(collectedResult.error) ?? collectedResult.error);
				}
				const removeStaging = async () => {
					await commandResources.retryCleanup();
					await removeOwnedOutputDirectory(stagingDirectory, stagingIdentity);
				};
				try {
					if (commandResources.hasPending) throw new Error("ADB bugreport command cleanup remains unconfirmed; retaining staging directory");
					await removeOwnedOutputDirectory(stagingDirectory, stagingIdentity);
				} catch (cause) {
					const primary = retainCancellation(collectedResult.ok ? undefined : collectedResult.error) ?? new AnalysisOutputError(operation, "The archive was published, but its staging directory could not be removed");
					if (retainedObservation !== undefined) primary.retainPartialObservation(retainedObservation);
					return err(this.#retainOutputDirectoryCleanup({
						operation,
						path: stagingDirectory,
						primary,
						remove: removeStaging,
						resources: () => commandResources.cleanupResources
					}, new ProviderCleanupError(ADB_PROVIDER_IDENTITY.id, [...new Set([
						stagingDirectory,
						...commandResources.cleanupResources,
						...primary.cleanupIncomplete ? primary.cleanupResources : []
					])], { reason: errorMessage(cause) }, {
						operation,
						cause
					})));
				}
				const failure = retainCancellation(collectedResult.ok ? undefined : collectedResult.error);
				return failure === undefined ? collectedResult : err(failure);
			}
		};
	})))();
}

//#endregion
//#region dist/composition/adb.js
var createAdbDeviceAnalysisProvider;
function init_adb() {
	return (init_adb = __esmMin((() => {
		init_AdbProvider();
		init_HostPlatform();
		createAdbDeviceAnalysisProvider = (environment = process.env, platform = HOST_PLATFORM.platform) => new AdbProvider({
			environment,
			platform
		});
	})))();
}

//#endregion
//#region dist/cli/adbCommands.js
var adbCommands_exports = /* @__PURE__ */ __exportAll({ registerAdbCommands: () => registerAdbCommands });
var serialFirst, ADB_COMMANDS, registerAdbCommands;
function init_adbCommands() {
	return (init_adbCommands = __esmMin((() => {
		init_AdbDeviceAnalysisService();
		init_adb();
		init_adbToolContracts();
		init_cliCommandNames();
		init_adbDeviceAnalysis();
		init_options();
		init_contractCliDescription();
		init_contractCommand();
		serialFirst = (...rest) => ["serial", ...rest];
		ADB_COMMANDS = {
			inspect_adb_client: [cliCommandFor("inspect_adb_client"), { description: "Inspect the caller-selected adb client without contacting devices" }],
			list_adb_devices: [cliCommandFor("list_adb_devices"), { description: "List attached devices with serial, state, transport, and inferred kind" }],
			inspect_adb_device: [cliCommandFor("inspect_adb_device"), {
				description: "Inspect one device's build identity through a fixed getprop whitelist",
				positionals: serialFirst()
			}],
			list_adb_packages: [cliCommandFor("list_adb_packages"), {
				description: "List installed packages on one device with base APK device paths",
				positionals: serialFirst()
			}],
			pull_adb_package: [cliCommandFor("pull_adb_package"), {
				description: "Pull one installed package's complete APK set with SHA-256 digests",
				positionals: serialFirst("package"),
				fields: { output_directory: { name: "output-directory" } }
			}],
			read_adb_logcat: [cliCommandFor("read_adb_logcat"), {
				description: "Read a bounded dump of the device log for one buffer",
				positionals: serialFirst()
			}],
			inspect_adb_package: [cliCommandFor("inspect_adb_package"), {
				description: "Inspect one installed package's version, installer, and flags through dumpsys",
				positionals: serialFirst("package")
			}],
			pull_adb_file: [cliCommandFor("pull_adb_file"), {
				description: "Pull one device file to a local copy with a SHA-256 digest",
				positionals: serialFirst("device_path"),
				fields: {
					device_path: { name: "device-path" },
					output_directory: { name: "output-directory" }
				}
			}],
			push_adb_file: [cliCommandFor("push_adb_file"), {
				description: "Push one local file to the device; refuses existing targets without --overwrite",
				positionals: serialFirst("local_path", "device_path"),
				fields: {
					local_path: { name: "local-path" },
					device_path: { name: "device-path" }
				}
			}],
			capture_adb_screen: [cliCommandFor("capture_adb_screen"), {
				description: "Capture one screen frame as a digested PNG",
				positionals: serialFirst(),
				fields: { output_directory: { name: "output-directory" } }
			}],
			list_adb_processes: [cliCommandFor("list_adb_processes"), {
				description: "List running processes exactly as ps -A reports them",
				positionals: serialFirst()
			}],
			list_adb_directory: [cliCommandFor("list_adb_directory"), {
				description: "List one device directory with kinds, permissions, and sizes",
				positionals: serialFirst("device_path"),
				fields: { device_path: { name: "device-path" } }
			}],
			list_adb_features: [cliCommandFor("list_adb_features"), {
				description: "List the device's declared hardware and software features",
				positionals: serialFirst()
			}],
			list_adb_services: [cliCommandFor("list_adb_services"), {
				description: "List the device's binder services and interfaces",
				positionals: serialFirst()
			}],
			inspect_adb_display: [cliCommandFor("inspect_adb_display"), {
				description: "Report the display's declared size and density",
				positionals: serialFirst()
			}],
			inspect_adb_window: [cliCommandFor("inspect_adb_window"), {
				description: "Report the window manager's current focus declarations",
				positionals: serialFirst()
			}],
			read_adb_setting: [cliCommandFor("read_adb_setting"), {
				description: "Read one settings value from system, secure, or global",
				positionals: serialFirst("namespace", "key")
			}],
			collect_adb_bugreport: [cliCommandFor("collect_adb_bugreport"), {
				description: "Collect and digest one device-generated bugreport archive",
				positionals: serialFirst(),
				fields: { output_directory: { name: "output-directory" } }
			}],
			resolve_adb_packages: [cliCommandFor("resolve_adb_packages"), {
				description: "Find installed packages by case-insensitive name substring",
				positionals: serialFirst("query")
			}],
			install_adb_package: [cliCommandFor("install_adb_package"), {
				description: "Install one local APK; --replace requests reinstall mode to keep existing app data",
				positionals: serialFirst("apk_path"),
				fields: { apk_path: { name: "apk-path" } }
			}],
			uninstall_adb_package: [cliCommandFor("uninstall_adb_package"), {
				description: "Uninstall one package and its data from the device",
				positionals: serialFirst("package")
			}],
			start_adb_app: [cliCommandFor("start_adb_app"), {
				description: "Start one installed app by resolving and launching its launcher activity",
				positionals: serialFirst("package")
			}],
			stop_adb_app: [cliCommandFor("stop_adb_app"), {
				description: "Force-stop every process of one package",
				positionals: serialFirst("package")
			}]
		};
		registerAdbCommands = (cli, logger, environment, provider = createAdbDeviceAnalysisProvider(environment)) => {
			const service = new AdbDeviceAnalysisService(provider);
			const run = (operation) => () => ({
				inspect: (input, { signal }) => service.execute(operation, input, { signal }),
				close: () => provider.close()
			});
			for (const [name, [command, projection]] of Object.entries(ADB_COMMANDS)) registerContractCommand(cli, logger, contractNamed(ADB_TOOL_CONTRACTS, name), {
				command,
				...projection
			}, analyzeWithService(run(name), "adb"));
			const startActivity = analyzeWithService(run("start_adb_activity"), "adb");
			registerContractCommand(cli, logger, contractNamed(ADB_TOOL_CONTRACTS, "start_adb_activity"), {
				description: "Start an intent with am start (action, URI, component, extras)",
				positionals: serialFirst("action"),
				fields: { data_uri: { name: "data-uri" } },
				omit: { extras: "Each extra is a repeatable --extra type:key:value option" },
				cliOptions: { extra: publishArgvInput(z.array(activityExtraCliEntrySchema).max(16).default([]).describe("Typed extra as type:key:value (string, boolean, int, long, float), repeatable")) }
			}, (input, context) => startActivity({
				...input,
				extras: context.cliOptions.extra
			}, context));
		};
	})))();
}

//#endregion
export { adbCommands_exports, init_adbCommands };