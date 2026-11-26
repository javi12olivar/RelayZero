import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisInputError, AnalysisResourceConstraintError, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_fixedAllowanceRemediation, init_parseFailure, isHostLimitFailure, primaryAnalysisError } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_strictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { fileSnapshotPartialObservationSchema, init_fileSnapshotObservation } from "./resources-B3P64jvH.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_JsonInputFile, nativeJsonParseRequiredBytes } from "./JsonInputFile-DOw6KI2x.js";
import { API_CONTRACT_FACT_BYTES, API_CONTRACT_MAX_FILE_BYTES, API_CONTRACT_OPERATION, API_CONTRACT_PROVIDER, GRAPHQL_CONTRACT_LIMITS, GRAPHQL_CONTRACT_PROFILE, graphqlContractSchema, init_apiContract, init_graphqlContract } from "./graphqlContract-CtyDSGFM.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { completeApiContractSteps, init_ApiContractRead, init_ApiContractTraversal, readApiContract } from "./ApiContractService-DHBvW_oi.js";
import { getHeapStatistics } from "node:v8";
import { GraphQLError, Kind, Source, TypeInfo, buildASTSchema, isExecutableDefinitionNode, isTypeDefinitionNode, isTypeExtensionNode, parse, print, version, visit } from "graphql";

