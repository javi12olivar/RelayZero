import { jsonPointerTokens } from "../jsonPointer.js";
import { isRecord } from "../../kernel/isRecord.js";
/** A list counter's member names: a top-level member's name not starting with `/`, else a pointer (`/pageInfo/totalRows`, `/~1total`). */
export const counterPath = (counter) => counter.startsWith("/") ? jsonPointerTokens(counter) : [counter];
/** A list counter's recorded value, or undefined when the body lacks it. */
export const counterAt = (body, counter) => counterPath(counter).reduce((value, name) => isRecord(value) && Object.hasOwn(value, name) ? value[name] : undefined, body);
/** The body with a counter it holds set to `value`. */
export const withCounter = (body, counter, value) => {
    const set = (node, path) => {
        const [name, ...rest] = path;
        if (name === undefined)
            return value;
        if (!isRecord(node) || !Object.hasOwn(node, name))
            return node;
        return { ...node, [name]: set(node[name], rest) };
    };
    return set(body, counterPath(counter));
};
