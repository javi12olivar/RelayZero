import * as t from "@babel/types";
import { createSemanticCallableIdStack } from "./javascriptSemanticCallableStack.js";
import { readExactJavaScriptLiteral, semanticStaticPropertyName, unwrapJavaScriptExpression, } from "./javascriptAstValues.js";
import { resolveSemanticBindingState, semanticResolutionBlocked, } from "./javascriptSemanticState.js";
import { semanticBindingAtRead } from "./javascriptSemanticMutationInitializers.js";
import { traverseJavaScriptValueAst } from "./javascriptSemanticTraversal.js";
import { isIntrinsicGlobalReference, isUnmodifiedGlobalReference, } from "./javascriptSemanticGlobalReference.js";
import { opaqueCodeMayChangeGlobalRead } from "./javascriptSemanticEffectLog.js";
import { createGlobalReferenceReader } from "./javascriptSemanticAmbientWrites.js";
import { range } from "./javascriptStaticAnalysisHelpers.js";
import { builtinDataEffectIdentity, dataEffectArgumentBindingId, dataEffectLiteralString, dataEffectMemberCallee, assignedSemanticResultBindings, scalarAssignedResultBinding, semanticProjectedBindingFacts, } from "./javascriptSemanticDataEffectHelpers.js";
const EVENT_REGISTER_METHODS = [
    "on",
    "once",
    "addListener",
    "prependListener",
    "prependOnceListener",
];
const EVENT_REMOVE_METHODS = [
    "off",
    "removeListener",
    "removeAllListeners",
];
/**
 * Methods whose argument position 1 names a listener. `removeAllListeners`
 * takes only an optional event name, and `emit` passes its remaining
 * arguments as data to listeners that already exist.
 */
const EVENT_LISTENER_METHODS = [...EVENT_REGISTER_METHODS, "off", "removeListener"];
const EVENT_METHODS = [
    ...EVENT_REGISTER_METHODS,
    ...EVENT_REMOVE_METHODS,
    "emit",
];
const TIMER_SCHEDULE_METHODS = [
    "setTimeout",
    "setInterval",
    "setImmediate",
];
const TIMER_CANCEL_METHODS = [
    "clearTimeout",
    "clearInterval",
    "clearImmediate",
];
/**
 * Node keeps two timer handle families. `clearTimeout` and `clearInterval` are
 * aliases that act only on a `Timeout` from `setTimeout` or `setInterval`, and
 * `clearImmediate` acts only on an `Immediate` from `setImmediate`. Clearing
 * within a family always cancels. Clearing across the families is
 * runtime-dependent: `setImmediate` then `clearTimeout`/`clearInterval` never
 * cancels, but `setTimeout` then `clearImmediate` reports as cancelled on some
 * supported Node versions and fires on others. The analysis therefore treats a
 * cross-family clear as unresolved rather than as proof that the timer kept
 * running.
 */
const timerHandleFamily = (method) => method === "setImmediate" || method === "clearImmediate"
    ? "immediate"
    : "timeout";
/** Recover explicit EventEmitter and Node timer candidates from inert syntax. */
export const collectJavaScriptSemanticAsyncEffects = (program, state, callables) => {
    const events = [];
    const timers = [];
    const delayConstructors = new Map([
        ["Symbol", createGlobalReferenceReader(state, ["Symbol"])],
        ["BigInt", createGlobalReferenceReader(state, ["BigInt"])],
    ]);
    const callableIds = new Set(callables.map(({ callableId }) => callableId));
    const callableStack = createSemanticCallableIdStack(callableIds);
    const ancestors = [];
    traverseJavaScriptValueAst(program, state.erasedSyntaxNodes, {
        enter: (node, parent) => {
            callableStack.enter(node, parent);
            if (t.isCallExpression(node) || t.isOptionalCallExpression(node)) {
                const ownerCallableId = callableStack.callables.at(-1) ?? null;
                collectEvent(node, ownerCallableId, state, events);
                collectTimer({
                    node,
                    ownerCallableId,
                    state,
                    output: timers,
                    delayConstructors,
                    ancestors,
                });
            }
            ancestors.push(node);
        },
        exit: (node) => {
            ancestors.pop();
            callableStack.exit(node);
        },
    });
    return {
        eventOperations: events,
        timerOperations: resolveTimers(timers),
    };
};
/**
 * A listener must be a function, and Node throws `ERR_INVALID_ARG_TYPE` before
 * anything is registered or removed when it is not. An exactly readable literal
 * that cannot be a function is therefore not an event operation, while an
 * identifier, a call result or a spread may still supply one and keeps its
 * operation.
 *
 * A class expression passes Node's own `typeof` check, so it is kept.
 */
