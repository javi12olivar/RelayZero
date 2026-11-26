import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, errorMessage, init_configurationErrors, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { AnalysisCleanupLease, ArtifactReaderFailure, ArtifactResourceRetryFailure, OwnedFileHandle, OwnedStagedOutput, RegularFileChangedError, RegularFileCleanupFailure, init_AnalysisCleanupLease, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedFileHandle, init_OwnedRegularFile, init_OwnedStagedOutput, init_RegularFile, init_resources, sameRegularFileState } from "./resources-B3P64jvH.js";
import { init_RegularFileRead, readRegularFileTextSnapshot, retryRegularFileCleanupFailures } from "./RegularFileRead-CRu2Ia6l.js";
import { fileHandleMatchesBytes, init_SetupRecoveryBackup, init_fileHandleMatchesBytes, preserveCurrentRecoveryBackup } from "./fileHandleMatchesBytes-D-nLHXBv.js";
import { chmodSync, constants, lstatSync } from "node:fs";
import { basename, dirname, join, resolve, sep } from "node:path";
import { link, lstat, mkdtemp, open, readFile, realpath, rename, writeFile } from "node:fs/promises";

//#region dist/application/ClientRegistrationBackup.js
var isMissing$1, restrictExistingBackup, copyPrivateBackup, preservePrivateRecoveryBackup, writeClientRegistrationBackup;
function init_ClientRegistrationBackup() {
	return (init_ClientRegistrationBackup = __esmMin((() => {
		init_SetupRecoveryBackup();
		init_result();
		init_errorMessage();
		isMissing$1 = (cause) => typeof cause === "object" && cause !== null && "code" in cause && cause.code === "ENOENT";
		restrictExistingBackup = (backupPath) => {
			let existing;
			try {
				existing = lstatSync(backupPath);
			} catch (cause) {
				if (isMissing$1(cause)) return ok(undefined);
				return err({
					kind: "unreadable",
					path: backupPath,
					detail: `The existing client configuration backup could not be checked: ${errorMessage(cause)}`
				});
			}
			if (!existing.isFile()) return err({
				kind: "occupied",
				path: backupPath,
				detail: "The existing client configuration backup is not a regular file."
			});
			try {
				chmodSync(backupPath, 384);
			} catch (cause) {
				return err({
					kind: "unreadable",
					path: backupPath,
					detail: `The existing client configuration backup permissions could not be secured: ${errorMessage(cause)}`
				});
			}
			return ok(undefined);
		};
		copyPrivateBackup = async (sourcePath, backupPath) => {
			await writeFile(backupPath, await readFile(sourcePath), {
				flag: "wx",
				mode: 384
			});
		};
		preservePrivateRecoveryBackup = async (firstBackupPath, source, original, resources) => {
			const firstRestricted = restrictExistingBackup(firstBackupPath);
			if (!firstRestricted.ok) return firstRestricted;
			const preserved = await preserveCurrentRecoveryBackup(firstBackupPath, source, original, {
				copy: copyPrivateBackup,
				...resources === undefined ? {} : { resources }
			});
			if (!preserved.ok) return preserved;
			const selectedRestricted = restrictExistingBackup(preserved.value);
			if (!selectedRestricted.ok) return selectedRestricted;
			return ok(preserved.value);
		};
		writeClientRegistrationBackup = (settingsPath, settingsText) => preservePrivateRecoveryBackup(`${settingsPath}.rea.backup`, settingsPath, settingsText);
	})))();
}

