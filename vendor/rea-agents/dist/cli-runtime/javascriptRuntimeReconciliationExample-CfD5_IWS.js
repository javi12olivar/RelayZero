import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { MAX_NODE_TIMER_DELAY_MS, absoluteLocalPathStringSchema, init_analysisResourceLimits, init_coverage, init_localPath, knownCoverageStatusSchema } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { init_artifactIdentity, logicalPathEscapesRoot } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_urlComponents, urlDeclaresQueryOrFragment } from "./urlComponents-DJm-wtqY.js";
import { createEvidence, evidenceInputSchema, evidenceSchema, init_evidence, init_evidenceReference, init_offsetDateTime, utcDateTimeSchema } from "./nativeValueFlow-13oOEkkJ.js";
import { digestSchema, init_digests, init_targetIdentity, prefixedDigestSchema, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_textSchemas, nonEmptyTextSchema } from "./textSchemas-UeTwLioW.js";
import { compareSourceToBundleInputSchema, endpointComparisonViewRequestSchema, featureTraceViewRequestSchema, init_endpointComparisonView, init_featureTraceView, init_javascriptFeatureTraceSchemas, init_sourceToBundleComparisonSchemas, init_sourceToBundleView, sourceToBundleViewRequestSchema, traceApplicationFeatureInputSchema } from "./featureTraceView-CDxdbO2M.js";
import { browserEndpointSchema, init_browserDeadline, init_browserObservation, recordedBrowserOriginSchema, webRuntimeCommandTimeoutSchema } from "./browserObservation-BVcDYwHI.js";
import { browserCompletenessSchema, browserVersionSchema, cdpDomSnapshotSchema, cdpScriptMetadataSchema, cdpScriptSourceSchema, createWebTextArtifact, init_browserCompleteness, init_browserObservationSchemas, init_cdpObservationSchemas, init_webContentArtifact } from "./browserObservationSchemas-D0tzRJhs.js";
import { JAVASCRIPT_SEMANTIC_NODE_KINDS, JAVASCRIPT_SEMANTIC_RELATIONS, JAVASCRIPT_SEMANTIC_RELATION_FAMILIES, applicationCoverageStatusSchema, init_javascriptApplicationEvidenceSchemas, init_javascriptSemanticGraphSchemas, init_javascriptSourceCoordinates, javaScriptSemanticEvidenceContextSchema, javaScriptSemanticNodeSchema, javaScriptSemanticRelationSchema, javaScriptSemanticUnknownSchema, javascriptSourceRangeSchema } from "./javascriptSemanticGraphSchemas-Cmwji5L9.js";
import { createJavaScriptApplicationEdge, createJavaScriptApplicationGraph, createJavaScriptApplicationNode, init_javascriptApplicationGraph, javascriptApplicationGraphSchema } from "./javascriptSourceSelection-CZ4gLy-b.js";
import { JavaScriptSemanticEvidenceContextRegistry, createJavaScriptSemanticGraph, createJavaScriptSemanticGraphNode, init_javascriptSemanticGraph } from "./javascriptModuleUnits-YkbK0IJF.js";
import { init_javascriptRuntimeObservation, javascriptRuntimeUnresolvedLocationSchema } from "./javascriptRuntimeObservation-BN-cCmOd.js";
import { z } from "zod";