export const rejectsSemanticEventListener = (listener) => {
    if (listener === undefined)
        return true;
    if (t.isSpreadElement(listener))
        return false;
    const value = unwrapJavaScriptExpression(listener).node;
    if (t.isFunctionExpression(value) || t.isArrowFunctionExpression(value))
        return false;
    if (t.isClassExpression(value))
        return false;
    // A numeric literal is always a number, including the non-finite value Babel
    // stores for `1e999`, which the exact-value reader refuses to price.
    if (t.isNumericLiteral(value))
        return true;
    // Every unary operator yields a primitive, and a primitive is never callable.
    return (t.isUnaryExpression(value) ||
        readExactJavaScriptLiteral(value).found ||
        t.isTemplateLiteral(value) ||
        t.isBigIntLiteral(value) ||
        t.isRegExpLiteral(value) ||
        t.isArrayExpression(value) ||
        t.isObjectExpression(value));
};
const collectEvent = (node, ownerCallableId, state, output) => {
    const member = dataEffectMemberCallee(node);
    if (member === null)
        return;
    const method = EVENT_METHODS.find((candidate) => candidate ===
        semanticStaticPropertyName(member.property, member.computed));
    if (method === undefined)
        return;
    const kind = eventKind(method);
    const eventArgument = node.arguments[0];
    const listenerArgument = EVENT_LISTENER_METHODS.includes(method)
        ? node.arguments[1]
        : undefined;
    // A leading spread shifts the runtime argument positions, so argument 1 is not
    // provably the listener: `e.on(...["x", fn], 1)` registers `fn` and ignores the
    // trailing `1`.
    if (EVENT_LISTENER_METHODS.includes(method) &&
        !t.isSpreadElement(eventArgument) &&
        rejectsSemanticEventListener(listenerArgument))
        return;
    const emitter = emitterIdentity(member.object, state);
    const eventName = dataEffectLiteralString(eventArgument);
    output.push({
        eventId: `event:${kind}:${String(node.start ?? -1)}:${String(node.end ?? -1)}`,
        kind,
        method,
        location: range(node),
        ownerCallableId,
        emitterKey: emitter.key,
        emitterBindingId: emitter.bindingId,
        eventName,
        listenerBindingId: dataEffectArgumentBindingId(listenerArgument, state),
        listenerLocation: t.isNode(listenerArgument)
            ? range(listenerArgument)
            : null,
        resolution: eventName === null
            ? "unresolved"
            : emitter.complete
                ? "complete"
                : "partial",
    });
};
const eventKind = (method) => {
    if (EVENT_REGISTER_METHODS.some((candidate) => candidate === method))
        return "register";
    if (EVENT_REMOVE_METHODS.some((candidate) => candidate === method))
        return "remove";
    return "dispatch";
};
const emitterIdentity = (node, state) => {
    if (t.isIdentifier(node)) {
        const binding = resolveSemanticBindingState(state, node, node.name);
        if (binding !== undefined) {
            const read = semanticBindingAtRead(binding, node, state);
            const origins = [
                ...read.binding.initializers,
                ...read.binding.referenceInitializers,
            ];
            const replaced = binding.definitions.some(({ kind }) => kind === "assignment");
            const origin = origins.length === 1 ? origins[0] : undefined;
            const complete = !replaced ||
                (read.status === "ordered" &&
                    read.hasDefiniteInitializer &&
                    origin !== undefined);
            return {
                key: !replaced
                    ? `binding:${binding.bindingId}`
                    : complete
                        ? `binding:${binding.bindingId}:origin:${origin?.node.start ?? -1}:${origin?.node.end ?? -1}`
                        : `expression:${node.start ?? -1}:${node.end ?? -1}`,
                bindingId: binding.bindingId,
                complete,
            };
        }
        return {
            key: `global:${node.name}`,
            bindingId: null,
            complete: !semanticResolutionBlocked(state, node, node.name),
        };
    }
    if (t.isThisExpression(node)) {
        let owner = state.parentsByNode.get(node);
        while (owner !== undefined &&
            !t.isClass(owner) &&
            !(t.isFunction(owner) && !t.isArrowFunctionExpression(owner)))
            owner = state.parentsByNode.get(owner);
        // Lexical receiver ownership does not establish one runtime instance.
        return {
            key: `this:${owner?.start ?? -1}:${owner?.end ?? -1}`,
            bindingId: null,
            complete: false,
        };
    }
    return {
        key: `expression:${String(node.start ?? -1)}:${String(node.end ?? -1)}`,
        bindingId: null,
        complete: false,
    };
};
/**
 * A timer associated with the Node `timers` module, either proven or
 * conditional, rather than a bare global. Browser and Electron renderer sources
 * reach this analysis without a Node/browser distinction, and there `setTimeout("refresh()", 0)` is a real
 * timer: the string is evaluated by the host. Node's callback rule therefore
 * applies when interpreting the call as `node:timers`, where that form
 * cannot create a Node timer even if the module identity is conditional.
 */
