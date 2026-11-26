const INSTRUCTION_OBSERVATIONS = {
    question: "instruction-level questions",
    alternatives: [
        {
            operation: "inspect_native_instruction",
            observes: "the decoded instruction or data at one exact address, with its length and static flow",
        },
        {
            operation: "read_function_instructions",
            observes: "one analyzed procedure's instruction listing in address order",
        },
        {
            operation: "procedure_assembly",
            observes: "one analyzed procedure's assembly text",
        },
    ],
    limitation: "None navigates arbitrary analyzed objects such as data or addresses outside a procedure, and neither listing order nor address plus length proves executed control flow.",
};
/** Operations absent from this relation keep their consumer's generic advice. */
const OPERATION_ALTERNATIVES = new Map([
    ["next_address", INSTRUCTION_OBSERVATIONS],
    ["prev_address", INSTRUCTION_OBSERVATIONS],
]);
/**
 * Select the declared alternatives for an operation the current provider does
 * not declare. `isOffered` holds only for operations that provider makes
 * available and the caller advertises. Undefined means none qualifies.
 */
export const offeredOperationAlternatives = (operation, isOffered) => {
    const relation = OPERATION_ALTERNATIVES.get(operation);
    if (relation === undefined)
        return undefined;
    const offered = relation.alternatives.filter((alternative) => isOffered(alternative.operation));
    if (offered.length === 0)
        return undefined;
    const described = offered.map(({ operation: alternative, observes }) => `${alternative} (${observes})`);
    const listed = described.length === 1
        ? described[0]
        : `${described.slice(0, -1).join(", ")} and ${described.at(-1)}`;
    return {
        operations: offered.map((alternative) => alternative.operation),
        remediation: `For ${relation.question}, the current provider offers ${listed}. ${relation.limitation} Running ${operation} itself requires a provider that declares it.`,
    };
};
