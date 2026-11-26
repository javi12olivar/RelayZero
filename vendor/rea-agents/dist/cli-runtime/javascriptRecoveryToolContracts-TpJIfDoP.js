import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_coverage, init_localPath, knownCoverageStatusSchema } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { analyzeJavaScriptApplicationInputSchema, init_javascriptApplicationAnalysis } from "./javascriptModuleUnits-YkbK0IJF.js";
import { evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/javascript/javascriptRecovery.js
var javascriptRecoveryInputSchema, fileSchema, rangeSchema, sourceSchema, javascriptRecoveryResultSchema;
function init_javascriptRecovery() {
	return (init_javascriptRecovery = __esmMin((() => {
		init_coverage();
		init_digests();
		init_javascriptApplicationAnalysis();
		init_localPath();
		javascriptRecoveryInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute path to a UTF-8 JavaScript file; never executed"),
			additional_paths: z.array(absoluteLocalPathStringSchema).max(16).optional().describe("Additional absolute UTF-8 JavaScript files recovered together with path; each is snapshotted separately so imports can resolve across related chunks. All inputs share a 64 MiB total budget"),
			output_directory: absoluteLocalPathStringSchema.describe("Absolute absent output directory; parent must exist"),
			extraction_mode: z.enum([
				"structural",
				"heuristic",
				"inspection"
			]).default("structural").describe("Structural module boundaries, heuristic fallback, or finer inspection-only regions"),
			rewrite_level: z.enum([
				"minimal",
				"standard",
				"aggressive"
			]).default("standard").describe("Upstream syntax recovery level; runtime equivalence remains unverified")
		});
		fileSchema = z.strictObject({
			path: z.string().min(1),
			sha256: digestSchema,
			bytes: z.int().nonnegative()
		});
		rangeSchema = z.strictObject({
			start: z.int().nonnegative(),
			end: z.int().nonnegative()
		});
		sourceSchema = fileSchema.extend({
			snapshot_path: z.string().min(1),
			published_copy: fileSchema
		});
		javascriptRecoveryResultSchema = z.strictObject({
			source: sourceSchema,
			additional_sources: z.array(sourceSchema).optional(),
			engine: z.strictObject({
				id: z.string().min(1),
				version: z.string().min(1),
				executable: fileSchema,
				audited_source_revision: z.string().min(1),
				executed_source_revision: z.string().nullable()
			}),
			options: z.strictObject({
				extraction_mode: javascriptRecoveryInputSchema.shape.extraction_mode.removeDefault(),
				rewrite_level: javascriptRecoveryInputSchema.shape.rewrite_level.removeDefault()
			}),
			status: knownCoverageStatusSchema,
			detected_formats: z.array(z.string()),
			reported_safety: z.string(),
			reported_strategy: z.string(),
			reported_format: z.string(),
			total: z.int().nonnegative(),
			failed: z.int().nonnegative(),
			modules: z.array(z.strictObject({
				reported_filename: z.string().min(1),
				reported_status: z.string().min(1),
				artifact: fileSchema,
				source_map: fileSchema.nullable(),
				provenance: z.strictObject({
					reported_input: z.string(),
					original_path: z.string(),
					original_sha256: digestSchema,
					extraction: z.string(),
					byte_ranges: z.array(rangeSchema),
					context_byte_ranges: z.array(rangeSchema),
					range_semantics: z.literal("half-open-utf8-bytes")
				})
			})),
			warnings: z.array(z.strictObject({
				filename: z.string(),
				kind: z.string(),
				is_error: z.boolean(),
				message: z.string()
			})),
			report: fileSchema,
			provenance: fileSchema,
			manifest: fileSchema,
			analysis_input: z.strictObject({
				input_path: analyzeJavaScriptApplicationInputSchema.shape.input_path,
				format: z.literal("directory")
			}).nullable(),
			runtime_equivalence: z.literal("unknown"),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/contracts/javascript/javascriptRecoveryToolContracts.js
var JAVASCRIPT_RECOVERY_TOOL_CONTRACTS;
function init_javascriptRecoveryToolContracts() {
	return (init_javascriptRecoveryToolContracts = __esmMin((() => {
		init_javascriptRecovery();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		JAVASCRIPT_RECOVERY_TOOL_CONTRACTS = [{
			name: "recover_javascript_sources",
			availability: { host: "javascriptRecovery" },
			cli: true,
			...toolContractMetadata("recover_javascript_sources", toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				launchesProcess: true,
				idempotent: false
			})),
			kind: "application",
			description: "Recover readable modules from local UTF-8 JavaScript bundles into an absent output_directory, without executing application code. Requires caller-supplied Wakaru ^1.13.0 (verified 1.14.0), Linux x64 and util-linux prlimit. additional_paths includes related chunks, preserving each input’s snapshot/provenance. Returns original/derived digests, extraction ranges, source maps, warnings and analysis_input for analyze_javascript_application. Splitting may fall back to one module; original names and runtime equivalence remain unknown. One worker has a fixed 120-second deadline and bounded input/output/report admission; limit failures are explicit and roll back output.",
			inputSchema: javascriptRecoveryInputSchema,
			outputSchema: evidenceResultOf(javascriptRecoveryResultSchema),
			examples: [{
				title: "Recover a captured production bundle",
				input: {
					path: "/tmp/web-scripts/app.js",
					output_directory: "/tmp/recovered-app"
				}
			}, {
				title: "Recover a code-split bundle together",
				input: {
					path: "/tmp/web-scripts/main.js",
					additional_paths: [
						"/tmp/web-scripts/runtime.js",
						"/tmp/web-scripts/shared.js",
						"/tmp/web-scripts/checkout.chunk.js"
					],
					output_directory: "/tmp/recovered-chunks"
				}
			}]
		}];
	})))();
}

//#endregion
export { JAVASCRIPT_RECOVERY_TOOL_CONTRACTS, init_javascriptRecovery, init_javascriptRecoveryToolContracts, javascriptRecoveryInputSchema, javascriptRecoveryResultSchema };