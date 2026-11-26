import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_jsonValue, init_localPath, init_schemaAnnotations, jsonObjectSchema, presentRootDiscriminator } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { exportWebScriptsInputSchema, exportedWebScriptSchema, init_analysisViewResult, init_webScriptExport, init_webSourceLocation, init_webSourceLocationView, webScriptExportManifestSchema, webScriptExportResultSchema, webSourceLocationCompleteDeliveryShape, webSourceLocationInputSchema, webSourceLocationMatchesViewResultSchema, webSourceLocationResultSchema, webSourceLocationSummaryDeliveryShape, webSourceLocationSummaryViewResultSchema, webSourceLocationTextViewResultSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { analysisDetailOutputSchemaOf, evidenceResultOf, init_analysisDetail, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/webModuleTrace.js
var webModuleTraceInputSchema, webModuleFileSchema, positionSchema, webModuleImportSchema, webModuleResolutionSchema, webModuleResolutionBatchSchema, webModuleResolutionRequestSchema, webModuleResolutionObservationSchema, candidateSchema, webModuleTraceResultSchema;
function init_webModuleTrace() {
	return (init_webModuleTrace = __esmMin((() => {
		init_jsonValue();
		init_digests();
		init_localPath();
		init_webScriptExport();
		webModuleTraceInputSchema = z.strictObject({
			manifest_path: absoluteLocalPathStringSchema.describe("Absolute path to an export_web_scripts manifest"),
			script_index: z.int().min(0).describe("Zero-based index in manifest.scripts"),
			importer_url: z.string().min(1).optional().describe("Explicit HTTP(S) module URL; useful when captured inline/base context is unknown"),
			import_map: z.strictObject({
				path: absoluteLocalPathStringSchema.describe("Absolute local import-map JSON path; no fetch"),
				base_url: z.string().min(1).describe("Explicit HTTP(S) base for the selected map")
			}).optional()
		});
		webModuleFileSchema = z.strictObject({
			path: z.string().min(1),
			sha256: digestSchema,
			bytes: z.int().min(0)
		});
		positionSchema = z.strictObject({
			offset: z.int().min(0),
			line: z.int().min(1),
			column: z.int().min(0)
		});
		webModuleImportSchema = z.strictObject({
			kind: z.enum([
				"static-import",
				"re-export",
				"dynamic-import"
			]),
			specifier: z.string().nullable(),
			expression: z.string(),
			start: positionSchema,
			end: positionSchema
		});
		webModuleResolutionSchema = z.discriminatedUnion("state", [z.strictObject({
			state: z.literal("resolved"),
			url: z.string().min(1)
		}), z.strictObject({
			state: z.literal("rejected"),
			message: z.string()
		})]);
		webModuleResolutionBatchSchema = z.strictObject({
			engine: z.strictObject({
				id: z.string().min(1),
				version: z.string().min(1)
			}),
			resolutions: z.array(webModuleResolutionSchema),
			diagnostics: z.array(z.string()),
			rawResult: jsonObjectSchema
		});
		webModuleResolutionRequestSchema = z.strictObject({
			importerUrl: z.string().min(1),
			importMap: z.strictObject({
				baseUrl: z.string().min(1),
				value: jsonObjectSchema
			}).nullable(),
			specifiers: z.array(z.string()).readonly()
		});
		webModuleResolutionObservationSchema = z.strictObject({
			kind: z.literal("web-module-resolution"),
			request: webModuleResolutionRequestSchema,
			batch: webModuleResolutionBatchSchema
		});
		candidateSchema = z.strictObject({
			script_index: z.int().min(0),
			match: z.enum(["exact-reported-url", "response-url-without-fragment"]),
			script: exportedWebScriptSchema
		});
		webModuleTraceResultSchema = z.strictObject({
			manifest: webModuleFileSchema.extend({
				reported_output_directory: z.string(),
				...webScriptExportManifestSchema.pick({
					capture_path: true,
					capture_sha256: true,
					capture_kind: true,
					capture_completeness: true,
					source_evidence_id: true
				}).shape
			}),
			source: webModuleFileSchema.extend({
				script_index: z.int().min(0),
				script: exportedWebScriptSchema
			}),
			importer: z.strictObject({
				url: z.string().min(1),
				basis: z.enum(["caller-selected", "reported-source-url"])
			}),
			import_map: webModuleFileSchema.extend({ base_url: z.string().min(1) }).nullable(),
			parser: z.strictObject({
				state: z.enum(["parsed", "unparseable"]),
				diagnostics: z.array(z.string()),
				location_units: z.literal("UTF-16 offsets and columns; one-based lines")
			}),
			engine: z.strictObject({
				id: z.string().min(1),
				version: z.string().min(1)
			}).nullable(),
			imports: z.array(webModuleImportSchema.extend({
				resolution: z.union([webModuleResolutionSchema, z.strictObject({
					state: z.literal("unknown"),
					reason: z.literal("computed-specifier")
				})]),
				captured_candidates: z.array(candidateSchema),
				execution: z.literal("unknown")
			})),
			diagnostics: z.array(z.string()),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/contracts/webScriptToolContracts.js
var webSourceLocationRequestSchema, WEB_SCRIPT_TOOL_CONTRACTS;
function init_webScriptToolContracts() {
	return (init_webScriptToolContracts = __esmMin((() => {
		init_analysisDetail();
		init_webSourceLocationView();
		init_analysisViewResult();
		init_webScriptExport();
		init_webModuleTrace();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		init_webSourceLocation();
		init_schemaAnnotations();
		webSourceLocationRequestSchema = presentRootDiscriminator(z.discriminatedUnion("detail", [webSourceLocationInputSchema.extend(webSourceLocationCompleteDeliveryShape), webSourceLocationInputSchema.extend(webSourceLocationSummaryDeliveryShape)]), "detail");
		WEB_SCRIPT_TOOL_CONTRACTS = [
			{
				name: "trace_web_source_location",
				cli: true,
				...toolContractMetadata("trace_web_source_location", toolEffects({
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true
				})),
				description: "Map one generated position in an exported script through a caller-paired local source map, verifying manifest/script/map byte identities. Returns all equal-position matches, original positions, resolved source URLs and embedded sourcesContent; pairing does not prove deployment authenticity or execution. Lines are one-based, columns zero-based UTF-16; lookup uses the greatest generated position <= requested across lines. Regular maps and inline indexed sections only; external section URLs are unsupported. No network or application execution; decoding uses an owned codec process. Complete delivery is default. detail summary retains Evidence; view {kind:\"source-location\",collection:\"matches\",offset:0,limit:64} pages match metadata. source-text additionally requires match_index and pages UTF-16 text. inspect_analysis_view reuses the retained parent; export_evidence_bundle preserves it. source_map_limits changes byte/record/heap admission per call; decode_timeout_ms is separate. Refusals name the exhausted control; cleanup may outlast the deadline.",
				kind: "application",
				inputSchema: webSourceLocationRequestSchema,
				outputSchema: analysisDetailOutputSchemaOf(webSourceLocationResultSchema, z.union([
					webSourceLocationSummaryViewResultSchema,
					webSourceLocationMatchesViewResultSchema,
					webSourceLocationTextViewResultSchema
				])),
				examples: [{
					title: "Trace a selected captured JavaScript point with retained compact delivery",
					input: {
						detail: "summary",
						manifest_path: "/analysis/scripts/manifest.json",
						script_index: 0,
						source_map: {
							path: "/analysis/app.js.map",
							url: "https://example.test/app.js.map"
						},
						generated_position: {
							line: 1,
							column: 25
						}
					}
				}]
			},
			{
				name: "trace_web_module_imports",
				cli: true,
				...toolContractMetadata("trace_web_module_imports", toolEffects({
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "Resolve native ES imports/re-exports from one script in a local export_web_scripts manifest. Verifies the selected source digest/size and returns source positions, resolved URLs/errors and every matching captured candidate. URL query/fragment identities remain distinct; computed imports, bundler IDs and execution remain unknown. Supply importer_url when inline/document-base context is unknown and an import_map when needed. Literal resolution requires absolute REA_BROWSER_EXECUTABLE: caller-supplied Chromium runs only a trusted REA resolver stub with page requests fulfilled locally or blocked, without captured app execution or asset refetch. The native deadline is 20 seconds; cleanup may extend it.",
				kind: "application",
				inputSchema: webModuleTraceInputSchema,
				outputSchema: evidenceResultOf(webModuleTraceResultSchema),
				examples: [{
					title: "Trace an exported module under a selected import map",
					input: {
						manifest_path: "/analysis/exported-scripts/manifest.json",
						script_index: 0,
						import_map: {
							path: "/analysis/import-map.json",
							base_url: "https://example.test/app/"
						}
					}
				}]
			},
			{
				name: "export_web_scripts",
				cli: true,
				...toolContractMetadata("export_web_scripts", toolEffects({
					mutatesSession: true,
					writesFilesystem: true,
					idempotent: false
				})),
				description: "Export JavaScript bytes already retained in one local inspect_web_page or capture_browser_scenario JSON capture (normalized result or complete Evidence). Writes scripts and a digest-verified manifest into an absent absolute output_directory. Returns all source URLs, script or transaction/event references, unavailable states, and an analysis_input for analyze_javascript_application when any bytes were exported. Include script sources in inspect_web_page or select capture.network.response_body in scenarios. No refetch or execution. Safe unambiguous URL layouts preserve relative module paths; versions, query variants, inline scripts, and path collisions are isolated with explicit resolution limitations.",
				kind: "application",
				inputSchema: exportWebScriptsInputSchema,
				outputSchema: evidenceResultOf(webScriptExportResultSchema),
				examples: [{
					title: "Export a saved website capture for static JavaScript analysis",
					input: {
						capture_path: "/analysis/capture.json",
						output_directory: "/analysis/exported-scripts"
					}
				}]
			}
		];
	})))();
}

//#endregion
export { WEB_SCRIPT_TOOL_CONTRACTS, init_webModuleTrace, init_webScriptToolContracts, webModuleFileSchema, webModuleResolutionBatchSchema, webModuleResolutionObservationSchema, webModuleResolutionSchema, webModuleTraceInputSchema, webModuleTraceResultSchema };