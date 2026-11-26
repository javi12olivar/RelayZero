import { z } from "zod";
import { cliCommandFor } from "../contracts/cliCommandNames.js";
import { AnalysisInputError } from "../domain/analysisErrorCore.js";
import { analysisInputErrorFromIssues } from "../domain/inputIssueProjection.js";
import { localPathStringSchema } from "../domain/localPath.js";
import { schemaAnnotations } from "../domain/schemaAnnotations.js";
import { isRecord } from "../kernel/isRecord.js";
import { err, ok } from "../domain/result.js";
import { absoluteCallerPath } from "../filesystem/callerPath.js";
import { analysisEvidenceDeliveryOptions, cliEvidenceDeliveryInputError, } from "./analysisEvidenceDelivery.js";
import { parseCliJsonOption } from "./cliJsonOption.js";
import { getEvidenceInputContract } from "../domain/evidenceInputContract.js";
import { cliJsonCallerPathSchema } from "./cliJsonInput.js";
import { safeParseJson } from "../domain/safeJson.js";
import { cliDecimalField, cliDecimalShape } from "./options.js";
import { selectCliAnalysisSelector, } from "./analysisSelector.js";
import { optionFlagName } from "./optionFields.js";
/**
 * The command a projection registers: the contract's own command, which the
 * contract declares with `cli: true` so the CLI inventory can be derived from
 * the registry, or the command a route names.
 */
const projectedCommand = (contract, command) => {
    if (command !== undefined)
        return command;
    if (contract.cli !== true)
        throw new Error(`${contract.name} does not declare its CLI command`);
    return cliCommandFor(contract.name);
};
/** The CLI key of a session target, which no contract field supplies. */
const SESSION_TARGET_KEY = "path";
/** Help for `--view`, which names the delivery it needs. */
const viewOptionHelp = (viewDelivery) => viewDelivery.viewSelectsSummary === true
    ? "JSON page selection; selects summary delivery, which requires --evidence_output"
    : "JSON page selection; requires --detail summary and --evidence_output";
/** One contract from a contract group, keeping its exact schema types. */
export const contractNamed = (contracts, name) => {
    const contract = contracts.find((candidate) => candidate.name === name);
    if (contract === undefined)
        throw new Error(`Missing tool contract: ${name}`);
    return contract;
};
const camelCase = (field) => field.replaceAll(/_([a-z0-9])/gu, (_, letter) => letter.toUpperCase());
/** The contract object admits this field's key being absent. */
const admitsOmission = (field) => z.object({ value: field }).safeParse({}).success;
const isWrapper = (value) => value instanceof z.ZodOptional ||
    value instanceof z.ZodExactOptional ||
    value instanceof z.ZodDefault ||
    value instanceof z.ZodPrefault ||
    value instanceof z.ZodNullable ||
    value instanceof z.ZodReadonly;
const core = (value) => {
    let current = value;
    while (isWrapper(current))
        current = current.unwrap();
    return current;
};
/**
 * The description of a field, read through wrappers such as `.optional()`:
 * zod does not carry a wrapped schema's description to its wrapper, and the
 * advertised JSON Schema shows the wrapped description.
 */
const describedThroughWrappers = (value) => {
    let current = value;
    while (current.description === undefined && isWrapper(current))
        current = current.unwrap();
    return current.description;
};
/**
 * JSON text for a structured contract field. Argv carries text; the decoded
 * value is admitted by the contract field itself, so `--schema` advertises
 * the contract's structure.
 */
const jsonTextField = (declared, flag) => {
    const value = declared instanceof z.ZodOptional || declared instanceof z.ZodExactOptional
        ? declared.unwrap()
        : declared;
    const expected = core(value) instanceof z.ZodObject ? "a JSON object" : "valid JSON";
    const decoded = z
        .string()
        .transform((text, context) => {
        const parsed = safeParseJson(text);
        if (parsed.ok)
            return parsed.value;
        context.addIssue({
            code: "custom",
            message: `${flag} must be ${expected}`,
        });
        return z.NEVER;
    })
        .pipe(value);
    const admitted = admitsOmission(declared) ? decoded.optional() : decoded;
    return declared.description === undefined
        ? admitted
        : admitted.describe(declared.description);
};
const assertArgvField = (contract, field, schema) => {
    const current = core(schema);
    // A union of text forms, such as `auto` or a provider ID, is one token.
    const text = (member) => member instanceof z.ZodString ||
        member instanceof z.ZodEnum ||
        (member instanceof z.ZodLiteral &&
            [...member.values].every((value) => typeof value === "string"));
    const scalar = current instanceof z.ZodString ||
        current instanceof z.ZodNumber ||
        current instanceof z.ZodBoolean ||
        current instanceof z.ZodEnum ||
        (current instanceof z.ZodUnion &&
            current.options.every(text));
    const element = current instanceof z.ZodArray ? core(current.element) : null;
    if (!scalar &&
        !(element instanceof z.ZodString ||
            element instanceof z.ZodEnum ||
            element instanceof z.ZodNumber))
        throw new Error(`${contract}.${field} has no argv projection; declare one before exposing it on the CLI`);
};
/**
 * Argv cannot carry an explicit undefined, so an exact-optional field admits
 * the same values as an optional one. Renderers such as Incur's help read
 * boolean flags and enum choices only through `optional`.
 */
/**
 * The inbound view of a transformed contract field, such as an endpoint or
 * an origin list the contract normalizes: argv carries the text the
 * contract transforms when it admits the input, as tools/list advertises
 * it. Undefined when the field has no transform.
 */
const inboundView = (field) => {
    const inbound = (schema) => {
        if (schema instanceof z.ZodPipe && schema.out instanceof z.ZodTransform)
            return inbound(schema.in) ?? schema.in;
        if (schema instanceof z.ZodArray) {
            const element = inbound(schema.element);
            return element === undefined
                ? undefined
                : schema.clone({ ...schema.def, element });
        }
        return undefined;
    };
    const view = inbound(core(field));
    if (view === undefined)
        return undefined;
    // The contract applies its own default when it admits the input.
    const optional = admitsOmission(field) ? view.optional() : view;
    const description = field.description ?? view.description;
    return description === undefined ? optional : optional.describe(description);
};
/**
 * The argv schema of a field: a number, or each element of an array of
 * numbers, takes decimal tokens only. An array keeps its own bounds.
 */
