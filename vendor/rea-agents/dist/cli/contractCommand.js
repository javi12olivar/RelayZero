import { z } from "zod";
import { invariantViolation } from "../domain/internalInvariant.js";
import { logCliCommand } from "../cliLogging.js";
import { AnalysisInputError, AnalysisOutputError, } from "../domain/analysisErrorCore.js";
import { projectAnalysisError } from "../domain/analysisErrorProjection.js";
import { analysisInputErrorFromIssues } from "../domain/inputIssueProjection.js";
import { err, ok } from "../domain/result.js";
import { openBinaryTargetSelection } from "../contracts/sessionLifecycleInputs.js";
import { deliverCliAnalysisEvidence, publishCliAnalysisEvidence, } from "./analysisEvidenceDelivery.js";
import { finishCliEvidenceCommand } from "./cliEvidenceCallerPath.js";
import { finishAnalysisCommand } from "./finishAnalysisCommand.js";
import { withCommandCancellation } from "./commandCancellation.js";
import { dispatchQueuedInterrupts } from "../process/queuedInterrupts.js";
import { finalizedResult, runOwned } from "../providers/runOwned.js";
import { parseCliJsonInput, resolveCliJsonPaths } from "./cliJsonInput.js";
import { jsonInputArgument } from "./jsonInputArgument.js";
import { describeContractCommand, describeContractDocumentCommand, describeOperationChoices, withoutDefault, } from "./contractCliDescription.js";
import { cliDeliveredEvidence, recordCliResultControls, } from "./cliResultControls.js";
import { cliResultControlsIn, failurePartialObservation, projectCliAnalysisResult, projectCliInputFields, } from "./projectCliAnalysisResult.js";
import { contractDescriptionOperations, distinctOperations, registerCliCommand, } from "./commandRegistry.js";
import { isRecord } from "../kernel/isRecord.js";
import { optionFlagName } from "./optionFields.js";
/**
 * The contract's parse of a projection whose admission parses the whole
 * input, or its refusal. Neither means the projection supplies part of the
 * input elsewhere, which is a defect in that command's registration.
 */
export const admittedContractInput = (context) => {
    if (context.parsed !== undefined)
        return ok(context.parsed);
    if (context.parseWholeInput === undefined)
        throw invariantViolation(`${context.operation} does not admit its whole contract input on the CLI`);
    return context.parseWholeInput();
};
/** The caller's spelling of the selected target `path`. */
export const callerTargetPath = ({ operation, callerInputs, }) => {
    const { path } = callerInputs;
    if (typeof path !== "string")
        throw new Error(`${operation} has no caller path field named path`);
    return path;
};
/**
 * The caller's spelling of the primary caller-path field (`path` unless the
 * command names another), and of each other caller-path field keyed by its
 * contract field name.
 */
const callerSpellings = (context, primary = "path") => {
    const { [primary]: path, ...others } = context.callerInputs;
    if (typeof path !== "string")
        throw new Error(`${context.operation} has no caller path field named ${primary}`);
    return {
        path,
        others: Object.keys(others).length === 0 ? undefined : others,
    };
};
/**
 * Inspect through a closeable service, finish its cleanup, and record the
 * caller's spelling of each selected path in the Evidence; `primary` names
 * the contract field recorded as the Evidence's caller input path.
 */
export const inspectWithService = (service, providerId, primary = "path") => (input, context) => {
    const spellings = callerSpellings(context, primary);
    const owned = service();
    return finishCliEvidenceCommand(spellings.path, () => owned.inspect(input, { signal: context.signal }), owned, providerId, context.operation, context.signal, spellings.others).then(projectCliAnalysisResult);
};
/**
 * Open the session target as an MCP session would hold it, with the opening
 * fields the caller selected, and run the contract operation on the
 * remaining input. A projection with `evidenceDelivery` delivers complete
 * Evidence or a summary beside its bundle.
 */
