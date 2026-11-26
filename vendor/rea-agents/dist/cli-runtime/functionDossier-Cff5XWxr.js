import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisOutputError, init_analysisErrorCore, init_schemaConstraints, requirePresence } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { fixedTupleSchema, init_fixedTupleSchema } from "./relationshipCoverage-2rn3-vch.js";
import { init_nativeAddress, init_nativeValueFlow, nativeAddressCoordinateInputSchema, nativeAddressObservationSchema, nativeValueFlowSchema } from "./nativeValueFlow-13oOEkkJ.js";
import { z } from "zod";

//#region dist/domain/native/nativeSymbol.js
var nativeSymbolMetadataSchema, nativeSymbolOrigin, hasStableNativeSymbol;
function init_nativeSymbol() {
	return (init_nativeSymbol = __esmMin((() => {
		nativeSymbolMetadataSchema = z.object({
			primary: z.boolean(),
			dynamic: z.boolean(),
			external: z.boolean(),
			type: z.string(),
			source: z.enum([
				"default",
				"analysis",
				"ai",
				"imported",
				"user_defined"
			])
		});
		nativeSymbolOrigin = (symbol) => symbol == null ? "unknown" : symbol.dynamic || symbol.source === "default" ? "generated" : "named";
		hasStableNativeSymbol = (name, symbol) => name.length > 0 && nativeSymbolOrigin(symbol) === "named";
	})))();
}

//#endregion
//#region dist/domain/native/addressCoordinate.js
var observedCoordinateSchema, addressCoordinate, addressDistance;
function init_addressCoordinate() {
	return (init_addressCoordinate = __esmMin((() => {
		init_nativeAddress();
		observedCoordinateSchema = nativeAddressObservationSchema.pipe(nativeAddressCoordinateInputSchema);
		addressCoordinate = (value) => {
			const parsed = observedCoordinateSchema.safeParse(value);
			return parsed.success ? parsed.data : null;
		};
		addressDistance = (start, end) => {
			const left = addressCoordinate(start);
			const right = addressCoordinate(end);
			if (left === null || right === null || left.space !== right.space) return null;
			const distance = right.offset - left.offset;
			if (distance < 0n || distance > BigInt(Number.MAX_SAFE_INTEGER)) return null;
			return Number(distance);
		};
	})))();
}

//#endregion
//#region dist/domain/native/nativeFactAvailability.js
var unavailableNativeFactSchema;
function init_nativeFactAvailability() {
	return (init_nativeFactAvailability = __esmMin((() => {
		unavailableNativeFactSchema = z.object({
			available: z.literal(false),
			reason: z.string()
		}).strict();
	})))();
}