const nodeBuiltinTimerMethod = (callee, state) => {
    const identity = builtinDataEffectIdentity(callee, state, [
        "timers",
        "node:timers",
    ]);
    return admittedTimerMethod(identity?.path.length === 1 ? (identity.path[0] ?? "") : "");
};
/**
 * A schedule imported from Node's `timers` module requires a function in
 * argument 0. Node validates it before creating a handle, so a provable literal
 * that is not a function throws ERR_INVALID_ARG_TYPE synchronously and no timer
 * exists. Only literals the analyzer can read exactly are decided; an identifier
 * or call may still be a function at runtime.
 */
const schedulesWithNonFunctionCallback = (node, state) => {
    if (!t.isCallExpression(node) && !t.isOptionalCallExpression(node))
        return false;
    const argument = node.arguments[0];
    // No argument at all cannot be a function. A spread may still expand to one.
    if (argument === undefined)
        return true;
    if (t.isSpreadElement(argument))
        return false;
    const value = unwrapJavaScriptExpression(argument).node;
    if (t.isFunctionExpression(value) || t.isArrowFunctionExpression(value))
        return false;
    if (t.isStringLiteral(value) ||
        t.isNumericLiteral(value) ||
        t.isBigIntLiteral(value) ||
        t.isBooleanLiteral(value) ||
        t.isNullLiteral(value) ||
        t.isTemplateLiteral(value) ||
        t.isArrayExpression(value) ||
        t.isObjectExpression(value))
        return true;
    // `undefined`, `NaN` and `Infinity` are unmodified globals, and none is a
    // function. A shadowed binding may still hold one, so only the global counts.
    if (t.isIdentifier(value) &&
        ["undefined", "NaN", "Infinity"].includes(value.name) &&
        isIntrinsicGlobalReference(value, state, value.name))
        return true;
    // A class passes Node's own typeof check; invoking it is a separate failure,
    // so the schedule itself still happens. Every other unary operator (including
    // `void`, `!`, `~`, `typeof` and `delete`) yields a primitive, never a
    // function.
    return t.isUnaryExpression(value);
};
// Node converts timeout and interval delays to numbers before creating a handle.
// BigInt and Symbol values throw there. A spread can shift the delay slot, and
// shadowed or replaced constructors cannot establish the argument's type.
const schedulesWithInvalidDelay = (node, state, delayConstructors) => {
    if (node.arguments.slice(0, 2).some((argument) => t.isSpreadElement(argument)))
        return false;
    const argument = node.arguments[1];
    if (argument === undefined)
        return false;
    const value = unwrapJavaScriptExpression(argument).node;
    if (t.isBigIntLiteral(value))
        return true;
    if (t.isUnaryExpression(value) &&
        ["+", "-", "~"].includes(value.operator) &&
        t.isBigIntLiteral(unwrapJavaScriptExpression(value.argument).node))
        return true;
    return (t.isCallExpression(value) &&
        t.isIdentifier(value.callee) &&
        delayConstructors.get(value.callee.name)?.(value.callee).status ===
            "unmodified" &&
        !opaqueCodeMayChangeGlobalRead(value.callee, state, value.callee.name));
};
const collectTimer = (input) => {
    const { node, ownerCallableId, state, output, ancestors } = input;
    const identity = timerMethod(node.callee, state);
    if (identity === null)
        return;
    const { method, builtinAuthority } = identity;
    if (TIMER_SCHEDULE_METHODS.some((candidate) => candidate === method) &&
        nodeBuiltinTimerMethod(node.callee, state) !== null &&
        (schedulesWithNonFunctionCallback(node, state) ||
            ((method === "setTimeout" || method === "setInterval") &&
                schedulesWithInvalidDelay(node, state, input.delayConstructors))))
        return;
    const kind = TIMER_SCHEDULE_METHODS.some((candidate) => candidate === method)
        ? "schedule"
        : "cancel";
    const projectedResultBindings = assignedSemanticResultBindings(node, ancestors, state);
    const handle = kind === "cancel" && t.isIdentifier(node.arguments[0])
        ? resolveSemanticBindingState(state, node.arguments[0], node.arguments[0].name)
        : undefined;
    const handleRead = handle === undefined || !t.isIdentifier(node.arguments[0])
        ? null
        : (() => {
            const snapshot = semanticBindingAtRead(handle, node.arguments[0], state);
            // A const handle has the same value inside a later closure even
            // when the source positions belong to different function bodies.
            const stableClosureCapture = !handle.mutable &&
                handle.initializers.length === 1 &&
                handle.referenceInitializers.length === 0;
            const origins = [
                ...snapshot.binding.initializers,
                ...snapshot.binding.referenceInitializers,
            ];
            return {
                origins: origins.map(({ node: origin }) => origin),
                complete: snapshot.status === "ordered" || stableClosureCapture,
            };
        })();
    output.push({
        node,
        method,
        ...(builtinAuthority === undefined ? {} : { builtinAuthority }),
        kind,
        ownerCallableId,
        handleBindingId: kind === "schedule"
            ? scalarAssignedResultBinding(projectedResultBindings)
            : dataEffectArgumentBindingId(node.arguments[0], state),
        projectedResultBindings: kind === "schedule"
            ? semanticProjectedBindingFacts(projectedResultBindings.filter(({ projectionPath }) => projectionPath.length > 0))
            : [],
        handleRead,
    });
};
const resolveTimers = (candidates) => {
    const schedules = new Map(candidates
        .filter(({ kind }) => kind === "schedule")
        .map((candidate) => [candidate.node, candidate]));
    return candidates.map((candidate) => {
        // Unordered reads retain possible initializers as candidate edges. Only an
        // ordered or immutable read can establish one complete cancellation link.
        const linked = candidate.handleRead?.origins.flatMap((origin) => {
            const schedule = schedules.get(origin);
            // A handle always clears its own family. Clearing across families is
            // runtime-dependent, so it establishes no link in either direction.
            if (schedule === undefined ||
                timerHandleFamily(schedule.method) !==
                    timerHandleFamily(candidate.method))
                return [];
            return [schedule];
        }) ?? [];
        const incompleteOrigins = candidate.handleRead !== null &&
            candidate.handleRead.origins.length !== linked.length;
        return {
            ...(candidate.builtinAuthority === "candidate" ||
                linked.some((item) => item.builtinAuthority === "candidate")
                ? { builtinAuthority: "candidate" }
                : {}),
            timerId: timerId(candidate),
            kind: candidate.kind,
            method: candidate.method,
            location: range(candidate.node),
            ownerCallableId: candidate.ownerCallableId,
            handleBindingId: candidate.handleBindingId,
            projectedResultBindings: candidate.projectedResultBindings,
            linkedTimerId: linked.length === 1 && linked[0] !== undefined
                ? timerId(linked[0])
                : null,
            delayMilliseconds: timerDelay(candidate),
            resolution: candidate.kind === "schedule"
                ? "complete"
                : linked.length === 1 &&
                    candidate.handleRead?.complete &&
                    !incompleteOrigins &&
                    !linked[0]?.projectedResultBindings.some(({ bindingId }) => bindingId === candidate.handleBindingId)
                    ? "complete"
                    : linked.length > 0
                        ? "partial"
                        : "unresolved",
        };
    });
};
const timerMethod = (callee, state) => {
    if (t.isIdentifier(callee)) {
        const binding = resolveSemanticBindingState(state, callee, callee.name);
        if (binding === undefined) {
            const method = admittedTimerMethod(callee.name);
            if (method === null)
                return null;
            return semanticResolutionBlocked(state, callee, callee.name) ||
                !isUnmodifiedGlobalReference(callee, state, callee.name)
                ? null
                : { method };
        }
    }
    const identity = builtinDataEffectIdentity(callee, state, [
        "timers",
        "node:timers",
    ]);
    const method = admittedTimerMethod(identity?.path.length === 1 ? (identity.path[0] ?? "") : "");
    return method === null
        ? null
        : {
            method,
            ...(identity?.builtinAuthority === undefined
                ? {}
                : { builtinAuthority: identity.builtinAuthority }),
        };
};
const admittedTimerMethod = (value) => [...TIMER_SCHEDULE_METHODS, ...TIMER_CANCEL_METHODS].find((candidate) => candidate === value) ?? null;
const timerDelay = (candidate) => {
    if (candidate.kind !== "schedule" || candidate.method === "setImmediate")
        return null;
    const delay = candidate.node.arguments[1];
    // An overflowing literal such as 1e999 parses to Infinity, which JSON
    // Evidence cannot carry; keep that delay unknown like any other.
    return t.isNumericLiteral(delay) && Number.isFinite(delay.value)
        ? delay.value
        : null;
};
const timerId = (candidate) => `timer:${candidate.kind}:${String(candidate.node.start ?? -1)}:${String(candidate.node.end ?? -1)}`;