export const runOnSessionTarget = (runProviderAnalysis, logger) => async (input, context) => {
    const { sessionTarget, operation, signal, delivery, opening } = context;
    if (sessionTarget === undefined)
        throw new Error(`${operation} declares no session target`);
    // Argv values are decoded text, and absent options are left out.
    const values = input;
    const result = await (Object.keys(opening).length === 0
        ? runProviderAnalysis(sessionTarget, operation, values, logger, signal)
        : runProviderAnalysis(sessionTarget, 
        // Only artifact operations take an opening selection.
        operation, values, logger, signal, openBinaryTargetSelection(opening)));
    if (delivery === undefined)
        return projectCliAnalysisResult(result);
    return publishCliAnalysisEvidence(result, {
        operation,
        signal,
        detail: delivery.detail,
        evidenceOutput: delivery.evidenceOutput,
        ...(delivery.view === undefined ? {} : { view: delivery.view }),
    });
};
/**
 * The one-shot open the caller selected with `open_binary` fields: its
 * target interpretation, provider and analysis snapshot.
 */
const directAnalysisOpening = ({ provider_id: providerId, snapshot_path: snapshotPath, ...selection }) => ({
    ...openBinaryTargetSelection(selection),
    ...(providerId === undefined
        ? {}
        : { providerId: providerId }),
    ...(snapshotPath === undefined
        ? {}
        : { snapshotPath: snapshotPath }),
});
/**
 * Open the session target for one operation with the `open_binary` fields
 * the caller selected, run it, and release the provider. A projection with
 * `evidenceDelivery` delivers complete Evidence or a summary beside its
 * bundle. `requireSourceEvidence` refuses a bundle whose composed result did
 * not return the source Evidence it cites.
 */
export const runDirectOnTarget = (runDirectAnalysis, logger, options = {}) => async (input, context) => {
    const { sessionTarget, operation, signal, delivery, opening } = context;
    if (sessionTarget === undefined)
        throw new Error(`${operation} declares no session target`);
    const evidenceOutput = delivery?.evidenceOutput;
    const result = await runDirectAnalysis(sessionTarget, operation, 
    // Argv values are decoded text, and absent options are left out.
    input, {
        logger,
        signal,
        ...directAnalysisOpening(opening),
        ...(evidenceOutput === undefined
            ? {}
            : { includeEvidenceSources: true }),
    });
    if (delivery === undefined)
        return projectCliAnalysisResult(result);
    if (options.requireSourceEvidence === true &&
        result.ok &&
        evidenceOutput !== undefined &&
        result.sourceEvidence === undefined)
        return projectAnalysisError(new AnalysisOutputError(operation, "The CLI session did not return its source Evidence.").retainPartialObservation(result.value));
    return publishCliAnalysisEvidence(result, {
        operation,
        signal,
        detail: delivery.detail,
        evidenceOutput,
    });
};
/**
 * A command's output named for the CLI: renamed issue paths and failure
 * flags (`projectCliInputFields`), and the flags of controls its result
 * records, which the CLI renders in its own envelope.
 */
const projectCliResult = (output, outputSchema, binding) => {
    // A command without flags, or without a result schema that declares
    // recorded controls, has no control to render.
    if (outputSchema !== undefined && Object.keys(binding.flags).length > 0)
        recordCliResultControls(() => 
        // A wrapped delivery recorded its complete Evidence, which the
        // contract's output schema describes; so does a failure's partial
        // Evidence of the same operation.
        cliResultControlsIn(cliDeliveredEvidence() ??
            failurePartialObservation(output, binding.operation) ??
            output, outputSchema, binding));
    return projectCliInputFields(output, binding);
};
/**
 * Run the source contract on each Evidence target in argv order with the
 * source fields the caller selected, then compose the contract from that
 * Evidence. A target's failure names its positional; any failure retains
 * each completed target's Evidence under its contract field beside the
 * failure's own partial observation.
 */
