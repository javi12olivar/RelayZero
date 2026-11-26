import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, DEBUGGER_CONTROL_REPLY_BYTES, DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS, DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, MAX_NODE_TIMER_DELAY_MS, init_analysisResourceLimits, init_configurationErrors } from "./jsonSerialization-DAF9DVXC.js";
import { currentAnalysisOperationSnapshot, init_analysisOperationSnapshot } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_positiveDecimalInteger, positiveDecimalIntegerSchema } from "./positiveDecimalInteger-BhPy7XMJ.js";

//#region dist/config/debuggerSessionLimits.js
var DEBUGGER_COMMAND_DEADLINE_SETTING, DEBUGGER_MAX_SESSIONS_SETTING, DEBUGGER_MAX_PENDING_COMMANDS_SETTING, DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING, limit, DEFAULT_DEBUGGER_COMMAND_DEADLINE, DEFAULT_DEBUGGER_MAX_SESSIONS_LIMIT, DEFAULT_DEBUGGER_MAX_PENDING_COMMANDS_LIMIT, DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_LIMIT, constraintFor, debuggerCommandDeadlineConstraint, debuggerMaxSessionsConstraint, debuggerMaxPendingCommandsConstraint, debuggerMaxCommandOutputBytesConstraint, debuggerCommandDeadlineMsSchema, debuggerMaxSessionsSchema, debuggerMaxPendingCommandsSchema, debuggerMaxCommandOutputBytesSchema, debuggerSessionLimitEnvironmentShape, RUNTIME_DEBUGGER_OVERRIDES, parseOne, parseDebuggerCommandDeadline, parseDebuggerCommandOutput, parseDebuggerSessionLimits, RUNTIME_DEBUGGER_SETTINGS, debuggerConstructionLimits, debuggerControlReplyOutput;
function init_debuggerSessionLimits() {
	return (init_debuggerSessionLimits = __esmMin((() => {
		init_analysisOperationSnapshot();
		init_analysisResourceLimits();
		init_configurationErrors();
		init_result();
		init_positiveDecimalInteger();
		DEBUGGER_COMMAND_DEADLINE_SETTING = "REA_DEBUGGER_COMMAND_DEADLINE_MS";
		DEBUGGER_MAX_SESSIONS_SETTING = "REA_DEBUGGER_MAX_SESSIONS";
		DEBUGGER_MAX_PENDING_COMMANDS_SETTING = "REA_DEBUGGER_MAX_PENDING_COMMANDS";
		DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING = "REA_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES";
		limit = (setting, value, minimum, maximum, unit) => ({
			setting,
			value,
			source: "default",
			defaultValue: value,
			minimum,
			maximum,
			unit
		});
		DEFAULT_DEBUGGER_COMMAND_DEADLINE = limit(DEBUGGER_COMMAND_DEADLINE_SETTING, DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS, 1, MAX_NODE_TIMER_DELAY_MS, "ms");
		DEFAULT_DEBUGGER_MAX_SESSIONS_LIMIT = limit(DEBUGGER_MAX_SESSIONS_SETTING, 8, 1, 64, "sessions");
		DEFAULT_DEBUGGER_MAX_PENDING_COMMANDS_LIMIT = limit(DEBUGGER_MAX_PENDING_COMMANDS_SETTING, 16, 1, 256, "commands");
		DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_LIMIT = limit(DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING, DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, 1, MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, "bytes");
		constraintFor = (admission) => `${admission.setting} must be a positive decimal integer from ${String(admission.minimum)} to ${String(admission.maximum)} ${admission.unit}; the default is ${String(admission.defaultValue)} ${admission.unit}.${admission.unit === "ms" ? " Node schedules a delay above that maximum as 1 ms, so a larger value is refused." : ""}`;
		debuggerCommandDeadlineConstraint = constraintFor(DEFAULT_DEBUGGER_COMMAND_DEADLINE);
		debuggerMaxSessionsConstraint = constraintFor(DEFAULT_DEBUGGER_MAX_SESSIONS_LIMIT);
		debuggerMaxPendingCommandsConstraint = constraintFor(DEFAULT_DEBUGGER_MAX_PENDING_COMMANDS_LIMIT);
		debuggerMaxCommandOutputBytesConstraint = constraintFor(DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_LIMIT);
		debuggerCommandDeadlineMsSchema = positiveDecimalIntegerSchema(1, MAX_NODE_TIMER_DELAY_MS, debuggerCommandDeadlineConstraint);
		debuggerMaxSessionsSchema = positiveDecimalIntegerSchema(1, 64, debuggerMaxSessionsConstraint);
		debuggerMaxPendingCommandsSchema = positiveDecimalIntegerSchema(1, 256, debuggerMaxPendingCommandsConstraint);
		debuggerMaxCommandOutputBytesSchema = positiveDecimalIntegerSchema(1, MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, debuggerMaxCommandOutputBytesConstraint);
		debuggerSessionLimitEnvironmentShape = {
			[DEBUGGER_MAX_SESSIONS_SETTING]: debuggerMaxSessionsSchema.optional(),
			[DEBUGGER_MAX_PENDING_COMMANDS_SETTING]: debuggerMaxPendingCommandsSchema.optional()
		};
		RUNTIME_DEBUGGER_OVERRIDES = {
			[DEBUGGER_COMMAND_DEADLINE_SETTING]: "debugger.command_deadline_ms",
			[DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING]: "debugger.max_command_output_bytes"
		};
		parseOne = (admission, schema, constraint, value) => {
			if (value === undefined) return ok(admission);
			const parsed = schema.safeParse(value);
			if (parsed.success) return ok({
				...admission,
				value: parsed.data,
				source: "setting"
			});
			const override = RUNTIME_DEBUGGER_OVERRIDES[admission.setting];
			if (override !== undefined && currentAnalysisOperationSnapshot()?.overrides[override] !== undefined) return ok(admission);
			return err(new ConfigurationError(constraint, { settings: [{
				setting: admission.setting,
				constraint
			}] }));
		};
		parseDebuggerCommandDeadline = (environment) => parseOne(DEFAULT_DEBUGGER_COMMAND_DEADLINE, debuggerCommandDeadlineMsSchema, debuggerCommandDeadlineConstraint, environment[DEBUGGER_COMMAND_DEADLINE_SETTING]);
		parseDebuggerCommandOutput = (environment) => parseOne(DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_LIMIT, debuggerMaxCommandOutputBytesSchema, debuggerMaxCommandOutputBytesConstraint, environment[DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING]);
		parseDebuggerSessionLimits = (environment) => {
			const commandDeadline = parseDebuggerCommandDeadline(environment);
			const maxSessions = parseOne(DEFAULT_DEBUGGER_MAX_SESSIONS_LIMIT, debuggerMaxSessionsSchema, debuggerMaxSessionsConstraint, environment[DEBUGGER_MAX_SESSIONS_SETTING]);
			const maxPendingCommands = parseOne(DEFAULT_DEBUGGER_MAX_PENDING_COMMANDS_LIMIT, debuggerMaxPendingCommandsSchema, debuggerMaxPendingCommandsConstraint, environment[DEBUGGER_MAX_PENDING_COMMANDS_SETTING]);
			const maxCommandOutputBytes = parseDebuggerCommandOutput(environment);
			const settings = [
				commandDeadline,
				maxSessions,
				maxPendingCommands,
				maxCommandOutputBytes
			].flatMap((result) => result.ok ? [] : result.error.settings);
			if (settings.length > 0 || !commandDeadline.ok || !maxSessions.ok || !maxPendingCommands.ok || !maxCommandOutputBytes.ok) return err(new ConfigurationError("Invalid REA environment configuration", { settings }));
			return ok({
				commandDeadline: commandDeadline.value,
				maxSessions: maxSessions.value,
				maxPendingCommands: maxPendingCommands.value,
				maxCommandOutputBytes: maxCommandOutputBytes.value
			});
		};
		RUNTIME_DEBUGGER_SETTINGS = new Set([DEBUGGER_COMMAND_DEADLINE_SETTING, DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING]);
		debuggerConstructionLimits = (environment) => {
			const parsed = parseDebuggerSessionLimits(environment);
			if (parsed.ok) return parsed.value;
			const blockers = parsed.error.settings.filter((setting) => !RUNTIME_DEBUGGER_SETTINGS.has(setting.setting));
			if (blockers.length > 0) throw parsed.error;
			const startup = { ...environment };
			delete startup[DEBUGGER_COMMAND_DEADLINE_SETTING];
			delete startup[DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING];
			const again = parseDebuggerSessionLimits(startup);
			if (!again.ok) throw again.error;
			return again.value;
		};
		debuggerControlReplyOutput = {
			setting: "debugger control-reply budget",
			value: DEBUGGER_CONTROL_REPLY_BYTES,
			source: "default",
			defaultValue: DEBUGGER_CONTROL_REPLY_BYTES,
			minimum: DEBUGGER_CONTROL_REPLY_BYTES,
			maximum: DEBUGGER_CONTROL_REPLY_BYTES,
			unit: "bytes"
		};
	})))();
}

//#endregion
export { DEBUGGER_COMMAND_DEADLINE_SETTING, DEBUGGER_MAX_COMMAND_OUTPUT_BYTES_SETTING, debuggerCommandDeadlineMsSchema, debuggerConstructionLimits, debuggerControlReplyOutput, debuggerMaxCommandOutputBytesSchema, debuggerSessionLimitEnvironmentShape, init_debuggerSessionLimits, parseDebuggerCommandDeadline, parseDebuggerCommandOutput };