//#endregion
//#region dist/application/ClientConfigPath.js
var systemFileSystem, resolveClientConfigTransactionPath, resolveOwnedConfigSymlink, canonicalRegularConfigPath, isMissing, isAbsentPath;
function init_ClientConfigPath() {
	return (init_ClientConfigPath = __esmMin((() => {
		init_HostPlatform();
		init_callerPath();
		systemFileSystem = {
			lstat,
			realpath
		};
		resolveClientConfigTransactionPath = async (requestedPath, fileSystem = systemFileSystem) => {
			let requestedStats;
			try {
				requestedStats = await fileSystem.lstat(requestedPath);
			} catch (cause) {
				if (!isMissing(cause)) return undefined;
			}
			if (requestedStats?.isSymbolicLink() === true) return resolveOwnedConfigSymlink(requestedPath, requestedStats, fileSystem);
			return canonicalRegularConfigPath(requestedPath, fileSystem);
		};
		resolveOwnedConfigSymlink = async (requestedPath, requestedStats, fileSystem) => {
			const currentUid = typeof process.getuid === "function" ? process.getuid() : undefined;
			if (currentUid === undefined || requestedStats.uid !== currentUid || fileSystem.realpath === undefined) return undefined;
			try {
				const canonicalPath = await fileSystem.realpath(requestedPath);
				const targetStats = await fileSystem.lstat(canonicalPath);
				return targetStats.isFile?.() === true && targetStats.uid === currentUid ? canonicalPath : undefined;
			} catch (cause) {
				void cause;
				return undefined;
			}
		};
		canonicalRegularConfigPath = async (requestedPath, fileSystem) => {
			if (fileSystem.realpath === undefined) return requestedPath;
			let ancestor = absoluteCallerPath(requestedPath);
			const directoryRequired = HOST_PLATFORM.platform !== "win32" && ancestor.endsWith("/");
			const missing = [];
			while (true) {
				try {
					const canonical = join(await fileSystem.realpath(ancestor), ...missing);
					return directoryRequired && !canonical.endsWith("/") ? `${canonical}/` : canonical;
				} catch (cause) {
					if (!isAbsentPath(cause) || dirname(ancestor) === ancestor) return requestedPath;
					if (basename(ancestor) === "..") return undefined;
					missing.unshift(basename(ancestor));
					ancestor = dirname(ancestor);
				}
			}
		};
		isMissing = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
		isAbsentPath = (cause) => cause instanceof Error && "code" in cause && (cause.code === "ENOENT" || cause.code === "ENOTDIR");
	})))();
}

