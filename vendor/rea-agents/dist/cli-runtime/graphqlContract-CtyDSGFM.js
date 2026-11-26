import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_coverage, init_localPath, knownCoverageStatusSchema, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { z } from "zod";

//#region dist/domain/apiContract/apiContract.js
var API_CONTRACT_MAX_FILE_BYTES, API_CONTRACT_FACT_BYTES, API_CONTRACT_OPERATION, API_CONTRACT_PROVIDER, apiContractArtifactSchema, apiContractOperationSchema, apiContractPathReferenceSchema, apiContractDiagnosticSchema, apiContractSchema;
function init_apiContract() {
	return (init_apiContract = __esmMin((() => {
		init_digests();
		init_localPath();
		API_CONTRACT_MAX_FILE_BYTES = 32 * 1024 * 1024;
		API_CONTRACT_FACT_BYTES = 32 * 1024 * 1024;
		API_CONTRACT_OPERATION = "inspect_api_contract";
		API_CONTRACT_PROVIDER = {
			id: "rea-api-contract",
			name: "REA offline API contract inventory",
			version: "1"
		};
		apiContractArtifactSchema = z.strictObject({
			path: localPathStringSchema,
			sha256: digestSchema,
			bytes: z.int().nonnegative()
		});
		apiContractOperationSchema = z.strictObject({
			operation_id: prefixedDigestSchema("api_operation"),
			operation_key: prefixedDigestSchema("api_operation_key"),
			method: z.string(),
			path: z.string(),
			declared_id: z.string().nullable(),
			source_pointer: z.string(),
			state: z.enum(["declared", "unknown"]),
			reason: z.enum(["unresolved-path-item-reference", "malformed-operation"]).nullable()
		});
		apiContractPathReferenceSchema = z.strictObject({
			reference_id: prefixedDigestSchema("api_path_reference"),
			path: z.string(),
			source_pointer: z.string(),
			reference: z.string().nullable(),
			credential_redacted: z.boolean(),
			state: z.enum(["unresolved", "malformed"])
		});
		apiContractDiagnosticSchema = z.strictObject({
			diagnostic_id: prefixedDigestSchema("api_contract_diagnostic"),
			source_pointer: z.string(),
			code: z.enum([
				"invalid-info",
				"invalid-paths",
				"invalid-path-key",
				"invalid-path-item",
				"invalid-path-reference",
				"invalid-operation",
				"invalid-operation-id",
				"unknown-path-item-field",
				"invalid-additional-operations",
				"invalid-additional-method"
			]),
			message: z.string()
		});
		apiContractSchema = z.strictObject({
			contract_id: prefixedDigestSchema("api_contract"),
			format: z.literal("openapi-json"),
			openapi: z.string(),
			artifact: apiContractArtifactSchema,
			info: z.strictObject({
				title: z.string().nullable(),
				version: z.string().nullable()
			}),
			operations: z.array(apiContractOperationSchema),
			path_item_references: z.array(apiContractPathReferenceSchema),
			diagnostics: z.array(apiContractDiagnosticSchema),
			summary: z.strictObject({
				operation_slots: z.int().nonnegative(),
				declared: z.int().nonnegative(),
				unknown: z.int().nonnegative(),
				unresolved_path_items: z.int().nonnegative(),
				diagnostics: z.int().nonnegative()
			}),
			source_coverage: z.strictObject({
				scope: z.literal("inline-path-operations"),
				status: z.enum(["complete-within-scope", "partial"]),
				paths_state: z.enum([
					"object",
					"absent",
					"malformed"
				]),
				path_entries_examined: z.int().nonnegative(),
				reference_resolution: z.literal("not-attempted"),
				schema_validation: z.literal("not-performed"),
				duplicate_json_members: z.literal("last-value-wins")
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/apiContract/graphqlContract.js
var GRAPHQL_CONTRACT_LIMITS, GRAPHQL_CONTRACT_PROFILE, graphqlSourceSchema, graphqlTypeSchema, graphqlFieldSchema, graphqlDefinitionSchema, graphqlReferenceSchema, graphqlSpreadSchema, graphqlDiagnosticSchema, graphqlContractSchema;
function init_graphqlContract() {
	return (init_graphqlContract = __esmMin((() => {
		init_coverage();
		init_digests();
		init_apiContract();
		GRAPHQL_CONTRACT_LIMITS = {
			lexicalTokens: 262144,
			comments: 65536,
			astDepth: 128
		};
		GRAPHQL_CONTRACT_PROFILE = "graphql-sdl-field-bindings-v1";
		graphqlSourceSchema = z.strictObject({
			role: z.enum(["schema", "operations"]),
			sha256: digestSchema,
			start_utf16: z.int().nonnegative(),
			end_utf16: z.int().nonnegative(),
			line: z.int().positive(),
			column: z.int().positive()
		});
		graphqlTypeSchema = z.strictObject({
			type_id: prefixedDigestSchema("graphql_type"),
			name: z.string(),
			kind: z.enum([
				"object",
				"interface",
				"input-object",
				"scalar",
				"enum",
				"union"
			]),
			extension: z.boolean(),
			interfaces: z.array(z.string()),
			members: z.array(z.string()),
			source: graphqlSourceSchema
		});
		graphqlFieldSchema = z.strictObject({
			field_id: prefixedDigestSchema("graphql_field"),
			field_key: z.string(),
			owner_type_id: graphqlTypeSchema.shape.type_id,
			owner_type_name: z.string(),
			kind: z.enum(["output", "input"]),
			name: z.string(),
			type_ref: z.string(),
			named_type: z.string(),
			source: graphqlSourceSchema
		});
		graphqlDefinitionSchema = z.strictObject({
			definition_id: prefixedDigestSchema("graphql_definition"),
			kind: z.enum([
				"query",
				"mutation",
				"subscription",
				"fragment"
			]),
			name: z.string().nullable(),
			type_condition: z.string().nullable(),
			source: graphqlSourceSchema
		});
		graphqlReferenceSchema = z.strictObject({
			reference_id: prefixedDigestSchema("graphql_reference"),
			definition_id: graphqlDefinitionSchema.shape.definition_id,
			parent_reference_id: prefixedDigestSchema("graphql_reference").nullable(),
			field_name: z.string(),
			response_key: z.string(),
			parent_type_name: z.string().nullable(),
			schema_field_id: graphqlFieldSchema.shape.field_id.nullable(),
			result_type: z.string().nullable(),
			state: z.enum([
				"resolved",
				"model-only",
				"unknown"
			]),
			reason: z.enum([
				"schema-model-unavailable",
				"parent-type-unavailable",
				"unknown-field",
				"no-sdl-source"
			]).nullable(),
			source: graphqlSourceSchema
		});
		graphqlSpreadSchema = z.strictObject({
			spread_id: prefixedDigestSchema("graphql_spread"),
			definition_id: graphqlDefinitionSchema.shape.definition_id,
			parent_reference_id: graphqlReferenceSchema.shape.reference_id.nullable(),
			name: z.string(),
			target_definition_id: graphqlDefinitionSchema.shape.definition_id.nullable(),
			matching_definitions: z.int().nonnegative(),
			state: z.enum([
				"resolved",
				"missing",
				"ambiguous"
			]),
			source: graphqlSourceSchema
		});
		graphqlDiagnosticSchema = z.strictObject({
			diagnostic_id: prefixedDigestSchema("graphql_diagnostic"),
			code: z.string(),
			message: z.string(),
			source_role: graphqlSourceSchema.shape.role,
			source: graphqlSourceSchema.nullable()
		});
		graphqlContractSchema = z.strictObject({
			kind: z.literal("graphql-contract"),
			format: z.literal("graphql-sdl"),
			contract_id: prefixedDigestSchema("graphql_contract"),
			decoder_profile: z.literal(GRAPHQL_CONTRACT_PROFILE),
			interpreter: z.strictObject({
				id: z.literal("graphql-js"),
				version: z.string()
			}),
			artifact: apiContractArtifactSchema,
			operations_artifact: apiContractArtifactSchema.nullable(),
			offset_units: z.literal("utf16-code-units"),
			model_roots: z.strictObject({
				query: z.string().nullable(),
				mutation: z.string().nullable(),
				subscription: z.string().nullable()
			}),
			types: z.array(graphqlTypeSchema),
			fields: z.array(graphqlFieldSchema),
			definitions: z.array(graphqlDefinitionSchema),
			references: z.array(graphqlReferenceSchema),
			fragment_spreads: z.array(graphqlSpreadSchema),
			diagnostics: z.array(graphqlDiagnosticSchema),
			summary: z.strictObject({
				types: z.int().nonnegative(),
				fields: z.int().nonnegative(),
				definitions: z.int().nonnegative(),
				references: z.int().nonnegative(),
				unknown_references: z.int().nonnegative(),
				model_only_references: z.int().nonnegative(),
				fragment_spreads: z.int().nonnegative(),
				unresolved_spreads: z.int().nonnegative(),
				diagnostics: z.int().nonnegative()
			}),
			source_coverage: z.strictObject({
				status: z.enum(["complete-within-scope", "partial"]),
				schema_declarations: z.enum([...knownCoverageStatusSchema.options, "unavailable"]),
				schema_model: z.enum(["constructed", "unavailable"]),
				operations: z.enum([
					...knownCoverageStatusSchema.options,
					"unavailable",
					"not-supplied"
				]),
				operation_validation: z.literal("field-resolution-only"),
				endpoint_behavior: z.literal("unknown")
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
export { API_CONTRACT_FACT_BYTES, API_CONTRACT_MAX_FILE_BYTES, API_CONTRACT_OPERATION, API_CONTRACT_PROVIDER, GRAPHQL_CONTRACT_LIMITS, GRAPHQL_CONTRACT_PROFILE, apiContractArtifactSchema, apiContractDiagnosticSchema, apiContractOperationSchema, apiContractPathReferenceSchema, apiContractSchema, graphqlContractSchema, graphqlDefinitionSchema, graphqlDiagnosticSchema, graphqlFieldSchema, graphqlReferenceSchema, graphqlSpreadSchema, graphqlTypeSchema, init_apiContract, init_graphqlContract };