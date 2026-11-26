/**
 * Arguments of a directly invoked source function expression. The callee's
 * body is source code whose effects are indexed like any other, so an
 * argument it can reach only through a plain parameter does not escape at
 * the call: effect owners follow the parameter to the argument instead.
 */
import * as t from "@babel/types";
import { runtimeFunctionParameters, semanticStaticPropertyKey, unwrapJavaScriptExpression, } from "./javascriptAstValues.js";
import { semanticDirectEvalRecorded } from "./javascriptSemanticEffectRecord.js";
import { traverseJavaScriptAst } from "./javascriptSemanticTraversal.js";
import { javaScriptStrictnessAt } from "./javascriptSourceParser.js";
const directInvocations = new WeakMap();
const argumentsReaders = new WeakMap();
/**
 * Whether `callee`'s activation arguments may be read other than by its
 * parameters: its subtree names `arguments`, or it is not strict and the
 * program reads a function's `arguments`/`caller` property (`f["arguments"]`,
 * `g.caller.arguments` from a function it calls). One program walk marks
 * every function around each `arguments` identifier (nested arrows
 * included) and notes those property reads.
 */
const argumentsMayBeRead = (callee, state) => {
    let readers = argumentsReaders.get(state);
    if (readers === undefined) {
        const functions = new WeakSet();
        let functionProperties = false;
        traverseJavaScriptAst(state.program, {
            enter: (node) => {
                if ((t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) &&
                    FUNCTION_ARGUMENT_PROPERTIES.has(semanticStaticPropertyKey(node.property, node.computed) ?? ""))
                    functionProperties = true;
                if (!t.isIdentifier(node, { name: "arguments" }))
                    return;
                for (let current = state.parentsByNode.get(node); current !== undefined && !functions.has(current); current = state.parentsByNode.get(current))
                    if (t.isFunction(current))
                        functions.add(current);
            },
        });
        readers = { functions, functionProperties };
        argumentsReaders.set(state, readers);
    }
    return (readers.functions.has(callee) ||
        (readers.functionProperties &&
            javaScriptStrictnessAt(callee, state.parentsByNode) !== "strict"));
};
/** Sloppy-function properties that expose an active call's arguments. */
const FUNCTION_ARGUMENT_PROPERTIES = new Set([
    "arguments",
    "caller",
]);
/** The call that invokes function expression `callee` where it is defined. */
const directCall = (callee, parents) => {
    if (!t.isFunctionExpression(callee) && !t.isArrowFunctionExpression(callee))
        return undefined;
    let call = parents.get(callee);
    while (call !== undefined && unwrapJavaScriptExpression(call).node === callee)
        call = parents.get(call);
    return t.isCallExpression(call) &&
        unwrapJavaScriptExpression(call.callee).node === callee
        ? call
        : undefined;
};
const computeDirectInvocation = (callee, state) => {
    const call = directCall(callee, state.parentsByNode);
    if (call === undefined)
        return undefined;
    if (call.arguments.length === 0)
        return { call, bound: [] };
    // Only plain parameter lists bind every argument by position alone and
    // share one scope with the body.
    const parameters = runtimeFunctionParameters(callee);
    const rest = parameters.findIndex((parameter) => t.isRestElement(parameter));
    if (parameters.some((parameter, index) => !t.isIdentifier(parameter) && index !== rest) ||
        semanticDirectEvalRecorded(state) ||
        argumentsMayBeRead(callee, state))
        return undefined;
    const spread = call.arguments.findIndex((argument) => t.isSpreadElement(argument));
    // A later duplicate parameter name shadows earlier ones.
    const lastPosition = new Map();
    parameters.forEach((parameter, index) => {
        if (t.isIdentifier(parameter))
            lastPosition.set(parameter.name, index);
    });
    const bound = call.arguments.map((_, index) => {
        if ((spread >= 0 && index >= spread) || (rest >= 0 && index >= rest))
            return undefined;
        const parameter = parameters[index];
        if (!t.isIdentifier(parameter))
            return null;
        return lastPosition.get(parameter.name) === index ? parameter : null;
    });
    return { call, bound };
};
const directInvocation = (callee, state) => {
    if (!t.isFunction(callee))
        return undefined;
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
/**
 * Whether argument `index` of `call` reaches the callee only through a
 * parameter whose effects are followed to the argument, so passing it is not
 * an escape to code whose effects are not evaluated.
 */
export const semanticArgumentStaysInSource = (call, index, state) => {
    if (!t.isCallExpression(call))
        return false;
    const invocation = directInvocation(unwrapJavaScriptExpression(call.callee).node, state);
    return invocation?.call === call && invocation.bound[index] !== undefined;
};
const parameterArguments = new WeakMap();
/**
 * The argument a directly invoked function's parameter `binding` receives;
 * `reference` is any reference to the binding inside that function. A body
 * declaration of the parameter's name shares its binding, so the argument
 * stays among that binding's values.
 */
export const semanticDirectInvocationArgument = (reference, binding, state) => {
    const cached = parameterArguments.get(binding);
    if (cached !== undefined)
        return cached ?? undefined;
    let argument;
    if (state.scopesById.get(binding.scopeId)?.kind === "function")
        for (let current = state.parentsByNode.get(reference); current !== undefined; current = state.parentsByNode.get(current)) {
            if (!t.isFunction(current) ||
                state.scopeByNode.get(current)?.scopeId !== binding.scopeId)
                continue;
            const invocation = directInvocation(current, state);
            const index = invocation?.bound.findIndex((parameter) => parameter?.name === binding.name) ?? -1;
            const selected = invocation?.call.arguments[index];
            if (index >= 0 && t.isExpression(selected))
                argument = selected;
            break;
        }
    parameterArguments.set(binding, argument ?? null);
    return argument;
};
