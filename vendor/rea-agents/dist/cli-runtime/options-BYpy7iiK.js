import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { declaredTokenPattern, init_schemaConstraints } from "./jsonSerialization-DAF9DVXC.js";
import { OPEN_BINARY_TOOL_CONTRACT, init_sessionToolContracts } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/cli/decimalTokenPattern.js
var digits, digitRange, sameWidthRange, openEndedPattern, decimalTokenPattern;
function init_decimalTokenPattern() {
	return (init_decimalTokenPattern = __esmMin((() => {
		digits = (count) => count === 0 ? "" : count === 1 ? "[0-9]" : `[0-9]{${count}}`;
		digitRange = (low, high) => low === high ? String(low) : `[${low}-${high}]`;
		sameWidthRange = (low, high) => {
			if (low === high) return low;
			const width = low.length;
			if (low === "0".repeat(width) && high === "9".repeat(width)) return digits(width);
			const first = Number(low[0]);
			const last = Number(high[0]);
			if (width === 1) return digitRange(first, last);
			if (low.slice(1) === "0".repeat(width - 1) && high.slice(1) === "9".repeat(width - 1)) return `${digitRange(first, last)}${digits(width - 1)}`;
			if (first === last) return `${first}${sameWidthRange(low.slice(1), high.slice(1))}`;
			const branches = [`${first}${sameWidthRange(low.slice(1), "9".repeat(width - 1))}`];
			if (first + 1 <= last - 1) branches.push(`${digitRange(first + 1, last - 1)}${digits(width - 1)}`);
			branches.push(`${last}${sameWidthRange("0".repeat(width - 1), high.slice(1))}`);
			return `(?:${branches.join("|")})`;
		};
		openEndedPattern = (minimum) => {
			if (minimum === 0) return "^[0-9]+$";
			const low = String(minimum);
			const atFloorWidth = sameWidthRange(low, "9".repeat(low.length));
			return `^0*(?:${atFloorWidth}|[1-9][0-9]{${String(low.length)},})$`;
		};
		decimalTokenPattern = (domain) => {
			const schema = z.toJSONSchema(domain);
			const minimum = Math.max(0, Math.ceil(schema.minimum ?? 0), typeof schema.exclusiveMinimum === "number" ? Math.floor(schema.exclusiveMinimum) + 1 : 0);
			const maximum = Math.min(Math.floor(schema.maximum ?? Infinity), typeof schema.exclusiveMaximum === "number" ? Math.ceil(schema.exclusiveMaximum) - 1 : Infinity);
			if (!Number.isSafeInteger(minimum)) return "^[0-9]+$";
			if (maximum === Infinity) return openEndedPattern(minimum);
			if (!Number.isSafeInteger(maximum)) return "^[0-9]+$";
			if (minimum > maximum) return "^(?!)$";
			const low = String(minimum);
			const high = String(maximum);
			const branches = [];
			for (let width = low.length; width <= high.length; width++) {
				branches.push(sameWidthRange(width === low.length ? low : `1${"0".repeat(width - 1)}`, width === high.length ? high : "9".repeat(width)));
			}
			return `^0*(?:${branches.join("|")})$`;
		};
	})))();
}

