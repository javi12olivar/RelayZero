import * as t from "@babel/types";
import { javaScriptExpressionWrapperTarget, unwrapJavaScriptExpression, } from "./javascriptAstValues.js";
import { ambientPathMayObserveAt, semanticOpaqueGlobalMayHaveChanged, } from "./javascriptSemanticEffectLog.js";
/** Shared intrinsic reached through a native array iterator's prototype. */
export const semanticArrayIteratorPrototypePath = [
    "array-iterator-prototype",
];
const iteratorNextPath = [
    ...semanticArrayIteratorPrototypePath,
    "next",
];
export const semanticNativeArrayIteratorIntactAt = (state, acquisition) => !state.arrayIterationUnknown &&
    !semanticOpaqueGlobalMayHaveChanged(acquisition, state) &&
    !ambientPathMayObserveAt(state, acquisition, iteratorNextPath, "contents");
const denseInlineSlots = (spread, state, allowance) => {
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
        return t.isArrayExpression(argument) &&
            semanticNativeArrayIteratorIntactAt(state, part)
            ? argument
            : undefined;
    };
    const root = spreadArray(spread);
    if (root === undefined || !takeSelection())
        return undefined;
    const pending = [{ array: root, index: 0 }];
    const slots = [];
    while (pending.length > 0) {
        const frame = pending.at(-1);
        if (frame.index === frame.array.elements.length) {
            pending.pop();
            continue;
        }
        if (!takeSelection())
            return undefined;
        const element = frame.array.elements[frame.index++];
        if (element === null)
            return undefined;
        if (t.isSpreadElement(element)) {
            const array = spreadArray(element);
            if (array === undefined)
                return undefined;
            pending.push({ array, index: 0 });
        }
        else
            slots.push({ kind: "slot", element, depth: pending.length + 1 });
    }
    return slots;
};
/** Source slots in destination order, with unresolved spread positions explicit. */
export function* semanticArrayLiteralLayout(root, state) {
    const allowance = { remaining: state?.precision.alias_selections ?? 0 };
    let opaque = false;
    for (const element of root.elements) {
        if (!t.isSpreadElement(element)) {
            yield { kind: "slot", element, depth: 1 };
            continue;
        }
        const slots = !opaque && state !== undefined
            ? denseInlineSlots(element, state, allowance)
            : undefined;
        if (slots !== undefined)
            yield* slots;
        else {
            opaque = true;
            yield { kind: "opaque-spread", argument: element.argument };
        }
    }
}
/** Find where a literal element's identity is stored, including inline copies. */
export const semanticArrayLiteralElementOwner = (element, array, state) => {
    const { parentsByNode } = state;
    while (true) {
        let operand = array;
        let spread = parentsByNode.get(operand);
        while (spread !== undefined &&
            javaScriptExpressionWrapperTarget(spread) === operand) {
            operand = spread;
            spread = parentsByNode.get(operand);
        }
        if (!t.isSpreadElement(spread) || spread.argument !== operand)
            break;
        const destination = parentsByNode.get(spread);
        if (!t.isArrayExpression(destination))
            break;
        array = destination;
    }
    let minimumIndex = 0;
    let uncertainIndex = false;
    for (const part of semanticArrayLiteralLayout(array, state)) {
        if (part.kind === "opaque-spread") {
            uncertainIndex = true;
            continue;
        }
        if (part.element === element)
            return {
                array,
                key: uncertainIndex
                    ? { excludedKeys: [], startIndex: minimumIndex }
                    : minimumIndex,
            };
        minimumIndex++;
    }
    return undefined;
};
/** A complete index for consumers that need repeated lookups in one query. */
export const semanticArrayLiteralSlots = (root, state) => {
    if (root.elements.every((element) => !t.isSpreadElement(element)))
        return root.elements;
    const slots = [];
    for (const part of semanticArrayLiteralLayout(root, state)) {
        if (part.kind === "opaque-spread")
            return undefined;
        slots.push(part.element);
    }
    return slots;
};