//#endregion
//#region dist/domain/native/functionBody.js
var availableFunctionBodySchema, functionBodySchema, functionBodyEntryAgrees;
function init_functionBody() {
	return (init_functionBody = __esmMin((() => {
		init_addressCoordinate();
		init_nativeFactAvailability();
		availableFunctionBodySchema = z.strictObject({
			available: z.literal(true),
			provenance: z.string().min(1),
			ranges: z.array(z.strictObject({
				start: z.string(),
				end: z.string().describe("Inclusive last address of this observed body range.")
			})),
			total_bytes: z.int().min(0).max(Number.MAX_SAFE_INTEGER),
			span_bytes: z.int().min(0).max(Number.MAX_SAFE_INTEGER).nullable(),
			non_contiguous: z.boolean(),
			contains_entry: z.boolean()
		}).superRefine((body, context) => {
			let total = 0n;
			const bounds = new Map();
			const closedSpaces = new Set();
			let previousSpace;
			for (const range of body.ranges) {
				const start = addressCoordinate(range.start);
				const end = addressCoordinate(range.end);
				if (start === null || end === null || start.space !== end.space || end.offset < start.offset) {
					context.addIssue({
						code: "custom",
						message: "Function body range has invalid inclusive endpoints"
					});
					return;
				}
				if (previousSpace !== undefined && previousSpace !== start.space) closedSpaces.add(previousSpace);
				const previous = bounds.get(start.space);
				if (closedSpaces.has(start.space) || previous !== undefined && start.offset <= previous.end + 1n) {
					context.addIssue({
						code: "custom",
						message: "Function body ranges must be ordered, disjoint and maximal within each address space"
					});
					return;
				}
				bounds.set(start.space, {
					start: previous?.start ?? start.offset,
					end: end.offset
				});
				previousSpace = start.space;
				total += end.offset - start.offset + 1n;
			}
			const onlyBounds = bounds.size === 1 ? [...bounds.values()][0] : undefined;
			const span = bounds.size === 0 ? 0n : onlyBounds === undefined ? null : onlyBounds.end - onlyBounds.start + 1n;
			const reportedSpan = body.span_bytes === null ? null : BigInt(body.span_bytes);
			if (total !== BigInt(body.total_bytes) || span !== reportedSpan || body.non_contiguous !== body.ranges.length > 1) context.addIssue({
				code: "custom",
				message: "Function body counts, enclosing span or contiguity disagree with inclusive ranges"
			});
		});
		functionBodySchema = z.discriminatedUnion("available", [unavailableNativeFactSchema, availableFunctionBodySchema]);
		functionBodyEntryAgrees = (body, address) => {
			if (!body.available) return true;
			const entry = addressCoordinate(address);
			if (entry === null) return false;
			const contains = body.ranges.some((range) => {
				const start = addressCoordinate(range.start);
				const end = addressCoordinate(range.end);
				return start !== null && end !== null && start.space === entry.space && entry.offset >= start.offset && entry.offset <= end.offset;
			});
			return contains === body.contains_entry;
		};
	})))();
}

//#endregion
//#region dist/domain/native/procedureInfo.js
var procedureClassificationSchema, procedureIdentitySchema, localVariableSchema, procedureInfoSchema;
function init_procedureInfo() {
	return (init_procedureInfo = __esmMin((() => {
		init_nativeSymbol();
		init_functionBody();
		procedureClassificationSchema = z.object({
			external: z.boolean(),
			thunk: z.boolean(),
			thunk_target: z.string().nullable(),
			provenance: z.string().min(1)
		}).strict();
		procedureIdentitySchema = z.object({
			address: z.string(),
			name: z.string(),
			symbol: nativeSymbolMetadataSchema.nullable().exactOptional(),
			classification: procedureClassificationSchema.nullable(),
			body: functionBodySchema
		}).strict().superRefine((identity, context) => {
			if (!functionBodyEntryAgrees(identity.body, identity.address)) context.addIssue({
				code: "custom",
				message: "Function body entry membership disagrees with procedure identity"
			});
		});
		localVariableSchema = z.object({
			description: z.string(),
			provenance: z.string().min(1),
			name: z.string().nullable().exactOptional(),
			stack_displacement: z.string().regex(/^-?\d+$/u).nullable().exactOptional().describe("Observed signed stack byte displacement, encoded as decimal to preserve precision.")
		}).strict();
		procedureInfoSchema = z.object({
			name: z.string(),
			symbol: nativeSymbolMetadataSchema.nullable().exactOptional(),
			entrypoint: z.string(),
			basicblock_count: z.number().int().min(0),
			length: z.number().min(0),
			signature: z.string().nullable(),
			locals: z.array(localVariableSchema),
			classification: procedureClassificationSchema.nullable(),
			body: functionBodySchema
		});
	})))();
}

//#endregion
//#region dist/domain/native/nativeCallReference.js
var nativeCallClassificationSchema, nativeCallReferenceSchema;
function init_nativeCallReference() {
	return (init_nativeCallReference = __esmMin((() => {
		nativeCallClassificationSchema = z.strictObject({
			classification: z.enum([
				"none",
				"unknown",
				"direct",
				"objective_c"
			]),
			provider_type: z.number().int(),
			provenance: z.string().min(1)
		});
		nativeCallReferenceSchema = nativeCallClassificationSchema.extend({
			source_address: z.string(),
			target_address: z.string()
		});
	})))();
}

