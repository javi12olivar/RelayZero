import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_runtimeVersion, javaScriptRuntime } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { CURRENT_ENTRYPOINT_PATH, init_CurrentEntrypointPath, normalizeEntrypointPath } from "./CurrentEntrypointPath-CMyQTNb_.js";
import { init_executableSearch, posixPathCandidates } from "./executableSearch-B91ds2Qv.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { accessSync, constants, realpathSync } from "node:fs";
import { isAbsolute } from "node:path";
import { valid } from "semver";

//#region dist/application/ClientRegistrationIdentity.js
var environmentValue, invokingPackageRunner, withoutPackageRunnerIdentity, currentClientRegistrationCommand, unwrapCmdCommand, clientRegistrationPackageReference, entrypointIdentity, directEntrypointIdentity, sameFileExecutableAlias, registrationEntrypointPath, registrationRuntimePath, equivalentClientRegistrationCommands, inspectClientRegistrationCommand, classifyClientRegistrationCommand, inspectDirectRegistrationCommand;
function init_ClientRegistrationIdentity() {
	return (init_ClientRegistrationIdentity = __esmMin((() => {
		init_HostPlatform();
		init_CurrentEntrypointPath();
		init_runtimeVersion();
		init_executableSearch();
		init_identity();
		environmentValue = (environment, name, platform) => {
			if (platform !== "win32") return environment[name];
			const target = name.toLowerCase();
			const key = Object.keys(environment).findLast((candidate) => candidate.toLowerCase() === target);
			return key === undefined ? undefined : environment[key];
		};
		invokingPackageRunner = (environment, platform) => {
			if (environmentValue(environment, "npm_command", platform) !== "exec") return undefined;
			return environmentValue(environment, "npm_config_user_agent", platform)?.startsWith("bun/") === true ? "bunx" : "npx";
		};
		withoutPackageRunnerIdentity = (environment, platform) => Object.fromEntries(Object.entries(environment).filter(([key]) => platform === "win32" ? key.toLowerCase() !== "npm_command" : key !== "npm_command"));
		currentClientRegistrationCommand = (selection = {}) => {
			const platform = selection.platform ?? HOST_PLATFORM.platform;
			const environment = selection.environment ?? process.env;
			const entrypointPath = Object.hasOwn(selection, "entrypointPath") ? selection.entrypointPath : CURRENT_ENTRYPOINT_PATH;
			if (entrypointPath === undefined || entrypointPath.length === 0) return [];
			return [
				registrationRuntimePath(process.execPath, javaScriptRuntime(process.versions).id, environment, platform),
				registrationEntrypointPath(entrypointPath, environment, platform),
				"mcp"
			];
		};
		unwrapCmdCommand = (command) => {
			const executable = command[0]?.toLowerCase();
			if (executable !== "cmd" && executable !== "cmd.exe") return command;
			if (command[1]?.toLowerCase() === "/c") return command.slice(2);
			if (command[1]?.toLowerCase() === "/d" && command[2]?.toLowerCase() === "/c") return command.slice(3);
			return [];
		};
		clientRegistrationPackageReference = (command) => {
			const arguments_ = unwrapCmdCommand(command);
			if (arguments_.length === 4 && arguments_[0] === "npx" && arguments_[1] === "-y" && arguments_[3] === "mcp") return arguments_[2];
			if (arguments_.length === 3 && arguments_[0] === "bunx" && arguments_[2] === "mcp") return arguments_[1];
			return undefined;
		};
		entrypointIdentity = (candidate, current) => {
			if (!isAbsolute(candidate) || !isAbsolute(current)) return "unknown";
			if (candidate === current) return "owned";
			if (HOST_PLATFORM.platform !== "win32" && javaScriptRuntime(process.versions).id === "bun" && [candidate, current].some((path) => path.split("/").includes(".."))) return "unknown";
			try {
				return realpathSync.native(candidate) === realpathSync.native(current) ? "owned" : "foreign";
			} catch {
				return "unknown";
			}
		};
		directEntrypointIdentity = (candidate, current) => {
			const nativeIdentity = entrypointIdentity(candidate, current);
			const scriptPath = normalizeEntrypointPath(candidate, "node");
			if (scriptPath === candidate) return nativeIdentity;
			return scriptPath !== undefined && entrypointIdentity(scriptPath, current) === nativeIdentity ? nativeIdentity : "unknown";
		};
		sameFileExecutableAlias = (selected, name, environment, identify) => {
			for (const { path: candidate } of posixPathCandidates(name, environment.PATH ?? "", { relativeEntries: "skip" })) {
				if (identify(candidate, selected) !== "owned") continue;
				try {
					accessSync(candidate, constants.X_OK);
					return candidate;
				} catch {}
			}
			return selected;
		};
		registrationEntrypointPath = (entrypoint, environment, platform) => platform === "win32" ? entrypoint : sameFileExecutableAlias(entrypoint, PRODUCT_IDENTITY.cliBinary, environment, directEntrypointIdentity);
		registrationRuntimePath = (executable, runtime, environment, platform) => platform === "win32" ? executable : sameFileExecutableAlias(executable, runtime, environment, entrypointIdentity);
		equivalentClientRegistrationCommands = (previous, requested) => {
			if (previous.length === requested.length && previous.every((value, index) => value === requested[index])) return true;
			const requestedFacts = inspectClientRegistrationCommand(requested, undefined);
			const current = requestedFacts.entrypoint;
			if (current === undefined) return false;
			const prior = inspectClientRegistrationCommand(previous, current);
			return prior.entrypoint !== undefined && prior.identity === "owned" && prior.launch === requestedFacts.launch;
		};
		inspectClientRegistrationCommand = (command, currentCommandPath) => {
			const reference = clientRegistrationPackageReference(command);
			if (reference !== undefined) {
				const prefix = `${PRODUCT_IDENTITY.packageName}@`;
				const version = reference.startsWith(prefix) ? reference.slice(prefix.length) : undefined;
				const normalized = version === undefined ? null : valid(version);
				const owned = reference === PRODUCT_IDENTITY.packageName || reference === PRODUCT_IDENTITY.packageSpecifier || reference === PRODUCT_IDENTITY.registrationPackageSpecifier || normalized !== null;
				return {
					identity: owned ? "owned" : "foreign",
					launch: "package_runner",
					entrypoint: undefined,
					package: {
						reference,
						exactVersion: normalized === version ? version : undefined
					}
				};
			}
			return inspectDirectRegistrationCommand(command, currentCommandPath);
		};
		classifyClientRegistrationCommand = (command, currentCommandPath) => inspectClientRegistrationCommand(command, currentCommandPath).identity;
		inspectDirectRegistrationCommand = (command, currentCommandPath) => {
			const currentPathAvailable = currentCommandPath !== undefined && currentCommandPath.length > 0;
			if (command.length === 3 && command[2] === "mcp") {
				const interpreter = command[0] ?? "";
				const entrypoint = command[1] ?? "";
				if (!isAbsolute(interpreter) || !isAbsolute(entrypoint)) return {
					identity: "unknown",
					launch: "runtime_script",
					entrypoint: undefined,
					package: undefined
				};
				const interpreterIdentity = entrypointIdentity(interpreter, process.execPath);
				if (interpreterIdentity !== "owned") return {
					identity: currentPathAvailable ? interpreterIdentity : "unknown",
					launch: "runtime_script",
					entrypoint: undefined,
					package: undefined
				};
				const selectedEntrypoint = normalizeEntrypointPath(entrypoint);
				return {
					launch: "runtime_script",
					identity: selectedEntrypoint === undefined || !currentPathAvailable ? "unknown" : entrypointIdentity(selectedEntrypoint, currentCommandPath),
					entrypoint: selectedEntrypoint,
					package: undefined
				};
			}
			if (command.length === 2 && command[1] === "mcp") {
				const executable = command[0] ?? "";
				if (executable === PRODUCT_IDENTITY.cliBinary) return {
					identity: "owned",
					launch: "direct",
					entrypoint: undefined,
					package: undefined
				};
				if (isAbsolute(executable)) return {
					launch: "direct",
					identity: currentPathAvailable ? directEntrypointIdentity(executable, currentCommandPath) : "unknown",
					entrypoint: executable,
					package: undefined
				};
				if (/[./\\]/u.test(executable)) return {
					identity: "unknown",
					launch: "direct",
					entrypoint: undefined,
					package: undefined
				};
			}
			return {
				identity: "foreign",
				launch: "unknown",
				entrypoint: undefined,
				package: undefined
			};
		};
	})))();
}

//#endregion
export { classifyClientRegistrationCommand, currentClientRegistrationCommand, equivalentClientRegistrationCommands, init_ClientRegistrationIdentity, inspectClientRegistrationCommand, invokingPackageRunner, withoutPackageRunnerIdentity };