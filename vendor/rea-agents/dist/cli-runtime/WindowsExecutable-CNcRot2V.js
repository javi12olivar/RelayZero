import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_executableSearch, windowsPathCandidates } from "./executableSearch-B91ds2Qv.js";
import { AbortedWait, init_AbortablePromise, waitForAbortable } from "./AbortablePromise-CvIbazUz.js";
import { stat } from "node:fs/promises";

//#region dist/process/WindowsExecutable.js
var findWindowsExecutable;
function init_WindowsExecutable() {
	return (init_WindowsExecutable = __esmMin((() => {
		init_result();
		init_AbortablePromise();
		init_executableSearch();
		findWindowsExecutable = async (executable, environment, options) => {
			if (options.signal.aborted) return err({ kind: "interrupted" });
			const candidates = windowsPathCandidates(executable, environment, options);
			if (!candidates.ok) return candidates;
			for (const { path: candidate } of candidates.value) {
				if (options.signal.aborted) return err({ kind: "interrupted" });
				try {
					const metadata = await waitForAbortable(stat(candidate), options.signal);
					if (metadata instanceof AbortedWait || options.signal.aborted) return err({ kind: "interrupted" });
					if (metadata.isFile()) return ok(candidate);
				} catch (cause) {
					if (options.signal.aborted) return err({ kind: "interrupted" });
					const code = typeof cause === "object" && cause !== null ? Reflect.get(cause, "code") : undefined;
					if (code === "ENOENT" || code === "ENOTDIR") continue;
					return err({
						kind: "inspection",
						path: candidate,
						code: typeof code === "string" ? code : null,
						cause
					});
				}
			}
			return err({ kind: "missing" });
		};
	})))();
}

//#endregion
export { findWindowsExecutable, init_WindowsExecutable };