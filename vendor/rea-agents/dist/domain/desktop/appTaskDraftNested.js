import { escapeJsonPointerToken } from "../jsonPointer.js";
import { isBookkeepingName, isStamp, isVolatileValue, } from "./appTaskDraftNoise.js";
import { valueEqualsCheck } from "./appTaskDraftScalars.js";
import { isGeneratedId, isIdentifyingAttribute, isPlaceholder, isViewStateName, rankAttributes, } from "./attributeRank.js";
import { isXmlElement, resolvePointer } from "./viewPointer.js";
import { spellCondition } from "./viewSelector.js";
import { checkFits } from "./appTaskDraftAdded.js";
/** Checks of the records nested in one element added whole, and of one record's attributes. */
const MAX_NESTED_CHECKS = 6;
const MAX_PER_RECORD = 3;
/** Whether an element is a record of attributes alone, as KMyMoney's `<SPLIT value="-1749/20" account="A000001" …/>`: no element or text of its own. */
const attributesOnly = (item) => isXmlElement(item) &&
    Object.keys(item.attributes).length > 0 &&
    item.children.every((child) => typeof child === "string" && child.trim() === "");
/** The records of attributes alone among an element's children, when they are all one tag; empty otherwise. */
const recordsIn = (element) => {
    const items = isXmlElement(element)
        ? element.children.filter(isXmlElement)
        : [];
    const records = items.filter(attributesOnly);
    return records.length === items.length &&
        records.every((record) => record.name === records[0]?.name)
        ? records
        : [];
};
/**
 * The lists of records of attributes alone an element holds: its own
 * children, or those of a child holding nothing else that its tag names
 * alone, as a KMyMoney `<TRANSACTION>` its `<SPLITS>` of `<SPLIT>`.
 */
export const recordListsOf = (element) => {
    const own = recordsIn(element);
    if (own.length > 0)
        return [{ steps: [], records: own }];
    const children = isXmlElement(element)
        ? element.children.filter(isXmlElement)
        : [];
    const tags = new Map();
    for (const { name } of children)
        tags.set(name, (tags.get(name) ?? 0) + 1);
    return children.flatMap((child) => {
        const records = recordsIn(child);
        return records.length > 0 &&
            tags.get(child.name) === 1 &&
            !/[=[\]]/u.test(child.name)
            ? [
                {
                    steps: ["children", escapeJsonPointerToken(`[name=${child.name}]`)],
                    records,
                },
            ]
            : [];
    });
};
/** The records at a list's steps in each like sibling of an element, as the splits of the transactions already in the book. */
const cousinsOf = (likes, steps, tag) => likes.flatMap((like) => recordsIn(steps.length === 0
    ? like
    : resolvePointer(like, `/${steps.join("/")}`, "xml")).filter((record) => record.name === tag));
/** Whether a value a selector can carry and that names something across saves. */
const selectable = (key, value) => typeof value === "string" &&
    value !== "" &&
    !/[=[\]]/u.test(key) &&
    !value.includes("][") &&
    !isStamp(value) &&
    !isPlaceholder(value) &&
    !isVolatileValue(value, isBookkeepingName(key));
/**
 * The selector naming a nested record alone among its list's: an
 * identifier first, unless it is one the app generates or numbers anew in
 * each record holding such a list, as KMyMoney's `S0001` in every
 * transaction; then the best ranked attribute short of a coordinate or an
 * amount, as a split's `[@account=A000001]`.
 */
const recordKey = (record, records, cousins, chars) => {
    const values = Object.entries(record.attributes).flatMap(([key, value]) => selectable(key, value) && typeof value === "string" && value.length <= chars
        ? [{ key, value }]
        : []);
    const repeated = (key, value) => cousins.some((cousin) => cousin.attributes[key] === value);
    const [best] = [
        ...values.filter(({ key, value }) => isIdentifyingAttribute(key) &&
            !isGeneratedId(value) &&
            !repeated(key, value)),
        ...rankAttributes(values.filter(({ key }) => !isIdentifyingAttribute(key))).filter(({ tier }) => tier < 3),
    ].filter(({ key, value }) => records.filter((other) => other.attributes[key] === value).length === 1);
    return best === undefined
        ? undefined
        : {
            key: best.key,
            segment: escapeJsonPointerToken(`[name=${record.name}]${spellCondition({ prefix: "@", ...best })}`),
        };
};
/**
 * The keys of a record checked one by one: those whose values vary among
 * the like records, its list's and those under the element's like siblings,
 * as a split's `value` and `payee`, but not its `memo` or `price` that every
 * split holds alike, nor one each like record holds equal to an earlier one,
 * as `shares` repeats `value`; never its selector's, an identifier, a time,
 * a volatile value, view state or an id the app renumbers.
 */
const checkedKeys = (record, likes, skip) => {
    const keys = [];
    for (const [key, value] of Object.entries(record.attributes)) {
        const all = likes.map((like) => like.attributes[key]);
        if (key === skip ||
            typeof value !== "string" ||
            isIdentifyingAttribute(key) ||
            isPlaceholder(value) ||
            isStamp(value) ||
            isVolatileValue(value, isBookkeepingName(key)) ||
            isViewStateName(key) ||
            new Set(all).size < 2 ||
            keys.some((earlier) => likes.every((like) => like.attributes[earlier] === like.attributes[key])))
            continue;
        keys.push(key);
    }
    return keys;
};
/**
 * A `value_equals` per attribute of each record of attributes alone nested
 * in an element added whole to a list, as each split of a KMyMoney
 * transaction holds its amount, account and payee, which the element's own
 * attributes and text leave out: the record named by `recordKey`, its
 * attributes by `checkedKeys`, at most six in all. Each fails at the seed,
 * which lacks the element. Empty for an element with no like sibling, as no
 * record then tells what varies.
 */
export const nestedRecordChecks = (context, pointer, element) => {
    if (!isXmlElement(element))
        return [];
    const list = resolvePointer(context.final, pointer.replace(/\/[^/]+$/u, ""), "xml");
    const likes = (Array.isArray(list) ? list : []).filter((item) => item !== element && isXmlElement(item) && item.name === element.name);
    if (likes.length === 0)
        return [];
    return (recordListsOf(element)
        .flatMap(({ steps, records }) => {
        const cousins = cousinsOf(likes, steps, records[0]?.name ?? "");
        return records.flatMap((record) => {
            const key = recordKey(record, records, cousins, context.chars);
            if (key === undefined)
                return [];
            const at = [pointer, ...steps, "children", key.segment].join("/");
            return (checkedKeys(record, [...records, ...cousins], key.key)
                .filter((name) => {
                const value = record.attributes[name];
                return (typeof value === "string" &&
                    checkFits(context, `${at}/attributes/${escapeJsonPointerToken(name)}`, value));
            })
                // generation-cap: suggested checks per nested record
                .slice(0, MAX_PER_RECORD)
                .flatMap((name) => {
                const field = `${at}/attributes/${escapeJsonPointerToken(name)}`;
                const value = record.attributes[name];
                return context.named(field) && typeof value === "string"
                    ? [valueEqualsCheck(context.file, field, value)]
                    : [];
            }));
        });
    })
        // generation-cap: suggested nested checks
        .slice(0, MAX_NESTED_CHECKS));
};
