import { z } from "zod";
import { declaredTokenPattern } from "../domain/schemaConstraints.js";
import { decimalTokenPattern } from "./decimalTokenPattern.js";
import { OPEN_BINARY_TOOL_CONTRACT } from "../contracts/sessionToolContracts.js";
/** Decimal integer argv text. Leading zeros stay decimal; `0x` and exponent spellings do not. */
const DECIMAL_INTEGER_TOKEN = /^[0-9]+$/u;
const decimalToken = (domain) => declaredTokenPattern(z.string().regex(DECIMAL_INTEGER_TOKEN, "Expected a decimal integer"), new RegExp(decimalTokenPattern(domain), "u"))
    .pipe(z.coerce.number())
    .pipe(domain);
const unwrapSchema = (field) => field.unwrap();
/**
 * Command schemas advertise Zod's output view. Publish the input view so an argv token
 * grammar that transforms text survives `--schema` and other SDK conversions.
 */
export const publishArgvInput = (field) => {
    const { $schema: _dialect, ...inputSchema } = z.toJSONSchema(field, {
        io: "input",
    });
    return field.meta(inputSchema);
};
const numericStack = (field) => {
    const wrappers = [];
    let description;
    let current = field;
    for (;;) {
        if (description === undefined && current.description !== undefined)
            description = current.description;
        if (current instanceof z.ZodDefault) {
            wrappers.push({
                kind: "default",
                value: current.parse(undefined),
            });
            current = unwrapSchema(current);
            continue;
        }
        if (current instanceof z.ZodPrefault) {
            wrappers.push({
                kind: "prefault",
                value: current.parse(undefined),
            });
            current = unwrapSchema(current);
            continue;
        }
        if (current instanceof z.ZodOptional) {
            wrappers.push({ kind: "optional" });
            current = unwrapSchema(current);
            continue;
        }
        if (current instanceof z.ZodExactOptional) {
            wrappers.push({ kind: "exactOptional" });
            current = unwrapSchema(current);
            continue;
        }
        if (current instanceof z.ZodNullable) {
            wrappers.push({ kind: "nullable" });
            current = unwrapSchema(current);
            continue;
        }
        if (current instanceof z.ZodReadonly) {
            wrappers.push({ kind: "readonly" });
            current = unwrapSchema(current);
            continue;
        }
        break;
    }
    return current instanceof z.ZodNumber
        ? { core: current, wrappers, description }
        : undefined;
};
const applyDecimalWrappers = (field, wrappers) => {
    let admitted = field;
    for (const wrapper of wrappers.toReversed()) {
        if (wrapper.kind === "nullable")
            admitted = admitted.nullable();
        else if (wrapper.kind === "optional")
            admitted = admitted.optional();
        else if (wrapper.kind === "exactOptional")
            admitted = admitted.exactOptional();
        else if (wrapper.kind === "readonly")
            admitted = admitted.readonly();
        else if (wrapper.kind === "prefault")
            admitted = admitted.prefault(wrapper.value);
        else if (wrapper.kind === "default")
            admitted = admitted.default(wrapper.value);
    }
    return admitted;
};
/**
 * Parse a decimal token, then let the domain field own bounds, defaults,
 * nullability and help. JSON numbers remain valid for schema consumers.
 */
export const cliDecimalField = (field) => {
    const numeric = numericStack(field);
    if (numeric === undefined)
        throw new Error(`cliDecimalField expected a numeric domain field, received ${field.constructor.name}`);
    const admitted = applyDecimalWrappers(z.union([numeric.core, decimalToken(numeric.core)]), numeric.wrappers);
    const described = numeric.description === undefined
        ? admitted
        : admitted.describe(numeric.description);
    return publishArgvInput(described);
};
/** Adapt each numeric property of a shared shape; other properties stay unchanged. */
export const cliDecimalShape = (shape) => Object.fromEntries(Object.entries(shape).map(([key, field]) => [
    key,
    numericStack(field) === undefined ? field : cliDecimalField(field),
]));
/** Help of the flags that bind a native target interpretation. */
const NATIVE_OPEN_HELP = {
    format: "Explicit interpretation: dos-com or raw-binary (headerless), or gamecube-dol (GameCube/Wii DOL, never auto-detected); omission preserves header-based detection",
    architecture: "Caller-supplied CPU family; required with --target-format raw-binary, must be omitted with gamecube-dol",
    entryPoint: "Caller-supplied load and entry address (0xhex); required with --target-format raw-binary, optional with gamecube-dol (must equal the DOL header entry)",
    provider: "Bind deep analysis to a provider ID or use deterministic auto selection",
    snapshot: "Load and update a local analysis snapshot",
};
/**
 * A native executable opened as an MCP client opens it, with `open_binary`'s
 * format, architecture, entry point and provider fields. An operation that
 * loads and updates an analysis snapshot also takes `snapshot_path`, with
 * `snapshot` as its help when it differs from the shared one.
 */
export const nativeTarget = (description, snapshot) => ({
    description,
    open: {
        contract: OPEN_BINARY_TOOL_CONTRACT,
        fields: {
            ...(snapshot === undefined
                ? {}
                : {
                    snapshot_path: {
                        name: "snapshot",
                        callerPath: true,
                        description: snapshot === true ? NATIVE_OPEN_HELP.snapshot : snapshot,
                    },
                }),
            format: {
                name: "target-format",
                values: ["dos-com", "raw-binary", "gamecube-dol"],
                description: NATIVE_OPEN_HELP.format,
            },
            architecture: { description: NATIVE_OPEN_HELP.architecture },
            entry_point: {
                name: "entry-point",
                description: NATIVE_OPEN_HELP.entryPoint,
            },
            provider_id: { name: "provider", description: NATIVE_OPEN_HELP.provider },
        },
    },
});
