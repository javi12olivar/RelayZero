import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { _n as init_javascriptSemanticPrecision, gn as JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS } from "./analysisErrorProjection-B0_t_nHz.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { C as init_parseFailure, T as malformedInput, b as ParseFailureError } from "./jsonValue-BIEmjG1z.js";
import { i as strictUtf8Decoder, n as init_strictUtf8 } from "./strictUtf8-Cx_KgW8Z.js";
import * as t from "@babel/types";

//#region dist/domain/javascript/javascriptSemanticPropertyPaths.js
function joinSemanticPropertyPaths(previous, incoming) {
	if (previous.length !== incoming.length) return undefined;
	const joined = previous.map((key, index) => joinPropertySelections(key, incoming[index]));
	return joined.every((key, index) => key === previous[index]) ? previous : joined;
}
var joinPropertySelections, semanticArrayIndex, semanticPropertyPathKeyMatches, coverageNode, SemanticPropertyPathCoverage, keyCovers;
function init_javascriptSemanticPropertyPaths() {
	return (init_javascriptSemanticPropertyPaths = __esmMin((() => {
		joinPropertySelections = (previous, incoming) => {
			if (keyCovers(previous, incoming)) return previous;
			if (keyCovers(incoming, previous)) return incoming;
			if (previous === null || incoming === null) return null;
			if (typeof previous !== "object" && typeof incoming !== "object") return null;
			if (typeof previous === "object" && typeof incoming === "object") return {
				excludedKeys: previous.excludedKeys.filter((key) => incoming.excludedKeys.includes(key)),
				...previous.startIndex === undefined || incoming.startIndex === undefined ? {} : { startIndex: Math.min(previous.startIndex, incoming.startIndex) }
			};
			const selected = typeof previous === "object" ? previous : incoming;
			const scalar = typeof previous === "object" ? incoming : previous;
			if (typeof selected !== "object" || typeof scalar === "object") return null;
			const index = semanticArrayIndex(scalar);
			return {
				excludedKeys: selected.excludedKeys.filter((key) => key !== String(scalar)),
				...selected.startIndex === undefined || index === null ? {} : { startIndex: Math.min(selected.startIndex, index) }
			};
		};
		semanticArrayIndex = (key) => {
			const index = Number(key);
			return Number.isInteger(index) && index >= 0 && index < 4294967295 && String(index) === String(key) ? index : null;
		};
		semanticPropertyPathKeyMatches = (key, name) => {
			if (key === null) return true;
			if (typeof key !== "object") return String(key) === name;
			if (key.excludedKeys.includes(name)) return false;
			if (key.startIndex === undefined) return true;
			const index = semanticArrayIndex(name);
			return index !== null && index >= key.startIndex;
		};
		coverageNode = () => ({
			terminal: false,
			exact: new Map(),
			selectors: new Map()
		});
		SemanticPropertyPathCoverage = class {
			#root = coverageNode();
			/** Match optional per-slot receiver identities along the covering prefix. */
			retain(path, contexts) {
				if (this.covers(path, contexts)) return false;
				let node = this.#root;
				for (const [offset, key] of path.entries()) {
					const context = contexts?.[offset];
					if (key !== null && typeof key !== "object") {
						const name = JSON.stringify([String(key), context]);
						let child = node.exact.get(name);
						if (child === undefined) {
							child = coverageNode();
							node.exact.set(name, child);
						}
						node = child;
					} else {
						const identity = JSON.stringify([key, context]);
						let selected = node.selectors.get(identity);
						if (selected === undefined) {
							selected = {
								key,
								context,
								node: coverageNode()
							};
							node.selectors.set(identity, selected);
						}
						node = selected.node;
					}
				}
				node.terminal = true;
				node.exact.clear();
				node.selectors.clear();
				return true;
			}
			/** Query retained prefixes without changing the coverage index. */
			covers(path, contexts) {
				return this.#reaches(path, contexts, false);
			}
			/** Whether a retained prefix covers this path or any member below it. */
			touches(path, contexts) {
				return this.#reaches(path, contexts, true);
			}
			#reaches(path, contexts, below) {
				const pending = [{
					node: this.#root,
					offset: 0
				}];
				while (pending.length > 0) {
					const current = pending.pop();
					if (current === undefined) break;
					if (current.node.terminal) return true;
					const key = path[current.offset];
					if (key === undefined) {
						if (below && (current.node.exact.size > 0 || current.node.selectors.size > 0)) return true;
						continue;
					}
					const context = contexts?.[current.offset];
					if (key !== null && typeof key !== "object") {
						const exact = current.node.exact.get(JSON.stringify([String(key), context]));
						if (exact !== undefined) pending.push({
							node: exact,
							offset: current.offset + 1
						});
					}
					for (const selected of current.node.selectors.values()) {
						if (selected.context === context && keyCovers(selected.key, key)) pending.push({
							node: selected.node,
							offset: current.offset + 1
						});
					}
				}
				return false;
			}
		};
		keyCovers = (covering, key) => {
			if (covering === null) return true;
			if (key === null) return false;
			if (typeof key !== "object") return typeof covering === "object" ? semanticPropertyPathKeyMatches(covering, String(key)) : String(covering) === String(key);
			return typeof covering === "object" && covering.excludedKeys.every((name) => key.excludedKeys.includes(name)) && (covering.startIndex === undefined || key.startIndex !== undefined && covering.startIndex <= key.startIndex);
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptAstValues.js
/** Visit binding and member leaves in direct and destructuring write targets. */
function* semanticWriteTargets(root) {
	const pending = [root];
	while (pending.length > 0) {
		const next = pending.pop();
		if (next === undefined) break;
		const node = unwrapJavaScriptExpression(next).node;
		if (t.isIdentifier(node) || t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) yield node;
		else if (t.isRestElement(node)) pending.push(node.argument);
		else if (t.isAssignmentPattern(node)) pending.push(node.left);
		else if (t.isArrayPattern(node)) {
			for (const element of node.elements.toReversed()) if (element !== null) pending.push(element);
		} else if (t.isObjectPattern(node)) {
			for (const property of node.properties.toReversed()) pending.push(t.isRestElement(property) ? property.argument : property.value);
		}
	}
}
var javaScriptComputedDefinitionKey, javaScriptDefinitionExpression, isRuntimeJavaScriptClassProperty, runtimeFunctionParameters, javaScriptExpressionWrapperTarget, unwrapJavaScriptExpression, readExactJavaScriptLiteral, propertyName, semanticStaticPropertyName, semanticStaticPropertyKey, staticJavaScriptTruthiness, isNullishJavaScriptSyntax, objectDataPropertyValue, PROPERTYLESS_UNARY, PROPERTYLESS_BINARY, primitiveOwnKeys, UNKNOWN_STATIC_OBJECT_MEMBER, isObjectPrototypeSetter, appendStaticObjectMembers, appendEnumerableSourceMembers, staticObjectMembers, staticObjectPropertySource, readStaticObjectProperty, staticObjectPropertyReader, staticObjectCopyPropertyReader, indexStaticObjectProperties, staticObjectProperty, staticObjectOwnMethodReader, staticObjectPropertyNames, semanticFinalObjectProperty, semanticFinalObjectStringProperty, semanticObjectPatternKeys, semanticWriteSiteTarget, semanticWriteSiteReadsFirst, semanticWrappedWriteSite, javascriptDisplayText, semanticMemberChain;
function init_javascriptAstValues() {
	return (init_javascriptAstValues = __esmMin((() => {
		init_javascriptSemanticPropertyPaths();
		javaScriptComputedDefinitionKey = (parent, child) => (t.isObjectMethod(parent) || t.isClassMethod(parent) || t.isClassProperty(parent) || t.isClassAccessorProperty(parent)) && parent.computed && parent.key === child;
		javaScriptDefinitionExpression = (parent, child) => t.isDecorator(child) || javaScriptComputedDefinitionKey(parent, child);
		isRuntimeJavaScriptClassProperty = (node) => t.isClassProperty(node) && node.declare !== true && node.abstract !== true;
		runtimeFunctionParameters = (node) => t.isIdentifier(node.params[0], { name: "this" }) ? node.params.slice(1) : node.params;
		javaScriptExpressionWrapperTarget = (node) => t.isParenthesizedExpression(node) || t.isTSAsExpression(node) || t.isTSTypeAssertion(node) || t.isTSNonNullExpression(node) || t.isTSSatisfiesExpression(node) || t.isTSInstantiationExpression(node) || t.isTypeCastExpression(node) ? node.expression : undefined;
		unwrapJavaScriptExpression = (node, options) => {
			let current = node;
			let depth = 0;
			for (;;) {
				const target = javaScriptExpressionWrapperTarget(current);
				if (target === undefined) break;
				if (options?.stopAtParentheses === true && (t.isParenthesizedExpression(current) || current.extra?.parenthesized === true)) break;
				current = target;
				depth += 1;
			}
			return {
				node: current,
				depth
			};
		};
		readExactJavaScriptLiteral = (node) => {
			node = unwrapJavaScriptExpression(node).node;
			if (t.isStringLiteral(node)) return {
				found: true,
				value: node.value
			};
			if (t.isNumericLiteral(node) && Number.isFinite(node.value)) return {
				found: true,
				value: node.value
			};
			if (t.isBooleanLiteral(node)) return {
				found: true,
				value: node.value
			};
			if (t.isNullLiteral(node)) return {
				found: true,
				value: null
			};
			if (t.isUnaryExpression(node) && (node.operator === "+" || node.operator === "-")) {
				const operand = unwrapJavaScriptExpression(node.argument).node;
				if (t.isNumericLiteral(operand)) {
					const value = node.operator === "-" ? -operand.value : operand.value;
					if (Number.isFinite(value) && !Object.is(value, -0)) return {
						found: true,
						value
					};
				}
			}
			if (t.isTemplateLiteral(node) && node.expressions.length === 0 && node.quasis.length === 1) {
				const cooked = node.quasis[0]?.value.cooked;
				return cooked === null || cooked === undefined ? { found: false } : {
					found: true,
					value: cooked
				};
			}
			return { found: false };
		};
		propertyName = (node) => {
			if (t.isIdentifier(node)) return node.name;
			if (t.isStringLiteral(node) || t.isNumericLiteral(node)) return String(node.value);
			return "";
		};
		semanticStaticPropertyName = (property, computed) => semanticStaticPropertyKey(property, computed) ?? "";
		semanticStaticPropertyKey = (property, computed) => {
			property = unwrapJavaScriptExpression(property).node;
			if (t.isStringLiteral(property) || t.isNumericLiteral(property) || t.isBooleanLiteral(property)) return String(property.value);
			if (t.isNullLiteral(property)) return "null";
			if (t.isBigIntLiteral(property)) return String(property.value);
			if (t.isUnaryExpression(property, { operator: "void" })) return "undefined";
			if (t.isUnaryExpression(property, { operator: "+" })) {
				const argument = unwrapJavaScriptExpression(property.argument).node;
				if (t.isNumericLiteral(argument)) return String(argument.value);
			}
			if (t.isUnaryExpression(property, { operator: "-" })) {
				const argument = unwrapJavaScriptExpression(property.argument).node;
				if (t.isNumericLiteral(argument)) return String(-argument.value);
				if (t.isBigIntLiteral(argument)) return String(-BigInt(argument.value));
			}
			if (t.isTemplateLiteral(property) && property.expressions.length === 0 && property.quasis.length === 1) {
				const cooked = property.quasis[0]?.value.cooked;
				return cooked === null || cooked === undefined ? null : cooked;
			}
			return !computed && t.isIdentifier(property) ? property.name : null;
		};
		staticJavaScriptTruthiness = (node) => {
			const value = unwrapJavaScriptExpression(node).node;
			if (t.isBooleanLiteral(value)) return value.value;
			if (t.isNullLiteral(value)) return false;
			if (t.isStringLiteral(value)) return value.value.length > 0;
			if (t.isNumericLiteral(value)) return value.value !== 0 && !Number.isNaN(value.value);
			if (t.isBigIntLiteral(value)) {
				try {
					return BigInt(value.value) !== 0n;
				} catch {
					return undefined;
				}
			}
			if (t.isUnaryExpression(value) && value.operator === "-" && t.isNumericLiteral(value.argument)) return value.argument.value !== 0 && !Number.isNaN(value.argument.value);
			if (t.isObjectExpression(value) || t.isArrayExpression(value) || t.isFunctionExpression(value) || t.isArrowFunctionExpression(value) || t.isClassExpression(value) || t.isRegExpLiteral(value)) return true;
			return undefined;
		};
		isNullishJavaScriptSyntax = (node) => {
			node = unwrapJavaScriptExpression(node).node;
			return t.isNullLiteral(node) || t.isUnaryExpression(node, { operator: "void" });
		};
		objectDataPropertyValue = (property) => t.isObjectProperty(property) ? property.value : property.kind === "method" ? property : undefined;
		PROPERTYLESS_UNARY = new Set([
			"+",
			"-",
			"~",
			"!",
			"void",
			"delete"
		]);
		PROPERTYLESS_BINARY = new Set([
			"-",
			"*",
			"/",
			"%",
			"**",
			"<<",
			">>",
			">>>",
			"|",
			"^",
			"&",
			"==",
			"!=",
			"===",
			"!==",
			"<",
			"<=",
			">",
			">=",
			"in",
			"instanceof"
		]);
		primitiveOwnKeys = (node, isNullish) => {
			if (t.isStringLiteral(node) || t.isTemplateLiteral(node) || t.isUnaryExpression(node) && node.operator === "typeof" || t.isBinaryExpression(node) && node.operator === "+") return "indices";
			return t.isNumericLiteral(node) || t.isBooleanLiteral(node) || t.isBigIntLiteral(node) || t.isNullLiteral(node) || t.isUnaryExpression(node) && PROPERTYLESS_UNARY.has(node.operator) || t.isUpdateExpression(node) || t.isBinaryExpression(node) && PROPERTYLESS_BINARY.has(node.operator) || isNullish?.(node) === true ? "none" : null;
		};
		UNKNOWN_STATIC_OBJECT_MEMBER = { kind: "unknown" };
		isObjectPrototypeSetter = (property, key = semanticStaticPropertyKey(property.key, property.computed)) => t.isObjectProperty(property) && !property.computed && !property.shorthand && key === "__proto__";
		appendStaticObjectMembers = (members, object, depth, isNullish) => {
			const pending = [{
				object,
				depth,
				next: 0
			}];
			while (pending.length > 0) {
				const frame = pending[pending.length - 1];
				const property = frame.object.properties[frame.next++];
				if (property === undefined) {
					pending.pop();
					continue;
				}
				const depth = frame.depth;
				if (!t.isSpreadElement(property)) {
					const key = semanticStaticPropertyKey(property.key, property.computed);
					if (t.isObjectProperty(property) && isObjectPrototypeSetter(property, key)) {
						if (depth === 0) {
							const prototype = unwrapJavaScriptExpression(property.value).node;
							const primitive = primitiveOwnKeys(prototype, isNullish);
							members.push({
								kind: "prototype-setter",
								prototype: t.isNullLiteral(prototype) ? "null" : primitive !== null ? "ignored" : "unknown"
							});
						}
						continue;
					}
					members.push({
						kind: "property",
						property,
						key
					});
					continue;
				}
				const nested = appendEnumerableSourceMembers(members, property.argument, depth, isNullish);
				if (nested !== undefined) pending.push({
					...nested,
					next: 0
				});
			}
		};
		appendEnumerableSourceMembers = (members, source, depth, isNullish) => {
			const { node: spread, depth: wrappers } = unwrapJavaScriptExpression(source);
			if (t.isObjectExpression(spread)) {
				if (spread.properties.some((entry) => t.isObjectMethod(entry, { kind: "get" }))) {
					members.push(UNKNOWN_STATIC_OBJECT_MEMBER);
					return undefined;
				}
				return {
					object: spread,
					depth: depth + wrappers + 1
				};
			}
			if (t.isArrayExpression(spread)) {
				let firstSpread = -1;
				let hasElements = false;
				for (let index = 0; index < spread.elements.length; index++) {
					const element = spread.elements[index];
					if (element == null) continue;
					hasElements = true;
					if (t.isSpreadElement(element)) {
						firstSpread = index;
						break;
					}
				}
				if (hasElements) members.push({
					kind: "array-indices",
					elements: spread.elements,
					firstSpread
				});
				return undefined;
			}
			const primitive = primitiveOwnKeys(spread, isNullish);
			if (primitive === "indices") {
				const literal = readExactJavaScriptLiteral(spread);
				const length = literal.found && typeof literal.value === "string" ? literal.value.length : null;
				if (length !== 0) members.push({
					kind: "primitive-indices",
					length
				});
				return undefined;
			}
			if (primitive === "none" || t.isFunctionExpression(spread) || t.isArrowFunctionExpression(spread) || t.isRegExpLiteral(spread)) return undefined;
			members.push(UNKNOWN_STATIC_OBJECT_MEMBER);
			return undefined;
		};
		staticObjectMembers = (object, depth, isNullish) => {
			const members = [];
			appendStaticObjectMembers(members, object, depth, isNullish);
			return members;
		};
		staticObjectPropertySource = (object, isNullish) => object === undefined ? "missing" : t.isObjectExpression(object) ? staticObjectMembers(object, 0, isNullish) : "dynamic";
		readStaticObjectProperty = (source, name) => {
			if (typeof source === "string") return { status: source };
			let prototypeMaySupply = false;
			for (let index = source.length - 1; index >= 0; index--) {
				const member = source[index];
				if (member.kind === "prototype-setter") {
					prototypeMaySupply ||= member.prototype === "unknown";
					continue;
				}
				if (member.kind === "unknown") return { status: "dynamic" };
				if (member.kind === "primitive-indices") {
					const index = semanticArrayIndex(name);
					if (index !== null && (member.length === null || index < member.length)) return { status: "dynamic" };
					continue;
				}
				if (member.kind === "array-indices") {
					const index = semanticArrayIndex(name);
					if (index !== null && (member.firstSpread >= 0 && index >= member.firstSpread || index < member.elements.length && member.elements[index] != null)) return { status: "dynamic" };
					continue;
				}
				const { property, key } = member;
				if (key === null) return { status: "dynamic" };
				if (key !== name) continue;
				const value = objectDataPropertyValue(property);
				return value === undefined ? { status: "dynamic" } : {
					status: "explicit",
					property,
					value
				};
			}
			return prototypeMaySupply ? { status: "dynamic" } : { status: "missing" };
		};
		staticObjectPropertyReader = (object, isNullish) => indexStaticObjectProperties(staticObjectPropertySource(object, isNullish));
		staticObjectCopyPropertyReader = (source, isNullish) => {
			if (source === undefined) return indexStaticObjectProperties("missing");
			const members = [];
			const nested = appendEnumerableSourceMembers(members, source, 0, isNullish);
			if (nested !== undefined) appendStaticObjectMembers(members, nested.object, nested.depth, isNullish);
			return indexStaticObjectProperties(members);
		};
		indexStaticObjectProperties = (source) => {
			if (typeof source === "string") return () => ({ status: source });
			const properties = new Map();
			let fallback = "missing";
			let hasIndexedSpread = false;
			for (let index = source.length - 1; index >= 0; index--) {
				const member = source[index];
				if (member.kind === "prototype-setter") {
					if (member.prototype === "unknown") fallback = "dynamic";
				} else if (member.kind === "primitive-indices" || member.kind === "array-indices") {
					hasIndexedSpread = true;
				} else if (member.kind === "unknown" || member.key === null) {
					fallback = "dynamic";
					break;
				} else if (!properties.has(member.key)) {
					const { property, key } = member;
					const value = objectDataPropertyValue(property);
					properties.set(key, value === undefined ? { status: "dynamic" } : {
						status: "explicit",
						property,
						value
					});
				}
			}
			return (name) => hasIndexedSpread && semanticArrayIndex(name) !== null ? readStaticObjectProperty(source, name) : properties.get(name) ?? { status: fallback };
		};
		staticObjectProperty = (object, name, isNullish) => readStaticObjectProperty(staticObjectPropertySource(object, isNullish), name);
		staticObjectOwnMethodReader = (object) => {
			if (!t.isObjectExpression(object)) return () => false;
			const methods = new Map();
			const members = staticObjectMembers(object, 0);
			for (let index = members.length - 1; index >= 0; index--) {
				const member = members[index];
				if (member.kind === "prototype-setter") continue;
				if (member.kind === "unknown") break;
				if (member.kind !== "property") continue;
				if (member.key === null) break;
				if (!methods.has(member.key)) methods.set(member.key, t.isObjectMethod(member.property) && member.property.kind === "method");
			}
			return (name) => methods.get(name) === true;
		};
		staticObjectPropertyNames = (object, isNullish) => {
			if (object === undefined) return { status: "missing" };
			if (!t.isObjectExpression(object)) return { status: "dynamic" };
			const names = new Set();
			let complete = true;
			for (const member of staticObjectMembers(object, 0, isNullish)) {
				if (member.kind === "prototype-setter") continue;
				if (member.kind === "unknown" || member.kind === "primitive-indices" || member.kind === "array-indices") {
					complete = false;
					continue;
				}
				const { key } = member;
				if (key === null) {
					complete = false;
					continue;
				}
				names.add(key);
			}
			return complete ? {
				status: "complete",
				names: [...names]
			} : {
				status: "partial",
				names: [...names]
			};
		};
		semanticFinalObjectProperty = (node, key) => {
			const property = staticObjectProperty(node, key);
			return property.status === "explicit" ? property.value : undefined;
		};
		semanticFinalObjectStringProperty = (node, key) => {
			const value = semanticFinalObjectProperty(node, key);
			if (value === undefined) return undefined;
			const literal = readExactJavaScriptLiteral(value);
			return literal.found && typeof literal.value === "string" ? literal.value : undefined;
		};
		semanticObjectPatternKeys = (pattern) => pattern.properties.flatMap((property) => {
			if (t.isRestElement(property)) return [];
			const key = semanticStaticPropertyKey(property.key, property.computed);
			return key === null ? [] : [key];
		});
		semanticWriteSiteTarget = (node) => {
			if (t.isAssignmentExpression(node)) return node.left;
			if (t.isUpdateExpression(node)) return node.argument;
			if (t.isUnaryExpression(node, { operator: "delete" })) return node.argument;
			if (t.isForOfStatement(node) || t.isForInStatement(node)) return node.left;
			return null;
		};
		semanticWriteSiteReadsFirst = (site) => t.isAssignmentExpression(site) && site.operator !== "=" || t.isUpdateExpression(site);
		semanticWrappedWriteSite = (node, parent, ancestors) => {
			const chain = ancestors.at(-1) === parent ? ancestors : [...ancestors, parent];
			for (let index = chain.length - 1; index >= 0; index -= 1) {
				const candidate = chain[index];
				if (candidate === undefined) return null;
				const target = semanticWriteSiteTarget(candidate);
				if (target !== null) return unwrapJavaScriptExpression(target).node === node ? candidate : null;
				if (unwrapJavaScriptExpression(candidate).depth === 0) return null;
			}
			return null;
		};
		javascriptDisplayText = (value) => value === "" ? "\"\"" : value;
		semanticMemberChain = (node, admit) => {
			const members = [];
			let current = node;
			while (current !== null && current !== undefined) {
				current = unwrapJavaScriptExpression(current).node;
				if (admit?.(current) === false) return undefined;
				if (!t.isMemberExpression(current) && !t.isOptionalMemberExpression(current)) break;
				const member = semanticStaticPropertyKey(current.property, current.computed);
				if (member === null || !t.isNode(current.object)) return undefined;
				members.push(member);
				current = current.object;
			}
			return {
				root: current,
				members: members.reverse()
			};
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptModuleDeclaration.js
var isErasedJavaScriptDeclaration, isUnmodeledJavaScriptRuntimeScope, TYPE_ONLY_MODULE_SIDE_EFFECT_LIMITATION, isTypeOnlyImportDeclaration, isTypeOnlyExportDeclaration, semanticStaticModuleSource, semanticImportEqualsSpecifier, isTypeOnlyImportSpecifier, isTypeOnlyExportSpecifier, semanticRuntimeExportValueSources, hasOnlyInlineTypeImportSpecifiers, hasOnlyInlineTypeExportSpecifiers, hasUncertainTypeOnlyModuleSideEffect;
function init_javascriptModuleDeclaration() {
	return (init_javascriptModuleDeclaration = __esmMin((() => {
		init_javascriptAstValues();
		isErasedJavaScriptDeclaration = (node) => t.isTSInterfaceDeclaration(node) || t.isTSTypeAliasDeclaration(node) || t.isTSDeclareFunction(node) || (t.isVariableDeclaration(node) || t.isClassDeclaration(node) || t.isTSEnumDeclaration(node) || t.isTSModuleDeclaration(node)) && node.declare === true;
		isUnmodeledJavaScriptRuntimeScope = (node) => t.isTSModuleDeclaration(node) || t.isTSEnumDeclaration(node);
		TYPE_ONLY_MODULE_SIDE_EFFECT_LIMITATION = "Compiler options are unavailable; inline type-only imports or re-exports may preserve a module side-effect dependency.";
		isTypeOnlyImportDeclaration = (node) => node.importKind === "type" || node.importKind === "typeof";
		isTypeOnlyExportDeclaration = (node) => node.exportKind === "type" || t.isExportNamedDeclaration(node) && node.declaration != null && isErasedJavaScriptDeclaration(node.declaration);
		semanticStaticModuleSource = (node) => {
			if (t.isImportDeclaration(node)) return isTypeOnlyImportDeclaration(node) ? null : node.source;
			if (t.isExportAllDeclaration(node) || t.isExportNamedDeclaration(node)) return isTypeOnlyExportDeclaration(node) ? null : node.source ?? null;
			return null;
		};
		semanticImportEqualsSpecifier = (node) => node.importKind !== "type" && t.isTSExternalModuleReference(node.moduleReference) && t.isStringLiteral(node.moduleReference.expression) ? node.moduleReference.expression.value : null;
		isTypeOnlyImportSpecifier = (node) => node.importKind === "type" || node.importKind === "typeof";
		isTypeOnlyExportSpecifier = (node) => node.exportKind === "type";
		semanticRuntimeExportValueSources = (node) => {
			if (t.isExportDefaultDeclaration(node)) return isErasedJavaScriptDeclaration(node.declaration) ? [] : [node.declaration];
			if (!t.isExportNamedDeclaration(node) || node.source != null || isTypeOnlyExportDeclaration(node)) return [];
			const values = [];
			if (t.isVariableDeclaration(node.declaration)) for (const declaration of node.declaration.declarations) for (const target of semanticWriteTargets(declaration.id)) values.push(target);
			else if ((t.isFunctionDeclaration(node.declaration) || t.isClassDeclaration(node.declaration)) && node.declaration.id != null) values.push(node.declaration.id);
			for (const specifier of node.specifiers) if (t.isExportSpecifier(specifier) && !isTypeOnlyExportSpecifier(specifier)) values.push(specifier.local);
			return values;
		};
		hasOnlyInlineTypeImportSpecifiers = (node) => !isTypeOnlyImportDeclaration(node) && node.specifiers.length > 0 && node.specifiers.every((specifier) => t.isImportSpecifier(specifier) && isTypeOnlyImportSpecifier(specifier));
		hasOnlyInlineTypeExportSpecifiers = (node) => !isTypeOnlyExportDeclaration(node) && node.source != null && node.specifiers.length > 0 && node.specifiers.every((specifier) => t.isExportSpecifier(specifier) && isTypeOnlyExportSpecifier(specifier));
		hasUncertainTypeOnlyModuleSideEffect = (program) => program.body.some((node) => t.isImportDeclaration(node) && hasOnlyInlineTypeImportSpecifiers(node) || t.isExportNamedDeclaration(node) && hasOnlyInlineTypeExportSpecifiers(node));
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticTraversal.js
/** Cooperative value-only view of the same deterministic AST traversal. */
function* traverseJavaScriptValueAstSteps(root, erasedSyntaxNodes, visitor) {
	if (erasedSyntaxNodes.has(root)) return;
	yield* traverseJavaScriptAstSteps(root, {
		...visitor,
		skip: (node) => erasedSyntaxNodes.has(node) || visitor.skip?.(node) === true
	});
}
/**
* {@link traverseJavaScriptAst} with a yield every 1,024 visited nodes, so a
* caller can serve control messages during one large traversal. Visit order
* and callbacks are identical.
*/
function* traverseJavaScriptAstSteps(root, visitor) {
	const ancestors = [];
	const enter = (node, parent) => {
		visitor.enter(node, parent, () => [...ancestors]);
		ancestors.push(node);
		return {
			node,
			parent,
			children: childNodes(node),
			nextIndex: 0
		};
	};
	const pending = [enter(root, null)];
	let visited = 1;
	while (pending.length > 0) {
		const current = pending.at(-1);
		if (current === undefined) break;
		const child = current.children[current.nextIndex];
		if (child !== undefined) {
			current.nextIndex += 1;
			if (visited % 1024 === 0) yield;
			visited += 1;
			if (visitor.skip?.(child) === true) continue;
			pending.push(enter(child, current.node));
		} else {
			visitor.exit?.(current.node, current.parent);
			ancestors.pop();
			pending.pop();
		}
	}
}
var isErasedJavaScriptValueChild, traverseJavaScriptAst, traverseJavaScriptValueAst, completeSemanticSteps, childNodes, javaScriptAstChildKeys;
function init_javascriptSemanticTraversal() {
	return (init_javascriptSemanticTraversal = __esmMin((() => {
		init_javascriptModuleDeclaration();
		isErasedJavaScriptValueChild = (node, parent) => {
			if (isErasedJavaScriptDeclaration(node) || t.isTSType(node) || t.isTSTypeElement(node) || t.isTSDeclareMethod(node) || t.isTSTypeAnnotation(node) || t.isTSTypeParameterDeclaration(node) || t.isTSTypeParameterInstantiation(node) || t.isTSClassImplements(node) || t.isTSInterfaceHeritage(node) || t.isTSInterfaceBody(node) || t.isImportDeclaration(node) && isTypeOnlyImportDeclaration(node) || (t.isExportNamedDeclaration(node) || t.isExportAllDeclaration(node)) && isTypeOnlyExportDeclaration(node) || t.isImportSpecifier(node) && isTypeOnlyImportSpecifier(node) || t.isExportSpecifier(node) && isTypeOnlyExportSpecifier(node) || t.isTSImportEqualsDeclaration(node) && node.importKind === "type") return true;
			return t.isClassProperty(parent) && (parent.declare === true || parent.abstract === true) && !t.isDecorator(node) && !(node === parent.key && parent.computed === true && (parent.decorators?.length ?? 0) > 0);
		};
		traverseJavaScriptAst = (root, visitor) => completeSemanticSteps(traverseJavaScriptAstSteps(root, visitor));
		traverseJavaScriptValueAst = (root, erasedSyntaxNodes, visitor) => completeSemanticSteps(traverseJavaScriptValueAstSteps(root, erasedSyntaxNodes, visitor));
		completeSemanticSteps = (steps) => {
			for (;;) {
				const step = steps.next();
				if (step.done === true) return step.value;
			}
		};
		childNodes = (node) => {
			const keys = javaScriptAstChildKeys(node);
			const children = [];
			for (const key of keys) {
				const value = Reflect.get(node, key);
				if (t.isNode(value)) {
					children.push(value);
					continue;
				}
				if (!Array.isArray(value)) continue;
				for (const item of value) {
					if (t.isNode(item)) children.push(item);
				}
			}
			return children;
		};
		javaScriptAstChildKeys = (node) => t.VISITOR_KEYS[node.type] ?? [];
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticResourceLimits.js
var resourceControls, semanticResourceLimitFacts, semanticPrecisionControl, semanticPrecisionControls, semanticResourceLimitReason, jsonStringBytesFromLength, exceedsSemanticPrimitiveStringByteBudget, exceedsSemanticPrimitiveAdditionByteBudget, exceedsSemanticTemplateByteBudget, semanticResourceLimitUnknown;
function init_javascriptSemanticResourceLimits() {
	return (init_javascriptSemanticResourceLimits = __esmMin((() => {
		init_javascriptSemanticPrecision();
		resourceControls = {
			"primitive-candidates": [
				"primitive_candidates",
				"items",
				"alternatives"
			],
			"primitive-bytes": [
				"primitive_bytes",
				"bytes",
				"estimated JSON bytes"
			],
			"expression-depth": [
				"expression_depth",
				"depth",
				"nested expressions"
			],
			"getter-expansion": [
				"getter_expansions",
				"items",
				"scheduled states"
			],
			"alias-selections": [
				"alias_selections",
				"items",
				"additional selector states"
			]
		};
		semanticResourceLimitFacts = (resourceLimit, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
			const [control, unit, displayUnit] = resourceControls[resourceLimit];
			return {
				control,
				unit,
				displayUnit,
				value: precision[control],
				defaultValue: JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS[control]
			};
		};
		semanticPrecisionControl = (control, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => ({
			control_kind: "parameter",
			parameter: `semantic_precision.${control}`,
			effective_value: precision[control],
			unit: control === "primitive_bytes" ? "bytes" : "count",
			minimum: 1,
			maximum: Number.MAX_SAFE_INTEGER,
			default_value: JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS[control],
			applies_at: "next_call"
		});
		semanticPrecisionControls = (resourceLimits, controls, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
			const reached = new Set(controls);
			for (const limit of resourceLimits) reached.add(resourceControls[limit][0]);
			return Object.keys(JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS).filter((control) => reached.has(control)).map((control) => semanticPrecisionControl(control, precision));
		};
		semanticResourceLimitReason = (resourceLimit, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
			const { control, displayUnit, value, defaultValue } = semanticResourceLimitFacts(resourceLimit, precision);
			const prefixes = {
				"primitive-candidates": `Primitive candidate budget exceeded (maximum ${String(precision.primitive_candidates)} alternatives).`,
				"primitive-bytes": `Primitive string-byte budget exceeded (maximum ${String(precision.primitive_bytes)} estimated JSON bytes).`,
				"expression-depth": `Semantic expression depth budget exceeded (maximum ${String(precision.expression_depth)} nested expressions).`,
				"getter-expansion": `Getter expansion was conservatively bounded (maximum ${String(precision.getter_expansions)} scheduled states or a growing receiver cycle).`,
				"alias-selections": `Alias selection expansion was conservatively bounded (maximum ${String(precision.alias_selections)} additional selector states); selected paths remain unknown.`
			};
			return `${prefixes[resourceLimit]} Semantic ${resourceLimit} budget reached: semantic_precision.${control}=${String(value)} ${displayUnit} (default ${String(defaultValue)}). Increase semantic_precision.${control} on the next analysis call (analyze_javascript_application or analyze_web_bundle); no REA restart is required. Worker memory, transfer and graph-retention limits remain independent. Cyclic or unsupported evaluations remain unknown regardless of budget.`;
		};
		jsonStringBytesFromLength = (codeUnits) => codeUnits * 6 + 2;
		exceedsSemanticPrimitiveStringByteBudget = (strings, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
			let total = 0;
			for (const value of strings) {
				total += jsonStringBytesFromLength(value.length);
				if (total > precision.primitive_bytes) return true;
			}
			return false;
		};
		exceedsSemanticPrimitiveAdditionByteBudget = (left, right, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
			let total = 0;
			for (const leftValue of left) {
				for (const rightValue of right) {
					if (typeof leftValue !== "string" && typeof rightValue !== "string") continue;
					const length = String(leftValue).length + String(rightValue).length;
					total += jsonStringBytesFromLength(length);
					if (total > precision.primitive_bytes) return true;
				}
			}
			return false;
		};
		exceedsSemanticTemplateByteBudget = (prefixes, suffixes, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
			let total = 0;
			for (const prefix of prefixes) {
				for (const suffix of suffixes) {
					total += jsonStringBytesFromLength(prefix.length + suffix.length);
					if (total > precision.primitive_bytes) return true;
				}
			}
			return false;
		};
		semanticResourceLimitUnknown = (resourceLimit, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => ({
			status: "unknown",
			reason: semanticResourceLimitReason(resourceLimit, precision),
			resourceLimit
		});
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticCoverage.js
var RETURNED_REFERENCE_WIDENING_LIMITATION, semanticCoverage, semanticCoverageResourceLimits, semanticResourceLimitCoverage, semanticReturnCoverage;
function init_javascriptSemanticCoverage() {
	return (init_javascriptSemanticCoverage = __esmMin((() => {
		init_javascriptSemanticResourceLimits();
		init_javascriptSemanticPrecision();
		RETURNED_REFERENCE_WIDENING_LIMITATION = "Local returned-reference projections were conservatively widened; effects include additional source-local candidates.";
		semanticCoverage = (parserPartial, resourceLimits = [], widenedReturnedReferences = [], precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
			const details = {
				...widenedReturnedReferences.length > 0 ? { widenedReturnedReferences } : {},
				...precision === JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS ? {} : { precision }
			};
			if (resourceLimits.length > 0) return {
				status: "partial",
				omittedCount: null,
				resourceLimits,
				...details
			};
			return {
				status: parserPartial || widenedReturnedReferences.length > 0 ? "partial" : "complete",
				omittedCount: 0,
				...details
			};
		};
		semanticCoverageResourceLimits = (coverage) => coverage.resourceLimits ?? [];
		semanticResourceLimitCoverage = (resourceLimits, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => resourceLimits.map((resourceLimit) => {
			const { value, unit } = semanticResourceLimitFacts(resourceLimit, precision);
			return {
				name: `javascript_semantic_${resourceLimit.replaceAll("-", "_")}`,
				value,
				unit
			};
		});
		semanticReturnCoverage = (retainedCount, parserPartial) => ({
			status: parserPartial ? "partial" : "complete",
			retainedCount,
			omittedCount: 0
		});
	})))();
}

//#endregion
//#region dist/process/Utf8NdjsonLineBuffer.js
var Utf8NdjsonOversizeError, Utf8NdjsonLineBuffer;
function init_Utf8NdjsonLineBuffer() {
	return (init_Utf8NdjsonLineBuffer = __esmMin((() => {
		init_strictUtf8();
		init_parseFailure();
		init_result();
		Utf8NdjsonOversizeError = class extends ParseFailureError {
			maximumBytes;
			observedBytes;
			boundary;
			constructor(maximumBytes, observedBytes, boundary = "line") {
				super({
					kind: "limit",
					format: "ndjson",
					detail: `NDJSON line reached ${String(observedBytes)} bytes, above the ${String(maximumBytes)}-byte line limit`,
					limit: {
						name: "ndjson-line-bytes",
						maximum: maximumBytes
					}
				});
				this.maximumBytes = maximumBytes;
				this.observedBytes = observedBytes;
				this.boundary = boundary;
				this.name = "Utf8NdjsonOversizeError";
			}
		};
		Utf8NdjsonLineBuffer = class {
			#buffer = Buffer.alloc(0);
			#fragments = [];
			#fragmentBytes = 0;
			#nextNewline = -1;
			#maxLineBytes;
			#decoder = strictUtf8Decoder("preserve");
			constructor(maxLineBytes) {
				this.#maxLineBytes = maxLineBytes;
			}
			/**
			* Yield each complete trimmed nonblank line; preserve unconsumed lines on
			* early return. A line that is not UTF-8 is yielded as a failure and ends
			* the iteration. A line or the tail still waiting for its LF above the
			* ceiling is yielded as `Utf8NdjsonOversizeError`, after discarding every
			* buffered byte, and ends the iteration.
			* This bridge projection trims U+FEFF and other ECMAScript whitespace.
			* Exact JSON parsers use `pushRaw` to keep the decoded line intact.
			*/
			*push(chunk) {
				for (const line of this.pushRaw(chunk)) {
					if (!line.ok) {
						yield line;
						return;
					}
					const trimmed = line.value.trim();
					if (trimmed.length > 0) yield ok(trimmed);
				}
			}
			/** Deliver exact decoded lines, including blanks and leading U+FEFF. */
			*pushRaw(chunk) {
				const maximumBytes = this.#maxLineBytes();
				this.#fragments.push(chunk);
				this.#fragmentBytes += chunk.length;
				if (!chunk.includes(10) && this.#nextNewline < 0) {
					const refused = this.#refuseTail(maximumBytes);
					if (refused !== undefined) yield err(refused);
					return;
				}
				this.#buffer = Buffer.concat([this.#buffer, ...this.#fragments]);
				this.#fragments = [];
				this.#fragmentBytes = 0;
				if (this.#nextNewline < 0) this.#nextNewline = this.#buffer.indexOf(10);
				while (this.#nextNewline >= 0) {
					if (this.#nextNewline > maximumBytes) {
						const observedBytes = this.#nextNewline;
						this.reset();
						yield err(new Utf8NdjsonOversizeError(maximumBytes, observedBytes));
						return;
					}
					const encodedLine = this.#buffer.subarray(0, this.#nextNewline);
					const rest = this.#buffer.subarray(this.#nextNewline + 1);
					this.#buffer = rest.length === 0 ? Buffer.alloc(0) : rest;
					this.#nextNewline = this.#buffer.indexOf(10);
					const line = this.#decode(encodedLine);
					yield line;
					if (!line.ok) return;
				}
				const refused = this.#refuseTail(maximumBytes);
				if (refused !== undefined) {
					yield err(refused);
					return;
				}
				if (this.#buffer.buffer.byteLength > Math.max(Buffer.poolSize, 2 * this.#buffer.length)) {
					const tail = Buffer.allocUnsafeSlow(this.#buffer.length);
					this.#buffer.copy(tail);
					this.#buffer = tail;
				}
			}
			/** Validate the unfinished tail at EOF without treating it as a complete response. */
			finish() {
				const tail = this.#decode(Buffer.concat([this.#buffer, ...this.#fragments]));
				return tail.ok ? ok(null) : tail;
			}
			#refuseTail(maximumBytes) {
				const pendingBytes = this.pendingBytes;
				if (this.#nextNewline >= 0 || pendingBytes <= maximumBytes) return undefined;
				this.reset();
				return new Utf8NdjsonOversizeError(maximumBytes, pendingBytes, "tail");
			}
			#decode(bytes) {
				try {
					return ok(this.#decoder.decode(bytes));
				} catch (cause) {
					if (!(cause instanceof TypeError)) throw cause;
					return err(malformedInput("ndjson", "NDJSON frame is not valid UTF-8", { cause }));
				}
			}
			reset() {
				this.#buffer = Buffer.alloc(0);
				this.#fragments = [];
				this.#fragmentBytes = 0;
				this.#nextNewline = -1;
			}
			get pendingBytes() {
				return this.#buffer.length + this.#fragmentBytes;
			}
			/** Bytes still held after complete lines are removed. An empty tail keeps no drained frame. */
			retainedTail() {
				const pendingBytes = this.pendingBytes;
				const backingBytes = this.#buffer.buffer.byteLength + this.#fragments.reduce((sum, fragment) => sum + fragment.buffer.byteLength, 0);
				return {
					pendingBytes,
					backingBytes
				};
			}
		};
	})))();
}

//#endregion
export { semanticFinalObjectProperty as $, init_javascriptModuleDeclaration as A, init_javascriptAstValues as B, traverseJavaScriptAstSteps as C, hasOnlyInlineTypeExportSpecifiers as D, TYPE_ONLY_MODULE_SIDE_EFFECT_LIMITATION as E, isTypeOnlyImportSpecifier as F, javaScriptDefinitionExpression as G, isObjectPrototypeSetter as H, isUnmodeledJavaScriptRuntimeScope as I, objectDataPropertyValue as J, javaScriptExpressionWrapperTarget as K, semanticImportEqualsSpecifier as L, isTypeOnlyExportDeclaration as M, isTypeOnlyExportSpecifier as N, hasOnlyInlineTypeImportSpecifiers as O, isTypeOnlyImportDeclaration as P, runtimeFunctionParameters as Q, semanticRuntimeExportValueSources as R, traverseJavaScriptAst as S, traverseJavaScriptValueAstSteps as T, isRuntimeJavaScriptClassProperty as U, isNullishJavaScriptSyntax as V, javaScriptComputedDefinitionKey as W, propertyName as X, primitiveOwnKeys as Y, readExactJavaScriptLiteral as Z, childNodes as _, joinSemanticPropertyPaths as _t, init_javascriptSemanticCoverage as a, semanticWrappedWriteSite as at, isErasedJavaScriptValueChild as b, semanticResourceLimitCoverage as c, semanticWriteTargets as ct, exceedsSemanticPrimitiveStringByteBudget as d, staticObjectOwnMethodReader as dt, semanticFinalObjectStringProperty as et, exceedsSemanticTemplateByteBudget as f, staticObjectProperty as ft, semanticResourceLimitUnknown as g, init_javascriptSemanticPropertyPaths as gt, semanticResourceLimitReason as h, SemanticPropertyPathCoverage as ht, RETURNED_REFERENCE_WIDENING_LIMITATION as i, semanticStaticPropertyName as it, isErasedJavaScriptDeclaration as j, hasUncertainTypeOnlyModuleSideEffect as k, semanticReturnCoverage as l, staticJavaScriptTruthiness as lt, semanticPrecisionControls as m, unwrapJavaScriptExpression as mt, Utf8NdjsonOversizeError as n, semanticObjectPatternKeys as nt, semanticCoverage as o, semanticWriteSiteReadsFirst as ot, init_javascriptSemanticResourceLimits as p, staticObjectPropertyReader as pt, javascriptDisplayText as q, init_Utf8NdjsonLineBuffer as r, semanticStaticPropertyKey as rt, semanticCoverageResourceLimits as s, semanticWriteSiteTarget as st, Utf8NdjsonLineBuffer as t, semanticMemberChain as tt, exceedsSemanticPrimitiveAdditionByteBudget as u, staticObjectCopyPropertyReader as ut, completeSemanticSteps as v, semanticArrayIndex as vt, traverseJavaScriptValueAst as w, javaScriptAstChildKeys as x, init_javascriptSemanticTraversal as y, semanticPropertyPathKeyMatches as yt, semanticStaticModuleSource as z };