//#endregion
//#region dist/domain/native/nativeReference.js
var availableReferenceKindSchema, referenceKindSchema, unresolvedCallSchema, referenceEdgeSchema;
function init_nativeReference() {
	return (init_nativeReference = __esmMin((() => {
		init_nativeFactAvailability();
		init_procedureInfo();
		init_nativeCallReference();
		availableReferenceKindSchema = z.object({
			available: z.literal(true),
			provenance: z.string().min(1),
			type: z.string(),
			flow: z.boolean(),
			call: z.boolean(),
			jump: z.boolean(),
			data: z.boolean(),
			read: z.boolean(),
			write: z.boolean(),
			indirect: z.boolean(),
			computed: z.boolean(),
			conditional: z.boolean(),
			terminal: z.boolean(),
			primary: z.boolean(),
			operand_index: z.int(),
			external: z.boolean()
		}).strict();
		referenceKindSchema = z.discriminatedUnion("available", [unavailableNativeFactSchema, availableReferenceKindSchema]);
		unresolvedCallSchema = z.strictObject({
			address: z.string(),
			reason: z.string()
		});
		referenceEdgeSchema = z.object({
			source_address: z.string(),
			target_address: z.string(),
			source_procedure: procedureIdentitySchema.nullable(),
			target_procedure: procedureIdentitySchema.nullable(),
			kind: referenceKindSchema,
			call: nativeCallClassificationSchema.exactOptional()
		}).strict();
	})))();
}

//#endregion
//#region dist/domain/native/nativeString.js
var analysisStringSchema;
function init_nativeString() {
	return (init_nativeString = __esmMin((() => {
		init_nativeFactAvailability();
		analysisStringSchema = z.object({
			address: z.string(),
			value: z.string(),
			provider_value: z.string().exactOptional().describe("Original provider display text, which may shorten the typed object."),
			decoding: unavailableNativeFactSchema.exactOptional().describe("When present, value retains native display text because typed bytes could not be decoded."),
			string: z.object({
				encoding: z.string().min(1),
				encoding_status: z.enum(["observed", "inferred"]).exactOptional().describe("Whether the provider declares the encoding or REA infers it from the typed bytes and native display. This does not establish the original source's intended encoding."),
				termination: z.enum(["missing", "present_or_not_required"]),
				byte_length: z.int().min(0)
			}).exactOptional()
		});
	})))();
}

//#endregion
//#region dist/domain/native/swiftStringLiteral.js
var swiftStringLiteralFields, swiftSmallStringLiteralSchema, swiftLargeStringLiteralSchema, swiftStringLiteralSchema, swiftStringLiteralOmissionFields, swiftSmallStringLiteralOmissionSchema, swiftLargeStringLiteralOmissionSchema, swiftStringLiteralOmissionSchema;
function init_swiftStringLiteral() {
	return (init_swiftStringLiteral = __esmMin((() => {
		init_fixedTupleSchema();
		swiftStringLiteralFields = {
			source_address: z.string().describe("Instruction that consumes both words: a call, tail call, return, or paired store."),
			value: z.string().describe("Decoded UTF-8 text, including the canonical empty string."),
			registers: fixedTupleSchema([z.string(), z.string()]),
			words: fixedTupleSchema([z.string(), z.string()]).describe("Observed constant register values, in register order.")
		};
		swiftSmallStringLiteralSchema = z.strictObject({
			...swiftStringLiteralFields,
			representation: z.literal("small").describe("The UTF-8 bytes are inside the two words."),
			address: z.null().describe("A small literal has no storage of its own.")
		});
		swiftLargeStringLiteralSchema = z.strictObject({
			...swiftStringLiteralFields,
			representation: z.literal("large").describe("An immortal literal whose words hold its count and a pointer to its bytes."),
			address: z.string().describe("Address of a large literal's bytes.")
		});
		swiftStringLiteralSchema = z.discriminatedUnion("representation", [swiftSmallStringLiteralSchema, swiftLargeStringLiteralSchema]);
		swiftStringLiteralOmissionFields = {
			source_address: swiftStringLiteralFields.source_address,
			byte_length: z.int().min(0).max(Number.MAX_SAFE_INTEGER),
			reason: z.enum(["capacity", "unresolved_jump"]).describe("Why this candidate is omitted: capacity stopped decoding, or an unresolved jump left its use unknown."),
			registers: swiftStringLiteralFields.registers,
			words: swiftStringLiteralFields.words
		};
		swiftSmallStringLiteralOmissionSchema = z.strictObject({
			...swiftStringLiteralOmissionFields,
			representation: z.literal("small"),
			address: z.null()
		});
		swiftLargeStringLiteralOmissionSchema = z.strictObject({
			...swiftStringLiteralOmissionFields,
			representation: z.literal("large"),
			address: z.string().describe("Address of the literal's bytes.")
		});
		swiftStringLiteralOmissionSchema = z.discriminatedUnion("representation", [swiftSmallStringLiteralOmissionSchema, swiftLargeStringLiteralOmissionSchema]);
	})))();
}

