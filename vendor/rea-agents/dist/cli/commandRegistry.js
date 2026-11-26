import { cliCommandFor } from "../contracts/cliCommandNames.js";
import { optionFlagName } from "./optionFields.js";
const registries = new WeakMap();
/**
 * Register one command: record it in REA's command table, in registration
 * order. The dispatcher reads this table; every command is registered here.
 */
export const registerCliCommand = (cli, name, definition, registration = {}) => {
    const entries = registries.get(cli) ?? [];
    if (entries.some((entry) => entry.name === name))
        throw new Error(`CLI command ${name} is registered twice`);
    entries.push({
        name,
        definition: definition,
        operations: registration.operations ?? [],
        source: registration.source ?? { kind: "host" },
    });
    registries.set(cli, entries);
};
/** Commands registered on this CLI, in registration order. */
export const cliCommands = (cli) => registries.get(cli) ?? [];
/** Resolve a command identity from the same records the dispatcher serves. */
export const cliCommand = (cli, name) => cliCommands(cli).find((entry) => entry.name === name);
/**
 * The operations one contract description runs: its own contract, the
 * contract that opens its session target, and the source of its Evidence
 * targets, each with the flags this command gives its fields.
 */
export const contractDescriptionOperations = (description, options = {}) => {
    const { sessionTarget, evidenceTargets } = description;
    return [
        {
            name: description.contract.name,
            flags: description.inputBinding?.flags ?? {},
            ...(options.selector === undefined ? {} : { selector: options.selector }),
        },
        ...(sessionTarget?.opening === undefined
            ? []
            : [
                {
                    name: sessionTarget.opening,
                    flags: Object.fromEntries(sessionTarget.options.map(({ field, key }) => [
                        field,
                        `--${optionFlagName(key)}`,
                    ])),
                },
            ]),
        ...(evidenceTargets === undefined
            ? []
            : [{ name: evidenceTargets.source, flags: evidenceTargets.sourceFlags }]),
    ];
};
/** Merge operation lists, keeping the first entry of each operation. */
export const distinctOperations = (operations) => {
    const seen = new Set();
    return operations.filter(({ name }) => !seen.has(name) && seen.add(name));
};
/**
 * Contract operations the command itself answers, excluding the session-target
 * opener and any Evidence-target source operation it runs first.
 */
export const commandOwnOperations = (entry) => {
    const { source, operations } = entry;
    if (source.kind === "contract") {
        const opening = source.description.sessionTarget?.opening;
        const targetSource = source.description.evidenceTargets?.source;
        return operations.filter(({ name }) => name !== opening && name !== targetSource);
    }
    if (source.kind === "routed") {
        const own = new Set(source.descriptions.map((description) => description.contract.name));
        return operations.filter(({ name }) => own.has(name));
    }
    if (source.kind === "document") {
        const opening = source.description.sessionTarget?.opening;
        return operations.filter(({ name }) => name !== opening);
    }
    return operations;
};
/**
 * The CLI command spelling (`rea <command>`) that runs a contract operation,
 * or undefined when no CLI command answers it. Prefers the canonical
 * single-contract command, then a contract command whose own operations start
 * with or include it, then any other registered command whose own operations
 * include it.
 */
export const cliCommandForOperation = (operation, entries, cliName, recordedCommands) => {
    const canonical = cliCommandFor(operation);
    let contractPrimary;
    let contractSecondary;
    let otherMatch;
    for (const entry of entries) {
        const own = commandOwnOperations(entry);
        const matched = own.find(({ name }) => name === operation);
        if (matched === undefined)
            continue;
        const command = matched.selector === undefined
            ? entry.name
            : `${entry.name} ${matched.selector}`;
        if (entry.name === canonical)
            return `${cliName} ${command}`;
        if (entry.source.kind === "contract") {
            if (own[0]?.name === operation)
                contractPrimary ??= command;
            else
                contractSecondary ??= command;
        }
        else {
            otherMatch ??= command;
        }
    }
    if (recordedCommands !== undefined &&
        Object.hasOwn(recordedCommands, canonical))
        return `${cliName} ${canonical}`;
    const selected = contractPrimary ?? contractSecondary ?? otherMatch;
    return selected === undefined ? undefined : `${cliName} ${selected}`;
};
