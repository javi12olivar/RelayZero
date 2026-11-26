import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, EvidenceIntegrityError, analysisParameterLimitSchema, init_analysisErrorCore, init_analysisSettingDefinitions, init_coverage, init_evidenceErrors, knownCoverageStatusSchema } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { evidenceFileTarget, init_evidence, init_evidenceValidation, readEvidence, readEvidencePayload } from "./nativeValueFlow-13oOEkkJ.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { z } from "zod";

//#region dist/domain/managed/managedFieldConstant.js
var managedFieldConstantSchema;
function init_managedFieldConstant() {
	return (init_managedFieldConstant = __esmMin((() => {
		managedFieldConstantSchema = z.object({
			state: z.enum(["decoded", "unavailable"]),
			element_type: z.enum([
				"boolean",
				"char",
				"i1",
				"u1",
				"i2",
				"u2",
				"i4",
				"u4",
				"i8",
				"u8",
				"r4",
				"r8",
				"string",
				"class"
			]).nullable(),
			declarations: z.array(z.object({
				row_offset: z.int().nonnegative(),
				type_code: z.int().min(0).max(255),
				padding: z.int().min(0).max(255),
				blob_index: z.int().nonnegative()
			})),
			raw_hex: z.string().regex(/^(?:[0-9a-f]{2})*$/u).nullable(),
			value: z.union([
				z.string(),
				z.number(),
				z.boolean(),
				z.null()
			]).describe("Encoded scalar, not runtime state. i8/u8 are decimal strings; negative zero and nonfinite floats are -0/NaN/Infinity/-Infinity strings. Null is a decoded class null only when state is decoded."),
			limitation: z.string().nullable()
		});
	})))();
}

