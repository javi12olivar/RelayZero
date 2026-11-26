import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_localPath } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/java/mavenGradleMetadata.js
/**
* Property occurrences in source order, without collecting or deduplicating.
* A `${` with no later `}` ends the scan, so matching stays linear. Consumers
* retaining references own their admission and deduplication before storage.
*/
function* mavenPropertyOccurrences(value) {
	if (value === null) return;
	let start = value.indexOf("${");
	while (start >= 0) {
		const close = value.indexOf("}", start + 2);
		if (close < 0) break;
		if (close > start + 2) yield value.slice(start, close + 1);
		start = value.indexOf("${", close > start + 2 ? close + 1 : start + 2);
	}
}
var uint, MAX_INSPECT_MAVEN_GRADLE_METADATA_FILE_BYTES, MAVEN_GRADLE_METADATA_REPEATED_VARIANT_NAME_CHARS, MAVEN_GRADLE_METADATA_DEPENDENCY_ROWS, MAVEN_GRADLE_METADATA_VARIANTS, MAVEN_GRADLE_METADATA_EXCLUSIONS, MAVEN_GRADLE_METADATA_UNRESOLVED_RECORDS, MAVEN_GRADLE_METADATA_XML_NODES, MAVEN_GRADLE_METADATA_FORMATS, nullableText, REQUESTED_VERSION_KINDS, GRADLE_RANGE_WHITESPACE, GRADLE_RANGE_SPACE, GRADLE_RANGE_BOUND, GRADLE_RANGE_OPEN, GRADLE_RANGE_CLOSE, GRADLE_RANGE_SEPARATOR, GRADLE_RANGE, requestedVersionKind, inspectMavenGradleMetadataInputSchema, coordinateSchema, exclusionSchema, gradleVersionSchema, dependencySchema, unresolvedSchema, gradleVariantSchema, mavenGradleMetadataSchema;
function init_mavenGradleMetadata() {
	return (init_mavenGradleMetadata = __esmMin((() => {
		init_digests();
		init_localPath();
		uint = z.number().int().min(0).max(4294967295);
		MAX_INSPECT_MAVEN_GRADLE_METADATA_FILE_BYTES = 16 * 1024 * 1024;
		MAVEN_GRADLE_METADATA_REPEATED_VARIANT_NAME_CHARS = 4 * 1024 * 1024;
		MAVEN_GRADLE_METADATA_DEPENDENCY_ROWS = 65536;
		MAVEN_GRADLE_METADATA_VARIANTS = 4096;
		MAVEN_GRADLE_METADATA_EXCLUSIONS = 65536;
		MAVEN_GRADLE_METADATA_UNRESOLVED_RECORDS = 65536;
		MAVEN_GRADLE_METADATA_XML_NODES = 1048576;
		MAVEN_GRADLE_METADATA_FORMATS = ["maven-pom", "gradle-module"];
		nullableText = z.string().min(1).nullable();
		REQUESTED_VERSION_KINDS = [
			"literal",
			"range",
			"dynamic",
			"property",
			"missing"
		];
		GRADLE_RANGE_WHITESPACE = String.raw` \t\n\x0b\f\r`;
		GRADLE_RANGE_SPACE = `[${GRADLE_RANGE_WHITESPACE}]*`;
		GRADLE_RANGE_BOUND = String.raw`[^${GRADLE_RANGE_WHITESPACE},\[\]()]+`;
		GRADLE_RANGE_OPEN = String.raw`[\[\](]`;
		GRADLE_RANGE_CLOSE = String.raw`[\[\])]`;
		GRADLE_RANGE_SEPARATOR = `${GRADLE_RANGE_SPACE},${GRADLE_RANGE_SPACE}`;
		GRADLE_RANGE = new RegExp(`^(?:${[
			`${GRADLE_RANGE_OPEN}${GRADLE_RANGE_SPACE}${GRADLE_RANGE_BOUND}${GRADLE_RANGE_SEPARATOR}${GRADLE_RANGE_BOUND}${GRADLE_RANGE_SPACE}${GRADLE_RANGE_CLOSE}`,
			String.raw`\(${GRADLE_RANGE_SEPARATOR}${GRADLE_RANGE_BOUND}${GRADLE_RANGE_SPACE}${GRADLE_RANGE_CLOSE}`,
			String.raw`${GRADLE_RANGE_OPEN}${GRADLE_RANGE_SPACE}${GRADLE_RANGE_BOUND}${GRADLE_RANGE_SEPARATOR}\)`,
			String.raw`\[${GRADLE_RANGE_SPACE}${GRADLE_RANGE_BOUND}\]`
		].join("|")})$`, "u");
		requestedVersionKind = (value, format) => {
			if (value === null) return "missing";
			if (!mavenPropertyOccurrences(value).next().done) return "property";
			if (format === "gradle-module") {
				if (GRADLE_RANGE.test(value)) return "range";
				if (value.endsWith("+") || value.startsWith("latest.")) return "dynamic";
			} else if (value.startsWith("[") || value.startsWith("(")) return "range";
			return "literal";
		};
		inspectMavenGradleMetadataInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a Maven pom.xml or Gradle .module metadata file"),
			max_file_bytes: z.number().int().min(1).max(MAX_INSPECT_MAVEN_GRADLE_METADATA_FILE_BYTES).default(1024 * 1024).describe("Maximum stable artifact bytes to read; exceeding the budget fails without partial success")
		});
		coordinateSchema = z.strictObject({
			group_id: nullableText,
			artifact_id: nullableText,
			version: nullableText,
			packaging: nullableText
		});
		exclusionSchema = z.strictObject({
			group_id: nullableText,
			artifact_id: nullableText
		});
		gradleVersionSchema = z.strictObject({
			requires: nullableText,
			prefers: nullableText,
			strictly: nullableText,
			rejects: z.array(z.string().min(1))
		});
		dependencySchema = z.strictObject({
			group_id: nullableText,
			artifact_id: nullableText,
			version: nullableText,
			version_kind: z.enum(REQUESTED_VERSION_KINDS),
			gradle_version: gradleVersionSchema.nullable(),
			scope: nullableText,
			type: nullableText,
			optional: z.boolean().nullable(),
			optional_spelling: nullableText,
			classifier: nullableText,
			exclusions: z.array(exclusionSchema),
			origin: z.enum([
				"dependencies",
				"dependencyManagement",
				"variant-dependencies",
				"variant-constraints"
			]),
			variant: nullableText,
			bom_import: z.boolean(),
			platform: z.boolean()
		});
		unresolvedSchema = z.strictObject({
			kind: z.enum([
				"property",
				"parent-coordinate",
				"missing-coordinate"
			]),
			reference: z.string().min(1),
			field: z.enum([
				"group_id",
				"artifact_id",
				"version",
				"packaging",
				"scope",
				"type",
				"classifier",
				"optional"
			]),
			owner: z.enum([
				"project",
				"parent",
				"dependency",
				"dependency_management",
				"variant"
			]),
			index: z.number().int().nonnegative().nullable()
		});
		gradleVariantSchema = z.strictObject({
			name: nullableText,
			category: nullableText,
			usage: nullableText,
			available_at: z.strictObject({
				group_id: nullableText,
				artifact_id: nullableText,
				version: nullableText,
				url: nullableText,
				url_credentials_redacted: z.boolean()
			}).nullable(),
			dependency_count: uint,
			constraint_count: uint
		});
		mavenGradleMetadataSchema = z.strictObject({
			artifact: z.strictObject({
				path: z.string().min(1),
				sha256: digestSchema,
				bytes: uint
			}),
			format: z.enum(MAVEN_GRADLE_METADATA_FORMATS),
			coordinates: coordinateSchema,
			parent: coordinateSchema.extend({
				relative_path: nullableText,
				relative_path_declared: z.boolean()
			}).nullable(),
			properties: z.array(z.strictObject({
				name: z.string().min(1),
				value: nullableText,
				value_credentials_redacted: z.boolean()
			})),
			dependencies: z.array(dependencySchema),
			dependency_management: z.array(dependencySchema),
			gradle: z.strictObject({
				format_version: nullableText,
				created_by_gradle: nullableText,
				variants: z.array(gradleVariantSchema)
			}).nullable(),
			unresolved: z.array(unresolvedSchema),
			coverage: z.strictObject({
				status: z.literal("complete"),
				examined_bytes: uint
			}),
			limitations: z.array(z.string().min(1)).min(1)
		});
	})))();
}

