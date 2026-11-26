import { isDeepStrictEqual } from "node:util";
import { isRecord } from "../kernel/isRecord.js";
import { ADVERTISED_BOUND_LIMIT, ADVERTISED_DESCRIPTION_MAX_CHARACTERS, } from "./advertisedDialect.js";
import { projectPortablePattern } from "./portablePattern.js";
const isStringList = (value) => Array.isArray(value) && value.every((item) => typeof item === "string");
const literalType = (value) => {
    if (typeof value === "string")
        return "string";
    if (typeof value === "boolean")
        return "boolean";
    if (typeof value === "number")
        return Number.isInteger(value) ? "integer" : "number";
    return undefined;
};
/** One type covering every literal, or undefined when none does. */
const literalsType = (values) => {
    const types = new Set(values.map(literalType));
    if (types.has(undefined))
        return undefined;
    if (types.size === 1)
        return [...types][0];
    return types.size === 2 && types.has("integer") && types.has("number")
        ? "number"
        : undefined;
};
/** Sentences for `dependentRequired` and string-list `dependencies`. */
export const dependencyGuidance = (schema) => {
    const dependencies = isRecord(schema.dependentRequired)
        ? schema.dependentRequired
        : isRecord(schema.dependencies)
            ? schema.dependencies
            : {};
    return Object.entries(dependencies).flatMap(([property, partners]) => isStringList(partners) && partners.length > 0
        ? [
            `When ${property} is provided, also provide ${partners.join(" and ")}.`,
        ]
        : []);
};
const truncatedDescription = (text) => {
    if (text.length <= ADVERTISED_DESCRIPTION_MAX_CHARACTERS)
        return text;
    let kept = text.slice(0, ADVERTISED_DESCRIPTION_MAX_CHARACTERS - 1);
    const last = kept.charCodeAt(kept.length - 1);
    if (last >= 0xd800 && last <= 0xdbff)
        kept = kept.slice(0, -1);
    return `${kept}…`;
};
/**
 * Hoist `allOf` members into their parent. A keyword the parent already sets
 * differently is dropped, which only widens the advertisement; required names
 * are a conjunction, so their union is exact.
 */
const mergeAllOf = (schema) => {
    if (!Array.isArray(schema.allOf))
        return schema;
    const { allOf, ...merged } = schema;
    const tails = new Map();
    for (const key of TUPLE_TAIL_KEYS)
        if (isTupleTail(merged, key))
            tails.set(key, merged);
    for (const member of allOf) {
        if (!isRecord(member))
            continue;
        const flattened = mergeAllOf(member);
        for (const [key, value] of Object.entries(flattened)) {
            if (!Object.hasOwn(merged, key)) {
                merged[key] = value;
                if (isTupleTail(flattened, key))
                    tails.set(key, flattened);
            }
            else if (key === "required" && isStringList(merged.required)) {
                if (isStringList(value))
                    merged.required = [...new Set([...merged.required, ...value])];
            }
        }
    }
    // A closed object's properties and patterns are scoped to its own schema
    // object. Hoisting its closure beside another member's properties can
    // reject names accepted by the original conjunction.
    delete merged.additionalProperties;
    // A tuple tail applies past its own object's positions. Beside a different
    // number of positions it would constrain elements the original did not.
    for (const [key, owner] of tails)
        if (tuplePositions(owner)?.length !== tuplePositions(merged)?.length)
            delete merged[key];
    return merged;
};
/** Keywords that constrain only the elements past a tuple's positions. */
const TUPLE_TAIL_KEYS = ["items", "additionalItems"];
/** Positional element schemas (2020-12 `prefixItems` or draft-07 `items`). */
const tuplePositions = (schema) => Array.isArray(schema.prefixItems)
    ? schema.prefixItems
    : Array.isArray(schema.items)
        ? schema.items
        : undefined;
/** Whether `key` constrains only the elements past `schema`'s positions. */
const isTupleTail = (schema, key) => (key === "additionalItems" && Array.isArray(schema.items)) ||
    (key === "items" &&
        Array.isArray(schema.prefixItems) &&
        !Array.isArray(schema.items));
