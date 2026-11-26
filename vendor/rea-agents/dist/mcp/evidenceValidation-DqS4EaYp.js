import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { K as EvidenceIntegrityError, Y as init_evidenceErrors } from "./canonicalDigest-DUQN3Yyz.js";
import { _ as init_evidence, dt as init_evidenceFormat, ft as isUnsupportedEvidenceFormat, g as immutableEvidence, y as parseEvidence } from "./evidence-z4eWkAQk.js";
import { n as firstValidationIssue, r as init_validationFailure, t as describeValidationFailure } from "./validationFailure-BsW48uDn.js";
import { z } from "zod";

//#region dist/domain/evidenceInputContract.js
var declarations, referenceAlternatives, borrowedDeclarations, isDeclaredEvidenceInput, declareEvidenceInput, declareEvidenceReferenceAlternative, declareBorrowedEvidenceInput, contracts, identity, getEvidenceInputContract, compile, replaceWrappedSchema, objectContract, arrayContract, unionContract;
function init_evidenceInputContract() {
	return (init_evidenceInputContract = __esmMin((() => {
		init_result();
		declarations = z.registry();
		referenceAlternatives = z.registry();
		borrowedDeclarations = new WeakMap();
		isDeclaredEvidenceInput = (schema) => declarations.get(schema) !== undefined;
		declareEvidenceInput = (schema) => {
			declarations.add(schema, { kind: "evidence" });
			return schema;
		};
		declareEvidenceReferenceAlternative = (schema) => {
			referenceAlternatives.add(schema, { retained: true });
			return schema;
		};
		declareBorrowedEvidenceInput = (schema, declaration) => {
			const owner = {};
			borrowedDeclarations.set(owner, declaration);
			declarations.add(schema, {
				kind: "borrowed",
				owner
			});
			return schema;
		};
		contracts = new WeakMap();
		identity = (schema, hasEvidenceReferenceAlternative = false) => ({
			frameSchema: schema,
			hasEvidence: false,
			hasEvidenceReferenceAlternative,
			resolve: (input) => ok(input)
		});
		getEvidenceInputContract = (schema) => {
			const existing = contracts.get(schema);
			if (existing !== undefined) return existing;
			const result = compile(schema);
			contracts.set(schema, result);
			return result;
		};
		compile = (schema) => {
			if (referenceAlternatives.get(schema) !== undefined) return identity(schema, true);
			const declared = declarations.get(schema);
			if (declared?.kind === "evidence") return {
				frameSchema: z.unknown().nonoptional(),
				hasEvidence: true,
				hasEvidenceReferenceAlternative: true,
				resolve: (input, visit, path = []) => visit(input, path)
			};
			if (declared?.kind === "borrowed") {
				const declaration = borrowedDeclarations.get(declared.owner);
				if (declaration === undefined) throw new TypeError("Borrowed Evidence schema has no owning declaration");
				const source = getEvidenceInputContract(declaration);
				return {
					...source,
					frameSchema: schema
				};
			}
			if (schema instanceof z.ZodObject) return objectContract(schema);
			if (schema instanceof z.ZodArray) return arrayContract(schema);
			if (schema instanceof z.ZodUnion) return unionContract(schema);
			if (schema instanceof z.ZodOptional || schema instanceof z.ZodExactOptional || schema instanceof z.ZodNullable || schema instanceof z.ZodDefault || schema instanceof z.ZodPrefault || schema instanceof z.ZodNonOptional || schema instanceof z.ZodReadonly) {
				const child = getEvidenceInputContract(schema.unwrap());
				if (!child.hasEvidence) return identity(schema, child.hasEvidenceReferenceAlternative);
				return {
					hasEvidence: true,
					hasEvidenceReferenceAlternative: child.hasEvidenceReferenceAlternative,
					frameSchema: replaceWrappedSchema(schema, child.frameSchema),
					resolve: (input, visit, path = []) => input === undefined || input === null && schema instanceof z.ZodNullable ? ok(input) : child.resolve(input, visit, path)
				};
			}
			return identity(schema);
		};
		replaceWrappedSchema = (schema, innerType) => {
			const definition = {
				...schema.def,
				innerType
			};
			return z.clone(schema, definition, { parent: true });
		};
		objectContract = (schema) => {
			const children = Object.entries(schema.shape).map(([key, child]) => [key, getEvidenceInputContract(child)]);
			const selected = children.filter(([, child]) => child.hasEvidence);
			const hasEvidenceReferenceAlternative = children.some(([, child]) => child.hasEvidenceReferenceAlternative);
			if (selected.length === 0) return identity(schema, hasEvidenceReferenceAlternative);
			return {
				hasEvidence: true,
				hasEvidenceReferenceAlternative,
				frameSchema: schema.clone({
					...schema.def,
					shape: Object.fromEntries(children.map(([key, child]) => [key, child.frameSchema]))
				}, { parent: true }),
				resolve: (input, visit, path = []) => {
					if (typeof input !== "object" || input === null || Array.isArray(input)) return ok(input);
					let result = input;
					for (const [key, child] of selected) {
						if (!Object.hasOwn(result, key)) continue;
						const value = child.resolve(result[key], visit, [...path, key]);
						if (!value.ok) return value;
						if (value.value !== result[key]) result = {
							...result,
							[key]: value.value
						};
					}
					return ok(result);
				}
			};
		};
		arrayContract = (schema) => {
			const child = getEvidenceInputContract(schema.element);
			if (!child.hasEvidence) return identity(schema, child.hasEvidenceReferenceAlternative);
			return {
				hasEvidence: true,
				hasEvidenceReferenceAlternative: child.hasEvidenceReferenceAlternative,
				frameSchema: schema.clone({
					...schema.def,
					element: child.frameSchema
				}, { parent: true }),
				resolve: (input, visit, path = []) => {
					if (!Array.isArray(input)) return ok(input);
					let result = input;
					for (const [index, item] of input.entries()) {
						const value = child.resolve(item, visit, [...path, index]);
						if (!value.ok) return value;
						if (value.value !== item) {
							if (result === input) result = input.slice();
							result[index] = value.value;
						}
					}
					return ok(result);
				}
			};
		};
		unionContract = (schema) => {
			const options = schema.options.map((option) => getEvidenceInputContract(option));
			const hasEvidenceReferenceAlternative = options.some((option) => option.hasEvidenceReferenceAlternative);
			if (!options.some((option) => option.hasEvidence)) return identity(schema, hasEvidenceReferenceAlternative);
			const branches = new WeakMap();
			const frame = z.union(options.map((option) => option.frameSchema.transform((value) => {
				if (typeof value === "object" && value !== null) branches.set(value, option);
				return value;
			})));
			return {
				hasEvidence: true,
				hasEvidenceReferenceAlternative,
				frameSchema: frame.clone({
					...frame.def,
					...schema.def.error === undefined ? {} : { error: schema.def.error },
					...schema.def.checks === undefined ? {} : { checks: schema.def.checks }
				}),
				resolve: (input, visit, path = []) => {
					const selected = typeof input === "object" && input !== null ? branches.get(input) : undefined;
					return selected?.resolve(input, visit, path) ?? ok(input);
				}
			};
		};
	})))();
}

