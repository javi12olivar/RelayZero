import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_localPath } from "./jsonSerialization-DAF9DVXC.js";
import { z } from "zod";

//#region dist/domain/native/peResources.js
var uint, range, identity, MAX_INSPECT_PE_FILE_BYTES, MAX_INSPECT_PE_DIRECTORY_ENTRIES, inspectPeResourcesInputSchema, peResourcesSchema;
function init_peResources() {
	return (init_peResources = __esmMin((() => {
		init_localPath();
		uint = z.number().int().min(0).max(4294967295);
		range = z.strictObject({
			offset: uint,
			bytes: uint
		});
		identity = z.discriminatedUnion("kind", [z.strictObject({
			kind: z.literal("id"),
			id: uint
		}), z.strictObject({
			kind: z.literal("name"),
			name: z.string(),
			utf16le_hex: z.string().regex(/^(?:[0-9a-f]{4})*$/),
			location: range
		})]);
		MAX_INSPECT_PE_FILE_BYTES = 536870912;
		MAX_INSPECT_PE_DIRECTORY_ENTRIES = 65536;
		inspectPeResourcesInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a PE image"),
			max_file_bytes: z.number().int().min(64).max(MAX_INSPECT_PE_FILE_BYTES).default(67108864).describe("Maximum stable artifact bytes to read (default 64 MiB)"),
			max_entries: z.number().int().min(1).max(MAX_INSPECT_PE_DIRECTORY_ENTRIES).default(16384).describe("Maximum resource directory entries to examine; exceeding the budget fails without partial success")
		});
		peResourcesSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: z.string().regex(/^[a-f0-9]{64}$/),
				bytes: uint
			}),
			format: z.enum(["pe32", "pe32-plus"]),
			machine: uint,
			directory: z.strictObject({
				rva: uint,
				location: range,
				data_directory_location: range
			}).nullable(),
			directories: z.array(z.strictObject({
				path: z.array(identity).max(2).describe("Type/name identities leading to this directory; [] for the root"),
				entry_locations: z.array(range).max(2).describe("Incoming entry file ranges corresponding to path"),
				location: range,
				characteristics: uint,
				timestamp: uint,
				major_version: uint,
				minor_version: uint,
				named_entries: uint,
				id_entries: uint
			})),
			resources: z.array(z.strictObject({
				index: uint,
				type: identity,
				name: identity,
				language: identity,
				entry_locations: z.array(range).length(3),
				data_entry_location: range,
				code_page: uint,
				reserved: uint,
				payload: z.strictObject({
					rva: uint,
					location: range,
					sha256: z.string().regex(/^[a-f0-9]{64}$/)
				})
			})),
			icon_groups: z.array(z.strictObject({
				resource_index: uint,
				images: z.array(z.strictObject({
					location: range,
					width: uint,
					height: uint,
					color_count: uint,
					reserved: uint,
					planes: uint,
					bit_count: uint,
					declared_bytes: uint,
					resource_id: uint,
					candidate_resource_indices: z.array(uint),
					same_language_resource_index: uint.nullable(),
					size_matches: z.boolean().nullable()
				}))
			})),
			coverage: z.strictObject({
				status: z.literal("complete"),
				examined_entries: uint,
				resources: uint
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
export { MAX_INSPECT_PE_DIRECTORY_ENTRIES, MAX_INSPECT_PE_FILE_BYTES, init_peResources, inspectPeResourcesInputSchema, peResourcesSchema };