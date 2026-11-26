import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_localPath, init_schemaAnnotations, presentRootDiscriminator } from "./jsonSerialization-DAF9DVXC.js";
import { API_CONTRACT_MAX_FILE_BYTES, apiContractDiagnosticSchema, apiContractOperationSchema, apiContractPathReferenceSchema, graphqlDefinitionSchema, graphqlDiagnosticSchema, graphqlFieldSchema, graphqlReferenceSchema, graphqlSpreadSchema, graphqlTypeSchema, init_apiContract, init_graphqlContract } from "./graphqlContract-CtyDSGFM.js";
import { z } from "zod";

//#region dist/domain/apiContract/graphqlContractQuery.js
var page$1, graphqlContractViewRequestSchema;
function init_graphqlContractQuery() {
	return (init_graphqlContractQuery = __esmMin((() => {
		init_graphqlContract();
		page$1 = {
			kind: z.literal("graphql-contract"),
			offset: z.int().nonnegative().default(0),
			limit: z.int().positive().default(64)
		};
		graphqlContractViewRequestSchema = z.discriminatedUnion("collection", [
			z.strictObject({
				...page$1,
				collection: z.literal("types"),
				type_ids: z.array(graphqlTypeSchema.shape.type_id).optional(),
				names: z.array(z.string()).optional(),
				fields: z.array(graphqlTypeSchema.keyof()).optional()
			}),
			z.strictObject({
				...page$1,
				collection: z.literal("fields"),
				field_ids: z.array(graphqlFieldSchema.shape.field_id).optional(),
				field_keys: z.array(z.string()).optional(),
				owner_type_names: z.array(z.string()).optional(),
				fields: z.array(graphqlFieldSchema.keyof()).optional()
			}),
			z.strictObject({
				...page$1,
				collection: z.literal("definitions"),
				definition_ids: z.array(graphqlDefinitionSchema.shape.definition_id).optional(),
				names: z.array(z.string()).optional(),
				kinds: z.array(graphqlDefinitionSchema.shape.kind).optional(),
				fields: z.array(graphqlDefinitionSchema.keyof()).optional()
			}),
			z.strictObject({
				...page$1,
				collection: z.literal("references"),
				reference_ids: z.array(graphqlReferenceSchema.shape.reference_id).optional(),
				definition_ids: z.array(graphqlDefinitionSchema.shape.definition_id).optional(),
				schema_field_ids: z.array(graphqlFieldSchema.shape.field_id).optional(),
				states: z.array(graphqlReferenceSchema.shape.state).optional(),
				fields: z.array(graphqlReferenceSchema.keyof()).optional()
			}),
			z.strictObject({
				...page$1,
				collection: z.literal("fragment-spreads"),
				definition_ids: z.array(graphqlDefinitionSchema.shape.definition_id).optional(),
				names: z.array(z.string()).optional(),
				states: z.array(graphqlSpreadSchema.shape.state).optional(),
				fields: z.array(graphqlSpreadSchema.keyof()).optional()
			}),
			z.strictObject({
				...page$1,
				collection: z.literal("diagnostics"),
				codes: z.array(z.string()).optional(),
				fields: z.array(graphqlDiagnosticSchema.keyof()).optional()
			})
		]);
	})))();
}

//#endregion
//#region dist/domain/apiContract/apiContractQuery.js
var page, apiContractViewRequestSchema, apiContractFileBytesSchema, commonInput, selectionDescription, inspectApiContractInputSchema;
function init_apiContractQuery() {
	return (init_apiContractQuery = __esmMin((() => {
		init_localPath();
		init_graphqlContractQuery();
		init_apiContract();
		init_schemaAnnotations();
		page = {
			kind: z.literal("api-contract"),
			offset: z.int().nonnegative().default(0),
			limit: z.int().positive().default(64)
		};
		apiContractViewRequestSchema = z.discriminatedUnion("collection", [
			z.strictObject({
				...page,
				collection: z.literal("operations"),
				operation_ids: z.array(apiContractOperationSchema.shape.operation_id).optional(),
				operation_keys: z.array(apiContractOperationSchema.shape.operation_key).optional(),
				methods: z.array(z.string()).optional(),
				paths: z.array(z.string()).optional(),
				declared_ids: z.array(z.string()).optional(),
				states: z.array(apiContractOperationSchema.shape.state).optional(),
				fields: z.array(apiContractOperationSchema.keyof()).optional()
			}),
			z.strictObject({
				...page,
				collection: z.literal("path-item-references"),
				reference_ids: z.array(apiContractPathReferenceSchema.shape.reference_id).optional(),
				fields: z.array(apiContractPathReferenceSchema.keyof()).optional()
			}),
			z.strictObject({
				...page,
				collection: z.literal("diagnostics"),
				codes: z.array(apiContractDiagnosticSchema.shape.code).optional(),
				fields: z.array(apiContractDiagnosticSchema.keyof()).optional()
			})
		]);
		apiContractFileBytesSchema = z.int().positive().max(API_CONTRACT_MAX_FILE_BYTES).default(API_CONTRACT_MAX_FILE_BYTES).describe("Maximum bytes per input document (up to 32 MiB); reply paging does not increase parser allowances");
		commonInput = {
			path: absoluteLocalPathStringSchema.describe("Absolute path to a local API contract document"),
			max_file_bytes: apiContractFileBytesSchema,
			detail: z.enum(["summary", "complete"]).default("summary")
		};
		selectionDescription = "Return this selected page immediately; complete Evidence is retained and view takes precedence over detail";
		inspectApiContractInputSchema = presentRootDiscriminator(z.union([z.strictObject({
			...commonInput,
			format: z.literal("openapi-json").default("openapi-json"),
			view: apiContractViewRequestSchema.optional().describe(selectionDescription)
		}), z.strictObject({
			...commonInput,
			format: z.literal("graphql-sdl"),
			operations_path: absoluteLocalPathStringSchema.optional().describe("Optional absolute path to one local GraphQL operation/fragment document; parsed without execution"),
			view: graphqlContractViewRequestSchema.optional().describe(selectionDescription)
		})]), "format");
	})))();
}

//#endregion
export { apiContractViewRequestSchema, graphqlContractViewRequestSchema, init_apiContractQuery, init_graphqlContractQuery, inspectApiContractInputSchema };