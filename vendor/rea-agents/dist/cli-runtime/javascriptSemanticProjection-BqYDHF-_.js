import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS, init_javascriptSemanticPrecision } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, compositeKey, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { Budget, escapeJsonPointerToken, init_budget, init_jsonPointer } from "./jsonPointer-aolC6MvJ.js";
import { createSyntheticUrlRoot, init_javascriptSyntheticUrlRoot } from "./javascriptSourceSelection-CZ4gLy-b.js";
import { init_javascriptStaticCoverage, unexaminedJavaScriptStaticCoverage } from "./javascriptStaticCoverage-D0-4cGrW.js";
import { SemanticPropertyPathCoverage, childNodes, completeSemanticSteps, init_javascriptAstValues, init_javascriptModuleDeclaration, init_javascriptSemanticPropertyPaths, init_javascriptSemanticTraversal, init_javascriptSourceParser, isErasedJavaScriptDeclaration, isErasedJavaScriptValueChild, isRuntimeJavaScriptClassProperty, isTypeOnlyExportDeclaration, isTypeOnlyExportSpecifier, isTypeOnlyImportDeclaration, isTypeOnlyImportSpecifier, javaScriptAstChildKeys, javaScriptComputedDefinitionKey, javaScriptDefinitionExpression, javaScriptExpressionWrapperTarget, javaScriptProgramStrictness, javaScriptRuntimeContext, javaScriptStrictnessAt, javaScriptThisOwner, joinSemanticPropertyPaths, propertyName, readExactJavaScriptLiteral, runtimeFunctionParameters, semanticArrayIndex, semanticFinalObjectProperty, semanticImportEqualsSpecifier, semanticMemberChain, semanticObjectPatternKeys, semanticPropertyPathKeyMatches, semanticStaticPropertyKey, semanticStaticPropertyName, semanticWrappedWriteSite, semanticWriteSiteReadsFirst, semanticWriteSiteTarget, semanticWriteTargets, staticJavaScriptTruthiness, staticObjectOwnMethodReader, staticObjectPropertyReader, traverseJavaScriptAst, traverseJavaScriptValueAst, traverseJavaScriptValueAstSteps, unwrapJavaScriptExpression } from "./javascriptSourceParser-DNZsD0XO.js";
import { posix } from "node:path";
import { fileURLToPath } from "node:url";
import * as t from "@babel/types";
import { parseExpression } from "@babel/parser";

//#region dist/domain/javascript/javascriptElectronMemberWrites.js
/**
* Index writes through possible lexical object identities. Resolve the complete
* object before appending the written key: self-reference properties can denote
* the same object, while replacing that property is a distinct write.
*/
function* collectJavaScriptIdentityWritesSteps(program, erasedSyntaxNodes, origin, intrinsicInvocation, staticString, freshObject, retain, observeInvocation) {
	const objectMutators = new Set([
		"defineProperty",
		"defineProperties",
		"assign",
		"setPrototypeOf"
	]);
	const reflectMutators = new Set([
		"set",
		"deleteProperty",
		"defineProperty",
		"setPrototypeOf"
	]);
	const keyedMutators = new Set([
		"set",
		"deleteProperty",
		"defineProperty"
	]);
	yield* traverseJavaScriptValueAstSteps(program, erasedSyntaxNodes, { enter: (node) => {
		if (t.isCallExpression(node) || t.isOptionalCallExpression(node) || t.isNewExpression(node) || t.isTaggedTemplateExpression(node)) {
			const invocation = t.isNewExpression(node) || t.isTaggedTemplateExpression(node) ? undefined : intrinsicInvocation(node);
			observeInvocation?.(node, invocation);
			if (t.isNewExpression(node) || t.isTaggedTemplateExpression(node)) return;
			if (invocation?.kind === "opaque") {
				for (const scope of origin(node, "opaque-call", node)) retain(node, scope);
				return;
			}
			const callee = invocation?.path;
			const arguments_ = invocation?.arguments;
			const method = callee?.at(-1);
			const owner = callee?.length === 3 ? callee[1] : undefined;
			if (owner === "Object" && objectMutators.has(method ?? "") || owner === "Reflect" && reflectMutators.has(method ?? "")) {
				const targets = owner === "Reflect" && method === "set" && arguments_ !== undefined && (arguments_.length >= 4 || arguments_.some(t.isSpreadElement)) ? [arguments_[0], arguments_.some(t.isSpreadElement) ? undefined : arguments_[3]] : [arguments_?.[0]];
				for (const target of targets) {
					if (target === undefined || t.isSpreadElement(target)) {
						for (const scope of origin(node, "opaque-call", node)) retain(node, scope);
					}
					if (t.isNode(target) && !t.isSpreadElement(target)) {
						const identities = origin(target, "member", node);
						if (identities.length > 0) {
							const key = keyedMutators.has(method ?? "") ? [staticString(arguments_?.[1]) ?? null] : [null];
							for (const identity of identities) retain(node, [...identity, ...key]);
						} else if (!freshObject(target)) {
							for (const scope of origin(node, "opaque-call", node)) retain(node, scope);
						}
					}
				}
			}
		}
		const target = semanticWriteSiteTarget(node);
		if (target === null) return;
		for (const leaf of semanticWriteTargets(target)) {
			if (t.isIdentifier(leaf)) {
				for (const identity of origin(leaf, "binding", node)) retain(node, identity);
				continue;
			}
			const member = unwrapJavaScriptExpression(leaf).node;
			if (!t.isMemberExpression(member) && !t.isOptionalMemberExpression(member)) continue;
			const key = semanticStaticPropertyKey(member.property, member.computed);
			for (const identity of origin(member.object, "member", node)) retain(node, [...identity, key]);
		}
	} });
}
var ELECTRON_REFERENCE_KINDS, ELECTRON_MODULE, referencesElectronModule, referencesUnresolvedModule, electronExportPath, ELECTRON_IDENTITY_LIMITATION, electronMemberPath;
function init_javascriptElectronMemberWrites() {
	return (init_javascriptElectronMemberWrites = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticTraversal();
		ELECTRON_REFERENCE_KINDS = new Set([
			"static-import",
			"dynamic-import",
			"require"
		]);
		ELECTRON_MODULE = /^electron(?:\/(?:common|main|renderer|utility))?$/u;
		referencesElectronModule = (references) => references.some(({ value }) => value.operation === "load" && ELECTRON_REFERENCE_KINDS.has(value.kind) && value.loader !== "factory-loader" && value.loader_authority !== "candidate" && value.specifier !== null && ELECTRON_MODULE.test(value.specifier));
		referencesUnresolvedModule = (references) => references.some(({ value }) => value.operation === "load" && ELECTRON_REFERENCE_KINDS.has(value.kind) && value.specifier === null);
		electronExportPath = (importedPath) => importedPath[0] === "default" ? importedPath.slice(1) : importedPath;
		ELECTRON_IDENTITY_LIMITATION = "Electron API identity follows proven lexical module aliases and structurally verified module-namespace interop. Other reassignments, dynamic selections, and visibly overwritten namespace members are unresolved; missing findings do not establish absence. Arbitrary call side effects and runtime registration are not evaluated.";
		electronMemberPath = (node) => {
			let root = unwrapJavaScriptExpression(node).node;
			const members = [];
			while (t.isMemberExpression(root) || t.isOptionalMemberExpression(root)) {
				members.push(semanticStaticPropertyKey(root.property, root.computed));
				root = unwrapJavaScriptExpression(root.object).node;
			}
			return {
				root,
				members: members.toReversed()
			};
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticCopiedReferencePaths.js
var semanticCopiedReferencePath;
function init_javascriptSemanticCopiedReferencePaths() {
	return (init_javascriptSemanticCopiedReferencePaths = __esmMin((() => {
		init_javascriptSemanticPropertyPaths();
		init_unicodeCodePointOrder();
		semanticCopiedReferencePath = (initializer, path, effect) => {
			const offset = initializer.copyProjectionOffset;
			if (offset === undefined) return [...initializer.projection, ...path];
			const copiedPath = [...initializer.projection.slice(offset + 1), ...path];
			if (effect === "identity" && copiedPath.length === 0) return null;
			if (effect === "write" && copiedPath.length < 2) return null;
			let [key, ...remaining] = copiedPath;
			if (initializer.copyKind === "array-rest") {
				const startIndex = initializer.copyStartIndex ?? 0;
				if (key === undefined || key === null) key = {
					excludedKeys: [],
					startIndex
				};
				else if (typeof key === "object") key = {
					excludedKeys: key.excludedKeys.flatMap((name) => {
						const index = semanticArrayIndex(name);
						return index === null ? [] : [String(index + startIndex)];
					}),
					startIndex: (key.startIndex ?? 0) + startIndex
				};
				else {
					const index = semanticArrayIndex(key);
					if (index === null) return null;
					key = index + startIndex;
				}
			} else {
				const excludedKeys = initializer.copyExcludedKeys ?? [];
				if (key === undefined || key === null) key = { excludedKeys };
				else if (typeof key === "object") key = {
					...key,
					excludedKeys: [...new Set([...key.excludedKeys, ...excludedKeys])].sort(compareUnicodeCodePoints)
				};
				else if (excludedKeys.includes(String(key))) return null;
			}
			return [
				...initializer.projection.slice(0, offset),
				key,
				...remaining
			];
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticEvaluationOrder.js
var preserveGrouping, semanticMethodDefinitionExpression, semanticIterationCardinality, delayedInstanceFieldValue, semanticBranchMayBeSkipped, optionalChainMayShortCircuit, emptyAbruptLabels, emptyAbruptSummary, abruptSummaries, abruptPrefixes, abruptSummary, semanticPriorStatementMayExit;
function init_javascriptSemanticEvaluationOrder() {
	return (init_javascriptSemanticEvaluationOrder = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticTraversal();
		preserveGrouping = { stopAtParentheses: true };
		semanticMethodDefinitionExpression = (parent, child) => (t.isObjectMethod(parent) || t.isClassMethod(parent) || t.isClassPrivateMethod(parent)) && javaScriptDefinitionExpression(parent, child);
		semanticIterationCardinality = (loop, prototypeMayAffectEnumeration) => {
			const iterable = unwrapJavaScriptExpression(loop.right).node;
			const literal = readExactJavaScriptLiteral(iterable);
			if (t.isForOfStatement(loop)) {
				if (prototypeMayAffectEnumeration !== false) return "unknown";
				if (t.isArrayExpression(iterable)) {
					if (iterable.elements.length === 0) return "empty";
					if (iterable.elements.some((element) => element === null || !t.isSpreadElement(element))) return "nonempty";
					return "unknown";
				}
				if (literal.found && typeof literal.value === "string") return literal.value.length === 0 ? "empty" : "nonempty";
				return "unknown";
			}
			if (t.isObjectExpression(iterable)) {
				let prototype;
				for (const property of iterable.properties) {
					if (t.isSpreadElement(property)) return "unknown";
					const key = semanticStaticPropertyKey(property.key, property.computed);
					if (t.isObjectProperty(property) && !property.computed && !property.shorthand && key === "__proto__") {
						prototype = unwrapJavaScriptExpression(property.value).node;
						continue;
					}
					if (key === null) return "unknown";
					return "nonempty";
				}
				if (t.isNullLiteral(prototype)) return "empty";
				if (prototype !== undefined && !readExactJavaScriptLiteral(prototype).found) return "unknown";
				return prototypeMayAffectEnumeration === false ? "empty" : "unknown";
			}
			if (literal.found && literal.value === null) return "empty";
			if (literal.found && typeof literal.value === "string" && literal.value.length > 0) return "nonempty";
			if (literal.found) return prototypeMayAffectEnumeration === false ? "empty" : "unknown";
			return "unknown";
		};
		delayedInstanceFieldValue = (parent, child) => (t.isClassProperty(parent) || t.isClassPrivateProperty(parent) || t.isClassAccessorProperty(parent)) && !parent.static && parent.value === child;
		semanticBranchMayBeSkipped = (parent, child) => {
			if (delayedInstanceFieldValue(parent, child)) return true;
			if (t.isIfStatement(parent)) return child === parent.consequent || child === parent.alternate;
			if (t.isSwitchCase(parent)) return true;
			if (t.isTryStatement(parent)) return child === parent.block || child === parent.handler;
			if (t.isForStatement(parent)) return child === parent.body || child === parent.update;
			if (t.isWhileStatement(parent)) return child === parent.body;
			if (t.isDoWhileStatement(parent)) return child === parent.test;
			if (t.isForInStatement(parent) || t.isForOfStatement(parent)) return child === parent.left || child === parent.body;
			if (t.isLogicalExpression(parent)) return child === parent.right;
			if (t.isAssignmentPattern(parent)) return child === parent.right;
			if (t.isAssignmentExpression(parent)) return [
				"&&=",
				"||=",
				"??="
			].includes(parent.operator) && child === parent.right;
			if (t.isConditionalExpression(parent)) return child === parent.consequent || child === parent.alternate;
			if (t.isOptionalCallExpression(parent) || t.isCallExpression(parent)) return parent.arguments.includes(child) && (t.isOptionalCallExpression(parent) && parent.optional || optionalChainMayShortCircuit(parent.callee));
			if (t.isOptionalMemberExpression(parent)) return parent.computed && child === parent.property && (parent.optional || optionalChainMayShortCircuit(parent.object));
			return false;
		};
		optionalChainMayShortCircuit = (expression) => {
			let current = expression;
			while (true) {
				if (current.extra?.parenthesized === true) return false;
				const unwrapped = unwrapJavaScriptExpression(current, preserveGrouping).node;
				if (unwrapped !== current) {
					current = unwrapped;
					continue;
				}
				if (t.isOptionalMemberExpression(current)) {
					if (current.optional) return true;
					current = current.object;
				} else if (t.isMemberExpression(current)) current = current.object;
				else if (t.isOptionalCallExpression(current)) {
					if (current.optional) return true;
					current = current.callee;
				} else if (t.isCallExpression(current)) current = current.callee;
				else return false;
			}
		};
		emptyAbruptLabels = new Set();
		emptyAbruptSummary = {
			breaks: emptyAbruptLabels,
			continues: emptyAbruptLabels
		};
		abruptSummaries = new WeakMap();
		abruptPrefixes = new WeakMap();
		abruptSummary = (root) => {
			const pending = [{
				node: root,
				visited: false
			}];
			while (pending.length > 0) {
				const { node, visited } = pending.pop();
				if (abruptSummaries.has(node)) continue;
				const children = t.isFunction(node) || t.isClass(node) ? [] : childNodes(node).filter((child) => t.isStatement(child) || t.isSwitchCase(child) || t.isCatchClause(child));
				if (!visited) {
					pending.push({
						node,
						visited: true
					});
					for (const child of children) if (!abruptSummaries.has(child)) pending.push({
						node: child,
						visited: false
					});
					continue;
				}
				let breaks, continues;
				if (t.isBreakStatement(node)) (breaks ??= new Set()).add(node.label?.name ?? null);
				if (t.isContinueStatement(node)) (continues ??= new Set()).add(node.label?.name ?? null);
				for (const child of children) {
					const summary = abruptSummaries.get(child);
					for (const label of summary.breaks) (breaks ??= new Set()).add(label);
					for (const label of summary.continues) (continues ??= new Set()).add(label);
				}
				if (t.isLoop(node) || t.isSwitchStatement(node)) breaks?.delete(null);
				if (t.isLoop(node)) continues?.delete(null);
				if (t.isLabeledStatement(node)) {
					breaks?.delete(node.label.name);
					continues?.delete(node.label.name);
				}
				abruptSummaries.set(node, (breaks?.size ?? 0) > 0 || (continues?.size ?? 0) > 0 ? {
					breaks: breaks ?? emptyAbruptLabels,
					continues: continues ?? emptyAbruptLabels
				} : emptyAbruptSummary);
			}
			return abruptSummaries.get(root);
		};
		semanticPriorStatementMayExit = (parent, child) => {
			if (!t.isBlockStatement(parent) && !t.isProgram(parent)) return false;
			let skipped = abruptPrefixes.get(parent);
			if (skipped === undefined) {
				const prefixes = new Set();
				let exits = false;
				for (const statement of parent.body) {
					if (exits) prefixes.add(statement);
					const summary = abruptSummary(statement);
					exits ||= summary.breaks.size > 0 || summary.continues.size > 0;
				}
				skipped = prefixes;
				abruptPrefixes.set(parent, skipped);
			}
			return skipped.has(child);
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticExecutionPoints.js
var typeOnlyAliases, none, execution, memberReceiver, argumentValues, writeSite, patternSource, coercionOperands, coercion, call, member, computedMember, classDecorators, computedDefinitionMembers, javaScriptDefinitionTimeExpressions, javaScriptDefinitionKeyCoercions, classDefinition, jsxElement, unsupported, moduleEvaluation, classifiers, isTypeOnly, javaScriptExecutions;
function init_javascriptSemanticExecutionPoints() {
	return (init_javascriptSemanticExecutionPoints = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticTraversal();
		typeOnlyAliases = [
			"Flow",
			"TSType",
			"TSTypeElement"
		];
		none = () => [];
		execution = (kind, node, operands) => ({
			kind,
			node,
			operands: operands.filter((operand) => operand != null)
		});
		memberReceiver = (callee) => {
			const expression = unwrapJavaScriptExpression(callee).node;
			return t.isMemberExpression(expression) || t.isOptionalMemberExpression(expression) ? expression.object : undefined;
		};
		argumentValues = (values) => values.flatMap((value) => value === null ? [] : [t.isSpreadElement(value) ? value.argument : value]);
		writeSite = (node) => {
			const target = semanticWriteSiteTarget(node);
			if (target === null) return [];
			const receivers = [...semanticWriteTargets(target)].flatMap((leaf) => t.isIdentifier(leaf) ? [] : [leaf.object]);
			return receivers.length === 0 ? [] : [{
				kind: "property-write",
				node,
				target,
				readsFirst: semanticWriteSiteReadsFirst(node),
				operands: receivers
			}];
		};
		patternSource = (node, pattern, source) => t.isObjectPattern(pattern) ? [execution("destructuring", node, [source])] : t.isArrayPattern(pattern) ? [execution("iteration", node, [source])] : [];
		coercionOperands = (node, parent, isObject) => {
			if (t.isBinaryExpression(node)) {
				if (["===", "!=="].includes(node.operator)) return [];
				if (node.operator === "instanceof") return [node.left, node.right];
				if (["==", "!="].includes(node.operator) && (t.isThisExpression(node.left) && t.isThisExpression(node.right) || isObject(node.left) && isObject(node.right))) return [];
				return node.operator === "in" ? [node.left] : [node.left, node.right];
			}
			if (t.isUnaryExpression(node) && [
				"+",
				"-",
				"~"
			].includes(node.operator)) return [node.argument];
			if (t.isUpdateExpression(node)) return [node.argument];
			if (t.isAssignmentExpression(node) && ![
				"=",
				"&&=",
				"||=",
				"??="
			].includes(node.operator)) return [node.left, node.right];
			if ((t.isMemberExpression(node) || t.isOptionalMemberExpression(node) || t.isObjectProperty(node) || t.isObjectMethod(node) || t.isClassProperty(node) || t.isClassMethod(node) || t.isClassAccessorProperty(node)) && node.computed) return [t.isMemberExpression(node) || t.isOptionalMemberExpression(node) ? node.property : node.key];
			if (t.isTemplateLiteral(node) && !t.isTaggedTemplateExpression(parent)) return node.expressions;
			return [];
		};
		coercion = (node, parent, options) => {
			const operands = coercionOperands(node, parent, options.isObject ?? (() => false));
			return operands.length === 0 ? [] : [execution("coercion", node, operands)];
		};
		call = (node) => [execution("call", node, [memberReceiver(node.callee), ...argumentValues(node.arguments)])];
		member = (node, parent, options) => [execution("property-read", node, [node.object]), ...coercion(node, parent, options)];
		computedMember = coercion;
		classDecorators = (node) => [...node.decorators ?? [], ...node.body.body.flatMap((member) => "decorators" in member ? member.decorators ?? [] : [])];
		computedDefinitionMembers = (node) => {
			if (t.isObjectMethod(node)) return javaScriptComputedDefinitionKey(node, node.key) ? [node] : [];
			if (!t.isClass(node)) return [];
			return node.body.body.filter((member) => "key" in member && javaScriptComputedDefinitionKey(member, member.key));
		};
		javaScriptDefinitionTimeExpressions = (node) => [
			...t.isClass(node) && node.superClass != null ? [node.superClass] : [],
			...computedDefinitionMembers(node).flatMap((member) => "key" in member ? [member.key] : []),
			...t.isClass(node) ? classDecorators(node) : [],
			...t.isClass(node) ? node.body.body.flatMap((member) => t.isStaticBlock(member) ? [member] : (t.isClassProperty(member) || t.isClassPrivateProperty(member)) && member.static && member.value != null ? [member.value] : []) : []
		];
		javaScriptDefinitionKeyCoercions = (node) => computedDefinitionMembers(node).flatMap((member) => coercionOperands(member, node, () => false));
		classDefinition = (node) => [execution("class-definition", node, [node.superClass]), ...classDecorators(node).length === 0 ? [] : [execution("decorator", node, [node, ...node.body.body.flatMap((member) => !("decorators" in member) || (member.decorators ?? []).length === 0 ? [] : t.isClassMethod(member) || t.isClassPrivateMethod(member) ? [member] : "value" in member && member.value !== null && member.value !== undefined ? [member.value] : [])])]];
		jsxElement = (node) => {
			const operands = [];
			const attributes = t.isJSXElement(node) ? node.openingElement.attributes : [];
			for (const attribute of attributes) if (t.isJSXSpreadAttribute(attribute)) operands.push(attribute.argument);
			else if (t.isJSXExpressionContainer(attribute.value)) operands.push(attribute.value.expression);
			for (const child of node.children) if (t.isJSXExpressionContainer(child) || t.isJSXSpreadChild(child)) operands.push(child.expression);
			return [execution("jsx-element", node, operands.filter((operand) => !t.isJSXEmptyExpression(operand)))];
		};
		unsupported = (node) => [execution("unsupported-syntax", node, childNodes(node))];
		moduleEvaluation = (node) => [execution("module-evaluation", node, [])];
		classifiers = {
			File: none,
			Program: none,
			InterpreterDirective: none,
			Directive: none,
			DirectiveLiteral: none,
			BlockStatement: none,
			BreakStatement: none,
			ContinueStatement: none,
			DebuggerStatement: none,
			DoWhileStatement: none,
			EmptyStatement: none,
			ExpressionStatement: none,
			ForStatement: none,
			IfStatement: none,
			LabeledStatement: none,
			ReturnStatement: none,
			SwitchStatement: none,
			SwitchCase: none,
			ThrowStatement: none,
			TryStatement: none,
			CatchClause: (node) => node.param == null ? [] : patternSource(node, node.param, undefined),
			WhileStatement: none,
			VariableDeclaration: none,
			StaticBlock: none,
			ClassBody: none,
			StringLiteral: none,
			NumericLiteral: none,
			NullLiteral: none,
			BooleanLiteral: none,
			RegExpLiteral: none,
			BigIntLiteral: none,
			TemplateElement: none,
			Identifier: none,
			ThisExpression: none,
			Super: none,
			MetaProperty: none,
			PrivateName: none,
			ArrayExpression: none,
			ObjectExpression: none,
			ConditionalExpression: none,
			LogicalExpression: none,
			SequenceExpression: none,
			ParenthesizedExpression: none,
			ArrowFunctionExpression: none,
			FunctionDeclaration: none,
			FunctionExpression: none,
			ClassPrivateMethod: none,
			ClassPrivateProperty: none,
			AssignmentPattern: none,
			ArrayPattern: none,
			ObjectPattern: none,
			RestElement: (node, parent) => t.isObjectPattern(parent) ? [execution("property-copy", node, [])] : [],
			VoidPattern: none,
			ImportDeclaration: moduleEvaluation,
			ExportAllDeclaration: moduleEvaluation,
			ExportNamedDeclaration: (node, parent, options) => node.source == null ? none() : moduleEvaluation(node, parent, options),
			ExportDefaultDeclaration: none,
			ExportSpecifier: none,
			ExportDefaultSpecifier: none,
			ExportNamespaceSpecifier: none,
			ImportDefaultSpecifier: none,
			ImportNamespaceSpecifier: none,
			ImportSpecifier: none,
			ImportAttribute: none,
			Import: none,
			ImportExpression: (node) => [execution("dynamic-import", node, [node.source, node.options])],
			CallExpression: call,
			OptionalCallExpression: call,
			NewExpression: (node) => [execution("construction", node, argumentValues(node.arguments))],
			TaggedTemplateExpression: (node) => [execution("tagged-template", node, [memberReceiver(node.tag), ...node.quasi.expressions])],
			Decorator: none,
			MemberExpression: member,
			OptionalMemberExpression: member,
			AssignmentExpression: (node, parent, options) => [
				...writeSite(node),
				...coercion(node, parent, options),
				...patternSource(node, node.left, node.right)
			],
			UpdateExpression: (node, parent, options) => [...writeSite(node), ...coercion(node, parent, options)],
			UnaryExpression: (node, parent, options) => node.operator === "delete" ? writeSite(node) : coercion(node, parent, options),
			BinaryExpression: coercion,
			TemplateLiteral: coercion,
			ObjectProperty: computedMember,
			ObjectMethod: computedMember,
			ClassMethod: computedMember,
			ClassProperty: computedMember,
			ClassAccessorProperty: computedMember,
			ForInStatement: (node) => [...writeSite(node), execution("enumeration", node, [node.right])],
			ForOfStatement: (node) => [...writeSite(node), execution(node.await ? "thenable" : "iteration", node, [node.right])],
			SpreadElement: (node, parent) => t.isObjectExpression(parent) ? [execution("property-copy", node, [node.argument])] : t.isArrayExpression(parent) ? [execution("iteration", node, [node.argument])] : [],
			VariableDeclarator: (node, parent) => [...t.isVariableDeclaration(parent) && (parent.kind === "using" || parent.kind === "await using") ? [execution("disposal", node, [node.init ?? node.id])] : [], ...patternSource(node, node.id, node.init)],
			AwaitExpression: (node) => [execution("thenable", node, [node.argument])],
			YieldExpression: (node) => [execution(node.delegate ? "iteration" : "suspension", node, [node.argument])],
			ClassDeclaration: classDefinition,
			ClassExpression: classDefinition,
			WithStatement: (node) => [execution("dynamic-scope", node, [node.object])],
			JSXElement: jsxElement,
			JSXFragment: jsxElement,
			JSXAttribute: none,
			JSXClosingElement: none,
			JSXEmptyExpression: none,
			JSXExpressionContainer: none,
			JSXSpreadChild: none,
			JSXIdentifier: none,
			JSXMemberExpression: none,
			JSXNamespacedName: none,
			JSXOpeningElement: none,
			JSXSpreadAttribute: none,
			JSXText: none,
			JSXOpeningFragment: none,
			JSXClosingFragment: none,
			TSAsExpression: none,
			TSSatisfiesExpression: none,
			TSTypeAssertion: none,
			TSNonNullExpression: none,
			TSInstantiationExpression: none,
			TSDeclareFunction: none,
			TSDeclareMethod: none,
			TSInterfaceDeclaration: none,
			TSInterfaceBody: none,
			TSTypeAliasDeclaration: none,
			TSTypeAnnotation: none,
			TSTypeParameterInstantiation: none,
			TSTypeParameterDeclaration: none,
			TSTypeParameter: none,
			TSQualifiedName: none,
			TSNamedTupleMember: none,
			TSNamespaceExportDeclaration: none,
			TSExportAssignment: none,
			TSExternalModuleReference: none,
			TSEnumDeclaration: none,
			TSEnumBody: none,
			TSEnumMember: none,
			TSModuleDeclaration: none,
			TSModuleBlock: none,
			TSImportEqualsDeclaration: (node) => [t.isTSExternalModuleReference(node.moduleReference) ? execution("module-evaluation", node, []) : execution("property-read", node, [])],
			TSParameterProperty: (node) => [{
				kind: "property-write",
				node,
				target: node.parameter,
				readsFirst: false,
				operands: []
			}],
			NumberLiteral: none,
			RegexLiteral: none,
			RestProperty: (node) => [execution("property-copy", node, [])],
			SpreadProperty: (node) => [execution("property-copy", node, [node.argument])],
			EnumDeclaration: unsupported,
			Placeholder: unsupported,
			V8IntrinsicIdentifier: unsupported,
			ArgumentPlaceholder: unsupported,
			BindExpression: unsupported,
			DoExpression: unsupported,
			ModuleExpression: unsupported,
			TopicReference: unsupported
		};
		isTypeOnly = (node) => !t.isEnumDeclaration(node) && typeOnlyAliases.some((alias) => t.is(alias, node));
		javaScriptExecutions = (node, parent, options = {}) => {
			if (isTypeOnly(node)) return [];
			const classify = classifiers[node.type];
			return classify === undefined ? unsupported(node, parent, options) : classify(node, parent, options);
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticIterationSources.js
var semanticStoredSourceSelection, add, project, visit, emptySourceFacts, guardedExecutions, guardedBodyMayCall, sourceFacts, semanticSourceFacts, semanticIterationSources, semanticPatternPropertyReadSources, semanticPropertyReadSources;
function init_javascriptSemanticIterationSources() {
	return (init_javascriptSemanticIterationSources = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticPropertyPaths();
		init_unicodeCodePointOrder();
		init_javascriptSemanticCopiedReferencePaths();
		init_javascriptSemanticEvaluationOrder();
		init_javascriptSemanticExecutionPoints();
		init_javascriptSemanticTraversal();
		semanticStoredSourceSelection = (source, selected) => {
			const copy = source.projection.at(-1);
			if (copy === null || typeof copy !== "object") return { projection: [...source.projection, ...selected] };
			const projection = semanticCopiedReferencePath({
				projection: source.projection,
				copyProjectionOffset: source.projection.length - 1,
				copyKind: copy.startIndex === undefined ? "object-rest" : "array-rest",
				copyExcludedKeys: copy.excludedKeys,
				...copy.startIndex === undefined ? {} : { copyStartIndex: copy.startIndex }
			}, selected, "identity");
			return projection === null ? null : {
				projection,
				capturedSelectionDepth: source.projection.length,
				...copy.startIndex === undefined ? { ownEnumerable: true } : {}
			};
		};
		add = (sources, source, mutation, guards, kind = "iteration", target) => {
			sources.push({
				kind,
				node: source.node,
				projection: source.projection,
				mutation,
				...guards,
				...target === undefined ? {} : { target }
			});
		};
		project = (source, key) => {
			if (source === undefined) return undefined;
			const index = key === null ? null : semanticArrayIndex(key);
			return {
				node: source.node,
				projection: [...source.projection, source.restStartIndex !== undefined && index !== null ? source.restStartIndex + index : key]
			};
		};
		visit = (context, pattern, source, guards = {}) => {
			pattern = unwrapJavaScriptExpression(pattern).node;
			const { sources, mutation } = context;
			if (t.isMemberExpression(pattern)) {
				if (source !== undefined) add(sources, source.restStartIndex === undefined ? source : {
					node: source.node,
					projection: [...source.projection, {
						excludedKeys: [],
						startIndex: source.restStartIndex
					}]
				}, mutation, guards, "reference-store", pattern);
				return;
			}
			if (t.isTSParameterProperty(pattern)) {
				visit(context, pattern.parameter, source, guards);
				return;
			}
			if (t.isAssignmentPattern(pattern)) {
				visit(context, pattern.left, source, {
					...guards,
					requiredSources: [...guards.requiredSources ?? [], ...source === undefined ? [] : [{
						...source,
						...guards.iterationSources === undefined ? {} : { iterationSources: guards.iterationSources }
					}]]
				});
				visit(context, pattern.left, {
					node: pattern.right,
					projection: []
				}, {
					...guards,
					fallbackSources: [...guards.fallbackSources ?? [], ...source === undefined ? [] : [{
						...source,
						...guards.iterationSources === undefined ? {} : { iterationSources: guards.iterationSources }
					}]]
				});
				return;
			}
			if (t.isObjectPattern(pattern)) {
				for (const property of pattern.properties) {
					if (t.isRestElement(property)) {
						const rest = source === undefined ? undefined : {
							node: source.node,
							projection: [...source.projection, { excludedKeys: [...new Set(semanticObjectPatternKeys(pattern))].sort(compareUnicodeCodePoints) }]
						};
						if (rest !== undefined) context.propertyReads.push({
							...rest,
							...guards,
							mutation,
							lookup: "own"
						});
						visit(context, property.argument, rest, guards);
						continue;
					}
					const selected = project(source, semanticStaticPropertyKey(property.key, property.computed));
					if (selected !== undefined) context.propertyReads.push({
						...selected,
						...guards,
						mutation,
						lookup: "prototype"
					});
					visit(context, property.value, selected, guards);
				}
				return;
			}
			if (t.isArrayPattern(pattern)) {
				if (source !== undefined && source.restStartIndex === undefined) sources.push({
					kind: "iteration",
					node: source.node,
					projection: source.projection,
					mutation,
					...t.isVariableDeclarator(mutation) || t.isAssignmentExpression(mutation) ? { arrayPattern: pattern } : {},
					...guards
				});
				const selectedGuards = {
					...guards,
					iterationSources: [...guards.iterationSources ?? [], ...source === undefined ? [] : [source]]
				};
				pattern.elements.forEach((element, index) => {
					if (element === null) return;
					if (t.isRestElement(element)) visit(context, element.argument, source === undefined ? undefined : {
						node: source.node,
						projection: source.projection,
						restStartIndex: (source.restStartIndex ?? 0) + index
					}, selectedGuards);
					else visit(context, element, project(source, index), selectedGuards);
				});
				return;
			}
			if (t.isRestElement(pattern)) visit(context, pattern.argument, undefined, guards);
		};
		emptySourceFacts = {
			iterations: [],
			propertyReads: []
		};
		guardedExecutions = new WeakMap();
		guardedBodyMayCall = (body) => {
			const pending = [{
				node: body,
				parent: null,
				finish: false
			}];
			while (pending.length > 0) {
				const frame = pending.pop();
				if (frame === undefined || guardedExecutions.has(frame.node)) continue;
				const { node, parent } = frame;
				const children = [...childNodes(node)].filter((child) => !t.isFunction(node) || semanticMethodDefinitionExpression(node, child));
				if (!frame.finish) {
					pending.push({
						node,
						parent,
						finish: true
					});
					for (const child of children) pending.push({
						node: child,
						parent: node,
						finish: false
					});
				} else {
					const direct = javaScriptExecutions(node, parent).length > 0 || t.isIdentifier(node) && parent !== null && t.isReferenced(node, parent);
					guardedExecutions.set(node, direct || children.some((child) => guardedExecutions.get(child) === true));
				}
			}
			return guardedExecutions.get(body) === true;
		};
		sourceFacts = new WeakMap();
		semanticSourceFacts = (node, parent) => {
			if (!(t.isVariableDeclarator(node) || t.isAssignmentExpression(node) || t.isForOfStatement(node) || t.isSpreadElement(node) || t.isAwaitExpression(node) || t.isYieldExpression(node) || t.isCatchClause(node) || t.isFunction(node))) return emptySourceFacts;
			const cached = sourceFacts.get(node);
			if (cached?.parent === parent) return cached.facts;
			const sources = [];
			const propertyReads = [];
			const context = {
				sources,
				propertyReads,
				mutation: node
			};
			if (t.isVariableDeclarator(node) && node.init != null) visit(context, node.id, {
				node: node.init,
				projection: []
			});
			else if (t.isAssignmentExpression(node) && [
				"=",
				"||=",
				"&&=",
				"??="
			].includes(node.operator)) visit(context, node.left, {
				node: node.right,
				projection: []
			});
			else if (t.isForOfStatement(node)) {
				add(sources, {
					node: node.right,
					projection: []
				}, node, {});
				const source = {
					node: node.right,
					projection: [null]
				};
				if (t.isVariableDeclaration(node.left)) {
					for (const declaration of node.left.declarations) visit(context, declaration.id, source);
				} else visit(context, node.left, source);
			} else if (t.isSpreadElement(node)) {
				if (t.isArrayExpression(parent)) add(sources, {
					node: node.argument,
					projection: []
				}, node, {});
				else if (t.isObjectExpression(parent)) propertyReads.push({
					node: node.argument,
					projection: [{ excludedKeys: [] }],
					mutation: node,
					lookup: "own"
				});
			} else if (t.isAwaitExpression(node)) propertyReads.push({
				node: node.argument,
				projection: ["then"],
				mutation: node,
				lookup: "prototype",
				invoke: true
			});
			else if (t.isYieldExpression(node) && node.delegate && node.argument != null) add(sources, {
				node: node.argument,
				projection: []
			}, node, {});
			else if (t.isCatchClause(node) && node.param != null && t.isTryStatement(parent) && guardedBodyMayCall(parent.block)) visit(context, node.param, {
				node: node.param,
				projection: [null]
			});
			else if (t.isFunction(node)) for (const parameter of runtimeFunctionParameters(node)) visit(context, parameter, {
				node: parameter,
				projection: []
			});
			const facts = {
				iterations: sources,
				propertyReads
			};
			sourceFacts.set(node, {
				parent,
				facts
			});
			return facts;
		};
		semanticIterationSources = (node, parent) => semanticSourceFacts(node, parent).iterations;
		semanticPatternPropertyReadSources = (pattern, source, mutation) => {
			const propertyReads = [];
			visit({
				sources: [],
				propertyReads,
				mutation
			}, pattern, source);
			return propertyReads;
		};
		semanticPropertyReadSources = (node, parent, supplemental) => {
			const ordinary = semanticSourceFacts(node, parent).propertyReads;
			const implicit = supplemental?.implicitPropertyReads.get(node);
			return implicit === undefined ? ordinary : [...ordinary, ...implicit];
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticEffectRecord.js
var createSemanticOpaqueEffects, recordSemanticGlobalCodeReference, semanticDirectEvalRecorded, isSemanticDirectEvalSite, semanticGlobalCodeSites;
function init_javascriptSemanticEffectRecord() {
	return (init_javascriptSemanticEffectRecord = __esmMin((() => {
		createSemanticOpaqueEffects = () => ({
			mayReferenceGlobalCode: false,
			sites: new WeakSet(),
			sloppySites: new WeakSet(),
			byScope: new Map(),
			children: new Map(),
			globalSites: []
		});
		recordSemanticGlobalCodeReference = (state) => {
			state.opaqueEffects.mayReferenceGlobalCode = true;
		};
		semanticDirectEvalRecorded = (state) => state.opaqueEffects.byScope.size > 0;
		isSemanticDirectEvalSite = (node, state) => state.opaqueEffects.sites.has(node);
		semanticGlobalCodeSites = (state) => state.opaqueEffects.globalSites;
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticState.js
var semanticPrototypeOwners, recordSemanticValueLimit, semanticStableInitializer, currentSemanticScope, semanticScopeId, semanticBindingId, resolveSemanticBindingState, semanticResolutionBlocked, semanticScopeForNode, semanticBindingLookupFromScope, semanticBindingLookupAt, resolveSemanticBindingFromScope, semanticUnscopablesKey, semanticWithRequireLookup, semanticWithPropertyName, finalSemanticWithSymbolProperty, semanticWithPrototypeKind, finalSemanticWithStringProperty, isSemanticWithPrimitive, semanticVariableScope;
function init_javascriptSemanticState() {
	return (init_javascriptSemanticState = __esmMin((() => {
		init_javascriptAstValues();
		semanticPrototypeOwners = [
			"Object",
			"Array",
			"String",
			"Function",
			"Number",
			"Boolean",
			"RegExp",
			"BigInt"
		];
		recordSemanticValueLimit = (state, value) => {
			if (value.status === "unknown" && value.resourceLimit !== undefined) state.valueResourceLimits.add(value.resourceLimit);
		};
		semanticStableInitializer = (binding, state) => {
			const [initializer] = binding?.initializers ?? [];
			const [definition] = binding?.definitions ?? [];
			return binding !== undefined && (definition?.kind === "variable" && binding.definitions.every(({ kind }) => kind === "variable") || binding.definitions.length === 1 && (definition?.kind === "function" || definition?.kind === "class")) && binding.initializers.length === 1 && initializer !== undefined && !state.conditionallySkippedExpressions.has(initializer.node) ? initializer : undefined;
		};
		currentSemanticScope = (stack) => {
			const scope = stack.at(-1);
			if (scope === undefined) throw new TypeError("Missing semantic scope");
			return scope;
		};
		semanticScopeId = (kind, node) => `scope:${kind}:${String(node.start ?? -1)}:${String(node.end ?? -1)}`;
		semanticBindingId = (scopeId, name) => `${scopeId}:binding:${encodeURIComponent(name)}`;
		resolveSemanticBindingState = (state, node, name) => {
			const lookup = semanticBindingLookupAt(state, node, name);
			return lookup.kind === "binding" ? lookup.binding : undefined;
		};
		semanticResolutionBlocked = (state, node, name) => {
			const lookup = semanticBindingLookupAt(state, node, name);
			return lookup.kind !== "binding" && lookup.kind !== "ambient";
		};
		semanticScopeForNode = (state, node) => {
			let candidate = node;
			while (candidate !== undefined) {
				const scope = state.scopeByNode.get(candidate);
				if (scope !== undefined) {
					let descendant = node;
					while (descendant !== undefined && descendant !== candidate) {
						state.scopeByNode.set(descendant, scope);
						descendant = state.parentsByNode.get(descendant);
					}
					return scope;
				}
				candidate = state.parentsByNode.get(candidate);
			}
			return undefined;
		};
		semanticBindingLookupFromScope = (scope, name, state) => {
			let uncertain = false;
			while (scope !== undefined) {
				const binding = scope.bindings.get(name);
				if (binding !== undefined) return {
					kind: uncertain ? "uncertain-binding" : "binding",
					binding
				};
				if (name === "arguments" && scope.implicitArguments === true) return { kind: "implicit-arguments" };
				if (!scope.bindingsComplete) {
					if (scope.dynamicWithStatement === undefined) return { kind: "unknown" };
					const lookup = semanticWithRequireLookup(state, scope.dynamicWithStatement, name);
					if (lookup === "captures") return { kind: "captured" };
					if (lookup === "unknown") uncertain = true;
				}
				scope = scope.parentScopeId === null ? undefined : state.scopesById.get(scope.parentScopeId);
			}
			return { kind: uncertain ? "uncertain-ambient" : "ambient" };
		};
		semanticBindingLookupAt = (state, node, name) => semanticBindingLookupFromScope(semanticScopeForNode(state, node), name, state);
		resolveSemanticBindingFromScope = (scope, name, state) => {
			const lookup = semanticBindingLookupFromScope(scope, name, state);
			return lookup.kind === "binding" ? lookup.binding : undefined;
		};
		semanticUnscopablesKey = Symbol("semantic-unscopables-key");
		semanticWithRequireLookup = (state, statement, name) => {
			if (name !== "require") return "unknown";
			const object = unwrapJavaScriptExpression(statement.object).node;
			if (!t.isObjectExpression(object)) return "unknown";
			let ownRequire = false;
			let hasUnknownOwnProperties = false;
			let prototypeIsNull = false;
			let unknownPrototype = false;
			for (const property of object.properties) {
				if (t.isSpreadElement(property)) {
					hasUnknownOwnProperties = true;
					continue;
				}
				const key = semanticWithPropertyName(property.key, property.computed, state);
				if (key === "require") ownRequire = true;
				else if (key === "__proto__" && t.isObjectProperty(property) && !property.computed && !property.shorthand) {
					const prototype = unwrapJavaScriptExpression(property.value).node;
					if (t.isNullLiteral(prototype)) prototypeIsNull = true;
					else unknownPrototype = true;
				} else if (key === null && property.computed) {
					hasUnknownOwnProperties = true;
				}
			}
			if (ownRequire) {
				const unscopablesValue = finalSemanticWithSymbolProperty(object, state);
				if (unscopablesValue === "unknown") return "unknown";
				if (unscopablesValue === undefined) return prototypeIsNull || !unknownPrototype && state.prototypeRequireMutationObserved === false ? "captures" : "unknown";
				const unscopables = unwrapJavaScriptExpression(unscopablesValue).node;
				if (!t.isObjectExpression(unscopables)) return isSemanticWithPrimitive(unscopables) ? "captures" : "unknown";
				const entry = finalSemanticWithStringProperty(unscopables, "require");
				if (entry === "unknown") return "unknown";
				if (entry === undefined) {
					const prototype = semanticWithPrototypeKind(unscopables);
					return prototype === "null" || prototype === "ordinary" && state.prototypeRequireMutationObserved === false ? "captures" : "unknown";
				}
				const truthiness = staticJavaScriptTruthiness(entry);
				return truthiness === true ? "skips" : truthiness === false ? "captures" : "unknown";
			}
			if (hasUnknownOwnProperties || unknownPrototype) return "unknown";
			if (prototypeIsNull) return "skips";
			return state.prototypeRequireMutationObserved === false ? "skips" : "unknown";
		};
		semanticWithPropertyName = (key, computed, state) => {
			if (computed && t.isMemberExpression(key) && !key.computed && t.isIdentifier(key.object, { name: "Symbol" }) && semanticStaticPropertyKey(key.property, false) === "unscopables" && resolveSemanticBindingState(state, key.object, "Symbol") === undefined && !semanticResolutionBlocked(state, key.object, "Symbol")) return semanticUnscopablesKey;
			return semanticStaticPropertyKey(key, computed);
		};
		finalSemanticWithSymbolProperty = (object, state) => {
			for (let index = object.properties.length - 1; index >= 0; index -= 1) {
				const property = object.properties[index];
				if (property === undefined || t.isSpreadElement(property)) return "unknown";
				const name = semanticWithPropertyName(property.key, property.computed, state);
				if (name === semanticUnscopablesKey) return t.isObjectProperty(property) ? property.value : "unknown";
				if (name === null && property.computed) return "unknown";
			}
			return undefined;
		};
		semanticWithPrototypeKind = (object) => {
			for (const property of object.properties) {
				if (t.isObjectProperty(property) && !property.computed && !property.shorthand && semanticStaticPropertyKey(property.key, false) === "__proto__") return t.isNullLiteral(unwrapJavaScriptExpression(property.value).node) ? "null" : "other";
			}
			return "ordinary";
		};
		finalSemanticWithStringProperty = (object, sought) => {
			for (let index = object.properties.length - 1; index >= 0; index -= 1) {
				const property = object.properties[index];
				if (property === undefined || t.isSpreadElement(property)) return "unknown";
				const name = semanticStaticPropertyKey(property.key, property.computed);
				if (name === sought) return t.isObjectProperty(property) ? property.value : "unknown";
				if (name === null && property.computed) return "unknown";
			}
			return undefined;
		};
		isSemanticWithPrimitive = (node) => t.isNullLiteral(node) || t.isBooleanLiteral(node) || t.isStringLiteral(node) || t.isNumericLiteral(node) || t.isBigIntLiteral(node) || t.isUnaryExpression(node, { operator: "-" }) && (t.isNumericLiteral(node.argument) || t.isBigIntLiteral(node.argument));
		semanticVariableScope = (scope, parent, state) => {
			if (!(parent !== null && t.isVariableDeclaration(parent, { kind: "var" }))) return scope;
			let candidate = scope;
			while (candidate.kind === "block" || candidate.kind === "catch") {
				const outer = candidate.parentScopeId === null ? undefined : state.scopesById.get(candidate.parentScopeId);
				if (outer === undefined) break;
				candidate = outer;
			}
			return candidate;
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticMutationInitializers.js
var initializerPositionCaches, initializerPositionCache, siblingIndex, statementPosition, positionPrecedes, sameStatementPosition, computeTopLevelStatementPosition, topLevelStatementPosition, semanticTopLevelEffectFollowsCapture, scopeEffectMarkers, scopeEffectOwners, semanticScopeEffect, semanticScopeExitEffect, semanticArrayPatternAcquisitionEffect, semanticArrayPatternCloseScope, isSemanticArrayPatternEffect, withinScopeExit, semanticEffectFollowsReference, semanticEffectTiming, runsInProgramActivation, semanticEnclosingIteration, expressionSiblings, expressionChildIndices, expressionEvaluationOrder, computeDirectInitializerPosition, directInitializerPosition, computeDirectMutationPosition, directMutationPosition, semanticDefiniteEffectPrecedesReference, semanticReadPrecedesEffectWithinActivation, semanticEffectTimingWithinActivation, computeReferenceInitializerPosition, referenceInitializerPosition, initializerPosition, semanticMutationInitializers, bindingEnclosingFunction, bindingReadPosition, semanticBindingMayRejectAssignmentAt, semanticCaptureOrderingIdentity, moduleFunctionFirstRead, semanticBindingAtRead, selectInitializers, initializerMayRetainEntry, retainedInitializerOrigins, semanticCapturePosition, semanticBindingPrecedesCapture, semanticBindingEffectFollowsCapture, semanticBindingEffectFollowsRead, semanticEscapeFollowsCapture, commonJsWrapperBindingDeclaration, semanticBindingHasPriorValueWrite, isUnmodifiedCommonJsWrapperBinding, isUnshadowedGlobal;
function init_javascriptSemanticMutationInitializers() {
	return (init_javascriptSemanticMutationInitializers = __esmMin((() => {
		init_javascriptSemanticTraversal();
		init_javascriptModuleDeclaration();
		init_javascriptSourceParser();
		init_javascriptSemanticIterationSources();
		init_javascriptSemanticEffectRecord();
		init_javascriptSemanticEvaluationOrder();
		init_javascriptAstValues();
		init_javascriptSemanticState();
		initializerPositionCaches = new WeakMap();
		initializerPositionCache = (parents) => {
			const cached = initializerPositionCaches.get(parents);
			if (cached !== undefined) return cached;
			const created = {
				direct: new WeakMap(),
				topLevel: new WeakMap(),
				mutation: new WeakMap(),
				reference: new WeakMap(),
				read: new WeakMap(),
				enclosingFunction: new WeakMap(),
				functionPosition: new WeakMap(),
				listIndices: new WeakMap(),
				moduleFunctionReads: new WeakMap(),
				evaluationChildren: new WeakMap(),
				expressionAncestry: undefined
			};
			initializerPositionCaches.set(parents, created);
			return created;
		};
		siblingIndex = (node, siblings, parents) => {
			if (siblings.length <= 1) return siblings[0] === node ? 0 : -1;
			const cache = initializerPositionCache(parents).listIndices;
			let indices = cache.get(siblings);
			if (indices === undefined) {
				indices = new Map(siblings.map((entry, index) => [entry, index]));
				cache.set(siblings, indices);
			}
			return indices.get(node) ?? -1;
		};
		statementPosition = (statement, parents, declarator) => {
			const directParent = parents.get(statement);
			const enclosing = (t.isExportNamedDeclaration(directParent) || t.isExportDefaultDeclaration(directParent)) && directParent.declaration === statement ? directParent : statement;
			const parent = parents.get(enclosing);
			if (!t.isProgram(parent) && !t.isBlockStatement(parent)) return null;
			const index = siblingIndex(enclosing, parent.body, parents);
			return index < 0 ? null : {
				owner: parent,
				index,
				declaratorIndex: t.isVariableDeclaration(statement) && declarator !== undefined ? siblingIndex(declarator, statement.declarations, parents) : -1
			};
		};
		positionPrecedes = (left, right) => left.owner === right.owner && (left.index < right.index || left.index === right.index && left.declaratorIndex >= 0 && left.declaratorIndex < right.declaratorIndex);
		sameStatementPosition = (left, right) => left.owner === right.owner && left.index === right.index && left.declaratorIndex === right.declaratorIndex;
		computeTopLevelStatementPosition = (node, parents) => {
			let selected = null;
			let declarator;
			let child;
			while (node !== undefined) {
				if (t.isFunction(node) && (child === undefined || !semanticMethodDefinitionExpression(node, child)) || t.isLoop(node)) return null;
				if (delayedInstanceFieldValue(node, child)) return null;
				if (t.isVariableDeclarator(node)) declarator = node;
				if (t.isStatement(node)) {
					const enclosing = statementPosition(node, parents, declarator);
					if (enclosing !== null) selected = enclosing;
				}
				if (t.isProgram(node)) return selected;
				child = node;
				node = parents.get(node);
			}
			return null;
		};
		topLevelStatementPosition = (node, parents) => {
			if (node === undefined) return null;
			const cache = initializerPositionCache(parents);
			const cached = cache.topLevel.get(node);
			if (cached !== undefined) return cached;
			const computed = computeTopLevelStatementPosition(node, parents);
			cache.topLevel.set(node, computed);
			return computed;
		};
		semanticTopLevelEffectFollowsCapture = (capture, effect, parents) => {
			const before = topLevelStatementPosition(capture, parents);
			const after = topLevelStatementPosition(effect, parents);
			if (before === null || after === null) return false;
			if (positionPrecedes(before, after)) return true;
			return sameStatementPosition(before, after) && expressionEvaluationOrder(capture, effect, parents) === "before";
		};
		scopeEffectMarkers = {
			acquire: new WeakMap(),
			exit: new WeakMap()
		};
		scopeEffectOwners = new WeakMap();
		semanticScopeEffect = (scope, positionOwner, phase) => {
			const markers = scopeEffectMarkers[phase];
			const cached = markers.get(scope);
			if (cached !== undefined) return cached;
			const marker = t.emptyStatement();
			const boundary = phase === "acquire" ? "start" : "end";
			if (scope[boundary] !== undefined) {
				marker.start = scope[boundary];
				marker.end = scope[boundary];
			}
			if (scope.loc != null) marker.loc = {
				...scope.loc,
				start: scope.loc[boundary],
				end: scope.loc[boundary]
			};
			markers.set(scope, marker);
			scopeEffectOwners.set(marker, {
				scope,
				positionOwner,
				phase
			});
			return marker;
		};
		semanticScopeExitEffect = (scope, positionOwner = scope) => semanticScopeEffect(scope, positionOwner, "exit");
		semanticArrayPatternAcquisitionEffect = (scope, positionOwner) => semanticScopeEffect(scope, positionOwner ?? scope, "acquire");
		semanticArrayPatternCloseScope = (effect) => {
			const owner = effect === undefined ? undefined : scopeEffectOwners.get(effect);
			return owner?.phase === "exit" && t.isArrayPattern(owner.scope) ? owner.scope : undefined;
		};
		isSemanticArrayPatternEffect = (effect) => effect !== undefined && t.isArrayPattern(scopeEffectOwners.get(effect)?.scope);
		withinScopeExit = (reference, scope, parents) => {
			for (let node = reference; node !== undefined; node = parents.get(node)) {
				if (node === scope) {
					for (let owner = parents.get(scope); owner !== undefined; owner = parents.get(owner)) {
						if (t.isLoop(owner)) return false;
						if (t.isFunction(owner)) break;
					}
					return !t.isLoop(scope);
				}
				if (t.isFunction(node) || t.isLoop(node)) return false;
			}
			return false;
		};
		semanticEffectFollowsReference = (reference, effect, parents) => {
			if (reference === effect) return false;
			const exit = effect === undefined ? undefined : scopeEffectOwners.get(effect);
			if (exit !== undefined) {
				if ((exit.phase === "exit" || reference === exit.scope) && withinScopeExit(reference, exit.scope, parents)) return true;
				effect = exit.scope;
			}
			let current = reference;
			let child;
			while (current !== undefined && current !== effect) {
				if (t.isFunction(current) || delayedInstanceFieldValue(current, child)) break;
				child = current;
				current = parents.get(current);
			}
			const loopInput = (t.isForInStatement(effect) || t.isForOfStatement(effect)) && child === effect.right;
			let once = current;
			child = undefined;
			while (once !== undefined) {
				const initialLoopInput = t.isForStatement(once) && child === once.init || (t.isForInStatement(once) || t.isForOfStatement(once)) && child === once.right || once === effect && loopInput;
				if (t.isFunction(once) || t.isLoop(once) && !initialLoopInput || delayedInstanceFieldValue(once, child)) break;
				child = once;
				once = parents.get(once);
			}
			return current === effect && once === undefined && (t.isAssignmentExpression(effect) || t.isUpdateExpression(effect) || t.isVariableDeclarator(effect) || t.isCallExpression(effect) || t.isOptionalCallExpression(effect) || t.isNewExpression(effect)) || current === effect && once === undefined && loopInput || semanticTopLevelEffectFollowsCapture(reference, effect, parents);
		};
		semanticEffectTiming = (site, effect, state) => {
			if (effect === undefined) return "unknown";
			const exit = scopeEffectOwners.get(effect);
			if (exit !== undefined) {
				if (withinScopeExit(site, exit.scope, state.parentsByNode)) return exit.phase === "exit" || site === exit.scope ? "after" : "before";
				effect = exit.scope;
			}
			if (site === effect && (t.isCallExpression(site) || t.isOptionalCallExpression(site) || t.isNewExpression(site))) return "after";
			const loop = semanticEnclosingIteration(effect, state);
			if (loop !== undefined) {
				const cardinality = semanticIterationCardinality(loop, state.prototypeEnumerationMayAffect);
				if (cardinality === "empty") return "after";
				if (cardinality === "nonempty") {
					const loopParent = state.parentsByNode.get(loop);
					if (loopParent === state.program && runsInProgramActivation(site, state.program, state.parentsByNode) && typeof loop.start === "number" && typeof loop.end === "number" && typeof site.start === "number") {
						if (site.start > loop.end) return "before";
						if (site.start < loop.start) return "after";
					}
				}
			}
			if (semanticEffectFollowsReference(site, effect, state.parentsByNode)) return "after";
			if (semanticEffectFollowsReference(effect, site, state.parentsByNode)) return "before";
			return "unknown";
		};
		runsInProgramActivation = (node, program, parents) => {
			let child;
			for (let current = node; current !== undefined && current !== program; current = parents.get(current)) {
				if (t.isFunction(current) || delayedInstanceFieldValue(current, child)) return false;
				child = current;
			}
			return true;
		};
		semanticEnclosingIteration = (node, state) => {
			let child;
			for (let current = node; current !== undefined; current = state.parentsByNode.get(current)) {
				if (t.isForInStatement(current) || t.isForOfStatement(current)) return current;
				if (t.isFunction(current) || delayedInstanceFieldValue(current, child)) return undefined;
				child = current;
			}
			return undefined;
		};
		expressionSiblings = (earlier, later, parents) => {
			const cache = initializerPositionCache(parents);
			let context = cache.expressionAncestry;
			if (context?.source !== earlier) {
				const ancestors = new Map();
				let child;
				for (let node = earlier; node !== undefined; node = parents.get(node)) {
					ancestors.set(node, child);
					child = node;
				}
				context = {
					source: earlier,
					ancestors,
					siblings: new WeakMap()
				};
				cache.expressionAncestry = context;
			}
			const path = [];
			let result = null;
			for (let node = later; node !== undefined; node = parents.get(node)) {
				if (context.ancestors.has(node)) {
					const sourceChild = context.ancestors.get(node);
					const readChild = path.at(-1);
					if (sourceChild !== undefined && readChild !== undefined) result = {
						common: node,
						earlier: sourceChild,
						later: readChild
					};
					break;
				}
				const cached = context.siblings.get(node);
				if (cached !== undefined) {
					result = cached;
					break;
				}
				path.push(node);
			}
			for (const node of path) context.siblings.set(node, result);
			return result;
		};
		expressionChildIndices = (node, parents) => {
			const cache = initializerPositionCache(parents).evaluationChildren;
			const cached = cache.get(node);
			if (cached !== undefined) return cached;
			const children = (() => {
				if (t.isSequenceExpression(node)) return node.expressions;
				if (t.isArrayExpression(node) || t.isArrayPattern(node)) return node.elements;
				if (t.isObjectExpression(node) || t.isObjectPattern(node)) return node.properties;
				if (t.isObjectProperty(node)) return node.computed ? [node.key, node.value] : [node.value];
				if (t.isCallExpression(node) || t.isOptionalCallExpression(node) || t.isNewExpression(node)) return node.arguments;
				if (t.isBinaryExpression(node) || t.isLogicalExpression(node)) return [node.left, node.right];
				if (t.isConditionalExpression(node)) return [node.test];
				return null;
			})();
			if (children === null) {
				cache.set(node, null);
				return null;
			}
			const indices = new Map();
			let index = 0;
			if (t.isCallExpression(node) || t.isOptionalCallExpression(node) || t.isNewExpression(node)) indices.set(node.callee, index++);
			for (const child of children) {
				if (child !== null) indices.set(child, index);
				index++;
			}
			cache.set(node, indices);
			return indices;
		};
		expressionEvaluationOrder = (earlier, later, parents) => {
			if (later === undefined) return "unresolved";
			const siblings = expressionSiblings(earlier, later, parents);
			if (siblings === null) return "unresolved";
			const children = expressionChildIndices(siblings.common, parents);
			const earlierIndex = children?.get(siblings.earlier);
			const laterIndex = children?.get(siblings.later);
			if (earlierIndex === undefined || laterIndex === undefined || earlierIndex === laterIndex) return "unresolved";
			return earlierIndex < laterIndex ? "before" : "after";
		};
		computeDirectInitializerPosition = (node, parents) => {
			if (t.isClassDeclaration(node) && node.id !== null) return statementPosition(node, parents);
			if (t.isAssignmentExpression(node) && t.isIdentifier(unwrapJavaScriptExpression(node.left).node) || t.isUpdateExpression(node)) return directMutationPosition(node, parents);
			const parent = parents.get(node);
			if (t.isVariableDeclarator(parent) && parent.init === node) {
				const declaration = parents.get(parent);
				return t.isVariableDeclaration(declaration) ? statementPosition(declaration, parents, parent) : null;
			}
			if (t.isAssignmentExpression(parent) && parent.right === node && (t.isIdentifier(parent.left) || parent.operator === "=" && (t.isObjectPattern(parent.left) || t.isArrayPattern(parent.left)))) {
				return directMutationPosition(parent, parents);
			}
			return null;
		};
		directInitializerPosition = (node, parents) => {
			const cache = initializerPositionCache(parents);
			const cached = cache.direct.get(node);
			if (cached !== undefined) return cached;
			const computed = computeDirectInitializerPosition(node, parents);
			cache.direct.set(node, computed);
			return computed;
		};
		computeDirectMutationPosition = (node, parents) => {
			if (t.isForOfStatement(node)) return statementPosition(node, parents);
			if (t.isVariableDeclarator(node)) {
				const declaration = parents.get(node);
				return t.isVariableDeclaration(declaration) ? statementPosition(declaration, parents, node) : null;
			}
			if (t.isSpreadElement(node)) {
				const array = parents.get(node);
				return t.isArrayExpression(array) ? semanticCapturePosition(array, parents) : null;
			}
			if (!t.isAssignmentExpression(node) && !t.isUpdateExpression(node) && !t.isUnaryExpression(node, { operator: "delete" }) && !t.isCallExpression(node) && !t.isOptionalCallExpression(node) && !t.isNewExpression(node) && !t.isTaggedTemplateExpression(node)) return null;
			let current = node;
			while (true) {
				const parent = parents.get(current);
				if (parent === undefined || t.isFunction(parent) || semanticBranchMayBeSkipped(parent, current)) return null;
				if (t.isStatement(parent)) return statementPosition(parent, parents);
				if (t.isVariableDeclarator(parent)) {
					const declaration = parents.get(parent);
					return t.isVariableDeclaration(declaration) ? statementPosition(declaration, parents, parent) : null;
				}
				current = parent;
			}
		};
		directMutationPosition = (node, parents) => {
			const cache = initializerPositionCache(parents);
			const cached = cache.mutation.get(node);
			if (cached !== undefined) return cached;
			const computed = computeDirectMutationPosition(node, parents);
			cache.mutation.set(node, computed);
			return computed;
		};
		semanticDefiniteEffectPrecedesReference = (effect, reference, parents) => {
			const before = directMutationPosition(effect, parents);
			const after = bindingReadPosition(reference, parents);
			if (before === null || after.position === null || after.repeatingLoop) return false;
			if (positionPrecedes(before, after.position)) return true;
			return sameStatementPosition(before, after.position) && expressionEvaluationOrder(effect, reference, parents) === "before";
		};
		semanticReadPrecedesEffectWithinActivation = (read, effect, parents) => {
			const before = bindingReadPosition(read, parents);
			const after = directMutationPosition(effect, parents);
			if (before.position === null || before.repeatingLoop || after === null) return false;
			if (positionPrecedes(before.position, after)) return true;
			return sameStatementPosition(before.position, after) && expressionEvaluationOrder(read, effect, parents) === "before";
		};
		semanticEffectTimingWithinActivation = (site, effect, state) => {
			if (effect !== undefined) {
				if (semanticDefiniteEffectPrecedesReference(site, effect, state.parentsByNode)) return "after";
				if (semanticDefiniteEffectPrecedesReference(effect, site, state.parentsByNode)) return "before";
			}
			return semanticEffectTiming(site, effect, state);
		};
		computeReferenceInitializerPosition = (node, parents) => {
			let current = node;
			while (true) {
				const direct = directInitializerPosition(current, parents);
				if (direct !== null) return direct;
				const parent = parents.get(current);
				if (t.isAssignmentExpression(parent, { operator: "=" }) && (t.isObjectPattern(parent.left) || t.isArrayPattern(parent.left))) return directMutationPosition(parent, parents);
				if (t.isFunction(parent)) return t.isBlockStatement(parent.body) ? {
					owner: parent.body,
					index: -1,
					declaratorIndex: -1
				} : null;
				if (parent === undefined || t.isStatement(parent) || delayedInstanceFieldValue(parent, current)) return null;
				if (t.isVariableDeclarator(parent)) {
					const declaration = parents.get(parent);
					return t.isVariableDeclaration(declaration) ? statementPosition(declaration, parents, parent) : null;
				}
				current = parent;
			}
		};
		referenceInitializerPosition = (node, parents) => {
			const cache = initializerPositionCache(parents);
			const cached = cache.reference.get(node);
			if (cached !== undefined) return cached;
			const computed = computeReferenceInitializerPosition(node, parents);
			cache.reference.set(node, computed);
			return computed;
		};
		initializerPosition = (initializer, parents, reference = false) => {
			if (initializer.entryBody !== undefined) return {
				owner: initializer.entryBody,
				index: -1,
				declaratorIndex: -1
			};
			return reference ? referenceInitializerPosition(initializer.node, parents) : directInitializerPosition(initializer.node, parents);
		};
		semanticMutationInitializers = (binding, mutation, parents) => {
			const mutationPosition = directMutationPosition(mutation, parents) ?? referenceInitializerPosition(mutation, parents);
			if (mutationPosition === null) return binding;
			const origins = [...binding.initializers.map((initializer) => ({
				initializer,
				position: initializerPosition(initializer, parents)
			})), ...binding.referenceInitializers.map((initializer) => ({
				initializer,
				position: initializerPosition(initializer, parents, true)
			}))];
			if (origins.some(({ position }) => position === null || !positionPrecedes(position, mutationPosition))) return binding;
			const { retained, replacesEntry } = retainedInitializerOrigins(origins, binding, parents);
			return {
				directOrigins: replacesEntry ? [] : binding.directOrigins,
				initializers: binding.initializers.filter((initializer) => retained.has(initializer)),
				referenceInitializers: binding.referenceInitializers.filter((initializer) => retained.has(initializer))
			};
		};
		bindingEnclosingFunction = (read, parents) => {
			const cache = initializerPositionCache(parents).enclosingFunction;
			const path = [];
			let current = read;
			let result = null;
			while (true) {
				const cached = cache.get(current);
				if (cached !== undefined) {
					result = cached;
					break;
				}
				path.push(current);
				const parent = parents.get(current);
				if (parent === undefined || delayedInstanceFieldValue(parent, current)) break;
				if (t.isFunction(parent) && !semanticMethodDefinitionExpression(parent, current)) {
					if (current === parent.body) result = parent;
					break;
				}
				current = parent;
			}
			for (const node of path) cache.set(node, result);
			return result ?? undefined;
		};
		bindingReadPosition = (read, parents) => {
			const cache = initializerPositionCache(parents).read;
			const path = [];
			let current = read;
			let result;
			while (true) {
				const cached = cache.get(current);
				if (cached !== undefined) {
					result = cached;
					break;
				}
				path.push(current);
				const parent = parents.get(current);
				if (t.isLoop(parent)) {
					result = {
						position: null,
						repeatingLoop: parent
					};
					break;
				}
				if (parent === undefined || t.isFunction(parent) && !semanticMethodDefinitionExpression(parent, current) || delayedInstanceFieldValue(parent, current)) {
					result = {
						position: null,
						repeatingLoop: undefined
					};
					break;
				}
				current = parent;
			}
			for (let index = path.length - 1; index >= 0; index--) {
				const node = path[index];
				if (node === undefined) continue;
				const parent = parents.get(node);
				let position = null;
				let initializer;
				if (t.isVariableDeclarator(parent)) {
					const declaration = parents.get(parent);
					if (t.isVariableDeclaration(declaration)) position = statementPosition(declaration, parents, parent);
					if (node === parent.init) initializer = parent;
				} else if (t.isStatement(parent) && !t.isLoop(parent) && !t.isFunction(parent)) position = statementPosition(parent, parents);
				if (position !== null) result = {
					repeatingLoop: result.repeatingLoop,
					position,
					...initializer === undefined ? {} : { initializer }
				};
				cache.set(node, result);
			}
			return result;
		};
		semanticBindingMayRejectAssignmentAt = (binding, access, { parentsByNode }) => {
			const { declarationKinds } = binding;
			if (binding.runtimeImport || declarationKinds.has("const") || declarationKinds.has("using") || declarationKinds.has("await using") || binding.selfNameAssignment === "always-throws" || binding.selfNameAssignment === "throws-in-strict-mode" && javaScriptStrictnessAt(access, parentsByNode) !== "sloppy") return true;
			const declarator = binding.letDeclarator;
			if (declarator == null || declarationKinds.size !== 1) return false;
			const declaration = parentsByNode.get(declarator);
			if (!t.isVariableDeclaration(declaration)) return false;
			const { position, initializer } = bindingReadPosition(access, parentsByNode);
			const end = statementPosition(declaration, parentsByNode, declarator);
			if (position === null || end === null) return false;
			if (initializer === declarator) return true;
			let before = position;
			while (before !== null && before.owner !== end.owner) {
				before = t.isBlockStatement(before.owner) ? statementPosition(before.owner, parentsByNode) : null;
			}
			return before !== null && positionPrecedes(before, end);
		};
		semanticCaptureOrderingIdentity = (capture, parents) => {
			if (!t.isMemberExpression(capture) && !t.isOptionalMemberExpression(capture)) return capture;
			const loop = bindingReadPosition(capture, parents).repeatingLoop;
			if (loop === undefined) return capture;
			let child = capture;
			for (let parent = parents.get(child); parent !== undefined && parent !== loop; parent = parents.get(child)) child = parent;
			if (t.isForStatement(loop) && child === loop.init || (t.isForInStatement(loop) || t.isForOfStatement(loop)) && child === loop.right) return capture;
			return loop;
		};
		moduleFunctionFirstRead = (declaration, body, parents, state) => {
			const cache = initializerPositionCache(parents).moduleFunctionReads;
			let retained = cache.get(body);
			const memberEffectsComplete = state?.memberMutationFactsComplete === true;
			if (retained?.memberEffectsComplete !== memberEffectsComplete) retained = undefined;
			if (retained === undefined) {
				const reads = new WeakMap();
				retained = {
					reads,
					memberEffectsComplete,
					opaquePositions: new WeakMap(),
					opaqueSitesIndexed: 0,
					firstOpaqueRead: Infinity
				};
				cache.set(body, retained);
				const functions = new Map();
				for (const statement of body) {
					const exported = t.isExportNamedDeclaration(statement) || t.isExportDefaultDeclaration(statement);
					if (t.isExportNamedDeclaration(statement) && isTypeOnlyExportDeclaration(statement)) continue;
					const node = exported ? statement.declaration : statement;
					if (!t.isFunctionDeclaration(node)) continue;
					reads.set(node, exported ? null : Infinity);
					if (node.id == null) continue;
					const name = node.id.name;
					if (functions.has(name)) {
						const previous = functions.get(name);
						if (previous != null) reads.set(previous, null);
						reads.set(node, null);
						functions.set(name, null);
					} else functions.set(name, node);
				}
				const indexedReads = reads;
				const firstStatement = body[0];
				const program = firstStatement === undefined ? undefined : parents.get(firstStatement);
				const classicScript = t.isProgram(program) && javaScriptRuntimeContext(program) === "unknown";
				const globalReceivers = new WeakMap();
				const propertyReaders = new WeakMap();
				const ownMethodReaders = new WeakMap();
				const ownMethodAtSource = (node, name) => {
					let read = ownMethodReaders.get(node);
					if (read === undefined) {
						read = staticObjectOwnMethodReader(node);
						ownMethodReaders.set(node, read);
					}
					return read(name);
				};
				const receiverPrototypeOwners = new WeakMap();
				const bindingReceivers = new WeakMap();
				const globalReceiver = (input) => {
					const pending = [{
						node: input,
						finish: false
					}];
					const visiting = new Set();
					const origins = new WeakMap();
					while (pending.length > 0) {
						const frame = pending.pop();
						if (frame === undefined) continue;
						const current = frame.node;
						if (frame.finish) {
							const fact = origins.get(current);
							if (fact === undefined) continue;
							let global = fact.global;
							let unknown = fact.unknown;
							for (const dependency of fact.dependencies) {
								for (const owner of receiverPrototypeOwners.get(dependency) ?? []) fact.owners.add(owner);
								const answer = globalReceivers.get(dependency);
								if (answer === true) global = true;
								if (answer === null || answer === undefined) unknown = true;
							}
							receiverPrototypeOwners.set(current, fact.owners);
							globalReceivers.set(current, global ? true : unknown ? null : false);
							visiting.delete(current);
							continue;
						}
						if (globalReceivers.has(current)) continue;
						if (visiting.has(current)) {
							globalReceivers.set(current, null);
							continue;
						}
						visiting.add(current);
						const fact = {
							dependencies: [],
							unknown: false,
							global: false,
							owners: new Set()
						};
						const node = unwrapJavaScriptExpression(current).node;
						if (t.isArrayExpression(node)) fact.owners.add("Array");
						else if (t.isFunction(node)) fact.owners.add("Function");
						else if (t.isObjectExpression(node)) fact.owners.add("Object");
						else if (t.isStringLiteral(node) || t.isTemplateLiteral(node)) fact.owners.add("String");
						else if (t.isNumericLiteral(node)) fact.owners.add("Number");
						else if (t.isBooleanLiteral(node)) fact.owners.add("Boolean");
						else if (t.isRegExpLiteral(node)) fact.owners.add("RegExp");
						else if (t.isBigIntLiteral(node)) fact.owners.add("BigInt");
						if (node !== current) fact.dependencies.push(node);
						else if (t.isThisExpression(node)) {
							const owner = t.isProgram(program) ? javaScriptThisOwner(node, program, parents) : "caller";
							fact.global = owner === "global";
							fact.unknown = owner === "caller";
						} else if (t.isIdentifier(node)) {
							const binding = state === undefined ? undefined : resolveSemanticBindingState(state, node, node.name);
							if (binding === undefined) {
								if ([
									"globalThis",
									"window",
									"self"
								].includes(node.name)) fact.global = true;
								else fact.unknown = true;
							} else {
								const representative = bindingReceivers.get(binding);
								if (representative !== undefined && representative !== current) {
									fact.dependencies.push(representative);
								} else {
									bindingReceivers.set(binding, current);
									if (binding.initializers.length === 0 || binding.referenceInitializers.length > 0) fact.unknown = true;
									for (const initializer of binding.initializers) {
										if (initializer.projection.length > 0) fact.unknown = true;
										else fact.dependencies.push(initializer.node);
									}
								}
							}
						} else if (t.isObjectExpression(node)) {
							fact.unknown = node.properties.some((property) => t.isSpreadElement(property) || t.isObjectProperty(property) && semanticStaticPropertyKey(property.key, property.computed) === "__proto__");
						} else if (!t.isArrayExpression(node) && !t.isLiteral(node) && !t.isFunction(node)) fact.unknown = true;
						origins.set(current, fact);
						pending.push({
							node: current,
							finish: true
						});
						for (const dependency of fact.dependencies) pending.push({
							node: dependency,
							finish: false
						});
					}
					return globalReceivers.get(input) ?? null;
				};
				const receiverBounds = new WeakMap();
				const receiverBound = (root) => {
					const pending = [{
						binding: root,
						finish: false
					}];
					const activeBindings = new Set();
					const dependencies = new WeakMap();
					const merge = (left, right) => {
						if (left.index < right.index) return left;
						if (right.index < left.index) return right;
						return {
							...left,
							ambiguous: left.ambiguous || right.ambiguous || left.node !== right.node
						};
					};
					while (pending.length > 0) {
						const frame = pending.pop();
						const binding = frame.binding;
						if (frame.finish) {
							let bound = {
								index: Infinity,
								ambiguous: false
							};
							for (const effects of [binding.memberWrites, binding.escapedPaths]) {
								for (const effect of effects) {
									const position = effect.node === undefined ? null : directMutationPosition(effect.node, parents);
									if (effect.node === undefined || position === null || position.owner.body !== body) {
										bound = null;
										break;
									}
									bound = merge(bound, {
										index: position.index,
										node: effect.node,
										ambiguous: false
									});
								}
								if (bound === null) break;
							}
							for (const dependency of dependencies.get(binding) ?? []) {
								const inherited = receiverBounds.get(dependency);
								if (bound === null || inherited === null || inherited === undefined) {
									bound = null;
									break;
								}
								bound = merge(bound, inherited);
							}
							receiverBounds.set(binding, bound);
							activeBindings.delete(binding);
							continue;
						}
						if (receiverBounds.has(binding)) continue;
						if (activeBindings.has(binding)) {
							receiverBounds.set(binding, null);
							continue;
						}
						activeBindings.add(binding);
						const selected = [];
						for (const initializer of binding.initializers) {
							const node = unwrapJavaScriptExpression(initializer.node).node;
							if (!t.isIdentifier(node) || state === undefined) continue;
							const dependency = resolveSemanticBindingState(state, node, node.name);
							if (dependency !== undefined) selected.push(dependency);
						}
						dependencies.set(binding, selected);
						pending.push({
							binding,
							finish: true
						});
						for (const dependency of selected) pending.push({
							binding: dependency,
							finish: false
						});
					}
					return receiverBounds.get(root) ?? null;
				};
				const prototypeBounds = new Map();
				for (const owner of semanticPrototypeOwners) {
					let bound = {
						index: Infinity,
						ambiguous: false
					};
					for (const effect of state?.prototypeMutationSites ?? []) {
						if (effect.owner !== owner && effect.owner !== "Object") continue;
						const position = directMutationPosition(effect.node, parents);
						if (position === null || position.owner.body !== body) {
							bound = null;
							break;
						}
						if (position.index < bound.index) bound = {
							index: position.index,
							node: effect.node,
							ambiguous: false
						};
						else if (position.index === bound.index && effect.node !== bound.node) bound = {
							...bound,
							ambiguous: true
						};
					}
					prototypeBounds.set(owner, bound);
				}
				const receiverAtRead = (input, read) => {
					const identity = globalReceiver(input);
					for (const owner of receiverPrototypeOwners.get(input) ?? []) {
						const bound = prototypeBounds.get(owner);
						if (bound === null) return null;
						if (bound !== undefined && bound.index !== Infinity) {
							const position = bindingReadPosition(read, parents);
							if (position.position === null || position.repeatingLoop || position.position.owner.body !== body) return null;
							if (position.position.index > bound.index) return null;
							if (position.position.index === bound.index && (bound.ambiguous || bound.node === undefined || state === undefined || semanticEffectTiming(read, bound.node, state) !== "after")) return null;
						}
					}
					if (identity !== false || state === undefined || !memberEffectsComplete) return identity;
					const root = unwrapJavaScriptExpression(input).node;
					if (!t.isIdentifier(root)) return identity;
					const binding = resolveSemanticBindingState(state, root, root.name);
					if (binding === undefined) return null;
					const bound = receiverBound(binding);
					if (bound === null) return null;
					if (bound.index === Infinity) return identity;
					const position = bindingReadPosition(read, parents);
					if (position.position === null || position.repeatingLoop || position.position.owner.body !== body) return null;
					if (position.position.index < bound.index) return identity;
					if (position.position.index > bound.index || bound.ambiguous) return null;
					return bound.node !== undefined && (semanticReadPrecedesEffectWithinActivation(read, bound.node, parents) || semanticEffectTiming(read, bound.node, state) === "after") ? identity : null;
				};
				const active = new Set();
				const retainNamedRead = (name, parent, index) => {
					const fn = functions.get(name);
					if (fn == null || active.has(fn)) return;
					const current = indexedReads.get(fn);
					if (current === null || current === undefined) return;
					indexedReads.set(fn, active.size > 0 || t.isExportSpecifier(parent) ? null : Math.min(current, index));
				};
				const opaquePositions = retained.opaquePositions;
				const definitionKeys = new WeakMap();
				let unknownPropertyRead = Infinity;
				for (let index = 0; index < body.length; index++) {
					const statement = body[index];
					if (statement === undefined) continue;
					traverseJavaScriptAst(statement, {
						skip: (node) => state?.erasedSyntaxNodes.has(node) === true || isErasedJavaScriptValueChild(node, parents.get(node) ?? null),
						enter(node, parent) {
							if (semanticMethodDefinitionExpression(parent ?? undefined, node) && parent !== null && t.isFunction(parent)) {
								active.delete(parent);
								definitionKeys.set(node, parent);
							}
							if (t.isFunction(node)) active.add(node);
							if (t.isCallExpression(node) && state !== undefined && isSemanticDirectEvalSite(node, state)) {
								if (unknownPropertyRead !== null) unknownPropertyRead = active.size > 0 ? null : Math.min(unknownPropertyRead, index);
							}
							if (classicScript && (t.isCallExpression(node) || t.isOptionalCallExpression(node) || t.isNewExpression(node) || t.isTaggedTemplateExpression(node))) {
								opaquePositions.set(node, active.size > 0 ? null : index);
							}
							if (classicScript) {
								for (const source of semanticPropertyReadSources(node, parent, state)) {
									const projected = source.iterationSources !== undefined || source.projection.length > 1;
									if (!projected && receiverAtRead(source.node, node) === false) continue;
									if (projected && source.iterationSources === undefined) {
										let receiver = source.node;
										for (const key of source.projection.slice(0, -1)) {
											if (typeof key !== "string" && typeof key !== "number") {
												receiver = undefined;
												break;
											}
											if (receiver === undefined) break;
											let read = propertyReaders.get(receiver);
											if (read === undefined) {
												read = staticObjectPropertyReader(receiver);
												propertyReaders.set(receiver, read);
											}
											const selected = read(String(key));
											receiver = selected.status === "explicit" ? selected.value : undefined;
											if (receiver === undefined) break;
										}
										if (receiver !== undefined && receiverAtRead(receiver, node) === false) continue;
									}
									const key = source.projection[0];
									if (!projected && typeof key === "string") retainNamedRead(key, parent, index);
									else if (unknownPropertyRead !== null) unknownPropertyRead = active.size > 0 ? null : Math.min(unknownPropertyRead, index);
								}
							}
							let name = null;
							if (t.isIdentifier(node) && parent !== null && (t.isReferenced(node, parent) || t.isAssignmentExpression(parent) && parent.left === node && semanticWriteSiteReadsFirst(parent))) {
								const candidate = functions.get(node.name);
								const binding = state === undefined ? undefined : resolveSemanticBindingState(state, node, node.name);
								if (candidate != null && state !== undefined && semanticResolutionBlocked(state, node, node.name)) {
									const current = indexedReads.get(candidate);
									if (current !== null && current !== undefined) indexedReads.set(candidate, active.size > 0 ? null : Math.min(current, index));
									return;
								}
								if (state === undefined || candidate != null && binding?.initializers.some(({ node: value }) => value === candidate)) name = node.name;
							} else if (classicScript && (t.isMemberExpression(node) || t.isOptionalMemberExpression(node))) {
								const receiver = unwrapJavaScriptExpression(node.object).node;
								const selected = semanticStaticPropertyKey(node.property, node.computed);
								const ownMethod = selected !== null && functions.has(selected) && (ownMethodAtSource(receiver, selected) || state !== undefined && t.isIdentifier(receiver) && (() => {
									const binding = resolveSemanticBindingState(state, receiver, receiver.name);
									if (binding === undefined || receiverBound(binding)?.index !== Infinity) return false;
									return binding.initializers.length === 1 && binding.initializers[0].projection.length === 0 && ownMethodAtSource(unwrapJavaScriptExpression(binding.initializers[0].node).node, selected);
								})());
								if (!ownMethod && receiverAtRead(receiver, node) !== false) {
									name = selected;
									if (name === null) {
										if (unknownPropertyRead !== null) unknownPropertyRead = active.size > 0 ? null : Math.min(unknownPropertyRead, index);
										return;
									}
								}
							}
							if (name !== null) retainNamedRead(name, parent, index);
						},
						exit(node) {
							if (t.isFunction(node)) active.delete(node);
							const method = definitionKeys.get(node);
							if (method !== undefined) active.add(method);
						}
					});
				}
				for (const fn of functions.values()) {
					if (fn == null) continue;
					const current = indexedReads.get(fn);
					if (current !== null && current !== undefined) indexedReads.set(fn, unknownPropertyRead === null ? null : Math.min(current, unknownPropertyRead));
				}
			}
			const sites = state === undefined ? [] : semanticGlobalCodeSites(state);
			while (retained.opaqueSitesIndexed < sites.length) {
				const site = sites[retained.opaqueSitesIndexed++];
				const position = site === undefined ? undefined : retained.opaquePositions.get(site);
				if (position === undefined || retained.firstOpaqueRead === null) continue;
				retained.firstOpaqueRead = position === null ? null : Math.min(retained.firstOpaqueRead, position);
			}
			const read = retained.reads.get(declaration);
			const first = read === undefined || read === null || retained.firstOpaqueRead === null ? null : Math.min(read, retained.firstOpaqueRead);
			return first !== undefined && Number.isFinite(first) ? first : null;
		};
		semanticBindingAtRead = (binding, read, context) => {
			const state = "parentsByNode" in context ? context : undefined;
			const parents = state === undefined ? context : state.parentsByNode;
			if (binding.initializers.length === 0 && binding.referenceInitializers.length === 0) return {
				status: "ordered",
				binding,
				hasDefiniteInitializer: false
			};
			const [soleInitializer] = binding.initializers;
			if (binding.initializers.length === 1 && binding.referenceInitializers.length === 0 && binding.declarationKinds.size === 0 && binding.definitions.length === 1 && binding.definitions[0]?.kind === "function" && soleInitializer !== undefined && t.isFunctionDeclaration(soleInitializer.node)) return {
				status: "ordered",
				binding,
				hasDefiniteInitializer: true
			};
			if (soleInitializer !== undefined && t.isClass(soleInitializer.node) && binding.scopeId === semanticScopeId("class", soleInitializer.node) && !binding.mutable && binding.initializers.length === 1 && binding.referenceInitializers.length === 0 && !binding.definitions.some(({ kind }) => kind === "assignment")) {
				const owner = soleInitializer.node;
				let child = read;
				let memberPart;
				for (let parent = parents.get(child); parent !== undefined; child = parent, parent = parents.get(parent)) {
					if (parents.get(parent) === owner.body) memberPart = child;
					if (parent === owner.body) {
						if (t.isClassMethod(child) || t.isClassPrivateMethod(child) ? memberPart === child.body : t.isStaticBlock(child) || (t.isClassProperty(child) || t.isClassPrivateProperty(child) || t.isClassAccessorProperty(child)) && memberPart === child.value) return {
							status: "ordered",
							binding,
							hasDefiniteInitializer: true
						};
						break;
					}
					if (parent === owner) break;
				}
			}
			const initializer = binding.initializers[0];
			const reference = binding.referenceInitializers[0];
			const origin = initializer ?? reference;
			const sourcePosition = initializer === undefined ? reference === undefined ? null : initializerPosition(reference, parents, true) : initializerPosition(initializer, parents);
			const { position, repeatingLoop } = bindingReadPosition(read, parents);
			const hasDefiniteInitializer = position !== null && [...binding.initializers, ...binding.referenceInitializers.filter(({ assignment }) => assignment)].some((initializer) => {
				const source = initializerPosition(initializer, parents, binding.referenceInitializers.includes(initializer));
				return source !== null && positionPrecedes(source, position) && !initializerMayRetainEntry(initializer, binding, parents);
			});
			if (!repeatingLoop && origin !== undefined && binding.initializers.length + binding.referenceInitializers.length === 1 && sourcePosition !== null && position !== null && positionPrecedes(sourcePosition, position)) return {
				status: "ordered",
				binding,
				hasDefiniteInitializer
			};
			const moduleConstBinding = binding.scopeId.startsWith("scope:program:") && binding.declarationKinds.size === 1 && binding.declarationKinds.has("const") && !binding.mutable;
			const enclosingFunction = moduleConstBinding ? bindingEnclosingFunction(read, parents) : undefined;
			let functionPosition = null;
			if (enclosingFunction !== undefined) {
				const positions = initializerPositionCache(parents).functionPosition;
				const cached = positions.get(enclosingFunction);
				if (cached !== undefined) functionPosition = cached;
				else {
					const compute = () => {
						if (t.isStatement(enclosingFunction)) return statementPosition(enclosingFunction, parents);
						for (let owner = parents.get(enclosingFunction); owner !== undefined; owner = parents.get(owner)) {
							if (t.isFunction(owner)) return null;
							if (t.isStatement(owner)) return statementPosition(owner, parents);
						}
						return null;
					};
					functionPosition = compute();
					positions.set(enclosingFunction, functionPosition);
				}
			}
			const firstFunctionRead = moduleConstBinding && sourcePosition !== null && functionPosition !== null && sourcePosition.owner === functionPosition.owner && t.isFunctionDeclaration(enclosingFunction) ? moduleFunctionFirstRead(enclosingFunction, sourcePosition.owner.body, parents, state) : null;
			const moduleConstInitializedBeforeActivation = moduleConstBinding && sourcePosition !== null && functionPosition !== null && sourcePosition.owner === functionPosition.owner && (t.isFunctionDeclaration(enclosingFunction) ? firstFunctionRead !== null && sourcePosition.index < firstFunctionRead : positionPrecedes(sourcePosition, functionPosition));
			const uncertainOrder = repeatingLoop || sourcePosition === null || position === null || sourcePosition.owner !== position.owner;
			if (uncertainOrder && moduleConstInitializedBeforeActivation) return {
				status: "unresolved",
				binding,
				hasDefiniteInitializer: true
			};
			if (uncertainOrder) return {
				status: "unresolved",
				binding,
				hasDefiniteInitializer
			};
			const selected = selectInitializers(binding, position, read, parents);
			if (selected === undefined) return {
				status: "unresolved",
				binding,
				hasDefiniteInitializer
			};
			if (selected.binding === binding) return {
				status: "ordered",
				binding,
				hasDefiniteInitializer: hasDefiniteInitializer || selected.hasDefiniteInitializer
			};
			return {
				status: "ordered",
				hasDefiniteInitializer: hasDefiniteInitializer || selected.hasDefiniteInitializer,
				binding: {
					...binding,
					...selected.binding,
					definitions: binding.definitions.filter(({ kind }) => kind !== "assignment")
				}
			};
		};
		selectInitializers = (binding, position, read, parents) => {
			if (position === null) return undefined;
			const origins = [...binding.initializers.map((initializer) => ({
				initializer,
				position: initializerPosition(initializer, parents)
			})), ...binding.referenceInitializers.map((initializer) => ({
				initializer,
				position: initializerPosition(initializer, parents, true)
			}))];
			const preceding = [];
			for (const origin of origins) {
				const source = origin.position;
				if (source === null || source.owner !== position.owner) return undefined;
				if (positionPrecedes(source, position)) preceding.push(origin);
				else if (!positionPrecedes(position, source)) {
					if (source.index !== position.index || source.declaratorIndex !== position.declaratorIndex) return undefined;
					const order = expressionEvaluationOrder(origin.initializer.node, read, parents);
					if (order === "unresolved") return undefined;
					if (order === "before") preceding.push(origin);
				}
			}
			const { retained, replacesEntry } = retainedInitializerOrigins(preceding, binding, parents);
			if (binding.initializers.every((initializer) => retained.has(initializer)) && binding.referenceInitializers.every((initializer) => retained.has(initializer))) return {
				binding,
				hasDefiniteInitializer: replacesEntry
			};
			return {
				hasDefiniteInitializer: replacesEntry,
				binding: {
					initializers: binding.initializers.filter((initializer) => retained.has(initializer)),
					referenceInitializers: binding.referenceInitializers.filter((initializer) => retained.has(initializer))
				}
			};
		};
		initializerMayRetainEntry = (initializer, binding, parents) => {
			const node = initializer.node, parent = parents.get(node);
			const assignment = t.isAssignmentExpression(node) ? node : t.isAssignmentExpression(parent) && parent.right === node ? parent : undefined;
			if (assignment === undefined || ![
				"&&=",
				"||=",
				"??="
			].includes(assignment.operator)) return false;
			const emptyLocal = node === assignment.right && binding.kind === "variable" && !binding.runtimeImport && binding.initializers.length === 1 && binding.initializers[0] === initializer && binding.referenceInitializers.length === 0 && binding.directOrigins.length === 0 && binding.definitions.some(({ kind }) => kind === "variable") && binding.definitions.every(({ kind }) => kind === "variable" || kind === "assignment");
			return !emptyLocal;
		};
		retainedInitializerOrigins = (origins, binding, parents) => {
			const latest = origins.reduce((latest, { initializer, position }) => position !== null && !initializerMayRetainEntry(initializer, binding, parents) && (latest === null || positionPrecedes(latest, position)) ? position : latest, null);
			return {
				replacesEntry: latest !== null,
				retained: new Set(origins.filter(({ position }) => latest === null || position?.index === latest.index && position?.declaratorIndex === latest.declaratorIndex || position !== null && positionPrecedes(latest, position)).map(({ initializer }) => initializer))
			};
		};
		semanticCapturePosition = (node, parents) => {
			let current = node;
			while (true) {
				const direct = directInitializerPosition(current, parents);
				if (direct !== null) return direct;
				const parent = parents.get(current);
				if (t.isReturnStatement(parent) && parent.argument === current) return statementPosition(parent, parents);
				if (t.isObjectProperty(parent) && parent.value === current && semanticStaticPropertyKey(parent.key, parent.computed) !== null) current = parent;
				else if (t.isSpreadElement(parent) && parent.argument === current && t.isObjectExpression(parents.get(parent))) current = parent;
				else if (t.isObjectExpression(parent) || t.isArrayExpression(parent)) current = parent;
				else return null;
			}
		};
		semanticBindingPrecedesCapture = (binding, capture, parents) => {
			const initializer = binding.initializers[0];
			if (binding.initializers.length !== 1 || initializer === undefined) return false;
			const sourcePosition = initializerPosition(initializer, parents);
			const capturePosition = semanticCapturePosition(capture, parents);
			return sourcePosition !== null && capturePosition !== null && positionPrecedes(sourcePosition, capturePosition);
		};
		semanticBindingEffectFollowsCapture = (binding, capture, effect, parents) => {
			if (!semanticBindingPrecedesCapture(binding, capture, parents)) return false;
			const captured = semanticCapturePosition(capture, parents);
			const written = directMutationPosition(effect, parents);
			return captured !== null && written !== null && positionPrecedes(captured, written);
		};
		semanticBindingEffectFollowsRead = (binding, read, effect, parents) => {
			const selected = bindingReadPosition(read, parents).position;
			return selected !== null && binding.initializers.some((initializer) => {
				const declaration = parents.get(initializer.node);
				if (!t.isVariableDeclarator(declaration) || declaration.init !== initializer.node) return false;
				const initialized = initializerPosition(initializer, parents);
				return initialized !== null && positionPrecedes(initialized, selected);
			}) && semanticReadPrecedesEffectWithinActivation(read, effect, parents);
		};
		semanticEscapeFollowsCapture = (binding, capture, escape, parents) => {
			const initializer = binding.initializers[0];
			if (escape === undefined || initializer === undefined || !semanticBindingPrecedesCapture(binding, capture, parents)) return false;
			const origin = unwrapJavaScriptExpression(initializer.node).node;
			if (!t.isObjectExpression(origin) && !t.isArrayExpression(origin) && !t.isIdentifier(origin) && !t.isMemberExpression(origin) && !t.isOptionalMemberExpression(origin)) return false;
			const capturePosition = semanticCapturePosition(capture, parents);
			const exit = scopeEffectOwners.get(escape);
			if (exit !== undefined) {
				const { scope, positionOwner } = exit;
				const exitPosition = t.isStatement(scope) ? statementPosition(scope, parents) : directMutationPosition(positionOwner, parents);
				return t.isArrayPattern(scope) && (t.isVariableDeclarator(positionOwner) && positionOwner.init === capture || t.isAssignmentExpression(positionOwner) && positionOwner.right === capture) || exit.phase === "exit" && withinScopeExit(capture, scope, parents) || capturePosition !== null && exitPosition !== null && (positionPrecedes(capturePosition, exitPosition) || t.isArrayPattern(scope) && sameStatementPosition(capturePosition, exitPosition) && expressionEvaluationOrder(capture, positionOwner, parents) === "before");
			}
			const escapePosition = directMutationPosition(escape, parents);
			return capturePosition !== null && escapePosition !== null && positionPrecedes(capturePosition, escapePosition);
		};
		commonJsWrapperBindingDeclaration = (node, name, state) => {
			if (![
				"module",
				"exports",
				"require",
				"__dirname",
				"__filename"
			].includes(name) || !t.isIdentifier(node, { name })) return undefined;
			const binding = resolveSemanticBindingState(state, node, name);
			if (binding === undefined) return undefined;
			const scope = state.scopesById.get(binding.scopeId);
			if (scope?.kind !== "program" || ![...binding.declarationKinds].every((kind) => kind === "var")) return undefined;
			if (binding.hostOrigin === "commonjs-wrapper") return binding;
			return javaScriptRuntimeContext(state.program) === "commonjs" && binding.declarationKinds.size > 0 ? binding : undefined;
		};
		semanticBindingHasPriorValueWrite = (site, binding, state) => {
			if (binding.definitions.some(({ kind }) => kind === "function")) return true;
			const writes = state.bindingWrites.get(binding.bindingId) ?? [];
			const read = semanticBindingAtRead(binding, site, state);
			const retained = read.status === "ordered" ? new Set([...read.binding.initializers, ...read.binding.referenceInitializers]) : undefined;
			const representedWrites = new Set();
			const retainedWrites = new Set();
			for (const source of [...binding.initializers, ...binding.referenceInitializers]) {
				let owner = source.node;
				while (owner !== undefined && !writes.includes(owner)) owner = state.parentsByNode.get(owner);
				if (owner !== undefined) {
					representedWrites.add(owner);
					if (retained === undefined || retained.has(source)) retainedWrites.add(owner);
				} else if ((retained === undefined || retained.has(source)) && semanticEffectTiming(site, source.node, state) !== "after") return true;
			}
			return writes.some((write) => (!representedWrites.has(write) || retainedWrites.has(write)) && semanticEffectTiming(site, write, state) !== "after");
		};
		isUnmodifiedCommonJsWrapperBinding = (node, name, state) => {
			const binding = commonJsWrapperBindingDeclaration(node, name, state);
			return binding !== undefined && !semanticBindingHasPriorValueWrite(node, binding, state);
		};
		isUnshadowedGlobal = (node, state, name) => t.isIdentifier(node, { name }) && (resolveSemanticBindingState(state, node, name) === undefined ? !semanticResolutionBlocked(state, node, name) : isUnmodifiedCommonJsWrapperBinding(node, name, state));
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptStaticAnalysisHelpers.js
var failedJavaScriptStaticAnalysis, argumentNode, chunkRuntime, findChunkRuntime, moduleFactory, modulePropertyName, staticArrayValues, staticPathResolutionContext, staticPath, staticPathFact, staticFileExpressionPath, staticConcatenation, staticCallPath, staticFileUrlPathFact, staticSourceRelativeUrlPath, staticResolvedPath, isFilesystemPathExpression, isDirectoryPath, isImportMetaUrl, isFileIdentity, XHR_METHODS, isRequestUrlOrPathLiteral, WINDOW_OPEN_CALL, FS_OPEN_FLAGS, BROWSING_CONTEXT_KEYWORDS, xhrOpenUrl, KEYED_COLLECTION_CONSTRUCTORS, isKeyedCollectionReceiver, endpointArgument, storageKind, calleeName, memberPropertyName, stringValue, argumentValue, prefixedArgument, sourceSlice, range, rangeForOffsets, sourceRangesEqual, pointForOffset, detectVendors, registrationKey, STATIC_ROUTE_CALL_NAMES, vendorPatterns;
function init_javascriptStaticAnalysisHelpers() {
	return (init_javascriptStaticAnalysisHelpers = __esmMin((() => {
		init_javascriptAstValues();
		init_unicodeCodePointOrder();
		init_javascriptStaticCoverage();
		init_javascriptSyntheticUrlRoot();
		failedJavaScriptStaticAnalysis = () => ({
			parse_status: "failed",
			analysis_coverage: {
				...unexaminedJavaScriptStaticCoverage("JavaScript source could not be parsed."),
				syntax: {
					status: "failed",
					error_count: null
				}
			},
			parse_error_count: 1,
			visited_ast_nodes: 0,
			references: [],
			endpoints: [],
			storage: [],
			bundler_registrations: [],
			role_paths: [],
			source_map_urls: [],
			vendors: [],
			electron: {
				browser_windows: [],
				context_bridge_apis: [],
				ipc: [],
				sender_validations: [],
				utility_processes: [],
				native_addon_bindings: [],
				protocols: []
			},
			limitations: ["JavaScript source could not be parsed; absence of findings is not evidence of absence.", "JavaScript syntax was parsed as data and was never evaluated."]
		});
		argumentNode = (argument) => argument !== null && t.isNode(argument) ? argument : undefined;
		chunkRuntime = (call) => {
			if (!t.isMemberExpression(call.callee) && !t.isOptionalMemberExpression(call.callee)) return undefined;
			if (semanticStaticPropertyName(call.callee.property, call.callee.computed) !== "push") return undefined;
			return findChunkRuntime(call.callee.object);
		};
		findChunkRuntime = (node) => {
			const pending = [node];
			while (pending.length > 0) {
				const current = pending.pop();
				if (current === undefined) continue;
				if (t.isIdentifier(current) && /(?:webpack|rspack)Chunk/iu.test(current.name)) return current.name;
				if (t.isMemberExpression(current) || t.isOptionalMemberExpression(current)) {
					const property = semanticStaticPropertyName(current.property, current.computed);
					if (/(?:webpack|rspack)Chunk/iu.test(property)) return property;
					if (t.isNode(current.object)) pending.push(current.object);
					continue;
				}
				if (t.isAssignmentExpression(current)) {
					pending.push(current.right, current.left);
					continue;
				}
				if (t.isLogicalExpression(current) || t.isBinaryExpression(current)) {
					pending.push(current.right, current.left);
					continue;
				}
				const unwrapped = unwrapJavaScriptExpression(current).node;
				if (unwrapped !== current) pending.push(unwrapped);
			}
			return undefined;
		};
		moduleFactory = (property) => {
			if (t.isObjectMethod(property)) return property;
			if (t.isObjectProperty(property) && (t.isFunctionExpression(property.value) || t.isArrowFunctionExpression(property.value))) return property.value;
			return undefined;
		};
		modulePropertyName = (property) => {
			if (!t.isObjectMethod(property) && !t.isObjectProperty(property)) return `[unknown@${String(property.start ?? -1)}]`;
			const key = semanticStaticPropertyKey(property.key, property.computed);
			if (key !== null) return key;
			return property.computed ? `[computed@${String(property.start ?? -1)}]` : `[unknown@${String(property.start ?? -1)}]`;
		};
		staticArrayValues = (array) => {
			const staticValues = array.elements.flatMap((element) => {
				const value = argumentValue(element);
				return value === undefined ? [] : [value];
			});
			const values = [...new Set(staticValues)].sort(compareUnicodeCodePoints);
			return {
				values,
				unknown: array.elements.length - staticValues.length
			};
		};
		staticPathResolutionContext = (node, pathIntrinsics) => isFilesystemPathExpression(node, pathIntrinsics) ? "filesystem-expression" : "module-specifier";
		staticPath = (node, pathIntrinsics) => staticFileExpressionPath(node, pathIntrinsics)?.path;
		staticPathFact = (raw, pathIntrinsics) => {
			const node = unwrapJavaScriptExpression(raw).node;
			const value = stringValue(node);
			if (value !== undefined) return {
				path: value,
				base: "literal-path"
			};
			if (t.isBinaryExpression(node, { operator: "+" })) return staticConcatenation(node, pathIntrinsics);
			if (t.isCallExpression(node) || t.isNewExpression(node)) return staticCallPath(node, pathIntrinsics);
			return undefined;
		};
		staticFileExpressionPath = (node, pathIntrinsics) => {
			const fact = staticPathFact(node, pathIntrinsics);
			return fact === undefined || fact.base === "unknown" ? undefined : {
				path: fact.path,
				base: fact.base
			};
		};
		staticConcatenation = (node, pathIntrinsics) => {
			const operands = [];
			let current = node;
			while (t.isBinaryExpression(current, { operator: "+" })) {
				operands.push(current.right);
				current = unwrapJavaScriptExpression(current.left).node;
			}
			const anchored = isDirectoryPath(current, pathIntrinsics);
			if (!anchored) operands.push(current);
			let text = "";
			let literal = true;
			for (const operand of operands.reverse()) {
				const value = staticPathFact(operand, pathIntrinsics);
				if (value === undefined) return undefined;
				text += value.path;
				literal &&= value.base === "literal-path";
			}
			if (!anchored) return {
				path: text,
				base: literal ? "literal-path" : "unknown"
			};
			return text.startsWith("/") ? {
				path: posix.join(".", text),
				base: literal ? "source-directory" : "unknown"
			} : undefined;
		};
		staticCallPath = (node, pathIntrinsics) => {
			if (t.isCallExpression(node) && pathIntrinsics?.(node.callee)) return staticResolvedPath(node, pathIntrinsics);
			if (t.isCallExpression(node) && pathIntrinsics?.(node.callee, "file-url-to-path")) return staticFileUrlPathFact(node, pathIntrinsics);
			if (!t.isCallExpression(node) || !pathIntrinsics?.(node.callee, "join")) return undefined;
			const parts = [];
			for (const argument of node.arguments) {
				if (isDirectoryPath(argumentNode(argument), pathIntrinsics)) {
					parts.push({
						path: ".",
						base: "source-directory"
					});
					continue;
				}
				const value = t.isNode(argument) ? staticPathFact(argument, pathIntrinsics) : undefined;
				if (value === undefined) return undefined;
				parts.push(value);
			}
			if (parts.length === 0) return undefined;
			const first = parts.findIndex(({ path }) => path !== "");
			const sourceAnchors = parts.flatMap(({ base }, index) => base === "source-directory" ? [index] : []);
			const base = parts.some(({ base }) => base === "unknown") ? "unknown" : sourceAnchors.length === 0 ? "literal-path" : sourceAnchors.length === 1 && sourceAnchors[0] === first ? "source-directory" : "unknown";
			return {
				path: posix.join(...parts.map(({ path }) => path)),
				base
			};
		};
		staticFileUrlPathFact = (node, pathIntrinsics) => {
			if (node.arguments.length !== 1) return undefined;
			const rawArgument = argumentNode(node.arguments[0]);
			if (rawArgument === undefined) return undefined;
			const argument = unwrapJavaScriptExpression(rawArgument).node;
			if (t.isNewExpression(argument) && pathIntrinsics?.(argument, "source-url")) {
				const resolved = staticSourceRelativeUrlPath(argument);
				return resolved === undefined ? undefined : {
					path: resolved.path,
					base: "source-directory"
				};
			}
			const value = staticPath(argument, pathIntrinsics);
			const rawPath = value?.split(/[?#]/u, 1)[0] ?? "";
			if (value === undefined || !/^file:/iu.test(value) || value !== value.trim() || value.includes("\\") || [...value].some((character) => character.charCodeAt(0) < 32) || /%(?:2f|5c)/iu.test(rawPath)) return undefined;
			try {
				const url = new URL(value);
				if (url.protocol !== "file:") return undefined;
				const path = fileURLToPath(url, { windows: false });
				return /^\/[a-z]:/iu.test(path) ? undefined : {
					path,
					base: "literal-path"
				};
			} catch (cause) {
				void cause;
				return undefined;
			}
		};
		staticSourceRelativeUrlPath = (node) => {
			const value = stringValue(node.arguments[0]);
			if (value === undefined || (value.split(/[?#]/u, 1)[0] ?? "") === "" || value !== value.trim() || value.includes("\\") || [...value].some((character) => character.charCodeAt(0) < 32) || /^[a-z][a-z0-9+.-]*:/iu.test(value) || value.startsWith("//") || /%(?:2e|2f|5c)/iu.test(value.split(/[?#]/u, 1)[0] ?? "")) return undefined;
			const anchor = createSyntheticUrlRoot(value);
			const resolve = (root) => new URL(value, `file://${root}entry.js`);
			try {
				const resolved = resolve(anchor.root);
				const path = fileURLToPath(resolved, { windows: false });
				if (value.startsWith("/")) return {
					path,
					directory: resolved.pathname.endsWith("/")
				};
				const relativePath = anchor.relativePath(path, (root) => fileURLToPath(resolve(root), { windows: false }));
				if (relativePath === null) return undefined;
				const relative = relativePath || ".";
				return {
					path: value.startsWith("./") && relative !== "." && !relative.startsWith("../") ? `./${relative}` : relative,
					directory: resolved.pathname.endsWith("/")
				};
			} catch (cause) {
				void cause;
				return undefined;
			}
		};
		staticResolvedPath = (node, pathIntrinsics) => {
			const parts = [];
			let base;
			for (let index = node.arguments.length - 1; index >= 0; index -= 1) {
				const argument = node.arguments[index];
				if (isDirectoryPath(argumentNode(argument), pathIntrinsics)) {
					base = "source-directory";
					break;
				}
				const value = t.isNode(argument) ? staticPathFact(argument, pathIntrinsics) : undefined;
				if (value === undefined || value.base === "unknown") return undefined;
				parts.push(value.path);
				if (value.base === "source-directory" || posix.isAbsolute(value.path)) {
					base = value.base;
					break;
				}
			}
			if (base === undefined) return undefined;
			const path = posix.join(...parts.reverse());
			return {
				path: path === "/" ? path : path.replace(/\/$/u, ""),
				base
			};
		};
		isFilesystemPathExpression = (node, pathIntrinsics) => {
			node = unwrapJavaScriptExpression(node).node;
			const value = stringValue(node);
			if (value !== undefined) return value.startsWith("/");
			if (isFileIdentity(node) || isDirectoryPath(node, pathIntrinsics)) return true;
			if (t.isBinaryExpression(node, { operator: "+" })) return isFilesystemPathExpression(node.left, pathIntrinsics) || isFilesystemPathExpression(node.right, pathIntrinsics);
			if (t.isCallExpression(node) || t.isNewExpression(node)) {
				if (!t.isCallExpression(node)) return false;
				const native = pathIntrinsics?.(node.callee) || pathIntrinsics?.(node.callee, "join") || pathIntrinsics?.(node.callee, "file-url-to-path");
				return native === true && staticCallPath(node, pathIntrinsics) !== undefined;
			}
			return false;
		};
		isDirectoryPath = (node, pathIntrinsics) => {
			if (node !== undefined) node = unwrapJavaScriptExpression(node).node;
			return node !== undefined && pathIntrinsics?.(node, "source-directory") === true;
		};
		isImportMetaUrl = (node) => {
			if (node === undefined) return false;
			const expression = unwrapJavaScriptExpression(node).node;
			if (!t.isMemberExpression(expression)) return false;
			const object = unwrapJavaScriptExpression(expression.object).node;
			return t.isMetaProperty(object) && object.meta.name === "import" && object.property.name === "meta" && semanticStaticPropertyName(expression.property, expression.computed) === "url";
		};
		isFileIdentity = (node) => {
			if (node !== undefined) node = unwrapJavaScriptExpression(node).node;
			if (t.isIdentifier(node, { name: "__filename" }) || isImportMetaUrl(node)) return true;
			if (!t.isCallExpression(node)) return false;
			const name = calleeName(node.callee);
			return (name === "fileURLToPath" || name.endsWith(".fileURLToPath")) && isFileIdentity(argumentNode(node.arguments[0]));
		};
		XHR_METHODS = new Set([
			"CONNECT",
			"DELETE",
			"GET",
			"HEAD",
			"OPTIONS",
			"PATCH",
			"POST",
			"PUT",
			"TRACE"
		]);
		isRequestUrlOrPathLiteral = (value) => /^(?:https?|wss?):\/\//iu.test(value) || value.startsWith("/") || value.startsWith("./") || value.startsWith("../");
		WINDOW_OPEN_CALL = /(?:^|\.)(?:window|self|globalThis|top|parent|opener|frames|document)\.open$/u;
		FS_OPEN_FLAGS = new Set([
			"a",
			"a+",
			"as",
			"as+",
			"ax",
			"ax+",
			"r",
			"r+",
			"rs",
			"rs+",
			"sa",
			"sa+",
			"sr",
			"sr+",
			"w",
			"w+",
			"wx",
			"wx+",
			"xa",
			"xa+",
			"xw",
			"xw+"
		]);
		BROWSING_CONTEXT_KEYWORDS = new Set([
			"_blank",
			"_parent",
			"_self",
			"_top"
		]);
		xhrOpenUrl = (name, methodNode, urlNode, receiverFact) => {
			const url = stringValue(urlNode);
			if (url === undefined) return undefined;
			if (receiverFact === "window") return undefined;
			const method = stringValue(methodNode);
			const storage = receiverFact === "local-indexed-db" || receiverFact === "local-cache-storage" || receiverFact === "indexed-db" || receiverFact === "cache-storage" || storageKind(name) !== undefined;
			if (method === undefined) return storage || receiverFact === undefined && WINDOW_OPEN_CALL.test(name) || FS_OPEN_FLAGS.has(url) || BROWSING_CONTEXT_KEYWORDS.has(url.toLowerCase()) ? undefined : url;
			return XHR_METHODS.has(method.toUpperCase()) || (!storage || receiverFact === "local-indexed-db" || receiverFact === "local-cache-storage") && /^[A-Z][A-Z-]*$/u.test(method) ? url : undefined;
		};
		KEYED_COLLECTION_CONSTRUCTORS = new Set([
			"FormData",
			"Headers",
			"Map",
			"Set",
			"URLSearchParams",
			"WeakMap",
			"WeakSet"
		]);
		isKeyedCollectionReceiver = (callee) => {
			callee = unwrapJavaScriptExpression(callee).node;
			if (!t.isMemberExpression(callee) && !t.isOptionalMemberExpression(callee)) return false;
			const receiver = unwrapJavaScriptExpression(callee.object).node;
			if (t.isNewExpression(receiver)) {
				const constructor = unwrapJavaScriptExpression(receiver.callee).node;
				return t.isIdentifier(constructor) && KEYED_COLLECTION_CONSTRUCTORS.has(constructor.name);
			}
			if (!t.isMemberExpression(receiver) && !t.isOptionalMemberExpression(receiver)) return false;
			const property = semanticStaticPropertyName(receiver.property, receiver.computed);
			return property === "headers" || property === "headersList" || property === "searchParams";
		};
		endpointArgument = (name, args, callee, receiverFact) => {
			const candidate = (value) => value === undefined ? undefined : {
				kind: "candidate",
				value
			};
			if (receiverFact === "window") return undefined;
			if (name === "fetch" || name.endsWith(".fetch") || name === "WebSocket" || name === "EventSource" || name.endsWith(".EventSource")) return candidate(stringValue(args[0]));
			if (name.endsWith(".open")) {
				const value = xhrOpenUrl(name, args[0], args[1], receiverFact);
				if (value === undefined) return undefined;
				return {
					kind: "candidate",
					value
				};
			}
			const method = [
				"get",
				"post",
				"put",
				"patch",
				"delete",
				"request"
			].find((candidate) => name === candidate || name.endsWith(`.${candidate}`));
			if (method !== undefined) {
				const value = stringValue(args[0]);
				if (value === undefined) return undefined;
				if ((method === "get" || method === "delete") && !isRequestUrlOrPathLiteral(value) && (isKeyedCollectionReceiver(callee) || method === "get" && (receiverFact === "configuration" || receiverFact === "extension-state"))) return undefined;
				return {
					kind: "candidate",
					value
				};
			}
			if (name === "sendBeacon" || name.endsWith(".sendBeacon")) return candidate(stringValue(args[0]));
			if (name === "loadURL" || name.endsWith(".loadURL")) {
				const value = stringValue(args[0]);
				return value === undefined ? undefined : {
					kind: "candidate",
					value
				};
			}
			return undefined;
		};
		storageKind = (name) => {
			if (name.includes("localStorage.")) return "local-storage";
			if (name.includes("sessionStorage.")) return "session-storage";
			if (name.endsWith("indexedDB.open")) return "indexed-db";
			if (name.endsWith("caches.open")) return "cache-storage";
			return undefined;
		};
		calleeName = (node) => {
			node = unwrapJavaScriptExpression(node).node;
			const segments = [];
			while (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) {
				segments.push(memberPropertyName(node));
				if (!t.isNode(node.object)) break;
				node = unwrapJavaScriptExpression(node.object).node;
			}
			const base = t.isIdentifier(node) ? node.name : "";
			segments.push(base);
			segments.reverse();
			const first = segments.findIndex((segment) => segment !== "");
			return first === -1 ? "" : segments.slice(first).join(".");
		};
		memberPropertyName = (node) => semanticStaticPropertyKey(node.property, node.computed) ?? (node.computed ? `[computed@${String(node.property.start ?? -1)}]` : "");
		stringValue = (node) => {
			if (node === null || node === undefined) return undefined;
			const literal = readExactJavaScriptLiteral(node);
			return literal.found && typeof literal.value === "string" ? literal.value : undefined;
		};
		argumentValue = (node) => {
			if (node === null || node === undefined) return undefined;
			const value = unwrapJavaScriptExpression(node).node;
			return t.isNumericLiteral(value) ? String(value.value) : stringValue(value);
		};
		prefixedArgument = (prefix, node) => {
			const value = argumentValue(node);
			return value === undefined ? undefined : `${prefix}${value}`;
		};
		sourceSlice = (source, node) => typeof node.start !== "number" || typeof node.end !== "number" ? "" : source.slice(node.start, node.end);
		range = (node) => ({
			start: {
				line: node.loc?.start.line ?? 1,
				column: node.loc?.start.column ?? 0
			},
			end: {
				line: node.loc?.end.line ?? node.loc?.start.line ?? 1,
				column: node.loc?.end.column ?? node.loc?.start.column ?? 0
			}
		});
		rangeForOffsets = (source, start, end) => ({
			start: pointForOffset(source, start),
			end: pointForOffset(source, end)
		});
		sourceRangesEqual = (left, right) => left !== null && left.start.line === right.start.line && left.start.column === right.start.column && left.end.line === right.end.line && left.end.column === right.end.column;
		pointForOffset = (source, offset) => {
			const before = source.slice(0, offset);
			const lines = before.split(/\r\n|[\n\r\u2028\u2029]/u);
			return {
				line: lines.length,
				column: lines.at(-1)?.length ?? 0
			};
		};
		detectVendors = (source) => vendorPatterns.flatMap(({ name, patterns }) => patterns.some((pattern) => source.includes(pattern)) ? [name] : []);
		registrationKey = (registration) => compositeKey([
			registration.runtime,
			registration.chunk_keys,
			String(registration.unknown_chunk_keys),
			registration.runtime_require_name,
			registration.runtime_module_cache_status,
			registration.entry_module_keys,
			String(registration.unknown_entry_module_keys),
			registration.async_chunk_keys,
			String(registration.unknown_async_chunk_keys),
			registration.modules.map(({ module_key: key, source_sha256: digest }) => [key, digest])
		]);
		STATIC_ROUTE_CALL_NAMES = [
			"route",
			"addRoute",
			"useRoutes",
			"createBrowserRouter",
			"createHashRouter"
		];
		vendorPatterns = [
			{
				name: "webpack",
				patterns: ["__webpack_require__", "webpackChunk"]
			},
			{
				name: "Rspack",
				patterns: ["__webpack_require__.f", "rspackChunk"]
			},
			{
				name: "Vite",
				patterns: ["__vite__", "import.meta.hot"]
			},
			{
				name: "Rollup",
				patterns: ["ROLLUP_FILE_URL", "import.meta.ROLLUP"]
			},
			{
				name: "esbuild",
				patterns: ["__commonJS", "__esm"]
			},
			{
				name: "React",
				patterns: ["React.createElement", "react/jsx-runtime"]
			},
			{
				name: "Vue",
				patterns: ["__VUE__", "createApp("]
			},
			{
				name: "Next.js",
				patterns: ["__NEXT_DATA__", "/_next/"]
			},
			{
				name: "Angular",
				patterns: ["ɵɵdefineComponent"]
			},
			{
				name: "Svelte",
				patterns: ["svelte/internal"]
			}
		];
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticMutationValues.js
var invalidateSemanticEscapedPath, invalidateSemanticMutationPaths;
function init_javascriptSemanticMutationValues() {
	return (init_javascriptSemanticMutationValues = __esmMin((() => {
		init_javascriptSemanticPropertyPaths();
		invalidateSemanticEscapedPath = (value, path) => {
			if (value.status !== "object" && value.status !== "array") return value;
			const [key, ...remaining] = path;
			if (key === undefined) return {
				status: "unknown",
				reason: "This object reference may have been mutated by a call."
			};
			const invalidateChild = (property) => semanticPropertyPathKeyMatches(key, property.name) ? {
				...property,
				value: invalidateSemanticEscapedPath(property.value, remaining)
			} : property;
			return value.status === "object" ? {
				...value,
				properties: value.properties.map(invalidateChild)
			} : {
				...value,
				items: value.items.map(invalidateChild)
			};
		};
		invalidateSemanticMutationPaths = (value, paths) => {
			if (paths.length === 0) return value;
			if (value.status !== "object" && value.status !== "array" || paths.some(([key]) => key === undefined || key === null)) return {
				status: "unknown",
				reason: "This property may have been mutated."
			};
			const reset = value.status === "array" ? paths.findLastIndex(([key]) => key === "length") : -1;
			const base = reset < 0 ? value : {
				status: "array",
				items: [],
				unknownItems: true,
				omittedItems: null
			};
			const slots = base.status === "object" ? base.properties : base.items;
			const slotsByName = new Map();
			slots.forEach((property, index) => {
				const indexes = slotsByName.get(property.name) ?? [];
				indexes.push(index);
				slotsByName.set(property.name, indexes);
			});
			const slotPaths = new Map();
			const replacedSlots = new Set();
			const select = (index, remaining) => {
				const selected = slotPaths.get(index) ?? [];
				selected.push(remaining);
				slotPaths.set(index, selected);
				if (remaining.length === 0) replacedSlots.add(index);
			};
			const added = new Set();
			for (const [key, ...remaining] of paths.slice(reset + 1)) {
				if (key === undefined || key === null) continue;
				if (typeof key === "object") {
					slots.forEach((property, index) => {
						if (semanticPropertyPathKeyMatches(key, property.name)) select(index, remaining);
					});
					continue;
				}
				const indexes = slotsByName.get(String(key));
				if (indexes === undefined) added.add(String(key));
				else for (const index of indexes) select(index, remaining);
			}
			const properties = slots.map((property, index) => {
				const selected = slotPaths.get(index);
				return selected === undefined ? property : {
					...property,
					...replacedSlots.has(index) ? { presence: "unknown-coverage" } : {},
					value: invalidateSemanticMutationPaths(property.value, selected)
				};
			});
			for (const name of added) properties.push({
				name,
				value: {
					status: "unknown",
					reason: "This property may have been mutated."
				},
				presence: "unknown-coverage"
			});
			return base.status === "object" ? {
				...base,
				properties
			} : {
				...base,
				items: properties
			};
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticAliasSelections.js
var semanticAliasSelectionChoices, selection, selectionCovers, pathCovers, joinSelections, SemanticAliasSelections;
function init_javascriptSemanticAliasSelections() {
	return (init_javascriptSemanticAliasSelections = __esmMin((() => {
		init_javascriptSemanticPrecision();
		init_budget();
		semanticAliasSelectionChoices = (key) => key !== null && typeof key === "object" && "alternatives" in key ? key.alternatives : [key];
		selection = (choices) => {
			if (choices.includes(null)) return null;
			const alternatives = [...new Map(choices.map((choice) => [JSON.stringify(choice), choice]))].sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0).map(([, choice]) => choice);
			return alternatives.length === 1 ? alternatives[0] : { alternatives };
		};
		selectionCovers = (prior, next) => {
			if (prior === null) return true;
			const choices = new Set(semanticAliasSelectionChoices(prior).map((key) => JSON.stringify(key)));
			return semanticAliasSelectionChoices(next).every((key) => choices.has(JSON.stringify(key)));
		};
		pathCovers = (prior, next) => prior.every((key, index) => next[index] !== undefined && selectionCovers(key, next[index]));
		joinSelections = (prior, next) => {
			let changed = -1;
			for (let index = 0; index < prior.length; index++) {
				if (JSON.stringify(prior[index]) === JSON.stringify(next[index])) continue;
				if (changed !== -1) return undefined;
				changed = index;
			}
			return prior.map((key, index) => index === changed ? selection([...semanticAliasSelectionChoices(key), ...semanticAliasSelectionChoices(next[index])]) : key);
		};
		SemanticAliasSelections = class {
			onLimit;
			maxSelections;
			#paths = new WeakMap();
			#calls;
			#limited = false;
			constructor(onLimit, maxSelections = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS.alias_selections) {
				this.onLimit = onLimit;
				this.maxSelections = maxSelections;
				this.#calls = new Budget(maxSelections);
			}
			get limited() {
				return this.#limited;
			}
			normalize(node, next) {
				if (this.#limited) return next.map(() => null);
				const existing = this.#paths.get(node);
				const byDepth = existing ?? new Map();
				const paths = [...byDepth.get(next.length) ?? []];
				let candidate = next.map((key) => selection(semanticAliasSelectionChoices(key)));
				const covered = paths.find((prior) => pathCovers(prior, candidate));
				if (covered !== undefined) return covered;
				if (existing !== undefined && !this.#calls.tryCharge(1)) {
					this.#limited = true;
					this.#paths = new WeakMap();
					this.onLimit();
					return next.map(() => null);
				}
				for (let index = 0; index < paths.length;) {
					const prior = paths[index];
					if (pathCovers(prior, candidate)) return prior;
					const joined = pathCovers(candidate, prior) ? candidate : joinSelections(prior, candidate);
					if (joined === undefined) {
						index++;
						continue;
					}
					candidate = [...joined];
					paths.splice(index, 1);
					index = 0;
				}
				paths.push(candidate);
				byDepth.set(candidate.length, paths);
				this.#paths.set(node, byDepth);
				return candidate;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticEffectPathIndex.js
var semanticEffectPathMatches, effectPathIndexes, currentEffectPathIndex, visitEffectPathCandidates, semanticEffectPathCandidates, semanticSomeEffectPathCandidate;
function init_javascriptSemanticEffectPathIndex() {
	return (init_javascriptSemanticEffectPathIndex = __esmMin((() => {
		init_javascriptSemanticAliasSelections();
		init_javascriptSemanticPropertyPaths();
		semanticEffectPathMatches = (effectPath, path) => path.length > 0 && effectPath.length <= path.length && effectPath.every((key, index) => {
			const selected = path[index];
			return selected !== undefined && semanticAliasSelectionChoices(selected).some((choice) => choice === null || (typeof choice === "object" ? key === null || typeof key === "object" || semanticPropertyPathKeyMatches(choice, String(key)) : semanticPropertyPathKeyMatches(key, String(choice))));
		});
		effectPathIndexes = new WeakMap();
		currentEffectPathIndex = (effects) => {
			let index = effectPathIndexes.get(effects);
			if (index === undefined) {
				index = {
					root: {},
					indexed: 0
				};
				effectPathIndexes.set(effects, index);
			}
			for (; index.indexed < effects.length; index.indexed++) {
				let node = index.root;
				for (const key of effects[index.indexed].path) {
					if (key === null || typeof key === "object") node = node.open ??= {};
					else {
						const exact = node.exact ??= new Map();
						const name = String(key);
						let child = exact.get(name);
						if (child === undefined) {
							child = {};
							exact.set(name, child);
						}
						node = child;
					}
				}
				(node.ends ??= []).push(index.indexed);
			}
			return index;
		};
		visitEffectPathCandidates = (effects, path, visit) => {
			const pending = [{
				node: currentEffectPathIndex(effects).root,
				depth: 0
			}];
			while (pending.length > 0) {
				const { node, depth } = pending.pop();
				for (const position of node.ends ?? []) if (visit(position)) return true;
				if (depth >= path.length) continue;
				if (node.open !== undefined) pending.push({
					node: node.open,
					depth: depth + 1
				});
				const exact = node.exact;
				if (exact === undefined) continue;
				const choices = semanticAliasSelectionChoices(path[depth]);
				if (choices.some((choice) => choice === null || typeof choice === "object")) for (const child of exact.values()) pending.push({
					node: child,
					depth: depth + 1
				});
				else for (const name of new Set(choices.map((choice) => String(choice)))) {
					const child = exact.get(name);
					if (child !== undefined) pending.push({
						node: child,
						depth: depth + 1
					});
				}
			}
			return false;
		};
		semanticEffectPathCandidates = (effects, path) => {
			const positions = [];
			visitEffectPathCandidates(effects, path, (position) => {
				positions.push(position);
				return false;
			});
			return positions.sort((left, right) => left - right).map((position) => effects[position]);
		};
		semanticSomeEffectPathCandidate = (effects, path, predicate) => visitEffectPathCandidates(effects, path, (position) => predicate(effects[position]));
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticEffectLog.js
/**
* The effect log: one owner of the questions readers ask about recorded
* effects (docs/adr/javascript/pushed-effect-invalidation.md). Readers ask
* whether a read may observe an effect; the timing, capture and path proofs
* stay here. Recorded opaque sites live in javascriptSemanticEffectRecord.ts.
*/
/** Rebinding requires lexical visibility. Object references can remain reachable
* through aliases even where the original name is shadowed or out of block scope.
* Without a disjointness proof, consider their enclosing activation and closures.
* Queries retain no binding-by-eval table. */
function* semanticOpaqueBindingEffects(binding, state, kind = "binding") {
	if (state.opaqueEffects.byScope.size === 0) return;
	const pending = [kind === "reference" ? activation(binding.scopeId, state) : binding.scopeId];
	while (pending.length > 0) {
		const scope = pending.pop();
		for (const node of state.opaqueEffects.byScope.get(scope) ?? []) if (kind === "reference" || resolveSemanticBindingState(state, node, binding.name)?.bindingId === binding.bindingId) yield node;
		for (const child of state.opaqueEffects.children.get(scope) ?? []) pending.push(child);
	}
}
/**
* Recorded ambient writes to `global` paths, as intrinsic paths with
* non-literal keys as null. A write recorded without a site is placed at the
* program, so it may precede every read.
*/
function* semanticAmbientIntrinsicWrites(state) {
	for (const { node, path } of state.ambientWriteEffects) if (path[0] === "global") yield {
		site: node ?? state.program,
		path: ["intrinsic", ...path.slice(1).map((key) => key === null || typeof key === "object" ? null : String(key))]
	};
}
/**
* The nodes recorded member writes to `binding`'s object involve, in record
* order: each write's site (undefined when it was recorded without one), then
* the sources it assigned.
*/
function* semanticMemberWriteNodes(binding) {
	for (const effect of binding.memberWrites) {
		yield effect.node;
		for (const source of effect.assignedSources ?? []) yield source.node;
	}
}
/** The sources recorded member writes assigned into `binding`'s object. */
function* semanticMemberWriteSources(binding) {
	for (const effect of binding.memberWrites) yield* effect.assignedSources ?? [];
}
/**
* Opaque sites that may affect a binding, for a report of every effect: direct
* evals that may rebind it when its declaration is assignable, then every
* direct eval that may reach the object it references (an escape of its whole
* value). Timing and path proofs stay with the caller's effect report.
*/
function* semanticOpaqueReferenceEffects(binding, state) {
	if (semanticBindingCanBeRebound(binding)) for (const node of semanticOpaqueBindingEffects(binding, state)) yield {
		kind: "binding-write",
		node
	};
	for (const node of semanticOpaqueBindingEffects(binding, state, "reference")) yield {
		kind: "escape",
		node
	};
}
var indexSemanticOpaqueEffects, createSemanticOpaqueGlobalObserver, semanticOpaqueGlobalMayHaveChanged, semanticBindingMayHaveOpaqueEffect, semanticOpaqueNameMayHaveChanged, IMMUTABLE_GLOBALS, opaqueCodeMayChangeGlobalRead, ambientPathMayHaveChanged, ambientPathOrMemberMayHaveChanged, ambientBindingHasWrites, ambientEffectCovers, semanticEffectMayPrecede, semanticEffectMayFollow, semanticArrayPrototypeIterationMayChange, semanticAmbientArrayIterationUnknown, ambientPathSelections, ambientPathEffects, ambientPathMayObserveAt, ambientBindingMayObserveWriteAt, semanticAmbientEffectGeneration, semanticBindingEffectGeneration, hasRecordedReferenceEffects, ambientPathWriteSites, bindingMemberEffectMayPrecede, bindingMemberEffectMayPrecedeReads, bindingProjectedContentsMayChangeAt, bindingAssignmentMayPrecede, bindingInitializersMayPrecede, prototypeMutationMayPrecede, bindingMethodMayHaveChanged, bindingHasMemberWrites, bindingEffectsConfinedToReceiverCalls, bindingHasEscapesOutside, sameLiteralPrefix, semanticBindingMemberWritesObservedAt, semanticBindingCanBeRebound, opaqueCodeMayRebindBinding, opaqueCodeMayReachBindingReference, inactiveMemberWriteNodes, retainSemanticInactiveMemberWrites, observesCapturedWrite, observesCapturedEscape, capturedBindingPathMayHaveChanged, bindingPathOnlyEscapesAtLaterIteratorEffects, applySemanticBindingReferenceEffects, activation, strictEval, visitSemanticReferenceEffectsAtSite, semanticReferenceEffectsMayHaveChanged, semanticReadMayObserveEffect, semanticReferenceEffectsAtSite, semanticReferenceRoot, semanticPathsOverlap;
function init_javascriptSemanticEffectLog() {
	return (init_javascriptSemanticEffectLog = __esmMin((() => {
		init_javascriptSourceParser();
		init_javascriptAstValues();
		init_javascriptSemanticPropertyPaths();
		init_javascriptSemanticMutationValues();
		init_javascriptSemanticEffectPathIndex();
		init_javascriptSemanticMutationInitializers();
		init_javascriptSemanticState();
		indexSemanticOpaqueEffects = (candidates, state) => {
			for (const { node, scopeId } of candidates) {
				const callee = unwrapJavaScriptExpression(node.callee).node;
				if (!isUnshadowedGlobal(callee, state, "eval")) continue;
				state.opaqueEffects.sites.add(node);
				if (!strictEval(node, state)) state.opaqueEffects.sloppySites.add(node);
				const sites = state.opaqueEffects.byScope.get(scopeId) ?? [];
				sites.push(node);
				state.opaqueEffects.byScope.set(scopeId, sites);
				let scope = state.scopesById.get(scopeId);
				while (scope?.parentScopeId != null) {
					const children = state.opaqueEffects.children.get(scope.parentScopeId) ?? new Set();
					if (children.has(scope.scopeId)) break;
					children.add(scope.scopeId);
					state.opaqueEffects.children.set(scope.parentScopeId, children);
					scope = state.scopesById.get(scope.parentScopeId);
				}
			}
		};
		createSemanticOpaqueGlobalObserver = (state, dependencies) => {
			if (!state.opaqueEffects.mayReferenceGlobalCode) return undefined;
			const ambientPaths = dependencies.createAmbientPathResolver(state, true);
			let invocationSite;
			const interop = dependencies.createSemanticModuleInterop(state, { intrinsicPath: (node) => {
				const { paths, callerPaths } = ambientPaths(node, invocationSite);
				const path = paths.find((path) => path[1] === "eval" || path[1] === "Function") ?? callerPaths.find((path) => path[1] === "eval" || path[1] === "Function") ?? paths[0];
				if (path?.[0] !== "global" || path.some((key) => key === null)) return undefined;
				return path[1] === "eval" || path[1] === "Function" ? ["intrinsic", ...path] : ["intrinsic", ...path.slice(1)];
			} });
			return (node) => {
				if (!t.isCallExpression(node) && !t.isOptionalCallExpression(node) && !t.isNewExpression(node) && !t.isTaggedTemplateExpression(node)) return;
				invocationSite = node;
				const path = interop.intrinsicInvocation(node)?.path;
				if (path?.join(".") === "intrinsic.global.eval" || path?.join(".") === "intrinsic.global.Function") state.opaqueEffects.globalSites.push(node);
			};
		};
		semanticOpaqueGlobalMayHaveChanged = (read, state) => state.opaqueEffects.globalSites.some((effect) => semanticEffectTiming(read, effect, state) !== "after");
		semanticBindingMayHaveOpaqueEffect = (binding, state, read, kind = "binding") => {
			if (state.opaqueEffects.byScope.size === 0) return false;
			for (const effect of semanticOpaqueBindingEffects(binding, state, kind)) if (read === undefined || semanticEffectTiming(read, effect, state) !== "after" && !semanticBindingEffectFollowsCapture(binding, read, effect, state.parentsByNode) && !(kind === "binding" && semanticBindingEffectFollowsRead(binding, read, effect, state.parentsByNode))) return true;
			return false;
		};
		semanticOpaqueNameMayHaveChanged = (read, state, binding) => {
			if (state.opaqueEffects.byScope.size === 0) return false;
			const visible = new Set();
			let node = read;
			while (node !== undefined) {
				const scope = state.scopeByNode.get(node);
				if (scope !== undefined) {
					let current = scope;
					while (current !== undefined) {
						visible.add(current.scopeId);
						current = current.parentScopeId === null ? undefined : state.scopesById.get(current.parentScopeId);
					}
					break;
				}
				node = state.parentsByNode.get(node);
			}
			for (const [scopeId, sites] of state.opaqueEffects.byScope) {
				let scope = state.scopesById.get(scopeId);
				while (scope !== undefined && scope.kind !== "function" && scope.kind !== "program") scope = scope.parentScopeId === null ? undefined : state.scopesById.get(scope.parentScopeId);
				if (scope !== undefined && visible.has(scope.scopeId) && (binding === undefined || activation(binding.scopeId, state) !== scope.scopeId) && sites.some((effect) => state.opaqueEffects.sloppySites.has(effect) && (binding === undefined || resolveSemanticBindingState(state, effect, binding.name)?.bindingId === binding.bindingId) && semanticEffectTiming(read, effect, state) !== "after" && !semanticReadPrecedesEffectWithinActivation(read, effect, state.parentsByNode))) return true;
			}
			return false;
		};
		IMMUTABLE_GLOBALS = new Set([
			"undefined",
			"NaN",
			"Infinity"
		]);
		opaqueCodeMayChangeGlobalRead = (reference, state, root, observedAt = reference) => semanticOpaqueNameMayHaveChanged(reference, state) || !IMMUTABLE_GLOBALS.has(root) && semanticOpaqueGlobalMayHaveChanged(observedAt, state);
		ambientPathMayHaveChanged = (state, path, observes = "value") => state.ambientWrites.covers(path) || observes === "contents" && state.ambientEscapes.covers(path);
		ambientPathOrMemberMayHaveChanged = (state, path) => state.ambientWrites.touches(path) || state.ambientEscapes.touches(path);
		ambientBindingHasWrites = (state, name) => state.ambientBindingWrites.has(name);
		ambientEffectCovers = (effect, target) => effect.path.length <= target.length && effect.path.every((key, index) => semanticPropertyPathKeyMatches(key, target[index]));
		semanticEffectMayPrecede = (state, read, effect, ordering = "activation") => ordering === "activation" ? semanticEffectTiming(read, effect, state) !== "after" : !semanticTopLevelEffectFollowsCapture(read, effect, state.parentsByNode);
		semanticEffectMayFollow = (state, read, effect) => semanticEffectTiming(read, effect, state) !== "before";
		semanticArrayPrototypeIterationMayChange = (path) => {
			let offset = 0;
			while (path[offset] === "constructor" && path[offset + 1] === "prototype") offset += 2;
			const key = path[offset];
			return key === undefined || key === null || typeof key === "object" || semanticArrayIndex(key) !== null || key === "__proto__";
		};
		semanticAmbientArrayIterationUnknown = (state) => {
			const changesIteration = ({ path }) => path[0] === "global" && (path[1] === "Array" || path[1] === "Object" || path[1] === null) && (path[2] === "prototype" || path[2] === null) && semanticArrayPrototypeIterationMayChange(path.slice(3));
			return state.ambientWriteEffects.some(changesIteration) || state.ambientEscapeEffects.some(changesIteration);
		};
		ambientPathSelections = new WeakMap();
		ambientPathEffects = (state, path) => {
			let cache = ambientPathSelections.get(state);
			if (cache === undefined || cache.writes !== state.ambientWriteEffects.length || cache.escapes !== state.ambientEscapeEffects.length) {
				cache = {
					writes: state.ambientWriteEffects.length,
					escapes: state.ambientEscapeEffects.length,
					byPath: new Map()
				};
				ambientPathSelections.set(state, cache);
			}
			const key = JSON.stringify(path);
			let selected = cache.byPath.get(key);
			if (selected === undefined) {
				selected = {
					writes: state.ambientWriteEffects.filter((effect) => ambientEffectCovers(effect, path)),
					escapes: state.ambientEscapeEffects.filter((effect) => ambientEffectCovers(effect, path))
				};
				cache.byPath.set(key, selected);
			}
			return selected;
		};
		ambientPathMayObserveAt = (state, read, path, observes = "value") => {
			const { writes, escapes } = ambientPathEffects(state, path);
			const mayPrecede = ({ node }) => semanticEffectMayPrecede(state, read, node);
			return writes.some(mayPrecede) || observes === "contents" && escapes.some(mayPrecede);
		};
		ambientBindingMayObserveWriteAt = (state, read, name) => (state.ambientBindingWrites.get(name) ?? []).some((write) => semanticEffectMayPrecede(state, read, write));
		semanticAmbientEffectGeneration = (state, observes = "value") => state.ambientWriteEffects.length + (observes === "contents" ? state.ambientEscapeEffects.length : 0);
		semanticBindingEffectGeneration = (binding) => binding.memberWrites.length + binding.escapedPaths.length;
		hasRecordedReferenceEffects = (binding, state) => semanticBindingEffectGeneration(binding) > 0 || state.opaqueEffects.byScope.size > 0;
		ambientPathWriteSites = (state, path) => ambientPathEffects(state, path).writes.map(({ node }) => node);
		bindingMemberEffectMayPrecede = (state, binding, read) => binding.memberWrites.some((effect) => semanticEffectTiming(read, effect.node, state) !== "after") || binding.escapedPaths.some((effect) => effect.node !== undefined && !((effect.node.start ?? -1) <= (read.start ?? -1) && (effect.node.end ?? -1) >= (read.end ?? -1)) && semanticEffectTiming(read, effect.node, state) !== "after");
		bindingMemberEffectMayPrecedeReads = (state, binding, observedAt, ordering, observes = "member-effects") => {
			for (const [kind, effects] of [["member-write", binding.memberWrites], ["escape", observes === "member-effects" ? binding.escapedPaths : []]]) for (const effect of effects) {
				const reads = observedAt(kind, effect);
				if (reads?.every((read) => semanticEffectMayPrecede(state, read, effect.node, ordering))) return true;
			}
			return false;
		};
		bindingProjectedContentsMayChangeAt = (state, binding, path, read) => opaqueCodeMayReachBindingReference(binding, state, read) || bindingMemberEffectMayPrecedeReads(state, binding, (kind, effect) => (kind === "escape" || effect.path.length > path.length) && semanticEffectPathMatches(effect.path.slice(0, path.length), path) ? [read] : undefined, "activation");
		bindingAssignmentMayPrecede = (state, binding, read) => binding.referenceInitializers.some(({ assignment, node }) => assignment && semanticEffectTiming(read, node, state) !== "after");
		bindingInitializersMayPrecede = (state, binding, read) => binding.initializers.filter(({ node }) => semanticEffectTiming(read, node, state) !== "after");
		prototypeMutationMayPrecede = (state, owner, read) => state.prototypeMutationSites.some((effect) => effect.owner === owner && semanticEffectTiming(read, effect.node, state) !== "after");
		bindingMethodMayHaveChanged = (binding, method, read, state, { fresh, inherited, definingPrototypeDepth, isolatedNativeCloses, targets }) => {
			const reachesReceiver = (path, length, escape = false) => {
				if (!inherited) return length === 0;
				let receiver = true;
				let constructor = false;
				for (let i = 0; i < length && (receiver || constructor); i++) {
					const key = path[i];
					const nextConstructor = receiver && semanticPropertyPathKeyMatches(key, "constructor");
					receiver = receiver && semanticPropertyPathKeyMatches(key, "__proto__") || constructor && semanticPropertyPathKeyMatches(key, "prototype");
					constructor = nextConstructor;
				}
				return receiver || escape && constructor;
			};
			const mayPrecede = (effect, onInstance) => semanticEffectTiming(read, effect, state) !== "after" && !(fresh && onInstance && effect !== undefined && semanticReadPrecedesEffectWithinActivation(read, effect, state.parentsByNode));
			for (const effect of semanticOpaqueBindingEffects(binding, state, "reference")) if (mayPrecede(effect, !inherited)) return true;
			const shadowedWrite = (path) => definingPrototypeDepth !== undefined && path.length - 1 > definingPrototypeDepth && path.at(-1) === method && path.slice(0, -1).every((key) => key === "__proto__");
			return binding.memberWrites.some((effect) => (effect.path.length > 1 || targets(effect)) && !shadowedWrite(effect.path) && (effect.path.length === 0 || reachesReceiver(effect.path, effect.path.length - 1) && (semanticPropertyPathKeyMatches(effect.path.at(-1), method) || inherited && semanticPropertyPathKeyMatches(effect.path.at(-1), "__proto__"))) && mayPrecede(effect.node, effect.path.length <= 1)) || binding.escapedPaths.some((effect) => {
				const instanceOnly = effect.path.length === 0 && !inherited;
				return !(isolatedNativeCloses && effect.path.length === 0) && (!instanceOnly || targets(effect)) && reachesReceiver(effect.path, effect.path.length, true) && effect.node !== state.parentsByNode.get(read) && mayPrecede(effect.node, instanceOnly);
			});
		};
		bindingHasMemberWrites = (binding) => binding.memberWrites.length > 0;
		bindingEffectsConfinedToReceiverCalls = (binding, matchesCall) => !bindingHasMemberWrites(binding) && binding.escapedPaths.every(({ node, path }) => path.length === 0 && node !== undefined && matchesCall(node));
		bindingHasEscapesOutside = (binding, except) => binding.escapedPaths.some((effect) => effect.node !== except);
		sameLiteralPrefix = (prefix, path) => prefix.every((key, index) => key !== null && typeof key !== "object" && path[index] !== null && typeof path[index] !== "object" && String(key) === String(path[index]));
		semanticBindingMemberWritesObservedAt = (state, binding, path, read, freshReceiver) => {
			const { at, capturedAt, captured } = read;
			const prefixReplacements = capturedAt === undefined ? [] : binding.memberWrites.filter((replacement) => replacement.receiverIdentity === "definite" && t.isAssignmentExpression(replacement.node, { operator: "=" }) && replacement.path.length < path.length);
			const targetsReplacedPrefix = (effect) => prefixReplacements.some((replacement) => {
				const capture = capturedAt(replacement.path.length);
				const receiverAt = effect.receiverAt ?? effect.node;
				return capture !== undefined && receiverAt !== undefined && replacement.path.length < effect.path.length && sameLiteralPrefix(replacement.path, effect.path) && semanticTopLevelEffectFollowsCapture(capture, replacement.node, state.parentsByNode) && semanticDefiniteEffectPrecedesReference(replacement.node, receiverAt, state.parentsByNode) && freshReceiver(replacement.node.right, effect.path.slice(replacement.path.length, -1), state);
			});
			const matches = (effect) => semanticEffectPathMatches(effect.path, path) && (effect.receiverInitializers === undefined || effect.receiverInitializers.length === 0 || captured.length === 0 || effect.receiverInitializers.some((receiver) => captured.some((source) => source.node === receiver.node && JSON.stringify(source.projection) === JSON.stringify(receiver.projection)))) && semanticEffectTiming(at(effect.path.length), effect.node, state) !== "after" && !targetsReplacedPrefix(effect);
			const writes = semanticEffectPathCandidates(binding.memberWrites, path).filter(matches);
			let replacement;
			for (const effect of writes) {
				if (effect.receiverIdentity === "definite" && t.isAssignmentExpression(effect.node, { operator: "=" }) && sameLiteralPrefix(effect.path, path) && semanticDefiniteEffectPrecedesReference(effect.node, at(effect.path.length), state.parentsByNode) && (replacement === undefined || semanticDefiniteEffectPrecedesReference(replacement.node, effect.node, state.parentsByNode) || replacement.node === effect.node && (replacement.assignedSources?.[0]?.target?.start ?? -1) < (effect.assignedSources?.[0]?.target?.start ?? -1))) replacement = effect;
			}
			const superseded = (effect) => replacement !== undefined && effect.node !== undefined && effect !== replacement && (semanticEffectTiming(replacement.node, effect.node, state) === "before" || effect.node === replacement.node && (effect.assignedSources?.[0]?.target?.start ?? -1) < (replacement.assignedSources?.[0]?.target?.start ?? -1));
			return {
				writes,
				replaced: replacement !== undefined,
				superseded,
				escapeMayPrecede: () => semanticSomeEffectPathCandidate(binding.escapedPaths, path, (effect) => matches(effect) && !superseded(effect))
			};
		};
		semanticBindingCanBeRebound = (binding) => binding.mutable || binding.definitions.some(({ kind }) => kind === "function" || kind === "class") && binding.initializers.some(({ node }) => t.isFunctionDeclaration(node) || t.isClassDeclaration(node));
		opaqueCodeMayRebindBinding = (binding, state, read) => semanticBindingCanBeRebound(binding) && semanticBindingMayHaveOpaqueEffect(binding, state, read) || read !== undefined && semanticOpaqueNameMayHaveChanged(read, state, binding);
		opaqueCodeMayReachBindingReference = (binding, state, capturePoint) => semanticBindingMayHaveOpaqueEffect(binding, state, capturePoint, "reference");
		inactiveMemberWriteNodes = new WeakMap();
		retainSemanticInactiveMemberWrites = (state, nodes) => {
			inactiveMemberWriteNodes.set(state, new WeakSet(nodes));
		};
		observesCapturedWrite = (binding, capture, node, state) => node === undefined || inactiveMemberWriteNodes.get(state)?.has(node) !== true && (capture === undefined || !semanticBindingEffectFollowsCapture(binding, capture, node, state.parentsByNode));
		observesCapturedEscape = (binding, capture, node, parents) => capture === undefined || !semanticEscapeFollowsCapture(binding, capture, node, parents);
		capturedBindingPathMayHaveChanged = (binding, path, capture, state) => {
			return opaqueCodeMayReachBindingReference(binding, state, capture) || semanticOpaqueGlobalMayHaveChanged(capture, state) || semanticSomeEffectPathCandidate(binding.memberWrites, path, (effect) => semanticEffectPathMatches(effect.path, path) && observesCapturedWrite(binding, capture, effect.node, state)) || semanticSomeEffectPathCandidate(binding.escapedPaths, path, (effect) => semanticEffectPathMatches(effect.path, path) && observesCapturedEscape(binding, capture, effect.node, state.parentsByNode));
		};
		bindingPathOnlyEscapesAtLaterIteratorEffects = (binding, path, read, state) => {
			let laterIterator = false;
			const matches = (effect) => semanticEffectPathMatches(effect.path, path);
			if (semanticSomeEffectPathCandidate(binding.escapedPaths, path, (effect) => {
				if (!matches(effect)) return false;
				if (!isSemanticArrayPatternEffect(effect.node) || semanticEffectTiming(read, effect.node, state) !== "after") return true;
				laterIterator = true;
				return false;
			}) || !laterIterator) return false;
			return !opaqueCodeMayReachBindingReference(binding, state, read) && !semanticOpaqueGlobalMayHaveChanged(read, state) && !semanticSomeEffectPathCandidate(binding.memberWrites, path, matches);
		};
		applySemanticBindingReferenceEffects = (value, binding, state, capturePoint) => {
			let projected = invalidateSemanticMutationPaths(value, binding.memberWrites.filter(({ node }) => observesCapturedWrite(binding, capturePoint, node, state)).map(({ path }) => path));
			for (const escape of binding.escapedPaths) {
				if (projected.status !== "object" && projected.status !== "array") break;
				if (!observesCapturedEscape(binding, capturePoint, escape.node, state.parentsByNode)) continue;
				projected = invalidateSemanticEscapedPath(projected, escape.path);
			}
			if ((projected.status === "object" || projected.status === "array") && opaqueCodeMayReachBindingReference(binding, state, capturePoint)) projected = {
				status: "unknown",
				reason: "Direct eval may have mutated this object reference."
			};
			return projected;
		};
		activation = (scopeId, state) => {
			let scope = state.scopesById.get(scopeId);
			while (scope !== undefined && scope.kind !== "function" && scope.kind !== "program" && scope.parentScopeId !== null) scope = state.scopesById.get(scope.parentScopeId);
			return scope?.scopeId ?? scopeId;
		};
		strictEval = (site, state) => {
			for (let node = site; node !== undefined; node = state.parentsByNode.get(node)) {
				if (t.isClass(node) || t.isProgram(node) && javaScriptProgramStrictness(node) === "strict") return true;
				const directives = t.isFunction(node) && t.isBlockStatement(node.body) ? node.body.directives : [];
				if (directives.some(({ value }) => value.value === "use strict")) return true;
			}
			return false;
		};
		visitSemanticReferenceEffectsAtSite = (state, ambientPaths, site, referenceNode, visit, requestedPath, effectTiming = semanticEffectTiming) => {
			const { root, path: inferredPath } = semanticReferenceRoot(referenceNode);
			const memberEffectsIndexed = state.memberMutationFactsComplete;
			if (!t.isIdentifier(root)) return {
				bindingId: null,
				resolution: "unknown",
				memberEffectsIndexed
			};
			const lookup = semanticBindingLookupAt(state, root, root.name);
			const binding = "binding" in lookup ? lookup.binding : undefined;
			const blocked = lookup.kind !== "binding" && lookup.kind !== "ambient";
			const resolution = lookup.kind === "binding" ? "resolved" : blocked ? "unknown" : "unbound";
			const path = requestedPath ?? inferredPath;
			const metadata = {
				bindingId: binding?.bindingId ?? null,
				resolution,
				memberEffectsIndexed
			};
			const retain = (kind, node, effectPath) => {
				if (effectPath !== undefined && !semanticPathsOverlap(path, effectPath)) return true;
				return visit({
					kind,
					...effectPath === undefined ? {} : { path: effectPath },
					timing: effectTiming(site, node, state)
				});
			};
			if (binding !== undefined) {
				for (const { kind, node } of semanticOpaqueReferenceEffects(binding, state)) if (!retain(kind, node, kind === "escape" ? [] : undefined)) return metadata;
				for (const node of state.bindingWrites.get(binding.bindingId) ?? []) if (!retain("binding-write", node)) return metadata;
				for (const effect of binding.memberWrites) if (!retain("member-write", effect.node, effect.path)) return metadata;
				for (const effect of binding.escapedPaths) if (!retain("escape", effect.node, effect.path)) return metadata;
			} else if (lookup.kind === "ambient" || lookup.kind === "uncertain-ambient") {
				for (const node of state.ambientBindingWrites.get(root.name) ?? []) if (!retain("ambient-write", node)) return metadata;
				const ambientRoots = ambientPaths(root);
				for (const ambientRoot of ambientRoots) {
					const selectedPath = [...ambientRoot, ...path];
					for (const [kind, effects] of [["member-write", state.ambientWriteEffects], ["escape", state.ambientEscapeEffects]]) for (const effect of effects) if (semanticPathsOverlap(selectedPath, effect.path) && !retain(kind, effect.node, effect.path.slice(ambientRoot.length))) return metadata;
				}
			}
			return metadata;
		};
		semanticReferenceEffectsMayHaveChanged = (state, ambientPaths, site, referenceNode, propertyPath) => {
			let changed = false;
			const metadata = visitSemanticReferenceEffectsAtSite(state, ambientPaths, site, referenceNode, (effect) => {
				changed = effect.timing !== "after";
				return !changed;
			}, propertyPath);
			return metadata.resolution !== "resolved" || changed;
		};
		semanticReadMayObserveEffect = (state, ambientPaths, read, target, path) => !state.memberMutationFactsComplete || semanticReferenceEffectsMayHaveChanged(state, ambientPaths, read, target, path);
		semanticReferenceEffectsAtSite = (state, ambientPaths, site, referenceNode, requestedPath, effectTiming = semanticEffectTiming) => {
			const effects = [];
			const metadata = visitSemanticReferenceEffectsAtSite(state, ambientPaths, site, referenceNode, (effect) => {
				effects.push(effect);
				return true;
			}, requestedPath, effectTiming);
			return {
				...metadata,
				effects
			};
		};
		semanticReferenceRoot = (node) => {
			const path = [];
			let current = unwrapJavaScriptExpression(node).node;
			while (t.isMemberExpression(current) || t.isOptionalMemberExpression(current)) {
				const key = semanticStaticPropertyKey(current.property, current.computed);
				path.unshift(key ?? null);
				current = unwrapJavaScriptExpression(current.object).node;
			}
			return {
				root: current,
				path
			};
		};
		semanticPathsOverlap = (left, right) => {
			for (let index = 0; index < Math.min(left.length, right.length); index++) {
				const leftKey = left[index];
				const rightKey = right[index];
				if (leftKey === undefined || rightKey === undefined) return true;
				const leftMatchesRight = typeof rightKey === "string" || typeof rightKey === "number" ? semanticPropertyPathKeyMatches(leftKey, String(rightKey)) : true;
				const rightMatchesLeft = typeof leftKey === "string" || typeof leftKey === "number" ? semanticPropertyPathKeyMatches(rightKey, String(leftKey)) : true;
				if (!leftMatchesRight && !rightMatchesLeft) return false;
			}
			return true;
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticGlobalReference.js
var GLOBAL_OBJECT_NAMES, globalObjectName, globalReferenceNamespace, isUnmodifiedGlobalReference, isIntrinsicGlobalReference, isUnmodifiedImportMetaUrl;
function init_javascriptSemanticGlobalReference() {
	return (init_javascriptSemanticGlobalReference = __esmMin((() => {
		init_javascriptElectronMemberWrites();
		init_javascriptSemanticMutationInitializers();
		init_javascriptStaticAnalysisHelpers();
		init_javascriptSemanticEffectLog();
		GLOBAL_OBJECT_NAMES = [
			"globalThis",
			"global",
			"window",
			"self"
		];
		globalObjectName = (node, state) => GLOBAL_OBJECT_NAMES.find((name) => isUnshadowedGlobal(node, state, name));
		globalReferenceNamespace = (callee, state, path) => {
			const { root, members } = electronMemberPath(callee);
			const matches = (expected) => members.length === expected.length && members.every((key, index) => key === expected[index]);
			if (isUnshadowedGlobal(root, state, path[0]) && matches(path.slice(1))) return null;
			const namespace = globalObjectName(root, state);
			return namespace !== undefined && matches(path) ? namespace : undefined;
		};
		isUnmodifiedGlobalReference = (callee, state, name) => {
			const path = typeof name === "string" ? [name] : name;
			if (ambientPathMayHaveChanged(state, ["global", ...path])) return false;
			const namespace = globalReferenceNamespace(callee, state, path);
			return namespace !== undefined && (namespace === null || !ambientPathMayHaveChanged(state, ["global", namespace]));
		};
		isIntrinsicGlobalReference = (reference, state, name, observedAt = reference) => isUnmodifiedGlobalReference(reference, state, name) && !opaqueCodeMayChangeGlobalRead(reference, state, typeof name === "string" ? name : name[0], observedAt);
		isUnmodifiedImportMetaUrl = (node, state) => isImportMetaUrl(node) && !ambientPathMayHaveChanged(state, ["import-meta", "url"]);
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticPropertyKeys.js
var wellKnownSymbols, semanticKnownSymbolKey;
function init_javascriptSemanticPropertyKeys() {
	return (init_javascriptSemanticPropertyKeys = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticGlobalReference();
		wellKnownSymbols = new Set([
			"asyncIterator",
			"hasInstance",
			"isConcatSpreadable",
			"iterator",
			"match",
			"matchAll",
			"replace",
			"search",
			"species",
			"split",
			"toPrimitive",
			"toStringTag",
			"unscopables",
			"dispose",
			"asyncDispose"
		]);
		semanticKnownSymbolKey = (node, state) => {
			const key = unwrapJavaScriptExpression(node).node;
			if (!t.isMemberExpression(key)) return false;
			const name = semanticStaticPropertyKey(key.property, key.computed);
			return name !== null && wellKnownSymbols.has(name) && isUnmodifiedGlobalReference(key, state, ["Symbol", name]);
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticArrayLayout.js
/** Source slots in destination order, with unresolved spread positions explicit. */
function* semanticArrayLiteralLayout(root, state) {
	const allowance = { remaining: state?.precision.alias_selections ?? 0 };
	let opaque = false;
	for (const element of root.elements) {
		if (!t.isSpreadElement(element)) {
			yield {
				kind: "slot",
				element,
				depth: 1
			};
			continue;
		}
		const slots = !opaque && state !== undefined ? denseInlineSlots(element, state, allowance) : undefined;
		if (slots !== undefined) yield* slots;
		else {
			opaque = true;
			yield {
				kind: "opaque-spread",
				argument: element.argument
			};
		}
	}
}
var semanticArrayIteratorPrototypePath, iteratorNextPath, semanticNativeArrayIteratorIntactAt, denseInlineSlots, semanticArrayLiteralElementOwner, semanticArrayLiteralSlots;
function init_javascriptSemanticArrayLayout() {
	return (init_javascriptSemanticArrayLayout = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticEffectLog();
		semanticArrayIteratorPrototypePath = ["array-iterator-prototype"];
		iteratorNextPath = [...semanticArrayIteratorPrototypePath, "next"];
		semanticNativeArrayIteratorIntactAt = (state, acquisition) => !state.arrayIterationUnknown && !semanticOpaqueGlobalMayHaveChanged(acquisition, state) && !ambientPathMayObserveAt(state, acquisition, iteratorNextPath, "contents");
		denseInlineSlots = (spread, state, allowance) => {
			const takeSelection = () => {
				if (allowance.remaining === 0) {
					state.valueResourceLimits.add("alias-selections");
					return false;
				}
				allowance.remaining--;
				return true;
			};
			const spreadArray = (part) => {
				const argument = unwrapJavaScriptExpression(part.argument).node;
				return t.isArrayExpression(argument) && semanticNativeArrayIteratorIntactAt(state, part) ? argument : undefined;
			};
			const root = spreadArray(spread);
			if (root === undefined || !takeSelection()) return undefined;
			const pending = [{
				array: root,
				index: 0
			}];
			const slots = [];
			while (pending.length > 0) {
				const frame = pending.at(-1);
				if (frame.index === frame.array.elements.length) {
					pending.pop();
					continue;
				}
				if (!takeSelection()) return undefined;
				const element = frame.array.elements[frame.index++];
				if (element === null) return undefined;
				if (t.isSpreadElement(element)) {
					const array = spreadArray(element);
					if (array === undefined) return undefined;
					pending.push({
						array,
						index: 0
					});
				} else slots.push({
					kind: "slot",
					element,
					depth: pending.length + 1
				});
			}
			return slots;
		};
		semanticArrayLiteralElementOwner = (element, array, state) => {
			const { parentsByNode } = state;
			while (true) {
				let operand = array;
				let spread = parentsByNode.get(operand);
				while (spread !== undefined && javaScriptExpressionWrapperTarget(spread) === operand) {
					operand = spread;
					spread = parentsByNode.get(operand);
				}
				if (!t.isSpreadElement(spread) || spread.argument !== operand) break;
				const destination = parentsByNode.get(spread);
				if (!t.isArrayExpression(destination)) break;
				array = destination;
			}
			let minimumIndex = 0;
			let uncertainIndex = false;
			for (const part of semanticArrayLiteralLayout(array, state)) {
				if (part.kind === "opaque-spread") {
					uncertainIndex = true;
					continue;
				}
				if (part.element === element) return {
					array,
					key: uncertainIndex ? {
						excludedKeys: [],
						startIndex: minimumIndex
					} : minimumIndex
				};
				minimumIndex++;
			}
			return undefined;
		};
		semanticArrayLiteralSlots = (root, state) => {
			if (root.elements.every((element) => !t.isSpreadElement(element))) return root.elements;
			const slots = [];
			for (const part of semanticArrayLiteralLayout(root, state)) {
				if (part.kind === "opaque-spread") return undefined;
				slots.push(part.element);
			}
			return slots;
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticGetterQueries.js
var SemanticObjectReferenceSet, SemanticGetterQuery;
function init_javascriptSemanticGetterQueries() {
	return (init_javascriptSemanticGetterQueries = __esmMin((() => {
		SemanticObjectReferenceSet = class {
			#nodes = new Map();
			#owners = new WeakMap();
			#ownerCount = 0;
			add(reference) {
				const owner = reference.ownerInitializer;
				if (owner !== undefined && !this.#owners.has(owner)) this.#owners.set(owner, ++this.#ownerCount);
				const key = JSON.stringify([
					reference.path,
					owner === undefined ? null : this.#owners.get(owner),
					reference.escapes === true,
					reference.widenedGetterResult === true
				]);
				const paths = this.#nodes.get(reference.node) ?? new Map();
				paths.set(key, reference);
				this.#nodes.set(reference.node, paths);
			}
			values() {
				return [...this.#nodes.values()].flatMap((paths) => [...paths.values()]);
			}
		};
		SemanticGetterQuery = class {
			state;
			#memo = new WeakMap();
			#references = new SemanticObjectReferenceSet();
			#pending = [];
			#current;
			#limited = false;
			#visits = 0;
			#fallback = false;
			constructor(state) {
				this.state = state;
			}
			get widening() {
				return this.#fallback;
			}
			/** Charge retained local work and getter jobs to the same precise query. */
			reserveResult() {
				if (this.#limited) return false;
				if (!this.#fallback && this.#visits >= this.state.precision.getter_expansions) {
					this.#limited = true;
					return false;
				}
				this.#visits++;
				return true;
			}
			retain(reference, escapes = false) {
				this.#references.add({
					...reference,
					...escapes ? { escapes: true } : {},
					...this.#fallback && this.#current !== undefined ? { widenedGetterResult: true } : {}
				});
			}
			#known(invocation, path, escapes) {
				const receiver = invocation.receiver ?? invocation.owner;
				const receivers = this.#memo.get(invocation.getter);
				const paths = receivers?.get(receiver);
				const key = JSON.stringify([path, escapes]);
				if (paths?.has(key)) return true;
				if (!this.reserveResult()) return true;
				const selections = paths ?? new Set();
				const owners = receivers ?? new WeakMap();
				selections.add(key);
				owners.set(receiver, selections);
				this.#memo.set(invocation.getter, owners);
				return false;
			}
			#ancestor(invocation) {
				const receiver = invocation.receiver ?? invocation.owner;
				for (let visit = this.#current?.ancestry; visit !== undefined; visit = visit.parent) if (visit.getter === invocation.getter && visit.receiver === receiver) return visit;
				return undefined;
			}
			#grows(invocation, path) {
				if (this.#fallback) return false;
				const previous = this.#ancestor(invocation);
				if (previous === undefined || previous.length >= path.length) return false;
				this.#limited = true;
				return true;
			}
			schedule(invocation, path, escaped = false) {
				if (this.#limited) return;
				const escapes = escaped || this.#fallback || this.#current?.escapes === true;
				const selection = this.#fallback ? [] : path;
				if (this.#grows(invocation, selection)) return;
				if (this.#known(invocation, selection, escapes)) return;
				this.#pending.push({
					invocation,
					path: selection,
					escapes,
					ancestry: {
						getter: invocation.getter,
						receiver: invocation.receiver ?? invocation.owner,
						length: selection.length,
						...this.#current === undefined ? {} : { parent: this.#current.ancestry }
					}
				});
			}
			#collect(root, expand) {
				for (const reference of root()) this.retain(reference);
				for (let cursor = 0; cursor < this.#pending.length && !this.#limited; cursor++) {
					const job = this.#pending[cursor];
					if (job === undefined) break;
					this.#current = job;
					expand(job);
				}
				this.#current = undefined;
			}
			run(root, expand) {
				this.#collect(root, expand);
				if (this.#limited) {
					this.state.getterResourceLimits.add("getter-expansion");
					this.#fallback = true;
					this.#limited = false;
					this.#memo = new WeakMap();
					this.#references = new SemanticObjectReferenceSet();
					this.#pending = [];
					this.#collect(root, expand);
				}
				return this.#references.values();
			}
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticCallableResults.js
var resultExpressions, semanticCallableResultExpressions, semanticCallableResultKind;
function init_javascriptSemanticCallableResults() {
	return (init_javascriptSemanticCallableResults = __esmMin((() => {
		init_javascriptSemanticTraversal();
		resultExpressions = new WeakMap();
		semanticCallableResultExpressions = (callable) => {
			const cached = resultExpressions.get(callable);
			if (cached !== undefined) return cached;
			if (t.isArrowFunctionExpression(callable) && !t.isBlockStatement(callable.body)) {
				const result = [{
					node: callable.body,
					site: callable.body,
					kind: "return",
					delegated: false
				}];
				resultExpressions.set(callable, result);
				return result;
			}
			if (!t.isFunction(callable)) return [];
			const output = [];
			const pending = childNodes(callable.body).reverse();
			while (pending.length > 0) {
				const node = pending.pop();
				if (node === undefined || t.isFunction(node) || t.isClass(node)) continue;
				if (t.isReturnStatement(node)) {
					output.push({
						node: node.argument ?? null,
						site: node,
						kind: "return",
						delegated: false
					});
				}
				if (t.isYieldExpression(node)) output.push({
					node: node.argument ?? null,
					site: node,
					kind: "yield",
					delegated: node.delegate
				});
				for (const child of childNodes(node).reverse()) pending.push(child);
			}
			resultExpressions.set(callable, output);
			return output;
		};
		semanticCallableResultKind = (callable) => {
			if (!t.isFunction(callable)) return "value";
			if (callable.generator) return callable.async ? "async-iterator" : "iterator";
			return callable.async ? "promise" : "value";
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSymbolicValues.js
var symbolicUnknown, symbolicVariants, symbolicUnion, symbolicTruth, symbolicCondition, symbolicConditionsUnresolved;
function init_javascriptSymbolicValues() {
	return (init_javascriptSymbolicValues = __esmMin((() => {
		symbolicUnknown = (reason) => ({
			kind: "unknown",
			reason
		});
		symbolicVariants = (value) => value.kind === "union" ? value.values : [value];
		symbolicUnion = (values) => {
			const unique = [...new Set(values.flatMap(symbolicVariants))];
			return unique.length === 1 ? unique[0] : {
				kind: "union",
				values: unique
			};
		};
		symbolicTruth = (value) => {
			if (value.kind === "namespace" && value.runtimeValueUnknown) return undefined;
			if (value.kind === "union") {
				const choices = value.values.map(symbolicTruth);
				return choices.length > 0 && choices.every((choice) => choice === choices[0]) ? choices[0] : undefined;
			}
			return value.kind === "literal" ? Boolean(value.value) : [
				"function",
				"object",
				"namespace",
				"array",
				"record",
				"loader",
				"promise",
				"iterator"
			].includes(value.kind) ? true : undefined;
		};
		symbolicCondition = (value, condition) => {
			if (value.kind === "union") return symbolicUnion(value.values.map((variant) => symbolicCondition(variant, condition)));
			return {
				...value,
				conditions: [...value.conditions ?? [], condition]
			};
		};
		symbolicConditionsUnresolved = (value) => {
			if (value.kind === "union") return symbolicUnion(value.values.map(symbolicConditionsUnresolved));
			return {
				...value,
				conditionUnresolved: true
			};
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSymbolicControlFlow.js
var logicalRightOperand, symbolicLogicalRight;
function init_javascriptSymbolicControlFlow() {
	return (init_javascriptSymbolicControlFlow = __esmMin((() => {
		init_javascriptSymbolicValues();
		logicalRightOperand = (operator, truth, nullish) => operator === "??" ? nullish : truth === undefined ? undefined : operator === "&&" ? truth : !truth;
		symbolicLogicalRight = (operator, left) => {
			if (left.kind === "namespace" && left.runtimeValueUnknown) return undefined;
			if (left.kind === "union") {
				const choices = left.values.map((value) => symbolicLogicalRight(operator, value));
				return choices.length > 0 && choices.every((choice) => choice === choices[0]) ? choices[0] : undefined;
			}
			if (operator === "??") {
				if (left.kind === "literal") return left.value === null || left.value === undefined;
				return [
					"function",
					"object",
					"namespace",
					"array",
					"record",
					"loader",
					"promise",
					"iterator"
				].includes(left.kind) ? false : undefined;
			}
			const truth = symbolicTruth(left);
			return logicalRightOperand(operator, truth, undefined);
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticDependencies.js
var SemanticDependencyProofs;
function init_javascriptSemanticDependencies() {
	return (init_javascriptSemanticDependencies = __esmMin((() => {
		SemanticDependencyProofs = class SemanticDependencyProofs {
			layout;
			unions = new WeakMap();
			constructor(layout) {
				this.layout = layout;
			}
			static forBindings(bindings) {
				const indices = new Map();
				for (const binding of bindings) indices.set(binding, indices.size);
				return new SemanticDependencyProofs({
					indices,
					singletons: new Map(),
					height: Math.ceil(Math.log2(Math.max(1, indices.size)))
				});
			}
			/** Share identity proofs while retaining unions for only one query. */
			forQuery() {
				return new SemanticDependencyProofs(this.layout);
			}
			binding(binding) {
				const prior = this.layout.singletons.get(binding);
				if (prior !== undefined) return prior;
				const index = this.index(binding);
				let proof = true;
				for (let bit = 0; bit < this.layout.height; bit++) {
					const one = Math.floor(index / 2 ** bit) % 2 === 1;
					proof = Object.freeze({
						zero: one ? undefined : proof,
						one: one ? proof : undefined
					});
				}
				this.layout.singletons.set(binding, proof);
				return proof;
			}
			union(first, second) {
				if (first === second || second === undefined) return first;
				if (first === undefined) return second;
				if (first === true || second === true) return true;
				const cached = this.unions.get(first)?.get(second) ?? this.unions.get(second)?.get(first);
				if (cached !== undefined) return cached;
				const zero = this.union(first.zero, second.zero);
				const one = this.union(first.one, second.one);
				const result = zero === first.zero && one === first.one ? first : zero === second.zero && one === second.one ? second : Object.freeze({
					zero,
					one
				});
				let unions = this.unions.get(first);
				if (unions === undefined) {
					unions = new WeakMap();
					this.unions.set(first, unions);
				}
				unions.set(second, result);
				return result;
			}
			intersects(proof, active) {
				for (const binding of active.keys()) if (this.has(proof, binding)) return true;
				return false;
			}
			has(proof, binding) {
				const index = this.index(binding);
				for (let bit = this.layout.height - 1; bit >= 0; bit--) {
					if (proof === undefined) return false;
					if (proof === true) return true;
					proof = Math.floor(index / 2 ** bit) % 2 === 1 ? proof.one : proof.zero;
				}
				return proof === true;
			}
			index(binding) {
				const index = this.layout.indices.get(binding);
				if (index === undefined) throw new TypeError(`Unindexed semantic dependency: ${binding}`);
				return index;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticSlots.js
function semanticContainer(value) {
	if (value.status === "object") return {
		slots: value.properties,
		coverage: value.unknownProperties ? {
			status: "partial",
			omitted: value.omittedProperties
		} : {
			status: "complete",
			omitted: 0
		}
	};
	if (value.status === "array") return {
		slots: value.items,
		coverage: value.unknownItems ? {
			status: "partial",
			omitted: value.omittedItems
		} : {
			status: "complete",
			omitted: 0
		}
	};
	return null;
}
var semanticSlotAtPath, semanticPropertyPointer;
function init_javascriptSemanticSlots() {
	return (init_javascriptSemanticSlots = __esmMin((() => {
		init_jsonPointer();
		semanticSlotAtPath = (value, path) => {
			const leafName = path.at(-1) ?? "";
			let current = {
				name: "",
				presence: "present",
				value
			};
			for (const [index, name] of path.entries()) {
				const container = semanticContainer(current.value);
				if (current.presence !== "present" || container === null) return {
					name: leafName,
					presence: "unknown-coverage",
					value: "reason" in current.value ? {
						...current.value,
						reason: `${current.value.reason} Cannot continue ${semanticPropertyPointer(path)} through receiver ${semanticPropertyPointer(path.slice(0, index))}.`
					} : {
						status: "unknown",
						reason: `Cannot resolve ${semanticPropertyPointer(path)} through ${current.value.status} receiver ${semanticPropertyPointer(path.slice(0, index))}.`
					}
				};
				if (current.value.status === "array" && name === "length") {
					current = {
						name,
						presence: "present",
						value: {
							status: "unknown",
							reason: "Array length is present but its value is not retained."
						}
					};
					continue;
				}
				const observed = container.slots.find((slot) => slot.name === name);
				current = observed ?? {
					name,
					presence: container.coverage.status === "complete" ? "absent" : "unknown-coverage",
					value: {
						status: "unknown",
						reason: `Own property ${name} was not observed.`
					}
				};
			}
			return current;
		};
		semanticPropertyPointer = (path) => path.map((key) => `/${escapeJsonPointerToken(key)}`).join("");
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticRequireOriginSlot.js
var semanticRequireOriginReaders, readSemanticRequireOrigin, readSemanticRequireOriginCandidate, readSemanticRequireLoader;
function init_javascriptSemanticRequireOriginSlot() {
	return (init_javascriptSemanticRequireOriginSlot = __esmMin((() => {
		semanticRequireOriginReaders = {
			origin: undefined,
			candidate: undefined,
			loader: undefined
		};
		readSemanticRequireOrigin = (node, state) => semanticRequireOriginReaders.origin?.(node, state);
		readSemanticRequireOriginCandidate = (node, state) => semanticRequireOriginReaders.candidate?.(node, state);
		readSemanticRequireLoader = (node, state, factoryBindingIds) => semanticRequireOriginReaders.loader?.(node, state, factoryBindingIds) ?? "unknown";
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticProvenance.js
var semanticLocalProvenance, semanticUnresolvedProvenance, semanticAmbiguousProvenance, semanticOriginsProvenance, uniqueSemanticOrigins, semanticOriginKey, semanticPrimitiveKey, semanticBuiltinNamespacePath;
function init_javascriptSemanticProvenance() {
	return (init_javascriptSemanticProvenance = __esmMin((() => {
		init_unicodeCodePointOrder();
		semanticLocalProvenance = () => ({
			status: "local",
			origins: [],
			reason: null
		});
		semanticUnresolvedProvenance = (status, reason) => ({
			status,
			origins: [],
			reason
		});
		semanticAmbiguousProvenance = (origins, reason) => ({
			status: "ambiguous",
			origins,
			reason
		});
		semanticOriginsProvenance = (origins) => {
			const unique = uniqueSemanticOrigins(origins);
			const origin = unique[0];
			return unique.length === 1 && origin !== undefined && origin.loaderAuthority !== "candidate" ? {
				status: "module",
				origins: [origin],
				reason: null
			} : semanticAmbiguousProvenance(unique, unique.some(({ loaderAuthority }) => loaderAuthority === "candidate") ? "CommonJS loader authority is unknown." : "Multiple module origins.");
		};
		uniqueSemanticOrigins = (origins) => [...new Map(origins.map((origin) => [semanticOriginKey(origin), origin])).values()].sort((left, right) => compareUnicodeCodePoints(semanticOriginKey(left), semanticOriginKey(right)));
		semanticOriginKey = (origin) => JSON.stringify([
			origin.specifier,
			origin.importedPath,
			origin.resolutionMode ?? "import",
			origin.loaderAuthority ?? "proven"
		]);
		semanticPrimitiveKey = (value) => `${value === null ? "null" : typeof value}:${JSON.stringify(value)}`;
		semanticBuiltinNamespacePath = (importedPath) => importedPath.length === 0 || importedPath.length === 1 && importedPath[0] === "default";
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
//#region dist/domain/javascript/javascriptSemanticPrimitives.js
var semanticPrimitiveSet, semanticPrimitiveCandidates;
function init_javascriptSemanticPrimitives() {
	return (init_javascriptSemanticPrimitives = __esmMin((() => {
		init_javascriptSemanticPrecision();
		init_unicodeCodePointOrder();
		init_javascriptSemanticProvenance();
		init_javascriptSemanticResourceLimits();
		semanticPrimitiveSet = (values, precision = JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS) => {
			let uniqueValues;
			for (const value of values) {
				if (typeof value === "number" && !Number.isFinite(value)) return {
					status: "unknown",
					reason: "Nonfinite numbers are outside the JSON primitive lattice."
				};
				if (typeof value === "number" && Object.is(value, -0)) return {
					status: "unknown",
					reason: "Negative zero cannot be preserved by JSON primitive evidence."
				};
				if (values.length === 1) return typeof value === "string" && exceedsSemanticPrimitiveStringByteBudget([value], precision) ? semanticResourceLimitUnknown("primitive-bytes", precision) : {
					status: "literal",
					value
				};
				uniqueValues ??= new Set();
				uniqueValues.add(value);
				if (uniqueValues.size > precision.primitive_candidates) return semanticResourceLimitUnknown("primitive-candidates", precision);
			}
			if (uniqueValues === undefined) return {
				status: "union",
				values: []
			};
			if (exceedsSemanticPrimitiveStringByteBudget([...uniqueValues].flatMap((value) => typeof value === "string" ? [value] : []), precision)) return semanticResourceLimitUnknown("primitive-bytes", precision);
			const unique = [...uniqueValues].map((value) => ({
				key: semanticPrimitiveKey(value),
				value
			})).sort((left, right) => compareUnicodeCodePoints(left.key, right.key)).map(({ value }) => value);
			const only = unique[0];
			return unique.length === 1 && only !== undefined ? {
				status: "literal",
				value: only
			} : {
				status: "union",
				values: unique
			};
		};
		semanticPrimitiveCandidates = (value) => value.status === "literal" ? [value.value] : value.status === "union" ? value.values : null;
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticValues.js
var definitelyDefinedValues, definedNonPrimitiveValue, semanticValueDefinitelyDefined, dependencyProofsByState, createEvaluationMemo, CALLER_INDEPENDENT, EVERY_CALLER, callerIndependentBindingValuesByState, primitiveBindingValuesByState, primitiveExpressionValuesByState, capturedBindingValuesByState, clearSemanticValueCaches, callerIndependentBindingValuesFor, primitiveBindingValuesFor, isSemanticResourceLimit, evaluateSemanticBinding, expressionEvaluationContext, semanticSelectedBranchNodesAt, evaluateSemanticExpression, evaluateSemanticExpressionProvenance, evaluateSemanticProvenance, evaluateSemanticProvenanceAtRead, readMemoizedEvaluation, retainDependencyProof, recordBindingDependency, collectEvaluationDependencies, readSnapshotValuesFor, evaluateBinding, evaluateExpression, evaluateExpressionValue, evaluateTemplate, semanticSelectedBranches, semanticCondition, evaluateObject, evaluateArray, evaluateMember, evaluateAddition, addPrimitiveValues, evaluateUnary, projectValue, provenanceForBinding, provenanceForBindingUncached, provenanceForBindingValue, provenanceForBindingInitializers, provenanceForExpression, provenanceForBindingAtRead, isLocallyCreatedValue, mergeValues, nestedContext, isPrimitive, canCapturePrimitive, primitiveCaptureContext, captureContextAt, evaluateCapturedExpression;
function init_javascriptSemanticValues() {
	return (init_javascriptSemanticValues = __esmMin((() => {
		init_javascriptSemanticEffectLog();
		init_javascriptSemanticPropertyKeys();
		init_javascriptSymbolicControlFlow();
		init_javascriptSemanticDependencies();
		init_javascriptSemanticMutationInitializers();
		init_javascriptSemanticSlots();
		init_javascriptSemanticState();
		init_javascriptSemanticRequireOriginSlot();
		init_unicodeCodePointOrder();
		init_javascriptSemanticArrayLayout();
		init_javascriptAstValues();
		init_javascriptSemanticProvenance();
		init_javascriptSemanticPrimitives();
		init_javascriptSemanticResourceLimits();
		definitelyDefinedValues = new WeakSet();
		definedNonPrimitiveValue = (reason) => {
			const value = {
				status: "unknown",
				reason
			};
			definitelyDefinedValues.add(value);
			return value;
		};
		semanticValueDefinitelyDefined = (value) => value.status === "literal" || value.status === "union" || value.status === "object" || value.status === "array" || definitelyDefinedValues.has(value);
		dependencyProofsByState = new WeakMap();
		createEvaluationMemo = (state, capturedBindings) => {
			let dependencies = dependencyProofsByState.get(state);
			if (dependencies === undefined) {
				dependencies = SemanticDependencyProofs.forBindings(state.bindingsById.keys());
				dependencyProofsByState.set(state, dependencies);
			}
			return {
				...capturedBindings === undefined ? {} : { capturedBindings },
				provenance: new Map(),
				dependencyFrames: [],
				dependencies: dependencies.forQuery()
			};
		};
		CALLER_INDEPENDENT = Number.POSITIVE_INFINITY;
		EVERY_CALLER = -1;
		callerIndependentBindingValuesByState = new WeakMap();
		primitiveBindingValuesByState = new WeakMap();
		primitiveExpressionValuesByState = new WeakMap();
		capturedBindingValuesByState = new WeakMap();
		clearSemanticValueCaches = (state) => {
			primitiveBindingValuesByState.delete(state);
			capturedBindingValuesByState.delete(state);
			primitiveExpressionValuesByState.delete(state);
			callerIndependentBindingValuesByState.delete(state);
		};
		callerIndependentBindingValuesFor = (state) => {
			const existing = callerIndependentBindingValuesByState.get(state);
			if (existing !== undefined) return existing;
			const values = new Map();
			callerIndependentBindingValuesByState.set(state, values);
			return values;
		};
		primitiveBindingValuesFor = (state) => {
			const existing = primitiveBindingValuesByState.get(state);
			if (existing !== undefined) return existing;
			const values = new Map();
			primitiveBindingValuesByState.set(state, values);
			return values;
		};
		isSemanticResourceLimit = (value) => value.status === "unknown" && value.resourceLimit !== undefined;
		evaluateSemanticBinding = (binding, state) => opaqueCodeMayRebindBinding(binding, state) ? {
			status: "unknown",
			reason: "Direct eval may have changed this lexical binding."
		} : evaluateBinding(binding, {
			state,
			bindings: new Map(),
			expressionDepth: 0,
			primitiveBindingValues: primitiveBindingValuesFor(state),
			dependence: { lowest: CALLER_INDEPENDENT },
			memo: createEvaluationMemo(state)
		});
		expressionEvaluationContext = (state, captureScope = "state") => ({
			state,
			bindings: new Map(),
			expressionDepth: 0,
			primitiveBindingValues: primitiveBindingValuesFor(state),
			dependence: { lowest: CALLER_INDEPENDENT },
			memo: createEvaluationMemo(state, captureScope === "query" ? new WeakMap() : undefined)
		});
		semanticSelectedBranchNodesAt = (node, state, capture) => {
			const context = expressionEvaluationContext(state);
			return semanticSelectedBranches(node, captureContextAt(capture, context) ?? context).map(({ node }) => node);
		};
		evaluateSemanticExpression = (node, state, capturePoint, captureScope = "state") => {
			const context = expressionEvaluationContext(state, captureScope);
			return capturePoint === undefined ? evaluateCapturedExpression(node, context) : evaluateExpression(node, captureContextAt(capturePoint, context) ?? context);
		};
		evaluateSemanticExpressionProvenance = (node, state) => provenanceForExpression(node, {
			state,
			bindings: new Map(),
			expressionDepth: 0,
			primitiveBindingValues: primitiveBindingValuesFor(state),
			dependence: { lowest: CALLER_INDEPENDENT },
			memo: createEvaluationMemo(state)
		});
		evaluateSemanticProvenance = (binding, state) => {
			const provenance = provenanceForBinding(binding, {
				state,
				bindings: new Map(),
				expressionDepth: 0,
				primitiveBindingValues: primitiveBindingValuesFor(state),
				dependence: { lowest: CALLER_INDEPENDENT },
				memo: createEvaluationMemo(state)
			});
			return opaqueCodeMayRebindBinding(binding, state) ? semanticAmbiguousProvenance(provenance.origins, "Direct eval may have changed this runtime value.") : provenance;
		};
		evaluateSemanticProvenanceAtRead = (binding, read, state) => provenanceForBindingAtRead(binding, read, {
			state,
			bindings: new Map(),
			expressionDepth: 0,
			primitiveBindingValues: primitiveBindingValuesFor(state),
			dependence: { lowest: CALLER_INDEPENDENT },
			memo: createEvaluationMemo(state)
		});
		readMemoizedEvaluation = (entry, context) => {
			if (entry === undefined || context.memo.dependencies.intersects(entry.dependencies, context.bindings)) return undefined;
			retainDependencyProof(entry.dependencies, context);
			return entry.value;
		};
		retainDependencyProof = (proof, context) => {
			const parent = context.memo.dependencyFrames.at(-1);
			if (parent !== undefined) parent.proof = context.memo.dependencies.union(parent.proof, proof);
		};
		recordBindingDependency = (binding, context) => retainDependencyProof(context.memo.dependencies.binding(binding.bindingId), context);
		collectEvaluationDependencies = (binding, context, evaluate) => {
			const frame = { proof: context.memo.dependencies.binding(binding.bindingId) };
			context.memo.dependencyFrames.push(frame);
			try {
				return {
					value: evaluate(),
					dependencies: frame.proof
				};
			} finally {
				context.memo.dependencyFrames.pop();
				retainDependencyProof(frame.proof, context);
			}
		};
		readSnapshotValuesFor = (binding, context) => {
			const initializer = binding.initializers[0];
			if (binding.initializers.length !== 1 || initializer === undefined) return undefined;
			let values;
			if (context.capturePoint === undefined) values = context.memo.snapshotValues ??= new WeakMap();
			else {
				const captures = context.memo.capturedSnapshotValues ??= new WeakMap();
				let captured = captures.get(context.capturePoint);
				if (captured === undefined) {
					captured = new WeakMap();
					captures.set(context.capturePoint, captured);
				}
				values = captured;
			}
			let entries = values.get(initializer);
			if (entries === undefined) {
				entries = new Map();
				values.set(initializer, entries);
			}
			let depths = entries.get(binding.bindingId);
			if (depths === undefined) {
				depths = new Map();
				entries.set(binding.bindingId, depths);
			}
			return depths;
		};
		evaluateBinding = (binding, context, wholeBinding = true) => {
			recordBindingDependency(binding, context);
			const cycleHead = context.bindings.get(binding.bindingId);
			if (cycleHead !== undefined) {
				context.dependence.lowest = Math.min(context.dependence.lowest, cycleHead);
				return {
					status: "cycle",
					reason: `Alias cycle at ${binding.name}.`
				};
			}
			if (wholeBinding && context.capturePoint !== undefined && !semanticBindingPrecedesCapture(binding, context.capturePoint, context.state.parentsByNode)) {
				const { capturePoint: _capturePoint, ...liveContext } = context;
				return evaluateBinding(binding, {
					...liveContext,
					primitiveBindingValues: primitiveBindingValuesFor(context.state)
				});
			}
			const cached = wholeBinding ? context.primitiveBindingValues.get(binding.bindingId) : undefined;
			if (cached !== undefined) return cached;
			const snapshots = wholeBinding ? undefined : readSnapshotValuesFor(binding, context);
			const snapshot = snapshots?.get(context.expressionDepth);
			const snapshotValue = readMemoizedEvaluation(snapshot, context);
			if (snapshotValue !== undefined) {
				if (snapshot?.depthDependent === true) context.dependence.lowest = EVERY_CALLER;
				return snapshotValue;
			}
			const independent = wholeBinding && context.capturePoint === undefined ? callerIndependentBindingValuesFor(context.state) : undefined;
			const retained = independent?.get(binding.bindingId);
			if (retained !== undefined && context.expressionDepth <= retained.expressionDepth) {
				const reusable = readMemoizedEvaluation(retained, context);
				if (reusable !== undefined) return reusable;
			}
			if (binding.referenceInitializers.some(({ assignment }) => assignment) && (binding.initializers.length > 0 || (context.state.bindingsById.get(binding.bindingId)?.initializers.length ?? 0) > 0)) return {
				status: "ambiguous",
				reason: `Binding ${binding.name} has value and projected-reference assignments.`
			};
			if (binding.initializers.length === 0) return {
				status: "unknown",
				reason: wholeBinding ? `Binding ${binding.name} has no constant initializer.` : `Binding ${binding.name} has no proven initializer at this read.`
			};
			if (binding.initializers.some(({ node }) => t.isUpdateExpression(node) || t.isAssignmentExpression(node) && node.operator !== "=" && node.operator !== "&&=" && node.operator !== "||=" && node.operator !== "??=")) return {
				status: "unknown",
				reason: `Binding ${binding.name} has a compound or update write.`
			};
			if (binding.initializers.length > 1) return {
				status: "ambiguous",
				reason: `Binding ${binding.name} has multiple possible assignments.`
			};
			const initializer = binding.initializers[0];
			if (initializer === undefined) return {
				status: "unknown",
				reason: "Missing binding initializer."
			};
			if (context.state.conditionallySkippedExpressions.has(initializer.node)) return {
				status: "unknown",
				reason: `Binding ${binding.name} may remain uninitialized.`
			};
			const position = context.bindings.size;
			const callerDependence = context.dependence.lowest;
			context.dependence.lowest = CALLER_INDEPENDENT;
			context.bindings.set(binding.bindingId, position);
			let value;
			let callerIndependent = false;
			let depthDependent = false;
			let evaluated;
			try {
				evaluated = collectEvaluationDependencies(binding, context, () => {
					const nested = nestedContext(context);
					let value = projectValue(evaluateExpression(initializer.node, nested), initializer.projection);
					if (canCapturePrimitive(value)) {
						const captureContext = primitiveCaptureContext(initializer.node, nested);
						if (captureContext !== undefined) {
							const captured = projectValue(evaluateExpression(initializer.node, captureContext), initializer.projection);
							if (isPrimitive(captured)) value = captured;
						}
					}
					return value;
				});
				value = evaluated.value;
				callerIndependent = context.dependence.lowest > position;
				depthDependent = context.dependence.lowest === EVERY_CALLER;
			} finally {
				context.bindings.delete(binding.bindingId);
				context.dependence.lowest = callerIndependent ? callerDependence : Math.min(callerDependence, context.dependence.lowest);
			}
			const projected = applySemanticBindingReferenceEffects(value, binding, context.state, context.capturePoint);
			if (callerIndependent && independent !== undefined && (retained === undefined || retained.expressionDepth < context.expressionDepth)) independent.set(binding.bindingId, {
				value: projected,
				dependencies: evaluated.dependencies,
				expressionDepth: context.expressionDepth
			});
			if (snapshots !== undefined && (callerIndependent || depthDependent) && !context.memo.dependencies.intersects(evaluated.dependencies, context.bindings)) snapshots.set(context.expressionDepth, {
				value: projected,
				dependencies: evaluated.dependencies,
				depthDependent
			});
			if (wholeBinding && (context.capturePoint !== undefined || projected.status === "literal" || projected.status === "union" || isSemanticResourceLimit(projected) && (projected.resourceLimit === "primitive-bytes" || projected.resourceLimit === "primitive-candidates"))) context.primitiveBindingValues.set(binding.bindingId, projected);
			return projected;
		};
		evaluateExpression = (node, context) => {
			const value = evaluateExpressionValue(node, context);
			recordSemanticValueLimit(context.state, value);
			return value;
		};
		evaluateExpressionValue = (node, context) => {
			if (context.expressionDepth > context.state.precision.expression_depth) {
				context.dependence.lowest = EVERY_CALLER;
				return semanticResourceLimitUnknown("expression-depth", context.state.precision);
			}
			const unwrapped = unwrapJavaScriptExpression(node);
			if (unwrapped.depth > 0) {
				if (context.expressionDepth + unwrapped.depth > context.state.precision.expression_depth) {
					context.dependence.lowest = EVERY_CALLER;
					return semanticResourceLimitUnknown("expression-depth", context.state.precision);
				}
				return evaluateExpression(unwrapped.node, {
					...context,
					expressionDepth: context.expressionDepth + unwrapped.depth
				});
			}
			const literal = readExactJavaScriptLiteral(node);
			if (literal.found) return semanticPrimitiveSet([literal.value], context.state.precision);
			if (t.isFunctionExpression(node) || t.isFunctionDeclaration(node) || t.isArrowFunctionExpression(node) || t.isClassExpression(node) || t.isClassDeclaration(node)) return definedNonPrimitiveValue(`Unsupported ${node.type} value.`);
			if (t.isIdentifier(node)) {
				const binding = resolveSemanticBindingState(context.state, node, node.name);
				if (binding === undefined) return {
					status: "unknown",
					reason: `Unbound identifier ${node.name}.`
				};
				const read = semanticBindingAtRead(binding, node, context.state);
				if (read.status === "unresolved" && binding.mutable && binding.definitions.some(({ kind }) => kind === "assignment")) {
					const value = evaluateBinding(binding, nestedContext(context));
					if (value.status === "unknown" || value.status === "ambiguous" || value.status === "cycle") return value;
					return {
						status: "unknown",
						reason: `Binding ${binding.name} has unresolved ordering at this read.`
					};
				}
				const atRead = read.binding;
				if (opaqueCodeMayRebindBinding(binding, context.state, context.capturePoint ?? node)) return {
					status: "unknown",
					reason: "Direct eval may have changed this lexical binding."
				};
				return evaluateBinding(atRead, nestedContext(context), atRead === binding);
			}
			if (t.isTemplateLiteral(node)) return evaluateTemplate(node, context);
			if (t.isConditionalExpression(node) || t.isLogicalExpression(node)) return mergeValues(semanticSelectedBranches(node, context).map((branch) => branch.value ?? evaluateExpression(branch.node, nestedContext(context))), context.state.precision);
			if (t.isObjectExpression(node)) return evaluateObject(node, context);
			if (t.isArrayExpression(node)) return evaluateArray(node, context);
			if (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) return evaluateMember(node, context);
			if (t.isBinaryExpression(node, { operator: "+" })) return evaluateAddition(node, context);
			if (t.isUnaryExpression(node)) return evaluateUnary(node, context);
			return {
				status: "unknown",
				reason: `Unsupported ${node.type} value.`
			};
		};
		evaluateTemplate = (node, context) => {
			let candidates = [""];
			for (let index = 0; index < node.quasis.length; index += 1) {
				const quasi = node.quasis[index];
				const text = quasi?.value.cooked;
				if (text === undefined || text === null) return {
					status: "unknown",
					reason: "Template text has no cooked representation."
				};
				if (exceedsSemanticTemplateByteBudget(candidates, [text], context.state.precision)) return semanticResourceLimitUnknown("primitive-bytes", context.state.precision);
				candidates = candidates.map((prefix) => `${prefix}${text}`);
				const expression = node.expressions[index];
				if (expression === undefined) continue;
				const evaluated = evaluateExpression(expression, nestedContext(context));
				const values = semanticPrimitiveCandidates(evaluated);
				if (values === null) {
					if (isSemanticResourceLimit(evaluated)) return evaluated;
					return {
						status: "unknown",
						reason: "Template expression is not a bounded primitive."
					};
				}
				if (candidates.length > context.state.precision.primitive_candidates / values.length) return semanticResourceLimitUnknown("primitive-candidates", context.state.precision);
				const suffixes = values.map((value) => String(value));
				if (exceedsSemanticTemplateByteBudget(candidates, suffixes, context.state.precision)) return semanticResourceLimitUnknown("primitive-bytes", context.state.precision);
				candidates = candidates.flatMap((prefix) => suffixes.map((suffix) => `${prefix}${suffix}`));
			}
			return semanticPrimitiveSet(candidates, context.state.precision);
		};
		semanticSelectedBranches = (node, context) => {
			if (t.isConditionalExpression(node)) {
				const test = evaluateExpression(node.test, nestedContext(context));
				const choice = semanticCondition(test, Boolean);
				return choice === undefined ? [{ node: node.consequent }, { node: node.alternate }] : [{ node: choice ? node.consequent : node.alternate }];
			}
			const value = evaluateExpression(node.left, nestedContext(context));
			const left = {
				node: node.left,
				value
			};
			const choice = logicalRightOperand(node.operator, semanticCondition(value, Boolean), semanticCondition(value, (candidate) => candidate === null, false));
			return choice === undefined ? [left, { node: node.right }] : [choice ? { node: node.right } : left];
		};
		semanticCondition = (value, select, objectResult = true) => {
			if (value.status === "object" || value.status === "array") return objectResult;
			const choices = semanticPrimitiveCandidates(value)?.map(select);
			return choices !== undefined && choices.length > 0 && choices.every((choice) => choice === choices[0]) ? choices[0] : undefined;
		};
		evaluateObject = (node, context) => {
			const propertiesByName = new Map();
			let unknownProperties = false;
			let omittedProperties = 0;
			const invalidateEarlierProperties = () => {
				for (const [name] of propertiesByName) propertiesByName.set(name, {
					name,
					presence: "present",
					value: {
						status: "unknown",
						reason: "A later property may overwrite this value."
					}
				});
			};
			for (const property of node.properties) {
				if (t.isSpreadElement(property)) {
					const copied = evaluateExpression(property.argument, captureContextAt(property.argument, nestedContext(context)) ?? nestedContext(context));
					if (copied.status === "object" || copied.status === "array") {
						const unknown = copied.status === "object" ? copied.unknownProperties : copied.unknownItems;
						if (unknown) {
							unknownProperties = true;
							omittedProperties = null;
							invalidateEarlierProperties();
						}
						for (const field of semanticContainer(copied).slots) {
							if (field.presence === "absent") continue;
							propertiesByName.set(field.name, {
								...field,
								value: isPrimitive(field.value) ? field.value : {
									status: "unknown",
									reason: "Copied reference fields retain live identity rather than a scalar snapshot."
								}
							});
						}
					} else if (copied.status !== "literal" || typeof copied.value === "string") {
						unknownProperties = true;
						omittedProperties = null;
						invalidateEarlierProperties();
					}
					continue;
				}
				if (property.computed && semanticKnownSymbolKey(property.key, context.state)) {
					unknownProperties = true;
					if (omittedProperties !== null) omittedProperties += 1;
					continue;
				}
				const name = semanticStaticPropertyKey(property.key, property.computed);
				if (name === null) {
					unknownProperties = true;
					if (omittedProperties !== null) omittedProperties += 1;
					invalidateEarlierProperties();
					continue;
				}
				if (t.isObjectProperty(property) && !property.computed && !property.shorthand && name === "__proto__") {
					unknownProperties = true;
					if (omittedProperties !== null) omittedProperties += 1;
					continue;
				}
				propertiesByName.set(name, {
					name,
					presence: "present",
					value: t.isObjectProperty(property) ? evaluateCapturedExpression(property.value, nestedContext(context)) : property.kind === "method" ? definedNonPrimitiveValue("Object method or accessor value is not a primitive.") : {
						status: "unknown",
						reason: "Object method or accessor value is not a primitive."
					}
				});
			}
			const properties = [...propertiesByName.values()].sort((left, right) => compareUnicodeCodePoints(left.name, right.name));
			return unknownProperties ? {
				status: "object",
				properties,
				unknownProperties: true,
				omittedProperties
			} : {
				status: "object",
				properties,
				unknownProperties: false,
				omittedProperties: 0
			};
		};
		evaluateArray = (node, context) => {
			const items = [];
			let unknownItems = false;
			let omittedItems = 0;
			for (const part of semanticArrayLiteralLayout(node, context.state)) {
				if (part.kind === "opaque-spread") {
					unknownItems = true;
					omittedItems = null;
					break;
				}
				const { element, depth } = part;
				if (element === null) {
					items.push({
						name: String(items.length),
						presence: "absent",
						value: {
							status: "unknown",
							reason: "Array hole has no own value."
						}
					});
					continue;
				}
				items.push({
					name: String(items.length),
					presence: "present",
					value: evaluateCapturedExpression(element, nestedContext(context, depth))
				});
			}
			return unknownItems ? {
				status: "array",
				items,
				unknownItems: true,
				omittedItems
			} : {
				status: "array",
				items,
				unknownItems: false,
				omittedItems: 0
			};
		};
		evaluateMember = (node, context) => {
			const keys = [];
			let current = node;
			let value;
			while (t.isMemberExpression(current) || t.isOptionalMemberExpression(current)) {
				if (!t.isNode(current.object)) {
					value = {
						status: "unknown",
						reason: "Unsupported member base."
					};
					break;
				}
				const key = semanticStaticPropertyKey(current.property, current.computed);
				if (key === null) {
					value = {
						status: "unknown",
						reason: "Dynamic member key."
					};
					break;
				}
				keys.push(key);
				current = current.object;
			}
			value ??= evaluateExpression(current, nestedContext(context));
			for (const key of keys.reverse()) value = projectValue(value, [key]);
			return value;
		};
		evaluateAddition = (node, context) => {
			const pending = [];
			let current = node;
			while (true) {
				if (t.isBinaryExpression(current, { operator: "+" })) {
					pending.push({
						node: current,
						left: undefined
					});
					current = current.left;
					continue;
				}
				let value = evaluateExpression(current, nestedContext(context));
				while (true) {
					const parent = pending.at(-1);
					if (parent === undefined) return value;
					if (parent.left === undefined) {
						parent.left = value;
						current = parent.node.right;
						break;
					}
					value = addPrimitiveValues(parent.left, value, context.state.precision);
					pending.pop();
				}
			}
		};
		addPrimitiveValues = (leftValue, rightValue, precision) => {
			const left = semanticPrimitiveCandidates(leftValue);
			const right = semanticPrimitiveCandidates(rightValue);
			if (left === null || right === null) {
				if (isSemanticResourceLimit(leftValue)) return leftValue;
				if (isSemanticResourceLimit(rightValue)) return rightValue;
				return {
					status: "unknown",
					reason: "Non-primitive addition."
				};
			}
			if (left.length > precision.primitive_candidates / right.length) return semanticResourceLimitUnknown("primitive-candidates", precision);
			if (exceedsSemanticPrimitiveAdditionByteBudget(left, right, precision)) return semanticResourceLimitUnknown("primitive-bytes", precision);
			const values = left.flatMap((leftValue) => right.map((rightValue) => typeof leftValue === "string" || typeof rightValue === "string" ? `${String(leftValue)}${String(rightValue)}` : Number(leftValue) + Number(rightValue)));
			return semanticPrimitiveSet(values, precision);
		};
		evaluateUnary = (node, context) => {
			const evaluated = evaluateExpression(node.argument, nestedContext(context));
			const argument = semanticPrimitiveCandidates(evaluated);
			if (argument === null) {
				if (isSemanticResourceLimit(evaluated)) return evaluated;
				return {
					status: "unknown",
					reason: "Non-primitive unary operand."
				};
			}
			if (node.operator === "!") return semanticPrimitiveSet(argument.map((value) => !value), context.state.precision);
			if (node.operator === "+") return semanticPrimitiveSet(argument.map((value) => Number(value)), context.state.precision);
			if (node.operator === "-") return semanticPrimitiveSet(argument.map((value) => -Number(value)), context.state.precision);
			return {
				status: "unknown",
				reason: `Unsupported unary ${node.operator}.`
			};
		};
		projectValue = (value, projection) => {
			if (isSemanticResourceLimit(value)) return value;
			if (projection.includes(null)) return {
				status: "unknown",
				reason: "Cannot project a dynamic property."
			};
			const path = projection.map((key) => String(key));
			const slot = semanticSlotAtPath(value, path);
			return slot.presence === "present" || isSemanticResourceLimit(slot.value) ? slot.value : {
				status: "unknown",
				reason: `Own property ${path.join("/")} is ${slot.presence}.`
			};
		};
		provenanceForBinding = (binding, context) => {
			recordBindingDependency(binding, context);
			const cycleHead = context.bindings.get(binding.bindingId);
			if (cycleHead !== undefined) {
				context.dependence.lowest = Math.min(context.dependence.lowest, cycleHead);
				return semanticUnresolvedProvenance("cycle", `Alias cycle at ${binding.name}.`);
			}
			let depths = context.memo.provenance.get(binding.bindingId);
			const prior = readMemoizedEvaluation(depths?.get(context.expressionDepth), context);
			if (prior !== undefined) return prior;
			const position = context.bindings.size;
			const callerDependence = context.dependence.lowest;
			context.dependence.lowest = CALLER_INDEPENDENT;
			let result;
			let callerIndependent = false;
			try {
				result = collectEvaluationDependencies(binding, context, () => provenanceForBindingUncached(binding, context));
				callerIndependent = context.dependence.lowest > position;
			} finally {
				context.dependence.lowest = callerIndependent ? callerDependence : Math.min(callerDependence, context.dependence.lowest);
			}
			if (callerIndependent) {
				if (depths === undefined) {
					depths = new Map();
					context.memo.provenance.set(binding.bindingId, depths);
				}
				depths.set(context.expressionDepth, result);
			}
			return result.value;
		};
		provenanceForBindingUncached = (binding, context) => {
			const provenance = provenanceForBindingValue(binding, context);
			const assigned = binding.definitions.some(({ kind }) => kind === "assignment");
			const conditionallyInitialized = binding.initializers.some(({ node }) => context.state.conditionallySkippedExpressions.has(node));
			if (provenance.status !== "module" || !assigned && !conditionallyInitialized) return provenance;
			return semanticAmbiguousProvenance(provenance.origins, assigned ? `Binding ${binding.name} may be reassigned.` : `Binding ${binding.name} may remain uninitialized.`);
		};
		provenanceForBindingValue = (binding, context) => {
			const provenance = provenanceForBindingInitializers(binding, context);
			if (!binding.referenceInitializers.some(({ assignment }) => assignment)) return provenance;
			if (provenance.status === "local") return semanticUnresolvedProvenance("unknown", `Binding ${binding.name} has projected reference assignments whose module provenance is unresolved.`);
			return provenance.status === "module" ? semanticAmbiguousProvenance(provenance.origins, `Binding ${binding.name} has projected reference assignments that may replace its module origin.`) : provenance;
		};
		provenanceForBindingInitializers = (binding, context) => {
			if (binding.kind === "parameter" || binding.kind === "catch") return semanticUnresolvedProvenance("unknown", binding.kind === "parameter" ? "Parameter provenance depends on caller arguments." : "Catch binding provenance depends on the thrown value.");
			if (binding.directOrigins.length > 0) return semanticOriginsProvenance(binding.directOrigins);
			if (binding.initializers.length === 0) return semanticLocalProvenance();
			if (binding.initializers.length > 1) return semanticAmbiguousProvenance([], `Binding ${binding.name} has multiple possible assignments.`);
			const initializer = binding.initializers[0];
			if (initializer === undefined) return semanticUnresolvedProvenance("unknown", "Missing binding initializer.");
			if (initializer.projection.includes(null)) return semanticUnresolvedProvenance("unknown", "Dynamic provenance projection.");
			context.bindings.set(binding.bindingId, context.bindings.size);
			let resolved;
			try {
				resolved = provenanceForExpression(initializer.node, nestedContext(context));
			} finally {
				context.bindings.delete(binding.bindingId);
			}
			if (resolved.origins.length === 0 || initializer.projection.length === 0) return resolved;
			const projected = resolved.origins.map((origin) => ({
				...origin,
				importedPath: [...origin.importedPath, ...initializer.projection.map((segment) => String(segment))]
			}));
			return resolved.status === "ambiguous" ? semanticAmbiguousProvenance(projected, resolved.reason) : semanticOriginsProvenance(projected);
		};
		provenanceForExpression = (node, context) => {
			if (context.expressionDepth > context.state.precision.expression_depth) {
				context.dependence.lowest = EVERY_CALLER;
				context.state.valueResourceLimits.add("expression-depth");
				return semanticUnresolvedProvenance("unknown", semanticResourceLimitReason("expression-depth", context.state.precision));
			}
			const unwrapped = unwrapJavaScriptExpression(node);
			if (unwrapped.depth > 0) {
				if (context.expressionDepth + unwrapped.depth > context.state.precision.expression_depth) {
					context.dependence.lowest = EVERY_CALLER;
					context.state.valueResourceLimits.add("expression-depth");
					return semanticUnresolvedProvenance("unknown", semanticResourceLimitReason("expression-depth", context.state.precision));
				}
				return provenanceForExpression(unwrapped.node, {
					...context,
					expressionDepth: context.expressionDepth + unwrapped.depth
				});
			}
			const required = readSemanticRequireOriginCandidate(node, context.state);
			if (required !== undefined) return semanticOriginsProvenance([required.origin]);
			if (t.isSequenceExpression(node)) {
				const finalExpression = node.expressions.at(-1);
				return finalExpression === undefined ? semanticUnresolvedProvenance("unknown", "Empty sequence expression.") : provenanceForExpression(finalExpression, nestedContext(context));
			}
			if (t.isAssignmentExpression(node) && node.operator === "=") return provenanceForExpression(node.right, nestedContext(context));
			if (t.isIdentifier(node)) {
				const binding = resolveSemanticBindingState(context.state, node, node.name);
				return binding === undefined ? semanticUnresolvedProvenance("unknown", `Unbound identifier ${node.name}.`) : provenanceForBindingAtRead(binding, node, nestedContext(context));
			}
			if (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) {
				const members = [];
				let current = node;
				while (t.isMemberExpression(current) || t.isOptionalMemberExpression(current)) {
					if (!t.isNode(current.object)) return semanticUnresolvedProvenance("unknown", "Unsupported member base.");
					const member = semanticStaticPropertyKey(current.property, current.computed);
					if (member === null) return semanticUnresolvedProvenance("unknown", "Dynamic provenance member.");
					members.push(member);
					current = current.object;
				}
				const base = provenanceForExpression(current, nestedContext(context));
				const path = members.reverse();
				if (base.origins.length === 0) return base;
				const projected = base.origins.map((origin) => ({
					...origin,
					importedPath: [...origin.importedPath, ...path]
				}));
				return base.status === "ambiguous" ? semanticAmbiguousProvenance(projected, base.reason) : semanticOriginsProvenance(projected);
			}
			if (t.isConditionalExpression(node) || t.isLogicalExpression(node)) {
				const candidates = semanticSelectedBranches(node, context).map((branch) => provenanceForExpression(branch.node, nestedContext(context)));
				const origins = uniqueSemanticOrigins(candidates.flatMap((candidate) => candidate.origins));
				const allModuleOrigins = candidates.every(({ status }) => status === "module");
				if (allModuleOrigins && origins.length === 1) return semanticOriginsProvenance(origins);
				return origins.length > 0 ? semanticAmbiguousProvenance(origins, allModuleOrigins ? "Multiple module origins." : "Conditional provenance includes a non-module alternative.") : semanticUnresolvedProvenance("unknown", "Conditional provenance is unresolved.");
			}
			if (isLocallyCreatedValue(node)) return semanticLocalProvenance();
			return semanticUnresolvedProvenance("unknown", `Unsupported ${node.type} provenance.`);
		};
		provenanceForBindingAtRead = (binding, read, context) => {
			if (opaqueCodeMayRebindBinding(binding, context.state, read)) return semanticAmbiguousProvenance(provenanceForBinding(binding, context).origins, "Direct eval may have changed this runtime value.");
			const { binding: snapshot } = semanticBindingAtRead(binding, read, context.state);
			if (snapshot === binding) return provenanceForBinding(binding, context);
			if (context.bindings.has(binding.bindingId)) return semanticUnresolvedProvenance("cycle", `Alias cycle at ${binding.name}.`);
			context.bindings.set(binding.bindingId, context.bindings.size);
			try {
				return provenanceForBindingValue(snapshot, context);
			} finally {
				context.bindings.delete(binding.bindingId);
			}
		};
		isLocallyCreatedValue = (node) => readExactJavaScriptLiteral(node).found || t.isObjectExpression(node) || t.isArrayExpression(node) || t.isFunctionExpression(node) || t.isFunctionDeclaration(node) || t.isArrowFunctionExpression(node) || t.isClassExpression(node) || t.isClassDeclaration(node) || t.isTemplateLiteral(node) || t.isUnaryExpression(node) || t.isBinaryExpression(node) || t.isUpdateExpression(node);
		mergeValues = (values, precision) => {
			const resourceLimit = values.find(isSemanticResourceLimit);
			if (resourceLimit !== undefined) return resourceLimit;
			const primitives = values.flatMap((value) => semanticPrimitiveCandidates(value) ?? []);
			const merged = values.every((value) => value.status === "union" || value.status === "literal") ? semanticPrimitiveSet(primitives, precision) : {
				status: "ambiguous",
				reason: "Branches have incompatible values."
			};
			if (values.length > 0 && values.every(semanticValueDefinitelyDefined)) definitelyDefinedValues.add(merged);
			return merged;
		};
		nestedContext = (context, depth = 1) => context.capturePoint === undefined ? {
			state: context.state,
			primitiveBindingValues: context.primitiveBindingValues,
			expressionDepth: context.expressionDepth + depth,
			bindings: context.bindings,
			dependence: context.dependence,
			memo: context.memo
		} : {
			state: context.state,
			primitiveBindingValues: context.primitiveBindingValues,
			capturePoint: context.capturePoint,
			expressionDepth: context.expressionDepth + depth,
			bindings: context.bindings,
			dependence: context.dependence,
			memo: context.memo
		};
		isPrimitive = (value) => value.status === "literal" || value.status === "union";
		canCapturePrimitive = (value) => !isPrimitive(value) && !(isSemanticResourceLimit(value) && value.resourceLimit === "expression-depth");
		primitiveCaptureContext = (node, context) => {
			if (t.isObjectExpression(node) || t.isArrayExpression(node)) return undefined;
			return captureContextAt(node, context);
		};
		captureContextAt = (node, context) => {
			if (context.capturePoint !== undefined || semanticCapturePosition(node, context.state.parentsByNode) === null) return undefined;
			let captures = context.memo.capturedBindings ?? capturedBindingValuesByState.get(context.state);
			if (captures === undefined) {
				captures = new WeakMap();
				capturedBindingValuesByState.set(context.state, captures);
			}
			let values = captures.get(node);
			if (values === undefined) {
				values = new Map();
				captures.set(node, values);
			}
			return {
				...context,
				capturePoint: node,
				primitiveBindingValues: values
			};
		};
		evaluateCapturedExpression = (node, context) => {
			let values = primitiveExpressionValuesByState.get(context.state);
			const cached = values?.get(node);
			if (cached !== undefined) return cached;
			let value = evaluateExpression(node, context);
			if (canCapturePrimitive(value)) {
				const captureContext = primitiveCaptureContext(node, context);
				if (captureContext !== undefined) {
					const captured = evaluateExpression(node, captureContext);
					if (isPrimitive(captured)) value = captured;
				}
			}
			if (context.capturePoint === undefined && isPrimitive(value)) {
				if (values === undefined) {
					values = new WeakMap();
					primitiveExpressionValuesByState.set(context.state, values);
				}
				values.set(node, value);
			}
			return value;
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticReferenceSources.js
var semanticCommonJsRequireOwnEnumerableAt, arrayIteratorReturnGlobalOwners, semanticArrayIterationPrototypeEffectPath, semanticKnownArrayIteration, arrayIteratorReturnPaths, semanticArrayIteratorMayHaveReturnAt, isLexicalPatternDeclaration, semanticArrayPatternCanResumeAfterClose, semanticArrayPatternCloseSelection, semanticKnownArrayIterationAt, semanticReferenceIterationUnknown, selectedReferenceIterationKnown, semanticReferenceSourcesInactive, semanticSelectedReferenceSlot;
function init_javascriptSemanticReferenceSources() {
	return (init_javascriptSemanticReferenceSources = __esmMin((() => {
		init_javascriptSemanticPropertyPaths();
		init_javascriptSemanticValues();
		init_javascriptSemanticSlots();
		init_javascriptSemanticEffectLog();
		init_javascriptSemanticArrayLayout();
		semanticCommonJsRequireOwnEnumerableAt = (capture, state) => ambientPathMayObserveAt(state, capture, ["commonjs-module", "require"], "contents");
		arrayIteratorReturnGlobalOwners = new Set(["Iterator", "Object"]);
		semanticArrayIterationPrototypeEffectPath = (path, kind) => {
			const [namespace, owner, property] = path;
			if (namespace === semanticArrayIteratorPrototypePath[0]) return path;
			if (namespace !== "global" || typeof owner !== "string" || owner !== "Array" && !arrayIteratorReturnGlobalOwners.has(owner)) return undefined;
			return property === "prototype" || property === null || kind === "escape" && path.length === 2 ? [
				namespace,
				owner,
				"prototype",
				...path.slice(3)
			] : undefined;
		};
		semanticKnownArrayIteration = (value, state, read) => value?.status === "array" && semanticNativeArrayIteratorIntactAt(state, read) && value.items.every((item) => semanticArrayIndex(item.name) !== null);
		arrayIteratorReturnPaths = [
			[...semanticArrayIteratorPrototypePath, "return"],
			[
				...semanticArrayIteratorPrototypePath,
				"__proto__",
				"return"
			],
			[
				...semanticArrayIteratorPrototypePath,
				"__proto__",
				"__proto__",
				"return"
			],
			...Array.from(arrayIteratorReturnGlobalOwners, (owner) => [
				"global",
				owner,
				"prototype",
				"return"
			])
		];
		semanticArrayIteratorMayHaveReturnAt = (pattern, state) => arrayIteratorReturnPaths.some((path) => ambientPathMayObserveAt(state, pattern, path, "contents"));
		isLexicalPatternDeclaration = (owner, state) => {
			if (!t.isVariableDeclarator(owner)) return false;
			const declaration = state.parentsByNode.get(owner);
			return t.isVariableDeclaration(declaration) && (declaration.kind === "const" || declaration.kind === "let");
		};
		semanticArrayPatternCanResumeAfterClose = (pattern, owner, state) => isLexicalPatternDeclaration(owner, state) && !semanticArrayIteratorMayHaveReturnAt(pattern, state);
		semanticArrayPatternCloseSelection = (pattern, owner, array, state) => {
			if (!semanticArrayIteratorMayHaveReturnAt(pattern, state)) return undefined;
			const last = pattern.elements.at(-1);
			const hasRest = t.isRestElement(last);
			let consumed = 0;
			if (isLexicalPatternDeclaration(owner, state)) {
				for (const [index, element] of pattern.elements.entries()) {
					if (hasRest && element === last) return undefined;
					const slot = array.items[index];
					const ownSlot = consumed === index && slot?.name === String(index) && slot.presence === "present";
					if (element !== null && !t.isIdentifier(element) && !(hasRest && owner.id === pattern && ownSlot && t.isAssignmentPattern(element) && t.isIdentifier(element.left) && semanticValueDefinitelyDefined(slot.value))) break;
					if (ownSlot) consumed += 1;
					else if (!hasRest) break;
				}
			}
			return {
				excludedKeys: [],
				startIndex: consumed
			};
		};
		semanticKnownArrayIterationAt = (node, state) => semanticKnownArrayIteration(evaluateSemanticExpression(node, state, node), state, node);
		semanticReferenceIterationUnknown = (source, state) => source.iterationSources?.some((iterable) => !selectedReferenceIterationKnown(iterable, state)) === true;
		selectedReferenceIterationKnown = (source, state) => {
			let values = [evaluateSemanticExpression(source.node, state, source.node)];
			for (const key of source.projection) {
				if (typeof key === "object" && key !== null) return false;
				const selected = new Set();
				for (const value of values) {
					if (key === null) {
						if (!semanticKnownArrayIteration(value, state, source.node) || value.unknownItems) return false;
						for (const slot of value.items) {
							if (slot.presence !== "present") return false;
							selected.add(slot.value);
						}
					} else {
						const slot = semanticSlotAtPath(value, [String(key)]);
						if (slot.presence !== "present") return false;
						selected.add(slot.value);
					}
				}
				values = [...selected];
			}
			return values.every((value) => semanticKnownArrayIteration(value, state, source.node));
		};
		semanticReferenceSourcesInactive = (reference, state) => reference.requiredSources?.some((source) => !semanticReferenceIterationUnknown(source, state) && semanticSelectedReferenceSlot(source, state, source.node)?.presence === "absent") === true || reference.fallbackSources?.some((source) => {
			const slot = semanticSelectedReferenceSlot(source, state, source.node);
			return !semanticReferenceIterationUnknown(source, state) && slot?.presence === "present" && semanticValueDefinitelyDefined(slot.value);
		}) === true;
		semanticSelectedReferenceSlot = (source, state, capturePoint) => {
			const path = [];
			for (const key of source.projection) {
				if (key === null || typeof key === "object") return undefined;
				path.push(String(key));
			}
			return semanticSlotAtPath(evaluateSemanticExpression(source.node, state, capturePoint), path);
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticGetterResultWalker.js
var resultBranches, evaluatesInOuterThis, GetterResultWalker, expandSemanticGetterResult;
function init_javascriptSemanticGetterResultWalker() {
	return (init_javascriptSemanticGetterResultWalker = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticCallableResults();
		init_javascriptSemanticMutationInitializers();
		init_javascriptSemanticReferenceSources();
		init_javascriptSemanticState();
		init_javascriptSemanticGetterQueries();
		resultBranches = (node) => {
			if (t.isConditionalExpression(node)) return [node.consequent, node.alternate];
			if (t.isLogicalExpression(node)) return [node.left, node.right];
			if (t.isSequenceExpression(node)) {
				const last = node.expressions.at(-1);
				return last === undefined ? [] : [last];
			}
			if (t.isAssignmentExpression(node)) {
				if (node.operator === "=") return [node.right];
				if ([
					"&&=",
					"||=",
					"??="
				].includes(node.operator)) return [node.left, node.right];
			}
			return undefined;
		};
		evaluatesInOuterThis = (owner, child) => t.isClass(owner) && child === owner.superClass || javaScriptDefinitionExpression(owner, child);
		GetterResultWalker = class {
			job;
			query;
			resolvers;
			#pending = [];
			#aliases = new Map();
			#scope;
			constructor(job, query, resolvers, roots = semanticCallableResultExpressions(job.invocation.getter)) {
				this.job = job;
				this.query = query;
				this.resolvers = resolvers;
				for (const { node } of roots) if (node !== null) this.#enqueue(() => ({
					node,
					path: job.path
				}));
				this.#scope = query.state.scopeByNode.get(job.invocation.getter)?.scopeId;
			}
			run() {
				for (let cursor = 0; cursor < this.#pending.length; cursor++) {
					const current = this.#pending[cursor];
					if (current !== undefined) this.#visit(current);
				}
			}
			#enqueue(create) {
				if (!this.query.reserveResult()) return;
				const work = create();
				this.#pending.push(this.query.widening ? {
					...work,
					path: [],
					escapes: true,
					...work.privateRead === undefined ? {} : { privateRead: {
						...work.privateRead,
						path: []
					} }
				} : work);
			}
			#retain(current, reference) {
				this.query.retain(reference, current.escapes || this.job.escapes);
			}
			#privateRead(current) {
				if (current.privateRead !== undefined) this.#retain(current, {
					node: current.privateRead.node,
					path: current.escapes ? [] : current.privateRead.path
				});
			}
			#localBinding(expression) {
				const state = this.query.state;
				const binding = resolveSemanticBindingState(state, expression, expression.name);
				let scope = binding === undefined ? undefined : state.scopesById.get(binding.scopeId);
				while (scope !== undefined && scope.scopeId !== this.#scope) {
					if (scope.kind === "function" || scope.parentScopeId === null) return undefined;
					scope = state.scopesById.get(scope.parentScopeId);
				}
				return scope !== undefined && binding?.referenceInitializers.every((initializer) => initializer.copyKind === undefined) ? binding : undefined;
			}
			#cycle(current, identity) {
				for (let visit = current.aliases; visit !== undefined; visit = visit.parent) if (visit.identity === identity) return visit;
				return undefined;
			}
			#alias(current, expression) {
				const binding = this.#localBinding(expression);
				if (binding === undefined) return false;
				const identity = JSON.stringify([
					binding.bindingId,
					expression.start,
					expression.end
				]);
				const previous = this.#cycle(current, identity);
				if (previous !== undefined) {
					if (current.path.length > previous.pathLength && !current.escapes) this.#enqueue(() => ({
						...current,
						path: [],
						aliases: undefined,
						escapes: true
					}));
					return true;
				}
				const key = JSON.stringify([
					current.path,
					current.privateRead?.name,
					current.privateRead?.path,
					current.escapes
				]);
				const known = this.#aliases.get(identity) ?? new Set();
				if (!known.has(key)) {
					known.add(key);
					this.#aliases.set(identity, known);
					this.#aliasOrigins(current, expression, binding, identity);
				}
				return true;
			}
			#aliasOrigins(current, expression, binding, identity) {
				const state = this.query.state;
				const { binding: origins } = semanticBindingAtRead(binding, expression, state);
				const aliases = {
					identity,
					pathLength: current.path.length,
					...current.aliases === undefined ? {} : { parent: current.aliases }
				};
				for (const initializer of [...origins.initializers, ...origins.referenceInitializers.filter((origin) => !semanticReferenceSourcesInactive(origin, state))]) this.#enqueue(() => ({
					...current,
					node: initializer.node,
					path: [...initializer.projection, ...current.path],
					aliases
				}));
			}
			#ownsThis(expression) {
				const parents = this.query.state.parentsByNode;
				let child = expression;
				let owner = parents.get(child);
				while (owner !== undefined) {
					if (evaluatesInOuterThis(owner, child)) {
						const body = parents.get(owner);
						child = t.isClassBody(body) ? parents.get(body) : owner;
					} else if (t.isClass(owner) || t.isFunction(owner) && !t.isArrowFunctionExpression(owner)) break;
					else child = owner;
					owner = parents.get(child);
				}
				return owner === this.job.invocation.getter;
			}
			#privateValue(current, owner) {
				const read = current.privateRead;
				if (read === undefined) return;
				const { getter, receiver = owner } = this.job.invocation;
				const isStatic = t.isClassMethod(getter) && getter.static;
				if (!t.isClass(receiver) || !this.resolvers.privateReceiver(receiver, owner, current.path, isStatic)) {
					this.#privateRead(current);
					return;
				}
				for (const member of owner.body.body) if (t.isClassPrivateProperty(member) && member.static === isStatic && member.key.id.name === read.name && member.value != null) this.#retain(current, {
					node: member.value,
					path: current.escapes ? [] : read.path
				});
			}
			#thisValue(current, expression) {
				if (!this.#ownsThis(expression)) return;
				const { getter, owner, receiver = owner } = this.job.invocation;
				if (current.privateRead !== undefined && t.isClass(owner)) {
					this.#privateValue(current, owner);
					return;
				}
				const references = t.isClass(receiver) ? this.resolvers.classReferences({
					owner: receiver,
					kind: t.isClassMethod(getter) && getter.static ? "static" : "instance"
				}, current.path, current.escapes || this.job.escapes) : this.resolvers.objectReferences(receiver, current.path);
				for (const reference of references) this.#retain(current, reference);
			}
			#superValue(current, expression) {
				const { getter, owner, receiver = owner } = this.job.invocation;
				if (!t.isSuper(expression.object) || !t.isClass(owner) || owner.superClass == null) return false;
				const key = semanticStaticPropertyKey(expression.property, expression.computed);
				for (const base of this.resolvers.bases(owner.superClass)) for (const reference of this.resolvers.classReferences({
					owner: base,
					receiver: t.isClass(receiver) ? receiver : owner,
					kind: t.isClassMethod(getter) && getter.static ? "static" : "prototype"
				}, [key, ...current.path], current.escapes || this.job.escapes)) this.#retain(current, reference);
				return true;
			}
			#member(current, expression) {
				if (current.privateRead !== undefined && t.isPrivateName(expression.property)) {
					this.#privateRead(current);
					return;
				}
				if (t.isPrivateName(expression.property) && t.isClass(this.job.invocation.owner)) {
					const name = expression.property.id.name;
					this.#enqueue(() => ({
						...current,
						node: expression.object,
						path: [],
						privateRead: {
							node: expression,
							name,
							path: current.path
						}
					}));
					return;
				}
				if (!this.#superValue(current, expression)) this.#enqueue(() => ({
					...current,
					node: expression.object,
					path: [semanticStaticPropertyKey(expression.property, expression.computed), ...current.path]
				}));
			}
			#visit(current) {
				const expression = unwrapJavaScriptExpression(current.node).node;
				if (t.isIdentifier(expression) && this.#alias(current, expression)) return;
				if (t.isForOfStatement(expression)) {
					this.#enqueue(() => ({
						...current,
						node: expression.right,
						path: [null, ...current.path]
					}));
					return;
				}
				if (t.isThisExpression(expression) || t.isSuper(expression)) this.#thisValue(current, expression);
				else if (t.isMemberExpression(expression) || t.isOptionalMemberExpression(expression)) this.#member(current, expression);
				else {
					const branches = resultBranches(expression);
					if (branches !== undefined) for (const node of branches) this.#enqueue(() => ({
						...current,
						node
					}));
					else if (current.privateRead !== undefined) this.#privateRead(current);
					else if (current.path.length > 0 && (t.isObjectExpression(expression) || t.isArrayExpression(expression)) && this.resolvers.containerReferences !== undefined) {
						for (const reference of this.resolvers.containerReferences(expression, current.path)) this.#enqueue(() => ({
							...current,
							node: reference.node,
							path: reference.path
						}));
					} else this.#retain(current, {
						node: expression,
						path: current.path
					});
				}
			}
		};
		expandSemanticGetterResult = (job, query, resolvers) => new GetterResultWalker(job, query, resolvers).run();
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticObjectReferences.js
var semanticClassCandidates, instanceFieldReferences, classPropertyDescriptors, semanticClassPropertyReferences, semanticClassAccessorReferences, ClassReferenceWalk, classPropertyReferences, objectReceiverReference, privateReceiverProjection, expandGetterResult, isObjectPrototypeSetter, propertyIndexes, objectPropertyIndex, relevantPropertiesInReverse, semanticObjectPropertyReferences, semanticObjectAccessorReferences, ObjectReferenceWalk, objectPropertyReferences, objectExpressionDefinedKeys, semanticArrayPropertyReferences, semanticNativePrototypeChain;
function init_javascriptSemanticObjectReferences() {
	return (init_javascriptSemanticObjectReferences = __esmMin((() => {
		init_javascriptSemanticPropertyKeys();
		init_javascriptSemanticState();
		init_javascriptAstValues();
		init_javascriptSemanticPropertyPaths();
		init_unicodeCodePointOrder();
		init_javascriptSemanticArrayLayout();
		init_javascriptSemanticGetterQueries();
		init_javascriptSemanticGetterResultWalker();
		semanticClassCandidates = (root, state) => {
			const pending = [root];
			const seenNodes = new Set();
			const seenBindings = new Set();
			const classes = [];
			for (let cursor = 0; cursor < pending.length; cursor++) {
				const node = pending[cursor];
				if (node === undefined) continue;
				const expression = unwrapJavaScriptExpression(node).node;
				if (seenNodes.has(expression)) continue;
				seenNodes.add(expression);
				if (t.isClass(expression)) {
					classes.push(expression);
				} else if (t.isIdentifier(expression)) {
					const binding = resolveSemanticBindingState(state, expression, expression.name);
					if (binding === undefined || seenBindings.has(binding.bindingId)) continue;
					seenBindings.add(binding.bindingId);
					for (const initializer of binding.initializers) pending.push(initializer.node);
				} else if (t.isConditionalExpression(expression) || t.isLogicalExpression(expression)) {
					pending.push(t.isConditionalExpression(expression) ? expression.consequent : expression.left, t.isConditionalExpression(expression) ? expression.alternate : expression.right);
				} else if (t.isSequenceExpression(expression)) {
					const last = expression.expressions.at(-1);
					if (last !== undefined) pending.push(last);
				}
			}
			return classes;
		};
		instanceFieldReferences = (root, propertyName, path, state, initializedBefore) => {
			const references = [];
			const pending = [{
				klass: root,
				excluded: new Set()
			}];
			const selections = new Map();
			let definiteNames;
			for (let cursor = 0; cursor < pending.length; cursor++) {
				const current = pending[cursor];
				if (current === undefined) continue;
				const previous = selections.get(current.klass);
				const excluded = previous === undefined ? current.excluded : new Set([...previous].filter((name) => current.excluded.has(name)));
				if (previous !== undefined && previous.size === excluded.size) continue;
				selections.set(current.klass, excluded);
				const shadowed = new Set(excluded);
				const before = initializedBefore === undefined ? -1 : current.klass.body.body.indexOf(initializedBefore);
				const members = before < 0 ? current.klass.body.body : current.klass.body.body.slice(0, before);
				for (const member of [...members].reverse()) {
					if (!isRuntimeJavaScriptClassProperty(member) || member.static) continue;
					if (propertyName !== null && member.computed && semanticKnownSymbolKey(member.key, state)) continue;
					const key = semanticStaticPropertyKey(member.key, member.computed);
					if (key !== null && shadowed.has(key)) continue;
					if (key !== null) shadowed.add(key);
					if ((propertyName === null || key === null || key === propertyName) && member.value != null) references.push({
						node: member.value,
						path
					});
				}
				const bases = current.klass.superClass == null ? [] : semanticClassCandidates(current.klass.superClass, state);
				if (bases.length === 0) definiteNames = definiteNames === undefined ? shadowed : new Set([...definiteNames].filter((name) => shadowed.has(name)));
				for (const klass of bases) pending.push({
					klass,
					excluded: shadowed
				});
			}
			return {
				references,
				definiteNames: definiteNames ?? new Set()
			};
		};
		classPropertyDescriptors = (klass, propertyName, kind, state, initializedBefore, accessor = "get") => {
			const fields = [];
			const methods = [];
			const accessors = [];
			const definitions = [];
			const before = initializedBefore === undefined ? -1 : klass.body.body.indexOf(initializedBefore);
			for (const [index, member] of klass.body.body.entries()) {
				if (!t.isClassMethod(member) && !(kind === "static" && isRuntimeJavaScriptClassProperty(member)) || member.static !== (kind === "static") || before >= 0 && isRuntimeJavaScriptClassProperty(member) && index >= before || propertyName !== null && member.computed && semanticKnownSymbolKey(member.key, state)) continue;
				definitions.push(member);
			}
			const ordered = [...definitions.filter((member) => t.isClassMethod(member)), ...definitions.filter((member) => t.isClassProperty(member))];
			const data = new Set();
			const getterNames = new Set();
			const setterNames = new Set();
			let inherits = true;
			for (const member of ordered.reverse()) {
				const key = semanticStaticPropertyKey(member.key, member.computed);
				if (propertyName !== null && key !== null && key !== propertyName) continue;
				if (propertyName !== null && key === propertyName) inherits = false;
				const descriptor = t.isClassMethod(member) && (member.kind === "get" || member.kind === "set") ? member.kind : "data";
				const selected = key ?? propertyName;
				if (selected !== null && (data.has(selected) || (descriptor === "data" ? getterNames.has(selected) || setterNames.has(selected) : (descriptor === "get" ? getterNames : setterNames).has(selected)))) {
					if (descriptor === "data" && key !== null) data.add(key);
					continue;
				}
				if (t.isClassProperty(member)) fields.push(member);
				else if (member.kind === "method") methods.push(member);
				else if (member.kind === accessor) accessors.push(member);
				if (key !== null) (descriptor === "data" ? data : descriptor === "get" ? getterNames : setterNames).add(key);
			}
			return {
				accessors,
				fields,
				methods,
				inherits
			};
		};
		semanticClassPropertyReferences = (lookup, selection, state) => {
			const query = new SemanticGetterQuery(state);
			return query.run(() => classPropertyReferences(lookup, selection, state, { query }), (job) => expandGetterResult(job, query));
		};
		semanticClassAccessorReferences = (lookup, key, state, accessor) => new ClassReferenceWalk(lookup, [key], state, {
			query: new SemanticGetterQuery(state),
			accessor
		}).run();
		ClassReferenceWalk = class {
			lookup;
			state;
			context;
			#references = [];
			#pending;
			#seen = new Set();
			#name;
			#path;
			#fields = new Set();
			constructor(lookup, selection, state, context) {
				this.lookup = lookup;
				this.state = state;
				this.context = context;
				const [key, ...path] = selection;
				this.#name = key == null || typeof key === "object" ? null : String(key);
				this.#path = path;
				this.#pending = [lookup.owner];
			}
			#instanceFields() {
				if (this.lookup.kind !== "instance") return false;
				const fields = instanceFieldReferences(this.lookup.owner, this.#name, this.#path, this.state, this.lookup.initializedBefore);
				if (this.context.accessor === undefined) for (const reference of fields.references) this.#references.push(reference);
				this.#fields = fields.definiteNames;
				return this.#name !== null && this.#fields.has(this.#name);
			}
			#getter(klass, getter) {
				const key = semanticStaticPropertyKey(getter.key, getter.computed);
				if (key !== null && this.#fields.has(key)) return;
				if (this.context.accessor !== undefined) {
					this.#references.push({
						node: getter,
						path: []
					});
					return;
				}
				this.context.query.schedule({
					getter,
					owner: klass,
					receiver: this.lookup.receiver ?? this.lookup.owner
				}, this.#path, this.context.escapes);
			}
			#visit(klass) {
				const descriptors = classPropertyDescriptors(klass, this.#name, this.lookup.kind, this.state, this.lookup.initializedBefore, this.context.accessor);
				for (const field of this.context.accessor === undefined ? descriptors.fields : []) if (field.value != null) this.#references.push({
					node: field.value,
					path: this.#path,
					...this.lookup.kind === "static" && klass !== this.lookup.owner ? { inherited: true } : {}
				});
				for (const getter of this.lookup.fieldsOnly ? [] : descriptors.accessors) this.#getter(klass, getter);
				if (this.context.accessor === undefined && !this.lookup.fieldsOnly) for (const method of descriptors.methods) {
					const name = semanticStaticPropertyKey(method.key, method.computed);
					if (name !== null && this.#fields.has(name)) continue;
					this.#references.push({
						node: method,
						path: this.#path
					});
				}
				if (descriptors.inherits && klass.superClass != null) for (const base of semanticClassCandidates(klass.superClass, this.state)) this.#pending.push(base);
			}
			run() {
				if (this.#instanceFields()) return this.#references;
				for (let cursor = 0; cursor < this.#pending.length; cursor++) {
					const klass = this.#pending[cursor];
					if (klass === undefined || this.#seen.has(klass)) continue;
					this.#seen.add(klass);
					this.#visit(klass);
				}
				return this.#references;
			}
		};
		classPropertyReferences = (lookup, selection, state, context) => new ClassReferenceWalk(lookup, selection, state, context).run();
		objectReceiverReference = (object, path, state) => {
			let current = object;
			const projection = [];
			while (true) {
				const parent = state.parentsByNode.get(current);
				if (parent !== undefined && javaScriptExpressionWrapperTarget(parent) === current) {
					current = parent;
					continue;
				}
				if (t.isVariableDeclarator(parent) && parent.init === current && t.isIdentifier(parent.id)) return [{
					node: parent.id,
					path: [...projection, ...path],
					ownerInitializer: current
				}];
				if (t.isAssignmentExpression(parent, { operator: "=" }) && parent.right === current && t.isIdentifier(parent.left)) return [{
					node: parent.left,
					path: [...projection, ...path],
					ownerInitializer: current
				}];
				if (t.isArrayExpression(parent)) {
					const slot = semanticArrayLiteralElementOwner(current, parent, state);
					if (slot === undefined) break;
					projection.unshift(slot.key);
					current = slot.array;
					continue;
				}
				if (t.isObjectProperty(parent) && parent.value === current) {
					projection.unshift(semanticStaticPropertyKey(parent.key, parent.computed));
					const container = state.parentsByNode.get(parent);
					if (t.isObjectExpression(container)) {
						current = container;
						continue;
					}
				}
				break;
			}
			return [{
				node: object,
				path
			}];
		};
		privateReceiverProjection = (receiver, owner, path, isStatic, state) => {
			if (path.some((key) => key === null || typeof key === "object")) return false;
			const pending = [{
				receiver,
				path: path.map((key) => ({ key: String(key) })),
				visits: new Map()
			}];
			const seen = new Set();
			const declaringClass = (field) => {
				const body = state.parentsByNode.get(field);
				return body === undefined ? undefined : state.parentsByNode.get(body);
			};
			for (let cursor = 0; cursor < pending.length; cursor++) {
				const current = pending[cursor];
				if (current === undefined) break;
				const [selection, ...remaining] = current.path;
				if (selection === undefined) {
					if (!isStatic || current.receiver === owner) return true;
					continue;
				}
				const origin = JSON.stringify([
					current.receiver.start,
					selection.key,
					selection.before?.start
				]);
				const previous = current.visits.get(origin);
				if (previous !== undefined && previous <= current.path.length) continue;
				const visits = new Map(current.visits).set(origin, current.path.length);
				const identity = JSON.stringify([current.receiver.start, current.path.map(({ key, before }) => [key, before?.start])]);
				if (seen.has(identity)) continue;
				seen.add(identity);
				const lookupOwner = selection.before === undefined ? current.receiver : declaringClass(selection.before);
				if (!t.isClass(lookupOwner)) continue;
				for (const reference of semanticClassPropertyReferences({
					owner: lookupOwner,
					receiver: current.receiver,
					kind: isStatic ? "static" : "instance",
					fieldsOnly: true,
					...selection.before === undefined ? {} : { initializedBefore: selection.before }
				}, [selection.key], state)) {
					const field = state.parentsByNode.get(reference.node);
					if (!t.isClassProperty(field)) continue;
					const fieldOwner = declaringClass(field);
					if (!t.isClass(fieldOwner)) continue;
					const projection = [];
					let value = unwrapJavaScriptExpression(reference.node).node;
					while (t.isMemberExpression(value) || t.isOptionalMemberExpression(value)) {
						const key = semanticStaticPropertyKey(value.property, value.computed);
						if (key === null || t.isPrivateName(value.property)) break;
						projection.unshift({
							key,
							before: field
						});
						value = unwrapJavaScriptExpression(value.object).node;
					}
					if (!t.isThisExpression(value)) continue;
					pending.push({
						receiver: isStatic ? fieldOwner : current.receiver,
						path: [...projection, ...remaining],
						visits
					});
				}
			}
			return false;
		};
		expandGetterResult = (job, query) => {
			const state = query.state;
			expandSemanticGetterResult(job, query, {
				classReferences: (lookup, path, escapes) => classPropertyReferences(lookup, path, state, {
					query,
					escapes
				}),
				objectReferences: (receiver, path) => objectReceiverReference(receiver, path, state),
				privateReceiver: (receiver, owner, path, isStatic) => privateReceiverProjection(receiver, owner, path, isStatic, state),
				bases: (node) => semanticClassCandidates(node, state)
			});
		};
		isObjectPrototypeSetter = (property, name = t.isSpreadElement(property) ? null : semanticStaticPropertyKey(property.key, property.computed)) => t.isObjectProperty(property) && !property.computed && !property.shorthand && name === "__proto__";
		propertyIndexes = new WeakMap();
		objectPropertyIndex = (node) => {
			const cached = propertyIndexes.get(node);
			if (cached !== undefined) return cached;
			const keyIndependent = [];
			const byName = new Map();
			node.properties.forEach((property, index) => {
				const name = t.isSpreadElement(property) ? null : semanticStaticPropertyKey(property.key, property.computed);
				if (name === null || isObjectPrototypeSetter(property, name)) {
					keyIndependent.push(index);
					return;
				}
				const positions = byName.get(name);
				if (positions === undefined) byName.set(name, [index]);
				else positions.push(index);
			});
			const index = {
				keyIndependent,
				byName
			};
			propertyIndexes.set(node, index);
			return index;
		};
		relevantPropertiesInReverse = (node, key) => {
			if (typeof key !== "string" && typeof key !== "number") return [...node.properties].reverse();
			const { keyIndependent, byName } = objectPropertyIndex(node);
			const named = byName.get(String(key)) ?? [];
			const relevant = [];
			let left = keyIndependent.length - 1;
			let right = named.length - 1;
			while (left >= 0 || right >= 0) {
				const fromLeft = right < 0 || left >= 0 && (keyIndependent[left] ?? -1) > (named[right] ?? -1);
				const position = fromLeft ? keyIndependent[left--] : named[right--];
				const property = position === undefined ? undefined : node.properties[position];
				if (property !== undefined) relevant.push(property);
			}
			return relevant;
		};
		semanticObjectPropertyReferences = (node, path, state) => {
			const query = new SemanticGetterQuery(state);
			return query.run(() => objectPropertyReferences(node, path, query), (job) => expandGetterResult(job, query));
		};
		semanticObjectAccessorReferences = (node, key, state, accessor, lookup = "prototype") => new ObjectReferenceWalk(node, [key], new SemanticGetterQuery(state), accessor, lookup).run();
		ObjectReferenceWalk = class {
			node;
			query;
			accessor;
			accessorLookup;
			#references = [];
			#overwritten = new Set();
			#data = new Set();
			#accessors = new Set();
			#getters = new Set();
			#setters = new Set();
			#key;
			#remaining;
			constructor(node, path, query, accessor, accessorLookup = "prototype") {
				this.node = node;
				this.query = query;
				this.accessor = accessor;
				this.accessorLookup = accessorLookup;
				const [key, ...remaining] = path;
				this.#key = typeof key === "number" ? String(key) : key;
				this.#remaining = remaining;
			}
			#spreadKey() {
				const selected = this.#key ?? null;
				return typeof selected !== "object" ? selected : {
					...selected,
					excludedKeys: [...new Set([...selected?.excludedKeys ?? [], ...this.#overwritten])].sort(compareUnicodeCodePoints)
				};
			}
			#spread(property) {
				const selected = this.#key ?? null;
				if (this.accessor === undefined && (typeof selected === "object" || !this.#overwritten.has(String(selected)))) this.#references.push({
					node: property.argument,
					path: [this.#spreadKey(), ...this.#remaining],
					capturedSelectionAt: property.argument,
					ownEnumerable: true
				});
				if (t.isObjectExpression(property.argument)) for (const name of objectExpressionDefinedKeys(property.argument)) {
					this.#overwritten.add(name);
					this.#data.add(name);
				}
			}
			#prototype(property, name) {
				if (!isObjectPrototypeSetter(property, name)) return false;
				const selected = this.#key ?? null;
				if (this.accessor !== undefined && this.accessorLookup === "own") return true;
				if (t.isExpression(property.value) && (selected === null || typeof selected === "object" || typeof selected === "string" && !objectExpressionDefinedKeys(this.node).has(selected))) this.#references.push({
					node: property.value,
					path: [selected, ...this.#remaining],
					inherited: true
				});
				return true;
			}
			#read(property, name) {
				if (name === null && this.#key != null && typeof this.#key !== "object" && (t.isObjectMethod(property) && property.kind === (this.accessor ?? "get") ? this.#data.has(String(this.#key)) || (this.accessor === "set" ? this.#setters : this.#getters).has(String(this.#key)) : this.#overwritten.has(String(this.#key)))) return;
				if (name !== null && !semanticPropertyPathKeyMatches(this.#key ?? null, name)) return;
				if (this.accessor !== undefined) {
					if (t.isObjectMethod(property) && property.kind === this.accessor) this.#references.push({
						node: property,
						path: []
					});
					return;
				}
				if (t.isObjectMethod(property)) {
					if (property.kind === "get") this.query.schedule({
						getter: property,
						owner: this.node
					}, this.#remaining);
					if (property.kind === "get" || property.kind === "set") return;
				}
				this.#references.push({
					node: t.isObjectProperty(property) ? property.value : property,
					path: this.#remaining
				});
			}
			#record(name, kind) {
				this.#overwritten.add(name);
				if (kind === "data") this.#data.add(name);
				else {
					this.#accessors.add(name);
					(kind === "get" ? this.#getters : this.#setters).add(name);
				}
			}
			#visit(property) {
				if (t.isSpreadElement(property)) {
					this.#spread(property);
					return;
				}
				if (property.computed && this.#key !== undefined && this.#key !== null && typeof this.#key !== "object" && semanticKnownSymbolKey(property.key, this.query.state)) return;
				const name = semanticStaticPropertyKey(property.key, property.computed);
				if (this.#prototype(property, name)) return;
				const kind = t.isObjectMethod(property) && property.kind !== "method" ? property.kind : "data";
				if (name !== null && (kind === "data" ? this.#data.has(name) || this.#accessors.has(name) : this.#data.has(name) || (kind === "get" ? this.#getters : this.#setters).has(name))) {
					if (kind === "data") this.#data.add(name);
					return;
				}
				this.#read(property, name);
				if (name !== null) this.#record(name, kind);
			}
			run() {
				for (const property of relevantPropertiesInReverse(this.node, this.#key)) this.#visit(property);
				return this.#references;
			}
		};
		objectPropertyReferences = (node, path, query) => new ObjectReferenceWalk(node, path, query).run();
		objectExpressionDefinedKeys = (root) => {
			const pending = [root];
			const seen = new Set();
			const names = new Set();
			for (let cursor = 0; cursor < pending.length; cursor++) {
				const object = pending[cursor];
				if (object === undefined || seen.has(object)) continue;
				seen.add(object);
				for (const property of object.properties) {
					if (t.isSpreadElement(property)) {
						if (t.isObjectExpression(property.argument)) pending.push(property.argument);
						continue;
					}
					const name = semanticStaticPropertyKey(property.key, property.computed);
					if (name !== null && !isObjectPrototypeSetter(property, name)) names.add(name);
				}
			}
			return names;
		};
		semanticArrayPropertyReferences = (node, path, state) => {
			const [key, ...remaining] = path;
			const selected = key ?? null;
			const selectedIndex = typeof selected === "object" ? null : semanticArrayIndex(selected);
			if (typeof selected !== "object" && selectedIndex === null) return [];
			const references = [];
			let minimumIndex = 0;
			let uncertainIndex = false;
			for (const part of semanticArrayLiteralLayout(node, state)) {
				if (part.kind === "opaque-spread") {
					if (selectedIndex === null || selectedIndex >= minimumIndex) {
						let sourceKey = null;
						if (!uncertainIndex) {
							if (selectedIndex !== null) sourceKey = selectedIndex - minimumIndex;
							else if (selected !== null && typeof selected === "object") sourceKey = {
								excludedKeys: selected.excludedKeys.flatMap((name) => {
									const index = semanticArrayIndex(name);
									return index === null || index < minimumIndex ? [] : [String(index - minimumIndex)];
								}),
								startIndex: Math.max(0, (selected.startIndex ?? 0) - minimumIndex)
							};
						}
						references.push({
							node: part.argument,
							path: [sourceKey, ...remaining],
							capturedSelectionAt: part.argument,
							iterableFallbackPath: []
						});
					}
					uncertainIndex = true;
					continue;
				}
				const { element } = part;
				if (element !== null && (uncertainIndex ? selectedIndex === null || selectedIndex >= minimumIndex : semanticPropertyPathKeyMatches(selected, String(minimumIndex)))) references.push({
					node: element,
					path: remaining
				});
				minimumIndex++;
			}
			return references;
		};
		semanticNativePrototypeChain = (node, key, state) => {
			const exact = key !== null && typeof key !== "object" ? String(key) : undefined;
			if (t.isArrayExpression(node)) {
				if (exact === "length") return [];
				if (exact !== undefined) {
					const sources = semanticArrayPropertyReferences(node, [exact], state);
					if (sources.length > 0 && sources.every((source) => source.capturedSelectionAt === undefined)) return [];
				}
				return ["Array", "Object"];
			}
			if (exact !== undefined && objectExpressionDefinedKeys(node).has(exact)) return [];
			for (const property of node.properties) {
				if (!isObjectPrototypeSetter(property)) continue;
				const prototype = unwrapJavaScriptExpression(property.value).node;
				if (t.isNullLiteral(prototype) || t.isObjectExpression(prototype) || t.isArrayExpression(prototype) || t.isFunctionExpression(prototype) || t.isArrowFunctionExpression(prototype) || t.isClassExpression(prototype) || t.isRegExpLiteral(prototype) || t.isNewExpression(prototype)) return [];
			}
			return ["Object"];
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticProjectedSources.js
function semanticProjectedSourceFactsAtRead(...arguments_) {
	return projectedSourceFactsAtRead(...arguments_);
}
var semanticNormalizeCapturedSelections, semanticShiftCapturedSelections, semanticCapturedSelectionsAfterPropertyRead, hasFreshProjectedReceiver, semanticProjectedSourcesAtRead, semanticProjectedSourceEligibilityAtRead, projectedSourceFactsAtRead;
function init_javascriptSemanticProjectedSources() {
	return (init_javascriptSemanticProjectedSources = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticObjectReferences();
		init_javascriptSemanticMutationInitializers();
		init_javascriptSemanticEffectLog();
		init_javascriptSemanticReferenceSources();
		init_javascriptSemanticCopiedReferencePaths();
		init_javascriptSemanticIterationSources();
		init_javascriptSemanticAliasSelections();
		semanticNormalizeCapturedSelections = (selections, pathLength) => {
			const byDepth = new Map();
			for (const capture of selections ?? []) if (capture.depth > 0 && (pathLength === undefined || capture.depth <= pathLength)) byDepth.set(capture.depth, capture);
			const normalized = [...byDepth.values()].sort((left, right) => left.depth - right.depth);
			return normalized.length ? normalized : undefined;
		};
		semanticShiftCapturedSelections = (selections, delta) => {
			const shifted = selections?.flatMap((selection) => selection.depth + delta > 0 ? [{
				...selection,
				depth: selection.depth + delta
			}] : []);
			return semanticNormalizeCapturedSelections(shifted);
		};
		semanticCapturedSelectionsAfterPropertyRead = (selections, source) => [...semanticShiftCapturedSelections(selections, source.path.length - 1) ?? [], ...source.capturedSelectionAt === undefined ? [] : [{
			at: source.capturedSelectionAt,
			depth: source.path.length,
			...source.ownEnumerable ? { ownEnumerable: true } : {}
		}]];
		hasFreshProjectedReceiver = (root, path, state) => {
			const pending = [{
				node: root,
				path
			}];
			const examined = new WeakMap();
			let selections = 0;
			while (pending.length > 0) {
				const current = pending.pop();
				const node = unwrapJavaScriptExpression(current.node).node;
				const key = JSON.stringify(current.path);
				const paths = examined.get(node) ?? new Set();
				if (paths.has(key)) return false;
				paths.add(key);
				examined.set(node, paths);
				if (++selections > state.precision.alias_selections) {
					state.valueResourceLimits.add("alias-selections");
					return false;
				}
				if (current.path.length === 0) {
					if (!t.isObjectExpression(node) && !t.isArrayExpression(node) && !t.isFunction(node) && !t.isClassExpression(node)) return false;
					continue;
				}
				const [selected, ...remaining] = current.path;
				const sources = t.isObjectExpression(node) ? semanticObjectPropertyReferences(node, [selected], state) : t.isArrayExpression(node) ? semanticArrayPropertyReferences(node, [selected], state) : [];
				if (sources.length === 0) return false;
				if (selections + pending.length + sources.length > state.precision.alias_selections) {
					state.valueResourceLimits.add("alias-selections");
					return false;
				}
				pending.push(...sources.map((source) => ({
					node: source.node,
					path: [...source.path, ...remaining]
				})));
			}
			return true;
		};
		semanticProjectedSourcesAtRead = (...arguments_) => semanticProjectedSourceFactsAtRead(...arguments_)?.sources;
		semanticProjectedSourceEligibilityAtRead = (binding, reference, path, state, memberReadAt = reference, capturedSelections = []) => projectedSourceFactsAtRead(binding, reference, path, state, false, memberReadAt, capturedSelections, true)?.sources;
		projectedSourceFactsAtRead = (binding, reference, path, state, includeUnknown, memberReadAt = reference, capturedSelections = [], retainEligibility = false, valueEscapesHideSources = true) => {
			const read = semanticBindingAtRead(binding, reference, state);
			const captured = [...read.binding.initializers, ...read.binding.referenceInitializers];
			const normalizedCaptures = semanticNormalizeCapturedSelections(capturedSelections, path.length);
			const captureForDepth = (depth) => normalizedCaptures?.find((capture) => capture.depth >= depth)?.at;
			const selectedAt = (depth) => captureForDepth(depth) ?? memberReadAt;
			const { writes, replaced, superseded, escapeMayPrecede } = semanticBindingMemberWritesObservedAt(state, binding, path, {
				at: selectedAt,
				capturedAt: normalizedCaptures === undefined ? undefined : captureForDepth,
				captured
			}, hasFreshProjectedReceiver);
			if (includeUnknown && valueEscapesHideSources && escapeMayPrecede()) return undefined;
			const sources = [];
			const sourceKeys = new WeakMap();
			const captureIds = new WeakMap();
			let nextCaptureId = 0;
			const appendSource = (source) => {
				const captures = semanticNormalizeCapturedSelections(source.capturedSelections)?.map(({ at, depth, ownEnumerable }) => {
					let id = captureIds.get(at);
					if (id === undefined) {
						id = nextCaptureId++;
						captureIds.set(at, id);
					}
					return [
						id,
						depth,
						ownEnumerable
					];
				});
				const key = JSON.stringify([source.path, captures]);
				const keys = sourceKeys.get(source.node) ?? new Set();
				if (keys.has(key)) return;
				keys.add(key);
				sourceKeys.set(source.node, keys);
				sources.push(source);
			};
			for (const effect of writes) {
				if (!retainEligibility && superseded(effect)) continue;
				if (!t.isAssignmentExpression(effect.node) || ![
					"=",
					"||=",
					"&&=",
					"??="
				].includes(effect.node.operator)) {
					if (includeUnknown) return undefined;
					continue;
				}
				if (effect.assignedSources === undefined) {
					if (includeUnknown) return undefined;
					continue;
				}
				const remaining = path.slice(effect.path.length);
				for (const source of effect.assignedSources) {
					if (semanticReferenceIterationUnknown(source, state)) return undefined;
					if (semanticReferenceSourcesInactive(source, state)) continue;
					const [key, ...suffix] = remaining;
					for (const choice of key === undefined ? [undefined] : semanticAliasSelectionChoices(key)) {
						const selection = semanticStoredSourceSelection(source, choice === undefined ? [] : [choice]);
						if (selection !== null) appendSource({
							node: source.node,
							path: [...selection.projection, ...suffix],
							...selection.capturedSelectionDepth === undefined ? {} : { capturedSelections: [{
								at: source.node,
								depth: selection.capturedSelectionDepth,
								...selection.ownEnumerable ? { ownEnumerable: true } : {}
							}] }
						});
					}
				}
			}
			const storedSources = [...sources];
			if (!retainEligibility && replaced) return {
				sources,
				storedSources,
				retainsOrigin: false
			};
			for (const initializer of read.binding.initializers) {
				if (semanticReferenceIterationUnknown(initializer, state)) return undefined;
				if (semanticReferenceSourcesInactive(initializer, state)) continue;
				appendSource({
					node: initializer.node,
					path: [...initializer.projection, ...path]
				});
			}
			for (const initializer of read.binding.referenceInitializers) {
				if (semanticReferenceIterationUnknown(initializer, state)) return undefined;
				if (semanticReferenceSourcesInactive(initializer, state)) continue;
				const [key, ...suffix] = path;
				for (const choice of key === undefined ? [undefined] : semanticAliasSelectionChoices(key)) {
					const projection = semanticCopiedReferencePath(initializer, choice === undefined ? [] : [choice], "identity");
					if (projection !== null) appendSource({
						node: initializer.node,
						path: [...projection, ...suffix],
						capturedSelections: initializer.copyProjectionOffset === undefined ? [] : [{
							at: initializer.node,
							depth: projection.length + suffix.length - path.length + 1,
							...initializer.copyKind === "object-rest" ? { ownEnumerable: true } : {}
						}]
					});
				}
			}
			return {
				sources,
				storedSources,
				retainsOrigin: true
			};
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticDirectInvocations.js
/**
* Arguments of a directly invoked source function expression. The callee's
* body is source code whose effects are indexed like any other, so an
* argument it can reach only through a plain parameter does not escape at
* the call: effect owners follow the parameter to the argument instead.
*/
var directInvocations, argumentsReaders, argumentsMayBeRead, FUNCTION_ARGUMENT_PROPERTIES, directCall, computeDirectInvocation, directInvocation, semanticArgumentStaysInSource, parameterArguments, semanticDirectInvocationArgument;
function init_javascriptSemanticDirectInvocations() {
	return (init_javascriptSemanticDirectInvocations = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticEffectRecord();
		init_javascriptSemanticTraversal();
		init_javascriptSourceParser();
		directInvocations = new WeakMap();
		argumentsReaders = new WeakMap();
		argumentsMayBeRead = (callee, state) => {
			let readers = argumentsReaders.get(state);
			if (readers === undefined) {
				const functions = new WeakSet();
				let functionProperties = false;
				traverseJavaScriptAst(state.program, { enter: (node) => {
					if ((t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) && FUNCTION_ARGUMENT_PROPERTIES.has(semanticStaticPropertyKey(node.property, node.computed) ?? "")) functionProperties = true;
					if (!t.isIdentifier(node, { name: "arguments" })) return;
					for (let current = state.parentsByNode.get(node); current !== undefined && !functions.has(current); current = state.parentsByNode.get(current)) if (t.isFunction(current)) functions.add(current);
				} });
				readers = {
					functions,
					functionProperties
				};
				argumentsReaders.set(state, readers);
			}
			return readers.functions.has(callee) || readers.functionProperties && javaScriptStrictnessAt(callee, state.parentsByNode) !== "strict";
		};
		FUNCTION_ARGUMENT_PROPERTIES = new Set(["arguments", "caller"]);
		directCall = (callee, parents) => {
			if (!t.isFunctionExpression(callee) && !t.isArrowFunctionExpression(callee)) return undefined;
			let call = parents.get(callee);
			while (call !== undefined && unwrapJavaScriptExpression(call).node === callee) call = parents.get(call);
			return t.isCallExpression(call) && unwrapJavaScriptExpression(call.callee).node === callee ? call : undefined;
		};
		computeDirectInvocation = (callee, state) => {
			const call = directCall(callee, state.parentsByNode);
			if (call === undefined) return undefined;
			if (call.arguments.length === 0) return {
				call,
				bound: []
			};
			const parameters = runtimeFunctionParameters(callee);
			const rest = parameters.findIndex((parameter) => t.isRestElement(parameter));
			if (parameters.some((parameter, index) => !t.isIdentifier(parameter) && index !== rest) || semanticDirectEvalRecorded(state) || argumentsMayBeRead(callee, state)) return undefined;
			const spread = call.arguments.findIndex((argument) => t.isSpreadElement(argument));
			const lastPosition = new Map();
			parameters.forEach((parameter, index) => {
				if (t.isIdentifier(parameter)) lastPosition.set(parameter.name, index);
			});
			const bound = call.arguments.map((_, index) => {
				if (spread >= 0 && index >= spread || rest >= 0 && index >= rest) return undefined;
				const parameter = parameters[index];
				if (!t.isIdentifier(parameter)) return null;
				return lastPosition.get(parameter.name) === index ? parameter : null;
			});
			return {
				call,
				bound
			};
		};
		directInvocation = (callee, state) => {
			if (!t.isFunction(callee)) return undefined;
			let byCallee = directInvocations.get(state);
			if (byCallee === undefined) {
				byCallee = new WeakMap();
				directInvocations.set(state, byCallee);
			}
			let cached = byCallee.get(callee);
			if (cached === undefined) {
				cached = computeDirectInvocation(callee, state) ?? null;
				byCallee.set(callee, cached);
			}
			return cached ?? undefined;
		};
		semanticArgumentStaysInSource = (call, index, state) => {
			if (!t.isCallExpression(call)) return false;
			const invocation = directInvocation(unwrapJavaScriptExpression(call.callee).node, state);
			return invocation?.call === call && invocation.bound[index] !== undefined;
		};
		parameterArguments = new WeakMap();
		semanticDirectInvocationArgument = (reference, binding, state) => {
			const cached = parameterArguments.get(binding);
			if (cached !== undefined) return cached ?? undefined;
			let argument;
			if (state.scopesById.get(binding.scopeId)?.kind === "function") for (let current = state.parentsByNode.get(reference); current !== undefined; current = state.parentsByNode.get(current)) {
				if (!t.isFunction(current) || state.scopeByNode.get(current)?.scopeId !== binding.scopeId) continue;
				const invocation = directInvocation(current, state);
				const index = invocation?.bound.findIndex((parameter) => parameter?.name === binding.name) ?? -1;
				const selected = invocation?.call.arguments[index];
				if (index >= 0 && t.isExpression(selected)) argument = selected;
				break;
			}
			parameterArguments.set(binding, argument ?? null);
			return argument;
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptIntrinsicInvocation.js
var unknownArrayIteration, expandJavaScriptInvocationArguments, arrayArguments, invocationArguments, javaScriptGenericInvocationMethod, javaScriptSourceInvocationContext, resolveJavaScriptGenericInvocation, resolveJavaScriptIntrinsicInvocation;
function init_javascriptIntrinsicInvocation() {
	return (init_javascriptIntrinsicInvocation = __esmMin((() => {
		init_javascriptAstValues();
		unknownArrayIteration = () => false;
		expandJavaScriptInvocationArguments = (arguments_, nativeArrayIteration = unknownArrayIteration) => {
			const expanded = [];
			const pending = [...arguments_].reverse();
			while (pending.length > 0) {
				const argument = pending.pop();
				if (argument === undefined) break;
				const array = t.isSpreadElement(argument) ? unwrapJavaScriptExpression(argument.argument).node : undefined;
				if (t.isArrayExpression(array) && nativeArrayIteration(array) && array.elements.every((element) => t.isExpression(element) || t.isSpreadElement(element))) for (let index = array.elements.length - 1; index >= 0; index -= 1) {
					const element = array.elements[index];
					if (element !== null && element !== undefined) pending.push(element);
				}
				else expanded.push(argument);
			}
			return expanded;
		};
		arrayArguments = (node, nativeArrayIteration) => {
			const array = node === undefined ? undefined : unwrapJavaScriptExpression(node).node;
			if (!t.isArrayExpression(array) || array.elements.some((element) => element === null)) return undefined;
			const expanded = expandJavaScriptInvocationArguments(array.elements.filter((element) => element !== null), nativeArrayIteration);
			return expanded.every((element) => t.isExpression(element)) ? expanded.filter((element) => t.isExpression(element)) : undefined;
		};
		invocationArguments = (method, arguments_, nativeArrayIteration) => t.isSpreadElement(arguments_?.[0]) ? undefined : method === "apply" ? arrayArguments(arguments_?.[1], nativeArrayIteration) : arguments_?.slice(1);
		javaScriptGenericInvocationMethod = (callee) => {
			const expression = unwrapJavaScriptExpression(callee).node;
			const method = t.isMemberExpression(expression) || t.isOptionalMemberExpression(expression) ? semanticStaticPropertyKey(expression.property, expression.computed) : undefined;
			return method === "call" || method === "apply" ? method : undefined;
		};
		javaScriptSourceInvocationContext = (node, nativeArrayIteration = unknownArrayIteration) => {
			const callee = unwrapJavaScriptExpression(node.callee).node;
			return {
				receiver: t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee) ? callee.object : undefined,
				arguments: expandJavaScriptInvocationArguments(node.arguments, nativeArrayIteration)
			};
		};
		resolveJavaScriptGenericInvocation = (method, context, nativeArrayIteration = unknownArrayIteration) => !t.isExpression(context.receiver) ? undefined : {
			callable: context.receiver,
			context: {
				receiver: context.arguments?.[0],
				...context.arguments === undefined || t.isSpreadElement(context.arguments[0]) ? { receiverUnknown: true } : {},
				arguments: invocationArguments(method, context.arguments, nativeArrayIteration)
			}
		};
		resolveJavaScriptIntrinsicInvocation = (node, intrinsicPath, boundIntrinsic, intrinsicReadChanged, nativeArrayIteration = unknownArrayIteration) => {
			const visited = new Set();
			let callee = t.isTaggedTemplateExpression(node) ? node.tag : node.callee;
			let arguments_ = t.isTaggedTemplateExpression(node) ? undefined : expandJavaScriptInvocationArguments(node.arguments, nativeArrayIteration);
			let receiver;
			let explicitReceiver = false;
			for (;;) {
				callee = unwrapJavaScriptExpression(callee).node;
				if (t.isSequenceExpression(callee)) {
					const finalExpression = callee.expressions.at(-1);
					if (finalExpression === undefined) return undefined;
					explicitReceiver = true;
					callee = finalExpression;
					continue;
				}
				if (visited.has(callee)) return undefined;
				visited.add(callee);
				let path = intrinsicPath(callee);
				if (path !== undefined && intrinsicReadChanged(callee, path)) return {
					kind: "opaque",
					path,
					arguments: undefined
				};
				if (path === undefined) {
					if (t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) {
						const method = semanticStaticPropertyKey(callee.property, callee.computed);
						if (method === "call" || method === "apply") {
							const bound = boundIntrinsic(callee.object);
							const callablePath = bound?.path ?? intrinsicPath(callee.object);
							if (callablePath !== undefined && intrinsicReadChanged(callee, [...callablePath, method])) return {
								kind: "opaque",
								path: callablePath,
								arguments: undefined
							};
							receiver = arguments_?.[0];
							explicitReceiver = true;
							callee = callee.object;
							arguments_ = invocationArguments(method, arguments_, nativeArrayIteration);
							continue;
						}
					}
					const bound = boundIntrinsic(callee);
					if (bound === undefined) return undefined;
					if (bound.kind === "opaque") return bound;
					path = bound.path;
					receiver = bound.receiver;
					explicitReceiver = true;
					arguments_ = bound.arguments === undefined ? undefined : [...bound.arguments, ...arguments_ ?? []];
				}
				const method = path.length > 3 ? path.at(-1) : undefined;
				if (method === "call" || method === "apply") {
					const callable = explicitReceiver ? receiver : t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee) ? callee.object : undefined;
					const selected = resolveJavaScriptGenericInvocation(method, {
						receiver: callable,
						arguments: arguments_
					}, nativeArrayIteration);
					if (selected === undefined) return {
						kind: "opaque",
						path,
						arguments: undefined
					};
					callee = selected.callable;
					receiver = selected.context.receiver;
					explicitReceiver = true;
					arguments_ = selected.context.arguments;
					continue;
				}
				if (path.join(".") === "intrinsic.Reflect.construct") {
					const callable = arguments_?.[0];
					if (!t.isExpression(callable)) return undefined;
					callee = callable;
					receiver = undefined;
					explicitReceiver = true;
					arguments_ = arrayArguments(arguments_?.[1], nativeArrayIteration);
					continue;
				}
				if (path.join(".") === "intrinsic.Reflect.apply") {
					const callable = arguments_?.[0];
					if (!t.isExpression(callable)) return undefined;
					callee = callable;
					receiver = arguments_?.[1];
					explicitReceiver = true;
					arguments_ = arrayArguments(arguments_?.[2], nativeArrayIteration);
					continue;
				}
				return {
					kind: "known",
					path,
					arguments: arguments_,
					...receiver === undefined ? {} : { receiver }
				};
			}
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptModuleInterop.js
var TO_ESM, COPY_PROPS, INTRINSICS, createSemanticModuleInterop, identityFunction, unprojectedInitializer, canonicalRoles, controlBodyOperation, ambientWriteInterops, semanticModuleInteropWithAmbientWrites;
function init_javascriptModuleInterop() {
	return (init_javascriptModuleInterop = __esmMin((() => {
		init_javascriptSemanticState();
		init_javascriptSemanticMutationInitializers();
		init_javascriptSemanticRequireOriginSlot();
		init_javascriptSemanticTraversal();
		init_javascriptElectronMemberWrites();
		init_javascriptIntrinsicInvocation();
		init_javascriptSemanticPropertyPaths();
		init_javascriptAstValues();
		init_javascriptSemanticReferenceSources();
		init_javascriptSemanticEffectLog();
		init_javascriptSemanticEffectRecord();
		TO_ESM = parseExpression(`(mod, isNodeMode, target) => (
  target = mod != null ? __create(__getProtoOf(mod)) : {},
  __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default")
    ? __defProp(target, "default", {value: mod, enumerable: true}) : target, mod)
)`);
		COPY_PROPS = parseExpression(`(to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function")
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
      key = keys[i];
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: ((k) => from[k]).bind(null, key),
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
  return to;
}`);
		INTRINSICS = {
			__create: ["Object", "create"],
			__getProtoOf: ["Object", "getPrototypeOf"],
			__defProp: ["Object", "defineProperty"],
			__getOwnPropNames: ["Object", "getOwnPropertyNames"],
			__getOwnPropDesc: ["Object", "getOwnPropertyDescriptor"],
			__hasOwnProp: [
				"Object",
				"prototype",
				"hasOwnProperty"
			]
		};
		createSemanticModuleInterop = (state, options) => {
			const nativeArrayIteration = (array) => semanticKnownArrayIterationAt(array, state);
			const helpers = new Map();
			const origins = new Map();
			const aliasTargets = new Map();
			const aliasChangedCache = new Map();
			const calls = new WeakMap();
			const intrinsicBindings = new Map();
			const writes = [];
			const invalidatedBindings = new Map();
			const invalidatedCalls = new WeakMap();
			const opaqueMutationPath = (node) => {
				let current = node;
				while (current !== undefined) {
					if (t.isFunction(current)) return ["opaque-intrinsic", semanticScopeId("function", current)];
					current = state.parentsByNode.get(current);
				}
				return ["intrinsic"];
			};
			const intrinsicPath = options?.intrinsicPath ?? ((node) => {
				let current = node;
				const visited = new Set();
				const pending = [];
				let suffix = [];
				const finish = (path) => {
					for (const binding of pending) intrinsicBindings.set(binding.id, path === undefined ? null : path.slice(0, path.length - binding.suffixLength));
					return path;
				};
				for (;;) {
					const { root, members } = electronMemberPath(current);
					if (members.some((member) => member === null)) return finish(undefined);
					suffix = [...members, ...suffix];
					for (const global of [
						"Object",
						"Function",
						"Reflect"
					]) if (isUnshadowedGlobal(root, state, global)) return finish([
						"intrinsic",
						global,
						...suffix
					]);
					for (const global of [
						"globalThis",
						"global",
						"window",
						"self"
					]) if (isUnshadowedGlobal(root, state, global)) return finish(["intrinsic", ...suffix]);
					if (!t.isIdentifier(root)) return finish(undefined);
					const binding = resolveSemanticBindingState(state, root, root.name);
					const cached = binding === undefined ? undefined : intrinsicBindings.get(binding.bindingId);
					if (cached !== undefined) return finish(cached === null ? undefined : [...cached, ...suffix]);
					const initializer = semanticStableInitializer(binding, state);
					if (binding === undefined || initializer === undefined || initializer.projection.some((segment) => segment === null) || visited.has(binding.bindingId)) return finish(undefined);
					visited.add(binding.bindingId);
					pending.push({
						id: binding.bindingId,
						suffixLength: suffix.length
					});
					suffix = [...initializer.projection.map(String), ...suffix];
					current = initializer.node;
				}
			});
			const capturedIntrinsic = (node) => {
				const path = intrinsicPath(node);
				if (path === undefined) return undefined;
				const visited = new Set();
				let current = node;
				let capturedAt = node;
				let suffixLength = 0;
				for (;;) {
					const { root, members } = electronMemberPath(current);
					suffixLength += members.length;
					if (!t.isIdentifier(root)) return undefined;
					const binding = resolveSemanticBindingState(state, root, root.name);
					if (binding === undefined) return {
						path,
						capturedAt
					};
					const initializer = semanticStableInitializer(binding, state);
					if (initializer === undefined || (initializer.node.end ?? Infinity) >= (root.start ?? -1) || visited.has(binding.bindingId)) return undefined;
					visited.add(binding.bindingId);
					if (suffixLength === 0) capturedAt = initializer.node;
					suffixLength += initializer.projection.length;
					current = initializer.node;
				}
			};
			const staticString = (node) => {
				if (node === undefined) return undefined;
				const visited = new Set();
				let current = node;
				for (;;) {
					const literal = readExactJavaScriptLiteral(current);
					if (literal.found) return typeof literal.value === "string" ? literal.value : undefined;
					const expression = unwrapJavaScriptExpression(current).node;
					if (!t.isIdentifier(expression)) return undefined;
					const binding = resolveSemanticBindingState(state, expression, expression.name);
					const initializer = semanticStableInitializer(binding, state);
					if (binding === undefined || initializer === undefined || initializer.projection.length !== 0 || (initializer.node.end ?? Infinity) >= (expression.start ?? -1) || visited.has(binding.bindingId)) return undefined;
					visited.add(binding.bindingId);
					current = initializer.node;
				}
			};
			const intrinsicReadChanged = (node, path, mayObserve) => {
				const capture = capturedIntrinsic(node)?.capturedAt ?? node;
				const scope = opaqueMutationPath(capture).join(".");
				const method = path.at(-1);
				const inherited = (method === "bind" || method === "call" || method === "apply") && !(method === "apply" && path.length === 3 && path[1] === "Reflect") ? [
					"intrinsic",
					"Function",
					"prototype",
					method
				] : undefined;
				return mayObserve?.(capture, path) === true || inherited !== undefined && mayObserve?.(capture, inherited) === true || writes.some((write) => (write.scope === scope || write.scope === "intrinsic") && write.offset < (capture.start ?? -1) && (write.coverage.covers(path) || inherited !== undefined && write.coverage.covers(inherited)));
			};
			const resolveBoundIntrinsic = (node, mayObserve) => {
				const visited = new Set();
				const argumentGroups = [];
				const bindReads = [];
				let opaqueArguments = false;
				let receiver;
				let current = node;
				for (;;) {
					current = unwrapJavaScriptExpression(current).node;
					if (t.isIdentifier(current)) {
						const binding = resolveSemanticBindingState(state, current, current.name);
						const initializer = semanticStableInitializer(binding, state);
						if (binding === undefined || initializer === undefined || initializer.projection.length !== 0 || (initializer.node.end ?? Infinity) >= (current.start ?? -1) || visited.has(binding.bindingId)) return undefined;
						visited.add(binding.bindingId);
						current = initializer.node;
						continue;
					}
					if (!t.isCallExpression(current)) return undefined;
					const { root, members } = electronMemberPath(current.callee);
					let bindTarget = root;
					let bindingArguments = expandJavaScriptInvocationArguments(current.arguments, nativeArrayIteration);
					let captured = capturedIntrinsic(current.callee);
					let terminal = captured?.path.at(-1) === "bind";
					let path = captured?.path.slice(0, -1);
					if (members.at(-1) === "bind") {
						if (!terminal && members.length !== 1) return undefined;
						bindReads.push(captured?.capturedAt ?? current.callee);
					} else {
						const invocation = resolveJavaScriptIntrinsicInvocation(current, intrinsicPath, (callee) => boundIntrinsic(callee, mayObserve), (reference, selected) => intrinsicReadChanged(reference, selected, mayObserve), nativeArrayIteration);
						if (invocation?.kind !== "known" || invocation.path.join(".") !== "intrinsic.Function.prototype.bind" || invocation.receiver === undefined) return undefined;
						bindTarget = invocation.receiver;
						bindingArguments = invocation.arguments;
						captured = capturedIntrinsic(bindTarget);
						terminal = captured !== undefined;
						path = captured?.path;
					}
					receiver = bindingArguments?.[0];
					const ownArguments = bindingArguments?.slice(1) ?? [];
					opaqueArguments ||= bindingArguments === undefined || t.isSpreadElement(receiver);
					opaqueArguments ||= ownArguments.some((argument) => t.isSpreadElement(argument));
					argumentGroups.push(ownArguments);
					if (!terminal || path === undefined) {
						current = bindTarget;
						continue;
					}
					if (captured !== undefined && mayObserve !== undefined) opaqueArguments ||= intrinsicReadChanged(captured.capturedAt, path, mayObserve);
					const boundPath = [...path, "bind"];
					const functionBind = [
						"intrinsic",
						"Function",
						"prototype",
						"bind"
					];
					opaqueArguments ||= bindReads.some((capture) => {
						if (mayObserve?.(capture, boundPath) || mayObserve?.(capture, functionBind)) return true;
						const scope = opaqueMutationPath(capture).join(".");
						return writes.some((write) => (write.scope === scope || write.scope === "intrinsic") && write.offset < (capture.start ?? -1) && (write.coverage.covers(boundPath) || write.coverage.covers(functionBind)));
					});
					return {
						kind: opaqueArguments ? "opaque" : "known",
						path,
						...receiver === undefined ? {} : { receiver },
						arguments: opaqueArguments ? undefined : argumentGroups.toReversed().flat()
					};
				}
			};
			const activeBoundValues = new WeakSet();
			const boundIntrinsic = (node, mayObserve) => {
				if (activeBoundValues.has(node)) return undefined;
				activeBoundValues.add(node);
				try {
					return resolveBoundIntrinsic(node, mayObserve);
				} finally {
					activeBoundValues.delete(node);
				}
			};
			const isFreshObject = (node) => {
				const visited = new Set();
				let current = node;
				for (;;) {
					current = unwrapJavaScriptExpression(current).node;
					if (t.isObjectExpression(current) || t.isArrayExpression(current) || t.isFunction(current) || t.isClass(current) && !current.decorators?.length || t.isRegExpLiteral(current)) return true;
					if (!t.isIdentifier(current)) return false;
					const binding = resolveSemanticBindingState(state, current, current.name);
					const initializer = unprojectedInitializer(binding, state);
					if (binding === undefined || initializer === undefined || !t.isFunctionDeclaration(initializer) && (initializer.end ?? Infinity) >= (current.start ?? -1) || visited.has(binding.bindingId)) return false;
					visited.add(binding.bindingId);
					current = initializer;
				}
			};
			const helperProof = (binding) => {
				const cached = helpers.get(binding.bindingId);
				if (cached !== undefined) return cached ?? undefined;
				helpers.set(binding.bindingId, null);
				if (state.scopesById.get(binding.scopeId)?.kind !== "program") return undefined;
				const wrapper = unprojectedInitializer(binding, state);
				if (wrapper === undefined) return undefined;
				if (identityFunction(wrapper, state)) {
					const proof = {
						dependencies: [],
						readyAfter: t.isFunctionDeclaration(wrapper) ? -1 : wrapper.end ?? Infinity,
						identity: true
					};
					helpers.set(binding.bindingId, proof);
					return proof;
				}
				const wrapperRoles = canonicalRoles(wrapper, TO_ESM, state);
				const copyBinding = wrapperRoles?.get("__copyProps");
				const copy = unprojectedInitializer(copyBinding, state);
				const copyRoles = copy === undefined ? undefined : canonicalRoles(copy, COPY_PROPS, state);
				if (wrapperRoles === undefined || copyRoles === undefined || copy === undefined) return undefined;
				const dependencies = [];
				let readyAfter = Math.max(wrapper.end ?? Infinity, copy.end ?? Infinity);
				for (const roles of [wrapperRoles, copyRoles]) for (const [role, dependency] of roles) {
					const expected = INTRINSICS[role];
					if (expected === undefined) continue;
					const initializer = unprojectedInitializer(dependency, state);
					const captured = initializer === undefined ? undefined : capturedIntrinsic(initializer);
					if (initializer === undefined || captured === undefined || JSON.stringify(captured.path) !== JSON.stringify(["intrinsic", ...expected])) return undefined;
					readyAfter = Math.max(readyAfter, initializer.end ?? Infinity);
					dependencies.push(captured);
					if (role === "__hasOwnProp") dependencies.push({ path: [...captured.path, "call"] });
				}
				dependencies.push({ path: [
					"intrinsic",
					"Function",
					"prototype",
					"bind"
				] }, { path: [
					"intrinsic",
					"Function",
					"prototype",
					"call"
				] });
				const proof = {
					dependencies,
					identity: false,
					readyAfter
				};
				helpers.set(binding.bindingId, proof);
				return proof;
			};
			const provenCall = (node) => {
				if (!t.isCallExpression(node) || !t.isIdentifier(node.callee)) return undefined;
				const helper = resolveSemanticBindingState(state, node.callee, node.callee.name);
				const proof = helper === undefined ? undefined : helperProof(helper);
				const input = node.arguments[0];
				const mode = node.arguments[1];
				const literalMode = mode === undefined ? {
					found: true,
					value: false
				} : t.isExpression(mode) ? readExactJavaScriptLiteral(mode) : { found: false };
				if (proof === undefined || proof.readyAfter >= (node.start ?? -1) || !t.isExpression(input) || node.arguments.length > 2 || !literalMode.found) return undefined;
				return {
					input,
					defaultIsModule: !proof.identity && Boolean(literalMode.value),
					dependencies: proof.dependencies.map((dependency) => ({
						...dependency,
						capturedAt: dependency.capturedAt ?? node
					}))
				};
			};
			const callOrigin = (node) => {
				const cached = calls.get(node);
				if (cached !== undefined) return cached;
				const { root, members } = electronMemberPath(node);
				if (!members.every((member) => member !== null)) return undefined;
				const converted = provenCall(root);
				const required = converted === undefined ? undefined : readSemanticRequireOrigin(converted.input, state)?.origin;
				if (converted === undefined || required === undefined || required.importedPath.length !== 0 || members[0] === "default" && !converted.defaultIsModule) return undefined;
				const result = {
					origin: {
						...required,
						importedPath: members
					},
					dependencies: converted.dependencies,
					defaultIsModule: converted.defaultIsModule
				};
				calls.set(node, result);
				return result;
			};
			const twoInitializerOrigin = (binding) => {
				const [initial, converted] = binding.initializers;
				if (binding.definitions.length !== 2 || binding.definitions[0]?.kind !== "variable" || binding.definitions[1]?.kind !== "assignment" || binding.initializers.length !== 2 || initial === undefined || converted === undefined || initial.projection.length !== 0 || converted.projection.length !== 0 || state.conditionallySkippedExpressions.has(initial.node)) return undefined;
				const call = converted.node;
				const assignment = state.parentsByNode.get(call);
				const statement = assignment === undefined ? undefined : state.parentsByNode.get(assignment);
				const declaration = state.parentsByNode.get(initial.node);
				const declarationStatement = declaration === undefined ? undefined : state.parentsByNode.get(declaration);
				if (!t.isCallExpression(call) || !t.isIdentifier(call.callee) || !t.isAssignmentExpression(assignment, { operator: "=" }) || assignment.right !== call || !t.isIdentifier(assignment.left, { name: binding.name }) || !t.isExpressionStatement(statement) || !t.isVariableDeclarator(declaration) || !t.isVariableDeclaration(declarationStatement) || state.parentsByNode.get(statement) !== state.parentsByNode.get(declarationStatement) || (initial.node.start ?? Infinity) >= (call.start ?? -1)) return undefined;
				const convertedCall = provenCall(call);
				const input = convertedCall?.input;
				if (!t.isIdentifier(input) || resolveSemanticBindingState(state, input, input.name) !== binding) return undefined;
				const required = readSemanticRequireOrigin(initial.node, state)?.origin;
				if (required === undefined || required.importedPath.length !== 0) return undefined;
				if (convertedCall === undefined) return undefined;
				return {
					origin: required,
					dependencies: convertedCall.dependencies,
					defaultIsModule: convertedCall.defaultIsModule
				};
			};
			const origin = (binding) => {
				const cached = origins.get(binding.bindingId);
				if (cached !== undefined) return cached;
				let currentBinding = binding;
				const visited = new Set();
				const steps = [];
				let baseOrigin;
				while (currentBinding !== undefined) {
					const alreadyCached = origins.get(currentBinding.bindingId);
					if (alreadyCached !== undefined) {
						baseOrigin = alreadyCached;
						break;
					}
					if (visited.has(currentBinding.bindingId)) return undefined;
					visited.add(currentBinding.bindingId);
					const single = semanticStableInitializer(currentBinding, state);
					if (single !== undefined) {
						if (!single.projection.every((key) => typeof key === "string")) return undefined;
						const converted = callOrigin(single.node);
						if (converted !== undefined) {
							if (converted.origin.importedPath.length === 0 && single.projection[0] === "default" && !converted.defaultIsModule) return undefined;
							baseOrigin = {
								...converted,
								origin: {
									...converted.origin,
									importedPath: [...converted.origin.importedPath, ...single.projection]
								}
							};
							break;
						}
						const { root, members } = electronMemberPath(single.node);
						if (!t.isIdentifier(root) || !members.every((member) => member !== null)) return undefined;
						const targetBinding = resolveSemanticBindingState(state, root, root.name);
						if (targetBinding === undefined || targetBinding === currentBinding) return undefined;
						aliasTargets.set(currentBinding.bindingId, {
							targetBinding,
							node: root
						});
						steps.push({
							binding: currentBinding,
							segments: [...members, ...single.projection]
						});
						currentBinding = targetBinding;
						continue;
					}
					const twoInit = twoInitializerOrigin(currentBinding);
					if (twoInit !== undefined) {
						baseOrigin = twoInit;
						break;
					}
					return undefined;
				}
				if (baseOrigin === undefined) return undefined;
				origins.set(currentBinding.bindingId, baseOrigin);
				let currentOrigin = baseOrigin;
				for (let i = steps.length - 1; i >= 0; i--) {
					const step = steps[i];
					const firstSegment = step.segments[0];
					if (currentOrigin.origin.importedPath.length === 0 && firstSegment === "default" && !currentOrigin.defaultIsModule) return undefined;
					currentOrigin = {
						...currentOrigin,
						origin: {
							...currentOrigin.origin,
							importedPath: [...currentOrigin.origin.importedPath, ...step.segments]
						}
					};
					origins.set(step.binding.bindingId, currentOrigin);
				}
				return currentOrigin;
			};
			const invalidatedOrigin = (record) => record?.dependencies.some(({ path, capturedAt }) => {
				if (capturedAt === undefined) return true;
				const scope = opaqueMutationPath(capturedAt).join(".");
				return writes.some((write) => (write.scope === scope || write.scope === "intrinsic") && write.offset < (capturedAt.start ?? -1) && write.coverage.covers(path));
			}) ?? false;
			return {
				origin,
				callOrigin,
				intrinsicPath,
				intrinsicInvocation: (node, callablePath = intrinsicPath, mayObserve) => resolveJavaScriptIntrinsicInvocation(node, callablePath, mayObserve === undefined ? boundIntrinsic : (callee) => boundIntrinsic(callee, mayObserve), mayObserve === undefined ? intrinsicReadChanged : (reference, path) => intrinsicReadChanged(reference, path, mayObserve), nativeArrayIteration),
				boundIntrinsic,
				staticString,
				isFreshObject,
				opaqueMutationPath,
				retainWrite: (node, path) => {
					const coverage = new SemanticPropertyPathCoverage();
					coverage.retain(path[0] === "opaque-intrinsic" ? ["intrinsic"] : path);
					writes.push({
						scope: opaqueMutationPath(node).join("."),
						offset: node.start ?? Infinity,
						coverage
					});
				},
				invalidated: (binding) => {
					const cached = invalidatedBindings.get(binding.bindingId);
					if (cached !== undefined) return cached;
					const result = invalidatedOrigin(origins.get(binding.bindingId));
					invalidatedBindings.set(binding.bindingId, result);
					return result;
				},
				invalidatedCall: (node) => {
					const cached = invalidatedCalls.get(node);
					if (cached !== undefined) return cached;
					const result = invalidatedOrigin(calls.get(node));
					invalidatedCalls.set(node, result);
					return result;
				},
				aliasMayHaveChanged: (binding) => {
					if (!semanticDirectEvalRecorded(state)) return false;
					const cached = aliasChangedCache.get(binding.bindingId);
					if (cached !== undefined) return cached;
					origin(binding);
					let current = binding;
					const seen = new Set();
					let changed = false;
					while (current !== undefined) {
						if (seen.has(current.bindingId)) break;
						seen.add(current.bindingId);
						const next = aliasTargets.get(current.bindingId);
						if (next === undefined) break;
						if (opaqueCodeMayRebindBinding(next.targetBinding, state, next.node)) {
							changed = true;
							break;
						}
						current = next.targetBinding;
					}
					aliasChangedCache.set(binding.bindingId, changed);
					return changed;
				}
			};
		};
		identityFunction = (node, state) => {
			if (!t.isFunction(node) || node.async || node.generator || runtimeFunctionParameters(node).length !== 1) return false;
			const parameter = runtimeFunctionParameters(node)[0];
			const result = t.isBlockStatement(node.body) ? node.body.body.length === 1 && t.isReturnStatement(node.body.body[0]) ? node.body.body[0].argument : undefined : node.body;
			return t.isIdentifier(parameter) && t.isIdentifier(result) && resolveSemanticBindingState(state, parameter, parameter.name) !== undefined && resolveSemanticBindingState(state, parameter, parameter.name) === resolveSemanticBindingState(state, result, result.name);
		};
		unprojectedInitializer = (binding, state) => {
			const initializer = semanticStableInitializer(binding, state);
			return initializer?.projection.length === 0 ? initializer.node : undefined;
		};
		canonicalRoles = (actual, pattern, state) => {
			const roles = new Map();
			const used = new Map();
			const pending = [{
				actual,
				pattern,
				parent: null
			}];
			while (pending.length !== 0) {
				const pair = pending.pop();
				if (pair === undefined) return undefined;
				const { parent } = pair;
				const controlBody = t.isIfStatement(parent) && (parent.consequent === pair.pattern || parent.alternate === pair.pattern) || t.isForStatement(parent) && parent.body === pair.pattern;
				const node = controlBody ? controlBodyOperation(pair.actual) : pair.actual;
				const expected = controlBody ? controlBodyOperation(pair.pattern) : pair.pattern;
				if (node.type !== expected.type) return undefined;
				const literalKey = parent !== null && (t.isMemberExpression(parent) && !parent.computed && parent.property === expected || t.isObjectProperty(parent) && !parent.computed && parent.key === expected);
				if (t.isIdentifier(expected) && t.isIdentifier(node) && !literalKey) {
					const binding = resolveSemanticBindingState(state, node, node.name);
					if (binding === undefined || roles.has(expected.name) && roles.get(expected.name) !== binding || used.has(binding.bindingId) && used.get(binding.bindingId) !== expected.name) return undefined;
					roles.set(expected.name, binding);
					used.set(binding.bindingId, expected.name);
				}
				const visitorKeys = javaScriptAstChildKeys(expected);
				for (const [key, field] of Object.entries(t.NODE_FIELDS[expected.type] ?? {})) {
					if (visitorKeys.includes(key) || t.isIdentifier(expected) && key === "name" && !literalKey) continue;
					const fallback = Reflect.get(field, "default");
					if (JSON.stringify(Reflect.get(node, key) ?? fallback) !== JSON.stringify(Reflect.get(expected, key) ?? fallback)) return undefined;
				}
				const children = childNodes(node), expectedChildren = childNodes(expected);
				if (children.length !== expectedChildren.length) return undefined;
				for (const [index, child] of children.entries()) {
					const expectedChild = expectedChildren[index];
					if (expectedChild !== undefined) pending.push({
						actual: child,
						pattern: expectedChild,
						parent: expected
					});
				}
			}
			return roles;
		};
		controlBodyOperation = (node) => {
			while (t.isBlockStatement(node) && node.directives.length === 0 && node.body.length === 1) {
				const statement = node.body[0];
				if (statement === undefined) break;
				node = statement;
			}
			return node;
		};
		ambientWriteInterops = new WeakMap();
		semanticModuleInteropWithAmbientWrites = (state) => {
			const generation = semanticAmbientEffectGeneration(state);
			const prior = ambientWriteInterops.get(state);
			if (prior?.generation === generation) return prior.interop;
			const interop = createSemanticModuleInterop(state);
			for (const { site, path } of semanticAmbientIntrinsicWrites(state)) interop.retainWrite(site, path);
			ambientWriteInterops.set(state, {
				generation,
				interop
			});
			return interop;
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticIntrinsicInstances.js
var intrinsicPrototypeMemberMayHaveChanged, isIntrinsicInstanceMethodCall, isIntrinsicMapLookup;
function init_javascriptSemanticIntrinsicInstances() {
	return (init_javascriptSemanticIntrinsicInstances = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticGlobalReference();
		init_javascriptSemanticEffectLog();
		init_javascriptSemanticMutationInitializers();
		init_javascriptSemanticState();
		intrinsicPrototypeMemberMayHaveChanged = (state, constructor, member, read) => [constructor, "Object"].some((owner) => [member, "__proto__"].some((key) => {
			const path = [
				"global",
				owner,
				"prototype",
				key
			];
			return read === undefined ? ambientPathMayHaveChanged(state, path, "contents") : ambientPathMayObserveAt(state, read, path, "contents");
		}));
		isIntrinsicInstanceMethodCall = (node, bindings, intrinsic, index) => {
			const callee = unwrapJavaScriptExpression(node.callee).node;
			if (!t.isMemberExpression(callee) && !t.isOptionalMemberExpression(callee)) return false;
			const method = semanticStaticPropertyName(callee.property, callee.computed);
			if (method === undefined || !intrinsic.methods.includes(method)) return false;
			if (intrinsicPrototypeMemberMayHaveChanged(bindings, intrinsic.constructor, method)) return false;
			let receiver = unwrapJavaScriptExpression(callee.object).node;
			const seen = new Set();
			while (t.isIdentifier(receiver)) {
				if (index !== undefined && (index.mayObserve(node, receiver, [method]) || index.mayObserve(node, receiver, ["__proto__"]))) return false;
				const binding = resolveSemanticBindingState(bindings, receiver, receiver.name);
				if (binding === undefined || seen.has(binding.bindingId)) return false;
				seen.add(binding.bindingId);
				const initializer = semanticStableInitializer(binding, bindings);
				if (initializer === undefined || initializer.projection.length !== 0 || !semanticBindingAtRead(binding, receiver, bindings).hasDefiniteInitializer) return false;
				receiver = unwrapJavaScriptExpression(initializer.node).node;
			}
			if (!t.isNewExpression(receiver) || !isIntrinsicGlobalReference(receiver.callee, bindings, intrinsic.constructor, callee)) return false;
			if (receiver.arguments.length > 0 && (intrinsic.constructionHooks ?? []).some((hook) => intrinsicPrototypeMemberMayHaveChanged(bindings, intrinsic.constructor, hook))) return false;
			return index === undefined && seen.size > 0 ? undefined : true;
		};
		isIntrinsicMapLookup = (node, bindings, index) => isIntrinsicInstanceMethodCall(node, bindings, {
			constructor: "Map",
			methods: ["get", "delete"],
			constructionHooks: ["set"]
		}, index);
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticReturnedReferences.js
var createSemanticReturnedReferences;
function init_javascriptSemanticReturnedReferences() {
	return (init_javascriptSemanticReturnedReferences = __esmMin((() => {
		init_javascriptSemanticEffectLog();
		init_javascriptSemanticIntrinsicInstances();
		init_javascriptAstValues();
		init_javascriptSemanticCallableResults();
		init_javascriptIntrinsicInvocation();
		init_javascriptSemanticMutationInitializers();
		init_javascriptSemanticReferenceSources();
		init_javascriptSemanticObjectReferences();
		init_javascriptSemanticProjectedSources();
		init_javascriptSemanticPropertyPaths();
		init_javascriptSemanticAliasSelections();
		init_javascriptSemanticDirectInvocations();
		init_javascriptSemanticState();
		createSemanticReturnedReferences = (state, consumption = "potential-reference") => {
			const results = new WeakMap();
			return (callee, invocation) => {
				const existing = results.get(callee);
				if (existing !== undefined && existing.invocation === invocation && existing.iterationUnknown === state.arrayIterationUnknown && existing.ambientGeneration === semanticAmbientEffectGeneration(state, "contents") && existing.dependencies.every(({ binding, generation }) => semanticBindingEffectGeneration(binding) === generation)) return existing.result;
				const dependencies = new Map();
				const functions = new Set();
				const work = [];
				const projectionDepths = new WeakMap();
				const expanded = new WeakMap();
				let additionalContexts = 0;
				let contextsWidened = false;
				const result = {
					references: [],
					callables: functions,
					precision: "exact"
				};
				const nativeArrayIteration = (array) => semanticKnownArrayIterationAt(array, state);
				const sourceInvocation = invocation === undefined ? undefined : javaScriptSourceInvocationContext(invocation, nativeArrayIteration);
				const sourceGenericInvocation = invocation !== undefined && javaScriptGenericInvocationMethod(invocation.callee) !== undefined;
				const inheritedInvocationChanged = (method) => invocation !== undefined && intrinsicPrototypeMemberMayHaveChanged(state, "Function", method, invocation);
				const selections = new SemanticAliasSelections(() => {
					state.valueResourceLimits.add("alias-selections");
					result.precision = "widened";
				}, state.precision.alias_selections);
				const enqueue = (node, path, readAt, capturedSelections, invocationContext, classKind) => {
					const source = unwrapJavaScriptExpression(node).node;
					if (contextsWidened) {
						path = undefined;
						capturedSelections = undefined;
						invocationContext = undefined;
					}
					const invocationKey = () => invocationContext === undefined ? null : [
						invocationContext.receiver?.start,
						invocationContext.receiver?.end,
						invocationContext.receiverUnknown,
						invocationContext.arguments?.map((argument) => [argument.start, argument.end])
					];
					let readKey = JSON.stringify([
						readAt?.start ?? -1,
						readAt?.end ?? -1,
						invocationKey(),
						classKind
					]);
					const depths = projectionDepths.get(source) ?? new Map();
					projectionDepths.set(source, depths);
					let context = depths.get(readKey);
					if (context === undefined) {
						context = { depth: path?.length };
						depths.set(readKey, context);
					} else if (context.depth === undefined || context.depth !== path?.length) {
						if (context.depth !== undefined) result.precision = "widened";
						context.depth = undefined;
						path = undefined;
					}
					if (path !== undefined) path = selections.normalize(context, path);
					capturedSelections = path === undefined ? undefined : semanticNormalizeCapturedSelections(capturedSelections, path.length);
					const expansionKey = () => JSON.stringify([
						readKey,
						path ?? null,
						capturedSelections?.map(({ at, depth, ownEnumerable }) => [
							at.start,
							at.end,
							depth,
							ownEnumerable
						])
					]);
					let key = expansionKey();
					const paths = expanded.get(source) ?? new Set();
					if (paths.has(key)) return;
					if (!contextsWidened && (capturedSelections !== undefined || invocationContext !== undefined) && paths.size > 0 && ++additionalContexts > state.precision.alias_selections) {
						contextsWidened = true;
						state.valueResourceLimits.add("alias-selections");
						result.precision = "widened";
						if (sourceInvocation !== undefined) {
							if (sourceInvocation.receiver !== undefined) enqueue(sourceInvocation.receiver, undefined);
							for (const argument of sourceInvocation.arguments ?? []) if (t.isExpression(argument)) enqueue(argument, undefined);
							else if (t.isSpreadElement(argument)) enqueue(argument.argument, undefined);
						}
					}
					if (contextsWidened) {
						path = undefined;
						capturedSelections = undefined;
						invocationContext = undefined;
						readKey = JSON.stringify([
							readAt?.start ?? -1,
							readAt?.end ?? -1,
							null,
							classKind
						]);
						if (sourceGenericInvocation) result.unresolvedInvocation = true;
						depths.set(readKey, { depth: undefined });
						key = expansionKey();
						if (paths.has(key)) return;
					}
					paths.add(key);
					expanded.set(source, paths);
					work.push({
						node: source,
						...classKind === undefined ? {} : { classKind },
						path,
						...readAt === undefined ? {} : { readAt },
						...capturedSelections === undefined ? {} : { capturedSelections },
						...invocationContext === undefined ? {} : { invocation: invocationContext }
					});
				};
				enqueue(callee, [], undefined, undefined, sourceInvocation);
				while (work.length > 0) {
					const current = work.pop();
					if (current === undefined) break;
					const { node } = current;
					if (current.invocation !== undefined && current.path?.length === 0 && (t.isObjectExpression(node) || t.isArrayExpression(node))) continue;
					const pending = [];
					if (t.isIdentifier(node)) {
						const binding = resolveSemanticBindingState(state, node, node.name);
						if (binding === undefined) {
							if (sourceGenericInvocation && current.path?.length === 0) result.unresolvedInvocation = true;
							continue;
						}
						dependencies.set(binding, semanticBindingEffectGeneration(binding));
						const argument = semanticDirectInvocationArgument(node, binding, state);
						if (argument !== undefined) enqueue(argument, current.path, current.path?.length === 0 ? undefined : current.readAt ?? node, current.capturedSelections, current.invocation, current.classKind);
						if (current.path !== undefined) {
							if (sourceGenericInvocation && current.path.length > 0 && semanticProjectedSourcesAtRead(binding, node, current.path, state, true, invocation !== undefined && current.readAt === unwrapJavaScriptExpression(invocation.callee).node ? invocation : current.readAt ?? node, current.capturedSelections) === undefined) result.unresolvedInvocation = true;
							const selectedSources = semanticProjectedSourcesAtRead(binding, node, current.path, state, false, current.readAt ?? node, current.capturedSelections);
							if (selectedSources !== undefined) {
								for (const source of selectedSources) {
									const capturedSelections = [...semanticShiftCapturedSelections(current.capturedSelections, source.path.length - current.path.length) ?? [], ...source.capturedSelections ?? []];
									pending.push({
										...source,
										...current.path.length === 0 ? {} : { readAt: current.readAt ?? node },
										...capturedSelections.length === 0 ? {} : { capturedSelections }
									});
								}
								for (let index = pending.length - 1; index >= 0; index--) {
									const child = pending[index];
									if (child !== undefined) enqueue(child.node, child.path, child.readAt, child.capturedSelections, child.invocation ?? current.invocation, child.classKind ?? current.classKind);
								}
								continue;
							}
							result.precision = "widened";
							if (sourceGenericInvocation) result.unresolvedInvocation = true;
						}
						const selected = semanticBindingAtRead(binding, node, state).binding;
						for (const initializer of [...selected.initializers, ...selected.referenceInitializers]) {
							if (semanticReferenceSourcesInactive(initializer, state)) continue;
							pending.push({
								node: initializer.node,
								path: current.path === undefined ? undefined : [...initializer.projection, ...current.path],
								...current.path?.length === 0 ? {} : { readAt: current.readAt ?? node },
								...current.capturedSelections === undefined ? {} : { capturedSelections: semanticShiftCapturedSelections(current.capturedSelections, initializer.projection.length) }
							});
						}
						if (current.path === undefined) {
							for (const source of semanticMemberWriteSources(binding)) if (!semanticReferenceSourcesInactive(source, state)) pending.push({
								node: source.node,
								path: undefined
							});
						}
					} else if (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) {
						const path = [];
						let receiver = node;
						while (t.isMemberExpression(receiver) || t.isOptionalMemberExpression(receiver)) {
							path.push(semanticStaticPropertyKey(receiver.property, receiver.computed));
							receiver = unwrapJavaScriptExpression(receiver.object).node;
						}
						pending.push({
							...current,
							node: receiver,
							readAt: current.readAt ?? node,
							...current.capturedSelections === undefined ? {} : { capturedSelections: semanticShiftCapturedSelections(current.capturedSelections, path.length) },
							path: current.path === undefined ? undefined : [...path.reverse(), ...current.path]
						});
					} else if (t.isConditionalExpression(node) || t.isLogicalExpression(node)) {
						pending.push({
							...current,
							node: t.isConditionalExpression(node) ? node.consequent : node.left
						}, {
							...current,
							node: t.isConditionalExpression(node) ? node.alternate : node.right
						});
					} else if (t.isSequenceExpression(node)) {
						const last = node.expressions.at(-1);
						if (last !== undefined) pending.push({
							...current,
							node: last
						});
					} else if (t.isFunction(node)) {
						if (current.path === undefined || current.path.length === 0) functions.add(node);
						else if (current.invocation !== undefined && current.path.every((key) => semanticAliasSelectionChoices(key).every((choice) => choice === "call" || choice === "apply"))) {
							const methods = semanticAliasSelectionChoices(current.path.at(-1)).filter((method) => method === "call" || method === "apply");
							for (const method of methods) {
								const selected = resolveJavaScriptGenericInvocation(method, current.invocation, nativeArrayIteration);
								if (selected !== undefined) pending.push({
									node: selected.callable,
									path: [],
									invocation: selected.context
								});
								else if (current.invocation.receiverUnknown) result.unresolvedInvocation = true;
								if (inheritedInvocationChanged(method)) result.unresolvedInvocation = true;
							}
						}
					} else if (t.isObjectExpression(node)) {
						const [key, ...suffix] = current.path ?? [];
						for (const choice of key === undefined ? [undefined] : semanticAliasSelectionChoices(key)) for (const source of semanticObjectPropertyReferences(node, choice === undefined ? [] : [choice], state)) {
							if (source.widenedGetterResult) result.precision = "widened";
							if (source.inherited && current.capturedSelections?.some((capture) => capture.depth === 1 && capture.ownEnumerable)) continue;
							pending.push({
								...current,
								node: source.node,
								path: current.path === undefined || source.widenedGetterResult ? undefined : [...source.path, ...suffix],
								capturedSelections: semanticCapturedSelectionsAfterPropertyRead(current.capturedSelections, source)
							});
						}
					} else if (t.isArrayExpression(node)) {
						const [key, ...path] = current.path ?? [];
						if (current.path !== undefined && key !== undefined) {
							for (const choice of semanticAliasSelectionChoices(key)) for (const source of semanticArrayPropertyReferences(node, [choice], state)) {
								let projection = source.path;
								if (source.capturedSelectionAt !== undefined && !semanticKnownArrayIteration(semanticSelectedReferenceSlot({
									node: source.node,
									projection: []
								}, state, source.capturedSelectionAt)?.value, state, source.capturedSelectionAt)) projection = [null, ...source.path.slice(1)];
								const selectedPath = [...projection, ...path];
								pending.push({
									...current,
									node: source.node,
									path: selectedPath,
									capturedSelections: [...semanticShiftCapturedSelections(current.capturedSelections, selectedPath.length - current.path.length) ?? [], ...source.capturedSelectionAt === undefined ? [] : [{
										at: source.capturedSelectionAt,
										depth: 1
									}]]
								});
							}
							for (let index = pending.length - 1; index >= 0; index--) {
								const child = pending[index];
								if (child !== undefined) enqueue(child.node, child.path, child.readAt, child.capturedSelections, child.invocation ?? current.invocation, child.classKind ?? current.classKind);
							}
							continue;
						}
						let uncertainOffset = false;
						node.elements.forEach((element, offset) => {
							if (element === null) return;
							if (t.isSpreadElement(element)) {
								uncertainOffset = true;
								pending.push({
									...current,
									node: element.argument,
									path: current.path === undefined ? undefined : [null, ...path],
									capturedSelections: [...current.capturedSelections ?? [], {
										at: element.argument,
										depth: 1
									}]
								});
							} else if (current.path === undefined || key === undefined || uncertainOffset || semanticAliasSelectionChoices(key).some((choice) => semanticPropertyPathKeyMatches(choice, String(offset)))) pending.push({
								...current,
								node: element,
								path: current.path === undefined ? undefined : path,
								capturedSelections: semanticShiftCapturedSelections(current.capturedSelections, -1) ?? []
							});
						});
					} else if (t.isNewExpression(node)) pending.push({
						...current,
						node: node.callee,
						classKind: "instance"
					});
					else if (t.isClass(node)) {
						const [key, ...path] = current.path ?? [];
						if (current.path !== undefined && key !== undefined) {
							for (const choice of semanticAliasSelectionChoices(key)) {
								const prototype = current.classKind !== "instance" && choice === "prototype";
								if (prototype && path.length === 0) continue;
								const ownEnumerable = current.capturedSelections?.some((capture) => capture.depth === (prototype ? 2 : 1) && capture.ownEnumerable);
								const member = prototype ? path[0] : choice;
								if (member === undefined) continue;
								for (const selected of semanticAliasSelectionChoices(member)) for (const source of semanticClassPropertyReferences({
									owner: node,
									kind: prototype ? "prototype" : current.classKind ?? "static",
									...ownEnumerable ? { fieldsOnly: true } : {}
								}, [selected], state)) {
									if (source.inherited && ownEnumerable) continue;
									if (source.widenedGetterResult) result.precision = "widened";
									pending.push({
										...current,
										node: source.node,
										path: source.widenedGetterResult ? undefined : [...source.path, ...prototype ? path.slice(1) : path],
										classKind: "static",
										capturedSelections: semanticCapturedSelectionsAfterPropertyRead(prototype ? semanticShiftCapturedSelections(current.capturedSelections, -1) : current.capturedSelections, source)
									});
								}
							}
							for (const child of pending) enqueue(child.node, child.path, child.readAt, child.capturedSelections, child.invocation ?? current.invocation, child.classKind ?? current.classKind);
							continue;
						}
						for (const member of node.body.body) {
							if (t.isClassMethod(member) && (current.path === undefined || member.kind === "constructor")) pending.push({
								...current,
								node: member,
								path: current.path === undefined ? undefined : []
							});
							else if (current.path === undefined && t.isClassProperty(member) && member.value != null) pending.push({
								...current,
								node: member.value,
								path: undefined
							});
						}
						if (node.superClass !== null && node.superClass !== undefined) pending.push({
							...current,
							node: node.superClass
						});
					}
					for (let index = pending.length - 1; index >= 0; index--) {
						const child = pending[index];
						if (child !== undefined) enqueue(child.node, child.path, child.readAt, child.capturedSelections, child.invocation ?? current.invocation, child.classKind ?? current.classKind);
					}
				}
				const output = [...functions].flatMap((callable) => {
					const resultKind = semanticCallableResultKind(callable);
					if (consumption !== "potential-reference" && (resultKind === "iterator" || resultKind === "async-iterator" || consumption === "direct-call" && resultKind === "promise")) return [];
					return semanticCallableResultExpressions(callable).flatMap(({ node, delegated, kind }) => node === null || consumption !== "potential-reference" && kind !== "return" ? [] : [{
						node,
						projection: delegated ? [null] : []
					}]);
				});
				result.references = output;
				results.set(callee, {
					result,
					invocation,
					iterationUnknown: state.arrayIterationUnknown,
					ambientGeneration: semanticAmbientEffectGeneration(state, "contents"),
					dependencies: [...dependencies].map(([binding, generation]) => ({
						binding,
						generation
					}))
				});
				if (result.precision === "widened") state.returnedReferenceWidenings.add(callee);
				return result;
			};
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticTypedArrays.js
var typedArrayConstructors, isIntrinsicTypedArrayConstruction, hasNumberResult, isTypedArrayNumericIndex;
function init_javascriptSemanticTypedArrays() {
	return (init_javascriptSemanticTypedArrays = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticGlobalReference();
		init_javascriptSemanticEffectLog();
		typedArrayConstructors = [
			"Int8Array",
			"Uint8Array",
			"Uint8ClampedArray",
			"Int16Array",
			"Uint16Array",
			"Int32Array",
			"Uint32Array",
			"Float16Array",
			"Float32Array",
			"Float64Array",
			"BigInt64Array",
			"BigUint64Array"
		];
		isIntrinsicTypedArrayConstruction = (node, state) => typedArrayConstructors.some((name) => isIntrinsicGlobalReference(node.callee, state, name, node) && !ambientPathMayHaveChanged(state, ["global", name], "contents"));
		hasNumberResult = (node) => {
			const pending = [node];
			while (pending.length > 0) {
				const expression = unwrapJavaScriptExpression(pending.pop()).node;
				if (t.isNumericLiteral(expression)) return true;
				if (t.isUnaryExpression(expression)) {
					if (expression.operator === "+") return true;
					if (expression.operator === "-" || expression.operator === "~") pending.push(expression.argument);
				} else if (t.isBinaryExpression(expression)) {
					if (expression.operator === ">>>") return true;
					if ([
						"-",
						"*",
						"/",
						"%",
						"**",
						"<<",
						">>",
						"&",
						"|",
						"^"
					].includes(expression.operator)) pending.push(expression.left, expression.right);
				}
			}
			return false;
		};
		isTypedArrayNumericIndex = (key, computed) => {
			if (!computed) return false;
			const expression = unwrapJavaScriptExpression(key).node;
			if (t.isStringLiteral(expression)) return expression.value === "-0" || String(Number(expression.value)) === expression.value;
			return hasNumberResult(expression);
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticAmbientWrites.js
/**
* Index source-local writes through ambient identities and stable aliases.
* The shared invocation owner resolves intrinsic aliases, bind/call/apply and
* literal argument spreads. Runtime reachability and arbitrary call effects
* remain unevaluated; a visible possible write is sufficient.
*/
function* indexJavaScriptAmbientWritesSteps(program, state, observeOpaqueInvocation, observeWriteSite) {
	const ambientReads = createAmbientPathResolver(state, false);
	const browserReceiverMethods = new Set();
	const storedSites = new WeakSet();
	const storedReferences = [];
	const writes = [];
	const targets = [];
	const escapes = [];
	const prototypeInspections = [];
	const staticReceivers = [];
	const stores = new WeakMap();
	const interop = createSemanticModuleInterop(state, { intrinsicPath: (node) => {
		const [path] = ambientReads(node).paths;
		return path?.[0] === "global" && path.every((key) => key !== null) ? ["intrinsic", ...path.slice(1)] : undefined;
	} });
	const ambientWrites = createAmbientPathResolver(state, true, {
		stores,
		freshObject: interop.isFreshObject,
		arrayIteratorReceiver: (node) => t.isArrayExpression(node) || t.isNewExpression(node) && (isIntrinsicGlobalReference(node.callee, state, "Array") || isIntrinsicTypedArrayConstruction(node, state)),
		callResult: (node) => {
			const invocation = interop.intrinsicInvocation(node);
			const prototype = intrinsicPrototypeRead(invocation);
			if (prototype !== undefined) return {
				kind: "prototype",
				target: prototype
			};
			if (invocation?.path.length === 4 && invocation.path[1] === "Array" && invocation.path[2] === "prototype" && arrayIteratorMethods.has(invocation.path[3])) return { kind: "array-iterator" };
			const callee = unwrapJavaScriptExpression(node.callee).node;
			if (!(t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee))) return undefined;
			const key = semanticStaticPropertyKey(callee.property, callee.computed);
			if (!(key !== null && arrayIteratorMethods.has(key)) && !(callee.computed && globalReferenceNamespace(callee.property, state, ["Symbol", "iterator"]) !== undefined)) return undefined;
			return {
				kind: "array-iterator",
				receiver: callee.object
			};
		}
	});
	yield* collectJavaScriptIdentityWritesSteps(program, state.erasedSyntaxNodes, (root, kind, writeSite) => {
		if (kind === "opaque-call") return [];
		observeWriteSite?.(writeSite);
		if (kind === "binding") return t.isIdentifier(root) && isUnshadowedGlobal(root, state, root.name) ? [["global", root.name]] : [];
		if (!storedSites.has(writeSite)) {
			storedSites.add(writeSite);
			for (const source of semanticIterationSources(writeSite, state.parentsByNode.get(writeSite) ?? null)) {
				if (source.kind === "reference-store") storedReferences.push(source);
			}
		}
		const id = targets.push({
			node: root,
			capture: writeSite
		}) - 1;
		return [["pending-target", String(id)]];
	}, interop.intrinsicInvocation, interop.staticString, interop.isFreshObject, (node, path) => {
		writes.push({
			node,
			path
		});
	}, (node, invocation) => {
		observeOpaqueInvocation?.(node);
		const retainEscape = (target, browserReceiver = false) => {
			escapes.push({
				target,
				node,
				browserReceiver
			});
		};
		const arguments_ = t.isTaggedTemplateExpression(node) ? node.quasi.expressions : node.arguments;
		const inspection = (t.isCallExpression(node) || t.isOptionalCallExpression(node)) && isReadOnlyPrototypeInspection(invocation) ? {
			node,
			arguments: []
		} : undefined;
		for (const [index, argument] of arguments_.entries()) if (t.isNode(argument) && !semanticArgumentStaysInSource(node, index, state)) {
			const value = t.isSpreadElement(argument) ? argument.argument : argument;
			if (inspection === undefined) retainEscape(value);
			else inspection.arguments.push(value);
		}
		if (inspection !== undefined) prototypeInspections.push(inspection);
		const callee = unwrapJavaScriptExpression(t.isTaggedTemplateExpression(node) ? node.tag : node.callee).node;
		const browserMethod = invocation?.kind === "known" && invocation.path.length === 2 && ["open", "fetch"].includes(invocation.path[1] ?? "") ? invocation.path[1] : undefined;
		if (!t.isNewExpression(node) && (t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee))) {
			const owner = invocation?.path[1];
			const method = invocation?.kind === "known" && invocation.path.length === 3 && owner !== undefined && NATIVE_STATIC_METHODS.get(owner)?.has(invocation.path[2] ?? "") ? invocation.path.slice(1) : undefined;
			if (method !== undefined) staticReceivers.push({
				node,
				target: callee.object,
				method
			});
			else {
				if (browserMethod !== undefined) browserReceiverMethods.add(browserMethod);
				retainEscape(callee.object, browserMethod !== undefined);
			}
		}
	});
	const pendingStores = new Set(storedReferences);
	const dependents = new WeakMap();
	while (pendingStores.size > 0) {
		const source = pendingStores.values().next().value;
		if (source === undefined) break;
		pendingStores.delete(source);
		if (source.target === undefined) continue;
		const identities = new Map();
		ambientWrites(source.target, source.mutation, false, [], (node, path) => {
			identities.set(node, identities.has(node) ? joinAmbientProjection(identities.get(node), path) : path);
		});
		for (const [node, path] of identities) {
			const users = dependents.get(node) ?? new Map();
			users.set(source, path);
			dependents.set(node, users);
		}
		for (const [node, path] of identities) {
			const entries = stores.get(node) ?? new Map();
			const previous = entries.get(source);
			const joined = entries.has(source) ? joinAmbientProjection(previous, path) : path;
			if (entries.has(source) && (previous === undefined || joined !== undefined && previous.every((key, index) => key === joined[index]))) continue;
			entries.set(source, joined);
			stores.set(node, entries);
			for (const [dependent, reached] of dependents.get(node) ?? []) {
				const stored = storedValueProjection(reached, source, joined, false);
				if (stored !== null && stored?.length !== 0) pendingStores.add(dependent);
			}
		}
		yield;
	}
	for (const node of state.escapingThrows) escapes.push({
		node,
		target: node.argument,
		browserReceiver: false
	});
	for (const source of storedReferences) {
		if (source.target === undefined) continue;
		const receiver = ambientWrites(source.target.object, source.mutation);
		if (receiver.ownership !== "local") {
			state.escapingReferenceStores.add(source.target);
			escapes.push({
				node: source.mutation,
				target: source.node,
				browserReceiver: false,
				projection: source.projection.map((key) => key === null || typeof key === "object" ? null : String(key))
			});
		}
	}
	for (const { node, path } of writes) {
		const target = path[0] === "pending-target" ? targets[Number(path[1])] : undefined;
		if (target === undefined) {
			retainSemanticAmbientEffect(state, "write", path, node);
			continue;
		}
		const resolved = ambientWrites(target.node, target.capture, false, [], undefined, "ambient-effects");
		const suffix = path.slice(2);
		for (const identity of resolved.paths) retainSemanticAmbientEffect(state, "write", [...identity, ...suffix], node);
		for (const identity of resolved.spreadEffectPaths ?? []) {
			const prototype = semanticArrayIterationPrototypeEffectPath([...identity, ...suffix], "write");
			if (prototype !== undefined) retainSemanticAmbientEffect(state, "write", prototype, node);
		}
	}
	const resolverReceivers = [];
	for (const effect of escapes) {
		const { node, target } = effect;
		const callee = t.isCallExpression(node) || t.isOptionalCallExpression(node) ? unwrapJavaScriptExpression(node.callee).node : undefined;
		if ((t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) && callee.object === target && t.isIdentifier(target, { name: "require" }) && isUnshadowedGlobal(target, state, "require") && semanticStaticPropertyKey(callee.property, callee.computed) === "resolve") {
			resolverReceivers.push(effect);
			continue;
		}
		retainEscapeEffect(effect);
	}
	for (const effect of resolverReceivers) {
		const { node } = effect;
		const selected = [
			"global",
			"require",
			"resolve"
		];
		const mayAffectResolver = (effects, covered) => {
			if (!covered) return false;
			const matches = effects.filter((entry) => ambientEffectCovers(entry, selected));
			return matches.length === 0 || matches.some((entry) => semanticEffectMayPrecede(state, node, entry.node));
		};
		if ((t.isCallExpression(node) || t.isOptionalCallExpression(node)) && !mayAffectResolver(state.ambientWriteEffects, state.ambientWrites.covers(selected)) && !mayAffectResolver(state.ambientEscapeEffects, state.ambientEscapes.covers(selected)) && readSemanticRequireLoader(node, state, new Set()) === "commonjs-loader") continue;
		retainEscapeEffect(effect);
	}
	for (const { node, target, method } of staticReceivers) if (ambientPathMayObserveAt(state, node, ["global", ...method], "contents")) retainEscapeEffect({
		node,
		target,
		browserReceiver: false
	});
	else state.retainedGlobalCallReceivers.add(target);
	const firstInspectionPass = retainOpaquePrototypeInspections(prototypeInspections);
	if (firstInspectionPass.changed) {
		const secondInspectionPass = retainOpaquePrototypeInspections(firstInspectionPass.provisional);
		if (secondInspectionPass.changed) for (const inspection of secondInspectionPass.provisional) retainPrototypeInspectionArguments(inspection);
	}
	function retainOpaquePrototypeInspections(inspections) {
		const provisional = [];
		let changed = false;
		for (const inspection of inspections) {
			const invocation = interop.intrinsicInvocation(inspection.node, undefined, (capture, path) => ambientPathMayObserveAt(state, capture, ["global", ...path.slice(1)], "contents") || opaqueCodeMayChangeGlobalRead(capture, state, path[1] ?? ""));
			if (isReadOnlyPrototypeInspection(invocation)) provisional.push(inspection);
			else changed = retainPrototypeInspectionArguments(inspection) || changed;
		}
		return {
			provisional,
			changed
		};
	}
	function retainPrototypeInspectionArguments({ node, arguments: argumentValues }) {
		let changed = false;
		for (const target of argumentValues) changed = retainEscapeEffect({
			node,
			target,
			browserReceiver: false
		}, true) || changed;
		return changed;
	}
	function retainEscapeEffect({ node, target, browserReceiver, projection }, trackPrototypeInspectionEffects = false) {
		const resolved = ambientWrites(target, node, true, projection, undefined, "ambient-effects");
		if (browserReceiver && resolved.ownership === "ambient" && resolved.paths.length > 0 && resolved.paths.every((path) => path.length === 1 && path[0] === "global")) state.retainedGlobalCallReceivers.add(target);
		let changed = false;
		const paths = resolved.spreadEffectPaths === undefined ? resolved.paths : [...resolved.paths, ...resolved.spreadEffectPaths.flatMap((identity) => {
			const path = semanticArrayIterationPrototypeEffectPath(identity, "escape");
			return path === undefined ? [] : [path];
		})];
		for (const path of paths) {
			if (browserReceiver && path.length === 1 && path[0] === "global") continue;
			const retained = retainSemanticAmbientEffect(state, "escape", path, node);
			changed ||= retained && trackPrototypeInspectionEffects && (path[0] === semanticArrayIteratorPrototypePath[0] || path[0] === "global" && (path.length === 1 || path[1] === null || [
				"Array",
				"Function",
				"Object",
				"Reflect"
			].includes(path[1] ?? "")));
		}
		return changed;
	}
	if ([...browserReceiverMethods].some((method) => state.ambientWrites.covers(["global", method]))) state.ambientEscapes.retain(["global", null]);
}
var NATIVE_STATIC_METHODS, canonicalAmbientPath, arrayIteratorMethods, intrinsicPrototypeRead, isReadOnlyPrototypeInspection, retainedAmbientEffects, retainSemanticAmbientEffect, storedValueProjection, joinAmbientProjection, sameCaptures, createAmbientPathResolver, createGlobalReferenceReader, createGlobalPathReader, createGlobalPathRead, globalPathReplacement;
function init_javascriptSemanticAmbientWrites() {
	return (init_javascriptSemanticAmbientWrites = __esmMin((() => {
		init_javascriptSourceParser();
		init_javascriptAstValues();
		init_javascriptSemanticDirectInvocations();
		init_javascriptElectronMemberWrites();
		init_javascriptModuleInterop();
		init_javascriptSemanticEffectLog();
		init_javascriptSemanticState();
		init_javascriptSemanticMutationInitializers();
		init_javascriptSemanticIterationSources();
		init_javascriptSemanticPropertyPaths();
		init_javascriptSemanticObjectReferences();
		init_javascriptSemanticReturnedReferences();
		init_javascriptSemanticGlobalReference();
		init_javascriptSemanticRequireOriginSlot();
		init_javascriptSemanticArrayLayout();
		init_javascriptSemanticReferenceSources();
		init_javascriptSemanticCopiedReferencePaths();
		init_javascriptSemanticProjectedSources();
		init_javascriptSemanticTypedArrays();
		NATIVE_STATIC_METHODS = new Map([["Object", new Set([
			"assign",
			"create",
			"defineProperties",
			"defineProperty",
			"entries",
			"freeze",
			"fromEntries",
			"getOwnPropertyDescriptor",
			"getOwnPropertyDescriptors",
			"getOwnPropertyNames",
			"getOwnPropertySymbols",
			"getPrototypeOf",
			"groupBy",
			"hasOwn",
			"is",
			"isExtensible",
			"isFrozen",
			"isSealed",
			"keys",
			"preventExtensions",
			"seal",
			"setPrototypeOf",
			"values"
		])], ["Reflect", new Set([
			"apply",
			"construct",
			"defineProperty",
			"deleteProperty",
			"get",
			"getOwnPropertyDescriptor",
			"getPrototypeOf",
			"has",
			"isExtensible",
			"ownKeys",
			"preventExtensions",
			"set",
			"setPrototypeOf"
		])]]);
		canonicalAmbientPath = (path) => {
			if (path[0] !== "global") return path;
			let firstProperty = 1;
			while (GLOBAL_OBJECT_NAMES.includes(path[firstProperty] ?? "")) firstProperty += 1;
			return ["global", ...path.slice(firstProperty)];
		};
		arrayIteratorMethods = new Set([
			"entries",
			"keys",
			"values"
		]);
		intrinsicPrototypeRead = (invocation) => {
			if (invocation?.kind !== "known" || invocation.path.length !== 3) return undefined;
			const [, owner, method] = invocation.path;
			if (owner !== "Object" && owner !== "Reflect" || method !== "getPrototypeOf") return undefined;
			const target = invocation.arguments?.[0];
			return t.isNode(target) && !t.isSpreadElement(target) ? target : undefined;
		};
		isReadOnlyPrototypeInspection = (invocation) => intrinsicPrototypeRead(invocation) !== undefined && invocation?.arguments?.every((argument) => t.isExpression(argument)) === true;
		retainedAmbientEffects = new WeakMap();
		retainSemanticAmbientEffect = (state, kind, path, node) => {
			const selected = kind === "escape" ? [...path, null] : path;
			const byNode = retainedAmbientEffects.get(state) ?? new Map();
			const keys = byNode.get(node) ?? new Set();
			const key = JSON.stringify([kind, selected]);
			if (keys.has(key)) return false;
			keys.add(key);
			byNode.set(node, keys);
			retainedAmbientEffects.set(state, byNode);
			if (kind === "write") {
				state.ambientWrites.retain(selected);
				state.ambientWriteEffects.push({
					path: selected,
					node
				});
			} else {
				state.ambientEscapes.retain(selected);
				state.ambientEscapeEffects.push({
					path: selected,
					node
				});
			}
			return true;
		};
		storedValueProjection = (suffix, source, path, escapedContents) => {
			if (suffix !== undefined && path !== undefined && (!path.every((key, index) => index >= suffix.length || key === null || suffix[index] === null || key === suffix[index]) || suffix.length < path.length && !escapedContents)) return null;
			return suffix === undefined || path === undefined ? undefined : [...source.projection.map((key) => key === null || typeof key === "object" ? null : String(key)), ...suffix.slice(path.length)];
		};
		joinAmbientProjection = (left, right) => left === undefined || right === undefined || left.length !== right.length ? undefined : left.map((key, index) => key === right[index] ? key : null);
		sameCaptures = (left, right) => left === right || left !== undefined && right !== undefined && left.length === right.length && left.every(({ at, depth }, index) => at === right[index]?.at && depth === right[index]?.depth);
		createAmbientPathResolver = (state, possibleWrites, facts) => {
			const cached = new WeakMap();
			const memberPaths = new WeakMap();
			const returnedReferences = createSemanticReturnedReferences(state);
			const resolve = (node, capture, escapedContents = false, projection = [], receiver, observes) => {
				const prior = possibleWrites ? undefined : cached.get(node);
				if (prior !== undefined) return prior;
				const result = new Map();
				const callerPaths = new Map();
				let hasLocalIdentity = false;
				let projectedSpread = false;
				const unknownReasons = new Set();
				const pending = [{
					node,
					suffix: projection,
					readsAtSelf: undefined
				}];
				const queuedInitializers = new Map();
				const take = () => {
					for (;;) {
						const next = pending.pop();
						if (next === undefined || !("items" in next)) return next;
						if (next.remaining === 0) continue;
						next.remaining -= 1;
						if (next.remaining > 0) pending.push(next);
						return next.items[next.remaining];
					}
				};
				const admitted = (suffix) => receiver === undefined || suffix?.length !== 0;
				const expanded = new WeakMap();
				const expansionCaptures = observes === "array-receiver" ? new WeakMap() : undefined;
				let continued = false;
				const queue = (node, suffix, readsAtSelf, capturedSelections) => {
					if (!admitted(suffix)) return;
					continued = true;
					if (suffix === undefined) {
						const root = memberPaths.get(node)?.root;
						if (root !== undefined && expanded.get(root) === null) return;
					}
					pending.push({
						node,
						suffix,
						readsAtSelf,
						capturedSelections
					});
				};
				const retain = (path) => {
					let canonical = canonicalAmbientPath(path);
					for (;;) {
						result.set(JSON.stringify(canonical), canonical);
						if (possibleWrites && canonical[0] === "global" && canonical[2] === "prototype" && canonical[3] === "constructor") {
							canonical = [
								"global",
								canonical[1] ?? null,
								...canonical.slice(4)
							];
							continue;
						}
						if (!possibleWrites || canonical[0] !== "global" || canonical[1] !== null) break;
						canonical = canonicalAmbientPath(["global", ...canonical.slice(2)]);
					}
				};
				for (;;) {
					const current = take();
					if (current === undefined) break;
					continued = false;
					const pathsBefore = result.size;
					let resolvedIdentity = false;
					try {
						let memberPath = memberPaths.get(current.node);
						if (memberPath === undefined) {
							memberPath = electronMemberPath(current.node);
							memberPaths.set(current.node, memberPath);
						}
						const { root, members } = memberPath;
						let suffix = current.suffix === undefined || members.length === 0 ? current.suffix : [...members, ...current.suffix];
						let capturedSelections = observes === "array-receiver" && members.length > 0 ? [{
							at: current.node,
							depth: members.length
						}, ...semanticShiftCapturedSelections(current.capturedSelections, members.length) ?? []] : current.capturedSelections;
						const previous = expanded.get(root);
						if (previous !== undefined) {
							const previousCaptures = expansionCaptures?.get(root);
							if (!sameCaptures(previousCaptures, capturedSelections)) capturedSelections = undefined;
							const captureWidened = previousCaptures !== undefined && capturedSelections === undefined;
							if (previous === null) {
								resolvedIdentity = true;
								continue;
							}
							if (suffix !== undefined && previous.length === suffix.length) {
								const joined = joinSemanticPropertyPaths(previous, suffix);
								if (joined === previous && !captureWidened) {
									resolvedIdentity = true;
									continue;
								}
								suffix = joined;
							} else suffix = undefined;
							if (!possibleWrites) {
								const unresolved = {
									paths: [],
									callerPaths: [...callerPaths.values()],
									ownership: "unknown",
									unknownReasons: ["widened-projection"]
								};
								cached.set(node, unresolved);
								return unresolved;
							}
						}
						if (suffix === undefined) capturedSelections = undefined;
						expanded.set(root, suffix ?? null);
						expansionCaptures?.set(root, capturedSelections);
						if (suffix === undefined || suffix.includes(null)) unknownReasons.add("widened-projection");
						if (suffix === undefined && !possibleWrites) continue;
						const continueWith = (node, path = suffix) => queue(node, path, current.readsAtSelf, path !== undefined && suffix !== undefined && path.length <= suffix.length ? semanticShiftCapturedSelections(capturedSelections, path.length - suffix.length) : undefined);
						const continueReturned = (callee, path) => {
							const returned = returnedReferences(callee);
							unknownReasons.add("unresolved-call");
							for (const source of returned.references) continueWith(source.node, path === undefined ? undefined : [...source.projection.map((key) => key === null || typeof key === "object" ? null : String(key)), ...path]);
						};
						if (observes === "array-receiver" && (suffix === undefined || suffix.length === 0) && facts?.arrayIteratorReceiver(root)) return {
							paths: [],
							callerPaths: [],
							ownership: "local",
							unknownReasons: [],
							possibleArrayReceiver: true
						};
						if (!t.isIdentifier(root) && facts?.freshObject(root)) {
							receiver?.(root, suffix);
							if (suffix?.length === 0) {
								hasLocalIdentity = true;
								resolvedIdentity = true;
							}
							for (const [source, path] of facts?.stores.get(root) ?? []) {
								const readAt = (path === undefined ? undefined : capturedSelections?.find(({ depth }) => path.length <= depth)?.at) ?? capture;
								if (observes === "array-receiver" && readAt !== undefined && !semanticEffectMayPrecede(state, readAt, source.mutation)) continue;
								const stored = storedValueProjection(suffix, source, path, escapedContents);
								if (stored === null) continue;
								queue(source.node, stored, true);
							}
						}
						if (t.isMetaProperty(root) && root.meta.name === "import" && root.property.name === "meta") {
							retain(["import-meta", ...suffix ?? []]);
							resolvedIdentity = true;
							continue;
						}
						if (t.isThisExpression(root)) {
							const owner = javaScriptThisOwner(root, state.program, state.parentsByNode);
							if (owner === "global") {
								retain(["global", ...suffix ?? []]);
								resolvedIdentity = true;
								continue;
							}
							if (owner === "caller" && suffix !== undefined) {
								const path = canonicalAmbientPath(["global", ...suffix]);
								callerPaths.set(JSON.stringify(path), path);
							}
						}
						if (t.isIdentifier(root)) {
							if (isUnshadowedGlobal(root, state, "module")) {
								retain(["commonjs-module", ...suffix ?? []]);
								resolvedIdentity = true;
								continue;
							}
							if (globalObjectName(root, state) !== undefined) {
								retain(["global", ...suffix ?? []]);
								resolvedIdentity = true;
								continue;
							}
							if (isUnshadowedGlobal(root, state, root.name)) {
								retain([
									"global",
									root.name,
									...suffix ?? []
								]);
								resolvedIdentity = true;
								continue;
							}
							const binding = resolveSemanticBindingState(state, root, root.name);
							if (binding === undefined) continue;
							const readAt = current.readsAtSelf ? root : capture;
							const atRead = possibleWrites && readAt !== undefined ? semanticBindingAtRead(binding, readAt, state) : undefined;
							const selected = atRead?.binding ?? binding;
							if (possibleWrites && atRead?.hasDefiniteInitializer === false) unknownReasons.add("unresolved-value");
							const argument = possibleWrites ? semanticDirectInvocationArgument(root, binding, state) : undefined;
							if (argument !== undefined) queue(argument, suffix, true, capturedSelections);
							const bySuffix = queuedInitializers.get(selected) ?? new Map();
							queuedInitializers.set(selected, bySuffix);
							let suffixKey = JSON.stringify(suffix);
							let queued = bySuffix.get(suffixKey);
							if (queued?.capturedSelections !== undefined && !sameCaptures(queued.capturedSelections, capturedSelections)) {
								suffixKey = JSON.stringify(["factory-read", suffix]);
								capturedSelections = undefined;
								queued = bySuffix.get(suffixKey);
							}
							if (queued === undefined) {
								const stable = possibleWrites ? undefined : semanticStableInitializer(binding, state);
								const initializers = possibleWrites ? [...selected.initializers, ...selected.referenceInitializers] : stable === undefined ? [] : [stable];
								const items = [];
								for (const initializer of initializers) {
									if (semanticReferenceSourcesInactive(initializer, state)) continue;
									const path = semanticCopiedReferencePath(initializer, suffix ?? [null], escapedContents ? "escape" : "identity");
									if (path === null) continue;
									const projected = suffix === undefined || semanticReferenceIterationUnknown(initializer, state) ? undefined : path.map((key) => key === null || typeof key === "object" ? null : String(key));
									const captureDepth = "copyProjectionOffset" in initializer && typeof initializer.copyProjectionOffset === "number" ? initializer.copyProjectionOffset + 1 : initializer.projection.length;
									const retainedCaptures = projected === undefined || suffix === undefined ? undefined : semanticShiftCapturedSelections(capturedSelections, projected.length - suffix.length);
									const item = {
										node: initializer.node,
										readsAtSelf: true,
										suffix: projected,
										capturedSelections: observes === "array-receiver" && projected !== undefined && captureDepth > 0 ? semanticNormalizeCapturedSelections([{
											at: initializer.node,
											depth: captureDepth
										}, ...retainedCaptures?.filter(({ depth }) => depth > captureDepth) ?? []], projected.length) : retainedCaptures
									};
									if (admitted(item.suffix)) items.push(item);
								}
								queued = {
									items,
									capturedSelections,
									remaining: items.length
								};
								bySuffix.set(suffixKey, queued);
							}
							if (queued.items.length > 0) {
								continued = true;
								pending.push(queued);
							}
							continue;
						}
						if (possibleWrites && t.isNewExpression(root) && (suffix?.[0] === "__proto__" || suffix?.[0] === "constructor")) {
							continueWith(root.callee, suffix[0] === "__proto__" ? ["prototype", ...suffix.slice(1)] : suffix.slice(1));
							continue;
						}
						const callResult = possibleWrites && (t.isCallExpression(root) || t.isOptionalCallExpression(root)) ? facts?.callResult(root) : undefined;
						if (callResult?.kind === "prototype") {
							continueWith(callResult.target, suffix === undefined && observes !== "spread-effects" ? undefined : ["__proto__", ...suffix ?? []]);
							continue;
						}
						if (observes !== "array-receiver" && callResult?.kind === "array-iterator" && (suffix === undefined || suffix[0] === null || suffix[0] === "__proto__" || escapedContents && suffix.length === 0) && (callResult.receiver === undefined || resolve(callResult.receiver, callResult.receiver, false, [], undefined, "array-receiver").possibleArrayReceiver === true)) {
							retain([...semanticArrayIteratorPrototypePath, ...suffix?.slice(1) ?? []]);
							resolvedIdentity = true;
						}
						if (possibleWrites && (t.isCallExpression(root) || t.isOptionalCallExpression(root) || t.isNewExpression(root) || t.isTaggedTemplateExpression(root) || escapedContents && (t.isFunction(root) || t.isClass(root)))) {
							continueReturned(t.isFunction(root) || t.isClass(root) ? root : t.isTaggedTemplateExpression(root) ? root.tag : root.callee, suffix);
							continue;
						}
						if (possibleWrites && t.isConditionalExpression(root)) {
							continueWith(root.consequent);
							continueWith(root.alternate);
							continue;
						}
						if (possibleWrites && t.isLogicalExpression(root)) {
							continueWith(root.left);
							continueWith(root.right);
							continue;
						}
						if (possibleWrites && t.isSequenceExpression(root)) {
							const value = root.expressions.at(-1);
							if (value !== undefined) continueWith(value);
							continue;
						}
						if (possibleWrites && t.isAssignmentExpression(root) && root.operator === "=") {
							continueWith(root.right);
							continue;
						}
						const key = suffix?.[0];
						if (escapedContents && suffix?.length === 0) {
							if (t.isObjectExpression(root)) {
								for (const property of root.properties) if (t.isSpreadElement(property)) continueWith(property.argument, [null]);
								else if (t.isObjectProperty(property) && t.isExpression(property.value)) continueWith(property.value, []);
								else if (t.isObjectMethod(property) && property.kind === "get") continueReturned(property, []);
								continue;
							}
							if (t.isArrayExpression(root)) {
								for (const element of root.elements) if (t.isSpreadElement(element)) continueWith(element.argument, []);
								else if (t.isExpression(element)) continueWith(element, []);
								continue;
							}
						}
						if (suffix !== undefined && key === undefined) continue;
						if (t.isObjectExpression(root)) {
							if (possibleWrites) {
								for (const property of root.properties) {
									if (t.isSpreadElement(property)) continueWith(property.argument);
									else if (t.isObjectProperty(property) && t.isExpression(property.value) || t.isObjectMethod(property) && property.kind === "get") {
										const ownKey = semanticStaticPropertyKey(property.key, property.computed);
										if (suffix === undefined || key === null || ownKey === null || ownKey === key) {
											if (t.isObjectMethod(property)) continueReturned(property, suffix?.slice(1));
											else if (t.isExpression(property.value)) continueWith(property.value, suffix?.slice(1));
										}
									}
								}
							} else if (suffix !== undefined && key !== null && root.properties.every((property) => t.isObjectProperty(property) && semanticStaticPropertyKey(property.key, property.computed) !== null)) {
								const property = root.properties.findLast((property) => t.isObjectProperty(property) && semanticStaticPropertyKey(property.key, property.computed) === key);
								if (t.isObjectProperty(property) && t.isExpression(property.value)) continueWith(property.value, suffix.slice(1));
							}
						} else if (t.isArrayExpression(root)) {
							const hasSpread = root.elements.some(t.isSpreadElement);
							if (possibleWrites && suffix?.[0] === "__proto__") {
								retain([
									"global",
									"Array",
									"prototype",
									...suffix.slice(1)
								]);
								resolvedIdentity = true;
							} else if (suffix === undefined) {
								if (hasSpread && observes === "ambient-effects") projectedSpread = true;
								for (const element of root.elements) if (t.isSpreadElement(element)) continueWith(element.argument);
								else if (t.isExpression(element)) continueWith(element);
							} else if (hasSpread ? possibleWrites && (observes === "spread-effects" || observes === "array-receiver") : possibleWrites || key !== null) {
								const remaining = suffix.slice(1);
								for (const source of semanticArrayPropertyReferences(root, [key ?? null])) {
									if (observes === "array-receiver" && source.iterableFallbackPath !== undefined && t.isArrayExpression(unwrapJavaScriptExpression(source.node).node)) {
										const path = [...source.path.map((part) => part === null || typeof part === "object" ? null : String(part)), ...remaining];
										queue(source.node, path, current.readsAtSelf, semanticNormalizeCapturedSelections(semanticCapturedSelectionsAfterPropertyRead(capturedSelections, source), path.length));
										continue;
									}
									continueWith(source.node, remaining);
									if (source.iterableFallbackPath !== undefined) continueWith(source.node, [null, ...remaining]);
								}
							} else if (hasSpread && observes === "ambient-effects" && (key === null || key !== undefined && semanticArrayIndex(key) !== null)) {
								projectedSpread = true;
							}
						}
					} finally {
						if (!resolvedIdentity && !continued && result.size === pathsBefore) unknownReasons.add("unresolved-value");
					}
				}
				const paths = [...result.values()];
				const spreadEffectPaths = projectedSpread ? resolve(node, capture, escapedContents, projection, undefined, "spread-effects").paths : undefined;
				if (paths.length > 0 && hasLocalIdentity) unknownReasons.add("mixed-identities");
				const resolution = {
					paths,
					...spreadEffectPaths === undefined ? {} : { spreadEffectPaths },
					callerPaths: [...callerPaths.values()],
					ownership: unknownReasons.size > 0 ? "unknown" : paths.length > 0 ? "ambient" : hasLocalIdentity ? "local" : "unknown",
					unknownReasons: [...unknownReasons]
				};
				if (!possibleWrites) cached.set(node, resolution);
				return resolution;
			};
			return resolve;
		};
		createGlobalReferenceReader = (state, path) => {
			const read = createGlobalPathRead(state, path);
			return (callee) => {
				const namespace = globalReferenceNamespace(callee, state, path);
				return namespace === undefined ? { status: "unrelated" } : read(callee, namespace);
			};
		};
		createGlobalPathReader = (state, path) => {
			const read = createGlobalPathRead(state, path);
			return (site) => read(site, null);
		};
		createGlobalPathRead = (state, path) => {
			const selected = ["global", ...path];
			let writesGeneration = -1;
			let escapesGeneration = -1;
			const byNamespace = new Map();
			return (site, namespace) => {
				const covered = (paths) => paths.covers(selected) || namespace !== null && paths.covers(["global", namespace]);
				const writesCovered = covered(state.ambientWrites);
				const escapesCovered = covered(state.ambientEscapes);
				if (!writesCovered && !escapesCovered) return { status: "unmodified" };
				if (writesGeneration !== state.ambientWriteEffects.length || escapesGeneration !== state.ambientEscapeEffects.length) {
					writesGeneration = state.ambientWriteEffects.length;
					escapesGeneration = state.ambientEscapeEffects.length;
					byNamespace.clear();
				}
				let effects = byNamespace.get(namespace);
				if (effects === undefined) {
					const matches = (effect) => ambientEffectCovers(effect, selected) || namespace !== null && ambientEffectCovers(effect, ["global", namespace]);
					effects = {
						writes: state.ambientWriteEffects.filter(matches),
						escapes: state.ambientEscapeEffects.filter(matches)
					};
					byNamespace.set(namespace, effects);
				}
				const escapePrecedesRead = effects.escapes.some(({ node }) => {
					if ((t.isCallExpression(node) || t.isOptionalCallExpression(node)) && node.callee === site) return false;
					return semanticEffectMayPrecede(state, site, node);
				});
				if (escapesCovered && effects.escapes.length === 0 || escapePrecedesRead || writesCovered && effects.writes.length === 0) return { status: "unknown" };
				const active = effects.writes.filter((effect) => semanticEffectMayPrecede(state, site, effect.node));
				if (active.length === 0) return { status: "unmodified" };
				if (active.some((effect) => effect.path.length !== selected.length || !effect.path.every((key, index) => key === selected[index]))) return { status: "unknown" };
				return globalPathReplacement(state, path, site, active);
			};
		};
		globalPathReplacement = (state, path, site, effects) => {
			let replacement;
			for (const effect of effects) {
				const write = effect.node;
				const writeNamespace = t.isAssignmentExpression(write) ? globalReferenceNamespace(write.left, state, path) : undefined;
				if (t.isAssignmentExpression(write, { operator: "=" }) && writeNamespace !== undefined && (writeNamespace === null || !state.ambientWrites.covers(["global", writeNamespace])) && semanticDefiniteEffectPrecedesReference(write, site, state.parentsByNode) && (replacement === undefined || semanticDefiniteEffectPrecedesReference(replacement, write, state.parentsByNode))) replacement = write;
			}
			if (replacement === undefined) return { status: "unknown" };
			const confirmed = replacement;
			if (effects.some((effect) => effect.node !== confirmed && semanticEffectMayFollow(state, confirmed, effect.node) && (effect.node === undefined || !semanticDefiniteEffectPrecedesReference(effect.node, confirmed, state.parentsByNode)))) return { status: "unknown" };
			return {
				status: "replacement",
				value: confirmed.right
			};
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptBuiltinResourceMethods.js
var BUILTIN_RESOURCE_METHODS, inherited, releases, builtinResourceReleases, BUILTIN_RESOURCE_SPECIFIERS;
function init_javascriptBuiltinResourceMethods() {
	return (init_javascriptBuiltinResourceMethods = __esmMin((() => {
		BUILTIN_RESOURCE_METHODS = {
			fs: [
				"open",
				"openSync",
				"createReadStream",
				"createWriteStream"
			],
			"fs/promises": ["open"],
			net: ["connect", "createConnection"],
			tls: ["connect"]
		};
		inherited = { owner: "prototype" };
		releases = {
			"fs:createReadStream": {
				close: {
					owner: "prototype",
					definingPrototypeDepth: 1,
					delegates: ["destroy"]
				},
				destroy: {
					owner: "prototype",
					definingPrototypeDepth: 2
				}
			},
			"fs:createWriteStream": {
				close: {
					owner: "prototype",
					definingPrototypeDepth: 1,
					delegates: ["end", "destroy"]
				},
				destroy: {
					owner: "prototype",
					definingPrototypeDepth: 2
				},
				end: {
					owner: "prototype",
					definingPrototypeDepth: 2
				}
			},
			"fs/promises:open": { close: { owner: "instance" } },
			"net:connect": {
				destroy: inherited,
				end: inherited
			},
			"net:createConnection": {
				destroy: inherited,
				end: inherited
			},
			"tls:connect": {
				destroy: inherited,
				end: inherited
			}
		};
		builtinResourceReleases = (specifier, method) => releases[`${specifier}:${method}`];
		BUILTIN_RESOURCE_SPECIFIERS = Object.keys(BUILTIN_RESOURCE_METHODS);
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticRequireOrigin.js
/** Admission and indexing share the same direct, projected and iteration leaves. */
function* commonJsDelegateWriteTargets(node) {
	const write = semanticWriteSiteTarget(node);
	if (write === null) return;
	for (const target of semanticWriteTargets(write)) {
		if (!t.isMemberExpression(target) && !t.isOptionalMemberExpression(target)) continue;
		const key = semanticStaticPropertyKey(target.property, target.computed);
		if (key === "require" || key === null && target.computed) yield target;
	}
}
var possibleCommonJsDelegateWriteStates, observePossibleCommonJsDelegateWrite, hasPossibleCommonJsDelegateWrite, invalidateSemanticRequireDelegateWrites, commonJsDelegateChangedAt, commonJsLoaderAt, semanticRequireLoaderAt, requireLoaderValueAt, semanticFactoryRequireLoaderAt, semanticFactoryLoaderMemberAt, isSemanticCreateRequireBinding, createRequireFactoryCallAt, sourceRelativeCreateRequireBaseAt, hasSemanticCreateRequireFactoryOrigin, isCreateRequireOrigin, assignmentValueSources, selectedRequireSourcesAt, semanticSelectedMemberMayHaveChanged, semanticRequireCallAt, isWrapperRequireInitializerCall, moduleRequireWrites, moduleReturnedReferences, returnedLoaderReferences, loaderSourceContextKey, inheritLoaderSourceContext, loaderMemberSource, memberFeedsEarlierAssignment, projectedLoaderSources, loaderObjectPropertySources, isCommonJsModuleObject, isCommonJsRequireDelegate, hasCommonJsModuleSource, semanticModuleRequireReceiver, semanticModuleRequireCallAt, writesModuleRequire, objectMayProvideRequire, semanticOriginalGlobalProcessAt, globalProcessReaders, semanticEffectMayReachOriginalGlobalProcess, globalProcessAt, semanticGlobalProcessOrigin, semanticGlobalProcessPathOrigin, isConditionalRequireAt, semanticRequireOriginCandidate, semanticRequireOrigin, semanticRequireExportsIdentity, MUTABLE_BUILTIN_DEFAULTS, semanticMutableBuiltinOrigin;
function init_javascriptSemanticRequireOrigin() {
	return (init_javascriptSemanticRequireOrigin = __esmMin((() => {
		init_javascriptSemanticProjectedSources();
		init_javascriptSemanticAmbientWrites();
		init_javascriptSemanticTraversal();
		init_javascriptBuiltinResourceMethods();
		init_javascriptSourceParser();
		init_javascriptSemanticState();
		init_javascriptSemanticMutationInitializers();
		init_javascriptAstValues();
		init_javascriptSemanticPropertyPaths();
		init_javascriptStaticAnalysisHelpers();
		init_javascriptModuleInterop();
		init_javascriptSemanticEffectLog();
		init_javascriptSemanticReturnedReferences();
		init_javascriptSemanticIterationSources();
		init_javascriptSemanticReferenceSources();
		init_javascriptSemanticObjectReferences();
		init_javascriptSemanticAliasSelections();
		init_javascriptSemanticRequireOriginSlot();
		init_javascriptSemanticGlobalReference();
		possibleCommonJsDelegateWriteStates = new WeakSet();
		observePossibleCommonJsDelegateWrite = (node, state) => {
			if (possibleCommonJsDelegateWriteStates.has(state)) return;
			if (semanticIterationSources(node, state.parentsByNode.get(node) ?? null).some((source) => source.kind === "reference-store")) possibleCommonJsDelegateWriteStates.add(state);
			if (!commonJsDelegateWriteTargets(node).next().done) possibleCommonJsDelegateWriteStates.add(state);
			else if (t.isCallExpression(node) || t.isOptionalCallExpression(node)) possibleCommonJsDelegateWriteStates.add(state);
		};
		hasPossibleCommonJsDelegateWrite = (state) => possibleCommonJsDelegateWriteStates.has(state);
		invalidateSemanticRequireDelegateWrites = (state) => {
			moduleRequireWrites.delete(state);
			moduleReturnedReferences.delete(state);
		};
		commonJsDelegateChangedAt = (node, state) => writesModuleRequire(state).some((write) => semanticEffectMayPrecede(state, node, write.node));
		commonJsLoaderAt = (node, state) => commonJsDelegateChangedAt(node, state) ? "unknown" : "commonjs-loader";
		semanticRequireLoaderAt = (node, state, factoryBindingIds) => {
			const callee = unwrapJavaScriptExpression(node.callee).node;
			const loader = (t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) && ["resolve", "main"].includes(semanticStaticPropertyKey(callee.property, callee.computed) ?? "") ? callee.object : callee;
			const selected = selectedRequireSourcesAt(loader, node, state, factoryBindingIds)?.loader;
			return selected !== undefined && selected !== "unknown" ? selected : requireLoaderValueAt(loader, node, state, factoryBindingIds);
		};
		requireLoaderValueAt = (value, node, state, factoryBindingIds) => {
			const callee = unwrapJavaScriptExpression(value).node;
			if (!t.isIdentifier(callee)) return "local";
			const loader = callee;
			const binding = resolveSemanticBindingState(state, loader, loader.name);
			if (binding !== undefined && factoryBindingIds.has(binding.bindingId)) return semanticBindingHasPriorValueWrite(node, binding, state) ? "unknown" : "factory-loader";
			if (binding !== undefined && isSemanticCreateRequireBinding(binding, state)) return "create-require";
			if (loader.name !== "require") return "local";
			if (binding === undefined) {
				if (javaScriptRuntimeContext(state.program) !== "commonjs" || semanticResolutionBlocked(state, loader, "require")) return "unknown";
				return ambientBindingMayObserveWriteAt(state, node, "require") ? "unknown" : commonJsLoaderAt(node, state);
			}
			if (binding.hostOrigin === "commonjs-wrapper" && [...binding.declarationKinds].every((kind) => kind === "var")) {
				if (binding.definitions.some(({ kind }) => kind === "function")) return "local";
				return semanticBindingHasPriorValueWrite(node, binding, state) ? "unknown" : commonJsLoaderAt(node, state);
			}
			if ((t.isCallExpression(node) || t.isOptionalCallExpression(node) || t.isNewExpression(node)) && isWrapperRequireInitializerCall(binding, node, state)) return binding.hostOrigin === "commonjs-wrapper" || javaScriptRuntimeContext(state.program) === "commonjs" ? commonJsLoaderAt(node, state) : "unknown";
			const wrapperBinding = commonJsWrapperBindingDeclaration(loader, "require", state);
			if (wrapperBinding !== undefined && !semanticBindingHasPriorValueWrite(node, wrapperBinding, state)) return commonJsLoaderAt(node, state);
			const initializer = semanticStableInitializer(binding, state)?.node;
			if ((binding.kind === "function" || binding.kind === "class") && initializer !== undefined) return "local";
			if (binding.declarationKinds.size === 1 && binding.declarationKinds.has("const") && (t.isFunctionExpression(initializer) || t.isArrowFunctionExpression(initializer))) return "local";
			return "unknown";
		};
		semanticFactoryRequireLoaderAt = (node, state, bindingIds) => {
			const callee = unwrapJavaScriptExpression(node.callee).node;
			if (t.isIdentifier(callee)) return semanticFactoryLoaderMemberAt(node, state, bindingIds, null);
			if ((t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) && semanticStaticPropertyKey(callee.property, callee.computed) === "bind") return semanticFactoryLoaderMemberAt(node, state, bindingIds, "bind");
			return undefined;
		};
		semanticFactoryLoaderMemberAt = (node, state, bindingIds, member) => {
			const callee = unwrapJavaScriptExpression(node.callee).node;
			let loader;
			if (member === null) {
				if (t.isIdentifier(callee)) loader = callee;
			} else if ((t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) && semanticStaticPropertyKey(callee.property, callee.computed) === member) {
				const root = unwrapJavaScriptExpression(callee.object).node;
				if (t.isIdentifier(root)) loader = root;
			}
			if (loader === undefined) return undefined;
			const binding = resolveSemanticBindingState(state, loader, loader.name);
			if (binding === undefined || !bindingIds.has(binding.bindingId)) return undefined;
			return semanticBindingHasPriorValueWrite(node, binding, state) ? "unknown" : "factory-loader";
		};
		isSemanticCreateRequireBinding = (binding, state) => {
			if (binding.initializers.length !== 1) return false;
			const initializer = semanticStableInitializer(binding, state)?.node;
			return createRequireFactoryCallAt(initializer, state)?.loader === "create-require";
		};
		createRequireFactoryCallAt = (initializer, state, factoryBindingIds = new Set()) => !t.isCallExpression(initializer) ? undefined : selectedRequireSourcesAt(initializer.callee, initializer, state, factoryBindingIds, "factory");
		sourceRelativeCreateRequireBaseAt = (value, state) => {
			if (value === undefined) return undefined;
			if (isUnmodifiedImportMetaUrl(value, state)) return { kind: "source-file" };
			if (!t.isNewExpression(value) || value.arguments.length !== 2) return undefined;
			const callee = unwrapJavaScriptExpression(value.callee).node;
			if (!t.isIdentifier(callee, { name: "URL" }) || !isUnmodifiedGlobalReference(callee, state, "URL") || !isUnmodifiedImportMetaUrl(t.isNode(value.arguments[1]) ? value.arguments[1] : undefined, state)) return undefined;
			const urlPath = staticSourceRelativeUrlPath(value);
			return urlPath === undefined || urlPath.directory || urlPath.path.startsWith("/") ? undefined : {
				kind: "source-relative-file",
				path: urlPath.path
			};
		};
		hasSemanticCreateRequireFactoryOrigin = (initializer, state) => {
			const factory = createRequireFactoryCallAt(initializer, state);
			return factory !== undefined && factory.loader !== "local";
		};
		isCreateRequireOrigin = (origin, selected) => {
			if (!["module", "node:module"].includes(origin.specifier)) return false;
			const path = [...origin.importedPath, ...selected];
			return path.length === 1 && path[0] === "createRequire" || (origin.resolutionMode ?? "import") === "import" && path.length === 2 && path[0] === "default" && path[1] === "createRequire";
		};
		assignmentValueSources = (node) => node.operator === "=" ? [node.right] : [
			"||=",
			"&&=",
			"??="
		].includes(node.operator) ? [node.left, node.right] : [];
		selectedRequireSourcesAt = (root, site, state, factoryBindingIds, target = "loader") => {
			const pending = [{
				node: root,
				path: []
			}];
			const seen = new WeakMap();
			let count = 0;
			let found = false;
			let candidate = false;
			let loaderBinding = false;
			let selectedLoader;
			let unknown = false;
			let local = false;
			let nativeMemberAlternative = false;
			let sourceRelative = true;
			let sourceRelativeBase;
			while (pending.length > 0) {
				const current = pending.pop();
				const node = unwrapJavaScriptExpression(current.node).node;
				const genericMember = current.path.length === 1 && semanticAliasSelectionChoices(current.path[0]).every((key) => key === "call" || key === "apply");
				const nativeGenericMember = target === "loader" && genericMember && t.isIdentifier(node) && requireLoaderValueAt(node, node, state, factoryBindingIds) !== "local";
				const key = JSON.stringify([current.path, loaderSourceContextKey(current)]);
				const paths = seen.get(node) ?? new Set();
				if (paths.has(key)) continue;
				paths.add(key);
				seen.set(node, paths);
				if (++count > state.precision.alias_selections) {
					state.valueResourceLimits.add("alias-selections");
					return {
						loader: "unknown",
						sourceRelative: false
					};
				}
				if (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) {
					pending.push(...inheritLoaderSourceContext(current, [loaderMemberSource(current, node, state.parentsByNode)]));
				} else if (t.isIdentifier(node)) {
					if (target === "loader" && current.path.length === 0) {
						const captured = requireLoaderValueAt(node, node, state, factoryBindingIds);
						if (captured !== "local" && captured !== "create-require") {
							const invoked = captured === "commonjs-loader" ? commonJsLoaderAt(site, state) : captured;
							found = true;
							candidate ||= invoked === "unknown" && t.isIdentifier(node, { name: "require" }) && isConditionalRequireAt(node, node, state);
							unknown ||= invoked === "unknown" || selectedLoader !== undefined && selectedLoader !== invoked;
							selectedLoader ??= invoked;
							continue;
						}
					}
					const binding = resolveSemanticBindingState(state, node, node.name);
					if (binding === undefined) {
						unknown = true;
						continue;
					}
					loaderBinding ||= target === "loader" && binding.initializers.some((source) => hasSemanticCreateRequireFactoryOrigin(source.node, state) || t.isIdentifier(source.node) && requireLoaderValueAt(source.node, source.node, state, factoryBindingIds) !== "local");
					const facts = semanticProjectedSourceFactsAtRead(binding, node, current.path, state, true, current.readAt ?? node, current.capturedSelections);
					if (nativeGenericMember) nativeMemberAlternative ||= facts === undefined || facts.sources.length === 0 || !facts.sources.every(({ node: source }) => {
						const value = unwrapJavaScriptExpression(source).node;
						return t.isFunctionExpression(value) || t.isArrowFunctionExpression(value);
					});
					if (target === "factory" && binding.directOrigins.length > 0) {
						const native = binding.directOrigins.some((origin) => isCreateRequireOrigin(origin, current.path));
						loaderBinding ||= native;
						if (facts?.retainsOrigin) {
							found ||= native;
							local ||= !native;
							if (native) selectedLoader = "create-require";
						}
					}
					if (facts === undefined) {
						unknown = true;
						const retained = semanticBindingAtRead(binding, node, state).binding;
						pending.push(...inheritLoaderSourceContext(current, projectedLoaderSources(current, [...retained.initializers, ...retained.referenceInitializers].filter((source) => !semanticReferenceSourcesInactive(source, state)).map((source) => ({
							node: source.node,
							path: [...source.projection, ...current.path]
						})))));
					} else {
						unknown ||= facts.sources.length === 0 && !(target === "factory" && facts.retainsOrigin && binding.directOrigins.length > 0);
						pending.push(...inheritLoaderSourceContext(current, projectedLoaderSources(current, facts.sources)));
					}
				} else if (t.isObjectExpression(node) || t.isArrayExpression(node)) {
					if (current.path.length === 0) {
						local = true;
						continue;
					}
					const sources = loaderObjectPropertySources(current, node, state);
					unknown ||= sources.length === 0;
					pending.push(...inheritLoaderSourceContext(current, sources));
				} else if (t.isSequenceExpression(node)) {
					const last = node.expressions.at(-1);
					if (last !== undefined) pending.push({
						...current,
						node: last
					});
				} else if (t.isAssignmentExpression(node)) {
					for (const source of assignmentValueSources(node)) pending.push({
						...current,
						node: source
					});
				} else if (t.isConditionalExpression(node) || t.isLogicalExpression(node)) {
					pending.push({
						...current,
						node: t.isConditionalExpression(node) ? node.consequent : node.left
					}, {
						...current,
						node: t.isConditionalExpression(node) ? node.alternate : node.right
					});
				} else if (t.isCallExpression(node)) {
					const callee = unwrapJavaScriptExpression(node.callee).node;
					if (target === "loader" && current.path.length === 0 && t.isFunction(callee)) {
						if (callee.async || callee.generator) {
							local = true;
							continue;
						}
						const returned = returnedLoaderReferences(state, "direct-call")(node.callee, node);
						unknown ||= returned.unresolvedInvocation === true || !t.isArrowFunctionExpression(callee) || t.isBlockStatement(callee.body);
						pending.push(...inheritLoaderSourceContext(current, returned.references.map((reference) => ({
							node: reference.node,
							path: reference.projection,
							readAt: node
						}))));
						continue;
					}
					if (target === "factory") {
						const origin = semanticRequireOrigin(node, state)?.origin;
						if (origin !== undefined && isCreateRequireOrigin(origin, current.path)) {
							found = true;
							selectedLoader = "create-require";
						} else unknown = true;
					} else if (current.path.length === 0 || genericMember) {
						const factory = createRequireFactoryCallAt(node, state, factoryBindingIds);
						if (factory !== undefined && factory.loader !== "local") {
							if (genericMember) {
								nativeMemberAlternative = true;
								if (factory.loader === "unknown") {
									loaderBinding = true;
									unknown = true;
								}
							} else {
								found = true;
								unknown ||= factory.loader === "unknown" || selectedLoader !== undefined && selectedLoader !== "create-require";
								selectedLoader ??= "create-require";
								unknown ||= state.conditionallySkippedExpressions.has(node);
								const factoryBase = sourceRelativeCreateRequireBaseAt(node.arguments[0], state);
								if (factoryBase === undefined) sourceRelative = false;
								else if (sourceRelativeBase === undefined) sourceRelativeBase = factoryBase;
								else if (sourceRelativeBase.kind !== factoryBase.kind || sourceRelativeBase.kind === "source-relative-file" && factoryBase.kind === "source-relative-file" && sourceRelativeBase.path !== factoryBase.path) {
									sourceRelative = false;
								}
							}
						} else if (factory?.loader === "local") local = true;
						else unknown = true;
					} else unknown = true;
				} else if (current.path.length === 0 && (t.isFunction(node) || t.isClassExpression(node) || t.isLiteral(node))) {
					local = true;
				} else {
					unknown = true;
				}
			}
			return found || local || loaderBinding && unknown ? {
				loader: unknown && (found || loaderBinding) || local && (found || nativeMemberAlternative) ? "unknown" : found ? selectedLoader ?? "unknown" : "local",
				sourceRelative: found && sourceRelative && !unknown,
				...candidate ? { loaderAuthority: "candidate" } : {},
				...found && !unknown && sourceRelative && sourceRelativeBase?.kind === "source-relative-file" ? { sourceRelativePath: sourceRelativeBase.path } : {}
			} : undefined;
		};
		semanticSelectedMemberMayHaveChanged = (index, site, member) => {
			const effects = index.effectsForReferenceAt(site, member);
			const targetDepth = semanticMemberChain(member)?.members.length;
			return !effects.memberEffectsIndexed || effects.effects.some(({ kind, timing, path }) => timing !== "after" && (kind === "escape" || kind === "member-write" && (targetDepth === undefined || path === undefined || path.length <= targetDepth)));
		};
		semanticRequireCallAt = (node, state, factoryBindingIds, index) => {
			const callee = unwrapJavaScriptExpression(node.callee).node;
			if ((t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) && ["call", "apply"].includes(semanticStaticPropertyKey(callee.property, callee.computed) ?? "") && selectedRequireSourcesAt(callee, node, state, factoryBindingIds)?.loader === "local") return {
				operation: "load",
				loader: "local",
				arguments: undefined,
				sourceRelative: false
			};
			if (index !== undefined) {
				let member = callee;
				while (t.isMemberExpression(member) || t.isOptionalMemberExpression(member)) {
					const key = semanticStaticPropertyKey(member.property, member.computed);
					if (key === "call" || key === "apply" || key === "resolve") {
						const loader = requireLoaderValueAt(member.object, node, state, factoryBindingIds);
						const selected = loader === "local" ? selectedRequireSourcesAt(member.object, node, state, factoryBindingIds) : undefined;
						if (loader === "local" && (selected === undefined || selected.loader === "local")) {
							member = unwrapJavaScriptExpression(member.object).node;
							continue;
						}
						if (semanticSelectedMemberMayHaveChanged(index, node, member)) return {
							operation: "load",
							loader: "unknown",
							arguments: member === callee && key === "resolve" ? node.arguments : undefined,
							sourceRelative: false,
							memberUnproven: true
						};
					}
					member = unwrapJavaScriptExpression(member.object).node;
				}
			}
			if (semanticModuleRequireCallAt(node, state)) return {
				operation: "load",
				loader: "unknown",
				arguments: undefined,
				sourceRelative: false
			};
			if ((t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) && semanticStaticPropertyKey(callee.property, callee.computed) === "resolve") {
				const loader = requireLoaderValueAt(callee.object, node, state, factoryBindingIds);
				if (loader === "unknown") {
					const receiver = unwrapJavaScriptExpression(callee.object).node;
					const candidate = t.isIdentifier(receiver, { name: "require" }) && isConditionalRequireAt(receiver, node, state);
					return {
						operation: "resolve",
						loader,
						arguments: candidate ? node.arguments : undefined,
						sourceRelative: false,
						...candidate ? { loaderAuthority: "candidate" } : {}
					};
				}
				if (loader === "commonjs-loader" || loader === "create-require") {
					const selected = selectedRequireSourcesAt(callee.object, node, state, factoryBindingIds);
					return {
						operation: "resolve",
						loader: selected?.loader ?? loader,
						arguments: node.arguments,
						sourceRelative: selected?.sourceRelative ?? loader === "commonjs-loader",
						...selected?.sourceRelativePath === undefined ? {} : { sourceRelativePath: selected.sourceRelativePath }
					};
				}
			}
			if (t.isNewExpression(node)) {
				const loader = requireLoaderValueAt(node.callee, node, state, factoryBindingIds);
				const selected = selectedRequireSourcesAt(node.callee, node, state, factoryBindingIds);
				if (selected !== undefined || loader !== "local") return {
					operation: "load",
					loader: selected?.loader ?? loader,
					arguments: node.arguments,
					sourceRelative: selected?.sourceRelative ?? loader !== "create-require",
					...selected?.loaderAuthority === "candidate" ? { loaderAuthority: "candidate" } : {},
					...selected?.sourceRelativePath === undefined ? {} : { sourceRelativePath: selected.sourceRelativePath }
				};
			}
			const interop = semanticModuleInteropWithAmbientWrites(state);
			if (!t.isNewExpression(node)) {
				const sourceRelativePaths = new Map();
				const invocation = interop.intrinsicInvocation(node, (callee) => {
					const loader = requireLoaderValueAt(callee, node, state, factoryBindingIds);
					if (loader !== "local" && loader !== "create-require") {
						const root = unwrapJavaScriptExpression(callee).node;
						const candidate = loader === "unknown" && t.isIdentifier(root, { name: "require" }) && isConditionalRequireAt(root, node, state);
						return [
							"require-loader",
							loader,
							"relative",
							...candidate ? ["candidate"] : []
						];
					}
					const selected = selectedRequireSourcesAt(callee, node, state, factoryBindingIds);
					if (selected !== undefined) {
						const path = [
							"require-loader",
							selected.loader,
							selected.sourceRelative ? "relative" : "unknown",
							...selected.loaderAuthority === "candidate" ? ["candidate"] : []
						];
						if (selected.sourceRelativePath !== undefined) sourceRelativePaths.set(path, selected.sourceRelativePath);
						return path;
					}
					return interop.intrinsicPath(callee);
				});
				if (invocation?.path[0] === "require-loader") {
					const sourceRelativePath = sourceRelativePaths.get(invocation.path);
					return {
						operation: "load",
						loader: invocation.path[1] === "local" ? "local" : invocation.kind === "opaque" ? "unknown" : invocation.path[1],
						arguments: invocation.arguments,
						...invocation.kind === "known" && invocation.path[3] === "candidate" ? { loaderAuthority: "candidate" } : {},
						sourceRelative: invocation.kind === "known" && invocation.path[2] === "relative",
						...invocation.kind === "known" && sourceRelativePath !== undefined ? { sourceRelativePath } : {}
					};
				}
			}
			const factory = semanticFactoryRequireLoaderAt(node, state, factoryBindingIds);
			return factory === undefined ? undefined : {
				operation: "load",
				loader: factory,
				arguments: node.arguments.slice(t.isIdentifier(node.callee) ? 0 : 1),
				sourceRelative: true
			};
		};
		isWrapperRequireInitializerCall = (binding, node, state) => {
			const scope = state.scopesById.get(binding.scopeId);
			if (scope?.kind !== "program" || binding.kind !== "variable" || binding.declarationKinds.size !== 1 || !binding.declarationKinds.has("var") || binding.initializers.length !== 1 || binding.initializers[0]?.node !== node) return false;
			const assignment = state.parentsByNode.get(node);
			if (!t.isAssignmentExpression(assignment) || assignment.right !== node || state.conditionallySkippedExpressions.has(node)) return false;
			const statement = state.parentsByNode.get(assignment);
			if (!t.isExpressionStatement(statement)) return false;
			if (state.parentsByNode.get(statement) !== state.program) return false;
			const target = unwrapJavaScriptExpression(assignment.left).node;
			return t.isIdentifier(target, { name: "require" }) && resolveSemanticBindingState(state, target, target.name) === binding;
		};
		moduleRequireWrites = new WeakMap();
		moduleReturnedReferences = new WeakMap();
		returnedLoaderReferences = (state, mode) => {
			let factories = moduleReturnedReferences.get(state);
			if (factories === undefined) {
				factories = new Map();
				moduleReturnedReferences.set(state, factories);
			}
			let returned = factories.get(mode);
			if (returned === undefined) {
				returned = createSemanticReturnedReferences(state, mode);
				factories.set(mode, returned);
			}
			return returned;
		};
		loaderSourceContextKey = (source) => JSON.stringify([
			source.eligibility,
			source.readAt?.start,
			source.readAt?.end,
			source.capturedSelections?.map(({ at, depth, ownEnumerable }) => [
				at.start,
				at.end,
				depth,
				ownEnumerable
			])
		]);
		inheritLoaderSourceContext = (current, sources) => sources.map((source) => ({
			...current.eligibility ? { eligibility: true } : {},
			...current.readAt === undefined ? {} : { readAt: current.readAt },
			...source,
			capturedSelections: semanticNormalizeCapturedSelections(source.capturedSelections ?? current.capturedSelections, source.path.length)
		}));
		loaderMemberSource = (current, member, parents) => ({
			node: member.object,
			readAt: current.readAt ?? member,
			capturedSelections: current.readAt === undefined ? semanticShiftCapturedSelections(current.capturedSelections, 1) : semanticNormalizeCapturedSelections([{
				at: current.path.length === 0 && !memberFeedsEarlierAssignment(member, current.readAt, parents) ? current.readAt : member,
				depth: 1
			}, ...semanticShiftCapturedSelections(current.capturedSelections, 1) ?? []]),
			path: [semanticStaticPropertyKey(member.property, member.computed), ...current.path]
		});
		memberFeedsEarlierAssignment = (member, readAt, parents) => {
			let assignment;
			let parent = parents.get(member);
			while (parent !== undefined && parent !== readAt) {
				if (t.isAssignmentExpression(parent)) {
					let cursor = member;
					while (cursor !== undefined && cursor !== parent) {
						const next = parents.get(cursor);
						if (next === parent && parent.right === cursor) assignment = parent;
						cursor = next;
					}
				}
				if (t.isFunction(parent)) return false;
				parent = parents.get(parent);
			}
			return assignment !== undefined;
		};
		projectedLoaderSources = (current, sources) => sources.map((source) => ({
			...source,
			readAt: current.path.length === 0 ? undefined : current.readAt ?? current.node,
			capturedSelections: [...semanticShiftCapturedSelections(current.capturedSelections, source.path.length - current.path.length) ?? [], ...source.capturedSelections ?? []]
		}));
		loaderObjectPropertySources = (current, object, state) => {
			const [key, ...remaining] = current.path;
			if (key === undefined) return [];
			return semanticAliasSelectionChoices(key).flatMap((choice) => (t.isObjectExpression(object) ? semanticObjectPropertyReferences(object, [choice], state) : semanticArrayPropertyReferences(object, [choice], state)).filter((source) => !source.inherited || !current.capturedSelections?.some((capture) => capture.depth === 1 && capture.ownEnumerable)).map((source) => ({
				node: source.node,
				path: [...source.path, ...remaining],
				capturedSelections: semanticCapturedSelectionsAfterPropertyRead(current.capturedSelections, source)
			})));
		};
		isCommonJsModuleObject = (node, state, includeUnknown = true) => {
			const result = hasCommonJsModuleSource(node, state, includeUnknown, "module");
			return result === "possible" || includeUnknown && result === "incomplete";
		};
		isCommonJsRequireDelegate = (node, state, includeUnknown = false, readAt) => hasCommonJsModuleSource(node, state, includeUnknown, "delegate", readAt) === "possible";
		hasCommonJsModuleSource = (node, state, includeUnknown, target, readAt) => {
			const pending = [{
				node,
				path: [],
				readAt,
				awaitDepths: []
			}];
			const selections = new SemanticAliasSelections(() => {
				state.valueResourceLimits.add("alias-selections");
			}, state.precision.alias_selections);
			const contexts = new WeakMap();
			const examined = new WeakSet();
			let additionalStates = 0;
			let exhausted = false;
			let drained = 0;
			for (let next = pending.pop(); next !== undefined; next = exhausted ? pending.shift() : pending.pop()) {
				const value = unwrapJavaScriptExpression(next.node).node;
				const { awaitDepths } = next;
				const byMode = contexts.get(value) ?? new Map();
				const modeKey = JSON.stringify([awaitDepths, loaderSourceContextKey(next)]);
				let context = byMode.get(modeKey);
				if (context === undefined) {
					context = { identities: new Map() };
					byMode.set(modeKey, context);
					contexts.set(value, byMode);
				}
				let path = exhausted ? next.path : selections.normalize(context, next.path);
				if (selections.limited && !exhausted) {
					if (includeUnknown) return "possible";
					exhausted = true;
					path = next.path;
				}
				const pathKey = JSON.stringify(path);
				let identity = context.identities.get(pathKey);
				if (identity === undefined) {
					if (exhausted) {
						if (++drained > state.precision.alias_selections) return "incomplete";
					} else if ((byMode.size > 1 || context.identities.size > 0) && ++additionalStates > state.precision.alias_selections) {
						state.valueResourceLimits.add("alias-selections");
						if (includeUnknown) return "possible";
						exhausted = true;
					}
					identity = {};
					context.identities.set(pathKey, identity);
				}
				if (examined.has(identity)) continue;
				examined.add(identity);
				const enqueueAt = (depths, ...sources) => {
					pending.push(...inheritLoaderSourceContext(next, sources).filter((source) => {
						const value = unwrapJavaScriptExpression(source.node).node;
						return !t.isNumericLiteral(value) && !t.isBooleanLiteral(value) && !t.isNullLiteral(value);
					}).map((source) => ({
						...source,
						awaitDepths: depths
					})));
				};
				const enqueue = (...sources) => {
					enqueueAt(awaitDepths, ...sources);
				};
				if (t.isAwaitExpression(value)) {
					enqueueAt([...new Set([...awaitDepths, path.length])].sort((left, right) => left - right), {
						node: value.argument,
						path
					});
					continue;
				}
				if (t.isMemberExpression(value) || t.isOptionalMemberExpression(value)) {
					enqueue(loaderMemberSource({
						...next,
						path
					}, value, state.parentsByNode));
					continue;
				}
				if (path.length > 0 && (t.isObjectExpression(value) || t.isArrayExpression(value))) {
					enqueueAt(awaitDepths.filter((depth) => depth !== path.length), ...loaderObjectPropertySources({
						...next,
						path
					}, value, state));
					continue;
				}
				if (t.isConditionalExpression(value) || t.isLogicalExpression(value)) {
					enqueue({
						node: t.isConditionalExpression(value) ? value.consequent : value.left,
						path
					}, {
						node: t.isConditionalExpression(value) ? value.alternate : value.right,
						path
					});
					continue;
				}
				if (t.isSequenceExpression(value)) {
					const last = value.expressions.at(-1);
					if (last !== undefined) enqueue({
						node: last,
						path
					});
					continue;
				}
				if (t.isAssignmentExpression(value)) {
					enqueue(...assignmentValueSources(value).map((node) => ({
						node,
						path
					})));
					continue;
				}
				if (t.isCallExpression(value) || t.isOptionalCallExpression(value) || t.isNewExpression(value)) {
					const mode = awaitDepths.includes(path.length) ? "awaited-call" : "direct-call";
					const returnedResult = returnedLoaderReferences(state, mode)(value.callee, t.isNewExpression(value) ? undefined : value);
					if (returnedResult.unresolvedInvocation) return "possible";
					enqueue(...returnedResult.references.map((source) => ({
						node: source.node,
						path: [...source.projection, ...path],
						capturedSelections: semanticShiftCapturedSelections(next.capturedSelections, source.projection.length)
					})));
					continue;
				}
				if (!t.isIdentifier(value)) continue;
				const binding = resolveSemanticBindingState(state, value, value.name);
				const processMainModulePath = semanticGlobalProcessOrigin(value, state) !== undefined && path.length === (target === "module" ? 1 : 2) && semanticAliasSelectionChoices(path[0]).some((key) => key === null || semanticPropertyPathKeyMatches(key, "mainModule")) && (target === "module" || semanticAliasSelectionChoices(path[1]).some((key) => key === null || semanticPropertyPathKeyMatches(key, "require")));
				if (processMainModulePath) return "possible";
				const mainModulePath = value.name === "require" && state.program.sourceType === "script" && path.length === (target === "module" ? 1 : 2) && semanticAliasSelectionChoices(path[0]).some((key) => key === null || semanticPropertyPathKeyMatches(key, "main")) && (target === "module" || semanticAliasSelectionChoices(path[1]).some((key) => key === null || semanticPropertyPathKeyMatches(key, "require")));
				if (mainModulePath && binding === undefined && !semanticResolutionBlocked(state, value, "require")) return "possible";
				const copyAdmitsModuleDelegate = value.name !== "module" || target !== "delegate" || path.length !== 1 || !next.capturedSelections?.some((capture) => capture.depth === 1 && capture.ownEnumerable && !semanticCommonJsRequireOwnEnumerableAt(capture.at, state));
				if (value.name === "module" && binding === undefined) {
					if (copyAdmitsModuleDelegate && (target === "module" ? path.length === 0 : path.length === 1 && semanticAliasSelectionChoices(path[0]).some((key) => key === null || semanticPropertyPathKeyMatches(key, "require"))) && !semanticResolutionBlocked(state, value, "module")) return "possible";
					continue;
				}
				if (binding === undefined) continue;
				const read = semanticBindingAtRead(binding, value, state);
				const retainsMainModule = mainModulePath && commonJsWrapperBindingDeclaration(value, "require", state) !== undefined && !read.hasDefiniteInitializer;
				if (includeUnknown && mainModulePath && javaScriptRuntimeContext(state.program) === "unknown" && state.scopesById.get(binding.scopeId)?.kind === "program" && binding.declarationKinds.size === 1 && binding.declarationKinds.has("var") && !read.hasDefiniteInitializer) return "possible";
				if (value.name === "module" && copyAdmitsModuleDelegate && (target === "module" ? path.length === 0 : path.length === 1 && semanticAliasSelectionChoices(path[0]).some((key) => key === null || semanticPropertyPathKeyMatches(key, "require"))) && commonJsWrapperBindingDeclaration(value, "module", state) !== undefined && !read.hasDefiniteInitializer) return "possible";
				let eligibility = next.eligibility;
				const facts = eligibility ? undefined : semanticProjectedSourceFactsAtRead(binding, value, path, state, includeUnknown, next.readAt ?? value, next.capturedSelections);
				if (retainsMainModule && (eligibility || facts?.retainsOrigin)) return "possible";
				let sources = eligibility ? semanticProjectedSourceEligibilityAtRead(binding, value, path, state, next.readAt ?? value, next.capturedSelections) : facts?.sources;
				if (sources === undefined) {
					if (target !== "delegate") return "possible";
					sources = semanticProjectedSourceEligibilityAtRead(binding, value, path, state, next.readAt ?? value, next.capturedSelections);
					if (sources === undefined) return "possible";
					eligibility = true;
				}
				enqueue(...projectedLoaderSources({
					...next,
					node: value,
					path
				}, sources).map((source) => eligibility ? {
					...source,
					eligibility
				} : source));
			}
			return "no-match";
		};
		semanticModuleRequireReceiver = (node) => {
			let callee = unwrapJavaScriptExpression(node.callee).node;
			while ((t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) && [
				"bind",
				"call",
				"apply"
			].includes(semanticStaticPropertyKey(callee.property, callee.computed) ?? "")) callee = unwrapJavaScriptExpression(callee.object).node;
			return (t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) && semanticStaticPropertyKey(callee.property, callee.computed) === "require" ? callee.object : undefined;
		};
		semanticModuleRequireCallAt = (node, state, includeUnknown = true) => {
			const receiver = semanticModuleRequireReceiver(node);
			if (receiver !== undefined && isCommonJsModuleObject(receiver, state, includeUnknown)) return true;
			let target = unwrapJavaScriptExpression(node.callee).node;
			while ((t.isMemberExpression(target) || t.isOptionalMemberExpression(target)) && [
				"bind",
				"call",
				"apply"
			].includes(semanticStaticPropertyKey(target.property, target.computed) ?? "")) target = unwrapJavaScriptExpression(target.object).node;
			if (isCommonJsRequireDelegate(target, state, includeUnknown, node)) return true;
			if (t.isNewExpression(node)) return false;
			const interop = semanticModuleInteropWithAmbientWrites(state);
			return interop.intrinsicInvocation(node, (callee) => isCommonJsRequireDelegate(callee, state, false, node) ? ["commonjs-require-delegate"] : interop.intrinsicPath(callee))?.path[0] === "commonjs-require-delegate";
		};
		writesModuleRequire = (state) => {
			const cached = moduleRequireWrites.get(state);
			if (cached !== undefined) return cached;
			moduleRequireWrites.set(state, []);
			const writes = [];
			const interop = createSemanticModuleInterop(state);
			const isModuleObject = (node) => hasCommonJsModuleSource(node, state, false, "module");
			const record = (node, receiver) => {
				const resolution = isModuleObject(receiver);
				if (resolution !== "no-match") writes.push({
					node,
					resolution
				});
			};
			traverseJavaScriptValueAst(state.program, state.erasedSyntaxNodes, { enter: (node) => {
				for (const target of commonJsDelegateWriteTargets(node)) record(node, target.object);
				if (t.isCallExpression(node) || t.isOptionalCallExpression(node)) {
					const invocation = interop.intrinsicInvocation(node);
					const owner = invocation?.path?.length === 3 ? invocation.path[1] : undefined;
					const method = invocation?.path?.at(-1);
					const args = invocation?.arguments;
					if ((owner === "Object" || owner === "Reflect") && method === "defineProperty") {
						const key = interop.staticString(args?.[1]);
						if (key === "require" || key === undefined) record(node, args?.[0] ?? t.nullLiteral());
					} else if (owner === "Reflect" && method === "set") {
						const key = interop.staticString(args?.[1]);
						if (key === "require" || key === undefined) record(node, args?.[3] ?? args?.[0] ?? t.nullLiteral());
					} else if (owner === "Object" && method === "defineProperties") {
						const descriptors = args?.[1];
						if (objectMayProvideRequire(descriptors)) record(node, args?.[0] ?? t.nullLiteral());
					} else if (owner === "Object" && method === "assign") {
						const target = args?.[0];
						if (target !== undefined && args?.slice(1).some(objectMayProvideRequire)) record(node, target);
					}
				}
			} });
			moduleRequireWrites.set(state, writes);
			return writes;
		};
		objectMayProvideRequire = (node) => !t.isObjectExpression(node) || node.properties.some((property) => {
			if (t.isSpreadElement(property)) return true;
			const key = semanticStaticPropertyKey(property.key, property.computed);
			return key === "require" || key === null;
		});
		semanticOriginalGlobalProcessAt = (node, state) => !ambientPathMayObserveAt(state, node, ["global", "process"]) && !ambientBindingMayObserveWriteAt(state, node, "process");
		globalProcessReaders = new WeakMap();
		semanticEffectMayReachOriginalGlobalProcess = (node, state) => {
			let read = globalProcessReaders.get(state);
			if (read === undefined) {
				read = createGlobalPathReader(state, ["process"]);
				globalProcessReaders.set(state, read);
			}
			const fact = read(node);
			return fact.status !== "replacement" || !hasFreshProjectedReceiver(fact.value, [], state);
		};
		globalProcessAt = (node, state, use) => use === "read" ? semanticOriginalGlobalProcessAt(node, state) : semanticEffectMayReachOriginalGlobalProcess(node, state);
		semanticGlobalProcessOrigin = (node, state, use = "read") => t.isIdentifier(node, { name: "process" }) && resolveSemanticBindingState(state, node, "process") === undefined && !semanticResolutionBlocked(state, node, "process") && globalProcessAt(node, state, use) ? {
			specifier: "node:process",
			importedPath: [],
			resolutionMode: "require"
		} : undefined;
		semanticGlobalProcessPathOrigin = (node, state, use = "read") => {
			const chain = semanticMemberChain(node);
			if (chain === undefined) return undefined;
			const { root: current, members } = chain;
			if (!t.isIdentifier(current) || ![
				"globalThis",
				"global",
				"window",
				"self"
			].includes(current.name) || resolveSemanticBindingState(state, current, current.name) !== undefined || semanticResolutionBlocked(state, current, current.name) || members[0] !== "process" || !globalProcessAt(node, state, use)) return undefined;
			return {
				specifier: "node:process",
				importedPath: members.slice(1),
				resolutionMode: "require"
			};
		};
		isConditionalRequireAt = (root, node, state, allowAmbientModule = false) => {
			const runtime = javaScriptRuntimeContext(state.program);
			if (runtime !== "unknown" && !(allowAmbientModule && runtime === "module") || semanticResolutionBlocked(state, root, "require") || commonJsDelegateChangedAt(node, state)) return false;
			const binding = resolveSemanticBindingState(state, root, "require");
			if (binding !== undefined && (binding.hostOrigin === "commonjs-wrapper" || state.scopesById.get(binding.scopeId)?.kind !== "program" || binding.declarationKinds.size !== 1 || !binding.declarationKinds.has("var") || semanticBindingHasPriorValueWrite(node, binding, state) && !((t.isCallExpression(node) || t.isOptionalCallExpression(node) || t.isNewExpression(node)) && isWrapperRequireInitializerCall(binding, node, state)))) return false;
			return !ambientBindingMayObserveWriteAt(state, node, "require");
		};
		semanticRequireOriginCandidate = (node, state, allowAmbientModule = false) => {
			const chain = semanticMemberChain(node);
			const current = chain?.root;
			if (chain === undefined || !t.isCallExpression(current) && !t.isOptionalCallExpression(current) || !t.isIdentifier(current.callee, { name: "require" })) return undefined;
			const binding = resolveSemanticBindingState(state, current.callee, "require");
			const runtime = javaScriptRuntimeContext(state.program);
			const candidate = (runtime === "unknown" || allowAmbientModule && runtime === "module" && binding === undefined) && binding?.hostOrigin !== "commonjs-wrapper";
			if (candidate ? !isConditionalRequireAt(current.callee, current, state, allowAmbientModule) : commonJsDelegateChangedAt(current, state) || binding !== undefined && !isUnmodifiedCommonJsWrapperBinding(current.callee, "require", state) && !isWrapperRequireInitializerCall(binding, current, state) || binding === undefined && (javaScriptRuntimeContext(state.program) === "module" || semanticResolutionBlocked(state, current.callee, "require")) || ambientBindingMayObserveWriteAt(state, current, "require")) return undefined;
			const specifier = stringValue(current.arguments[0]);
			return specifier === undefined ? undefined : {
				origin: {
					specifier,
					importedPath: chain.members,
					resolutionMode: "require",
					...candidate ? { loaderAuthority: "candidate" } : {}
				},
				call: current
			};
		};
		semanticRequireOrigin = (node, state) => {
			const result = semanticRequireOriginCandidate(node, state);
			return result?.origin.loaderAuthority === "candidate" ? undefined : result;
		};
		semanticRequireExportsIdentity = (specifier, path) => {
			const name = specifier.replace(/^node:/u, "");
			if (name === "fs/promises") return {
				specifier: name,
				path
			};
			if (name === "events" && path[0] === "EventEmitter" && path.length > 1) return {
				specifier: name,
				path: path.slice(1)
			};
			if ([
				"path",
				"path/posix",
				"path/win32"
			].includes(name)) {
				let selected = name;
				let remaining = path;
				while (remaining.length > 1 && (remaining[0] === "posix" || remaining[0] === "win32")) {
					selected = `path/${remaining[0]}`;
					remaining = remaining.slice(1);
				}
				return {
					specifier: selected,
					path: remaining
				};
			}
			return name === "fs" && path[0] === "promises" && path.length > 1 ? {
				specifier: "fs/promises",
				path: path.slice(1)
			} : {
				specifier: name,
				path
			};
		};
		MUTABLE_BUILTIN_DEFAULTS = new Set([
			...Object.keys(BUILTIN_RESOURCE_METHODS),
			"http",
			"https",
			"child_process",
			"events",
			"timers",
			"process",
			"path",
			"path/posix",
			"path/win32",
			"url"
		]);
		semanticMutableBuiltinOrigin = (origin, selected = []) => {
			const path = [...origin.importedPath, ...selected];
			if (origin.resolutionMode === "require") return {
				specifier: origin.specifier,
				path
			};
			const specifier = origin.specifier.replace(/^node:/u, "");
			if (!MUTABLE_BUILTIN_DEFAULTS.has(specifier)) return undefined;
			if (path[0] === "default") return {
				specifier,
				path: path.slice(1)
			};
			if (specifier === "events" && path[0] === "EventEmitter" && path.length > 1) return {
				specifier,
				path
			};
			if (specifier === "process" && (path[0] === "env" || path[0] === "argv")) return {
				specifier,
				path
			};
			return specifier === "fs" && path[0] === "promises" ? {
				specifier,
				path
			} : undefined;
		};
		semanticRequireOriginReaders.origin = semanticRequireOrigin;
		semanticRequireOriginReaders.candidate = semanticRequireOriginCandidate;
		semanticRequireOriginReaders.loader = semanticRequireLoaderAt;
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptCommonJsExportReceivers.js
/**
* Capture receivers before their RHS, then compare with the final public
* identity. Fresh allocations prove distinctness; explicit wrapper reads
* preserve even opaque identities. Branches and deferred execution remain
* uncertain, as do local aliases. Facts live for one analysis and the
* cooperative traversal bounds work to the source tree size.
*/
function* indexCommonJsExportReceiversSteps(state) {
	const initial = state.program;
	let publicIdentity = initial;
	let exportsIdentity = initial;
	let moduleIntact = true;
	let deferredReplacement = false;
	const fresh = new WeakSet([initial]);
	const values = new WeakMap();
	const captures = new Map();
	const describedFields = new Map();
	const deletions = new Map();
	const execution = [];
	const publicCallWrites = new WeakSet();
	for (const node of ambientPathWriteSites(state, ["commonjs-module", "exports"])) if (t.isCallExpression(node) || t.isOptionalCallExpression(node)) publicCallWrites.add(node);
	const valueOf = (node) => {
		const value = unwrapJavaScriptExpression(node).node;
		return values.has(value) ? values.get(value) ?? null : value;
	};
	const write = (target, identity, mode) => {
		target = unwrapJavaScriptExpression(target).node;
		const possiblePublicWrite = (t.isMemberExpression(target) || t.isOptionalMemberExpression(target)) && isCommonJsExportReference(target.object, state, "module") && semanticStaticPropertyKey(target.property, target.computed) === null;
		const publicWrite = isCommonJsModuleExports(target, state) || possiblePublicWrite;
		const exportsWrite = isCommonJsExportReference(target, state, "exports");
		const moduleWrite = isCommonJsExportReference(target, state, "module");
		if (!publicWrite && !exportsWrite && !moduleWrite) return;
		if (mode === "deferred") {
			deferredReplacement = true;
			return;
		}
		const selected = mode === "ordered" && !possiblePublicWrite ? identity : null;
		if (moduleWrite) moduleIntact = false;
		if (publicWrite || moduleWrite) publicIdentity = moduleIntact ? selected : null;
		if (exportsWrite) exportsIdentity = selected;
	};
	yield* traverseJavaScriptValueAstSteps(state.program, state.erasedSyntaxNodes, {
		enter: (node, parent) => {
			const outer = execution.at(-1) ?? "ordered";
			const mode = outer === "deferred" || t.isFunction(node) || t.isClass(node) ? "deferred" : outer === "conditional" || hasDestructuringEvaluationOrder(node) || t.isIfStatement(node) || t.isSwitchStatement(node) || t.isLoop(node) || t.isTryStatement(node) || t.isObjectPattern(node) || t.isArrayPattern(node) || t.isLogicalExpression(parent) && parent.right === node || t.isAssignmentPattern(parent) && parent.right === node || t.isAssignmentExpression(parent) && [
				"&&=",
				"||=",
				"??="
			].includes(parent.operator) && parent.right === node || t.isOptionalCallExpression(parent) || t.isOptionalMemberExpression(parent) && parent.property === node || t.isConditionalExpression(parent) && parent.test !== node ? "conditional" : "ordered";
			execution.push(mode);
			if (t.isAssignmentExpression(node) && commonJsExportName(node.left, state) !== undefined && !isCommonJsModuleExports(node.left, state)) {
				const receiver = t.isMemberExpression(node.left) || t.isOptionalMemberExpression(node.left) ? node.left.object : null;
				captures.set(node, mode !== "ordered" ? null : receiver !== null && isCommonJsExportReference(receiver, state, "exports") ? exportsIdentity : publicIdentity);
			}
			const descriptor = commonJsDefinedExport(node, state);
			if (descriptor !== undefined) {
				const receiver = isCommonJsExportReference(descriptor.receiver, state, "exports") ? exportsIdentity : publicIdentity;
				const names = describedFields.get(receiver) ?? new Set();
				names.add(descriptor.exportedName);
				describedFields.set(receiver, names);
			}
			const defined = descriptor ?? commonJsAssignedExports(node, state);
			if (defined !== undefined && t.isCallExpression(node)) captures.set(node, mode !== "ordered" ? null : isCommonJsExportReference(defined.receiver, state, "exports") ? exportsIdentity : publicIdentity);
		},
		exit: (node) => {
			const mode = execution.pop() ?? "conditional";
			if (publicCallWrites.has(node)) {
				if (mode === "deferred") deferredReplacement = true;
				else publicIdentity = null;
			}
			if (t.isAssignmentExpression(node)) {
				const left = unwrapJavaScriptExpression(node.left).node;
				const identity = node.operator === "=" && (t.isIdentifier(left) || t.isMemberExpression(left) || t.isOptionalMemberExpression(left)) ? valueOf(node.right) : null;
				for (const target of semanticWriteTargets(node.left)) write(target, identity, mode);
				values.set(node, identity);
			} else if (t.isVariableDeclarator(node) && node.init != null) {
				for (const target of semanticWriteTargets(node.id)) write(target, t.isIdentifier(node.id) ? valueOf(node.init) : null, mode);
			} else if (t.isForOfStatement(node) || t.isForInStatement(node)) {
				if (!t.isVariableDeclaration(node.left)) for (const target of semanticWriteTargets(node.left)) write(target, null, mode);
			} else if (t.isUpdateExpression(node) || t.isUnaryExpression(node, { operator: "delete" })) {
				if (t.isUnaryExpression(node, { operator: "delete" })) {
					const name = commonJsExportName(node.argument, state);
					if (name !== undefined && !isCommonJsModuleExports(node.argument, state) && (t.isMemberExpression(node.argument) || t.isOptionalMemberExpression(node.argument))) {
						const receiver = isCommonJsExportReference(node.argument.object, state, "exports") ? exportsIdentity : publicIdentity;
						const fields = deletions.get(receiver) ?? new Map();
						fields.set(name, {
							node,
							mode: name === "*" && mode === "ordered" ? "conditional" : mode
						});
						deletions.set(receiver, fields);
					}
				}
				write(node.argument, null, mode);
			} else if (isCommonJsExportReference(node, state, "exports")) {
				values.set(node, exportsIdentity);
			} else if (isCommonJsModuleExports(node, state)) {
				values.set(node, publicIdentity);
			} else if (t.isObjectExpression(node) || t.isArrayExpression(node) || t.isFunctionExpression(node) || t.isArrowFunctionExpression(node) || t.isClassExpression(node)) {
				values.set(node, node);
				fresh.add(node);
			} else if (t.isSequenceExpression(node)) {
				const last = node.expressions.at(-1);
				values.set(node, last === undefined ? null : valueOf(last));
			}
		}
	});
	const effects = new Map();
	for (const [node, receiver] of captures) {
		const status = deferredReplacement || receiver === null || publicIdentity === null ? "uncertain" : receiver === publicIdentity ? "connected" : fresh.has(receiver) && fresh.has(publicIdentity) ? "detached" : "uncertain";
		if (status === "detached") {
			effects.set(node, { receiver: status });
			continue;
		}
		const fields = new Map();
		for (const { exportedName } of commonJsRuntimeExportValues(node, state)) {
			const removed = [deletions.get(receiver)?.get(exportedName), deletions.get(receiver)?.get("*")].filter((deletion) => deletion !== undefined && (deletion.mode === "deferred" || (deletion.node.start ?? -1) > (node.start ?? -1)));
			if (removed.length === 0) continue;
			const configurable = (t.isAssignmentExpression(node) || commonJsAssignedExports(node, state) !== undefined) && !describedFields.get(receiver)?.has(exportedName) && !describedFields.get(receiver)?.has("*");
			fields.set(exportedName, configurable && status !== "uncertain" && removed.every((deletion) => deletion?.mode === "ordered") ? "detached" : "uncertain");
		}
		effects.set(node, {
			receiver: status,
			...fields.size === 0 ? {} : { fields }
		});
	}
	return effects;
}
var commonJsExportInvocation, commonJsExportApplicability, copiedOwnFields, isCommonJsExportReference, isCommonJsModuleExports, commonJsExportName, commonJsDefinedExport, commonJsAssignedExports, commonJsExportValues, commonJsRuntimeExportValues, hasDestructuringEvaluationOrder;
function init_javascriptCommonJsExportReceivers() {
	return (init_javascriptCommonJsExportReceivers = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticState();
		init_javascriptSemanticGlobalReference();
		init_javascriptSemanticTraversal();
		init_javascriptModuleInterop();
		init_javascriptSemanticEffectLog();
		init_javascriptSemanticValues();
		init_javascriptSemanticProjectedSources();
		init_javascriptSemanticMutationInitializers();
		init_javascriptSourceParser();
		commonJsExportInvocation = (node, state) => semanticModuleInteropWithAmbientWrites(state).intrinsicInvocation(node);
		commonJsExportApplicability = (effect, name) => effect?.receiver === "detached" ? "detached" : effect?.fields?.get(name) ?? effect?.receiver ?? "connected";
		copiedOwnFields = (source, state) => {
			const unknown = {
				definite: new Set(),
				complete: false
			};
			const pending = [source];
			const seen = new Set();
			let common;
			let complete = true;
			while (pending.length > 0) {
				const node = unwrapJavaScriptExpression(pending.pop()).node;
				if (seen.has(node)) continue;
				if (seen.size >= state.precision.alias_selections) {
					state.valueResourceLimits.add("alias-selections");
					return unknown;
				}
				seen.add(node);
				if (t.isIdentifier(node)) {
					const binding = resolveSemanticBindingState(state, node, node.name);
					if (binding === undefined) return unknown;
					if (bindingMemberEffectMayPrecede(state, binding, source)) return unknown;
					const selected = semanticProjectedSourcesAtRead(binding, node, [], state, false, source);
					if (selected === undefined || selected.length === 0 || selected.some((value) => value.path.length !== 0)) return unknown;
					if (seen.size + pending.length + selected.length > state.precision.alias_selections) {
						state.valueResourceLimits.add("alias-selections");
						return unknown;
					}
					for (const value of selected) pending.push(value.node);
					continue;
				}
				if (t.isObjectExpression(node) && node.properties.some((property) => t.isObjectMethod(property) && property.kind !== "method")) return unknown;
				const selected = evaluateSemanticExpression(node, state, source);
				const fields = selected.status === "object" ? selected.properties : selected.status === "array" ? selected.items : [];
				const own = new Set(fields.filter((field) => field.presence === "present").map((field) => field.name));
				const exact = selected.status === "object" ? !selected.unknownProperties : selected.status === "array" ? !selected.unknownItems : selected.status === "literal" && selected.value === null;
				complete &&= exact && (common === undefined || common.size === own.size && [...common].every((key) => own.has(key)));
				common = common === undefined ? own : new Set([...common].filter((key) => own.has(key)));
			}
			return {
				definite: common ?? new Set(),
				complete
			};
		};
		isCommonJsExportReference = (node, state, name) => {
			const context = javaScriptRuntimeContext(state.program);
			if (context === "module") return false;
			if (isUnshadowedGlobal(node, state, name)) return true;
			if (context !== "unknown" || !t.isIdentifier(node, { name }) || semanticResolutionBlocked(state, node, name)) return false;
			const binding = resolveSemanticBindingState(state, node, name);
			return binding !== undefined && state.scopesById.get(binding.scopeId)?.kind === "program" && binding.declarationKinds.size === 1 && binding.declarationKinds.has("var") && !semanticBindingHasPriorValueWrite(node, binding, state);
		};
		isCommonJsModuleExports = (node, state) => (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) && isCommonJsExportReference(node.object, state, "module") && semanticStaticPropertyKey(node.property, node.computed) === "exports";
		commonJsExportName = (node, state) => {
			if (!t.isMemberExpression(node) && !t.isOptionalMemberExpression(node)) return undefined;
			const key = semanticStaticPropertyKey(node.property, node.computed);
			if (isCommonJsExportReference(node.object, state, "exports") || isCommonJsModuleExports(node.object, state)) return key === null ? "*" : key;
			return isCommonJsModuleExports(node, state) ? "default" : undefined;
		};
		commonJsDefinedExport = (node, state) => {
			if (!t.isCallExpression(node)) return undefined;
			const [target, key, descriptor] = node.arguments;
			if (target === undefined || key === undefined || descriptor === undefined || t.isSpreadElement(target) || t.isSpreadElement(key) || t.isSpreadElement(descriptor) || t.isArgumentPlaceholder(target) || t.isArgumentPlaceholder(key) || t.isArgumentPlaceholder(descriptor)) return undefined;
			const receiver = unwrapJavaScriptExpression(target).node;
			if (!isCommonJsExportReference(receiver, state, "exports") && !isCommonJsModuleExports(receiver, state) || !isUnmodifiedGlobalReference(node.callee, state, ["Object", "defineProperty"])) return undefined;
			return {
				exportedName: semanticStaticPropertyKey(key, true) ?? "*",
				receiver,
				descriptor
			};
		};
		commonJsAssignedExports = (node, state) => {
			if (!t.isCallExpression(node)) return undefined;
			const invocation = commonJsExportInvocation(node, state);
			if (invocation?.kind !== "known" || invocation.path.length !== 3 || invocation.path[0] !== "intrinsic" || invocation.path[1] !== "Object" || invocation.path[2] !== "assign") return undefined;
			const [target, ...sources] = invocation.arguments ?? [];
			if (!t.isExpression(target)) return undefined;
			const receiver = unwrapJavaScriptExpression(target).node;
			if (!isCommonJsExportReference(receiver, state, "exports") && !isCommonJsModuleExports(receiver, state)) return undefined;
			return {
				receiver,
				sources: sources.map((source) => ({
					value: t.isExpression(source) ? source : null,
					...t.isSpreadElement(source) ? { iterationSource: source.argument } : {}
				}))
			};
		};
		commonJsExportValues = (node, state) => {
			if (t.isAssignmentExpression(node)) {
				const exportedName = commonJsExportName(node.left, state);
				return exportedName === undefined ? [] : [{
					exportedName,
					value: node.operator === "=" ? node.right : null
				}];
			}
			const assigned = commonJsAssignedExports(node, state);
			if (assigned !== undefined) {
				const exported = [];
				const overwritten = new Set();
				for (let index = assigned.sources.length - 1; index >= 0; index--) {
					const { value, iterationSource } = assigned.sources[index];
					if (value === null) {
						exported.push({
							exportedName: "*",
							value: null,
							...iterationSource === undefined ? {} : { iterationSource }
						});
						continue;
					}
					const fields = copiedOwnFields(value, state);
					if (fields.complete) {
						for (const name of fields.definite) if (!overwritten.has(name)) exported.push({
							exportedName: name,
							value,
							projection: [name],
							ownEnumerable: true
						});
					} else exported.push({
						exportedName: "*",
						value,
						projection: [{ excludedKeys: [...overwritten] }],
						ownEnumerable: true
					});
					for (const field of fields.definite) overwritten.add(field);
				}
				return exported;
			}
			const defined = commonJsDefinedExport(node, state);
			if (defined === undefined) return [];
			const descriptor = unwrapJavaScriptExpression(defined.descriptor).node;
			return [{
				exportedName: defined.exportedName,
				value: t.isObjectExpression(descriptor) ? semanticFinalObjectProperty(descriptor, "value") ?? null : null
			}];
		};
		commonJsRuntimeExportValues = (node, state) => {
			const values = commonJsExportValues(node, state);
			return javaScriptRuntimeContext(state.program) === "unknown" ? values.map((value) => ({
				...value,
				loaderAuthority: "candidate"
			})) : values;
		};
		hasDestructuringEvaluationOrder = (node) => {
			const pattern = t.isAssignmentExpression(node) ? unwrapJavaScriptExpression(node.left).node : t.isVariableDeclarator(node) ? node.id : undefined;
			return t.isObjectPattern(pattern) || t.isArrayPattern(pattern);
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticProjection.js
/** Collect lexical references in steps while preserving resolution and visit order. */
function* collectSemanticReferencesSteps(program, state, name) {
	const output = [];
	const seen = new Set();
	yield* traverseJavaScriptValueAstSteps(program, state.erasedSyntaxNodes, { enter: (node, parent, readAncestors) => {
		if (!t.isIdentifier(node) || parent === null || name !== undefined && node.name !== name) return;
		let ancestors;
		const ancestry = () => ancestors ??= readAncestors();
		const role = semanticIdentifierRole(node, parent, ancestry);
		if (role === null) return;
		const roles = role === "write" && semanticReadsBeforeWrite(node, semanticWrappedWriteSite(node, parent, ancestry()) ?? parent) ? ["read", "write"] : [role];
		for (const resolvedRole of roles) {
			const key = `${String(node.start)}:${resolvedRole}:${node.name}`;
			if (seen.has(key)) continue;
			seen.add(key);
			const binding = resolveSemanticBindingState(state, node, node.name);
			const blocked = binding === undefined && semanticResolutionBlocked(state, node, node.name);
			output.push({
				name: node.name,
				role: resolvedRole,
				location: range(node),
				bindingId: binding?.bindingId ?? null,
				resolution: binding !== undefined ? "resolved" : blocked ? "unknown" : "unbound"
			});
		}
	} });
	return output;
}
var collectSemanticCallable, collectSemanticModuleLink, collectImportEquals, collectSemanticReferences, immutableSemanticScopes, immutableSemanticBindings, callableKind, callableName, collectImports, collectNamedExports, collectRequireLink, collectUnboundRequireLink, requirePatternBindings, collectCommonJsExport, addCommonJsExport, addModuleLink, semanticCallableIdForNode, declarationCallableId, semanticReadsBeforeWrite, semanticIdentifierRole, enclosingPatternAncestor, bindsIdentifier, isPatternNode, isDeleteSite, isPatternOwnerDeclaration, semanticReferenceRole, patternNames, patternContains, declarationNames, defaultExportLocalName;
function init_javascriptSemanticProjection() {
	return (init_javascriptSemanticProjection = __esmMin((() => {
		init_javascriptSemanticState();
		init_javascriptSemanticRequireOrigin();
		init_javascriptSemanticEffectLog();
		init_unicodeCodePointOrder();
		init_javascriptSemanticTraversal();
		init_javascriptSemanticValues();
		init_javascriptStaticAnalysisHelpers();
		init_javascriptAstValues();
		init_javascriptModuleDeclaration();
		init_javascriptCommonJsExportReceivers();
		init_javascriptSemanticEvaluationOrder();
		collectSemanticCallable = (input) => {
			const { node, parent, containerScope, bodyScope, state } = input;
			const kind = callableKind(node);
			if (kind === undefined) return;
			const callableId = semanticCallableIdForNode(node) ?? "callable:unknown:-1:-1";
			state.callables.push({
				callableId,
				kind,
				name: callableName(node, parent),
				containerScopeId: containerScope.scopeId,
				bodyScopeId: bodyScope === undefined || !bodyScope.bindingsComplete ? null : bodyScope.scopeId,
				location: range(node),
				computedKeyLocation: "key" in node && t.isNode(node.key) && semanticMethodDefinitionExpression(node, node.key) ? range(node.key) : null,
				returnSites: [],
				returnCoverage: {
					status: "partial",
					retainedCount: 0,
					omittedCount: null
				}
			});
			state.callableNodesById.set(callableId, node);
		};
		collectSemanticModuleLink = (node, state, commonJsReceivers) => {
			if (state.erasedSyntaxNodes.has(node) && !t.isTSImportEqualsDeclaration(node) && !t.isImportDeclaration(node) && !t.isExportNamedDeclaration(node) && !t.isExportAllDeclaration(node)) return;
			if (t.isTSImportEqualsDeclaration(node)) collectImportEquals(node, state);
			else if (t.isImportDeclaration(node)) collectImports(node, state);
			else if (t.isExportAllDeclaration(node)) addModuleLink(state, {
				kind: isTypeOnlyExportDeclaration(node) ? "type-import" : "re-export",
				specifier: node.source.value,
				importedName: "*",
				localName: null,
				exportedName: "*",
				location: range(node)
			}, node);
			else if (t.isExportNamedDeclaration(node)) collectNamedExports(node, state);
			else if (t.isExportDefaultDeclaration(node)) addModuleLink(state, {
				kind: isErasedJavaScriptDeclaration(node.declaration) ? "type-import" : "export",
				specifier: null,
				importedName: null,
				localName: defaultExportLocalName(node.declaration),
				exportedName: "default",
				callableId: semanticCallableIdForNode(node.declaration),
				location: range(node)
			}, node);
			else if (t.isVariableDeclarator(node)) collectRequireLink(node, state);
			else if (t.isAssignmentExpression(node)) collectCommonJsExport(node, state, commonJsReceivers.get(node));
			else if (t.isCallExpression(node)) {
				collectCommonJsExport(node, state, commonJsReceivers.get(node));
				collectUnboundRequireLink(node, state);
			}
		};
		collectImportEquals = (node, state) => {
			const moduleReference = node.moduleReference;
			const specifier = semanticImportEqualsSpecifier(node) ?? (node.importKind === "type" && t.isTSExternalModuleReference(moduleReference) && t.isStringLiteral(moduleReference.expression) ? moduleReference.expression.value : null);
			if (specifier === null) return;
			addModuleLink(state, {
				kind: node.importKind === "type" ? "type-import" : "require",
				specifier,
				importedName: null,
				localName: node.id.name,
				exportedName: null,
				location: range(node)
			}, node);
		};
		collectSemanticReferences = (program, state, name) => completeSemanticSteps(collectSemanticReferencesSteps(program, state, name));
		immutableSemanticScopes = (state) => state.scopes.map((scope) => ({
			scopeId: scope.scopeId,
			parentScopeId: scope.parentScopeId,
			kind: scope.kind,
			location: scope.location,
			bindingsComplete: scope.bindingsComplete,
			bindingIds: [...scope.bindings.values()].map(({ bindingId }) => bindingId).sort(compareUnicodeCodePoints)
		}));
		immutableSemanticBindings = (state) => [...state.bindingsById.values()].map((binding) => ({
			bindingId: binding.bindingId,
			scopeId: binding.scopeId,
			name: binding.name,
			kind: binding.kind,
			mutable: binding.mutable,
			definitions: binding.definitions,
			value: evaluateSemanticBinding(binding, state),
			...bindingHasMemberWrites(binding) && binding.initializers.length === 1 && binding.initializers[0]?.projection.length === 0 ? { initializerValue: evaluateSemanticExpression(binding.initializers[0].node, state, binding.initializers[0].node) } : {},
			provenance: evaluateSemanticProvenance(binding, state)
		})).sort((left, right) => compareUnicodeCodePoints(left.bindingId, right.bindingId));
		callableKind = (node) => {
			if (t.isClassMethod(node) || t.isClassPrivateMethod(node) || t.isObjectMethod(node)) return "method";
			if (t.isFunction(node)) return "function";
			if (t.isClass(node)) return "class";
			return undefined;
		};
		callableName = (node, parent) => {
			if ((t.isFunctionDeclaration(node) || t.isFunctionExpression(node) || t.isClassDeclaration(node) || t.isClassExpression(node)) && t.isIdentifier(node.id)) return node.id.name;
			if (t.isClassMethod(node) || t.isClassPrivateMethod(node) || t.isObjectMethod(node)) {
				if (t.isPrivateName(node.key)) return `#${node.key.id.name}`;
				return semanticStaticPropertyKey(node.key, node.computed) ?? `[computed@${String(node.start ?? -1)}]`;
			}
			if (parent !== null && t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)) return parent.id.name;
			return null;
		};
		collectImports = (node, state) => {
			if (node.specifiers.length === 0) addModuleLink(state, {
				kind: isTypeOnlyImportDeclaration(node) ? "type-import" : "import",
				specifier: node.source.value,
				importedName: null,
				localName: null,
				exportedName: null,
				location: range(node)
			}, node);
			for (const specifier of node.specifiers) addModuleLink(state, {
				kind: isTypeOnlyImportDeclaration(node) || t.isImportSpecifier(specifier) && isTypeOnlyImportSpecifier(specifier) ? "type-import" : "import",
				specifier: node.source.value,
				importedName: t.isImportDefaultSpecifier(specifier) ? "default" : t.isImportNamespaceSpecifier(specifier) ? "*" : propertyName(specifier.imported),
				localName: specifier.local.name,
				exportedName: null,
				location: range(specifier)
			}, node);
		};
		collectNamedExports = (node, state) => {
			const declarationTypeOnly = isTypeOnlyExportDeclaration(node);
			if (node.declaration !== null && node.declaration !== undefined) for (const localName of declarationNames(node.declaration)) addModuleLink(state, {
				kind: declarationTypeOnly ? "type-import" : "export",
				specifier: null,
				importedName: null,
				localName,
				exportedName: localName,
				callableId: declarationCallableId(node.declaration, localName),
				location: range(node.declaration)
			}, node);
			for (const specifier of node.specifiers) if (t.isExportSpecifier(specifier) || t.isExportNamespaceSpecifier(specifier) && node.exportKind !== "type") addModuleLink(state, {
				kind: declarationTypeOnly || t.isExportSpecifier(specifier) && isTypeOnlyExportSpecifier(specifier) ? "type-import" : node.source == null ? "export" : "re-export",
				specifier: node.source?.value ?? null,
				importedName: t.isExportNamespaceSpecifier(specifier) ? "*" : propertyName(specifier.local),
				localName: node.source == null && t.isExportSpecifier(specifier) ? propertyName(specifier.local) : null,
				exportedName: propertyName(specifier.exported),
				location: range(specifier)
			}, node);
		};
		collectRequireLink = (node, state) => {
			const required = semanticRequireOriginCandidate(node.init, state);
			if (required === undefined) return;
			const { origin, call } = required;
			const bindings = requirePatternBindings(node.id, origin.importedPath);
			for (const binding of bindings) addModuleLink(state, {
				kind: "require",
				...origin.loaderAuthority === "candidate" ? { loaderAuthority: "candidate" } : {},
				specifier: origin.specifier,
				importedName: binding.importedName,
				localName: binding.localName,
				exportedName: null,
				location: range(node)
			}, node);
			if (bindings.length > 0) state.linkedRequireCalls.add(call);
		};
		collectUnboundRequireLink = (node, state) => {
			if (state.linkedRequireCalls.has(node)) return;
			const required = semanticRequireOriginCandidate(node, state);
			if (required === undefined) return;
			addModuleLink(state, {
				kind: "require",
				...required.origin.loaderAuthority === "candidate" ? { loaderAuthority: "candidate" } : {},
				specifier: required.origin.specifier,
				importedName: null,
				localName: null,
				exportedName: null,
				location: range(node)
			}, node);
			state.linkedRequireCalls.add(node);
		};
		requirePatternBindings = (pattern, path) => {
			if (t.isTSParameterProperty(pattern)) return requirePatternBindings(pattern.parameter, path);
			if (t.isIdentifier(pattern)) return [{
				importedName: path.at(-1) ?? "*",
				localName: pattern.name
			}];
			if (t.isAssignmentPattern(pattern)) return requirePatternBindings(pattern.left, path);
			if (t.isObjectPattern(pattern)) return pattern.properties.flatMap((property) => {
				if (t.isRestElement(property)) return [];
				const name = semanticStaticPropertyKey(property.key, property.computed);
				return name === null ? [] : requirePatternBindings(property.value, [...path, name]);
			});
			if (t.isArrayPattern(pattern)) return pattern.elements.flatMap((element, index) => element === null ? [] : requirePatternBindings(element, [...path, String(index)]));
			return [];
		};
		collectCommonJsExport = (node, state, receiverEffect) => {
			for (const exported of commonJsRuntimeExportValues(node, state)) {
				const applicability = commonJsExportApplicability(receiverEffect, exported.exportedName);
				if (applicability === "detached") continue;
				addCommonJsExport(node, state, exported.exportedName, applicability === "uncertain" ? null : exported.value, exported.projection, exported.loaderAuthority);
			}
		};
		addCommonJsExport = (node, state, exportedName, exported, projection, loaderAuthority) => {
			let value = exported;
			while (t.isAssignmentExpression(value, { operator: "=" })) value = value.right;
			const required = value === null ? undefined : semanticRequireOriginCandidate(value, state);
			const origin = projection?.some((key) => typeof key === "object" && key !== null && key.excludedKeys.length > 0) ? undefined : required?.origin;
			const selectedName = projection?.at(-1);
			addModuleLink(state, {
				kind: "commonjs-export",
				...origin?.loaderAuthority === "candidate" || loaderAuthority === "candidate" ? { loaderAuthority: "candidate" } : {},
				specifier: origin?.specifier ?? null,
				importedName: origin === undefined ? null : typeof selectedName === "string" || typeof selectedName === "number" ? String(selectedName) : origin.importedPath.at(-1) ?? null,
				localName: projection === undefined && value !== null && t.isIdentifier(value) ? value.name : null,
				exportedName,
				callableId: projection !== undefined || value === null ? null : semanticCallableIdForNode(value),
				location: range(node)
			}, node);
			if (origin !== undefined && required !== undefined) state.linkedRequireCalls.add(required.call);
		};
		addModuleLink = (state, link, referenceNode) => {
			const resolutionMode = link.resolutionMode ?? (link.kind === "import" || link.kind === "re-export" || link.kind === "type-import" ? state.staticImportResolutionMode : link.kind === "require" ? "require" : undefined);
			const collected = {
				...link,
				...resolutionMode === undefined ? {} : { resolutionMode },
				callableId: link.callableId ?? null
			};
			state.moduleLinks.push(collected);
			if (t.isExportDefaultDeclaration(referenceNode) && t.isExpression(referenceNode.declaration)) state.defaultExportExpressions.set(collected, referenceNode.declaration);
			if (link.localName !== null) {
				const binding = resolveSemanticBindingState(state, referenceNode, link.localName);
				if (binding !== undefined) state.moduleLinkBindings.set(collected, binding);
			}
		};
		semanticCallableIdForNode = (node) => {
			const kind = callableKind(node);
			return kind === undefined ? null : `callable:${kind}:${String(node.start ?? -1)}:${String(node.end ?? -1)}`;
		};
		declarationCallableId = (declaration, localName) => {
			if ((t.isFunctionDeclaration(declaration) || t.isClassDeclaration(declaration)) && declaration.id?.name === localName) return semanticCallableIdForNode(declaration);
			if (!t.isVariableDeclaration(declaration)) return null;
			const declarator = declaration.declarations.find(({ id }) => t.isIdentifier(id, { name: localName }));
			return declarator?.init === null || declarator?.init === undefined ? null : semanticCallableIdForNode(declarator.init);
		};
		semanticReadsBeforeWrite = (node, site) => {
			const target = semanticWriteSiteTarget(site);
			return target !== null && unwrapJavaScriptExpression(target).node === node && semanticWriteSiteReadsFirst(site);
		};
		semanticIdentifierRole = (node, parent, readAncestors) => {
			if (t.isMemberExpression(parent) || t.isOptionalMemberExpression(parent)) return semanticReferenceRole(node, parent);
			if (t.isObjectProperty(parent) && parent.key === node && !parent.computed && parent.value !== node) return null;
			const ancestors = readAncestors();
			const patternAncestor = enclosingPatternAncestor(node, parent, ancestors);
			if (patternAncestor !== null) {
				if (isPatternOwnerDeclaration(patternAncestor)) return null;
				return "write";
			}
			const site = semanticWrappedWriteSite(node, parent, ancestors);
			if (site !== null && site !== parent && !isDeleteSite(site)) return "write";
			return semanticReferenceRole(node, parent, ancestors.at(-2));
		};
		enclosingPatternAncestor = (node, parent, ancestors) => {
			const chain = [...ancestors, parent];
			for (let index = chain.length - 1; index >= 0; index -= 1) {
				const ancestor = chain[index];
				if (ancestor === undefined || !isPatternNode(ancestor)) continue;
				if (!bindsIdentifier(ancestor, parent, node)) continue;
				for (let owner = index - 1; owner >= 0; owner -= 1) {
					const candidate = chain[owner];
					if (candidate === undefined) continue;
					if (t.isAssignmentExpression(candidate) || t.isForInStatement(candidate) || t.isForOfStatement(candidate)) return candidate;
					if (isPatternOwnerDeclaration(candidate)) return candidate;
				}
				return null;
			}
			return null;
		};
		bindsIdentifier = (pattern, parent, node) => {
			if (parent === pattern) return patternContains(pattern, node);
			if (t.isObjectPattern(pattern)) return t.isObjectProperty(parent) && (parent.value === node || parent.shorthand && parent.key === node);
			if (t.isArrayPattern(pattern)) return pattern.elements.some((element) => element === parent);
			if (t.isAssignmentPattern(pattern)) return pattern.left === parent;
			return t.isRestElement(pattern) && pattern.argument === parent;
		};
		isPatternNode = (node) => t.isObjectPattern(node) || t.isArrayPattern(node) || t.isAssignmentPattern(node) || t.isRestElement(node);
		isDeleteSite = (site) => t.isUnaryExpression(site, { operator: "delete" });
		isPatternOwnerDeclaration = (node) => t.isTSParameterProperty(node) || t.isVariableDeclarator(node) && t.isPattern(node.id) || t.isFunction(node) && node.params.some((value) => t.isPattern(value)) || t.isCatchClause(node) && node.param !== null && t.isPattern(node.param);
		semanticReferenceRole = (node, parent, grandparent) => {
			if (t.isAssignmentExpression(parent) && parent.left === node || t.isUpdateExpression(parent) || (t.isForInStatement(parent) || t.isForOfStatement(parent)) && parent.left === node) return "write";
			if (t.isTSImportEqualsDeclaration(parent) && parent.id === node || t.isTSParameterProperty(parent) && patternContains(parent.parameter, node) || (t.isTSDeclareMethod(parent) || t.isTSMethodSignature(parent)) && parent.key === node && !parent.computed) return null;
			if (!t.isReferenced(node, parent, grandparent)) return null;
			return t.isExportSpecifier(parent) && parent.local === node ? "export" : "read";
		};
		patternNames = (pattern) => {
			if (t.isTSParameterProperty(pattern)) return patternNames(pattern.parameter);
			if (t.isIdentifier(pattern)) return [pattern.name];
			if (t.isAssignmentPattern(pattern)) return patternNames(pattern.left);
			if (t.isRestElement(pattern)) return patternNames(pattern.argument);
			if (t.isObjectPattern(pattern)) return pattern.properties.flatMap((property) => t.isRestElement(property) ? patternNames(property.argument) : patternNames(property.value));
			if (t.isArrayPattern(pattern)) return pattern.elements.flatMap((element) => element === null ? [] : patternNames(element));
			return [];
		};
		patternContains = (pattern, target) => pattern === target || t.isTSParameterProperty(pattern) && patternContains(pattern.parameter, target) || t.isAssignmentPattern(pattern) && patternContains(pattern.left, target) || t.isRestElement(pattern) && patternContains(pattern.argument, target) || t.isObjectPattern(pattern) && pattern.properties.some((property) => t.isRestElement(property) ? patternContains(property.argument, target) : patternContains(property.value, target)) || t.isArrayPattern(pattern) && pattern.elements.some((element) => element !== null && patternContains(element, target));
		declarationNames = (declaration) => {
			if (t.isVariableDeclaration(declaration)) return declaration.declarations.flatMap(({ id }) => patternNames(id));
			if ((t.isFunctionDeclaration(declaration) || t.isClassDeclaration(declaration)) && t.isIdentifier(declaration.id)) return [declaration.id.name];
			if ((t.isTSInterfaceDeclaration(declaration) || t.isTSTypeAliasDeclaration(declaration) || t.isTSDeclareFunction(declaration)) && t.isIdentifier(declaration.id)) return [declaration.id.name];
			if (t.isTSImportEqualsDeclaration(declaration) && semanticImportEqualsSpecifier(declaration) !== null) return [declaration.id.name];
			return [];
		};
		defaultExportLocalName = (declaration) => {
			const value = unwrapJavaScriptExpression(declaration).node;
			if (t.isIdentifier(value)) return value.name;
			return (t.isFunctionDeclaration(value) || t.isClassDeclaration(value)) && t.isIdentifier(value.id) ? value.id.name : null;
		};
	})))();
}

//#endregion
export { BUILTIN_RESOURCE_METHODS, BUILTIN_RESOURCE_SPECIFIERS, ELECTRON_IDENTITY_LIMITATION, ELECTRON_MODULE, FS_OPEN_FLAGS, GetterResultWalker, SemanticGetterQuery, argumentNode, argumentValue, assignmentValueSources, bindingAssignmentMayPrecede, bindingEffectsConfinedToReceiverCalls, bindingHasMemberWrites, bindingInitializersMayPrecede, bindingMemberEffectMayPrecedeReads, bindingMethodMayHaveChanged, bindingPathOnlyEscapesAtLaterIteratorEffects, bindingProjectedContentsMayChangeAt, builtinResourceReleases, calleeName, capturedBindingPathMayHaveChanged, clearSemanticValueCaches, collectJavaScriptIdentityWritesSteps, collectSemanticCallable, collectSemanticModuleLink, collectSemanticReferences, collectSemanticReferencesSteps, commonJsExportApplicability, commonJsRuntimeExportValues, createAmbientPathResolver, createGlobalPathReader, createGlobalReferenceReader, createSemanticModuleInterop, createSemanticOpaqueEffects, createSemanticOpaqueGlobalObserver, createSemanticReturnedReferences, currentSemanticScope, electronExportPath, electronMemberPath, endpointArgument, evaluateSemanticBinding, evaluateSemanticExpression, evaluateSemanticExpressionProvenance, evaluateSemanticProvenance, evaluateSemanticProvenanceAtRead, hasFreshProjectedReceiver, hasRecordedReferenceEffects, hasSemanticCreateRequireFactoryOrigin, immutableSemanticBindings, immutableSemanticScopes, indexCommonJsExportReceiversSteps, indexJavaScriptAmbientWritesSteps, indexSemanticOpaqueEffects, init_javascriptBuiltinResourceMethods, init_javascriptCommonJsExportReceivers, init_javascriptElectronMemberWrites, init_javascriptModuleInterop, init_javascriptSemanticAliasSelections, init_javascriptSemanticAmbientWrites, init_javascriptSemanticArrayLayout, init_javascriptSemanticCallableResults, init_javascriptSemanticCopiedReferencePaths, init_javascriptSemanticDirectInvocations, init_javascriptSemanticEffectLog, init_javascriptSemanticEffectRecord, init_javascriptSemanticEvaluationOrder, init_javascriptSemanticExecutionPoints, init_javascriptSemanticGetterQueries, init_javascriptSemanticGetterResultWalker, init_javascriptSemanticGlobalReference, init_javascriptSemanticIntrinsicInstances, init_javascriptSemanticIterationSources, init_javascriptSemanticMutationInitializers, init_javascriptSemanticObjectReferences, init_javascriptSemanticPrimitives, init_javascriptSemanticProjectedSources, init_javascriptSemanticProjection, init_javascriptSemanticPropertyKeys, init_javascriptSemanticProvenance, init_javascriptSemanticReferenceSources, init_javascriptSemanticRequireOrigin, init_javascriptSemanticResourceLimits, init_javascriptSemanticReturnedReferences, init_javascriptSemanticSlots, init_javascriptSemanticState, init_javascriptSemanticTypedArrays, init_javascriptSemanticValues, init_javascriptStaticAnalysisHelpers, intrinsicPrototypeMemberMayHaveChanged, invalidateSemanticRequireDelegateWrites, isIntrinsicGlobalReference, isIntrinsicInstanceMethodCall, isIntrinsicMapLookup, isIntrinsicTypedArrayConstruction, isLexicalPatternDeclaration, isSemanticDirectEvalSite, isTypedArrayNumericIndex, isUnmodifiedGlobalReference, isUnmodifiedImportMetaUrl, isUnshadowedGlobal, javaScriptDefinitionKeyCoercions, javaScriptDefinitionTimeExpressions, javaScriptExecutions, moduleFactory, modulePropertyName, observePossibleCommonJsDelegateWrite, opaqueCodeMayChangeGlobalRead, opaqueCodeMayRebindBinding, prefixedArgument, prototypeMutationMayPrecede, range, rangeForOffsets, recordSemanticGlobalCodeReference, recordSemanticValueLimit, resolveSemanticBindingFromScope, resolveSemanticBindingState, retainSemanticAmbientEffect, retainSemanticInactiveMemberWrites, semanticAliasSelectionChoices, semanticAmbientArrayIterationUnknown, semanticArgumentStaysInSource, semanticArrayLiteralSlots, semanticArrayPatternAcquisitionEffect, semanticArrayPatternCanResumeAfterClose, semanticArrayPatternCloseScope, semanticArrayPatternCloseSelection, semanticArrayPropertyReferences, semanticArrayPrototypeIterationMayChange, semanticBindingAtRead, semanticBindingId, semanticBindingLookupAt, semanticBindingLookupFromScope, semanticBindingMayRejectAssignmentAt, semanticBindingPrecedesCapture, semanticBranchMayBeSkipped, semanticBuiltinNamespacePath, semanticCallableIdForNode, semanticCallableResultExpressions, semanticCallableResultKind, semanticCaptureOrderingIdentity, semanticCapturedSelectionsAfterPropertyRead, semanticClassAccessorReferences, semanticClassCandidates, semanticClassPropertyReferences, semanticContainer, semanticCopiedReferencePath, semanticDirectEvalRecorded, semanticDirectInvocationArgument, semanticEffectMayReachOriginalGlobalProcess, semanticEffectTimingWithinActivation, semanticFactoryLoaderMemberAt, semanticGlobalCodeSites, semanticGlobalProcessOrigin, semanticGlobalProcessPathOrigin, semanticIdentifierRole, semanticIterationCardinality, semanticIterationSources, semanticKnownArrayIteration, semanticKnownSymbolKey, semanticMemberWriteSources, semanticMethodDefinitionExpression, semanticModuleRequireCallAt, semanticModuleRequireReceiver, semanticMutableBuiltinOrigin, semanticMutationInitializers, semanticNativePrototypeChain, semanticNormalizeCapturedSelections, semanticObjectAccessorReferences, semanticObjectPropertyReferences, semanticPatternPropertyReadSources, semanticPrecisionControls, semanticPrimitiveSet, semanticPriorStatementMayExit, semanticProjectedSourceFactsAtRead, semanticPropertyPointer, semanticPropertyReadSources, semanticPrototypeOwners, semanticReadMayObserveEffect, semanticReferenceEffectsAtSite, semanticReferenceEffectsMayHaveChanged, semanticReferenceRole, semanticReferenceRoot, semanticReferenceSourcesInactive, semanticRequireCallAt, semanticRequireExportsIdentity, semanticRequireLoaderAt, semanticRequireOrigin, semanticRequireOriginCandidate, semanticResolutionBlocked, semanticResourceLimitFacts, semanticResourceLimitReason, semanticScopeExitEffect, semanticScopeId, semanticSelectedBranchNodesAt, semanticSelectedMemberMayHaveChanged, semanticSelectedReferenceSlot, semanticShiftCapturedSelections, semanticSlotAtPath, semanticStableInitializer, semanticTopLevelEffectFollowsCapture, semanticVariableScope, sourceRangesEqual, sourceSlice, staticFileExpressionPath, stringValue };