import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_jsonValue, init_localPath, jsonObjectSchema } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { z } from "zod";

//#region dist/domain/sourceMapLimits.js
var WEB_SOURCE_MAP_LIMITS, MAX_SOURCE_MAP_ENCODED_BYTES, MAX_RECORD_COUNT, MAX_CODEC_HEAP_MIB, bytes, count, sourceMapLimitsSchema, selectedSourceMapLimits, sourceMapLimitRecovery, sourceMapLimitSelection, localSourceMapLimitsSchema, fetchedSourceMapLimitsSchema;
function init_sourceMapLimits() {
	return (init_sourceMapLimits = __esmMin((() => {
		WEB_SOURCE_MAP_LIMITS = {
			mapBytes: 8 * 1024 * 1024,
			outputBytes: 32 * 1024 * 1024,
			decodedRows: 262144,
			decodedSegments: 262144,
			decodedRecords: 262144,
			sectionDepth: 64,
			decodeTimeoutMs: 2e4,
			codecHeapMiB: 192,
			fetchBytes: 64 * 1024 * 1024
		};
		MAX_SOURCE_MAP_ENCODED_BYTES = 536870887;
		MAX_RECORD_COUNT = 2147483647;
		MAX_CODEC_HEAP_MIB = 16384;
		bytes = z.int().min(1).max(MAX_SOURCE_MAP_ENCODED_BYTES);
		count = z.int().min(1).max(MAX_RECORD_COUNT);
		sourceMapLimitsSchema = z.strictObject({
			map_bytes: bytes.exactOptional().describe(`Local source-map byte admission; default ${String(WEB_SOURCE_MAP_LIMITS.mapBytes)}. Applies before reading and again in the codec.`),
			output_bytes: bytes.exactOptional().describe(`Complete encoded request/reply or fetched-map representation budget; default ${String(WEB_SOURCE_MAP_LIMITS.outputBytes)}.`),
			decoded_rows: count.exactOptional().describe(`Generated-row admission before codec allocation; default ${String(WEB_SOURCE_MAP_LIMITS.decodedRows)}.`),
			decoded_segments: count.exactOptional().describe(`Mapping-segment admission before codec allocation; default ${String(WEB_SOURCE_MAP_LIMITS.decodedSegments)}.`),
			decoded_records: count.exactOptional().describe(`Shared structural record admission, including declarations, rows, segments and sections; default ${String(WEB_SOURCE_MAP_LIMITS.decodedRecords)}.`),
			section_depth: count.exactOptional().describe(`Indexed-section nesting admission; default ${String(WEB_SOURCE_MAP_LIMITS.sectionDepth)}. Each retained section also consumes the shared structural-record budget.`),
			codec_heap_mib: z.int().min(128).max(MAX_CODEC_HEAP_MIB).exactOptional().describe(`Local codec old-generation heap request in MiB; default ${String(WEB_SOURCE_MAP_LIMITS.codecHeapMiB)}. Independent of byte/record budgets and client receive limits.`),
			fetch_bytes: bytes.exactOptional().describe(`Aggregate fetched response bytes and, independently, retained resolved-identity bytes; each defaults to ${String(WEB_SOURCE_MAP_LIMITS.fetchBytes)}.`)
		});
		selectedSourceMapLimits = (selected) => ({
			...WEB_SOURCE_MAP_LIMITS,
			mapBytes: selected?.map_bytes ?? WEB_SOURCE_MAP_LIMITS.mapBytes,
			outputBytes: selected?.output_bytes ?? WEB_SOURCE_MAP_LIMITS.outputBytes,
			decodedRows: selected?.decoded_rows ?? WEB_SOURCE_MAP_LIMITS.decodedRows,
			decodedSegments: selected?.decoded_segments ?? WEB_SOURCE_MAP_LIMITS.decodedSegments,
			decodedRecords: selected?.decoded_records ?? WEB_SOURCE_MAP_LIMITS.decodedRecords,
			sectionDepth: selected?.section_depth ?? WEB_SOURCE_MAP_LIMITS.sectionDepth,
			codecHeapMiB: selected?.codec_heap_mib ?? WEB_SOURCE_MAP_LIMITS.codecHeapMiB,
			fetchBytes: selected?.fetch_bytes ?? WEB_SOURCE_MAP_LIMITS.fetchBytes
		});
		sourceMapLimitRecovery = (field, value) => {
			const maximum = field === "codec_heap_mib" ? MAX_CODEC_HEAP_MIB : field.endsWith("bytes") ? MAX_SOURCE_MAP_ENCODED_BYTES : MAX_RECORD_COUNT;
			const minimum = field === "codec_heap_mib" ? 128 : 1;
			const unit = field === "codec_heap_mib" ? "MiB" : field.endsWith("bytes") ? "bytes" : field === "section_depth" ? "levels" : "records";
			const action = value < maximum ? `Increase that per-call field (range ${String(minimum)}..${String(maximum)}) and retry the same complete map after cleanup` : "This is the maximum supported value; use a smaller complete map or an independent source-map reader for this workload";
			return `source_map_limits.${field} is ${String(value)} ${unit}. ${action}; no REA restart is required. Other byte, record, heap and client limits remain independent.`;
		};
		sourceMapLimitSelection = (limits) => ({
			map_bytes: limits.mapBytes,
			output_bytes: limits.outputBytes,
			decoded_rows: limits.decodedRows,
			decoded_segments: limits.decodedSegments,
			decoded_records: limits.decodedRecords,
			section_depth: limits.sectionDepth,
			codec_heap_mib: limits.codecHeapMiB,
			fetch_bytes: limits.fetchBytes
		});
		localSourceMapLimitsSchema = sourceMapLimitsSchema.omit({ fetch_bytes: true });
		fetchedSourceMapLimitsSchema = sourceMapLimitsSchema.omit({
			map_bytes: true,
			codec_heap_mib: true
		});
	})))();
}