const branchType = (branch) => isRecord(branch) && typeof branch.type === "string" ? branch.type : undefined;
const onlyKeys = (schema, keys) => Object.keys(schema).every((key) => keys.includes(key));
const distinct = (schemas) => {
    const kept = [];
    for (const schema of schemas)
        if (!kept.some((known) => isDeepStrictEqual(known, schema)))
            kept.push(schema);
    return kept;
};
const label = (path) => path === "" ? "The input" : `\`${path}\``;
/** Exclusive numeric bounds become inclusive: exact for integers. */
const inclusiveBounds = (source, out) => {
    const { type } = source;
    const integral = type === "integer" ||
        (isStringList(type) &&
            type.includes("integer") &&
            !type.includes("number"));
    let { minimum, maximum } = source;
    if (typeof source.exclusiveMinimum === "number") {
        const lower = integral
            ? Math.floor(source.exclusiveMinimum) + 1
            : source.exclusiveMinimum;
        minimum = typeof minimum === "number" ? Math.max(minimum, lower) : lower;
    }
    if (typeof source.exclusiveMaximum === "number") {
        const upper = integral
            ? Math.ceil(source.exclusiveMaximum) - 1
            : source.exclusiveMaximum;
        maximum = typeof maximum === "number" ? Math.min(maximum, upper) : upper;
    }
    if (typeof minimum === "number")
        out.minimum = minimum;
    if (typeof maximum === "number")
        out.maximum = maximum;
};
/** Length and item bounds clients can compile, and the portable pattern. */
const scalarBounds = (source, out) => {
    for (const bound of ["minLength", "maxLength", "minItems", "maxItems"])
        if (Number.isSafeInteger(source[bound]) &&
            source[bound] < ADVERTISED_BOUND_LIMIT)
            out[bound] = source[bound];
    if (typeof source.pattern === "string") {
        const projected = projectPortablePattern(source.pattern);
        if (projected.kind !== "unexpressible")
            out.pattern = projected.pattern;
    }
    inclusiveBounds(source, out);
};
/** Only non-empty string enums are portable; other literals keep a type. */
const literalKeywords = (source, out) => {
    const literals = Object.hasOwn(source, "const")
        ? [source.const]
        : Array.isArray(source.enum) && source.enum.length > 0
            ? source.enum
            : undefined;
    if (literals === undefined)
        return;
    const literal = literalsType(literals);
    if (literal === "string" &&
        !literals.includes("") &&
        (out.type === undefined || out.type === "string")) {
        out.type = "string";
        out.enum = [...new Set(literals)];
    }
    else if (literal !== undefined && out.type === undefined)
        out.type = literal;
};
const isStringEnum = (branch) => isRecord(branch) &&
    branch.type === "string" &&
    Array.isArray(branch.enum) &&
    onlyKeys(branch, ["type", "enum", "description"]);
