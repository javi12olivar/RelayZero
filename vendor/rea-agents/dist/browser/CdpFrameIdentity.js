import { recordValue, cdpStringValue, } from "./CdpCaptureValues.js";
const nonEmptyString = (value) => typeof value === "string" && value.length > 0 ? value : undefined;
const identityIssueFor = (navigated, frame, rawId) => {
    if (navigated && frame === undefined)
        return "missing_frame";
    if (rawId === undefined)
        return "missing_id";
    return nonEmptyString(rawId) === undefined ? "invalid_id" : null;
};
const noParent = {
    parentRelation: "not_applicable",
    parentId: null,
    parentIssue: null,
};
const requiredChildParentFacts = (frameId, rawParent) => {
    const parentId = nonEmptyString(rawParent);
    return parentId === undefined || parentId === frameId
        ? {
            parentRelation: "unknown",
            parentId: null,
            parentIssue: parentId === undefined ? "invalid_parent_id" : "self_parent",
        }
        : { parentRelation: "child", parentId, parentIssue: null };
};
const frameParentFacts = (frame) => {
    if (frame === undefined)
        return { parentRelation: "unknown", parentId: null, parentIssue: null };
    if (!("parentId" in frame))
        return { parentRelation: "root", parentId: null, parentIssue: null };
    return requiredChildParentFacts(nonEmptyString(frame.id) ?? null, frame.parentId);
};
/** Select navigation authority from already parsed source facts. */
export const selectCdpFrameIdentity = (facts, mainFrameId) => {
    if (facts.kind !== "navigated" &&
        facts.kind !== "requested" &&
        facts.kind !== "within_document")
        return {
            applicability: "not_applicable",
            selection: "unknown",
            isRootReplacement: false,
            frameId: null,
            identityIssue: null,
            parentRelation: "not_applicable",
            parentId: null,
            parentIssue: null,
        };
    const { frameId, identityIssue, parentRelation, parentId, parentIssue } = facts;
    const identity = {
        frameId,
        identityIssue,
        parentRelation,
        parentId,
        parentIssue,
    };
    const selection = identity.frameId === null
        ? "unknown"
        : identity.frameId === mainFrameId
            ? "main"
            : "other";
    return {
        applicability: "applicable",
        selection,
        isRootReplacement: selection === "other" && identity.parentRelation === "root",
        ...identity,
        parentIssue: selection === "main" &&
            (identity.parentRelation === "child" ||
                identity.parentIssue === "self_parent")
            ? "main_frame_has_parent"
            : identity.parentIssue,
    };
};
const loaderFacts = (source) => ({
    loaderId: cdpStringValue(source?.loaderId),
    loaderIssue: source?.loaderId !== undefined && typeof source.loaderId !== "string"
        ? "invalid_loader_id"
        : null,
});
/** Parse a frame-tree or committed-document record using its declared keys. */
export const cdpFrameRecordFacts = (source) => {
    const frameId = nonEmptyString(source?.id) ?? null;
    return {
        kind: "record",
        frameId,
        identityIssue: identityIssueFor(true, source, source?.id),
        ...frameParentFacts(source),
        ...loaderFacts(source),
    };
};
/**
 * Parse one frame lifecycle event payload by its declared protocol shape. The
 * CDP event registry (`protocol/CdpEvents.ts`) is the only caller, so every
 * subscriber reads these facts rather than the raw payload.
 */
export const cdpFrameEventPayloadFacts = (kind, rawParams) => {
    const empty = {
        kind,
        frameId: null,
        identityIssue: null,
        parentRelation: "not_applicable",
        parentId: null,
        parentIssue: null,
        loaderId: undefined,
        loaderIssue: null,
    };
    const params = recordValue(rawParams);
    if (params === undefined)
        return {
            ...empty,
            identityIssue: rawParams === undefined ? "missing_params" : "invalid_params",
        };
    if (kind === "navigated")
        return { ...cdpFrameRecordFacts(recordValue(params.frame)), kind };
    const frameId = nonEmptyString(params.frameId) ?? null;
    return {
        kind,
        frameId,
        identityIssue: identityIssueFor(false, undefined, params.frameId),
        ...(kind === "attached"
            ? requiredChildParentFacts(frameId, params.parentFrameId)
            : noParent),
        loaderId: undefined,
        loaderIssue: null,
    };
};
