import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, MAX_NODE_TIMER_DELAY_MS, OwnerCancellation, cancelledBy, carriedReason, deadlineParameterLimit, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_errorMessage, init_fixedAllowanceRemediation, init_jsonValue, ownedJsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_safeJson, safeParseUtf8Json } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError, projectAnalysisErrorWithoutCapturedOutput } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { ArtifactFileCleanupFailure, ArtifactReaderFailure, ArtifactResourceScope, artifactFileCancellationCause, assertArtifactReadActive, bindArtifactFileCleanup, completedStableArtifact, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_readStableArtifact, init_resources, readStableArtifact, readerIntegrityFailure, stableArtifactInputFailure, withArtifactFileHandle } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError, providerCleanupErrorFromFailures } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { AnalysisCleanupRelease, init_analysisCleanupRelease } from "./analysisCleanupRelease-ME3hxZPc.js";
import { OwnedCommandFailure, init_OwnedCommand, ownedCommandResources, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { DEFAULT_SQLITE_WORKER_TIMEOUT_MS, SQLITE_DATABASE_OUTPUT_BYTES, init_sqliteDatabase, inspectSqliteDatabaseInputSchema, sqliteDatabaseSchema, sqliteInspectionParameters, sqliteSchemaHasObjectDeclaration, sqliteSchemaScope } from "./sqliteDatabase-bbzobPkZ.js";
import { SQLITE_PROVIDER_IDENTITY, init_SqliteProviderIdentity } from "./SqliteProviderIdentity-CWHXLRw8.js";
import { constants } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { lstat, open, realpath, writeFile } from "node:fs/promises";

//#region dist/application/sqlite/SqliteDatabaseService.js
var OPERATION$1, matchesSelectedSchema, matchesSelectedDatabase, SqliteDatabaseService;
function init_SqliteDatabaseService() {
	return (init_SqliteDatabaseService = __esmMin((() => {
		init_AnalysisInput();
		init_analysisErrorCore();
		init_analysisObservation();
		init_jsonValue();
		init_ProviderOperationExecution();
		init_sqliteDatabase();
		init_result();
		OPERATION$1 = "inspect_sqlite_database";
		matchesSelectedSchema = (schema, table) => sqliteSchemaHasObjectDeclaration(table) ? schema.tables.length === 1 && schema.tables[0]?.name === table && schema.indexes.every((index) => index.table === table) && schema.triggers.every((trigger) => trigger.table === table) && schema.views.length === 0 : schema.tables.length === 0 && schema.indexes.length === 0 && schema.views.length === 0 && schema.triggers.length === 0;
		matchesSelectedDatabase = (report, input, subject) => report.artifact.path === input.path && subject.path === input.path && subject.sha256 === report.artifact.sha256 && subject.format === "file" && report.worker_timeout_ms === (input.worker_timeout_ms ?? 3e4) && (report.wal === null || report.wal.path === `${input.path}-wal`) && report.schema.scope === sqliteSchemaScope(input) && (report.schema.scope !== "selected_table" || input.table !== undefined && matchesSelectedSchema(report.schema, input.table)) && (input.table === undefined ? report.rows === null : report.rows?.table === input.table && report.rows.row_limit === (input.row_limit ?? 20) && report.rows.row_offset === (input.row_offset ?? 0) && (input.columns === undefined || report.rows.columns.length === input.columns.length && report.rows.columns.every((name, index) => name === input.columns?.[index])));
		SqliteDatabaseService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			/** Await provider shutdown, retaining failed cleanup owners for retry. */
			close() {
				return this.provider.close?.() ?? Promise.resolve();
			}
			/** Inspect an explicit database snapshot and preserve its original database/WAL identity. */
			async inspect(rawInput, options) {
				const input = parseAnalysisInput(OPERATION$1, rawInput, inspectSqliteDatabaseInputSchema, options?.signal);
				if (!input.ok) return input;
				const inspected = await this.provider.inspect(input.value, options);
				if (!inspected.ok) return inspected;
				const execution = inspected.value;
				const report = sqliteDatabaseSchema.safeParse(execution.result);
				if (!report.success || execution.subject == null || !matchesSelectedDatabase(report.data, input.value, execution.subject)) return err(new AnalysisOutputError(OPERATION$1, "SQLite adapter returned malformed data or changed the selected database identity/table/row limit/worker budget."));
				return completeProviderEvidence(createAnalysisExecutionEvidence(OPERATION$1, sqliteInspectionParameters(input.value), {
					...execution,
					result: ownedJsonValueSchema.parse(report.data)
				}, "observed"), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/sqlite/SqliteDatabaseLimits.js
var SQLITE_DATABASE_LIMITS, SQLITE_WORKER_HEAP_BYTES, SQLITE_INSPECTION_REASONS, SQLITE_STRUCTURED_INSPECTION_REASONS, SqliteInspectionFailure, SqliteColumnEvaluationFailure, SqliteColumnLimitFailure, sqlitePrimaryResultCode;
function init_SqliteDatabaseLimits() {
	return (init_SqliteDatabaseLimits = __esmMin((() => {
		init_sqliteDatabase();
		SQLITE_DATABASE_LIMITS = {
			concurrentInspections: 2,
			inputBytes: 256 * 1024 * 1024,
			outputBytes: SQLITE_DATABASE_OUTPUT_BYTES,
			diagnosticBytes: 1024 * 1024,
			/** V8 old-space ceiling for the owned worker, passed as --max-old-space-size. */
			workerHeapMiB: 256
		};
		SQLITE_WORKER_HEAP_BYTES = SQLITE_DATABASE_LIMITS.workerHeapMiB * 1024 * 1024;
		SQLITE_INSPECTION_REASONS = [
			"format",
			"selection",
			"column-selection",
			"row-offset",
			"column-evaluation",
			"row-evaluation",
			"column-limit",
			"unsupported",
			"unavailable",
			"output-limit",
			"memory"
		];
		SQLITE_STRUCTURED_INSPECTION_REASONS = ["column-evaluation", "column-limit"];
		SqliteInspectionFailure = class extends Error {
			reason;
			constructor(reason, message) {
				super(message);
				this.reason = reason;
			}
		};
		SqliteColumnEvaluationFailure = class extends SqliteInspectionFailure {
			readableColumns;
			constructor(message, readableColumns) {
				super("column-evaluation", message);
				this.readableColumns = readableColumns;
			}
		};
		SqliteColumnLimitFailure = class extends SqliteInspectionFailure {
			selectedColumns;
			engineColumnLimit;
			constructor(message, selectedColumns, engineColumnLimit) {
				super("column-limit", message);
				this.selectedColumns = selectedColumns;
				this.engineColumnLimit = engineColumnLimit;
			}
		};
		sqlitePrimaryResultCode = (cause) => cause instanceof Error && "errcode" in cause && typeof cause.errcode === "number" ? cause.errcode & 255 : undefined;
	})))();
}

//#endregion
//#region dist/sqlite/SqliteDatabaseSnapshot.js
var fileSystem, SqliteSnapshotAcquisitionFailure, optionalSidecarStat, optionalStat, sameState, duringAcquisition, readObservedArtifact, verifyInactiveJournal, missingDatabase, captureSqliteDatabaseSnapshot;
function init_SqliteDatabaseSnapshot() {
	return (init_SqliteDatabaseSnapshot = __esmMin((() => {
		init_resources();
		init_analysisErrorCore();
		init_SqliteProviderIdentity();
		init_SqliteDatabaseLimits();
		fileSystem = {
			lstat: (path) => lstat(path, { bigint: true }),
			open,
			realpath
		};
		SqliteSnapshotAcquisitionFailure = class extends Error {
			operationCause;
			_tag = "SqliteSnapshotAcquisitionFailure";
			completedMembers;
			constructor(operationCause, members) {
				super(operationCause instanceof Error ? operationCause.message : "SQLite source acquisition failed after completed member reads", { cause: operationCause });
				this.operationCause = operationCause;
				this.name = this._tag;
				this.completedMembers = members.map((member) => ({ ...member }));
			}
		};
		optionalSidecarStat = async (path, databasePath, observedDatabase, member, selectedFileSystem) => {
			let observedSidecar;
			try {
				observedSidecar = await optionalStat(path, selectedFileSystem);
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && cause.code === "ENAMETOOLONG") {
					const currentDatabase = await duringAcquisition(databasePath, () => optionalStat(databasePath, selectedFileSystem));
					if (!sameState(observedDatabase, currentDatabase)) throw new ArtifactReaderFailure("integrity", `SQLite snapshot file set changed before sidecar inspection: ${databasePath}`, {
						cause,
						integrityCheck: "container-identity"
					});
					const remedy = "Use the application's supported consistent offline export or copy workflow to move the complete known database file set to a shorter path. Do not rename a live database or omit its WAL or journal.";
					throw new AnalysisCapabilityUnavailableError(SQLITE_PROVIDER_IDENTITY.id, "inspect_sqlite_database", `Cannot safely address the derived SQLite ${member} path (${String(cause.code)}): ${path}`, {
						cause,
						userMessage: `The derived SQLite ${member} path is too long to inspect safely (ENAMETOOLONG). ${remedy}`
					});
				}
				throw cause;
			}
			return observedSidecar;
		};
		optionalStat = async (path, selectedFileSystem) => {
			try {
				return await selectedFileSystem.lstat(path);
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return null;
				throw cause;
			}
		};
		sameState = (before, after) => before === null || after === null ? before === after : before.dev === after.dev && before.ino === after.ino && before.mode === after.mode && before.size === after.size && before.mtimeNs === after.mtimeNs && before.ctimeNs === after.ctimeNs;
		duringAcquisition = async (path, read) => {
			try {
				return await read();
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && [
					"ENOENT",
					"ENOTDIR",
					"ELOOP",
					"ENAMETOOLONG"
				].includes(String(cause.code))) throw new ArtifactReaderFailure("integrity", `SQLite snapshot file set changed during acquisition: ${path}`, {
					cause,
					integrityCheck: "container-identity"
				});
				if (cause instanceof ArtifactReaderFailure && cause.reason === "limit") {
					const changed = new ArtifactReaderFailure("integrity", `SQLite snapshot file set exceeded its observed size during acquisition: ${path}`, {
						integrityCheck: "container-identity",
						cause,
						...cause.partialObservation === undefined ? {} : { partialObservation: cause.partialObservation }
					}, cause.details);
					if (cause.cleanup !== undefined) throw ArtifactReaderFailure.withCleanup(changed, cause.cleanup, cause.partialObservation);
					throw changed;
				}
				throw cause;
			}
		};
		readObservedArtifact = (role, path, observed, maximumBytes, selectedFileSystem, resourceScope, signal) => {
			const resolveSelectedPath = role === "database" ? selectedFileSystem.realpath : undefined;
			return duringAcquisition(path, () => readStableArtifact(path, maximumBytes, signal, {
				open: (selectedPath, flags) => selectedFileSystem.open(selectedPath, flags),
				...resolveSelectedPath === undefined ? {} : { realpath: (selectedPath) => resolveSelectedPath.call(selectedFileSystem, selectedPath) },
				lstat: async (selectedPath) => {
					const current = await selectedFileSystem.lstat(selectedPath);
					if (selectedPath === path && !sameState(observed, current)) throw new ArtifactReaderFailure("integrity", `SQLite snapshot file set changed during acquisition: ${selectedPath}`, { integrityCheck: "container-identity" });
					return current;
				}
			}, resourceScope));
		};
		verifyInactiveJournal = async (path, before, selectedFileSystem, resourceScope, phase, signal) => {
			if (!before.isFile() || before.isSymbolicLink()) throw new ArtifactReaderFailure("path", `Expected a regular journal without a symlink: ${path}`);
			const file = await duringAcquisition(path, () => selectedFileSystem.open(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK));
			await withArtifactFileHandle(path, file, resourceScope, signal, async (file) => {
				if (!sameState(before, await file.stat({ bigint: true }))) throw new ArtifactReaderFailure("integrity", `SQLite journal changed before open: ${path}`, { integrityCheck: "container-identity" });
				const header = Buffer.alloc(28);
				let bytesRead = 0;
				if (before.size > 0n) {
					while (bytesRead < header.length) {
						assertArtifactReadActive(signal);
						const read = await file.read(header, bytesRead, header.length - bytesRead, bytesRead);
						if (read.bytesRead === 0) break;
						bytesRead += read.bytesRead;
					}
				}
				if (!sameState(before, await file.stat({ bigint: true }))) throw new ArtifactReaderFailure("integrity", `SQLite journal changed during inspection: ${path}`, { integrityCheck: "container-identity" });
				if (before.size !== 0n && (bytesRead !== header.length || header.some((byte) => byte !== 0))) throw new ArtifactReaderFailure(phase === "initial" ? "format" : "integrity", phase === "initial" ? `Rollback journal may require recovery: ${path}. Supply a clean offline snapshot; only empty journals or a fully zeroed header are supported.` : `Rollback journal became active or malformed during database acquisition: ${path}`, { integrityCheck: phase === "initial" ? undefined : "container-identity" });
			});
		};
		missingDatabase = (path) => new AnalysisInputError("inspect_sqlite_database", undefined, [{
			path: ["path"],
			reason: "invalid_value",
			message: `Selected SQLite database does not exist: ${path}`
		}]);
		captureSqliteDatabaseSnapshot = async (path, root, resourceScope, signal, selectedFileSystem = fileSystem) => {
			const walPath = `${path}-wal`;
			const completedMembers = [];
			const recordMember = (role, snapshot) => {
				completedMembers.push({
					role,
					path: role === "database" ? path : walPath,
					sha256: snapshot.sha256,
					bytes: snapshot.bytes.length
				});
				return snapshot;
			};
			const readMember = async (role, observed, maximumBytes) => {
				try {
					return recordMember(role, await readObservedArtifact(role, role === "database" ? path : walPath, observed, maximumBytes, selectedFileSystem, resourceScope, signal));
				} catch (cause) {
					const completed = completedStableArtifact(cause);
					if (completed !== undefined) recordMember(role, completed);
					throw cause;
				}
			};
			try {
				assertArtifactReadActive(signal);
				const journalPath = `${path}-journal`;
				const paths = [
					path,
					walPath,
					journalPath
				];
				const database = await optionalStat(path, selectedFileSystem);
				if (database === null) throw missingDatabase(path);
				const wal = await optionalSidecarStat(walPath, path, database, "WAL", selectedFileSystem);
				const journal = await optionalSidecarStat(journalPath, path, database, "rollback journal", selectedFileSystem);
				const before = [
					database,
					wal,
					journal
				];
				const selectedSize = database.size + (wal?.size ?? 0n);
				if (selectedSize > BigInt(SQLITE_DATABASE_LIMITS.inputBytes)) throw new AnalysisResourceConstraintError("inspect_sqlite_database", "file-size", `Selected SQLite database and WAL total ${selectedSize.toString()} bytes, exceeding the combined ${String(SQLITE_DATABASE_LIMITS.inputBytes)}-byte offline snapshot budget: ${path}`, {
					sqlite_snapshot_input_bytes: SQLITE_DATABASE_LIMITS.inputBytes,
					observed_sqlite_snapshot_input_bytes: selectedSize.toString()
				}, { remediationAction: `Use the application's supported export workflow to create a consistent, smaller offline SQLite snapshot containing only the relevant data, then inspect that snapshot. REA will not truncate or modify the selected source. The combined input allowance is ${String(SQLITE_DATABASE_LIMITS.inputBytes)} bytes. This release has no runtime override. worker_timeout_ms does not raise it.` });
				if (journal !== null) await verifyInactiveJournal(`${path}-journal`, journal, selectedFileSystem, resourceScope, "initial", signal);
				const snapshotPath = join(root, "database.snapshot");
				const captured = await readMember("database", database, SQLITE_DATABASE_LIMITS.inputBytes);
				await writeFile(snapshotPath, captured.bytes, {
					flag: "wx",
					mode: 384,
					...signal === undefined ? {} : { signal }
				});
				const artifact = {
					path,
					sha256: captured.sha256,
					bytes: captured.bytes.length
				};
				let walArtifact = null;
				if (wal !== null) {
					const capturedWal = await readMember("wal", wal, SQLITE_DATABASE_LIMITS.inputBytes - artifact.bytes);
					await writeFile(`${snapshotPath}-wal`, capturedWal.bytes, {
						flag: "wx",
						mode: 384,
						...signal === undefined ? {} : { signal }
					});
					walArtifact = {
						path: `${path}-wal`,
						sha256: capturedWal.sha256,
						bytes: capturedWal.bytes.length
					};
				}
				if (journal !== null) await verifyInactiveJournal(`${path}-journal`, journal, selectedFileSystem, resourceScope, "after-copy", signal);
				const after = await Promise.all(paths.map((path) => duringAcquisition(path, () => optionalStat(path, selectedFileSystem))));
				for (const [index, expected] of before.entries()) if (!sameState(expected, after[index] ?? null)) throw new ArtifactReaderFailure("integrity", `SQLite snapshot file set changed during acquisition: ${paths[index] ?? path}`, { integrityCheck: "container-identity" });
				assertArtifactReadActive(signal);
				return {
					snapshotPath,
					artifact,
					wal: walArtifact
				};
			} catch (cause) {
				if (completedMembers.length === 0) throw cause;
				throw new SqliteSnapshotAcquisitionFailure(cause, completedMembers);
			}
		};
	})))();
}

//#endregion
//#region dist/sqlite/SqliteDatabaseFailures.js
var createSqliteCleanupError, busyMember, OPERATION, sqliteDatabaseDialect, sqliteWorkerTimeout, SQLITE_DIAGNOSTIC_CAPTURE, sqliteWorkerCommand, sqliteWorkerCleanup;
function init_SqliteDatabaseFailures() {
	return (init_SqliteDatabaseFailures = __esmMin((() => {
		init_analysisResourceLimits();
		init_capturedProviderOutput();
		init_resources();
		init_analysisErrorProjection();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_SignalAbort();
		init_fixedAllowanceRemediation();
		init_providerAdapterError();
		init_providerCleanupError();
		init_OwnedCommand();
		init_sqliteDatabase();
		init_SqliteProviderIdentity();
		init_SqliteDatabaseLimits();
		init_SqliteDatabaseSnapshot();
		init_classifyProviderFailure();
		init_errorMessage();
		createSqliteCleanupError = (resources, diagnostics, options) => {
			const capturedOutput = options.capturedOutput ?? options.cleanupPrimary?.capturedOutput;
			const previous = options.cleanupPrimary === undefined ? null : capturedOutput === undefined ? projectAnalysisError(options.cleanupPrimary) : projectAnalysisErrorWithoutCapturedOutput(options.cleanupPrimary);
			return new ProviderCleanupError(SQLITE_PROVIDER_IDENTITY.id, resources, {
				...diagnostics,
				previous_error: previous ?? diagnostics.previous_error ?? null
			}, {
				...options,
				operation: "inspect_sqlite_database",
				...capturedOutput === undefined ? {} : { capturedOutput }
			});
		};
		busyMember = (cause, path) => {
			const failed = "path" in cause ? cause.path : undefined;
			return typeof failed === "string" && [
				path,
				`${path}-wal`,
				`${path}-journal`
			].includes(failed) ? failed : path;
		};
		OPERATION = "inspect_sqlite_database";
		sqliteDatabaseDialect = (path, phase, signal, workerTimeoutMs = DEFAULT_SQLITE_WORKER_TIMEOUT_MS) => {
			const dialect = {
				providerId: SQLITE_PROVIDER_IDENTITY.id,
				operation: OPERATION,
				recognise: (cause) => {
					if (cause instanceof SqliteSnapshotAcquisitionFailure) return classifyProviderFailure(cause.operationCause, dialect).retainPrimaryDiagnostics({ snapshot_acquisition: {
						consistency: "unverified",
						members: cause.completedMembers.map((member) => ({ ...member }))
					} });
					if (cause instanceof ArtifactReaderFailure) {
						if (cause.reason === "io" && cause.cause !== undefined) return classifyProviderFailure(cause.cause, dialect);
						if (cause.reason === "integrity") return readerIntegrityFailure(OPERATION, path, cause);
						return cause.reason === "cancelled" ? undefined : stableArtifactInputFailure(cause, OPERATION);
					}
					if (isAbortOf(cause, signal)) return cancelledBy(OPERATION, signal);
					if (phase === "artifact-read" && cause instanceof Error && "code" in cause && cause.code === "EBUSY") return new AnalysisCapabilityUnavailableError(SQLITE_PROVIDER_IDENTITY.id, OPERATION, `Selected database file set is in use by another process (EBUSY): ${busyMember(cause, path)}`, {
						cause,
						retryable: true,
						userMessage: "The selected SQLite database is held open by another process without read sharing. Close that application or inspect a copy, then retry."
					});
					return undefined;
				},
				command: (outcome) => sqliteWorkerCommand(outcome, path, workerTimeoutMs, {
					phase,
					path
				}),
				commandCleanup: sqliteWorkerCleanup,
				...phase === "artifact-read" ? { file: {
					path,
					description: "database file set"
				} } : {},
				readCleanup: (read, primary) => {
					const previous = primary ?? (read instanceof ArtifactFileCleanupFailure || read.cause === undefined ? undefined : classifyProviderFailure(read.cause, dialect));
					const error = createSqliteCleanupError(read.cleanup.resources, { reason: read.cleanup.reason }, {
						cause: read,
						...previous === undefined ? {} : { cleanupPrimary: previous }
					});
					bindArtifactFileCleanup(read, error);
					return error;
				},
				unclassified: (cause) => new ProviderAdapterError(SQLITE_PROVIDER_IDENTITY.id, OPERATION, {
					cause,
					diagnostics: {
						phase,
						path,
						reason: errorMessage(cause)
					}
				})
			};
			return dialect;
		};
		sqliteWorkerTimeout = (workerTimeoutMs) => ({
			ms: workerTimeoutMs,
			userMessage: `The SQLite worker reached its ${String(workerTimeoutMs)} ms server/provider deadline (worker_timeout_ms). This is not a whole-inspection or MCP client deadline.`,
			limit: deadlineParameterLimit("worker_timeout_ms", workerTimeoutMs, DEFAULT_SQLITE_WORKER_TIMEOUT_MS),
			remediationAction: `${workerTimeoutMs < 2147483647 ? `Increase worker_timeout_ms above ${String(workerTimeoutMs)} (integer milliseconds, maximum ${String(MAX_NODE_TIMER_DELAY_MS)}).` : `worker_timeout_ms is already at the maximum supported ${String(MAX_NODE_TIMER_DELAY_MS)} ms; no higher worker deadline is supported. Report the blocker or narrow the question with caller approval.`} This per-call setting needs no server restart. It covers worker startup, queries and reply writing, not snapshot acquisition or final reply reads/cleanup. Allow client headroom for the whole call; increasing only the client deadline does not change the worker budget. Keep the selected database/WAL and requested facts; narrow table/columns/schema_scope/row_limit only if the question permits it. Byte and heap safety limits remain fixed. Resolve incomplete cleanup before retrying; do not repeat the unchanged failed call.`
		});
		SQLITE_DIAGNOSTIC_CAPTURE = fixedAllowanceOptions(`The SQLite worker diagnostic capture allowance of ${String(SQLITE_DATABASE_LIMITS.diagnosticBytes)} bytes (this release has no runtime override; worker_timeout_ms does not raise it)`, "capture", {
			limit: SQLITE_DATABASE_LIMITS.diagnosticBytes,
			unit: "bytes"
		});
		sqliteWorkerCommand = (outcome, selectedPath, workerTimeoutMs, phaseDiagnostics) => ({
			providerId: SQLITE_PROVIDER_IDENTITY.id,
			operation: OPERATION,
			capturedOutput: capturedProviderOutput,
			details: outcome.kind === "runtime-exhausted" ? { diagnostics: { selected_path: selectedPath } } : {},
			timeout: sqliteWorkerTimeout(workerTimeoutMs),
			outputLimit: {
				reason: `SQLite worker diagnostics exceeded the ${String(SQLITE_DATABASE_LIMITS.diagnosticBytes)}-byte capture allowance.`,
				limits: { diagnostic_capture_bytes: SQLITE_DATABASE_LIMITS.diagnosticBytes },
				recovery: SQLITE_DIAGNOSTIC_CAPTURE
			},
			runtimeExhaustion: () => ({
				limits: { javascript_heap_bytes: SQLITE_WORKER_HEAP_BYTES },
				recovery: {
					retryable: false,
					remediationAction: `The SQLite worker's ${String(SQLITE_DATABASE_LIMITS.workerHeapMiB)} MiB JavaScript heap is fixed in this release; worker_timeout_ms does not raise it. Narrow table, columns, schema_scope or row_limit only if the question permits it; repeating the unchanged request is expected to fail the same way.`
				}
			}),
			dialect: (exit, _details, unclassified) => unclassified({
				capturedOutput: undefined,
				diagnostics: {
					...phaseDiagnostics,
					...exit.output === undefined ? {} : { captured_output: { ...capturedProviderOutput(exit.output.snapshot) } }
				}
			})
		});
		sqliteWorkerCleanup = (command, primary, outcome) => {
			const timeout = outcome.kind === "timeout" ? primary : undefined;
			return createSqliteCleanupError(command.resources, {
				reason: command.cleanupFailure,
				...timeout === undefined ? { previous_error: {
					failure_kind: command.reason,
					message: command.message
				} } : {}
			}, {
				cause: command,
				...command.snapshot === null ? {} : { capturedOutput: capturedProviderOutput(command.snapshot) },
				...timeout === undefined ? {} : { cleanupPrimary: timeout }
			});
		};
	})))();
}

//#endregion
//#region dist/sqlite/SqliteDatabaseWorkerExecution.js
var operation$1, _artifactSchema, _walSchema, _workerTimeoutSchema, inspectionShape, inspectionSchema, replySchema, rejectedArgument, rejectedReply, executeSqliteDatabaseWorker, sqliteReplyReadDialect, sqliteReplyCompletionFailure, sqliteReplyFinalizationFailure;
function init_SqliteDatabaseWorkerExecution() {
	return (init_SqliteDatabaseWorkerExecution = __esmMin((() => {
		init_capturedProviderOutput();
		init_safeJson();
		init_resources();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_analysisErrorCore();
		init_sqliteDatabase();
		init_classifyProviderFailure();
		init_OwnedCommand();
		init_SqliteDatabaseLimits();
		init_errorMessage();
		operation$1 = "inspect_sqlite_database";
		({artifact: _artifactSchema, wal: _walSchema, worker_timeout_ms: _workerTimeoutSchema, ...inspectionShape} = sqliteDatabaseSchema.shape);
		inspectionSchema = z.strictObject(inspectionShape);
		replySchema = z.union([
			z.strictObject({
				ok: z.literal(true),
				inspection: inspectionSchema
			}),
			z.strictObject({
				ok: z.literal(false),
				reason: z.enum(SQLITE_INSPECTION_REASONS).exclude(SQLITE_STRUCTURED_INSPECTION_REASONS),
				message: z.string()
			}),
			z.strictObject({
				ok: z.literal(false),
				reason: z.literal("column-evaluation"),
				message: z.string(),
				readable_columns: z.array(z.string())
			}),
			z.strictObject({
				ok: z.literal(false),
				reason: z.literal("column-limit"),
				message: z.string(),
				selected_columns: z.int().positive(),
				engine_column_limit: z.int().positive()
			})
		]);
		rejectedArgument = {
			format: "path",
			unsupported: "path",
			selection: "table",
			"column-selection": "columns",
			"row-offset": "row_offset"
		};
		rejectedReply = (reply, selectedPath, capturedOutput) => {
			if (reply.reason === "unavailable") return new AnalysisCapabilityUnavailableError("sqlite", operation$1, reply.message, {
				capturedOutput,
				userMessage: reply.message
			});
			if (reply.reason === "column-evaluation") {
				const readable = reply.readable_columns;
				return new AnalysisCapabilityUnavailableError("sqlite", operation$1, reply.message, {
					capturedOutput,
					userMessage: reply.message,
					related: { parameters: [
						"columns",
						"table",
						"schema_scope"
					] },
					remediationAction: `The database is readable; only the listed column values failed. REA's SQLite connection loads no extensions or application functions and disables schema trust. ${readable.length === 0 ? "No other readable column was found" : `Select columns whose values were read: columns: ${JSON.stringify(readable)}`}; omit table and use schema_scope: database to read the stored declarations without evaluating rows. Obtaining the failed values needs a SQLite connection able to evaluate them. Do not repeat the unchanged request.`
				});
			}
			if (reply.reason === "row-evaluation") return new AnalysisCapabilityUnavailableError("sqlite", operation$1, reply.message, {
				capturedOutput,
				userMessage: reply.message,
				diagnostics: { selected_path: selectedPath },
				remediationAction: "SQLite read the selected schema but could not prepare or evaluate the requested rows. REA's private connection loads no extensions, application functions or application collations. The SQLite reason may identify a missing dependency; an unidentified query failure does not establish database corruption. Omit table and use schema_scope: database to inspect stored declarations. Obtaining the requested values may require the application's supported consistent export. Do not repeat the unchanged row request."
			});
			if (reply.reason === "memory") return new AnalysisResourceConstraintError(operation$1, "memory", reply.message, { javascript_heap_bytes: SQLITE_WORKER_HEAP_BYTES }, {
				capturedOutput,
				diagnostics: { selected_path: selectedPath }
			});
			if (reply.reason === "output-limit") return new AnalysisResourceConstraintError(operation$1, "transport", reply.message, {
				sqlite_value_or_record_bytes: SQLITE_DATABASE_LIMITS.outputBytes,
				sqlite_sql_statement_bytes: SQLITE_DATABASE_LIMITS.outputBytes,
				worker_reply_bytes: SQLITE_DATABASE_LIMITS.outputBytes
			}, {
				capturedOutput,
				diagnostics: { selected_path: selectedPath },
				retryable: false,
				remediationAction: "The SQLite value/record, SQL statement and worker JSON reply allowances are each fixed at 16 MiB; this refusal does not identify which was exceeded. worker_timeout_ms and client deadlines do not raise them. If it preserves the requested facts, select exact columns, reduce row_limit, or use schema_scope: inventory instead of database. This worker refusal leaves no completed Evidence to retrieve. Do not repeat the unchanged request or truncate required database bytes."
			});
			if (reply.reason === "column-limit") return new AnalysisResourceConstraintError(operation$1, "capacity", reply.message, {
				selected_result_columns: reply.selected_columns,
				engine_result_column_limit: reply.engine_column_limit
			}, {
				capturedOutput,
				diagnostics: { selected_path: selectedPath },
				retryable: false,
				remediationAction: `The selected database is readable; only the combined projection exceeded this connection's native result-column limit. Request at most ${String(reply.engine_column_limit)} columns per call, splitting wider facts across calls, or omit table to inspect stored declarations with schema_scope: database. The limit belongs to SQLite's connection, so worker_timeout_ms and client deadlines do not raise it. Do not repeat the unchanged request.`
			});
			const argument = rejectedArgument[reply.reason];
			return new AnalysisInputError(operation$1, { capturedOutput }, [{
				path: [argument],
				reason: "invalid_format",
				message: argument === "path" ? `Selected SQLite database is invalid (${reply.message}): ${selectedPath}` : reply.message
			}]);
		};
		executeSqliteDatabaseWorker = async (request) => {
			const requestPath = join(request.root, "request.json");
			const replyPath = join(request.root, "reply.json");
			await writeFile(requestPath, JSON.stringify({
				snapshot_path: request.snapshotPath,
				reply_path: replyPath,
				input: request.input
			}), {
				flag: "wx",
				mode: 384
			});
			const { NODE_OPTIONS: _ambientNodeOptions, ...environment } = request.environment;
			const execution = await runOwnedCommand({
				command: process.execPath,
				arguments: [
					`--max-old-space-size=${String(SQLITE_DATABASE_LIMITS.workerHeapMiB)}`,
					fileURLToPath(new URL("./SqliteDatabaseWorker.js", new URL("../sqlite/SqliteDatabaseWorkerExecution.js", import.meta.url).href)),
					requestPath
				],
				cwd: request.root,
				expectedCommand: null,
				runId: `rea-sqlite-database-${randomUUID()}`,
				hostEnvironment: environment
			}, {
				timeoutMs: request.timeoutMs,
				diagnosticBytes: SQLITE_DATABASE_LIMITS.diagnosticBytes,
				runtime: "v8"
			}, {
				...request.signal === undefined ? {} : { signal: request.signal },
				...request.launcher === undefined ? {} : { launcher: request.launcher },
				...request.retainCleanup === undefined ? {} : { retainCleanup: request.retainCleanup }
			});
			const capturedOutput = capturedProviderOutput(execution);
			request.captured(capturedOutput);
			let reply;
			let finalization;
			try {
				let file;
				try {
					file = await readStableArtifact(replyPath, SQLITE_DATABASE_LIMITS.outputBytes, request.signal, undefined, request.resourceScope);
				} catch (cause) {
					const completed = completedStableArtifact(cause);
					if (!(cause instanceof ArtifactReaderFailure) || completed === undefined) throw cause;
					finalization = sqliteReplyCompletionFailure(cause, capturedOutput);
					file = completed;
				}
				const decoded = safeParseUtf8Json(file.bytes);
				if (!decoded.ok) throw decoded.cause;
				reply = replySchema.parse(decoded.value);
			} catch (cause) {
				throw sqliteReplyFinalizationFailure(classifyProviderFailure(cause, sqliteReplyReadDialect(capturedOutput)), finalization);
			}
			if (!reply.ok) throw sqliteReplyFinalizationFailure(rejectedReply(reply, request.input.path, capturedOutput), finalization);
			return {
				inspection: reply.inspection,
				finalization
			};
		};
		sqliteReplyReadDialect = (capturedOutput) => ({
			providerId: "sqlite",
			operation: operation$1,
			observedOutput: capturedOutput,
			unclassified: (cause, details) => new AnalysisOutputError(operation$1, `Owned SQLite worker reply is missing or malformed: ${errorMessage(cause)}`, {
				...details,
				cause,
				capturedOutput
			})
		});
		sqliteReplyCompletionFailure = (cause, capturedOutput) => {
			if (cause.cleanup === undefined) return classifyProviderFailure(cause, sqliteReplyReadDialect(capturedOutput));
			const cleanup = new ProviderCleanupError("sqlite", cause.cleanup.resources, {
				phase: "reply_descriptor_close",
				reason: cause.cleanup.reason
			}, {
				operation: operation$1,
				cause,
				capturedOutput
			});
			bindArtifactFileCleanup(cause, cleanup);
			if (cause.reason !== "cancelled") return cleanup;
			const cancellation = cancelledBy(operation$1, carriedReason(artifactFileCancellationCause(cause)), { capturedOutput });
			return analysisErrorWithCleanupDependencies(cancellation, cleanup, operation$1);
		};
		sqliteReplyFinalizationFailure = (primary, finalization) => finalization === undefined ? primary : finalization.cleanupIncomplete ? analysisErrorWithCleanupDependencies(primary, finalization, operation$1) : primary.retainSecondaryFailure(finalization);
	})))();
}

//#endregion
//#region dist/sqlite/SqliteDatabaseProvider.js
var operation, sqliteCleanupFailures, sqliteRootFailure, SqliteDatabaseProvider, createSqliteObservation, cleanupSqliteRoot, sqliteCleanupFailure, completedSqliteEvidence, validateSqliteInput;
function init_SqliteDatabaseProvider() {
	return (init_SqliteDatabaseProvider = __esmMin((() => {
		init_analysisErrorCleanup();
		init_AnalysisProvider();
		init_classifyProviderFailure();
		init_resources();
		init_analysisCleanupRelease();
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_analysisObservation();
		init_providerCleanupError();
		init_result();
		init_sqliteDatabase();
		init_SqliteProviderIdentity();
		init_inputIssueProjection();
		init_PrivateRuntimeRoot();
		init_OwnedCommand();
		init_SqliteDatabaseFailures();
		init_SqliteDatabaseSnapshot();
		init_SqliteDatabaseLimits();
		init_SqliteDatabaseWorkerExecution();
		init_errorMessage();
		operation = "inspect_sqlite_database";
		sqliteCleanupFailures = (failures) => providerCleanupErrorFromFailures(SQLITE_PROVIDER_IDENTITY.id, failures, { failures: failures.map((failure) => projectAnalysisError(failure)) }, {
			operation,
			message: "SQLite cleanup failures"
		});
		sqliteRootFailure = (root) => new ProviderCleanupError(SQLITE_PROVIDER_IDENTITY.id, [root.path], { reason: "SQLite runtime root cleanup remains unresolved." }, { operation });
		SqliteDatabaseProvider = class {
			environment;
			launcher;
			createRuntime;
			#active = new Set();
			#artifactResources = new ArtifactResourceScope();
			#pendingCleanup = new Map();
			#closed = false;
			#closePromise;
			#retryPromise;
			constructor(environment = process.env, launcher, createRuntime = () => PrivateRuntimeRoot.create({ prefix: "rea-sqlite-database-" })) {
				this.environment = environment;
				this.launcher = launcher;
				this.createRuntime = createRuntime;
			}
			/** Return exact original DB/WAL identities and current schema/selected committed rows. */
			async inspect(input, options) {
				if (options?.signal?.aborted) return err(cancelledBy(operation, options.signal));
				if (this.#closed) return err(cancelledBy(operation, OwnerCancellation.ownerClosed));
				if (this.#active.size >= SQLITE_DATABASE_LIMITS.concurrentInspections) return err(new AnalysisResourceConstraintError(operation, "capacity", "SQLite inspection capacity is occupied. Retry after an active inspection completes.", {
					active_inspections: this.#active.size,
					max_concurrent_inspections: SQLITE_DATABASE_LIMITS.concurrentInspections,
					input_bytes_per_inspection: SQLITE_DATABASE_LIMITS.inputBytes
				}, { remediationAction: `The concurrent SQLite inspection allowance is ${String(SQLITE_DATABASE_LIMITS.concurrentInspections)}. This release has no runtime override. Waiting for an active inspection to finish can free a slot. worker_timeout_ms does not raise it. Retry after an active SQLite inspection completes.` }));
				const inspection = this.#artifactResources.run(() => this.#inspect(input, options)).catch((cause) => err(classifyProviderFailure(cause, sqliteDatabaseDialect(input.path, "artifact-read", options?.signal))));
				this.#active.add(inspection);
				try {
					return await inspection;
				} finally {
					this.#active.delete(inspection);
				}
			}
			/** Await inspections and retry retained descriptors, workers, and snapshot roots. */
			close() {
				this.#closed = true;
				this.#closePromise ??= Promise.allSettled(this.#active).then(async () => {
					let descriptorFailure;
					try {
						await this.#artifactResources.close();
					} catch (cause) {
						const cleanup = ArtifactReaderFailure.cleanupObservation(cause, "SQLite artifact descriptors");
						descriptorFailure = new ProviderCleanupError(SQLITE_PROVIDER_IDENTITY.id, cleanup.resources, { reason: cleanup.reason }, {
							operation,
							cause
						});
						bindArtifactFileCleanup(cause, descriptorFailure);
					}
					const cleaned = await this.#retryCleanup();
					if (descriptorFailure !== undefined && !cleaned.ok) {
						throw sqliteCleanupFailures([descriptorFailure, cleaned.error]);
					}
					if (descriptorFailure !== undefined) throw descriptorFailure;
					if (!cleaned.ok) throw cleaned.error;
				}).catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			#retryCleanup() {
				this.#retryPromise ??= this.#cleanupPending().finally(() => {
					this.#retryPromise = undefined;
				});
				return this.#retryPromise;
			}
			async #cleanupPending() {
				const failures = [];
				for (const [root, pending] of [...this.#pendingCleanup]) {
					if (pending.process !== undefined) {
						const stopped = await pending.process.stop();
						if (stopped.status === "incomplete" || stopped.status === "not-owned") {
							const reason = stopped.status === "incomplete" ? stopped.reason : "SQLite worker ownership remains unresolved.";
							const failure = sqliteCleanupFailure([pending.process.launch.ownership?.runId ?? "owned-sqlite-worker", root.path], reason, pending.result, pending.input, pending.output);
							failure.bindCleanupDependencies([pending.processFailure, pending.rootFailure].filter((dependency) => dependency !== undefined));
							failures.push(failure);
							continue;
						}
						pending.process = undefined;
						pending.processRelease.confirm();
					}
					const cleaned = await cleanupSqliteRoot(root, pending.result, pending.input, pending.output);
					if (cleaned.ok) {
						pending.rootRelease.confirm();
						this.#pendingCleanup.delete(root);
					} else {
						cleaned.error.bindCleanupDependencies([pending.rootFailure]);
						failures.push(cleaned.error);
					}
				}
				if (failures.length === 1 && failures[0] !== undefined) return err(failures[0]);
				return failures.length === 0 ? ok(null) : err(sqliteCleanupFailures(failures));
			}
			async #inspect(input, options) {
				let root;
				let processOwner;
				let processCleanup;
				let retainedOutput;
				let phase = "configuration";
				let result;
				const workerTimeoutMs = input.worker_timeout_ms ?? 3e4;
				try {
					if (options?.signal?.aborted) throw cancelledBy(operation, options.signal);
					validateSqliteInput(input);
					const retired = await this.#retryCleanup();
					if (!retired.ok) return retired;
					if (options?.signal?.aborted) throw cancelledBy(operation, options.signal);
					if (this.#closed) throw cancelledBy(operation, OwnerCancellation.ownerClosed);
					root = await this.createRuntime();
					phase = "artifact-read";
					const snapshot = await captureSqliteDatabaseSnapshot(input.path, root.path, this.#artifactResources, options?.signal);
					phase = "worker";
					const completed = await executeSqliteDatabaseWorker({
						input,
						root: root.path,
						snapshotPath: snapshot.snapshotPath,
						timeoutMs: workerTimeoutMs,
						environment: this.environment,
						resourceScope: this.#artifactResources,
						...this.launcher === undefined ? {} : { launcher: this.launcher },
						...options?.signal === undefined ? {} : { signal: options.signal },
						captured: (output) => {
							retainedOutput = output;
						},
						retainCleanup: (owner, result) => {
							processOwner = owner;
							processCleanup = result;
						}
					});
					const validated = sqliteDatabaseSchema.safeParse({
						artifact: snapshot.artifact,
						wal: snapshot.wal,
						...completed.inspection,
						worker_timeout_ms: workerTimeoutMs
					});
					if (!validated.success) throw sqliteReplyFinalizationFailure(new AnalysisOutputError(operation, "SQLite worker report dimensions or identity fields are invalid", retainedOutput === undefined ? undefined : { capturedOutput: retainedOutput }), completed.finalization);
					const execution = createSqliteObservation(validated.data, input.path);
					result = completed.finalization === undefined ? ok(execution) : err(completed.finalization.retainPartialObservation(completedSqliteEvidence(input, execution)));
				} catch (cause) {
					if (cause instanceof OwnedCommandFailure && cause.cleanupOwner !== undefined) processOwner = cause.cleanupOwner;
					const failure = classifyProviderFailure(cause, sqliteDatabaseDialect(input.path, phase, options?.signal, workerTimeoutMs));
					retainedOutput ??= failure.capturedOutput;
					result = err(failure);
				}
				if (root !== undefined) {
					if (processOwner !== undefined) {
						const ownership = processOwner.launch.ownership;
						const rootRelease = new AnalysisCleanupRelease();
						const rootFailure = rootRelease.bind(sqliteRootFailure(root));
						const processReason = processCleanup?.reason ?? "SQLite worker cleanup remains unresolved.";
						const processRelease = new AnalysisCleanupRelease();
						const processFailure = processRelease.bind(new ProviderCleanupError(SQLITE_PROVIDER_IDENTITY.id, ownership === undefined ? ["owned-sqlite-worker"] : ownedCommandResources(ownership), { reason: processReason }, { operation }));
						this.#pendingCleanup.set(root, {
							input,
							result,
							output: retainedOutput,
							rootFailure,
							rootRelease,
							processFailure,
							processRelease,
							process: processOwner
						});
						if (processCleanup !== undefined) {
							const failure = sqliteCleanupFailure(ownership === undefined ? ["owned-sqlite-worker", root.path] : ownedCommandResources(ownership, root.path), processCleanup.reason, result, input, retainedOutput, processCleanup.cleanupResult === undefined ? undefined : {
								...processCleanup.cleanupResult.failures === undefined ? {} : { failures: processCleanup.cleanupResult.failures.map((failure) => ({ ...failure })) },
								...processCleanup.cleanupResult.unverified === undefined ? {} : { unverified: processCleanup.cleanupResult.unverified.map((process) => ({ ...process })) }
							});
							failure.bindCleanupDependencies([processFailure, rootFailure]);
							return err(failure);
						}
						if (!result.ok) {
							result.error.bindCleanupDependencies([processFailure, rootFailure]);
							return result;
						}
						const failure = sqliteCleanupFailure([...ownership === undefined ? ["owned-sqlite-worker"] : ownedCommandResources(ownership), root.path], processReason, result, input, retainedOutput);
						failure.bindCleanupDependencies([processFailure, rootFailure]);
						return err(failure);
					}
					const cleaned = await cleanupSqliteRoot(root, result, input, retainedOutput);
					if (!cleaned.ok) {
						const rootRelease = new AnalysisCleanupRelease();
						const rootFailure = rootRelease.bind(sqliteRootFailure(root));
						cleaned.error.bindCleanupDependencies([rootFailure]);
						this.#pendingCleanup.set(root, {
							input,
							result,
							output: retainedOutput,
							rootFailure,
							rootRelease,
							processFailure: undefined,
							processRelease: new AnalysisCleanupRelease(),
							process: undefined
						});
						return cleaned;
					}
				}
				if (result.ok && options?.signal?.aborted) return err(cancelledBy(operation, options.signal, { partialObservation: completedSqliteEvidence(input, result.value) }));
				return result;
			}
		};
		createSqliteObservation = (report, path) => {
			const locations = [{
				kind: "artifact-path",
				path
			}];
			if (report.wal !== null) locations.push({
				kind: "artifact-path",
				path: report.wal.path
			});
			return createAnalysisExecution(report, {
				...SQLITE_PROVIDER_IDENTITY,
				version: `SQLite ${report.engine.version}`
			}, {
				rawResult: null,
				subject: {
					path,
					format: "file",
					sha256: report.artifact.sha256
				},
				locations,
				limitations: report.limitations
			});
		};
		cleanupSqliteRoot = async (root, result, input, output) => {
			try {
				await root.close();
				return ok(null);
			} catch (cause) {
				return err(sqliteCleanupFailure([root.path], errorMessage(cause), result, input, output, undefined, cause));
			}
		};
		sqliteCleanupFailure = (resources, reason, result, input, output, details, cause) => {
			const partialObservation = result.ok ? completedSqliteEvidence(input, result.value) : result.error.partialObservation;
			return createSqliteCleanupError(resources, {
				...details,
				reason
			}, {
				...output === undefined ? {} : { capturedOutput: output },
				...result.ok ? {} : { cleanupPrimary: result.error },
				...cause === undefined ? {} : { cause },
				...partialObservation === undefined ? {} : { partialObservation }
			});
		};
		completedSqliteEvidence = (input, execution) => createAnalysisExecutionEvidence(operation, sqliteInspectionParameters(input), execution, "observed");
		validateSqliteInput = (input) => {
			const parsed = inspectSqliteDatabaseInputSchema.safeParse(input);
			if (!parsed.success) throw analysisInputErrorFromIssues(operation, parsed.error.issues, input, { cause: parsed.error });
		};
	})))();
}

//#endregion
//#region dist/composition/sqlite.js
var sqlite_exports = /* @__PURE__ */ __exportAll({ createSqliteDatabaseService: () => createSqliteDatabaseService });
var createSqliteDatabaseService;
function init_sqlite() {
	return (init_sqlite = __esmMin((() => {
		init_SqliteDatabaseService();
		init_SqliteDatabaseProvider();
		createSqliteDatabaseService = (environment = process.env) => new SqliteDatabaseService(new SqliteDatabaseProvider(environment));
	})))();
}

//#endregion
export { createSqliteDatabaseService, init_sqlite, sqlite_exports };