export const runOnEvidenceTargets = (runSource, compose) => async (input, context) => {
    const { evidenceTargets, operation, signal } = context;
    if (evidenceTargets === undefined)
        throw new Error(`${operation} declares no Evidence targets`);
    // Argv values are decoded text, and absent options are left out.
    const parameters = context.opening;
    const sources = {};
    const retainSources = (failure) => {
        for (const [field, evidence] of Object.entries(sources))
            failure.retainArgumentObservation(field, evidence);
        return failure;
    };
    for (const { field, key, target } of evidenceTargets.targets) {
        const source = await runSource(target, parameters, signal);
        if (!source.ok)
            return projectCliInputFields({
                error: "Analysis failed",
                ...projectAnalysisError(retainSources(source.error), "invocation"),
            }, {
                operation: evidenceTargets.source,
                fields: { path: key },
                flags: evidenceTargets.sourceFlags,
            });
        sources[field] = source.value;
    }
    // A cancellation that arrives as the composition settles keeps its
    // most complete Evidence. The composition owns no resource of its own,
    // so its close only lets queued interrupts reach the signal first.
    const result = finalizedResult(await runOwned(async () => {
        try {
            return await compose({ ...input, ...sources }, { ...context, evidenceTargets });
        }
        catch (cause) {
            // The completed source Evidence outlives a defect in the composition.
            return {
                ok: false,
                error: new AnalysisOutputError(operation, `${operation} produced invalid output`, { cause }),
            };
        }
    }, {
        providerId: evidenceTargets.source,
        operation,
        signal,
        close: dispatchQueuedInterrupts,
        partial: (value) => value,
    }));
    if (result.ok)
        return result.value;
    return {
        error: "Analysis failed",
        ...projectAnalysisError(retainSources(result.error), "invocation"),
    };
};
/**
 * Run an analysis that selects no target path through a closeable service
 * and finish its cleanup.
 */
export const analyzeWithService = (service, providerId) => (input, context) => {
    if (Object.keys(context.callerInputs).length > 0)
        throw new Error(`${context.operation} selects a caller path`);
    const owned = service();
    return finishAnalysisCommand(() => owned.inspect(input, { signal: context.signal }), owned, providerId, context.operation, context.signal).then(projectCliAnalysisResult);
};
/**
 * Inspect through a closeable service, then deliver complete Evidence or a
 * summary with its bundle, recording the caller's spelling of each selected
 * path.
 */
export const deliverWithService = (service, providerId) => (input, context) => {
    const spellings = callerSpellings(context);
    const { delivery } = context;
    if (delivery === undefined)
        throw new Error(`${context.operation} does not declare evidenceDelivery`);
    const owned = service();
    return deliverCliAnalysisEvidence({
        callerInputPath: spellings.path,
        ...(spellings.others === undefined
            ? {}
            : { callerInputPaths: spellings.others }),
        run: () => owned.inspect(input, { signal: context.signal }),
        service: owned,
        providerId,
        operation: context.operation,
        signal: context.signal,
        detail: delivery.detail,
        evidenceOutput: delivery.evidenceOutput,
        ...(delivery.view === undefined ? {} : { view: delivery.view }),
    });
};
/**
 * The session target's opening fields, or the Evidence targets' source
 * fields, when the command declares any.
 */
const admitOpening = (description, values) => description.sessionTarget !== undefined
    ? description.sessionTarget.admitOpening(description.contract.name, values)
    : description.evidenceTargets !== undefined
        ? description.evidenceTargets.admitSource(description.contract.name, values)
        : { ok: true, value: {} };
/** Target positionals, the contract's own, then CLI-only ones, in argv order. */
const commandPositionals = (description) => [
    ...(description.sessionTarget === undefined
        ? []
        : [description.sessionTarget]),
    ...(description.evidenceTargets?.targets ?? []),
    ...description.parameters.filter(({ positional }) => positional),
    ...description.cliPositionals,
];
const commandOptions = (description) => {
    const object = z.object(Object.fromEntries([
        ...description.parameters
            .filter(({ positional }) => !positional)
            .map(({ key, schema }) => [key, schema]),
        ...[
            ...(description.sessionTarget?.options ?? []),
            ...(description.evidenceTargets?.options ?? []),
        ].map(({ key, schema }) => [key, schema]),
        ...description.cliOnlyOptions.map(({ key, schema }) => [key, schema]),
        ...description.parameters.flatMap(({ selectorOption }) => [selectorOption, selectorOption?.alternative].flatMap((option) => option === undefined ? [] : [[option.key, option.schema]])),
    ]));
    const constrained = description.optionConstraints === undefined
        ? object
        : object.meta(description.optionConstraints);
    const { checkOptions } = description;
    return checkOptions === undefined
        ? constrained
        : constrained.superRefine((parsed, context) => {
            for (const { path, issue } of checkOptions(parsed))
                context.addIssue({ ...issue, path: [...path] });
        });
};
/**
 * Register one CLI command described from a tool contract. The handler
 * receives the contract input, with caller paths made absolute.
 */
