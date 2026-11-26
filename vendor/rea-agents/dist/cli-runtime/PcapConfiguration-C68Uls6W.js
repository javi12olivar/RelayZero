import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisArtifactChangedError, AnalysisCapabilityUnavailableError, init_analysisErrorCore, init_isRecord, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { init_callerPath, isQualifiedCallerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_executableSearch, posixPathCandidates, windowsPathCandidates } from "./executableSearch-B91ds2Qv.js";
import { init_jsonDuplicateMember, parseJsonWithDuplicatePolicy } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { accessSync, constants, statSync } from "node:fs";
import { isAbsolute } from "node:path";
import { setImmediate } from "node:timers/promises";

//#region dist/domain/pcap/tsharkJsonPackets.js
var YIELD_INTERVAL, chargeExpansion, parseTsharkJsonPackets, readTsharkJsonPackets;
function init_tsharkJsonPackets() {
	return (init_tsharkJsonPackets = __esmMin((() => {
		init_jsonDuplicateMember();
		init_result();
		YIELD_INTERVAL = 65536;
		chargeExpansion = async (text, budget, signal) => {
			let quoted = false;
			let escaped = false;
			budget.decodedBytes += text.length * 2;
			for (let index = 0; index < text.length; index += 1) {
				if (index % YIELD_INTERVAL === 0) {
					await setImmediate();
					if (signal?.aborted) return {
						kind: "cancelled",
						cause: signal.reason
					};
				}
				const char = text[index];
				if (quoted) {
					if (escaped) escaped = false;
					else if (char === "\\") escaped = true;
					else if (char === "\"") quoted = false;
				} else if (char === "\"") {
					quoted = true;
					budget.decodedBytes += 64;
				} else if (char === "{" || char === "[" || char === ":" || char === ",") budget.decodedBytes += 128;
				if (budget.decodedBytes > budget.maxDecodedBytes) return {
					kind: "json-expansion",
					maxDecodedBytes: budget.maxDecodedBytes
				};
			}
			return undefined;
		};
		parseTsharkJsonPackets = (text) => {
			const parsed = parseJsonWithDuplicatePolicy(text, "last-wins");
			if (!parsed.ok) return err({
				kind: "malformed-json",
				cause: parsed.cause
			});
			const decoded = parsed.value;
			if (!Array.isArray(decoded)) return err({
				kind: "malformed-packet",
				reason: "packet root must be an array"
			});
			const packets = [];
			for (const [index, packet] of decoded.entries()) {
				if (!isRecord(packet) || !isRecord(packet._source) || !isRecord(packet._source.layers)) return err({
					kind: "malformed-packet",
					reason: `packet ${String(index + 1)} lacks _source.layers`
				});
				packets.push(packet._source.layers);
			}
			return ok(packets);
		};
		readTsharkJsonPackets = async (text, budget, signal) => {
			if (signal?.aborted) return err({
				kind: "cancelled",
				cause: signal.reason
			});
			if (Buffer.byteLength(text) > budget.maxBytes) return err({
				kind: "json-bytes",
				maxBytes: budget.maxBytes
			});
			const refused = await chargeExpansion(text, budget, signal);
			if (refused !== undefined) return err(refused);
			return parseTsharkJsonPackets(text);
		};
	})))();
}

