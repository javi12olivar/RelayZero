import { javaScriptThisOwner } from "./javascriptSourceParser.js";
import * as t from "@babel/types";
import { semanticStaticPropertyKey, unwrapJavaScriptExpression, } from "./javascriptAstValues.js";
import { semanticArgumentStaysInSource, semanticDirectInvocationArgument, } from "./javascriptSemanticDirectInvocations.js";
import { collectJavaScriptIdentityWritesSteps, electronMemberPath, } from "./javascriptElectronMemberWrites.js";
import { createSemanticModuleInterop } from "./javascriptModuleInterop.js";
import { ambientEffectCovers, ambientPathMayObserveAt, opaqueCodeMayChangeGlobalRead, semanticEffectMayFollow, semanticEffectMayPrecede, } from "./javascriptSemanticEffectLog.js";
import { resolveSemanticBindingState, semanticStableInitializer, } from "./javascriptSemanticState.js";
import { isUnshadowedGlobal, semanticBindingAtRead, semanticDefiniteEffectPrecedesReference, } from "./javascriptSemanticMutationInitializers.js";
import { semanticIterationSources } from "./javascriptSemanticIterationSources.js";
import { joinSemanticPropertyPaths, semanticArrayIndex, } from "./javascriptSemanticPropertyPaths.js";
import { semanticArrayPropertyReferences } from "./javascriptSemanticObjectReferences.js";
import { createSemanticReturnedReferences } from "./javascriptSemanticReturnedReferences.js";
import { GLOBAL_OBJECT_NAMES, globalObjectName, globalReferenceNamespace, isIntrinsicGlobalReference, } from "./javascriptSemanticGlobalReference.js";
import { readSemanticRequireLoader } from "./javascriptSemanticRequireOriginSlot.js";
import { semanticArrayIteratorPrototypePath } from "./javascriptSemanticArrayLayout.js";
import { semanticArrayIterationPrototypeEffectPath, semanticReferenceIterationUnknown, semanticReferenceSourcesInactive, } from "./javascriptSemanticReferenceSources.js";
import { semanticCopiedReferencePath } from "./javascriptSemanticCopiedReferencePaths.js";
import { semanticCapturedSelectionsAfterPropertyRead, semanticNormalizeCapturedSelections, semanticShiftCapturedSelections, } from "./javascriptSemanticProjectedSources.js";
import { isIntrinsicTypedArrayConstruction } from "./javascriptSemanticTypedArrays.js";
/**
 * Own static methods of `Object` and `Reflect` in the language. A native one
 * ignores its receiver; any other member, including one `Object` inherits
 * from `Function.prototype`, may be user code that receives the constructor.
 */
const NATIVE_STATIC_METHODS = new Map([
    [
        "Object",
        new Set([
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
            "values",
        ]),
    ],
    [
        "Reflect",
        new Set([
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
            "setPrototypeOf",
        ]),
    ],
]);
/** Global self references retain object identity, rather than adding a property. */
const canonicalAmbientPath = (path) => {
    if (path[0] !== "global")
        return path;
    let firstProperty = 1;
    while (GLOBAL_OBJECT_NAMES.includes(path[firstProperty] ?? ""))
        firstProperty += 1;
    return ["global", ...path.slice(firstProperty)];
};
const arrayIteratorMethods = new Set(["entries", "keys", "values"]);
const intrinsicPrototypeRead = (invocation) => {
    if (invocation?.kind !== "known" || invocation.path.length !== 3)
        return undefined;
    const [, owner, method] = invocation.path;
    if ((owner !== "Object" && owner !== "Reflect") ||
        method !== "getPrototypeOf")
        return undefined;
    const target = invocation.arguments?.[0];
    return t.isNode(target) && !t.isSpreadElement(target) ? target : undefined;
};
/** A normalized native inspection neither retains its target nor uses extra arguments. */
const isReadOnlyPrototypeInspection = (invocation) => intrinsicPrototypeRead(invocation) !== undefined &&
    invocation?.arguments?.every((argument) => t.isExpression(argument)) === true;
const retainedAmbientEffects = new WeakMap();
/** Retain canonical ambient effects once, whether discovered by syntax or receiver expansion. */
export const retainSemanticAmbientEffect = (state, kind, path, node) => {
    const selected = kind === "escape" ? [...path, null] : path;
    const byNode = retainedAmbientEffects.get(state) ?? new Map();
    const keys = byNode.get(node) ?? new Set();
    const key = JSON.stringify([kind, selected]);
    if (keys.has(key))
        return false;
    keys.add(key);
    byNode.set(node, keys);
    retainedAmbientEffects.set(state, byNode);
    if (kind === "write") {
        state.ambientWrites.retain(selected);
        state.ambientWriteEffects.push({ path: selected, node });
    }
    else {
        state.ambientEscapes.retain(selected);
        state.ambientEscapeEffects.push({ path: selected, node });
    }
    return true;
};
/**
 * Select the stored value an object's reference store exposes to a projection,
 * or null when the store cannot reach it. A shorter projection only reaches
 * stored children when the query covers escaped contents.
 */
