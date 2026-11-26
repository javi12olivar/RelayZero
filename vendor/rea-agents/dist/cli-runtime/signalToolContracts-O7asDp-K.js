import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_processArgument, processArgumentSchema } from "./processArgument-lxWEHCsa.js";
import { boundedProducerLimitsResultSchema, boundedProducerLimitsSchema, init_producerResourceLimits } from "./urlComponents-DJm-wtqY.js";
import { evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/signals/annotationTextWindow.js
var windowAnnotationText;
function init_annotationTextWindow() {
	return (init_annotationTextWindow = __esmMin((() => {
		windowAnnotationText = (text, offset, limit) => {
			let total = 0;
			let returned = 0;
			let start = text.length;
			let end = text.length;
			for (let from = 0; from < text.length;) {
				const newline = text.indexOf("\n", from);
				const next = newline < 0 ? text.length : newline + 1;
				if (total === offset) start = from;
				if (total >= offset && (limit === null || returned < limit)) {
					end = next;
					returned++;
				}
				total++;
				from = next;
			}
			return {
				annotations_text: start === 0 && end === text.length ? text : Buffer.from(text.slice(start, end), "utf16le").toString("utf16le"),
				output_window: {
					total_lines: total,
					returned_lines: returned,
					has_more: Math.min(offset, total) + returned < total
				}
			};
		};
	})))();
}

//#endregion
//#region dist/domain/signals/signalRecording.js
var selection, signalInputShape, withinSignalRecordingSelectorBudget, signalRecordingSelectorBudgetIssue, signalRecordingSelectionSchema, decodeSignalRecordingInputSchema, signalRecordingSchema;
function init_signalRecording() {
	return (init_signalRecording = __esmMin((() => {
		init_processArgument();
		init_localPath();
		init_annotationTextWindow();
		init_producerResourceLimits();
		selection = processArgumentSchema.min(1).max(8192);
		signalInputShape = z.strictObject({
			producer_limits: boundedProducerLimitsSchema,
			path: localPathStringSchema.describe("Absolute local recording path"),
			decoders: selection.describe("sigrok decoder stack, options and channel assignments, e.g. uart:rx=RX:baudrate=9600"),
			input_format: selection.nullable().default(null).describe("Explicit sigrok input format and options; omitted means autodetection"),
			annotations: selection.nullable().default(null).describe("Optional annotation selection, e.g. uart=rx-data"),
			line_offset: z.number().int().nonnegative().default(0).describe("Skip this many literal LF-separated output lines"),
			line_limit: z.number().int().positive().nullable().default(50).describe("Return at most this many output lines; default 50. Null explicitly returns all remaining lines within producer limits. Lines are not annotation counts.")
		});
		withinSignalRecordingSelectorBudget = (input) => {
			let bytes = 0;
			for (const [value, prefix] of [
				[input.decoders, "--protocol-decoders="],
				[input.input_format, "--input-format="],
				[input.annotations, "--protocol-decoder-annotations="]
			]) if (value !== null) bytes += Buffer.byteLength(prefix, "utf8") + Buffer.byteLength(value, "utf8") + 9;
			return bytes <= 32768;
		};
		signalRecordingSelectorBudgetIssue = { message: "Signal selectors exceed the 32 KiB encoded argument budget; reduce decoder, format or annotation selections." };
		signalRecordingSelectionSchema = signalInputShape.refine(withinSignalRecordingSelectorBudget, signalRecordingSelectorBudgetIssue);
		decodeSignalRecordingInputSchema = signalRecordingSelectionSchema.safeExtend({ path: absoluteLocalPathStringSchema.describe("Absolute local recording path") });
		signalRecordingSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				bytes: z.number().int().nonnegative()
			}),
			selection: signalRecordingSelectionSchema,
			annotations_text: z.string().describe("Selected literal lines of sigrok display output with unchanged sample ranges and line endings; not a lossless binary protocol representation"),
			output_window: z.strictObject({
				total_lines: z.number().int().nonnegative().describe("Literal LF-separated lines in completed producer output, not annotation or sample counts"),
				returned_lines: z.number().int().nonnegative(),
				has_more: z.boolean()
			}),
			diagnostics: z.string(),
			tool: z.strictObject({
				configured_path: z.string(),
				path: z.string(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				version_banner: z.string(),
				version_diagnostics: z.string(),
				arguments: z.array(z.string())
			}),
			resource_limiter: z.strictObject({
				configured_path: z.string(),
				path: z.string(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				arguments: z.array(z.string())
			}),
			limits: boundedProducerLimitsResultSchema,
			hardware_acquisition: z.literal("not-performed")
		}).superRefine((report, context) => {
			const remaining = Math.max(report.output_window.total_lines - report.selection.line_offset, 0);
			const expected = report.selection.line_limit === null ? remaining : Math.min(remaining, report.selection.line_limit);
			if (report.output_window.returned_lines !== expected || windowAnnotationText(report.annotations_text, 0, null).output_window.total_lines !== expected || report.output_window.has_more !== remaining > expected) context.addIssue({
				code: "custom",
				path: ["output_window"],
				message: "Output text and window must agree with examined lines and selected offset/limit"
			});
		});
	})))();
}