const argvDecimal = (field) => {
    const array = core(field);
    if (!(array instanceof z.ZodArray) ||
        !(core(array.element) instanceof z.ZodNumber))
        return cliDecimalShape({ field }).field;
    if (field instanceof z.ZodDefault)
        throw new Error("A defaulted number array has no argv projection");
    const decimal = new z.ZodArray({
        ...array._zod.def,
        element: cliDecimalField(array.element),
    });
    const admitted = admitsOmission(field) ? decimal.optional() : decimal;
    return field.description === undefined
        ? admitted
        : admitted.describe(field.description);
};
const argvOptional = (field) => {
    if (!(field instanceof z.ZodExactOptional))
        return field;
    const optional = field.unwrap().optional();
    return field.description === undefined
        ? optional
        : optional.describe(field.description);
};
const OBJECT_CONSTRAINTS = ["dependentRequired", "if", "then", "else"];
/** Contract-level presentation that CLI help states in its own words. */
const ROOT_ANNOTATIONS = new Set([
    "description",
    "title",
    "examples",
]);
/** Rename the field names inside the object constraints the contract advertises. */
const renameConstraint = (contract, value, rename) => {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        throw new Error(`${contract} has an unsupported object constraint`);
    return Object.fromEntries(Object.entries(value).map(([keyword, inner]) => {
        if (keyword === "required" && Array.isArray(inner))
            return [keyword, inner.map((field) => rename(field))];
        if (keyword === "properties" && typeof inner === "object" && inner)
            return [
                keyword,
                Object.fromEntries(Object.entries(inner).map(([field, schema]) => [
                    rename(field),
                    schema,
                ])),
            ];
        throw new Error(`${contract} object constraint keyword ${keyword} has no CLI projection`);
    }));
};
const projectObjectConstraints = (contract, rename, discriminatorFields, cliOptionDependencies, nullFlagLimits) => {
    const metadata = contract.inputSchema.meta() ?? {};
    for (const keyword of Object.keys(metadata))
        if (!ROOT_ANNOTATIONS.has(keyword) &&
            !OBJECT_CONSTRAINTS.includes(keyword))
            throw new Error(`${contract.name} input keyword ${keyword} has no CLI projection`);
    // A root discriminator is checked with the delivery, left to the contract
    // when the projection omits the discriminator, or is the option that
    // selects the input branch.
    const { rootDiscriminator } = schemaAnnotations(contract.inputSchema) ?? {};
    if (rootDiscriminator !== undefined &&
        !discriminatorFields.has(rootDiscriminator))
        throw new Error(`${contract.name} root discriminator ${rootDiscriminator} has no CLI projection`);
    const projected = {};
    for (const keyword of OBJECT_CONSTRAINTS) {
        const value = metadata[keyword];
        if (value === undefined)
            continue;
        projected[keyword] =
            keyword === "dependentRequired"
                ? Object.fromEntries(Object.entries(value).map(([field, required]) => [rename(field), required.map(rename)]))
                : renameConstraint(contract.name, value, rename);
    }
    if (Object.keys(cliOptionDependencies).length > 0)
        projected.dependentRequired = {
            ...projected.dependentRequired,
            ...cliOptionDependencies,
        };
    if (nullFlagLimits.length > 1)
        throw new Error(`${contract.name} has more than one null flag`);
    for (const [flag, limit] of nullFlagLimits)
        projected.not = {
            required: [flag, limit],
            properties: { [flag]: { const: true } },
        };
    return Object.keys(projected).length === 0 ? undefined : projected;
};
/**
 * Each input field's schema. Branches of a union input must share each field
 * the CLI takes as an argument; only delivery-owned fields, and omitted
 * fields the CLI never supplies, may differ, and they admit any branch's
 * value here. The delivery is then checked against the whole union.
 */
/**
 * A boolean whose `true` and `false` literals each select one input branch,
 * such as whether to capture script sources, is one flag. Omission takes the
 * default of the branch that admits it; the contract selects the branch when
 * it admits the input.
 */
const branchSelectingFlag = (branches) => {
    const values = branches.map((branch) => {
        const value = branch === undefined ? undefined : core(branch);
        return value instanceof z.ZodLiteral && value.values.size === 1
            ? [...value.values][0]
            : undefined;
    });
    if (values.some((value) => typeof value !== "boolean") ||
        new Set(values).size !== 2)
        return undefined;
    const omissions = branches.filter((branch) => admitsOmission(branch));
    if (omissions.length > 1)
        return undefined;
    const flag = z.boolean();
    return omissions.length === 0
        ? flag
        : flag.default(omissions[0].parse(undefined));
};
/** The text values a literal or enum field admits, or undefined for other fields. */
const textValues = (field) => {
    const value = field === undefined ? undefined : core(field);
    const values = value instanceof z.ZodLiteral
        ? [...value.values]
        : value instanceof z.ZodEnum
            ? value.options
            : undefined;
    return values?.every((entry) => typeof entry === "string")
        ? values
        : undefined;
};
/**
 * A field every input branch declares as distinct text values, a literal in
 * one branch or an enum in another, such as `action` or `operation`: the
 * option names the branch it selects. Omission takes the default of the one
 * branch that admits it.
 */
const branchSelectingChoice = (branches) => {
    const valueSets = branches.map(textValues);
    if (valueSets.some((values) => values === undefined))
        return undefined;
    const values = valueSets.flatMap((values) => values);
    const omissions = branches.filter((branch) => admitsOmission(branch));
    if (new Set(values).size !== values.length || omissions.length > 1)
        return undefined;
    const choice = z.enum(values);
    const omitted = omissions[0]?.parse(undefined);
    const chosen = omissions.length === 0
        ? choice
        : omitted === undefined
            ? choice.optional()
            : choice.default(omitted);
    const described = branches.find((branch) => branch.description);
    return described === undefined
        ? chosen
        : chosen.describe(described.description);
};
/**
 * A field only some input branches declare, with one schema there. The CLI
 * takes it as an optional option without a parse-time default, so another
 * branch never receives it; the selected branch's contract parse applies
 * its default, or refuses the field when that branch does not declare it.
 */
const branchOnlyField = (branches) => {
    const declared = branches.filter((branch) => branch !== undefined);
    const [first] = declared;
    if (first === undefined ||
        declared.length === branches.length ||
        declared.some((branch) => branch !== first))
        return undefined;
    if (admitsOmission(first))
        return withoutDefault(first);
    const optional = first.optional();
    return first.description === undefined
        ? optional
        : optional.describe(first.description);
};
/**
 * An option that must stay omitted when the caller omits it, because the
 * input branch or route the caller selects applies its own default on
 * admission. Help and `--schema` still state the default through the
 * schema metadata.
 */
export const withoutDefault = (schema) => {
    if (!(schema instanceof z.ZodDefault))
        return schema;
    const value = schema.parse(undefined);
    const omittable = schema.removeDefault().optional();
    return omittable.meta({ ...schema.meta(), default: value });
};
/**
 * The union branches a projection takes, and the field it fixes when it
 * selects one value.
 */
const selectInputBranches = (contract, selection) => {
    const schema = contract.inputSchema;
    if (selection === undefined)
        return { inputSchema: schema, fixed: undefined };
    const { field, values } = selection;
    if (schema instanceof z.ZodObject)
        throw new Error(`${contract.name} has one input branch`);
    const covered = new Set();
    const selected = schema.options.filter((branch) => {
        const admitted = textValues(branch.shape[field]);
        if (admitted === undefined)
            throw new Error(`${contract.name}.${field} does not tell branches apart`);
        const chosen = admitted.filter((value) => values.includes(value));
        if (chosen.length > 0 && chosen.length !== admitted.length)
            throw new Error(`${contract.name}.${field} would narrow an input branch`);
        for (const value of chosen)
            covered.add(value);
        return chosen.length > 0;
    });
    if (covered.size !== new Set(values).size)
        throw new Error(`${contract.name}.${field} selects no branch for a value`);
    return {
        inputSchema: selected.length === 1 ? selected[0] : z.union(selected),
        fixed: values.length === 1 ? [field, values[0]] : undefined,
    };
};
const inputFields = (contract, unprojectedFields) => {
    const schema = contract.inputSchema;
    if (schema instanceof z.ZodObject)
        return {
            shape: schema.shape,
            selectors: new Set(),
        };
    const shapes = schema.options.map((option) => option.shape);
    const names = new Set(shapes.flatMap((shape) => Object.keys(shape)));
    const selectors = new Set();
    const shape = Object.fromEntries([...names].map((field) => {
        const branches = shapes.map((shape) => shape[field]);
        const [first] = branches;
        if (branches.every((branch) => branch === first))
            return [field, first];
        const selector = branchSelectingFlag(branches) ?? branchSelectingChoice(branches);
        if (selector !== undefined) {
            selectors.add(field);
            return [field, selector];
        }
        const branchOnly = branchOnlyField(branches);
        if (branchOnly !== undefined)
            return [field, branchOnly];
        if (!unprojectedFields.has(field) ||
            branches.some((branch) => branch === undefined))
            throw new Error(`${contract.name}.${field} differs between input branches and has no argv projection`);
        return [field, z.union(branches)];
    }));
    return { shape, selectors };
};
/**
 * The document field at `path` as the CLI admits it: a caller path the
 * command resolves against the working directory, so a relative spelling is
 * admitted where the contract requires an absolute one. Unions and wrappers
 * keep their other branches; clones keep the source's registry metadata.
 */
