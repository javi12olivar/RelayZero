import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, analysisParameterLimitSchema, canonicalBase64Schema, coverageStatusSchema, init_analysisSettingDefinitions, init_coverage, init_localPath, init_stringPatterns, knownCoverageStatusSchema, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_nativeDeadlines, init_pwntoolsResourceLimits, pwntoolsProducerLimitsField, pwntoolsTimeoutField } from "./urlComponents-DJm-wtqY.js";
import { fixedTupleSchema, init_fixedTupleSchema } from "./relationshipCoverage-2rn3-vch.js";
import { BINARY_ARCHITECTURES, RAW_ONLY_ARCHITECTURES, init_binaryTargetTypes } from "./binaryTargetTypes-CrE-Muhh.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { init_machoTargetSelection, machoSelectionContainsRange, machoSliceArchitectureSchema, machoTargetSelectionSchema, selectedSliceAgreesWithReport } from "./nativeValueTrace-B4vmCxtN.js";
import { ELF_OBJECT_TYPE_NAMES, devicetreeSchema, elfNotesSchema, init_devicetree, init_elfNotes, inspectDevicetreeInputSchema, inspectElfNotesInputSchema } from "./elfNotes-CjzNcaIN.js";
import { binaryLayoutSchema, binaryLayoutSummaryViewResultSchema, devicetreeSummaryViewResultSchema, elfDependenciesSchema, elfDependenciesSummaryViewResultSchema, init_analysisViewResult, init_binaryLayout, init_byteEntropy, init_elfDependencies, init_nativeExports, inspectBinaryLayoutInputSchema, inspectByteEntropyInputSchema, inspectElfDependenciesInputSchema, inspectNativeExportsInputSchema, nativeExportsSchema, nativeExportsSummaryViewResultSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, analysisDetailSchema, byteEntropyOutputSchema, evidenceEffects, evidenceResultOf, init_analysisDetail, init_toolEffects, init_toolOutputSchemaGroups, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { init_keyedCollection, keyedBy, uniqueKeyed } from "./keyedCollection-BoRfT2aE.js";
import { init_peResources, inspectPeResourcesInputSchema, peResourcesSchema } from "./peResources-86rkzSE-.js";
import { z } from "zod";

//#region dist/domain/native/peLoadConfig.js
var uint$10, safeCount, hexVa, range$8, MAX_INSPECT_PE_LOAD_CONFIG_FILE_BYTES, MAX_INSPECT_PE_LOAD_CONFIG_CALLBACKS, TLS_STRUCT_BYTES, inspectPeLoadConfigInputSchema, locatedSchema, directorySchema$1, PE_GUARD_FLAG_NAMES, PE_GUARD_FLAG_BITS, PE_GUARD_FLAG_KNOWN_MASK, GUARD_STRIDE_MASK, PE_LOAD_CONFIG_INFERENCE_IDS, PE_LOAD_CONFIG_INFERENCE_BITS, inferenceSchema, guardFlagRecord, guardFlagsSchema, PE_LOAD_CONFIG_LOCATED_FIELDS, PE_LOAD_CONFIG_COUNT_FIELDS, PE_LOAD_CONFIG_RAW_FIELDS, PE_LOAD_CONFIG_NUMBER_FIELDS, PE32_LOAD_CONFIG_FIELDS, PE64_LOAD_CONFIG_FIELDS, loadConfigFieldLayout, loadConfigFieldCovered, TLS_ALIGNMENT_BYTES, tlsAlignment, tlsSchema, loadConfigSchema, PE_LOAD_CONFIG_LIMITATIONS, peLoadConfigSchema;
function init_peLoadConfig() {
	return (init_peLoadConfig = __esmMin((() => {
		init_digests();
		init_localPath();
		uint$10 = z.number().int().min(0).max(4294967295);
		safeCount = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
		hexVa = z.string().regex(/^0x[0-9a-f]+$/u);
		range$8 = z.strictObject({
			offset: uint$10,
			bytes: uint$10
		});
		MAX_INSPECT_PE_LOAD_CONFIG_FILE_BYTES = 536870912;
		MAX_INSPECT_PE_LOAD_CONFIG_CALLBACKS = 4096;
		TLS_STRUCT_BYTES = {
			32: 24,
			64: 40
		};
		inspectPeLoadConfigInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a PE image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_PE_LOAD_CONFIG_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_callbacks: z.number().int().min(1).max(MAX_INSPECT_PE_LOAD_CONFIG_CALLBACKS).default(64).describe("Maximum non-null TLS callbacks to examine; exceeding the budget fails without partial success")
		});
		locatedSchema = z.strictObject({
			va: hexVa,
			rva: uint$10.nullable(),
			file_offset: uint$10.nullable(),
			section: z.string().min(1).nullable()
		});
		directorySchema$1 = z.strictObject({
			rva: uint$10,
			size: uint$10,
			file_offset: uint$10
		});
		PE_GUARD_FLAG_NAMES = [
			"IMAGE_GUARD_CF_INSTRUMENTED",
			"IMAGE_GUARD_CFW_INSTRUMENTED",
			"IMAGE_GUARD_CF_FUNCTION_TABLE_PRESENT",
			"IMAGE_GUARD_SECURITY_COOKIE_UNUSED",
			"IMAGE_GUARD_PROTECT_DELAYLOAD_IAT",
			"IMAGE_GUARD_DELAYLOAD_IAT_IN_ITS_OWN_SECTION",
			"IMAGE_GUARD_CF_EXPORT_SUPPRESSION_INFO_PRESENT",
			"IMAGE_GUARD_CF_ENABLE_EXPORT_SUPPRESSION",
			"IMAGE_GUARD_CF_LONGJUMP_TABLE_PRESENT",
			"IMAGE_GUARD_RF_INSTRUMENTED",
			"IMAGE_GUARD_RF_ENABLE",
			"IMAGE_GUARD_RF_STRICT",
			"IMAGE_GUARD_RETPOLINE_PRESENT",
			"IMAGE_GUARD_EH_CONTINUATION_TABLE_PRESENT",
			"IMAGE_GUARD_XFG_ENABLED",
			"IMAGE_GUARD_CASTGUARD_PRESENT",
			"IMAGE_GUARD_MEMCPY_PRESENT"
		];
		PE_GUARD_FLAG_BITS = {
			IMAGE_GUARD_CF_INSTRUMENTED: 256,
			IMAGE_GUARD_CFW_INSTRUMENTED: 512,
			IMAGE_GUARD_CF_FUNCTION_TABLE_PRESENT: 1024,
			IMAGE_GUARD_SECURITY_COOKIE_UNUSED: 2048,
			IMAGE_GUARD_PROTECT_DELAYLOAD_IAT: 4096,
			IMAGE_GUARD_DELAYLOAD_IAT_IN_ITS_OWN_SECTION: 8192,
			IMAGE_GUARD_CF_EXPORT_SUPPRESSION_INFO_PRESENT: 16384,
			IMAGE_GUARD_CF_ENABLE_EXPORT_SUPPRESSION: 32768,
			IMAGE_GUARD_CF_LONGJUMP_TABLE_PRESENT: 65536,
			IMAGE_GUARD_RF_INSTRUMENTED: 131072,
			IMAGE_GUARD_RF_ENABLE: 262144,
			IMAGE_GUARD_RF_STRICT: 524288,
			IMAGE_GUARD_RETPOLINE_PRESENT: 1048576,
			IMAGE_GUARD_EH_CONTINUATION_TABLE_PRESENT: 4194304,
			IMAGE_GUARD_XFG_ENABLED: 8388608,
			IMAGE_GUARD_CASTGUARD_PRESENT: 16777216,
			IMAGE_GUARD_MEMCPY_PRESENT: 33554432
		};
		PE_GUARD_FLAG_KNOWN_MASK = PE_GUARD_FLAG_NAMES.reduce((mask, name) => mask | PE_GUARD_FLAG_BITS[name], 0);
		GUARD_STRIDE_MASK = 4026531840;
		PE_LOAD_CONFIG_INFERENCE_IDS = [
			"cfg_instrumented",
			"cf_write_instrumented",
			"rf_instrumented",
			"retpoline_present",
			"xfg_enabled",
			"castguard_present"
		];
		PE_LOAD_CONFIG_INFERENCE_BITS = {
			cfg_instrumented: 256,
			cf_write_instrumented: 512,
			rf_instrumented: 131072,
			retpoline_present: 1048576,
			xfg_enabled: 8388608,
			castguard_present: 16777216
		};
		inferenceSchema = z.strictObject({
			id: z.enum(PE_LOAD_CONFIG_INFERENCE_IDS),
			evidence_kind: z.literal("inferred"),
			basis: z.string().min(1)
		});
		guardFlagRecord = (raw) => ({
			flags: PE_GUARD_FLAG_NAMES.filter((name) => (raw & PE_GUARD_FLAG_BITS[name]) !== 0),
			unrecognized: raw >>> 0 & ~((PE_GUARD_FLAG_KNOWN_MASK | GUARD_STRIDE_MASK) >>> 0),
			cf_function_table_stride: 4 + (raw >>> 28),
			inferences: PE_LOAD_CONFIG_INFERENCE_IDS.filter((id) => (raw & PE_LOAD_CONFIG_INFERENCE_BITS[id]) !== 0).map((id) => ({
				id,
				evidence_kind: "inferred",
				basis: `GuardFlags has ${id} set. That bit is a linker claim; this inspection did not verify the corresponding instructions.`
			}))
		});
		guardFlagsSchema = z.strictObject({
			raw: uint$10,
			flags: z.array(z.enum(PE_GUARD_FLAG_NAMES)),
			unrecognized: uint$10,
			cf_function_table_stride: z.number().int().min(4).max(19)
		});
		PE_LOAD_CONFIG_LOCATED_FIELDS = [
			"security_cookie",
			"se_handler_table",
			"guard_cf_check_function_pointer",
			"guard_cf_dispatch_function_pointer",
			"guard_cf_function_table",
			"guard_address_taken_iat_entry_table",
			"guard_long_jump_target_table",
			"guard_eh_continuation_table",
			"guard_xfg_check_function_pointer"
		];
		PE_LOAD_CONFIG_COUNT_FIELDS = [
			"se_handler_count",
			"guard_cf_function_count",
			"guard_address_taken_iat_entry_count",
			"guard_long_jump_target_count",
			"guard_eh_continuation_count"
		];
		PE_LOAD_CONFIG_RAW_FIELDS = ["dynamic_value_reloc_table", "chpe_metadata_pointer"];
		PE_LOAD_CONFIG_NUMBER_FIELDS = ["dynamic_value_reloc_table_offset", "dynamic_value_reloc_table_section"];
		PE32_LOAD_CONFIG_FIELDS = {
			security_cookie: {
				offset: 60,
				width: 4
			},
			se_handler_table: {
				offset: 64,
				width: 4
			},
			se_handler_count: {
				offset: 68,
				width: 4
			},
			guard_cf_check_function_pointer: {
				offset: 72,
				width: 4
			},
			guard_cf_dispatch_function_pointer: {
				offset: 76,
				width: 4
			},
			guard_cf_function_table: {
				offset: 80,
				width: 4
			},
			guard_cf_function_count: {
				offset: 84,
				width: 4
			},
			guard_flags: {
				offset: 88,
				width: 4
			},
			guard_address_taken_iat_entry_table: {
				offset: 104,
				width: 4
			},
			guard_address_taken_iat_entry_count: {
				offset: 108,
				width: 4
			},
			guard_long_jump_target_table: {
				offset: 112,
				width: 4
			},
			guard_long_jump_target_count: {
				offset: 116,
				width: 4
			},
			dynamic_value_reloc_table: {
				offset: 120,
				width: 4
			},
			chpe_metadata_pointer: {
				offset: 124,
				width: 4
			},
			dynamic_value_reloc_table_offset: {
				offset: 136,
				width: 4
			},
			dynamic_value_reloc_table_section: {
				offset: 140,
				width: 2
			},
			guard_eh_continuation_table: {
				offset: 164,
				width: 4
			},
			guard_eh_continuation_count: {
				offset: 168,
				width: 4
			},
			guard_xfg_check_function_pointer: {
				offset: 172,
				width: 4
			}
		};
		PE64_LOAD_CONFIG_FIELDS = {
			security_cookie: {
				offset: 88,
				width: 8
			},
			se_handler_table: {
				offset: 96,
				width: 8
			},
			se_handler_count: {
				offset: 104,
				width: 8
			},
			guard_cf_check_function_pointer: {
				offset: 112,
				width: 8
			},
			guard_cf_dispatch_function_pointer: {
				offset: 120,
				width: 8
			},
			guard_cf_function_table: {
				offset: 128,
				width: 8
			},
			guard_cf_function_count: {
				offset: 136,
				width: 8
			},
			guard_flags: {
				offset: 144,
				width: 4
			},
			guard_address_taken_iat_entry_table: {
				offset: 160,
				width: 8
			},
			guard_address_taken_iat_entry_count: {
				offset: 168,
				width: 8
			},
			guard_long_jump_target_table: {
				offset: 176,
				width: 8
			},
			guard_long_jump_target_count: {
				offset: 184,
				width: 8
			},
			dynamic_value_reloc_table: {
				offset: 192,
				width: 8
			},
			chpe_metadata_pointer: {
				offset: 200,
				width: 8
			},
			dynamic_value_reloc_table_offset: {
				offset: 224,
				width: 4
			},
			dynamic_value_reloc_table_section: {
				offset: 228,
				width: 2
			},
			guard_eh_continuation_table: {
				offset: 264,
				width: 8
			},
			guard_eh_continuation_count: {
				offset: 272,
				width: 8
			},
			guard_xfg_check_function_pointer: {
				offset: 280,
				width: 8
			}
		};
		loadConfigFieldLayout = (bits, name) => (bits === 32 ? PE32_LOAD_CONFIG_FIELDS : PE64_LOAD_CONFIG_FIELDS)[name];
		loadConfigFieldCovered = (bits, size, name) => {
			if (bits === 64 && (name === "se_handler_table" || name === "se_handler_count")) return false;
			const field = loadConfigFieldLayout(bits, name);
			return size >= field.offset + field.width;
		};
		TLS_ALIGNMENT_BYTES = [
			null,
			1,
			2,
			4,
			8,
			16,
			32,
			64,
			128,
			256,
			512,
			1024,
			2048,
			4096,
			8192,
			null
		];
		tlsAlignment = (characteristics) => TLS_ALIGNMENT_BYTES[characteristics >>> 20 & 15] ?? null;
		tlsSchema = z.strictObject({
			directory: directorySchema$1,
			start_address_of_raw_data: hexVa,
			end_address_of_raw_data: hexVa,
			raw_data_size: uint$10,
			raw_data_file_offset: uint$10.nullable(),
			raw_data_section: z.string().min(1).nullable(),
			address_of_index: locatedSchema,
			address_of_callbacks: hexVa,
			size_of_zero_fill: uint$10,
			characteristics: uint$10,
			alignment: z.number().int().positive().nullable(),
			callbacks: z.array(locatedSchema),
			callback_array_locations: z.array(range$8)
		}).nullable();
		loadConfigSchema = z.strictObject({
			directory: directorySchema$1,
			size: uint$10,
			/** File span of the `Size` bytes checked as file-backed; may exceed `directory`. */
			structure_location: range$8,
			security_cookie: locatedSchema.nullable(),
			se_handler_table: locatedSchema.nullable(),
			se_handler_count: safeCount.nullable(),
			guard_cf_check_function_pointer: locatedSchema.nullable(),
			guard_cf_dispatch_function_pointer: locatedSchema.nullable(),
			guard_cf_function_table: locatedSchema.nullable(),
			guard_cf_function_count: safeCount.nullable(),
			guard_flags: guardFlagsSchema.nullable(),
			guard_address_taken_iat_entry_table: locatedSchema.nullable(),
			guard_address_taken_iat_entry_count: safeCount.nullable(),
			guard_long_jump_target_table: locatedSchema.nullable(),
			guard_long_jump_target_count: safeCount.nullable(),
			dynamic_value_reloc_table: hexVa.nullable(),
			chpe_metadata_pointer: hexVa.nullable(),
			dynamic_value_reloc_table_offset: uint$10.nullable(),
			dynamic_value_reloc_table_section: z.number().int().min(0).max(65535).nullable(),
			guard_eh_continuation_table: locatedSchema.nullable(),
			guard_eh_continuation_count: safeCount.nullable(),
			guard_xfg_check_function_pointer: locatedSchema.nullable(),
			inferences: z.array(inferenceSchema)
		}).nullable();
		PE_LOAD_CONFIG_LIMITATIONS = [
			"TLS callbacks and load-config fields reproduce IMAGE_DIRECTORY_ENTRY_TLS and IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG. They do not establish that a callback runs or that a mitigation is enforced at load.",
			"Claims such as CFG instrumentation are inferred from GuardFlags bits and are not observations of instrumented instructions.",
			"A missing TLS or load-config directory is observed absence of that table, not proof the image never registered callbacks or mitigations through another mechanism.",
			"SafeSEH table and count are reported only for PE32. PE32+ struct slots that share those names are not a SafeSEH table.",
			"CHPE metadata and dynamic value relocation pointers are raw virtual addresses. Dynamic relocation table offset and section are separate source values; their target is not derived or decoded.",
			"Load-config fields newer than GuardXFGCheckFunctionPointer stay unread. A Size larger than the fields this version knows does not fail the read."
		];
		peLoadConfigSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint$10
			}),
			format: z.enum(["pe32", "pe32-plus"]),
			machine: uint$10,
			bits: z.union([z.literal(32), z.literal(64)]),
			architecture: z.string().min(1),
			tls: tlsSchema,
			load_config: loadConfigSchema,
			examined_callbacks: uint$10,
			limitations: z.array(z.string().min(1))
		});
	})))();
}