//#endregion
//#region dist/domain/managed/managedReaderFailure.js
var ManagedReaderFailure, ManagedHeapAmbiguityFailure, managedMetadataFailureStatus, managedInspectionInputFailure, managedFailure, retainManagedValueFailure, readManagedValue, uniqueManagedParseIssues, appendManagedParseIssues;
function init_managedReaderFailure() {
	return (init_managedReaderFailure = __esmMin((() => {
		init_analysisErrorCore();
		ManagedReaderFailure = class extends Error {
			issue;
			metadataHeader;
			constructor(issue, options) {
				super(issue.detail, options);
				this.issue = issue;
				this.metadataHeader = options?.metadataHeader ?? null;
			}
		};
		ManagedHeapAmbiguityFailure = class extends ManagedReaderFailure {};
		managedMetadataFailureStatus = (issue) => issue.code === "resource-limit" || issue.code === "unsupported-metadata" ? "partial" : "malformed";
		managedInspectionInputFailure = (operation, path, cause, inputField = "path") => cause instanceof ManagedReaderFailure && managedMetadataFailureStatus(cause.issue) === "malformed" ? new AnalysisInputError(operation, { cause }, [{
			path: [inputField],
			reason: "invalid_format",
			message: `Selected artifact ${path}: ${cause.issue.detail}`
		}]) : undefined;
		managedFailure = (code, scope, detail, offset = null) => new ManagedReaderFailure({
			code,
			scope,
			offset,
			detail
		});
		retainManagedValueFailure = (cause, issues) => {
			if (!(cause instanceof ManagedReaderFailure) || managedMetadataFailureStatus(cause.issue) === "partial") throw cause;
			if (!(cause instanceof ManagedHeapAmbiguityFailure)) issues.push(cause.issue);
			return cause;
		};
		readManagedValue = (operation, issues) => {
			try {
				return operation();
			} catch (cause) {
				retainManagedValueFailure(cause, issues);
				return undefined;
			}
		};
		uniqueManagedParseIssues = (issues) => [...new Map(issues.map((issue) => [JSON.stringify(issue), issue])).values()];
		appendManagedParseIssues = (issues, ...found) => {
			for (const list of found) for (const issue of list) issues.push(issue);
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedUnresolvedDefinitions.js
var uint32, typeToken, methodToken, failedDefinitionFieldSchema, coordinates, unresolvedDefinitionSchema, unresolvedDefinitionsSchema, readDefinitionField, tokenRow, validateUnresolvedDefinitions;
function init_managedUnresolvedDefinitions() {
	return (init_managedUnresolvedDefinitions = __esmMin((() => {
		init_managedReaderFailure();
		uint32 = z.int().min(0).max(4294967295);
		typeToken = z.string().regex(/^0x02[0-9a-f]{6}$/u);
		methodToken = z.string().regex(/^0x06[0-9a-f]{6}$/u);
		failedDefinitionFieldSchema = z.strictObject({
			field: z.enum(["Name", "Namespace"]),
			field_offset: z.int().nonnegative(),
			heap_index: uint32,
			reason: z.enum([
				"ambiguous-string-heap",
				"invalid-heap-index",
				"invalid-string",
				"empty-required-name"
			])
		});
		coordinates = {
			row_offset: z.int().nonnegative(),
			failed_fields: z.array(failedDefinitionFieldSchema).min(1).max(2)
		};
		unresolvedDefinitionSchema = z.discriminatedUnion("kind", [z.strictObject({
			kind: z.literal("TypeDef"),
			token: typeToken,
			...coordinates
		}), z.strictObject({
			kind: z.literal("MethodDef"),
			token: methodToken,
			...coordinates,
			declaring_type_token: typeToken.nullable(),
			rva: uint32.describe("Raw MethodDef RVA, including zero; a nonzero value does not establish a file-backed body.")
		})]);
		unresolvedDefinitionsSchema = z.strictObject({
			rows: z.array(unresolvedDefinitionSchema).describe("Physical TypeDef coordinates from the assembly-wide name scan, then MethodDef coordinates within the source method interval and selected declaring types. These rows carry local coordinates only and do not satisfy nominal selectors."),
			method_names_examined: z.boolean().describe("Whether method names were examined within the recorded method interval and any exact declaring-type selection. False means capacity recovery retained only the type coordinates.")
		});
		readDefinitionField = (operation, issues, field, offset, heapIndex) => {
			try {
				return operation();
			} catch (cause) {
				const failure = retainManagedValueFailure(cause, issues);
				let reason;
				if (failure instanceof ManagedHeapAmbiguityFailure) reason = "ambiguous-string-heap";
				else switch (failure.issue.code) {
					case "invalid-heap-index":
					case "invalid-string":
						reason = failure.issue.code;
						break;
					case "invalid-row":
						reason = "empty-required-name";
						break;
					default: throw failure;
				}
				return {
					field,
					field_offset: offset,
					heap_index: heapIndex,
					reason
				};
			}
		};
		tokenRow = (token) => Number.parseInt(token.slice(4), 16);
		validateUnresolvedDefinitions = (report, context) => {
			const projection = report.unresolved_definitions;
			if (projection === undefined) return;
			const fail = (path, message) => context.addIssue({
				code: "custom",
				path: ["unresolved_definitions", ...path],
				message
			});
			if (projection.method_names_examined !== (report.signature_resolution !== null) || projection.method_names_examined && report.method_rows === null) fail(["method_names_examined"], "Method name coverage must agree with member examination and the recorded MethodDef interval.");
			if (projection.rows.length === 0) return;
			if (report.coverage.state !== "partial" || report.metadata.status !== "partial") fail(["rows"], "Unresolved definitions require partial metadata and coverage.");
			const typeTokens = new Set(report.types.map(({ token }) => token));
			const methodTokens = new Set(report.methods.map(({ token }) => token));
			const { byte_length: byteLength } = report.artifact;
			const counts = report.metadata.table_row_counts;
			let previous = "";
			for (const [index, row] of projection.rows.entries()) {
				const rid = tokenRow(row.token);
				if (rid < 1 || rid > (counts[row.kind] ?? 0) || row.token <= previous || (row.kind === "TypeDef" ? typeTokens : methodTokens).has(row.token)) fail([
					"rows",
					index,
					"token"
				], "Expected a unique, in-table token in order, distinct from named rows.");
				previous = row.token;
				if (row.kind === "MethodDef") {
					const interval = report.method_rows;
					if (!projection.method_names_examined || interval === null || rid <= interval.offset || rid - interval.offset > interval.count) fail([
						"rows",
						index,
						"token"
					], "MethodDef coordinate is outside the examined interval.");
					const owner = row.declaring_type_token;
					if (owner !== null && (tokenRow(owner) < 1 || tokenRow(owner) > (counts.TypeDef ?? 0)) || report.selection !== null && (owner === null || !typeTokens.has(owner))) fail([
						"rows",
						index,
						"declaring_type_token"
					], "MethodDef owner must be an admitted TypeDef within the applicable selection.");
				}
				const fields = new Set();
				let previousFieldOffset = row.row_offset;
				for (const [column, fact] of row.failed_fields.entries()) {
					if (row.kind === "MethodDef" && fact.field !== "Name" || fields.has(fact.field) || fact.field_offset <= previousFieldOffset || fact.field_offset > byteLength - 2 || fact.reason === "empty-required-name" && fact.field !== "Name" || fact.heap_index === 0 && fact.reason !== "empty-required-name") fail([
						"rows",
						index,
						"failed_fields",
						column
					], "Expected a distinct failed name column within the checked row and artifact.");
					fields.add(fact.field);
					previousFieldOffset = fact.field_offset;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedArtifact.js
var managedMetadataTokenSchema, offsetSchema, managedInspectionStateSchema, managedInspectionCoverage, cliMetadataGuidSchema, publicKeyIdentitySchema, assemblyIdentitySchema, moduleRowCoordinates, moduleIdentitySchema, unresolvedModuleNameSchema, managedMetadataStatusSchema, managedArtifactReferenceSchema, managedMetadataSummarySchema, managedTokenIdentityScopeSchema, assemblyReferenceSchema, managedResourceSchema, customAttributeSchema, managedSignatureSchema, managedTypeSchema, managedExportedTypeSchema, managedFieldSchema, managedExceptionRegionSchema, managedInstructionAnchorSchema, managedMethodBodySchema, managedMethodSchema, declaringTypeNameSchema, managedMemberReferenceSchema, managedUserStringSchema, managedModuleReferenceSchema, managedNativeImportSchema, managedNativeImplementationSchema, targetRowResolvedSchema, managedCallEdgeSchema, managedFieldAccessSchema, managedParseIssueSchema, managedArtifactInspectionSchema, UNEXAMINED_MEMBER_COLLECTIONS, managedMemberInspectionSchema, managedNativeBoundaryInspectionSchema;
function init_managedArtifact() {
	return (init_managedArtifact = __esmMin((() => {
		init_coverage();
		init_digests();
		init_analysisSettingDefinitions();
		init_managedFieldConstant();
		init_managedUnresolvedDefinitions();
		managedMetadataTokenSchema = z.string().regex(/^0x[0-9a-f]{8}$/u);
		offsetSchema = z.int().min(0);
		managedInspectionStateSchema = z.enum([...knownCoverageStatusSchema.options, "unavailable"]);
		managedInspectionCoverage = (state) => state === "unavailable" ? "unknown" : state;
		cliMetadataGuidSchema = z.string().regex(/^[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$/u);
		publicKeyIdentitySchema = z.object({
			kind: z.enum([
				"none",
				"public-key",
				"public-key-token"
			]),
			byte_length: z.int().min(0),
			sha256: digestSchema.nullable(),
			token: z.string().regex(/^[a-f0-9]{16}$/u).nullable()
		});
		assemblyIdentitySchema = z.object({
			name: z.string(),
			version: z.string().regex(/^\d+\.\d+\.\d+\.\d+$/u),
			culture: z.string().nullable(),
			flags: z.int().min(0).max(4294967295),
			hash_algorithm: z.int().min(0).max(4294967295),
			public_key: publicKeyIdentitySchema,
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema
		});
		moduleRowCoordinates = {
			generation: z.int().min(0).max(65535),
			mvid: cliMetadataGuidSchema.nullable(),
			enc_id: cliMetadataGuidSchema.nullable(),
			enc_base_id: cliMetadataGuidSchema.nullable(),
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema
		};
		moduleIdentitySchema = z.object({
			name: z.string(),
			...moduleRowCoordinates
		});
		unresolvedModuleNameSchema = z.strictObject({
			name: z.null(),
			name_index: z.int().min(1).max(4294967295),
			...moduleRowCoordinates,
			token: z.literal("0x00000001")
		});
		managedMetadataStatusSchema = z.enum([
			"absent",
			...knownCoverageStatusSchema.options,
			"malformed"
		]);
		managedArtifactReferenceSchema = z.object({
			path: z.string().min(1),
			sha256: digestSchema,
			byte_length: z.int().min(0),
			format: z.literal("pe")
		});
		managedMetadataSummarySchema = z.object({
			status: managedMetadataStatusSchema,
			version: z.string().nullable(),
			table_row_counts: z.record(z.string(), z.int().min(0).max(4294967295)),
			unresolved_module_name: unresolvedModuleNameSchema.exactOptional()
		});
		managedTokenIdentityScopeSchema = z.object({
			token_identity: z.literal("build-local"),
			requires_artifact_sha256: digestSchema,
			requires_mvid: cliMetadataGuidSchema.nullable()
		});
		assemblyReferenceSchema = z.object({
			name: z.string(),
			version: z.string().regex(/^\d+\.\d+\.\d+\.\d+$/u),
			culture: z.string().nullable(),
			flags: z.int().min(0).max(4294967295),
			public_key_or_token: publicKeyIdentitySchema,
			hash_value_sha256: digestSchema.nullable(),
			hash_value_length: z.int().min(0),
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema
		});
		managedResourceSchema = z.object({
			name: z.string(),
			flags: z.int().min(0).max(4294967295),
			visibility: z.enum([
				"public",
				"private",
				"unknown"
			]),
			implementation_token: managedMetadataTokenSchema.nullable(),
			embedded: z.boolean(),
			declared_offset: z.int().min(0).max(4294967295),
			data_length: z.int().min(0).nullable(),
			data_sha256: digestSchema.nullable(),
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema
		});
		customAttributeSchema = z.object({
			parent_token: managedMetadataTokenSchema,
			constructor_token: managedMetadataTokenSchema.nullable(),
			type_name: z.string().nullable(),
			value_length: z.int().min(0),
			value_sha256: digestSchema,
			decoded_fixed_string: z.string().nullable(),
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema
		});
		managedSignatureSchema = z.object({
			raw_length: z.int().min(0),
			raw_sha256: digestSchema,
			resolved_sha256: digestSchema.nullable().describe("SHA-256 of the raw signature with each TypeDef or TypeRef operand replaced by that type's namespace-qualified name; equals raw_sha256 when the signature names no types. Unlike raw_sha256 it does not depend on build-local metadata rows. Null when the signature could not be decoded or names a type REA could not resolve, such as a TypeSpec."),
			kind: z.enum([
				"method",
				"field",
				"unknown"
			]),
			parse_status: z.enum([
				"decoded",
				"partial",
				"unsupported",
				"malformed"
			]),
			calling_convention: z.string().nullable(),
			generic_parameter_count: z.int().min(0).nullable(),
			parameter_count: z.int().min(0).nullable(),
			return_type: z.string().nullable(),
			parameter_types: z.array(z.string()),
			field_type: z.string().nullable(),
			issue: z.string().nullable()
		});
		managedTypeSchema = z.object({
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema,
			namespace: z.string(),
			name: z.string(),
			full_name: z.string(),
			name_sha256: digestSchema.nullable().describe("Framed nominal namespace/name/enclosing-name digest, independent of build-local rows. Null for unresolved nesting; defining assemblies and CLR runtime identity are not established."),
			flags: z.int().min(0).max(4294967295),
			extends_token: managedMetadataTokenSchema.nullable(),
			enclosing_type_token: managedMetadataTokenSchema.nullable().describe("Observed enclosing TypeDef from NestedClass; null when no enclosing entry was available, which alone does not establish top-level identity."),
			field_list: z.object({
				first_row: z.int().min(1).nullable(),
				last_row: z.int().min(0).nullable(),
				count: z.int().min(0)
			}),
			method_list: z.object({
				first_row: z.int().min(1).nullable(),
				last_row: z.int().min(0).nullable(),
				count: z.int().min(0)
			})
		});
		managedExportedTypeSchema = z.object({
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema,
			namespace: z.string(),
			name: z.string(),
			flags: z.int().min(0).max(4294967295),
			forwarder: z.boolean(),
			type_def_id: z.int().min(0).max(4294967295),
			implementation_token: managedMetadataTokenSchema.nullable()
		});
		managedFieldSchema = z.object({
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema,
			declaring_type_token: managedMetadataTokenSchema.nullable(),
			declaring_type: z.string().nullable(),
			name: z.string(),
			flags: z.int().min(0).max(65535),
			signature: managedSignatureSchema,
			constant: managedFieldConstantSchema.nullable().describe("Field-owned ECMA-335 Constant declaration and decoded default. Null means neither a declaration nor HasDefault was observed.")
		});
		managedExceptionRegionSchema = z.object({
			flags: z.int().min(0).max(4294967295),
			try_offset: z.int().min(0),
			try_length: z.int().min(0),
			handler_offset: z.int().min(0),
			handler_length: z.int().min(0),
			class_token: managedMetadataTokenSchema.nullable().describe("Raw build-local catch type token; not a cross-artifact identity"),
			/** Resolved from this artifact's own metadata; raw token remains build-local. */
			class_type: z.string().nullable(),
			class_type_name_sha256: digestSchema.nullable().describe("Nested nominal TypeDef/TypeRef name digest; assembly scope is compared separately and local tokens are not cross-artifact identities"),
			class_type_identity_resolved: z.boolean().nullable().describe("Whether this artifact's local token identifies the reported catch type; null when unexamined"),
			filter_offset: z.int().min(0).nullable()
		});
		managedInstructionAnchorSchema = z.object({
			il_offset: z.int().min(0),
			opcode: z.string().min(1),
			operand_kind: z.enum([
				"none",
				"branch",
				"constant",
				"field",
				"method",
				"signature",
				"string",
				"switch",
				"token",
				"type",
				"variable",
				"unknown"
			]),
			operand: z.string().nullable()
		});
		managedMethodBodySchema = z.object({
			status: z.enum([
				"present",
				"partial",
				"absent",
				"malformed"
			]),
			header_format: z.enum([
				"tiny",
				"fat",
				"none",
				"unknown"
			]),
			rva: z.int().min(0).max(4294967295),
			file_offset: offsetSchema.nullable(),
			max_stack: z.int().min(0).nullable(),
			init_locals: z.boolean().nullable(),
			local_var_sig_token: managedMetadataTokenSchema.nullable(),
			local_var_signature: z.object({
				raw_sha256: digestSchema,
				has_context_dependent_types: z.boolean()
			}).nullable().describe("Validated LocalVarSig blob facts; null when absent. Named types, modifiers and generic variables require metadata or declaring context; equal raw digests do not establish their cross-artifact type identity."),
			il_size: z.int().min(0),
			il_sha256: digestSchema.nullable().describe("SHA-256 of exactly the raw il_size CIL bytes; excludes the method header, locals signature, alignment, and extra sections"),
			normalized_il_sha256: digestSchema.nullable().describe("Member-result-v1 SHA-256 of UTF-8 JSON [opcode, operand_kind, operand] tuples for a complete decode; retains build-local tokens, omits switch targets, and excludes headers, locals, and exception regions"),
			instruction_count: z.int().min(0),
			decoded_instruction_count: z.int().min(0),
			truncated_instructions: z.int().min(0),
			opcode_counts: z.record(z.string(), z.int().min(1)),
			anchors: z.array(managedInstructionAnchorSchema),
			exception_regions: z.array(managedExceptionRegionSchema),
			issue: z.string().nullable()
		});
		managedMethodSchema = z.object({
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema,
			declaring_type_token: managedMetadataTokenSchema.nullable(),
			declaring_type: z.string().nullable(),
			name: z.string(),
			rva: z.int().min(0).max(4294967295),
			impl_flags: z.int().min(0).max(65535),
			flags: z.int().min(0).max(65535),
			signature: managedSignatureSchema,
			body: managedMethodBodySchema
		});
		declaringTypeNameSchema = z.string().nullable();
		managedMemberReferenceSchema = z.object({
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema,
			parent_token: managedMetadataTokenSchema.nullable(),
			parent_name: declaringTypeNameSchema.describe("Name of a TypeDef, TypeRef, or generic-instantiation TypeSpec parent; null for other parents or when unknown"),
			name: z.string(),
			signature: managedSignatureSchema
		});
		managedUserStringSchema = z.object({
			token: managedMetadataTokenSchema,
			offset: offsetSchema.describe("File offset of the #US item"),
			value: z.string().describe("Decoded UTF-16 code units, excluding the terminal flag byte; unpaired surrogates are kept")
		});
		managedModuleReferenceSchema = z.object({
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema,
			name: z.string()
		});
		managedNativeImportSchema = z.object({
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema,
			mapping_flags: z.int().min(0).max(65535),
			mapping_flags_hex: z.string().regex(/^0x[0-9a-f]{4}$/u),
			member_token: managedMetadataTokenSchema.nullable(),
			member_kind: z.enum([
				"method",
				"field",
				"unknown"
			]),
			member_name: z.string().nullable(),
			import_name: z.string(),
			import_scope_token: managedMetadataTokenSchema.nullable(),
			import_scope_name: z.string().nullable(),
			no_mangle: z.boolean(),
			char_set: z.enum([
				"not-specified",
				"ansi",
				"unicode",
				"auto",
				"unknown"
			]),
			call_convention: z.enum([
				"not-specified",
				"winapi",
				"cdecl",
				"stdcall",
				"thiscall",
				"fastcall",
				"unknown"
			]),
			supports_last_error: z.boolean(),
			best_fit: z.enum([
				"assembly-default",
				"enabled",
				"disabled",
				"unknown"
			]),
			throw_on_unmappable_char: z.enum([
				"assembly-default",
				"enabled",
				"disabled",
				"unknown"
			]),
			verification: z.literal("managed-declaration-only")
		});
		managedNativeImplementationSchema = z.object({
			token: managedMetadataTokenSchema,
			row_offset: offsetSchema,
			name: z.string(),
			rva: z.int().min(0).max(4294967295),
			flags: z.int().min(0).max(65535),
			impl_flags: z.int().min(0).max(65535),
			code_type: z.enum([
				"il",
				"native",
				"optil",
				"runtime",
				"unknown"
			]),
			managed_kind: z.enum([
				"managed",
				"unmanaged",
				"unknown"
			]),
			pinvoke_declared: z.boolean(),
			boundary_kind: z.enum([
				"pinvoke",
				"native-body",
				"runtime-provided",
				"unmanaged-method",
				"mixed-or-unknown"
			]),
			body_interpretation: z.enum([
				"managed-cil",
				"native-or-runtime",
				"not-file-backed",
				"unknown"
			])
		});
		targetRowResolvedSchema = z.boolean().describe("True when the producer resolved the operand to a matching member row with a decoded signature and owner; false means unresolved. Does not establish runtime binding.");
		managedCallEdgeSchema = z.object({
			target_row_resolved: targetRowResolvedSchema,
			caller_token: managedMetadataTokenSchema,
			il_offset: offsetSchema.nullable(),
			target_identity_sha256: digestSchema.nullable().describe("Nominal declaring-type/name/signature digest; null when unresolved. Does not establish assembly or runtime binding."),
			caller: z.string().nullable(),
			opcode: z.string(),
			target_token: managedMetadataTokenSchema,
			target_kind: z.enum([
				"method-def",
				"member-ref",
				"method-spec",
				"unknown"
			]),
			target_name: z.string().nullable().describe("Method name; a method-spec target reports its generic method"),
			target_declaring_type: declaringTypeNameSchema.describe("Declaring type of the called method; null when unknown")
		});
		managedFieldAccessSchema = z.object({
			target_row_resolved: targetRowResolvedSchema,
			method_token: managedMetadataTokenSchema,
			il_offset: offsetSchema.nullable(),
			target_identity_sha256: digestSchema.nullable().describe("Nominal declaring-type/name/signature digest; null when unresolved. Does not establish assembly or runtime binding."),
			method: z.string().nullable(),
			opcode: z.string(),
			field_token: managedMetadataTokenSchema,
			field_name: z.string().nullable(),
			field_declaring_type: declaringTypeNameSchema.describe("Declaring type of the accessed field; null when unknown")
		});
		managedParseIssueSchema = z.object({
			code: z.enum([
				"resource-limit",
				"invalid-cli-header",
				"invalid-directory",
				"invalid-metadata-root",
				"invalid-stream",
				"missing-stream",
				"invalid-tables",
				"unsupported-metadata",
				"invalid-row",
				"invalid-heap-index",
				"invalid-string",
				"invalid-blob",
				"unsupported-signature",
				"invalid-guid",
				"invalid-resource"
			]),
			scope: z.string().min(1),
			offset: offsetSchema.nullable(),
			detail: z.string().min(1),
			/** The request parameter that bounded a resource-limit issue. */
			limit: analysisParameterLimitSchema.exactOptional()
		});
		managedArtifactInspectionSchema = z.object({
			artifact: managedArtifactReferenceSchema,
			pe: z.object({
				machine: z.int().min(0).max(65535),
				machine_hex: z.string().regex(/^0x[0-9a-f]{4}$/u),
				architecture: z.enum([
					"x86",
					"x86_64",
					"arm",
					"arm64"
				]),
				optional_header: z.enum(["pe32", "pe32-plus"]),
				section_count: z.int().min(1).max(65535),
				characteristics: z.int().min(0).max(65535),
				cli: z.object({
					header_offset: offsetSchema,
					header_size: z.int().min(72),
					runtime_version: z.string(),
					flags: z.int().min(0).max(4294967295),
					flag_names: z.array(z.string()),
					entry_point: z.object({
						kind: z.enum([
							"metadata-token",
							"native-rva",
							"none"
						]),
						value: z.string().nullable()
					}),
					metadata_rva: z.int().min(1).max(4294967295),
					metadata_size: z.int().min(1).max(4294967295),
					resources_rva: z.int().min(0).max(4294967295),
					resources_size: z.int().min(0).max(4294967295),
					strong_name_rva: z.int().min(0).max(4294967295),
					strong_name_size: z.int().min(0).max(4294967295),
					managed_native_header_rva: z.int().min(0).max(4294967295),
					managed_native_header_size: z.int().min(0).max(4294967295),
					ready_to_run_signature: z.boolean()
				}).nullable()
			}),
			classification: z.object({
				status: z.enum([
					"managed",
					"not-managed",
					"malformed"
				]),
				container: z.literal("pe"),
				runtime_family: z.enum([
					"dotnet-framework",
					"modern-dotnet",
					"unity-mono",
					"mixed-clr-native",
					"unknown"
				]),
				implementation: z.enum([
					"cil",
					"cil-and-ready-to-run",
					"cpp-cli-mixed",
					"metadata-only",
					"not-managed",
					"unknown"
				]),
				managed_architecture: z.enum([
					"anycpu",
					"anycpu-prefer-32",
					"x86",
					"x86_64",
					"arm",
					"arm64",
					"unknown"
				]),
				evidence: z.array(z.object({
					code: z.string().min(1),
					detail: z.string().min(1),
					file_offset: offsetSchema.nullable()
				}))
			}),
			metadata: managedMetadataSummarySchema.extend({ stream_names: z.array(z.string()) }),
			module: moduleIdentitySchema.nullable(),
			assembly: assemblyIdentitySchema.nullable(),
			target_frameworks: z.array(z.string()),
			references: z.array(assemblyReferenceSchema),
			resources: z.array(managedResourceSchema),
			attributes: z.array(customAttributeSchema),
			coverage: z.object({
				state: managedInspectionStateSchema,
				issues: z.array(managedParseIssueSchema)
			}),
			limitations: z.array(z.string())
		});
		UNEXAMINED_MEMBER_COLLECTIONS = [
			"fields",
			"methods",
			"member_refs",
			"call_edges",
			"field_accesses"
		];
		managedMemberInspectionSchema = z.object({
			signature_resolution: z.enum(["type-names-v2"]).nullable().describe("Signature type-name resolution was examined, including unresolved operands, and readable operand names are rendered; null means member decoding exceeded capacity and no members were examined."),
			artifact: managedArtifactReferenceSchema,
			module: moduleIdentitySchema.nullable(),
			assembly: assemblyIdentitySchema.nullable(),
			metadata: managedMetadataSummarySchema,
			identity_scope: managedTokenIdentityScopeSchema,
			types: z.array(managedTypeSchema),
			nesting_read: z.boolean().describe("Whether all NestedClass rows were read and valid; false means nesting is incomplete. Individual name digests can remain unresolved for missing, cyclic or over-deep enclosing chains."),
			exported_types: z.array(managedExportedTypeSchema).nullable(),
			fields: z.array(managedFieldSchema),
			methods: z.array(managedMethodSchema),
			member_refs: z.array(managedMemberReferenceSchema),
			call_edges: z.array(managedCallEdgeSchema),
			field_accesses: z.array(managedFieldAccessSchema),
			user_strings: z.object({
				state: knownCoverageStatusSchema,
				literals: z.array(managedUserStringSchema),
				issues: z.array(managedParseIssueSchema)
			}).nullable(),
			/** Caller-selected declaring types; null when every type was inspected. */
			selection: z.object({
				type_names: z.array(z.string().min(1)).min(1),
				unmatched_type_names: z.array(z.string().min(1))
			}).nullable(),
			method_rows: z.object({
				offset: z.int().nonnegative(),
				count: z.int().nonnegative(),
				total: z.int().nonnegative()
			}).nullable().describe("Examined zero-based MethodDef row interval before declaring-type selection; null means the row scope was not recorded. Row coordinates are build-local and cannot prove cross-build member absence for a page."),
			unresolved_definitions: unresolvedDefinitionsSchema.exactOptional().describe("Checked build-local TypeDef and MethodDef rows whose names could not be established. Omitted when the inspection did not record this projection."),
			coverage: z.object({
				state: managedInspectionStateSchema,
				issues: z.array(managedParseIssueSchema)
			}),
			limitations: z.array(z.string())
		}).superRefine((result, context) => {
			validateUnresolvedDefinitions(result, context);
			if (result.signature_resolution !== null) return;
			for (const key of UNEXAMINED_MEMBER_COLLECTIONS) if (result[key].length > 0) context.addIssue({
				code: "custom",
				path: [key],
				message: "Members require signature_resolution; null resolution means no members were examined."
			});
		});
		managedNativeBoundaryInspectionSchema = z.object({
			artifact: managedArtifactReferenceSchema,
			module: moduleIdentitySchema.nullable(),
			metadata: managedMetadataSummarySchema,
			identity_scope: managedTokenIdentityScopeSchema,
			cli_native: z.object({
				il_only: z.boolean(),
				requires_32bit: z.boolean(),
				strong_name_signed: z.boolean(),
				native_entry_point: z.boolean(),
				ready_to_run_signature: z.boolean(),
				managed_native_header_rva: z.int().min(0).max(4294967295),
				managed_native_header_size: z.int().min(0).max(4294967295)
			}).nullable(),
			module_refs: z.array(managedModuleReferenceSchema),
			pinvoke_imports: z.array(managedNativeImportSchema),
			native_implementations: z.array(managedNativeImplementationSchema),
			summary: z.object({
				module_ref_count: z.int().min(0),
				pinvoke_import_count: z.int().min(0),
				native_implementation_count: z.int().min(0),
				ready_to_run: z.boolean().nullable(),
				mixed_mode_or_native_header: z.boolean().nullable()
			}),
			coverage: z.object({
				state: managedInspectionStateSchema,
				issues: z.array(managedParseIssueSchema)
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/managed/managedModuleIdentity.js
var managedModuleRow;
function init_managedModuleIdentity() {
	return (init_managedModuleIdentity = __esmMin((() => {
		managedModuleRow = (result) => result.module ?? result.metadata?.unresolved_module_name ?? null;
	})))();
}

//#endregion
//#region dist/domain/managed/managedInspectionEvidence.js
var managedTokenScopesMatch, readManagedInspectionEvidence, validateManagedTokenScope, integrityFailure;
function init_managedInspectionEvidence() {
	return (init_managedInspectionEvidence = __esmMin((() => {
		init_evidence();
		init_analysisErrorCore();
		init_evidenceErrors();
		init_evidenceValidation();
		init_result();
		init_managedModuleIdentity();
		managedTokenScopesMatch = (leftMvid, rightMvid) => leftMvid !== null && rightMvid !== null && leftMvid.toLowerCase() === rightMvid.toLowerCase();
		readManagedInspectionEvidence = (rawEvidence, operation, schema, selection) => {
			const record = readEvidence(rawEvidence);
			if (!record.ok) return record;
			const evidence = record.value;
			if (evidence.operation !== operation || evidence.predicate_type !== "rea.analysis") {
				const message = `Expected rea.analysis ${operation} Evidence, received ${evidence.predicate_type} ${evidence.operation}`;
				return err(new AnalysisInputError(selection.operation, { userMessage: message }, [{
					path: selection.path,
					reason: "invalid_value",
					message
				}]));
			}
			const payload = readEvidencePayload(schema, evidence.normalized_result, { within: ["normalized_result"] });
			if (!payload.ok) return payload;
			const result = payload.value;
			const artifactSha256 = result.artifact.sha256;
			const subjectSha256 = evidenceFileTarget(evidence)?.sha256;
			if (subjectSha256 !== undefined && artifactSha256 !== subjectSha256) return err(integrityFailure(`Managed Evidence ${operation} (${evidence.evidence_id}) subject SHA-256 ${subjectSha256} does not match normalized artifact SHA-256 ${artifactSha256}`));
			const scope = validateManagedTokenScope(result, operation, evidence.evidence_id);
			if (!scope.ok) return scope;
			return ok({
				evidence,
				result
			});
		};
		validateManagedTokenScope = (result, operation, evidenceId) => {
			const artifactSha256 = result.artifact.sha256;
			const scope = result.identity_scope;
			if (scope !== undefined && scope.requires_artifact_sha256 !== artifactSha256) return err(integrityFailure(`Managed Evidence ${operation} (${evidenceId}) token scope SHA-256 ${scope.requires_artifact_sha256} does not match normalized artifact SHA-256 ${artifactSha256}`));
			const metadata = result.metadata;
			if (metadata?.unresolved_module_name !== undefined && (result.module != null || metadata.table_row_counts.Module !== 1 || metadata.status !== "partial")) return err(integrityFailure(`Managed Evidence ${operation} (${evidenceId}) has conflicting Module identity or coverage for an unresolved name`));
			const moduleMvid = managedModuleRow(result)?.mvid ?? null;
			const scopedMvid = scope?.requires_mvid;
			if (scopedMvid !== undefined && scopedMvid?.toLowerCase() !== moduleMvid?.toLowerCase()) return err(integrityFailure(`Managed Evidence ${operation} (${evidenceId}) token scope MVID ${String(scopedMvid)} does not match module MVID ${String(moduleMvid)}`));
			return ok(undefined);
		};
		integrityFailure = (message) => new EvidenceIntegrityError(message, { userMessage: message });
	})))();
}

//#endregion
export { ManagedHeapAmbiguityFailure, ManagedReaderFailure, appendManagedParseIssues, cliMetadataGuidSchema, init_managedArtifact, init_managedInspectionEvidence, init_managedModuleIdentity, init_managedReaderFailure, init_managedUnresolvedDefinitions, managedArtifactInspectionSchema, managedFailure, managedInspectionCoverage, managedInspectionInputFailure, managedInspectionStateSchema, managedMemberInspectionSchema, managedMetadataFailureStatus, managedMetadataStatusSchema, managedMetadataTokenSchema, managedModuleRow, managedNativeBoundaryInspectionSchema, managedNativeImportSchema, managedTokenScopesMatch, readDefinitionField, readManagedInspectionEvidence, readManagedValue, uniqueManagedParseIssues, unresolvedDefinitionSchema, validateManagedTokenScope };