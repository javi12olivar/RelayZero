import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, init_parseFailure } from "./jsonSerialization-DAF9DVXC.js";
import { init_javascriptArtifactFiles, isJavaScriptSourcePath } from "./javascriptArtifactFiles-DG1s4eez.js";
import { posix } from "node:path";
import * as t from "@babel/types";
import { parse } from "@babel/parser";

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
//#region dist/domain/javascript/javascriptModuleResolutionMode.js
var isJsonModuleTarget, isNativeAddonModuleTarget, explicitJavaScriptLoaderMode, hasCaseVariantJavaScriptLoaderSuffix, moduleResolutionModeForJavaScriptReference;
function init_javascriptModuleResolutionMode() {
	return (init_javascriptModuleResolutionMode = __esmMin((() => {
		isJsonModuleTarget = (path, kind) => posix.extname(path) === ".json" && (kind === "json" || kind === "package-json");
		isNativeAddonModuleTarget = (path, kind) => posix.extname(path) === ".node" && kind === "native-addon";
		explicitJavaScriptLoaderMode = (path) => {
			switch (path === undefined ? undefined : posix.extname(path)) {
				case ".mjs":
				case ".mts": return "module";
				case ".cjs":
				case ".cts": return "commonjs";
				default: return undefined;
			}
		};
		hasCaseVariantJavaScriptLoaderSuffix = (path) => {
			if (path === undefined) return false;
			const suffix = /\.(?:js|ts|mjs|cjs|mts|cts)$/iu.exec(path)?.[0];
			return suffix !== undefined && suffix !== suffix.toLowerCase();
		};
		moduleResolutionModeForJavaScriptReference = (sourcePath, referenceKind, explicitMode) => {
			if (explicitMode !== undefined) return explicitMode;
			if (referenceKind === "require") return "require";
			if (referenceKind === "dynamic-import") return "import";
			const loaderMode = explicitJavaScriptLoaderMode(sourcePath);
			if (loaderMode !== undefined) return loaderMode === "commonjs" ? "require" : "import";
			const extension = posix.extname(sourcePath).toLowerCase();
			if (extension === ".ts" || extension === ".tsx") return "compiler-dependent";
			return "import";
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSourceParser.js
var JavaScriptLoaderSyntaxError, contextByProgram, javaScriptRuntimeContext, javaScriptSourceLoaderCondition, isSuffixOnlySourcePath, javaScriptProgramStrictness, javaScriptStrictnessAt, hasRuntimeModuleDeclaration, hasCommonJsRuntime, hasCommonJsWrapper, detectsJavaScriptLoader, COMMONJS_WRAPPER_PARAMETERS, recoveredJavaScriptSyntaxErrorCount, commonJsWrapperRedeclarationCount, lexicalWrapperBindings, parserOptionsForLoader, parseBabelFile, parseWithLoaderGrammar, parseWithRuntimeContext, sourceSyntaxPlugins, javaScriptPlugins, typeScriptSourceSuffix, isTypeScriptSourcePath, parserPluginsForPath, runtimeSourceTypeForPath, packageContextForPath, parseRecoveredJavaScript, parseStaticJavaScriptSource, parseJavaScriptSource, parseCapturedJavaScriptSource, javaScriptThisOwner;
function init_javascriptSourceParser() {
	return (init_javascriptSourceParser = __esmMin((() => {
		init_javascriptArtifactFiles();
		init_parseFailure();
		init_javascriptAstValues();
		init_javascriptModuleResolutionMode();
		init_javascriptModuleDeclaration();
		JavaScriptLoaderSyntaxError = class extends ParseFailureError {
			name = "JavaScriptLoaderSyntaxError";
			reasonCode = "CommonJsWrapperLexicalDeclaration";
			pos;
			loc;
			constructor(binding) {
				const start = binding.loc?.start;
				if (start === undefined || binding.start == null) throw new TypeError("Parsed wrapper binding has no source location");
				super({
					kind: "malformed",
					format: "javascript-commonjs",
					field: binding.name,
					detail: `Identifier '${binding.name}' redeclares a CommonJS wrapper parameter. (${start.line}:${start.column})`
				});
				this.pos = binding.start;
				this.loc = {
					line: start.line,
					column: start.column,
					index: binding.start
				};
			}
		};
		contextByProgram = new WeakMap();
		javaScriptRuntimeContext = (program) => contextByProgram.get(program)?.runtime ?? "unknown";
		javaScriptSourceLoaderCondition = (program) => contextByProgram.get(program)?.loaderCondition;
		isSuffixOnlySourcePath = (path) => path !== undefined && posix.extname(path) === "" && isJavaScriptSourcePath(path);
		javaScriptProgramStrictness = (program) => {
			if (program.directives.some(({ value }) => value.value === "use strict")) return "strict";
			const context = javaScriptRuntimeContext(program);
			return context === "module" ? "strict" : context === "commonjs" ? "sloppy" : "unknown";
		};
		javaScriptStrictnessAt = (node, parents) => {
			for (let current = node; current !== undefined; current = parents.get(current)) {
				if (t.isClass(current)) return "strict";
				if (t.isFunction(current) && t.isBlockStatement(current.body) && current.body.directives.some(({ value }) => value.value === "use strict")) return "strict";
				if (t.isProgram(current)) return javaScriptProgramStrictness(current);
			}
			return "unknown";
		};
		hasRuntimeModuleDeclaration = (program) => program.body.some((node) => {
			if (t.isTSImportEqualsDeclaration(node)) return semanticImportEqualsSpecifier(node) !== null;
			if (t.isImportDeclaration(node)) return !isTypeOnlyImportDeclaration(node) && !hasOnlyInlineTypeImportSpecifiers(node);
			if (t.isExportNamedDeclaration(node) || t.isExportAllDeclaration(node)) return !isTypeOnlyExportDeclaration(node) && (!t.isExportNamedDeclaration(node) || !hasOnlyInlineTypeExportSpecifiers(node) && (node.declaration == null || !isErasedJavaScriptDeclaration(node.declaration)));
			return t.isExportDefaultDeclaration(node) && !isErasedJavaScriptDeclaration(node.declaration);
		});
		hasCommonJsRuntime = (sourcePath, packageContext) => {
			const filenameMode = explicitJavaScriptLoaderMode(sourcePath);
			return filenameMode === "commonjs" ? !/\.d\.cts$/iu.test(sourcePath ?? "") : filenameMode === undefined && packageContext === "commonjs";
		};
		hasCommonJsWrapper = (sourcePath, packageContext) => hasCommonJsRuntime(sourcePath, packageContext) && [".cjs", ".js"].includes(posix.extname(sourcePath ?? ""));
		detectsJavaScriptLoader = (sourcePath, packageContext) => packageContext === "unspecified" && posix.extname(sourcePath ?? "") === ".js";
		COMMONJS_WRAPPER_PARAMETERS = new Set([
			"exports",
			"require",
			"module",
			"__filename",
			"__dirname"
		]);
		recoveredJavaScriptSyntaxErrorCount = (errors) => errors.filter((error) => !(error instanceof JavaScriptLoaderSyntaxError)).length;
		commonJsWrapperRedeclarationCount = (errors) => errors.filter((error) => error instanceof JavaScriptLoaderSyntaxError).length;
		lexicalWrapperBindings = (program) => {
			const bindings = new Map();
			for (const statement of program.body) {
				if (!(t.isVariableDeclaration(statement) && statement.kind !== "var") && !t.isClassDeclaration(statement)) continue;
				for (const identifier of Object.values(t.getBindingIdentifiers(statement))) if (COMMONJS_WRAPPER_PARAMETERS.has(identifier.name) && !bindings.has(identifier.name)) bindings.set(identifier.name, identifier);
			}
			return [...bindings.values()];
		};
		parserOptionsForLoader = (sourcePath, options, packageContext) => {
			const filenameMode = explicitJavaScriptLoaderMode(sourcePath);
			const module = filenameMode === "module" || filenameMode === undefined && packageContext === "module";
			const parserOptions = {
				...options,
				plugins: options.plugins ?? parserPluginsForPath(sourcePath),
				...module ? {
					sourceType: "module",
					allowReturnOutsideFunction: false,
					allowNewTargetOutsideFunction: false
				} : options.sourceType === "script" && hasCommonJsWrapper(sourcePath, packageContext) ? {
					allowReturnOutsideFunction: true,
					allowNewTargetOutsideFunction: true
				} : detectsJavaScriptLoader(sourcePath, packageContext) || isTypeScriptSourcePath(sourcePath) ? {
					allowReturnOutsideFunction: false,
					allowNewTargetOutsideFunction: false
				} : {}
			};
			if (parserOptions.sourceType === "commonjs") {
				delete parserOptions.allowAwaitOutsideFunction;
				delete parserOptions.allowReturnOutsideFunction;
				delete parserOptions.allowNewTargetOutsideFunction;
			}
			return parserOptions;
		};
		parseBabelFile = (source, options) => {
			const { comments, tokens, errors, ...file } = parse(source, options);
			return {
				...file,
				errors: errors.length === 0 ? errors : errors.filter(({ reasonCode }) => reasonCode !== "ReservedTypeAssertion"),
				...comments === undefined ? {} : { comments },
				...tokens === undefined ? {} : { tokens }
			};
		};
		parseWithLoaderGrammar = (source, sourcePath, options, packageContext) => {
			let file = parseBabelFile(source, parserOptionsForLoader(sourcePath, options, packageContext));
			const wrapper = hasCommonJsWrapper(sourcePath, packageContext);
			const detecting = detectsJavaScriptLoader(sourcePath, packageContext);
			const wrapperBindings = wrapper || detecting ? lexicalWrapperBindings(file.program) : [];
			if (detecting && file.program.sourceType === "script" && wrapperBindings.length > 0) {
				file = parseBabelFile(source, parserOptionsForLoader(sourcePath, {
					...options,
					sourceType: "module"
				}, packageContext));
			}
			if (wrapper && file.program.sourceType === "script") for (const identifier of wrapperBindings) {
				file.errors.push(new JavaScriptLoaderSyntaxError(identifier));
			}
			return file;
		};
		parseWithRuntimeContext = (source, sourcePath, options, observedPackageType) => {
			const filenameMode = explicitJavaScriptLoaderMode(sourcePath);
			const packageContext = packageContextForPath(sourcePath, observedPackageType);
			const suffixOnlySource = isSuffixOnlySourcePath(sourcePath);
			const ambiguousHashbangPath = posix.extname(sourcePath ?? "") === ".js" || suffixOnlySource;
			const signaturePackageContext = ambiguousHashbangPath ? observedPackageType : packageContext;
			const compilerSource = /\.jsx$/iu.test(sourcePath ?? "") || isTypeScriptSourcePath(sourcePath);
			const signedHashbang = source.startsWith("﻿#!");
			const conditionalCommonJs = signedHashbang && !compilerSource && (filenameMode === "commonjs" || signaturePackageContext === "commonjs");
			const compilerCommonJsDotfile = compilerSource && suffixOnlySource && signaturePackageContext === "commonjs";
			const observedModuleDotfile = suffixOnlySource && signaturePackageContext === "module";
			const ambiguousLoader = signedHashbang && ambiguousHashbangPath && (signaturePackageContext === undefined || signaturePackageContext === "unknown" || signaturePackageContext === "unspecified" || observedModuleDotfile || compilerCommonJsDotfile);
			const loaderCondition = conditionalCommonJs ? `Source in ${sourcePath ?? "<unknown>"} is recovered as CommonJS when imported through the ES module loader. Direct execution and require can reject this BOM/hashbang.` : ambiguousLoader ? observedModuleDotfile ? `Source in ${sourcePath ?? "<unknown>"} is recovered under an ES module interpretation. Its loader invocation is unknown; direct entrypoint and module import can differ.` : compilerCommonJsDotfile ? `Source in ${sourcePath ?? "<unknown>"} is recovered with compiler syntax. Its loader invocation is conditional: direct CommonJS loading can reject this BOM/hashbang.` : `Source in ${sourcePath ?? "<unknown>"} is recovered under a conditional loader interpretation. Its package loader mode is unknown.` : undefined;
			const hashbangSignature = signedHashbang && (compilerSource || conditionalCommonJs || ambiguousLoader || filenameMode === "module" || filenameMode === undefined && signaturePackageContext === "module");
			const parserOptions = { ...options };
			if (conditionalCommonJs) {
				parserOptions.sourceType = "commonjs";
				delete parserOptions.allowAwaitOutsideFunction;
				delete parserOptions.allowReturnOutsideFunction;
				delete parserOptions.allowNewTargetOutsideFunction;
			}
			const file = parseWithLoaderGrammar(hashbangSignature ? source.slice(1) : source, sourcePath, hashbangSignature ? {
				...parserOptions,
				...observedModuleDotfile ? { sourceType: "module" } : {},
				startIndex: (options.startIndex ?? 0) + 1,
				startColumn: (options.startColumn ?? 0) + 1
			} : options, packageContext);
			const runtime = conditionalCommonJs && suffixOnlySource ? "commonjs" : ambiguousLoader ? "unknown" : filenameMode === "commonjs" ? sourcePath?.toLowerCase().endsWith(".d.cts") ? "unknown" : "commonjs" : filenameMode === "module" ? "module" : packageContext === "module" || packageContext === "commonjs" ? packageContext : packageContext === "unspecified" && posix.extname(sourcePath ?? "") === ".js" ? file.program.sourceType === "module" ? "module" : "commonjs" : hasCaseVariantJavaScriptLoaderSuffix(sourcePath) ? "unknown" : file.program.body.some((node) => t.isTSExportAssignment(node)) ? "commonjs" : file.program.sourceType === "module" && hasRuntimeModuleDeclaration(file.program) ? "module" : "unknown";
			contextByProgram.set(file.program, {
				runtime,
				...loaderCondition === undefined ? {} : { loaderCondition }
			});
			return file;
		};
		sourceSyntaxPlugins = ["decorators-legacy", "sourcePhaseImports"];
		javaScriptPlugins = () => [...sourceSyntaxPlugins, "jsx"];
		typeScriptSourceSuffix = /\.(?:(?<declaration>d)\.)?(?:(?<module>[cm])ts|ts(?<jsx>x)?)$/iu;
		isTypeScriptSourcePath = (sourcePath) => typeScriptSourceSuffix.test(sourcePath ?? "");
		parserPluginsForPath = (sourcePath) => {
			const path = sourcePath ?? "";
			if (/\.(?:js|jsx|mjs|cjs)$/iu.test(path)) return javaScriptPlugins();
			const suffix = typeScriptSourceSuffix.exec(path)?.groups;
			const jsx = suffix?.jsx !== undefined;
			const dts = suffix?.declaration !== undefined && !jsx;
			const typescript = ["typescript", {
				dts,
				...suffix?.module === undefined ? {} : { disallowAmbiguousJSXLike: true }
			}];
			const jsxCapable = suffix === undefined || jsx;
			return jsxCapable ? [
				...sourceSyntaxPlugins,
				"jsx",
				typescript
			] : [...sourceSyntaxPlugins, typescript];
		};
		runtimeSourceTypeForPath = (path) => explicitJavaScriptLoaderMode(path) === "commonjs" && path?.endsWith(".cjs") ? "commonjs" : explicitJavaScriptLoaderMode(path) === "module" ? "module" : "unambiguous";
		packageContextForPath = (sourcePath, observedPackageType) => [".js", ".ts"].includes(posix.extname(sourcePath ?? "")) && !/\.d\.ts$/iu.test(sourcePath ?? "") ? observedPackageType : undefined;
		parseRecoveredJavaScript = (source, sourcePath, options, observedPackageType) => {
			const filenameType = runtimeSourceTypeForPath(sourcePath);
			const packageContext = packageContextForPath(sourcePath, observedPackageType);
			const sourceType = filenameType !== "unambiguous" ? filenameType : packageContext === "module" ? "module" : packageContext === "commonjs" && posix.extname(sourcePath ?? "") === ".js" ? "commonjs" : "unambiguous";
			if (sourceType !== "unambiguous") {
				return {
					file: parseWithRuntimeContext(source, sourcePath, {
						...options,
						sourceType,
						errorRecovery: true
					}, observedPackageType),
					moduleOnlyErrors: []
				};
			}
			const file = parseWithRuntimeContext(source, sourcePath, {
				...options,
				sourceType: "unambiguous",
				errorRecovery: true
			}, observedPackageType);
			if (file.program.sourceType !== "script" || file.errors.length === 0) return {
				file,
				moduleOnlyErrors: []
			};
			const script = parseWithRuntimeContext(source, sourcePath, {
				...options,
				sourceType: hasCommonJsWrapper(sourcePath, packageContext) || detectsJavaScriptLoader(sourcePath, packageContext) ? "commonjs" : "script",
				errorRecovery: true
			}, observedPackageType);
			const scriptErrors = new Set(script.errors.map((error) => error.message));
			return {
				file: script,
				moduleOnlyErrors: javaScriptRuntimeContext(script.program) === "commonjs" ? [] : file.errors.map((error) => error.message).filter((message) => !scriptErrors.has(message))
			};
		};
		parseStaticJavaScriptSource = (source, sourcePath, observedPackageType, plugins) => {
			try {
				const runtimeSourceType = runtimeSourceTypeForPath(sourcePath);
				const commonjs = runtimeSourceType === "commonjs";
				const packageContext = packageContextForPath(sourcePath, observedPackageType);
				const options = {
					errorRecovery: true,
					attachComment: false,
					...plugins === undefined ? {} : { plugins }
				};
				const file = parseWithRuntimeContext(source, sourcePath, {
					...options,
					sourceType: commonjs ? "unambiguous" : runtimeSourceType
				}, observedPackageType);
				if (!commonjs && file.program.sourceType === "script" && file.errors.length > 0 && javaScriptSourceLoaderCondition(file.program) !== undefined && javaScriptRuntimeContext(file.program) === "unknown") return parseWithRuntimeContext(source, sourcePath, {
					...options,
					sourceType: "script"
				}, observedPackageType);
				return (hasCommonJsRuntime(sourcePath, packageContext) || detectsJavaScriptLoader(sourcePath, packageContext)) && file.program.sourceType === "script" && file.errors.length > 0 ? parseWithRuntimeContext(source, sourcePath, {
					...options,
					sourceType: hasCommonJsWrapper(sourcePath, packageContext) || detectsJavaScriptLoader(sourcePath, packageContext) ? "commonjs" : "script"
				}, observedPackageType) : file;
			} catch (cause) {
				void cause;
				return null;
			}
		};
		parseJavaScriptSource = (source, sourcePath, observedPackageType) => parseStaticJavaScriptSource(source, sourcePath, observedPackageType);
		parseCapturedJavaScriptSource = (source, observedLanguage) => parseStaticJavaScriptSource(source, undefined, undefined, observedLanguage === "JavaScript" ? javaScriptPlugins() : undefined);
		javaScriptThisOwner = (node, program, parents) => {
			let child = node;
			let classDefinitionExpression = false;
			let current = parents.get(node);
			while (current !== undefined && current !== program) {
				const definitionExpression = javaScriptDefinitionExpression(current, child);
				if (definitionExpression && !t.isObjectMethod(current)) classDefinitionExpression = true;
				if ((t.isClassProperty(current) || t.isClassPrivateProperty(current) || t.isClassAccessorProperty(current)) && current.value === child) return "isolated";
				if (t.isStaticBlock(current)) return "isolated";
				if (t.isFunction(current) && !t.isArrowFunctionExpression(current) && !definitionExpression) return "caller";
				if (t.isClass(current) && current.superClass !== child && !classDefinitionExpression) return "isolated";
				if (t.isClass(current)) classDefinitionExpression = false;
				child = current;
				current = parents.get(current);
			}
			return current === program && javaScriptRuntimeContext(program) === "unknown" ? "global" : "isolated";
		};
	})))();
}

//#endregion
export { JavaScriptLoaderSyntaxError, SemanticPropertyPathCoverage, TYPE_ONLY_MODULE_SIDE_EFFECT_LIMITATION, childNodes, completeSemanticSteps, explicitJavaScriptLoaderMode, hasCaseVariantJavaScriptLoaderSuffix, hasUncertainTypeOnlyModuleSideEffect, init_javascriptAstValues, init_javascriptModuleDeclaration, init_javascriptModuleResolutionMode, init_javascriptSemanticPropertyPaths, init_javascriptSemanticTraversal, init_javascriptSourceParser, isErasedJavaScriptDeclaration, isErasedJavaScriptValueChild, isJsonModuleTarget, isNativeAddonModuleTarget, isNullishJavaScriptSyntax, isObjectPrototypeSetter, isRuntimeJavaScriptClassProperty, isTypeOnlyExportDeclaration, isTypeOnlyExportSpecifier, isTypeOnlyImportDeclaration, isTypeOnlyImportSpecifier, isTypeScriptSourcePath, isUnmodeledJavaScriptRuntimeScope, javaScriptAstChildKeys, javaScriptComputedDefinitionKey, javaScriptDefinitionExpression, javaScriptExpressionWrapperTarget, javaScriptProgramStrictness, javaScriptRuntimeContext, javaScriptSourceLoaderCondition, javaScriptStrictnessAt, javaScriptThisOwner, javascriptDisplayText, joinSemanticPropertyPaths, moduleResolutionModeForJavaScriptReference, objectDataPropertyValue, parseJavaScriptSource, parseRecoveredJavaScript, primitiveOwnKeys, propertyName, readExactJavaScriptLiteral, recoveredJavaScriptSyntaxErrorCount, runtimeFunctionParameters, semanticArrayIndex, semanticFinalObjectProperty, semanticFinalObjectStringProperty, semanticImportEqualsSpecifier, semanticMemberChain, semanticObjectPatternKeys, semanticPropertyPathKeyMatches, semanticRuntimeExportValueSources, semanticStaticModuleSource, semanticStaticPropertyKey, semanticStaticPropertyName, semanticWrappedWriteSite, semanticWriteSiteReadsFirst, semanticWriteSiteTarget, semanticWriteTargets, staticJavaScriptTruthiness, staticObjectCopyPropertyReader, staticObjectOwnMethodReader, staticObjectProperty, staticObjectPropertyReader, traverseJavaScriptAst, traverseJavaScriptAstSteps, traverseJavaScriptValueAst, traverseJavaScriptValueAstSteps, unwrapJavaScriptExpression };