/** `[T, "null"]` becomes the single nullable form: a typed branch or null. */
const nullableForm = (out) => {
    if (!isStringList(out.type) ||
        out.type.length !== 2 ||
        !out.type.includes("null"))
        return out;
    const { type, description, ...constraints } = out;
    const nonNull = type.find((member) => member !== "null");
    return {
        ...(description === undefined ? {} : { description }),
        anyOf: [{ type: nonNull, ...constraints }, { type: "null" }],
    };
};
/** One projection: guidance sentences accumulate while the schema is built. */
class DialectProjection {
    notes = [];
    note(sentence) {
        if (!this.notes.includes(sentence))
            this.notes.push(sentence);
    }
    project(value, path) {
        if (!isRecord(value))
            return value;
        const source = mergeAllOf(value);
        const out = {};
        if (typeof source.type === "string" || isStringList(source.type))
            out.type = source.type;
        if (typeof source.description === "string")
            out.description = truncatedDescription(source.description);
        this.objectKeywords(source, out, path);
        this.arrayKeywords(source, out, path);
        scalarBounds(source, out);
        literalKeywords(source, out);
        if (isRecord(source.not) && isStringList(source.not.enum))
            this.note(`${label(path)} must not be ${source.not.enum.map((item) => JSON.stringify(item)).join(" or ")}.`);
        this.unionKeywords(source, out, path);
        return nullableForm(out);
    }
    /** Name and count constraints are dropped; an object's own cross-field
     * rules precede those of its properties. */
    objectKeywords(source, out, path) {
        for (const sentence of dependencyGuidance(source))
            this.note(path === "" ? sentence : `In ${label(path)}: ${sentence}`);
        if (isRecord(source.properties)) {
            // `fromEntries` defines each name as an own property, so a property
            // named `__proto__` stays a property rather than setting the prototype.
            const properties = Object.fromEntries(Object.entries(source.properties)
                // A never-valid property is omitted; closed objects still refuse it.
                .filter(([, child]) => child !== false)
                .map(([name, child]) => [
                name,
                this.project(child, path === "" ? name : `${path}.${name}`),
            ]));
            out.properties = properties;
            if (isStringList(source.required)) {
                const required = source.required.filter((name) => Object.hasOwn(properties, name));
                if (required.length > 0)
                    out.required = required;
            }
        }
        if (source.additionalProperties === false &&
            (!isRecord(source.patternProperties) ||
                Object.keys(source.patternProperties).length === 0))
            out.additionalProperties = false;
    }
    /** A tuple advertises the union of its positions. */
    arrayKeywords(source, out, path) {
        const tuple = Array.isArray(source.prefixItems)
            ? source.prefixItems
            : Array.isArray(source.items)
                ? source.items
                : undefined;
        if (tuple !== undefined) {
            // Elements past the positions follow `items` (2020-12) or
            // `additionalItems` (draft-07), and are unconstrained without either
            // unless `maxItems` admits none.
            const restSchema = Array.isArray(source.prefixItems)
                ? source.items
                : source.additionalItems;
            const bounded = typeof source.maxItems === "number" && source.maxItems <= tuple.length;
            const rest = restSchema === false || bounded
                ? []
                : [restSchema === undefined ? true : restSchema];
            out.items = this.elementUnion([...tuple, ...rest], `${path}[]`);
        }
        else if (isRecord(source.items))
            out.items = this.project(source.items, `${path}[]`);
        if (source.uniqueItems === true)
            this.note(`${label(path)} entries must be distinct.`);
    }
    /** One element schema accepting every member; any-value members stay open. */
    elementUnion(members, path) {
        return members.some((member) => member === true ||
            (isRecord(member) && Object.keys(member).length === 0))
            ? {}
            : this.project({ anyOf: members.filter(isRecord) }, path);
    }
    /** `oneOf` widens to `anyOf`; string-literal unions merge into one enum. */
    unionKeywords(source, out, path) {
        const alternatives = Array.isArray(source.anyOf)
            ? source.anyOf
            : Array.isArray(source.oneOf)
                ? source.oneOf
                : undefined;
        if (alternatives === undefined)
            return;
        const branches = this.unionBranches(alternatives, path, out.type);
        if (branches.length > 0 &&
            out.enum === undefined &&
            (out.type === undefined || out.type === "string") &&
            branches.every(isStringEnum)) {
            out.type = "string";
            out.enum = [
                ...new Set(branches.flatMap((branch) => branch.enum)),
            ];
            return;
        }
        if (branches.length === 1 && isRecord(branches[0])) {
            const branch = branches[0];
            // As with `allOf`, a closure is scoped to its own properties: once the
            // parent's properties win, neither closure may reject the branch's.
            const scoped = Object.hasOwn(out, "properties") && Object.hasOwn(branch, "properties");
            for (const [key, keyword] of Object.entries(branch))
                if (!Object.hasOwn(out, key))
                    out[key] = keyword;
            if (scoped)
                delete out.additionalProperties;
            return;
        }
        if (branches.length < 2)
            return;
        out.anyOf = branches;
        const types = new Set(branches.map(branchType));
        if (out.type === undefined && types.size === 1 && !types.has(undefined))
            out.type = [...types][0];
        // Clients require `items` on every array. The union of the branch
        // element schemas restates what the branches already enforce.
        if (out.type === "array" &&
            out.items === undefined &&
            branches.every((branch) => isRecord(branch) && isRecord(branch.items)))
            out.items = this.elementUnion(branches.map((branch) => branch.items), `${path}[]`);
    }
    /** Flattened, typed from their parent and deduplicated. */
    unionBranches(branches, path, parentType) {
        const branchNotes = [];
        const projectedBranches = distinct(branches.flatMap((branch) => {
            const typed = typeof parentType === "string" &&
                isRecord(branch) &&
                branch.type === undefined &&
                branch.anyOf === undefined &&
                branch.oneOf === undefined
                ? { ...branch, type: parentType }
                : branch;
            const projection = new DialectProjection();
            const projected = projection.project(typed, path);
            branchNotes.push(projection.notes);
            return isRecord(projected) &&
                Array.isArray(projected.anyOf) &&
                onlyKeys(projected, ["anyOf"])
                ? projected.anyOf
                : [projected];
        }));
        for (const note of branchNotes[0] ?? [])
            if (branchNotes.every((notes) => notes.includes(note)))
                this.note(note);
        return projectedBranches;
    }
}
/** Project one root input schema into the portable advertised dialect. */
export const projectToAdvertisedDialect = (root) => {
    const projection = new DialectProjection();
    // The root description joins the tool description whole, not truncated.
    const { description, ...rest } = root;
    const projected = projection.project(rest, "");
    return {
        schema: { type: "object", ...(isRecord(projected) ? projected : {}) },
        guidance: [
            ...(typeof description === "string" && description !== ""
                ? [description]
                : []),
            ...projection.notes,
        ],
    };
};