const storedValueProjection = (suffix, source, path, escapedContents) => {
    if (suffix !== undefined &&
        path !== undefined &&
        (!path.every((key, index) => index >= suffix.length ||
            key === null ||
            suffix[index] === null ||
            key === suffix[index]) ||
            (suffix.length < path.length && !escapedContents)))
        return null;
    return suffix === undefined || path === undefined
        ? undefined
        : [
            ...source.projection.map((key) => key === null || typeof key === "object" ? null : String(key)),
            ...suffix.slice(path.length),
        ];
};
const joinAmbientProjection = (left, right) => left === undefined || right === undefined || left.length !== right.length
    ? undefined
    : left.map((key, index) => (key === right[index] ? key : null));
const sameCaptures = (left, right) => left === right ||
    (left !== undefined &&
        right !== undefined &&
        left.length === right.length &&
        left.every(({ at, depth }, index) => at === right[index]?.at && depth === right[index]?.depth));
/**
 * Follow local object identities without equating shallow copies with their
 * sources. Writes select aliases at their capture; uncertain execution order
 * retains possible initializers. Intrinsic reads stay strict.
 */
export const createAmbientPathResolver = (state, possibleWrites, facts) => {
    const cached = new WeakMap();
    // Member syntax is fixed for this AST across reference-store worklist
    // rounds. Identity resolution still uses the current store facts.
    const memberPaths = new WeakMap();
    const returnedReferences = createSemanticReturnedReferences(state);
    const resolve = (node, capture, escapedContents = false, projection = [], receiver, observes) => {
        const prior = possibleWrites ? undefined : cached.get(node);
        if (prior !== undefined)
            return prior;
        const result = new Map();
        const callerPaths = new Map();
        let hasLocalIdentity = false;
        let projectedSpread = false;
        const unknownReasons = new Set();
        const pending = [
            { node, suffix: projection, readsAtSelf: undefined },
        ];
        const queuedInitializers = new Map();
        const take = () => {
            for (;;) {
                const next = pending.pop();
                if (next === undefined || !("items" in next))
                    return next;
                if (next.remaining === 0)
                    continue;
                next.remaining -= 1;
                if (next.remaining > 0)
                    pending.push(next);
                return next.items[next.remaining];
            }
        };
        // A receiver query reports the objects a write to `node` mutates, as
        // projections that still end at the written key. Once a step consumes that
        // key, the item denotes the value read from the written slot. Replacing
        // the slot does not mutate that value or the containers it was read from.
        const admitted = (suffix) => receiver === undefined || suffix?.length !== 0;
        // Join projections at their producing expression, rather than enumerating
        // alias histories. Each key can only widen to a wildcard, and conflicting
        // depths widen to unknown, so diamonds and cycles have finite state.
        // Null marks a fully widened root. An absent entry has not been visited.
        const expanded = new WeakMap();
        const expansionCaptures = observes === "array-receiver"
            ? new WeakMap()
            : undefined;
        let continued = false;
        const queue = (node, suffix, readsAtSelf, capturedSelections) => {
            if (!admitted(suffix))
                return;
            continued = true;
            // A fully widened root cannot gain a new fact from another widened read.
            // Keep the continuation for coverage even when no expansion is needed.
            if (suffix === undefined) {
                const root = memberPaths.get(node)?.root;
                if (root !== undefined && expanded.get(root) === null)
                    return;
            }
            pending.push({ node, suffix, readsAtSelf, capturedSelections });
        };
        const retain = (path) => {
            let canonical = canonicalAmbientPath(path);
            for (;;) {
                result.set(JSON.stringify(canonical), canonical);
                if (possibleWrites &&
                    canonical[0] === "global" &&
                    canonical[2] === "prototype" &&
                    canonical[3] === "constructor") {
                    canonical = ["global", canonical[1] ?? null, ...canonical.slice(4)];
                    continue;
                }
                // An unknown key may select a global self reference as well as a
                // distinct property. Retain both possible object identities for writes.
                if (!possibleWrites ||
                    canonical[0] !== "global" ||
                    canonical[1] !== null)
                    break;
                canonical = canonicalAmbientPath(["global", ...canonical.slice(2)]);
            }
        };
        for (;;) {
            const current = take();
            if (current === undefined)
                break;
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
                let suffix = current.suffix === undefined || members.length === 0
                    ? current.suffix
                    : [...members, ...current.suffix];
                let capturedSelections = observes === "array-receiver" && members.length > 0
                    ? [
                        { at: current.node, depth: members.length },
                        ...(semanticShiftCapturedSelections(current.capturedSelections, members.length) ?? []),
                    ]
                    : current.capturedSelections;
                const previous = expanded.get(root);
                if (previous !== undefined) {
                    const previousCaptures = expansionCaptures?.get(root);
                    // Multiple aliases may choose the same slot at different reads.
                    // Widen the timing once to the factory read instead of keeping paths
                    // for each alias history. Widened projections drop earlier bounds.
                    if (!sameCaptures(previousCaptures, capturedSelections))
                        capturedSelections = undefined;
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
                    }
                    else
                        suffix = undefined;
                    if (!possibleWrites) {
                        const unresolved = {
                            paths: [],
                            callerPaths: [...callerPaths.values()],
                            ownership: "unknown",
                            unknownReasons: ["widened-projection"],
                        };
                        cached.set(node, unresolved);
                        return unresolved;
                    }
                }
                if (suffix === undefined)
                    capturedSelections = undefined;
                expanded.set(root, suffix ?? null);
                expansionCaptures?.set(root, capturedSelections);
                if (suffix === undefined || suffix.includes(null))
                    unknownReasons.add("widened-projection");
                // A widened projection is a possible write, never proof of an intrinsic.
                if (suffix === undefined && !possibleWrites)
                    continue;
                const continueWith = (node, path = suffix) => queue(node, path, current.readsAtSelf, path !== undefined &&
                    suffix !== undefined &&
                    path.length <= suffix.length
                    ? semanticShiftCapturedSelections(capturedSelections, path.length - suffix.length)
                    : undefined);
                const continueReturned = (callee, path) => {
                    const returned = returnedReferences(callee);
                    // Returned references retain possible source-local values, not a
                    // completeness proof for every runtime callable alternative.
                    unknownReasons.add("unresolved-call");
                    for (const source of returned.references)
                        continueWith(source.node, path === undefined
                            ? undefined
                            : [
                                ...source.projection.map((key) => key === null || typeof key === "object"
                                    ? null
                                    : String(key)),
                                ...path,
                            ]);
                };
                if (observes === "array-receiver" &&
                    (suffix === undefined || suffix.length === 0) &&
                    facts?.arrayIteratorReceiver(root))
                    return {
                        paths: [],
                        callerPaths: [],
                        ownership: "local",
                        unknownReasons: [],
                        possibleArrayReceiver: true,
                    };
                if (!t.isIdentifier(root) && facts?.freshObject(root)) {
                    receiver?.(root, suffix);
                    // The allocation owns itself; a projected child needs its own proof.
                    if (suffix?.length === 0) {
                        hasLocalIdentity = true;
                        resolvedIdentity = true;
                    }
                    for (const [source, path] of facts?.stores.get(root) ?? []) {
                        const readAt = (path === undefined
                            ? undefined
                            : capturedSelections?.find(({ depth }) => path.length <= depth)
                                ?.at) ?? capture;
                        if (observes === "array-receiver" &&
                            readAt !== undefined &&
                            !semanticEffectMayPrecede(state, readAt, source.mutation))
                            continue;
                        const stored = storedValueProjection(suffix, source, path, escapedContents);
                        if (stored === null)
                            continue;
                        queue(source.node, stored, true);
                    }
                }
                if (t.isMetaProperty(root) &&
                    root.meta.name === "import" &&
                    root.property.name === "meta") {
                    retain(["import-meta", ...(suffix ?? [])]);
                    resolvedIdentity = true;
                    continue;
                }
                if (t.isThisExpression(root)) {
                    const owner = javaScriptThisOwner(root, state.program, state.parentsByNode);
                    if (owner === "global") {
                        retain(["global", ...(suffix ?? [])]);
                        resolvedIdentity = true;
                        continue;
                    }
                    if (owner === "caller" && suffix !== undefined) {
                        const path = canonicalAmbientPath(["global", ...suffix]);
                        callerPaths.set(JSON.stringify(path), path);
                    }
                }
                if (t.isIdentifier(root)) {
                    // The wrapper module object is distinct from globalThis.module. Keep
                    // its identity through the same alias/projection owner used for writes.
                    if (isUnshadowedGlobal(root, state, "module")) {
                        retain(["commonjs-module", ...(suffix ?? [])]);
                        resolvedIdentity = true;
                        continue;
                    }
                    if (globalObjectName(root, state) !== undefined) {
                        retain(["global", ...(suffix ?? [])]);
                        resolvedIdentity = true;
                        continue;
                    }
                    if (isUnshadowedGlobal(root, state, root.name)) {
                        retain(["global", root.name, ...(suffix ?? [])]);
                        resolvedIdentity = true;
                        continue;
                    }
                    const binding = resolveSemanticBindingState(state, root, root.name);
                    if (binding === undefined)
                        continue;
                    const readAt = current.readsAtSelf ? root : capture;
                    const atRead = possibleWrites && readAt !== undefined
                        ? semanticBindingAtRead(binding, readAt, state)
                        : undefined;
                    const selected = atRead?.binding ?? binding;
                    if (possibleWrites && atRead?.hasDefiniteInitializer === false)
                        unknownReasons.add("unresolved-value");
                    // A directly invoked function's parameter starts as its argument,
                    // which therefore did not escape at the call. It depends on this
                    // read, so it is queued here rather than with the binding's
                    // initializers.
                    const argument = possibleWrites
                        ? semanticDirectInvocationArgument(root, binding, state)
                        : undefined;
                    if (argument !== undefined)
                        queue(argument, suffix, true, capturedSelections);
                    const bySuffix = queuedInitializers.get(selected) ??
                        new Map();
                    queuedInitializers.set(selected, bySuffix);
                    let suffixKey = JSON.stringify(suffix);
                    let queued = bySuffix.get(suffixKey);
                    if (queued?.capturedSelections !== undefined &&
                        !sameCaptures(queued.capturedSelections, capturedSelections)) {
                        suffixKey = JSON.stringify(["factory-read", suffix]);
                        capturedSelections = undefined;
                        queued = bySuffix.get(suffixKey);
                    }
                    if (queued === undefined) {
                        const stable = possibleWrites
                            ? undefined
                            : semanticStableInitializer(binding, state);
                        const initializers = possibleWrites
                            ? [...selected.initializers, ...selected.referenceInitializers]
                            : stable === undefined
                                ? []
                                : [stable];
                        const items = [];
                        for (const initializer of initializers) {
                            if (semanticReferenceSourcesInactive(initializer, state))
                                continue;
                            // Pattern assignments share the source selection owner with member
                            // effects: copying a container preserves its children, not itself.
                            const path = semanticCopiedReferencePath(initializer, suffix ?? [null], escapedContents ? "escape" : "identity");
                            if (path === null)
                                continue;
                            const projected = suffix === undefined ||
                                semanticReferenceIterationUnknown(initializer, state)
                                ? undefined
                                : path.map((key) => key === null || typeof key === "object"
                                    ? null
                                    : String(key));
                            const captureDepth = "copyProjectionOffset" in initializer &&
                                typeof initializer.copyProjectionOffset === "number"
                                ? initializer.copyProjectionOffset + 1
                                : initializer.projection.length;
                            const retainedCaptures = projected === undefined || suffix === undefined
                                ? undefined
                                : semanticShiftCapturedSelections(capturedSelections, projected.length - suffix.length);
                            const item = {
                                node: initializer.node,
                                readsAtSelf: true,
                                suffix: projected,
                                capturedSelections: observes === "array-receiver" &&
                                    projected !== undefined &&
                                    captureDepth > 0
                                    ? semanticNormalizeCapturedSelections([
                                        { at: initializer.node, depth: captureDepth },
                                        ...(retainedCaptures?.filter(({ depth }) => depth > captureDepth) ?? []),
                                    ], projected.length)
                                    : retainedCaptures,
                            };
                            if (admitted(item.suffix))
                                items.push(item);
                        }
                        queued = { items, capturedSelections, remaining: items.length };
                        bySuffix.set(suffixKey, queued);
                    }
                    // Taken items still count as queued for this read: requeued, they
                    // would have been the same no-op revisits.
                    if (queued.items.length > 0) {
                        continued = true;
                        pending.push(queued);
                    }
                    continue;
                }
                if (possibleWrites &&
                    t.isNewExpression(root) &&
                    (suffix?.[0] === "__proto__" || suffix?.[0] === "constructor")) {
                    continueWith(root.callee, suffix[0] === "__proto__"
                        ? ["prototype", ...suffix.slice(1)]
                        : suffix.slice(1));
                    continue;
                }
                const callResult = possibleWrites &&
                    (t.isCallExpression(root) || t.isOptionalCallExpression(root))
                    ? facts?.callResult(root)
                    : undefined;
                if (callResult?.kind === "prototype") {
                    continueWith(callResult.target, suffix === undefined && observes !== "spread-effects"
                        ? undefined
                        : ["__proto__", ...(suffix ?? [])]);
                    continue;
                }
                // A call that may return a native array iterator can reach the
                // shared prototype through a prototype projection. Its ordinary
                // return alternatives still pass through the same alias walk.
                if (observes !== "array-receiver" &&
                    callResult?.kind === "array-iterator" &&
                    (suffix === undefined ||
                        suffix[0] === null ||
                        suffix[0] === "__proto__" ||
                        (escapedContents && suffix.length === 0)) &&
                    (callResult.receiver === undefined ||
                        resolve(callResult.receiver, callResult.receiver, false, [], undefined, "array-receiver").possibleArrayReceiver === true)) {
                    retain([
                        ...semanticArrayIteratorPrototypePath,
                        ...(suffix?.slice(1) ?? []),
                    ]);
                    resolvedIdentity = true;
                }
                if (possibleWrites &&
                    (t.isCallExpression(root) ||
                        t.isOptionalCallExpression(root) ||
                        t.isNewExpression(root) ||
                        t.isTaggedTemplateExpression(root) ||
                        (escapedContents && (t.isFunction(root) || t.isClass(root))))) {
                    continueReturned(t.isFunction(root) || t.isClass(root)
                        ? root
                        : t.isTaggedTemplateExpression(root)
                            ? root.tag
                            : root.callee, suffix);
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
                    if (value !== undefined)
                        continueWith(value);
                    continue;
                }
                if (possibleWrites &&
                    t.isAssignmentExpression(root) &&
                    root.operator === "=") {
                    continueWith(root.right);
                    continue;
                }
                const key = suffix?.[0];
                // Container escapes reuse the finite worklist, including alias cycles.
                if (escapedContents && suffix?.length === 0) {
                    if (t.isObjectExpression(root)) {
                        for (const property of root.properties)
                            if (t.isSpreadElement(property))
                                // A fresh copy exposes selected children, not its source container.
                                continueWith(property.argument, [null]);
                            else if (t.isObjectProperty(property) &&
                                t.isExpression(property.value))
                                continueWith(property.value, []);
                            else if (t.isObjectMethod(property) && property.kind === "get")
                                continueReturned(property, []);
                        continue;
                    }
                    if (t.isArrayExpression(root)) {
                        for (const element of root.elements)
                            if (t.isSpreadElement(element))
                                continueWith(element.argument, []);
                            else if (t.isExpression(element))
                                continueWith(element, []);
                        continue;
                    }
                }
                if (suffix !== undefined && key === undefined)
                    continue;
                if (t.isObjectExpression(root)) {
                    if (possibleWrites) {
                        for (const property of root.properties) {
                            if (t.isSpreadElement(property))
                                continueWith(property.argument);
                            else if ((t.isObjectProperty(property) &&
                                t.isExpression(property.value)) ||
                                (t.isObjectMethod(property) && property.kind === "get")) {
                                const ownKey = semanticStaticPropertyKey(property.key, property.computed);
                                if (suffix === undefined ||
                                    key === null ||
                                    ownKey === null ||
                                    ownKey === key)
                                    if (t.isObjectMethod(property))
                                        continueReturned(property, suffix?.slice(1));
                                    else if (t.isExpression(property.value))
                                        continueWith(property.value, suffix?.slice(1));
                            }
                        }
                    }
                    else if (suffix !== undefined &&
                        key !== null &&
                        root.properties.every((property) => t.isObjectProperty(property) &&
                            semanticStaticPropertyKey(property.key, property.computed) !==
                                null)) {
                        const property = root.properties.findLast((property) => t.isObjectProperty(property) &&
                            semanticStaticPropertyKey(property.key, property.computed) ===
                                key);
                        if (t.isObjectProperty(property) && t.isExpression(property.value))
                            continueWith(property.value, suffix.slice(1));
                    }
                }
                else if (t.isArrayExpression(root)) {
                    const hasSpread = root.elements.some(t.isSpreadElement);
                    if (possibleWrites && suffix?.[0] === "__proto__") {
                        retain(["global", "Array", "prototype", ...suffix.slice(1)]);
                        resolvedIdentity = true;
                    }
                    else if (suffix === undefined) {
                        if (hasSpread && observes === "ambient-effects")
                            projectedSpread = true;
                        for (const element of root.elements)
                            if (t.isSpreadElement(element))
                                continueWith(element.argument);
                            else if (t.isExpression(element))
                                continueWith(element);
                    }
                    else if (hasSpread
                        ? possibleWrites &&
                            (observes === "spread-effects" || observes === "array-receiver")
                        : possibleWrites || key !== null) {
                        const remaining = suffix.slice(1);
                        for (const source of semanticArrayPropertyReferences(root, [
                            key ?? null,
                        ])) {
                            if (observes === "array-receiver" &&
                                source.iterableFallbackPath !== undefined &&
                                t.isArrayExpression(unwrapJavaScriptExpression(source.node).node)) {
                                // Follow the selected source slot of a fresh array. A
                                // borrowed iterator can still expose the source itself.
                                const path = [
                                    ...source.path.map((part) => part === null || typeof part === "object"
                                        ? null
                                        : String(part)),
                                    ...remaining,
                                ];
                                queue(source.node, path, current.readsAtSelf, semanticNormalizeCapturedSelections(semanticCapturedSelectionsAfterPropertyRead(capturedSelections, source), path.length));
                                continue;
                            }
                            continueWith(source.node, remaining);
                            // Native iteration depends on the effects being collected here.
                            // A spread may expose its receiver or any of its children.
                            if (source.iterableFallbackPath !== undefined)
                                continueWith(source.node, [null, ...remaining]);
                        }
                    }
                    else if (hasSpread &&
                        observes === "ambient-effects" &&
                        (key === null ||
                            (key !== undefined && semanticArrayIndex(key) !== null))) {
                        projectedSpread = true;
                    }
                }
            }
            finally {
                if (!resolvedIdentity && !continued && result.size === pathsBefore)
                    unknownReasons.add("unresolved-value");
            }
        }
        const paths = [...result.values()];
        // A separate walk cannot let a tentative selection mask an ordinary one
        // in the identity cache, or publish unrelated tentative ambient paths.
        const spreadEffectPaths = projectedSpread
            ? resolve(node, capture, escapedContents, projection, undefined, "spread-effects").paths
            : undefined;
        if (paths.length > 0 && hasLocalIdentity)
            unknownReasons.add("mixed-identities");
        const resolution = {
            paths,
            ...(spreadEffectPaths === undefined ? {} : { spreadEffectPaths }),
            callerPaths: [...callerPaths.values()],
            ownership: unknownReasons.size > 0
                ? "unknown"
                : paths.length > 0
                    ? "ambient"
                    : hasLocalIdentity
                        ? "local"
                        : "unknown",
            unknownReasons: [...unknownReasons],
        };
        if (!possibleWrites)
            cached.set(node, resolution);
        return resolution;
    };
    return resolve;
};
/**
 * Index source-local writes through ambient identities and stable aliases.
 * The shared invocation owner resolves intrinsic aliases, bind/call/apply and
 * literal argument spreads. Runtime reachability and arbitrary call effects
 * remain unevaluated; a visible possible write is sufficient.
 */
