import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteCallerPath, appendCallerPath, init_callerPath, isQualifiedCallerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { posix, win32 } from "node:path";

//#region dist/process/executableSearch.js
/**
* The files `execvp` tries for a bare command (one without `/`), in PATH
* order: an empty entry names the working directory and a relative entry
* resolves against it. `..` is kept for the filesystem to resolve after any
* symbolic link. Each caller decides how a candidate is probed and how a
* failed probe is reported; this owner fixes only the search order.
* Candidates are produced on demand: stop iterating at the first match.
* Several names are tried in each entry before the next entry.
*/
function* posixPathCandidates(commands, searchPath, selection) {
	for (const directory of searchPath.split(posix.delimiter)) {
		const relativeEntry = !posix.isAbsolute(directory);
		if (relativeEntry && selection.relativeEntries === "skip") continue;
		const workingDirectory = relativeEntry && selection.relativeEntries === "resolve" ? selection.workingDirectory ?? currentDirectory() : undefined;
		if (relativeEntry && workingDirectory === undefined) continue;
		for (const command of typeof commands === "string" ? [commands] : commands) yield {
			path: absoluteCallerPath(appendCallerPath(directory, command, "linux"), {
				...workingDirectory === undefined ? {} : { cwd: workingDirectory },
				platform: "linux"
			}),
			relativeEntry
		};
	}
}
var currentDirectory, windowsPathEntries, WINDOWS_IMAGE_EXTENSIONS, windowsPathCandidates;
function init_executableSearch() {
	return (init_executableSearch = __esmMin((() => {
		init_callerPath();
		init_result();
		init_snapshotEnvironment();
		currentDirectory = () => {
			try {
				return process.cwd();
			} catch (cause) {
				void cause;
				return undefined;
			}
		};
		windowsPathEntries = (value) => {
			const entries = [];
			let start = 0;
			let quoted = false;
			for (let index = 0; index < value.length; index += 1) {
				if (value[index] === "\"" && (quoted || index === start)) quoted = !quoted;
				else if (value[index] === ";" && !quoted) {
					entries.push(value.slice(start, index));
					start = index + 1;
				}
			}
			entries.push(value.slice(start));
			return entries.flatMap((entry) => {
				if (entry === "") return [];
				if (entry.startsWith("\"") && entry.endsWith("\"") && entry.length >= 2) return entry.length === 2 ? [] : [entry.slice(1, -1)];
				return entry.includes("\"") ? [] : [entry];
			});
		};
		WINDOWS_IMAGE_EXTENSIONS = new Set([".com", ".exe"]);
		windowsPathCandidates = (commands, environment, search = {}) => {
			const selected = snapshotEnvironment(environment, "win32");
			const listed = typeof commands === "string" ? [commands] : commands;
			const extensions = (selected.PATHEXT ?? ".COM;.EXE;.BAT;.CMD").split(";").filter((extension) => extension !== "");
			const invalid = listed.every((command) => win32.extname(command) !== "") ? undefined : extensions.find((extension) => !extension.startsWith(".") || /[\\/:\0]/u.test(extension));
			if (invalid !== undefined) return err({
				kind: "invalid_extension",
				extension: invalid
			});
			const runnable = (extension) => search.allowBatch === true || WINDOWS_IMAGE_EXTENSIONS.has(extension.toLowerCase());
			const spelled = (command) => {
				const explicit = win32.extname(command);
				if (explicit !== "") return runnable(explicit) ? [command] : [];
				return extensions.filter(runnable).map((extension) => `${command}${extension}`);
			};
			const qualified = (command) => /[\\/]/u.test(command) || win32.parse(command).root !== "";
			const located = listed.filter(qualified).flatMap(spelled);
			const names = listed.filter((command) => !qualified(command)).flatMap(spelled);
			const entries = windowsPathEntries(selected.PATH ?? "");
			return ok({ *[Symbol.iterator]() {
				for (const name of located) {
					const workingDirectory = isQualifiedCallerPath(name, "win32") ? name : search.cwd ?? currentDirectory();
					if (workingDirectory === undefined) continue;
					yield {
						path: win32.resolve(workingDirectory, name),
						relativeEntry: false
					};
				}
				if (names.length === 0) return;
				for (const directory of entries) {
					const relativeEntry = !isQualifiedCallerPath(directory, "win32");
					if (relativeEntry && search.relativeEntries === "skip") continue;
					const workingDirectory = relativeEntry ? search.cwd ?? currentDirectory() : directory;
					if (workingDirectory === undefined) continue;
					for (const name of names) yield {
						path: win32.resolve(workingDirectory, directory, name),
						relativeEntry
					};
				}
			} });
		};
	})))();
}

//#endregion
export { init_executableSearch, posixPathCandidates, windowsPathCandidates };