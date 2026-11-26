import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_isRecord, init_schemaAnnotations, isRecord, schemaAnnotations } from "./jsonSerialization-DAF9DVXC.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { JsonSchemaReferences, advertisedSchemaPatterns, init_advertisedDialect, init_jsonSchemaKeywords, init_jsonSchemaReferences, schemaArrays, schemaChildren, schemaLiteralValues, schemaMaps, schemaPointerSteps, schemaSubschemas } from "./advertisedDialect-nPNOAZyy.js";
import { evidenceSchema, getEvidenceInputContract, init_evidence, init_evidenceInputContract } from "./nativeValueFlow-13oOEkkJ.js";
import { init_portablePattern, projectPortablePattern } from "./advertisedTool-ByKiy8tg.js";
import { z } from "zod";
import { isDeepStrictEqual } from "node:util";

//#region dist/contracts/advertisedInputExamples.js
var evidenceRecordId, referenceEmbeddedEvidence, advertisedInputExamples;
function init_advertisedInputExamples() {
	return (init_advertisedInputExamples = __esmMin((() => {
		init_evidence();
		evidenceRecordId = (value) => typeof value.evidence_id === "string" && Object.hasOwn(value, "normalized_result") && evidenceSchema.safeParse(value).success ? value.evidence_id : undefined;
		referenceEmbeddedEvidence = (value) => {
			if (Array.isArray(value)) {
				const items = value.map(referenceEmbeddedEvidence);
				return {
					value: items.map((item) => item.value),
					embedsEvidence: items.some((item) => item.embedsEvidence)
				};
			}
			if (value === null || typeof value !== "object") return {
				value,
				embedsEvidence: false
			};
			const evidenceId = evidenceRecordId(value);
			if (evidenceId !== undefined) return {
				value: {
					kind: "retained-evidence",
					evidence_id: evidenceId
				},
				embedsEvidence: true
			};
			const entries = Object.entries(value).map(([key, child]) => [key, referenceEmbeddedEvidence(child)]);
			return {
				value: Object.fromEntries(entries.map(([key, child]) => [key, child.value])),
				embedsEvidence: entries.some(([, child]) => child.embedsEvidence)
			};
		};
		advertisedInputExamples = (contract) => {
			const advertised = new Map();
			for (const { input } of contract.examples) {
				const projection = referenceEmbeddedEvidence(input);
				if (projection.embedsEvidence && !contract.inputSchema.safeParse(projection.value).success) continue;
				advertised.set(JSON.stringify(projection.value), projection.value);
			}
			return [...advertised.values()];
		};
	})))();
}

