import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_analysisResourceLimits, init_coverage, init_jsonValue, init_localPath, jsonValueSchema, knownCoverageStatusSchema, timerDurationMsSchema } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/firmware/firmwareAnalysis.js
var bytes, range, DEFAULT_FIRMWARE_ANALYSIS_TIMEOUT_MS, MAX_FIRMWARE_STAGING_BYTES, MAX_FIRMWARE_STAGING_ENTRIES, MAX_FIRMWARE_EXTRACTION_DEPTH, target, firmwareInputSchemas, firmwareRequestSchema, engine, firmwareExecutionBudgetSchema, selection, chunk, extractionGap, firmwareResultSchemas;
function init_firmwareAnalysis() {
	return (init_firmwareAnalysis = __esmMin((() => {
		init_analysisResourceLimits();
		init_coverage();
		init_digests();
		init_jsonValue();
		init_localPath();
		bytes = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
		range = z.strictObject({
			offset: bytes,
			length: bytes.positive()
		});
		DEFAULT_FIRMWARE_ANALYSIS_TIMEOUT_MS = 12e4;
		MAX_FIRMWARE_STAGING_BYTES = 512 * 1024 * 1024;
		MAX_FIRMWARE_STAGING_ENTRIES = 1e5;
		MAX_FIRMWARE_EXTRACTION_DEPTH = 10;
		target = {
			path: absoluteLocalPathStringSchema.describe("Absolute local firmware file; never executed. Relative paths are rejected."),
			analysis_timeout_ms: timerDurationMsSchema.optional().describe("Analysis wall-clock budget in milliseconds (default 120000), from tool resolution through inspection and its final workspace cleanup, or extraction through inventory. Excludes queue admission and extraction publication. Does not raise fixed CPU, memory or byte limits.")
		};
		firmwareInputSchemas = {
			inspect_firmware_regions: z.strictObject(target),
			extract_firmware: z.strictObject({
				...target,
				output_directory: absoluteLocalPathStringSchema.describe("Absolute, absent output directory; parent must exist"),
				range: range.optional().describe("Explicit file-byte interval; omit to extract the whole file"),
				max_depth: z.number().int().min(1).max(10).default(3).describe("Extraction depth; reaching it yields partial analysis"),
				max_output_bytes: z.number().int().min(1).max(MAX_FIRMWARE_STAGING_BYTES).default(256 * 1024 * 1024).describe("Staging file-byte budget, checked during extraction; transient overshoot is possible"),
				max_output_files: z.number().int().min(1).max(MAX_FIRMWARE_STAGING_ENTRIES).default(1e4).describe("Staging entry budget, including directories and links"),
				publication_timeout_ms: timerDurationMsSchema.default(12e4).describe("Publication and final cleanup budget in milliseconds, started after extraction and inventory; increase for a slow destination")
			})
		};
		firmwareRequestSchema = z.discriminatedUnion("operation", [z.strictObject({
			operation: z.literal("inspect_firmware_regions"),
			input: firmwareInputSchemas.inspect_firmware_regions
		}), z.strictObject({
			operation: z.literal("extract_firmware"),
			input: firmwareInputSchemas.extract_firmware
		})]);
		engine = z.strictObject({
			name: z.string(),
			version: z.string(),
			executable_path: z.string(),
			executable_sha256: digestSchema,
			source_revision: z.null(),
			worker_count: z.literal(1)
		});
		firmwareExecutionBudgetSchema = z.object({ analysis_timeout_ms: timerDurationMsSchema.describe("Actual analysis phase budget in milliseconds") });
		selection = z.strictObject({
			...range.shape,
			sha256: digestSchema
		});
		chunk = z.strictObject({
			input_path: z.string(),
			provider_id: z.string(),
			range,
			handler: z.string().nullable(),
			encrypted: z.boolean().nullable(),
			root_file_range: range.nullable(),
			/** The producer reported an extraction error or missing dependency for this chunk. */
			extraction_failed: z.boolean()
		});
		extractionGap = z.strictObject({
			kind: z.enum([
				"missing-extractor-dependency",
				"unknown-chunk-handler",
				"unclassified-range",
				"encrypted-chunk",
				"depth-limited",
				"extractor-failure",
				"unpublished-entry"
			]),
			/** Logical task path from the producer report; `$output/…` for unpublished entries. */
			input_path: z.string(),
			relative_path: z.string().nullable(),
			handler: z.string().nullable(),
			/** Reported chunk or multi-file stage identity; it does not imply a byte range. */
			provider_id: z.string().nullable(),
			range: range.nullable(),
			root_file_range: range.nullable(),
			/** Extractor executables named by the producer; empty when it named none. */
			dependencies: z.array(z.string()),
			/** Lookup key in the result's extraction_continuations table. */
			continuation_id: z.string()
		});
		firmwareResultSchemas = {
			inspect_firmware_regions: z.strictObject({
				...firmwareExecutionBudgetSchema.shape,
				engine,
				input_size: bytes,
				regions: z.array(z.strictObject({
					provider_id: z.string(),
					offset: bytes,
					reported_size: bytes,
					signature: z.string(),
					description: z.string(),
					reported_confidence: z.number().int().min(0).max(255),
					size_basis: z.literal("provider_reported_validation_unknown")
				})),
				coverage: z.literal("signature_scan")
			}),
			extract_firmware: z.strictObject({
				...firmwareExecutionBudgetSchema.shape,
				engine,
				selection,
				output_directory: z.string(),
				coverage: knownCoverageStatusSchema,
				files: z.array(z.strictObject({
					relative_path: z.string(),
					path: z.string(),
					size: bytes,
					sha256: digestSchema,
					reported_sha256: digestSchema.nullable(),
					mime_type: z.string().nullable(),
					analysis_depth: bytes.nullable(),
					runtime_address: z.null(),
					original_file_range: z.null()
				})),
				unpublished_entries: z.array(z.strictObject({
					relative_path: z.string(),
					kind: z.enum(["symlink", "special"]),
					link_target: z.string().nullable(),
					link_target_hex: z.string().regex(/^(?:[0-9a-f]{2})*$/u).optional()
				})),
				chunks: z.array(chunk),
				derivations: z.array(z.strictObject({
					parent_path: z.string(),
					child_path: z.string(),
					provider_blob_id: z.string(),
					handler: z.string().nullable(),
					parent_file_range: range.nullable()
				})),
				depth_limited_paths: z.array(z.string()),
				diagnostics: z.array(jsonValueSchema),
				extraction_gaps: z.array(extractionGap),
				/** Each distinct recovery instruction is serialized once, shared by gap ID. */
				extraction_continuations: z.array(z.strictObject({
					id: z.string(),
					instruction: z.string()
				})),
				published_bytes: bytes
			})
		};
	})))();
}

