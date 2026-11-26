import { changeNoise } from "./appTaskDraftNoise.js";
import { draftValues, oneEnd } from "./appTaskDraftValues.js";
import { diffNamedMembers } from "./stateChanges.js";
import { entryWithoutView, zipArrayLeavesOut, zipEntryAt, zipLeavesOutAt, zipView, } from "./zipView.js";
import { isRecord } from "../../kernel/isRecord.js";
/**
 * The entry a pointer into a zip view goes into, when it has a view and both
 * evaluators read it alike: JSON, a key file or XML. A binary or unread
 * entry also holds a `null` view, which is no JSON `null`.
 */
const readableEntry = (view, pointer) => {
    const entry = zipEntryAt(view, pointer);
    return typeof entry === "object" &&
        entryWithoutView(entry) === undefined &&
        (entry.format === "json" ||
            entry.format === "keyfile" ||
            entry.format === "xml")
        ? entry
        : undefined;
};
/**
 * Where checks for a pointer the diff lists start: the view of an entry it
 * names whole, or its root element for XML; the pointer itself inside that;
 * undefined for an entry neither evaluator reads alike, or the entry's fields.
 */
const checkRoot = (view, pointer) => {
    const entry = readableEntry(view, pointer);
    const [entryPointer] = /^\/entries\/[^/]+/u.exec(pointer) ?? [];
    if (entry === undefined || entryPointer === undefined)
        return undefined;
    const inner = pointer.slice(entryPointer.length).split("/").slice(1);
    const root = entry.format === "xml" ? ["view", "root"] : ["view"];
    const prefix = (short, long) => short.length <= long.length &&
        short.every((part, index) => long[index] === part);
    if (prefix(inner, root))
        return `${entryPointer}/${root.join("/")}`;
    return prefix(root, inner) ? pointer : undefined;
};
export const ARCHIVE = {
    root: checkRoot,
    xml: (view, pointer) => readableEntry(view, pointer)?.format === "xml",
    leavesOut: zipLeavesOutAt,
    arrayLeavesOut: zipArrayLeavesOut,
    // An entry added or removed whole, or a value inside a readable one; not an entry's size or digest.
    listed: (view, pointer) => /^\/entries\/[^/]+$/u.test(pointer) ||
        checkRoot(view, pointer) !== undefined,
    // An archive with no entries, so each entry of one created or deleted is listed by its name.
    empty: zipView([], 0),
};
/** An XML file's view leaves out what its `truncated` says, anywhere in the tree. */
const truncatedXml = (view) => isRecord(view) && view.truncated === true;
const inXmlRoot = (pointer) => pointer === "/root" || pointer.startsWith("/root/");
export const XML_FILE = {
    root: (_view, pointer) => (inXmlRoot(pointer) ? pointer : undefined),
    xml: () => true,
    leavesOut: truncatedXml,
    arrayLeavesOut: truncatedXml,
    listed: (_view, pointer) => inXmlRoot(pointer),
    empty: null,
};
export const valueFormat = (tree, view, pointer) => tree === ARCHIVE && /^\/entries\/[^/]+$/u.test(pointer)
    ? "archive"
    : tree.xml(view, pointer)
        ? "xml"
        : "json";
export const referenceRoots = (tree, view) => {
    if (tree !== ARCHIVE)
        return view === null ? [] : [view];
    if (!isRecord(view) || !Array.isArray(view.entries))
        return [];
    return view.entries.flatMap((entry) => isRecord(entry) &&
        entry.format === "xml" &&
        entry.view !== undefined &&
        entry.view !== null
        ? [entry.view]
        : []);
};
/**
 * The values of an archive or XML file created or deleted: what its one end
 * holds against `tree.empty`, each entry, or the root element, whole once, as
 * one added to a file that changed is listed, within the same limits.
 */
export const presenceValues = (ends, tree, created) => {
    const from = created
        ? { baseline: tree.empty, final: ends.final }
        : { baseline: ends.baseline, final: tree.empty };
    const change = oneEnd(diffNamedMembers(from.baseline, from.final, tree === ARCHIVE ? "zip" : "xml"), created);
    return draftValues(change, {
        ends: from,
        listed: tree.listed,
        noise: changeNoise(change, from, (view, pointer) => valueFormat(tree, view, pointer)),
        format: (view, pointer) => valueFormat(tree, view, pointer),
        referenceRoots: (view) => referenceRoots(tree, view),
    });
};
