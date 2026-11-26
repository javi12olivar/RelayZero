import { completeSemanticSteps } from "./javascriptSemanticTraversal.js";
import * as t from "@babel/types";
import { unwrapJavaScriptExpression } from "./javascriptAstValues.js";
import { isUnmodifiedGlobalReference } from "./javascriptSemanticGlobalReference.js";
import { isIntrinsicInstanceMethodCall } from "./javascriptSemanticIntrinsicInstances.js";
import { stringValue } from "./javascriptStaticAnalysisHelpers.js";
const isFetchCall = (node, bindings) => (t.isCallExpression(node) || t.isOptionalCallExpression(node)) &&
    isUnmodifiedGlobalReference(node.callee, bindings, "fetch");
/** Read a proven Fetch Request input's source literal without constructing it. */
export const literalFetchRequestConstructorUrl = (call, input, bindings) => {
    const target = unwrapJavaScriptExpression(input).node;
    if (t.isNewExpression(target) &&
        isFetchCall(call, bindings) &&
        isUnmodifiedGlobalReference(target.callee, bindings, "Request"))
        return stringValue(target.arguments[0]);
    return undefined;
};
/** Browser request identity requires an intact intrinsic, not a method spelling. */
export const isBrowserNetworkRequest = (node, bindings) => isFetchCall(node, bindings) ||
    (t.isNewExpression(node) &&
        (isUnmodifiedGlobalReference(node.callee, bindings, "WebSocket") ||
            isUnmodifiedGlobalReference(node.callee, bindings, "EventSource"))) ||
    ((t.isCallExpression(node) || t.isOptionalCallExpression(node)) &&
        isUnmodifiedGlobalReference(node.callee, bindings, [
            "navigator",
            "sendBeacon",
        ]));
const isXhrOpenRequest = (node, bindings, index) => (t.isCallExpression(node) || t.isOptionalCallExpression(node)) &&
    isIntrinsicInstanceMethodCall(node, bindings, { constructor: "XMLHttpRequest", methods: ["open"] }, index);
/** Resolve once through the shared mutation index when lexical proof needs it. */
export const createXhrOpenRequestQuery = (index) => (node) => {
    const proof = isXhrOpenRequest(node, index.bindings);
    if (proof !== undefined)
        return proof;
    completeSemanticSteps(index.indexMemberMutationFactsSteps());
    return isXhrOpenRequest(node, index.bindings, index) === true;
};
