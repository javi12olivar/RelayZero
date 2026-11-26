import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_processArgument, processArgumentSchema } from "./processArgument-lxWEHCsa.js";
import { boundedProducerLimitsResultSchema, boundedProducerLimitsSchema, init_producerResourceLimits } from "./urlComponents-DJm-wtqY.js";
import { fixedTupleSchema, init_fixedTupleSchema } from "./relationshipCoverage-2rn3-vch.js";
import { evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/captures/packetCapture.js
var argument, MAX_TSHARK_PACKET_COUNT, captureInputShape, withinPacketCaptureSelectorBudget, packetCaptureSelectorBudgetIssue, packetCaptureSelectionSchema, inspectPacketCaptureInputSchema, packetFieldsSchema, packetCaptureSchema;
function init_packetCapture() {
	return (init_packetCapture = __esmMin((() => {
		init_processArgument();
		init_fixedTupleSchema();
		init_producerResourceLimits();
		init_localPath();
		argument = processArgumentSchema.min(1).max(8192);
		MAX_TSHARK_PACKET_COUNT = 2147483647;
		captureInputShape = z.strictObject({
			producer_limits: boundedProducerLimitsSchema,
			path: localPathStringSchema.describe("Absolute local capture path"),
			fields: z.array(argument).max(1024).min(1).describe("TShark field names to return, e.g. ip.addr, usb.endpoint_address, btatt.opcode; frame.number is always included"),
			display_filter: argument.nullable().default(null).describe("Optional Wireshark display filter (-Y), applied within the read limit"),
			decode_as: z.array(argument).max(1024).default([]).describe("Explicit TShark decode-as selections, e.g. tcp.port==8888,http"),
			packet_limit: z.number().int().positive().max(MAX_TSHARK_PACKET_COUNT).nullable().default(null).describe("Maximum input packets to read before filtering; omitted scans to EOF within resource limits"),
			two_pass: z.boolean().default(true).describe("Use two-pass analysis for fields requiring later packets; false requests a single pass"),
			match_offset: z.number().int().nonnegative().default(0).describe("Skip this many matching packets after filtering"),
			match_limit: z.number().int().positive().nullable().default(50).describe("Return at most this many matching packets after filtering; default 50. Null explicitly returns all remaining matches within producer resource limits.")
		});
		withinPacketCaptureSelectorBudget = (input) => {
			if (input.fields.length > 1024 || input.decode_as.length > 1024) return false;
			let bytes = 0;
			for (const selections of [input.fields, input.decode_as]) for (const value of selections) {
				bytes += Buffer.byteLength(value, "utf8") + 20;
				if (bytes > 32768) return false;
			}
			if (input.display_filter !== null) bytes += Buffer.byteLength(input.display_filter, "utf8") + 20;
			return bytes <= 32768;
		};
		packetCaptureSelectorBudgetIssue = { message: "Packet selectors exceed the 32 KiB encoded argument budget; reduce fields, decode-as rules or filter text." };
		packetCaptureSelectionSchema = captureInputShape.refine(withinPacketCaptureSelectorBudget, packetCaptureSelectorBudgetIssue);
		inspectPacketCaptureInputSchema = packetCaptureSelectionSchema.safeExtend({ path: absoluteLocalPathStringSchema.describe("Absolute local capture path") });
		packetFieldsSchema = z.object({ "frame.number": fixedTupleSchema([z.string().regex(/^[1-9][0-9]*$/)]) }).catchall(z.array(z.string()));
		packetCaptureSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				bytes: z.number().int().nonnegative()
			}),
			selection: packetCaptureSelectionSchema,
			packets: z.array(packetFieldsSchema),
			output_window: z.strictObject({
				matching_packets: z.number().int().nonnegative().describe("Matches in the completed producer output within the indicated input read scope, not total capture packets"),
				returned_packets: z.number().int().nonnegative(),
				has_more: z.boolean()
			}),
			read_scope: z.enum(["to-eof", "up-to-input-packet-limit"]),
			diagnostics: z.string(),
			tool: z.strictObject({
				configured_path: z.string(),
				selection_source: z.enum(["environment", "path"]).describe("Whether REA_TSHARK_COMMAND selected the tool or PATH located it"),
				path: z.string(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				version_banner: z.string(),
				version_diagnostics: z.string(),
				arguments: z.array(z.string())
			}),
			configuration: z.literal("private-empty-personal-profile"),
			resource_limiter: z.strictObject({
				configured_path: z.string(),
				path: z.string(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				arguments: z.array(z.string())
			}),
			limits: boundedProducerLimitsResultSchema,
			hardware_acquisition: z.literal("not-performed")
		}).superRefine((report, context) => {
			const remaining = Math.max(report.output_window.matching_packets - report.selection.match_offset, 0);
			const expected = report.selection.match_limit === null ? remaining : Math.min(remaining, report.selection.match_limit);
			if (report.packets.length !== expected || report.output_window.returned_packets !== expected || report.output_window.has_more !== remaining > expected) context.addIssue({
				code: "custom",
				path: ["output_window"],
				message: "Returned packet window must match examined matches and caller-selected offset/limit"
			});
		});
	})))();
}