//#endregion
//#region dist/contracts/java/mavenGradleMetadataToolContracts.js
var MAVEN_GRADLE_METADATA_TOOL_CONTRACTS;
function init_mavenGradleMetadataToolContracts() {
	return (init_mavenGradleMetadataToolContracts = __esmMin((() => {
		init_mavenGradleMetadata();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		MAVEN_GRADLE_METADATA_TOOL_CONTRACTS = [{
			name: "inspect_maven_gradle_metadata",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_maven_gradle_metadata", evidenceEffects),
			kind: "artifact-provider",
			description: "Inspect a local Maven pom.xml or Gradle .module metadata file as static bytes, without running Maven or Gradle, resolving a dependency tree, or contacting a repository. Returns artifact identity, coordinates as spelled, parent and property declarations, dependency and dependencyManagement rows (scope, type, optional, classifier, exclusions, BOM import), Gradle variants and rich versions, and unresolved property or parent-coordinate references as explicit unknowns. Classification is from content, not the suffix. Malformed XML/JSON fails closed; unrecognized documents are unsupported. Resource refusals remain explicit.",
			inputSchema: inspectMavenGradleMetadataInputSchema,
			outputSchema: evidenceResultOf(mavenGradleMetadataSchema),
			examples: [{
				title: "Read declared Maven coordinates and a BOM import",
				input: { path: "/artifacts/pom.xml" }
			}, {
				title: "Read Gradle module variants and version constraints",
				input: { path: "/artifacts/demo-1.2.3.module" }
			}]
		}];
	})))();
}

//#endregion
export { MAVEN_GRADLE_METADATA_DEPENDENCY_ROWS, MAVEN_GRADLE_METADATA_EXCLUSIONS, MAVEN_GRADLE_METADATA_REPEATED_VARIANT_NAME_CHARS, MAVEN_GRADLE_METADATA_TOOL_CONTRACTS, MAVEN_GRADLE_METADATA_UNRESOLVED_RECORDS, MAVEN_GRADLE_METADATA_VARIANTS, MAVEN_GRADLE_METADATA_XML_NODES, MAX_INSPECT_MAVEN_GRADLE_METADATA_FILE_BYTES, init_mavenGradleMetadata, init_mavenGradleMetadataToolContracts, inspectMavenGradleMetadataInputSchema, mavenGradleMetadataSchema, mavenPropertyOccurrences, requestedVersionKind };