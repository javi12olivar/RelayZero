import * as t from "@babel/types";
import { semanticArrayIndex, } from "./javascriptSemanticPropertyPaths.js";
import { evaluateSemanticExpression, semanticValueDefinitelyDefined, } from "./javascriptSemanticValues.js";
import { semanticSlotAtPath } from "./javascriptSemanticSlots.js";
import { ambientPathMayObserveAt } from "./javascriptSemanticEffectLog.js";
import { semanticArrayIteratorPrototypePath, semanticNativeArrayIteratorIntactAt, } from "./javascriptSemanticArrayLayout.js";
/**
 * Node's wrapper module inherits require. A copy cannot read that delegate
 * unless an earlier own-slot write or opaque module escape may have exposed it.
 */
export const semanticCommonJsRequireOwnEnumerableAt = (capture, state) => ambientPathMayObserveAt(state, capture, ["commonjs-module", "require"], "contents");
const arrayIteratorReturnGlobalOwners = new Set(["Iterator", "Object"]);
/** Select prototype effects from spread sources whose exact index is unknown. */
export const semanticArrayIterationPrototypeEffectPath = (path, kind) => {
    const [namespace, owner, property] = path;
    if (namespace === semanticArrayIteratorPrototypePath[0])
        return path;
    if (namespace !== "global" ||
        typeof owner !== "string" ||
        (owner !== "Array" && !arrayIteratorReturnGlobalOwners.has(owner)))
        return undefined;
    return property === "prototype" ||
        property === null ||
        (kind === "escape" && path.length === 2)
        ? [namespace, owner, "prototype", ...path.slice(3)]
        : undefined;
};
/** Native array iteration preserves numeric slots only while its iterator is intact. */
export const semanticKnownArrayIteration = (value, state, read) => value?.status === "array" &&
    semanticNativeArrayIteratorIntactAt(state, read) &&
    value.items.every((item) => semanticArrayIndex(item.name) !== null);
const arrayIteratorReturnPaths = [
    [...semanticArrayIteratorPrototypePath, "return"],
    [...semanticArrayIteratorPrototypePath, "__proto__", "return"],
    [...semanticArrayIteratorPrototypePath, "__proto__", "__proto__", "return"],
    ...Array.from(arrayIteratorReturnGlobalOwners, (owner) => [
        "global",
        owner,
        "prototype",
        "return",
    ]),
];
/** Whether a native array iterator can observe a possible close hook here. */
const semanticArrayIteratorMayHaveReturnAt = (pattern, state) => arrayIteratorReturnPaths.some((path) => ambientPathMayObserveAt(state, pattern, path, "contents"));
export const isLexicalPatternDeclaration = (owner, state) => {
    if (!t.isVariableDeclarator(owner))
        return false;
    const declaration = state.parentsByNode.get(owner);
    return (t.isVariableDeclaration(declaration) &&
        (declaration.kind === "const" || declaration.kind === "let"));
};
/** A proved lexical inner read can resume its outer iterator after a hook-free close. */
export const semanticArrayPatternCanResumeAfterClose = (pattern, owner, state) => isLexicalPatternDeclaration(owner, state) &&
    !semanticArrayIteratorMayHaveReturnAt(pattern, state);
/** References a possible native close hook can still obtain by advancing its iterator. */
export const semanticArrayPatternCloseSelection = (pattern, owner, array, state) => {
    if (!semanticArrayIteratorMayHaveReturnAt(pattern, state))
        return undefined;
    const last = pattern.elements.at(-1);
    const hasRest = t.isRestElement(last);
    let consumed = 0;
    if (isLexicalPatternDeclaration(owner, state)) {
        for (const [index, element] of pattern.elements.entries()) {
            // A lexical rest drains the iterator only after earlier pattern work
            // reaches it. A preceding default or nested binding can throw first.
            if (hasRest && element === last)
                return undefined;
            const slot = array.items[index];
            const ownSlot = consumed === index &&
                slot?.name === String(index) &&
                slot.presence === "present";
            if (element !== null &&
                !t.isIdentifier(element) &&
                !(hasRest &&
                    owner.id === pattern &&
                    ownSlot &&
                    t.isAssignmentPattern(element) &&
                    t.isIdentifier(element.left) &&
                    semanticValueDefinitelyDefined(slot.value)))
                break;
            if (ownSlot)
                consumed += 1;
            else if (!hasRest)
                break;
        }
    }
    // The literal suffix can be empty while the iterator still has references
    // from stored writes. Resolve those separately at the close site.
    return { excludedKeys: [], startIndex: consumed };
};
/** Invocation spreads use the same native-iteration proof at their source read. */
export const semanticKnownArrayIterationAt = (node, state) => semanticKnownArrayIteration(evaluateSemanticExpression(node, state, node), state, node);
/** Numeric destructuring projections do not select slots of custom iterators. */
export const semanticReferenceIterationUnknown = (source, state) => source.iterationSources?.some((iterable) => !selectedReferenceIterationKnown(iterable, state)) === true;
const selectedReferenceIterationKnown = (source, state) => {
    let values = [evaluateSemanticExpression(source.node, state, source.node)];
    for (const key of source.projection) {
        if (typeof key === "object" && key !== null)
            return false;
        const selected = new Set();
        for (const value of values) {
            if (key === null) {
                // for-of projects any position of a native array. Its finite slot
                // inventory can prove every possible nested iterable without treating
                // a computed object property or custom iterator as an own-index read.
                if (!semanticKnownArrayIteration(value, state, source.node) ||
                    value.unknownItems)
                    return false;
                for (const slot of value.items) {
                    if (slot.presence !== "present")
                        return false;
                    selected.add(slot.value);
                }
            }
            else {
                const slot = semanticSlotAtPath(value, [String(key)]);
                if (slot.presence !== "present")
                    return false;
                selected.add(slot.value);
            }
        }
        values = [...selected];
    }
    return values.every((value) => semanticKnownArrayIteration(value, state, source.node));
};
/** Exclude references whose source slot or destructuring fallback is absent. */
export const semanticReferenceSourcesInactive = (reference, state) => reference.requiredSources?.some((source) => !semanticReferenceIterationUnknown(source, state) &&
    semanticSelectedReferenceSlot(source, state, source.node)?.presence ===
        "absent") === true ||
    reference.fallbackSources?.some((source) => {
        // Selection precedes effects through the chosen reference. A later escape
        // cannot make a fallback that was excluded at destructuring reachable.
        const slot = semanticSelectedReferenceSlot(source, state, source.node);
        return (!semanticReferenceIterationUnknown(source, state) &&
            slot?.presence === "present" &&
            semanticValueDefinitelyDefined(slot.value));
    }) === true;
/** Select a retained source slot at its capture, before later effects. */
export const semanticSelectedReferenceSlot = (source, state, capturePoint) => {
    const path = [];
    for (const key of source.projection) {
        if (key === null || typeof key === "object")
            return undefined;
        path.push(String(key));
    }
    return semanticSlotAtPath(evaluateSemanticExpression(source.node, state, capturePoint), path);
};