export function* indexJavaScriptAmbientWritesSteps(program, state, observeOpaqueInvocation, observeWriteSite) {
    const ambientReads = createAmbientPathResolver(state, false);
    const browserReceiverMethods = new Set();
    const storedSites = new WeakSet();
    const storedReferences = [];
    const writes = [];
    const targets = [];
    const escapes = [];
    const prototypeInspections = [];
    // Object/Reflect static calls, settled once every ambient write is known.
    const staticReceivers = [];
    const stores = new WeakMap();
    const interop = createSemanticModuleInterop(state, {
        intrinsicPath: (node) => {
            const [path] = ambientReads(node).paths;
            return path?.[0] === "global" && path.every((key) => key !== null)
                ? ["intrinsic", ...path.slice(1)]
                : undefined;
        },
    });
    const ambientWrites = createAmbientPathResolver(state, true, {
        stores,
        freshObject: interop.isFreshObject,
        arrayIteratorReceiver: (node) => t.isArrayExpression(node) ||
            (t.isNewExpression(node) &&
                (isIntrinsicGlobalReference(node.callee, state, "Array") ||
                    isIntrinsicTypedArrayConstruction(node, state))),
        callResult: (node) => {
            const invocation = interop.intrinsicInvocation(node);
            const prototype = intrinsicPrototypeRead(invocation);
            if (prototype !== undefined)
                return { kind: "prototype", target: prototype };
            if (invocation?.path.length === 4 &&
                invocation.path[1] === "Array" &&
                invocation.path[2] === "prototype" &&
                arrayIteratorMethods.has(invocation.path[3]))
                return { kind: "array-iterator" };
            const callee = unwrapJavaScriptExpression(node.callee).node;
            if (!(t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)))
                return undefined;
            const key = semanticStaticPropertyKey(callee.property, callee.computed);
            if (!(key !== null && arrayIteratorMethods.has(key)) &&
                !(callee.computed &&
                    globalReferenceNamespace(callee.property, state, [
                        "Symbol",
                        "iterator",
                    ]) !== undefined))
                return undefined;
            return { kind: "array-iterator", receiver: callee.object };
        },
    });
    yield* collectJavaScriptIdentityWritesSteps(program, state.erasedSyntaxNodes, (root, kind, writeSite) => {
        if (kind === "opaque-call")
            return [];
        observeWriteSite?.(writeSite);
        // Reassigning a local alias changes the binding, not the referenced object.
        if (kind === "binding")
            return t.isIdentifier(root) &&
                isUnshadowedGlobal(root, state, root.name)
                ? [["global", root.name]]
                : [];
        if (!storedSites.has(writeSite)) {
            storedSites.add(writeSite);
            for (const source of semanticIterationSources(writeSite, state.parentsByNode.get(writeSite) ?? null)) {
                if (source.kind === "reference-store")
                    storedReferences.push(source);
            }
        }
        // Resolve identities after the traversal has collected every local store.
        const id = targets.push({ node: root, capture: writeSite }) - 1;
        return [["pending-target", String(id)]];
    }, interop.intrinsicInvocation, interop.staticString, interop.isFreshObject, (node, path) => {
        writes.push({ node, path });
    }, (node, invocation) => {
        observeOpaqueInvocation?.(node);
        // Escaping objects can change contents without replacing their identity.
        const retainEscape = (target, browserReceiver = false) => {
            escapes.push({ target, node, browserReceiver });
        };
        const arguments_ = t.isTaggedTemplateExpression(node)
            ? node.quasi.expressions
            : node.arguments;
        const inspection = (t.isCallExpression(node) || t.isOptionalCallExpression(node)) &&
            isReadOnlyPrototypeInspection(invocation)
            ? { node, arguments: [] }
            : undefined;
        for (const [index, argument] of arguments_.entries())
            if (t.isNode(argument) &&
                !semanticArgumentStaysInSource(node, index, state)) {
                const value = t.isSpreadElement(argument)
                    ? argument.argument
                    : argument;
                if (inspection === undefined)
                    retainEscape(value);
                else
                    inspection.arguments.push(value);
            }
        if (inspection !== undefined)
            prototypeInspections.push(inspection);
        const callee = unwrapJavaScriptExpression(t.isTaggedTemplateExpression(node) ? node.tag : node.callee).node;
        const browserMethod = invocation?.kind === "known" &&
            invocation.path.length === 2 &&
            ["open", "fetch"].includes(invocation.path[1] ?? "")
            ? invocation.path[1]
            : undefined;
        if (!t.isNewExpression(node) &&
            (t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee))) {
            const owner = invocation?.path[1];
            const method = invocation?.kind === "known" &&
                invocation.path.length === 3 &&
                owner !== undefined &&
                NATIVE_STATIC_METHODS.get(owner)?.has(invocation.path[2] ?? "")
                ? invocation.path.slice(1)
                : undefined;
            if (method !== undefined)
                staticReceivers.push({ node, target: callee.object, method });
            else {
                if (browserMethod !== undefined)
                    browserReceiverMethods.add(browserMethod);
                retainEscape(callee.object, browserMethod !== undefined);
            }
        }
    });
    const pendingStores = new Set(storedReferences);
    // Each dependent keeps the joined projection its latest query reached.
    const dependents = new WeakMap();
    while (pendingStores.size > 0) {
        const source = pendingStores.values().next().value;
        if (source === undefined)
            break;
        pendingStores.delete(source);
        if (source.target === undefined)
            continue;
        const identities = new Map();
        // Record the objects this store mutates, not the values it replaces.
        ambientWrites(source.target, source.mutation, false, [], (node, path) => {
            identities.set(node, identities.has(node)
                ? joinAmbientProjection(identities.get(node), path)
                : path);
        });
        for (const [node, path] of identities) {
            const users = dependents.get(node) ??
                new Map();
            users.set(source, path);
            dependents.set(node, users);
        }
        // Publish only completed queries; each source/root projection can only widen.
        for (const [node, path] of identities) {
            const entries = stores.get(node) ??
                new Map();
            const previous = entries.get(source);
            const joined = entries.has(source)
                ? joinAmbientProjection(previous, path)
                : path;
            if (entries.has(source) &&
                (previous === undefined ||
                    (joined !== undefined &&
                        previous.every((key, index) => key === joined[index]))))
                continue;
            entries.set(source, joined);
            stores.set(node, entries);
            // A receiver query drops a value read from its written slot, so only a
            // nonempty or widened selection can change a dependent's identities.
            for (const [dependent, reached] of dependents.get(node) ?? []) {
                const stored = storedValueProjection(reached, source, joined, false);
                if (stored !== null && stored?.length !== 0)
                    pendingStores.add(dependent);
            }
        }
        yield;
    }
    for (const node of state.escapingThrows)
        escapes.push({ node, target: node.argument, browserReceiver: false });
    for (const source of storedReferences) {
        if (source.target === undefined)
            continue;
        const receiver = ambientWrites(source.target.object, source.mutation);
        if (receiver.ownership !== "local") {
            state.escapingReferenceStores.add(source.target);
            escapes.push({
                node: source.mutation,
                target: source.node,
                browserReceiver: false,
                projection: source.projection.map((key) => key === null || typeof key === "object" ? null : String(key)),
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
        for (const identity of resolved.paths)
            retainSemanticAmbientEffect(state, "write", [...identity, ...suffix], node);
        for (const identity of resolved.spreadEffectPaths ?? []) {
            const prototype = semanticArrayIterationPrototypeEffectPath([...identity, ...suffix], "write");
            if (prototype !== undefined)
                retainSemanticAmbientEffect(state, "write", prototype, node);
        }
    }
    // Settle other ambient effects first. A syntactic resolver call is safe only
    // if no write or opaque escape can replace its native member before this
    // invocation; ambiguous execution order remains conservative.
    const resolverReceivers = [];
    for (const effect of escapes) {
        const { node, target } = effect;
        const callee = t.isCallExpression(node) || t.isOptionalCallExpression(node)
            ? unwrapJavaScriptExpression(node.callee).node
            : undefined;
        if ((t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee)) &&
            callee.object === target &&
            t.isIdentifier(target, { name: "require" }) &&
            isUnshadowedGlobal(target, state, "require") &&
            semanticStaticPropertyKey(callee.property, callee.computed) === "resolve") {
            resolverReceivers.push(effect);
            continue;
        }
        retainEscapeEffect(effect);
    }
    for (const effect of resolverReceivers) {
        const { node } = effect;
        const selected = ["global", "require", "resolve"];
        const mayAffectResolver = (effects, covered) => {
            if (!covered)
                return false;
            const matches = effects.filter((entry) => ambientEffectCovers(entry, selected));
            return (matches.length === 0 ||
                matches.some((entry) => semanticEffectMayPrecede(state, node, entry.node)));
        };
        if ((t.isCallExpression(node) || t.isOptionalCallExpression(node)) &&
            !mayAffectResolver(state.ambientWriteEffects, state.ambientWrites.covers(selected)) &&
            !mayAffectResolver(state.ambientEscapeEffects, state.ambientEscapes.covers(selected)) &&
            readSemanticRequireLoader(node, state, new Set()) === "commonjs-loader")
            continue;
        retainEscapeEffect(effect);
    }
    // A native static method ignores its receiver. A source write or escape
    // that may replace the method before this call makes it user code, which
    // receives the constructor. (Its prototype chain is not consulted: the
    // method is an own property.)
    for (const { node, target, method } of staticReceivers)
        if (ambientPathMayObserveAt(state, node, ["global", ...method], "contents"))
            retainEscapeEffect({ node, target, browserReceiver: false });
        else
            state.retainedGlobalCallReceivers.add(target);
    // Validate the normalized dispatch at its intrinsic captures. A rejected
    // call can expose a helper used by an earlier textual call in a deferred
    // activation. Recheck provisional reads once after publishing those escapes.
    // If that pass adds another relevant effect, conservatively retain the
    // remaining escapes instead of rescanning the whole source to a fixed point.
    const firstInspectionPass = retainOpaquePrototypeInspections(prototypeInspections);
    if (firstInspectionPass.changed) {
        const secondInspectionPass = retainOpaquePrototypeInspections(firstInspectionPass.provisional);
        if (secondInspectionPass.changed)
            for (const inspection of secondInspectionPass.provisional)
                retainPrototypeInspectionArguments(inspection);
    }
    function retainOpaquePrototypeInspections(inspections) {
        const provisional = [];
        let changed = false;
        for (const inspection of inspections) {
            const invocation = interop.intrinsicInvocation(inspection.node, undefined, (capture, path) => ambientPathMayObserveAt(state, capture, ["global", ...path.slice(1)], "contents") || opaqueCodeMayChangeGlobalRead(capture, state, path[1] ?? ""));
            if (isReadOnlyPrototypeInspection(invocation))
                provisional.push(inspection);
            else
                changed = retainPrototypeInspectionArguments(inspection) || changed;
        }
        return { provisional, changed };
    }
    function retainPrototypeInspectionArguments({ node, arguments: argumentValues, }) {
        let changed = false;
        for (const target of argumentValues)
            changed =
                retainEscapeEffect({ node, target, browserReceiver: false }, true) ||
                    changed;
        return changed;
    }
    function retainEscapeEffect({ node, target, browserReceiver, projection }, trackPrototypeInspectionEffects = false) {
        const resolved = ambientWrites(target, node, true, projection, undefined, "ambient-effects");
        if (browserReceiver &&
            resolved.ownership === "ambient" &&
            resolved.paths.length > 0 &&
            resolved.paths.every((path) => path.length === 1 && path[0] === "global"))
            state.retainedGlobalCallReceivers.add(target);
        let changed = false;
        const paths = resolved.spreadEffectPaths === undefined
            ? resolved.paths
            : [
                ...resolved.paths,
                ...resolved.spreadEffectPaths.flatMap((identity) => {
                    const path = semanticArrayIterationPrototypeEffectPath(identity, "escape");
                    return path === undefined ? [] : [path];
                }),
            ];
        for (const path of paths) {
            // Only proven browser APIs keep their global receiver from user code.
            if (browserReceiver && path.length === 1 && path[0] === "global")
                continue;
            const retained = retainSemanticAmbientEffect(state, "escape", path, node);
            changed ||=
                retained &&
                    trackPrototypeInspectionEffects &&
                    (path[0] === semanticArrayIteratorPrototypePath[0] ||
                        (path[0] === "global" &&
                            (path.length === 1 ||
                                path[1] === null ||
                                ["Array", "Function", "Object", "Reflect"].includes(path[1] ?? ""))));
        }
        return changed;
    }
    // A function may call a browser method replaced later in source order.
    if ([...browserReceiverMethods].some((method) => state.ambientWrites.covers(["global", method])))
        state.ambientEscapes.retain(["global", null]);
}
/** Reuse retained write provenance and activation ordering at a selected read.
 * The reader retains only matching effects, refreshing when their owner grows.
 * Missing timing, possibly repeated activations, conditional replacements and
 * parent writes stay unknown. */
export const createGlobalReferenceReader = (state, path) => {
    const read = createGlobalPathRead(state, path);
    return (callee) => {
        const namespace = globalReferenceNamespace(callee, state, path);
        return namespace === undefined
            ? { status: "unrelated" }
            : read(callee, namespace);
    };
};
/** Read an implicit intrinsic property at its actual source site, without inventing a callee. */
export const createGlobalPathReader = (state, path) => {
    const read = createGlobalPathRead(state, path);
    return (site) => read(site, null);
};
const createGlobalPathRead = (state, path) => {
    const selected = ["global", ...path];
    let writesGeneration = -1;
    let escapesGeneration = -1;
    const byNamespace = new Map();
    return (site, namespace) => {
        const covered = (paths) => paths.covers(selected) ||
            (namespace !== null && paths.covers(["global", namespace]));
        const writesCovered = covered(state.ambientWrites);
        const escapesCovered = covered(state.ambientEscapes);
        if (!writesCovered && !escapesCovered)
            return { status: "unmodified" };
        if (writesGeneration !== state.ambientWriteEffects.length ||
            escapesGeneration !== state.ambientEscapeEffects.length) {
            writesGeneration = state.ambientWriteEffects.length;
            escapesGeneration = state.ambientEscapeEffects.length;
            byNamespace.clear();
        }
        let effects = byNamespace.get(namespace);
        if (effects === undefined) {
            const matches = (effect) => ambientEffectCovers(effect, selected) ||
                (namespace !== null &&
                    ambientEffectCovers(effect, ["global", namespace]));
            effects = {
                writes: state.ambientWriteEffects.filter(matches),
                escapes: state.ambientEscapeEffects.filter(matches),
            };
            byNamespace.set(namespace, effects);
        }
        const escapePrecedesRead = effects.escapes.some(({ node }) => {
            // Selecting this callee precedes exposing its own receiver. Other reads,
            // including arguments, need activation-aware ordering across repetitions.
            if ((t.isCallExpression(node) || t.isOptionalCallExpression(node)) &&
                node.callee === site)
                return false;
            return semanticEffectMayPrecede(state, site, node);
        });
        if ((escapesCovered && effects.escapes.length === 0) ||
            escapePrecedesRead ||
            (writesCovered && effects.writes.length === 0))
            return { status: "unknown" };
        const active = effects.writes.filter((effect) => semanticEffectMayPrecede(state, site, effect.node));
        if (active.length === 0)
            return { status: "unmodified" };
        if (active.some((effect) => effect.path.length !== selected.length ||
            !effect.path.every((key, index) => key === selected[index])))
            return { status: "unknown" };
        return globalPathReplacement(state, path, site, active);
    };
};
/** Select a definite replacement only when every competing write is proven earlier. */
const globalPathReplacement = (state, path, site, effects) => {
    let replacement;
    for (const effect of effects) {
        const write = effect.node;
        const writeNamespace = t.isAssignmentExpression(write)
            ? globalReferenceNamespace(write.left, state, path)
            : undefined;
        if (t.isAssignmentExpression(write, { operator: "=" }) &&
            writeNamespace !== undefined &&
            (writeNamespace === null ||
                !state.ambientWrites.covers(["global", writeNamespace])) &&
            semanticDefiniteEffectPrecedesReference(write, site, state.parentsByNode) &&
            (replacement === undefined ||
                semanticDefiniteEffectPrecedesReference(replacement, write, state.parentsByNode)))
            replacement = write;
    }
    if (replacement === undefined)
        return { status: "unknown" };
    const confirmed = replacement;
    if (effects.some((effect) => effect.node !== confirmed &&
        semanticEffectMayFollow(state, confirmed, effect.node) &&
        (effect.node === undefined ||
            !semanticDefiniteEffectPrecedesReference(effect.node, confirmed, state.parentsByNode))))
        return { status: "unknown" };
    return { status: "replacement", value: confirmed.right };
};
