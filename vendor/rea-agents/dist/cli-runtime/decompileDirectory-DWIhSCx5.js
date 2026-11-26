import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_analysisErrorCore, init_localPath } from "./jsonSerialization-DAF9DVXC.js";
import { init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { init_nativeProviderOutput, invalidNativeOutput } from "./nativeValueTrace-B4vmCxtN.js";
import { addressDistance, init_addressCoordinate } from "./functionDossier-Cff5XWxr.js";
import { init_pseudocodeAbsence, pseudocodeAbsenceSchema } from "./pseudocodeAbsence-BV9XJ6rk.js";
import { analysisSourceDescriptorSchema, init_analysisSource } from "./analysisSource-DxhSgcPs.js";
import { z } from "zod";

//#region dist/domain/native/nativeSegments.js
var availableMemoryPermissions, nativeMemoryRegionSchema, nativeSegmentListSchema, segmentSchema, parseSegments, parseSegmentImageBase, projectBinaryOverview;
function init_nativeSegments() {
	return (init_nativeSegments = __esmMin((() => {
		init_result();
		init_analysisErrorCore();
		init_nativeProviderOutput();
		init_addressCoordinate();
		availableMemoryPermissions = z.object({
			available: z.literal(true),
			source: z.literal("ghidra-memory-block")
		});
		nativeMemoryRegionSchema = z.object({
			name: z.string(),
			start: z.string(),
			end: z.string(),
			readable: z.boolean().nullable(),
			writable: z.boolean().nullable(),
			executable: z.boolean().nullable(),
			permissions: z.union([z.object({
				available: z.literal(false),
				reason: z.string()
			}), availableMemoryPermissions]),
			provenance: z.enum(["hopper-public-python-api", "ghidra-memory-block"]),
			address_space: z.string().optional(),
			image_base: z.string().optional(),
			initialized: z.boolean().optional(),
			overlay: z.boolean().optional()
		});
		nativeSegmentListSchema = z.array(nativeMemoryRegionSchema.extend({ sections: z.array(nativeMemoryRegionSchema) }));
		segmentSchema = z.object({
			name: z.string(),
			start: z.string(),
			end: z.string(),
			readable: z.boolean().nullable(),
			writable: z.boolean().nullable(),
			executable: z.boolean().nullable(),
			image_base: z.string().min(1).exactOptional(),
			address_space: z.string().min(1).exactOptional()
		});
		parseSegments = (value, operation = "list_segments") => {
			const parsed = z.array(segmentSchema).safeParse(value);
			return parsed.success ? ok(parsed.data) : invalidNativeOutput(operation, "segment list", parsed.error);
		};
		parseSegmentImageBase = (segments) => {
			const base = segments[0]?.image_base;
			return base !== undefined && segments.every((segment) => segment.image_base === base) ? base : undefined;
		};
		projectBinaryOverview = (input) => {
			const { document, procedure_count, string_count, segments } = input;
			const imageBase = segments === undefined ? undefined : parseSegmentImageBase(segments);
			return {
				document,
				...imageBase === undefined ? {} : { image_base: imageBase },
				...segments === undefined ? {} : {
					segments: segments.map(({ name, start, end, image_base, address_space }) => ({
						name,
						start,
						end,
						length: addressDistance(start, end),
						...image_base === undefined ? {} : { image_base },
						...address_space === undefined ? {} : { address_space }
					})),
					segment_count: segments.length
				},
				procedure_count,
				string_count
			};
		};
	})))();
}

//#endregion
//#region dist/contracts/decompileDirectory.js
var DECOMPILE_DIRECTORY_JOURNAL_NAME, DECOMPILE_DIRECTORY_INDEX_NAME, DECOMPILE_DIRECTORY_FUNCTIONS_DIRECTORY, DECOMPILE_DIRECTORY_VERSION, DECOMPILE_DIRECTORY_INLINE_FAILURE_LIMIT, DECOMPILE_DIRECTORY_INLINE_FAILURE_BYTES, layoutSchema, exportProviderSchema, bodySchema, functionStatusSchema, failureFields, failureSchema, countSchema, decompileDirectoryInputSchema, decompileDirectoryManifestSchema, decompileDirectoryFunctionSchema, decompileJournalHeaderSchema, decompileJournalFunctionSchema, decompileJournalLineSchema, decompileSelectionSchema, decompileLatestRunSchema, decompileDirectoryIndexSchema, isDecompileFunctionRelativePath;
function init_decompileDirectory() {
	return (init_decompileDirectory = __esmMin((() => {
		init_digests();
		init_localPath();
		init_analysisSource();
		init_pseudocodeAbsence();
		DECOMPILE_DIRECTORY_JOURNAL_NAME = "decompile-journal.jsonl";
		DECOMPILE_DIRECTORY_INDEX_NAME = "decompile-index.json";
		DECOMPILE_DIRECTORY_FUNCTIONS_DIRECTORY = "functions";
		DECOMPILE_DIRECTORY_VERSION = 1;
		DECOMPILE_DIRECTORY_INLINE_FAILURE_LIMIT = 32;
		DECOMPILE_DIRECTORY_INLINE_FAILURE_BYTES = 2048;
		layoutSchema = z.enum(["address", "dwarf"]);
		exportProviderSchema = z.strictObject({
			id: z.string().min(1),
			name: z.string().min(1),
			version: z.string().min(1).nullable()
		});
		bodySchema = z.discriminatedUnion("available", [z.strictObject({
			available: z.literal(false),
			reason: z.string().min(1)
		}), z.strictObject({
			available: z.literal(true),
			ranges: z.array(z.strictObject({
				start: z.string().min(1),
				end: z.string().min(1).describe("Inclusive last address of this body range.")
			})),
			non_contiguous: z.boolean()
		})]);
		functionStatusSchema = z.enum([
			"written",
			"failed",
			"external"
		]);
		failureFields = {
			address: z.string().min(1),
			code: z.string().min(1),
			message: z.string().min(1),
			pseudocode_absence: pseudocodeAbsenceSchema.exactOptional().describe("The provider's reported reason for null pseudocode; omitted after the name to fit the inline text budget, and always kept in the index.")
		};
		failureSchema = z.union([z.strictObject({
			...failureFields,
			name: z.string().nullable().describe("Observed name, or null when unknown.")
		}), z.strictObject(failureFields).describe("Name omitted to fit the inline text budget; the index retains the full observed name.")]);
		countSchema = (description) => z.number().int().min(0).describe(description);
		decompileDirectoryInputSchema = z.strictObject({
			output_directory: absoluteLocalPathStringSchema.describe("Absolute output directory. The parent must exist. The directory itself must be absent unless resume is true. One run at a time may use a directory; a second run is refused while the first holds it."),
			layout: layoutSchema.default("address").describe("address names files by canonical address. dwarf asks for compilation-unit paths and is reported unavailable when the provider has no such fact."),
			resume: z.boolean().default(false).describe("Continue a journal for the same target SHA-256, provider, analysis profile, and layout. Both digests must be known. Verified files and functions recorded as external are skipped, conflicting files are left unchanged, and functions not yet tried run before retries of recorded failures."),
			retry_failed: z.enum(["independent_fresh"]).optional().describe("For a null result explicitly reported as a function failure, retain the failure and try an independent decompile when supported. It can use different analysis context; errors and omissions without that typed fact are not retried."),
			name: z.string().min(1).optional().describe("Case-sensitive literal substring of the provider function name."),
			namespace: z.string().min(1).optional().describe("Case-sensitive prefix of the provider function name, including any separator such as Foo:: or Class."),
			address_start: z.string().min(1).optional().describe("Inclusive lower bound as 0xoffset or space:0xoffset. Must use the same address space as address_end."),
			address_end: z.string().min(1).optional().describe("Inclusive upper bound as 0xoffset or space:0xoffset. Must use the same address space as address_start."),
			limit: z.number().int().min(1).optional().describe("Maximum functions to attempt on this call after skipping verified files and functions recorded as external. Further matches remain for a later resume.")
		});
		decompileDirectoryManifestSchema = z.strictObject({
			output_directory: z.string().min(1).describe("Absolute directory containing the function files."),
			index_path: z.string().min(1).describe("Absolute path of the index. The index lists functions and does not contain pseudocode."),
			layout: layoutSchema,
			layout_status: z.enum(["address", "debug_layout_unavailable"]).describe("address when files are named by address on request. debug_layout_unavailable when dwarf was requested and no compilation-unit fact exists."),
			counts: z.strictObject({
				selected: countSchema("Functions matching the filter."),
				excluded: countSchema("Inventory functions excluded by the filter."),
				requested: countSchema("Functions this call attempted."),
				written: countSchema("Function files created by this call."),
				failed: countSchema("Functions this call could not write."),
				external: countSchema("Functions this call found procedure_info classifies as external. No file is written and no pseudocode is requested. A function without a matching procedure_info classification is decompiled as usual."),
				skipped: countSchema("Selected functions already settled: existing files that still hold the same bytes, whether recorded in the journal or found on disk, and functions the journal records as external."),
				remaining: countSchema("Selected functions not attempted because the limit was reached.")
			}),
			failures: z.array(failureSchema).max(32).describe("At most 32 failure details within 2,048 JSON-encoded UTF-8 bytes. Names may be omitted to preserve addresses and reasons; the index retains complete records."),
			failures_omitted: countSchema("Failure records omitted from failures because of the inline count or encoded-text budget."),
			provider: exportProviderSchema.describe("Provider that produced the pseudocode."),
			analysis_profile_digest: digestSchema.nullable().describe("Provider analysis-profile digest, or null when the provider did not commit one."),
			target_sha256: digestSchema.nullable().describe("SHA-256 of the analyzed target, or null when the observation has no file subject."),
			inventory_limitations: z.array(z.string()).describe("Limitations reported by this call's procedure inventory. They describe the selection that produced this run, not every historical function record in the directory."),
			limitations: z.array(z.string()).describe("Limits of this export directory. The body-coverage caveat counts every retained function record, including records earlier runs wrote. Pseudocode is not included."),
			resume: z.boolean().describe("Whether this call continued a journal.")
		}).superRefine((manifest, context) => {
			const { counts } = manifest;
			if (counts.written + counts.failed + counts.external !== counts.requested) context.addIssue({
				code: "custom",
				path: ["counts", "requested"],
				message: "requested must equal written plus failed plus external"
			});
			if (counts.requested + counts.skipped + counts.remaining !== counts.selected) context.addIssue({
				code: "custom",
				path: ["counts", "selected"],
				message: "selected must equal requested plus skipped plus remaining"
			});
			if (manifest.failures.length + manifest.failures_omitted !== counts.failed) context.addIssue({
				code: "custom",
				path: ["failures_omitted"],
				message: "failures plus failures_omitted must equal failed"
			});
		});
		decompileDirectoryFunctionSchema = z.strictObject({
			address: z.string().min(1),
			name: z.string().nullable(),
			status: functionStatusSchema,
			relative_path: z.string().min(1).refine((path) => isDecompileFunctionRelativePath(path), "Function paths must remain inside functions/.").optional(),
			sha256: digestSchema.optional(),
			/** Source of this attempt's pseudocode observation; a matched file's original producer remains unknown. */
			provider_source: z.discriminatedUnion("status", [z.strictObject({
				status: z.literal("reported"),
				source: analysisSourceDescriptorSchema
			}), z.strictObject({
				status: z.literal("unknown"),
				reason: z.enum(["source_not_available", "existing_file_origin_unknown"])
			})]).optional(),
			pseudocode_absence: pseudocodeAbsenceSchema.optional(),
			body: bodySchema,
			failure: z.strictObject({
				code: z.string().min(1),
				message: z.string().min(1)
			}).optional(),
			/** Complete provider caveats of the observations this attempt used. */
			limitations: z.array(z.string().min(1)).min(1).optional()
		}).superRefine((record, context) => {
			const valid = record.status === "written" ? record.relative_path !== undefined && record.sha256 !== undefined : record.status === "failed" ? record.failure !== undefined : record.relative_path === undefined && record.sha256 === undefined && record.failure === undefined;
			if (!valid) context.addIssue({
				code: "custom",
				path: ["status"],
				message: "Function record fields do not match its status."
			});
		});
		decompileJournalHeaderSchema = z.strictObject({
			kind: z.literal("header"),
			version: z.literal(1),
			target_sha256: digestSchema.nullable(),
			provider: exportProviderSchema,
			analysis_profile_digest: digestSchema.nullable(),
			layout: layoutSchema
		});
		decompileJournalFunctionSchema = decompileDirectoryFunctionSchema.safeExtend({ kind: z.literal("function") });
		decompileJournalLineSchema = z.discriminatedUnion("kind", [decompileJournalHeaderSchema, decompileJournalFunctionSchema]);
		decompileSelectionSchema = z.strictObject({
			name: z.string().nullable(),
			namespace: z.string().nullable(),
			address_start: z.string().nullable(),
			address_end: z.string().nullable(),
			limit: z.number().int().min(1).nullable()
		});
		decompileLatestRunSchema = z.strictObject({
			resume: z.boolean(),
			selected: countSchema("Functions matching this run's filter."),
			excluded: countSchema("Inventory functions excluded by this run's filter."),
			selection: decompileSelectionSchema,
			inventory_limitations: z.array(z.string())
		});
		decompileDirectoryIndexSchema = z.strictObject({
			version: z.literal(1),
			target_sha256: digestSchema.nullable(),
			provider: exportProviderSchema,
			analysis_profile_digest: digestSchema.nullable(),
			layout: layoutSchema,
			layout_status: z.enum(["address", "debug_layout_unavailable"]),
			latest_run: decompileLatestRunSchema.optional().describe("Selection and inventory limitations owned by the run that last rewrote this index. Absent in indexes written before this field existed."),
			limitations: z.array(z.string()).describe("Limits of this export directory. The body-coverage caveat counts every retained function record, including records earlier runs wrote."),
			functions: z.array(decompileDirectoryFunctionSchema)
		});
		isDecompileFunctionRelativePath = (value) => {
			if (value.includes("\\") || value.includes("\0")) return false;
			const [directory, name, extra] = value.split("/");
			return extra === undefined && directory === "functions" && name !== undefined && /^[A-Za-z0-9._-]+\.c$/u.test(name);
		};
	})))();
}

//#endregion
export { DECOMPILE_DIRECTORY_FUNCTIONS_DIRECTORY, DECOMPILE_DIRECTORY_INDEX_NAME, DECOMPILE_DIRECTORY_INLINE_FAILURE_BYTES, DECOMPILE_DIRECTORY_JOURNAL_NAME, decompileDirectoryIndexSchema, decompileDirectoryInputSchema, decompileDirectoryManifestSchema, decompileJournalHeaderSchema, decompileJournalLineSchema, init_decompileDirectory, init_nativeSegments, isDecompileFunctionRelativePath, nativeSegmentListSchema, parseSegments, projectBinaryOverview };