//#endregion
//#region dist/domain/native/nativeApiBoundary.js
var inferenceConfidenceSchema, inferenceEvidenceSchema, inferredBoundaryTypeFacts, inferredReturnTypeSchema, inferredParameterTypeSchema, jumpTableDataSourceSchema, jumpTableMappingSchema, jumpTableDefaultTargetSchema, inferredJumpTableSchema, prototypeConflictFacts, prototypeConflictSchema, availableNativeApiBoundarySchema, unavailableNativeApiBoundarySchema, nativeApiBoundarySchema, nativeApiInspectionSubstepSchema, nativeApiInspectionResultSchema;
function init_nativeApiBoundary() {
	return (init_nativeApiBoundary = __esmMin((() => {
		inferenceConfidenceSchema = z.enum([
			"low",
			"medium",
			"high"
		]);
		inferenceEvidenceSchema = z.object({
			kind: z.enum([
				"signature-source",
				"decompiler-type",
				"type-lock",
				"calling-convention",
				"jump-table"
			]),
			source: z.string().min(1),
			detail: z.string().min(1)
		}).strict();
		inferredBoundaryTypeFacts = {
			ordinal: z.int().min(0).nullable(),
			name: z.string().min(1).nullable(),
			data_type: z.string().min(1),
			size_bytes: z.int().min(0).nullable(),
			storage: z.string().min(1).nullable(),
			confidence: inferenceConfidenceSchema,
			evidence: z.array(inferenceEvidenceSchema).min(1),
			decompiler_artifacts: z.array(z.enum([
				"recovered-signature",
				"register-or-stack-storage",
				"compiler-generated-variable"
			]))
		};
		inferredReturnTypeSchema = z.strictObject({
			...inferredBoundaryTypeFacts,
			role: z.literal("return"),
			ordinal: z.null(),
			name: z.null()
		});
		inferredParameterTypeSchema = z.strictObject({
			...inferredBoundaryTypeFacts,
			role: z.literal("parameter"),
			ordinal: z.int().min(0)
		});
		jumpTableDataSourceSchema = z.object({
			address: z.string().min(1),
			provenance: z.enum([
				"ghidra-decompiler-load-table",
				"ghidra-dispatch-block-data-reference",
				"ghidra-aarch64-byte-table",
				"ghidra-aarch64-halfword-table"
			]),
			entry_size_bytes: z.int().min(1).nullable(),
			entry_count: z.int().min(0).nullable(),
			confidence: inferenceConfidenceSchema,
			evidence: z.array(inferenceEvidenceSchema).min(1)
		}).strict();
		jumpTableMappingSchema = z.object({
			case_value: z.int().nullable(),
			target_address: z.string().min(1),
			confidence: inferenceConfidenceSchema,
			evidence: z.array(inferenceEvidenceSchema).min(1)
		}).strict();
		jumpTableDefaultTargetSchema = z.strictObject({
			target_address: z.string().min(1),
			confidence: inferenceConfidenceSchema,
			evidence: z.array(inferenceEvidenceSchema).min(1)
		});
		inferredJumpTableSchema = z.object({
			dispatch_address: z.string().min(1),
			data_sources: z.array(jumpTableDataSourceSchema),
			mappings: z.array(jumpTableMappingSchema),
			default_targets: z.array(jumpTableDefaultTargetSchema),
			limitations: z.array(z.string())
		}).strict();
		prototypeConflictFacts = {
			inferred_signature: z.string().min(1),
			signature_source: z.string().min(1),
			inferred_parameter_count: z.int().nonnegative(),
			instruction_address: z.string().min(1),
			instruction: z.string().min(1),
			unresolved_assumptions: z.array(z.string().min(1)).min(1)
		};
		prototypeConflictSchema = z.discriminatedUnion("kind", [z.strictObject({
			...prototypeConflictFacts,
			kind: z.literal("stack-argument-read"),
			frame_offset_bytes: z.int().positive()
		}), z.strictObject({
			...prototypeConflictFacts,
			kind: z.literal("return-stack-cleanup"),
			cleanup_bytes: z.int().nonnegative(),
			inferred_stack_bytes: z.int().nonnegative()
		})]);
		availableNativeApiBoundarySchema = z.object({
			available: z.literal(true),
			provenance: z.string().min(1),
			signature_source: z.string().min(1),
			calling_convention: z.string().min(1),
			return_type: inferredReturnTypeSchema,
			parameters: z.array(inferredParameterTypeSchema),
			/** Omitted on older dossiers or providers without an instruction consistency check. */
			prototype_conflicts: z.array(prototypeConflictSchema).exactOptional(),
			jump_tables: z.array(inferredJumpTableSchema),
			pseudocode: z.object({
				classification: z.literal("decompiler-generated-non-source"),
				compilable: z.literal(false)
			}).strict(),
			decompiler_artifacts: z.array(z.enum([
				"recovered-signature",
				"register-and-stack-variables",
				"compiler-generated-control-flow",
				"pointer-arithmetic",
				"pseudocode"
			])),
			limitations: z.array(z.string())
		}).strict();
		unavailableNativeApiBoundarySchema = z.object({
			available: z.literal(false),
			reason: z.string().min(1),
			residual_unknowns: z.array(z.string().min(1)).min(1)
		}).strict();
		nativeApiBoundarySchema = z.discriminatedUnion("available", [unavailableNativeApiBoundarySchema, availableNativeApiBoundarySchema]);
		nativeApiInspectionSubstepSchema = z.object({
			operation: z.enum([
				"analyze_function",
				"project_native_api_boundary",
				"preserve_residual_unknowns"
			]),
			status: z.enum(["completed", "unsupported"]),
			observations: z.array(z.string().min(1))
		}).strict();
		nativeApiInspectionResultSchema = z.object({
			procedure: z.object({
				address: z.string().min(1),
				name: z.string().min(1)
			}).strict(),
			boundary: nativeApiBoundarySchema,
			substeps: z.array(nativeApiInspectionSubstepSchema).length(3),
			unsupported_branches: z.array(z.string().min(1)),
			residual_unknowns: z.array(z.string().min(1))
		}).strict();
	})))();
}

