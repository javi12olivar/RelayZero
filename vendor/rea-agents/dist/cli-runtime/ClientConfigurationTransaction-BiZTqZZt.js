import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, init_configurationErrors } from "./jsonSerialization-DAF9DVXC.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, OwnedFileHandle, RegularFileChangedError, init_AnalysisCleanupLease, init_OwnedFileHandle, init_RegularFile, init_resources } from "./resources-B3P64jvH.js";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { lstat, open, realpath, stat } from "node:fs/promises";

//#region dist/application/ClientPrivateProfile.js
var PRIVATE_PROFILE_MODES, privateProfileModesCurrent, securePrivateDirectory, privateProfilePermissions;
function init_ClientPrivateProfile() {
	return (init_ClientPrivateProfile = __esmMin((() => {
		init_resources();
		init_configurationErrors();
		init_RegularFile();
		init_OwnedFileHandle();
		PRIVATE_PROFILE_MODES = {
			directory: 448,
			file: 384
		};
		privateProfileModesCurrent = async (configPath, platform) => {
			if (platform === "win32") return true;
			const target = await realpath(configPath);
			const [file, directory] = await Promise.all([stat(target), stat(dirname(target))]);
			return (file.mode & 511) === PRIVATE_PROFILE_MODES.file && (directory.mode & 511) === PRIVATE_PROFILE_MODES.directory;
		};
		securePrivateDirectory = async (path, home, checkCancellation, resources) => {
			const owner = new OwnedFileHandle(await open(path, constants.O_RDONLY | (constants.O_DIRECTORY ?? 0) | (constants.O_NOFOLLOW ?? 0)));
			const lease = AnalysisCleanupLease.forCloseOwner(owner, path);
			let primary;
			let changed = false;
			try {
				const before = await owner.handle.stat();
				const named = await lstat(path);
				if (!before.isDirectory() || named.isSymbolicLink() || before.ino === 0 || before.dev !== named.dev || before.ino !== named.ino || !named.isDirectory()) throw new RegularFileChangedError(path);
				const homeFolder = await stat(home);
				if (homeFolder.dev === before.dev && homeFolder.ino === before.ino) throw new ConfigurationError(`The private profile folder ${path} is the home folder; REA will not make the home folder private. Point the client at its own profile folder; no settings were written.`);
				changed = (before.mode & 511) !== PRIVATE_PROFILE_MODES.directory;
				checkCancellation();
				if (changed) await owner.handle.chmod(PRIVATE_PROFILE_MODES.directory);
				const after = await owner.handle.stat();
				const current = await lstat(path);
				if ((after.mode & 511) !== PRIVATE_PROFILE_MODES.directory || current.isSymbolicLink() || !current.isDirectory() || current.dev !== after.dev || current.ino !== after.ino) throw new RegularFileChangedError(path);
			} catch (cause) {
				primary = cause;
			}
			try {
				await lease.release();
			} catch (cause) {
				const error = new ConfigurationError(`Private client directory cleanup failed at ${path}`, {
					cause: primary === undefined ? cause : new AggregateError([primary, cause], "Private profile permission operation and directory cleanup failed"),
					cleanup: {
						reason: "Private profile directory handle could not be closed",
						resources: [path]
					}
				});
				new AnalysisCleanupLeaseGroup(error, [lease]);
				resources?.retain({
					kind: "lease",
					resource: path,
					lease
				});
				throw error;
			}
			if (primary !== undefined) throw primary;
			return changed;
		};
		privateProfilePermissions = (platform) => platform === "win32" ? {
			kind: "requested_windows_modes",
			requestedDirectoryMode: PRIVATE_PROFILE_MODES.directory,
			requestedFileMode: PRIVATE_PROFILE_MODES.file,
			aclVerification: "unavailable"
		} : {
			kind: "verified_posix_modes",
			directoryMode: PRIVATE_PROFILE_MODES.directory,
			fileMode: PRIVATE_PROFILE_MODES.file
		};
	})))();
}

//#endregion
//#region dist/application/ClientConfigurationTransaction.js
var activeTransactions, withClientConfigurationTransaction;
function init_ClientConfigurationTransaction() {
	return (init_ClientConfigurationTransaction = __esmMin((() => {
		activeTransactions = new Map();
		withClientConfigurationTransaction = async (path, operation) => {
			const key = resolve(path);
			const previous = activeTransactions.get(key);
			let release;
			const current = new Promise((complete) => {
				release = complete;
			});
			activeTransactions.set(key, current);
			await previous;
			try {
				return await operation();
			} finally {
				release();
				if (activeTransactions.get(key) === current) activeTransactions.delete(key);
			}
		};
	})))();
}

//#endregion
export { PRIVATE_PROFILE_MODES, init_ClientConfigurationTransaction, init_ClientPrivateProfile, privateProfileModesCurrent, privateProfilePermissions, securePrivateDirectory, withClientConfigurationTransaction };