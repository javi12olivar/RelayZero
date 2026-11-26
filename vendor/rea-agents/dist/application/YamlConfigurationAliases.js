import { Alias, isAlias, isMap, isNode, isSeq, isScalar, visit, } from "yaml";
import { ConfigurationError } from "../domain/configurationErrors.js";
/** Resolve literal and aliased string keys to their source nodes for editing. */
export const resolveYamlEditPath = (document, path) => {
    const resolved = [];
    let current = document.contents;
    for (const name of path) {
        if (isAlias(current))
            current = current.resolve(document);
        if (!isMap(current)) {
            resolved.push(name);
            current = undefined;
            continue;
        }
        const matches = current.items.filter((pair) => {
            const key = isAlias(pair.key) ? pair.key.resolve(document) : pair.key;
            return isScalar(key) && key.value === name;
        });
        if (matches.length > 1)
            throw new ConfigurationError(`YAML mapping contains more than one key resolving to ${JSON.stringify(name)}.`);
        const pair = matches[0];
        resolved.push(pair !== undefined && isNode(pair.key) ? pair.key : name);
        current = pair?.value;
    }
    return resolved;
};
const copyAliasComments = (source, copy) => {
    for (const key of ["commentBefore", "comment"]) {
        const comment = source[key];
        if (comment === undefined)
            continue;
        copy[key] = copy[key] === undefined ? comment : `${copy[key]}\n${comment}`;
    }
    return copy;
};
const aliasTarget = (source, context) => {
    const target = context.targets.get(source);
    if (target === undefined)
        throw new TypeError("Cannot preserve an unresolved YAML alias");
    return target;
};
/** Check copied dependencies even when their definitions will stay in place. */
const validateAliasValue = (source, context) => {
    if (context.validated.has(source))
        return;
    if (context.visiting.has(source))
        throw new TypeError("Cannot preserve cyclic YAML aliases");
    context.visiting.add(source);
    visit(source, {
        Alias: (_key, node) => validateAliasValue(aliasTarget(node, context), context),
    });
    context.visiting.delete(source);
    context.validated.add(source);
};
const newAnchorName = (anchor, context) => {
    let index = 1;
    let name = `${anchor}_rea_preserved`;
    while (context.names.has(name))
        name = `${anchor}_rea_preserved_${index++}`;
    context.names.add(name);
    return name;
};
/** Reuse the surviving owner; a later same-name definition must not capture it. */
const survivingAlias = (target, context) => {
    if (isAlias(target) || target.anchor === undefined)
        throw new TypeError("Invalid YAML alias target");
    if (!context.reusedNames.has(target.anchor))
        return new Alias(target.anchor);
    let name = context.survivingNames.get(target);
    if (name === undefined) {
        name = newAnchorName(target.anchor, context);
        context.survivingNames.set(target, name);
    }
    return new Alias(name);
};
/** Keep source bindings, including nested aliases whose names were later reused. */
const copyAliasValue = (source, context, cloned) => {
    if (isAlias(source)) {
        const target = aliasTarget(source, context);
        return copyAliasComments(source, context.removed.has(target)
            ? copyAliasValue(target, context)
            : survivingAlias(target, context));
    }
    if (context.visiting.has(source))
        throw new TypeError("Cannot preserve cyclic YAML aliases");
    const retained = context.retained.get(source);
    if (retained !== undefined &&
        !isAlias(retained) &&
        retained.anchor !== undefined)
        return new Alias(retained.anchor);
    const copy = cloned ?? source.clone();
    if (!isNode(copy) || isAlias(copy))
        throw new TypeError("Invalid YAML value copy");
    context.copied.add(source);
    if (source.anchor !== undefined) {
        copy.anchor = newAnchorName(source.anchor, context);
        context.retained.set(source, copy);
    }
    context.visiting.add(source);
    const child = (value, copied) => isNode(value)
        ? copyAliasValue(value, context, isNode(copied) ? copied : undefined)
        : copied;
    if (isMap(source) && isMap(copy)) {
        for (const [index, pair] of source.items.entries()) {
            const copied = copy.items[index];
            if (copied === undefined)
                continue;
            copied.key = child(pair.key, copied.key);
            copied.value = child(pair.value, copied.value);
        }
    }
    else if (isSeq(source) && isSeq(copy)) {
        copy.items = source.items.map((value, index) => child(value, copy.items[index]));
    }
    context.visiting.delete(source);
    return copy;
};
/** Preserve other consumers before removing anchored configuration nodes. */
export const preserveYamlAliasValues = (document, previous) => {
    const roots = previous.filter(isNode);
    const removed = new Set();
    for (const root of roots)
        visit(root, {
            Value: (_key, node) => {
                if (node.anchor !== undefined)
                    removed.add(node);
            },
        });
    if (removed.size === 0)
        return new Set();
    const targets = new Map();
    const names = new Set();
    const reusedNames = new Set();
    visit(document, {
        Alias: (_key, node) => {
            targets.set(node, node.resolve(document));
        },
        Value: (_key, node) => {
            if (node.anchor === undefined)
                return;
            if (names.has(node.anchor))
                reusedNames.add(node.anchor);
            names.add(node.anchor);
        },
    });
    const context = {
        targets,
        removed,
        retained: new Map(),
        copied: new Set(),
        survivingNames: new Map(),
        visiting: new Set(),
        validated: new Set(),
        names,
        reusedNames,
    };
    const replacements = new Map();
    visit(document, {
        Alias: (_key, node, path) => {
            if (!roots.some((root) => path.includes(root))) {
                const target = targets.get(node);
                if (target === undefined || !removed.has(target))
                    return;
                validateAliasValue(target, context);
                replacements.set(node, copyAliasComments(node, copyAliasValue(target, context)));
            }
        },
    });
    // Plan every binding against the original document before moving any anchor.
    for (const [target, name] of context.survivingNames)
        if (!isAlias(target))
            target.anchor = name;
    visit(document, {
        Alias: (_key, node) => {
            const replacement = replacements.get(node);
            if (replacement !== undefined)
                return replacement;
            const target = targets.get(node);
            const name = target === undefined ? undefined : context.survivingNames.get(target);
            return name === undefined
                ? undefined
                : copyAliasComments(node, new Alias(name));
        },
    });
    return context.copied;
};
/** Copy original bindings so moved aliases cannot bind to later anchors. */
export const copyYamlAliasSource = (source, document, visiting = new Set()) => {
    const node = isAlias(source) ? source.resolve(document) : source;
    if (isAlias(source) && node === undefined)
        throw new TypeError("Cannot edit an unresolved YAML alias");
    if (!isNode(node))
        return node;
    if (visiting.has(node))
        throw new TypeError("Cannot edit cyclic YAML aliases");
    visiting.add(node);
    const copied = node.clone();
    if (isScalar(copied) || isMap(copied) || isSeq(copied))
        delete copied.anchor;
    if (isSeq(node) && isSeq(copied))
        copied.items = node.items.map((item) => copyYamlAliasSource(item, document, visiting));
    else if (isMap(node) && isMap(copied))
        copied.items.forEach((pair, index) => {
            const original = node.items[index];
            if (original === undefined)
                return;
            pair.key = copyYamlAliasSource(original.key, document, visiting);
            pair.value = copyYamlAliasSource(original.value, document, visiting);
        });
    if (isAlias(source)) {
        delete copied.commentBefore;
        delete copied.comment;
        if (source.commentBefore !== undefined)
            copied.commentBefore = source.commentBefore;
        if (source.comment !== undefined)
            copied.comment = source.comment;
    }
    visiting.delete(node);
    return copied;
};