//#endregion
//#region dist/domain/native/binaryHardening.js
var MAX_INSPECT_BINARY_HARDENING_FILE_BYTES, MAX_BINARY_HARDENING_TABLE_ENTRIES, MAX_BINARY_HARDENING_SYMBOL_NAME_BYTES, MAX_BINARY_HARDENING_SYMBOL_SCAN_BYTES, uint$9, safeNonNegative$1, inspectBinaryHardeningInputSchema, BINARY_HARDENING_STATES, ELF_HARDENING_PROPERTIES, PE_HARDENING_PROPERTIES, MACHO_HARDENING_PROPERTIES, BINARY_HARDENING_PROPERTIES, BINARY_HARDENING_FORMATS, hardeningPropertiesFor, locationSchema, rowSchema, sliceSchema$1, imageSchema$1, BINARY_HARDENING_LIMITATIONS, artifactSchema$1, binaryHardeningSchema;
function init_binaryHardening() {
	return (init_binaryHardening = __esmMin((() => {
		init_binaryTargetTypes();
		init_digests();
		init_localPath();
		MAX_INSPECT_BINARY_HARDENING_FILE_BYTES = 536870912;
		MAX_BINARY_HARDENING_TABLE_ENTRIES = 65536;
		MAX_BINARY_HARDENING_SYMBOL_NAME_BYTES = 65536;
		MAX_BINARY_HARDENING_SYMBOL_SCAN_BYTES = 16 * 1024 * 1024;
		uint$9 = z.number().int().min(0).max(4294967295);
		safeNonNegative$1 = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
		inspectBinaryHardeningInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to an ELF, PE, or Mach-O image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_BINARY_HARDENING_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)")
		});
		BINARY_HARDENING_STATES = [
			"enabled",
			"disabled",
			"partial",
			"unknown",
			"not_applicable"
		];
		ELF_HARDENING_PROPERTIES = [
			"pie",
			"nx",
			"relro",
			"stack_protector",
			"fortify",
			"cet_ibt_shstk",
			"aarch64_bti_pac",
			"rpath",
			"runpath",
			"stripped"
		];
		PE_HARDENING_PROPERTIES = [
			"dynamic_base",
			"high_entropy_va",
			"nx_compat",
			"force_integrity",
			"no_seh",
			"guard_cf",
			"cfg_instrumented",
			"authenticode_present",
			"debug_record_present"
		];
		MACHO_HARDENING_PROPERTIES = [
			"pie",
			"allow_stack_execution",
			"no_heap_execution",
			"restrict_segment",
			"code_signature_present",
			"encrypted",
			"arm64e",
			"stack_protector",
			"hardened_runtime"
		];
		BINARY_HARDENING_PROPERTIES = [...new Set([
			...ELF_HARDENING_PROPERTIES,
			...PE_HARDENING_PROPERTIES,
			...MACHO_HARDENING_PROPERTIES
		])];
		BINARY_HARDENING_FORMATS = [
			"elf",
			"pe",
			"mach-o"
		];
		hardeningPropertiesFor = (format) => {
			switch (format) {
				case "elf": return ELF_HARDENING_PROPERTIES;
				case "pe": return PE_HARDENING_PROPERTIES;
				case "mach-o": return MACHO_HARDENING_PROPERTIES;
			}
		};
		locationSchema = z.strictObject({
			offset: uint$9,
			bytes: uint$9.min(1)
		});
		rowSchema = z.strictObject({
			property: z.enum(BINARY_HARDENING_PROPERTIES),
			state: z.enum(BINARY_HARDENING_STATES),
			confidence: z.enum(["observed", "derived"]),
			basis: z.string().min(1),
			location: locationSchema.nullable(),
			note: z.string().min(1).max(MAX_BINARY_HARDENING_SYMBOL_NAME_BYTES).nullable(),
			next_probe: z.string().min(1).nullable()
		});
		sliceSchema$1 = z.strictObject({
			index: uint$9,
			file_offset: safeNonNegative$1,
			size: safeNonNegative$1,
			cpu_type: z.number().int(),
			cpu_subtype: z.number().int(),
			architecture: z.string().min(1)
		});
		imageSchema$1 = z.strictObject({
			format: z.enum(BINARY_HARDENING_FORMATS),
			status: z.enum([
				"parsed",
				"malformed",
				"unknown"
			]),
			reason: z.string().min(1).nullable(),
			/** CPU family. `machine` and `slice.architecture` keep the exact identity. */
			architecture: z.enum(BINARY_ARCHITECTURES).exclude([...RAW_ONLY_ARCHITECTURES]).nullable(),
			bits: z.union([z.literal(32), z.literal(64)]).nullable(),
			byte_order: z.enum(["little", "big"]).nullable(),
			machine: uint$9.nullable(),
			slice: sliceSchema$1.nullable(),
			rows: z.array(rowSchema)
		});
		BINARY_HARDENING_LIMITATIONS = [
			"This inspection reads headers, program tables, dynamic symbols, and imports. It does not execute the image or assess exploitability.",
			"A missing stack-protector or fortify symbol does not establish that the protection is absent.",
			"An undefined stack-protector or fortify symbol is a sign that some code uses the protection, not proof that all code does.",
			"Authenticode and Mach-O code-signature rows report table or load-command presence, not signature validity.",
			"PE control-flow guard state is the GuardFlags linker claim, not a check that CFG checks run.",
			"Mach-O hardened runtime is not read here. inspect_signature owns CodeDirectory flags."
		];
		artifactSchema$1 = z.strictObject({
			path: absoluteLocalPathStringSchema,
			sha256: digestSchema,
			bytes: z.number().int().min(0).max(MAX_INSPECT_BINARY_HARDENING_FILE_BYTES)
		});
		binaryHardeningSchema = z.strictObject({
			artifact: artifactSchema$1,
			format: z.enum(BINARY_HARDENING_FORMATS),
			images: z.array(imageSchema$1).min(1),
			limitations: z.array(z.string().min(1))
		});
	})))();
}

//#endregion
//#region dist/domain/native/recordedCrashNoteCoverage.js
/** Require exact aligned note layouts and one complete, nonoverlapping physical coverage. */
function recordedNoteCoverageIssues(segments, notes, padding) {
	const issues = [];
	const bySegment = new Map();
	const all = [];
	const add = (segment, range) => {
		const ranges = bySegment.get(segment) ?? [];
		ranges.push(range);
		bySegment.set(segment, ranges);
		all.push(range);
	};
	for (const note of notes) {
		if (!layoutMatches(note)) issues.push("Recorded note layout differs from its aligned header/owner/descriptor ranges.");
		add(note.segment_index, note.location);
	}
	for (const item of padding) {
		if (!paddingMatches(item, segments[item.segment_index])) issues.push("Recorded note padding must be a short zero-filled segment tail.");
		add(item.segment_index, item.location);
	}
	const compare = (left, right) => BigInt(left.offset) < BigInt(right.offset) ? -1 : BigInt(left.offset) > BigInt(right.offset) ? 1 : 0;
	let end = 0n;
	for (const range of all.sort(compare)) {
		const start = BigInt(range.offset);
		if (start < end) issues.push("Physical recorded note/padding ranges overlap or repeat.");
		if (start + BigInt(range.bytes) > end) end = start + BigInt(range.bytes);
	}
	for (const segment of segments) {
		if (segment.type_id !== 4) continue;
		let cursor = BigInt(segment.offset);
		for (const range of (bySegment.get(segment.index) ?? []).sort(compare)) {
			if (BigInt(range.offset) !== cursor) issues.push("Recorded note/padding ranges leave a gap or overlap in their segment.");
			cursor = BigInt(range.offset) + BigInt(range.bytes);
		}
		if (cursor !== BigInt(segment.offset) + BigInt(segment.file_size)) issues.push("Recorded note/padding ranges do not completely cover their segment.");
	}
	return issues;
}
var align, layoutMatches, paddingMatches;
function init_recordedCrashNoteCoverage() {
	return (init_recordedCrashNoteCoverage = __esmMin((() => {
		align = (size) => (size + 3n) / 4n * 4n;
		layoutMatches = (note) => {
			const start = BigInt(note.location.offset);
			const owner = BigInt(note.owner_location.bytes);
			const descriptor = BigInt(note.descriptor_location.bytes);
			return BigInt(note.owner_location.offset) === start + 12n && BigInt(note.descriptor_location.offset) === start + 12n + align(owner) && BigInt(note.location.bytes) === 12n + align(owner) + align(descriptor);
		};
		paddingMatches = (item, segment) => {
			const bytes = BigInt(item.location.bytes);
			const decodedLength = Buffer.byteLength(item.bytes_base64, "base64");
			return bytes > 0n && bytes < 12n && BigInt(decodedLength) === bytes && /^A*={0,2}$/.test(item.bytes_base64) && segment !== undefined && BigInt(item.location.offset) + bytes === BigInt(segment.offset) + BigInt(segment.file_size);
		};
	})))();
}

//#endregion
//#region dist/domain/native/recordedCrash.js
var hex$1, index, signed32, base64, range$7, diagnostics, LINUX_CORE_OWNER_BASE64, isLinuxCoreNote, RECORDED_LINUX_AMD64_REGISTERS, RECORDED_LINUX_AARCH64_REGISTERS, RECORDED_LINUX_CORE_ARCHITECTURES, RECORDED_LINUX_CORE_PROFILES, recordedCoreRegisterSets, inspectRecordedCrashInputSchema, recordedCrashDebuggerSchema, recordedCrashObjectSchema, recordedCrashPayloadSchema, recordedCrashSchema;
function init_recordedCrash() {
	return (init_recordedCrash = __esmMin((() => {
		init_pwntoolsResourceLimits();
		init_nativeDeadlines();
		init_localPath();
		init_stringPatterns();
		init_recordedCrashNoteCoverage();
		hex$1 = z.string().regex(/^0x(?:0|[1-9a-f][0-9a-f]{0,15})$/, { abort: true });
		index = z.int().nonnegative();
		signed32 = z.int().min(-2147483648).max(2147483647);
		base64 = canonicalBase64Schema;
		range$7 = z.strictObject({
			offset: hex$1,
			bytes: hex$1
		});
		diagnostics = z.strictObject({
			stdout: z.string(),
			stderr: z.string(),
			truncated: z.boolean()
		});
		LINUX_CORE_OWNER_BASE64 = "Q09SRQA=";
		isLinuxCoreNote = (note, type) => note?.owner_bytes_base64 === LINUX_CORE_OWNER_BASE64 && note.type_id === type;
		RECORDED_LINUX_AMD64_REGISTERS = [
			"r15",
			"r14",
			"r13",
			"r12",
			"rbp",
			"rbx",
			"r11",
			"r10",
			"r9",
			"r8",
			"rax",
			"rcx",
			"rdx",
			"rsi",
			"rdi",
			"orig_rax",
			"rip",
			"cs",
			"eflags",
			"rsp",
			"ss",
			"fs_base",
			"gs_base",
			"ds",
			"es",
			"fs",
			"gs"
		];
		RECORDED_LINUX_AARCH64_REGISTERS = [
			"x0",
			"x1",
			"x2",
			"x3",
			"x4",
			"x5",
			"x6",
			"x7",
			"x8",
			"x9",
			"x10",
			"x11",
			"x12",
			"x13",
			"x14",
			"x15",
			"x16",
			"x17",
			"x18",
			"x19",
			"x20",
			"x21",
			"x22",
			"x23",
			"x24",
			"x25",
			"x26",
			"x27",
			"x28",
			"x29",
			"x30",
			"sp",
			"pc",
			"pstate"
		];
		RECORDED_LINUX_CORE_ARCHITECTURES = ["x86_64-little-endian", "aarch64-little-endian"];
		RECORDED_LINUX_CORE_PROFILES = {
			"x86_64-little-endian": {
				machine: 62,
				evidenceArchitecture: "x86_64",
				registers: RECORDED_LINUX_AMD64_REGISTERS,
				registerBytes: 8,
				registerOffset: 112,
				prstatusBytes: 336
			},
			"aarch64-little-endian": {
				machine: 183,
				evidenceArchitecture: "arm64",
				registers: RECORDED_LINUX_AARCH64_REGISTERS,
				registerBytes: 8,
				registerOffset: 112,
				prstatusBytes: 392
			}
		};
		recordedCoreRegisterSets = {
			"x86_64-little-endian": new Set(RECORDED_LINUX_AMD64_REGISTERS),
			"aarch64-little-endian": new Set(RECORDED_LINUX_AARCH64_REGISTERS)
		};
		inspectRecordedCrashInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a supplied Linux ELF core"),
			include_debugger_context: z.boolean().default(false).describe("Add core-only mapping candidates through caller-supplied GDB/pwndbg"),
			pwntools_timeout_ms: pwntoolsTimeoutField,
			producer_limits: pwntoolsProducerLimitsField
		});
		recordedCrashDebuggerSchema = z.discriminatedUnion("status", [z.strictObject({ status: z.literal("not-requested") }), z.strictObject({
			status: z.literal("available"),
			gdb_version: z.string().min(1),
			pwndbg_version: z.string().min(1),
			connection: z.literal("core"),
			executable: z.null(),
			historical_pid: signed32,
			reported_limits: z.strictObject({
				address_space_bytes: index,
				cpu_seconds: index,
				file_size_bytes: index
			}),
			maps: z.array(z.strictObject({
				start: hex$1,
				end: hex$1,
				offset: hex$1,
				reported_flags: index,
				permissions: z.strictObject({
					read: z.boolean(),
					write: z.boolean(),
					execute: z.boolean()
				}).nullable(),
				pathname_display: z.string(),
				current_file_identity: z.literal("unknown")
			})),
			confidence: z.literal("derived"),
			completeness: z.literal("unknown"),
			diagnostics
		})]);
		recordedCrashObjectSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				bytes: index
			}),
			format: z.literal("elf-core"),
			architecture: z.enum(RECORDED_LINUX_CORE_ARCHITECTURES),
			target_execution: z.literal("not-performed"),
			live_process_identity: z.literal("unknown"),
			segments: z.array(z.strictObject({
				index,
				type: z.union([z.string(), index]),
				type_id: index.max(4294967295),
				header_location: range$7,
				offset: hex$1,
				file_size: hex$1,
				memory_size: hex$1,
				virtual_address: hex$1,
				physical_address: hex$1,
				alignment: hex$1,
				flags: hex$1,
				file_backing: z.enum(["file", "none"])
			})),
			notes: z.array(z.strictObject({
				index,
				segment_index: index,
				type: z.union([z.string(), index]),
				type_id: index.max(4294967295),
				location: range$7,
				owner_location: range$7,
				owner_bytes_base64: base64,
				owner_display: z.string().nullable(),
				descriptor_location: range$7,
				descriptor_bytes_base64: base64
			})),
			note_padding: z.array(z.strictObject({
				segment_index: index,
				location: range$7,
				bytes_base64: base64
			})),
			threads: z.array(z.strictObject({
				note_index: index,
				historical_pid: signed32,
				recorded_current_signal: z.int().min(-32768).max(32767),
				registers: z.array(z.strictObject({
					name: z.string().min(1),
					value: hex$1,
					location: range$7
				}))
			})),
			signals: z.array(z.strictObject({
				note_index: index,
				number: signed32,
				code: signed32,
				errno: signed32,
				fault_address: hex$1.nullable(),
				fault_address_meaning: z.enum(["recorded-sigsegv-address", "unknown"]),
				thread_association: z.literal("unknown")
			})),
			debugger: recordedCrashDebuggerSchema,
			note_interpretation_completeness: z.literal("unknown"),
			decoder_diagnostics: diagnostics,
			diagnostics,
			limitations: z.array(z.string())
		});
		recordedCrashPayloadSchema = recordedCrashObjectSchema.omit({
			artifact: true,
			diagnostics: true,
			debugger: true,
			decoder_diagnostics: true
		});
		recordedCrashSchema = recordedCrashObjectSchema.superRefine((value, context) => {
			const fail = (message) => context.addIssue({
				code: "custom",
				message
			});
			const within = (item, start = 0n, end = BigInt(value.artifact.bytes)) => {
				const offset = BigInt(item.offset);
				const bytes = BigInt(item.bytes);
				return offset >= start && offset <= end && bytes <= end - offset;
			};
			for (const issue of recordedNoteCoverageIssues(value.segments, value.notes, value.note_padding)) fail(issue);
			for (const [position, segment] of value.segments.entries()) {
				if (typeof segment.type === "number" && segment.type !== segment.type_id) fail("Numeric segment type differs from its source identity.");
				if (position !== segment.index || !within(segment.header_location)) fail("Invalid original segment identity or header range.");
				if (segment.file_backing === "file" && !within({
					offset: segment.offset,
					bytes: segment.file_size
				})) fail("Recorded segment exceeds artifact bytes.");
				if (segment.type_id === 1 && BigInt(segment.file_size) > BigInt(segment.memory_size)) fail("Recorded PT_LOAD file size exceeds memory size.");
			}
			for (const [position, note] of value.notes.entries()) {
				const segment = value.segments[note.segment_index];
				if (position !== note.index || segment?.type_id !== 4) {
					fail("Invalid original note identity or segment reference.");
					continue;
				}
				const ownerBytes = Buffer.from(note.owner_bytes_base64, "base64");
				const terminator = ownerBytes.indexOf(0);
				const ownerDisplay = ownerBytes.length === 0 ? null : ownerBytes.subarray(0, terminator).toString("utf8");
				if (ownerBytes.length > 0 && terminator < 0 || note.owner_display !== ownerDisplay) fail("Note owner display differs from its retained bytes.");
				if (typeof note.type === "number" && note.type !== note.type_id) fail("Numeric note type differs from its source identity.");
				if (note.owner_bytes_base64 !== LINUX_CORE_OWNER_BASE64 && note.type !== note.type_id) fail("Uninterpreted note owners must retain their numeric type identity.");
				if (BigInt(ownerBytes.length) !== BigInt(note.owner_location.bytes) || BigInt(Buffer.byteLength(note.descriptor_bytes_base64, "base64")) !== BigInt(note.descriptor_location.bytes)) fail("Raw note lengths differ from their source ranges.");
				const start = BigInt(segment.offset);
				const end = start + BigInt(segment.file_size);
				if (!within(note.location, start, end) || !within(note.owner_location, BigInt(note.location.offset), BigInt(note.location.offset) + BigInt(note.location.bytes)) || !within(note.descriptor_location, BigInt(note.location.offset), BigInt(note.location.offset) + BigInt(note.location.bytes))) fail("Note source ranges exceed their recorded segment.");
			}
			for (const padding of value.note_padding) {
				const segment = value.segments[padding.segment_index];
				if (segment?.type_id !== 4 || !within(padding.location, BigInt(segment.offset), BigInt(segment.offset) + BigInt(segment.file_size))) fail("Invalid recorded note padding range.");
			}
			for (const [kind, rows] of [[1, value.threads], [1397311305, value.signals]]) {
				const matchingNotes = value.notes.filter((note) => isLinuxCoreNote(note, kind));
				if (rows.length !== matchingNotes.length || new Set(rows.map(({ note_index }) => note_index)).size !== rows.length) fail("Each supported raw note requires exactly one corresponding interpretation.");
			}
			const profile = RECORDED_LINUX_CORE_PROFILES[value.architecture];
			const profileRegisters = recordedCoreRegisterSets[value.architecture];
			for (const thread of value.threads) {
				const note = value.notes[thread.note_index];
				if (note === undefined || !isLinuxCoreNote(note, 1)) {
					fail("Thread references a different note kind.");
					continue;
				}
				if (thread.registers.length !== profile.registers.length || !thread.registers.every(({ name }) => profileRegisters.has(name)) || new Set(thread.registers.map(({ name }) => name)).size !== thread.registers.length) fail("Each recorded thread requires every supported register exactly once.");
				for (const register of thread.registers) if (BigInt(register.location.bytes) !== BigInt(profile.registerBytes) || !within(register.location, BigInt(note.descriptor_location.offset), BigInt(note.descriptor_location.offset) + BigInt(note.descriptor_location.bytes))) fail("Register source exceeds its descriptor.");
			}
			for (const signal of value.signals) {
				if (!isLinuxCoreNote(value.notes[signal.note_index], 1397311305)) fail("Signal references a different note kind.");
				const known = signal.number === 11 && (signal.code === 1 || signal.code === 2);
				if (known !== (signal.fault_address !== null) || signal.fault_address !== null !== (signal.fault_address_meaning === "recorded-sigsegv-address")) fail("Signal union meaning does not match recorded SIGSEGV code.");
			}
			if (value.debugger.status === "available") for (const map of value.debugger.maps) {
				if (BigInt(map.end) < BigInt(map.start)) fail("Debugger mapping end precedes its start.");
				if (map.permissions !== null && (map.permissions.read !== Boolean(map.reported_flags & 4) || map.permissions.write !== Boolean(map.reported_flags & 2) || map.permissions.execute !== Boolean(map.reported_flags & 1))) fail("Mapping permissions differ from reported flags.");
				if ((map.reported_flags === 0 || map.reported_flags > 7) !== (map.permissions === null)) fail("Unreported or unfamiliar map flags require unknown permissions.");
			}
		});
	})))();
}

