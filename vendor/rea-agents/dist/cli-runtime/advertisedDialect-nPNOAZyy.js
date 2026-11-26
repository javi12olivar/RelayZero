import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_isRecord, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { init_jsonPointer, unescapeJsonPointerToken } from "./jsonPointer-aolC6MvJ.js";

//#region dist/contracts/jsonSchemaKeywords.js
var schemaMaps, schemaArrays, schemaChildren, schemaSubschemas, schemaLiteralValues, schemaPointerSteps;
function init_jsonSchemaKeywords() {
	return (init_jsonSchemaKeywords = __esmMin((() => {
		schemaMaps = new Set([
			"$defs",
			"definitions",
			"properties",
			"patternProperties",
			"dependentSchemas",
			"dependencies"
		]);
		schemaArrays = new Set([
			"allOf",
			"anyOf",
			"oneOf",
			"prefixItems"
		]);
		schemaChildren = new Set([
			"items",
			"additionalItems",
			"contains",
			"additionalProperties",
			"unevaluatedProperties",
			"unevaluatedItems",
			"propertyNames",
			"contentSchema",
			"not",
			"if",
			"then",
			"else"
		]);
		schemaSubschemas = (schema, options) => Object.entries(schema).flatMap(([key, value]) => {
			if (schemaMaps.has(key) && isRecord(value)) return !options.includeDefinitions && (key === "$defs" || key === "definitions") ? [] : Object.values(value);
			if (schemaArrays.has(key) && Array.isArray(value)) return value;
			if (schemaChildren.has(key)) return Array.isArray(value) ? value : [value];
			return [];
		});
		schemaLiteralValues = new Set([
			"const",
			"enum",
			"default",
			"examples"
		]);
		schemaPointerSteps = (path) => {
			const steps = [];
			let position = "schema";
			for (const segment of path) {
				if (position === "entry" || position === "schemaOrIndex" && /^(?:0|[1-9]\d*)$/u.test(segment)) {
					steps.push({ kind: "entry" });
					position = "schema";
					continue;
				}
				if (schemaMaps.has(segment) || schemaArrays.has(segment)) {
					steps.push({
						kind: "keyword",
						keyword: segment
					});
					position = "entry";
					continue;
				}
				if (schemaChildren.has(segment)) {
					steps.push({
						kind: "keyword",
						keyword: segment
					});
					position = "schemaOrIndex";
					continue;
				}
				steps.push({
					kind: "value",
					keyword: segment
				});
				break;
			}
			return steps;
		};
	})))();
}