const admitDocumentCallerPath = (schema, path) => {
    const [head, ...tail] = path;
    if (head === undefined) {
        const admitted = core(schema) instanceof z.ZodArray
            ? z.array(cliJsonCallerPathSchema)
            : cliJsonCallerPathSchema;
        const field = admitsOmission(schema) ? admitted.optional() : admitted;
        return schema.description === undefined
            ? field
            : field.describe(schema.description);
    }
    if (schema instanceof z.ZodOptional ||
        schema instanceof z.ZodExactOptional ||
        schema instanceof z.ZodDefault ||
        schema instanceof z.ZodPrefault ||
        schema instanceof z.ZodNullable ||
        schema instanceof z.ZodReadonly)
        return z.clone(schema, {
            ...schema.def,
            innerType: admitDocumentCallerPath(schema.unwrap(), path),
        }, { parent: true });
    if (schema instanceof z.ZodUnion)
        return z.clone(schema, {
            ...schema.def,
            options: schema.options.map((option) => admitDocumentCallerPath(option, path)),
        }, { parent: true });
    if (schema instanceof z.ZodObject && Object.hasOwn(schema.shape, head))
        return z.clone(schema, {
            ...schema.def,
            shape: {
                ...schema.shape,
                [head]: admitDocumentCallerPath(schema.shape[head], tail),
            },
        }, { parent: true });
    return schema;
};
/** The CLI key of a JSON input document. */
const DOCUMENT_KEY = "inputJson";
/**
 * Describe the options that supply fields of an opening or source contract,
 * and admit what the caller selected with a target as that contract's
 * `path`. Each option admits its field's own schema, narrowed to the
 * projected values.
 */
const describeTargetOpening = (opening) => {
    const opener = opening?.contract.name ?? "";
    const shape = (opening?.contract.inputSchema.shape ?? {});
    const options = Object.entries(opening?.fields ?? {}).map(([field, projected]) => {
        const declared = shape[field];
        if (declared === undefined || field === SESSION_TARGET_KEY)
            throw new Error(`${opener} has no option field ${field}`);
        if (!admitsOmission(declared))
            throw new Error(`${opener}.${field} is required`);
        let schema;
        if (projected.callerPath === true) {
            if (!(core(declared) instanceof z.ZodString))
                throw new Error(`${opener}.${field} is not a path`);
            schema = localPathStringSchema.optional();
        }
        else if (projected.values === undefined) {
            assertArgvField(opener, field, declared);
            schema = argvDecimal(argvOptional(declared));
        }
        else {
            for (const value of projected.values)
                if (!declared.safeParse(value).success)
                    throw new Error(`${opener}.${field} does not admit ${value}`);
            schema = z.enum(projected.values).optional();
        }
        const description = projected.description ?? describedThroughWrappers(declared);
        if (description !== undefined)
            schema = schema.describe(description);
        return {
            field,
            key: projected.name ?? camelCase(field),
            description,
            schema,
            callerPath: projected.callerPath === true,
        };
    });
    const keyOf = new Map(options.map(({ field, key }) => [field, key]));
    const callerPaths = new Set(options.flatMap(({ field, callerPath }) => (callerPath ? [field] : [])));
    return {
        options,
        admit: (operation, values, target) => {
            if (opening === undefined)
                return ok({});
            const selected = Object.fromEntries(options.flatMap(({ field, key }) => values[key] === undefined ? [] : [[field, values[key]]]));
            // The target itself was admitted as its positional.
            if (Object.keys(selected).length === 0)
                return ok({});
            const candidate = {
                ...Object.fromEntries(Object.entries(selected).map(([field, value]) => [
                    field,
                    callerPaths.has(field)
                        ? absoluteCallerPath(value)
                        : value,
                ])),
                [SESSION_TARGET_KEY]: absoluteCallerPath(target),
            };
            const admitted = opening.contract.inputSchema.safeParse(candidate);
            if (!admitted.success)
                return err(analysisInputErrorFromIssues(operation, admitted.error.issues.map((issue) => {
                    const [field, ...rest] = issue.path;
                    const key = typeof field === "string" ? keyOf.get(field) : undefined;
                    return key === undefined
                        ? issue
                        : { ...issue, path: [key, ...rest] };
                }), selected));
            const data = admitted.data;
            return ok(Object.fromEntries(Object.keys(selected).map((field) => [
                field,
                callerPaths.has(field) ? selected[field] : data[field],
            ])));
        },
    };
};
/** Describe the target positional and its opening options. */
const describeSessionTarget = (target) => {
    if (target === undefined)
        return undefined;
    const { options, admit } = describeTargetOpening(target.open);
    return {
        key: SESSION_TARGET_KEY,
        schema: localPathStringSchema.describe(target.description),
        opening: target.open?.contract.name,
        options,
        admitOpening: (operation, values) => admit(operation, values, values[SESSION_TARGET_KEY]),
    };
};
/**
 * Describe the Evidence target positionals of required contract fields and
 * the options of their shared source contract. Every target is admitted by
 * the source input, so a source option holds for each one.
 */
const describeEvidenceTargets = (contract, shape, targets) => {
    if (targets === undefined)
        return undefined;
    const { options, admit } = describeTargetOpening(targets.source);
    const described = Object.entries(targets.fields).flatMap(([field, projected]) => {
        if (projected === undefined)
            return [];
        const declared = shape[field];
        if (declared === undefined)
            throw new Error(`${contract.name} has no input field ${field}`);
        if (admitsOmission(declared))
            throw new Error(`${contract.name}.${field} is not a required field`);
        return [
            {
                field,
                key: projected.name ?? camelCase(field),
                schema: localPathStringSchema.describe(projected.description),
            },
        ];
    });
    if (described.length === 0)
        throw new Error(`${contract.name} declares no Evidence target`);
    return {
        source: targets.source.contract.name,
        targets: described,
        options,
        sourceFlags: Object.fromEntries(options.map(({ field, key }) => [field, `--${optionFlagName(key)}`])),
        admitSource: (operation, values) => {
            let admitted = ok({});
            for (const { key } of described) {
                admitted = admit(operation, values, values[key]);
                if (!admitted.ok)
                    return admitted;
            }
            return admitted;
        },
    };
};
/**
 * The delivery `--detail`, `--evidence_output` and `--view` select beside a
 * JSON document. The view is admitted by the contract's own `view` field; a
 * page is selected from a retained summary, so it needs summary delivery.
 */