//#endregion
//#region dist/domain/native/peCertificates.js
var uint$8, range$6, MAX_INSPECT_PE_CERTIFICATE_FILE_BYTES, MAX_INSPECT_PE_CERTIFICATE_ENTRIES, PE_CERTIFICATE_TYPES, peCertificateTypeName, inspectPeCertificatesInputSchema, distinguishedNameSchema, x509CertificateSchema, signerInfoSchema, pkcs7Schema, certificateEntrySchema, peCertificatesSchema;
function init_peCertificates() {
	return (init_peCertificates = __esmMin((() => {
		init_coverage();
		init_digests();
		init_localPath();
		uint$8 = z.number().int().min(0).max(4294967295);
		range$6 = z.strictObject({
			offset: uint$8,
			bytes: uint$8
		});
		MAX_INSPECT_PE_CERTIFICATE_FILE_BYTES = 536870912;
		MAX_INSPECT_PE_CERTIFICATE_ENTRIES = 64;
		PE_CERTIFICATE_TYPES = [
			"x509",
			"pkcs7",
			"reserved",
			"ts_stack_signed",
			"unknown"
		];
		peCertificateTypeName = (type) => {
			switch (type) {
				case 1: return "x509";
				case 2: return "pkcs7";
				case 3: return "reserved";
				case 4: return "ts_stack_signed";
				default: return "unknown";
			}
		};
		inspectPeCertificatesInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a PE image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_PE_CERTIFICATE_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_entries: z.number().int().min(1).max(64).default(8).describe("Maximum WIN_CERTIFICATE entries to examine; exceeding the budget fails without partial success")
		});
		distinguishedNameSchema = z.strictObject({
			text: z.string(),
			attributes: z.array(z.strictObject({
				oid: z.string(),
				oid_name: z.string().nullable(),
				value: z.string(),
				rdn_index: uint$8.optional()
			}))
		});
		x509CertificateSchema = z.strictObject({
			location: range$6,
			der_sha256: digestSchema,
			serial_hex: z.string().regex(/^[0-9a-f]*$/),
			issuer: distinguishedNameSchema,
			subject: distinguishedNameSchema,
			not_before: z.string(),
			not_after: z.string(),
			signature_algorithm_oid: z.string(),
			signature_algorithm_name: z.string().nullable()
		});
		signerInfoSchema = z.strictObject({
			digest_algorithm_oid: z.string(),
			digest_algorithm_name: z.string().nullable(),
			signature_algorithm_oid: z.string(),
			signature_algorithm_name: z.string().nullable(),
			issuer: distinguishedNameSchema.nullable(),
			serial_hex: z.string().regex(/^[0-9a-f]*$/).nullable(),
			subject_key_identifier_hex: z.string().regex(/^[0-9a-f]*$/).nullable(),
			authenticated_attributes: z.boolean(),
			unsigned_attribute_oids: z.array(z.string()).nullable()
		});
		pkcs7Schema = z.strictObject({
			content_type_oid: z.string(),
			content_type_name: z.string().nullable(),
			digest_algorithm_oids: z.array(z.string()),
			certificates: z.array(x509CertificateSchema),
			signers: z.array(signerInfoSchema)
		});
		certificateEntrySchema = z.strictObject({
			index: uint$8,
			location: range$6,
			length: uint$8,
			revision: uint$8,
			certificate_type: uint$8,
			certificate_type_name: z.enum(PE_CERTIFICATE_TYPES),
			payload: z.strictObject({
				location: range$6,
				bytes: uint$8,
				sha256: digestSchema
			}),
			pkcs7: pkcs7Schema.nullable()
		});
		peCertificatesSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint$8
			}),
			format: z.enum(["pe32", "pe32-plus"]),
			machine: uint$8,
			table: z.strictObject({
				location: range$6,
				data_directory_location: range$6
			}).nullable(),
			entries: z.array(certificateEntrySchema),
			coverage: z.strictObject({
				status: knownCoverageStatusSchema,
				examined_entries: uint$8,
				certificates: uint$8
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/native/peImports.js
var uint$7, range$5, md5Schema, MAX_INSPECT_PE_IMPORT_FILE_BYTES, MAX_INSPECT_PE_IMPORT_DLLS, MAX_INSPECT_PE_IMPORT_FUNCTIONS, MAX_INSPECT_PE_IMPORT_RETAINED_TEXT_BYTES, inspectPeImportsInputSchema, peImportFunctionSchema, peImportDllSchema, peDelayImportDllSchema, directorySchema, peImportIssueSchema, coverageSchema$3, imphashSchema, peImportsSchema;
function init_peImports() {
	return (init_peImports = __esmMin((() => {
		init_coverage();
		init_digests();
		init_localPath();
		uint$7 = z.number().int().min(0).max(4294967295);
		range$5 = z.strictObject({
			offset: uint$7,
			bytes: uint$7
		});
		md5Schema = z.string().regex(/^[a-f0-9]{32}$/u);
		MAX_INSPECT_PE_IMPORT_FILE_BYTES = 536870912;
		MAX_INSPECT_PE_IMPORT_DLLS = 4096;
		MAX_INSPECT_PE_IMPORT_FUNCTIONS = 262144;
		MAX_INSPECT_PE_IMPORT_RETAINED_TEXT_BYTES = 16 * 1024 * 1024;
		inspectPeImportsInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a PE image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_PE_IMPORT_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_dlls: z.number().int().min(1).max(MAX_INSPECT_PE_IMPORT_DLLS).default(256).describe("Maximum import and delay-load descriptors to examine; exceeding the budget fails without partial success"),
			max_functions: z.number().int().min(1).max(MAX_INSPECT_PE_IMPORT_FUNCTIONS).default(8192).describe("Maximum imported functions to examine across every table; exceeding the budget fails without partial success")
		});
		peImportFunctionSchema = z.strictObject({
			hint: uint$7.nullable(),
			name: z.string().min(1).nullable(),
			ordinal: z.number().int().min(0).max(65535).nullable(),
			ilt_rva: uint$7.nullable(),
			iat_rva: uint$7,
			thunk_hex: z.string().regex(/^[0-9a-f]+$/u)
		});
		peImportDllSchema = z.strictObject({
			index: uint$7,
			name: z.string().min(1).nullable(),
			name_rva: uint$7,
			original_first_thunk_rva: uint$7,
			first_thunk_rva: uint$7,
			time_date_stamp: uint$7,
			forwarder_chain: uint$7,
			location: range$5,
			functions: z.array(peImportFunctionSchema)
		});
		peDelayImportDllSchema = z.strictObject({
			index: uint$7,
			name: z.string().min(1).nullable(),
			name_rva: uint$7,
			attributes: uint$7,
			import_address_table_rva: uint$7,
			import_name_table_rva: uint$7,
			bound_import_rva: uint$7,
			unload_information_table_rva: uint$7,
			module_handle_rva: uint$7,
			time_date_stamp: uint$7,
			location: range$5,
			functions: z.array(peImportFunctionSchema)
		});
		directorySchema = z.strictObject({
			rva: uint$7,
			size: uint$7,
			locations: z.array(range$5)
		}).nullable();
		peImportIssueSchema = z.strictObject({
			code: z.enum([
				"malformed_entry",
				"descriptor_unreadable",
				"name_unreadable",
				"thunk_unreadable",
				"unsupported_form"
			]),
			location: z.string().min(1).nullable(),
			message: z.string().min(1)
		});
		coverageSchema$3 = z.strictObject({
			status: knownCoverageStatusSchema,
			reason: z.string().min(1).nullable(),
			examined_dlls: uint$7,
			imports: uint$7,
			delay_imports: uint$7
		});
		imphashSchema = z.strictObject({
			algorithm: z.literal("pefile"),
			md5: md5Schema.nullable(),
			reason: z.string().min(1).nullable()
		});
		peImportsSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint$7
			}),
			format: z.enum(["pe32", "pe32-plus"]),
			machine: uint$7,
			bits: z.union([z.literal(32), z.literal(64)]),
			architecture: z.string().min(1),
			import_directory: directorySchema,
			delay_import_directory: directorySchema,
			imports: z.array(peImportDllSchema),
			delay_imports: z.array(peDelayImportDllSchema),
			imphash: imphashSchema,
			coverage: coverageSchema$3,
			issues: z.array(peImportIssueSchema),
			limitations: z.array(z.string().min(1))
		});
	})))();
}

//#endregion
//#region dist/domain/native/windowsShortcut.js
var uint$6, uint16, int32, range$4, decimalUint64, guidSchema, macSchema, MAX_INSPECT_WINDOWS_SHORTCUT_FILE_BYTES, MAX_INSPECT_WINDOWS_SHORTCUT_ID_LIST_ITEMS, MAX_INSPECT_WINDOWS_SHORTCUT_EXTRA_DATA_BLOCKS, MAX_INSPECT_WINDOWS_SHORTCUT_STRING_BYTES, inspectWindowsShortcutInputSchema, fileTimeSchema, namedBitsSchema, showCommandSchema, hotKeySchema, stringFieldSchema, idListRootSchema, idListVolumeSchema, idListFileSchema, idListRawSchema, idListItemSchema, driveTypeSchema, volumeSchema, networkLinkSchema, linkInfoSchema, uuidV1DerivedSchema, guidPairSchema, uuidV1PairSchema, extraDecodedSchema, extraDataBlockSchema, argumentsPresentObservationSchema, argumentLengthObservationSchema, targetExtensionObservationSchema, showCommandMinimizedObservationSchema, iconLocationDiffersObservationSchema, issueSchema$1, coverageSchema$2, windowsShortcutSchema;
function init_windowsShortcut() {
	return (init_windowsShortcut = __esmMin((() => {
		init_coverage();
		init_digests();
		init_fixedTupleSchema();
		init_localPath();
		uint$6 = z.number().int().min(0).max(4294967295);
		uint16 = z.number().int().min(0).max(65535);
		int32 = z.number().int().min(-2147483648).max(2147483647);
		range$4 = z.strictObject({
			offset: uint$6,
			bytes: uint$6
		});
		decimalUint64 = z.string().regex(/^(?:0|[1-9][0-9]*)$/u);
		guidSchema = z.string().regex(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/u);
		macSchema = z.string().regex(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}$/u);
		MAX_INSPECT_WINDOWS_SHORTCUT_FILE_BYTES = 16 * 1024 * 1024;
		MAX_INSPECT_WINDOWS_SHORTCUT_ID_LIST_ITEMS = 4096;
		MAX_INSPECT_WINDOWS_SHORTCUT_EXTRA_DATA_BLOCKS = 1024;
		MAX_INSPECT_WINDOWS_SHORTCUT_STRING_BYTES = 1024 * 1024;
		inspectWindowsShortcutInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a Windows Shell Link (.lnk) file"),
			max_file_bytes: z.number().int().min(76).max(MAX_INSPECT_WINDOWS_SHORTCUT_FILE_BYTES).default(1048576).describe("Maximum stable artifact bytes to read (default 1 MiB)"),
			max_id_list_items: z.number().int().min(1).max(MAX_INSPECT_WINDOWS_SHORTCUT_ID_LIST_ITEMS).default(256).describe("Maximum LinkTargetIDList items to examine; exceeding the budget fails without partial success"),
			max_extra_data_blocks: z.number().int().min(1).max(MAX_INSPECT_WINDOWS_SHORTCUT_EXTRA_DATA_BLOCKS).default(64).describe("Maximum ExtraData blocks to examine; exceeding the budget fails without partial success"),
			max_string_bytes: z.number().int().min(1).max(MAX_INSPECT_WINDOWS_SHORTCUT_STRING_BYTES).default(65536).describe("Maximum retained string payload bytes across StringData, LinkInfo, and ExtraData (default 64 KiB)")
		});
		fileTimeSchema = z.strictObject({
			raw: decimalUint64,
			iso8601: z.string().nullable()
		});
		namedBitsSchema = z.strictObject({
			raw: uint$6,
			decoded: z.array(z.string().min(1))
		});
		showCommandSchema = z.strictObject({
			raw: uint$6,
			decoded: z.enum([
				"normal",
				"maximized",
				"minimized"
			])
		});
		hotKeySchema = z.strictObject({
			raw: uint16,
			modifiers: z.array(z.enum([
				"shift",
				"control",
				"alt"
			])),
			virtual_key: uint16.nullable(),
			virtual_key_name: z.string().min(1).nullable()
		});
		stringFieldSchema = z.strictObject({
			encoding: z.enum(["ansi", "unicode"]),
			count_characters: uint16,
			byte_length: uint$6,
			value: z.string(),
			location: range$4
		});
		idListRootSchema = z.strictObject({
			kind: z.literal("root_folder"),
			offset: uint$6,
			size: uint$6,
			type_byte: uint$6,
			sort_index: uint$6,
			folder_id: guidSchema
		});
		idListVolumeSchema = z.strictObject({
			kind: z.literal("volume"),
			offset: uint$6,
			size: uint$6,
			type_byte: uint$6,
			name: z.string()
		});
		idListFileSchema = z.strictObject({
			kind: z.literal("file_entry"),
			offset: uint$6,
			size: uint$6,
			type_byte: uint$6,
			entry_class: z.enum(["file", "directory"]),
			file_size: uint$6,
			short_name: z.string()
		});
		idListRawSchema = z.strictObject({
			kind: z.literal("raw"),
			offset: uint$6,
			size: uint$6,
			type_byte: uint$6,
			sha256: digestSchema
		});
		idListItemSchema = z.discriminatedUnion("kind", [
			idListRootSchema,
			idListVolumeSchema,
			idListFileSchema,
			idListRawSchema
		]);
		driveTypeSchema = z.strictObject({
			raw: uint$6,
			name: z.enum([
				"unknown",
				"no_root_dir",
				"removable",
				"fixed",
				"remote",
				"cdrom",
				"ramdisk"
			]).nullable()
		});
		volumeSchema = z.strictObject({
			drive_type: driveTypeSchema,
			serial: z.string().regex(/^[0-9A-F]{8}$/u),
			label: z.string().nullable(),
			label_unicode: z.string().nullable()
		});
		networkLinkSchema = z.strictObject({
			net_name: z.string().nullable(),
			net_name_unicode: z.string().nullable(),
			device_name: z.string().nullable(),
			device_name_unicode: z.string().nullable(),
			network_provider_type: uint$6.nullable()
		});
		linkInfoSchema = z.strictObject({
			location: range$4,
			header_size: uint$6,
			flags: z.strictObject({
				raw: uint$6,
				volume_id_and_local_base_path: z.boolean(),
				common_network_relative_link_and_path_suffix: z.boolean()
			}),
			volume: volumeSchema.nullable(),
			local_base_path: z.string().nullable(),
			local_base_path_unicode: z.string().nullable(),
			common_network_relative_link: networkLinkSchema.nullable(),
			common_path_suffix: z.string().nullable(),
			common_path_suffix_unicode: z.string().nullable()
		});
		uuidV1DerivedSchema = z.strictObject({
			evidence_kind: z.literal("derived"),
			version: z.literal(1),
			mac: macSchema,
			timestamp_iso8601: z.string().nullable(),
			timestamp_100ns: decimalUint64
		});
		guidPairSchema = fixedTupleSchema([guidSchema, guidSchema]);
		uuidV1PairSchema = fixedTupleSchema([uuidV1DerivedSchema.nullable(), uuidV1DerivedSchema.nullable()]);
		extraDecodedSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("environment_variable"),
				target_ansi: z.string(),
				target_unicode: z.string()
			}),
			z.strictObject({
				kind: z.literal("icon_environment"),
				target_ansi: z.string(),
				target_unicode: z.string()
			}),
			z.strictObject({
				kind: z.literal("tracker"),
				machine_id: z.string(),
				droid: guidPairSchema,
				birth_droid: guidPairSchema,
				droid_uuid_v1: uuidV1PairSchema,
				birth_droid_uuid_v1: uuidV1PairSchema
			}),
			z.strictObject({
				kind: z.literal("known_folder"),
				folder_id: guidSchema,
				item_offset: uint$6
			}),
			z.strictObject({
				kind: z.literal("special_folder"),
				folder_id: uint$6,
				item_offset: uint$6
			}),
			z.strictObject({
				kind: z.literal("console_fe"),
				code_page: uint$6
			}),
			z.strictObject({
				kind: z.literal("property_store"),
				bytes: uint$6,
				sha256: digestSchema
			}),
			z.strictObject({
				kind: z.literal("raw"),
				bytes: uint$6,
				sha256: digestSchema
			})
		]);
		extraDataBlockSchema = z.strictObject({
			offset: uint$6,
			size: uint$6,
			signature: uint$6,
			signature_name: z.string().min(1).nullable(),
			decoded: extraDecodedSchema
		});
		argumentsPresentObservationSchema = z.strictObject({
			kind: z.literal("arguments_present"),
			evidence_kind: z.literal("derived"),
			value: z.boolean().nullable()
		});
		argumentLengthObservationSchema = z.strictObject({
			kind: z.literal("argument_length"),
			evidence_kind: z.literal("derived"),
			characters: uint$6.nullable()
		});
		targetExtensionObservationSchema = z.strictObject({
			kind: z.literal("target_extension"),
			evidence_kind: z.literal("derived"),
			extension: z.string().nullable()
		});
		showCommandMinimizedObservationSchema = z.strictObject({
			kind: z.literal("show_command_minimized"),
			evidence_kind: z.literal("derived"),
			value: z.boolean()
		});
		iconLocationDiffersObservationSchema = z.strictObject({
			kind: z.literal("icon_location_differs_from_target"),
			evidence_kind: z.literal("derived"),
			value: z.boolean().nullable()
		});
		issueSchema$1 = z.strictObject({
			code: z.enum([
				"truncated",
				"block_size_overrun",
				"odd_unicode_length",
				"malformed_structure",
				"missing_extra_data_block"
			]),
			offset: uint$6,
			message: z.string().min(1)
		});
		coverageSchema$2 = z.strictObject({
			status: knownCoverageStatusSchema,
			reason: z.string().min(1).nullable(),
			examined_id_list_items: uint$6,
			examined_extra_data_blocks: uint$6,
			failing_offset: uint$6.nullable()
		});
		windowsShortcutSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint$6
			}),
			header: z.strictObject({
				location: range$4,
				header_size: uint$6,
				clsid: guidSchema,
				link_flags: namedBitsSchema,
				file_attributes: namedBitsSchema,
				creation_time: fileTimeSchema,
				access_time: fileTimeSchema,
				write_time: fileTimeSchema,
				file_size: uint$6,
				icon_index: int32,
				show_command: showCommandSchema,
				hotkey: hotKeySchema
			}),
			id_list: z.strictObject({
				location: range$4,
				byte_size: uint16,
				item_count: uint$6,
				items: z.array(idListItemSchema)
			}).nullable(),
			link_info: linkInfoSchema.nullable(),
			string_data: z.strictObject({
				name: stringFieldSchema.nullable(),
				relative_path: stringFieldSchema.nullable(),
				working_dir: stringFieldSchema.nullable(),
				arguments: stringFieldSchema.nullable(),
				icon_location: stringFieldSchema.nullable()
			}),
			extra_data: z.strictObject({
				blocks: z.array(extraDataBlockSchema),
				terminal_offset: uint$6.nullable()
			}),
			observations: fixedTupleSchema([
				argumentsPresentObservationSchema,
				argumentLengthObservationSchema,
				targetExtensionObservationSchema,
				showCommandMinimizedObservationSchema,
				iconLocationDiffersObservationSchema
			]),
			coverage: coverageSchema$2,
			issues: z.array(issueSchema$1),
			limitations: z.array(z.string().min(1))
		});
	})))();
}

