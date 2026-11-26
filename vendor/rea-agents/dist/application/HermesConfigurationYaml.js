import { isAlias, isMap, isScalar, isSeq, Pair, parseDocument, Document, Schema, YAMLMap, } from "yaml";
import { ConfigurationError } from "../domain/configurationErrors.js";
import { preserveYamlAliasValues, copyYamlAliasSource, resolveYamlEditPath, } from "./YamlConfigurationAliases.js";
import { materializeUnresolvedYamlAliases, retainYamlConfigurationSource, yamlAliasValues, retainYamlScalarSource, yamlNumericValuesEqual, } from "./YamlConfigurationSource.js";
import { isRecord } from "../kernel/isRecord.js";
const SOURCE_SCALAR_TAGS = new Set([
    "tag:yaml.org,2002:int",
    "tag:yaml.org,2002:float",
    "tag:yaml.org,2002:timestamp",
]);
// Hermes's ruamel reader resolves dates even with an explicit YAML 1.2 directive.
const timestampTag = new Schema({ schema: "yaml-1.1" }).tags.find((tag) => tag.tag === "tag:yaml.org,2002:timestamp" && tag.collection === undefined);
if (timestampTag === undefined)
    throw new Error("The YAML 1.1 schema must provide its timestamp tag");
const timestampSource = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:(?:[Tt]|[ \t]+)(\d{1,2}):(\d{2}):(\d{2})(?:\.([0-9]*))?(?:[ \t]*(Z|([-+])(\d{1,2})(?::(\d{2}))?))?)?$/;
const hermesTimestampImplicit = /^(?:\d{4}-\d{2}-\d{2}|\d{4}-\d{1,2}-\d{1,2}(?:[Tt]|[ \t]+)\d{1,2}:\d{2}:\d{2}(?:\.[0-9]*)?(?:[ \t]*(?:Z|[-+]\d{1,2}(?::\d{2})?))?)$/;
const floorDivide = (value, divisor) => Math.floor(value / divisor);
/** Days since 1970-01-01 using the proleptic Gregorian calendar. */
const civilDay = (year, month, day) => {
    const adjustedYear = year - (month <= 2 ? 1 : 0);
    const era = floorDivide(adjustedYear, 400);
    const yearOfEra = adjustedYear - era * 400;
    const adjustedMonth = month + (month > 2 ? -3 : 9);
    const dayOfYear = floorDivide(153 * adjustedMonth + 2, 5) + day - 1;
    const dayOfEra = yearOfEra * 365 +
        floorDivide(yearOfEra, 4) -
        floorDivide(yearOfEra, 100) +
        dayOfYear;
    return era * 146097 + dayOfEra - 719468;
};
/** Parse the exact timestamp forms and values accepted by ruamel's safe loader. */
const parseHermesTimestamp = (source) => {
    const match = timestampSource.exec(source);
    if (match === null)
        return undefined;
    const [, yearText, monthText, dayText, hourText, minuteText, secondText, fraction, zone, sign, zoneHourText, zoneMinuteText,] = match;
    if (yearText === undefined ||
        monthText === undefined ||
        dayText === undefined)
        return undefined;
    const year = Number(yearText);
    const month = Number(monthText);
    const dayOfMonth = Number(dayText);
    if (year < 1 || year > 9999 || month < 1 || month > 12)
        return undefined;
    const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const monthDays = [
        31,
        leapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    if (dayOfMonth < 1 || dayOfMonth > (monthDays[month - 1] ?? 0))
        return undefined;
    const date = `${yearText}-${monthText.padStart(2, "0")}-${dayText.padStart(2, "0")}`;
    const day = civilDay(year, month, dayOfMonth);
    if (hourText === undefined) {
        const micros = BigInt(day) * 86400000000n;
        return { key: `date:${date}`, value: new Date(Number(micros / 1000n)) };
    }
    const hour = Number(hourText);
    const minute = Number(minuteText);
    const second = Number(secondText);
    if (hour > 23 || minute > 59 || second > 59)
        return undefined;
    const zoneHour = Number(zoneHourText ?? 0);
    const zoneMinute = Number(zoneMinuteText ?? 0);
    if (zoneHour > 23 || zoneMinute > 59)
        return undefined;
    let microseconds = 0;
    if (fraction !== undefined && fraction.length > 0) {
        microseconds = Number((fraction.slice(0, 6) + "000000").slice(0, 6));
        if (fraction.length > 6 && Number(fraction[6]) > 4)
            microseconds += 1;
    }
    const wholeSeconds = hour * 3600 + minute * 60 + second;
    if (year === 9999 &&
        month === 12 &&
        dayOfMonth === 31 &&
        wholeSeconds === 86_399 &&
        microseconds === 1_000_000)
        return undefined;
    let micros = BigInt(day) * 86400000000n +
        BigInt(wholeSeconds) * 1000000n +
        BigInt(microseconds);
    if (zone !== undefined && zone !== "Z") {
        const offset = (zoneHour * 60 + zoneMinute) * (sign === "+" ? 1 : -1);
        micros -= BigInt(offset) * 60000000n;
    }
    return {
        key: zone === undefined
            ? `datetime-local:${micros}`
            : `datetime-utc:${micros}`,
        value: new Date(Number(micros / 1000n - (micros % 1000n < 0n ? 1n : 0n))),
    };
};
const numericValue = (value) => {
    if (typeof value === "boolean")
        return value ? 1n : 0n;
    if (typeof value === "bigint" || typeof value === "number")
        return value;
    return undefined;
};
const createHermesYamlOptions = () => {
    const timestamps = new Map();
    const timestampFacts = (source) => {
        if (timestamps.has(source))
            return timestamps.get(source);
        const facts = parseHermesTimestamp(source);
        timestamps.set(source, facts);
        return facts;
    };
    const hermesTimestampTag = {
        ...timestampTag,
        test: hermesTimestampImplicit,
        resolve: (source) => {
            const facts = timestampFacts(source);
            if (facts === undefined)
                throw new Error(`Invalid Hermes YAML timestamp: ${source}`);
            return facts.value;
        },
    };
    const keyFacts = new WeakMap();
    const hermesKey = (node) => {
        const cached = keyFacts.get(node);
        if (cached !== undefined)
            return cached;
        if (!isScalar(node))
            return { kind: "other", value: node };
        const numeric = numericValue(node.value);
        const key = numeric !== undefined
            ? { kind: "numeric", value: numeric }
            : node.value instanceof Date
                ? {
                    kind: "timestamp",
                    value: timestampFacts(node.source ?? "")?.key ??
                        `invalid:${node.source ?? ""}`,
                }
                : { kind: "other", value: node.value };
        keyFacts.set(node, key);
        return key;
    };
    /** Python dict key equality is Hermes' duplicate-key behavior (bool is int). */
    const hermesKeysEqual = (leftNode, rightNode) => {
        const left = hermesKey(leftNode);
        const right = hermesKey(rightNode);
        if (left.kind !== right.kind)
            return false;
        if (left.kind === "numeric" && right.kind === "numeric")
            return yamlNumericValuesEqual(left.value, right.value);
        return left.value === right.value;
    };
    return {
        // Hermes defaults to YAML 1.1; an explicit document directive still wins.
        // Use the same schema to interpret existing values and quote new strings.
        version: "1.1",
        // Keep integer identity exact; the consumer projection converts only
        // safely representable integers to numbers.
        intAsBigInt: true,
        customTags: (tags) => {
            const hasTimestamp = tags.some((tag) => typeof tag !== "string" && tag.tag === timestampTag.tag);
            const withHermesTimestamp = hasTimestamp
                ? tags.map((tag) => typeof tag !== "string" && tag.tag === timestampTag.tag
                    ? hermesTimestampTag
                    : tag)
                : [...tags, hermesTimestampTag];
            return withHermesTimestamp.map((tag) => typeof tag !== "string" && SOURCE_SCALAR_TAGS.has(tag.tag)
                ? retainYamlScalarSource(tag)
                : tag);
        },
        uniqueKeys: hermesKeysEqual,
    };
};
/** Create a Hermes config using the same scalar rules as edits and readback. */
export const stringifyHermesConfigurationYaml = (document) => new Document(document, createHermesYamlOptions()).toString({ lineWidth: 0 });
// A comment-only document has no root; a bare marker has an unwritten null
// scalar. Explicit null values, tags and anchors remain actual values.
const isEmptyYamlRoot = (root) => root === null ||
    (isScalar(root) &&
        root.value === null &&
        root.source === "" &&
        root.tag === undefined &&
        root.anchor === undefined);
const parseHermesDocument = (text) => {
    const document = parseDocument(text, createHermesYamlOptions());
    const error = document.errors[0];
    if (error !== undefined)
        throw error;
    return document;
};
/** The value a path resolves to, merges included, or `absent`. */
const projectedYamlValue = (document, path) => {
    let current = document.toJS();
    for (const segment of path) {
        if (typeof current !== "object" ||
            current === null ||
            !Object.hasOwn(current, segment))
            return "absent";
        current = current[segment];
    }
    return { value: current };
};
const projectedYamlPathExists = (document, path) => projectedYamlValue(document, path) !== "absent";
const inheritedRegistrationRemovalError = () => new ConfigurationError("The registration is inherited from a YAML merge. Remove it at the shared source before rerunning uninstall");
/** Find the source node selected by YAML merge precedence. */
const inheritedYamlValue = (document, source, name, visiting = new Set()) => {
    const node = isAlias(source) ? source.resolve(document) : source;
    if (!isMap(node) || visiting.has(node))
        return undefined;
    visiting.add(node);
    try {
        const matches = node.items.filter((pair) => {
            const key = isAlias(pair.key) ? pair.key.resolve(document) : pair.key;
            return isScalar(key) && key.value === name;
        });
        if (matches.length > 1)
            throw new ConfigurationError(`YAML mapping contains more than one key resolving to ${JSON.stringify(name)}`);
        if (matches[0] !== undefined)
            return matches[0].value;
        for (const pair of node.items) {
            if (!isScalar(pair.key) ||
                typeof pair.key.value !== "symbol" ||
                pair.key.source !== "<<")
                continue;
            const merged = isAlias(pair.value)
                ? pair.value.resolve(document)
                : pair.value;
            const sources = isSeq(merged) ? merged.items : [merged];
            for (const candidate of sources) {
                const found = inheritedYamlValue(document, candidate, name, visiting);
                if (found !== undefined)
                    return found;
            }
        }
        return undefined;
    }
    finally {
        visiting.delete(node);
    }
};
/** Create a local override that continues to inherit the shared mapping. */
const inheritedYamlMapOverride = (document, parent, name) => {
    const owner = parent.length === 1
        ? document.contents
        : document.getIn(parent.slice(0, -1), true);
    let inherited = inheritedYamlValue(document, owner, name);
    if (isAlias(inherited))
        inherited = inherited.resolve(document);
    if (!isMap(inherited))
        throw new ConfigurationError(`Inherited YAML setting ${JSON.stringify(name)} is not a mapping`);
    const mergeDocument = parseHermesDocument("<<: {}\n");
    if (!isMap(mergeDocument.contents) ||
        mergeDocument.contents.items[0] === undefined)
        throw new ConfigurationError("Cannot create a YAML merge key");
    const alias = document.createAlias(inherited, "rea_inherited");
    const override = new YAMLMap(document.schema);
    override.items.push(new Pair(mergeDocument.contents.items[0].key, alias));
    document.setIn(parent, override);
    if (alias.resolve(document) !== inherited)
        throw new ConfigurationError("The inherited YAML anchor is shadowed; edit its shared source before rerunning setup");
};
/** Parse a Hermes `config.yaml`, preserving the distinction between no root and explicit null. */
export const parseHermesConfigurationYaml = (text) => {
    const document = parseHermesDocument(text);
    return isEmptyYamlRoot(document.contents)
        ? {}
        : document.toJS({
            reviver: (_key, value) => typeof value === "bigint" && Number.isSafeInteger(Number(value))
                ? Number(value)
                : value,
        });
};
/** Set or delete one value in a Hermes `config.yaml`, keeping the rest as written. */
export const editHermesConfigurationYaml = (text, path, value) => {
    // A plain Document, so a bare `---` root can be replaced by a new map.
    const document = parseHermesDocument(text);
    const root = document.contents;
    if (isEmptyYamlRoot(root)) {
        const map = document.createNode({});
        if (isScalar(root))
            map.commentBefore = [root.commentBefore, root.comment]
                .filter((comment) => comment !== undefined)
                .join("\n");
        document.contents = map;
    }
    for (let length = 1; length < path.length; length++) {
        const parent = resolveYamlEditPath(document, path.slice(0, length));
        const previous = document.getIn(parent, true);
        if (isAlias(previous)) {
            const copied = copyYamlAliasSource(previous, document);
            if (isMap(copied)) {
                // Edit a private mapping, keeping the alias source and its consumers.
                document.setIn(parent, copied);
            }
        }
        else if (value !== undefined && !document.hasIn(parent)) {
            if (projectedYamlPathExists(document, path.slice(0, length))) {
                inheritedYamlMapOverride(document, parent, path[length - 1]);
                continue;
            }
            // Implicit JS Map parents serialize as !!omap in YAML 1.1.
            document.setIn(parent, document.createNode({}));
        }
    }
    // A registration inherited whole through a merge keeps that inheritance:
    // override it with the merge, then write only the fields that differ.
    const inheritedSourcePath = resolveYamlEditPath(document, path);
    // An explicit replacement that drops inherited fields, such as remote
    // connection selectors, writes a local registration instead.
    const inheritedRegistration = document.hasIn(inheritedSourcePath)
        ? "absent"
        : projectedYamlValue(document, path);
    if (isRecord(value) &&
        inheritedRegistration !== "absent" &&
        typeof inheritedRegistration.value === "object" &&
        inheritedRegistration.value !== null &&
        Object.keys(inheritedRegistration.value).every((key) => Object.hasOwn(value, key)))
        inheritedYamlMapOverride(document, inheritedSourcePath, path.at(-1));
    const sourcePath = resolveYamlEditPath(document, path);
    const previous = document.getIn(sourcePath, true);
    // Deletion removes the pair's key too; replacement retains that key node.
    const parent = value === undefined
        ? document.getIn(sourcePath.slice(0, -1), true)
        : undefined;
    if (value === undefined &&
        !document.hasIn(sourcePath) &&
        projectedYamlPathExists(document, path))
        throw inheritedRegistrationRemovalError();
    const removedKey = isMap(parent)
        ? parent.items.find((pair) => pair.key === sourcePath.at(-1))?.key
        : undefined;
    const aliasValues = yamlAliasValues(previous, document);
    const retainedSources = preserveYamlAliasValues(document, [
        previous,
        removedKey,
    ]);
    if (value === undefined) {
        if (!document.deleteIn(sourcePath))
            return text;
        if (projectedYamlPathExists(document, path))
            throw inheritedRegistrationRemovalError();
    }
    else {
        // Let YAML's scalar update preserve numeric formats for a direct edit.
        // Replacing containers needs explicit retention of unchanged child nodes.
        document.setIn(sourcePath, isMap(previous) || isSeq(previous)
            ? retainYamlConfigurationSource(previous, document.createNode(value), retainedSources, document)
            : value);
        materializeUnresolvedYamlAliases(document, aliasValues);
    }
    // Editing REA must not reflow unrelated user prompts or other YAML scalars.
    return document.toString({
        lineWidth: 0,
        // Hermes tries the YAML 1.1 C loader before its directive-aware pure
        // fallback. Quote new strings to avoid introducing YAML 1.1 coercions.
        ...(document.directives?.yaml.version === "1.2"
            ? {
                defaultStringType: "QUOTE_DOUBLE",
                defaultKeyType: "QUOTE_DOUBLE",
            }
            : {}),
    });
};