//#region dist/domain/apiContract/GraphqlInventory.js
var graphqlIdentity, graphqlSource, GraphqlInventory;
function init_GraphqlInventory() {
	return (init_GraphqlInventory = __esmMin((() => {
		init_canonicalDigest();
		init_analysisErrorCore();
		init_apiContract();
		init_graphqlContract();
		graphqlIdentity = (prefix, value) => prefix + "_" + digestCanonicalValue(value);
		graphqlSource = (artifact, role, node) => {
			const location = node.loc;
			if (location === undefined) throw new Error("The GraphQL parser omitted a required source location.");
			return {
				role,
				sha256: artifact.sha256,
				start_utf16: location.start,
				end_utf16: location.end,
				line: location.startToken.line,
				column: location.startToken.column
			};
		};
		GraphqlInventory = class {
			artifact;
			operationArtifact;
			interpreterVersion;
			types = [];
			fields = [];
			definitions = [];
			references = [];
			spreads = [];
			diagnostics = [];
			fieldIdsByStart = new Map();
			schemaDeclarations = "unavailable";
			schemaModel = "unavailable";
			operations;
			roots = {
				query: null,
				mutation: null,
				subscription: null
			};
			#bytes = 0;
			constructor(artifact, operationArtifact, interpreterVersion, requestedOperations = operationArtifact !== null) {
				this.artifact = artifact;
				this.operationArtifact = operationArtifact;
				this.interpreterVersion = interpreterVersion;
				this.operations = requestedOperations ? "unavailable" : "not-supplied";
			}
			retain(value) {
				this.#bytes += 512 + Buffer.byteLength(JSON.stringify(value)) * 4;
				if (this.#bytes > 33554432) throw new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "GraphQL facts exceed the 32 MiB retained representation allowance.", { retained_fact_allowance: API_CONTRACT_FACT_BYTES }, { remediationAction: "Select smaller complete schema/operation documents; reply paging does not raise parser allowances." });
			}
			diagnostic(code, message, role, source = null) {
				const row = {
					diagnostic_id: graphqlIdentity("graphql_diagnostic", [
						this.artifact.sha256,
						this.operationArtifact?.sha256 ?? null,
						source,
						role,
						code,
						this.diagnostics.length
					]),
					code,
					message,
					source_role: role,
					source
				};
				this.retain(row);
				this.diagnostics.push(row);
			}
			finish(incomplete = false) {
				let unknownReferences = 0, modelOnly = 0, unresolvedSpreads = 0;
				for (const row of this.references) {
					if (row.state === "unknown") unknownReferences++;
					if (row.state === "model-only") modelOnly++;
				}
				for (const row of this.spreads) if (row.state !== "resolved") unresolvedSpreads++;
				const partial = incomplete || this.schemaDeclarations !== "complete" || this.schemaModel !== "constructed" || this.operations !== "complete" && this.operations !== "not-supplied" || unknownReferences > 0 || unresolvedSpreads > 0 || this.diagnostics.length > 0;
				return {
					kind: "graphql-contract",
					format: "graphql-sdl",
					contract_id: graphqlIdentity("graphql_contract", [
						this.artifact.sha256,
						this.operationArtifact?.sha256 ?? null,
						GRAPHQL_CONTRACT_PROFILE
					]),
					decoder_profile: GRAPHQL_CONTRACT_PROFILE,
					interpreter: {
						id: "graphql-js",
						version: this.interpreterVersion
					},
					artifact: this.artifact,
					operations_artifact: this.operationArtifact,
					offset_units: "utf16-code-units",
					model_roots: this.roots,
					types: this.types,
					fields: this.fields,
					definitions: this.definitions,
					references: this.references,
					fragment_spreads: this.spreads,
					diagnostics: this.diagnostics,
					summary: {
						types: this.types.length,
						fields: this.fields.length,
						definitions: this.definitions.length,
						references: this.references.length,
						unknown_references: unknownReferences,
						model_only_references: modelOnly,
						fragment_spreads: this.spreads.length,
						unresolved_spreads: unresolvedSpreads,
						diagnostics: this.diagnostics.length
					},
					source_coverage: {
						status: partial ? "partial" : "complete-within-scope",
						schema_declarations: this.schemaDeclarations,
						schema_model: this.schemaModel,
						operations: incomplete && this.operations === "complete" ? "partial" : this.operations,
						operation_validation: "field-resolution-only",
						endpoint_behavior: "unknown"
					},
					limitations: [
						...incomplete ? ["Import stopped before the requested interpretation completed; retained rows are partial observations."] : [],
						"Facts describe supplied SDL and operation text. Schema field bindings are derivations from that SDL and the identified GraphQL library model; reachability, execution and authorization remain unknown.",
						"Only type/field declarations, operation/fragment owners, field bindings and explicit fragment-spread edges are interpreted. Arguments, defaults, descriptions, directive behavior, enum values, full operation validation, introspection JSON and version comparison are outside this profile.",
						"Fragment definitions are visited once in their declared type scope; spreads are retained as edges without expansion. Resolved field bindings do not establish that a whole operation is valid or that a fragment can execute in every spread context.",
						"Model-only bindings have no matching declaration in the supplied SDL. Missing or ambiguous declarations and unavailable models remain explicit.",
						"Each supplied file is an independently verified byte snapshot; the pair is not an atomic filesystem observation. UTF-16 offsets and parser token line/column values address decoded UTF-8 text, including an optional BOM.",
						"Original document bytes are identified by SHA-256 rather than embedded. Complete interpreted Evidence remains available separately from selected replies."
					]
				};
			}
		};
	})))();
}

//#endregion
//#region dist/domain/apiContract/GraphqlDocuments.js
var GraphqlDocumentRefusal, parseGraphqlDocument;
function init_GraphqlDocuments() {
	return (init_GraphqlDocuments = __esmMin((() => {
		init_analysisErrorCore();
		init_fixedAllowanceRemediation();
		init_parseFailure();
		init_apiContract();
		init_graphqlContract();
		GraphqlDocumentRefusal = class extends Error {
			source;
			constructor(cause, document, role) {
				super("The GraphQL parser refused this document.", { cause });
				const offset = cause.positions?.[0], location = cause.locations?.[0];
				this.source = offset === undefined || location === undefined ? null : {
					role,
					sha256: document.artifact.sha256,
					start_utf16: offset,
					end_utf16: offset,
					line: location.line,
					column: location.column
				};
			}
		};
		parseGraphqlDocument = (document, role) => {
			try {
				const parsed = parse(new Source(document.text, document.artifact.path), {
					maxLexicalTokens: GRAPHQL_CONTRACT_LIMITS.lexicalTokens,
					maxComments: GRAPHQL_CONTRACT_LIMITS.comments,
					maxSourceLength: API_CONTRACT_MAX_FILE_BYTES
				});
				let depth = 0;
				visit(parsed, {
					enter() {
						depth++;
						if (depth > GRAPHQL_CONTRACT_LIMITS.astDepth) throw new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "GraphQL AST nesting exceeds the 128-level traversal allowance.", { max_ast_depth: GRAPHQL_CONTRACT_LIMITS.astDepth }, fixedAllowanceOptions(`The GraphQL AST nesting allowance of ${String(GRAPHQL_CONTRACT_LIMITS.astDepth)} levels`, "parser", {
							limit: GRAPHQL_CONTRACT_LIMITS.astDepth,
							unit: "levels"
						}));
					},
					leave() {
						depth--;
					}
				});
				return parsed;
			} catch (cause) {
				if (cause instanceof GraphQLError) throw new GraphqlDocumentRefusal(cause, document, role);
				if (isHostLimitFailure(cause)) throw new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "GraphQL parsing exceeded a runtime representation allowance.", { parser: "graphql-js" }, {
					cause,
					remediationAction: "Use a smaller, less deeply nested complete document."
				});
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/apiContract/GraphqlSchemaFacts.js
/** Declaration occurrences remain separate even if SDL model construction rejects duplicates. */
function* collectGraphqlSchemaFacts(document, input, inventory) {
	inventory.schemaDeclarations = "partial";
	let examined = 0;
	for (const definition of document.definitions) {
		if (!isTypeDefinitionNode(definition) && !isTypeExtensionNode(definition)) {
			if (!nonTypeSDL.has(definition.kind)) inventory.diagnostic("non-schema-definition", "This schema input contains a definition outside SDL type/field interpretation.", "schema", graphqlSource(input.artifact, "schema", definition));
			continue;
		}
		const kind = typeKinds[definition.kind];
		if (kind === undefined) throw new Error("Missing GraphQL declaration kind.");
		const source = graphqlSource(input.artifact, "schema", definition);
		const row = {
			type_id: graphqlIdentity("graphql_type", source),
			name: definition.name.value,
			kind,
			extension: isTypeExtensionNode(definition),
			interfaces: "interfaces" in definition ? (definition.interfaces ?? []).map((node) => node.name.value) : [],
			members: "types" in definition ? (definition.types ?? []).map((node) => node.name.value) : [],
			source
		};
		inventory.retain(row);
		inventory.types.push(row);
		if ("fields" in definition) {
			for (const field of definition.fields ?? []) {
				const location = graphqlSource(input.artifact, "schema", field);
				const fact = {
					field_id: graphqlIdentity("graphql_field", location),
					field_key: row.name + "." + field.name.value,
					owner_type_id: row.type_id,
					owner_type_name: row.name,
					kind: kind === "input-object" ? "input" : "output",
					name: field.name.value,
					type_ref: print(field.type),
					named_type: namedType(field.type),
					source: location
				};
				inventory.retain(fact);
				inventory.fields.push(fact);
				inventory.fieldIdsByStart.set(location.start_utf16, fact.field_id);
				if (++examined % 128 === 0) yield;
			}
		}
		if (++examined % 128 === 0) yield;
	}
	inventory.schemaDeclarations = "complete";
}
var typeKinds, nonTypeSDL, namedType;
function init_GraphqlSchemaFacts() {
	return (init_GraphqlSchemaFacts = __esmMin((() => {
		init_GraphqlInventory();
		typeKinds = {
			[Kind.OBJECT_TYPE_DEFINITION]: "object",
			[Kind.OBJECT_TYPE_EXTENSION]: "object",
			[Kind.INTERFACE_TYPE_DEFINITION]: "interface",
			[Kind.INTERFACE_TYPE_EXTENSION]: "interface",
			[Kind.INPUT_OBJECT_TYPE_DEFINITION]: "input-object",
			[Kind.INPUT_OBJECT_TYPE_EXTENSION]: "input-object",
			[Kind.SCALAR_TYPE_DEFINITION]: "scalar",
			[Kind.SCALAR_TYPE_EXTENSION]: "scalar",
			[Kind.ENUM_TYPE_DEFINITION]: "enum",
			[Kind.ENUM_TYPE_EXTENSION]: "enum",
			[Kind.UNION_TYPE_DEFINITION]: "union",
			[Kind.UNION_TYPE_EXTENSION]: "union"
		};
		nonTypeSDL = new Set([
			Kind.SCHEMA_DEFINITION,
			Kind.SCHEMA_EXTENSION,
			Kind.DIRECTIVE_DEFINITION,
			Kind.DIRECTIVE_EXTENSION
		]);
		namedType = (input) => {
			let node = input;
			while (node.kind !== Kind.NAMED_TYPE) node = node.type;
			return node.name.value;
		};
	})))();
}

//#endregion
//#region dist/domain/apiContract/GraphqlOperationFacts.js
/** Only output selections affect field binding; input values/directives remain outside this profile. */
function* collectSelections(set, context, parentId) {
	const { info, inventory } = context;
	info?.enter(set);
	try {
		for (const node of set.selections) {
			info?.enter(node);
			try {
				let childParent = parentId;
				if (node.kind === Kind.FIELD) {
					const row = reference(node, parentId, context);
					inventory.retain(row);
					inventory.references.push(row);
					childParent = row.reference_id;
				} else if (node.kind === Kind.FRAGMENT_SPREAD) {
					spread(node, parentId, context);
				}
				if (++context.progress.examined % 128 === 0) yield;
				if (node.kind !== Kind.FRAGMENT_SPREAD && node.selectionSet !== undefined) yield* collectSelections(node.selectionSet, context, childParent);
			} finally {
				info?.leave(node);
			}
		}
	} finally {
		info?.leave(set);
	}
}
/** Record each definition once; fragment edges never recursively expand its body. */
function* collectGraphqlOperationFacts(document, input, inventory, model) {
	inventory.operations = "partial";
	const fragments = new Map();
	const owners = new Map();
	for (const definition of document.definitions) {
		if (!isExecutableDefinitionNode(definition)) {
			inventory.diagnostic("non-operation-definition", "This operation input contains a definition outside operation/fragment interpretation.", "operations", graphqlSource(input.artifact, "operations", definition));
			continue;
		}
		const source = graphqlSource(input.artifact, "operations", definition);
		const row = {
			definition_id: graphqlIdentity("graphql_definition", source),
			kind: definition.kind === Kind.FRAGMENT_DEFINITION ? "fragment" : definition.operation,
			name: definition.name?.value ?? null,
			type_condition: definition.kind === Kind.FRAGMENT_DEFINITION ? definition.typeCondition.name.value : null,
			source
		};
		inventory.retain(row);
		inventory.definitions.push(row);
		owners.set(source.start_utf16, row);
		if (row.kind === "fragment" && row.name !== null) {
			const candidates = fragments.get(row.name) ?? [];
			candidates.push(row);
			fragments.set(row.name, candidates);
		}
		yield;
	}
	const progress = { examined: 0 };
	for (const definition of document.definitions) {
		if (!isExecutableDefinitionNode(definition)) continue;
		const owner = definition.loc === undefined ? undefined : owners.get(definition.loc.start);
		if (owner === undefined) continue;
		const info = model === undefined ? undefined : new TypeInfo(model);
		const context = {
			progress,
			definitionId: owner.definition_id,
			input,
			inventory,
			info,
			fragments
		};
		info?.enter(definition);
		try {
			yield* collectSelections(definition.selectionSet, context, null);
		} finally {
			info?.leave(definition);
		}
		yield;
	}
	inventory.operations = "complete";
}
var reference, spread;
function init_GraphqlOperationFacts() {
	return (init_GraphqlOperationFacts = __esmMin((() => {
		init_GraphqlInventory();
		reference = (node, parentId, { definitionId, input, inventory, info }) => {
			const field = info?.getFieldDef(), parent = info?.getParentType();
			const position = field?.astNode?.loc?.start;
			const fieldId = position === undefined ? undefined : inventory.fieldIdsByStart.get(position);
			const source = graphqlSource(input.artifact, "operations", node);
			const state = fieldId !== undefined ? "resolved" : field != null ? "model-only" : "unknown";
			const reason = fieldId !== undefined ? null : field != null ? "no-sdl-source" : info === undefined ? "schema-model-unavailable" : parent == null ? "parent-type-unavailable" : "unknown-field";
			return {
				reference_id: graphqlIdentity("graphql_reference", source),
				definition_id: definitionId,
				parent_reference_id: parentId,
				field_name: node.name.value,
				response_key: node.alias?.value ?? node.name.value,
				parent_type_name: parent?.name ?? null,
				schema_field_id: fieldId ?? null,
				result_type: field == null ? null : String(field.type),
				state,
				reason,
				source
			};
		};
		spread = (node, parentId, { definitionId, input, inventory, fragments }) => {
			const candidates = fragments.get(node.name.value) ?? [];
			const source = graphqlSource(input.artifact, "operations", node);
			const row = {
				spread_id: graphqlIdentity("graphql_spread", source),
				definition_id: definitionId,
				parent_reference_id: parentId,
				name: node.name.value,
				target_definition_id: candidates.length === 1 ? candidates[0].definition_id : null,
				matching_definitions: candidates.length,
				state: candidates.length === 1 ? "resolved" : candidates.length === 0 ? "missing" : "ambiguous",
				source
			};
			inventory.retain(row);
			inventory.spreads.push(row);
		};
	})))();
}

//#endregion
//#region dist/domain/apiContract/parseGraphqlContract.js
/** One syntax/model interpretation owns all declarations and field bindings. */
function* parseGraphqlContractSteps(schema, operations) {
	const inventory = new GraphqlInventory(schema.artifact, operations?.artifact ?? null, version);
	try {
		const document = parseGraphqlDocument(schema, "schema");
		yield* collectGraphqlSchemaFacts(document, schema, inventory);
		let model;
		try {
			const constructed = buildASTSchema(document);
			const roots = {
				query: constructed.getQueryType()?.name ?? null,
				mutation: constructed.getMutationType()?.name ?? null,
				subscription: constructed.getSubscriptionType()?.name ?? null
			};
			inventory.schemaModel = "constructed";
			inventory.roots = roots;
			model = constructed;
		} catch (cause) {
			if (isHostLimitFailure(cause)) throw new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "GraphQL schema construction exceeded a runtime representation allowance.", {}, { cause });
			if (!(cause instanceof Error)) throw cause;
			inventory.diagnostic("schema-model-unavailable", "The supplied SDL could not construct a schema model. Declaration occurrences remain available; bindings stay unknown. Full schema validation diagnostics are outside this profile.", "schema");
		}
		yield;
		if (operations !== undefined) {
			try {
				const operationDocument = parseGraphqlDocument(operations, "operations");
				yield* collectGraphqlOperationFacts(operationDocument, operations, inventory, model);
			} catch (cause) {
				if (!(cause instanceof GraphqlDocumentRefusal)) throw cause;
				inventory.diagnostic("operations-parse-refused", "The operation document was refused by the GraphQL syntax/parser allowance checks; inspect this source location and the documented parser allowances.", "operations", cause.source);
			}
		}
		return ok(inventory.finish());
	} catch (cause) {
		let error;
		if (cause instanceof GraphqlDocumentRefusal) {
			inventory.diagnostic("schema-parse-refused", "The schema document was refused by GraphQL syntax/parser allowance checks; inspect this source location and the documented allowances.", "schema", cause.source);
			error = new AnalysisInputError(API_CONTRACT_OPERATION, { cause }, [{
				path: ["path"],
				reason: "invalid_format",
				message: "The schema document was refused by the GraphQL syntax/parser allowance checks. Inspect its source location and documented allowances."
			}]);
		} else if (cause instanceof AnalysisError) error = cause;
		else throw cause;
		error.retainPartialObservation(inventory.finish(true));
		return err(error);
	}
}
function init_parseGraphqlContract() {
	return (init_parseGraphqlContract = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_parseFailure();
		init_result();
		init_apiContract();
		init_GraphqlInventory();
		init_GraphqlDocuments();
		init_GraphqlSchemaFacts();
		init_GraphqlOperationFacts();
	})))();
}

//#endregion
//#region dist/application/apiContract/GraphqlContractImport.js
var evidence, inputFailure, decode, retainFailure, importGraphqlContract;
function init_GraphqlContractImport() {
	return (init_GraphqlContractImport = __esmMin((() => {
		init_strictUtf8();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_evidence();
		init_fileSnapshotObservation();
		init_apiContract();
		init_graphqlContract();
		init_GraphqlInventory();
		init_parseGraphqlContract();
		init_result();
		init_JsonInputFile();
		init_ProviderOperationExecution();
		init_ApiContractTraversal();
		init_ApiContractRead();
		evidence = (input, report) => createEvidence({
			path: input.path,
			format: "file",
			sha256: report.artifact.sha256
		}, API_CONTRACT_PROVIDER, {
			operation: API_CONTRACT_OPERATION,
			predicateType: "rea.api-contract-inventory",
			parameters: {
				path: input.path,
				format: input.format,
				max_file_bytes: input.max_file_bytes,
				...input.operations_path === undefined ? {} : { operations_path: input.operations_path }
			},
			result: report,
			confidence: "observed",
			limitations: report.limitations,
			locations: [{
				kind: "artifact-path",
				path: input.path
			}, ...input.operations_path === undefined ? [] : [{
				kind: "artifact-path",
				path: input.operations_path
			}]]
		});
		inputFailure = (parameter, message, cause) => new AnalysisInputError(API_CONTRACT_OPERATION, { cause }, [{
			path: [parameter],
			reason: "invalid_format",
			message
		}]);
		decode = (bytes, parameter) => {
			const required = nativeJsonParseRequiredBytes(bytes.length);
			const available = getHeapStatistics().total_available_size;
			if (required > available) return err(new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "Insufficient parser headroom for GraphQL text and AST expansion.", {
				input_bytes: bytes.length,
				required_bytes: required,
				available_heap_bytes: available
			}, { remediationAction: "Select a smaller complete document or free parser memory; reply paging does not reduce parsing work." }));
			try {
				return ok(decodeStrictUtf8(bytes, "preserve"));
			} catch (cause) {
				if (!(cause instanceof TypeError)) throw cause;
				return err(inputFailure(parameter, "The selected GraphQL document is not valid UTF-8.", cause));
			}
		};
		retainFailure = (failure, input, artifact, operationArtifact) => {
			const prior = failure.partialObservation ?? primaryAnalysisError(failure).partialObservation;
			const parsed = graphqlContractSchema.safeParse(prior);
			const snapshot = fileSnapshotPartialObservationSchema.safeParse(prior);
			const secondary = snapshot.success && snapshot.data.kind === "file-snapshot-hash" && snapshot.data.sha256 !== null && snapshot.data.path !== null && snapshot.data.path === input.operations_path ? {
				path: snapshot.data.path,
				sha256: snapshot.data.sha256,
				bytes: snapshot.data.bytes
			} : operationArtifact;
			const report = parsed.success ? parsed.data : new GraphqlInventory(artifact, secondary, version, input.operations_path !== undefined).finish(true);
			const projected = evidence(input, report);
			let current = failure;
			while (current !== undefined) {
				if (current.partialObservation === prior || current.partialObservation === undefined) current.partialObservation = projected;
				current = current.cleanupPrimary;
			}
			return err(failure);
		};
		importGraphqlContract = async (input, resources, signal) => {
			const loaded = await readApiContract(input, resources, signal);
			if (!loaded.ok) return loaded;
			const artifact = {
				path: input.path,
				sha256: loaded.value.sha256,
				bytes: loaded.value.bytes.length
			};
			const schemaText = decode(loaded.value.bytes, "path");
			if (!schemaText.ok) return retainFailure(schemaText.error, input, artifact, null);
			let operations;
			if (input.operations_path !== undefined) {
				const second = await readApiContract({
					path: input.operations_path,
					max_file_bytes: input.max_file_bytes,
					parameter: "operations_path"
				}, resources, signal);
				if (!second.ok) return retainFailure(second.error, input, artifact, null);
				const secondArtifact = {
					path: input.operations_path,
					sha256: second.value.sha256,
					bytes: second.value.bytes.length
				};
				const text = decode(second.value.bytes, "operations_path");
				if (!text.ok) return retainFailure(text.error, input, artifact, secondArtifact);
				operations = {
					artifact: secondArtifact,
					text: text.value
				};
			}
			const parsed = await completeApiContractSteps(parseGraphqlContractSteps({
				artifact,
				text: schemaText.value
			}, operations), signal);
			if (!parsed.ok) return retainFailure(parsed.error, input, artifact, operations?.artifact ?? null);
			return completeProviderEvidence(evidence(input, parsed.value), signal);
		};
	})))();
}

//#endregion
init_GraphqlContractImport();
export { importGraphqlContract };