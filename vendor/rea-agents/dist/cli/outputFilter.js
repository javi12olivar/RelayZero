/**
 * The `--filter-output` path grammar: comma-separated paths of dot-separated
 * keys, each optionally followed by a `[start,end]` array slice, such as
 * `foo,bar.baz,a[0,3].name`. Commas inside brackets belong to the slice.
 * Projection of a result through these paths is owned by the CLI result
 * writer and the JSON Lines selector.
 */
import { err, ok } from "../domain/result.js";
/** Split on commas outside `[...]`; an empty last path is dropped. */
const splitPaths = (expression) => {
    const paths = [];
    let current = "";
    let depth = 0;
    for (const character of expression) {
        if (character === "[")
            depth += 1;
        else if (character === "]")
            depth -= 1;
        if (character === "," && depth === 0) {
            paths.push(current);
            current = "";
        }
        else
            current += character;
    }
    if (current !== "")
        paths.push(current);
    return paths;
};
const keySegments = (text) => text
    .split(".")
    .filter((key) => key !== "")
    .map((key) => ({ key }));
const parsePath = (text) => {
    const segments = [];
    let remaining = text;
    while (remaining.length > 0) {
        const open = remaining.indexOf("[");
        if (open === -1) {
            segments.push(...keySegments(remaining));
            break;
        }
        const close = remaining.indexOf("]", open);
        if (close === -1)
            return err({ kind: "unclosed_slice" });
        segments.push(...keySegments(remaining.slice(0, open)));
        const bounds = remaining.slice(open + 1, close).split(",");
        if (bounds.length > 2)
            return err({ kind: "extra_slice_bounds" });
        const [start, end] = bounds;
        segments.push({ start: Number(start), end: Number(end) });
        remaining = remaining.slice(close + 1);
        if (remaining.startsWith("."))
            remaining = remaining.slice(1);
    }
    return ok(segments);
};
/** Parse a `--filter-output` expression into its paths. */
export const parseOutputFilter = (expression) => {
    const paths = [];
    for (const text of splitPaths(expression)) {
        const path = parsePath(text);
        if (!path.ok)
            return path;
        paths.push(path.value);
    }
    return ok(paths);
};