//#endregion
//#region dist/domain/evidenceValidation.js
var safeParseEvidence, safeParseImmutableEvidence, recognizeEvidence, unsupportedEvidenceFormatError, readEvidence, readImmutableEvidence, authenticateEvidence, readEvidencePayload, validationIssueOptions, integrityFailure;
function init_evidenceValidation() {
	return (init_evidenceValidation = __esmMin((() => {
		init_evidence();
		init_evidenceErrors();
		init_evidenceFormat();
		init_validationFailure();
		init_result();
		safeParseEvidence = (input) => authenticateEvidence(input, parseEvidence);
		safeParseImmutableEvidence = (input) => authenticateEvidence(input, immutableEvidence);
		recognizeEvidence = (input) => typeof input === "object" && input !== null && "evidence_id" in input ? readEvidence(input) : ok(undefined);
		unsupportedEvidenceFormatError = (cause, side) => new EvidenceIntegrityError(cause.message, {
			cause,
			userMessage: cause.message,
			...side === undefined ? {} : { side }
		});
		readEvidence = (input, location) => {
			const parsed = safeParseEvidence(input);
			return parsed.ok ? parsed : err(integrityFailure(parsed.error, {
				...location,
				within: []
			}));
		};
		readImmutableEvidence = (input) => {
			const parsed = safeParseImmutableEvidence(input);
			return parsed.ok ? parsed : err(integrityFailure(parsed.error, { within: [] }));
		};
		authenticateEvidence = (input, parse) => {
			try {
				return ok(parse(input));
			} catch (cause) {
				if (cause instanceof z.ZodError || isUnsupportedEvidenceFormat(cause)) return err(cause);
				throw cause;
			}
		};
		readEvidencePayload = (schema, input, location) => {
			const parsed = schema.safeParse(input);
			return parsed.success ? ok(parsed.data) : err(integrityFailure(parsed.error, location));
		};
		validationIssueOptions = (cause, within) => {
			const issue = firstValidationIssue(cause);
			if (issue === undefined) return {};
			return {
				...within === undefined ? {} : { issuePath: [...within, ...issue.path] },
				...issue.constraint === undefined ? {} : { constraint: issue.constraint },
				remainingIssueCount: issue.remainingIssueCount
			};
		};
		integrityFailure = (cause, location) => {
			if (isUnsupportedEvidenceFormat(cause)) return unsupportedEvidenceFormatError(cause, location?.side);
			const message = `Evidence validation failed ${describeValidationFailure(cause)}`;
			return new EvidenceIntegrityError(message, {
				cause,
				userMessage: message,
				...location?.side === undefined ? {} : { side: location.side },
				...validationIssueOptions(cause, location?.within)
			});
		};
	})))();
}

//#endregion
export { recognizeEvidence as a, unsupportedEvidenceFormatError as c, declareEvidenceInput as d, declareEvidenceReferenceAlternative as f, readImmutableEvidence as i, validationIssueOptions as l, init_evidenceInputContract as m, readEvidence as n, safeParseEvidence as o, getEvidenceInputContract as p, readEvidencePayload as r, safeParseImmutableEvidence as s, init_evidenceValidation as t, declareBorrowedEvidenceInput as u };