//#endregion
//#region dist/domain/signals/signalDecoders.js
var inspectSignalDecodersInputSchema, signalDecodersSchema;
function init_signalDecoders() {
	return (init_signalDecoders = __esmMin((() => {
		init_signalRecording();
		init_producerResourceLimits();
		inspectSignalDecodersInputSchema = z.strictObject({
			producer_limits: boundedProducerLimitsSchema.unwrap().omit({ input_bytes: true }).optional(),
			decoder: z.string().regex(/^[a-zA-Z0-9_+\x2d]+$/u).max(256).nullable().default(null).describe("Exact installed decoder ID for help; null searches the decoder catalog"),
			query: z.string().max(8192).default("").describe("Case-insensitive literal substring in decoder ID/name or help lines; empty selects all"),
			offset: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER).default(0).describe("Number of matching decoders or help lines to skip"),
			limit: z.number().int().positive().max(Number.MAX_SAFE_INTEGER).nullable().default(50).describe("Maximum matching decoders or help lines returned; null requests all remaining")
		});
		signalDecodersSchema = z.strictObject({
			selection: inspectSignalDecodersInputSchema,
			decoders: z.array(z.strictObject({
				id: z.string(),
				name: z.string()
			})),
			help_lines: z.array(z.strictObject({
				line_number: z.number().int().positive(),
				text: z.string()
			})),
			output_window: z.strictObject({
				unit: z.enum(["decoders", "help-lines"]),
				examined: z.number().int().nonnegative(),
				matching: z.number().int().nonnegative(),
				returned: z.number().int().nonnegative(),
				has_more: z.boolean()
			}),
			diagnostics: z.string(),
			tool: signalRecordingSchema.shape.tool,
			resource_limiter: signalRecordingSchema.shape.resource_limiter,
			limits: signalRecordingSchema.shape.limits,
			hardware_acquisition: z.literal("not-performed")
		}).superRefine((report, context) => {
			const w = report.output_window;
			const catalog = report.selection.decoder === null;
			const remaining = Math.max(0, w.matching - report.selection.offset);
			const expected = Math.min(remaining, report.selection.limit ?? remaining);
			if (w.unit !== (catalog ? "decoders" : "help-lines") || w.matching > w.examined || w.returned !== expected || (catalog ? report.decoders : report.help_lines).length !== expected || (catalog ? report.help_lines : report.decoders).length !== 0 || w.has_more !== remaining > expected) context.addIssue({
				code: "custom",
				path: ["output_window"],
				message: "Discovery coverage must match the selected page and result kind"
			});
		});
	})))();
}

//#endregion
//#region dist/contracts/signals/signalToolContracts.js
var SIGNAL_TOOL_CONTRACTS;
function init_signalToolContracts() {
	return (init_signalToolContracts = __esmMin((() => {
		init_signalDecoders();
		init_signalRecording();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		SIGNAL_TOOL_CONTRACTS = [{
			name: "inspect_signal_decoders",
			availability: { host: "signalRecording" },
			cli: true,
			...toolContractMetadata("inspect_signal_decoders", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			})),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "List installed sigrok decoder IDs/names, or supply an exact decoder ID to inspect its channel/option help. Use returned IDs/options with decode_signal_recording. query matches a case-insensitive literal substring; offset/limit pages matches (default 50; null means all remaining). Returns original help lines, coverage and current tool identity. Requires Linux, REA_SIGROK_COMMAND and prlimit. Each call probes again; decoder modules are trusted but not fully fingerprinted. No recording, target, hardware scan or acquisition.",
			inputSchema: inspectSignalDecodersInputSchema,
			outputSchema: evidenceResultOf(signalDecodersSchema),
			examples: [{
				title: "Find installed UART decoders",
				input: { query: "uart" }
			}, {
				title: "Read the installed UART baud-rate option",
				input: {
					decoder: "uart",
					query: "baud"
				}
			}]
		}, {
			name: "decode_signal_recording",
			availability: { host: "signalRecording" },
			cli: true,
			...toolContractMetadata("decode_signal_recording", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			})),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Decode a saved logic/signal recording with an explicitly selected sigrok decoder stack, channels and options. Returns literal text, sample ranges, diagnostics, source/tool identity and coverage. line_offset/line_limit page display lines (default 50; null means all remaining), not annotations or samples; paging does not shorten decoding. Requires Linux, sigrok-cli 0.7.2 through absolute REA_SIGROK_COMMAND, and prlimit. No acquisition or device communication. Empty output does not prove absent traffic.",
			inputSchema: decodeSignalRecordingInputSchema,
			outputSchema: evidenceResultOf(signalRecordingSchema),
			examples: [{
				title: "Decode recorded UART RX bytes",
				input: {
					path: "/artifacts/uart.vcd",
					input_format: "vcd",
					decoders: "uart:rx=RX:baudrate=9600",
					annotations: "uart=rx-data"
				}
			}]
		}];
	})))();
}

//#endregion
export { SIGNAL_TOOL_CONTRACTS, decodeSignalRecordingInputSchema, init_annotationTextWindow, init_signalDecoders, init_signalRecording, init_signalToolContracts, inspectSignalDecodersInputSchema, signalDecodersSchema, signalRecordingSchema, windowAnnotationText };