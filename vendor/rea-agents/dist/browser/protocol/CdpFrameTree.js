import { z } from "zod";
import { isRecord } from "../../kernel/isRecord.js";
import { observeCdpFrameUrl, } from "../CdpCaptureDocuments.js";
import { cdpStringValue, recordValue, resourceContentSize, } from "../CdpCaptureValues.js";
import { cdpFrameRecordFacts, } from "../CdpFrameIdentity.js";
const treeRecord = z.custom(isRecord, {
    message: "Expected a frame tree object.",
});
const readChildren = (tree) => {
    const raw = tree.childFrames;
    if (raw === undefined)
        return { children: [], omitted: false };
    if (!Array.isArray(raw))
        return { children: [], omitted: true };
    const children = raw.filter(isRecord);
    return { children, omitted: children.length !== raw.length };
};
/** Walk iteratively so a deep producer tree cannot exhaust the call stack. */
const walkTrees = (root, visit) => {
    let omittedFrames = false;
    const frames = [];
    const pending = [{ tree: root, enclosing: undefined }];
    let rootNode;
    while (pending.length > 0) {
        const { tree, enclosing } = pending.pop();
        const frame = recordValue(tree.frame);
        const node = {
            enclosing,
            facts: cdpFrameRecordFacts(frame),
            url: observeCdpFrameUrl(frame),
            securityOrigin: cdpStringValue(frame?.securityOrigin),
            children: [],
        };
        rootNode ??= node;
        enclosing?.children.push(node);
        frames.push(node);
        visit(tree, node);
        const { children, omitted } = readChildren(tree);
        omittedFrames ||= omitted;
        for (let index = children.length - 1; index >= 0; index -= 1)
            pending.push({ tree: children[index], enclosing: node });
    }
    return { root: rootNode, frames, omittedFrames };
};
/** `Page.getFrameTree`: only a missing or non-object tree rejects the reply. */
export const cdpFrameTreeReplySchema = z
    .object({ frameTree: treeRecord })
    .transform(({ frameTree }) => walkTrees(frameTree, () => undefined));
/** `Page.getResourceTree`: resource facts from every readable frame. */
export const cdpResourceTreeReplySchema = z
    .object({ frameTree: treeRecord })
    .transform(({ frameTree }) => {
    const resources = [];
    let omittedResources = false;
    let malformedResources = 0;
    const tree = walkTrees(frameTree, (raw) => {
        if (!Array.isArray(raw.resources)) {
            omittedResources = true;
            return;
        }
        for (const entry of raw.resources) {
            const resource = recordValue(entry);
            if (resource === undefined) {
                malformedResources += 1;
                continue;
            }
            resources.push({
                url: cdpStringValue(resource.url),
                type: cdpStringValue(resource.type),
                mimeType: cdpStringValue(resource.mimeType),
                contentSize: resourceContentSize(resource.contentSize),
            });
        }
    });
    return {
        resources,
        omittedResources: omittedResources || tree.omittedFrames,
        malformedResources,
    };
});
/**
 * The URL member the producer reported, before fragment handling; undefined
 * only when it is missing. Scope checks of the raw report read this.
 */
export const reportedFrameUrl = (observation) => observation.kind === "missing" ? undefined : observation.scopeUrl;
/** The readable URL of an observed frame; malformed or missing identity is undefined. */
export const observedFrameUrl = (observation) => observation.kind === "observed" ? observation.url : undefined;