//#endregion
//#region dist/contracts/firmware/firmwareToolRequirements.js
var defineToolRequirement, FIRMWARE_TOOL_REQUIREMENTS, FIRMWARE_OPERATION_ENGINES;
function init_firmwareToolRequirements() {
	return (init_firmwareToolRequirements = __esmMin((() => {
		defineToolRequirement = (release) => {
			const [major, minor, patch] = release.version;
			const version = `${major}.${minor}.${patch}`;
			const line = `${major}.${minor}.x`;
			return {
				...release,
				version,
				major,
				minor,
				line,
				requirement: `${release.name} ${line} (verified with ${version})`
			};
		};
		FIRMWARE_TOOL_REQUIREMENTS = {
			binwalk: defineToolRequirement({
				name: "Binwalk",
				commandEnvironment: "REA_BINWALK_COMMAND",
				version: [
					3,
					1,
					0
				],
				revision: "4fdab3d464d97b68e0af9088df3f9e2e1545b21c",
				repository: "https://github.com/ReFirmLabs/binwalk"
			}),
			unblob: defineToolRequirement({
				name: "Unblob",
				commandEnvironment: "REA_UNBLOB_COMMAND",
				version: [
					26,
					6,
					4
				],
				revision: "1fcc7a0a584a70a96c31f5a276c20944d199a089",
				repository: "https://github.com/onekey-sec/unblob"
			})
		};
		FIRMWARE_OPERATION_ENGINES = {
			inspect_firmware_regions: "binwalk",
			extract_firmware: "unblob"
		};
	})))();
}

//#endregion
//#region dist/contracts/firmware/firmwareToolContracts.js
var FIRMWARE_TOOL_CONTRACTS;
function init_firmwareToolContracts() {
	return (init_firmwareToolContracts = __esmMin((() => {
		init_firmwareAnalysis();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		init_firmwareToolRequirements();
		FIRMWARE_TOOL_CONTRACTS = [{
			name: "inspect_firmware_regions",
			availability: { host: "firmwareInspection" },
			cli: true,
			...toolContractMetadata("inspect_firmware_regions", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			})),
			kind: "firmware-provider",
			description: `Inspect signature candidates in a local firmware file with ${FIRMWARE_TOOL_REQUIREMENTS[FIRMWARE_OPERATION_ENGINES.inspect_firmware_regions].requirement}. Returns offsets, reported lengths, descriptions and raw confidence values. Length validation and runtime addresses remain unknown. No extraction or target execution. Linux, caller-supplied tool, util-linux prlimit and procps ps required; 128 MiB input limit, one worker. Adjust analysis_timeout_ms for the analysis wall-clock budget (default 120000); fixed per-process limits are unchanged.`,
			inputSchema: firmwareInputSchemas.inspect_firmware_regions,
			outputSchema: evidenceResultOf(firmwareResultSchemas.inspect_firmware_regions),
			examples: [{
				title: "Inspect firmware regions",
				input: { path: "/tmp/firmware.bin" }
			}]
		}, {
			name: "extract_firmware",
			availability: { host: "firmwareExtraction" },
			cli: true,
			...toolContractMetadata("extract_firmware", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true,
				idempotent: false
			})),
			kind: "firmware-provider",
			description: `Extract selected local firmware bytes with ${FIRMWARE_TOOL_REQUIREMENTS[FIRMWARE_OPERATION_ENGINES.extract_firmware].requirement} into an absent output directory. Returns verified child paths/digests, derivations, uncovered ranges, unknown chunks and extraction_gaps with continuation_id recovery instructions. Linux, format-specific extractors, prlimit and procps ps are required. Preserves the sandbox and publishes only regular files; no mounts or extracted-code execution. Select a returned native file with open_binary for analysis. Decompressed offsets are not original-file addresses.`,
			inputSchema: firmwareInputSchemas.extract_firmware,
			outputSchema: evidenceResultOf(firmwareResultSchemas.extract_firmware),
			examples: [{
				title: "Extract selected firmware",
				input: {
					path: "/tmp/firmware.bin",
					output_directory: "/tmp/firmware-output",
					range: {
						offset: 64,
						length: 4096
					}
				}
			}]
		}];
	})))();
}

//#endregion
export { DEFAULT_FIRMWARE_ANALYSIS_TIMEOUT_MS, FIRMWARE_OPERATION_ENGINES, FIRMWARE_TOOL_CONTRACTS, FIRMWARE_TOOL_REQUIREMENTS, MAX_FIRMWARE_STAGING_BYTES, MAX_FIRMWARE_STAGING_ENTRIES, firmwareExecutionBudgetSchema, firmwareRequestSchema, firmwareResultSchemas, init_firmwareAnalysis, init_firmwareToolContracts, init_firmwareToolRequirements };