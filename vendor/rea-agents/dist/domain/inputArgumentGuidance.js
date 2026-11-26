const PROCEDURE_OPERATIONS = new Set([
    "analyze_function",
    "annotate_native_function",
    "inspect_native_api",
    "procedure_address",
    "procedure_assembly",
    "procedure_callees",
    "procedure_callers",
    "procedure_info",
    "procedure_pseudo_code",
    "procedure_references",
    "read_function_instructions",
    "trace_native_values",
]);
const ADDRESS_OPERATIONS = new Set([
    "address_name",
    "address_to_file_offset",
    "comment",
    "get_call_graph",
    "goto_address",
    "inline_comment",
    "inspect_address_context",
    "inspect_native_instruction",
    "next_address",
    "prev_address",
    "read_bytes",
    "resolve_containing_procedure",
    "resolve_native_call_targets",
    "set_address_name",
    "set_bookmark",
    "set_comment",
    "set_inline_comment",
    "unset_bookmark",
    "xrefs",
]);
const PATTERN_OPERATIONS = new Set([
    "analyze_swift_types",
    "get_objc_classes",
    "search_bytes",
    "search_procedures",
    "search_strings",
]);
const QUERY_OPERATIONS = new Set([
    "search_guidance",
    "trace_feature",
]);
const PROCEDURE_INSTEAD_OF_ADDRESS = {
    expected: "procedure",
    message: "Unrecognized argument 'address'; did you mean 'procedure'?",
    remediation: "Use 'procedure' (a procedure name or address) instead of 'address'.",
};
const ADDRESS_INSTEAD_OF_PROCEDURE = {
    expected: "address",
    message: "Unrecognized argument 'procedure'; did you mean 'address'?",
    remediation: "Use 'address' instead of 'procedure'.",
};
const PATTERN_INSTEAD_OF_QUERY = {
    expected: "pattern",
    message: "Unrecognized argument 'query'; did you mean 'pattern'?",
    remediation: "Use 'pattern' instead of 'query'.",
};
const QUERY_INSTEAD_OF_PATTERN = {
    expected: "query",
    message: "Unrecognized argument 'pattern'; did you mean 'query'?",
    remediation: "Use 'query' instead of 'pattern'.",
};
/** Lookup known neighboring-tool argument-name confusion for one top-level key. */
export const knownArgumentMistakeGuidance = (operation, argumentName) => {
    if (operation === undefined)
        return undefined;
    if (argumentName === "address" && PROCEDURE_OPERATIONS.has(operation))
        return PROCEDURE_INSTEAD_OF_ADDRESS;
    if (argumentName === "procedure" && ADDRESS_OPERATIONS.has(operation))
        return ADDRESS_INSTEAD_OF_PROCEDURE;
    if (argumentName === "query" && PATTERN_OPERATIONS.has(operation))
        return PATTERN_INSTEAD_OF_QUERY;
    if (argumentName === "pattern" && QUERY_OPERATIONS.has(operation))
        return QUERY_INSTEAD_OF_PATTERN;
    return undefined;
};
/** Combine distinct argument-name replacement hints for an operation's rejected issues. */
export const knownArgumentMistakeRemediation = (operation, issues) => {
    const hints = [];
    const seen = new Set();
    for (const issue of issues) {
        if (issue.reason !== "unknown_argument" || issue.path.length !== 1)
            continue;
        const key = issue.path[0];
        if (typeof key !== "string")
            continue;
        const guidance = knownArgumentMistakeGuidance(operation, key);
        if (guidance !== undefined &&
            issue.expected === guidance.expected &&
            !seen.has(guidance.remediation)) {
            seen.add(guidance.remediation);
            hints.push(guidance.remediation);
        }
    }
    return hints.length === 0 ? undefined : hints.join(" ");
};
/** Deterministic guidance for common cross-kind selector confusion in inspect_analysis_view. */
export const knownViewMistakeGuidance = (operation, input, path) => {
    if (operation !== "inspect_analysis_view")
        return undefined;
    const isViewProjection = path.length >= 2 &&
        path[path.length - 2] === "view" &&
        path[path.length - 1] === "projection";
    if (!isViewProjection)
        return undefined;
    const rawView = typeof input === "object" && input !== null
        ? (input.view ??
            input.input?.view)
        : undefined;
    if (typeof rawView !== "object" || rawView === null)
        return undefined;
    const viewRecord = rawView;
    if (viewRecord.kind === "javascript" &&
        viewRecord.collection === "modules" &&
        viewRecord.projection === undefined) {
        return {
            message: "To page modules, use view: { kind: 'page', collection: 'modules' }. For module references, specify projection: 'references'.",
            remediation: "Use view: { kind: 'page', collection: 'modules' } to page modules, or set projection: 'references'.",
        };
    }
    return undefined;
};
