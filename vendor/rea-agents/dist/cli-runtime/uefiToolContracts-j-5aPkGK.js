import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_coverage, init_localPath, knownCoverageStatusSchema, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { UEFI_FIRMWARE_LIMITS, init_uefiLimits } from "./uefiLimits-B1Km845N.js";
import { isAbsolute } from "node:path";
import { z } from "zod";

//#region dist/domain/uefi/uefiFirmwareAnalysis.js
var bytes, range, target, guidSchema, ffsTypeNameSchema, ffsStateFlagSchema, ffsChecksumVerdictSchema, alignmentSchema, uefiSectionTypeNameSchema, uefiCompressionSchema, sourceStream, uefiSectionRecordSchema, uefiFfsFileRecordSchema, firmwareScanLimits, uefiInputSchemas, uefiRequestSchema, parserSchema, entryBasisSchema, uefiVolumeRecordSchema, uefiUnknownRegionSchema, uefiIntegrityRecordSchema, uefiNvramVariableRecordSchema, uefiNvramStoreRecordSchema, uefiResultSchemas;
function init_uefiFirmwareAnalysis() {
	return (init_uefiFirmwareAnalysis = __esmMin((() => {
		init_coverage();
		init_digests();
		init_localPath();
		init_uefiLimits();
		bytes = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
		range = z.strictObject({
			offset: bytes,
			length: bytes.positive()
		});
		target = { path: localPathStringSchema.refine(isAbsolute, { message: "path must be an absolute local firmware image path (for example /tmp/firmware.bin)" }).describe("Absolute local UEFI firmware image; never executed. Relative paths are rejected.") };
		guidSchema = z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u);
		ffsTypeNameSchema = z.enum([
			"raw",
			"freeform",
			"security-core",
			"pei-core",
			"dxe-core",
			"peim",
			"driver",
			"combined-peim-driver",
			"application",
			"smm",
			"firmware-volume-image",
			"combined-smm-dxe",
			"smm-core",
			"mm-standalone",
			"mm-core-standalone",
			"pad",
			"unknown"
		]);
		ffsStateFlagSchema = z.enum([
			"header-construction",
			"header-valid",
			"data-valid",
			"marked-for-update",
			"deleted",
			"header-invalid"
		]);
		ffsChecksumVerdictSchema = z.enum([
			"valid",
			"invalid",
			"pad-file-unchecked",
			"unchecked"
		]);
		alignmentSchema = z.enum([
			"1",
			"16",
			"128",
			"512",
			"1024",
			"4096",
			"32768",
			"65536",
			"131072",
			"262144",
			"524288",
			"1048576",
			"2097152",
			"4194304",
			"8388608",
			"16777216"
		]);
		uefiSectionTypeNameSchema = z.enum([
			"compression",
			"guid-defined",
			"disposable",
			"pe32",
			"pic",
			"te",
			"dxe-depex",
			"version",
			"user-interface",
			"compatibility16",
			"firmware-volume-image",
			"freeform-subtype-guid",
			"raw",
			"pei-depex",
			"mm-depex",
			"unknown"
		]);
		uefiCompressionSchema = z.union([z.strictObject({ kind: z.literal("none") }), z.strictObject({
			kind: z.enum([
				"lzma-custom",
				"lzmaf86",
				"amd-zlib",
				"tiano",
				"efi-standard",
				"unknown-compression",
				"crc32-guided",
				"unknown-guid"
			]),
			guid: guidSchema.nullable(),
			data_offset: bytes,
			attributes: bytes.nullable()
		})]);
		sourceStream = z.string().nullable();
		uefiSectionRecordSchema = z.strictObject({
			logical_path: z.string(),
			parent_logical_path: z.string(),
			source_stream: sourceStream,
			declared_length: bytes,
			truncated: z.boolean(),
			malformed: z.boolean(),
			offset: bytes,
			header_length: bytes,
			length: bytes,
			type_code: bytes,
			type_name: uefiSectionTypeNameSchema,
			sha256: digestSchema,
			compression: uefiCompressionSchema,
			sub_volumes: z.array(z.string())
		});
		uefiFfsFileRecordSchema = z.strictObject({
			source_stream: sourceStream,
			declared_length: bytes,
			offset: bytes,
			header_length: bytes,
			length: bytes,
			guid: guidSchema,
			type_code: bytes,
			type_name: ffsTypeNameSchema,
			attributes: bytes,
			alignment: alignmentSchema,
			state: bytes,
			state_flags: z.array(ffsStateFlagSchema),
			checksum: ffsChecksumVerdictSchema,
			ui_string: z.string().nullable(),
			logical_path: z.string(),
			volume_offset: bytes,
			sha256: digestSchema,
			sections: z.array(uefiSectionRecordSchema)
		});
		firmwareScanLimits = {
			max_depth: z.number().int().min(1).max(UEFI_FIRMWARE_LIMITS.maxDepth).default(UEFI_FIRMWARE_LIMITS.defaultMaxDepth).describe("Nesting depth for sections and volumes inside compressed payloads"),
			max_volumes: z.number().int().min(1).max(UEFI_FIRMWARE_LIMITS.maxVolumes).default(UEFI_FIRMWARE_LIMITS.defaultMaxVolumes).describe("Maximum firmware volumes mapped before partial coverage"),
			max_files: z.number().int().min(1).max(UEFI_FIRMWARE_LIMITS.maxFiles).default(UEFI_FIRMWARE_LIMITS.defaultMaxFiles).describe("Maximum FFS files mapped before partial coverage")
		};
		uefiInputSchemas = {
			inspect_uefi_firmware: z.strictObject({
				...target,
				...firmwareScanLimits
			}),
			extract_uefi_firmware: z.strictObject({
				...target,
				output_directory: localPathStringSchema.refine(isAbsolute, { message: "output_directory must be an absolute local filesystem path" }).describe("Absolute, absent output directory; parent must exist"),
				target: z.discriminatedUnion("kind", [
					z.strictObject({ kind: z.literal("whole-image") }),
					z.strictObject({
						kind: z.literal("volume"),
						offset: bytes,
						source_stream: sourceStream.optional()
					}),
					z.strictObject({
						kind: z.literal("ffs-file"),
						offset: bytes,
						source_stream: sourceStream.optional()
					}),
					z.strictObject({
						kind: z.literal("section"),
						offset: bytes,
						source_stream: sourceStream.optional()
					})
				]).default({ kind: "whole-image" }),
				...firmwareScanLimits,
				max_output_bytes: z.number().int().min(1).max(UEFI_FIRMWARE_LIMITS.maxOutputBytes).default(UEFI_FIRMWARE_LIMITS.defaultMaxOutputBytes).describe("Maximum total bytes of published files"),
				max_output_files: z.number().int().min(1).max(UEFI_FIRMWARE_LIMITS.maxOutputFiles).default(UEFI_FIRMWARE_LIMITS.defaultMaxOutputFiles).describe("Maximum number of published files"),
				include_compressed: z.boolean().default(true).describe("Publish recognized-but-undecodable compressed payloads as raw blobs; decoding gaps stay explicit")
			}),
			inspect_uefi_nvram: z.strictObject({
				...target,
				max_stores: z.number().int().min(1).max(1024).default(64).describe("Maximum AMI NVRAM variable stores reported before coverage turns partial"),
				max_depth: z.number().int().min(1).max(4).default(2).describe("Nesting depth for NVAR chains embedded in variable data (StdDefaults holds one nested chain)")
			})
		};
		uefiRequestSchema = z.discriminatedUnion("operation", [
			z.strictObject({
				operation: z.literal("inspect_uefi_firmware"),
				input: uefiInputSchemas.inspect_uefi_firmware
			}),
			z.strictObject({
				operation: z.literal("extract_uefi_firmware"),
				input: uefiInputSchemas.extract_uefi_firmware
			}),
			z.strictObject({
				operation: z.literal("inspect_uefi_nvram"),
				input: uefiInputSchemas.inspect_uefi_nvram
			})
		]);
		parserSchema = z.strictObject({
			name: z.literal("rea-uefi"),
			version: z.string()
		});
		entryBasisSchema = z.enum([
			"fv-at-zero",
			"amd-psp-first",
			"scanned",
			"unknown"
		]);
		uefiVolumeRecordSchema = z.strictObject({
			source_stream: sourceStream,
			parent_logical_path: z.string().nullable(),
			logical_path: z.string(),
			offset: bytes,
			length: z.number().int().positive(),
			declared_length: bytes,
			depth: z.number().int().min(0),
			parent_offset: bytes.nullable(),
			sha256: digestSchema,
			file_system_guid: guidSchema.nullable(),
			signature: z.literal("_FVH"),
			header_length: bytes,
			attributes: bytes,
			revision: z.number().int().min(0).max(255),
			ext_header_offset: bytes.nullable(),
			block_map: z.array(z.strictObject({
				num_blocks: bytes,
				length: bytes
			})),
			ffs_files: z.array(uefiFfsFileRecordSchema)
		});
		uefiUnknownRegionSchema = z.strictObject({
			source_stream: sourceStream,
			offset: bytes,
			length: z.number().int().positive(),
			sha256: digestSchema.nullable(),
			classification: z.enum([
				"no-fv-magic",
				"unsupported-file-system",
				"erased-ff",
				"erased-00",
				"sparse",
				"unparsed-table",
				"truncated"
			]),
			erasure: z.enum([
				"0xff",
				"0x00",
				"none"
			])
		});
		uefiIntegrityRecordSchema = z.strictObject({
			kind: z.enum([
				"fv-checksum-mismatch",
				"ffs-header-checksum-mismatch",
				"ffs-file-checksum-mismatch",
				"size-truncation",
				"block-map-truncation",
				"guid-parse-failure",
				"declared-length-overflow"
			]),
			logical_path: z.string(),
			source_stream: sourceStream,
			range,
			detail: z.string()
		});
		uefiNvramVariableRecordSchema = z.strictObject({
			offset: bytes,
			name: z.string().nullable(),
			attributes: z.number().int().min(0).max(255),
			next: z.number().int().min(0).max(16777215).describe("Raw record-relative link displacement. 0xffffff marks the end of the link chain."),
			guid_index: z.number().int().min(0).max(255).nullable(),
			guid: guidSchema.nullable(),
			depth: z.number().int().min(0),
			parent_offset: bytes.nullable(),
			data_offset: bytes,
			data_length: bytes,
			data_sha256: digestSchema
		});
		uefiNvramStoreRecordSchema = z.strictObject({
			offset: bytes,
			name: z.string().nullable(),
			variables: z.array(uefiNvramVariableRecordSchema),
			trailing_padding: bytes.nullable()
		});
		uefiResultSchemas = {
			inspect_uefi_firmware: z.strictObject({
				parser: parserSchema,
				input_size: bytes,
				flash_image: z.strictObject({
					sha256: digestSchema,
					size: bytes,
					entry_basis: entryBasisSchema
				}),
				firmware_volumes: z.array(uefiVolumeRecordSchema),
				psp_tables: z.array(z.strictObject({
					offset: bytes,
					length: bytes,
					table_magic: z.enum([
						"$PSP",
						"$PL2",
						"unknown"
					]),
					total_entries: bytes.nullable(),
					entries: z.array(z.strictObject({
						type: bytes.nullable(),
						declared_location: bytes.nullable(),
						declared_location_raw: z.string(),
						address_mode: z.number().int().min(0).max(3),
						declared_size: bytes.nullable(),
						image_offset: bytes.nullable(),
						sha256: digestSchema.nullable(),
						location_basis: z.literal("declared-unverified")
					})),
					entry_stride_basis: z.enum([
						"header-declared",
						"psp-16",
						"unknown"
					])
				})),
				psp_candidates: z.array(z.strictObject({
					offset: bytes,
					magic: z.string(),
					reason: z.string()
				})),
				unknown_regions: z.array(uefiUnknownRegionSchema),
				integrity: z.array(uefiIntegrityRecordSchema),
				coverage: knownCoverageStatusSchema,
				limitations: z.array(z.string())
			}),
			extract_uefi_firmware: z.strictObject({
				parser: parserSchema,
				selection: z.strictObject({
					offset: bytes,
					length: bytes,
					source_stream: sourceStream,
					target_kind: z.enum([
						"whole-image",
						"volume",
						"ffs-file",
						"section"
					])
				}),
				output_directory: z.string(),
				coverage: knownCoverageStatusSchema,
				files: z.array(z.strictObject({
					relative_path: z.string(),
					path: z.string(),
					size: bytes,
					sha256: digestSchema,
					original_file_range: range.nullable(),
					source_stream: sourceStream,
					source_range: range,
					runtime_address: z.null(),
					media_type: z.string().nullable(),
					source: z.enum([
						"raw-section",
						"decompressed-lzma",
						"decompressed-lzmaf86",
						"decompressed-zlib",
						"uncompressed-payload",
						"compressed-passthrough"
					]),
					parent_logical_path: z.string().nullable()
				})),
				derivations: z.array(z.strictObject({
					parent_path: z.string(),
					child_path: z.string().nullable(),
					child_stream: z.string(),
					parent_file_range: range.nullable(),
					parent_stream: sourceStream,
					parent_stream_range: range,
					handler: z.string()
				})),
				extraction_gaps: z.array(z.strictObject({
					kind: z.enum([
						"unsupported-compression",
						"unknown-guid-handler",
						"depth-limited",
						"unparsed-region",
						"size-truncated",
						"pad-file"
					]),
					logical_path: z.string(),
					source_stream: sourceStream,
					range: range.nullable(),
					detail: z.string()
				})),
				diagnostics: z.string(),
				published_bytes: bytes
			}),
			inspect_uefi_nvram: z.strictObject({
				parser: parserSchema,
				input_size: bytes,
				image_sha256: digestSchema,
				stores: z.array(uefiNvramStoreRecordSchema),
				coverage: knownCoverageStatusSchema,
				limitations: z.array(z.string())
			})
		};
	})))();
}

