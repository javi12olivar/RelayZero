import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisInputError, init_analysisErrorCore, init_analysisResourceLimits, init_localPath, init_stringPatterns, localPathStringSchema, rejectUnpairedSurrogates, timerDurationMsSchema } from "./jsonSerialization-DAF9DVXC.js";
import { RAW_BINARY_ENTRY_POINT, init_rawBinary } from "./targetIdentity-rKLLVwEj.js";
import { commandEvidenceDetailSchema, commandObservationSchema, init_analysisViewResult, init_commandObservation, objdumpSummaryViewResultSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, evidenceResultOf, init_analysisDetail, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";
import { constants } from "node:buffer";

//#region dist/domain/reverseEngineering.js
var DEFAULT_REVERSE_COMMAND_TIMEOUT_MS, DEFAULT_REVERSE_COMMAND_OUTPUT_BYTES, MAX_REVERSE_COMMAND_OUTPUT_BYTES, reverseCommandOutputLimit, reverseCommandOutputBytesSchema, reverseCommandTimeoutSchema, commandExecutionFields, OBJDUMP_ARTIFACT_OPERATIONS, objdumpArtifactInputSchema, objdumpDisassemblyInputSchema, objdumpArchitecturesInputSchema, objdumpInputSchema, rizinNameSchema, rizinInputSchema;
function init_reverseEngineering() {
	return (init_reverseEngineering = __esmMin((() => {
		init_analysisResourceLimits();
		init_commandObservation();
		init_localPath();
		init_rawBinary();
		init_stringPatterns();
		DEFAULT_REVERSE_COMMAND_TIMEOUT_MS = 12e4;
		DEFAULT_REVERSE_COMMAND_OUTPUT_BYTES = 16 * 1024 * 1024;
		MAX_REVERSE_COMMAND_OUTPUT_BYTES = Math.floor((constants.MAX_STRING_LENGTH - 1024 * 1024) / (2 * 6));
		reverseCommandOutputLimit = (bytes) => ({
			control_kind: "parameter",
			parameter: "max_output_bytes",
			effective_value: bytes,
			unit: "bytes",
			minimum: 1,
			maximum: MAX_REVERSE_COMMAND_OUTPUT_BYTES,
			default_value: DEFAULT_REVERSE_COMMAND_OUTPUT_BYTES,
			applies_at: "next_call"
		});
		reverseCommandOutputBytesSchema = z.number().int().min(1).max(MAX_REVERSE_COMMAND_OUTPUT_BYTES).exactOptional().describe(`Combined stdout/stderr byte budget before decoding (default ${String(DEFAULT_REVERSE_COMMAND_OUTPUT_BYTES)}, range 1..${String(MAX_REVERSE_COMMAND_OUTPUT_BYTES)}). Applies on the next call without restarting REA. The maximum reserves JSON-escaping space for both Evidence mirrors under Node's single-string ceiling. Reaching it stops collection and requests provider termination; completion remains unknown. Confirm effects and cleanup before repeating a command. Does not raise the MCP client's receive buffer.`);
		reverseCommandTimeoutSchema = timerDurationMsSchema.exactOptional().describe("Wall-clock budget in milliseconds. Target preflight shares one budget across stat and digest, and the one-shot command receives that budget again (default 120000 each). Omitted means 120000. Applies on the next call. Output admission is separately controlled by max_output_bytes; does not raise Ghidra or Hopper startup deadlines or debugger session deadlines.");
		commandExecutionFields = {
			command_timeout_ms: reverseCommandTimeoutSchema,
			max_output_bytes: reverseCommandOutputBytesSchema
		};
		OBJDUMP_ARTIFACT_OPERATIONS = [
			"file_headers",
			"section_headers",
			"symbols",
			"relocations",
			"dwarf",
			"disassemble",
			"disassemble_all"
		];
		objdumpArtifactInputSchema = z.object({
			path: localPathStringSchema,
			operation: z.enum(OBJDUMP_ARTIFACT_OPERATIONS).exclude(["disassemble"]),
			follow_debug_links: z.boolean().default(false),
			...commandExecutionFields
		}).strict();
		objdumpDisassemblyInputSchema = objdumpArtifactInputSchema.extend({
			operation: z.literal("disassemble"),
			symbol: rejectUnpairedSurrogates(z.string().min(1).regex(/^[^\x00]*$/u), "Symbol must be well-formed Unicode.").describe("Native symbol to disassemble, expressed as well-formed Unicode. Matching and symbol boundaries follow the selected executable; omitted means all code sections.").optional()
		});
		objdumpArchitecturesInputSchema = z.strictObject({
			operation: z.literal("architectures"),
			...commandExecutionFields
		});
		objdumpInputSchema = z.discriminatedUnion("operation", [
			objdumpArtifactInputSchema.extend({ detail: commandEvidenceDetailSchema }),
			objdumpDisassemblyInputSchema.extend({ detail: commandEvidenceDetailSchema }),
			objdumpArchitecturesInputSchema.extend({ detail: commandEvidenceDetailSchema })
		]);
		rizinNameSchema = z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_.+\-]*$/u, "must be a Rizin name: letters, digits, '_', '.', '+' or '-', starting with a letter or digit");
		rizinInputSchema = z.object({
			path: localPathStringSchema,
			command: z.string().min(1).refine((value) => !/[\r\n\u0000]/u.test(value), "A single command line is required"),
			asm_arch: rizinNameSchema.exactOptional().describe("Rizin arch plugin, passed as -a, such as arm. Plugins differ between builds; e asm.arch=? lists them."),
			asm_bits: z.number().int().min(1).max(64).exactOptional().describe("Rizin asm.bits, passed as -b, such as 16 for Thumb. Omitted, Rizin's default applies."),
			asm_cpu: rizinNameSchema.exactOptional().describe("Rizin asm.cpu, passed as -e asm.cpu=, such as cortexm; e asm.cpu=? lists those of the selected arch."),
			base_address: z.string().regex(RAW_BINARY_ENTRY_POINT, { message: "base_address must be a hexadecimal address of the form 0x…" }).exactOptional().describe("Address of file offset 0. REA passes -n and -m, so Rizin maps the file there as a raw image, reads no format headers, and keeps its default decoder unless asm_arch and asm_bits select one."),
			...commandExecutionFields
		}).strict();
	})))();
}