//#endregion
//#region dist/contracts/jsonSchemaReferences.js
var isObject, dialectOf, sameResourceFragment, JsonSchemaReferences;
function init_jsonSchemaReferences() {
	return (init_jsonSchemaReferences = __esmMin((() => {
		init_jsonPointer();
		init_jsonSchemaKeywords();
		isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
		dialectOf = (schema, inherited) => schema.$schema === undefined ? inherited : schema.$schema === "http://json-schema.org/draft-07/schema#" || schema.$schema === "http://json-schema.org/draft-07/schema" ? "draft-07" : schema.$schema === "https://json-schema.org/draft/2020-12/schema" ? "draft-2020-12" : undefined;
		sameResourceFragment = (reference, baseUri) => {
			if (reference.startsWith("#")) return reference.slice(1);
			if (baseUri === undefined || !URL.canParse(reference, baseUri)) return undefined;
			const resource = new URL(reference, baseUri);
			const base = new URL(baseUri);
			resource.hash = "";
			base.hash = "";
			if (resource.href !== base.href) return undefined;
			const hash = reference.indexOf("#");
			return hash === -1 ? "" : reference.slice(hash + 1);
		};
		JsonSchemaReferences = class {
			rootScope;
			#scopes = new WeakMap();
			#referenceSites = [];
			#identities = new Map();
			#relativeIdentities = new WeakMap();
			#ambiguous = new WeakSet();
			constructor(root) {
				let baseUri;
				if (typeof root.$id === "string" && URL.canParse(root.$id)) {
					const url = new URL(root.$id);
					url.hash = "";
					baseUri = url.href;
				}
				this.rootScope = {
					root,
					baseUri,
					dialect: dialectOf(root, "draft-2020-12")
				};
				if (baseUri !== undefined) this.#identities.set(baseUri, this.rootScope);
				const pending = [{
					value: root,
					scope: this.rootScope
				}];
				const visited = new WeakMap();
				while (pending.length > 0) {
					const { value, scope: parent } = pending.pop();
					if (!isObject(value)) continue;
					const scope = this.#scope(value, parent);
					if (scope === undefined) continue;
					let seen = visited.get(scope);
					if (seen === undefined) {
						seen = new WeakSet();
						visited.set(scope, seen);
					}
					if (seen.has(value)) continue;
					seen.add(value);
					for (const keyword of [
						"$ref",
						"$dynamicRef",
						"$recursiveRef"
					]) {
						const reference = value[keyword];
						if (typeof reference !== "string") continue;
						this.#referenceSites.push({
							scope,
							reference,
							keyword
						});
						if (keyword !== "$ref") continue;
						const target = this.resolve(scope, reference);
						if (target.kind === "target") pending.push({
							value: target.value,
							scope
						});
					}
					for (const [key, child] of Object.entries(value)) {
						if (schemaMaps.has(key) && isObject(child)) {
							for (const item of Object.values(child)) pending.push({
								value: item,
								scope
							});
						} else if ((schemaArrays.has(key) || schemaChildren.has(key)) && Array.isArray(child)) {
							for (const item of child) pending.push({
								value: item,
								scope
							});
						} else if (schemaChildren.has(key)) pending.push({
							value: child,
							scope
						});
					}
				}
			}
			enter(schema, parent) {
				if (parent === undefined) return undefined;
				const scope = this.#scope(schema, parent);
				for (let current = scope; current !== undefined; current = current.parent) if (this.#ambiguous.has(current)) return undefined;
				return scope?.dialect === undefined ? undefined : scope;
			}
			#scope(schema, parent) {
				if (schema === parent.root) return parent;
				if (schema.$id === undefined) return parent;
				let cached = this.#scopes.get(schema);
				if (cached?.has(parent)) return cached.get(parent);
				if (cached === undefined) {
					cached = new WeakMap();
					this.#scopes.set(schema, cached);
				}
				let scope;
				if (typeof schema.$id === "string" && schema.$id !== "" && (!schema.$id.includes("#") || schema.$id !== "#" && schema.$id.indexOf("#") === schema.$id.length - 1)) {
					let baseUri;
					try {
						if (parent.baseUri !== undefined || URL.canParse(schema.$id)) {
							const url = new URL(schema.$id, parent.baseUri);
							url.hash = "";
							baseUri = url.href;
						}
						scope = {
							root: schema,
							baseUri,
							dialect: dialectOf(schema, parent.dialect),
							parent
						};
						if (baseUri !== undefined) {
							const existing = this.#identities.get(baseUri);
							if (existing !== undefined && existing.root !== schema) {
								this.#ambiguous.add(existing);
								this.#ambiguous.add(scope);
							} else if (existing !== undefined) scope = existing;
							else this.#identities.set(baseUri, scope);
						} else {
							let identities = this.#relativeIdentities.get(parent);
							if (identities === undefined) {
								identities = new Map();
								this.#relativeIdentities.set(parent, identities);
							}
							const identity = schema.$id.replace(/#$/u, "");
							const existing = identities.get(identity);
							if (existing !== undefined && existing.root !== schema) {
								this.#ambiguous.add(existing);
								this.#ambiguous.add(scope);
							} else if (existing !== undefined) scope = existing;
							else identities.set(identity, scope);
						}
					} catch {}
				}
				cached.set(parent, scope);
				return scope;
			}
			*references() {
				for (const { scope, reference, keyword } of this.#referenceSites) yield {
					scope,
					target: keyword === "$ref" ? this.resolve(scope, reference) : {
						kind: "unresolved",
						reason: "dynamic"
					}
				};
			}
			resolve(scope, reference) {
				if (scope === undefined || this.enter(scope.root, scope) === undefined) return {
					kind: "unresolved",
					reason: "scope"
				};
				const local = sameResourceFragment(reference, scope.baseUri);
				if (local === undefined) return {
					kind: "unresolved",
					reason: "external"
				};
				let fragment;
				try {
					fragment = decodeURIComponent(local);
				} catch {
					return {
						kind: "unresolved",
						reason: "fragment"
					};
				}
				if (fragment === "") return {
					kind: "target",
					value: scope.root,
					path: []
				};
				if (!fragment.startsWith("/")) return { kind: "anchor" };
				let value = scope.root;
				const path = [];
				for (const token of fragment.slice(1).split("/")) {
					if (/~(?:[^01]|$)/u.test(token)) return {
						kind: "unresolved",
						reason: "pointer"
					};
					const key = unescapeJsonPointerToken(token);
					if (value === null || typeof value !== "object" || !Object.hasOwn(value, key) || Array.isArray(value) && !/^(?:0|[1-9][0-9]*)$/u.test(key)) return {
						kind: "unresolved",
						reason: "pointer"
					};
					if (value !== scope.root && isObject(value) && "$id" in value) return {
						kind: "unresolved",
						reason: "resource-boundary"
					};
					path.push(key);
					value = Reflect.get(value, key);
				}
				return {
					kind: "target",
					value,
					path
				};
			}
		};
	})))();
}