//#endregion
//#region dist/domain/native/dwarfUnits.js
var MAX_INSPECT_DWARF_UNITS_FILE_BYTES, MAX_DWARF_DECOMPRESSED_SECTION_BYTES, DWARF_DECOMPRESSED_SECTION_ALLOWANCE, MAX_INSPECT_DWARF_UNITS_LIMIT, DEFAULT_INSPECT_DWARF_UNITS_LIMIT, MAX_DWARF_UNIT_OFFSET, MAX_DWARF_UNITS, MAX_DWARF_ABBREV_ENTRIES, MAX_DWARF_ABBREV_ATTRIBUTES, MAX_DWARF_ULEB_BYTES, MAX_DWARF_STRING_BYTES, MAX_DWARF_FORM_DECODE_STEPS, MAX_DWARF_UNIT_ISSUES, DWARF_LANGUAGE_NAMES, dwarfLanguageName, DWARF_UNIT_ISSUE_CODES, DWARF_SECTION_ROLES, safeInt, attributeState, stringFactSchema, numberFactSchema, issueSchema, unitSchema, sectionSchema, inspectDwarfUnitsInputSchema, dwarfUnitsSchema;
function init_dwarfUnits() {
	return (init_dwarfUnits = __esmMin((() => {
		init_keyedCollection();
		init_coverage();
		init_machoTargetSelection();
		init_binaryTargetTypes();
		init_digests();
		init_localPath();
		MAX_INSPECT_DWARF_UNITS_FILE_BYTES = 536870912;
		MAX_DWARF_DECOMPRESSED_SECTION_BYTES = 268435456;
		DWARF_DECOMPRESSED_SECTION_ALLOWANCE = "The DWARF decompressed section allowance";
		MAX_INSPECT_DWARF_UNITS_LIMIT = 256;
		DEFAULT_INSPECT_DWARF_UNITS_LIMIT = 32;
		MAX_DWARF_UNIT_OFFSET = 1e5;
		MAX_DWARF_UNITS = 1e5;
		MAX_DWARF_ABBREV_ENTRIES = 8192;
		MAX_DWARF_ABBREV_ATTRIBUTES = 256;
		MAX_DWARF_ULEB_BYTES = 10;
		MAX_DWARF_STRING_BYTES = 65536;
		MAX_DWARF_FORM_DECODE_STEPS = 1048576;
		MAX_DWARF_UNIT_ISSUES = 32;
		DWARF_LANGUAGE_NAMES = {
			1: "C89",
			2: "C",
			3: "Ada83",
			4: "C_plus_plus",
			5: "Cobol74",
			6: "Cobol85",
			7: "Fortran77",
			8: "Fortran90",
			9: "Pascal83",
			10: "Modula2",
			11: "Java",
			12: "C99",
			13: "Ada95",
			14: "Fortran95",
			15: "PLI",
			16: "ObjC",
			17: "ObjC_plus_plus",
			18: "UPC",
			19: "D",
			20: "Python",
			21: "OpenCL",
			22: "Go",
			23: "Modula3",
			24: "Haskell",
			25: "C_plus_plus_03",
			26: "C_plus_plus_11",
			27: "OCaml",
			28: "Rust",
			29: "C11",
			30: "Swift",
			31: "Julia",
			32: "Dylan",
			33: "C_plus_plus_14",
			34: "Fortran03",
			35: "Fortran08",
			36: "RenderScript",
			37: "BLISS"
		};
		dwarfLanguageName = (code) => DWARF_LANGUAGE_NAMES[code] ?? null;
		DWARF_UNIT_ISSUE_CODES = [
			"truncated_header",
			"unsupported_version",
			"unsupported_address_size",
			"unknown_unit_type",
			"abbrev_offset_out_of_range",
			"abbrev_unavailable",
			"abbrev_malformed",
			"abbrev_budget",
			"decode_budget",
			"unknown_abbrev_code",
			"unknown_form",
			"truncated_die",
			"string_unresolved",
			"value_unresolved",
			"unapplied_relocation",
			"str_offsets_base_absent",
			"supplementary_string",
			"string_not_utf8",
			"empty_unit",
			"value_out_of_range",
			"conflicting_dwo_name"
		];
		DWARF_SECTION_ROLES = [
			".debug_info",
			".debug_abbrev",
			".debug_str",
			".debug_line_str",
			".debug_str_offsets"
		];
		safeInt = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
		attributeState = (value) => z.strictObject({
			state: z.enum([
				"absent",
				"present",
				"unknown",
				"unresolved"
			]),
			value: value.nullable()
		}).superRefine((fact, context) => {
			const row = fact;
			if (row.state === "present" !== (row.value !== null)) context.addIssue({
				code: "custom",
				message: "Attribute state does not match its value"
			});
		});
		stringFactSchema = attributeState(z.string());
		numberFactSchema = attributeState(z.number().int().min(0).max(4294967295));
		issueSchema = z.strictObject({
			code: z.enum(DWARF_UNIT_ISSUE_CODES),
			detail: z.string().min(1)
		});
		unitSchema = z.strictObject({
			/** Byte offset of the unit inside decompressed `.debug_info`. */
			offset: safeInt,
			/** Artifact file offset. Null when `.debug_info` is compressed. */
			file_offset: safeInt.nullable(),
			/** Framed byte length, including the initial length field. */
			length: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
			version: z.number().int().min(0).max(65535).nullable(),
			/** Null when the header has no unit-type byte. */
			unit_type: z.number().int().min(0).max(255).nullable(),
			address_size: z.number().int().min(0).max(255).nullable(),
			offset_size: z.union([z.literal(4), z.literal(8)]),
			/** Null when the header stops first or an unapplied ET_REL relocation hides it. */
			abbrev_offset: safeInt.nullable(),
			tag: z.number().int().min(0).max(65535).nullable(),
			die_complete: z.boolean(),
			name: stringFactSchema,
			comp_dir: stringFactSchema,
			producer: stringFactSchema,
			dwo_name: stringFactSchema,
			language: numberFactSchema,
			/** Null when the language is absent, unresolved, unknown, or unnamed. */
			language_name: z.string().nullable(),
			stmt_list: numberFactSchema,
			/** Null when the abbreviation set was not read. */
			low_pc_present: z.boolean().nullable(),
			issues: z.array(issueSchema).max(32)
		}).superRefine((unit, context) => {
			if (unit.low_pc_present === null !== (unit.tag === null && !unit.die_complete)) context.addIssue({
				code: "custom",
				message: "low_pc_present does not match abbreviation availability"
			});
			if (unit.die_complete) {
				for (const [key, fact] of [
					["name", unit.name],
					["comp_dir", unit.comp_dir],
					["producer", unit.producer],
					["dwo_name", unit.dwo_name],
					["language", unit.language],
					["stmt_list", unit.stmt_list]
				]) if (fact.state === "unknown") context.addIssue({
					code: "custom",
					path: [key],
					message: "A complete DIE cannot leave an attribute unknown"
				});
			}
			const named = unit.language.state === "present" && unit.language.value !== null ? dwarfLanguageName(unit.language.value) : null;
			if (unit.language_name !== named) context.addIssue({
				code: "custom",
				path: ["language_name"],
				message: "language_name does not match the DWARF 5 language table"
			});
		});
		sectionSchema = z.strictObject({
			/** Stored section name, including a Mach-O or `.zdebug_*` spelling. */
			name: z.string().min(1),
			role: z.enum(DWARF_SECTION_ROLES),
			offset: safeInt,
			size: safeInt,
			compression: z.enum([
				"none",
				"zlib",
				"zstd"
			]),
			uncompressed_size: safeInt
		});
		inspectDwarfUnitsInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to an ELF, Mach-O, or PE image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_DWARF_UNITS_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			offset: z.number().int().min(0).max(MAX_DWARF_UNIT_OFFSET).default(0).describe("Index of the first compile unit to return"),
			limit: z.number().int().min(1).max(256).default(32).describe("Maximum compile units to return"),
			architecture: machoSliceArchitectureSchema.exactOptional().describe("CPU family of the slice to read from a universal Mach-O. Required for universal files and rejected for every other image.")
		});
		dwarfUnitsSchema = z.strictObject({
			artifact: z.strictObject({
				path: localPathStringSchema,
				sha256: digestSchema,
				bytes: safeInt
			}),
			format: z.enum([
				"elf",
				"pe",
				"macho"
			]),
			bits: z.union([z.literal(32), z.literal(64)]),
			byte_order: z.enum(["little", "big"]),
			machine: z.number().int().min(0).max(4294967295).nullable(),
			architecture: z.enum(BINARY_ARCHITECTURES).nullable(),
			selected_slice: machoTargetSelectionSchema.exactOptional(),
			sections: z.array(sectionSchema),
			debug_info: z.enum(["present", "absent"]).describe("absent when this file declares no file-backed .debug_info; a separate debug file may still exist"),
			omissions: z.array(z.strictObject({
				name: z.string().min(1),
				reason: z.string().min(1)
			})),
			units: z.array(unitSchema).max(256),
			total_units: safeInt,
			page: z.strictObject({
				offset: z.number().int().min(0).max(MAX_DWARF_UNIT_OFFSET),
				limit: z.number().int().min(1).max(256)
			}),
			coverage: z.strictObject({
				status: coverageStatusSchema,
				reason: z.string().nullable()
			}),
			limitations: z.array(z.string().min(1)).min(1)
		}).superRefine((report, context) => {
			const debugInfo = uniqueKeyed(keyedBy(report.sections, (section) => section.role), ".debug_info");
			if (!debugInfo.ok) context.addIssue({
				code: "custom",
				path: ["sections"],
				message: "A report names one .debug_info section"
			});
			const info = debugInfo.ok ? debugInfo.value : undefined;
			const pageCount = Math.min(report.page.limit, Math.max(0, report.total_units - report.page.offset));
			if (report.units.length !== pageCount) context.addIssue({
				code: "custom",
				path: ["units"],
				message: "Unit page length does not match offset, limit, and total_units"
			});
			if (report.coverage.status !== "complete" && report.coverage.reason === null) context.addIssue({
				code: "custom",
				path: ["coverage"],
				message: "Incomplete coverage requires a reason"
			});
			if (report.coverage.status === "complete" && report.coverage.reason !== null) context.addIssue({
				code: "custom",
				path: ["coverage"],
				message: "Complete coverage has no stop reason"
			});
			if (report.debug_info === "absent") {
				if (report.coverage.status !== "complete" || report.total_units !== 0 || report.units.length !== 0 || info !== undefined) context.addIssue({
					code: "custom",
					path: ["debug_info"],
					message: "Absent debug info is complete, with no .debug_info section and no units"
				});
			}
			const slice = report.selected_slice;
			if (slice !== undefined && !selectedSliceAgreesWithReport(slice, report.format, report.architecture ?? undefined)) context.addIssue({
				code: "custom",
				path: ["selected_slice"],
				message: "Selected Mach-O slice does not agree with the report"
			});
			for (const section of report.sections) {
				if (section.offset + section.size > report.artifact.bytes) context.addIssue({
					code: "custom",
					path: ["sections"],
					message: "Section range is outside the artifact"
				});
				if (section.compression === "none" && section.uncompressed_size !== section.size) context.addIssue({
					code: "custom",
					path: ["sections"],
					message: "An uncompressed section changed size"
				});
				if (slice !== undefined && !machoSelectionContainsRange(slice, report.artifact.bytes, section.offset, section.size)) context.addIssue({
					code: "custom",
					path: ["sections"],
					message: "Section range is outside the selected Mach-O slice"
				});
			}
			if (info === undefined) return;
			for (const unit of report.units) {
				if (unit.offset + unit.length > info.uncompressed_size) context.addIssue({
					code: "custom",
					path: ["units"],
					message: "Unit range is outside decompressed .debug_info"
				});
				if (info.compression === "none") {
					if (unit.file_offset !== info.offset + unit.offset) context.addIssue({
						code: "custom",
						path: ["units"],
						message: "Unit file_offset does not match .debug_info"
					});
				} else if (unit.file_offset !== null) context.addIssue({
					code: "custom",
					path: ["units"],
					message: "Compressed .debug_info has no per-unit file_offset"
				});
				if (unit.file_offset !== null && (unit.file_offset + unit.length > report.artifact.bytes || slice !== undefined && !machoSelectionContainsRange(slice, report.artifact.bytes, unit.file_offset, unit.length))) context.addIssue({
					code: "custom",
					path: ["units"],
					message: "Unit file range is outside the artifact"
				});
			}
		});
	})))();
}

//#endregion
//#region dist/domain/native/elfDebugLink.js
var uint$5, crc32Hex, buildIdHex, MAX_INSPECT_ELF_DEBUG_LINK_FILE_BYTES, MAX_INSPECT_ELF_DEBUG_LINK_ENTRIES, DEFAULT_INSPECT_ELF_DEBUG_LINK_ENTRIES, MAX_ELF_DEBUG_LINK_NAME_BYTES, MAX_ELF_DEBUG_ALT_BUILD_ID_BYTES, GNU_DEBUG_DIRECTORY, ELF_DEBUG_LINK_LIMITATIONS, ELF_DEBUG_LINK_UNAVAILABLE_CHECK_LIMITATION, ELF_DEBUG_LINK_CANNOT_VERIFY_LIMITATION, ELF_DEBUG_LINK_CANDIDATE_PREFIX_LIMITATION, ELF_DEBUG_LINK_CANDIDATE_BUDGET_LIMITATION, ELF_DEBUG_LINK_CANDIDATE_UNREADABLE_LIMITATION, ELF_DEBUG_LINK_CANDIDATE_INCOMPLETE_LIMITATION, MAX_ELF_DEBUG_CANDIDATE_BYTES, ELF_DEBUG_LINK_MULTIPLE_BUILD_IDS_LIMITATION, ELF_DEBUG_LINK_NAME_SEGMENT_LIMITATION, sectionStatus$1, range$3, untrustedName, DEBUGLINK_REASONS, ALT_REASONS, DEBUGDATA_REASONS, BUILD_ID_REASONS, LOOKUP_KINDS, CANDIDATE_SECTION_STATUSES, CHECK_STATUSES, BUILD_ID_CHECK_REASONS, VERIFICATION_REASONS, inspectElfDebugLinkInputSchema, debuglinkSchema, debugaltlinkSchema, debugdataSchema, buildIdSourceSchema, buildIdSchema, lookupPathSchema, candidateSchema, crc32CheckSchema, buildIdCheckSchema, verificationSchema, elfDebugLinkSchema, debugFileNameIsSingleSegment, buildIdDirectoryPath, imageDirectory, deriveDebugFileLookupPaths;
function init_elfDebugLink() {
	return (init_elfDebugLink = __esmMin((() => {
		init_digests();
		init_localPath();
		init_elfNotes();
		init_coverage();
		uint$5 = z.number().int().min(0).max(4294967295);
		crc32Hex = z.string().regex(/^[0-9a-f]{8}$/u);
		buildIdHex = z.string().regex(/^(?:[0-9a-f]{2}){1,256}$/u);
		MAX_INSPECT_ELF_DEBUG_LINK_FILE_BYTES = 536870912;
		MAX_INSPECT_ELF_DEBUG_LINK_ENTRIES = 256;
		DEFAULT_INSPECT_ELF_DEBUG_LINK_ENTRIES = 128;
		MAX_ELF_DEBUG_LINK_NAME_BYTES = 4096;
		MAX_ELF_DEBUG_ALT_BUILD_ID_BYTES = 256;
		GNU_DEBUG_DIRECTORY = "/usr/lib/debug";
		ELF_DEBUG_LINK_LIMITATIONS = [
			"This workflow does not execute the image, search the filesystem for debug files, or use the network.",
			"Lookup paths are conventional GNU/Linux strings. They are not opened.",
			"The listed lookup paths are the build-id path, <directory>/.debug/<name>, and /usr/lib/debug/<directory>/<name>. A same-directory <directory>/<name> string is not included.",
			"Target-derived file names and lookup paths are untrusted data.",
			"The .gnu_debugdata xz payload is not decoded. Presence, file offset, and stored size are reported.",
			"A missing named section is observed absence only when section names are complete.",
			"GNU build-id absence means the declared note tables had no build-id. It is not proof the image never carried one.",
			"Candidate verification compares this image's debuglink CRC32 and GNU build-id with one caller-selected file. The .gnu_debugaltlink build-id is not that comparison.",
			"Debuglink and debugaltlink names use a byte-preserving Latin1 projection. Their original text encoding is unobserved."
		];
		ELF_DEBUG_LINK_UNAVAILABLE_CHECK_LIMITATION = "An unavailable CRC32 or build-id check is not a match.";
		ELF_DEBUG_LINK_CANNOT_VERIFY_LIMITATION = "Neither the debuglink CRC32 nor the GNU build-id could be compared with the candidate.";
		ELF_DEBUG_LINK_CANDIDATE_PREFIX_LIMITATION = "The candidate is larger than max_file_bytes. Its CRC32 and SHA-256 cover the whole file, but its sections and GNU build-id were not decoded.";
		ELF_DEBUG_LINK_CANDIDATE_BUDGET_LIMITATION = "The candidate exceeded the max_entries or ELF decoding budget. Its CRC32 and SHA-256 cover the whole file, but candidate facts that were not decoded are unknown.";
		ELF_DEBUG_LINK_CANDIDATE_UNREADABLE_LIMITATION = "The selected candidate could not be read as one unchanged regular file, so it was not compared.";
		ELF_DEBUG_LINK_CANDIDATE_INCOMPLETE_LIMITATION = "The candidate read did not complete, so the candidate was not compared. Only the image linkage is retained.";
		MAX_ELF_DEBUG_CANDIDATE_BYTES = 4294967295;
		ELF_DEBUG_LINK_MULTIPLE_BUILD_IDS_LIMITATION = "Multiple distinct GNU build-ids were observed. None is selected as the image build-id.";
		ELF_DEBUG_LINK_NAME_SEGMENT_LIMITATION = "The debuglink file name is not a single path segment, so directory lookup paths were not derived.";
		sectionStatus$1 = z.enum([
			"present",
			"absent",
			"unknown",
			"malformed",
			"unsupported"
		]);
		range$3 = z.strictObject({
			offset: uint$5,
			bytes: uint$5
		});
		untrustedName = z.strictObject({
			text: z.string().min(1).max(MAX_ELF_DEBUG_LINK_NAME_BYTES),
			encoding: z.literal("latin1"),
			trust: z.literal("observed-untrusted")
		});
		DEBUGLINK_REASONS = [
			"debuglink_not_file_backed",
			"debuglink_section_compressed",
			"debuglink_unterminated_name",
			"debuglink_empty_name",
			"debuglink_truncated",
			"debuglink_duplicate_section",
			"debuglink_name_exceeds_limit"
		];
		ALT_REASONS = [
			"debugaltlink_not_file_backed",
			"debugaltlink_section_compressed",
			"debugaltlink_unterminated_name",
			"debugaltlink_empty_name",
			"debugaltlink_missing_build_id",
			"debugaltlink_duplicate_section",
			"debugaltlink_name_exceeds_limit",
			"debugaltlink_build_id_exceeds_limit"
		];
		DEBUGDATA_REASONS = [
			"debugdata_not_file_backed",
			"debugdata_section_compressed",
			"debugdata_truncated",
			"debugdata_not_xz",
			"debugdata_duplicate_section"
		];
		BUILD_ID_REASONS = [
			"note_tables_malformed",
			"note_tables_unsupported",
			"multiple_build_ids",
			"build_id_exceeds_limit"
		];
		LOOKUP_KINDS = [
			"build_id",
			"debug_subdirectory",
			"global_debug_directory",
			"alt_build_id"
		];
		CANDIDATE_SECTION_STATUSES = [
			"present",
			"absent",
			"unknown",
			"not_elf"
		];
		CHECK_STATUSES = [
			"match",
			"mismatch",
			"unavailable"
		];
		BUILD_ID_CHECK_REASONS = [
			"binary_build_id_absent",
			"binary_build_id_unknown",
			"binary_build_id_conflict",
			"candidate_not_elf",
			"candidate_build_id_absent",
			"candidate_build_id_unknown",
			"candidate_build_id_conflict",
			"candidate_elf_malformed",
			"candidate_unreadable"
		];
		VERIFICATION_REASONS = [
			"crc32_mismatch",
			"build_id_mismatch",
			"crc32_and_build_id_mismatch",
			"no_comparable_identity",
			"candidate_unreadable"
		];
		inspectElfDebugLinkInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to an ELF32/ELF64 image"),
			candidate_path: absoluteLocalPathStringSchema.optional().describe("Optional absolute path of one caller-selected file to verify against the debuglink CRC32 and GNU build-id"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_ELF_DEBUG_LINK_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_entries: z.number().int().min(1).max(256).default(128).describe("Maximum note entries to examine while reading GNU build-ids; an image exceeding the budget fails without partial success, and a candidate exceeding it leaves its build-id check unavailable")
		});
		debuglinkSchema = z.strictObject({
			status: sectionStatus$1,
			location: range$3.nullable(),
			filename: untrustedName.nullable(),
			crc32_hex: crc32Hex.nullable(),
			reason: z.enum(DEBUGLINK_REASONS).nullable()
		});
		debugaltlinkSchema = z.strictObject({
			status: sectionStatus$1,
			location: range$3.nullable(),
			filename: untrustedName.nullable(),
			build_id_hex: buildIdHex.nullable(),
			reason: z.enum(ALT_REASONS).nullable()
		});
		debugdataSchema = z.strictObject({
			status: sectionStatus$1,
			location: range$3.nullable(),
			xz_magic: z.boolean().nullable(),
			reason: z.enum(DEBUGDATA_REASONS).nullable()
		});
		buildIdSourceSchema = z.strictObject({
			hex: buildIdHex,
			table_kind: z.enum(["program", "section"]),
			table_index: uint$5,
			note: range$3,
			descriptor: range$3
		});
		buildIdSchema = z.strictObject({
			status: z.enum([
				"observed",
				"absent",
				"unknown",
				"conflict"
			]),
			hex: buildIdHex.nullable(),
			ids: z.array(buildIdHex),
			sources: z.array(buildIdSourceSchema),
			reason: z.enum(BUILD_ID_REASONS).nullable()
		});
		lookupPathSchema = z.strictObject({
			kind: z.enum(LOOKUP_KINDS),
			path: z.string().min(1),
			trust: z.literal("observed-untrusted")
		});
		candidateSchema = z.strictObject({
			path: z.string().min(1),
			sha256: digestSchema,
			bytes: uint$5,
			format: z.enum(["elf32", "elf64"]).nullable(),
			byte_order: z.enum(["little", "big"]).nullable(),
			debug_info: z.enum(CANDIDATE_SECTION_STATUSES),
			symtab: z.enum(CANDIDATE_SECTION_STATUSES)
		});
		crc32CheckSchema = z.strictObject({
			status: z.enum(CHECK_STATUSES),
			expected_hex: crc32Hex.nullable(),
			observed_hex: crc32Hex.nullable(),
			reason: z.enum(["debuglink_crc_absent", "candidate_unreadable"]).nullable()
		});
		buildIdCheckSchema = z.strictObject({
			status: z.enum(CHECK_STATUSES),
			binary_hex: buildIdHex.nullable(),
			candidate_hex: buildIdHex.nullable(),
			reason: z.enum(BUILD_ID_CHECK_REASONS).nullable()
		});
		verificationSchema = z.strictObject({
			status: z.enum([
				"matches",
				"does_not_match",
				"cannot_verify"
			]),
			reason: z.enum(VERIFICATION_REASONS).nullable(),
			crc32: crc32CheckSchema,
			build_id: buildIdCheckSchema
		});
		elfDebugLinkSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint$5
			}),
			format: z.enum(["elf32", "elf64"]),
			byte_order: z.enum(["little", "big"]),
			machine: uint$5,
			type: uint$5,
			type_name: z.enum(ELF_OBJECT_TYPE_NAMES),
			debuglink: debuglinkSchema,
			debugaltlink: debugaltlinkSchema,
			debugdata: debugdataSchema,
			build_id: buildIdSchema,
			lookup_paths: z.array(lookupPathSchema),
			candidate: candidateSchema.nullable(),
			verification: verificationSchema.nullable(),
			coverage: z.strictObject({
				status: coverageStatusSchema,
				examined_sections: uint$5
			}),
			limitations: z.array(z.string())
		});
		debugFileNameIsSingleSegment = (name) => name !== "." && name !== ".." && /^[^/\\]+$/u.test(name);
		buildIdDirectoryPath = (hex) => {
			if (hex === null || !/^(?:[0-9a-f]{2})+$/u.test(hex)) return null;
			return `${GNU_DEBUG_DIRECTORY}/.build-id/${hex.slice(0, 2)}/${hex.slice(2)}.debug`;
		};
		imageDirectory = (binaryPath) => {
			const drive = /^([A-Za-z]):[\\/]/u.exec(binaryPath);
			const windows = drive !== null || binaryPath.startsWith("\\");
			const slash = windows ? Math.max(binaryPath.lastIndexOf("/"), binaryPath.lastIndexOf("\\")) : binaryPath.lastIndexOf("/");
			const directory = slash <= 0 ? "" : binaryPath.slice(0, slash);
			if (!windows) return {
				directory,
				separator: "/",
				globalRelative: directory.slice(1)
			};
			const letter = drive?.[1];
			const rest = letter === undefined ? directory : directory.slice(2);
			const segments = rest.split(/[\\/]+/u).filter((part) => part.length > 0);
			return {
				directory,
				separator: "\\",
				globalRelative: [...letter === undefined ? [] : [letter], ...segments].join("/")
			};
		};
		deriveDebugFileLookupPaths = (input) => {
			const paths = [];
			const buildId = buildIdDirectoryPath(input.buildIdHex);
			if (buildId !== null) paths.push({
				kind: "build_id",
				path: buildId,
				trust: "observed-untrusted"
			});
			if (input.debuglinkName !== null && debugFileNameIsSingleSegment(input.debuglinkName)) {
				const { directory, separator, globalRelative } = imageDirectory(input.binaryPath);
				const name = input.debuglinkName;
				paths.push({
					kind: "debug_subdirectory",
					path: `${directory}${separator}.debug${separator}${name}`,
					trust: "observed-untrusted"
				});
				paths.push({
					kind: "global_debug_directory",
					path: globalRelative.length === 0 ? `${GNU_DEBUG_DIRECTORY}/${name}` : `${GNU_DEBUG_DIRECTORY}/${globalRelative}/${name}`,
					trust: "observed-untrusted"
				});
			}
			const alt = buildIdDirectoryPath(input.altBuildIdHex);
			if (alt !== null) paths.push({
				kind: "alt_build_id",
				path: alt,
				trust: "observed-untrusted"
			});
			return paths;
		};
	})))();
}