//#endregion
//#region dist/contracts/inputSchemaPresentation.js
var referencedDescription, describeSchema, objectBranch, requiredProperties, sharedRequiredProperties, inputGroup, isObjectKeyword, isArrayKeyword, isChildKeyword, omitNestedDefaults, referencedDefaultPaths, flattenRootObjectUnion, presentDiscriminatedRoot, presentInputJsonSchema;
function init_inputSchemaPresentation() {
	return (init_inputSchemaPresentation = __esmMin((() => {
		init_jsonSchemaReferences();
		init_jsonSchemaKeywords();
		referencedDescription = (references, schema, inherited) => {
			let value = schema;
			let scope = inherited;
			const active = new Set();
			while (isRecord(value)) {
				scope = references.enter(value, scope);
				if (typeof value.description === "string" && (typeof value.$ref !== "string" || scope?.dialect !== "draft-07")) return value.description;
				if (typeof value.$ref !== "string" || active.has(value)) return undefined;
				active.add(value);
				const target = references.resolve(scope, value.$ref);
				if (target.kind !== "target") return undefined;
				value = target.value;
			}
			return undefined;
		};
		describeSchema = (schema, references, inherited, describeProperty, propertyDescription) => {
			if (!isRecord(schema)) return schema;
			const scope = references.enter(schema, inherited);
			const described = Object.fromEntries(Object.entries(schema).map(([key, value]) => {
				if (schemaMaps.has(key) && isRecord(value)) return [key, Object.fromEntries(Object.entries(value).map(([name, child]) => {
					const description = key === "properties" && isRecord(child) ? referencedDescription(references, child, scope) ?? describeProperty(name) : undefined;
					return [name, describeSchema(child, references, scope, describeProperty, description)];
				}))];
				if (schemaArrays.has(key) && Array.isArray(value)) return [key, value.map((child) => describeSchema(child, references, scope, describeProperty))];
				if (schemaChildren.has(key)) return [key, Array.isArray(value) ? value.map((child) => describeSchema(child, references, scope, describeProperty)) : describeSchema(value, references, scope, describeProperty)];
				return [key, value];
			}));
			return propertyDescription === undefined ? described : {
				...described,
				description: propertyDescription
			};
		};
		objectBranch = (references, branch) => {
			let resolved = branch;
			if (isRecord(branch) && typeof branch.$ref === "string") {
				if (Object.keys(branch).length !== 1) return undefined;
				const target = references.resolve(references.rootScope, branch.$ref);
				if (target.kind !== "target") return undefined;
				resolved = target.value;
			}
			return isRecord(resolved) && references.enter(resolved, references.rootScope) === references.rootScope && ![
				"$id",
				"$schema",
				"$anchor",
				"$dynamicAnchor",
				"$recursiveAnchor",
				"$dynamicRef",
				"$recursiveRef"
			].some((key) => Object.hasOwn(resolved, key)) && resolved.type === "object" && isRecord(resolved.properties) ? resolved : undefined;
		};
		requiredProperties = (branch) => Array.isArray(branch.required) ? branch.required.filter((name) => typeof name === "string") : [];
		sharedRequiredProperties = (branches) => {
			const [first = [], ...others] = branches.map(requiredProperties);
			return first.filter((name) => others.every((names) => names.includes(name)));
		};
		inputGroup = (branch) => {
			const required = requiredProperties(branch);
			const optional = Object.keys(branch.properties ?? {}).filter((name) => !required.includes(name)).map((name) => `[${name}]`);
			return [...required, ...optional].join(" + ");
		};
		isObjectKeyword = (key) => schemaMaps.has(key);
		isArrayKeyword = (key) => schemaArrays.has(key);
		isChildKeyword = (key) => schemaChildren.has(key);
		omitNestedDefaults = (schema, kept = new Set(), path = []) => {
			if (Array.isArray(schema)) return schema.map((child, index) => omitNestedDefaults(child, kept, [...path, String(index)]));
			if (!isRecord(schema)) return schema;
			return Object.fromEntries(Object.entries(schema).flatMap(([key, value]) => {
				const childPath = [...path, key];
				if (kept.has(JSON.stringify(childPath))) return [[key, value]];
				if (key === "default") return [];
				return [[key, isObjectKeyword(key) && isRecord(value) ? Object.fromEntries(Object.entries(value).map(([name, child]) => [name, omitNestedDefaults(child, kept, [...childPath, name])])) : isArrayKeyword(key) && Array.isArray(value) ? value.map((child, index) => omitNestedDefaults(child, kept, [...childPath, String(index)])) : isChildKeyword(key) ? Array.isArray(value) ? value.map((child, index) => omitNestedDefaults(child, kept, [...childPath, String(index)])) : omitNestedDefaults(value, kept, childPath) : value]];
			}));
		};
		referencedDefaultPaths = (schema) => {
			const kept = new Set();
			for (const { target } of new JsonSchemaReferences(schema).references()) {
				if (target.kind !== "target") continue;
				const steps = schemaPointerSteps(target.path);
				const last = steps.at(-1);
				if (last?.kind !== "value" || last.keyword !== "default") continue;
				kept.add(JSON.stringify(target.path.slice(0, steps.length)));
			}
			return kept;
		};
		flattenRootObjectUnion = (root, references) => {
			const { anyOf, oneOf, ...rest } = root;
			const alternatives = Array.isArray(anyOf) ? anyOf : oneOf;
			if (!Array.isArray(alternatives) || alternatives.length === 0 || root.properties !== undefined) return root;
			for (const { scope, target } of references.references()) if (target.kind === "unresolved" && target.reason === "dynamic" || scope === references.rootScope && (target.kind !== "target" || target.path.length === 0 || target.path[0] === "anyOf" || target.path[0] === "oneOf")) return root;
			const branches = alternatives.map((branch) => objectBranch(references, branch));
			if (!branches.every((branch) => branch !== undefined)) return root;
			const variants = new Map();
			for (const branch of branches) for (const [name, schema] of Object.entries(branch.properties ?? {})) {
				const known = variants.get(name) ?? [];
				if (!known.some((seen) => isDeepStrictEqual(seen, schema))) known.push(schema);
				variants.set(name, known);
			}
			const required = sharedRequiredProperties(branches);
			for (const [name, schemas] of variants) {
				const properties = branches.map((branch) => isRecord(branch.properties) ? branch.properties[name] : undefined);
				const ownedByEveryGroup = properties.every(isRecord);
				const defaults = properties.map((property) => isRecord(property) ? property.default : undefined);
				if (defaults.every((value) => value !== undefined && isDeepStrictEqual(value, defaults[0]))) continue;
				const withoutDefaults = [];
				for (const schema of schemas) {
					const withoutDefault = ownedByEveryGroup ? isRecord(schema) && Object.hasOwn(schema, "default") ? Object.fromEntries(Object.entries(schema).filter(([key]) => key !== "default")) : schema : omitNestedDefaults(schema, isRecord(schema) ? referencedDefaultPaths(schema) : new Set());
					if (!withoutDefaults.some((known) => isDeepStrictEqual(known, withoutDefault))) withoutDefaults.push(withoutDefault);
				}
				variants.set(name, withoutDefaults);
			}
			const fewestRequired = Math.min(...branches.map((branch) => requiredProperties(branch).length));
			const groups = [...new Set(branches.map(inputGroup))];
			const description = [typeof rest.description === "string" ? rest.description : undefined, groups.length > 1 ? `Provide a complete input group: ${groups.join("; ")}.` : undefined].filter((text) => text !== undefined);
			const { dependencies: _dependencies, dependentRequired: _dependentRequired, ...presentation } = rest;
			return {
				...presentation,
				type: "object",
				...description.length > 0 ? { description: description.join(" ") } : {},
				properties: Object.fromEntries([...variants].map(([name, schemas]) => [name, schemas.length === 1 ? schemas[0] : { anyOf: schemas }])),
				...required.length > 0 ? { required } : {},
				...fewestRequired > 0 ? { minProperties: fewestRequired } : {},
				...branches.every((branch) => branch.additionalProperties === false) ? { additionalProperties: false } : {}
			};
		};
		presentDiscriminatedRoot = (canonical, discriminator) => {
			const references = new JsonSchemaReferences(canonical);
			const flattened = flattenRootObjectUnion(canonical, references);
			if (discriminator === undefined || flattened === canonical) return flattened;
			const alternatives = canonical.anyOf ?? canonical.oneOf;
			if (!Array.isArray(alternatives) || alternatives.length !== 2) throw new TypeError("A presented root discriminator requires two object alternatives");
			const branches = alternatives.map((alternative) => {
				const branch = objectBranch(references, alternative);
				if (branch === undefined || branch.additionalProperties !== false) throw new TypeError("A presented root discriminator requires strict objects");
				return branch;
			});
			const requiredBranch = branches.find((branch) => requiredProperties(branch).includes(discriminator));
			const fallback = branches.find((branch) => !requiredProperties(branch).includes(discriminator));
			const literal = (branch) => {
				const properties = branch?.properties;
				const schema = isRecord(properties) ? properties[discriminator] : undefined;
				return isRecord(schema) ? schema.const : undefined;
			};
			const selected = literal(requiredBranch), otherwise = literal(fallback);
			if (requiredBranch === undefined || fallback === undefined || typeof selected !== "string" || typeof otherwise !== "string" || selected === otherwise) throw new TypeError("A presented root discriminator requires distinct literals and one default alternative");
			const properties = Object.fromEntries(Object.entries(isRecord(flattened.properties) ? flattened.properties : {}).map(([key, schema]) => {
				if (!isRecord(schema) || !Array.isArray(schema.anyOf)) return [key, schema];
				const possible = schema.anyOf.filter((alternative) => alternative !== false && !(isRecord(alternative) && isRecord(alternative.not) && Object.keys(alternative.not).length === 0));
				return [key, possible.length === 1 ? possible[0] : schema];
			}));
			const commonRequired = new Set(requiredProperties(flattened));
			const constraints = (branch) => {
				const own = isRecord(branch.properties) ? branch.properties : {};
				const differences = Object.fromEntries(Object.entries(properties).flatMap(([key, schema]) => {
					if (key === discriminator || isDeepStrictEqual(schema, own[key])) return [];
					return [[key, Object.hasOwn(own, key) ? own[key] : false]];
				}));
				const required = requiredProperties(branch).filter((key) => !commonRequired.has(key));
				return {
					...Object.keys(differences).length === 0 ? {} : { properties: differences },
					...required.length === 0 ? {} : { required }
				};
			};
			const { description: _description, ...presentation } = flattened;
			return {
				...presentation,
				properties,
				...canonical.description === undefined ? {} : { description: canonical.description },
				if: {
					properties: { [discriminator]: { const: selected } },
					required: [discriminator]
				},
				then: constraints(requiredBranch),
				else: constraints(fallback)
			};
		};
		presentInputJsonSchema = (root, describeProperty, annotations = {}) => {
			const flattened = presentDiscriminatedRoot(root, annotations.rootDiscriminator);
			const references = new JsonSchemaReferences(flattened);
			const described = describeSchema(flattened, references, references.rootScope, describeProperty);
			return isRecord(described) ? { ...described } : flattened;
		};
	})))();
}