export const registerContractCommand = (cli, logger, contract, projection, run) => {
    const description = describeContractCommand(contract, projection);
    const chosen = describeOperationChoices(description, projection);
    const positionals = commandPositionals(description);
    const alias = Object.fromEntries(description.parameters.flatMap(({ key, alias: short, positional }) => short === undefined || positional ? [] : [[key, short]]));
    registerCliCommand(cli, description.command, {
        description: description.description,
        ...(positionals.length === 0
            ? {}
            : {
                args: z.object(Object.fromEntries(positionals.map(({ key, schema }) => [key, schema]))),
            }),
        options: commandOptions(description),
        ...(Object.keys(alias).length === 0 ? {} : { alias }),
        run: ({ args, options, }) => {
            const values = { ...options, ...args };
            // A selector's positional and named option may share one key.
            for (const { key, selectorOption } of description.parameters)
                if (selectorOption !== undefined) {
                    values[key] = args?.[key];
                    for (const option of [selectorOption, selectorOption.alternative])
                        if (option !== undefined)
                            values[option.valueKey] = options[option.key];
                }
            const selected = projection.operationBy === undefined
                ? description
                : (chosen.get(values[projection.operationBy.option]) ??
                    description);
            return withCommandCancellation((signal) => logCliCommand(logger, description.command, async () => {
                const options = selected.admitDeliveryOptions(values);
                if (!options.ok)
                    return projectAnalysisError(options.error);
                const read = await readJsonInputs(selected, options.value, signal);
                if (!read.ok)
                    return read.error;
                const admitted = selected.admit(read.value);
                // Admission and handler issues alike name renamed fields by CLI key.
                if (!admitted.ok)
                    return projectCliInputFields(projectAnalysisError(admitted.error), selected.inputBinding);
                const opening = admitOpening(selected, values);
                if (!opening.ok)
                    return projectAnalysisError(opening.error);
                // A composed command also takes its sources' options; a control
                // its result records from a source is set by that option.
                const operations = contractDescriptionOperations(selected);
                const resultBinding = description.evidenceTargets === undefined
                    ? { ...selected.inputBinding, operations }
                    : {
                        ...selected.inputBinding,
                        operations,
                        flags: {
                            ...description.evidenceTargets.sourceFlags,
                            ...selected.inputBinding.flags,
                        },
                    };
                return projectCliResult(await run(admitted.value.input, {
                    signal,
                    operation: selected.contract.name,
                    callerInputs: selected.callerInputs(values),
                    sessionTarget: description.sessionTarget === undefined
                        ? undefined
                        : values[description.sessionTarget.key],
                    evidenceTargets: description.evidenceTargets === undefined
                        ? undefined
                        : {
                            source: description.evidenceTargets.source,
                            sourceFlags: description.evidenceTargets.sourceFlags,
                            targets: description.evidenceTargets.targets.map(({ field, key }) => ({
                                field,
                                key,
                                target: values[key],
                            })),
                        },
                    opening: opening.value,
                    delivery: admitted.value.delivery,
                    parsed: admitted.value.parsed,
                    parseWholeInput: admitted.value.parseWholeInput,
                    checked: read.checked,
                    cliOptions: selected.cliOptionValues(values),
                }), selected.contract.outputSchema, resultBinding);
            }));
        },
    }, {
        operations: distinctOperations([
            ...contractDescriptionOperations(description),
            ...[...chosen.entries()].flatMap(([value, choice]) => contractDescriptionOperations(choice, {
                selector: `--${optionFlagName(projection.operationBy.option)} ${String(value)}`,
            })),
        ]),
        source: { kind: "contract", description },
    });
};
/** Describe one route of a routed command from its contract input. */
export const commandRoute = (contract, projection, run, route) => {
    if (projection.operationBy !== undefined)
        throw new Error(`${contract.name} routes by target and by an option`);
    return {
        description: describeContractCommand(contract, projection),
        takes: route.takes,
        requirement: route.requirement,
        run: run,
    };
};
/**
 * The input shape of a union contract that has `field`, as a contract a
 * route can project: the same operation, admitted by that shape alone.
 */
