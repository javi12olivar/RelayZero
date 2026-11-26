import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_digests, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { browserEndpointSchema, init_browserObservation } from "./browserObservation-BVcDYwHI.js";
import { z } from "zod";

//#region dist/domain/javascript/javascriptRuntimeObservation.js
var observationTextSchema, runtimeEndpoint, listJavaScriptRuntimeTargetsInputSchema, javascriptRuntimeKindSchema, observedJavaScriptRuntimeKindSchema, observeJavaScriptRuntimeInputSchema, javascriptRuntimeVersionSchema, javascriptRuntimeLocationSchema, javascriptRuntimeUnresolvedLocationSchema, javascriptRuntimeTargetLocationSchema, javascriptRuntimeTargetSchema, javascriptRuntimeTargetListSchema, javascriptRuntimeScriptSchema, javascriptRuntimeContextSchema, javascriptRuntimeObservationSchema;
function init_javascriptRuntimeObservation() {
	return (init_javascriptRuntimeObservation = __esmMin((() => {
		init_browserObservation();
		init_digests();
		observationTextSchema = z.string().min(1);
		runtimeEndpoint = { inspector_endpoint: browserEndpointSchema };
		listJavaScriptRuntimeTargetsInputSchema = z.strictObject({ ...runtimeEndpoint });
		javascriptRuntimeKindSchema = z.enum([
			"node",
			"electron-main",
			"electron-preload",
			"electron-renderer"
		]);
		observedJavaScriptRuntimeKindSchema = javascriptRuntimeKindSchema.or(z.literal("unknown"));
		observeJavaScriptRuntimeInputSchema = z.strictObject({
			...runtimeEndpoint,
			target_id: z.string().min(1),
			runtime_kind: javascriptRuntimeKindSchema.optional(),
			observation_ms: z.int().min(0).default(100)
		});
		javascriptRuntimeVersionSchema = z.strictObject({
			product: z.string().min(1),
			protocol_version: z.string().min(1),
			v8_version: z.string().nullable()
		});
		javascriptRuntimeLocationSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("file"),
				file_path: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("url"),
				origin: z.string().min(1),
				sanitized_url: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("builtin"),
				specifier: z.string().min(1)
			})
		]);
		javascriptRuntimeUnresolvedLocationSchema = z.strictObject({
			kind: z.literal("unresolved"),
			reported_url: z.string().describe("Raw Inspector URL, which may be empty for anonymous or evaluated code."),
			reason: z.enum(["unverifiable-file-location", "location-authorization-not-attempted"])
		});
		javascriptRuntimeTargetLocationSchema = z.union([javascriptRuntimeLocationSchema, javascriptRuntimeUnresolvedLocationSchema]);
		javascriptRuntimeTargetSchema = z.strictObject({
			target_id: z.string().min(1),
			protocol_type: z.string().min(1),
			attached: z.boolean().nullable().describe("Discovery-reported debugger attachment state; null means unknown"),
			location: javascriptRuntimeTargetLocationSchema
		});
		javascriptRuntimeTargetListSchema = z.strictObject({
			runtime: javascriptRuntimeVersionSchema,
			targets: z.array(javascriptRuntimeTargetSchema),
			excluded: z.strictObject({
				unsupported_location: z.int().min(0),
				unconnectable: z.int().min(0)
			}),
			limitations: z.array(observationTextSchema)
		});
		javascriptRuntimeScriptSchema = z.strictObject({
			script_key: prefixedDigestSchema("v8_script"),
			location: javascriptRuntimeTargetLocationSchema,
			reported_url: z.string().optional().describe("Exact Inspector URL for an authorized file script, retained separately from its verified filesystem path."),
			execution_context_key: z.string().nullable().describe("Capture-local observed context lifetime associated with this script; null when no context creation was observed."),
			execution_context_id: z.int().nullable().describe("Numeric execution-context ID reported for the script, independent of whether its lifetime was observed."),
			cdp_hash: z.string().nullable(),
			length: z.int().min(0).nullable().describe("Producer-reported script length; null when unavailable."),
			is_module: z.boolean().nullable().describe("Producer-reported module classification; null when unavailable."),
			status: z.literal("observed-loaded")
		});
		javascriptRuntimeContextSchema = z.strictObject({
			context_key: z.string().min(1).describe("Capture-local context lifetime key used to associate scripts with this observed context."),
			execution_context_id: z.int().describe("Numeric execution-context ID reported by the protocol; IDs can be reused across lifetimes."),
			state: z.enum([
				"created",
				"destroyed",
				"cleared"
			]),
			name: z.string().nullable(),
			origin: z.string().nullable()
		});
		javascriptRuntimeObservationSchema = z.strictObject({
			runtime: javascriptRuntimeVersionSchema,
			target: javascriptRuntimeTargetSchema.extend({
				runtime_kind: observedJavaScriptRuntimeKindSchema,
				runtime_kind_authority: z.enum(["caller-declared-unverified", "not-declared"])
			}),
			capture: z.strictObject({
				observation_ms: z.int().min(0),
				events_observed: z.int().min(0),
				events_retained: z.int().min(0),
				events_dropped: z.int().min(0),
				metadata_bytes_retained: z.int().min(0),
				truncated: z.boolean(),
				truncation_reasons: z.array(observationTextSchema)
			}),
			scripts: z.strictObject({
				items: z.array(javascriptRuntimeScriptSchema),
				observed_total: z.int().min(0),
				parse_failed_total: z.int().min(0).describe("Valid scriptFailedToParse events observed."),
				excluded: z.strictObject({
					unsupported_location: z.int().min(0),
					invalid_protocol_value: z.int().min(0)
				})
			}),
			execution_contexts: z.array(javascriptRuntimeContextSchema),
			directly_observed: z.array(observationTextSchema),
			unavailable_without_instrumentation: z.array(observationTextSchema),
			unknowns: z.array(observationTextSchema),
			limitations: z.array(observationTextSchema)
		});
	})))();
}

//#endregion
export { init_javascriptRuntimeObservation, javascriptRuntimeKindSchema, javascriptRuntimeObservationSchema, javascriptRuntimeTargetListSchema, javascriptRuntimeUnresolvedLocationSchema, listJavaScriptRuntimeTargetsInputSchema, observeJavaScriptRuntimeInputSchema };