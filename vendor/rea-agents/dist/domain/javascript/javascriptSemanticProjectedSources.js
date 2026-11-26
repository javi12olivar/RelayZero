import * as t from "@babel/types";
import { unwrapJavaScriptExpression } from "./javascriptAstValues.js";
import { semanticObjectPropertyReferences, semanticArrayPropertyReferences, } from "./javascriptSemanticObjectReferences.js";
import { semanticBindingAtRead } from "./javascriptSemanticMutationInitializers.js";
import { semanticBindingMemberWritesObservedAt } from "./javascriptSemanticEffectLog.js";
import { semanticReferenceIterationUnknown, semanticReferenceSourcesInactive, } from "./javascriptSemanticReferenceSources.js";
import { semanticCopiedReferencePath } from "./javascriptSemanticCopiedReferencePaths.js";
import { semanticStoredSourceSelection } from "./javascriptSemanticIterationSources.js";
import { semanticAliasSelectionChoices, } from "./javascriptSemanticAliasSelections.js";
/** The next origin crossed owns a repeated copy boundary at the same depth. */
export const semanticNormalizeCapturedSelections = (selections, pathLength) => {
    const byDepth = new Map();
    for (const capture of selections ?? [])
        if (capture.depth > 0 &&
            (pathLength === undefined || capture.depth <= pathLength))
            byDepth.set(capture.depth, capture);
    const normalized = [...byDepth.values()].sort((left, right) => left.depth - right.depth);
    return normalized.length ? normalized : undefined;
};
/** Keep capture boundaries aligned as a selected prefix is added or consumed. */
export const semanticShiftCapturedSelections = (selections, delta) => {
    const shifted = selections?.flatMap((selection) => selection.depth + delta > 0
        ? [{ ...selection, depth: selection.depth + delta }]
        : []);
    return semanticNormalizeCapturedSelections(shifted);
};
/** Record an object/array property selected when a shallow copy was made. */
export const semanticCapturedSelectionsAfterPropertyRead = (selections, source) => [
    ...(semanticShiftCapturedSelections(selections, source.path.length - 1) ??
        []),
    ...(source.capturedSelectionAt === undefined
        ? []
        : [
            {
                at: source.capturedSelectionAt,
                depth: source.path.length,
                ...(source.ownEnumerable ? { ownEnumerable: true } : {}),
            },
        ]),
];
/** A fresh parent does not prove a descendant receiver is a fresh allocation. */
export const hasFreshProjectedReceiver = (root, path, state) => {
    const pending = [{ node: root, path }];
    const examined = new WeakMap();
    let selections = 0;
    while (pending.length > 0) {
        const current = pending.pop();
        const node = unwrapJavaScriptExpression(current.node).node;
        const key = JSON.stringify(current.path);
        const paths = examined.get(node) ?? new Set();
        if (paths.has(key))
            return false;
        paths.add(key);
        examined.set(node, paths);
        if (++selections > state.precision.alias_selections) {
            state.valueResourceLimits.add("alias-selections");
            return false;
        }
        if (current.path.length === 0) {
            if (!t.isObjectExpression(node) &&
                !t.isArrayExpression(node) &&
                !t.isFunction(node) &&
                !t.isClassExpression(node))
                return false;
            continue;
        }
        const [selected, ...remaining] = current.path;
        const sources = t.isObjectExpression(node)
            ? semanticObjectPropertyReferences(node, [selected], state)
            : t.isArrayExpression(node)
                ? semanticArrayPropertyReferences(node, [selected], state)
                : [];
        if (sources.length === 0)
            return false;
        if (selections + pending.length + sources.length >
            state.precision.alias_selections) {
            state.valueResourceLimits.add("alias-selections");
            return false;
        }
        pending.push(...sources.map((source) => ({
            node: source.node,
            path: [...source.path, ...remaining],
        })));
    }
    return true;
};
/** Select retained assignment and copy sources at one projected member read. */
export const semanticProjectedSourcesAtRead = (...arguments_) => semanticProjectedSourceFactsAtRead(...arguments_)?.sources;
/** Retain the selected receiver's possible owners after its current value becomes opaque. */
export const semanticProjectedSourceEligibilityAtRead = (binding, reference, path, state, memberReadAt = reference, capturedSelections = []) => projectedSourceFactsAtRead(binding, reference, path, state, false, memberReadAt, capturedSelections, true)?.sources;
export function semanticProjectedSourceFactsAtRead(...arguments_) {
    return projectedSourceFactsAtRead(...arguments_);
}
const projectedSourceFactsAtRead = (binding, reference, path, state, includeUnknown, memberReadAt = reference, capturedSelections = [], retainEligibility = false, 
// Accessor lookup reads source syntax. A prior value escape does not hide
// that syntax; unknown writes and invocations still fail closed.
valueEscapesHideSources = true) => {
    const read = semanticBindingAtRead(binding, reference, state);
    const captured = [
        ...read.binding.initializers,
        ...read.binding.referenceInitializers,
    ];
    const normalizedCaptures = semanticNormalizeCapturedSelections(capturedSelections, path.length);
    const captureForDepth = (depth) => normalizedCaptures?.find((capture) => capture.depth >= depth)?.at;
    const selectedAt = (depth) => captureForDepth(depth) ?? memberReadAt;
    const { writes, replaced, superseded, escapeMayPrecede } = semanticBindingMemberWritesObservedAt(state, binding, path, {
        at: selectedAt,
        capturedAt: normalizedCaptures === undefined ? undefined : captureForDepth,
        captured,
    }, hasFreshProjectedReceiver);
    if (includeUnknown && valueEscapesHideSources && escapeMayPrecede())
        return undefined;
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
            return [id, depth, ownEnumerable];
        });
        const key = JSON.stringify([source.path, captures]);
        const keys = sourceKeys.get(source.node) ?? new Set();
        if (keys.has(key))
            return;
        keys.add(key);
        sourceKeys.set(source.node, keys);
        sources.push(source);
    };
    for (const effect of writes) {
        if (!retainEligibility && superseded(effect))
            continue;
        if (!t.isAssignmentExpression(effect.node) ||
            !["=", "||=", "&&=", "??="].includes(effect.node.operator)) {
            if (includeUnknown)
                return undefined;
            continue;
        }
        if (effect.assignedSources === undefined) {
            if (includeUnknown)
                return undefined;
            continue;
        }
        const remaining = path.slice(effect.path.length);
        for (const source of effect.assignedSources) {
            if (semanticReferenceIterationUnknown(source, state))
                return undefined;
            if (semanticReferenceSourcesInactive(source, state))
                continue;
            const [key, ...suffix] = remaining;
            for (const choice of key === undefined
                ? [undefined]
                : semanticAliasSelectionChoices(key)) {
                const selection = semanticStoredSourceSelection(source, choice === undefined ? [] : [choice]);
                if (selection !== null)
                    appendSource({
                        node: source.node,
                        path: [...selection.projection, ...suffix],
                        ...(selection.capturedSelectionDepth === undefined
                            ? {}
                            : {
                                capturedSelections: [
                                    {
                                        at: source.node,
                                        depth: selection.capturedSelectionDepth,
                                        ...(selection.ownEnumerable
                                            ? { ownEnumerable: true }
                                            : {}),
                                    },
                                ],
                            }),
                    });
            }
        }
    }
    const storedSources = [...sources];
    if (!retainEligibility && replaced)
        return { sources, storedSources, retainsOrigin: false };
    for (const initializer of read.binding.initializers) {
        if (semanticReferenceIterationUnknown(initializer, state))
            return undefined;
        if (semanticReferenceSourcesInactive(initializer, state))
            continue;
        appendSource({
            node: initializer.node,
            path: [...initializer.projection, ...path],
        });
    }
    for (const initializer of read.binding.referenceInitializers) {
        if (semanticReferenceIterationUnknown(initializer, state))
            return undefined;
        if (semanticReferenceSourcesInactive(initializer, state))
            continue;
        const [key, ...suffix] = path;
        for (const choice of key === undefined
            ? [undefined]
            : semanticAliasSelectionChoices(key)) {
            const projection = semanticCopiedReferencePath(initializer, choice === undefined ? [] : [choice], "identity");
            if (projection !== null)
                appendSource({
                    node: initializer.node,
                    path: [...projection, ...suffix],
                    capturedSelections: initializer.copyProjectionOffset === undefined
                        ? []
                        : [
                            {
                                at: initializer.node,
                                depth: projection.length + suffix.length - path.length + 1,
                                ...(initializer.copyKind === "object-rest"
                                    ? { ownEnumerable: true }
                                    : {}),
                            },
                        ],
                });
        }
    }
    return { sources, storedSources, retainsOrigin: true };
};