//#endregion
//#region dist/domain/native/nativeInitializers.js
var MAX_INSPECT_NATIVE_INITIALIZERS_FILE_BYTES, MAX_NATIVE_INITIALIZER_ENTRIES, DEFAULT_NATIVE_INITIALIZER_PAGE, MAX_NATIVE_INITIALIZER_PAGE, MAX_NATIVE_INITIALIZER_NAME_BYTES, MAX_NATIVE_INITIALIZER_NOTES, MAX_NATIVE_INITIALIZER_LIMITATIONS, uint$4, safeNonNegative, hexAddress$1, NATIVE_INITIALIZER_KINDS, NATIVE_INITIALIZER_RESOLUTIONS, inspectNativeInitializersInputSchema, untrustedNameSchema, entrySchema$1, coverageSchema$1, sliceSchema, NATIVE_INITIALIZER_LIMITATIONS, artifactSchema, nativeInitializersSchema;
function init_nativeInitializers() {
	return (init_nativeInitializers = __esmMin((() => {
		init_coverage();
		init_machoTargetSelection();
		init_binaryTargetTypes();
		init_digests();
		init_localPath();
		MAX_INSPECT_NATIVE_INITIALIZERS_FILE_BYTES = 536870912;
		MAX_NATIVE_INITIALIZER_ENTRIES = 65536;
		DEFAULT_NATIVE_INITIALIZER_PAGE = 64;
		MAX_NATIVE_INITIALIZER_PAGE = 4096;
		MAX_NATIVE_INITIALIZER_NAME_BYTES = 1024;
		MAX_NATIVE_INITIALIZER_NOTES = 24;
		MAX_NATIVE_INITIALIZER_LIMITATIONS = 40;
		uint$4 = z.number().int().min(0).max(4294967295);
		safeNonNegative = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
		hexAddress$1 = z.string().regex(/^0x[0-9a-f]+$/u);
		NATIVE_INITIALIZER_KINDS = [
			"preinit_array",
			"init",
			"init_array",
			"ctors",
			"fini",
			"fini_array",
			"dtors",
			"mod_init",
			"init_offsets",
			"mod_term"
		];
		NATIVE_INITIALIZER_RESOLUTIONS = [
			"raw",
			"relative_addend",
			"relr",
			"chained_fixup",
			"dyld_info_rebase",
			"offset_table",
			"symbol_addend",
			"unresolved_import",
			"unresolved"
		];
		inspectNativeInitializersInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to an ELF or Mach-O image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_NATIVE_INITIALIZERS_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			offset: z.number().int().min(0).max(MAX_NATIVE_INITIALIZER_ENTRIES).default(0).describe("Zero-based index of the first returned entry"),
			limit: z.number().int().min(1).max(MAX_NATIVE_INITIALIZER_PAGE).default(DEFAULT_NATIVE_INITIALIZER_PAGE).describe("Maximum entries to return (default 64, max 4096)"),
			architecture: machoSliceArchitectureSchema.optional()
		});
		untrustedNameSchema = z.strictObject({
			name: z.string().min(1).max(MAX_NATIVE_INITIALIZER_NAME_BYTES),
			trust: z.literal("observed-untrusted")
		});
		entrySchema$1 = z.strictObject({
			index: uint$4,
			kind: z.enum(NATIVE_INITIALIZER_KINDS),
			slot_va: hexAddress$1.nullable(),
			slot_file_offset: safeNonNegative.nullable(),
			slot_bytes: z.union([z.literal(4), z.literal(8)]),
			value_va: hexAddress$1.nullable(),
			value_file_offset: safeNonNegative.nullable(),
			slot_section: untrustedNameSchema.nullable(),
			section: untrustedNameSchema.nullable(),
			symbol: untrustedNameSchema.nullable(),
			resolution: z.enum(NATIVE_INITIALIZER_RESOLUTIONS),
			detail: z.string().min(1).max(MAX_NATIVE_INITIALIZER_NAME_BYTES).nullable()
		});
		coverageSchema$1 = z.strictObject({
			/**
			* `partial` when declared slots or names were examined but not reported
			* (budgets, unreadable arrays, withheld names); `unknown` when whether the
			* listed facts are complete cannot be determined (relocation, fixup, symbol
			* or mapping coverage, an unterminated dynamic table).
			*/
			status: coverageStatusSchema,
			examined_entries: z.number().int().min(0).max(MAX_NATIVE_INITIALIZER_ENTRIES),
			total_entries: z.number().int().min(0).max(MAX_NATIVE_INITIALIZER_ENTRIES).nullable(),
			returned_entries: z.number().int().min(0).max(MAX_NATIVE_INITIALIZER_PAGE),
			offset: z.number().int().min(0).max(MAX_NATIVE_INITIALIZER_ENTRIES),
			limit: z.number().int().min(1).max(MAX_NATIVE_INITIALIZER_PAGE)
		});
		sliceSchema = z.strictObject({
			file_offset: safeNonNegative,
			size: safeNonNegative.min(1),
			cpu_type: z.number().int(),
			cpu_subtype: z.number().int(),
			architecture: z.string().min(1)
		});
		NATIVE_INITIALIZER_LIMITATIONS = [
			"This inspection does not execute the image and does not prove that a listed address runs before main or at exit.",
			"A missing dynamic tag or section is observed absence of that declaration, not proof that no constructor exists in code.",
			"Symbol and section names are exact file text and are untrusted. A resolved address is named only when a defined symbol value equals that address. An unresolved import keeps the relocation symbol name.",
			"PIE and shared-object slots are resolved through RELATIVE and RELR dynamic relocations, and through section REL or RELA records when no dynamic relocation covers the slot. Other relocation kinds stay unresolved.",
			".ctors and .dtors values 0 and -1 are sentinels and are omitted. Those sections are listed in file order, not reverse runtime order.",
			"DT_FINI is listed before fini_array. The dynamic linker runs fini_array first at exit.",
			"Mach-O __init_offsets entries are 32-bit offsets from the image base, not pointers. Chained binds are unresolved imports."
		];
		artifactSchema = z.strictObject({
			path: absoluteLocalPathStringSchema,
			sha256: digestSchema,
			bytes: z.number().int().min(0).max(MAX_INSPECT_NATIVE_INITIALIZERS_FILE_BYTES)
		});
		nativeInitializersSchema = z.strictObject({
			artifact: artifactSchema,
			format: z.enum(["elf", "mach-o"]),
			status: z.enum(["parsed", "incomplete"]),
			applicability: z.literal("applicable"),
			architecture: z.enum(BINARY_ARCHITECTURES).exclude([...RAW_ONLY_ARCHITECTURES]).nullable(),
			bits: z.union([z.literal(32), z.literal(64)]).nullable(),
			byte_order: z.enum(["little", "big"]).nullable(),
			machine: uint$4.nullable(),
			elf_type: uint$4.nullable(),
			slice: sliceSchema.nullable(),
			coverage: coverageSchema$1,
			entries: z.array(entrySchema$1),
			limitations: z.array(z.string().min(1)).max(MAX_NATIVE_INITIALIZER_LIMITATIONS)
		});
	})))();
}