const admitDocumentDelivery = (operation, viewDelivery, values) => {
    let view;
    if (viewDelivery !== undefined) {
        const decoded = parseCliJsonOption(operation, "view", values.view, viewDelivery.invalidJson);
        if (!decoded.ok)
            return decoded;
        if (decoded.value !== undefined) {
            const candidate = { view: decoded.value };
            const parsed = z
                .object({ view: viewDelivery.schema })
                .safeParse(candidate);
            if (!parsed.success)
                return err(analysisInputErrorFromIssues(operation, parsed.error.issues, candidate));
            const selected = parsed.data.view;
            view = (viewDelivery.kind === undefined
                ? selected
                : { kind: viewDelivery.kind, ...selected });
        }
    }
    const detail = values.detail ??
        (view === undefined ? "complete" : "summary");
    const delivery = {
        detail,
        evidenceOutput: values.evidence_output,
        ...(view === undefined ? {} : { view }),
    };
    const refused = cliEvidenceDeliveryInputError({ ...delivery, operation });
    return refused === undefined ? ok(delivery) : err(refused);
};
/**
 * Describe a contract command that takes its whole input as one JSON
 * document. The handler admits the decoded document with the contract's
 * owner, which borrows Evidence carriers rather than parsing them here.
 */
export const describeContractDocumentCommand = (contract, projection) => {
    const omitted = Object.fromEntries(Object.entries(projection.omit ?? {}).filter((entry) => typeof entry[1] === "string"));
    const evidenceDelivery = projection.evidenceDelivery === true;
    const { viewDelivery } = projection;
    if (viewDelivery !== undefined && !evidenceDelivery)
        throw new Error(`${contract.name} view delivery requires evidenceDelivery`);
    // Delivery fields keep their contract names as CLI keys.
    const flagged = Object.fromEntries((evidenceDelivery
        ? viewDelivery === undefined
            ? ["detail"]
            : ["detail", "view"]
        : []).map((field) => [field, field]));
    for (const field of Object.keys(flagged))
        if (Object.hasOwn(omitted, field))
            throw new Error(`${contract.name}.${field} is both omitted and an option`);
    const removed = [...Object.keys(omitted), ...Object.keys(flagged)];
    let admitted = contract.inputSchema;
    let viewSchema = z.never();
    if (removed.length > 0) {
        const schema = contract.inputSchema;
        if (!(schema instanceof z.ZodObject))
            throw new Error(`${contract.name} omits fields from a union input`);
        const shape = schema.shape;
        for (const field of removed)
            if (!Object.hasOwn(shape, field) || !admitsOmission(shape[field]))
                throw new Error(`${contract.name}.${field} is not an optional field`);
        if (viewDelivery !== undefined)
            viewSchema = shape.view;
        admitted = schema.omit(Object.fromEntries(removed.map((field) => [field, true])));
    }
    const callerPaths = projection.callerPaths ?? [];
    for (const path of callerPaths)
        admitted = admitDocumentCallerPath(admitted, path);
    const cliOptions = projection.cliOptions ?? {};
    const deliveryOptions = Object.entries({
        ...(evidenceDelivery
            ? {
                detail: viewDelivery?.viewSelectsSummary === true
                    ? analysisEvidenceDeliveryOptions.detail.unwrap().optional()
                    : analysisEvidenceDeliveryOptions.detail,
                evidence_output: analysisEvidenceDeliveryOptions.evidence_output,
            }
            : {}),
        ...(viewDelivery === undefined
            ? {}
            : {
                view: z.string().optional().describe(viewOptionHelp(viewDelivery)),
            }),
    }).map(([key, schema]) => ({
        key,
        description: schema.description,
        schema,
    }));
    const sessionTarget = describeSessionTarget(projection.sessionTarget);
    const keys = [
        DOCUMENT_KEY,
        ...(sessionTarget === undefined
            ? []
            : [sessionTarget.key, ...sessionTarget.options.map(({ key }) => key)]),
        ...Object.keys(cliOptions),
        ...deliveryOptions.map(({ key }) => key),
    ];
    if (new Set(keys).size !== keys.length)
        throw new Error(`${contract.name} projects two fields to one CLI key`);
    const documentRefusals = {
        ...Object.fromEntries(Object.entries(omitted).map(([field, reason]) => [
            field,
            `${field} is not accepted by this command: ${reason}`,
        ])),
        ...Object.fromEntries(Object.entries(flagged).map(([field, key]) => [
            field,
            `${field} is not accepted in the document: pass --${key} beside it`,
        ])),
    };
    return {
        command: projectedCommand(contract, projection.command),
        description: projection.description,
        contract,
        key: DOCUMENT_KEY,
        documentDescription: projection.document,
        content: getEvidenceInputContract(admitted).frameSchema,
        callerPaths,
        omitted,
        flagged,
        documentRefusals,
        deliveryOptions,
        admitDelivery: (values) => evidenceDelivery
            ? admitDocumentDelivery(contract.name, viewDelivery === undefined
                ? undefined
                : { ...viewDelivery, schema: viewSchema }, values)
            : ok(undefined),
        sessionTarget,
        cliOnlyOptions: Object.entries(cliOptions).map(([key, schema]) => ({
            key,
            description: schema.description,
            schema,
        })),
        cliOptionValues: (values) => Object.fromEntries(Object.keys(cliOptions).flatMap((key) => values[key] === undefined ? [] : [[key, values[key]]])),
    };
};
/** Derive the CLI parameters of one contract from its input schema and projection. */
export const describeContractCommand = (contract, projection) => {
    const evidenceDelivery = projection.evidenceDelivery === true;
    const { viewDelivery } = projection;
    if (viewDelivery !== undefined && !evidenceDelivery)
        throw new Error(`${contract.name} view delivery requires evidenceDelivery`);
    const deliveryFields = new Set(evidenceDelivery
        ? viewDelivery === undefined
            ? ["detail"]
            : ["detail", "view"]
        : []);
    if (projection.sessionTarget !== undefined &&
        projection.evidenceTargets !== undefined)
        throw new Error(`${contract.name} takes both a session target and Evidence targets`);
    const targetFields = new Set(Object.keys(projection.evidenceTargets?.fields ?? {}));
    const handlerFields = projection.handlerFields ?? [];
    const branches = selectInputBranches(contract, projection.inputBranches);
    const fixedFields = new Map(branches.fixed === undefined ? [] : [branches.fixed]);
    // Fields argv never supplies: the delivery's, the omitted ones, those the
    // handler supplies with each target's source Evidence, those it fills
    // from CLI-only values, and the one the selected branch fixes.
    const unprojectedFields = new Set([
        ...deliveryFields,
        ...Object.keys(projection.omit ?? {}),
        ...targetFields,
        ...handlerFields,
        ...fixedFields.keys(),
    ]);
    const { shape, selectors } = inputFields({ name: contract.name, inputSchema: branches.inputSchema }, unprojectedFields);
    if (viewDelivery !== undefined && !admitsOmission(shape.view ?? z.never()))
        throw new Error(`${contract.name} has no optional input field view`);
    const positionals = projection.positionals ?? [];
    const selectorOptions = projection.selectorOptions ?? {};
    for (const field of Object.keys(selectorOptions))
        if (!positionals.includes(field))
            throw new Error(`${contract.name}.${field} is not a positional selector`);
    const callerPaths = new Set(projection.callerPaths ?? []);
    const fieldProjections = projection.fields ?? {};
    const jsonTextFields = new Set(projection.jsonText ?? []);
    const jsonInputFields = projection.jsonInputs ?? {};
    for (const field of Object.keys(jsonInputFields))
        if (Object.hasOwn(projection.runtimeJson ?? {}, field))
            throw new Error(`${contract.name}.${field} is JSON text and JSON input`);
    const jsonInputChecks = projection.jsonInputChecks ?? {};
    for (const field of Object.keys(jsonInputChecks))
        if (!Object.hasOwn(jsonInputFields, field))
            throw new Error(`${contract.name}.${field} is checked but not a JSON input`);
    const runtimeJsonFields = {
        ...projection.runtimeJson,
        ...jsonInputFields,
    };
    const nullFlags = projection.nullFlags ?? {};
    const omitted = Object.fromEntries(Object.entries(projection.omit ?? {}).filter((entry) => typeof entry[1] === "string"));
    for (const field of [
        ...positionals,
        ...callerPaths,
        ...jsonTextFields,
        ...Object.keys(runtimeJsonFields),
        ...Object.keys(nullFlags),
        ...Object.keys(projection.flatten ?? {}),
        ...Object.keys(fieldProjections),
        ...Object.keys(omitted),
    ]) {
        if (!Object.hasOwn(shape, field))
            throw new Error(`${contract.name} has no input field ${field}`);
        if (targetFields.has(field))
            throw new Error(`${contract.name}.${field} is an Evidence target`);
        if (handlerFields.includes(field))
            throw new Error(`${contract.name}.${field} is filled by the handler`);
        if (fixedFields.has(field))
            throw new Error(`${contract.name}.${field} is fixed by its input branch`);
    }
    const fieldGroups = projection.fieldGroups ?? {};
    const groupedFields = new Set();
    const projectedFields = new Set([
        ...positionals,
        ...callerPaths,
        ...jsonTextFields,
        ...Object.keys(runtimeJsonFields),
        ...Object.keys(nullFlags),
        ...Object.keys(projection.flatten ?? {}),
        ...Object.keys(fieldProjections),
        ...Object.keys(omitted),
        ...unprojectedFields,
    ]);
    for (const group of Object.values(fieldGroups))
        for (const field of group?.fields ?? []) {
            if (!Object.hasOwn(shape, field))
                throw new Error(`${contract.name} has no input field ${field}`);
            if (projectedFields.has(field) || groupedFields.has(field))
                throw new Error(`${contract.name}.${field} is projected twice`);
            // The option may be omitted, so each member may be.
            if (!admitsOmission(shape[field]))
                throw new Error(`${contract.name}.${field} is a required group member`);
            groupedFields.add(field);
        }
    for (const field of handlerFields) {
        if (!Object.hasOwn(shape, field))
            throw new Error(`${contract.name} has no input field ${field}`);
        if (targetFields.has(field))
            throw new Error(`${contract.name}.${field} is an Evidence target`);
    }
    for (const field of Object.keys(omitted))
        if (!admitsOmission(shape[field]))
            throw new Error(`${contract.name}.${field} is required on the CLI`);
    const parameter = (field) => {
        const inbound = inboundView(shape[field]);
        const declared = inbound ?? shape[field];
        const projected = fieldProjections[field];
        const callerPath = callerPaths.has(field);
        const delivery = deliveryFields.has(field);
        const viewSelection = delivery && field === "view";
        const jsonText = jsonTextFields.has(field);
        const runtimeJson = viewSelection
            ? viewDelivery?.invalidJson
            : runtimeJsonFields[field];
        const jsonInput = !viewSelection && Object.hasOwn(jsonInputFields, field);
        const nullFlag = nullFlags[field]?.key;
        const key = projected?.name ?? camelCase(field);
        let schema;
        if (runtimeJson !== undefined) {
            // Argv requires the text of a required field; the contract admits
            // what it decodes to. Help and `--schema` show a contract default as
            // the JSON text that decodes to it. Empty text is neither JSON nor a
            // file path, so a JSON input refuses it before any input is read.
            const text = jsonInput ? z.string().min(1) : z.string();
            schema =
                declared instanceof z.ZodDefault
                    ? text.default(JSON.stringify(declared.parse(undefined)))
                    : admitsOmission(declared)
                        ? text.optional()
                        : text;
            if (viewSelection && viewDelivery !== undefined)
                schema = schema.describe(viewOptionHelp(viewDelivery));
        }
        else if (nullFlag !== undefined) {
            // The flag spells null, so the option itself takes only a value.
            if (!declared.safeParse(null).success)
                throw new Error(`${contract.name}.${field} does not admit null`);
            assertArgvField(contract.name, field, declared);
            schema = argvDecimal(core(declared).optional());
        }
        else if (delivery)
            schema =
                viewDelivery?.viewSelectsSummary === true
                    ? analysisEvidenceDeliveryOptions.detail.unwrap().optional()
                    : analysisEvidenceDeliveryOptions.detail;
        else if (jsonText)
            schema = jsonTextField(declared, optionFlagName(key));
        else if (callerPath) {
            const admitted = core(declared) instanceof z.ZodArray
                ? z.array(localPathStringSchema)
                : localPathStringSchema;
            schema = admitsOmission(declared) ? admitted.optional() : admitted;
        }
        else {
            assertArgvField(contract.name, field, declared);
            schema = argvDecimal(argvOptional(declared));
        }
        if (projected?.default !== undefined) {
            if (admitsOmission(declared) ||
                !declared.safeParse(projected.default).success)
                throw new Error(`${contract.name}.${field} cannot take the CLI default ${String(projected.default)}`);
            const described = schema.description;
            schema = schema.default(projected.default);
            if (described !== undefined)
                schema = schema.describe(described);
        }
        const described = projected?.description ??
            schema.description ??
            describedThroughWrappers(declared);
        if (described !== undefined && described !== schema.description)
            schema = schema.describe(described);
        if (!delivery && projected?.default === undefined)
            schema = withoutDefault(schema);
        const description = schema.description ?? described;
        const value = core(declared);
        const selector = selectorOptions[field];
        let selectorOption;
        if (selector !== undefined) {
            if (!(value instanceof z.ZodString))
                throw new Error(`${contract.name}.${field} is not a text selector`);
            // A selector names one object. Its contract refuses an empty one, so
            // the CLI and MCP agree without a CLI-only rule.
            if (value.safeParse("").success)
                throw new Error(`${contract.name}.${field} admits an empty selector`);
            // Either spelling may supply the selector.
            schema = schema.optional();
            if (description !== undefined)
                schema = schema.describe(description);
            selectorOption = {
                key: selector.name,
                valueKey: `--${selector.name}`,
                description: selector.description,
                schema: schema.describe(selector.description),
                kind: selector.kind ?? "text",
                required: selector.required === true || !admitsOmission(declared),
                alternative: selector.alternative === undefined
                    ? undefined
                    : {
                        key: selector.alternative.name,
                        valueKey: `--${selector.alternative.name}`,
                        schema: selector.alternative.schema
                            .optional()
                            .describe(selector.alternative.description),
                        selects: selector.alternative.selects,
                    },
            };
        }
        return {
            field,
            key,
            positional: positionals.includes(field),
            alias: projected?.alias,
            description,
            schema,
            inbound: inbound !== undefined,
            booleanFlag: value instanceof z.ZodBoolean,
            cliDefault: projected?.default,
            repeatable: value instanceof z.ZodArray,
            decimal: value instanceof z.ZodNumber,
            callerPath,
            delivery,
            jsonText,
            viewSelection,
            runtimeJson,
            jsonInput,
            checkJsonInput: jsonInputChecks[field],
            nullFlag,
            member: undefined,
            selectorOption,
            group: undefined,
        };
    };
    const flattened = projection.flatten ?? {};
    const memberParameters = (field, path, declared, members, enclosingRequired) => {
        const object = core(declared);
        const name = [field, ...path].join(".");
        if (!(object instanceof z.ZodObject))
            throw new Error(`${contract.name}.${name} is not an object`);
        // A member is required when it and every enclosing object are.
        const required = enclosingRequired && !admitsOmission(declared);
        // A flattened positional field takes each member as a positional, in
        // member order, so every member must be required.
        const positional = path.length === 0 && positionals.includes(field);
        if (positional && !required)
            throw new Error(`${contract.name}.${name} is an optional positional object`);
        const memberShape = object.shape;
        if (Object.keys(members).toSorted().join() !==
            Object.keys(memberShape).toSorted().join())
            throw new Error(`${contract.name}.${name} flattens other members`);
        const memberParameterList = Object.entries(memberShape).flatMap(([member, memberDeclared]) => {
            const projected = members[member];
            const memberPath = [...path, member];
            const memberName = [field, ...memberPath].join(".");
            if ("flatten" in projected) {
                if (positional)
                    throw new Error(`${contract.name}.${memberName} is a positional object`);
                return memberParameters(field, memberPath, memberDeclared, projected.flatten, required);
            }
            const memberRequired = required && !admitsOmission(memberDeclared);
            if (positional && !memberRequired)
                throw new Error(`${contract.name}.${memberName} is an optional positional`);
            const omittable = (schema) => memberRequired ? schema : schema.optional();
            const callerPath = projected.callerPath === true;
            let schema;
            if (callerPath) {
                if (!(core(memberDeclared) instanceof z.ZodString))
                    throw new Error(`${contract.name}.${memberName} is not a path`);
                schema = omittable(localPathStringSchema);
            }
            else {
                assertArgvField(contract.name, memberName, memberDeclared);
                // An omitted member stays omitted; the contract applies its default.
                schema = argvDecimal(omittable(withoutDefault(memberDeclared)));
            }
            const description = projected.description ?? describedThroughWrappers(memberDeclared);
            if (description !== undefined)
                schema = schema.describe(description);
            const value = core(memberDeclared);
            return [
                {
                    field,
                    key: projected.name ?? camelCase(member),
                    positional,
                    alias: projected.alias,
                    description,
                    schema,
                    inbound: false,
                    booleanFlag: value instanceof z.ZodBoolean,
                    cliDefault: undefined,
                    repeatable: value instanceof z.ZodArray,
                    decimal: value instanceof z.ZodNumber,
                    callerPath,
                    delivery: false,
                    jsonText: false,
                    viewSelection: false,
                    runtimeJson: undefined,
                    jsonInput: false,
                    checkJsonInput: undefined,
                    nullFlag: undefined,
                    member: memberPath,
                    selectorOption: undefined,
                    group: undefined,
                },
            ];
        });
        // Argv supplies an object only through its given members, so a required
        // object needs a required member; otherwise omitting them all drops it.
        if (required &&
            memberParameterList.every(({ schema }) => schema.safeParse(undefined).success))
            throw new Error(`${contract.name}.${name} has no required member`);
        return memberParameterList;
    };
    const parameters = [
        ...positionals,
        ...Object.keys(shape).filter((field) => !positionals.includes(field) &&
            !Object.hasOwn(omitted, field) &&
            !targetFields.has(field) &&
            !handlerFields.includes(field) &&
            !fixedFields.has(field) &&
            !groupedFields.has(field)),
    ].flatMap((field) => flattened[field] === undefined
        ? [parameter(field)]
        : memberParameters(field, [], shape[field], flattened[field], true));
    for (const [key, group] of Object.entries(fieldGroups))
        if (group !== undefined)
            parameters.push({
                field: key,
                key,
                positional: false,
                alias: undefined,
                description: group.description,
                schema: z.string().optional().describe(group.description),
                inbound: false,
                booleanFlag: false,
                cliDefault: undefined,
                repeatable: false,
                decimal: false,
                callerPath: false,
                delivery: false,
                jsonText: false,
                viewSelection: false,
                runtimeJson: group.invalidJson,
                jsonInput: false,
                checkJsonInput: undefined,
                nullFlag: undefined,
                member: undefined,
                selectorOption: undefined,
                group: group.fields,
            });
    const cliOptions = projection.cliOptions ?? {};
    const cliPositionalKeys = projection.cliPositionals ?? [];
    for (const key of cliPositionalKeys)
        if (!Object.hasOwn(cliOptions, key))
            throw new Error(`${contract.name} has no CLI option ${key}`);
    const cliPositionals = cliPositionalKeys.map((key) => ({
        key,
        description: cliOptions[key].description,
        schema: cliOptions[key],
    }));
    const cliOnlyOptions = [
        ...Object.values(nullFlags).flatMap((flag) => flag === undefined
            ? []
            : [
                [
                    flag.key,
                    z.boolean().default(false).describe(flag.description),
                ],
            ]),
        ...Object.entries(evidenceDelivery
            ? Object.hasOwn(shape, "detail")
                ? { evidence_output: analysisEvidenceDeliveryOptions.evidence_output }
                : analysisEvidenceDeliveryOptions
            : {}),
        ...Object.entries(cliOptions).filter(([key]) => !cliPositionalKeys.includes(key)),
    ].map(([key, schema]) => ({
        key,
        description: schema.description,
        schema,
    }));
    const sessionTarget = describeSessionTarget(projection.sessionTarget);
    const evidenceTargets = describeEvidenceTargets(contract, shape, projection.evidenceTargets);
    // Keys the command adds beside the contract parameters.
    const sessionTargetKeys = [
        ...(sessionTarget === undefined
            ? []
            : [sessionTarget.key, ...sessionTarget.options.map(({ key }) => key)]),
        ...(evidenceTargets === undefined
            ? []
            : [
                ...evidenceTargets.targets.map(({ key }) => key),
                ...evidenceTargets.options.map(({ key }) => key),
            ]),
    ];
    const selectorKeys = parameters.flatMap(({ selectorOption }) => selectorOption === undefined
        ? []
        : [
            selectorOption.key,
            ...(selectorOption.alternative === undefined
                ? []
                : [selectorOption.alternative.key]),
        ]);
    // A selector option may share its positional's key: argv keeps them apart.
    const keys = new Set([
        ...sessionTargetKeys,
        ...parameters.map(({ key }) => key),
        ...cliOnlyOptions.map(({ key }) => key),
        ...cliPositionalKeys,
    ]);
    const optionKeys = new Set([
        ...sessionTargetKeys,
        ...parameters.flatMap(({ key, positional }) => (positional ? [] : [key])),
        ...cliOnlyOptions.map(({ key }) => key),
        ...selectorKeys,
    ]);
    if (keys.size !==
        sessionTargetKeys.length +
            parameters.length +
            cliOnlyOptions.length +
            cliPositionalKeys.length ||
        optionKeys.size !==
            sessionTargetKeys.length +
                parameters.filter(({ positional }) => !positional).length +
                cliOnlyOptions.length +
                selectorKeys.length)
        throw new Error(`${contract.name} projects two fields to one CLI key`);
    const cliOptionDependencies = Object.fromEntries(Object.entries(projection.cliOptionDependencies ?? {}).filter((entry) => entry[1] !== undefined));
    for (const [key, required] of Object.entries(cliOptionDependencies))
        for (const dependency of [key, ...required])
            if (!keys.has(dependency))
                throw new Error(`${contract.name} has no CLI option ${dependency}`);
    const keyOf = new Map(parameters.flatMap(({ field, key, member }) => member === undefined ? [[field, key]] : []));
    const rename = (field) => keyOf.get(field) ?? field;
    const toContractInput = (values) => {
        const input = Object.fromEntries(fixedFields);
        for (const { field, key, callerPath, delivery, member, selectorOption, group, } of parameters) {
            // The named spelling is preserved when both agree.
            const value = (selectorOption === undefined
                ? undefined
                : values[selectorOption.valueKey]) ?? values[key];
            if (value === undefined || delivery || member !== undefined)
                continue;
            if (group !== undefined) {
                // A decoded group supplies each member it names as that field.
                if (isRecord(value))
                    for (const grouped of group)
                        if (Object.hasOwn(value, grouped))
                            input[grouped] = value[grouped];
                continue;
            }
            input[field] = !callerPath
                ? value
                : Array.isArray(value)
                    ? value.map((path) => absoluteCallerPath(path))
                    : absoluteCallerPath(value);
        }
        // Any member given supplies each enclosing object, so the contract names
        // a missing companion; an omitted member stays omitted, not undefined.
        for (const { field, key, member, callerPath } of parameters) {
            const value = values[key];
            if (member === undefined || value === undefined)
                continue;
            let object = (input[field] ??= {});
            for (const enclosing of member.slice(0, -1))
                object = (object[enclosing] ??= {});
            object[member.at(-1)] = callerPath
                ? absoluteCallerPath(value)
                : value;
        }
        for (const { field, nullFlag } of parameters)
            if (nullFlag !== undefined && values[nullFlag] === true)
                input[field] = null;
        return input;
    };
    const nullFlagLimits = parameters.flatMap(({ key, nullFlag }) => nullFlag === undefined ? [] : [[nullFlag, key]]);
    // Cross-field rules belong to the contract: run its own object checks on
    // the options mapped to contract names, then name CLI keys. Positional
    // values are not visible here; the service's contract parse still
    // enforces every rule.
    const checks = projection.crossFieldRules === "argv"
        ? (contract.inputSchema._zod.def.checks ?? [])
        : [];
    if (checks.length > 0 &&
        parameters.some(({ runtimeJson }) => runtimeJson !== undefined))
        throw new Error(`${contract.name} decodes JSON when it runs, after argv cross-field rules`);
    const contractChecks = z
        .object({})
        .loose()
        .check(...checks);
    const checkOptions = checks.length === 0 && nullFlagLimits.length === 0
        ? undefined
        : (options) => {
            const conflicts = nullFlagLimits.flatMap(([flag, limit]) => {
                if (options[flag] !== true || options[limit] === undefined)
                    return [];
                const message = `${flag} and ${limit} are mutually exclusive`;
                const issue = {
                    code: "custom",
                    path: [flag],
                    message,
                    input: undefined,
                };
                return [{ path: [flag], message, issue }];
            });
            // Checks observe execution defaults, while the command retains the
            // caller's raw selections. Resolve only omitted fields: supplied
            // options have already passed argv admission, and JSON text is not
            // decoded until the command runs.
            const checkInput = toContractInput(options);
            if (checks.length > 0)
                for (const [field, declared] of Object.entries(shape)) {
                    if (Object.hasOwn(checkInput, field))
                        continue;
                    const omitted = declared.safeParse(undefined);
                    if (omitted.success && omitted.data !== undefined)
                        checkInput[field] = omitted.data;
                }
            const result = contractChecks.safeParse(checkInput);
            return result.success
                ? conflicts
                : [
                    ...conflicts,
                    ...result.error.issues.map((issue) => {
                        const [field, ...rest] = issue.path;
                        return {
                            path: typeof field === "string"
                                ? [rename(field), ...rest]
                                : issue.path,
                            message: issue.message,
                            issue,
                        };
                    }),
                ];
        };
    return {
        command: projectedCommand(contract, projection.command),
        description: projection.description,
        contract,
        parameters,
        cliOnlyOptions,
        cliPositionals,
        omitted,
        handlerFields,
        fixedFields: Object.fromEntries(fixedFields),
        fields: shape,
        optionConstraints: projectObjectConstraints(contract, 
        // A grouped field is a JSON member, not an option, so an object rule
        // naming it has no CLI projection.
        (field) => {
            if (groupedFields.has(field))
                throw new Error(`${contract.name}.${field} is grouped but named by an input rule`);
            return rename(field);
        }, new Set([...unprojectedFields, ...selectors]), cliOptionDependencies, nullFlagLimits),
        checkOptions,
        toContractInput,
        callerInputs: (values) => Object.fromEntries(parameters.flatMap(({ field, key, callerPath, member }) => {
            const value = values[key];
            return callerPath && value !== undefined
                ? [
                    [
                        [field, ...(member ?? [])].join("."),
                        value,
                    ],
                ]
                : [];
        })),
        cliOptionValues: (values) => Object.fromEntries(Object.keys(cliOptions).flatMap((key) => values[key] === undefined ? [] : [[key, values[key]]])),
        sessionTarget,
        evidenceTargets,
        inputBinding: {
            operation: contract.name,
            fields: Object.fromEntries([
                // A selector field is named by its own option: its positional may
                // share another key, and selection issues already use the option.
                ...parameters.flatMap(({ field, key, member, selectorOption }) => member === undefined
                    ? [{ field, key: selectorOption?.key ?? key }]
                    : []),
                ...(evidenceTargets?.targets ?? []),
            ].flatMap(({ field, key }) => (key === field ? [] : [[field, key]]))),
            flags: Object.fromEntries(parameters.flatMap(({ field, key, member, positional, delivery, group, selectorOption, }) => {
                if (delivery)
                    return [];
                // A positional selector is also set by its named option.
                if (positional)
                    return selectorOption === undefined
                        ? []
                        : [[field, `--${optionFlagName(selectorOption.key)}`]];
                const flag = `--${optionFlagName(key)}`;
                // A field group's option supplies each of its contract fields.
                if (group !== undefined)
                    return group.map((grouped) => [grouped, flag]);
                return [
                    [
                        member === undefined ? field : [field, ...member].join("."),
                        flag,
                    ],
                ];
            })),
        },
        evidenceDelivery,
        admit: (values) => {
            const selectedValues = { ...values };
            for (const { key, selectorOption } of parameters) {
                if (selectorOption === undefined)
                    continue;
                const selected = selectSpelledSelector(contract.name, selectorOption, values[key], values);
                if (!selected.ok)
                    return selected;
                selectedValues[selectorOption.valueKey] = selected.value;
            }
            return admitInvocation(contract, {
                evidenceDelivery,
                viewDelivery,
                parameters,
                shape,
                wholeInput: sessionTarget === undefined &&
                    evidenceTargets === undefined &&
                    handlerFields.length === 0,
                checkedFields: Object.keys(jsonInputChecks),
            }, selectedValues, toContractInput, rename);
        },
        admitDeliveryOptions: (values) => {
            const decoded = decodeInlineJson(contract.name, parameters, values);
            if (!decoded.ok)
                return decoded;
            if (!evidenceDelivery)
                return decoded;
            const view = viewDelivery === undefined
                ? undefined
                : decoded.value[rename("view")];
            // The view's own refusal comes first, as in full admission, where the
            // contract admits the view before the delivery rules apply.
            if (view !== undefined) {
                const checked = shape.view.safeParse(view);
                if (!checked.success)
                    return err(analysisInputErrorFromIssues(contract.name, checked.error.issues.map((issue) => ({
                        ...issue,
                        path: ["view", ...issue.path],
                    })), { view }));
            }
            const detail = decoded.value[rename("detail")];
            const refused = cliEvidenceDeliveryInputError({
                operation: contract.name,
                detail: detail ?? (view === undefined ? "complete" : "summary"),
                evidenceOutput: decoded.value.evidence_output,
                view,
            });
            return refused === undefined ? decoded : err(refused);
        },
    };
};
/**
 * Decode each inline run-time JSON option. JSON inputs, which may name a
 * file, are read and decoded by the command before admission.
 */