export const contractInputBranch = (contract, field) => {
    const branches = contract.inputSchema.options.filter((branch) => Object.hasOwn(branch.shape, field));
    if (branches.length !== 1)
        throw new Error(`${contract.name} has no single input shape with ${field}`);
    return {
        name: contract.name,
        ...(contract.cli === undefined ? {} : { cli: contract.cli }),
        inputSchema: branches[0],
    };
};
/** The argv arguments and options one description takes, keyed by CLI key. */
const commandShape = (description) => ({
    args: commandPositionals(description).map(({ key, schema }) => [key, schema]),
    // Routed descriptions declare no object-level rules, so this is the object.
    options: Object.fromEntries(Object.entries(commandOptions(description).shape).map(([key, schema]) => [key, withoutDefault(schema)])),
});
const schemaSignature = (schema) => JSON.stringify(z.toJSONSchema(schema, { unrepresentable: "any" }));
/**
 * Register one CLI command whose input chooses the contract input it runs,
 * such as `analyze` running static JavaScript analysis on an application
 * archive and the binary overview on a program, or `compare-web-captures`
 * comparing recorded scenarios or passive captures by what the documents
 * hold. Each route is projected from its own contract input; the command
 * takes the union of their options, which must agree on every shared key.
 * The first route that owns every given option and takes the input runs; an
 * option the chosen route does not own is refused naming its CLI key and the
 * route that takes it.
 */
export const registerRoutedCommand = (cli, logger, command, routes) => {
    // Every route projects the same command, which names itself or is the own
    // command of one route's contract.
    const name = routes[0].description.command;
    const shapes = routes.map(({ description }) => {
        if (description.command !== name ||
            description.optionConstraints !== undefined ||
            description.checkOptions !== undefined ||
            description.evidenceTargets !== undefined ||
            description.parameters.some(({ selectorOption }) => selectorOption !== undefined))
            throw new Error(`${description.contract.name} cannot be routed by ${name}`);
        return commandShape(description);
    });
    const args = shapes[0].args;
    const options = new Map();
    const owners = new Map();
    for (const [index, shape] of shapes.entries()) {
        if (shape.args.length !== args.length ||
            shape.args.some(([key, schema], position) => key !== args[position][0] ||
                schemaSignature(schema) !== schemaSignature(args[position][1])))
            throw new Error(`${name} routes take different arguments`);
        for (const [key, schema] of Object.entries(shape.options)) {
            const shared = options.get(key);
            if (shared !== undefined &&
                schemaSignature(shared) !== schemaSignature(schema))
                throw new Error(`${name} routes disagree on --${key}`);
            options.set(key, schema);
            owners.set(key, routes[index]);
        }
    }
    const owns = (route, key) => args.some(([argument]) => argument === key) ||
        Object.hasOwn(shapes[routes.indexOf(route)].options, key);
    // Only JSON inputs every route takes alike are decoded before routing.
    const sharedJson = sharedJsonInputs(name, routes);
    registerCliCommand(cli, name, {
        description: command.description,
        args: z.object(Object.fromEntries(args)),
        options: z.object(Object.fromEntries(options)),
        run: ({ args: given, options: chosen, }) => {
            const values = { ...chosen, ...given };
            const supplied = Object.keys(values).filter((key) => values[key] !== undefined);
            return withCommandCancellation((signal) => logCliCommand(logger, name, async () => {
                const shared = await readJsonInputs(routes[0].description, values, signal, sharedJson);
                if (!shared.ok)
                    return shared.error;
                let route = routes.at(-1);
                for (const candidate of routes)
                    if (candidate.takes !== undefined &&
                        supplied.every((key) => owns(candidate, key)) &&
                        (await candidate.takes(shared.value))) {
                        route = candidate;
                        break;
                    }
                const { description } = route;
                const refused = supplied.filter((key) => !owns(route, key));
                if (refused.length > 0)
                    return projectAnalysisError(new AnalysisInputError(description.contract.name, undefined, refused.map((key) => ({
                        path: [key],
                        reason: "invalid_value",
                        message: `--${optionFlagName(key)} requires ${owners.get(key).requirement}; the given input selects ${route.requirement}, which does not take it.`,
                    }))));
                const options = description.admitDeliveryOptions(shared.value);
                if (!options.ok)
                    return projectAnalysisError(options.error);
                const read = await readJsonInputs(description, options.value, signal, ownJsonInputs(description, sharedJson));
                if (!read.ok)
                    return read.error;
                const admitted = description.admit(read.value);
                if (!admitted.ok)
                    return projectCliInputFields(projectAnalysisError(admitted.error), description.inputBinding);
                const opening = admitOpening(description, values);
                if (!opening.ok)
                    return projectAnalysisError(opening.error);
                return projectCliResult(await route.run(admitted.value.input, {
                    signal,
                    operation: description.contract.name,
                    callerInputs: description.callerInputs(values),
                    sessionTarget: description.sessionTarget === undefined
                        ? undefined
                        : values[description.sessionTarget.key],
                    evidenceTargets: undefined,
                    opening: opening.value,
                    delivery: admitted.value.delivery,
                    parsed: admitted.value.parsed,
                    parseWholeInput: admitted.value.parseWholeInput,
                    checked: { ...shared.checked, ...read.checked },
                    cliOptions: description.cliOptionValues(withCliOnlyDefaults(description, values)),
                }), description.contract.outputSchema, {
                    ...description.inputBinding,
                    operations: contractDescriptionOperations(description),
                });
            }));
        },
    }, {
        operations: distinctOperations(routes.flatMap(({ description }) => contractDescriptionOperations(description))),
        source: {
            kind: "routed",
            descriptions: routes.map(({ description }) => description),
        },
    });
};
/**
 * Routing saw CLI-only options without their defaults; the chosen route's
 * handler receives each omitted one's default, which no contract parse
 * would otherwise restore.
 */