//#region dist/domain/javascript/electronObservation.js
var approvedElectronInput, listElectronTargetsInputSchema, inspectElectronPageFacts, inspectElectronPageInputSchema, electronTargetSchema, electronTargetListSchema, electronScriptFrameClaimsSchema, electronPageInspectionSchema;
function init_electronObservation() {
	return (init_electronObservation = __esmMin((() => {
		init_offsetDateTime();
		init_browserDeadline();
		init_browserCompleteness();
		init_browserObservation();
		init_browserObservationSchemas();
		init_cdpObservationSchemas();
		init_digests();
		approvedElectronInput = { cdp_endpoint: browserEndpointSchema };
		listElectronTargetsInputSchema = z.strictObject({ ...approvedElectronInput });
		inspectElectronPageFacts = {
			...approvedElectronInput,
			target_id: z.string().min(1),
			observation_ms: z.int().min(0).default(100),
			command_timeout_ms: webRuntimeCommandTimeoutSchema
		};
		inspectElectronPageInputSchema = z.union([z.strictObject({
			...inspectElectronPageFacts,
			include_script_sources: z.literal(false).default(false)
		}), z.strictObject({
			...inspectElectronPageFacts,
			include_script_sources: z.literal(true)
		})]);
		electronTargetSchema = z.object({
			target_id: z.string(),
			type: z.string(),
			title: z.string(),
			file_path: z.string(),
			attached: z.boolean().nullable().describe("Discovery-reported debugger attachment state; null means unknown")
		});
		electronTargetListSchema = z.object({
			browser: browserVersionSchema,
			targets: z.array(electronTargetSchema),
			excluded: z.object({
				unsupported_url: z.int().min(0),
				non_page: z.int().min(0)
			}),
			limitations: z.array(z.string())
		});
		electronScriptFrameClaimsSchema = z.object({
			script_event_frame_id: z.string().exactOptional(),
			execution_context_frame_id: z.string().exactOptional()
		});
		electronPageInspectionSchema = z.object({
			browser: browserVersionSchema,
			target: electronTargetSchema,
			capture_window: z.object({
				started_at: utcDateTimeSchema,
				ended_at: utcDateTimeSchema,
				observation_ms: z.int().min(0)
			}),
			completeness: browserCompletenessSchema,
			frames: z.array(z.object({
				frame_id: z.string(),
				parent_frame_id: z.string().nullable(),
				file_path: z.string()
			})),
			dom: cdpDomSnapshotSchema,
			scripts: z.object({
				total: z.int().min(0),
				items: z.array(z.object({
					script_key: prefixedDigestSchema("electron_script"),
					frame_id: z.string().nullable().default(null),
					frame_scope: z.enum(["authorized", "unknown"]).exactOptional(),
					frame_claims: electronScriptFrameClaimsSchema.exactOptional(),
					file_path: z.string(),
					has_source_url: z.boolean().nullable().exactOptional(),
					reported_url: z.string().exactOptional(),
					...cdpScriptMetadataSchema.shape,
					source: cdpScriptSourceSchema
				}))
			}),
			resources: z.array(z.object({
				resource_key: prefixedDigestSchema("electron_resource"),
				file_path: z.string(),
				type: z.string(),
				mime_type: z.string(),
				content_size: z.number().min(0).nullable()
			})),
			workers: z.array(z.object({
				target_id: z.string().min(1),
				type: z.string().min(1),
				file_path: z.string(),
				attached: z.boolean(),
				opener_target_id: z.string().min(1).nullable(),
				parent_frame_id: z.string().min(1).nullable()
			})).default([]),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/javascript/electronActiveObservation.js
var absolutePathSchema, windowIndexSchema, deepLinkUrlSchema, actionSchema, electronActiveObservationInputSchema, electronActiveTimelineEventSchema, ipcEventSchema, electronActiveProcessMetricSchema, electronActiveWindowSchema, coverageSchema, actionResultContextShape, actionResultSchema, electronActiveObservationResultSchema;
function init_electronActiveObservation() {
	return (init_electronActiveObservation = __esmMin((() => {
		init_analysisResourceLimits();
		init_localPath();
		absolutePathSchema = z.string().min(1).refine((value) => value.startsWith("/") || /^[A-Za-z]:[\\/]/u.test(value) || value.startsWith("\\\\"), "provider path must be absolute");
		windowIndexSchema = z.int().min(0);
		deepLinkUrlSchema = z.string().min(1).refine((value) => {
			try {
				return new URL(value).protocol.length > 0;
			} catch (cause) {
				void cause;
				return false;
			}
		}, "deep-link url must be an absolute URL");
		actionSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				step_id: z.string().min(1),
				kind: z.literal("click"),
				selector: z.string().min(1),
				window_index: windowIndexSchema.default(0)
			}),
			z.strictObject({
				step_id: z.string().min(1),
				kind: z.literal("wait"),
				duration_ms: z.int().min(0).max(MAX_NODE_TIMER_DELAY_MS).describe(`Wait this many milliseconds, from 0 to ${String(MAX_NODE_TIMER_DELAY_MS)}; the wait ends early on cancellation.`),
				window_index: windowIndexSchema.optional()
			}),
			z.strictObject({
				step_id: z.string().min(1),
				kind: z.literal("renderer-reload"),
				window_index: windowIndexSchema.default(0)
			}),
			z.strictObject({
				step_id: z.string().min(1),
				kind: z.literal("renderer-crash"),
				window_index: windowIndexSchema.default(0)
			}),
			z.strictObject({
				step_id: z.string().min(1),
				kind: z.literal("deep-link"),
				delivery: z.enum(["open-url", "second-instance"]),
				url: deepLinkUrlSchema
			})
		]);
		electronActiveObservationInputSchema = z.strictObject({
			executable_path: absoluteLocalPathStringSchema.describe("Absolute local filesystem path for the Electron executable; relative paths are rejected."),
			application_path: absoluteLocalPathStringSchema.describe("Absolute local filesystem path for the Electron application; relative paths are rejected."),
			application_root: absoluteLocalPathStringSchema.optional().describe("Absolute local filesystem root for application-relative paths; omit to derive it from the application path. Relative paths are rejected."),
			args: z.array(z.string().regex(/^[^\x00]*$/u, "Electron arguments must not contain NUL")).default([]),
			actions: z.array(actionSchema).default([])
		});
		electronActiveTimelineEventSchema = z.strictObject({
			sequence: z.int().min(1),
			correlation_id: z.string().nullable(),
			kind: z.enum([
				"main-handler-invocation",
				"main-event-invocation",
				"ipc-observation-gap",
				"utility-process-fork",
				"utility-process-message",
				"ipc-main-to-renderer",
				"ipc-utility-to-main",
				"ipc-renderer-send",
				"ipc-renderer-invoke",
				"ipc-renderer-post-message",
				"app-lifecycle",
				"window-lifecycle",
				"web-contents-lifecycle",
				"navigation",
				"shell-attempt",
				"process-lifecycle",
				"permission",
				"popup-attempt",
				"download",
				"protocol",
				"preload",
				"native-addon",
				"updater",
				"error"
			]),
			event: z.string().nullable(),
			phase: z.enum([
				"attempted",
				"completed",
				"blocked",
				"failed",
				"observed"
			]),
			channel: z.string().nullable(),
			direction: z.enum([
				"renderer-to-main",
				"main-to-renderer",
				"main-to-utility",
				"utility-to-main"
			]).nullable(),
			sender: z.string().nullable(),
			receiver: z.string().nullable(),
			frame: z.string().nullable(),
			target: z.string().nullable(),
			argument_shapes: z.array(z.string()),
			result_shape: z.string().nullable(),
			process_type: z.string().nullable(),
			source: z.string(),
			capture_method: z.enum([
				"api-wrapper",
				"event-emitter",
				"process-hook"
			]),
			artifact_path: z.string().nullable(),
			artifact_sha256: z.string().regex(/^[a-f0-9]{64}$/u).nullable(),
			error: z.boolean()
		});
		ipcEventSchema = electronActiveTimelineEventSchema.extend({ kind: z.enum([
			"main-handler-invocation",
			"main-event-invocation",
			"utility-process-fork",
			"utility-process-message",
			"ipc-main-to-renderer",
			"ipc-utility-to-main",
			"ipc-renderer-send",
			"ipc-renderer-invoke",
			"ipc-renderer-post-message"
		]) });
		electronActiveProcessMetricSchema = z.strictObject({
			pid: z.int().min(1),
			type: z.string().min(1),
			name: z.string().nullable(),
			service_name: z.string().nullable()
		});
		electronActiveWindowSchema = z.strictObject({
			window_id: z.string(),
			web_contents_id: z.string(),
			url: z.string(),
			title: z.string(),
			visible: z.boolean().nullable(),
			destroyed: z.boolean()
		});
		coverageSchema = z.strictObject({
			status: z.enum([
				"complete",
				"partial_attach",
				"hook_conflict",
				"target_exited",
				"cleanup_failed"
			]),
			observed_event_families: z.array(z.string()),
			unavailable_event_families: z.array(z.string()),
			observed_roles: z.array(z.string()),
			pre_capture_activity: z.literal("unavailable")
		});
		actionResultContextShape = {
			step_id: z.string().min(1),
			kind: z.enum([
				"click",
				"wait",
				"renderer-reload",
				"renderer-crash",
				"deep-link"
			]),
			window_index: windowIndexSchema.nullable(),
			target: z.string().nullable(),
			elapsed_ms: z.int().min(0)
		};
		actionResultSchema = z.discriminatedUnion("status", [z.strictObject({
			...actionResultContextShape,
			status: z.literal("completed"),
			error: z.null()
		}), z.strictObject({
			...actionResultContextShape,
			status: z.enum(["failed", "cancelled"]),
			error: z.string()
		})]);
		electronActiveObservationResultSchema = z.strictObject({
			application: z.strictObject({
				executable_path: absolutePathSchema,
				application_path: absolutePathSchema,
				electron_version: z.string().min(1),
				process_ownership: z.literal("provider-owned"),
				cleanup: z.literal("terminated-owned-process")
			}),
			actions: z.array(actionResultSchema),
			windows: z.array(electronActiveWindowSchema),
			processes: z.strictObject({ items: z.array(electronActiveProcessMetricSchema) }),
			ipc: z.strictObject({
				events: z.array(ipcEventSchema),
				observed: z.int().min(0),
				dropped: z.int().min(0)
			}),
			timeline: z.strictObject({
				events: z.array(electronActiveTimelineEventSchema),
				observed: z.int().min(0),
				dropped: z.int().min(0)
			}),
			retention: z.strictObject({
				budget_bytes: z.int().min(0),
				estimated_retained_bytes: z.int().min(0),
				event_serialized_byte_upper_bound: z.int().min(0),
				retained: z.int().min(0),
				dropped: z.int().min(0),
				dropped_event_families: z.array(z.strictObject({
					family: z.string().min(1),
					count: z.int().min(1)
				})),
				dropped_event_roles: z.array(z.strictObject({
					role: z.string().min(1),
					count: z.int().min(1)
				})),
				observed_ipc: z.int().min(0),
				dropped_ipc: z.int().min(0),
				observed_runtime: z.int().min(0),
				dropped_runtime: z.int().min(0)
			}),
			coverage: coverageSchema,
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptRuntimeReconciliationSchemas.js
function normalizeRuntimeMappings(mappings) {
	return [...new Map(mappings.map((mapping) => [runtimeMappingKey(mapping), mapping])).values()].sort((left, right) => compareUnicodeCodePoints(runtimeMappingKey(left), runtimeMappingKey(right)));
}
function runtimeMappingKey(mapping) {
	return mapping.kind === "file-root" ? `file-root\0${mapping.root}\0${mapping.artifact_prefix}` : `url-prefix\0${mapping.prefix}\0${mapping.artifact_prefix}`;
}
var evidenceIdSchema$2, nodeIdSchema$1, safePrefixSchema, runtimeFileMappingSchema, runtimeUrlMappingSchema, normalizeRuntimeUrlPrefix, runtimeLocationMappingSchema, staticLayerSchema, validateReconciliationIdentities, runtimeReconciliationIdentitiesSchema, reconcileJavaScriptRuntimeInputSchema, layerSummarySchema, captureSummarySchema, reconciliationReasonSchema, reconciliationItemShape, reconciliationItemSchema, staticLoadStateSchema, javascriptRuntimeReconciliationResultSchema;
function init_javascriptRuntimeReconciliationSchemas() {
	return (init_javascriptRuntimeReconciliationSchemas = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_artifactIdentity();
		init_evidence();
		init_javascriptRuntimeObservation();
		init_javascriptApplicationGraph();
		init_digests();
		init_urlComponents();
		init_textSchemas();
		evidenceIdSchema$2 = prefixedDigestSchema("ev");
		nodeIdSchema$1 = prefixedDigestSchema("jag_node");
		safePrefixSchema = z.string().refine((value) => value === "" || !logicalPathEscapesRoot(value) && value.split("/").every((part) => ![
			"",
			".",
			".."
		].includes(part)), "Artifact prefix must be empty or a safe relative POSIX path");
		runtimeFileMappingSchema = z.strictObject({
			kind: z.literal("file-root"),
			root: z.string().min(1),
			artifact_prefix: safePrefixSchema.default("")
		});
		runtimeUrlMappingSchema = z.strictObject({
			kind: z.literal("url-prefix"),
			prefix: z.string().min(1).refine((value) => normalizeRuntimeUrlPrefix(value) !== null, "Runtime URL prefix must be HTTP(S) without credentials, query, or fragment").overwrite((value) => normalizeRuntimeUrlPrefix(value) ?? value),
			artifact_prefix: safePrefixSchema.default("")
		});
		normalizeRuntimeUrlPrefix = (value) => {
			let url;
			try {
				url = new URL(value);
			} catch (cause) {
				void cause;
				return null;
			}
			if (!["http:", "https:"].includes(url.protocol) || url.username !== "" || url.password !== "" || urlDeclaresQueryOrFragment(url)) return null;
			if (!url.pathname.endsWith("/")) url.pathname += "/";
			return url.href;
		};
		runtimeLocationMappingSchema = z.discriminatedUnion("kind", [runtimeFileMappingSchema, runtimeUrlMappingSchema]);
		staticLayerSchema = z.strictObject({
			role: z.enum([
				"application",
				"cache",
				"assets"
			]).default("application"),
			analysis: evidenceSchema,
			runtime_mappings: z.array(runtimeLocationMappingSchema).overwrite(normalizeRuntimeMappings).default([])
		});
		validateReconciliationIdentities = (input, context) => {
			if (input.static_layers.filter(({ role }) => role === "application").length !== 1) context.addIssue({
				code: "custom",
				path: ["static_layers"],
				message: "Exactly one application static layer is required"
			});
			const staticIds = input.static_layers.map(({ analysis }) => analysis.evidence_id);
			if (new Set(staticIds).size !== staticIds.length) context.addIssue({
				code: "custom",
				path: ["static_layers"],
				message: "Static layer Evidence must be unique"
			});
			const runtimeIds = input.runtime_observations.map(({ evidence_id: id }) => id);
			if (new Set(runtimeIds).size !== runtimeIds.length) context.addIssue({
				code: "custom",
				path: ["runtime_observations"],
				message: "Runtime observation Evidence must be unique"
			});
		};
		runtimeReconciliationIdentitiesSchema = z.object({
			static_layers: z.array(z.object({
				role: z.enum([
					"application",
					"cache",
					"assets"
				]),
				analysis: z.object({ evidence_id: evidenceIdSchema$2 })
			})),
			runtime_observations: z.array(z.object({ evidence_id: evidenceIdSchema$2 }))
		}).superRefine(validateReconciliationIdentities);
		reconcileJavaScriptRuntimeInputSchema = z.strictObject({
			static_layers: z.array(staticLayerSchema).min(1),
			runtime_observations: z.array(evidenceSchema).min(1)
		}).superRefine(validateReconciliationIdentities);
		layerSummarySchema = z.strictObject({
			layer_id: prefixedDigestSchema("jrl"),
			role: z.enum([
				"application",
				"cache",
				"assets"
			]),
			evidence_id: evidenceIdSchema$2,
			graph_id: prefixedDigestSchema("jag"),
			root_artifact_sha256: digestSchema,
			input_path: z.string().min(1),
			format: z.enum(["asar", "directory"]),
			runtime_mappings: z.array(runtimeLocationMappingSchema)
		});
		captureSummarySchema = z.strictObject({
			evidence_id: evidenceIdSchema$2,
			capture_sha256: digestSchema,
			kind: z.enum([
				"browser",
				"electron",
				"v8-inspector",
				"electron-active"
			]),
			target_node_id: nodeIdSchema$1,
			target_key: nonEmptyTextSchema,
			target_location: z.string().min(1).or(javascriptRuntimeUnresolvedLocationSchema),
			frames: z.int().min(0),
			scripts: z.int().min(0),
			workers: z.int().min(0),
			scripts_complete_within_scope: z.boolean()
		});
		reconciliationReasonSchema = z.enum([
			"content-and-location-match",
			"unique-content-match",
			"unique-location-match",
			"ambiguous-static-candidates",
			"captured-content-disagrees-with-static-location",
			"no-static-content-match",
			"no-authorized-location-mapping",
			"runtime-location-unresolved",
			"runtime-frame-unattributed",
			"static-or-runtime-coverage-incomplete",
			"reconciliation-limit-reached"
		]);
		reconciliationItemShape = {
			reconciliation_id: prefixedDigestSchema("jrr_item"),
			entity_kind: z.enum([
				"target",
				"frame",
				"script",
				"worker"
			]),
			runtime_evidence_id: evidenceIdSchema$2,
			runtime_node_id: nodeIdSchema$1,
			basis: z.enum([
				"content-and-location",
				"content-sha256",
				"module-source-sha256",
				"artifact-path",
				"operator-file-mapping",
				"operator-url-mapping",
				"none"
			]),
			confidence: z.enum([
				"exact",
				"high",
				"medium",
				"low",
				"unknown"
			]),
			reason: reconciliationReasonSchema,
			candidate_static_count: z.int().min(0),
			candidate_static_nodes: z.array(z.strictObject({
				static_layer_id: prefixedDigestSchema("jrl"),
				static_node_id: nodeIdSchema$1
			}))
		};
		reconciliationItemSchema = z.union([z.strictObject({
			...reconciliationItemShape,
			static_layer_id: prefixedDigestSchema("jrl"),
			static_node_id: nodeIdSchema$1,
			status: z.literal("matched")
		}), z.strictObject({
			...reconciliationItemShape,
			static_layer_id: z.null(),
			static_node_id: z.null(),
			status: z.enum([
				"ambiguous",
				"unmatched",
				"unknown"
			])
		})]);
		staticLoadStateSchema = z.strictObject({
			static_layer_id: prefixedDigestSchema("jrl"),
			static_node_id: nodeIdSchema$1,
			kind: z.enum([
				"javascript-asset",
				"javascript-chunk",
				"javascript-module"
			]),
			status: z.enum([
				"loaded",
				"resident-in-loaded-asset",
				"not-observed-in-capture",
				"unknown"
			]),
			runtime_node_ids: z.array(nodeIdSchema$1),
			reason: z.enum([
				"runtime-script-correspondence",
				"containing-asset-was-loaded",
				"not-observed-in-bounded-capture",
				"layer-outside-runtime-scope",
				"static-or-runtime-coverage-incomplete",
				"ambiguous-runtime-candidate"
			])
		});
		javascriptRuntimeReconciliationResultSchema = z.strictObject({
			reconciliation_id: prefixedDigestSchema("jrr"),
			static_layers: z.array(layerSummarySchema).min(1),
			runtime_captures: z.array(captureSummarySchema).min(1),
			graph: javascriptApplicationGraphSchema,
			summary: z.strictObject({
				runtime_targets: z.int().min(0),
				runtime_frames: z.int().min(0),
				runtime_scripts: z.int().min(0),
				runtime_workers: z.int().min(0),
				matched: z.int().min(0),
				ambiguous: z.int().min(0),
				unmatched: z.int().min(0),
				unknown: z.int().min(0),
				static_loaded: z.int().min(0),
				static_resident: z.int().min(0),
				static_not_observed: z.int().min(0),
				static_unknown: z.int().min(0)
			}),
			reconciliations: z.array(reconciliationItemSchema),
			static_load_states: z.array(staticLoadStateSchema),
			source_map_authority: z.strictObject({
				used_for_primary_matching: z.literal(false),
				static_layer_count: z.int().min(0),
				runtime_script_declarations: z.int().min(0),
				limitation: nonEmptyTextSchema
			}),
			coverage: z.strictObject({
				/**
				* `unknown` when a static graph's coverage is unknown or unavailable;
				* `truncated` and `partial` are known gaps.
				*/
				status: z.enum([
					"complete-within-inputs",
					"partial",
					"truncated",
					"unknown"
				]),
				truncated: z.boolean(),
				omitted_runtime_entities: z.int().min(0),
				omitted_reconciliation_items: z.int().min(0),
				omitted_static_load_states: z.int().min(0),
				omitted_graph_items: z.int().min(0)
			}),
			evidence_links: z.array(evidenceIdSchema$2).min(2),
			limitations: z.array(nonEmptyTextSchema)
		});
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptExportShapeComparisonSchemas.js
function isJsonPointer(value) {
	if (value === "") return true;
	if (!value.startsWith("/")) return false;
	for (let index = 0; index < value.length; index += 1) {
		if (value[index] !== "~") continue;
		const escaped = value[index + 1];
		if (escaped !== "0" && escaped !== "1") return false;
		index += 1;
	}
	return true;
}
var evidenceIdSchema$1, graphIdSchema, nodeIdSchema, exportNameSchema, semanticPrimitiveSchema, jsonPointerSchema, validateJavaScriptExportShapeIdentities, evidenceIdentitySchema, javaScriptExportShapeIdentitiesSchema, compareJavaScriptExportShapesInputSchema, projectedReturnFieldShape, projectedReturnFieldSchema, projectedPropertyCoverageSchema, projectedReturnShapeSchema, projectedExportReturnShapesSchema, sourceOmissionCountSchema, exportCandidateSchema, selectorResultShape, selectorResultSchema, valueAvailabilitySchema, discriminantSchema, propertyPresenceSchema, javaScriptExportShapeComparisonChangeSchema, inventoryPropertyCoverageSchema, propertyInventorySchema, javaScriptExportShapeComparisonResultSchema;
function init_javascriptExportShapeComparisonSchemas() {
	return (init_javascriptExportShapeComparisonSchemas = __esmMin((() => {
		init_coverage();
		init_javascriptSourceCoordinates();
		init_evidence();
		init_digests();
		init_textSchemas();
		init_javascriptApplicationEvidenceSchemas();
		evidenceIdSchema$1 = prefixedDigestSchema("ev");
		graphIdSchema = prefixedDigestSchema("jag");
		nodeIdSchema = prefixedDigestSchema("jag_node");
		exportNameSchema = z.string();
		semanticPrimitiveSchema = z.union([
			z.string(),
			z.number().finite(),
			z.boolean(),
			z.null()
		]);
		jsonPointerSchema = z.string().refine(isJsonPointer, "Expected an RFC 6901 JSON Pointer");
		validateJavaScriptExportShapeIdentities = (input, context) => {
			if (input.left.evidence_id === input.right.evidence_id) context.addIssue({
				code: "custom",
				path: ["right"],
				message: "JavaScript export shape Evidence must be distinct"
			});
		};
		evidenceIdentitySchema = z.object({ evidence_id: evidenceIdSchema$1 });
		javaScriptExportShapeIdentitiesSchema = z.object({
			left: evidenceIdentitySchema,
			right: evidenceIdentitySchema
		}).superRefine(validateJavaScriptExportShapeIdentities);
		compareJavaScriptExportShapesInputSchema = z.strictObject({
			left: evidenceSchema,
			right: evidenceSchema,
			left_module_path: nonEmptyTextSchema,
			left_export_name: exportNameSchema,
			right_module_path: nonEmptyTextSchema,
			right_export_name: exportNameSchema
		}).superRefine(validateJavaScriptExportShapeIdentities);
		projectedReturnFieldShape = {
			path: jsonPointerSchema,
			presence: z.enum([
				"present",
				"absent",
				"unknown-coverage"
			])
		};
		projectedReturnFieldSchema = z.discriminatedUnion("state", [
			z.strictObject({
				...projectedReturnFieldShape,
				state: z.literal("literal"),
				value: semanticPrimitiveSchema,
				reason: z.null()
			}),
			z.strictObject({
				...projectedReturnFieldShape,
				state: z.literal("union"),
				value: z.array(semanticPrimitiveSchema).min(1),
				reason: z.null()
			}),
			z.strictObject({
				...projectedReturnFieldShape,
				state: z.literal("unknown"),
				value: z.null(),
				reason: nonEmptyTextSchema
			})
		]);
		projectedPropertyCoverageSchema = z.discriminatedUnion("status", [z.strictObject({
			path: jsonPointerSchema,
			status: z.literal("complete"),
			omitted: z.literal(0)
		}), z.strictObject({
			path: jsonPointerSchema,
			status: z.literal("partial"),
			omitted: z.union([z.int().positive(), z.null()])
		})]);
		projectedReturnShapeSchema = z.strictObject({
			source_range: javascriptSourceRangeSchema,
			value_status: z.enum([
				"literal",
				"union",
				"object",
				"array",
				"unknown",
				"ambiguous",
				"cycle"
			]),
			fields: z.array(projectedReturnFieldSchema),
			property_coverage: z.array(projectedPropertyCoverageSchema)
		}).superRefine((shape, context) => {
			const fieldPaths = shape.fields.map(({ path }) => path);
			if (new Set(fieldPaths).size !== fieldPaths.length) context.addIssue({
				code: "custom",
				path: ["fields"],
				message: "Projected return field paths must be unique"
			});
			const coveragePaths = shape.property_coverage.map(({ path }) => path);
			if (new Set(coveragePaths).size !== coveragePaths.length) context.addIssue({
				code: "custom",
				path: ["property_coverage"],
				message: "Projected property coverage paths must be unique"
			});
		});
		projectedExportReturnShapesSchema = z.strictObject({
			semantic_role: z.literal("export-return-shapes"),
			module_path: nonEmptyTextSchema,
			exported_name: exportNameSchema,
			callable_id: nonEmptyTextSchema,
			callable_kind: z.enum([
				"function",
				"class",
				"method"
			]),
			static_return_shapes: z.array(projectedReturnShapeSchema),
			return_shape_coverage: z.strictObject({
				status: z.enum([...knownCoverageStatusSchema.options, "truncated"]),
				retained_return_sites: z.int().min(0),
				omitted_return_sites: z.int().min(0).nullable(),
				omitted_fields: z.int().min(0),
				omitted_property_coverage: z.int().min(0),
				projection_complete: z.boolean()
			})
		}).superRefine((projection, context) => {
			if (projection.return_shape_coverage.retained_return_sites !== projection.static_return_shapes.length) context.addIssue({
				code: "custom",
				path: ["return_shape_coverage", "retained_return_sites"],
				message: "Retained return-site count must match projected shapes"
			});
		});
		sourceOmissionCountSchema = z.int().min(0).nullable().describe("Null (unknown) when the side's export selection recovered no return-shape projection; zero only when the projection omitted none.");
		exportCandidateSchema = z.strictObject({
			node_id: nodeIdSchema,
			module_path: nonEmptyTextSchema,
			export_name: exportNameSchema,
			matches_requested_module: z.boolean(),
			matches_requested_export: z.boolean()
		});
		selectorResultShape = {
			evidence_id: evidenceIdSchema$1,
			graph_id: graphIdSchema,
			requested_module_path: nonEmptyTextSchema,
			requested_export_name: exportNameSchema,
			candidates: z.array(exportCandidateSchema),
			omitted_candidates: z.int().min(0)
		};
		selectorResultSchema = z.union([
			z.strictObject({
				...selectorResultShape,
				status: z.literal("selected"),
				selected_node_id: nodeIdSchema
			}),
			z.strictObject({
				...selectorResultShape,
				status: z.enum(["missing", "ambiguous"]),
				selected_node_id: z.null()
			}),
			z.strictObject({
				...selectorResultShape,
				status: z.literal("unavailable"),
				selected_node_id: nodeIdSchema.nullable()
			})
		]);
		valueAvailabilitySchema = z.discriminatedUnion("availability", [
			z.strictObject({ availability: z.literal("absent") }),
			z.strictObject({
				availability: z.literal("literal"),
				value: semanticPrimitiveSchema
			}),
			z.strictObject({
				availability: z.literal("union"),
				values: z.array(semanticPrimitiveSchema).min(1)
			}),
			z.strictObject({
				availability: z.literal("unknown"),
				reason: nonEmptyTextSchema
			})
		]);
		discriminantSchema = z.strictObject({
			path: jsonPointerSchema,
			value: semanticPrimitiveSchema
		});
		propertyPresenceSchema = z.enum([
			"present",
			"absent",
			"unknown-coverage"
		]);
		javaScriptExportShapeComparisonChangeSchema = z.strictObject({
			change_id: prefixedDigestSchema("jesc_change"),
			status: z.enum([
				"added",
				"removed",
				"changed",
				"unknown"
			]),
			path: jsonPointerSchema,
			discriminant: discriminantSchema.nullable(),
			presence: z.strictObject({
				left: propertyPresenceSchema,
				right: propertyPresenceSchema
			}),
			left: valueAvailabilitySchema,
			right: valueAvailabilitySchema,
			left_source_range: javascriptSourceRangeSchema.nullable(),
			right_source_range: javascriptSourceRangeSchema.nullable(),
			evidence_links: z.array(evidenceIdSchema$1).length(2),
			limitations: z.array(nonEmptyTextSchema)
		});
		inventoryPropertyCoverageSchema = z.strictObject({
			path: jsonPointerSchema,
			status: knownCoverageStatusSchema
		});
		propertyInventorySchema = z.strictObject({
			side: z.enum(["left", "right"]),
			variant_index: z.int().nonnegative(),
			discriminant: discriminantSchema.nullable(),
			paired: z.boolean(),
			source_range: javascriptSourceRangeSchema,
			properties: z.array(jsonPointerSchema),
			property_coverage: z.array(inventoryPropertyCoverageSchema)
		});
		javaScriptExportShapeComparisonResultSchema = z.strictObject({
			comparison_id: prefixedDigestSchema("jesc"),
			left: selectorResultSchema,
			right: selectorResultSchema,
			property_inventories: z.array(propertyInventorySchema),
			summary: z.strictObject({
				added: z.int().min(0),
				removed: z.int().min(0),
				changed: z.int().min(0),
				unknown: z.int().min(0)
			}),
			changes: z.array(javaScriptExportShapeComparisonChangeSchema),
			coverage: z.strictObject({
				/**
				* `unknown` when either source graph's coverage is unknown or
				* unavailable; `truncated` and `partial` are known gaps.
				*/
				status: z.enum([
					"complete-within-inputs",
					"partial",
					"truncated",
					"unknown"
				]),
				left_graph_status: applicationCoverageStatusSchema,
				right_graph_status: applicationCoverageStatusSchema,
				paired_variants: z.int().min(0),
				unpaired_left_variants: z.int().min(0),
				unpaired_right_variants: z.int().min(0),
				omitted_left_variants: z.int().min(0),
				omitted_right_variants: z.int().min(0),
				left_source_omitted_variants: z.int().min(0).nullable(),
				right_source_omitted_variants: z.int().min(0).nullable(),
				left_omitted_fields: sourceOmissionCountSchema,
				right_omitted_fields: sourceOmissionCountSchema,
				left_omitted_property_coverage: sourceOmissionCountSchema,
				right_omitted_property_coverage: sourceOmissionCountSchema,
				omitted_candidates: z.int().min(0),
				omitted_changes: z.int().min(0)
			}),
			evidence_links: z.array(evidenceIdSchema$1).length(2),
			limitations: z.array(nonEmptyTextSchema)
		});
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticQuerySchemas.js
var semanticNodeIdSchema, literalValueSchema, literalSeedSchema, javaScriptSemanticQuerySeedSchema, javaScriptSemanticQueryInputSchema, javaScriptSemanticQueryResultSchema;
function init_javascriptSemanticQuerySchemas() {
	return (init_javascriptSemanticQuerySchemas = __esmMin((() => {
		init_coverage();
		init_javascriptSemanticGraphSchemas();
		init_digests();
		semanticNodeIdSchema = prefixedDigestSchema("jsrg_node");
		literalValueSchema = z.union([
			z.string(),
			z.number(),
			z.boolean(),
			z.null()
		]);
		literalSeedSchema = z.strictObject({
			kind: z.literal("literal"),
			value: literalValueSchema
		});
		javaScriptSemanticQuerySeedSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("semantic-node"),
				node_id: semanticNodeIdSchema
			}),
			z.strictObject({
				kind: z.literal("application-node"),
				node_id: prefixedDigestSchema("jag_node")
			}),
			literalSeedSchema,
			z.strictObject({
				kind: z.literal("function"),
				fingerprint_sha256: digestSchema
			}),
			z.strictObject({
				kind: z.literal("property"),
				name: z.string()
			}),
			z.strictObject({
				kind: z.literal("endpoint"),
				value: z.string()
			}),
			z.strictObject({
				kind: z.literal("event"),
				name: z.string()
			}),
			z.strictObject({
				kind: z.literal("boundary-field"),
				field: z.string().min(1)
			})
		]);
		javaScriptSemanticQueryInputSchema = z.strictObject({
			seed: javaScriptSemanticQuerySeedSchema,
			direction: z.enum([
				"backward-provenance",
				"forward-influence",
				"callers",
				"ownership"
			]),
			allowed_relations: z.array(z.enum(JAVASCRIPT_SEMANTIC_RELATIONS)).min(1).optional(),
			include_ambiguous_dynamic_edges: z.boolean().default(false),
			expected: z.strictObject({
				role: z.enum(["source", "sink"]),
				classes: z.array(z.enum(JAVASCRIPT_SEMANTIC_NODE_KINDS)).min(1)
			}).nullable().default(null)
		});
		javaScriptSemanticQueryResultSchema = z.strictObject({
			query_id: prefixedDigestSchema("jsrq"),
			source_graph_id: prefixedDigestSchema("jsrg"),
			seed: javaScriptSemanticQuerySeedSchema,
			direction: javaScriptSemanticQueryInputSchema.shape.direction,
			status: z.enum([
				"found",
				"no-match",
				"ambiguous",
				"partial",
				"unsupported"
			]),
			seed_node_ids: z.array(semanticNodeIdSchema),
			evidence_contexts: z.array(javaScriptSemanticEvidenceContextSchema),
			nodes: z.array(javaScriptSemanticNodeSchema),
			relations: z.array(javaScriptSemanticRelationSchema),
			unknowns: z.array(javaScriptSemanticUnknownSchema),
			expected_match_node_ids: z.array(semanticNodeIdSchema),
			summary: z.strictObject({
				total_seed_matches: z.int().min(0),
				traversed_nodes: z.int().min(0),
				traversed_relations: z.int().min(0),
				traversed_functions: z.int().min(0),
				traversed_modules: z.int().min(0),
				relevant_unknowns: z.int().min(0)
			}),
			coverage: z.strictObject({ status: z.enum([...knownCoverageStatusSchema.options, "unavailable"]) }),
			limitations: z.array(z.string().min(1))
		});
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticTraceSchemas.js
var evidenceIdSchema, traceJavaScriptSemanticsInputSchema, javaScriptSemanticTraceResultSchema;
function init_javascriptSemanticTraceSchemas() {
	return (init_javascriptSemanticTraceSchemas = __esmMin((() => {
		init_evidence();
		init_javascriptSemanticQuerySchemas();
		init_digests();
		evidenceIdSchema = prefixedDigestSchema("ev");
		traceJavaScriptSemanticsInputSchema = z.strictObject({
			application: evidenceSchema,
			query: javaScriptSemanticQueryInputSchema
		});
		javaScriptSemanticTraceResultSchema = javaScriptSemanticQueryResultSchema.extend({
			source_evidence_id: evidenceIdSchema,
			evidence_links: z.array(evidenceIdSchema).length(1)
		});
	})))();
}

//#endregion
//#region dist/contracts/javascript/applicationWorkflowInputContracts.js
var traceApplicationFeatureFacts, traceApplicationFeatureRequestSchema, traceApplicationFeatureToolRequestSchema, traceJavaScriptSemanticsRequestSchema, compareApplicationVersionsFacts, compareStaticObservedEndpointsFactsSchema, compareStaticObservedEndpointsRequestSchema, compareApplicationVersionsRequestSchema, referenceFile, sourceToBundleSelection, compareSourceToBundleRequestSchema, compareJavaScriptExportShapesFacts, compareJavaScriptExportShapesRequestSchema, reconcileJavaScriptRuntimeRequestSchema;
function init_applicationWorkflowInputContracts() {
	return (init_applicationWorkflowInputContracts = __esmMin((() => {
		init_localPath();
		init_sourceToBundleView();
		init_featureTraceView();
		init_browserObservation();
		init_endpointComparisonView();
		init_evidenceReference();
		init_javascriptExportShapeComparisonSchemas();
		init_javascriptFeatureTraceSchemas();
		init_javascriptSemanticTraceSchemas();
		init_sourceToBundleComparisonSchemas();
		init_javascriptRuntimeReconciliationSchemas();
		traceApplicationFeatureFacts = {
			native_observations: z.array(evidenceInputSchema).default([]),
			seed: traceApplicationFeatureInputSchema.shape.seed,
			semantic_page: traceApplicationFeatureInputSchema.shape.semantic_page,
			direction: traceApplicationFeatureInputSchema.shape.direction
		};
		traceApplicationFeatureRequestSchema = z.strictObject({
			...traceApplicationFeatureFacts,
			application: evidenceInputSchema
		});
		traceApplicationFeatureToolRequestSchema = traceApplicationFeatureRequestSchema.extend({ view: z.union([z.strictObject({ kind: z.literal("summary") }), featureTraceViewRequestSchema]).optional().describe("Omitted returns the complete trace. summary or a feature-trace page retains the complete trace in this session first; query it again with inspect_analysis_view and the returned parent_evidence_id.") });
		traceJavaScriptSemanticsRequestSchema = traceJavaScriptSemanticsInputSchema.extend({ application: evidenceInputSchema });
		compareApplicationVersionsFacts = {
			left_native_observations: z.array(evidenceInputSchema).default([]),
			right_native_observations: z.array(evidenceInputSchema).default([])
		};
		compareStaticObservedEndpointsFactsSchema = z.strictObject({
			application: evidenceInputSchema,
			capture: evidenceInputSchema,
			origin: recordedBrowserOriginSchema.optional().describe("Caller-declared canonical HTTP(S) origin for root-relative static targets; omit to keep their origin unknown. This never contacts the origin.")
		});
		compareStaticObservedEndpointsRequestSchema = compareStaticObservedEndpointsFactsSchema.extend({
			view: endpointComparisonViewRequestSchema.optional().describe("Return this selected page in the initial call, retaining the complete comparison. An explicit view takes precedence over detail."),
			detail: z.enum(["summary", "complete"]).default("summary").describe("Summary retains the complete comparison and returns counts and source coverage. Use inspect_analysis_view kind endpoint-comparison for selected rows; complete returns all facts inline.")
		});
		compareApplicationVersionsRequestSchema = z.strictObject({
			...compareApplicationVersionsFacts,
			left: evidenceInputSchema,
			right: evidenceInputSchema
		});
		referenceFile = z.strictObject({
			kind: z.literal("file"),
			path: absoluteLocalPathStringSchema
		});
		sourceToBundleSelection = { view: z.union([z.strictObject({ kind: z.literal("summary") }), sourceToBundleViewRequestSchema]).optional() };
		compareSourceToBundleRequestSchema = z.strictObject({
			reference: z.union([compareSourceToBundleInputSchema.shape.reference, referenceFile]),
			application: evidenceInputSchema,
			...sourceToBundleSelection
		});
		compareJavaScriptExportShapesFacts = {
			left_module_path: compareJavaScriptExportShapesInputSchema.shape.left_module_path,
			left_export_name: compareJavaScriptExportShapesInputSchema.shape.left_export_name,
			right_module_path: compareJavaScriptExportShapesInputSchema.shape.right_module_path,
			right_export_name: compareJavaScriptExportShapesInputSchema.shape.right_export_name
		};
		compareJavaScriptExportShapesRequestSchema = z.strictObject({
			...compareJavaScriptExportShapesFacts,
			left: evidenceInputSchema,
			right: evidenceInputSchema
		});
		reconcileJavaScriptRuntimeRequestSchema = z.strictObject({
			static_layers: z.array(reconcileJavaScriptRuntimeInputSchema.shape.static_layers.element.extend({ analysis: evidenceInputSchema })).min(1),
			runtime_observations: z.array(evidenceInputSchema).min(1)
		});
	})))();
}

//#endregion
//#region dist/contracts/javascript/javascriptRuntimeReconciliationExample.js
function browserCompleteness() {
	return {
		status: "complete_within_window",
		conditions: ["complete_within_window"],
		policy_filtered_sections: [],
		attach_limited_sections: [],
		truncated_sections: [],
		unavailable_sections: [],
		excluded: [],
		dropped_events: {
			scripts: 0,
			network_requests: 0,
			console_events: 0,
			websocket_connections: 0,
			websocket_frames: 0,
			webmcp_tools: 0,
			timeline_events: 0,
			total: 0
		}
	};
}
var applicationSha256, script, inputPath, scriptPath, completeCoverage, graphEvidence, asset, root, graph, evidenceContexts, semanticNode, semanticGraph, JAVASCRIPT_APPLICATION_EVIDENCE_EXAMPLE, runtimeEvidence, JAVASCRIPT_RUNTIME_RECONCILIATION_EXAMPLE;
function init_javascriptRuntimeReconciliationExample() {
	return (init_javascriptRuntimeReconciliationExample = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		init_javascriptApplicationGraph();
		init_webContentArtifact();
		init_javascriptSemanticGraph();
		init_javascriptSemanticGraphSchemas();
		applicationSha256 = "1".repeat(64);
		script = createWebTextArtifact("export const example = true;\n", "text/javascript");
		inputPath = "/Applications/Example.app/Contents/Resources/app";
		scriptPath = `${inputPath}/renderer.js`;
		completeCoverage = {
			status: "complete",
			truncated: false,
			omitted_count: 0,
			limits: []
		};
		graphEvidence = {
			authority: "artifact-bytes",
			state: "observed",
			confidence: "exact",
			artifact: {
				available: true,
				artifact_id: `art_${script.sha256}`,
				sha256: script.sha256
			},
			location: {
				available: true,
				value: {
					kind: "artifact-path",
					path: "renderer.js"
				}
			},
			extractor: {
				name: "rea-javascript-application",
				version: "1",
				operation: "inventory-relevant-file",
				executable_sha256: null
			},
			coverage: completeCoverage,
			limitations: [],
			evidence_ids: []
		};
		asset = createJavaScriptApplicationNode({
			kind: "javascript-asset",
			identity: {
				strategy: "content-digest",
				stability: "global-exact",
				sha256: script.sha256
			},
			observations: [{
				label: "renderer.js",
				properties: {
					path: "renderer.js",
					bytes: script.bytes
				},
				evidence: graphEvidence
			}]
		});
		root = createJavaScriptApplicationNode({
			kind: "artifact",
			identity: {
				strategy: "content-digest",
				stability: "global-exact",
				sha256: applicationSha256
			},
			observations: [{
				label: "artifact root",
				properties: { format: "directory" },
				evidence: {
					...graphEvidence,
					artifact: {
						available: true,
						artifact_id: `art_${applicationSha256}`,
						sha256: applicationSha256
					},
					location: {
						available: true,
						value: {
							kind: "artifact-path",
							path: "artifact-root"
						}
					},
					extractor: {
						...graphEvidence.extractor,
						operation: "inventory-root"
					}
				}
			}]
		});
		graph = createJavaScriptApplicationGraph({
			schema: "JavaScriptApplicationGraph",
			root_node_ids: [root.node_id],
			nodes: [asset, root],
			edges: [createJavaScriptApplicationEdge({
				source_node_id: root.node_id,
				target_node_id: asset.node_id,
				relation: "contains",
				properties: { path: "renderer.js" },
				evidence: graphEvidence
			})],
			coverage: completeCoverage,
			limitations: []
		});
		evidenceContexts = new JavaScriptSemanticEvidenceContextRegistry();
		semanticNode = createJavaScriptSemanticGraphNode({
			kind: "module",
			identity: {
				artifact_sha256: applicationSha256,
				module_path: "renderer.js",
				source_range: null,
				role_key: "example-module"
			},
			function_node_id: null,
			application_node_ids: [asset.node_id],
			label: "renderer.js",
			properties: {},
			evidence: graphEvidence
		}, evidenceContexts);
		semanticGraph = createJavaScriptSemanticGraph({
			schema: "JavaScriptSemanticRelationGraph",
			root_artifact_sha256: applicationSha256,
			application_graph_id: graph.graph_id,
			root_node_ids: [semanticNode.node_id],
			evidence_contexts: evidenceContexts.contexts,
			nodes: [semanticNode],
			relations: [],
			fingerprints: [],
			unknowns: [],
			coverage: {
				status: "unknown",
				truncated: false,
				omitted_nodes: 0,
				omitted_relations: 0,
				limits: [],
				families: JAVASCRIPT_SEMANTIC_RELATION_FAMILIES.map((family) => ({
					family,
					status: "unknown",
					retained_relations: 0,
					omitted_relations: 0,
					unknown_ids: []
				}))
			},
			limitations: ["Semantic relations are unavailable in this minimal example."]
		});
		JAVASCRIPT_APPLICATION_EVIDENCE_EXAMPLE = createEvidence({
			path: inputPath,
			sha256: applicationSha256,
			format: "directory"
		}, {
			id: "rea-javascript-application",
			name: "REA JavaScript application analyzer",
			version: "1"
		}, {
			predicateType: "rea.javascript-application-analysis",
			operation: "analyze_javascript_application",
			parameters: {},
			result: {
				input_path: inputPath,
				format: "directory",
				root_artifact_sha256: applicationSha256,
				inventory_manifest_id: `agm_${"2".repeat(64)}`,
				inventory_graph_sha256: "3".repeat(64),
				integrity_contradictions: [],
				graph,
				semantic_graph: semanticGraph,
				summary: {
					browser_windows: 0,
					explicit_web_preferences: 0,
					preload_entrypoints: 0,
					context_bridge_apis: 0,
					exposed_api_members: 0,
					ipc: {
						operations: 0,
						literal_channels: 0,
						dynamic_channel_operations: 0,
						renderer_transmissions: 0,
						renderer_listeners: 0,
						main_handlers: 0,
						paired_renderer_transmissions: 0,
						ambiguous_renderer_transmissions: 0,
						unpaired_literal_renderer_transmissions: 0
					},
					sender_validation_observations: 0,
					utility_processes: 0,
					resolved_utility_entrypoints: 0,
					native_addon_bindings: 0,
					resolved_native_addon_bindings: 0,
					protocol_registrations: 0
				},
				statistics: {
					relevant_files: 1,
					nested_asar_containers: 0,
					text_bytes_read: script.bytes,
					invalid_utf8_files: 0,
					parsed_javascript_files: 1,
					skipped_javascript_files: 0,
					visited_ast_nodes: 7,
					findings: 1,
					modules: 0,
					parse_failures: 0
				},
				limitations: []
			},
			confidence: "derived",
			authority: "shipped-artifact"
		});
		runtimeEvidence = createEvidence(unknownTarget("not-observed"), {
			id: "rea-cdp-electron",
			name: "REA Electron file-page CDP observation provider",
			version: "1"
		}, {
			predicateType: "rea.electron-page-inspection",
			operation: "inspect_electron_page",
			parameters: {
				cdp_endpoint: "http://127.0.0.1:9223",
				target_id: "example-target",
				include_script_sources: true
			},
			result: {
				browser: {
					product: "Electron/example",
					protocol_version: "1.3",
					revision: "example",
					user_agent: "Electron example",
					js_version: "1"
				},
				target: {
					target_id: "example-target",
					type: "page",
					title: "Example",
					file_path: `${inputPath}/index.html`,
					attached: false
				},
				capture_window: {
					started_at: "2026-07-15T00:00:00.000Z",
					ended_at: "2026-07-15T00:00:00.100Z",
					observation_ms: 100
				},
				completeness: browserCompleteness(),
				frames: [],
				dom: {
					total_nodes: 0,
					node_value_length_unit: "utf8-bytes",
					nodes: []
				},
				scripts: {
					total: 1,
					items: [{
						script_key: `electron_script_${"4".repeat(64)}`,
						frame_id: null,
						file_path: scriptPath,
						cdp_hash: "example",
						length: script.bytes,
						is_module: true,
						language: "JavaScript",
						source: {
							included: true,
							artifact: script
						}
					}]
				},
				resources: [],
				workers: [],
				limitations: ["Example passive capture."]
			},
			confidence: "observed",
			authority: "external-service"
		});
		JAVASCRIPT_RUNTIME_RECONCILIATION_EXAMPLE = {
			static_layers: [{ analysis: JAVASCRIPT_APPLICATION_EVIDENCE_EXAMPLE }],
			runtime_observations: [runtimeEvidence]
		};
	})))();
}

//#endregion
export { JAVASCRIPT_APPLICATION_EVIDENCE_EXAMPLE, JAVASCRIPT_RUNTIME_RECONCILIATION_EXAMPLE, compareApplicationVersionsRequestSchema, compareJavaScriptExportShapesRequestSchema, compareSourceToBundleRequestSchema, compareStaticObservedEndpointsRequestSchema, electronActiveObservationInputSchema, electronActiveObservationResultSchema, electronActiveProcessMetricSchema, electronActiveTimelineEventSchema, electronActiveWindowSchema, electronPageInspectionSchema, electronTargetListSchema, init_applicationWorkflowInputContracts, init_electronActiveObservation, init_electronObservation, init_javascriptExportShapeComparisonSchemas, init_javascriptRuntimeReconciliationExample, init_javascriptRuntimeReconciliationSchemas, init_javascriptSemanticQuerySchemas, init_javascriptSemanticTraceSchemas, inspectElectronPageInputSchema, javaScriptExportShapeComparisonResultSchema, javaScriptExportShapeIdentitiesSchema, javaScriptSemanticQueryResultSchema, javaScriptSemanticTraceResultSchema, javascriptRuntimeReconciliationResultSchema, listElectronTargetsInputSchema, projectedExportReturnShapesSchema, reconcileJavaScriptRuntimeInputSchema, reconcileJavaScriptRuntimeRequestSchema, runtimeReconciliationIdentitiesSchema, traceApplicationFeatureRequestSchema, traceApplicationFeatureToolRequestSchema, traceJavaScriptSemanticsRequestSchema };