const decodeInlineJson = (operation, parameters, values) => {
    const decoded = { ...values };
    for (const { key, runtimeJson, jsonInput, group } of parameters) {
        if (runtimeJson === undefined || jsonInput)
            continue;
        const parsed = parseCliJsonOption(operation, key, values[key], runtimeJson);
        if (!parsed.ok)
            return parsed;
        if (group !== undefined && parsed.value !== undefined) {
            const members = admitGroupMembers(operation, key, group, runtimeJson, parsed.value);
            if (!members.ok)
                return members;
        }
        decoded[key] = parsed.value;
    }
    return ok(decoded);
};
/** A group is a JSON object whose members are its own fields. */
const admitGroupMembers = (operation, key, group, invalidJson, value) => {
    if (!isRecord(value))
        return err(new AnalysisInputError(operation, undefined, [
            {
                path: [key],
                reason: "invalid_format",
                expected: "JSON",
                message: invalidJson,
            },
        ]));
    const members = z.strictObject(Object.fromEntries(group.map((field) => [field, z.unknown().optional()])));
    const admitted = members.safeParse(value);
    return admitted.success
        ? ok(undefined)
        : err(analysisInputErrorFromIssues(operation, admitted.error.issues.map((issue) => ({
            ...issue,
            path: [key, ...issue.path],
        })), { [key]: value }));
};
/**
 * Select one selector from its positional, its named option and any
 * alternative option. The named option and the alternative agree only as
 * text; the positional then agrees with either as the selector's kind, and
 * a conflict names the option the caller used.
 */
