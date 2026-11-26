import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { assertArtifactReadActive, init_ArtifactFileOperation, init_readFileHandleRange, init_resources, readFileHandleRange, withArtifactFileHandle } from "./resources-B3P64jvH.js";
import { ProcessAdmissionError, init_ProcessAdmissionError } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { open } from "node:fs/promises";

//#region dist/process/LinuxResourceLimits.js
var rows, REPORT_PATH, REPORT_BUDGET, kernelLimit, readRow, describeLinuxResourceLimitsFailure, prlimitCeilingArguments, prlimitArgumentVector, clampLinuxResourceLimits, readLinuxResourceLimits;
function init_LinuxResourceLimits() {
	return (init_LinuxResourceLimits = __esmMin((() => {
		init_ProcessAdmissionError();
		init_readFileHandleRange();
		init_errorMessage();
		init_resources();
		rows = {
			address_space_bytes: {
				name: "Max address space",
				unit: "bytes"
			},
			file_bytes: {
				name: "Max file size",
				unit: "bytes"
			},
			cpu_seconds: {
				name: "Max cpu time",
				unit: "seconds"
			}
		};
		REPORT_PATH = "/proc/self/limits";
		REPORT_BUDGET = 16 * 1024;
		kernelLimit = (token) => token === "unlimited" ? token : token !== undefined && /^[0-9]+$/u.test(token) ? BigInt(token) : undefined;
		readRow = (lines, limit) => {
			const { name, unit } = rows[limit];
			const matches = lines.filter((line) => line.startsWith(`${name} `));
			const match = matches[0];
			if (matches.length !== 1 || match === undefined) throw new ProcessAdmissionError("limit_unreadable", {
				limit,
				name
			});
			const [softToken, hardToken, observedUnit, ...extra] = match.slice(name.length).trim().split(/\s+/u);
			const soft = kernelLimit(softToken);
			const hard = kernelLimit(hardToken);
			if (soft === undefined || hard === undefined || observedUnit !== unit || extra.length > 0) throw new ProcessAdmissionError("limit_invalid", {
				limit,
				name
			});
			if (hard !== "unlimited" && (soft === "unlimited" || soft > hard)) throw new ProcessAdmissionError("limit_invalid", {
				limit,
				name,
				violation: "soft_exceeds_hard"
			});
			return {
				soft,
				hard
			};
		};
		describeLinuxResourceLimitsFailure = (cause) => {
			if (cause instanceof ProcessAdmissionError) {
				const name = cause.detail?.name;
				if (cause.code === "limit_unreadable") return `Linux resource limits must report exactly one ${String(name)} row.`;
				if (cause.code === "limit_invalid") return cause.detail?.violation === "soft_exceeds_hard" ? `Inherited ${String(name)} soft limit exceeds its hard limit.` : `Malformed inherited Linux resource limit: ${String(name)}.`;
				if (cause.code === "report_exceeds_budget") return `Inherited Linux resource limits at ${REPORT_PATH} could not be read within the ${String(REPORT_BUDGET)}-byte budget.`;
			}
			return `Could not read inherited Linux resource limits at ${REPORT_PATH}: ${errorMessage(cause)}`;
		};
		prlimitCeilingArguments = (limits) => [
			`--as=${limits.address_space_bytes}:${limits.address_space_bytes}`,
			`--fsize=${limits.file_bytes}:${limits.file_bytes}`,
			`--cpu=${limits.cpu_seconds}:${limits.cpu_seconds}`,
			"--core=0:0",
			"--"
		];
		prlimitArgumentVector = (limits, command) => [...prlimitCeilingArguments(limits), command];
		clampLinuxResourceLimits = (configured, report) => {
			const effective = { ...configured };
			const lines = report.split("\n");
			for (const key of Object.keys(rows)) {
				const { soft, hard } = readRow(lines, key);
				let ceiling = BigInt(configured[key]);
				for (const value of [soft, hard]) if (value !== "unlimited" && value < ceiling) ceiling = value;
				effective[key] = Number(ceiling);
			}
			return effective;
		};
		readLinuxResourceLimits = async (configured, resourceScope, signal) => {
			assertArtifactReadActive(signal);
			const file = await open(REPORT_PATH, "r");
			return withArtifactFileHandle(REPORT_PATH, file, resourceScope, signal, async (handle) => {
				const buffer = await readFileHandleRange(handle, 0, REPORT_BUDGET);
				if (buffer.length === REPORT_BUDGET) throw new ProcessAdmissionError("report_exceeds_budget", { budget_bytes: REPORT_BUDGET });
				return clampLinuxResourceLimits(configured, buffer.toString("utf8"));
			});
		};
	})))();
}

//#endregion
export { describeLinuxResourceLimitsFailure, init_LinuxResourceLimits, prlimitArgumentVector, prlimitCeilingArguments, readLinuxResourceLimits };