//#endregion
//#region dist/domain/native/elfUnwindRanges.js
var uint$3, hexAddress, decimalSize, range$2, MAX_INSPECT_ELF_UNWIND_FILE_BYTES, MAX_INSPECT_ELF_UNWIND_RANGES, MAX_INSPECT_ELF_UNWIND_PAGE, MAX_ELF_UNWIND_SYMBOLS, MAX_ELF_UNWIND_SYMBOL_TEXT_BYTES, ELF_UNWIND_LIMITATIONS, FORMAT_NAMES, APPLICATION_NAMES, elfEhPointerEncodingName, untrustedText, untrustedAugmentation, encodingSchema, tableStatus, inspectElfUnwindRangesInputSchema, cieSchema, functionRangeSchema, elfUnwindRangesSchema;
function init_elfUnwindRanges() {
	return (init_elfUnwindRanges = __esmMin((() => {
		init_coverage();
		init_digests();
		init_localPath();
		init_elfNotes();
		uint$3 = z.number().int().min(0).max(4294967295);
		hexAddress = z.string().regex(/^0x[0-9a-f]+$/u);
		decimalSize = z.string().regex(/^(?:0|[1-9][0-9]*)$/u);
		range$2 = z.strictObject({
			offset: uint$3,
			bytes: uint$3
		});
		MAX_INSPECT_ELF_UNWIND_FILE_BYTES = 536870912;
		MAX_INSPECT_ELF_UNWIND_RANGES = 65536;
		MAX_INSPECT_ELF_UNWIND_PAGE = 4096;
		MAX_ELF_UNWIND_SYMBOLS = 65536;
		MAX_ELF_UNWIND_SYMBOL_TEXT_BYTES = 16 * 1024 * 1024;
		ELF_UNWIND_LIMITATIONS = {
			cfa: "CFA instructions are counted but not evaluated.",
			untrusted: "Symbol names, section names, and augmentation strings are target-derived and untrusted.",
			indirect: "Indirect EH pointers were not dereferenced.",
			headerMismatch: "The .eh_frame_hdr binary search table does not match the decoded FDEs.",
			frameAbsent: "No .eh_frame section or PT_GNU_EH_FRAME segment was declared.",
			headerAbsent: "No .eh_frame_hdr section or PT_GNU_EH_FRAME segment was declared.",
			debugPresent: ".debug_frame is present and was not decoded.",
			debugAbsent: ".debug_frame is absent; only .eh_frame was examined.",
			debugUnknown: ".debug_frame presence is unknown.",
			debugOutside: ".debug_frame is declared but its bytes are not in the file; it was not examined."
		};
		FORMAT_NAMES = {
			0: "absptr",
			1: "uleb128",
			2: "udata2",
			3: "udata4",
			4: "udata8",
			9: "sleb128",
			10: "sdata2",
			11: "sdata4",
			12: "sdata8"
		};
		APPLICATION_NAMES = {
			16: "pcrel",
			32: "textrel",
			48: "datarel",
			64: "funcrel",
			80: "aligned"
		};
		elfEhPointerEncodingName = (raw) => {
			const encoding = raw & 255;
			if (encoding === 255) return "omit";
			const format = FORMAT_NAMES[encoding & 15] ?? `unknown${(encoding & 15).toString(16)}`;
			const application = encoding & 112;
			const parts = [];
			if (application !== 0) parts.push(APPLICATION_NAMES[application] ?? `unknown${application.toString(16)}`);
			parts.push(format);
			if ((encoding & 128) !== 0) parts.push("indirect");
			return parts.join("|");
		};
		untrustedText = z.strictObject({
			text: z.string().min(1),
			trust: z.literal("untrusted")
		});
		untrustedAugmentation = z.strictObject({
			text: z.string(),
			trust: z.literal("untrusted")
		});
		encodingSchema = z.strictObject({
			raw: z.number().int().min(0).max(255),
			name: z.string().min(1)
		});
		tableStatus = z.enum([
			"present",
			"absent",
			"incomplete",
			"unknown"
		]);
		inspectElfUnwindRangesInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to an ELF image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_ELF_UNWIND_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_ranges: z.number().int().min(1).max(MAX_INSPECT_ELF_UNWIND_RANGES).default(8192).describe("Maximum CIE records and, separately, maximum FDEs to decode; exceeding either budget fails without partial success"),
			offset: z.number().int().min(0).max(4294967295).default(0).describe("Zero-based index of the first FDE range to return"),
			limit: z.number().int().min(1).max(MAX_INSPECT_ELF_UNWIND_PAGE).default(256).describe("Maximum FDE ranges to return in this page")
		});
		cieSchema = z.strictObject({
			index: uint$3,
			version: z.union([z.literal(1), z.literal(3)]),
			augmentation: untrustedAugmentation,
			code_alignment: z.number().int().nonnegative(),
			data_alignment: z.number().int(),
			return_address_register: z.number().int().nonnegative(),
			pointer_encoding: encodingSchema,
			lsda_encoding: encodingSchema.nullable(),
			personality: z.strictObject({
				address: hexAddress,
				encoding: encodingSchema,
				indirect: z.boolean()
			}).nullable(),
			signal_frame: z.boolean(),
			b_key: z.boolean(),
			instruction_bytes: uint$3,
			location: range$2
		});
		functionRangeSchema = z.strictObject({
			index: uint$3,
			start: hexAddress,
			end: hexAddress,
			size: decimalSize,
			section: untrustedText.nullable(),
			symbol: untrustedText.nullable(),
			cie_index: uint$3,
			lsda: z.strictObject({
				address: hexAddress,
				indirect: z.boolean()
			}).nullable(),
			personality: z.strictObject({
				address: hexAddress,
				indirect: z.boolean()
			}).nullable(),
			location: range$2
		});
		elfUnwindRangesSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint$3
			}),
			format: z.enum(["elf32", "elf64"]),
			byte_order: z.enum(["little", "big"]),
			machine: uint$3,
			type: uint$3,
			type_name: z.enum(ELF_OBJECT_TYPE_NAMES),
			eh_frame: z.strictObject({
				status: tableStatus,
				source: z.enum(["section", "program"]).nullable(),
				location: range$2.nullable()
			}),
			eh_frame_hdr: z.strictObject({
				status: tableStatus,
				location: range$2.nullable(),
				version: uint$3.nullable(),
				eh_frame_pointer_encoding: encodingSchema.nullable(),
				fde_count_encoding: encodingSchema.nullable(),
				table_encoding: encodingSchema.nullable(),
				eh_frame_pointer: hexAddress.nullable(),
				fde_count: uint$3.nullable(),
				table_entries: uint$3
			}),
			debug_frame: z.strictObject({
				/** `incomplete`: declared, but NOBITS or outside the file. */
				status: z.enum([
					"present",
					"absent",
					"incomplete",
					"unknown"
				]),
				location: range$2.nullable()
			}),
			/** Decoded CIEs named by this page's ranges, in index order. */
			cies: z.array(cieSchema),
			ranges: z.array(functionRangeSchema),
			page: z.strictObject({
				offset: uint$3,
				limit: uint$3,
				returned: uint$3,
				total: uint$3,
				next_offset: uint$3.nullable()
			}),
			coverage: z.strictObject({
				status: knownCoverageStatusSchema,
				total_ranges: uint$3,
				/** Every decoded CIE, including ones this page does not return. */
				total_cies: uint$3,
				ranges_with_symbols: uint$3,
				ranges_without_symbols: uint$3,
				eh_frame_hdr_agreement: z.enum([
					"agree",
					"disagree",
					"unavailable"
				]),
				examined_records: uint$3
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/native/appleIps.js
var uint$2, recordedIntegerSchema, MAX_INSPECT_APPLE_IPS_FILE_BYTES, MAX_INSPECT_APPLE_IPS_THREADS, MAX_INSPECT_APPLE_IPS_FRAMES, MAX_INSPECT_APPLE_IPS_IMAGES, MAX_INSPECT_APPLE_IPS_JOIN_BYTES, MAX_INSPECT_APPLE_IPS_REGISTERS, DEFAULT_INSPECT_APPLE_IPS_INTEGER_TEXT_BYTES, MAX_INSPECT_APPLE_IPS_INTEGER_TEXT_BYTES, APPLE_IPS_IMAGE_SOURCES, APPLE_IPS_IMAGE_SOURCE_MEANING, inspectAppleIpsInputSchema, uuidSchema, metadataSchema, exceptionSchema, terminationSchema, registerSchema, frameSchema, threadSchema, imageSchema, classificationMatchSchema, typeMismatchSchema, coverageSchema, imageJoinMatchSchema, frameJoinSchema, joinSchema, osVersionSchema, appleIpsSchema, appleIpsIntegerTextBytes, appleIpsReportIntegerTextBytes;
function init_appleIps() {
	return (init_appleIps = __esmMin((() => {
		init_coverage();
		init_digests();
		init_localPath();
		uint$2 = z.number().int().min(0).max(4294967295);
		recordedIntegerSchema = z.strictObject({
			decimal: z.string().regex(/^-?(?:0|[1-9][0-9]*)$/u),
			hex: z.string().regex(/^0x[0-9a-f]+$/u).nullable()
		});
		MAX_INSPECT_APPLE_IPS_FILE_BYTES = 16777216;
		MAX_INSPECT_APPLE_IPS_THREADS = 4096;
		MAX_INSPECT_APPLE_IPS_FRAMES = 65536;
		MAX_INSPECT_APPLE_IPS_IMAGES = 4096;
		MAX_INSPECT_APPLE_IPS_JOIN_BYTES = 256 * 1024 * 1024;
		MAX_INSPECT_APPLE_IPS_REGISTERS = 262144;
		DEFAULT_INSPECT_APPLE_IPS_INTEGER_TEXT_BYTES = 8 * 1024 * 1024;
		MAX_INSPECT_APPLE_IPS_INTEGER_TEXT_BYTES = 64 * 1024 * 1024;
		APPLE_IPS_IMAGE_SOURCES = [
			"P",
			"S",
			"C",
			"K",
			"U",
			"T",
			"A"
		];
		APPLE_IPS_IMAGE_SOURCE_MEANING = {
			P: "process",
			S: "shared cache",
			C: "shared cache library",
			K: "kernel",
			U: "kernel cache",
			T: "kernel text exec",
			A: "absolute"
		};
		inspectAppleIpsInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to an Apple .ips crash report"),
			max_file_bytes: z.number().int().min(2).max(MAX_INSPECT_APPLE_IPS_FILE_BYTES).default(1048576).describe("Maximum stable artifact bytes to read (default 1 MiB)"),
			max_threads: z.number().int().min(1).max(MAX_INSPECT_APPLE_IPS_THREADS).default(256).describe("Maximum threads to examine; exceeding the budget fails without partial success"),
			max_frames: z.number().int().min(1).max(MAX_INSPECT_APPLE_IPS_FRAMES).default(8192).describe("Maximum frames across every thread; exceeding the budget fails without partial success"),
			max_images: z.number().int().min(1).max(MAX_INSPECT_APPLE_IPS_IMAGES).default(1024).describe("Maximum usedImages rows to examine; exceeding the budget fails without partial success"),
			max_registers: z.number().int().min(1).max(MAX_INSPECT_APPLE_IPS_REGISTERS).default(16384).describe("Maximum threadState register slots across every thread; exceeding the budget fails without partial success"),
			max_integer_text_bytes: z.number().int().min(1).max(MAX_INSPECT_APPLE_IPS_INTEGER_TEXT_BYTES).default(DEFAULT_INSPECT_APPLE_IPS_INTEGER_TEXT_BYTES).describe("Conservative UTF-16 byte allowance for all retained decimal/hex integer text, including derived addresses (default 8 MiB, maximum 64 MiB); checked before conversion and allocation"),
			join_path: absoluteLocalPathStringSchema.optional().describe("Optional Mach-O executable or dSYM matched by slice LC_UUID and architecture; shared-cache images remain unjoined"),
			max_join_bytes: z.number().int().min(2).max(MAX_INSPECT_APPLE_IPS_JOIN_BYTES).default(67108864).describe("Maximum stable artifact bytes read from join_path (default 64 MiB)")
		});
		uuidSchema = z.string().regex(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/u);
		metadataSchema = z.strictObject({
			bug_type: z.literal("309"),
			timestamp: z.string().nullable(),
			os_version: z.string().nullable(),
			bundle_id: z.string().nullable(),
			incident_id: z.string().nullable(),
			name: z.string().nullable(),
			build_version: z.string().nullable(),
			platform: recordedIntegerSchema.nullable(),
			unlisted_keys: z.array(z.string())
		});
		exceptionSchema = z.strictObject({
			type: z.string().nullable(),
			signal: z.string().nullable(),
			subtype: z.string().nullable(),
			codes: z.string().nullable(),
			message: z.string().nullable(),
			unlisted_keys: z.array(z.string())
		}).nullable();
		terminationSchema = z.strictObject({
			namespace: z.string().nullable(),
			code: recordedIntegerSchema.nullable(),
			indicator: z.string().nullable(),
			flags: recordedIntegerSchema.nullable(),
			by_pid: recordedIntegerSchema.nullable(),
			by_proc: z.string().nullable(),
			reasons: z.array(z.string()).nullable(),
			unlisted_keys: z.array(z.string())
		}).nullable();
		registerSchema = z.strictObject({
			name: z.string(),
			value: recordedIntegerSchema,
			description: z.string().nullable()
		});
		frameSchema = z.strictObject({
			thread_index: uint$2,
			frame_index: uint$2,
			image_index: uint$2.nullable().describe("Recorded index into images; image metadata and its uncertainty belong to that row."),
			image_offset: recordedIntegerSchema.nullable(),
			runtime_address: recordedIntegerSchema.nullable(),
			role: z.enum([
				"faulting_instruction",
				"current_instruction",
				"return_address",
				"unknown"
			]),
			inline: z.boolean().nullable(),
			recorded_symbol: z.string().nullable(),
			symbol_location: recordedIntegerSchema.nullable().describe("Recorded byte offset of the address from the start of recorded_symbol."),
			unlisted_keys: z.array(z.string()).optional()
		});
		threadSchema = z.strictObject({
			index: uint$2,
			id: recordedIntegerSchema.nullable(),
			triggered: z.boolean().nullable(),
			name: z.string().nullable(),
			queue: z.string().nullable(),
			frames: z.array(frameSchema),
			state_flavor: z.string().nullable(),
			registers: z.array(registerSchema),
			unlisted_keys: z.array(z.string()).optional()
		});
		imageSchema = z.strictObject({
			index: uint$2,
			source: z.string().nullable(),
			source_meaning: z.string().min(1).nullable(),
			arch: z.string().nullable(),
			base: recordedIntegerSchema.nullable(),
			size: recordedIntegerSchema.nullable(),
			uuid: uuidSchema.nullable(),
			uuid_unknown: z.boolean(),
			name: z.string().nullable(),
			path: z.string().nullable(),
			unlisted_keys: z.array(z.string()).optional()
		});
		classificationMatchSchema = z.strictObject({
			rule: z.enum([
				"watchdog",
				"dead10cc",
				"thermal",
				"guarded_file_descriptor",
				"guarded_mach_port",
				"possible_pointer_authentication_failure",
				"dyld_missing_library"
			]),
			fields: z.array(z.strictObject({
				name: z.string().min(1),
				value: z.string().min(1)
			}))
		});
		typeMismatchSchema = z.strictObject({
			path: z.string().min(1),
			expected: z.string().min(1),
			observed: z.string().min(1),
			recorded_value: z.string().exactOptional().describe("Exact source spelling when a string fails its documented format"),
			recorded_integer: z.string().regex(/^-?(?:0|[1-9][0-9]*)$/u).exactOptional().describe("Exact decimal literal of a rejected integer lookup; charged to the integer text allowance")
		});
		coverageSchema = z.strictObject({
			status: knownCoverageStatusSchema,
			reason: z.string().min(1).nullable(),
			threads: uint$2,
			frames: uint$2,
			images: uint$2,
			registers: uint$2,
			type_mismatches: z.array(typeMismatchSchema)
		});
		imageJoinMatchSchema = z.strictObject({
			image_index: uint$2,
			uuid: uuidSchema,
			recorded_arch: z.string().nullable(),
			slice_index: uint$2,
			slice_offset: z.string().regex(/^(?:0|[1-9][0-9]*)$/u),
			slice_arch: z.string().min(1),
			text_vmaddr: recordedIntegerSchema,
			runtime_base: recordedIntegerSchema.nullable()
		});
		frameJoinSchema = z.strictObject({
			thread_index: uint$2,
			frame_index: uint$2,
			status: z.enum(["joined", "unjoined"]),
			reason: z.string().min(1).nullable().describe("Why the frame's image did not join the selected artifact."),
			static_address: recordedIntegerSchema.nullable().describe("Slice __TEXT vmaddr plus the frame's recorded imageOffset.")
		});
		joinSchema = z.discriminatedUnion("status", [z.strictObject({
			status: z.literal("selected"),
			path: z.string().min(1),
			sha256: digestSchema,
			bytes: uint$2,
			slices: z.array(z.strictObject({
				index: uint$2,
				offset: z.string().regex(/^(?:0|[1-9][0-9]*)$/u),
				arch: z.string().min(1),
				cpu_type: z.string().min(1),
				cpu_subtype: z.string().min(1),
				uuid: uuidSchema.nullable(),
				text_vmaddr: recordedIntegerSchema.nullable(),
				unexamined: z.array(z.string().min(1))
			})),
			image_matches: z.array(imageJoinMatchSchema),
			frames: z.array(frameJoinSchema),
			limitations: z.array(z.string().min(1))
		}), z.strictObject({
			status: z.literal("unreadable"),
			path: z.string().min(1),
			sha256: digestSchema,
			bytes: uint$2,
			reason: z.string().min(1)
		})]);
		osVersionSchema = z.discriminatedUnion("form", [z.strictObject({
			form: z.literal("text"),
			text: z.string()
		}), z.strictObject({
			form: z.literal("structured"),
			train: z.string().nullable(),
			build: z.string().nullable(),
			release_type: z.string().nullable(),
			is_embedded: z.boolean().nullable(),
			unlisted_keys: z.array(z.string())
		})]).nullable();
		appleIpsSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint$2
			}),
			metadata: metadataSchema,
			process: z.strictObject({
				name: z.string().nullable(),
				path: z.string().nullable(),
				pid: recordedIntegerSchema.nullable(),
				parent: z.string().nullable(),
				parent_pid: recordedIntegerSchema.nullable(),
				cpu_type: z.string().nullable(),
				translated: z.boolean().nullable(),
				os_version: osVersionSchema
			}),
			exception: exceptionSchema,
			termination: terminationSchema,
			faulting_thread: uint$2.nullable(),
			threads: z.array(threadSchema),
			images: z.array(imageSchema),
			classification: z.discriminatedUnion("status", [z.strictObject({
				status: z.literal("classified"),
				matches: z.array(classificationMatchSchema).min(1)
			}), z.strictObject({
				status: z.literal("unclassified"),
				matches: z.array(classificationMatchSchema).max(0)
			})]),
			coverage: coverageSchema,
			unlisted_body_keys: z.array(z.string()),
			join: joinSchema.nullable(),
			limitations: z.array(z.string().min(1))
		});
		appleIpsIntegerTextBytes = (value) => value === null ? 0 : 2 * (value.decimal.length + (value.hex?.length ?? 0));
		appleIpsReportIntegerTextBytes = (report) => {
			let bytes = appleIpsIntegerTextBytes(report.metadata.platform) + appleIpsIntegerTextBytes(report.process.pid) + appleIpsIntegerTextBytes(report.process.parent_pid) + appleIpsIntegerTextBytes(report.termination?.code ?? null) + appleIpsIntegerTextBytes(report.termination?.flags ?? null) + appleIpsIntegerTextBytes(report.termination?.by_pid ?? null);
			for (const image of report.images) bytes += appleIpsIntegerTextBytes(image.base) + appleIpsIntegerTextBytes(image.size);
			for (const thread of report.threads) {
				bytes += appleIpsIntegerTextBytes(thread.id);
				for (const register of thread.registers) bytes += appleIpsIntegerTextBytes(register.value);
				for (const frame of thread.frames) bytes += appleIpsIntegerTextBytes(frame.image_offset) + appleIpsIntegerTextBytes(frame.runtime_address) + appleIpsIntegerTextBytes(frame.symbol_location);
			}
			for (const mismatch of report.coverage.type_mismatches) bytes += 2 * (mismatch.recorded_integer?.length ?? 0);
			if (report.join?.status === "selected") {
				for (const slice of report.join.slices) bytes += 2 * (slice.offset.length + slice.cpu_type.length + slice.cpu_subtype.length) + appleIpsIntegerTextBytes(slice.text_vmaddr);
				for (const match of report.join.image_matches) bytes += 2 * match.slice_offset.length + appleIpsIntegerTextBytes(match.text_vmaddr) + appleIpsIntegerTextBytes(match.runtime_base);
				for (const frame of report.join.frames) bytes += appleIpsIntegerTextBytes(frame.static_address);
			}
			return bytes;
		};
	})))();
}

