import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { artifactDfuCrc32PairSchema, artifactIntegrityClaimSchema, artifactMd5PairSchema, artifactSha256PairSchema, completeOrUnknownCoverageSchema, init_artifactIntegrity, init_coverage } from "./jsonSerialization-DAF9DVXC.js";
import { artifactReaderLimitsSchema, init_artifactReaderLimits } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { ZIP_APPLICATION_PACKAGE_FORMATS, init_zipPackageFormat } from "./canonicalOrdering-C7Yzy62j.js";
import { init_digests, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { inesInventorySchema, init_inesContainer } from "./espFlashSelection-DrhknbQ_.js";
import { artifactFormatMetadataSchema, init_artifactFormatMetadata } from "./artifactFormatMetadata-CgSGovld.js";
import { z } from "zod";

//#region dist/domain/artifactGraph.js
var artifactTraversalOmissionKindSchema, sha256Schema, artifactIdSchema, occurrenceIdSchema, edgeIdSchema, manifestIdSchema, extractionIdSchema, contradictionIdSchema, boundedRelativePathSchema, artifactKindSchema, ARTIFACT_FORMAT_IDS, artifactFormatSchema, artifactContentFormatSchema, artifactByteRangeSchema, artifactCommandSchema, artifactNodeSchema, artifactOccurrenceSchema, integrityContradictionBaseSchema, integrityContradictionSchema, artifactEdgeSchema, artifactGraphManifestSchema, artifactInventoryCoverageSchema, artifactInventoryResultSchema, extractedArtifactSchema, artifactExtractionManifestSchema, artifactExtractionResultSchema, artifactOccurrenceRelationshipCoverage;
function init_artifactGraph() {
	return (init_artifactGraph = __esmMin((() => {
		init_coverage();
		init_artifactIntegrity();
		init_artifactFormatMetadata();
		init_artifactReaderLimits();
		init_digests();
		init_inesContainer();
		init_zipPackageFormat();
		artifactTraversalOmissionKindSchema = z.enum([
			"fifo",
			"socket",
			"block-device",
			"character-device",
			"unsupported",
			"directory-descendants"
		]);
		sha256Schema = z.string().regex(/^[a-f0-9]{64}$/u);
		artifactIdSchema = prefixedDigestSchema("art");
		occurrenceIdSchema = prefixedDigestSchema("occ");
		edgeIdSchema = prefixedDigestSchema("edge");
		manifestIdSchema = prefixedDigestSchema("agm");
		extractionIdSchema = prefixedDigestSchema("aex");
		contradictionIdSchema = prefixedDigestSchema("ic");
		boundedRelativePathSchema = z.string().min(1).refine((path) => !path.startsWith("/") && path.split("/").every((part) => part !== "" && part !== ".."), "Expected a normalized relative POSIX path without traversal");
		artifactKindSchema = z.enum([
			"container",
			"executable",
			"dynamic-library",
			"framework",
			"native-addon",
			"javascript",
			"source-map",
			"plist",
			"entitlements",
			"resource",
			"universal-slice",
			"package-metadata",
			"unknown"
		]);
		ARTIFACT_FORMAT_IDS = [
			"dotnet-bundle",
			"bun-standalone",
			"deno-standalone",
			"dmg",
			"zip",
			"pkg",
			"asar",
			"ines",
			"godot-pck",
			"unityfs",
			"wxapkg",
			"uimage",
			"android-boot-image",
			"android-ota-payload",
			"uefi",
			"javascript-bundle",
			"source-map",
			"mach-o-universal",
			"mach-o",
			"elf",
			"pe",
			"dos-mz",
			"dos-com",
			"raw-binary",
			"gamecube-dol",
			"hopper",
			"analysis-database",
			...ZIP_APPLICATION_PACKAGE_FORMATS,
			"plist",
			"entitlements",
			"directory",
			"file",
			"pyinstaller",
			"node-sea",
			"intel-hex",
			"srec",
			"esp-image",
			"uf2",
			"dfuse",
			"esp-flash-image",
			"fit",
			"ntfs-mft",
			"unknown"
		];
		artifactFormatSchema = z.enum(ARTIFACT_FORMAT_IDS);
		artifactContentFormatSchema = artifactFormatSchema.extract([
			"ines",
			"zip",
			"godot-pck",
			"unityfs",
			"wxapkg",
			"uimage",
			"android-boot-image",
			"android-ota-payload",
			"uefi",
			"intel-hex",
			"srec",
			"esp-image",
			"uf2",
			"dfuse",
			"fit",
			"ntfs-mft",
			"mach-o-universal",
			"mach-o",
			"elf",
			"pe",
			"dos-mz",
			"plist",
			"directory",
			"file",
			"unknown"
		]);
		artifactByteRangeSchema = z.object({
			offset: z.int().min(0),
			length: z.int().min(0)
		});
		artifactCommandSchema = z.object({
			tool: z.string().min(1),
			arguments: z.array(z.string()),
			tool_version: z.string().nullable(),
			executable_sha256: sha256Schema.nullable(),
			exit_code: z.int().nullable(),
			effects: z.array(z.enum([
				"read",
				"write",
				"mount"
			]))
		});
		artifactNodeSchema = z.object({
			artifact_id: artifactIdSchema,
			format: artifactContentFormatSchema,
			sha256: sha256Schema,
			size: z.int().min(0).max(Number.MAX_SAFE_INTEGER),
			media_type: z.string().min(1).nullable(),
			architecture: z.string().min(1).nullable(),
			content_state: z.enum([
				"materialized",
				"embedded",
				"virtual"
			]),
			limitations: z.array(z.string())
		});
		artifactOccurrenceSchema = z.object({
			occurrence_id: occurrenceIdSchema,
			artifact_id: artifactIdSchema.nullable(),
			parent_occurrence_id: occurrenceIdSchema.nullable(),
			/** Producer coverage of this occurrence's modeled relationships. Historical omission is unknown. */
			relationship_coverage: completeOrUnknownCoverageSchema.exactOptional(),
			logical_path: boundedRelativePathSchema,
			entry_kind: z.enum([
				"file",
				"directory",
				"symlink",
				"slice",
				"metadata"
			]),
			artifact_kind: artifactKindSchema,
			artifact_format: artifactFormatSchema,
			declared_size: z.int().min(0).max(Number.MAX_SAFE_INTEGER).nullable(),
			compressed_size: z.int().min(0).max(Number.MAX_SAFE_INTEGER).nullable(),
			executable: z.boolean(),
			encrypted: z.boolean(),
			/** Reader-observed ASAR storage; omission leaves historical storage unknown. */
			unpacked: z.boolean().exactOptional(),
			hash_status: z.enum([
				"verified",
				"mismatched",
				"not-hashed",
				"unavailable"
			]),
			source_location: artifactByteRangeSchema.nullable(),
			/** Exact reader-source path or opaque key, including an observed empty key. */
			source_path: z.string().exactOptional(),
			declared_integrity: artifactIntegrityClaimSchema.exactOptional(),
			format_metadata: artifactFormatMetadataSchema.exactOptional(),
			limitations: z.array(z.string())
		});
		integrityContradictionBaseSchema = z.object({
			contradiction_id: contradictionIdSchema,
			occurrence_id: occurrenceIdSchema,
			parent_artifact_id: artifactIdSchema,
			logical_path: boundedRelativePathSchema,
			entry_kind: z.enum(["file", "slice"]),
			unpacked: z.boolean(),
			trust: z.literal("observed-untrusted"),
			provenance: z.literal("container-integrity-metadata-versus-observed-bytes"),
			limitations: z.array(z.string()).min(1)
		});
		integrityContradictionSchema = z.union([
			integrityContradictionBaseSchema.extend(artifactSha256PairSchema.shape),
			integrityContradictionBaseSchema.extend(artifactMd5PairSchema.shape),
			integrityContradictionBaseSchema.extend(artifactDfuCrc32PairSchema.shape)
		]);
		artifactEdgeSchema = z.object({
			edge_id: edgeIdSchema,
			ordinal: z.int().min(0),
			parent_artifact_id: artifactIdSchema,
			relation: z.enum([
				"contains",
				"extracts",
				"slice-of",
				"embeds",
				"loads",
				"maps-source",
				"derived-from"
			]),
			occurrence_id: occurrenceIdSchema,
			producer: artifactCommandSchema.nullable()
		});
		artifactGraphManifestSchema = z.object({
			manifest_id: manifestIdSchema,
			root_artifact_id: artifactIdSchema,
			root_sha256: sha256Schema,
			root_format: artifactFormatSchema,
			graph_sha256: sha256Schema,
			node_count: z.int().min(1),
			occurrence_count: z.int().min(1),
			edge_count: z.int().min(0)
		});
		artifactInventoryCoverageSchema = z.strictObject({
			scope: z.enum(["root", "container-entries"]),
			status: completeOrUnknownCoverageSchema
		});
		artifactInventoryResultSchema = z.strictObject({
			effective_limits: artifactReaderLimitsSchema.exactOptional().describe("Accepted resource policy when selected; each format group applies only if that format is encountered. Not measured process memory or confirmation every reader ran."),
			manifest: artifactGraphManifestSchema,
			nodes: z.array(artifactNodeSchema),
			occurrences: z.array(artifactOccurrenceSchema),
			edges: z.array(artifactEdgeSchema),
			provenance: z.array(artifactCommandSchema),
			ines: inesInventorySchema.exactOptional(),
			integrity_contradictions: z.array(integrityContradictionSchema),
			coverage: artifactInventoryCoverageSchema,
			limitations: z.array(z.string())
		});
		extractedArtifactSchema = z.object({
			artifact_id: artifactIdSchema,
			relative_path: boundedRelativePathSchema,
			sha256: sha256Schema,
			bytes_written: z.int().min(0).max(Number.MAX_SAFE_INTEGER),
			created: z.boolean()
		});
		artifactExtractionManifestSchema = z.object({
			extraction_id: extractionIdSchema,
			source_manifest_id: manifestIdSchema,
			selected_occurrence_ids: z.array(occurrenceIdSchema),
			files_sha256: sha256Schema,
			output_root_alias: z.literal("$OUTPUT_ROOT")
		});
		artifactExtractionResultSchema = z.object({
			effective_limits: artifactReaderLimitsSchema.exactOptional(),
			manifest: artifactGraphManifestSchema,
			extraction_manifest: artifactExtractionManifestSchema,
			output_root: z.string().min(1),
			artifacts: z.array(extractedArtifactSchema),
			containment_verified: z.boolean(),
			cleanup: z.object({
				attempted: z.boolean(),
				verified: z.boolean(),
				residual_paths: z.array(boundedRelativePathSchema)
			}),
			coverage: artifactInventoryCoverageSchema,
			provenance: z.array(artifactCommandSchema),
			integrity_contradictions: z.array(integrityContradictionSchema),
			limitations: z.array(z.string())
		});
		artifactOccurrenceRelationshipCoverage = (occurrence) => occurrence.relationship_coverage ?? "unknown";
	})))();
}

//#endregion
export { ARTIFACT_FORMAT_IDS, artifactEdgeSchema, artifactExtractionResultSchema, artifactGraphManifestSchema, artifactInventoryCoverageSchema, artifactInventoryResultSchema, artifactNodeSchema, artifactOccurrenceRelationshipCoverage, artifactOccurrenceSchema, artifactTraversalOmissionKindSchema, init_artifactGraph, integrityContradictionSchema };