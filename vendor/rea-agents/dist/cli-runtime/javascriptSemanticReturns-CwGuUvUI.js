import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS, init_javascriptSemanticPrecision } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { init_javascriptAstValues, unwrapJavaScriptExpression } from "./javascriptSourceParser-DNZsD0XO.js";
import { evaluateSemanticExpression, init_javascriptSemanticCallableResults, init_javascriptSemanticMutationInitializers, init_javascriptSemanticProjection, init_javascriptSemanticResourceLimits, init_javascriptSemanticSlots, init_javascriptSemanticState, init_javascriptSemanticValues, init_javascriptStaticAnalysisHelpers, range, resolveSemanticBindingState, semanticBindingAtRead, semanticCallableIdForNode, semanticCallableResultExpressions, semanticContainer, semanticPropertyPointer, semanticResourceLimitFacts } from "./javascriptSemanticProjection-BqYDHF-_.js";
import * as t from "@babel/types";

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
//#region dist/domain/javascript/javascriptSemanticReturns.js
var collectSemanticReturns, semanticReturnSiteId, resolveSemanticModuleCallables, directReturnExpressions, callableIdsForBinding, callableIdsForNode, flattenSemanticReturnValue, flattenValue;
function init_javascriptSemanticReturns() {
	return (init_javascriptSemanticReturns = __esmMin((() => {
		init_javascriptSemanticSlots();
		init_unicodeCodePointOrder();
		init_javascriptSemanticProjection();
		init_javascriptAstValues();
		init_javascriptSemanticState();
		init_javascriptSemanticValues();
		init_javascriptStaticAnalysisHelpers();
		init_javascriptSemanticCoverage();
		init_javascriptSemanticCallableResults();
		init_javascriptSemanticMutationInitializers();
		collectSemanticReturns = (state, parserPartial) => {
			return state.callables.map((callable) => {
				const node = state.callableNodesById.get(callable.callableId);
				if (node === undefined) return {
					...callable,
					returnCoverage: {
						status: "partial",
						retainedCount: 0,
						omittedCount: null
					}
				};
				const expressions = directReturnExpressions(node);
				const sites = [];
				for (const expression of expressions) {
					const returned = expression.node === null ? null : unwrapJavaScriptExpression(expression.node).node;
					sites.push({
						returnSiteId: semanticReturnSiteId(callable.callableId, expression.location),
						location: expression.location,
						identityReferenceLocation: returned !== null && t.isIdentifier(returned) ? range(returned) : null,
						valueExpressionLocation: returned === null ? null : range(returned),
						value: expression.node === null ? {
							status: "unknown",
							reason: "Return has no value."
						} : evaluateSemanticExpression(expression.node, state)
					});
				}
				return {
					...callable,
					returnSites: sites,
					returnCoverage: semanticReturnCoverage(sites.length, parserPartial)
				};
			});
		};
		semanticReturnSiteId = (callableId, location) => [
			callableId,
			"return",
			String(location.start.line),
			String(location.start.column),
			String(location.end.line),
			String(location.end.column)
		].join(":");
		resolveSemanticModuleCallables = (state, callables, bindings) => {
			const callableIds = new Set(callables.map(({ callableId }) => callableId));
			const provenanceByBinding = new Map(bindings.map(({ bindingId, provenance }) => [bindingId, provenance]));
			return state.moduleLinks.map((link) => {
				if (link.kind === "type-import") return {
					...link,
					callableId: null
				};
				const captured = state.defaultExportExpressions.get(link);
				if (link.localName === null && captured === undefined) return link.callableId !== null && callableIds.has(link.callableId) ? link : {
					...link,
					callableId: null
				};
				const binding = state.moduleLinkBindings.get(link);
				const resolved = captured !== undefined ? callableIdsForNode(captured, state, callableIds, new Set(), true) : binding === undefined ? [] : callableIdsForBinding(binding, state, callableIds, new Set());
				const provenance = binding === undefined || link.specifier !== null ? undefined : provenanceByBinding.get(binding.bindingId);
				const resolutionMode = provenance?.status === "module" ? provenance.origins[0].resolutionMode : undefined;
				return {
					...link,
					...resolutionMode !== undefined ? { resolutionMode } : {},
					callableId: resolved.length === 1 ? resolved[0] ?? null : null
				};
			});
		};
		directReturnExpressions = (callable) => semanticCallableResultExpressions(callable).filter(({ kind }) => kind === "return").map(({ node, site }) => ({
			node,
			location: range(site)
		}));
		callableIdsForBinding = (binding, state, admitted, seen, read) => {
			if (seen.has(binding.bindingId) || read === undefined && binding.initializers.length !== 1 || binding.definitions.some(({ kind }) => read === undefined && kind === "assignment" || kind === "parameter" || kind === "catch")) return [];
			const selected = read === undefined ? binding : semanticBindingAtRead(binding, read, state).binding;
			const initializer = selected.initializers[0];
			if (initializer === undefined || selected.initializers.length !== 1 || initializer.projection.length > 0 || state.conditionallySkippedExpressions.has(initializer.node)) return [];
			return callableIdsForNode(initializer.node, state, admitted, new Set([...seen, binding.bindingId]), read !== undefined);
		};
		callableIdsForNode = (node, state, admitted, seen, snapshot = false) => {
			const unwrapped = unwrapJavaScriptExpression(node).node;
			if (unwrapped !== node) return callableIdsForNode(unwrapped, state, admitted, seen, snapshot);
			const direct = semanticCallableIdForNode(node);
			if (direct !== null && admitted.has(direct)) return [direct];
			if (t.isIdentifier(node)) {
				const binding = resolveSemanticBindingState(state, node, node.name);
				return binding === undefined ? [] : callableIdsForBinding(binding, state, admitted, seen, snapshot ? node : undefined);
			}
			return [];
		};
		flattenSemanticReturnValue = (value) => {
			const fields = [];
			const propertyCoverage = [];
			flattenValue(value, "", fields, propertyCoverage);
			fields.sort((left, right) => compareUnicodeCodePoints(left.path, right.path));
			propertyCoverage.sort((left, right) => compareUnicodeCodePoints(left.path, right.path));
			return {
				fields,
				propertyCoverage
			};
		};
		flattenValue = (value, path, fields, coverage, presence = "present") => {
			if (presence !== "present") {
				fields.push({
					path,
					presence,
					state: "unknown",
					value: null,
					reason: "reason" in value ? value.reason : "Property presence is uncertain."
				});
				return;
			}
			if (value.status === "literal") {
				fields.push({
					path,
					presence,
					state: "literal",
					value: value.value,
					reason: null
				});
				return;
			}
			if (value.status === "union") {
				fields.push({
					path,
					presence,
					state: "union",
					value: [...value.values],
					reason: null
				});
				return;
			}
			if ("reason" in value) {
				fields.push({
					path,
					presence,
					state: "unknown",
					value: null,
					reason: value.reason
				});
				return;
			}
			const container = semanticContainer(value);
			coverage.push({
				path,
				...container.coverage
			});
			for (const slot of container.slots) flattenValue(slot.value, `${path}${semanticPropertyPointer([slot.name])}`, fields, coverage, slot.presence);
		};
	})))();
}

//#endregion
export { RETURNED_REFERENCE_WIDENING_LIMITATION, collectSemanticReturns, flattenSemanticReturnValue, init_javascriptSemanticCoverage, init_javascriptSemanticReturns, resolveSemanticModuleCallables, semanticCoverage, semanticCoverageResourceLimits, semanticResourceLimitCoverage };