import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { analysisViewResultSchema, init_analysisViewRequest, init_analysisViewResult, inspectAnalysisViewInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";

//#region dist/contracts/analysisViewApiSurfaceExample.js
var API_SURFACE_EXAMPLE;
function init_analysisViewApiSurfaceExample() {
	return (init_analysisViewApiSurfaceExample = __esmMin((() => {
		API_SURFACE_EXAMPLE = {
			input: {
				source: {
					kind: "retained-evidence",
					evidence_id: "ev_267522986f962ec19b8712fd3dfdaa5644031f68fb547373fc39de3fef643acb"
				},
				view: {
					kind: "api-surface",
					offset: 0,
					limit: 50
				}
			},
			output: {
				parent_evidence_id: "ev_267522986f962ec19b8712fd3dfdaa5644031f68fb547373fc39de3fef643acb",
				parent_operation: "inspect_web_network_capture",
				parent_digest: "267522986f962ec19b8712fd3dfdaa5644031f68fb547373fc39de3fef643acb",
				view_digest: "39fc0119d9290a8bf0d8863e1e0275674c2417c0e1c7b7dcb4df486423cec626",
				artifact: {
					path: "/fixtures/api-surface.har",
					sha256: "bf58e2c06e55bfe7e0628157c4ad027ce0aeb81a10e8edef8a7f95b8e5f14225"
				},
				coverage: {
					status: "page",
					examined: 1,
					total: 1,
					next_offset: null,
					exhausted: true
				},
				limitations: ["Grouping does not establish handler identity, URL-space schemas or causality.", "HAR text without an encoding declaration is producer-decoded Unicode. Unsupported declared body encodings remain opaque; original body bytes remain unknown unless content explicitly uses valid base64. Declared sizes are preserved independently of retained bytes. mitmproxy 12.2.3 SaveHar may report null optional postData.text; that null is retained and omitted only from the upstream validation copy."],
				unknowns: [],
				records: {
					examined: 2,
					total: 2,
					excluded: 0
				},
				templated_groups: 1,
				groups: [{
					method: "GET",
					origin: "https://api.example.test",
					path_template: "/users/{numeric}",
					templated_segments: [{
						segment_index: 1,
						rule: "numeric",
						basis: "inferred",
						observed_values: ["8812", "9031"]
					}],
					record_ordinals: [0, 1],
					statuses: [200, 404],
					content_types: ["application/json", "text/plain"],
					flags: ["mixed-statuses", "mixed-content-types"]
				}],
				excluded_records: [],
				kind: "api-surface",
				view: {
					kind: "api-surface",
					offset: 0,
					limit: 50
				}
			}
		};
	})))();
}

//#endregion
//#region dist/contracts/analysisViewEnvironmentManifestExample.js
var ENVIRONMENT_MANIFEST_EXAMPLE;
function init_analysisViewEnvironmentManifestExample() {
	return (init_analysisViewEnvironmentManifestExample = __esmMin((() => {
		ENVIRONMENT_MANIFEST_EXAMPLE = {
			input: {
				source: {
					kind: "retained-evidence",
					evidence_id: "ev_8eb1873465f0b0acb83f57e6bda1f7dc921f16bf6832310a2102d7c1f6eaad3c"
				},
				view: {
					kind: "environment-manifest",
					template_rules: ["after-uid-literal"]
				}
			},
			output: {
				parent_evidence_id: "ev_8eb1873465f0b0acb83f57e6bda1f7dc921f16bf6832310a2102d7c1f6eaad3c",
				parent_operation: "inspect_web_network_capture",
				parent_digest: "8eb1873465f0b0acb83f57e6bda1f7dc921f16bf6832310a2102d7c1f6eaad3c",
				view_digest: "ab9708516d5cd0b6c377215e14231222f822552d77c3f446155d7eae6e4ea045",
				artifact: {
					path: "/fixtures/environment-manifest.har",
					sha256: "5bee3e93d69fa5f8650737417615da7fda09f1d8f3e39c1fae8ee69fbcb03420"
				},
				coverage: {
					status: "complete-within-view",
					examined: 2,
					total: 2,
					next_offset: null,
					exhausted: true
				},
				limitations: [
					"Body shapes list top-level JSON key types from one recorded request each; they do not establish required fields or a complete schema.",
					"HAR text without an encoding declaration is producer-decoded Unicode. Unsupported declared body encodings remain opaque; original body bytes remain unknown unless content explicitly uses valid base64. Declared sizes are preserved independently of retained bytes. mitmproxy 12.2.3 SaveHar may report null optional postData.text; that null is retained and omitted only from the upstream validation copy.",
					"Observed query parameter names do not establish required parameters, value types or a complete API schema.",
					"Opt-in template rules after-uid-literal merge recorded literals by shape; merged parameters may conflate distinct resources.",
					"Tool templates, parameters and names are inferences from recorded request lines; they do not establish handler identity, URL-space schemas or causality."
				],
				unknowns: [
					{
						kind: "authorization-model",
						statement: "Authorization headers and cookies are structurally excluded from captures; the manifest states no authorization model."
					},
					{
						kind: "response-semantics",
						statement: "Recorded statuses and bodies are retained only as pointers to parent records; the manifest states no response semantics."
					},
					{
						kind: "state-transition",
						statement: "Recorded exchanges are independent observations; the manifest states no ordering, side effects or state transitions between tools."
					}
				],
				origin: "http://grafana.example",
				name: "grafana-example",
				tools: [{
					name: "get_dashboards_by_uid",
					method: "GET",
					path_template: "/api/dashboards/uid/{uid}",
					api_surface_template: "/api/dashboards/uid/acb4v6",
					params: [{
						index: 3,
						name: "uid",
						rule: "after-uid-literal",
						basis: "inferred",
						observed_values: ["acb4v6"]
					}],
					query_parameter_names: [],
					body_shape: null,
					statuses: [200],
					content_types: ["application/json"],
					record_ordinals: [0]
				}, {
					name: "post_folders",
					method: "POST",
					path_template: "/api/folders",
					api_surface_template: "/api/folders",
					params: [],
					query_parameter_names: [],
					body_shape: {
						type: "object",
						properties: { title: "string" }
					},
					statuses: [200],
					content_types: ["application/json"],
					record_ordinals: [1]
				}],
				records: [{
					ordinal: 0,
					method: "GET",
					path: "/api/dashboards/uid/acb4v6",
					status: 200,
					content_type: "application/json"
				}, {
					ordinal: 1,
					method: "POST",
					path: "/api/folders",
					status: 200,
					content_type: "application/json"
				}],
				excluded: [{
					method: "GET",
					origin: "http://grafana.example",
					path_template: "/avatar/{hex}",
					reason: "ui-page-or-asset"
				}],
				templated_groups: 2,
				kind: "environment-manifest",
				view: {
					kind: "environment-manifest",
					template_rules: ["after-uid-literal"],
					include_query_parameter_names: true
				}
			}
		};
	})))();
}

//#endregion
//#region dist/contracts/analysisViewToolContracts.js
var RETAINED_EXAMPLE_ID, ANALYSIS_VIEW_TOOL_CONTRACTS;
function init_analysisViewToolContracts() {
	return (init_analysisViewToolContracts = __esmMin((() => {
		init_analysisViewApiSurfaceExample();
		init_analysisViewEnvironmentManifestExample();
		init_analysisViewRequest();
		init_analysisViewResult();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		RETAINED_EXAMPLE_ID = `ev_${"a".repeat(64)}`;
		ANALYSIS_VIEW_TOOL_CONTRACTS = [{
			name: "inspect_analysis_view",
			cli: true,
			...toolContractMetadata("inspect_analysis_view", evidenceEffects),
			kind: "application",
			description: "Read summaries, selected facts, or pages from completed Evidence without rerunning analysis. Use the producing tool’s retained-view handoff for compatible selectors; the examples here are not exhaustive. Copy normalized_result.parent_evidence_id from a summary into source: {kind: \"retained-evidence\", evidence_id: \"<parent_evidence_id>\"}. Other sources are {kind: \"inline\", evidence: <complete Evidence>} or {kind: \"evidence-file\", path: \"<absolute JSON path>\", evidence_id?: \"<record ID>\"}; select an ID for a multi-record bundle. For native pseudocode use {source: {kind: \"retained-evidence\", evidence_id: \"<parent_evidence_id>\"}, view: {kind: \"native\", facet: \"pseudocode\", offset: 0, limit: 128}}; procedure_pseudo_code parents support this text facet, while other native function facets require analyze_function. Common views: {kind: \"summary\"} has no facet; {kind: \"inventory\", collection: \"occurrences\", logical_paths: [\"package.json\"], offset: 0, limit: 64} selects artifact paths; {kind: \"capture\", detail: \"preview\", offset: 0, limit: 20} pages saved network records; {kind: \"managed-members\", collection: \"methods\", offset: 0, limit: 64} pages managed members. Use the producer’s named kind for other families; compact schemas may omit nested shapes, so do not invent selectors. Text offsets/limits use UTF-16 code units; row pages count the selected retained collection. Preserve parent identity, null/unavailable values, source coverage, limitations and unknowns; exhausting pages does not prove complete discovery, runtime use or absence. Smaller pages can resolve delivery limits without repeating analysis; complete parent Evidence remains available for export.",
			inputSchema: inspectAnalysisViewInputSchema,
			outputSchema: evidenceResultOf(analysisViewResultSchema),
			examples: [
				{
					title: "Page endpoint observations from retained web bundle analysis Evidence",
					input: {
						source: {
							kind: "retained-evidence",
							evidence_id: RETAINED_EXAMPLE_ID
						},
						view: {
							kind: "web-bundle",
							collection: "endpoints",
							offset: 0,
							limit: 32
						}
					}
				},
				{
					title: "Page selected native inventory fields without repeating the complete list",
					input: {
						source: {
							kind: "retained-evidence",
							evidence_id: RETAINED_EXAMPLE_ID
						},
						view: {
							kind: "native-inventory",
							offset: 0,
							limit: 32,
							fields: ["value"]
						}
					}
				},
				{
					title: "Read exact inventory paths from retained inspection Evidence",
					input: {
						source: {
							kind: "retained-evidence",
							evidence_id: RETAINED_EXAMPLE_ID
						},
						view: {
							kind: "inventory",
							collection: "occurrences",
							logical_paths: ["package.json", "main.js"],
							offset: 0,
							limit: 32
						}
					}
				},
				{
					title: "Group requests from retained HAR Evidence",
					input: API_SURFACE_EXAMPLE.input
				},
				{
					title: "Project an environment manifest from retained HAR Evidence",
					input: ENVIRONMENT_MANIFEST_EXAMPLE.input
				},
				{
					title: "Summarize retained analysis Evidence, including WASM",
					input: {
						source: {
							kind: "retained-evidence",
							evidence_id: RETAINED_EXAMPLE_ID
						},
						view: { kind: "summary" }
					}
				},
				{
					title: "Read one ELF section from retained layout Evidence",
					input: {
						source: {
							kind: "retained-evidence",
							evidence_id: RETAINED_EXAMPLE_ID
						},
						view: {
							kind: "item",
							collection: "sections",
							selector: { name: ".text" }
						}
					}
				},
				{
					title: "Page native high-pcode operations from retained Evidence",
					input: {
						source: {
							kind: "retained-evidence",
							evidence_id: RETAINED_EXAMPLE_ID
						},
						view: {
							kind: "native",
							facet: "value_flow_operations",
							offset: 0,
							limit: 32
						}
					}
				},
				{
					title: "Page module identities from retained application Evidence",
					input: {
						source: {
							kind: "retained-evidence",
							evidence_id: RETAINED_EXAMPLE_ID
						},
						view: {
							kind: "page",
							collection: "modules",
							offset: 0,
							limit: 32
						}
					}
				},
				{
					title: "Read selected metadata and native facts by exact retained paths",
					input: {
						source: {
							kind: "retained-evidence",
							evidence_id: RETAINED_EXAMPLE_ID
						},
						view: {
							kind: "javascript-facts",
							where: { paths: ["package.json", "build/Release/addon.node"] },
							property_keys: [
								"name",
								"version",
								"bytes",
								"availability",
								"operation",
								"analysis_status"
							],
							include_available_property_keys: true,
							offset: 0,
							limit: 32
						}
					}
				},
				{
					title: "Read typed module reference facts from retained application Evidence",
					input: {
						source: {
							kind: "retained-evidence",
							evidence_id: RETAINED_EXAMPLE_ID
						},
						view: {
							kind: "javascript",
							collection: "modules",
							projection: "references",
							where: {
								path: "main.js",
								kind: "javascript-module"
							},
							offset: 0,
							limit: 64
						}
					}
				}
			]
		}];
	})))();
}

//#endregion
export { ANALYSIS_VIEW_TOOL_CONTRACTS, init_analysisViewToolContracts };