//#endregion
//#region dist/domain/native/functionDossier.js
var functionInstructionWindowSchema, facetAvailabilitySchema, functionFacetAvailabilitySchema, SWIFT_LITERALS_TOGETHER, functionDossierSchema, parseFunctionDossier;
function init_functionDossier() {
	return (init_functionDossier = __esmMin((() => {
		init_schemaConstraints();
		init_result();
		init_analysisErrorCore();
		init_procedureInfo();
		init_nativeString();
		init_nativeReference();
		init_swiftStringLiteral();
		init_nativeApiBoundary();
		init_nativeValueFlow();
		functionInstructionWindowSchema = z.object({
			procedure: procedureIdentitySchema,
			instructions: z.array(z.string()),
			limitations: z.array(z.string())
		}).strict();
		facetAvailabilitySchema = z.discriminatedUnion("available", [z.object({ available: z.literal(true) }).strict(), z.object({
			available: z.literal(false),
			reason: z.string().min(1)
		}).strict()]);
		functionFacetAvailabilitySchema = z.object({
			pseudocode: facetAvailabilitySchema.exactOptional(),
			assembly: facetAvailabilitySchema.exactOptional(),
			comments: facetAvailabilitySchema.exactOptional(),
			callers: facetAvailabilitySchema.exactOptional(),
			callees: facetAvailabilitySchema.exactOptional(),
			references: facetAvailabilitySchema.exactOptional(),
			strings_names: facetAvailabilitySchema.exactOptional(),
			cfg: facetAvailabilitySchema.exactOptional()
		}).strict();
		SWIFT_LITERALS_TOGETHER = "Swift literals and their omissions must be recorded together";
		functionDossierSchema = requirePresence(z.object({
			procedure: procedureIdentitySchema.safeExtend({
				signature: z.string().nullable(),
				locals: z.array(localVariableSchema)
			}),
			pseudocode: z.string(),
			assembly: z.array(z.string()),
			comments: z.array(z.object({
				address: z.string(),
				kind: z.enum(["comment", "inline"]),
				text: z.string()
			}).strict()),
			callers: z.array(procedureIdentitySchema),
			callees: z.array(procedureIdentitySchema),
			incoming_references: z.array(referenceEdgeSchema),
			outgoing_references: z.array(referenceEdgeSchema),
			unresolved_calls: z.array(unresolvedCallSchema).exactOptional(),
			referenced_strings: z.array(analysisStringSchema.extend({ source_address: z.string() })),
			referenced_names: z.array(z.object({
				address: z.string(),
				value: z.string(),
				source_address: z.string()
			}).strict()),
			swift_string_literals: z.array(swiftStringLiteralSchema).exactOptional().describe("Swift String literals decoded from constant register values. Absent when the provider does not decode them for this target."),
			swift_string_literal_omissions: z.array(swiftStringLiteralOmissionSchema).exactOptional().describe("Literal candidates omitted for capacity or unresolved control flow. Present exactly when swift_string_literals is present; empty when all examined use sites were classified."),
			basic_blocks: z.array(z.object({
				start: z.string(),
				end: z.string(),
				successors: z.array(z.string())
			}).strict()),
			native_api: nativeApiBoundarySchema.nullable(),
			native_value_flow: nativeValueFlowSchema.nullable(),
			facet_availability: functionFacetAvailabilitySchema.exactOptional(),
			limitations: z.array(z.string())
		}).strict(), [{
			when: "swift_string_literals",
			requires: "swift_string_literal_omissions",
			message: SWIFT_LITERALS_TOGETHER,
			path: "swift_string_literal_omissions"
		}, {
			when: "swift_string_literal_omissions",
			requires: "swift_string_literals",
			message: SWIFT_LITERALS_TOGETHER
		}]);
		parseFunctionDossier = (value) => {
			const parsed = functionDossierSchema.safeParse(value);
			return parsed.success ? ok(parsed.data) : err(new AnalysisOutputError("analyze_function", "provider output did not match the dossier contract", { cause: parsed.error }));
		};
	})))();
}

//#endregion
export { addressCoordinate, addressDistance, analysisStringSchema, availableFunctionBodySchema, availableNativeApiBoundarySchema, availableReferenceKindSchema, functionBodyEntryAgrees, functionDossierSchema, functionFacetAvailabilitySchema, functionInstructionWindowSchema, hasStableNativeSymbol, init_addressCoordinate, init_functionBody, init_functionDossier, init_nativeApiBoundary, init_nativeCallReference, init_nativeFactAvailability, init_nativeReference, init_nativeString, init_nativeSymbol, init_procedureInfo, init_swiftStringLiteral, nativeApiInspectionResultSchema, nativeCallClassificationSchema, nativeCallReferenceSchema, nativeSymbolMetadataSchema, nativeSymbolOrigin, parseFunctionDossier, procedureIdentitySchema, procedureInfoSchema, referenceEdgeSchema, referenceKindSchema, swiftLargeStringLiteralOmissionSchema, swiftLargeStringLiteralSchema, swiftSmallStringLiteralOmissionSchema, swiftSmallStringLiteralSchema, unavailableNativeApiBoundarySchema, unavailableNativeFactSchema, unresolvedCallSchema };