const selectSpelledSelector = (operation, selector, positional, values) => {
    const { alternative } = selector;
    let named = values[selector.valueKey];
    let option = selector.key;
    const otherSpelling = alternative === undefined
        ? undefined
        : values[alternative.valueKey];
    if (alternative !== undefined && otherSpelling !== undefined) {
        const merged = selectCliAnalysisSelector(named, alternative.selects(otherSpelling), { option: alternative.key, operation, kind: "text", required: false });
        if (!merged.ok)
            return merged;
        named = merged.value;
        option = alternative.key;
    }
    const selected = selectCliAnalysisSelector(positional, named, {
        option,
        operation,
        kind: selector.kind,
        required: selector.required,
    });
    // The named spelling is preserved when both agree.
    return selected.ok ? ok(named ?? positional) : selected;
};
/**
 * Map decoded values to the contract input and selected delivery.
 * When the projection decodes JSON at run time, the
 * decoded input, delivery and view are admitted together by the contract
 * input schema, so the contract's own rules and messages apply. When argv
 * supplies the whole contract input, it is parsed once the same way and the
 * handler receives the parse or the refusal.
 */
const admitInvocation = (contract, command, values, toContractInput, rename) => {
    const { evidenceDelivery, viewDelivery, parameters, shape, wholeInput, checkedFields, } = command;
    const decoded = values;
    const input = toContractInput(decoded);
    const detail = evidenceDelivery
        ? decoded[rename("detail")]
        : undefined;
    let view;
    let parsed;
    let parseWholeInput;
    const runtimeJson = parameters.some(({ runtimeJson }) => runtimeJson !== undefined);
    const selected = viewDelivery === undefined ? undefined : decoded[rename("view")];
    const candidate = {
        ...input,
        ...(detail === undefined || !Object.hasOwn(shape, "detail")
            ? {}
            : { detail }),
        ...(selected === undefined ? {} : { view: selected }),
    };
    const schema = contract.inputSchema;
    const unchecked = checkedFields.length > 0 && schema instanceof z.ZodObject
        ? schema.omit(Object.fromEntries(checkedFields.map((field) => [field, true])))
        : undefined;
    const parseCandidate = () => {
        if (unchecked !== undefined) {
            const rest = { ...candidate };
            const documents = {};
            for (const field of checkedFields)
                if (Object.hasOwn(rest, field)) {
                    documents[field] = rest[field];
                    delete rest[field];
                }
            const admitted = unchecked.safeParse(rest);
            return admitted.success
                ? ok({ ...admitted.data, ...documents })
                : err(analysisInputErrorFromIssues(contract.name, admitted.error.issues, candidate));
        }
        const admitted = schema.safeParse(candidate);
        return admitted.success
            ? ok(admitted.data)
            : err(analysisInputErrorFromIssues(contract.name, admitted.error.issues, candidate));
    };
    if (runtimeJson || (wholeInput && viewDelivery !== undefined)) {
        // The delivery needs the admitted view, and run-time JSON is refused
        // here, so these parse now.
        const admitted = parseCandidate();
        if (admitted.ok) {
            parsed = admitted.value;
            if (viewDelivery !== undefined)
                ({ view } = admitted.value);
        }
        else if (runtimeJson)
            return admitted;
        else
            parseWholeInput = () => admitted;
    }
    else if (wholeInput) {
        // Only a handler that reads the parse pays for it, once.
        let memo;
        parseWholeInput = () => (memo ??= parseCandidate());
    }
    if (!evidenceDelivery)
        return ok({ input, parsed, parseWholeInput, delivery: undefined });
    const delivery = {
        detail: detail ?? (view === undefined ? "complete" : "summary"),
        evidenceOutput: decoded.evidence_output,
        ...(view === undefined
            ? {}
            : {
                view: (viewDelivery?.kind === undefined
                    ? view
                    : { kind: viewDelivery.kind, ...view }),
            }),
    };
    const refused = cliEvidenceDeliveryInputError({
        ...delivery,
        operation: contract.name,
    });
    return refused === undefined
        ? ok({ input, parsed, parseWholeInput, delivery })
        : err(refused);
};
/**
 * Describe each contract an operation option selects. Each must project to
 * the registered command's exact arguments, options and object-level option
 * rules, so the help and schema the registered contract advertises hold for
 * every choice.
 */
export const describeOperationChoices = (description, projection) => {
    const choices = new Map();
    const signature = (described) => JSON.stringify([
        described.parameters.map(({ key, positional, schema }) => [
            key,
            positional,
            z.toJSONSchema(schema, { unrepresentable: "any" }),
        ]),
        described.optionConstraints ?? null,
    ]);
    const expected = signature(description);
    for (const [value, contract] of Object.entries(projection.operationBy?.contracts ?? {})) {
        const described = describeContractCommand(contract, projection);
        if (signature(described) !== expected)
            throw new Error(`${contract.name} does not project to ${description.command}'s options`);
        choices.set(value, described);
    }
    return choices;
};