//#endregion
//#region dist/contracts/compactJsonSchema.js
var annotationKeys, definitionKeys, jsonValueTypes, jsonValueSchema, enumValueTypes, isSchemaObject, serializedBytes, schemaDepth, COMPACT_SCHEMA_MAX_DEPTH, rebuildSchemaPositions, stripAnnotations, stripChildAnnotations, inlineWithinBudget, detectedTypes, arrayItemAlternatives, REDUCED_ITEM_MAX_DEPTH, typedAlternatives, reducedItemSchema, reducedPropertyTypes, reduceToShallowProperties;
function init_compactJsonSchema() {
	return (init_compactJsonSchema = __esmMin((() => {
		init_jsonSchemaReferences();
		init_jsonSchemaKeywords();
		annotationKeys = new Set([
			"description",
			"examples",
			"default",
			"title"
		]);
		definitionKeys = new Set(["$defs", "definitions"]);
		jsonValueTypes = [
			"null",
			"boolean",
			"object",
			"array",
			"number",
			"string"
		];
		jsonValueSchema = () => ({
			type: [...jsonValueTypes],
			items: {}
		});
		enumValueTypes = (values) => [...new Set(values.map((value) => {
			if (value === null) return "null";
			if (Array.isArray(value)) return "array";
			if (typeof value === "object") return "object";
			return typeof value;
		}))];
		isSchemaObject = isRecord;
		serializedBytes = (value) => Buffer.byteLength(JSON.stringify(value), "utf8");
		schemaDepth = (value, depth = 0) => {
			if (Array.isArray(value)) return Math.max(depth, ...value.map((child) => schemaDepth(child, depth + 1)));
			if (!isSchemaObject(value)) return depth;
			return Math.max(depth, ...Object.values(value).map((child) => schemaDepth(child, depth + 1)));
		};
		COMPACT_SCHEMA_MAX_DEPTH = 10;
		rebuildSchemaPositions = (node, rebuild) => {
			if (Array.isArray(node)) return node.map((child) => rebuild(child));
			if (!isSchemaObject(node)) return node;
			const out = {};
			for (const [key, value] of Object.entries(node)) {
				if (schemaLiteralValues.has(key)) {
					out[key] = value;
					continue;
				}
				if (schemaMaps.has(key) && isSchemaObject(value)) {
					out[key] = Object.fromEntries(Object.entries(value).map(([name, child]) => [name, rebuild(child)]));
					continue;
				}
				if (schemaArrays.has(key) && Array.isArray(value)) {
					out[key] = value.map((child) => rebuild(child));
					continue;
				}
				if (schemaChildren.has(key)) {
					out[key] = Array.isArray(value) ? value.map((child) => rebuild(child)) : rebuild(value);
					continue;
				}
				out[key] = value;
			}
			return out;
		};
		stripAnnotations = (schema) => {
			const rebuilt = rebuildSchemaPositions(schema, stripChildAnnotations);
			const out = {};
			for (const [key, value] of Object.entries(rebuilt)) {
				if (annotationKeys.has(key) && key !== "description") continue;
				out[key] = value;
			}
			return out;
		};
		stripChildAnnotations = (child) => {
			const rebuilt = rebuildSchemaPositions(child, stripChildAnnotations);
			if (!isSchemaObject(rebuilt)) return rebuilt;
			const kept = {};
			for (const [key, value] of Object.entries(rebuilt)) if (!annotationKeys.has(key)) kept[key] = value;
			return kept;
		};
		inlineWithinBudget = (root, budgetBytes) => {
			const references = new JsonSchemaReferences(root);
			const identity = Object.fromEntries([
				"$id",
				"$anchor",
				"$schema"
			].flatMap((key) => Object.hasOwn(root, key) ? [[key, root[key]]] : []));
			const identityBytes = Object.keys(identity).length === 0 ? 0 : serializedBytes(identity) - 2;
			if (identityBytes > budgetBytes) return undefined;
			let resolved = true;
			function* serialize(value, position, scope, active) {
				if (Array.isArray(value)) {
					yield "[";
					for (const [index, child] of value.entries()) {
						if (index > 0) yield ",";
						yield* serialize(child, position, scope, active);
					}
					yield "]";
				} else if (isSchemaObject(value)) {
					const currentScope = position === "schema" ? references.enter(value, scope) : scope;
					if (position === "schema" && (currentScope === undefined || currentScope.dialect !== references.rootScope.dialect || [
						"$dynamicRef",
						"$recursiveRef",
						"$dynamicAnchor",
						"$recursiveAnchor"
					].some((key) => Object.hasOwn(value, key)))) {
						resolved = false;
						return;
					}
					if (position === "schema" && Object.keys(value).length === 0) {
						yield JSON.stringify(jsonValueSchema());
						return;
					}
					if (position === "schema" && typeof value.$ref === "string") {
						const target = references.resolve(currentScope, value.$ref);
						if (target.kind !== "target" || currentScope === undefined || active.get(currentScope)?.has(value.$ref)) {
							resolved = false;
							return;
						}
						const { $ref, $id: _id, $anchor: _anchor, $schema: _schema, ...siblings } = value;
						const nextActive = new Map(active);
						nextActive.set(currentScope, new Set([...active.get(currentScope) ?? [], $ref]));
						if (currentScope.dialect === "draft-07" && Object.keys(siblings).length > 0) {
							resolved = false;
							return;
						}
						const expanded = Object.keys(siblings).length === 0 ? target.value : { allOf: [target.value, siblings] };
						yield* serialize(expanded, "schema", currentScope, nextActive);
						return;
					}
					yield "{";
					let first = true;
					for (const [key, child] of Object.entries(value)) {
						if (position === "schema" && (definitionKeys.has(key) || key === "$id" || key === "$anchor" || key === "$schema")) continue;
						if (!first) yield ",";
						first = false;
						yield JSON.stringify(key) + ":";
						if (position === "schema" && key === "not" && isSchemaObject(child) && Object.keys(child).length === 0) {
							yield "{}";
							continue;
						}
						const childPosition = position === "map" ? "schema" : position === "schema" && schemaMaps.has(key) ? "map" : position === "schema" && (schemaArrays.has(key) || schemaChildren.has(key)) ? "schema" : "data";
						yield* serialize(child, childPosition, currentScope, active);
					}
					yield "}";
				} else {
					yield JSON.stringify(value);
				}
			}
			const chunks = [];
			let bytes = identityBytes;
			for (const chunk of serialize(root, "schema", references.rootScope, new Map())) {
				bytes += Buffer.byteLength(chunk, "utf8");
				if (bytes > budgetBytes || !resolved) return undefined;
				chunks.push(chunk);
			}
			if (!resolved) return undefined;
			const expanded = JSON.parse(chunks.join(""));
			if (!isSchemaObject(expanded)) return undefined;
			const schema = {
				...identity,
				...expanded
			};
			return serializedBytes(schema) <= budgetBytes ? schema : undefined;
		};
		detectedTypes = (schema, references, inherited, active = new Set()) => {
			if (!isSchemaObject(schema)) return undefined;
			const scope = references.enter(schema, inherited);
			if (scope === undefined) return undefined;
			if (typeof schema.$ref === "string") {
				if (active.has(schema)) return undefined;
				const target = references.resolve(scope, schema.$ref);
				return target.kind === "target" ? detectedTypes(target.value, references, scope, new Set([...active, schema])) : undefined;
			}
			if (typeof schema.type === "string") return [schema.type];
			if (Array.isArray(schema.type) && schema.type.every((type) => typeof type === "string")) return schema.type;
			if (Array.isArray(schema.enum) && schema.enum.length > 0) {
				const enumTypes = enumValueTypes(schema.enum);
				if (enumTypes.every((type) => jsonValueTypes.includes(type))) return enumTypes;
			}
			const alternatives = Array.isArray(schema.anyOf) ? schema.anyOf : Array.isArray(schema.oneOf) ? schema.oneOf : [];
			if (alternatives.length === 0) return undefined;
			const types = alternatives.map((branch) => detectedTypes(branch, references, scope, active));
			if (types.some((type) => type === undefined)) return undefined;
			return [...new Set(types.flatMap((type) => type ?? []))];
		};
		arrayItemAlternatives = (schema, references, inherited, active = new Set()) => {
			if (!isSchemaObject(schema)) return undefined;
			const scope = references.enter(schema, inherited);
			if (scope === undefined) return undefined;
			if (typeof schema.$ref === "string") {
				if (active.has(schema)) return undefined;
				const target = references.resolve(scope, schema.$ref);
				return target.kind === "target" ? arrayItemAlternatives(target.value, references, scope, new Set([...active, schema])) : undefined;
			}
			const types = typeof schema.type === "string" ? [schema.type] : Array.isArray(schema.type) ? schema.type : undefined;
			if (types !== undefined) {
				if (!types.includes("array")) return [];
				return isSchemaObject(schema.items) && schema.prefixItems === undefined ? [{
					schema: schema.items,
					scope
				}] : undefined;
			}
			const alternatives = Array.isArray(schema.anyOf) ? schema.anyOf : Array.isArray(schema.oneOf) ? schema.oneOf : [];
			if (alternatives.length === 0) return undefined;
			const nested = alternatives.map((branch) => arrayItemAlternatives(branch, references, scope, active));
			return nested.some((items) => items === undefined) ? undefined : nested.flatMap((items) => items ?? []);
		};
		REDUCED_ITEM_MAX_DEPTH = 3;
		typedAlternatives = (types) => types.length === 1 ? { type: types[0] } : { anyOf: types.map((type) => ({ type })) };
		reducedItemSchema = (alternatives, references, depth = 1) => {
			if (alternatives === undefined || alternatives.length === 0 || depth > REDUCED_ITEM_MAX_DEPTH) return {};
			const types = [];
			for (const { schema, scope } of alternatives) {
				const detected = detectedTypes(schema, references, scope);
				if (detected === undefined || detected.length === 0) return {};
				types.push(...detected);
			}
			const unique = [...new Set(types)];
			if (!unique.includes("array")) return typedAlternatives(unique);
			if (unique.length > 1) return {};
			const nested = [];
			for (const { schema, scope } of alternatives) {
				const items = arrayItemAlternatives(schema, references, scope);
				if (items === undefined) return {
					type: "array",
					items: {}
				};
				nested.push(...items);
			}
			return {
				type: "array",
				items: reducedItemSchema(nested, references, depth + 1)
			};
		};
		reducedPropertyTypes = (value, references) => {
			const types = detectedTypes(value, references, references.rootScope);
			if (types === undefined || types.length === 0) return {};
			if (!types.includes("array")) return typedAlternatives(types);
			const array = {
				type: "array",
				items: reducedItemSchema(arrayItemAlternatives(value, references, references.rootScope), references)
			};
			return types.length === 1 ? array : { anyOf: types.map((type) => type === "array" ? array : { type }) };
		};
		reduceToShallowProperties = (schema, reducedAnnotation) => {
			const properties = isSchemaObject(schema.properties) ? schema.properties : {};
			const description = [typeof schema.description === "string" ? schema.description : undefined, reducedAnnotation].filter((text) => text !== undefined).join(" ");
			const references = new JsonSchemaReferences(schema);
			const shallow = Object.fromEntries(Object.entries(properties).map(([name, value]) => {
				const description = isSchemaObject(value) && typeof value.description === "string" ? { description: value.description } : {};
				return [name, {
					...reducedPropertyTypes(value, references),
					...description
				}];
			}));
			return {
				...typeof schema.$schema === "string" ? { $schema: schema.$schema } : {},
				type: "object",
				description,
				properties: shallow,
				...Array.isArray(schema.required) ? { required: [...schema.required] } : {},
				...typeof schema.minProperties === "number" ? { minProperties: schema.minProperties } : {},
				...schema.additionalProperties === false && !(isSchemaObject(schema.patternProperties) && Object.keys(schema.patternProperties).length > 0) ? { additionalProperties: false } : {},
				...Object.fromEntries(["dependentRequired", "dependencies"].flatMap((key) => isSchemaObject(schema[key]) ? [[key, schema[key]]] : []))
			};
		};
	})))();
}

