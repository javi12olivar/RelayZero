import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_optionFields, optionFlagName } from "./optionFields-BX4HP9xw.js";
import { cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";

//#region dist/cli/commandRegistry.js
var registries, registerCliCommand, cliCommands, cliCommand, contractDescriptionOperations, distinctOperations, commandOwnOperations, cliCommandForOperation;
function init_commandRegistry() {
	return (init_commandRegistry = __esmMin((() => {
		init_cliCommandNames();
		init_optionFields();
		registries = new WeakMap();
		registerCliCommand = (cli, name, definition, registration = {}) => {
			const entries = registries.get(cli) ?? [];
			if (entries.some((entry) => entry.name === name)) throw new Error(`CLI command ${name} is registered twice`);
			entries.push({
				name,
				definition,
				operations: registration.operations ?? [],
				source: registration.source ?? { kind: "host" }
			});
			registries.set(cli, entries);
		};
		cliCommands = (cli) => registries.get(cli) ?? [];
		cliCommand = (cli, name) => cliCommands(cli).find((entry) => entry.name === name);
		contractDescriptionOperations = (description, options = {}) => {
			const { sessionTarget, evidenceTargets } = description;
			return [
				{
					name: description.contract.name,
					flags: description.inputBinding?.flags ?? {},
					...options.selector === undefined ? {} : { selector: options.selector }
				},
				...sessionTarget?.opening === undefined ? [] : [{
					name: sessionTarget.opening,
					flags: Object.fromEntries(sessionTarget.options.map(({ field, key }) => [field, `--${optionFlagName(key)}`]))
				}],
				...evidenceTargets === undefined ? [] : [{
					name: evidenceTargets.source,
					flags: evidenceTargets.sourceFlags
				}]
			];
		};
		distinctOperations = (operations) => {
			const seen = new Set();
			return operations.filter(({ name }) => !seen.has(name) && seen.add(name));
		};
		commandOwnOperations = (entry) => {
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
		cliCommandForOperation = (operation, entries, cliName, recordedCommands) => {
			const canonical = cliCommandFor(operation);
			let contractPrimary;
			let contractSecondary;
			let otherMatch;
			for (const entry of entries) {
				const own = commandOwnOperations(entry);
				const matched = own.find(({ name }) => name === operation);
				if (matched === undefined) continue;
				const command = matched.selector === undefined ? entry.name : `${entry.name} ${matched.selector}`;
				if (entry.name === canonical) return `${cliName} ${command}`;
				if (entry.source.kind === "contract") {
					if (own[0]?.name === operation) contractPrimary ??= command;
					else contractSecondary ??= command;
				} else {
					otherMatch ??= command;
				}
			}
			if (recordedCommands !== undefined && Object.hasOwn(recordedCommands, canonical)) return `${cliName} ${canonical}`;
			const selected = contractPrimary ?? contractSecondary ?? otherMatch;
			return selected === undefined ? undefined : `${cliName} ${selected}`;
		};
	})))();
}

//#endregion
export { cliCommand, cliCommandForOperation, cliCommands, contractDescriptionOperations, distinctOperations, init_commandRegistry, registerCliCommand };