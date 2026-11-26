import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { init_executableSearch, posixPathCandidates } from "./executableSearch-B91ds2Qv.js";
import { constants } from "node:fs";
import { access, stat } from "node:fs/promises";

//#region dist/desktop/ProgramLookup.js
/** Candidate spellings in launch order, anchored without reserializing PATH. */
function* programCandidates(program, environment, startedIn) {
	if (program.includes("/")) {
		yield {
			path: absoluteCallerPath(program, { cwd: startedIn }),
			fromRelativeEntry: false
		};
		return;
	}
	if (environment.PATH === undefined) return;
	for (const candidate of posixPathCandidates(program, environment.PATH, {
		relativeEntries: "resolve",
		workingDirectory: startedIn
	})) yield {
		path: candidate.path,
		fromRelativeEntry: candidate.relativeEntry
	};
}
var isExecutable, resolveProgram;
function init_ProgramLookup() {
	return (init_ProgramLookup = __esmMin((() => {
		init_callerPath();
		init_executableSearch();
		isExecutable = async (path) => {
			try {
				await access(path, constants.X_OK);
				return (await stat(path)).isFile();
			} catch {
				return false;
			}
		};
		resolveProgram = async (program, environment, startedIn) => {
			for (const candidate of programCandidates(program, environment, startedIn)) if (await isExecutable(candidate.path)) return candidate;
			return undefined;
		};
	})))();
}

//#endregion
export { init_ProgramLookup, programCandidates, resolveProgram };