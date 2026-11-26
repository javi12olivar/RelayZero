import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage, init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { RegularFileCleanupFailure, init_OwnedRegularFile } from "./resources-B3P64jvH.js";
import { init_RegularFileRead, readRegularFile } from "./RegularFileRead-CRu2Ia6l.js";
import { constants } from "node:fs";
import { copyFile } from "node:fs/promises";

//#region dist/application/SetupRecoveryBackup.js
var isMissing, selectCurrentRecoveryBackup, copyExclusive, preserveCurrentRecoveryBackup;
function init_SetupRecoveryBackup() {
	return (init_SetupRecoveryBackup = __esmMin((() => {
		init_result();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_errorMessage();
		init_sha256Hex();
		isMissing = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
		selectCurrentRecoveryBackup = async (firstBackupPath, original, resources) => {
			const read = (path) => readRegularFile(path, {
				symlinks: "reject",
				...resources === undefined ? {} : { resources }
			});
			const expected = Buffer.isBuffer(original) ? original : Buffer.from(original, "utf8");
			let firstBackup;
			try {
				firstBackup = await read(firstBackupPath);
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) throw cause;
				if (!isMissing(cause)) return err({
					kind: "unreadable",
					path: firstBackupPath,
					detail: `The recovery backup could not be checked: ${errorMessage(cause)}`
				});
			}
			if (firstBackup === undefined) return ok({
				backupPath: firstBackupPath,
				present: false
			});
			if (firstBackup.equals(expected)) return ok({
				backupPath: firstBackupPath,
				present: true
			});
			const digest = sha256Hex(expected);
			const recoveryPath = `${firstBackupPath}.${digest}.recovery`;
			let recovery;
			try {
				recovery = await read(recoveryPath);
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) throw cause;
				if (!isMissing(cause)) return err({
					kind: "unreadable",
					path: recoveryPath,
					detail: `The recovery backup could not be checked: ${errorMessage(cause)}`
				});
			}
			if (recovery !== undefined && !recovery.equals(expected)) return err({
				kind: "occupied",
				path: recoveryPath,
				detail: `The recovery path already contains different data: ${recoveryPath}`
			});
			return ok({
				backupPath: recoveryPath,
				present: recovery !== undefined
			});
		};
		copyExclusive = (source, destination) => copyFile(source, destination, constants.COPYFILE_EXCL);
		preserveCurrentRecoveryBackup = async (firstBackupPath, source, original, { copy = copyExclusive, resources } = {}) => {
			const selection = await selectCurrentRecoveryBackup(firstBackupPath, original, resources);
			if (!selection.ok) return selection;
			const { backupPath } = selection.value;
			if (!selection.value.present) {
				try {
					await copy(source, backupPath);
				} catch (cause) {
					if (!(cause instanceof Error && "code" in cause && cause.code === "EEXIST")) return err({
						kind: "copy",
						path: backupPath,
						detail: `The recovery backup could not be written: ${errorMessage(cause)}`
					});
				}
			}
			const verified = await selectCurrentRecoveryBackup(firstBackupPath, original, resources);
			if (!verified.ok) return verified;
			if (verified.value.backupPath !== backupPath || !verified.value.present) return err({
				kind: "unverified",
				path: backupPath,
				detail: `The recovery backup does not match the configuration it preserves: ${backupPath}`
			});
			return ok(backupPath);
		};
	})))();
}

//#endregion
//#region dist/filesystem/fileHandleMatchesBytes.js
var fileHandleMatchesBytes;
function init_fileHandleMatchesBytes() {
	return (init_fileHandleMatchesBytes = __esmMin((() => {
		fileHandleMatchesBytes = async (handle, expected) => {
			if ((await handle.stat()).size !== expected.length) return false;
			const chunk = Buffer.allocUnsafe(Math.min(64 * 1024, expected.length));
			for (let position = 0; position < expected.length;) {
				const { bytesRead } = await handle.read(chunk, 0, Math.min(chunk.length, expected.length - position), position);
				if (bytesRead === 0 || !chunk.subarray(0, bytesRead).equals(expected.subarray(position, position + bytesRead))) return false;
				position += bytesRead;
			}
			return true;
		};
	})))();
}

//#endregion
export { fileHandleMatchesBytes, init_SetupRecoveryBackup, init_fileHandleMatchesBytes, preserveCurrentRecoveryBackup, selectCurrentRecoveryBackup };