//#endregion
//#region dist/cli/options.js
var DECIMAL_INTEGER_TOKEN, decimalToken, unwrapSchema, publishArgvInput, numericStack, applyDecimalWrappers, cliDecimalField, cliDecimalShape, NATIVE_OPEN_HELP, nativeTarget;
function init_options() {
	return (init_options = __esmMin((() => {
		init_schemaConstraints();
		init_decimalTokenPattern();
		init_sessionToolContracts();
		DECIMAL_INTEGER_TOKEN = /^[0-9]+$/u;
		decimalToken = (domain) => declaredTokenPattern(z.string().regex(DECIMAL_INTEGER_TOKEN, "Expected a decimal integer"), new RegExp(decimalTokenPattern(domain), "u")).pipe(z.coerce.number()).pipe(domain);
		unwrapSchema = (field) => field.unwrap();
		publishArgvInput = (field) => {
			const { $schema: _dialect, ...inputSchema } = z.toJSONSchema(field, { io: "input" });
			return field.meta(inputSchema);
		};
		numericStack = (field) => {
			const wrappers = [];
			let description;
			let current = field;
			for (;;) {
				if (description === undefined && current.description !== undefined) description = current.description;
				if (current instanceof z.ZodDefault) {
					wrappers.push({
						kind: "default",
						value: current.parse(undefined)
					});
					current = unwrapSchema(current);
					continue;
				}
				if (current instanceof z.ZodPrefault) {
					wrappers.push({
						kind: "prefault",
						value: current.parse(undefined)
					});
					current = unwrapSchema(current);
					continue;
				}
				if (current instanceof z.ZodOptional) {
					wrappers.push({ kind: "optional" });
					current = unwrapSchema(current);
					continue;
				}
				if (current instanceof z.ZodExactOptional) {
					wrappers.push({ kind: "exactOptional" });
					current = unwrapSchema(current);
					continue;
				}
				if (current instanceof z.ZodNullable) {
					wrappers.push({ kind: "nullable" });
					current = unwrapSchema(current);
					continue;
				}
				if (current instanceof z.ZodReadonly) {
					wrappers.push({ kind: "readonly" });
					current = unwrapSchema(current);
					continue;
				}
				break;
			}
			return current instanceof z.ZodNumber ? {
				core: current,
				wrappers,
				description
			} : undefined;
		};
		applyDecimalWrappers = (field, wrappers) => {
			let admitted = field;
			for (const wrapper of wrappers.toReversed()) {
				if (wrapper.kind === "nullable") admitted = admitted.nullable();
				else if (wrapper.kind === "optional") admitted = admitted.optional();
				else if (wrapper.kind === "exactOptional") admitted = admitted.exactOptional();
				else if (wrapper.kind === "readonly") admitted = admitted.readonly();
				else if (wrapper.kind === "prefault") admitted = admitted.prefault(wrapper.value);
				else if (wrapper.kind === "default") admitted = admitted.default(wrapper.value);
			}
			return admitted;
		};
		cliDecimalField = (field) => {
			const numeric = numericStack(field);
			if (numeric === undefined) throw new Error(`cliDecimalField expected a numeric domain field, received ${field.constructor.name}`);
			const admitted = applyDecimalWrappers(z.union([numeric.core, decimalToken(numeric.core)]), numeric.wrappers);
			const described = numeric.description === undefined ? admitted : admitted.describe(numeric.description);
			return publishArgvInput(described);
		};
		cliDecimalShape = (shape) => Object.fromEntries(Object.entries(shape).map(([key, field]) => [key, numericStack(field) === undefined ? field : cliDecimalField(field)]));
		NATIVE_OPEN_HELP = {
			format: "Explicit interpretation: dos-com or raw-binary (headerless), or gamecube-dol (GameCube/Wii DOL, never auto-detected); omission preserves header-based detection",
			architecture: "Caller-supplied CPU family; required with --target-format raw-binary, must be omitted with gamecube-dol",
			entryPoint: "Caller-supplied load and entry address (0xhex); required with --target-format raw-binary, optional with gamecube-dol (must equal the DOL header entry)",
			provider: "Bind deep analysis to a provider ID or use deterministic auto selection",
			snapshot: "Load and update a local analysis snapshot"
		};
		nativeTarget = (description, snapshot) => ({
			description,
			open: {
				contract: OPEN_BINARY_TOOL_CONTRACT,
				fields: {
					...snapshot === undefined ? {} : { snapshot_path: {
						name: "snapshot",
						callerPath: true,
						description: snapshot === true ? NATIVE_OPEN_HELP.snapshot : snapshot
					} },
					format: {
						name: "target-format",
						values: [
							"dos-com",
							"raw-binary",
							"gamecube-dol"
						],
						description: NATIVE_OPEN_HELP.format
					},
					architecture: { description: NATIVE_OPEN_HELP.architecture },
					entry_point: {
						name: "entry-point",
						description: NATIVE_OPEN_HELP.entryPoint
					},
					provider_id: {
						name: "provider",
						description: NATIVE_OPEN_HELP.provider
					}
				}
			}
		});
	})))();
}

//#endregion
export { cliDecimalField, cliDecimalShape, init_options, nativeTarget, publishArgvInput };