//#endregion
//#region dist/contracts/reverseEngineeringToolContracts.js
var REVERSE_ENGINEERING_TOOL_CONTRACTS;
function init_reverseEngineeringToolContracts() {
	return (init_reverseEngineeringToolContracts = __esmMin((() => {
		init_commandObservation();
		init_analysisViewResult();
		init_reverseEngineering();
		init_toolOutputSchemaPrimitives();
		init_analysisDetail();
		init_toolEffects();
		REVERSE_ENGINEERING_TOOL_CONTRACTS = [{
			name: "inspect_with_objdump",
			cli: true,
			...toolContractMetadata("inspect_with_objdump", toolEffects({
				mutatesSession: true,
				launchesProcess: true
			})),
			kind: "native-provider",
			description: "Inspect a local artifact with caller-selected objdump and GNU-style arguments; the executable implementation/version is unverified. operation disassemble optionally scopes to symbol; omission selects all code sections. operation architectures needs no path and captures -i output without establishing artifact support. Returns authoritative stdout/stderr and artifact SHA-256, with lossy UTF-8 and truncation explicit; there is no stable normalized disassembly format. DWARF debug links are off unless follow_debug_links true; external file identities remain unbound. DEBUGINFOD_URLS is cleared to prevent debuginfod requests. Default complete returns Evidence; summary retains it and returns one command observation for later inspect_analysis_view/export via parent_evidence_id. command_timeout_ms bounds each phase; max_output_bytes independently bounds combined output (16 MiB default). Both apply next call without restart; truncation termination leaves completion unknown, and raising output does not raise client receive limits.",
			inputSchema: objdumpInputSchema,
			outputSchema: analysisDetailOutputSchemaOf(commandObservationSchema, objdumpSummaryViewResultSchema),
			examples: [{
				title: "Disassemble code sections",
				input: {
					path: "/tmp/program",
					operation: "disassemble"
				}
			}, {
				title: "List advertised BFD targets",
				input: { operation: "architectures" }
			}]
		}, {
			name: "execute_rizin_command",
			cli: true,
			...toolContractMetadata("execute_rizin_command", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				writesFilesystem: true,
				launchesProcess: true,
				accessesNetwork: true,
				mayDiscardData: true,
				executesForeignCode: true,
				idempotent: false
			})),
			kind: "native-provider",
			description: "Run one caller-selected Rizin command on a local artifact. Commands/plugins can execute code, mutate files, access network and read outside the artifact; those external inputs are not Evidence-bound. Suppresses user settings/scripts but retains plugins. Raw stdout/stderr is authoritative, JSON is command-specific, and UTF-8 loss/truncation is explicit; output-limit termination leaves completion unknown. Rizin exits 0 even when its shell refuses a statement; completion_status rejected marks that refusal, and later statements did not run. Other command failures can still exit 0, so inspect stderr before treating empty output as absence. For raw images, asm_arch/asm_bits/asm_cpu select decoding and base_address maps offset 0; base_address also passes -n to skip loaders even on ELF, without REA confirming either. An admitted command retires shared binary analysis: close Ghidra explicitly first, then open_binary after effects settle. command_timeout_ms is per-phase and max_output_bytes bounds combined output (16 MiB default); both apply next call without restart and do not raise client receive limits or persistent debugger deadlines.",
			inputSchema: rizinInputSchema,
			outputSchema: evidenceResultOf(commandObservationSchema),
			examples: [{
				title: "Inspect binary information",
				input: {
					path: "/tmp/program",
					command: "iI"
				}
			}]
		}];
	})))();
}

