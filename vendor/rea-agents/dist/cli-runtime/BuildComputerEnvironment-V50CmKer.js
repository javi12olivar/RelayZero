import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { init_executableSearch, windowsPathCandidates } from "./executableSearch-B91ds2Qv.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { homeDirectoryFromEnvironment, init_homeDirectory } from "./homeDirectory-DC_DeJIg.js";
import { init_ProgramLookup, resolveProgram } from "./ProgramLookup-4Ei2ENwn.js";
import { init_buildComputerSettings } from "./buildComputerSettings-CBkm3nxB.js";
import { init_cacheDirectory, reaCacheDirectory } from "./cacheDirectory-Dg3TgBIa.js";
import { isAbsolute } from "node:path";
import { stat } from "node:fs/promises";

//#region dist/desktop/BuildComputerEnvironment.js
var buildComputerArchiveDirectory, defaultBuildComputerArchive, agentEnvReportedVersion, programOnPath, resolveBuildComputerProgram, isFile, resolveBuildComputerEnvironment;
function init_BuildComputerEnvironment() {
	return (init_BuildComputerEnvironment = __esmMin((() => {
		init_homeDirectory();
		init_cacheDirectory();
		init_callerPath();
		init_identity();
		init_HostPlatform();
		init_executableSearch();
		init_buildComputerSettings();
		init_ProgramLookup();
		buildComputerArchiveDirectory = (environment, platform) => reaCacheDirectory(homeDirectoryFromEnvironment(environment, platform), environment, platform, "build-computer");
		defaultBuildComputerArchive = (environment, platform, directory = buildComputerArchiveDirectory(environment, platform)) => appendCallerPath(directory, `rea-${PRODUCT_IDENTITY.packageVersion}.tar.xz`, platform);
		agentEnvReportedVersion = (stdout) => /^agent-env (\S+)\s*$/u.exec(stdout.trim())?.[1];
		programOnPath = async (program, environment) => {
			if (HOST_PLATFORM.platform === "win32") {
				const candidates = windowsPathCandidates(program, environment);
				if (!candidates.ok) return undefined;
				for (const candidate of candidates.value) if (!candidate.relativeEntry && await isFile(candidate.path)) return candidate.path;
				return undefined;
			}
			const found = await resolveProgram(program, environment, process.cwd());
			return found === undefined || found.fromRelativeEntry ? undefined : found.path;
		};
		resolveBuildComputerProgram = (value, program, environment) => value === undefined || value === "" ? programOnPath(program, environment) : Promise.resolve(value);
		isFile = (path) => stat(path).then((entry) => entry.isFile(), () => false);
		resolveBuildComputerEnvironment = async (environment, platform, sources = {}) => {
			const defaults = {};
			const unset = (name) => environment[name] === undefined || environment[name] === "";
			const search = { PATH: sources.searchPath ?? environment.PATH };
			const agentEnv = unset("REA_AGENT_ENV_COMMAND") ? await resolveBuildComputerProgram(environment.REA_AGENT_ENV_COMMAND, "agent-env", search) : undefined;
			if (agentEnv !== undefined) defaults.REA_AGENT_ENV_COMMAND = agentEnv;
			const docker = unset("REA_DOCKER_COMMAND") ? await resolveBuildComputerProgram(environment.REA_DOCKER_COMMAND, "docker", search) : undefined;
			if (docker !== undefined) defaults.REA_DOCKER_COMMAND = docker;
			const archive = defaultBuildComputerArchive(environment, platform, sources.archiveDirectory);
			if (unset("REA_BUILD_COMPUTER_REA_ARCHIVE") && isAbsolute(archive) && await isFile(archive)) defaults.REA_BUILD_COMPUTER_REA_ARCHIVE = archive;
			return Object.keys(defaults).length === 0 ? environment : {
				...environment,
				...defaults
			};
		};
	})))();
}

//#endregion
export { agentEnvReportedVersion, buildComputerArchiveDirectory, defaultBuildComputerArchive, init_BuildComputerEnvironment, programOnPath, resolveBuildComputerProgram };