//#endregion
//#region dist/domain/firmware/devicetree.js
var uint$1, MAX_DEVICETREE_FILE_BYTES, inspectDevicetreeInputSchema, devicetreePropertySchema, devicetreeNodeSchema, devicetreeSchema;
function init_devicetree() {
	return (init_devicetree = __esmMin((() => {
		init_digests();
		init_localPath();
		uint$1 = z.number().int().min(0).max(4294967295);
		MAX_DEVICETREE_FILE_BYTES = 16777216;
		inspectDevicetreeInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema,
			max_file_bytes: z.number().int().min(40).max(MAX_DEVICETREE_FILE_BYTES).default(4194304),
			max_nodes: z.number().int().min(1).max(65536).default(8192),
			max_properties: z.number().int().min(1).max(262144).default(32768),
			max_depth: z.number().int().min(1).max(256).default(64)
		});
		devicetreePropertySchema = z.strictObject({
			name: z.string(),
			offset: uint$1,
			bytes: uint$1,
			hex: z.string().regex(/^[0-9a-f]*$/).max(512),
			truncated: z.boolean(),
			derived: z.strictObject({
				confidence: z.literal("derived"),
				strings: z.array(z.string()).nullable(),
				cells: z.array(uint$1).nullable(),
				reg: z.array(z.strictObject({
					address: z.string().nullable(),
					size: z.string().nullable()
				})).nullable()
			})
		});
		devicetreeNodeSchema = z.strictObject({
			path: z.string(),
			parent: z.string().nullable(),
			offset: uint$1,
			properties: z.array(devicetreePropertySchema)
		});
		devicetreeSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string(),
				sha256: digestSchema,
				bytes: uint$1
			}),
			header: z.strictObject({
				magic: uint$1,
				totalsize: uint$1,
				off_dt_struct: uint$1,
				off_dt_strings: uint$1,
				off_mem_rsvmap: uint$1,
				version: uint$1,
				last_comp_version: uint$1,
				boot_cpuid_phys: uint$1,
				size_dt_strings: uint$1,
				size_dt_struct: uint$1.nullable()
			}),
			reservations: z.array(z.strictObject({
				offset: uint$1,
				address: z.string(),
				size: z.string()
			})),
			nodes: z.array(devicetreeNodeSchema).superRefine((nodes, ctx) => {
				const paths = new Set();
				for (const [index, node] of nodes.entries()) {
					if (paths.has(node.path)) {
						ctx.addIssue({
							code: "custom",
							path: [index, "path"],
							message: "Duplicate Devicetree node path."
						});
						return;
					}
					paths.add(node.path);
				}
			}),
			references: z.array(z.strictObject({
				source: z.string(),
				property: z.string(),
				phandle: uint$1,
				target: z.string().nullable(),
				confidence: z.literal("derived")
			})),
			summary: z.strictObject({
				confidence: z.literal("derived"),
				compatible: z.array(z.string()).nullable(),
				model: z.string().nullable(),
				bootargs: z.string().nullable(),
				stdout_path: z.string().nullable(),
				aliases: z.array(z.strictObject({
					name: z.string(),
					path: z.string().nullable()
				}))
			}),
			coverage: z.strictObject({
				status: z.literal("complete"),
				examined_nodes: uint$1,
				examined_properties: uint$1
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/native/elfNotes.js
var uint, range, MAX_INSPECT_ELF_NOTE_FILE_BYTES, MAX_INSPECT_ELF_NOTE_ENTRIES, DEFAULT_INSPECT_ELF_NOTE_ENTRIES, ELF_NOTE_TYPE_NAMES, ELF_OBJECT_TYPE_NAMES, elfObjectTypeName, gnuNoteTypeName, coreNoteTypeName, FDO_PACKAGING_METADATA, FDO_DLOPEN_METADATA, elfNoteTypeName, inspectElfNotesInputSchema, gnuAbiTagSchema, coreFileMappingSchema, coreFileSchema, corePrpsinfoSchema, coreSiginfoSchema, coreAuxvEntrySchema, coreNoteSchema, androidIdentSchema, fdoNoteSchema, noteEntrySchema, elfNotesSchema;
function init_elfNotes() {
	return (init_elfNotes = __esmMin((() => {
		init_digests();
		init_jsonValue();
		init_localPath();
		uint = z.number().int().min(0).max(4294967295);
		range = z.strictObject({
			offset: uint,
			bytes: uint
		});
		MAX_INSPECT_ELF_NOTE_FILE_BYTES = 536870912;
		MAX_INSPECT_ELF_NOTE_ENTRIES = 256;
		DEFAULT_INSPECT_ELF_NOTE_ENTRIES = 128;
		ELF_NOTE_TYPE_NAMES = [
			"gnu_abi_tag",
			"gnu_hwcap",
			"gnu_build_id",
			"gnu_gold_version",
			"gnu_property",
			"core_prpsinfo",
			"core_file",
			"core_siginfo",
			"core_auxv",
			"android_ident",
			"fdo_packaging_metadata",
			"fdo_dlopen_metadata",
			"unknown"
		];
		ELF_OBJECT_TYPE_NAMES = [
			"relocatable",
			"executable",
			"shared",
			"core",
			"unknown"
		];
		elfObjectTypeName = (type) => {
			switch (type) {
				case 1: return "relocatable";
				case 2: return "executable";
				case 3: return "shared";
				case 4: return "core";
				default: return "unknown";
			}
		};
		gnuNoteTypeName = (type) => {
			switch (type) {
				case 1: return "gnu_abi_tag";
				case 2: return "gnu_hwcap";
				case 3: return "gnu_build_id";
				case 4: return "gnu_gold_version";
				case 5: return "gnu_property";
				default: return "unknown";
			}
		};
		coreNoteTypeName = (type) => {
			switch (type) {
				case 3: return "core_prpsinfo";
				case 6: return "core_auxv";
				case 1179208773: return "core_file";
				case 1397311305: return "core_siginfo";
				default: return "unknown";
			}
		};
		FDO_PACKAGING_METADATA = 3405650558;
		FDO_DLOPEN_METADATA = 1081871370;
		elfNoteTypeName = (owner, type, linuxCore) => {
			switch (owner) {
				case "GNU": return gnuNoteTypeName(type);
				case "CORE": return linuxCore ? coreNoteTypeName(type) : "unknown";
				case "Android": return type === 1 ? "android_ident" : "unknown";
				case "FDO":
					if (type === 3405650558) return "fdo_packaging_metadata";
					if (type === 1081871370) return "fdo_dlopen_metadata";
					return "unknown";
				default: return "unknown";
			}
		};
		inspectElfNotesInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to an ELF image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_ELF_NOTE_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_entries: z.number().int().min(1).max(256).default(128).describe("Maximum note entries to examine across every table; exceeding the budget fails without partial success")
		});
		gnuAbiTagSchema = z.strictObject({
			os: uint,
			os_name: z.string().nullable(),
			major: uint,
			minor: uint,
			subminor: uint
		});
		coreFileMappingSchema = z.strictObject({
			start_address: z.string().regex(/^0x[0-9a-f]+$/),
			end_address: z.string().regex(/^0x[0-9a-f]+$/),
			file_offset_pages: z.string().regex(/^0x[0-9a-f]+$/),
			path: z.string(),
			path_hex: z.string().regex(/^[0-9a-f]*$/)
		});
		coreFileSchema = z.strictObject({
			count: uint,
			page_size: uint,
			mappings: z.array(coreFileMappingSchema)
		});
		corePrpsinfoSchema = z.strictObject({
			state: uint,
			pid: z.number().int(),
			ppid: z.number().int(),
			pgrp: z.number().int(),
			sid: z.number().int(),
			uid: uint,
			gid: uint,
			filename: z.string(),
			psargs: z.string()
		});
		coreSiginfoSchema = z.strictObject({
			signo: z.number().int(),
			code: z.number().int(),
			errno: z.number().int()
		});
		coreAuxvEntrySchema = z.strictObject({
			type: uint,
			type_name: z.string().nullable(),
			value: z.string().regex(/^0x[0-9a-f]+$/)
		});
		coreNoteSchema = z.strictObject({
			prpsinfo: corePrpsinfoSchema.nullable(),
			file: coreFileSchema.nullable(),
			siginfo: coreSiginfoSchema.nullable(),
			auxv: z.array(coreAuxvEntrySchema).nullable()
		});
		androidIdentSchema = z.strictObject({
			android_api: uint,
			ndk_version: z.string().nullable(),
			ndk_build_number: z.string().nullable()
		});
		fdoNoteSchema = z.union([z.strictObject({
			metadata: z.union([jsonObjectSchema, z.array(jsonObjectSchema)]),
			issue: z.null()
		}), z.strictObject({
			metadata: z.null(),
			issue: z.string()
		})]);
		noteEntrySchema = z.strictObject({
			index: uint,
			table_kind: z.enum(["program", "section"]),
			table_index: uint,
			location: range,
			namesz: uint,
			descsz: uint,
			type: uint,
			type_name: z.enum(ELF_NOTE_TYPE_NAMES),
			owner: z.string(),
			owner_bytes_hex: z.string().regex(/^[0-9a-f]*$/),
			descriptor: z.strictObject({
				location: range,
				bytes: uint,
				sha256: digestSchema,
				hex: z.string().regex(/^[0-9a-f]*$/).nullable()
			}),
			gnu: z.strictObject({
				build_id_hex: z.string().regex(/^[0-9a-f]*$/).nullable(),
				abi_tag: gnuAbiTagSchema.nullable(),
				gold_version: z.string().nullable()
			}).nullable(),
			core: coreNoteSchema.nullable(),
			android: androidIdentSchema.nullable(),
			fdo: fdoNoteSchema.nullable()
		});
		elfNotesSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint
			}),
			format: z.enum(["elf32", "elf64"]),
			byte_order: z.enum(["little", "big"]),
			machine: uint,
			type: uint,
			type_name: z.enum(ELF_OBJECT_TYPE_NAMES),
			tables: z.array(z.strictObject({
				kind: z.enum(["program", "section"]),
				index: uint,
				name: z.string().nullable(),
				location: range,
				alignment: uint
			})),
			entries: z.array(noteEntrySchema),
			coverage: z.strictObject({
				status: z.literal("complete"),
				examined_tables: uint,
				examined_entries: uint
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
export { ELF_OBJECT_TYPE_NAMES, MAX_DEVICETREE_FILE_BYTES, MAX_INSPECT_ELF_NOTE_FILE_BYTES, MAX_SOURCE_MAP_ENCODED_BYTES, WEB_SOURCE_MAP_LIMITS, devicetreeSchema, elfNoteTypeName, elfNotesSchema, elfObjectTypeName, fetchedSourceMapLimitsSchema, init_devicetree, init_elfNotes, init_sourceMapLimits, inspectDevicetreeInputSchema, inspectElfNotesInputSchema, localSourceMapLimitsSchema, selectedSourceMapLimits, sourceMapLimitRecovery, sourceMapLimitSelection, sourceMapLimitsSchema };