//#endregion
//#region dist/contracts/outputSchemaPresentation.js
var hasReference, hasWidenedPattern, REMOVABLE_KEYWORDS, DRAFT07_REDUCED_REFERENCE_KEYS, throughRemovableLocation, normalizationContext, normalizeAdvertisedSchema, presentOutputJsonSchema, hasLiteralReference, replaceExactPatterns;
function init_outputSchemaPresentation() {
	return (init_outputSchemaPresentation = __esmMin((() => {
		init_jsonSchemaReferences();
		init_advertisedDialect();
		init_portablePattern();
		init_jsonSchemaKeywords();
		hasReference = (schema) => [
			"$ref",
			"$dynamicRef",
			"$recursiveRef"
		].some((keyword) => typeof schema[keyword] === "string");
		hasWidenedPattern = (schema) => typeof schema.pattern === "string" && projectPortablePattern(schema.pattern).kind !== "exact";
		REMOVABLE_KEYWORDS = new Set([
			"oneOf",
			"not",
			"if",
			"then",
			"else",
			"unevaluatedProperties",
			"unevaluatedItems"
		]);
		DRAFT07_REDUCED_REFERENCE_KEYS = new Set([
			"$id",
			"$schema",
			"$anchor",
			"$defs",
			"definitions",
			"description",
			"title",
			"default",
			"examples",
			"$comment"
		]);
		throughRemovableLocation = (root, path, draft07) => {
			let value = root;
			for (const [index, step] of schemaPointerSteps(path).entries()) {
				if (draft07 && step.kind !== "entry" && isRecord(value) && hasReference(value) && !DRAFT07_REDUCED_REFERENCE_KEYS.has(step.keyword)) return true;
				if (step.kind === "keyword" && REMOVABLE_KEYWORDS.has(step.keyword)) return true;
				value = typeof value === "object" && value !== null ? Reflect.get(value, path[index]) : undefined;
			}
			return false;
		};
		normalizationContext = (root) => {
			const references = new JsonSchemaReferences(root);
			const sites = new Map();
			const pending = [{
				schema: root,
				scope: references.rootScope
			}];
			const entries = [];
			while (pending.length > 0) {
				const entry = pending.pop();
				if (!isRecord(entry.schema)) continue;
				const scope = references.enter(entry.schema, entry.scope);
				let seen = sites.get(scope);
				if (seen === undefined) sites.set(scope, seen = new WeakSet());
				if (seen.has(entry.schema)) continue;
				seen.add(entry.schema);
				entries.push({
					schema: entry.schema,
					scope
				});
				for (const schema of schemaSubschemas(entry.schema, { includeDefinitions: true })) pending.push({
					schema,
					scope
				});
			}
			const indexed = new Map();
			const work = [];
			const changed = [];
			const untracked = [];
			const factAt = (schema, inherited) => {
				if (!isRecord(schema)) return undefined;
				const scope = references.enter(schema, inherited);
				let facts = indexed.get(scope);
				if (facts === undefined) indexed.set(scope, facts = new WeakMap());
				const existing = facts.get(schema);
				if (existing !== undefined) return existing;
				const fact = {
					changed: false,
					lostEvaluation: false,
					dependents: new Set(),
					evaluationDependents: new Set()
				};
				facts.set(schema, fact);
				work.push({
					schema,
					scope,
					fact
				});
				return fact;
			};
			for (const { schema, scope } of entries) factAt(schema, scope);
			for (let index = 0; index < work.length; index++) {
				const { schema, scope, fact } = work[index];
				const ignoresSiblings = scope?.dialect === "draft-07" && typeof schema.$ref === "string";
				const projection = typeof schema.pattern === "string" ? projectPortablePattern(schema.pattern) : undefined;
				const opaquePatternChanged = !sites.get(scope)?.has(schema) && projection !== undefined && (projection.kind !== "exact" || projection.pattern !== schema.pattern);
				if (!ignoresSiblings && (opaquePatternChanged || sites.get(scope)?.has(schema) && hasWidenedPattern(schema))) {
					fact.changed = true;
					changed.push(fact);
				}
				if (typeof schema.$ref === "string") {
					const target = references.resolve(scope, schema.$ref);
					if (target.kind === "target" && !throughRemovableLocation(scope?.root, target.path, scope?.dialect === "draft-07")) {
						const dependency = factAt(target.value, scope);
						dependency?.dependents.add(fact);
						dependency?.evaluationDependents.add(fact);
						if (dependency !== undefined && isRecord(target.value) && !sites.get(references.enter(target.value, scope))?.has(target.value)) fact.opaqueReference = dependency;
					} else if (target.kind !== "unresolved") {
						fact.opaqueReference = fact;
						if (!fact.changed) {
							fact.changed = true;
							changed.push(fact);
						}
					} else untracked.push(fact);
				}
				if (scope?.dialect !== "draft-07" && (typeof schema.$dynamicRef === "string" || typeof schema.$recursiveRef === "string")) untracked.push(fact);
				if (!ignoresSiblings) for (const child of schemaSubschemas(schema, { includeDefinitions: false })) factAt(child, scope)?.dependents.add(fact);
				if (!ignoresSiblings) for (const key of [
					"allOf",
					"anyOf",
					"oneOf",
					"if",
					"then",
					"else",
					"dependentSchemas",
					"dependencies"
				]) {
					const value = schema[key];
					const children = Array.isArray(value) ? value : schemaMaps.has(key) && isRecord(value) ? Object.values(value) : [value];
					for (const child of children) factAt(child, scope)?.evaluationDependents.add(fact);
				}
			}
			if (changed.length > 0) for (const fact of untracked) {
				fact.opaqueReference = fact;
				if (!fact.changed) {
					fact.changed = true;
					changed.push(fact);
				}
			}
			for (let index = 0; index < changed.length; index++) for (const dependent of changed[index].dependents) if (!dependent.changed) {
				dependent.changed = true;
				changed.push(dependent);
			}
			const lost = [];
			for (const { schema, scope, fact } of work) if (sites.get(scope)?.has(schema) && (fact.opaqueReference?.changed || !(scope?.dialect === "draft-07" && typeof schema.$ref === "string") && factAt(schema.if, scope)?.changed)) {
				fact.lostEvaluation = true;
				lost.push(fact);
			}
			for (let index = 0; index < lost.length; index++) for (const dependent of lost[index].evaluationDependents) if (!dependent.lostEvaluation) {
				dependent.lostEvaluation = true;
				lost.push(dependent);
			}
			return {
				references,
				changed: (schema, scope) => indexed.get(scope)?.get(schema)?.changed === true,
				lostEvaluation: (schema, scope) => indexed.get(scope)?.get(schema)?.lostEvaluation === true,
				reduceReference: (schema, scope) => indexed.get(scope)?.get(schema)?.opaqueReference?.changed === true
			};
		};
		normalizeAdvertisedSchema = (value, context, inherited) => {
			if (!isRecord(value)) return {
				schema: value,
				changed: false
			};
			const owner = context ?? normalizationContext(value);
			const scope = owner.references.enter(value, context === undefined ? owner.references.rootScope : inherited);
			const normalize = (child) => normalizeAdvertisedSchema(child, owner, scope);
			const node = { ...value };
			const changed = owner.changed(value, scope);
			const normalizeMap = (map) => Object.fromEntries(Object.entries(map).map(([name, child]) => [name, normalize(child).schema]));
			for (const [key, child] of Object.entries(value)) {
				if (schemaMaps.has(key) && isRecord(child)) {
					node[key] = normalizeMap(child);
				} else if (schemaArrays.has(key) && key !== "anyOf" && key !== "oneOf" && Array.isArray(child)) {
					node[key] = child.map(normalize).map((result) => result.schema);
				} else if (schemaChildren.has(key) && key !== "not" && key !== "if" && key !== "then" && key !== "else") {
					const results = Array.isArray(child) ? child.map(normalize) : [normalize(child)];
					const nestedChanged = results.some((result) => result.changed);
					if (key === "contains" && nestedChanged && value.maxContains !== undefined) {
						delete node.maxContains;
						node.contains = results[0]?.schema;
					} else {
						node[key] = Array.isArray(child) ? results.map((result) => result.schema) : results[0]?.schema;
					}
				}
			}
			if (typeof node.pattern === "string") {
				const projected = projectPortablePattern(node.pattern);
				if (projected.kind === "unexpressible") delete node.pattern;
				else node.pattern = projected.pattern;
			}
			const negated = Object.hasOwn(value, "not") ? normalize(value.not) : undefined;
			if (negated?.changed) {
				delete node.not;
			} else if (negated !== undefined) {
				node.not = negated.schema;
			}
			const conditional = Object.hasOwn(value, "if") ? normalize(value.if) : undefined;
			const thenBranch = Object.hasOwn(value, "then") ? normalize(value.then) : undefined;
			const elseBranch = Object.hasOwn(value, "else") ? normalize(value.else) : undefined;
			if (conditional?.changed) {
				delete node.if;
				delete node.then;
				delete node.else;
			} else {
				if (conditional !== undefined) node.if = conditional.schema;
				if (thenBranch !== undefined) {
					node.then = thenBranch.schema;
				}
				if (elseBranch !== undefined) {
					node.else = elseBranch.schema;
				}
			}
			for (const combinator of ["anyOf", "oneOf"]) {
				const branches = value[combinator];
				if (!Array.isArray(branches)) continue;
				const normalized = branches.map(normalize);
				const schemas = normalized.map((result) => result.schema);
				const branchesChanged = normalized.some((result) => result.changed);
				if (combinator === "oneOf" && branchesChanged) {
					delete node.oneOf;
					if (Array.isArray(node.anyOf)) {
						const existingAllOf = Array.isArray(node.allOf) ? node.allOf : [];
						node.allOf = [...existingAllOf, { anyOf: schemas }];
					} else {
						node.anyOf = schemas;
					}
					continue;
				}
				node[combinator] = schemas;
			}
			if (owner.lostEvaluation(value, scope)) {
				delete node.unevaluatedProperties;
				delete node.unevaluatedItems;
			}
			if (owner.reduceReference(value, scope)) {
				if (scope?.dialect === "draft-07") {
					for (const key of Object.keys(node)) if (!DRAFT07_REDUCED_REFERENCE_KEYS.has(key)) delete node[key];
				} else {
					delete node.$ref;
					delete node.$dynamicRef;
					delete node.$recursiveRef;
				}
				node.description = [node.description, "This referenced schema is advertised in reduced form; the server validates the complete canonical value."].filter((text) => typeof text === "string").join(" ");
			}
			return {
				schema: node,
				changed
			};
		};
		presentOutputJsonSchema = (root) => {
			const patterns = advertisedSchemaPatterns(root).map(({ pattern }) => ({
				pattern,
				projection: projectPortablePattern(pattern)
			}));
			if (hasLiteralReference(root)) return normalizeAdvertisedSchema(root).schema;
			if (patterns.some(({ projection }) => projection.kind !== "exact")) return normalizeAdvertisedSchema(root).schema;
			if (patterns.every(({ pattern, projection }) => projection.kind === "exact" && projection.pattern === pattern)) return root;
			return replaceExactPatterns(root);
		};
		hasLiteralReference = (root) => {
			const pending = [root];
			const visited = new WeakSet();
			while (pending.length > 0) {
				const value = pending.pop();
				if (!isRecord(value) || visited.has(value)) continue;
				visited.add(value);
				if (typeof value.$ref === "string") {
					try {
						const reference = decodeURIComponent(value.$ref);
						if (/(?:^#\/|\/)(?:default|const|enum|examples)(?:\/|$)/u.test(reference)) return true;
					} catch {}
				}
				pending.push(...schemaSubschemas(value, { includeDefinitions: true }));
			}
			return false;
		};
		replaceExactPatterns = (schema) => {
			if (!isRecord(schema)) return schema;
			return Object.fromEntries(Object.entries(schema).map(([key, value]) => {
				if (key === "pattern" && typeof value === "string") {
					const projection = projectPortablePattern(value);
					return [key, projection.kind === "exact" ? projection.pattern : value];
				}
				if (schemaMaps.has(key) && isRecord(value)) return [key, Object.fromEntries(Object.entries(value).map(([name, child]) => [name, replaceExactPatterns(child)]))];
				if ((schemaArrays.has(key) || schemaChildren.has(key)) && Array.isArray(value)) return [key, value.map(replaceExactPatterns)];
				if (schemaChildren.has(key)) return [key, replaceExactPatterns(value)];
				return [key, value];
			}));
		};
	})))();
}

//#endregion
//#region dist/contracts/outputSchemaDefinitions.js
var RESOLUTION_KEYWORDS, DEFINITION_KEYWORDS, ALTERNATIVE_KEYWORDS, INLINE_ALTERNATIVE_BYTES, PLAIN_DEFINITION_NAME, shareOutputDefinitions, definitionKeyword, mapSubschemas, resolvesWithinDefinitions, hoistLargeAlternatives, mergeIdenticalDefinitions;
function init_outputSchemaDefinitions() {
	return (init_outputSchemaDefinitions = __esmMin((() => {
		init_jsonSchemaKeywords();
		RESOLUTION_KEYWORDS = [
			"$id",
			"$anchor",
			"$dynamicAnchor",
			"$dynamicRef",
			"$recursiveAnchor",
			"$recursiveRef"
		];
		DEFINITION_KEYWORDS = ["$defs", "definitions"];
		ALTERNATIVE_KEYWORDS = new Set(["anyOf", "oneOf"]);
		INLINE_ALTERNATIVE_BYTES = 1024;
		PLAIN_DEFINITION_NAME = /^[A-Za-z0-9_.-]+$/u;
		shareOutputDefinitions = (root) => {
			const keyword = definitionKeyword(root);
			if (keyword === undefined) return root;
			const definitions = root[keyword];
			if (!isRecord(definitions)) return root;
			const prefix = `#/${keyword}/`;
			const names = new Set(Object.keys(definitions));
			if (!resolvesWithinDefinitions(root, prefix, names)) return root;
			return mergeIdenticalDefinitions(hoistLargeAlternatives(root, keyword, definitions, prefix), keyword, prefix);
		};
		definitionKeyword = (root) => {
			const present = DEFINITION_KEYWORDS.filter((keyword) => Object.hasOwn(root, keyword));
			return present.length === 1 ? present[0] : undefined;
		};
		mapSubschemas = (schema, map, definitions) => Object.fromEntries(Object.entries(schema).map(([keyword, value]) => {
			if (keyword === definitions) return [keyword, value];
			if (schemaMaps.has(keyword) && isRecord(value)) return [keyword, Object.fromEntries(Object.entries(value).map(([name, child]) => [name, map(child, keyword)]))];
			if ((schemaArrays.has(keyword) || schemaChildren.has(keyword)) && Array.isArray(value)) return [keyword, value.map((child) => map(child, keyword))];
			if (schemaChildren.has(keyword)) return [keyword, map(value, keyword)];
			return [keyword, value];
		}));
		resolvesWithinDefinitions = (schema, prefix, names) => {
			if (!isRecord(schema)) return true;
			if (RESOLUTION_KEYWORDS.some((keyword) => Object.hasOwn(schema, keyword))) return false;
			if (Object.hasOwn(schema, "$ref")) {
				const reference = schema.$ref;
				if (typeof reference !== "string" || !reference.startsWith(prefix)) return false;
				const name = reference.slice(prefix.length);
				if (!PLAIN_DEFINITION_NAME.test(name) || !names.has(name)) return false;
			}
			return schemaSubschemas(schema, { includeDefinitions: true }).every((child) => resolvesWithinDefinitions(child, prefix, names));
		};
		hoistLargeAlternatives = (root, keyword, definitions, prefix) => {
			const hoisted = {};
			const names = new Set(Object.keys(definitions));
			let next = 0;
			const freshName = () => {
				let name;
				do
					name = `__branch${next++}`;
				while (names.has(name));
				names.add(name);
				return name;
			};
			const visit = (schema, own) => {
				if (!isRecord(schema)) return schema;
				return mapSubschemas(schema, (child, parent) => {
					const rebuilt = visit(child);
					if (!ALTERNATIVE_KEYWORDS.has(parent) || !isRecord(rebuilt) || Object.hasOwn(rebuilt, "$ref") || JSON.stringify(rebuilt).length <= 1024) return rebuilt;
					const name = freshName();
					hoisted[name] = rebuilt;
					return { $ref: `${prefix}${name}` };
				}, own);
			};
			const rebuiltDefinitions = Object.fromEntries(Object.entries(definitions).map(([name, body]) => [name, visit(body)]));
			const rebuiltRoot = visit(root, keyword);
			return {
				...rebuiltRoot,
				[keyword]: {
					...rebuiltDefinitions,
					...hoisted
				}
			};
		};
		mergeIdenticalDefinitions = (root, keyword, prefix) => {
			let current = root;
			for (;;) {
				const definitions = current[keyword];
				const firstByBody = new Map();
				const merged = new Map();
				for (const [name, body] of Object.entries(definitions)) {
					const text = JSON.stringify(body);
					const first = firstByBody.get(text);
					if (first === undefined) firstByBody.set(text, name);
					else merged.set(name, first);
				}
				if (merged.size === 0) return current;
				const redirect = (schema, own) => {
					if (!isRecord(schema)) return schema;
					const rebuilt = mapSubschemas(schema, (child) => redirect(child), own);
					const reference = rebuilt.$ref;
					if (typeof reference !== "string") return rebuilt;
					const target = merged.get(reference.slice(prefix.length));
					return target === undefined ? rebuilt : {
						...rebuilt,
						$ref: `${prefix}${target}`
					};
				};
				current = {
					...redirect(current, keyword),
					[keyword]: Object.fromEntries(Object.entries(definitions).filter(([name]) => !merged.has(name)).map(([name, body]) => [name, redirect(body)]))
				};
			}
		};
	})))();
}

//#endregion
//#region dist/contracts/toolSchemaMetadata.js
var PROPERTY_DESCRIPTIONS, advertisedInputSchemas, advertisedOutputSchemas, oncePerContract, COMPLETE_OBSERVATION_GUIDANCE, presentAnnotatedInput, objectRoot, toolInputSchemaWithMetadata, advertisedInputJsonSchema, toolOutputSchemaWithMetadata, advertisedOutputJsonSchema, transformAdvertisedInputJsonSchema, hasRelativeSchemaReference, withAdvertisedJsonSchema, memoizeByTarget, fallbackPropertyDescription;
function init_toolSchemaMetadata() {
	return (init_toolSchemaMetadata = __esmMin((() => {
		init_jsonSchemaReferences();
		init_advertisedInputExamples();
		init_inputSchemaPresentation();
		init_outputSchemaPresentation();
		init_jsonSchemaKeywords();
		init_canonicalDigest();
		init_outputSchemaDefinitions();
		init_evidenceInputContract();
		init_schemaAnnotations();
		PROPERTY_DESCRIPTIONS = {
			addresses: "Ordered provider-normalized procedure addresses to analyze.",
			after: "The later or right-hand observation to compare.",
			before: "The earlier or left-hand observation to compare.",
			boundary_id: "Exact reconstruction boundary identifier to evaluate.",
			case_sensitive: "Whether text matching distinguishes uppercase and lowercase.",
			cdp_endpoint: "Literal loopback Chrome DevTools Protocol endpoint.",
			comment: "Exact analyst comment text to write.",
			comparisons: "Validated comparison Evidence records to aggregate.",
			coverage: "Exact reconstruction-coverage commitment to verify.",
			direction: "Direction in which to traverse or compare relationships.",
			document: "Exact provider document or program identity.",
			error: "Structured, caller-actionable error when the operation fails.",
			evidence: "Evidence record produced by this operation.",
			evidence_id: "Stable identifier of the recorded Evidence observation.",
			executable: "Command name or executable path to run.",
			format: "Declared input artifact format.",
			name: "Exact name used by this operation.",
			pattern: "Literal text or regular expression used to filter matching results.",
			phase: "Current plan or execution phase of the operation.",
			plan: "Content-bound execution plan and its digest commitment.",
			query: "Non-empty feature or text query to investigate.",
			question: "Concrete unresolved question to retain for later investigation.",
			result: "Primary structured result returned by this operation.",
			left: "Left-hand input used for comparison or differential execution.",
			limits: "Resource budgets that bound execution and retained output for this operation.",
			mode: "Operation mode that selects the requested behavior.",
			overwrite: "Whether an existing destination may be replaced.",
			path: "Local filesystem path used by this operation.",
			provider_id: "Exact deep-analysis provider ID, or automatic selection when omitted.",
			right: "Right-hand input used for comparison or differential execution.",
			source_evidence: "Evidence records supporting the prepared source transformation.",
			status: "Current lifecycle or verification status.",
			summary: "Concise evidence-backed summary of the result.",
			symbols: "Ordered Swift symbols to demangle.",
			target_id: "Exact CDP target identifier selected from the endpoint's target listing.",
			unknown_id: "Exact residual-unknown identifier."
		};
		advertisedInputSchemas = new WeakMap();
		advertisedOutputSchemas = new WeakMap();
		oncePerContract = (cache, contract, build) => {
			const cached = cache.get(contract);
			if (cached !== undefined) return cached;
			const built = build();
			cache.set(contract, built);
			return built;
		};
		COMPLETE_OBSERVATION_GUIDANCE = "Pass the complete returned normalized_result unchanged. Its fields are omitted from this declaration; the server still validates the complete canonical observation.";
		presentAnnotatedInput = ({ zodSchema, jsonSchema }) => {
			if (schemaAnnotations(zodSchema)?.completeObservation !== true) return;
			if (jsonSchema.type !== "object") throw new TypeError("A complete observation annotation requires an object schema");
			const description = [jsonSchema.description, COMPLETE_OBSERVATION_GUIDANCE].filter((text) => typeof text === "string").join(" ");
			for (const key of Object.keys(jsonSchema)) delete jsonSchema[key];
			Object.assign(jsonSchema, {
				type: "object",
				description
			});
		};
		objectRoot = ({ $defs, ...root }) => ({
			...root,
			type: "object",
			...$defs === undefined ? {} : { $defs }
		});
		toolInputSchemaWithMetadata = (contract) => oncePerContract(advertisedInputSchemas, contract, () => withAdvertisedJsonSchema(contract.inputSchema, "input", (project) => (options) => {
			const inline = project({
				...options,
				libraryOptions: {
					...options.libraryOptions,
					reused: "inline",
					override: presentAnnotatedInput
				}
			});
			const examples = advertisedInputExamples(contract);
			const presented = presentInputJsonSchema(inline, fallbackPropertyDescription, schemaAnnotations(contract.inputSchema));
			const sourceGuidance = getEvidenceInputContract(contract.inputSchema).hasEvidence ? "Declared Evidence fields accept complete records or {\"kind\":\"retained-evidence\",\"evidence_id\":\"ev_...\"}. For a complete source, use the summary's parent_evidence_id." : undefined;
			return {
				...presented,
				...sourceGuidance === undefined ? {} : { description: [presented.description, sourceGuidance].filter((text) => typeof text === "string").join(" ") },
				...examples.length === 0 ? {} : { examples }
			};
		}));
		advertisedInputJsonSchema = (contract) => toolInputSchemaWithMetadata(contract)["~standard"].jsonSchema.input({ target: "draft-2020-12" });
		toolOutputSchemaWithMetadata = (contract) => oncePerContract(advertisedOutputSchemas, contract, () => withAdvertisedJsonSchema(contract.outputSchema, "output", (project) => (options) => {
			const projected = project({
				...options,
				libraryOptions: {
					reused: "ref",
					...options.libraryOptions
				}
			});
			const shared = shareOutputDefinitions(presentOutputJsonSchema(schemaAnnotations(contract.outputSchema)?.objectRoot === true ? objectRoot(projected) : projected));
			if ("$id" in shared || hasRelativeSchemaReference(shared)) return shared;
			return {
				...shared,
				$id: `urn:rea:tool-output:sha256:${digestCanonicalValue({
					target: options.target,
					schema: shared
				}, "Tool output schema")}`
			};
		}));
		advertisedOutputJsonSchema = (contract, target = "draft-2020-12") => toolOutputSchemaWithMetadata(contract)["~standard"].jsonSchema.output({ target });
		transformAdvertisedInputJsonSchema = (schema, transform) => {
			const standard = Reflect.get(schema, "~standard");
			if (!isRecord(standard)) return schema;
			const jsonSchema = Reflect.get(standard, "jsonSchema");
			if (!isRecord(jsonSchema)) return schema;
			const project = Reflect.get(jsonSchema, "input");
			if (typeof project !== "function") return schema;
			const byTarget = new Map();
			const transformedInput = (options) => {
				const target = Reflect.get(options, "target");
				const cacheable = typeof target === "string" && Reflect.get(options, "libraryOptions") === undefined;
				if (cacheable) {
					const cached = byTarget.get(target);
					if (cached !== undefined) return cached;
				}
				const projected = project(options);
				const transformed = isRecord(projected) ? transform(projected) : projected;
				if (cacheable && isRecord(transformed)) byTarget.set(target, transformed);
				return transformed;
			};
			return {
				...schema,
				"~standard": {
					...standard,
					jsonSchema: {
						...jsonSchema,
						input: transformedInput
					}
				}
			};
		};
		hasRelativeSchemaReference = (schema) => {
			const references = new JsonSchemaReferences(schema);
			const pending = [{
				value: schema,
				scope: references.rootScope,
				position: "schema"
			}];
			const visited = new WeakMap();
			while (pending.length > 0) {
				const entry = pending.pop();
				const current = entry.value;
				if (current === null || typeof current !== "object") continue;
				const { position } = entry;
				const scope = position !== "map" && isRecord(current) ? references.enter(current, entry.scope) : entry.scope;
				if (scope === undefined) return true;
				let positions = visited.get(scope);
				if (positions === undefined) {
					positions = {
						schema: new WeakSet(),
						map: new WeakSet(),
						unknown: new WeakSet()
					};
					visited.set(scope, positions);
				}
				if (positions[position].has(current)) continue;
				positions[position].add(current);
				if (Array.isArray(current)) {
					for (const value of current) pending.push({
						value,
						scope,
						position
					});
					continue;
				}
				for (const [key, value] of Object.entries(current)) {
					if (position !== "map" && [
						"$id",
						"$ref",
						"$dynamicRef",
						"$recursiveRef"
					].includes(key) && typeof value === "string") {
						if (key === "$dynamicRef" || key === "$recursiveRef") return true;
						if (!value.startsWith("#") && !URL.canParse(value)) return true;
						if (key !== "$id" && value.startsWith("#")) {
							const target = references.resolve(scope, value);
							if (target.kind === "unresolved") return true;
							if (target.kind === "target") pending.push({
								value: target.value,
								scope,
								position: "schema"
							});
						}
					}
					if (position === "schema" && schemaLiteralValues.has(key)) continue;
					const childPosition = position === "map" ? "schema" : position === "schema" && schemaMaps.has(key) ? "map" : position === "schema" && (schemaArrays.has(key) || schemaChildren.has(key)) ? "schema" : "unknown";
					if (value !== null && typeof value === "object") pending.push({
						value,
						scope,
						position: childPosition
					});
				}
			}
			return false;
		};
		withAdvertisedJsonSchema = (canonical, io, advertise) => {
			const schema = canonical.meta(z.globalRegistry.get(canonical) ?? {});
			const standard = schema["~standard"];
			const project = standard.jsonSchema?.[io];
			if (project === undefined) throw new TypeError(`Tool ${io} schema does not expose Standard JSON Schema`);
			Object.defineProperty(schema, "~standard", { value: {
				...standard,
				jsonSchema: {
					...standard.jsonSchema,
					[io]: memoizeByTarget(advertise(project))
				}
			} });
			return schema;
		};
		memoizeByTarget = (project) => {
			const byTarget = new Map();
			return (options) => {
				if (options.libraryOptions !== undefined) return project(options);
				const cached = byTarget.get(options.target);
				if (cached !== undefined) return cached;
				const projected = project(options);
				byTarget.set(options.target, projected);
				return projected;
			};
		};
		fallbackPropertyDescription = (property) => {
			const explicit = Object.hasOwn(PROPERTY_DESCRIPTIONS, property) ? PROPERTY_DESCRIPTIONS[property] : undefined;
			if (explicit !== undefined) return explicit;
			const words = property.replaceAll("_", " ");
			if (property.startsWith("max_")) return `Maximum permitted ${words.slice(4)} for this operation.`;
			if (property.startsWith("include_")) return `Whether to include ${words.slice(8)} in the result.`;
			if (property.startsWith("expected_")) return `Expected ${words.slice(9)} used to reject stale or mismatched input.`;
			if (property.endsWith("_sha256")) return `Exact SHA-256 digest of ${words.slice(0, -7)}.`;
			if (property.endsWith("_evidence_id")) return `Exact Evidence identifier for the ${words.slice(0, -12)} observation.`;
			if (property.endsWith("_evidence_ids")) return `Ordered Evidence identifiers for the ${words.slice(0, -13)} observations.`;
			if (property.endsWith("_path")) return `Local filesystem path for ${words.slice(0, -5)}.`;
			if (property.endsWith("_uri")) return `Canonical URI for ${words.slice(0, -4)}.`;
			if (property.endsWith("_bytes")) return `Byte count for ${words.slice(0, -6)}.`;
			if (property.endsWith("_root") || property.endsWith("_roots")) return `Local filesystem ${words} selected for this operation.`;
			if (property.startsWith("is_") || property.startsWith("has_")) return `Whether ${words}.`;
			return undefined;
		};
	})))();
}

//#endregion
export { advertisedInputJsonSchema, advertisedOutputJsonSchema, init_toolSchemaMetadata, transformAdvertisedInputJsonSchema };