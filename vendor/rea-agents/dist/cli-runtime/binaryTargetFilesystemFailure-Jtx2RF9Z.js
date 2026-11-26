import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryTargetError, init_configurationErrors } from "./jsonSerialization-DAF9DVXC.js";

//#region dist/domain/binaryTargetFilesystemFailure.js
var classifyBinaryTargetFilesystemFailure, classifyTargetFilesystemFailure, filesystemErrorCode, targetFailureReason;
function init_binaryTargetFilesystemFailure() {
	return (init_binaryTargetFilesystemFailure = __esmMin((() => {
		init_configurationErrors();
		classifyBinaryTargetFilesystemFailure = (path, cause) => classifyTargetFilesystemFailure(path, cause, "read");
		classifyTargetFilesystemFailure = (path, cause, stage) => {
			if (!(cause instanceof Error)) return undefined;
			const code = filesystemErrorCode(cause);
			return code === undefined ? undefined : new BinaryTargetError(path, targetFailureReason(code, cause.message, stage), { cause });
		};
		filesystemErrorCode = (cause) => {
			const code = Reflect.get(cause, "code");
			return typeof code === "string" ? code : undefined;
		};
		targetFailureReason = (code, detail, stage) => {
			switch (code) {
				case "ENOENT":
				case "ENOTDIR": return `target does not exist or a path component is not a directory: ${detail}`;
				case "EACCES":
				case "EPERM": return `permission denied while reading target: ${detail}`;
				case "EISDIR": return `target is a directory, not a readable file: ${detail}`;
				case "ENOTFILE": return "target is not a regular file";
				case "ELOOP": return stage === "resolve" ? `target path could not be resolved: too many symbolic links or a symbolic link loop: ${detail}` : `target changed while being opened: ${detail}`;
				default: return `target could not be read (${code}): ${detail}`;
			}
		};
	})))();
}

//#endregion
export { classifyBinaryTargetFilesystemFailure, classifyTargetFilesystemFailure, init_binaryTargetFilesystemFailure };