//#endregion
//#region dist/domain/native/kernelModule.js
var uint$1, uint8, range$1, hex, MAX_INSPECT_KERNEL_MODULE_FILE_BYTES, MAX_INSPECT_KERNEL_MODULE_ENTRIES, DEFAULT_KERNEL_MODULE_KEY_BYTES, DEFAULT_KERNEL_MODULE_VALUE_BYTES, kernelModuleModinfoLimit, MAX_KERNEL_MODULE_SECTION_NAME_BYTES, MAX_KERNEL_MODULE_RAW_BYTES, KERNEL_MODULE_VERSION_ENTRY_BYTES, MODULE_SIGNATURE_INFO_BYTES, MODULE_SIGNATURE_MAGIC, MODULE_SIGNATURE_PKCS7_ID_TYPE, KERNEL_MODULE_APPLICABILITY, KERNEL_MODULE_MODINFO_ENTRY_REASONS, KERNEL_MODULE_MODINFO_SECTION_REASONS, KERNEL_MODULE_VERSION_ENTRY_REASONS, KERNEL_MODULE_VERSION_SECTION_REASONS, KERNEL_MODULE_KSYMTAB_SECTION_REASONS, KERNEL_MODULE_SIGNATURE_REASONS, KERNEL_MODULE_VERSION_LAYOUTS, sectionStatus, entryStatus, modinfoEntrySchema, modinfoSchema, versionEntrySchema, versionsSchema, thisModuleSchema, sizedSectionSchema, ksymtabSchema, signatureInfoSchema, signatureSchema, inspectKernelModuleInputSchema, kernelModuleSchema;
function init_kernelModule() {
	return (init_kernelModule = __esmMin((() => {
		init_coverage();
		init_analysisSettingDefinitions();
		init_digests();
		init_fixedTupleSchema();
		init_localPath();
		init_elfNotes();
		uint$1 = z.number().int().min(0).max(4294967295);
		uint8 = z.number().int().min(0).max(255);
		range$1 = z.strictObject({
			offset: uint$1,
			bytes: uint$1
		});
		hex = z.string().regex(/^[0-9a-f]*$/u);
		MAX_INSPECT_KERNEL_MODULE_FILE_BYTES = 536870912;
		MAX_INSPECT_KERNEL_MODULE_ENTRIES = 65536;
		DEFAULT_KERNEL_MODULE_KEY_BYTES = 256;
		DEFAULT_KERNEL_MODULE_VALUE_BYTES = 4096;
		kernelModuleModinfoLimit = (field, selectedBytes) => ({
			control_kind: "parameter",
			parameter: `max_modinfo_${field}_bytes`,
			effective_value: selectedBytes,
			unit: "bytes",
			minimum: 1,
			maximum: MAX_INSPECT_KERNEL_MODULE_FILE_BYTES,
			default_value: field === "key" ? 256 : DEFAULT_KERNEL_MODULE_VALUE_BYTES,
			applies_at: "next_call"
		});
		MAX_KERNEL_MODULE_SECTION_NAME_BYTES = 256;
		MAX_KERNEL_MODULE_RAW_BYTES = 4096;
		KERNEL_MODULE_VERSION_ENTRY_BYTES = 64;
		MODULE_SIGNATURE_INFO_BYTES = 12;
		MODULE_SIGNATURE_MAGIC = "~Module signature appended~\n";
		MODULE_SIGNATURE_PKCS7_ID_TYPE = 2;
		KERNEL_MODULE_APPLICABILITY = [
			"applicable",
			"not_applicable",
			"unsupported"
		];
		KERNEL_MODULE_MODINFO_ENTRY_REASONS = [
			"unterminated_modinfo_entry",
			"modinfo_missing_separator",
			"modinfo_empty_key"
		];
		KERNEL_MODULE_MODINFO_SECTION_REASONS = ["modinfo_section_compressed", "modinfo_section_not_file_backed"];
		KERNEL_MODULE_VERSION_ENTRY_REASONS = ["version_name_unterminated"];
		KERNEL_MODULE_VERSION_SECTION_REASONS = [
			"versions_size_not_multiple",
			"versions_section_compressed",
			"versions_section_not_file_backed"
		];
		KERNEL_MODULE_KSYMTAB_SECTION_REASONS = ["ksymtab_name_exceeds_limit"];
		KERNEL_MODULE_SIGNATURE_REASONS = [
			"signature_trailer_truncated",
			"signature_length_inconsistent",
			"signature_parameters_nonzero",
			"signature_id_type_not_pkcs7"
		];
		KERNEL_MODULE_VERSION_LAYOUTS = ["elf32_unsigned_long_name60", "elf64_unsigned_long_name56"];
		sectionStatus = z.enum([
			"present",
			"absent",
			"unknown",
			"malformed",
			"unsupported"
		]);
		entryStatus = z.enum(["observed", "malformed"]);
		modinfoEntrySchema = z.strictObject({
			index: uint$1,
			location: range$1,
			key: z.string().nullable(),
			value: z.string().nullable(),
			raw_sha256: digestSchema,
			raw_hex: hex.nullable(),
			status: entryStatus,
			reason: z.enum(KERNEL_MODULE_MODINFO_ENTRY_REASONS).nullable(),
			omitted_fields: z.array(z.enum(["key", "value"])).max(2).default([]).describe("Fields omitted by retention policy, independently of structural status/reason")
		});
		modinfoSchema = z.strictObject({
			status: sectionStatus,
			location: range$1.nullable(),
			sha256: digestSchema.nullable(),
			entries: z.array(modinfoEntrySchema),
			reason: z.enum(KERNEL_MODULE_MODINFO_SECTION_REASONS).nullable(),
			/** The request parameters that omitted key or value text, when any did. */
			omission_limits: z.array(analysisParameterLimitSchema).min(1).max(2).exactOptional()
		});
		versionEntrySchema = z.strictObject({
			index: uint$1,
			location: range$1,
			crc_hex: z.string().regex(/^(?:[0-9a-f]{8}|[0-9a-f]{16})$/u),
			name: z.string().nullable(),
			status: entryStatus,
			reason: z.enum(KERNEL_MODULE_VERSION_ENTRY_REASONS).nullable()
		});
		versionsSchema = z.strictObject({
			status: sectionStatus,
			layout: z.enum(KERNEL_MODULE_VERSION_LAYOUTS).nullable(),
			entry_bytes: z.literal(64).nullable(),
			location: range$1.nullable(),
			sha256: digestSchema.nullable(),
			entries: z.array(versionEntrySchema),
			reason: z.enum(KERNEL_MODULE_VERSION_SECTION_REASONS).nullable()
		});
		thisModuleSchema = z.strictObject({
			status: z.enum([
				"present",
				"absent",
				"unknown",
				"unsupported"
			]),
			location: range$1.nullable(),
			/** `struct module` changes with the kernel version and is not decoded. */
			layout: z.literal("unknown")
		});
		sizedSectionSchema = z.strictObject({
			status: z.enum([
				"present",
				"absent",
				"unknown"
			]),
			location: range$1.nullable(),
			/** Observed file-backed size. Null when the section is not file-backed. */
			bytes: uint$1.nullable(),
			compressed: z.boolean().nullable()
		});
		ksymtabSchema = z.strictObject({
			status: z.enum(["observed", "unknown"]),
			sections: z.array(z.strictObject({
				name: z.string().min(1).max(256).nullable(),
				location: range$1,
				compressed: z.boolean(),
				reason: z.enum(KERNEL_MODULE_KSYMTAB_SECTION_REASONS).nullable()
			}))
		});
		signatureInfoSchema = z.strictObject({
			location: range$1,
			algo: uint8,
			hash: uint8,
			id_type: uint8,
			signer_len: uint8,
			key_id_len: uint8,
			pad: fixedTupleSchema([
				uint8,
				uint8,
				uint8
			]),
			sig_len: uint$1
		});
		signatureSchema = z.strictObject({
			status: z.enum([
				"absent",
				"present",
				"malformed",
				"unsupported"
			]),
			magic: range$1.nullable(),
			info: signatureInfoSchema.nullable(),
			pkcs7: z.strictObject({
				location: range$1,
				sha256: digestSchema
			}).nullable(),
			reason: z.enum(KERNEL_MODULE_SIGNATURE_REASONS).nullable()
		});
		inspectKernelModuleInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to an ELF kernel module or a compressed .ko container"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_KERNEL_MODULE_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_entries: z.number().int().min(1).max(MAX_INSPECT_KERNEL_MODULE_ENTRIES).default(8192).describe("Maximum .modinfo and __versions entries plus file-backed __ksymtab* sections to examine; exceeding the budget fails without partial success"),
			max_modinfo_key_bytes: z.int().min(1).max(MAX_INSPECT_KERNEL_MODULE_FILE_BYTES).default(256).describe("Maximum bytes retained per .modinfo key (default 256). Larger keys stay valid when their syntax is valid, with key null and omitted_fields naming key. Raise on the next call to retain them; no restart. Does not raise input, entry or raw-hex budgets."),
			max_modinfo_value_bytes: z.int().min(1).max(MAX_INSPECT_KERNEL_MODULE_FILE_BYTES).default(DEFAULT_KERNEL_MODULE_VALUE_BYTES).describe("Maximum bytes retained per .modinfo value (default 4096). Larger values stay valid when their syntax is valid, with value null and omitted_fields naming value. Raise on the next call to retain them; no restart. Does not raise input, entry or raw-hex budgets.")
		});
		kernelModuleSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint$1
			}),
			format: z.enum(["elf32", "elf64"]).nullable(),
			byte_order: z.enum(["little", "big"]).nullable(),
			machine: uint$1.nullable(),
			type: uint$1.nullable(),
			type_name: z.enum(ELF_OBJECT_TYPE_NAMES).nullable(),
			applicability: z.enum(KERNEL_MODULE_APPLICABILITY),
			compression: z.strictObject({
				codec: z.enum([
					"gzip",
					"xz",
					"zstd"
				]),
				status: z.literal("unsupported")
			}).nullable(),
			next_probe: z.strictObject({
				operation: z.literal("external_decompression").describe("External decompression with a codec utility, not a REA tool"),
				rationale: z.string().min(1)
			}).nullable(),
			modinfo: modinfoSchema.nullable(),
			versions: versionsSchema.nullable(),
			this_module: thisModuleSchema.nullable(),
			ksymtab: ksymtabSchema.nullable(),
			init_text: sizedSectionSchema.nullable(),
			exit_text: sizedSectionSchema.nullable(),
			signature: signatureSchema.nullable(),
			coverage: z.strictObject({
				status: z.enum([
					...knownCoverageStatusSchema.options,
					"not_applicable",
					"unsupported"
				]).describe("Whether the supported inspection examined the declared facts; omitted or undecodable facts make coverage partial."),
				examined_entries: uint$1
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/native/kernelBuildConfig.js
var uint, MAX_INSPECT_KERNEL_BUILD_CONFIG_FILE_BYTES, MAX_INSPECT_KERNEL_BUILD_CONFIG_ENTRIES, MAX_INSPECT_KERNEL_BUILD_CONFIG_CONFIG_BYTES, MAX_INSPECT_KERNEL_BUILD_CONFIG_PAYLOAD_BYTES, MAX_INSPECT_KERNEL_BUILD_CONFIG_PAGE, KERNEL_BUILD_CONFIG_CODECS, KERNEL_BUILD_CONFIG_VALUE_KINDS, KERNEL_BUILD_CONFIG_MALFORMED_REASONS, KERNEL_BUILD_CONFIG_REASONS, range, KERNEL_BUILD_CONFIG_NUMBER, KERNEL_BUILD_CONFIG_MARKER_BYTES, entrySchema, bannerSchema, payloadSchema, inspectKernelBuildConfigInputSchema, kernelBuildConfigSchema;
function init_kernelBuildConfig() {
	return (init_kernelBuildConfig = __esmMin((() => {
		init_coverage();
		init_digests();
		init_localPath();
		uint = z.number().int().min(0).max(4294967295);
		MAX_INSPECT_KERNEL_BUILD_CONFIG_FILE_BYTES = 536870912;
		MAX_INSPECT_KERNEL_BUILD_CONFIG_ENTRIES = 65536;
		MAX_INSPECT_KERNEL_BUILD_CONFIG_CONFIG_BYTES = 33554432;
		MAX_INSPECT_KERNEL_BUILD_CONFIG_PAYLOAD_BYTES = 536870912;
		MAX_INSPECT_KERNEL_BUILD_CONFIG_PAGE = 4096;
		KERNEL_BUILD_CONFIG_CODECS = [
			"gzip",
			"xz",
			"lz4",
			"lzma",
			"zstd",
			"bzip2",
			"lzo"
		];
		KERNEL_BUILD_CONFIG_VALUE_KINDS = [
			"y",
			"m",
			"string",
			"number",
			"not_set"
		];
		KERNEL_BUILD_CONFIG_MALFORMED_REASONS = ["config_gzip_invalid", "config_text_invalid"];
		KERNEL_BUILD_CONFIG_REASONS = [
			...KERNEL_BUILD_CONFIG_MALFORMED_REASONS,
			"config_gzip_truncated",
			"config_search_exhausted",
			"payload_truncated",
			"payload_gzip_invalid",
			"payload_codec_unsupported",
			"unrecognized_payload_codec",
			"setup_header_payload_unavailable"
		];
		range = z.strictObject({
			/** `file` is a range in the selected image. `inflated_payload` is a range in the inflated bzImage payload. */
			space: z.enum(["file", "inflated_payload"]),
			offset: uint,
			bytes: uint
		});
		KERNEL_BUILD_CONFIG_NUMBER = /^(?:-(?:0|[1-9][0-9]*)|(?:0[xX])?[0-9A-Fa-f]+)$/u;
		KERNEL_BUILD_CONFIG_MARKER_BYTES = 8;
		entrySchema = z.strictObject({
			name: z.string().regex(/^CONFIG_[A-Za-z0-9_]+$/u),
			kind: z.enum(KERNEL_BUILD_CONFIG_VALUE_KINDS),
			/** Null only for `not_set`. Strings are the decoded quoted text. */
			value: z.string().nullable(),
			trust: z.literal("target-derived-untrusted")
		});
		bannerSchema = z.strictObject({
			status: z.enum([
				"present",
				"absent",
				"unknown"
			]),
			text: z.string().nullable(),
			version: z.string().nullable(),
			builder: z.string().nullable(),
			compiler: z.string().nullable(),
			location: range.nullable(),
			trust: z.literal("target-derived-untrusted")
		});
		payloadSchema = z.strictObject({
			container: z.enum(["file", "bzimage"]),
			codec: z.enum(KERNEL_BUILD_CONFIG_CODECS).nullable(),
			status: z.enum([
				"uncompressed",
				"inflated",
				"unsupported",
				"truncated",
				"malformed",
				"unavailable"
			]),
			/** File offset of a bzImage payload, or 0 for a whole-file codec. Null when the file itself was searched. */
			offset: uint.nullable(),
			bytes: uint.nullable(),
			inflated_bytes: uint.nullable()
		});
		inspectKernelBuildConfigInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a vmlinux ELF, raw arm64 Image, x86 bzImage/zImage, or configs.ko module"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_KERNEL_BUILD_CONFIG_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_entries: z.number().int().min(1).max(MAX_INSPECT_KERNEL_BUILD_CONFIG_ENTRIES).default(16384).describe("Maximum CONFIG_* options to examine; exceeding the budget fails without partial success"),
			max_config_bytes: z.number().int().min(64).max(MAX_INSPECT_KERNEL_BUILD_CONFIG_CONFIG_BYTES).default(4194304).describe("Maximum inflated bytes of one IKCFG gzip member (default 4 MiB)"),
			max_payload_bytes: z.number().int().min(64).max(MAX_INSPECT_KERNEL_BUILD_CONFIG_PAYLOAD_BYTES).default(134217728).describe("Maximum inflated bytes of a bzImage gzip payload (default 128 MiB)"),
			offset: z.number().int().min(0).max(MAX_INSPECT_KERNEL_BUILD_CONFIG_ENTRIES).default(0).describe("Number of matching CONFIG_* options to skip"),
			limit: z.number().int().min(1).max(MAX_INSPECT_KERNEL_BUILD_CONFIG_PAGE).default(256).describe("Maximum CONFIG_* options to return in this page"),
			name: z.string().regex(/^CONFIG_[A-Za-z0-9_]+$/u).optional().describe("Exact CONFIG_* name to return. Omitted returns every option in the page")
		});
		kernelBuildConfigSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint
			}),
			format: z.enum(["elf", "file"]),
			payload: payloadSchema,
			next_probe: z.strictObject({
				operation: z.literal("external_decompression").describe("External decompression with a codec utility, not a REA tool"),
				rationale: z.string().min(1)
			}).nullable(),
			banner: bannerSchema,
			config: z.strictObject({
				status: z.enum([
					"present",
					"absent",
					"malformed",
					"incomplete",
					"unsupported"
				]),
				reason: z.enum(KERNEL_BUILD_CONFIG_REASONS).nullable(),
				marker: range.nullable(),
				end_marker: range.nullable(),
				gzip: range.nullable(),
				sha256: digestSchema.nullable(),
				/** CONFIG_* options in the accepted config, before the name filter and page. */
				option_count: uint,
				/** Options selected by the name filter, before the page. */
				matched_count: uint,
				offset: uint,
				limit: uint,
				name: z.string().regex(/^CONFIG_[A-Za-z0-9_]+$/u).nullable(),
				entries: z.array(entrySchema)
			}),
			coverage: z.strictObject({
				/**
				* `partial` when the config is known to extend past what was examined (a
				* gzip member cut by the searched bytes, or the candidate budget stopping
				* the search); `unknown` when whether a config exists or what it holds
				* cannot be determined (an unreadable payload that was not searched, or a
				* malformed config); `unsupported` for a payload codec REA does not inflate.
				*/
				status: z.enum([...coverageStatusSchema.options, "unsupported"]),
				examined_bytes: uint,
				examined_entries: uint
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/contracts/native/binaryDiagnosticsToolContracts.js
var inspectBinaryLayoutRequestSchema, inspectNativeExportsRequestSchema, inspectElfDependenciesRequestSchema, inspectByteEntropyRequestSchema, BINARY_DIAGNOSTICS_TOOL_CONTRACTS;
function init_binaryDiagnosticsToolContracts() {
	return (init_binaryDiagnosticsToolContracts = __esmMin((() => {
		init_devicetree();
		init_analysisViewResult();
		init_peLoadConfig();
		init_binaryHardening();
		init_byteEntropy();
		init_toolOutputSchemaGroups();
		init_recordedCrash();
		init_binaryLayout();
		init_analysisDetail();
		init_nativeExports();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		init_peResources();
		init_peCertificates();
		init_peImports();
		init_elfNotes();
		init_dwarfUnits();
		init_elfDebugLink();
		init_nativeInitializers();
		init_elfUnwindRanges();
		init_appleIps();
		init_kernelModule();
		init_elfDependencies();
		init_kernelBuildConfig();
		init_windowsShortcut();
		inspectBinaryLayoutRequestSchema = inspectBinaryLayoutInputSchema.extend({ detail: analysisDetailSchema });
		inspectNativeExportsRequestSchema = inspectNativeExportsInputSchema.extend({ detail: analysisDetailSchema });
		inspectElfDependenciesRequestSchema = inspectElfDependenciesInputSchema.extend({ detail: analysisDetailSchema });
		inspectByteEntropyRequestSchema = inspectByteEntropyInputSchema.extend({ detail: analysisDetailSchema });
		BINARY_DIAGNOSTICS_TOOL_CONTRACTS = [
			{
				name: "inspect_devicetree",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_devicetree", evidenceEffects),
				kind: "native-provider",
				description: "Inspect an explicit local flattened devicetree blob (FDT v16/v17) without execution or external tools. Returns validated header, memory reservations, full node/property tree with bounded raw hex, derived standard strings, cells and parent-sized reg tuples, aliases and selected single-cell phandle references with unresolved targets. Binding-specific arrays, overlays and runtime hardware remain unknown. Malformed structure or exhausted named budgets fails without partial success. Complete detail returns all Evidence inline; summary retains it for inspect_analysis_view kind devicetree, collections nodes, properties (requires exact path), reservations and references, with offset/limit pagination.",
				inputSchema: inspectDevicetreeInputSchema.extend({ detail: analysisDetailSchema }),
				outputSchema: analysisDetailOutputSchemaOf(devicetreeSchema, devicetreeSummaryViewResultSchema),
				examples: [{
					title: "Inspect a firmware hardware description",
					input: {
						path: "/artifacts/board.dtb",
						detail: "summary"
					}
				}]
			},
			{
				name: "inspect_pe_load_config",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_pe_load_config", evidenceEffects),
				kind: "native-provider",
				description: "Inspect PE32/PE32+ TLS callbacks and sized load configuration without executing the image. Returns callback VA/RVA/file offsets and sections, security cookie, SafeSEH (PE32), CFG flags and table pointers/counts, EH continuation and XFG fields. Flag-derived mitigation claims are labeled inferred. Absent directories are null; malformed structures and exhausted budgets fail without partial success. Reads a stable local regular file without a disassembler.",
				inputSchema: inspectPeLoadConfigInputSchema,
				outputSchema: evidenceResultOf(peLoadConfigSchema),
				examples: [{
					title: "Inspect PE TLS callbacks and load configuration",
					input: { path: "/artifacts/program" }
				}]
			},
			{
				name: "inspect_binary_hardening",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_binary_hardening", evidenceEffects),
				kind: "native-provider",
				description: "Inspect static hardening declarations in a local ELF, PE or Mach-O, including every universal slice. Reports PIE/ASLR, NX, RELRO, stack-protector/FORTIFY signs, control-flow flags and stripped state with supporting header/import facts. Missing signs may be unknown, especially for static/stripped images. Signature presence does not establish validity; use inspect_signature for Mach-O hardened runtime. No target execution or exploitability claim. Malformed headers/budgets may fail; limited symbol/property-note reads retain header facts and mark affected rows unknown.",
				inputSchema: inspectBinaryHardeningInputSchema,
				outputSchema: evidenceResultOf(binaryHardeningSchema),
				examples: [{
					title: "Inspect binary hardening",
					input: { path: "/artifacts/program" }
				}]
			},
			{
				name: "inspect_native_initializers",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_native_initializers", evidenceEffects),
				kind: "native-provider",
				description: "List declared initializer/finalizer functions in a local ELF32/64 or selected Mach-O slice without execution. Returns paged slots and resolved target addresses/file offsets, sections, exact symbols and resolution basis from dynamic tags, constructor sections, relocations and fixups. Unestablished slots remain unresolved, never treated as stored zero targets. Missing declarations do not prove no code runs before main.",
				inputSchema: inspectNativeInitializersInputSchema,
				outputSchema: evidenceResultOf(nativeInitializersSchema),
				examples: [{
					title: "List ELF or Mach-O static constructors and finalizers",
					input: { path: "/artifacts/program" }
				}]
			},
			{
				name: "inspect_elf_notes",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_elf_notes", evidenceEffects),
				kind: "native-provider",
				description: "Inspect one explicit local ELF32/ELF64 image's PT_NOTE program headers and SHT_NOTE sections without executing it or opening a disassembler. Returns note-table file ranges, owners, types, descriptor SHA-256 and hex previews, plus GNU build-id, ABI-tag and gold-version fields, Linux CORE process, mapping, signal, and auxv notes, Android .note.android.ident API-level and NDK version/build fields, and unverified FDO packaging and dlopen declarations when those descriptors match. A missing table is observed absence of those declarations, not proof the image never carried notes in another container. Reads a stable regular file. Malformed ELF structure and exhausted table-walk budgets return no partial success. An invalid or over-budget FDO descriptor retains raw note evidence with a decoding issue. Portable on supported Node hosts; no debug package or catalog is required.",
				inputSchema: inspectElfNotesInputSchema,
				outputSchema: evidenceResultOf(elfNotesSchema),
				examples: [{
					title: "Inspect ELF note tables",
					input: { path: "/artifacts/program" }
				}]
			},
			{
				name: "inspect_dwarf_units",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_dwarf_units", evidenceEffects),
				kind: "native-provider",
				description: "Inspect DWARF 2 through 5 compile-unit headers and the unit DIE in one explicit local ELF, Mach-O, or PE image without executing the image or opening a disassembler. Reads .debug_info, .debug_abbrev, .debug_str, .debug_line_str, and .debug_str_offsets, including compressed ELF sections. Returns name, comp_dir, producer, language, and dwo_name with file offsets, paged by offset and limit. A unit that cannot be framed, or a declared .debug_info that was not read, gives partial coverage. Absent .debug_info applies to this file only and does not establish that a separate debug file is absent. Child DIEs, types, line tables, and location expressions are not read. A .dSYM bundle is not opened; pass the DWARF file inside it. Universal Mach-O requires architecture.",
				inputSchema: inspectDwarfUnitsInputSchema,
				outputSchema: evidenceResultOf(dwarfUnitsSchema),
				examples: [{
					title: "Inspect DWARF compile units",
					input: { path: "/artifacts/program" }
				}]
			},
			{
				name: "inspect_elf_debug_link",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_elf_debug_link", evidenceEffects),
				kind: "native-provider",
				description: "Inspect one explicit local ELF32/ELF64 image for separate debug-file linkage without executing it or opening a disassembler. Returns .gnu_debuglink file name and CRC32, .gnu_debugaltlink file name and build-id, the GNU build-id, conventional lookup path strings, and .gnu_debugdata presence, file offset, and size. An optional candidate_path verifies that one caller-selected file by debuglink CRC32 and build-id equality. The verdict is matches, does_not_match, or cannot_verify. Lookup paths are not opened. The xz MiniDebugInfo payload is not decoded. A missing section is observed absence only when section names are complete, not proof the image never carried that linkage. Reads stable regular files; malformed ELF headers and exhausted note budgets return no partial success. Portable on supported Node hosts.",
				inputSchema: inspectElfDebugLinkInputSchema,
				outputSchema: evidenceResultOf(elfDebugLinkSchema),
				examples: [{
					title: "Inspect ELF separate debug-file linkage",
					input: { path: "/artifacts/program" }
				}, {
					title: "Verify one caller-selected debug file",
					input: {
						path: "/artifacts/program",
						candidate_path: "/artifacts/program.debug"
					}
				}]
			},
			{
				name: "inspect_elf_unwind_ranges",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_elf_unwind_ranges", evidenceEffects),
				kind: "native-provider",
				description: "Inspect ELF32/64 .eh_frame and .eh_frame_hdr for paged FDE function ranges, associated CIE facts, LSDA/personality pointers, symbol matches and search-table agreement. No execution or disassembler. Missing unwind declarations do not prove no functions; truncated records remain incomplete. .debug_frame is detected but not decoded, CFA instructions are not evaluated, and indirect EH pointers are not dereferenced. Malformed headers or exhausted CIE/FDE budgets fail without partial success.",
				inputSchema: inspectElfUnwindRangesInputSchema,
				outputSchema: evidenceResultOf(elfUnwindRangesSchema),
				examples: [{
					title: "List function ranges from ELF unwind tables",
					input: { path: "/artifacts/program" }
				}]
			},
			{
				name: "inspect_apple_ips",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_apple_ips", evidenceEffects),
				kind: "native-provider",
				description: "Inspect a local Apple .ips crash report for process, exception/termination, thread, image and lossless register facts with deterministic classification. Crash parsing supports bug_type string 309; other types, including 288 stackshots, return no crash result. join_path derives static addresses only when image UUID and architecture match a Mach-O slice; it does not symbolicate or read dSYMs. Missing/truncated bodies fail without partial success. No target execution, atos, disassembler or Xcode required.",
				inputSchema: inspectAppleIpsInputSchema,
				outputSchema: evidenceResultOf(appleIpsSchema),
				examples: [{
					title: "Inspect an Apple .ips crash report",
					input: { path: "/artifacts/app.ips" }
				}, {
					title: "Join report frames to the crashed Mach-O",
					input: {
						path: "/artifacts/app.ips",
						join_path: "/artifacts/App.app/Contents/MacOS/App"
					}
				}]
			},
			{
				name: "inspect_kernel_module",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_kernel_module", evidenceEffects),
				kind: "native-provider",
				description: "Inspect an uncompressed local ELF32/64 ET_REL Linux kernel module for ordered .modinfo entries, symbol CRCs, module/export/init/exit section facts and appended signature ranges/digests. No execution, struct module decoding or certificate validation. Missing known sections describe this image only. gzip/xz/zstd require external decompression; extract_artifact does not decode those module containers. Malformed headers or exhausted entry budgets fail without partial success. Portable on supported Node hosts.",
				inputSchema: inspectKernelModuleInputSchema,
				outputSchema: evidenceResultOf(kernelModuleSchema),
				examples: [{
					title: "Inspect Linux kernel module license, vermagic, and dependencies",
					input: { path: "/artifacts/demo.ko" }
				}]
			},
			{
				name: "inspect_elf_dependencies",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_elf_dependencies", evidenceEffects),
				kind: "native-provider",
				description: "Inspect one explicit local ELF32/ELF64 ET_EXEC or ET_DYN image's load-time dynamic dependencies without executing it, invoking the dynamic loader, or opening a disassembler. Returns ordered DT_NEEDED libraries (duplicates preserved), DT_SONAME, DT_RPATH and DT_RUNPATH as written including $ORIGIN/$LIB/$PLATFORM tokens, decoded DT_FLAGS and DT_FLAGS_1, PT_INTERP, GNU version requirements and definitions, derived per-namespace version maxima, and undefined .dynsym imports joined to library@version when known. A missing PT_DYNAMIC is an observed empty inventory. Relocatable objects use inspect_kernel_module; core dumps use inspect_recorded_crash. Reads a stable regular file; cyclic version chains and exhausted named budgets return no partial success. Unreadable strings or missing tables are reported as partial coverage with issues; complete coverage never retains issues. Omitted/complete detail preserves inline delivery. Select detail summary to retain complete Evidence and return identity, counts and source coverage. Query inspect_analysis_view kind elf-dependencies, collection needed, versions, definitions, maxima or imports, with exact names/original indices, fields and matching-row pagination; collection issues takes original indices and pagination only. Portable on supported Node hosts.",
				inputSchema: inspectElfDependenciesRequestSchema,
				outputSchema: analysisDetailOutputSchemaOf(elfDependenciesSchema, elfDependenciesSummaryViewResultSchema),
				examples: [{
					title: "Inspect ELF needed libraries and required symbol versions",
					input: { path: "/artifacts/program" }
				}]
			},
			{
				name: "inspect_kernel_build_config",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_kernel_build_config", evidenceEffects),
				kind: "native-provider",
				description: "Inspect a local Linux kernel image (vmlinux, raw arm64 Image, x86 bzImage/zImage or configs.ko) for the version/builder/compiler banner and embedded CONFIG_IKCONFIG. Returns config digest/count and paged, optionally exact-name-filtered CONFIG_* values. Only validated marker-framed gzip config is accepted; a literal marker is insufficient. Supported gzip bzImage payloads are searched; other compressed payloads require external decompression. Truncation is incomplete, not absence; budget exhaustion fails without partial success. No target execution or external tools.",
				inputSchema: inspectKernelBuildConfigInputSchema,
				outputSchema: evidenceResultOf(kernelBuildConfigSchema),
				examples: [{
					title: "Read a kernel image's version banner and embedded build config",
					input: { path: "/artifacts/vmlinux" }
				}, {
					title: "Check one security option in an embedded kernel config",
					input: {
						path: "/artifacts/bzImage",
						name: "CONFIG_SECURITY_SELINUX"
					}
				}]
			},
			{
				name: "inspect_byte_entropy",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_byte_entropy", evidenceEffects),
				kind: "native-provider",
				description: "Inspect Shannon byte entropy for one explicit local file offline, without execution, extraction or external tools. Returns file-wide SHA-256 and entropy, fixed-block entropy for an optional offset/length window, and adjacent high (>=7.2) and low (<=1.0) runs with exact file offsets. Block size is a power of two from 256 to 65536 (default 4096). Complete output can become very large because it includes one row per selected block, and summary detail still retains that full list. Use a shorter length or a larger block_size; the selected window is limited to 32,768 output blocks. Entropy cannot distinguish compression from encryption. Summary detail returns file entropy plus the ten longest runs; retrieve parent Evidence for the full series. The entire file is read even for a window.",
				inputSchema: inspectByteEntropyRequestSchema,
				outputSchema: byteEntropyOutputSchema,
				examples: [{
					title: "Profile firmware bytes before extraction",
					input: { path: "/artifacts/firmware.bin" }
				}, {
					title: "Summarize a selected byte window",
					input: {
						path: "/artifacts/firmware.bin",
						offset: 4096,
						length: 65536,
						block_size: 4096,
						detail: "summary"
					}
				}]
			},
			{
				name: "inspect_pe_certificates",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_pe_certificates", evidenceEffects),
				kind: "native-provider",
				description: "Inspect a local PE32/PE32+ certificate directory without executing it or verifying signatures. Returns WIN_CERTIFICATE ranges/types/digests and structurally decoded PKCS#7 signer, algorithm and X.509 identity fields when present. Missing directory does not establish globally unsigned status. Authenticode digest coverage, trust chains and timestamp validity remain unobserved. Malformed/truncated structures and unsupported PKCS#7 signed-data shapes fail without partial success. No Windows SDK or disassembler required.",
				inputSchema: inspectPeCertificatesInputSchema,
				outputSchema: evidenceResultOf(peCertificatesSchema),
				examples: [{
					title: "Inspect PE Authenticode certificate identities",
					input: { path: "/artifacts/application.exe" }
				}]
			},
			{
				name: "inspect_pe_imports",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_pe_imports", evidenceEffects),
				kind: "native-provider",
				description: "Inspect local PE32/PE32+ standard and delay-load imports without execution. Returns DLL/named/ordinal imports, ILT/IAT RVAs, descriptors and a pefile-compatible standard-table import hash only when its row sequence is complete and comparable. Missing declarations do not establish no API use; loaded IAT, bound snapshots and forward resolution remain unknown. Unreadable names/thunks or missing tables yield partial coverage; malformed headers or exhausted budgets fail. No Windows SDK or disassembler required.",
				inputSchema: inspectPeImportsInputSchema,
				outputSchema: evidenceResultOf(peImportsSchema),
				examples: [{
					title: "Inspect PE import and delay-load identities",
					input: { path: "/artifacts/application.exe" }
				}]
			},
			{
				name: "inspect_windows_shortcut",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_windows_shortcut", evidenceEffects),
				kind: "native-provider",
				description: "Inspect a local Windows Shell Link (.lnk) without resolving or executing its target, COM, or network access. Returns header/time/display facts, target-ID/link-info paths, arguments, working directory/icon and ExtraData observations, with raw hashes for unknown structures. Tracker and behavioral observations are derived. Malformed structures, odd Unicode lengths or exhausted budgets return typed failures or explicitly partial coverage with the failing offset. No Windows SDK required.",
				inputSchema: inspectWindowsShortcutInputSchema,
				outputSchema: evidenceResultOf(windowsShortcutSchema),
				examples: [{
					title: "Inspect a Windows Shell Link shortcut",
					input: { path: "/artifacts/shortcut.lnk" }
				}]
			},
			{
				name: "inspect_pe_resources",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_pe_resources", evidenceEffects),
				kind: "native-provider",
				description: "Inspect a local PE32/PE32+ resource tree without execution: type/name/language identities, empty branches, UTF-16 names, payload RVA/file ranges/digests and static group-icon candidates. Language fallback, image decoding and actual UI loading remain unknown. Malformed/ambiguous mappings, non-identical overlaps or exhausted budgets fail without partial success. No Windows SDK or disassembler required.",
				inputSchema: inspectPeResourcesInputSchema,
				outputSchema: evidenceResultOf(peResourcesSchema),
				examples: [{
					title: "Inspect PE resource identities and icon relationships",
					input: { path: "/artifacts/application.exe" }
				}]
			},
			{
				name: "inspect_native_exports",
				availability: "standalone",
				cli: true,
				...toolContractMetadata("inspect_native_exports", evidenceEffects),
				kind: "native-provider",
				description: "Inspect PE/ELF exports without execution or an analysis engine; use inspect_macho for Mach-O. Returns named/ordinal/forwarded PE exports or defined ELF dynamic symbols with binding/type/version, preserving aliases, hidden versions and raw-name qualifications. Unreadable entries are partial; unavailable ELF section metadata can make enumeration unsupported. An empty complete inventory means no declared exports. detail summary retains full Evidence for inspect_analysis_view kind native-exports, collection exports/issues, with exact names/indices, fields and paging; source_index is parent-scoped.",
				inputSchema: inspectNativeExportsRequestSchema,
				outputSchema: analysisDetailOutputSchemaOf(nativeExportsSchema, nativeExportsSummaryViewResultSchema),
				examples: [{
					title: "List a native library's exports",
					input: { path: "/artifacts/native/libexample.so" }
				}]
			},
			{
				name: "inspect_binary_layout",
				availability: { host: "binaryLayout" },
				cli: true,
				...toolContractMetadata("inspect_binary_layout", toolEffects({
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true
				})),
				kind: "native-provider",
				description: "Inspect static ELF section/segment, symbol, relocation, linkage and mitigation facts with artifact SHA-256 Evidence, without launching the image. Linux x64 requires caller-supplied pwntools 4.15.0/pyelftools 0.33/Unicorn 2.1.2; supports ELF64 x86-64/little-endian AArch64 and ELF32 i386/little-endian ARM/little- or big-endian MIPS. Unicorn may emulate PLT instructions for derived maps. Runtime addresses/paths and complete relocation/GOT/PLT discovery remain unknown; RELR per-word locations/addends can be unknown. detail summary retains full Evidence for layout section/symbol/mitigation/linkage views. pwntools_timeout_ms bounds each command independently of producer_limits and inherited OS limits. Unsupported, malformed or oversized inputs fail without partial success.",
				inputSchema: inspectBinaryLayoutRequestSchema,
				outputSchema: analysisDetailOutputSchemaOf(binaryLayoutSchema, binaryLayoutSummaryViewResultSchema),
				examples: [{
					title: "Inspect ELF linked and file layout",
					input: { path: "/artifacts/application.elf" }
				}, {
					title: "Retain the complete layout and return its summary view",
					input: {
						path: "/artifacts/application.elf",
						detail: "summary"
					}
				}]
			},
			{
				name: "inspect_recorded_crash",
				availability: { host: "recordedCrash" },
				cli: true,
				...toolContractMetadata("inspect_recorded_crash", toolEffects({
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true
				})),
				kind: "native-provider",
				description: "Inspect a saved Linux ELF64 little-endian amd64/AArch64 core without launching its target or attaching to a live PID. Returns recorded segments, raw notes/ranges, thread registers and SIGINFO as digest-bound Evidence. Historical PIDs do not establish current identity; note coverage and signal/thread joins remain unknown. Optional caller-configured GDB/pwndbg adds core-only mapping candidates from the same snapshot; zero flags mean unknown permissions. Linux x64 requires the documented pwntools profile, with optional pwndbg 2026.09.15. No implicit executable/library pairing, command language or installation. pwntools_timeout_ms and producer_limits control independent per-command budgets; malformed or oversized input fails without partial success.",
				inputSchema: inspectRecordedCrashInputSchema,
				outputSchema: evidenceResultOf(recordedCrashSchema),
				examples: [{
					title: "Inspect recorded registers and signal evidence",
					input: { path: "/artifacts/crash.core" }
				}, {
					title: "Add core-only debugger mapping candidates",
					input: {
						path: "/artifacts/crash.core",
						include_debugger_context: true
					}
				}]
			}
		];
	})))();
}

//#endregion
export { APPLE_IPS_IMAGE_SOURCES, APPLE_IPS_IMAGE_SOURCE_MEANING, BINARY_DIAGNOSTICS_TOOL_CONTRACTS, BINARY_HARDENING_LIMITATIONS, DEFAULT_INSPECT_APPLE_IPS_INTEGER_TEXT_BYTES, DWARF_DECOMPRESSED_SECTION_ALLOWANCE, DWARF_SECTION_ROLES, ELF_DEBUG_LINK_CANDIDATE_BUDGET_LIMITATION, ELF_DEBUG_LINK_CANDIDATE_INCOMPLETE_LIMITATION, ELF_DEBUG_LINK_CANDIDATE_PREFIX_LIMITATION, ELF_DEBUG_LINK_CANDIDATE_UNREADABLE_LIMITATION, ELF_DEBUG_LINK_CANNOT_VERIFY_LIMITATION, ELF_DEBUG_LINK_LIMITATIONS, ELF_DEBUG_LINK_MULTIPLE_BUILD_IDS_LIMITATION, ELF_DEBUG_LINK_NAME_SEGMENT_LIMITATION, ELF_DEBUG_LINK_UNAVAILABLE_CHECK_LIMITATION, ELF_HARDENING_PROPERTIES, ELF_UNWIND_LIMITATIONS, KERNEL_BUILD_CONFIG_CODECS, KERNEL_BUILD_CONFIG_MALFORMED_REASONS, KERNEL_BUILD_CONFIG_NUMBER, MACHO_HARDENING_PROPERTIES, MAX_BINARY_HARDENING_SYMBOL_NAME_BYTES, MAX_BINARY_HARDENING_SYMBOL_SCAN_BYTES, MAX_BINARY_HARDENING_TABLE_ENTRIES, MAX_DWARF_ABBREV_ENTRIES, MAX_DWARF_DECOMPRESSED_SECTION_BYTES, MAX_DWARF_FORM_DECODE_STEPS, MAX_DWARF_STRING_BYTES, MAX_DWARF_UNITS, MAX_ELF_DEBUG_CANDIDATE_BYTES, MAX_ELF_DEBUG_LINK_NAME_BYTES, MAX_ELF_UNWIND_SYMBOLS, MAX_ELF_UNWIND_SYMBOL_TEXT_BYTES, MAX_INSPECT_APPLE_IPS_FILE_BYTES, MAX_INSPECT_APPLE_IPS_FRAMES, MAX_INSPECT_APPLE_IPS_IMAGES, MAX_INSPECT_APPLE_IPS_INTEGER_TEXT_BYTES, MAX_INSPECT_APPLE_IPS_JOIN_BYTES, MAX_INSPECT_APPLE_IPS_REGISTERS, MAX_INSPECT_APPLE_IPS_THREADS, MAX_INSPECT_BINARY_HARDENING_FILE_BYTES, MAX_INSPECT_DWARF_UNITS_FILE_BYTES, MAX_INSPECT_ELF_DEBUG_LINK_FILE_BYTES, MAX_INSPECT_ELF_UNWIND_FILE_BYTES, MAX_INSPECT_ELF_UNWIND_RANGES, MAX_INSPECT_KERNEL_BUILD_CONFIG_CONFIG_BYTES, MAX_INSPECT_KERNEL_BUILD_CONFIG_ENTRIES, MAX_INSPECT_KERNEL_BUILD_CONFIG_FILE_BYTES, MAX_INSPECT_KERNEL_BUILD_CONFIG_PAYLOAD_BYTES, MAX_INSPECT_KERNEL_MODULE_ENTRIES, MAX_INSPECT_KERNEL_MODULE_FILE_BYTES, MAX_INSPECT_NATIVE_INITIALIZERS_FILE_BYTES, MAX_INSPECT_PE_CERTIFICATE_FILE_BYTES, MAX_INSPECT_PE_IMPORT_DLLS, MAX_INSPECT_PE_IMPORT_FILE_BYTES, MAX_INSPECT_PE_IMPORT_FUNCTIONS, MAX_INSPECT_PE_IMPORT_RETAINED_TEXT_BYTES, MAX_INSPECT_PE_LOAD_CONFIG_CALLBACKS, MAX_INSPECT_PE_LOAD_CONFIG_FILE_BYTES, MAX_INSPECT_WINDOWS_SHORTCUT_EXTRA_DATA_BLOCKS, MAX_INSPECT_WINDOWS_SHORTCUT_FILE_BYTES, MAX_INSPECT_WINDOWS_SHORTCUT_ID_LIST_ITEMS, MAX_INSPECT_WINDOWS_SHORTCUT_STRING_BYTES, MAX_KERNEL_MODULE_RAW_BYTES, MAX_NATIVE_INITIALIZER_ENTRIES, MAX_NATIVE_INITIALIZER_NAME_BYTES, MODULE_SIGNATURE_MAGIC, NATIVE_INITIALIZER_LIMITATIONS, PE_HARDENING_PROPERTIES, PE_LOAD_CONFIG_LIMITATIONS, RECORDED_LINUX_CORE_PROFILES, TLS_STRUCT_BYTES, appleIpsIntegerTextBytes, appleIpsReportIntegerTextBytes, appleIpsSchema, binaryHardeningSchema, debugFileNameIsSingleSegment, deriveDebugFileLookupPaths, dwarfLanguageName, dwarfUnitsSchema, elfDebugLinkSchema, elfEhPointerEncodingName, elfUnwindRangesSchema, guardFlagRecord, hardeningPropertiesFor, init_appleIps, init_binaryDiagnosticsToolContracts, init_binaryHardening, init_dwarfUnits, init_elfDebugLink, init_elfUnwindRanges, init_kernelBuildConfig, init_kernelModule, init_nativeInitializers, init_peCertificates, init_peImports, init_peLoadConfig, init_recordedCrash, init_windowsShortcut, inspectAppleIpsInputSchema, inspectBinaryHardeningInputSchema, inspectDwarfUnitsInputSchema, inspectElfDebugLinkInputSchema, inspectElfUnwindRangesInputSchema, inspectKernelBuildConfigInputSchema, inspectKernelModuleInputSchema, inspectNativeInitializersInputSchema, inspectPeCertificatesInputSchema, inspectPeImportsInputSchema, inspectPeLoadConfigInputSchema, inspectRecordedCrashInputSchema, inspectWindowsShortcutInputSchema, isLinuxCoreNote, kernelBuildConfigSchema, kernelModuleModinfoLimit, kernelModuleSchema, loadConfigFieldCovered, loadConfigFieldLayout, nativeInitializersSchema, peCertificateTypeName, peCertificatesSchema, peImportsSchema, peLoadConfigSchema, recordedCrashDebuggerSchema, recordedCrashPayloadSchema, recordedCrashSchema, tlsAlignment, windowsShortcutSchema };