//#endregion
//#region dist/contracts/advertisedDialect.js
var ALLOWED_KEYWORDS, PRIMITIVE_TYPES, TOOL_NAME, PROPERTY_NAME, TOOL_DESCRIPTION_LIMIT, ADVERTISED_DESCRIPTION_MAX_CHARACTERS, ADVERTISED_BOUND_LIMIT, ADVERTISED_INPUT_SCHEMA_MAX_BYTES, ALNUM, ESCAPABLE_OUTSIDE_CLASS, ESCAPABLE_IN_CLASS, LITERAL_IN_CLASS, LITERAL_OUTSIDE_CLASS, CONTROL_ESCAPES, ASCII_HEX_ESCAPE, REPEAT, unescapedFinalDollar, escapeViolation, portablePatternViolations, visitSchemas, advertisedSchemaPatterns, patternViolations, isNullBranch, isNullableUnion, nodeViolations, advertisedInputDialectViolations, advertisedOutputPatternViolations;
function init_advertisedDialect() {
	return (init_advertisedDialect = __esmMin((() => {
		init_compactJsonSchema();
		init_jsonSchemaKeywords();
		ALLOWED_KEYWORDS = new Set([
			"type",
			"description",
			"properties",
			"required",
			"additionalProperties",
			"items",
			"enum",
			"anyOf",
			"minItems",
			"maxItems",
			"minLength",
			"maxLength",
			"minimum",
			"maximum",
			"pattern"
		]);
		PRIMITIVE_TYPES = new Set([
			"object",
			"array",
			"string",
			"integer",
			"number",
			"boolean"
		]);
		TOOL_NAME = /^[a-z][a-z0-9_]{0,53}$/u;
		PROPERTY_NAME = /^[A-Za-z_][A-Za-z0-9_]{0,63}$/u;
		TOOL_DESCRIPTION_LIMIT = 4096;
		ADVERTISED_DESCRIPTION_MAX_CHARACTERS = 1024;
		ADVERTISED_BOUND_LIMIT = 1999;
		ADVERTISED_INPUT_SCHEMA_MAX_BYTES = 13 * 1024;
		ALNUM = /^[A-Za-z0-9]$/u;
		ESCAPABLE_OUTSIDE_CLASS = new Set("^$\\.*+?()[]{}|");
		ESCAPABLE_IN_CLASS = new Set("^$\\.*+?()[]{}|-");
		LITERAL_IN_CLASS = new Set("!#%&,:;<=>@`~'\" _.+*?$");
		LITERAL_OUTSIDE_CLASS = new Set("_ !#%&,:;<=>@`~'\"-/");
		CONTROL_ESCAPES = new Set("tnrfv");
		ASCII_HEX_ESCAPE = /^[0-7][0-9A-Fa-f]$/u;
		REPEAT = /^\{(\d+)(?:,(\d*))?\}/u;
		unescapedFinalDollar = (pattern) => {
			if (!pattern.endsWith("$")) return false;
			let backslashes = 0;
			for (let index = pattern.length - 2; pattern[index] === "\\"; index--) backslashes++;
			return backslashes % 2 === 0;
		};
		escapeViolation = (escaped) => {
			if ("dDwWsS".includes(escaped)) return "shorthand-class";
			if ("bB".includes(escaped)) return "word-boundary";
			if (/^[0-9]$/u.test(escaped)) return "octal-or-backreference";
			if ("uU".includes(escaped)) return "unicode-escape";
			if ("pP".includes(escaped)) return "unicode-property";
			if (escaped === "k") return "named-backreference";
			if (escaped === "x") return "non-ascii-or-braced-hex-escape";
			return `escape:\\${escaped}`;
		};
		portablePatternViolations = (pattern) => {
			const found = new Set();
			if (!pattern.startsWith("^") || !unescapedFinalDollar(pattern)) found.add("unanchored");
			for (const character of pattern) {
				const code = character.codePointAt(0);
				if (code < 32 || code > 126) found.add("non-ascii-literal");
			}
			const at = (index) => pattern[index] ?? "";
			let index = 0;
			const groups = [1];
			let lastAtom = 1;
			while (index < pattern.length) {
				const character = at(index);
				if (character === "\\") {
					lastAtom = 1;
					const escaped = at(index + 1);
					if (escaped === "") {
						found.add("trailing-escape");
						break;
					}
					if (ESCAPABLE_OUTSIDE_CLASS.has(escaped) || CONTROL_ESCAPES.has(escaped) || escaped === "x" && ASCII_HEX_ESCAPE.test(pattern.slice(index + 2, index + 4))) {
						index += escaped === "x" ? 4 : 2;
						continue;
					}
					found.add(escaped === "-" ? "escaped-hyphen-outside-class" : escapeViolation(escaped));
					index += 2;
					continue;
				}
				if (character === "[") {
					lastAtom = 1;
					let cursor = index + 1;
					if (at(cursor) === "^") cursor++;
					if (at(cursor) === "]") found.add("empty-or-leading-bracket-class");
					let previous = "start";
					while (cursor < pattern.length && at(cursor) !== "]") {
						const member = at(cursor);
						if (member === "\\") {
							const escaped = at(cursor + 1);
							if (ESCAPABLE_IN_CLASS.has(escaped) || CONTROL_ESCAPES.has(escaped) || escaped === "x" && ASCII_HEX_ESCAPE.test(pattern.slice(cursor + 2, cursor + 4))) {
								cursor += escaped === "x" ? 4 : 2;
								previous = "endpoint";
								continue;
							}
							found.add(escaped === "" ? "trailing-escape" : escapeViolation(escaped));
							cursor += 2;
							previous = "endpoint";
							continue;
						}
						if (member === "-") {
							if (previous === "endpoint" && cursor + 1 < pattern.length && at(cursor + 1) !== "]" && at(cursor + 1) !== "-") {
								cursor++;
								previous = "range";
								continue;
							}
							found.add("unescaped-hyphen-in-class");
							cursor++;
							previous = "punctuator";
							continue;
						}
						if (ALNUM.test(member)) {
							cursor++;
							previous = "endpoint";
							continue;
						}
						if (LITERAL_IN_CLASS.has(member)) {
							if (at(cursor + 1) === member) found.add("doubled-punctuator-in-class");
							cursor++;
							previous = "punctuator";
							continue;
						}
						found.add("[({})|/^".includes(member) ? `unescaped-syntax-in-class:${member}` : "other-class-character");
						cursor++;
						previous = "punctuator";
					}
					if (cursor >= pattern.length) {
						found.add("unterminated-class");
						break;
					}
					index = cursor + 1;
					continue;
				}
				if (character === "(") {
					groups.push(1);
					if (pattern.startsWith("(?:", index)) {
						index += 3;
						continue;
					}
					if (/^\(\?<?[=!]/u.test(pattern.slice(index))) {
						found.add("look-around");
						index += 3;
						continue;
					}
					if (pattern.startsWith("(?<", index) || pattern.startsWith("(?P", index)) found.add("named-group");
					else if (pattern.startsWith("(?", index)) found.add("inline-flags-or-other-group");
					index++;
					continue;
				}
				if (character === ")") {
					lastAtom = groups.length > 1 ? groups.pop() : 1;
					groups[groups.length - 1] = Math.max(groups[groups.length - 1], lastAtom);
					index++;
					continue;
				}
				if ("*+?".includes(character)) {
					if ("?+".includes(at(index + 1)) && at(index + 1) !== "") found.add("lazy-or-possessive");
					index++;
					continue;
				}
				if (character === "{") {
					const repeat = REPEAT.exec(pattern.slice(index));
					if (repeat === null) {
						found.add("literal-brace");
						index++;
						continue;
					}
					if ([repeat[1], repeat[2]].some((bound) => bound !== undefined && /^0\d/u.test(bound))) found.add("repeat-leading-zero");
					const lower = Number(repeat[1]);
					const upper = repeat[2] === undefined || repeat[2] === "" ? lower : Number(repeat[2]);
					if (Math.max(lower, upper) > 1e3) found.add("repeat-above-1000");
					const nested = lastAtom;
					lastAtom *= Math.max(lower, upper);
					if (nested > 1 && lastAtom > 1e3) found.add("nested-repeat-above-1000");
					groups[groups.length - 1] = Math.max(groups[groups.length - 1], lastAtom);
					index += repeat[0].length;
					if ("?+".includes(at(index)) && at(index) !== "") found.add("lazy-or-possessive");
					continue;
				}
				if (character === ".") found.add("dot");
				else if (!"^$|)".includes(character) && !ALNUM.test(character) && !LITERAL_OUTSIDE_CLASS.has(character)) found.add(`other-character:${character}`);
				if (!"^$|".includes(character)) lastAtom = 1;
				index++;
			}
			return [...found].sort();
		};
		visitSchemas = (schema, path, visit, keyword) => {
			visit(schema, path, keyword);
			if (!isRecord(schema)) return;
			for (const [key, value] of Object.entries(schema)) {
				if (schemaMaps.has(key) && isRecord(value)) for (const [name, child] of Object.entries(value)) visitSchemas(child, `${path}.${key}.${name}`, visit, key);
				else if (schemaArrays.has(key) && Array.isArray(value)) value.forEach((child, index) => visitSchemas(child, `${path}.${key}[${String(index)}]`, visit, key));
				else if (schemaChildren.has(key)) {
					if (Array.isArray(value)) value.forEach((child, index) => visitSchemas(child, `${path}.${key}[${String(index)}]`, visit, key));
					else visitSchemas(value, `${path}.${key}`, visit, key);
				}
			}
		};
		advertisedSchemaPatterns = (root) => {
			const patterns = [];
			visitSchemas(root, "$", (node, path) => {
				if (!isRecord(node)) return;
				if (typeof node.pattern === "string") patterns.push({
					path,
					pattern: node.pattern
				});
				if (isRecord(node.patternProperties)) for (const pattern of Object.keys(node.patternProperties)) patterns.push({
					path: `${path}.patternProperties[${JSON.stringify(pattern)}]`,
					pattern
				});
			});
			return patterns;
		};
		patternViolations = (tool, schema, root) => advertisedSchemaPatterns(root).flatMap(({ path, pattern }) => portablePatternViolations(pattern).map((detail) => ({
			tool,
			schema,
			path,
			rule: "pattern",
			detail
		})));
		isNullBranch = (branch) => isRecord(branch) && branch.type === "null" && Object.keys(branch).length === 1;
		isNullableUnion = (node) => Array.isArray(node.anyOf) && node.anyOf.length === 2 && node.anyOf.some(isNullBranch) && node.anyOf.some((branch) => isRecord(branch) && typeof branch.type === "string" && PRIMITIVE_TYPES.has(branch.type));
		nodeViolations = (tool, node, path, keyword) => {
			const violations = [];
			const add = (rule, detail) => violations.push({
				tool,
				schema: "input",
				path,
				rule,
				...detail === undefined ? {} : { detail }
			});
			if (!isRecord(node)) {
				if (typeof node === "boolean" && !(node === false && keyword === "additionalProperties")) add("boolean-schema");
				return violations;
			}
			for (const key of Object.keys(node)) if (!ALLOWED_KEYWORDS.has(key)) add("keyword", key);
			const { type } = node;
			if (Array.isArray(type)) add("type", "type-list");
			else if (type === undefined) {
				if (!isNullableUnion(node)) add("type", "untyped");
			} else if (type === "null" && keyword === "anyOf" && Object.keys(node).length === 1) return violations;
			else if (typeof type !== "string" || !PRIMITIVE_TYPES.has(type)) add("type", `type:${String(type)}`);
			if (type === "array" && node.items === undefined) add("array-items", "missing");
			if (node.items !== undefined && type !== "array") add("array-items", "beside-non-array-type");
			if (Array.isArray(node.items)) add("array-items", "tuple");
			if (node.enum !== undefined) {
				const values = node.enum;
				if (!Array.isArray(values) || values.length === 0) add("enum", "empty");
				else if (values.some((value) => typeof value !== "string")) add("enum", "non-string");
				else if (values.includes("")) add("enum", "empty-string");
				if (type !== "string") add("enum", "not-on-string-type");
			}
			if (node.anyOf !== undefined) {
				const branches = node.anyOf;
				if (path === "$") add("any-of", "root");
				if (!Array.isArray(branches) || branches.length < 2) add("any-of", "fewer-than-two-branches");
				else if (branches.some((branch) => !isRecord(branch) || branch.type === undefined)) add("any-of", "untyped-branch");
				if (node.properties !== undefined) add("any-of", "beside-properties");
			}
			if (typeof node.description === "string" && node.description.length > 1024) add("description-length");
			for (const bound of [
				"minLength",
				"maxLength",
				"minItems",
				"maxItems"
			]) if (typeof node[bound] === "number" && node[bound] >= 1999) add("bound", bound);
			if (isRecord(node.properties)) {
				for (const name of Object.keys(node.properties)) if (!PROPERTY_NAME.test(name)) add("property-name", name);
			}
			return violations;
		};
		advertisedInputDialectViolations = (tool) => {
			const { name, inputSchema: input } = tool;
			const violations = [];
			const whole = (schema, rule) => {
				violations.push({
					tool: name,
					schema,
					path: "$",
					rule
				});
			};
			if (!TOOL_NAME.test(name)) whole("tool", "tool-name");
			if ((tool.description ?? "").length > TOOL_DESCRIPTION_LIMIT) whole("tool", "tool-description-length");
			if (serializedBytes(input) > 13312) whole("input", "input-bytes");
			if (schemaDepth(input) > 10) whole("input", "input-depth");
			if (!isRecord(input) || input.type !== "object" || [
				"anyOf",
				"oneOf",
				"allOf"
			].some((key) => Object.hasOwn(input, key))) whole("input", "root-shape");
			visitSchemas(input, "$", (node, path, keyword) => violations.push(...nodeViolations(name, node, path, keyword)));
			violations.push(...patternViolations(name, "input", input));
			return violations;
		};
		advertisedOutputPatternViolations = (tool) => tool.outputSchema === undefined ? [] : patternViolations(tool.name, "output", tool.outputSchema);
	})))();
}

//#endregion
export { ADVERTISED_BOUND_LIMIT, ADVERTISED_DESCRIPTION_MAX_CHARACTERS, ADVERTISED_INPUT_SCHEMA_MAX_BYTES, JsonSchemaReferences, advertisedInputDialectViolations, advertisedSchemaPatterns, init_advertisedDialect, init_compactJsonSchema, init_jsonSchemaKeywords, init_jsonSchemaReferences, inlineWithinBudget, isSchemaObject, jsonValueSchema, portablePatternViolations, reduceToShallowProperties, schemaArrays, schemaChildren, schemaDepth, schemaLiteralValues, schemaMaps, schemaPointerSteps, schemaSubschemas, serializedBytes, stripAnnotations };