//#endregion
//#region dist/domain/captures/packetFields.js
var inspectPacketFieldsInputSchema, packetFieldRecordSchema, packetFieldsCatalogSchema;
function init_packetFields() {
	return (init_packetFields = __esmMin((() => {
		init_packetCapture();
		init_producerResourceLimits();
		inspectPacketFieldsInputSchema = z.strictObject({
			producer_limits: boundedProducerLimitsSchema.unwrap().omit({ input_bytes: true }).optional().describe("Per-call producer budgets; defaults match packet capture except output_bytes defaults to 32 MiB for the complete field glossary. No capture input is read. Tighter inherited OS limits still win; no restart. Does not raise the separate parsed-record budget."),
			kind: z.enum(["protocols", "fields"]).default("protocols").describe("Return protocol registrations or field definitions"),
			protocol: z.string().min(1).max(8192).nullable().default(null).describe("Exact protocol abbreviation; selects that protocol or its registered fields"),
			query: z.string().max(8192).default("").describe("Case-insensitive literal substring in name, abbreviation or field description"),
			offset: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER).default(0).describe("Number of matching records to skip"),
			limit: z.number().int().positive().max(Number.MAX_SAFE_INTEGER).nullable().default(50).describe("Maximum matches returned; null requests all remaining within the record budget")
		});
		packetFieldRecordSchema = z.strictObject({
			source_line: z.number().int().positive(),
			kind: z.enum(["protocol", "field"]),
			name: z.string(),
			abbreviation: z.string(),
			field_type: z.string().nullable(),
			parent_protocol: z.string().nullable(),
			display_base: z.string().nullable(),
			bitmask: z.string().nullable(),
			description: z.string().nullable()
		});
		packetFieldsCatalogSchema = z.strictObject({
			selection: inspectPacketFieldsInputSchema,
			records: z.array(packetFieldRecordSchema),
			output_window: z.strictObject({
				examined: z.number().int().nonnegative(),
				matching: z.number().int().nonnegative(),
				returned: z.number().int().nonnegative(),
				has_more: z.boolean()
			}),
			diagnostics: z.string(),
			tool: packetCaptureSchema.shape.tool,
			resource_limiter: packetCaptureSchema.shape.resource_limiter,
			limits: packetCaptureSchema.shape.limits.extend({ record_budget_bytes: z.literal(8388608) }),
			configuration: z.literal("private-empty-personal-profile"),
			hardware_acquisition: z.literal("not-performed")
		}).superRefine((report, context) => {
			const w = report.output_window;
			const remaining = Math.max(0, w.matching - report.selection.offset);
			const expected = Math.min(remaining, report.selection.limit ?? remaining);
			if (w.matching > w.examined || w.returned !== expected || report.records.length !== expected || w.has_more !== remaining > expected || report.records.some((row) => row.kind !== (report.selection.kind === "protocols" ? "protocol" : "field"))) context.addIssue({
				code: "custom",
				path: ["output_window"],
				message: "Field discovery coverage must match the selected page and record kind"
			});
		});
	})))();
}

//#endregion
//#region dist/contracts/captures/captureToolContracts.js
var CAPTURE_TOOL_CONTRACTS;
function init_captureToolContracts() {
	return (init_captureToolContracts = __esmMin((() => {
		init_packetFields();
		init_packetCapture();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		CAPTURE_TOOL_CONTRACTS = [{
			name: "inspect_packet_fields",
			availability: { host: "packetCapture" },
			cli: true,
			...toolContractMetadata("inspect_packet_fields", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			})),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Find protocols or field definitions registered in installed TShark 4.x. kind defaults to protocols; use fields with an optional exact protocol abbreviation, then pass selected names to inspect_packet_capture. query is a case-insensitive literal substring. Returns definitions, duplicate registrations, source lines, tool identity and coverage; offset/limit pages matches (default 50; null means all remaining). Requires Linux, prlimit and TShark on PATH or absolute REA_TSHARK_COMMAND. Each call rereads the glossary. No capture/target is needed; registrations describe capabilities, not observed traffic.",
			inputSchema: inspectPacketFieldsInputSchema,
			outputSchema: evidenceResultOf(packetFieldsCatalogSchema),
			examples: [{
				title: "Find USB protocol registrations",
				input: { query: "usb" }
			}, {
				title: "Find the installed USB vendor-ID field",
				input: {
					kind: "fields",
					protocol: "usb",
					query: "idVendor"
				}
			}]
		}, {
			name: "inspect_packet_capture",
			availability: { host: "packetCapture" },
			cli: true,
			...toolContractMetadata("inspect_packet_capture", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			})),
			kind: "artifact-provider",
			requiresActiveTarget: true,
			description: "Extract caller-selected TShark fields from a saved packet capture, with display filters, decode-as rules and pass mode preserved. Returns frame numbers, repeated values, coverage and diagnostics; use inspect_pcap_capture for a prepared endpoint/DNS/TLS/HTTP summary. Defaults to 50 matching frames; match_offset/match_limit page output and null requests all remaining. packet_limit counts input packets before filtering; output paging does not shorten dissection or reassembly. Requires Linux, prlimit and TShark 4.x on PATH or absolute REA_TSHARK_COMMAND. No live capture/device communication; no matches does not prove absence of traffic.",
			inputSchema: inspectPacketCaptureInputSchema,
			outputSchema: evidenceResultOf(packetCaptureSchema),
			examples: [{
				title: "Inspect UDP exchanges in a recording",
				input: {
					path: "/artifacts/device.pcapng",
					fields: [
						"ip.addr",
						"udp.port",
						"data.data"
					],
					display_filter: "udp",
					decode_as: [],
					packet_limit: null,
					two_pass: true
				}
			}]
		}];
	})))();
}

//#endregion
export { CAPTURE_TOOL_CONTRACTS, init_captureToolContracts, init_packetCapture, init_packetFields, inspectPacketCaptureInputSchema, inspectPacketFieldsInputSchema, packetCaptureSchema, packetFieldsCatalogSchema, packetFieldsSchema };