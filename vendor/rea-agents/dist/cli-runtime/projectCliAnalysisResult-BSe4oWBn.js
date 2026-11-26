import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisSettingDefinitions, recordedControlSchemas } from "./jsonSerialization-DAF9DVXC.js";
import { cliCommandForOperation, init_commandRegistry } from "./commandRegistry-DHcPW-cJ.js";

//#region dist/cli/projectCliAnalysisResult.js
var projectCliAnalysisResult, isObject, orderedOperations, projectCliInputFields, projectCliCommandOutput, projectErrorRecord, projectedSecondaryFailures, relatedCliFlagsFromOperations, relatedCliCommands, renamedIssues, limitParameter, cliFlagForFlags, cliFlagFor, cliFlagForOperations, flaggedLimit, WRAPPER_TYPES, schemaDef, enteredChildren, controlReach, visitControlReach, reachesRecordedControl, cannotSatisfy, producedUnionOption, recordedControlValues, failurePartialObservation, cliResultControlsIn;
function init_projectCliAnalysisResult() {
	return (init_projectCliAnalysisResult = __esmMin((() => {
		init_analysisSettingDefinitions();
		init_commandRegistry();
		projectCliAnalysisResult = (result) => result.ok ? result.value : result.error;
		isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
		orderedOperations = (operations, errorOperation) => {
			if (typeof errorOperation !== "string" || operations.length <= 1) return operations;
			const matching = operations.filter(({ name }) => name === errorOperation);
			if (matching.length === 0) return operations;
			return [...matching, ...operations.filter(({ name }) => name !== errorOperation)];
		};
		projectCliInputFields = (output, binding) => {
			const error = output;
			if (!isObject(error) || typeof error.code !== "string" || !isObject(error.details)) return output;
			const operations = binding.operations === undefined ? [{
				name: binding.operation,
				flags: binding.flags
			}] : orderedOperations(binding.operations, error.details.operation);
			const issues = renamedIssues(error, error.details, binding);
			const limit = flaggedLimit(error.details.limit, operations);
			const relatedFlags = binding.operations === undefined && error.details.operation !== binding.operation ? undefined : relatedCliFlagsFromOperations(error.details, operations);
			if (issues === undefined && limit === undefined && relatedFlags === undefined) return output;
			return {
				...error,
				details: {
					...error.details,
					...issues === undefined ? {} : { issues },
					...limit === undefined ? {} : { limit },
					...relatedFlags === undefined ? {} : { related_cli_flags: relatedFlags }
				}
			};
		};
		projectCliCommandOutput = (output, context) => {
			const candidate = output;
			if (!isObject(candidate)) return output;
			if (typeof candidate.code === "string" && isObject(candidate.details)) return projectErrorRecord(candidate, context);
			if (isObject(candidate.error) && typeof candidate.error.code === "string" && isObject(candidate.error.details)) {
				const nested = projectErrorRecord(candidate.error, context);
				return nested === candidate.error ? output : {
					...candidate,
					error: nested
				};
			}
			return output;
		};
		projectErrorRecord = (error, context) => {
			const { details } = error;
			if (!isObject(details)) return error;
			const operations = orderedOperations(context.operations, details.operation);
			const limit = isObject(details.limit) && Object.hasOwn(details.limit, "cli_flag") ? undefined : flaggedLimit(details.limit, operations);
			const relatedFlags = Object.hasOwn(details, "related_cli_flags") ? undefined : relatedCliFlagsFromOperations(details, operations);
			const relatedCommands = Object.hasOwn(details, "related_cli_commands") ? undefined : relatedCliCommands(details, context);
			const secondaryFailures = projectedSecondaryFailures(details.secondary_failures, context);
			if (limit === undefined && relatedFlags === undefined && relatedCommands === undefined && secondaryFailures === undefined) return error;
			return {
				...error,
				details: {
					...details,
					...limit === undefined ? {} : { limit },
					...relatedFlags === undefined ? {} : { related_cli_flags: relatedFlags },
					...relatedCommands === undefined ? {} : { related_cli_commands: relatedCommands },
					...secondaryFailures === undefined ? {} : { secondary_failures: secondaryFailures }
				}
			};
		};
		projectedSecondaryFailures = (secondary, context) => {
			if (!Array.isArray(secondary) || secondary.length === 0) return undefined;
			let changed = false;
			const mapped = secondary.map((item) => {
				if (!isObject(item) || typeof item.code !== "string") return item;
				const next = projectErrorRecord(item, context);
				if (next !== item) changed = true;
				return next;
			});
			return changed ? mapped : undefined;
		};
		relatedCliFlagsFromOperations = (details, operations) => {
			if (!Array.isArray(details.related_parameters) || operations.length === 0) return undefined;
			const flags = {};
			for (const parameter of details.related_parameters) {
				if (typeof parameter !== "string") continue;
				const flag = cliFlagForOperations(parameter, operations);
				if (flag !== undefined) flags[parameter] = flag;
			}
			return Object.keys(flags).length === 0 ? undefined : flags;
		};
		relatedCliCommands = (details, context) => {
			if (!Array.isArray(details.related_operations)) return undefined;
			const cliName = context.cliName ?? "rea";
			const commands = {};
			for (const operation of details.related_operations) {
				if (typeof operation !== "string") continue;
				const command = cliCommandForOperation(operation, context.commands, cliName, context.recordedCommands);
				if (command !== undefined) commands[operation] = command;
			}
			return Object.keys(commands).length === 0 ? undefined : commands;
		};
		renamedIssues = (error, details, binding) => {
			if (details.operation !== binding.operation || !Array.isArray(details.issues) || error.code !== "invalid_request" && !(error.code === "cleanup_incomplete" && details.execution_failure === "invalid_request")) return undefined;
			let changed = false;
			const issues = details.issues.map((issue) => {
				if (!isObject(issue) || !Array.isArray(issue.path)) return issue;
				const field = issue.path[0];
				if (typeof field !== "string" || !Object.hasOwn(binding.fields, field)) return issue;
				const alias = binding.fields[field];
				if (alias === undefined || alias === field) return issue;
				changed = true;
				return {
					...issue,
					path: [alias, ...issue.path.slice(1)]
				};
			});
			return changed ? issues : undefined;
		};
		limitParameter = (limit) => isObject(limit) && typeof limit.parameter === "string" && (limit.control_kind === "parameter" || typeof limit.setting === "string") ? limit.parameter : undefined;
		cliFlagForFlags = (parameter, flags) => {
			const segments = parameter.split(".");
			for (let length = segments.length; length > 0; length -= 1) {
				const flag = flags[segments.slice(0, length).join(".")];
				if (flag !== undefined) return flag;
			}
			return undefined;
		};
		cliFlagFor = (parameter, binding) => cliFlagForFlags(parameter, binding.flags);
		cliFlagForOperations = (parameter, operations) => {
			for (const operation of operations) {
				const flag = cliFlagForFlags(parameter, operation.flags);
				if (flag !== undefined) return flag;
			}
			return undefined;
		};
		flaggedLimit = (limit, operations) => {
			const parameter = limitParameter(limit);
			const flag = parameter === undefined ? undefined : cliFlagForOperations(parameter, operations);
			return flag === undefined || !isObject(limit) ? undefined : {
				...limit,
				cli_flag: flag
			};
		};
		WRAPPER_TYPES = new Set([
			"optional",
			"nonoptional",
			"nullable",
			"default",
			"prefault",
			"readonly",
			"catch"
		]);
		schemaDef = (node) => node._zod.def;
		enteredChildren = (def) => {
			if (WRAPPER_TYPES.has(def.type)) return [def.innerType];
			if (def.type === "pipe") return [def.out];
			if (def.type === "union") return def.options;
			if (def.type === "array") return [def.element];
			if (def.type === "object") return Object.values(def.shape);
			return [];
		};
		controlReach = new WeakMap();
		visitControlReach = (node, visiting) => {
			const known = controlReach.get(node);
			if (known !== undefined) return {
				reaches: known,
				lowest: Infinity
			};
			const active = visiting.get(node);
			if (active !== undefined) return {
				reaches: false,
				lowest: active
			};
			if (recordedControlSchemas.has(node)) {
				controlReach.set(node, true);
				return {
					reaches: true,
					lowest: Infinity
				};
			}
			const depth = visiting.size;
			visiting.set(node, depth);
			let lowest = Infinity;
			let reaches = false;
			for (const child of enteredChildren(schemaDef(node))) {
				const visited = visitControlReach(child, visiting);
				lowest = Math.min(lowest, visited.lowest);
				if (visited.reaches) {
					reaches = true;
					break;
				}
			}
			visiting.delete(node);
			if (reaches || lowest >= depth) controlReach.set(node, reaches);
			return {
				reaches,
				lowest: reaches ? Infinity : lowest
			};
		};
		reachesRecordedControl = (node) => visitControlReach(node, new Map()).reaches;
		cannotSatisfy = (value, option) => {
			const def = schemaDef(option);
			if (def.type === "union") return def.options.every((nested) => cannotSatisfy(value, nested));
			if (def.type !== "object") return false;
			if (value === null || typeof value !== "object" || Array.isArray(value)) return true;
			const record = value;
			const shape = def.shape;
			const strict = def.catchall?._zod.def.type === "never";
			const literals = Object.entries(option._zod.propValues ?? {});
			return Object.entries(shape).some(([key, field]) => field._zod.optin === undefined && !Object.hasOwn(record, key)) || strict && Object.keys(record).some((key) => !Object.hasOwn(shape, key)) || literals.some(([key, values]) => !values.has(record[key]));
		};
		producedUnionOption = (value, options) => {
			const possible = options.filter((option) => !cannotSatisfy(value, option));
			if (possible.length === 1) return reachesRecordedControl(possible[0]) ? possible[0] : undefined;
			const last = possible.findLastIndex(reachesRecordedControl);
			for (const option of possible.slice(0, last + 1)) if (option.safeParse(value).success) return reachesRecordedControl(option) ? option : undefined;
			return undefined;
		};
		recordedControlValues = (output, schema) => {
			const found = [];
			const pending = [[output, schema]];
			while (pending.length > 0) {
				const [value, node] = pending.pop();
				if (value === undefined || !reachesRecordedControl(node)) continue;
				if (recordedControlSchemas.has(node)) {
					if (node.safeParse(value).success) found.push(value);
					continue;
				}
				const def = schemaDef(node);
				if (WRAPPER_TYPES.has(def.type)) {
					pending.push([value, def.innerType]);
				} else if (def.type === "pipe") {
					pending.push([value, def.out]);
				} else if (def.type === "union") {
					const option = producedUnionOption(value, def.options);
					if (option !== undefined) pending.push([value, option]);
				} else if (def.type === "array" && Array.isArray(value)) {
					for (const item of value) pending.push([item, def.element]);
				} else if (def.type === "object" && value !== null && typeof value === "object" && !Array.isArray(value)) {
					const shape = def.shape;
					const record = value;
					for (const [key, field] of Object.entries(shape)) if (Object.hasOwn(record, key)) pending.push([record[key], field]);
				}
			}
			return found;
		};
		failurePartialObservation = (output, operation) => {
			const failure = output;
			if (!isObject(failure) || !isObject(failure.details)) return undefined;
			const partial = failure.details.partial_observation;
			return isObject(partial) && partial.operation === operation ? partial : undefined;
		};
		cliResultControlsIn = (output, schema, binding) => {
			const controls = {};
			for (const value of recordedControlValues(output, schema)) {
				const parameter = limitParameter(value);
				const flag = parameter === undefined ? undefined : cliFlagFor(parameter, binding);
				if (parameter !== undefined && flag !== undefined) controls[parameter] = flag;
			}
			return controls;
		};
	})))();
}

//#endregion
export { cliResultControlsIn, failurePartialObservation, init_projectCliAnalysisResult, isObject, projectCliAnalysisResult, projectCliCommandOutput, projectCliInputFields };