//#endregion
//#region dist/domain/debuggerSessionErrors.js
var unknownDebuggerSessionError, DEBUGGER_SESSION_STOP_CODES, stoppedDebuggerSessionError, DEBUGGER_CLEANUP_INCOMPLETE_CODES, RIZIN_DEBUG_SESSION_TOOLS, GDB_SESSION_TOOLS;
function init_debuggerSessionErrors() {
	return (init_debuggerSessionErrors = __esmMin((() => {
		init_analysisErrorCore();
		unknownDebuggerSessionError = (tools, operation) => new AnalysisInputError(operation, {
			conformsToInputContract: true,
			userMessage: `No ${tools.name} debug session has this session_id in this REA server.`,
			remediationAction: `Use a session_id that ${tools.start} returned in this server process; ${tools.close} releases a session's ID. Call ${tools.start} to begin a new session.`
		}, [{
			path: ["session_id"],
			reason: "invalid_value",
			message: `No ${tools.name} debug session has this session_id in this REA server.`
		}]);
		DEBUGGER_SESSION_STOP_CODES = [
			"input-stream-failure",
			"output-correlation-failure",
			"command-deadline",
			"command-cancelled",
			"server-shutdown",
			"close-requested",
			"process-exited",
			"stopped"
		];
		stoppedDebuggerSessionError = (tools, operation, stop) => new AnalysisCapabilityUnavailableError(tools.providerId, operation, stop.reason, {
			diagnostics: { session_stop: stop.code },
			userMessage: `The ${tools.name} debug session stopped and accepts no more commands. ${stop.reason}`,
			remediationAction: `Call ${tools.close} with this session_id to release the stopped session, then call ${tools.start} to begin a new one. Earlier commands may have changed the target, so confirm their effects before repeating them.`
		});
		DEBUGGER_CLEANUP_INCOMPLETE_CODES = [
			"output-unsettled",
			"detach-pending",
			"inferior-disposition-unverified",
			"inferior-identity-unverified",
			"windows-stop-unsafe",
			"detach-unsupported",
			"detach-timeout",
			"detach-unconfirmed",
			"inferior-state-unknown",
			"multiple-inferiors",
			"no-durable-output-sink",
			"inferior-tty-changed",
			"detach-failed",
			"process-did-not-exit",
			"stop-failed"
		];
		RIZIN_DEBUG_SESSION_TOOLS = {
			providerId: "rizin",
			name: "Rizin",
			start: "start_rizin_debug_session",
			close: "close_rizin_debug_session"
		};
		GDB_SESSION_TOOLS = {
			providerId: "gdb",
			name: "GDB",
			start: "start_gdb_session",
			close: "close_gdb_session"
		};
	})))();
}

//#endregion
export { DEBUGGER_SESSION_STOP_CODES, DEFAULT_REVERSE_COMMAND_OUTPUT_BYTES, DEFAULT_REVERSE_COMMAND_TIMEOUT_MS, GDB_SESSION_TOOLS, OBJDUMP_ARTIFACT_OPERATIONS, REVERSE_ENGINEERING_TOOL_CONTRACTS, RIZIN_DEBUG_SESSION_TOOLS, init_debuggerSessionErrors, init_reverseEngineering, init_reverseEngineeringToolContracts, objdumpInputSchema, reverseCommandOutputLimit, rizinInputSchema, stoppedDebuggerSessionError, unknownDebuggerSessionError };