//#endregion
//#region dist/application/ClientConfigurationCleanup.js
var ClientConfigurationPublicationFailure, isClientConfigurationCleanupFailure, retryClientConfigurationCleanup;
function init_ClientConfigurationCleanup() {
	return (init_ClientConfigurationCleanup = __esmMin((() => {
		init_resources();
		init_OwnedRegularFile();
		init_RegularFileRead();
		ClientConfigurationPublicationFailure = class extends ArtifactResourceRetryFailure {
			path;
			outcome;
			cleanupCause;
			owner;
			cleanupLease;
			constructor(path, outcome, cleanupCause, owner, cleanupLease) {
				super([{
					owner,
					lease: cleanupLease
				}], "Configuration publication cleanup remains incomplete", {
					cause: new AggregateError([...outcome.kind === "failed" ? [outcome.cause] : [], cleanupCause], "Configuration operation and staging cleanup failures"),
					cleanup: ArtifactReaderFailure.cleanupObservation(cleanupCause, owner.resource)
				});
				this.path = path;
				this.outcome = outcome;
				this.cleanupCause = cleanupCause;
				this.owner = owner;
				this.cleanupLease = cleanupLease;
			}
		};
		isClientConfigurationCleanupFailure = (cause) => cause instanceof RegularFileCleanupFailure || cause instanceof ClientConfigurationPublicationFailure;
		retryClientConfigurationCleanup = async (failure, resources) => {
			const failures = [];
			const cleanupLeases = new Set();
			const observations = [];
			let current = failure;
			let primary;
			for (;;) {
				let nested;
				if (current instanceof RegularFileCleanupFailure) {
					const retried = await retryRegularFileCleanupFailures(current, resources);
					failures.push(...retried.failures);
					for (const lease of retried.cleanupLeases) cleanupLeases.add(lease);
					if (retried.cleanup !== undefined) observations.push(retried.cleanup);
					primary = retried.primary;
					const last = retried.failures.at(-1);
					nested = last.operationFailure === undefined && last.outcome.kind === "failed" ? last.outcome.cause : undefined;
				} else {
					const released = await resources.release({
						kind: "lease",
						resource: current.owner.resource,
						lease: current.cleanupLease
					});
					if (released.kind === "failed") {
						cleanupLeases.add(released.lease);
						observations.push(ArtifactReaderFailure.cleanupObservation(released.cause, current.owner.resource));
					}
					primary = current.outcome.kind === "failed" ? current.outcome.cause : current.cleanupCause;
					nested = current.outcome.kind === "failed" ? current.outcome.cause : undefined;
				}
				if (!isClientConfigurationCleanupFailure(nested)) break;
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
	})))();
}

//#endregion
//#region dist/application/ClientConfigurationPublication.js
var ClientConfigurationWriteError, ClientConfigurationPublication, preserveConfigurationAttributes, assertRequestedConfigurationPath, isParentAliasRetarget, isNodeErrorCode, selectedConfiguration, assertSelectedConfiguration, releaseStaging;
function init_ClientConfigurationPublication() {
	return (init_ClientConfigurationPublication = __esmMin((() => {
		init_HostPlatform();
		init_resources();
		init_fileHandleMatchesBytes();
		init_callerPath();
		init_OwnedFileHandle();
		init_OwnedStagedOutput();
		init_RegularFile();
		init_RegularFileRead();
		init_ClientConfigurationCleanup();
		init_ClientConfigPath();
		init_configurationErrors();
		init_errorMessage();
		ClientConfigurationWriteError = class extends Error {
			_tag = "ClientConfigurationWriteError";
			problem;
			constructor(path, operation, cause, requestedOwnership) {
				const detail = errorMessage(cause);
				super(`Configuration ${operation} failed at ${path}: ${detail}`, { cause });
				const code = cause instanceof Error ? Reflect.get(cause, "code") : undefined;
				const syscall = cause instanceof Error ? Reflect.get(cause, "syscall") : undefined;
				this.problem = {
					kind: "write",
					operation,
					path,
					detail,
					...typeof code === "string" ? { systemCode: code } : {},
					...typeof syscall === "string" ? { syscall } : {},
					...requestedOwnership === undefined ? {} : { requestedOwnership }
				};
			}
		};
		ClientConfigurationPublication = class ClientConfigurationPublication {
			path;
			contents;
			owner;
			staging;
			cleanup;
			constructor(path, contents, owner, staging, cleanup) {
				this.path = path;
				this.contents = contents;
				this.owner = owner;
				this.staging = staging;
				this.cleanup = cleanup;
			}
			static async write(path, contents, previous, selection) {
				const parent = await realpath(dirname(path));
				const destination = join(parent, basename(path)) + (path.endsWith(sep) ? sep : "");
				const input = await selectedConfiguration(destination, previous);
				if (selection !== undefined) {
					await assertRequestedConfigurationPath(path, selection.requestedPath);
					if (selection.state === undefined ? input !== undefined : input === undefined || !sameRegularFileState(selection.state, input)) throw new RegularFileChangedError(destination);
				}
				const directory = await mkdtemp(`${parent}${sep}.rea-config-`);
				const staging = await OwnedStagedOutput.create(directory);
				const cleanup = new AnalysisCleanupLease(() => staging.close(), [directory]);
				try {
					const stagedPath = `${directory}${sep}content`;
					const owner = new OwnedFileHandle(await open(stagedPath, constants.O_RDWR | constants.O_CREAT | constants.O_EXCL | (constants.O_NONBLOCK ?? 0) | (constants.O_NOFOLLOW ?? 0), 384));
					staging.setFile(owner);
					await owner.handle.writeFile(contents, { encoding: "utf8" });
					await preserveConfigurationAttributes(owner, input, destination);
					if (selection?.requiredMode !== undefined) {
						await owner.handle.chmod(selection.requiredMode);
						if (HOST_PLATFORM.platform !== "win32" && ((await owner.handle.stat()).mode & 511) !== selection.requiredMode) throw new ClientConfigurationWriteError(destination, "preserve_mode", new Error("The required private profile mode could not be verified"));
					}
					await owner.handle.sync();
					if ((await owner.handle.stat()).ino === 0) throw new RegularFileChangedError(stagedPath);
					await staging.assertReadyForPublication(stagedPath);
					if (selection !== undefined) await assertRequestedConfigurationPath(path, selection.requestedPath);
					await assertSelectedConfiguration(destination, input);
					if (input === undefined) {
						try {
							await link(stagedPath, destination);
						} catch (cause) {
							if (selection !== undefined && cause instanceof Error && "code" in cause && cause.code === "EEXIST") throw new RegularFileChangedError(destination, { cause });
							throw cause;
						}
					} else {
						await rename(stagedPath, destination);
						staging.recordPublishedRename();
					}
					return new ClientConfigurationPublication(destination, contents, owner, staging, cleanup);
				} catch (cause) {
					await releaseStaging(path, staging, cleanup, {
						kind: "failed",
						cause
					});
					throw cause;
				}
			}
			/** Keep all publication resources owned through the complete operation. */
			async verify(operation) {
				let outcome;
				try {
					outcome = {
						kind: "completed",
						value: await operation()
					};
				} catch (cause) {
					outcome = {
						kind: "failed",
						cause
					};
				}
				await releaseStaging(this.path, this.staging, this.cleanup, outcome);
				if (outcome.kind === "failed") throw outcome.cause;
				return outcome.value;
			}
			async assertCurrent(readback) {
				const owned = await this.owner.handle.stat();
				const named = await lstat(this.path);
				if (owned.ino === 0 || readback !== this.contents || named.isSymbolicLink() || !sameRegularFileState(owned, named)) throw new RegularFileChangedError(this.path);
			}
			/** State checks do not exclude a concurrent writer to the same inode. */
			async restore(original) {
				const handle = this.owner.handle;
				const before = await handle.stat();
				const named = await lstat(this.path);
				if (before.ino === 0 || !before.isFile() || named.isSymbolicLink() || !sameRegularFileState(before, named) || !await fileHandleMatchesBytes(handle, Buffer.from(this.contents, "utf8")) || !sameRegularFileState(before, await handle.stat()) || !sameRegularFileState(before, await lstat(this.path))) throw new RegularFileChangedError(this.path);
				if (original === undefined) throw new Error("First-run configuration recovery requires manual removal; pathname deletion cannot prove ownership");
				const bytes = Buffer.from(original, "utf8");
				for (let position = 0; position < bytes.length;) {
					const { bytesWritten } = await handle.write(bytes, position, bytes.length - position, position);
					if (bytesWritten === 0) throw new Error("Configuration restoration made no write progress");
					position += bytesWritten;
				}
				await handle.truncate(bytes.length);
				if (!sameRegularFileState(await handle.stat(), await lstat(this.path))) throw new RegularFileChangedError(this.path);
			}
		};
		preserveConfigurationAttributes = async (owner, input, destination) => {
			const created = await owner.handle.stat();
			if (input !== undefined && (input.uid !== created.uid || input.gid !== created.gid)) {
				try {
					await owner.handle.chown(input.uid, input.gid);
				} catch (cause) {
					throw new ClientConfigurationWriteError(destination, "preserve_ownership", cause, {
						uid: input.uid,
						gid: input.gid
					});
				}
			}
			try {
				await owner.handle.chmod((input?.mode ?? 384) & 4095);
			} catch (cause) {
				throw new ClientConfigurationWriteError(destination, "preserve_mode", cause);
			}
		};
		assertRequestedConfigurationPath = async (path, requestedPath) => {
			const current = await resolveClientConfigTransactionPath(requestedPath);
			if (current === undefined) throw new ConfigurationError(`Client configuration path could not be safely verified: ${requestedPath}`);
			if (resolve(current) === resolve(path)) return;
			if (await isParentAliasRetarget(requestedPath, path, current)) return;
			throw new RegularFileChangedError(path);
		};
		isParentAliasRetarget = async (requestedPath, path, current) => {
			if (basename(current) !== basename(path)) return false;
			let requestedStats;
			try {
				requestedStats = await lstat(requestedPath);
			} catch (cause) {
				if (isNodeErrorCode(cause, "ENOENT")) return false;
				throw new ConfigurationError(`Client configuration path could not be safely verified: ${requestedPath}`);
			}
			if (requestedStats.isSymbolicLink()) return false;
			const requestedParent = dirname(absoluteCallerPath(requestedPath));
			try {
				const canonicalParent = await realpath(requestedParent);
				return canonicalParent !== requestedParent;
			} catch (cause) {
				void cause;
				return false;
			}
		};
		isNodeErrorCode = (cause, code) => cause instanceof Error && "code" in cause && cause.code === code;
		selectedConfiguration = async (path, previous) => {
			let selected;
			try {
				selected = await readRegularFileTextSnapshot(path, { symlinks: "reject" });
			} catch (cause) {
				if (!(cause instanceof Error && "code" in cause && cause.code === "ENOENT")) throw cause;
			}
			if (selected?.text !== previous || selected?.state.ino === 0) throw new RegularFileChangedError(path);
			return selected?.state;
		};
		assertSelectedConfiguration = async (path, selected) => {
			let current;
			try {
				current = await lstat(path);
			} catch (cause) {
				if (!(cause instanceof Error && "code" in cause && cause.code === "ENOENT")) throw cause;
			}
			if (selected === undefined ? current !== undefined : current === undefined || current.isSymbolicLink() || !sameRegularFileState(selected, current)) throw new RegularFileChangedError(path);
		};
		releaseStaging = async (path, staging, cleanup, outcome) => {
			try {
				await cleanup.release();
			} catch (cause) {
				throw new ClientConfigurationPublicationFailure(path, outcome, cause, {
					kind: "staged-output",
					resource: staging.directory,
					output: staging
				}, cleanup);
			}
		};
	})))();
}

//#endregion
export { ClientConfigurationPublication, ClientConfigurationPublicationFailure, ClientConfigurationWriteError, init_ClientConfigPath, init_ClientConfigurationCleanup, init_ClientConfigurationPublication, init_ClientRegistrationBackup, isClientConfigurationCleanupFailure, preservePrivateRecoveryBackup, resolveClientConfigTransactionPath, retryClientConfigurationCleanup, writeClientRegistrationBackup };