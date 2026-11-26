import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisResourceLimits, init_jsonValue, jsonObjectSchema, timerDurationMsSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_offsetDateTime, utcDateTimeSchema } from "./nativeValueFlow-13oOEkkJ.js";
import { browserVersionSchema, init_browserObservationSchemas } from "./browserObservationSchemas-D0tzRJhs.js";
import { browserEvidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { init_webRuntime, webRuntimeLocationSchema, webRuntimeScopeSchema, webRuntimeSourceSchema, webRuntimeTargetSchema } from "./webRuntime-Bw6nb4fS.js";
import { z } from "zod";

//#region dist/domain/webExecution.js
var observeWebExecutionInputSchema, rangeSchema, functionSchema, webExecutionObservationSchema, webExecutionSchema;
function init_webExecution() {
	return (init_webExecution = __esmMin((() => {
		init_analysisResourceLimits();
		init_offsetDateTime();
		init_jsonValue();
		init_webRuntime();
		init_browserObservationSchemas();
		observeWebExecutionInputSchema = webRuntimeScopeSchema.extend({ observation_ms: timerDurationMsSchema.default(1e4) });
		rangeSchema = z.object({
			start_offset: z.int().min(0),
			end_offset: z.int().min(0),
			count: z.int().min(0),
			source_bounds: z.enum(["verified", "unknown"])
		});
		functionSchema = z.object({
			name: z.string(),
			is_block_coverage: z.boolean(),
			ranges: z.array(rangeSchema)
		});
		webExecutionObservationSchema = z.object({
			browser: browserVersionSchema,
			target: webRuntimeTargetSchema,
			window: z.object({
				armed_at: utcDateTimeSchema,
				ended_at: utcDateTimeSchema,
				requested_ms: z.int().min(1),
				end_reason: z.enum([
					"window_elapsed",
					"document_changed",
					"target_terminated",
					"session_detached"
				]),
				producer_started_seconds: z.number().min(0),
				producer_sampled_seconds: z.number().min(0).nullable()
			}),
			coverage: z.object({
				state: z.enum(["captured", "unavailable"]),
				reason: z.string().nullable(),
				offset_units: z.literal("utf16-code-units"),
				end_offset: z.literal("exclusive"),
				scripts: z.array(z.object({
					script_id: z.string().min(1),
					reported_url: z.string(),
					functions: z.array(functionSchema)
				})),
				excluded_scripts: z.int().min(0)
			}),
			requests: z.array(z.object({
				request_id: z.string().min(1),
				url: z.string(),
				method: z.string(),
				timestamp_seconds: z.number().min(0),
				initiator_type: z.string(),
				reported_initiator: jsonObjectSchema,
				callsites: z.array(webRuntimeLocationSchema),
				async_parent_ids: z.array(z.object({
					id: z.string(),
					debugger_id: z.string().nullable()
				})),
				causal_attribution: z.literal("unknown")
			})),
			excluded_requests: z.int().min(0),
			script_inventory: z.object({
				main_document_scripts: z.int().min(0),
				not_reported_script_ids: z.array(z.string().min(1)),
				coverage_absence: z.literal("unknown")
			}),
			sources: z.array(webRuntimeSourceSchema),
			instrumentation: z.object({
				resets_execution_counters: z.literal(true),
				disables_optimized_execution: z.literal(true),
				takes_one_resetting_sample: z.boolean(),
				executes_selected_code: z.literal(false),
				cleanup: z.enum(["confirmed", "unconfirmed"]),
				page_ownership: z.literal("external")
			}),
			limitations: z.array(z.string())
		});
		webExecutionSchema = webExecutionObservationSchema.extend({ instrumentation: webExecutionObservationSchema.shape.instrumentation.extend({ cleanup: z.literal("confirmed") }) });
	})))();
}

//#endregion
//#region dist/domain/webEventListeners.js
var inspectWebEventListenersInputSchema, webEventListenersObservationSchema, webEventListenersSchema;
function init_webEventListeners() {
	return (init_webEventListeners = __esmMin((() => {
		init_offsetDateTime();
		init_webRuntime();
		init_browserObservationSchemas();
		inspectWebEventListenersInputSchema = webRuntimeScopeSchema.extend({ selector: z.string().min(1) });
		webEventListenersObservationSchema = z.object({
			browser: browserVersionSchema,
			target: webRuntimeTargetSchema,
			inspected_at: utcDateTimeSchema,
			selected_node: z.object({
				selector: z.string(),
				match: z.enum(["found", "not_found"]),
				backend_node_id: z.int().min(1).nullable()
			}),
			listeners: z.array(z.object({
				type: z.string(),
				use_capture: z.boolean(),
				passive: z.boolean(),
				once: z.boolean(),
				location: webRuntimeLocationSchema,
				execution: z.literal("unknown")
			})),
			sources: z.array(webRuntimeSourceSchema),
			cleanup: z.enum(["confirmed", "unconfirmed"]),
			limitations: z.array(z.string())
		});
		webEventListenersSchema = webEventListenersObservationSchema.extend({ cleanup: z.literal("confirmed") });
	})))();
}

//#endregion
//#region dist/contracts/webRuntimeToolContracts.js
var WEB_RUNTIME_TOOL_CONTRACTS;
function init_webRuntimeToolContracts() {
	return (init_webRuntimeToolContracts = __esmMin((() => {
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		init_webExecution();
		init_webEventListeners();
		WEB_RUNTIME_TOOL_CONTRACTS = [{
			name: "observe_web_execution",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("observe_web_execution", toolEffects({
				mutatesTarget: true,
				mutatesSession: true,
				accessesNetwork: true,
				mayDiscardData: true,
				idempotent: false
			})),
			description: "Instrument one selected CDP page for a finite, externally driven precise coverage window. Resets execution counters and prevents optimized execution until stopped. Returns complete nested UTF-16 ranges/counts, independently hashed script text and request initiator associations by session script ID. Does not navigate, click, evaluate selected code or close the externally owned page. Navigation ends document-scoped collection; workers and UI causality remain outside this claim. Emits an actual armed progress notification before external actions.",
			kind: "browser-provider",
			inputSchema: observeWebExecutionInputSchema,
			outputSchema: evidenceResultOf(webExecutionSchema),
			examples: [{
				title: "Attribute externally triggered page execution",
				input: {
					cdp_endpoint: "http://127.0.0.1:9222",
					target_id: "TARGET_ID_FROM_LIST_BROWSER_TARGETS",
					observation_ms: 1e4
				}
			}]
		}, {
			name: "inspect_web_event_listeners",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_web_event_listeners", browserEvidenceEffects),
			description: "Inspect listeners registered directly on the first main-document CSS match in one selected CDP page. Returns event flags, native callback locations, source ownership and exact script text/digests inline. Does not dispatch events, evaluate JavaScript or invoke handlers. Delegated ancestor/framework listeners and execution history remain unknown. Releases REA's object group and transport, preserving the external page.",
			kind: "browser-provider",
			inputSchema: inspectWebEventListenersInputSchema,
			outputSchema: evidenceResultOf(webEventListenersSchema),
			examples: [{
				title: "Find a selected button's callback source",
				input: {
					cdp_endpoint: "http://127.0.0.1:9222",
					target_id: "TARGET_ID_FROM_LIST_BROWSER_TARGETS",
					selector: "#submit"
				}
			}]
		}];
	})))();
}

//#endregion
export { WEB_RUNTIME_TOOL_CONTRACTS, init_webEventListeners, init_webExecution, init_webRuntimeToolContracts, inspectWebEventListenersInputSchema, observeWebExecutionInputSchema, webEventListenersObservationSchema, webEventListenersSchema, webExecutionObservationSchema, webExecutionSchema };