//#endregion
//#region dist/contracts/uefi/uefiToolContracts.js
var UEFI_TOOL_CONTRACTS;
function init_uefiToolContracts() {
	return (init_uefiToolContracts = __esmMin((() => {
		init_uefiFirmwareAnalysis();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		UEFI_TOOL_CONTRACTS = [
			{
				name: "inspect_uefi_firmware",
				cli: true,
				availability: "standalone",
				...toolContractMetadata("inspect_uefi_firmware", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					writesFilesystem: true
				})),
				kind: "firmware-provider",
				description: "Map PI firmware volumes, FFS files, section chains, AMD PSP directory candidates and uncovered ranges in a local flash image. Report integrity observations and coverage limits. LZMA-custom, LZMAF86, and AMD-zlib streams can contain nested volumes or section chains. Decoded offsets are relative to the stream identified by source_stream. EFI standard compression and other unsupported handlers remain explicit limitations.",
				inputSchema: uefiInputSchemas.inspect_uefi_firmware,
				outputSchema: evidenceResultOf(uefiResultSchemas.inspect_uefi_firmware),
				examples: [{
					title: "Inspect firmware volumes",
					input: { path: "/media/firmware/images/B550AORUSELITEV212.FIb" }
				}]
			},
			{
				name: "extract_uefi_firmware",
				cli: true,
				availability: "standalone",
				...toolContractMetadata("extract_uefi_firmware", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					writesFilesystem: true,
					idempotent: false
				})),
				kind: "firmware-provider",
				description: "Extract FFS bodies and section payloads from a local UEFI image into an absent directory. A volume, file or section selection includes its descendants. Use source_stream with an offset from a decoded stream or when offsets are ambiguous. Results include SHA-256, source ranges and decode derivations; original_file_range is null for decoded bytes. Unsupported carriers are optional and decoding gaps remain visible. Pass an extracted PE32 file to open_binary for executable analysis.",
				inputSchema: uefiInputSchemas.extract_uefi_firmware,
				outputSchema: evidenceResultOf(uefiResultSchemas.extract_uefi_firmware),
				examples: [{
					title: "Extract firmware volumes",
					input: {
						path: "/media/firmware/images/B550AORUSELITEV212.FIb",
						output_directory: "/tmp/uefi-output"
					}
				}]
			},
			{
				name: "inspect_uefi_nvram",
				cli: true,
				availability: "standalone",
				...toolContractMetadata("inspect_uefi_nvram", evidenceEffects),
				kind: "firmware-provider",
				description: "Map valid AMI NVAR entries inside a local flash image, including nested factory defaults such as StdDefaults. Reports raw link displacements, attributes, inline GUIDs or GUID-table indices, data ranges and SHA-256 digests. Data-only records have no name or GUID reference. Links describe the image bytes. The parser walks physical records and reports the nesting depth and parent offset. No external tools or target execution are required.",
				inputSchema: uefiInputSchemas.inspect_uefi_nvram,
				outputSchema: evidenceResultOf(uefiResultSchemas.inspect_uefi_nvram),
				examples: [{
					title: "Inspect AMI NVRAM stores",
					input: { path: "/media/firmware/images/B550AORUSELITEV212.FId" }
				}]
			}
		];
	})))();
}

//#endregion
export { UEFI_TOOL_CONTRACTS, init_uefiFirmwareAnalysis, init_uefiToolContracts, uefiRequestSchema, uefiResultSchemas };