//#endregion
//#region dist/pcap/PcapConfiguration.js
var wiresharkExecutableIdentity, assertWiresharkExecutableIdentity, TSHARK_COMMAND_ENV, CAPINFOS_COMMAND_ENV, PCAP_TOOL_REMEDIATION, pcapToolUnavailable, TOOL_COMMAND_ENV, selectWiresharkTool, isRegularFile, locateWiresharkToolOnWindowsPath, resolvePcapTools, locateWiresharkTool, PcapConfigurationFailure, parseWiresharkVersion, inspectPcapClient, rejectionCodeOf, pcapConfigurationAvailability;
function init_PcapConfiguration() {
	return (init_PcapConfiguration = __esmMin((() => {
		init_executableSearch();
		init_analysisErrorCore();
		init_callerPath();
		wiresharkExecutableIdentity = (snapshot) => ({
			bytes: snapshot.bytes.byteLength,
			sha256: snapshot.sha256
		});
		assertWiresharkExecutableIdentity = (operation, path, expected, actual, options) => {
			if (actual.bytes !== expected.bytes || actual.sha256 !== expected.sha256) throw new AnalysisArtifactChangedError(operation, path, "The selected Wireshark executable changed during analysis.", options);
		};
		TSHARK_COMMAND_ENV = "REA_TSHARK_COMMAND";
		CAPINFOS_COMMAND_ENV = "REA_CAPINFOS_COMMAND";
		PCAP_TOOL_REMEDIATION = `Supply Wireshark 4.x tshark and capinfos on PATH or through absolute ${TSHARK_COMMAND_ENV} and ${CAPINFOS_COMMAND_ENV}; REA does not install them.`;
		pcapToolUnavailable = (operation, reason, options) => new AnalysisCapabilityUnavailableError("pcap", operation, reason, {
			...options,
			userMessage: `${/[.!?]$/u.test(reason) ? reason : `${reason}.`} ${PCAP_TOOL_REMEDIATION}`
		});
		TOOL_COMMAND_ENV = {
			tshark: TSHARK_COMMAND_ENV,
			capinfos: CAPINFOS_COMMAND_ENV
		};
		selectWiresharkTool = (environment, tool, platform) => {
			const key = TOOL_COMMAND_ENV[tool];
			const configured = environment[key];
			if (configured === undefined || configured.trim() === "") return {
				command: tool,
				source: "path"
			};
			if (!isQualifiedCallerPath(configured, platform)) throw new PcapConfigurationFailure(`${tool}_not_absolute`, `${key} must be an absolute path to the ${tool} binary`, { configured });
			return {
				command: configured,
				source: "environment"
			};
		};
		isRegularFile = (path) => {
			try {
				return statSync(path).isFile();
			} catch {
				return false;
			}
		};
		locateWiresharkToolOnWindowsPath = (tool, environment, isFile) => {
			const candidates = windowsPathCandidates(tool, environment, { relativeEntries: "skip" });
			if (!candidates.ok) throw new PcapConfigurationFailure("invalid_pathext", "PATHEXT contains an invalid filename extension. Correct PATHEXT or specify the Wireshark tool by absolute path.", { extension: candidates.error.extension });
			for (const { path } of candidates.value) if (isFile(path)) return path;
			return undefined;
		};
		resolvePcapTools = (environment, platform, isFile = isRegularFile) => {
			const selected = {
				tshark: selectWiresharkTool(environment, "tshark", platform),
				capinfos: selectWiresharkTool(environment, "capinfos", platform)
			};
			const locate = (tool) => {
				const selection = selected[tool];
				if (selection.source === "environment") return selection;
				const command = platform === "win32" ? locateWiresharkToolOnWindowsPath(tool, environment, isFile) : locateWiresharkTool(selection, environment);
				if (command === undefined) throw new PcapConfigurationFailure(`${tool}_missing`, `${tool} was not found in an absolute PATH entry; add it to PATH or set ${TOOL_COMMAND_ENV[tool]} to its absolute path`);
				return {
					command,
					source: "path"
				};
			};
			return {
				tshark: locate("tshark"),
				capinfos: locate("capinfos")
			};
		};
		locateWiresharkTool = (selection, environment) => {
			if (selection.source === "environment" || isAbsolute(selection.command)) return selection.command;
			for (const { path: candidate } of posixPathCandidates(selection.command, environment.PATH ?? "", { relativeEntries: "skip" })) {
				try {
					accessSync(candidate, constants.X_OK);
					if (statSync(candidate).isFile()) return candidate;
				} catch {}
			}
			return undefined;
		};
		PcapConfigurationFailure = class extends Error {
			code;
			diagnostics;
			constructor(code, message, diagnostics = {}, options) {
				super(message, options);
				this.code = code;
				this.diagnostics = diagnostics;
			}
		};
		parseWiresharkVersion = (stdout, tool) => {
			const line = stdout.split(/\r?\n/u).map((entry) => entry.trim()).find((entry) => entry !== "");
			const parsed = line === undefined ? null : new RegExp(`^${tool} \\(Wireshark\\) (\\d+)\\.\\d+\\.\\d+`, "iu").exec(line);
			if (parsed === null || line === undefined) return null;
			if (parsed[1] !== "4") throw new PcapConfigurationFailure(`${tool}_version_unsupported`, "Packet capture inspection currently requires Wireshark 4.x tools; select an installation with the admitted output profile.", { version: line });
			return line;
		};
		inspectPcapClient = async (selection, probe) => ({
			tsharkVersion: parseWiresharkVersion(await probe(selection.tshark.command), "tshark"),
			capinfosVersion: parseWiresharkVersion(await probe(selection.capinfos.command), "capinfos")
		});
		rejectionCodeOf = (code) => code.includes("missing") ? "executable_missing" : code.includes("unsupported") ? "unsupported_version" : code === "invalid_pathext" || code.includes("not_absolute") ? "not_configured" : "version_unresolved";
		pcapConfigurationAvailability = (cause) => ({
			status: "unavailable",
			code: rejectionCodeOf(cause.code),
			reason: cause.message,
			remediation: PCAP_TOOL_REMEDIATION,
			diagnostics: { ...cause.diagnostics }
		});
	})))();
}

//#endregion
export { PCAP_TOOL_REMEDIATION, PcapConfigurationFailure, TSHARK_COMMAND_ENV, assertWiresharkExecutableIdentity, init_PcapConfiguration, init_tsharkJsonPackets, inspectPcapClient, locateWiresharkTool, parseWiresharkVersion, pcapConfigurationAvailability, pcapToolUnavailable, readTsharkJsonPackets, resolvePcapTools, selectWiresharkTool, wiresharkExecutableIdentity };