const withCliOnlyDefaults = (description, values) => ({
    ...values,
    ...Object.fromEntries(description.cliOnlyOptions.flatMap(({ key, schema }) => values[key] === undefined ? [[key, schema.parse(undefined)]] : [])),
});
/**
 * A document field the projection omits or takes as an option is refused
 * with its reason rather than passed to an owner that would act on it.
 */
const refusedDocumentFieldError = (operation, refusals, document) => {
    const issues = Object.entries(refusals)
        .filter(([field]) => Object.hasOwn(document, field))
        .map(([field, message]) => ({
        code: "custom",
        path: [field],
        message,
        input: document[field],
    }));
    return issues.length === 0
        ? undefined
        : analysisInputErrorFromIssues(operation, issues, document);
};
/** The CLI keys of a description's JSON inputs. */
const jsonInputKeys = (description) => new Set(description.parameters
    .filter(({ jsonInput }) => jsonInput)
    .map(({ key }) => key));
/**
 * The JSON inputs every route takes under the same key, with the same
 * refusal, so they can be decoded once before a route is chosen.
 */
const sharedJsonInputs = (command, routes) => {
    const keys = routes.map(({ description }) => jsonInputKeys(description));
    const shared = new Set([...keys[0]].filter((key) => keys.every((own) => own.has(key))));
    for (const key of shared) {
        const parameters = routes.map(({ description }) => description.parameters.find((parameter) => parameter.key === key));
        if (new Set(parameters.map(({ runtimeJson }) => runtimeJson)).size !== 1)
            throw new Error(`${command} routes refuse --${key} differently`);
        // A shared input is checked before the route is chosen, so every route
        // must check it the same way.
        if (new Set(parameters.map(({ checkJsonInput }) => checkJsonInput)).size !== 1)
            throw new Error(`${command} routes check --${key} differently`);
    }
    return shared;
};
/** The chosen route's JSON inputs that were not decoded before routing. */
const ownJsonInputs = (description, decoded) => new Set([...jsonInputKeys(description)].filter((key) => !decoded.has(key)));
/**
 * Read and decode each JSON input the caller gave, inline or from a file,
 * before the parameters are admitted; `keys` limits which are read. A file
 * that cannot be read keeps its own failure; inline text that is not JSON is
 * refused under its CLI key.
 */
