import { decodeLimit } from "../domain/parseFailure.js";
/** The ParseFailure format of a standalone CPython pyc. */
export const PYTHON_PYC_FORMAT = "python-pyc";
/** Caller controls that determine each parser-owned allowance. */
const LIMIT_CONTROLS = {
    max_objects: ["max_objects"],
    max_depth: ["max_depth"],
    max_string_bytes: ["max_string_bytes"],
    reported_string_bytes: ["max_file_bytes"],
    reported_rows: ["max_objects"],
    nested_code_steps: ["max_objects", "max_depth"],
    nested_code_references: ["max_objects", "max_depth"],
    marshal_key_steps: ["max_objects"],
    marshal_key_bytes: ["max_file_bytes"],
};
export const pythonPycLimit = (name, maximum, detail) => decodeLimit(PYTHON_PYC_FORMAT, detail, { name, maximum });
export const pythonPycLimitControls = (boundary) => Object.entries(LIMIT_CONTROLS).find(([name]) => name === boundary)?.[1] ?? [];
