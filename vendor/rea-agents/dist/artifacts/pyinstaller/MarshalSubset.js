import { err, ok } from "../../domain/result.js";
import { MarshalDefectError, MarshalReader, } from "../../domain/python/marshalReader.js";
import { pyInstallerFailure, } from "./PyInstallerFailure.js";
const MAX_DEPTH = 16;
const MAX_NODES = 100_000;
const MAX_SEQUENCE = 100_000;
const MAX_STRING_BYTES = 65_536;
/** Digits of a TYPE_LONG whose magnitude can still be a safe integer. */
const MAX_LONG_DIGITS = 8;
const FORMAT_MESSAGES = {
    truncated: "PYZ marshal value is truncated",
    "negative-string-length": "PYZ marshal string has a negative length",
    "negative-sequence-length": "PYZ marshal sequence has a negative count",
    "negative-field": "PYZ marshal value has a negative count",
    "invalid-utf8": "PYZ marshal string is not valid UTF-8",
    "long-digit-range": "PYZ marshal long digit is out of range",
    "long-not-normalized": "PYZ marshal long is not normalized",
    "unresolved-reference": "PYZ marshal reference does not point at a completed value",
    "unsupported-type": "PYZ marshal value uses a type outside the supported subset",
};
const LIMIT_MESSAGES = {
    objects: "PYZ marshal value exceeds the depth or object bound",
    depth: "PYZ marshal value exceeds the depth or object bound",
    sequence: "PYZ marshal sequence exceeds the supported count",
    "string-bytes": "PYZ marshal string exceeds the supported length",
    "long-bytes": "PYZ marshal integer exceeds the safe range",
    "long-digits": "PYZ marshal integer exceeds the safe range",
};
/** A PYZ budget refusal, kept apart from the shared reader's format failures. */
class PyzMarshalLimit {
    message;
    constructor(message) {
        this.message = message;
    }
}
/**
 * The shared CPython marshal reader restricted to list, tuple, str, int and
 * bytes. Containers are published only once complete, so the projected
 * values cannot be cyclic and a reference into an unfinished container fails.
 */
class PyzMarshalReader extends MarshalReader {
    constructor(bytes) {
        super(bytes, {
            format: "pyinstaller-pyz-toc",
            limits: {
                maxObjects: MAX_NODES,
                maxDepth: MAX_DEPTH,
                maxStringBytes: MAX_STRING_BYTES,
                maxSequence: MAX_SEQUENCE,
                maxLongDigits: MAX_LONG_DIGITS,
            },
            publishContainers: "after-items",
        });
    }
    wrap(value) {
        return value;
    }
    limitExceeded(exceeded) {
        throw new PyzMarshalLimit(LIMIT_MESSAGES[exceeded.limit]);
    }
    /** A TOC integer must be a safe JavaScript number, checked in stream order. */
    readTyped(type, depth, slot) {
        const value = super.readTyped(type, depth, slot);
        if (value.kind === "int" &&
            (value.value > MAX_SAFE || value.value < -MAX_SAFE))
            throw new PyzMarshalLimit(LIMIT_MESSAGES["long-digits"]);
        return value;
    }
}
const MAX_SAFE = BigInt(Number.MAX_SAFE_INTEGER);
/**
 * Read one marshal value using only list, tuple, str, int, and bytes.
 * Container slots are reserved before their elements so later references match
 * CPython. Any other type fails the whole value.
 */
export const readMarshalSubset = (bytes) => {
    const reader = new PyzMarshalReader(bytes);
    let value;
    try {
        value = project(reader.readObject(0), new WeakMap());
    }
    catch (cause) {
        if (cause instanceof PyzMarshalLimit)
            return err(pyInstallerFailure("limit", cause.message));
        if (cause instanceof MarshalDefectError)
            return err(pyInstallerFailure("format", FORMAT_MESSAGES[cause.defect]));
        throw cause;
    }
    if (reader.offset !== bytes.length)
        return err(pyInstallerFailure("format", "PYZ marshal value did not consume its table of contents"));
    return ok(value);
};
/** Shared values keep their identity, so one projection serves every reference. */
const project = (value, projected) => {
    switch (value.kind) {
        case "int":
            return Number(value.value);
        case "str":
        case "bytes":
            return value.value;
        case "tuple":
        case "list": {
            const known = projected.get(value);
            if (known !== undefined)
                return known;
            const items = value.items.map((item) => project(item, projected));
            projected.set(value, items);
            return items;
        }
    }
};
