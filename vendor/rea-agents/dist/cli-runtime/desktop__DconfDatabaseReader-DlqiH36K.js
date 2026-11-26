import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { ArtifactReaderFailure, ArtifactResourceScope, OwnedFileHandle, assertArtifactReadActive, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedFileHandle, init_resources, withArtifactFileHandle } from "./resources-B3P64jvH.js";
import { init_OwnedCommand, ownedCommandResources, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_OwnedCommandCleanup, retainArtifactCommandCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { init_ProviderOutcome, providerOutcomeOf } from "./ProviderOutcome-iJMiaLYK.js";
import { init_ProgramLookup, programCandidates } from "./ProgramLookup-4Ei2ENwn.js";
import { dirname, isAbsolute, join, sep } from "node:path";
import { randomUUID } from "node:crypto";
import { open, realpath, stat, writeFile } from "node:fs/promises";

//#region dist/desktop/DconfDatabaseReader.js
var DCONF_NOT_INSTALLED, DCONF_TIMEOUT_MS, DCONF_MAX_BUFFER, DconfReadHandle, hostErrno, dconfFailure, retainedStderr, dconfCommandFailure, dumpDconfDatabase;
function init_DconfDatabaseReader() {
	return (init_DconfDatabaseReader = __esmMin((() => {
		init_OwnedCommand();
		init_ProviderOutcome();
		init_OwnedFileHandle();
		init_OwnedCommandCleanup();
		init_errorMessage();
		init_resources();
		init_ProgramLookup();
		DCONF_NOT_INSTALLED = "dconf is not installed (dconf-cli); set REA_DCONF_COMMAND";
		DCONF_TIMEOUT_MS = 3e4;
		DCONF_MAX_BUFFER = 16 * 1024 * 1024;
		DconfReadHandle = class extends OwnedFileHandle {
			path;
			retainedProcess;
			inspections = new ArtifactResourceScope();
			constructor(file, path) {
				super(file);
				this.path = path;
			}
			get cleanupResources() {
				const ownership = this.retainedProcess?.launch.ownership;
				return [
					this.path,
					...ownership === undefined ? [] : ownedCommandResources(ownership),
					...this.inspections.cleanupResources
				];
			}
			async close() {
				if (this.retainedProcess !== undefined) {
					const stopped = await this.retainedProcess.stop();
					if (stopped.status === "incomplete") throw new Error(stopped.reason);
					this.retainedProcess = undefined;
				}
				await this.inspections.close();
				await super.close();
			}
		};
		hostErrno = (cause) => {
			if (typeof cause !== "object" || cause === null || !("code" in cause)) return null;
			const code = cause.code;
			return typeof code === "string" && code.length > 0 ? code : null;
		};
		dconfFailure = (error, facts) => ({
			ok: false,
			error,
			kind: facts.kind,
			code: facts.code ?? null,
			exitCode: facts.exitCode ?? null,
			command: facts.command ?? null,
			stderr: facts.stderr ?? null
		});
		retainedStderr = (failure) => {
			const text = failure.output?.snapshot.stderr.text.trim() ?? "";
			return text.length === 0 ? null : text;
		};
		dconfCommandFailure = (failure, command) => {
			const stderr = retainedStderr(failure);
			const selected = command ?? null;
			switch (failure.kind) {
				case "launch-failed": {
					const launched = failure.failure.executable ?? selected;
					return failure.failure.code === "ENOENT" ? dconfFailure(DCONF_NOT_INSTALLED, {
						kind: "not-installed",
						code: "ENOENT",
						command: launched
					}) : dconfFailure(failure.message, {
						kind: "launch-failed",
						code: failure.failure.code ?? null,
						command: launched
					});
				}
				case "exited": return dconfFailure(stderr ?? `Command failed: ${command ?? "dconf"} dump / (exit ${failure.exitCode ?? failure.signal})`, {
					kind: "exited",
					exitCode: failure.exitCode,
					command: selected,
					stderr
				});
				case "runtime-exhausted": return dconfFailure(stderr ?? failure.message, {
					kind: "runtime-exhausted",
					exitCode: failure.exitCode,
					command: selected,
					stderr
				});
				case "resource-signal": return dconfFailure(stderr ?? failure.message, {
					kind: "resource-signal",
					command: selected,
					stderr
				});
				case "cancelled": throw new ArtifactReaderFailure("cancelled", "dconf dump was cancelled", {
					cause: failure.reason,
					cancellation: { reason: failure.reason }
				});
				case "timeout":
				case "output-limit":
				case "memory-limit":
				case "protocol": return dconfFailure(stderr ?? failure.message, {
					kind: failure.kind,
					command: selected,
					stderr
				});
			}
		};
		dumpDconfDatabase = async (database, environment, signal) => {
			assertArtifactReadActive(signal);
			let selectedCommand;
			try {
				const directory = await realpath(dirname(database));
				const profile = join(directory, "profile");
				const file = await open(database, "r");
				const owner = new DconfReadHandle(file, database);
				return await withArtifactFileHandle(database, owner, undefined, signal, async (source) => {
					const sourcePath = `/proc/${process.pid}/fd/${source.fd}`;
					try {
						await stat(sourcePath);
					} catch (cause) {
						return dconfFailure(errorMessage(cause), {
							kind: "descriptor-unavailable",
							code: hostErrno(cause)
						});
					}
					try {
						await writeFile(profile, `file-db:${sourcePath}\n`, {
							mode: 384,
							flag: "wx"
						});
					} catch (cause) {
						return dconfFailure(errorMessage(cause), {
							kind: "profile-write",
							code: hostErrno(cause)
						});
					}
					const command = environment.REA_DCONF_COMMAND ?? "dconf";
					const startedIn = process.cwd();
					const direct = command.includes("/") || command.includes(sep);
					const candidates = direct ? [{ path: isAbsolute(command) ? command : `${startedIn}${sep}${command}` }] : programCandidates(command, { PATH: environment.PATH ?? "" }, startedIn);
					let refusal;
					let missing;
					for (const candidate of candidates) {
						assertArtifactReadActive(signal);
						selectedCommand = candidate.path;
						try {
							const output = await runOwnedCommand({
								command: candidate.path,
								arguments: ["dump", "/"],
								runId: randomUUID(),
								expectedCommand: null,
								hostEnvironment: {
									PATH: environment.PATH ?? "",
									DCONF_PROFILE: profile
								},
								sweepTokenOwnedProcesses: true
							}, {
								timeoutMs: DCONF_TIMEOUT_MS,
								diagnosticBytes: {
									stdout: DCONF_MAX_BUFFER,
									stderr: DCONF_MAX_BUFFER
								},
								termination: {
									signal: "SIGTERM",
									graceMs: 5e3
								}
							}, {
								...signal === undefined ? {} : { signal },
								retainCleanup: (process) => {
									owner.retainedProcess = process;
								}
							});
							return {
								ok: true,
								text: output.stdout.text
							};
						} catch (cause) {
							retainArtifactCommandCleanup(cause, owner.inspections, "dconf dump");
							const failure = providerOutcomeOf(cause);
							if (!direct && failure?.kind === "launch-failed" && (failure.failure.code === "ENOENT" || failure.failure.code === "ENOTDIR" || failure.failure.code === "EACCES")) {
								if (failure.failure.code === "EACCES") refusal ??= cause;
								else missing = cause;
								continue;
							}
							if (failure?.kind === "cancelled") throw new ArtifactReaderFailure("cancelled", "dconf dump was cancelled", {
								cause: failure.reason,
								cancellation: { reason: failure.reason }
							});
							throw cause;
						}
					}
					if (refusal !== undefined) throw refusal;
					if (missing !== undefined) throw missing;
					return dconfFailure(DCONF_NOT_INSTALLED, { kind: "not-installed" });
				});
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				const failure = providerOutcomeOf(cause);
				if (failure !== undefined) return dconfCommandFailure(failure, selectedCommand);
				return dconfFailure(errorMessage(cause), {
					kind: "read-failed",
					code: hostErrno(cause)
				});
			}
		};
	})))();
}

//#endregion
init_DconfDatabaseReader();
export { dumpDconfDatabase };