const readJsonInputs = async (description, values, signal, keys = jsonInputKeys(description)) => {
    const decoded = { ...values };
    const checked = {};
    for (const { field, key, runtimeJson, checkJsonInput, } of description.parameters) {
        const text = values[key];
        if (!keys.has(key) || typeof text !== "string")
            continue;
        const parsed = await parseCliJsonInput(text, description.contract.name, signal);
        if (!parsed.ok)
            return {
                ok: false,
                error: keepsOwnFailure(parsed.error)
                    ? parsed.error
                    : projectAnalysisError(new AnalysisInputError(description.contract.name, undefined, [
                        {
                            path: [key],
                            reason: "invalid_format",
                            expected: "JSON",
                            ...(runtimeJson === undefined
                                ? {}
                                : { message: runtimeJson }),
                        },
                    ])),
            };
        decoded[key] = parsed.value;
        if (checkJsonInput === undefined)
            continue;
        // Refuse this input before the next one is read.
        const admitted = checkJsonInput(parsed.value);
        if (!admitted.ok)
            return {
                ok: false,
                error: projectCliInputFields(projectAnalysisError(admitted.error), description.inputBinding),
            };
        checked[field] = admitted.value;
    }
    return { ok: true, value: decoded, checked };
};
/** A file failure names the selected path, and a cancellation is its own. */
const keepsOwnFailure = (error) => isRecord(error) &&
    ("input_path" in error ||
        error.code === "cancelled");
/**
 * Register one CLI command whose whole contract input is one JSON document.
 * The handler receives the decoded document with its caller paths made
 * absolute, and admits it with the contract's owner.
 */
export const registerContractDocumentCommand = (cli, logger, contract, projection, run) => {
    const description = describeContractDocumentCommand(contract, projection);
    const options = Object.fromEntries([
        ...(description.sessionTarget?.options ?? []),
        ...description.deliveryOptions,
        ...description.cliOnlyOptions,
    ].map(({ key, schema }) => [key, schema]));
    registerCliCommand(cli, description.command, {
        description: description.description,
        args: z.object({
            ...(description.sessionTarget === undefined
                ? {}
                : {
                    [description.sessionTarget.key]: description.sessionTarget.schema,
                }),
            [description.key]: jsonInputArgument(description.documentDescription, description.content),
        }),
        ...(Object.keys(options).length === 0
            ? {}
            : { options: z.object(options) }),
        run: ({ args, options: values, }) => withCommandCancellation((signal) => logCliCommand(logger, description.command, async () => {
            // Delivery options are checked before the document is read.
            const delivery = description.admitDelivery(values);
            if (!delivery.ok)
                return projectAnalysisError(delivery.error);
            const opening = admitOpening(description, { ...values, ...args });
            if (!opening.ok)
                return projectAnalysisError(opening.error);
            const decoded = await parseCliJsonInput(args[description.key], contract.name, signal);
            if (!decoded.ok)
                return decoded.error;
            // A document that is not an object has no fields to refuse; the
            // contract refuses it.
            const refused = typeof decoded.value === "object" && decoded.value !== null
                ? refusedDocumentFieldError(contract.name, description.documentRefusals, decoded.value)
                : undefined;
            if (refused !== undefined)
                return projectAnalysisError(refused);
            const document = resolveCliJsonPaths(decoded.value, description.callerPaths);
            let admitted;
            const parseWholeInput = () => (admitted ??= (() => {
                const parsed = contract.inputSchema.safeParse(document);
                return parsed.success
                    ? ok(parsed.data)
                    : err(analysisInputErrorFromIssues(contract.name, parsed.error.issues, decoded.value));
            })());
            return run(document, {
                signal,
                operation: contract.name,
                spelled: decoded.value,
                parsed: undefined,
                parseWholeInput,
                frame: description.content,
                delivery: delivery.value,
                opening: opening.value,
                sessionTarget: description.sessionTarget === undefined
                    ? undefined
                    : args[description.sessionTarget.key],
                cliOptions: description.cliOptionValues(values),
            });
        })),
    }, {
        // A document's fields are set in the document, not by flags.
        operations: contractDescriptionOperations({
            contract: description.contract,
            sessionTarget: description.sessionTarget,
        }),
        source: { kind: "document", description },
    });
};
